import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Play, Monitor, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ClassGroup {
  id: string;
  name: string;
}

interface TargetBoardSetupProps {
  onStart: (sessionData: any) => void;
}

export function TargetBoardSetup({ onStart }: TargetBoardSetupProps) {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [feedbackMode, setFeedbackMode] = useState<'projected' | 'individual'>('projected');
  
  // Szempontok (2-4 között lehet)
  const [aspectCount, setAspectCount] = useState<2 | 3 | 4>(3);
  const [aspects, setAspects] = useState<string[]>(['Mennyire volt érthető az anyag?', 'Mennyire érezted jól magad?', 'Mennyire voltál aktív?']);

  useEffect(() => {
    if (user) fetchClasses();
  }, [user]);

  const fetchClasses = async () => {
    const { data } = await supabase
      .from('feedback_classes')
      .select('id, name')
      .order('created_at', { ascending: false });
    
    if (data) {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    }
  };

  const handleAspectCountChange = (count: 2 | 3 | 4) => {
    setAspectCount(count);
    const newAspects = [...aspects];
    if (count > aspects.length) {
      while (newAspects.length < count) newAspects.push('Új szempont...');
    } else if (count < aspects.length) {
      newAspects.length = count;
    }
    setAspects(newAspects);
  };

  const handleAspectChange = (index: number, value: string) => {
    const newAspects = [...aspects];
    newAspects[index] = value;
    setAspects(newAspects);
  };

  const startSession = async () => {
    // Validációk
    if (!selectedClassId) return toast.error('Válassz egy osztályt!');
    if (!lessonInfo.trim()) return toast.error('Add meg a tanóra azonosítóját!');
    if (aspects.some(a => !a.trim())) return toast.error('Minden szempontot tölts ki!');

    const selectedClass = classes.find(c => c.id === selectedClassId);

    // Adatbázisba felvétel - egy új session létrehozása
    const { data: session, error } = await supabase
      .from('feedback_sessions')
      .insert({
        teacher_id: user!.id,
        class_id: selectedClassId,
        tool_type: 'target_board',
        aspects: aspects,
        lesson_info: lessonInfo,
        feedback_mode: feedbackMode
      })
      .select()
      .single();

    if (error) {
      toast.error('Hiba a játék indításakor');
      return;
    }

    // Ha egyéni mód, értesítések kiküldése a bekötött diákoknak
    if (feedbackMode === 'individual') {
      const { data: students } = await supabase
        .from('feedback_students')
        .select('id, profile_id')
        .eq('class_id', selectedClassId)
        .not('profile_id', 'is', null);

      if (students && students.length > 0) {
        const notifications = students.map(s => ({
          session_id: session.id,
          student_id: s.id,
          profile_id: s.profile_id,
          status: 'unread'
        }));

        const { error: notifyError } = await supabase
          .from('feedback_notifications')
          .insert(notifications);

        if (notifyError) {
          console.error('Hiba az értesítések küldésekor:', notifyError);
        } else {
          toast.success(`${students.length} diáknak küldtünk értesítést.`);
        }
      } else {
        toast.warning('Ebben az osztályban nincs egyetlen fiókhoz kapcsolt diák sem, aki egyénileg tudna visszajelezni.');
      }
    }

    // Átadjuk a fő komponensnek a létrehozott sessiont
    onStart({
      ...session,
      className: selectedClass?.name
    });
  };

  if (classes.length === 0) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700 mb-2">Még nincsenek osztályaid</h3>
        <p className="text-slate-500 mb-6">Először hozz létre egy osztályt az "Osztályok Kezelése" menüpontban!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold text-slate-800">1. Válaszd ki az osztályt</Label>
          <p className="text-sm text-slate-500 mb-3">Melyik osztálytól kérsz most visszajelzést?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {classes.map(cls => (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`p-3 rounded-xl border-2 text-left font-medium transition-all ${
                  selectedClassId === cls.id 
                    ? 'border-rose-500 bg-rose-50 text-rose-700' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-slate-50'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-lg font-semibold text-slate-800">2. Tanóra azonosítója (pl. dátum vagy téma)</Label>
          <p className="text-sm text-slate-500 mb-2">Ez segít később a visszakeresésben.</p>
          <Input 
            placeholder="Pl. Matek 5. óra, vagy Törtek gyakorlása..." 
            value={lessonInfo}
            onChange={(e) => setLessonInfo(e.target.value)}
            className="text-lg py-6"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Label className="text-lg font-semibold text-slate-800">3. Visszajelzési szempontok</Label>
              <p className="text-sm text-slate-500">A céltábla eszerint lesz felosztva (2-4 részre).</p>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAspectCountChange(num as 2|3|4)}
                  className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                    aspectCount === num ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {num} szempont
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            {aspects.map((aspect, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                  ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'][idx]
                }`}>
                  {idx + 1}
                </div>
                <Input 
                  value={aspect}
                  onChange={(e) => handleAspectChange(idx, e.target.value)}
                  placeholder={`${idx + 1}. kérdés vagy szempont...`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-lg font-semibold text-slate-800">4. Visszajelzés módja</Label>
          <p className="text-sm text-slate-500 mb-4">Hogyan szeretnéd összegyűjteni a válaszokat?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setFeedbackMode('projected')}
              className={cn(
                "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                feedbackMode === 'projected'
                  ? "border-indigo-500 bg-indigo-50 shadow-sm"
                  : "border-slate-100 bg-white hover:border-slate-200"
              )}
            >
              <div className={cn("p-2 rounded-xl", feedbackMode === 'projected' ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-400")}>
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <div className={cn("font-bold text-sm", feedbackMode === 'projected' ? "text-indigo-900" : "text-slate-700")}>
                  Közös gép (Kivetítve)
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                  A diákok kijönnek a tanári géphez és egyesével adják le a voksukat.
                </div>
              </div>
            </button>

            <button
              onClick={() => setFeedbackMode('individual')}
              className={cn(
                "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                feedbackMode === 'individual'
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-slate-100 bg-white hover:border-slate-200"
              )}
            >
              <div className={cn("p-2 rounded-xl", feedbackMode === 'individual' ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400")}>
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className={cn("font-bold text-sm", feedbackMode === 'individual' ? "text-emerald-900" : "text-slate-700")}>
                  Saját eszköz (Direct)
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                  Minden gyerek a saját telefonján/gépén kap értesítést és ott jelez vissza.
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end">
        <Button 
          onClick={startSession} 
          size="lg" 
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-sm group"
        >
           <span>Visszajelzés Indítása</span>
           <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
