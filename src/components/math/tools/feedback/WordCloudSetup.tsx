import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Cloud, Users, Sparkles, HelpCircle, Check, ShieldAlert, Shapes } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  subscribeTeacherClasses,
  TeacherClass
} from '@/services/teacherClassService';
import {
  WordCloudShape,
  WORD_CLOUD_SHAPES
} from './wordCloudUtils';

export interface WordCloudSetupProps {
  onStart: (sessionData: any) => void;
  onSwitchToClasses?: () => void;
}

const PRESET_LESSONS = [
  '📐 Pitagorasz-tétel',
  '➕ Egyenletek megoldása',
  '📊 Grafikonok & Statisztika',
  '🎯 Órai összefoglalás',
  '🧪 Csoportmunka'
];

const QUESTION_TEMPLATES = [
  {
    icon: '🌟',
    title: 'Mi volt a legjobb?',
    question: 'Szerinted mi volt a legjobb vagy legérdekesebb a mai órán?'
  },
  {
    icon: '💡',
    title: 'Új tudás',
    question: 'Milyen új fogalmat vagy ötletet tanultál ma meg?'
  },
  {
    icon: '⚡',
    title: 'Legnagyobb kihívás',
    question: 'Melyik feladat vagy gondolat volt számodra a legnehezebb?'
  },
  {
    icon: '😊',
    title: 'Egy szó az óráról',
    question: 'Egyetlen szóval: hogyan érezted magad ma a matematikaórán?'
  },
  {
    icon: '🧩',
    title: 'Kulcsfogalom',
    question: 'Írj egy kulcsszót, ami a mai óra legfontosabb tanulsága volt!'
  }
];

export function WordCloudSetup({ onStart, onSwitchToClasses }: WordCloudSetupProps) {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [question, setQuestion] = useState('Szerinted mi volt a legjobb vagy legérdekesebb a mai órán?');
  const [maxWordsPerStudent, setMaxWordsPerStudent] = useState<number>(1);
  const [selectedShape, setSelectedShape] = useState<WordCloudShape>('cloud');
  const [revealMode, setRevealMode] = useState<'closed_only' | 'realtime'>('closed_only');
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isStarting, setIsStarting] = useState(false);

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

  const handleStartSession = async () => {
    if (!user) return;
    if (!selectedClassId) {
      return toast.error('Válassz ki egy osztályt a listából!');
    }
    if (!lessonInfo.trim()) {
      return toast.error('Add meg a tanóra témáját!');
    }
    if (!question.trim()) {
      return toast.error('Kérlek adj meg egy kérdést a diákoknak!');
    }

    const students = selectedClass?.students || [];

    setIsStarting(true);
    try {
      const now = new Date().toISOString();
      const sessionData = {
        teacher_id: user.uid,
        class_id: selectedClassId,
        class_name: selectedClass?.name || 'Osztály',
        tool_type: 'word_cloud',
        lesson_info: lessonInfo.trim(),
        title: lessonInfo.trim(),
        question: question.trim(),
        max_words_per_student: maxWordsPerStudent,
        shape: selectedShape,
        reveal_mode: revealMode,
        is_closed: false,
        hidden_words: [],
        students: students.map(s => ({
          id: s.userId,
          name: s.name,
          userCode: s.userCode,
          avatar_id: s.avatarUrl || '🎒'
        })),
        created_at: now
      };

      // 1. Create feedback session doc
      const docRef = await addDoc(collection(db, 'feedback_sessions'), sessionData);
      const createdSession = { id: docRef.id, ...sessionData };

      // 2. Dispatch notifications to all enrolled students
      let sentCount = 0;
      for (const s of students) {
        if (s.userId) {
          await addDoc(collection(db, 'feedback_notifications'), {
            session_id: createdSession.id,
            tool_type: 'word_cloud',
            student_id: s.userId,
            profile_id: s.userId,
            student_name: s.name,
            student_avatar: s.avatarUrl || '🎒',
            status: 'unread',
            created_at: now
          });
          sentCount++;
        }
      }

      if (sentCount > 0) {
        toast.success(`Szófelhő szavazás elindítva! ${sentCount} diáknak küldtünk felkérést.`);
      } else {
        toast.info('Szófelhő elindítva projektoros kivetítéshez!');
      }

      onStart(createdSession);
    } catch (error) {
      console.error(error);
      toast.error('Hiba történt a szófelhő szavazás indításakor');
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Bal oszlop: Osztály, Téma és Kérdés (7 oszlop) */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* 1. Osztály kiválasztása */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                1. Osztály Kiválasztása
              </Label>
              {onSwitchToClasses && (
                <button
                  type="button"
                  onClick={onSwitchToClasses}
                  className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  <span>Kezelés</span>
                </button>
              )}
            </div>

            {isLoadingClasses ? (
              <p className="text-xs text-slate-400 py-2 text-center">Osztályok betöltése...</p>
            ) : classes.length === 0 ? (
              <div className="p-2.5 bg-amber-50/90 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center justify-between">
                <span>Még nincs létrehozott osztályod.</span>
                {onSwitchToClasses && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onSwitchToClasses}
                    className="h-6 text-[11px] px-2 bg-white text-amber-700 font-bold"
                  >
                    Létrehozás
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {classes.map(c => {
                  const isSelected = selectedClassId === c.id;
                  const count = c.students?.length || 0;

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClassId(c.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                        isSelected
                          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs scale-[1.02]"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                      )}
                    >
                      <span>🏫 {c.name}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-full font-semibold",
                        isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        {count} diák
                      </span>
                      {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Tanóra témája */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              2. Tanóra Témája
            </Label>
            <Input
              value={lessonInfo}
              onChange={(e) => setLessonInfo(e.target.value)}
              placeholder="pl. 7. osztály - Pitagorasz-tétel összefoglalása"
              className="bg-white text-xs h-9 rounded-xl border-slate-200 font-medium"
            />
            <div className="flex items-center gap-1 flex-wrap pt-0.5">
              <span className="text-[10px] text-slate-400 font-semibold mr-1">Gyors cím:</span>
              {PRESET_LESSONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setLessonInfo(preset)}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200/70 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Kérdés a diákoknak */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                3. Reflexiós Kérdés a diákoknak
              </Label>
              <span className="text-[10px] text-slate-400">Ezt látják a diákok a képernyőn</span>
            </div>

            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="pl. Szerinted mi volt a legjobb a mai órán?"
              className="bg-white text-xs h-9 rounded-xl border-slate-200 font-medium"
            />

            {/* Template options */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold block">Gyors kérdéssablonok:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {QUESTION_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.title}
                    type="button"
                    onClick={() => setQuestion(tmpl.question)}
                    className={cn(
                      "text-left p-2 rounded-xl border transition-all text-xs flex items-start gap-2",
                      question === tmpl.question
                        ? "bg-sky-50/90 border-sky-300 text-sky-900 font-bold"
                        : "bg-white hover:bg-slate-50 border-slate-200/70 text-slate-700"
                    )}
                  >
                    <span className="text-base shrink-0">{tmpl.icon}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-[11px] leading-tight truncate">{tmpl.title}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{tmpl.question}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Jobb oszlop: Szabályok & Beállítások & Indítás (5 oszlop) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 4. Szabályok: Hány szót küldhet be egy diák */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2.5">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              4. Beküldhető Válaszok Száma / Fő
            </Label>
            <p className="text-[11px] text-slate-500">
              Hány különálló szót vagy kifejezést küldhet be egyetlen diák a szavazás során?
            </p>

            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 5].map((count) => {
                const isSelected = maxWordsPerStudent === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setMaxWordsPerStudent(count)}
                    className={cn(
                      "py-2 px-1 rounded-xl text-center font-bold text-xs transition-all border",
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-xs scale-[1.02]"
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200/80"
                    )}
                  >
                    <div className="text-sm font-black">{count}×</div>
                    <div className="text-[10px] opacity-80">{count === 1 ? '1 szó' : `${count} szó`}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Megjelenítési Mód */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2.5">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
              5. Szófelhő Megjelenítése
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRevealMode('closed_only')}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all",
                  revealMode === 'closed_only'
                    ? "bg-purple-50/90 border-purple-400 text-purple-900 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs flex items-center gap-1">
                    <span>🔒 Csak lezárás után</span>
                  </span>
                  <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded bg-purple-100 text-purple-700">
                    Ajánlott
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  A szavak rejtve maradnak a szavazás végéig, így a diákok nem befolyásolják egymást.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRevealMode('realtime')}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all",
                  revealMode === 'realtime'
                    ? "bg-purple-50/90 border-purple-400 text-purple-900 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">⚡ Valós idejű élő</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  A szavak azonnal lebegnek a vetítőn, ahogy a diákok beküldik őket.
                </p>
              </button>
            </div>
          </div>

          {/* 6. Szófelhő Alakzata */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              6. Szófelhő Alakzata
            </Label>
            <p className="text-[11px] text-slate-500">
              Válaszd ki, milyen formába rendeződjenek a diákok szavai (később a vetítőn is átváltható):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5">
              {WORD_CLOUD_SHAPES.map((s) => {
                const isSelected = selectedShape === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedShape(s.id)}
                    className={cn(
                      "p-2 rounded-xl border text-left transition-all flex items-center gap-2",
                      isSelected
                        ? "bg-rose-50/90 border-rose-400 text-rose-900 shadow-xs font-bold ring-2 ring-rose-500/20 scale-[1.02]"
                        : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                    )}
                  >
                    <span className="text-xl shrink-0">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-xs leading-tight truncate">{s.name}</p>
                      <p className="text-[9px] text-slate-400 truncate mt-0.5">{s.description.split(',')[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indítás Gomb */}
          <div className="pt-2">
            <Button
              type="button"
              onClick={handleStartSession}
              disabled={isStarting}
              className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Cloud className="w-5 h-5 text-sky-200" />
              <span>{isStarting ? 'Indítás folyamatban...' : 'Szófelhő Szavazás Indítása'}</span>
              <Play className="w-4 h-4 fill-white ml-1" />
            </Button>

            <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" />
              <span>A diákok értesítést kapnak, te pedig élőben követheted a kivetítőn.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

