import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AreaG3Matcher } from './AreaG3Matcher';
import { AreaG3Sorter } from './AreaG3Sorter';
import {
  QFig,
  Pieces,
  GridBg,
  UnitTag,
  shapePolys,
  splitHalves,
  shift,
  rectCells,
  cellPts,
  S,
  HEX,
  RHOMB,
  BIGTRI9,
  INK,
  UNK,
  Cell,
  Half,
  Pt,
  PalName
} from './AreaG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

type Item = { cells?: Cell[]; halves?: Half[]; polys?: Pt[][]; dc?: number; dr?: number; pal?: PalName; label?: string };

/** Négyzetrács, rajta egy vagy több síkidom (betűjellel). */
const GridFig: React.FC<{
  items: Item[];
  cols?: number;
  rows?: number;
  s?: number;
  unit?: 'sq' | 'half' | 'dom' | 'tri' | 'big';
  note?: string;
  noteColor?: string;
}> = ({ items: raw, s: sIn = 20, unit, note, noteColor }) => {
  // Az eltolásokat egész cellára kerekítjük, a rács a síkidomok köré 1 cella margóval készül.
  const items = raw.map((it) => ({ ...it, dc: Math.max(1, Math.ceil(it.dc ?? 1)), dr: Math.max(1, Math.ceil(it.dr ?? 1)) }));
  let cols = 0;
  let rows = 0;
  items.forEach((it) => {
    const polys = it.polys ?? shapePolys(it.cells ?? [], it.halves ?? []);
    polys.flat().forEach(([a, b]) => {
      cols = Math.max(cols, Math.ceil(a + it.dc + 1));
      rows = Math.max(rows, Math.ceil(b + it.dr + 1));
    });
  });
  const s = Math.min(sIn, 220 / cols);
  const top = unit ? 30 : 12;
  const h = top + rows * s + (note ? 30 : 12);
  const x0 = (240 - cols * s) / 2;
  return (
    <QFig h={h}>
      {unit && <UnitTag x={14} y={16} kind={unit} />}
      <GridBg x={x0} y={top} cols={cols} rows={rows} s={s} />
      {items.map((it, i) => {
        const polys = it.polys ?? shapePolys(it.cells ?? [], it.halves ?? []);
        return (
          <g key={i}>
            <Pieces polys={shift(polys, it.dc ?? 0, it.dr ?? 0)} x={x0} y={top} s={s} pal={it.pal ?? 'green'} />
            {it.label && (
              <text x={x0 + (it.dc ?? 0) * s - 2} y={top + (it.dr ?? 0) * s - 3} fontSize="12" fontWeight="bold" fill={INK} textAnchor="end">
                {it.label}
              </text>
            )}
          </g>
        );
      })}
      {note && (
        <text x="120" y={h - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill={noteColor ?? INK}>
          {note}
        </text>
      )}
    </QFig>
  );
};

/** Darabok rács nélkül (pl. kis háromszögek, dominók). */
const PolyFig: React.FC<{ groups: { polys: Pt[][]; x: number; y: number; s: number; pal?: PalName; label?: string }[]; h?: number; unit?: 'tri' | 'dom' | 'big' | 'sq'; extra?: React.ReactNode }> = ({
  groups,
  h = 120,
  unit,
  extra
}) => (
  <QFig h={h}>
    {unit && <UnitTag x={14} y={18} kind={unit} pal="blue" />}
    {groups.map((g, i) => (
      <g key={i}>
        <Pieces polys={g.polys} x={g.x} y={g.y} s={g.s} pal={g.pal ?? 'green'} />
        {g.label && (
          <text x={g.x - 4} y={g.y + 4} fontSize="12" fontWeight="bold" fill={INK} textAnchor="end">
            {g.label}
          </text>
        )}
      </g>
    ))}
    {extra}
  </QFig>
);

const domino = (c: number, r: number, d: 'h' | 'v'): Pt[] =>
  d === 'h'
    ? [
        [c, r],
        [c + 2, r],
        [c + 2, r + 1],
        [c, r + 1]
      ]
    : [
        [c, r],
        [c + 1, r],
        [c + 1, r + 2],
        [c, r + 2]
      ];
const bigSq = (c: number, r: number): Pt[] => [
  [c, r],
  [c + 2, r],
  [c + 2, r + 2],
  [c, r + 2]
];

const Q = (t: string, y: number) => (
  <text x="120" y={y} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
    {t}
  </text>
);

export const AREA_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------------------------------------------ 1. szint
  {
    id: 'ar-q1',
    level: 1,
    questionTypeBadge: 'Lefedés',
    figure: <GridFig cols={6} rows={4} unit="sq" items={[{ cells: S('##.|.##|.##'), dc: 1.5, dr: 0.5 }]} />,
    question: 'Hány kis négyzet fedi le a síkidomot?',
    options: ['6', '5', '7', '12'],
    correctAnswer: 0,
    explanation: 'Számold meg soronként: fent 2, középen 2, lent 2. 2 + 2 + 2 = 6 kis négyzet.'
  },
  {
    id: 'ar-q2',
    level: 1,
    questionTypeBadge: 'Lefedés',
    figure: <GridFig cols={6} rows={4} unit="sq" items={[{ cells: S('#..#|#..#|####'), dc: 1, dr: 0.5, pal: 'orange' }]} />,
    question: 'Hány kis négyzet fedi le a síkidomot?',
    options: ['8', '10', '6', '12'],
    correctAnswer: 0,
    explanation: 'Fent 2, középen 2, lent 4. 2 + 2 + 4 = 8. A fehér rész belül nincs lefedve, azt nem számoljuk!'
  },
  {
    id: 'ar-q3',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <GridFig
        cols={10}
        rows={4}
        s={20}
        items={[
          { cells: S('###|###|#..'), dc: 1, dr: 0.5, pal: 'blue', label: 'A' },
          { cells: S('######'), dc: 4.5, dr: 1.5, pal: 'pink', label: 'B' }
        ]}
      />
    ),
    question: 'Melyik síkidom területe nagyobb?',
    options: ['Az A-é', 'A B-é', 'Egyforma', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Az A-t 7 kis négyzet fedi le, a B-t 6. 7 több, mint 6, ezért az A területe nagyobb. A B hosszabb, de nem nagyobb!'
  },
  {
    id: 'ar-q4',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit mutat meg a síkidom területe?',
    options: ['Mekkora helyet fed le', 'Milyen hosszú a határa körben', 'Hány csúcsa van', 'Milyen nehéz'],
    correctAnswer: 0,
    explanation: 'A terület azt mutatja meg, mekkora helyet fed le a síkidom. A határ hossza körben a kerület.'
  },
  {
    id: 'ar-q5',
    level: 1,
    questionTypeBadge: 'Kis háromszög',
    figure: <PolyFig unit="tri" h={110} groups={[{ polys: HEX, x: 80, y: 32, s: 40, pal: "green" }]} />,
    question: 'Az egység a kis háromszög. Hány kis háromszög fedi le a hatszöget?',
    options: ['6', '3', '5', '12'],
    correctAnswer: 0,
    explanation: 'Fent 3 kis háromszög van, lent is 3. 3 + 3 = 6 kis háromszög.'
  },
  {
    id: 'ar-q6',
    level: 1,
    questionTypeBadge: 'Mérés',
    question: 'Hogyan méred meg, mekkora a szőnyeg területe?',
    options: ['Lefedem egyforma lapokkal, és megszámolom őket', 'Körbemérem vonalzóval', 'Ráteszem a mérlegre', 'Megnézem az órán'],
    correctAnswer: 0,
    explanation: 'A területet lefedéssel mérjük: egyforma lapokkal, hézag nélkül, aztán megszámoljuk őket. Körbe a kerületet mérjük.'
  },
  {
    id: 'ar-q7',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <GridFig
        cols={10}
        rows={3}
        items={[
          { cells: S('####'), dc: 1, dr: 1, pal: 'blue', label: 'A' },
          { cells: S('###|.#.'), dc: 6.5, dr: 0.5, pal: 'orange', label: 'B' }
        ]}
      />
    ),
    question: 'Mit mondhatsz a két síkidom területéről?',
    options: ['Ugyanakkora', 'Az A-é nagyobb', 'A B-é nagyobb', 'Nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: 'Mindkettőt 4 kis négyzet fedi le. Más az alakjuk, de ugyanakkora a területük.'
  },
  {
    id: 'ar-q8',
    level: 1,
    questionTypeBadge: 'Lefedés',
    figure: <GridFig cols={6} rows={4} unit="sq" items={[{ cells: S('.##.|####|.###'), dc: 1, dr: 0.5, pal: 'teal' }]} />,
    question: 'Hány kis négyzet fedi le a síkidomot?',
    options: ['9', '8', '10', '12'],
    correctAnswer: 0,
    explanation: 'Soronként: 2 + 4 + 3 = 9 kis négyzet.'
  },
  {
    id: 'ar-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <GridFig
        cols={11}
        rows={4}
        s={19}
        items={[
          { cells: S('##|##|#.'), dc: 1, dr: 0.5, pal: 'blue', label: 'A' },
          { cells: S('#..|###|.##'), dc: 4.5, dr: 0.5, pal: 'pink', label: 'B' },
          { cells: S('###|.##|.##'), dc: 9, dr: 0.5, pal: 'orange', label: 'C' }
        ]}
      />
    ),
    question: 'Melyik síkidom területe a legkisebb?',
    options: ['Az A-é', 'A B-é', 'A C-é', 'Mindegyik egyforma'],
    correctAnswer: 0,
    explanation: 'Számold meg soronként! A = 2 + 2 + 1 = 5, B = 1 + 3 + 2 = 6, C = 3 + 2 + 2 = 7. A legkisebb az A területe.'
  },
  {
    id: 'ar-q10',
    level: 1,
    questionTypeBadge: 'Kis háromszög',
    question: 'Egy rombuszt 2 kis háromszög fed le. Hány kis háromszög fed le 2 ilyen rombuszt?',
    options: ['4', '2', '3', '6'],
    correctAnswer: 0,
    explanation: '1 rombusz = 2 kis háromszög. 2 rombusz = 2 + 2 = 4 kis háromszög.'
  },

  // ------------------------------------------------------------------ 2. szint
  {
    id: 'ar-q11',
    level: 2,
    questionTypeBadge: 'Fél négyzet',
    figure: <GridFig cols={7} rows={3} unit="sq" items={[{ cells: S('.####'), halves: [[0, 0, 'br'], [5, 0, 'tl']], dc: 0.5, dr: 1, pal: 'purple' }]} />,
    question: 'Hány kis négyzetnyi a síkidom területe?',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: 'Középen 4 egész kis négyzet van. A két szélén 1-1 fél négyzet: 2 fél = 1 egész. 4 + 1 = 5.'
  },
  {
    id: 'ar-q12',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: (
      <GridFig
        cols={6}
        rows={4}
        unit="dom"
        items={[{ polys: [domino(0, 0, 'h'), domino(2, 0, 'h'), domino(0, 1, 'h'), domino(2, 1, 'h')], dc: 1, dr: 1, pal: 'orange' }]}
      />
    ),
    question: 'Az egység most a dominó. Hány dominó fedi le a téglalapot?',
    options: ['4', '8', '2', '16'],
    correctAnswer: 0,
    explanation: 'Egy sorban 2 dominó van, és 2 sor van. 2 + 2 = 4 dominó. (Kis négyzetből 8 kellene, mert egy dominó 2 kis négyzet.)'
  },
  {
    id: 'ar-q13',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: <GridFig cols={5} rows={3} unit="half" items={[{ cells: S('#.|##'), dc: 1.5, dr: 0.5, pal: 'blue' }]} />,
    question: 'Az egység most a fél négyzet. Hány fél négyzet fedi le a síkidomot?',
    options: ['6', '3', '4', '9'],
    correctAnswer: 0,
    explanation: 'A síkidom 3 kis négyzet. Minden kis négyzetbe 2 fél négyzet fér. 2 + 2 + 2 = 6.'
  },
  {
    id: 'ar-q14',
    level: 2,
    questionTypeBadge: 'Egység',
    figure: (
      <PolyFig
        h={100}
        groups={[
          { polys: shapePolys(rectCells(2, 4)), x: 24, y: 30, s: 20, pal: 'yellow' },
          { polys: [bigSq(0, 0), bigSq(2, 0)], x: 136, y: 30, s: 20, pal: 'purple' }
        ]}
        extra={
          <g>
            <text x="64" y="20" textAnchor="middle" fontSize="11" fill="#334155">
              kis négyzettel
            </text>
            <text x="176" y="20" textAnchor="middle" fontSize="11" fill="#334155">
              nagy négyzettel
            </text>
            <text x="64" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
              8 darab
            </text>
            <text x="176" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
              ? darab
            </text>
          </g>
        }
      />
    ),
    question: 'Ugyanazt a téglalapot nagyobb egységgel fedjük le. Mi lesz a darabszámmal?',
    options: ['Kevesebb lesz', 'Több lesz', 'Ugyanannyi marad', 'Mindig 1 lesz'],
    correctAnswer: 0,
    explanation: 'Ha nagyobb a lap, kevesebb kell belőle. Itt 8 kis négyzet helyett 2 nagy négyzet is elég.'
  },
  {
    id: 'ar-q15',
    level: 2,
    questionTypeBadge: 'Lefedés',
    figure: <GridFig cols={6} rows={4} unit="sq" items={[{ cells: S('####|#..#|####'), dc: 1, dr: 0.5, pal: 'red' }]} />,
    question: 'Hány kis négyzet fedi le a keretet?',
    options: ['10', '12', '8', '14'],
    correctAnswer: 0,
    explanation: 'Fent 4, középen 2, lent 4. 4 + 2 + 4 = 10. A közepén lévő 2 fehér négyzet nincs lefedve, ezért nem számít.'
  },
  {
    id: 'ar-q16',
    level: 2,
    questionTypeBadge: 'Fél négyzet',
    figure: (
      <GridFig
        cols={8}
        rows={3}
        unit="sq"
        items={[
          {
            cells: S('..###|.###'),
            halves: [
              [1, 0, 'br'],
              [5, 0, 'tl'],
              [0, 1, 'br'],
              [4, 1, 'tl']
            ],
            dc: 1,
            dr: 0.5,
            pal: 'green'
          }
        ]}
      />
    ),
    question: 'Hány kis négyzetnyi a ferde síkidom területe?',
    options: ['8', '10', '6', '12'],
    correctAnswer: 0,
    explanation: '6 egész kis négyzet van, és 4 fél négyzet. 4 fél = 2 egész. 6 + 2 = 8 kis négyzet.'
  },
  {
    id: 'ar-q17',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <GridFig
        cols={11}
        rows={4}
        s={19}
        items={[
          { cells: S('###|.##|.#.'), dc: 1, dr: 0.5, pal: 'blue', label: 'A' },
          { cells: S('##.|###|.##'), dc: 4.5, dr: 0.5, pal: 'pink', label: 'B' },
          { cells: S('###|###|.##'), dc: 9, dr: 0.5, pal: 'orange', label: 'C' }
        ]}
      />
    ),
    question: 'Melyik síkidom területe 7 kis négyzet?',
    options: ['A B-é', 'Az A-é', 'A C-é', 'Egyiké sem'],
    correctAnswer: 0,
    explanation: 'Soronként: A = 3 + 2 + 1 = 6, B = 2 + 3 + 2 = 7, C = 3 + 3 + 2 = 8. A B területe 7 kis négyzet.'
  },
  {
    id: 'ar-q18',
    level: 2,
    questionTypeBadge: 'Csapda',
    figure: (
      <GridFig
        cols={11}
        rows={4}
        s={19}
        items={[
          { cells: S('########'), dc: 1, dr: 1.5, pal: 'blue', label: 'A' },
          { cells: S('###|###|###'), dc: 10, dr: 0.5, pal: 'orange', label: 'B' }
        ]}
      />
    ),
    question: 'Melyik síkidom területe nagyobb?',
    options: ['A B-é', 'Az A-é', 'Egyforma', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Az A hosszú, de csak 8 kis négyzet. A B 3 sor, mindegyikben 3: 9 kis négyzet. A B területe nagyobb.'
  },
  {
    id: 'ar-q19',
    level: 2,
    questionTypeBadge: 'Más egység',
    question: 'Egy téglalapot 10 kis négyzet fed le. Hány dominó fedi le? (1 dominó = 2 kis négyzet)',
    options: ['5', '10', '20', '4'],
    correctAnswer: 0,
    explanation: 'Egy dominó 2 kis négyzetet takar. 10 : 2 = 5, tehát 5 dominó kell.'
  },
  {
    id: 'ar-q20',
    level: 2,
    questionTypeBadge: 'Kis háromszög',
    figure: <PolyFig unit="tri" h={122} groups={[{ polys: BIGTRI9, x: 75, y: 30, s: 30, pal: 'pink' }]} />,
    question: 'Hány kis háromszög fedi le a nagy háromszöget?',
    options: ['9', '6', '3', '8'],
    correctAnswer: 0,
    explanation: 'Soronként számolj: fent 1, középen 3, lent 5. 1 + 3 + 5 = 9 kis háromszög.'
  },

  // ------------------------------------------------------------------ 3. szint
  {
    id: 'ar-q21',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: (
      <GridFig
        cols={10}
        rows={4}
        s={20}
        items={[
          { cells: S('###|###|###'), dc: 1, dr: 0.5, pal: 'blue', label: 'A' },
          { cells: S('###|###'), dc: 6, dr: 1, pal: 'pink', label: 'B' }
        ]}
      />
    ),
    question: 'Hány kis négyzettel nagyobb az A területe, mint a B-é?',
    options: ['3', '15', '9', '6'],
    correctAnswer: 0,
    explanation: 'A = 9 kis négyzet, B = 6 kis négyzet. 9 − 6 = 3. Az A 3 kis négyzettel nagyobb.'
  },
  {
    id: 'ar-q22',
    level: 3,
    questionTypeBadge: 'Összeg',
    figure: (
      <GridFig
        cols={10}
        rows={4}
        items={[
          { cells: S('##|##|#.'), dc: 1, dr: 0.5, pal: 'blue' },
          { cells: S('###|###|.#.'), dc: 5.5, dr: 0.5, pal: 'orange' }
        ]}
        note="együtt: ? kis négyzet"
        noteColor={UNK}
      />
    ),
    question: 'A két síkidomot összetoljuk egy nagy síkidommá. Mekkora lesz a területe?',
    options: ['12', '2', '10', '13'],
    correctAnswer: 0,
    explanation: 'A kék 5 kis négyzet, a narancs 7. Összetolva nem lesz kevesebb, sem több: 5 + 7 = 12 kis négyzet.'
  },
  {
    id: 'ar-q23',
    level: 3,
    questionTypeBadge: 'Más egység',
    figure: (
      <PolyFig
        h={112}
        groups={[
          { polys: [domino(0, 0, 'h'), domino(2, 0, 'h'), domino(0, 1, 'h'), domino(2, 1, 'h'), domino(0, 2, 'h'), domino(2, 2, 'h')], x: 22, y: 32, s: 16, pal: 'orange' },
          { polys: shapePolys(S('#####|#####')), x: 134, y: 40, s: 16, pal: 'blue' }
        ]}
        extra={
          <g>
            <text x="54" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
              Panni: 6 dominó
            </text>
            <text x="174" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
              Gergő: 10 négyzet
            </text>
          </g>
        }
      />
    ),
    question: 'Panni 6 dominót tett le, Gergő 10 kis négyzetet. Ki fedett le nagyobb területet?',
    options: ['Panni', 'Gergő', 'Egyforma', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Egy dominó 2 kis négyzet. Panni: 6 dominó = 12 kis négyzet. Gergő: 10 kis négyzet. 12 > 10, tehát Panni.'
  },
  {
    id: 'ar-q24',
    level: 3,
    questionTypeBadge: 'Kis háromszög',
    question: 'Egy hatszöget 6 kis háromszög fed le. Hány kis háromszög kell 3 ilyen hatszöghöz?',
    options: ['18', '9', '12', '6'],
    correctAnswer: 0,
    explanation: '3 hatszög, mindegyikben 6 kis háromszög: 3 · 6 = 18. (Vagy: 6 + 6 + 6 = 18.)'
  },
  {
    id: 'ar-q25',
    level: 3,
    questionTypeBadge: 'Kis háromszög',
    figure: (
      <PolyFig
        h={110}
        groups={[
          { polys: HEX, x: 26, y: 30, s: 40, pal: 'green' },
          { polys: RHOMB, x: 160, y: 46, s: 34, pal: 'yellow' }
        ]}
        extra={
          <text x="120" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            ?
          </text>
        }
      />
    ),
    question: 'Hány sárga rombusszal tudod lefedni a hatszöget?',
    options: ['3', '6', '2', '4'],
    correctAnswer: 0,
    explanation: 'A hatszög 6 kis háromszög, egy rombusz 2 kis háromszög. 6 : 2 = 3, tehát 3 rombusz kell.'
  },
  {
    id: 'ar-q26',
    level: 3,
    questionTypeBadge: 'Fél négyzet',
    figure: (
      <GridFig
        cols={7}
        rows={3}
        unit="sq"
        items={[
          {
            cells: S('.###|.###'),
            halves: [
              [0, 0, 'br'],
              [0, 1, 'tr'],
              [4, 0, 'bl'],
              [4, 1, 'tl']
            ],
            dc: 1,
            dr: 0.5,
            pal: 'yellow'
          }
        ]}
      />
    ),
    question: 'Ez egy virágágyás terve. Hány kis négyzetnyi a területe?',
    options: ['8', '10', '6', '7'],
    correctAnswer: 0,
    explanation: '6 egész kis négyzet és 4 fél négyzet van. 4 fél = 2 egész. 6 + 2 = 8 kis négyzet.'
  },
  {
    id: 'ar-q27',
    level: 3,
    questionTypeBadge: 'Váltás',
    question: 'Egy síkidomot 12 fél négyzet fed le. Hány egész kis négyzet ugyanakkora?',
    options: ['6', '12', '24', '10'],
    correctAnswer: 0,
    explanation: '2 fél négyzet = 1 egész. 12 : 2 = 6, tehát 6 kis négyzet.'
  },
  {
    id: 'ar-q28',
    level: 3,
    questionTypeBadge: 'Pótlás',
    figure: (
      <GridFig cols={8} rows={4} items={[{ cells: S('####|###.|##..'), dc: 1, dr: 0.5, pal: 'teal' }]} note="kell: 15 kis négyzet" />
    ),
    question: 'Bence ezt rakta ki. 15 kis négyzetnyi síkidomot szeretne. Hány kis négyzetet tegyen még hozzá?',
    options: ['6', '24', '5', '9'],
    correctAnswer: 0,
    explanation: 'Most 4 + 3 + 2 = 9 kis négyzet van. 15 − 9 = 6, tehát még 6 kis négyzet kell.'
  },
  {
    id: 'ar-q29',
    level: 3,
    questionTypeBadge: 'Kerület vagy terület?',
    figure: (
      <GridFig
        cols={10}
        rows={4}
        items={[
          { cells: S('######'), dc: 0.5, dr: 0.5, pal: 'blue' },
          { cells: S('###|###'), dc: 8, dr: 1, pal: 'pink' }
        ]}
      />
    ),
    question: 'Melyik igaz a két síkidomra?',
    options: ['A területük egyenlő, a kerületük nem', 'A területük és a kerületük is egyenlő', 'A területük nem egyenlő', 'A kék területe nagyobb, mert hosszabb'],
    correctAnswer: 0,
    explanation:
      'Mindkettő 6 kis négyzet, tehát a területük egyenlő. Számold körben a kis oldalakat: a kéknél 6 + 1 + 6 + 1 = 14, a rózsaszínnél 3 + 2 + 3 + 2 = 10. A kerületük nem egyenlő.'
  },
  {
    id: 'ar-q30',
    level: 3,
    questionTypeBadge: 'Váltás',
    figure: (
      <PolyFig
        h={100}
        groups={[
          { polys: [bigSq(0, 0), bigSq(2, 0), bigSq(4, 0)], x: 60, y: 30, s: 20, pal: 'purple' },
          { polys: shapePolys(rectCells(2, 2)), x: 60, y: 30, s: 20, pal: 'yellow' }
        ]}
        extra={
          <text x="120" y="20" textAnchor="middle" fontSize="11" fill="#334155">
            1 nagy négyzet = 4 kis négyzet
          </text>
        }
      />
    ),
    question: 'A síkidomot 3 nagy négyzet fedi le. Hány kis négyzet fedi le?',
    options: ['12', '7', '3', '4'],
    correctAnswer: 0,
    explanation: 'Egy nagy négyzet 4 kis négyzet. 3 nagy négyzet: 4 + 4 + 4 = 12 kis négyzet.'
  }
];

export const AreaG3Quiz: React.FC<{
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
      topicId="g3-meas-terulet-quiz"
      subtopicId="a-terulet-merese"
      title="7. A terület mérése – Kvíz"
      subtitle="30 feladat 3 szinten: lefedés kis négyzettel, fél négyzet, kis háromszög, dominó, összehasonlítás, kerület vagy terület."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={AREA_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Így mérj területet!',
          items: ['Válassz egységet (pl. 1 kis négyzet).', 'Fedd le hézag nélkül.', 'Számold meg a darabokat.']
        },
        {
          title: 'Darabok',
          items: ['2 fél négyzet = 1 kis négyzet', '1 dominó = 2 kis négyzet', '1 nagy négyzet = 4 kis négyzet']
        },
        {
          title: 'Ne keverd!',
          items: ['Terület: a belseje, lefedjük.', 'Kerület: a határ körben, körbemérjük.', 'Összehasonlítani csak ugyanazzal az egységgel lehet.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<AreaG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<AreaG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default AreaG3Quiz;
