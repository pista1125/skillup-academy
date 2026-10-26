import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SquareRootMatcher } from './SquareRootMatcher';
import { SquareRootSorter } from './SquareRootSorter';
import {
  SquareRootConceptSvg,
  SquareRootIdentitiesSvg,
  FactoringAndDenomSvg,
  SquareRootGeometrySvg
} from './SquareRootFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface SquareRootQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Négyzetszámok (Könnyű)',
    subtitle: 'Négyzetgyök definíciója, nemnegativitás, négyzetszámok gyöke és az abszolút érték.',
    range: '1 - 10. feladat',
    focus: 'Definíciók és Alapértékek',
    questions: [
      {
        id: 'srq1-1',
        questionTypeBadge: 'Alapvető Négyzetgyök',
        question: 'Mennyi a √49 pontos értéke?',
        figure: <SquareRootConceptSvg size={170} />,
        options: [
          '7',
          '±7',
          '24,5',
          '14'
        ],
        correctAnswer: 0,
        hint: 'A definíció szerint a négyzetgyök mindig nemnegatív szám, amelynek négyzete 49.',
        explanation: 'A négyzetgyök definíciója alapján √49 = 7, mert 7 ≥ 0 és 7² = 49. Nem ±7, mert √a mindig nemnegatív!'
      },
      {
        id: 'srq1-2',
        questionTypeBadge: 'Nulla Gyöke',
        question: 'Mennyi a √0 értéke a valós számok körében?',
        options: [
          '0',
          '1',
          'Nem értelmezhető',
          'Végtelen'
        ],
        correctAnswer: 0,
        hint: 'Melyik nemnegatív számnak a négyzete 0?',
        explanation: '0² = 0, és 0 ≥ 0, így √0 = 0.'
      },
      {
        id: 'srq1-3',
        questionTypeBadge: 'Definíciós Kikötés',
        question: 'Mennyi a √(-16) értéke a valós számok (ℝ) halmazán?',
        options: [
          'Nem értelmezett a valós számok körében',
          '-4',
          '+4',
          '±4'
        ],
        correctAnswer: 0,
        hint: 'Létezik-e olyan valós szám, amelynek a négyzete negatív?',
        explanation: 'Semmilyen valós szám négyzete nem lehet negatív: (-4)² = +16 és 4² = +16. Ezért negatív számnak nincs valós négyzetgyöke!'
      },
      {
        id: 'srq1-4',
        questionTypeBadge: 'Abszolút Érték Szabály',
        question: 'Mennyi a √((-6)²) kifejezés pontos értéke?',
        figure: <SquareRootConceptSvg size={170} />,
        options: [
          '+6',
          '-6',
          '±6',
          '36'
        ],
        correctAnswer: 0,
        hint: 'Alkalmazd az aranyszabályt: √(x²) = |x|!',
        explanation: '(-6)² = 36, és √36 = +6. Az azonosság szerint √((-6)²) = |-6| = 6.'
      },
      {
        id: 'srq1-5',
        questionTypeBadge: 'Gyök Négyzete',
        question: 'Mennyi a (√13)² kifejezés értéke?',
        options: [
          '13',
          '169',
          '√13',
          '26'
        ],
        correctAnswer: 0,
        hint: 'A négyzetgyök és a négyzetre emelés egymás megfordításai: (√a)² = a minden a ≥ 0 esetén.',
        explanation: 'A definíció alapján (√a)² = a, így (√13)² = 13.'
      },
      {
        id: 'srq1-6',
        questionTypeBadge: 'Geometriai Kapcsolat',
        question: 'Egy négyzet területe 64 cm². Mekkora a négyzet oldalhossza?',
        figure: <SquareRootConceptSvg size={170} />,
        options: [
          '8 cm',
          '16 cm',
          '32 cm',
          '4 cm'
        ],
        correctAnswer: 0,
        hint: 'A négyzet területe T = a², így oldala a = √T.',
        explanation: 'a = √64 = 8 cm. A négyzet oldala 8 cm hosszú.'
      },
      {
        id: 'srq1-7',
        questionTypeBadge: 'Szorzat Gyöke',
        question: 'Számítsd ki a √(4 · 25) kifejezés értékét az azonosság segítségével!',
        figure: <SquareRootIdentitiesSvg size={170} />,
        options: [
          '10 (√4 · √25 = 2 · 5 = 10)',
          '20',
          '50',
          '100'
        ],
        correctAnswer: 0,
        hint: '√(a · b) = √a · √b.',
        explanation: '√(4 · 25) = √4 · √25 = 2 · 5 = 10 (vagy √100 = 10).'
      },
      {
        id: 'srq1-8',
        questionTypeBadge: 'Hányados Gyöke',
        question: 'Mennyi a √(36 / 81) tört legegyszerűbb alakja?',
        figure: <SquareRootIdentitiesSvg size={170} />,
        options: [
          '2/3 (mert 6/9 = 2/3)',
          '4/9',
          '6/81',
          '36/9'
        ],
        correctAnswer: 0,
        hint: '√(a / b) = √a / √b.',
        explanation: '√(36 / 81) = √36 / √81 = 6 / 9 = 2/3.'
      },
      {
        id: 'srq1-9',
        questionTypeBadge: 'Összeg Csapdája',
        question: 'Mennyi a √(9 + 16) kifejezés pontos értéke?',
        figure: <SquareRootIdentitiesSvg size={170} />,
        options: [
          '5 (mert √(9 + 16) = √25 = 5)',
          '7 (mert 3 + 4 = 7)',
          '25',
          '12'
        ],
        correctAnswer: 0,
        hint: 'Összeadásra nincs azonosság! Előbb add össze a számokat a gyökjel alatt!',
        explanation: 'A gyökjel alatt 9 + 16 = 25 áll, és √25 = 5. A √9 + √16 = 3 + 4 = 7 hibás!'
      },
      {
        id: 'srq1-10',
        questionTypeBadge: 'Két Egész Közé Esés',
        question: 'Melyik két szomszédos egész szám közé esik a √30 értéke?',
        options: [
          '5 és 6 közé (mert 5² = 25 < 30 < 36 = 6²)',
          '4 és 5 közé',
          '6 és 7 közé',
          '14 és 16 közé'
        ],
        correctAnswer: 0,
        hint: 'Keresd meg a 30-hoz legközelebbi négyzetszámokat: 25 és 36.',
        explanation: 'Mivel 25 < 30 < 36, és a négyzetgyökfüggvény szigorúan monoton növekvő: √25 < √30 < √36, azaz 5 < √30 < 6.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Azonosságok és Műveleti Technikák (Közepes)',
    subtitle: 'Kiemelés a gyökjel alól, bevitel a gyökjel alá, nevező gyöktelenítése.',
    range: '11 - 20. feladat',
    focus: 'Kiemelés és Gyöktelenítés',
    questions: [
      {
        id: 'srq2-1',
        questionTypeBadge: 'Kiemelés Gyökjel Alól',
        question: 'Hogyan alakítható át a √72 tényező kiemelésével a legegyszerűbb alakra?',
        figure: <FactoringAndDenomSvg size={170} />,
        options: [
          '6√2',
          '3√8',
          '2√18',
          '36√2'
        ],
        correctAnswer: 0,
        hint: 'Keresd meg a 72 legnagyobb négyzetszám osztóját: 72 = 36 · 2.',
        explanation: '√72 = √(36 · 2) = √36 · √2 = 6√2.'
      },
      {
        id: 'srq2-2',
        questionTypeBadge: 'Kiemelés Gyökjel Alól',
        question: 'Mennyi a √50 kifejezés kiemelt legegyszerűbb alakja?',
        options: [
          '5√2',
          '2√5',
          '25√2',
          '10√5'
        ],
        correctAnswer: 0,
        hint: '50 = 25 · 2, ahol 25 négyzetszám.',
        explanation: '√50 = √(25 · 2) = √25 · √2 = 5√2.'
      },
      {
        id: 'srq2-3',
        questionTypeBadge: 'Kiemelés Gyökjel Alól',
        question: 'Egyszerűsítsd a √48 kifejezést a gyökjel alóli kiemeléssel!',
        options: [
          '4√3',
          '2√12',
          '16√3',
          '3√4'
        ],
        correctAnswer: 0,
        hint: '48 legnagyobb négyzetszám osztója a 16: 48 = 16 · 3.',
        explanation: '√48 = √(16 · 3) = √16 · √3 = 4√3.'
      },
      {
        id: 'srq2-4',
        questionTypeBadge: 'Bevitel a Gyökjel Alá',
        question: 'Melyik gyökkel egyenlő a 3√5 kifejezés, ha a szorzót bevisszük a gyökjel alá?',
        options: [
          '√45',
          '√15',
          '√75',
          '√30'
        ],
        correctAnswer: 0,
        hint: 'A 3-ast négyzetre emelve (3² = 9) visszük be a gyökjel alá.',
        explanation: '3√5 = √(3² · 5) = √(9 · 5) = √45.'
      },
      {
        id: 'srq2-5',
        questionTypeBadge: 'Szorzat Összevonása',
        question: 'Mennyi a √8 · √2 szorzat pontos értéke?',
        figure: <SquareRootIdentitiesSvg size={170} />,
        options: [
          '4',
          '16',
          '√10',
          '2√4'
        ],
        correctAnswer: 0,
        hint: 'Von össze a két számot egy közös gyökjel alá: √(8 · 2).',
        explanation: '√8 · √2 = √(8 · 2) = √16 = 4.'
      },
      {
        id: 'srq2-6',
        questionTypeBadge: 'Hányados Összevonása',
        question: 'Számítsd ki a √75 / √3 tört pontos értékét!',
        options: [
          '5',
          '25',
          '√25 / 3',
          '15'
        ],
        correctAnswer: 0,
        hint: '√(a) / √(b) = √(a / b). 75 / 3 = 25.',
        explanation: '√75 / √3 = √(75 / 3) = √25 = 5.'
      },
      {
        id: 'srq2-7',
        questionTypeBadge: 'Egynemű Tagok Összevonása',
        question: 'Egyszerűsítsd az 5√3 + 2√3 - √3 kifejezést!',
        options: [
          '6√3',
          '7√3',
          '6',
          '6√9'
        ],
        correctAnswer: 0,
        hint: 'A √3 úgy viselkedik, mint egy algebrai változó (pl. x): 5x + 2x - x = 6x.',
        explanation: '(5 + 2 - 1) · √3 = 6√3.'
      },
      {
        id: 'srq2-8',
        questionTypeBadge: 'Nevező Gyöktelenítése',
        question: 'Hogyan írható fel a 6 / √3 tört gyöktelenített nevezővel?',
        figure: <FactoringAndDenomSvg size={170} />,
        options: [
          '2√3',
          '6√3',
          '√3 / 2',
          '3√3'
        ],
        correctAnswer: 0,
        hint: 'Bővítsd a törtet √3-mal: (6 · √3) / (√3 · √3).',
        explanation: '(6 · √3) / (√3 · √3) = 6√3 / 3 = 2√3.'
      },
      {
        id: 'srq2-9',
        questionTypeBadge: 'Nevező Gyöktelenítése',
        question: 'Gyöktelenítsd a 10 / √5 tört nevezőjét!',
        options: [
          '2√5',
          '5√5',
          '10√5',
          '√5 / 2'
        ],
        correctAnswer: 0,
        hint: 'Bővíts √5-tel: (10√5) / 5.',
        explanation: '(10 · √5) / (√5 · √5) = 10√5 / 5 = 2√5.'
      },
      {
        id: 'srq2-10',
        questionTypeBadge: 'Zárójel Felbontása Gyökökkel',
        question: 'Mennyi a √2 · (√8 + √18) kifejezés értéke?',
        options: [
          '10',
          '√52',
          '14',
          '5√2'
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel a zárójelet: √2 · √8 + √2 · √18 = √16 + √36.',
        explanation: '√2 · √8 + √2 · √18 = √16 + √36 = 4 + 6 = 10.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi Feladatok és Összetett Kifejezések (Haladó)',
    subtitle: 'Összetett törtek, nevezetes azonosságok, Pitagorasz-tétel és gyökös egyenletek.',
    range: '21 - 30. feladat',
    focus: 'Érettségi és Versenyfeladatok',
    questions: [
      {
        id: 'srq3-1',
        questionTypeBadge: 'Kiemelés és Egyszerűsítés',
        question: 'Számítsd ki a (√12 + √27) / √3 tört pontos értékét!',
        options: [
          '5',
          '√13',
          '6',
          '4'
        ],
        correctAnswer: 0,
        hint: '√12 = 2√3 és √27 = 3√3.',
        explanation: '√12 = √(4 · 3) = 2√3. √27 = √(9 · 3) = 3√3. A számláló: 2√3 + 3√3 = 5√3. Ezt √3-mal osztva pontosan 5-öt kapunk.'
      },
      {
        id: 'srq3-2',
        questionTypeBadge: 'Két Tag Négyzete Gyökökkel',
        question: 'Fejtsd ki a (√5 + √2)² kifejezést a nevezetes azonosság segítségével!',
        options: [
          '7 + 2√10',
          '7 + √10',
          '7',
          '29'
        ],
        correctAnswer: 0,
        hint: '(a + b)² = a² + 2ab + b².',
        explanation: '(√5)² + 2 · √5 · √2 + (√2)² = 5 + 2√10 + 2 = 7 + 2√10.'
      },
      {
        id: 'srq3-3',
        questionTypeBadge: 'Összeg és Különbség Szorzata',
        question: 'Mennyi a (√7 - √3) · (√7 + √3) szorzat pontos értéke?',
        options: [
          '4',
          '10',
          '4 - 2√21',
          '√40'
        ],
        correctAnswer: 0,
        hint: '(a - b)(a + b) = a² - b².',
        explanation: '(√7)² - (√3)² = 7 - 3 = 4.'
      },
      {
        id: 'srq3-4',
        questionTypeBadge: 'Pitagorasz-tétel Átfogója',
        question: 'Egy derékszögű háromszög két befogója a = √5 és b = √11. Mekkora az átfogója (c)?',
        figure: <SquareRootGeometrySvg size={170} />,
        options: [
          '4',
          '16',
          '√6',
          '√55'
        ],
        correctAnswer: 0,
        hint: 'c² = a² + b² = (√5)² + (√11)²',
        explanation: 'c² = 5 + 11 = 16, amiből c = √16 = 4.'
      },
      {
        id: 'srq3-5',
        questionTypeBadge: 'Változós Kifejezés Gyöke',
        question: 'Mivel egyenlő a √(a⁶) kifejezés, ha a tetszőleges valós szám?',
        options: [
          '|a³|',
          'a³',
          'a¹²',
          '3a'
        ],
        correctAnswer: 0,
        hint: '√(x²) = |x|, így √( (a³)² ) = |a³|.',
        explanation: 'Mivel a⁶ = (a³)², a definíció szerint √((a³)²) = |a³|. Ha a negatív, az eredmény pozitív kell legyen!'
      },
      {
        id: 'srq3-6',
        questionTypeBadge: 'Teljes Négyzet Gyöke',
        question: 'Egyszerűsítsd a √(x² - 6x + 9) kifejezést!',
        options: [
          '|x - 3|',
          'x - 3',
          'x + 3',
          '|x + 3|'
        ],
        correctAnswer: 0,
        hint: 'x² - 6x + 9 = (x - 3)². Alkalmazd a √(A²) = |A| szabályt!',
        explanation: '√(x² - 6x + 9) = √((x - 3)²) = |x - 3|.'
      },
      {
        id: 'srq3-7',
        questionTypeBadge: 'Összetett Nevező Gyöktelenítése',
        question: 'Gyöktelenítsd a 4 / (√5 - 1) tört nevezőjét!',
        options: [
          '√5 + 1',
          '4(√5 - 1)',
          '√5 - 1',
          '2√5 + 2'
        ],
        correctAnswer: 0,
        hint: 'Bővíts a nevező konjugáltjával: (√5 + 1). (√5 - 1)(√5 + 1) = 5 - 1 = 4.',
        explanation: '[4(√5 + 1)] / [(√5 - 1)(√5 + 1)] = [4(√5 + 1)] / (5 - 1) = [4(√5 + 1)] / 4 = √5 + 1.'
      },
      {
        id: 'srq3-8',
        questionTypeBadge: 'Gyökös Számok Összehasonlítása',
        question: 'Melyik a nagyobb: 3√2 vagy 2√5 ?',
        options: [
          '2√5 a nagyobb (mert √20 > √18)',
          '3√2 a nagyobb (mert √18 > √20)',
          'Pontosan egyenlők',
          'Nem összehasonlítható'
        ],
        correctAnswer: 0,
        hint: 'Vidd be a szorzókat a gyökjel alá: 3√2 = √18 és 2√5 = √20.',
        explanation: '3√2 = √(9 · 2) = √18. 2√5 = √(4 · 5) = √20. Mivel 20 > 18, így √20 > √18, tehát 2√5 a nagyobb.'
      },
      {
        id: 'srq3-9',
        questionTypeBadge: 'Többtényezős Szorzat',
        question: 'Számítsd ki a √2 · √3 · √6 kifejezés pontos értékét!',
        options: [
          '6',
          '12',
          '√11',
          '36'
        ],
        correctAnswer: 0,
        hint: '√2 · √3 = √6, és √6 · √6 = (√6)² = 6.',
        explanation: '√2 · √3 · √6 = √(2 · 3 · 6) = √36 = 6.'
      },
      {
        id: 'srq3-10',
        questionTypeBadge: 'Gyökös Egyenlet',
        question: 'Oldd meg a √(2x + 1) = 5 egyenletet a valós számok halmazán!',
        options: [
          'x = 12',
          'x = 2',
          'x = 24',
          'x = 13'
        ],
        correctAnswer: 0,
        hint: 'Emeld mindkét oldalt négyzetre: 2x + 1 = 25.',
        explanation: 'Négyzetre emelve: 2x + 1 = 25 ➔ 2x = 24 ➔ x = 12. Ellenőrzés: √(2·12 + 1) = √25 = 5 (helyes!).'
      }
    ]
  }
};

export const SquareRootQuiz: React.FC<SquareRootQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Gyakorló Kvíz – A Négyzetgyök Mesterfokon"
      subtitle="30 válogatott feladat 3 szinten: definíció, azonosságok, kiemelés a gyökjel alól, nevező gyöktelenítése és érettségi alkalmazások."
      topicId="g9-szamok-negyzetgyok-quiz"
      topicTitle="A Négyzetgyök"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
      cheatSheetCards={[
        <CheatSheetCard
          key="cs-def"
          title="Négyzetgyök Definíció & |x|"
          badge="Alapok"
          badgeColor="blue"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>√a ≥ 0</strong> és <strong>a ≥ 0</strong> (kikötés!)</p>
            <p>• <strong>(√a)² = a</strong> (ha a ≥ 0)</p>
            <p className="font-mono text-rose-600 dark:text-rose-400 font-bold">• √(x²) = |x| (mindig nemnegatív!)</p>
            <p>• √(-a) <strong>nem létezik</strong> ℝ-ben!</p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-ident"
          title="Azonosságok Szorzásra és Osztásra"
          badge="Azonosságok"
          badgeColor="indigo"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>√(a · b) = √a · √b</strong></p>
            <p>• <strong>√(a / b) = √a / √b</strong></p>
            <p className="text-rose-600 font-bold">• √(a + b) ≠ √a + √b ! (NINCS azonosság összegre!)</p>
            <p>• √(9 + 16) = √25 = 5 (nem 3 + 4 = 7!)</p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-methods"
          title="Kiemelés &amp; Gyöktelenítés"
          badge="Műveletek"
          badgeColor="purple"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>Kiemelés:</strong> √72 = √(36 · 2) = <strong>6√2</strong></p>
            <p>• <strong>Bevitel:</strong> 3√5 = √(9 · 5) = <strong>√45</strong></p>
            <p>• <strong>Gyöktelenítés:</strong> 6 / √3 = 6√3 / 3 = <strong>2√3</strong></p>
            <p>• <strong>Konjugált:</strong> 4 / (√5 - 1) = √5 + 1</p>
          </div>
        </CheatSheetCard>
      ]}
      gameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a gyökkifejezéseket a pontos értékükkel és legegyszerűbb alakjukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SquareRootMatcher
              key={`sqroot-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kifejezéseket értelmezhetőség, azonosságtípus és műveleti fogások szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SquareRootSorter
              key={`sqroot-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default SquareRootQuiz;
