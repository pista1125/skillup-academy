import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  Clock, 
  Cpu, 
  Users, 
  Check, 
  X, 
  ShieldCheck,
  Sword,
  SearchIcon,
  PlayCircle
} from 'lucide-react';
import { ChessService } from '@/lib/chess/ChessService';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChessLobbyProps {
  onStartGame: (mode: 'ai' | 'friend', options: { difficulty?: number, opponentId?: string, opponentName?: string, matchId?: string, isWhite?: boolean }) => void;
}

export default function ChessLobby({ onStartGame }: ChessLobbyProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'friends'>('ai');
  const [difficulty, setDifficulty] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data.user));
    loadFriendsData();

    // Subscribe to friends table changes
    const friendsSub = supabase
      .channel('friends_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'friends' }, () => loadFriendsData())
      .subscribe();

    // Subscribe to match changes
    const matchesSub = supabase
      .channel('matches_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chess_matches' }, () => loadMatchesData())
      .subscribe();

    return () => {
      friendsSub.unsubscribe();
      matchesSub.unsubscribe();
    };
  }, []);

  const loadFriendsData = async () => {
    try {
      const [friendsList, pendingRequests] = await Promise.all([
        ChessService.getFriends(),
        ChessService.getFriendRequests()
      ]);
      setFriends(friendsList);
      setRequests(pendingRequests);
    } catch (e) {
      console.error('Failed to load friends data', e);
    }
    loadMatchesData();
  };

  const loadMatchesData = async () => {
    try {
      const matches = await ChessService.getMatches();
      setActiveMatches(matches);
    } catch (e) {
      console.error('Failed to load matches', e);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await ChessService.searchProfiles(searchQuery);
      setSearchResults(results.filter((p: any) => p.id !== currentUser?.id));
    } catch (e) {
      toast.error('Hiba a keresés során');
    } finally {
      setIsSearching(false);
    }
  };

  const sendRequest = async (profileId: string) => {
    try {
      await ChessService.sendFriendRequest(profileId);
      toast.success('Barátkérés elküldve!');
      setSearchResults(prev => prev.filter(p => p.id !== profileId));
    } catch (e) {
      toast.error('Már küldtél kérést vagy hiba történt');
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      await ChessService.respondFriendRequest(requestId, 'accepted');
      toast.success('Kérés elfogadva!');
      loadFriendsData();
    } catch (e) {
      toast.error('Hiba történt');
    }
  };

  const joinMatch = async (match: any) => {
    if (match.status === 'waiting' && match.black_id === currentUser.id) {
      await ChessService.acceptMatch(match.id);
    }
    
    const isWhite = match.white_id === currentUser.id;
    const opponentProfile = isWhite ? match.black_profile : match.white_profile;
    
    onStartGame('friend', {
      matchId: match.id,
      opponentId: isWhite ? match.black_id : match.white_id,
      opponentName: opponentProfile?.full_name || 'Ellenfelek',
      isWhite
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('ai')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            activeTab === 'ai' 
              ? "bg-indigo-600 text-white shadow-md" 
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          <Cpu size={20} />
          <span>Robot ellen</span>
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            activeTab === 'friends' 
              ? "bg-indigo-600 text-white shadow-md" 
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          <Users size={20} />
          <span>Barátok ellen</span>
        </button>
      </div>

      {activeTab === 'ai' ? (
        <Card className="p-8 rounded-3xl border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 text-center flex flex-col items-center">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 mb-6 scale-110">
            <Cpu size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Válassz nehézséget!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
            Készülj fel a játszmára a Stockfish motor ellen. Minél magasabb a szint, annál mélyebben számol a gép.
          </p>

          <div className="grid grid-cols-5 gap-3 w-full max-w-md mb-8">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all",
                  difficulty === level 
                    ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-600 text-indigo-600 dark:text-indigo-400 shadow-lg scale-110" 
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200"
                )}
              >
                <ShieldCheck size={difficulty === level ? 24 : 18} />
                <span className="text-xs font-bold">{level}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full justify-center">
            <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-800">
              Szint: {['Gyerekjáték', 'Könnyű', 'Közepes', 'Nehéz', 'Mester'][difficulty-1]}
            </div>
          </div>

          <Button 
            onClick={() => onStartGame('ai', { difficulty })}
            className="mt-8 h-12 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-3 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Sword size={20} />
            Játék indítása
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {/* Friend Search */}
            <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Search size={18} className="text-indigo-600" />
                Barátok keresése
              </h3>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Teljes név..." 
                    className="pl-9 rounded-xl border-slate-200 dark:border-slate-800"
                  />
                </div>
                <Button type="submit" disabled={isSearching} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                  {isSearching ? <Clock size={16} className="animate-spin" /> : 'Keresés'}
                </Button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {searchResults.map(profile => (
                  <div key={profile.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-sm">{profile.full_name}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => sendRequest(profile.id)}
                      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 h-auto"
                    >
                      <UserPlus size={18} />
                    </Button>
                  </div>
                ))}
                {searchResults.length === 0 && searchQuery && !isSearching && (
                  <p className="text-center text-xs text-slate-400 py-4">Nincs találat</p>
                )}
              </div>
            </Card>

            {/* Friend Requests */}
            {requests.length > 0 && (
              <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900">
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                  Barátkérések ({requests.length})
                </h3>
                <div className="space-y-2">
                  {requests.map(req => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-900">
                      <span className="font-bold text-sm">{req.profiles?.full_name}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => acceptRequest(req.id)} className="text-emerald-600 p-1.5 h-auto">
                          <Check size={18} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-rose-600 p-1.5 h-auto">
                          <X size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Friends List & Active Matches */}
          <div className="flex flex-col gap-6">
            {/* Active Matches / Invitations */}
            {activeMatches.length > 0 && (
              <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg bg-indigo-600 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <PlayCircle size={18} />
                  Folyamatban lévő meccsek
                </h3>
                <div className="space-y-3">
                  {activeMatches.map(match => {
                    const isWhite = match.white_id === currentUser?.id;
                    const opponentName = isWhite ? match.black_profile?.full_name : match.white_profile?.full_name;
                    const isMyTurn = (match.fen.split(' ')[1] === 'w' && isWhite) || (match.fen.split(' ')[1] === 'b' && !isWhite);
                    const isWaiting = match.status === 'waiting';

                    return (
                      <div key={match.id} className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-all">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">
                            {isWaiting ? `Meghívás: ${opponentName}` : `Meccs: ${opponentName}`}
                          </span>
                          <span className="text-[10px] opacity-70">
                            {isWaiting ? 'Várakozás az elfogadásra...' : (isMyTurn ? 'Te következel!' : 'Partner következik')}
                          </span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => joinMatch(match)}
                          className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold h-8 px-4"
                        >
                          {isWaiting && match.black_id === currentUser?.id ? 'Elfogadás' : 'Belépés'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users size={18} className="text-indigo-600" />
                Barátaim
              </h3>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-indigo-200 hover:bg-white transition-all">
                    <div className="flex flex-col">
                      <span className="font-bold">{friend.full_name}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                      </span>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => onStartGame('friend', { opponentId: friend.id, opponentName: friend.full_name })}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all shadow-lg"
                    >
                      Kihívás
                    </Button>
                  </div>
                ))}
                {friends.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                    <Users size={48} className="mb-4" />
                    <p className="font-bold">Még nincsenek barátaid</p>
                    <p className="text-sm">Keress ismerősöket a név alapján!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
