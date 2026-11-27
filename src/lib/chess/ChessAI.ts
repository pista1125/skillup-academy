import { Chess } from 'chess.js';

export class ChessAI {
  private worker: Worker | null = null;
  private onMessage: (msg: string) => void = () => {};

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    try {
      this.worker = new Worker('/stockfish.js');
      this.worker.onmessage = (e) => {
        const msg = e.data;
        if (typeof msg === 'string') {
          this.onMessage(msg);
        }
      };
      // Send initial UCI command
      this.sendCommand('uci');
    } catch (error) {
      console.error('Failed to initialize Stockfish worker:', error);
    }
  }

  public sendCommand(cmd: string) {
    if (this.worker) {
      this.worker.postMessage(cmd);
    }
  }

  public setOnMessage(callback: (msg: string) => void) {
    this.onMessage = callback;
  }

  public async getBestMove(fen: string, depth: number = 10): Promise<string> {
    return new Promise((resolve) => {
      const handleMsg = (msg: string) => {
        if (msg.startsWith('bestmove')) {
          const move = msg.split(' ')[1];
          resolve(move);
        }
      };
      this.setOnMessage(handleMsg);
      this.sendCommand(`position fen ${fen}`);
      this.sendCommand(`go depth ${depth}`);
    });
  }

  public terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

/**
 * Bajnoki robotok szintje: 0 = „kezdő” robot. Nem Stockfish-sel lép, hanem
 * szándékosan gyengén (lásd pickBeginnerMove), hogy a diák biztosan legyőzhesse.
 */
export const TOURNAMENT_BOT_DIFFICULTY = 0;

/**
 * A lehető legkönnyebben legyőzhető lépésválasztás:
 * - soha nem ad mattot, és kerüli a pattot / döntetlent,
 * - nem üt, nem ad sakkot és nem vált be gyalogot, ha van más lehetősége,
 * - szívesen „ajándékoz”: gyakran olyan mezőre lép, ahol a diák leütheti.
 */
export const pickBeginnerMove = (fen: string): { from: string; to: string; promotion?: string } | null => {
  const base = new Chess(fen);
  const moves = base.moves({ verbose: true });
  if (moves.length === 0) return null;

  type Scored = { from: string; to: string; promotion?: string; tier: number; hangs: boolean };
  const scored: Scored[] = moves.map((m) => {
    const g = new Chess(fen);
    g.move({ from: m.from, to: m.to, promotion: m.promotion });
    const endsGame = g.isCheckmate() || g.isStalemate() || g.isDraw();
    const aggressive = !!m.captured || g.inCheck() || !!m.promotion;
    const hangs = g.moves({ verbose: true }).some((r) => r.to === m.to);
    // Kisebb tier = jobban preferált (gyengébb) lépés
    const tier = endsGame ? 3 : aggressive ? (m.captured || m.promotion ? 2 : 1) : 0;
    return { from: m.from, to: m.to, promotion: m.promotion ? 'n' : undefined, tier, hangs };
  });

  const bestTier = Math.min(...scored.map((s) => s.tier));
  const pool = scored.filter((s) => s.tier === bestTier);
  const gifts = pool.filter((s) => s.hangs);
  const pickFrom = gifts.length > 0 && Math.random() < 0.7 ? gifts : pool;
  const choice = pickFrom[Math.floor(Math.random() * pickFrom.length)];
  return { from: choice.from, to: choice.to, promotion: choice.promotion };
};

export const getDifficultyDepth = (level: number): number => {
  // levels 1-5
  const depths = [2, 5, 10, 15, 20];
  return depths[level - 1] || 10;
};
