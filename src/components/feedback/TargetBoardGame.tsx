import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Send, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: string;
  name: string;
  avatar_id: string;
}

interface Shot {
  aspectIndex: number;
  score: number;
  x: number;
  y: number;
}

interface TargetBoardGameProps {
  session: any;
  onComplete: () => void;
  isStudentView?: boolean;
  studentId?: string;
}

export function TargetBoardGame({ session, onComplete, isStudentView = false, studentId }: TargetBoardGameProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [studentShots, setStudentShots] = useState<Record<string, Record<number, Shot>>>({});
  const [studentProgress, setStudentProgress] = useState<Record<string, number>>({});
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(new Set());

  const svgRef = useRef<SVGSVGElement>(null);
  const aspects: string[] = session.aspects || [];
  const numAspects = aspects.length;
  
  const BOARD_SIZE = 650;
  const CENTER = BOARD_SIZE / 2;
  const MAX_RADIUS = 180;
  const RINGS = 10;
  const RING_STEP = MAX_RADIUS / RINGS;

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, 'feedback_students'), where('class_id', '==', session.class_id));
      const snapshot = await getDocs(q);
      const list: Student[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Student);
      });
      list.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(list);
    } catch (e) {
      console.error('Error fetching students:', e);
    }
  };

  const fetchProgress = async () => {
    try {
      const q = query(collection(db, 'feedback_notifications'), where('session_id', '==', session.id));
      const snapshot = await getDocs(q);
      const progressMap: Record<string, number> = {};
      const completed = new Set<string>();

      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        progressMap[data.student_id] = data.progress || 0;
        if (data.status === 'read') completed.add(data.student_id);
      });

      setStudentProgress(progressMap);

      const q2 = query(collection(db, 'feedback_results'), where('session_id', '==', session.id));
      const resSnapshot = await getDocs(q2);
      resSnapshot.forEach(docSnap => {
        completed.add(docSnap.data().student_id);
      });

      setCompletedStudents(completed);
    } catch (e) {
      console.error('Error fetching progress:', e);
    }
  };

  useEffect(() => {
    fetchStudents();
    let unsubscribe: any = null;

    if (session.feedback_mode === 'individual') {
      fetchProgress();
      const q = query(collection(db, 'feedback_notifications'), where('session_id', '==', session.id));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const completed = new Set(completedStudents);
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          setStudentProgress(prev => ({ ...prev, [data.student_id]: data.progress || 0 }));
          if (data.status === 'read') completed.add(data.student_id);
        });
        setCompletedStudents(completed);
      });
    }
    
    if (isStudentView && studentId) {
      setActiveStudentId(studentId);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [session.id, session.class_id, isStudentView, studentId]);

  const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI; 
    if (theta < 0) theta = 360 + theta;
    return theta;
  };

  const handleBoardClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!activeStudentId || completedStudents.has(activeStudentId)) return;

    const svg = svgRef.current;
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    const dx = svgP.x - CENTER;
    const dy = svgP.y - CENTER;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > MAX_RADIUS) return;
    
    const score = Math.max(1, Math.min(10, Math.ceil(11 - (dist / RING_STEP))));
    
    const angle = getAngle(CENTER, CENTER, svgP.x, svgP.y);
    const sectorAngle = 360 / numAspects;
    
    let normalizedAngle = (angle + 90) % 360;
    const aspectIndex = Math.floor(normalizedAngle / sectorAngle);
    
    setStudentShots(prev => {
      const currentShots = prev[activeStudentId] || {};
      const newShots = { 
        ...currentShots, 
        [aspectIndex]: { aspectIndex, score, x: svgP.x, y: svgP.y } 
      };
      
      const newProgress = Object.keys(newShots).length;
      
      if (isStudentView && studentId) {
        updateProgress(studentId, newProgress);
      }
      
      if (newProgress === numAspects) {
        saveStudentResults(activeStudentId, newShots);
      }
      
      return { ...prev, [activeStudentId]: newShots };
    });
  };

  const updateProgress = async (sId: string, progress: number) => {
    try {
      const q = query(
        collection(db, 'feedback_notifications'),
        where('session_id', '==', session.id),
        where('student_id', '==', sId)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async docSnap => {
        await updateDoc(doc(db, 'feedback_notifications', docSnap.id), { progress });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const saveStudentResults = async (sId: string, shots: Record<number, Shot>) => {
    const scoresArray = Array.from({ length: numAspects }, (_, i) => shots[i]?.score || 0);
    
    try {
      await addDoc(collection(db, 'feedback_results'), {
        session_id: session.id,
        student_id: sId,
        scores: scoresArray,
        created_at: new Date().toISOString()
      });

      setCompletedStudents(prev => {
        const next = new Set(prev);
        next.add(sId);
        return next;
      });

      if (isStudentView) {
        const q = query(
          collection(db, 'feedback_notifications'),
          where('session_id', '==', session.id),
          where('student_id', '==', sId)
        );
        const snapshot = await getDocs(q);
        snapshot.forEach(async docSnap => {
          await updateDoc(doc(db, 'feedback_notifications', docSnap.id), { status: 'read' });
        });
      }
      
      toast.success('Visszajelzés sikeresen mentve!');
    } catch (e) {
      toast.error('Hiba az eredmény elmentésekor');
    }
  };

  const activeStudent = students.find(s => s.id === activeStudentId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onComplete} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" /> Befejezés / Vissza
        </Button>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-800">{session.lesson_info}</h2>
          <p className="text-xs text-slate-500 font-bold uppercase">{session.feedback_mode === 'individual' ? 'Egyéni Mód' : 'Projektoros Mód'}</p>
        </div>
        <div className="w-24"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left / Student Selection Panel */}
        {!isStudentView && (
          <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 max-h-[600px] overflow-y-auto space-y-2">
            <h3 className="font-bold text-sm text-slate-700 mb-3">Válassz Diákot ({completedStudents.size}/{students.length})</h3>
            {students.map(s => {
              const isDone = completedStudents.has(s.id);
              const isSelected = activeStudentId === s.id;
              const prog = studentProgress[s.id] || 0;

              return (
                <div
                  key={s.id}
                  onClick={() => setActiveStudentId(s.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : isDone 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-white text-slate-800 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.avatar_id}</span>
                    <span className="font-bold text-sm">{s.name}</span>
                  </div>
                  {isDone ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : prog > 0 ? (
                    <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">{prog}/{numAspects}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        {/* Center / Target Board SVG */}
        <div className={`flex flex-col items-center justify-center ${isStudentView ? 'md:col-span-3' : 'md:col-span-2'} bg-white rounded-3xl p-6 border border-slate-100 shadow-sm`}>
          {activeStudent && (
            <div className="mb-4 text-center">
              <span className="text-4xl">{activeStudent.avatar_id}</span>
              <h3 className="text-lg font-black text-slate-800">{activeStudent.name} dobása</h3>
            </div>
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
            onClick={handleBoardClick}
            className="w-full max-w-[500px] h-auto cursor-crosshair select-none"
          >
            {/* Background */}
            <circle cx={CENTER} cy={CENTER} r={MAX_RADIUS + 10} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

            {/* Target Rings */}
            {Array.from({ length: RINGS }).map((_, i) => {
              const r = MAX_RADIUS - i * RING_STEP;
              return (
                <circle
                  key={i}
                  cx={CENTER}
                  cy={CENTER}
                  r={r}
                  fill={i % 2 === 0 ? '#ffffff' : '#f1f5f9'}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Sector Dividing Lines */}
            {Array.from({ length: numAspects }).map((_, i) => {
              const angleDeg = (i * (360 / numAspects) - 90) * (Math.PI / 180);
              const x2 = CENTER + MAX_RADIUS * Math.cos(angleDeg);
              const y2 = CENTER + MAX_RADIUS * Math.sin(angleDeg);
              return (
                <line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x2}
                  y2={y2}
                  stroke="#64748b"
                  strokeWidth="2"
                />
              );
            })}

            {/* Center Bullseye */}
            <circle cx={CENTER} cy={CENTER} r={RING_STEP} fill="#6366f1" />

            {/* Aspect Labels */}
            {aspects.map((aspect, i) => {
              const sectorAngle = 360 / numAspects;
              const midAngleDeg = ((i + 0.5) * sectorAngle - 90) * (Math.PI / 180);
              const labelRadius = MAX_RADIUS + 40;
              const lx = CENTER + labelRadius * Math.cos(midAngleDeg);
              const ly = CENTER + labelRadius * Math.sin(midAngleDeg);

              return (
                <text
                  key={i}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-700 font-extrabold text-xs"
                >
                  {aspect}
                </text>
              );
            })}

            {/* Render Darts / Shots */}
            {Object.entries(studentShots).flatMap(([sId, shots]) => 
              Object.values(shots).map((shot, idx) => (
                <g key={`${sId}-${idx}`}>
                  <circle cx={shot.x} cy={shot.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={shot.x} cy={shot.y} r="3" fill="#ffffff" />
                </g>
              ))
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
