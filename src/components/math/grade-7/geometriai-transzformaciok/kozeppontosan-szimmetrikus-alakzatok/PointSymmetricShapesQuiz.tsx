import React from 'react';
import {
  QuizTemplate,
  QuizLevelConfig,
  DifficultyLevel,
  CheatSheetCardProps
} from '../QuizTemplate';
import { PointSymmetricShapesMatcher } from './PointSymmetricShapesMatcher';
import { PointSymmetricShapesSorter } from './PointSymmetricShapesSorter';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface PointSymmetricShapesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCardProps[] = [
  {
    title: 'A Középpontos Szimmetria Lényege',
    category: 'Alapfogalmak',
    color: 'rose',
    badge: '180°-os forgatás',
    points: [
      'Egy síkidom középpontosan szimmetrikus, ha van olyan O pont, amelyre tükrözve önmagát adja: T_O(A) = A.',
      'A síkbeli pontra tükrözés egyenértékű az O pont körüli 180°-os forgatással.',
      'A síkbeli középpontos tükrözés megtartja a körüljárási irányt (irányítástartó transzformáció).',
      'Minden korlátos alakzatnak legfeljebb 1 szimmetriaközéppontja lehet.'
    ],
    formula: 'T_O(A) = A  ⟺  180°-os forgásszimmetria'
  },
  {
    title: 'Nevezetes Geometriai Alakzatok Centrumai',
    category: 'Alakzatok',
    color: 'blue',
    badge: 'Centrum helye',
    points: [
      'Szakasz: A szakasz saját F felezőpontja a szimmetriaközéppont.',
      'Egyenes: Az egyenes bármely pontja szimmetriaközéppont (végtelen sok van).',
      'Paralelogrammák: Mind szimmetrikus az átlók metszéspontjára (0 vagy 2 vagy 4 tengellyel).',
      'Háromszögek: EGYETLEN háromszög sem középpontosan szimmetrikus (még a szabályos sem!).',
      'Kör: A kör O geometriai középpontja az egyetlen szimmetriaközéppont.'
    ],
    formula: 'Szakasz centruma: F = (A + B) / 2'
  },
  {
    title: 'Szabályos Sokszögek Aranyszabálya',
    category: 'Sokszögek',
    color: 'purple',
    badge: 'Páros vs. Páratlan',
    points: [
      'Páros oldalszámú szabályos sokszögek (4, 6, 8, 10, 12-szög): MINDIG középpontosan szimmetrikusak a köré írt kör középpontjára.',
      'Páratlan oldalszámú szabályos sokszögek (3, 5, 7, 9-szög): SOHA NEM középpontosan szimmetrikusak, mert minden csúccsal szemben egy oldal fekszik.',
      'A négyzetnek 4 tengelye + 1 centruma van; a szabályos hatszögnek 6 tengelye + 1 centruma van.'
    ],
    formula: 'Szabályos 2n-szög: IGEN  |  Szabályos (2n+1)-szög: NEM'
  },
  {
    title: 'Betűk és Mindennapi Szimbólumok',
    category: 'Alkalmazások',
    color: 'amber',
    badge: 'Nagybetűk',
    points: [
      'Csak középpontosan szimmetrikus: N, S, Z (0 tengely, 1 centrum).',
      'Középpontosan ÉS tengelyesen is szimmetrikus: H, I, O, X (2 merőleges tengely + 1 centrum).',
      'Csak tengelyesen szimmetrikus: A, B, C, D, E, M, T, U, V, W, Y.',
      'Francia kártyalapok: Kétfejű király, dáma, bubi 180°-os forgatási szimmetriával rendelkezik.'
    ],
    formula: 'Csak centrum: {N, S, Z}  |  Centrum + 2 tengely: {H, I, O, X}'
  }
];

const quizLevels: Record<DifficultyLevel, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Alakzatok',
    subtitle: 'Középpontos szimmetria definíciója, 180°-os forgatás, szakasz, kör és betűk felismerése',
    range: '1–10. kérdés',
    focus: 'Alapfogalmak, szimmetriaközéppont definíciója, forgásszög, alapvető alakzatok és betűk',
    color: 'rose',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-300 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    questions: [
      {
        id: 'q1',
        question: 'Mikor mondjuk egy síkbeli alakzatra, hogy középpontosan szimmetrikus egy O pontra nézve?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="4" fill="#e11d48" />
            <text x="106" y="42" className="text-[11px] font-black fill-rose-700">O</text>
            <line x1="40" y1="25" x2="160" y2="65" stroke="#4f46e5" strokeWidth="1.8" />
            <circle cx="40" cy="25" r="3.5" fill="#4f46e5" />
            <circle cx="160" cy="65" r="3.5" fill="#4f46e5" />
            <text x="25" y="25" className="text-[10px] font-bold fill-slate-700">P</text>
            <text x="168" y="70" className="text-[10px] font-bold fill-slate-700">P'</text>
          </svg>
        ),
        options: [
          'Ha az O pontra vonatkozó tükrözés az alakzatot önmagába képezi le (T_O(A) = A)',
          'Ha létezik egy egyenes, amire tükrözve önmagát adja',
          'Ha bármilyen tetszőleges szögű forgatás önmagába viszi át',
          'Ha minden belső szöge és oldala egyenlő'
        ],
        correctAnswer: 0,
        explanation: 'Egy alakzat akkor középpontosan szimmetrikus, ha létezik a síkban olyan O pont (centrum), amelyre tükrözve minden pontjának képe is az alakzathoz tartozik, azaz T_O(A) = A.',
        hint: 'Középpontos szimmetriánál egy kitüntetett O pontra tükrözünk, ami minden megfelelő pontpár felezőpontja.'
      },
      {
        id: 'q2',
        question: 'Hol található egy tetszőleges szakasz szimmetriaközéppontja?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="65" x2="170" y2="25" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="30" cy="65" r="4" fill="#0284c7" />
            <circle cx="170" cy="25" r="4" fill="#0284c7" />
            <circle cx="100" cy="45" r="4" fill="#e11d48" />
            <text x="96" y="35" className="text-[10px] font-bold fill-rose-700">F = ?</text>
          </svg>
        ),
        options: [
          'A szakasz saját felezőpontjában',
          'A szakasz bármelyik végpontjában',
          'A szakasznak nincs szimmetriaközéppontja',
          'A szakasztól független külső pontban'
        ],
        correctAnswer: 0,
        explanation: 'A szakasz szimmetriaközéppontja a szakasz saját felezőpontja (F). Erre a pontra tükrözve a szakasz egyik végpontja a másik végpontjába megy át.',
        hint: 'Melyik az az egyetlen pont a szakaszon, amelytől a két végpont egyenlő távolságra van?'
      },
      {
        id: 'q3',
        question: 'A síkban hány fokos forgatással egyenértékű a szimmetriaközéppont körüli középpontos tükrözés?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="4" fill="#e11d48" />
            <path d="M 55,45 A 45,45 0 1,1 145,45" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
            <polygon points="148,43 143,53 138,45" fill="#f43f5e" />
            <text x="88" y="24" className="text-[12px] font-bold fill-rose-700">α = ?</text>
          </svg>
        ),
        options: [
          '180°-os (félfordulatú) forgatással',
          '90°-os (negyedfordulatú) forgatással',
          '360°-os (teljes) forgatással',
          '45°-os forgatással'
        ],
        correctAnswer: 0,
        explanation: 'A síkbeli pontra tükrözés pontosan megegyezik a pont körüli 180°-os elforgatással. Ezért a középpontos szimmetriát 180°-os forgásszimmetriának is nevezzük.',
        hint: 'Fél fordulatot teszünk meg, így az alakzat fejjel lefelé fordul.'
      },
      {
        id: 'q4',
        question: 'Középpontosan szimmetrikus-e a szabályos háromszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 50,75 150,75" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <circle cx="100" cy="55" r="3.5" fill="#94a3b8" />
            <text x="105" y="55" className="text-[9px] font-bold fill-slate-600">S</text>
          </svg>
        ),
        options: [
          'NEM, egyetlen háromszög sem középpontosan szimmetrikus',
          'IGEN, a súlypontjára középpontosan szimmetrikus',
          'IGEN, a köré írt kör középpontjára szimmetrikus',
          'Csak akkor, ha derékszögű is egyben'
        ],
        correctAnswer: 0,
        explanation: 'A szabályos háromszög NEM középpontosan szimmetrikus! Bár 3 szimmetriatengelye van, 180°-os elforgatás után a felső csúcsa lefelé fog mutatni, tehát nem fedi önmagát. Egyetlen háromszög sem középpontosan szimmetrikus!',
        hint: 'Képzeld el a háromszöget fejjel lefelé: ugyanúgy néz ki?'
      },
      {
        id: 'q5',
        question: 'Hány szimmetriatengelye és hány szimmetriaközéppontja van egy általános paralelogrammának?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 145,70 165,20 55,20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <line x1="35" y1="70" x2="165" y2="20" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="55" y1="20" x2="145" y2="70" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="100" cy="45" r="3.5" fill="#7c3aed" />
            <text x="106" y="43" className="text-[9px] font-bold fill-purple-900">O</text>
          </svg>
        ),
        options: [
          '0 szimmetriatengelye és 1 szimmetriaközéppontja van (az átlók metszéspontja)',
          '2 szimmetriatengelye és 1 szimmetriaközéppontja van',
          '2 szimmetriatengelye és 0 szimmetriaközéppontja van',
          '1 szimmetriatengelye és 1 szimmetriaközéppontja van'
        ],
        correctAnswer: 0,
        explanation: 'Az általános paralelogrammának 0 szimmetriatengelye van (ha tengelyesen tükrözzük, elferdül a másik irányba), viszont van 1 szimmetriaközéppontja: az átlók metszéspontja.',
        hint: 'Tipikus tanulság: egy alakzat lehet úgy is középpontosan szimmetrikus, hogy egyetlen tengelye sincs!'
      },
      {
        id: 'q6',
        question: 'Hány szimmetriaközéppontja és hány szimmetriatengelye van a körlapnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="35" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <circle cx="100" cy="45" r="3.5" fill="#0f766e" />
            <line x1="65" y1="45" x2="135" y2="45" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        ),
        options: [
          'Pontosan 1 szimmetriaközéppontja és végtelen sok szimmetriatengelye van',
          'Végtelen sok szimmetriaközéppontja és végtelen sok tengelye van',
          '1 szimmetriaközéppontja és 2 szimmetriatengelye van',
          'Végtelen sok szimmetriaközéppontja és 1 tengelye van'
        ],
        correctAnswer: 0,
        explanation: 'A körlapnak végtelen sok szimmetriatengelye van (minden átmérője szimmetriatengely), de PONTOSAN EGY szimmetriaközéppontja van: az O geometriai középpontja.',
        hint: 'Figyelj a különbségre: tengelyből végtelen sok van, de középpontból csak egy!'
      },
      {
        id: 'q7',
        question: 'Melyik állítás igaz a nyomtatott „Z” betű szimmetriájára vonatkozóan?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polyline points="70,25 130,25 70,65 130,65" fill="none" stroke="#db2777" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="45" r="3.5" fill="#be185d" />
          </svg>
        ),
        options: [
          'Csak középpontosan szimmetrikus: 0 tengelye és 1 centruma van',
          'Csak tengelyesen szimmetrikus, mert az átlója szimmetriatengely',
          'Középpontosan és tengelyesen is szimmetrikus',
          'Egyáltalán nem szimmetrikus semmilyen értelemben'
        ],
        correctAnswer: 0,
        explanation: 'A nyomtatott Z betűnek egyetlen szimmetriatengelye sincs (tükrözve megfordul), viszont 180°-kal elforgatva pontosan önmagát kapjuk vissza, így középpontosan szimmetrikus!',
        hint: 'Fordítsd meg gondolatban a füzetet fejtetőre: a Z betű továbbra is Z marad!'
      },
      {
        id: 'q8',
        question: 'Melyik állítás igaz a nyomtatott „S” betűre?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <path d="M 125,25 C 105,15 75,18 75,35 C 75,52 125,48 125,65 C 125,78 95,80 75,70" fill="none" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="50" r="3.5" fill="#7e22ce" />
          </svg>
        ),
        options: [
          'Középpontosan szimmetrikus a belső felezőpontjára, de nincs szimmetriatengelye',
          'Függőlegesen tengelyesen szimmetrikus',
          'Vízszintesen tengelyesen szimmetrikus',
          'Egyetlen pontjára sem szimmetrikus'
        ],
        correctAnswer: 0,
        explanation: 'Az S betűnek nincs szimmetriatengelye, de a középpontja körül 180°-kal elforgatva pontosan fedi önmagát, tehát középpontosan szimmetrikus.',
        hint: 'A felső és alsó ív pontosan egymás 180°-os forgatott párja.'
      },
      {
        id: 'q9',
        question: 'Hány szimmetriaközéppontja van egy egyenesnek a síkban?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="65" x2="180" y2="25" stroke="#3b82f6" strokeWidth="2.5" />
            <circle cx="60" cy="55" r="3" fill="#ef4444" />
            <circle cx="100" cy="45" r="3" fill="#ef4444" />
            <circle cx="140" cy="35" r="3" fill="#ef4444" />
          </svg>
        ),
        options: [
          'Végtelen sok (az egyenes BÁRMELY pontja szimmetriaközéppont)',
          'Pontosan 1 darab (az origóban lévő pontja)',
          'Pontosan 2 darab',
          'Egyetlen szimmetriaközéppontja sincs'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az egyenes mindkét irányban végtelen, az egyenes tetszőleges pontjára vonatkozó középpontos tükrözés az egyenest önmagába viszi át. Ezért az egyenesnek végtelen sok szimmetriaközéppontja van.',
        hint: 'Gondolj arra, hogy az egyenes végtelen: ha kijelölsz rajta egy pontot és 180°-kal elforgatod, az egyenes a saját helyén marad.'
      },
      {
        id: 'q10',
        question: 'Melyik betű az alábbiak közül, amely KÖZÉPPONTOSAN ÉS TENGELYESEN IS szimmetrikus?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="80" y1="20" x2="80" y2="70" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
            <line x1="120" y1="20" x2="120" y2="70" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="45" x2="120" y2="45" stroke="#4f46e5" strokeWidth="3.5" />
            <circle cx="100" cy="45" r="3.5" fill="#4338ca" />
          </svg>
        ),
        options: [
          '„H” betű (2 szimmetriatengely + 1 szimmetriaközéppont)',
          '„A” betű (csak függőleges tengelye van)',
          '„N” betű (csak szimmetriaközéppontja van)',
          '„E” betű (csak vízszintes tengelye van)'
        ],
        correctAnswer: 0,
        explanation: 'A nyomtatott H betűnek van egy függőleges és egy vízszintes szimmetriatengelye is (2 tengely), és ezek metszéspontja egyben szimmetriaközéppont is.',
        hint: 'Keresd a két egymásra merőleges tengellyel rendelkező betűt.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Sokszögek, Négyszögek és Alakzatok Osztályozása',
    subtitle: 'Páros és páratlan sokszögek, trapéz, deltoid, téglalap, rombusz és kártyajelek szimmetriája',
    range: '11–20. kérdés',
    focus: 'Sokszögek szimmetriája, négyszögosztályozás, merőleges tengelyek tétele, valós szimbólumok',
    color: 'purple',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    questions: [
      {
        id: 'q11',
        question: 'Mely szabályos sokszögek rendelkeznek szimmetriaközépponttal?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            {/* Hexagon vs Pentagon */}
            <polygon points="60,20 85,32 85,58 60,70 35,58 35,32" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <polygon points="145,20 170,38 160,68 130,68 120,38" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="50" y="82" className="text-[9px] font-bold fill-emerald-800">6-szög (páros)</text>
            <text x="135" y="82" className="text-[9px] font-bold fill-rose-800">5-szög (páratlan)</text>
          </svg>
        ),
        options: [
          'Kizárólag a PÁROS oldalszámú szabályos sokszögek (pl. 4, 6, 8, 10, 12-szög)',
          'Minden szabályos sokszög, mert minden oldaluk és szögük egyenlő',
          'Kizárólag a PÁRATLAN oldalszámú szabályos sokszögek (pl. 3, 5, 7, 9-szög)',
          'Egyetlen szabályos sokszög sem középpontosan szimmetrikus'
        ],
        correctAnswer: 0,
        explanation: 'Egy szabályos sokszög akkor és csak akkor középpontosan szimmetrikus, ha oldalszáma PÁROS. Páros sokszögnél minden csúccsal pontosan szemben egy átellenes csúcs áll, páratlannál viszont egy oldal.',
        hint: 'Számold meg az oldalakat: a páros számúaknál átlósan csúcs csúccsal szemben van.'
      },
      {
        id: 'q12',
        question: 'Miért NEM középpontosan szimmetrikus a szabályos ötszög?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,15 145,35 130,80 70,80 55,35" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="80" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="100" cy="50" r="3" fill="#b45309" />
            <text x="96" y="10" className="text-[10px] font-bold fill-amber-800">Csúcs</text>
            <text x="86" y="88" className="text-[9px] font-bold fill-amber-800">Szemközti oldal</text>
          </svg>
        ),
        options: [
          'Mert minden csúccsal szemben egy oldal fekszik, így 180°-os forgatáskor a csúcs nem csúcsba, hanem oldalba menne át',
          'Mert a belső szögei nem érik el a 120°-ot',
          'Mert az ötszögnek nincsenek szimmetriatengelyei',
          'Mert a szabályos ötszögnek nincs köré írható köre'
        ],
        correctAnswer: 0,
        explanation: 'Páratlan oldalszám esetén minden csúccsal szemben a sokszög egyik oldala fekszik. 180°-os forgatás után a felső csúcs az alsó oldal közepére fordulna, így az alakzat nem fedi önmagát.',
        hint: 'Nézd meg a legfelső csúcsot: alatta nem egy másik csúcs van, hanem a vízszintes oldal felezőpontja.'
      },
      {
        id: 'q13',
        question: 'Középpontosan szimmetrikus-e egy egyenlő szárú (húr-) trapéz?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="65,25 135,25 160,70 40,70" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="15" x2="100" y2="80" stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="85" y="18" className="text-[9px] font-bold fill-red-700">tengely</text>
          </svg>
        ),
        options: [
          'NEM, van 1 szimmetriatengelye, de nincs szimmetriaközéppontja',
          'IGEN, az átlók metszéspontjára középpontosan szimmetrikus',
          'IGEN, a magasságvonalak felezőpontjára szimmetrikus',
          'Csak akkor, ha a szárai merőlegesek az alapra'
        ],
        correctAnswer: 0,
        explanation: 'A húrtrapéznak van 1 szimmetriatengelye (az alapok közös felezőmerőlegese), de 180°-os elforgatás után a hosszabb alap felülre, a rövidebb alulra kerülne, így nem fedi önmagát. Nincs szimmetriaközéppontja!',
        hint: 'Ha fejtetőre állítod a trapézt, a szélesebb alapja kerül felülre, vagyis megváltozik a képe.'
      },
      {
        id: 'q14',
        question: 'Mikor lehet egy konvex deltoid középpontosan szimmetrikus?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 145,35 100,80 55,35" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <line x1="100" y1="5" x2="100" y2="85" stroke="#be185d" strokeWidth="1.2" strokeDasharray="3 2" />
          </svg>
        ),
        options: [
          'Csak akkor, ha rombusz (vagy négyzet), egyébként egy általános deltoid soha nem az',
          'Minden deltoid középpontosan szimmetrikus az átlói metszéspontjára',
          'Csak akkor, ha a két átlója egyenlő hosszú',
          'Csak konkáv deltoid esetén lehetséges'
        ],
        correctAnswer: 0,
        explanation: 'Egy általános deltoidnak csak 2-2 szomszédos oldala egyenlő (a ≠ b), ezért 180°-os forgatás után az a és b oldalak helyet cserélnének. Csak akkor középpontosan szimmetrikus, ha minden oldala egyenlő (a = b), azaz ha rombusz!',
        hint: 'A deltoid főátlója mentén a felső és alsó oldal hossza általában eltér.'
      },
      {
        id: 'q15',
        question: 'Melyik tulajdonság jellemzi a téglalap szimmetriáját a síkban?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="40" y="20" width="120" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <line x1="40" y1="20" x2="160" y2="70" stroke="#0369a1" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="40" y1="70" x2="160" y2="20" stroke="#0369a1" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="100" cy="45" r="3.5" fill="#0284c7" />
            <text x="106" y="42" className="text-[9px] font-bold fill-sky-800">O</text>
          </svg>
        ),
        options: [
          '2 szimmetriatengelye van (az oldalfelezők) és 1 szimmetriaközéppontja (az átlók metszése)',
          '4 szimmetriatengelye és 1 szimmetriaközéppontja van',
          '0 szimmetriatengelye és 1 szimmetriaközéppontja van',
          'Csak a két átlója szimmetriatengely'
        ],
        correctAnswer: 0,
        explanation: 'A téglalapnak 2 szimmetriatengelye van (a szemközti oldalak felezőmerőlegesei) és 1 szimmetriaközéppontja: az átlók metszéspontja. (4 tengelye csak a négyzetnek van).',
        hint: 'A téglalap átlói nem szimmetriatengelyek, csak az oldalfelező egyenesek.'
      },
      {
        id: 'q16',
        question: 'Melyik tulajdonság jellemzi a rombusz szimmetriáját?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="100,10 165,45 100,80 35,45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="10" x2="100" y2="80" stroke="#6d28d9" strokeWidth="1.2" />
            <line x1="35" y1="45" x2="165" y2="45" stroke="#6d28d9" strokeWidth="1.2" />
            <circle cx="100" cy="45" r="3.5" fill="#5b21b6" />
          </svg>
        ),
        options: [
          '2 szimmetriatengelye van (a két átlója) és 1 szimmetriaközéppontja (az átlók metszéspontja)',
          '2 szimmetriatengelye van (az oldalfelezők) és nincs centruma',
          '4 szimmetriatengelye és 2 szimmetriaközéppontja van',
          'Csak középpontosan szimmetrikus, tengelye egyáltalán nincs'
        ],
        correctAnswer: 0,
        explanation: 'A rombusz 2 szimmetriatengelye a két átlója (mivel átlói merőlegesek és szögfelezők), és szimmetriaközéppontja az átlók metszéspontja.',
        hint: 'A rombusz átlói felezik a szögeket és egymásra merőlegesek, így tengelyekként viselkednek.'
      },
      {
        id: 'q17',
        question: 'Melyik állítás igaz a nyomtatott „N” betű szimmetriájára?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polyline points="75,70 75,20 125,70 125,20" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="45" r="3.5" fill="#1d4ed8" />
          </svg>
        ),
        options: [
          'Csak középpontosan szimmetrikus (180°-os forgatásra önmagába megy át, 0 tengely)',
          'Függőleges tengelyre tengelyesen szimmetrikus',
          'Vízszintes tengelyre tengelyesen szimmetrikus',
          'Egyáltalán nem rendelkezik semmilyen szimmetriával'
        ],
        correctAnswer: 0,
        explanation: 'Az N betű tengelyesen NEM szimmetrikus (tükrözve megfordul a ferde szára), viszont a középpontja körül 180°-kal elforgatva pontosan az eredeti N betűt kapjuk vissza.',
        hint: 'Próbáld ki: fordítsd meg fejjel lefelé a képet, és látni fogod, hogy változatlanul N betű marad.'
      },
      {
        id: 'q18',
        question: 'Mi következik abból, ha egy síkbeli alakzatnak van két egymásra merőleges szimmetriatengelye?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="100" y1="10" x2="100" y2="80" stroke="#7c3aed" strokeWidth="2" />
            <line x1="40" y1="45" x2="160" y2="45" stroke="#7c3aed" strokeWidth="2" />
            <circle cx="100" cy="45" r="4" fill="#4338ca" />
            <rect x="100" y="45" width="8" height="8" fill="none" stroke="#64748b" strokeWidth="1" />
            <text x="110" y="42" className="text-[10px] font-bold fill-indigo-700">O</text>
          </svg>
        ),
        options: [
          'A két tengely metszéspontja szükségképpen az alakzat szimmetriaközéppontja is',
          'Az alakzat nem lehet középpontosan szimmetrikus',
          'Az alakzat csak szabályos sokszög lehet',
          'Az alakzatnak legalább 4 szimmetriatengelyének kell lennie'
        ],
        correctAnswer: 0,
        explanation: 'Geometriai tétel: Két egymásra merőleges tengelyre történő egymás utáni tükrözés egyenértékű a metszéspontjukra vonatkozó középpontos tükrözéssel. Ezért ha mindkét tengely szimmetriatengely, a metszéspont centrum!',
        hint: 'Gondolj a téglalapra vagy a rombuszra: mindkettőnek 2 merőleges tengelye van, és a metszéspontjuk centrum.'
      },
      {
        id: 'q19',
        question: 'Hogyan viselkedik a körgyűrű a középpontos tükrözésre nézve?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="32" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <circle cx="100" cy="45" r="16" fill="#fff" stroke="#0d9488" strokeWidth="2" />
            <circle cx="100" cy="45" r="3" fill="#0f766e" />
          </svg>
        ),
        options: [
          'Középpontosan szimmetrikus a két kör közös középpontjára',
          'Nem középpontosan szimmetrikus, mert lyukas a közepe',
          'Csak tengelyesen szimmetrikus',
          'Két különböző szimmetriaközéppontja van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a belső és külső kör középpontja közös, a közös középpontra vonatkozó 180°-os elforgatás mind a külső, mind a belső kört önmagába képezi le, így a körgyűrű középpontosan szimmetrikus.',
        hint: 'A két határoló körnek azonos a középpontja, amely a teljes gyűrű centruma.'
      },
      {
        id: 'q20',
        question: 'Miért készítik a francia kártya udvari lapjait (K, Q, J) 180°-os középpontos szimmetriával?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <rect x="75" y="10" width="50" height="70" rx="4" fill="#fff" stroke="#334155" strokeWidth="2" />
            <text x="82" y="30" className="text-xs font-bold fill-red-600">K♥</text>
            <text x="110" y="70" className="text-xs font-bold fill-red-600 rotate-180">K♥</text>
            <line x1="80" y1="45" x2="120" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        ),
        options: [
          'Hogy a játékos bármelyik irányban veszi kézbe a lapot, a figura mindig helyesen (ne fejjel lefelé) álljon',
          'Mert így olcsóbb a lapok nyomtatása',
          'Mert a kártyalapok kötelezően szabályos négyszögek',
          'Csak esztétikai okból, a játékmenethez nincs köze'
        ],
        correctAnswer: 0,
        explanation: 'A kétfejű figurák 180°-os középpontos szimmetriája lehetővé teszi, hogy ha a játékos megfordítja a kártyát, a lap ugyanúgy nézzen ki, és az ellenfél ne lássa, mikor igazgatja a kezében lévő lapokat.',
        hint: 'Gondolj a kártyázásra: a kézben tartott lapot nem kell forgatni, mert mindkét irányból jól áll.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Koordináták, Geometriai Tételek és Következtetések',
    subtitle: 'Felezőpont-koordináták számítása, sokszögek centrumának meghatározása és logikai összefüggések',
    range: '21–30. kérdés',
    focus: 'Koordináta-geometria, felezőpont képlete, szimmetria tételek, logikai zárthelyi feladatok',
    color: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-300 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    questions: [
      {
        id: 'q21',
        question: 'Egy szakasz két végpontja a koordináta-rendszerben A(-4; 2) és B(6; 8). Mik a szakasz szimmetriaközéppontjának (F) koordinátái?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="70" x2="170" y2="20" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="30" cy="70" r="3.5" fill="#0284c7" />
            <circle cx="170" cy="20" r="3.5" fill="#0284c7" />
            <circle cx="100" cy="45" r="4" fill="#e11d48" />
            <text x="20" y="82" className="text-[9px] font-mono fill-slate-700">A(-4; 2)</text>
            <text x="145" y="16" className="text-[9px] font-mono fill-slate-700">B(6; 8)</text>
            <text x="96" y="60" className="text-[10px] font-mono font-bold fill-rose-700">F(x; y)=?</text>
          </svg>
        ),
        options: [
          'F(1; 5)',
          'F(2; 10)',
          'F(5; 1)',
          'F(-1; 3)'
        ],
        correctAnswer: 0,
        explanation: 'A szakasz szimmetriaközéppontja a felezőpont: x_F = (-4 + 6) / 2 = 2 / 2 = 1, és y_F = (2 + 8) / 2 = 10 / 2 = 5. Tehát a centrum F(1; 5).',
        hint: 'A felezőpont koordinátái a végpontok koordinátáinak számtani közepei: add össze és oszd el 2-vel!'
      },
      {
        id: 'q22',
        question: 'Egy paralelogramma átlóinak metszéspontja O(3; 4). Egyik csúcsa A(1; 2). Mik a vele szemközti C csúcs koordinátái?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="35,70 125,70 165,20 75,20" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <line x1="35" y1="70" x2="165" y2="20" stroke="#15803d" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="100" cy="45" r="3.5" fill="#e11d48" />
            <circle cx="35" cy="70" r="3.5" fill="#16a34a" />
            <circle cx="165" cy="20" r="3.5" fill="#16a34a" />
            <text x="25" y="82" className="text-[9px] font-mono fill-slate-700">A(1; 2)</text>
            <text x="96" y="38" className="text-[9px] font-mono fill-rose-700">O(3; 4)</text>
            <text x="145" y="16" className="text-[9px] font-mono font-bold fill-emerald-800">C=?</text>
          </svg>
        ),
        options: [
          'C(5; 6)',
          'C(4; 6)',
          'C(2; 2)',
          'C(6; 8)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel O a felezőpont: (1 + x_C) / 2 = 3 ⟹ 1 + x_C = 6 ⟹ x_C = 5. Hasonlóan: (2 + y_C) / 2 = 4 ⟹ 2 + y_C = 8 ⟹ y_C = 6. Tehát C(5; 6).',
        hint: 'A-ból O-ba jutáshoz x-ben +2-t, y-ban +2-t léptünk. O-ból C-be ugyanannyit kell tovább lépni!'
      },
      {
        id: 'q23',
        question: 'Legfeljebb hány szimmetriaközéppontja lehet egy korlátos (véges kiterjedésű) síkidomnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="50,65 150,65 170,25 70,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="110" cy="45" r="4" fill="#4338ca" />
            <text x="105" y="40" className="text-[10px] font-black fill-indigo-900">O₁</text>
            <text x="85" y="80" className="text-[10px] font-bold fill-indigo-700">Lehet O₂ is?</text>
          </svg>
        ),
        options: [
          'Legfeljebb 1 darab szimmetriaközéppontja lehet',
          'Akár 2 darab is lehet',
          'Pontosan annyi, ahány csúcsa van',
          'Bármennyi, a szimmetriatengelyek számától függően'
        ],
        correctAnswer: 0,
        explanation: 'Ha egy alakzatnak két különböző szimmetriaközéppontja lenne (O₁ és O₂), akkor az ezekre vonatkozó egymás utáni tükrözések eltolást hoznának létre. Ez az eltolás az alakzatot végtelen sok példányban ismételné a síkban, így nem lehetne korlátos.',
        hint: 'Véges alakzatnak nem lehet két centruma, mert akkor végtelenbe nyúlna.'
      },
      {
        id: 'q24',
        question: 'Hol helyezkednek el egy párhuzamos egyenespár (e ∥ f) szimmetriaközéppontjai?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="20" y1="25" x2="180" y2="25" stroke="#0284c7" strokeWidth="2" />
            <line x1="20" y1="45" x2="180" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="20" y1="65" x2="180" y2="65" stroke="#0284c7" strokeWidth="2" />
            <circle cx="60" cy="45" r="3" fill="#ef4444" />
            <circle cx="100" cy="45" r="3" fill="#ef4444" />
            <circle cx="140" cy="45" r="3" fill="#ef4444" />
            <text x="185" y="28" className="text-[10px] font-mono fill-sky-700">e</text>
            <text x="185" y="68" className="text-[10px] font-mono fill-sky-700">f</text>
            <text x="185" y="48" className="text-[10px] font-mono fill-red-600">k</text>
          </svg>
        ),
        options: [
          'A két egyenes közötti középpárhuzamos egyenes BÁRMELY pontja szimmetriaközéppont',
          'Csak az e egyenesen lévő pontok',
          'Nincs szimmetriaközéppontja, mert végtelen egyenesek',
          'Csak a két egyenes kezdőpontjai között'
        ],
        correctAnswer: 0,
        explanation: 'A két párhuzamos egyenes közötti középpárhuzamos egyenes bármely K pontjára tükrözve az e egyenes az f-be, az f pedig az e-be megy át, tehát a középpárhuzamos minden pontja szimmetriaközéppont.',
        hint: 'A két párhuzamos közötti félúton haladó egyenes felezi a köztük lévő távolságot.'
      },
      {
        id: 'q25',
        question: 'Mi a szimmetriaközéppontja két egymást metsző egyenes által alkotott alakzatnak?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <line x1="30" y1="20" x2="170" y2="70" stroke="#6366f1" strokeWidth="2" />
            <line x1="30" y1="70" x2="170" y2="20" stroke="#6366f1" strokeWidth="2" />
            <circle cx="100" cy="45" r="4" fill="#4338ca" />
            <text x="108" y="42" className="text-[11px] font-black fill-indigo-700">M</text>
          </svg>
        ),
        options: [
          'A két egyenes M metszéspontja',
          'A szögfelezők bármely pontja',
          'Két metsző egyenes sosem szimmetrikus középpontosan',
          'Az origó'
        ],
        correctAnswer: 0,
        explanation: 'A metszéspontra tükrözve mindkét egyenes önmagába megy át (mivel a pont rajta fekszik mindkét egyenesen). Így az alakzat szimmetriaközéppontja az M metszéspont.',
        hint: 'A két egyenes egyetlen közös pontja az, amelyre mindkettő önmagára képeződik le.'
      },
      {
        id: 'q26',
        question: 'Hogyan viselkedik a körüljárási irány (orientáció) a síkbeli középpontos tükrözés során?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            {/* Clockwise arrows around two triangles */}
            <polygon points="50,25 30,65 70,65" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <polygon points="150,65 170,25 130,25" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="100" cy="45" r="3.5" fill="#e11d48" />
            <text x="45" y="52" className="text-[10px] font-bold fill-emerald-800">A-B-C ↻</text>
            <text x="135" y="48" className="text-[10px] font-bold fill-emerald-800">A'-B'-C' ↻</text>
          </svg>
        ),
        options: [
          'MEGTARTJA a körüljárási irányt (irányítástartó transzformáció)',
          'MEGFORDÍTJA a körüljárási irányt (mint a tengelyes tükrözés)',
          '90°-kal elfordítja az irányt',
          'Csak derékszögű alakzatoknál tartja meg'
        ],
        correctAnswer: 0,
        explanation: 'A síkban a középpontos tükrözés egyenértékű egy 180°-os forgatással. A forgatás pedig megtartja a körüljárási irányt: az óramutató járásával egyező körüljárás a tükörképben is óramutató járásával egyező marad (irányítástartó)!',
        hint: 'A tengelyes tükrözés megfordítja az irányt, de a középpontos tükrözés egyenértékű egy forgatással!'
      },
      {
        id: 'q27',
        question: 'Hány szimmetriatengelye és hány szimmetriaközéppontja van egy szabályos 12-szögnek?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <circle cx="100" cy="45" r="32" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
            <circle cx="100" cy="45" r="3" fill="#7e22ce" />
            <text x="92" y="48" className="text-[10px] font-bold fill-purple-900">n=12</text>
          </svg>
        ),
        options: [
          '12 szimmetriatengelye és 1 szimmetriaközéppontja van',
          '12 szimmetriatengelye és 0 szimmetriaközéppontja van',
          '6 szimmetriatengelye és 1 szimmetriaközéppontja van',
          '24 szimmetriatengelye és 2 szimmetriaközéppontja van'
        ],
        correctAnswer: 0,
        explanation: 'Egy szabályos n-szögnek n darab szimmetriatengelye van. Mivel n = 12 páros, ezért rendelkezik 1 szimmetriaközépponttal is (a középpontja). Tehát 12 tengely és 1 centrum.',
        hint: 'A tengelyek száma megegyezik az oldalak számával, és páros sokszög lévén van centruma is.'
      },
      {
        id: 'q28',
        question: 'Mely digitális (7 szegmenses) számjegyek rendelkeznek KÖZÉPPONTOS SZIMMETRIÁVAL önmagukban?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <text x="65" y="55" className="text-3xl font-mono font-black fill-slate-800 dark:fill-slate-100">0</text>
            <text x="115" y="55" className="text-3xl font-mono font-black fill-slate-800 dark:fill-slate-100">8</text>
          </svg>
        ),
        options: [
          'A 0 és a 8 (180°-kal elforgatva pontosan önmagukat adják)',
          'Az 1, 3 és 7',
          'A 4 és a 6',
          'Egyetlen számjegy sem szimmetrikus'
        ],
        correctAnswer: 0,
        explanation: 'A digitális számjegyek közül a 0 és a 8 teljesen szimmetrikus a középpontjára (180°-os elforgatásra változatlanok maradnak).',
        hint: 'Melyik számjegyeket tudod fejjel lefelé olvasva pontosan ugyanannak a számnak látni?'
      },
      {
        id: 'q29',
        question: 'Melyik négyszögnek NINCS szimmetriaközéppontja az alábbiak közül?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polygon points="40,65 140,65 110,25 70,25" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="75" y="78" className="text-[10px] font-bold fill-red-800">Húrtrapéz</text>
          </svg>
        ),
        options: [
          'Húrtrapéz (egyenlő szárú trapéz)',
          'Téglalap',
          'Rombusz',
          'Általános paralelogramma'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap, a rombusz és az általános paralelogramma mind paralelogrammák, így átlóik metszéspontja szimmetriaközéppont. A húrtrapéz viszont NEM paralelogramma, nincs szimmetriaközéppontja!',
        hint: 'Keresd azt a négyszöget, amelyik nem tartozik a paralelogrammák családjába.'
      },
      {
        id: 'q30',
        question: 'Melyik állítás IGAZ az alábbiak közül?',
        figure: (
          <svg viewBox="0 0 200 90" className="w-48 h-24 mx-auto">
            <polyline points="75,25 125,25 75,65 125,65" fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="45" r="3.5" fill="#4338ca" />
            <text x="96" y="80" className="text-[9px] font-bold fill-indigo-700">0 tengely, 1 centrum</text>
          </svg>
        ),
        options: [
          'Egy alakzatnak lehet úgy is szimmetriaközéppontja, hogy egyetlen szimmetriatengelye sincs',
          'Minden középpontosan szimmetrikus alakzatnak legalább 1 szimmetriatengelye is van',
          'A háromszögek közül a szabályos háromszög középpontosan szimmetrikus',
          'A deltoidnak mindig van szimmetriaközéppontja'
        ],
        correctAnswer: 0,
        explanation: 'Az állítás teljesen IGAZ! Klasszikus példák az általános paralelogramma, valamint az N, S, Z betűk: egyetlen szimmetriatengelyük sincs (0 db), mégis középpontosan szimmetrikusak.',
        hint: 'Gondolj az N, S, Z betűkre vagy az általános paralelogrammára.'
      }
    ]
  }
};

export const PointSymmetricShapesQuiz: React.FC<PointSymmetricShapesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g7-geom-point-symmetric-shapes-quiz"
      documentId="7_osztaly_kozeppontosan_szimmetrikus_alakzatok_kviz"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 KVÍZ"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      title="Középpontosan Szimmetrikus Alakzatok Kvíz"
      topicTitle="10. Középpontosan szimmetrikus alakzatok"
      subtitle="30 feladat (3 szinten 10-10 kérdés): Forgásszimmetria, alakzatok, sokszögek, betűk és koordináták"
      themeColor="rose"
      pdfFilename="7_osztaly_kozeppontosan_szimmetrikus_alakzatok_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetCards={cheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={<PointSymmetricShapesMatcher onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PointSymmetricShapesSorter onNextLevel={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
};

export default PointSymmetricShapesQuiz;
