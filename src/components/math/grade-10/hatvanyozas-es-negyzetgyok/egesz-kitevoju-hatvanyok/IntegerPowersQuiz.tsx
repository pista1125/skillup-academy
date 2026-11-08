import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { IntegerPowersMatcher } from './IntegerPowersMatcher';
import { IntegerPowersSorter } from './IntegerPowersSorter';
import {
  PermanenceZeroPowerSvg,
  NegativePowerDefinitionSvg,
  PowersOfTenSvg,
  NegativeExponentTrapsSvg
} from './IntegerPowersFigures';

interface IntegerPowersQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A nulla kitevő és a permanencia-elv',
    description: 'Bármely nullától különböző valós szám 0. hatványa 1: a⁰ = 1 (a ≠ 0). Levezetés: aⁿ / aⁿ = aⁿ⁻ⁿ = a⁰ = 1.',
    note: 'Súlyos hiba: 0⁰ a matematikában NEM ÉRTELMEZETT (határozatlan alak)!',
    color: 'from-indigo-500 to-purple-600',
    figure: <PermanenceZeroPowerSvg size={180} />
  },
  {
    title: 'A negatív egész kitevő definíciója és reciprok',
    description: 'a⁻ⁿ = 1 / aⁿ = (1/a)ⁿ (a ≠ 0, n ∈ ℤ⁺). A negatív kitevő az alap reciprokára való emelést jelent pozitív kitevővel.',
    note: 'Törtek reciprok szabálya: (a/b)⁻ⁿ = (b/a)ⁿ. Pl. (⅔)⁻¹ = 3/2 = 1,5; (¾)⁻² = 16/9.',
    color: 'from-sky-500 to-blue-600',
    figure: <NegativePowerDefinitionSvg size={180} />
  },
  {
    title: 'A 10 negatív hatványai és tizedestörtek',
    description: '10⁻¹ = 0,1 (tized), 10⁻² = 0,01 (század), 10⁻³ = 0,001 (ezred, milli-), 10⁻⁶ (mikro-), 10⁻⁹ (nano-).',
    note: 'Helyiértékes alak: 509,8 = 5·10² + 9·10⁰ + 8·10⁻¹.',
    color: 'from-emerald-500 to-teal-600',
    figure: <PowersOfTenSvg size={180} />
  },
  {
    title: 'A 4 leggyakoribb érettségi csapda',
    description: '1. 2⁻³ = 1/8 > 0 (a negatív kitevő NEM tesz negatívvá!). 2. -2⁻⁴ = -(1/16) (zárójel hiánya!). 3. 0⁻³ NEM értelmezett (1/0).',
    note: 'Gyakori hiba: (-2)⁻⁴ = +1/16 (páros kitevő), de (-2)⁻³ = -1/8 (páratlan kitevő)!',
    color: 'from-rose-500 to-amber-600',
    figure: <NegativeExponentTrapsSvg size={180} />
  }
];

const quizLevels: Record<1 | 2 | 3, QuizLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak, nulla és negatív kitevők',
    subtitle: '10 feladat a nulla és negatív egész kitevő alapdefiníciójának és értékének begyakorlására',
    questions: [
      {
        id: 'ipq1-1',
        question: 'Mennyi 5⁰ pontos értéke?',
        options: ['1', '0', '5', 'Nem értelmezett'],
        correctAnswer: 0,
        explanation: 'Bármely nullától különböző valós szám nulladik hatványa a permanencia-elv alapján 1: 5⁰ = 1.'
      },
      {
        id: 'ipq1-3',
        question: 'Mennyi 2⁻³ pontos értéke?',
        options: ['1/8', '-8', '-6', '1/6'],
        correctAnswer: 0,
        explanation: '2⁻³ = 1 / 2³ = 1 / (2 · 2 · 2) = 1/8. A negatív kitevő nem teszi negatívvá a számot!'
      },
      {
        id: 'ipq1-4',
        question: 'Mennyi 3⁻² pontos értéke?',
        options: ['1/9', '-9', '-6', '1/6'],
        correctAnswer: 0,
        explanation: '3⁻² = 1 / 3² = 1 / 9.'
      },
      {
        id: 'ipq1-6',
        question: 'Mennyi 10⁻² értéke tizedestörtként?',
        options: ['0,01', '0,1', '0,001', '-0,02'],
        correctAnswer: 0,
        explanation: '10⁻² = 1 / 10² = 1 / 100 = 0,01 (egy század).'
      },
      {
        id: 'ipq1-7',
        question: 'Mennyi (-3)⁰ értéke?',
        options: ['1', '-1', '0', '-3'],
        correctAnswer: 0,
        explanation: 'Mivel a negatív alap zárójelben van, és (-3) ≠ 0, ezért (-3)⁰ = 1.'
      },
      {
        id: 'ipq1-8',
        question: 'Mennyi -3⁰ értéke?',
        options: ['-1', '1', '0', '-3'],
        correctAnswer: 0,
        explanation: 'A kitevő csak a 3-ra vonatkozik, a mínuszjel előtte áll: -3⁰ = -(3⁰) = -1.'
      },
      {
        id: 'ipq1-11',
        question: 'Hogyan hangzik az a⁻ⁿ definíciója (ha a ≠ 0 és n pozitív egész)?',
        options: ['1 / aⁿ', '-aⁿ', '-(1 / aⁿ)', 'a · (-n)'],
        correctAnswer: 0,
        explanation: 'A definíció: a⁻ⁿ = 1 / aⁿ = (1/a)ⁿ.'
      },
      {
        id: 'ipq1-12',
        question: 'Mennyi 0⁰ értéke a matematikában?',
        options: ['Nem értelmezett', '1', '0', 'Bármilyen szám lehet'],
        correctAnswer: 0,
        explanation: 'A 0⁰ a matematikában határozatlan alak, nincs értelmezve a nullával való osztás (0/0) ellentmondása miatt.'
      },
      {
        id: 'ipq1-16',
        question: 'Mennyi (½)⁻¹ értéke?',
        options: ['2', '1/2', '-2', '-1/2'],
        correctAnswer: 0,
        explanation: '(½)⁻¹ az 1/2 reciprokának 1. hatványa: 2/1 = 2.'
      },
      {
        id: 'ipq1-17',
        question: 'Mennyi (⅓)⁻² értéke?',
        options: ['9', '1/9', '-9', '6'],
        correctAnswer: 0,
        explanation: '(⅓)⁻² = (3/1)² = 3² = 9.'
      }
    ]
  },
  2: {
    title: '2. Szint: Törtek negatív hatványai, műveletek és előjelek',
    subtitle: '10 feladat a reciprok szabály, előjelszabályok és azonosságok alkalmazására',
    questions: [
      {
        id: 'ipq2-1',
        question: 'Mennyi (⅔)⁻¹ pontos értéke?',
        options: ['3/2 = 1,5', '-2/3', '2/3', '-3/2'],
        correctAnswer: 0,
        explanation: 'A reciprok szabály szerint (a/b)⁻¹ = b/a, tehát (⅔)⁻¹ = 3/2 = 1,5.'
      },
      {
        id: 'ipq2-2',
        question: 'Mennyi (⅔)⁻² pontos értéke törtként?',
        options: ['9/4 = 2,25', '4/9', '-9/4', '-4/9'],
        correctAnswer: 0,
        explanation: '(⅔)⁻² = (3/2)² = 3² / 2² = 9/4 = 2,25.'
      },
      {
        id: 'ipq2-3',
        question: 'Mennyi (-2)⁻⁴ értéke?',
        options: ['+1/16', '-1/16', '+16', '-16'],
        correctAnswer: 0,
        explanation: '(-2)⁻⁴ = 1 / (-2)⁴ = 1 / (+16) = +1/16, mert a páros kitevő a negatív alapból pozitív értéket képez.'
      },
      {
        id: 'ipq2-4',
        question: 'Mennyi -2⁻⁴ értéke?',
        options: ['-1/16', '+1/16', '-16', '+16'],
        correctAnswer: 0,
        explanation: 'Nincs zárójel, így a hatványozás megelőzi az előjelet: -2⁻⁴ = -(2⁻⁴) = -(1/16) = -1/16.'
      },
      {
        id: 'ipq2-7',
        question: 'Végezd el a műveletet: 2³ · 2⁻⁵!',
        options: ['1/4 (2⁻²)', '4', '1/16', '256'],
        correctAnswer: 0,
        explanation: 'Azonos alapúak szorzásakor a kitevők összeadódnak: 2³⁺⁽⁻⁵⁾ = 2⁻² = 1/2² = 1/4.'
      },
      {
        id: 'ipq2-8',
        question: 'Végezd el az osztást: 3⁻⁴ : 3⁻²!',
        options: ['1/9 (3⁻²)', '9', '1/81', '1/27'],
        correctAnswer: 0,
        explanation: 'Azonos alapúak osztásakor a kitevők kivonódnak: 3⁻⁴⁻⁽⁻²⁾ = 3⁻⁴⁺² = 3⁻² = 1/9.'
      },
      {
        id: 'ipq2-9',
        question: 'Mennyi (2⁻²)⁻³ értéke?',
        options: ['64 (2⁶)', '1/64', '-64', '32'],
        correctAnswer: 0,
        explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: 2⁽⁻²⁾·⁽⁻³⁾ = 2⁶ = 64.'
      },
      {
        id: 'ipq2-10',
        question: 'Mennyi (0,5)⁻³ értéke?',
        options: ['8', '0,125', '-8', '4'],
        correctAnswer: 0,
        explanation: 'Mivel 0,5 = 1/2, ezért (0,5)⁻³ = (½)⁻³ = 2³ = 8.'
      },
      {
        id: 'ipq2-12',
        question: 'Melyik szám a nagyobb: 2⁻³ vagy 2⁻⁴?',
        options: ['2⁻³, mert 1/8 > 1/16', '2⁻⁴, mert a kitevő abszolút értéke nagyobb', 'Egyenlők', 'Nem hasonlíthatóak össze'],
        correctAnswer: 0,
        explanation: '2⁻³ = 1/8 = 0,125, míg 2⁻⁴ = 1/16 = 0,0625. Mivel 1/8 > 1/16, ezért 2⁻³ a nagyobb.'
      },
      {
        id: 'ipq2-26',
        question: 'Mennyi (½)⁻² + (⅓)⁻² értéke?',
        options: ['13', '25', '5', '1/13'],
        correctAnswer: 0,
        explanation: '(½)⁻² = 2² = 4, és (⅓)⁻² = 3² = 9. Összegük: 4 + 9 = 13.'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett kifejezések, mértékegységek és érettségi típusfeladatok',
    subtitle: '10 haladó szintű feladat algebrai törtekkel, prímhatványokkal és gyakorlati számításokkal',
    questions: [
      {
        id: 'ipq3-1',
        question: 'Számítsd ki: (25⁻¹ · 8⁻⁴) / (5³ · 2⁻⁷)!',
        options: ['10⁻⁵ = 0,00001', '10⁻⁶', '10⁻⁴', '0,001'],
        correctAnswer: 0,
        explanation: '25⁻¹ = 5⁻², 8⁻⁴ = (2³)⁻⁴ = 2⁻¹². Számláló: 5⁻² · 2⁻¹². Nevező: 5³ · 2⁻⁷. Hányados: 5⁻²⁻³ · 2⁻¹²⁻⁽⁻⁷⁾ = 5⁻⁵ · 2⁻⁵ = (5 · 2)⁻⁵ = 10⁻⁵ = 0,00001.'
      },
      {
        id: 'ipq3-3',
        question: 'Hányadik hatványa 2-nek az 1/64?',
        options: ['-6', '-5', '6', '-7'],
        correctAnswer: 0,
        explanation: '64 = 2⁶, ezért 1/64 = 1 / 2⁶ = 2⁻⁶.'
      },
      {
        id: 'ipq3-5',
        question: 'Egyszerűsítsd: ((2x)⁵)² : ((2x)⁵)⁻² (ahol x ≠ 0)!',
        options: ['(2x)²⁰', '(2x)¹⁰', '1', '(2x)⁰'],
        correctAnswer: 0,
        explanation: '((2x)⁵)² = (2x)¹⁰ és ((2x)⁵)⁻² = (2x)⁻¹⁰. Hányadosuk: (2x)¹⁰⁻⁽⁻¹⁰⁾ = (2x)²⁰.'
      },
      {
        id: 'ipq3-6',
        question: 'Egy négyzet oldalának hossza 2⁻⁶ mm. Mennyi a négyzet területe 2 hatványaként (mm²-ben)?',
        options: ['2⁻¹²', '2⁻⁸', '2⁻³⁶', '2⁻²⁴'],
        correctAnswer: 0,
        explanation: 'Terület = a² = (2⁻⁶)² = 2⁻⁶·² = 2⁻¹² mm².'
      },
      {
        id: 'ipq3-12',
        question: 'Adott A = 3a⁻⁴b² és B = a³b⁻⁴. Mennyi A · B legegyszerűbb alakja?',
        options: ['3 / (ab²)', '3a⁷b⁻²', '3a⁻⁷b⁶', '3ab²'],
        correctAnswer: 0,
        explanation: 'A · B = 3 · a⁻⁴⁺³ · b²⁺⁽⁻⁴⁾ = 3a⁻¹b⁻² = 3 / (ab²).'
      },
      {
        id: 'ipq3-13',
        question: 'Adott A = 3a⁻⁴b² és B = a³b⁻⁴. Mennyi B : A értéke negatív kitevő nélkül?',
        options: ['a⁷ / (3b⁶)', '3a⁷ / b⁶', 'a⁻⁷ / (3b⁶)', 'b⁶ / (3a⁷)'],
        correctAnswer: 0,
        explanation: 'B / A = (a³b⁻⁴) / (3a⁻⁴b²) = (1/3) · a³⁻⁽⁻⁴⁾ · b⁻⁴⁻² = (1/3) a⁷ b⁻⁶ = a⁷ / (3b⁶).'
      },
      {
        id: 'ipq3-14',
        question: 'Számítsd ki: 0,001⁵ · 0,1³ a 10 egész kitevőjű hatványaként!',
        options: ['10⁻¹⁸', '10⁻¹⁵', '10⁻⁸', '10⁻²⁴'],
        correctAnswer: 0,
        explanation: '0,001 = 10⁻³ ⟹ (10⁻³)⁵ = 10⁻¹⁵. 0,1³ = (10⁻¹)³ = 10⁻³. Szorzatuk: 10⁻¹⁵⁺⁽⁻³⁾ = 10⁻¹⁸.'
      },
      {
        id: 'ipq3-21',
        question: 'Mennyi [(3/2)⁻²]⁻³ : (3/2)⁴ értéke?',
        options: ['9/4 = 2,25', '4/9', '81/16', '1'],
        correctAnswer: 0,
        explanation: '[(3/2)⁻²]⁻³ = (3/2)⁶. Osztva (3/2)⁴-nel: (3/2)⁶⁻⁴ = (3/2)² = 9/4 = 2,25.'
      },
      {
        id: 'ipq3-26',
        question: 'Egyszerűsítsd: (x⁻² - y⁻²) / (x⁻¹ - y⁻¹) (ahol x ≠ y, xy ≠ 0)!',
        options: ['(x + y) / (xy)', 'x - y', '1 / (x - y)', 'xy / (x + y)'],
        correctAnswer: 0,
        explanation: 'Alkalmazzuk az a² - b² = (a-b)(a+b) azonosságot a számlálóra: (x⁻¹ - y⁻¹)(x⁻¹ + y⁻¹). A nevezővel egyszerűsítve marad x⁻¹ + y⁻¹ = 1/x + 1/y = (y + x) / (xy).'
      },
      {
        id: 'ipq3-29',
        question: 'Mennyi (3⁻¹ + 6⁻¹)⁻¹ értéke?',
        options: ['2', '1/2', '9', '3/2'],
        correctAnswer: 0,
        explanation: '3⁻¹ = 1/3 = 2/6, 6⁻¹ = 1/6. Összegük: 2/6 + 1/6 = 3/6 = 1/2. Ennek a -1. hatványa (reciproka): (1/2)⁻¹ = 2.'
      }
    ]
  }
};

export const IntegerPowersQuiz: React.FC<IntegerPowersQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hatvanyozas-negyzetgyok"
      topicTitle="2. Egész kitevőjű hatványok"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      matcherComponent={
        <IntegerPowersMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <IntegerPowersSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

