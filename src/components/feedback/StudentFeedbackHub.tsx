import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Target, Users, BarChart3, ChevronLeft } from 'lucide-react';
import { ClassManager } from './ClassManager';
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      fetchNotifications();
      const channel = supabase
        .channel('new_feedback_notifications')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'feedback_notifications', filter: `profile_id=eq.${user.id}` },
          () => fetchNotifications()
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  useEffect(() => {
    if (profile?.role === 'student' && activeTab === 'setup') {
      setActiveTab('results'); // Default to results or something else for students if no notifications
    }
  }, [profile, activeTab]);

  const fetchNotifications = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('feedback_notifications')
      .select(`
        *,
        session:feedback_sessions(*)
      `)
      .eq('profile_id', user?.id)
      .eq('status', 'unread')
      .order('created_at', { ascending: false });
    
    if (data) {
      setNotifications(data);
    }
    setLoading(false);
  };

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
          fetchNotifications();
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
            <div className={`p-4 rounded-full mb-4 ${activeTab === 'classes' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Osztályok Kezelése</h3>
            <p className="text-sm text-center text-slate-500 mt-2">
              Hozd létre az osztályokat és válaszd ki a diákok avatárjait
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('setup')}
            className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'setup' 
                ? 'bg-rose-50 border-2 border-rose-500 shadow-sm' 
                : 'bg-white border-2 border-slate-100 hover:border-rose-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-4 rounded-full mb-4 ${activeTab === 'setup' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
              <Target className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Új Visszajelzés</h3>
            <p className="text-sm text-center text-slate-500 mt-2">
              Indítsd el a céltáblás értékelést 2-4 szempont alapján
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'results' 
                ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm' 
                : 'bg-white border-2 border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-4 rounded-full mb-4 ${activeTab === 'results' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Eredmények</h3>
            <p className="text-sm text-center text-slate-500 mt-2">
              Nézd meg a korábbi órák értékeléseinek statisztikáit
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        {notifications.length > 0 && appState === 'hub' && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              Aktív felkérések
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notifications.map(n => (
                <div key={n.id} className="bg-indigo-50 border-2 border-indigo-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h4 className="font-black text-indigo-900">{n.session?.lesson_info || 'Visszajelzés'}</h4>
                    <p className="text-xs text-indigo-600 font-bold mt-1 uppercase tracking-tight">Céltáblás értékelés</p>
                  </div>
                  <Button 
                    onClick={() => handleJoinSession(n)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 font-bold"
                  >
                    Csatlakozás
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'classes' && <ClassManager />}
        {activeTab === 'setup' && <TargetBoardSetup onStart={handleStartGame} />}
        {activeTab === 'results' && <FeedbackResults />}
      </div>
    </div>
  );
}
