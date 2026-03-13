import { supabase } from '@/lib/supabase';

export interface ChessMatch {
  id: string;
  white_id: string | null;
  black_id: string | null;
  fen: string;
  last_move: string | null;
  status: 'active' | 'finished' | 'waiting';
  winner_id: string | null;
  created_at: string;
  updated_at: string;
  white_profile?: { full_name: string };
  black_profile?: { full_name: string };
}

export const ChessService = {
  async searchProfiles(query: string) {
    const { data, error } = await supabase.rpc('search_profiles', {
      search_query: query
    });
    if (error) throw error;
    return data;
  },

  async sendFriendRequest(friendId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('friends')
      .insert({
        user_id: user.id,
        friend_id: friendId,
        status: 'pending'
      });
    if (error) throw error;
  },

  async getFriendRequests() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('friends')
      .select('*, profiles:profiles!friends_user_id_fkey(full_name)')
      .eq('friend_id', user.id)
      .eq('status', 'pending');
    
    if (error) throw error;
    return data;
  },

  async respondFriendRequest(requestId: string, status: 'accepted' | 'rejected') {
    const { error } = await supabase
      .from('friends')
      .update({ status })
      .eq('id', requestId);
    if (error) throw error;
  },

  async getFriends() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get where user is either sender or receiver and status is accepted
    const { data, error } = await supabase
      .from('friends')
      .select(`
        id,
        user_id,
        friend_id,
        status,
        sender:profiles!friends_user_id_fkey(id, full_name),
        receiver:profiles!friends_friend_id_fkey(id, full_name)
      `)
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted');

    if (error) throw error;
    
    return data.map(f => {
      const isSender = f.user_id === user.id;
      return isSender ? f.receiver : f.sender;
    });
  },

  async createMatch(opponentId: string | null, isWhite: boolean = true) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const matchData = {
      white_id: isWhite ? user.id : opponentId,
      black_id: isWhite ? opponentId : user.id,
      status: opponentId ? 'waiting' : 'active', // Waiting for friend if multiplayer
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    };

    const { data, error } = await supabase
      .from('chess_matches')
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
      .from('chess_matches')
      .select(`
        *,
        white_profile:profiles!chess_matches_white_id_fkey(full_name),
        black_profile:profiles!chess_matches_black_id_fkey(full_name)
      `)
      .or(`white_id.eq.${user.id},black_id.eq.${user.id}`)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async acceptMatch(matchId: string) {
    const { error } = await supabase
      .from('chess_matches')
      .update({ status: 'active' })
      .eq('id', matchId);
    if (error) throw error;
  },

  async updateMatch(matchId: string, fen: string, lastMove: string, status: string = 'active') {
    const { error } = await supabase
      .from('chess_matches')
      .update({ fen, last_move: lastMove, status, updated_at: new Date().toISOString() })
      .eq('id', matchId);
    if (error) throw error;
  },

  subscribeToMatch(matchId: string, onUpdate: (payload: any) => void) {
    return supabase
      .channel(`match:${matchId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'chess_matches',
        filter: `id=eq.${matchId}`
      }, onUpdate)
      .subscribe();
  }
};
