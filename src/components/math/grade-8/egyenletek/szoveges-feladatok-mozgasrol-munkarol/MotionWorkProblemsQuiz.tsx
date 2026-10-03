import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Timer,
  Car,
  Gauge,
  Clock,
  Waves,
  Hammer,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRightLeft,
  LayoutGrid,
  Bike,
  Ship
} from 'lucide-react';
import { MotionWorkProblemsMatcher } from './MotionWorkProblemsMatcher';
import { MotionWorkProblemsSorter } from './MotionWorkProblemsSorter';

interface MotionWorkProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egyenletes Mozgás Alaptörvénye',
    icon: <Gauge className="w-4 h-4 text-blue-600" />,
    formula: 's = v · t \\quad | \\quad v = \\frac{s}{t} \\quad | \\quad t = \\frac{s}{v}',
    note: 'Út = Sebesség × Idő. A mértékegységeknek egyezniük kell: km, óra és km/h!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="80,8 40,38 120,38" className="fill-blue-50 stroke-blue-400 stroke-[1]" />
        <line x1="60" y1="23" x2="100" y2="23" className="stroke-blue-400 stroke-[1]" />
        <line x1="80" y1="23" x2="80" y2="38" className="stroke-blue-400 stroke-[1]" />
        <text x="80" y="19" className="text-[9px] font-bold fill-blue-800" textAnchor="middle">s</text>
        <text x="68" y="34" className="text-[9px] font-bold fill-blue-800" textAnchor="middle">v</text>
        <text x="92" y="34" className="text-[9px] font-bold fill-blue-800" textAnchor="middle">t</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Találkozási Mozgások (Szembe)',
    icon: <Car className="w-4 h-4 text-indigo-600" />,
    formula: 's₁ + s₂ = s_összes \\implies (v₁ + v₂) · t = s_összes',
    note: 'Egymással szembe haladva a járművek sebességei összeadódnak (közeledési sebesség).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-slate-300 stroke-[2]" />
        <circle cx="30" cy="22" r="6" className="fill-blue-500" />
        <path d="M 40 22 L 60 22 M 55 18 L 60 22 L 55 26" className="stroke-blue-600 stroke-[1.5] fill-none" />
        <circle cx="130" cy="22" r="6" className="fill-indigo-500" />
        <path d="M 120 22 L 100 22 M 105 18 L 100 22 L 105 26" className="stroke-indigo-600 stroke-[1.5] fill-none" />
        <line x1="80" y1="12" x2="80" y2="32" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Utolérési Mozgások (Egyirányú)',
    icon: <Bike className="w-4 h-4 text-emerald-600" />,
    formula: 'v_gyors · t - v_lassú · t = s₀ \\implies t = \\frac{s₀}{v_gyors - v_lassú}',
    note: 'A gyorsabb jármű a sebességkülönbséggel dolgozza le a lassabb kezdeti előnyét.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-slate-300 stroke-[2]" />
        <circle cx="25" cy="22" r="5" className="fill-emerald-600" />
        <path d="M 33 22 L 65 22 M 60 18 L 65 22 L 60 26" className="stroke-emerald-600 stroke-[1.5] fill-none" />
        <circle cx="75" cy="22" r="5" className="fill-slate-500" />
        <path d="M 83 22 L 100 22 M 95 18 L 100 22 L 95 26" className="stroke-slate-500 stroke-[1.5] fill-none" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Folyóvízi Mozgások',
    icon: <Ship className="w-4 h-4 text-teal-600" />,
    formula: 'v_le = v_saját + v_folyó \\quad | \\quad v_fel = v_saját - v_folyó',
    note: 'Folyásirányban a sodrás hozzáadódik, szemben levonódik a hajó saját sebességéből.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <path d="M 20 28 Q 50 16 80 28 T 140 28" className="stroke-teal-300 stroke-[2] fill-none" />
        <rect x="60" y="16" width="35" height="12" rx="3" className="fill-teal-600" />
        <text x="77" y="25" className="text-[7px] font-bold fill-white" textAnchor="middle">v_saját</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Együttes Munkavégzés',
    icon: <Hammer className="w-4 h-4 text-amber-600" />,
    formula: '\\frac{1}{t₁} + \\frac{1}{t₂} = \\frac{1}{t_együtt} \\implies t_együtt = \\frac{t₁ \\cdot t₂}{t₁ + t₂}',
    note: 'Az 1 óra alatt elvégzett munkarészek (teljesítmények) adódnak össze!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="20" y="14" width="30" height="18" rx="3" className="fill-blue-100 stroke-blue-400 stroke-[1]" />
        <text x="35" y="26" className="text-[8px] font-bold fill-blue-800" textAnchor="middle">1/t₁</text>
        <text x="60" y="27" className="text-[11px] font-bold fill-slate-500">+</text>
        <rect x="70" y="14" width="30" height="18" rx="3" className="fill-indigo-100 stroke-indigo-400 stroke-[1]" />
        <text x="85" y="26" className="text-[8px] font-bold fill-indigo-800" textAnchor="middle">1/t₂</text>
        <text x="110" y="27" className="text-[11px] font-bold fill-slate-500">=</text>
        <rect x="120" y="14" width="28" height="18" rx="3" className="fill-emerald-500" />
        <text x="134" y="26" className="text-[8px] font-bold fill-white" textAnchor="middle">1/t_e</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Medencetöltő és Ürítő Csap',
    icon: <Waves className="w-4 h-4 text-sky-600" />,
    formula: '\\frac{1}{t_töltő} - \\frac{1}{t_lefolyó} = \\frac{1}{t_eredő}',
    note: 'A leeresztő csap csökkenti a vízmennyiséget, ezért a teljesítménye kivonandó.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="35" y="12" width="90" height="22" rx="4" className="fill-sky-50 stroke-sky-400 stroke-[1.5]" />
        <rect x="37" y="22" width="86" height="10" rx="2" className="fill-sky-300/60" />
        <text x="80" y="29" className="text-[8px] font-bold fill-sky-900" textAnchor="middle">1/t_be - 1/t_ki</text>
      </svg>
    )
  }
];

const level1Questions = [
  {
    id: 'l1-1',
    title: 'Egyszerű út számítás',
    question: 'Egy autó 80 km/h állandó sebességgel halad. Mennyi utat tesz meg 2,5 óra alatt?',
    options: ['200 km', '160 km', '240 km', '180 km'],
    correctAnswer: 0,
    hint: 'Használd az s = v · t képletet: 80 · 2,5.',
    explanation: 's = v · t = 80 km/h · 2,5 h = 200 km.'
  },
  {
    id: 'l1-2',
    title: 'Átlagsebesség meghatározása',
    question: 'Egy kerékpáros 45 km távolságot 3 óra alatt tesz meg. Mennyi az átlagsebessége?',
    options: ['15 km/h', '12 km/h', '18 km/h', '20 km/h'],
    correctAnswer: 0,
    hint: 'v = s / t: oszd el a megtett utat az eltelt idővel!',
    explanation: 'v = s / t = 45 km / 3 h = 15 km/h.'
  },
  {
    id: 'l1-3',
    title: 'Percek átváltása órára',
    question: 'Hány órának felel meg 45 perc a mozgásos feladatok képleteiben?',
    options: ['0,75 óra', '0,45 óra', '0,6 óra', '0,8 óra'],
    correctAnswer: 0,
    hint: '45 perc = 45/60 óra. Egyszerűsítsd 15-tel!',
    explanation: '45 perc = 45 / 60 óra = 3 / 4 óra = 0,75 óra. Soha ne írj 0,45-öt!'
  },
  {
    id: 'l1-4',
    title: 'Időtartam kiszámítása',
    question: 'Egy gyalogos 4 km/h sebességgel halad. Hány óra alatt tesz meg 14 km távolságot?',
    options: ['3,5 óra', '3,2 óra', '4 óra', '3 óra 15 perc'],
    correctAnswer: 0,
    hint: 't = s / v: 14 / 4.',
    explanation: 't = s / v = 14 / 4 = 3,5 óra (azaz 3 óra 30 perc).'
  },
  {
    id: 'l1-5',
    title: 'Szimmetrikus találkozás',
    question: 'Két város távolsága 120 km. Egyszerre indul egymással szembe két autó, mindkettő 60 km/h sebességgel. Hány óra múlva találkoznak?',
    options: ['1 óra múlva', '1,5 óra múlva', '2 óra múlva', '45 perc múlva'],
    correctAnswer: 0,
    hint: 'A két autó együtt 60 + 60 = 120 km-t tesz meg óránként.',
    explanation: 'Közeledési sebesség: 60 + 60 = 120 km/h. Idő: t = 120 / 120 = 1 óra.'
  },
  {
    id: 'l1-6',
    title: 'Munkarész 1 óra alatt',
    question: 'Egy kerti csap egyedül 6 óra alatt tölti meg a hordót. A hordó mekkora részét tölti meg 1 óra alatt?',
    options: ['1/6 részét', '1/3 részét', '6-szorosát', '5/6 részét'],
    correctAnswer: 0,
    hint: 'Ha a teljes hordóhoz 6 óra kell, 1 óra alatt a hatoda készül el.',
    explanation: 'A teljesítmény az idő reciproka: 1 / 6 rész óránként.'
  },
  {
    id: 'l1-7',
    title: 'Hajó folyásirányban',
    question: 'Egy hajó saját sebessége állóvízben 20 km/h, a folyó sodrása 4 km/h. Mekkora sebességgel halad a hajó a folyás irányában lefelé?',
    options: ['24 km/h', '16 km/h', '20 km/h', '28 km/h'],
    correctAnswer: 0,
    hint: 'Folyásirányban a folyó sebessége hozzáadódik a hajó saját sebességéhez.',
    explanation: 'v_le = v_saját + v_folyó = 20 + 4 = 24 km/h.'
  },
  {
    id: 'l1-8',
    title: 'Km/h átváltása m/s-ra',
    question: 'Egy vonat 72 km/h sebességgel robog. Hány métert tesz meg másodpercenként (m/s)?',
    options: ['20 m/s', '25 m/s', '15 m/s', '72 m/s'],
    correctAnswer: 0,
    hint: 'Oszd el a km/h értéket 3,6-del (72 / 3,6).',
    explanation: '72 km/h = 72 000 m / 3600 s = 72 / 3,6 = 20 m/s.'
  },
  {
    id: 'l1-9',
    title: 'Azonos munkaidejű munkások',
    question: 'Ha Péter 4 óra alatt, Pál szintén 4 óra alatt végez el egy munkát, hány óra alatt végzik el közösen?',
    options: ['2 óra alatt', '4 óra alatt', '8 óra alatt', '1 óra alatt'],
    correctAnswer: 0,
    hint: 'Ketten együtt kétszer olyan gyorsak, mint egyedül: 4 / 2.',
    explanation: '1/4 + 1/4 = 2/4 = 1/2. Tehát a közös idő: t = 2 óra.'
  },
  {
    id: 'l1-10',
    title: 'Azonos irányú távolodás',
    question: 'Két autó azonos pontból indul egyenes úton: az egyik 90 km/h-val, a másik 70 km/h-val. Mekkora lesz köztük a távolság 2 óra múlva?',
    options: ['40 km', '20 km', '160 km', '30 km'],
    correctAnswer: 0,
    hint: 'Óránként (90 - 70) = 20 km-rel távolodnak egymástól.',
    explanation: 'd = (v₁ - v₂) · t = (90 - 70) · 2 = 20 · 2 = 40 km.'
  }
];

const level2Questions = [
  {
    id: 'l2-1',
    title: 'Két város közötti találkozás',
    question: 'Két város távolsága 180 km. Egyszerre indul egymással szembe két autó, az egyik 50 km/h, a másik 40 km/h sebességgel. Hány óra múlva találkoznak?',
    options: ['2 óra múlva', '1,5 óra múlva', '2,5 óra múlva', '3 óra múlva'],
    correctAnswer: 0,
    hint: 'Közeledési sebesség: 50 + 40 = 90 km/h. t = 180 / 90.',
    explanation: 's₁ + s₂ = 180  →  (50 + 40) · t = 180  →  90t = 180  →  t = 2 óra.'
  },
  {
    id: 'l2-2',
    title: 'Két munkás közös munkája',
    question: 'Egy kerti munkát Tamás egyedül 12 óra alatt, Gábor egyedül 6 óra alatt végez el. Hány óra alatt végzik el a munkát közösen?',
    options: ['4 óra alatt', '3 óra alatt', '4,5 óra alatt', '9 óra alatt'],
    correctAnswer: 0,
    hint: '1 óra alatt: 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4.',
    explanation: '1/12 + 1/6 = 3/12 = 1/4 rész óránként. t_együtt = 4 óra.'
  },
  {
    id: 'l2-3',
    title: 'Gyalogos utolérése kerékpárral',
    question: 'Egy gyalogos 4 km/h sebességgel elindult. 3 óra múlva ugyaninnen kerékpáros indult utána 16 km/h sebességgel. Hány óra múlva éri utol a kerékpáros a gyalogost?',
    options: ['1 óra múlva', '1,5 óra múlva', '45 perc múlva', '2 óra múlva'],
    correctAnswer: 0,
    hint: 'A gyalogos előnye: 3 · 4 = 12 km. Sebességkülönbség: 16 - 4 = 12 km/h.',
    explanation: '16 · t = 4 · (t + 3)  →  16t = 4t + 12  →  12t = 12  →  t = 1 óra.'
  },
  {
    id: 'l2-4',
    title: 'Motorcsónak útja folyón',
    question: 'Egy motorcsónak saját sebessége 22 km/h, a folyó sebessége 3 km/h. Mennyi utat tesz meg a csónak folyásirányban lefelé 4 óra alatt?',
    options: ['100 km', '76 km', '88 km', '96 km'],
    correctAnswer: 0,
    hint: 'Folyásirányban v = 22 + 3 = 25 km/h. s = 25 · 4.',
    explanation: 'v_le = 22 + 3 = 25 km/h. s = v · t = 25 · 4 = 100 km.'
  },
  {
    id: 'l2-5',
    title: 'Tartálytöltés nyitott lefolyóval',
    question: 'Egy tartályt a beömlő csap 4 óra alatt tölt meg, a leeresztő csap 6 óra alatt ürít ki teljesen. Ha mindkettő nyitva van, hány óra alatt telik meg a tartály?',
    options: ['12 óra alatt', '10 óra alatt', '8 óra alatt', '5 óra alatt'],
    correctAnswer: 0,
    hint: '1/4 - 1/6 = 3/12 - 2/12 = 1/12.',
    explanation: '1 óra alatt a vízmennyiség: 1/4 - 1/6 = 1/12 rész. A teljes tartály 12 óra alatt telik meg.'
  },
  {
    id: 'l2-6',
    title: 'Gyorsabb jármű megtett útja',
    question: 'Budapest és Bécs távolsága 240 km. Egyszerre indul szembe egy teherautó 50 km/h és egy személyautó 70 km/h sebességgel. Mekkora utat tesz meg a személyautó a találkozásig?',
    options: ['140 km', '100 km', '120 km', '150 km'],
    correctAnswer: 0,
    hint: 'Találkozási idő: 240 / (50 + 70) = 2 óra. A személyautó útja: 70 · 2.',
    explanation: 't = 240 / (50 + 70) = 240 / 120 = 2 óra. Személyautó: s = 70 km/h · 2 h = 140 km.'
  },
  {
    id: 'l2-7',
    title: 'Szobafestés együtt',
    question: 'Egy szobát Anna 15 óra alatt, Bea 10 óra alatt festene ki egyedül. Hány óra alatt végeznek a festéssel, ha együtt dolgoznak?',
    options: ['6 óra alatt', '5 óra alatt', '7,5 óra alatt', '8 óra alatt'],
    correctAnswer: 0,
    hint: '1/15 + 1/10 = 2/30 + 3/30 = 5/30 = 1/6.',
    explanation: '1 óra alatt: 1/15 + 1/10 = 5/30 = 1/6 rész. Közös idő: t = 6 óra.'
  },
  {
    id: 'l2-8',
    title: 'Állóvízi sebesség visszaszámítása',
    question: 'Egy motorcsónak a folyón felfelé (sodrással szemben) 3 óra alatt 48 km-t tesz meg. A folyó sebessége 2 km/h. Mennyi a csónak saját sebessége?',
    options: ['18 km/h', '16 km/h', '14 km/h', '20 km/h'],
    correctAnswer: 0,
    hint: 'Felfelé a sebesség v_fel = 48 / 3 = 16 km/h. v_saját = v_fel + v_folyó.',
    explanation: 'v_fel = 48 / 3 = 16 km/h. v_fel = v_saját - 2  →  v_saját = 16 + 2 = 18 km/h.'
  },
  {
    id: 'l2-9',
    title: 'Eltérő indulású gyalogos és bringás',
    question: 'Két falu távolsága 27 km. Reggel 8-kor elindul egy gyalogos 4 km/h-val A-ból B felé. 9-kor elindul egy kerékpáros B-ből A felé 19 km/h-val. Hány órakor találkoznak?',
    options: ['10:00-kor', '10:30-kor', '9:45-kor', '11:00-kor'],
    correctAnswer: 0,
    hint: '8-tól 9-ig a gyalogos megtesz 4 km-t, marad 23 km. 23 / (4 + 19) = 1 óra.',
    explanation: 'A maradék távolság 9:00-kor: 27 - 4 = 23 km. t = 23 / (4 + 19) = 1 óra. 9:00 + 1 óra = 10:00.'
  },
  {
    id: 'l2-10',
    title: 'Három csap medencetöltése',
    question: 'Egy medencét az első csap 6 óra, a második 12 óra, a harmadik 4 óra alatt tölt meg egyedül. Hány óra alatt töltik meg együtt?',
    options: ['2 óra alatt', '3 óra alatt', '1,5 óra alatt', '2,5 óra alatt'],
    correctAnswer: 0,
    hint: '1/6 + 1/12 + 1/4 = 2/12 + 1/12 + 3/12 = 6/12 = 1/2.',
    explanation: '1 óra alatt: 1/6 + 1/12 + 1/4 = 6/12 = 1/2 rész. Teljes idő: t = 2 óra.'
  }
];

const level3Questions = [
  {
    id: 'l3-1',
    title: 'Oda-vissza út átlagsebessége',
    question: 'Egy autós 120 km-t tesz meg odafelé 60 km/h sebességgel, majd visszafelé 40 km/h-val jön. Mennyi a teljes oda-vissza út átlagsebessége?',
    options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
    correctAnswer: 0,
    hint: 'Átlagsebesség = Összes út / Összes idő! Odaút: 2 óra, visszaút: 3 óra.',
    explanation: 'Összes út = 240 km. Odaút ideje = 120/60 = 2 h, visszaút = 120/40 = 3 h. Összes idő = 5 h. v_átlag = 240 / 5 = 48 km/h (harmonikus közép!).'
  },
  {
    id: 'l3-2',
    title: 'Találkozás pihenővel',
    question: 'Két városból (340 km távolság) reggel 8-kor elindul két autó egymással szembe: 70 km/h és 80 km/h sebességgel. Az első autó 9:00 és 9:30 között fél órát pihen. Hány órakor találkoznak?',
    options: ['10:30-kor', '10:00-kor', '11:00-kor', '10:15-kor'],
    correctAnswer: 0,
    hint: '8-tól 9-ig megtesznek 70 + 80 = 150 km-t. 9-től 9:30-ig csak a 2. autó halad (40 km).',
    explanation: '9:30-ig megtett út: 70 + 80 + 40 = 190 km. Marad 340 - 190 = 150 km. 9:30 után: 150 / (70 + 80) = 1 óra. Találkozás: 9:30 + 1 óra = 10:30.'
  },
  {
    id: 'l3-3',
    title: 'Félig teli medence lefolyóval',
    question: 'Egy medencét egy csap 6 óra alatt töltene meg, a lefolyó 8 óra alatt ürítené ki. A medence félig volt vízzel, amikor megnyitották mindkét csapot. Hány óra múlva telik meg teljesen?',
    options: ['12 óra múlva', '24 óra múlva', '8 óra múlva', '16 óra múlva'],
    correctAnswer: 0,
    hint: 'Óránként: 1/6 - 1/8 = 1/24 rész telik meg. A medence feléhez (1/2 rész) mennyi idő kell?',
    explanation: '1 óra alatt: 1/6 - 1/8 = 4/24 - 3/24 = 1/24 rész. A hiányzó 1/2 rész feltöltéséhez: (1/2) / (1/24) = 12 óra szükséges.'
  },
  {
    id: 'l3-4',
    title: 'Kieső munkás esete',
    question: 'Két munkás együtt 12 nap alatt végezne el egy munkát. 8 napig együtt dolgoztak, majd az egyik megbetegedett, és a másik egyedül fejezte be még 10 nap alatt. Hány nap alatt csinálta volna meg a második egyedül az egészet?',
    options: ['30 nap alatt', '24 nap alatt', '36 nap alatt', '20 nap alatt'],
    correctAnswer: 0,
    hint: '8 nap alatt a munka 8/12 = 2/3 része készült el. A maradék 1/3-ot 10 nap alatt végezte el.',
    explanation: 'A hátralévő 1/3 részt a második munkás 10 nap alatt fejezte be, tehát a teljes munkát egyedül 10 · 3 = 30 nap alatt végezte volna el.'
  },
  {
    id: 'l3-5',
    title: 'Két vonat előzése',
    question: 'Egy 100 km/h-val száguldó 100 m hosszú gyorsvonat megelőz egy azonos irányban 60 km/h-val haladó 200 m hosszú tehervonatot. Hány másodpercig tart a teljes előzés?',
    options: ['27 másodpercig', '30 másodpercig', '20 másodpercig', '36 másodpercig'],
    correctAnswer: 0,
    hint: 'Relatív sebesség: 100 - 60 = 40 km/h = 40 / 3,6 m/s. Teljes relatív út: 100 + 200 = 300 m.',
    explanation: 'A teljes elhaladáshoz szükséges út a hosszak összege: 100 + 200 = 300 m. v_rel = 40 km/h = 40 / 3,6 = 11,11 m/s. t = 300 / (40 / 3,6) = 27 s.'
  },
  {
    id: 'l3-6',
    title: 'Folyó sebességének kiszámítása',
    question: 'Egy hajó a 36 km-es utat a folyón lefelé 2 óra, felfelé 3 óra alatt teszi meg. Mekkora a folyó sodrási sebessége?',
    options: ['3 km/h', '2 km/h', '4 km/h', '1,5 km/h'],
    correctAnswer: 0,
    hint: 'v_le = 36 / 2 = 18 km/h; v_fel = 36 / 3 = 12 km/h. v_folyó = (v_le - v_fel) / 2.',
    explanation: 'v_le = 18 km/h (v_s + v_f), v_fel = 12 km/h (v_s - v_f). Kivonva a két egyenletet: 2 · v_folyó = 6  →  v_folyó = 3 km/h.'
  },
  {
    id: 'l3-7',
    title: 'Utolérés távolsága a starttól',
    question: 'Egy traktor 20 km/h sebességgel elindul. Fél óra múlva utána küldenek egy terepjárót 60 km/h-val. Hány kilométerre a rajttól éri utol a terepjáró a traktort?',
    options: ['15 km-re', '20 km-re', '10 km-re', '25 km-re'],
    correctAnswer: 0,
    hint: 'Előny: 20 · 0,5 = 10 km. Utolérési idő: 10 / (60 - 20) = 0,25 óra. Terepjáró útja: 60 · 0,25.',
    explanation: 't = 10 / (60 - 20) = 10 / 40 = 0,25 óra (15 perc). s_terepjáró = 60 km/h · 0,25 h = 15 km.'
  },
  {
    id: 'l3-8',
    title: 'Kívánt átlagsebesség elérése',
    question: 'A és B távolsága 150 km. Egy autós az út első felét (75 km) 60 km/h-val tette meg. Mekkora sebességgel kell mennie a második felén, hogy az átlagsebessége 75 km/h legyen?',
    options: ['100 km/h', '90 km/h', '80 km/h', '110 km/h'],
    correctAnswer: 0,
    hint: 'Összes idő = 150 / 75 = 2 óra. Első félidő = 75 / 60 = 1,25 óra. Második félidő = 0,75 óra.',
    explanation: 'A 2 órából a második félre 2 - 1,25 = 0,75 óra maradt. v₂ = 75 km / 0,75 h = 100 km/h.'
  },
  {
    id: 'l3-9',
    title: 'Három csap páros feltöltése',
    question: 'Az 1. és 2. csap együtt 12 perc, az 1. és 3. csap 15 perc, a 2. és 3. csap 20 perc alatt tölt fel egy kádat. Hány perc alatt tölti fel mindhárom egyszerre?',
    options: ['10 perc alatt', '8 perc alatt', '12 perc alatt', '9 perc alatt'],
    correctAnswer: 0,
    hint: 'Add össze a három egyenletet: 2(1/t₁ + 1/t₂ + 1/t₃) = 1/12 + 1/15 + 1/20 = 12/60 = 1/5.',
    explanation: '2 · (összes teljesítmény) = 1/5  →  összes teljesítmény = 1/10. Tehát mindhárom csap együtt 10 perc alatt tölti fel.'
  },
  {
    id: 'l3-10',
    title: 'Folyóvízi oda-vissza idő',
    question: 'Egy motorcsónak állóvízi sebessége 24 km/h, a folyó 6 km/h. Egy 72 km-es távot megtesz oda és vissza. Mennyi a teljes menetidő?',
    options: ['6,4 óra (6 óra 24 perc)', '6 óra', '7 óra', '5,8 óra'],
    correctAnswer: 0,
    hint: 'Lefelé v = 30 km/h (t₁ = 72/30), felfelé v = 18 km/h (t₂ = 72/18).',
    explanation: 't_le = 72 / 30 = 2,4 óra. t_fel = 72 / 18 = 4 óra. Összes idő: 2,4 + 4 = 6,4 óra = 6 óra 24 perc.'
  }
];

const levels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Mértékegységek',
    description: 's = v · t alapszámítások, percek és órák átváltása, m/s és km/h, szimmetrikus találkozás, egyéni munkarész',
    questions: level1Questions
  },
  2: {
    title: '2. Szint: Találkozás, Utolérés és Medence',
    description: 'Szembehaladás eltérő indulással, utolérés előnnyel, folyóvíz, két csap együttes munkája és nyitott lefolyó',
    questions: level2Questions
  },
  3: {
    title: '3. Szint: Összetett és Nehezebb Feladatok',
    description: 'Harmonikus átlagsebesség, utolérés pihenővel, vonatok elhaladása, kieső munkások és páros csapok',
    questions: level3Questions
  }
};

export const MotionWorkProblemsQuiz: React.FC<MotionWorkProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Szöveges Feladatok: Mozgás és Munka Kvíz"
      subtitle="Mesterkedj az egyenletes mozgásokban, a találkozásokban, utolérésekben és a közös munkavégzésben!"
      badge="8. OSZTÁLY • III. EGYENLETEK"
      themeColor="blue"
      emoji="⏱️"
      topicId="g8-eq-motion-work"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Találd meg a mozgásos és munkavégzési képletek, feladatok párjait!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapképletek és Átváltások',
              subtitle: 'Párosítsd a kifejezéseket a megfelelő értékkel!',
              rangeLabel: 'Megoldandó:',
              range: '10 kártyapár',
              focus: 's = v · t & átváltások'
            },
            2: {
              title: '2. Szint: Mozgásos & Munkamodellek',
              subtitle: 'Kösd össze a szöveget az alapegyenlettel!',
              rangeLabel: 'Megoldandó:',
              range: '10 kártyapár',
              focus: 'Találkozás & munka'
            },
            3: {
              title: '3. Szint: Feladatok és Eredmények',
              subtitle: 'Párosítsd a feladatot a pontos végeredménnyel!',
              rangeLabel: 'Megoldandó:',
              range: '10 kártyapár',
              focus: 'Számítások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <MotionWorkProblemsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a mozgástípusokat, fizikai modelleket és egyenleteket!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Mozgás és Munka Folyamatok',
              subtitle: 'Sorold be: Találkozás / Utolérés / Együttes munka szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Folyamattípusok'
            },
            2: {
              title: '2. Szint: Matematikai Modellek és Elvek',
              subtitle: 'Csoportosítsd: s = v · t / Mozgásegyenletek / Reciprok munka szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Fizikai elvek'
            },
            3: {
              title: '3. Szint: Konkrét Algebrai Egyenletek',
              subtitle: 'Kategorizáld az egyenleteket feladattípus szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Egyenletmodellek'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <MotionWorkProblemsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default MotionWorkProblemsQuiz;
