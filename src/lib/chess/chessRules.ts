/**
 * Bajnoki sakkszabályok – tiszta (Firestore-mentes) függvények, hogy tesztelhetők legyenek.
 *
 * - Óra: a szerveren a lépés pillanatában tárolt hátralévő idő + a lépés szerveridője
 *   (turn_started_at). A kijelzett idő = tárolt idő − (most − turn_started_at), így
 *   kilépés/visszalépés után sem „kap vissza” időt senki.
 * - Döntetlen-továbbjutás: robot ellen a diák; egyébként több hátralévő idő → anyagi előny →
 *   kő-papír-olló.
 * - Játékvezető: időtúllépés, el nem kezdett játszma, kilépés (nincs jelenlét-jel),
 *   inaktivitás („Itt vagy még?” megválaszolatlan).
 */

export type ChessColor = 'white' | 'black';

export const INACTIVITY = {
  /** Ennyi mp gondolkodás után jelenik meg az „Itt vagy még?” ablak. */
  PROMPT_AFTER_SEC: 60,
  /** Az ablak megjelenése után ennyi mp van a válaszra. */
  PROMPT_GRACE_SEC: 30,
  /** Ennyi mp jelenlét-jel nélkül tekintjük úgy, hogy a diák kilépett. */
  PRESENCE_STALE_SEC: 45,
  /** Kilépés után ennyi mp-ig várunk vissza. */
  PRESENCE_GRACE_SEC: 30,
  /** Az első lépés(ek)re ennyi mp jut (amíg mindkét fél nem lépett). */
  NOT_STARTED_SEC: 120,
  /** Jelenlét-jel gyakorisága. */
  HEARTBEAT_SEC: 10,
} as const;

export interface MatchLike {
  fen: string;
  status: string;
  white_id?: string | null;
  black_id?: string | null;
  time_limit?: number;
  white_time_remaining?: number;
  black_time_remaining?: number;
  turn_started_at?: unknown;
  last_move_timestamp?: unknown;
  created_at?: unknown;
  white_seen_at?: unknown;
  black_seen_at?: unknown;
  white_active_at?: unknown;
  black_active_at?: unknown;
}

export const otherColor = (c: ChessColor): ChessColor => (c === 'white' ? 'black' : 'white');

/** Firestore Timestamp / ms szám / ISO szöveg → ms (vagy null). */
export function toMillis(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string') {
    const t = Date.parse(v);
    return Number.isNaN(t) ? null : t;
  }
  if (typeof v === 'object') {
    const o = v as { toMillis?: () => number; seconds?: number; nanoseconds?: number };
    if (typeof o.toMillis === 'function') return o.toMillis();
    if (typeof o.seconds === 'number') return o.seconds * 1000 + Math.floor((o.nanoseconds || 0) / 1e6);
  }
  return null;
}

export function turnFromFen(fen: string): ChessColor {
  return fen.split(' ')[1] === 'b' ? 'black' : 'white';
}

/** Hány fél-lépés történt (a kezdőállásból számolva). */
export function plyFromFen(fen: string): number {
  const parts = fen.split(' ');
  const fullmove = parseInt(parts[5] || '1', 10) || 1;
  return (fullmove - 1) * 2 + (parts[1] === 'b' ? 1 : 0);
}

export function isBotId(id: string | null | undefined): boolean {
  return !!id && id.startsWith('bot_');
}

/** Melyik szín a robot (ha van) – a bajnoki robotok azonosítója `bot_`-tal kezdődik. */
export function botColorOf(match: Pick<MatchLike, 'white_id' | 'black_id'>): ChessColor | null {
  if (isBotId(match.white_id)) return 'white';
  if (isBotId(match.black_id)) return 'black';
  return null;
}

function turnStartMs(m: MatchLike): number | null {
  return toMillis(m.turn_started_at) ?? toMillis(m.last_move_timestamp) ?? toMillis(m.created_at);
}

export interface ClockReading {
  white: number;
  black: number;
  running: ChessColor | null;
  timed: boolean;
}

/**
 * A két óra aktuális állása (mp, tört is lehet). A robot órája nem fogy
 * (`frozenColor`) – a robot a diák gépén lép, így távollétben sem „csúszhat ki” az ideje.
 */
export function computeClocks(m: MatchLike, nowMs: number, opts: { frozenColor?: ChessColor | null } = {}): ClockReading {
  const limit = m.time_limit ?? 0;
  if (!limit || limit <= 0) {
    return { white: Infinity, black: Infinity, running: m.status === 'active' ? turnFromFen(m.fen) : null, timed: false };
  }
  let white = typeof m.white_time_remaining === 'number' ? m.white_time_remaining : limit;
  let black = typeof m.black_time_remaining === 'number' ? m.black_time_remaining : limit;
  if (m.status !== 'active') return { white, black, running: null, timed: true };

  const turn = turnFromFen(m.fen);
  const start = turnStartMs(m);
  if (start !== null && turn !== opts.frozenColor) {
    const elapsed = Math.max(0, (nowMs - start) / 1000);
    if (turn === 'white') white = Math.max(0, white - elapsed);
    else black = Math.max(0, black - elapsed);
  }
  return { white, black, running: turn, timed: true };
}

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

/** Anyagi érték a FEN alapján (gyalog 1, huszár/futó 3, bástya 5, vezér 9). */
export function materialFromFen(fen: string): { white: number; black: number } {
  let white = 0;
  let black = 0;
  for (const ch of fen.split(' ')[0]) {
    const lower = ch.toLowerCase();
    if (!(lower in PIECE_VALUES)) continue;
    if (ch === lower) black += PIECE_VALUES[lower];
    else white += PIECE_VALUES[lower];
  }
  return { white, black };
}

/** FIDE: van-e elég anyag a mattadáshoz (időtúllépésnél döntetlen, ha nincs). */
export function canMateFromFen(fen: string, color: ChessColor): boolean {
  const counts: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
  for (const ch of fen.split(' ')[0]) {
    const lower = ch.toLowerCase();
    if (!(lower in counts)) continue;
    const isWhitePiece = ch !== lower;
    if ((color === 'white') === isWhitePiece) counts[lower]++;
  }
  if (counts.p > 0 || counts.q > 0 || counts.r > 0) return true;
  if (counts.b >= 2) return true;
  if (counts.b >= 1 && counts.n >= 1) return true;
  return counts.n >= 3;
}

export function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds)) return '∞';
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Döntetlen → ki jut tovább?
// ---------------------------------------------------------------------------

export interface DrawContext {
  whiteIsBot: boolean;
  blackIsBot: boolean;
  timed: boolean;
  whiteTime: number;
  blackTime: number;
  fen: string;
}

export interface DrawResolution {
  /** null → kő-papír-olló dönt. */
  winnerColor: ChessColor | null;
  reason: string;
}

export function resolveDrawTiebreak(ctx: DrawContext): DrawResolution {
  if (ctx.whiteIsBot && !ctx.blackIsBot) return { winnerColor: 'black', reason: 'robot ellen döntetlennél a diák jut tovább' };
  if (ctx.blackIsBot && !ctx.whiteIsBot) return { winnerColor: 'white', reason: 'robot ellen döntetlennél a diák jut tovább' };

  if (ctx.timed) {
    const w = Math.floor(ctx.whiteTime);
    const b = Math.floor(ctx.blackTime);
    if (w !== b) {
      return {
        winnerColor: w > b ? 'white' : 'black',
        reason: `több ideje maradt (${formatClock(Math.max(w, b))} – ${formatClock(Math.min(w, b))})`,
      };
    }
  }

  const mat = materialFromFen(ctx.fen);
  if (mat.white !== mat.black) {
    return {
      winnerColor: mat.white > mat.black ? 'white' : 'black',
      reason: `anyagi előnyben volt (${Math.max(mat.white, mat.black)} – ${Math.min(mat.white, mat.black)} pont)`,
    };
  }

  return { winnerColor: null, reason: 'idő és anyag is egyenlő → kő-papír-olló dönt' };
}

/** Döntetlen-továbbjutás egy (befejezett) játszma-dokumentumból. */
export function resolveDrawFromMatch(m: MatchLike): DrawResolution {
  const clocks = computeClocks(m, Date.now());
  return resolveDrawTiebreak({
    whiteIsBot: isBotId(m.white_id),
    blackIsBot: isBotId(m.black_id),
    timed: clocks.timed,
    whiteTime: clocks.white,
    blackTime: clocks.black,
    fen: m.fen,
  });
}

// ---------------------------------------------------------------------------
// Kő-papír-olló
// ---------------------------------------------------------------------------

export type RpsChoice = 'rock' | 'paper' | 'scissors';

export const RPS_LABEL: Record<RpsChoice, string> = { rock: '✊ Kő', paper: '✋ Papír', scissors: '✌️ Olló' };

/** 1 → az első nyer, -1 → a második, 0 → döntetlen. */
export function rpsOutcome(a: RpsChoice, b: RpsChoice): 1 | 0 | -1 {
  if (a === b) return 0;
  const beats: Record<RpsChoice, RpsChoice> = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  return beats[a] === b ? 1 : -1;
}

// ---------------------------------------------------------------------------
// Játékvezető
// ---------------------------------------------------------------------------

export type ForfeitKind = 'not_started' | 'abandoned' | 'inactive';

export interface PendingForfeit {
  loser: ChessColor;
  kind: ForfeitKind;
  secondsLeft: number;
}

/** Ki a „felelős” fél: aki lépni jön – robot esetén mindig a diák (a robot a diák gépén lép). */
function responsibleColor(m: MatchLike, botColor: ChessColor | null): ChessColor {
  const turn = turnFromFen(m.fen);
  return botColor && turn === botColor ? otherColor(botColor) : turn;
}

/** Mióta tétlen az adott szín ebben a lépésben (mp). */
export function idleSeconds(m: MatchLike, nowMs: number, color: ChessColor): number {
  const start = turnStartMs(m) ?? nowMs;
  const active = toMillis(color === 'white' ? m.white_active_at : m.black_active_at) ?? 0;
  return Math.max(0, (nowMs - Math.max(start, active)) / 1000);
}

/** A legközelebbi (nem órához kötött) vereség-határidő, ha van. */
export function pendingForfeit(m: MatchLike, nowMs: number, botColor: ChessColor | null = botColorOf(m)): PendingForfeit | null {
  if (m.status !== 'active') return null;
  const turn = turnFromFen(m.fen);
  const responsible = responsibleColor(m, botColor);
  const start = turnStartMs(m) ?? nowMs;

  if (plyFromFen(m.fen) < 2) {
    const left = INACTIVITY.NOT_STARTED_SEC - (nowMs - start) / 1000;
    return { loser: responsible, kind: 'not_started', secondsLeft: left };
  }

  const candidates: PendingForfeit[] = [];
  const seen = toMillis(responsible === 'white' ? m.white_seen_at : m.black_seen_at) ?? start;
  candidates.push({
    loser: responsible,
    kind: 'abandoned',
    secondsLeft: INACTIVITY.PRESENCE_STALE_SEC + INACTIVITY.PRESENCE_GRACE_SEC - (nowMs - seen) / 1000,
  });
  if (turn === responsible) {
    candidates.push({
      loser: responsible,
      kind: 'inactive',
      secondsLeft: INACTIVITY.PROMPT_AFTER_SEC + INACTIVITY.PROMPT_GRACE_SEC - idleSeconds(m, nowMs, responsible),
    });
  }
  return candidates.reduce((a, b) => (b.secondsLeft < a.secondsLeft ? b : a));
}

export interface RefereeVerdict {
  result: ChessColor | 'draw';
  reason: string;
}

const FORFEIT_REASON: Record<ForfeitKind, (loser: string) => string> = {
  not_started: (l) => `${l} nem kezdte el a játszmát (2 percig nem lépett) ⏱️`,
  abandoned: (l) => `${l} elhagyta a játszmát 🚪`,
  inactive: (l) => `${l} nem válaszolt az „Itt vagy még?” kérdésre 💤`,
};

const COLOR_HU: Record<ChessColor, string> = { white: 'Világos', black: 'Sötét' };

/** Le kell-e most zárni a játszmát? (időtúllépés vagy inaktivitás) */
export function evaluateReferee(m: MatchLike, nowMs: number, botColor: ChessColor | null = botColorOf(m)): RefereeVerdict | null {
  if (m.status !== 'active') return null;
  const turn = turnFromFen(m.fen);

  const clocks = computeClocks(m, nowMs, { frozenColor: botColor });
  if (clocks.timed && turn !== botColor && clocks[turn] <= 0) {
    const opp = otherColor(turn);
    if (canMateFromFen(m.fen, opp)) {
      return { result: opp, reason: `${COLOR_HU[turn]} ideje lejárt! ${COLOR_HU[opp]} győzött időtúllépéssel ⏱️🏆` };
    }
    const dative = opp === 'white' ? 'Világosnak' : 'Sötétnek';
    return { result: 'draw', reason: `${COLOR_HU[turn]} ideje lejárt, de ${dative} nincs mattadáshoz elég figurája (Döntetlen 🤝)` };
  }

  const pf = pendingForfeit(m, nowMs, botColor);
  if (pf && pf.secondsLeft <= 0) {
    return { result: otherColor(pf.loser), reason: FORFEIT_REASON[pf.kind](COLOR_HU[pf.loser]) };
  }
  return null;
}
