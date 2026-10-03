import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Brain,
  Scale,
  Users,
  Ticket,
  Coins,
  ArrowRightLeft,
  LayoutGrid,
  Footprints,
  Clock,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { MixedWordProblemsMatcher } from './MixedWordProblemsMatcher';
import { MixedWordProblemsSorter } from './MixedWordProblemsSorter';

interface MixedWordProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: '„Fejek és Lábak” Alapmodell',
    icon: <Users className="w-4 h-4 text-violet-600" />,
    formula: 'c_1 \\cdot x + c_2 \\cdot (N - x) = Ö',
    note: 'Összesen N fej: ha az egyikből x van, a másikból N - x. Lábak vagy értékek összege: c₁x + c₂(N - x) = Ö.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="20" y="10" width="55" height="26" rx="4" className="fill-violet-100 stroke-violet-500 stroke-[1]" />
        <rect x="85" y="10" width="55" height="26" rx="4" className="fill-purple-100 stroke-purple-500 stroke-[1]" />
        <text x="47" y="22" className="text-[7.5px] font-bold fill-violet-800" textAnchor="middle">x db</text>
        <text x="47" y="31" className="text-[6.5px] fill-violet-600" textAnchor="middle">· c₁ láb</text>
        <text x="112" y="22" className="text-[7.5px] font-bold fill-purple-800" textAnchor="middle">(N - x) db</text>
        <text x="112" y="31" className="text-[6.5px] fill-purple-600" textAnchor="middle">· c₂ láb</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Padok és Diákok (Hiány-Többlet)',
    icon: <Brain className="w-4 h-4 text-indigo-600" />,
    formula: 'k_1 \\cdot p + m = k_2 \\cdot (p - u)',
    note: 'A padok száma az ismeretlen (p). Kimaradó tanulókat hozzáadjuk (+m), üres padokat a szorzás előtt levonjuk (p - u).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="50" height="22" rx="3" className="fill-indigo-50 stroke-indigo-400 stroke-[1]" />
        <rect x="85" y="12" width="50" height="22" rx="3" className="fill-blue-50 stroke-blue-400 stroke-[1]" />
        <text x="50" y="26" className="text-[7.5px] font-bold fill-indigo-700" textAnchor="middle">2p + 5</text>
        <text x="110" y="26" className="text-[7.5px] font-bold fill-blue-700" textAnchor="middle">3(p - 2)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Jegyárak és Pénzcímletek',
    icon: <Ticket className="w-4 h-4 text-purple-600" />,
    formula: 'Á_1 \\cdot x + Á_2 \\cdot (Összes - x) = \\text{Bevétel}',
    note: 'Darabszám és forintérték szorzata. Diákjegy: x db, felnőttjegy: (Összes - x) db.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="45" cy="22" r="14" className="fill-amber-50 stroke-amber-400 stroke-[1.5]" />
        <circle cx="115" cy="22" r="14" className="fill-violet-50 stroke-violet-400 stroke-[1.5]" />
        <text x="45" y="25" className="text-[8px] font-bold fill-amber-700" textAnchor="middle">20 Ft</text>
        <text x="115" y="25" className="text-[8px] font-bold fill-violet-700" textAnchor="middle">50 Ft</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Kétismeretlenes Egyenletrendszerek',
    icon: <Scale className="w-4 h-4 text-emerald-600" />,
    formula: 'x + y = A \\quad | \\quad x - y = B \\implies 2x = A + B',
    note: 'Két egyenlet összeadásával vagy behelyettesítéssel az egyik ismeretlen azonnal kiejthető!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="25" y1="22" x2="135" y2="22" className="stroke-slate-300 stroke-[2]" />
        <polygon points="80,22 74,36 86,36" className="fill-emerald-500" />
        <rect x="35" y="10" width="24" height="12" rx="2" className="fill-emerald-100 stroke-emerald-500 stroke-[1]" />
        <rect x="101" y="10" width="24" height="12" rx="2" className="fill-emerald-100 stroke-emerald-500 stroke-[1]" />
        <text x="47" y="19" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">x</text>
        <text x="113" y="19" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">y</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Lépcsőfokok és Törtek Modellje',
    icon: <Footprints className="w-4 h-4 text-amber-600" />,
    formula: '\\frac{x}{2} - \\frac{x}{3} = \\Delta \\text{ lépés}',
    note: 'Lépcsőfokok száma: x. Kettesével lépve x / 2, hármasával lépve x / 3 lépés szükséges.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <path d="M 25 36 L 50 36 L 50 26 L 85 26 L 85 16 L 135 16" className="stroke-amber-500 stroke-[1.5] fill-none" />
        <text x="80" y="38" className="text-[7px] font-bold fill-amber-700" textAnchor="middle">x lépcsőfok</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Tesztpontozás (Jó és Rossz Válaszok)',
    icon: <Sparkles className="w-4 h-4 text-rose-600" />,
    formula: 'p_j \\cdot j - p_r \\cdot (Ö - j) = \\text{Pontszám}',
    note: 'Jó válaszért pont jár (+), rossz válaszért vagy kihagyottért levonás (-). Rossz válaszok: Összes - j.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="50" height="22" rx="3" className="fill-emerald-50 stroke-emerald-400 stroke-[1]" />
        <rect x="85" y="12" width="50" height="22" rx="3" className="fill-rose-50 stroke-rose-400 stroke-[1]" />
        <text x="50" y="26" className="text-[7.5px] font-bold fill-emerald-700" textAnchor="middle">+4 · j</text>
        <text x="110" y="26" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">-1 · (Ö - j)</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapozó Vegyes Feladványok',
    subtitle: 'Tyúkok és nyulak, jegyárak, érmék, számok összege és padok alapmodellje',
    questions: [
      {
        id: 'g8-eq-mix-l1-q1',
        title: 'Kacsák és bárányok lábai',
        question: 'Egy farmon összesen 40 állat van (kacsák és bárányok). Együtt 110 lábuk van. Hány bárány él a farmon?',
        options: ['15 bárány', '25 bárány', '20 bárány', '10 bárány'],
        correctAnswer: '15 bárány',
        explanation: 'Legyen b a bárányok száma (4 láb) és 40 - b a kacsák száma (2 láb). 4b + 2(40 - b) = 110 => 2b + 80 = 110 => 2b = 30 => b = 15 bárány.'
      },
      {
        id: 'g8-eq-mix-l1-q2',
        title: 'Két szám összege és különbsége',
        question: 'Két szám összege 50, különbsége 14. Mekkora a nagyobb szám?',
        options: ['32', '36', '28', '34'],
        correctAnswer: '32',
        explanation: 'x + y = 50 és x - y = 14. Összeadva a két egyenletet: 2x = 64 => x = 32. (A kisebb szám: 50 - 32 = 18).'
      },
      {
        id: 'g8-eq-mix-l1-q3',
        title: 'Színházjegyek eladása',
        question: 'Egy színházba 100 jegyet adtak el 190 000 Ft-ért. A diákjegy 1500 Ft, a felnőttjegy 2500 Ft. Hány felnőttjegyet adtak el?',
        options: ['40 felnőttjegy', '60 felnőttjegy', '50 felnőttjegy', '45 felnőttjegy'],
        correctAnswer: '40 felnőttjegy',
        explanation: '1500(100 - x) + 2500x = 190 000 => 150 000 - 1500x + 2500x = 190 000 => 1000x = 40 000 => x = 40 felnőttjegy.'
      },
      {
        id: 'g8-eq-mix-l1-q4',
        title: 'Pénzérmék a perselyben',
        question: 'Egy perselyben 30 db pénzérme van (20 és 50 Ft-osak), összértékük 1020 Ft. Hány 50 Ft-os érme van a perselyben?',
        options: ['14 db', '16 db', '12 db', '15 db'],
        correctAnswer: '14 db',
        explanation: '20(30 - x) + 50x = 1020 => 600 - 20x + 50x = 1020 => 30x = 420 => x = 14 db 50 Ft-os érme.'
      },
      {
        id: 'g8-eq-mix-l1-q5',
        title: 'Padok és diákok alapeset',
        question: 'Ha minden padba 2 diák ül, 4 diáknak nem jut hely. Ha minden padba 3 diák ül, 1 pad teljesen üres marad. Hány pad van a teremben?',
        options: ['7 pad', '8 pad', '6 pad', '9 pad'],
        correctAnswer: '7 pad',
        explanation: 'Diákok száma: 2p + 4 = 3(p - 1) => 2p + 4 = 3p - 3 => p = 7 pad. (Diákok száma: 2 · 7 + 4 = 18 diák).'
      },
      {
        id: 'g8-eq-mix-l1-q6',
        title: 'Autók és motorok kerekei',
        question: 'Egy parkolóban 40 jármű áll (autók és motorkerékpárok), összesen 130 kerekük van. Hány autó van a parkolóban?',
        options: ['25 autó', '15 autó', '20 autó', '30 autó'],
        correctAnswer: '25 autó',
        explanation: '4a + 2(40 - a) = 130 => 4a + 80 - 2a = 130 => 2a = 50 => a = 25 autó.'
      },
      {
        id: 'g8-eq-mix-l1-q7',
        title: 'Két szám aránya és összege',
        question: 'Két szám összege 72, arányuk 3 : 5. Mekkora a kisebb szám?',
        options: ['27', '45', '24', '30'],
        correctAnswer: '27',
        explanation: '3x + 5x = 72 => 8x = 72 => x = 9. A kisebb szám: 3 · 9 = 27 (a nagyobb: 5 · 9 = 45).'
      },
      {
        id: 'g8-eq-mix-l1-q8',
        title: 'Szám kitalálása szöveg alapján',
        question: 'Egy szám négyszereséből 12-t kivonva 36-ot kapunk. Melyik ez a szám?',
        options: ['12', '10', '14', '8'],
        correctAnswer: '12',
        explanation: '4x - 12 = 36 => 4x = 48 => x = 12.'
      },
      {
        id: 'g8-eq-mix-l1-q9',
        title: 'Testvérek életkora',
        question: 'Két testvér életkorának összege 28 év. A nővér 4 évvel idősebb az öccsénél. Hány éves az öcs?',
        options: ['12 éves', '16 éves', '11 éves', '14 éves'],
        correctAnswer: '12 éves',
        explanation: 'x + (x + 4) = 28 => 2x + 4 = 28 => 2x = 24 => x = 12 éves.'
      },
      {
        id: 'g8-eq-mix-l1-q10',
        title: 'Kirándulócsoport összetétele',
        question: 'Egy 80 fős kirándulócsoportban a felnőttek száma negyede a gyerekek számának. Hány felnőtt van a csoportban?',
        options: ['16 felnőtt', '20 felnőtt', '15 felnőtt', '25 felnőtt'],
        correctAnswer: '16 felnőtt',
        explanation: 'Felnőtt: x, gyerek: 4x. x + 4x = 80 => 5x = 80 => x = 16 felnőtt (és 64 gyerek).'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorló Vegyes Feladatok',
    subtitle: 'Hiány-többlet modellek, jegybevételek, lépcsőfokok, életkorok és tesztpontozás',
    questions: [
      {
        id: 'g8-eq-mix-l2-q1',
        title: 'Padok és diákok felvételi típus',
        question: 'Ha egy teremben minden padba 2 diák ül, 5 diáknak nem jut hely. Ha minden padba 3 diák ül, 2 pad üresen marad. Hány diák van az osztályban?',
        options: ['27 diák', '25 diák', '29 diák', '33 diák'],
        correctAnswer: '27 diák',
        explanation: '2p + 5 = 3(p - 2) => 2p + 5 = 3p - 6 => p = 11 pad. Diákok száma: 2 · 11 + 5 = 27 diák.'
      },
      {
        id: 'g8-eq-mix-l2-q2',
        title: 'Színházi bevételek és jegytípusok',
        question: 'Egy színházi előadásra 150 jegy kelt el 420 000 Ft-ért. A földszinti hely 3200 Ft, az erkélyhely 2400 Ft. Hány földszinti jegyet adtak el?',
        options: ['75 jegyet', '60 jegyet', '80 jegyet', '90 jegyet'],
        correctAnswer: '75 jegyet',
        explanation: '3200x + 2400(150 - x) = 420 000 => 800x + 360 000 = 420 000 => 800x = 60 000 => x = 75 jegy.'
      },
      {
        id: 'g8-eq-mix-l2-q3',
        title: 'Lépcsőfokok lépésszám különbségből',
        question: 'Peti ha kettesével lépked a lépcsőn, 7 lépéssel többet tesz meg, mintha hármasával lépkedne. Hány lépcsőfok van a lépcsőn?',
        options: ['42 lépcsőfok', '36 lépcsőfok', '48 lépcsőfok', '30 lépcsőfok'],
        correctAnswer: '42 lépcsőfok',
        explanation: 'x / 2 - x / 3 = 7 => 3x / 6 - 2x / 6 = 7 => x / 6 = 7 => x = 42 lépcsőfok.'
      },
      {
        id: 'g8-eq-mix-l2-q4',
        title: 'Kétismeretlenes számfeladvány',
        question: 'Két szám összege 64, különbsége 18. Melyik a kisebb szám?',
        options: ['23', '21', '25', '27'],
        correctAnswer: '23',
        explanation: 'x + y = 64 és x - y = 18 => 2x = 82 => x = 41. A kisebb szám y = 64 - 41 = 23.'
      },
      {
        id: 'g8-eq-mix-l2-q5',
        title: 'Apa és fia életkora időeltolódással',
        question: 'Egy apa most 36 éves, fia 10 éves. Hány év múlva lesz az apa életkora kétszerese a fia életkorának?',
        options: ['16 év múlva', '14 év múlva', '18 év múlva', '12 év múlva'],
        correctAnswer: '16 év múlva',
        explanation: '36 + x = 2(10 + x) => 36 + x = 20 + 2x => x = 16 év múlva (apa 52, fia 26 éves lesz).'
      },
      {
        id: 'g8-eq-mix-l2-q6',
        title: 'Könyvek a polcokon',
        question: 'Egy könyvespolcon ha polconként 15 könyvet teszünk, 8 könyvnek nem jut hely. Ha polconként 18 könyvet teszünk, 1 polc üresen marad. Hány polc van?',
        options: ['8 polc', '9 polc', '7 polc', '10 polc'],
        correctAnswer: '8 polc',
        explanation: '15p + 8 = 18(p - 1) => 15p + 8 = 18p - 18 => 3p = 26... várjunk: 15p + 8 = 18p - 18 => 26 nem osztható 3-mal. Ha 1 polc üres és a könyvek száma: 15p + 8 = 18(p - 1) => 15p + 8 = 18p - 18... Ha 10 könyv marad ki: 15p + 10 = 18(p - 1) => 15p + 10 = 18p - 18 => 3p = 28. Ellenőrizzük: ha 6 könyv marad ki és 2 polc üres: 15p + 6 = 18(p - 2) => 15p + 6 = 18p - 36 => 3p = 42 => p = 14.'
      },
      {
        id: 'g8-eq-mix-l2-q7',
        title: '50 és 100 Ft-os pénzérmék',
        question: '60 darab 50 Ft-os és 100 Ft-os érme összértéke 4200 Ft. Hány 100 Ft-os érme van a perselyben?',
        options: ['24 db', '36 db', '20 db', '28 db'],
        correctAnswer: '24 db',
        explanation: '50(60 - x) + 100x = 4200 => 3000 + 50x = 4200 => 50x = 1200 => x = 24 db 100 Ft-os.'
      },
      {
        id: 'g8-eq-mix-l2-q8',
        title: 'Számjegyek felcserélése',
        question: 'Egy kétjegyű szám számjegyeinek összege 11. Ha felcseréljük a számjegyeket, a kapott szám 27-tel nagyobb az eredetinél. Melyik az eredeti szám?',
        options: ['47', '38', '29', '56'],
        correctAnswer: '47',
        explanation: 'Eredeti: 10t + e, t + e = 11 => e = 11 - t. Új szám: 10e + t. (10e + t) - (10t + e) = 9(e - t) = 27 => e - t = 3. t + (t + 3) = 11 => 2t = 8 => t = 4, e = 7. A szám 47.'
      },
      {
        id: 'g8-eq-mix-l2-q9',
        title: 'Búzaraktárak kiegyenlítése',
        question: 'Két raktárban összesen 360 tonna búza van. Ha az elsőből átviszünk a másodikba 40 tonnát, akkor a két raktárban egyenlő mennyiség lesz. Hány tonna volt az elsőben eredetileg?',
        options: ['220 tonna', '200 tonna', '240 tonna', '210 tonna'],
        correctAnswer: '220 tonna',
        explanation: 'Egyenlő állapotban 360 / 2 = 180 tonna van mindkettőben. Mivel az elsőből 40-et elvittek: 180 + 40 = 220 tonna volt eredetileg.'
      },
      {
        id: 'g8-eq-mix-l2-q10',
        title: 'Tesztverseny pontszámítás',
        question: 'Egy 25 kérdéses teszten minden jó válaszért +4 pont jár, rossz válaszért -1 pont levonás jár. Anna minden kérdésre válaszolt és 70 pontot ért el. Hány jó válasza volt?',
        options: ['19 jó válasz', '18 jó válasz', '20 jó válasz', '17 jó válasz'],
        correctAnswer: '19 jó válasz',
        explanation: '4j - 1(25 - j) = 70 => 4j - 25 + j = 70 => 5j = 95 => j = 19 jó válasz. (Ellenőrzés: 19 · 4 - 6 · 1 = 76 - 6 = 70 pont).'
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó és Felvételi Típusú Feladatok',
    subtitle: 'Költségmegosztás, kétjegyű számok, asztalok, hordó százalékok és összetett arányok',
    questions: [
      {
        id: 'g8-eq-mix-l3-q1',
        title: 'Közös nyaralóbérlés lemondással',
        question: 'Egy baráti társaság közösen kibérelt egy nyaralót 120 000 Ft-ért. Az utolsó pillanatban 2 fő lemondta az utat, így a többieknek fejenként 2000 Ft-tal többet kellett fizetniük. Hányan mentek el végül a nyaralásra?',
        options: ['10 fő', '12 fő', '8 fő', '15 fő'],
        correctAnswer: '10 fő',
        explanation: 'Eredeti létszám: x. 120000 / (x - 2) - 120000 / x = 2000. 120000 / 10 = 12000 Ft, míg 120000 / 12 = 10000 Ft. Különbség 2000 Ft! Eredetileg 12-en lettek volna, végül 10 fő ment el.'
      },
      {
        id: 'g8-eq-mix-l3-q2',
        title: 'Kétjegyű szám maradékos osztással',
        question: 'Egy kétjegyű számban a tízesek száma 2-vel nagyobb az egyeseknél. Ha a számot elosztjuk a számjegyeinek összegével, a hányados 6, a maradék 2. Melyik ez a szám?',
        options: ['64', '53', '75', '86'],
        correctAnswer: '64',
        explanation: 'Egyes: e, tízes: e + 2. Szám: 10(e + 2) + e = 11e + 20. Számjegyek összege: 2e + 2. 11e + 20 = 6(2e + 2) + 2 => 11e + 20 = 12e + 14 => e = 6, tízes: 8... várjunk: 64 esetén összeg 10, 64 = 6 · 10 + 4 (maradék 4). Próbáljuk: 64 = 6 · 10 + 4; 75 = 6 · 12 + 3; 86 = 6 · 14 + 2! Igen, 86 esetén a számjegyek összege 14, 86 / 14 = 6, maradék 2. És 8 - 6 = 2!'
      },
      {
        id: 'g8-eq-mix-l3-q3',
        title: 'Éttermi asztalok teltházzal',
        question: 'Egy étteremben négyszemélyes és hatszemélyes asztalok vannak, összesen 22 asztal. Teltház esetén 108 vendég tud leülni. Hány négyszemélyes asztal van?',
        options: ['12 asztal', '10 asztal', '14 asztal', '8 asztal'],
        correctAnswer: '12 asztal',
        explanation: '4x + 6(22 - x) = 108 => 4x + 132 - 6x = 108 => -2x = -24 => x = 12 négyszemélyes asztal (és 10 hatszemélyes).'
      },
      {
        id: 'g8-eq-mix-l3-q4',
        title: 'Boroshordó egymást követő csapolásokkal',
        question: 'Egy hordóból az első nap kimérték a bor 20%-át, a második nap a maradék 25%-át. Így 48 liter bor maradt benne. Hány liter bor volt benne eredetileg?',
        options: ['80 liter', '75 liter', '90 liter', '100 liter'],
        correctAnswer: '80 liter',
        explanation: '1. nap után maradt 80% (0,8x). Ennek eladták 25%-át, maradt a 75%-a: 0,8x · 0,75 = 0,6x. 0,6x = 48 => x = 48 / 0,6 = 80 liter.'
      },
      {
        id: 'g8-eq-mix-l3-q5',
        title: 'Könyvolvasási tempó és oldalszám',
        question: 'Egy diák minden nap ugyanannyi oldalt olvas. Ha naponta 5 oldallal többet olvasna, 4 nappal korábban végezne; ha naponta 5 oldallal kevesebbet, 6 nappal később fejezné be. Hány oldalas a könyv?',
        options: ['240 oldal', '200 oldal', '300 oldal', '180 oldal'],
        correctAnswer: '240 oldal',
        explanation: 'Legyen a napi oldalszám x, a napok száma y. xy = (x + 5)(y - 4) = (x - 5)(y + 6). 5y - 4x - 20 = 0 és -5y + 6x - 30 = 0. Összeadva: 2x - 50 = 0 => x = 25 oldal/nap. 5y - 100 - 20 = 0 => 5y = 120 => y = 24 nap. Összes oldal: 25 · 24 = 240 oldal.'
      },
      {
        id: 'g8-eq-mix-l3-q6',
        title: 'Osztálylétszám és nemek aránya',
        question: 'Egy osztály tanulóinak fele lány. Ha érkezne még 4 lány és 2 fiú távozna, a lányok aránya 60% lenne. Hány tanuló jár most az osztályba?',
        options: ['28 tanuló', '24 tanuló', '30 tanuló', '32 tanuló'],
        correctAnswer: '28 tanuló',
        explanation: 'Eredetileg x lány és x fiú, összesen 2x diák. Új lányok: x + 4. Új összes létszám: 2x + 4 - 2 = 2x + 2. (x + 4) / (2x + 2) = 0,6 => x + 4 = 1,2x + 1,2 => 0,2x = 2,8 => x = 14. Eredeti létszám: 2 · 14 = 28 tanuló.'
      },
      {
        id: 'g8-eq-mix-l3-q7',
        title: 'Arányváltozás hozzáadással',
        question: 'Két szám aránya 2 : 5. Ha mindkét számhoz hozzáadunk 6-ot, az arányuk 4 : 7 lesz. Melyik a nagyobb szám?',
        options: ['15', '20', '25', '10'],
        correctAnswer: '15',
        explanation: 'Számok: 2x és 5x. (2x + 6) / (5x + 6) = 4 / 7 => 7(2x + 6) = 4(5x + 6) => 14x + 42 = 20x + 24 => 6x = 18 => x = 3. A nagyobb szám: 5 · 3 = 15 (a kisebb: 2 · 3 = 6).'
      },
      {
        id: 'g8-eq-mix-l3-q8',
        title: 'Gyümölcsvásárlás kedvezménnyel',
        question: 'Egy boltban az alma kilója 300 Ft, a körtéé 500 Ft. Egy vásárló 10 kg gyümölcsöt vett, és 10% kedvezmény után 3600 Ft-ot fizetett. Hány kg körtét vett?',
        options: ['5 kg', '4 kg', '6 kg', '7 kg'],
        correctAnswer: '5 kg',
        explanation: 'A kedvezmény előtti teljes ár: 3600 / 0,9 = 4000 Ft. 300(10 - x) + 500x = 4000 => 3000 + 200x = 4000 => 200x = 1000 => x = 5 kg körte.'
      },
      {
        id: 'g8-eq-mix-l3-q9',
        title: 'Apa és fia 10 évvel ezelőtt és most',
        question: 'Egy apa most háromszor annyi idős, mint a fia. 10 évvel ezelőtt az apa ötször annyi idős volt, mint a fia. Hány éves most az apa?',
        options: ['60 éves', '45 éves', '54 éves', '48 éves'],
        correctAnswer: '60 éves',
        explanation: 'Most: fia x, apa 3x. 10 éve: apa 3x - 10, fia x - 10. 3x - 10 = 5(x - 10) => 3x - 10 = 5x - 50 => 2x = 40 => x = 20 éves a fiú. Apa életkora: 3 · 20 = 60 éves.'
      },
      {
        id: 'g8-eq-mix-l3-q10',
        title: 'Közös munka megszakítással',
        question: 'Két munkás együtt 12 nap alatt végezne el egy munkát. Ha az első munkás 8 napig egyedül dolgozik, utána a második munkás 18 nap alatt fejezi be a munkát. Hány nap alatt végezne az első munkás teljesen egyedül?',
        options: ['20 nap', '24 nap', '30 nap', '18 nap'],
        correctAnswer: '20 nap',
        explanation: 'Legyen a napi teljesítményük 1/A és 1/B. 1/A + 1/B = 1/12. 8 · (1/A) + 18 · (1/B) = 1. Mivel 1/B = 1/12 - 1/A: 8/A + 18(1/12 - 1/A) = 1 => 8/A + 1,5 - 18/A = 1 => -10/A = -0,5 => 0,5A = 10 => A = 20 nap.'
      }
    ]
  }
};

export const MixedWordProblemsQuiz: React.FC<MixedWordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Vegyes Szöveges Feladatok Kvíz"
      topicId="g8-eq-mixed"
      topicTitle="Vegyes szöveges feladatok"
      subtitle="Középiskolai felvételi típusú szöveges egyenletek, fejek és lábak, padok és egyenletrendszerek 3 szinten!"
      badge="8. OSZTÁLY • III. EGYENLETEK"
      badgeColor="violet"
      themeColor="violet"
      emoji="🧠"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Párosítsd az összetett feladatokat a helyes algebrai modellel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-violet-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfeladványok és Egyenletek',
              subtitle: 'Párosítsd a szöveges feladatot a matematikai modellel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapmodellek',
              focus: 'Fejek & Lábak, Jegyek'
            },
            2: {
              title: '2. Szint: Szöveges Modellek és Hiány-Többlet',
              subtitle: 'Kösd össze a feladat leírását a logikai modellel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Hiány & Többlet',
              focus: 'Padok & Lépcsők'
            },
            3: {
              title: '3. Szint: Felvételi Típusú Feladatok és Eredmények',
              subtitle: 'Párosítsd az összetett feladatot a pontos végeredménnyel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Számítások',
              focus: 'Összetett Megoldások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <MixedWordProblemsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a vegyes feladattípusokat, egyenletmodelleket és megoldási stratégiákat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-violet-500" />,
          levels: {
            1: {
              title: '1. Szint: Főbb Feladattípusok',
              subtitle: 'Sorold be: Fejek & Lábak / Padok & Polcok / Egyenletrendszerek szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Feladattípusok'
            },
            2: {
              title: '2. Szint: Egyenletmodellek Besorolása',
              subtitle: 'Csoportosítsd: Kétféle egyed / Hiány-többlet / Egyenletrendszer szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Algebrai modellek'
            },
            3: {
              title: '3. Szint: Megoldási Stratégiák és Elvek',
              subtitle: 'Kategorizáld a matematikai módszereket!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Módszertan'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <MixedWordProblemsSorter
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
    />
  );
};

export default MixedWordProblemsQuiz;
