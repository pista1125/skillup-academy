import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Award,
  Scale,
  Calculator,
  Percent,
  Footprints,
  Compass,
  Coins,
  LayoutGrid
} from 'lucide-react';
import { Chapter3EquationsSummaryMatcher } from './Chapter3EquationsSummaryMatcher';
import { Chapter3EquationsSummarySorter } from './Chapter3EquationsSummarySorter';

interface Chapter3EquationsSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mérlegelv & Zárójelek',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: 'a \\cdot x + b = c \\iff a \\cdot x = c - b \\iff x = \\frac{c - b}{a}',
    note: 'Mindkét oldalhoz ugyanazt adjuk vagy vonjuk le. Zárójel előtti mínusz előjel minden belső előjelet megfordít!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-slate-300 stroke-[2]" />
        <polygon points="80,22 74,36 86,36" className="fill-amber-500" />
        <rect x="30" y="10" width="30" height="12" rx="2" className="fill-amber-100 stroke-amber-500 stroke-[1]" />
        <rect x="100" y="10" width="30" height="12" rx="2" className="fill-emerald-100 stroke-emerald-500 stroke-[1]" />
        <text x="45" y="19" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">Bal oldal</text>
        <text x="115" y="19" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">Jobb oldal</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Kétjegyű Számok Helyiértéke',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: '\\overline{ab} = 10a + b \\quad | \\quad \\overline{ba} = 10b + a',
    note: 'a a tízesek, b az egyesek száma. Ha felcseréljük a számjegyeket, a különbség mindig 9 többszöröse: 9(a - b).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="50" height="22" rx="3" className="fill-blue-50 stroke-blue-400 stroke-[1]" />
        <rect x="85" y="12" width="50" height="22" rx="3" className="fill-indigo-50 stroke-indigo-400 stroke-[1]" />
        <text x="50" y="26" className="text-[8px] font-bold fill-blue-800" textAnchor="middle">10 · a</text>
        <text x="110" y="26" className="text-[8px] font-bold fill-indigo-800" textAnchor="middle">+ 1 · b</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Keverési & Ötvözeti Modell',
    icon: <Percent className="w-4 h-4 text-emerald-600" />,
    formula: 'm_1 \\cdot p_1 + m_2 \\cdot p_2 = (m_1 + m_2) \\cdot p_ö',
    note: 'A tiszta oldott anyag (só, cukor, ezüst) tömege megmarad az összeöntés után is!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="15" y="12" width="35" height="22" rx="3" className="fill-emerald-50 stroke-emerald-400 stroke-[1]" />
        <text x="55" y="26" className="text-[8px] font-bold fill-slate-500">+</text>
        <rect x="65" y="12" width="35" height="22" rx="3" className="fill-emerald-50 stroke-emerald-400 stroke-[1]" />
        <text x="105" y="26" className="text-[8px] font-bold fill-slate-500">=</text>
        <rect x="115" y="10" width="35" height="26" rx="3" className="fill-emerald-100 stroke-emerald-600 stroke-[1.5]" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Mozgás: Szembe & Utolérés',
    icon: <Footprints className="w-4 h-4 text-purple-600" />,
    formula: 's = (v_1 + v_2) \\cdot t \\quad | \\quad s_{\\text{előny}} = (v_1 - v_2) \\cdot t',
    note: 'Szembe haladásnál a sebességek összeadódnak; azonos irányú utolérésnél a sebességek különbsége számít.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-slate-300 stroke-[2]" />
        <circle cx="35" cy="22" r="5" className="fill-purple-600" />
        <circle cx="125" cy="22" r="5" className="fill-indigo-600" />
        <line x1="43" y1="22" x2="70" y2="22" className="stroke-purple-600 stroke-[1.5]" />
        <line x1="117" y1="22" x2="90" y2="22" className="stroke-indigo-600 stroke-[1.5]" />
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Közös Munkavégzés & Csapok',
    icon: <Compass className="w-4 h-4 text-rose-600" />,
    formula: '\\frac{1}{t_1} + \\frac{1}{t_2} = \\frac{1}{t_{\\text{együtt}}}',
    note: 'Nem az idők adódnak össze, hanem az 1 óra alatt elvégzett munkarészek (teljesítmények)!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="50" height="22" rx="3" className="fill-rose-50 stroke-rose-400 stroke-[1]" />
        <rect x="85" y="12" width="50" height="22" rx="3" className="fill-orange-50 stroke-orange-400 stroke-[1]" />
        <text x="50" y="26" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">1 / t₁</text>
        <text x="110" y="26" className="text-[7.5px] font-bold fill-orange-700" textAnchor="middle">1 / t₂</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Pénzügyi Változások & Kamat',
    icon: <Coins className="w-4 h-4 text-amber-600" />,
    formula: 'Új = x \\cdot q_1 \\cdot q_2 \\quad | \\quad K = \\frac{T \\cdot p \\cdot t}{100}',
    note: 'Egymást követő árváltozásoknál szorzunk (láncszorzás). A kamatképletben t években számolandó.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="45" cy="22" r="14" className="fill-amber-50 stroke-amber-400 stroke-[1.5]" />
        <circle cx="115" cy="22" r="14" className="fill-emerald-50 stroke-emerald-400 stroke-[1.5]" />
        <text x="45" y="25" className="text-[8px] font-bold fill-amber-700" textAnchor="middle">Tőke</text>
        <text x="115" y="25" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">+ Kamat</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapozó Egyenletek és Szöveges Minták (30 Kérdés)',
    subtitle: 'Mérlegelv, egyszerű szöveges feladványok, keverés, sebesség és pénzügyi alapok',
    questions: [
      {
        id: 'g8-eq-sum-l1-q1',
        title: 'Egyszerű elsőfokú egyenlet',
        question: 'Oldd meg az egyenletet: 3x + 7 = 22',
        options: ['x = 5', 'x = 6', 'x = 4', 'x = 7'],
        correctAnswer: 'x = 5',
        explanation: '3x + 7 = 22 => 3x = 15 => x = 5.'
      },
      {
        id: 'g8-eq-sum-l1-q2',
        title: 'Zárójeles alapfeladat',
        question: 'Oldd meg az egyenletet: 4(x - 2) = 16',
        options: ['x = 6', 'x = 5', 'x = 4', 'x = 8'],
        correctAnswer: 'x = 6',
        explanation: '4(x - 2) = 16 => x - 2 = 4 => x = 6.'
      },
      {
        id: 'g8-eq-sum-l1-q3',
        title: 'Ismeretlen mindkét oldalon',
        question: 'Oldd meg az egyenletet: 2x - 9 = 5x + 3',
        options: ['x = -4', 'x = 4', 'x = -2', 'x = 3'],
        correctAnswer: 'x = -4',
        explanation: '2x - 9 = 5x + 3 => -9 - 3 = 5x - 2x => -12 = 3x => x = -4.'
      },
      {
        id: 'g8-eq-sum-l1-q4',
        title: 'Két szám összege és különbsége',
        question: 'Két szám összege 40, különbsége 12. Mekkora a nagyobbik szám?',
        options: ['26', '24', '28', '22'],
        correctAnswer: '26',
        explanation: 'x + y = 40 és x - y = 12. Összeadva: 2x = 52 => x = 26 (a kisebbik szám 14).'
      },
      {
        id: 'g8-eq-sum-l1-q5',
        title: 'Egymást követő számok',
        question: 'Három egymást követő egész szám összege 45. Melyik a legkisebb szám?',
        options: ['14', '15', '13', '16'],
        correctAnswer: '14',
        explanation: 'x + (x + 1) + (x + 2) = 45 => 3x + 3 = 45 => 3x = 42 => x = 14 (a számok: 14, 15, 16).'
      },
      {
        id: 'g8-eq-sum-l1-q6',
        title: 'Életkoros alapfeladat',
        question: 'Apa most 36 éves, fia 10 éves. Hány év múlva lesz az apa életkora kétszerese fia életkorának?',
        options: ['16 év múlva', '14 év múlva', '12 év múlva', '18 év múlva'],
        correctAnswer: '16 év múlva',
        explanation: '36 + x = 2(10 + x) => 36 + x = 20 + 2x => x = 16. (16 év múlva: apa 52, fia 26).'
      },
      {
        id: 'g8-eq-sum-l1-q7',
        title: 'Kétjegyű szám értéke',
        question: 'Egy kétjegyű számban a tízesek száma 4, az egyesek száma a tízesek duplája. Mi a szám?',
        options: ['48', '84', '42', '24'],
        correctAnswer: '48',
        explanation: 'Tízesek száma 4, egyesek száma 2 · 4 = 8. A szám: 10 · 4 + 8 = 48.'
      },
      {
        id: 'g8-eq-sum-l1-q8',
        title: 'Hígítás tiszta vízzel',
        question: '2 kg 30%-os cukoroldathoz hozzáöntünk 3 kg tiszta vizet. Hány százalékos lesz az új oldat?',
        options: ['12%', '15%', '10%', '18%'],
        correctAnswer: '12%',
        explanation: 'Tiszta cukor: 2 · 30 = 60. Új össztömeg: 2 + 3 = 5 kg. Új töménység: 60 / 5 = 12%.'
      },
      {
        id: 'g8-eq-sum-l1-q9',
        title: 'Két oldat keverése',
        question: '4 kg 15%-os és 6 kg 25%-os sóoldatot összeöntünk. Hány százalékos lesz a keverék?',
        options: ['21%', '20%', '22%', '19%'],
        correctAnswer: '21%',
        explanation: 'Só: 4 · 15 + 6 · 25 = 60 + 150 = 210. Össztömeg: 10 kg. Töménység: 210 / 10 = 21%.'
      },
      {
        id: 'g8-eq-sum-l1-q10',
        title: 'Szembe haladó járművek',
        question: 'Két autó egymással szembe indul 180 km távolságból 40 km/h és 50 km/h sebességgel. Mikor találkoznak?',
        options: ['2 óra múlva', '1,5 óra múlva', '2,5 óra múlva', '3 óra múlva'],
        correctAnswer: '2 óra múlva',
        explanation: 'Együttes közeledési sebesség: 40 + 50 = 90 km/h. Idő: t = 180 / 90 = 2 óra.'
      },
      {
        id: 'g8-eq-sum-l1-q11',
        title: 'Út kiszámítása',
        question: 'Egy gyalogos 4 km/h sebességgel túrázik. Hány kilométert tesz meg 2,5 óra alatt?',
        options: ['10 km', '8 km', '12 km', '9 km'],
        correctAnswer: '10 km',
        explanation: 's = v · t = 4 · 2,5 = 10 km.'
      },
      {
        id: 'g8-eq-sum-l1-q12',
        title: 'Munkavégzés óránkénti része',
        question: 'Egy munkás 6 óra alatt csinál meg egy feladatot. 1 óra alatt a munka mekkora részét végzi el?',
        options: ['1/6 részét', '1/3 részét', '60%-át', '1/5 részét'],
        correctAnswer: '1/6 részét',
        explanation: 'Ha 6 óra alatt a teljes (1) munkát elvégzi, akkor 1 óra alatt az 1/6 részével készül el.'
      },
      {
        id: 'g8-eq-sum-l1-q13',
        title: 'Két azonos munkás',
        question: 'Péter 4 óra alatt, Anna is 4 óra alatt fest ki egyforma szobát. Együtt mennyi idő alatt festik ki a szobát?',
        options: ['2 óra alatt', '4 óra alatt', '1,5 óra alatt', '3 óra alatt'],
        correctAnswer: '2 óra alatt',
        explanation: '1/4 + 1/4 = 2/4 = 1/2. Az együttes idő: 2 óra.'
      },
      {
        id: 'g8-eq-sum-l1-q14',
        title: 'Téglalap hiányzó oldala',
        question: 'Egy téglalap kerülete 30 cm, egyik oldala 6 cm. Mekkora a másik oldala?',
        options: ['9 cm', '12 cm', '8 cm', '10 cm'],
        correctAnswer: '9 cm',
        explanation: 'K = 2(a + b) => 30 = 2(6 + b) => 15 = 6 + b => b = 9 cm.'
      },
      {
        id: 'g8-eq-sum-l1-q15',
        title: 'Háromszög belső szöge',
        question: 'Egy háromszög két belső szöge 50° és 70°. Mekkora a harmadik szöge?',
        options: ['60°', '70°', '50°', '80°'],
        correctAnswer: '60°',
        explanation: 'A belső szögek összege 180°. 180° - 50° - 70° = 60°.'
      },
      {
        id: 'g8-eq-sum-l1-q16',
        title: 'Egyenlő szárú háromszög',
        question: 'Egy egyenlő szárú háromszög alapon fekvő szögei 40°-osak. Mekkora a szárszöge?',
        options: ['100°', '80°', '90°', '110°'],
        correctAnswer: '100°',
        explanation: '180° - 2 · 40° = 180° - 80° = 100°.'
      },
      {
        id: 'g8-eq-sum-l1-q17',
        title: 'Tyúkok és nyulak',
        question: 'Az udvarban tyúkok és nyulak vannak, összesen 10 fej és 28 láb. Hány nyúl van?',
        options: ['4 nyúl', '6 nyúl', '5 nyúl', '3 nyúl'],
        correctAnswer: '4 nyúl',
        explanation: '2t + 4(10 - t) = 28 => 2t + 40 - 4t = 28 => 2t = 12 => t = 6 tyúk, így 10 - 6 = 4 nyúl.'
      },
      {
        id: 'g8-eq-sum-l1-q18',
        title: 'Érmék a perselyben',
        question: 'A perselyben összesen 10 db 20 Ft-os és 50 Ft-os érme van 380 Ft értékben. Hány 50 Ft-os van?',
        options: ['6 db', '4 db', '5 db', '7 db'],
        correctAnswer: '6 db',
        explanation: '20(10 - x) + 50x = 380 => 200 - 20x + 50x = 380 => 30x = 180 => x = 6 db 50 Ft-os.'
      },
      {
        id: 'g8-eq-sum-l1-q19',
        title: 'Leértékelés 20%-kal',
        question: 'Egy 10 000 Ft-os pulóvert 20%-kal leáraztak. Mennyibe kerül most?',
        options: ['8 000 Ft', '8 500 Ft', '7 500 Ft', '9 000 Ft'],
        correctAnswer: '8 000 Ft',
        explanation: '10 000 · 0,80 = 8 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l1-q20',
        title: 'Áremelés 15%-kal',
        question: 'Egy 50 000 Ft-os készülék árát 15%-kal megemelték. Mennyi az új ára?',
        options: ['57 500 Ft', '55 000 Ft', '58 000 Ft', '60 000 Ft'],
        correctAnswer: '57 500 Ft',
        explanation: '50 000 · 1,15 = 57 500 Ft.'
      },
      {
        id: 'g8-eq-sum-l1-q21',
        title: 'Éves kamat',
        question: '100 000 Ft-ot beteszünk a bankba évi 6%-os kamatra 1 évre. Mennyi kamatot kapunk?',
        options: ['6 000 Ft', '600 Ft', '12 000 Ft', '5 000 Ft'],
        correctAnswer: '6 000 Ft',
        explanation: 'Kamat = 100 000 · 0,06 = 6 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l1-q22',
        title: 'Törtes alapfeladat',
        question: 'Oldd meg az egyenletet: x / 4 + 3 = 8',
        options: ['x = 20', 'x = 24', 'x = 16', 'x = 32'],
        correctAnswer: 'x = 20',
        explanation: 'x / 4 = 8 - 3 = 5 => x = 5 · 4 = 20.'
      },
      {
        id: 'g8-eq-sum-l1-q23',
        title: 'Nulla szorzat szabály',
        question: 'Oldd meg az egyenletet: 5(2 - x) = 0',
        options: ['x = 2', 'x = 0', 'x = -2', 'x = 5'],
        correctAnswer: 'x = 2',
        explanation: 'Egy szorzat akkor 0, ha valamelyik tényezője 0. 2 - x = 0 => x = 2.'
      },
      {
        id: 'g8-eq-sum-l1-q24',
        title: 'Tört rész visszafejtése',
        question: 'Egy szám harmada 15. Mi az eredeti szám?',
        options: ['45', '30', '5', '60'],
        correctAnswer: '45',
        explanation: 'x / 3 = 15 => x = 45.'
      },
      {
        id: 'g8-eq-sum-l1-q25',
        title: 'Anya és kislánya',
        question: 'Anya most 32 éves, kislánya 4 éves. Hány év múlva lesz anya pontosan háromszor annyi idős, mint lánya?',
        options: ['10 év múlva', '8 év múlva', '12 év múlva', '14 év múlva'],
        correctAnswer: '10 év múlva',
        explanation: '32 + x = 3(4 + x) => 32 + x = 12 + 3x => 20 = 2x => x = 10. (Anya 42, lánya 14).'
      },
      {
        id: 'g8-eq-sum-l1-q26',
        title: 'Eredeti ár akcióból',
        question: '30%-os leárazás után egy könyv 2100 Ft-ba kerül. Mennyi volt az eredeti ára?',
        options: ['3 000 Ft', '2 800 Ft', '2 700 Ft', '3 500 Ft'],
        correctAnswer: '3 000 Ft',
        explanation: '0,70 · x = 2100 => x = 2100 / 0,70 = 3 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l1-q27',
        title: 'Két szám aránya',
        question: 'Két szám aránya 3 : 5, összegük 64. Mekkora a kisebbik szám?',
        options: ['24', '40', '18', '20'],
        correctAnswer: '24',
        explanation: '3x + 5x = 64 => 8x = 64 => x = 8. Kisebbik szám: 3 · 8 = 24.'
      },
      {
        id: 'g8-eq-sum-l1-q28',
        title: 'Féléves kamat',
        question: '200 000 Ft betét után évi 8%-os kamatláb mellett fél évre mennyi kamat jár?',
        options: ['8 000 Ft', '16 000 Ft', '4 000 Ft', '10 000 Ft'],
        correctAnswer: '8 000 Ft',
        explanation: 'Éves kamat 16 000 Ft. Fél évre (t = 0,5): 16 000 · 0,5 = 8 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l1-q29',
        title: 'Azonosság felismerése',
        question: 'Hány megoldása van a 2(x + 3) = 2x + 6 egyenletnek a valós számok halmazán?',
        options: ['Végtelen sok (minden valós szám)', 'Nincs megoldása', 'Pontosan 1 megoldása van', 'Pontosan 2 megoldása van'],
        correctAnswer: 'Végtelen sok (minden valós szám)',
        explanation: '2x + 6 = 2x + 6 => 0 · x = 0, minden valós számra igaz.'
      },
      {
        id: 'g8-eq-sum-l1-q30',
        title: 'Ellentmondás felismerése',
        question: 'Oldd meg az egyenletet: 3x + 1 = 3x + 5',
        options: ['Nincs megoldása (ellentmondás)', 'x = 4', 'x = 0', 'Minden valós szám megoldás'],
        correctAnswer: 'Nincs megoldása (ellentmondás)',
        explanation: '3x levonásával 1 = 5 adódik, ami lehetetlen, tehát nincs megoldás (x ∈ ∅).'
      }
    ]
  },
  2: {
    title: '2. Szint: Középhaladó és Gyakorlati Szöveges Modellek (30 Kérdés)',
    subtitle: 'Zárójeles és törtes rendezések, kikötések, kétlépcsős feladatok és geometriai arányok',
    questions: [
      {
        id: 'g8-eq-sum-l2-q1',
        title: 'Összetett zárójeles egyenlet',
        question: 'Oldd meg az egyenletet: 3(2x - 4) - 2(x + 1) = 14',
        options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
        correctAnswer: 'x = 7',
        explanation: '6x - 12 - 2x - 2 = 14 => 4x - 14 = 14 => 4x = 28 => x = 7.'
      },
      {
        id: 'g8-eq-sum-l2-q2',
        title: 'Törtes egyenlet közös nevezővel',
        question: 'Oldd meg az egyenletet: (x + 2)/3 + (x - 1)/2 = 6',
        options: ['x = 7', 'x = 8', 'x = 6', 'x = 5'],
        correctAnswer: 'x = 7',
        explanation: 'Beszorozva 6-tal: 2(x + 2) + 3(x - 1) = 36 => 2x + 4 + 3x - 3 = 36 => 5x + 1 = 36 => 5x = 35 => x = 7.'
      },
      {
        id: 'g8-eq-sum-l2-q3',
        title: 'Kikötés törtes egyenletnél',
        question: 'Oldd meg az egyenletet: 15 / (x - 2) = 3',
        options: ['x = 7 (kikötés: x ≠ 2)', 'x = 5 (kikötés: x ≠ 2)', 'x = 2 (nincs kikötés)', 'Nincs megoldás'],
        correctAnswer: 'x = 7 (kikötés: x ≠ 2)',
        explanation: 'Kikötés: x ≠ 2. 15 = 3(x - 2) => 15 = 3x - 6 => 3x = 21 => x = 7.'
      },
      {
        id: 'g8-eq-sum-l2-q4',
        title: 'Kétjegyű szám felcserélése',
        question: 'Egy kétjegyű szám jegyeinek összege 12. Ha a számjegyeket felcseréljük, 18-cal nagyobb számot kapunk. Mi a szám?',
        options: ['57', '75', '48', '39'],
        correctAnswer: '57',
        explanation: 'A szám 57 (5 + 7 = 12). Felcserélve 75. 75 - 57 = 18.'
      },
      {
        id: 'g8-eq-sum-l2-q5',
        title: 'Testvérek életkora',
        question: 'Két testvér életkorának összege 28. Négy év múlva az idősebb pontosan kétszer annyi idős lesz, mint a fiatalabb. Hány éves most az idősebb testvér?',
        options: ['20 éves', '18 éves', '16 éves', '22 éves'],
        correctAnswer: '20 éves',
        explanation: 'Legyen a fiatalabb x, az idősebb 28 - x. 4 év múlva: (28 - x + 4) = 2(x + 4) => 32 - x = 2x + 8 => 3x = 24 => x = 8. Az idősebb 28 - 8 = 20 éves.'
      },
      {
        id: 'g8-eq-sum-l2-q6',
        title: 'Hígítási egyenlet',
        question: '6 kg 40%-os sóoldathoz hány kg vizet kell önteni, hogy 24%-os sóoldatot kapjunk?',
        options: ['4 kg', '3 kg', '5 kg', '2 kg'],
        correctAnswer: '4 kg',
        explanation: 'Só: 6 · 40 = 240. 240 / (6 + x) = 24 => 240 = 24(6 + x) => 10 = 6 + x => x = 4 kg.'
      },
      {
        id: 'g8-eq-sum-l2-q7',
        title: 'Töményítés magasabb százalékú oldattal',
        question: '5 kg 10%-os és x kg 30%-os alkohololdatot összeöntve 25%-os oldat keletkezik. Mennyi x?',
        options: ['15 kg', '10 kg', '12 kg', '20 kg'],
        correctAnswer: '15 kg',
        explanation: '5 · 10 + 30x = 25(5 + x) => 50 + 30x = 125 + 25x => 5x = 75 => x = 15 kg.'
      },
      {
        id: 'g8-eq-sum-l2-q8',
        title: 'Ötvözet dúsítása tiszta fémmel',
        question: '400 g 50%-os rézötvözethez hány g tiszta rezet (100%) kell olvasztani, hogy 80%-os ötvözetet kapjunk?',
        options: ['600 g', '500 g', '400 g', '800 g'],
        correctAnswer: '600 g',
        explanation: '400 · 50 + 100x = 80(400 + x) => 20 000 + 100x = 32 000 + 80x => 20x = 12 000 => x = 600 g.'
      },
      {
        id: 'g8-eq-sum-l2-q9',
        title: 'Utolérési feladat időelőnnyel',
        question: 'Egy motoros 60 km/h-val elindul. 30 perc múlva egy autó ered a nyomába 80 km/h-val. Mennyi idő múlva éri utol az autó?',
        options: ['1,5 óra múlva', '1 óra múlva', '2 óra múlva', '2,5 óra múlva'],
        correctAnswer: '1,5 óra múlva',
        explanation: 'A motoros előnye 30 perc (0,5 h) alatt: 60 · 0,5 = 30 km. Sebességkülönbség: 80 - 60 = 20 km/h. Utolérési idő: t = 30 / 20 = 1,5 óra.'
      },
      {
        id: 'g8-eq-sum-l2-q10',
        title: 'Két autó távolsága találkozás előtt',
        question: 'Két város távolsága 260 km. Szembe indul két autó 60 km/h és 70 km/h sebességgel. Mennyi idő múlva lesznek még 65 km-re egymástól?',
        options: ['1,5 óra múlva', '1 óra múlva', '2 óra múlva', '1,25 óra múlva'],
        correctAnswer: '1,5 óra múlva',
        explanation: 'Megteendő közös út: 260 - 65 = 195 km. Együttes sebesség: 60 + 70 = 130 km/h. t = 195 / 130 = 1,5 óra.'
      },
      {
        id: 'g8-eq-sum-l2-q11',
        title: 'Két csap együttes ideje',
        question: 'Egy medencét az egyik csap 6 óra, a másik 12 óra alatt tölt meg. Mennyi idő alatt töltik meg együtt?',
        options: ['4 óra', '3 óra', '5 óra', '4,5 óra'],
        correctAnswer: '4 óra',
        explanation: '1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 => t = 4 óra.'
      },
      {
        id: 'g8-eq-sum-l2-q12',
        title: 'Töltőcsap és lefolyó együtt',
        question: 'A csap 10 perc alatt tölti meg a kádat, a lefolyó 15 perc alatt üríti ki. Nyitott lefolyóval mennyi idő alatt telik meg?',
        options: ['30 perc', '25 perc', '20 perc', '35 perc'],
        correctAnswer: '30 perc',
        explanation: '1/10 - 1/15 = 3/30 - 2/30 = 1/30 => t = 30 perc.'
      },
      {
        id: 'g8-eq-sum-l2-q13',
        title: 'Téglalap oldalai területtel',
        question: 'Egy téglalap oldalainak aránya 3 : 4, területe 108 cm². Mekkora a téglalap kerülete?',
        options: ['42 cm', '48 cm', '36 cm', '54 cm'],
        correctAnswer: '42 cm',
        explanation: 'Oldalak 3x és 4x. Terület: 3x · 4x = 12x² = 108 => x² = 9 => x = 3 cm. Oldalak: 9 cm és 12 cm. Kerület: 2(9 + 12) = 42 cm.'
      },
      {
        id: 'g8-eq-sum-l2-q14',
        title: 'Derékszögű háromszög szögei',
        question: 'Egy derékszögű háromszög egyik hegyesszöge 20°-kal nagyobb a másiknál. Mekkora a nagyobb hegyesszög?',
        options: ['55°', '65°', '50°', '60°'],
        correctAnswer: '55°',
        explanation: 'α + (α + 20°) = 90° => 2α = 70° => α = 35°. A nagyobb hegyesszög: 35° + 20° = 55°.'
      },
      {
        id: 'g8-eq-sum-l2-q15',
        title: 'Szárszög aránya az alapon fekvőhöz',
        question: 'Egyenlő szárú háromszög szárszöge fele az alapon fekvő szögnek. Mekkora a szárszög?',
        options: ['36°', '45°', '30°', '40°'],
        correctAnswer: '36°',
        explanation: 'Alapon fekvő szög: 2x, szárszög: x. x + 2x + 2x = 180° => 5x = 180° => x = 36°.'
      },
      {
        id: 'g8-eq-sum-l2-q16',
        title: 'Színházjegyek eladása',
        question: 'Egy színházba 100 jegyet adtak el 190 000 Ft-ért. A diákjegy 1500 Ft, a felnőttjegy 2500 Ft. Hány diákjegyet adtak el?',
        options: ['60 diákjegy', '40 diákjegy', '50 diákjegy', '55 diákjegy'],
        correctAnswer: '60 diákjegy',
        explanation: '1500d + 2500(100 - d) = 190 000 => 1500d + 250 000 - 2500d = 190 000 => 1000d = 60 000 => d = 60 diákjegy.'
      },
      {
        id: 'g8-eq-sum-l2-q17',
        title: 'Padok és diákok',
        question: 'Ha 3 diák ül padonként, 4 diák állva marad; ha 4 diák ül padonként, 2 pad üresen marad. Hány diák van?',
        options: ['40 diák', '36 diák', '44 diák', '48 diák'],
        correctAnswer: '40 diák',
        explanation: 'Legyen p a padok száma: 3p + 4 = 4(p - 2) => 3p + 4 = 4p - 8 => p = 12 pad. Diákok: 3 · 12 + 4 = 40 diák.'
      },
      {
        id: 'g8-eq-sum-l2-q18',
        title: 'Kétlépcsős árváltozás',
        question: 'Egy cipő árát 20%-kal megemelték, majd az új árat 20%-kal leértékelték. Hogyan változott a végső ár az eredetihez képest?',
        options: ['4%-kal csökkent', 'Változatlan maradt', '2%-kal csökkent', '4%-kal nőtt'],
        correctAnswer: '4%-kal csökkent',
        explanation: 'x · 1,20 · 0,80 = 0,96x => 4%-os csökkenés.'
      },
      {
        id: 'g8-eq-sum-l2-q19',
        title: 'Leárazás utáni kompenzáció',
        question: 'Egy termék ára 25%-kal csökkent. Hány százalékkal kell megemelni az új árat az eredeti ár visszaállításához?',
        options: ['33,3%-kal (33 és 1/3 %)', '25%-kal', '30%-kal', '20%-kal'],
        correctAnswer: '33,3%-kal (33 és 1/3 %)',
        explanation: '0,75 · q = 1 => q = 1 / 0,75 = 4/3 ≈ 1,3333 => 33,3%-os emelés kell.'
      },
      {
        id: 'g8-eq-sum-l2-q20',
        title: 'Nettó ár bruttósítása',
        question: 'Egy szerszámgép nettó ára 80 000 Ft. Mennyi a bruttó fogyasztói ára 27% ÁFA-val?',
        options: ['101 600 Ft', '100 000 Ft', '102 400 Ft', '98 000 Ft'],
        correctAnswer: '101 600 Ft',
        explanation: '80 000 · 1,27 = 101 600 Ft.'
      },
      {
        id: 'g8-eq-sum-l2-q21',
        title: 'Bruttó árból nettó',
        question: 'Egy laptop bruttó ára 127 000 Ft (27% ÁFA mellett). Mennyi a nettó ára?',
        options: ['100 000 Ft', '95 000 Ft', '105 000 Ft', '92 710 Ft'],
        correctAnswer: '100 000 Ft',
        explanation: '127 000 / 1,27 = 100 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l2-q22',
        title: 'Időarányos kamat 8 hónapra',
        question: '400 000 Ft betét után évi 9%-os kamatláb mellett 8 hónapra mennyi kamat vehető fel?',
        options: ['24 000 Ft', '36 000 Ft', '18 000 Ft', '27 000 Ft'],
        correctAnswer: '24 000 Ft',
        explanation: 'A futamidő: 8/12 = 2/3 év. Kamat: 400 000 · 0,09 · (2/3) = 36 000 · 2/3 = 24 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l2-q23',
        title: 'Törtes előjelváltás',
        question: 'Oldd meg az egyenletet: (2x - 3)/5 - (x - 1)/2 = 1',
        options: ['x = -11', 'x = 11', 'x = -9', 'x = 7'],
        correctAnswer: 'x = -11',
        explanation: 'Beszorozva 10-zel: 2(2x - 3) - 5(x - 1) = 10 => 4x - 6 - 5x + 5 = 10 => -x - 1 = 10 => -x = 11 => x = -11.'
      },
      {
        id: 'g8-eq-sum-l2-q24',
        title: 'Két szám kapcsolata',
        question: 'Két szám összege 74. Az egyik 5-tel nagyobb a másik kétszeresénél. Melyik a nagyobb szám?',
        options: ['51', '23', '49', '53'],
        correctAnswer: '51',
        explanation: 'x + (2x + 5) = 74 => 3x = 69 => x = 23. A nagyobbik szám: 2 · 23 + 5 = 51.'
      },
      {
        id: 'g8-eq-sum-l2-q25',
        title: 'Törtrész szöveges egyenletben',
        question: 'Egy regény 1/3-át elolvastam hétfőn, 2/5-ét kedden, és maradt még 32 oldal. Hány oldalas a regény?',
        options: ['120 oldal', '150 oldal', '100 oldal', '140 oldal'],
        correctAnswer: '120 oldal',
        explanation: 'Elolvasott rész: 1/3 + 2/5 = 5/15 + 6/15 = 11/15. Maradt: 4/15 rész. (4/15)x = 32 => x = 32 · 15 / 4 = 120 oldal.'
      },
      {
        id: 'g8-eq-sum-l2-q26',
        title: 'Fordított arányosság',
        question: '3 munkás 12 nap alatt ás ki egy árkot. Hány nap alatt végezne ugyanazzal a munkával 4 munkás azonos tempóban?',
        options: ['9 nap alatt', '8 nap alatt', '10 nap alatt', '16 nap alatt'],
        correctAnswer: '9 nap alatt',
        explanation: 'Összes munkanap: 3 · 12 = 36 munkanap. 4 munkás esetén: 36 / 4 = 9 nap.'
      },
      {
        id: 'g8-eq-sum-l2-q27',
        title: 'Trapéz területe',
        question: 'Egy trapéz párhuzamos oldalai 8 cm és 14 cm, magassága 6 cm. Mekkora a területe?',
        options: ['66 cm²', '132 cm²', '60 cm²', '72 cm²'],
        correctAnswer: '66 cm²',
        explanation: 'T = (a + c) / 2 · m = (8 + 14) / 2 · 6 = 11 · 6 = 66 cm².'
      },
      {
        id: 'g8-eq-sum-l2-q28',
        title: 'Kereskedői haszon visszaszámolása',
        question: 'Egy kereskedő 30%-os haszonnal adott el egy kabátot 65 000 Ft-ért. Mennyi volt a beszerzési ára?',
        options: ['50 000 Ft', '45 500 Ft', '52 000 Ft', '48 000 Ft'],
        correctAnswer: '50 000 Ft',
        explanation: 'Beszerzési ár · 1,30 = 65 000 => Beszerzési ár = 65 000 / 1,30 = 50 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l2-q29',
        title: 'Azonosság algebrai levezetése',
        question: 'Oldd meg az egyenletet: 6(x - 2) + 4 = 2(3x - 4)',
        options: ['Minden valós szám megoldás (x ∈ ℝ)', 'Nincs megoldás (x ∈ ∅)', 'x = 0', 'x = 2'],
        correctAnswer: 'Minden valós szám megoldás (x ∈ ℝ)',
        explanation: '6x - 12 + 4 = 6x - 8 => 6x - 8 = 6x - 8 => 0x = 0, azonosság.'
      },
      {
        id: 'g8-eq-sum-l2-q30',
        title: 'Ellentmondás törtes levezetéssel',
        question: 'Oldd meg az egyenletet: (3x + 1)/4 = (6x + 5)/8',
        options: ['Nincs megoldás (ellentmondás)', 'Minden valós szám megoldás', 'x = 1', 'x = 0'],
        correctAnswer: 'Nincs megoldás (ellentmondás)',
        explanation: 'Beszorozva 8-cal: 2(3x + 1) = 6x + 5 => 6x + 2 = 6x + 5 => 2 = 5, ellentmondás.'
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó Felvételi & Mesterfokú Kihívások (30 Kérdés)',
    subtitle: 'Összetett felvételi típusú szöveges egyenletek, mozgások, ötvözetek és egyenletrendszerek',
    questions: [
      {
        id: 'g8-eq-sum-l3-q1',
        title: 'Haladó zárójeles mérlegelv',
        question: 'Oldd meg az egyenletet: 5(2x - 3) - 2(3x - 7) = 3(x + 4) - 7',
        options: ['x = 6', 'x = 5', 'x = 8', 'x = 4'],
        correctAnswer: 'x = 6',
        explanation: '10x - 15 - 6x + 14 = 3x + 12 - 7 => 4x - 1 = 3x + 5 => x = 6.'
      },
      {
        id: 'g8-eq-sum-l3-q2',
        title: 'Törtes azonosság kikötéssel',
        question: 'Oldd meg az egyenletet: (x + 3)/(x - 2) - 1 = 5/(x - 2)',
        options: ['Minden x ∈ ℝ, kivéve x = 2', 'Minden valós szám (x ∈ ℝ)', 'x = 2', 'Nincs megoldás'],
        correctAnswer: 'Minden x ∈ ℝ, kivéve x = 2',
        explanation: 'Kikötés: x ≠ 2. Beszorozva (x - 2)-vel: x + 3 - (x - 2) = 5 => 5 = 5. Azonosság, de x ≠ 2 kikötés miatt az x = 2 nem lehet megoldás!'
      },
      {
        id: 'g8-eq-sum-l3-q3',
        title: 'Számjegyek összege és cseréje',
        question: 'Egy kétjegyű szám számjegyeinek összege 10. Ha felcseréljük a jegyeket, és az új számhoz hozzáadjuk az eredetit, 110-et kapunk. Ha a tízesek száma 4-gyel nagyobb az egyesekénél, mi a szám?',
        options: ['73', '82', '64', '95'],
        correctAnswer: '73',
        explanation: 'a + b = 10 és a - b = 4 => 2a = 14 => a = 7, b = 3. A szám a 73.'
      },
      {
        id: 'g8-eq-sum-l3-q4',
        title: 'Életkori arány a múltban és most',
        question: 'Apa most 3-szor annyi idős, mint a fia. 12 évvel ezelőtt 6-szor annyi idős volt, mint a fia. Hány éves most az apa?',
        options: ['60 éves', '45 éves', '54 éves', '48 éves'],
        correctAnswer: '60 éves',
        explanation: 'Apa most 3f. 12 éve: 3f - 12 = 6(f - 12) => 3f - 12 = 6f - 72 => 3f = 60 => f = 20 éves a fiú, az apa 3 · 20 = 60 éves.'
      },
      {
        id: 'g8-eq-sum-l3-q5',
        title: 'Két oldat arányos keverése',
        question: 'Hány kg 10%-os és hány kg 40%-os oldatot kell összekeverni, hogy 60 kg 25%-os oldatot kapjunk?',
        options: ['30 kg 10%-os és 30 kg 40%-os', '20 kg 10%-os és 40 kg 40%-os', '25 kg 10%-os és 35 kg 40%-os', '40 kg 10%-os és 20 kg 40%-os'],
        correctAnswer: '30 kg 10%-os és 30 kg 40%-os',
        explanation: '10x + 40(60 - x) = 25 · 60 => 10x + 2400 - 40x = 1500 => 30x = 900 => x = 30 kg mindkettőből.'
      },
      {
        id: 'g8-eq-sum-l3-q6',
        title: 'Víz elpárologtatása',
        question: '12 kg 70%-os rézötvözetből (vagy sóoldatból) mennyi tiszta anyagot/vizet kell kivonni, hogy 84%-os töménységű maradjon?',
        options: ['2 kg', '1,5 kg', '3 kg', '2,5 kg'],
        correctAnswer: '2 kg',
        explanation: 'Tiszta anyag: 12 · 70 = 840. Új tömeg: 840 / (12 - x) = 84 => 12 - x = 10 => x = 2 kg.'
      },
      {
        id: 'g8-eq-sum-l3-q7',
        title: 'Körpályán futók',
        question: 'Egy 600 m-es körpályán két futó egy helyről indul. Ellentétes irányban 2 percenként találkoznak, azonos irányban a gyorsabb 10 percenként körözi le a lassabbat. Mekkora a gyorsabb futó sebessége?',
        options: ['200 m/perc', '180 m/perc', '220 m/perc', '150 m/perc'],
        correctAnswer: '200 m/perc',
        explanation: 'v₁ + v₂ = 600 / 2 = 300 m/min és v₁ - v₂ = 600 / 10 = 60 m/min. Összeadva: 2v₁ = 360 => v₁ = 200 m/min (a lassabb 100 m/min).'
      },
      {
        id: 'g8-eq-sum-l3-q8',
        title: 'Folyami hajózás sodrással',
        question: 'Egy motorcsónak a folyón lefelé 24 km/h-val halad, folyásnak felfelé 16 km/h-val. Mekkora a folyó sodrási sebessége?',
        options: ['4 km/h', '3 km/h', '5 km/h', '2 km/h'],
        correctAnswer: '4 km/h',
        explanation: 'v_hajó + v_folyó = 24 és v_hajó - v_folyó = 16. Kivonva: 2v_folyó = 8 => v_folyó = 4 km/h.'
      },
      {
        id: 'g8-eq-sum-l3-q9',
        title: 'Három csap együttes ideje',
        question: 'Három csap együtt 2 óra alatt tölti meg a medencét. Az 1. csap egyedül 6 óra, a 2. csap egyedül 8 óra alatt töltené meg. Mennyi idő alatt töltené meg a 3. csap egyedül?',
        options: ['4,8 óra (4 óra 48 perc)', '5 óra', '4,5 óra', '5,2 óra'],
        correctAnswer: '4,8 óra (4 óra 48 perc)',
        explanation: '1/6 + 1/8 + 1/x = 1/2 => 1/x = 12/24 - 4/24 - 3/24 = 5/24 => x = 24 / 5 = 4,8 óra = 4 óra 48 perc.'
      },
      {
        id: 'g8-eq-sum-l3-q10',
        title: 'Páros munkavégzések',
        question: 'A és B együtt 12 nap, B és C együtt 15 nap, A és C együtt 20 nap alatt végez el egy munkát. Mennyi idő alatt végeznének hárman együtt?',
        options: ['10 nap alatt', '8 nap alatt', '12 nap alatt', '9 nap alatt'],
        correctAnswer: '10 nap alatt',
        explanation: '2(A + B + C) = 1/12 + 1/15 + 1/20 = (5 + 4 + 3)/60 = 12/60 = 1/5 => A + B + C = 1/10 => együttesen 10 nap kell.'
      },
      {
        id: 'g8-eq-sum-l3-q11',
        title: 'Derékszögű háromszög területe',
        question: 'Egy derékszögű háromszög átfogója 25 cm, befogóinak aránya 3 : 4. Mekkora a területe?',
        options: ['150 cm²', '300 cm²', '120 cm²', '180 cm²'],
        correctAnswer: '150 cm²',
        explanation: '(3x)² + (4x)² = 25² => 25x² = 625 => x² = 25 => x = 5 cm. Befogók: 15 cm és 20 cm. Terület: (15 · 20) / 2 = 150 cm².'
      },
      {
        id: 'g8-eq-sum-l3-q12',
        title: 'Rombusz területe átlókból',
        question: 'Egy rombusz kerülete 40 cm, egyik átlója 12 cm. Mekkora a területe?',
        options: ['96 cm²', '120 cm²', '84 cm²', '108 cm²'],
        correctAnswer: '96 cm²',
        explanation: 'Oldal: a = 40 / 4 = 10 cm. Félátló: e/2 = 6 cm. Másik félátló: √(10² - 6²) = 8 cm => másik átló f = 16 cm. T = (12 · 16) / 2 = 96 cm².'
      },
      {
        id: 'g8-eq-sum-l3-q13',
        title: 'Kirándulás költségvetése',
        question: 'Egy csoportkiránduláson ha mindenki 1500 Ft-ot fizet, 6000 Ft hiányzik a buszra; ha 1800 Ft-ot fizetnek, 3000 Ft maradék lesz. Hányan mentek kirándulni?',
        options: ['30 fő', '25 fő', '35 fő', '28 fő'],
        correctAnswer: '30 fő',
        explanation: '1500x + 6000 = 1800x - 3000 => 300x = 9000 => x = 30 fő.'
      },
      {
        id: 'g8-eq-sum-l3-q14',
        title: 'Tesztpontozás levonással',
        question: 'Egy 30 kérdéses teszten minden jó válasz +4 pont, rossz válasz -2 pont. Egy diák minden kérdésre válaszolt és 78 pontot ért el. Hány jó válasza volt?',
        options: ['23 jó válasz', '22 jó válasz', '24 jó válasz', '21 jó válasz'],
        correctAnswer: '23 jó válasz',
        explanation: '4j - 2(30 - j) = 78 => 4j - 60 + 2j = 78 => 6j = 138 => j = 23 jó válasz.'
      },
      {
        id: 'g8-eq-sum-l3-q15',
        title: 'Kétlépcsős leértékelés visszafejtése',
        question: 'Egy kabát árát előbb 20%-kal, majd további 25%-kal csökkentették, így 18 000 Ft lett. Mennyi volt az eredeti ára?',
        options: ['30 000 Ft', '32 000 Ft', '28 000 Ft', '35 000 Ft'],
        correctAnswer: '30 000 Ft',
        explanation: '0,80 · 0,75 · x = 18 000 => 0,60x = 18 000 => x = 30 000 Ft.'
      },
      {
        id: 'g8-eq-sum-l3-q16',
        title: 'Azonos duplázódó emelés',
        question: 'Egy árucikk ára egymás után kétszer nőtt ugyanazzal a p%-kal. 10 000 Ft-ról 12 100 Ft-ra nőtt. Hány % volt a p?',
        options: ['10%', '10,5%', '11%', '9%'],
        correctAnswer: '10%',
        explanation: '10 000 · q² = 12 100 => q² = 1,21 => q = 1,10 => p = 10%.'
      },
      {
        id: 'g8-eq-sum-l3-q17',
        title: 'Kamatláb visszaszámolása',
        question: '1 500 000 Ft betét után 9 hónap elteltével 78 750 Ft egyszerű kamatot fizettek ki. Mekkora volt az éves kamatláb?',
        options: ['7%', '6,5%', '7,5%', '8%'],
        correctAnswer: '7%',
        explanation: 'Futamidő: 9/12 = 0,75 év. 78 750 = (1 500 000 · p · 0,75) / 100 = 11 250 · p => p = 78 750 / 11 250 = 7%.'
      },
      {
        id: 'g8-eq-sum-l3-q18',
        title: 'Két betét azonos kamata',
        question: '1 000 000 Ft tőkét osztunk szét: az egyik rész évi 6%-os, a másik évi 9%-os kamatra kerül. 1 év múlva mindkét betét PONTOSAN UGYANANNYI kamatot hoz! Mennyi tőkét tettünk a 9%-os számlára?',
        options: ['400 000 Ft-ot', '600 000 Ft-ot', '500 000 Ft-ot', '450 000 Ft-ot'],
        correctAnswer: '400 000 Ft-ot',
        explanation: '0,09x = 0,06(1 000 000 - x) => 0,15x = 60 000 => x = 400 000 Ft (mindkettő kamata 36 000 Ft).'
      },
      {
        id: 'g8-eq-sum-l3-q19',
        title: 'Egyenlő szárú háromszög kerülete',
        question: 'Egyenlő szárú háromszög kerülete 36 cm. Alapja 6 cm-rel rövidebb a száránál. Mekkorák a szárak?',
        options: ['14 cm', '12 cm', '15 cm', '10 cm'],
        correctAnswer: '14 cm',
        explanation: 'Szárak: x, alap: x - 6. x + x + (x - 6) = 36 => 3x = 42 => x = 14 cm (alap: 8 cm).'
      },
      {
        id: 'g8-eq-sum-l3-q20',
        title: 'Többtagú törtes egyenlet',
        question: 'Oldd meg az egyenletet: (2x - 1)/3 - (3x + 2)/4 = (x - 5)/6',
        options: ['x = 0', 'x = 1', 'x = -1', 'x = 2'],
        correctAnswer: 'x = 0',
        explanation: 'Beszorozva 12-vel: 4(2x - 1) - 3(3x + 2) = 2(x - 5) => 8x - 4 - 9x - 6 = 2x - 10 => -x - 10 = 2x - 10 => 3x = 0 => x = 0.'
      },
      {
        id: 'g8-eq-sum-l3-q21',
        title: 'Számjegyek szorzata feladvány',
        question: 'Egy kétjegyű szám kétszer akkora, mint számjegyeinek szorzata. A tízesek száma 2-vel nagyobb az egyesekénél. Melyik ez a szám?',
        options: ['36', '42', '24', '64'],
        correctAnswer: '36',
        explanation: 'Tízes: a, egyes: b. 36 esetén a = 3, b = 6 (3 · 6 = 18; 2 · 18 = 36).'
      },
      {
        id: 'g8-eq-sum-l3-q22',
        title: 'Apa és fia két időpontban',
        question: '4 éve az apa 4-szer annyi idős volt, mint a fia. 6 év múlva már csak 2,5-szer annyi idős lesz. Hány éves most az apa?',
        options: ['44 éves', '40 éves', '48 éves', '42 éves'],
        correctAnswer: '44 éves',
        explanation: 'Apa most A, fia F. A - 4 = 4(F - 4) és A + 6 = 2,5(F + 6). Megoldva: F = 14, A = 44 év.'
      },
      {
        id: 'g8-eq-sum-l3-q23',
        title: 'Töményítés vízlepárlással',
        question: 'Mennyi vizet kell elpárologtatni 20 kg 15%-os sóoldatból, hogy 25%-os sóoldatot kapjunk?',
        options: ['8 kg', '6 kg', '10 kg', '5 kg'],
        correctAnswer: '8 kg',
        explanation: 'Só: 20 · 0,15 = 3 kg. 3 / (20 - x) = 0,25 => 20 - x = 12 => x = 8 kg.'
      },
      {
        id: 'g8-eq-sum-l3-q24',
        title: 'Vonat elhaladása oszlop mellett',
        question: 'Egy 72 km/h sebességgel robogó vonat 15 másodperc alatt halad el egy vasúti pózna mellett. Milyen hosszú a vonat?',
        options: ['300 m', '250 m', '360 m', '200 m'],
        correctAnswer: '300 m',
        explanation: '72 km/h = 72 / 3,6 = 20 m/s. Hossz: s = v · t = 20 · 15 = 300 m.'
      },
      {
        id: 'g8-eq-sum-l3-q25',
        title: 'Vonat áthaladása alagúton',
        question: 'Ugyanez a 300 m hosszú, 72 km/h sebességű vonat mennyi idő alatt halad át teljesen egy 500 m hosszú alagúton?',
        options: ['40 másodperc', '35 másodperc', '45 másodperc', '30 másodperc'],
        correctAnswer: '40 másodperc',
        explanation: 'A teljes megteendő távolság az alagút és a vonat hosszának összege: 500 + 300 = 800 m. v = 20 m/s => t = 800 / 20 = 40 másodperc.'
      },
      {
        id: 'g8-eq-sum-l3-q26',
        title: 'Lépcsőfokok feladványa',
        question: 'A lépcsőn felfelé haladva ha kettesével lépünk, 7-tel több lépés szükséges, mintha hármasával lépnénk. Hány lépcsőfokból áll a lépcsősor?',
        options: ['42 fok', '36 fok', '48 fok', '30 fok'],
        correctAnswer: '42 fok',
        explanation: 'x/2 - x/3 = 7 => 3x/6 - 2x/6 = 7 => x/6 = 7 => x = 42 lépcsőfok.'
      },
      {
        id: 'g8-eq-sum-l3-q27',
        title: 'Haszon és akció egyensúlya',
        question: 'Egy boltos a beszerzési árat 50%-kal megemelte, majd a magas árból 30% kedvezményt adott. Hány százalék haszna maradt a beszerzési árhoz képest?',
        options: ['5% haszon', '20% haszon', '10% haszon', '15% haszon'],
        correctAnswer: '5% haszon',
        explanation: '1,50 · 0,70 = 1,05 => 5% tiszta haszon maradt.'
      },
      {
        id: 'g8-eq-sum-l3-q28',
        title: 'Áremelés visszafordítása',
        question: 'Egy termék ára 40%-kal emelkedett. Hány százalékkal kell csökkenteni a megemelt árat, hogy újra az eredeti árat kapjuk (kerekítve)?',
        options: ['28,57%', '40,00%', '30,00%', '25,00%'],
        correctAnswer: '28,57%',
        explanation: '1,40 · (1 - x/100) = 1 => 1 - x/100 = 1 / 1,40 ≈ 0,7143 => x ≈ 28,57%.'
      },
      {
        id: 'g8-eq-sum-l3-q29',
        title: 'Abszolút érték kikötése',
        question: 'Hány valós gyöke van az |x - 3| = -2 egyenletnek?',
        options: ['0 (nincs megoldás)', '1', '2', 'Végtelen sok'],
        correctAnswer: '0 (nincs megoldás)',
        explanation: 'Bármely valós szám abszolút értéke nemnegatív (|k| ≥ 0), így sosem lehet egyenlő negatív számmal (-2).'
      },
      {
        id: 'g8-eq-sum-l3-q30',
        title: 'Kétismeretlenes egyenletrendszer',
        question: 'Oldd meg az egyenletrendszert: 3x + 2y = 19 és 2x + 5y = 20. Mekkora az x értéke?',
        options: ['x = 5 (y = 2)', 'x = 4 (y = 3)', 'x = 3 (y = 5)', 'x = 6 (y = 1)'],
        correctAnswer: 'x = 5 (y = 2)',
        explanation: '1. egyenlet · 5: 15x + 10y = 95. 2. egyenlet · 2: 4x + 10y = 40. Kivonva: 11x = 55 => x = 5, y = (19 - 15) / 2 = 2.'
      }
    ]
  }
};

export const Chapter3EquationsSummaryQuiz: React.FC<Chapter3EquationsSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="III. Fejezet: Egyenletek Témazáró Kvíz"
      subtitle="Teljes összefoglaló teszt az összes egyenlet- és szöveges feladattípusból 3 szinten, 90 feladattal!"
      badge="FEJEZETI TÉMAZÁRÓ"
      themeColor="amber"
      topicId="g8-eq-summary"
      topicTitle="III. Fejezet Témazáró"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Párosítsd a szöveges modelleket, alapegyenleteket és egzakt gyököket!',
          badgeText: '8 Pár szintenként',
          icon: <Award className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapvető Modellképletek',
              subtitle: 'Párosítsd a szöveges témakört a hozzá tartozó matematikai képlettel!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Alapképletek',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Szöveges Szituációk és Modellek',
              subtitle: 'Találd meg a feladatszöveghez tartozó pontos egyenletet!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Szöveges modellek',
              focus: 'Modellek'
            },
            3: {
              title: '3. Szint: Felvételi Feladványok és Eredményeik',
              subtitle: 'Párosítsd az összetett feladatot a pontos végeredménnyel!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Egzakt gyökök',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <Chapter3EquationsSummaryMatcher
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
          subtitle: 'Kategorizáld a feladattípusokat, egyenletmodelleket és megoldáshalmazokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Főbb Feladattípusok Csoportosítása',
              subtitle: 'Sorold be: Számok & Életkorok / Fizikai modellek / Pénzügy & Geometria szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Feladattípusok'
            },
            2: {
              title: '2. Szint: Megoldási Módszerek és Modellek',
              subtitle: 'Csoportosítsd: Mérlegelv / Törtes egyenletek / Kétismeretlenes rendszerek szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Módszerek'
            },
            3: {
              title: '3. Szint: Egyenletek Megoldáshalmazai',
              subtitle: 'Kategorizáld: Egyértelmű gyök / Azonosság (minden szám) / Ellentmondás szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Megoldáshalmazok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <Chapter3EquationsSummarySorter
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

export default Chapter3EquationsSummaryQuiz;
