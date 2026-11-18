import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count20ExamG2Matcher } from './Count20ExamG2Matcher';
import { Count20ExamG2Sorter } from './Count20ExamG2Sorter';
import {
  QFig,
  TensOnes20,
  TwentyFrame,
  NumLine20,
  PyramidFig,
  RadialWheelFig,
  DiceTrioFig,
  CardsRowFig,
  ArrowChainFig,
  CompareBarsFig,
  MagicTriangleFig,
  PixelGridFig,
  INK,
  SUB,
  UNK,
} from './Count20ExamG2Parts';

export const COUNT20_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT (30 kérdés: q1–q30) — Alapok, helyiérték, 10-es és egyszerű 20-as
  // =========================================================================
  {
    id: 'g2c20ex-q1',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számot raktuk ki tízesrúddal és egyeskockákkal?',
    figure: (
      <QFig h={92}>
        <TensOnes20 x={74} y={14} tens={1} ones={6} />
      </QFig>
    ),
    options: ['16', '6', '7', '15'],
    correctAnswer: 0,
    explanation: '1 tízesrúd = 10, és 6 egyeskocka = 6. Együtt: 10 + 6 = 16.',
  },
  {
    id: 'g2c20ex-q2',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Melyik szám van betűvel leírva: tizennyolc?',
    options: ['18', '8', '19', '17'],
    correctAnswer: 0,
    explanation: 'A tizennyolc 1 tízesből és 8 egyesből áll: 18.',
  },
  {
    id: 'g2c20ex-q3',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám helyére mutat a piros kérdőjel a számegyenesen?',
    figure: (
      <QFig h={90}>
        <NumLine20 from={0} to={20} labelEvery={5} marks={[{ v: 13, label: '?' }]} y={54} />
      </QFig>
    ),
    options: ['13', '12', '14', '8'],
    correctAnswer: 0,
    explanation: 'A 10-től 3 osztást lépünk jobbra: 11, 12, 13.',
  },
  {
    id: 'g2c20ex-q4',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Hány egyeskocka ér pontosan annyit, mint 2 tízesrúd?',
    figure: (
      <QFig h={92}>
        <TensOnes20 x={92} y={14} tens={2} ones={0} />
      </QFig>
    ),
    options: ['20', '12', '10', '2'],
    correctAnswer: 0,
    explanation: '1 tízesrúd = 10 egyes, tehát 2 tízesrúd = 20 egyeskocka.',
  },
  {
    id: 'g2c20ex-q5',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    question: 'Melyik szám áll a 16 és a 18 között a számegyenesen?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['16', '?', '18']} y={22} />
      </QFig>
    ),
    options: ['17', '15', '19', '16'],
    correctAnswer: 0,
    explanation: 'A 16 nagyobb szomszédja és a 18 kisebb szomszédja a 17.',
  },
  {
    id: 'g2c20ex-q6',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    question: 'Mi a 10 kisebb egyes szomszédja?',
    options: ['9', '11', '8', '0'],
    correctAnswer: 0,
    explanation: 'A 10-nél 1-gyel kisebb szám a 9.',
  },
  {
    id: 'g2c20ex-q7',
    level: 1,
    questionTypeBadge: 'Számcsoportok',
    question: 'Melyik kártyán van KÉTJEGYŰ PÁROS szám?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['6', '13', '14', '19']} y={22} />
      </QFig>
    ),
    options: ['14', '6', '13', '19'],
    correctAnswer: 0,
    explanation: 'A 14 kétjegyű és 4-re végződik, tehát páros. A 6 egyjegyű, a 13 és a 19 páratlan.',
  },
  {
    id: 'g2c20ex-q8',
    level: 1,
    questionTypeBadge: 'Számcsoportok',
    question: 'Melyik szám kakukktojás? A többi mind páros!',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['2', '8', '11', '16', '20']} y={22} color="#7c3aed" />
      </QFig>
    ),
    options: ['11', '2', '8', '20'],
    correctAnswer: 0,
    explanation: 'A 2, 8, 16 és 20 mind páros. A 11 páratlan, ezért ő a kakukktojás.',
  },
  {
    id: 'g2c20ex-q9',
    level: 1,
    questionTypeBadge: 'Sorszámok',
    question: 'A képen sorban állnak a bábuk balról jobbra. Hányadik a piros bábu?',
    figure: (
      <QFig h={84}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const cx = 32 + i * 29;
          const isRed = i === 4;
          return (
            <g key={i}>
              <circle cx={cx} cy={38} r="10" fill={isRed ? '#ef4444' : '#cbd5e1'} stroke="#334155" strokeWidth="1.4" />
              <text x={cx} y={64} textAnchor="middle" fontSize="10" fontWeight="bold" fill={SUB}>
                {i + 1}.
              </text>
            </g>
          );
        })}
      </QFig>
    ),
    options: ['5.', '4.', '6.', '3.'],
    correctAnswer: 0,
    explanation: 'Balról számolva: 1., 2., 3., 4., 5. – tehát a piros bábu az 5. helyen áll.',
  },
  {
    id: 'g2c20ex-q10',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel illik a négyzetbe? 15 □ 12',
    options: ['>', '<', '=', '+'],
    correctAnswer: 0,
    explanation: 'A 15 nagyobb, mint a 12, ezért 15 > 12.',
  },
  {
    id: 'g2c20ex-q11',
    level: 1,
    questionTypeBadge: 'Pótlás 10-re',
    question: 'Mennyi kék korong hiányzik még, hogy pontosan 10 legyen a felső sorban?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={6} b={0} cell={19} />
      </QFig>
    ),
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'A felső sorban 10 hely van. 6 piros korong már ott van, így 10 − 6 = 4 hely üres.',
  },
  {
    id: 'g2c20ex-q12',
    level: 1,
    questionTypeBadge: 'Összeadás 10-ig',
    question: 'Mennyi a két összeadás közös eredménye? 3 + 5 = □ és 5 + 3 = □',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: 'A tagok felcserélhetők: 3 + 5 = 8 és 5 + 3 = 8.',
  },
  {
    id: 'g2c20ex-q13',
    level: 1,
    questionTypeBadge: 'Összeadás 10-ig',
    question: 'Hány pötty van összesen a két dobókockán?',
    figure: (
      <QFig h={84}>
        <DiceTrioFig values={[4, 5]} y={20} s={44} />
      </QFig>
    ),
    options: ['9', '8', '10', '7'],
    correctAnswer: 0,
    explanation: 'Az első kockán 4, a másodikon 5 pötty van: 4 + 5 = 9.',
  },
  {
    id: 'g2c20ex-q14',
    level: 1,
    questionTypeBadge: 'Kivonás 10-ig',
    question: 'Mennyi korong maradt áthúzás nélkül? 9 − 4 = ?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={9} cross={4} cell={19} />
      </QFig>
    ),
    options: ['5', '4', '6', '13'],
    correctAnswer: 0,
    explanation: '9 korongból 4-et áthúztunk, 5 korong maradt. Ellenőrzés: 5 + 4 = 9.',
  },
  {
    id: 'g2c20ex-q15',
    level: 1,
    questionTypeBadge: 'Kivonás 10-ig',
    question: 'Mennyi a különbség? 8 − 8 = ?',
    options: ['0', '1', '8', '16'],
    correctAnswer: 0,
    explanation: 'Ha egy számból önmagát vonjuk ki, mindig 0 marad: 8 − 8 = 0.',
  },
  {
    id: 'g2c20ex-q16',
    level: 1,
    questionTypeBadge: 'Műveletcsalád',
    question: 'Ha tudod, hogy 4 + 6 = 10, akkor mennyi 10 − 6?',
    options: ['4', '6', '10', '16'],
    correctAnswer: 0,
    explanation: 'A 4, a 6 és a 10 egy műveletcsaládhoz tartozik: 10 − 6 = 4.',
  },
  {
    id: 'g2c20ex-q17',
    level: 1,
    questionTypeBadge: 'Összeadás 20-ig',
    question: 'Mennyi az összeg a 20-as kereten? 10 + 7 = ?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={10} b={7} cell={19} />
      </QFig>
    ),
    options: ['17', '16', '18', '7'],
    correctAnswer: 0,
    explanation: '10 piros és 7 kék korong összesen 17 korong.',
  },
  {
    id: 'g2c20ex-q18',
    level: 1,
    questionTypeBadge: 'Kivonás 20-ig',
    question: 'Mennyi korong maradt a 20-as kereten? 16 − 10 = ?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={16} cross={10} cell={19} />
      </QFig>
    ),
    options: ['6', '10', '16', '5'],
    correctAnswer: 0,
    explanation: '16-ból elvettünk 10-et, maradt 6 egyes: 16 − 10 = 6.',
  },
  {
    id: 'g2c20ex-q19',
    level: 1,
    questionTypeBadge: 'Összeadás 20-ig',
    question: 'Számolj a kis analógiával! 3 + 5 = 8, ezért 13 + 5 = ?',
    figure: (
      <QFig h={102}>
        <NumLine20
          from={10}
          to={20}
          labelEvery={2}
          arcs={[{ from: 13, to: 18, label: '+ 5', color: '#16a34a' }]}
          marks={[
            { v: 13, label: '13' },
            { v: 18, label: '?' },
          ]}
          y={54}
        />
      </QFig>
    ),
    options: ['18', '17', '19', '8'],
    correctAnswer: 0,
    explanation: 'A tízes marad (10), az egyesek összege 3 + 5 = 8, így 13 + 5 = 18.',
  },
  {
    id: 'g2c20ex-q20',
    level: 1,
    questionTypeBadge: 'Kivonás 20-ig',
    question: 'Használd a 9 − 4 = 5 segítséget! Mennyi 19 − 4?',
    figure: (
      <QFig h={102}>
        <NumLine20
          from={10}
          to={20}
          labelEvery={2}
          arcs={[{ from: 19, to: 15, label: '− 4', color: '#dc2626' }]}
          marks={[
            { v: 19, label: '19' },
            { v: 15, label: '?' },
          ]}
          y={54}
        />
      </QFig>
    ),
    options: ['15', '14', '16', '5'],
    correctAnswer: 0,
    explanation: 'Mivel 9 − 4 = 5, ezért 19 − 4 = 15.',
  },
  {
    id: 'g2c20ex-q21',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám van pontosan félúton 0 és 20 között?',
    figure: (
      <QFig h={88}>
        <NumLine20 from={0} to={20} labelEvery={5} marks={[{ v: 10, label: '?' }]} y={54} />
      </QFig>
    ),
    options: ['10', '5', '15', '12'],
    correctAnswer: 0,
    explanation: 'A 0-tól és a 20-tól is 10-10 lépésre van a 10.',
  },
  {
    id: 'g2c20ex-q22',
    level: 1,
    questionTypeBadge: 'Pótlás',
    question: 'Melyik szám hiányzik? □ + 6 = 9',
    options: ['3', '4', '2', '15'],
    correctAnswer: 0,
    explanation: '9 − 6 = 3, mert 3 + 6 = 9.',
  },
  {
    id: 'g2c20ex-q23',
    level: 1,
    questionTypeBadge: 'Három tag',
    question: 'Mennyi a három dobókocka pöttyeinek összege?',
    figure: (
      <QFig h={84}>
        <DiceTrioFig values={[2, 5, 3]} y={20} s={42} />
      </QFig>
    ),
    options: ['10', '9', '11', '8'],
    correctAnswer: 0,
    explanation: '2 + 5 = 7, és 7 + 3 = 10.',
  },
  {
    id: 'g2c20ex-q24',
    level: 1,
    questionTypeBadge: 'Sorrend',
    question: 'Melyik sorban vannak a számok NÖVEKVŐ sorrendben?',
    options: ['4, 9, 12, 18', '4, 12, 9, 18', '18, 12, 9, 4', '9, 4, 12, 18'],
    correctAnswer: 0,
    explanation: 'Növekvő sorrendben a legkisebbtől haladunk a legnagyobb felé: 4 < 9 < 12 < 18.',
  },
  {
    id: 'g2c20ex-q25',
    level: 1,
    questionTypeBadge: 'Számpiramis',
    question: 'A felső tégla az alatta lévő kettő összege. Mi kerül a csúcsba?',
    figure: (
      <QFig h={84}>
        <PyramidFig rows={[['?'], [4, 5]]} cx={120} y={16} bw={46} bh={24} />
      </QFig>
    ),
    options: ['9', '8', '10', '1'],
    correctAnswer: 0,
    explanation: '4 + 5 = 9.',
  },
  {
    id: 'g2c20ex-q26',
    level: 1,
    questionTypeBadge: 'Számpárkerék',
    question: 'A vonal két végén lévő számok összege 6. Mi hiányzik a piros körből?',
    figure: (
      <QFig h={116}>
        <RadialWheelFig center={6} pairs={[[1, 5], [2, '?'], [3, 3]]} cx={120} cy={58} R={40} />
      </QFig>
    ),
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: '2 + □ = 6, tehát 6 − 2 = 4 hiányzik.',
  },
  {
    id: 'g2c20ex-q27',
    level: 1,
    questionTypeBadge: 'Műveletlánc',
    question: 'Kövesd a nyilakat! Milyen szám kerül az utolsó körbe?',
    figure: (
      <QFig h={78}>
        <ArrowChainFig values={[11, 14, '?']} ops={['+ 3', '− 4']} y={44} />
      </QFig>
    ),
    options: ['10', '11', '18', '9'],
    correctAnswer: 0,
    explanation: '11 + 3 = 14, aztán 14 − 4 = 10.',
  },
  {
    id: 'g2c20ex-q28',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Bence 12 gesztenyét szedett, majd talált még 5-öt. Hány gesztenyéje lett?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['12', '+', '5', '=', '?']} y={22} color="#16a34a" />
      </QFig>
    ),
    options: ['17', '16', '7', '18'],
    correctAnswer: 0,
    explanation: '12 + 5 = 17 gesztenyéje lett.',
  },
  {
    id: 'g2c20ex-q29',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A tálon 15 pogácsa volt. A gyerekek megettek 4-et. Hány pogácsa maradt?',
    options: ['11', '19', '12', '10'],
    correctAnswer: 0,
    explanation: '15 − 4 = 11 pogácsa maradt.',
  },
  {
    id: 'g2c20ex-q30',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik művelet eredménye NEM 14?',
    options: ['19 − 4', '10 + 4', '17 − 3', '11 + 3'],
    correctAnswer: 0,
    explanation: '19 − 4 = 15, a többi mind 14 (10 + 4 = 14, 17 − 3 = 14, 11 + 3 = 14).',
  },

  // =========================================================================
  // 2. SZINT (30 kérdés: q31–q60) — Tízesátlépés, sorozatok, piramis, összehasonlítás
  // =========================================================================
  {
    id: 'g2c20ex-q31',
    level: 2,
    questionTypeBadge: 'Tízesátlépés +',
    question: 'Add össze a piros és kék korongokat a 20-as kereten! 8 + 5 = ?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={8} b={5} cell={19} />
      </QFig>
    ),
    options: ['13', '12', '14', '15'],
    correctAnswer: 0,
    explanation: 'Előbb pótold 10-re: 8 + 2 = 10, majd 10 + 3 = 13.',
  },
  {
    id: 'g2c20ex-q32',
    level: 2,
    questionTypeBadge: 'Tízesátlépés +',
    question: 'Kövesd a két ugrást a számegyenesen! Mennyi 7 + 6?',
    figure: (
      <QFig h={104}>
        <NumLine20
          from={0}
          to={20}
          labelEvery={5}
          arcs={[
            { from: 7, to: 10, label: '+ 3', color: '#0284c7' },
            { from: 10, to: 13, label: '+ 3', color: '#16a34a' },
          ]}
          marks={[
            { v: 7, label: '7' },
            { v: 13, label: '?' },
          ]}
          y={56}
        />
      </QFig>
    ),
    options: ['13', '12', '14', '16'],
    correctAnswer: 0,
    explanation: '7 + 3 = 10, és 10 + 3 = 13.',
  },
  {
    id: 'g2c20ex-q33',
    level: 2,
    questionTypeBadge: 'Tízesátlépés −',
    question: 'Vond ki két lépésben! 14 − 6 = ?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={14} cross={6} cell={19} />
      </QFig>
    ),
    options: ['8', '7', '9', '10'],
    correctAnswer: 0,
    explanation: 'Előbb 14 − 4 = 10, aztán 10 − 2 = 8. Ellenőrzés: 8 + 6 = 14.',
  },
  {
    id: 'g2c20ex-q34',
    level: 2,
    questionTypeBadge: 'Tízesátlépés −',
    question: 'Nézd meg a visszafelé ugrásokat! Hova érkezel? 15 − 7 = ?',
    figure: (
      <QFig h={104}>
        <NumLine20
          from={0}
          to={20}
          labelEvery={5}
          arcs={[
            { from: 15, to: 10, label: '− 5', color: '#dc2626' },
            { from: 10, to: 8, label: '− 2', color: '#ea580c' },
          ]}
          marks={[
            { v: 15, label: '15' },
            { v: 8, label: '?' },
          ]}
          y={56}
        />
      </QFig>
    ),
    options: ['8', '7', '9', '12'],
    correctAnswer: 0,
    explanation: '15 − 5 = 10, és 10 − 2 = 8.',
  },
  {
    id: 'g2c20ex-q35',
    level: 2,
    questionTypeBadge: 'Kétjegyű kivonás',
    question: 'Mennyi 17 − 13?',
    figure: (
      <QFig h={104}>
        <NumLine20
          from={0}
          to={20}
          labelEvery={5}
          arcs={[
            { from: 17, to: 7, label: '− 10', color: '#dc2626' },
            { from: 7, to: 4, label: '− 3', color: '#ea580c' },
          ]}
          marks={[
            { v: 17, label: '17' },
            { v: 4, label: '?' },
          ]}
          y={56}
        />
      </QFig>
    ),
    options: ['4', '5', '14', '3'],
    correctAnswer: 0,
    explanation: 'Előbb vedd el a 10-est: 17 − 10 = 7, aztán az egyeseket: 7 − 3 = 4.',
  },
  {
    id: 'g2c20ex-q36',
    level: 2,
    questionTypeBadge: 'Kétjegyű kivonás',
    question: 'Számold ki: 16 − 14 = ?',
    options: ['2', '4', '12', '3'],
    correctAnswer: 0,
    explanation: '16 − 10 = 6, és 6 − 4 = 2. Ellenőrzés: 14 + 2 = 16.',
  },
  {
    id: 'g2c20ex-q37',
    level: 2,
    questionTypeBadge: 'Számkitaláló',
    question: 'Melyik szám van a 8 + 9 eredményénél 5-tel kisebb helyen?',
    options: ['12', '17', '13', '11'],
    correctAnswer: 0,
    explanation: '8 + 9 = 17, és 17 − 5 = 12.',
  },
  {
    id: 'g2c20ex-q38',
    level: 2,
    questionTypeBadge: 'Számkitaláló',
    question: 'Melyik szám a 18 − 5 nagyobb egyes szomszédja?',
    options: ['14', '12', '13', '15'],
    correctAnswer: 0,
    explanation: '18 − 5 = 13. A 13 nagyobb egyes szomszédja a 14.',
  },
  {
    id: 'g2c20ex-q39',
    level: 2,
    questionTypeBadge: 'Számkitaláló',
    question: 'Melyik szám a 7 + 7 kisebb egyes szomszédja?',
    options: ['13', '14', '15', '12'],
    correctAnswer: 0,
    explanation: '7 + 7 = 14. A 14 kisebb egyes szomszédja a 13.',
  },
  {
    id: 'g2c20ex-q40',
    level: 2,
    questionTypeBadge: 'Három dobókocka',
    question: 'Mennyi a három dobókocka pöttyeinek összege?',
    figure: (
      <QFig h={84}>
        <DiceTrioFig values={[6, 5, 4]} y={20} s={42} />
      </QFig>
    ),
    options: ['15', '14', '16', '13'],
    correctAnswer: 0,
    explanation: '6 + 4 = 10, és 10 + 5 = 15.',
  },
  {
    id: 'g2c20ex-q41',
    level: 2,
    questionTypeBadge: 'Három dobókocka',
    question: 'A három kockán összesen 14 pötty van. Hány pötty van a kérdőjeles kockán?',
    figure: (
      <QFig h={84}>
        <DiceTrioFig values={[5, 6, '?']} y={20} s={42} />
      </QFig>
    ),
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: '5 + 6 = 11 pötty látszik. 14 − 11 = 3 pötty van a harmadik kockán.',
  },
  {
    id: 'g2c20ex-q42',
    level: 2,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a sorozatot a szabály alapján! Melyik szám hiányzik?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['2', '5', '8', '11', '?', '17']} y={22} color="#0284c7" />
      </QFig>
    ),
    options: ['14', '13', '15', '12'],
    correctAnswer: 0,
    explanation: 'A szabály + 3: 11 + 3 = 14, és 14 + 3 = 17.',
  },
  {
    id: 'g2c20ex-q43',
    level: 2,
    questionTypeBadge: 'Sorozat',
    question: 'Csökkenő sorozatot látsz. Melyik szám kerül a kérdőjel helyére?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['20', '16', '12', '?', '4']} y={22} color="#d97706" />
      </QFig>
    ),
    options: ['8', '9', '6', '10'],
    correctAnswer: 0,
    explanation: 'A szabály − 4: 12 − 4 = 8, és 8 − 4 = 4.',
  },
  {
    id: 'g2c20ex-q44',
    level: 2,
    questionTypeBadge: 'Számpiramis',
    question: 'Minden felső tégla az alatta lévő kettő összege. Mi hiányzik a csúcsból?',
    figure: (
      <QFig h={102}>
        <PyramidFig rows={[['?'], [7, 8], [3, 4, 4]]} cx={120} y={12} bw={40} bh={23} />
      </QFig>
    ),
    options: ['15', '14', '16', '11'],
    correctAnswer: 0,
    explanation: '7 + 8 = 15.',
  },
  {
    id: 'g2c20ex-q45',
    level: 2,
    questionTypeBadge: 'Számpiramis',
    question: 'Pótold a hiányzó téglát a piramisban!',
    figure: (
      <QFig h={102}>
        <PyramidFig rows={[[16], [9, '?'], [4, 5, 2]]} cx={120} y={12} bw={40} bh={23} palette="sky" />
      </QFig>
    ),
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'Az alatta lévő két számból: 5 + 2 = 7 (és 9 + 7 = 16).',
  },
  {
    id: 'g2c20ex-q46',
    level: 2,
    questionTypeBadge: 'Pótlás',
    question: 'Melyik szám hiányzik? 7 + □ = 15',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '7 + 3 = 10, és 10 + 5 = 15, tehát 3 + 5 = 8 hiányzik.',
  },
  {
    id: 'g2c20ex-q47',
    level: 2,
    questionTypeBadge: 'Pótlás',
    question: 'Melyik szám volt a kérdőjel helyén? □ − 6 = 8',
    options: ['14', '2', '13', '15'],
    correctAnswer: 0,
    explanation: 'Ellenőrizzük összeadással: 8 + 6 = 14.',
  },
  {
    id: 'g2c20ex-q48',
    level: 2,
    questionTypeBadge: 'Pótlás',
    question: 'Mennyit vettünk el? 17 − □ = 9',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '17 − 7 = 10, és még 1-et kell elvenni a 9-hez: 7 + 1 = 8.',
  },
  {
    id: 'g2c20ex-q49',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel illik középre? 9 + 6 □ 19 − 5',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['9 + 6', '?', '19 − 5']} y={22} color="#7c3aed" />
      </QFig>
    ),
    options: ['>', '<', '=', '−'],
    correctAnswer: 0,
    explanation: '9 + 6 = 15, míg 19 − 5 = 14. Mivel 15 > 14, a helyes jel: >.',
  },
  {
    id: 'g2c20ex-q50',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik művelet eredménye EGYENLŐ a 8 + 7 összegével?',
    options: ['20 − 5', '19 − 5', '9 + 7', '18 − 4'],
    correctAnswer: 0,
    explanation: '8 + 7 = 15, és 20 − 5 = 15 is.',
  },
  {
    id: 'g2c20ex-q51',
    level: 2,
    questionTypeBadge: 'Hányadik?',
    question: 'A 4×5-ös csokoládétáblában hányadik sor 3. kockája van jelölve?',
    figure: (
      <QFig h={104}>
        <PixelGridFig
          grid={[
            ['#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0'],
            ['#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0'],
            ['#e2e8f0', '#e2e8f0', '#f59e0b', '#e2e8f0', '#e2e8f0'],
            ['#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0', '#e2e8f0'],
          ]}
          x={74}
          y={16}
          cell={18}
        />
      </QFig>
    ),
    options: ['3. sor', '2. sor', '4. sor', '1. sor'],
    correctAnswer: 0,
    explanation: 'Fentről számolva az 1., 2., 3. sor 3. kockája van besárgítva.',
  },
  {
    id: 'g2c20ex-q52',
    level: 2,
    questionTypeBadge: 'Műveletlánc',
    question: 'Mi kerül a kérdőjel helyére a lánc végén?',
    figure: (
      <QFig h={78}>
        <ArrowChainFig values={[9, 17, 10, '?']} ops={['+ 8', '− 7', '+ 5']} y={44} />
      </QFig>
    ),
    options: ['15', '14', '16', '12'],
    correctAnswer: 0,
    explanation: '9 + 8 = 17, 17 − 7 = 10, 10 + 5 = 15.',
  },
  {
    id: 'g2c20ex-q53',
    level: 2,
    questionTypeBadge: 'Számpárkerék',
    question: 'Minden vonal két végének összege 12. Mi kerül a kérdőjel helyére?',
    figure: (
      <QFig h={118}>
        <RadialWheelFig center={12} pairs={[[2, 10], [4, 8], [5, '?'], [6, 6]]} cx={120} cy={59} R={41} />
      </QFig>
    ),
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: '5 + □ = 12, tehát 12 − 5 = 7.',
  },
  {
    id: 'g2c20ex-q54',
    level: 2,
    questionTypeBadge: 'Társasjáték',
    question: 'Nóra a 8-as mezőn áll, és 6-ot dob a dobókockával. Hányas mezőre lép?',
    figure: (
      <QFig h={102}>
        <NumLine20
          from={6}
          to={16}
          labelEvery={1}
          arcs={[{ from: 8, to: 14, label: '+ 6', color: '#16a34a' }]}
          marks={[
            { v: 8, label: '8' },
            { v: 14, label: '?' },
          ]}
          y={54}
        />
      </QFig>
    ),
    options: ['14', '13', '15', '12'],
    correctAnswer: 0,
    explanation: '8 + 6 = 8 + 2 + 4 = 14. A 14-es mezőre lép.',
  },
  {
    id: 'g2c20ex-q55',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Peti 8 könyvjelzőt készített, Lilla 5-tel többet. Hány könyvjelzőt készített Lilla?',
    figure: (
      <QFig h={104}>
        <CompareBarsFig
          topLabel="Peti"
          topVal={8}
          topText="8"
          botLabel="Lilla"
          botVal={13}
          botText="?"
          diffText="Lilla 5-tel több"
          y={14}
        />
      </QFig>
    ),
    options: ['13', '3', '12', '14'],
    correctAnswer: 0,
    explanation: 'Lilla készített 5-tel többet: 8 + 5 = 13.',
  },
  {
    id: 'g2c20ex-q56',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A polcon 20 könyvnek van hely. Már 11 könyv áll rajta. Hány könyv fér még oda?',
    options: ['9', '8', '10', '11'],
    correctAnswer: 0,
    explanation: '20 − 11 = 20 − 10 − 1 = 9 könyv fér még oda.',
  },
  {
    id: 'g2c20ex-q57',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'Melyik 4 számkártya összege pontosan 17?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['2', '4', '5', '6', '8']} y={22} color="#16a34a" />
      </QFig>
    ),
    options: ['2 + 4 + 5 + 6', '2 + 4 + 5 + 8', '4 + 5 + 6 + 8', '2 + 5 + 6 + 8'],
    correctAnswer: 0,
    explanation: '2 + 4 = 6, 6 + 5 = 11, és 11 + 6 = 17.',
  },
  {
    id: 'g2c20ex-q58',
    level: 2,
    questionTypeBadge: 'Számcsoportok',
    question: 'Melyik szám egyjegyű páratlan, és nagyobb, mint 6?',
    options: ['7', '5', '8', '11'],
    correctAnswer: 0,
    explanation: 'A 6-nál nagyobb egyjegyű páratlan számok a 7 és a 9; a felsoroltak közül a 7.',
  },
  {
    id: 'g2c20ex-q59',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám tehető a □ helyére? 14 − 5 = 6 + □',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['14 − 5', '=', '6 + □']} y={22} color="#0284c7" />
      </QFig>
    ),
    options: ['3', '4', '2', '9'],
    correctAnswer: 0,
    explanation: '14 − 5 = 9. Tehát 6 + □ = 9, így □ = 3.',
  },
  {
    id: 'g2c20ex-q60',
    level: 2,
    questionTypeBadge: 'Kitekintő',
    question: 'Hány színezett kis négyzetből áll ez a kis lépcső?',
    figure: (
      <QFig h={96}>
        <PixelGridFig
          grid={[
            ['', '', '', '#38bdf8'],
            ['', '', '#38bdf8', '#38bdf8'],
            ['', '#38bdf8', '#38bdf8', '#38bdf8'],
            ['#38bdf8', '#38bdf8', '#38bdf8', '#38bdf8'],
          ]}
          x={84}
          y={14}
          cell={17}
        />
      </QFig>
    ),
    options: ['10', '9', '11', '12'],
    correctAnswer: 0,
    explanation: 'Soronként fentről lefelé: 1 + 2 + 3 + 4 = 10 kis négyzet.',
  },

  // =========================================================================
  // 3. SZINT (30 kérdés: q61–q90) — Összetett feladatok, 4 soros piramis, csapdák, Kitekintő
  // =========================================================================
  {
    id: 'g2c20ex-q61',
    level: 3,
    questionTypeBadge: '4 soros piramis',
    question: 'A felső tégla mindig az alatta lévő kettő összege. Mi kerül a legfelső téglába?',
    figure: (
      <QFig h={118}>
        <PyramidFig
          rows={[['?'], ['?', '?'], ['?', '?', '?'], [1, 2, 3, 2]]}
          cx={120}
          y={10}
          bw={36}
          bh={22}
        />
      </QFig>
    ),
    options: ['18', '17', '16', '19'],
    correctAnswer: 0,
    explanation: 'Második sor alulról: 3, 5, 5. Harmadik sor: 8, 10. Csúcs: 8 + 10 = 18.',
  },
  {
    id: 'g2c20ex-q62',
    level: 3,
    questionTypeBadge: '4 soros piramis',
    question: 'Pótold a legalsó sor hiányzó tégláját! Melyik szám kerül a kérdőjel helyére?',
    figure: (
      <QFig h={118}>
        <PyramidFig
          rows={[[20], [9, 11], [4, 5, 6], [1, 3, '?', 4]]}
          cx={120}
          y={10}
          bw={36}
          bh={22}
          palette="sky"
        />
      </QFig>
    ),
    options: ['2', '3', '4', '1'],
    correctAnswer: 0,
    explanation: 'A felette lévő két szám a 5 és a 6: 3 + □ = 5 és □ + 4 = 6, tehát □ = 2.',
  },
  {
    id: 'g2c20ex-q63',
    level: 3,
    questionTypeBadge: '4 soros piramis',
    question: 'Egy négyemeletes számpiramis alsó sorában balról jobbra ezek a számok állnak: 1, 3, 2, 3. Mi kerül a csúcsba?',
    options: ['19', '18', '20', '17'],
    correctAnswer: 0,
    explanation: 'Második sor: 4, 5, 5. Harmadik sor: 9, 10. A csúcs: 9 + 10 = 19.',
  },
  {
    id: 'g2c20ex-q64',
    level: 3,
    questionTypeBadge: 'Szöveges csapda',
    question: 'Sára 14 matricát ragasztott a füzetébe, 6-tal többet, mint Bence. Hány matricája van Bencének?',
    figure: (
      <QFig h={104}>
        <CompareBarsFig
          topLabel="Sára"
          topVal={14}
          topText="14"
          botLabel="Bence"
          botVal={8}
          botText="?"
          diffText="Sára 6-tal több"
          y={14}
        />
      </QFig>
    ),
    options: ['8', '20', '7', '9'],
    correctAnswer: 0,
    explanation: 'Ha Sárának 6-tal több van, akkor Bencének 6-tal kevesebb: 14 − 6 = 8.',
  },
  {
    id: 'g2c20ex-q65',
    level: 3,
    questionTypeBadge: 'Szöveges csapda',
    question: 'Misi 9 éves, és 4 évvel fiatalabb, mint a nővére, Dóri. Hány éves Dóri?',
    figure: (
      <QFig h={104}>
        <CompareBarsFig
          topLabel="Dóri"
          topVal={13}
          topText="?"
          botLabel="Misi"
          botVal={9}
          botText="9"
          diffText="Misi 4-gyel kevesebb"
          y={14}
        />
      </QFig>
    ),
    options: ['13', '5', '12', '14'],
    correctAnswer: 0,
    explanation: 'Ha Misi 4 évvel fiatalabb, akkor Dóri 4 évvel idősebb: 9 + 4 = 13 éves.',
  },
  {
    id: 'g2c20ex-q66',
    level: 3,
    questionTypeBadge: 'Kétlépéses feladat',
    question: 'A játszótéren 12 lány játszik. A lányok 4-gyel többen vannak, mint a fiúk. Hány gyerek játszik összesen?',
    options: ['20', '16', '8', '18'],
    correctAnswer: 0,
    explanation: 'Előbb a fiúk száma: 12 − 4 = 8. Összesen: 12 + 8 = 20 gyerek.',
  },
  {
    id: 'g2c20ex-q67',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'Hány különböző számpárt tudsz alkotni 0-tól 6-ig úgy, hogy az összegük 6 legyen? (A sorrend nem számít: 1 + 5 és 5 + 1 ugyanaz a pár.)',
    figure: (
      <QFig h={118}>
        <RadialWheelFig center={6} pairs={[[0, 6], [1, 5], [2, 4], [3, 3]]} cx={120} cy={59} R={41} />
      </QFig>
    ),
    options: ['4', '3', '6', '7'],
    correctAnswer: 0,
    explanation: 'A 4 különböző pár: 0 + 6, 1 + 5, 2 + 4 és 3 + 3.',
  },
  {
    id: 'g2c20ex-q68',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'Hány különböző számpár összege pontosan 12 a 0-tól 12-ig terjedő számokból? (A sorrend nem számít!)',
    figure: (
      <QFig h={132}>
        <RadialWheelFig
          center={12}
          pairs={[
            [0, 12],
            [1, 11],
            [2, 10],
            [3, 9],
            [4, 8],
            [5, 7],
            [6, 6],
          ]}
          cx={120}
          cy={66}
          R={47}
        />
      </QFig>
    ),
    options: ['7', '6', '12', '13'],
    correctAnswer: 0,
    explanation: 'A 7 különböző pár: 0+12, 1+11, 2+10, 3+9, 4+8, 5+7 és 6+6.',
  },
  {
    id: 'g2c20ex-q69',
    level: 3,
    questionTypeBadge: 'Bűvös háromszög',
    question: 'A háromszög minden oldalán lévő három szám összege 12. Mi kerül a kérdőjel helyére?',
    figure: (
      <QFig h={108}>
        <MagicTriangleFig nodes={[4, 3, 2, 5, '?', 6]} target={12} cx={94} y={18} />
      </QFig>
    ),
    options: ['1', '2', '3', '7'],
    correctAnswer: 0,
    explanation: 'Az alsó oldalon: 5 + ? + 6 = 12. Mivel 5 + 6 = 11, a kérdőjel helyére 1 kerül.',
  },
  {
    id: 'g2c20ex-q70',
    level: 3,
    questionTypeBadge: 'Bűvös háromszög',
    question: 'A háromszög minden oldalán a számok összege 17. Melyik szám hiányzik a bal oldal közepéről?',
    figure: (
      <QFig h={108}>
        <MagicTriangleFig nodes={[7, '?', 4, 8, 3, 6]} target={17} cx={94} y={18} />
      </QFig>
    ),
    options: ['2', '3', '4', '5'],
    correctAnswer: 0,
    explanation: 'A bal oldalon: 7 + ? + 8 = 17. Mivel 7 + 8 = 15, 17 − 15 = 2 hiányzik.',
  },
  {
    id: 'g2c20ex-q71',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Számolj visszafelé a lánc végéről! Milyen számból indultunk?',
    figure: (
      <QFig h={78}>
        <ArrowChainFig values={['?', 13, 8, 15]} ops={['+ 6', '− 5', '+ 7']} y={44} />
      </QFig>
    ),
    options: ['7', '19', '6', '8'],
    correctAnswer: 0,
    explanation: 'Az első lépés: ? + 6 = 13, tehát 13 − 6 = 7-ből indultunk.',
  },
  {
    id: 'g2c20ex-q72',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Két szabály váltakozik: + 4, aztán − 2. Melyik szám kerül a kérdőjel helyére?',
    figure: (
      <QFig h={78}>
        <ArrowChainFig values={[5, 9, 7, 11, '?']} ops={['+ 4', '− 2', '+ 4', '− 2']} y={44} />
      </QFig>
    ),
    options: ['9', '15', '13', '7'],
    correctAnswer: 0,
    explanation: 'A 11 után − 2 következik: 11 − 2 = 9.',
  },
  {
    id: 'g2c20ex-q73',
    level: 3,
    questionTypeBadge: 'Számolási mód',
    question: 'Hanna a 16 − 13 kivonást így számolta: 16 − 6 − 7 = 3. Miért vont le előbb pont 6-ot?',
    options: [
      'Mert így előbb megérkezett a 10-hez (16 − 6 = 10)',
      'Mert a 13 nagyobb, mint a 16',
      'Mert 6 + 7 = 14',
      'Mert előbb mindig 6-ot kell kivonni',
    ],
    correctAnswer: 0,
    explanation: '16 − 6 = 10, és 10-ből már könnyű elvenni a maradék 7-et: 10 − 7 = 3.',
  },
  {
    id: 'g2c20ex-q74',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'Hánnyal több KÉK négyzet van ezen a négyzetrácson, mint SÁRGA?',
    figure: (
      <QFig h={96}>
        <PixelGridFig
          grid={[
            ['#38bdf8', '#38bdf8', '#fbbf24', '#fbbf24'],
            ['#38bdf8', '#38bdf8', '#38bdf8', '#fbbf24'],
            ['#38bdf8', '#38bdf8', '#fbbf24', ''],
            ['#38bdf8', '#38bdf8', '#fbbf24', ''],
          ]}
          x={86}
          y={14}
          cell={17}
        />
      </QFig>
    ),
    options: ['4', '5', '9', '14'],
    correctAnswer: 0,
    explanation: '9 kék négyzet és 5 sárga négyzet van: 9 − 5 = 4-gyel több a kék.',
  },
  {
    id: 'g2c20ex-q75',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    question: 'Gergő a 7-es mezőn áll. 4-et dob, majd az új mezőn ez az utasítás áll: „Lépj előre 6-ot!” Hányas mezőre jut végül?',
    figure: (
      <QFig h={104}>
        <NumLine20
          from={5}
          to={20}
          labelEvery={5}
          arcs={[
            { from: 7, to: 11, label: '+ 4', color: '#0284c7' },
            { from: 11, to: 17, label: '+ 6', color: '#16a34a' },
          ]}
          marks={[
            { v: 7, label: '7' },
            { v: 11, label: '11' },
            { v: 17, label: '?' },
          ]}
          y={56}
        />
      </QFig>
    ),
    options: ['17', '11', '13', '18'],
    correctAnswer: 0,
    explanation: 'Előbb 7 + 4 = 11, aztán a jutalomlépéssel: 11 + 6 = 17.',
  },
  {
    id: 'g2c20ex-q76',
    level: 3,
    questionTypeBadge: 'Társasjáték',
    question: 'Dóri 5-öt dobott a társasjátékban, és így a 19-es mezőre lépett. Hányas mezőn állt előtte?',
    options: ['14', '15', '20', '13'],
    correctAnswer: 0,
    explanation: 'Visszaszámolunk 5-öt: 19 − 5 = 14.',
  },
  {
    id: 'g2c20ex-q77',
    level: 3,
    questionTypeBadge: 'Kétoldalú egyenlet',
    question: 'Melyik szám tehető a négyzetbe? 12 + 5 = 20 − □',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: '12 + 5 = 17. Hogy 20 − □ is 17 legyen, □ = 20 − 17 = 3.',
  },
  {
    id: 'g2c20ex-q78',
    level: 3,
    questionTypeBadge: 'Kétoldalú egyenlet',
    question: 'Melyik szám hiányzik? 18 − 6 = □ + 7',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: '18 − 6 = 12. Mennyi kell a 7-hez, hogy 12 legyen? 12 − 7 = 5.',
  },
  {
    id: 'g2c20ex-q79',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Hány különböző szám (0-tól 20-ig) írható a □ helyére, hogy igaz legyen: □ + 4 < 8?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['□', '+', '4', '<', '8']} y={22} color="#dc2626" />
      </QFig>
    ),
    options: ['4', '3', '5', '8'],
    correctAnswer: 0,
    explanation: 'A 0 + 4 = 4, 1 + 4 = 5, 2 + 4 = 6, 3 + 4 = 7 mind kisebb 8-nál. Ez 4 szám (0, 1, 2, 3).',
  },
  {
    id: 'g2c20ex-q80',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Mi a LEGNAGYOBB szám, amely a □ helyére írható? 15 − 7 > □ + 2',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: '15 − 7 = 8. A 8-nál kisebb számok közül a legnagyobb a 7, tehát □ + 2 legfeljebb 7: □ = 5.',
  },
  {
    id: 'g2c20ex-q81',
    level: 3,
    questionTypeBadge: 'Tízesátlépés +',
    question: 'A 6 + 9 összeadást két részletben számoljuk: 6 + 4 + □. Mi kerül a □ helyére?',
    figure: (
      <QFig h={88}>
        <TwentyFrame x={16} y={20} a={6} b={9} cell={19} />
      </QFig>
    ),
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'A 9-et 4 + 5-re bontjuk, mert 6 + 4 = 10, és 10 + 5 = 15.',
  },
  {
    id: 'g2c20ex-q82',
    level: 3,
    questionTypeBadge: 'Kétlépéses feladat',
    question: 'A buszon 14 utas ült. A megállóban leszállt 6 utas, és felszállt 9 új utas. Hány utas utazik most a buszon?',
    options: ['17', '11', '15', '19'],
    correctAnswer: 0,
    explanation: '14 − 6 = 8 utas maradt, majd a felszállók után: 8 + 9 = 17 utas.',
  },
  {
    id: 'g2c20ex-q83',
    level: 3,
    questionTypeBadge: 'Kétlépéses feladat',
    question: 'Zsombor 11 palacsintát sütött, Hanna 4-gyel kevesebbet. Hány palacsintát sütöttek együtt?',
    figure: (
      <QFig h={104}>
        <CompareBarsFig
          topLabel="Zsombor"
          topVal={11}
          topText="11"
          botLabel="Hanna"
          botVal={7}
          botText="?"
          diffText="Hanna 4-gyel kevesebb"
          y={14}
        />
      </QFig>
    ),
    options: ['18', '7', '15', '19'],
    correctAnswer: 0,
    explanation: 'Hanna: 11 − 4 = 7 palacsinta. Együtt: 11 + 7 = 18 palacsinta.',
  },
  {
    id: 'g2c20ex-q84',
    level: 3,
    questionTypeBadge: 'Logikai feladat',
    question: 'A játékládában 20 játék van: 6 kisautó, a többi pedig ugyanannyi építőkocka és bábu. Hány építőkocka van a ládában?',
    options: ['7', '14', '6', '8'],
    correctAnswer: 0,
    explanation: '20 − 6 = 14 építőkocka és bábu együtt. Mivel ugyanannyi van mindkettőből: 7 + 7 = 14, tehát 7 építőkocka.',
  },
  {
    id: 'g2c20ex-q85',
    level: 3,
    questionTypeBadge: 'Válogatás',
    question: 'A fogason 18 sapka van: 8 piros, a többi kék vagy zöld. A kék sapkából több van, mint a zöldből. Mennyi lehet a kék és a zöld sapka?',
    figure: (
      <QFig h={74}>
        <CardsRowFig cards={['8 piros', '+', 'kék', '+', 'zöld = 18']} y={22} color="#0284c7" />
      </QFig>
    ),
    options: ['6 kék és 4 zöld', '5 kék és 5 zöld', '4 kék és 6 zöld', '7 kék és 4 zöld'],
    correctAnswer: 0,
    explanation: '18 − 8 = 10 sapka a kék és zöld együtt. 6 + 4 = 10, és 6 > 4.',
  },
  {
    id: 'g2c20ex-q86',
    level: 3,
    questionTypeBadge: 'Számkitaláló',
    question: 'Melyik számra gondoltam? Nagyobb, mint 7 + 8, és kisebb, mint 20 − 3.',
    figure: (
      <QFig h={88}>
        <NumLine20
          from={12}
          to={20}
          labelEvery={1}
          marks={[
            { v: 15, label: '7+8' },
            { v: 16, label: '?' },
            { v: 17, label: '20−3' },
          ]}
          y={58}
        />
      </QFig>
    ),
    options: ['16', '15', '17', '14'],
    correctAnswer: 0,
    explanation: '7 + 8 = 15 és 20 − 3 = 17. A 15 és 17 között egyetlen egész szám van: a 16.',
  },
  {
    id: 'g2c20ex-q87',
    level: 3,
    questionTypeBadge: 'Három dobókocka',
    question: 'Három dobókockán összesen 17 pötty van. Az egyiken 5, a másik kettőn egyforma számú pötty látszik. Hány pötty van egy-egy kérdőjeles kockán?',
    figure: (
      <QFig h={84}>
        <DiceTrioFig values={[5, '?', '?']} y={20} s={42} />
      </QFig>
    ),
    options: ['6', '5', '4', '3'],
    correctAnswer: 0,
    explanation: '17 − 5 = 12 pötty van a két egyforma kockán együtt. Mivel 6 + 6 = 12, mindkettőn 6 pötty van.',
  },
  {
    id: 'g2c20ex-q88',
    level: 3,
    questionTypeBadge: 'Sorozat',
    question: 'Két szabály váltja egymást: + 5, majd − 2. A sorozat eleje: 4, 9, 7, 12. Mi lesz a következő szám?',
    options: ['10', '17', '8', '14'],
    correctAnswer: 0,
    explanation: '4 + 5 = 9, 9 − 2 = 7, 7 + 5 = 12, most − 2 következik: 12 − 2 = 10.',
  },
  {
    id: 'g2c20ex-q89',
    level: 3,
    questionTypeBadge: 'Helyiérték',
    question: 'A képen látható számból elveszünk 7-et. Mennyi marad?',
    figure: (
      <QFig h={92}>
        <TensOnes20 x={76} y={14} tens={1} ones={5} />
      </QFig>
    ),
    options: ['8', '7', '9', '12'],
    correctAnswer: 0,
    explanation: 'A képen 1 tízes és 5 egyes látható, vagyis 15. 15 − 7 = 8.',
  },
  {
    id: 'g2c20ex-q90',
    level: 3,
    questionTypeBadge: '4 soros piramis',
    question: 'Pótold a hiányzó téglát a négyemeletes számpiramisban!',
    figure: (
      <QFig h={118}>
        <PyramidFig
          rows={[[20], [11, 9], [6, 5, '?'], [4, 2, 3, 1]]}
          cx={120}
          y={10}
          bw={36}
          bh={22}
          palette="violet"
        />
      </QFig>
    ),
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: 'Az alatta lévő két tégla 3 és 1, tehát 3 + 1 = 4 (és 5 + 4 = 9).',
  },
];

export const Count20ExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-tudasproba-quiz"
      subtopicId="megallo"
      title="7. Megálló – tudáspróba"
      subtitle="90 feladat 3 szinten: számok 0-tól 20-ig, műveletek tízesátlépéssel és anélkül, számpiramis, Kitekintő és szöveges feladatok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TUDÁSPRÓBA"
      questions={COUNT20_EXAM_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok 0-tól 20-ig',
          items: [
            '10 egyes = 1 tízes • 20 egyes = 2 tízes',
            'Egyes szomszédok: 14 szomszédai a 13 és a 15',
            'Páros szám végén: 0, 2, 4, 6, 8 (a 0 is páros!)',
            'Páratlan szám végén: 1, 3, 5, 7, 9',
          ],
        },
        {
          title: 'Tízesátlépés és ellenőrzés',
          items: [
            'Összeadás: előbb pótold 10-re! 8 + 5 = 8 + 2 + 3 = 13',
            'Kivonás: előbb menj vissza 10-re! 14 − 6 = 14 − 4 − 2 = 8',
            'Kétjegyű − kétjegyű: 16 − 12 = 16 − 10 − 2 = 4',
            'A kivonást mindig ellenőrizd összeadással!',
          ],
        },
        {
          title: 'Piramis, Kitekintő és szöveges',
          items: [
            'Számpiramis: a felső tégla az alatta lévő kettő összege',
            'Kérdezd meg: kinek van kevesebb? A „több” néha kivonást jelent!',
            'Nyitott mondatban ellenőrizd a 0-t is!',
            'Számpárkeréknél az 5 + 7 és a 7 + 5 ugyanaz a pár',
          ],
        },
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count20ExamG2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Count20ExamG2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Count20ExamG2Quiz;

