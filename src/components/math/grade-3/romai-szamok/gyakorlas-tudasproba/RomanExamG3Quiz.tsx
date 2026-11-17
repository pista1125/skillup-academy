import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { RomanExamG3Matcher } from './RomanExamG3Matcher';
import { RomanExamG3Sorter } from './RomanExamG3Sorter';
import { FONT, SERIF, RomanClock, BookG, PlaqueG, CalendarG, StickText, MirrorHalf } from '../romai-szamok-a-mindennapokban/RomanEverydayG3Parts';
import { SIGN_COLOR, toRoman, explainRoman, explainWrite } from './RomanExamG3Utils';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Kőtábla felirattal (római vagy arab szám, művelet). */
const TabletQ: React.FC<{ text: string; roman?: boolean }> = ({ text, roman = true }) => {
  const fs = text.length > 14 ? 17 : text.length > 9 ? 21 : 26;
  return (
    <QFig h={100}>
      <path d="M 30 86 L 30 30 Q 30 14 46 14 L 194 14 Q 210 14 210 30 L 210 86 Z" fill="#e7e5e4" stroke="#78716c" strokeWidth="2.5" />
      <text x="120" y="62" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#292524" fontFamily={roman ? SERIF : FONT}>
        {text}
      </text>
      <rect x="22" y="86" width="196" height="8" rx="2" fill="#a8a29e" />
    </QFig>
  );
};

/** Római pajzs számmal. */
const ShieldQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={130}>
    <rect x="80" y="12" width="80" height="106" rx="14" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="3" />
    <rect x="88" y="20" width="64" height="90" rx="10" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <circle cx="120" cy="65" r="29" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
    <text x="120" y="71" textAnchor="middle" fontSize={text.length > 3 ? 14 : 22} fontWeight="bold" fill="#7f1d1d" fontFamily={SERIF}>{text}</text>
  </QFig>
);

/** Jelkártyák sora (egy lehet "?"). Egybetűs kártya a jel színével, többbetűs semleges kékkel. */
const TilesQ: React.FC<{ tiles: string[]; caption?: string }> = ({ tiles, caption }) => {
  const ws = tiles.map((t) => Math.max(46, t.length * 15 + 14));
  const gap = 8;
  const total = ws.reduce((s, w) => s + w, 0) + gap * (tiles.length - 1);
  const k = Math.min(1, 220 / total);
  let x = 120 - (total * k) / 2;
  return (
    <QFig h={caption ? 104 : 86}>
      {tiles.map((t, i) => {
        const w = ws[i] * k;
        const c = t === '?' ? UNK : t.length === 1 ? SIGN_COLOR[t] ?? '#1e3a8a' : '#1e3a8a';
        const x0 = x;
        x += w + gap * k;
        return (
          <g key={i}>
            <rect x={x0} y={18} width={w} height={50} rx={8} fill="#fff" stroke={c} strokeWidth="2.5" />
            <text x={x0 + w / 2} y={52} textAnchor="middle" fontSize={(t.length === 1 ? 26 : 20) * k} fontWeight="bold" fill={c} fontFamily={SERIF}>
              {t}
            </text>
          </g>
        );
      })}
      {caption && (
        <text x="120" y="92" textAnchor="middle" fontSize="11" fill="#475569">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Vonat kocsikkal – számsorozat, egy kocsin "?". */
const TrainQ: React.FC<{ cars: string[] }> = ({ cars }) => {
  const n = cars.length;
  const w = Math.min(48, (214 - 30) / n - 4);
  return (
    <QFig h={96}>
      <rect x="10" y="30" width="26" height="36" rx="4" fill="#334155" />
      <rect x="14" y="20" width="10" height="12" fill="#334155" />
      {cars.map((c, i) => {
        const x = 40 + i * (w + 4);
        return (
          <g key={i}>
            <rect x={x} y={30} width={w} height={36} rx={5} fill={c === '?' ? '#fee2e2' : '#dbeafe'} stroke={c === '?' ? UNK : '#1d4ed8'} strokeWidth="2" />
            <text x={x + w / 2} y={54} textAnchor="middle" fontSize={Math.min(15, (w - 6) / (c.length * 0.75))} fontWeight="bold" fill={c === '?' ? UNK : '#1e3a8a'} fontFamily={SERIF}>
              {c}
            </text>
            <circle cx={x + 10} cy={70} r={5} fill="#1e293b" />
            <circle cx={x + w - 10} cy={70} r={5} fill="#1e293b" />
          </g>
        );
      })}
      <line x1="6" y1="78" x2="234" y2="78" stroke="#64748b" strokeWidth="2" />
    </QFig>
  );
};

/** Két szám összehasonlítása, köztük "?". */
const CompareQ: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={90}>
    <rect x="16" y="20" width="88" height="48" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
    <text x="60" y="52" textAnchor="middle" fontSize={a.length > 5 ? 16 : 22} fontWeight="bold" fill="#5b21b6" fontFamily={SERIF}>{a}</text>
    <circle cx="120" cy="44" r="15" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="120" y="51" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <rect x="136" y="20" width="88" height="48" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
    <text x="180" y="52" textAnchor="middle" fontSize={b.length > 5 ? 16 : 22} fontWeight="bold" fill="#5b21b6" fontFamily={SERIF}>{b}</text>
  </QFig>
);

/** Számegyenes lo..hi, 10 egyenlő részre osztva; a végpontok és a kerek tízesek római felirattal; a pont helyén "?". */
const LineQ: React.FC<{ lo: number; hi: number; at: number; labelsEvery?: number }> = ({ lo, hi, at, labelsEvery }) => {
  const x0 = 22;
  const x1 = 218;
  const xs = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const step = (hi - lo) / 10;
  return (
    <QFig h={104}>
      <line x1={x0} y1="50" x2={x1} y2="50" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, k) => {
        const v = lo + k * step;
        const lab = labelsEvery ? v % labelsEvery === 0 : k === 0 || k === 10;
        return (
          <g key={k}>
            <line x1={xs(v)} y1={k === 0 || k === 10 ? 40 : 44} x2={xs(v)} y2={k === 0 || k === 10 ? 60 : 56} stroke="#334155" strokeWidth={k === 0 || k === 10 ? 2 : 1.2} />
            {lab && v !== at && (
              <text x={xs(v)} y={labelsEvery && k % 2 === 0 ? 92 : 77} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#1e3a8a" fontFamily={SERIF}>
                {v === 0 ? '0' : toRoman(v)}
              </text>
            )}
          </g>
        );
      })}
      <circle cx={xs(at)} cy="50" r="5.5" fill={UNK} />
      <text x={xs(at)} y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

const ClockQ: React.FC<{ hour: number }> = ({ hour }) => (
  <QFig h={170}>
    <RomanClock cx={120} cy={85} r={76} hour={hour} minute={0} />
  </QFig>
);

const StickQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={90}>
    <StickText text={text} cx={120} y={22} h={46} />
  </QFig>
);

const MirrorQ: React.FC<{ text: string; hh?: number }> = ({ text, hh = 38 }) => (
  <QFig h={130}>
    <MirrorHalf text={text} cx={120} lineY={66} hh={hh} />
    <text x="120" y="108" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    <text x="120" y="124" textAnchor="middle" fontSize="9" fill="#64748b">a piros vonal a tükör</text>
  </QFig>
);

const CalQ: React.FC<{ main: string; top?: string; bottom?: string }> = ({ main, top = '2026.', bottom }) => (
  <QFig h={130}>
    <CalendarG x={70} y={12} w={100} top={top} main={main} bottom={bottom} />
  </QFig>
);

const TwoCalQ: React.FC<{ a: string; b: string; na: string; nb: string }> = ({ a, b, na, nb }) => (
  <QFig h={130}>
    <CalendarG x={22} y={10} w={86} top={na} main={a} />
    <CalendarG x={132} y={10} w={86} top={nb} main={b} />
    <text x="120" y="54" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

const BookQ: React.FC<{ label: string }> = ({ label }) => (
  <QFig h={120}>
    <BookG x={40} y={14} w={160} label={label} color="#7c3aed" />
  </QFig>
);

const PlaqueQ: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => (
  <QFig h={130}>
    <circle cx="120" cy="26" r="14" fill="#a8a29e" />
    <path d="M 96 76 Q 98 44 120 42 Q 142 44 144 76 Z" fill="#a8a29e" />
    <PlaqueG x={56} y={76} w={128} h={42} text={text} sub={sub} fill="#e7e5e4" stroke="#57534e" fs={17} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdés-gyártók (a helyes válasz mindig számolt, nem kézzel írt)
// ---------------------------------------------------------------------------
type L = DifficultyLevel;

const rom2ar = (id: string, level: L, n: number, wrong: number[], figure?: React.ReactNode, question?: string): QuizQuestion => ({
  id,
  level,
  questionTypeBadge: 'Római → arab',
  figure,
  question: question ?? `Mennyi ez arab számmal: ${toRoman(n)}?`,
  options: [String(n), ...wrong.map(String)],
  correctAnswer: 0,
  explanation: `${explainRoman(n)}.`
});

const ar2rom = (id: string, level: L, n: number, wrong: string[], figure?: React.ReactNode): QuizQuestion => ({
  id,
  level,
  questionTypeBadge: 'Arab → római',
  figure,
  question: `Hogyan írjuk római számmal: ${n}?`,
  options: [toRoman(n), ...wrong],
  correctAnswer: 0,
  explanation: `${explainWrite(n)}.`
});

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROMAN_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // ============================ 1. szint ============================
  {
    id: 'rex-1',
    level: 1,
    questionTypeBadge: 'Jelek',
    figure: <TilesQ tiles={['L']} caption="L = ?" />,
    question: 'Mennyit ér az L?',
    options: ['50', '5', '100', '10'],
    correctAnswer: 0,
    explanation: 'Az L 50-et ér. (V = 5, X = 10, C = 100.)'
  },
  {
    id: 'rex-2',
    level: 1,
    questionTypeBadge: 'Jelek',
    figure: <TilesQ tiles={['C']} caption="C = ?" />,
    question: 'Mennyit ér a C?',
    options: ['100', '10', '50', '1000'],
    correctAnswer: 0,
    explanation: 'A C 100-at ér. Ez a legnagyobb jel, amit tanultunk.'
  },
  {
    id: 'rex-3',
    level: 1,
    questionTypeBadge: 'Jelek',
    question: 'Melyik jel ér 10-et?',
    options: ['X', 'V', 'L', 'I'],
    correctAnswer: 0,
    explanation: 'Az X ér 10-et. A V 5, az L 50, az I 1.'
  },
  {
    id: 'rex-4',
    level: 1,
    questionTypeBadge: 'Jelek',
    question: 'Melyik jel ér 5-öt?',
    options: ['V', 'X', 'I', 'L'],
    correctAnswer: 0,
    explanation: 'A V ér 5-öt. Az L 50-et ér, azt ne keverd vele!'
  },
  rom2ar('rex-5', 1, 6, [4, 7, 5], <TabletQ text="VI" />),
  rom2ar('rex-6', 1, 9, [11, 8, 10], <TabletQ text="IX" />),
  rom2ar('rex-7', 1, 12, [7, 21, 11], <TabletQ text="XII" />),
  rom2ar('rex-8', 1, 15, [6, 51, 16], <ShieldQ text="XV" />),
  rom2ar('rex-9', 1, 20, [2, 11, 10]),
  rom2ar('rex-10', 1, 24, [26, 25, 23], <ShieldQ text="XXIV" />),
  rom2ar('rex-11', 1, 30, [3, 20, 33]),
  rom2ar('rex-12', 1, 36, [34, 46, 35], <TabletQ text="XXXVI" />),
  ar2rom('rex-13', 1, 4, ['IIII', 'VI', 'IIV'], <TabletQ text="4 = ?" roman={false} />),
  ar2rom('rex-14', 1, 7, ['VIII', 'IIIX', 'VI']),
  ar2rom('rex-15', 1, 11, ['IX', 'VVI', 'XII']),
  ar2rom('rex-16', 1, 19, ['IXX', 'XVIIII', 'XXI']),
  ar2rom('rex-17', 1, 25, ['VXX', 'XXIV', 'XXVI'], <TabletQ text="25 = ?" roman={false} />),
  ar2rom('rex-18', 1, 50, ['C', 'XXXXX', 'V'], <TabletQ text="50 = ?" roman={false} />),
  {
    id: 'rex-19',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Legfeljebb hány egyforma jel állhat egymás mellett?',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 3: III = 3, XXX = 30. A IIII helyett IV-et írunk.'
  },
  {
    id: 'rex-20',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Melyik jelet nem írjuk soha kétszer egymás mellé?',
    options: ['V', 'I', 'X', 'C'],
    correctAnswer: 0,
    explanation: 'A V-t nem ismételjük: V + V = X. (Az L-t sem: L + L = C.)'
  },
  {
    id: 'rex-21',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={3} />,
    question: 'Hány órát mutat az óra?',
    options: ['3 órát', '9 órát', '4 órát', '2 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató (piros) a III-on áll: 1 + 1 + 1 = 3. Ez 3 óra.'
  },
  {
    id: 'rex-22',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={6} />,
    question: 'Hány órát mutat az óra?',
    options: ['6 órát', '4 órát', '5 órát', '12 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a VI-on áll: 5 + 1 = 6. Ez 6 óra.'
  },
  {
    id: 'rex-23',
    level: 1,
    questionTypeBadge: 'Dátum',
    figure: <CalQ main="VII. 4." bottom="hónap: ?" />,
    question: 'Melyik hónap van a naptárlapon?',
    options: ['július', 'június', 'augusztus', 'május'],
    correctAnswer: 0,
    explanation: 'VII = 5 + 2 = 7. A 7. hónap a július.'
  },
  {
    id: 'rex-24',
    level: 1,
    questionTypeBadge: 'Sorszám',
    figure: <PlaqueQ text="II. András" sub="király" />,
    question: 'Hogyan olvassuk a táblát?',
    options: ['második András', 'kettő András', 'tizenegyedik András', 'harmadik András'],
    correctAnswer: 0,
    explanation: 'II = 2. A pont miatt sorszám: második András.'
  },
  {
    id: 'rex-25',
    level: 1,
    questionTypeBadge: 'Pálcika',
    question: 'Hány pálcika kell a XX kirakásához?',
    options: ['4', '2', '20', '3'],
    correctAnswer: 0,
    explanation: 'Egy X 2 pálcika. Két X: 2 + 2 = 4 pálcika.'
  },
  {
    id: 'rex-26',
    level: 1,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VI" hh={42} />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Melyik szám lesz belőle?',
    options: ['XI', 'VI', 'IX', 'XII'],
    correctAnswer: 0,
    explanation: 'A V-ből a tükörképével X lesz, az I marad. Ez XI = 11.'
  },
  {
    id: 'rex-27',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="VIII" b="XI" />,
    question: 'Melyik a nagyobb?',
    options: ['XI', 'VIII', 'Egyenlők.', 'Nem lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'VIII = 8, XI = 11. A 11 a nagyobb. (A hosszabb írás nem jelent nagyobb számot!)'
  },
  {
    id: 'rex-28',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="IV" b="VI" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '+'],
    correctAnswer: 0,
    explanation: 'IV = 4, VI = 6. 4 < 6, ezért IV < VI.'
  },
  {
    id: 'rex-29',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <TrainQ cars={['XVII', 'XVIII', 'XIX', '?']} />,
    question: 'Melyik szám jön a XIX után?',
    options: ['XX', 'XVIII', 'XXI', 'IXX'],
    correctAnswer: 0,
    explanation: 'XIX = 19. Utána a 20 jön: XX.'
  },
  {
    id: 'rex-30',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <TilesQ tiles={['XII', 'IX', 'XV', 'XI']} />,
    question: 'Melyik a legkisebb szám?',
    options: ['IX', 'XI', 'XII', 'XV'],
    correctAnswer: 0,
    explanation: 'XII = 12, IX = 9, XV = 15, XI = 11. A legkisebb a 9: IX.'
  },

  // ============================ 2. szint ============================
  rom2ar('rex-31', 2, 34, [36, 44, 33], <TabletQ text="XXXIV" />),
  rom2ar('rex-32', 2, 46, [66, 64, 56], <ShieldQ text="XLVI" />),
  rom2ar('rex-33', 2, 72, [52, 27, 70], <TabletQ text="LXXII" />),
  rom2ar('rex-34', 2, 88, [83, 58, 78], <TabletQ text="LXXXVIII" />),
  rom2ar('rex-35', 2, 93, [83, 97, 73]),
  rom2ar('rex-36', 2, 49, [51, 41, 59], <ShieldQ text="XLIX" />),
  rom2ar('rex-37', 2, 54, [56, 46, 64]),
  rom2ar('rex-38', 2, 29, [31, 28, 21]),
  ar2rom('rex-39', 2, 38, ['XXXIIX', 'XXVIII', 'XXXVII']),
  ar2rom('rex-40', 2, 44, ['XXXXIV', 'XLVI', 'IVXL'], <TabletQ text="44 = ?" roman={false} />),
  ar2rom('rex-41', 2, 59, ['LXI', 'LVIIII', 'IXL'], <TabletQ text="59 = ?" roman={false} />),
  ar2rom('rex-42', 2, 67, ['LXIIV', 'XLVII', 'LXVIII']),
  ar2rom('rex-43', 2, 90, ['LXXXX', 'CX', 'IC'], <TabletQ text="90 = ?" roman={false} />),
  ar2rom('rex-44', 2, 83, ['XXCIII', 'LXXIII', 'LXXXII']),
  ar2rom('rex-45', 2, 100, ['XXXXXXXXXX', 'LL', 'XC'], <TabletQ text="100 = ?" roman={false} />),
  {
    id: 'rex-46',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="XL" b="LX" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '–'],
    correctAnswer: 0,
    explanation: 'XL = 50 – 10 = 40, LX = 50 + 10 = 60. 40 < 60.'
  },
  {
    id: 'rex-47',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="XLIX" b="LI" />,
    question: 'Melyik a nagyobb?',
    options: ['LI', 'XLIX', 'Egyenlők.', 'Nem lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'XLIX = 40 + 9 = 49, LI = 50 + 1 = 51. Az LI a nagyobb, pedig rövidebb!'
  },
  {
    id: 'rex-48',
    level: 2,
    questionTypeBadge: 'Sorrend',
    figure: <TilesQ tiles={['XXXV', 'LIII', 'XLII']} />,
    question: 'Melyik a helyes növekvő sorrend?',
    options: ['XXXV, XLII, LIII', 'XLII, XXXV, LIII', 'LIII, XLII, XXXV', 'XXXV, LIII, XLII'],
    correctAnswer: 0,
    explanation: 'XXXV = 35, XLII = 42, LIII = 53. Növekvő: 35, 42, 53.'
  },
  {
    id: 'rex-49',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    figure: <TrainQ cars={['?', 'XL', 'XLI']} />,
    question: 'Melyik szám áll közvetlenül az XL előtt?',
    options: ['XXXIX', 'XLI', 'XXXX', 'IXL'],
    correctAnswer: 0,
    explanation: 'XL = 40. Előtte a 39 áll: XXX + IX = XXXIX.'
  },
  {
    id: 'rex-50',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik szám jön a LXXIX után?',
    options: ['LXXX', 'LXXXI', 'LXXVIII', 'XXC'],
    correctAnswer: 0,
    explanation: 'LXXIX = 70 + 9 = 79. Utána a 80 jön: L + XXX = LXXX.'
  },
  {
    id: 'rex-51',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Melyik NEM szabályos római szám?',
    options: ['IC', 'XC', 'IX', 'XL'],
    correctAnswer: 0,
    explanation: 'Az I csak a V és az X előtt állhat. A 99 helyesen XCIX. A XC, IX, XL mind szabályos.'
  },
  {
    id: 'rex-52',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Melyik a 40 helyes római alakja?',
    options: ['XL', 'XXXX', 'LX', 'XXL'],
    correctAnswer: 0,
    explanation: 'Négy X nem állhat egymás mellett. 40 = 50 – 10 = XL. (Az LX 60.)'
  },
  {
    id: 'rex-53',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={10} />,
    question: 'Hány órát mutat az óra?',
    options: ['10 órát', '11 órát', '9 órát', '2 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató az X-en áll. X = 10, tehát 10 óra.'
  },
  {
    id: 'rex-54',
    level: 2,
    questionTypeBadge: 'Dátum',
    question: 'Hogyan írjuk: 2026. október 6.?',
    options: ['2026. X. 6.', '2026. XI. 6.', '2026. IX. 6.', '2026. X. VI.'],
    correctAnswer: 0,
    explanation: 'Az október a 10. hónap: X. A napot arab számmal írjuk: 6.'
  },
  {
    id: 'rex-55',
    level: 2,
    questionTypeBadge: 'Sorszám',
    question: 'Budapest utolsó kerülete a 23. kerület. Hogyan írjuk római számmal?',
    options: ['XXIII. kerület', 'XXXII. kerület', 'XIIIX. kerület', 'XIII. kerület'],
    correctAnswer: 0,
    explanation: '23 = 20 + 3 = XX + III = XXIII.'
  },
  {
    id: 'rex-56',
    level: 2,
    questionTypeBadge: 'Könyv',
    figure: <BookQ label="XXXVII." />,
    question: 'Hányadik fejezetnél van nyitva a könyv?',
    options: ['a 37.', 'a 33.', 'a 39.', 'a 27.'],
    correctAnswer: 0,
    explanation: 'XXXVII = XXX + VII = 30 + 7 = 37.'
  },
  {
    id: 'rex-57',
    level: 2,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="IX-II=X" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['IX + I = X', 'IX – I = X', 'X – II = X', 'IX + II = X'],
    correctAnswer: 0,
    explanation: 'Most 9 – 2 = 10, hamis. Vegyél el egy I-t a II-ből, és tedd a mínuszra: 9 + 1 = 10.'
  },
  {
    id: 'rex-58',
    level: 2,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XI-I=XIII" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XI + I = XII', 'XI – I = XII', 'XI + I = XIII', 'XII – I = XIII'],
    correctAnswer: 0,
    explanation: 'Most 11 – 1 = 13, hamis. Vegyél el egy I-t a XIII-ból, és tedd a mínuszra: 11 + 1 = 12.'
  },
  {
    id: 'rex-59',
    level: 2,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VIII" />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Melyik szám lesz belőle?',
    options: ['XIII', 'VIII', 'XVIII', 'XIIII'],
    correctAnswer: 0,
    explanation: 'A V-ből X lesz, a három I marad. XIII = 13.'
  },
  {
    id: 'rex-60',
    level: 2,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VVI" />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Melyik szám lesz belőle?',
    options: ['XXI', 'VVI', 'XXII', 'XIX'],
    correctAnswer: 0,
    explanation: 'Mindkét V-ből X lesz, az I marad. XXI = 21.'
  },

  // ============================ 3. szint ============================
  {
    id: 'rex-61',
    level: 3,
    questionTypeBadge: 'Művelet',
    figure: <TabletQ text="XXV + XIV = ?" />,
    question: 'Mennyi az eredmény arab számmal?',
    options: ['39', '41', '31', '49'],
    correctAnswer: 0,
    explanation: 'XXV = 25, XIV = 14. 25 + 14 = 39.'
  },
  {
    id: 'rex-62',
    level: 3,
    questionTypeBadge: 'Művelet',
    figure: <TabletQ text="L – XII = ?" />,
    question: 'Mennyi az eredmény arab számmal?',
    options: ['38', '62', '48', '40'],
    correctAnswer: 0,
    explanation: 'L = 50, XII = 12. 50 – 12 = 38.'
  },
  {
    id: 'rex-63',
    level: 3,
    questionTypeBadge: 'Művelet',
    question: 'Mennyi XV · IV arab számmal?',
    options: ['60', '90', '19', '64'],
    correctAnswer: 0,
    explanation: 'XV = 15, IV = 4. 15 · 4 = 60. (Ha a IV-et 6-nak olvasod, 90 jön ki – az hibás.)'
  },
  {
    id: 'rex-64',
    level: 3,
    questionTypeBadge: 'Művelet',
    figure: <TabletQ text="C – XLV = ?" />,
    question: 'Mennyi az eredmény arab számmal?',
    options: ['55', '65', '45', '75'],
    correctAnswer: 0,
    explanation: 'C = 100, XLV = 40 + 5 = 45. 100 – 45 = 55.'
  },
  {
    id: 'rex-65',
    level: 3,
    questionTypeBadge: 'Művelet',
    question: 'Számold ki, és írd római számmal: XVIII + XXVI',
    options: ['XLIV', 'XXXXIV', 'XLVI', 'XXXIV'],
    correctAnswer: 0,
    explanation: 'XVIII = 18, XXVI = 26. 18 + 26 = 44 = XL + IV = XLIV.'
  },
  {
    id: 'rex-66',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'Egy könyv LX oldalas. Noel már elolvasott XXV oldalt. Hány oldal van még hátra?',
    options: ['35', '85', '45', '25'],
    correctAnswer: 0,
    explanation: 'LX = 60, XXV = 25. 60 – 25 = 35 oldal van hátra.'
  },
  {
    id: 'rex-67',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'Egy csapatban XLVIII római katona volt. Jött még XII katona. Hányan lettek? (római számmal)',
    options: ['LX', 'LXX', 'LVI', 'XLX'],
    correctAnswer: 0,
    explanation: 'XLVIII = 48, XII = 12. 48 + 12 = 60 = LX.'
  },
  {
    id: 'rex-68',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'A kertben XC almafa áll IX egyforma sorban. Hány fa van egy sorban?',
    options: ['10', '9', '81', '11'],
    correctAnswer: 0,
    explanation: 'XC = 90, IX = 9. 90 : 9 = 10 fa van egy sorban.'
  },
  {
    id: 'rex-69',
    level: 3,
    questionTypeBadge: 'Kirakó',
    figure: <TilesQ tiles={['X', 'V', 'I']} caption="Mindhárom kártyát használd!" />,
    question: 'Melyik a legnagyobb szám, amit mindhárom kártyával kirakhatsz?',
    options: ['XVI', 'XIV', 'VXI', 'IXV'],
    correctAnswer: 0,
    explanation: 'Szabályos lehet: XVI = 16 és XIV = 14. A VXI és az IXV nem szabályos. A legnagyobb a XVI.'
  },
  {
    id: 'rex-70',
    level: 3,
    questionTypeBadge: 'Kirakó',
    figure: <TilesQ tiles={['X', 'V', 'I']} caption="Mindhárom kártyát használd!" />,
    question: 'Melyik a legkisebb szám, amit mindhárom kártyával kirakhatsz?',
    options: ['XIV', 'XVI', 'IVX', 'VIX'],
    correctAnswer: 0,
    explanation: 'Szabályos alak csak kettő van: XVI = 16 és XIV = 14. A kisebb a XIV.'
  },
  {
    id: 'rex-71',
    level: 3,
    questionTypeBadge: 'Számsor',
    figure: <TrainQ cars={['X', 'XX', 'XXX', '?', 'L']} />,
    question: 'Melyik szám hiányzik a sorból?',
    options: ['XL', 'XXXX', 'LX', 'XXXL'],
    correctAnswer: 0,
    explanation: 'A szabály: +10. 10, 20, 30, 40, 50. A 40 = XL (négy X nem lehet).'
  },
  {
    id: 'rex-72',
    level: 3,
    questionTypeBadge: 'Számsor',
    figure: <TrainQ cars={['V', 'X', 'XV', 'XX', '?']} />,
    question: 'Melyik szám jön a sorban?',
    options: ['XXV', 'XXX', 'VXX', 'XXIV'],
    correctAnswer: 0,
    explanation: 'A szabály: +5. 5, 10, 15, 20, 25. A 25 = XX + V = XXV.'
  },
  {
    id: 'rex-73',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQ lo={0} hi={100} at={70} labelsEvery={10} />,
    question: 'Melyik szám helyén áll a piros pont?',
    options: ['LXX', 'XXC', 'LX', 'LXXX'],
    correctAnswer: 0,
    explanation: 'A pont a LX után a következő kerek tízesen van: 70 = L + XX = LXX.'
  },
  {
    id: 'rex-74',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQ lo={50} hi={60} at={55} />,
    question: 'Melyik szám helyén áll a piros pont?',
    options: ['LV', 'VL', 'LIV', 'LVI'],
    correctAnswer: 0,
    explanation: 'L = 50, LX = 60. A pont pont középen van: 55 = L + V = LV.'
  },
  {
    id: 'rex-75',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XVI-I=XVIII" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XVI + I = XVII', 'XVI – I = XVII', 'XVI + I = XVIII', 'XV – I = XVIII'],
    correctAnswer: 0,
    explanation: 'Most 16 – 1 = 18, hamis. A XVIII egyik I-jét tedd a mínuszra: 16 + 1 = 17.'
  },
  {
    id: 'rex-76',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XIV-IV=VIII" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XIV – VI = VIII', 'XIV – IV = VII', 'XV – IV = VIII', 'XIV + IV = VIII'],
    correctAnswer: 0,
    explanation: 'Most 14 – 4 = 8, hamis (az 10). A IV-ben az I-t tedd át a V másik oldalára: VI. 14 – 6 = 8.'
  },
  {
    id: 'rex-77',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="III+III=IV" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['III + III = VI', 'III + II = IV', 'II + III = IV', 'III + III = IIII'],
    correctAnswer: 0,
    explanation: 'Most 3 + 3 = 4, hamis. A IV-ben az I-t tedd át a V másik oldalára: VI. 3 + 3 = 6.'
  },
  {
    id: 'rex-78',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XIII-II=XVI" />,
    question: 'Tegyél át egy pálcikát, hogy igaz legyen! Mi lesz belőle?',
    options: ['XIII + II = XV', 'XIII – II = XV', 'XIII + II = XVI', 'XII – II = XVI'],
    correctAnswer: 0,
    explanation: 'Most 13 – 2 = 16, hamis. A XVI-ból vedd ki az I-t (XV marad), és tedd a mínuszra: 13 + 2 = 15.'
  },
  {
    id: 'rex-79',
    level: 3,
    questionTypeBadge: 'Pálcika',
    question: 'Melyik szám kirakásához kell a legtöbb pálcika?',
    options: ['XXVIII', 'XXIII', 'LXX', 'XL'],
    correctAnswer: 0,
    explanation: 'XXVIII: 2 + 2 + 2 + 1 + 1 + 1 = 9. XXIII: 7. LXX: 6. XL: 4. A legtöbb a XXVIII.'
  },
  {
    id: 'rex-80',
    level: 3,
    questionTypeBadge: 'Pálcika',
    figure: <StickQ text="XIV+VI=XX" />,
    question: 'Hány pálcikából raktuk ki ezt az egyenlőséget?',
    options: ['16', '14', '12', '20'],
    correctAnswer: 0,
    explanation: 'XIV: 5, +: 2, VI: 3, =: 2, XX: 4. Összesen 5 + 2 + 3 + 2 + 4 = 16.'
  },
  {
    id: 'rex-81',
    level: 3,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VTV_" hh={40} />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Mennyi a kapott művelet eredménye?',
    options: ['20', '10', '2', '11'],
    correctAnswer: 0,
    explanation: 'A tükörképpel ez lesz: X + X = . 10 + 10 = 20.'
  },
  {
    id: 'rex-82',
    level: 3,
    questionTypeBadge: 'Tükrözés',
    figure: <MirrorQ text="VIITV_" hh={30} />,
    question: 'Tükrözd a pálcikákat a piros vonalra! Mennyi a kapott művelet eredménye?',
    options: ['22', '12', '17', '27'],
    correctAnswer: 0,
    explanation: 'A tükörképpel ez lesz: XII + X = . 12 + 10 = 22. (Tükrözés nélkül VII + V = 12 lenne.)'
  },
  {
    id: 'rex-83',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={8} />,
    question: 'Melyik számon áll a kismutató 4 óra múlva?',
    options: ['XII', 'IV', 'XI', 'IX'],
    correctAnswer: 0,
    explanation: 'Most 8 óra van (VIII). 8 + 4 = 12. A kismutató a XII-n lesz.'
  },
  {
    id: 'rex-84',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQ hour={2} />,
    question: 'Melyik számon állt a kismutató 3 órával korábban?',
    options: ['XI', 'V', 'I', 'IX'],
    correctAnswer: 0,
    explanation: 'Most 2 óra van (II). 3 órával korábban: 1 óra, 12 óra, 11 óra. A kismutató a XI-en állt.'
  },
  {
    id: 'rex-85',
    level: 3,
    questionTypeBadge: 'Dátum',
    figure: <TwoCalQ a="X. 3." b="XII. 3." na="Vilma" nb="Noel" />,
    question: 'Hány hónappal később van Noel születésnapja, mint Vilmáé?',
    options: ['2 hónappal', '3 hónappal', '1 hónappal', '10 hónappal'],
    correctAnswer: 0,
    explanation: 'X = 10 (október), XII = 12 (december). 12 – 10 = 2 hónap.'
  },
  {
    id: 'rex-86',
    level: 3,
    questionTypeBadge: 'Dátum',
    figure: <CalQ main="IX. 1." bottom="első tanítási nap" />,
    question: 'Ma van az iskola első napja. Hány hónap múlva lesz december 1.?',
    options: ['3 hónap', '2 hónap', '4 hónap', '9 hónap'],
    correctAnswer: 0,
    explanation: 'IX = 9 (szeptember). A december a 12. hónap. 12 – 9 = 3 hónap.'
  },
  {
    id: 'rex-87',
    level: 3,
    questionTypeBadge: 'Sorszám',
    question: 'Most a XXI. században élünk. Melyik század volt előtte?',
    options: ['a XX.', 'a XXII.', 'a XIX.', 'a XI.'],
    correctAnswer: 0,
    explanation: 'XXI = 21. Előtte a 20. század volt: XX.'
  },
  {
    id: 'rex-88',
    level: 3,
    questionTypeBadge: 'Sorszám',
    question: 'Egy futóversenyen XXIX. lettél. Hányan értek célba előtted?',
    options: ['28', '29', '30', '27'],
    correctAnswer: 0,
    explanation: 'XXIX = 29. Te a 29. vagy, előtted 29 – 1 = 28 futó ért célba.'
  },
  {
    id: 'rex-89',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szám van 40 és 50 között?',
    options: ['XLV', 'LXV', 'XXXV', 'LV'],
    correctAnswer: 0,
    explanation: 'XLV = 45, LXV = 65, XXXV = 35, LV = 55. Csak a 45 van 40 és 50 között.'
  },
  {
    id: 'rex-90',
    level: 3,
    questionTypeBadge: 'Művelet',
    question: 'A XC-ből elveszel X-et, aztán még egyszer X-et. Mennyi marad? (római számmal)',
    options: ['LXX', 'LXXX', 'L', 'XXC'],
    correctAnswer: 0,
    explanation: 'XC = 90. 90 – 10 = 80, 80 – 10 = 70. A 70 = LXX.'
  }
];

export const RomanExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId="g3-rom-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: jelek és szabályok, írás és olvasás 100-ig, sorrend, óra, dátum, pálcikás fejtörők."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • KVÍZ"
      questions={ROMAN_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A jelek',
          items: ['I = 1, V = 5, X = 10', 'L = 50, C = 100', 'Jobbra: hozzáadjuk (VI = 6)', 'Balra: elvesszük (IV = 4)']
        },
        {
          title: 'Szabályok',
          items: ['Csak így vonunk le: IV, IX, XL, XC', 'Legfeljebb 3 egyforma jel', 'V és L nem ismétlődik', '47 = XL + VII = XLVII']
        },
        {
          title: 'A mindennapokban',
          items: ['IV. Béla = negyedik Béla', 'XI. 17. = november 17.', 'Órán néha IIII = 4', 'Pálcika: I = 1, V = X = 2']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<RomanExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<RomanExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default RomanExamG3Quiz;
