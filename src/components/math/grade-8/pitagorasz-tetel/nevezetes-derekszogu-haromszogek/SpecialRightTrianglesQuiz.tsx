import React from 'react';
import {
  QuizTemplate,
  LevelConfig,
  CheatSheetCard
} from '../QuizTemplate';
import {
  Triangle,
  Square,
  Compass,
  Award,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { SpecialRightTrianglesMatcher } from './SpecialRightTrianglesMatcher';
import { SpecialRightTrianglesSorter } from './SpecialRightTrianglesSorter';

interface SpecialRightTrianglesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: '45°-45°-90° Háromszög',
    badge: 'Négyzetátló',
    badgeColor: 'indigo',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200">
          <strong>Oldalarány:</strong> 1 : 1 : √2 ⟹ <strong>c = a√2</strong>
        </div>
        <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
          <strong>Átfogóból oldal:</strong> a = c / √2 = <strong>c√2 / 2</strong>
        </div>
      </div>
    )
  },
  {
    title: '30°-60°-90° Háromszög',
    badge: 'Félszabályos',
    badgeColor: 'purple',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
          <strong>Aranyszabály:</strong> a 30°-kal szemközti befogó <strong>pontosan fele az átfogónak</strong> (a = c/2, c = 2a).
        </div>
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200">
          <strong>Hosszabbik befogó:</strong> b = <strong>a√3</strong>
        </div>
      </div>
    )
  },
  {
    title: 'Szabályos Alakzatok',
    badge: 'Képletek',
    badgeColor: 'emerald',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
          <strong>Szabályos 3szög magassága:</strong> m = <strong>a√3 / 2</strong>, területe: T = <strong>a²√3 / 4</strong>
        </div>
        <div className="p-2 rounded-lg bg-teal-50 text-teal-900 border border-teal-200">
          <strong>Szabályos hatszög:</strong> főátló = <strong>2a</strong>, kis átló = <strong>a√3</strong>
        </div>
      </div>
    )
  },
  {
    title: 'Gyakorlati Dőlésszögek',
    badge: 'Alkalmazás',
    badgeColor: 'amber',
    content: (
      <div className="space-y-2 text-xs">
        <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
          <strong>30°-os lejtő / rámpa:</strong> magasságemelkedés = lejtőhossz fele.
        </div>
        <div className="p-2 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
          <strong>45°-os tető:</strong> gerincmagasság = alapszélesség fele.
        </div>
      </div>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: 45°-45°-90° Háromszög és Négyzet Átlója',
    subtitle: '10 alapfeladat az egyenlő szárú derékszögű háromszögek oldalarányairól és számításairól',
    badgeText: '1. Szint • Kezdő',
    badgeColor: 'indigo',
    icon: <Square className="w-4 h-4 text-indigo-600" />,
    questions: [
      {
        id: 'srt-q1-1',
        title: 'Oldalarányok felismerése',
        question: 'Milyen arányban állnak egymással egy 45°-45°-90°-os egyenlő szárú derékszögű háromszög oldalai (befogó : befogó : átfogó)?',
        options: [
          '1 : 1 : √2',
          '1 : √3 : 2',
          '1 : 1 : 2',
          '3 : 4 : 5'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlő szárú derékszögű háromszögben a² + a² = 2a² ⟹ c = a√2, így az oldalarány 1 : 1 : √2.'
      },
      {
        id: 'srt-q1-2',
        title: 'Átfogó kiszámítása befogóból',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói a = b = 6 cm. Mekkora az átfogó (c)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 110,65 110,15" fill="#f8fafc" stroke="#4f46e5" strokeWidth="1.5" />
            <rect x="100" y="55" width="10" height="10" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
            <circle cx="105" cy="60" r="1" fill="#4f46e5" />
            <text x="70" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">6 cm</text>
            <text x="118" y="42" className="text-[8px] font-bold fill-slate-700">6 cm</text>
            <text x="65" y="35" textAnchor="middle" className="text-[8.5px] font-bold fill-indigo-700">c = ?</text>
          </svg>
        ),
        options: [
          '6√2 cm (≈ 8,49 cm)',
          '12 cm',
          '6√3 cm (≈ 10,39 cm)',
          '8 cm'
        ],
        correctAnswer: 0,
        explanation: 'c = a√2 = 6√2 cm ≈ 8,49 cm.'
      },
      {
        id: 'srt-q1-3',
        title: 'Négyzet átlójának hossza',
        question: 'Egy négyzet oldala a = 9 cm. Mennyi a négyzet átlójának (d) pontos hossza?',
        options: [
          '9√2 cm',
          '18 cm',
          '9√3 cm',
          '81 cm'
        ],
        correctAnswer: 0,
        explanation: 'A négyzet átlója d = a√2 = 9√2 cm.'
      },
      {
        id: 'srt-q1-4',
        title: 'Befogó keresése gyökös átfogóból',
        question: 'Egy 45°-45°-90°-os háromszög átfogója c = 14√2 cm. Milyen hosszú egy-egy befogó?',
        options: [
          '14 cm',
          '28 cm',
          '7√2 cm',
          '14√3 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel c = a√2, ezért a = c / √2 = 14√2 / √2 = 14 cm.'
      },
      {
        id: 'srt-q1-5',
        title: 'Befogó számítása egész átfogóból',
        question: 'Egy négyzet átlója d = 10 cm. Mekkora a négyzet oldala (a)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="30,65 110,65 110,15 30,15" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.2" />
            <polygon points="30,65 110,65 110,15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="70" y="76" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">a = ?</text>
            <text x="65" y="36" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">d = 10 cm</text>
          </svg>
        ),
        options: [
          '5√2 cm (≈ 7,07 cm)',
          '5 cm',
          '10√2 cm',
          '7 cm'
        ],
        correctAnswer: 0,
        explanation: 'a = d / √2 = 10 / √2 = 10√2 / 2 = 5√2 cm ≈ 7,07 cm.'
      },
      {
        id: 'srt-q1-6',
        title: 'Terület számítása befogóból',
        question: 'Egy egyenlő szárú derékszögű háromszög befogói 8 cm hosszúak. Mekkora a háromszög területe?',
        options: [
          '32 cm²',
          '64 cm²',
          '16 cm²',
          '16√2 cm²'
        ],
        correctAnswer: 0,
        explanation: 'T = (a · b) / 2 = (8 · 8) / 2 = 64 / 2 = 32 cm².'
      },
      {
        id: 'srt-q1-7',
        title: 'Négyzet területe az átlóból',
        question: 'Egy négyzet átlója d = 6 cm. Mekkora a négyzet területe (T)?',
        options: [
          '18 cm²',
          '36 cm²',
          '9 cm²',
          '12 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A négyzet területe az átlóból: T = d² / 2 = 6² / 2 = 36 / 2 = 18 cm².'
      },
      {
        id: 'srt-q1-8',
        title: 'Szögek felismerése tulajdonságból',
        question: 'Egy derékszögű háromszög két befogója azonos hosszúságú. Mekkorák a háromszög hegyesszögei?',
        options: [
          '45° és 45°',
          '30° és 60°',
          '20° és 70°',
          '50° és 50°'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a két befogó egyenlő, a háromszög egyenlő szárú, így az alapon fekvő hegyesszögek (180° - 90°) / 2 = 45°-osak.'
      },
      {
        id: 'srt-q1-9',
        title: 'Kerület kiszámítása',
        question: 'Egy 45°-45°-90°-os háromszög befogója a = 4 cm. Mennyi a kerülete (K)?',
        options: [
          '8 + 4√2 cm (≈ 13,66 cm)',
          '12 cm',
          '16 cm',
          '8√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'K = a + a + c = 4 + 4 + 4√2 = 8 + 4√2 cm ≈ 13,66 cm.'
      },
      {
        id: 'srt-q1-10',
        title: 'Átfogóhoz tartozó magasság',
        question: 'Egy egyenlő szárú derékszögű háromszög átfogója c = 12 cm. Mekkora az átfogóhoz tartozó magasság (m)?',
        options: [
          '6 cm',
          '6√2 cm',
          '12 cm',
          '3√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlő szárú derékszögű háromszögben a magasság felezi az átfogót és a derékszöget is, így két kisebb 45-45-90 háromszög jön létre: m = c / 2 = 12 / 2 = 6 cm.'
      }
    ]
  },
  2: {
    title: '2. Szint: 30°-60°-90° Háromszög és Szabályos Háromszög',
    subtitle: '10 feladat a félszabályos háromszögek aranyszabályáról, a magasságról és a √3-as szorzóról',
    badgeText: '2. Szint • Haladó',
    badgeColor: 'purple',
    icon: <Triangle className="w-4 h-4 text-purple-600" />,
    questions: [
      {
        id: 'srt-q2-1',
        title: 'A 30°-os alapszabály',
        question: 'A 30°-60°-90°-os derékszögű háromszögben melyik oldal pontosan a FELE az átfogónak?',
        options: [
          'A 30°-os szöggel szemközti (rövidebbik) befogó',
          'A 60°-os szöggel szemközti (hosszabbik) befogó',
          'Mindkét befogó egyenlő és fele az átfogónak',
          'Egyik befogó sem'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög feléből következik, hogy a 30°-os szöggel szemközti befogó mindig fele az átfogónak: a = c / 2.'
      },
      {
        id: 'srt-q2-2',
        title: 'Rövid befogó kiszámítása átfogóból',
        question: 'Egy 30°-60°-90°-os háromszög átfogója c = 16 cm. Mekkora a 30°-os szöggel szemközti befogó (a)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,65 135,65 25,20" fill="#f8fafc" stroke="#7e22ce" strokeWidth="1.5" />
            <rect x="25" y="55" width="10" height="10" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1" />
            <circle cx="30" cy="60" r="1" fill="#7e22ce" />
            <text x="110" y="60" textAnchor="end" className="text-[7px] font-bold fill-purple-700">30°</text>
            <text x="18" y="45" textAnchor="end" className="text-[8px] font-bold fill-purple-700">a = ?</text>
            <text x="80" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">c = 16 cm</text>
          </svg>
        ),
        options: [
          '8 cm',
          '8√3 cm (≈ 13,86 cm)',
          '4 cm',
          '16√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'a = c / 2 = 16 / 2 = 8 cm.'
      },
      {
        id: 'srt-q2-3',
        title: 'Átfogó kiszámítása rövid befogóból',
        question: 'Egy 30°-60°-90°-os háromszög 30°-kal szemközti befogója a = 7 cm. Milyen hosszú az átfogó (c)?',
        options: [
          '14 cm',
          '7√3 cm',
          '7√2 cm',
          '21 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az átfogó a rövid befogó kétszerese: c = 2 · a = 2 · 7 = 14 cm.'
      },
      {
        id: 'srt-q2-4',
        title: 'Hosszabbik befogó értéke',
        question: 'Egy félszabályos háromszög rövidebbik befogója a = 5 cm. Mennyi a 60°-os szöggel szemközti hosszabbik befogó pontos hossza?',
        options: [
          '5√3 cm (≈ 8,66 cm)',
          '10 cm',
          '5√2 cm',
          '15 cm'
        ],
        correctAnswer: 0,
        explanation: 'A hosszabbik befogó b = a√3 = 5√3 cm ≈ 8,66 cm.'
      },
      {
        id: 'srt-q2-5',
        title: 'Szabályos háromszög magassága',
        question: 'Egy szabályos (egyenlő oldalú) háromszög oldala a = 12 cm. Mennyi a magassága (m)?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="80,15 25,68 135,68" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="15" x2="80" y2="68" stroke="#7e22ce" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="86" y="44" className="text-[8px] font-bold fill-purple-700">m = ?</text>
            <text x="45" y="38" className="text-[8px] font-bold fill-slate-700">12 cm</text>
            <text x="80" y="77" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">12 cm</text>
          </svg>
        ),
        options: [
          '6√3 cm (≈ 10,39 cm)',
          '6 cm',
          '12√3 cm',
          '6√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'A magasság a szabályos háromszöget két 30-60-90 háromszögre bontja: m = (a/2) · √3 = 6√3 cm ≈ 10,39 cm.'
      },
      {
        id: 'srt-q2-6',
        title: 'Rövid befogó a hosszabbikból',
        question: 'Egy 30°-60°-90°-os háromszög hosszabbik befogója b = 9√3 cm. Mekkora a rövidebbik befogó (a)?',
        options: [
          '9 cm',
          '18 cm',
          '3√3 cm',
          '27 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel b = a√3, ezért a = b / √3 = 9√3 / √3 = 9 cm.'
      },
      {
        id: 'srt-q2-7',
        title: 'Hosszabbik befogó átfogóból',
        question: 'Egy 30°-60°-90°-os háromszög átfogója c = 20 cm. Mekkora a 60°-os szöggel szemközti befogó?',
        options: [
          '10√3 cm (≈ 17,32 cm)',
          '10 cm',
          '10√2 cm',
          '15 cm'
        ],
        correctAnswer: 0,
        explanation: 'A rövid befogó a = c/2 = 10 cm, a hosszú befogó b = a√3 = 10√3 cm.'
      },
      {
        id: 'srt-q2-8',
        title: 'Oldalarányok sorrendje',
        question: 'Milyen arányban állnak a 30°-60°-90°-os háromszög oldalai növekvő nagyságrendben?',
        options: [
          '1 : √3 : 2',
          '1 : 1 : √2',
          '1 : 2 : 3',
          '1 : √2 : √3'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 1 < √3 (≈1,732) < 2, az arány: 1 : √3 : 2.'
      },
      {
        id: 'srt-q2-9',
        title: 'Félszabályos háromszög területe',
        question: 'Egy 30°-60°-90°-os háromszög 30°-kal szemközti befogója a = 4 cm. Mekkora a háromszög területe?',
        options: [
          '8√3 cm² (≈ 13,86 cm²)',
          '16√3 cm²',
          '8 cm²',
          '16 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A befogók: a = 4 cm és b = 4√3 cm. Terület: T = (a · b) / 2 = (4 · 4√3) / 2 = 8√3 cm² ≈ 13,86 cm².'
      },
      {
        id: 'srt-q2-10',
        title: 'Szabályos háromszög területe',
        question: 'Egy szabályos háromszög oldala a = 6 cm. Mekkora a területe?',
        options: [
          '9√3 cm² (≈ 15,59 cm²)',
          '18 cm²',
          '18√3 cm²',
          '36 cm²'
        ],
        correctAnswer: 0,
        explanation: 'T = a²√3 / 4 = 6²√3 / 4 = 36√3 / 4 = 9√3 cm² ≈ 15,59 cm².'
      }
    ]
  },
  3: {
    title: '3. Szint: Gyakorlati és Felvételi Feladatok',
    subtitle: '10 komplex feladvány létrákról, tetőkről, rombuszról, hatszögről és trapézról',
    badgeText: '3. Szint • Mester',
    badgeColor: 'teal',
    icon: <Compass className="w-4 h-4 text-teal-600" />,
    questions: [
      {
        id: 'srt-q3-1',
        title: 'Falnak támasztott létra',
        question: 'Egy 6 méter hosszú támasztólétra a függőleges fallal 30°-os szöget zár be. Milyen távol van a létra talpa a fal tövétől?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <line x1="30" y1="70" x2="140" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="15" x2="30" y2="70" stroke="#64748b" strokeWidth="2.5" />
            <line x1="30" y1="20" x2="95" y2="70" stroke="#0d9488" strokeWidth="2" />
            <text x="36" y="32" className="text-[7px] font-bold fill-teal-700">30°</text>
            <text x="68" y="42" className="text-[8px] font-bold fill-slate-700">6 m</text>
            <text x="62" y="78" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">x = ?</text>
          </svg>
        ),
        options: [
          '3 m',
          '3√3 m (≈ 5,20 m)',
          '4 m',
          '2 m'
        ],
        correctAnswer: 0,
        explanation: 'A fallal bezárt szög 30°, így a talajon lévő távolság a 30°-kal szemközti befogó: x = c / 2 = 6 / 2 = 3 m.'
      },
      {
        id: 'srt-q3-2',
        title: 'Rámpa emelkedése',
        question: 'Egy kerekesszékes rámpa hossza 12 m, emelkedési szöge 30°. Milyen magasra vezet fel a rámpa?',
        options: [
          '6 m',
          '6√3 m',
          '4 m',
          '3 m'
        ],
        correctAnswer: 0,
        explanation: 'A magasság a 30°-os szöggel szemközti befogó, ami fele a rámpa hosszának: h = 12 / 2 = 6 m.'
      },
      {
        id: 'srt-q3-3',
        title: 'Szabályos hatszög átlói',
        question: 'Egy szabályos hatszög oldala a = 5 cm. Mekkora a leghosszabb átlója (d₁) és a rövidebb átlója (d₂)?',
        options: [
          'd₁ = 10 cm és d₂ = 5√3 cm (≈ 8,66 cm)',
          'd₁ = 10 cm és d₂ = 5√2 cm',
          'd₁ = 15 cm és d₂ = 10 cm',
          'd₁ = 5√3 cm és d₂ = 10 cm'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos hatszög főátlója d₁ = 2a = 10 cm, a rövidebb átlója d₂ = a√3 = 5√3 cm.'
      },
      {
        id: 'srt-q3-4',
        title: '60°-os rombusz átlói',
        question: 'Egy rombusz oldala a = 10 cm, egyik belső szöge 60°. Milyen hosszúak a rombusz átlói?',
        figure: (
          <svg viewBox="0 0 160 80" className="w-full max-w-[160px] h-auto max-h-[85px] select-none">
            <polygon points="25,40 75,15 125,40 75,65" fill="#f8fafc" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="25" y1="40" x2="125" y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="75" y1="15" x2="75" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
            <text x="35" y="42" className="text-[7px] font-bold fill-teal-700">60°</text>
            <text x="45" y="24" className="text-[8px] font-bold fill-slate-700">10 cm</text>
          </svg>
        ),
        options: [
          'e = 10 cm és f = 10√3 cm (≈ 17,32 cm)',
          'e = 10 cm és f = 10√2 cm',
          'e = 5 cm és f = 10 cm',
          'e = 10√3 cm és f = 20 cm'
        ],
        correctAnswer: 0,
        explanation: 'A rövidebb átló két szabályos háromszögre osztja a rombuszt, így e = 10 cm. A hosszabb átló a szabályos háromszög kétszeres magassága: f = 2 · (10√3 / 2) = 10√3 cm.'
      },
      {
        id: 'srt-q3-5',
        title: 'Szimmetrikus sátortető magassága',
        question: 'Egy épület szimmetrikus sátortetejének szélessége 10 m, a tetősík hajlásszöge 45°. Milyen magas a tetőgerinc a födémhez képest?',
        options: [
          '5 m',
          '5√2 m (≈ 7,07 m)',
          '10 m',
          '2,5 m'
        ],
        correctAnswer: 0,
        explanation: 'A szimmetria miatt a tető fele egy 45°-45°-90°-os háromszög, melynek alsó befogója a szélesség fele: 10 / 2 = 5 m. Mivel a szögek 45°-osak, a magasság is 5 m.'
      },
      {
        id: 'srt-q3-6',
        title: 'Egyenlő szárú trapéz magassága',
        question: 'Egy szimmetrikus trapéz alapjai 16 cm és 10 cm hosszúak. Szárai az alappal 45°-os szöget zárnak be. Mekkora a trapéz magassága?',
        options: [
          '3 cm',
          '6 cm',
          '3√2 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        explanation: 'A magasságvonalak által levágott szakasz az alapon: x = (16 - 10) / 2 = 3 cm. Mivel a szög 45°, a derékszögű háromszög egyenlő szárú, így a magasság m = x = 3 cm.'
      },
      {
        id: 'srt-q3-7',
        title: 'Egyenlő szárú trapéz szára 60°-os szöggel',
        question: 'Egy szimmetrikus trapéz hosszabb alapja 14 cm, rövidebb alapja 6 cm. Az alapon fekvő szögei 60°-osak. Milyen hosszú a trapéz szára (b)?',
        options: [
          '8 cm',
          '4 cm',
          '4√3 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        explanation: 'A levágott vízszintes szakasz x = (14 - 6) / 2 = 4 cm. Ez a szakasz a 30°-os szöggel szemközti befogó (mivel fent 30° van), így a szár (átfogó) kétszer akkora: b = 2 · 4 = 8 cm.'
      },
      {
        id: 'srt-q3-8',
        title: 'Rövid befogó kiszámítása hosszabbikból',
        question: 'Egy 30°-60°-90°-os háromszög hosszabbik befogója b = 6 cm. Mennyi a rövidebbik befogó (a) pontos értéke?',
        options: [
          '2√3 cm (≈ 3,46 cm)',
          '3 cm',
          '6√3 cm',
          '3√2 cm'
        ],
        correctAnswer: 0,
        explanation: 'a = b / √3 = 6 / √3 = 6√3 / 3 = 2√3 cm ≈ 3,46 cm.'
      },
      {
        id: 'srt-q3-9',
        title: 'Hegyesszögek 1 : 2 aránya',
        question: 'Egy derékszögű háromszög egyik hegyesszöge kétszer akkora, mint a másik. Milyen arányban állnak a háromszög oldalai növekvő sorrendben?',
        options: [
          '1 : √3 : 2',
          '1 : 1 : √2',
          '1 : 2 : 3',
          '3 : 4 : 5'
        ],
        correctAnswer: 0,
        explanation: 'Ha az egyik szög α, a másik 2α, akkor α + 2α = 90° ⟹ α = 30° és 2α = 60°. Tehát ez a 30°-60°-90°-os háromszög, oldalaránya 1 : √3 : 2.'
      },
      {
        id: 'srt-q3-10',
        title: 'Szögek megállapítása oldalakból',
        question: 'Egy derékszögű háromszög átfogója c = 20 cm, egyik befogója a = 10 cm. Mekkorák a háromszög hegyesszögei?',
        options: [
          '30° és 60°',
          '45° és 45°',
          '25° és 65°',
          '35° és 55°'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az egyik befogó (10 cm) pontosan a fele az átfogónak (20 cm), a vele szemközti szög szükségképpen 30°, a másik hegyesszög pedig 60°.'
      }
    ]
  }
};

export const SpecialRightTrianglesQuiz: React.FC<SpecialRightTrianglesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Nevezetes Derékszögű Háromszögek Kvíz"
      subtitle="45°-45°-90° és 30°-60°-90° összefüggések, gyors fejszámolás és felvételi típusfeladatok"
      topicId="g8-pyth-special-triangles"
      levels={levelsConfig}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: 45°-45°-90° Háromszög és Négyzet Átlója',
              subtitle: 'Párosítsd az oldalakat az átfogókkal és átlókkal!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Alapfogalmak',
              focus: '45°-45°-90° összefüggések'
            },
            2: {
              title: '2. Szint: 30°-60°-90° Félszabályos Háromszög',
              subtitle: 'Párosítsd a félszabályos háromszög oldalait és magasságait!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Szabályos 3szög fele',
              focus: '30°-60°-90° összefüggések'
            },
            3: {
              title: '3. Szint: Gyakorlati és Összetett Feladatok',
              subtitle: 'Párosítsd a lejtők, hatszögek és rombuszok feladatait!',
              rangeLabel: 'Párok száma:',
              range: '8 pár • Alkalmazások',
              focus: 'Modellek és alkalmazások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <SpecialRightTrianglesMatcher
              key={`srt-matcher-${level}`}
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
          label: 'Csoportosító',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Háromszögek Típusa és Tulajdonságai',
              subtitle: 'Csoportosítsd: 45°-45°-90° / 30°-60°-90° / Egyikhez sem tartozik!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Háromszög típusok'
            },
            2: {
              title: '2. Szint: Kifejezések és Számértékek Típusa',
              subtitle: 'Döntsd el: Pontos egész szám / √2-es érték / √3-as érték!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Gyökök és kifejezések'
            },
            3: {
              title: '3. Szint: Állítások és Összefüggések Igazsága',
              subtitle: 'Csoportosítsd: Mindig igaz / Csak bizonyos esetekben / Soha nem igaz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Tételek és állítások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <SpecialRightTrianglesSorter
              key={`srt-sorter-${level}`}
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

export default SpecialRightTrianglesQuiz;
