import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { AnglesMatcher } from './AnglesMatcher';
import { AnglesSorter } from './AnglesSorter';
import { Compass, Clock, Shapes, CircleDot, Sparkles, BookOpen } from 'lucide-react';

export interface AnglesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ========================================================
  // --- 1. SZINT: A SZÖG FOGALMA, RÉSZEI ÉS SZÖGFAJTÁK ---
  // ========================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Milyen geometriai alakzat alkotja a szög két szárát?',
    options: [
      'Két, közös kezdőpontból kiinduló félegyenes',
      'Két egymást metsző zárt körvonal',
      'Két párhuzamos egyenes',
      'Két tetszőleges hosszúságú szakasz, amelyek nem érnek össze'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="10" y1="30" x2="55" y2="30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="30" x2="45" y2="10" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="10" cy="30" r="3.5" fill="#b45309" />
        <text x="6" y="24" className="text-[10px] font-black fill-amber-900">O</text>
        <text x="50" y="24" className="text-[10px] font-bold fill-amber-700">a</text>
        <text x="42" y="8" className="text-[10px] font-bold fill-amber-700">b</text>
      </svg>
    ),
    explanation: 'A szöget két olyan félegyenes határolja, amelyek egyetlen közös kezdőpontból (a szögcsúcsból) indulnak ki. Ezeket a félegyeneseket szögszáraknak nevezzük.',
    hint: 'Gondolj a félegyenesre: van egy kezdőpontja, és a végtelenbe tart.',
    breakdown: [
      { label: 'Szögcsúcs', value: 'A félegyenesek közös kezdőpontja (O)' },
      { label: 'Szögszárak', value: 'A csúcsból kiinduló két félegyenes (a, b)' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mekkora a derékszög pontos nagysága fokokban?',
    options: [
      'Pontosan 90°',
      'Pontosan 180°',
      'Bármilyen 0° és 90° közötti szög',
      'Pontosan 45°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="12" y1="32" x2="42" y2="32" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="32" x2="12" y2="8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 22 32 A 10 10 0 0 0 12 22" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="17" cy="27" r="1.5" fill="#047857" />
      </svg>
    ),
    explanation: 'A derékszög pontosan 90°-os szög. Ekkor a két szögszár merőleges egymásra.',
    hint: 'A füzeted vagy egy téglalap sarkának pontos szöge.',
    breakdown: [
      { label: 'Derékszög', value: 'α = 90°' },
      { label: 'Szárak viszonya', value: 'Egymásra merőlegesek' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Melyik szögfajtára igaz, hogy nagysága nagyobb mint 0°, de kisebb mint 90°?',
    options: [
      'Hegyesszög',
      'Tompaszög',
      'Egyenesszög',
      'Homorúszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="10" y1="30" x2="45" y2="30" stroke="#f59e0b" strokeWidth="2.5" />
        <line x1="10" y1="30" x2="35" y2="10" stroke="#f59e0b" strokeWidth="2.5" />
        <path d="M22 30 A12 12 0 0 0 19 21" stroke="#d97706" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="30" r="3" fill="#b45309" />
      </svg>
    ),
    explanation: 'A 0° és 90° közötti szögeket hegyesszögeknek nevezzük (0° < α < 90°). Kisebbek a derékszögnél.',
    hint: 'A hegyes ceruza hegye is ilyen szűk szöget zár be.',
    breakdown: [
      { label: 'Definíció', value: '0° < α < 90°' },
      { label: 'Példák', value: '15°, 30°, 45°, 60°, 89°' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik szögfajtába tartozik egy 125°-os szög?',
    options: [
      'Tompaszög',
      'Hegyesszög',
      'Homorúszög',
      'Egyenesszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="25" y1="30" x2="55" y2="30" stroke="#3b82f6" strokeWidth="2.5" />
        <line x1="25" y1="30" x2="5" y2="15" stroke="#3b82f6" strokeWidth="2.5" />
        <path d="M37 30 A12 12 0 0 0 14 22" stroke="#2563eb" strokeWidth="1.5" fill="none" />
        <circle cx="25" cy="30" r="3" fill="#1d4ed8" />
      </svg>
    ),
    explanation: 'Mivel 125° nagyobb 90°-nál, de kisebb 180°-nál (90° < 125° < 180°), ezért ez a szög tompaszög.',
    hint: 'Nagyobb mint a derékszög (90°), de kisebb mint a félkör (180°).',
    breakdown: [
      { label: 'Tartomány', value: '90° < α < 180°' },
      { label: '125°', value: 'Tompaszög' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Mekkora az egyenesszög nagysága?',
    options: [
      'Pontosan 180°',
      'Pontosan 360°',
      'Pontosan 90°',
      'Pontosan 270°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-14 mx-auto" viewBox="0 0 70 35" fill="none">
        <line x1="5" y1="25" x2="65" y2="25" stroke="#8b5cf6" strokeWidth="2.5" />
        <circle cx="35" cy="25" r="3.5" fill="#6d28d9" />
        <path d="M47 25 A12 12 0 0 0 23 25" stroke="#7c3aed" strokeWidth="1.5" fill="#ede9fe" />
      </svg>
    ),
    explanation: 'Az egyenesszög pontosan 180°-os. Ekkor a két szögszár egyetlen egyenes két ellentétes irányú félegyenese.',
    hint: 'Egy nyitott vonalzó vagy egyenes vonal.',
    breakdown: [
      { label: 'Egyenesszög', value: 'α = 180°' },
      { label: 'Jellemző', value: 'A szárak egyenest alkotnak' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hogyan nevezzük a 180°-nál nagyobb, de 360°-nál kisebb szögeket (pl. 240°)?',
    options: [
      'Homorúszög',
      'Tompaszög',
      'Teljesszög',
      'Egyenesszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="25" y1="20" x2="45" y2="20" stroke="#ec4899" strokeWidth="2.5" />
        <line x1="25" y1="20" x2="10" y2="10" stroke="#ec4899" strokeWidth="2.5" />
        <path d="M16 14 A13 13 0 1 0 38 20" stroke="#db2777" strokeWidth="1.5" fill="none" />
        <circle cx="25" cy="20" r="3" fill="#be185d" />
      </svg>
    ),
    explanation: 'A 180° és 360° közötti szögek a homorúszögek (180° < α < 360°). Ezek „kívülről” nézve ölelik át a szögszárakat.',
    hint: 'Nagyobb a félfordulatnál (180°), de még nem éri el a teljes kört (360°).',
    breakdown: [
      { label: 'Definíció', value: '180° < α < 360°' },
      { label: 'Elnevezés', value: 'Homorúszög' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mekkora a teljesszög nagysága?',
    options: [
      'Pontosan 360° (egy teljes fordulat)',
      'Pontosan 180° (fél fordulat)',
      'Pontosan 90° (negyed fordulat)',
      'Pontosan 100°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <line x1="22" y1="22" x2="40" y2="22" stroke="#06b6d4" strokeWidth="2.5" />
        <circle cx="22" cy="22" r="13" stroke="#0891b2" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="22" r="3" fill="#0e7490" />
      </svg>
    ),
    explanation: 'A teljesszög 360°, amikor a forgó szár egyetlen teljes kört ír le és visszaérkezik a kezdő pozíciójába.',
    hint: 'Egy teljes körbefordulás a saját tengelyed körül.',
    breakdown: [
      { label: 'Teljesszög', value: 'α = 360°' },
      { label: 'Mérték', value: '1 teljes fordulat' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Ha egy szöget három betűvel jelölünk, mint például ∠AOB, melyik betű jelöli a szög csúcsát?',
    options: [
      'Mindig a középső betű (O)',
      'Mindig az első betű (A)',
      'Mindig az utolsó betű (B)',
      'Bármelyik betű lehet a három közül'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="12" y1="30" x2="50" y2="30" stroke="#f59e0b" strokeWidth="2" />
        <line x1="12" y1="30" x2="40" y2="10" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="12" cy="30" r="3" fill="#ef4444" />
        <circle cx="48" cy="30" r="2.5" fill="#3b82f6" />
        <circle cx="38" cy="11" r="2.5" fill="#3b82f6" />
        <text x="7" y="24" className="text-[10px] font-black fill-rose-600">O</text>
        <text x="48" y="24" className="text-[10px] font-bold fill-blue-700">A</text>
        <text x="38" y="7" className="text-[10px] font-bold fill-blue-700">B</text>
      </svg>
    ),
    explanation: 'A hárombetűs szögjelölésnél (pl. ∠AOB) a középen álló betű (itt az O) kötelezően a szög csúcspontját jelöli, míg az A és B pontok a szárakon helyezkednek el.',
    hint: 'A csúcs van a középpontban: A - [CSÚCS] - B.',
    breakdown: [
      { label: 'Középső betű', value: 'A szög csúcsa (O)' },
      { label: 'Szélső betűk', value: 'Pontok a szárakon (A, B)' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Két félegyenes egy közös kezdőponttal a síkot hány szögtartományra osztja?',
    options: [
      'Pontosan 2 tartományra (egy belső domború és egy külső homorú)',
      'Csak 1 tartományra',
      '4 tartományra',
      'Végtelen sok tartományra'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="20" y1="25" x2="50" y2="25" stroke="#64748b" strokeWidth="2" />
        <line x1="20" y1="25" x2="40" y2="8" stroke="#64748b" strokeWidth="2" />
        <path d="M30 25 A10 10 0 0 0 28 17" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <path d="M28 17 A10 10 0 1 0 30 25" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        <circle cx="20" cy="25" r="3" fill="#334155" />
      </svg>
    ),
    explanation: 'A szög két szára a sík többi pontját két tartományra bontja: ha a két szár nem egyenes, akkor az egyik tartomány kisebb 180°-nál (domború), a másik nagyobb 180°-nál (homorú).',
    hint: 'Gondolj egy tortára: ha kivágsz egy szeletet, marad a szelet (kisebbik) és a megmaradt nagy torta (nagyobbik).',
    breakdown: [
      { label: 'Belső szög', value: 'Domború tartomány (≤ 180°)' },
      { label: 'Külső szög', value: 'Homorú tartomány (> 180°)' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Melyik szögfajtára példa a 0°-os szög?',
    options: [
      'Nullszög',
      'Hegyesszög',
      'Derékszög',
      'Tompaszög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-10 mx-auto" viewBox="0 0 50 25" fill="none">
        <line x1="10" y1="12" x2="45" y2="12" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="12" r="3" fill="#1e293b" />
      </svg>
    ),
    explanation: 'A 0°-os szög neve nullszög. Ekkor a két félegyenes egybeesik, a nyílás közöttük nulla.',
    hint: 'A nulla fokos szög neve nullszög.',
    breakdown: [
      { label: 'Fok', value: '0°' },
      { label: 'Elnevezés', value: 'Nullszög' }
    ]
  },

  // ========================================================
  // --- 2. SZINT: SZÖGEK AZ ÓRÁN ÉS SZÖGMÉRÉS ---
  // ========================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Hány fokos szöget zár be a kismutató és a nagymutató egy hagyományos óralapon pontosan 3:00 órakor?',
    options: [
      'Pontosan 90° (derékszög)',
      'Pontosan 60° (hegyesszög)',
      'Pontosan 120° (tompaszög)',
      'Pontosan 180° (egyenesszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="10" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="25" y1="25" x2="40" y2="25" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <path d="M 33 25 A 8 8 0 0 0 25 17" stroke="#d97706" strokeWidth="1.2" fill="none" />
        <circle cx="28.5" cy="21.5" r="1" fill="#b45309" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '3:00-kor a nagymutató a 12-esen, a kismutató a 3-ason áll. A kettő között 3 óraköz van: 3 × 30° = 90°, ami pontosan derékszög.',
    hint: 'A 12 és a 3 közötti távolság az egész kör (360°) pontosan egynegyede.',
    breakdown: [
      { label: '1 óraköz', value: '360° : 12 = 30°' },
      { label: '3 óraköz', value: '3 × 30° = 90° (derékszög)' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Hány fokos szögnek felel meg pontosan 1 óraköz az óralapon (pl. a 12 és az 1 között)?',
    options: [
      '30° (mert 360° : 12 = 30°)',
      '15° (mert 180° : 12 = 15°)',
      '60° (mert 360° : 6 = 60°)',
      '10° (mert 100° : 10 = 10°)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <circle cx="22" cy="22" r="19" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M22 22 L22 5 A17 17 0 0 1 30.5 7.5 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="2" fill="#b45309" />
      </svg>
    ),
    explanation: 'A teljes kör 360°-os, és az óralapon 12 egyenlő óraköz található: 360° : 12 = 30°. Így minden órajel 30°-os szögnek felel meg.',
    hint: 'Oszd el a teljes fordulatot (360°) a 12 órával!',
    breakdown: [
      { label: 'Teljes kör', value: '360°' },
      { label: 'Órák száma', value: '12' },
      { label: '1 óraköz', value: '360° : 12 = 30°' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Mekkora a mutatók által bezárt kisebbik szög 6:00 órakor?',
    options: [
      '180° (egyenesszög)',
      '90° (derékszög)',
      '360° (teljesszög)',
      '120° (tompaszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="25" y1="25" x2="25" y2="42" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '6:00-kor a nagymutató felfelé (12-es), a kismutató lefelé (6-os) mutat. Egyetlen egyenest alkotnak, így a bezárt szög pontosan 180° (egyenesszög).',
    hint: 'Egyenes vonalat látunk: fél fordulat az órán.',
    breakdown: [
      { label: 'Óraközök száma', value: '6 óraköz' },
      { label: 'Szög', value: '6 × 30° = 180° (egyenesszög)' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Mekkora szöget zárnak be az óramutatók pontosan 2:00 órakor?',
    options: [
      '60° (hegyesszög)',
      '30° (hegyesszög)',
      '90° (derékszög)',
      '120° (tompaszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="25" y1="25" x2="38" y2="17.5" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '2:00-kor a mutatók között 2 óraköz van (a 12-es és a 2-es között): 2 × 30° = 60°. Ez hegyesszög.',
    hint: 'Két óraköz van a 12 és a 2 között: 2 × 30° = ?',
    breakdown: [
      { label: 'Különbség', value: '2 óraköz' },
      { label: 'Számolás', value: '2 × 30° = 60°' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Mekkora szöget zárnak be az óramutatók pontosan 4:00 órakor?',
    options: [
      '120° (tompaszög)',
      '90° (derékszög)',
      '150° (tompaszög)',
      '60° (hegyesszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="25" y1="25" x2="38" y2="32.5" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '4:00-kor a 12-es és a 4-es között 4 óraköz van: 4 × 30° = 120°. Mivel 120° nagyobb 90°-nál és kisebb 180°-nál, ez tompaszög.',
    hint: '4 óraköz távolság: 4 × 30° = ?',
    breakdown: [
      { label: 'Különbség', value: '4 óraköz' },
      { label: 'Számolás', value: '4 × 30° = 120° (tompaszög)' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Hány fokot fordul el a percmutató pontosan 1 perc alatt?',
    options: [
      '6° (mert 360° : 60 = 6°)',
      '1°',
      '5° (mert 1 perc = 5 fok)',
      '30°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <circle cx="22" cy="22" r="18" stroke="#94a3b8" strokeWidth="1" />
        <line x1="22" y1="22" x2="22" y2="6" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="22" x2="23.9" y2="6.3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="22" r="2" fill="#0284c7" />
      </svg>
    ),
    explanation: 'A percmutató 1 óra (60 perc) alatt tesz meg egy teljes 360°-os kört. Egyetlen perc alatt 360° : 60 = 6°-ot fordul el.',
    hint: 'A teljes kört (360°) oszd el a 60 perccel!',
    breakdown: [
      { label: '1 óra', value: '60 perc = 360°' },
      { label: '1 perc', value: '360° : 60 = 6°' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Szögméréskor mi a legfontosabb első lépés a szögmérő elhelyezésénél?',
    options: [
      'A szögmérő középpontját (alappontját) pontosan a szög csúcsára kell illeszteni',
      'A szögmérő szélét a szög szárai fölé kell tartani lebegve',
      'Mindig a 90°-os jelzést kell a szög csúcsára tenni',
      'A szög szárait minden mérés előtt le kell törölni'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <path d="M10 32 A25 25 0 0 1 50 32 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="30" cy="32" r="3" fill="#ef4444" />
        <line x1="30" y1="32" x2="48" y2="18" stroke="#f59e0b" strokeWidth="2" />
        <line x1="30" y1="32" x2="55" y2="32" stroke="#f59e0b" strokeWidth="2" />
      </svg>
    ),
    explanation: 'A szög helyes mérésének alapja: a szögmérő jelölt középpontját pontosan a szög csúcsára illesztjük, majd az alapvonalát ráfektetjük az egyik szögszárra.',
    hint: 'A szögmérő alján lévő kis lyuk vagy kereszt a csúcsra való illesztést szolgálja.',
    breakdown: [
      { label: '1. lépés', value: 'Középpont illesztése a szögcsúcsra' },
      { label: '2. lépés', value: 'Alapvonal (0°) fektetése a szárra' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Peti egy hegyesszöget mért le a szögmérővel, és 140°-ot olvasott le. Mi volt Peti hibája?',
    options: [
      'A rossz skálát nézte: a külső skála helyett a belsőt (vagy fordítva); a helyes érték 180° - 140° = 40° volt',
      'Rosszul számolta össze a centimétereket',
      'Egy hegyesszög lehet 140°-os is, nem hibázott',
      'A szögmérő elromlott'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <path d="M10 32 A22 22 0 0 1 50 32 Z" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
        <line x1="30" y1="32" x2="48" y2="18" stroke="#ef4444" strokeWidth="2" />
        <line x1="30" y1="32" x2="52" y2="32" stroke="#64748b" strokeWidth="2" />
        <circle cx="30" cy="32" r="2.5" fill="#334155" />
      </svg>
    ),
    explanation: 'Mivel a szög hegyesszög (szemmel láthatóan kisebb 90°-nál), nem lehet 140°! A szögmérőn két skála fut ellentétes irányban: arról a skáláról kell olvasni, ahol a fekvő szárnál a 0° van. A helyes érték 40° (180° - 140°).',
    hint: 'Egy hegyesszög nem lehet 90°-nál nagyobb! Keresd meg a 180-ból való kiegészítését.',
    breakdown: [
      { label: 'Hiba', value: 'Rossz skála használata' },
      { label: 'Helyes szög', value: '180° - 140° = 40° (hegyesszög)' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Mekkora a mutatók által bezárt kisebbik szög 5:00 órakor?',
    options: [
      '150° (tompaszög)',
      '120° (tompaszög)',
      '180° (egyenesszög)',
      '100° (tompaszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="8" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="25" y1="25" x2="33" y2="39" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '5:00-kor a 12 és az 5 között 5 óraköz van: 5 × 30° = 150°. Ez tompaszög.',
    hint: '5 óraköz távolság: 5 × 30° = ?',
    breakdown: [
      { label: 'Óraközök', value: '5 óraköz' },
      { label: 'Szög', value: '5 × 30° = 150°' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mekkora szöget zárnak be az óramutatók pontosan 12:00 órakor?',
    options: [
      '0°-os nullszög (egymást fedik a mutatók)',
      '360°-os teljesszög (csak ha egy teljes fordulatot nézünk)',
      'Mindkét fenti válasz geometriai nézőponttól függően elfogadható',
      '90°-os derékszög'
    ],
    correctAnswer: 2,
    figure: (
      <svg className="w-20 h-20 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#d97706" strokeWidth="2" fill="#fffbeb" />
        <line x1="25" y1="25" x2="25" y2="8" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <line x1="25" y1="25" x2="25" y2="12" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <circle cx="25" cy="25" r="2.5" fill="#78350f" />
      </svg>
    ),
    explanation: '12:00-kor mindkét mutató pontosan a 12-esre mutat: a köztük lévő nyílás 0° (nullszög), miközben a teljes körbefordulást nézve 360° is értelmezhető.',
    hint: 'A két mutató pontosan egybeesik a 12-esen.',
    breakdown: [
      { label: 'Állás', value: 'Mindkét mutató a 12-esen' },
      { label: 'Bezárt szög', value: '0° (vagy 360°)' }
    ]
  },

  // ========================================================
  // --- 3. SZINT: SZÖGPÁROK, MŰVELETEK ÉS SOKSZÖGEK ---
  // ========================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Hogyan nevezzük azt a két hegyesszöget, amelyek összege pontosan 90° (pl. 35° és 55°)?',
    options: [
      'Pótszögek',
      'Kiegészítő szögek',
      'Csúcsszögek',
      'Mellékszögek'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="10" y1="32" x2="40" y2="32" stroke="#10b981" strokeWidth="2" />
        <line x1="10" y1="32" x2="10" y2="8" stroke="#10b981" strokeWidth="2" />
        <line x1="10" y1="32" x2="32" y2="15" stroke="#059669" strokeWidth="2" />
        <circle cx="10" cy="32" r="3" fill="#047857" />
      </svg>
    ),
    explanation: 'Pótszögeknek nevezzük azokat a szögeket, amelyek összege derékszöget (90°) alkot: α + β = 90° (kölcsönösen egymás pótszögei).',
    hint: 'Derékszögre (90°-ra) pótolják ki egymást.',
    breakdown: [
      { label: 'Összeg', value: 'α + β = 90°' },
      { label: 'Elnevezés', value: 'Pótszögek' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mekkora a 65°-os szög pótszöge?',
    options: [
      '25° (mert 90° - 65° = 25°)',
      '115° (mert 180° - 65° = 115°)',
      '35° (mert 100° - 65° = 35°)',
      '15°'
    ],
    correctAnswer: 0,
    figure: (
      <div className="text-center font-bold text-emerald-700 text-sm">
        90° - 65° = ?
      </div>
    ),
    explanation: 'A pótszög kiszámításához 90°-ból kivonjuk az adott szöget: 90° - 65° = 25°. Ellenőrzés: 65° + 25° = 90°.',
    hint: 'Mennyit kell adni a 65°-hoz, hogy 90° legyen?',
    breakdown: [
      { label: 'Képlet', value: 'β = 90° - α' },
      { label: 'Számolás', value: '90° - 65° = 25°' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Hogyan nevezzük azokat a szögeket, amelyeknek az összege pontosan 180° (egyenesszög)?',
    options: [
      'Kiegészítő szögek (vagy mellékszögek)',
      'Pótszögek',
      'Csúcsszögek',
      'Homorúszögek'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-14 mx-auto" viewBox="0 0 60 35" fill="none">
        <line x1="5" y1="28" x2="55" y2="28" stroke="#6366f1" strokeWidth="2" />
        <line x1="30" y1="28" x2="45" y2="8" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="30" cy="28" r="3" fill="#3730a3" />
      </svg>
    ),
    explanation: 'Azokat a szögeket, amelyek összege 180°-ot ad (egyenesszöget alkotnak), kiegészítő szögeknek nevezzük. Ha közös száruk és csúcsuk is van, akkor egymás mellékszögei.',
    hint: 'Egyenesszögre (180°-ra) egészítik ki egymást.',
    breakdown: [
      { label: 'Összeg', value: 'α + β = 180°' },
      { label: 'Elnevezés', value: 'Kiegészítő szögek' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Mekkora a 70°-os szög kiegészítő szöge (mellékszöge)?',
    options: [
      '110° (mert 180° - 70° = 110°)',
      '20° (mert 90° - 70° = 20°)',
      '290° (mert 360° - 70° = 290°)',
      '100°'
    ],
    correctAnswer: 0,
    figure: (
      <div className="text-center font-bold text-indigo-700 text-sm">
        180° - 70° = ?
      </div>
    ),
    explanation: 'A kiegészítő szög kiszámításához 180°-ból vonjuk ki a 70°-ot: 180° - 70° = 110°. A 70° hegyesszög mellékszöge mindig tompaszög!',
    hint: 'Mennyi hiányzik 180°-hoz a 70°-ból?',
    breakdown: [
      { label: 'Képlet', value: '180° - α' },
      { label: 'Számolás', value: '180° - 70° = 110°' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Két egyenes metszi egymást. Milyen összefüggés áll fenn a szemközti szögek (csúcsszögek) között?',
    options: [
      'A csúcsszögek mindig egyenlő nagyságúak (α = α\')',
      'A csúcsszögek összege mindig 90°',
      'A csúcsszögek összege mindig 360°',
      'Az egyik mindig kétszer akkora mint a másik'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="8" y1="8" x2="42" y2="32" stroke="#ec4899" strokeWidth="2" />
        <line x1="8" y1="32" x2="42" y2="8" stroke="#ec4899" strokeWidth="2" />
        <circle cx="25" cy="20" r="3" fill="#be185d" />
        <text x="14" y="22" className="text-[10px] font-bold fill-rose-700">α</text>
        <text x="32" y="22" className="text-[10px] font-bold fill-rose-700">α</text>
      </svg>
    ),
    explanation: 'Két metsző egyenes által bezárt szemközti szögeket csúcsszögeknek nevezzük. A csúcsszögek mindig egyenlő nagyságúak, mert mindkettő ugyanannak a szomszédos szögnek a kiegészítő szöge.',
    hint: 'Gondolj egy kinyitott ollóra: a szemközti szárak szimmetrikusan ugyanakkorák.',
    breakdown: [
      { label: 'Csúcsszögek', value: 'Szemközti szögek' },
      { label: 'Szabály', value: 'Mindig egyenlők (α = α\')' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Mekkora egy szabályos (egyenlő oldalú) háromszög mindegyik belső szöge?',
    options: [
      '60° (mert a háromszög belső szögeinek összege 180°, és 180° : 3 = 60°)',
      '90° (mert háromszög)',
      '45°',
      '30°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <polygon points="22,6 6,38 38,38" stroke="#d97706" strokeWidth="2" fill="#fef3c7" />
        <text x="22" y="32" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">60°</text>
      </svg>
    ),
    explanation: 'Minden háromszög belső szögeinek összege 180°. Mivel a szabályos háromszög mindhárom szöge egyenlő: 180° : 3 = 60°. Mindhárom szöge hegyesszög.',
    hint: 'A három egyenlő szög összege 180°: oszd el hárommal!',
    breakdown: [
      { label: 'Összeg', value: '180°' },
      { label: '3 egyenlő szög', value: '180° : 3 = 60°' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Egy 80°-os szöget a szögfelezője két egyenlő részre oszt. Mekkorák az így keletkezett szögek?',
    options: [
      '40° és 40° (mert 80° : 2 = 40°)',
      '50° és 30°',
      '20° és 20°',
      '45° és 45°'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
        <line x1="8" y1="32" x2="42" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="8" y1="32" x2="35" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="8" y1="32" x2="40" y2="18" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="8" cy="32" r="3" fill="#d97706" />
      </svg>
    ),
    explanation: 'A szögfelező olyan félegyenes, amely a szög csúcsából indul és pontosan két egyenlő nagyságú részre felezi a szöget: 80° : 2 = 40° mindkét rész.',
    hint: 'A szögfelező pontosan a felére osztja a szöget.',
    breakdown: [
      { label: 'Eredeti szög', value: '80°' },
      { label: 'Felezés', value: '80° : 2 = 40° mindkettő' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Mekkora szöget zárnak be egymással egy négyzet átlói a metszéspontjukban?',
    options: [
      'Pontosan 90°-ot (merőlegesek egymásra)',
      '60°-ot',
      '45°-ot',
      '180°-ot'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <rect x="8" y="8" width="28" height="28" stroke="#059669" strokeWidth="1.5" fill="#d1fae5" />
        <line x1="8" y1="8" x2="36" y2="36" stroke="#047857" strokeWidth="1.5" />
        <line x1="8" y1="36" x2="36" y2="8" stroke="#047857" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="2.5" fill="#047857" />
      </svg>
    ),
    explanation: 'A négyzet egyik fontos tulajdonsága, hogy átlói felezik egymást és egymásra merőlegesek, azaz pontosan 90°-os derékszöget zárnak be egymással.',
    hint: 'Gondolj a négyzet tökéletes szimmetriájára: a két átló keresztben derékszöget alkot.',
    breakdown: [
      { label: 'Négyzet átlói', value: 'Merőlegesen metszik egymást' },
      { label: 'Bezárt szög', value: '90° (derékszög)' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Két szomszédos szög összege 180° (mellékszögek). Ha az egyik szög 45°-os, mekkora a másik?',
    options: [
      '135° (mert 180° - 45° = 135°)',
      '45° (mert egyenlőek)',
      '90° (mert derékszög)',
      '145°'
    ],
    correctAnswer: 0,
    figure: (
      <div className="text-center font-bold text-indigo-700 text-sm">
        180° - 45° = ?
      </div>
    ),
    explanation: 'Mivel mellékszögek, összegük 180°: 180° - 45° = 135°. Ez egy tompaszög.',
    hint: 'Mennyivel kell kiegészíteni a 45°-ot 180°-ra?',
    breakdown: [
      { label: 'Összeg', value: '180°' },
      { label: 'Számolás', value: '180° - 45° = 135°' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Ha egy pont körül több szög teljesen kitölti a síkot (körbeérnek), mennyi a szögek összege összesen?',
    options: [
      'Mindig pontosan 360° (egy teljesszög)',
      'Mindig 180°',
      'Mindig 90°',
      'A szögek számától függ, lehet akármekkora'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-18 h-18 mx-auto" viewBox="0 0 45 45" fill="none">
        <circle cx="22" cy="22" r="15" stroke="#0891b2" strokeWidth="1.5" fill="#ecfeff" />
        <line x1="22" y1="22" x2="22" y2="7" stroke="#0891b2" strokeWidth="1.5" />
        <line x1="22" y1="22" x2="35" y2="28" stroke="#0891b2" strokeWidth="1.5" />
        <line x1="22" y1="22" x2="9" y2="28" stroke="#0891b2" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="2.5" fill="#0e7490" />
      </svg>
    ),
    explanation: 'Egy pont körüli teljes körbefordulás mindig teljesszög, azaz pontosan 360°. Így a pont körüli összes szög összege mindig 360°.',
    hint: 'Gondolj egy egész körre vagy egy felszeletelt tortára: a szeletek együtt egy egészet (360°) adnak.',
    breakdown: [
      { label: 'Teljes kör', value: '360°' },
      { label: 'Pont körüli szögek', value: 'Összegük = 360°' }
    ]
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-angle-types',
    title: 'Szögfajták nagyságuk szerint',
    badge: 'Alapfogalmak',
    color: 'amber',
    icon: <Compass className="w-5 h-5 text-amber-600" />,
    items: [
      { label: 'Nullszög', value: 'α = 0° (a két szár egybeesik)' },
      { label: 'Hegyesszög', value: '0° < α < 90° (kisebb mint a derékszög)' },
      { label: 'Derékszög', value: 'α = 90° (egymásra merőleges szárak)' },
      { label: 'Tompaszög', value: '90° < α < 180° (nagyobb a derékszögnél)' },
      { label: 'Egyenesszög', value: 'α = 180° (a szárak egyenest alkotnak)' },
      { label: 'Homorúszög', value: '180° < α < 360° (nagyobb az egyenesszögnél)' },
      { label: 'Teljesszög', value: 'α = 360° (1 teljes fordulat)' }
    ]
  },
  {
    id: 'cs-clock-angles',
    title: 'Szögek az óralapon',
    badge: 'Óralap',
    color: 'emerald',
    icon: <Clock className="w-5 h-5 text-emerald-600" />,
    items: [
      { label: '1 teljes kör', value: '360° az egész óralap' },
      { label: '1 óraköz', value: '360° : 12 = 30° minden két szám között' },
      { label: '1 perc fordulás', value: '360° : 60 = 6° percenként' },
      { label: '3:00 és 9:00', value: '3 × 30° = 90° (derékszög)' },
      { label: '6:00', value: '6 × 30° = 180° (egyenesszög)' },
      { label: '1:00 és 2:00', value: '30° és 60° (hegyesszögek)' },
      { label: '4:00 és 5:00', value: '120° és 150° (tompaszögek)' }
    ]
  },
  {
    id: 'cs-angle-pairs',
    title: 'Szögpárok és összefüggések',
    badge: 'Összefüggések',
    color: 'purple',
    icon: <Shapes className="w-5 h-5 text-purple-600" />,
    items: [
      { label: 'Pótszögek', value: 'α + β = 90° (összegük derékszög)' },
      { label: 'Kiegészítő szögek', value: 'α + β = 180° (összegük egyenesszög)' },
      { label: 'Mellékszögek', value: 'Közös csúcs és szár, egyenesre fekszenek: összegük 180°' },
      { label: 'Csúcsszögek', value: 'Metsző egyenesek szemközti szögei: mindig egyenlőek (α = α\')' },
      { label: 'Szögfelező', value: 'A szögtartományt két egyenlő félre osztja (α : 2)' },
      { label: 'Szabályos háromszög', value: 'Belső szögei mind 60°-osak (összegük 180°)' },
      { label: 'Négyzet', value: 'Mind a 4 belső szöge 90°-os derékszög' }
    ]
  }
];

const levelConfigs = {
  1: {
    title: '1. Szint: A szög fogalma, részei és alapvető fajtái',
    description: 'Szögcsúcs, szögszárak, szögfajták 0°-tól 360°-ig: hegyes, derék, tompa, egyenes, homorú szög.',
    badgeText: 'Alapfogalmak',
    color: 'amber' as const
  },
  2: {
    title: '2. Szint: Szögek az óralapon és szögmérés',
    description: 'Óraközök (30°), percek elfordulása (6°), mutatóállások és a szögmérő helyes használata.',
    badgeText: 'Óralap & Mérés',
    color: 'emerald' as const
  },
  3: {
    title: '3. Szint: Szögpárok, műveletek és sokszögek szögei',
    description: 'Pótszögek (90°), kiegészítő szögek (180°), csúcsszögek, mellékszögek, szögfelezés és szabályos alakzatok.',
    badgeText: 'Szögpárok & Számolás',
    color: 'purple' as const
  }
};

export const AnglesQuiz: React.FC<AnglesQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      topicId="g5-geom-angles-quiz"
      title="A Szög Kvíz és Gyakorlás"
      subtitle="Teszteld tudásodat a szögfajtákról, szögmérésről, óralap-feladatokról és szögpárokról 3 szinten!"
      badge="📐 5. Osztály • III. Geometria"
      themeColor="amber"
      levels={levelConfigs}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó szögpárokat és óraállásokat!',
          description: 'Párosítsd a szögfajtákat foktartományukkal, óralap-mutatóállásokkal és szögpárokkal 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <AnglesMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a szögeket kategóriáik szerint!',
          description: 'Rendezd a szögeket hegyes/derék/tompa, domború/homorú, illetve óralap-állások szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <AnglesSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default AnglesQuiz;
