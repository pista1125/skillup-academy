import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TargetBoardGameProps {
  session: any;
  onComplete: () => void;
  isStudentView?: boolean;
  studentId?: string;
}

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

export function TargetBoardGame({ session, onComplete, isStudentView, studentId }: TargetBoardGameProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(new Set());
  
  // Shots by student -> aspectIndex -> shot
  const [studentShots, setStudentShots] = useState<Record<string, Record<number, Shot>>>({});
  const [studentProgress, setStudentProgress] = useState<Record<string, number>>({});
  
  const svgRef = useRef<SVGSVGElement>(null);

  const aspects: string[] = session.aspects || [];
  const numAspects = aspects.length;
  
  // Game constants
  const BOARD_SIZE = 650; // Increased to give more room for labels
  const CENTER = BOARD_SIZE / 2;
  const MAX_RADIUS = 180; // Decreased target size slightly to give labels more room
  const RINGS = 10;
  const RING_STEP = MAX_RADIUS / RINGS;

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('feedback_students')
      .select('*')
      .eq('class_id', session.class_id)
      .order('name');
      
    if (data) {
      setStudents(data);
    }
  };

  const fetchProgress = async () => {
    const { data } = await supabase
      .from('feedback_notifications')
      .select('student_id, progress, status')
      .eq('session_id', session.id);
    
    if (data) {
      const progressMap: Record<string, number> = {};
      const completed = new Set<string>();
      data.forEach(n => {
        progressMap[n.student_id] = n.progress || 0;
        if (n.status === 'read') completed.add(n.student_id);
      });
      setStudentProgress(progressMap);
      setCompletedStudents(completed);
    }
    
    // Also fetch any existing results to mark completed
    const { data: results } = await supabase
      .from('feedback_results')
      .select('student_id')
      .eq('session_id', session.id);
    
    if (results) {
      setCompletedStudents(prev => {
        const next = new Set(prev);
        results.forEach(r => next.add(r.student_id));
        return next;
      });
    }
  };

  const subscribeToProgress = () => {
    const channel = supabase
      .channel(`session_progress_${session.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedback_notifications',
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          if (payload.new) {
            const { student_id, progress, status } = payload.new as any;
            setStudentProgress(prev => ({ ...prev, [student_id]: progress }));
            if (status === 'read') {
              setCompletedStudents(prev => {
                const next = new Set(prev);
                next.add(student_id);
                return next;
              });
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedback_results',
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          if (payload.new) {
            setCompletedStudents(prev => {
              const next = new Set(prev);
              next.add(payload.new.student_id);
              return next;
            });
          }
        }
      )
      .subscribe();

    return channel;
  };

  useEffect(() => {
    fetchStudents();
    let channel: any = null;

    if (session.feedback_mode === 'individual') {
      fetchProgress();
      channel = subscribeToProgress();
    }
    
    if (isStudentView && studentId) {
      setActiveStudentId(studentId);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
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
    
    // Calculate distance and angle
    const dx = svgP.x - CENTER;
    const dy = svgP.y - CENTER;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > MAX_RADIUS) return; // Kívül kattintott
    
    // Score based on distance (10 is center, 1 is outside)
    const score = Math.max(1, Math.min(10, Math.ceil(11 - (dist / RING_STEP))));
    
    // Aspect index based on angle
    const angle = getAngle(CENTER, CENTER, svgP.x, svgP.y);
    const sectorAngle = 360 / numAspects;
    
    // The sectors are drawn starting from -90 degrees (top).
    // So top is 270 degrees in our standard atan2 (0 is right, 90 is bottom).
    // Let's adjust angle so 270 (top) becomes 0.
    let normalizedAngle = (angle + 90) % 360;
    const aspectIndex = Math.floor(normalizedAngle / sectorAngle);
    
    // Mentjük a lövést
    setStudentShots(prev => {
      const currentShots = prev[activeStudentId] || {};
      const newShots = { 
        ...currentShots, 
        [aspectIndex]: { aspectIndex, score, x: svgP.x, y: svgP.y } 
      };
      
      const newProgress = Object.keys(newShots).length;
      
      // Update progress in database if in individual mode
      if (isStudentView && studentId) {
        updateProgress(studentId, newProgress);
      }
      
      // Check if student completed all aspects
      if (newProgress === numAspects) {
        saveStudentResults(activeStudentId, newShots);
      }
      
      return { ...prev, [activeStudentId]: newShots };
    });
  };

  const updateProgress = async (studentId: string, progress: number) => {
    await supabase
      .from('feedback_notifications')
      .update({ progress })
      .eq('session_id', session.id)
      .eq('student_id', studentId);
  };

  const saveStudentResults = async (studentId: string, shots: Record<number, Shot>) => {
    // Kinyerjük a pontszámokat a szempontok 0,1.. sorrendjében
    const scoresArray = Array.from({ length: numAspects }, (_, i) => shots[i]?.score || 0);
    
    const { error } = await supabase
      .from('feedback_results')
      .insert({
        session_id: session.id,
        student_id: studentId,
        scores: scoresArray
      });
      
    if (!error) {
      setCompletedStudents(prev => {
        const next = new Set(prev);
        next.add(studentId);
        return next;
      });

      // Mark notification as read
      if (isStudentView) {
        await supabase
          .from('feedback_notifications')
          .update({ status: 'read' })
          .eq('session_id', session.id)
          .eq('student_id', studentId);
      }
      
      toast.success(`${students.find(s => s.id === studentId)?.name} eredménye elmentve!`);
      
      if (isStudentView) {
        // Automatically finish for student
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        // Kijelölés törlése picit később, hogy lássa a lövést
        setTimeout(() => {
          if (activeStudentId === studentId) setActiveStudentId(null);
        }, 1500);
      }
    } else {
      toast.error('Hiba az eredmény mentésekor!');
    }
  };

  const handleEndSession = () => {
    if (completedStudents.size < students.length) {
      if (!confirm('Még nem lőtt minden diák! Biztosan befejezed az értékelést?')) return;
    }
    toast.success('Visszajelzés sikeresen rögzítve!');
    onComplete();
  };

  // SVG Helper functions
  const renderRings = () => {
    const rings = [];
    for (let i = RINGS; i > 0; i--) {
      // Alternating colors
      const r = i * RING_STEP;
      const fill = i % 2 === 0 ? '#f8fafc' : '#f1f5f9';
      // Center rings special colors
      let specialFill = fill;
      if (i === 1) specialFill = '#ef4444'; // Red center
      else if (i === 2) specialFill = '#f87171';
      else if (i === 3) specialFill = '#fca5a5';
      
      rings.push(
        <circle 
          key={`ring-${i}`} 
          cx={CENTER} 
          cy={CENTER} 
          r={r} 
          fill={specialFill} 
          stroke="#cbd5e1" 
          strokeWidth="1"
        />
      );
      
      // Pontszám feliratok (csak a felső tengelyen)
      if (i > 1) {
        rings.push(
          <text 
            key={`text-${i}`} 
            x={CENTER} 
            y={CENTER - r + 12} 
            textAnchor="middle" 
            fontSize="10" 
            fill="#94a3b8"
            fontWeight="bold"
          >
            {11 - i}
          </text>
        );
      }
    }
    return rings;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const renderSectors = () => {
    if (numAspects < 2) return null;
    
    const lines = [];
    const sectorAngle = 360 / numAspects;
    
    for (let i = 0; i < numAspects; i++) {
      const angle = i * sectorAngle;
      const pt = polarToCartesian(CENTER, CENTER, MAX_RADIUS, angle);
      
      lines.push(
        <line 
          key={`div-${i}`} 
          x1={CENTER} 
          y1={CENTER} 
          x2={pt.x} 
          y2={pt.y} 
          stroke="#334155" 
          strokeWidth="3"
          strokeDasharray="5,5"
        />
      );
      
      // Szempont felirat
      const labelAngle = angle + (sectorAngle / 2);
      // Picit kijebb visszük a feliratot
      const labelPt = polarToCartesian(CENTER, CENTER, MAX_RADIUS + 50, labelAngle);
      
      const aspectText = aspects[i] || '';
      // Becsült szélesség a szöveg hossza alapján (kb. 8px karakterenként)
      const labelWidth = Math.max(130, aspectText.length * 9 + 20);

      lines.push(
        <g key={`label-${i}`} transform={`translate(${labelPt.x}, ${labelPt.y})`}>
          <rect 
            x={-labelWidth / 2} 
            y="-18" 
            width={labelWidth} 
            height="36" 
            rx="12" 
            fill="white" 
            stroke="#6366f1" 
            strokeWidth="2"
            className="drop-shadow-md"
          />
          <text 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="15" 
            fontWeight="900"
            fill="#1e293b"
            className="select-none pointer-events-none"
          >
            {aspectText}
          </text>
        </g>
      );
    }
    
    return lines;
  };

  const renderActiveShots = () => {
    if (!activeStudentId) return null;
    const shots = studentShots[activeStudentId] || {};
    const activeStudent = students.find(s => s.id === activeStudentId);
    
    return Object.values(shots).map((shot, i) => (
      <g key={`shot-${i}`} transform={`translate(${shot.x}, ${shot.y})`}>
        {/* Darts shadow */}
        <ellipse cx="2" cy="5" rx="3" ry="1.5" fill="rgba(0,0,0,0.3)" />
        {/* Darts point */}
        <circle cx="0" cy="0" r="4" fill="#1e293b" />
        {/* Darts flight */}
        <path d="M0,0 L15,-15 L20,-10 Z" fill="#6366f1" />
        <path d="M0,0 L10,-20 L15,-15 Z" fill="#818cf8" />
        
        {/* Student Avatar */}
        <text 
          x="12" 
          y="-12" 
          fontSize="16" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          {activeStudent?.avatar_id}
        </text>
        
        {/* Score bubble */}
        <circle cx="0" cy="-25" r="9" fill="#10b981" />
        <text x="0" y="-25" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
          {shot.score}
        </text>
      </g>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 border-none overflow-hidden">
      {/* Compact Header */}
      <div className="bg-white px-6 py-2 border-b flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleEndSession} className="text-slate-500 hover:text-slate-800 h-8">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Bejezés
          </Button>
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-slate-800">{session.lesson_info}</h2>
            <p className="text-xs text-slate-500">{session.className} • {students.length} diák</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {completedStudents.size} / {students.length} kész
          </span>
          <Button size="sm" onClick={handleEndSession} className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs font-bold">
            Összesítés mentése
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-start pt-4 lg:pt-8 bg-slate-50/50 overflow-y-auto custom-scrollbar">
          
          <div className="mb-4 text-center shrink-0">
            {activeStudentId ? (
              <div className="animate-in fade-in slide-in-from-top-4">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-indigo-700">
                  <span className="text-4xl">{students.find(s => s.id === activeStudentId)?.avatar_id}</span>
                  {isStudentView ? 'Te következel!' : `${students.find(s => s.id === activeStudentId)?.name} következik!`}
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Kattints a céltáblára a szempontokon belül! Minél beljebb kattintasz, annál jobb értékelést adsz.
                </p>
                <div className="mt-2 text-sm font-black text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full inline-block">
                  {Object.keys(studentShots[activeStudentId] || {}).length} / {numAspects} lövés
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-slate-700 flex items-center justify-center gap-2">
                  <UserCircle2 className="w-8 h-8 text-slate-400" /> 
                  Válassz egy diákot a listából!
                </h3>
              </div>
            )}
          </div>

          <div className={`relative transition-all duration-300 ${activeStudentId && !completedStudents.has(activeStudentId) ? 'scale-100 opacity-100 cursor-crosshair drop-shadow-xl' : 'scale-95 opacity-50 cursor-not-allowed grayscale'}`}>
            <svg 
              ref={svgRef}
              width={BOARD_SIZE} 
              height={BOARD_SIZE} 
              viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
              onClick={handleBoardClick}
              className="bg-white rounded-full shadow-inner overflow-visible"
            >
              {/* Outer Board */}
              <circle cx={CENTER} cy={CENTER} r={MAX_RADIUS + 5} fill="#334155" />
              
              {/* Rings */}
              {renderRings()}
              
              {/* Sectors */}
              {renderSectors()}
              
              {/* Active Student Shots */}
              {renderActiveShots()}
            </svg>
          </div>
          
          {isStudentView && activeStudentId && completedStudents.has(activeStudentId) && (
            <div className="mt-8 bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-lg border-4 border-emerald-300 animate-bounce flex items-center gap-4">
               <span className="text-3xl">🎉</span>
               <span className="text-xl font-black">Köszönjük a visszajelzést! Mentés...</span>
            </div>
          )}
        </div>

        {/* Sidebar - HIDDEN in student view */}
        {!isStudentView && (
          <div className="w-[380px] bg-white border-l z-10 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
            <div className="p-3 border-b bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-700 text-sm">Osztálynévsor</h3>
              {session.feedback_mode === 'individual' && (
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">Élő követés aktív</span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-2.5 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {students.map(student => {
                  const isCompleted = completedStudents.has(student.id);
                  const isActive = activeStudentId === student.id;
                  const progress = studentProgress[student.id] || 0;
                  
                  return (
                    <button
                      key={student.id}
                      onClick={() => !isCompleted && setActiveStudentId(student.id)}
                      disabled={isCompleted}
                      className={`flex flex-col p-2.5 rounded-xl transition-all text-left relative overflow-hidden group ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-300 ring-offset-1' 
                          : isCompleted 
                            ? 'bg-slate-50 border border-slate-100 text-slate-400' 
                            : 'bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 shadow-sm'
                      }`}
                    >
                      {/* Progress Bar for Individual Mode */}
                      {session.feedback_mode === 'individual' && !isCompleted && progress > 0 && (
                        <div 
                          className="absolute bottom-0 left-0 h-1 bg-indigo-400/30 transition-all duration-500" 
                          style={{ width: `${(progress / numAspects) * 100}%` }}
                        />
                      )}

                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl shrink-0">{student.avatar_id}</span>
                          <span className={cn(
                            "font-bold text-[11px] truncate",
                            isActive ? "text-white" : isCompleted ? "text-slate-400" : "text-slate-700"
                          )}>
                            {student.name}
                          </span>
                        </div>
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </div>
                      
                      {session.feedback_mode === 'individual' && !isCompleted && progress > 0 && (
                        <div className={cn(
                          "text-[9px] font-bold mt-1",
                          isActive ? "text-indigo-100" : "text-indigo-500"
                        )}>
                          Feldolgozva: {progress} / {numAspects}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
