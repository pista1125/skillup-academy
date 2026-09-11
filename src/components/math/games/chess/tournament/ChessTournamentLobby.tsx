import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { 
  Trophy, 
  Users, 
  Crown, 
  Plus, 
  Play, 
  Copy, 
  Check, 
  Bot, 
  Trash2, 
  LogOut, 
  Sparkles, 
  Timer, 
  KeyRound, 
  ShieldCheck, 
  RefreshCw,
  HelpCircle,
  Clock
} from 'lucide-react';
import { 
  ChessTournament, 
  ChessTournamentService, 
  TournamentParticipant 
} from '@/lib/chess/ChessTournamentService';
import { TIME_PRESETS, formatTimeLimit } from '../ChessLobby';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChessTournamentLobbyProps {
  onTournamentStarted: (tournament: ChessTournament) => void;
}

export default function ChessTournamentLobby({
  onTournamentStarted
}: ChessTournamentLobbyProps) {
  const [currentTournament, setCurrentTournament] = useState<ChessTournament | null>(null);
  const [openTournaments, setOpenTournaments] = useState<ChessTournament[]>([]);
  const [myTournaments, setMyTournaments] = useState<ChessTournament[]>([]);
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');

  // Join by code states
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Create tournament states
  const [title, setTitle] = useState('');
  const [maxPlayers, setMaxPlayers] = useState<number>(8);
  const [timeLimit, setTimeLimit] = useState<number>(300);
  const [isCreating, setIsCreating] = useState(false);

  // General states
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoadingBots, setIsLoadingBots] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const currentUser = auth.currentUser;
  const isHost = currentTournament?.host_id === currentUser?.uid;

  // Load open tournaments and my tournaments list initially & periodically
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [open, my] = await Promise.all([
        ChessTournamentService.getOpenTournaments(),
        ChessTournamentService.getMyTournaments()
      ]);
      setOpenTournaments(open);
      setMyTournaments(my);
    } catch (e) {
      console.warn('Failed to load tournaments', e);
    }
  };

  const loadOpenTournaments = () => loadData();

  // Subscribe to real-time updates when inside a tournament room
  useEffect(() => {
    if (!currentTournament?.id) return;

    const sub = ChessTournamentService.subscribeToTournament(
      currentTournament.id, 
      (updated) => {
        setCurrentTournament(updated);
        // If tournament transitioned to in_progress or finished, trigger parent callback
        if (updated.status === 'in_progress' || updated.status === 'finished') {
          onTournamentStarted(updated);
        }
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [currentTournament?.id, onTournamentStarted]);

  // Handle joining with code
  const handleJoinByCode = async (codeToUse?: string) => {
    const code = (codeToUse ?? joinCode).replace(/\s+/g, '').trim();
    if (!code || code.length !== 6) {
      setJoinError('A bajnoksági kódnak 6 számjegyből kell állnia!');
      return;
    }

    setIsJoining(true);
    setJoinError(null);

    try {
      const joined = await ChessTournamentService.joinTournamentByCode(code);
      toast.success(`Sikeresen megnyitva: "${joined.title}"!`);
      if (joined.status === 'in_progress' || joined.status === 'finished') {
        onTournamentStarted(joined);
      } else {
        setCurrentTournament(joined);
      }
    } catch (e: any) {
      setJoinError(e.message || 'Nem sikerült csatlakozni a bajnoksághoz.');
      toast.error(e.message || 'Hiba a csatlakozás során');
    } finally {
      setIsJoining(false);
    }
  };

  // Handle creating a new tournament
  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Kérlek jelentkezz be a bajnokság indításához!');
      return;
    }

    setIsCreating(true);
    try {
      const tournamentTitle = title.trim() || 'Suli Sakk Bajnokság';
      const created = await ChessTournamentService.createTournament(
        tournamentTitle, 
        timeLimit, 
        maxPlayers
      );
      toast.success('Bajnokság sikeresen létrehozva! Oszd meg a kódot a többiekkel!');
      setCurrentTournament(created);
    } catch (e: any) {
      toast.error(e.message || 'Hiba a bajnokság létrehozásakor');
    } finally {
      setIsCreating(false);
    }
  };

  // Host: Add AI Bot
  const handleAddBot = async () => {
    if (!currentTournament) return;
    setIsLoadingBots(true);
    try {
      await ChessTournamentService.addBotParticipant(currentTournament.id);
      toast.success('Gép ellenfél hozzáadva a táblához!');
    } catch (e: any) {
      toast.error(e.message || 'Nem sikerült botot hozzáadni');
    } finally {
      setIsLoadingBots(false);
    }
  };

  // Host: Kick player
  const handleKickParticipant = async (participantId: string, participantName: string) => {
    if (!currentTournament) return;
    try {
      await ChessTournamentService.removeParticipant(currentTournament.id, participantId);
      toast.info(`${participantName} eltávolítva.`);
    } catch (e: any) {
      toast.error('Hiba az eltávolítás során');
    }
  };

  // Host: Start Tournament
  const handleStartTournament = async () => {
    if (!currentTournament) return;
    if (currentTournament.participants.length < 2) {
      toast.error('Legalább 2 játékos szükséges a bajnokság indításához!');
      return;
    }

    setIsStarting(true);
    try {
      await ChessTournamentService.startTournament(currentTournament.id);
      toast.success('🚀 A Bajnokság elindult! Sorsolás elkészült!');
    } catch (e: any) {
      toast.error(e.message || 'Hiba a bajnokság indításakor');
      setIsStarting(false);
    }
  };

  // Leave / Cancel Room
  const handleLeaveRoom = async () => {
    if (!currentTournament) return;
    if (isHost) {
      if (confirm('Biztosan bezárod ezt a bajnokságot?')) {
        await ChessTournamentService.cancelTournament(currentTournament.id);
        setCurrentTournament(null);
        loadOpenTournaments();
        toast.info('Bajnokság bezárva.');
      }
    } else {
      if (currentUser) {
        await ChessTournamentService.removeParticipant(currentTournament.id, currentUser.uid);
      }
      setCurrentTournament(null);
      loadOpenTournaments();
      toast.info('Kiléptél a váróteremből.');
    }
  };

  // Copy PIN Code
  const handleCopyCode = () => {
    if (!currentTournament?.code) return;
    navigator.clipboard.writeText(currentTournament.code);
    setCopiedCode(true);
    toast.success(`Bajnoksági kód kimásolva: ${currentTournament.code}`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Render participant avatar helper
  const renderAvatar = (p: TournamentParticipant) => {
    if (p.avatar_url && (p.avatar_url.startsWith('http') || p.avatar_url.startsWith('data:'))) {
      return (
        <img src={p.avatar_url} alt={p.name} className="w-full h-full object-cover rounded-xl" />
      );
    }
    if (p.avatar_url && p.avatar_url.length <= 4) {
      return <span>{p.avatar_url}</span>;
    }
    return <span>{p.name.charAt(0).toUpperCase()}</span>;
  };

  // --- VIEW 2: INSIDE TOURNAMENT WAITING ROOM ---
  if (currentTournament) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in zoom-in-95 duration-300">
        {/* Waiting Room Top Card */}
        <Card className="p-5 md:p-6 rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-lg">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">
                    {currentTournament.title}
                  </h2>
                  <Badge className="bg-emerald-500 text-white text-[10px] font-bold">
                    Váróterem
                  </Badge>
                </div>
                <p className="text-xs text-slate-300/80 mt-0.5 flex items-center gap-2 justify-center md:justify-start">
                  <span>Szervező: <strong>{currentTournament.host_name}</strong></span>
                  <span>•</span>
                  <span>Időkorlát: <strong>{formatTimeLimit(currentTournament.time_limit)}</strong></span>
                  <span>•</span>
                  <span>Tábla: <strong>{currentTournament.max_players} fős</strong></span>
                </p>
              </div>
            </div>

            {/* Big Code Pill */}
            <div className="flex items-center gap-2 bg-black/50 p-2 rounded-2xl border-2 border-amber-400/50 shadow-inner">
              <div className="px-3 text-center">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                  Bajnoksági Kód
                </span>
                <span className="text-2xl font-mono font-black text-white tracking-widest">
                  {currentTournament.code.slice(0, 3)} {currentTournament.code.slice(3)}
                </span>
              </div>
              <Button
                size="sm"
                onClick={handleCopyCode}
                className={cn(
                  "h-10 px-3 rounded-xl font-bold text-xs transition-all",
                  copiedCode ? "bg-emerald-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                )}
              >
                {copiedCode ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copiedCode ? 'Másolva' : 'Másolás'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Participants Grid & Action Panel */}
        <div className="grid lg:grid-cols-12 gap-5 items-start">
          {/* Left: Participants List (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            <Card className="p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">
                    Csatlakozott Résztvevők ({currentTournament.participants.length} / {currentTournament.max_players})
                  </h3>
                </div>

                {isHost && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddBot}
                    disabled={isLoadingBots || currentTournament.participants.length >= currentTournament.max_players}
                    className="h-8 px-3 rounded-xl border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                  >
                    {isLoadingBots ? (
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 mr-1.5" />
                    )}
                    + AI Bot Hozzáadása
                  </Button>
                )}
              </div>

              {/* Player Slots Grid */}
              <div className="grid sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {currentTournament.participants.map((p, idx) => {
                  const isMe = p.id === currentUser?.uid;

                  return (
                    <div
                      key={p.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border transition-all",
                        isMe
                          ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-100 dark:border-slate-700/70"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate mr-2">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold shrink-0 shadow-xs",
                          p.is_host 
                            ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700" 
                            : p.is_bot 
                              ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                              : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                        )}>
                          {renderAvatar(p)}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs text-slate-800 dark:text-slate-100 truncate">
                              {p.name} {isMe && '(Te)'}
                            </span>
                            {p.is_host && (
                              <Badge className="bg-amber-500 text-slate-950 text-[9px] px-1 py-0 font-bold">
                                Host 👑
                              </Badge>
                            )}
                            {p.is_bot && (
                              <Badge className="bg-purple-600 text-white text-[9px] px-1 py-0 font-bold">
                                BOT
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {p.user_code ? `#${p.user_code}` : `${idx + 1}. versenyző`}
                          </span>
                        </div>
                      </div>

                      {/* Kick button (only host can kick others) */}
                      {isHost && !p.is_host && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleKickParticipant(p.id, p.name)}
                          className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Eltávolítás"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  );
                })}

                {/* Empty placeholder slots */}
                {Array.from({ length: Math.max(0, currentTournament.max_players - currentTournament.participants.length) }).map((_, i) => (
                  <div
                    key={`empty_${i}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 text-slate-400"
                  >
                    <div className="w-9 h-9 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold">
                      {currentTournament.participants.length + i + 1}
                    </div>
                    <span className="text-xs font-semibold italic">
                      Szabad hely (Várakozás csatlakozásra...)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Host / Participant Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Vezérlőpult
              </h3>

              {isHost ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mint bajnokság vezető, te indíthatod el a versenyt, amint a diákok beléptek!
                  </p>

                  <Button
                    onClick={handleStartTournament}
                    disabled={isStarting || currentTournament.participants.length < 2}
                    className="w-full h-12 rounded-xl text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-102 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isStarting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Play className="w-5 h-5 fill-white" />
                    )}
                    Bajnokság Indítása ({currentTournament.participants.length} fővel)
                  </Button>

                  {currentTournament.participants.length < 2 && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold text-center">
                      ⚠️ Legalább 2 játékos szükséges az indításhoz! (Adj hozzá botot, ha egyedül vagy!)
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">
                    Várakozás a Szervezőre...
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Amint a szervező ({currentTournament.host_name}) elindítja a versenyt, azonnal elkészül a sorsolás és az ágrajz!
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  onClick={handleLeaveRoom}
                  className="w-full rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900/50"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  {isHost ? 'Bajnokság Bezárása' : 'Kilépés a Váróteremből'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 1: TOURNAMENT LOBBY SELECTION (JOIN / CREATE) ---
  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in zoom-in-95 duration-200">
      {/* Sub-Header Tabs */}
      <div className="flex bg-slate-200/80 dark:bg-slate-900 p-1 rounded-2xl border border-slate-300/60 dark:border-slate-800 shadow-inner max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('join')}
          className={cn(
            "flex-1 py-2 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-200",
            activeTab === 'join'
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <KeyRound className="w-4 h-4" />
          Csatlakozás Kóddal
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={cn(
            "flex-1 py-2 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-200",
            activeTab === 'create'
              ? "bg-amber-500 text-slate-950 font-black shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Plus className="w-4 h-4" />
          Új Bajnokság Indítása
        </button>
      </div>

      {/* TAB A: JOIN TOURNAMENT WITH 6-DIGIT CODE */}
      {activeTab === 'join' && (
        <div className="grid lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-4">
            {/* My Ongoing Tournaments Section (if any) */}
            {myTournaments.length > 0 && (
              <Card className="p-4 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      Folyamatban lévő Bajnokságaid ({myTournaments.length})
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Kattints a visszatéréshez!</span>
                </div>

                <div className="space-y-2">
                  {myTournaments.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300/60 dark:border-amber-700/60 flex items-center justify-between gap-3 shadow-xs hover:border-amber-500 transition-all"
                    >
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-xs text-slate-900 dark:text-white truncate">
                            {t.title}
                          </span>
                          <Badge className={cn(
                            "text-[9px] px-1 py-0 font-black",
                            t.status === 'finished' ? "bg-amber-500 text-slate-950" : t.status === 'in_progress' ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white"
                          )}>
                            {t.status === 'finished' ? '🏆 Befejezve' : t.status === 'in_progress' ? '⚡ Folyamatban' : '⏳ Váróterem'}
                          </Badge>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Kód: <strong>{t.code}</strong> • {t.participants?.length || 0} résztvevő
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => {
                          if (t.status === 'in_progress' || t.status === 'finished') {
                            onTournamentStarted(t);
                          } else {
                            setCurrentTournament(t);
                          }
                        }}
                        className="h-8 px-3 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs shrink-0"
                      >
                        {t.status === 'in_progress' ? 'Vissza az Ágrajzhoz ➔' : t.status === 'finished' ? 'Eredmények 🏆' : 'Belépés ➔'}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-5 md:p-6 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg space-y-4">
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Add meg a 6-jegyű Bajnoksági Kódot!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kérd el a versenyvezetőtől vagy diáktársadtól a PIN kódot a belépéshez vagy visszatéréshez!
                </p>
              </div>

              {/* 6-Digit OTP Box */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={joinCode}
                    onChange={(val) => {
                      setJoinCode(val);
                      setJoinError(null);
                      if (val.length === 6) {
                        handleJoinByCode(val);
                      }
                    }}
                    disabled={isJoining}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={1} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={2} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={4} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={5} className="w-10 h-11 text-lg font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={() => handleJoinByCode()}
                  disabled={isJoining || joinCode.length !== 6}
                  className="w-full sm:w-auto flex-1 h-11 rounded-xl font-black text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                >
                  {isJoining ? (
                    <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <KeyRound className="w-4 h-4 mr-1.5" />
                  )}
                  Belépés a Versenybe
                </Button>
              </div>

              {joinError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <HelpCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{joinError}</span>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Nyitott Bajnokságok az iskolában (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <Card className="p-5 rounded-3xl border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Bajnokságok ({openTournaments.length})
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={loadOpenTournaments}
                  className="h-6 w-6 rounded-lg text-slate-400"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>

              {openTournaments.length === 0 ? (
                <div className="text-center py-6 px-3 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Jelenleg nincs nyitott bajnokság.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hozz létre egyet a fenti "Új Bajnokság" fülön!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {openTournaments.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/70 hover:border-indigo-400 flex items-center justify-between gap-2.5 transition-all"
                    >
                      <div className="truncate">
                        <div className="font-black text-xs text-slate-900 dark:text-white truncate">
                          {t.title}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>Szervező: {t.host_name}</span>
                          <span>•</span>
                          <span>{t.participants.length}/{t.max_players} fő</span>
                          <span>•</span>
                          <span>{formatTimeLimit(t.time_limit)}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => {
                          if (t.status === 'in_progress' || t.status === 'finished') {
                            onTournamentStarted(t);
                          } else {
                            handleJoinByCode(t.code);
                          }
                        }}
                        className="h-7 px-3 rounded-lg font-bold text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
                      >
                        {t.status === 'in_progress' ? 'Megtekintés' : 'Csatlakozás'}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* TAB B: CREATE NEW TOURNAMENT (HOST VIEW) */}
      {activeTab === 'create' && (
        <Card className="p-6 md:p-8 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-white dark:via-slate-900 to-transparent backdrop-blur-md shadow-xl max-w-2xl mx-auto">
          <form onSubmit={handleCreateTournament} className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Crown className="w-6 h-6 text-amber-500 fill-amber-400" />
                Hozz létre Sakk Bajnokságot!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be a bajnokság nevét, a tábla méretét és a gondolkodási időt!
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Bajnokság Neve:
              </label>
              <Input
                type="text"
                placeholder="Pl. 7.B Nagy Sakk Bajnokság 🏆"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 rounded-xl font-bold text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>

            {/* Bracket Size Selection (4, 8, 16 Players) */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                Résztvevők száma (Ágrajz mérete):
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { count: 4, label: '4 Játékos', sub: 'Elődöntő + Döntő (2 kör)' },
                  { count: 8, label: '8 Játékos', sub: 'Negyeddöntőtől (3 kör)' },
                  { count: 16, label: '16 Játékos', sub: 'Nyolcaddöntőtől (4 kör)' },
                ].map(({ count, label, sub }) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setMaxPlayers(count)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all text-center",
                      maxPlayers === count
                        ? "bg-amber-500 border-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-[1.02]"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300 font-bold"
                    )}
                  >
                    <span className="text-sm">{label}</span>
                    <span className={cn("text-[9px]", maxPlayers === count ? "text-amber-950 opacity-80" : "text-slate-400")}>
                      {sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Control */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-indigo-500" />
                Gondolkodási idő játékosonként:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {TIME_PRESETS.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTimeLimit(t.value)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all text-center",
                      timeLimit === t.value
                        ? "bg-indigo-600 border-indigo-600 text-white font-black shadow-md shadow-indigo-500/20 scale-[1.02]"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300 font-bold"
                    )}
                  >
                    <span className="text-xs">{t.label}</span>
                    <span className={cn("text-[9px]", timeLimit === t.value ? "text-indigo-200" : "text-slate-400")}>
                      {t.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full h-12 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 transition-all hover:scale-101 active:scale-95 flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Crown className="w-5 h-5" />
              )}
              Bajnokság Létrehozása & Váróterem Nyitása
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
