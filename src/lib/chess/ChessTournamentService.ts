import { db, auth } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  Transaction,
  DocumentReference
} from 'firebase/firestore';
import { ChessService, ChessProfile, ChessMatch } from './ChessService';
import { RPS_LABEL, RpsChoice, plyFromFen, resolveDrawFromMatch, rpsOutcome } from './chessRules';

export type TournamentStatus = 'waiting' | 'in_progress' | 'finished' | 'cancelled';

export interface TournamentParticipant {
  id: string;              // uid or 'bot_1', 'bot_2'...
  name: string;
  avatar_url?: string;
  user_code?: string;
  is_host?: boolean;
  is_bot?: boolean;
  bot_difficulty?: number; // 0 = kezdő (bajnoki) robot, 1-5 = Stockfish-szintek
  is_eliminated?: boolean;
  rank?: number;
}

/** Kő-papír-olló a döntetlen utáni továbbjutásért (ha idő és anyag is egyenlő). */
export interface RpsTiebreak {
  round: number;
  choices: Record<string, RpsChoice>;
  history: Array<{ round: number; p1: RpsChoice; p2: RpsChoice }>;
}

export interface TournamentMatchNode {
  id: string;              // unique node id: "r1_m1", "r1_m2", "r2_m1", etc.
  match_id?: string;       // references `chess_matches` Firestore doc
  round: number;           // 1, 2, 3...
  round_name: string;      // "Negyeddöntő", "Elődöntő", "Döntő"
  match_index: number;     // 0, 1, 2, 3
  player1: TournamentParticipant | null;
  player2: TournamentParticipant | null;
  winner_id: string | null;
  /** 'tiebreak' = döntetlen lett, kő-papír-olló dönt. */
  status: 'pending' | 'in_progress' | 'finished' | 'bye' | 'tiebreak';
  score?: string;          // "1 - 0", "0 - 1", "½ - ½"
  end_reason?: string;
  white_id?: string;
  black_id?: string;
  rps?: RpsTiebreak | null;
  decided_by_host?: boolean;
}

export interface TournamentRound {
  round_number: number;
  round_name: string;
  matches: TournamentMatchNode[];
}

export interface ChessTournament {
  id: string;
  code: string;            // 6-digit PIN code (e.g. "849201")
  title: string;           // pl. "7.B Sakk Bajnokság"
  host_id: string;
  host_name: string;
  status: TournamentStatus;
  time_limit: number;      // in seconds: 60, 180, 300, 600, 0 = unlimited
  max_players: number;     // 4, 8, 16
  participants: TournamentParticipant[];
  current_round: number;
  total_rounds: number;
  rounds: TournamentRound[];
  winner: TournamentParticipant | null;
  runner_up: TournamentParticipant | null;
  third_place?: TournamentParticipant | null;
  created_at: string;
  updated_at: string;
}

const BOT_NAMES = [
  { name: 'Sakk Bot Dani', avatar: '🦊', diff: 0 },
  { name: 'Sakk Bot Lili', avatar: '🦁', diff: 0 },
  { name: 'Sakk Bot Bence', avatar: '🐼', diff: 0 },
  { name: 'Sakk Bot Anna', avatar: '🦉', diff: 0 },
  { name: 'Sakk Bot Peti', avatar: '🤖', diff: 0 },
  { name: 'Sakk Bot Zsófi', avatar: '🦄', diff: 0 },
  { name: 'Sakk Mester Bot', avatar: '👑', diff: 0 }
];

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function generate6DigitCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getRoundName(round: number, totalRounds: number): string {
  const diff = totalRounds - round;
  if (diff === 0) return 'Döntő 🏆';
  if (diff === 1) return 'Elődöntő ⚔️';
  if (diff === 2) return 'Negyeddöntő ♟️';
  if (diff === 3) return 'Nyolcaddöntő 🛡️';
  return `${round}. Forduló`;
}

async function loadProfile(uid: string, fallbackName: string): Promise<ChessProfile> {
  try {
    return await ChessService.getProfileDetails(uid);
  } catch {
    return { id: uid, full_name: auth.currentUser?.displayName || fallbackName, user_code: '100000' };
  }
}

function newMatchDoc(tournament: ChessTournament, tournamentId: string, node: TournamentMatchNode, whiteId: string, blackId: string) {
  return {
    white_id: whiteId,
    black_id: blackId,
    status: 'active',
    fen: START_FEN,
    last_move: null,
    winner_id: null,
    time_limit: tournament.time_limit,
    white_time_remaining: tournament.time_limit,
    black_time_remaining: tournament.time_limit,
    last_move_timestamp: Date.now(),
    turn_started_at: serverTimestamp(),
    end_reason: null,
    tournament_id: tournamentId,
    tournament_match_node_id: node.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Színsorsolás + játszma-dokumentum egy párosításhoz (tranzakcióban vagy anélkül).
 * Két robot között nincs valódi játszma – azt a szervező gépe szimulálja.
 */
function setUpPairing(
  tournament: ChessTournament,
  tournamentId: string,
  node: TournamentMatchNode,
  write: (ref: DocumentReference, data: Record<string, unknown>) => void
) {
  const p1 = node.player1;
  const p2 = node.player2;
  node.status = 'in_progress';
  node.winner_id = null;
  node.rps = null;
  if (!p1 || !p2) return;

  const isP1White = Math.random() < 0.5;
  const white = isP1White ? p1 : p2;
  const black = isP1White ? p2 : p1;
  node.white_id = white.id;
  node.black_id = black.id;

  if (p1.is_bot && p2.is_bot) {
    delete node.match_id;
    return;
  }
  const ref = doc(collection(db, 'chess_matches'));
  write(ref, newMatchDoc(tournament, tournamentId, node, white.id, black.id));
  node.match_id = ref.id;
}

function findNode(t: ChessTournament, nodeId: string): { roundIdx: number; node: TournamentMatchNode } | null {
  for (let r = 0; r < t.rounds.length; r++) {
    const node = t.rounds[r].matches.find((m) => m.id === nodeId);
    if (node) return { roundIdx: r, node };
  }
  return null;
}

function setEliminated(t: ChessTournament, participantId: string | undefined, value: boolean) {
  if (!participantId) return;
  const p = t.participants.find((x) => x.id === participantId);
  if (p) p.is_eliminated = value;
}

/** A győztes beírása a csomópontba (pontszám, kiesés jelölése). */
function writeNodeWinner(t: ChessTournament, node: TournamentMatchNode, winnerId: string, reason: string, score?: string) {
  const p1Won = winnerId === node.player1?.id;
  node.winner_id = winnerId;
  node.status = 'finished';
  node.end_reason = reason;
  node.score = score ?? (p1Won ? '1 - 0' : '0 - 1');
  node.rps = node.rps ?? null;
  if (node.player1) node.player1.is_eliminated = !p1Won;
  if (node.player2) node.player2.is_eliminated = p1Won;
  setEliminated(t, node.player1?.id, !p1Won);
  setEliminated(t, node.player2?.id, p1Won);
}

function winnerOf(node: TournamentMatchNode | undefined): TournamentParticipant | null {
  if (!node?.winner_id) return null;
  if (node.player1?.id === node.winner_id) return node.player1;
  if (node.player2?.id === node.winner_id) return node.player2;
  return null;
}

function loserOf(node: TournamentMatchNode | undefined): TournamentParticipant | null {
  if (!node?.winner_id) return null;
  if (node.player1?.id === node.winner_id) return node.player2;
  if (node.player2?.id === node.winner_id) return node.player1;
  return null;
}

/**
 * Ha a forduló minden meccse lezárult: döntő után eredményhirdetés, egyébként a következő
 * forduló párosítása és a játszmák létrehozása. A `t`-t helyben módosítja.
 */
function advanceIfRoundComplete(
  t: ChessTournament,
  tournamentId: string,
  write: (ref: DocumentReference, data: Record<string, unknown>) => void
) {
  const currentRound = t.rounds[t.current_round - 1];
  if (!currentRound) return;
  const done = currentRound.matches.every((m) => m.status === 'finished' || m.status === 'bye');
  if (!done) return;

  if (t.current_round >= t.total_rounds) {
    const final = currentRound.matches[0];
    t.status = 'finished';
    t.winner = winnerOf(final);
    t.runner_up = loserOf(final);
    // 3. hely: az elődöntőben a bajnoktól kikapott játékos
    const semis = t.rounds[t.current_round - 2]?.matches || [];
    const semiVsChampion = semis.find((m) => m.winner_id && m.winner_id === t.winner?.id);
    t.third_place = loserOf(semiVsChampion) ?? null;
    return;
  }

  const nextRound = t.rounds[t.current_round];
  if (!nextRound) return;
  nextRound.matches.forEach((nextNode, i) => {
    nextNode.player1 = winnerOf(currentRound.matches[i * 2]);
    nextNode.player2 = winnerOf(currentRound.matches[i * 2 + 1]);
    setUpPairing(t, tournamentId, nextNode, write);
  });
  t.current_round += 1;
}

/** Firestore nem fogad el undefined mezőt – a sima adatszerkezeteket megtisztítjuk. */
function plain<T>(v: T): T {
  return v === undefined ? (null as T) : JSON.parse(JSON.stringify(v));
}

function tournamentUpdate(t: ChessTournament) {
  return {
    rounds: plain(t.rounds),
    participants: plain(t.participants),
    current_round: t.current_round,
    total_rounds: t.total_rounds,
    status: t.status,
    winner: plain(t.winner ?? null),
    runner_up: plain(t.runner_up ?? null),
    third_place: plain(t.third_place ?? null),
    updated_at: new Date().toISOString(),
  };
}

/** Közös tranzakció-keret: beolvassa a bajnokságot, a `mutate` módosít, majd visszaírja. */
async function mutateTournament<T>(
  tournamentId: string,
  mutate: (
    t: ChessTournament,
    tx: Transaction,
    write: (ref: DocumentReference, data: Record<string, unknown>) => void
  ) => Promise<T | 'noop'> | T | 'noop'
): Promise<T | 'noop'> {
  const tRef = doc(db, 'chess_tournaments', tournamentId);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(tRef);
    if (!snap.exists()) return 'noop';
    const t = { id: snap.id, ...snap.data() } as ChessTournament;
    const pendingWrites: Array<[DocumentReference, Record<string, unknown>]> = [];
    const result = await mutate(t, tx, (ref, data) => pendingWrites.push([ref, data]));
    if (result === 'noop') return 'noop';
    pendingWrites.forEach(([ref, data]) => tx.set(ref, data));
    tx.update(tRef, tournamentUpdate(t));
    return result;
  });
}

export const ChessTournamentService = {
  /**
   * Új bajnokság. A szervező (tanár) alapból NEM játékos – a váróteremben beszállhat.
   */
  async createTournament(
    title: string,
    timeLimit: number = 300,
    maxPlayers: number = 8
  ): Promise<ChessTournament> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nem vagy bejelentkezve');

    const profile = await loadProfile(user.uid, 'Bajnokság Vezető');
    const code = generate6DigitCode();
    const now = new Date().toISOString();
    const totalRounds = Math.ceil(Math.log2(maxPlayers));

    const tournamentData: Omit<ChessTournament, 'id'> = {
      code,
      title: title.trim() || 'Sakk Bajnokság',
      host_id: user.uid,
      host_name: profile?.full_name || user.displayName || 'Szervező',
      status: 'waiting',
      time_limit: timeLimit,
      max_players: maxPlayers,
      participants: [],
      current_round: 1,
      total_rounds: totalRounds,
      rounds: [],
      winner: null,
      runner_up: null,
      third_place: null,
      created_at: now,
      updated_at: now
    };

    const docRef = await addDoc(collection(db, 'chess_tournaments'), tournamentData);
    return { id: docRef.id, ...tournamentData };
  },

  /** A szervező be- vagy kiszáll játékosként (csak a váróteremben). */
  async setHostPlaying(tournamentId: string, playing: boolean): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nem vagy bejelentkezve');
    const profile = playing ? await loadProfile(user.uid, 'Szervező') : null;
    await mutateTournament(tournamentId, (t) => {
      if (t.status !== 'waiting') throw new Error('A bajnokság már elindult');
      if (t.host_id !== user.uid) throw new Error('Csak a szervező teheti ezt meg');
      const already = t.participants.some((p) => p.id === user.uid);
      if (playing) {
        if (already) return 'noop';
        if (t.participants.length >= t.max_players) throw new Error('A bajnokság már betelt');
        t.participants.push({
          id: user.uid,
          name: profile?.full_name || user.displayName || 'Szervező',
          avatar_url: profile?.avatar_url,
          user_code: profile?.user_code,
          is_host: true,
          is_bot: false,
          is_eliminated: false
        });
      } else {
        if (!already) return 'noop';
        t.participants = t.participants.filter((p) => p.id !== user.uid);
      }
      return true;
    });
  },

  /**
   * Find and join a tournament by 6-digit PIN code (or rejoin an ongoing tournament)
   */
  async joinTournamentByCode(code: string): Promise<ChessTournament> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nem vagy bejelentkezve');

    const cleanCode = code.replace(/\s+/g, '').trim();
    if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      throw new Error('A bajnoksági kódnak pontosan 6 számjegyből kell állnia!');
    }

    const q = query(
      collection(db, 'chess_tournaments'),
      where('code', '==', cleanCode)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      throw new Error(`Nem található bajnokság ezzel a kóddal (${cleanCode}).`);
    }

    const docSnap = snap.docs[0];
    const tournament = { id: docSnap.id, ...docSnap.data() } as ChessTournament;

    // 1. Már résztvevő vagy a szervező → csak megnyitjuk
    const alreadyJoined = tournament.participants.some(p => p.id === user.uid) || tournament.host_id === user.uid;
    if (alreadyJoined) {
      return tournament;
    }

    // 2. Elindult / befejeződött → nézőként
    if (tournament.status === 'in_progress' || tournament.status === 'finished') {
      return tournament;
    }

    if (tournament.participants.length >= tournament.max_players) {
      throw new Error('Ez a bajnokság már megtelt!');
    }

    const profile = await loadProfile(user.uid, 'Diák');
    const newParticipant: TournamentParticipant = {
      id: user.uid,
      name: profile?.full_name || user.displayName || 'Diáktárs',
      avatar_url: profile?.avatar_url,
      user_code: profile?.user_code,
      is_host: false,
      is_bot: false,
      is_eliminated: false
    };

    let joined: ChessTournament = tournament;
    await mutateTournament(tournament.id, (t) => {
      if (t.participants.some((p) => p.id === user.uid)) {
        joined = t;
        return 'noop';
      }
      if (t.status !== 'waiting') {
        joined = t;
        return 'noop';
      }
      if (t.participants.length >= t.max_players) throw new Error('Ez a bajnokság már megtelt!');
      t.participants.push(newParticipant);
      joined = t;
      return true;
    });
    return joined;
  },

  /**
   * Get tournaments where current user is a participant or host
   */
  async getMyTournaments(): Promise<ChessTournament[]> {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const q = query(
        collection(db, 'chess_tournaments'),
        where('status', 'in', ['waiting', 'in_progress', 'finished'])
      );
      const snap = await getDocs(q);
      const list: ChessTournament[] = [];
      snap.forEach(d => {
        const t = { id: d.id, ...d.data() } as ChessTournament;
        if (t.host_id === user.uid || t.participants?.some(p => p.id === user.uid)) {
          list.push(t);
        }
      });
      return list.sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
    } catch (e) {
      console.warn('getMyTournaments failed:', e);
      return [];
    }
  },

  /**
   * Get list of open active tournaments
   */
  async getOpenTournaments(): Promise<ChessTournament[]> {
    try {
      const q = query(
        collection(db, 'chess_tournaments'),
        where('status', 'in', ['waiting', 'in_progress'])
      );
      const snap = await getDocs(q);
      const list: ChessTournament[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as ChessTournament));
      return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (e) {
      console.warn('getOpenTournaments failed:', e);
      return [];
    }
  },

  /**
   * Add an AI bot participant to fill a slot
   */
  async addBotParticipant(tournamentId: string, customDifficulty?: number): Promise<void> {
    await mutateTournament(tournamentId, (t) => {
      if (t.status !== 'waiting') throw new Error('A bajnokság már elindult');
      if (t.participants.length >= t.max_players) throw new Error('A bajnokság már betelt');

      const currentBotsCount = t.participants.filter(p => p.is_bot).length;
      const botTemplate = BOT_NAMES[currentBotsCount % BOT_NAMES.length];
      t.participants.push({
        id: `bot_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        name: `${botTemplate.name} #${currentBotsCount + 1}`,
        avatar_url: botTemplate.avatar,
        is_host: false,
        is_bot: true,
        bot_difficulty: customDifficulty ?? botTemplate.diff,
        is_eliminated: false
      });
      return true;
    });
  },

  /**
   * Remove / Kick a participant (waiting room)
   */
  async removeParticipant(tournamentId: string, participantId: string): Promise<void> {
    await mutateTournament(tournamentId, (t) => {
      if (t.status !== 'waiting') return 'noop';
      t.participants = t.participants.filter(p => p.id !== participantId);
      return true;
    });
  },

  /**
   * Bajnokság indítása: sorsolás, ágrajz, 1. forduló játszmái.
   */
  async startTournament(tournamentId: string): Promise<void> {
    await mutateTournament(tournamentId, (t, _tx, write) => {
      if (t.status !== 'waiting') return 'noop';
      if (t.participants.length < 2) {
        throw new Error('A bajnokság indításához legalább 2 résztvevő szükséges!');
      }

      let bracketSize = 2;
      if (t.participants.length > 8) bracketSize = 16;
      else if (t.participants.length > 4) bracketSize = 8;
      else if (t.participants.length > 2) bracketSize = 4;
      const totalRounds = Math.log2(bracketSize);

      // Fisher–Yates keverés
      const shuffled = [...t.participants];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Hiányzó helyek feltöltése kezdő robotokkal
      while (shuffled.length < bracketSize) {
        const botIdx = shuffled.filter(p => p.is_bot).length;
        const template = BOT_NAMES[botIdx % BOT_NAMES.length];
        shuffled.push({
          id: `bot_auto_${Date.now()}_${botIdx}`,
          name: `${template.name}`,
          avatar_url: template.avatar,
          is_bot: true,
          bot_difficulty: template.diff,
          is_eliminated: false
        });
      }

      const rounds: TournamentRound[] = [];
      let matchCount = bracketSize / 2;
      for (let r = 1; r <= totalRounds; r++) {
        const roundName = getRoundName(r, totalRounds);
        const matches: TournamentMatchNode[] = [];
        for (let m = 0; m < matchCount; m++) {
          matches.push({
            id: `r${r}_m${m}`,
            round: r,
            round_name: roundName,
            match_index: m,
            player1: r === 1 ? shuffled[m * 2] || null : null,
            player2: r === 1 ? shuffled[m * 2 + 1] || null : null,
            winner_id: null,
            status: 'pending',
            rps: null
          });
        }
        rounds.push({ round_number: r, round_name: roundName, matches });
        matchCount = matchCount / 2;
      }

      t.status = 'in_progress';
      t.current_round = 1;
      t.total_rounds = totalRounds;
      t.participants = shuffled;
      t.rounds = rounds;
      rounds[0].matches.forEach((node) => setUpPairing(t, tournamentId, node, write));
      return true;
    });
  },

  /**
   * Egy meccs eredményének átvétele a bajnokságba – a győztest MINDIG a játszma
   * dokumentumából számolja (nem a hívó mondja meg), tranzakcióban, egyszer.
   * Bárki hívhatja (játékos, néző, szervező) – ha már rögzítve van, nem csinál semmit.
   */
  async syncMatchResult(tournamentId: string, nodeId: string): Promise<void> {
    await mutateTournament(tournamentId, async (t, tx, write) => {
      const found = findNode(t, nodeId);
      if (!found) return 'noop';
      const { node } = found;
      if (node.status !== 'in_progress' || !node.match_id) return 'noop';

      const mSnap = await tx.get(doc(db, 'chess_matches', node.match_id));
      if (!mSnap.exists()) return 'noop';
      const m = mSnap.data() as ChessMatch;
      if (m.status !== 'finished' || !m.winner_id) return 'noop';

      const reason = m.end_reason || 'Játszma befejezve';
      if (m.winner_id === 'draw') {
        const res = resolveDrawFromMatch(m);
        if (!res.winnerColor) {
          node.status = 'tiebreak';
          node.score = '½ - ½';
          node.end_reason = `${reason} – ${res.reason}`;
          node.rps = { round: 1, choices: {}, history: [] };
          return true;
        }
        const winnerId = res.winnerColor === 'white' ? m.white_id : m.black_id;
        if (!winnerId || (winnerId !== node.player1?.id && winnerId !== node.player2?.id)) return 'noop';
        writeNodeWinner(t, node, winnerId, `${reason} → továbbjut, mert ${res.reason}`, '½ - ½');
      } else {
        if (m.winner_id !== node.player1?.id && m.winner_id !== node.player2?.id) {
          console.warn('Ismeretlen győztes a játszmában', node.id, m.winner_id);
          return 'noop';
        }
        writeNodeWinner(t, node, m.winner_id, reason);
      }
      advanceIfRoundComplete(t, tournamentId, write);
      return true;
    });
  },

  /** Robot–robot meccs szimulálása (a szervező gépe hívja). */
  async resolveBotMatch(tournamentId: string, nodeId: string): Promise<void> {
    await mutateTournament(tournamentId, (t, _tx, write) => {
      const found = findNode(t, nodeId);
      if (!found) return 'noop';
      const { node } = found;
      if (node.status !== 'in_progress' || !node.player1?.is_bot || !node.player2?.is_bot) return 'noop';
      const d1 = Math.max(1, node.player1.bot_difficulty || 1);
      const d2 = Math.max(1, node.player2.bot_difficulty || 1);
      const p1Wins = Math.random() < d1 / (d1 + d2);
      const winner = p1Wins ? node.player1 : node.player2;
      writeNodeWinner(t, node, winner.id, `${winner.name} győzött 🤖🏆`);
      advanceIfRoundComplete(t, tournamentId, write);
      return true;
    });
  },

  /** Kő-papír-olló választás a döntetlen utáni továbbjutásért. */
  async submitRpsChoice(tournamentId: string, nodeId: string, choice: RpsChoice): Promise<void> {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error('Nem vagy bejelentkezve');
    await mutateTournament(tournamentId, (t, _tx, write) => {
      const found = findNode(t, nodeId);
      if (!found) return 'noop';
      const { node } = found;
      if (node.status !== 'tiebreak' || !node.player1 || !node.player2) return 'noop';
      if (uid !== node.player1.id && uid !== node.player2.id) return 'noop';

      const rps: RpsTiebreak = node.rps ?? { round: 1, choices: {}, history: [] };
      if (rps.choices[uid]) return 'noop';
      rps.choices = { ...rps.choices, [uid]: choice };
      node.rps = rps;

      const c1 = rps.choices[node.player1.id];
      const c2 = rps.choices[node.player2.id];
      if (!c1 || !c2) return true;

      rps.history = [...(rps.history || []), { round: rps.round, p1: c1, p2: c2 }];
      const out = rpsOutcome(c1, c2);
      if (out === 0) {
        rps.round += 1;
        rps.choices = {};
        return true;
      }
      const winner = out === 1 ? node.player1 : node.player2;
      writeNodeWinner(
        t,
        node,
        winner.id,
        `${node.end_reason || 'Döntetlen'} – kő-papír-olló: ${node.player1.name} ${RPS_LABEL[c1]} vs ${node.player2.name} ${RPS_LABEL[c2]}`,
        '½ - ½'
      );
      advanceIfRoundComplete(t, tournamentId, write);
      return true;
    });
  },

  /**
   * Tanári döntés: a szervező kijelöli egy meccs továbbjutóját.
   * - Folyamatban lévő / kő-papír-ollós meccs: lezárja.
   * - Már lezárt meccs: átírja, ha a következő meccs még el sem kezdődött.
   */
  async overrideResult(tournamentId: string, nodeId: string, winnerId: string): Promise<void> {
    const uid = auth.currentUser?.uid;
    await mutateTournament(tournamentId, async (t, tx, write) => {
      if (t.host_id !== uid) throw new Error('Csak a szervező dönthet');
      const found = findNode(t, nodeId);
      if (!found) throw new Error('A meccs nem található');
      const { node, roundIdx } = found;
      if (winnerId !== node.player1?.id && winnerId !== node.player2?.id) throw new Error('Érvénytelen győztes');
      const winner = winnerId === node.player1?.id ? node.player1! : node.player2!;
      const reason = `Tanári döntés: ${winner.name} jut tovább ⚖️`;

      // Minden olvasás az írások előtt
      const matchRef = node.match_id ? doc(db, 'chess_matches', node.match_id) : null;
      const matchSnap = matchRef ? await tx.get(matchRef) : null;

      const isLaterRound = roundIdx < t.current_round - 1 || (t.status === 'finished' && roundIdx < t.rounds.length - 1);
      let nextNode: TournamentMatchNode | null = null;
      let nextMatchSnap: Awaited<ReturnType<Transaction['get']>> | null = null;
      if (node.status === 'finished' && isLaterRound) {
        nextNode = t.rounds[roundIdx + 1]?.matches[Math.floor(node.match_index / 2)] ?? null;
        if (!nextNode) throw new Error('A következő meccs nem található');
        if (nextNode.status === 'finished' || nextNode.status === 'tiebreak') {
          throw new Error('A következő meccs már eldőlt – előbb azt kell módosítani.');
        }
        if (nextNode.match_id) {
          nextMatchSnap = await tx.get(doc(db, 'chess_matches', nextNode.match_id));
          const nm = nextMatchSnap.exists() ? (nextMatchSnap.data() as ChessMatch) : null;
          if (nm && plyFromFen(nm.fen) > 0) {
            throw new Error('A következő meccs már elkezdődött – ott már nem cserélhető a játékos.');
          }
        }
      }

      if (node.winner_id === winnerId && node.status === 'finished') return 'noop';

      // A játszma lezárása, ha még fut
      if (matchRef && matchSnap?.exists()) {
        const m = matchSnap.data() as ChessMatch;
        if (m.status !== 'finished') {
          tx.update(matchRef, {
            status: 'finished',
            winner_id: winnerId,
            end_reason: reason,
            draw_offered_by: null,
            updated_at: new Date().toISOString(),
          });
        }
      }

      const oldWinnerId = node.winner_id;
      writeNodeWinner(t, node, winnerId, reason, node.score === '½ - ½' ? '½ - ½' : undefined);
      node.decided_by_host = true;

      if (nextNode && oldWinnerId) {
        // A korábbi továbbjutó cseréje a következő meccsben
        const slot = node.match_index % 2 === 0 ? 'player1' : 'player2';
        nextNode[slot] = { ...winner, is_eliminated: false };
        if (nextNode.white_id === oldWinnerId) nextNode.white_id = winnerId;
        if (nextNode.black_id === oldWinnerId) nextNode.black_id = winnerId;
        if (nextNode.match_id && nextMatchSnap?.exists()) {
          const nm = nextMatchSnap.data() as ChessMatch;
          tx.update(doc(db, 'chess_matches', nextNode.match_id), {
            white_id: nm.white_id === oldWinnerId ? winnerId : nm.white_id,
            black_id: nm.black_id === oldWinnerId ? winnerId : nm.black_id,
            turn_started_at: serverTimestamp(),
            updated_at: new Date().toISOString(),
          });
        } else if (nextNode.player1 && nextNode.player2 && !(nextNode.player1.is_bot && nextNode.player2.is_bot)) {
          setUpPairing(t, tournamentId, nextNode, write);
        }
      } else if (t.status === 'finished' && roundIdx === t.rounds.length - 1) {
        // A döntő átírása
        t.winner = winnerOf(node);
        t.runner_up = loserOf(node);
        const semis = t.rounds[roundIdx - 1]?.matches || [];
        t.third_place = loserOf(semis.find((m) => m.winner_id === t.winner?.id)) ?? null;
      } else {
        advanceIfRoundComplete(t, tournamentId, write);
      }
      return true;
    });
  },

  /**
   * Subscribe to real-time updates of a tournament
   */
  subscribeToTournament(tournamentId: string, onUpdate: (tournament: ChessTournament) => void) {
    const unsubscribe = onSnapshot(doc(db, 'chess_tournaments', tournamentId), (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ id: snapshot.id, ...snapshot.data() } as ChessTournament);
      }
    });

    return {
      unsubscribe: () => unsubscribe()
    };
  },

  /**
   * Cancel / Delete a tournament
   */
  async cancelTournament(tournamentId: string): Promise<void> {
    await deleteDoc(doc(db, 'chess_tournaments', tournamentId));
  }
};

