import { describe, expect, it } from 'vitest';
import {
  INACTIVITY,
  MatchLike,
  botColorOf,
  canMateFromFen,
  computeClocks,
  evaluateReferee,
  idleSeconds,
  materialFromFen,
  pendingForfeit,
  plyFromFen,
  resolveDrawTiebreak,
  rpsOutcome,
  toMillis,
} from '@/lib/chess/chessRules';

const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
// 1. e4 e5 2. Nf3 – sötét jön, 3 fél-lépés
const AFTER_3_PLY = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
// 1. e4 e5 – világos jön, 2 fél-lépés
const AFTER_2_PLY = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';

const T0 = 1_700_000_000_000;

function match(over: Partial<MatchLike> = {}): MatchLike {
  return {
    fen: AFTER_2_PLY,
    status: 'active',
    white_id: 'uidW',
    black_id: 'uidB',
    time_limit: 300,
    white_time_remaining: 120,
    black_time_remaining: 200,
    turn_started_at: { seconds: T0 / 1000, nanoseconds: 0 },
    white_seen_at: T0,
    black_seen_at: T0,
    ...over,
  };
}

describe('alapok', () => {
  it('toMillis kezeli a Timestamp-, szám- és szövegformát', () => {
    expect(toMillis({ toMillis: () => 5 })).toBe(5);
    expect(toMillis({ seconds: 2, nanoseconds: 5_000_000 })).toBe(2005);
    expect(toMillis(7)).toBe(7);
    expect(toMillis('1970-01-01T00:00:01.000Z')).toBe(1000);
    expect(toMillis(null)).toBeNull();
  });

  it('plyFromFen', () => {
    expect(plyFromFen(START)).toBe(0);
    expect(plyFromFen(AFTER_2_PLY)).toBe(2);
    expect(plyFromFen(AFTER_3_PLY)).toBe(3);
  });

  it('botColorOf a bot_ előtagból', () => {
    expect(botColorOf({ white_id: 'bot_auto_1', black_id: 'x' })).toBe('white');
    expect(botColorOf({ white_id: 'x', black_id: 'bot_1' })).toBe('black');
    expect(botColorOf({ white_id: 'x', black_id: 'y' })).toBeNull();
  });
});

describe('szerveridős óra', () => {
  it('csak a lépésen lévő fél órája fogy, a tárolt időből és az eltelt időből számolva', () => {
    const c = computeClocks(match(), T0 + 30_000);
    expect(c.white).toBeCloseTo(90);
    expect(c.black).toBe(200);
    expect(c.running).toBe('white');
  });

  it('visszalépés után sem kap vissza időt (a számítás nem a helyi állapotból indul)', () => {
    // 10 perc távollét után az óra 0, nem a tárolt 120 mp
    expect(computeClocks(match(), T0 + 600_000).white).toBe(0);
  });

  it('a robot órája nem fogy', () => {
    const c = computeClocks(match({ white_id: 'bot_1' }), T0 + 60_000, { frozenColor: 'white' });
    expect(c.white).toBe(120);
  });

  it('lezárt játszmánál a befagyasztott értéket adja', () => {
    const c = computeClocks(match({ status: 'finished' }), T0 + 60_000);
    expect(c.white).toBe(120);
    expect(c.running).toBeNull();
  });

  it('időkorlát nélkül végtelen', () => {
    expect(computeClocks(match({ time_limit: 0 }), T0).timed).toBe(false);
  });
});

describe('döntetlen – ki jut tovább?', () => {
  const base = { whiteIsBot: false, blackIsBot: false, timed: true, whiteTime: 100, blackTime: 100, fen: START };

  it('robot ellen mindig a diák', () => {
    expect(resolveDrawTiebreak({ ...base, whiteIsBot: true, whiteTime: 300, blackTime: 1 }).winnerColor).toBe('black');
    expect(resolveDrawTiebreak({ ...base, blackIsBot: true }).winnerColor).toBe('white');
  });

  it('akinek több ideje maradt', () => {
    const r = resolveDrawTiebreak({ ...base, whiteTime: 40.7, blackTime: 95.2 });
    expect(r.winnerColor).toBe('black');
    expect(r.reason).toContain('több ideje');
  });

  it('egyenlő idő → anyagi előny', () => {
    // sötétnek hiányzik egy bástyája
    const fen = '1nbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQk - 0 1';
    expect(materialFromFen(fen)).toEqual({ white: 39, black: 34 });
    const r = resolveDrawTiebreak({ ...base, fen });
    expect(r.winnerColor).toBe('white');
    expect(r.reason).toContain('anyagi');
  });

  it('időkorlát nélkül rögtön az anyag dönt', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1';
    expect(resolveDrawTiebreak({ ...base, timed: false, whiteTime: Infinity, blackTime: Infinity, fen }).winnerColor).toBe('black');
  });

  it('minden egyenlő → kő-papír-olló', () => {
    expect(resolveDrawTiebreak(base).winnerColor).toBeNull();
  });

  it('kő-papír-olló kimenetel', () => {
    expect(rpsOutcome('rock', 'scissors')).toBe(1);
    expect(rpsOutcome('rock', 'paper')).toBe(-1);
    expect(rpsOutcome('paper', 'paper')).toBe(0);
  });
});

describe('játékvezető', () => {
  it('lejárt idő → az ellenfél nyer', () => {
    const v = evaluateReferee(match(), T0 + 121_000);
    expect(v?.result).toBe('black');
  });

  it('lejárt idő, de az ellenfél nem tud mattot adni → döntetlen', () => {
    const fen = '4k3/8/8/8/8/8/4P3/4K3 w - - 0 30'; // sötétnek csak királya van
    expect(canMateFromFen(fen, 'black')).toBe(false);
    expect(evaluateReferee(match({ fen }), T0 + 121_000)?.result).toBe('draw');
  });

  it('el nem kezdett játszma: 2 perc után az veszít, aki nem lépett', () => {
    const m = match({ fen: START, white_time_remaining: 300 });
    expect(evaluateReferee(m, T0 + 119_000)).toBeNull();
    expect(evaluateReferee(m, T0 + (INACTIVITY.NOT_STARTED_SEC + 1) * 1000)?.result).toBe('black');
  });

  it('kilépés: jelenlét-jel nélkül 75 mp után az ellenfél nyer', () => {
    const m = match({ time_limit: 0, white_seen_at: T0, white_active_at: T0 + 70_000 });
    const limit = (INACTIVITY.PRESENCE_STALE_SEC + INACTIVITY.PRESENCE_GRACE_SEC) * 1000;
    expect(evaluateReferee(m, T0 + limit - 1000)).toBeNull();
    const v = evaluateReferee(m, T0 + limit + 1000);
    expect(v?.result).toBe('black');
    expect(v?.reason).toContain('elhagyta');
  });

  it('„Itt vagy még?” megválaszolatlanul 90 mp után vereség; válasz esetén újraindul', () => {
    const now = T0 + 91_000;
    const present = { white_seen_at: now - 2000 };
    const idle = match({ time_limit: 0, ...present });
    expect(idleSeconds(idle, now, 'white')).toBeCloseTo(91);
    expect(evaluateReferee(idle, now)?.reason).toContain('Itt vagy még');

    const answered = match({ time_limit: 0, ...present, white_active_at: T0 + 50_000 });
    expect(evaluateReferee(answered, now)).toBeNull();
  });

  it('robot elleni meccsben a robot lépésekor a diák a felelős (kilépés)', () => {
    // sötét a robot és ő jön, a diák (világos) 80 mp óta nem jelzett
    const m = match({ fen: AFTER_3_PLY, black_id: 'bot_1', time_limit: 0, white_seen_at: T0 - 80_000 });
    const pf = pendingForfeit(m, T0 + 1000);
    expect(pf?.loser).toBe('white');
    expect(evaluateReferee(m, T0 + 1000)?.result).toBe('black');
  });

  it('a robot nem veszít időre', () => {
    const m = match({ fen: AFTER_3_PLY, black_id: 'bot_1', black_time_remaining: 5, black_seen_at: undefined });
    // a diák jelen van
    expect(evaluateReferee({ ...m, white_seen_at: T0 + 59_000 }, T0 + 60_000)).toBeNull();
  });

  it('lezárt játszmánál nincs teendő', () => {
    expect(evaluateReferee(match({ status: 'finished' }), T0 + 10_000_000)).toBeNull();
  });
});
