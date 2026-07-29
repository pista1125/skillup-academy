import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Target, Users, BarChart3, ChevronLeft } from 'lucide-react';
import ClassManager from './ClassManager';
import { TargetBoardSetup } from './TargetBoardSetup';
import { TargetBoardGame } from './TargetBoardGame';
import { FeedbackResults } from './FeedbackResults';
import { useAuth } from '@/contexts/AuthContext';

type ActiveTab = 'setup' | 'classes' | 'results' | 'notifications';
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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 mt-8">
        <Target className="w-16 h-16 text-indigo-200 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Diák Visszajelzés</h2>
        <p className="text-slate-600 mb-6 text-center max-w-md">
          A visszajelzések készítéséhez és mentéséhez be kell jelentkezned.
        </p>
      </div>
    );
  }

  const handleStartGame = (sessionData: any) => {
    setCurrentSession(sessionData);
    setAppState('playing');
  };

  const handleEndGame = () => {
    setCurrentSession(null);
    setAppState('hub');
    setActiveTab('results');
  };

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
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-slate-500 hover:text-slate-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Vissza
            </Button>
          )}
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Visszajelzés Hub</h1>
          <p className="text-slate-600">
            Kezeld az osztályokat, indíts új visszajelzést, vagy válaszolj a tanáraidnak.
          </p>
        </div>
      </div>

      {profile?.role === 'teacher' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => setActiveTab('classes')}
            className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'classes' 
                ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm' 
                : 'bg-white border-2 border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-8 h-8 text-indigo-500 mb-2" />
            <h3 className="font-bold text-slate-800">Osztályok Kezelése</h3>
            <p className="text-xs text-slate-500 text-center mt-1">Osztályok és diákok létrehozása</p>
          </div>

          <div 
            onClick={() => setActiveTab('setup')}
            className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'setup' 
                ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm' 
                : 'bg-white border-2 border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            <Target className="w-8 h-8 text-indigo-500 mb-2" />
            <h3 className="font-bold text-slate-800">Új Visszajelzés</h3>
            <p className="text-xs text-slate-500 text-center mt-1">Céltáblás visszajelzés indítása</p>
          </div>

          <div 
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'results' 
                ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm' 
                : 'bg-white border-2 border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-8 h-8 text-indigo-500 mb-2" />
            <h3 className="font-bold text-slate-800">Eredmények</h3>
            <p className="text-xs text-slate-500 text-center mt-1">Korábbi visszajelzések elemzése</p>
          </div>
        </div>
      )}

      {/* Notifications Banner for Students */}
      {notifications.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-8 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Visszajelzési felkérésed van!</h3>
          <p className="text-amber-100 text-sm mb-4">A tanárod új visszajelzést kér tőled.</p>
          <div className="flex flex-wrap gap-3">
            {notifications.map((n) => (
              <Button
                key={n.id}
                onClick={() => handleJoinSession(n)}
                className="bg-white text-orange-600 hover:bg-amber-50 font-bold rounded-xl"
              >
                Visszajelzés adása: {n.session?.title || 'Feladat'}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active Tab Content */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        {activeTab === 'classes' && <ClassManager />}
        {activeTab === 'setup' && <TargetBoardSetup onStartGame={handleStartGame} />}
        {activeTab === 'results' && <FeedbackResults />}
      </div>
    </div>
  );
}
