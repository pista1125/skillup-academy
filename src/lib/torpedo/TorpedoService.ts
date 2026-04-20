import { supabase } from '@/lib/supabase';

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
  async searchProfiles(query: string) {
    const { data, error } = await supabase.rpc('search_profiles', {
      search_query: query
    });
    if (error) throw error;
    return data;
  },

  async createMatch(opponentId: string | null, axisType: 'number' | 'letter' = 'number') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const matchData = {
      p1_id: user.id,
      p2_id: opponentId,
      status: opponentId ? 'waiting' : 'placing', // If solo, skip waiting
      turn_id: user.id,
      settings: { axis_type: axisType }
    };

    const { data, error } = await supabase
      .from('torpedo_matches')
      .insert(matchData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMatches() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('torpedo_matches')
      .select(`
        *,
        p1_profile:profiles!torpedo_matches_p1_id_fkey(full_name),
        p2_profile:profiles!torpedo_matches_p2_id_fkey(full_name)
      `)
      .or(`p1_id.eq.${user.id},p2_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async acceptMatch(matchId: string) {
    const { error } = await supabase
      .from('torpedo_matches')
      .update({ status: 'placing' })
      .eq('id', matchId);
    if (error) throw error;
  },

  async submitShips(matchId: string, ships: any[]) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: match, error: getError } = await supabase
      .from('torpedo_matches')
      .select('*')
      .eq('id', matchId)
      .single();

    if (getError) throw getError;

    const isP1 = match.p1_id === user.id;
    const updateData: any = {};
    if (isP1) {
      updateData.p1_ships = ships;
    } else {
      updateData.p2_ships = ships;
    }

    // Check if both have ships now
    const hasP1Ships = isP1 ? true : (match.p1_ships && match.p1_ships.length > 0);
    const hasP2Ships = !isP1 ? true : (match.p2_ships && match.p2_ships.length > 0);

    if (hasP1Ships && hasP2Ships) {
      updateData.status = 'playing';
    }

    const { error } = await supabase
      .from('torpedo_matches')
      .update(updateData)
      .eq('id', matchId);

    if (error) throw error;
  },

  async makeMove(matchId: string, x: number, y: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: match, error: getError } = await supabase
      .from('torpedo_matches')
      .select('*')
      .eq('id', matchId)
      .single();

    if (getError) throw getError;
    if (match.turn_id !== user.id) throw new Error('Not your turn');

    const isP1 = match.p1_id === user.id;
    const opponentShips = isP1 ? match.p2_ships : match.p1_ships;
    const myMoves = isP1 ? match.p1_moves : match.p2_moves;

    // Check if hit
    const hit = opponentShips.some((ship: any) => 
      ship.cells.some((cell: any) => cell.x === x && cell.y === y)
    );

    const newMove = { x, y, hit, timestamp: new Date().toISOString() };
    const updatedMoves = [...myMoves, newMove];

    const updateData: any = {};
    if (isP1) {
      updateData.p1_moves = updatedMoves;
    } else {
      updateData.p2_moves = updatedMoves;
    }

    // Turn logic: shoot again on hit
    if (!hit) {
      updateData.turn_id = isP1 ? match.p2_id : match.p1_id;
    }

    // Win condition check
    const totalShipCells = opponentShips.reduce((acc: number, ship: any) => acc + ship.cells.length, 0);
    const totalHits = updatedMoves.filter((m: any) => m.hit).length;

    if (totalHits === totalShipCells) {
      updateData.status = 'finished';
      updateData.winner_id = user.id;
    }

    const { error } = await supabase
      .from('torpedo_matches')
      .update(updateData)
      .eq('id', matchId);

    if (error) throw error;
    return newMove;
  },

  subscribeToMatch(matchId: string, onUpdate: (payload: any) => void) {
    return supabase
      .channel(`torpedo:${matchId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'torpedo_matches',
        filter: `id=eq.${matchId}`
      }, onUpdate)
      .subscribe();
  }
};
