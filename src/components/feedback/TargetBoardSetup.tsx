import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where 
} from 'firebase/firestore';
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
  
  const [aspectCount, setAspectCount] = useState<2 | 3 | 4>(3);
  const [aspects, setAspects] = useState<string[]>(['Mennyire volt érthető az anyag?', 'Mennyire érezted jól magad?', 'Mennyire voltál aktív?']);

  useEffect(() => {
    if (user) fetchClasses();
  }, [user]);

  const fetchClasses = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'feedback_classes'), where('teacher_id', '==', user.uid));
      const snapshot = await getDocs(q);
      const list: ClassGroup[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, name: docSnap.data().name });
      });
      setClasses(list);
      if (list.length > 0) setSelectedClassId(list[0].id);
    } catch (e) {
      console.error('Error fetching classes:', e);
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
    if (!selectedClassId) return toast.error('Válassz egy osztályt!');
    if (!lessonInfo.trim()) return toast.error('Add meg a tanóra azonosítóját!');
    if (aspects.some(a => !a.trim())) return toast.error('Minden szempontot tölts ki!');

    const selectedClass = classes.find(c => c.id === selectedClassId);

    try {
      const now = new Date().toISOString();
      const sessionData = {
        teacher_id: user!.uid,
        class_id: selectedClassId,
        class_name: selectedClass?.name || '',
        tool_type: 'target_board',
        aspects: aspects,
        lesson_info: lessonInfo,
        feedback_mode: feedbackMode,
        created_at: now
      };

      const docRef = await addDoc(collection(db, 'feedback_sessions'), sessionData);
      const createdSession = { id: docRef.id, ...sessionData };

      if (feedbackMode === 'individual') {
        const q = query(collection(db, 'feedback_students'), where('class_id', '==', selectedClassId));
        const snapshot = await getDocs(q);
        const linkedStudents: any[] = [];

        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data.profile_id) {
            linkedStudents.push({ id: docSnap.id, profile_id: data.profile_id });
          }
        });

        if (linkedStudents.length > 0) {
          for (const s of linkedStudents) {
            await addDoc(collection(db, 'feedback_notifications'), {
              session_id: createdSession.id,
              student_id: s.id,
              profile_id: s.profile_id,
              status: 'unread',
              created_at: now
            });
          }
          toast.success(`${linkedStudents.length} diáknak küldtünk értesítést.`);
        } else {
          toast.warning('Ebben az osztályban nincs egyetlen fiókhoz kapcsolt diák sem, aki egyénileg tudna visszajelezni.');
        }
      }

      onStart(createdSession);
    } catch (error) {
      toast.error('Hiba a játék indításakor');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
        <Target className="w-8 h-8 text-indigo-600" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">Új Céltáblás Visszajelzés Beállítása</h2>
          <p className="text-sm text-slate-500">Állítsd be a szempontokat és indítsd el a visszajelzést az osztályodnak.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Osztály Kijelölése */}
        <div className="space-y-2">
          <Label className="font-bold">Osztály Kiválasztása</Label>
          {classes.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Még nincs létrehozott osztályod. Kérlek, először hozz létre egyet az Osztályok Kezelése fülön!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {classes.map(c => (
                <Button
                  key={c.id}
                  type="button"
                  variant={selectedClassId === c.id ? 'default' : 'outline'}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`rounded-xl font-bold ${selectedClassId === c.id ? 'bg-indigo-600 text-white' : ''}`}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Tanóra Infó */}
        <div className="space-y-2">
          <Label className="font-bold">Tanóra Azonosítója / Címe</Label>
          <Input
            placeholder="Pl. 7. osztály - Pithagorasz tétel tanóra"
            value={lessonInfo}
            onChange={(e) => setLessonInfo(e.target.value)}
            className="rounded-xl"
          />
        </div>

        {/* Visszajelzési Mód Kiválasztása */}
        <div className="space-y-2">
          <Label className="font-bold">Visszajelzési Mód</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setFeedbackMode('projected')}
              className={cn(
                "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3",
                feedbackMode === 'projected' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
              )}
            >
              <Monitor className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-800">Projektoros Mód</p>
                <p className="text-xs text-slate-500">Egy közös képernyőn a diákok egymás után dobják a nyilaikat.</p>
              </div>
            </div>

            <div
              onClick={() => setFeedbackMode('individual')}
              className={cn(
                "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3",
                feedbackMode === 'individual' ? "border-indigo-600 bg-indigo-50/50" : "border-slate-100 hover:border-slate-200"
              )}
            >
              <Smartphone className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-800">Egyéni Saját Eszköz Mód</p>
                <p className="text-xs text-slate-500">A diákok saját okostelefonjukról válaszolnak értesítés alapján.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Szempontok száma */}
        <div className="space-y-2">
          <Label className="font-bold">Szempontok Száma</Label>
          <div className="flex gap-3">
            {([2, 3, 4] as const).map(count => (
              <Button
                key={count}
                type="button"
                variant={aspectCount === count ? 'default' : 'outline'}
                onClick={() => handleAspectCountChange(count)}
                className={`rounded-xl font-bold flex-1 ${aspectCount === count ? 'bg-indigo-600 text-white' : ''}`}
              >
                {count} Szempont
              </Button>
            ))}
          </div>
        </div>

        {/* Szempontok Kitöltése */}
        <div className="space-y-3 pt-2">
          <Label className="font-bold">Szempontok Szövege</Label>
          {aspects.map((aspect, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <Input
                value={aspect}
                onChange={(e) => handleAspectChange(idx, e.target.value)}
                placeholder={`${idx + 1}. szempont megadása...`}
                className="rounded-xl flex-1"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={startSession}
          className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base mt-6 shadow-md"
        >
          <Play className="w-5 h-5 mr-2" /> Visszajelzés Indítása
        </Button>
      </div>
    </div>
  );
}
