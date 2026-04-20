import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Anchor, 
  Trophy,
  Users,
  Settings2,
  HelpCircle
} from 'lucide-react';
import TorpedoLobby from "./torpedo/TorpedoLobby";
import TorpedoPlacement from "./torpedo/TorpedoPlacement";
import TorpedoCombat from "./torpedo/TorpedoCombat";
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TorpedoGameProps {
  onBack?: () => void;
}

type GameState = 'lobby' | 'placement' | 'combat';

export default function TorpedoGame({ onBack }: TorpedoGameProps) {
  const [gameState, setGameState] = useState<GameState>('lobby');
  const [currentMatch, setCurrentMatch] = useState<TorpedoMatch | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [axisType, setAxisType] = useState<'number' | 'letter'>('number');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);

  const handleStartGame = (matchId: string) => {
    // This is called when a new match is created from lobby
    // We fetch it and move to placement
    fetchMatchAndMove(matchId, 'placement');
  };

  const handleJoinMatch = (match: TorpedoMatch) => {
    setCurrentMatch(match);
    if (match.status === 'waiting') {
      // If it's a pending invitation for us, we need to accept it
      if (match.p2_id === userId) {
        TorpedoService.acceptMatch(match.id).then(() => {
          setGameState('placement');
        });
      } else {
        // We are p1, just waiting
        setGameState('placement');
      }
    } else if (match.status === 'placing') {
      setGameState('placement');
    } else if (match.status === 'playing' || match.status === 'finished') {
      setGameState('combat');
    }
  };

  const fetchMatchAndMove = async (matchId: string, state: GameState) => {
    try {
      const { data, error } = await supabase
        .from('torpedo_matches')
        .select(`
          *,
          p1_profile:profiles!torpedo_matches_p1_id_fkey(full_name),
          p2_profile:profiles!torpedo_matches_p2_id_fkey(full_name)
        `)
        .eq('id', matchId)
        .single();
      
      if (error) throw error;
      setCurrentMatch(data as TorpedoMatch);
      setGameState(state);
    } catch (e) {
      toast.error('Hiba a játék adatok betöltésekor');
    }
  };

  const handlePlacementComplete = async (ships: any[]) => {
    if (!currentMatch) return;
    try {
      await TorpedoService.submitShips(currentMatch.id, ships);
      toast.success('Hajók elmentve! Várakozás az ellenfélre...');
      // Move to combat - the combat component will wait if status is still 'placing'
      fetchMatchAndMove(currentMatch.id, 'combat');
    } catch (e) {
      toast.error('Hiba az elhelyezés mentésekor');
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center rounded-3xl shadow-xl">
           <p className="text-xl font-bold mb-4">Bejelentkezés szükséges</p>
           <p className="text-slate-500 mb-6">A játékhoz kérlek jelentkezz be!</p>
           <Button onClick={onBack} variant="outline">Vissza</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={gameState === 'lobby' ? onBack : () => setGameState('lobby')}
            className="rounded-2xl h-12 px-6 hover:bg-white dark:hover:bg-indigo-900/20 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-black italic gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {gameState === 'lobby' ? 'VISSZA' : 'LOBBI'}
          </Button>

          <div className="h-10 w-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
              <Anchor size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase">
              TORPEDÓ <span className="text-indigo-600">MATEK</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {gameState === 'lobby' && (
            <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button 
                onClick={() => setAxisType('number')}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-tight",
                  axisType === 'number' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Számok
              </button>
              <button 
                onClick={() => setAxisType('letter')}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-tight",
                  axisType === 'letter' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Betűk
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Trophy size={18} className="text-amber-500" />
            <span className="text-sm font-black text-slate-700 dark:text-slate-300">0 Pont</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {gameState === 'lobby' && (
          <TorpedoLobby 
            onStartGame={handleStartGame} 
            onJoinMatch={handleJoinMatch} 
          />
        )}

        {gameState === 'placement' && currentMatch && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="mb-8 text-center max-w-2xl mx-auto">
               <h2 className="text-3xl font-black mb-3 italic tracking-tighter">ELHELYEZÉSI FÁZIS</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium">
                 Helyezd el a flottádat a 10x10-es koordináta-rendszerben! Ügyelj rá, hogy a hajók ne érintkezzenek egymással.
               </p>
            </div>
            <TorpedoPlacement 
               axisType={currentMatch.settings.axis_type} 
               onComplete={handlePlacementComplete} 
            />
          </div>
        )}

        {gameState === 'combat' && currentMatch && (
          <TorpedoCombat 
            match={currentMatch} 
            userId={userId} 
            onBack={() => setGameState('lobby')} 
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <Users size={16} />
               <span className="text-xs font-bold uppercase">PvP Játékmód</span>
            </div>
            <div className="flex items-center gap-2">
               <Settings2 size={16} />
               <span className="text-xs font-bold uppercase">Koordináta Gyakorlás</span>
            </div>
         </div>
         <div className="flex items-center gap-2 text-xs font-bold uppercase">
            <HelpCircle size={16} />
            <span>Útmutató a játékhoz</span>
         </div>
      </div>
    </div>
  );
}
