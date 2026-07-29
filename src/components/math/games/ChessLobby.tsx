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
  ShieldCheck,
  Sword,
  SearchIcon,
  PlayCircle
} from 'lucide-react';
import { ChessService } from '@/lib/chess/ChessService';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChessLobbyProps {
  onStartGame: (mode: 'ai' | 'friend', options: { difficulty?: number, opponentId?: string, opponentName?: string, matchId?: string, isWhite?: boolean }) => void;
}

export default function ChessLobby({ onStartGame }: ChessLobbyProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'friends'>('friends');
  const [difficulty, setDifficulty] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        loadFriendsData();
      }
    });

    const unsubscribeFriends = onSnapshot(collection(db, 'friends'), () => loadFriendsData());
    const unsubscribeMatches = onSnapshot(collection(db, 'chess_matches'), () => loadMatchesData());

    return () => {
      unsubscribeAuth();
      unsubscribeFriends();
      unsubscribeMatches();
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
      setSearchResults(results.filter((p: any) => p.id !== currentUser?.uid));
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
    if (match.status === 'waiting' && match.black_id === currentUser?.uid) {
      await ChessService.acceptMatch(match.id);
    }
    const isWhite = match.white_id === currentUser?.uid;
    const opponentName = isWhite ? match.black_profile?.full_name : match.white_profile?.full_name;
    onStartGame('friend', {
      matchId: match.id,
      isWhite,
      opponentName: opponentName || 'Ellenfeled'
    });
  };

  const startNewMatch = async (friendId: string, friendName: string) => {
    try {
      const match = await ChessService.createMatch(friendId, true);
      toast.success(`Mérkőzés felajánlva: ${friendName}!`);
      onStartGame('friend', {
        matchId: match.id,
        isWhite: true,
        opponentName: friendName
      });
    } catch (e) {
      toast.error('Nem sikerült elindítani a mérkőzést.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-200/60 dark:bg-slate-800/60 p-1.5 rounded-2xl max-w-md mx-auto backdrop-blur-md border border-white/20">
        <button
          onClick={() => setActiveTab('ai')}
          className={cn(
            "flex-1 py-3 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300",
            activeTab === 'ai' 
              ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xl scale-[1.02]" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          )}
        >
          <Cpu className="w-4 h-4" />
          Gép Ellen (AI)
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={cn(
            "flex-1 py-3 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300",
            activeTab === 'friends' 
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xl scale-[1.02]" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          )}
        >
          <Users className="w-4 h-4" />
          Barátok & Többjátékos
        </button>
      </div>

      {/* AI Mode Selection */}
      {activeTab === 'ai' && (
        <Card className="p-8 rounded-3xl border-2 border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl select-none pointer-events-none text-amber-500">
            🤖
          </div>
          
          <div className="max-w-xl space-y-6 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-amber-500" />
                Válassz Nehézségi Szintet!
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Gyakorolj a Stockfish által hajtott sakk motor ellen. Állítsd be a neked megfelelő kihívást!
              </p>
            </div>

            {/* Difficulty Slider / Cards */}
            <div className="grid grid-cols-5 gap-3">
              {[
                { lvl: 1, label: 'Kezdő', emoji: '🌱' },
                { lvl: 2, label: 'Könnyű', emoji: '🐣' },
                { lvl: 3, label: 'Közepes', emoji: '🦊' },
                { lvl: 4, label: 'Nehéz', emoji: '🦁' },
                { lvl: 5, label: 'Mester', emoji: '👑' },
              ].map(({ lvl, label, emoji }) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-center",
                    difficulty === lvl 
                      ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <span className="text-2xl mb-1">{emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
                </button>
              ))}
            </div>

            <Button
              onClick={() => onStartGame('ai', { difficulty })}
              className="w-full h-14 rounded-2xl text-lg font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Játék Indítása (Szint {difficulty})
            </Button>
          </div>
        </Card>
      )}

      {/* Friends & Multiplayer Mode */}
      {activeTab === 'friends' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Matches & Invites */}
          <div className="space-y-6">
            <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Sword className="w-5 h-5 text-indigo-500" />
                Aktív Mérkőzéseid
              </h3>

              {activeMatches.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm italic">
                  Nincs folyamatban lévő mérkőzésed.
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {activeMatches.map((m) => {
                    const isWhite = m.white_id === currentUser?.uid;
                    const oppName = isWhite ? m.black_profile?.full_name : m.white_profile?.full_name;
                    return (
                      <div key={m.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{isWhite ? '♔' : '♚'}</span>
                          <div>
                            <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                              {oppName || 'Várakozás barátra...'}
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              {m.status === 'waiting' ? 'Várakozik' : 'Folyamatban'}
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => joinMatch(m)}
                          className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          {m.status === 'waiting' && m.black_id === currentUser?.uid ? 'Elfogadás' : 'Folytatás'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Friend Requests */}
            {requests.length > 0 && (
              <Card className="p-6 rounded-3xl border-amber-500/30 bg-amber-500/5 backdrop-blur-md">
                <h3 className="text-lg font-black text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                  Beérkező Barátkérések ({requests.length})
                </h3>
                <div className="space-y-2">
                  {requests.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/40">
                      <span className="font-bold text-sm">{r.profiles?.full_name}</span>
                      <div className="flex gap-2">
                        <Button size="icon" onClick={() => acceptRequest(r.id)} className="h-8 w-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white">
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Friends List */}
            <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-indigo-500" />
                Barátaid ({friends.length})
              </h3>
              {friends.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm italic">
                  Még nincsenek barátaid. Keress diáktársakat a jobb oldali keresővel!
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {friends.map((f) => (
                    <div key={f.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <span className="font-bold text-sm">{f.full_name}</span>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => startNewMatch(f.id, f.full_name)}
                        className="rounded-xl font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                      >
                        Kihívás ⚔️
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Search New Friends */}
          <div className="space-y-6">
            <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                <SearchIcon className="w-5 h-5 text-indigo-500" />
                Keress Diáktársakat!
              </h3>
              
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keresés név alapján..."
                  className="rounded-xl"
                />
                <Button type="submit" disabled={isSearching} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                  <Search className="w-4 h-4" />
                </Button>
              </form>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {searchResults.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-sm">{p.full_name || 'Névtelen diák'}</span>
                    <Button 
                      size="sm" 
                      onClick={() => sendRequest(p.id)}
                      className="rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-1" /> Jelölés
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
