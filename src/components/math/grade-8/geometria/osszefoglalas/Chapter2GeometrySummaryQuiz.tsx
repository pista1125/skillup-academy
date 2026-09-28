import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import {
  Award,
  Shapes,
  Maximize2,
  Minimize2,
  Compass,
  Sparkles,
  Sun,
  Layers,
  Ruler,
  Percent,
  ArrowRightLeft
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Chapter2GeometrySummaryMatcher } from './Chapter2GeometrySummaryMatcher';
import { Chapter2GeometrySummarySorter } from './Chapter2GeometrySummarySorter';

interface Chapter2GeometrySummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'sum-c1',
    title: 'Egybevágóság vs. Hasonlóság',
    icon: <Shapes className="w-4 h-4 text-teal-600" />,
    formula: "Egybevágóság: k = 1  |  Hasonlóság: k > 0",
    note: "Az egybevágóság távolságtartó (|A'B'| = |AB|). A hasonlóság aránytartó (|A'B'| = k · |AB|). A szögek mindkét esetben pontosan változatlanok (α' = α).",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="15,38 40,38 27,15" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
        <polygon points="75,40 145,40 110,6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="50" y="28" className="text-[8px] font-bold fill-teal-800">k-szoros</text>
      </svg>
    )
  },
  {
    id: 'sum-c2',
    title: 'Kerület- és Területarány',
    icon: <Layers className="w-4 h-4 text-purple-600" />,
    formula: "K' / K = k   |   T' / T = k²   |   V' / V = k³",
    note: "Hosszak és kerületek aránya k, területek aránya k² (négyzetes!), térfogatok aránya k³ (köbös!). Negatív λ esetén is a területarány pozitív: λ².",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="20" y="15" width="20" height="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="26" y="28" className="text-[8px] font-bold fill-purple-900">T</text>
        <rect x="80" y="5" width="40" height="40" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.8" />
        <text x="92" y="27" className="text-[9px] font-black fill-purple-950">T' = k²·T</text>
      </svg>
    )
  },
  {
    id: 'sum-c3',
    title: 'Középpontos Hasonlóság (O, λ)',
    icon: <Compass className="w-4 h-4 text-indigo-600" />,
    formula: "OP' = |λ| · OP   |   e' ∥ e   |   λ = -1 ⟹ Tükrözés",
    note: "λ > 0 esetén azonos félegyenes, λ < 0 esetén ellentétes félegyenes (180° átfordulás). A centrumon kívüli egyenes képe párhuzamos vele (e' ∥ e).",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="22" x2="145" y2="22" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1" />
        <circle cx="50" cy="22" r="3" fill="#4f46e5" />
        <circle cx="85" cy="22" r="2.5" fill="#0284c7" />
        <circle cx="135" cy="22" r="3" fill="#10b981" />
        <text x="50" y="14" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">O</text>
        <text x="85" y="14" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">P</text>
        <text x="135" y="14" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">P'</text>
      </svg>
    )
  },
  {
    id: 'sum-c4',
    title: 'Párhuzamos Szelők & Szerkesztések',
    icon: <Ruler className="w-4 h-4 text-amber-600" />,
    formula: "OA'/OA = A'B'/AB = k  |  x = (b·c)/a",
    note: "Szakaszosztás: segédfélegyenesre m + k egység körosztás. Negyedik arányos: párhuzamos szelőkkel szerkesztve x = (b · c) / a. Aranymetszés: Φ ≈ 1,618.",
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="15" y1="22" x2="145" y2="6" stroke="#64748b" strokeWidth="1" />
        <line x1="15" y1="22" x2="145" y2="38" stroke="#64748b" strokeWidth="1" />
        <line x1="60" y1="17" x2="60" y2="28" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="120" y1="10" x2="120" y2="34" stroke="#d97706" strokeWidth="1.5" />
      </svg>
    )
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Definíciók (30 feladat)',
    subtitle: 'Egybevágóságok, hasonlóság, középpontos hasonlóság és alapszerkesztések definíciói',
    range: '1-30. kérdés',
    focus: 'Invariánsok, alapesetek, k és λ jelentése, euklideszi eszközök',
    questions: [
      {
        id: 'sum-l1-q1',
        level: 1,
        question: 'Melyik egybevágósági transzformáció az egyetlen a síkban, amely megfordítja az alakzatok körüljárási irányát (orientációváltó)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="125" y1="5" x2="125" y2="60" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="60,48 95,48 77.5,18" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <polygon points="190,48 155,48 172.5,18" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="125" y="62" textAnchor="middle" className="text-[8px] font-bold fill-teal-800">tengely (t)</text>
          </svg>
        ),
        options: ['Tengelyes tükrözés', 'Középpontos tükrözés', 'Párhuzamos eltolás', 'Elforgatás'],
        correctAnswer: 0,
        hint: 'A tükörbe nézve a jobb kéz bal kéznek látszik.',
        explanation: 'A tengelyes tükrözés az egyetlen alapvető egybevágósági transzformáció, amely megfordítja a körüljárási irányt (óramutatóval egyezőből ellentétes lesz).',
        breakdown: [{ label: 'Orientációváltó', value: 'Tengelyes tükrözés' }]
      },
      {
        id: 'sum-l1-q2',
        level: 1,
        question: 'Mi a középpontos tükrözés fixpontja a síkban?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="125" cy="32" r="4.5" fill="#4f46e5" />
            <text x="125" y="20" textAnchor="middle" className="text-[9px] font-black fill-indigo-700">O (egyetlen fixpont)</text>
            <circle cx="55" cy="32" r="3.5" fill="#0284c7" /><text x="55" y="20" textAnchor="middle" className="text-[8px] fill-sky-700">P'</text>
            <circle cx="195" cy="32" r="3.5" fill="#0284c7" /><text x="195" y="20" textAnchor="middle" className="text-[8px] fill-sky-700">P</text>
          </svg>
        ),
        options: ['Pontosan egy pont: a tükrözés O középpontja', 'Egy teljes egyenes', 'Nincs fixpontja', 'A sík minden pontja'],
        correctAnswer: 0,
        hint: 'Melyik pont nem mozdul el a 180°-os átforduláskor?',
        explanation: 'A középpontos tükrözés egyetlen pontot hagy helyben: a tükrözés O középpontját (centrumát).',
        breakdown: [{ label: 'Fixpont', value: 'Kizárólag az O pont' }]
      },
      {
        id: 'sum-l1-q3',
        level: 1,
        question: 'Hány fixpontja van egy nem nulla vektorral történő párhuzamos eltolásnak a síkban?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="50" y1="32" x2="190" y2="32" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="190,32 178,26 178,38" fill="#10b981" />
            <text x="120" y="22" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">v vektor (v ≠ 0)</text>
            <text x="120" y="50" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">Minden pont elmozdul</text>
          </svg>
        ),
        options: ['0 (nincs fixpontja, minden pont elmozdul)', '1 fixpontja van', 'Végtelen sok fixpontja van', '2 fixpontja van'],
        correctAnswer: 0,
        hint: 'Ha a vektor hossza nagyobb nullánál, maradhat-e bármely pont helyben?',
        explanation: 'Mivel a párhuzamos eltolás a sík minden pontját azonos v vektorral tolja el, ha v ≠ 0, egyetlen pont sem maradhat a helyén, nincs fixpontja.',
        breakdown: [{ label: 'Fixpontok száma', value: '0 (ha v ≠ 0)' }]
      },
      {
        id: 'sum-l1-q4',
        level: 1,
        question: 'Két háromszög megfelelő oldalai a = 4 cm, b = 5 cm, c = 6 cm és a\' = 4 cm, b\' = 5 cm, c\' = 6 cm. Melyik alapeset alapján egybevágóak?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="35,48 85,48 65,18" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="145,48 195,48 175,18" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <text x="115" y="35" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">o-o-o</text>
          </svg>
        ),
        options: ['o-o-o (három oldal egyenlő)', 'sz-sz', 'o-sz-o', 'd-o-o'],
        correctAnswer: 0,
        hint: 'Mindhárom oldalpár páronként egyenlő hosszúságú.',
        explanation: 'Ha két háromszög mindhárom oldala páronként egyenlő hosszúságú, akkor az o-o-o alapeset miatt egybevágóak.',
        breakdown: [{ label: 'Alapeset', value: 'o-o-o (oldal-oldal-oldal)' }]
      },
      {
        id: 'sum-l1-q5',
        level: 1,
        question: 'Melyik állítás igaz a háromszögek hasonlóságára, ha két-két belső szögük megegyezik (sz-sz)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="30,48 70,48 55,20" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <polygon points="130,52 210,52 180,8" fill="none" stroke="#0d9488" strokeWidth="2" />
            <text x="120" y="35" textAnchor="middle" className="text-[9px] font-bold fill-teal-700">sz-sz ⟹ Hasonlóak</text>
          </svg>
        ),
        options: ['A két háromszög biztosan hasonló.', 'Csak akkor hasonlóak, ha derékszögűek.', 'A két háromszög biztosan egybevágó is.', 'Nem határozható meg a hasonlóságuk.'],
        correctAnswer: 0,
        hint: 'A háromszög belső szögeinek összege 180°, így a harmadik szög is azonos.',
        explanation: 'Mivel a belső szögek összege 180°, két szög egyezése esetén a harmadik szög is megegyezik, így a háromszögek az sz-sz alapeset alapján hasonlóak.',
        breakdown: [{ label: 'Tétel', value: 'sz-sz hasonlósági alapeset' }]
      },
      {
        id: 'sum-l1-q6',
        level: 1,
        question: 'Mit jelent a geometriai hasonlósági arány k = 1 értéke?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <rect x="45" y="20" width="30" height="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x="145" y="20" width="30" height="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="110" y="38" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">k = 1 ⟹ Egybevágó</text>
          </svg>
        ),
        options: ['Egybevágóságot: a szakaszok hossza és a terület sem változik meg.', 'Nagyítást kétszeresére.', 'Kicsinyítést nullára.', 'Csak pontokra értelmezhető.'],
        correctAnswer: 0,
        hint: '|A\'B\'| = 1 · |AB| = |AB|.',
        explanation: 'Ha k = 1, akkor a képalakzat minden szakasza megegyezik az eredetivel (|A\'B\'| = |AB|), ami pontosan az egybevágóság definíciója.',
        breakdown: [{ label: 'k = 1', value: 'Egybevágóság (távolságtartás)' }]
      },
      {
        id: 'sum-l1-q7',
        level: 1,
        question: 'Milyen k hasonlósági arány esetén beszélünk geometriai nagyításról?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <circle cx="65" cy="35" r="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="165" cy="35" r="26" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <text x="115" y="38" textAnchor="middle" className="text-[9px] font-bold fill-blue-700">k &gt; 1</text>
          </svg>
        ),
        options: ['k > 1', '0 < k < 1', 'k = 1', 'k < 0'],
        correctAnswer: 0,
        hint: 'Nagyításnál a képszakaszok hosszabbak az eredetinél.',
        explanation: 'Geometriai nagyításról akkor beszélünk, ha a hasonlóság aránya 1-nél nagyobb: k > 1.',
        breakdown: [{ label: 'Nagyítás feltétele', value: 'k > 1' }]
      },
      {
        id: 'sum-l1-q8',
        level: 1,
        question: 'Milyen k hasonlósági arány esetén beszélünk geometriai kicsinyítésről?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="35,50 85,50 60,15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <polygon points="160,45 190,45 175,25" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="120" y="35" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">0 &lt; k &lt; 1</text>
          </svg>
        ),
        options: ['0 < k < 1', 'k > 1', 'k = 0', 'k = -1'],
        correctAnswer: 0,
        hint: 'A képszakaszok rövidebbek, de a hosszúság pozitív.',
        explanation: 'Geometriai kicsinyítésről akkor beszélünk, ha a hasonlósági arány 0 és 1 közé esik: 0 < k < 1.',
        breakdown: [{ label: 'Kicsinyítés feltétele', value: '0 < k < 1' }]
      },
      {
        id: 'sum-l1-q9',
        level: 1,
        question: 'Mi a középpontos hasonlóság definíciója szerint a P\' képpont távolsága az O centrumtól?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="50" cy="32" r="4" fill="#4f46e5" /><text x="50" y="20" textAnchor="middle" className="text-[8px] fill-indigo-700">O</text>
            <circle cx="110" cy="32" r="3.5" fill="#0284c7" /><text x="110" y="20" textAnchor="middle" className="text-[8px] fill-sky-700">P</text>
            <circle cx="200" cy="32" r="4" fill="#10b981" /><text x="200" y="20" textAnchor="middle" className="text-[8px] fill-emerald-700">P'</text>
            <text x="155" y="48" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600">OP' = |λ| · OP</text>
          </svg>
        ),
        options: ['OP\' = |λ| · OP', 'OP\' = OP / λ', 'OP\' = OP + λ', 'OP\' = λ² · OP'],
        correctAnswer: 0,
        hint: 'A távolság az eredeti távolság |λ|-szorosa.',
        explanation: 'A középpontos hasonlóságban a képpont az OP egyenesre esik, és távolsága a centrumtól OP\' = |λ| · OP.',
        breakdown: [{ label: 'Képlet', value: 'OP\' = |λ| · OP' }]
      },
      {
        id: 'sum-l1-q10',
        level: 1,
        question: 'Mi történik a középpontos hasonlóságban, ha λ = -1?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="50" cy="32" r="3.5" fill="#f59e0b" /><text x="50" y="20" textAnchor="middle" className="text-[8px] fill-amber-700">P'</text>
            <circle cx="125" cy="32" r="4" fill="#4f46e5" /><text x="125" y="20" textAnchor="middle" className="text-[8px] fill-indigo-700">O</text>
            <circle cx="200" cy="32" r="3.5" fill="#0284c7" /><text x="200" y="20" textAnchor="middle" className="text-[8px] fill-sky-700">P</text>
            <text x="125" y="52" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">Középpontos tükrözés</text>
          </svg>
        ),
        options: ['Pontosan az O pontra vonatkozó középpontos tükrözést kapjuk.', 'Minden pont az O felé mozog a felére.', 'A sík minden pontja helyben marad.', 'Nagyítás történik.'],
        correctAnswer: 0,
        hint: 'OP\' = |-1| · OP = OP és O a felezőpont.',
        explanation: 'Ha λ = -1, akkor OP\' = OP és P\' az ellentétes félegyenesre esik (O a felezőpont), ami pontosan a középpontos tükrözés.',
        breakdown: [{ label: 'λ = -1', value: 'Középpontos tükrözés' }]
      },
      {
        id: 'sum-l1-q11',
        level: 1,
        question: 'Hol van a P\' képpont a centrumhoz képest, ha λ > 0?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#10b981" strokeWidth="2" />
            <circle cx="50" cy="32" r="4" fill="#4f46e5" />
            <circle cx="110" cy="32" r="3.5" fill="#0284c7" />
            <circle cx="190" cy="32" r="3.5" fill="#10b981" />
            <text x="150" y="50" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Azonos félegyenesen (λ &gt; 0)</text>
          </svg>
        ),
        options: ['Az O-ból induló OP félegyenesen (azonos oldalon).', 'Az OP ellentétes félegyenesén.', 'Az OP-re merőleges vonalon.', 'A kör középpontjában.'],
        correctAnswer: 0,
        hint: 'Pozitív számmal szorozva a kezdőpontból nézett irány nem fordul meg.',
        explanation: 'Ha λ > 0, P és P\' a centrum azonos oldalán fekszik az OP félegyenesen.',
        breakdown: [{ label: 'λ > 0', value: 'Azonos félegyenes' }]
      },
      {
        id: 'sum-l1-q12',
        level: 1,
        question: 'Hol van a P\' képpont a centrumhoz képest, ha λ < 0?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#ef4444" strokeWidth="2" />
            <circle cx="50" cy="32" r="3.5" fill="#ef4444" />
            <circle cx="130" cy="32" r="4" fill="#4f46e5" />
            <circle cx="200" cy="32" r="3.5" fill="#0284c7" />
            <text x="130" y="52" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">Ellentétes félegyenes (O a pontok között)</text>
          </svg>
        ),
        options: ['Az OP ellentétes irányú félegyenesén (O a P és P\' között van).', 'Az OP szakasz felezőpontján.', 'Az O azonos oldalán.', 'A koordinátarendszer origójában.'],
        correctAnswer: 0,
        hint: 'A negatív előjel 180°-os átfordulást jelent az O-n át.',
        explanation: 'Ha λ < 0, a képpont az O ellentétes oldalára esik, tehát az O centrum a két pont között helyezkedik el.',
        breakdown: [{ label: 'λ < 0', value: 'Ellentétes félegyenes' }]
      },
      {
        id: 'sum-l1-q13',
        level: 1,
        question: 'Milyen egyenest kapunk, ha egy olyan e egyenest transzformálunk középpontos hasonlósággal, amely NEM megy át az O centrumon?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 sm:h-20 mx-auto">
            <line x1="30" y1="20" x2="220" y2="20" stroke="#0284c7" strokeWidth="2" />
            <circle cx="125" cy="35" r="3.5" fill="#4f46e5" />
            <line x1="30" y1="50" x2="220" y2="50" stroke="#7c3aed" strokeWidth="2" />
            <text x="235" y="24" className="text-[8px] font-bold fill-blue-700">e</text>
            <text x="235" y="54" className="text-[8px] font-bold fill-purple-700">e' ∥ e</text>
          </svg>
        ),
        options: ['Egy az e-vel párhuzamos e\' egyenest (e\' ∥ e).', 'Egy merőleges egyenest.', 'Egy kört.', 'Két metsző egyenest.'],
        correctAnswer: 0,
        hint: 'A középpontos hasonlóságban a centrumot elkerülő egyenesek képe...',
        explanation: 'A középpontos hasonlóság alaptétele: minden, az O-t elkerülő egyenes képe vele párhuzamos egyenes (e\' ∥ e).',
        breakdown: [{ label: 'O ∉ e', value: 'e\' ∥ e (párhuzamos)' }]
      },
      {
        id: 'sum-l1-q14',
        level: 1,
        question: 'Mi a képe az olyan egyenesnek, amely ÁTMEGY az O centrumon középpontos hasonlóságnál?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="32" x2="220" y2="32" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="125" cy="32" r="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="125" y="50" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">e' = e (invariáns egyenes)</text>
          </svg>
        ),
        options: ['Képe önmaga: e\' = e (invariáns egyenes).', 'Egy merőleges egyenes.', 'Ponttá zsugorodik az O-ban.', 'Egy parabolává alakul.'],
        correctAnswer: 0,
        hint: 'Mivel minden pont képe a centrummal összekötő egyenesre esik...',
        explanation: 'Ha az egyenes átmegy az O ponton, minden pontjának képe is erre az egyenesre esik, így képe önmaga (e\' = e, invariáns egyenes).',
        breakdown: [{ label: 'O ∈ e', value: 'e\' = e' }]
      },
      {
        id: 'sum-l1-q15',
        level: 1,
        question: 'Melyik két eszközt engedi meg a klasszikus euklideszi geometriai szerkesztés?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="40" y1="45" x2="210" y2="45" stroke="#d97706" strokeWidth="2" />
            <path d="M 100 45 L 125 15 L 150 45" fill="none" stroke="#b45309" strokeWidth="1.5" />
            <text x="125" y="60" textAnchor="middle" className="text-[8px] font-bold fill-amber-800">Körző és beosztás nélküli vonalzó</text>
          </svg>
        ),
        options: ['Körzőt és beosztás nélküli egyenes vonalzót.', 'Szögmérőt és milliméteres vonalzót.', 'Számológépet és sablonokat.', 'Csak mérőszalagot.'],
        correctAnswer: 0,
        hint: 'A klasszikus szerkesztésben nem mérünk számértékeket.',
        explanation: 'A klasszikus szerkesztés alapelve szerint kizárólag körző és beosztás nélküli egyenes vonalzó használható.',
        breakdown: [{ label: 'Eszközök', value: 'Körző és beosztás nélküli vonalzó' }]
      },
      {
        id: 'sum-l1-q16',
        level: 1,
        question: 'Egy AB szakaszt 2 : 3 arányban akarunk felosztani segédfélegyenessel. Hány egyenlő körosztást kell felmérnünk a segédfélegyenesre?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="40" y1="45" x2="210" y2="45" stroke="#0284c7" strokeWidth="2" />
            <line x1="40" y1="45" x2="190" y2="15" stroke="#94a3b8" strokeWidth="1" />
            <text x="125" y="60" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">2 + 3 = 5 egység</text>
          </svg>
        ),
        options: ['5 egységet (2 + 3 = 5)', '6 egységet (2 · 3 = 6)', '3 egységet', '1 egységet'],
        correctAnswer: 0,
        hint: 'Az aránytagok összegét kell venni.',
        explanation: 'Szakasz m : k arányú osztásakor a segédfélegyenesre m + k = 2 + 3 = 5 darab egyenlő körosztást mérünk fel.',
        breakdown: [{ label: 'Körosztások száma', value: '2 + 3 = 5' }]
      },
      {
        id: 'sum-l1-q17',
        level: 1,
        question: 'Mit nevezünk a szakaszfelező merőlegesnek?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="40" y1="35" x2="210" y2="35" stroke="#0284c7" strokeWidth="2" />
            <line x1="125" y1="10" x2="125" y2="60" stroke="#10b981" strokeWidth="2" />
            <text x="125" y="62" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Felezőmerőleges</text>
          </svg>
        ),
        options: ['A szakasz felezőpontján átmenő, a szakaszra merőleges egyenest.', 'Egy tetszőleges párhuzamost.', 'A szakaszt érintő kört.', 'A szakasz végpontjában állított merőlegest.'],
        correctAnswer: 0,
        hint: 'A felezőpontban merőleges egyenes.',
        explanation: 'A szakaszfelező merőleges a szakasz felezőpontján áthaladó, a szakaszra merőleges egyenes, amelynek minden pontja egyenlő távol van a végpontoktól.',
        breakdown: [{ label: 'Tulajdonság', value: 'Felezőpontban merőleges' }]
      },
      {
        id: 'sum-l1-q18',
        level: 1,
        question: 'Hogyan változik a síkidomok belső szögeinek nagysága a geometriai hasonlóság során?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <path d="M 40 45 L 80 45 L 65 20" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 140 45 L 210 45 L 185 10" fill="none" stroke="#0d9488" strokeWidth="2" />
            <text x="125" y="35" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">α' = α (szögtartás)</text>
          </svg>
        ),
        options: ['Pontosan változatlan marad (α\' = α, szögtartó leképezés).', 'k-szorosára nő.', 'k²-szeresére nő.', 'A felére csökken.'],
        correctAnswer: 0,
        hint: 'A hasonlóság alaktartó, a szögek nem változnak.',
        explanation: 'A geometriai hasonlóság és a középpontos hasonlóság szigorúan szögtartó: a képalakzat minden szöge egyenlő az eredeti alakzat megfelelő szögével.',
        breakdown: [{ label: 'Szögek', value: 'α\' = α' }]
      },
      {
        id: 'sum-l1-q19',
        level: 1,
        question: 'Egy háromszög oldalai 3 cm, 4 cm, 5 cm. Hasonló háromszöget készítünk k = 2 aránnyal. Mekkorák a képháromszög oldalai?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 sm:h-20 mx-auto">
            <polygon points="40,48 70,48 40,25" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <polygon points="130,52 190,52 130,10" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <text x="100" y="35" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">k = 2</text>
          </svg>
        ),
        options: ['6 cm, 8 cm, 10 cm', '5 cm, 6 cm, 7 cm', '9 cm, 16 cm, 25 cm', '1,5 cm, 2 cm, 2,5 cm'],
        correctAnswer: 0,
        hint: 'Minden oldalt meg kell szorozni 2-vel.',
        explanation: 'Minden oldal hossza k-szorosára nő: 3 · 2 = 6 cm, 4 · 2 = 8 cm, 5 · 2 = 10 cm.',
        breakdown: [{ label: 'Számítás', value: '3·2=6, 4·2=8, 5·2=10 cm' }]
      },
      {
        id: 'sum-l1-q20',
        level: 1,
        question: 'Mi a negyedik arányos x szakasz képlete az a : b = c : x aránypárból?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">a : b = c : x</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-950">x = (b · c) / a</text>
          </svg>
        ),
        options: ['x = (b · c) / a', 'x = (a · b) / c', 'x = a + b - c', 'x = b² / a'],
        correctAnswer: 0,
        hint: 'Keresztbe szorzás: a · x = b · c.',
        explanation: 'Az a / b = c / x egyenletből keresztbe szorozva a · x = b · c, amiből x = (b · c) / a.',
        breakdown: [{ label: 'Képlet', value: 'x = (b · c) / a' }]
      },
      {
        id: 'sum-l1-q21',
        level: 1,
        question: 'Hány fixpontja van egy λ = 1 arányú középpontos hasonlóságnak?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="90,48 160,48 125,18" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <text x="125" y="38" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">λ = 1 (Identitás)</text>
          </svg>
        ),
        options: ['Végtelen sok (a sík minden pontja fixpont)', 'Pontosan 1', 'Nincs fixpontja', '2'],
        correctAnswer: 0,
        hint: 'Ha minden pont képe önmaga...',
        explanation: 'Ha λ = 1, az identitásról van szó: a sík minden pontja helyben marad, tehát végtelen sok fixpontja van.',
        breakdown: [{ label: 'λ = 1', value: 'Minden pont fixpont' }]
      },
      {
        id: 'sum-l1-q22',
        level: 1,
        question: 'Egy pont centrumtól mért távolsága OP = 5 cm, a hasonlósági arány λ = 3. Mekkora az OP\' távolság?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="35" r="3.5" fill="#4f46e5" /><text x="50" y="22" textAnchor="middle" className="text-[7px]">O</text>
            <circle cx="100" cy="35" r="3" fill="#0284c7" /><text x="100" y="22" textAnchor="middle" className="text-[7px]">P (5 cm)</text>
            <circle cx="200" cy="35" r="3.5" fill="#2563eb" /><text x="200" y="22" textAnchor="middle" className="text-[7px]">P' (?)</text>
          </svg>
        ),
        options: ['15 cm (OP\' = 3 · 5 = 15 cm)', '8 cm', '125 cm', '1,67 cm'],
        correctAnswer: 0,
        hint: 'OP\' = |λ| · OP.',
        explanation: 'Az alapképlet szerint OP\' = |λ| · OP = 3 · 5 cm = 15 cm.',
        breakdown: [{ label: 'Számítás', value: '3 · 5 cm = 15 cm' }]
      },
      {
        id: 'sum-l1-q23',
        level: 1,
        question: 'Egy pont centrumtól mért távolsága OP = 6 cm, a hasonlósági arány λ = -2. Mekkora az OP\' távolság a centrumtól?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#ef4444" strokeWidth="2" />
            <circle cx="50" cy="35" r="3.5" fill="#ef4444" /><text x="50" y="22" textAnchor="middle" className="text-[7px]">P'</text>
            <circle cx="110" cy="35" r="4" fill="#4f46e5" /><text x="110" y="22" textAnchor="middle" className="text-[7px]">O</text>
            <circle cx="200" cy="35" r="3.5" fill="#0284c7" /><text x="200" y="22" textAnchor="middle" className="text-[7px]">P (6 cm)</text>
          </svg>
        ),
        options: ['12 cm (OP\' = |-2| · 6 = 12 cm az O ellentétes oldalán)', '-12 cm', '3 cm', '4 cm'],
        correctAnswer: 0,
        hint: 'A távolság nem lehet negatív: abszolútérték szerepel.',
        explanation: 'A távolság mindig nemnegatív: OP\' = |-2| · 6 cm = 12 cm. A negatív előjel a másik oldali elhelyezkedést jelenti.',
        breakdown: [{ label: 'Távolság', value: 'OP\' = |-2| · 6 = 12 cm' }]
      },
      {
        id: 'sum-l1-q24',
        level: 1,
        question: 'Mit jelent a harmadik arányos szakasz két adott a és b szakasz esetén?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-purple-800">a : b = b : x ⟹ x = b² / a</text>
          </svg>
        ),
        options: ['Azt az x szakaszt, amelyre a : b = b : x teljesül.', 'A két szakasz összegét.', 'A szakaszok átlagát.', 'A kerület harmadát.'],
        correctAnswer: 0,
        hint: 'A negyedik arányos speciális esete c = b mellett.',
        explanation: 'A harmadik arányos az az x szakasz, amelyre a : b = b : x, vagyis x = b² / a.',
        breakdown: [{ label: 'Képlet', value: 'x = b² / a' }]
      },
      {
        id: 'sum-l1-q25',
        level: 1,
        question: 'Melyik transzformáció őrzi meg a síkidomok területét?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">T' = T (Minden egybevágóság területtartó)</text>
          </svg>
        ),
        options: ['Minden egybevágósági transzformáció', 'Csak a nagyítás', 'Csak a kicsinyítés', 'Egyik transzformáció sem'],
        correctAnswer: 0,
        hint: 'A távolságtartás magával vonja a területtartást is.',
        explanation: 'Minden egybevágóság (tengelyes tükrözés, középpontos tükrözés, eltolás, forgatás) területtartó (T\' = T).',
        breakdown: [{ label: 'Invariáns', value: 'Terület és kerület az egybevágóságoknál' }]
      },
      {
        id: 'sum-l1-q26',
        level: 1,
        question: 'Mi a feltétele annak, hogy két szabályos sokszög (pl. két négyzet) hasonló legyen?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <rect x="50" y="20" width="25" height="25" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <rect x="140" y="10" width="45" height="45" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="125" y="60" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">Minden négyzet hasonló!</text>
          </svg>
        ),
        options: ['Bármely két szabályos n-szög (pl. bármely két négyzet) feltétel nélkül mindig hasonló egymáshoz.', 'Csak ha az oldalaik egyenlők.', 'Csak ha azonos a területük.', 'Csak ha van közös csúcsuk.'],
        correctAnswer: 0,
        hint: 'Minden szabályos n-szög belső szögei azonosak, és oldalaik egyenlőek.',
        explanation: 'Mivel a szabályos n-szögek belső szögei mind egyenlők és oldalaik aránya azonos, bármely két szabályos n-szög mindig hasonló.',
        breakdown: [{ label: 'Szabályos alakzatok', value: 'Mindig hasonlók' }]
      },
      {
        id: 'sum-l1-q27',
        level: 1,
        question: 'Hogyan állapítható meg két tetszőleges kör hasonlósága?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <circle cx="70" cy="35" r="16" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="160" cy="35" r="26" fill="none" stroke="#0284c7" strokeWidth="2" />
            <text x="125" y="60" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">Minden kör hasonló!</text>
          </svg>
        ),
        options: ['Bármely két kör mindig hasonló egymáshoz, a hasonlósági arány a sugaraik hányadosa (k = r₂ / r₁).', 'Csak ha koncentrikusak.', 'Csak ha azonos sugarúak.', 'Körök sosem hasonlók.'],
        correctAnswer: 0,
        hint: 'Minden körnek tökéletesen azonos az alakja.',
        explanation: 'Bármely két kör geometriailag hasonló, a hasonlósági arányuk a sugaraik hányadosa: k = r₂ / r₁.',
        breakdown: [{ label: 'Körök', value: 'Bármely két kör hasonló' }]
      },
      {
        id: 'sum-l1-q28',
        level: 1,
        question: 'Egy szakaszt 4 egyenlő részre osztunk. Hány belső osztópont keletkezik a szakaszon?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="77.5" cy="35" r="3" fill="#10b981" />
            <circle cx="125" cy="35" r="3" fill="#10b981" />
            <circle cx="172.5" cy="35" r="3" fill="#10b981" />
            <text x="125" y="55" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">4 részhez 3 belső osztópont kell</text>
          </svg>
        ),
        options: ['3 belső osztópont', '4 belső osztópont', '5 belső osztópont', '2 belső osztópont'],
        correctAnswer: 0,
        hint: 'n darab részhez n - 1 belső vágás / osztópont szükséges.',
        explanation: 'Egy szakasz 4 egyenlő részre bontásakor a szakasz belsejében 4 - 1 = 3 darab osztópont jön létre.',
        breakdown: [{ label: 'Összefüggés', value: 'n rész ⟹ n - 1 belső pont' }]
      },
      {
        id: 'sum-l1-q29',
        level: 1,
        question: 'Egy szakaszfelező merőleges hány fokos szöget zár be a szakasszal?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="40" y1="40" x2="210" y2="40" stroke="#0284c7" strokeWidth="2" />
            <line x1="125" y1="10" x2="125" y2="60" stroke="#10b981" strokeWidth="2" />
            <path d="M 125 32 L 133 32 L 133 40" fill="none" stroke="#10b981" strokeWidth="1" />
            <text x="145" y="32" className="text-[8px] font-bold fill-emerald-700">90°</text>
          </svg>
        ),
        options: ['Pontosan 90°-ot (derékszög)', '45°-ot', '60°-ot', '180°-ot'],
        correctAnswer: 0,
        hint: 'A neve: felezőMERŐLEGES.',
        explanation: 'A merőleges egyenes a definíció szerint 90°-os szöget zár be a metszett egyenessel.',
        breakdown: [{ label: 'Szög', value: '90° (derékszög)' }]
      },
      {
        id: 'sum-l1-q30',
        level: 1,
        question: 'Mi a háromszög középvonalának definíciója?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="40,55 190,55 120,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="35" x2="155" y2="35" stroke="#10b981" strokeWidth="2" />
            <text x="120" y="47" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">Középvonal</text>
          </svg>
        ),
        options: ['A háromszög két oldalának felezőpontját összekötő szakasz.', 'A csúcsból a szemközti oldalra húzott merőleges.', 'A belső szög felezője.', 'A leghosszabb magasság.'],
        correctAnswer: 0,
        hint: 'Az oldalak közepét köti össze.',
        explanation: 'A háromszög középvonala két oldal felezőpontját köti össze; párhuzamos a harmadik oldallal és feleakkora hosszú.',
        breakdown: [{ label: 'Definíció', value: 'Két oldalfelező pontot összekötő szakasz' }]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és Tulajdonságok (30 feladat)',
    subtitle: 'Kerületek és területek aránya, párhuzamos szelők tétele, arányos szakaszok',
    range: '31-60. kérdés',
    focus: 'K\'/K = k, T\'/T = k², szelőszakaszok aránya, negyedik arányos számítása',
    questions: [
      {
        id: 'sum-l2-q31',
        level: 2,
        question: 'Egy háromszög kerülete K = 20 cm. Mekkora lesz a képháromszög kerülete, ha k = 3 aránnyal nagyítjuk?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-blue-700">K = 20 cm, k = 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-blue-900">K' = 3 · 20 = 60 cm</text>
          </svg>
        ),
        options: ['60 cm (K\' = 3 · 20 = 60 cm)', '180 cm', '23 cm', '6,67 cm'],
        correctAnswer: 0,
        hint: 'K\' = k · K.',
        explanation: 'A kerületek aránya megegyezik a hasonlóság arányával: K\' = k · K = 3 · 20 cm = 60 cm.',
        breakdown: [{ label: 'Számítás', value: 'K\' = 3 · 20 = 60 cm' }]
      },
      {
        id: 'sum-l2-q32',
        level: 2,
        question: 'Egy háromszög területe T = 12 cm². Mekkora lesz a területe k = 3 arányú nagyítás után?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">T = 12 cm², k = 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">T' = 3² · 12 = 9 · 12 = 108 cm²</text>
          </svg>
        ),
        options: ['108 cm² (T\' = 3² · 12 = 9 · 12 = 108 cm²)', '36 cm²', '24 cm²', '144 cm²'],
        correctAnswer: 0,
        hint: 'A területek aránya k²!',
        explanation: 'A területarány a hasonlóság arányának négyzete: T\' = k² · T = 3² · 12 = 9 · 12 = 108 cm².',
        breakdown: [{ label: 'Számítás', value: 'T\' = 9 · 12 = 108 cm²' }]
      },
      {
        id: 'sum-l2-q33',
        level: 2,
        question: 'Egy sokszög területe T = 15 cm², a hasonlósági arány λ = -2. Mekkora lesz a képalakzat területe?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">T = 15 cm², λ = -2</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-rose-950">T' = (-2)² · 15 = 4 · 15 = 60 cm²</text>
          </svg>
        ),
        options: ['60 cm² (T\' = (-2)² · 15 = 4 · 15 = 60 cm²)', '-30 cm²', '30 cm²', '-60 cm²'],
        correctAnswer: 0,
        hint: '(-2)² = +4, a területarány pozitív!',
        explanation: 'A terület mindig pozitív: T\' = λ² · T = (-2)² · 15 = 4 · 15 = 60 cm².',
        breakdown: [{ label: 'Számítás', value: '4 · 15 = 60 cm²' }]
      },
      {
        id: 'sum-l2-q34',
        level: 2,
        question: 'Két hasonló sokszög területe T = 18 cm² és T\' = 72 cm². Mekkora a hasonlóság aránya (k)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">k² = 72 / 18 = 4</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">k = √4 = 2</text>
          </svg>
        ),
        options: ['k = 2 (mivel k² = 72 / 18 = 4 ⟹ k = 2)', 'k = 4', 'k = 16', 'k = 0,5'],
        correctAnswer: 0,
        hint: 'k = √(T\' / T).',
        explanation: 'A területek hányadosa k² = 72 / 18 = 4, amiből gyökvonással k = 2.',
        breakdown: [{ label: 'Számítás', value: 'k = √4 = 2' }]
      },
      {
        id: 'sum-l2-q35',
        level: 2,
        question: 'Egy O csúcsú szög száraira OA = 4 cm és OA\' = 12 cm pontokat mérünk. Ha AB = 5 cm és A\'B\' ∥ AB, mekkora az A\'B\' szakasz?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="20" y1="40" x2="220" y2="15" stroke="#64748b" strokeWidth="1.5" />
            <line x1="20" y1="40" x2="220" y2="60" stroke="#64748b" strokeWidth="1.5" />
            <line x1="80" y1="33" x2="80" y2="47" stroke="#3b82f6" strokeWidth="2" />
            <line x1="180" y1="20" x2="180" y2="56" stroke="#8b5cf6" strokeWidth="2.5" />
            <text x="130" y="30" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">A'B' / 5 = 12 / 4</text>
          </svg>
        ),
        options: ['15 cm (A\'B\' / 5 = 12 / 4 = 3 ⟹ A\'B\' = 15 cm)', '10 cm', '20 cm', '16 cm'],
        correctAnswer: 0,
        hint: 'A\'B\' / AB = OA\' / OA.',
        explanation: 'Párhuzamos szelőszakaszok tétele: A\'B\' / 5 = 12 / 4 = 3 ⟹ A\'B\' = 3 · 5 = 15 cm.',
        breakdown: [{ label: 'Számítás', value: 'A\'B\' = 3 · 5 = 15 cm' }]
      },
      {
        id: 'sum-l2-q36',
        level: 2,
        question: 'Adott három szakasz: a = 4 cm, b = 6 cm és c = 10 cm. Mekkora a negyedik arányos x szakasz?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-indigo-700">4 : 6 = 10 : x</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-indigo-950">x = (6 · 10) / 4 = 15 cm</text>
          </svg>
        ),
        options: ['15 cm [x = (6 · 10) / 4 = 15 cm]', '20 cm', '12 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'x = (b · c) / a.',
        explanation: 'x = (6 · 10) / 4 = 60 / 4 = 15 cm.',
        breakdown: [{ label: 'Számítás', value: 'x = 60 / 4 = 15 cm' }]
      },
      {
        id: 'sum-l2-q37',
        level: 2,
        question: 'Egy 21 cm hosszú szakaszt 3 : 4 arányban osztunk fel egy P ponttal. Milyen hosszú a rövidebb AP szakasz?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="111.4" cy="35" r="3.5" fill="#10b981" />
            <text x="70" y="25" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">9 cm</text>
            <text x="165" y="25" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">12 cm</text>
          </svg>
        ),
        options: ['9 cm [3 + 4 = 7 rész, 21 / 7 = 3 cm, 3 · 3 = 9 cm]', '12 cm', '7 cm', '6 cm'],
        correctAnswer: 0,
        hint: 'Összesen 3 + 4 = 7 rész. Egy rész 21 / 7 = 3 cm.',
        explanation: 'A 21 cm-t 7 részre osztva 1 rész 3 cm. A 3 részből álló szakasz 3 · 3 = 9 cm, a 4 részes pedig 12 cm.',
        breakdown: [{ label: 'Számítás', value: '21 · (3 / 7) = 9 cm' }]
      },
      {
        id: 'sum-l2-q38',
        level: 2,
        question: 'Egy bot magassága 1,2 m, árnyéka 0,8 m. Ekkor egy fa árnyéka 6 m. Milyen magas a fa?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="40" y1="45" x2="40" y2="25" stroke="#92400e" strokeWidth="2" />
            <line x1="40" y1="45" x2="60" y2="45" stroke="#64748b" strokeWidth="2" />
            <line x1="130" y1="45" x2="130" y2="10" stroke="#166534" strokeWidth="3" />
            <line x1="130" y1="45" x2="210" y2="45" stroke="#64748b" strokeWidth="2" />
            <text x="170" y="30" textAnchor="middle" className="text-[8px] font-bold fill-emerald-800">M / 1,2 = 6 / 0,8</text>
          </svg>
        ),
        options: ['9 m [M / 1,2 = 6 / 0,8 ⟹ M = 9 m]', '7,2 m', '8 m', '10 m'],
        correctAnswer: 0,
        hint: 'Magasságok aránya = árnyékok aránya.',
        explanation: 'M / 1,2 = 6 / 0,8 = 7,5 ⟹ M = 7,5 · 1,2 = 9 m.',
        breakdown: [{ label: 'Számítás', value: 'M = 1,2 · (6 / 0,8) = 9 m' }]
      },
      {
        id: 'sum-l2-q39',
        level: 2,
        question: 'Egy háromszög területe T = 36 cm². A háromszög középvonalai által levágott csúcsháromszög mekkora területű?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="40,55 190,55 115,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <polygon points="77.5,35 152.5,35 115,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="115" y="47" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">T / 4 = 9 cm²</text>
          </svg>
        ),
        options: ['9 cm² (T / 4 = 36 / 4 = 9 cm²)', '18 cm²', '12 cm²', '6 cm²'],
        correctAnswer: 0,
        hint: 'A középvonal felezi az oldalakat, k = 1/2, a területarány (1/2)² = 1/4.',
        explanation: 'A középvonal k = 1/2 arányú kicsinyítést hoz létre, így területe az eredeti terület negyede: 36 / 4 = 9 cm².',
        breakdown: [{ label: 'Számítás', value: '36 / 4 = 9 cm²' }]
      },
      {
        id: 'sum-l2-q40',
        level: 2,
        question: 'Egy kocka éleit 2-szeresükre növeljük (k = 2). Hányszorosára nő a térfogata?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">k = 2 (élek duplázása)</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-emerald-900">V' / V = 2³ = 8-szoros</text>
          </svg>
        ),
        options: ['8-szorosára (V\' / V = k³ = 2³ = 8)', '4-szeresére', '2-szeresére', '16-szorosára'],
        correctAnswer: 0,
        hint: 'A térfogat köbös mennyiség: k³!',
        explanation: 'A térbeli testek térfogata a hasonlósági arány köbével arányos: k³ = 2³ = 8.',
        breakdown: [{ label: 'Térfogatarány', value: 'k³ = 2³ = 8' }]
      },
      {
        id: 'sum-l2-q41',
        level: 2,
        question: 'Egy kocka éleit 3-szorosára növeljük (k = 3). Hányszorosára nő a felszíne?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">Felszín: kétdimenziós lapok összege</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">A' / A = 3² = 9-szeres</text>
          </svg>
        ),
        options: ['9-szeresére (A\' / A = k² = 3² = 9)', '27-szeresére', '3-szorosára', '6-szorosára'],
        correctAnswer: 0,
        hint: 'A felszín területjellegű: k²!',
        explanation: 'A testek felszíne síklapokból áll, ezért a felületarány k² = 3² = 9.',
        breakdown: [{ label: 'Felszínarány', value: 'k² = 3² = 9' }]
      },
      {
        id: 'sum-l2-q42',
        level: 2,
        question: 'Ha a harmadik arányos szerkesztésében a = 2 cm és b = 6 cm, mekkora az x szakasz?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[9px] font-bold fill-purple-700">2 : 6 = 6 : x</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-950">x = 6² / 2 = 36 / 2 = 18 cm</text>
          </svg>
        ),
        options: ['18 cm [x = 6² / 2 = 36 / 2 = 18 cm]', '12 cm', '9 cm', '36 cm'],
        correctAnswer: 0,
        hint: 'x = b² / a.',
        explanation: 'x = b² / a = 6² / 2 = 36 / 2 = 18 cm.',
        breakdown: [{ label: 'Számítás', value: 'x = 36 / 2 = 18 cm' }]
      },
      {
        id: 'sum-l2-q43',
        level: 2,
        question: 'Két hasonló háromszög kerülete K = 15 cm és K\' = 45 cm. Hányszorosa a nagyobbik háromszög területe a kisebbikének?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">k = 45 / 15 = 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-800">T' / T = 3² = 9-szeres</text>
          </svg>
        ),
        options: ['9-szerese (k = 45 / 15 = 3 ⟹ T\' / T = 3² = 9)', '3-szorosa', '6-szorosa', '27-szerese'],
        correctAnswer: 0,
        hint: 'Először számold ki k-t a kerületek arányából, majd vedd a négyzetét!',
        explanation: 'A kerületek aránya k = 45 / 15 = 3. A területek aránya k² = 3² = 9.',
        breakdown: [{ label: 'k értéke', value: '3' }, { label: 'Területarány', value: '3² = 9' }]
      },
      {
        id: 'sum-l2-q44',
        level: 2,
        question: 'Egy szakaszt a P ponttal 1 : 4 arányban osztunk fel. Hányadrésze az AP szakasz a teljes AB szakasznak?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="68" cy="35" r="3.5" fill="#10b981" />
            <text x="125" y="55" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">AP / AB = 1 / (1 + 4) = 1/5</text>
          </svg>
        ),
        options: ['1/5 része (20%-a)', '1/4 része (25%-a)', '1/3 része', '4/5 része'],
        correctAnswer: 0,
        hint: 'Az egész szakasz 1 + 4 = 5 egyenlő részből áll.',
        explanation: 'Az egész szakasz 1 + 4 = 5 egység, amiből az AP szakasz 1 egység, tehát az 1/5 része (20%).',
        breakdown: [{ label: 'Arány', value: '1 / (1+4) = 1/5' }]
      },
      {
        id: 'sum-l2-q45',
        level: 2,
        question: 'Egy O csúcsú szög szárain OA = 3 cm, AA\' = 6 cm és OB = 4 cm. Mekkora a BB\' szakasz hossza a másik száron?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">AA' / OA = BB' / OB</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-indigo-900">6 / 3 = BB' / 4 ⟹ BB' = 8 cm</text>
          </svg>
        ),
        options: ['8 cm (6 / 3 = 2 ⟹ BB\' = 2 · 4 = 8 cm)', '6 cm', '10 cm', '12 cm'],
        correctAnswer: 0,
        hint: 'A szárakon levő szakaszok aránya megegyezik: AA\' / OA = BB\' / OB.',
        explanation: 'AA\' / OA = BB\' / OB ⟹ 6 / 3 = BB\' / 4 ⟹ 2 = BB\' / 4 ⟹ BB\' = 8 cm.',
        breakdown: [{ label: 'Számítás', value: 'BB\' = 2 · 4 = 8 cm' }]
      },
      {
        id: 'sum-l2-q46',
        level: 2,
        question: 'Egy derékszögű háromszög befogói 3 cm és 4 cm. Középpontos hasonlósággal k = 4 aránnyal nagyítjuk. Mekkora lesz az új átfogó?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">Eredeti átfogó: c = √(3²+4²) = 5 cm</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-blue-900">c' = 4 · 5 = 20 cm</text>
          </svg>
        ),
        options: ['20 cm [c = √(3²+4²) = 5 cm ⟹ c\' = 4 · 5 = 20 cm]', '12 cm', '16 cm', '25 cm'],
        correctAnswer: 0,
        hint: 'Előbb számold ki az eredeti átfogót Pitagorasz-tétellel, majd szorozd 4-gyel!',
        explanation: 'Pitagorasz-tétellel c = √(9 + 16) = 5 cm. A hasonlósággal c\' = k · c = 4 · 5 = 20 cm.',
        breakdown: [{ label: 'Eredeti c', value: '5 cm' }, { label: 'Új c\'', value: '4 · 5 = 20 cm' }]
      },
      {
        id: 'sum-l2-q47',
        level: 2,
        question: 'Egy kör területe T = 50 cm². Középpontos hasonlósággal λ = 0,5 aránnyal kicsinyítjük. Mekkora a képkör területe?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">T' = (0,5)² · 50 = 0,25 · 50</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">T' = 12,5 cm²</text>
          </svg>
        ),
        options: ['12,5 cm² [T\' = 0,5² · 50 = 0,25 · 50 = 12,5 cm²]', '25 cm²', '10 cm²', '5 cm²'],
        correctAnswer: 0,
        hint: 'A területarány k² = 0,5² = 0,25 = 1/4.',
        explanation: 'T\' = k² · T = (1/2)² · 50 = 50 / 4 = 12,5 cm².',
        breakdown: [{ label: 'Számítás', value: '50 / 4 = 12,5 cm²' }]
      },
      {
        id: 'sum-l2-q48',
        level: 2,
        question: 'A koordinátasíkon az origó a centrum. Hova képződik a P(2, -3) pont λ = -3 aránnyal?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">P(x, y) ↦ P'(λx, λy)</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-mono font-black fill-indigo-950">(-3·2, -3·(-3)) = (-6, 9)</text>
          </svg>
        ),
        options: ['P\'(-6, 9)', 'P\'(6, -9)', 'P\'(-5, 0)', 'P\'(-6, -9)'],
        correctAnswer: 0,
        hint: 'Mindkét koordinátát meg kell szorozni λ = -3-mal.',
        explanation: 'P\'(λ · x, λ · y) = P\'((-3) · 2, (-3) · (-3)) = P\'(-6, 9).',
        breakdown: [{ label: 'Koordináták', value: '(-6, 9)' }]
      },
      {
        id: 'sum-l2-q49',
        level: 2,
        question: 'Két háromszög hasonló, oldalaik aránya k = 2,5. Ha a kisebb háromszög egyik magassága m = 4 cm, mekkora a nagyobbik megfelelő magassága?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-blue-800">m' = 2,5 · 4 = 10 cm</text>
          </svg>
        ),
        options: ['10 cm (m\' = 2,5 · 4 = 10 cm)', '16 cm', '6,5 cm', '25 cm'],
        correctAnswer: 0,
        hint: 'A magasság egydimenziós hosszúság, aránya k.',
        explanation: 'Minden hosszméret k-szorosára nő: m\' = k · m = 2,5 · 4 cm = 10 cm.',
        breakdown: [{ label: 'Számítás', value: '2,5 · 4 = 10 cm' }]
      },
      {
        id: 'sum-l2-q50',
        level: 2,
        question: 'Egy téglalap oldalai 3 cm és 5 cm. Hányszorosára nő a területe, ha mindkét oldalát megkétszerezzük?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <rect x="50" y="20" width="20" height="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <rect x="140" y="10" width="40" height="50" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="125" y="58" textAnchor="middle" className="text-[8px] font-bold fill-purple-900">k² = 2² = 4-szeres</text>
          </svg>
        ),
        options: ['4-szeresére (k² = 2² = 4)', '2-szeresére', '8-szorosára', '16-szorosára'],
        correctAnswer: 0,
        hint: 'Mindkét oldal hossza duplázódik: a terület k²-szeres.',
        explanation: 'Eredeti terület 3 · 5 = 15 cm², új terület 6 · 10 = 60 cm², ami 60 / 15 = 4 = 2²-szeres növekedés.',
        breakdown: [{ label: 'Területarány', value: '2² = 4' }]
      },
      {
        id: 'sum-l2-q51',
        level: 2,
        question: 'Ha egy pont távolsága a centrumtól OP = 16 cm és képe OP\' = 4 cm az O azonos oldalán, mennyi a λ értéke?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">λ = OP' / OP = 4 / 16 = 0,25 = 1/4</text>
          </svg>
        ),
        options: ['λ = +0,25 = 1/4', 'λ = +4', 'λ = -0,25', 'λ = +0,5'],
        correctAnswer: 0,
        hint: 'λ = OP\' / OP.',
        explanation: 'Az arány λ = OP\' / OP = 4 / 16 = 0,25 = 1/4. Mivel azonos oldalon van, az előjel pozitív.',
        breakdown: [{ label: 'Számítás', value: '4 / 16 = 0,25' }]
      },
      {
        id: 'sum-l2-q52',
        level: 2,
        question: 'Egy trapéz párhuzamos oldalai 6 cm és 10 cm, magassága 4 cm. Hasonló trapéz készül k = 1,5 aránnyal. Mekkora lesz az új magasság?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-blue-800">m' = 1,5 · 4 = 6 cm</text>
          </svg>
        ),
        options: ['6 cm (m\' = 1,5 · 4 = 6 cm)', '9 cm', '8 cm', '4,5 cm'],
        correctAnswer: 0,
        hint: 'A magasság k-szorosára nő.',
        explanation: 'm\' = k · m = 1,5 · 4 cm = 6 cm.',
        breakdown: [{ label: 'Számítás', value: '1,5 · 4 = 6 cm' }]
      },
      {
        id: 'sum-l2-q53',
        level: 2,
        question: 'Ha egy szabályos háromszög oldala a = 6 cm, és középvonalaiból új háromszöget képezünk, mekkora lesz annak kerülete?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="40,55 190,55 115,15" fill="none" stroke="#64748b" strokeWidth="1" />
            <polygon points="77.5,35 152.5,35 115,55" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="115" y="47" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">K' = 18 / 2 = 9 cm</text>
          </svg>
        ),
        options: ['9 cm [K = 18 cm ⟹ K\' = 18 / 2 = 9 cm]', '12 cm', '6 cm', '4,5 cm'],
        correctAnswer: 0,
        hint: 'Az eredeti kerület 3 · 6 = 18 cm, a középvonalak aránya k = 1/2.',
        explanation: 'Eredeti kerület K = 3 · 6 = 18 cm. A középvonalak által alkotott háromszög minden oldala feleakkora (3 cm), kerülete 3 · 3 = 9 cm.',
        breakdown: [{ label: 'Számítás', value: '18 cm / 2 = 9 cm' }]
      },
      {
        id: 'sum-l2-q54',
        level: 2,
        question: 'Két hasonló háromszög területe 20 cm² és 180 cm². Mekkora a hasonlóság aránya (k)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-purple-900">k² = 180 / 20 = 9 ⟹ k = 3</text>
          </svg>
        ),
        options: ['k = 3 (k² = 180 / 20 = 9 ⟹ k = √9 = 3)', 'k = 9', 'k = 6', 'k = 4,5'],
        correctAnswer: 0,
        hint: 'k² = T\' / T = 180 / 20 = 9.',
        explanation: 'k² = 9, amiből négyzetgyökvonással k = 3.',
        breakdown: [{ label: 'k értéke', value: '√9 = 3' }]
      },
      {
        id: 'sum-l2-q55',
        level: 2,
        question: 'Egy egyenlő szárú háromszög szárszöge 50°. Egy másik egyenlő szárú háromszög egyik alapon fekvő szöge 65°. Hasonlóak-e?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">(180° - 50°) / 2 = 65°</text>
            <text x="125" y="48" textAnchor="middle" className="text-[9px] font-black fill-teal-900">Igen, szögeik: 50°, 65°, 65°</text>
          </svg>
        ),
        options: ['Igen, mert mindkettő szögei 50°, 65°, 65° (sz-sz alapeset).', 'Nem, mert különböző típusúak.', 'Csak ha az alapjuk egyenlő.', 'Nem dönthető el.'],
        correctAnswer: 0,
        hint: 'Számold ki az első háromszög alapon fekvő szögeit: (180° - 50°) / 2 = 65°!',
        explanation: 'Az első háromszög szögei: 50°, 65°, 65°. A másodiké: 65°, 65°, 50°. Mivel a belső szögeik megegyeznek, az sz-sz alapeset alapján hasonlóak.',
        breakdown: [{ label: 'Szögek', value: '50°, 65°, 65° mindkettőben' }]
      },
      {
        id: 'sum-l2-q56',
        level: 2,
        question: 'Ha a térképen két város távolsága 4 cm, és a térkép méretaránya 1 : 50 000, mekkora a valóságos távolság?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">4 cm · 50 000 = 200 000 cm = 2 km</text>
          </svg>
        ),
        options: ['2 km (200 000 cm = 2 000 m = 2 km)', '20 km', '200 m', '50 km'],
        correctAnswer: 0,
        hint: '4 · 50 000 = 200 000 cm.',
        explanation: 'Valódi távolság: 4 cm · 50 000 = 200 000 cm = 2000 m = 2 km.',
        breakdown: [{ label: 'Számítás', value: '200 000 cm = 2 km' }]
      },
      {
        id: 'sum-l2-q57',
        level: 2,
        question: 'Egy szakaszt 5 egyenlő részre osztunk. Hány körosztást kell felmérni a segédfélegyenesre?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">5 darab egyenlő körosztás</text>
          </svg>
        ),
        options: ['5 körosztást', '4 körosztást', '10 körosztást', '25 körosztást'],
        correctAnswer: 0,
        hint: 'n egyenlő részhez n körosztás szükséges.',
        explanation: 'Az 5 egyenlő részre osztáshoz pontosan 5 egyenlő körosztást mérünk fel a segédfélegyenesre.',
        breakdown: [{ label: 'Körosztások', value: '5 egység' }]
      },
      {
        id: 'sum-l2-q58',
        level: 2,
        question: 'Egy háromszög oldalai 5 cm, 7 cm, 9 cm. Hasonló háromszög leghosszabb oldala 27 cm. Mekkora a legrövidebb oldala?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">k = 27 / 9 = 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-blue-900">a' = 3 · 5 = 15 cm</text>
          </svg>
        ),
        options: ['15 cm (k = 27 / 9 = 3 ⟹ 3 · 5 = 15 cm)', '10 cm', '18 cm', '21 cm'],
        correctAnswer: 0,
        hint: 'A leghosszabb oldalak aránya megadja k-t: 27 / 9 = 3.',
        explanation: 'Hasonlósági arány: k = 27 / 9 = 3. A legrövidebb oldal képe: 3 · 5 cm = 15 cm.',
        breakdown: [{ label: 'k értéke', value: '3' }, { label: 'Legrövidebb', value: '15 cm' }]
      },
      {
        id: 'sum-l2-q59',
        level: 2,
        question: 'Egy 16 cm hosszú szakasz negyedik arányosát keressük, ha a = 8 cm, b = 12 cm és c = 6 cm. Mekkora az x?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-indigo-800">x = (12 · 6) / 8 = 72 / 8 = 9 cm</text>
          </svg>
        ),
        options: ['9 cm [x = (12 · 6) / 8 = 72 / 8 = 9 cm]', '6 cm', '8 cm', '16 cm'],
        correctAnswer: 0,
        hint: 'x = (b · c) / a = (12 · 6) / 8.',
        explanation: 'x = (12 · 6) / 8 = 72 / 8 = 9 cm.',
        breakdown: [{ label: 'Számítás', value: 'x = 9 cm' }]
      },
      {
        id: 'sum-l2-q60',
        level: 2,
        question: 'Két hasonló háromszög területe 25 cm² és 100 cm². Ha a kisebbik kerülete 30 cm, mekkora a nagyobbik kerülete?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">k² = 100 / 25 = 4 ⟹ k = 2</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">K' = 2 · 30 = 60 cm</text>
          </svg>
        ),
        options: ['60 cm (k² = 100 / 25 = 4 ⟹ k = 2 ⟹ K\' = 2 · 30 = 60 cm)', '120 cm', '45 cm', '75 cm'],
        correctAnswer: 0,
        hint: 'Területarányból k = √4 = 2, így a kerület megkétszereződik.',
        explanation: 'k² = 100 / 25 = 4 ⟹ k = 2. A kerület K\' = k · K = 2 · 30 = 60 cm.',
        breakdown: [{ label: 'k értéke', value: '2' }, { label: 'Kerület', value: '60 cm' }]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Nehéz Geometriai Feladatok (30 feladat)',
    subtitle: 'Súlypont, aranymetszés, mértani közép, koordinátageometria, kompozíciók',
    range: '61-90. kérdés',
    focus: 'Komplex feladatok, bizonyítások, térfogatarányok, szerkesztési algoritmusok',
    questions: [
      {
        id: 'sum-l3-q61',
        level: 3,
        question: 'A háromszög S súlypontja és az oldalfelező pontok közötti középpontos hasonlóság aránya mennyi?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="40,55 200,55 120,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="120" cy="41.6" r="3" fill="#ef4444" />
            <text x="120" y="36" textAnchor="middle" className="text-[8px] font-black fill-rose-700">S (λ = -1/2)</text>
          </svg>
        ),
        options: ['λ = -1/2 (feleakkora távolság az ellenkező oldalon)', 'λ = +1/2', 'λ = -2', 'λ = -1/3'],
        correctAnswer: 0,
        hint: 'A súlypont 2:1 arányban osztja a súlyvonalat, a rövidebb szakasz az oldalfelező felé esik.',
        explanation: 'A súlypont a súlyvonalat 2:1 arányban osztja, tehát |SF| = (1/2)|SC|. Mivel az oldalfelező pont az ellenkező oldalon fekszik, a hasonlósági arány negatív: λ = -1/2.',
        breakdown: [{ label: 'Arány', value: 'λ = -1/2' }]
      },
      {
        id: 'sum-l3-q62',
        level: 3,
        question: 'Hogyan szerkeszthető meg egy háromszög, ha ismertek a belső szögei és a valódi K kerülete?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">Segédháromszög kerületének arányában osztjuk a K-t</text>
          </svg>
        ),
        options: ['Segédháromszöget szerkesztünk a szögekkel, majd a K szakaszt felosztjuk az oldalarányok szerint.', 'A kerületet elosztjuk 3-mal.', 'Két derékszögű háromszögre bontjuk.', 'Nem szerkeszthető meg.'],
        correctAnswer: 0,
        hint: 'A szögek rögzítik az oldalak arányát, a kerületet kell ebben az arányban felosztani.',
        explanation: 'A megadott szögekkel rajzolunk egy hasonló segédháromszöget, majd ennek kerületarányában a párhuzamos szelők tételével felosztjuk a valódi K szakaszt.',
        breakdown: [{ label: 'Eljárás', value: 'Kerület arányos felosztása' }]
      },
      {
        id: 'sum-l3-q63',
        level: 3,
        question: 'Mekkora az aranymetszés arányszáma (Φ) két tizedesjegyre kerekítve?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[11px] font-bold fill-rose-700">Φ = (1 + √5) / 2 ≈ 1,62</text>
          </svg>
        ),
        options: ['Φ ≈ 1,62 (pontosabban 1,618)', 'Φ ≈ 3,14', 'Φ ≈ 1,41', 'Φ ≈ 2,72'],
        correctAnswer: 0,
        hint: '(1 + √5) / 2.',
        explanation: 'Az aranymetszés száma Φ = (1 + √5) / 2 ≈ 1,6180339..., kerekítve 1,62.',
        breakdown: [{ label: 'Érték', value: 'Φ ≈ 1,618' }]
      },
      {
        id: 'sum-l3-q64',
        level: 3,
        question: 'Két szakasz mértani közepét [m = √(p · q)] melyik klasszikus tétellel és szerkesztéssel határozhatjuk meg?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <path d="M 30 50 A 95 95 0 0 1 220 50" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="100" y1="50" x2="100" y2="12" stroke="#ef4444" strokeWidth="2" />
            <text x="100" y="8" textAnchor="middle" className="text-[7px] font-bold fill-rose-700">m = √(p·q)</text>
          </svg>
        ),
        options: ['A Thálész-félkörrel és a derékszögű háromszög magasságtételével.', 'A Pitagorasz-tétellel.', 'Szögfelezővel.', 'Középvonallal.'],
        correctAnswer: 0,
        hint: 'm² = p · q derékszögű háromszögben.',
        explanation: 'A derékszögű háromszög magasságtétele m² = p · q. Ha a p és q szakaszokat egymás mellé mérjük fel egy egyenesre, a p+q átmérőjű Thálész-félkörre emelt merőleges pontosan a mértani közepet adja.',
        breakdown: [{ label: 'Módszer', value: 'Magasságtétel + Thálész-félkör' }]
      },
      {
        id: 'sum-l3-q65',
        level: 3,
        question: 'Egy háromszög területe T. Olyan hasonló háromszöget akarunk szerkeszteni, amelynek területe T\' = 3 · T. Mekkora legyen az oldalak aránya (k)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-purple-800">k² = 3 ⟹ k = √3 ≈ 1,732</text>
          </svg>
        ),
        options: ['k = √3 ≈ 1,732', 'k = 3', 'k = 9', 'k = 1,5'],
        correctAnswer: 0,
        hint: 'k² = 3 ⟹ k = √3.',
        explanation: 'Mivel T\' / T = k² = 3, az oldalak hasonlósági aránya k = √3.',
        breakdown: [{ label: 'Oldalarány', value: 'k = √3' }]
      },
      {
        id: 'sum-l3-q66',
        level: 3,
        question: 'Hogyan szerkeszthető meg az 1 egységből a √3 hosszúságú szakasz?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">1 és √2 befogójú derékszögű háromszög átfogójaként (1²+(√2)²=3)</text>
          </svg>
        ),
        options: ['Olyan derékszögű háromszög átfogójaként, amelynek befogói 1 és √2.', 'Három darab 1 egység összeadásával.', 'Egyenlő oldalú háromszög magasságaként, ha oldala 1.', 'Nem szerkeszthető meg.'],
        correctAnswer: 0,
        hint: 'Pitagorasz: c² = 1² + (√2)² = 1 + 2 = 3 ⟹ c = √3.',
        explanation: 'Ha a befogók 1 és √2 (a √2 pedig egy 1, 1 befogójú háromszög átfogója), akkor az átfogó c = √(1 + 2) = √3.',
        breakdown: [{ label: 'Pitagorasz', value: 'c = √(1² + (√2)²) = √3' }]
      },
      {
        id: 'sum-l3-q67',
        level: 3,
        question: 'Egymás után két azonos centrumú középpontos hasonlóságot hajtunk végre: λ₁ = -2 és λ₂ = 3 aránnyal. Mi az eredő transzformáció?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">λ = (-2) · 3 = -6</text>
          </svg>
        ),
        options: ['Középpontos hasonlóság ugyanazzal a centrummal és λ = -6 aránnyal.', 'Középpontos hasonlóság λ = +1 aránnyal.', 'Egy eltolás 6 cm-rel.', 'A két transzformáció kioltja egymást.'],
        correctAnswer: 0,
        hint: 'A hasonlósági arányok összeszorzódnak: λ = λ₁ · λ₂.',
        explanation: 'Közös középpont esetén a hasonlósági arányok szorzódnak: λ = (-2) · 3 = -6.',
        breakdown: [{ label: 'Kompozíció', value: 'λ = -2 · 3 = -6' }]
      },
      {
        id: 'sum-l3-q68',
        level: 3,
        question: 'Egy háromszög területe 48 cm², kerülete 32 cm. Hasonló háromszög területe 108 cm². Mekkora a kerülete?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">k² = 108 / 48 = 9 / 4 ⟹ k = 3 / 2 = 1,5</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">K' = 1,5 · 32 = 48 cm</text>
          </svg>
        ),
        options: ['48 cm [k² = 108 / 48 = 9/4 ⟹ k = 1,5 ⟹ K\' = 1,5 · 32 = 48 cm]', '72 cm', '64 cm', '96 cm'],
        correctAnswer: 0,
        hint: 'k² = 108 / 48 = 9/4 ⟹ k = 3/2 = 1,5.',
        explanation: 'k² = 108 / 48 = 9 / 4, így k = 3 / 2 = 1,5. A kerület K\' = 1,5 · 32 = 48 cm.',
        breakdown: [{ label: 'k értéke', value: '1,5' }, { label: 'Új kerület', value: '48 cm' }]
      },
      {
        id: 'sum-l3-q69',
        level: 3,
        question: 'Egy trapéz átlói a metszéspontjukban milyen arányban osztják egymást?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="70" y1="20" x2="130" y2="20" stroke="#0284c7" strokeWidth="2" />
            <line x1="40" y1="50" x2="160" y2="50" stroke="#0284c7" strokeWidth="2" />
            <line x1="70" y1="20" x2="160" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <line x1="130" y1="20" x2="40" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <text x="200" y="38" className="text-[8px] font-bold fill-blue-700">a : c arányban</text>
          </svg>
        ),
        options: ['A két párhuzamos alap hosszának arányában (a : c).', 'Mindig felezik egymást.', '2 : 1 arányban.', 'Nem osztják egymást arányosan.'],
        correctAnswer: 0,
        hint: 'Az átlók által az alapokon alkotott két háromszög csúcsszögeik és váltószögeik miatt hasonló.',
        explanation: 'Az átlók metszéspontja egy középpontos hasonlóság centruma, amely a két párhuzamos alapot egymásba viszi át. Emiatt az átlók az alapok arányában (a : c) osztják egymást.',
        breakdown: [{ label: 'Arány', value: 'A párhuzamos alapok aránya' }]
      },
      {
        id: 'sum-l3-q70',
        level: 3,
        question: 'Melyik az a síkbeli transzformáció, amely távolságtartó ÉS pontosan egyetlen fixegyenese van, melynek minden pontja fixpont?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-teal-800">Tengelyes tükrözés</text>
          </svg>
        ),
        options: ['Tengelyes tükrözés', 'Középpontos tükrözés', 'Forgatás', 'Eltolás'],
        correctAnswer: 0,
        hint: 'A tükörtengely minden pontja helyben marad.',
        explanation: 'A tengelyes tükrözés távolságtartó (egybevágóság), és a tengelyének minden pontja fixpont (fixegyenes).',
        breakdown: [{ label: 'Válasz', value: 'Tengelyes tükrözés' }]
      },
      {
        id: 'sum-l3-q71',
        level: 3,
        question: 'Szabályos ötszögben az átló és az oldal aránya d / a mennyi?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">d / a = Φ ≈ 1,618 (Aranymetszés)</text>
          </svg>
        ),
        options: ['Pontosan az aranymetszés aránya: Φ = (1 + √5) / 2 ≈ 1,618', '√2 ≈ 1,414', '2', 'π / 2'],
        correctAnswer: 0,
        hint: 'A pentagramma átlói az aranymetszés arányát hordozzák.',
        explanation: 'A szabályos ötszög átlójának és oldalának hányadosa pontosan az aranymetszés arányszáma: d / a = Φ ≈ 1,618.',
        breakdown: [{ label: 'Arány', value: 'Φ ≈ 1,618' }]
      },
      {
        id: 'sum-l3-q72',
        level: 3,
        question: 'Egy háromszög oldalai 6 cm, 8 cm és 10 cm (derékszögű). Mekkora a beírt körének sugara (r)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">T = (6·8)/2 = 24 cm², s = 24 / 2 = 12 cm</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-teal-900">r = T / s = 24 / 12 = 2 cm</text>
          </svg>
        ),
        options: ['2 cm [r = (a + b - c) / 2 = (6 + 8 - 10) / 2 = 2 cm]', '3 cm', '4 cm', '1,5 cm'],
        correctAnswer: 0,
        hint: 'Derékszögű háromszögben r = (a + b - c) / 2 vagy r = T / s.',
        explanation: 'r = (a + b - c) / 2 = (6 + 8 - 10) / 2 = 4 / 2 = 2 cm (vagy r = T / s = 24 / 12 = 2 cm).',
        breakdown: [{ label: 'Számítás', value: 'r = 2 cm' }]
      },
      {
        id: 'sum-l3-q73',
        level: 3,
        question: 'Két gömb sugara r₁ = 2 cm és r₂ = 6 cm. Hányszorosa a nagyobb gömb térfogata a kisebbének?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">k = 6 / 2 = 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-emerald-900">V₂ / V₁ = 3³ = 27-szeres</text>
          </svg>
        ),
        options: ['27-szerese (k = 6 / 2 = 3 ⟹ V₂ / V₁ = 3³ = 27)', '9-szerese', '3-szorosa', '8-szorosa'],
        correctAnswer: 0,
        hint: 'Térfogatarány = k³!',
        explanation: 'A sugarak aránya k = 6 / 2 = 3. A térfogatok aránya k³ = 3³ = 27.',
        breakdown: [{ label: 'Térfogatarány', value: '3³ = 27' }]
      },
      {
        id: 'sum-l3-q74',
        level: 3,
        question: 'Egy síkidom kerülete K = 12 cm, területe T = 9 cm². Hasonló alakzat készül k = 0,5 aránnyal. Mekkora lesz az új kerület és terület?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-indigo-700">K' = 0,5 · 12 = 6 cm</text>
            <text x="125" y="48" textAnchor="middle" className="text-[9px] font-black fill-purple-900">T' = 0,5² · 9 = 2,25 cm²</text>
          </svg>
        ),
        options: ['K\' = 6 cm és T\' = 2,25 cm²', 'K\' = 6 cm és T\' = 4,5 cm²', 'K\' = 3 cm és T\' = 2,25 cm²', 'K\' = 24 cm és T\' = 36 cm²'],
        correctAnswer: 0,
        hint: 'K\' = 0,5 · 12 = 6 cm és T\' = (0,5)² · 9 = 2,25 cm².',
        explanation: 'A kerület a felére csökken (6 cm), a terület a negyedére csökken (9 / 4 = 2,25 cm²).',
        breakdown: [{ label: 'Kerület', value: '6 cm' }, { label: 'Terület', value: '2,25 cm²' }]
      },
      {
        id: 'sum-l3-q75',
        level: 3,
        question: 'Mi a feltétele annak, hogy két húrnégyszög hasonló legyen?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[8px] font-bold fill-teal-800">Megfelelő szögeik egyenlők és oldalaik aránya megegyezik</text>
          </svg>
        ),
        options: ['Megfelelő belső szögeik megegyeznek ÉS megfelelő oldalaik aránya egyenlő.', 'Csak a szögeik egyezése elég.', 'Csak az átmérőjük egyezése elég.', 'Bármely két húrnégyszög hasonló.'],
        correctAnswer: 0,
        hint: 'Négyszögeknél a szögek egyezése önmagában nem garantálja a hasonlóságot (gondolj a téglalapokra!).',
        explanation: 'Négyszögeknél és általános sokszögeknél a szögek egyezése és az oldalak arányossága EGYÜTT szükséges a hasonlósághoz.',
        breakdown: [{ label: 'Feltétel', value: 'Szögek azonossága ÉS oldalak arányossága' }]
      },
      {
        id: 'sum-l3-q76',
        level: 3,
        question: 'Egy szakasz külső osztópontja Q, amelyre QA : QB = 3 : 1. Ha az AB szakasz hossza 8 cm, mekkora a QB szakasz hossza?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#0284c7" strokeWidth="2" />
            <circle cx="50" cy="35" r="3" fill="#0284c7" /><text x="50" y="47" className="text-[7px]">A</text>
            <circle cx="130" cy="35" r="3" fill="#0284c7" /><text x="130" y="47" className="text-[7px]">B</text>
            <circle cx="190" cy="35" r="3.5" fill="#ef4444" /><text x="190" y="47" className="text-[7px]">Q</text>
            <text x="125" y="25" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">QA = 8 + QB ⟹ (8 + QB) / QB = 3 ⟹ QB = 4 cm</text>
          </svg>
        ),
        options: ['4 cm [QA = 8 + QB ⟹ (8 + QB) / QB = 3 ⟹ QB = 4 cm]', '2 cm', '6 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'QA = AB + QB = 8 + QB. QA / QB = 3.',
        explanation: '(8 + QB) / QB = 3 ⟹ 8 + QB = 3 · QB ⟹ 2 · QB = 8 ⟹ QB = 4 cm (és QA = 12 cm, 12 / 4 = 3).',
        breakdown: [{ label: 'Számítás', value: 'QB = 4 cm, QA = 12 cm' }]
      },
      {
        id: 'sum-l3-q77',
        level: 3,
        question: 'Melyik transzformáció-összetétel eredményez mindig párhuzamos eltolást a síkban?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="60" y1="10" x2="60" y2="55" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="120" y1="10" x2="120" y2="55" stroke="#0d9488" strokeWidth="1.5" />
            <text x="180" y="35" className="text-[8px] font-bold fill-teal-800">2 párhuzamos tengelyű tükrözés</text>
          </svg>
        ),
        options: ['Két párhuzamos tengelyre való egymás utáni tengelyes tükrözés.', 'Két metsző tengelyre való tükrözés.', 'Egy tükrözés és egy forgatás.', 'Egy hasonlóság és egy tükrözés.'],
        correctAnswer: 0,
        hint: 'Két párhuzamos tükörtengely esetén a távolság megkétszereződik az eltolás irányában.',
        explanation: 'Két d távolságú párhuzamos tengelyre való egymás utáni tükrözés eredője egy a tengelyekre merőleges, 2d hosszúságú párhuzamos eltolás.',
        breakdown: [{ label: 'Eredmény', value: '2d nagyságú eltolás' }]
      },
      {
        id: 'sum-l3-q78',
        level: 3,
        question: 'Mi a két metsző tengelyre történő egymás utáni tengelyes tükrözés eredője?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="60" y1="50" x2="140" y2="10" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="60" y1="10" x2="140" y2="50" stroke="#0d9488" strokeWidth="1.5" />
            <text x="190" y="35" className="text-[8px] font-bold fill-teal-800">Elforgatás 2α-val</text>
          </svg>
        ),
        options: ['Elforgatás a metszéspont körül a tengelyek hajlásszögének kétszeresével (2α).', 'Párhuzamos eltolás.', 'Egyetlen tengelyes tükrözés.', 'Középpontos hasonlóság.'],
        correctAnswer: 0,
        hint: 'Két orientációváltás eredője orientációtartó (forgatás).',
        explanation: 'Két egymást α szögben metsző tengelyre való tükrözés eredője a metszéspont körüli 2α szögű elforgatás.',
        breakdown: [{ label: 'Eredmény', value: '2α szögű forgatás' }]
      },
      {
        id: 'sum-l3-q79',
        level: 3,
        question: 'Egy háromszög oldalfelező pontjai által meghatározott háromszög területe hányadrésze az eredeti háromszög területének?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <polygon points="40,55 190,55 115,15" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <polygon points="77.5,35 152.5,35 115,55" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="115" y="47" textAnchor="middle" className="text-[8px] font-bold fill-purple-700">T / 4 (negyede)</text>
          </svg>
        ),
        options: ['Pontosan 1/4 része (25%-a)', '1/2 része', '1/3 része', '1/8 része'],
        correctAnswer: 0,
        hint: 'A három középvonal 4 darab egybevágó kis háromszögre osztja a nagy háromszöget.',
        explanation: 'A három középvonal a háromszöget 4 egybevágó, az eredetihez k = 1/2 arányban hasonló háromszögre bontja, így területe T / 4.',
        breakdown: [{ label: 'Terület', value: 'T / 4' }]
      },
      {
        id: 'sum-l3-q80',
        level: 3,
        question: 'Mi a feltétele annak, hogy egy háromszög megszerkeszthető legyen az a, b, c oldalaiból (háromszög-egyenlőtlenség)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[9px] font-bold fill-indigo-800">a + b &gt; c és a + c &gt; b és b + c &gt; a</text>
          </svg>
        ),
        options: ['Bármely két oldal összege nagyobb kell legyen a harmadik oldalnál.', 'A két kisebb oldal szorzata nagyobb a harmadiknál.', 'Az oldalak négyzeteinek összege 100 kell legyen.', 'Nincs feltétele.'],
        correctAnswer: 0,
        hint: 'Ha két oldal összege nem éri el a harmadikat, a körívek nem metszik egymást.',
        explanation: 'A háromszög-egyenlőtlenség: a + b > c, a + c > b, b + c > a. Ha ez nem teljesül, a szakaszokból nem szerkeszthető háromszög.',
        breakdown: [{ label: 'Feltétel', value: 'Bármely két oldal összege nagyobb a harmadiknál' }]
      },
      {
        id: 'sum-l3-q81',
        level: 3,
        question: 'Két hasonló sokszög kerülete K₁ és K₂. Milyen arányban áll egymással a két sokszög területe?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-purple-900">T₁ / T₂ = (K₁ / K₂)²</text>
          </svg>
        ),
        options: ['A kerületek arányának négyzetével: T₁ / T₂ = (K₁ / K₂)².', 'A kerületek arányával: T₁ / T₂ = K₁ / K₂.', 'A kerületek szorzatával.', 'Független a kerületektől.'],
        correctAnswer: 0,
        hint: 'Mivel K₁ / K₂ = k, és T₁ / T₂ = k²...',
        explanation: 'Mivel a kerületek aránya megegyezik a hasonlósági aránnyal (k = K₁ / K₂), a területek aránya k² = (K₁ / K₂)²',
        breakdown: [{ label: 'Összefüggés', value: 'T₁ / T₂ = (K₁ / K₂)²' }]
      },
      {
        id: 'sum-l3-q82',
        level: 3,
        question: 'Egy téglalap átlói 10 cm hosszúak és 60°-os szöget zárnak be egymással. Mekkora a téglalap területe?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">T = (1/2) · d₁ · d₂ · sin(60°)</text>
            <text x="125" y="48" textAnchor="middle" className="text-[9px] font-black fill-teal-900">T = 0,5 · 10 · 10 · (√3 / 2) = 25√3 ≈ 43,3 cm²</text>
          </svg>
        ),
        options: ['25√3 ≈ 43,3 cm² [T = 0,5 · d² · sin(60°) = 25√3 cm²]', '50 cm²', '100 cm²', '25 cm²'],
        correctAnswer: 0,
        hint: 'A téglalap területe az átlók és a közbezárt szög szinuszának felével számolható: T = (1/2)d²·sin(φ).',
        explanation: 'T = (1/2) · 10 · 10 · sin(60°) = 50 · (√3 / 2) = 25√3 ≈ 43,3 cm².',
        breakdown: [{ label: 'Számítás', value: '25√3 ≈ 43,3 cm²' }]
      },
      {
        id: 'sum-l3-q83',
        level: 3,
        question: 'Egy háromszög területe 30 cm², kerülete 20 cm. Mekkora a beírt körének sugara (r)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">s = K / 2 = 10 cm</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-emerald-800">r = T / s = 30 / 10 = 3 cm</text>
          </svg>
        ),
        options: ['3 cm [s = K / 2 = 10 cm ⟹ r = T / s = 30 / 10 = 3 cm]', '1,5 cm', '6 cm', '2 cm'],
        correctAnswer: 0,
        hint: 'T = r · s, ahol s a félkerület (s = K / 2).',
        explanation: 'Félkerület s = 20 / 2 = 10 cm. A beírt kör sugara r = T / s = 30 / 10 = 3 cm.',
        breakdown: [{ label: 'Képlet', value: 'r = T / s = 30 / 10 = 3 cm' }]
      },
      {
        id: 'sum-l3-q84',
        level: 3,
        question: 'Ha egy pontot az origóra tükrözünk, majd az eredményt középpontosan hasonlítjuk az origóból λ = 3 aránnyal, milyen egyetlen leképezéssel helyettesíthető ez?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">λ₁ = -1 és λ₂ = 3 ⟹ λ = -3</text>
          </svg>
        ),
        options: ['Egyetlen origó középpontú hasonlósággal λ = -3 aránnyal.', 'λ = +2 arányú hasonlósággal.', 'Egy eltolással.', 'Egy forgatással 90°-kal.'],
        correctAnswer: 0,
        hint: 'A középpontos tükrözés λ = -1 arányú hasonlóság.',
        explanation: 'A középpontos tükrözés λ₁ = -1, ezt követi λ₂ = 3. Az eredő λ = (-1) · 3 = -3 arányú középpontos hasonlóság.',
        breakdown: [{ label: 'Eredő', value: 'λ = -3 arányú hasonlóság' }]
      },
      {
        id: 'sum-l3-q85',
        level: 3,
        question: 'Egy deltoid átlói e = 8 cm és f = 12 cm. Hasonló deltoid készül k = 1,5 aránnyal. Mekkora lesz az új deltoid területe?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">T = (8 · 12) / 2 = 48 cm²</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-purple-900">T' = 1,5² · 48 = 2,25 · 48 = 108 cm²</text>
          </svg>
        ),
        options: ['108 cm² [T = 48 cm² ⟹ T\' = 1,5² · 48 = 2,25 · 48 = 108 cm²]', '72 cm²', '96 cm²', '144 cm²'],
        correctAnswer: 0,
        hint: 'Deltoid területe T = (e · f) / 2, majd T\' = k² · T.',
        explanation: 'Eredeti terület T = (8 · 12) / 2 = 48 cm². Új terület T\' = (1,5)² · 48 = 2,25 · 48 = 108 cm².',
        breakdown: [{ label: 'Eredeti T', value: '48 cm²' }, { label: 'Új T\'', value: '108 cm²' }]
      },
      {
        id: 'sum-l3-q86',
        level: 3,
        question: 'Miért NEM lehetséges egy tetszőleges szög harmadolása kizárólag euklideszi körzővel és beosztás nélküli vonalzóval?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="35" textAnchor="middle" className="text-[8px] font-bold fill-rose-700">Harmadfokú algebrai egyenletre vezet, ami nem oldható meg gyökvonásokkal</text>
          </svg>
        ),
        options: ['Mert a szögharmadolás olyan harmadfokú egyenletre vezet, amely nem oldható meg másodfokú gyökvonások láncolatával.', 'Mert még senki nem próbálta elég pontos körzővel.', 'Mert a szögmérő pontosabb.', 'Csak 90°-nál lehetséges.'],
        correctAnswer: 0,
        hint: 'Pierre Wantzel 1837-ben algebrailag bizonyította a szerkeszthetetlenséget.',
        explanation: 'Az euklideszi szerkesztések algebrailag csak másodfokú gyökvonások egymásutánjának felelnek meg. A tetszőleges szög harmadolása harmadfokú irreducibilis egyenletre vezet, így bizonyítottan lehetetlen.',
        breakdown: [{ label: 'Ok', value: 'Harmadfokú algebrai egyenlet ⟹ szerkeszthetetlen' }]
      },
      {
        id: 'sum-l3-q87',
        level: 3,
        question: 'Egy trapéz párhuzamos oldalai a = 12 cm és c = 4 cm. Milyen arányban osztja a középvonala a trapéz területét?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Középvonal k = (12 + 4) / 2 = 8 cm</text>
            <text x="125" y="48" textAnchor="middle" className="text-[9px] font-black fill-teal-900">T₁ : T₂ = (4 + 8) : (8 + 12) = 12 : 20 = 3 : 5</text>
          </svg>
        ),
        options: ['3 : 5 arányban [k = 8 cm ⟹ (4 + 8) : (8 + 12) = 12 : 20 = 3 : 5]', '1 : 2 arányban', '1 : 3 arányban', '2 : 3 arányban'],
        correctAnswer: 0,
        hint: 'A középvonal hossza k = (a + c) / 2 = 8 cm. A két kis trapéz magassága egyenlő.',
        explanation: 'A két keletkező trapéz magassága azonos (m/2). Területeik aránya az alapjaik összegének aránya: (c + k) : (k + a) = (4 + 8) : (8 + 12) = 12 : 20 = 3 : 5.',
        breakdown: [{ label: 'Arány', value: '3 : 5' }]
      },
      {
        id: 'sum-l3-q88',
        level: 3,
        question: 'Egy háromszög csúcsai A(0,0), B(6,0) és C(0,8). Középpontos hasonlósággal nagyítjuk az origóból λ = 2 aránnyal. Mekkora lesz az új átfogó?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">BC = √(6² + 8²) = 10</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-indigo-900">B'C' = 2 · 10 = 20 egység</text>
          </svg>
        ),
        options: ['20 egység [BC = √(6²+8²) = 10 ⟹ B\'C\' = 2 · 10 = 20]', '10 egység', '14 egység', '28 egység'],
        correctAnswer: 0,
        hint: 'Az eredeti befogók 6 és 8, átfogója 10. A hasonlósággal ez megkétszereződik.',
        explanation: 'Pitagorasz-tétellel BC = √(36 + 64) = 10. A képháromszög átfogója |λ| · 10 = 2 · 10 = 20 egység.',
        breakdown: [{ label: 'Átfogó', value: '20 egység' }]
      },
      {
        id: 'sum-l3-q89',
        level: 3,
        question: 'Két gömb felszínének aránya A₁ : A₂ = 4 : 9. Mekkora a térfogataik aránya (V₁ : V₂)?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <text x="125" y="28" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">k² = 4 / 9 ⟹ k = 2 / 3</text>
            <text x="125" y="48" textAnchor="middle" className="text-[10px] font-black fill-emerald-800">k³ = (2/3)³ = 8 / 27</text>
          </svg>
        ),
        options: ['8 : 27 [k² = 4/9 ⟹ k = 2/3 ⟹ k³ = 8/27]', '2 : 3', '16 : 81', '4 : 27'],
        correctAnswer: 0,
        hint: 'k = √(4/9) = 2/3. A térfogatarány k³ = (2/3)³.',
        explanation: 'A felszínarányból k = √(4/9) = 2/3. A térfogatarány V₁ / V₂ = k³ = (2/3)³ = 8/27.',
        breakdown: [{ label: 'k értéke', value: '2/3' }, { label: 'Térfogatarány', value: '8 : 27' }]
      },
      {
        id: 'sum-l3-q90',
        level: 3,
        question: 'Egy háromszög Euler-egyenesén mely nevezetes pontok helyezkednek el?',
        figure: (
          <svg viewBox="0 0 250 65" className="w-full max-w-[250px] h-16 mx-auto">
            <line x1="30" y1="35" x2="220" y2="35" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="60" cy="35" r="3" fill="#ef4444" /><text x="60" y="24" textAnchor="middle" className="text-[7px]">M (magasságpont)</text>
            <circle cx="120" cy="35" r="3" fill="#10b981" /><text x="120" y="24" textAnchor="middle" className="text-[7px]">S (súlypont)</text>
            <circle cx="180" cy="35" r="3" fill="#0284c7" /><text x="180" y="24" textAnchor="middle" className="text-[7px]">K (körülírt kör kp)</text>
          </svg>
        ),
        options: ['A magasságpont (M), a súlypont (S) és a körülírt kör középpontja (K).', 'A beírt kör középpontja és a csúcsok.', 'Csak a csúcsok.', 'Az oldalfelező pontok.'],
        correctAnswer: 0,
        hint: 'Leonhard Euler fedezte fel, hogy az M, S, K pontok egy egyenesre esnek, és MS : SK = 2 : 1.',
        explanation: 'Az Euler-egyenes a háromszög magasságpontját (M), súlypontját (S) és a körülírt kör középpontját (K) összekötő egyenes. Az S pont az MK szakaszt 2 : 1 arányban osztja.',
        breakdown: [{ label: 'Pontok', value: 'M, S, K egy egyenesen fekszenek' }]
      }
    ]
  }
};

export const Chapter2GeometrySummaryQuiz: React.FC<Chapter2GeometrySummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-summary"
      grade={8}
      chapterId="geometria"
      topicTitle="Geometria Összefoglalás"
      emoji="🏆"
      topicBadge="8. Osztály • II. Geometria • 7. Témakör"
      badgeText="8. Osztály • Matematika"
      title="II. Fejezet Témazáró Kvíz"
      subtitle="Átfogó témazáró teszt: egybevágóságok, hasonlóság és szerkesztések (90 feladat 3 szinten)"
      cheatSheetTitle="Geometria Témazáró Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Ügyelj a dimenziókra: a kerületarány k, a területarány k², a térfogatarány k³!"
      levels={quizLevels}
      matcherComponent={<Chapter2GeometrySummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<Chapter2GeometrySummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="teal"
    />
  );
};

export default Chapter2GeometrySummaryQuiz;
