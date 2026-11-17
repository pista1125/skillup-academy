import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RectAreaG3Matcher } from './RectAreaG3Matcher';
import { RectAreaG3Sorter } from './RectAreaG3Sorter';
import { QFig, RectGrid, SideLabel, Pieces, shapePolys, splitHalves, rectCells, S, INK, UNK } from './RectAreaG3Parts';
import { UnitTag, PalName } from '../a-terulet-merese/AreaG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Egy téglalap kis négyzetekből, középre igazítva. */
const RFig: React.FC<{
  rows: number;
  cols: number;
  s?: number;
  pal?: PalName;
  mode?: 'full' | 'partial' | 'empty';
  top?: string;
  left?: string;
  note?: string;
  noteColor?: string;
  cellFill?: (r: number, c: number) => string | undefined;
}> = ({ rows, cols, s: sIn = 20, pal = 'green', mode = 'full', top, left, note, noteColor, cellFill }) => {
  const s = Math.min(sIn, 180 / cols, 130 / rows);
  const y0 = top ? 30 : 14;
  const h = y0 + rows * s + (note ? 32 : 14);
  const x0 = (240 - cols * s) / 2 + (left ? 14 : 0);
  return (
    <QFig h={h}>
      {top && <SideLabel x1={x0} y1={y0 - 8} x2={x0 + cols * s} y2={y0 - 8} text={top} />}
      {left && <SideLabel x1={x0 - 8} y1={y0} x2={x0 - 8} y2={y0 + rows * s} text={left} side="left" />}
      <RectGrid rows={rows} cols={cols} x={x0} y={y0} s={s} pal={pal} mode={mode} cellFill={cellFill} />
      {note && (
        <text x="120" y={h - 11} textAnchor="middle" fontSize="12" fontWeight="bold" fill={noteColor ?? INK}>
          {note}
        </text>
      )}
    </QFig>
  );
};

/** Több téglalap egymás mellett, betűjellel. */
const MultiFig: React.FC<{ items: { rows: number; cols: number; label: string; pal: PalName }[]; s?: number; h?: number }> = ({ items, s = 11, h = 80 }) => {
  const gap = 16;
  const total = items.reduce((a, it) => a + it.cols * s, 0) + gap * (items.length - 1);
  let x = (240 - total) / 2;
  return (
    <QFig h={h}>
      {items.map((it, i) => {
        const gx = x;
        x += it.cols * s + gap;
        return (
          <g key={i}>
            <text x={gx} y="22" fontSize="12" fontWeight="bold" fill={INK}>
              {it.label}
            </text>
            <RectGrid rows={it.rows} cols={it.cols} x={gx} y={28} s={s} pal={it.pal} />
          </g>
        );
      })}
    </QFig>
  );
};

const dom = (c: number, r: number) =>
  [
    [c, r],
    [c + 2, r],
    [c + 2, r + 1],
    [c, r + 1]
  ] as [number, number][];
const big = (c: number, r: number) =>
  [
    [c, r],
    [c + 2, r],
    [c + 2, r + 2],
    [c, r + 2]
  ] as [number, number][];

/** Terasz és egy járólap mintája; a terasz üres rács. */
const TerraceFig: React.FC<{ rows: number; cols: number; tile: 'dom' | 'big' }> = ({ rows, cols, tile }) => {
  const s = Math.min(18, 128 / cols, 110 / rows);
  const x0 = 102;
  const y0 = 22;
  return (
    <QFig h={y0 + rows * s + 18}>
      <text x="14" y="34" fontSize="11" fontWeight="bold" fill="#334155">
        Járólap:
      </text>
      <Pieces polys={[tile === 'dom' ? dom(0, 0) : big(0, 0)]} x={22} y={44} s={s} pal="orange" inner={1.2} outline={2.2} />
      <RectGrid rows={rows} cols={cols} x={x0} y={y0} s={s} pal="yellow" mode="empty" />
      <text x={x0 + (cols * s) / 2} y={y0 + (rows * s) / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

export const RECT_AREA_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------------------------------------------ 1. szint
  {
    id: 'ra-q1',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <RFig rows={3} cols={4} pal="blue" />,
    question: 'Hány kis négyzet fedi le a téglalapot?',
    options: ['12', '7', '14', '10'],
    correctAnswer: 0,
    explanation: '3 sor van, mindegyikben 4 kis négyzet. 4 + 4 + 4 = 12, vagyis 3 · 4 = 12.'
  },
  {
    id: 'ra-q2',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <RFig rows={3} cols={3} pal="purple" />,
    question: 'Hány kis négyzet fedi le a négyzetet?',
    options: ['9', '6', '12', '3'],
    correctAnswer: 0,
    explanation: '3 sor, mindegyikben 3 kis négyzet: 3 · 3 = 9.'
  },
  {
    id: 'ra-q3',
    level: 1,
    questionTypeBadge: 'Soronként',
    figure: <RFig rows={2} cols={5} pal="orange" top="egy sorban 5" left="2 sor" />,
    question: 'Egy sorban 5 kis négyzet van, és 2 sor van. Mekkora a terület?',
    options: ['10', '7', '25', '12'],
    correctAnswer: 0,
    explanation: '2 sor, mindegyikben 5: 5 + 5 = 10, vagyis 2 · 5 = 10 kis négyzet.'
  },
  {
    id: 'ra-q4',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: <RFig rows={4} cols={6} pal="green" />,
    question: 'Melyik szorzás adja meg a téglalap területét?',
    options: ['4 · 6', '4 + 6', '4 · 4', '6 · 6'],
    correctAnswer: 0,
    explanation: '4 sor van, és egy sorban 6 kis négyzet. Ezért 4 · 6 = 24. Nem összeadunk, hanem szorzunk!'
  },
  {
    id: 'ra-q5',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <RFig rows={2} cols={7} pal="teal" />,
    question: 'Hány kis négyzet fedi le a téglalapot?',
    options: ['14', '9', '18', '16'],
    correctAnswer: 0,
    explanation: '2 sor, mindegyikben 7: 7 + 7 = 14, vagyis 2 · 7 = 14.'
  },
  {
    id: 'ra-q6',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <RFig rows={2} cols={2} s={30} pal="red" />,
    question: 'Ennek a négyzetnek 2 kis négyzet hosszú az oldala. Hány kis négyzetből áll?',
    options: ['4', '2', '8', '6'],
    correctAnswer: 0,
    explanation: '2 sor, mindegyikben 2: 2 · 2 = 4 kis négyzet.'
  },
  {
    id: 'ra-q7',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <RFig rows={1} cols={8} pal="yellow" />,
    question: 'Hány kis négyzet fedi le a csíkot?',
    options: ['8', '9', '16', '18'],
    correctAnswer: 0,
    explanation: '1 sor van, benne 8 kis négyzet: 1 · 8 = 8.'
  },
  {
    id: 'ra-q8',
    level: 1,
    questionTypeBadge: 'Gondold hozzá!',
    figure: <RFig rows={3} cols={6} pal="orange" mode="partial" />,
    question: 'Az első sort és az első oszlopot már lefedtük. Hány lap fedi le az egész téglalapot?',
    options: ['18', '8', '9', '12'],
    correctAnswer: 0,
    explanation: 'Egy sorban 6 lap fér el, és 3 sor van. 3 · 6 = 18. Most csak 8 lap van kirakva, de a többi helyét is be kell fedni!'
  },
  {
    id: 'ra-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <MultiFig
        items={[
          { rows: 2, cols: 3, label: 'A', pal: 'blue' },
          { rows: 2, cols: 4, label: 'B', pal: 'pink' },
          { rows: 3, cols: 3, label: 'C', pal: 'orange' },
          { rows: 1, cols: 5, label: 'D', pal: 'green' }
        ]}
      />
    ),
    question: 'Melyik téglalap területe 6 kis négyzet?',
    options: ['Az A-é', 'A B-é', 'A C-é', 'A D-é'],
    correctAnswer: 0,
    explanation: 'A: 2 · 3 = 6. B: 2 · 4 = 8. C: 3 · 3 = 9. D: 1 · 5 = 5. Az A területe 6.'
  },
  {
    id: 'ra-q10',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Hogyan számolod ki gyorsan a téglalap területét?',
    options: [
      'Megszorzom a sorok számát az egy sorban lévő négyzetek számával',
      'Összeadom a sorok és az egy sorban lévő négyzetek számát',
      'Csak a szélső négyzeteket számolom meg',
      'Körbemérem vonalzóval'
    ],
    correctAnswer: 0,
    explanation: 'Minden sorban ugyanannyi négyzet van. Ezért a sorok számát szorozzuk az egy sorban lévő négyzetek számával.'
  },

  // ------------------------------------------------------------------ 2. szint
  {
    id: 'ra-q11',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <RFig rows={6} cols={7} s={16} pal="blue" />,
    question: 'Hány kis négyzet fedi le a téglalapot?',
    options: ['42', '13', '26', '36'],
    correctAnswer: 0,
    explanation: '6 sor, mindegyikben 7 kis négyzet: 6 · 7 = 42.'
  },
  {
    id: 'ra-q12',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: <RFig rows={5} cols={5} s={18} pal="purple" />,
    question: 'Hány kis négyzet fedi le a négyzetet?',
    options: ['25', '10', '20', '30'],
    correctAnswer: 0,
    explanation: '5 sor, mindegyikben 5: 5 · 5 = 25.'
  },
  {
    id: 'ra-q13',
    level: 2,
    questionTypeBadge: 'Járólap',
    figure: <TerraceFig rows={4} cols={6} tile="dom" />,
    question: 'A terasz 4 sor, soronként 6 kis négyzet. Hány ilyen dominó alakú járólap fedi le?',
    options: ['12', '24', '6', '10'],
    correctAnswer: 0,
    explanation: 'A terasz 4 · 6 = 24 kis négyzet. Egy dominó 2 kis négyzet. 24 : 2 = 12 járólap. (Egy sorba 3 dominó fér, 4 sor van: 4 · 3 = 12.)'
  },
  {
    id: 'ra-q14',
    level: 2,
    questionTypeBadge: 'Járólap',
    figure: <TerraceFig rows={4} cols={6} tile="big" />,
    question: 'Most nagy négyzet alakú járólapot használunk. Hány lap fedi le ugyanezt a teraszt?',
    options: ['6', '24', '12', '4'],
    correctAnswer: 0,
    explanation: 'Egy nagy lap 2 sor, soronként 2: 4 kis négyzet. Egy sorba 3 nagy lap fér, és 2 ilyen sor van: 2 · 3 = 6.'
  },
  {
    id: 'ra-q15',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: <RFig rows={4} cols={4} s={20} pal="teal" />,
    question: 'Mekkora a négyzet területe?',
    options: ['16 kis négyzet', '8 kis négyzet', '12 kis négyzet', '20 kis négyzet'],
    correctAnswer: 0,
    explanation: '4 sor, mindegyikben 4: 4 · 4 = 16 kis négyzet.'
  },
  {
    id: 'ra-q16',
    level: 2,
    questionTypeBadge: 'Gondold hozzá!',
    figure: <RFig rows={6} cols={9} s={16} pal="yellow" mode="partial" />,
    question: 'Csak az első sor és az első oszlop van kirakva. Hány lap kell az egészhez?',
    options: ['54', '15', '14', '45'],
    correctAnswer: 0,
    explanation: 'Egy sorban 9 lap, és 6 sor van. 6 · 9 = 54.'
  },
  {
    id: 'ra-q17',
    level: 2,
    questionTypeBadge: 'Szorzás',
    question: 'Melyik téglalap területe 12 kis négyzet?',
    options: ['3 sor, soronként 4', '3 sor, soronként 5', '2 sor, soronként 5', '4 sor, soronként 4'],
    correctAnswer: 0,
    explanation: '3 · 4 = 12. A többi: 3 · 5 = 15, 2 · 5 = 10, 4 · 4 = 16.'
  },
  {
    id: 'ra-q18',
    level: 2,
    questionTypeBadge: 'Szél',
    figure: <RFig rows={4} cols={6} s={20} pal="red" mode="partial" cellFill={(r, c) => (r === 0 || r === 3 || c === 0 || c === 5 ? '#fca5a5' : '#fff')} note="szélső kockák: ?" noteColor={UNK} />,
    question: 'A takaró 4 sor, soronként 6 kocka. Hány piros kocka van a szélén, körben?',
    options: ['16', '20', '24', '8'],
    correctAnswer: 0,
    explanation: 'Összesen 4 · 6 = 24 kocka. Belül 2 sor, soronként 4: 8 kocka. 24 − 8 = 16. Ha 6 + 6 + 4 + 4 = 20-at kaptál, a sarkokat kétszer számoltad!'
  },
  {
    id: 'ra-q19',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: <RFig rows={6} cols={6} s={16} pal="blue" mode="empty" cellFill={(r, c) => (r < 3 && c < 3 ? '#fde047' : undefined)} />,
    question: 'Hány ilyen sárga négyzet fér el a nagy négyzetben, hézag nélkül?',
    options: ['4', '2', '3', '9'],
    correctAnswer: 0,
    explanation: 'A sárga 3 · 3 = 9, a nagy 6 · 6 = 36 kis négyzet. Egymás mellé 2, egymás alá 2 fér: 2 · 2 = 4.'
  },
  {
    id: 'ra-q20',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: (
      <QFig h={110}>
        <UnitTag x={14} y={18} kind="half" />
        <Pieces polys={shapePolys([], splitHalves(rectCells(3, 4)))} x={80} y={32} s={20} pal="blue" />
      </QFig>
    ),
    question: 'Az egység most a fél négyzet. Hány fél négyzet fedi le a téglalapot?',
    options: ['24', '12', '7', '14'],
    correctAnswer: 0,
    explanation: 'A téglalap 3 · 4 = 12 kis négyzet. Mindegyikben 2 fél négyzet van: 12 + 12 = 24.'
  },

  // ------------------------------------------------------------------ 3. szint
  {
    id: 'ra-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <RFig rows={6} cols={8} s={16} pal="yellow" mode="empty" cellFill={(r) => (r === 0 ? '#f9a8d4' : undefined)} note="1. sor: virágágyás" noteColor="#9d174d" />,
    question: 'Az udvar 6 sor, soronként 8 kis négyzet. Az első sorban virágágyás van. A többit térkővel fedik le. Hány térkő kell?',
    options: ['40', '48', '8', '42'],
    correctAnswer: 0,
    explanation: 'Térkő 5 sorba kell (6 − 1 = 5). 5 · 8 = 40 térkő. (Vagy: 6 · 8 = 48, és 48 − 8 = 40.)'
  },
  {
    id: 'ra-q22',
    level: 3,
    questionTypeBadge: 'Terület vagy kerület?',
    figure: (
      <QFig h={92}>
        <RectGrid rows={1} cols={12} x={18} y={16} s={13} pal="blue" />
        <text x="182" y="27" fontSize="11" fill="#334155">
          1 sor
        </text>
        <RectGrid rows={3} cols={4} x={18} y={42} s={13} pal="pink" />
        <text x="80" y="66" fontSize="11" fill="#334155">
          3 sor, soronként 4
        </text>
      </QFig>
    ),
    question: 'Melyik téglalap területe nagyobb?',
    options: ['Egyforma', 'A kéké', 'A rózsaszíné', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Kék: 1 · 12 = 12. Rózsaszín: 3 · 4 = 12. A területük egyforma, csak az alakjuk más.'
  },
  {
    id: 'ra-q23',
    level: 3,
    questionTypeBadge: 'Terület vagy kerület?',
    figure: (
      <QFig h={92}>
        <RectGrid rows={1} cols={12} x={18} y={16} s={13} pal="blue" />
        <text x="182" y="27" fontSize="11" fill="#334155">
          1 sor
        </text>
        <RectGrid rows={3} cols={4} x={18} y={42} s={13} pal="pink" />
        <text x="80" y="66" fontSize="11" fill="#334155">
          3 sor, soronként 4
        </text>
      </QFig>
    ),
    question: 'Ugyanaz a két téglalap. Melyiknek hosszabb a kerülete (a határa körben)?',
    options: ['A kéknek', 'A rózsaszínnek', 'Egyforma', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Számold körben a kis oldalakat! Kék: 12 + 1 + 12 + 1 = 26. Rózsaszín: 4 + 3 + 4 + 3 = 14. A kéknek hosszabb a kerülete, pedig a területük egyenlő.'
  },
  {
    id: 'ra-q24',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <RFig rows={3} cols={5} s={20} pal="orange" mode="empty" note="1 járólap: 10 Ft" />,
    question: 'A terasz 3 sor, soronként 5 járólap. Egy járólap 10 Ft. Mennyibe kerül az összes?',
    options: ['150 Ft', '15 Ft', '80 Ft', '50 Ft'],
    correctAnswer: 0,
    explanation: 'Először: 3 · 5 = 15 járólap. Aztán: 15 · 10 Ft = 150 Ft.'
  },
  {
    id: 'ra-q25',
    level: 3,
    questionTypeBadge: 'Osztás',
    figure: <RFig rows={4} cols={6} s={18} pal="green" mode="empty" left="4 sor" top="? egy sorban" note="összesen 24" />,
    question: 'Egy téglalap 24 kis négyzetből áll, 4 sorban. Hány kis négyzet van egy sorban?',
    options: ['6', '20', '28', '8'],
    correctAnswer: 0,
    explanation: '4 sor, mindegyikben ugyanannyi. 24 : 4 = 6, mert 4 · 6 = 24.'
  },
  {
    id: 'ra-q26',
    level: 3,
    questionTypeBadge: 'Négyzet',
    question: 'Egy négyzetet 49 kis négyzet fed le. Hány kis négyzet van egy sorában?',
    options: ['7', '6', '8', '49'],
    correctAnswer: 0,
    explanation: 'A négyzetben a sorok száma és az egy sorban lévők száma egyenlő. 7 · 7 = 49, tehát egy sorban 7.'
  },
  {
    id: 'ra-q27',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <QFig h={110}>
        <Pieces polys={shapePolys(S('####|####|####|##..|##..'))} x={84} y={10} s={18} pal="purple" />
      </QFig>
    ),
    question: 'Darabold fel két téglalapra! Hány kis négyzet a síkidom területe?',
    options: ['16', '12', '14', '20'],
    correctAnswer: 0,
    explanation: 'Fent: 3 sor, soronként 4: 3 · 4 = 12. Lent: 2 sor, soronként 2: 2 · 2 = 4. Együtt 12 + 4 = 16.'
  },
  {
    id: 'ra-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <RFig rows={5} cols={6} s={18} pal="green" cellFill={(r, c) => (r >= 1 && r <= 2 && c >= 3 && c <= 4 ? '#7dd3fc' : undefined)} note="kék: medence" noteColor="#075985" />
    ),
    question: 'A kert 5 sor, soronként 6 kis négyzet. A kék rész medence. Hány kis négyzet a füves rész?',
    options: ['26', '30', '34', '4'],
    correctAnswer: 0,
    explanation: 'Az egész kert 5 · 6 = 30. A medence 2 · 2 = 4. A füves rész 30 − 4 = 26.'
  },
  {
    id: 'ra-q29',
    level: 3,
    questionTypeBadge: 'Járólap',
    figure: <TerraceFig rows={6} cols={8} tile="big" />,
    question: 'Az udvar 6 sor, soronként 8 kis négyzet. Hány nagy négyzet alakú lap fedi le?',
    options: ['12', '48', '24', '14'],
    correctAnswer: 0,
    explanation: 'Egy nagy lap 2 · 2-es. Egy sorba 8 : 2 = 4 nagy lap fér, és 6 : 2 = 3 ilyen sor van. 3 · 4 = 12.'
  },
  {
    id: 'ra-q30',
    level: 3,
    questionTypeBadge: 'Szél',
    figure: <RFig rows={5} cols={6} s={18} pal="yellow" mode="empty" cellFill={(r, c) => (r === 0 || r === 4 || c === 0 || c === 5 ? '#fde047' : undefined)} note="keret: ? kocka" noteColor={UNK} />,
    question: 'A képkeret 5 sor, soronként 6 kocka, de csak a szélén. Hány kocka kell a kerethez?',
    options: ['18', '22', '12', '30'],
    correctAnswer: 0,
    explanation: 'Az egész 5 · 6 = 30 kocka lenne. A közepe 3 sor, soronként 4: 12. 30 − 12 = 18 kocka.'
  }
];

export const RectAreaG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="meresek"
      topicId="g3-meas-teglalap-terulet-quiz"
      subtopicId="a-teglalap-es-a-negyzet-terulete"
      title="8. A téglalap és a négyzet területe – Kvíz"
      subtitle="30 feladat 3 szinten: soronként szorzás, négyzetek, járólapok, szél és belső rész, két lépéses feladatok."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={RECT_AREA_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Soronként számolj!',
          items: ['3 sor, soronként 5: 3 · 5 = 15', 'Négyzet: 4 sor, soronként 4: 4 · 4 = 16', 'Elég az első sor és az első oszlop!']
        },
        {
          title: 'Visszafelé',
          items: ['24 kis négyzet 4 sorban: 24 : 4 = 6 egy sorban', 'Nagyobb lap → kevesebb darab', '1 dominó = 2, 1 nagy négyzet = 4 kis négyzet']
        },
        {
          title: 'Két lépés',
          items: ['Lyuk: az egészből vond ki a lyukat.', 'Szél: az egészből vond ki a belsejét.', 'Kerület: körben a határ. Terület: a belseje.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<RectAreaG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<RectAreaG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default RectAreaG3Quiz;
