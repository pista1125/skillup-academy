import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  FlaskConical,
  Droplets,
  Flame,
  Scale,
  Sparkles,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Percent,
  Thermometer,
  LayoutGrid,
  ArrowRightLeft
} from 'lucide-react';
import { MixingWordProblemsMatcher } from './MixingWordProblemsMatcher';
import { MixingWordProblemsSorter } from './MixingWordProblemsSorter';

interface MixingWordProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Keverési Alapegyenlet',
    icon: <Scale className="w-4 h-4 text-teal-600" />,
    formula: 'm₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_ö',
    note: 'Az oldott anyagok (vagy tiszta fémek) összege a keverékben állandó marad.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="15" y="10" width="38" height="24" rx="4" className="fill-teal-50 stroke-teal-300 stroke-[1]" />
        <text x="34" y="25" className="text-[9px] font-bold fill-teal-800 text-center font-mono" textAnchor="middle">m₁·p₁</text>
        <text x="60" y="26" className="text-[11px] font-bold fill-slate-500">+</text>
        <rect x="68" y="10" width="38" height="24" rx="4" className="fill-indigo-50 stroke-indigo-300 stroke-[1]" />
        <text x="87" y="25" className="text-[9px] font-bold fill-indigo-800 text-center font-mono" textAnchor="middle">m₂·p₂</text>
        <text x="113" y="26" className="text-[11px] font-bold fill-slate-500">=</text>
        <rect x="120" y="10" width="36" height="24" rx="4" className="fill-emerald-50 stroke-emerald-300 stroke-[1]" />
        <text x="138" y="25" className="text-[9px] font-bold fill-emerald-800 text-center font-mono" textAnchor="middle">m_ö·p_ö</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Hígítás Tiszta Vízzel (0%)',
    icon: <Droplets className="w-4 h-4 text-sky-600" />,
    formula: 'm_víz · 0 = 0 \\implies m_1 \\cdot p_1 = (m_1 + m_v) \\cdot p_2',
    note: 'A víz nem tartalmaz oldott sót, így töménysége p = 0%. A só mennyisége nem nő!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="25" y="26" className="text-[9px] font-bold fill-sky-700 font-mono">+ Víz (0%)</text>
        <path d="M 75 22 L 105 22 M 100 18 L 105 22 L 100 26" className="stroke-sky-500 stroke-[1.5] fill-none" />
        <text x="115" y="26" className="text-[9px] font-bold fill-slate-700 font-mono">p lecsökken</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Töményítés Tiszta Sóval (100%)',
    icon: <Sparkles className="w-4 h-4 text-purple-600" />,
    formula: 'm_1 \\cdot p_1 + m_s \\cdot 100 = (m_1 + m_s) \\cdot p_2',
    note: 'A hozzáadott kristályos só 100%-os, és az oldat össztömegét is növeli!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="35" cy="22" r="10" className="fill-purple-100 stroke-purple-400 stroke-[1]" />
        <text x="35" y="25" className="text-[8px] font-bold fill-purple-800" textAnchor="middle">100%</text>
        <line x1="50" y1="22" x2="80" y2="22" className="stroke-purple-400 stroke-[1.5]" />
        <text x="115" y="26" className="text-[9px] font-bold fill-purple-700 font-mono">p megnő</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Víz Elpárologtatása',
    icon: <Flame className="w-4 h-4 text-amber-600" />,
    formula: 'm_1 \\cdot p_1 = (m_1 - m_elp) \\cdot p_2',
    note: 'Csak tiszta víz párolog el, az összes oldott só a visszamaradó edényben sűrűsödik.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="20" y="26" className="text-[8px] font-bold fill-amber-700 font-mono">m₁ - m_elp</text>
        <path d="M 75 22 L 100 22" className="stroke-amber-500 stroke-[1.5]" />
        <text x="110" y="26" className="text-[8px] font-bold fill-emerald-600 font-mono">Só állandó</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Karát és Aranyötvözetek',
    icon: <Award className="w-4 h-4 text-amber-500" />,
    formula: '24 \\text{ Karát} = 100\\% \\quad | \\quad 14K = 58,3\\% \\quad | \\quad 18K = 75\\%',
    note: '1 karát = 1/24 rész színarany. Karátokkal közvetlenül is felírható a keverési egyenlet.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="14" width="40" height="18" rx="3" className="fill-amber-400" />
        <text x="45" y="26" className="text-[8px] font-bold fill-amber-950" textAnchor="middle">14 / 24</text>
        <text x="75" y="26" className="text-[10px] font-black fill-slate-400">→</text>
        <rect x="90" y="14" width="45" height="18" rx="3" className="fill-amber-500" />
        <text x="112" y="26" className="text-[8px] font-bold fill-white" textAnchor="middle">58,3%</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Folyadékok Hőmérséklete',
    icon: <Thermometer className="w-4 h-4 text-rose-500" />,
    formula: 'm₁ · T₁ + m₂ · T₂ = (m₁ + m₂) · T_közös',
    note: 'Azonos folyadékok keveredésekor a végső hőmérséklet a tömegek súlyozott átlaga.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="25" y="26" className="text-[9px] font-bold fill-sky-600 font-mono">Hideg T₁</text>
        <text x="70" y="26" className="text-[10px] font-bold fill-slate-400">+</text>
        <text x="85" y="26" className="text-[9px] font-bold fill-rose-600 font-mono">Meleg T₂</text>
        <text x="135" y="26" className="text-[9px] font-bold fill-teal-600 font-mono">T_k</text>
      </svg>
    )
  }
];

const level1Questions = [
  {
    id: 'l1-1',
    title: 'Tiszta só számítása',
    question: '200 g 10%-os sóoldatban hány gramm tiszta só van feloldva?',
    options: ['20 g', '10 g', '2 g', '50 g'],
    correctAnswer: 0,
    hint: 'A tömeg 10%-át kell kiszámítani: 200 · 0,10.',
    explanation: '200 g 10%-a: 200 · (10 / 100) = 20 g tiszta só.'
  },
  {
    id: 'l1-2',
    title: 'Tiszta víz töménysége',
    question: 'Mennyi a tömegszázaléka a tiszta csapvíznek a keverési feladatokban?',
    options: ['0%', '100%', '1%', '50%'],
    correctAnswer: 0,
    hint: 'A tiszta víz nem tartalmaz oldott sót vagy egyéb adalékot.',
    explanation: 'A tiszta vízben 0 g oldott só van, ezért a töménysége pontosan 0%.'
  },
  {
    id: 'l1-3',
    title: 'Tiszta só töménysége',
    question: 'Hány tömegszázalékos a tiszta kristályos konyhasó, amikor oldathoz adjuk?',
    options: ['100%', '0%', '90%', '50%'],
    correctAnswer: 0,
    hint: 'A száraz sóban semmi más nincs, csak tiszta oldott anyag.',
    explanation: 'A tiszta kristályos só 100%-ban oldott sóból áll, tehát p = 100%.'
  },
  {
    id: 'l1-4',
    title: 'Azonos tömegű oldatok keverése',
    question: 'Összekeverünk 2 kg 10%-os és 2 kg 30%-os sóoldatot. Hány százalékos lesz a keverék?',
    options: ['20%-os', '25%-os', '15%-os', '40%-os'],
    correctAnswer: 0,
    hint: 'Ha a két oldat tömege megegyezik, a keverék töménysége a két százalék számtani közepe!',
    explanation: 'Mivel m₁ = m₂ = 2 kg, az átlag: (10% + 30%) / 2 = 20%. Só: 2 · 10 + 2 · 30 = 80; 80 / 4 = 20%.'
  },
  {
    id: 'l1-5',
    title: 'Színarany karátja',
    question: 'Hány karátos a 100%-ban tiszta, ötvözetlen színarany?',
    options: ['24 karátos', '18 karátos', '14 karátos', '100 karátos'],
    correctAnswer: 0,
    hint: 'A karát skála maximuma a tiszta aranyra vonatkozik.',
    explanation: 'A tiszta színarany 24 karátos. 1 karát = 1/24 rész színaranyat jelent.'
  },
  {
    id: 'l1-6',
    title: '18 karátos arany aránya',
    question: 'Hány százalék tiszta aranyat tartalmaz a 18 karátos arany ékszer?',
    options: ['75%', '58,3%', '50%', '80%'],
    correctAnswer: 0,
    hint: 'Számold ki a 18 / 24 hányadost!',
    explanation: '18 / 24 = 3 / 4 = 0,75, azaz pontosan 75% tiszta aranyat tartalmaz.'
  },
  {
    id: 'l1-7',
    title: 'Egyszerű hígítás vízzel',
    question: '500 g 20%-os sóoldathoz 500 g tiszta vizet öntünk. Hány százalékos lesz az új oldat?',
    options: ['10%-os', '15%-os', '5%-os', '20%-os'],
    correctAnswer: 0,
    hint: 'A tömeg a duplájára nőtt (500 g-ról 1000 g-ra), miközben a só változatlan.',
    explanation: 'Az oldatban 500 · 0,20 = 100 g só van. Új tömeg = 1000 g. 100 / 1000 = 10% (felére hígult).'
  },
  {
    id: 'l1-8',
    title: 'Tömegszázalék definíciója',
    question: 'Egy 400 g-os cukoroldatban 60 g cukor van feloldva. Hány tömegszázalékos az oldat?',
    options: ['15%-os', '12%-os', '20%-os', '24%-os'],
    correctAnswer: 0,
    hint: 'Tömegszázalék = (oldott anyag tömege / oldat össztömege) · 100%.',
    explanation: 'p = (60 / 400) · 100% = 0,15 · 100% = 15%-os.'
  },
  {
    id: 'l1-9',
    title: '1 karát jelentése',
    question: 'Mit fejez ki 1 karát az aranyművességben?',
    options: ['Az össztömeg 1/24 részét', 'Az össztömeg 1/100 részét', '1 gramm tiszta aranyat', 'Az össztömeg felét'],
    correctAnswer: 0,
    hint: 'A színarany 24 karátos, így 1 karát ennek 1/24 része.',
    explanation: '1 karát = 1/24 rész tiszta aranytartalom, ami megközelítőleg 4,167%-nak felel meg.'
  },
  {
    id: 'l1-10',
    title: 'Össztömeg növekedése',
    question: 'Ha 300 g 10%-os sóoldathoz hozzáadunk 30 g kristályos konyhasót, mekkora lesz a keletkező oldat össztömege?',
    options: ['330 g', '300 g', '270 g', '360 g'],
    correctAnswer: 0,
    hint: 'A feloldott só nem tűnik el, növeli a folyadék tömegét: 300 + 30.',
    explanation: 'A tömegmegmaradás miatt az új oldat össztömege: 300 g + 30 g = 330 g.'
  }
];

const level2Questions = [
  {
    id: 'l2-1',
    title: 'Két oldat keverése',
    question: 'Összekeverünk 3 kg 20%-os és 2 kg 30%-os sóoldatot. Hány százalékos lesz a kapott keverék?',
    options: ['24%-os', '25%-os', '22%-os', '26%-os'],
    correctAnswer: 0,
    hint: 'Keverési egyenlet: 3 · 20 + 2 · 30 = (3 + 2) · p_új.',
    explanation: '3 · 20 + 2 · 30 = 60 + 60 = 120. Össztömeg = 5 kg. p_új = 120 / 5 = 24%-os.'
  },
  {
    id: 'l2-2',
    title: 'Hígítás tiszta vízzel',
    question: '4 kg 15%-os cukoroldathoz 2 kg tiszta vizet adunk. Hány százalékos lesz az új oldat?',
    options: ['10%-os', '12%-os', '7,5%-os', '8%-os'],
    correctAnswer: 0,
    hint: 'Tiszta cukor = 4 · 15 = 60. Az új tömeg 4 + 2 = 6 kg.',
    explanation: '4 · 15 + 2 · 0 = 6 · p_új  →  60 = 6 · p_új  →  p_új = 10%-os.'
  },
  {
    id: 'l2-3',
    title: 'Ismeretlen tömeg kiszámítása',
    question: 'Hány kg 10%-os és hány kg 40%-os alkohololdatból készíthető 60 kg 20%-os oldat?',
    options: [
      '40 kg 10%-os és 20 kg 40%-os',
      '30 kg 10%-os és 30 kg 40%-os',
      '50 kg 10%-os és 10 kg 40%-os',
      '45 kg 10%-os és 15 kg 40%-os'
    ],
    correctAnswer: 0,
    hint: 'Legyen x kg a 10%-os. Ekkor 10x + 40(60 - x) = 60 · 20.',
    explanation: '10x + 2400 - 40x = 1200  →  -30x = -1200  →  x = 40 kg (10%-os) és 60 - 40 = 20 kg (40%-os).'
  },
  {
    id: 'l2-4',
    title: 'Töményítés tiszta sóval',
    question: 'Hány gramm tiszta sót kell adni 180 g 10%-os sóoldathoz, hogy 20%-os oldatot kapjunk?',
    options: ['22,5 g', '20 g', '18 g', '25 g'],
    correctAnswer: 0,
    hint: 'A tiszta só 100%-os: 180 · 10 + x · 100 = (180 + x) · 20.',
    explanation: '1800 + 100x = 3600 + 20x  →  80x = 1800  →  x = 22,5 g tiszta só.'
  },
  {
    id: 'l2-5',
    title: 'Ötvözetek karátszámítása',
    question: 'Összeolvasztunk 300 g 14 karátos és 200 g 18 karátos aranyat. Hány karátos az ötvözet?',
    options: ['15,6 karátos', '16 karátos', '15 karátos', '16,2 karátos'],
    correctAnswer: 0,
    hint: 'Közvetlenül a karátokkal számolva: (300 · 14 + 200 · 18) / 500.',
    explanation: '(300 · 14 + 200 · 18) / 500 = (4200 + 3600) / 500 = 7800 / 500 = 15,6 karátos.'
  },
  {
    id: 'l2-6',
    title: 'Víz elpárologtatása',
    question: '600 g 10%-os sóoldatból elpárologtatunk 200 g vizet. Hány százalékos lesz a megmaradt oldat?',
    options: ['15%-os', '12%-os', '20%-os', '18%-os'],
    correctAnswer: 0,
    hint: 'Só: 600 · 0,10 = 60 g. Az új tömeg 600 - 200 = 400 g.',
    explanation: 'A só változatlan marad (60 g). Új tömeg = 400 g. Új töménység = 60 / 400 = 0,15 = 15%-os.'
  },
  {
    id: 'l2-7',
    title: 'Ecet hígítása',
    question: '5 liter 12%-os ecethez hány liter 4%-os ecetet kell keverni, hogy 9%-os ecetet kapjunk?',
    options: ['3 litert', '2 litert', '4 litert', '5 litert'],
    correctAnswer: 0,
    hint: '5 · 12 + x · 4 = (5 + x) · 9.',
    explanation: '60 + 4x = 45 + 9x  →  15 = 5x  →  x = 3 liter 4%-os ecet.'
  },
  {
    id: 'l2-8',
    title: 'Sósav hígítása vízzel',
    question: 'Egy laboratóriumban 800 g 25%-os sósavat 10%-osra szeretnének hígítani. Hány gramm tiszta vízre van szükség?',
    options: ['1200 g', '1000 g', '800 g', '1500 g'],
    correctAnswer: 0,
    hint: '800 · 25 + v · 0 = (800 + v) · 10.',
    explanation: '20 000 = 8000 + 10v  →  10v = 12 000  →  v = 1200 g tiszta víz.'
  },
  {
    id: 'l2-9',
    title: 'Folyadékok keveredése',
    question: 'Összeöntünk 2 kg 20 °C-os és 3 kg 70 °C-os vizet. Mennyi lesz a keverék egyensúlyi hőmérséklete?',
    options: ['50 °C', '45 °C', '55 °C', '48 °C'],
    correctAnswer: 0,
    hint: '2 · 20 + 3 · 70 = (2 + 3) · T_közös.',
    explanation: '40 + 210 = 5 · T_k  →  250 = 5 · T_k  →  T_k = 50 °C.'
  },
  {
    id: 'l2-10',
    title: '14 karátos arany előállítása',
    question: 'Hány gramm 14 karátos aranyötvözetet kapunk, ha 70 g tiszta színaranyhoz (24 karát) más fémet ötvözünk hozzá?',
    options: ['120 g', '100 g', '140 g', '110 g'],
    correctAnswer: 0,
    hint: 'A 70 g arany a végtermék 14/24 része: 70 = m · (14 / 24).',
    explanation: 'm = 70 · 24 / 14 = 5 · 24 = 120 g 14 karátos arany ötvözet.'
  }
];

const level3Questions = [
  {
    id: 'l3-1',
    title: 'Kétismeretlenes oldatkeverés',
    question: 'Hány kg 12%-os és hány kg 28%-os sóoldatot kell összekeverni, hogy 40 kg 18%-os oldatot kapjunk?',
    options: [
      '25 kg 12%-os és 15 kg 28%-os',
      '20 kg 12%-os és 20 kg 28%-os',
      '30 kg 12%-os és 10 kg 28%-os',
      '24 kg 12%-os és 16 kg 28%-os'
    ],
    correctAnswer: 0,
    hint: '12x + 28(40 - x) = 40 · 18 = 720.',
    explanation: '12x + 1120 - 28x = 720  →  -16x = -400  →  x = 25 kg (12%-os) és 40 - 25 = 15 kg (28%-os).'
  },
  {
    id: 'l3-2',
    title: 'Töményítés és elpárologtatás egyben',
    question: 'Egy 500 g-os sóoldathoz hozzáadunk 50 g sót, és elpárologtatunk belőle 150 g vizet. Az új oldat 25%-os lett. Hány százalékos volt az eredeti oldat?',
    options: ['10%-os', '12%-os', '8%-os', '15%-os'],
    correctAnswer: 0,
    hint: 'Új tömeg = 500 + 50 - 150 = 400 g. Ebben a só: 400 · 0,25 = 100 g.',
    explanation: 'Az új oldatban 100 g só van. Mivel 50 g sót adtunk hozzá, eredetileg 100 - 50 = 50 g só volt 500 g-ban: 50 / 500 = 10%.'
  },
  {
    id: 'l3-3',
    title: '18 karátosból 14 karátos arany',
    question: 'Egy ékszerész 180 g 14 karátos aranyat szeretne készíteni 18 karátos aranyból és réz adalékból (0 karát). Hány gramm 18 karátos aranyra van szüksége?',
    options: ['140 g', '135 g', '150 g', '120 g'],
    correctAnswer: 0,
    hint: 'Karát-egyenlet: x · 18 + (180 - x) · 0 = 180 · 14.',
    explanation: '18x = 180 · 14  →  18x = 2520  →  x = 140 g 18 karátos arany (és 40 g réz).'
  },
  {
    id: 'l3-4',
    title: 'Négy folyadékmennyiség hőmérséklete',
    question: '4 liter 80 °C-os forró vizet és 6 liter 30 °C-os hideg vizet keverünk össze egy termoszban. Mennyi lesz az elegy hőmérséklete?',
    options: ['50 °C', '55 °C', '45 °C', '52 °C'],
    correctAnswer: 0,
    hint: '4 · 80 + 6 · 30 = (4 + 6) · T_közös.',
    explanation: '320 + 180 = 10 · T_k  →  500 = 10 · T_k  →  T_k = 50 °C.'
  },
  {
    id: 'l3-5',
    title: 'Víz egynegyedének elpárologtatása',
    question: 'Egy 20%-os sóoldatból a víz 25%-át (egynegyedét) elpárologtatjuk. Hány százalékos lesz a kapott besűrített oldat?',
    options: ['25%-os', '24%-os', '22%-os', '30%-os'],
    correctAnswer: 0,
    hint: '100 g oldatban 20 g só és 80 g víz van. A víz 25%-a = 20 g elpárolog.',
    explanation: 'A megmaradó oldat tömege 100 - 20 = 80 g. A só változatlanul 20 g. Töménység = 20 / 80 = 1/4 = 25%-os.'
  },
  {
    id: 'l3-6',
    title: 'Edények közötti átöntés',
    question: 'Két edényben azonos tömegű oldat van: az elsőben 15%-os, a másodikban 35%-os. Az elsőből átöntünk 100 g-ot a másodikba, ekkor a második 30%-os lesz. Hány gramm oldat volt eredetileg az edényekben?',
    options: ['300 g', '400 g', '250 g', '350 g'],
    correctAnswer: 0,
    hint: 'Legyen m az eredeti tömeg. A 2. edényben a só: m · 0,35 + 100 · 0,15 = (m + 100) · 0,30.',
    explanation: '0,35m + 15 = 0,30m + 30  →  0,05m = 15  →  m = 15 / 0,05 = 300 g.'
  },
  {
    id: 'l3-7',
    title: 'Többlépéses összetett keverés',
    question: '600 g 15%-os sóoldathoz hozzáadunk 150 g tiszta vizet és 50 g kristályos sót. Hány százalékos lesz a kapott oldat?',
    options: ['17,5%-os', '18%-os', '16,5%-os', '20%-os'],
    correctAnswer: 0,
    hint: 'Eredeti só: 600 · 0,15 = 90 g. Új össztömeg: 600 + 150 + 50 = 800 g.',
    explanation: 'Összes só = 90 + 50 = 140 g. Össztömeg = 800 g. Töménység = 140 / 800 = 7 / 40 = 0,175 = 17,5%-os.'
  },
  {
    id: 'l3-8',
    title: 'Rézötvözet töményítése',
    question: 'Egy ötvözet 60% rezet és 40% cinket tartalmaz. Hány kg tiszta rezet kell hozzáadni 10 kg ilyen ötvözethez, hogy 75%-os réztartalmú sárgarezet kapjunk?',
    options: ['6 kg', '5 kg', '8 kg', '4,5 kg'],
    correctAnswer: 0,
    hint: 'A kiindulási 10 kg-ban 6 kg réz van. 6 + x = 0,75 · (10 + x).',
    explanation: '6 + x = 7,5 + 0,75x  →  0,25x = 1,5  →  x = 1,5 / 0,25 = 6 kg tiszta réz.'
  },
  {
    id: 'l3-9',
    title: 'Gyógyszertári alkohol hígítás',
    question: 'Hány milliliter tiszta vizet kell hozzáadni 200 ml 90%-os alkoholhoz, hogy pontosan 60%-os fertőtlenítő oldatot kapjunk? (Feltéve, hogy a térfogatok összeadódnak)',
    options: ['100 ml', '120 ml', '80 ml', '150 ml'],
    correctAnswer: 0,
    hint: '200 · 90 = (200 + v) · 60.',
    explanation: '18 000 = 12 000 + 60v  →  60v = 6000  →  v = 100 ml tiszta víz.'
  },
  {
    id: 'l3-10',
    title: 'Összetevő arányának felére csökkentése',
    question: 'Egy 5 kg tömegű kétkomponensű ötvözetben az egyik fém aránya 30%. Mennyi másik fémet (100%) kell hozzáolvasztani, hogy ennek a fémnek az aránya 15%-ra csökkenjen?',
    options: ['5 kg', '4 kg', '6 kg', '2,5 kg'],
    correctAnswer: 0,
    hint: 'Az első fém tömege: 5 · 0,30 = 1,5 kg (változatlan!). Ha ez 15%, akkor 1,5 = m_új · 0,15.',
    explanation: 'Új tömeg = 1,5 / 0,15 = 10 kg. A hozzáadott fém tömege = 10 - 5 = 5 kg.'
  }
];

const levels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Töménység',
    description: 'Tömegszázalék értelmezése, tiszta só számítás, tiszta víz (0%) és kristályos só (100%), karát alapok',
    questions: level1Questions
  },
  2: {
    title: '2. Szint: Két Oldat Keverése és Hígítás',
    description: 'Keverési egyenletek, hígítás vízzel, ismeretlen tömegek kiszámítása, arany karátok és elpárologtatás',
    questions: level2Questions
  },
  3: {
    title: '3. Szint: Összetett és Nehezebb Feladatok',
    description: 'Kétismeretlenes keverések, többlépéses töményítés, kalorimetria és fordított arányos elpárologtatás',
    questions: level3Questions
  }
};

export const MixingWordProblemsQuiz: React.FC<MixingWordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Szöveges Feladatok: Keverések és Elegyek Kvíz"
      subtitle="Gyakorold a keverési egyenletet, a hígítást, töményítést és a karátszámítást a 8. osztályos szinten!"
      badge="8. OSZTÁLY • III. EGYENLETEK"
      themeColor="teal"
      emoji="🧪"
      topicId="g8-eq-mixing"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Találd meg az összetartozó keverési kifejezéseket és eredményeket!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Töménység',
              subtitle: 'Párosítsd a kifejezéseket a megfelelő értékkel!',
              rangeLabel: 'Megoldandó:',
              range: '10 kártyapár',
              focus: 'Százalék & fogalmak'
            },
            2: {
              title: '2. Szint: Keverési Egyenletek',
              subtitle: 'Kösd össze a szöveget az egyenlettel!',
              rangeLabel: 'Megoldandó:',
              range: '10 kártyapár',
              focus: 'Algebrai leképezés'
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
            <MixingWordProblemsMatcher
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
          subtitle: 'Kategorizáld a keverési folyamatokat, töménységeket és egyenlettípusokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-500" />,
          levels: {
            1: {
              title: '1. Szint: Keverési Folyamatok',
              subtitle: 'Sorold be: Hígítás vízzel / Két oldat keverése / Töményítés & elpárologtatás!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Folyamattípusok'
            },
            2: {
              title: '2. Szint: Anyagok Töménysége',
              subtitle: 'Csoportosítsd: 0% víz / 100% tiszta só / Keverék-oldat szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Koncentrációk'
            },
            3: {
              title: '3. Szint: Modell Egyenletek',
              subtitle: 'Kategorizáld az összefüggéseket: Oldatkeverés / Hígítás-párologtatás / Karát-modell!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Egyenletmodellek'
            }
          },
          render: ({ level, onNextLevel, onOpenRules }) => (
            <MixingWordProblemsSorter
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

export default MixingWordProblemsQuiz;
