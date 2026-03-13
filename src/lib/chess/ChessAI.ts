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

export const getDifficultyDepth = (level: number): number => {
  // levels 1-5
  const depths = [2, 5, 10, 15, 20];
  return depths[level - 1] || 10;
};
