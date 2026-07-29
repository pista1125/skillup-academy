import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Anchor, 
  Maximize2, 
  Minimize2
} from 'lucide-react';
import TorpedoLobby from "./torpedo/TorpedoLobby";
import TorpedoPlacement from "./torpedo/TorpedoPlacement";
import TorpedoCombat from "./torpedo/TorpedoCombat";
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
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
    const user = auth.currentUser;
    setUserId(user?.uid || null);
  }, []);

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
      const docSnap = await getDoc(doc(db, 'torpedo_matches', matchId));
      if (!docSnap.exists()) throw new Error('Match not found');
      
      const matchData = { id: docSnap.id, ...docSnap.data() } as TorpedoMatch;
      setCurrentMatch(matchData);
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
        console.error('Error in local bot placement', e);
      }
      return;
    }

    try {
      await TorpedoService.submitShips(currentMatch.id, ships);
      fetchMatchAndMove(currentMatch.id, 'combat');
      toast.success('Hajók elhelyezve! Várakozás ellenfélre...');
    } catch (e) {
      toast.error('Nem sikerült elmenteni a hajókat.');
    }
  };

  return (
    <div ref={containerRef} className={cn("min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col", isFullscreen && "p-4 overflow-y-auto")}>
      {/* Header Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {gameState !== 'lobby' ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGameState('lobby')}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Lobby
            </Button>
          ) : (
            onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Vissza
              </Button>
            )
          )}

          <div className="flex items-center gap-2">
            <Anchor className="w-6 h-6 text-indigo-400 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Koordináta Torpedó
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Axis Type Selector */}
          <div className="bg-slate-800 p-1 rounded-xl flex text-xs font-bold border border-slate-700">
            <button
              onClick={() => setAxisType('number')}
              className={cn("px-3 py-1.5 rounded-lg transition-all", axisType === 'number' ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white")}
            >
              (X, Y) Számok
            </button>
            <button
              onClick={() => setAxisType('letter')}
              className={cn("px-3 py-1.5 rounded-lg transition-all", axisType === 'letter' ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white")}
            >
              (A, 1) Betűk
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Game Screen Router */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        {gameState === 'lobby' && (
          <TorpedoLobby
            onStartGame={handleStartGame}
            onJoinMatch={handleJoinMatch}
            onStartLocalGame={handleStartLocalGame}
          />
        )}

        {gameState === 'placement' && currentMatch && userId && (
          <TorpedoPlacement
            axisType={axisType}
            onComplete={handlePlacementComplete}
            onBack={() => setGameState('lobby')}
          />
        )}

        {gameState === 'combat' && currentMatch && userId && (
          <TorpedoCombat
            match={currentMatch}
            userId={userId}
            onBack={() => setGameState('lobby')}
          />
        )}
      </div>
    </div>
  );
}
