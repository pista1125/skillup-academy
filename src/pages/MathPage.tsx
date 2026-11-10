import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import { mathTopics } from '@/data/mathTopics';
import { SITE_STATS } from '@/data/siteStats';
import { MathTopicCard } from "@/components/math/shared/MathTopicCard";
import { ScrollSpySidebar } from "@/components/math/shared/ScrollSpySidebar";
import { GradeSelector } from '@/components/GradeSelector';
import { VENN_READING_OBJECTS, VENN_READING_NUMBERS } from '@/data/vennReadingLevels';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarMenu } from '@/components/SidebarMenu';
import { SiteFooter } from '@/components/SiteFooter';
import { UserMenu } from '@/components/auth/UserMenu';
import { OnlineTutoringModal } from '@/components/tutoring/OnlineTutoringModal';
import { ToolsCatalog } from '@/components/math/tools';
import {
  Grade1View,
  Grade2View,
  Grade3View,
  Grade4View,
  Grade5View,
  Grade6View,
  Grade7View,
  Grade8View,
  Grade9View,
  Grade10View,
  Grade11View,
  Grade12View,
  AdmissionPrepView,
  GraduationPrepView,
  CompetencyAssessmentView,
  GradeViewProps,
  sectionToTopicMap,
  getGradeSubsections
} from '@/components/math/views';
import { grade5Topics } from '@/data/grade5Topics';

import { MathActivityRouter } from '@/components/math/activities';

// Lazy load heavy components needed on MathPage shell
const CompetencyMatrixHub = lazy(() => import("@/components/math/competency-matrix/CompetencyMatrixHub")) as any;
const GraduationPrep = lazy(() => import("@/components/math/graduation/GraduationPrep")) as any;
const AdmissionPrep = lazy(() => import("@/components/math/admission/AdmissionPrep")) as any;
const MaterialGallery = lazy(() => import("@/components/math/shared/MaterialGallery").then(m => ({ default: m.MaterialGallery }))) as any;
const LessonViewer = lazy(() => import("@/components/math/shared/LessonViewer").then(m => ({ default: m.LessonViewer }))) as any;

import { QuizResult, GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Plus,
  Calculator,
  Wrench,
  Shapes,
  Scale,
  Triangle,
  Square,
  Settings2,
  Variable,
  Percent,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Home,
  Sparkles,
  Target,
  Box,
  MoveHorizontal,
  Circle,
  BookOpen,
  Binary,
  Gamepad2,
  Zap,
  Search,
  X,
  Pencil,
  Heart,
  Grid3X3,
  Columns,
  Table,
  Coins,
  Layout,
  LayoutGrid,
  Repeat,
  Brain,
  Puzzle,
  Trophy,
  Flag,
  ArrowRightLeft,
  GraduationCap,
  Video,
  PieChart,
  CheckCircle2,
  Layers,
  Scissors,
  Award,
  Boxes,
  RefreshCw,
  GitCompare,
  MonitorPlay,
  Maximize2,
  Compass,
  FlaskConical,
  Timer,
  Users,
  Ruler,
  TrendingUp,
  LineChart,
  Eye,
  BarChart3,
  Globe,
  Network,
  Lightbulb,
  Dices,
  Pizza,
  Thermometer,
  Blocks
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'competency-select' | 'activity' | 'geometry-select' | 'search-results';
type ActivityType =
  | 'fraction-quiz' | 'decimal-quiz' | 'fraction-table' | 'percent-table'
  | 'decimal-cards' | 'decimal-operations' | 'number-line' | 'fraction-comparison'
  | 'coordinate-geometry' | 'coordinate-polygon' | 'angle-measurement'
  | 'coordinate-transform' | 'fraction-tool' | 'construction'
  | 'fraction-addition-tool' | 'fraction-subtraction-tool' | 'fraction-multiplication-tool'
  | 'fraction-division-tool' | 'decimal-visualizer-tool' | 'decimal-addition-subtraction-tool'
  | 'decimal-multiplication-tool' | 'decimal-division-tool' | 'percentage-calculator-tool'
  | 'prime-factorization-tool' | 'gcd-lcm-tool' | 'number-set-visualizer-tool'
  | 'coordinate-game' | 'equation-solver-tool' | 'pythagorean-tool'
  | 'pythagorean-practice' | 'surface-area-volume-tool' | 'algebraic-expressions-tool'
  | 'probability-tool' | 'set-operations-tool' | 'function-plotter-tool'
  | 'combinatorics-tool' | 'statistics-tool' | 'geometric-shapes-tool'
  | 'congruence-transformations-tool' | 'similarity-transformations-tool'
  | 'coordinate-plane-tool' | 'powers-roots-tool' | 'percentage-calculation-tool'
  | 'proportion-tool' | 'interest-calculator-tool'
  | 'direct-proportionality-game' | 'inverse-proportionality-game' | 'graph-reading-tool'
  | 'table-of-values-tool' | 'relative-frequency-tool' | 'mean-mode-median-tool'
  | 'probability-simulation-tool' | 'geometric-probability-tool' | 'arithmetic-sequence-tool'
  | 'geometric-sequence-tool' | 'fibonacci-sequence-tool'
  | 'grade3-addition-quiz' | 'grade3-subtraction-quiz' | 'grade3-multiplication-quiz' | 'grade3-division-quiz'
  | 'grade3-fractions-quiz' | 'grade3-geometry-quiz' | 'grade3-measurement-quiz' | 'grade3-word-problems-quiz'
  | 'grade3-blocks' | 'grade3-snake' | 'grade3-alapmuveletek' | 'grade3-tower-builder'
  | 'grade3-money-quiz' | 'triangle-angles-quiz' | 'decimal-fractions-tool' | 'number-line-tool' | 'debt-asset-model' | 'adossag-vagyon'
  | 'manipulative-division' | 'manipulative-addition' | 'construction-tool' | 'money-calculation'
  | 'decimal-shifter-tool' | 'puzzle-maker' | 'geometry-module'
  | 'logic-blocks' | 'venn-diagram-game' | 'grouping-game' | 'number-grouping-game'
  | 'sudoku' | 'sudoku-generator' | 'venn-interpretation-quiz'
  | 'venn-reading-objects' | 'venn-reading-numbers' | 'axial-symmetry' | 'symmetry-error' | 'symmetry-construction' | 'axial-symmetry-quiz' | 'axial-symmetry-presentation'
  | 'percent-value-word-problems' | 'percent-rate-word-problems' | 'percent-base-word-problems' | 'student-feedback' | 'word-search' | 'memory-game' | 'equation-balance-quiz'
  | 'ratio-intro' | 'ratio-creator' | 'g7-word-problems' | 'direct-proportion-quiz' | 'matrix-sorting-game'
  | 'g6-ratio-intro-theory' | 'g6-ratio-intro-quiz' | 'g6-ratio-intro-matcher' | 'g6-ratio-intro-sorter'
  | 'g6-ratio-division-theory' | 'g6-ratio-division-quiz' | 'g6-ratio-division-matcher' | 'g6-ratio-division-sorter'
  | 'g6-direct-prop-theory' | 'g6-direct-prop-quiz' | 'g6-direct-prop-matcher' | 'g6-direct-prop-sorter'
  | 'g6-direct-prop-graph-theory' | 'g6-direct-prop-graph-quiz' | 'g6-direct-prop-graph-matcher' | 'g6-direct-prop-graph-sorter'
  | 'g6-rules-relations-theory' | 'g6-rules-relations-quiz' | 'g6-rules-relations-matcher' | 'g6-rules-relations-sorter'
  | 'g6-fraction-part-theory' | 'g6-fraction-part-quiz' | 'g6-fraction-part-matcher' | 'g6-fraction-part-sorter'
  | 'g6-percentage-theory' | 'g6-percentage-quiz' | 'g6-percentage-matcher' | 'g6-percentage-sorter'
  | 'g6-percent-practice-theory' | 'g6-percent-practice-quiz' | 'g6-percent-practice-matcher' | 'g6-percent-practice-sorter'
  | 'g6-open-sentences-theory' | 'g6-open-sentences-quiz' | 'g6-open-sentences-matcher' | 'g6-open-sentences-sorter'
  | 'g6-word-problems-theory' | 'g6-word-problems-quiz' | 'g6-word-problems-matcher' | 'g6-word-problems-sorter' | 'g6-word-problems-module'
  | 'g6-multiple-solutions-theory' | 'g6-multiple-solutions-quiz' | 'g6-multiple-solutions-matcher' | 'g6-multiple-solutions-sorter'
  | 'g6-ratio-summary-theory' | 'g6-ratio-summary-quiz' | 'g6-ratio-summary-matcher' | 'g6-ratio-summary-sorter'
  | 'g6-length-mass-time-theory' | 'g6-length-mass-time-quiz' | 'g6-length-mass-time-matcher' | 'g6-length-mass-time-sorter'
  | 'toto-maker' | 'chess-game' | 'torpedo-game' | 'matching-creator' | 'unit-converter' | 'capacity-converter' | 'analog-clock'
  | 'g8-algebra' | 'g8-equation-balance'
  | 'g8-logic' | 'g8-set-basics' | 'g8-set-operations' | 'g8-rational-set' | 'g8-rational-operations' | 'g8-powers' | 'g8-sqrt-concept' | 'g8-square-roots' | 'g8-algebra-intro' | 'g8-factoring' | 'g8-polynomial-mult' | 'g8-chapter1-summary'
  | 'g8-geom-congruence' | 'g8-geom-transforms' | 'g8-geom-software' | 'g8-geom-similarity' | 'g8-geom-central-similarity' | 'g8-geom-central-similarity-theory' | 'g8-geom-central-similarity-quiz' | 'g8-geom-central-similarity-matcher' | 'g8-geom-central-similarity-sorter' | 'g8-geom-constructions' | 'g8-geom-constructions-theory' | 'g8-geom-constructions-quiz' | 'g8-geom-constructions-matcher' | 'g8-geom-constructions-sorter' | 'g8-geom-summary' | 'g8-geom-summary-theory' | 'g8-geom-summary-quiz' | 'g8-geom-summary-matcher' | 'g8-geom-summary-sorter'
  | 'g8-eq-basic' | 'g8-eq-basic-theory' | 'g8-eq-basic-quiz' | 'g8-eq-basic-matcher' | 'g8-eq-basic-sorter' | 'g8-eq-numbers-ages' | 'g8-eq-numbers-ages-theory' | 'g8-eq-numbers-ages-quiz' | 'g8-eq-numbers-ages-matcher' | 'g8-eq-numbers-ages-sorter' | 'g8-eq-mixing' | 'g8-eq-mixing-theory' | 'g8-eq-mixing-quiz' | 'g8-eq-mixing-matcher' | 'g8-eq-mixing-sorter' | 'g8-eq-motion-work' | 'g8-eq-motion-work-theory' | 'g8-eq-motion-work-quiz' | 'g8-eq-motion-work-matcher' | 'g8-eq-motion-work-sorter' | 'g8-eq-geometry' | 'g8-eq-geometry-theory' | 'g8-eq-geometry-quiz' | 'g8-eq-geometry-matcher' | 'g8-eq-geometry-sorter' | 'g8-eq-mixed' | 'g8-eq-mixed-theory' | 'g8-eq-mixed-quiz' | 'g8-eq-mixed-matcher' | 'g8-eq-mixed-sorter' | 'g8-eq-financial' | 'g8-eq-financial-theory' | 'g8-eq-financial-quiz' | 'g8-eq-financial-matcher' | 'g8-eq-financial-sorter' | 'g8-eq-summary' | 'g8-eq-summary-theory' | 'g8-eq-summary-quiz' | 'g8-eq-summary-matcher' | 'g8-eq-summary-sorter'
  | 'g8-pyth-constructions' | 'g8-pyth-constructions-theory' | 'g8-pyth-theorem' | 'g8-pyth-theorem-theory' | 'g8-pyth-converse' | 'g8-pyth-converse-theory' | 'g8-pyth-applications' | 'g8-pyth-applications-theory' | 'g8-pyth-calculator' | 'g8-pyth-calculator-theory' | 'g8-pyth-special-triangles' | 'g8-pyth-special-triangles-theory' | 'g8-pyth-summary' | 'g8-pyth-summary-theory'
  | 'g8-func-direct' | 'g8-func-direct-theory' | 'g8-func-direct-matcher' | 'g8-func-direct-sorter' | 'g8-func-graphs' | 'g8-func-graphs-theory' | 'g8-func-graphs-matcher' | 'g8-func-graphs-sorter' | 'g8-func-inverse' | 'g8-func-inverse-theory' | 'g8-func-inverse-matcher' | 'g8-func-inverse-sorter' | 'g8-func-reading' | 'g8-func-reading-theory' | 'g8-func-reading-matcher' | 'g8-func-reading-sorter' | 'g8-func-plotting' | 'g8-func-plotting-theory' | 'g8-func-plotting-matcher' | 'g8-func-plotting-sorter' | 'g8-func-frequency' | 'g8-func-frequency-theory' | 'g8-func-frequency-matcher' | 'g8-func-frequency-sorter' | 'g8-func-game' | 'g8-func-game-theory' | 'g8-func-game-matcher' | 'g8-func-game-sorter' | 'g8-func-prob-basics' | 'g8-func-prob-basics-theory' | 'g8-func-prob-basics-matcher' | 'g8-func-prob-basics-sorter' | 'g8-func-prob-problems' | 'g8-func-prob-problems-theory' | 'g8-func-prob-problems-matcher' | 'g8-func-prob-problems-sorter' | 'g8-func-patterns' | 'g8-func-patterns-theory' | 'g8-func-patterns-matcher' | 'g8-func-patterns-sorter' | 'g8-func-sequences' | 'g8-func-sequences-theory' | 'g8-func-sequences-matcher' | 'g8-func-sequences-sorter' | 'g8-func-summary' | 'g8-func-summary-theory' | 'g8-func-summary-matcher' | 'g8-func-summary-sorter'
  | 'g8-solids-review' | 'g8-solids-review-theory' | 'g8-solids-review-matcher' | 'g8-solids-review-sorter' | 'g8-solids-pyramids' | 'g8-solids-pyramids-theory' | 'g8-solids-pyramids-matcher' | 'g8-solids-pyramids-sorter' | 'g8-solids-pyramids-intro' | 'g8-solids-pyramids-calc' | 'g8-solids-pyramids-calc-theory' | 'g8-solids-pyramids-calc-matcher' | 'g8-solids-pyramids-calc-sorter' | 'g8-solids-sphere' | 'g8-solids-sphere-theory' | 'g8-solids-sphere-matcher' | 'g8-solids-sphere-sorter' | 'g8-solids-earth' | 'g8-solids-earth-theory' | 'g8-solids-earth-matcher' | 'g8-solids-earth-sorter' | 'g8-solids-summary' | 'g8-solids-summary-theory' | 'g8-solids-summary-matcher' | 'g8-solids-summary-sorter'
  | 'g9-komb-hanyfelekeppen-theory' | 'g9-komb-hanyfelekeppen-quiz' | 'g9-komb-hanyfelekeppen-matcher' | 'g9-komb-hanyfelekeppen-sorter'
  | 'g9-komb-grafok-theory' | 'g9-komb-grafok-quiz' | 'g9-komb-grafok-matcher' | 'g9-komb-grafok-sorter'
  | 'g9-komb-szamzarak-theory' | 'g9-komb-szamzarak-quiz' | 'g9-komb-szamzarak-matcher' | 'g9-komb-szamzarak-sorter'
  | 'g9-komb-osszeszamlalas-theory' | 'g9-komb-osszeszamlalas-quiz' | 'g9-komb-osszeszamlalas-matcher' | 'g9-komb-osszeszamlalas-sorter'
  | 'g9-komb-gyakorlas-theory' | 'g9-komb-gyakorlas-quiz' | 'g9-komb-gyakorlas-matcher' | 'g9-komb-gyakorlas-sorter'
  | 'g9-komb-halmazok-theory' | 'g9-komb-halmazok-quiz' | 'g9-komb-halmazok-matcher' | 'g9-komb-halmazok-sorter'
  | 'g9-komb-halmaz-muveletek-theory' | 'g9-komb-halmaz-muveletek-quiz' | 'g9-komb-halmaz-muveletek-matcher' | 'g9-komb-halmaz-muveletek-sorter'
  | 'g9-komb-szitaformula-theory' | 'g9-komb-szitaformula-quiz' | 'g9-komb-szitaformula-matcher' | 'g9-komb-szitaformula-sorter'
  | 'g9-komb-intervallumok-theory' | 'g9-komb-intervallumok-quiz' | 'g9-komb-intervallumok-matcher' | 'g9-komb-intervallumok-sorter'
  | 'g9-komb-gyakorlas-halmaz-theory' | 'g9-komb-gyakorlas-halmaz-quiz' | 'g9-komb-gyakorlas-halmaz-matcher' | 'g9-komb-gyakorlas-halmaz-sorter'
  | 'g9-komb-tudasproba-theory' | 'g9-komb-tudasproba-quiz' | 'g9-komb-tudasproba-matcher' | 'g9-komb-tudasproba-sorter'
  | 'g9-szamok-muveletek-theory' | 'g9-szamok-muveletek-quiz' | 'g9-szamok-muveletek-matcher' | 'g9-szamok-muveletek-sorter'
  | 'g9-szamok-tortek-theory' | 'g9-szamok-tortek-quiz' | 'g9-szamok-tortek-matcher' | 'g9-szamok-tortek-sorter'
  | 'g9-szamok-racionalis-theory' | 'g9-szamok-racionalis-quiz' | 'g9-szamok-racionalis-matcher' | 'g9-szamok-racionalis-sorter'
  | 'g9-szamok-aranyossag-theory' | 'g9-szamok-aranyossag-quiz' | 'g9-szamok-aranyossag-matcher' | 'g9-szamok-aranyossag-sorter'
  | 'g9-szamok-aranyos-osztas-theory' | 'g9-szamok-aranyos-osztas-quiz' | 'g9-szamok-aranyos-osztas-matcher' | 'g9-szamok-aranyos-osztas-sorter'
  | 'g9-szamok-szazalek-theory' | 'g9-szamok-szazalek-quiz' | 'g9-szamok-szazalek-matcher' | 'g9-szamok-szazalek-sorter'
  | 'g9-szamok-hatvany-theory' | 'g9-szamok-hatvany-quiz' | 'g9-szamok-hatvany-matcher' | 'g9-szamok-hatvany-sorter'
  | 'g9-szamok-gyakorlas-hatvany-theory' | 'g9-szamok-gyakorlas-hatvany-quiz' | 'g9-szamok-gyakorlas-hatvany-matcher' | 'g9-szamok-gyakorlas-hatvany-sorter'
  | 'g9-szamok-negyzetgyok-theory' | 'g9-szamok-negyzetgyok-quiz' | 'g9-szamok-negyzetgyok-matcher' | 'g9-szamok-negyzetgyok-sorter'
  | 'g9-szamok-normalalak-theory' | 'g9-szamok-normalalak-quiz' | 'g9-szamok-normalalak-matcher' | 'g9-szamok-normalalak-sorter'
  | 'g9-szamok-szamolas-normalalak-theory' | 'g9-szamok-szamolas-normalalak-quiz' | 'g9-szamok-szamolas-normalalak-matcher' | 'g9-szamok-szamolas-normalalak-sorter'
  | 'g9-szamok-kamatos-kamat-theory' | 'g9-szamok-kamatos-kamat-quiz' | 'g9-szamok-kamatos-kamat-matcher' | 'g9-szamok-kamatos-kamat-sorter'
  | 'g9-egyenlet-betuk-theory' | 'g9-egyenlet-betuk-quiz' | 'g9-egyenlet-betuk-matcher' | 'g9-egyenlet-betuk-sorter'
  | 'g9-egyenlet-algebrai-szamolas-theory' | 'g9-egyenlet-algebrai-szamolas-quiz'
  | 'g9-egyenlet-nevezetes-theory' | 'g9-egyenlet-nevezetes-quiz'
  | 'g9-egyenlet-szorzatta-theory' | 'g9-egyenlet-szorzatta-quiz'
  | 'g9-egyenlet-alap-theory' | 'g9-egyenlet-alap-quiz'
  | 'g9-egyenlet-problemamegoldas-theory' | 'g9-egyenlet-problemamegoldas-quiz'
  | 'g9-egyenlet-alaphalmaz-theory' | 'g9-egyenlet-alaphalmaz-quiz'
  | 'g9-egyenlet-megoldasa-theory' | 'g9-egyenlet-megoldasa-quiz'
  | 'g9-egyenlet-rendszerek-theory' | 'g9-egyenlet-rendszerek-quiz'
  | 'g9-egyenlet-gyakorlas-theory' | 'g9-egyenlet-gyakorlas-quiz'
  | 'g9-geom-sik-theory' | 'g9-geom-sik-quiz' | 'g9-geom-sik-matcher' | 'g9-geom-sik-sorter'
  | 'g9-geom-haromszogek-theory' | 'g9-geom-haromszogek-quiz' | 'g9-geom-haromszogek-matcher' | 'g9-geom-haromszogek-sorter'
  | 'g9-geom-pitagorasz-theory' | 'g9-geom-pitagorasz-quiz' | 'g9-geom-pitagorasz-matcher' | 'g9-geom-pitagorasz-sorter'
  | 'g9-geom-kulonleges-derekszogu-theory' | 'g9-geom-kulonleges-derekszogu-quiz' | 'g9-geom-kulonleges-derekszogu-matcher' | 'g9-geom-kulonleges-derekszogu-sorter'
  | 'g9-geom-tavolsagok-theory' | 'g9-geom-tavolsagok-quiz' | 'g9-geom-tavolsagok-matcher' | 'g9-geom-tavolsagok-sorter'
  | 'g9-geom-kor-theory' | 'g9-geom-kor-quiz' | 'g9-geom-kor-matcher' | 'g9-geom-kor-sorter'
  | 'g9-geom-nevezetes-vonalak-1-theory' | 'g9-geom-nevezetes-vonalak-1-quiz' | 'g9-geom-nevezetes-vonalak-1-matcher' | 'g9-geom-nevezetes-vonalak-1-sorter'
  | 'g9-geom-nevezetes-vonalak-2-theory' | 'g9-geom-nevezetes-vonalak-2-quiz' | 'g9-geom-nevezetes-vonalak-2-matcher' | 'g9-geom-nevezetes-vonalak-2-sorter'
  | 'g9-geom-gyakorlas-theory' | 'g9-geom-gyakorlas-quiz' | 'g9-geom-gyakorlas-matcher' | 'g9-geom-gyakorlas-sorter'
  | 'g9-geom-thalesz-theory' | 'g9-geom-thalesz-quiz' | 'g9-geom-thalesz-matcher' | 'g9-geom-thalesz-sorter'
  | 'g9-geom-thalesz-alkalmazas-theory' | 'g9-geom-thalesz-alkalmazas-quiz' | 'g9-geom-thalesz-alkalmazas-matcher' | 'g9-geom-thalesz-alkalmazas-sorter'
  | 'g9-geom-haromszog-kerulet-terulet-theory' | 'g9-geom-haromszog-kerulet-terulet-quiz' | 'g9-geom-haromszog-kerulet-terulet-matcher' | 'g9-geom-haromszog-kerulet-terulet-sorter'
  | 'g9-geom-tudasproba-theory' | 'g9-geom-tudasproba-quiz' | 'g9-geom-tudasproba-matcher' | 'g9-geom-tudasproba-sorter'
  | 'g10-logic-igaz-hamis-theory' | 'g10-logic-igaz-hamis-quiz' | 'g10-logic-igaz-hamis-matcher' | 'g10-logic-igaz-hamis-sorter'
  | 'g10-logic-allitas-tagadas-theory' | 'g10-logic-allitas-tagadas-quiz' | 'g10-logic-allitas-tagadas-matcher' | 'g10-logic-allitas-tagadas-sorter'
  | 'g10-logic-vagy-es-theory' | 'g10-logic-vagy-es-quiz' | 'g10-logic-vagy-es-matcher' | 'g10-logic-vagy-es-sorter'
  | 'g10-logic-tablazat-theory' | 'g10-logic-tablazat-quiz' | 'g10-logic-tablazat-matcher' | 'g10-logic-tablazat-sorter'
  | 'g10-logic-allitas-megforditas-theory' | 'g10-logic-allitas-megforditas-quiz' | 'g10-logic-allitas-megforditas-matcher' | 'g10-logic-allitas-megforditas-sorter'
  | 'g10-logic-tudasproba-theory' | 'g10-logic-tudasproba-quiz' | 'g10-logic-tudasproba-matcher' | 'g10-logic-tudasproba-sorter'


  | 'angle-matching' | 'triangle-classification' | 'quadrilateral-classification'
  | 'shape-classification' | 'line-relationships' | 'reflection-quiz' | 'circle-parts'
  | 'area-conversion-quiz' | 'volume-quiz' | 'surface-area-quiz' | 'area-calculation-quiz' | 'area-calc-quiz'
  | 'parallelogram-area-quiz' | 'parallelogram-area' | 'volume-surface' | 'perimeter-area' | 'perimeter-area-tool' | 'volume-surface-tool'
  | 'divisibility-powers' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz'
  | 'percentages' | 'perimeter-quiz' | 'area-conversion' | 'volume-conversion' | 'triangle-area' | 'g7-geometry-summary'
  | 'g7-mapping-quiz' | 'g7-function-table-quiz'
  | 'decimal-division-matcher' | 'decimal-division-quiz' | 'decimal-multiplication-matcher' | 'decimal-multiplication-quiz'
  | 'decimal-fractions' | 'decimal-fractions-quiz' | 'decimal-shifter'
  | 'g5-chapter2-summary-theory' | 'g5-chapter2-summary-quiz' | 'g5-chapter2-summary-matcher' | 'g5-chapter2-summary-sorter' | 'g5-fraction-to-decimal-theory' | 'g5-fraction-to-decimal-quiz' | 'g5-fraction-to-decimal-matcher' | 'g5-fraction-to-decimal-sorter' | 'g5-fraction-visual-matcher' | 'g5-fractions-quiz' | 'g5-fractions-module' | 'g5-fractions-intro-theory' | 'g5-fractions-intro-quiz' | 'g5-fractions-expand-simplify-theory' | 'g5-fractions-expand-simplify-quiz' | 'g5-fractions-number-line-theory' | 'g5-fractions-number-line-quiz' | 'g5-fractions-same-denom-theory' | 'g5-fractions-same-denom-quiz' | 'g5-fractions-diff-denom-theory' | 'g5-fractions-diff-denom-quiz' | 'g5-fraction-multiply-theory' | 'g5-fraction-multiply-quiz' | 'g5-fraction-divide-theory' | 'g5-fraction-divide-quiz' | 'g5-fractions-order-of-operations-theory' | 'g5-fractions-order-of-operations-quiz' | 'g5-fractions-review-theory' | 'g5-fractions-review-quiz' | 'g5-decimal-fractions-theory' | 'g5-decimal-fractions-quiz' | 'g5-decimal-compare-rounding-theory' | 'g5-decimal-compare-rounding-quiz' | 'g5-decimal-add-sub-theory' | 'g5-decimal-add-sub-quiz' | 'g5-decimal-multiply-theory' | 'g5-decimal-multiply-quiz' | 'g5-decimal-divide-theory' | 'g5-decimal-divide-quiz' | 'g5-roman-numerals-theory' | 'g5-roman-numerals-quiz' | 'g5-place-value-theory' | 'g5-place-value-quiz' | 'g5-number-reading-theory' | 'g5-number-reading-quiz' | 'g5-number-spelling-theory' | 'g5-number-spelling-quiz' | 'g5-number-systems-theory' | 'g5-number-systems-quiz' | 'g5-number-line-theory' | 'g5-number-line-quiz' | 'g5-rounding-theory' | 'g5-rounding-quiz' | 'g5-addition-theory' | 'g5-addition-quiz' | 'g5-subtraction-theory' | 'g5-subtraction-quiz' | 'g5-multiplication-theory' | 'g5-multiplication-quiz' | 'g5-division-theory' | 'g5-division-quiz' | 'g5-order-of-operations-theory' | 'g5-order-of-operations-quiz' | 'g5-negative-numbers-theory' | 'g5-negative-numbers-quiz' | 'g5-opposite-absolute-theory' | 'g5-opposite-absolute-quiz' | 'g5-integer-addition-subtraction-theory' | 'g5-integer-addition-subtraction-quiz' | 'g5-chapter1-summary-theory' | 'g5-chapter1-summary-quiz' | 'g5-geom-grouping-theory' | 'g5-geom-grouping-quiz'
  | 'g5-geom-sets-theory' | 'g5-geom-sets-quiz'
  | 'g5-geom-bodies-theory' | 'g5-geom-bodies-quiz'
  | 'g5-geom-angles-theory' | 'g5-geom-angles-quiz'
  | 'g5-meas-length-theory' | 'g5-meas-length-quiz' | 'g5-meas-length-matcher' | 'g5-meas-length-sorter'
  | 'g5-meas-perimeter-theory' | 'g5-meas-perimeter-quiz' | 'g5-meas-perimeter-matcher' | 'g5-meas-perimeter-sorter'
  | 'g5-meas-area-theory' | 'g5-meas-area-quiz' | 'g5-meas-area-matcher' | 'g5-meas-area-sorter'
  | 'g5-meas-rectangle-area-theory' | 'g5-meas-rectangle-area-quiz' | 'g5-meas-rectangle-area-matcher' | 'g5-meas-rectangle-area-sorter'
  | 'g5-meas-cuboid-cube-theory' | 'g5-meas-cuboid-cube-quiz' | 'g5-meas-cuboid-cube-matcher' | 'g5-meas-cuboid-cube-sorter'
  | 'g5-meas-surface-area-theory' | 'g5-meas-surface-area-quiz' | 'g5-meas-surface-area-matcher' | 'g5-meas-surface-area-sorter'
  | 'g5-meas-volume-measure-theory' | 'g5-meas-volume-measure-quiz' | 'g5-meas-volume-measure-matcher' | 'g5-meas-volume-measure-sorter'
  | 'g5-meas-cuboid-cube-volume-theory' | 'g5-meas-cuboid-cube-volume-quiz' | 'g5-meas-cuboid-cube-volume-matcher' | 'g5-meas-cuboid-cube-volume-sorter'
  | 'g5-meas-practical-theory' | 'g5-meas-practical-quiz' | 'g5-meas-practical-matcher' | 'g5-meas-practical-sorter'
  | 'g5-meas-summary-theory' | 'g5-meas-summary-quiz' | 'g5-meas-summary-matcher' | 'g5-meas-summary-sorter'
  | 'g5-loc-role-theory' | 'g5-loc-role-quiz' | 'g5-loc-role-matcher' | 'g5-loc-role-sorter'
  | 'g5-loc-grid-theory' | 'g5-loc-grid-quiz' | 'g5-loc-grid-matcher' | 'g5-loc-grid-sorter'
  | 'g5-loc-coord-sys-theory' | 'g5-loc-coord-sys-quiz' | 'g5-loc-coord-sys-matcher' | 'g5-loc-coord-sys-sorter'
  | 'g5-loc-points-theory' | 'g5-loc-points-quiz' | 'g5-loc-points-matcher' | 'g5-loc-points-sorter'
  | 'g5-loc-spatial-theory' | 'g5-loc-spatial-quiz' | 'g5-loc-spatial-matcher' | 'g5-loc-spatial-sorter'
  | 'g5-loc-patterns-theory' | 'g5-loc-patterns-quiz' | 'g5-loc-patterns-matcher' | 'g5-loc-patterns-sorter'
  | 'g5-loc-relations-theory' | 'g5-loc-relations-quiz' | 'g5-loc-relations-matcher' | 'g5-loc-relations-sorter'
  | 'g5-loc-sequences-theory' | 'g5-loc-sequences-quiz' | 'g5-loc-sequences-matcher' | 'g5-loc-sequences-sorter'
  | 'g5-loc-famous-seq-theory' | 'g5-loc-famous-seq-quiz' | 'g5-loc-famous-seq-matcher' | 'g5-loc-famous-seq-sorter'
  | 'g5-loc-summary-theory' | 'g5-loc-summary-quiz' | 'g5-loc-summary-matcher' | 'g5-loc-summary-sorter'
  | 'g5-mass-theory' | 'g5-mass-quiz' | 'g5-mass-matcher' | 'g5-mass-sorter'
  | 'g5-cap-theory' | 'g5-cap-quiz' | 'g5-cap-matcher' | 'g5-cap-sorter'
  | 'g5-time-theory' | 'g5-time-quiz' | 'g5-time-matcher' | 'g5-time-sorter'
  | 'g5-conv-theory' | 'g5-conv-quiz' | 'g5-conv-matcher' | 'g5-conv-sorter'
  | 'g5-var-theory' | 'g5-var-quiz' | 'g5-var-matcher' | 'g5-var-sorter'
  | 'g5-direct-theory' | 'g5-direct-quiz' | 'g5-direct-matcher' | 'g5-direct-sorter'
  | 'g5-open-theory' | 'g5-open-quiz' | 'g5-open-matcher' | 'g5-open-sorter'
  | 'g5-sol-theory' | 'g5-sol-quiz' | 'g5-sol-matcher' | 'g5-sol-sorter'
  | 'g5-simp-wp-theory' | 'g5-simp-wp-quiz' | 'g5-simp-wp-matcher' | 'g5-simp-wp-sorter'
  | 'g5-daily-wp-theory' | 'g5-daily-wp-quiz' | 'g5-daily-wp-matcher' | 'g5-daily-wp-sorter'
  | 'g5-summary-wp-theory' | 'g5-summary-wp-quiz' | 'g5-summary-wp-matcher' | 'g5-summary-wp-sorter'
  | 'g5-games-theory' | 'g5-games-quiz' | 'g5-games-matcher' | 'g5-games-sorter'
  | 'g5-tables-theory' | 'g5-tables-quiz' | 'g5-tables-matcher' | 'g5-tables-sorter'
  | 'g5-data-theory' | 'g5-data-quiz' | 'g5-data-matcher' | 'g5-data-sorter'
  | 'g5-average-theory' | 'g5-average-quiz' | 'g5-average-matcher' | 'g5-average-sorter'
  | 'g5-prob-theory' | 'g5-prob-quiz' | 'g5-prob-matcher' | 'g5-prob-sorter'
  | 'g5-stats-summary-theory' | 'g5-stats-summary-quiz' | 'g5-stats-summary-matcher' | 'g5-stats-summary-sorter'
  | 'g5-summary-numbers-theory' | 'g5-summary-numbers-quiz' | 'g5-summary-numbers-matcher' | 'g5-summary-numbers-sorter'
  | 'g5-summary-fractions-theory' | 'g5-summary-fractions-quiz' | 'g5-summary-fractions-matcher' | 'g5-summary-fractions-sorter'
  | 'g5-summary-geometry-theory' | 'g5-summary-geometry-quiz' | 'g5-summary-geometry-matcher' | 'g5-summary-geometry-sorter'
  | 'g5-summary-sequences-theory' | 'g5-summary-sequences-quiz' | 'g5-summary-sequences-matcher' | 'g5-summary-sequences-sorter'
  | 'g5-summary-stats-theory' | 'g5-summary-stats-quiz' | 'g5-summary-stats-matcher' | 'g5-summary-stats-sorter'
  | 'g5-summary-final-theory' | 'g5-summary-final-quiz' | 'g5-summary-final-matcher' | 'g5-summary-final-sorter'
  | 'g6-planar-shapes-theory' | 'g6-planar-shapes-quiz' | 'g6-planar-shapes-matcher' | 'g6-planar-shapes-sorter'
  | 'g6-congruence-theory' | 'g6-congruence-quiz' | 'g6-congruence-matcher' | 'g6-congruence-sorter'
  | 'g6-integers-operations-theory' | 'g6-integers-operations-quiz'
  | 'g6-integers-mult-theory' | 'g6-integers-mult-quiz'
  | 'g6-integers-div-theory' | 'g6-integers-div-quiz'
  | 'g6-integers-cases-theory' | 'g6-integers-cases-quiz'
  | 'g6-integers-divisors-theory' | 'g6-integers-divisors-quiz'
  | 'g6-integers-remainders-theory' | 'g6-integers-remainders-quiz'
  | 'g6-integers-factorization-theory' | 'g6-integers-factorization-quiz'
  | 'g6-integers-divisibility-2-5-10-theory' | 'g6-integers-divisibility-2-5-10-quiz'
  | 'g6-integers-divisibility-3-9-theory' | 'g6-integers-divisibility-3-9-quiz'
  | 'g6-integers-divisibility-4-100-theory' | 'g6-integers-divisibility-4-100-quiz'
  | 'g6-integers-composite-divisibility-theory' | 'g6-integers-composite-divisibility-quiz'
  | 'g6-integers-lcm-theory' | 'g6-integers-lcm-quiz'
  | 'g6-integers-gcd-theory' | 'g6-integers-gcd-quiz'
  | 'g6-integers-summary-theory' | 'g6-integers-summary-quiz'
  | 'g6-summary-numbers-theory' | 'g6-summary-numbers-quiz'
  | 'g6-summary-fractions-theory' | 'g6-summary-fractions-quiz'
  | 'g6-summary-proportions-theory' | 'g6-summary-proportions-quiz'
  | 'g6-summary-geometry-theory' | 'g6-summary-geometry-quiz'
  | 'g6-summary-final-theory' | 'g6-summary-final-quiz'
  | 'g7-rat-integer-properties-theory' | 'g7-rat-integer-properties-quiz' | 'g7-rat-integer-properties-matcher' | 'g7-rat-integer-properties-sorter'
  | 'g7-rat-fractions-decimals-theory' | 'g7-rat-fractions-decimals-quiz' | 'g7-rat-fractions-decimals-matcher' | 'g7-rat-fractions-decimals-sorter'
  | 'g7-rat-operations-theory' | 'g7-rat-operations-quiz' | 'g7-rat-operations-matcher' | 'g7-rat-operations-sorter'
  | 'g7-rat-word-problems-theory' | 'g7-rat-word-problems-quiz' | 'g7-rat-word-problems-matcher' | 'g7-rat-word-problems-sorter'
  | 'g7-rat-complex-operations-theory' | 'g7-rat-complex-operations-quiz' | 'g7-rat-complex-operations-matcher' | 'g7-rat-complex-operations-sorter'
  | 'g7-rat-numbers-letters-theory' | 'g7-rat-numbers-letters-quiz' | 'g7-rat-numbers-letters-matcher' | 'g7-rat-numbers-letters-sorter'
  | 'g7-rat-combining-substitution-theory' | 'g7-rat-combining-substitution-quiz' | 'g7-rat-combining-substitution-matcher' | 'g7-rat-combining-substitution-sorter'
  | 'g7-rat-expansion-factoring-theory' | 'g7-rat-expansion-factoring-quiz' | 'g7-rat-expansion-factoring-matcher' | 'g7-rat-expansion-factoring-sorter'
  | 'g7-rat-summary-theory' | 'g7-rat-summary-quiz' | 'g7-rat-summary-matcher' | 'g7-rat-summary-sorter'
  | 'g7-geom-concepts-theory' | 'g7-geom-concepts-quiz' | 'g7-geom-concepts-matcher' | 'g7-geom-concepts-sorter'
  | 'g7-geom-triangle-lines-theory' | 'g7-geom-triangle-lines-quiz' | 'g7-geom-triangle-lines-matcher' | 'g7-geom-triangle-lines-sorter'
  | 'g7-geom-triangles-quads-theory' | 'g7-geom-triangles-quads-quiz' | 'g7-geom-triangles-quads-matcher' | 'g7-geom-triangles-quads-sorter'
  | 'g7-geom-transformations-theory' | 'g7-geom-transformations-quiz' | 'g7-geom-transformations-matcher' | 'g7-geom-transformations-sorter'
  | 'g7-geom-point-reflection-theory' | 'g7-geom-point-reflection-quiz' | 'g7-geom-point-reflection-matcher' | 'g7-geom-point-reflection-sorter'
  | 'g7-geom-reflection-app-theory' | 'g7-geom-reflection-app-quiz' | 'g7-geom-reflection-app-matcher' | 'g7-geom-reflection-app-sorter'
  | 'g7-geom-angle-pairs-theory' | 'g7-geom-angle-pairs-quiz' | 'g7-geom-angle-pairs-matcher' | 'g7-geom-angle-pairs-sorter'
  | 'g7-geom-symmetry-theory' | 'g7-geom-symmetry-quiz' | 'g7-geom-symmetry-matcher' | 'g7-geom-symmetry-sorter'
  | 'g7-geom-parallelogram-theory' | 'g7-geom-parallelogram-quiz' | 'g7-geom-parallelogram-matcher' | 'g7-geom-parallelogram-sorter'
  | 'g7-geom-point-symmetric-shapes-theory' | 'g7-geom-point-symmetric-shapes-quiz' | 'g7-geom-point-symmetric-shapes-matcher' | 'g7-geom-point-symmetric-shapes-sorter'
  | 'g7-geom-regular-polygons-theory' | 'g7-geom-regular-polygons-quiz' | 'g7-geom-regular-polygons-matcher' | 'g7-geom-regular-polygons-sorter'
  | 'g7-geom-circle-theory' | 'g7-geom-circle-quiz' | 'g7-geom-circle-matcher' | 'g7-geom-circle-sorter'
  | 'g7-geom-constructions-theory' | 'g7-geom-constructions-quiz' | 'g7-geom-constructions-matcher' | 'g7-geom-constructions-sorter'
  | 'g7-geom-summary-theory' | 'g7-geom-summary-quiz' | 'g7-geom-summary-matcher' | 'g7-geom-summary-sorter'
  | 'g7-pow-large-numbers-theory' | 'g7-pow-large-numbers-quiz' | 'g7-pow-large-numbers-matcher' | 'g7-pow-large-numbers-sorter'
  | 'g7-pow-application-theory' | 'g7-pow-application-quiz' | 'g7-pow-application-matcher' | 'g7-pow-application-sorter'
  | 'g7-pow-divisibility-review-theory' | 'g7-pow-divisibility-review-quiz' | 'g7-pow-divisibility-review-matcher' | 'g7-pow-divisibility-review-sorter'
  | 'g7-pow-logic-theory' | 'g7-pow-logic-quiz' | 'g7-pow-logic-matcher' | 'g7-pow-logic-sorter'
  | 'g7-pow-prime-factors-theory' | 'g7-pow-prime-factors-quiz' | 'g7-pow-prime-factors-matcher' | 'g7-pow-prime-factors-sorter'
  | 'g7-pow-custom-rules-theory' | 'g7-pow-custom-rules-quiz' | 'g7-pow-custom-rules-matcher' | 'g7-pow-custom-rules-sorter'
  | 'g7-pow-divisors-multiples-theory' | 'g7-pow-divisors-multiples-quiz' | 'g7-pow-divisors-multiples-matcher' | 'g7-pow-divisors-multiples-sorter'
  | 'g7-pow-gcd-theory' | 'g7-pow-gcd-quiz' | 'g7-pow-gcd-matcher' | 'g7-pow-gcd-sorter'
  | 'g7-pow-lcm-theory' | 'g7-pow-lcm-quiz' | 'g7-pow-lcm-matcher' | 'g7-pow-lcm-sorter'
  | 'g7-pow-games-theory' | 'g7-pow-games-quiz' | 'g7-pow-games-matcher' | 'g7-pow-games-sorter'
  | 'g7-pow-summary-theory' | 'g7-pow-summary-quiz' | 'g7-pow-summary-matcher' | 'g7-pow-summary-sorter'
  | 'g7-pct-ratio-theory' | 'g7-pct-ratio-quiz' | 'g7-pct-ratio-matcher' | 'g7-pct-ratio-sorter'
  | 'g7-pct-review-theory' | 'g7-pct-review-quiz' | 'g7-pct-review-matcher' | 'g7-pct-review-sorter'
  | 'g7-pct-100-theory' | 'g7-pct-100-quiz' | 'g7-pct-100-matcher' | 'g7-pct-100-sorter'
  | 'g7-pct-what-theory' | 'g7-pct-what-quiz' | 'g7-pct-what-matcher' | 'g7-pct-what-sorter'
  | 'g7-pct-practice-theory' | 'g7-pct-practice-quiz' | 'g7-pct-practice-matcher' | 'g7-pct-practice-sorter'
  | 'g7-pct-complex-theory' | 'g7-pct-complex-quiz' | 'g7-pct-complex-matcher' | 'g7-pct-complex-sorter'
  | 'g7-pct-word-theory' | 'g7-pct-word-quiz' | 'g7-pct-word-matcher' | 'g7-pct-word-sorter'
  | 'g7-pct-summary-theory' | 'g7-pct-summary-quiz' | 'g7-pct-summary-matcher' | 'g7-pct-summary-sorter'
  | 'g7-pct-eq-methods-theory' | 'g7-pct-eq-methods-quiz' | 'g7-pct-eq-methods-matcher' | 'g7-pct-eq-methods-sorter'
  | 'g7-pct-balance-theory' | 'g7-pct-balance-quiz' | 'g7-pct-balance-matcher' | 'g7-pct-balance-sorter'
  | 'g7-eq-solve-theory' | 'g7-eq-solve-quiz' | 'g7-eq-solve-matcher' | 'g7-eq-solve-sorter' | 'g7-pct-eq-solve-theory' | 'g7-pct-eq-solve-quiz' | 'g7-pct-eq-solve-matcher' | 'g7-pct-eq-solve-sorter'
  | 'g7-eq-word-theory' | 'g7-eq-word-quiz' | 'g7-eq-word-matcher' | 'g7-eq-word-sorter' | 'g7-pct-eq-word-theory' | 'g7-pct-eq-word-quiz' | 'g7-pct-eq-word-matcher' | 'g7-pct-eq-word-sorter'
  | 'g7-eq-summary-theory' | 'g7-eq-summary-quiz' | 'g7-eq-summary-matcher' | 'g7-eq-summary-sorter' | 'g7-pct-eq-summary-theory' | 'g7-pct-eq-summary-quiz' | 'g7-pct-eq-summary-matcher' | 'g7-pct-eq-summary-sorter'
  | 'g7-geom-congruence-theory' | 'g7-geom-congruence-quiz' | 'g7-geom-congruence-matcher' | 'g7-geom-congruence-sorter'
  | 'g7-geom-sides-angles-theory' | 'g7-geom-sides-angles-quiz' | 'g7-geom-sides-angles-matcher' | 'g7-geom-sides-angles-sorter'
  | 'g7-geom-polygons-theory' | 'g7-geom-polygons-quiz' | 'g7-geom-polygons-matcher' | 'g7-geom-polygons-sorter'
  | 'g7-geom-units-theory' | 'g7-geom-units-quiz' | 'g7-geom-units-matcher' | 'g7-geom-units-sorter'
  | 'g7-geom-parallelogram-area-theory' | 'g7-geom-parallelogram-area-quiz' | 'g7-geom-parallelogram-area-matcher' | 'g7-geom-parallelogram-area-sorter'
  | 'g7-geom-triangle-area-theory' | 'g7-geom-triangle-area-quiz' | 'g7-geom-triangle-area-matcher' | 'g7-geom-triangle-area-sorter'
  | 'g7-geom-trapezoid-area-theory' | 'g7-geom-trapezoid-area-quiz' | 'g7-geom-trapezoid-area-matcher' | 'g7-geom-trapezoid-area-sorter'
  | 'g7-geom-deltoid-area-theory' | 'g7-geom-deltoid-area-quiz' | 'g7-geom-deltoid-area-matcher' | 'g7-geom-deltoid-area-sorter'
  | 'g7-geom-prism-surface-volume-theory' | 'g7-geom-prism-surface-volume-quiz' | 'g7-geom-prism-surface-volume-matcher' | 'g7-geom-prism-surface-volume-sorter'
  | 'g7-geom-solids-space-plane-theory' | 'g7-geom-solids-space-plane-quiz' | 'g7-geom-solids-space-plane-matcher' | 'g7-geom-solids-space-plane-sorter'
  | 'g7-geom-escape-room-theory' | 'g7-geom-escape-room-quiz' | 'g7-geom-escape-room-matcher' | 'g7-geom-escape-room-sorter'
  | 'g7-geom-summary-theory' | 'g7-geom-summary-quiz' | 'g7-geom-summary-matcher' | 'g7-geom-summary-sorter' | 'g7-geometry-summary'
  | 'g7-stats-relations-theory' | 'g7-stats-relations-quiz' | 'g7-stats-relations-matcher' | 'g7-stats-relations-sorter'
  | 'g7-stats-rep-theory' | 'g7-stats-rep-quiz' | 'g7-stats-rep-matcher' | 'g7-stats-rep-sorter'
  | 'g7-stats-graph-theory' | 'g7-stats-graph-quiz' | 'g7-stats-graph-matcher' | 'g7-stats-graph-sorter'
  | 'g7-stats-central-theory' | 'g7-stats-central-quiz' | 'g7-stats-central-matcher' | 'g7-stats-central-sorter'
  | 'g7-stats-freq-theory' | 'g7-stats-freq-quiz' | 'g7-stats-freq-matcher' | 'g7-stats-freq-sorter'
  | 'g7-stats-prob-theory' | 'g7-stats-prob-quiz' | 'g7-stats-prob-matcher' | 'g7-stats-prob-sorter'
  | 'g7-stats-exp-theory' | 'g7-stats-exp-quiz' | 'g7-stats-exp-matcher' | 'g7-stats-exp-sorter'
  | 'g7-stats-summary-theory' | 'g7-stats-summary-quiz' | 'g7-stats-summary-matcher' | 'g7-stats-summary-sorter'
  | 'g8-logic-theory' | 'g8-logic-quiz'
  | 'g8-set-basics-theory' | 'g8-set-basics-quiz' | 'g8-set-basics-matcher' | 'g8-set-basics-sorter'
  | 'g8-set-operations-theory' | 'g8-set-operations-quiz' | 'g8-set-operations-matcher' | 'g8-set-operations-sorter'
  | 'g8-rational-set-theory' | 'g8-rational-set-quiz' | 'g8-rational-set-matcher' | 'g8-rational-set-sorter'
  | 'g8-rational-operations-theory' | 'g8-rational-operations-quiz' | 'g8-rational-operations-matcher' | 'g8-rational-operations-sorter'
  | 'g8-powers-theory' | 'g8-powers-quiz' | 'g8-powers-matcher' | 'g8-powers-sorter'
  | 'g8-sqrt-concept-theory' | 'g8-sqrt-concept-quiz' | 'g8-sqrt-concept-matcher' | 'g8-sqrt-concept-sorter'
  | 'g8-square-roots-theory' | 'g8-square-roots-quiz' | 'g8-square-roots-matcher' | 'g8-square-roots-sorter'
  | 'g8-algebra-intro-theory' | 'g8-algebra-intro-quiz' | 'g8-algebra-intro-matcher' | 'g8-algebra-intro-sorter'
  | 'g8-factoring-theory' | 'g8-factoring-quiz' | 'g8-factoring-matcher' | 'g8-factoring-sorter'
  | 'g8-polynomial-mult-theory' | 'g8-polynomial-mult-quiz' | 'g8-polynomial-mult-matcher' | 'g8-polynomial-mult-sorter'
  | 'g8-chapter1-summary-theory' | 'g8-chapter1-summary-quiz' | 'g8-chapter1-summary-matcher' | 'g8-chapter1-summary-sorter'
  | 'g8-geom-congruence-theory' | 'g8-geom-congruence-quiz' | 'g8-geom-congruence-matcher' | 'g8-geom-congruence-sorter'
  | 'g8-geom-transforms-theory' | 'g8-geom-transforms-quiz' | 'g8-geom-transforms-matcher' | 'g8-geom-transforms-sorter'
  | 'g8-geom-software-theory' | 'g8-geom-software-quiz' | 'g8-geom-software-matcher' | 'g8-geom-software-sorter'
  | 'g8-geom-similarity-theory' | 'g8-geom-similarity-quiz' | 'g8-geom-similarity-matcher' | 'g8-geom-similarity-sorter'
  | 'g6-fraction-visual-matcher' | 'g6-fractions-quiz' | 'g6-fraction-multiplier' | 'g6-fraction-divider'
  | 'g6-decimal-quiz' | 'g6-to-decimal-matcher' | 'g6-decimal-multiplier-quiz' | 'g6-decimal-multiplier'
  | 'g6-decimal-divider-quiz' | 'g6-decimal-divider' | 'g6-fractions-closing-test'
  | 'scale-tool' | 'measurement-quiz' | 'water-measurement-tool' | 'ruler-tool'
  | 'snake-game' | 'long-division' | 'fraction-visualizer' | 'word-problems' | 'word-problems-quiz' | 'quiz'
  | 'equation-solver' | 'equation-balance' | 'g6-word-problems-quiz' | 'g6-word-problems-module'
  | 'materials' | 'tower-builder' | 'grade2-blocks' | 'fractions'
  | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'divisibility'
  | 'coloring' | 'grade2-coloring' | 'grade3-coloring' | 'hanoi-tower' | 'color-sequence-game'
  | 'smart-whiteboard' | 'algebra' | 'g7-rational-numbers' | 'g7-expression-usage' | 'geometry'
  | (string & {});

const gradeToSlug = (grade: GradeLevel): string => {
  if (grade === 'graduation') return 'erettsegi';
  if (grade === 'admission') return 'felveteli';
  if (grade === 'high-1') return '9-osztaly';
  if (grade === 'high-2') return '10-osztaly';
  if (grade === 'high-3') return '11-osztaly';
  if (grade === 'high-4') return '12-osztaly';
  return `${grade}-osztaly`;
};

const slugToGrade = (slug: string): GradeLevel | null => {
  if (slug === 'erettsegi') return 'graduation';
  if (slug === 'felveteli') return 'admission';
  if (slug === '9-osztaly') return 'high-1';
  if (slug === '10-osztaly') return 'high-2';
  if (slug === '11-osztaly') return 'high-3';
  if (slug === '12-osztaly') return 'high-4';
  const match = slug.match(/^(\d)-osztaly$/);
  return match ? parseInt(match[1]) as GradeLevel : null;
};

interface ActivityConfig {
  id: ActivityType;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  category?: string;
  emoji?: string;
}

const TOOLS: ActivityConfig[] = [
  // basics
  { id: 'number-line', title: 'Számegyenes', desc: 'Egész számok összeadása és kivonása', icon: <span className="text-2xl">➖</span>, color: 'bg-blue-100 text-blue-600', category: 'sec-basics' },
  { id: 'debt-asset-model', title: 'Adósság-vagyon modell (Piros-kék korongok)', desc: 'Egész számok összeadása és kivonása, nullapárok (Piros: vagyon, Kék: adósság)', icon: <span className="text-2xl">🔴🔵</span>, color: 'bg-rose-100 text-rose-700 border-rose-200', category: 'sec-basics' },
  { id: 'manipulative-addition', title: 'Összeadás vizuálisan', desc: 'Helyiértékes összeadás blokkokkal és átváltással', icon: <Plus className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600', category: 'sec-basics' },
  { id: 'manipulative-division', title: 'Osztás vizuálisan', desc: 'Helyiérték-blokkokkal és szétbontással', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-basics' },
  { id: 'long-division', title: 'Írásbeli osztás', desc: 'Lépcsős osztás levezetése egyjegyű osztóval', icon: <Calculator className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-basics' },
  { id: 'divisibility', title: 'Oszthatóság', desc: 'Számok oszthatóságának vizsgálata maradékkal', icon: <Calculator className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600', category: 'sec-basics' },
  { id: 'decimal-shifter', title: 'Tizedesvessző-eltoló', desc: 'Szorzás és osztás 10, 100, 1000-rel', icon: <span className="text-2xl">↔️</span>, color: 'bg-primary/10 text-primary', category: 'sec-basics' },
  { id: 'decimal-fractions', title: 'Tizedestörtek', desc: 'Helyiértékek, átváltások korongokkal', icon: <span className="text-2xl">🪙</span>, color: 'bg-amber-100 text-amber-700', category: 'sec-basics' },
  // fractions
  { id: 'fractions', title: 'Törtek', desc: 'Törtek szemléltetése és összehasonlítása', icon: <Calculator className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600', category: 'sec-fractions' },
  { id: 'percentages', title: 'Százalékszámítás', desc: 'Arányok és százalékok vizualizációja', icon: <Percent className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600', category: 'sec-fractions' },
  { id: 'money-calculation', title: 'Pénztár', desc: 'Kifizetések és visszajáró gyakorlása', icon: <Coins className="w-8 h-8" />, color: 'bg-amber-50 text-amber-600', category: 'sec-fractions' },
  // algebra
  { id: 'algebra-cloud', title: 'Algebrai Felhők (Összevonás, Zárójel, Kiemelés)', desc: 'Interaktív algebrai modellezés: konkrét gyümölcsöktől az absztrakt algebráig, tömbökkel, nullapárokkal és szorzókkal', icon: <span className="text-3xl">☁️</span>, color: 'bg-indigo-100 text-indigo-700 border-indigo-200', category: 'sec-algebra' },
  { id: 'algebra', title: 'Algebra', desc: 'Egyenletek és kifejezések szimbolikus megoldása', icon: <Variable className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600', category: 'sec-algebra' },
  { id: 'equation-solver', title: 'Egyenletmegoldó (Téglalapos)', desc: 'Lépésről lépésre, téglalapos vizuális modell', icon: <Calculator className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600', category: 'sec-algebra' },
  { id: 'equation-balance', title: 'Mérlegelv', desc: 'Egyenletmegoldás kétkarú mérleg modellel', icon: <Scale className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-algebra' },
  // geometry
  { id: 'geometry', title: 'Geometria', desc: 'Interaktív alakzatok, terület–kerület, testek és koordinátageometria', icon: <Shapes className="w-8 h-8" />, color: 'bg-green-100 text-green-600', category: 'sec-geometry' },
  { id: 'construction', title: 'Alapszerkesztés', desc: 'Szerkesztés körzővel és vonalzóval', icon: <Pencil className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  { id: 'symmetry-construction', title: 'Szimmetria szerkesztő', desc: 'Tengelyes és középpontos tükrözés eszköze', icon: <Repeat className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  { id: 'perimeter-area', title: 'Kerület, terület', desc: 'Alakzatok kerületének és területének szemléltetése egységnégyzetekkel', icon: <LayoutGrid className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600', category: 'sec-geometry' },
  { id: 'volume-surface', title: 'Térfogat és felszín', desc: '3D testek kiterítése és feltöltése egységkockákkal', icon: <span className="text-3xl">📦</span>, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  // measurements
  { id: 'unit-converter', title: 'Hosszúság átváltás', desc: 'Mértékegységek (m, dm, cm, mm) vizuális ábrázolása', icon: <Scale className="w-8 h-8" />, color: 'bg-teal-100 text-teal-600', category: 'sec-measurements' },
  { id: 'capacity-converter', title: 'Űrmértékegység átváltó', desc: 'Folyadékok áttöltése mérőpoharakba (l, dl, cl, ml)', icon: <span className="text-3xl">🚰</span>, color: 'bg-blue-100 text-blue-600', category: 'sec-measurements' },
  // measuring instruments
  { id: 'analog-clock', title: 'Számlapos óra', desc: 'Időpontok leolvasása és beállítása a számlapon', icon: <span className="text-3xl">⏰</span>, color: 'bg-amber-100 text-amber-600', category: 'sec-measuring-instruments' },
  // creative
  { id: 'puzzle-maker', title: 'Online Rejtvénykészítő', desc: 'Készíts matekos rejtvényeket és töltsd le PDF-ben!', icon: <span className="text-3xl">🧩</span>, color: 'bg-violet-100 text-violet-600', category: 'sec-creative' },
  { id: 'toto-maker', title: 'Totó Készítő', desc: 'Készíts 13+1 kérdéses totót egyedi megfejtéssel és töltsd le PDF-ben!', icon: <span className="text-3xl">🏆</span>, color: 'bg-amber-100 text-amber-600', category: 'sec-creative' },
  { id: 'matching-creator', title: 'Párosító Készítő', desc: 'Készíts koordinátás párosító feladatot és töltsd le PDF-ben!', icon: <Puzzle className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'word-search', title: 'Szókereső Készítő', desc: 'Készíts saját szókeresőt, letölthető megoldókulccsal!', icon: <span className="text-3xl">🔎</span>, color: 'bg-indigo-100 text-indigo-600', category: 'sec-creative' },
  { id: 'sudoku-generator', title: 'Sudoku Generátor', desc: 'Generálj és nyomtass egyedi Sudoku feladványokat!', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'student-feedback', title: 'Diák visszajelzés (Céltábla)', desc: 'Kérj visszajelzést a diákoktól az óra végén!', icon: <Target className="w-8 h-8" />, color: 'bg-rose-100 text-rose-600', category: 'sec-teacher' },
  { id: 'smart-whiteboard', title: 'AI Interaktív Okostábla', desc: 'Érintőképernyős tantermi okostábla AI alakzat- és függvényfelismeréssel', icon: <span className="text-3xl">🪄</span>, color: 'bg-purple-100 text-purple-700 border-purple-200', category: 'sec-teacher' },
  { id: 'scientific-calculator', title: 'Tudományos Számológép (Casio fx-82ES)', desc: 'Natural-V.P.A.M. kétsoros iskolai és érettségi tudományos számológép', icon: <Calculator className="w-8 h-8" />, color: 'bg-primary/10 text-primary border-primary/20', category: 'sec-algebra' },
];

const GAMES: ActivityConfig[] = [
  { id: 'sudoku', title: 'Sudoku Mester', desc: 'Klasszikus és extrém Sudoku feladványok', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 border-blue-200 text-blue-600' },
  {
    id: 'hanoi-tower',
    title: 'Hanoi tornyai',
    desc: 'Logikai és stratégiai játék a korongokkal.',
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    color: 'bg-amber-50 dark:bg-amber-900/20'
  },
  { id: 'snake-game', title: 'Matek Kígyó', desc: 'Gyűjtsd össze a helyes válaszokat a kígyóval!', icon: <span className="text-3xl">🐍</span>, color: 'bg-emerald-100 border-emerald-200' },
  { id: 'tower-builder', title: 'Toronyépítő', desc: 'Építs tornyokat Dienes-tömbökből és számolj!', icon: <span className="text-3xl">🏗️</span>, color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { id: 'coloring', title: 'Számolj és Színezz!', desc: 'Számold ki az eredményt és színezd ki a képeket!', icon: <span className="text-3xl">🎨</span>, color: 'bg-pink-100 border-pink-200 text-pink-700' },
  { id: 'memory-game', title: 'Memóriajáték', desc: 'Jegyezd meg az ábrákat és teszteld a memóriád!', icon: <Brain className="w-8 h-8" />, color: 'bg-indigo-100 border-indigo-200 text-indigo-600' },
  { id: 'color-sequence-game', title: 'Szín-sorrend emlékezet', desc: 'Ismételd meg a villogó színes gombok sorrendjét!', icon: <Brain className="w-8 h-8 text-pink-500 animate-pulse" />, color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 border-pink-200' },
  { id: 'chess-game', title: 'Sakk Mester', desc: 'Játssz a gép ellen vagy hívd ki barátaidat!', icon: <span className="text-3xl">♟️</span>, color: 'bg-slate-100 border-slate-200 text-slate-700' },
  { id: 'torpedo-game', title: 'Torpedó Matek', desc: 'Süllyeszd el az ellenfél hajóit koordinátákkal!', icon: <span className="text-3xl">⚓</span>, color: 'bg-indigo-100 border-indigo-200 text-indigo-700' },
];

export default function MathPage() {
  const navigate = useNavigate();
  const { grade: gradeParam, topic: topicParam, activity: activityParam } = useParams();
  const location = useLocation();

  const [view, setView] = useState<ViewState>('main-select');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');
  const [activeMaterial, setActiveMaterial] = useState<{ title: string, path: string } | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [vennLevel, setVennLevel] = useState<number | null>(null);
  const [activeGrade5TopicId, setActiveGrade5TopicId] = useState<string>('g5-integers');
  const [activeGrade5SubSectionId, setActiveGrade5SubSectionId] = useState<string | null>(null);
  const [isGrade5MobileMenuOpen, setIsGrade5MobileMenuOpen] = useState(false);
  const [isTutoringModalOpen, setIsTutoringModalOpen] = useState(false);

  const isUpperGradeLayout = selectedGrade !== null && (
    typeof selectedGrade === 'number' ||
    (typeof selectedGrade === 'string' && (
      selectedGrade.startsWith('high-') ||
      selectedGrade === 'admission' ||
      selectedGrade === 'graduation'
    ))
  );

  const getGradeLabel = (grade: GradeLevel | null): string => {
    if (!grade) return '';
    if (grade === 'graduation') return 'Érettségi';
    if (grade === 'admission') return 'Felvételi';
    if (grade === 'high-1') return '9. osztály';
    if (grade === 'high-2') return '10. osztály';
    if (grade === 'high-3') return '11. osztály';
    if (grade === 'high-4') return '12. osztály';
    return `${grade}. osztály`;
  };


  const [percentMode, setPercentMode] = useState<'calculate-value' | 'calculate-rate' | 'calculate-base' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mathTopics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setShowResults(false);
    setView('search-results');
    updateURL('search-results', selectedGrade, null, null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync state from URL on load and URL change
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      setView('main-select');
      setSelectedGrade(null);
      setSelectedTopic(null);
      return;
    }

    if (location.pathname.startsWith('/eszkozok')) {
      setView('tools-select');
      setSelectedGrade(null);
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActivityType(topicParam as ActivityType);
        setView('activity');
      }
      return;
    }

    if (location.pathname.startsWith('/jatekok')) {
      setView('games-select');
      setSelectedGrade(null);
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActivityType(topicParam as ActivityType);
        setView('activity');
      }
      return;
    }

    if (location.pathname.startsWith('/kompetencia')) {
      const slugMatch = location.pathname.match(/\/kompetencia\/(.+)/);
      if (slugMatch) {
        let type = 'competency-assessment';
        if (slugMatch[1].includes('-mock')) {
          type = 'competency-mock-assessment';
        }
        const parsedGrade = slugToGrade(slugMatch[1].replace('-mock', ''));
        if (parsedGrade) {
          setSelectedGrade(parsedGrade);
          setActivityType(type as ActivityType);
          setView('activity');
        }
      } else {
        setView('competency-select');
        setSelectedGrade(null);
      }
      return;
    }

    const grade = slugToGrade(gradeParam || '');
    if (grade) {
      setSelectedGrade(grade);
      const defaultTopic = grade === 'high-4' ? 'g12-tergeometria' : grade === 'high-3' ? 'g11-trigonometria' : grade === 'high-2' ? 'g10-logika' : grade === 'high-1' ? 'g9-kombinatorika-halmazok' : grade === 8 ? 'g8-numbers-letters' : grade === 7 ? 'g7-logic' : grade === 6 ? 'g6-integers-divisibility' : grade === 5 ? 'g5-integers' : 'materials';
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActiveGrade5TopicId(topicParam);
        if (activityParam) {
          setActivityType(activityParam as ActivityType);
          setView('activity');
          // Support material parameter if activity is materials
          const params = new URLSearchParams(location.search);
          const materialId = params.get('material');
          if (activityParam === 'materials' && materialId) {
            // The ID will be passed to MaterialGallery via the search param extraction below
          }
        } else {
          setView('topic-select');
          // Some topics might show detail instead of full activity
          if (topicParam === 'competency-assessment' || !((grade === 5 && topicParam.startsWith('g5-')) || grade === 4 || grade === 6 || grade === 7 || grade === 8 || (typeof grade === 'string' && grade.startsWith('high-')))) {
            setActivityType(topicParam as ActivityType);
            setView('activity');
          } else {
            setExpandedTopicId(topicParam);
          }
        }
      } else {
        setView('topic-select');
        setActivityType('quiz'); // Reset activity type when no topic or activity is selected
        setActiveGrade5TopicId(defaultTopic);
        setExpandedTopicId(defaultTopic);
      }
    }
  }, [location.pathname, gradeParam, topicParam, activityParam, location.search]);

  // Sync URL from state when state changes via user interaction
  const updateURL = (
    newView: ViewState,
    grade: GradeLevel | null,
    topic: string | null,
    activity: ActivityType | null
  ) => {
    let path = '/';
    if (newView === 'tools-select') {
      path = topic ? `/eszkozok/${topic}` : '/eszkozok';
    } else if (newView === 'games-select') {
      path = topic ? `/jatekok/${topic}` : '/jatekok';
    } else if (newView === 'competency-select') {
      path = '/kompetencia';
      // Kompetencia activity specific routing
      path = grade ? `/kompetencia/${gradeToSlug(grade)}` : '/kompetencia';
    } else if (newView === 'activity' && !grade) {
      // Handle tool/game activity without grade
      const isGame = GAMES.some(g => g.id === activity);
      path = isGame ? `/jatekok/${topic || activity}` : `/eszkozok/${topic || activity}`;
    } else if (grade) {
      path = `/${gradeToSlug(grade)}`;
      if (topic) {
        path += `/${topic}`;
        // Only append activity if it's different from the topic to avoid redundant URLs
        if (newView === 'activity' && activity && activity !== topic) {
          path += `/${activity}`;
        }
      }
    }

    if (location.pathname !== path) {
      navigate(path);
    }
  };

  // Auto scroll to top on activity or view change and sync URL
  useEffect(() => {
    if (view === 'activity') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (selectedGrade && selectedTopic && activityType) {
        updateURL('activity', selectedGrade, selectedTopic, activityType);
      }
    }
  }, [activityType, view, selectedGrade, selectedTopic]);

  const handleHome = () => {
    setView('main-select');
    setSelectedGrade(null);
    setSelectedTopic(null);
    setActivityType('quiz');
    setActiveMaterial(null);
    setExpandedTopicId(null);
    setPercentMode(null);
    updateURL('main-select', null, null, null);
  };

  const handleMaterialSelect = (material: any) => {
    setActiveMaterial(material);
    if (material) {
      // For now, we use a query param for material to avoid complex URL nesting
      const path = location.pathname + `?material=${material.id}`;
      navigate(path);
    } else {
      navigate(location.pathname);
    }
  };


  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
    if (typeof grade === 'number' || (typeof grade === 'string' && grade.startsWith('high-'))) {
      const defaultTopic = grade === 'high-4' ? 'g12-tergeometria' : grade === 'high-3' ? 'g11-trigonometria' : grade === 'high-2' ? 'g10-logika' : grade === 'high-1' ? 'g9-kombinatorika-halmazok' : grade === 8 ? 'g8-numbers-letters' : grade === 7 ? 'g7-logic' : grade === 6 ? 'g6-integers-divisibility' : grade === 5 ? 'g5-integers' : 'materials';
      setActiveGrade5TopicId(defaultTopic);
      setExpandedTopicId(defaultTopic);
      setActiveGrade5SubSectionId(null);
    } else {
      setExpandedTopicId(null);
    }
    updateURL('topic-select', grade, null, null);
  };

  const handleTopicSelect = (topicId: string, forceActivity = false) => {
    if (!forceActivity && ((selectedGrade === 5 && topicId.startsWith('g5-')) || selectedGrade === 4 || selectedGrade === 6 || selectedGrade === 7 || selectedGrade === 8 || (typeof selectedGrade === 'string' && selectedGrade.startsWith('high-')))) {
      const nextExpanded = expandedTopicId === topicId ? null : topicId;
      setExpandedTopicId(nextExpanded);
      updateURL('topic-select', selectedGrade, nextExpanded, null);
      return;
    }

    setSelectedTopic(topicId);
    window.scrollTo(0, 0);

    let finalActivityType: ActivityType = 'quiz';

    // Check if it's a direct game or tool first
    const isGame = GAMES.some(g => g.id === topicId);
    const isTool = TOOLS.some(t => t.id === topicId);

    if (isGame || isTool) {
      finalActivityType = topicId as ActivityType;
    } else if (topicId === 'fractions') {
      finalActivityType = 'fractions';
    } else if (topicId === 'basic-operations' && selectedGrade === 1) {
      finalActivityType = 'grade1-basic';
    } else if (topicId === 'basic-operations' && selectedGrade === 2) {
      finalActivityType = 'grade2-basic';
    } else if (topicId === 'basic-operations' && selectedGrade === 3) {
      finalActivityType = 'grade3-basic';
    } else if (topicId === 'algebra') {
      finalActivityType = 'algebra';
    } else if (topicId === 'geometry') {
      finalActivityType = 'geometry';
    } else if (topicId === 'percentages' || topicId === 'g7-percent-equations') {
      finalActivityType = 'percentages';
      setPercentMode(null);
    } else if (topicId === 'divisibility') {
      finalActivityType = 'divisibility';
    } else if (topicId === 'materials') {
      finalActivityType = 'materials';
    } else if (topicId === 'long-division') {
      finalActivityType = 'long-division';
    } else if (topicId === 'line-relationships') {
      finalActivityType = 'line-relationships';
    } else if (topicId === 'snake-game') {
      finalActivityType = 'snake-game';
    } else if (topicId === 'decimal-fractions') {
      finalActivityType = 'decimal-fractions';
    } else if (topicId === 'number-line') {
      finalActivityType = 'number-line';
    } else if (topicId === 'debt-asset-model' || topicId === 'adossag-vagyon') {
      finalActivityType = 'debt-asset-model';
    } else if (topicId === 'construction') {
      finalActivityType = 'construction';
    } else if (topicId === 'manipulative-division') {
      finalActivityType = 'manipulative-division';
    } else if (topicId === 'manipulative-addition') {
      finalActivityType = 'manipulative-addition';
    } else if (topicId === 'decimal-shifter') {
      finalActivityType = 'decimal-shifter';
    } else if (topicId === 'algebra-cloud' || topicId === 'algebrai-felhok') {
      finalActivityType = 'algebra-cloud';
    } else if (topicId === 'equation-solver') {
      finalActivityType = 'equation-solver';
    } else if (topicId === 'equation-balance') {
      finalActivityType = 'equation-balance';
    } else if (topicId === 'money-calculation') {
      finalActivityType = 'money-calculation';
    } else if (topicId === 'puzzle-maker') {
      finalActivityType = 'puzzle-maker';
    } else if (topicId === 'symmetry-construction') {
      finalActivityType = 'symmetry-construction';
    } else if (topicId === 'perimeter-area') {
      finalActivityType = 'perimeter-area';
    } else if (topicId === 'volume-surface') {
      finalActivityType = 'volume-surface';
    } else if (topicId === 'perimeter-quiz') {
      finalActivityType = 'perimeter-quiz';
    } else if (topicId === 'parallelogram-area' || topicId === 'parallelogram-area-quiz') {
      finalActivityType = 'parallelogram-area-quiz';
    } else {
      finalActivityType = 'quiz';
    }

    setActivityType(finalActivityType);
    setView('activity');
    updateURL('activity', selectedGrade, topicId, finalActivityType);
  };

  const handleActivitySelect = (type: ActivityType, topicId?: string, level?: number, gradeOverride?: GradeLevel) => {
    setActivityType(type);
    const finalGrade = gradeOverride !== undefined ? gradeOverride : selectedGrade;
    if (gradeOverride !== undefined) {
      setSelectedGrade(gradeOverride);
    }

    let resolvedTopic = topicId || selectedTopic;
    if (!resolvedTopic && (finalGrade === 8 || selectedGrade === 8)) {
      if (type.startsWith('g8-geom-')) resolvedTopic = 'g8-geometry';
      else if (type.startsWith('g8-eq-')) resolvedTopic = 'g8-equations';
      else if (type.startsWith('g8-pyth-')) resolvedTopic = 'g8-pythagoras';
      else if (type.startsWith('g8-func-')) resolvedTopic = 'g8-functions-probability-sequences';
      else if (type.startsWith('g8-solids-')) resolvedTopic = 'g8-solids';
      else if (type.startsWith('g8-stat-')) resolvedTopic = 'g8-statistics';
      else resolvedTopic = 'g8-numbers-letters';
    } else if (!resolvedTopic && (finalGrade === 9 || selectedGrade === 9 || finalGrade === 'high-1' || selectedGrade === 'high-1')) {
      if (type.startsWith('g9-komb-')) resolvedTopic = 'g9-kombinatorika-halmazok';
      else if (type.startsWith('g9-szamok-')) resolvedTopic = 'g9-szamok-vilaga';
      else if (type.startsWith('g9-egyenlet-')) resolvedTopic = 'g9-egyenletek-azonossagok';
      else if (type.startsWith('g9-geom-')) resolvedTopic = 'g9-bevezetes-geometriaba';
      else if (type.startsWith('g9-func-')) resolvedTopic = 'g9-fuggvenyek';
    }
    if (resolvedTopic) {
      setSelectedTopic(resolvedTopic);
      setActiveGrade5TopicId(resolvedTopic);
      setExpandedTopicId(resolvedTopic);
    }

    if (level !== undefined) {
      setVennLevel(level);
    } else {
      setVennLevel(null);
    }
    setView('activity');
    window.scrollTo(0, 0);
    updateURL('activity', finalGrade, resolvedTopic || selectedTopic, type);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedGrade(null);
    setSelectedTopic(toolId);
    setActivityType(toolId as ActivityType);
    setView('activity');
    updateURL('activity', null, toolId, toolId as ActivityType);
  };



  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    let nextView: ViewState = 'main-select';
    let nextGrade: GradeLevel | null = selectedGrade;
    let nextTopic: string | null = selectedTopic;
    const nextActivity: ActivityType | null = activityType;

    if (view === 'activity') {
      if (activityType === 'materials' && activeMaterial) {
        handleMaterialSelect(null);
        return; // Stay in activity view
      }

      // If we are in a hub module (fractions, decimals, grade-specific hubs),
      // and we are NOT already at the hub menu level, go back to the menu level first.
      const isHubSubActivity =
        (activityType.startsWith('fractions-') || activityType.startsWith('decimal-') || activityType.startsWith('grade1-') || activityType.startsWith('grade2-') || activityType.startsWith('grade3-')) &&
        activityType !== 'fractions' && activityType !== 'grade1-basic' && activityType !== 'grade2-basic' && activityType !== 'grade3-basic';

      if (isHubSubActivity) {
        const hubId = activityType.startsWith('fractions-') || activityType.startsWith('decimal-') ? 'fractions' :
          activityType.startsWith('grade1-') ? 'grade1-basic' :
            activityType.startsWith('grade2-') ? 'grade2-basic' : 'grade3-basic';

        handleActivitySelect(hubId as ActivityType, selectedTopic || undefined);
        return;
      }

      if (selectedTopic === 'geometry' && selectedGrade === 6) {
        nextView = 'geometry-select';
        nextTopic = null;

      } else if (selectedGrade) {
        nextView = 'topic-select';
        let resolvedTopic = selectedTopic || activeGrade5TopicId;
        if (!resolvedTopic && selectedGrade === 8) {
          if (activityType.startsWith('g8-geom-')) resolvedTopic = 'g8-geometry';
          else if (activityType.startsWith('g8-eq-')) resolvedTopic = 'g8-equations';
          else if (activityType.startsWith('g8-pyth-')) resolvedTopic = 'g8-pythagoras';
          else if (activityType.startsWith('g8-func-')) resolvedTopic = 'g8-functions-probability-sequences';
          else if (activityType.startsWith('g8-solids-')) resolvedTopic = 'g8-solids';
          else if (activityType.startsWith('g8-stat-')) resolvedTopic = 'g8-statistics';
          else resolvedTopic = 'g8-numbers-letters';
        } else if (!resolvedTopic && (selectedGrade === 9 || selectedGrade === 'high-1')) {
          if (activityType.startsWith('g9-komb-')) resolvedTopic = 'g9-kombinatorika-halmazok';
          else if (activityType.startsWith('g9-szamok-')) resolvedTopic = 'g9-szamok-vilaga';
          else if (activityType.startsWith('g9-egyenlet-')) resolvedTopic = 'g9-egyenletek-azonossagok';
          else if (activityType.startsWith('g9-geom-')) resolvedTopic = 'g9-bevezetes-geometriaba';
          else if (activityType.startsWith('g9-func-')) resolvedTopic = 'g9-fuggvenyek';
        }
        const isExpandable =
          (selectedGrade === 5 && resolvedTopic?.startsWith('g5-')) ||
          selectedGrade === 4 ||
          selectedGrade === 6 ||
          selectedGrade === 7 ||
          selectedGrade === 8 ||
          (typeof selectedGrade === 'string' && selectedGrade.startsWith('high-'));
        nextTopic = isExpandable ? resolvedTopic : null;
        if (nextTopic) {
          setActiveGrade5TopicId(nextTopic);
          setExpandedTopicId(nextTopic);
        }
      } else if (location.pathname.startsWith('/jatekok') || GAMES.some(g => g.id === activityType)) {
        nextView = 'games-select';
        nextTopic = null;
      } else if (location.pathname.startsWith('/eszkozok') || TOOLS.some(t => t.id === activityType)) {
        nextView = 'tools-select';
        nextTopic = null;
      } else {
        nextView = 'main-select';
        nextGrade = null;
        nextTopic = null;
      }
    } else if (view === 'geometry-select') {
      nextView = 'topic-select';
      nextTopic = null;
    } else if (view === 'topic-select') {
      nextView = 'main-select';
      nextGrade = null;
      nextTopic = null;
    } else if (view === 'tools-select' || view === 'games-select' || view === 'search-results' || view === 'competency-select') {
      nextView = 'main-select';
      nextGrade = null;
      nextTopic = null;
    }

    setView(nextView);
    setSelectedGrade(nextGrade);
    setSelectedTopic(nextTopic);
    if (nextView === 'main-select') {
      setExpandedTopicId(null);
    }
    // Explicitly reset activityType unless we are staying in activity view
    if ((nextView as string) !== 'activity') {
      setActivityType('quiz');
    }
    updateURL(nextView, nextGrade, nextTopic, null);
  };

  const renderTopicContent = (topicId: string) => {
    if (selectedGrade === 'admission') return <AdmissionPrepView onBack={handleHome} />;
    if (selectedGrade === 'graduation') return <GraduationPrepView onBack={handleHome} />;
    if (topicId === 'competency-assessment') return <CompetencyAssessmentView onBack={handleHome} />;

    const viewProps: GradeViewProps = {
      topicId,
      activeSubSectionId: activeGrade5SubSectionId,
      selectedGrade: selectedGrade || 1,
      onActivitySelect: (type, tId) => handleActivitySelect(type as ActivityType, tId),
      onMaterialSelect: handleMaterialSelect,
      setPercentMode,
    };

    if (selectedGrade === 1) return <Grade1View {...viewProps} />;
    if (selectedGrade === 2) return <Grade2View {...viewProps} />;
    if (selectedGrade === 3) return <Grade3View {...viewProps} />;
    if (selectedGrade === 4) return <Grade4View {...viewProps} />;
    if (selectedGrade === 5) return <Grade5View {...viewProps} />;
    if (selectedGrade === 6) return <Grade6View {...viewProps} />;
    if (selectedGrade === 7) return <Grade7View {...viewProps} />;
    if (selectedGrade === 8) return <Grade8View {...viewProps} />;
    if (selectedGrade === 'high-1') return <Grade9View {...viewProps} />;
    if (selectedGrade === 'high-2') return <Grade10View {...viewProps} />;
    if (selectedGrade === 'high-3') return <Grade11View {...viewProps} />;
    if (selectedGrade === 'high-4') return <Grade12View {...viewProps} />;

    return (
      <div className="py-2">
        <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
        </div>
        <MaterialGallery
          grade={selectedGrade || 8}
          onView={handleMaterialSelect}
          initialMaterialId={new URLSearchParams(location.search).get('material')}
        />
      </div>
    );
  };

  const getFilteredTopics = () => {
    let topics = mathTopics;

    if (selectedGrade) {
      if (typeof selectedGrade === 'number') {
        topics = mathTopics.filter(t => t.grades.includes(selectedGrade as number));
      } else {
        const gradeTopics = mathTopics.filter(t => t.grades.includes(selectedGrade as any));
        topics = gradeTopics.length > 0 ? gradeTopics : mathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
      }
    }

    if (!searchQuery.trim()) return topics;

    const query = searchQuery.toLowerCase();
    return topics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  };

  return (
    <div className={cn(
      "min-h-screen bg-transparent text-foreground flex flex-col",
      ((activityType === 'symmetry-construction' || activityType === 'perimeter-area' || activityType === 'algebra-cloud') || (isUpperGradeLayout && view === 'topic-select')) && "p-0 overflow-hidden h-screen"
    )}>
      {/* Header */}
      {(activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'algebra-cloud') || view !== 'activity' ? (
        <div className="sticky top-0 z-50 w-full">
          {/* Main Header */}
          <div className="bg-gradient-math text-white py-2 md:py-3 px-3 md:px-4 shadow-xl relative transition-all duration-300">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
            </div>

            <div className="w-full px-2 lg:px-12 relative z-10">
              <div className="flex justify-between items-center gap-1.5">
                <div className="flex items-center gap-1 sm:gap-2.5">
                  <SidebarMenu />
                  <Button
                    variant="ghost"
                    onClick={handleHome}
                    className="bg-white/10 text-white hover:bg-white/20 font-black px-1.5 sm:px-3 border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 h-8 sm:h-10 rounded-xl overflow-hidden"
                  >
                    <img src="/logo_header.png" alt="DiákZóna" className="h-6 sm:h-8 object-contain" />
                    <span className="text-sm sm:text-lg md:text-xl font-black tracking-tighter">Diákzóna</span>
                  </Button>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <div ref={searchRef} className="relative hidden lg:flex items-center group">
                    <input
                      type="text"
                      placeholder="Keresés..."
                      value={searchQuery}
                      onFocus={() => setShowResults(true)}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                      className="bg-white/10 hover:bg-white/20 focus:bg-white/20 border border-white/10 focus:border-white/30 rounded-xl py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all w-40 md:w-56 backdrop-blur-md"
                    />
                    <div className="absolute right-1 flex items-center gap-1">
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleSearchSubmit()}
                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all shadow-sm"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Results */}
                    {showResults && searchQuery.trim() !== '' && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="max-h-[320px] overflow-y-auto p-2">
                          {getSearchResults().length > 0 ? (
                            getSearchResults().slice(0, 6).map(topic => (
                              <button
                                key={topic.id}
                                onClick={() => {
                                  handleTopicSelect(topic.id, true);
                                  setShowResults(false);
                                  setSearchQuery('');
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition-all text-left group/item"
                              >
                                <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-2xl group-hover/item:scale-110 transition-transform">
                                  {typeof topic.icon === 'string' ? (
                                    topic.icon
                                  ) : (
                                    <topic.icon className="w-6 h-6" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm text-slate-800 truncate">{topic.title}</div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1">{topic.description}</div>
                                </div>
                                <ChevronRight className="w-3 h-3 text-slate-300 group-hover/item:text-primary transition-colors" />
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center">
                              <div className="text-2xl mb-1">🔍</div>
                              <p className="text-xs text-slate-400">Nincs találat a keresésre.</p>
                            </div>
                          )}

                          {getSearchResults().length > 6 && (
                            <button
                              onClick={() => handleSearchSubmit()}
                              className="w-full p-2 text-center text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-all"
                            >
                              Összes találat megtekintése ({getSearchResults().length})
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <UserMenu />
                  <Button
                    variant="default"
                    onClick={() => navigate('/korrepetalas')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-purple-500/30 border border-white/20 transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                    title="Online Korrepetálás"
                  >
                    <Video className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden md:inline text-xs sm:text-sm">Online Korrepetálás</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
                    className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                    title="Online Kvíz"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                      <circle cx="12" cy="3" r="1.8" />
                      <path d="M13 6.5L8 14H12.5L10.5 21.5L17 12H12.5L13.5 6.5H13Z" />
                    </svg>
                    <span className="hidden md:inline text-xs sm:text-sm">Online Kvíz</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}



      {/* Content */}
      <div className={cn(
        (activityType !== 'chess-game' && activityType !== 'perimeter-area' && activityType !== 'snake-game' && activityType !== 'tower-builder' && activityType !== 'grade2-blocks' && activityType !== 'grade3-blocks' && activityType !== 'grade3-tower-builder' && activityType !== 'toto-maker' && activityType !== 'student-feedback' && !(isUpperGradeLayout && view === 'topic-select')) && "container mx-auto px-4 py-8",
        "transition-all duration-500",
        (isUpperGradeLayout && view === 'topic-select')
          ? "w-full p-0 max-w-none flex-1 overflow-hidden"
          : (activityType === 'chess-game' || activityType === 'perimeter-area' || activityType === 'algebra-cloud' || activityType === 'snake-game' || activityType === 'tower-builder' || activityType === 'grade2-blocks' || activityType === 'grade3-blocks' || activityType === 'grade3-tower-builder'
            ? "max-w-none p-0 w-full h-full"
            : (activityType === 'toto-maker' || activityType === 'student-feedback')
              ? "w-full max-w-none px-2 sm:px-4 py-1.5"
              : ((view === 'activity' || view === 'topic-select' || view === 'tools-select' || view === 'games-select' || view === 'main-select' || view === 'competency-select')
                ? "max-w-none lg:px-12"
                : "max-w-4xl"
              )
          )
      )}>
        {view === 'search-results' && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-800">Keresési találatok</h2>
                  <p className="text-sm text-slate-500">Találatok erre: <span className="font-bold text-primary italic">"{searchQuery}"</span></p>
                </div>
              </div>
              <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-primary rounded-xl px-6">
                Bezárás
              </Button>
            </div>

            <div className="space-y-4">
              {getSearchResults().map((topic) => (
                <MathTopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => handleTopicSelect(topic.id, true)}
                />
              ))}
              {getSearchResults().length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">Nincs találat a keresésre.</h3>
                  <p className="text-slate-400">Próbálkozz más kulcsszóval vagy ellenőrizd a helyesírást!</p>
                  <Button variant="outline" onClick={handleHome} className="mt-8 rounded-xl border-slate-200">
                    Vissza a főoldalra
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'main-select' && (
          <div className="animate-slide-up space-y-12">
            <section>
              <GradeSelector
                selectedGrade={selectedGrade}
                onSelectGrade={handleGradeSelect}
              />
            </section>

            <section className="pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => { setView('tools-select'); updateURL('tools-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                Matek Eszközök
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>

              <Button
                onClick={() => { setView('competency-select'); updateURL('competency-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20 group transition-all text-white"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                Kompetencia felkészítés
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>

              <Button
                onClick={() => { setView('games-select'); updateURL('games-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 shadow-lg shadow-pink-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                Matek Játékok
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>
            </section>

            {/* --- NEW SECTIONS --- */}

            {/* Math Quote Section */}
            <section className="py-12 px-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl text-center relative overflow-hidden">
              <div className="absolute -top-10 -left-10 text-9xl text-white/5 font-black">&ldquo;</div>
              <div className="absolute -bottom-10 -right-10 text-9xl text-white/5 font-black">&rdquo;</div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  <span className="text-primary-300">„</span>A természet könyve a <span className="text-primary font-black underline decoration-primary/50 underline-offset-4">matematika</span> nyelvén íródott.<span className="text-primary-300">”</span>
                </blockquote>
                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">— Galileo Galilei —</p>
              </div>
            </section>

            {/* Developer Bio Section */}
            <section className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Photo Area */}
                <div className="lg:w-2/5 xl:w-1/3 relative bg-slate-900 overflow-hidden min-h-[300px] lg:min-h-full flex-shrink-0">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl -ml-24 -mb-24"></div>
                  </div>
                  <img
                    src="/orsos_istvan.jpg"
                    alt="Orsós István"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay for smooth transition on mobile if needed, or just decoration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/50"></div>
                </div>

                {/* Content Area */}
                <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest w-fit mb-4">
                    <Sparkles className="w-3.5 h-3.5" /> A Fejlesztőről
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">Orsós István</h2>
                  <p className="text-lg font-bold text-slate-500 mb-6 border-b border-slate-100 pb-6">Tanár • Mentor • Önkéntes</p>

                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      Elhivatott <span className="font-bold text-slate-800">matematikus és fizikus</span> vagyok, aki szenvedéllyel oktat és mentorál. Több éves tapasztalatom van középiskolai tanításban és egyetemi mentorprogramokban.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      Célom, hogy tudásommal és tapasztalataimmal minél több embernek segíthessek a fejlődésben és az önmegvalósításban. Aktívan foglalkozom <span className="font-bold text-primary">3D nyomtatással</span> és technológiai innovációkkal.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">PTE</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Mat-Fiz Mester</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">2020<span className="text-slate-400 font-normal">óta</span></div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Tanár</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">Python</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Programozás</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">3D</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Nyomtatás</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Site Stats Section */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">Mit találsz a DiákZónán?</h2>
                <p className="text-slate-500">Folyamatosan bővülő, interaktív matematikai tartalom, ami a tanulást játékká teszi.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(() => {
                  // Pontos statisztikai számítások
                  const toolsCount = TOOLS.length;
                  const gamesCount = GAMES.length;
                  const topicsCount = mathTopics.filter(t => t.id.startsWith('g')).length;
                  const exercisesCount = SITE_STATS.exercisesCount;

                  return (
                    <>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-purple-50 text-purple-600 mb-4">
                          <Wrench className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{toolsCount}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interaktív Eszköz</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-pink-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-pink-50 text-pink-500 mb-4">
                          <Gamepad2 className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{gamesCount}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Oktató Játék</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-blue-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-blue-50 text-blue-500 mb-4">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{topicsCount}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rendszerezett Témakör</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
                          <Target className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{exercisesCount.toLocaleString('hu-HU')}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gyakorló Feladat</div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </section>
          </div>
        )}

        {view === 'topic-select' && (() => {
          if (selectedGrade === 'graduation') {
            return (
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse text-left">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                    <p className="text-slate-400">Érettségi felkészítő betöltése...</p>
                  </div>
                </div>
              }>
                <GraduationPrep onBack={handleHome} />
              </Suspense>
            );
          }
          if (selectedGrade === 'admission') {
            return (
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse text-left">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                    <p className="text-slate-400">Felvételi felkészítő betöltése...</p>
                  </div>
                </div>
              }>
                <AdmissionPrep onBack={handleHome} />
              </Suspense>
            );
          }
          if (typeof selectedGrade === 'number' || (selectedGrade !== null && selectedGrade.startsWith('high-'))) {
            const currentGradeTopics = getGradeSubsections(selectedGrade, mathTopics);
            const activeTopic = currentGradeTopics.find(t => t.id === activeGrade5TopicId) || currentGradeTopics[0];

            const handleTouchStart = (e: React.TouchEvent) => {
              touchStartY.current = e.touches[0].clientY;
              touchEndY.current = e.touches[0].clientY;
            };

            const handleTouchMove = (e: React.TouchEvent) => {
              touchEndY.current = e.touches[0].clientY;
            };

            const handleTouchEnd = () => {
              const diffY = touchStartY.current - touchEndY.current;
              if (diffY > 50) {
                setIsGrade5MobileMenuOpen(true);
              } else if (diffY < -50) {
                setIsGrade5MobileMenuOpen(false);
              }
            };

            return (
              <div className="flex flex-col lg:flex-row h-full w-full bg-slate-50 text-slate-800 overflow-hidden animate-slide-up relative text-left">
                {/* Left Sidebar (Desktop only) */}
                <aside className={cn(
                  "hidden lg:flex bg-white border-r border-slate-200/80 flex-col transition-all duration-300 relative z-20 shrink-0",
                  isSidebarCollapsed ? "w-16" : "w-64"
                )}>
                  {/* Collapsible toggle */}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute top-4 -right-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-all z-30"
                  >
                    {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  </button>

                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    {!isSidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm tracking-wider uppercase text-purple-700">{getGradeLabel(selectedGrade)}</span>
                      </div>
                    )}
                    <button
                      onClick={handleHome}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors ml-auto"
                      title="Főoldal"
                    >
                      <Home className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sidebar Nav */}
                  <nav className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {currentGradeTopics.map((topic) => {
                      const isTopicActive = activeGrade5TopicId === topic.id;
                      const hasSubsections = topic.subsections && topic.subsections.length > 0;
                      const isExpanded = expandedTopicId === topic.id;

                      return (
                        <div key={topic.id} className="space-y-1">
                          <button
                            onClick={() => {
                              if (isExpanded) {
                                setExpandedTopicId(null);
                              } else {
                                setActiveGrade5TopicId(topic.id);
                                setActiveGrade5SubSectionId(null);
                                setExpandedTopicId(hasSubsections ? topic.id : null);
                              }
                            }}
                            className={cn(
                              "w-full text-left p-2.5 rounded-xl transition-all font-bold text-xs flex items-center gap-2.5 group",
                              isTopicActive
                                ? "bg-purple-600 text-white font-black shadow-md shadow-purple-100"
                                : "hover:bg-slate-100 text-slate-900 hover:text-black font-bold"
                            )}
                          >
                            <span className="text-base shrink-0">{topic.icon}</span>
                            {!isSidebarCollapsed && (
                              <>
                                <span className="line-clamp-2 flex-1 font-bold">{topic.title}</span>
                                {hasSubsections && (
                                  <span
                                    className={cn(
                                      "p-0.5 rounded transition-transform duration-200 shrink-0",
                                      isTopicActive ? "text-white/90 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950"
                                    )}
                                    title={isExpanded ? "Altémák összecsukása" : "Altémák lenyitása"}
                                  >
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", !isExpanded && "-rotate-90")} />
                                  </span>
                                )}
                              </>
                            )}
                          </button>

                          {/* Subsections list */}
                          {isExpanded && !isSidebarCollapsed && hasSubsections && (
                            <div className="pl-2 pr-1 py-1 border-l-2 border-purple-300 space-y-1 ml-3 mt-1 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                              {topic.subsections.map((sub: any) => {
                                const isSubActive = activeGrade5SubSectionId === sub.id;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => setActiveGrade5SubSectionId(sub.id)}
                                    className={cn(
                                      "w-full text-left py-2 pr-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between",
                                      isSubActive
                                        ? "bg-purple-100 text-purple-950 font-black border-l-2 border-purple-700"
                                        : "hover:bg-slate-100 text-slate-900 hover:text-black",
                                      isSubActive ? "pl-2" : "pl-3"
                                    )}
                                  >
                                    <span className="truncate mr-2">{sub.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </aside>

                {/* ── MOBILE BOTTOM DRAWER (< lg) ──────────────────────────── */}
                {/* Backdrop overlay */}
                {isGrade5MobileMenuOpen && (
                  <div
                    className="fixed inset-0 bg-black/45 z-40 lg:hidden"
                    onClick={() => setIsGrade5MobileMenuOpen(false)}
                  />
                )}

                {/* Floating center tab button (Visible when closed) */}
                {!isGrade5MobileMenuOpen && (
                  <button
                    onClick={() => setIsGrade5MobileMenuOpen(true)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 lg:hidden h-9 w-fit px-4 bg-purple-600 text-white font-extrabold text-[11px] tracking-wider uppercase rounded-t-2xl shadow-[0_-4px_15px_rgba(147,51,234,0.35)] flex items-center justify-center gap-1.5 transition-all active:scale-95 animate-in fade-in slide-in-from-bottom-5 duration-300"
                  >
                    <ChevronUp className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
                    <span className="font-extrabold text-[11px] tracking-wider">Témakörök</span>
                  </button>
                )}

                {/* Bottom drawer panel */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white text-slate-900 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-slate-200/80 transition-transform duration-300 ease-in-out",
                    isGrade5MobileMenuOpen ? "translate-y-0" : "translate-y-full"
                  )}
                  style={{ maxHeight: '75vh' }}
                >
                  {/* Drawer handle / toggle strip */}
                  <button
                    onClick={() => setIsGrade5MobileMenuOpen(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full h-12 flex items-center justify-between px-5 bg-slate-50 border-b border-slate-200/60 rounded-t-3xl flex-shrink-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse flex-shrink-0" />
                      <span className="font-display font-black text-xs tracking-wider uppercase text-purple-800 flex-shrink-0">
                        Témakörök
                      </span>
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2.5 py-0.5 rounded-full truncate">
                        {activeTopic.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800 flex-shrink-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Bezárás</span>
                      <ChevronDown className="w-4 h-4 text-purple-600" />
                    </div>
                  </button>

                  {/* Scrollable content inside drawer */}
                  <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(75vh - 3rem)' }}>
                    <div className="flex justify-end border-b border-slate-100 pb-2">
                      <button
                        onClick={() => {
                          setIsGrade5MobileMenuOpen(false);
                          handleHome();
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 hover:text-black transition-colors text-xs font-bold"
                      >
                        <Home className="w-3.5 h-3.5" />
                        Vissza a főoldalra
                      </button>
                    </div>

                    <nav className="space-y-2.5">
                      {currentGradeTopics.map((topic) => {
                        const isTopicActive = activeGrade5TopicId === topic.id;
                        const hasSubsections = topic.subsections && topic.subsections.length > 0;
                        const isExpanded = expandedTopicId === topic.id;

                        return (
                          <div key={topic.id} className="space-y-1">
                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setExpandedTopicId(null);
                                } else {
                                  setActiveGrade5TopicId(topic.id);
                                  setActiveGrade5SubSectionId(null);
                                  setExpandedTopicId(hasSubsections ? topic.id : null);
                                  if (!hasSubsections) {
                                    setIsGrade5MobileMenuOpen(false);
                                  }
                                }
                              }}
                              className={cn(
                                "w-full text-left p-3 rounded-2xl transition-all font-bold text-xs flex items-center gap-3 group",
                                isTopicActive
                                  ? "bg-purple-600 text-white font-black shadow-md shadow-purple-100"
                                  : "hover:bg-slate-100 bg-slate-50 text-slate-900 hover:text-black font-bold border border-slate-200/60"
                              )}
                            >
                              <span className="text-base shrink-0">{topic.icon}</span>
                              <span className="flex-1 font-bold">{topic.title}</span>
                              {hasSubsections && (
                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 shrink-0", !isExpanded && "-rotate-90", isTopicActive ? "text-white/80" : "text-slate-700")} />
                              )}
                            </button>

                            {/* Subsections list inside mobile drawer */}
                            {isExpanded && hasSubsections && (
                              <div className="pl-3 pr-1 py-1 border-l-2 border-purple-300 space-y-1.5 ml-4 mt-1.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                {topic.subsections.map((sub: any) => {
                                  const isSubActive = activeGrade5SubSectionId === sub.id;
                                  return (
                                    <button
                                      key={sub.id}
                                      onClick={() => {
                                        setActiveGrade5SubSectionId(sub.id);
                                        setIsGrade5MobileMenuOpen(false);
                                      }}
                                      className={cn(
                                        "w-full text-left py-2.5 pr-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between",
                                        isSubActive
                                          ? "bg-purple-100 text-purple-950 font-black border-l-2 border-purple-700"
                                          : "hover:bg-slate-100 bg-slate-50 text-slate-900 hover:text-black",
                                        isSubActive ? "pl-3.5" : "pl-4"
                                      )}
                                    >
                                      <span className="truncate mr-2">{sub.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Right Content Area */}
                <main className="flex-1 bg-slate-50/30 p-6 md:p-8 pb-16 lg:pb-8 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{activeTopic.icon}</span>
                          <h1 className="font-display text-xl md:text-2xl font-black text-slate-800">
                            {activeTopic.title}
                          </h1>
                        </div>
                        <p className="text-xs text-slate-500">
                          {activeGrade5SubSectionId
                            ? activeTopic.subsections.find((s: any) => s.id === activeGrade5SubSectionId)?.label
                            : "Válassz egy alfejezetet vagy nézd meg az összes feladatot!"}
                        </p>
                      </div>
                    </div>

                    {/* Active Topic Rendering */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                      {activeGrade5TopicId === 'materials' ? (
                        <div className="py-2">
                          <MaterialGallery
                            grade={selectedGrade as number}
                            onView={handleMaterialSelect}
                            initialMaterialId={new URLSearchParams(location.search).get('material')}
                          />
                        </div>
                      ) : (
                        renderTopicContent(activeGrade5TopicId)
                      )}
                    </div>
                  </div>
                </main>
              </div>
            );
          }

          return (
            <div className="animate-slide-up pb-20 relative text-left">
              <div className="flex-1 transition-all duration-500">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Válaszd ki a témakörök!</h2>
                </div>
                <div className="space-y-4">
                  {getFilteredTopics().map((topic) => (
                    <MathTopicCard
                      key={topic.id}
                      topic={topic}
                      isExpanded={expandedTopicId === topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      {((((selectedGrade as any) === 5 && topic.id.startsWith('g5-')) || (selectedGrade as any) === 4 || (selectedGrade as any) === 6 || (selectedGrade as any) === 7) && renderTopicContent(topic.id))}
                    </MathTopicCard>
                  ))}
                  {getFilteredTopics().length === 0 && (
                    <div className="text-center py-12 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <p className="text-slate-500">Ehhez az évfolyamhoz még nincsenek feltöltve specifikus témakörök.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {view === 'tools-select' && (
          <ToolsCatalog onSelectTool={handleToolSelect} />
        )}

        {view === 'games-select' && (
          <div className="animate-slide-up w-full">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-800 flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
                Matematikai Játékok
              </h2>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
                Fejleszd a logikád, gyakorold a számolást és játssz önállóan vagy barátaiddal!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 w-full">
              {GAMES.map(game => (
                <ToolCard
                  key={game.id}
                  title={game.title}
                  desc={game.desc}
                  icon={game.icon}
                  color={game.color}
                  onClick={() => handleActivitySelect(game.id as ActivityType)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'competency-select' && (
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold text-slate-700">Felkészítő betöltése...</h3>
                <p className="text-slate-400">Pár pillanat és kezdhetjük!</p>
              </div>
            </div>
          }>
            <CompetencyMatrixHub onBack={handleHome} />
          </Suspense>
        )}

        {view === 'activity' && (
          <div className="animate-slide-up">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                  <p className="text-slate-400">Pár pillanat és kezdhetjük!</p>
                </div>
              </div>
            }>
              <MathActivityRouter
                activityType={activityType}
                selectedGrade={selectedGrade}
                selectedTopic={selectedTopic}
                onBack={handleBack}
                onActivitySelect={handleActivitySelect}
                setActivityType={setActivityType}
                handleMaterialSelect={handleMaterialSelect}
                handleQuizComplete={handleQuizComplete}
                percentMode={percentMode}
                vennLevel={vennLevel}
              />
            </Suspense>
          </div>
        )}
        {activityType !== 'chess-game' && activityType !== 'snake-game' && activityType !== 'algebra-cloud' && activityType !== 'debt-asset-model' && activityType !== 'adossag-vagyon' && activityType !== 'tower-builder' && activityType !== 'toto-maker' && activityType !== 'manipulative-division' && activityType !== 'manipulative-addition' && !isUpperGradeLayout && view !== 'competency-select' && ((activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'volume-surface' && activityType !== 'student-feedback' && activityType !== 'volume-quiz' && activityType !== 'surface-area-quiz' && activityType !== 'unit-converter' && activityType !== 'capacity-converter' && activityType !== 'analog-clock' && activityType !== 'g7-mapping-quiz' && activityType !== 'g7-function-table-quiz') || view !== 'activity') && <SiteFooter />}
        {activeMaterial && (
          <LessonViewer material={activeMaterial} onClose={() => handleMaterialSelect(null)} />
        )}
        <OnlineTutoringModal isOpen={isTutoringModalOpen} onClose={() => setIsTutoringModalOpen(false)} />
      </div>
    </div>
  );
}

interface ToolCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}


function ToolCard({ title, desc, icon, color, onClick }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left shadow-sm group w-full"
    >
      <div className={cn("p-3.5 sm:p-4 rounded-2xl transition-transform group-hover:scale-110 flex-shrink-0 shadow-sm flex items-center justify-center", color)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-snug line-clamp-2 mt-0.5">{desc}</p>
      </div>
    </button>
  );
}
