import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Anchor, 
  Trophy,
  Users,
  Settings2,
  HelpCircle,
  Maximize2,
  Minimize2
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);

  // Listen for fullscreen changes (e.g. pressing Escape)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
      } catch (e) {
        toast.error('Teljes képernyős mód nem támogatott ebben a böngészőben.');
      }
    } else {
      document.exitFullscreen();
    }
  };

  const handleStartGame = (matchId: string) => {
    fetchMatchAndMove(matchId, 'placement');
  };

  const handleStartLocalGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    const localMatch: TorpedoMatch = {
      id: `local-${Date.now()}`,
      p1_id: userId || 'player',
      p2_id: 'computer',
      p1_ships: [],
      p2_ships: [],
      p1_moves: [],
      p2_moves: [],
      turn_id: userId || 'player',
      status: 'placing',
      winner_id: null,
      settings: {
        axis_type: axisType,
        is_local: true,
        difficulty: difficulty
      } as any,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      p1_profile: { full_name: 'Te' },
      p2_profile: { 
        full_name: difficulty === 'easy' ? 'Gép (Könnyű)' : difficulty === 'medium' ? 'Gép (Közepes)' : 'Gép (Nehéz)' 
      }
    };
    setCurrentMatch(localMatch);
    setGameState('placement');
  };

  const handleJoinMatch = (match: TorpedoMatch) => {
    setCurrentMatch(match);
    if (match.status === 'waiting') {
      if (match.p2_id === userId) {
        TorpedoService.acceptMatch(match.id).then(() => {
          setGameState('placement');
        });
      } else {
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
    
    if (currentMatch.settings.is_local) {
      try {
        const { generateBotShips } = await import('@/lib/torpedo/botHelpers');
        const botShips = generateBotShips();
        
        const updatedMatch: TorpedoMatch = {
          ...currentMatch,
          p1_ships: ships,
          p2_ships: botShips,
          status: 'playing',
          turn_id: currentMatch.p1_id
        };
        
        setCurrentMatch(updatedMatch);
        setGameState('combat');
        toast.success('Hajók elhelyezve! Kezdődik a csata.');
      } catch (e) {
        toast.error('Hiba a bot flotta generálásakor');
      }
      return;
    }

    try {
      await TorpedoService.submitShips(currentMatch.id, ships);
      toast.success('Hajók elmentve! Várakozás az ellenfélre...');
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
    <div
      ref={containerRef}
      className={cn(
        "bg-slate-50 dark:bg-slate-950 transition-all duration-300",
        isFullscreen
          ? "fixed inset-0 z-[9999] overflow-y-auto p-3 md:p-6"
          : "min-h-screen p-3 md:p-8"
      )}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-8 flex items-center justify-between gap-2">
        {/* Left: back + title */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Button 
            variant="ghost" 
            onClick={gameState === 'lobby' ? onBack : () => setGameState('lobby')}
            className="rounded-2xl h-10 md:h-12 px-3 md:px-6 hover:bg-white dark:hover:bg-indigo-900/20 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-black italic gap-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">{gameState === 'lobby' ? 'VISSZA' : 'LOBBI'}</span>
          </Button>

          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="p-2 md:p-2.5 bg-indigo-600 rounded-xl md:rounded-2xl text-white shadow-lg shadow-indigo-500/30 shrink-0">
              <Anchor size={18} className="md:hidden" />
              <Anchor size={22} className="hidden md:block" />
            </div>
            <h1 className="text-lg md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase truncate">
              TORPEDÓ <span className="text-indigo-600">MATEK</span>
            </h1>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2 shrink-0">
          {gameState === 'lobby' && (
            <div className="hidden sm:flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button 
                onClick={() => setAxisType('number')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-black transition-all uppercase tracking-tight",
                  axisType === 'number' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Számok
              </button>
              <button 
                onClick={() => setAxisType('letter')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-black transition-all uppercase tracking-tight",
                  axisType === 'letter' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Betűk
              </button>
            </div>
          )}

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-sm font-black text-slate-700 dark:text-slate-300">0 Pont</span>
          </div>

          {/* Fullscreen toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="h-10 w-10 md:h-11 md:w-11 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyő'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>

      {/* Axis switcher on mobile (lobby only) */}
      {gameState === 'lobby' && (
        <div className="sm:hidden max-w-7xl mx-auto mb-4 flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
          <button
            onClick={() => setAxisType('number')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all uppercase",
              axisType === 'number' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500"
            )}
          >Számok</button>
          <button
            onClick={() => setAxisType('letter')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all uppercase",
              axisType === 'letter' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500"
            )}
          >Betűk</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {gameState === 'lobby' && (
          <TorpedoLobby 
            onStartGame={handleStartGame} 
            onJoinMatch={handleJoinMatch} 
            onStartLocalGame={handleStartLocalGame}
          />
        )}

        {gameState === 'placement' && currentMatch && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="mb-4 md:mb-8 text-center max-w-2xl mx-auto">
               <h2 className="text-2xl md:text-3xl font-black mb-2 italic tracking-tighter">ELHELYEZÉSI FÁZIS</h2>
               <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                 Helyezd el a flottádat a 10×10-es koordináta-rendszerben! Ügyelj rá, hogy a hajók ne érintkezzenek egymással.
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

      {/* Footer Info – only on lobby, hidden on mobile */}
      {gameState === 'lobby' && (
        <div className="hidden md:flex max-w-7xl mx-auto mt-16 items-center justify-between gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
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
      )}
    </div>
  );
}
