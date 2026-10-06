import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Box,
  Layers,
  Cylinder,
  Triangle,
  Circle,
  Globe,
  Calculator,
  Compass,
  Sparkles,
  Ruler,
  Maximize2,
  ArrowRightLeft,
  LayoutGrid,
  Award,
  Scale
} from 'lucide-react';
import { SolidsSummaryMatcher } from './SolidsSummaryMatcher';
import { SolidsSummarySorter } from './SolidsSummarySorter';

interface SolidsSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-prisms',
    title: 'Hasábok és Henger (Egyenes testek)',
    icon: <Box className="w-4 h-4 text-indigo-600" />,
    formula: 'V = T_a \\cdot m, \\quad T_p = K_a \\cdot m, \\quad A = 2T_a + T_p',
    note: 'Két párhuzamos, egybevágó alaplap határolja. Henger esetén: T_a = r^2\\pi, T_p = 2\\pi r m.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="8" width="40" height="34" rx="2" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
        <text x="40" y="24" className="text-[7px] font-bold fill-indigo-900" textAnchor="middle">Hasáb</text>
        <text x="40" y="34" className="text-[6px] fill-indigo-700" textAnchor="middle">V = T_a·m</text>
        <ellipse cx="115" cy="14" rx="18" ry="5" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
        <line x1="97" y1="14" x2="97" y2="38" stroke="#4338ca" strokeWidth="1" />
        <line x1="133" y1="14" x2="133" y2="38" stroke="#4338ca" strokeWidth="1" />
        <path d="M 97 38 A 18 5 0 0 0 133 38" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
        <text x="115" y="30" className="text-[6.5px] font-bold fill-indigo-900" textAnchor="middle">Henger</text>
      </svg>
    )
  },
  {
    id: 'cs-pyramids',
    title: 'Gúlák és Kúp (Csúcsos testek)',
    icon: <Triangle className="w-4 h-4 text-purple-600" />,
    formula: 'V = \\frac{T_a \\cdot m}{3}, \\quad A = T_a + T_p, \\quad m_o = \\sqrt{m^2 + (a/2)^2}',
    note: 'Térfogata mindig harmadrésze az azonos alapterületű és magasságú hasábnak. Kúp: T_p = r\\pi a, a = \\sqrt{m^2 + r^2}.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,8 18,40 55,42" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
        <polygon points="40,8 55,42 62,35" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.2" />
        <text x="38" y="28" className="text-[6.5px] font-bold fill-purple-900" textAnchor="middle">V=Ta·m/3</text>
        <line x1="115" y1="8" x2="95" y2="40" stroke="#6d28d9" strokeWidth="1" />
        <line x1="115" y1="8" x2="135" y2="40" stroke="#6d28d9" strokeWidth="1" />
        <path d="M 95 40 A 20 6 0 0 0 135 40" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
        <text x="115" y="30" className="text-[6.5px] font-bold fill-purple-900" textAnchor="middle">Kúp</text>
      </svg>
    )
  },
  {
    id: 'cs-sphere',
    title: 'Gömb és a Föld Modellje',
    icon: <Globe className="w-4 h-4 text-teal-600" />,
    formula: 'A = 4\\pi r^2, \\quad V = \\frac{4}{3}\\pi r^3, \\quad R_{\\text{Föld}} \\approx 6370\\text{ km}, \\quad K \\approx 40\\,000\\text{ km}',
    note: 'Arkhimédész tétele: A hengerbe írt gömb térfogata és felszíne is a köré írt 2r magas henger 2/3 része.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="20" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
        <ellipse cx="80" cy="25" rx="20" ry="6" fill="none" stroke="#0f766e" strokeWidth="1" strokeDasharray="3 2" />
        <text x="80" y="22" className="text-[6.5px] font-bold fill-teal-900" textAnchor="middle">A = 4πr²</text>
        <text x="80" y="32" className="text-[5.5px] fill-teal-800" textAnchor="middle">V = 4/3 πr³</text>
      </svg>
    )
  },
  {
    id: 'cs-scaling',
    title: 'Hasonlóság és Átváltások',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: 'k \\implies \\text{Hossz} \\times k, \\quad \\text{Felszín} \\times k^2, \\quad \\text{Térfogat/Tömeg} \\times k^3',
    note: '1 m³ = 1000 dm³ = 1000 liter = 1 000 000 cm³. Sűrűség: m = ρ · V.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="80" y="22" className="text-[7.5px] font-black fill-amber-900" textAnchor="middle">k ⟶ k² ⟶ k³</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-amber-800" textAnchor="middle">1 m³ = 1000 liter = 1000 dm³</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Képletek',
    subtitle: 'Kocka, téglatest, hasáb, gúla, henger, kúp, gömb és mértékegységek alapszámításai',
    range: '1 - 30. feladat',
    focus: 'Képletek és Alapok',
    questions: [
      {
        id: 'sq-l1-q1',
        prompt: 'Egy kocka éle a = 5 cm. Mennyi a térfogata (V)?',
        options: ['125 cm³', '25 cm³', '150 cm³', '75 cm³'],
        correctAnswer: '125 cm³',
        explanation: 'A kocka térfogata: V = a³ = 5³ = 125 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = a³' },
          { label: 'Számítás', value: '5 · 5 · 5 = 125 cm³' }
        ]
      },
      {
        id: 'sq-l1-q2',
        prompt: 'Egy kocka éle a = 4 cm. Mennyi a felszíne (A)?',
        options: ['96 cm²', '64 cm²', '24 cm²', '16 cm²'],
        correctAnswer: '96 cm²',
        explanation: 'A kocka felszíne 6 darab egybevágó négyzetlap területének összege: A = 6 · a² = 6 · 16 = 96 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 6 · a²' },
          { label: 'Számítás', value: '6 · 16 = 96 cm²' }
        ]
      },
      {
        id: 'sq-l1-q3',
        prompt: 'Egy téglatest élhosszúságai a = 3 cm, b = 4 cm és c = 5 cm. Mennyi a térfogata?',
        options: ['60 cm³', '48 cm³', '94 cm³', '24 cm³'],
        correctAnswer: '60 cm³',
        explanation: 'A téglatest térfogata a három él szorzata: V = a · b · c = 3 · 4 · 5 = 60 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = a · b · c' },
          { label: 'Számítás', value: '3 · 4 · 5 = 60 cm³' }
        ]
      },
      {
        id: 'sq-l1-q4',
        prompt: 'Egy téglatest élhosszúságai a = 2 cm, b = 3 cm és c = 4 cm. Mennyi a felszíne?',
        options: ['52 cm²', '24 cm²', '48 cm²', '26 cm²'],
        correctAnswer: '52 cm²',
        explanation: 'A = 2 · (a·b + a·c + b·c) = 2 · (2·3 + 2·4 + 3·4) = 2 · (6 + 8 + 12) = 2 · 26 = 52 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 2(ab + ac + bc)' },
          { label: 'Számítás', value: '2 · (6 + 8 + 12) = 52 cm²' }
        ]
      },
      {
        id: 'sq-l1-q5',
        prompt: 'Melyik a helyes képlet egy egyenes hasáb térfogatának kiszámítására?',
        options: ['V = Tₐ · m', 'V = (Tₐ · m) / 3', 'V = 2 · Tₐ + T_p', 'V = Kₐ · m'],
        correctAnswer: 'V = Tₐ · m',
        explanation: 'Bármely egyenes hasáb térfogata az alapterület (Tₐ) és a testmagasság (m) szorzata.',
        breakdown: [
          { label: 'Képlet', value: 'V = Tₐ · m' },
          { label: 'Jelentés', value: 'Alapterület szorozva magassággal' }
        ]
      },
      {
        id: 'sq-l1-q6',
        prompt: 'Egy háromszög alapú hasáb alapterülete Tₐ = 20 cm², magassága m = 7 cm. Mekkora a térfogata?',
        options: ['140 cm³', '70 cm³', '46,67 cm³', '280 cm³'],
        correctAnswer: '140 cm³',
        explanation: 'V = Tₐ · m = 20 · 7 = 140 cm³.',
        breakdown: [
          { label: 'Számítás', value: '20 cm² · 7 cm = 140 cm³' }
        ]
      },
      {
        id: 'sq-l1-q7',
        prompt: 'Egy hasáb alapkerülete Kₐ = 18 cm, magassága m = 10 cm. Mekkora a palástterülete (T_p)?',
        options: ['180 cm²', '90 cm²', '360 cm²', '18 cm²'],
        correctAnswer: '180 cm²',
        explanation: 'A hasáb palástja kiterítve egy Kₐ és m oldalú téglalap: T_p = Kₐ · m = 18 · 10 = 180 cm².',
        breakdown: [
          { label: 'Képlet', value: 'T_p = Kₐ · m' },
          { label: 'Számítás', value: '18 · 10 = 180 cm²' }
        ]
      },
      {
        id: 'sq-l1-q8',
        prompt: 'Egy hasáb térfogata 450 cm³. Mekkora az azonos alapterületű és azonos magasságú gúla térfogata?',
        options: ['150 cm³ (harmadrésze)', '225 cm³ (fele)', '900 cm³ (kétszerese)', '1350 cm³ (háromszorosa)'],
        correctAnswer: '150 cm³ (harmadrésze)',
        explanation: 'A gúla térfogata V_gúla = (Tₐ · m) / 3 = V_hasáb / 3 = 450 / 3 = 150 cm³.',
        breakdown: [
          { label: 'Összefüggés', value: 'V_gúla = V_hasáb / 3' },
          { label: 'Számítás', value: '450 / 3 = 150 cm³' }
        ]
      },
      {
        id: 'sq-l1-q9',
        prompt: 'Egy szabályos négyzet alapú gúla alapéle a = 6 cm. Mennyi az alapterülete (Tₐ)?',
        options: ['36 cm²', '24 cm²', '12 cm²', '18 cm²'],
        correctAnswer: '36 cm²',
        explanation: 'Az alaplap egy a = 6 cm oldalú négyzet: Tₐ = a² = 6² = 36 cm².',
        breakdown: [
          { label: 'Képlet', value: 'Tₐ = a²' },
          { label: 'Számítás', value: '6² = 36 cm²' }
        ]
      },
      {
        id: 'sq-l1-q10',
        prompt: 'Egy szabályos négyzet alapú gúla alapéle a = 6 cm, testmagassága m = 10 cm. Mennyi a térfogata?',
        options: ['120 cm³', '360 cm³', '60 cm³', '180 cm³'],
        correctAnswer: '120 cm³',
        explanation: 'Tₐ = 6² = 36 cm². Térfogat: V = (36 · 10) / 3 = 360 / 3 = 120 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = (Tₐ · m) / 3' },
          { label: 'Számítás', value: '(36 · 10) / 3 = 120 cm³' }
        ]
      },
      {
        id: 'sq-l1-q11',
        prompt: 'Egy egyenes körhenger alapkörének sugara r = 3 cm. Mekkora az alapterülete (π ≈ 3,14)?',
        options: ['kb. 28,26 cm²', 'kb. 18,84 cm²', 'kb. 9,42 cm²', 'kb. 56,52 cm²'],
        correctAnswer: 'kb. 28,26 cm²',
        explanation: 'Tₐ = r² · π = 3² · 3,14 = 9 · 3,14 = 28,26 cm².',
        breakdown: [
          { label: 'Képlet', value: 'Tₐ = r² · π' },
          { label: 'Számítás', value: '9 · 3,14 = 28,26 cm²' }
        ]
      },
      {
        id: 'sq-l1-q12',
        prompt: 'Egy körhenger sugara r = 2 cm, magassága m = 10 cm. Mennyi a térfogata pontosan (π-vel kifejezve)?',
        options: ['40π cm³', '20π cm³', '80π cm³', '10π cm³'],
        correctAnswer: '40π cm³',
        explanation: 'V = r² · π · m = 2² · π · 10 = 4 · 10 · π = 40π cm³ (≈ 125,6 cm³).',
        breakdown: [
          { label: 'Képlet', value: 'V = r² · π · m' },
          { label: 'Számítás', value: '4 · 10 · π = 40π cm³' }
        ]
      },
      {
        id: 'sq-l1-q13',
        prompt: 'Melyik képlettel számítjuk ki egy egyenes körhenger palástjának területét (T_p)?',
        options: ['T_p = 2 · π · r · m', 'T_p = π · r² · m', 'T_p = π · r · a', 'T_p = 4 · π · r²'],
        correctAnswer: 'T_p = 2 · π · r · m',
        explanation: 'A palást egy olyan téglalap, amelynek egyik oldala az alapkör kerülete (2πr), másik oldala a magasság (m).',
        breakdown: [
          { label: 'Képlet', value: 'T_p = 2πr · m' }
        ]
      },
      {
        id: 'sq-l1-q14',
        prompt: 'Hogyan viszonyul az egyenes körkúp térfogata az azonos alapsugarú és magasságú henger térfogatához?',
        options: ['A harmadrésze: V_kúp = V_henger / 3', 'A fele: V_kúp = V_henger / 2', 'A kétszerese', 'Ugyanannyi'],
        correctAnswer: 'A harmadrésze: V_kúp = V_henger / 3',
        explanation: 'Mint minden csúcsos testé, a kúp térfogata is az azonos alapterületű és magasságú egyenes test (henger) harmada.',
        breakdown: [
          { label: 'Képlet', value: 'V_kúp = (r²πm) / 3' }
        ]
      },
      {
        id: 'sq-l1-q15',
        prompt: 'Egy kúp alapkörének sugara r = 3 cm, magassága m = 4 cm. Mennyi a térfogata π-vel kifejezve?',
        options: ['12π cm³', '36π cm³', '24π cm³', '48π cm³'],
        correctAnswer: '12π cm³',
        explanation: 'V = (r² · π · m) / 3 = (3² · π · 4) / 3 = (9 · 4 · π) / 3 = 36π / 3 = 12π cm³ (≈ 37,68 cm³).',
        breakdown: [
          { label: 'Képlet', value: 'V = (r²πm) / 3' },
          { label: 'Számítás', value: '(9 · 4 · π) / 3 = 12π cm³' }
        ]
      },
      {
        id: 'sq-l1-q16',
        prompt: 'Melyik a gömb felszínének helyes képlete?',
        options: ['A = 4 · π · r²', 'A = (4/3) · π · r³', 'A = 2 · π · r²', 'A = π · r²'],
        correctAnswer: 'A = 4 · π · r²',
        explanation: 'A gömb felszíne pontosan négyszerese a főkörének területének: A = 4πr².',
        breakdown: [
          { label: 'Képlet', value: 'A = 4 · π · r²' }
        ]
      },
      {
        id: 'sq-l1-q17',
        prompt: 'Melyik a gömb térfogatának helyes képlete?',
        options: ['V = (4/3) · π · r³', 'V = 4 · π · r²', 'V = (4/3) · π · r²', 'V = 2 · π · r³'],
        correctAnswer: 'V = (4/3) · π · r³',
        explanation: 'A gömb térfogata: V = (4/3) · π · r³.',
        breakdown: [
          { label: 'Képlet', value: 'V = (4/3) · π · r³' }
        ]
      },
      {
        id: 'sq-l1-q18',
        prompt: 'Egy gömb sugara r = 10 cm. Mennyi a felszíne (π ≈ 3,14)?',
        options: ['1256 cm²', '314 cm²', '628 cm²', '4187 cm²'],
        correctAnswer: '1256 cm²',
        explanation: 'A = 4 · π · r² = 4 · 3,14 · 10² = 4 · 3,14 · 100 = 1256 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 4 · π · r²' },
          { label: 'Számítás', value: '4 · 3,14 · 100 = 1256 cm²' }
        ]
      },
      {
        id: 'sq-l1-q19',
        prompt: 'Egy gömb átmérője d = 12 cm. Mekkora a sugara (r)?',
        options: ['6 cm', '12 cm', '24 cm', '3 cm'],
        correctAnswer: '6 cm',
        explanation: 'A sugár az átmérő fele: r = d / 2 = 12 / 2 = 6 cm.',
        breakdown: [
          { label: 'Képlet', value: 'r = d / 2' }
        ]
      },
      {
        id: 'sq-l1-q20',
        prompt: 'Hozzávetőlegesen mekkora a Föld átlagos sugara (R)?',
        options: ['kb. 6370 km', 'kb. 12 740 km', 'kb. 40 000 km', 'kb. 1000 km'],
        correctAnswer: 'kb. 6370 km',
        explanation: 'A Föld átlagos sugara R ≈ 6370 km, átmérője kb. 12 740 km.',
        breakdown: [
          { label: 'Adat', value: 'R ≈ 6370 km' }
        ]
      },
      {
        id: 'sq-l1-q21',
        prompt: 'Hozzávetőlegesen mekkora a Föld Egyenlítőjének kerülete?',
        options: ['kb. 40 000 km', 'kb. 20 000 km', 'kb. 6370 km', 'kb. 12 740 km'],
        correctAnswer: 'kb. 40 000 km',
        explanation: 'K = 2 · π · R ≈ 2 · 3,1416 · 6370 ≈ 40 024 km ≈ 40 000 km.',
        breakdown: [
          { label: 'Képlet', value: 'K = 2πR ≈ 40 000 km' }
        ]
      },
      {
        id: 'sq-l1-q22',
        prompt: 'Hány köbdeciméter (dm³) van 1 köbméterben (1 m³)?',
        options: ['1000 dm³', '100 dm³', '10 dm³', '1 000 000 dm³'],
        correctAnswer: '1000 dm³',
        explanation: 'Mivel 1 m = 10 dm, ezért 1 m³ = 10 · 10 · 10 = 1000 dm³.',
        breakdown: [
          { label: 'Váltószám', value: '1 m = 10 dm ⟹ 1 m³ = 10³ = 1000 dm³' }
        ]
      },
      {
        id: 'sq-l1-q23',
        prompt: 'Hány liter víz fér pontosan egy 1 dm³-es edénybe?',
        options: ['Pontosan 1 liter', '10 liter', '0,1 liter', '100 liter'],
        correctAnswer: 'Pontosan 1 liter',
        explanation: 'A liter a köbdeciméter hétköznapi neve: 1 dm³ = 1 liter = 1000 cm³ = 1000 ml.',
        breakdown: [
          { label: 'Azonosság', value: '1 dm³ ≡ 1 liter' }
        ]
      },
      {
        id: 'sq-l1-q24',
        prompt: 'Hány liter víz van 0,5 m³-ben?',
        options: ['500 liter', '50 liter', '5 liter', '5000 liter'],
        correctAnswer: '500 liter',
        explanation: '1 m³ = 1000 liter, így 0,5 m³ = 0,5 · 1000 = 500 liter.',
        breakdown: [
          { label: 'Számítás', value: '0,5 · 1000 dm³ = 500 liter' }
        ]
      },
      {
        id: 'sq-l1-q25',
        prompt: 'Hány köbdeciméter (dm³) 2500 cm³?',
        options: ['2,5 dm³', '25 dm³', '0,25 dm³', '250 dm³'],
        correctAnswer: '2,5 dm³',
        explanation: '1 dm³ = 1000 cm³, ezért 2500 cm³ / 1000 = 2,5 dm³ (2,5 liter).',
        breakdown: [
          { label: 'Számítás', value: '2500 / 1000 = 2,5 dm³' }
        ]
      },
      {
        id: 'sq-l1-q26',
        prompt: 'Melyik testnek van egyetlen kör alakú alaplapja és egyetlen csúcsa?',
        options: ['Egyenes körkúp', 'Egyenes körhenger', 'Gömb', 'Szabályos négyzetes gúla'],
        correctAnswer: 'Egyenes körkúp',
        explanation: 'A kúp csúcsos forgástest, alaplapja kör, és van egy csúcsa.',
        breakdown: [
          { label: 'Meghatározás', value: 'Körkúp: 1 kör alaplap + 1 csúcs' }
        ]
      },
      {
        id: 'sq-l1-q27',
        prompt: 'Hány lapja van egy szabályos négyzet alapú gúlának összesen?',
        options: ['5 lap (1 négyzet + 4 háromszög)', '4 lap', '6 lap', '8 lap'],
        correctAnswer: '5 lap (1 négyzet + 4 háromszög)',
        explanation: '1 négyzet alakú alaplapja és 4 darab háromszög alakú oldallapja van.',
        breakdown: [
          { label: 'Összeg', value: '1 + 4 = 5 lap' }
        ]
      },
      {
        id: 'sq-l1-q28',
        prompt: 'Hány éle van egy n-oldalú egyenes hasábnak?',
        options: ['3 · n él', '2 · n él', 'n + 2 él', 'n él'],
        correctAnswer: '3 · n él',
        explanation: 'Az alaplapon n él, a fedőlapon n él, és a két lapot összekötő oldalélekből is n van: összesen 3n él.',
        breakdown: [
          { label: 'Képlet', value: 'n + n + n = 3n él' }
        ]
      },
      {
        id: 'sq-l1-q29',
        prompt: 'Hány éle van egy n-oldalú gúlának?',
        options: ['2 · n él', '3 · n él', 'n + 1 él', '4 · n él'],
        correctAnswer: '2 · n él',
        explanation: 'Az alaplapon n alapél van, és a csúcsba futó oldalélekből is n darab van: összesen 2n él (pl. négyszögű gúlánál 8 él).',
        breakdown: [
          { label: 'Képlet', value: 'n alapél + n oldalél = 2n él' }
        ]
      },
      {
        id: 'sq-l1-q30',
        prompt: 'Melyik Euler poliédertételének képlete konvex testekre (C = csúcsok, L = lapok, E = élek)?',
        options: ['C + L - E = 2', 'C + E - L = 2', 'C + L + E = 2', 'C · L = E'],
        correctAnswer: 'C + L - E = 2',
        explanation: 'Euler tétele szerint bármely konvex poliéderre: Csúcsok + Lapok - Élek = 2 (pl. kocka: 8 + 6 - 12 = 2).',
        breakdown: [
          { label: 'Euler-tétel', value: 'C + L - E = 2' },
          { label: 'Kocka ellenőrzés', value: '8 + 6 - 12 = 2' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Pitagorasz-tétel térben és Részletes Számítások',
    subtitle: 'Oldalmagasság, testmagasság, testátló, palástfelületek és hiányzó adatok kiszámítása',
    range: '31 - 60. feladat',
    focus: 'Térbeli Pitagorasz & Részletek',
    questions: [
      {
        id: 'sq-l2-q31',
        prompt: 'Egy kocka teljes felszíne A = 150 cm². Mekkora az éle (a)?',
        options: ['5 cm', '6 cm', '25 cm', '10 cm'],
        correctAnswer: '5 cm',
        explanation: 'A = 6a² = 150 ⟹ a² = 25 ⟹ a = 5 cm.',
        breakdown: [
          { label: 'Képlet', value: '6a² = 150' },
          { label: 'Számítás', value: 'a² = 25 ⟹ a = 5 cm' }
        ]
      },
      {
        id: 'sq-l2-q32',
        prompt: 'Egy kocka térfogata V = 216 cm³. Mennyi a teljes felszíne (A)?',
        options: ['216 cm²', '144 cm²', '256 cm²', '180 cm²'],
        correctAnswer: '216 cm²',
        explanation: 'a³ = 216 ⟹ a = 6 cm. A felszín: A = 6 · a² = 6 · 36 = 216 cm² (érdekesség: mérőszáma megegyezik a térfogatéval!).',
        breakdown: [
          { label: 'Él', value: 'a = ∛216 = 6 cm' },
          { label: 'Felszín', value: 'A = 6 · 6² = 216 cm²' }
        ]
      },
      {
        id: 'sq-l2-q33',
        prompt: 'Egy kocka éle a = 8 cm. Mekkora a lapátlója (d_lap)?',
        options: ['8√2 ≈ 11,31 cm', '8√3 ≈ 13,86 cm', '16 cm', '12 cm'],
        correctAnswer: '8√2 ≈ 11,31 cm',
        explanation: 'A lap egy a = 8 cm oldalú négyzet: d_lap = √(8² + 8²) = √(64 + 64) = √128 = 8√2 ≈ 11,31 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'd_lap = a√2' },
          { label: 'Számítás', value: '8 · 1,414 ≈ 11,31 cm' }
        ]
      },
      {
        id: 'sq-l2-q34',
        prompt: 'Egy kocka éle a = 5 cm. Mekkora a testátlója (d)?',
        options: ['5√3 ≈ 8,66 cm', '5√2 ≈ 7,07 cm', '10 cm', '15 cm'],
        correctAnswer: '5√3 ≈ 8,66 cm',
        explanation: 'Térbeli Pitagorasz-tétel: d = √(a² + a² + a²) = √(3a²) = a√3 = 5√3 ≈ 8,66 cm.',
        breakdown: [
          { label: 'Képlet', value: 'd = a · √3' },
          { label: 'Számítás', value: '5 · 1,732 ≈ 8,66 cm' }
        ]
      },
      {
        id: 'sq-l2-q35',
        prompt: 'Egy téglatest élhosszúságai a = 3 cm, b = 4 cm és c = 12 cm. Mekkora a testátlója (d)?',
        options: ['13 cm', '15 cm', '19 cm', '12,5 cm'],
        correctAnswer: '13 cm',
        explanation: 'd = √(a² + b² + c²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 cm.',
        breakdown: [
          { label: 'Képlet', value: 'd = √(a² + b² + c²)' },
          { label: 'Számítás', value: '√(9 + 16 + 144) = √169 = 13 cm' }
        ]
      },
      {
        id: 'sq-l2-q36',
        prompt: 'Egy szabályos négyzetes gúla alapéle a = 12 cm, testmagassága m = 8 cm. Mekkora az oldalmagassága (mₒ)?',
        options: ['10 cm', '14 cm', '12 cm', '9 cm'],
        correctAnswer: '10 cm',
        explanation: 'Az alapél fele a/2 = 6 cm. A derékszögű háromszögben: mₒ = √(m² + (a/2)²) = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'mₒ = √(m² + (a/2)²)' },
          { label: 'Számítás', value: '√(64 + 36) = 10 cm' }
        ]
      },
      {
        id: 'sq-l2-q37',
        prompt: 'A fenti gúla alapéle a = 12 cm, oldalmagassága mₒ = 10 cm. Mekkora a palástterülete (T_p)?',
        options: ['240 cm²', '120 cm²', '480 cm²', '144 cm²'],
        correctAnswer: '240 cm²',
        explanation: 'A palást 4 egyenlő szárú háromszögből áll: T_p = 4 · (a · mₒ / 2) = 2 · a · mₒ = 2 · 12 · 10 = 240 cm².',
        breakdown: [
          { label: 'Képlet', value: 'T_p = 4 · (a · mₒ / 2) = 2 a mₒ' },
          { label: 'Számítás', value: '2 · 12 · 10 = 240 cm²' }
        ]
      },
      {
        id: 'sq-l2-q38',
        prompt: 'Ugyanennek a négyzetes gúlának (a = 12 cm, T_p = 240 cm²) mekkora a teljes felszíne (A)?',
        options: ['384 cm²', '240 cm²', '144 cm²', '480 cm²'],
        correctAnswer: '384 cm²',
        explanation: 'Alapterület: Tₐ = 12² = 144 cm². Felszín: A = Tₐ + T_p = 144 + 240 = 384 cm².',
        breakdown: [
          { label: 'Alapterület', value: '12² = 144 cm²' },
          { label: 'Teljes felszín', value: '144 + 240 = 384 cm²' }
        ]
      },
      {
        id: 'sq-l2-q39',
        prompt: 'Egy szabályos négyzet alapú gúla alapéle a = 16 cm, oldalmagassága mₒ = 17 cm. Milyen magas a gúla (m)?',
        options: ['15 cm', '12 cm', '13 cm', '9 cm'],
        correctAnswer: '15 cm',
        explanation: 'Az alapél fele a/2 = 8 cm. m = √(mₒ² - (a/2)²) = √(17² - 8²) = √(289 - 64) = √225 = 15 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'm = √(mₒ² - (a/2)²)' },
          { label: 'Számítás', value: '√(289 - 64) = √225 = 15 cm' }
        ]
      },
      {
        id: 'sq-l2-q40',
        prompt: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm, oldalmagassága mₒ = 12 cm. Mekkora az oldaléle (b)?',
        options: ['13 cm', '15 cm', '11 cm', '14 cm'],
        correctAnswer: '13 cm',
        explanation: 'Az oldallapon: b = √(mₒ² + (a/2)²) = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'b = √(mₒ² + (a/2)²)' },
          { label: 'Számítás', value: '√(144 + 25) = 13 cm' }
        ]
      },
      {
        id: 'sq-l2-q41',
        prompt: 'Egy körhenger sugara r = 5 cm, magassága m = 10 cm. Mekkora a teljes felszíne (A) π-vel kifejezve?',
        options: ['150π cm²', '100π cm²', '50π cm²', '250π cm²'],
        correctAnswer: '150π cm²',
        explanation: 'A = 2 · Tₐ + T_p = 2 · (r²π) + 2πrm = 2 · 25π + 2π · 5 · 10 = 50π + 100π = 150π cm² (≈ 471 cm²).',
        breakdown: [
          { label: 'Képlet', value: 'A = 2πr(r + m)' },
          { label: 'Számítás', value: '2π · 5 · (5 + 10) = 10π · 15 = 150π cm²' }
        ]
      },
      {
        id: 'sq-l2-q42',
        prompt: 'Egy körhenger palástjának területe T_p = 120π cm², magassága m = 12 cm. Mekkora az alapkörének sugara?',
        options: ['5 cm', '10 cm', '6 cm', '4 cm'],
        correctAnswer: '5 cm',
        explanation: 'T_p = 2 · π · r · m ⟹ 120π = 2 · π · r · 12 ⟹ 120 = 24r ⟹ r = 5 cm.',
        breakdown: [
          { label: 'Egyenlet', value: '24π · r = 120π' },
          { label: 'Megoldás', value: 'r = 120 / 24 = 5 cm' }
        ]
      },
      {
        id: 'sq-l2-q43',
        prompt: 'Egy körkúp alapkörének sugara r = 6 cm, magassága m = 8 cm. Mekkora az alkotója (a)?',
        options: ['10 cm', '14 cm', '12 cm', '7 cm'],
        correctAnswer: '10 cm',
        explanation: 'A tengelymetszet derékszögű háromszögében: a = √(m² + r²) = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.',
        breakdown: [
          { label: 'Pitagorasz', value: 'a = √(m² + r²)' },
          { label: 'Számítás', value: '√(64 + 36) = 10 cm' }
        ]
      },
      {
        id: 'sq-l2-q44',
        prompt: 'A fenti körkúp (r = 6 cm, a = 10 cm) palástjának területe mennyi π-vel kifejezve?',
        options: ['60π cm²', '30π cm²', '120π cm²', '36π cm²'],
        correctAnswer: '60π cm²',
        explanation: 'T_p = r · π · a = 6 · π · 10 = 60π cm² (≈ 188,4 cm²).',
        breakdown: [
          { label: 'Képlet', value: 'T_p = r · π · a' },
          { label: 'Számítás', value: '6 · 10 · π = 60π cm²' }
        ]
      },
      {
        id: 'sq-l2-q45',
        prompt: 'Ugyanennek a körkúpnak (r = 6 cm, a = 10 cm) mekkora a teljes felszíne π-vel kifejezve?',
        options: ['96π cm²', '60π cm²', '36π cm²', '72π cm²'],
        correctAnswer: '96π cm²',
        explanation: 'Tₐ = r²π = 36π. T_p = 60π. Teljes felszín: A = Tₐ + T_p = 36π + 60π = 96π cm² (≈ 301,44 cm²).',
        breakdown: [
          { label: 'Alapterület', value: 'r²π = 36π' },
          { label: 'Felszín', value: '36π + 60π = 96π cm²' }
        ]
      },
      {
        id: 'sq-l2-q46',
        prompt: 'Egy gömb sugara r = 3 cm. Mennyi a térfogata π-vel kifejezve?',
        options: ['36π cm³', '108π cm³', '12π cm³', '27π cm³'],
        correctAnswer: '36π cm³',
        explanation: 'V = (4/3) · π · r³ = (4/3) · π · 27 = 4 · 9 · π = 36π cm³ (≈ 113,04 cm³).',
        breakdown: [
          { label: 'Képlet', value: 'V = (4/3) · π · r³' },
          { label: 'Számítás', value: '(4 · 27 / 3) · π = 36π cm³' }
        ]
      },
      {
        id: 'sq-l2-q47',
        prompt: 'Egy félgömb sugara r = 6 cm. Mekkora a térfogata π-vel kifejezve?',
        options: ['144π cm³', '288π cm³', '72π cm³', '216π cm³'],
        correctAnswer: '144π cm³',
        explanation: 'A teljes gömb: V = (4/3) · π · 6³ = (4/3) · 216 · π = 288π. A félgömb ennek a fele: 144π cm³.',
        breakdown: [
          { label: 'Teljes gömb', value: '288π cm³' },
          { label: 'Félgömb', value: '288π / 2 = 144π cm³' }
        ]
      },
      {
        id: 'sq-l2-q48',
        prompt: 'Mekkora egy r sugarú félgömb teljes felszíne (beleértve a kör alaplapját is)?',
        options: ['A = 3 · π · r²', 'A = 2 · π · r²', 'A = 4 · π · r²', 'A = π · r²'],
        correctAnswer: 'A = 3 · π · r²',
        explanation: 'A gömbfelület fele 2πr², plusz az elvágás síkjában lévő alapkör πr², így összesen 2πr² + πr² = 3πr².',
        breakdown: [
          { label: 'Gömbi felület', value: '4πr² / 2 = 2πr²' },
          { label: 'Sík lap', value: 'πr²' },
          { label: 'Összeg', value: '2πr² + πr² = 3πr²' }
        ]
      },
      {
        id: 'sq-l2-q49',
        prompt: 'Egy szabályos háromszög alapú egyenes hasáb alapéle a = 6 cm. Mekkora az alapterülete?',
        options: ['9√3 ≈ 15,59 cm²', '18 cm²', '36√3 cm²', '9 cm²'],
        correctAnswer: '9√3 ≈ 15,59 cm²',
        explanation: 'Szabályos háromszög területe: Tₐ = (a² · √3) / 4 = (36 · √3) / 4 = 9√3 ≈ 15,59 cm².',
        breakdown: [
          { label: 'Képlet', value: 'T = (a²√3) / 4' },
          { label: 'Számítás', value: '36√3 / 4 = 9√3 cm²' }
        ]
      },
      {
        id: 'sq-l2-q50',
        prompt: 'A fenti hasáb magassága m = 10 cm, Tₐ = 9√3 cm². Mennyi a térfogata?',
        options: ['90√3 ≈ 155,9 cm³', '30√3 cm³', '180 cm³', '60√3 cm³'],
        correctAnswer: '90√3 ≈ 155,9 cm³',
        explanation: 'V = Tₐ · m = 9√3 · 10 = 90√3 ≈ 155,88 cm³.',
        breakdown: [
          { label: 'Számítás', value: '9√3 · 10 = 90√3 ≈ 155,9 cm³' }
        ]
      },
      {
        id: 'sq-l2-q51',
        prompt: 'Egy rombusz alapú hasáb átlói e = 6 cm, f = 8 cm, magassága m = 5 cm. Mekkora a térfogata?',
        options: ['120 cm³', '240 cm³', '60 cm³', '48 cm³'],
        correctAnswer: '120 cm³',
        explanation: 'A rombusz területe: Tₐ = (e · f) / 2 = (6 · 8) / 2 = 24 cm². Térfogat: V = Tₐ · m = 24 · 5 = 120 cm³.',
        breakdown: [
          { label: 'Rombusz területe', value: '(6 · 8) / 2 = 24 cm²' },
          { label: 'Térfogat', value: '24 · 5 = 120 cm³' }
        ]
      },
      {
        id: 'sq-l2-q52',
        prompt: 'Egy trapéz alapú hasáb alapjai a = 8 cm, c = 4 cm, a trapéz magassága m_tr = 5 cm. Mekkora az alapterülete?',
        options: ['30 cm²', '60 cm²', '40 cm²', '20 cm²'],
        correctAnswer: '30 cm²',
        explanation: 'Tₐ = ((a + c) · m_tr) / 2 = ((8 + 4) · 5) / 2 = (12 · 5) / 2 = 30 cm².',
        breakdown: [
          { label: 'Trapéz képlet', value: '((8 + 4) · 5) / 2' },
          { label: 'Eredmény', value: '30 cm²' }
        ]
      },
      {
        id: 'sq-l2-q53',
        prompt: 'A fenti trapéz alapú hasáb testmagassága m = 7 cm, Tₐ = 30 cm². Mekkora a térfogata?',
        options: ['210 cm³', '105 cm³', '420 cm³', '70 cm³'],
        correctAnswer: '210 cm³',
        explanation: 'V = Tₐ · m = 30 · 7 = 210 cm³.',
        breakdown: [
          { label: 'Számítás', value: '30 · 7 = 210 cm³' }
        ]
      },
      {
        id: 'sq-l2-q54',
        prompt: 'Hogyan változik egy henger térfogata, ha a sugarát megkétszerezzük (2r), de a magassága változatlan marad?',
        options: ['Négyszeresére nő (4-szeres)', 'Kétszeresére nő (2-szeres)', 'Nyolcszorosára nő (8-szoros)', 'Nem változik'],
        correctAnswer: 'Négyszeresére nő (4-szeres)',
        explanation: 'V = r² · π · m. Ha r helyére 2r lép: (2r)² = 4r², így a térfogat 4-szeresére nő.',
        breakdown: [
          { label: 'Hatványozás', value: '(2r)² = 4r²' },
          { label: 'Következtetés', value: 'V\' = 4 · V' }
        ]
      },
      {
        id: 'sq-l2-q55',
        prompt: 'Hogyan változik a henger térfogata, ha a magasságát kétszerezzük meg (2m), a sugara változatlan?',
        options: ['Kétszeresére nő (2-szeres)', 'Négyszeresére nő (4-szeres)', 'Nyolcszorosára nő', 'Változatlan marad'],
        correctAnswer: 'Kétszeresére nő (2-szeres)',
        explanation: 'A térfogat egyenesen arányos a magassággal: V = r²π · (2m) = 2 · V.',
        breakdown: [
          { label: 'Arányosság', value: 'V egyenesen arányos m-mel' }
        ]
      },
      {
        id: 'sq-l2-q56',
        prompt: 'Egy gúla alapterülete Tₐ = 45 cm², térfogata V = 150 cm³. Milyen magas a gúla (m)?',
        options: ['10 cm', '5 cm', '15 cm', '3,33 cm'],
        correctAnswer: '10 cm',
        explanation: 'V = (Tₐ · m) / 3 ⟹ 3V = Tₐ · m ⟹ m = 3V / Tₐ = (3 · 150) / 45 = 450 / 45 = 10 cm.',
        breakdown: [
          { label: 'Képlet átrendezése', value: 'm = 3V / Tₐ' },
          { label: 'Számítás', value: '450 / 45 = 10 cm' }
        ]
      },
      {
        id: 'sq-l2-q57',
        prompt: 'Egy gömb felszíne A = 100π cm². Mekkora a gömb sugara (r)?',
        options: ['5 cm', '10 cm', '25 cm', '2,5 cm'],
        correctAnswer: '5 cm',
        explanation: 'A = 4πr² = 100π ⟹ 4r² = 100 ⟹ r² = 25 ⟹ r = 5 cm.',
        breakdown: [
          { label: 'Egyenlet', value: '4πr² = 100π' },
          { label: 'Megoldás', value: 'r² = 25 ⟹ r = 5 cm' }
        ]
      },
      {
        id: 'sq-l2-q58',
        prompt: 'Arkhimédész híres tétele szerint egy r sugarú és 2r magasságú henger térfogatának hányadrésze a gömb?',
        options: ['2/3 része', '1/2 része', '3/4 része', '1/3 része'],
        correctAnswer: '2/3 része',
        explanation: 'V_henger = r²π · (2r) = 2πr³. V_gömb = (4/3)πr³ = (2/3) · (2πr³) = 2/3 · V_henger.',
        breakdown: [
          { label: 'V_henger', value: '2πr³' },
          { label: 'V_gömb', value: '(4/3)πr³ = 2/3 · (2πr³)' }
        ]
      },
      {
        id: 'sq-l2-q59',
        prompt: 'Ugyanennek a gömbnek és hengernek (sugár r, magasság 2r) a felszínaránya mennyi?',
        options: ['2/3 része (A_gömb = 2/3 · A_henger)', '1/2 része', '3/4 része', '1/4 része'],
        correctAnswer: '2/3 része (A_gömb = 2/3 · A_henger)',
        explanation: 'A_gömb = 4πr². A_henger = 2πr² + 2πr(2r) = 6πr². 4πr² / 6πr² = 4/6 = 2/3!',
        breakdown: [
          { label: 'A_gömb', value: '4πr²' },
          { label: 'A_henger', value: '6πr²' },
          { label: 'Arány', value: '4/6 = 2/3' }
        ]
      },
      {
        id: 'sq-l2-q60',
        prompt: 'Melyik testnek nagyobb a térfogata: egy 10 cm élű kockának, vagy egy r = 5 cm sugarú, m = 13 cm magas hengernek (π ≈ 3,14)?',
        options: ['A hengernek (kb. 1020,5 cm³ > 1000 cm³)', 'A kockának (1000 cm³ > henger)', 'Pontosan egyenlőek', 'Nem dönthető el'],
        correctAnswer: 'A hengernek (kb. 1020,5 cm³ > 1000 cm³)',
        explanation: 'V_kocka = 10³ = 1000 cm³. V_henger = 5² · 3,14 · 13 = 25 · 3,14 · 13 = 78,5 · 13 = 1020,5 cm³. A henger nagyobb!',
        breakdown: [
          { label: 'V_kocka', value: '1000 cm³' },
          { label: 'V_henger', value: '25 · 3,14 · 13 = 1020,5 cm³' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesterfok és Összetett Alkalmazások',
    subtitle: 'Hasonlósági arányok (k, k², k³), tömeg, sűrűség, Eratoszthenész és életszerű szöveges feladatok',
    range: '61 - 90. feladat',
    focus: 'Hasonlóság & Mesterfeladatok',
    questions: [
      {
        id: 'sq-l3-q61',
        prompt: 'Ha egy test minden élét 2-szeresére növeljük (hasonlósági arány k = 2), hogyan változik a felszíne és a térfogata?',
        options: ['Felszín: 4-szeres (k²), Térfogat: 8-szoros (k³)', 'Felszín: 2-szeres, Térfogat: 4-szeres', 'Felszín: 4-szeres, Térfogat: 6-szoros', 'Felszín: 2-szeres, Térfogat: 8-szoros'],
        correctAnswer: 'Felszín: 4-szeres (k²), Térfogat: 8-szoros (k³)',
        explanation: 'Hosszméretek k-szorosára, felületek k² = 4-szeresére, térfogatok k³ = 8-szorosára növekednek.',
        breakdown: [
          { label: 'Felszínarány', value: 'k² = 2² = 4' },
          { label: 'Térfogatarány', value: 'k³ = 2³ = 8' }
        ]
      },
      {
        id: 'sq-l3-q62',
        prompt: 'Két kocka élének aránya 1 : 3. Hányszorosa a nagyobb kocka térfogata a kisebbének?',
        options: ['27-szerese (3³)', '9-szerese (3²)', '3-szorosa', '81-szerese'],
        correctAnswer: '27-szerese (3³)',
        explanation: 'A térfogatok aránya a hasonlósági arány harmadik hatványa: k³ = 3³ = 27.',
        breakdown: [
          { label: 'Arány', value: 'V_nagy / V_kicsi = 3³ = 27' }
        ]
      },
      {
        id: 'sq-l3-q63',
        prompt: 'Két gömb felszínének aránya 1 : 16. Mekkora a sugaraik aránya (k)?',
        options: ['1 : 4', '1 : 2', '1 : 8', '1 : 16'],
        correctAnswer: '1 : 4',
        explanation: 'A felszínek aránya k² = 16 ⟹ a lineáris méretek (sugarak) aránya k = √16 = 4.',
        breakdown: [
          { label: 'Gyökvonás', value: 'k = √16 = 4' }
        ]
      },
      {
        id: 'sq-l3-q64',
        prompt: 'Két hasonló test térfogatának aránya 1 : 125. Mekkora a felszíneik aránya?',
        options: ['1 : 25', '1 : 5', '1 : 50', '1 : 12,5'],
        correctAnswer: '1 : 25',
        explanation: 'k³ = 125 ⟹ k = 5. A felszínek aránya k² = 5² = 25, azaz 1 : 25.',
        breakdown: [
          { label: 'k meghatározása', value: '∛125 = 5' },
          { label: 'Felszínek aránya', value: 'k² = 25' }
        ]
      },
      {
        id: 'sq-l3-q65',
        prompt: 'Egy tömör aranykocka éle a = 2 cm. Az arany sűrűsége ρ = 19,3 g/cm³. Mennyi a kocka tömege?',
        options: ['154,4 g', '38,6 g', '77,2 g', '193 g'],
        correctAnswer: '154,4 g',
        explanation: 'V = a³ = 2³ = 8 cm³. m = ρ · V = 19,3 · 8 = 154,4 g.',
        breakdown: [
          { label: 'Térfogat', value: 'V = 8 cm³' },
          { label: 'Tömeg', value: '19,3 · 8 = 154,4 g' }
        ]
      },
      {
        id: 'sq-l3-q66',
        prompt: 'Egy tömör vasgolyó sugara r = 3 cm. A vas sűrűsége ρ = 7,8 g/cm³. Mennyi a tömege (π ≈ 3,14)?',
        options: ['kb. 881,7 g', 'kb. 220,4 g', 'kb. 440,8 g', 'kb. 1200 g'],
        correctAnswer: 'kb. 881,7 g',
        explanation: 'V = (4/3) · 3,14 · 3³ = (4/3) · 3,14 · 27 = 36 · 3,14 = 113,04 cm³. Tömeg: m = 113,04 · 7,8 ≈ 881,7 g.',
        breakdown: [
          { label: 'Térfogat', value: '113,04 cm³' },
          { label: 'Tömeg', value: '113,04 · 7,8 ≈ 881,7 g' }
        ]
      },
      {
        id: 'sq-l3-q67',
        prompt: 'Egy téglatest alakú akvárium méretei: hossz 60 cm, szélesség 40 cm, magasság 30 cm. Hány liter víz fér bele peremig?',
        options: ['72 liter', '720 liter', '7,2 liter', '120 liter'],
        correctAnswer: '72 liter',
        explanation: 'V = 60 · 40 · 30 = 72 000 cm³ = 72 dm³ = 72 liter.',
        breakdown: [
          { label: 'Térfogat cm³-ben', value: '60 · 40 · 30 = 72 000 cm³' },
          { label: 'Átváltás literre', value: '72 000 / 1000 = 72 liter' }
        ]
      },
      {
        id: 'sq-l3-q68',
        prompt: 'Egy henger alakú esővízgyűjtő hordó átmérője d = 60 cm (r = 30 cm), magassága m = 100 cm. Hány liter víz fér bele (π ≈ 3,14)?',
        options: ['kb. 282,6 liter', 'kb. 1130 liter', 'kb. 28,26 liter', 'kb. 565,2 liter'],
        correctAnswer: 'kb. 282,6 liter',
        explanation: 'r = 3 dm, m = 10 dm. V = r² · π · m = 3² · 3,14 · 10 = 9 · 31,4 = 282,6 dm³ = 282,6 liter.',
        breakdown: [
          { label: 'Méretek dm-ben', value: 'r = 3 dm, m = 10 dm' },
          { label: 'Térfogat', value: '9 · 3,14 · 10 = 282,6 liter' }
        ]
      },
      {
        id: 'sq-l3-q69',
        prompt: 'A Föld sugara R ≈ 6370 km. Hozzávetőlegesen mekkora a Föld teljes felszíne?',
        options: ['kb. 510 millió km²', 'kb. 127 millió km²', 'kb. 1083 milliárd km²', 'kb. 40 000 km²'],
        correctAnswer: 'kb. 510 millió km²',
        explanation: 'A = 4 · π · R² ≈ 4 · 3,1416 · 6370² ≈ 4 · 3,1416 · 40,58 · 10⁶ ≈ 510 millió km².',
        breakdown: [
          { label: 'Képlet', value: 'A = 4πR²' },
          { label: 'Eredmény', value: 'kb. 5,1 · 10⁸ km² = 510 M km²' }
        ]
      },
      {
        id: 'sq-l3-q70',
        prompt: 'A Föld felszínének kb. 71%-a óceán és tenger. Körülbelül mekkora terület jut a szárazföldekre?',
        options: ['kb. 149 millió km²', 'kb. 361 millió km²', 'kb. 510 millió km²', 'kb. 71 millió km²'],
        correctAnswer: 'kb. 149 millió km²',
        explanation: 'A szárazföldek aránya 100% - 71% = 29%. 510 millió · 0,29 ≈ 147,9 ≈ 149 millió km².',
        breakdown: [
          { label: 'Szárazföld arány', value: '29%' },
          { label: 'Számítás', value: '510 · 0,29 ≈ 149 millió km²' }
        ]
      },
      {
        id: 'sq-l3-q71',
        prompt: 'Hány kilométer távolságot jelent a Föld felszínén a délkör (meridián) mentén pontosan 1° szélességkülönbség?',
        options: ['kb. 111,1 km', 'kb. 400 km', 'kb. 15 km', 'kb. 63,7 km'],
        correctAnswer: 'kb. 111,1 km',
        explanation: 'A teljes kör 360°, a kerület 40 000 km: 40 000 / 360 = 111,11... km fokonként.',
        breakdown: [
          { label: 'Számítás', value: '40 000 km / 360° ≈ 111,1 km' }
        ]
      },
      {
        id: 'sq-l3-q72',
        prompt: 'Az északi szélesség 60°-os párhuzamos körén a kör sugara r = R · cos(60°) = R / 2. Mekkora ennek a szélességi körnek a kerülete?',
        options: ['kb. 20 000 km (az Egyenlítő fele)', 'kb. 40 000 km', 'kb. 10 000 km', 'kb. 30 000 km'],
        correctAnswer: 'kb. 20 000 km (az Egyenlítő fele)',
        explanation: 'K_60 = 2 · π · (R/2) = K_Egyenlítő / 2 ≈ 40 000 / 2 = 20 000 km.',
        breakdown: [
          { label: 'Sugár', value: 'r = R · cos(60°) = R / 2' },
          { label: 'Kerület', value: '40 000 / 2 = 20 000 km' }
        ]
      },
      {
        id: 'sq-l3-q73',
        prompt: 'Eratoszthenész mérése szerint az alexandriai és szíénéi napsugárzás szögeltérése 7,2° volt, a távolság 5000 stádium. Mennyire adódott a Föld kerülete?',
        options: ['250 000 stádium (50 · 5000)', '36 000 stádium', '500 000 stádium', '100 000 stádium'],
        correctAnswer: '250 000 stádium (50 · 5000)',
        explanation: '360° / 7,2° = 50. A teljes Föld kerülete 50-szerese az 5000 stádiumnak: 50 · 5000 = 250 000 stádium (kb. 39 375 km).',
        breakdown: [
          { label: 'Arány', value: '360° / 7,2° = 50' },
          { label: 'Kerület', value: '50 · 5000 = 250 000 stádium' }
        ]
      },
      {
        id: 'sq-l3-q74',
        prompt: 'A Föld 24 óra alatt fordul meg 360°-ot a tengelye körül. Hány fok hosszúságkülönbségnek felel meg 1 órányi időeltérés?',
        options: ['15°', '24°', '10°', '30°'],
        correctAnswer: '15°',
        explanation: '360° / 24 óra = 15° óránként (így 1° elfordulás 4 percnek felel meg).',
        breakdown: [
          { label: 'Számítás', value: '360° / 24 = 15°' }
        ]
      },
      {
        id: 'sq-l3-q75',
        prompt: 'Egy kerti medence méretei: 10 m hosszú, 5 m széles és 2 m mély. Egy szivattyú percenként 200 liter vízzel tölti. Mennyi idő alatt telik meg?',
        options: ['500 perc (8 óra 20 perc)', '100 perc', '1000 perc', '250 perc'],
        correctAnswer: '500 perc (8 óra 20 perc)',
        explanation: 'V = 10 · 5 · 2 = 100 m³ = 100 000 liter. Idő = 100 000 / 200 = 500 perc = 8 óra 20 perc.',
        breakdown: [
          { label: 'Térfogat literben', value: '100 m³ = 100 000 liter' },
          { label: 'Töltési idő', value: '100 000 / 200 = 500 perc' }
        ]
      },
      {
        id: 'sq-l3-q76',
        prompt: 'Egy kockát elmetszünk két szemközti élén átmenő síkkal. Milyen alakú a kapott átlós síkmetszet, és mekkora a területe?',
        options: ['Téglalap, területe T = a² · √2', 'Négyzet, területe T = a²', 'Rombusz, területe T = a²√3', 'Trapéz'],
        correctAnswer: 'Téglalap, területe T = a² · √2',
        explanation: 'A síkmetszet egyik oldala a kocka éle (a), a másik oldala a lapátló (a√2): téglalap, T = a · a√2 = a²√2.',
        breakdown: [
          { label: 'Oldalak', value: 'a és a√2' },
          { label: 'Terület', value: 'a · a√2 = a²√2' }
        ]
      },
      {
        id: 'sq-l3-q77',
        prompt: 'Egy körkúpot a magassága felénél az alappal párhuzamos síkkal elvágunk. Hányadrésze a levágott kis kúp térfogata az eredeti kúpénak?',
        options: ['1/8 része', '1/2 része', '1/4 része', '1/16 része'],
        correctAnswer: '1/8 része',
        explanation: 'A hasonlósági arány k = 1/2. A térfogatarány: k³ = (1/2)³ = 1/8! A visszamaradó csonkakúp a 7/8 rész.',
        breakdown: [
          { label: 'Hasonlósági arány', value: 'k = 1/2' },
          { label: 'Térfogatarány', value: 'k³ = (1/2)³ = 1/8' }
        ]
      },
      {
        id: 'sq-l3-q78',
        prompt: 'Egy gúlát szintén a magassága felénél vágunk el az alappal párhuzamosan. A kapott csonkagúla a teljes gúla térfogatának hányadrésze?',
        options: ['7/8 része', '1/8 része', '3/4 része', '1/2 része'],
        correctAnswer: '7/8 része',
        explanation: 'A levágott felső gúla k³ = 1/8 rész. A megmaradt alsó csonkagúla 1 - 1/8 = 7/8 rész.',
        breakdown: [
          { label: 'Felső gúla', value: '1/8 rész' },
          { label: 'Csonkagúla', value: '1 - 1/8 = 7/8 rész' }
        ]
      },
      {
        id: 'sq-l3-q79',
        prompt: 'Egy 10 cm élű fémkockát beolvasztunk és gömbbé alakítunk. Mekkora a keletkező gömb sugara (V = 1000 cm³, π ≈ 3,14)?',
        options: ['kb. 6,2 cm', 'kb. 5,0 cm', 'kb. 7,8 cm', 'kb. 10,0 cm'],
        correctAnswer: 'kb. 6,2 cm',
        explanation: '(4/3) · π · r³ = 1000 ⟹ r³ = 3000 / (4 · 3,14) = 3000 / 12,56 ≈ 238,85 ⟹ r = ∛238,85 ≈ 6,2 cm.',
        breakdown: [
          { label: 'Egyenlet', value: '(4/3) · 3,14 · r³ = 1000' },
          { label: 'r³ értéke', value: 'r³ ≈ 238,85 ⟹ r ≈ 6,2 cm' }
        ]
      },
      {
        id: 'sq-l3-q80',
        prompt: 'Egy hengeres konzervdoboz méretei: r = 5 cm, m = 12 cm. Hány cm² bádoglemez kell az elkészítéséhez (A) (π ≈ 3,14)?',
        options: ['kb. 533,8 cm²', 'kb. 376,8 cm²', 'kb. 188,4 cm²', 'kb. 753,6 cm²'],
        correctAnswer: 'kb. 533,8 cm²',
        explanation: 'A = 2πr(r + m) = 2 · 3,14 · 5 · (5 + 12) = 31,4 · 17 = 533,8 cm².',
        breakdown: [
          { label: 'Képlet', value: 'A = 2πr(r + m)' },
          { label: 'Számítás', value: '31,4 · 17 = 533,8 cm²' }
        ]
      },
      {
        id: 'sq-l3-q81',
        prompt: 'Egy gúla alapja szabályos hatszög (a = 4 cm, Tₐ = 6 · (16√3/4) = 24√3 ≈ 41,57 cm²), magassága m = 10 cm. Mennyi a térfogata?',
        options: ['80√3 ≈ 138,56 cm³', '240√3 cm³', '40√3 cm³', '120 cm³'],
        correctAnswer: '80√3 ≈ 138,56 cm³',
        explanation: 'V = (Tₐ · m) / 3 = (24√3 · 10) / 3 = 240√3 / 3 = 80√3 ≈ 138,56 cm³.',
        breakdown: [
          { label: 'Képlet', value: 'V = (Tₐ · m) / 3' },
          { label: 'Számítás', value: '240√3 / 3 = 80√3 cm³' }
        ]
      },
      {
        id: 'sq-l3-q82',
        prompt: 'Egy sátor háromszög alapú fekvő hasáb (prizma). Az elülső háromszög alapja 2 m, magassága 1,5 m, a sátor hossza 3 m. Mekkora a térfogata?',
        options: ['4,5 m³', '9 m³', '3 m³', '6 m³'],
        correctAnswer: '4,5 m³',
        explanation: 'Alapterület (háromszög): Tₐ = (2 · 1,5) / 2 = 1,5 m². Térfogat: V = Tₐ · m = 1,5 · 3 = 4,5 m³.',
        breakdown: [
          { label: 'Háromszög területe', value: '(2 · 1,5) / 2 = 1,5 m²' },
          { label: 'Prizma térfogata', value: '1,5 · 3 = 4,5 m³' }
        ]
      },
      {
        id: 'sq-l3-q83',
        prompt: 'A Föld sugara R ≈ 6370 km. Hozzávetőlegesen mekkora a Föld teljes térfogata (V)?',
        options: ['kb. 1083 milliárd km³', 'kb. 510 millió km³', 'kb. 40 000 km³', 'kb. 12 740 milliárd km³'],
        correctAnswer: 'kb. 1083 milliárd km³',
        explanation: 'V = (4/3) · π · R³ ≈ (4/3) · 3,1416 · 6370³ ≈ 1,083 · 10¹² km³ = 1083 milliárd km³.',
        breakdown: [
          { label: 'Képlet', value: 'V = (4/3)πR³' },
          { label: 'Eredmény', value: 'kb. 1,083 · 10¹² km³' }
        ]
      },
      {
        id: 'sq-l3-q84',
        prompt: 'A Föld tömege kb. 5,97 · 10²⁴ kg, térfogata kb. 1,083 · 10²¹ m³. Mekkora a Föld átlagos sűrűsége?',
        options: ['kb. 5515 kg/m³ (kb. 5,5 g/cm³)', 'kb. 1000 kg/m³ (mint a víz)', 'kb. 7800 kg/m³ (mint a vas)', 'kb. 2700 kg/m³ (mint a mészkő)'],
        correctAnswer: 'kb. 5515 kg/m³ (kb. 5,5 g/cm³)',
        explanation: 'ρ = M / V = (5,97 · 10²⁴) / (1,083 · 10²¹) ≈ 5512 kg/m³ ≈ 5,5 g/cm³ (a nehéz vas-nikkel mag miatt jóval sűrűbb a kéregnél).',
        breakdown: [
          { label: 'Sűrűség', value: 'ρ = M / V' },
          { label: 'Számítás', value: '5,97·10²⁴ / 1,083·10²¹ ≈ 5515 kg/m³' }
        ]
      },
      {
        id: 'sq-l3-q85',
        prompt: 'Egy 2 m × 3 m × 4 m méretű zárt fa ládát minden oldalán lefestünk. Hány liter festék kell, ha 1 liter festék 10 m²-re elég?',
        options: ['5,2 liter', '2,4 liter', '52 liter', '26 liter'],
        correctAnswer: '5,2 liter',
        explanation: 'A = 2 · (2·3 + 2·4 + 3·4) = 2 · (6 + 8 + 12) = 52 m². Festékszükséglet: 52 / 10 = 5,2 liter.',
        breakdown: [
          { label: 'Felszín', value: '52 m²' },
          { label: 'Festék', value: '52 m² / 10 m²/liter = 5,2 liter' }
        ]
      },
      {
        id: 'sq-l3-q86',
        prompt: 'Egy r = 10 cm sugarú hengeres fazékba fémtestet merítünk, és a vízszint 2 cm-t emelkedik. Mekkora a fémtest térfogata (π ≈ 3,14)?',
        options: ['kb. 628 cm³', 'kb. 314 cm³', 'kb. 1256 cm³', 'kb. 100 cm³'],
        correctAnswer: 'kb. 628 cm³',
        explanation: 'A kiszorított folyadékhenger térfogata: V = r² · π · Δm = 10² · 3,14 · 2 = 100 · 3,14 · 2 = 628 cm³.',
        breakdown: [
          { label: 'Kiszorított víz', value: 'V = r²π · Δh' },
          { label: 'Számítás', value: '100 · 3,14 · 2 = 628 cm³' }
        ]
      },
      {
        id: 'sq-l3-q87',
        prompt: 'Egy R sugarú gömb belsejébe illeszkedő legnagyobb kocka (beírt kocka) testátlója pontosan:',
        options: ['A gömb átmérőjével egyenlő: d = 2R', 'A gömb sugarával egyenlő: d = R', 'd = R√3', 'd = 2R√3'],
        correctAnswer: 'A gömb átmérőjével egyenlő: d = 2R',
        explanation: 'A gömbbe írt kocka minden csúcsa a gömbfelületen van, így a kocka testátlója a gömb átmérője: a√3 = 2R.',
        breakdown: [
          { label: 'Összefüggés', value: 'a√3 = 2R ⟹ a = 2R / √3' }
        ]
      },
      {
        id: 'sq-l3-q88',
        prompt: 'Egy "a" élű kocka belsejébe írt legnagyobb gömb térfogata a kocka térfogatának hány százaléka hozzávetőlegesen?',
        options: ['kb. 52,4% (π / 6)', 'kb. 75%', 'kb. 66,7%', 'kb. 33,3%'],
        correctAnswer: 'kb. 52,4% (π / 6)',
        explanation: 'A beírt gömb sugara r = a/2. V_gömb = (4/3)π(a/2)³ = πa³/6. Arány: (πa³/6) / a³ = π/6 ≈ 3,1416 / 6 ≈ 0,5236 = 52,4%.',
        breakdown: [
          { label: 'Képlet', value: 'V_gömb / V_kocka = π / 6' },
          { label: 'Százalék', value: '3,1416 / 6 ≈ 52,4%' }
        ]
      },
      {
        id: 'sq-l3-q89',
        prompt: 'Egy gúla négyzet alapélének hosszát kétszeresére növeljük, de magasságát felére csökkentjük. Hogyan változik a térfogata?',
        options: ['Megduplázódik (2-szeresére nő)', 'Változatlan marad', 'Négyszeresére nő', 'Feleződik'],
        correctAnswer: 'Megduplázódik (2-szeresére nő)',
        explanation: 'Alapéle duplázódik ⟹ alapterülete 4-szeres lesz (2² = 4). A magasság feleződik (1/2). Új térfogat: 4 · (1/2) = 2-szeres.',
        breakdown: [
          { label: 'Alapterület változás', value: '2² = 4-szeres' },
          { label: 'Magasság változás', value: '1/2-szeres' },
          { label: 'Eredő', value: '4 · 1/2 = 2-szeres' }
        ]
      },
      {
        id: 'sq-l3-q90',
        prompt: 'Mely geometriai testekre igaz kivétel nélkül az alapterület és magasság szorzataként számított térfogatképlet (V = Tₐ · m)?',
        options: ['Minden egyenes hasábra és hengerre', 'Csak a kockára és téglatestre', 'Minden forgástestre', 'Minden testre, beleértve a gúlákat is'],
        correctAnswer: 'Minden egyenes hasábra és hengerre',
        explanation: 'Minden olyan test térfogata V = Tₐ · m, amelynek két egybevágó párhuzamos alaplapja van és a palástja rájuk merőleges (Cavalieri-elv alapján ferdékre is).',
        breakdown: [
          { label: 'Alapelv', value: 'Egyenes testek állandó keresztmetszettel' },
          { label: 'Képlet', value: 'V = Tₐ · m' }
        ]
      }
    ]
  }
};

export const SolidsSummaryQuiz: React.FC<SolidsSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Fejezeti Összefoglalás: Testek"
      subtitle="90 feladat 3 szinten • Hasábok, gúlák, henger, kúp, gömb, Föld és hasonlóság"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító játék',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-600" />,
          description: 'Találd meg a testek és képleteik párjait 3 nehézségi szinten!',
          component: SolidsSummaryMatcher
        },
        {
          id: 'sorter',
          label: 'Csoportosító játék',
          icon: <LayoutGrid className="w-4 h-4 text-purple-600" />,
          description: 'Rendszerezd a geometriai testeket, dimenziókat és állításokat!',
          component: SolidsSummarySorter
        }
      ]}
      matcherComponent={SolidsSummaryMatcher}
      sorterComponent={SolidsSummarySorter}
      themeColor="indigo"
      topicId="g8-solids-summary"
      documentId="g8-solids-summary"
      badge="8. Osztály • VII. Testek"
    />
  );
};

// Alias export for backward compatibility
export const Chapter7SolidsSummaryQuiz = SolidsSummaryQuiz;

export default SolidsSummaryQuiz;
