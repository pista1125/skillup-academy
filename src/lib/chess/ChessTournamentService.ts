import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import { ChessService, ChessProfile } from './ChessService';

export type TournamentStatus = 'waiting' | 'in_progress' | 'finished' | 'cancelled';

export interface TournamentParticipant {
  id: string;              // uid or 'bot_1', 'bot_2'...
  name: string;
  avatar_url?: string;
  user_code?: string;
  is_host?: boolean;
  is_bot?: boolean;
  bot_difficulty?: number; // 1-5
  is_eliminated?: boolean;
  rank?: number;
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
  status: 'pending' | 'in_progress' | 'finished' | 'bye';
  score?: string;          // "1 - 0", "0 - 1", "½ - ½"
  end_reason?: string;
  white_id?: string;
  black_id?: string;
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
  { name: 'Sakk Bot Dani', avatar: '🦊', diff: 2 },
  { name: 'Sakk Bot Lili', avatar: '🦁', diff: 3 },
  { name: 'Sakk Bot Bence', avatar: '🐼', diff: 2 },
  { name: 'Sakk Bot Anna', avatar: '🦉', diff: 4 },
  { name: 'Sakk Bot Peti', avatar: '🤖', diff: 1 },
  { name: 'Sakk Bot Zsófi', avatar: '🦄', diff: 3 },
  { name: 'Sakk Mester Bot', avatar: '👑', diff: 5 }
];

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

export const ChessTournamentService = {
  /**
   * Create a new tournament as the host
   */
  async createTournament(
    title: string, 
    timeLimit: number = 300, 
    maxPlayers: number = 8
  ): Promise<ChessTournament> {
    const user = auth.currentUser;
    if (!user) throw new Error('Nem vagy bejelentkezve');

    let profile: ChessProfile | null = null;
    try {
      profile = await ChessService.getProfileDetails(user.uid);
    } catch (e) {
      profile = {
        id: user.uid,
        full_name: user.displayName || 'Bajnokság Vezető',
        user_code: '100000'
      };
    }

    const hostParticipant: TournamentParticipant = {
      id: user.uid,
      name: profile?.full_name || user.displayName || 'Szervező',
      avatar_url: profile?.avatar_url,
      user_code: profile?.user_code,
      is_host: true,
      is_bot: false,
      is_eliminated: false
    };

    const code = generate6DigitCode();
    const now = new Date().toISOString();

    // Determine number of rounds (e.g. 4 players -> 2 rounds; 8 players -> 3 rounds; 16 players -> 4 rounds)
    const totalRounds = Math.ceil(Math.log2(maxPlayers));

    const tournamentData: Omit<ChessTournament, 'id'> = {
      code,
      title: title.trim() || 'Sakk Bajnokság',
      host_id: user.uid,
      host_name: hostParticipant.name,
      status: 'waiting',
      time_limit: timeLimit,
      max_players: maxPlayers,
      participants: [hostParticipant],
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

    // 1. If player is already a registered participant or host, return immediately
    const alreadyJoined = tournament.participants.some(p => p.id === user.uid) || tournament.host_id === user.uid;
    if (alreadyJoined) {
      return tournament;
    }

    // 2. If tournament already started or finished, allow entering as spectator/viewer
    if (tournament.status === 'in_progress' || tournament.status === 'finished') {
      return tournament;
    }

    // 3. If in waiting status, check if tournament is full
    if (tournament.participants.length >= tournament.max_players) {
      throw new Error('Ez a bajnokság már megtelt!');
    }

    let profile: ChessProfile | null = null;
    try {
      profile = await ChessService.getProfileDetails(user.uid);
    } catch (e) {
      profile = {
        id: user.uid,
        full_name: user.displayName || 'Diák',
        user_code: '100000'
      };
    }

    const newParticipant: TournamentParticipant = {
      id: user.uid,
      name: profile?.full_name || user.displayName || 'Diáktárs',
      avatar_url: profile?.avatar_url,
      user_code: profile?.user_code,
      is_host: false,
      is_bot: false,
      is_eliminated: false
    };

    const updatedParticipants = [...tournament.participants, newParticipant];

    await updateDoc(doc(db, 'chess_tournaments', tournament.id), {
      participants: updatedParticipants,
      updated_at: new Date().toISOString()
    });

    tournament.participants = updatedParticipants;
    return tournament;
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
    const tRef = doc(db, 'chess_tournaments', tournamentId);
    const snap = await getDoc(tRef);
    if (!snap.exists()) throw new Error('Bajnokság nem található');

    const tournament = snap.data() as ChessTournament;
    if (tournament.status !== 'waiting') throw new Error('A bajnokság már elindult');
    if (tournament.participants.length >= tournament.max_players) throw new Error('A bajnokság már betelt');

    const currentBotsCount = tournament.participants.filter(p => p.is_bot).length;
    const botTemplate = BOT_NAMES[currentBotsCount % BOT_NAMES.length];

    const botParticipant: TournamentParticipant = {
      id: `bot_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: `${botTemplate.name} #${currentBotsCount + 1}`,
      avatar_url: botTemplate.avatar,
      is_host: false,
      is_bot: true,
      bot_difficulty: customDifficulty || botTemplate.diff,
      is_eliminated: false
    };

    await updateDoc(tRef, {
      participants: [...tournament.participants, botParticipant],
      updated_at: new Date().toISOString()
    });
  },

  /**
   * Remove / Kick a participant (only host can do this in waiting status)
   */
  async removeParticipant(tournamentId: string, participantId: string): Promise<void> {
    const tRef = doc(db, 'chess_tournaments', tournamentId);
    const snap = await getDoc(tRef);
    if (!snap.exists()) throw new Error('Bajnokság nem található');

    const tournament = snap.data() as ChessTournament;
    const updatedParticipants = tournament.participants.filter(p => p.id !== participantId);

    await updateDoc(tRef, {
      participants: updatedParticipants,
      updated_at: new Date().toISOString()
    });
  },

  /**
   * Start the tournament:
   * 1. Shuffle participants
   * 2. Construct all tournament rounds and bracket tree
   * 3. For round 1, create real Firestore `chess_matches` for each pair
   * 4. Update tournament to 'in_progress'
   */
  async startTournament(tournamentId: string): Promise<void> {
    const tRef = doc(db, 'chess_tournaments', tournamentId);
    const snap = await getDoc(tRef);
    if (!snap.exists()) throw new Error('Bajnokság nem található');

    const tournament = snap.data() as ChessTournament;
    if (tournament.participants.length < 2) {
      throw new Error('A bajnokság indításához legalább 2 résztvevő szükséges!');
    }

    // Determine target bracket size: next power of 2 (2, 4, 8, 16)
    let bracketSize = 2;
    if (tournament.participants.length > 8) bracketSize = 16;
    else if (tournament.participants.length > 4) bracketSize = 8;
    else if (tournament.participants.length > 2) bracketSize = 4;

    const totalRounds = Math.log2(bracketSize);

    // Shuffle participants fairly
    const shuffled = [...tournament.participants].sort(() => Math.random() - 0.5);

    // Fill remaining spots with BYEs or friendly Bots if needed to complete power-of-2
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

    // Generate bracket rounds
    const rounds: TournamentRound[] = [];
    let currentMatchCount = bracketSize / 2;

    for (let r = 1; r <= totalRounds; r++) {
      const roundName = getRoundName(r, totalRounds);
      const matches: TournamentMatchNode[] = [];

      for (let m = 0; m < currentMatchCount; m++) {
        const nodeId = `r${r}_m${m}`;
        let p1: TournamentParticipant | null = null;
        let p2: TournamentParticipant | null = null;

        if (r === 1) {
          p1 = shuffled[m * 2] || null;
          p2 = shuffled[m * 2 + 1] || null;
        }

        matches.push({
          id: nodeId,
          round: r,
          round_name: roundName,
          match_index: m,
          player1: p1,
          player2: p2,
          winner_id: null,
          status: r === 1 ? 'in_progress' : 'pending'
        });
      }

      rounds.push({
        round_number: r,
        round_name: roundName,
        matches
      });

      currentMatchCount = currentMatchCount / 2;
    }

    // Create real Firestore matches for Round 1
    const round1 = rounds[0];
    for (const matchNode of round1.matches) {
      if (matchNode.player1 && matchNode.player2) {
        // Decide white/black (50% random)
        const isP1White = Math.random() < 0.5;
        const white = isP1White ? matchNode.player1 : matchNode.player2;
        const black = isP1White ? matchNode.player2 : matchNode.player1;

        matchNode.white_id = white.id;
        matchNode.black_id = black.id;

        const matchDoc = {
          white_id: white.id,
          black_id: black.id,
          status: 'active',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          last_move: null,
          winner_id: null,
          time_limit: tournament.time_limit,
          white_time_remaining: tournament.time_limit,
          black_time_remaining: tournament.time_limit,
          last_move_timestamp: Date.now(),
          end_reason: null,
          tournament_id: tournamentId,
          tournament_match_node_id: matchNode.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const createdMatch = await addDoc(collection(db, 'chess_matches'), matchDoc);
        matchNode.match_id = createdMatch.id;
      }
    }

    await updateDoc(tRef, {
      status: 'in_progress',
      current_round: 1,
      total_rounds: totalRounds,
      participants: shuffled,
      rounds: rounds,
      updated_at: new Date().toISOString()
    });
  },

  /**
   * Report match result in a tournament
   */
  async reportMatchResult(
    tournamentId: string, 
    matchNodeId: string, 
    winnerId: string, 
    endReason?: string
  ): Promise<void> {
    const tRef = doc(db, 'chess_tournaments', tournamentId);
    const snap = await getDoc(tRef);
    if (!snap.exists()) return;

    const tournament = snap.data() as ChessTournament;
    const currentRoundIdx = tournament.current_round - 1;
    const currentRound = tournament.rounds[currentRoundIdx];
    if (!currentRound) return;

    const matchNode = currentRound.matches.find(m => m.id === matchNodeId);
    if (!matchNode || matchNode.status === 'finished') return;

    // Determine winner & loser
    matchNode.winner_id = winnerId;
    matchNode.status = 'finished';
    matchNode.end_reason = endReason || 'Játszma befejezve';
    
    if (winnerId === matchNode.player1?.id) {
      matchNode.score = '1 - 0';
      if (matchNode.player2) matchNode.player2.is_eliminated = true;
    } else if (winnerId === matchNode.player2?.id) {
      matchNode.score = '0 - 1';
      if (matchNode.player1) matchNode.player1.is_eliminated = true;
    }

    // Check if all matches in the current round are completed
    const allFinished = currentRound.matches.every(m => m.status === 'finished' || m.status === 'bye');

    if (allFinished) {
      // Is this the Grand Final?
      if (tournament.current_round >= tournament.total_rounds) {
        const winningParticipant = tournament.participants.find(p => p.id === winnerId) || (winnerId === matchNode.player1?.id ? matchNode.player1 : matchNode.player2);
        const runnerUpParticipant = (winnerId === matchNode.player1?.id ? matchNode.player2 : matchNode.player1) || null;

        await updateDoc(tRef, {
          rounds: tournament.rounds,
          status: 'finished',
          winner: winningParticipant,
          runner_up: runnerUpParticipant,
          updated_at: new Date().toISOString()
        });
        return;
      }

      // Next round setup!
      const nextRoundIdx = tournament.current_round; // 1-indexed to 0-indexed next
      const nextRound = tournament.rounds[nextRoundIdx];

      if (nextRound) {
        for (let i = 0; i < nextRound.matches.length; i++) {
          const prevMatch1 = currentRound.matches[i * 2];
          const prevMatch2 = currentRound.matches[i * 2 + 1];

          const p1 = prevMatch1?.winner_id === prevMatch1?.player1?.id ? prevMatch1.player1 : prevMatch1?.player2;
          const p2 = prevMatch2?.winner_id === prevMatch2?.player1?.id ? prevMatch2.player1 : prevMatch2?.player2;

          const nextMatch = nextRound.matches[i];
          nextMatch.player1 = p1 || null;
          nextMatch.player2 = p2 || null;
          nextMatch.status = 'in_progress';

          if (p1 && p2) {
            const isP1White = Math.random() < 0.5;
            const white = isP1White ? p1 : p2;
            const black = isP1White ? p2 : p1;

            nextMatch.white_id = white.id;
            nextMatch.black_id = black.id;

            const matchDoc = {
              white_id: white.id,
              black_id: black.id,
              status: 'active',
              fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
              last_move: null,
              winner_id: null,
              time_limit: tournament.time_limit,
              white_time_remaining: tournament.time_limit,
              black_time_remaining: tournament.time_limit,
              last_move_timestamp: Date.now(),
              end_reason: null,
              tournament_id: tournamentId,
              tournament_match_node_id: nextMatch.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            const createdMatch = await addDoc(collection(db, 'chess_matches'), matchDoc);
            nextMatch.match_id = createdMatch.id;
          }
        }

        await updateDoc(tRef, {
          rounds: tournament.rounds,
          current_round: tournament.current_round + 1,
          updated_at: new Date().toISOString()
        });
        return;
      }
    }

    // Save current match result
    await updateDoc(tRef, {
      rounds: tournament.rounds,
      updated_at: new Date().toISOString()
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
