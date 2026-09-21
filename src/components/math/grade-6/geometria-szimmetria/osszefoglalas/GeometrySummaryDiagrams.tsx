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
  Layers,
  Sparkles,
  Target,
  ShieldCheck,
  Split,
  Maximize2,
  Minimize2,
  Trophy,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// 1. MINI FIGURES FOR SUMMARY QUIZ, MATCHER, SORTER & THEORY
// ============================================================================
export type GeometrySummaryMiniFigureType =
  | 'planar_elements'
  | 'congruence_shapes'
  | 'circle_parts'
  | 'tangent_perpendicular'
  | 'perpendicular_bisector'
  | 'angle_bisector'
  | 'basic_constructions'
  | 'axial_reflection_point'
  | 'axial_reflection_polygon'
  | 'five_properties'
  | 'symmetry_axis_isosceles'
  | 'symmetry_axis_equilateral'
  | 'symmetry_axis_deltoid'
  | 'symmetry_axis_isosceles_trapezoid'
  | 'symmetry_axis_rhombus'
  | 'symmetry_axis_rectangle'
  | 'symmetry_axis_square'
  | 'symmetry_axis_circle'
  | 'regular_polygon_axes'
  | 'construction_4steps'
  | 'triangle_inequality_rule'
  | 'triangle_sss'
  | 'triangle_sas'
  | 'triangle_asa'
  | 'two_solutions'
  | 'summary_trophy';

interface MiniFigureProps {
  type: GeometrySummaryMiniFigureType;
  size?: number;
  className?: string;
}

export const GeometrySummaryMiniFigure: React.FC<MiniFigureProps> = ({
  type,
  size = 64,
  className
}) => {
  const s = size;

  switch (type) {
    // 1. Síkbeli alapelemek
    case 'planar_elements':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="10" y1="50" x2="90" y2="50" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="50" r="4" fill="#ef4444" />
          <circle cx="75" cy="50" r="4" fill="#ef4444" />
          <text x="21" y="40" fontSize="10" fill="#ef4444" fontWeight="bold">A</text>
          <text x="71" y="40" fontSize="10" fill="#ef4444" fontWeight="bold">B</text>
          <text x="82" y="65" fontSize="9" fill="#0284c7" fontStyle="italic">e</text>
        </svg>
      );

    // 2. Egybevágó alakzatok
    case 'congruence_shapes':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="15,75 40,75 25,30" fill="rgba(59, 130, 246, 0.25)" stroke="#2563eb" strokeWidth="2.5" />
          <polygon points="60,30 85,30 75,75" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="2.5" />
          <text x="45" y="55" fontSize="13" fill="#6366f1" fontWeight="bold">≅</text>
        </svg>
      );

    // 3. A kör részei
    case 'circle_parts':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="50" cy="50" r="38" fill="rgba(14, 165, 233, 0.1)" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="3.5" fill="#e11d48" />
          <line x1="50" y1="50" x2="84" y2="30" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="65" x2="84" y2="35" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />
          <text x="44" y="62" fontSize="9" fill="#e11d48" fontWeight="bold">O</text>
          <text x="66" y="38" fontSize="9" fill="#e11d48" fontWeight="bold">r</text>
          <text x="85" y="48" fontSize="8" fill="#8b5cf6">húr</text>
        </svg>
      );

    // 4. Érintő merőlegessége az érintési pontba húzott sugárra
    case 'tangent_perpendicular':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#0284c7" strokeWidth="2" />
          <circle cx="50" cy="50" r="3" fill="#0284c7" />
          <line x1="50" y1="50" x2="82" y2="50" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="10" x2="82" y2="90" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <rect x="74" y="42" width="8" height="8" fill="none" stroke="#059669" strokeWidth="1.5" />
          <circle cx="78" cy="46" r="1.5" fill="#059669" />
          <circle cx="82" cy="50" r="3.5" fill="#e11d48" />
          <text x="86" y="25" fontSize="9" fill="#059669" fontWeight="bold">e</text>
          <text x="86" y="55" fontSize="9" fill="#e11d48" fontWeight="bold">É</text>
          <text x="60" y="45" fontSize="8" fill="#e11d48">r</text>
        </svg>
      );

    // 5. Szakaszfelező merőleges
    case 'perpendicular_bisector':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="65" x2="85" y2="65" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50,30 L 15,65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 50,30 L 85,65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="30" r="3.5" fill="#f59e0b" />
          <circle cx="15" cy="65" r="3" fill="#334155" />
          <circle cx="85" cy="65" r="3" fill="#334155" />
          <circle cx="50" cy="65" r="2.5" fill="#0d9488" />
          <rect x="50" y="57" width="8" height="8" fill="none" stroke="#0d9488" strokeWidth="1.5" />
          <text x="10" y="80" fontSize="9" fill="#334155" fontWeight="bold">A</text>
          <text x="82" y="80" fontSize="9" fill="#334155" fontWeight="bold">B</text>
          <text x="45" y="24" fontSize="9" fill="#f59e0b" fontWeight="bold">P</text>
          <text x="54" y="20" fontSize="9" fill="#0d9488" fontStyle="italic">f</text>
        </svg>
      );

    // 6. Szögfelező
    case 'angle_bisector':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="80" x2="90" y2="80" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="80" x2="70" y2="20" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="80" x2="85" y2="45" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 38,80 A 24 24 0 0 0 32,58" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="42" y="73" fontSize="8" fill="#f59e0b">α/2</text>
          <text x="36" y="55" fontSize="8" fill="#f59e0b">α/2</text>
          <text x="88" y="42" fontSize="9" fill="#e11d48" fontStyle="italic">f</text>
        </svg>
      );

    // 7. Alapszerkesztések
    case 'basic_constructions':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="10" y1="75" x2="90" y2="75" stroke="#475569" strokeWidth="2.5" />
          <path d="M 35,40 A 35 35 0 0 1 65,40" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 35,60 A 35 35 0 0 0 65,60" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="50" y1="20" x2="50" y2="85" stroke="#e11d48" strokeWidth="2.5" />
          <circle cx="50" cy="40" r="3" fill="#e11d48" />
          <circle cx="50" cy="60" r="3" fill="#e11d48" />
        </svg>
      );

    // 8. Tengelyes tükrözés pontra
    case 'axial_reflection_point':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#4f46e5" strokeWidth="3" strokeDasharray="6 3" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="2 2" />
          <circle cx="20" cy="50" r="4" fill="#0284c7" />
          <circle cx="80" cy="50" r="4" fill="#e11d48" />
          <rect x="42" y="42" width="8" height="8" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
          <text x="14" y="40" fontSize="10" fill="#0284c7" fontWeight="bold">P</text>
          <text x="76" y="40" fontSize="10" fill="#e11d48" fontWeight="bold">P'</text>
          <text x="54" y="22" fontSize="10" fill="#4f46e5" fontWeight="bold">t</text>
        </svg>
      );

    // 9. Sokszög tengelyes tükrözése
    case 'axial_reflection_polygon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="5 3" />
          {/* Eredeti háromszög ABC (bal oldalon) */}
          <polygon points="15,70 42,80 25,28" fill="rgba(14, 165, 233, 0.3)" stroke="#0284c7" strokeWidth="2" />
          {/* Tükörkép A'B'C' (jobb oldalon) */}
          <polygon points="85,70 58,80 75,28" fill="rgba(244, 63, 94, 0.3)" stroke="#e11d48" strokeWidth="2" />
          <text x="12" y="82" fontSize="8" fill="#0284c7" fontWeight="bold">A</text>
          <text x="82" y="82" fontSize="8" fill="#e11d48" fontWeight="bold">A'</text>
          <text x="53" y="18" fontSize="9" fill="#6366f1" fontWeight="bold">t</text>
        </svg>
      );

    // 10. 5 alaptulajdonság
    case 'five_properties':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <text x="50" y="42" fontSize="18" fill="#f59e0b" textAnchor="middle" fontWeight="bold">5</text>
          <text x="50" y="58" fontSize="8" fill="#d97706" textAnchor="middle" fontWeight="bold">TULAJDONSÁG</text>
          <circle cx="50" cy="10" r="4" fill="#10b981" />
          <circle cx="90" cy="50" r="4" fill="#3b82f6" />
          <circle cx="50" cy="90" r="4" fill="#8b5cf6" />
          <circle cx="10" cy="50" r="4" fill="#ef4444" />
        </svg>
      );

    // 11. Egyenlő szárú háromszög szimmetriatengelye
    case 'symmetry_axis_isosceles':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="15,80 85,80 50,20" fill="rgba(16, 185, 129, 0.2)" stroke="#059669" strokeWidth="2.5" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <text x="50" y="96" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">1 tengely</text>
        </svg>
      );

    // 12. Szabályos háromszög (3 tengely)
    case 'symmetry_axis_equilateral':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="20,80 80,80 50,28" fill="rgba(245, 158, 11, 0.2)" stroke="#d97706" strokeWidth="2.5" />
          <line x1="50" y1="15" x2="50" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="12" y1="85" x2="70" y2="48" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="88" y1="85" x2="30" y2="48" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="50" y="97" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">3 tengely</text>
        </svg>
      );

    // 13. Deltoid (1 tengely)
    case 'symmetry_axis_deltoid':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="50,15 82,45 50,85 18,45" fill="rgba(139, 92, 246, 0.2)" stroke="#7c3aed" strokeWidth="2.5" />
          <line x1="50" y1="8" x2="50" y2="92" stroke="#ef4444" strokeWidth="2.2" strokeDasharray="4 2" />
          <line x1="18" y1="45" x2="82" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="50" y="98" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">1 tengely</text>
        </svg>
      );

    // 14. Húrtrapéz (1 tengely)
    case 'symmetry_axis_isosceles_trapezoid':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="15,75 85,75 70,30 30,30" fill="rgba(14, 165, 233, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="50" y1="18" x2="50" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <text x="50" y="95" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">1 tengely</text>
        </svg>
      );

    // 15. Rombusz (2 tengely)
    case 'symmetry_axis_rhombus':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="50,18 85,50 50,82 15,50" fill="rgba(236, 72, 153, 0.2)" stroke="#db2777" strokeWidth="2.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="50" y="98" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">2 tengely (átlók)</text>
        </svg>
      );

    // 16. Téglalap (2 tengely)
    case 'symmetry_axis_rectangle':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <rect x="18" y="30" width="64" height="42" fill="rgba(59, 130, 246, 0.2)" stroke="#2563eb" strokeWidth="2.5" rx="2" />
          <line x1="50" y1="18" x2="50" y2="82" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="10" y1="51" x2="90" y2="51" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="50" y="94" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">2 tengely (oldalfelezők)</text>
        </svg>
      );

    // 17. Négyzet (4 tengely)
    case 'symmetry_axis_square':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <rect x="22" y="22" width="56" height="56" fill="rgba(16, 185, 129, 0.2)" stroke="#059669" strokeWidth="2.5" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="16" y1="16" x2="84" y2="84" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="84" y1="16" x2="16" y2="84" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="50" y="97" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">4 tengely</text>
        </svg>
      );

    // 18. Kör szimmetriatengelyei (végtelen sok)
    case 'symmetry_axis_circle':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="50" cy="50" r="36" fill="rgba(245, 158, 11, 0.15)" stroke="#d97706" strokeWidth="2.5" />
          <line x1="50" y1="8" x2="50" y2="92" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="2 2" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="2 2" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="2 2" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
          <text x="50" y="98" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">∞ végtelen sok</text>
        </svg>
      );

    // 19. Szabályos sokszög (pl. szabályos hatszög, 6 tengely)
    case 'regular_polygon_axes':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="50,18 80,34 80,66 50,82 20,66 20,34" fill="rgba(99, 102, 241, 0.2)" stroke="#4f46e5" strokeWidth="2.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="14" y1="30" x2="86" y2="70" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="14" y1="70" x2="86" y2="30" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="50" y="98" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">n-oldalú: n tengely</text>
        </svg>
      );

    // 20. Szerkesztés 4 fázisa
    case 'construction_4steps':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="28" cy="30" r="16" fill="#0284c7" />
          <circle cx="72" cy="30" r="16" fill="#0d9488" />
          <circle cx="28" cy="70" r="16" fill="#e11d48" />
          <circle cx="72" cy="70" r="16" fill="#f59e0b" />
          <text x="28" y="34" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">1</text>
          <text x="72" y="34" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">2</text>
          <text x="28" y="74" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">3</text>
          <text x="72" y="74" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">4</text>
        </svg>
      );

    // 21. Háromszög-egyenlőtlenség szabály (a + b > c)
    case 'triangle_inequality_rule':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <polygon points="15,75 85,75 48,32" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2.5" />
          <text x="48" y="88" fontSize="9" fill="#059669" textAnchor="middle" fontWeight="bold">c</text>
          <text x="26" y="50" fontSize="9" fill="#059669" fontWeight="bold">b</text>
          <text x="68" y="50" fontSize="9" fill="#059669" fontWeight="bold">a</text>
          <text x="50" y="24" fontSize="8" fill="#15803d" textAnchor="middle" fontWeight="bold">a + b &gt; c</text>
        </svg>
      );

    // 22. Három oldal (ooo / SSS)
    case 'triangle_sss':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="78" x2="85" y2="78" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
          <path d="M 32,38 A 48 48 0 0 1 65,30" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M 40,25 A 46 46 0 0 1 60,48" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="3 3" />
          <line x1="15" y1="78" x2="52" y2="35" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="85" y1="78" x2="52" y2="35" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="52" cy="35" r="3.5" fill="#f43f5e" />
          <text x="50" y="93" fontSize="8" fill="#0d9488" textAnchor="middle" fontWeight="bold">ooo (SSS)</text>
        </svg>
      );

    // 23. Két oldal és közbezárt szög (oszo / SAS)
    case 'triangle_sas':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="18" y1="75" x2="85" y2="75" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="75" x2="55" y2="28" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
          <line x1="55" y1="28" x2="85" y2="75" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 38,75 A 20 20 0 0 0 32,58" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="18" cy="75" r="3.5" fill="#2563eb" />
          <text x="50" y="93" fontSize="8" fill="#2563eb" textAnchor="middle" fontWeight="bold">oszo (SAS)</text>
        </svg>
      );

    // 24. Egy oldal és két szög (szosz / ASA)
    case 'triangle_asa':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="18" y1="75" x2="82" y2="75" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="18" y1="75" x2="60" y2="25" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="82" y1="75" x2="40" y2="25" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 34,75 A 16 16 0 0 0 30,62" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 66,75 A 16 16 0 0 1 70,62" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="36" r="3.5" fill="#e11d48" />
          <text x="50" y="93" fontSize="8" fill="#7c3aed" textAnchor="middle" fontWeight="bold">szosz (ASA)</text>
        </svg>
      );

    // 25. Két megoldás (diszkusszió)
    case 'two_solutions':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <line x1="15" y1="78" x2="85" y2="78" stroke="#475569" strokeWidth="2" />
          <line x1="15" y1="78" x2="45" y2="30" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="45" cy="30" r="3" fill="#0284c7" />
          <path d="M 28,78 A 38 38 0 0 0 78,78" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 3" />
          <circle cx="34" cy="78" r="3.5" fill="#10b981" />
          <circle cx="70" cy="78" r="3.5" fill="#10b981" />
          <line x1="45" y1="30" x2="34" y2="78" stroke="#10b981" strokeWidth="2" />
          <line x1="45" y1="30" x2="70" y2="78" stroke="#10b981" strokeWidth="2" />
          <text x="50" y="94" fontSize="8" fill="#10b981" textAnchor="middle" fontWeight="bold">2 megoldás!</text>
        </svg>
      );

    // 26. Összefoglaló aranyérem / trófea
    case 'summary_trophy':
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={cn("overflow-visible", className)}>
          <circle cx="50" cy="50" r="42" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 32,32 L 68,32 L 60,60 A 14 14 0 0 1 40,60 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <path d="M 32,38 L 22,42 A 8 8 0 0 0 28,54 L 35,50" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 68,38 L 78,42 A 8 8 0 0 1 72,54 L 65,50" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <line x1="50" y1="65" x2="50" y2="76" stroke="#d97706" strokeWidth="3" />
          <rect x="36" y="76" width="28" height="8" rx="2" fill="#d97706" />
          <text x="50" y="48" fontSize="12" fill="#78350f" textAnchor="middle" fontWeight="bold">★</text>
        </svg>
      );
  }
};

// ============================================================================
// 2. INTERACTIVE GEOMETRY SUMMARY WORKBENCH
// ============================================================================
export const InteractiveGeometrySummaryWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shapes' | 'reflection' | 'inequality' | 'circle'>('shapes');

  // Tab 1 state: Shapes and symmetry axes
  const [selectedShape, setSelectedShape] = useState<string>('square');

  // Tab 3 state: Triangle inequality test
  const [sideA, setSideA] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(6);
  const [sideC, setSideC] = useState<number>(8);

  // Check triangle inequality
  const isPossible = sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
  const isDegenerate = sideA + sideB === sideC || sideA + sideC === sideB || sideB + sideC === sideA;

  const shapeData: Record<string, {
    name: string;
    axesCount: string;
    axesDesc: string;
    properties: string[];
    figureType: GeometrySummaryMiniFigureType;
  }> = {
    scalene_triangle: {
      name: 'Általános háromszög',
      axesCount: '0 tengely',
      axesDesc: 'Nincs szimmetriatengelye',
      properties: ['Minden oldala és szöge különböző', 'Belső szögek összege: 180°', 'Magasságpont, súlypont, beírt és körülírt kör középpontja nem esik egybe'],
      figureType: 'planar_elements'
    },
    isosceles_triangle: {
      name: 'Egyenlő szárú háromszög',
      axesCount: '1 tengely',
      axesDesc: 'Az alaphoz tartozó felezőmerőleges',
      properties: ['2 egyenlő szár, alapon fekvő szögek egyenlők', 'A szimmetriatengely az alap felezőmerőlegese, magasságvonala és szögfelezője is', 'A szárak felezőmerőlegesei a tengelyen metszik egymást'],
      figureType: 'symmetry_axis_isosceles'
    },
    equilateral_triangle: {
      name: 'Szabályos háromszög',
      axesCount: '3 tengely',
      axesDesc: 'Mindhárom oldal felezőmerőlegese',
      properties: ['Minden oldala egyenlő (a = b = c)', 'Minden belső szöge 60°', 'A 3 szimmetriatengely a súlypontban (és a körök középpontjában) metszi egymást'],
      figureType: 'symmetry_axis_equilateral'
    },
    deltoid: {
      name: 'Deltoid',
      axesCount: '1 tengely',
      axesDesc: 'A szimmetriaátló egyenese',
      properties: ['2-2 szomszédos oldala egyenlő', 'Átlói merőlegesek egymásra', 'A szimmetriaátló felezi a másik átlót és a szemközti szögeket'],
      figureType: 'symmetry_axis_deltoid'
    },
    isosceles_trapezoid: {
      name: 'Húrtrapéz (egyenlő szárú trapéz)',
      axesCount: '1 tengely',
      axesDesc: 'A párhuzamos alapok közös oldalfelező merőlegese',
      properties: ['Párhuzamos alapok, szárak egyenlő hosszúak', 'Alapokon fekvő szögek egyenlők (α = β, γ = δ)', 'Átlói egyenlő hosszúak (e = f), húrnégyszög (kör írható köré)'],
      figureType: 'symmetry_axis_isosceles_trapezoid'
    },
    rhombus: {
      name: 'Rombusz',
      axesCount: '2 tengely',
      axesDesc: 'A két átló egyenese',
      properties: ['Minden oldala egyenlő hosszúságú', 'Átlói merőlegesen felezik egymást és felezik a belső szögeket', 'Szemközti szögei egyenlők, szomszédosak összege 180°'],
      figureType: 'symmetry_axis_rhombus'
    },
    rectangle: {
      name: 'Téglalap',
      axesCount: '2 tengely',
      axesDesc: 'A szemközti oldalak felezőmerőlegesei',
      properties: ['Minden szöge derékszög (90°)', 'Szemközti oldalai párhuzamosak és egyenlők', 'Átlói egyenlő hosszúak és felezik egymást (nem feltétlenül merőlegesek!)'],
      figureType: 'symmetry_axis_rectangle'
    },
    square: {
      name: 'Négyzet',
      axesCount: '4 tengely',
      axesDesc: '2 oldalfelező merőleges + 2 átló',
      properties: ['Minden oldala egyenlő és minden szöge 90°', 'Egyszerre szabályos négyszög, rombusz és téglalap', 'Átlói egyenlő hosszúak, felezik egymást és merőlegesek'],
      figureType: 'symmetry_axis_square'
    },
    circle: {
      name: 'Kör',
      axesCount: '∞ (végtelen sok) tengely',
      axesDesc: 'Minden a középponton (O) átmenő egyenes',
      properties: ['A sík pontjai, melyek O-tól pontosan r távolságra vannak', 'Minden átmérője szimmetriatengely', 'Bármely érintője merőleges az érintési pontba húzott sugárra'],
      figureType: 'symmetry_axis_circle'
    }
  };

  const currentShape = shapeData[selectedShape] || shapeData.square;

  return (
    <Card className="border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 shadow-xl overflow-hidden rounded-2xl">
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-200" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Geometriai Összefoglaló Műhely</h3>
            <p className="text-xs text-amber-100">Interaktív tudástár és témazáró szemléltető</p>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-1.5 bg-black/20 p-1 rounded-xl backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('shapes')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === 'shapes' ? "bg-white text-amber-900 shadow" : "text-amber-100 hover:text-white"
            )}
          >
            🌟 Alakzatok & Tengelyek
          </button>
          <button
            onClick={() => setActiveTab('reflection')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === 'reflection' ? "bg-white text-amber-900 shadow" : "text-amber-100 hover:text-white"
            )}
          >
            🪞 Tükrözés & Tulajdonságok
          </button>
          <button
            onClick={() => setActiveTab('inequality')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === 'inequality' ? "bg-white text-amber-900 shadow" : "text-amber-100 hover:text-white"
            )}
          >
            📐 Háromszög-egyenlőtlenség
          </button>
          <button
            onClick={() => setActiveTab('circle')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === 'circle' ? "bg-white text-amber-900 shadow" : "text-amber-100 hover:text-white"
            )}
          >
            ⭕ Kör & Mértani Helyek
          </button>
        </div>
      </div>

      <CardContent className="p-6">
        {/* TAB 1: SHAPES & SYMMETRY AXES */}
        {activeTab === 'shapes' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center pb-2 border-b border-slate-200 dark:border-slate-800">
              {Object.entries(shapeData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedShape(key)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-xl font-medium transition-all",
                    selectedShape === key
                      ? "bg-amber-600 text-white shadow-md font-bold scale-105"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700"
                  )}
                >
                  {data.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-amber-50/70 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-amber-900/30">
                <GeometrySummaryMiniFigure type={currentShape.figureType} size={150} />
                <div className="mt-4 px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 font-bold text-sm">
                  {currentShape.axesCount}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-center">
                  {currentShape.axesDesc}
                </p>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    {currentShape.name}
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold rounded-lg border border-amber-300 dark:border-amber-800">
                    {currentShape.axesCount}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {currentShape.properties.map((prop, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{prop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REFLECTION & 5 PROPERTIES */}
        {activeTab === 'reflection' && (
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/50">
              <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-base mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                A tengelyes tükrözés definíciója és 5 megmaradó tulajdonsága
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha a sík pontjait a <strong>t</strong> tengelyre merőlegesen visszük át a tengely túloldalára úgy, hogy a távolságuk a tengelytől azonos maradjon (<strong>d(P, t) = d(P', t)</strong>), akkor tengelyes tükrözést végzünk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-xs">1</span>
                  Távolságtartó
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Bármely két pont távolsága egyenlő a képeik távolságával: <code className="text-blue-600 font-bold">|A'B'| = |AB|</code>.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-xs">2</span>
                  Szögtartó
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  A szögek nagysága nem változik: <code className="text-emerald-600 font-bold">α' = α</code>.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-xs">3</span>
                  Egyenestartó
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Egyenes képe egyenes, szakasz képe azonos hosszúságú szakasz, félegyenesé félegyenes.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-xs">4</span>
                  Egybevágósági transzformáció
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Minden alakzat képe egybevágó az eredetivel (<code className="text-rose-600 font-bold">F' ≅ F</code>), területe és kerülete változatlan.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sm:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-xs">5</span>
                  Orientációváltó (körüljárási irány megfordul!)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ha az eredeti háromszög csúcsait az óramutató járásával ellentétesen olvastuk (pozitív irány), a tükörképen az óramutató járásával megegyező irányúvá válnak!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRIANGLE INEQUALITY CALCULATOR */}
        {activeTab === 'inequality' && (
          <div className="space-y-6">
            <div className="p-4 bg-teal-50/80 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-900/50">
              <h4 className="font-bold text-teal-950 dark:text-teal-200 text-base mb-1 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                Háromszög-egyenlőtlenség és Szerkeszthetőségi Kalkulátor
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A háromszög bármely két oldalának összege <strong>szigorúan nagyobb</strong> kell legyen a harmadik oldalnál: <code className="font-bold text-teal-700 dark:text-teal-300">a + b &gt; c</code>, <code className="font-bold text-teal-700 dark:text-teal-300">a + c &gt; b</code>, <code className="font-bold text-teal-700 dark:text-teal-300">b + c &gt; a</code>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">"a" oldal hossza:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">{sideA} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">"b" oldal hossza:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">{sideB} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">"c" oldal hossza:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold">{sideC} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={sideC}
                  onChange={(e) => setSideC(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Result banner */}
            <div className={cn(
              "p-5 rounded-2xl border transition-all flex items-center justify-between gap-4",
              isPossible
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
                : isDegenerate
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100"
            )}>
              <div className="flex items-center gap-3">
                {isPossible ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                ) : isDegenerate ? (
                  <AlertCircle className="w-8 h-8 text-amber-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-rose-600 shrink-0" />
                )}
                <div>
                  <h5 className="font-bold text-base">
                    {isPossible
                      ? "✅ Szerkeszthető háromszög (1 valós háromszög)"
                      : isDegenerate
                        ? "⚠️ Elfajuló háromszög (egyenes szakasszá simul)"
                        : "❌ Nem szerkeszthető (0 megoldás)"}
                  </h5>
                  <p className="text-xs sm:text-sm mt-0.5 opacity-90">
                    Összegek: {sideA} + {sideB} = {sideA + sideB} (vs c={sideC}) | {sideA} + {sideC} = {sideA + sideC} (vs b={sideB}) | {sideB} + {sideC} = {sideB + sideC} (vs a={sideA})
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CIRCLE & LOCI */}
        {activeTab === 'circle' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <GeometrySummaryMiniFigure type="circle_parts" size={48} />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">A kör nevezetes vonalai</h5>
                    <p className="text-xs text-slate-500">Sugár, átmérő, húr és érintő</p>
                  </div>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Sugár (r):</strong> A középpontot a körvonallal összekötő szakasz.</li>
                  <li><strong>Átmérő (d = 2r):</strong> A középponton átmenő leghosszabb húr.</li>
                  <li><strong>Húr:</strong> A körvonal két tetszőleges pontját összekötő szakasz.</li>
                  <li><strong>Érintő (e):</strong> A körrel pontosan 1 közös pontja van, és merőleges az érintési sugárra!</li>
                </ul>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <GeometrySummaryMiniFigure type="perpendicular_bisector" size={48} />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Nevezetes mértani helyek</h5>
                    <p className="text-xs text-slate-500">Pontok távolsági egyenlőségei</p>
                  </div>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Szakaszfelező merőleges:</strong> Azon pontok halmaza a síkban, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak (<code className="font-bold text-teal-600">PA = PB</code>).</li>
                  <li><strong>Szögfelező:</strong> Azon pontok halmaza a szögtartományban, amelyek a szög két szárától egyenlő távolságra vannak.</li>
                  <li><strong>Körvonal:</strong> Azon pontok halmaza, amelyek egy rögzített O ponttól pontosan r távolságra vannak.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
