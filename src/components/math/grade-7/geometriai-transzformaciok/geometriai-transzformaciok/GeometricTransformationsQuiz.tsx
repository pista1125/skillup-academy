import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GeometricTransformationsMatcher } from './GeometricTransformationsMatcher';
import { GeometricTransformationsSorter } from './GeometricTransformationsSorter';
import {
  Compass,
  RotateCw,
  FlipHorizontal,
  MoveHorizontal,
  RefreshCw,
  Target,
  Sparkles,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';

interface GeometricTransformationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egybevágósági leképezés',
    icon: <Sparkles className="w-4 h-4 text-teal-600" />,
    formula: '|P\'Q\'| = |PQ| (távolságtartó)',
    note: 'Olyan leképezés, amely bármely két pont távolságát megőrzi. Invariáns tulajdonságok: távolságtartás, egyenestartás, szögtartás, párhuzamosságtartás, területtartás.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="60" y2="25" className="stroke-teal-600 stroke-[2]" />
        <line x1="100" y1="25" x2="140" y2="25" className="stroke-teal-600 stroke-[2]" />
        <circle cx="20" cy="25" r="2.5" className="fill-teal-700" />
        <circle cx="60" cy="25" r="2.5" className="fill-teal-700" />
        <circle cx="100" cy="25" r="2.5" className="fill-teal-700" />
        <circle cx="140" cy="25" r="2.5" className="fill-teal-700" />
        <text x="35" y="18" className="text-[8px] font-bold fill-teal-800">d</text>
        <text x="115" y="18" className="text-[8px] font-bold fill-teal-800">d' = d</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Körüljárási irány',
    icon: <RotateCw className="w-4 h-4 text-indigo-600" />,
    formula: 'Tengelyes: MEGFORDÍTJA,  Többi: MEGŐRZI',
    note: 'A tengelyes tükrözés indirekt egybevágóság (az óramutató járása ellenkező irányba vált). Az eltolás, a forgatás és a középpontos tükrözés mind direkt egybevágóságok.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="80" y1="5" x2="80" y2="45" className="stroke-indigo-400 stroke-[1.5]" />
        <polygon points="50,15 30,35 60,35" fill="none" className="stroke-teal-600 stroke-[1.8]" />
        <polygon points="110,15 130,35 100,35" fill="none" className="stroke-indigo-600 stroke-[1.8]" />
        <text x="38" y="44" className="text-[8px] font-bold fill-teal-700">↺</text>
        <text x="114" y="44" className="text-[8px] font-bold fill-indigo-700">↻</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Fixpontok száma',
    icon: <Target className="w-4 h-4 text-rose-600" />,
    formula: 't: végtelen sok,  O: pontosan 1,  v: 0 db',
    note: 'Fixpont: P\' = P. A tengelyes tükrözésnél a tükörtengely minden pontja fixpont. A középpontos tükrözésnél csak az O centrum fixpont. Eltolásnál nincs fixpont.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="70" y2="25" className="stroke-indigo-600 stroke-[2]" />
        <circle cx="35" cy="25" r="2.5" className="fill-rose-600" />
        <circle cx="55" cy="25" r="2.5" className="fill-rose-600" />
        <circle cx="115" cy="25" r="4" className="fill-teal-700" />
        <text x="38" y="16" className="text-[7px] font-bold fill-indigo-800">t tengely</text>
        <text x="111" y="16" className="text-[8px] font-bold fill-teal-800">O</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Fixegyenesek',
    icon: <Compass className="w-4 h-4 text-purple-600" />,
    formula: 'e\' = e (pontonként vagy nem pontonként)',
    note: 'Pontonként fix: a tengely maga. Nem pontonként fix: a tengelyre merőleges egyenesek, illetve középpontos tükrözésnél a centrumon átmenő egyenesek.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="80" y1="5" x2="80" y2="45" className="stroke-slate-500 stroke-[1.5]" />
        <line x1="25" y1="25" x2="135" y2="25" className="stroke-purple-600 stroke-[2]" />
        <rect x="80" y="25" width="5" height="5" fill="none" className="stroke-purple-500 stroke-[1]" />
        <text x="30" y="20" className="text-[7px] font-bold fill-purple-700">fixegyenes ⊥ t</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egybevágóság',
    subtitle: 'Tárgypont, képpont, egybevágósági transzformáció és invariáns tulajdonságok',
    range: '1-10. Kérdés',
    focus: 'Invariánsok, távolságtartás, alaptulajdonságok',
    color: 'teal',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    questions: [
      {
        id: 'q1',
        prompt: 'Mit nevezünk a sík geometriai transzformációjának?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="30" cy="20" r="3" className="fill-teal-700" />
            <circle cx="90" cy="20" r="3" className="fill-teal-700" />
            <path d="M 36 15 Q 60 8 84 15" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <polygon points="86,16 80,12 82,19" className="fill-teal-600" />
            <text x="25" y="32" className="text-[8px] font-bold fill-teal-800">P</text>
            <text x="88" y="32" className="text-[8px] font-bold fill-teal-800">P'</text>
          </svg>
        ),
        options: [
          'Olyan szabályt, amely a sík minden pontjához egyértelműen hozzárendeli a sík egy pontját',
          'Bármilyen egyenletet, amely pontokat köt össze egymással',
          'Kizárólag a sík egyeneseinek megrajzolását',
          'Olyan eljárást, amely megváltoztatja az alakzat területét'
        ],
        correctAnswer: 'Olyan szabályt, amely a sík minden pontjához egyértelműen hozzárendeli a sík egy pontját',
        explanation: 'A geometriai transzformáció (leképezés) egy függvény: a sík minden P pontjához egyértelműen hozzárendeli a sík egy P\' képpontját.',
        breakdown: [
          { label: 'Tárgypont', value: 'P (eredeti pont)' },
          { label: 'Képpont', value: 'P\' (hozzárendelt pont)' }
        ]
      },
      {
        id: 'q2',
        prompt: 'Mikor nevezünk egy geometriai transzformációt egybevágóságinak?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="20" x2="50" y2="20" className="stroke-indigo-600 stroke-[2]" />
            <line x1="70" y1="20" x2="100" y2="20" className="stroke-indigo-600 stroke-[2]" />
            <text x="32" y="14" className="text-[8px] font-bold fill-indigo-700">|PQ|</text>
            <text x="78" y="14" className="text-[8px] font-bold fill-indigo-700">|P'Q'|</text>
          </svg>
        ),
        options: [
          'Ha távolságtartó: bármely két pont távolsága egyenlő a képpontjaik távolságával',
          'Ha minden pontot pontosan 5 cm-rel tol el',
          'Ha a sík pontjait kétszeresükre nagyítja',
          'Ha csak derékszögű alakzatokra alkalmazható'
        ],
        correctAnswer: 'Ha távolságtartó: bármely két pont távolsága egyenlő a képpontjaik távolságával',
        explanation: 'Az egybevágóság alapvető definíciója a távolságtartás: |P\'Q\'| = |PQ| minden P, Q pontpárra.',
        breakdown: [
          { label: 'Alaptétel', value: '|P\'Q\'| = |PQ|' },
          { label: 'Következmény', value: 'Az alakzat mérete és alakja nem változik meg.' }
        ]
      },
      {
        id: 'q3',
        prompt: 'Egy háromszög területe 36 cm². Mekkora lesz a területe egybevágósági transzformáció után?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <polygon points="30,10 10,32 50,32" className="fill-emerald-100 stroke-emerald-600 stroke-[1.5]" />
            <polygon points="90,10 70,32 110,32" className="fill-emerald-200 stroke-emerald-700 stroke-[1.5]" />
            <text x="22" y="24" className="text-[7px] font-bold fill-emerald-800">36 cm²</text>
            <text x="86" y="24" className="text-[7px] font-bold fill-emerald-900">T' = ?</text>
          </svg>
        ),
        options: ['36 cm²', '18 cm²', '72 cm²', 'Nem határozható meg'],
        correctAnswer: '36 cm²',
        explanation: 'Az egybevágósági transzformációk területtartók: T\' = T. A kép területe pontosan megegyezik az eredeti területével.',
        breakdown: [
          { label: 'Invariáns', value: 'Területtartás (T\' = T)' },
          { label: 'Eredmény', value: '36 cm²' }
        ]
      },
      {
        id: 'q4',
        prompt: 'Egy szög nagysága 52°. Mekkora lesz a képe tengelyes tükrözés után?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="30" x2="45" y2="30" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="20" y1="30" x2="38" y2="12" className="stroke-teal-600 stroke-[1.8]" />
            <text x="24" y="24" className="text-[7px] font-bold fill-teal-700">52°</text>
          </svg>
        ),
        options: ['52°', '128°', '26°', '104°'],
        correctAnswer: '52°',
        explanation: 'Az egybevágósági transzformációk (így a tengelyes tükrözés is) szögtartók: α\' = α. A szög nagysága nem változik.',
        breakdown: [
          { label: 'Invariáns', value: 'Szögtartás (α\' = α)' },
          { label: 'Megjegyzés', value: 'A körüljárás iránya megfordul, de a szög mértéke azonos marad.' }
        ]
      },
      {
        id: 'q5',
        prompt: 'Melyik transzformáció fordítja meg az alakzat körüljárási irányát?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="60" y1="5" x2="60" y2="35" className="stroke-indigo-600 stroke-[2]" />
            <text x="25" y="22" className="text-[9px] font-bold fill-indigo-700">↺</text>
            <text x="85" y="22" className="text-[9px] font-bold fill-indigo-700">↻</text>
          </svg>
        ),
        options: [
          'Tengelyes tükrözés',
          'Középpontos tükrözés',
          'Párhuzamos eltolás',
          'Elforgatás'
        ],
        correctAnswer: 'Tengelyes tükrözés',
        explanation: 'A 4 alapvető egybevágóság közül egyedül a tengelyes tükrözés fordítja meg a körüljárási irányt (indirekt/negatív egybevágóság).',
        breakdown: [
          { label: 'Tengelyes tükrözés', value: 'Megfordítja a körüljárást (↺ ⟹ ↻)' },
          { label: 'Többi három', value: 'Megőrzi a körüljárást (↺ ⟹ ↺)' }
        ]
      },
      {
        id: 'q6',
        prompt: 'Ha két egyenes párhuzamos a síkban (e ∥ f), milyenek lesznek a képeik eltolás után?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="15" y1="12" x2="55" y2="12" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="15" y1="28" x2="55" y2="28" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="65" y1="12" x2="105" y2="12" className="stroke-blue-600 stroke-[1.8]" />
            <line x1="65" y1="28" x2="105" y2="28" className="stroke-blue-600 stroke-[1.8]" />
          </svg>
        ),
        options: [
          'Szintén párhuzamosak (e\' ∥ f\')',
          'Metszők lesznek',
          'Merőlegesek lesznek egymásra',
          'Kitérők lesznek a síkban'
        ],
        correctAnswer: 'Szintén párhuzamosak (e\' ∥ f\')',
        explanation: 'Az egybevágóságok párhuzamosságtartók: párhuzamos egyenesek képei mindig párhuzamosak.',
        breakdown: [{ label: 'Invariáns', value: 'Párhuzamosságtartás (e ∥ f ⟹ e\' ∥ f\')' }]
      },
      {
        id: 'q7',
        prompt: 'Egy 14 cm hosszúságú AB szakasz képe elforgatás után...',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="15" y1="20" x2="50" y2="20" className="stroke-purple-600 stroke-[2]" />
            <line x1="70" y1="30" x2="95" y2="10" className="stroke-purple-600 stroke-[2]" />
            <text x="24" y="14" className="text-[7px] font-bold fill-purple-700">14 cm</text>
            <text x="84" y="24" className="text-[7px] font-bold fill-purple-700">?</text>
          </svg>
        ),
        options: [
          'szintén 14 cm hosszú szakasz',
          'rövidebb lesz a forgatás miatt',
          'hosszabb lesz a forgásszögtől függően',
          'nem szakasz, hanem körív lesz'
        ],
        correctAnswer: 'szintén 14 cm hosszú szakasz',
        explanation: 'Az elforgatás egybevágósági transzformáció, így távolságtartó: |A\'B\'| = |AB| = 14 cm.',
        breakdown: [{ label: 'Távolságtartás', value: '|A\'B\'| = 14 cm' }]
      },
      {
        id: 'q8',
        prompt: 'Mit jelent az illeszkedéstartás egy geometriai transzformációnál?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="28" x2="100" y2="12" className="stroke-slate-500 stroke-[1.8]" />
            <circle cx="60" cy="20" r="3" className="fill-teal-600" />
            <text x="56" y="13" className="text-[8px] font-bold fill-teal-700">P ∈ e</text>
          </svg>
        ),
        options: [
          'Ha a P pont rajta van az e egyenesen, akkor P\' képpont is rajta van az e\' kép-egyenesen',
          'Minden egyenes képe önmaga marad',
          'A pontok és egyenesek egymásra merőlegesek lesznek',
          'A pontok csak a koordinátatengelyeken helyezkedhetnek el'
        ],
        correctAnswer: 'Ha a P pont rajta van az e egyenesen, akkor P\' képpont is rajta van az e\' kép-egyenesen',
        explanation: 'Az illeszkedéstartás azt jelenti, hogy az alakzatok közötti illeszkedési kapcsolatok (pont egyenesen, metszéspont) a leképezés során megmaradnak.',
        breakdown: [{ label: 'Képlet', value: 'P ∈ e ⟹ P\' ∈ e\'' }]
      },
      {
        id: 'q9',
        prompt: 'Melyik transzformáció felel meg egy 180°-os forgatásnak a síkban?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="60" cy="20" r="3.5" className="fill-teal-700" />
            <line x1="30" y1="10" x2="90" y2="30" className="stroke-slate-400 stroke-[1.2] stroke-dasharray-[2,2]" />
            <circle cx="30" cy="10" r="2.5" className="fill-teal-600" />
            <circle cx="90" cy="30" r="2.5" className="fill-teal-600" />
            <text x="58" y="32" className="text-[8px] font-bold fill-teal-800">O</text>
          </svg>
        ),
        options: [
          'Középpontos tükrözés',
          'Tengelyes tükrözés',
          'Párhuzamos eltolás',
          'Nyújtás'
        ],
        correctAnswer: 'Középpontos tükrözés',
        explanation: 'Az O középpontra vonatkozó tükrözés matematikailag teljesen azonos az O pont körüli 180°-os elforgatással.',
        breakdown: [{ label: 'Azonosság', value: 'Középpontos tükrözés ≡ 180°-os forgatás' }]
      },
      {
        id: 'q10',
        prompt: 'Egy kör sugara 5 cm. Mekkora lesz a képe egybevágósági transzformáció után?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="35" cy="20" r="14" fill="none" className="stroke-teal-600 stroke-[1.8]" />
            <line x1="35" y1="20" x2="49" y2="20" className="stroke-teal-600 stroke-[1.5]" />
            <circle cx="85" cy="20" r="14" fill="none" className="stroke-indigo-600 stroke-[1.8]" />
            <line x1="85" y1="20" x2="99" y2="20" className="stroke-indigo-600 stroke-[1.5]" />
          </svg>
        ),
        options: [
          '5 cm sugarú kör',
          '10 cm sugarú kör',
          'Ellipszis lesz belőle',
          '2,5 cm sugarú kör'
        ],
        correctAnswer: '5 cm sugarú kör',
        explanation: 'Mivel a középpont és a körvonal pontjainak távolsága r = 5 cm, és a transzformáció távolságtartó, a kép is pontosan 5 cm sugarú kör lesz.',
        breakdown: [{ label: 'Kör képe', value: 'Azonos sugarú kör (r\' = r = 5 cm)' }]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: A 4 Transzformáció és Fix Elemek',
    subtitle: 'Fixpontok, fixegyenesek, körüljárási irány és transzformációk fajtái',
    range: '11-20. Kérdés',
    focus: 'Fixpontok száma, fixegyenesek, direkt vs indirekt egybevágóság',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    questions: [
      {
        id: 'q11',
        prompt: 'Hány fixpontja van a sík tengelyes tükrözésének?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="60" y1="5" x2="60" y2="35" className="stroke-indigo-600 stroke-[2.5]" />
            <circle cx="60" cy="12" r="2.5" className="fill-rose-600" />
            <circle cx="60" cy="20" r="2.5" className="fill-rose-600" />
            <circle cx="60" cy="28" r="2.5" className="fill-rose-600" />
          </svg>
        ),
        options: [
          'Végtelen sok (a tükörtengely minden pontja)',
          'Pontosan 1 fixpontja van',
          'Egyetlen fixpontja sincs',
          'Pontosan 2 fixpontja van'
        ],
        correctAnswer: 'Végtelen sok (a tükörtengely minden pontja)',
        explanation: 'A tükörtengely minden egyes pontjára P\' = P teljesül, így a tengelyes tükrözésnek végtelen sok fixpontja van.',
        breakdown: [{ label: 'Fixpontok halmaza', value: 'Maga a t tükörtengely' }]
      },
      {
        id: 'q12',
        prompt: 'Hány fixpontja van a sík középpontos tükrözésének?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="60" cy="20" r="4" className="fill-teal-700" />
            <text x="66" y="18" className="text-[9px] font-bold fill-teal-800">O</text>
          </svg>
        ),
        options: [
          'Pontosan 1 darab (maga az O centrum)',
          'Végtelen sok',
          'Nincs fixpontja',
          'Pontosan 2 darab'
        ],
        correctAnswer: 'Pontosan 1 darab (maga az O centrum)',
        explanation: 'Középpontos tükrözésnél kizárólag a tükrözés O középpontja marad helyben (O\' = O). Minden más pont átkerül a centrum túloldalára.',
        breakdown: [{ label: 'Fixpont', value: 'Kizárólag az O pont' }]
      },
      {
        id: 'q13',
        prompt: 'Hány fixpontja van egy nullától különböző vektorral történő párhuzamos eltolásnak?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="30" y1="20" x2="80" y2="20" className="stroke-blue-600 stroke-[2]" />
            <polygon points="85,20 78,16 78,24" className="fill-blue-600" />
            <text x="50" y="14" className="text-[8px] font-bold fill-blue-700">v ≠ 0</text>
          </svg>
        ),
        options: [
          '0 darab (egyetlen pont sem marad helyben)',
          '1 darab',
          'Végtelen sok',
          'Attól függ, mekkora az eltolás szöge'
        ],
        correctAnswer: '0 darab (egyetlen pont sem marad helyben)',
        explanation: 'Mivel minden P pontra |PP\'| = |v| > 0, egyetlen pont sem eshet egybe a képével. Az eltolásnak nincs fixpontja.',
        breakdown: [{ label: 'Fixpontok', value: 'Nincs fixpont (ha v ≠ 0)' }]
      },
      {
        id: 'q14',
        prompt: 'Melyek a fixegyenesek tengelyes tükrözés esetén?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="60" y1="5" x2="60" y2="35" className="stroke-indigo-600 stroke-[2]" />
            <line x1="20" y1="20" x2="100" y2="20" className="stroke-purple-600 stroke-[1.8]" />
            <rect x="60" y="20" width="5" height="5" fill="none" className="stroke-purple-500 stroke-[1]" />
          </svg>
        ),
        options: [
          'A tükörtengely (t) és a tengelyre merőleges összes egyenes',
          'Csak a tükörtengely',
          'Minden egyenes, amely párhuzamos a tengellyel',
          'Nincsenek fixegyenesek tengelyes tükrözésnél'
        ],
        correctAnswer: 'A tükörtengely (t) és a tengelyre merőleges összes egyenes',
        explanation: 'A tükörtengely pontonként fix egyenes. A rá merőleges egyenesek szintén fixegyenesek (nem pontonként), mert pontjaik a tengelyre tükröződve ugyanazon az egyenesen maradnak.',
        breakdown: [
          { label: 'Pontonként fix', value: 'A t tengely maga' },
          { label: 'Nem pontonként fix', value: 'Minden e ⊥ t merőleges egyenes' }
        ]
      },
      {
        id: 'q15',
        prompt: 'Melyek a fixegyenesek középpontos tükrözés esetén?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="30" x2="100" y2="10" className="stroke-teal-600 stroke-[2]" />
            <circle cx="60" cy="20" r="3.5" className="fill-teal-700" />
            <text x="56" y="32" className="text-[8px] font-bold fill-teal-800">O</text>
          </svg>
        ),
        options: [
          'Az O középponton átmenő valamennyi egyenes',
          'Csak az O pontra merőleges egyenesek',
          'Minden vízszintes egyenes',
          'Egyetlen fixegyenes sincs'
        ],
        correctAnswer: 'Az O középponton átmenő valamennyi egyenes',
        explanation: 'Ha egy egyenes áthalad az O centrumon, akkor bármely rajta lévő P pont képe (P\') is ezen az egyenesen fekszik, hiszen P, O és P\' egy egyenesre esik.',
        breakdown: [{ label: 'Fixegyenesek halmaza', value: 'Minden e egyenes, amelyre O ∈ e' }]
      },
      {
        id: 'q16',
        prompt: 'Mi a lényeges különbség a pontonként fix egyenes és az általános fixegyenes között?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="15" y1="20" x2="105" y2="20" className="stroke-indigo-600 stroke-[2]" />
            <text x="25" y="14" className="text-[7px] font-mono fill-indigo-700">P = P' vs P ↦ P' ∈ e</text>
          </svg>
        ),
        options: [
          'A pontonként fix egyenes minden pontja önmaga képe (P\'=P), míg a másiknál a pontok elmozdulnak az egyenesen belül',
          'Nincs különbség, a két elnevezés szinonima',
          'A pontonként fix egyenes mindig görbe vonal',
          'Az általános fixegyenes csak derékszögű lehet'
        ],
        correctAnswer: 'A pontonként fix egyenes minden pontja önmaga képe (P\'=P), míg a másiknál a pontok elmozdulnak az egyenesen belül',
        explanation: 'Pontonként fix egyenes esetén e minden pontja fixpont (P\' = P). Nem pontonként fixnél az egyenes egésze önmagába képződik (e\' = e), de a pontjai elcsúsznak vagy tükröződnek rajta.',
        breakdown: [
          { label: 'Pontonként fix', value: 'P\' = P minden pontra (pl. tükörtengely)' },
          { label: 'Nem pontonként fix', value: 'e\' = e halmazként, de P\' ≠ P' }
        ]
      },
      {
        id: 'q17',
        prompt: 'Egy háromszög csúcsainak körüljárási iránya A-B-C sorrendben óramutatóval ellentétes. Középpontos tükrözés után A\'B\'C\' körüljárása...',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <polygon points="35,10 15,30 45,30" className="fill-teal-100 stroke-teal-600 stroke-[1.5]" />
            <polygon points="85,30 105,10 75,10" className="fill-teal-200 stroke-teal-700 stroke-[1.5]" />
            <text x="25" y="24" className="text-[7px] font-bold fill-teal-800">↺</text>
            <text x="85" y="24" className="text-[7px] font-bold fill-teal-800">↺</text>
          </svg>
        ),
        options: [
          'szintén az óramutató járásával ellentétes marad (megőrzi)',
          'megfordul az óramutató járásával megegyezőre',
          'attól függ, hol van az O pont a háromszöghöz képest',
          'a körüljárási irány megszűnik értelmezhető lenni'
        ],
        correctAnswer: 'szintén az óramutató járásával ellentétes marad (megőrzi)',
        explanation: 'A középpontos tükrözés 180°-os forgatásként működik, így direkt egybevágóság: megőrzi az alakzat körüljárási irányát.',
        breakdown: [{ label: 'Körüljárás', value: 'Középpontos tükrözés: MEGŐRZI (direkt)' }]
      },
      {
        id: 'q18',
        prompt: 'Mely egyenesek a fixegyenesek egy v eltolási vektorral történő párhuzamos eltolásnál?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="15" y1="20" x2="105" y2="20" className="stroke-blue-600 stroke-[2]" />
            <line x1="40" y1="12" x2="70" y2="12" className="stroke-blue-600 stroke-[1.5]" />
            <polygon points="73,12 67,9 67,15" className="fill-blue-600" />
            <text x="50" y="8" className="text-[7px] font-bold fill-blue-700">v ∥ e</text>
          </svg>
        ),
        options: [
          'A v vektorral párhuzamos egyenesek',
          'A v vektorra merőleges egyenesek',
          'Egyetlen fixegyenes sincs eltolásnál',
          'Csak a koordinátarendszer x-tengelye'
        ],
        correctAnswer: 'A v vektorral párhuzamos egyenesek',
        explanation: 'Ha egy e egyenes párhuzamos a v eltolási vektorral, akkor az egyenes pontjai az egyenes mentén tolódnak el, így az egyenes halmazként önmagába megy át (fixegyenes, nem pontonként fix).',
        breakdown: [{ label: 'Fixegyenes feltétele', value: 'e ∥ v' }]
      },
      {
        id: 'q19',
        prompt: 'Ha egy alakzatot eltolunk v vektorral, majd az eredményt eltoljuk -v vektorral, mi lesz a végső eredmény?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="30" y1="15" x2="90" y2="15" className="stroke-blue-600 stroke-[1.5]" />
            <line x1="90" y1="25" x2="30" y2="25" className="stroke-teal-600 stroke-[1.5]" />
            <text x="55" y="11" className="text-[7px] font-bold fill-blue-700">+v</text>
            <text x="55" y="34" className="text-[7px] font-bold fill-teal-700">-v</text>
          </svg>
        ),
        options: [
          'Helybenhagyás (identitás): az alakzat visszatér eredeti helyére',
          '2·v hosszúságú eltolás',
          'Tengelyes tükrözés jön létre',
          'Középpontos tükrözés jön létre'
        ],
        correctAnswer: 'Helybenhagyás (identitás): az alakzat visszatér eredeti helyére',
        explanation: 'A v és -v vektorok összege a nullvektor (0), így az egymás utáni eltolások eredője a helybenhagyás (identitás leképezés).',
        breakdown: [{ label: 'Eredő vektor', value: 'v + (-v) = 0 (identitás)' }]
      },
      {
        id: 'q20',
        prompt: 'Hány fixpontja van egy O pont körüli 75°-os elforgatásnak a síkban?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="60" cy="22" r="3" className="fill-purple-700" />
            <line x1="60" y1="22" x2="85" y2="22" className="stroke-purple-600 stroke-[1.2]" />
            <line x1="60" y1="22" x2="78" y2="8" className="stroke-purple-600 stroke-[1.2]" />
            <text x="56" y="33" className="text-[8px] font-bold fill-purple-800">O</text>
          </svg>
        ),
        options: [
          'Pontosan 1 darab (maga az O forgási középpont)',
          'Nincs fixpontja',
          'Végtelen sok fixpontja van',
          '75 darab fixpontja van'
        ],
        correctAnswer: 'Pontosan 1 darab (maga az O forgási középpont)',
        explanation: 'Mivel a forgásszög nem teljes fordulat (α ≠ k·360°), kizárólag az O forgási centrum marad helyben.',
        breakdown: [{ label: 'Fixpont', value: 'Csak az O forgási centrum' }]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Transzformációk Összetétele és Koordináták',
    subtitle: 'Koordinátageometria, tükrözések eredője és komplex geometriai feladványok',
    range: '21-30. Kérdés',
    focus: 'Egymás utáni transzformációk, koordináták, összetett egybevágóságok',
    color: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    questions: [
      {
        id: 'q21',
        prompt: 'Hová kerül a P(4, 5) pont, ha tükrözzük az x-tengelyre?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="10" y1="20" x2="110" y2="20" className="stroke-slate-400 stroke-[1]" />
            <circle cx="60" cy="9" r="2.5" className="fill-teal-600" />
            <circle cx="60" cy="31" r="2.5" className="fill-teal-600" />
            <text x="65" y="11" className="text-[7px] font-mono fill-teal-700">P(4, 5)</text>
            <text x="65" y="33" className="text-[7px] font-mono fill-teal-700">P' = ?</text>
          </svg>
        ),
        options: ['P\'(4, -5)', 'P\'(-4, 5)', 'P\'(-4, -5)', 'P\'(5, 4)'],
        correctAnswer: 'P\'(4, -5)',
        explanation: 'Az x-tengelyre tükrözésnél az x koordináta nem változik, míg az y koordináta az ellentettjére vált: (x, y) ↦ (x, -y).',
        breakdown: [
          { label: 'Szabály', value: '(x, y) ↦ (x, -y)' },
          { label: 'Számítás', value: '(4, 5) ↦ (4, -5)' }
        ]
      },
      {
        id: 'q22',
        prompt: 'Hová kerül a P(3, -7) pont az origóra (0, 0) vonatkozó középpontos tükrözés után?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="28" x2="100" y2="12" className="stroke-slate-300 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="60" cy="20" r="2.5" className="fill-slate-600" />
            <text x="56" y="30" className="text-[7px] font-bold fill-slate-700">(0,0)</text>
          </svg>
        ),
        options: ['P\'(-3, 7)', 'P\'(3, 7)', 'P\'(-3, -7)', 'P\'(-7, 3)'],
        correctAnswer: 'P\'(-3, 7)',
        explanation: 'Az origóra vonatkozó középpontos tükrözés mindkét koordinátát az ellentettjére változtatja: (x, y) ↦ (-x, -y).',
        breakdown: [
          { label: 'Szabály', value: '(x, y) ↦ (-x, -y)' },
          { label: 'Számítás', value: '(3, -7) ↦ (-3, -(-7)) = (-3, 7)' }
        ]
      },
      {
        id: 'q23',
        prompt: 'Mi az eredője két párhuzamos tengelyre vett egymás utáni tengelyes tükrözésnek?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="45" y1="5" x2="45" y2="35" className="stroke-indigo-600 stroke-[1.8]" />
            <line x1="75" y1="5" x2="75" y2="35" className="stroke-indigo-600 stroke-[1.8]" />
            <text x="57" y="22" className="text-[8px] font-bold fill-indigo-700">d</text>
          </svg>
        ),
        options: [
          'Párhuzamos eltolás a tengelyekre merőlegesen, 2·d távolsággal',
          'Középpontos tükrözés a két tengely felezőpontjára',
          'Egyetlen harmadik tengelyes tükrözés',
          'Elforgatás 90°-kal'
        ],
        correctAnswer: 'Párhuzamos eltolás a tengelyesre merőlegesen, 2·d távolsággal',
        explanation: 'Két párhuzamos tengelyre vett tükrözés eredője mindig párhuzamos eltolás. Az eltolás iránya merőleges a tengelyekre, nagysága pedig a két tengely távolságának kétszerese (2·d).',
        breakdown: [
          { label: 'Tétel', value: 't₁ ∥ t₂ ⟹ T₂ ∘ T₁ = eltolás' },
          { label: 'Távolság', value: '2 · d' }
        ]
      },
      {
        id: 'q24',
        prompt: 'Mi az eredője két egymást M pontban metsző tengelyre vett egymás utáni tükrözésnek?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="25" y1="35" x2="95" y2="5" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="25" y1="5" x2="95" y2="35" className="stroke-purple-600 stroke-[1.5]" />
            <circle cx="60" cy="20" r="2.5" className="fill-purple-700" />
            <text x="56" y="32" className="text-[8px] font-bold fill-purple-800">M</text>
          </svg>
        ),
        options: [
          'Elforgatás az M metszéspont körül 2·α szöggel (ahol α a tengelyek hajlásszöge)',
          'Párhuzamos eltolás az M pont irányában',
          'Középpontos tükrözés bármelyik tengelyre',
          'Mindig helybenhagyás'
        ],
        correctAnswer: 'Elforgatás az M metszéspont körül 2·α szöggel (ahol α a tengelyek hajlásszöge)',
        explanation: 'Két metsző tengelyre vett tükrözés eredője elforgatás a metszéspont körül. A forgásszög a tengelyek hajlásszögének pontosan a kétszerese (2·α).',
        breakdown: [
          { label: 'Centrum', value: 'Az M metszéspont' },
          { label: 'Forgásszög', value: '2 · α' }
        ]
      },
      {
        id: 'q25',
        prompt: 'A P(-2, 4) pontot eltoljuk a v(5, -3) vektorral. Mik lesznek a képpont koordinátái?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="30" y1="28" x2="80" y2="12" className="stroke-blue-600 stroke-[1.8]" />
            <polygon points="84,11 77,10 79,16" className="fill-blue-600" />
            <text x="45" y="16" className="text-[7px] font-mono fill-blue-700">+5, -3</text>
          </svg>
        ),
        options: ['P\'(3, 1)', 'P\'(-7, 7)', 'P\'(7, -7)', 'P\'(3, 7)'],
        correctAnswer: 'P\'(3, 1)',
        explanation: 'Eltolásnál a pont koordinátáihoz hozzáadjuk a vektor megfelelő koordinátáit: x\' = -2 + 5 = 3, y\' = 4 + (-3) = 1.',
        breakdown: [
          { label: 'x koordináta', value: '-2 + 5 = 3' },
          { label: 'y koordináta', value: '4 + (-3) = 1' }
        ]
      },
      {
        id: 'q26',
        prompt: 'Mi az eredője két különböző középpontra (O₁ és O₂) vett egymás utáni középpontos tükrözésnek?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <circle cx="40" cy="20" r="2.5" className="fill-teal-700" />
            <circle cx="80" cy="20" r="2.5" className="fill-teal-700" />
            <line x1="40" y1="20" x2="80" y2="20" className="stroke-teal-600 stroke-[1.5]" />
            <text x="36" y="32" className="text-[7px] font-bold fill-teal-800">O₁</text>
            <text x="76" y="32" className="text-[7px] font-bold fill-teal-800">O₂</text>
          </svg>
        ),
        options: [
          'Párhuzamos eltolás (nagysága kétszerese az O₁O₂ távolságnak)',
          'Egy harmadik középpontos tükrözés a felezőpontra',
          'Tengelyes tükrözés az O₁O₂ szakasz felezőmerőlegesére',
          '90°-os forgatás'
        ],
        correctAnswer: 'Párhuzamos eltolás (nagysága kétszerese az O₁O₂ távolságnak)',
        explanation: 'Két középpontos tükrözés egymás után párhuzamos eltolást eredményez, amelynek eltolási vektora: 2 · O₁O₂.',
        breakdown: [{ label: 'Tétel', value: 'O₂ ∘ O₁ = eltolás (v = 2·O₁O₂)' }]
      },
      {
        id: 'q27',
        prompt: 'Ha egy alakzaton 4 tengelyes tükrözést hajtunk végre egymás után, milyen lesz a végső kép körüljárási iránya az eredetihez képest?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <text x="25" y="24" className="text-[9px] font-bold fill-emerald-700 font-mono">4 × tükrözés = ?</text>
          </svg>
        ),
        options: [
          'Megmarad (ugyanolyan lesz, mint az eredeti)',
          'Megfordul (ellentétes lesz)',
          'Attól függ, a tengelyek metszik-e egymást',
          'Csak akkor marad meg, ha mind a 4 tengely párhuzamos'
        ],
        correctAnswer: 'Megmarad (ugyanolyan lesz, mint az eredeti)',
        explanation: 'Egy tengelyes tükrözés megfordítja a körüljárást (negatív előjel). Páros számú tengelyes tükrözésnél a megfordítások kiejtik egymást: (-1)⁴ = +1, tehát a körüljárási irány megmarad.',
        breakdown: [
          { label: 'Szabály', value: 'Páros számú tükrözés: körüljárást MEGŐRZI' },
          { label: 'Páratlan számú', value: 'Körüljárást MEGFORDÍTJA' }
        ]
      },
      {
        id: 'q28',
        prompt: 'Egy derékszögű háromszög befogói 6 cm és 8 cm, átfogója 10 cm. Tengelyes tükrözés után mekkora lesz a képháromszög kerülete és területe?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <polygon points="35,8 35,32 65,32" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <text x="22" y="22" className="text-[7px] font-bold fill-indigo-700">6</text>
            <text x="48" y="38" className="text-[7px] font-bold fill-indigo-700">8</text>
            <text x="52" y="18" className="text-[7px] font-bold fill-indigo-700">10</text>
          </svg>
        ),
        options: [
          'K = 24 cm,  T = 24 cm²',
          'K = 48 cm,  T = 48 cm²',
          'K = 24 cm,  T = 48 cm²',
          'K = 12 cm,  T = 12 cm²'
        ],
        correctAnswer: 'K = 24 cm,  T = 24 cm²',
        explanation: 'Távolságtartás miatt az oldalak hossza nem változik: K = 6 + 8 + 10 = 24 cm. Területtartás miatt T = (6 · 8) / 2 = 24 cm².',
        breakdown: [
          { label: 'Kerület', value: '6 + 8 + 10 = 24 cm' },
          { label: 'Terület', value: '(6 · 8) / 2 = 24 cm²' }
        ]
      },
      {
        id: 'q29',
        prompt: 'Melyik állítás IGAZ a nem nulla eltolásra a síkban?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="25" y1="20" x2="95" y2="20" className="stroke-blue-600 stroke-[2]" />
            <polygon points="98,20 92,16 92,24" className="fill-blue-600" />
          </svg>
        ),
        options: [
          'Nincs fixpontja, de vannak fixegyenesei (a vektorral párhuzamosak)',
          'Vannak fixpontjai, de nincsenek fixegyenesei',
          'Végtelen sok fixpontja és végtelen sok fixegyenese van',
          'Egyetlen fixpontja van és nincs fixegyenese'
        ],
        correctAnswer: 'Nincs fixpontja, de vannak fixegyenesei (a vektorral párhuzamosak)',
        explanation: 'Az eltolásnak egyetlen pontja sem marad helyben (0 fixpont), de a v eltolási vektorral párhuzamos egyenesek mindegyike önmagába képződik le (nem pontonként fix fixegyenesek).',
        breakdown: [
          { label: 'Fixpont', value: 'Nincs (0 db)' },
          { label: 'Fixegyenes', value: 'Végtelen sok (e ∥ v)' }
        ]
      },
      {
        id: 'q30',
        prompt: 'Az origó körüli +90°-os forgatás (óramutatóval ellentétes) hová viszi a (4, 0) pontot?',
        figure: (
          <svg viewBox="0 0 120 40" className="w-36 h-12 mx-auto">
            <line x1="20" y1="30" x2="100" y2="30" className="stroke-slate-400 stroke-[1]" />
            <line x1="60" y1="5" x2="60" y2="35" className="stroke-slate-400 stroke-[1]" />
            <circle cx="85" cy="30" r="2.5" className="fill-purple-700" />
            <circle cx="60" cy="10" r="2.5" className="fill-purple-700" />
            <path d="M 75 30 A 15 15 0 0 0 60 15" fill="none" className="stroke-purple-500 stroke-[1.2] stroke-dasharray-[2,2]" />
          </svg>
        ),
        options: ['(0, 4)', '(0, -4)', '(-4, 0)', '(4, 4)'],
        correctAnswer: '(0, 4)',
        explanation: 'A (4, 0) pont a pozitív x-tengelyen van 4 egység távolságra. 90°-os pozitív forgatással a pozitív y-tengely 4 egységnyi pontjába jut, azaz a (0, 4) pontba.',
        breakdown: [
          { label: 'Szabály', value: '(x, y) ↦ (-y, x)' },
          { label: 'Behelyettesítés', value: '(4, 0) ↦ (-0, 4) = (0, 4)' }
        ]
      }
    ]
  }
};

export const GeometricTransformationsQuiz: React.FC<GeometricTransformationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-geom-trans"
      topicId="g7-geom-transformations"
      topicTitle="4. Geometriai transzformációk"
      subtopicId="geometriai-transzformaciok"
      documentId="grade-7-geometriai-transzformaciok-transzformaciok-quiz"
      emoji="🔄"
      topicBadge="7. Osztály • Matematika III. Témakör"
      badgeText="7. Osztály • Matematika III. Témakör"
      title="4. Geometriai transzformációk Kvíz"
      subtitle="Gyakorold a geometriai leképezések fogalmát, az egybevágósági transzformációkat, invariáns tulajdonságaikat, a 4 alaptípust és a fix elemeket 30 ábrás feladattal!"
      cheatSheetTitle="Transzformációk Puska & Képtár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="teal"
      hintText="💡 Figyelj a távolságtartás definíciójára, a körüljárási irányra (a tengelyes tükrözés megfordítja!) és a fixpontok számára!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a transzformációkat invariánsaikkal és ábráikkal!',
          badgeText: '10 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GeometricTransformationsMatcher
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
          subtitle: 'Kategorizáld a transzformációkat, hatásaikat és fix elemeiket!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <GeometricTransformationsSorter
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

export default GeometricTransformationsQuiz;
