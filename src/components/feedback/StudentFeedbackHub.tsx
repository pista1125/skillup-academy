import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, query, where, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Target, Users, BarChart3, ChevronLeft, Bell, Sparkles } from 'lucide-react';
import ClassManager from './ClassManager';
import { TargetBoardSetup } from './TargetBoardSetup';
import { TargetBoardGame } from './TargetBoardGame';
import { FeedbackResults } from './FeedbackResults';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

type ActiveTab = 'setup' | 'classes' | 'results';
type AppState = 'hub' | 'playing' | 'viewing_results_detail' | 'student_playing';

interface StudentFeedbackHubProps {
  onBack?: () => void;
}

export function StudentFeedbackHub({ onBack }: StudentFeedbackHubProps) {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('setup');
  const [appState, setAppState] = useState<AppState>('hub');
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeNotification, setActiveNotification] = useState<any>(null);

  const isTeacher = profile?.role !== 'student';

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'feedback_notifications'),
        where('profile_id', '==', user.uid),
        where('status', '==', 'unread')
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const list: any[] = [];
        for (const docSnap of snapshot.docs) {
          const nData = docSnap.data();
          let sessionData = null;
          if (nData.session_id) {
            const sSnap = await getDoc(doc(db, 'feedback_sessions', nData.session_id));
            if (sSnap.exists()) {
              sessionData = { id: sSnap.id, ...sSnap.data() };
            }
          }
          list.push({
            id: docSnap.id,
            ...nData,
            session: sessionData
          });
        }
        setNotifications(list);
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (profile?.role === 'student' && activeTab === 'setup') {
      setActiveTab('results');
    }
  }, [profile, activeTab]);

  const handleJoinSession = (notification: any) => {
    setActiveNotification(notification);
    setCurrentSession(notification.session);
    setAppState('student_playing');
  };

  const handleStartGame = (sessionData: any) => {
    setCurrentSession(sessionData);
    setAppState('playing');
  };

  const handleEndGame = () => {
    setCurrentSession(null);
    setAppState('hub');
    setActiveTab('results');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 mt-4 max-w-lg mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
          <Target className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Visszajelző Lobbi</h2>
        <p className="text-slate-600 text-xs sm:text-sm mb-4">
          A visszajelzések indításához és mentéséhez kérlek jelentkezz be.
        </p>
      </div>
    );
  }

  if (appState === 'playing') {
    return (
      <TargetBoardGame 
        session={currentSession} 
        onComplete={handleEndGame} 
      />
    );
  }

  if (appState === 'student_playing' && activeNotification) {
    return (
      <TargetBoardGame 
        session={currentSession} 
        isStudentView={true}
        studentId={activeNotification.student_id}
        onComplete={() => {
          setAppState('hub');
          setActiveNotification(null);
          setCurrentSession(null);
        }} 
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 space-y-2.5">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="h-8 px-2.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 bg-white hover:bg-slate-100 shadow-2xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Vissza</span>
            </Button>
          )}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none">
                  Visszajelző Lobbi
                </h1>
                <span className="hidden xs:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200/80">
                  {isTeacher ? 'Tanári Központ' : 'Diák Felület'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                Céltáblás tanári visszajelzések, osztályok és eredmények kezelése
              </p>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-xs animate-bounce">
              <Bell className="w-3.5 h-3.5" />
              <span>{notifications.length} új felkérés</span>
            </div>
          )}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-xl border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aktív céltábla rendszer</span>
          </div>
        </div>
      </div>

      {/* Notifications Banner for Students */}
      {notifications.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-3 text-white shadow-md flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold leading-tight">Új visszajelzési felkérésed érkezett!</h3>
              <p className="text-[11px] text-amber-100">A tanárod várja a céltáblás értékelésedet.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {notifications.map((n) => (
              <Button
                key={n.id}
                size="sm"
                onClick={() => handleJoinSession(n)}
                className="bg-white text-orange-600 hover:bg-amber-50 font-bold rounded-xl h-7 text-xs shadow-xs"
              >
                Visszajelzés megnyitása: {n.session?.lesson_info || n.session?.class_name || 'Feladat'}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 3 Mode Tabs (Teacher / Educator) */}
      {isTeacher && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Tab 1: Osztályok Kezelése */}
          <div 
            onClick={() => setActiveTab('classes')}
            className={cn(
              "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl cursor-pointer transition-all border",
              activeTab === 'classes' 
                ? "bg-gradient-to-r from-emerald-50/90 to-teal-50/50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs" 
                : "bg-white/90 hover:bg-emerald-50/20 border-slate-200/80 hover:border-emerald-200"
            )}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 truncate">Osztályok Kezelése</h3>
              <p className="text-[10px] text-slate-500 truncate">Csoportok & diák fiókok</p>
            </div>
            {activeTab === 'classes' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mr-1" />
            )}
          </div>

          {/* Tab 2: Új Visszajelzés (Fő fül) */}
          <div 
            onClick={() => setActiveTab('setup')}
            className={cn(
              "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl cursor-pointer transition-all border",
              activeTab === 'setup' 
                ? "bg-gradient-to-r from-indigo-50/90 to-purple-50/50 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs" 
                : "bg-white/90 hover:bg-indigo-50/20 border-slate-200/80 hover:border-indigo-200"
            )}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 truncate">Új Visszajelzés</h3>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  Céltábla
                </span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">Élő órai értékelés indítása</p>
            </div>
            {activeTab === 'setup' && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mr-1" />
            )}
          </div>

          {/* Tab 3: Eredmények */}
          <div 
            onClick={() => setActiveTab('results')}
            className={cn(
              "flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl cursor-pointer transition-all border",
              activeTab === 'results' 
                ? "bg-gradient-to-r from-amber-50/90 to-orange-50/50 border-amber-400 ring-2 ring-amber-500/20 shadow-xs" 
                : "bg-white/90 hover:bg-amber-50/20 border-slate-200/80 hover:border-amber-200"
            )}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 truncate">Eredmények</h3>
              <p className="text-[10px] text-slate-500 truncate">Korábbi céltáblák áttekintése</p>
            </div>
            {activeTab === 'results' && (
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mr-1" />
            )}
          </div>
        </div>
      )}

      {/* Active Tab Content Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/90 shadow-sm">
        {activeTab === 'classes' && <ClassManager />}
        {activeTab === 'setup' && (
          <TargetBoardSetup 
            onStart={handleStartGame} 
            onStartGame={handleStartGame} 
            onSwitchToClasses={() => setActiveTab('classes')}
          />
        )}
        {activeTab === 'results' && <FeedbackResults />}
      </div>
    </div>
  );
}
