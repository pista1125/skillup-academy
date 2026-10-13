import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DeltoidAreaMatcher } from './DeltoidAreaMatcher';
import { DeltoidAreaSorter } from './DeltoidAreaSorter';
import {
  Shapes,
  Maximize2,
  Layers,
  Ruler,
  Box,
  Compass,
  Split,
  Calculator
} from 'lucide-react';

interface DeltoidAreaQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Deltoid Területképlete',
    icon: <Shapes className="w-4 h-4 text-teal-600" />,
    formula: 'T = \\frac{e \\cdot f}{2}',
    note: 'A két merőleges átló szorzatának a fele. Bármely merőleges átlójú négyszögre érvényes!'
  },
  {
    id: 'c2',
    title: 'Deltoid Kerülete',
    icon: <Ruler className="w-4 h-4 text-emerald-600" />,
    formula: 'K = 2 \\cdot a + 2 \\cdot b = 2(a + b)',
    note: 'Két-két szomszédos oldal egyenlő hosszúságú (a = a és b = b).'
  },
  {
    id: 'c3',
    title: 'Átlók Tulajdonságai',
    icon: <Compass className="w-4 h-4 text-indigo-600" />,
    formula: 'e \\perp f \\quad • \\quad f \\text{ felezi } e\\text{-t}',
    note: 'A szimmetriaátló (f) merőlegesen felezi a másik átlót (e), és felezi a csúcsszögeket.'
  },
  {
    id: 'c4',
    title: 'Rombusz Kapcsolata',
    icon: <Layers className="w-4 h-4 text-sky-600" />,
    formula: 'T = \\frac{e \\cdot f}{2} = a \\cdot m_a',
    note: 'A rombusz egyenlő oldalú deltoid: mindkét átlója felezi a másikat, 2 szimmetriatengelye van.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // 1. SZINT: KEZDŐ (Alapfogalmak és közvetlen számítások)
  1: {
    title: '1. Szint: Alapfogalmak és Közvetlen Területszámítás',
    description: 'A deltoid oldalai, merőleges átlói, T = (e · f) / 2 és K = 2(a + b) alkalmazása',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Milyen négyszöget nevezünk deltoidnak a geometriában?',
        options: [
          'Amelynek van két-két szomszédos, egyenlő hosszú oldala',
          'Amelynek minden oldala egyenlő hosszú',
          'Amelynek szemközti oldalai párhuzamosak',
          'Amelynek minden szöge derékszög'
        ],
        correctAnswer: 'Amelynek van két-két szomszédos, egyenlő hosszú oldala',
        hint: 'A deltoid szomszédos oldalpárjai egyenlők: a = a és b = b.',
        explanation: 'A deltoid olyan négyszög, amelynek van két-két szomszédos, egyenlő hosszú oldala.'
      },
      {
        id: 'q1-2',
        prompt: 'Egy deltoid átlói e = 10 cm és f = 14 cm. Mennyi a területe?',
        options: ['70 cm²', '140 cm²', '35 cm²', '48 cm²'],
        correctAnswer: '70 cm²',
        hint: 'T = (e · f) / 2 = (10 · 14) / 2 = ?',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <polygon points="50,10 80,40 50,90 20,40" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="50" y1="10" x2="50" y2="90" className="stroke-indigo-600 stroke-1" />
            <line x1="20" y1="40" x2="80" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
            {/* Hungarian right angle marker */}
            <path d="M 58 40 A 8 8 0 0 0 50 32" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="54" cy="36" r="0.8" className="fill-rose-500" />
            <text x="54" y="25" className="text-[8px] font-bold fill-indigo-600">f=14</text>
            <text x="70" y="37" className="text-[8px] font-bold fill-rose-600">e=10</text>
          </svg>
        ),
        explanation: 'T = (e · f) / 2 = (10 · 14) / 2 = 140 / 2 = 70 cm².'
      },
      {
        id: 'q1-3',
        prompt: 'Hogyan helyezkednek el egymáshoz képest a deltoid átlói?',
        options: [
          'Mindig merőlegesek egymásra (e ⊥ f)',
          'Mindig párhuzamosak egymással',
          'Mindig egyenlő hosszúak',
          'Mindig felezik egymást'
        ],
        correctAnswer: 'Mindig merőlegesek egymásra (e ⊥ f)',
        hint: 'A deltoid két átlója derékszöget zár be egymással.',
        explanation: 'A deltoid legfontosabb tulajdonsága, hogy átlói mindig merőlegesek egymásra (e ⊥ f).'
      },
      {
        id: 'q1-4',
        prompt: 'Egy deltoid oldalai a = 6 cm és b = 9 cm. Mennyi a kerülete?',
        options: ['30 cm', '15 cm', '54 cm²', '27 cm'],
        correctAnswer: '30 cm',
        hint: 'K = 2 · (a + b) = 2 · (6 + 9) = ?',
        explanation: 'K = 2 · a + 2 · b = 2 · 6 + 2 · 9 = 12 + 18 = 30 cm.'
      },
      {
        id: 'q1-5',
        prompt: 'Egy deltoid átlói e = 6 cm és f = 8 cm. Mekkora a területe?',
        options: ['24 cm²', '48 cm²', '14 cm²', '28 cm²'],
        correctAnswer: '24 cm²',
        hint: 'T = (e · f) / 2 = (6 · 8) / 2 = ?',
        explanation: 'T = (6 · 8) / 2 = 48 / 2 = 24 cm².'
      },
      {
        id: 'q1-6',
        prompt: 'Hány szimmetriatengelye van egy általános deltoidnak (amely nem rombusz)?',
        options: ['Pontosan 1', 'Pontosan 2', 'Nincs szimmetriatengelye', 'Végtelen sok'],
        correctAnswer: 'Pontosan 1',
        hint: 'A szimmetriaátló egyenese az egyetlen tükörtengely.',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <line x1="50" y1="5" x2="50" y2="95" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <polygon points="50,15 80,45 50,85 20,45" fill="none" className="stroke-teal-600 stroke-2" />
            <text x="53" y="10" className="text-[7px] font-bold fill-amber-600">t</text>
          </svg>
        ),
        explanation: 'Az általános deltoidnak pontosan 1 szimmetriatengelye van, amely a két különböző csúcsot összekötő szimmetriaátló egyenese.'
      },
      {
        id: 'q1-7',
        prompt: 'Miért szerepel a 2-vel való osztás a deltoid területképletében: T = (e · f) / 2?',
        options: [
          'Mert a deltoid területe pontosan a fele a csúcsai köré írható e × f méretű téglalapnak',
          'Mert a deltoidnak két szimmetriatengelye van',
          'Mert a deltoidnak két pár egyenlő oldala van',
          'Mert az átlók felezik egymást'
        ],
        correctAnswer: 'Mert a deltoid területe pontosan a fele a csúcsai köré írható e × f méretű téglalapnak',
        hint: 'Gondolj az e szélességű és f magasságú körülírt téglalapra!',
        explanation: 'A deltoid csúcsain át az átlókkal párhuzamos egyeneseket húzva egy e × f területű téglalapot kapunk. A deltoid ennek a téglalapnak pontosan a felét fedi le.'
      },
      {
        id: 'q1-8',
        prompt: 'Egy deltoid átlói e = 12 cm és f = 15 cm. Mennyi a területe?',
        options: ['90 cm²', '180 cm²', '45 cm²', '120 cm²'],
        correctAnswer: '90 cm²',
        hint: '(12 · 15) / 2 = ?',
        explanation: 'T = (12 · 15) / 2 = 180 / 2 = 90 cm².'
      },
      {
        id: 'q1-9',
        prompt: 'Melyik átlót felezi meg a deltoid szimmetriaátlója?',
        options: [
          'A keresztátlót (a szimmetriatengelyre merőleges átlót)',
          'Önmagát',
          'Mindkét átlót egyenlő arányban',
          'Egyik átló sem feleződik'
        ],
        correctAnswer: 'A keresztátlót (a szimmetriatengelyre merőleges átlót)',
        hint: 'A szimmetriatengely a másik átlót felezi meg (e/2 és e/2).',
        explanation: 'A deltoid szimmetriatengelye (a szimmetriaátló) felezi a keresztátlót, de a keresztátló általában nem felezi a szimmetriaátlót.'
      },
      {
        id: 'q1-10',
        prompt: 'Egy deltoid kerülete K = 44 cm, rövidebb oldala a = 8 cm. Mekkora a hosszabb oldala (b)?',
        options: ['14 cm', '28 cm', '7 cm', '18 cm'],
        correctAnswer: '14 cm',
        hint: 'K = 2(a + b) ⟹ 44 = 2(8 + b) ⟹ 22 = 8 + b.',
        explanation: 'a + b = K / 2 = 44 / 2 = 22 cm. b = 22 - 8 = 14 cm.'
      }
    ]
  },

  // 2. SZINT: KÖZÉPHALADÓ (Rombusz, hiányzó adatok és szimmetriák)
  2: {
    title: '2. Szint: Rombusz mint Deltoid, Visszaszámolás és Speciális Esetek',
    description: 'Hiányzó átló számítása területből, rombusz és négyzet átlói, konkáv deltoid',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy deltoid területe T = 60 cm², egyik átlója e = 8 cm. Mekkora a másik átlója (f)?',
        options: ['15 cm', '7,5 cm', '30 cm', '12 cm'],
        correctAnswer: '15 cm',
        hint: 'f = (2 · T) / e = (2 · 60) / 8 = 120 / 8 = ?',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <polygon points="50,10 80,40 50,90 20,40" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="50" y1="10" x2="50" y2="90" className="stroke-indigo-600 stroke-1" />
            <line x1="20" y1="40" x2="80" y2="40" className="stroke-rose-500 stroke-1 stroke-dashed" />
            <path d="M 58 40 A 8 8 0 0 0 50 32" fill="none" className="stroke-rose-500 stroke-1" />
            <circle cx="54" cy="36" r="0.8" className="fill-rose-500" />
            <text x="50" y="55" textAnchor="middle" className="text-[8px] font-black fill-teal-800">T = 60</text>
            <text x="75" y="37" className="text-[7px] font-bold fill-rose-600">e = 8</text>
            <text x="52" y="20" className="text-[7px] font-bold fill-indigo-600">f = ?</text>
          </svg>
        ),
        explanation: 'T = (e · f) / 2 ⟹ 2 · T = e · f ⟹ f = (2 · 60) / 8 = 120 / 8 = 15 cm.'
      },
      {
        id: 'q2-2',
        prompt: 'Miben különbözik a rombusz az általános deltoidtól?',
        options: [
          'A rombusznak mind a négy oldala egyenlő, így mindkét átlója felezi a másikat',
          'A rombusz átlói nem merőlegesek egymásra',
          'A rombusznak nincs szimmetriatengelye',
          'A rombusz területe nem számítható az átlókból'
        ],
        correctAnswer: 'A rombusznak mind a négy oldala egyenlő, így mindkét átlója felezi a másikat',
        hint: 'A rombusz olyan deltoid, amelynek a = b (minden oldala egyenlő).',
        explanation: 'A rombusz egyenlő oldalú deltoid. Mivel mind a 4 oldala egyenlő, mindkét átlója szimmetriatengely, és mindkettő felezi a másikat.'
      },
      {
        id: 'q2-3',
        prompt: 'Egy rombusz átlói e = 10 cm és f = 24 cm. Mennyi a területe?',
        options: ['120 cm²', '240 cm²', '60 cm²', '140 cm²'],
        correctAnswer: '120 cm²',
        hint: 'A rombuszra is érvényes: T = (e · f) / 2.',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <polygon points="50,15 85,50 50,85 15,50" fill="none" className="stroke-indigo-600 stroke-2" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#6366f1" strokeWidth="1" />
            <line x1="15" y1="50" x2="85" y2="50" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M 58 50 A 8 8 0 0 0 50 42" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="54" cy="46" r="0.8" className="fill-e11d48" />
          </svg>
        ),
        explanation: 'T = (e · f) / 2 = (10 · 24) / 2 = 240 / 2 = 120 cm².'
      },
      {
        id: 'q2-4',
        prompt: 'Egy négyzet átlója d = 8 cm. Mennyi a négyzet területe az átlóképlettel számolva?',
        options: ['32 cm²', '64 cm²', '16 cm²', '48 cm²'],
        correctAnswer: '32 cm²',
        hint: 'Mivel a négyzet átlói egyenlők és merőlegesek: T = (d · d) / 2 = d² / 2.',
        explanation: 'A négyzet olyan speciális deltoid/rombusz, ahol e = f = d. Így T = d² / 2 = 8² / 2 = 64 / 2 = 32 cm².'
      },
      {
        id: 'q2-5',
        prompt: 'Egy deltoid területe T = 96 cm², f = 16 cm. Mekkora az e átló?',
        options: ['12 cm', '6 cm', '24 cm', '16 cm'],
        correctAnswer: '12 cm',
        hint: 'e = (2 · 96) / 16 = 192 / 16 = ?',
        explanation: 'e = (2 · T) / f = (2 · 96) / 16 = 192 / 16 = 12 cm.'
      },
      {
        id: 'q2-6',
        prompt: 'Igaz-e a T = (e · f) / 2 területképlet egy konkáv deltoidra (nyílhegyre)?',
        options: [
          'Igen, minden merőleges átlójú négyszögre igaz, konkávra is',
          'Nem, konkáv alakzatokra más képlet kell',
          'Csak akkor, ha az átlók egyenlők',
          'Csak akkor, ha szabályos'
        ],
        correctAnswer: 'Igen, minden merőleges átlójú négyszögre igaz, konkávra is',
        hint: 'A merőleges átlójú négyszögek képlete a konkáv esetekre is érvényes.',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <polygon points="50,15 85,85 50,60 15,85" fill="none" className="stroke-rose-600 stroke-2" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="15" y1="85" x2="85" y2="85" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        ),
        explanation: 'Igen! Bármely síkbeli négyszög területe T = (e · f) / 2, ha átlói merőlegesek egymásra, függetlenül attól, hogy konvex vagy konkáv.'
      },
      {
        id: 'q2-7',
        prompt: 'Egy deltoid szimmetrikus szögei β = δ = 110°, a felső csúcsszöge α = 60°. Mekkora az alsó csúcsszöge (γ)?',
        options: ['80°', '100°', '90°', '70°'],
        correctAnswer: '80°',
        hint: 'A négyszög belső szögeinek összege 360°: α + β + γ + δ = 360°.',
        explanation: 'A négyszög belső szögeinek összege 360°. 60° + 110° + γ + 110° = 360° ⟹ 280° + γ = 360° ⟹ γ = 80°.'
      },
      {
        id: 'q2-8',
        prompt: 'Egy deltoidba beírható-e kör (érintőnégyszög-e)?',
        options: [
          'Igen, minden konvex deltoid érintőnégyszög (a szögfelezők a szimmetriaátlón metszik egymást)',
          'Nem, csak a rombuszba írható kör',
          'Csak akkor, ha minden oldala egyenlő',
          'Egyik deltoidba sem írható kör'
        ],
        correctAnswer: 'Igen, minden konvex deltoid érintőnégyszög (a szögfelezők a szimmetriaátlón metszik egymást)',
        hint: 'Minden konvex deltoid szemközti oldalainak összege egyenlő: a + b = a + b.',
        explanation: 'Igen! Az érintőnégyszög-tétel szerint a szemközti oldalak összege egyenlő: a + b = a + b. Ez minden deltoidra teljesül, így mindegyikbe beírható kör!'
      },
      {
        id: 'q2-9',
        prompt: 'Egy deltoid átlói e = 16 cm és f = 9 cm. Mennyi a területe?',
        options: ['72 cm²', '144 cm²', '36 cm²', '50 cm²'],
        correctAnswer: '72 cm²',
        hint: '(16 · 9) / 2 = 8 · 9 = ?',
        explanation: 'T = (16 · 9) / 2 = 8 · 9 = 72 cm².'
      },
      {
        id: 'q2-10',
        prompt: 'Egy rombusz oldala a = 10 cm, magassága ma = 6 cm. Mennyi a területe?',
        options: ['60 cm²', '30 cm²', '120 cm²', '40 cm²'],
        correctAnswer: '60 cm²',
        hint: 'A rombusz egyben paralelogramma is, így T = a · ma.',
        explanation: 'Mivel a rombusz speciális paralelogramma is, területe T = a · ma = 10 · 6 = 60 cm².'
      }
    ]
  },

  // 3. SZINT: HALADÓ ÉS ÖSSZETETT FELADATOK
  3: {
    title: '3. Szint: Összetett Geometriai és Gyakorlati Szöveges Feladatok',
    description: 'Rombusz magasságának kiszámítása átlókból, papírsárkány felülete, méretváltozások és derékszögű deltoid',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy rombusz átlói e = 12 cm és f = 16 cm, oldala a = 10 cm. Mekkora a rombusz magassága (ma)?',
        options: ['9,6 cm', '4,8 cm', '8 cm', '10 cm'],
        correctAnswer: '9,6 cm',
        hint: 'Először számold ki a területet átlókból (T = 96 cm²), majd ma = T / a.',
        figure: (
          <svg viewBox="0 0 120 80" className="w-28 h-20">
            <polygon points="60,10 110,40 60,70 10,40" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="60" y1="10" x2="60" y2="70" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="10" y1="40" x2="110" y2="40" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 2" />
            <text x="60" y="43" textAnchor="middle" className="text-[7px] font-bold fill-teal-800">T = 96</text>
            <text x="30" y="22" className="text-[7px] font-bold fill-slate-700">a = 10</text>
          </svg>
        ),
        explanation: '1. Terület átlókból: T = (12 · 16) / 2 = 96 cm². 2. Terület oldalból és magasságból: T = a · ma ⟹ 96 = 10 · ma ⟹ ma = 9,6 cm.'
      },
      {
        id: 'q3-2',
        prompt: 'Egy papírsárkány vázát két egymásra merőleges nádszál alkotja: hosszuk 60 cm és 90 cm. Mennyi papír szükséges a sárkány lefedéséhez (terület)?',
        options: ['2700 cm² (0,27 m²)', '5400 cm² (0,54 m²)', '1350 cm² (0,135 m²)', '3000 cm²'],
        correctAnswer: '2700 cm² (0,27 m²)',
        hint: 'T = (e · f) / 2 = (60 · 90) / 2 = ?',
        explanation: 'A sárkány deltoid alakú, a nádszálak az átlói: T = (60 · 90) / 2 = 5400 / 2 = 2700 cm² = 0,27 m².'
      },
      {
        id: 'q3-3',
        prompt: 'Hogyan változik a deltoid területe, ha mindkét átlóját a 2-szeresére növeljük?',
        options: [
          'A négyszeresére nő (4 · T)',
          'A kétszeresére nő (2 · T)',
          'A nyolcszorosára nő (8 · T)',
          'Nem változik'
        ],
        correctAnswer: 'A négyszeresére nő (4 · T)',
        hint: 'T_új = (2e · 2f) / 2 = 4 · ((e · f) / 2) = 4 · T.',
        explanation: 'Mivel mindkét átló kétszeresére nő: 2 · 2 = 4, így a terület a 4-szeresére (négyszeresére) nő.'
      },
      {
        id: 'q3-4',
        prompt: 'Egy deltoid egyik átlóját megduplázzuk, a másikat a felére csökkentjük. Hogyan változik a területe?',
        options: [
          'Változatlan marad',
          'A felére csökken',
          'Megduplázódik',
          'A négyszeresére nő'
        ],
        correctAnswer: 'Változatlan marad',
        hint: 'T_új = (2e · (f / 2)) / 2 = (e · f) / 2 = T.',
        explanation: 'Az egyik tényező duplázása és a másik felezése semlegesíti egymást: 2 · (1/2) = 1, a terület pontosan ugyanakkora marad.'
      },
      {
        id: 'q3-5',
        prompt: 'Egy derékszögű deltoid szimmetrikus szögei derékszögek (β = δ = 90°). Oldalai a = 5 cm és b = 12 cm. Mennyi a deltoid területe?',
        options: ['60 cm²', '30 cm²', '120 cm²', '40 cm²'],
        correctAnswer: '60 cm²',
        hint: 'A szimmetriaátló két olyan egybevágó derékszögű háromszögre osztja, melyek befogói 5 és 12 cm.',
        figure: (
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            <polygon points="50,15 85,50 50,85 15,50" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
            {/* Hungarian right angles at (15, 50) and (85, 50) */}
            <path d="M 23 45 A 9 9 0 0 1 20 57" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="21" cy="51" r="0.8" className="fill-rose-500" />
            <path d="M 77 45 A 9 9 0 0 0 80 57" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="79" cy="51" r="0.8" className="fill-rose-500" />
          </svg>
        ),
        explanation: 'A szimmetriaátló két egybevágó derékszögű háromszögre bontja a deltoidot: T_háromszög = (5 · 12) / 2 = 30 cm². T_deltoid = 2 · 30 = 60 cm².'
      },
      {
        id: 'q3-6',
        prompt: 'Egy rombusz átlói e = 6 cm és f = 8 cm. Mennyi a rombusz oldala a Pitagorasz-tétellel?',
        options: ['5 cm', '7 cm', '10 cm', '4 cm'],
        correctAnswer: '5 cm',
        hint: 'A rombusz átlói felezik egymást: a félig vett átlók 3 cm és 4 cm, a derékszögű háromszög átfogója: a² = 3² + 4².',
        explanation: 'Az átlók felezik egymást és merőlegesek: a derékszögű háromszög befogói e/2 = 3 cm és f/2 = 4 cm. a² = 3² + 4² = 9 + 16 = 25 ⟹ a = 5 cm.'
      },
      {
        id: 'q3-7',
        prompt: 'Egy deltoid területe T = 84 cm², átlóinak aránya e : f = 3 : 7. Mekkora a rövidebb átló (e)?',
        options: ['6 cm', '14 cm', '12 cm', '8 cm'],
        correctAnswer: '6 cm (vagy 2T-ből: 3x · 7x = 168 ⟹ 21x² = 168 ⟹ x² = 8... legyen e = 6, f = 14: (6·14)/2 = 42? Várjunk: e=12, f=14: 84!)',
        // Let's refine values: If T = 84 cm², e · f = 168. If e = 12 and f = 14: e:f is 6:7.
        // Let's make clean numbers:
      },
      {
        id: 'q3-8',
        prompt: 'Egy deltoid átlóinak összege e + f = 20 cm, szorzatuk e · f = 96. Mennyi a deltoid területe?',
        options: ['48 cm²', '96 cm²', '24 cm²', '100 cm²'],
        correctAnswer: '48 cm²',
        hint: 'T = (e · f) / 2. Közvetlenül adott a szorzatuk!',
        explanation: 'Mivel a szorzatuk közvetlenül adott: e · f = 96, a terület egyszerűen: T = (e · f) / 2 = 96 / 2 = 48 cm².'
      },
      {
        id: 'q3-9',
        prompt: 'Egy rombusz kerülete K = 52 cm, területe T = 120 cm². Mekkora a rombusz magassága (ma)?',
        options: ['9,23 cm (120 / 13)', '10 cm', '8 cm', '12 cm'],
        correctAnswer: '9,23 cm (120 / 13)',
        hint: 'Oldala a = 52 / 4 = 13 cm. ma = T / a = 120 / 13.',
        explanation: 'A rombusz mind a 4 oldala egyenlő: a = 52 / 4 = 13 cm. Területe T = a · ma ⟹ ma = 120 / 13 ≈ 9,23 cm.'
      },
      {
        id: 'q3-10',
        prompt: 'Egy deltoid átlói e = 18 cm és f = 25 cm. Mennyi a területe négyzetdeciméterben (dm²)?',
        options: ['2,25 dm²', '225 dm²', '4,5 dm²', '0,225 dm²'],
        correctAnswer: '2,25 dm²',
        hint: 'T = (18 · 25) / 2 = 225 cm². 1 dm² = 100 cm².',
        explanation: 'T = (18 · 25) / 2 = 450 / 2 = 225 cm². Mivel 1 dm² = 100 cm², ez 225 / 100 = 2,25 dm².'
      }
    ]
  }
};

// Fix clean question 7 in level 3:
quizLevels[3].questions[6] = {
  id: 'q3-7',
  prompt: 'Egy deltoid területe T = 48 cm², átlóinak aránya e : f = 2 : 3. Mekkora a rövidebb átló (e)?',
  options: ['8 cm', '12 cm', '6 cm', '16 cm'],
  correctAnswer: '8 cm',
  hint: 'T = (2x · 3x) / 2 = 3x² = 48 ⟹ x² = 16 ⟹ x = 4. e = 2x = 8 cm.',
  explanation: 'Legyen e = 2x és f = 3x. T = (2x · 3x) / 2 = 3x² = 48 ⟹ x² = 16 ⟹ x = 4. A rövidebb átló: e = 2 · 4 = 8 cm (f = 12 cm, ellenőrzés: (8 · 12) / 2 = 48 cm²).'
};

export const DeltoidAreaQuiz: React.FC<DeltoidAreaQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="8. A deltoid területe Kvíz"
      subtitle="Gyakorold a deltoid és rombusz területképletét, merőleges átlók tulajdonságait és szöveges feladatait!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA"
      topicId="g7-geom-deltoid-area"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <DeltoidAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <DeltoidAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <DeltoidAreaMatcher
          {...props}
          key={`deltoid-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <DeltoidAreaSorter
          {...props}
          key={`deltoid-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
