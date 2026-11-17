import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { VennG3Matcher } from './VennG3Matcher';
import { VennG3Sorter } from './VennG3Sorter';
import { FONT, Venn, VennMode, VNum, place, Region, LogicBlock, B, Block, Pill } from './VennG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

interface It {
  r: Region;
  n?: number | string;
  blk?: Block;
  hl?: boolean;
}

/** Halmazábra elemekkel; fölötte (top) egy sáv a kérdezett elemnek vagy számsornak. */
const QV: React.FC<{
  id: string;
  mode?: VennMode;
  frame?: string;
  a?: string;
  b?: string;
  items?: It[];
  top?: React.ReactNode;
  topH?: number;
  extra?: React.ReactNode;
}> = ({ id, mode = 'overlap', frame, a, b, items = [], top, topH = 44, extra }) => {
  const h = top ? 180 + topH : 180;
  return (
    <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {top && <g>{top}</g>}
      <g transform={top ? `translate(0 ${topH})` : undefined}>
        <Venn id={id} mode={mode} frame={frame} a={a} b={b}>
          {place(mode, items.map((it) => ({ r: it.r, v: it }))).map((p, i) => {
            const it = p.v;
            return it.blk ? (
              <LogicBlock key={i} b={it.blk} x={p.x} y={p.y} k={0.6} sw={2} />
            ) : (
              <VNum key={i} x={p.x} y={p.y} n={it.n ?? '?'} hl={it.hl} fs={12} />
            );
          })}
          {extra}
        </Venn>
      </g>
    </svg>
  );
};

const its = (list: [Region, number | Block][]): It[] => list.map(([r, v]) => (typeof v === 'number' ? { r, n: v } : { r, blk: v }));

/** Kérdezett elem a felső sávban: „Hová kerül?” */
const AskNum: React.FC<{ n: number }> = ({ n }) => (
  <g>
    <text x="96" y="28" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">Hová kerül?</text>
    <VNum x={140} y={23} n={n} fs={18} hl />
  </g>
);
const AskBlock: React.FC<{ b: Block }> = ({ b }) => (
  <g>
    <text x="96" y="28" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">Hová kerül?</text>
    <LogicBlock b={b} x={136} y={23} k={0.85} sw={2.5} />
  </g>
);
/** Számsor a felső sávban. */
const TopNums: React.FC<{ nums: (number | string)[] }> = ({ nums }) => {
  const step = 240 / nums.length;
  return (
    <g>
      {nums.map((n, i) => (
        <VNum key={i} x={step * (i + 0.5)} y={22} n={n} fs={15} />
      ))}
    </g>
  );
};

/** Opciók a négy részre (az első a helyes). */
const regionOpts = (a: string, b: string, right: Region): string[] => {
  const t: Record<Region, string> = {
    ab: 'a közös részbe',
    a: `csak a „${a}” karikába`,
    b: `csak a „${b}” karikába`,
    out: 'egyik karikába sem'
  };
  return [right, ...(['ab', 'a', 'b', 'out'] as Region[]).filter((r) => r !== right)].map((r) => t[r]);
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const VENN_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'venn-g3-q1',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq1" frame="Logikai lapok" a="piros" b="lyukas" top={<AskBlock b={B('piros', 'kor', true, true)} />} />,
    question: 'Hová kerül a nagy, piros, lyukas kör?',
    options: regionOpts('piros', 'lyukas', 'ab'),
    correctAnswer: 0,
    explanation: 'Piros is, lyukas is. Mindkét címke igaz rá, ezért a közös részbe kerül.'
  },
  {
    id: 'venn-g3-q2',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq2" frame="Logikai lapok" a="piros" b="lyukas" top={<AskBlock b={B('kek', 'negyzet', true, true)} />} />,
    question: 'Hová kerül a nagy, kék, lyukas négyzet?',
    options: regionOpts('piros', 'lyukas', 'b'),
    correctAnswer: 0,
    explanation: 'Lyukas, de nem piros. Ezért csak a „lyukas” karikába kerül.'
  },
  {
    id: 'venn-g3-q3',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq3" frame="Logikai lapok" a="piros" b="lyukas" top={<AskBlock b={B('sarga', 'haromszog', true, false)} />} />,
    question: 'Hová kerül a nagy, sárga, nem lyukas háromszög?',
    options: regionOpts('piros', 'lyukas', 'out'),
    correctAnswer: 0,
    explanation: 'Nem piros és nem lyukas. Egyik karikába sem kerül: a karikákon kívülre, de a kereten belülre.'
  },
  {
    id: 'venn-g3-q4',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq4" frame="Számok 500-ig" a="páros" b="háromjegyű" top={<AskNum n={46} />} />,
    question: 'Hová kerül a 46?',
    options: regionOpts('páros', 'háromjegyű', 'a'),
    correctAnswer: 0,
    explanation: 'A 46 páros (6 a vége), de nem háromjegyű, hanem kétjegyű. Csak a „páros” karikába kerül.'
  },
  {
    id: 'venn-g3-q5',
    level: 1,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq5"
        frame="Számok 500-ig"
        a="páros"
        b="háromjegyű"
        items={its([
          ['a', 18],
          ['a', 72],
          ['ab', 214],
          ['ab', 380],
          ['b', 135],
          ['b', 451],
          ['out', 9],
          ['out', 63]
        ])}
      />
    ),
    question: 'Melyik szám van a közös részben?',
    options: ['214', '18', '135', '63'],
    correctAnswer: 0,
    explanation: 'A közös részben a 214 és a 380 van. Mindkettő páros és háromjegyű.'
  },
  {
    id: 'venn-g3-q6',
    level: 1,
    questionTypeBadge: 'Közös rész',
    question: 'Mit tudsz egy lapról, ha a közös részben van?',
    options: ['Mindkét címke igaz rá.', 'Csak az első címke igaz rá.', 'Egyik címke sem igaz rá.', 'Semmit sem tudunk róla.'],
    correctAnswer: 0,
    explanation: 'A közös rész mindkét karikában benne van. Ami ott van, arra mindkét címke igaz.'
  },
  {
    id: 'venn-g3-q7',
    level: 1,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq7"
        frame="Logikai lapok"
        a="piros"
        b="lyukas"
        items={its([
          ['a', B('piros', 'negyzet', true, false)],
          ['a', B('piros', 'kor', false, false)],
          ['ab', B('piros', 'kor', true, true)],
          ['ab', B('piros', 'haromszog', false, true)],
          ['ab', B('piros', 'negyzet', false, true)],
          ['b', B('kek', 'kor', true, true)],
          ['b', B('zold', 'negyzet', false, true)],
          ['out', B('sarga', 'kor', false, false)]
        ])}
      />
    ),
    question: 'Hány lap van a közös részben?',
    options: ['3', '5', '2', '8'],
    correctAnswer: 0,
    explanation: 'A két karika közös részében 3 lap van. Mindhárom piros és lyukas.'
  },
  {
    id: 'venn-g3-q8',
    level: 1,
    questionTypeBadge: 'Egy karika',
    figure: (
      <svg viewBox="0 0 240 234" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <AskNum n={35} />
        <g transform="translate(0 44)">
          <rect x="3" y="3" width="234" height="184" rx="8" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
          <rect x="3" y="3" width="104" height="21" rx="8" fill="#15803d" />
          <text x="55" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Számok 500-ig</text>
          <ellipse cx="120" cy="112" rx="84" ry="52" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" />
          <Pill x={120} y={60} label="páros számok" stroke="#dc2626" />
          <VNum x={88} y={100} n={24} />
          <VNum x={150} y={100} n={130} />
          <VNum x={118} y={130} n={316} />
          <VNum x={24} y={170} n={47} />
          <VNum x={214} y={40} n={203} />
        </g>
      </svg>
    ),
    question: 'Hová kerül a 35?',
    options: ['a karikán kívülre, a kereten belül', 'a karikába', 'a kereten kívülre', 'a karika vonalára'],
    correctAnswer: 0,
    explanation: 'A 35 páratlan, nem kerülhet a „páros számok” karikába. De szám, ezért a kereten belül van.'
  },
  {
    id: 'venn-g3-q9',
    level: 1,
    questionTypeBadge: 'Egy karika',
    figure: (
      <svg viewBox="0 0 240 180" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="3" y="3" width="234" height="174" rx="8" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
        <rect x="3" y="3" width="100" height="21" rx="8" fill="#15803d" />
        <text x="53" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Logikai lapok</text>
        <ellipse cx="110" cy="104" rx="72" ry="50" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" />
        <Pill x={110} y={54} label="körök" stroke="#dc2626" />
        <LogicBlock b={B('kek', 'kor', true, false)} x={84} y={104} k={0.8} />
        <LogicBlock b={B('sarga', 'kor', false, true)} x={140} y={104} k={0.8} />
        <LogicBlock b={B('piros', 'negyzet', false, false)} x={212} y={150} k={0.8} />
        <LogicBlock b={B('zold', 'haromszog', true, true)} x={210} y={60} k={0.8} />
        <text x="110" y="142" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
      </svg>
    ),
    question: 'Melyik lap kerülhet még a karikába?',
    options: ['kicsi, zöld, lyukas kör', 'nagy, zöld, lyukas négyzet', 'kicsi, piros háromszög', 'nagy, kék négyzet'],
    correctAnswer: 0,
    explanation: 'A karika címkéje: körök. A színe és a mérete mindegy, csak kör legyen.'
  },
  {
    id: 'venn-g3-q10',
    level: 1,
    questionTypeBadge: 'A keret',
    figure: (
      <svg viewBox="0 0 240 130" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="3" y="3" width="234" height="124" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2.5" />
        <rect x="3" y="3" width="150" height="22" rx="8" fill="#ea580c" />
        <text x="78" y="19" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">Háromjegyű számok</text>
        <VNum x={60} y={66} n={240} fs={15} />
        <VNum x={130} y={96} n={105} fs={15} />
        <VNum x={190} y={60} n={477} fs={15} />
        <text x="190" y="104" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
      </svg>
    ),
    question: 'Melyik szám nem kerülhet ebbe a keretbe?',
    options: ['89', '100', '345', '499'],
    correctAnswer: 0,
    explanation: 'A 89 kétjegyű, nem háromjegyű. A 100, a 345 és a 499 háromjegyű.'
  },

  // ----- 2. szint -----
  {
    id: 'venn-g3-q11',
    level: 2,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq11"
        frame="Logikai lapok"
        a="piros"
        b="lyukas"
        items={its([
          ['a', B('piros', 'haromszog', true, false)],
          ['a', B('piros', 'negyzet', false, false)],
          ['ab', B('piros', 'kor', false, true)],
          ['ab', B('piros', 'negyzet', true, true)],
          ['b', B('kek', 'haromszog', true, true)],
          ['b', B('sarga', 'kor', true, true)],
          ['b', B('zold', 'kor', false, true)],
          ['out', B('kek', 'negyzet', true, false)]
        ])}
      />
    ),
    question: 'Hány piros lap van az ábrán?',
    options: ['4', '2', '6', '7'],
    correctAnswer: 0,
    explanation: 'Csak a piros karikában 2 lap van, a közös részben is 2. Azok is pirosak! 2 + 2 = 4.'
  },
  {
    id: 'venn-g3-q12',
    level: 2,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq12"
        frame="Számok 500-ig"
        a="páratlan"
        b="100-nál kisebb"
        items={its([
          ['a', 101],
          ['a', 233],
          ['a', 457],
          ['ab', 15],
          ['ab', 79],
          ['b', 40],
          ['b', 86],
          ['out', 120],
          ['out', 302],
          ['out', 488]
        ])}
      />
    ),
    question: 'Hány szám nincs egyik karikában sem?',
    options: ['3', '2', '7', '10'],
    correctAnswer: 0,
    explanation: 'A karikákon kívül a 120, a 302 és a 488 van. Ezek párosak, és nem kisebbek 100-nál.'
  },
  {
    id: 'venn-g3-q13',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq13" frame="Számok 500-ig" a="páros" b="300-nál nagyobb" top={<AskNum n={360} />} />,
    question: 'Hová kerül a 360?',
    options: regionOpts('páros', '300-nál nagyobb', 'ab'),
    correctAnswer: 0,
    explanation: 'A 360 páros (0 a vége), és nagyobb 300-nál. Mindkettő igaz: közös rész.'
  },
  {
    id: 'venn-g3-q14',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq14" frame="Számok 500-ig" a="páros" b="300-nál nagyobb" top={<AskNum n={305} />} />,
    question: 'Hová kerül a 305?',
    options: regionOpts('páros', '300-nál nagyobb', 'b'),
    correctAnswer: 0,
    explanation: 'A 305 nagyobb 300-nál, de nem páros (5 a vége). Csak a „300-nál nagyobb” karikába kerül.'
  },
  {
    id: 'venn-g3-q15',
    level: 2,
    questionTypeBadge: 'Címke',
    figure: (
      <QV
        id="vq15"
        frame="Számok 500-ig"
        a="?"
        b="háromjegyű"
        items={its([
          ['a', 12],
          ['a', 48],
          ['a', 86],
          ['ab', 230],
          ['ab', 150],
          ['b', 117],
          ['b', 403],
          ['out', 7],
          ['out', 35]
        ])}
      />
    ),
    question: 'Mi lehet a bal oldali karika címkéje?',
    options: ['páros', 'kerek tízes', 'kétjegyű', 'páratlan'],
    correctAnswer: 0,
    explanation: 'A bal karikában a 12, 48, 86, 230, 150 van: mind páros. A 117, 403, 7 és 35 páratlan, ezek kívül maradtak.'
  },
  {
    id: 'venn-g3-q16',
    level: 2,
    questionTypeBadge: 'Külön karikák',
    figure: (
      <QV
        id="vq16"
        mode="apart"
        frame="Számok 500-ig"
        a="páros"
        b="5-re végződik"
        items={its([
          ['a', 64],
          ['a', 230],
          ['a', 118],
          ['b', 25],
          ['b', 345],
          ['b', 115],
          ['out', 91],
          ['out', 207]
        ])}
      />
    ),
    question: 'Miért nem ér össze a két karika?',
    options: ['Nincs olyan szám, amely páros, és 5-re végződik.', 'Mert kevés szám van a keretben.', 'Mert a páros számok nagyobbak.', 'Mert az 5 páros szám.'],
    correctAnswer: 0,
    explanation: 'Az 5-re végződő számok mind páratlanok. Közös rész nem lenne, ezért a karikák külön vannak.'
  },
  {
    id: 'venn-g3-q17',
    level: 2,
    questionTypeBadge: 'Karika a karikában',
    figure: (
      <QV
        id="vq17"
        mode="nested"
        frame="Számok 500-ig"
        a="páros"
        b="kerek tízesek"
        items={its([
          ['a', 46],
          ['a', 218],
          ['ab', 150],
          ['ab', 400],
          ['out', 35],
          ['out', 121]
        ])}
        top={<AskNum n={70} />}
      />
    ),
    question: 'Hová kerül a 70?',
    options: ['a belső, „kerek tízesek” karikába', 'csak a nagy, „páros” karikába', 'a karikákon kívülre', 'a kereten kívülre'],
    correctAnswer: 0,
    explanation: 'A 70 kerek tízes, és minden kerek tízes páros. A belső karikába kerül, ami a nagy karikán belül van.'
  },
  {
    id: 'venn-g3-q18',
    level: 2,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq18"
        frame="Számok 500-ig"
        a="páros"
        b="háromjegyű"
        items={its([
          ['a', 18],
          ['a', 72],
          ['a', 6],
          ['ab', 214],
          ['ab', 380],
          ['b', 135],
          ['out', 9],
          ['out', 63]
        ])}
      />
    ),
    question: 'Hány szám páros, de nem háromjegyű?',
    options: ['3', '5', '2', '1'],
    correctAnswer: 0,
    explanation: 'Páros, de nem háromjegyű: csak a „páros” karikában lévők. Ez a 18, a 72 és a 6: 3 szám.'
  },
  {
    id: 'venn-g3-q19',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq19" frame="Számok 500-ig" a="300-nál kisebb" b="páros" top={<AskNum n={300} />} />,
    question: 'Hová kerül a 300?',
    options: regionOpts('300-nál kisebb', 'páros', 'b'),
    correctAnswer: 0,
    explanation: 'A 300 nem kisebb 300-nál, hiszen egyenlő vele. De páros. Csak a „páros” karikába kerül.'
  },
  {
    id: 'venn-g3-q20',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq20" frame="Logikai lapok" a="kicsi" b="körök" top={<AskBlock b={B('kek', 'negyzet', false, true)} />} />,
    question: 'Hová kerül a kicsi, kék, lyukas négyzet?',
    options: regionOpts('kicsi', 'körök', 'a'),
    correctAnswer: 0,
    explanation: 'Kicsi, de nem kör, hanem négyzet. Csak a „kicsi” karikába kerül.'
  },

  // ----- 3. szint -----
  {
    id: 'venn-g3-q21',
    level: 3,
    questionTypeBadge: 'Címke',
    figure: (
      <QV
        id="vq21"
        frame="Logikai lapok"
        a="piros"
        b="?"
        items={its([
          ['a', B('piros', 'kor', true, true)],
          ['a', B('piros', 'negyzet', false, false)],
          ['ab', B('piros', 'haromszog', false, false)],
          ['ab', B('piros', 'haromszog', true, true)],
          ['b', B('kek', 'haromszog', true, false)],
          ['b', B('zold', 'haromszog', false, true)],
          ['out', B('sarga', 'kor', true, false)],
          ['out', B('kek', 'negyzet', false, true)]
        ])}
      />
    ),
    question: 'Mi lehet a jobb oldali karika címkéje?',
    options: ['háromszögek', 'kicsi', 'lyukas', 'nagy'],
    correctAnswer: 0,
    explanation: 'A jobb karikában csak háromszögek vannak, és minden háromszög ott van. A méretük és a lyukuk különböző.'
  },
  {
    id: 'venn-g3-q22',
    level: 3,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QV
        id="vq22"
        frame="Logikai lapok"
        a="nagy"
        b="lyukas"
        items={its([
          ['a', B('kek', 'kor', true, false)],
          ['a', B('sarga', 'negyzet', true, false)],
          ['ab', B('piros', 'haromszog', true, true)],
          ['ab', B('zold', 'kor', true, true)],
          ['b', B('piros', 'kor', false, true)],
          ['b', B('kek', 'negyzet', false, true)],
          ['b', B('sarga', 'haromszog', false, true)],
          ['out', B('zold', 'negyzet', false, false)]
        ])}
      />
    ),
    question: 'Hány lap van összesen a két karikában?',
    options: ['7', '9', '8', '5'],
    correctAnswer: 0,
    explanation: '2 lap csak a „nagy” karikában, 2 a közös részben, 3 csak a „lyukas” karikában. 2 + 2 + 3 = 7. A közös részt csak egyszer számold, a kinti lapot ne!'
  },
  {
    id: 'venn-g3-q23',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    figure: (
      <QV
        id="vq23"
        frame="Számok 500-ig"
        a="páros"
        b="háromjegyű"
        items={its([
          ['a', 24],
          ['a', 68],
          ['ab', 312],
          ['ab', 145],
          ['ab', 400],
          ['b', 207],
          ['out', 51]
        ])}
      />
    ),
    question: 'Melyik szám van rossz helyen?',
    options: ['145', '312', '207', '51'],
    correctAnswer: 0,
    explanation: 'A 145 háromjegyű, de nem páros (5 a vége). Nem a közös részben a helye, hanem csak a „háromjegyű” karikában.'
  },
  {
    id: 'venn-g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QV
        id="vq24"
        frame="A 3. osztály"
        a="focizik: 9"
        b="úszik: 7"
        extra={
          <g>
            <text x="120" y="108" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#4c1d95">4</text>
            <text x="54" y="108" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
          </g>
        }
      />
    ),
    question: '9 gyerek focizik, 7 gyerek úszik. 4 gyerek focizik is, úszik is. Hány gyerek csak focizik?',
    options: ['5', '9', '13', '3'],
    correctAnswer: 0,
    explanation: 'A 9 focizó között ott van az a 4 is, aki úszik is. 9 − 4 = 5 gyerek csak focizik.'
  },
  {
    id: 'venn-g3-q25',
    level: 3,
    questionTypeBadge: 'Karika a karikában',
    figure: (
      <QV
        id="vq25"
        mode="nested"
        frame="Számok 500-ig"
        a="páros"
        b="kerek tízesek"
        items={its([
          ['a', 46],
          ['a', 218],
          ['a', 304],
          ['ab', 70],
          ['ab', 150],
          ['ab', 400],
          ['out', 35],
          ['out', 121]
        ])}
      />
    ),
    question: 'Mit mutat meg az ábra?',
    options: ['Minden kerek tízes páros szám.', 'Minden páros szám kerek tízes.', 'Nincs páros kerek tízes.', 'A kerek tízesek páratlanok.'],
    correctAnswer: 0,
    explanation: 'A „kerek tízesek” karikája egészen a „páros” karikán belül van. Tehát minden kerek tízes páros. Fordítva nem igaz: a 46 páros, de nem kerek tízes.'
  },
  {
    id: 'venn-g3-q26',
    level: 3,
    questionTypeBadge: 'Közös rész',
    figure: <QV id="vq26" frame="Számok 500-ig" a="páratlan" b="250-nél nagyobb" extra={<text x="120" y="110" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>} />,
    question: 'Melyik szám kerül a közös részbe?',
    options: ['255', '250', '249', '260'],
    correctAnswer: 0,
    explanation: 'A 255 páratlan, és nagyobb 250-nél. A 250 és a 260 páros, a 249 nem nagyobb 250-nél.'
  },
  {
    id: 'venn-g3-q27',
    level: 3,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq27" frame="Számok 500-ig" a="páros" b="100-nál nagyobb" top={<TopNums nums={[120, 75, 304, 211, 48, 390]} />} />,
    question: 'Hány szám kerül ezek közül a közös részbe?',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: 'Páros és 100-nál nagyobb: 120, 304, 390. A 211 páratlan, a 48 kisebb 100-nál, a 75 egyik sem.'
  },
  {
    id: 'venn-g3-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QV
        id="vq28"
        frame="Logikai lapok"
        a="piros: 5 lap"
        b="lyukas: 4 lap"
        extra={
          <g>
            <text x="120" y="108" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#4c1d95">2</text>
          </g>
        }
      />
    ),
    question: 'A piros karikában 5 lap van, a lyukas karikában 4. A közös részben 2 lap van. Hány lap van összesen a két karikában?',
    options: ['7', '9', '11', '5'],
    correctAnswer: 0,
    explanation: 'Csak piros: 5 − 2 = 3. Csak lyukas: 4 − 2 = 2. A közös rész: 2. Összesen 3 + 2 + 2 = 7.'
  },
  {
    id: 'venn-g3-q29',
    level: 3,
    questionTypeBadge: 'Hová kerül?',
    figure: <QV id="vq29" frame="Számok 500-ig" a="páros" b="háromjegyű" extra={<text x="120" y="168" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>} />,
    question: 'Melyik szám kerül a karikákon kívülre?',
    options: ['45', '46', '145', '146'],
    correctAnswer: 0,
    explanation: 'Kívülre az kerül, ami nem páros és nem háromjegyű. A 45 páratlan és kétjegyű.'
  },
  {
    id: 'venn-g3-q30',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    figure: (
      <QV
        id="vq30"
        mode="nested"
        frame="Számok 500-ig"
        a="páros"
        b="kerek tízesek"
        items={its([
          ['a', 46],
          ['a', 218],
          ['a', 90],
          ['ab', 150],
          ['ab', 400],
          ['out', 35],
          ['out', 121]
        ])}
      />
    ),
    question: 'Melyik szám van rossz helyen?',
    options: ['90', '46', '150', '35'],
    correctAnswer: 0,
    explanation: 'A 90 kerek tízes, ezért a belső karikában lenne a helye. A 46 és a 218 jó helyen van: páros, de nem kerek tízes.'
  }
];

export const VennG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId="g3-grp-venn-quiz"
      subtopicId="venn-diagramok-es-halmazok"
      title="2. Venn-diagramok és halmazok – Kvíz"
      subtitle="30 feladat 3 szinten: elhelyezés a halmazábrában, közös rész, leolvasás, címke."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={VENN_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A halmazábra részei',
          items: ['karika: igaz rá a címke', 'közös rész: mindkét címke igaz', 'kívül, a kereten belül: egyik sem igaz']
        },
        {
          title: 'Hová kerül?',
          items: ['1. kérdés: igaz rá az első címke?', '2. kérdés: igaz rá a második?', 'Két „igen”: közös rész.']
        },
        {
          title: 'Leolvasás',
          items: ['„A karikában”: a közös résszel együtt!', '„Csak a karikában”: közös rész nélkül.', 'Összesen: a közös részt egyszer számold.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<VennG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<VennG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default VennG3Quiz;
