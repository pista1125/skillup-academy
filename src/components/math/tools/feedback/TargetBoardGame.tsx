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
import { 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Trophy, 
  Users, 
  Search, 
  Target 
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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

// 10 distinct, vibrant color bands from outer ring (1 pt) to bullseye (10 pts)
const RING_PALETTE = [
  { score: 10, fill: '#dc2626', stroke: '#ffffff', text: '#ffffff', name: '10 - Telitalálat' },
  { score: 9,  fill: '#ef4444', stroke: '#ffffff', text: '#ffffff', name: '9 pont' },
  { score: 8,  fill: '#f97316', stroke: '#ffffff', text: '#ffffff', name: '8 pont' },
  { score: 7,  fill: '#f59e0b', stroke: '#ffffff', text: '#ffffff', name: '7 pont' },
  { score: 6,  fill: '#eab308', stroke: '#ffffff', text: '#1e293b', name: '6 pont' },
  { score: 5,  fill: '#84cc16', stroke: '#ffffff', text: '#1e293b', name: '5 pont' },
  { score: 4,  fill: '#10b981', stroke: '#ffffff', text: '#ffffff', name: '4 pont' },
  { score: 3,  fill: '#06b6d4', stroke: '#ffffff', text: '#ffffff', name: '3 pont' },
  { score: 2,  fill: '#3b82f6', stroke: '#ffffff', text: '#ffffff', name: '2 pont' },
  { score: 1,  fill: '#6366f1', stroke: '#ffffff', text: '#ffffff', name: '1 pont' }
];

const ASPECT_THEMES = [
  {
    border: '#0284c7',
    badge: '#0ea5e9',
    bg: '#f0f9ff',
    text: '#0369a1',
    flightPrimary: '#0284c7',
    flightSecondary: '#38bdf8',
    flightDark: '#0369a1'
  },
  {
    border: '#059669',
    badge: '#10b981',
    bg: '#ecfdf5',
    text: '#047857',
    flightPrimary: '#059669',
    flightSecondary: '#34d399',
    flightDark: '#047857'
  },
  {
    border: '#d97706',
    badge: '#f59e0b',
    bg: '#fffbeb',
    text: '#b45309',
    flightPrimary: '#d97706',
    flightSecondary: '#fbbf24',
    flightDark: '#b45309'
  },
  {
    border: '#9333ea',
    badge: '#a855f7',
    bg: '#faf5ff',
    text: '#7e22ce',
    flightPrimary: '#9333ea',
    flightSecondary: '#c084fc',
    flightDark: '#7e22ce'
  }
];

export function TargetBoardGame({ session, onComplete, isStudentView = false, studentId }: TargetBoardGameProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [studentShots, setStudentShots] = useState<Record<string, Record<number, Shot>>>({});
  const [studentProgress, setStudentProgress] = useState<Record<string, number>>({});
  const [completedStudents, setCompletedStudents] = useState<Set<string>>(new Set());
  const [showAllDarts, setShowAllDarts] = useState(false);
  const [studentFilter, setStudentFilter] = useState('');

  const svgRef = useRef<SVGSVGElement>(null);
  const aspects: string[] = session.aspects || [];
  const numAspects = Math.max(1, aspects.length);
  
  // Board dimensions: enlarged by ~35% on screen (circle fills ~80% of viewBox, max-h optimized)
  const BOARD_SIZE = 920;
  const CENTER = BOARD_SIZE / 2; // 460
  const MAX_RADIUS = 370;
  const RINGS = 10;
  const RING_STEP = MAX_RADIUS / RINGS; // 37px per ring

  useEffect(() => {
    fetchStudents();
  }, [session.id, session.class_id]);

  const fetchStudents = async () => {
    try {
      // 1. If students array was saved with the session, use it directly!
      if (session.students && Array.isArray(session.students) && session.students.length > 0) {
        const list: Student[] = session.students.map((s: any) => ({
          id: s.id || s.userId,
          name: s.name,
          avatar_id: s.avatar_id || s.avatarUrl || '🎒'
        }));
        list.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(list);
        if (isStudentView && studentId) {
          setActiveStudentId(studentId);
        }
        return;
      }

      // 2. Fetch from teacher_classes
      if (session.class_id) {
        const classSnap = await getDoc(doc(db, 'teacher_classes', session.class_id));
        if (classSnap.exists() && classSnap.data().students) {
          const list: Student[] = classSnap.data().students.map((s: any) => ({
            id: s.userId || s.userCode,
            name: s.name,
            avatar_id: s.avatarUrl || '🎒'
          }));
          list.sort((a, b) => a.name.localeCompare(b.name));
          setStudents(list);
          if (isStudentView && studentId) {
            setActiveStudentId(studentId);
          }
          return;
        }
      }

      // 3. Fallback: feedback_students
      const q = query(collection(db, 'feedback_students'), where('class_id', '==', session.class_id));
      const snapshot = await getDocs(q);
      const list: Student[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Student);
      });
      list.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(list);
      if (isStudentView && studentId) {
        setActiveStudentId(studentId);
      }
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

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
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
    
    const dx = svgP.x - CENTER;
    const dy = svgP.y - CENTER;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > MAX_RADIUS) return; // Outside target board
    
    // Score based on distance (10 is center bullseye, 1 is outermost band)
    const score = Math.max(1, Math.min(10, 10 - Math.floor(dist / RING_STEP)));
    
    const angle = getAngle(CENTER, CENTER, svgP.x, svgP.y);
    const sectorAngle = 360 / numAspects;
    
    const normalizedAngle = (angle + 90) % 360;
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
    const studentObj = students.find(s => s.id === sId);
    
    try {
      await addDoc(collection(db, 'feedback_results'), {
        session_id: session.id,
        student_id: sId,
        student_name: studentObj?.name || 'Diák',
        scores: scoresArray,
        created_at: new Date().toISOString()
      });

      setCompletedStudents(prev => {
        const next = new Set(prev);
        next.add(sId);
        return next;
      });

      // Clear active student after a brief delay so board returns to gray and darts disappear
      if (!isStudentView) {
        setTimeout(() => {
          setActiveStudentId(null);
        }, 800);
      }

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
      
      toast.success(`🎯 ${studentObj?.name || 'Diák'} visszajelzése sikeresen rögzítve!`);
    } catch (e) {
      toast.error('Hiba az eredmény elmentésekor');
    }
  };

  const activeStudent = students.find(s => s.id === activeStudentId);
  const activeStudentDone = activeStudentId ? completedStudents.has(activeStudentId) : false;
  const activeStudentShotsCount = activeStudentId ? Object.keys(studentShots[activeStudentId] || {}).length : 0;

  const filteredStudents = students.filter(s => {
    if (!studentFilter.trim()) return true;
    return s.name.toLowerCase().includes(studentFilter.toLowerCase());
  });

  // Split aspect text into 2 readable lines if longer than 14 chars
  const formatAspectText = (text: string) => {
    if (text.length <= 14) return { line1: text, line2: '' };
    const words = text.split(' ');
    let line1 = '';
    let line2 = '';
    for (const w of words) {
      if ((line1 + ' ' + w).trim().length <= 14 && !line2) {
        line1 = (line1 + ' ' + w).trim();
      } else {
        line2 = (line2 + ' ' + w).trim();
      }
    }
    return { line1, line2 };
  };

  // Render 10 distinct, colorful rings with clear score badges
  const renderRings = () => {
    const rings = [];
    
    // Outer base board dark rim with drop shadow
    rings.push(
      <circle
        key="board-base-shadow"
        cx={CENTER}
        cy={CENTER}
        r={MAX_RADIUS + 8}
        fill="#0f172a"
        filter="url(#board-rim-shadow)"
      />
    );
    rings.push(
      <circle
        key="board-base-rim"
        cx={CENTER}
        cy={CENTER}
        r={MAX_RADIUS + 4}
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="2"
      />
    );

    // Draw rings from score = 1 (outermost, largest radius = 10 * RING_STEP)
    // down to score = 10 (innermost, smallest radius = 1 * RING_STEP)
    for (let score = 1; score <= 10; score++) {
      const radius = (11 - score) * RING_STEP;
      const palette = RING_PALETTE.find(p => p.score === score) || RING_PALETTE[10 - score];

      rings.push(
        <circle
          key={`ring-${score}`}
          cx={CENTER}
          cy={CENTER}
          r={radius}
          fill={palette.fill}
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeOpacity="0.9"
        />
      );
    }

    // Inner gold bullseye center pin
    rings.push(
      <circle
        key="bullseye-gold-pin"
        cx={CENTER}
        cy={CENTER}
        r={RING_STEP * 0.38}
        fill="#fbbf24"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
    );
    rings.push(
      <circle
        key="bullseye-core-dot"
        cx={CENTER}
        cy={CENTER}
        r={2.5}
        fill="#991b1b"
      />
    );

    // Score point badges on North (12 o'clock) AND South (6 o'clock) axes for every ring
    for (let score = 1; score <= 10; score++) {
      const rMid = (10.5 - score) * RING_STEP;
      const yNorth = CENTER - rMid;
      const ySouth = CENTER + rMid;

      // North badge
      rings.push(
        <g key={`badge-north-${score}`} className="select-none pointer-events-none">
          <rect
            x={CENTER - 17}
            y={yNorth - 13}
            width="34"
            height="26"
            rx="7"
            fill="rgba(15, 23, 42, 0.92)"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
          />
          <text
            x={CENTER}
            y={yNorth}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="21.5"
            fontWeight="900"
            fill="#ffffff"
          >
            {score}
          </text>
        </g>
      );

      // South badge (except bullseye to avoid overlap)
      if (score < 10) {
        rings.push(
          <g key={`badge-south-${score}`} className="select-none pointer-events-none">
            <rect
              x={CENTER - 17}
              y={ySouth - 13}
              width="34"
              height="26"
              rx="7"
              fill="rgba(15, 23, 42, 0.92)"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.2"
            />
            <text
              x={CENTER}
              y={ySouth}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="21.5"
              fontWeight="900"
              fill="#ffffff"
            >
              {score}
            </text>
          </g>
        );
      }
    }

    return rings;
  };

  // Render sector lines and comprehensive aspect cards (no cut off text)
  const renderSectors = () => {
    const lines = [];
    const sectorAngle = 360 / numAspects;

    for (let i = 0; i < numAspects; i++) {
      const angle = i * sectorAngle;
      const pt = polarToCartesian(CENTER, CENTER, MAX_RADIUS, angle);

      // Clean sector dividing dashed line
      lines.push(
        <line
          key={`div-${i}`}
          x1={CENTER}
          y1={CENTER}
          x2={pt.x}
          y2={pt.y}
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="4,4"
        />
      );

      // Aspect card positioned outside the board
      const midAngleDeg = angle + sectorAngle / 2;
      const labelPt = polarToCartesian(CENTER, CENTER, MAX_RADIUS + 46, midAngleDeg);
      const aspectText = aspects[i] || `${i + 1}. szempont`;
      const { line1, line2 } = formatAspectText(aspectText);
      const theme = ASPECT_THEMES[i % ASPECT_THEMES.length];
      const maxLen = Math.max(line1.length, line2.length);
      const cardWidth = Math.max(190, Math.min(300, maxLen * 13 + 72));
      const cardHeight = line2 ? 68 : 50;

      lines.push(
        <g key={`label-${i}`} transform={`translate(${labelPt.x}, ${labelPt.y})`} className="select-none pointer-events-none">
          {/* Card body */}
          <rect
            x={-cardWidth / 2}
            y={-cardHeight / 2}
            width={cardWidth}
            height={cardHeight}
            rx="20"
            fill="#ffffff"
            stroke={theme.border}
            strokeWidth="3.5"
            filter="drop-shadow(0 5px 10px rgba(0,0,0,0.18))"
          />

          {/* Number pill on the left */}
          <circle 
            cx={-cardWidth / 2 + 26} 
            cy={0} 
            r={17} 
            fill={theme.badge} 
          />
          <text
            x={-cardWidth / 2 + 26}
            y={0.5}
            fill="#ffffff"
            fontSize="21.5"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {i + 1}
          </text>

          {/* Text lines (+50% extra larger fonts) */}
          {line2 ? (
            <>
              <text
                x={20}
                y={-13}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="23"
                fontWeight="800"
                fill="#0f172a"
              >
                {line1}
              </text>
              <text
                x={20}
                y={17}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="20"
                fontWeight="700"
                fill="#475569"
              >
                {line2}
              </text>
            </>
          ) : (
            <text
              x={20}
              y={0.5}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="24"
              fontWeight="800"
              fill="#0f172a"
            >
              {line1}
            </text>
          )}
        </g>
      );
    }

    return lines;
  };

  // Render authentic 3D tournament Dart (50% scale, mirrored on Y-axis)
  const renderDart = (shot: Shot, studentObj?: Student, isCurrent = true) => {
    const avatar = studentObj?.avatar_id || '🎒';
    const isImg = avatar.startsWith('http') || avatar.startsWith('data:') || avatar.startsWith('/');
    const theme = ASPECT_THEMES[shot.aspectIndex % ASPECT_THEMES.length] || ASPECT_THEMES[0];
    const studentName = studentObj?.name || 'Diák';
    const shortName = studentName.split(' ')[0] || studentName;
    const scoreColor = shot.score >= 8 ? '#10b981' : shot.score >= 5 ? '#f59e0b' : '#ef4444';

    return (
      <g
        key={`shot-${shot.aspectIndex}-${shot.x}-${shot.y}`}
        transform={`translate(${shot.x}, ${shot.y})`}
        className="pointer-events-none select-none transition-all duration-300"
        opacity={isCurrent ? 1 : 0.88}
      >
        {/* 1. Realistic Soft Drop Shadow (mirrored to bottom-left) */}
        <ellipse
          cx="-10"
          cy="12"
          rx="15"
          ry="5"
          transform="rotate(-28 -10 12)"
          fill="rgba(15, 23, 42, 0.38)"
          filter="url(#dart-blur-shadow)"
        />

        {/* 2. Board Impact Entry Point */}
        <circle cx="0" cy="0" r="3.5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
        <circle cx="0" cy="0" r="1.8" fill="#0f172a" />

        {/* 3. The Physical 3D Tournament Dart (50% scale, tilted +28 degrees = mirrored on Y-axis) */}
        <g transform="rotate(28) scale(0.5)">
          {/* A. Hardened Steel Needle penetrating board */}
          <polygon points="0,0 -2.5,-12 2.5,-12" fill="url(#steel-needle-grad)" />

          {/* B. Knurled Metallic Grip Barrel (Tungsten Pro Dart) */}
          <path
            d="M-3.5,-12 L-4,-40 L4,-40 L3.5,-12 Z"
            fill="url(#metal-barrel-grad)"
            stroke="#1e293b"
            strokeWidth="0.6"
          />
          {/* Precision grip knurling bands */}
          <line x1="-3.7" y1="-17" x2="3.7" y2="-17" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="-3.7" y1="-18.2" x2="3.7" y2="-18.2" stroke="#f59e0b" strokeWidth="1" />

          <line x1="-3.8" y1="-23" x2="3.8" y2="-23" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="-3.8" y1="-24.2" x2="3.8" y2="-24.2" stroke="#f59e0b" strokeWidth="1" />

          <line x1="-3.9" y1="-29" x2="3.9" y2="-29" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="-3.9" y1="-30.2" x2="3.9" y2="-30.2" stroke="#f59e0b" strokeWidth="1" />

          <line x1="-4" y1="-35" x2="4" y2="-35" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="-4" y1="-36.2" x2="4" y2="-36.2" stroke="#f59e0b" strokeWidth="1" />

          {/* C. Titanium / Carbon Shaft */}
          <rect x="-2.5" y="-43" width="5" height="3" rx="0.5" fill="#e2e8f0" stroke="#475569" strokeWidth="0.5" />
          <line x1="0" y1="-43" x2="0" y2="-68" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <line x1="0.6" y1="-43" x2="0.6" y2="-68" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
          <rect x="-2.5" y="-68" width="5" height="2" rx="0.5" fill="#f59e0b" />

          {/* D. 3D Aerodynamic Flights (Cross Fins in Perspective) */}
          {/* Right Wing (in subtle shadow) */}
          <path
            d="M0,-67 C8,-69 20,-76 22,-94 C15,-98 8,-94 0,-98 Z"
            fill={theme.flightDark}
            stroke="#0f172a"
            strokeWidth="0.7"
          />
          <path
            d="M0,-72 C6,-75 15,-80 17,-90"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.8"
          />

          {/* Left Wing (in bright light) */}
          <path
            d="M0,-67 C-8,-69 -20,-76 -22,-94 C-15,-98 -8,-94 0,-98 Z"
            fill={theme.flightSecondary}
            stroke="#0f172a"
            strokeWidth="0.7"
          />
          <path
            d="M0,-72 C-6,-75 -15,-80 -17,-90"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.8"
          />

          {/* Center Main Fin (facing viewer) */}
          <path
            d="M0,-67 C-4,-74 -6,-88 0,-102 C6,-88 4,-74 0,-67 Z"
            fill={theme.flightPrimary}
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line x1="0" y1="-67" x2="0" y2="-102" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Flight Protector Cap at tail */}
          <rect x="-2" y="-103" width="4" height="3" rx="1" fill="#e2e8f0" stroke="#334155" strokeWidth="0.5" />
        </g>

        {/* 4. Unified Glassmorphism Player HUD Tag: [Avatar] [Short Name] | [Score] */}
        <g transform="translate(18, -60)" className="pointer-events-none">
          {/* Fine connector line from dart tail to tag */}
          <line x1="0" y1="9" x2="6" y2="18" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2,2" />
          <circle cx="0" cy="9" r="1.5" fill={theme.badge} />

          {/* Tag Pill Body */}
          <rect
            x="-68"
            y="-18"
            width="136"
            height="36"
            rx="18"
            fill="rgba(15, 23, 42, 0.94)"
            stroke={theme.border}
            strokeWidth="1.8"
            filter="url(#tag-drop-shadow)"
          />

          {/* Student Avatar */}
          <circle cx="-50" cy="0" r="12" fill="#ffffff" stroke={theme.border} strokeWidth="1.2" />
          {isImg ? (
            <text x="-50" y="0.5" textAnchor="middle" dominantBaseline="central" fontSize="15">🎓</text>
          ) : (
            <text x="-50" y="0.5" textAnchor="middle" dominantBaseline="central" fontSize="15">{avatar}</text>
          )}

          {/* Student Short Name */}
          <text
            x="-33"
            y="0.5"
            fill="#ffffff"
            fontSize="17.5"
            fontWeight="800"
            textAnchor="start"
            dominantBaseline="central"
          >
            {shortName.length > 5 ? shortName.substring(0, 4) + '..' : shortName}
          </text>

          {/* Score Badge Pill */}
          <rect
            x="31"
            y="-12"
            width="30"
            height="24"
            rx="7"
            fill={scoreColor}
          />
          <text
            x="46"
            y="0.5"
            fill="#ffffff"
            fontSize="17"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {shot.score}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-2">
      {/* Top Header Bar */}
      <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onComplete}
            className="h-8 px-2.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 bg-white hover:bg-slate-100 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Befejezés / Vissza</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xs">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
                {session.lesson_info}
              </h2>
              <p className="text-[10px] text-slate-500">
                {session.class_name} • {session.feedback_mode === 'individual' ? '📱 Egyéni diák eszközök' : '🖥️ Projektoros vetítés'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-2">
          {!isStudentView && (
            <button
              type="button"
              onClick={() => setShowAllDarts(!showAllDarts)}
              className={cn(
                "h-8 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5",
                showAllDarts 
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              )}
            >
              {showAllDarts ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showAllDarts ? 'Mindenki nyilai' : 'Csak aktív diák'}</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{completedStudents.size} / {students.length} kész</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Cockpit: TARGET ON LEFT, STUDENTS ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        
        {/* BAL OLDAL: CÉLTÁBLA JÁTÉKTÉR (7 vagy 8 oszlop) */}
        <div className={cn(
          isStudentView ? "lg:col-span-12" : "lg:col-span-7 xl:col-span-8",
          "bg-white/95 backdrop-blur-sm rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-sm flex flex-col items-center justify-start relative overflow-hidden"
        )}>
          {/* Active Student Prompt Banner */}
          <div className="mb-1 text-center w-full max-w-md">
            {activeStudent ? (
              <div className="bg-indigo-50/90 border border-indigo-200/80 rounded-xl p-2 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {activeStudent.avatar_id?.startsWith('http') ? '🎓' : (activeStudent.avatar_id || '🎒')}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="font-bold text-xs text-indigo-950 truncate">
                      {activeStudent.name} következik!
                    </p>
                    <p className="text-[10px] text-indigo-600 leading-tight">
                      {activeStudentDone 
                        ? '✓ Minden szempontra leadta a lövését' 
                        : 'Kattints a céltáblára a szempontokon belül!'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10.5px] font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-xs">
                    {activeStudentShotsCount} / {numAspects} lövés
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100/90 border border-slate-200/80 rounded-xl p-2 text-center text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 shadow-2xs">
                <span>👉 Válassz ki egy diákot a jobb oldali névsorból a dobáshoz!</span>
              </div>
            )}
          </div>

          {/* SVG Target Board: Szürke ha nincs aktív diák, gyönyörű színes ha van */}
          <div className={cn(
            "relative transition-all duration-500 w-full flex items-center justify-center",
            !activeStudent ? "grayscale contrast-75 opacity-60 cursor-not-allowed" : "cursor-crosshair drop-shadow-md"
          )}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
              onClick={handleBoardClick}
              className="w-full h-auto max-w-[660px] xl:max-w-[720px] 2xl:max-w-[760px] max-h-[calc(100vh-125px)] aspect-square select-none overflow-visible"
            >
              <defs>
                {/* Soft blur for dart drop shadow */}
                <filter id="dart-blur-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>

                {/* Drop shadow for player HUD tag */}
                <filter id="tag-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.4" />
                </filter>

                {/* Drop shadow for target board outer rim */}
                <filter id="board-rim-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.25" />
                </filter>

                {/* Hardened steel needle gradient */}
                <linearGradient id="steel-needle-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="35%" stopColor="#cbd5e1" />
                  <stop offset="65%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Metallic barrel cylindrical gradient */}
                <linearGradient id="metal-barrel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="25%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="75%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* 10 Distinct, Colorful Concentric Rings with score badges */}
              {renderRings()}

              {/* Sector dividing dashed lines and comprehensive aspect cards */}
              {renderSectors()}

              {/* Render Darts / Arrows */}
              {activeStudentId && studentShots[activeStudentId] ? (
                // Show active student's darts while active
                Object.values(studentShots[activeStudentId]).map((shot) => 
                  renderDart(shot, activeStudent, true)
                )
              ) : showAllDarts ? (
                // Show all students' darts if toggled
                Object.entries(studentShots).flatMap(([sId, shots]) => {
                  const studentObj = students.find(s => s.id === sId);
                  return Object.values(shots).map((shot) => renderDart(shot, studentObj, false));
                })
              ) : null}
            </svg>
          </div>
        </div>

        {/* JOBB OLDAL: OSZTÁLYNÉVSOR (5 vagy 4 oszlop) - Külön görgetővel, 2 oszlopos egyszerű téglalapokkal */}
        {!isStudentView && (
          <div className="lg:col-span-5 xl:col-span-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-sm flex flex-col max-h-[calc(100vh-115px)] space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 shrink-0">
              <h3 className="font-bold text-xs text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Osztálynévsor ({completedStudents.size}/{students.length})
              </h3>
            </div>

            {/* Quick search input */}
            {students.length > 6 && (
              <div className="relative shrink-0">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Keresés név szerint..."
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* 2-Column Student list with independent scroll */}
            <div className="flex-1 overflow-y-auto pr-1 py-1">
              {filteredStudents.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">Nincs diák ebben az osztályban.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredStudents.map((s) => {
                    const isDone = completedStudents.has(s.id);
                    const isSelected = activeStudentId === s.id;
                    const avatar = s.avatar_id || '🎒';
                    const isImg = avatar.startsWith('http') || avatar.startsWith('data:') || avatar.startsWith('/');

                    return (
                      <div
                        key={s.id}
                        onClick={() => setActiveStudentId(s.id)}
                        className={cn(
                          "px-2.5 py-2 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-1.5 group select-none shadow-2xs",
                          isSelected
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-400/50"
                            : isDone
                            ? "bg-emerald-50/80 hover:bg-emerald-100/70 text-emerald-950 border-emerald-200"
                            : "bg-white hover:bg-indigo-50/50 text-slate-700 border-slate-200/90 hover:border-indigo-200"
                        )}
                      >
                        <div className="flex items-center gap-1.5 min-w-0 pr-0.5">
                          <div className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0",
                            isSelected ? "bg-white/20 text-white" : isDone ? "bg-emerald-200/80 text-emerald-800" : "bg-slate-100 text-slate-700"
                          )}>
                            {isImg ? (
                              <img src={avatar} alt={s.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span>{avatar}</span>
                            )}
                          </div>
                          <span className={cn(
                            "font-bold text-xs truncate leading-tight",
                            isSelected ? "text-white" : isDone ? "text-emerald-900" : "text-slate-800"
                          )}>
                            {s.name}
                          </span>
                        </div>

                        {/* ONLY a green checkmark when done - NO 'Várakozik' text! */}
                        {isDone && (
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-2xs",
                            isSelected ? "bg-white text-indigo-600" : "bg-emerald-500 text-white"
                          )}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom complete button */}
            <Button
              onClick={onComplete}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 mt-auto shrink-0"
            >
              <Trophy className="w-4 h-4" />
              <span>Értékelés Befejezése & Eredmények</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
