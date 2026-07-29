import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  Users, 
  Check, 
  SearchIcon,
  Gamepad2,
  Crosshair,
  Trash2
} from 'lucide-react';
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { ChessService } from '@/lib/chess/ChessService';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TorpedoLobbyProps {
  onStartGame: (matchId: string, opponentName?: string) => void;
  onJoinMatch: (match: TorpedoMatch) => void;
  onStartLocalGame: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function TorpedoLobby({ onStartGame, onJoinMatch, onStartLocalGame }: TorpedoLobbyProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<TorpedoMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
    loadData();

    const unsubscribe = onSnapshot(collection(db, 'torpedo_matches'), () => loadMatchesData());

    return () => {
      unsubscribe();
    };
  }, []);

  const loadData = async () => {
    await loadMatchesData();
    try {
      if (auth.currentUser) {
        const friendsList = await ChessService.getFriends();
        setFriends(friendsList);
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

  const startNewMatch = async (friendId: string, friendName: string) => {
    try {
      const match = await TorpedoService.createMatch(friendId);
      toast.success(`Torpedó mérkőzés felajánlva: ${friendName}!`);
      onStartGame(match.id, friendName);
    } catch (e) {
      toast.error('Nem sikerült elindítani a mérkőzést.');
    }
  };

  const handleDeleteMatch = async (e: React.MouseEvent, matchId: string) => {
    e.stopPropagation();
    try {
      await TorpedoService.deleteMatch(matchId);
      toast.success('Mérkőzés törölve.');
      loadMatchesData();
    } catch (e) {
      toast.error('Nem sikerült törölni a mérkőzést.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Modes Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Solo vs Computer Card */}
        <Card className="p-8 rounded-3xl border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl select-none pointer-events-none text-indigo-500">
            🤖
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-wider mb-2">
                <Gamepad2 className="w-4 h-4" /> Gyakorló Mód
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Játék a Gép Ellen (AI)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Gyakorold a koordináták használatát egy mesterséges intelligencia ellen! 
              </p>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Nehézségi szint</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'easy', label: 'Könnyű', emoji: '🌱' },
                  { id: 'medium', label: 'Közepes', emoji: '🦊' },
                  { id: 'hard', label: 'Nehéz', emoji: '🔥' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDifficulty(d.id as any)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-center",
                      selectedDifficulty === d.id
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <span className="text-2xl mb-1">{d.emoji}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={() => onStartLocalGame(selectedDifficulty)}
            className="w-full h-14 mt-6 rounded-2xl text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <Crosshair className="w-6 h-6" />
            Játék Indítása (AI)
          </Button>
        </Card>

        {/* Multiplayer & Friends Card */}
        <div className="space-y-6">
          {/* Active Matches */}
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
              <Crosshair className="w-5 h-5 text-indigo-500" />
              Aktív Torpedó Meccseid
            </h3>

            {activeMatches.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm italic">
                Nincs folyamatban lévő torpedó mérkőzésed.
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {activeMatches.map((m) => {
                  const isP1 = m.p1_id === currentUser?.uid;
                  const oppName = isP1 ? m.p2_profile?.full_name : m.p1_profile?.full_name;
                  return (
                    <div 
                      key={m.id} 
                      onClick={() => onJoinMatch(m)}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer hover:border-indigo-400 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🚀</span>
                        <div>
                          <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                            {oppName || 'Várakozás ellenfélre...'}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {m.status === 'waiting' ? 'Várakozik' : m.status === 'placing' ? 'Elhelyezés' : m.status === 'playing' ? 'Csata' : 'Befejezve'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Megnyitás
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => handleDeleteMatch(e, m.id)}
                          className="h-8 w-8 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Friends List for Challenge */}
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-500" />
              Kihívás Barátaid Közül ({friends.length})
            </h3>
            {friends.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm italic">
                Keress diáktársakat a keresőben a kihíváshoz!
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {friends.map((f) => (
                  <div key={f.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-sm">{f.full_name}</span>
                    <Button 
                      size="sm" 
                      onClick={() => startNewMatch(f.id, f.full_name)}
                      className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Kihívás 🎯
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Search New Friends */}
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
              <SearchIcon className="w-5 h-5 text-indigo-500" />
              Diáktárs Keresése
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

            <div className="space-y-2 max-h-48 overflow-y-auto">
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
    </div>
  );
}
