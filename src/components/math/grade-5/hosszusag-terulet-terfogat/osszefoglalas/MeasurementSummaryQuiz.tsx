import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { MeasurementSummaryMatcher } from './MeasurementSummaryMatcher';
import { MeasurementSummarySorter } from './MeasurementSummarySorter';

export interface MeasurementSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SUMMARY_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: FEJEZETI ALAPFOGALMAK, ALAPMŰVELETEK ÉS KÉPLETEK (1-30)
  // =========================================================================
  {
    id: 'sum-l1-q1',
    level: 1,
    prompt: 'Hány centiméternek felel meg 4 méter hosszúság?',
    options: ['40 cm', '400 cm', '4000 cm', '4 cm'],
    correctAnswer: 1,
    explanation: '1 méter = 100 centiméter, így 4 méter = 4 · 100 = 400 centiméter.',
    hint: 'A méter és a centiméter között 100 a váltószám (1 m = 10 dm = 100 cm).',
    breakdown: [{ label: 'Váltószám', value: '1 m = 100 cm' }, { label: 'Számítás', value: '4 · 100 cm = 400 cm' }]
  },
  {
    id: 'sum-l1-q2',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 7 cm és b = 3 cm. Mennyi a téglalap kerülete?',
    options: ['20 cm', '21 cm', '10 cm', '40 cm'],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-20 mx-auto" viewBox="0 0 160 80">
        <rect x="25" y="15" width="110" height="50" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
        <text x="80" y="44" textAnchor="middle" className="text-[11px] font-bold fill-blue-900">K = 2 · (7 + 3) = 20 cm</text>
        <text x="80" y="12" textAnchor="middle" className="text-[9px] fill-slate-500">7 cm</text>
        <text x="14" y="44" textAnchor="middle" className="text-[9px] fill-slate-500">3 cm</text>
      </svg>
    ),
    explanation: 'A kerület a határoló oldalak összege: K = 2 · (a + b) = 2 · (7 + 3) = 2 · 10 = 20 cm.',
    hint: 'Add össze a két oldalt (7 + 3 = 10), majd szorozd meg 2-vel!',
    breakdown: [{ label: 'Oldalak összege', value: '7 cm + 3 cm = 10 cm' }, { label: 'Kerület', value: '2 · 10 cm = 20 cm' }]
  },
  {
    id: 'sum-l1-q3',
    level: 1,
    prompt: 'Egy négyzet oldala a = 6 dm. Mennyi a kerülete?',
    options: ['36 dm', '24 dm', '12 dm', '18 dm'],
    correctAnswer: 1,
    explanation: 'A négyzetnek 4 egyenlő oldala van: K = 4 · a = 4 · 6 dm = 24 dm.',
    hint: 'A négyzet minden oldala egyenlő. K = 4 · a.',
    breakdown: [{ label: 'Képlet', value: 'K = 4 · a' }, { label: 'Számolás', value: '4 · 6 dm = 24 dm' }]
  },
  {
    id: 'sum-l1-q4',
    level: 1,
    prompt: 'Hány milliméter van 35 centiméterben?',
    options: ['3,5 mm', '350 mm', '3500 mm', '35 mm'],
    correctAnswer: 1,
    explanation: '1 centiméter = 10 milliméter, így 35 cm = 35 · 10 = 350 mm.',
    hint: 'Centiméterről milliméterre váltva tízzel szorzunk.',
    breakdown: [{ label: 'Számítás', value: '35 · 10 mm = 350 mm' }]
  },
  {
    id: 'sum-l1-q5',
    level: 1,
    prompt: 'Egy egyenlő oldalú háromszög minden oldala 8 cm hosszú. Mennyi a kerülete?',
    options: ['16 cm', '24 cm', '32 cm', '64 cm'],
    correctAnswer: 1,
    explanation: 'A háromszög kerülete a három oldal összege: K = 3 · 8 = 24 cm.',
    hint: 'A három egyenlő oldalt kell összeadni: 8 + 8 + 8.',
    breakdown: [{ label: 'Kerület', value: '3 · 8 cm = 24 cm' }]
  },
  {
    id: 'sum-l1-q6',
    level: 1,
    prompt: 'Az alábbiak közül melyik a hosszúság egyik szabványos mértékegysége?',
    options: ['deciméter (dm)', 'liter (l)', 'négyzetméter (m²)', 'hektár (ha)'],
    correctAnswer: 0,
    explanation: 'A deciméter (dm) hosszúságmérték. A liter űrmérték, a négyzetméter és a hektár pedig területmérték.',
    hint: 'A hosszúság 1 dimenziós mérték, nincs a nevében sem „négyzet”, sem „köb”.',
    breakdown: [{ label: 'Helyes válasz', value: 'deciméter (dm)' }]
  },
  {
    id: 'sum-l1-q7',
    level: 1,
    prompt: 'Hány négyzetdeciméter (dm²) van 1 négyzetméterben (m²)?',
    options: ['10 dm²', '100 dm²', '1000 dm²', '10000 dm²'],
    correctAnswer: 1,
    explanation: 'Mivel 1 m = 10 dm, a területnél a váltószám 10 · 10 = 100, így 1 m² = 100 dm².',
    hint: 'Területmértékek között a szomszédos váltószám mindig 100.',
    breakdown: [{ label: '1D váltás', value: '1 m = 10 dm' }, { label: '2D váltás', value: '10 · 10 = 100 dm²' }]
  },
  {
    id: 'sum-l1-q8',
    level: 1,
    prompt: 'Egy téglalap oldalai a = 5 cm és b = 8 cm. Mennyi a területe?',
    options: ['26 cm²', '40 cm²', '13 cm²', '80 cm²'],
    correctAnswer: 1,
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 140 70">
        <rect x="20" y="10" width="100" height="50" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="70" y="38" textAnchor="middle" className="text-[11px] font-bold fill-emerald-900">T = 5 · 8 = 40 cm²</text>
      </svg>
    ),
    explanation: 'A téglalap területe az oldalak szorzata: T = a · b = 5 · 8 = 40 cm².',
    hint: 'Szorozd össze a hosszúságot a szélességgel!',
    breakdown: [{ label: 'Képlet', value: 'T = a · b' }, { label: 'Számolás', value: '5 · 8 cm² = 40 cm²' }]
  },
  {
    id: 'sum-l1-q9',
    level: 1,
    prompt: 'Egy négyzet oldala a = 7 m. Mennyi a területe?',
    options: ['28 m²', '49 m²', '14 m²', '56 m²'],
    correctAnswer: 1,
    explanation: 'A négyzet területe az oldal önmagával vett szorzata: T = a · a = 7 · 7 = 49 m².',
    hint: 'Négyzetnél T = a · a = a².',
    breakdown: [{ label: 'Képlet', value: 'T = a²' }, { label: 'Számolás', value: '7 · 7 m² = 49 m²' }]
  },
  {
    id: 'sum-l1-q10',
    level: 1,
    prompt: 'Hány négyzetméter (m²) felel meg 1 ár (a) területnek?',
    options: ['10 m²', '100 m²', '1000 m²', '10 000 m²'],
    correctAnswer: 1,
    explanation: '1 ár = 100 m² (egy 10 m × 10 m-es négyzet területe).',
    hint: 'Az ár egy kisebb telek mérete: 1 a = 100 m².',
    breakdown: [{ label: '1 ár meghatározása', value: '10 m · 10 m = 100 m²' }]
  },
  {
    id: 'sum-l1-q11',
    level: 1,
    prompt: 'Hány négyzetméter (m²) felel meg 1 hektár (ha) területnek?',
    options: ['100 m²', '1000 m²', '10 000 m²', '100 000 m²'],
    correctAnswer: 2,
    explanation: '1 hektár = 100 ár = 10 000 m² (egy 100 m × 100 m-es négyzet területe).',
    hint: 'A hektár 100-szor nagyobb az árnál: 100 · 100 m² = 10 000 m².',
    breakdown: [{ label: '1 hektár', value: '100 m · 100 m = 10 000 m²' }]
  },
  {
    id: 'sum-l1-q12',
    level: 1,
    prompt: 'Melyik képlet határozza meg a téglalap területét?',
    options: ['T = 2 · (a + b)', 'T = a · b', 'T = 4 · a', 'T = a · b · c'],
    correctAnswer: 1,
    explanation: 'A téglalap területe a két szomszédos oldal szorzata: T = a · b.',
    hint: 'A 2·(a+b) a kerület, az a·b a terület.',
    breakdown: [{ label: 'Téglalap területe', value: 'T = a · b' }]
  },
  {
    id: 'sum-l1-q13',
    level: 1,
    prompt: 'Hány csúcsa van egy kockának?',
    options: ['6', '8', '12', '4'],
    correctAnswer: 1,
    explanation: 'A kockának 8 csúcsa van (4 alul és 4 felül).',
    hint: 'Gondolj egy dobókocka sarkaira!',
    breakdown: [{ label: 'Csúcsok száma', value: '8 csúcs' }]
  },
  {
    id: 'sum-l1-q14',
    level: 1,
    prompt: 'Hány éle van egy téglatestnek?',
    options: ['6', '8', '12', '16'],
    correctAnswer: 2,
    explanation: 'A téglatestnek 12 éle van (4 alapél, 4 fedőél és 4 függőleges oldalél).',
    hint: 'Mind a téglatestnek, mind a kockának 12 éle van.',
    breakdown: [{ label: 'Élek száma', value: '12 él' }]
  },
  {
    id: 'sum-l1-q15',
    level: 1,
    prompt: 'Hány határoló síklapja van egy kockának?',
    options: ['4', '6', '8', '12'],
    correctAnswer: 1,
    explanation: 'A kockának 6 darab egybevágó négyzetlapja van (mint a dobókocka számai 1-től 6-ig).',
    hint: 'A dobókockán hányféle szám szerepelhet?',
    breakdown: [{ label: 'Lapok száma', value: '6 négyzetlap' }]
  },
  {
    id: 'sum-l1-q16',
    level: 1,
    prompt: 'Egy kocka éle a = 3 cm. Mennyi a kocka egyetlen lapjának területe?',
    options: ['6 cm²', '9 cm²', '12 cm²', '27 cm²'],
    correctAnswer: 1,
    explanation: 'A kocka lapja egy 3 cm oldalú négyzet, területe T = 3 · 3 = 9 cm².',
    hint: 'Egy lap egy négyzet: a · a.',
    breakdown: [{ label: 'Egy lap területe', value: '3 · 3 = 9 cm²' }]
  },
  {
    id: 'sum-l1-q17',
    level: 1,
    prompt: 'Egy kocka éle a = 2 cm. Mennyi a kocka teljes felszíne (A)?',
    options: ['8 cm²', '12 cm²', '24 cm²', '16 cm²'],
    correctAnswer: 2,
    figure: (
      <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
        <rect x="25" y="35" width="40" height="40" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
        <polygon points="25,35 45,15 85,15 65,35" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
        <polygon points="65,35 85,15 85,55 65,75" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="2" />
        <text x="45" y="60" textAnchor="middle" className="text-[10px] font-bold fill-purple-950">A = 24</text>
      </svg>
    ),
    explanation: 'A kocka felszíne a 6 darab négyzetlap összege: A = 6 · a² = 6 · (2 · 2) = 6 · 4 = 24 cm².',
    hint: 'Egy lap területe 4 cm², és 6 darab lapja van: 6 · 4.',
    breakdown: [{ label: 'Egy lap', value: '2 · 2 = 4 cm²' }, { label: '6 lap', value: '6 · 4 cm² = 24 cm²' }]
  },
  {
    id: 'sum-l1-q18',
    level: 1,
    prompt: 'Egy téglatest élei 2 cm, 3 cm és 4 cm. Hány határoló téglalap lapja van a testnek?',
    options: ['4 lap', '6 lap', '8 lap', '12 lap'],
    correctAnswer: 1,
    explanation: 'Minden téglatestnek pontosan 6 határoló lapja van (3 pár szemközti egybevágó téglalap).',
    hint: 'Alap, fedél, előlap, hátlap, jobb és bal oldallap.',
    breakdown: [{ label: 'Téglatest lapjai', value: '6 téglalap lap' }]
  },
  {
    id: 'sum-l1-q19',
    level: 1,
    prompt: 'Hány liter víz fér bele pontosan egy 1 dm³ belső térfogatú dobozba?',
    options: ['0,1 liter', '1 liter', '10 liter', '100 liter'],
    correctAnswer: 1,
    explanation: 'A köbmérték és az űrmérték alapszabálya: 1 dm³ = 1 liter víz.',
    hint: 'Ez a fejezet legfontosabb aranyszabálya: 1 dm³ pontosan 1 liter.',
    breakdown: [{ label: 'Aranykapocs', value: '1 dm³ = 1 liter' }]
  },
  {
    id: 'sum-l1-q20',
    level: 1,
    prompt: 'Hány köbcentiméter (cm³) van 1 köbdeciméterben (dm³)?',
    options: ['10 cm³', '100 cm³', '1000 cm³', '10 000 cm³'],
    correctAnswer: 2,
    explanation: 'Mivel 1 dm = 10 cm, a térfogatnál 10 · 10 · 10 = 1000 a váltószám, így 1 dm³ = 1000 cm³.',
    hint: 'Köbmértékek között a szomszédos váltószám 1000.',
    breakdown: [{ label: 'Váltószám', value: '10 · 10 · 10 = 1000 cm³' }]
  },
  {
    id: 'sum-l1-q21',
    level: 1,
    prompt: 'Egy kocka éle a = 3 cm. Mennyi a kocka térfogata (V)?',
    options: ['9 cm³', '18 cm³', '27 cm³', '54 cm³'],
    correctAnswer: 2,
    explanation: 'A kocka térfogata: V = a · a · a = 3 · 3 · 3 = 27 cm³.',
    hint: 'Szorozd össze az élt háromszor önmagával: 3 · 3 · 3.',
    breakdown: [{ label: 'Képlet', value: 'V = a³' }, { label: 'Számolás', value: '3 · 3 · 3 = 27 cm³' }]
  },
  {
    id: 'sum-l1-q22',
    level: 1,
    prompt: 'Egy téglatest élei 2 cm, 3 cm és 5 cm. Mennyi a térfogata?',
    options: ['10 cm³', '30 cm³', '60 cm³', '25 cm³'],
    correctAnswer: 1,
    explanation: 'A téglatest térfogata: V = a · b · c = 2 · 3 · 5 = 30 cm³.',
    hint: 'Szorozd össze a három élet: 2 · 3 · 5.',
    breakdown: [{ label: 'Képlet', value: 'V = a · b · c' }, { label: 'Számolás', value: '2 · 3 · 5 = 30 cm³' }]
  },
  {
    id: 'sum-l1-q23',
    level: 1,
    prompt: 'Hány deciliter (dl) víznek felel meg 5 liter víz?',
    options: ['0,5 dl', '50 dl', '500 dl', '5 dl'],
    correctAnswer: 1,
    explanation: '1 liter = 10 deciliter, ezért 5 liter = 5 · 10 = 50 deciliter.',
    hint: 'Literből deciliterbe váltva 10-zel szorzunk.',
    breakdown: [{ label: 'Számítás', value: '5 · 10 dl = 50 dl' }]
  },
  {
    id: 'sum-l1-q24',
    level: 1,
    prompt: 'Hány liter víz fér bele egy 1 m³ térfogatú víztartályba?',
    options: ['10 liter', '100 liter', '1000 liter', '10 000 liter'],
    correctAnswer: 2,
    explanation: '1 m³ = 1000 dm³ = 1000 liter (ez 10 hektoliter).',
    hint: '1 m³-ben 1000 darab 1 dm³-es doboz fér el.',
    breakdown: [{ label: 'Nagy aranykapocs', value: '1 m³ = 1000 liter' }]
  },
  {
    id: 'sum-l1-q25',
    level: 1,
    prompt: 'Egy téglalap alakú kiskert 10 m hosszú és 6 m széles. Hány méter drótháló kell a körbekerítéséhez?',
    options: ['16 méter', '32 méter', '60 méter', '26 méter'],
    correctAnswer: 1,
    explanation: 'A kerületet számoljuk: K = 2 · (10 + 6) = 2 · 16 = 32 méter.',
    hint: 'A kertnek 4 oldala van: 10 + 6 + 10 + 6.',
    breakdown: [{ label: 'Kerület', value: '2 · (10 + 6) = 32 m' }]
  },
  {
    id: 'sum-l1-q26',
    level: 1,
    prompt: 'Egy szoba 4 m hosszú és 3 m széles. Hány m² padlószőnyeg fedi le teljesen?',
    options: ['7 m²', '12 m²', '14 m²', '24 m²'],
    correctAnswer: 1,
    explanation: 'A padló lefedéséhez a területet számoljuk: T = 4 · 3 = 12 m².',
    hint: 'A lefedés területfeladat: T = a · b.',
    breakdown: [{ label: 'Padló területe', value: '4 m · 3 m = 12 m²' }]
  },
  {
    id: 'sum-l1-q27',
    level: 1,
    prompt: 'Egy 5 literes fazékban már van 32 dl víz. Hány deciliter víz fér még bele a pereméig?',
    options: ['18 dl', '8 dl', '28 dl', '12 dl'],
    correctAnswer: 0,
    explanation: '5 liter = 50 dl. Mivel 32 dl már benne van, még 50 - 32 = 18 dl fér bele.',
    hint: 'Váltsd át az 5 litert deciliterre (50 dl), majd vond ki belőle a 32 dl-t!',
    breakdown: [{ label: 'Teljes űrmérték', value: '5 liter = 50 dl' }, { label: 'Hiányzó víz', value: '50 - 32 = 18 dl' }]
  },
  {
    id: 'sum-l1-q28',
    level: 1,
    prompt: 'Milyen geometriai mennyiséget számolunk ki, ha azt szeretnénk megtudni, mennyi papír kell egy doboz becsomagolásához?',
    options: ['Kerület (K)', 'Felszín (A)', 'Térfogat (V)', 'Hosszúság'],
    correctAnswer: 1,
    explanation: 'A doboz külső lapjainak lefedéséhez a 6 lap együttes területét, azaz a felszínt (A) számoljuk.',
    hint: 'A doboz felületét fedjük be kívülről: ez a felszín.',
    breakdown: [{ label: 'Bevonás kívülről', value: 'Felszín (A)' }]
  },
  {
    id: 'sum-l1-q29',
    level: 1,
    prompt: 'Milyen geometriai mennyiséget számolunk ki, ha szegőlécet vásárolunk a szoba falainak tövébe körbe?',
    options: ['Kerület (K)', 'Terület (T)', 'Térfogat (V)', 'Felszín (A)'],
    correctAnswer: 0,
    explanation: 'A szoba falai mentén körbe haladunk, a határvonal hosszát, azaz a kerületet (K) számoljuk folyóméterben.',
    hint: 'A széle mentén, körbe haladunk: ez kerületfeladat.',
    breakdown: [{ label: 'Körbe a fal mentén', value: 'Kerület (K)' }]
  },
  {
    id: 'sum-l1-q30',
    level: 1,
    prompt: 'Hány hektoliternek (hl) felel meg 500 liter víz?',
    options: ['5 hl', '50 hl', '5000 hl', '0,5 hl'],
    correctAnswer: 0,
    explanation: '1 hektoliter (hl) = 100 liter. Így 500 liter = 500 : 100 = 5 hektoliter.',
    hint: 'A hektoliter 100 liter. Oszd el 500-at 100-zal!',
    breakdown: [{ label: 'Váltószám', value: '1 hl = 100 l' }, { label: 'Számolás', value: '500 : 100 = 5 hl' }]
  },

  // =========================================================================
  // 2. SZINT: ÖSSZETETT ÁTVÁLTÁSOK, VISSZASZÁMOLÁSOK ÉS VALÓS PÉLDÁK (31-60)
  // =========================================================================
  {
    id: 'sum-l2-q1',
    level: 2,
    prompt: 'Egy téglalap kerülete K = 28 cm, az egyik oldala a = 8 cm. Milyen hosszú a másik oldala (b)?',
    options: ['6 cm', '10 cm', '12 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'K = 2 · (a + b) = 28 cm, tehát a + b = 14 cm. Mivel a = 8 cm, így b = 14 - 8 = 6 cm.',
    hint: 'A félkerület a + b = 28 : 2 = 14 cm. Ebből vond le a 8 cm-t!',
    breakdown: [{ label: 'Félkerület (a + b)', value: '28 : 2 = 14 cm' }, { label: 'b oldal', value: '14 - 8 = 6 cm' }]
  },
  {
    id: 'sum-l2-q2',
    level: 2,
    prompt: 'Egy négyzet alakú telek kerülete 120 méter. Hány méter hosszú a telek egy oldala?',
    options: ['30 méter', '40 méter', '60 méter', '20 méter'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van: a = K : 4 = 120 : 4 = 30 méter.',
    hint: 'Oszd el a kerületet 4-gyel!',
    breakdown: [{ label: 'Oldalhossz', value: '120 m : 4 = 30 m' }]
  },
  {
    id: 'sum-l2-q3',
    level: 2,
    prompt: 'Mennyi 3 km + 450 m méterben kifejezve?',
    options: ['3450 m', '750 m', '34 500 m', '3045 m'],
    correctAnswer: 0,
    explanation: '3 km = 3000 m. Hozzáadva a 450 métert: 3000 + 450 = 3450 méter.',
    hint: '1 km = 1000 m, így 3 km = 3000 m.',
    breakdown: [{ label: '3 km méterben', value: '3000 m' }, { label: 'Összeg', value: '3000 + 450 = 3450 m' }]
  },
  {
    id: 'sum-l2-q4',
    level: 2,
    prompt: 'Egy téglalap hossza 12 cm, szélessége a fele. Mennyi a téglalap kerülete?',
    options: ['36 cm', '18 cm', '72 cm', '48 cm'],
    correctAnswer: 0,
    explanation: 'A szélesség b = 12 : 2 = 6 cm. Kerület: K = 2 · (12 + 6) = 2 · 18 = 36 cm.',
    hint: 'Előbb számold ki a szélességet (6 cm), majd a kerületet: 2 · (12 + 6).',
    breakdown: [{ label: 'Szélesség b', value: '12 : 2 = 6 cm' }, { label: 'Kerület K', value: '2 · (12 + 6) = 36 cm' }]
  },
  {
    id: 'sum-l2-q5',
    level: 2,
    prompt: 'Mennyi 4,5 dm + 25 mm centiméterben kifejezve?',
    options: ['47,5 cm', '70 cm', '45,25 cm', '50 cm'],
    correctAnswer: 0,
    explanation: '4,5 dm = 45 cm, és 25 mm = 2,5 cm. Összeadva: 45 + 2,5 = 47,5 cm.',
    hint: 'Válts át mindent centiméterre: 4,5 dm = 45 cm, 25 mm = 2,5 cm.',
    breakdown: [{ label: '4,5 dm cm-ben', value: '45 cm' }, { label: '25 mm cm-ben', value: '2,5 cm' }, { label: 'Összeg', value: '45 + 2,5 = 47,5 cm' }]
  },
  {
    id: 'sum-l2-q6',
    level: 2,
    prompt: 'Egy egyenlő szárú háromszög alapja 10 cm, szárai egyenként 14 cm hosszúak. Mennyi a kerülete?',
    options: ['38 cm', '34 cm', '28 cm', '48 cm'],
    correctAnswer: 0,
    explanation: 'A háromszög kerülete: K = 10 + 14 + 14 = 38 cm.',
    hint: 'Az alaphoz (10 cm) add hozzá kétszer a szárat (14 cm).',
    breakdown: [{ label: 'Kerület számítás', value: '10 + 14 + 14 = 38 cm' }]
  },
  {
    id: 'sum-l2-q7',
    level: 2,
    prompt: 'Egy téglalap területe T = 48 cm², szélessége b = 6 cm. Mennyi a hossza (a)?',
    options: ['8 cm', '7 cm', '9 cm', '42 cm'],
    correctAnswer: 0,
    explanation: 'T = a · b = 48, így a = T : b = 48 : 6 = 8 cm.',
    hint: 'Oszd el a területet az ismert oldallal: 48 : 6.',
    breakdown: [{ label: 'Hiányzó oldal a', value: '48 : 6 = 8 cm' }]
  },
  {
    id: 'sum-l2-q8',
    level: 2,
    prompt: 'Egy négyzet kerülete K = 20 cm. Mennyi a területe?',
    options: ['25 cm²', '16 cm²', '20 cm²', '100 cm²'],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-24 mx-auto" viewBox="0 0 80 80">
        <rect x="15" y="15" width="50" height="50" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="40" y="44" textAnchor="middle" className="text-[11px] font-bold fill-emerald-900">a = 5 cm</text>
      </svg>
    ),
    explanation: 'A négyzet oldala: a = K : 4 = 20 : 4 = 5 cm. Területe: T = a · a = 5 · 5 = 25 cm².',
    hint: 'Előbb keresd meg a négyzet oldalát (20 : 4 = 5), majd számold ki a területét: 5 · 5.',
    breakdown: [{ label: 'Oldalhossz a', value: '20 : 4 = 5 cm' }, { label: 'Terület T', value: '5 · 5 = 25 cm²' }]
  },
  {
    id: 'sum-l2-q9',
    level: 2,
    prompt: 'Hány négyzetméter (m²) 3,5 hektár szántóföld?',
    options: ['35 000 m²', '3500 m²', '350 m²', '350 000 m²'],
    correctAnswer: 0,
    explanation: '1 hektár = 10 000 m², ezért 3,5 hektár = 3,5 · 10 000 = 35 000 m².',
    hint: 'Szorozd meg a 3,5-öt 10 000-rel!',
    breakdown: [{ label: 'Számolás', value: '3,5 · 10 000 m² = 35 000 m²' }]
  },
  {
    id: 'sum-l2-q10',
    level: 2,
    prompt: 'Egy 50 m hosszú és 20 m széles telek területe hány árnak (a) felel meg?',
    options: ['10 ár', '100 ár', '1 ár', '1000 ár'],
    correctAnswer: 0,
    explanation: 'T = 50 · 20 = 1000 m². Mivel 1 ár = 100 m², így 1000 : 100 = 10 ár.',
    hint: 'Számold ki a területet m²-ben (1000 m²), majd oszd el 100-zal!',
    breakdown: [{ label: 'Terület m²-ben', value: '50 · 20 = 1000 m²' }, { label: 'Átváltás árba', value: '1000 : 100 = 10 a' }]
  },
  {
    id: 'sum-l2-q11',
    level: 2,
    prompt: 'Egy szoba padlója 18 m². Hány négyzetdeciméter (dm²) ez?',
    options: ['180 dm²', '1800 dm²', '18 000 dm²', '1,8 dm²'],
    correctAnswer: 1,
    explanation: '1 m² = 100 dm², így 18 m² = 18 · 100 = 1800 dm².',
    hint: 'Területnél m²-ről dm²-re váltva 100-zal szorzunk.',
    breakdown: [{ label: 'Számítás', value: '18 · 100 = 1800 dm²' }]
  },
  {
    id: 'sum-l2-q12',
    level: 2,
    prompt: 'Egy L-alakú folyosó két téglalapra bontható: egy 4 m × 3 m-es és egy 2 m × 2 m-es részre. Mennyi a teljes területe?',
    options: ['16 m²', '14 m²', '24 m²', '18 m²'],
    correctAnswer: 0,
    explanation: 'T₁ = 4 · 3 = 12 m², T₂ = 2 · 2 = 4 m². A teljes terület a kettő összege: 12 + 4 = 16 m².',
    hint: 'Számold ki a két téglalap területét külön-külön, majd add össze őket!',
    breakdown: [{ label: '1. rész', value: '4 · 3 = 12 m²' }, { label: '2. rész', value: '2 · 2 = 4 m²' }, { label: 'Összeg', value: '12 + 4 = 16 m²' }]
  },
  {
    id: 'sum-l2-q13',
    level: 2,
    prompt: 'Egy kocka éle a = 5 cm. Mennyi a kocka teljes felszíne?',
    options: ['150 cm²', '125 cm²', '100 cm²', '120 cm²'],
    correctAnswer: 0,
    explanation: 'Egy lap területe 5 · 5 = 25 cm². A 6 lap együttesen: A = 6 · 25 = 150 cm².',
    hint: 'A = 6 · a² = 6 · (5 · 5) = 6 · 25.',
    breakdown: [{ label: 'Egy lap', value: '5 · 5 = 25 cm²' }, { label: 'Felszín A', value: '6 · 25 = 150 cm²' }]
  },
  {
    id: 'sum-l2-q14',
    level: 2,
    prompt: 'Egy téglatest élei a = 4 cm, b = 3 cm, c = 2 cm. Mennyi a teljes felszíne (A)?',
    options: ['52 cm²', '24 cm²', '26 cm²', '48 cm²'],
    correctAnswer: 0,
    explanation: 'A lapok páronként: 4·3 = 12, 4·2 = 8, 3·2 = 6. Összegük: 12 + 8 + 6 = 26. Kétszerese: A = 2 · 26 = 52 cm².',
    hint: 'A = 2 · (ab + ac + bc) = 2 · (12 + 8 + 6).',
    breakdown: [{ label: '3 lap összege', value: '12 + 8 + 6 = 26 cm²' }, { label: 'Felszín (6 lap)', value: '2 · 26 = 52 cm²' }]
  },
  {
    id: 'sum-l2-q15',
    level: 2,
    prompt: 'Egy nyitott (tető nélküli) kocka alakú doboz éle 10 cm. Mennyi a belső felülete?',
    options: ['500 cm²', '600 cm²', '400 cm²', '1000 cm²'],
    correctAnswer: 0,
    explanation: 'Mivel a doboz nyitott, csak 5 lapja van: A = 5 · a² = 5 · (10 · 10) = 5 · 100 = 500 cm².',
    hint: 'A nyitott kockának nincs teteje, így 6 lap helyett csak 5 lapot számolunk!',
    breakdown: [{ label: 'Egy lap', value: '10 · 10 = 100 cm²' }, { label: '5 lap összege', value: '5 · 100 = 500 cm²' }]
  },
  {
    id: 'sum-l2-q16',
    level: 2,
    prompt: 'Egy kocka felszíne A = 96 cm². Milyen hosszú a kocka egy éle?',
    options: ['4 cm', '6 cm', '8 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'Egy lap területe: 96 : 6 = 16 cm². Mivel a · a = 16, így az él a = 4 cm.',
    hint: 'Oszd el a felszínt 6-tal (96 : 6 = 16), majd keresd meg, melyik szám négyzete a 16!',
    breakdown: [{ label: 'Egy lap területe', value: '96 : 6 = 16 cm²' }, { label: 'Élhossz a', value: '√16 = 4 cm' }]
  },
  {
    id: 'sum-l2-q17',
    level: 2,
    prompt: 'Egy téglatest élei 5 dm, 3 dm és 2 dm. Mennyi a téglatest 12 élének összhossza?',
    options: ['40 dm', '20 dm', '30 dm', '60 dm'],
    correctAnswer: 0,
    explanation: 'A téglatestnek mindegyik éléből 4 darab van: 4 · (5 + 3 + 2) = 4 · 10 = 40 dm.',
    hint: 'Minden típusú élből 4 darab található a téglatestben.',
    breakdown: [{ label: 'Élek összege', value: '4 · (5 + 3 + 2) = 40 dm' }]
  },
  {
    id: 'sum-l2-q18',
    level: 2,
    prompt: 'Két kockánk van: az első éle 2 cm, a másodiké 4 cm. Hányszorosa a második kocka felszíne az elsőének?',
    options: ['2-szerese', '4-szerese', '8-szorosa', '16-szorosa'],
    correctAnswer: 1,
    explanation: 'A₁ = 6 · 2² = 24 cm². A₂ = 6 · 4² = 96 cm². 96 : 24 = 4-szerese (mivel az él duplázódásakor a felszín 2² = 4-szeresére nő).',
    hint: 'Ha az él a 2-szeresére nő, a felület 2 · 2 = 4-szeresére növekszik!',
    breakdown: [{ label: 'Kisebb felszín', value: '6 · 4 = 24 cm²' }, { label: 'Nagyobb felszín', value: '6 · 16 = 96 cm²' }, { label: 'Arány', value: '96 : 24 = 4' }]
  },
  {
    id: 'sum-l2-q19',
    level: 2,
    prompt: 'Egy kocka alakú víztartály belső éle 1 méter. Hány liter víz fér bele, ha tele töltjük?',
    options: ['100 liter', '1000 liter', '10 000 liter', '10 liter'],
    correctAnswer: 1,
    explanation: 'V = 1 m · 1 m · 1 m = 1 m³ = 1000 dm³ = 1000 liter víz.',
    hint: '1 m³ pontosan 1000 liter folyadékot jelent.',
    breakdown: [{ label: 'Térfogat', value: '1 m³ = 1000 dm³ = 1000 liter' }]
  },
  {
    id: 'sum-l2-q20',
    level: 2,
    prompt: 'Egy akvárium belső méretei: 60 cm hosszú, 30 cm széles, 40 cm magas. Hány liter víz fér bele tele töltve?',
    options: ['72 liter', '720 liter', '7,2 liter', '130 liter'],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-24 mx-auto" viewBox="0 0 160 80">
        <rect x="25" y="20" width="100" height="45" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <text x="75" y="47" textAnchor="middle" className="text-[11px] font-bold fill-blue-900">V = 6 · 3 · 4 = 72 l</text>
      </svg>
    ),
    explanation: 'Váltsunk dm-re: 6 dm · 3 dm · 4 dm = 72 dm³ = 72 liter.',
    hint: 'Váltsd át a centimétereket deciméterre: 6 dm, 3 dm, 4 dm, és szorozd össze őket!',
    breakdown: [{ label: 'Méretek dm-ben', value: '6 dm, 3 dm, 4 dm' }, { label: 'Térfogat', value: '6 · 3 · 4 = 72 dm³ = 72 l' }]
  },
  {
    id: 'sum-l2-q21',
    level: 2,
    prompt: 'Egy téglatest térfogata V = 180 cm³, alapterülete T_alap = 30 cm². Milyen magas a téglatest?',
    options: ['6 cm', '5 cm', '15 cm', '50 cm'],
    correctAnswer: 0,
    explanation: 'Mivel V = T_alap · m, így m = V : T_alap = 180 : 30 = 6 cm.',
    hint: 'Oszd el a térfogatot az alapterülettel: 180 : 30.',
    breakdown: [{ label: 'Magasság m', value: '180 : 30 = 6 cm' }]
  },
  {
    id: 'sum-l2-q22',
    level: 2,
    prompt: 'Hány liternek felel meg 2,5 m³ esővíz?',
    options: ['250 liter', '2500 liter', '25 000 liter', '25 liter'],
    correctAnswer: 1,
    explanation: '1 m³ = 1000 liter, így 2,5 m³ = 2,5 · 1000 = 2500 liter.',
    hint: 'Szorozd meg a 2,5-öt 1000-rel!',
    breakdown: [{ label: 'Számítás', value: '2,5 · 1000 = 2500 liter' }]
  },
  {
    id: 'sum-l2-q23',
    level: 2,
    prompt: 'Egy 40 literes akvárium félig van vízzel. Hány deciliter víz van benne?',
    options: ['20 dl', '200 dl', '2000 dl', '400 dl'],
    correctAnswer: 1,
    explanation: 'Félig töltve: 40 : 2 = 20 liter. Mivel 1 liter = 10 dl, így 20 · 10 = 200 deciliter víz van benne.',
    hint: '40 liter fele 20 liter. Váltsd át deciliterre (· 10)!',
    breakdown: [{ label: 'Víz fele literben', value: '40 : 2 = 20 liter' }, { label: 'Deciliterben', value: '20 · 10 = 200 dl' }]
  },
  {
    id: 'sum-l2-q24',
    level: 2,
    prompt: 'Egy nagy kocka éle 10 cm. Hány darab 1 cm élű kis egységkockából építhető fel?',
    options: ['100 db', '1000 db', '10 000 db', '60 db'],
    correctAnswer: 1,
    explanation: 'A nagy kocka térfogata 10 · 10 · 10 = 1000 cm³. Egy kis kocka 1 cm³, így 1000 darab kell.',
    hint: 'V = 10 · 10 · 10.',
    breakdown: [{ label: 'Kockák száma', value: '10 · 10 · 10 = 1000 db' }]
  },
  {
    id: 'sum-l2-q25',
    level: 2,
    prompt: 'Egy 20 m hosszú és 15 m széles kertet körbekerítünk, de kihagyunk egy 3 m-es kaput. Hány méter kerítésdrót kell?',
    options: ['70 méter', '67 méter', '35 méter', '64 méter'],
    correctAnswer: 1,
    explanation: 'A teljes kerület K = 2 · (20 + 15) = 2 · 35 = 70 m. A 3 m kapu levonásával: 70 - 3 = 67 m.',
    hint: 'Számold ki a teljes kerületet (70 m), majd vond le a 3 méteres kapunyílást!',
    breakdown: [{ label: 'Teljes kerület', value: '2 · (20 + 15) = 70 m' }, { label: 'Kapu levonása', value: '70 - 3 = 67 m' }]
  },
  {
    id: 'sum-l2-q26',
    level: 2,
    prompt: 'Egy szoba 5 m hosszú és 4 m széles. Szegőlécet teszünk a falak tövébe körbe, de van egy 1 m széles ajtó. Hány méter szegőléc kell?',
    options: ['18 méter', '17 méter', '20 méter', '19 méter'],
    correctAnswer: 1,
    explanation: 'Kerület K = 2 · (5 + 4) = 18 m. Az 1 méteres ajtó levonásával: 18 - 1 = 17 m szegőléc szükséges.',
    hint: 'Kerületből vond le az ajtó szélességét!',
    breakdown: [{ label: 'Kerület', value: '2 · (5 + 4) = 18 m' }, { label: 'Ajtó levonása', value: '18 - 1 = 17 m' }]
  },
  {
    id: 'sum-l2-q27',
    level: 2,
    prompt: 'Egy fürdőszoba 14 m²-es felületét csempézzük. A csempét 1,5 m²-es dobozokban árusítják. Hány egész dobozt kell megvenni?',
    options: ['9 doboz', '10 doboz', '8 doboz', '11 doboz'],
    correctAnswer: 1,
    explanation: '14 : 1,5 = 9,33... Mivel nem lehet tört dobozt vásárolni, felfelé kerekítünk: 10 doboz csempe kell.',
    hint: '9 doboz csak 13,5 m²-re elég, ami nem elég! Mindig egész dobozra kerekítünk fel.',
    breakdown: [{ label: 'Osztás', value: '14 : 1,5 = 9,33' }, { label: 'Kerekítés fel', value: '10 egész doboz' }]
  },
  {
    id: 'sum-l2-q28',
    level: 2,
    prompt: 'Egy kerti medence 5 m hosszú, 3 m széles és 1,5 m mély. Hány m³ víz tölti meg teljesen?',
    options: ['22,5 m³', '15 m³', '45 m³', '30 m³'],
    correctAnswer: 0,
    explanation: 'V = a · b · c = 5 · 3 · 1,5 = 15 · 1,5 = 22,5 m³ (ez 22 500 liter víz).',
    hint: 'Szorozd össze a három méretet: 5 · 3 · 1,5.',
    breakdown: [{ label: 'Térfogat', value: '5 · 3 · 1,5 = 22,5 m³' }]
  },
  {
    id: 'sum-l2-q29',
    level: 2,
    prompt: '1 liter falfesték 8 m² falfelületre elég. Hány liter festék kell egy 24 m²-es fal befestéséhez 1 rétegben?',
    options: ['2 liter', '3 liter', '4 liter', '6 liter'],
    correctAnswer: 1,
    explanation: '24 : 8 = 3 liter festékre van szükség.',
    hint: 'Oszd el a fal területét (24) az 1 liter kiadósságával (8)!',
    breakdown: [{ label: 'Szükséges festék', value: '24 : 8 = 3 liter' }]
  },
  {
    id: 'sum-l2-q30',
    level: 2,
    prompt: 'Egy teherautó platóján 4,5 m³ sóder van. Hány dm³-nek felel meg ez a mennyiség?',
    options: ['45 dm³', '450 dm³', '4500 dm³', '45 000 dm³'],
    correctAnswer: 2,
    explanation: '1 m³ = 1000 dm³, így 4,5 m³ = 4,5 · 1000 = 4500 dm³.',
    hint: 'Köbméterről köbdeciméterre váltva 1000-rel szorzunk.',
    breakdown: [{ label: 'Számolás', value: '4,5 · 1000 = 4500 dm³' }]
  },

  // =========================================================================
  // 3. SZINT: MESTERFOK, ÖSSZETETT FELADATOK ÉS TÉMAZÁRÓ KIHÍVÁSOK (61-90)
  // =========================================================================
  {
    id: 'sum-l3-q1',
    level: 3,
    prompt: 'Egy téglalap kerülete 40 cm. A hosszúsága 4 cm-rel hosszabb a szélességénél. Milyen hosszú a hosszabbik oldala?',
    options: ['12 cm', '8 cm', '10 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'A félkerület a + b = 20 cm. Ha a = b + 4, akkor (b + 4) + b = 20, amiből 2b = 16, tehát b = 8 cm. A hosszabbik oldal a = 8 + 4 = 12 cm.',
    hint: 'A félkerület a + b = 20 cm. Melyik két szám összege 20, ha a különbségük 4? (12 és 8).',
    breakdown: [{ label: 'Félkerület', value: '40 : 2 = 20 cm' }, { label: 'Oldalak', value: '8 cm és 12 cm' }, { label: 'Hosszabbik oldal', value: '12 cm' }]
  },
  {
    id: 'sum-l3-q2',
    level: 3,
    prompt: 'Egy négyzet és egy téglalap kerülete egyaránt 36 cm. A téglalap oldalai 11 cm és 7 cm. Melyik alakzat területe nagyobb és mennyivel?',
    options: [
      'A négyzeté nagyobb 4 cm²-rel',
      'A téglalapé nagyobb 4 cm²-rel',
      'Egyenlő a területük',
      'A négyzeté nagyobb 8 cm²-rel'
    ],
    correctAnswer: 0,
    explanation: 'Négyzet oldala: 36 : 4 = 9 cm, területe: 9 · 9 = 81 cm². Téglalap területe: 11 · 7 = 77 cm². Különbség: 81 - 77 = 4 cm² a négyzet javára.',
    hint: 'Számold ki mindkét területet: a négyzet területe 9 · 9 = 81, a téglalapé 11 · 7 = 77.',
    breakdown: [{ label: 'Négyzet területe', value: '9 · 9 = 81 cm²' }, { label: 'Téglalap területe', value: '11 · 7 = 77 cm²' }, { label: 'Különbség', value: '81 - 77 = 4 cm² (négyzet)' }]
  },
  {
    id: 'sum-l3-q3',
    level: 3,
    prompt: 'Egy 30 m hosszú és 20 m széles telket 2 réteg szögesdróttal kerítünk körbe. Hány méter drót szükséges?',
    options: ['100 méter', '200 méter', '150 méter', '300 méter'],
    correctAnswer: 1,
    explanation: '1 réteghez a kerület kell: K = 2 · (30 + 20) = 100 m. Mivel 2 réteg drótot húzunk, 2 · 100 = 200 méter kell.',
    hint: 'Két réteg drót = 2 · Kerület.',
    breakdown: [{ label: 'Kerület K', value: '2 · 50 = 100 m' }, { label: '2 réteg drót', value: '2 · 100 = 200 m' }]
  },
  {
    id: 'sum-l3-q4',
    level: 3,
    prompt: 'Egy négyzet kerülete 48 cm. Ha az oldalát 2 cm-rel csökkentjük, mennyi lesz az új négyzet kerülete?',
    options: ['40 cm', '44 cm', '46 cm', '36 cm'],
    correctAnswer: 0,
    explanation: 'Eredeti oldal: 48 : 4 = 12 cm. Új oldal: 12 - 2 = 10 cm. Új kerület: 4 · 10 = 40 cm (mind a 4 oldal 2 cm-rel csökken, így 4 · 2 = 8 cm-rel lesz kisebb: 48 - 8 = 40 cm).',
    hint: 'Mind a 4 oldal 2 cm-rel csökken, tehát a kerület 4 · 2 = 8 cm-rel csökken.',
    breakdown: [{ label: 'Eredeti oldal', value: '48 : 4 = 12 cm' }, { label: 'Új oldal', value: '10 cm' }, { label: 'Új kerület', value: '4 · 10 = 40 cm' }]
  },
  {
    id: 'sum-l3-q5',
    level: 3,
    prompt: 'Egy szabályos (minden oldala egyenlő) hatszög kerülete 54 cm. Milyen hosszú egy oldala?',
    options: ['9 cm', '8 cm', '7 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszögnek 6 egyenlő oldala van: a = 54 : 6 = 9 cm.',
    hint: 'Oszd el a kerületet 6-tal!',
    breakdown: [{ label: 'Oldalhossz', value: '54 : 6 = 9 cm' }]
  },
  {
    id: 'sum-l3-q6',
    level: 3,
    prompt: 'Hány méter drótháló kell egy a = 40 m oldalú négyzetes telekhez, ha két darab 4 méteres kaput is kihagyunk a kerítésen?',
    options: ['160 méter', '152 méter', '156 méter', '144 méter'],
    correctAnswer: 1,
    explanation: 'A teljes kerület K = 4 · 40 = 160 m. Két 4 m-es kapu összesen 8 m levonás: 160 - 8 = 152 méter drótháló kell.',
    hint: '4 · 40 = 160 m. Ebből vond le a két kaput (2 · 4 = 8 m)!',
    breakdown: [{ label: 'Teljes kerület', value: '4 · 40 = 160 m' }, { label: 'Kapuk összege', value: '2 · 4 = 8 m' }, { label: 'Kerítésdrót', value: '160 - 8 = 152 m' }]
  },
  {
    id: 'sum-l3-q7',
    level: 3,
    prompt: 'Egy négyzet területe T = 64 cm². Mennyi a négyzet kerülete?',
    options: ['32 cm', '24 cm', '16 cm', '64 cm'],
    correctAnswer: 0,
    explanation: 'Mivel a · a = 64, így a = 8 cm. A kerület K = 4 · a = 4 · 8 = 32 cm.',
    hint: 'Melyik szám négyzete 64? A 8! Ezután K = 4 · 8.',
    breakdown: [{ label: 'Oldalhossz a', value: '√64 = 8 cm' }, { label: 'Kerület K', value: '4 · 8 = 32 cm' }]
  },
  {
    id: 'sum-l3-q8',
    level: 3,
    prompt: 'Egy gazdaság 15 hektáros búzamezején hektáronként 6 tonna búza termett. Hány mázsa búza termett összesen? (1 tonna = 10 mázsa)',
    options: ['900 mázsa', '90 mázsa', '150 mázsa', '9000 mázsa'],
    correctAnswer: 0,
    explanation: 'Összesen: 15 · 6 = 90 tonna búza. Mivel 1 tonna = 10 mázsa, így 90 · 10 = 900 mázsa termett.',
    hint: '15 · 6 = 90 tonna. Ezt szorozd meg 10-zel a mázsához!',
    breakdown: [{ label: 'Termés tonnában', value: '15 · 6 = 90 t' }, { label: 'Termés mázsában', value: '90 · 10 = 900 q' }]
  },
  {
    id: 'sum-l3-q9',
    level: 3,
    prompt: 'Egy szoba padlója 20 m². Parkettázáskor a levágási hulladék miatt 10% ráhagyással vásárolunk. Hány m² parkettát kell rendelni?',
    options: ['22 m²', '21 m²', '24 m²', '20,5 m²'],
    correctAnswer: 0,
    explanation: '20 m² 10%-a 2 m². Ráhagyással együtt: 20 + 2 = 22 m² parkettát kell rendelni (20 · 1,1 = 22 m²).',
    hint: '20-nak a 10%-a 2 m². Add hozzá a 20-hoz!',
    breakdown: [{ label: '10% ráhagyás', value: '20 · 0,1 = 2 m²' }, { label: 'Rendelendő mennyiség', value: '20 + 2 = 22 m²' }]
  },
  {
    id: 'sum-l3-q10',
    level: 3,
    prompt: 'Egy 40 cm × 50 cm méretű asztallapot 5 cm × 5 cm-es négyzet alakú mozaikokkal fedünk le. Hány darab mozaik fedi le hézagmentesen?',
    options: ['80 db', '40 db', '100 db', '60 db'],
    correctAnswer: 0,
    explanation: 'Asztal területe: 40 · 50 = 2000 cm². Egy mozaik területe: 5 · 5 = 25 cm². Mozaikok száma: 2000 : 25 = 80 darab (vagy az oldalak mentén: 8 · 10 = 80 db).',
    hint: 'Az egyik oldal mentén 40 : 5 = 8 db fér el, a másik mentén 50 : 5 = 10 db. 8 · 10 = 80 db.',
    breakdown: [{ label: 'Sorok és oszlopok', value: '(40:5) · (50:5) = 8 · 10 = 80 db' }]
  },
  {
    id: 'sum-l3-q11',
    level: 3,
    prompt: 'Egy téglalap hossza 16 cm. Területe megegyezik egy 8 cm oldalú négyzet területével. Mennyi a téglalap szélessége?',
    options: ['4 cm', '8 cm', '2 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet területe: 8 · 8 = 64 cm². Téglalap területe is 64 cm². Szélessége: b = 64 : 16 = 4 cm.',
    hint: 'Négyzet területe 8 · 8 = 64 cm². Ezt oszd el 16-tal!',
    breakdown: [{ label: 'Közös terület', value: '8 · 8 = 64 cm²' }, { label: 'Szélesség b', value: '64 : 16 = 4 cm' }]
  },
  {
    id: 'sum-l3-q12',
    level: 3,
    prompt: 'Egy 6 m × 4 m méretű udvar közepére egy 4 m × 2 m-es medencét ásnak. A fennmaradó részt befüvesítik. Hány m² gyepfelület keletkezik?',
    options: ['16 m²', '24 m²', '8 m²', '12 m²'],
    correctAnswer: 0,
    explanation: 'Udvar területe: 6 · 4 = 24 m². Medence területe: 4 · 2 = 8 m². Gyep területe: 24 - 8 = 16 m².',
    hint: 'Az udvar területéből (24 m²) vond ki a medence területét (8 m²)!',
    breakdown: [{ label: 'Udvar', value: '6 · 4 = 24 m²' }, { label: 'Medence', value: '4 · 2 = 8 m²' }, { label: 'Gyep', value: '24 - 8 = 16 m²' }]
  },
  {
    id: 'sum-l3-q13',
    level: 3,
    prompt: 'Egy kocka élhosszát a 3-szorosára növeljük. Hányszorosára nő a felszíne?',
    options: ['3-szorosára', '6-szorosára', '9-szeresére', '27-szeresére'],
    correctAnswer: 2,
    explanation: 'A felszín a lapok területétől függ, a terület pedig a hosszúság négyzetével arányos: 3² = 9-szeresére nő a felszín.',
    hint: 'Ha az él k-szorosára nő, a felület k²-szeresére nő: 3 · 3 = 9.',
    breakdown: [{ label: 'Él változása', value: '· 3' }, { label: 'Felszín változása', value: '3² = 9-szeres' }]
  },
  {
    id: 'sum-l3-q14',
    level: 3,
    prompt: 'Egy kocka térfogata V = 64 cm³. Mennyi a teljes felszíne (A)?',
    options: ['96 cm²', '64 cm²', '48 cm²', '128 cm²'],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-24 mx-auto" viewBox="0 0 80 80">
        <rect x="20" y="25" width="35" height="35" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
        <polygon points="20,25 35,10 70,10 55,25" fill="#c7d2fe" stroke="#4338ca" strokeWidth="2" />
        <polygon points="55,25 70,10 70,45 55,60" fill="#a5b4fc" stroke="#4338ca" strokeWidth="2" />
        <text x="37" y="47" textAnchor="middle" className="text-[9px] font-bold fill-indigo-950">V = 64</text>
      </svg>
    ),
    explanation: 'Mivel a · a · a = 64, így a = 4 cm. Egy lap területe 4 · 4 = 16 cm². Felszíne: A = 6 · 16 = 96 cm².',
    hint: 'Előbb keresd meg az élet: melyik számnak a köbe 64? (4). Aztán A = 6 · (4 · 4).',
    breakdown: [{ label: 'Él a', value: '∛64 = 4 cm' }, { label: 'Felszín A', value: '6 · (4 · 4) = 96 cm²' }]
  },
  {
    id: 'sum-l3-q15',
    level: 3,
    prompt: 'Egy téglatest élei 6 cm, 4 cm és 3 cm. Egyetlen sarokkockát (1 cm élű) kivágunk belőle. Mennyi lesz a megmaradt test felszíne az eredeti 108 cm²-hez képest?',
    options: [
      'Pontosan 108 cm² marad (nem változik)',
      '105 cm² lesz (3 cm²-rel csökken)',
      '111 cm² lesz (3 cm²-rel nő)',
      '102 cm² lesz (6 cm²-rel csökken)'
    ],
    correctAnswer: 0,
    explanation: 'A sarok kivágásakor 3 darab 1 cm²-es külső lap eltűnik, de a helyükön 3 darab azonos méretű belső lap keletkezik, így a teljes felszín változatlanul 108 cm² marad!',
    hint: 'Gondolj a lépcsős sarokra: 3 lap eltűnt, de 3 új lap váltja fel!',
    breakdown: [{ label: 'Eltűnő felület', value: '-3 cm²' }, { label: 'Keletkező belső felület', value: '+3 cm²' }, { label: 'Eredmény', value: 'Változatlan: 108 cm²' }]
  },
  {
    id: 'sum-l3-q16',
    level: 3,
    prompt: 'Egy nyitott fadoboz belső méretei: 50 cm hosszú, 30 cm széles, 20 cm magas. Belülről lefestjük (az alját és a 4 oldalfalat). Hány dm² a festendő felület?',
    options: ['47 dm²', '79 dm²', '32 dm²', '50 dm²'],
    correctAnswer: 0,
    explanation: 'Méretek dm-ben: a = 5 dm, b = 3 dm, c = 2 dm. Alap: 5 · 3 = 15 dm². 4 fal: 2 · (5·2 + 3·2) = 2 · (10 + 6) = 32 dm². Teljes felület: 15 + 32 = 47 dm².',
    hint: 'Válts át dm-re (5, 3, 2). Számold ki az alapot (15) és a 4 falat (32), majd add össze!',
    breakdown: [{ label: 'Alap területe', value: '5 · 3 = 15 dm²' }, { label: '4 oldalfal', value: '2 · (10 + 6) = 32 dm²' }, { label: 'Összeg', value: '15 + 32 = 47 dm²' }]
  },
  {
    id: 'sum-l3-q17',
    level: 3,
    prompt: 'Egy kocka 12 élének összege 72 cm. Mennyi a kocka teljes felszíne?',
    options: ['216 cm²', '144 cm²', '288 cm²', '36 cm²'],
    correctAnswer: 0,
    explanation: 'Egy él hossza: 72 : 12 = 6 cm. Egy lap területe: 6 · 6 = 36 cm². Felszíne: A = 6 · 36 = 216 cm².',
    hint: 'Oszd el a 72-t 12-vel (6 cm). A = 6 · (6 · 6).',
    breakdown: [{ label: 'Élhossz a', value: '72 : 12 = 6 cm' }, { label: 'Felszín A', value: '6 · (6 · 6) = 216 cm²' }]
  },
  {
    id: 'sum-l3-q18',
    level: 3,
    prompt: 'Egy téglatest alapja négyzet (a = 4 cm), magassága m = 10 cm. Mennyi a téglatest felszíne?',
    options: ['192 cm²', '160 cm²', '176 cm²', '96 cm²'],
    correctAnswer: 0,
    explanation: 'Alap és fedél: 2 · (4 · 4) = 32 cm². 4 oldallap: 4 · (4 · 10) = 160 cm². Felszín: 32 + 160 = 192 cm².',
    hint: '2 négyzetlap (2 · 16 = 32) és 4 téglalaplap (4 · 40 = 160).',
    breakdown: [{ label: 'Alap és fedél', value: '2 · 16 = 32 cm²' }, { label: '4 oldallap', value: '4 · 40 = 160 cm²' }, { label: 'Felszín', value: '32 + 160 = 192 cm²' }]
  },
  {
    id: 'sum-l3-q19',
    level: 3,
    prompt: 'Egy kocka élhosszát a 2-szeresére növeljük. Hányszorosára nő a térfogata?',
    options: ['2-szeresére', '4-szeresére', '6-szorosára', '8-szorosára'],
    correctAnswer: 3,
    explanation: 'A térfogat a 3 dimenzió szorzata: 2 · 2 · 2 = 2³ = 8-szorosára növekszik.',
    hint: 'V = a · a · a. Ha minden él 2-szeresére nő: 2 · 2 · 2 = 8.',
    breakdown: [{ label: 'Él növekedése', value: '· 2' }, { label: 'Térfogat növekedése', value: '2³ = 8-szoros' }]
  },
  {
    id: 'sum-l3-q20',
    level: 3,
    prompt: 'Egy 50 cm × 40 cm alapterületű akváriumban 30 cm magasan áll a víz. Beleteszünk egy tömör fémtestet, amitől a vízszint 2 cm-t emelkedik. Mennyi a fémtest térfogata?',
    options: ['4000 cm³ (4 liter)', '2000 cm³ (2 liter)', '60 000 cm³', '8000 cm³'],
    correctAnswer: 0,
    explanation: 'A kiszorított víz térfogata megegyezik a test térfogatával: V = 50 · 40 · 2 = 4000 cm³ = 4 dm³ = 4 liter.',
    hint: 'Csak az emelkedés magasságával számolj: 50 · 40 · 2!',
    breakdown: [{ label: 'Alapterület', value: '50 · 40 = 2000 cm²' }, { label: 'Kiszorított víz', value: '2000 · 2 = 4000 cm³ = 4 l' }]
  },
  {
    id: 'sum-l3-q21',
    level: 3,
    prompt: 'Egy kocka alakú víztartály térfogata V = 216 dm³. Hány deciméter hosszú a tartály éle?',
    options: ['6 dm', '8 dm', '12 dm', '4 dm'],
    correctAnswer: 0,
    explanation: 'Mivel a · a · a = 216, és 6 · 6 · 6 = 216, így az él hossza a = 6 dm.',
    hint: 'Melyik számot kell háromszor összeszorozni, hogy 216-ot kapjunk? (6 · 6 · 6 = 216).',
    breakdown: [{ label: 'Élhossz a', value: '∛216 = 6 dm' }]
  },
  {
    id: 'sum-l3-q22',
    level: 3,
    prompt: 'Egy kerti medence méretei 6 m × 4 m × 1,5 m. Egy kerti csapból percenként 50 liter víz folyik. Hány óra alatt telik meg a teljesen üres medence?',
    options: ['12 óra', '10 óra', '15 óra', '8 óra'],
    correctAnswer: 0,
    explanation: 'Medence térfogata: 6 · 4 · 1,5 = 36 m³ = 36 000 liter. Töltési idő percben: 36 000 : 50 = 720 perc. Órában: 720 : 60 = 12 óra.',
    hint: '36 000 litert kell feltölteni. 36 000 : 50 = 720 perc. Oszd el 60-nal az órához!',
    breakdown: [{ label: 'Térfogat literben', value: '36 m³ = 36 000 l' }, { label: 'Idő percben', value: '36 000 : 50 = 720 perc' }, { label: 'Idő órában', value: '720 : 60 = 12 óra' }]
  },
  {
    id: 'sum-l3-q23',
    level: 3,
    prompt: 'Egy 80 literes hordóból kimérünk 350 dl vizet. Hány liter víz marad a hordóban?',
    options: ['45 liter', '55 liter', '450 liter', '35 liter'],
    correctAnswer: 0,
    explanation: '350 dl = 35 liter. Maradék víz: 80 - 35 = 45 liter.',
    hint: 'Váltsd át a 350 dl-t literre (35 l), majd vond ki 80-ból!',
    breakdown: [{ label: 'Kimért víz', value: '350 dl = 35 liter' }, { label: 'Maradék', value: '80 - 35 = 45 liter' }]
  },
  {
    id: 'sum-l3-q24',
    level: 3,
    prompt: 'Egy négyzetes oszlop térfogata 300 cm³, magassága 12 cm. Milyen hosszú az alapnégyzet éle?',
    options: ['5 cm', '6 cm', '4 cm', '25 cm'],
    correctAnswer: 0,
    explanation: 'Alapterület: T_alap = V : m = 300 : 12 = 25 cm². Mivel az alap egy négyzet: a · a = 25, így a = 5 cm.',
    hint: 'Alapterület = 300 : 12 = 25 cm². Melyik szám négyzete 25? Az 5!',
    breakdown: [{ label: 'Alapterület', value: '300 : 12 = 25 cm²' }, { label: 'Alap élhossza a', value: '√25 = 5 cm' }]
  },
  {
    id: 'sum-l3-q25',
    level: 3,
    prompt: 'Egy 5 m × 4 m-es, 3 m belmagasságú szoba mennyezetét és 4 falát kifestjük. Az ajtó és ablakok együttes felülete 6 m², amit nem festünk. Hány m² a ténylegesen festendő felület?',
    options: ['68 m²', '74 m²', '88 m²', '60 m²'],
    correctAnswer: 0,
    explanation: 'Mennyezet: 5 · 4 = 20 m². 4 fal: 2 · (5·3 + 4·3) = 2 · (15 + 12) = 54 m². Bruttó felület: 20 + 54 = 74 m². Levonás: 74 - 6 = 68 m².',
    hint: 'Plafon (20 m²) + 4 fal (54 m²) = 74 m². Ebből vond le a 6 m² nyílászárót!',
    breakdown: [{ label: 'Plafon', value: '20 m²' }, { label: 'Falak', value: '54 m²' }, { label: 'Nyílások levonása', value: '74 - 6 = 68 m²' }]
  },
  {
    id: 'sum-l3-q26',
    level: 3,
    prompt: 'Egy 68 m²-es szobát 2 rétegben festünk le. 1 liter festék 10 m²-re elég egy rétegben. A festéket 5 literes vödrökben árusítják. Hány egész vödröt kell megvenni?',
    options: ['3 vödör', '2 vödör', '4 vödör', '1 vödör'],
    correctAnswer: 0,
    explanation: '2 réteg felülete: 68 · 2 = 136 m². Szükséges festék: 136 : 10 = 13,6 liter. Vödrök száma: 13,6 : 5 = 2,72 vödör. Felfelé kerekítve 3 egész vödör kell (15 liter).',
    hint: '2 réteg = 136 m². Kell 13,6 liter festék. 2 vödör csak 10 liter, ami kevés, így 3 vödör kell!',
    breakdown: [{ label: '2 réteg', value: '68 · 2 = 136 m²' }, { label: 'Liter festék', value: '136 : 10 = 13,6 liter' }, { label: 'Egész vödrök', value: '3 db 5 literes vödör' }]
  },
  {
    id: 'sum-l3-q27',
    level: 3,
    prompt: 'Egy 4 m × 3 m × 1,2 m méretű kerti medencét 10 cm-rel a perem alattig töltünk fel vízzel. Hány liter víz van a medencében?',
    options: ['13 200 liter', '14 400 liter', '12 000 liter', '1320 liter'],
    correctAnswer: 0,
    explanation: 'A tényleges vízmélység: 1,2 m - 0,1 m = 1,1 m. Víz térfogata: 4 · 3 · 1,1 = 13,2 m³ = 13 200 liter.',
    hint: 'A víz magassága 1,1 méter (1,2 - 0,1). V = 4 · 3 · 1,1 = 13,2 m³ = 13 200 liter.',
    breakdown: [{ label: 'Vízmagasság', value: '1,2 m - 0,1 m = 1,1 m' }, { label: 'Vízmennyiség', value: '4 · 3 · 1,1 = 13,2 m³ = 13 200 l' }]
  },
  {
    id: 'sum-l3-q28',
    level: 3,
    prompt: 'Egy tömör fa kocka éle 6 cm. Hány darab 2 cm élű kis kockára fűrészelhető fel hézagmentesen?',
    options: ['27 db', '9 db', '18 db', '36 db'],
    correctAnswer: 0,
    explanation: 'Nagy kocka térfogata: 6 · 6 · 6 = 216 cm³. Kis kocka térfogata: 2 · 2 · 2 = 8 cm³. Kockák száma: 216 : 8 = 27 db (vagy minden él mentén 6 : 2 = 3 db fér el: 3 · 3 · 3 = 27 db).',
    hint: 'Minden él mentén 6 : 2 = 3 kis kocka fér el. Összesen: 3 · 3 · 3 = 27 db.',
    breakdown: [{ label: 'Minden él mentén', value: '6 : 2 = 3 db' }, { label: 'Összes kis kocka', value: '3 · 3 · 3 = 27 db' }]
  },
  {
    id: 'sum-l3-q29',
    level: 3,
    prompt: 'Egy 10 m × 8 m-es téglalap alakú kertet 2 méterenként elhelyezett kerítésoszlopokkal kerítünk körbe zárt láncban. Hány oszlop szükséges összesen?',
    options: ['18 oszlop', '19 oszlop', '36 oszlop', '20 oszlop'],
    correctAnswer: 0,
    explanation: 'A kert kerülete K = 2 · (10 + 8) = 36 m. Zárt kerület mentén az oszlopok száma: 36 : 2 = 18 darab.',
    hint: 'Zárt alakzatnál az oszlopok száma megegyezik a szakaszok számával: Kerület : távolság = 36 : 2 = 18.',
    breakdown: [{ label: 'Kerület', value: '2 · 18 = 36 m' }, { label: 'Oszlopok száma', value: '36 : 2 = 18 oszlop' }]
  },
  {
    id: 'sum-l3-q30',
    level: 3,
    prompt: 'Egy téglatest alakú ládába (hossza 60 cm, szélessége 40 cm, magassága 30 cm) 10 cm élű kocka alakú dobozokat pakolunk. Legfeljebb hány darab doboz fér el benne?',
    options: ['72 db', '60 db', '80 db', '120 db'],
    correctAnswer: 0,
    explanation: 'Hosszában: 60 : 10 = 6 db. Szélességében: 40 : 10 = 4 db. Magasságában: 30 : 10 = 3 db. Összesen: 6 · 4 · 3 = 72 darab doboz fér bele.',
    hint: 'Számold ki, hány doboz fér el hosszában (6), széltében (4) és magasságban (3): 6 · 4 · 3 = 72 db.',
    breakdown: [{ label: 'Rétegenkénti elhelyezés', value: '6 · 4 = 24 db egy rétegben' }, { label: '3 rétegben', value: '24 · 3 = 72 db' }]
  }
];

export const MeasurementSummaryQuiz: React.FC<MeasurementSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Témazáró felkészítő kvíz"
      subtitle="Átfogó témazáró teszt 3×30 feladattal, párosítóval és csoportosítóval"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 10. KVÍZ"
      storageKey="g5-meas-summary-quiz"
      questions={SUMMARY_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <MeasurementSummaryMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <MeasurementSummarySorter
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheets={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">1. Szint Puskája: Képletek & Váltószámok</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <strong>Hosszúság (1D):</strong> 1 m = 10 dm = 100 cm = 1000 mm.
              </div>
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <strong>Terület (2D):</strong> 1 m² = 100 dm² = 10 000 cm².
              </div>
              <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <strong>Felszín (A):</strong> Kocka: 6a², Téglatest: 2(ab+bc+ac).
              </div>
              <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <strong>Térfogat (3D):</strong> 1 dm³ = 1 liter, 1 m³ = 1000 liter.
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">2. Szint Puskája: Mezőgazdaság & Folyadékok</div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div>• <strong>1 ár (a):</strong> 100 m² | <strong>1 hektár (ha):</strong> 10 000 m² = 100 a | <strong>1 km²:</strong> 100 ha</div>
              <div>• <strong>Téglatest térfogata:</strong> V = a · b · c = T_alap · magasság</div>
              <div>• <strong>Nyitott doboz / szobafestés:</strong> Csak 5 lap (1 alap + 4 oldal)!</div>
              <div>• <strong>Anyagszükséglet:</strong> Felfelé kerekítés egész dobozra/darabra.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">3. Szint Puskája: Mesterfogások</div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div>• <strong>Él megduplázása:</strong> Felület 4-szeresére (2²), térfogat 8-szorosára (2³) nő!</div>
              <div>• <strong>Kiszorított víz:</strong> V_test = alapterület · vízszint-emelkedés</div>
              <div>• <strong>Szobafestés:</strong> Mennyezet (ab) + 4 fal [2(ac+bc)] - ablakok/ajtók.</div>
              <div>• <strong>Zárt kerület menti oszlopok:</strong> Oszlopok száma = Kerület : távolság</div>
            </div>
          </div>
        )
      }}
    />
  );
};
