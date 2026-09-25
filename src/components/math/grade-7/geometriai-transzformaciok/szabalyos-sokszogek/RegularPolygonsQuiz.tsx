import React from 'react';
import {
  QuizTemplate,
  QuizLevelConfig,
  DifficultyLevel,
  CheatSheetCardProps
} from '../QuizTemplate';
import { RegularPolygonsMatcher } from './RegularPolygonsMatcher';
import { RegularPolygonsSorter } from './RegularPolygonsSorter';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface RegularPolygonsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCardProps[] = [
  {
    title: 'A Szabályos Sokszög Definíciója és Szögei',
    category: 'Alapfogalmak',
    color: 'orange',
    badge: 'Kettős feltétel',
    points: [
      'Szabályos sokszög: minden oldala egyenlő hosszú ÉS minden belső szöge egyenlő nagyságú.',
      'A belső szögek összege: Sn = (n - 2) · 180° (mivel n - 3 átló n - 2 db háromszögre bontja).',
      'Egy belső szög: α = (n - 2) · 180° / n.',
      'Mindig konvex síkidom (egyetlen belső szöge sem nagyobb 180°-nál).'
    ],
    formula: 'Sn = (n - 2) · 180°  |  α = Sn / n'
  },
  {
    title: 'Külső és Középponti Szögek Csodája',
    category: 'Szögek',
    color: 'blue',
    badge: 'Középpont és külső',
    points: [
      'A belső és a hozzá tartozó külső szög mellékszögek: α + α\' = 180°.',
      'Bármely konvex sokszög külső szögeinek összege mindig pontosan 360°!',
      'Egy külső szög: α\' = 360° / n = 180° - α.',
      'A köré írt kör középpontjából egy oldalhoz tartozó középponti szög: ω = 360° / n = α\'.'
    ],
    formula: 'α\' = ω = 360° / n  |  α + α\' = 180°'
  },
  {
    title: 'Átlók Száma Képletek',
    category: 'Kombinatorika',
    color: 'indigo',
    badge: 'Átlók',
    points: [
      'Egy csúcsból induló átlók: n - 3 darab (önmagába és a 2 szomszédba él vezet).',
      'Összes átló száma: An = n · (n - 3) / 2 (azért osztunk 2-vel, mert minden átlót kétszer számolnánk).',
      'Háromszög (n = 3): 0 átló | Négyzet (n = 4): 2 átló | Ötszög (n = 5): 5 átló.',
      'Hatszög (n = 6): 9 átló | Nyolcszög (n = 8): 20 átló | Tízszög (n = 10): 35 átló.'
    ],
    formula: '1 csúcsból: n - 3  |  Összesen: An = n·(n - 3) / 2'
  },
  {
    title: 'Szimmetriák és Síkparkettázás',
    category: 'Szimmetria',
    color: 'purple',
    badge: 'Tengelyek és síkfedés',
    points: [
      'Minden szabályos n-szögnek pontosan n darab szimmetriatengelye van.',
      'Páros n (4, 6, 8...): középpontosan IS szimmetrikus (átlók metszéspontja a centrum).',
      'Páratlan n (3, 5, 7...): SOHA NEM középpontosan szimmetrikus!',
      'Síkparkettázás: Csak a szabályos 3-szög (60°), négyzet (90°) és hatszög (120°) fedi le önmagában a síkot, mert szögeik osztói a 360°-nak.'
    ],
    formula: 'Tengelyek = n  |  Parkettázás: 60°, 90°, 120°'
  }
];

const quizLevels: Record<DifficultyLevel, QuizLevelConfig> = {
  1: {
    title: '1. Szint: Kezdő – Definíció, Alapképletek és Nevezetes Sokszögek',
    description: 'Sajátítsd el a szabályos sokszögek alapjait, a belső szögek összegét és az alapvető szimmetriákat!',
    badge: 'Kezdő',
    questions: [
      {
        id: 'q1_1',
        title: 'Szabályos sokszög definíciója',
        question: 'Mikor nevezünk egy síkbeli sokszöget szabályos sokszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,10 98,38 82,62 38,62 22,38" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="60" cy="40" r="2" fill="#ea580c" />
          </svg>
        ),
        options: [
          'Ha minden oldala egyenlő hosszú ÉS minden belső szöge egyenlő nagyságú',
          'Ha csak az összes oldala egyenlő hosszú',
          'Ha van szimmetriatengelye és legalább 4 oldala van',
          'Ha minden szöge pontosan 90 fokos'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos sokszög definíciója szerint egyszerre kell egyenlő oldalúnak és egyenlő szögűnek lennie.',
        hint: 'Gondolj a rombuszra és a téglalapra: önmagában az egyenlő oldal vagy egyenlő szög még nem elég!'
      },
      {
        id: 'q1_2',
        title: 'Négyzet belső szögeinek összege',
        question: 'Mennyi a szabályos négyszög (négyzet) belső szögeinek összege?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <rect x="40" y="15" width="40" height="40" rx="3" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="38" textAnchor="middle" className="text-xs font-bold fill-orange-700">90°</text>
          </svg>
        ),
        options: ['180°', '360°', '540°', '720°'],
        correctAnswer: 1,
        explanation: 'Sn = (n - 2) · 180° = (4 - 2) · 180° = 2 · 180° = 360°. (4 db 90°-os szög: 4 · 90° = 360°).',
        hint: 'A négyzetnek 4 db 90°-os derékszöge van.'
      },
      {
        id: 'q1_3',
        title: 'Szabályos háromszög egy belső szöge',
        question: 'Hány fokos egy szabályos (egyenlő oldalú) háromszög egyetlen belső szöge?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,12 30,58 90,58" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="48" textAnchor="middle" className="text-xs font-bold fill-orange-700">α = ?</text>
          </svg>
        ),
        options: ['45°', '60°', '90°', '120°'],
        correctAnswer: 1,
        explanation: 'Minden háromszög belső szögösszege 180°. Mivel a 3 szög egyenlő: 180° / 3 = 60°.',
        hint: 'A háromszög belső szögösszegét oszd el 3-mal.'
      },
      {
        id: 'q1_4',
        title: 'Szabályos háromszög átlóinak száma',
        question: 'Hány átlója van egy szabályos háromszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,12 30,58 90,58" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="60" cy="12" r="3" fill="#ea580c" />
            <circle cx="30" cy="58" r="3" fill="#ea580c" />
            <circle cx="90" cy="58" r="3" fill="#ea580c" />
          </svg>
        ),
        options: ['0 darab', '1 darab', '2 darab', '3 darab'],
        correctAnswer: 0,
        explanation: 'A háromszögnek 0 darab átlója van! Az átló nem szomszédos csúcsokat köt össze, de a háromszögben minden csúcspár szomszédos. Képlettel: An = 3 · (3 - 3) / 2 = 0.',
        hint: 'Tudsz-e a háromszögben olyan két csúcsot összekötni, ami nem maga a háromszög oldala?'
      },
      {
        id: 'q1_5',
        title: 'Szabályos ötszög belső szögösszege',
        question: 'Mennyi a szabályos ötszög belső szögeinek összege (S₅)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,10 98,38 82,62 38,62 22,38" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="42" textAnchor="middle" className="text-xs font-bold fill-orange-700">S₅ = ?</text>
          </svg>
        ),
        options: ['360°', '540°', '720°', '900°'],
        correctAnswer: 1,
        explanation: 'Sn = (n - 2) · 180°. Ötszögnél n = 5: S₅ = (5 - 2) · 180° = 3 · 180° = 540°.',
        hint: 'Egy csúcsból 2 átlóval 3 háromszögre vágható: 3 · 180°.'
      },
      {
        id: 'q1_6',
        title: 'Szabályos ötszög egy belső szöge',
        question: 'Hány fokos a szabályos ötszög egyetlen belső szöge (α)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,10 98,38 82,62 38,62 22,38" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="42" textAnchor="middle" className="text-sm font-bold fill-orange-700">α = ?</text>
          </svg>
        ),
        options: ['90°', '100°', '108°', '120°'],
        correctAnswer: 2,
        explanation: 'A belső szögösszeg 540°. Mivel 5 egyenlő szög van: α = 540° / 5 = 108°.',
        hint: 'Oszd el az 540°-ot 5 felé!'
      },
      {
        id: 'q1_7',
        title: 'Miért nem szabályos az általános rombusz?',
        question: 'Miért NEM szabályos sokszög egy általános rombusz, ha minden oldala egyenlő hosszú?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,12 95,35 60,58 25,35" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">Rombusz</text>
          </svg>
        ),
        options: [
          'Mert a szögei nem feltétlenül egyenlők (van hegyesszöge és tompaszöge)',
          'Mert az átlói nem metszik egymást derékszögben',
          'Mert a szemközti oldalai párhuzamosak',
          'Mert páros a csúcsszáma'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos sokszögnek egyenlő szögűnek is kell lennie. Az általános rombusznak csak az oldalai egyenlők, de a szögei különbözőek (pl. 60° és 120°).',
        hint: 'A szabályosság mindkét tulajdonságot (oldal + szög) megköveteli!'
      },
      {
        id: 'q1_8',
        title: 'Szabályos hatszög szimmetriatengelyei',
        question: 'Hány darab szimmetriatengelye van egy szabályos hatszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="45,15 75,15 90,35 75,55 45,55 30,35" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="60" cy="35" r="2.5" fill="#ea580c" />
          </svg>
        ),
        options: ['3 darab', '6 darab', '9 darab', '12 darab'],
        correctAnswer: 1,
        explanation: 'Bármely szabályos n-szögnek pontosan n darab szimmetriatengelye van. Szabályos hatszögnél ez pontosan 6 darab (3 db szemközti csúcsokat, 3 db szemközti oldalfelezőket köt össze).',
        hint: 'A szabályos sokszög szimmetriatengelyeinek száma mindig megegyezik az oldalszámával (n).'
      },
      {
        id: 'q1_9',
        title: 'Négyzet átlóinak száma',
        question: 'Hány átlója van a négyzetnek (szabályos 4-szögnek)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <rect x="42" y="17" width="36" height="36" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <line x1="42" y1="17" x2="78" y2="53" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="78" y1="17" x2="42" y2="53" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        ),
        options: ['1 darab', '2 darab', '4 darab', '6 darab'],
        correctAnswer: 1,
        explanation: 'A négyzetnek pontosan 2 átlója van. Képlettel: A₄ = 4 · (4 - 3) / 2 = 4 · 1 / 2 = 2.',
        hint: 'Kösd össze a szemközti csúcsokat képzeletben!'
      },
      {
        id: 'q1_10',
        title: 'Négyzet középponti szöge',
        question: 'Mekkora a középponti szög (ω) egy négyzetben?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <rect x="42" y="17" width="36" height="36" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <line x1="60" y1="35" x2="42" y2="17" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="60" y1="35" x2="78" y2="17" stroke="#0284c7" strokeWidth="1.5" />
            <text x="60" y="30" textAnchor="middle" className="text-[10px] font-bold fill-sky-700">ω = ?</text>
          </svg>
        ),
        options: ['45°', '60°', '90°', '180°'],
        correctAnswer: 2,
        explanation: 'A középponti szög: ω = 360° / n = 360° / 4 = 90°.',
        hint: 'A kör 360°-át kell elosztani 4 egyenlő részre.'
      }
    ]
  },
  2: {
    title: '2. Szint: Haladó – Külső Szögek, Hatszög Sugara és Átlók Számítása',
    description: 'Számíts átlókat, külső és középponti szögeket, és vizsgáld meg a sokszögek szimmetriáit!',
    badge: 'Haladó',
    questions: [
      {
        id: 'q2_1',
        title: 'Szabályos hatszög egy belső szöge',
        question: 'Hány fokos a szabályos hatszög egyetlen belső szöge (α)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="45,15 75,15 90,35 75,55 45,55 30,35" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-700">α = ?</text>
          </svg>
        ),
        options: ['108°', '120°', '135°', '140°'],
        correctAnswer: 1,
        explanation: 'Belső szögek összege: (6 - 2) · 180° = 720°. Egy belső szög: 720° / 6 = 120°.',
        hint: '720° / 6 = 120°.'
      },
      {
        id: 'q2_2',
        title: 'Szabályos hatszög külső szöge',
        question: 'Mekkora a szabályos hatszög egy külső szöge (α\')?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <line x1="20" y1="55" x2="105" y2="55" stroke="#64748b" strokeWidth="1.5" />
            <polygon points="45,15 75,15 90,35 75,55 45,55 30,35" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="88" y="50" className="text-[10px] font-bold fill-sky-700">α\'</text>
          </svg>
        ),
        options: ['45°', '60°', '90°', '120°'],
        correctAnswer: 1,
        explanation: 'A külső szög: α\' = 360° / 6 = 60° (vagy 180° - 120° = 60°).',
        hint: 'A külső szögek összege 360°, oszd el 6-tal!'
      },
      {
        id: 'q2_3',
        title: 'Szabályos nyolcszög belső szöge',
        question: 'Hány fokos a szabályos nyolcszög (STOP tábla) egyetlen belső szöge?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="48,15 72,15 88,31 88,39 72,55 48,55 32,39 32,31" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
            <text x="60" y="38" textAnchor="middle" className="text-[10px] font-black fill-red-800">STOP</text>
          </svg>
        ),
        options: ['120°', '135°', '140°', '144°'],
        correctAnswer: 1,
        explanation: 'S₈ = (8 - 2) · 180° = 6 · 180° = 1080°. Egy szög: 1080° / 8 = 135°. (Külső szögön keresztül: 180° - 360°/8 = 180° - 45° = 135°).',
        hint: 'A külső szöge 360° / 8 = 45°. A belső szög: 180° - 45°.'
      },
      {
        id: 'q2_4',
        title: 'Szabályos nyolcszög összes átlója',
        question: 'Hány átlója van összesen egy szabályos nyolcszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="48,15 72,15 88,31 88,39 72,55 48,55 32,39 32,31" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-700">A₈ = ?</text>
          </svg>
        ),
        options: ['12 darab', '16 darab', '20 darab', '24 darab'],
        correctAnswer: 2,
        explanation: 'A₈ = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 40 / 2 = 20 darab átló.',
        hint: 'Használd a képletet: An = n · (n - 3) / 2.'
      },
      {
        id: 'q2_5',
        title: 'Egy csúcsból induló átlók száma',
        question: 'Hány átló húzható egy szabályos hétszög (n = 7) egyetlen csúcsából?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="25" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="60" cy="10" r="3" fill="#ea580c" />
            <text x="60" y="40" textAnchor="middle" className="text-xs font-bold fill-orange-700">n = 7</text>
          </svg>
        ),
        options: ['3 darab', '4 darab', '5 darab', '7 darab'],
        correctAnswer: 1,
        explanation: 'Egy csúcsból induló átlók száma: n - 3 = 7 - 3 = 4 darab.',
        hint: 'Az adott csúcsba és a két közvetlen szomszédba nem húzható átló: n - 3.'
      },
      {
        id: 'q2_6',
        title: 'Szabályos hatszög és köré írt körének sugara',
        question: 'Egy szabályos hatszög oldala a = 6 cm. Mekkora a köré írt kör sugara (R)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="25" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="47.5,13.3 72.5,13.3 85,35 72.5,56.7 47.5,56.7 35,35" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <line x1="60" y1="35" x2="85" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <text x="72" y="32" className="text-[10px] font-bold fill-blue-600">R</text>
          </svg>
        ),
        options: ['3 cm', '6 cm', '12 cm', '6√3 cm'],
        correctAnswer: 1,
        explanation: 'A szabályos hatszög 6 darab egybevágó szabályos háromszögből áll. Így a sugár pontosan egyenlő az oldal hosszával: R = a = 6 cm.',
        hint: 'A hatszög középpontjából a csúcsokhoz húzott szakaszok egyenlő oldalú háromszögeket alkotnak!'
      },
      {
        id: 'q2_7',
        title: 'Középpontos szimmetria feltétele',
        question: 'Mely szabályos sokszögek rendelkeznek szimmetriaközépponttal?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="3" fill="#ea580c" />
            <path d="M 40 35 A 20 20 0 0 1 80 35" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="2 2" />
            <text x="60" y="55" textAnchor="middle" className="text-xs font-bold fill-slate-700">180° forgatás</text>
          </svg>
        ),
        options: [
          'Csak a páros csúcsszámúak (n = 4, 6, 8, ...)',
          'Csak a páratlan csúcsszámúak (n = 3, 5, 7, ...)',
          'Minden szabályos sokszög',
          'Egyetlen szabályos sokszög sem'
        ],
        correctAnswer: 0,
        explanation: 'Csak a páros csúcsszámú szabályos sokszögek középpontosan szimmetrikusak, mert 180°-os elforgatással egy szemközti csúcs a másik szemközti csúcs helyére kerül. Páratlan csúcsszámnál nincs szemközti csúcs (fejtetőre állna az alakzat).',
        hint: 'Gondolj a szabályos háromszögre: 180°-os forgatásra lefelé mutat a csúcsa, nem önmaga!'
      },
      {
        id: 'q2_8',
        title: 'Külső szögek összege tétel',
        question: 'Mennyi bármely konvex sokszög (pl. egy szabályos 12-szög) külső szögeinek összege?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="22" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-mono font-bold fill-orange-800">∑ α\' = ?</text>
          </svg>
        ),
        options: ['180°', '360°', '720°', 'Oldalszámtól függően változik'],
        correctAnswer: 1,
        explanation: 'Ez a geometria egyik legszebb tétele: BÁRMELY konvex sokszög külső szögeinek összege MINDIG PONTOSAN 360°, teljesen függetlenül az oldalszámtól!',
        hint: 'Ha körbejárod a sokszög határát, pontosan egy teljes fordulatot (360°) teszel meg.'
      },
      {
        id: 'q2_9',
        title: 'Oldalszám meghatározása külső szögből',
        question: 'Egy szabályos sokszög egyetlen külső szöge α\' = 45°. Hány oldala van a sokszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <line x1="20" y1="50" x2="100" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <line x1="60" y1="50" x2="85" y2="25" stroke="#ea580c" strokeWidth="2" />
            <text x="72" y="44" className="text-[10px] font-bold fill-sky-700">45°</text>
          </svg>
        ),
        options: ['6 oldala', '8 oldala', '10 oldala', '12 oldala'],
        correctAnswer: 1,
        explanation: 'Mivel a külső szögek összege 360°, az oldalszám: n = 360° / α\' = 360° / 45° = 8 (szabályos nyolcszög).',
        hint: 'Oszd el a 360°-ot 45°-kal!'
      },
      {
        id: 'q2_10',
        title: 'Síkparkettázás szabályos sokszögekkel',
        question: 'Az alábbi szabályos sokszögek közül melyik három képes ÖNMAGÁBAN hézagmentesen lefedni a síkot?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <rect x="25" y="25" width="20" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <rect x="45" y="25" width="20" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <rect x="65" y="25" width="20" height="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
          </svg>
        ),
        options: [
          'Szabályos 3-szög (60°), négyzet (90°) és szabályos 6-szög (120°)',
          'Négyzet (90°), szabályos 5-szög (108°) és szabályos 6-szög (120°)',
          'Szabályos 3-szög (60°), szabályos 6-szög (120°) és szabályos 8-szög (135°)',
          'Bármely szabályos sokszög alkalmas a sík csempézésére'
        ],
        correctAnswer: 0,
        explanation: 'Csak akkor fedhető le a sík rések és átfedés nélkül, ha a csúcsoknál találkozó belső szögek összege 360° (vagyis a belső szög osztója a 360°-nak). 360/60 = 6, 360/90 = 4, 360/120 = 3. Más szabályos sokszögre ez nem teljesül.',
        hint: 'Melyik belső szögek osztják maradék nélkül a 360°-ot?'
      }
    ]
  },
  3: {
    title: '3. Szint: Mester – Algebrai Következtetések, Kombinatorika és Szögfüggvények',
    description: 'Bonyolultabb geometriai összefüggések, egyenletek felírása és mester szintű számítások!',
    badge: 'Mester',
    questions: [
      {
        id: 'q3_1',
        title: 'Belső szögösszegből oldalszám',
        question: 'Egy szabályos sokszög belső szögeinek összege Sn = 1440°. Hány oldala van a sokszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="24" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-800">Sn = 1440°</text>
          </svg>
        ),
        options: ['8', '9', '10', '12'],
        correctAnswer: 2,
        explanation: '(n - 2) · 180° = 1440° ⟹ n - 2 = 1440° / 180° = 8 ⟹ n = 8 + 2 = 10 (tízszög).',
        hint: 'Oszd el az 1440-et 180-nal, majd adj hozzá 2-t!'
      },
      {
        id: 'q3_2',
        title: 'Belső szögből átlók száma',
        question: 'Egy szabályos sokszög egyetlen belső szöge α = 150°. Hány átlója van összesen?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="24" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-800">α = 150°</text>
          </svg>
        ),
        options: ['35 átló', '44 átló', '54 átló', '65 átló'],
        correctAnswer: 2,
        explanation: 'Külső szög: α\' = 180° - 150° = 30°. Oldalszám: n = 360° / 30° = 12. Átlók száma: A₁₂ = 12 · (12 - 3) / 2 = 12 · 9 / 2 = 54 darab.',
        hint: 'Először számold ki a külső szöget (180° - 150° = 30°), ebből n = 12, majd az átlók számát.'
      },
      {
        id: 'q3_3',
        title: 'Átlók számából a sokszög felismerése',
        question: 'Melyik szabályos sokszögnek van pontosan 9 darab átlója?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="45,15 75,15 90,35 75,55 45,55 30,35" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-800">An = 9</text>
          </svg>
        ),
        options: ['Ötszög', 'Hatszög', 'Hétszög', 'Nyolcszög'],
        correctAnswer: 1,
        explanation: 'n · (n - 3) / 2 = 9 ⟹ n · (n - 3) = 18. Mivel 6 · 3 = 18, így n = 6 (szabályos hatszög).',
        hint: 'Melyik két szám szorzata 18, ha a különbségük 3?'
      },
      {
        id: 'q3_4',
        title: 'Belső szög és külső szög aránya',
        question: 'Egy szabályos sokszög belső szöge ötszöröse a külső szögének (α = 5α\'). Hány oldala van a sokszögnek?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <text x="60" y="38" textAnchor="middle" className="text-sm font-mono font-bold fill-indigo-700">α = 5 · α\'</text>
          </svg>
        ),
        options: ['10', '12', '14', '15'],
        correctAnswer: 1,
        explanation: 'Mivel α + α\' = 180°, ezért 5α\' + α\' = 6α\' = 180° ⟹ α\' = 30°. Oldalszám: n = 360° / 30° = 12 (szabályos 12-szög).',
        hint: 'A belső és külső szög összege 180°. 6 egyenlő részre oszlik.'
      },
      {
        id: 'q3_5',
        title: 'Szabályos tízszög belső és középponti szöge',
        question: 'Mennyi a szabályos tízszög (dekagon) belső szöge (α) és középponti szöge (ω)?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <circle cx="60" cy="35" r="23" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="60" y="39" textAnchor="middle" className="text-xs font-bold fill-orange-800">n = 10</text>
          </svg>
        ),
        options: [
          'α = 144° és ω = 36°',
          'α = 140° és ω = 40°',
          'α = 150° és ω = 30°',
          'α = 135° és ω = 45°'
        ],
        correctAnswer: 0,
        explanation: 'Középponti szög: ω = 360° / 10 = 36°. Belső szög: α = 180° - 36° = 144°.',
        hint: 'A középponti szög 360° / 10 = 36°.'
      },
      {
        id: 'q3_6',
        title: 'Új átlók száma csúcs hozzáadásakor',
        question: 'Ha egy n-oldalú sokszög helyett egy (n + 1) oldalú sokszöget vizsgálunk, hány új átló keletkezik?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <text x="60" y="38" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">A_{`n+1`} - A_n = ?</text>
          </svg>
        ),
        options: ['1 db', 'n - 2 db', 'n - 1 db', 'n db'],
        correctAnswer: 2,
        explanation: 'Az új csúcsból n - 2 darab átló húzható a korábbi nem szomszédos csúcsokba, és a korábbi oldal, amely közé az új csúcs beékelődött, most maga is átlóvá válik (+1 db). Így összesen (n - 2) + 1 = n - 1 új átló keletkezik.',
        hint: 'Nézd meg konkrét számmal: háromszögből (0) négyszög (2): 2 - 0 = 2 = 3 - 1; négyszögből (2) ötszög (5): 5 - 2 = 3 = 4 - 1.'
      },
      {
        id: 'q3_7',
        title: 'Lehet-e a belső szög 110°?',
        question: 'Létezik-e olyan szabályos sokszög, amelynek egyetlen belső szöge pontosan 110°?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <text x="60" y="38" textAnchor="middle" className="text-xs font-mono font-bold fill-rose-600">α = 110° ?</text>
          </svg>
        ),
        options: [
          'Nem, mert a külső szög 70° lenne, és a 360° nem osztható 70°-kal maradék nélkül',
          'Igen, ez a szabályos hétszög',
          'Igen, ez a szabályos kilencszög',
          'Nem, mert a szabályos sokszögek belső szöge mindig 90°-nál kisebb'
        ],
        correctAnswer: 0,
        explanation: 'Ha α = 110°, akkor a külső szög α\' = 180° - 110° = 70° lenne. Az oldalszám n = 360° / 70° = 36/7 ≈ 5,14, ami nem pozitív egész szám, így ilyen szabályos sokszög NEM létezik!',
        hint: 'A külső szögnek maradék nélkül osztania kell a 360°-ot.'
      },
      {
        id: 'q3_8',
        title: 'Szabályos ötszög átlói által bezárt alakzat',
        question: 'Ha egy szabályos ötszög összes átlóját berajzoljuk, milyen alakzatot határoznak meg a középpont körül?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="60,10 98,38 82,62 38,62 22,38" fill="none" stroke="#ea580c" strokeWidth="1.5" />
            <polygon points="60,10 82,62 22,38 98,38 38,62" fill="#ffedd5" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        ),
        options: [
          'Egy fordított állású (180°-kal elforgatott) kisebb szabályos ötszöget',
          'Egy azonos állású szabályos hatszöget',
          'Egy szabályos háromszöget',
          'Egy négyzetet'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos ötszög átlói egy ötágú csillagot (pentagrammát) alkotnak, amelynek közepén egy kisebb szabályos ötszög keletkezik, mely éppen fejjel lefelé (180°-kal elforgatva) áll a nagy ötszöghöz képest.',
        hint: 'Nézd meg az ábrát: a csillag szárai a centrumban egy ötszöget zárnak közre, melynek a csúcsa lefelé néz!'
      },
      {
        id: 'q3_9',
        title: 'Szabályos nyolcszög belső és külső összegének aránya',
        question: 'Mennyi a szabályos nyolcszög belső szögösszegének és külső szögösszegének aránya?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <text x="60" y="38" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">S₈ : ∑ α\' = ?</text>
          </svg>
        ),
        options: ['2 : 1', '3 : 1', '4 : 1', '8 : 1'],
        correctAnswer: 1,
        explanation: 'A nyolcszög belső szögösszege S₈ = (8 - 2) · 180° = 1080°. A külső szögösszeg mindig 360°. Az arány: 1080° : 360° = 3 : 1.',
        hint: '1080° osztva 360°-kal = 3.'
      },
      {
        id: 'q3_10',
        title: 'Miért a szabályos hatszög a méhek választása?',
        question: 'Miért pont szabályos hatszög alapú sejteket építenek a méhek a lépben a szabályos háromszög vagy a négyzet helyett?',
        figure: (
          <svg viewBox="0 0 120 70" className="w-28 h-16 mx-auto">
            <polygon points="50,20 70,20 80,35 70,50 50,50 40,35" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="60" y="38" textAnchor="middle" className="text-xs">🐝</text>
          </svg>
        ),
        options: [
          'Mert azonos alapterület mellett a hatszög kerülete a legkisebb, így ezzel takarítják meg a legtöbb viaszt',
          'Mert a háromszögek nem fedik le a síkot',
          'Mert a négyzetek túl sok mézet tárolnának',
          'Mert a hatszögnek van a legtöbb szimmetriatengelye'
        ],
        correctAnswer: 0,
        explanation: 'Az úgynevezett „méhsejt-sejtés” (Hales-tétel) kimondja: a síkot hézagmentesen lefedő alakzatok közül a szabályos hatszög biztosítja a legkisebb kerület/terület arányt. Így a legkevesebb építőanyagból (viaszból) lehet a legnagyobb térfogatú méztárolót megépíteni.',
        hint: 'Gondolj az energiatakarékosságra és az építőanyagra (viasz).'
      }
    ]
  }
};

export const RegularPolygonsQuiz: React.FC<RegularPolygonsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-regular-polygons-quiz"
      documentId="7_osztaly_szabalyos_sokszogek_kviz"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      title="Szabályos Sokszögek Kvíz"
      subtitle="Belső és külső szögek, átlók száma, szimmetriák és síkparkettázás 30 gondosan felépített feladattal"
      themeColor="orange"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      pdfFilename="7_osztaly_szabalyos_sokszogek_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(level, onNext, onRules) => (
        <RegularPolygonsMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onNext, onRules) => (
        <RegularPolygonsSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
