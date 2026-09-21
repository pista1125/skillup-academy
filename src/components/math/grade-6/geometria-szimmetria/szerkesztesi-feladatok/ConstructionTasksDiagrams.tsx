import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Compass,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  Ruler,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// 1. MINI FIGURES FOR QUIZ, MATCHER, SORTER & THEORY
// ============================================================================
export type ConstructionMiniFigureType =
  | 'triangle_sss'
  | 'triangle_sas'
  | 'triangle_asa'
  | 'triangle_ssa'
  | 'isosceles_base_height'
  | 'equilateral_construction'
  | 'rhombus_diagonals'
  | 'deltoid_construction'
  | 'trapezoid_construction'
  | 'rectangle_construction'
  | 'compass_straightedge'
  | 'sketch_analysis'
  | 'triangle_inequality_ok'
  | 'triangle_inequality_fail'
  | 'angle_sum_check'
  | 'symmetric_completion'
  | 'two_solutions'
  | 'perpendicular_bisector'
  | 'angle_bisector'
  | 'square_construction';

interface MiniFigureProps {
  type: ConstructionMiniFigureType;
  size?: number;
  className?: string;
}

export const ConstructionTasksMiniFigure: React.FC<MiniFigureProps> = ({
  type,
  size = 64,
  className
}) => {
  const s = size;

  switch (type) {
    // 1. SSS / ooo: Három oldal ismeretében körívek metszéspontja
    case 'triangle_sss':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Base side c */}
          <line x1="15" y1="80" x2="85" y2="80" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
          {/* Compass arcs from A and B */}
          <path d="M 30,35 A 48 48 0 0 1 65,30" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M 40,25 A 46 46 0 0 1 60,50" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="3 3" />
          {/* Triangle sides */}
          <line x1="15" y1="80" x2="52" y2="35" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="85" y1="80" x2="52" y2="35" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Vertex C intersection point */}
          <circle cx="52" cy="35" r="3.5" fill="#f43f5e" />
          <circle cx="15" cy="80" r="3" fill="#0d9488" />
          <circle cx="85" cy="80" r="3" fill="#0d9488" />
          <text x="12" y="93" fontSize="9" fill="#0f766e" fontWeight="bold">A</text>
          <text x="82" y="93" fontSize="9" fill="#0f766e" fontWeight="bold">B</text>
          <text x="50" y="24" fontSize="9" fill="#f43f5e" fontWeight="bold">C</text>
        </svg>
      );

    // 2. SAS / oszo: Két oldal és közbezárt szög
    case 'triangle_sas':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Angle arc at A */}
          <path d="M 35,75 A 20 20 0 0 0 28,62" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="32" y="68" fontSize="8" fill="#d97706" fontWeight="bold">α</text>
          {/* Base c and side b */}
          <line x1="15" y1="75" x2="85" y2="75" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="75" x2="45" y2="25" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="85" y1="75" x2="45" y2="25" stroke="#0f766e" strokeWidth="2" strokeDasharray="4 2" />
          {/* Arc on side b */}
          <path d="M 40,20 A 15 15 0 0 1 52,32" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="25" r="3" fill="#f43f5e" />
          <text x="22" y="46" fontSize="8" fill="#0f766e" fontWeight="bold">b</text>
          <text x="50" y="87" fontSize="8" fill="#0f766e" fontWeight="bold">c</text>
        </svg>
      );

    // 3. ASA / szosz: Egy oldal és 2 rajta fekvő szög
    case 'triangle_asa':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Base c */}
          <line x1="15" y1="78" x2="85" y2="78" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
          {/* Rays from A and B */}
          <line x1="15" y1="78" x2="58" y2="20" stroke="#0f766e" strokeWidth="2" />
          <line x1="85" y1="78" x2="40" y2="20" stroke="#0f766e" strokeWidth="2" />
          {/* Angle arcs */}
          <path d="M 32,78 A 18 18 0 0 0 25,66" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 68,78 A 18 18 0 0 1 73,65" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="50" cy="31" r="3" fill="#f43f5e" />
          <text x="28" y="72" fontSize="7" fill="#d97706">α</text>
          <text x="66" y="72" fontSize="7" fill="#2563eb">β</text>
        </svg>
      );

    // 4. SsA / oosz: Két oldal és nagyobbikkal szemközti szög
    case 'triangle_ssa':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="78" x2="90" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="15" y1="78" x2="55" y2="25" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          {/* Compass arc from C */}
          <path d="M 70,60 A 45 45 0 0 1 88,85" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="55" y1="25" x2="80" y2="78" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="78" r="3" fill="#f43f5e" />
          <circle cx="55" cy="25" r="3" fill="#0d9488" />
          <text x="30" y="48" fontSize="8" fill="#0f766e">b</text>
          <text x="72" y="48" fontSize="8" fill="#f43f5e">a</text>
        </svg>
      );

    // 5. Isosceles triangle from base and height
    case 'isosceles_base_height':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Base AB */}
          <line x1="20" y1="80" x2="80" y2="80" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
          {/* Perpendicular bisector */}
          <line x1="50" y1="15" x2="50" y2="90" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" />
          {/* Triangle legs */}
          <line x1="20" y1="80" x2="50" y2="28" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="80" x2="50" y2="28" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right angle marker at midpoint */}
          <path d="M 50,72 L 58,72 L 58,80" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
          <circle cx="50" cy="28" r="3.5" fill="#f43f5e" />
          <text x="53" y="55" fontSize="8" fill="#f43f5e" fontWeight="bold">m_a</text>
          <text x="46" y="93" fontSize="8" fill="#0d9488">a</text>
        </svg>
      );

    // 6. Equilateral triangle construction
    case 'equilateral_construction':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="20" y1="80" x2="80" y2="80" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
          {/* Compass arcs with radius a */}
          <path d="M 40,20 A 60 60 0 0 1 65,35" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 35,35 A 60 60 0 0 1 60,20" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="20" y1="80" x2="50" y2="28" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="80" x2="50" y2="28" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="28" r="3" fill="#f43f5e" />
          <text x="28" y="50" fontSize="8" fill="#0f766e">a</text>
          <text x="68" y="50" fontSize="8" fill="#0f766e">a</text>
          <text x="48" y="92" fontSize="8" fill="#0f766e">a</text>
        </svg>
      );

    // 7. Rhombus from two diagonals
    case 'rhombus_diagonals':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Diagonals perpendicular */}
          <line x1="15" y1="50" x2="85" y2="50" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="50" y1="18" x2="50" y2="82" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Rhombus sides */}
          <polygon points="50,18 85,50 50,82 15,50" fill="rgba(13, 148, 136, 0.12)" stroke="#0d9488" strokeWidth="2.5" />
          {/* Right angle symbol */}
          <path d="M 50,44 L 56,44 L 56,50" fill="none" stroke="#f43f5e" strokeWidth="1.3" />
          <text x="82" y="46" fontSize="7" fill="#f43f5e">e</text>
          <text x="53" y="24" fontSize="7" fill="#6366f1">f</text>
        </svg>
      );

    // 8. Deltoid construction from symmetry axis and sides
    case 'deltoid_construction':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Symmetry axis */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" />
          {/* Deltoid body */}
          <polygon points="50,15 78,42 50,85 22,42" fill="rgba(13, 148, 136, 0.12)" stroke="#0d9488" strokeWidth="2.5" />
          {/* Transverse diagonal */}
          <line x1="22" y1="42" x2="78" y2="42" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="50" cy="15" r="2.5" fill="#f43f5e" />
          <circle cx="50" cy="85" r="2.5" fill="#f43f5e" />
          <text x="30" y="26" fontSize="7" fill="#0f766e">a</text>
          <text x="66" y="26" fontSize="7" fill="#0f766e">a</text>
          <text x="28" y="68" fontSize="7" fill="#0f766e">b</text>
          <text x="68" y="68" fontSize="7" fill="#0f766e">b</text>
        </svg>
      );

    // 9. Symmetric trapezoid with symmetry axis
    case 'trapezoid_construction':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Symmetry axis */}
          <line x1="50" y1="12" x2="50" y2="88" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" />
          {/* Trapezoid polygon */}
          <polygon points="32,30 68,30 84,75 16,75" fill="rgba(13, 148, 136, 0.12)" stroke="#0d9488" strokeWidth="2.5" />
          <text x="47" y="26" fontSize="7" fill="#0f766e">c</text>
          <text x="47" y="85" fontSize="7" fill="#0f766e">a</text>
          <text x="18" y="52" fontSize="7" fill="#0f766e">b</text>
          <text x="78" y="52" fontSize="7" fill="#0f766e">b</text>
        </svg>
      );

    // 10. Rectangle construction from sides
    case 'rectangle_construction':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="18,30 82,30 82,75 18,75" fill="rgba(13, 148, 136, 0.12)" stroke="#0d9488" strokeWidth="2.5" />
          {/* Right angle symbols */}
          <path d="M 18,67 L 26,67 L 26,75" fill="none" stroke="#f43f5e" strokeWidth="1.3" />
          <path d="M 74,75 L 74,67 L 82,67" fill="none" stroke="#f43f5e" strokeWidth="1.3" />
          <text x="47" y="85" fontSize="8" fill="#0f766e">a</text>
          <text x="86" y="55" fontSize="8" fill="#0f766e">b</text>
        </svg>
      );

    // 11. Square construction
    case 'square_construction':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="22,22 78,22 78,78 22,78" fill="rgba(13, 148, 136, 0.12)" stroke="#0d9488" strokeWidth="2.5" />
          {/* Right angle mark */}
          <path d="M 22,70 L 30,70 L 30,78" fill="none" stroke="#f43f5e" strokeWidth="1.3" />
          <text x="47" y="88" fontSize="8" fill="#0f766e">a</text>
          <text x="82" y="52" fontSize="8" fill="#0f766e">a</text>
        </svg>
      );

    // 12. Compass & straightedge tools
    case 'compass_straightedge':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Ruler */}
          <rect x="15" y="70" width="70" height="18" rx="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
          <line x1="25" y1="70" x2="25" y2="76" stroke="#64748b" strokeWidth="1" />
          <line x1="35" y1="70" x2="35" y2="80" stroke="#64748b" strokeWidth="1.2" />
          <line x1="45" y1="70" x2="45" y2="76" stroke="#64748b" strokeWidth="1" />
          <line x1="55" y1="70" x2="55" y2="80" stroke="#64748b" strokeWidth="1.2" />
          <line x1="65" y1="70" x2="65" y2="76" stroke="#64748b" strokeWidth="1" />
          <line x1="75" y1="70" x2="75" y2="80" stroke="#64748b" strokeWidth="1.2" />
          {/* Compass */}
          <circle cx="50" cy="20" r="4" fill="#0d9488" />
          <line x1="50" y1="20" x2="30" y2="65" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="20" x2="70" y2="65" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="42" x2="62" y2="42" stroke="#d97706" strokeWidth="2" />
          <circle cx="30" cy="65" r="2" fill="#ef4444" />
          <circle cx="70" cy="65" r="2" fill="#3b82f6" />
        </svg>
      );

    // 13. Sketch with colored analysis
    case 'sketch_analysis':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Freehand styled triangle */}
          <polygon points="18,75 80,75 48,22" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="1 1" />
          {/* Given data in bright colors */}
          <line x1="18" y1="75" x2="80" y2="75" stroke="#0d9488" strokeWidth="3" />
          <line x1="18" y1="75" x2="48" y2="22" stroke="#f43f5e" strokeWidth="3" />
          <path d="M 32,75 A 15 15 0 0 0 25,64" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="18" cy="75" r="3" fill="#0f766e" />
          <circle cx="80" cy="75" r="3" fill="#0f766e" />
          <circle cx="48" cy="22" r="3" fill="#f43f5e" />
          <text x="45" y="87" fontSize="8" fill="#0d9488" fontWeight="bold">c = 6</text>
          <text x="20" y="44" fontSize="8" fill="#f43f5e" fontWeight="bold">b = 5</text>
          <text x="32" y="70" fontSize="7" fill="#d97706" fontWeight="bold">50°</text>
        </svg>
      );

    // 14. Triangle inequality OK: arcs intersect
    case 'triangle_inequality_ok':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="75" x2="85" y2="75" stroke="#0d9488" strokeWidth="3" />
          {/* Arcs intersect nicely */}
          <path d="M 40,30 A 45 45 0 0 1 65,30" fill="none" stroke="#10b981" strokeWidth="2" />
          <path d="M 48,22 A 48 48 0 0 1 56,42" fill="none" stroke="#10b981" strokeWidth="2" />
          <line x1="15" y1="75" x2="52" y2="30" stroke="#10b981" strokeWidth="2" />
          <line x1="85" y1="75" x2="52" y2="30" stroke="#10b981" strokeWidth="2" />
          <circle cx="52" cy="30" r="3.5" fill="#10b981" />
          <text x="32" y="93" fontSize="8" fill="#10b981" fontWeight="bold">a + b &gt; c ✓</text>
        </svg>
      );

    // 15. Triangle inequality FAIL: arcs do not meet
    case 'triangle_inequality_fail':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="10" y1="75" x2="90" y2="75" stroke="#0d9488" strokeWidth="3" />
          {/* Arcs too short */}
          <path d="M 28,45 A 25 25 0 0 1 35,68" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 65,68 A 25 25 0 0 1 72,45" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <text x="36" y="45" fontSize="12" fill="#ef4444" fontWeight="bold">✗</text>
          <text x="24" y="93" fontSize="8" fill="#ef4444" fontWeight="bold">a + b ≤ c (Nincs metszéspont)</text>
        </svg>
      );

    // 16. Angle sum check
    case 'angle_sum_check':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="15,75 85,75 50,25" fill="rgba(13, 148, 136, 0.1)" stroke="#0d9488" strokeWidth="2" />
          <path d="M 28,75 A 15 15 0 0 0 23,63" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 72,75 A 15 15 0 0 1 77,63" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 45,35 A 12 12 0 0 0 55,35" fill="none" stroke="#ec4899" strokeWidth="2" />
          <text x="18" y="92" fontSize="7" fill="#0f766e" fontWeight="bold">α + β + γ = 180°</text>
        </svg>
      );

    // 17. Symmetric completion
    case 'symmetric_completion':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          {/* Axis of symmetry */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
          {/* Left half (original given) */}
          <polygon points="50,20 20,45 50,80" fill="rgba(13, 148, 136, 0.25)" stroke="#0d9488" strokeWidth="2.5" />
          {/* Right half (reflected constructed) */}
          <polygon points="50,20 80,45 50,80" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
          {/* Perpendicular connector */}
          <line x1="20" y1="45" x2="80" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="80" cy="45" r="3" fill="#f43f5e" />
          <circle cx="20" cy="45" r="3" fill="#0d9488" />
        </svg>
      );

    // 18. Two solutions (SsA case)
    case 'two_solutions':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="10" y1="78" x2="90" y2="78" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="15" y1="78" x2="45" y2="25" stroke="#0d9488" strokeWidth="2.5" />
          {/* Circle cuts line in 2 points */}
          <path d="M 52,85 A 38 38 0 0 1 85,60" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="45" y1="25" x2="60" y2="78" stroke="#0f766e" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="45" y1="25" x2="80" y2="78" stroke="#0f766e" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="60" cy="78" r="3" fill="#f43f5e" />
          <circle cx="80" cy="78" r="3" fill="#3b82f6" />
          <text x="56" y="92" fontSize="7" fill="#f43f5e">B₁</text>
          <text x="76" y="92" fontSize="7" fill="#3b82f6">B₂</text>
        </svg>
      );

    // 19. Perpendicular bisector construction
    case 'perpendicular_bisector':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="50" x2="85" y2="50" stroke="#0d9488" strokeWidth="3" />
          {/* Intersecting arcs above and below */}
          <path d="M 40,25 A 40 40 0 0 1 60,25" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M 40,75 A 40 40 0 0 1 60,75" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="#f43f5e" strokeWidth="2" />
          <circle cx="50" cy="50" r="2.5" fill="#0d9488" />
        </svg>
      );

    // 20. Angle bisector construction
    case 'angle_bisector':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="75" x2="85" y2="75" stroke="#0d9488" strokeWidth="2.5" />
          <line x1="15" y1="75" x2="70" y2="20" stroke="#0d9488" strokeWidth="2.5" />
          {/* Angle bisector ray */}
          <line x1="15" y1="75" x2="80" y2="45" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M 40,75 A 25 25 0 0 0 35,58" fill="none" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="58" cy="55" r="2.5" fill="#f43f5e" />
        </svg>
      );

    default:
      return null;
  }
};

// ============================================================================
// 2. INTERACTIVE STEP-BY-STEP CONSTRUCTION WORKBENCH
// ============================================================================
interface ConstructionScenario {
  id: string;
  title: string;
  badge: string;
  givenData: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    compassAction?: string;
    rulerAction?: string;
    svgContent: React.ReactNode;
  }[];
}

export const InteractiveConstructionWorkbench: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('sss');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const scenarios: ConstructionScenario[] = [
    // SCENARIO 1: HÁROMSZÖG 3 OLDALBÓL (ooo)
    {
      id: 'sss',
      title: 'Háromszög szerkesztése 3 oldalból (ooo)',
      badge: 'Alapszerkesztés • SSS',
      givenData: 'c = 8 cm, a = 6 cm, b = 5 cm',
      steps: [
        {
          stepNumber: 1,
          title: '1. Lépés: Vázlatkészítés és adatok kijelölése',
          description: 'Szabadkézi vázlatot készítünk a háromszögről, és színessel bejelöljük az adott oldalakat: c = 8 cm, a = 6 cm, b = 5 cm. Ellenőrizzük a háromszög-egyenlőtlenséget: 5 + 6 = 11 > 8 ✓, 5 + 8 = 13 > 6 ✓, 6 + 8 = 14 > 5 ✓. A feladat szerkeszthető!',
          rulerAction: 'Vázlatrajz hegyes ceruzával',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="60,170 340,170 200,60" fill="rgba(13, 148, 136, 0.08)" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="60" y1="170" x2="340" y2="170" stroke="#0d9488" strokeWidth="3.5" />
              <line x1="60" y1="170" x2="200" y2="60" stroke="#6366f1" strokeWidth="3.5" />
              <line x1="340" y1="170" x2="200" y2="60" stroke="#f43f5e" strokeWidth="3.5" />
              <circle cx="60" cy="170" r="5" fill="#0d9488" />
              <circle cx="340" cy="170" r="5" fill="#0d9488" />
              <circle cx="200" cy="60" r="5" fill="#f43f5e" />
              <text x="45" y="190" fontSize="14" fontWeight="bold" fill="#0d9488">A</text>
              <text x="345" y="190" fontSize="14" fontWeight="bold" fill="#0d9488">B</text>
              <text x="195" y="45" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="185" y="195" fontSize="13" fontWeight="bold" fill="#0d9488">c = 8 cm (alap)</text>
              <text x="100" y="105" fontSize="13" fontWeight="bold" fill="#6366f1">b = 5 cm</text>
              <text x="280" y="105" fontSize="13" fontWeight="bold" fill="#f43f5e">a = 6 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 2,
          title: '2. Lépés: Az AB alap felmérése egyenesre',
          description: 'Egy egyenesre felmérjük az AB = c = 8 cm hosszúságú szakaszt a vonalzó vagy körző segítségével. Ezzel megkaptuk a háromszög első két csúcsát: A és B pontokat.',
          rulerAction: 'AB szakasz (8 cm) felmérése az alapvonalra',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="20" y1="160" x2="380" y2="160" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="70" y1="160" x2="330" y2="160" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" />
              <circle cx="70" cy="160" r="6" fill="#0d9488" />
              <circle cx="330" cy="160" r="6" fill="#0d9488" />
              <text x="60" y="190" fontSize="15" fontWeight="bold" fill="#0d9488">A</text>
              <text x="330" y="190" fontSize="15" fontWeight="bold" fill="#0d9488">B</text>
              <text x="175" y="185" fontSize="13" fontWeight="bold" fill="#0d9488">c = 8 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 3,
          title: '3. Lépés: Körívezés A és B pontokból',
          description: 'A pontból körzőnyílásba vesszük a b = 5 cm-t, és körívet rajzolunk k(A, 5 cm). Ezután B pontból körzőnyílásba vesszük az a = 6 cm-t, és körívet rajzolunk k(B, 6 cm). A két körív metszéspontja adja a C csúcsot.',
          compassAction: 'k₁(A; r = 5 cm) és k₂(B; r = 6 cm) körívek rajzolása',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="70" y1="160" x2="330" y2="160" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
              {/* Arc from A (r=5cm -> 130px) */}
              <path d="M 140,50 A 140 140 0 0 1 220,70" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="4 2" />
              {/* Arc from B (r=6cm -> 160px) */}
              <path d="M 160,80 A 165 165 0 0 1 190,40" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
              {/* Intersection C */}
              <circle cx="178" cy="62" r="6" fill="#f43f5e" />
              <circle cx="70" cy="160" r="5" fill="#0d9488" />
              <circle cx="330" cy="160" r="5" fill="#0d9488" />
              <text x="60" y="185" fontSize="14" fontWeight="bold" fill="#0d9488">A</text>
              <text x="330" y="185" fontSize="14" fontWeight="bold" fill="#0d9488">B</text>
              <text x="175" y="45" fontSize="15" fontWeight="bold" fill="#f43f5e">C (Metszéspont)</text>
              <text x="95" y="100" fontSize="11" fill="#6366f1">k₁(A, 5 cm)</text>
              <text x="240" y="70" fontSize="11" fill="#f43f5e">k₂(B, 6 cm)</text>
            </svg>
          )
        },
        {
          stepNumber: 4,
          title: '4. Lépés: Az ABC háromszög oldalainak kihúzása és diszkusszió',
          description: 'Összekötjük az A és C, valamint a B és C pontokat. Az ABC háromszög pontosan megfelel a megadott adatoknak. Mivel a két körív a félsíkban 1 pontban metszi egymást, a feladatnak a félsíkban pontosan 1 egyértelmű megoldása van.',
          rulerAction: 'AC és BC oldalak kihúzása hegyes ceruzával',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="70,160 330,160 178,62" fill="rgba(13, 148, 136, 0.15)" stroke="#0d9488" strokeWidth="3.5" />
              {/* Arcs visible as faint construction lines */}
              <path d="M 140,50 A 140 140 0 0 1 220,70" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path d="M 160,80 A 165 165 0 0 1 190,40" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="70" cy="160" r="5" fill="#0d9488" />
              <circle cx="330" cy="160" r="5" fill="#0d9488" />
              <circle cx="178" cy="62" r="5" fill="#f43f5e" />
              <text x="58" y="185" fontSize="14" fontWeight="bold" fill="#0d9488">A</text>
              <text x="330" y="185" fontSize="14" fontWeight="bold" fill="#0d9488">B</text>
              <text x="175" y="45" fontSize="15" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="190" y="180" fontSize="12" fontWeight="bold" fill="#0d9488">c = 8 cm</text>
              <text x="100" y="105" fontSize="12" fontWeight="bold" fill="#6366f1">b = 5 cm</text>
              <text x="260" y="105" fontSize="12" fontWeight="bold" fill="#f43f5e">a = 6 cm</text>
              <rect x="250" y="10" width="140" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="260" y="30" fontSize="11" fontWeight="bold" fill="#047857">✓ 1 egyértelmű megoldás</text>
            </svg>
          )
        }
      ]
    },

    // SCENARIO 2: EGYENLŐ SZÁRÚ HÁROMSZÖG ALAP ÉS MAGASSÁGBÓL
    {
      id: 'isosceles',
      title: 'Egyenlő szárú háromszög szerkesztése alapból és magasságból',
      badge: 'Szimmetriára épülő szerkesztés',
      givenData: 'Alap: c = 6 cm, magasság: m_c = 4.5 cm',
      steps: [
        {
          stepNumber: 1,
          title: '1. Lépés: Vázlat és szimmetriatulajdonság felismerése',
          description: 'Az egyenlő szárú háromszög tengelyesen szimmetrikus! A szimmetriatengelye az alap (c) felezőmerőlegese, amelyen a harmadik csúcs (C) pontosan m_c távolságra fekszik az F felezőponttól.',
          rulerAction: 'Vázlatrajz és szimmetriatengely (t) bejelölése',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="100,170 300,170 200,50" fill="rgba(13, 148, 136, 0.1)" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="100" y1="170" x2="300" y2="170" stroke="#0d9488" strokeWidth="3" />
              <line x1="200" y1="20" x2="200" y2="190" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="200" cy="170" r="4" fill="#0f766e" />
              <circle cx="200" cy="50" r="5" fill="#f43f5e" />
              <text x="85" y="185" fontSize="13" fontWeight="bold" fill="#0d9488">A</text>
              <text x="305" y="185" fontSize="13" fontWeight="bold" fill="#0d9488">B</text>
              <text x="195" y="190" fontSize="11" fill="#0f766e">F_c</text>
              <text x="195" y="38" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="190" y="110" fontSize="12" fontWeight="bold" fill="#f43f5e">m_c = 4.5 cm</text>
              <text x="180" y="185" fontSize="12" fontWeight="bold" fill="#0d9488">c = 6 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 2,
          title: '2. Lépés: AB alap felmérése és F felezőmerőlegesének szerkesztése',
          description: 'Felmérjük az AB = 6 cm-es szakaszt. Körzővel A és B pontokból azonos (c felénél nagyobb) körzőnyílással körívezünk, és megrajzoljuk a szakaszfelező merőlegest.',
          compassAction: 'k(A, r) és k(B, r) körívek alul-felül, felezőmerőleges meghúzása',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="90" y1="160" x2="310" y2="160" stroke="#0d9488" strokeWidth="3.5" />
              {/* Compass arcs for bisector */}
              <path d="M 180,40 A 130 130 0 0 1 220,40" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 180,190 A 130 130 0 0 1 220,190" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="200" y1="20" x2="200" y2="205" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
              {/* Right angle */}
              <path d="M 200,148 L 212,148 L 212,160" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="90" cy="160" r="5" fill="#0d9488" />
              <circle cx="310" cy="160" r="5" fill="#0d9488" />
              <circle cx="200" cy="160" r="4" fill="#0f766e" />
              <text x="75" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">A</text>
              <text x="315" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">B</text>
              <text x="195" y="175" fontSize="11" fill="#0f766e">F</text>
              <text x="208" y="35" fontSize="12" fill="#f43f5e">t (felezőmerőleges)</text>
            </svg>
          )
        },
        {
          stepNumber: 3,
          title: '3. Lépés: Az m_c magasság felmérése és a C csúcs kijelölése',
          description: 'A felezőpontból (F) a szimmetriatengelyre (t) felmérjük a magasságot: m_c = 4.5 cm. A metszéspont kijelöli a C csúcsot.',
          compassAction: 'k(F; r = 4.5 cm) körív metszéspontja a felezőmerőlegessel',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="90" y1="160" x2="310" y2="160" stroke="#0d9488" strokeWidth="3" />
              <line x1="200" y1="20" x2="200" y2="190" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" />
              {/* Arc on bisector */}
              <path d="M 185,55 A 25 25 0 0 1 215,55" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="200" cy="55" r="6" fill="#f43f5e" />
              <circle cx="90" cy="160" r="5" fill="#0d9488" />
              <circle cx="310" cy="160" r="5" fill="#0d9488" />
              <circle cx="200" cy="160" r="4" fill="#0f766e" />
              <text x="75" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">A</text>
              <text x="315" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">B</text>
              <text x="195" y="42" fontSize="15" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="208" y="110" fontSize="12" fontWeight="bold" fill="#f43f5e">m_c = 4.5 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 4,
          title: '4. Lépés: A szárak (AC és BC) kihúzása',
          description: 'Összekötjük A-t C-vel és B-t C-vel. Mivel C a felezőmerőlegesen van, a tengelyes szimmetria miatt AC = BC garantáltan teljesül (a szárak egyenlőek).',
          rulerAction: 'AC és BC szárak megrajzolása',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="90,160 310,160 200,55" fill="rgba(13, 148, 136, 0.18)" stroke="#0d9488" strokeWidth="3.5" />
              <line x1="200" y1="20" x2="200" y2="190" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="90" cy="160" r="5" fill="#0d9488" />
              <circle cx="310" cy="160" r="5" fill="#0d9488" />
              <circle cx="200" cy="55" r="5" fill="#f43f5e" />
              <text x="75" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">A</text>
              <text x="315" y="175" fontSize="13" fontWeight="bold" fill="#0d9488">B</text>
              <text x="195" y="42" fontSize="15" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="125" y="105" fontSize="12" fontWeight="bold" fill="#0f766e">b = a</text>
              <text x="260" y="105" fontSize="12" fontWeight="bold" fill="#0f766e">a = b</text>
              <rect x="250" y="10" width="140" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="260" y="30" fontSize="11" fontWeight="bold" fill="#047857">✓ Kész alakzat</text>
            </svg>
          )
        }
      ]
    },

    // SCENARIO 3: ROMBUSZ SZERKESZTÉSE KÉT ÁTLÓBÓL
    {
      id: 'rhombus',
      title: 'Rombusz szerkesztése két átlójából (e, f)',
      badge: 'Négyszög szerkesztés • Átlók',
      givenData: 'e = 8 cm, f = 5 cm',
      steps: [
        {
          stepNumber: 1,
          title: '1. Lépés: Elemzés a rombusz szimmetriája alapján',
          description: 'A rombusz átlói (e és f) merőlegesen felezik egymást és szimmetriatengelyek! Így ha felvesszük az AC = e = 8 cm átlót, annak felezőpontján (O) átmenő merőlegesre felmérjük az f/2 = 2.5 cm-t mindkét irányba, megkapjuk a B és D csúcsokat.',
          rulerAction: 'Vázlat és felezési összefüggések felírása: e/2 = 4 cm, f/2 = 2.5 cm',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="200,30 330,110 200,190 70,110" fill="rgba(13, 148, 136, 0.08)" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="70" y1="110" x2="330" y2="110" stroke="#f43f5e" strokeWidth="3" />
              <line x1="200" y1="30" x2="200" y2="190" stroke="#6366f1" strokeWidth="3" />
              <circle cx="200" cy="110" r="4" fill="#0d9488" />
              <text x="50" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">A</text>
              <text x="338" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="195" y="22" fontSize="14" fontWeight="bold" fill="#6366f1">B</text>
              <text x="195" y="208" fontSize="14" fontWeight="bold" fill="#6366f1">D</text>
              <text x="208" y="115" fontSize="12" fill="#0d9488">O</text>
              <text x="120" y="100" fontSize="12" fill="#f43f5e">e/2 = 4 cm</text>
              <text x="208" y="65" fontSize="12" fill="#6366f1">f/2 = 2.5 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 2,
          title: '2. Lépés: AC = e átló felmérése és O felezőpont szerkesztése',
          description: 'Felmérjük az AC = 8 cm hosszúságú szakaszt, majd körzővel megszerkesztjük az AC szakaszfelező merőlegesét. A metszéspont az O középpont.',
          compassAction: 'AC felezőmerőlegesének megrajzolása',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="60" y1="110" x2="340" y2="110" stroke="#f43f5e" strokeWidth="3.5" />
              <line x1="200" y1="15" x2="200" y2="205" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="60" cy="110" r="5" fill="#f43f5e" />
              <circle cx="340" cy="110" r="5" fill="#f43f5e" />
              <circle cx="200" cy="110" r="5" fill="#0d9488" />
              <text x="45" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">A</text>
              <text x="348" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="208" y="125" fontSize="13" fontWeight="bold" fill="#0d9488">O</text>
              <text x="170" y="95" fontSize="12" fill="#f43f5e">e = 8 cm</text>
            </svg>
          )
        },
        {
          stepNumber: 3,
          title: '3. Lépés: B és D csúcsok felmérése a merőlegesre',
          description: 'Körzőnyílásba vesszük az f átló felét (f/2 = 2.5 cm), és az O pontból felfelé és lefelé is körívet húzunk k(O; 2.5 cm). A kapott metszéspontok a B és D csúcsok.',
          compassAction: 'k(O; r = 2.5 cm) körív fel és le a merőleges egyenesen',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <line x1="60" y1="110" x2="340" y2="110" stroke="#f43f5e" strokeWidth="3" />
              <line x1="200" y1="15" x2="200" y2="205" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="4 2" />
              {/* Arcs at B and D */}
              <path d="M 185,45 A 20 20 0 0 1 215,45" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <path d="M 185,175 A 20 20 0 0 1 215,175" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="60" cy="110" r="5" fill="#f43f5e" />
              <circle cx="340" cy="110" r="5" fill="#f43f5e" />
              <circle cx="200" cy="45" r="5" fill="#6366f1" />
              <circle cx="200" cy="175" r="5" fill="#6366f1" />
              <circle cx="200" cy="110" r="4" fill="#0d9488" />
              <text x="45" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">A</text>
              <text x="348" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="195" y="32" fontSize="14" fontWeight="bold" fill="#6366f1">B</text>
              <text x="195" y="198" fontSize="14" fontWeight="bold" fill="#6366f1">D</text>
            </svg>
          )
        },
        {
          stepNumber: 4,
          title: '4. Lépés: A rombusz oldalainak (AB, BC, CD, DA) kihúzása',
          description: 'Összekötjük a 4 csúcsot (A, B, C, D) sorrendben. A kapott négyszög mind a 4 oldala egyenlő hosszúságú (a = b = c = d), átlói merőlegesen felezik egymást, tehát a szerkesztés sikeres.',
          rulerAction: 'AB, BC, CD, DA oldalak kihúzása',
          svgContent: (
            <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
              <polygon points="60,110 200,45 340,110 200,175" fill="rgba(13, 148, 136, 0.18)" stroke="#0d9488" strokeWidth="3.5" />
              <line x1="60" y1="110" x2="340" y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="200" y1="45" x2="200" y2="175" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="60" cy="110" r="5" fill="#f43f5e" />
              <circle cx="340" cy="110" r="5" fill="#f43f5e" />
              <circle cx="200" cy="45" r="5" fill="#6366f1" />
              <circle cx="200" cy="175" r="5" fill="#6366f1" />
              <text x="45" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">A</text>
              <text x="348" y="115" fontSize="14" fontWeight="bold" fill="#f43f5e">C</text>
              <text x="195" y="32" fontSize="14" fontWeight="bold" fill="#6366f1">B</text>
              <text x="195" y="198" fontSize="14" fontWeight="bold" fill="#6366f1">D</text>
              <text x="110" y="65" fontSize="12" fontWeight="bold" fill="#0d9488">a</text>
              <text x="270" y="65" fontSize="12" fontWeight="bold" fill="#0d9488">a</text>
              <text x="270" y="160" fontSize="12" fontWeight="bold" fill="#0d9488">a</text>
              <text x="110" y="160" fontSize="12" fontWeight="bold" fill="#0d9488">a</text>
              <rect x="250" y="10" width="140" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
              <text x="260" y="30" fontSize="11" fontWeight="bold" fill="#047857">✓ 4 egyenlő oldal</text>
            </svg>
          )
        }
      ]
    }
  ];

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];
  const currentStep = currentScenario.steps[currentStepIndex] || currentScenario.steps[0];

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    setCurrentStepIndex(0);
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentScenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <Card className="border border-teal-200 dark:border-teal-900/60 bg-white/90 dark:bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/15 text-teal-100">
              <Compass className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Interaktív Geometriai Szerkesztő Műhely
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mt-1 text-white flex items-center gap-2">
            {currentScenario.title}
          </h3>
          <div className="text-xs text-teal-100 mt-0.5 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
              {currentScenario.givenData}
            </span>
            <span>• {currentScenario.badge}</span>
          </div>
        </div>

        {/* Construction scenario tabs */}
        <div className="flex flex-wrap gap-1.5">
          {scenarios.map((sc) => (
            <Button
              key={sc.id}
              size="sm"
              variant={activeScenarioId === sc.id ? 'secondary' : 'ghost'}
              onClick={() => handleScenarioChange(sc.id)}
              className={cn(
                "text-xs h-8 px-3 transition-all",
                activeScenarioId === sc.id
                  ? "bg-white text-teal-900 font-bold shadow"
                  : "text-teal-100 hover:bg-white/10 hover:text-white"
              )}
            >
              {sc.id === 'sss' && 'Háromszög (ooo)'}
              {sc.id === 'isosceles' && 'Egyenlő szárú △'}
              {sc.id === 'rhombus' && 'Rombusz átlókból'}
            </Button>
          ))}
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* Step progress bar and buttons */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            {currentScenario.steps.map((st, idx) => (
              <button
                key={st.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={cn(
                  "w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center",
                  idx === currentStepIndex
                    ? "bg-teal-600 text-white shadow-md scale-110 ring-2 ring-teal-300 dark:ring-teal-700"
                    : idx < currentStepIndex
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                {st.stepNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="h-8 px-3 text-xs gap-1 border-slate-300 dark:border-slate-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Előző lépés
            </Button>
            <Button
              size="sm"
              onClick={handleNextStep}
              disabled={currentStepIndex === currentScenario.steps.length - 1}
              className="h-8 px-3 text-xs gap-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Következő lépés <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Step SVG Drawing Display */}
        <div className="bg-gradient-to-b from-slate-50 to-teal-50/40 dark:from-slate-950 dark:to-slate-900 border border-teal-100 dark:border-slate-800 rounded-xl p-4 flex items-center justify-center min-h-[220px] shadow-inner relative">
          <div className="w-full flex items-center justify-center">
            {currentStep.svgContent}
          </div>
        </div>

        {/* Step Description & Toolkit actions */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              {currentStep.title}
            </h4>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {currentStepIndex + 1} / {currentScenario.steps.length} lépés
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentStep.description}
          </p>

          {/* Tools indicators */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
            {currentStep.rulerAction && (
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                <Ruler className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium">Vonalzó:</span> {currentStep.rulerAction}
              </div>
            )}
            {currentStep.compassAction && (
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                <Compass className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-medium">Körző:</span> {currentStep.compassAction}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
