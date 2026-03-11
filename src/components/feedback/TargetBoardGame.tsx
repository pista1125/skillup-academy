import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface TargetBoardGameProps {
  session: any;
  onComplete: () => void;
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

export function TargetBoardGame({ session, onComplete }: TargetBoardGameProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(new Set());
  
  // Shots by student -> aspectIndex -> shot
  const [studentShots, setStudentShots] = useState<Record<string, Record<number, Shot>>>({});
  
  const svgRef = useRef<SVGSVGElement>(null);

  const aspects: string[] = session.aspects || [];
  const numAspects = aspects.length;
  
  // Game constants
  const BOARD_SIZE = 500;
  const CENTER = BOARD_SIZE / 2;
  const MAX_RADIUS = 220;
  const RINGS = 10;
  const RING_STEP = MAX_RADIUS / RINGS;

  useEffect(() => {
    fetchStudents();
  }, [session.class_id]);

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
      
      // Check if student completed all aspects
      if (Object.keys(newShots).length === numAspects) {
        saveStudentResults(activeStudentId, newShots);
      }
      
      return { ...prev, [activeStudentId]: newShots };
    });
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
      
      toast.success(`${students.find(s => s.id === studentId)?.name} eredménye elmentve!`);
      // Kijelölés törlése picit később, hogy lássa a lövést
      setTimeout(() => {
        if (activeStudentId === studentId) setActiveStudentId(null);
      }, 1500);
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
      const labelPt = polarToCartesian(CENTER, CENTER, MAX_RADIUS + 30, labelAngle);
      
      lines.push(
        <g key={`label-${i}`} transform={`translate(${labelPt.x}, ${labelPt.y})`}>
          <rect x="-60" y="-12" width="120" height="24" rx="4" fill="white" stroke="#e2e8f0" />
          <text 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="12" 
            fontWeight="bold"
            fill="#334155"
            className="select-none pointer-events-none"
          >
            {aspects[i]?.length > 15 ? aspects[i].substring(0, 13) + '...' : aspects[i]}
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
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleEndSession} className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5 mr-2" /> Bejezés
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{session.lesson_info}</h2>
            <p className="text-sm text-slate-500">{session.className} - {students.length} diák</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4 inline mr-1 text-emerald-500" />
            {completedStudents.size} / {students.length} kész
          </span>
          <Button onClick={handleEndSession} className="bg-emerald-600 hover:bg-emerald-700">
            Összesítés mentése
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
          
          <div className="mb-6 text-center">
            {activeStudentId ? (
              <div className="animate-in fade-in slide-in-from-top-4">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-indigo-700">
                  <span className="text-4xl">{students.find(s => s.id === activeStudentId)?.avatar_id}</span>
                  {students.find(s => s.id === activeStudentId)?.name} következik!
                </h3>
                <p className="text-slate-600 mt-1">
                  Kattints a céltáblára a szempontokon belül! Minél beljebb, annál jobb.
                </p>
                <div className="mt-2 text-sm font-medium text-indigo-500">
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
              className="bg-white rounded-full shadow-inner"
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
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-white border-l z-10 flex flex-col">
          <div className="p-4 border-b bg-slate-50">
            <h3 className="font-bold text-slate-700">Osztálynévsor</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {students.map(student => {
              const isCompleted = completedStudents.has(student.id);
              const isActive = activeStudentId === student.id;
              
              return (
                <button
                  key={student.id}
                  onClick={() => !isCompleted && setActiveStudentId(student.id)}
                  disabled={isCompleted}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                      : isCompleted 
                        ? 'bg-emerald-50 border border-emerald-100 text-emerald-700 opacity-70' 
                        : 'bg-white border hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{student.avatar_id}</span>
                    <span className="font-semibold">{student.name}</span>
                  </div>
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
