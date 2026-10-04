import React from 'react';
import { QuizTemplate, LevelConfig, DifficultyLevel, CheatSheetCard } from '../QuizTemplate';
import { SequencesMatcher } from './SequencesMatcher';
import { SequencesSorter } from './SequencesSorter';
import { ArrowRightLeft, LayoutGrid, Binary, TrendingUp, Sparkles, HelpCircle, Layers, Scale, Hash, Zap } from 'lucide-react';

interface SequencesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Számtani Sorozat (Aritmetikai)',
    icon: <TrendingUp className="w-4 h-4 text-cyan-600" />,
    formula: 'a_n = a_1 + (n - 1) \\cdot d, \\quad d = a_{n+1} - a_n',
    note: 'A szomszédos tagok különbsége (d = differencia) állandó. Bármely belső tag a szomszédjai számtani közepe.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="20" cy="38" r="4" fill="#06b6d4" />
        <circle cx="50" cy="30" r="4" fill="#06b6d4" />
        <circle cx="80" cy="22" r="4" fill="#06b6d4" />
        <circle cx="110" cy="14" r="4" fill="#06b6d4" />
        <path d="M20,38 L50,30 L80,22 L110,14" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" fill="none" />
        <text x="135" y="24" className="text-[7px] font-bold fill-cyan-900">+d lánc</text>
        <text x="135" y="34" className="text-[5.5px] fill-cyan-700">lineáris</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Mértani Sorozat (Geometriai)',
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
    formula: 'a_n = a_1 \\cdot q^{n-1}, \\quad q = \\frac{a_{n+1}}{a_n}',
    note: 'A szomszédos tagok hányadosa (q = kvóciens) állandó. Pozitív sorozatban a tag a szomszédai mértani közepe.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="20" cy="42" r="3" fill="#0284c7" />
        <circle cx="50" cy="38" r="3.5" fill="#0284c7" />
        <circle cx="80" cy="28" r="4" fill="#0284c7" />
        <circle cx="110" cy="10" r="5" fill="#0284c7" />
        <text x="135" y="24" className="text-[7px] font-bold fill-sky-900">·q lánc</text>
        <text x="135" y="34" className="text-[5.5px] fill-sky-700">exponenciális</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A Fibonacci-sorozat',
    icon: <Sparkles className="w-4 h-4 text-cyan-600" />,
    formula: 'F_1 = 1, \\; F_2 = 1, \\quad F_n = F_{n-1} + F_{n-2} \\; (n \\ge 3)',
    note: 'Minden tag az előző két tag összege: 1, 1, 2, 3, 5, 8, 13, 21, 34... A tagok hányadosa az aranymetszéshez tart (Φ ≈ 1,618).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="30" width="10" height="10" fill="#cffafe" stroke="#0891b2" />
        <rect x="30" y="30" width="10" height="10" fill="#cffafe" stroke="#0891b2" />
        <rect x="20" y="10" width="20" height="20" fill="#a5f3fc" stroke="#0891b2" />
        <rect x="40" y="10" width="30" height="30" fill="#67e8f9" stroke="#0891b2" />
        <text x="95" y="24" className="text-[7px] font-bold fill-cyan-900">Arany téglalapok</text>
        <text x="95" y="34" className="text-[5.5px] fill-cyan-700">1, 1, 2, 3, 5...</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Explicit vs. Rekurzív Megadás',
    icon: <Zap className="w-4 h-4 text-cyan-600" />,
    formula: '\\text{Explicit: } a_n = f(n), \\quad \\text{Rekurzív: } a_1, \\, a_{n+1} = g(a_n)',
    note: 'Explicitnél azonnal behelyettesíthető a 100. tag (n = 100). Rekurzívnál lépésről lépésre jutunk el a következő elemhez.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="50" height="34" rx="4" fill="#ecfeff" stroke="#06b6d4" />
        <text x="40" y="23" className="text-[6.5px] font-bold fill-cyan-900" textAnchor="middle">Explicit: n ↦ a_n</text>
        <text x="40" y="34" className="text-[5px] fill-cyan-700" textAnchor="middle">közvetlen</text>
        <rect x="85" y="8" width="55" height="34" rx="4" fill="#f0f9ff" stroke="#0284c7" />
        <text x="112" y="23" className="text-[6.5px] font-bold fill-sky-900" textAnchor="middle">Rekurzív: a_n ↦ a_(n+1)</text>
        <text x="112" y="34" className="text-[5px] fill-sky-700" textAnchor="middle">lépésenként</text>
      </svg>
    )
  }
];

const levelConfigs: Record<DifficultyLevel, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Szabályok',
    description: 'Sorozat fogalma, számtani és mértani sorozat felismerése, differencia (d), kvóciens (q) és a Fibonacci-sorozat alapjai.',
    passingScore: 7,
    questions: [
      {
        id: 'seq-q1-1',
        prompt: 'Egy számtani sorozat tagjai: 4, 7, 10, 13, 16... Mennyi a sorozat differenciája (d)?',
        options: ['d = 3', 'd = 4', 'd = 7', 'd = -3'],
        correctAnswer: 0,
        explanation: 'A számtani sorozat differenciája a szomszédos tagok különbsége: d = 7 - 4 = 10 - 7 = 3.'
      },
      {
        id: 'seq-q1-2',
        prompt: 'Egy mértani sorozat tagjai: 2, 6, 18, 54, ... Mennyi a hányados (q), és mennyi az 5. tag?',
        options: [
          'q = 3, és az 5. tag: 162',
          'q = 4, és az 5. tag: 72',
          'q = 2, és az 5. tag: 108',
          'q = 3, és az 5. tag: 216'
        ],
        correctAnswer: 0,
        explanation: 'q = 6 / 2 = 3. Az 5. tag: 54 · 3 = 162 (vagy a₅ = 2 · 3⁴ = 2 · 81 = 162).'
      },
      {
        id: 'seq-q1-3',
        prompt: 'A Fibonacci-sorozat első tagjai: 1, 1, 2, 3, 5, 8, 13, 21, ... Melyik szám a következő tag?',
        options: ['34 (mert 13 + 21 = 34)', '29', '31', '42'],
        correctAnswer: 0,
        explanation: 'A Fibonacci-sorozatban minden tag az előző két tag összege: 13 + 21 = 34.'
      },
      {
        id: 'seq-q1-4',
        prompt: 'Egy számtani sorozat első tagja a₁ = 5, differenciája d = 4. Mennyi a sorozat 6. tagja (a₆)?',
        options: ['25', '29', '24', '20'],
        correctAnswer: 0,
        explanation: 'a₆ = a₁ + 5 · d = 5 + 5 · 4 = 5 + 20 = 25.'
      },
      {
        id: 'seq-q1-5',
        prompt: 'Egy mértani sorozat első tagja a₁ = 3, kvóciense q = 2. Mennyi a sorozat 4. tagja (a₄)?',
        options: ['24', '18', '48', '12'],
        correctAnswer: 0,
        explanation: 'a₄ = a₁ · q³ = 3 · 2³ = 3 · 8 = 24.'
      },
      {
        id: 'seq-q1-6',
        prompt: 'Egy sorozat n-edik tagját az a_n = 4n - 1 explicit képlet adja meg. Mennyi a sorozat 5. tagja (a₅)?',
        options: ['19', '15', '20', '21'],
        correctAnswer: 0,
        explanation: 'a₅ = 4 · 5 - 1 = 20 - 1 = 19.'
      },
      {
        id: 'seq-q1-7',
        prompt: 'Melyik sorozat SZÁMTANI SOROZAT az alábbiak közül?',
        options: [
          '3, 8, 13, 18, 23 (mindig +5)',
          '2, 4, 8, 16, 32',
          '1, 4, 9, 16, 25',
          '1, 2, 4, 7, 11'
        ],
        correctAnswer: 0,
        explanation: 'Csak a 3, 8, 13, 18, 23 sorozatban állandó a különbség (d = +5).'
      },
      {
        id: 'seq-q1-8',
        prompt: 'Melyik sorozat MÉRTANI SOROZAT az alábbiak közül?',
        options: [
          '5, 10, 20, 40, 80 (mindig ·2)',
          '5, 10, 15, 20, 25',
          '1, 3, 6, 10, 15',
          '10, 8, 6, 4, 2'
        ],
        correctAnswer: 0,
        explanation: 'Csak az 5, 10, 20, 40, 80 sorozatban állandó a szomszédos tagok hányadosa (q = 2).'
      },
      {
        id: 'seq-q1-9',
        prompt: 'Mi a számsorozat értelmezési tartománya a függvénytan szerint?',
        options: [
          'A pozitív egész számok halmaza (ℤ⁺: 1, 2, 3, 4...)',
          'A valós számok teljes halmaza (ℝ)',
          'Csak a páros számok halmaza',
          'A negatív számok halmaza'
        ],
        correctAnswer: 0,
        explanation: 'A számsorozat olyan függvény, amelynek értelmezési tartománya a pozitív egészek halmaza (n ∈ {1, 2, 3...}).'
      },
      {
        id: 'seq-q1-10',
        prompt: 'Hogyan ábrázoljuk a sorozatokat derékszögű koordináta-rendszerben?',
        options: [
          'Különálló, diszkrét pontokként (nem kötjük össze őket folytonos vonallal)',
          'Folytonos egyenessel vagy görbével összekötve',
          'Csak az origón átmenő egyenessel',
          'Kördiagram formájában'
        ],
        correctAnswer: 0,
        explanation: 'Mivel n csak pozitív egész szám lehet, a grafikon diszkrét (különálló) pontok halmaza.'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek, Számítások és Monotonitás',
    description: 'Távoli tagok kiszámítása, differencia és kvóciens meghatározása megadott tagokból, növekedés és csökkenés.',
    passingScore: 7,
    questions: [
      {
        id: 'seq-q2-1',
        prompt: 'Egy számtani sorozatban a₁ = 7, d = 4. Mennyi a sorozat 20. tagja (a₂₀)?',
        options: ['83', '87', '80', '76'],
        correctAnswer: 0,
        explanation: 'a₂₀ = a₁ + 19 · d = 7 + 19 · 4 = 7 + 76 = 83.'
      },
      {
        id: 'seq-q2-2',
        prompt: 'Egy számtani sorozatban a₁ = 12 és a₄ = 27. Mennyi a differencia (d)?',
        options: ['d = 5', 'd = 3', 'd = 15', 'd = 4'],
        correctAnswer: 0,
        explanation: 'a₄ = a₁ + 3d → 27 = 12 + 3d → 3d = 15 → d = 5.'
      },
      {
        id: 'seq-q2-3',
        prompt: 'Egy mértani sorozatban a₁ = 5 és a₃ = 45 (minden tag pozitív). Mennyi a kvóciens (q), és mennyi az a₄?',
        options: [
          'q = 3 és a₄ = 135',
          'q = 9 és a₄ = 405',
          'q = 3 és a₄ = 90',
          'q = 4 és a₄ = 180'
        ],
        correctAnswer: 0,
        explanation: 'a₃ = a₁ · q² → 45 = 5 · q² → q² = 9 → q = 3. Így a₄ = 45 · 3 = 135.'
      },
      {
        id: 'seq-q2-4',
        prompt: 'Egy számtani sorozat tagjai: 50, 43, 36, 29... Mi a sorozat monotonitása és 10. tagja (a₁₀)?',
        options: [
          'Szigorúan monoton csökken (d = -7), és a₁₀ = -13',
          'Szigorúan monoton csökken (d = -7), és a₁₀ = -6',
          'Monoton nő, és a₁₀ = 113',
          'Nem monoton, és a₁₀ = 0'
        ],
        correctAnswer: 0,
        explanation: 'd = 43 - 50 = -7. a₁₀ = 50 + 9 · (-7) = 50 - 63 = -13. Mivel d < 0, a sorozat szigorúan monoton csökken.'
      },
      {
        id: 'seq-q2-5',
        prompt: 'Egy sorozat rekurzív szabálya: a₁ = 2, a_(n+1) = 2 · a_n + 1. Mik az első 4 tag?',
        options: [
          '2, 5, 11, 23',
          '2, 4, 8, 16',
          '2, 5, 8, 11',
          '2, 3, 5, 9'
        ],
        correctAnswer: 0,
        explanation: 'a₁ = 2. a₂ = 2·2 + 1 = 5. a₃ = 2·5 + 1 = 11. a₄ = 2·11 + 1 = 23.'
      },
      {
        id: 'seq-q2-6',
        prompt: 'Egy számtani sorozatban a_n = 6n - 5. Melyik sorszámú tag értéke 67?',
        options: ['A 12. tag (n = 12)', 'A 11. tag (n = 11)', 'A 10. tag (n = 10)', 'A 13. tag (n = 13)'],
        correctAnswer: 0,
        explanation: '6n - 5 = 67 → 6n = 72 → n = 12.'
      },
      {
        id: 'seq-q2-7',
        prompt: 'Mennyi a Fibonacci-sorozat 8. tagja (F₈)?',
        options: ['21', '13', '34', '18'],
        correctAnswer: 0,
        explanation: 'F₁=1, F₂=1, F₃=2, F₄=3, F₅=5, F₆=8, F₇=13, F₈ = 8 + 13 = 21.'
      },
      {
        id: 'seq-q2-8',
        prompt: 'Egy mértani sorozat első tagja 100, kvóciense q = 0.5. Mennyi az 5. tagja (a₅)?',
        options: ['6.25', '12.5', '3.125', '25'],
        correctAnswer: 0,
        explanation: 'a₅ = 100 · 0.5⁴ = 100 · 0.0625 = 6.25 (lépésenként: 100, 50, 25, 12.5, 6.25).'
      },
      {
        id: 'seq-q2-9',
        prompt: 'Egy számtani sorozatban két szomszédos tag: a₄ = 17 és a₆ = 29. Mennyi a középső tag (a₅)?',
        options: [
          '23 (a számtani közép: (17 + 29) / 2 = 23)',
          '24',
          '22',
          '25'
        ],
        correctAnswer: 0,
        explanation: 'Számtani sorozatban bármely tag a szomszédjai számtani közepe: (17 + 29) / 2 = 46 / 2 = 23 (d = 6).'
      },
      {
        id: 'seq-q2-10',
        prompt: 'Egy mértani sorozat tagjai: 3, -6, 12, -24, 48... Mi a kvóciens (q) és miért váltakozik az előjel?',
        options: [
          'q = -2, mert negatív számmal szorozva az előjel minden lépésben megfordul (oszcillál)',
          'q = 2, és kivonással képződik',
          'q = -1, és a differencia d = 3',
          'Ez nem mértani sorozat'
        ],
        correctAnswer: 0,
        explanation: 'q = -6 / 3 = -2. Ha a kvóciens negatív (q < 0), a sorozat előjele lépésről lépésre váltakozik.'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Szöveges Feladatok',
    description: 'Valós életbeli alkalmazások (kamatos kamat, baktériumok, túra), mértani közép és magasabb szintű összefüggések.',
    passingScore: 7,
    questions: [
      {
        id: 'seq-q3-1',
        prompt: 'Egy baktériumtenyészetben 500 baktérium van. A baktériumok száma óránként megduplázódik. Hány baktérium lesz 6 óra múlva?',
        options: [
          '32 000 (mert 500 · 2⁶ = 500 · 64 = 32 000)',
          '16 000',
          '64 000',
          '6 000'
        ],
        correctAnswer: 0,
        explanation: '6 duplázódás után: a = 500 · 2⁶ = 500 · 64 = 32 000 baktérium.'
      },
      {
        id: 'seq-q3-2',
        prompt: 'Egy túrázó az első napon 15 km-t gyalogol, majd minden további napon pontosan 3 km-rel többet, mint az előzőn. Hány km-t tesz meg a 12. napon?',
        options: [
          '48 km (a₁₂ = 15 + 11 · 3 = 48)',
          '51 km',
          '45 km',
          '36 km'
        ],
        correctAnswer: 0,
        explanation: 'Számtani sorozat: a₁ = 15, d = 3. a₁₂ = 15 + 11 · 3 = 15 + 33 = 48 km.'
      },
      {
        id: 'seq-q3-3',
        prompt: 'Egy pozitív tagú mértani sorozatban a₃ = 4 és a₅ = 36. Mennyi a középső tag (a₄)?',
        options: [
          '12 (a mértani közép: √(4 · 36) = √144 = 12)',
          '20 (a számtani közép)',
          '16',
          '18'
        ],
        correctAnswer: 0,
        explanation: 'Pozitív mértani sorozatban a tag a szomszédai mértani közepe: a₄ = √(a₃ · a₅) = √(4 · 36) = √144 = 12.'
      },
      {
        id: 'seq-q3-4',
        prompt: 'Egy számtani sorozatban a₃ = 11 és a₇ = 27. Mennyi a sorozat első tagja (a₁) és differenciája (d)?',
        options: [
          'a₁ = 3 és d = 4',
          'a₁ = 4 és d = 3',
          'a₁ = 5 és d = 4',
          'a₁ = 2 és d = 5'
        ],
        correctAnswer: 0,
        explanation: 'a₇ - a₃ = 4d → 27 - 11 = 16 → 4d = 16 → d = 4. Így a₁ = a₃ - 2d = 11 - 8 = 3.'
      },
      {
        id: 'seq-q3-5',
        prompt: 'Milyen összefüggés áll fenn a Fibonacci-sorozat egymást követő tagjainak hányadosa (F_(n+1) / F_n) és a geometria között nagy n értékeknél?',
        options: [
          'A hányados az Aranymetszés értékéhez tart (Φ = (1 + √5) / 2 ≈ 1,618)',
          'A hányados pontosan a π (3,14159...) számhoz tart',
          'A hányados a 2-höz tart',
          'A hányados a 0-hoz tart'
        ],
        correctAnswer: 0,
        explanation: 'A Fibonacci-sorozat egymást követő tagjainak hányadosa a határértékben az aranyarányt (Φ ≈ 1,618) adja meg.'
      },
      {
        id: 'seq-q3-6',
        prompt: 'Egy színházteremben az első sorban 18 szék van, és minden következő sorban 2-vel több, mint az előtte lévőben. Hányadik sorban van pontosan 40 szék?',
        options: [
          'A 12. sorban (18 + (n - 1) · 2 = 40 → n = 12)',
          'A 11. sorban',
          'A 10. sorban',
          'A 14. sorban'
        ],
        correctAnswer: 0,
        explanation: '18 + (n - 1) · 2 = 40 → 2(n - 1) = 22 → n - 1 = 11 → n = 12.'
      },
      {
        id: 'seq-q3-7',
        prompt: 'Egy autó ára újonnan 8 000 000 Ft. Minden évben az előző évi értékének 80%-ára csökken (q = 0.8). Hány Ft-ot ér az autó 3 év múlva?',
        options: [
          '4 096 000 Ft (8 000 000 · 0.8³ = 4 096 000)',
          '5 120 000 Ft',
          '3 200 000 Ft',
          '4 800 000 Ft'
        ],
        correctAnswer: 0,
        explanation: '0.8³ = 0.512. 8 000 000 · 0.512 = 4 096 000 Ft.'
      },
      {
        id: 'seq-q3-8',
        prompt: 'Igaz-e, hogy az a_n = 5, 5, 5, 5... csupa 5-ösből álló állandó sorozat egyszerre számtani és mértani sorozat is?',
        options: [
          'Igaz: számtani d = 0 differenciával, és mértani q = 1 kvócienssel',
          'Hamis: csak számtani lehet',
          'Hamis: csak mértani lehet',
          'Hamis: egy sorozat sosem lehet egyszerre mindkettő'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 5 - 5 = 0 (állandó differencia) és 5 / 5 = 1 (állandó hányados), a konstans sorozat mindkét definíciót kielégíti.'
      },
      {
        id: 'seq-q3-9',
        prompt: 'Egy mértani sorozatban a₁ = 2 és q = -3. Mennyi a sorozat 5. tagja (a₅)?',
        options: [
          '162 (mert 2 · (-3)⁴ = 2 · 81 = 162)',
          '-162',
          '486',
          '-54'
        ],
        correctAnswer: 0,
        explanation: 'a₅ = a₁ · q⁴ = 2 · (-3)⁴. Mivel 4 páros kitevő, (-3)⁴ = +81. Így a₅ = 2 · 81 = 162.'
      },
      {
        id: 'seq-q3-10',
        prompt: 'Egy számtani sorozat első tagja a₁ = -15, differenciája d = 4. Melyik a sorozat legelső POZITÍV tagja?',
        options: [
          'Az 5. tag (a₅ = 1)',
          'A 4. tag (a₄ = -3)',
          'A 6. tag (a₆ = 5)',
          'A 7. tag (a₇ = 9)'
        ],
        correctAnswer: 0,
        explanation: 'A tagok: a₁ = -15, a₂ = -11, a₃ = -7, a₄ = -3, a₅ = 1. Tehát a legelső pozitív tag az a₅ = 1.'
      }
    ]
  }
};

export const SequencesQuiz: React.FC<SequencesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-func-sequences"
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicTitle="Sorozatok"
      themeColor="cyan"
      levelConfigs={levelConfigs}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Párosítsd össze a sorozatok tulajdonságait, képleteit és számításait!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Szabályok',
              subtitle: 'Kösd össze a számtani, mértani és Fibonacci alapfogalmakat!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapok',
              focus: 'Definíciók'
            },
            2: {
              title: '2. Szint: Számítások és Képletek',
              subtitle: 'Számítsd ki a konkrét tagokat és differenciákat!',
              rangeLabel: 'Párok:',
              range: '8 pár • Számítás',
              focus: 'Alkalmazás'
            },
            3: {
              title: '3. Szint: Összefüggések és Tulajdonságok',
              subtitle: 'Számtani és mértani közép, inverz feladatok és aranymetszés!',
              rangeLabel: 'Párok:',
              range: '8 pár • Haladó',
              focus: 'Összefüggések'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <SequencesMatcher
              key={`seq-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Válogasd szét a sorozatokat típus, növekedés és állítások szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Sorozattípusok',
              subtitle: 'Csoportosítsd: Számtani (+d), Mértani (·q), vagy Fibonacci / Egyéb!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Típusok',
              focus: 'Felismerés'
            },
            2: {
              title: '2. Szint: Monotonitás és Viselkedés',
              subtitle: 'Válogasd szét: Monoton nő, Monoton csökken, vagy Oszcilláló!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Viselkedés',
              focus: 'Monotonitás'
            },
            3: {
              title: '3. Szint: Igaz, Hamis és Tévhitek',
              subtitle: 'Döntsd el a sorozatokról szóló állítások igazságtartalmát!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Állítások',
              focus: 'Kritikai megítélés'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <SequencesSorter
              key={`seq-sorter-${level}`}
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
    />
  );
};

export default SequencesQuiz;
