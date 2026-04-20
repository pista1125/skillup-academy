import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  Clock, 
  Users, 
  Check, 
  X, 
  PlayCircle,
  SearchIcon,
  Gamepad2
} from 'lucide-react';
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TorpedoLobbyProps {
  onStartGame: (matchId: string, opponentName?: string) => void;
  onJoinMatch: (match: TorpedoMatch) => void;
}

export default function TorpedoLobby({ onStartGame, onJoinMatch }: TorpedoLobbyProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<TorpedoMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data.user));
    loadData();

    // Subscribe to match changes
    const matchesSub = supabase
      .channel('torpedo_matches_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'torpedo_matches' }, () => loadMatchesData())
      .subscribe();

    return () => {
      matchesSub.unsubscribe();
    };
  }, []);

  const loadData = async () => {
    await loadMatchesData();
    // Reusing ChessService's friends logic for now as it's a shared table
    // But I'll try to find a generic way or just call the same logic
    try {
      // Reusing the general friends logic from the database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: friendsData } = await supabase
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
        
        if (friendsData) {
          const friendMap = new Map();
          friendsData.forEach(f => {
            const isSender = f.user_id === user.id;
            const profile = isSender ? f.receiver : f.sender;
            if (profile && !friendMap.has(profile.id)) {
              friendMap.set(profile.id, profile);
            }
          });
          setFriends(Array.from(friendMap.values()));
        }
      }
    } catch (e) {
      console.error('Failed to load friends', e);
    }
  };

  const loadMatchesData = async () => {
    try {
      const matches = await TorpedoService.getMatches();
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
      const results = await TorpedoService.searchProfiles(searchQuery);
      setSearchResults(results.filter((p: any) => p.id !== currentUser?.id));
    } catch (e) {
      toast.error('Hiba a keresés során');
    } finally {
      setIsSearching(false);
    }
  };

  const startNewMatch = async (opponentId: string, opponentName: string) => {
    try {
      const match = await TorpedoService.createMatch(opponentId);
      onStartGame(match.id, opponentName);
      toast.success('Kihívás elküldve!');
    } catch (e) {
      toast.error('Hiba a játék indításakor');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Player Search */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
              <Search size={22} className="text-secondary" />
              Kereső
            </h3>
            <form onSubmit={handleSearch} className="flex flex-col gap-3 mb-6">
              <div className="relative">
                <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Diák neve..." 
                  className="pl-10 h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
                />
              </div>
              <Button type="submit" disabled={isSearching} className="h-12 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20 transition-all active:scale-95">
                {isSearching ? <Clock size={20} className="animate-spin" /> : 'Keresés indítása'}
              </Button>
            </form>

            <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {searchResults.map(profile => (
                <div key={profile.id} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-secondary/30 transition-all">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{profile.full_name}</span>
                    <span className="text-[10px] text-slate-400">SkillUp diák</span>
                  </div>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    onClick={() => startNewMatch(profile.id, profile.full_name)}
                    className="rounded-xl h-10 w-10 shadow-md hover:scale-110 active:scale-90 transition-all"
                  >
                    <UserPlus size={18} />
                  </Button>
                </div>
              ))}
              {searchResults.length === 0 && searchQuery && !isSearching && (
                <div className="text-center py-8 opacity-40">
                   <p className="text-sm font-medium italic">Nincs ilyen nevű diák...</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Middle Column: Active Matches */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card className="p-8 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <Gamepad2 size={120} />
            </div>
            
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 relative">
              <PlayCircle size={32} />
              Aktív Játékok
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {activeMatches.filter(m => m.status !== 'finished').map(match => {
                const isP1 = match.p1_id === currentUser?.id;
                const opponentName = isP1 ? match.p2_profile?.full_name : match.p1_profile?.full_name;
                const isMyTurn = match.turn_id === currentUser?.id;
                const isWaiting = match.status === 'waiting';

                return (
                  <div 
                    key={match.id} 
                    className={cn(
                      "flex flex-col gap-4 p-5 rounded-3xl border transition-all cursor-pointer group/item",
                      isMyTurn && !isWaiting 
                        ? "bg-white text-indigo-600 border-white shadow-xl scale-105" 
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    )}
                    onClick={() => onJoinMatch(match)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-black opacity-60 mb-1">
                          {isWaiting ? 'Meghívás' : (isMyTurn ? 'Te következel!' : 'Ellenfél jön')}
                        </span>
                        <span className="text-lg font-black leading-tight italic truncate max-w-[120px]">
                          {opponentName || 'Várakozás...'}
                        </span>
                      </div>
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        isMyTurn ? "bg-emerald-400 animate-pulse" : "bg-white/30"
                      )} />
                    </div>
                    
                    <Button 
                      className={cn(
                        "w-full rounded-2xl font-black italic tracking-tighter uppercase",
                        isMyTurn && !isWaiting 
                          ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                          : "bg-white/20 text-white hover:bg-white/30"
                      )}
                    >
                      {isWaiting && !isP1 ? 'Elfogadás' : 'Belépés'}
                    </Button>
                  </div>
                );
              })}
              {activeMatches.filter(m => m.status !== 'finished').length === 0 && (
                <div className="col-span-2 py-12 flex flex-col items-center justify-center bg-white/5 rounded-[2rem] border border-white/10">
                   <Gamepad2 size={48} className="mb-4 opacity-50" />
                   <p className="font-bold text-lg opacity-80">Nincs folyamatban lévő játék</p>
                   <p className="text-sm opacity-50">Keress egy barátot és kezdjetek el játszani!</p>
                </div>
              )}
            </div>
          </Card>

          {/* Friends Quick List */}
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-800 dark:text-white">
                <Users size={22} className="text-indigo-500" />
                Barátaim
              </h3>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                {friends.length} diák
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {friends.map(friend => (
                <div 
                  key={friend.id} 
                  className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group"
                  onClick={() => startNewMatch(friend.id, friend.full_name)}
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-black">{friend.full_name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-bold text-center truncate w-full">{friend.full_name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-400">Elérhető</span>
                  </div>
                </div>
              ))}
              {friends.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center opacity-20">
                  <Users size={48} className="mb-2" />
                  <p className="font-bold">Még nincsenek barátok</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
