import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calculator,
  Percent,
  Variable,
  Shapes,
  Scale,
  FileDown,
  X,
  Star,
  Clock,
  Plus,
  Coins,
  Pencil,
  Repeat,
  LayoutGrid,
  Puzzle,
  Target,
  SlidersHorizontal,
  Printer,
  Grid3X3,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToolCategory =
  | 'sec-basics'
  | 'sec-fractions'
  | 'sec-algebra'
  | 'sec-geometry'
  | 'sec-measurements'
  | 'sec-measuring-instruments'
  | 'sec-creative'
  | 'sec-teacher';

export type GradeGroup = 'all' | 'primary' | 'middle' | 'high' | 'teacher';

export interface ToolItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  category: ToolCategory;
  categoryName: string;
  accentGradient: string;
  iconBg: string;
  grades: string;
  gradeGroup: GradeGroup;
  tags: string[];
  badge?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isPdf?: boolean;
}

export const TOOLS_CATALOG_DATA: ToolItem[] = [
  // 1. ALAPMŰVELETEK & SZÁMFOGALOM
  {
    id: 'number-line',
    title: 'Számegyenes',
    desc: 'Egész számok összeadása és kivonása interaktív ugrásokkal.',
    icon: <span className="text-xl font-bold">➖➕</span>,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    grades: '1–8.',
    gradeGroup: 'primary',
    tags: ['Számegyenes', 'Negatív számok']
  },
  {
    id: 'debt-asset-model',
    title: 'Adósság-vagyon modell',
    desc: 'Egész számok piros-kék korongokkal és nullapárokkal.',
    icon: <span className="text-xl">🔴🔵</span>,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-rose-500 to-red-600',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
    grades: '5–8.',
    gradeGroup: 'middle',
    tags: ['Nullapárok', 'Korongok'],
    badge: 'MODELL'
  },
  {
    id: 'manipulative-addition',
    title: 'Összeadás vizuálisan',
    desc: 'Helyiértékes összeadás Dienes-blokkokkal és átváltással.',
    icon: <Plus className="w-5 h-5" />,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    grades: '1–4.',
    gradeGroup: 'primary',
    tags: ['Dienes-blokkok', 'Átváltás']
  },
  {
    id: 'manipulative-division',
    title: 'Osztás vizuálisan',
    desc: 'Helyiérték-blokkok szétbontása és csoportosítása.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    grades: '2–5.',
    gradeGroup: 'primary',
    tags: ['Maradékos osztás', 'Blokkok']
  },
  {
    id: 'long-division',
    title: 'Írásbeli osztás',
    desc: 'Lépcsős osztás levezetése egy- és kétjegyű osztóval.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-indigo-500 to-purple-600',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    grades: '3–6.',
    gradeGroup: 'middle',
    tags: ['Lépcsős osztás', 'Algoritmus']
  },
  {
    id: 'divisibility',
    title: 'Oszthatóság vizsgáló',
    desc: 'Számok oszthatósága 2-től 100-ig, szabálymagyarázattal.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-teal-500 to-emerald-600',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
    grades: '5–6.',
    gradeGroup: 'middle',
    tags: ['Oszthatóság', 'Prímszámok']
  },
  {
    id: 'decimal-shifter',
    title: 'Tizedesvessző-eltoló',
    desc: 'Szorzás és osztás 10, 100, 1000-rel interaktív húzással.',
    icon: <span className="text-xl">↔️</span>,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    grades: '5–6.',
    gradeGroup: 'middle',
    tags: ['Tizedesvessző', 'Helyiérték']
  },
  {
    id: 'decimal-fractions',
    title: 'Tizedestörtek korongokkal',
    desc: 'Tizedek és századok szemléltetése helyiérték-korongokkal.',
    icon: <span className="text-xl">🪙</span>,
    category: 'sec-basics',
    categoryName: 'Alapművelet',
    accentGradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    grades: '5–6.',
    gradeGroup: 'middle',
    tags: ['Tizedestört', 'Pénzérmék']
  },

  // 2. TÖRTEK ÉS ARÁNYOSSÁG
  {
    id: 'fractions',
    title: 'Törtek Vizuális Műhelye',
    desc: 'Törtek kirakása kör- és téglalap-modellen, bővítés és összeadás.',
    icon: <Percent className="w-5 h-5" />,
    category: 'sec-fractions',
    categoryName: 'Törtek',
    accentGradient: 'from-orange-500 to-amber-600',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    grades: '3–8.',
    gradeGroup: 'middle',
    tags: ['Tört kördiagram', 'Bővítés']
  },
  {
    id: 'percentages',
    title: 'Százalékszámítás Vizuálisan',
    desc: 'Alap, százalékláb és százalékérték vizuális arányosítása.',
    icon: <Percent className="w-5 h-5" />,
    category: 'sec-fractions',
    categoryName: 'Törtek',
    accentGradient: 'from-pink-500 to-rose-600',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    grades: '6–8.',
    gradeGroup: 'middle',
    tags: ['Százalék', 'Kördiagram']
  },
  {
    id: 'money-calculation',
    title: 'Pénztár & Visszajáró',
    desc: 'Forint érmék, bankjegyek kezelése és visszajáró számolása.',
    icon: <Coins className="w-5 h-5" />,
    category: 'sec-fractions',
    categoryName: 'Törtek',
    accentGradient: 'from-yellow-500 to-amber-600',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    grades: '1–4.',
    gradeGroup: 'primary',
    tags: ['Forint', 'Pénztár']
  },

  // 3. ALGEBRA ÉS EGYENLETEK
  {
    id: 'algebra-cloud',
    title: 'Algebrai Felhők',
    desc: 'Modellezés gyümölcsöktől az algebráig, zárójelfelbontás.',
    icon: <span className="text-xl">☁️</span>,
    category: 'sec-algebra',
    categoryName: 'Algebra',
    accentGradient: 'from-indigo-600 to-violet-600',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    grades: '6–10.',
    gradeGroup: 'middle',
    tags: ['Zárójelfelbontás', 'Kiemelés'],
    badge: 'INTERAKTÍV'
  },
  {
    id: 'scientific-calculator',
    title: 'Casio fx-82ES Számológép',
    desc: 'Kétsoros iskolai és érettségi számológép teljes billentyűzettel.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-algebra',
    categoryName: 'Algebra',
    accentGradient: 'from-blue-600 to-indigo-700',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    grades: '5–12.',
    gradeGroup: 'high',
    tags: ['Casio', 'Érettségi'],
    badge: 'NÉPSZERŰ'
  },
  {
    id: 'equation-solver',
    title: 'Egyenletmegoldó (Téglalapos)',
    desc: 'Elsőfokú egyenletek téglalap-alapú geometriai modellje.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-algebra',
    categoryName: 'Algebra',
    accentGradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    grades: '6–8.',
    gradeGroup: 'middle',
    tags: ['Egyenlet', 'Téglalap modell']
  },
  {
    id: 'equation-balance',
    title: 'Mérlegelv Egyenletmegoldó',
    desc: 'Egyenletmegoldás kétkarú mérleg egyensúlyi modellel.',
    icon: <Scale className="w-5 h-5" />,
    category: 'sec-algebra',
    categoryName: 'Algebra',
    accentGradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    grades: '6–8.',
    gradeGroup: 'middle',
    tags: ['Mérlegelv', 'Egyensúly']
  },
  {
    id: 'algebra',
    title: 'Algebrai Kifejezések Hub',
    desc: 'Polinomok, hatványozás és kifejezések összefoglalása.',
    icon: <Variable className="w-5 h-5" />,
    category: 'sec-algebra',
    categoryName: 'Algebra',
    accentGradient: 'from-purple-600 to-indigo-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    grades: '7–12.',
    gradeGroup: 'high',
    tags: ['Kifejezések', 'Polinomok']
  },

  // 4. GEOMETRIA ÉS SZERKESZTÉS
  {
    id: 'geometry',
    title: 'Geometria Főműhely',
    desc: '2D alakzatok, terület–kerület, 3D testek és koordináták.',
    icon: <Shapes className="w-5 h-5" />,
    category: 'sec-geometry',
    categoryName: 'Geometria',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    grades: '5–12.',
    gradeGroup: 'middle',
    tags: ['2D/3D', 'Koordináták']
  },
  {
    id: 'construction',
    title: 'Alapszerkesztések Körzővel',
    desc: 'Szakaszfelező, szögfelező és háromszögszerkesztés.',
    icon: <Pencil className="w-5 h-5" />,
    category: 'sec-geometry',
    categoryName: 'Geometria',
    accentGradient: 'from-teal-500 to-cyan-600',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
    grades: '5–8.',
    gradeGroup: 'middle',
    tags: ['Körző', 'Szerkesztés']
  },
  {
    id: 'symmetry-construction',
    title: 'Szimmetria Szerkesztő',
    desc: 'Tengelyes és középpontos tükrözés felépítése pontról pontra.',
    icon: <Repeat className="w-5 h-5" />,
    category: 'sec-geometry',
    categoryName: 'Geometria',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    grades: '5–8.',
    gradeGroup: 'middle',
    tags: ['Tükrözés', 'Tengelyes']
  },
  {
    id: 'perimeter-area',
    title: 'Kerület és Terület Szemléltető',
    desc: 'Alakzatok kerülete és területe egységnégyzet rácson.',
    icon: <LayoutGrid className="w-5 h-5" />,
    category: 'sec-geometry',
    categoryName: 'Geometria',
    accentGradient: 'from-green-500 to-emerald-600',
    iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    grades: '3–8.',
    gradeGroup: 'middle',
    tags: ['Egységnégyzet', 'Képletek']
  },
  {
    id: 'volume-surface',
    title: 'Térfogat és Felszín (3D)',
    desc: 'Kockák és hasábok síkhálóvá kiterítése és feltöltése.',
    icon: <span className="text-xl">📦</span>,
    category: 'sec-geometry',
    categoryName: 'Geometria',
    accentGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    grades: '5–8.',
    gradeGroup: 'middle',
    tags: ['3D Testek', 'Hálózat']
  },

  // 5. MÉRTÉKEGYSÉGEK
  {
    id: 'unit-converter',
    title: 'Hosszúság Átváltó',
    desc: 'Mértékegységek (m, dm, cm, mm) arányos skálán.',
    icon: <Scale className="w-5 h-5" />,
    category: 'sec-measurements',
    categoryName: 'Mértékegység',
    accentGradient: 'from-teal-500 to-emerald-600',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
    grades: '2–6.',
    gradeGroup: 'primary',
    tags: ['Hosszúság', 'Vonalzó']
  },
  {
    id: 'capacity-converter',
    title: 'Űrmérték Átváltó',
    desc: 'Folyadékok áttöltése és szintezése mérőhengerekbe.',
    icon: <span className="text-xl">🚰</span>,
    category: 'sec-measurements',
    categoryName: 'Mértékegység',
    accentGradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    grades: '2–6.',
    gradeGroup: 'primary',
    tags: ['Űrmérték', 'Mérőpohár']
  },

  // 6. MÉRŐESZKÖZÖK & IDŐ
  {
    id: 'analog-clock',
    title: 'Számlapos Óra',
    desc: 'Időpontok beállítása és leolvasása analóg óralapon.',
    icon: <span className="text-xl">⏰</span>,
    category: 'sec-measuring-instruments',
    categoryName: 'Mérőeszköz',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    grades: '1–4.',
    gradeGroup: 'primary',
    tags: ['Óralap', 'Idő leolvasás']
  },

  // 7. KREATÍV & NYOMTATHATÓ PDF FELADATOK
  {
    id: 'puzzle-maker',
    title: 'Keresztrejtvény Készítő',
    desc: 'Matekos keresztrejtvény generálás nyomtatható PDF-ben.',
    icon: <span className="text-xl">🧩</span>,
    category: 'sec-creative',
    categoryName: 'Nyomtatható PDF',
    accentGradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['PDF', 'Nyomtatható'],
    isPdf: true,
    badge: 'PDF'
  },
  {
    id: 'toto-maker',
    title: '13+1 Totó Készítő',
    desc: '13+1 kérdéses szavazólap készítése egyedi kulcsszóval.',
    icon: <span className="text-xl">🏆</span>,
    category: 'sec-creative',
    categoryName: 'Nyomtatható PDF',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['PDF', 'Totó'],
    isPdf: true,
    badge: 'PDF'
  },
  {
    id: 'matching-creator',
    title: 'Párosító Készítő',
    desc: 'Koordinátás vagy feladatlapos párosító feladat PDF-ben.',
    icon: <Puzzle className="w-5 h-5" />,
    category: 'sec-creative',
    categoryName: 'Nyomtatható PDF',
    accentGradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['PDF', 'Párosító'],
    isPdf: true,
    badge: 'PDF'
  },
  {
    id: 'word-search',
    title: 'Szókereső Készítő',
    desc: 'Matematikai szókereső háló megoldókulccsal és PDF exporttal.',
    icon: <span className="text-xl">🔎</span>,
    category: 'sec-creative',
    categoryName: 'Nyomtatható PDF',
    accentGradient: 'from-indigo-500 to-blue-600',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['PDF', 'Szókereső'],
    isPdf: true,
    badge: 'PDF'
  },
  {
    id: 'sudoku-generator',
    title: 'Sudoku Nyomtató',
    desc: 'Egyedi Sudoku feladványok generálása nyomtatásra készen.',
    icon: <Calculator className="w-5 h-5" />,
    category: 'sec-creative',
    categoryName: 'Nyomtatható PDF',
    accentGradient: 'from-cyan-500 to-teal-600',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    grades: 'Mindenki',
    gradeGroup: 'all',
    tags: ['PDF', 'Sudoku'],
    isPdf: true,
    badge: 'PDF'
  },

  // 8. TANÁRI ESZKÖZÖK & ÉRTÉKELÉS
  {
    id: 'student-feedback',
    title: 'Diák Visszajelző Rendszer',
    desc: 'Óra végi céltábla értékelés és 16 kérdéses felmérés PDF jelentéssel.',
    icon: <Target className="w-5 h-5" />,
    category: 'sec-teacher',
    categoryName: 'Tanári',
    accentGradient: 'from-rose-500 to-red-600',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['Céltábla', 'PDF Jelentés'],
    badge: 'ÚJ',
    isNew: true,
    isPdf: true
  },
  {
    id: 'smart-whiteboard',
    title: 'AI Interaktív Okostábla',
    desc: 'Tantermi tábla automata alakzatfelismeréssel és függvényrajzolóval.',
    icon: <span className="text-xl">🪄</span>,
    category: 'sec-teacher',
    categoryName: 'Tanári',
    accentGradient: 'from-purple-600 to-pink-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    grades: 'Tanári',
    gradeGroup: 'teacher',
    tags: ['AI Felismerés', 'Okostábla'],
    badge: 'AI'
  }
];

export const CATEGORIES_CONFIG: {
  id: ToolCategory | 'all';
  label: string;
  icon: React.ReactNode;
  count: number;
}[] = [
  { id: 'all', label: 'Összes', icon: <Sparkles className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.length },
  { id: 'sec-basics', label: 'Alapművelet', icon: <Calculator className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-basics').length },
  { id: 'sec-fractions', label: 'Törtek', icon: <Percent className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-fractions').length },
  { id: 'sec-algebra', label: 'Algebra', icon: <Variable className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-algebra').length },
  { id: 'sec-geometry', label: 'Geometria', icon: <Shapes className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-geometry').length },
  { id: 'sec-measurements', label: 'Mérték', icon: <Scale className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-measurements').length },
  { id: 'sec-measuring-instruments', label: 'Óra & Idő', icon: <Clock className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-measuring-instruments').length },
  { id: 'sec-creative', label: 'PDF Készítő', icon: <FileDown className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-creative').length },
  { id: 'sec-teacher', label: 'Tanári', icon: <GraduationCap className="w-3.5 h-3.5" />, count: TOOLS_CATALOG_DATA.filter(t => t.category === 'sec-teacher').length },
];

export const GRADE_FILTER_OPTIONS: { id: GradeGroup; label: string }[] = [
  { id: 'all', label: 'Mind' },
  { id: 'primary', label: '1–4.' },
  { id: 'middle', label: '5–8.' },
  { id: 'high', label: '9–12.' },
  { id: 'teacher', label: 'Tanári' },
];

interface ToolsCatalogProps {
  onSelectTool: (toolId: string) => void;
}

export function ToolsCatalog({ onSelectTool }: ToolsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeGroup>('all');
  const [onlyPdf, setOnlyPdf] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('diakzona_fav_tools');
      return saved ? JSON.parse(saved) : ['student-feedback', 'smart-whiteboard', 'scientific-calculator'];
    } catch {
      return ['student-feedback', 'smart-whiteboard', 'scientific-calculator'];
    }
  });

  const toggleFavorite = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('diakzona_fav_tools', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TOOLS_CATALOG_DATA.filter(tool => {
      if (onlyFavorites && !favorites.includes(tool.id)) return false;
      if (onlyPdf && !tool.isPdf) return false;
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;

      if (selectedGrade !== 'all') {
        if (selectedGrade === 'primary' && tool.gradeGroup !== 'primary' && tool.gradeGroup !== 'all') return false;
        if (selectedGrade === 'middle' && tool.gradeGroup !== 'middle' && tool.gradeGroup !== 'all') return false;
        if (selectedGrade === 'high' && tool.gradeGroup !== 'high' && tool.gradeGroup !== 'all') return false;
        if (selectedGrade === 'teacher' && tool.gradeGroup !== 'teacher') return false;
      }

      if (q) {
        const titleMatch = tool.title.toLowerCase().includes(q);
        const descMatch = tool.desc.toLowerCase().includes(q);
        const tagMatch = tool.tags.some(tag => tag.toLowerCase().includes(q));
        const categoryMatch = tool.categoryName.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !tagMatch && !categoryMatch) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedGrade, onlyPdf, onlyFavorites, favorites]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGrade('all');
    setOnlyPdf(false);
    setOnlyFavorites(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedGrade !== 'all' || onlyPdf || onlyFavorites;

  return (
    <div className="w-full max-w-[1550px] mx-auto space-y-3 pb-8 text-left animate-slide-up">
      {/* 1. ULTRA-COMPACT TOP BAR (Single row: Title + Stats + Live Search + Quick Filters) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        {/* Left: Title & Count */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold font-display text-slate-800 dark:text-slate-100 leading-none">
                Matematikai Eszköztár
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {filteredTools.length} / {TOOLS_CATALOG_DATA.length}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Gyorskeresés (pl. tört, osztás, szög, pdf)..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-primary text-slate-800 dark:text-slate-100 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Quick toggles & View Mode */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setOnlyPdf(!onlyPdf)}
            title="Csak nyomtatható PDF generátorok"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all",
              onlyPdf
                ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            )}
          >
            <Printer className="w-3 h-3" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            title="Kedvenc eszközök"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all",
              onlyFavorites
                ? "bg-amber-400 text-slate-900 border-amber-400 shadow-xs"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            )}
          >
            <Star className={cn("w-3 h-3", onlyFavorites ? "fill-slate-900" : "fill-amber-400 text-amber-400")} />
            <span className="hidden sm:inline">Kedvencek</span>
          </button>

          {/* View Mode Toggle: Grid vs Compact List */}
          <div className="hidden md:flex items-center border border-slate-200 dark:border-slate-700 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              title="Kártyás rácsnézet"
              className={cn(
                "p-1 rounded-lg text-xs transition-colors",
                viewMode === 'grid' ? "bg-white dark:bg-slate-700 text-primary shadow-xs font-bold" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Tömör listanézet"
              className={cn(
                "p-1 rounded-lg text-xs transition-colors",
                viewMode === 'compact' ? "bg-white dark:bg-slate-700 text-primary shadow-xs font-bold" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Szűrők törlése"
              className="p-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. COMPACT CATEGORY & GRADE CHIPS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                  isActive
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grade group selector */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-0.5">
          <span className="text-[10px] font-bold text-slate-400 px-1.5 flex items-center gap-1">
            <SlidersHorizontal className="w-2.5 h-2.5" /> Korosztály:
          </span>
          {GRADE_FILTER_OPTIONS.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id)}
              className={cn(
                "px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all",
                selectedGrade === g.id
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. HIGH-DENSITY TOOLS GRID (All visible on a single page) */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="text-2xl">🔍</div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Nincs találat a megadott szűrőkkel
          </h3>
          <p className="text-xs text-slate-500">
            Próbálj más keresőszót, vagy kattints a szűrők visszaállítására.
          </p>
          <button
            onClick={resetFilters}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary/90 transition-all"
          >
            Összes eszköz mutatása
          </button>
        </div>
      ) : viewMode === 'compact' ? (
        // Ultra-compact List / Tile View (2-3 columns of tight horizontal tiles)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group cursor-pointer flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-xs", tool.iconBg)}>
                  {tool.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-primary truncate">
                      {tool.title}
                    </h3>
                    {tool.badge && (
                      <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-primary/10 text-primary">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  {tool.grades}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(e, tool.id)}
                  className="p-1 text-slate-300 hover:text-amber-400"
                >
                  <Star className={cn("w-3 h-3", favorites.includes(tool.id) ? "fill-amber-400 text-amber-400" : "")} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // High-Density Card Grid (5-6 columns on large screens, compact height)
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
          {filteredTools.map((tool) => (
            <CompactToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={(e) => toggleFavorite(e, tool.id)}
              onSelect={() => onSelectTool(tool.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 4. HIGH-DENSITY COMPACT CARD COMPONENT (~110px height, high visual hierarchy)
interface CompactToolCardProps {
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onSelect: () => void;
}

function CompactToolCard({ tool, isFavorite, onToggleFavorite, onSelect }: CompactToolCardProps) {
  return (
    <div
      onClick={onSelect}
      className="group relative cursor-pointer flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-primary/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-2.5 sm:p-3 overflow-hidden text-left"
    >
      {/* Top Category Accent Line */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", tool.accentGradient)} />

      <div>
        {/* Top Mini Header: Icon + Grade + Badge + Favorite */}
        <div className="flex items-center justify-between gap-1 mb-2 pt-0.5">
          <div className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform",
            tool.iconBg
          )}>
            {tool.icon}
          </div>

          <div className="flex items-center gap-1">
            {tool.badge && (
              <span className={cn(
                "text-[9px] font-extrabold px-1.5 py-0.2 rounded-md tracking-wider uppercase",
                tool.isNew
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                  : tool.isPdf
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
              )}>
                {tool.badge}
              </span>
            )}

            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">
              {tool.grades}
            </span>

            <button
              type="button"
              onClick={onToggleFavorite}
              title={isFavorite ? "Eltávolítás" : "Kedvencekhez adás"}
              className="p-0.5 rounded text-slate-300 hover:text-amber-400"
            >
              <Star className={cn("w-3 h-3", isFavorite ? "fill-amber-400 text-amber-400" : "")} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors leading-snug line-clamp-1">
          {tool.title}
        </h3>

        {/* Description (2 lines concise) */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2 mt-1 min-h-[26px]">
          {tool.desc}
        </p>
      </div>

      {/* Footer: Category name + Glide Arrow */}
      <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-semibold text-slate-400">
        <span className="truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
          {tool.categoryName}
        </span>
        <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
    </div>
  );
}
