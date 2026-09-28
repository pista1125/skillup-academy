import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import {
  Compass,
  Maximize2,
  Minimize2,
  Shapes,
  Sparkles,
  Sun,
  Layers,
  Ruler,
  Percent
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { GeometricConstructionsMatcher } from './GeometricConstructionsMatcher';
import { GeometricConstructionsSorter } from './GeometricConstructionsSorter';

interface GeometricConstructionsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'gc-c1',
    title: 'Szakasz Felosztása m : k Arányban',
    icon: <Ruler className="w-4 h-4 text-amber-600" />,
    formula: "AP / PB = m / k   (m + k egység)",
    note: "Segédfélegyenesre m + k darab egyenlő körosztást mérünk. Az utolsó pontot kötjük B-vel, és az m-edik ponton át húzunk vele párhuzamost.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="35" x2="145" y2="35" stroke="#0284c7" strokeWidth="2" />
        <line x1="15" y1="35" x2="135" y2="10" stroke="#94a3b8" strokeWidth="1" />
        <line x1="135" y1="10" x2="145" y2="35" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="63" y1="25" x2="67" y2="35" stroke="#10b981" strokeWidth="1.8" />
        <circle cx="67" cy="35" r="2.5" fill="#10b981" />
        <text x="67" y="44" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">P</text>
      </svg>
    )
  },
  {
    id: 'gc-c2',
    title: 'Negyedik és Harmadik Arányos',
    icon: <Shapes className="w-4 h-4 text-indigo-600" />,
    formula: "x = (b · c) / a   |   x = b² / a",
    note: "Párhuzamos szelők tételével szerkesztjük: szárakra felmérjük a, b, c szakaszokat, és párhuzamost húzunk. Ha a=1, x = b² (négyzet).",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="38" x2="145" y2="38" stroke="#64748b" strokeWidth="1.5" />
        <line x1="15" y1="38" x2="135" y2="8" stroke="#64748b" strokeWidth="1.5" />
        <line x1="55" y1="38" x2="48" y2="30" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="105" y1="38" x2="115" y2="13" stroke="#10b981" strokeWidth="2" />
        <text x="125" y="24" className="text-[7px] font-bold fill-emerald-700">x</text>
      </svg>
    )
  },
  {
    id: 'gc-c3',
    title: 'Klasszikus Euklideszi Eszközök',
    icon: <Compass className="w-4 h-4 text-emerald-600" />,
    formula: "Körző + Beosztás nélküli vonalzó",
    note: "Csak köríveket és egyeneseket rajzolhatunk. A vonalzóval való közvetlen milliméteres mérés és a szögmérő használata TILOS.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <path d="M 40 38 L 80 12 L 120 38" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="80" cy="12" r="3" fill="#b45309" />
        <line x1="20" y1="38" x2="140" y2="38" stroke="#0284c7" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'gc-c4',
    title: 'Aranymetszés & Mértani Közép',
    icon: <Percent className="w-4 h-4 text-purple-600" />,
    formula: "Φ ≈ 1,618   |   m = √(p · q)",
    note: "Aranymetszés: b / a = a / (a + b). Mértani közép: Thálész-körrel és a derékszögű háromszög magasságtételével szerkeszthető.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <path d="M 25 35 A 25 25 0 0 1 135 35" fill="none" stroke="#64748b" strokeWidth="1" />
        <line x1="25" y1="35" x2="135" y2="35" stroke="#64748b" strokeWidth="1.5" />
        <line x1="60" y1="35" x2="60" y2="12" stroke="#ef4444" strokeWidth="2" />
        <text x="65" y="24" className="text-[7px] font-bold fill-rose-700">m = √(p·q)</text>
      </svg>
    )
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szakaszosztás',
    subtitle: 'Klasszikus eszközök, szakasz felosztása m : k arányban vagy n egyenlő részre',
    range: '1-10. kérdés',
    focus: 'Euklideszi eszközök, párhuzamos szelők tételének alkalmazása, segédfélegyenes',
    questions: [
      {
        id: 'gc-q1',
        level: 1,
        question: 'Melyik két eszközt engedi meg a klasszikus euklideszi geometriai szerkesztés?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="20" y1="45" x2="240" y2="45" stroke="#d97706" strokeWidth="2.5" />
            <text x="130" y="60" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">Beosztás nélküli egyenes vonalzó</text>
            <path d="M 100 45 L 130 15 L 160 45" fill="none" stroke="#b45309" strokeWidth="2" />
            <circle cx="130" cy="15" r="4" fill="#b45309" />
            <text x="130" y="10" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">Körző</text>
          </svg>
        ),
        options: [
          'Körzőt (körök és távolságok átvitelére) és beosztás nélküli egyenes vonalzót.',
          'Szögmérőt és milliméteres beosztású műanyag vonalzót.',
          'Számológépet és milliméterpapírt.',
          'Kizárólag sablonokat és szögmérőt.'
        ],
        correctAnswer: 0,
        hint: 'A klasszikus geometriában a pontosság elvi: nem méréssel, hanem tiszta logikai lépésekkel dolgozunk.',
        explanation: 'Az ókori görög geometria szabályai szerint a szerkesztésekben kizárólag körző és beosztás nélküli vonalzó használható. A hosszak mérése és a szögmérő használata nem minősül szerkesztésnek.',
        breakdown: [
          { label: 'Eszköz 1', value: 'Beosztás nélküli egyenes vonalzó' },
          { label: 'Eszköz 2', value: 'Körző (távolságok átvitele)' }
        ]
      },
      {
        id: 'gc-q2',
        level: 1,
        question: 'Egy AB szakaszt 3 : 5 arányban szeretnénk felosztani párhuzamos szelőkkel. Összesen hány egyenlő körosztást kell felmérnünk a segédfélegyenesre?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="50" x2="230" y2="50" stroke="#0284c7" strokeWidth="2" />
            <line x1="30" y1="50" x2="220" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <circle key={i} cx={30 + i * 23} cy={50 - i * 4.2} r="2" fill={i === 3 ? '#10b981' : i === 8 ? '#d97706' : '#64748b'} />
            ))}
            <text x="130" y="65" textAnchor="middle" className="text-[9px] font-bold fill-amber-700">3 + 5 = 8 egység körosztás</text>
          </svg>
        ),
        options: [
          '8 egységet (3 + 5 = 8 körosztást)',
          '5 egységet',
          '15 egységet (3 · 5 = 15)',
          '2 egységet (5 - 3 = 2)'
        ],
        correctAnswer: 0,
        hint: 'Az egész szakasz a két rész összegéből (m + k) áll.',
        explanation: 'A szakasz m : k arányú felosztásához az aránytagok összegét kell venni: 3 + 5 = 8 darab egyenlő körosztást mérünk fel a segédfélegyenesre, majd a 8. pontot kötjük B-vel és a 3. ponton át húzunk párhuzamost.',
        breakdown: [
          { label: 'Arány', value: '3 : 5' },
          { label: 'Összeg', value: '3 + 5 = 8 egyenlő körosztás' }
        ]
      },
      {
        id: 'gc-q3',
        level: 1,
        question: 'Egy AB szakaszt 3 egyenlő részre (harmadolni) szeretnénk osztani segédfélegyenessel. Hány körosztást kell felmérnünk?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="40" y1="45" x2="220" y2="45" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="100" cy="45" r="3" fill="#10b981" />
            <circle cx="160" cy="45" r="3" fill="#10b981" />
            <text x="130" y="62" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">3 egyenlő szakasz (harmadolás)</text>
          </svg>
        ),
        options: [
          '3 darab egyenlő körosztást a segédfélegyenesre.',
          '6 körosztást.',
          '2 körosztást.',
          'Nem lehetséges körzővel 3 egyenlő részre osztani.'
        ],
        correctAnswer: 0,
        hint: 'Ha n egyenlő részre osztunk, a segédfélegyenesre n körosztást mérünk.',
        explanation: 'Egy szakasz n egyenlő részre osztásakor a segédfélegyenesre pontosan n darab (itt 3 darab) tetszőleges, de egymással egyenlő körosztást mérünk fel.',
        breakdown: [
          { label: 'Cél', value: '3 egyenlő rész' },
          { label: 'Körosztások', value: '3 egység' }
        ]
      },
      {
        id: 'gc-q4',
        level: 1,
        question: 'Milyen matematikai tétel biztosítja, hogy a segédfélegyenessel és párhuzamosokkal végzett szakaszosztás pontos arányt eredményez?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="50" x2="220" y2="20" stroke="#64748b" strokeWidth="1.5" />
            <line x1="30" y1="50" x2="220" y2="50" stroke="#0284c7" strokeWidth="2" />
            <line x1="110" y1="37" x2="110" y2="50" stroke="#10b981" strokeWidth="2" />
            <line x1="200" y1="23" x2="200" y2="50" stroke="#d97706" strokeWidth="2" />
            <text x="130" y="66" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">Párhuzamos szelők tétele</text>
          </svg>
        ),
        options: [
          'A párhuzamos szelőszakaszok tétele.',
          'A Pitagorasz-tétel.',
          'A Thálész-tétel.',
          'A háromszög belső szögeinek összege.'
        ],
        correctAnswer: 0,
        hint: 'A segédfélegyenes és az alap szakasz egy szögtartomány szárait alkotják, amelyeket párhuzamos egyenesek metszeken.',
        explanation: 'A párhuzamos szelőszakaszok tétele kimondja, hogy ha egy szög szárait párhuzamos egyenesekkel metsszük, a szárakon keletkező szakaszok aránya megegyezik: AP / PB = m / k.',
        breakdown: [
          { label: 'Tétel', value: 'Párhuzamos szelők tétele' },
          { label: 'Eredmény', value: 'AP / PB = m / k' }
        ]
      },
      {
        id: 'gc-q5',
        level: 1,
        question: 'A szakaszosztás szerkesztési lépései során melyik pontot kell összekötni a szakasz másik (B) végpontjával?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="50" x2="220" y2="50" stroke="#0284c7" strokeWidth="2" />
            <line x1="30" y1="50" x2="190" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="190" y1="15" x2="220" y2="50" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="190" cy="15" r="3" fill="#d97706" />
            <text x="190" y="10" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">Utolsó osztópont</text>
            <circle cx="220" cy="50" r="3" fill="#0284c7" />
            <text x="225" y="60" className="text-[8px] font-bold fill-sky-800">B</text>
          </svg>
        ),
        options: [
          'A segédfélegyenesen felmért legutolsó (összesen m+k-adik) osztópontot.',
          'Az első osztópontot.',
          'A segédfélegyenes felezőpontját.',
          'Tetszőleges osztópontot.'
        ],
        correctAnswer: 0,
        hint: 'A teljes segédszakasznak meg kell felelnie a teljes AB szakasznak.',
        explanation: 'Az utolsó felmért osztópontot (A_{m+k}) kötjük össze B-vel. Ez a szakasz határozza meg azt az irányt, amellyel a belső osztópontokon keresztül párhuzamosokat húzunk.',
        breakdown: [
          { label: 'Összekötendő', value: 'Utolsó osztópont és a B végpont' },
          { label: 'Szerepe', value: 'Meghatározza a párhuzamosok irányát' }
        ]
      },
      {
        id: 'gc-q6',
        level: 1,
        question: 'Hogyan felezhetünk el egy AB szakaszt mérés nélkül, kizárólag körzővel és beosztás nélküli vonalzóval?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="40" y1="35" x2="220" y2="35" stroke="#0284c7" strokeWidth="2" />
            <line x1="130" y1="10" x2="130" y2="60" stroke="#10b981" strokeWidth="2" />
            <circle cx="130" cy="35" r="3.5" fill="#10b981" />
            <text x="130" y="67" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Felezőmerőleges</text>
          </svg>
        ),
        options: [
          'Megszerkesztjük a szakaszfelező merőlegest a két végpontból húzott azonos sugarú körívekkel.',
          'Szemre megtippeljük a közepét és pontot teszünk.',
          'Körzővel addig próbálgatunk, míg el nem találjuk.',
          'Nem lehetséges mérés nélkül elfelezni.'
        ],
        correctAnswer: 0,
        hint: 'A két végponttól egyenlő távolságra levő pontok mértani helye a felezőmerőleges.',
        explanation: 'A két végpontból a szakasz felénél nagyobb azonos sugarú köríveket húzunk alul-felül. A két metszéspontot összekötő egyenes a szakaszfelező merőleges, amely pontosan felezi az AB szakaszt.',
        breakdown: [
          { label: 'Eljárás', value: 'Szakaszfelező merőleges szerkesztése' },
          { label: 'Eszköz', value: 'Azonos sugarú körívek A-ból és B-ből' }
        ]
      },
      {
        id: 'gc-q7',
        level: 1,
        question: 'Befolyásolja-e a szakaszosztás pontosságát az, hogy mekkora hegyesszöget zár be a segédfélegyenes az eredeti szakasszal?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="50" x2="230" y2="50" stroke="#0284c7" strokeWidth="2" />
            <line x1="30" y1="50" x2="190" y2="15" stroke="#94a3b8" strokeWidth="1" />
            <line x1="30" y1="50" x2="190" y2="30" stroke="#94a3b8" strokeWidth="1" />
            <text x="130" y="65" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">A szög nagysága tetszőleges!</text>
          </svg>
        ),
        options: [
          'Nem befolyásolja: a szög és a körzőnyílás nagysága tetszőleges, az arány mindig pontos marad.',
          'Igen, a szögnek szigorúan 30°-nak kell lennie.',
          'Igen, a szögnek pontosan 45°-nak kell lennie.',
          'Csak derékszöget zárhat be.'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamos szelők tétele bármilyen szögű szögtartományra érvényes.',
        explanation: 'A segédfélegyenes és a szakasz által bezárt szög nagysága teljesen tetszőleges (célszerűen egy kényelmes hegyesszög, pl. 20°-40°). A párhuzamos szelők tétele miatt a kimetszett arány független a szögtől.',
        breakdown: [
          { label: 'Szög', value: 'Tetszőleges hegyesszög' },
          { label: 'Körzőnyílás', value: 'Tetszőleges állandó egység' }
        ]
      },
      {
        id: 'gc-q8',
        level: 1,
        question: 'Mit jelent a „negyedik arányos” szakasz kifejezés három adott a, b, c szakasz esetén?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <rect x="30" y="15" width="200" height="40" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
            <text x="130" y="32" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">a : b = c : x</text>
            <text x="130" y="47" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-700">x = (b · c) / a</text>
          </svg>
        ),
        options: [
          'Azt az x szakaszt, amely kielégíti az a : b = c : x aránypárt [x = (b · c) / a].',
          'A három szakasz számtani közepét.',
          'A három szakasz összegét.',
          'A derékszögű háromszög befogóját.'
        ],
        correctAnswer: 0,
        hint: 'Négy tagú aránypárról van szó: a / b = c / x.',
        explanation: 'A negyedik arányos az a negyedik tag (x), amely az adott a, b, c szakaszokkal aránypárt alkot: a : b = c : x, amiből x = (b · c) / a.',
        breakdown: [
          { label: 'Aránypár', value: 'a : b = c : x' },
          { label: 'Megoldás', value: 'x = (b · c) / a' }
        ]
      },
      {
        id: 'gc-q9',
        level: 1,
        question: 'Egy 10 cm hosszú AB szakaszt 2 : 3 arányban osztunk fel egy P ponttal. Milyen hosszú az AP szakasz?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="40" x2="230" y2="40" stroke="#0284c7" strokeWidth="3" />
            <circle cx="110" cy="40" r="4" fill="#10b981" />
            <text x="70" y="30" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">AP = 4 cm</text>
            <text x="170" y="30" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">PB = 6 cm</text>
            <text x="130" y="58" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">AB = 10 cm</text>
          </svg>
        ),
        options: [
          '4 cm [mivel AP = 10 · (2 / 5) = 4 cm]',
          '2 cm',
          '5 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'Az összes rész száma 2 + 3 = 5 rész. Egy rész hossza 10 / 5 = 2 cm.',
        explanation: 'Az összesen 2 + 3 = 5 részre osztva a 10 cm-t: egy rész 10 / 5 = 2 cm. Az AP szakasz 2 részből áll, így hossza 2 · 2 cm = 4 cm, a PB pedig 3 · 2 cm = 6 cm.',
        breakdown: [
          { label: 'Összes rész', value: '2 + 3 = 5 rész' },
          { label: 'Egy rész', value: '10 cm / 5 = 2 cm' },
          { label: 'AP hossza', value: '2 · 2 cm = 4 cm' }
        ]
      },
      {
        id: 'gc-q10',
        level: 1,
        question: 'Egy 12 cm hosszú szakaszt 4 egyenlő részre (negyedelünk) osztunk fel. Mekkora lesz az egyes részek hossza?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="40" x2="230" y2="40" stroke="#0284c7" strokeWidth="2.5" />
            {[1, 2, 3].map((i) => (
              <circle key={i} cx={30 + i * 50} cy={40} r="3" fill="#10b981" />
            ))}
            <text x="130" y="60" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">4 darab 3 cm-es szakasz</text>
          </svg>
        ),
        options: [
          '3 cm (12 cm / 4 = 3 cm)',
          '4 cm',
          '2,5 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: '12 cm-t osztunk el 4 egyenlő részre.',
        explanation: 'A 12 cm hosszú szakasz 4 egyenlő részre osztásakor minden egyes rész pontosan 12 / 4 = 3 cm hosszú lesz.',
        breakdown: [
          { label: 'Számítás', value: '12 cm / 4 = 3 cm' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Arányos Szakaszok és Hasonló Alakzatok',
    subtitle: 'Negyedik és harmadik arányos számítása és szerkesztése, méretarányos háromszögek',
    range: '11-20. kérdés',
    focus: 'x = (b·c)/a, x = b²/a, szögfelező és felezőmerőleges tulajdonságai, arányos felosztás',
    questions: [
      {
        id: 'gc-q11',
        level: 2,
        question: 'Adott három szakasz: a = 2 cm, b = 4 cm és c = 3 cm. Mekkora a negyedik arányos x szakasz hossza?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <rect x="25" y="15" width="210" height="40" rx="8" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1.5" />
            <text x="130" y="32" textAnchor="middle" className="text-[10px] font-bold fill-purple-900">2 : 4 = 3 : x</text>
            <text x="130" y="47" textAnchor="middle" className="text-[10px] font-mono font-bold fill-purple-700">x = (4 · 3) / 2 = 6 cm</text>
          </svg>
        ),
        options: [
          '6 cm [x = (4 · 3) / 2 = 6 cm]',
          '5 cm',
          '8 cm',
          '2,5 cm'
        ],
        correctAnswer: 0,
        hint: 'Használd az arányt: a : b = c : x ⟹ x = (b · c) / a.',
        explanation: 'Az aránypár felírása: 2 / 4 = 3 / x. Keresztbe szorozva: 2 · x = 4 · 3 = 12, amiből x = 12 / 2 = 6 cm.',
        breakdown: [
          { label: 'Képlet', value: 'x = (b · c) / a' },
          { label: 'Behelyettesítés', value: '(4 · 3) / 2 = 12 / 2 = 6 cm' }
        ]
      },
      {
        id: 'gc-q12',
        level: 2,
        question: 'Mi a „harmadik arányos” szakasz definíciója két adott a és b szakasz esetén?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <text x="130" y="32" textAnchor="middle" className="text-[11px] font-bold fill-purple-800">a : b = b : x</text>
            <text x="130" y="52" textAnchor="middle" className="text-[10px] font-mono font-bold fill-purple-600">x = b² / a</text>
          </svg>
        ),
        options: [
          'Az az x szakasz, amelyre a : b = b : x teljesül, azaz x = b² / a.',
          'A két szakasz összege osztva kettővel.',
          'A két szakasz különbsége.',
          'A derékszögű háromszög átfogója.'
        ],
        correctAnswer: 0,
        hint: 'A negyedik arányosban a két középső tag megegyezik: c = b.',
        explanation: 'A harmadik arányos a negyedik arányos speciális esete, amikor a : b = b : x. Ebből kifejezve: x = b² / a.',
        breakdown: [
          { label: 'Aránypár', value: 'a : b = b : x' },
          { label: 'Kifejezés', value: 'x = b² / a' }
        ]
      },
      {
        id: 'gc-q13',
        level: 2,
        question: 'Ha a harmadik arányos szerkesztésében az első tag a = 1 egység, és b = 3 egység, mekkora lesz a keresett x szakasz?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <text x="130" y="30" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">1 : 3 = 3 : x</text>
            <text x="130" y="50" textAnchor="middle" className="text-[11px] font-black fill-indigo-950">x = 3² / 1 = 9 egység</text>
          </svg>
        ),
        options: [
          '9 egység [x = 3² / 1 = 9 (egy szakasz négyzetének szerkesztése)]',
          '6 egység',
          '3 egység',
          '1,5 egység'
        ],
        correctAnswer: 0,
        hint: 'x = b² / a, ahol a = 1.',
        explanation: 'Ha a = 1, akkor x = b² / 1 = b². Ez a szerkesztési eljárás teszi lehetővé egy adott szakasz négyzetének megszerkesztését!',
        breakdown: [
          { label: 'Képlet', value: 'x = b² / a = 3² / 1' },
          { label: 'Eredmény', value: 'x = 9 egység' }
        ]
      },
      {
        id: 'gc-q14',
        level: 2,
        question: 'Egy ABC háromszöget az A csúcsból mint centrumból 1,5-szeresére szeretnénk nagyítani. Mit kell felmérnünk az AB és AC félegyenesekre?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="40,55 90,55 70,25" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="40,55 165,55 135,10" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
            <text x="40" y="65" className="text-[9px] font-bold fill-sky-800">A (centrum)</text>
            <text x="130" y="65" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">AB' = 1,5 · AB</text>
          </svg>
        ),
        options: [
          'Az AB\' = 1,5 · AB és AC\' = 1,5 · AC szakaszokat az A-ból induló félegyenesekre.',
          'Hozzáadunk mindkét oldalhoz 1,5 cm-t.',
          'Megkétszerezzük a szögeket.',
          'Csak a magasságot növeljük meg 1,5-szeresére.'
        ],
        correctAnswer: 0,
        hint: 'A középpontos hasonlóság a centrumból induló szakaszokat nyújtja meg arányosan.',
        explanation: 'Az A csúcs centrumú középpontos hasonlóságnál az A-ból induló oldalakat nyújtjuk 1,5-szeresükre: AB\' = 1,5 · AB és AC\' = 1,5 · AC. A kapott B\' és C\' pontokat összekötve a B\'C\' párhuzamos lesz a BC-vel.',
        breakdown: [
          { label: 'Centrum', value: 'A csúcs' },
          { label: 'Új csúcsok', value: 'AB\' = 1,5 · AB és AC\' = 1,5 · AC' }
        ]
      },
      {
        id: 'gc-q15',
        level: 2,
        question: 'Melyik geometriai tulajdonság jellemzi egy szakaszfelező merőleges egyenes összes pontját?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="40" y1="45" x2="220" y2="45" stroke="#0284c7" strokeWidth="2" />
            <line x1="130" y1="10" x2="130" y2="60" stroke="#10b981" strokeWidth="2" />
            <circle cx="130" cy="20" r="3" fill="#ef4444" />
            <line x1="40" y1="45" x2="130" y2="20" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="220" y1="45" x2="130" y2="20" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <text x="130" y="68" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">PA = PB (egyenlő távolság)</text>
          </svg>
        ),
        options: [
          'Egyenlő távolságra vannak a szakasz két végpontjától (PA = PB).',
          'Egyenlő távolságra vannak a koordinátatengelyektől.',
          'Csak a szakasz belsejében helyezkednek el.',
          'Párhuzamosak a szakasszal.'
        ],
        correctAnswer: 0,
        hint: 'A felezőmerőleges a sík azon pontjainak mértani helye, amelyek...',
        explanation: 'A szakaszfelező merőleges a sík azon pontjainak mértani helye, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak: PA = PB.',
        breakdown: [
          { label: 'Definíció', value: 'PA = PB minden P pontra a merőlegesen' },
          { label: 'Neve', value: 'Szakaszfelező merőleges' }
        ]
      },
      {
        id: 'gc-q16',
        level: 2,
        question: 'Melyik geometriai tulajdonság jellemzi egy szögfelező félegyenes összes pontját?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <path d="M 30 55 L 200 55 M 30 55 L 180 15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="30" y1="55" x2="190" y2="35" stroke="#10b981" strokeWidth="2" />
            <text x="130" y="65" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Egyenlő távolságra a szögszáraktól</text>
          </svg>
        ),
        options: [
          'Egyenlő távolságra vannak a szög két szárától.',
          'Egyenlő távolságra vannak a csúcstól.',
          'Merőlegesek a szög száraira.',
          'Csak a csúcsban léteznek.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a háromszög beírt körének középpontjára, ami a szögfelezők metszéspontja!',
        explanation: 'A szögfelező félegyenes a szögtartomány azon pontjainak mértani helye, amelyek a szög száraitól egyenlő merőleges távolságra vannak.',
        breakdown: [
          { label: 'Tulajdonság', value: 'Egyenlő távolság a szárak egyeneseitől' },
          { label: 'Alkalmazás', value: 'Beírt kör középpontja' }
        ]
      },
      {
        id: 'gc-q17',
        level: 2,
        question: 'Egy 18 cm hosszú szakaszt 1 : 2 arányban osztunk fel. Milyen hosszúak a keletkező szakaszok?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="40" x2="230" y2="40" stroke="#0284c7" strokeWidth="3" />
            <circle cx="96.6" cy="40" r="4" fill="#10b981" />
            <text x="63" y="30" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">6 cm</text>
            <text x="163" y="30" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">12 cm</text>
            <text x="130" y="58" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">Összesen: 18 cm</text>
          </svg>
        ),
        options: [
          '6 cm és 12 cm [1 + 2 = 3 rész, 18 / 3 = 6 cm]',
          '9 cm és 9 cm',
          '4 cm és 14 cm',
          '3 cm és 15 cm'
        ],
        correctAnswer: 0,
        hint: 'Összesen 1 + 2 = 3 rész van.',
        explanation: 'Az aránytagok összege 1 + 2 = 3 rész. Egy rész értéke: 18 cm / 3 = 6 cm. Az első szakasz 1 · 6 cm = 6 cm, a második 2 · 6 cm = 12 cm.',
        breakdown: [
          { label: 'Részegységek', value: '1 + 2 = 3 egység' },
          { label: '1 egység', value: '18 cm / 3 = 6 cm' },
          { label: 'Szakaszok', value: '6 cm és 12 cm' }
        ]
      },
      {
        id: 'gc-q18',
        level: 2,
        question: 'Adott szakaszok: a = 6 cm, b = 3 cm és c = 8 cm. Mekkora a negyedik arányos x szakasz?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <text x="130" y="32" textAnchor="middle" className="text-[10px] font-bold fill-amber-800">6 : 3 = 8 : x</text>
            <text x="130" y="50" textAnchor="middle" className="text-[10px] font-mono font-bold fill-amber-950">x = (3 · 8) / 6 = 24 / 6 = 4 cm</text>
          </svg>
        ),
        options: [
          '4 cm [x = (3 · 8) / 6 = 4 cm]',
          '16 cm',
          '12 cm',
          '2 cm'
        ],
        correctAnswer: 0,
        hint: 'x = (b · c) / a = (3 · 8) / 6.',
        explanation: 'Az arány 6 : 3 = 8 : x. Mivel a 3 fele a 6-nak, az x-nek is a 8 felének kell lennie: x = 4 cm.',
        breakdown: [
          { label: 'Számítás', value: 'x = (3 · 8) / 6 = 24 / 6 = 4 cm' }
        ]
      },
      {
        id: 'gc-q19',
        level: 2,
        question: 'Hogyan másolhatunk át egy α szöget egy adott félegyenesre kizárólag körzővel és vonalzóval?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <path d="M 30 50 L 80 50 M 30 50 L 70 20" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 50 50 A 20 20 0 0 0 45 35" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M 150 50 L 200 50 M 150 50 L 190 20" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <path d="M 170 50 A 20 20 0 0 0 165 35" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="130" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">Szögmásolás azonos sugarú körívekkel</text>
          </svg>
        ),
        options: [
          'A szög csúcsából körívvel metsszük a szárakat, ezt a sugarat visszük át az új csúcsra, majd a metszéspontok húrhosszát mérjük fel körzővel.',
          'Szögmérővel leolvassuk a fokokat és átrajzoljuk.',
          'Vonalzóval megmérjük a szárak hosszát.',
          'Tetszőleges ferde vonalat húzunk.'
        ],
        correctAnswer: 0,
        hint: 'A körzővel egy adott sugarú körívet húzunk mindkét szögcsúcsból, majd a körív két metszéspontjának távolságát (húrhosszát) visszük át.',
        explanation: 'A szögmásolás alapja: a szög csúcsából tetszőleges r sugárral elmetsszük a szárakat. Ugyanezzel az r sugárral körívet rajzolunk az új félegyenes kezdőpontjából, majd a szárak metszéspontjainak távolságát mérjük fel a körívre.',
        breakdown: [
          { label: '1. Lépés', value: 'r sugarú körív mindkét csúcsból' },
          { label: '2. Lépés', value: 'A szárak közti húrhossz átvitele körzővel' }
        ]
      },
      {
        id: 'gc-q20',
        level: 2,
        question: 'Egy háromszög középvonalát szeretnénk megszerkeszteni. Milyen lépéseket kell végrehajtanunk?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="50,55 190,55 120,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="85" cy="35" r="3" fill="#10b981" />
            <circle cx="155" cy="35" r="3" fill="#10b981" />
            <line x1="85" y1="35" x2="155" y2="35" stroke="#10b981" strokeWidth="2" />
            <text x="120" y="47" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Középvonal</text>
          </svg>
        ),
        options: [
          'Két oldal felezőmerőlegesével megkeressük az oldalfelező pontokat, majd összekötjük őket.',
          'Megmérjük a magasságot és elfelezzük.',
          'Megszerkesztjük a belső szögfelezőket.',
          'A háromszög súlypontján át párhuzamost húzunk.'
        ],
        correctAnswer: 0,
        hint: 'A középvonal definíció szerint két oldal felezőpontját összekötő szakasz.',
        explanation: 'Két tetszőleges oldalhoz felezőmerőlegest szerkesztünk körzővel, kijelölve az oldalfelező pontokat, majd ezeket vonalzóval összekötjük.',
        breakdown: [
          { label: '1. Lépés', value: 'Oldalfelező pontok megszerkesztése' },
          { label: '2. Lépés', value: 'A két felezőpont összekötése' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Szerkesztések és Tételek',
    subtitle: 'Háromszög kerületből és szögekből, aranymetszés, mértani közép, klasszikus tételek',
    range: '21-30. kérdés',
    focus: 'Aranyarány Φ, Thálész-tétel & magasságtétel m=√(pq), K felosztása a:b:c arányban',
    questions: [
      {
        id: 'gc-q21',
        level: 3,
        question: 'Hogyan szerkeszthető meg egy háromszög, ha ismertek a belső szögei (α, β, γ) és a kerülete (K)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,50 65,50 50,25" fill="none" stroke="#0284c7" strokeWidth="1" />
            <text x="47.5" y="60" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">Segédháromszög</text>
            <line x1="90" y1="45" x2="230" y2="45" stroke="#d97706" strokeWidth="2.5" />
            <text x="160" y="60" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">Valódi K kerület felosztása a₁:b₁:c₁ arányban</text>
          </svg>
        ),
        options: [
          'Szerkesztünk egy tetszőleges segédháromszöget a megadott szögekkel, majd a K kerületet a segédháromszög oldalainak arányában felosztjuk párhuzamos szelőkkel.',
          'A kerületet elosztjuk 3-mal és szabályos háromszöget szerkesztünk.',
          'Nem szerkeszthető meg, mert nincs megadva egyetlen oldal sem.',
          'Csak derékszögű háromszög esetén lehetséges.'
        ],
        correctAnswer: 0,
        hint: 'A hasonlóság miatt a szögek rögzítik az oldalak arányát (a : b : c).',
        explanation: 'A megadott szögekkel rajzolunk egy tetszőleges hasonló segédháromszöget. Ennek oldalai megadják a keresett oldalak pontos arányát (a₁ : b₁ : c₁). Ezután a valódi K hosszúságú szakaszt párhuzamos szelőkkel ebben az arányban felosztjuk, megkapva a valódi oldalhosszakat.',
        breakdown: [
          { label: '1. Lépés', value: 'Segédháromszög szerkesztése szögekből' },
          { label: '2. Lépés', value: 'Oldalarányok rögzítése (a₁ : b₁ : c₁)' },
          { label: '3. Lépés', value: 'K felosztása ebben az arányban' }
        ]
      },
      {
        id: 'gc-q22',
        level: 3,
        question: 'Mi a híres Aranymetszés (Divina Proportio) aránya egy szakasz két darabja (a > b) között?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="35" x2="153" y2="35" stroke="#d97706" strokeWidth="3" />
            <text x="91" y="27" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">a (nagyobb rész)</text>
            <line x1="153" y1="35" x2="230" y2="35" stroke="#f59e0b" strokeWidth="3" />
            <text x="191" y="27" textAnchor="middle" className="text-[9px] font-bold fill-amber-600">b (kisebb)</text>
            <text x="130" y="58" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">b / a = a / (a + b) ⟹ (a + b) / a = Φ ≈ 1,618</text>
          </svg>
        ),
        options: [
          'A kisebb rész úgy aránylik a nagyobbhoz, mint a nagyobb az egészhez: (a + b) / a = Φ ≈ 1,618.',
          'A szakasz pontos felezése (1 : 1 arány).',
          'A szakasz harmadolása (1 : 2 arány).',
          'A kerület és átmérő aránya (π ≈ 3,14).'
        ],
        correctAnswer: 0,
        hint: 'A Fibonacci-sorozat szomszédos elemeinek hányadosa is ehhez a számhoz tart.',
        explanation: 'Az aranymetszés az az egyedi arány, ahol a kisebb rész úgy aránylik a nagyobbhoz, mint a nagyobb rész az egész szakaszhoz. Ennek számszerű értéke Φ = (1 + √5) / 2 ≈ 1,618.',
        breakdown: [
          { label: 'Definíció', value: 'b / a = a / (a + b)' },
          { label: 'Arányszám', value: 'Φ = (1 + √5) / 2 ≈ 1,618' }
        ]
      },
      {
        id: 'gc-q23',
        level: 3,
        question: 'Hogyan szerkeszthető meg két szakasz (p és q) mértani közepe: m = √(p · q)?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <path d="M 30 50 A 100 100 0 0 1 230 50" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="30" y1="50" x2="230" y2="50" stroke="#64748b" strokeWidth="2" />
            <circle cx="100" cy="50" r="3" fill="#4f46e5" />
            <line x1="100" y1="50" x2="100" y2="12" stroke="#ef4444" strokeWidth="2.5" />
            <text x="65" y="62" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">p</text>
            <text x="165" y="62" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">q</text>
            <text x="100" y="8" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">m = √(p·q)</text>
          </svg>
        ),
        options: [
          'Egyenesre felmérjük a p és q szakaszokat egymás mellé, felette Thálész-félkört rajzolunk, és a közös pontban merőlegest állítunk (magasságtétel).',
          'Összeadjuk p-t és q-t, majd elfelezzük.',
          'Párhuzamos szelők tételével 2 : 1 arányban osztjuk.',
          'Két egyenlő oldalú háromszöget szerkesztünk.'
        ],
        correctAnswer: 0,
        hint: 'A derékszögű háromszög átfogóhoz tartozó magassága az átfogó két szeletének mértani közepe: m² = p · q.',
        explanation: 'A derékszögű háromszög magasságtétele szerint m² = p · q ⟹ m = √(p · q). Ha a p és q szakaszokat egymás folytatásaként felmérjük egy egyenesre, a p + q átmérőjű Thálész-félkörre bocsátott merőleges pontosan a mértani közepet adja.',
        breakdown: [
          { label: 'Tétel', value: 'Magasságtétel: m² = p · q' },
          { label: 'Szerkesztés', value: 'Thálész-félkör a p+q átmérőre' }
        ]
      },
      {
        id: 'gc-q24',
        level: 3,
        question: 'Melyik az a híres ókori geometriai feladat, amelyről a modern matematika bebizonyította, hogy euklideszi eszközökkel (körzővel és vonalzóval) LEHETETLEN megoldani?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <circle cx="80" cy="35" r="22" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="140" y="16" width="38" height="38" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="130" y="65" textAnchor="middle" className="text-[8px] font-bold fill-rose-800">A kör négyszögesítése (lehetetlen)</text>
          </svg>
        ),
        options: [
          'A kör négyszögesítése (adott körrel egyenlő területű négyzet szerkesztése).',
          'Szakasz felosztása 5 egyenlő részre.',
          'Szabályos háromszög szerkesztése.',
          'Szögfelező szerkesztése körzővel.'
        ],
        correctAnswer: 0,
        hint: 'A feladat a π szám transzcendenciája miatt nem oldható meg gyökvonásokkal és alapműveletekkel.',
        explanation: 'A három híres ókori probléma: a kör négyszögesítése, a kockakettőzés és az általános szögharmadolás. Mivel π transzcendens szám, a kör területével megegyező négyzet oldala (r·√π) nem szerkeszthető meg körzővel és vonalzóval.',
        breakdown: [
          { label: 'Probléma', value: 'Kör négyszögesítése' },
          { label: 'Ok', value: 'π transzcendens, algebrailag nem szerkeszthető' }
        ]
      },
      {
        id: 'gc-q25',
        level: 3,
        question: 'Egy háromszög kerülete K = 24 cm, oldalainak aránya 2 : 3 : 3. Mekkora a háromszög legrövidebb oldala?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="60,50 180,50 120,15" fill="none" stroke="#2563eb" strokeWidth="2" />
            <text x="120" y="62" textAnchor="middle" className="text-[9px] font-bold fill-blue-700">a = 6 cm (2 rész)</text>
            <text x="80" y="30" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">b = 9 cm</text>
            <text x="160" y="30" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">c = 9 cm</text>
          </svg>
        ),
        options: [
          '6 cm [2 + 3 + 3 = 8 rész, 1 rész = 3 cm, a = 2 · 3 = 6 cm]',
          '8 cm',
          '4 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az aránytagok összegét: 2 + 3 + 3 = 8 rész.',
        explanation: 'A kerület felosztása: 2 + 3 + 3 = 8 egyenlő rész. Egy egység: 24 cm / 8 = 3 cm. A legrövidebb oldal a 2 egységből álló oldal: a = 2 · 3 cm = 6 cm. A két szár 3 · 3 = 9 cm.',
        breakdown: [
          { label: 'Összeg', value: '2 + 3 + 3 = 8 rész' },
          { label: '1 rész', value: '24 cm / 8 = 3 cm' },
          { label: 'Legrövidebb oldal', value: '2 · 3 cm = 6 cm' }
        ]
      },
      {
        id: 'gc-q26',
        level: 3,
        question: 'Egy háromszög S súlypontját keressük szerkesztéssel. Mely vonalak metszéspontját kell megkeresnünk?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="40,55 200,55 120,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="40" y1="55" x2="160" y2="35" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="200" y1="55" x2="80" y2="35" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="120" cy="41.6" r="3" fill="#ef4444" />
            <text x="120" y="36" textAnchor="middle" className="text-[9px] font-black fill-rose-700">S (súlypont)</text>
          </svg>
        ),
        options: [
          'A súlyvonalakét: a csúcsokat a szemközti oldalak felezőpontjaival összekötő szakaszokét.',
          'Az oldalfelező merőlegesekét.',
          'A magasságvonalakét.',
          'A belső szögfelezőkét.'
        ],
        correctAnswer: 0,
        hint: 'A súlypont a súlyvonalak metszéspontja, amelyek az oldalfelező pontokba futnak.',
        explanation: 'A háromszög súlypontja (S) a súlyvonalak metszéspontja. A szerkesztéshez két oldal felezőpontját megszerkesztjük körzővel, majd összekötjük őket a szemközti csúcsokkal.',
        breakdown: [
          { label: 'Súlyvonal', value: 'Csúcs és szemközti oldalfelező pont' },
          { label: 'Súlypont (S)', value: 'A súlyvonalak metszéspontja' }
        ]
      },
      {
        id: 'gc-q27',
        level: 3,
        question: 'Hogyan szerkeszthető egy adott T területű háromszöghöz hasonló, de pontosan KÉTSZER akkora területű (T\' = 2 · T) háromszög?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="30,55 75,55 52.5,25" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="52.5" y="45" textAnchor="middle" className="text-[8px] font-bold fill-blue-800">T</text>
            <polygon points="120,58 184,58 152,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x="152" y="42" textAnchor="middle" className="text-[9px] font-bold fill-purple-800">T' = 2·T</text>
            <text x="152" y="66" textAnchor="middle" className="text-[8px] font-bold fill-purple-600">Oldalarány: k = √2</text>
          </svg>
        ),
        options: [
          'Az oldalait nem kétszeresére, hanem √2-szeresére kell növelni (mivel T\' / T = k² = 2 ⟹ k = √2).',
          'Minden oldalát meg kell kétszerezni.',
          'Minden szögét meg kell kétszerezni.',
          'Minden oldalát 4-szeresére kell növelni.'
        ],
        correctAnswer: 0,
        hint: 'A területek aránya k², nem k!',
        explanation: 'A hasonlóság alaptörvénye szerint a területek aránya a hasonlósági arány négyzete: T\' / T = k². Ha a területet duplázni akarjuk (k² = 2), akkor az oldalak arányának k = √2 ≈ 1,414-nek kell lennie.',
        breakdown: [
          { label: 'Területarány', value: 'k² = 2' },
          { label: 'Oldalarány', value: 'k = √2' }
        ]
      },
      {
        id: 'gc-q28',
        level: 3,
        question: 'Hogyan szerkeszthető meg pontosan a √2 hosszúságú szakasz az 1 egységből körzővel és vonalzóval?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="60,50 140,50 140,10" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="60" y1="50" x2="140" y2="10" stroke="#ef4444" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">1</text>
            <text x="148" y="30" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">1</text>
            <text x="90" y="25" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">c = √2</text>
          </svg>
        ),
        options: [
          'Egy egységnyi befogójú (1 és 1) derékszögű háromszög átfogójaként (1² + 1² = c² ⟹ c = √2).',
          'Két darab 1 egységnyi szakasz összeadásával.',
          'Az 1 egység elharmadolásával.',
          'Nem szerkeszthető meg, mert irracionális szám.'
        ],
        correctAnswer: 0,
        hint: 'Pitagorasz-tétel: a² + b² = c².',
        explanation: 'Ha egy derékszögű háromszög mindkét befogója 1 egység, a Pitagorasz-tétel szerint az átfogója c = √(1² + 1²) = √2. Ez körzővel és vonalzóval pontosan megszerkeszthető.',
        breakdown: [
          { label: 'Befogók', value: 'a = 1 és b = 1' },
          { label: 'Pitagorasz', value: 'c² = 1² + 1² = 2 ⟹ c = √2' }
        ]
      },
      {
        id: 'gc-q29',
        level: 3,
        question: 'Szabályos ötszög szerkesztésénél hol és hogyan jelenik meg az aranymetszés?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <polygon points="130,12 170,25 155,55 105,55 90,25" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <line x1="90" y1="25" x2="170" y2="25" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="130" y1="12" x2="155" y2="55" stroke="#ef4444" strokeWidth="1.5" />
            <text x="130" y="66" textAnchor="middle" className="text-[8px] font-bold fill-amber-800">d / a = Φ ≈ 1,618</text>
          </svg>
        ),
        options: [
          'A szabályos ötszög átlójának és oldalának aránya pontosan az aranymetszés aránya (d / a = Φ ≈ 1,618).',
          'Az ötszög területe és kerülete között.',
          'Csak a szabályos tízszögben jelenik meg.',
          'Nem jelenik meg az ötszögben.'
        ],
        correctAnswer: 0,
        hint: 'Az ötszög átlói egy ötágú csillagot zárnak be, egymást aranyarányban metszve.',
        explanation: 'A szabályos ötszög átlója és oldala közötti arány d / a = (1 + √5) / 2 = Φ. Az egymást metsző átlók pontosan aranymetszés arányában osztják fel egymást.',
        breakdown: [
          { label: 'Összefüggés', value: 'Átló / Oldal = Φ ≈ 1,618' },
          { label: 'Pentagramma', value: 'Minden átlópár aranyarányban metszi egymást' }
        ]
      },
      {
        id: 'gc-q30',
        level: 3,
        question: 'Mit jelent egy szakasz külső ponttal történő m : k arányú felosztása a geometriában?',
        figure: (
          <svg viewBox="0 0 260 70" className="w-full max-w-[260px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="40" x2="230" y2="40" stroke="#0284c7" strokeWidth="2" />
            <circle cx="50" cy="40" r="3.5" fill="#0284c7" />
            <text x="50" y="52" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">A</text>
            <circle cx="120" cy="40" r="3.5" fill="#0284c7" />
            <text x="120" y="52" textAnchor="middle" className="text-[8px] font-bold fill-sky-800">B</text>
            <circle cx="210" cy="40" r="4" fill="#ef4444" />
            <text x="210" y="52" textAnchor="middle" className="text-[9px] font-black fill-rose-700">Q (külső pont)</text>
            <text x="130" y="28" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">QA / QB = m / k</text>
          </svg>
        ),
        options: [
          'Az AB egyenesnek az AB szakaszon kívüli olyan Q pontját, amelyre QA / QB = m / k.',
          'Egy pontot a szakasz felezőmerőlegesén.',
          'Egy pontot a sík egy másik tartományában.',
          'A kör középpontját.'
        ],
        correctAnswer: 0,
        hint: 'A belső osztópont az AB szakaszon van, a külső osztópont az AB egyenes meghosszabbításán.',
        explanation: 'A külső osztópont az AB egyenesen, de magán az AB szakaszon kívül helyezkedik el. A végpontoktól mért távolságok aránya itt is megegyezik a megadott m / k aránnyal: QA / QB = m / k.',
        breakdown: [
          { label: 'Elhelyezkedés', value: 'Az AB egyenesen a szakaszon kívül' },
          { label: 'Arány', value: 'QA / QB = m / k' }
        ]
      }
    ]
  }
};

export const GeometricConstructionsQuiz: React.FC<GeometricConstructionsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-constructions"
      grade={8}
      chapterId="geometria"
      topicTitle="Szerkesztések"
      emoji="🧭"
      topicBadge="8. Osztály • II. Geometria • 6. Témakör"
      badgeText="8. Osztály • Matematika"
      title="Geometriai Szerkesztések Kvíz"
      subtitle="Szakaszosztás, negyedik arányos, aranymetszés és euklideszi szerkesztések 3 szinten"
      cheatSheetTitle="Szerkesztések Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Emlékezz: szakaszosztásnál az aránytagokat össze kell adni (m + k egység a segédfélegyenesre)!"
      levels={quizLevels}
      matcherComponent={<GeometricConstructionsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GeometricConstructionsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="amber"
    />
  );
};

export default GeometricConstructionsQuiz;
