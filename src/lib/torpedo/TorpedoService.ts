import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';

export interface TorpedoMatch {
  id: string;
  p1_id: string | null;
  p2_id: string | null;
  p1_ships: any[];
  p2_ships: any[];
  p1_moves: any[];
  p2_moves: any[];
  turn_id: string | null;
  status: 'waiting' | 'placing' | 'playing' | 'finished';
  winner_id: string | null;
  settings: {
    axis_type: 'number' | 'letter';
    grid_size?: number;
  };
  created_at: string;
  updated_at: string;
  p1_profile?: { full_name: string };
  p2_profile?: { full_name: string };
}

export const TorpedoService = {
  async searchProfiles(searchQuery: string) {
    const q = query(collection(db, 'profiles'));
    const snapshot = await getDocs(q);
    const results: any[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (
        (data.full_name && data.full_name.toLowerCase().includes(lowerQuery)) ||
        (data.username && data.username.toLowerCase().includes(lowerQuery))
      ) {
        results.push({ id: docSnap.id, ...data });
      }
    });
    return results;
  },

  async createMatch(opponentId: string | null, axisType: 'number' | 'letter' = 'number') {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const now = new Date().toISOString();
    const matchData = {
      p1_id: user.uid,
      p2_id: opponentId,
      p1_ships: [],
      p2_ships: [],
      p1_moves: [],
      p2_moves: [],
      status: opponentId ? 'waiting' : 'placing',
      turn_id: user.uid,
      winner_id: null,
      settings: { axis_type: axisType },
      created_at: now,
      updated_at: now,
    };

    const docRef = await addDoc(collection(db, 'torpedo_matches'), matchData);
    return { id: docRef.id, ...matchData };
  },

  async getMatches() {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const q1 = query(collection(db, 'torpedo_matches'), where('p1_id', '==', user.uid));
    const q2 = query(collection(db, 'torpedo_matches'), where('p2_id', '==', user.uid));

    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const matchMap = new Map<string, any>();
    
    snap1.forEach(docSnap => matchMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() }));
    snap2.forEach(docSnap => matchMap.set(docSnap.id, { id: docSnap.id, ...docSnap.data() }));

    const matches = Array.from(matchMap.values());

    // Populate profile names if available
    for (const m of matches) {
      if (m.p1_id) {
        const p1Snap = await getDoc(doc(db, 'profiles', m.p1_id));
        if (p1Snap.exists()) {
          m.p1_profile = { full_name: p1Snap.data().full_name || 'Játékos 1' };
        }
      }
      if (m.p2_id) {
        const p2Snap = await getDoc(doc(db, 'profiles', m.p2_id));
        if (p2Snap.exists()) {
          m.p2_profile = { full_name: p2Snap.data().full_name || 'Játékos 2' };
        }
      }
    }

    return matches.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  },

  async deleteMatch(matchId: string) {
    await deleteDoc(doc(db, 'torpedo_matches', matchId));
  },

  async acceptMatch(matchId: string) {
    await updateDoc(doc(db, 'torpedo_matches', matchId), {
      status: 'placing',
      updated_at: new Date().toISOString(),
    });
  },

  async submitShips(matchId: string, ships: any[]) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const matchSnap = await getDoc(doc(db, 'torpedo_matches', matchId));
    if (!matchSnap.exists()) throw new Error('Match not found');

    const match = matchSnap.data();
    const isP1 = match.p1_id === user.uid;

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (isP1) {
      updateData.p1_ships = ships;
    } else {
      updateData.p2_ships = ships;
    }

    const hasP1Ships = isP1 ? true : (match.p1_ships && match.p1_ships.length > 0);
    const hasP2Ships = !isP1 ? true : (match.p2_ships && match.p2_ships.length > 0);

    if (hasP1Ships && hasP2Ships) {
      updateData.status = 'playing';
    }

    await updateDoc(doc(db, 'torpedo_matches', matchId), updateData);
  },

  async makeMove(matchId: string, x: number, y: number) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const matchSnap = await getDoc(doc(db, 'torpedo_matches', matchId));
    if (!matchSnap.exists()) throw new Error('Match not found');

    const match = matchSnap.data();
    if (match.turn_id !== user.uid) throw new Error('Not your turn');

    const isP1 = match.p1_id === user.uid;
    const opponentShips = isP1 ? (match.p2_ships || []) : (match.p1_ships || []);
    const myMoves = isP1 ? (match.p1_moves || []) : (match.p2_moves || []);

    const hit = opponentShips.some((ship: any) => 
      ship.cells.some((cell: any) => cell.x === x && cell.y === y)
    );

    const newMove = { x, y, hit, timestamp: new Date().toISOString() };
    const updatedMoves = [...myMoves, newMove];

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (isP1) {
      updateData.p1_moves = updatedMoves;
    } else {
      updateData.p2_moves = updatedMoves;
    }

    if (!hit) {
      updateData.turn_id = isP1 ? match.p2_id : match.p1_id;
    }

    const totalShipCells = opponentShips.reduce((acc: number, ship: any) => acc + (ship.cells ? ship.cells.length : 0), 0);
    const totalHits = updatedMoves.filter((m: any) => m.hit).length;

    if (totalHits > 0 && totalHits === totalShipCells) {
      updateData.status = 'finished';
      updateData.winner_id = user.uid;
    }

    await updateDoc(doc(db, 'torpedo_matches', matchId), updateData);
    return newMove;
  },

  subscribeToMatch(matchId: string, onUpdate: (payload: any) => void) {
    const unsubscribe = onSnapshot(doc(db, 'torpedo_matches', matchId), (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ new: { id: snapshot.id, ...snapshot.data() } });
      }
    });

    return {
      unsubscribe: () => unsubscribe()
    };
  }
};
