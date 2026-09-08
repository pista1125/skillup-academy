import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Search, 
  Cpu, 
  Users, 
  Check, 
  ShieldCheck,
  Sword,
  PlayCircle,
  Copy,
  KeyRound,
  Sparkles,
  HelpCircle,
  Clock,
  RefreshCw,
  Crown,
  Trash2
} from 'lucide-react';
import { ChessService, ChessProfile, ChessMatch } from '@/lib/chess/ChessService';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChessLobbyProps {
  onStartGame: (
    mode: 'ai' | 'friend', 
    options: { 
      difficulty?: number; 
      opponentId?: string; 
      opponentName?: string; 
      matchId?: string; 
      isWhite?: boolean; 
    }
  ) => void;
}

export default function ChessLobby({ onStartGame }: ChessLobbyProps) {
  const { profile: authProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'friends' | 'ai'>('friends');
  const [difficulty, setDifficulty] = useState(3);
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  
  // 6-digit Code search states
  const [searchCode, setSearchCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundStudent, setFoundStudent] = useState<ChessProfile | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Data states
  const [friends, setFriends] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeMatches, setActiveMatches] = useState<ChessMatch[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Derive current user 6-digit code
  const myUserCode = authProfile?.user_code || (currentUser?.uid ? '100000' : '100000');
  const myDisplayName = authProfile?.full_name || currentUser?.displayName || 'Te';

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

  // Safe avatar renderer helper
  const renderAvatar = (avatarUrl?: string, name?: string) => {
    if (avatarUrl && (avatarUrl.startsWith('http') || avatarUrl.startsWith('data:'))) {
      return (
        <img 
          src={avatarUrl} 
          alt={name || 'Avatar'} 
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }
    if (avatarUrl && avatarUrl.length <= 4) {
      return <span className="select-none">{avatarUrl}</span>;
    }
    const initial = (name || 'D').trim().charAt(0).toUpperCase() || '♟';
    return <span className="select-none font-black text-indigo-600 dark:text-indigo-400">{initial}</span>;
  };

  // Search profile by 6-digit code
  const handleCodeSearch = async (codeToSearch?: string) => {
    const code = (codeToSearch ?? searchCode).replace(/\s+/g, '').trim();
    if (!code) return;

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setSearchError('A kódnak pontosan 6 számjegyből kell állnia (pl. 100120)!');
      return;
    }

    if (code === myUserCode) {
      setSearchError('Ez a saját diák kódod! Keress egy diáktársat a kódjával.');
      setFoundStudent(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setFoundStudent(null);

    try {
      const student = await ChessService.searchByCode(code);
      if (student) {
        if (student.id === currentUser?.uid) {
          setSearchError('Ez a saját fiókod!');
        } else {
          setFoundStudent(student);
        }
      } else {
        setSearchError(`Nem található diák ezzel a kóddal (${code}).`);
      }
    } catch (e: any) {
      setSearchError(e.message || 'Hiba a keresés során.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopyMyCode = () => {
    if (myUserCode) {
      navigator.clipboard.writeText(myUserCode);
      setCopiedCode(true);
      toast.success(`Saját kód kimásolva: ${myUserCode}`);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const sendFriendRequest = async (profileId: string) => {
    try {
      await ChessService.sendFriendRequest(profileId);
      toast.success('Barátkérés elküldve!');
      loadFriendsData();
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
      toast.error('Hiba történt a kérés elfogadásakor');
    }
  };

  const joinMatch = async (match: ChessMatch) => {
    if (match.status === 'waiting' && match.black_id === currentUser?.uid) {
      await ChessService.acceptMatch(match.id);
    }
    const isWhite = match.white_id === currentUser?.uid;
    const opponentName = isWhite ? match.black_profile?.full_name : match.white_profile?.full_name;
    onStartGame('friend', {
      matchId: match.id,
      isWhite,
      opponentName: opponentName || 'Diáktárs'
    });
  };

  const startNewMatch = async (targetUserId: string, targetName: string) => {
    try {
      const match = await ChessService.createMatch(targetUserId, true);
      toast.success(`Mérkőzés felajánlva: ${targetName}!`);
      onStartGame('friend', {
        matchId: match.id,
        isWhite: true,
        opponentName: targetName
      });
    } catch (e) {
      toast.error('Nem sikerült elindítani a mérkőzést.');
    }
  };

  const handleDeleteFriend = async (friendId: string, friendName: string) => {
    try {
      await ChessService.deleteFriend(friendId);
      toast.success(`${friendName} eltávolítva a barátok közül.`);
      setFriends(prev => prev.filter(f => f.id !== friendId));
    } catch (e) {
      toast.error('Hiba történt a barát törlése során.');
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      await ChessService.deleteMatch(matchId);
      toast.success('Mérkőzés törölve.');
      setActiveMatches(prev => prev.filter(m => m.id !== matchId));
    } catch (e) {
      toast.error('Hiba történt a mérkőzés törlése során.');
    }
  };

  // Helper to determine match turn
  const getMatchTurnInfo = (match: ChessMatch) => {
    const isWhiteUser = match.white_id === currentUser?.uid;
    const isWhiteTurn = !match.fen || match.fen.split(' ')[1] === 'w';

    if (match.status === 'finished') {
      if (match.winner_id === 'draw') {
        return {
          text: 'Döntetlen 🤝',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
          isMyTurn: false
        };
      }
      const didIWin = match.winner_id === currentUser?.uid;
      return {
        text: didIWin ? 'Győzelem! 🏆' : 'Vereség 🏁',
        badgeClass: didIWin 
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300'
          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300',
        isMyTurn: false
      };
    }

    if (match.status === 'waiting') {
      return {
        text: 'Várakozik',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
        isMyTurn: false
      };
    }

    if (match.draw_offered_by && match.draw_offered_by !== currentUser?.uid) {
      return {
        text: 'Döntetlen ajánlat! 🤝',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-400 dark:border-amber-600 animate-pulse font-bold',
        isMyTurn: true
      };
    }

    const isMyTurn = (isWhiteUser && isWhiteTurn) || (!isWhiteUser && !isWhiteTurn);
    if (isMyTurn) {
      return {
        text: 'Te lépsz!',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 animate-pulse',
        isMyTurn: true
      };
    }

    return {
      text: 'Ellenfél lép...',
      badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
      isMyTurn: false
    };
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Compact Top Control Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl p-3 md:p-4 text-white flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Compact Player Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/40 p-0.5 flex items-center justify-center text-xl shrink-0 overflow-hidden shadow-inner">
              {renderAvatar(authProfile?.avatar_url, myDisplayName)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight truncate max-w-[140px] md:max-w-[180px]">
                  {myDisplayName}
                </span>
                <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded-md border border-indigo-400/20">
                  Diák
                </span>
              </div>
              <p className="text-[11px] text-slate-300/70 hidden sm:block">
                Sakk Mester Aréna
              </p>
            </div>
          </div>

          {/* Mobile-only code pill */}
          <div className="flex md:hidden items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-xl border border-indigo-500/30">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-black text-amber-300 tracking-wider">
              {myUserCode.slice(0, 3)} {myUserCode.slice(3)}
            </span>
            <Button
              onClick={handleCopyMyCode}
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-lg text-white hover:bg-white/10"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Center: Mode Tabs */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-white/10 shadow-inner w-full md:w-auto">
          <button
            onClick={() => setActiveTab('friends')}
            className={cn(
              "flex-1 md:flex-none py-1.5 px-3.5 rounded-lg font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-200",
              activeTab === 'friends'
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            Többjátékos & Barátok
            {activeMatches.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-white/20 text-white font-bold">
                {activeMatches.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={cn(
              "flex-1 md:flex-none py-1.5 px-3.5 rounded-lg font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-200",
              activeTab === 'ai'
                ? "bg-amber-500 text-slate-950 font-black shadow-md"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Cpu className="w-3.5 h-3.5" />
            Stockfish AI
          </button>
        </div>

        {/* Right: Saját Diák Kód Box (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-indigo-500/30">
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300/90">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Kódod:</span>
          </div>
          <span className="text-sm font-mono font-black text-white tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-lg border border-indigo-500/40">
            {myUserCode.slice(0, 3)} {myUserCode.slice(3)}
          </span>
          <Button
            onClick={handleCopyMyCode}
            size="sm"
            className={cn(
              "rounded-lg font-bold h-7 px-2 text-xs transition-all shadow-sm",
              copiedCode 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            )}
            title="Kód másolása"
          >
            {copiedCode ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
            {copiedCode ? 'Másolva' : 'Másolás'}
          </Button>
        </div>
      </div>

      {/* TAB 1: FRIENDS & MULTIPLAYER (Zero unnecessary vertical whitespace!) */}
      {activeTab === 'friends' && (
        <div className="grid lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Code Finder, Found Card, Friends (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Diáktárs Keresése 6-Jegyű Kóddal */}
            <Card className="p-4 md:p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-800 dark:text-slate-100">
                    Keress Diáktársat 6-jegyű Kóddal
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  Add meg a 6 számjegyet!
                </span>
              </div>

              {/* OTP Code Input */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800 p-3">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={searchCode}
                    onChange={(val) => {
                      setSearchCode(val);
                      setSearchError(null);
                      if (val.length === 6) {
                        handleCodeSearch(val);
                      }
                    }}
                    disabled={isSearching}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={1} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={2} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={4} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                      <InputOTPSlot index={5} className="w-9 h-10 text-base font-black font-mono bg-white dark:bg-slate-900 shadow-sm" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                  <Button
                    onClick={() => handleCodeSearch()}
                    disabled={isSearching || searchCode.length !== 6}
                    className="flex-1 h-10 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95"
                  >
                    {isSearching ? (
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5 mr-1.5" />
                    )}
                    Keresés
                  </Button>
                  {searchCode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchCode('');
                        setFoundStudent(null);
                        setSearchError(null);
                      }}
                      className="h-10 px-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 text-xs"
                    >
                      Törlés
                    </Button>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {searchError && (
                <div className="mt-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                  <HelpCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Found Student Result Card */}
              {foundStudent && (
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 border-2 border-indigo-400/40 shadow-sm flex items-center justify-between gap-3 animate-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-lg shadow-sm shrink-0 overflow-hidden">
                      {renderAvatar(foundStudent.avatar_url, foundStudent.full_name)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm text-slate-900 dark:text-slate-100 truncate">
                          {foundStudent.full_name}
                        </span>
                        <Badge className="bg-indigo-600 text-white text-[9px] px-1 py-0 font-bold shrink-0">
                          #{foundStudent.user_code}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {foundStudent.username ? `@${foundStudent.username}` : 'Diáktárs'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => startNewMatch(foundStudent.id, foundStudent.full_name)}
                      className="h-8 px-3 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-sm transition-all active:scale-95"
                    >
                      <Sword className="w-3.5 h-3.5 mr-1" />
                      Kihívás!
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => sendFriendRequest(foundStudent.id)}
                      className="h-8 w-8 rounded-xl border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-950"
                      title="Jelölés barátnak"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* 2. Beérkező Barátkérések (Ha van) */}
            {requests.length > 0 && (
              <Card className="p-3.5 rounded-2xl border-2 border-amber-400/40 bg-amber-500/10 backdrop-blur-md shadow-sm">
                <h3 className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  Beérkező Barátkérések ({requests.length})
                </h3>
                <div className="space-y-2">
                  {requests.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate mr-2">
                        {r.profiles?.full_name}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => acceptRequest(r.id)} 
                        className="h-7 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px]"
                      >
                        <Check className="w-3 h-3 mr-1" /> Elfogadás
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* 3. Barátaid Listája */}
            <Card className="p-4 md:p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Barátaid ({friends.length})
                </h3>
                <span className="text-[11px] text-slate-400">
                  {friends.length > 0 ? 'Gyors kihívás indítása' : ''}
                </span>
              </div>

              {friends.length === 0 ? (
                <div className="text-center py-5 px-3 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/30">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Még nincsenek felvett barátaid.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Kérd el diáktársaid 6 jegyű kódját a fenti keresőhöz!
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                  {friends.map((f) => (
                    <div 
                      key={f.id} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/70 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                          {f.full_name?.charAt(0) || '👤'}
                        </div>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                          {f.full_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Button 
                          size="sm" 
                          onClick={() => startNewMatch(f.id, f.full_name)}
                          className="h-7 px-2 rounded-lg font-bold text-[11px] bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                        >
                          <Sword className="w-3 h-3 mr-1" />
                          Kihívás
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleDeleteFriend(f.id, f.full_name)}
                          className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
                          title="Barát törlése"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Active Matches & How-to-play Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Aktív Mérkőzéseid */}
            <Card className="p-4 md:p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Sword className="w-4 h-4 text-indigo-500" />
                  Aktív Mérkőzéseid ({activeMatches.length})
                </h3>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={loadMatchesData}
                  className="h-6 w-6 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Frissítés"
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>

              {activeMatches.length === 0 ? (
                <div className="text-center py-6 px-3 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/30">
                  <span className="text-2xl mb-1 block">⚔️</span>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nincs folyamatban lévő meccsed.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hívj ki egy barátot kóddal, vagy játssz a gép ellen!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {activeMatches.map((m) => {
                    const isWhite = m.white_id === currentUser?.uid;
                    const opp = isWhite ? m.black_profile : m.white_profile;
                    const oppName = opp?.full_name || 'Várakozás...';
                    const turnInfo = getMatchTurnInfo(m);

                    return (
                      <div 
                        key={m.id} 
                        className={cn(
                          "p-2.5 rounded-xl border transition-all shadow-sm flex items-center justify-between gap-2.5",
                          turnInfo.isMyTurn
                            ? "bg-emerald-500/5 border-emerald-300 dark:border-emerald-800"
                            : "bg-slate-50 dark:bg-slate-800/80 border-slate-100 dark:border-slate-700/70"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-base shrink-0">
                            {isWhite ? '♔' : '♚'}
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                              {oppName}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <span>{isWhite ? 'Világos' : 'Sötét'}</span>
                              <span>•</span>
                              <Badge className={cn("text-[9px] px-1 py-0 border", turnInfo.badgeClass)}>
                                {turnInfo.text}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button 
                            size="sm" 
                            onClick={() => joinMatch(m)}
                            className={cn(
                              "rounded-lg font-bold text-xs h-7 px-2.5 text-white",
                              turnInfo.isMyTurn
                                ? "bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            )}
                          >
                            {m.status === 'waiting' && m.black_id === currentUser?.uid ? 'Elfogadás' : 'Folytatás'}
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleDeleteMatch(m.id)}
                            className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
                            title="Mérkőzés törlése"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* 2. Útmutató kártya (Kompakt 3 lépéses) */}
            <Card className="p-3.5 rounded-2xl border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent backdrop-blur-md">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h4 className="font-black text-xs text-slate-800 dark:text-slate-200">
                  Hogyan működik a játék?
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs">
                  <div className="text-base mb-0.5">🔑</div>
                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">1. Kód csere</div>
                  <div className="text-[9px] text-slate-400">Másold ki a kódod</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs">
                  <div className="text-base mb-0.5">⚔️</div>
                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">2. Kihívás</div>
                  <div className="text-[9px] text-slate-400">Írd be a keresőbe</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs">
                  <div className="text-base mb-0.5">♟️</div>
                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">3. Sakk-matt!</div>
                  <div className="text-[9px] text-slate-400">Lépjetek élőben</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: AI STOCKFISH ARENA (Kompakt, azonnal látható) */}
      {activeTab === 'ai' && (
        <Card className="p-5 md:p-6 rounded-2xl border-2 border-amber-500/20 bg-gradient-to-b from-amber-500/5 via-slate-900/5 to-transparent backdrop-blur-md shadow-lg">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                <Cpu className="w-5 h-5 text-amber-500" />
                Válassz Nehézségi Szintet!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gyakorolj a Stockfish AI sakk motor ellen. Állítsd be a neked megfelelő szintet!
              </p>
            </div>

            {/* 5 Difficulty Level Cards */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { lvl: 1, label: 'Kezdő', elo: '600', emoji: '🌱' },
                { lvl: 2, label: 'Könnyű', elo: '1000', emoji: '🐣' },
                { lvl: 3, label: 'Közepes', elo: '1400', emoji: '🦊' },
                { lvl: 4, label: 'Haladó', elo: '1800', emoji: '🦁' },
                { lvl: 5, label: 'Mester', elo: '2200', emoji: '👑' },
              ].map(({ lvl, label, elo, emoji }) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={cn(
                    "flex flex-col items-center p-2.5 rounded-xl border-2 transition-all duration-150 text-center",
                    difficulty === lvl 
                      ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/30 scale-105" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <span className="text-2xl mb-1">{emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
                  <span className={cn("text-[9px] font-bold", difficulty === lvl ? "text-amber-100" : "text-amber-600 dark:text-amber-400")}>
                    {elo}
                  </span>
                </button>
              ))}
            </div>

            {/* Color selection & Start button row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 px-2 uppercase">
                  Szín:
                </span>
                <button
                  onClick={() => setPlayerColor('white')}
                  className={cn(
                    "px-3 py-1 rounded-lg font-black text-xs flex items-center gap-1 transition-all",
                    playerColor === 'white'
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <span>♔</span> Világos
                </button>
                <button
                  onClick={() => setPlayerColor('black')}
                  className={cn(
                    "px-3 py-1 rounded-lg font-black text-xs flex items-center gap-1 transition-all",
                    playerColor === 'black'
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <span>♚</span> Sötét
                </button>
              </div>

              <Button
                onClick={() => onStartGame('ai', { difficulty, isWhite: playerColor === 'white' })}
                className="w-full sm:w-auto flex-1 h-11 rounded-xl text-sm font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5"
              >
                <PlayCircle className="w-5 h-5" />
                Játék Indítása (Szint {difficulty})
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
