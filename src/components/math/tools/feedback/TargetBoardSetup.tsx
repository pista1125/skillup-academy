import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc 
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Monitor, Smartphone, Check, Users, School } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  subscribeTeacherClasses,
  TeacherClass
} from '@/services/teacherClassService';

export interface TargetBoardSetupProps {
  onStart?: (sessionData: any) => void;
  onStartGame?: (sessionData: any) => void;
  onSwitchToClasses?: () => void;
}

const PRESET_LESSONS = [
  '📐 Pitagorasz-tétel',
  '➕ Egyenletek megoldása',
  '📊 Grafikonok & Statisztika',
  '🎯 Órai összefoglalás',
  '🧪 Csoportmunka'
];

const ASPECT_TEMPLATES: Record<string, { name: string; icon: string; count: 2 | 3 | 4; aspects: string[] }> = {
  standard: {
    name: 'Megértés & Kedv',
    icon: '💡',
    count: 3,
    aspects: [
      'Mennyire volt érthető a mai tananyag?',
      'Mennyire érezted jól magad az órán?',
      'Mennyire voltál aktív a feladatoknál?'
    ]
  },
  pace: {
    name: 'Tempó & Nehézség',
    icon: '⚡',
    count: 3,
    aspects: [
      'Megfelelő volt az óra haladási tempója?',
      'Megbirkóztál a feladatok nehézségével?',
      'Kaptál elég segítséget az elakadásoknál?'
    ]
  },
  detailed: {
    name: 'Részletes',
    icon: '🎯',
    count: 4,
    aspects: [
      'Mennyire volt érthető a magyarázat?',
      'Mennyire volt érdekes a tananyag?',
      'Mennyire volt megfelelő a haladási tempó?',
      'Mennyire érzed magad magabiztosnak a témában?'
    ]
  },
  quick: {
    name: 'Gyors',
    icon: '🚀',
    count: 2,
    aspects: [
      'Mennyire volt érthető az óra?',
      'Hogy érezted magad ma az órán?'
    ]
  }
};

const ASPECT_THEMES = [
  {
    badge: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/20',
    border: 'focus-visible:ring-cyan-500 border-cyan-200',
    tag: 'text-cyan-700 bg-cyan-50'
  },
  {
    badge: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20',
    border: 'focus-visible:ring-emerald-500 border-emerald-200',
    tag: 'text-emerald-700 bg-emerald-50'
  },
  {
    badge: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20',
    border: 'focus-visible:ring-amber-500 border-amber-200',
    tag: 'text-amber-700 bg-amber-50'
  },
  {
    badge: 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-purple-500/20',
    border: 'focus-visible:ring-purple-500 border-purple-200',
    tag: 'text-purple-700 bg-purple-50'
  }
];

export function TargetBoardSetup({ onStart, onStartGame, onSwitchToClasses }: TargetBoardSetupProps) {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [feedbackMode, setFeedbackMode] = useState<'projected' | 'individual'>('projected');
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  
  const [aspectCount, setAspectCount] = useState<2 | 3 | 4>(3);
  const [aspects, setAspects] = useState<string[]>([
    'Mennyire volt érthető a mai tananyag?',
    'Mennyire érezted jól magad az órán?',
    'Mennyire voltál aktív a feladatoknál?'
  ]);

  useEffect(() => {
    if (!user) return;
    setIsLoadingClasses(true);

    const unsubscribe = subscribeTeacherClasses(
      user.uid,
      (fetchedClasses) => {
        setClasses(fetchedClasses);
        setIsLoadingClasses(false);
        if (fetchedClasses.length > 0 && !selectedClassId) {
          setSelectedClassId(fetchedClasses[0].id);
        } else if (fetchedClasses.length > 0 && selectedClassId && !fetchedClasses.some(c => c.id === selectedClassId)) {
          setSelectedClassId(fetchedClasses[0].id);
        }
      },
      (error) => {
        console.error('Error fetching teacher classes:', error);
        setIsLoadingClasses(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const selectedClass = classes.find(c => c.id === selectedClassId) || null;

  const handleAspectCountChange = (count: 2 | 3 | 4) => {
    setAspectCount(count);
    const newAspects = [...aspects];
    if (count > aspects.length) {
      const defaults = [
        'Mennyire volt érthető a mai tananyag?',
        'Mennyire érezted jól magad az órán?',
        'Mennyire voltál aktív a feladatoknál?',
        'Mennyire volt megfelelő a haladási tempó?'
      ];
      while (newAspects.length < count) {
        newAspects.push(defaults[newAspects.length] || `Új ${newAspects.length + 1}. szempont...`);
      }
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

  const applyTemplate = (key: string) => {
    const tmpl = ASPECT_TEMPLATES[key];
    if (!tmpl) return;
    setAspectCount(tmpl.count);
    setAspects([...tmpl.aspects]);
    toast.success(`"${tmpl.name}" sablon betöltve`);
  };

  const startSession = async () => {
    if (!selectedClassId) {
      return toast.error('Válassz ki egy osztályt a listából!');
    }
    if (!lessonInfo.trim()) {
      return toast.error('Add meg a tanóra témáját vagy azonosítóját!');
    }
    if (aspects.some(a => !a.trim())) {
      return toast.error('Minden szempont szövegét töltsd ki!');
    }

    const students = selectedClass?.students || [];

    setIsStarting(true);
    try {
      const now = new Date().toISOString();
      const sessionData = {
        teacher_id: user!.uid,
        class_id: selectedClassId,
        class_name: selectedClass?.name || 'Osztály',
        tool_type: 'target_board',
        aspects: aspects,
        lesson_info: lessonInfo.trim(),
        feedback_mode: feedbackMode,
        students: students.map(s => ({
          id: s.userId,
          name: s.name,
          userCode: s.userCode,
          avatar_id: s.avatarUrl || '🎒'
        })),
        created_at: now
      };

      const docRef = await addDoc(collection(db, 'feedback_sessions'), sessionData);
      const createdSession = { id: docRef.id, ...sessionData };

      // Send individual notifications if in individual mode
      if (feedbackMode === 'individual') {
        if (students.length > 0) {
          let sentCount = 0;
          for (const s of students) {
            if (s.userId) {
              await addDoc(collection(db, 'feedback_notifications'), {
                session_id: createdSession.id,
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
          toast.success(`${sentCount} beiratkozott diáknak küldtünk egyéni felkérést.`);
        } else {
          toast.warning('Ebben az osztályban még nincsenek diákok felvéve a 6 jegyű kódjukkal.');
        }
      }

      const launchHandler = onStart || onStartGame;
      if (launchHandler) {
        launchHandler(createdSession);
      }
    } catch (error) {
      toast.error('Hiba a visszajelzés indításakor');
      console.error(error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        {/* Bal Oszlop: Osztály, Téma és Mód (5 oszlop) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* 1. Osztály Kiválasztása */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                1. Osztály Kiválasztása
              </Label>
              {onSwitchToClasses && (
                <button
                  type="button"
                  onClick={onSwitchToClasses}
                  className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
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
                        "px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                        isSelected
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs scale-[1.02]"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80"
                      )}
                    >
                      <span>🏫</span>
                      <span>{c.name}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-md font-mono",
                        isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
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

          {/* 2. Tanóra Azonosítója / Címe */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              2. Tanóra Témája
            </Label>
            <div className="relative">
              <Input
                placeholder="Pl. 7. osztály - Pitagorasz-tétel"
                value={lessonInfo}
                onChange={(e) => setLessonInfo(e.target.value)}
                className="h-8 sm:h-9 text-xs sm:text-sm rounded-xl border-slate-200 bg-white pr-7"
              />
              {lessonInfo && (
                <button
                  type="button"
                  onClick={() => setLessonInfo('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Gyors sablon gombok */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] text-slate-400 font-medium mr-0.5">Gyors cím:</span>
              {PRESET_LESSONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setLessonInfo(preset)}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors font-medium border border-indigo-100"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Visszajelzési Mód */}
          <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
              3. Visszajelzési Mód
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => setFeedbackMode('projected')}
                className={cn(
                  "p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-2",
                  feedbackMode === 'projected'
                    ? "border-indigo-600 bg-indigo-50/80 shadow-xs"
                    : "border-slate-200/80 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  feedbackMode === 'projected' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <Monitor className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-slate-800 flex items-center gap-1">
                    Projektoros
                    {feedbackMode === 'projected' && <Check className="w-3 h-3 text-indigo-600 ml-auto" />}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Közös táblára dobás</p>
                </div>
              </div>

              <div
                onClick={() => setFeedbackMode('individual')}
                className={cn(
                  "p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-2",
                  feedbackMode === 'individual'
                    ? "border-purple-600 bg-purple-50/80 shadow-xs"
                    : "border-slate-200/80 hover:border-slate-300 bg-white"
                )}
              >
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  feedbackMode === 'individual' ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-slate-800 flex items-center gap-1">
                    Diák eszköz
                    {feedbackMode === 'individual' && <Check className="w-3 h-3 text-purple-600 ml-auto" />}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Mobil / tablet értesítés</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobb Oszlop: Szempontok és Indítás (7 oszlop) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-pink-500 inline-block" />
                4. Értékelési Szempontok
              </Label>
              {/* Szempontok száma toggle */}
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
                {([2, 3, 4] as const).map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleAspectCountChange(count)}
                    className={cn(
                      "px-2.5 py-0.5 text-xs font-bold rounded-lg transition-all",
                      aspectCount === count
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {count} szempont
                  </button>
                ))}
              </div>
            </div>

            {/* Sablonok */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5 pb-1">
              <span className="text-[10px] text-slate-400 font-medium mr-0.5">Gyors sablon:</span>
              {Object.entries(ASPECT_TEMPLATES).map(([key, tmpl]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyTemplate(key)}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors font-medium border border-pink-100 flex items-center gap-1"
                >
                  <span>{tmpl.icon}</span>
                  <span>{tmpl.name}</span>
                </button>
              ))}
            </div>

            {/* Szempont beviteli mezők */}
            <div className="space-y-2">
              {aspects.map((aspect, idx) => {
                const theme = ASPECT_THEMES[idx] || ASPECT_THEMES[0];
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={cn(
                      "w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 shadow-xs",
                      theme.badge
                    )}>
                      {idx + 1}
                    </span>
                    <Input
                      value={aspect}
                      onChange={(e) => handleAspectChange(idx, e.target.value)}
                      placeholder={`${idx + 1}. szempont szövege...`}
                      className={cn(
                        "h-8 sm:h-9 text-xs sm:text-sm rounded-xl border-slate-200 bg-white flex-1",
                        theme.border
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Nagy Céltábla Indítás Gomb */}
          <Button
            type="button"
            disabled={isStarting}
            onClick={startSession}
            className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm sm:text-base shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            {isStarting ? 'Indítás folyamatban...' : 'Céltábla Visszajelzés Indítása'}
          </Button>
        </div>
      </div>
    </div>
  );
}
