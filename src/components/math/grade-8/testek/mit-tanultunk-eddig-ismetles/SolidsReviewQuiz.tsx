import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Box,
  Layers,
  Cylinder,
  Calculator,
  Compass,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  Ruler,
  Droplets,
  Scale,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { SolidsReviewMatcher } from './SolidsReviewMatcher';
import { SolidsReviewSorter } from './SolidsReviewSorter';

interface SolidsReviewQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-cube',
    title: 'A Kocka Képletei (élhossz: a)',
    icon: <Box className="w-4 h-4 text-indigo-600" />,
    formula: 'A = 6a^2, \\quad V = a^3, \\quad d_{test} = a\\sqrt{3}',
    note: '6 egybevágó négyzetlap határolja. Lapátló: dlap = a√2, térbeli belső testátló: dtest = a√3.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="55" height="34" rx="4" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
        <text x="42" y="23" className="text-[7px] font-black fill-indigo-900" textAnchor="middle">A = 6a²</text>
        <text x="42" y="34" className="text-[7px] font-bold fill-indigo-700" textAnchor="middle">V = a³</text>
        <text x="115" y="20" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">Testátló:</text>
        <text x="115" y="32" className="text-[7px] font-mono font-black fill-rose-600" textAnchor="middle">d = a√3</text>
      </svg>
    )
  },
  {
    id: 'cs-cuboid',
    title: 'A Téglatest Képletei (a, b, c)',
    icon: <Layers className="w-4 h-4 text-purple-600" />,
    formula: 'A = 2(ab + bc + ac), \\quad V = a \\cdot b \\cdot c, \\quad d = \\sqrt{a^2 + b^2 + c^2}',
    note: '6 téglalaplap határolja. A térbeli testátlót a Pitagorasz-tétel térbeli alakjával számoljuk.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="60" height="34" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
        <text x="40" y="23" className="text-[6px] font-black fill-purple-900" textAnchor="middle">2(ab+bc+ac)</text>
        <text x="40" y="34" className="text-[7px] font-bold fill-purple-700" textAnchor="middle">V = a·b·c</text>
        <text x="115" y="22" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">d = √(a²+b²+c²)</text>
      </svg>
    )
  },
  {
    id: 'cs-prism',
    title: 'Egyenes Hasábok (alapterület: Ta, testmagasság: m)',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: 'V = T_a \\cdot m, \\quad A = 2T_a + T_p = 2T_a + K_a \\cdot m',
    note: 'A palást kiterítve egy téglalap, melynek szélessége az alapkerület (Ka), magassága pedig m.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="55" height="34" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1" />
        <text x="42" y="22" className="text-[7px] font-black fill-emerald-900" textAnchor="middle">V = Ta · m</text>
        <text x="42" y="34" className="text-[6.5px] font-bold fill-emerald-700" textAnchor="middle">Tp = Ka · m</text>
        <text x="115" y="22" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">A = 2Ta + Tp</text>
      </svg>
    )
  },
  {
    id: 'cs-cylinder',
    title: 'Forgáshenger (sugár: r, magasság: m)',
    icon: <Cylinder className="w-4 h-4 text-cyan-600" />,
    formula: 'A = 2r^2\\pi + 2r\\pi m = 2r\\pi(r + m), \\quad V = r^2\\pi \\cdot m',
    note: 'Alaplapja r sugarú körlap (Ta = r²π, Ka = 2rπ). Kiterített palástja egy 2rπ × m téglalap.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="55" height="34" rx="4" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1" />
        <text x="42" y="22" className="text-[6.5px] font-black fill-cyan-900" textAnchor="middle">V = r²π · m</text>
        <text x="42" y="34" className="text-[6px] font-bold fill-cyan-700" textAnchor="middle">A = 2rπ(r+m)</text>
        <text x="115" y="22" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">Tp = 2rπ · m</text>
      </svg>
    )
  },
  {
    id: 'cs-units',
    title: 'Mértékegységek és Űrmérték (Váltószám 1000)',
    icon: <Droplets className="w-4 h-4 text-blue-600" />,
    formula: '1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ liter}, \\quad 1\\text{ dm}^3 = 1\\text{ liter} = 1000\\text{ cm}^3',
    note: '1 cm³ = 1 ml, 1 liter = 10 dl = 100 cl = 1000 ml. 1 m³ = 10 hektoliter (hl).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
        <text x="80" y="23" className="text-[7.5px] font-black fill-blue-900" textAnchor="middle">1 dm³ = 1 liter = 1000 cm³</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-blue-700" textAnchor="middle">1 m³ = 1000 liter = 10 hl</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Mértékegységek',
    subtitle: 'Alapvető térgeometriai mértékegység-váltások, kocka, téglatest és hasáb alapszámítások',
    range: '1 - 10. feladat',
    focus: 'Alapok & Képletek',
    questions: [
      {
        id: 'sr-l1-q1',
        prompt: 'Hány liter víz fér el egy 1 m³ űrtartalmú tartályban?',
        options: ['1000 liter', '100 liter', '10 000 liter', '10 liter'],
        correctAnswer: '1000 liter',
        explanation: '1 m³ = 1000 dm³. Mivel 1 dm³ = 1 liter, így 1 m³ pontosan 1000 liter vizet tartalmaz.',
        breakdown: [
          { label: '1. lépés', value: '1 m³ = 1000 dm³ (a térfogat váltószáma 1000).' },
          { label: '2. lépés', value: '1 dm³ = 1 liter.' },
          { label: '3. lépés', value: 'Így 1 m³ = 1000 liter.' }
        ]
      },
      {
        id: 'sr-l1-q2',
        prompt: 'Egy kocka éle a = 4 cm. Mennyi a kocka térfogata (V)?',
        options: ['64 cm³', '48 cm³', '16 cm³', '96 cm³'],
        correctAnswer: '64 cm³',
        explanation: 'A kocka térfogata V = a³ = 4³ = 4 · 4 · 4 = 64 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = a³' },
          { label: 'Behelyettesítés', value: 'V = 4³ = 4 · 4 · 4 = 64 cm³' }
        ]
      },
      {
        id: 'sr-l1-q3',
        prompt: 'Egy kocka éle a = 3 cm. Mennyi a kocka felszíne (A)?',
        options: ['54 cm²', '27 cm²', '36 cm²', '18 cm²'],
        correctAnswer: '54 cm²',
        explanation: 'A kocka felszíne 6 egybevágó négyzetlap területének összege: A = 6 · a² = 6 · 3² = 6 · 9 = 54 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 6 · a²' },
          { label: 'Lap területe', value: 'a² = 3² = 9 cm²' },
          { label: '6 lap területe', value: 'A = 6 · 9 = 54 cm²' }
        ]
      },
      {
        id: 'sr-l1-q4',
        prompt: 'Egy téglatest élei a = 2 cm, b = 5 cm és c = 10 cm. Mennyi a térfogata?',
        options: ['100 cm³', '17 cm³', '140 cm³', '70 cm³'],
        correctAnswer: '100 cm³',
        explanation: 'A téglatest térfogata a három különböző él szorzata: V = a · b · c = 2 · 5 · 10 = 100 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = a · b · c' },
          { label: 'Számítás', value: 'V = 2 · 5 · 10 = 10 · 10 = 100 cm³' }
        ]
      },
      {
        id: 'sr-l1-q5',
        prompt: 'Egy egyenes hasáb alapterülete Ta = 25 cm², testmagassága m = 8 cm. Mennyi a hasáb térfogata?',
        options: ['200 cm³', '100 cm³', '33 cm³', '400 cm³'],
        correctAnswer: '200 cm³',
        explanation: 'Bármely egyenes hasáb térfogata az alapterület és a testmagasság szorzata: V = Ta · m = 25 · 8 = 200 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = Ta · m' },
          { label: 'Behelyettesítés', value: 'V = 25 · 8 = 200 cm³' }
        ]
      },
      {
        id: 'sr-l1-q6',
        prompt: 'Milyen síkidom keletkezik egy egyenes körhenger palástjának síkba kiterítésével?',
        options: ['Téglalap', 'Kör', 'Háromszög', 'Trapéz'],
        correctAnswer: 'Téglalap',
        explanation: 'A hengerpalást kiterítve egy téglalap, melynek oldalai az alapkör kerülete (2rπ) és a henger magassága (m).',
        breakdown: [
          { label: 'Alakzat', value: 'Téglalap' },
          { label: 'Méretei', value: 'Egyik oldala 2rπ (alapkerület), másik oldala m (magasság).' }
        ]
      },
      {
        id: 'sr-l1-q7',
        prompt: 'Hány lapja, éle és csúcsa van egy téglatestnek?',
        options: ['6 lap, 12 él, 8 csúcs', '8 lap, 12 él, 6 csúcs', '6 lap, 8 él, 12 csúcs', '4 lap, 6 él, 4 csúcs'],
        correctAnswer: '6 lap, 12 él, 8 csúcs',
        explanation: 'A téglatestet 6 téglalap határolja, 12 éle és 8 csúcsa van (Euler-tétel: 6 + 8 - 12 = 2).',
        breakdown: [
          { label: 'Lapok', value: '6 téglalap' },
          { label: 'Élek', value: '12 él' },
          { label: 'Csúcsok', value: '8 csúcs' }
        ]
      },
      {
        id: 'sr-l1-q8',
        prompt: 'Hány cm³ víz van egy 2,5 literes kancsóban tele töltve?',
        options: ['2500 cm³', '250 cm³', '25 000 cm³', '25 cm³'],
        correctAnswer: '2500 cm³',
        explanation: '1 liter = 1 dm³ = 1000 cm³. Így 2,5 liter = 2,5 · 1000 = 2500 cm³.',
        breakdown: [
          { label: '1. lépés', value: '2,5 liter = 2,5 dm³' },
          { label: '2. lépés', value: '1 dm³ = 1000 cm³' },
          { label: '3. lépés', value: '2,5 · 1000 = 2500 cm³' }
        ]
      },
      {
        id: 'sr-l1-q9',
        prompt: 'Egy körhenger alapkörének sugara r = 5 cm, magassága m = 10 cm. Mennyi a térfogata π ≈ 3,14 értékkel számolva?',
        options: ['785 cm³', '157 cm³', '314 cm³', '1570 cm³'],
        correctAnswer: '785 cm³',
        explanation: 'V = r² · π · m = 5² · 3,14 · 10 = 25 · 3,14 · 10 = 78,5 · 10 = 785 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = r² · π · m' },
          { label: 'Alapterület', value: 'Ta = 5² · 3,14 = 25 · 3,14 = 78,5 cm²' },
          { label: 'Térfogat', value: 'V = 78,5 · 10 = 785 cm³' }
        ]
      },
      {
        id: 'sr-l1-q10',
        prompt: 'Hány négyzetdeciméter (dm²) 1,5 m² felület?',
        options: ['150 dm²', '15 dm²', '1500 dm²', '1,5 dm²'],
        correctAnswer: '150 dm²',
        explanation: 'A területnél (felszínnél) a szomszédos mértékegységek közötti váltószám 100: 1 m² = 100 dm², így 1,5 m² = 1,5 · 100 = 150 dm².',
        breakdown: [
          { label: 'Váltószám', value: '1 m² = 100 dm² (nem 10!)' },
          { label: 'Számítás', value: '1,5 · 100 = 150 dm²' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Gyakorlati Számítások és Testátlók',
    subtitle: 'Felszínek, térfogatok, testátlók számítása és hiányzó adatok meghatározása',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Alkalmazás',
    questions: [
      {
        id: 'sr-l2-q1',
        prompt: 'Egy kocka térfogata V = 125 cm³. Mennyi a kocka felszíne (A)?',
        options: ['150 cm²', '125 cm²', '100 cm²', '75 cm²'],
        correctAnswer: '150 cm²',
        explanation: 'V = a³ = 125 cm³ ⟹ a = 5 cm. A felszín: A = 6 · a² = 6 · 5² = 6 · 25 = 150 cm².',
        breakdown: [
          { label: 'Élhossz', value: 'a = ∛125 = 5 cm' },
          { label: 'Felszín képlete', value: 'A = 6 · a²' },
          { label: 'Felszín értéke', value: 'A = 6 · 25 = 150 cm²' }
        ]
      },
      {
        id: 'sr-l2-q2',
        prompt: 'Egy téglatest élei a = 3 cm, b = 4 cm és c = 12 cm. Mekkora a testátlója (d)?',
        options: ['13 cm', '15 cm', '19 cm', '12,5 cm'],
        correctAnswer: '13 cm',
        explanation: 'd = √(a² + b² + c²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm.',
        breakdown: [
          { label: 'Pitagorasz térben', value: 'd = √(a² + b² + c²)' },
          { label: 'Négyzetek összege', value: '9 + 16 + 144 = 169' },
          { label: 'Gyökvonás', value: 'd = √169 = 13 cm' }
        ]
      },
      {
        id: 'sr-l2-q3',
        prompt: 'Egy téglatest élei a = 2 cm, b = 3 cm és c = 5 cm. Mennyi a felszíne (A)?',
        options: ['62 cm²', '31 cm²', '30 cm²', '60 cm²'],
        correctAnswer: '62 cm²',
        explanation: 'A = 2 · (ab + bc + ac) = 2 · (2·3 + 3·5 + 2·5) = 2 · (6 + 15 + 10) = 2 · 31 = 62 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 2(ab + bc + ac)' },
          { label: 'Lapok összege', value: 'ab + bc + ac = 6 + 15 + 10 = 31 cm²' },
          { label: 'Teljes felszín', value: '2 · 31 = 62 cm²' }
        ]
      },
      {
        id: 'sr-l2-q4',
        prompt: 'Egy háromszög alapú egyenes hasáb alapja egy derékszögű háromszög, melynek befogói 6 cm és 8 cm. A hasáb testmagassága m = 10 cm. Mennyi a hasáb térfogata?',
        options: ['240 cm³', '480 cm³', '120 cm³', '180 cm³'],
        correctAnswer: '240 cm³',
        explanation: 'Alapterület: Ta = (6 · 8) / 2 = 24 cm². Térfogat: V = Ta · m = 24 · 10 = 240 cm³.',
        breakdown: [
          { label: 'Alapterület', value: 'Ta = (a · b) / 2 = (6 · 8) / 2 = 24 cm²' },
          { label: 'Térfogat', value: 'V = Ta · m = 24 · 10 = 240 cm³' }
        ]
      },
      {
        id: 'sr-l2-q5',
        prompt: 'A fenti háromszög alapú hasáb alapháromszögének átfogója c = 10 cm (Pitagorasz: √(6²+8²)=10). Mennyi a hasáb teljes felszíne (A)?',
        options: ['288 cm²', '240 cm²', '264 cm²', '336 cm²'],
        correctAnswer: '288 cm²',
        explanation: 'Alapkerület: Ka = 6 + 8 + 10 = 24 cm. Palást: Tp = Ka · m = 24 · 10 = 240 cm². Felszín: A = 2Ta + Tp = 2 · 24 + 240 = 48 + 240 = 288 cm².',
        breakdown: [
          { label: 'Alapkerület (Ka)', value: 'Ka = 6 + 8 + 10 = 24 cm' },
          { label: 'Palást (Tp)', value: 'Tp = Ka · m = 24 · 10 = 240 cm²' },
          { label: 'Teljes felszín', value: 'A = 2 · 24 + 240 = 48 + 240 = 288 cm²' }
        ]
      },
      {
        id: 'sr-l2-q6',
        prompt: 'Egy egyenes körhenger alapkörének sugara r = 3 cm, magassága m = 7 cm. Mennyi a henger teljes felszíne?',
        options: ['60π ≈ 188,4 cm²', '42π ≈ 131,9 cm²', '90π ≈ 282,6 cm²', '30π ≈ 94,2 cm²'],
        correctAnswer: '60π ≈ 188,4 cm²',
        explanation: 'A = 2rπ(r + m) = 2 · 3 · π · (3 + 7) = 6π · 10 = 60π ≈ 188,4 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 2r²π + 2rπm = 2rπ(r + m)' },
          { label: 'Két alaplap', value: '2 · Ta = 2 · 3²π = 18π cm²' },
          { label: 'Palást', value: 'Tp = 2 · 3 · π · 7 = 42π cm²' },
          { label: 'Felszín', value: '18π + 42π = 60π ≈ 188,4 cm²' }
        ]
      },
      {
        id: 'sr-l2-q7',
        prompt: 'Egy téglatest térfogata V = 180 cm³, két éle a = 4 cm és b = 5 cm. Milyen hosszú a harmadik éle (c)?',
        options: ['9 cm', '8 cm', '10 cm', '6 cm'],
        correctAnswer: '9 cm',
        explanation: 'V = a · b · c ⟹ 180 = 4 · 5 · c = 20 · c ⟹ c = 180 / 20 = 9 cm.',
        breakdown: [
          { label: 'Alapterület', value: 'a · b = 4 · 5 = 20 cm²' },
          { label: 'Harmadik él', value: 'c = V / (a · b) = 180 / 20 = 9 cm' }
        ]
      },
      {
        id: 'sr-l2-q8',
        prompt: 'Egy téglatest alakú medence hossza 5 m, szélessége 3 m, vízmélysége 1,6 m. Hány liter víz van benne?',
        options: ['24 000 liter', '2400 liter', '240 000 liter', '240 liter'],
        correctAnswer: '24 000 liter',
        explanation: 'V = 5 · 3 · 1,6 = 24 m³. Mivel 1 m³ = 1000 liter, így 24 m³ = 24 · 1000 = 24 000 liter.',
        breakdown: [
          { label: 'Térfogat köbméterben', value: 'V = 5 · 3 · 1,6 = 24 m³' },
          { label: 'Átváltás literre', value: '24 · 1000 = 24 000 liter' }
        ]
      },
      {
        id: 'sr-l2-q9',
        prompt: 'Egy kocka lapátlójának hossza dlap = 6√2 cm. Milyen hosszú a kocka éle és a testátlója?',
        options: ['a = 6 cm, d = 6√3 cm', 'a = 6 cm, d = 12 cm', 'a = 3 cm, d = 3√3 cm', 'a = 6√2 cm, d = 6√6 cm'],
        correctAnswer: 'a = 6 cm, d = 6√3 cm',
        explanation: 'dlap = a√2 = 6√2 ⟹ a = 6 cm. A testátló dtest = a√3 = 6√3 cm.',
        breakdown: [
          { label: 'Lapátló', value: 'dlap = a√2 = 6√2 ⟹ a = 6 cm' },
          { label: 'Testátló', value: 'dtest = a√3 = 6√3 cm (≈ 10,39 cm)' }
        ]
      },
      {
        id: 'sr-l2-q10',
        prompt: 'Egy henger alakú konzervdoboz magassága m = 10 cm, alapkörének átmérője d = 8 cm (sugara r = 4 cm). Mennyi a palástjának területe (Tp)?',
        options: ['80π ≈ 251,2 cm²', '40π ≈ 125,6 cm²', '160π ≈ 502,4 cm²', '64π ≈ 201 cm²'],
        correctAnswer: '80π ≈ 251,2 cm²',
        explanation: 'A sugár r = d / 2 = 4 cm. A palást területe Tp = 2rπ · m = 2 · 4 · π · 10 = 80π ≈ 251,2 cm².',
        breakdown: [
          { label: 'Sugár', value: 'r = 8 / 2 = 4 cm' },
          { label: 'Palástterület', value: 'Tp = 2rπ · m = 2 · 4 · π · 10 = 80π ≈ 251,2 cm²' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesterfok és Haladó Összefüggések',
    subtitle: 'Életszerű összetett problémák, sűrűség- és tömegszámítás, arányok és alaktani kérdések',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    questions: [
      {
        id: 'sr-l3-q1',
        prompt: 'Ha egy kocka minden élét kétszeresére növeljük, hányszorosára nő a felszíne és a térfogata?',
        options: ['A: 4-szeresére, V: 8-szorosára', 'A: 2-szeresére, V: 4-szeresére', 'A: 4-szeresére, V: 6-szorosára', 'A: 8-szorosára, V: 8-szorosára'],
        correctAnswer: 'A: 4-szeresére, V: 8-szorosára',
        explanation: 'A felszín a skálafaktor négyzetével nő: 2² = 4-szeresére. A térfogat a köbével nő: 2³ = 8-szorosára.',
        breakdown: [
          { label: 'Felszín', value: 'A\' = 6 · (2a)² = 6 · 4a² = 4 · (6a²) ⟹ 4-szeres' },
          { label: 'Térfogat', value: 'V\' = (2a)³ = 8a³ = 8 · V ⟹ 8-szoros' }
        ]
      },
      {
        id: 'sr-l3-q2',
        prompt: 'Egy vasból készült tömör kocka élhossza a = 10 cm = 1 dm. A vas sűrűsége ρ = 7,8 kg/dm³. Mekkora a kocka tömege?',
        options: ['7,8 kg', '78 kg', '0,78 kg', '780 g'],
        correctAnswer: '7,8 kg',
        explanation: 'V = a³ = 1 dm³. A tömeg m = ρ · V = 7,8 kg/dm³ · 1 dm³ = 7,8 kg.',
        breakdown: [
          { label: 'Térfogat dm³-ben', value: 'V = (1 dm)³ = 1 dm³' },
          { label: 'Tömeg kiszámítása', value: 'm = ρ · V = 7,8 · 1 = 7,8 kg' }
        ]
      },
      {
        id: 'sr-l3-q3',
        prompt: 'Egy téglatest éleinek aránya 1 : 2 : 3, térfogata pedig V = 48 cm³. Milyen hosszúak az élei?',
        options: ['2 cm, 4 cm, 6 cm', '1 cm, 2 cm, 3 cm', '3 cm, 6 cm, 9 cm', '2 cm, 3 cm, 8 cm'],
        correctAnswer: '2 cm, 4 cm, 6 cm',
        explanation: 'Legyenek az élek x, 2x, 3x. V = x · 2x · 3x = 6x³ = 48 ⟹ x³ = 8 ⟹ x = 2 cm. Az élek: 2 cm, 4 cm, 6 cm.',
        breakdown: [
          { label: 'Egyenlet felírása', value: 'x · 2x · 3x = 6x³ = 48' },
          { label: 'x meghatározása', value: 'x³ = 8 ⟹ x = 2 cm' },
          { label: 'Élek', value: 'a = 2 cm, b = 4 cm, c = 6 cm' }
        ]
      },
      {
        id: 'sr-l3-q4',
        prompt: 'A fenti téglatestnek (a = 2 cm, b = 4 cm, c = 6 cm) mennyi a teljes felszíne (A)?',
        options: ['88 cm²', '44 cm²', '96 cm²', '64 cm²'],
        correctAnswer: '88 cm²',
        explanation: 'A = 2 · (ab + bc + ac) = 2 · (2·4 + 4·6 + 2·6) = 2 · (8 + 24 + 12) = 2 · 44 = 88 cm².',
        breakdown: [
          { label: 'Lapok területei', value: '8 + 24 + 12 = 44 cm²' },
          { label: 'Kétszerese', value: '2 · 44 = 88 cm²' }
        ]
      },
      {
        id: 'sr-l3-q5',
        prompt: 'Egy szabályos hatszög alapú egyenes hasáb alapélének hossza a = 4 cm, magassága m = 10 cm. Mennyi a hasáb térfogata? (A szabályos hatszög 6 db 4 cm-es szabályos háromszögből áll: Ta = 6 · (a²√3)/4 = 24√3 cm² ≈ 41,57 cm²)',
        options: ['240√3 ≈ 415,7 cm³', '120√3 ≈ 207,8 cm³', '480√3 ≈ 831,4 cm³', '160 cm³'],
        correctAnswer: '240√3 ≈ 415,7 cm³',
        explanation: 'V = Ta · m = 24√3 · 10 = 240√3 ≈ 415,7 cm³.',
        breakdown: [
          { label: 'Alapterület (Ta)', value: 'Ta = 6 · (4²√3 / 4) = 24√3 cm²' },
          { label: 'Térfogat (V)', value: 'V = Ta · m = 24√3 · 10 = 240√3 ≈ 415,7 cm³' }
        ]
      },
      {
        id: 'sr-l3-q6',
        prompt: 'Egy felül nyitott, henger alakú esővízgyűjtő hordó alapkörének sugara r = 40 cm = 4 dm, magassága m = 100 cm = 10 dm. Hány liter víz fér bele tele töltve (π ≈ 3,14)?',
        options: ['502,4 liter', '2009,6 liter', '125,6 liter', '251,2 liter'],
        correctAnswer: '502,4 liter',
        explanation: 'V = r² · π · m = 4² · 3,14 · 10 = 16 · 3,14 · 10 = 50,24 · 10 = 502,4 dm³ = 502,4 liter.',
        breakdown: [
          { label: 'Adatok dm-ben', value: 'r = 4 dm, m = 10 dm' },
          { label: 'Térfogat dm³-ben', value: 'V = 4² · 3,14 · 10 = 16 · 31,4 = 502,4 dm³' },
          { label: 'Literben', value: '1 dm³ = 1 liter ⟹ 502,4 liter' }
        ]
      },
      {
        id: 'sr-l3-q7',
        prompt: 'Egy 20 cm × 20 cm alapú és 30 cm magas téglatest alakú akváriumba 8 liter (= 8000 cm³) vizet töltünk. Milyen magasan fog állni a víz az akváriumban?',
        options: ['20 cm', '15 cm', '25 cm', '10 cm'],
        correctAnswer: '20 cm',
        explanation: 'Az akvárium alapterülete Ta = 20 · 20 = 400 cm². A víz magassága: h = V / Ta = 8000 / 400 = 20 cm.',
        breakdown: [
          { label: 'Alapterület', value: 'Ta = 20 · 20 = 400 cm²' },
          { label: 'Térfogat cm³-ben', value: '8 liter = 8000 cm³' },
          { label: 'Vízmagasság', value: 'h = 8000 / 400 = 20 cm' }
        ]
      },
      {
        id: 'sr-l3-q8',
        prompt: 'Egy üreges hengeres vascső hossza L = 100 cm, külső sugara R = 5 cm, belső sugara r = 4 cm. Mennyi a cső falát alkotó vas térfogata (π ≈ 3,14)?',
        options: ['2826 cm³ (900π)', '1256 cm³ (400π)', '5652 cm³ (1800π)', '3140 cm³ (1000π)'],
        correctAnswer: '2826 cm³ (900π)',
        explanation: 'A cső alaplapja egy körgyűrű: Ta = (R² - r²)π = (25 - 16)π = 9π cm². V = Ta · L = 9π · 100 = 900π ≈ 2826 cm³.',
        breakdown: [
          { label: 'Körgyűrű területe', value: 'Ta = (5² - 4²) · π = (25 - 16)π = 9π cm²' },
          { label: 'Fal térfogata', value: 'V = 9π · 100 = 900π ≈ 2826 cm³' }
        ]
      },
      {
        id: 'sr-l3-q9',
        prompt: 'Egy kocka testátlója d = 9 cm. Mennyi a kocka teljes felszíne (A)? (Használd: d = a√3 ⟹ a² = d²/3)',
        options: ['162 cm²', '243 cm²', '108 cm²', '81 cm²'],
        correctAnswer: '162 cm²',
        explanation: 'd = a√3 ⟹ a² = d² / 3 = 9² / 3 = 81 / 3 = 27 cm². A felszín: A = 6 · a² = 6 · 27 = 162 cm².',
        breakdown: [
          { label: 'Lap területe (a²)', value: 'd = a√3 ⟹ a = 9/√3 ⟹ a² = 81 / 3 = 27 cm²' },
          { label: 'Felszín (A)', value: 'A = 6 · a² = 6 · 27 = 162 cm²' }
        ]
      },
      {
        id: 'sr-l3-q10',
        prompt: 'Egy téglatest alakú fadoboz külső méretei 12 cm × 10 cm × 8 cm. A deszkák vastagsága minden oldalon 1 cm (alul és felül is). Mennyi a doboz belső űrtartalma (Vbelső)?',
        options: ['480 cm³', '960 cm³', '640 cm³', '360 cm³'],
        correctAnswer: '480 cm³',
        explanation: 'Minden irányban 2 · 1 = 2 cm-t kell levonni a falvastagság miatt: a = 12-2 = 10 cm, b = 10-2 = 8 cm, c = 8-2 = 6 cm. Vbelső = 10 · 8 · 6 = 480 cm³.',
        breakdown: [
          { label: 'Belső méretek', value: 'a = 12-2 = 10 cm, b = 10-2 = 8 cm, c = 8-2 = 6 cm' },
          { label: 'Belső térfogat', value: 'Vbelső = 10 · 8 · 6 = 480 cm³' }
        ]
      }
    ]
  }
};

export const SolidsReviewQuiz: React.FC<SolidsReviewQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Mit tanultunk eddig? (Térgeometriai Ismétlés)"
      subtitle="Kocka, téglatest, hasábok és forgáshenger felszíne, térfogata és mértékegységei"
      topicId="g8-solids-review"
      documentId="g8-solids-review"
      badge="8. Osztály • VI. Testek"
      topicBadge="8. OSZTÁLY • VI. TESTEK • 📐 1. KVÍZ"
      badgeText="8. OSZTÁLY • VI. TESTEK • 📐 1. KVÍZ"
      badgeColor="indigo"
      themeColor="indigo"
      emoji="📐"
      cheatSheetTitle="Térgeometriai Képtár és Képlettár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az alakzatokat a képletekkel és számításokkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Képletek',
              subtitle: 'Párosítsd a testeket és fogalmakat képleteikkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Mértékegység Átváltások és Számítások',
              subtitle: 'Számítások és átváltások párosítása',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Átváltások'
            },
            3: {
              title: '3. Szint: Térbeli Tulajdonságok és Gyakorlati Kérdések',
              subtitle: 'Haladó térgeometriai összefüggések párosítása',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <SolidsReviewMatcher
              key={`sr-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a testeket, mértékegységeket és állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Testek Kategóriái és Képletei',
              subtitle: 'Csoportosítsd: Kocka és Téglatest / Egyenes Hasábok / Forgáshenger!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alakzatok'
            },
            2: {
              title: '2. Szint: Mértékegységek Dimenziója',
              subtitle: 'Sorold be: Térfogat (3D) / Felszín (2D) / Hosszúság (1D)!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Dimenziók'
            },
            3: {
              title: '3. Szint: Geometriai Állítások Igazságértéke',
              subtitle: 'Döntsd el: Mindig Igaz / Csak Néha / Mindig Hamis!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Logika'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <SolidsReviewSorter
              key={`sr-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={SolidsReviewMatcher}
      sorterComponent={SolidsReviewSorter}
    />
  );
};

export default SolidsReviewQuiz;
