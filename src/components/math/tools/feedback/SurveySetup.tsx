import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  FileText, 
  Users, 
  Send, 
  Check, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  School,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { subscribeTeacherClasses, TeacherClass } from '@/services/teacherClassService';
import { MATH_SURVEY_TEMPLATE } from '@/data/mathSurveyTemplate';

interface SurveySetupProps {
  onSurveyCreated?: (sessionData: any) => void;
  onSwitchToClasses?: () => void;
}

export function SurveySetup({ onSurveyCreated, onSwitchToClasses }: SurveySetupProps) {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [surveyTitle, setSurveyTitle] = useState('Visszajelző lap – Gondolatok a matematikaórákról');
  const [note, setNote] = useState('Félévi átfogó értékelés');
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);

  const template = MATH_SURVEY_TEMPLATE;

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeTeacherClasses(
      user.uid,
      (fetched) => {
        setClasses(fetched);
        setIsLoadingClasses(false);
        if (fetched.length > 0 && !selectedClassId) {
          setSelectedClassId(fetched[0].id);
        }
      },
      (err) => {
        console.error('Error fetching classes:', err);
        setIsLoadingClasses(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const selectedClass = classes.find(c => c.id === selectedClassId) || null;

  const handleStartSurvey = async () => {
    if (!selectedClassId) {
      return toast.error('Válassz ki egy osztályt a felmérés kiosztásához!');
    }
    if (!surveyTitle.trim()) {
      return toast.error('Kérlek add meg a felmérés címét!');
    }

    const students = selectedClass?.students || [];
    setIsSubmitting(true);

    try {
      const now = new Date().toISOString();
      const sessionData = {
        teacher_id: user!.uid,
        class_id: selectedClassId,
        class_name: selectedClass?.name || 'Osztály',
        tool_type: 'survey',
        template_id: template.id,
        title: surveyTitle.trim(),
        note: note.trim(),
        allow_anonymous: allowAnonymous,
        status: 'active',
        created_at: now,
        students: students.map(s => ({
          id: s.userId,
          name: s.name,
          userCode: s.userCode,
          avatar_id: s.avatarUrl || '🎒'
        }))
      };

      const docRef = await addDoc(collection(db, 'feedback_sessions'), sessionData);
      const createdSession = { id: docRef.id, ...sessionData };

      // Send notifications to all students in this class
      if (students.length > 0) {
        let sentCount = 0;
        for (const s of students) {
          if (s.userId) {
            await addDoc(collection(db, 'feedback_notifications'), {
              session_id: createdSession.id,
              student_id: s.userId,
              profile_id: s.userId,
              student_name: s.name,
              tool_type: 'survey',
              class_name: selectedClass?.name,
              lesson_info: surveyTitle.trim(),
              status: 'unread',
              created_at: now
            });
            sentCount++;
          }
        }
        toast.success(`Kérdőív sikeresen kiosztva ${sentCount} diáknak!`);
      } else {
        toast.success('Kérdőív létrehozva!');
      }

      if (onSurveyCreated) {
        onSurveyCreated(createdSession);
      }
    } catch (e) {
      console.error('Error creating survey session:', e);
      toast.error('Hiba történt a kérdőív létrehozásakor!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h2 className="text-base sm:text-lg font-black tracking-tight">
              Részletes Kérdőíves Visszajelzés Kiosztása
            </h2>
          </div>
          <p className="text-xs text-purple-100 max-w-xl">
            A diákok részletesen és őszintén elmondhatják a véleményüket a tanításról, a feladatokról, a DiákZónáról és arról, mi segítené a tanulásukat. Az eredményekből letölthető PDF riport készül!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white">
            16 Kérdés • 5 Témakör
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bal oszlop: Beállítások (7 oszlop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Osztály kiválasztása */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                1. Osztály Kiválasztása
              </Label>
              {onSwitchToClasses && (
                <button
                  type="button"
                  onClick={onSwitchToClasses}
                  className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  <span>Kezelés</span>
                </button>
              )}
            </div>

            {isLoadingClasses ? (
              <div className="py-4 text-center text-xs text-slate-400">Osztályok betöltése...</div>
            ) : classes.length === 0 ? (
              <div className="p-3 text-center bg-white rounded-xl border border-dashed border-slate-300">
                <School className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-700">Még nincsenek létrehozott osztályaid</p>
                <p className="text-[10px] text-slate-500 mb-2">Hozz létre egy osztályt a diákok fiókjaival a kiosztáshoz!</p>
                {onSwitchToClasses && (
                  <Button size="sm" onClick={onSwitchToClasses} className="h-7 text-xs font-bold rounded-lg bg-indigo-600">
                    Osztály létrehozása
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {classes.map((c) => {
                  const isSelected = selectedClassId === c.id;
                  const count = c.students?.length || 0;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClassId(c.id)}
                      className={cn(
                        "p-2.5 rounded-xl border text-left transition-all flex items-center justify-between",
                        isSelected
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20"
                          : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
                      )}
                    >
                      <div className="min-w-0 pr-1">
                        <p className="font-bold text-xs truncate">{c.name}</p>
                        <p className={cn("text-[10px] font-medium", isSelected ? "text-emerald-100" : "text-slate-400")}>
                          {count} diák
                        </p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Cím és megjegyzés */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              2. Felmérés Adatai
            </Label>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-600">Kérdőív megnevezése:</span>
              <Input
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Pl. Visszajelző lap – Gondolatok a matematikaórákról"
                className="h-9 text-xs sm:text-sm bg-white rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-600">Apropó / Alapértelmezett megjegyzés:</span>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Pl. Félévi visszajelzés, Témakör záró értékelés..."
                className="h-9 text-xs sm:text-sm bg-white rounded-xl border-slate-200"
              />
            </div>

            {/* Anonimitás kapcsoló */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Anonim kitöltés engedélyezése</p>
                  <p className="text-[10px] text-slate-500">A diákoknak nem kötelező megadni a nevüket az őszinte válaszokért.</p>
                </div>
              </div>
              <Switch
                checked={allowAnonymous}
                onCheckedChange={setAllowAnonymous}
              />
            </div>
          </div>
        </div>

        {/* Jobb oszlop: Sablon áttekintő & Kiosztás gomb (5 oszlop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                3. Kérdéssor Sablon
              </Label>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isPreviewOpen ? 'Elrejtés' : 'Előnézet'}</span>
                {isPreviewOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Sablon moduljainak összefoglaló listája */}
            <div className="space-y-1.5">
              {template.sections.map((sec) => (
                <div key={sec.id} className="p-2 bg-white rounded-xl border border-slate-200/80 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="text-base">{sec.icon}</span>
                    <span className="font-bold text-slate-800 truncate">{sec.number}. {sec.title}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                    {sec.questions.length} kérdés
                  </span>
                </div>
              ))}
            </div>

            {/* Részletes előnézet lenyíló */}
            {isPreviewOpen && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 max-h-56 overflow-y-auto text-xs">
                {template.sections.flatMap(s => s.questions).map(q => (
                  <div key={q.id} className="text-[11px] text-slate-600 flex items-start gap-1.5 pb-1 border-b border-slate-100 last:border-none">
                    <span className="font-bold text-indigo-600 shrink-0">{q.number}.</span>
                    <span className="leading-snug">{q.question}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nagy Kiosztás Gomb */}
          <Button
            type="button"
            disabled={isSubmitting || !selectedClassId}
            onClick={handleStartSurvey}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>{isSubmitting ? 'Kiosztás folyamatban...' : 'Kérdőív Kiosztása a Diákoknak'}</span>
          </Button>

          {selectedClass && (
            <p className="text-[11px] text-center text-slate-500">
              A kérdőív automatikusan megjelenik a(z) <span className="font-bold text-slate-700">{selectedClass.name}</span> ({selectedClass.students?.length || 0} diák) felületén.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
