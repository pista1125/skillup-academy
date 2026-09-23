import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GeometricConceptsMatcher } from './GeometricConceptsMatcher';
import { GeometricConceptsSorter } from './GeometricConceptsSorter';
import {
  Sparkles,
  Compass,
  Shapes,
  Maximize2,
  Box,
  MoveHorizontal,
  Target,
  Layers,
  ArrowRightLeft,
  LayoutGrid,
  Ruler
} from 'lucide-react';

interface GeometricConceptsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Alapfogalmak',
    icon: <Compass className="w-4 h-4 text-teal-600" />,
    formula: 'Pont (0D), Egyenes (1D), Sík (2D), Tér (3D)',
    note: '2 pont pontosan 1 egyenest határoz meg. 3 nem kollineáris pont pontosan 1 síkot határoz meg.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="35" x2="140" y2="15" className="stroke-teal-600 stroke-[2]" />
        <circle cx="45" cy="30" r="3" className="fill-teal-700" />
        <circle cx="115" cy="19" r="3" className="fill-teal-700" />
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Szakasz és Félegyenes',
    icon: <Ruler className="w-4 h-4 text-blue-600" />,
    formula: '|AB| = d(A, B),  |AF| = |FB| = |AB|/2',
    note: 'A szakasz két végponttal határolt egyenesrész. A félegyenes egy pontból indul és a végtelenbe tart.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="25" y1="25" x2="135" y2="25" className="stroke-blue-600 stroke-[2.5]" />
        <circle cx="25" cy="25" r="3.5" className="fill-blue-700" />
        <circle cx="80" cy="25" r="3.5" className="fill-purple-600" />
        <circle cx="135" cy="25" r="3.5" className="fill-blue-700" />
        <text x="77" y="42" className="text-[10px] font-bold font-mono fill-purple-700">F</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Távolságok a Síkban',
    icon: <Target className="w-4 h-4 text-indigo-600" />,
    formula: 'd(P, e) = legrövidebb merőleges szakasz',
    note: 'Pont és egyenes távolsága a pontból bocsátott merőleges szakasz hossza. Párhuzamosok távolsága állandó.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="140" y2="40" className="stroke-slate-600 stroke-[2]" />
        <line x1="80" y1="12" x2="80" y2="40" className="stroke-rose-600 stroke-[2]" strokeDasharray="2 2" />
        <circle cx="80" cy="12" r="3" className="fill-rose-600" />
        <rect x="80" y="30" width="8" height="10" fill="none" className="stroke-rose-500" />
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Egyenesek Kölcsönös Helyzete',
    icon: <MoveHorizontal className="w-4 h-4 text-purple-600" />,
    formula: 'Metsző (1 pont), Párhuzamos (0 pont), Kitérő (nem egysíkú)',
    note: 'Egysíkú egyenesek: metszők vagy párhuzamosak. Térbeli egyenesek, ha nem egysíkúak: kitérők.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="15" x2="70" y2="15" className="stroke-blue-600 stroke-[2]" />
        <line x1="20" y1="35" x2="70" y2="35" className="stroke-blue-600 stroke-[2]" />
        <line x1="100" y1="40" x2="145" y2="10" className="stroke-indigo-600 stroke-[2]" />
        <line x1="100" y1="10" x2="145" y2="40" className="stroke-teal-600 stroke-[2]" />
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Szögtípusok Rendszere',
    icon: <Shapes className="w-4 h-4 text-amber-600" />,
    formula: '0° < Hegyesszög < 90° = Derék < Tompa < 180° = Egyenes < Homorú < 360°',
    note: 'A nullszög 0°, a hegyesszög <90°, a derékszög 90°, a tompaszög 90°-180°, az egyenesszög 180°, a homorúszög >180°, a teljesszög 360°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="30" y1="38" x2="75" y2="38" className="stroke-amber-600 stroke-[2]" />
        <line x1="30" y1="38" x2="60" y2="12" className="stroke-amber-600 stroke-[2]" />
        <path d="M 50 38 A 20 20 0 0 0 45 22" fill="none" className="stroke-amber-500 stroke-[1.5]" />
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Kitérő Egyenesek a Térben',
    icon: <Box className="w-4 h-4 text-rose-600" />,
    formula: 'e ∩ f = ∅  és  nincs közös síkjuk',
    note: 'Pl. a kocka egy elülső függőleges éle és egy vele nem találkozó hátsó vízszintes éle kitérő egymással.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="50" y="10" width="30" height="30" className="fill-none stroke-slate-400 stroke-[1]" />
        <line x1="50" y1="5" x2="50" y2="45" className="stroke-rose-600 stroke-[2.5]" />
        <line x1="60" y1="10" x2="110" y2="10" className="stroke-teal-600 stroke-[2.5]" />
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szögtípusok',
    subtitle: 'Pont, egyenes, sík, szakasz, félegyenes és a szögfajták alaptulajdonságai',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Szögek',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        prompt: 'Hány dimenziója van a geometriai pontnak?',
        questionTypeBadge: 'Alapfogalom',
        figure: (
          <svg viewBox="0 0 120 50" className="w-28 h-12 mx-auto">
            <circle cx="60" cy="25" r="4" className="fill-teal-600" />
            <circle cx="60" cy="25" r="12" fill="none" className="stroke-teal-400 stroke-[1.5]" strokeDasharray="3 2" />
            <text x="74" y="29" className="text-[12px] font-bold fill-teal-700 dark:fill-teal-300">P (0D)</text>
          </svg>
        ),
        options: ['0 dimenziós', '1 dimenziós', '2 dimenziós', '3 dimenziós'],
        correctAnswer: '0 dimenziós',
        explanation: 'A pontnak a geometriában nincs kiterjedése (nincs hossza, szélessége, magassága), csupán egy helyet jelöl ki a térben vagy a síkban, ezért 0 dimenziós.',
        breakdown: [
          { label: 'Definíció', value: 'Alapfogalom, kiterjedés nélküli helyzet' },
          { label: 'Dimenzió', value: '0D' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Hány egyenes illeszkedik pontosan két különböző pontra a síkban vagy a térben?',
        questionTypeBadge: 'Axióma',
        figure: (
          <svg viewBox="0 0 150 50" className="w-36 h-12 mx-auto">
            <line x1="15" y1="25" x2="135" y2="25" className="stroke-emerald-600 stroke-[2.5]" />
            <circle cx="45" cy="25" r="3.5" className="fill-emerald-700" />
            <circle cx="105" cy="25" r="3.5" className="fill-emerald-700" />
            <text x="42" y="16" className="text-[10px] font-bold fill-emerald-800 dark:fill-emerald-300">A</text>
            <text x="102" y="16" className="text-[10px] font-bold fill-emerald-800 dark:fill-emerald-300">B</text>
            <text x="135" y="21" className="text-[10px] font-mono fill-emerald-600">e</text>
          </svg>
        ),
        options: ['Pontosan 1', 'Pontosan 2', 'Végtelen sok', 'Egy sem'],
        correctAnswer: 'Pontosan 1',
        explanation: 'A geometria alaptétele (axiómája), hogy bármely két különböző pontra pontosan egyetlen egyenes illeszkedik.',
        breakdown: [
          { label: 'Axióma', value: 'Két pont egyértelműen meghatároz egy egyenest' },
          { label: 'Darabszám', value: 'Pontosan 1 egyenes' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Melyik szögtípusba tartozik a 48°-os szög?',
        questionTypeBadge: 'Szögtípus',
        figure: (
          <svg viewBox="0 0 120 60" className="w-32 h-16 mx-auto">
            <line x1="20" y1="45" x2="95" y2="45" className="stroke-teal-600 stroke-[2]" />
            <line x1="20" y1="45" x2="75" y2="15" className="stroke-teal-600 stroke-[2]" />
            <path d="M 45 45 A 25 25 0 0 0 40 28" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <circle cx="20" cy="45" r="3" className="fill-teal-700" />
            <text x="50" y="38" className="text-[11px] font-mono font-bold fill-teal-700 dark:fill-teal-300">48°</text>
          </svg>
        ),
        options: ['Hegyesszög', 'Derékszög', 'Tompaszög', 'Homorúszög'],
        correctAnswer: 'Hegyesszög',
        explanation: 'Mivel 0° < 48° < 90°, ezért a 48°-os szög hegyesszög (kisebb, mint a derékszög).',
        breakdown: [
          { label: 'Szögérték', value: '48°' },
          { label: 'Feltétel', value: '0° < 48° < 90°' },
          { label: 'Kategória', value: 'Hegyesszög' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Mennyi a derékszög pontos nagysága?',
        questionTypeBadge: 'Szögtípus',
        figure: (
          <svg viewBox="0 0 120 60" className="w-28 h-14 mx-auto">
            <line x1="30" y1="50" x2="100" y2="50" className="stroke-blue-600 stroke-[2.5]" />
            <line x1="30" y1="50" x2="30" y2="10" className="stroke-blue-600 stroke-[2.5]" />
            <rect x="30" y="38" width="12" height="12" fill="none" className="stroke-blue-500 stroke-[1.5]" />
            <circle cx="36" cy="44" r="1.5" className="fill-blue-600" />
            <text x="50" y="35" className="text-[11px] font-mono font-bold fill-blue-700 dark:fill-blue-300">?</text>
          </svg>
        ),
        options: ['90°', '45°', '180°', '360°'],
        correctAnswer: '90°',
        explanation: 'A derékszög pontosan 90°-os szög. Ekkor a két szögszár merőleges egymásra.',
        breakdown: [
          { label: 'Fogalom', value: 'Derékszög' },
          { label: 'Érték', value: '90°' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Mi a különbség a szakasz és a félegyenes között?',
        questionTypeBadge: 'Alakzatok',
        figure: (
          <svg viewBox="0 0 160 60" className="w-40 h-14 mx-auto">
            <line x1="25" y1="20" x2="120" y2="20" className="stroke-teal-600 stroke-[2]" />
            <circle cx="25" cy="20" r="3" className="fill-teal-700" />
            <circle cx="120" cy="20" r="3" className="fill-teal-700" />
            <text x="128" y="24" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">Szakasz</text>
            <line x1="25" y1="45" x2="115" y2="45" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="25" cy="45" r="3" className="fill-indigo-700" />
            <polygon points="120,45 113,42 113,48" className="fill-indigo-600" />
            <text x="128" y="49" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">Félegyenes</text>
          </svg>
        ),
        options: [
          'A szakasznak két végpontja van, a félegyenesnek csak egy kezdőpontja',
          'A szakasz végtelen, a félegyenes véges',
          'A szakasz 2 dimenziós, a félegyenes 1 dimenziós',
          'Nincs különbség köztük'
        ],
        correctAnswer: 'A szakasznak két végpontja van, a félegyenesnek csak egy kezdőpontja',
        explanation: 'A szakasz mindkét irányból lezárt (két végpontja van), ezért mérhető hossza van. A félegyenes az egyik irányban a kezdőpont lezárja, de a másik irányban a végtelenbe nyúlik.',
        breakdown: [
          { label: 'Szakasz', value: '2 végpont (véges hossz)' },
          { label: 'Félegyenes', value: '1 kezdőpont (egy irányban végtelen)' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Ha az AB szakasz hossza 14 cm, milyen messze van az F felezőpont az A végponttól?',
        questionTypeBadge: 'Felezőpont',
        figure: (
          <svg viewBox="0 0 160 55" className="w-40 h-14 mx-auto">
            <line x1="20" y1="28" x2="140" y2="28" className="stroke-teal-600 stroke-[2.5]" />
            <circle cx="20" cy="28" r="3" className="fill-teal-700" />
            <circle cx="80" cy="28" r="3" className="fill-rose-600" />
            <circle cx="140" cy="28" r="3" className="fill-teal-700" />
            <text x="17" y="18" className="text-[10px] font-bold fill-teal-800 dark:fill-teal-300">A</text>
            <text x="77" y="18" className="text-[10px] font-bold fill-rose-600">F</text>
            <text x="137" y="18" className="text-[10px] font-bold fill-teal-800 dark:fill-teal-300">B</text>
            <text x="44" y="43" className="text-[10px] font-bold fill-rose-600">? cm</text>
            <text x="104" y="43" className="text-[10px] font-bold fill-teal-600">? cm</text>
            <line x1="20" y1="46" x2="140" y2="46" className="stroke-slate-400 stroke-[1]" strokeDasharray="2 2" />
          </svg>
        ),
        options: ['7 cm', '14 cm', '28 cm', '3.5 cm'],
        correctAnswer: '7 cm',
        explanation: 'A felezőpont a szakaszt két egyenlő hosszúságú részre osztja: |AF| = |FB| = |AB| / 2 = 14 / 2 = 7 cm.',
        breakdown: [
          { label: 'Szakaszhossz', value: '|AB| = 14 cm' },
          { label: 'Képlet', value: '|AF| = |AB| / 2' },
          { label: 'Eredmény', value: '7 cm' }
        ]
      },
      {
        id: 'q7',
        prompt: 'Melyik szögtípus szárai alkotnak pontosan egy egyenest?',
        questionTypeBadge: 'Szögtípus',
        figure: (
          <svg viewBox="0 0 150 50" className="w-36 h-12 mx-auto">
            <line x1="15" y1="35" x2="135" y2="35" className="stroke-emerald-600 stroke-[2.5]" />
            <circle cx="75" cy="35" r="3.5" className="fill-emerald-700" />
            <path d="M 50 35 A 25 25 0 0 1 100 35" fill="none" className="stroke-emerald-500 stroke-[2]" strokeDasharray="3 2" />
            <text x="65" y="24" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">180°</text>
          </svg>
        ),
        options: ['Egyenesszög (180°)', 'Derékszög (90°)', 'Nullszög (0°)', 'Teljesszög (360°)'],
        correctAnswer: 'Egyenesszög (180°)',
        explanation: 'Az egyenesszög nagysága 180°, ekkor a szögcsúcsból kiinduló két félegyenes egymás ellentett irányába mutatva egyetlen egyenest alkot.',
        breakdown: [
          { label: 'Szögtípus', value: 'Egyenesszög' },
          { label: 'Nagyság', value: '180°' },
          { label: 'Szárak helyzete', value: 'Egy egyenest képeznek' }
        ]
      },
      {
        id: 'q8',
        prompt: 'Hány nem egy egyenesre eső pont határoz meg egyértelműen egy síkot?',
        questionTypeBadge: 'Axióma',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <polygon points="25,50 115,50 135,15 45,15" className="fill-teal-50/50 dark:fill-teal-950/30 stroke-teal-600 stroke-[1.5]" />
            <circle cx="50" cy="40" r="3" className="fill-teal-700" />
            <circle cx="105" cy="42" r="3" className="fill-teal-700" />
            <circle cx="75" cy="22" r="3" className="fill-teal-700" />
            <text x="42" y="38" className="text-[9px] font-bold fill-teal-800 dark:fill-teal-300">A</text>
            <text x="110" y="42" className="text-[9px] font-bold fill-teal-800 dark:fill-teal-300">B</text>
            <text x="75" y="16" className="text-[9px] font-bold fill-teal-800 dark:fill-teal-300">C</text>
            <text x="122" y="26" className="text-[10px] font-bold fill-teal-600">Sík</text>
          </svg>
        ),
        options: ['3', '2', '4', '1'],
        correctAnswer: '3',
        explanation: 'Három olyan pont, amely nem esik egy egyenesre (nem kollineárisak), pontosan egy síkot határoz meg a térben.',
        breakdown: [
          { label: 'Axióma', value: '3 nem egy egyenesbe eső pont' },
          { label: 'Meghatározott alakzat', value: 'Pontosan 1 sík' }
        ]
      },
      {
        id: 'q9',
        prompt: 'Melyik állítás IGAZ a 135°-os szögre?',
        questionTypeBadge: 'Szögfajták',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <line x1="75" y1="50" x2="125" y2="50" className="stroke-indigo-600 stroke-[2.5]" />
            <line x1="75" y1="50" x2="35" y2="15" className="stroke-indigo-600 stroke-[2.5]" />
            <circle cx="75" cy="50" r="3" className="fill-indigo-700" />
            <path d="M 100 50 A 25 25 0 0 0 57 34" fill="none" className="stroke-indigo-500 stroke-[2]" />
            <text x="72" y="36" className="text-[11px] font-mono font-bold fill-indigo-700 dark:fill-indigo-300">135°</text>
          </svg>
        ),
        options: [
          'Tompaszög és konvex szögtartományú',
          'Hegyesszög és konvex szögtartományú',
          'Homorúszög és konkáv szögtartományú',
          'Egyenesszög'
        ],
        correctAnswer: 'Tompaszög és konvex szögtartományú',
        explanation: 'Mivel 90° < 135° < 180°, ezért a 135°-os szög tompaszög. Mivel 180°-nál kisebb, ezért konvex szögtartományú.',
        breakdown: [
          { label: 'Érték', value: '135°' },
          { label: 'Tartomány', value: '90° és 180° között → Tompaszög' },
          { label: 'Típus', value: 'Konvex (domború)' }
        ]
      },
      {
        id: 'q10',
        prompt: 'Mekkora a teljesszög értéke?',
        questionTypeBadge: 'Szögtípus',
        figure: (
          <svg viewBox="0 0 120 60" className="w-30 h-15 mx-auto">
            <line x1="50" y1="30" x2="105" y2="30" className="stroke-purple-600 stroke-[2.5]" />
            <circle cx="50" cy="30" r="3" className="fill-purple-700" />
            <circle cx="50" cy="30" r="18" fill="none" className="stroke-purple-500 stroke-[2]" strokeDasharray="3 2" />
            <text x="40" y="34" className="text-[11px] font-mono font-bold fill-purple-700 dark:fill-purple-300">360°</text>
          </svg>
        ),
        options: ['360°', '180°', '90°', '270°'],
        correctAnswer: '360°',
        explanation: 'A teljesszög a sík teljes körülfordulását jelenti a csúcs körül, értéke pontosan 360°.',
        breakdown: [
          { label: 'Fogalom', value: 'Teljesszög' },
          { label: 'Érték', value: '360°' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egyenesek Helyzete és Távolságok',
    subtitle: 'Metsző, merőleges, párhuzamos és kitérő egyenesek, távolságok és szögmértékek',
    range: '11 - 20. feladat',
    focus: 'Egyenesek & Távolságok',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    iconBg: 'bg-teal-600 text-white',
    questions: [
      {
        id: 'q11',
        prompt: 'Milyen egyeneseket nevezünk KITÉRŐ egyeneseknek a térben?',
        questionTypeBadge: 'Térgeometria',
        figure: (
          <svg viewBox="0 0 140 70" className="w-36 h-18 mx-auto">
            <rect x="35" y="25" width="45" height="35" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="35,25 55,10 100,10 80,25" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="80,25 100,10 100,45 80,60" className="fill-none stroke-slate-400 stroke-[1]" />
            <line x1="35" y1="15" x2="35" y2="68" className="stroke-rose-600 stroke-[2.5]" />
            <line x1="45" y1="10" x2="110" y2="10" className="stroke-teal-600 stroke-[2.5]" />
            <text x="22" y="42" className="text-[10px] font-bold fill-rose-600">e</text>
            <text x="105" y="8" className="text-[10px] font-bold fill-teal-600">f</text>
          </svg>
        ),
        options: [
          'Amelyeknek nincs közös pontjuk és nem fekszenek egy síkban',
          'Amelyek metszik egymást 90°-ban',
          'Amelyek egy síkban vannak és nincs közös pontjuk',
          'Amelyeknek végtelen sok közös pontjuk van'
        ],
        correctAnswer: 'Amelyeknek nincs közös pontjuk és nem fekszenek egy síkban',
        explanation: 'A térben két egyenes akkor kitérő, ha nincs közös pontjuk és NEM párhuzamosak (azaz nem fekszenek egyetlen közös síkban sem).',
        breakdown: [
          { label: 'Közös pontok', value: 'Nincs (0 pont)' },
          { label: 'Síkbeli helyzet', value: 'Nem egysíkúak' },
          { label: 'Megnevezés', value: 'Kitérő egyenesek' }
        ]
      },
      {
        id: 'q12',
        prompt: 'Egy kocka elülső alsó éle és hátsó felső éle egymáshoz képest milyen helyzetűek?',
        questionTypeBadge: 'Kocka élek',
        figure: (
          <svg viewBox="0 0 140 80" className="w-32 h-18 mx-auto">
            <rect x="30" y="35" width="45" height="35" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="30,35 50,15 95,15 75,35" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="75,35 95,15 95,50 75,70" className="fill-none stroke-slate-400 stroke-[1]" />
            <line x1="30" y1="70" x2="75" y2="70" className="stroke-rose-600 stroke-[3]" />
            <line x1="50" y1="15" x2="95" y2="15" className="stroke-teal-600 stroke-[3]" />
          </svg>
        ),
        options: ['Párhuzamosak', 'Kitérők', 'Metszők', 'Egybeesők'],
        correctAnswer: 'Párhuzamosak',
        explanation: 'Az elülső alsó él és a hátsó felső él mindkettő vízszintes és azonos irányú, egymással párhuzamosak (egy átlós sík köti össze őket).',
        breakdown: [
          { label: 'Elülső alsó él', value: 'Vízszintes irányú' },
          { label: 'Hátsó felső él', value: 'Azonos vízszintes irányú' },
          { label: 'Kapcsolat', value: 'Párhuzamosak' }
        ]
      },
      {
        id: 'q13',
        prompt: 'Egy kocka egy függőleges elülső éle és egy hátsó vízszintes éle milyen helyzetűek?',
        questionTypeBadge: 'Térgeometria',
        figure: (
          <svg viewBox="0 0 140 70" className="w-36 h-18 mx-auto">
            <rect x="35" y="25" width="45" height="35" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="35,25 55,10 100,10 80,25" className="fill-none stroke-slate-400 stroke-[1]" />
            <polygon points="80,25 100,10 100,45 80,60" className="fill-none stroke-slate-400 stroke-[1]" />
            <line x1="35" y1="25" x2="35" y2="60" className="stroke-rose-600 stroke-[3]" />
            <line x1="55" y1="10" x2="100" y2="10" className="stroke-indigo-600 stroke-[3]" />
          </svg>
        ),
        options: ['Kitérő egyenesek', 'Párhuzamos egyenesek', 'Metsző egyenesek', 'Egybeeső egyenesek'],
        correctAnswer: 'Kitérő egyenesek',
        explanation: 'A két élnek nincs közös pontja, és nem is párhuzamosak (az egyik függőleges, a másik vízszintes), így nincsenek közös síkban: kitérő egyenesek.',
        breakdown: [
          { label: 'Irányok', value: 'Egyik függőleges, másik vízszintes' },
          { label: 'Közös pont', value: 'Nincs' },
          { label: 'Közös sík', value: 'Nincs → Kitérő egyenesek' }
        ]
      },
      {
        id: 'q14',
        prompt: 'Hogyan mérjük meg egy pont és egy egyenes távolságát a síkban?',
        questionTypeBadge: 'Távolság',
        figure: (
          <svg viewBox="0 0 150 60" className="w-36 h-14 mx-auto">
            <line x1="20" y1="45" x2="135" y2="45" className="stroke-teal-600 stroke-[2]" />
            <circle cx="75" cy="15" r="3.5" className="fill-rose-600" />
            <text x="75" y="10" className="text-[10px] font-bold fill-rose-600 text-center">P</text>
            <line x1="75" y1="15" x2="75" y2="45" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
            <rect x="75" y="37" width="8" height="8" fill="none" className="stroke-slate-500 stroke-[1]" />
            <circle cx="79" cy="41" r="1" className="fill-slate-600" />
            <text x="135" y="42" className="text-[10px] font-bold fill-teal-600">e</text>
            <text x="83" y="30" className="text-[10px] font-bold fill-rose-600">d</text>
          </svg>
        ),
        options: [
          'A pontból az egyenesre bocsátott merőleges szakasz hosszával',
          'A pont és az egyenes tetszőleges pontjának távolságával',
          'A pontból húzott leghosszabb szakasszal',
          'A pont és az egyenes középpontjának távolságával'
        ],
        correctAnswer: 'A pontból az egyenesre bocsátott merőleges szakasz hosszával',
        explanation: 'A pont és az egyenes távolsága a pontból az egyenesre bocsátott merőleges szakasz hossza, mivel ez a pont és az egyenes közötti legrövidebb távolság.',
        breakdown: [
          { label: 'Szabály', value: 'Merőleges vetület hossza' },
          { label: 'Tulajdonság', value: 'A legrövidebb lehetséges távolság' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Melyik szögtípusba tartozik a 210°-os szög?',
        questionTypeBadge: 'Szögtípus',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <line x1="65" y1="30" x2="115" y2="30" className="stroke-purple-600 stroke-[2.5]" />
            <line x1="65" y1="30" x2="25" y2="48" className="stroke-purple-600 stroke-[2.5]" />
            <circle cx="65" cy="30" r="3" className="fill-purple-700" />
            <path d="M 90 30 A 25 25 0 1 1 43 40" fill="none" className="stroke-purple-500 stroke-[2]" />
            <text x="56" y="20" className="text-[11px] font-mono font-bold fill-purple-700 dark:fill-purple-300">210°</text>
          </svg>
        ),
        options: ['Homorúszög (Konkáv)', 'Tompaszög', 'Egyenesszög', 'Teljesszög'],
        correctAnswer: 'Homorúszög (Konkáv)',
        explanation: 'Mivel 180° < 210° < 360°, a 210°-os szög homorúszög (konkáv szög), vagyis nagyobb az egyenesszögnél.',
        breakdown: [
          { label: 'Szögérték', value: '210°' },
          { label: 'Tartomány', value: '180° < 210° < 360°' },
          { label: 'Kategória', value: 'Homorúszög (Konkáv)' }
        ]
      },
      {
        id: 'q16',
        prompt: 'Ha két egyenes metszi egymást, hány darab közös pontjuk van a síkban?',
        questionTypeBadge: 'Metsző egyenesek',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <line x1="20" y1="15" x2="120" y2="45" className="stroke-teal-600 stroke-[2]" />
            <line x1="20" y1="45" x2="120" y2="15" className="stroke-indigo-600 stroke-[2]" />
            <circle cx="70" cy="30" r="3.5" className="fill-rose-600" />
            <text x="66" y="22" className="text-[10px] font-bold fill-rose-600">M</text>
            <text x="122" y="47" className="text-[9px] font-bold fill-teal-600">e</text>
            <text x="122" y="17" className="text-[9px] font-bold fill-indigo-600">f</text>
          </svg>
        ),
        options: ['Pontosan 1', 'Pontosan 2', '0', 'Végtelen sok'],
        correctAnswer: 'Pontosan 1',
        explanation: 'Két különböző, metsző egyenesnek a geometriában pontosan egyetlen közös metszéspontja van.',
        breakdown: [
          { label: 'Metsző egyenesek', value: 'Közös pontok száma = 1' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Melyik állítás IGAZ két párhuzamos egyenes távolságáról?',
        questionTypeBadge: 'Párhuzamosok',
        figure: (
          <svg viewBox="0 0 150 55" className="w-36 h-13 mx-auto">
            <line x1="20" y1="15" x2="135" y2="15" className="stroke-blue-600 stroke-[2]" />
            <line x1="20" y1="42" x2="135" y2="42" className="stroke-blue-600 stroke-[2]" />
            <line x1="55" y1="15" x2="55" y2="42" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
            <line x1="105" y1="15" x2="105" y2="42" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
            <text x="47" y="32" className="text-[10px] font-bold fill-rose-600">d</text>
            <text x="97" y="32" className="text-[10px] font-bold fill-rose-600">d</text>
            <text x="137" y="18" className="text-[10px] font-bold fill-blue-600">e</text>
            <text x="137" y="45" className="text-[10px] font-bold fill-blue-600">f</text>
          </svg>
        ),
        options: [
          'A távolságuk az egyenesek bármely pontjában állandó és megegyezik',
          'A távolságuk fokozatosan csökken',
          'A távolságuk 0',
          'A távolságuk nem értelmezhető'
        ],
        correctAnswer: 'A távolságuk az egyenesek bármely pontjában állandó és megegyezik',
        explanation: 'Két párhuzamos egyenes távolsága a síkban állandó: bármely pontból merőlegest bocsátva a másik egyenesre, ugyanakkora szakaszméretet kapunk.',
        breakdown: [
          { label: 'Párhuzamosok', value: 'Állandó merőleges távolság' }
        ]
      },
      {
        id: 'q18',
        prompt: 'Két merőleges egyenes hány fokos szöget zár be egymással?',
        questionTypeBadge: 'Merőlegesség',
        figure: (
          <svg viewBox="0 0 120 60" className="w-28 h-14 mx-auto">
            <line x1="20" y1="35" x2="105" y2="35" className="stroke-teal-600 stroke-[2]" />
            <line x1="60" y1="10" x2="60" y2="55" className="stroke-teal-600 stroke-[2]" />
            <rect x="60" y="23" width="12" height="12" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <circle cx="66" cy="29" r="1.5" className="fill-teal-600" />
            <text x="76" y="28" className="text-[10px] font-mono font-bold fill-teal-700 dark:fill-teal-300">90°</text>
          </svg>
        ),
        options: ['90°', '180°', '45°', '0°'],
        correctAnswer: '90°',
        explanation: 'A merőleges egyenesek definíció szerint pontosan 90°-os (derékszögű) szöget zárnak be egymással.',
        breakdown: [
          { label: 'Jelölés', value: 'e ⊥ f' },
          { label: 'Szög', value: '90°' }
        ]
      },
      {
        id: 'q19',
        prompt: 'Mennyi a teljes szög és az egyenesszög különbsége?',
        questionTypeBadge: 'Szögszámítás',
        figure: (
          <svg viewBox="0 0 130 55" className="w-32 h-14 mx-auto">
            <line x1="25" y1="35" x2="105" y2="35" className="stroke-emerald-600 stroke-[2.5]" />
            <circle cx="65" cy="35" r="3" className="fill-emerald-700" />
            <path d="M 40 35 A 25 25 0 0 1 90 35" fill="none" className="stroke-emerald-500 stroke-[2]" />
            <path d="M 40 35 A 25 25 0 0 0 90 35" fill="none" className="stroke-slate-400 stroke-[1.5]" strokeDasharray="2 2" />
            <text x="54" y="24" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">180°</text>
          </svg>
        ),
        options: ['180°', '90°', '270°', '360°'],
        correctAnswer: '180°',
        explanation: 'A teljesszög 360°, az egyenesszög 180°. Különbségük: 360° - 180° = 180° (ami szintén egy egyenesszög).',
        breakdown: [
          { label: 'Teljesszög', value: '360°' },
          { label: 'Egyenesszög', value: '180°' },
          { label: 'Különbség', value: '360° - 180° = 180°' }
        ]
      },
      {
        id: 'q20',
        prompt: 'Milyen alakzatot kapunk, ha egy szakaszt mindkét irányban a végtelenbe meghosszabbítunk?',
        questionTypeBadge: 'Geometriai alakzatok',
        figure: (
          <svg viewBox="0 0 160 50" className="w-40 h-12 mx-auto">
            <line x1="10" y1="25" x2="45" y2="25" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="3 2" />
            <line x1="45" y1="25" x2="115" y2="25" className="stroke-indigo-600 stroke-[3]" />
            <line x1="115" y1="25" x2="150" y2="25" className="stroke-indigo-400 stroke-[1.5]" strokeDasharray="3 2" />
            <circle cx="45" cy="25" r="3" className="fill-indigo-700" />
            <circle cx="115" cy="25" r="3" className="fill-indigo-700" />
            <text x="42" y="16" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">A</text>
            <text x="112" y="16" className="text-[9px] font-bold fill-indigo-700 dark:fill-indigo-300">B</text>
          </svg>
        ),
        options: ['Egyenest', 'Félegyenest', 'Síkot', 'Szöget'],
        correctAnswer: 'Egyenest',
        explanation: 'A szakasz az egyenes egy véges darabja. Ha mindkét végpontján túl a végtelenbe meghosszabbítjuk, megkapjuk a szakaszt hordozó egyenest.',
        breakdown: [
          { label: 'Szakasz meghosszabbítása mindkét irányban', value: 'Egyenes' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometriai Összefüggések',
    subtitle: 'Térbeli relációk, konvex és konkáv szögtartományok, logikai összefüggések és axiómák',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        prompt: 'Ha egy térbeli e egyenes párhuzamos egy síkkal, akkor hány közös pontja van a síkkal?',
        questionTypeBadge: 'Térgeometria',
        figure: (
          <svg viewBox="0 0 140 65" className="w-36 h-16 mx-auto">
            <polygon points="20,55 100,55 125,25 45,25" className="fill-teal-50/50 dark:fill-teal-950/30 stroke-teal-600 stroke-[1.5]" />
            <line x1="30" y1="12" x2="120" y2="12" className="stroke-rose-600 stroke-[2]" />
            <text x="123" y="15" className="text-[10px] font-bold fill-rose-600">e</text>
            <text x="105" y="45" className="text-[10px] font-bold fill-teal-600">S</text>
            <text x="55" y="21" className="text-[9px] font-bold fill-slate-500">e ∥ S</text>
          </svg>
        ),
        options: ['0', '1', '2', 'Végtelen sok'],
        correctAnswer: '0',
        explanation: 'Egy egyenes akkor párhuzamos egy síkkal, ha nincs vele közös pontja (vagy benne fekszik a síkban, de a szigorúan vett metszésmentes párhuzamosság esetén 0 közös pontja van).',
        breakdown: [
          { label: 'Feltétel', value: 'e egyenes párhuzamos az S síkkal' },
          { label: 'Közös pontok száma', value: '0 pont' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Hány élpár van egy kockában, amelyek KITÉRŐ egyenesekre illeszkednek egy adott élhez képest?',
        questionTypeBadge: 'Térgeometriai kombinatorika',
        figure: (
          <svg viewBox="0 0 140 70" className="w-36 h-18 mx-auto">
            <rect x="35" y="25" width="45" height="35" className="fill-none stroke-slate-300 stroke-[1]" />
            <polygon points="35,25 55,10 100,10 80,25" className="fill-none stroke-slate-300 stroke-[1]" />
            <polygon points="80,25 100,10 100,45 80,60" className="fill-none stroke-slate-300 stroke-[1]" />
            <line x1="35" y1="60" x2="80" y2="60" className="stroke-rose-600 stroke-[3]" />
            <line x1="55" y1="10" x2="55" y2="45" className="stroke-indigo-500 stroke-[2]" />
            <line x1="100" y1="10" x2="100" y2="45" className="stroke-indigo-500 stroke-[2]" />
            <line x1="55" y1="10" x2="100" y2="10" className="stroke-indigo-500 stroke-[2]" />
            <line x1="55" y1="45" x2="100" y2="45" className="stroke-indigo-500 stroke-[2]" strokeDasharray="2 2" />
          </svg>
        ),
        options: ['4 él', '2 él', '6 él', '8 él'],
        correctAnswer: '4 él',
        explanation: 'A kocka 12 éle közül egy tetszőlegesen kiválasztott élhez képest: 4 él metszi (a csúcsokban), 3 él párhuzamos vele (azonos irányúak), és pontosan 4 él kitérő vele.',
        breakdown: [
          { label: 'Összes többi él', value: '11 él' },
          { label: 'Metsző élek', value: '4 él' },
          { label: 'Párhuzamos élek', value: '3 él' },
          { label: 'Kitérő élek', value: '11 - 4 - 3 = 4 él' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Mikor nevezünk egy szögtartományt KONVEXNEK (domborúnak)?',
        questionTypeBadge: 'Konvexitás',
        figure: (
          <svg viewBox="0 0 130 65" className="w-32 h-16 mx-auto">
            <polygon points="25,50 105,50 70,15" className="fill-teal-100/40 dark:fill-teal-900/30" />
            <line x1="25" y1="50" x2="105" y2="50" className="stroke-teal-600 stroke-[2]" />
            <line x1="25" y1="50" x2="70" y2="15" className="stroke-teal-600 stroke-[2]" />
            <line x1="45" y1="42" x2="75" y2="35" className="stroke-rose-500 stroke-[1.5]" />
            <circle cx="45" cy="42" r="2.5" className="fill-rose-600" />
            <circle cx="75" cy="35" r="2.5" className="fill-rose-600" />
            <text x="42" y="36" className="text-[8px] font-bold fill-rose-700">P</text>
            <text x="75" y="30" className="text-[8px] font-bold fill-rose-700">Q</text>
          </svg>
        ),
        options: [
          'Ha a tartomány bármely két pontját összekötő szakasz teljes egészében a tartományban marad',
          'Ha a szög pontosan 90°-os',
          'Ha a tartomány tartalmaz teljes egyenest',
          'Ha a szög nagyobb 180°-nál'
        ],
        correctAnswer: 'Ha a tartomány bármely két pontját összekötő szakasz teljes egészében a tartományban marad',
        explanation: 'A geometriában egy síkbeli alakzat (vagy szögtartomány) akkor konvex, ha bármely két belső pontját összekötő szakasz minden pontja szintén a tartományhoz tartozik. A 0° és 180° közötti szögek konvexek.',
        breakdown: [
          { label: 'Konvexitás definíciója', value: 'Bármely két pont szakasza benne marad' },
          { label: 'Konvex szögek', value: '0° < α ≤ 180°' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Adott egy egyenes és egy rá nem illeszkedő pont. Hány olyan egyenes húzható a ponton át, amely MERŐLEGES az adott egyenesre a síkban?',
        questionTypeBadge: 'Axióma',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <line x1="20" y1="45" x2="125" y2="45" className="stroke-teal-600 stroke-[2]" />
            <circle cx="70" cy="15" r="3.5" className="fill-rose-600" />
            <text x="75" y="15" className="text-[10px] font-bold fill-rose-600">P</text>
            <line x1="70" y1="8" x2="70" y2="55" className="stroke-indigo-600 stroke-[2]" />
            <rect x="70" y="37" width="8" height="8" fill="none" className="stroke-slate-500 stroke-[1]" />
            <circle cx="74" cy="41" r="1" className="fill-slate-600" />
            <text x="127" y="47" className="text-[10px] font-bold fill-teal-600">e</text>
            <text x="73" y="55" className="text-[9px] font-bold fill-indigo-600">1 db merőleges</text>
          </svg>
        ),
        options: ['Pontosan 1', 'Pontosan 2', 'Végtelen sok', '0'],
        correctAnswer: 'Pontosan 1',
        explanation: 'A síkban egy adott pontból egy adott egyenesre pontosan egyetlen merőleges egyenes bocsátható (szerkeszthető).',
        breakdown: [
          { label: 'Adott', value: '1 pont és 1 egyenes a síkban' },
          { label: 'Merőleges egyenesek száma', value: 'Pontosan 1' }
        ]
      },
      {
        id: 'q25',
        prompt: 'Adott egy egyenes és egy rá nem illeszkedő pont. Hány olyan egyenes húzható a ponton át a síkban, amely PÁRHUZAMOS az adott egyenessel?',
        questionTypeBadge: 'Párhuzamossági axióma',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <line x1="20" y1="45" x2="125" y2="45" className="stroke-teal-600 stroke-[2]" />
            <line x1="20" y1="20" x2="125" y2="20" className="stroke-blue-600 stroke-[2]" />
            <circle cx="70" cy="20" r="3.5" className="fill-rose-600" />
            <text x="70" y="13" className="text-[10px] font-bold fill-rose-600">P</text>
            <text x="127" y="47" className="text-[10px] font-bold fill-teal-600">e</text>
            <text x="127" y="22" className="text-[9px] font-bold fill-blue-600">p (1 db)</text>
          </svg>
        ),
        options: ['Pontosan 1', 'Pontosan 2', 'Végtelen sok', '0'],
        correctAnswer: 'Pontosan 1',
        explanation: 'Ez az euklideszi geometria híres párhuzamossági axiómája: egy adott ponton keresztül pontosan egyetlen egyenes húzható, amely párhuzamos egy adott egyenessel.',
        breakdown: [
          { label: 'Axióma', value: 'Euklideszi párhuzamossági axióma' },
          { label: 'Párhuzamosak száma', value: 'Pontosan 1' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Egy egyenes egy pontja hány részre osztja az egyenest?',
        questionTypeBadge: 'Félegyenes',
        figure: (
          <svg viewBox="0 0 150 45" className="w-36 h-11 mx-auto">
            <line x1="15" y1="22" x2="135" y2="22" className="stroke-teal-600 stroke-[2]" />
            <circle cx="75" cy="22" r="3.5" className="fill-rose-600" />
            <text x="72" y="14" className="text-[10px] font-bold fill-rose-600">P</text>
            <text x="22" y="38" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">1. félegyenes ←</text>
            <text x="88" y="38" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">→ 2. félegyenes</text>
          </svg>
        ),
        options: ['2 félegyenesre', '3 szakaszra', '1 síkra', 'Végtelen sok részre'],
        correctAnswer: '2 félegyenesre',
        explanation: 'Az egyenes egy tetszőleges pontja az egyenest pontosan 2 ellentétes irányú félegyenesre osztja.',
        breakdown: [
          { label: 'Kezdőpont', value: 'Közös pont' },
          { label: 'Részhalmazok', value: '2 ellentétes félegyenes' }
        ]
      },
      {
        id: 'q27',
        prompt: 'Egy síkban lévő egyenes hány félsíkra osztja a síkot?',
        questionTypeBadge: 'Félsík',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <polygon points="15,50 105,50 125,10 35,10" className="fill-teal-50/50 dark:fill-teal-950/30 stroke-slate-300 stroke-[1]" />
            <line x1="25" y1="30" x2="115" y2="30" className="stroke-teal-600 stroke-[2]" />
            <text x="50" y="22" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">I. félsík</text>
            <text x="50" y="44" className="text-[9px] font-bold fill-teal-700 dark:fill-teal-300">II. félsík</text>
            <text x="117" y="32" className="text-[9px] font-bold fill-teal-600">e</text>
          </svg>
        ),
        options: ['2 félsíkra', '4 szögtartományra', '1 térre', '3 felületre'],
        correctAnswer: '2 félsíkra',
        explanation: 'A sík egy tetszőleges egyenese a síkot pontosan két nyílt félsíkra osztja (a határoló egyenessel együtt két zárt félsíkra).',
        breakdown: [
          { label: 'Határvonal', value: 'Egyenes' },
          { label: 'Részek', value: '2 félsík' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Ha két szög összege 180°, és az egyik szög 65°-os hegyesszög, akkor a másik szög milyen típusú?',
        questionTypeBadge: 'Kiegészítő szög',
        figure: (
          <svg viewBox="0 0 140 55" className="w-36 h-14 mx-auto">
            <line x1="15" y1="40" x2="125" y2="40" className="stroke-teal-600 stroke-[2.5]" />
            <line x1="70" y1="40" x2="95" y2="12" className="stroke-teal-600 stroke-[2]" />
            <circle cx="70" cy="40" r="3" className="fill-teal-700" />
            <path d="M 85 40 A 15 15 0 0 0 80 29" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <path d="M 50 40 A 20 20 0 0 1 79 27" fill="none" className="stroke-rose-500 stroke-[1.5]" />
            <text x="86" y="35" className="text-[9px] font-bold fill-teal-700">65°</text>
            <text x="46" y="30" className="text-[10px] font-bold fill-rose-600">β = ?</text>
          </svg>
        ),
        options: ['Tompaszög (115°)', 'Hegyesszög (65°)', 'Derékszög (90°)', 'Homorúszög (295°)'],
        correctAnswer: 'Tompaszög (115°)',
        explanation: 'β = 180° - 65° = 115°. Mivel 90° < 115° < 180°, a 115°-os szög tompaszög.',
        breakdown: [
          { label: 'Összeg', value: '180°' },
          { label: 'Számítás', value: '180° - 65° = 115°' },
          { label: 'Típus', value: 'Tompaszög' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Melyik állítás HAMIS a pont, egyenes és sík kapcsolatáról?',
        questionTypeBadge: 'Logika & Axiómák',
        figure: (
          <svg viewBox="0 0 140 60" className="w-36 h-15 mx-auto">
            <line x1="20" y1="30" x2="120" y2="30" className="stroke-rose-600 stroke-[2.5]" />
            <circle cx="45" cy="30" r="3" className="fill-rose-700" />
            <circle cx="95" cy="30" r="3" className="fill-rose-700" />
            <text x="42" y="22" className="text-[9px] font-bold fill-rose-700">A</text>
            <text x="92" y="22" className="text-[9px] font-bold fill-rose-700">B</text>
            <polygon points="30,48 110,48 100,30 20,30" className="fill-teal-100/30 stroke-teal-400 stroke-[1]" />
            <polygon points="30,12 110,12 100,30 20,30" className="fill-blue-100/30 stroke-blue-400 stroke-[1]" />
            <text x="112" y="45" className="text-[8px] font-bold fill-slate-500">∞ sík</text>
          </svg>
        ),
        options: [
          'Két pont mindig pontosan egy síkot határoz meg',
          'Egy egyenes és egy rá nem illeszkedő pont egyértelműen meghatároz egy síkot',
          'Két metsző egyenes egyértelműen meghatároz egy síkot',
          'Két párhuzamos egyenes egyértelműen meghatároz egy síkot'
        ],
        correctAnswer: 'Két pont mindig pontosan egy síkot határoz meg',
        explanation: 'Ez az állítás hamis! Két pont csak egy egyenest határoz meg. Egy egyenes körül végtelen sok sík forgatható (mint egy könyv lapjai a gerinc körül), így két pont nem határoz meg egyértelműen egy síkot.',
        breakdown: [
          { label: 'Hamis állítás', value: 'Két pont határoz meg egy síkot (HAMIS - végtelen sok sík illeszkedik rájuk)' },
          { label: 'Helyes szabály', value: 'Legalább 3 nem egy egyenesre eső pont kell 1 síkhoz' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Ha egy pont az AB szakasz felezőmerőlegesén van, akkor milyen a távolsága az A és B végpontoktól?',
        questionTypeBadge: 'Felezőmerőleges tétel',
        figure: (
          <svg viewBox="0 0 140 65" className="w-36 h-16 mx-auto">
            <line x1="20" y1="48" x2="120" y2="48" className="stroke-teal-600 stroke-[2]" />
            <line x1="70" y1="10" x2="70" y2="58" className="stroke-indigo-600 stroke-[1.5]" />
            <circle cx="20" cy="48" r="3" className="fill-teal-700" />
            <circle cx="120" cy="48" r="3" className="fill-teal-700" />
            <circle cx="70" cy="20" r="3" className="fill-rose-600" />
            <text x="16" y="58" className="text-[9px] font-bold fill-teal-700">A</text>
            <text x="118" y="58" className="text-[9px] font-bold fill-teal-700">B</text>
            <text x="74" y="20" className="text-[9px] font-bold fill-rose-600">P</text>
            <line x1="20" y1="48" x2="70" y2="20" className="stroke-rose-400 stroke-[1.5]" strokeDasharray="2 2" />
            <line x1="120" y1="48" x2="70" y2="20" className="stroke-rose-400 stroke-[1.5]" strokeDasharray="2 2" />
            <rect x="70" y="40" width="7" height="7" fill="none" className="stroke-slate-500 stroke-[1]" />
          </svg>
        ),
        options: [
          'Egyenlő távolságra van mindkét végponttól (|PA| = |PB|)',
          'Közelebb van az A végponthoz',
          'Közelebb van a B végponthoz',
          'A távolsága a két végponttól mindig 0'
        ],
        correctAnswer: 'Egyenlő távolságra van mindkét végponttól (|PA| = |PB|)',
        explanation: 'A szakaszfelező merőleges geometriai helye: a sík azon pontjainak halmaza, amelyek a szakasz két végpontjától egyenlő távolságra vannak (|PA| = |PB|).',
        breakdown: [
          { label: 'Tétel', value: 'A felezőmerőleges pontjai egyenlő távol vannak a végpontoktól' },
          { label: 'Képlet', value: '|PA| = |PB|' }
        ]
      }
    ]
  }
};

export const GeometricConceptsQuiz: React.FC<GeometricConceptsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-geom-trans"
      topicId="g7-geom-concepts"
      topicTitle="1. Geometriai fogalmak"
      subtopicId="geometriai-fogalmak"
      documentId="grade-7-geometriai-transzformaciok-geometriai-fogalmak-quiz"
      emoji="📐"
      topicBadge="7. Osztály • Matematika III. Témakör"
      badgeText="7. Osztály • Matematika III. Témakör"
      title="1. Geometriai fogalmak Kvíz"
      subtitle="Gyakorold a geometriai alapfogalmakat, az egyenesek helyzeteit, a távolságokat és a szögtípusokat 30 válogatott feladattal és ábrákkal!"
      cheatSheetTitle="Geometriai Fogalomtár & Puska"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="teal"
      hintText="💡 Ügyelj a síkbeli és térbeli egyenesek különbségére (párhuzamos vs. kitérő), valamint a szögtípusok határértékeire (90°, 180°, 360°)!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a fogalmakat, ábrákat és definíciókat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GeometricConceptsMatcher
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
          subtitle: 'Kategorizáld a geometriai alakzatokat és szögeket!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GeometricConceptsSorter
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

export default GeometricConceptsQuiz;
