import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SumChangesG3Matcher } from './SumChangesG3Matcher';
import { SumChangesG3Sorter } from './SumChangesG3Sorter';
import { INK, UNK, UP, QFig, NumBox, Coin, PriceTag, ChangeRowsFig, SumTableFig } from './SumChangesG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Két összeg egymás mellett, köztük „?” kör. */
const CompareFig: React.FC<{ l: [number, number]; r: [number, number] }> = ({ l, r }) => (
  <QFig h={64}>
    <NumBox cx={28} cy={32} v={l[0]} w={42} h={28} fs={15} fill="#dbeafe" stroke="#3b82f6" />
    <text x="56" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={84} cy={32} v={l[1]} w={42} h={28} fs={15} fill="#fef9c3" stroke="#ca8a04" />
    <circle cx="120" cy="32" r="11" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="120" y="37.5" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
    <NumBox cx={156} cy={32} v={r[0]} w={42} h={28} fs={15} fill="#dbeafe" stroke="#3b82f6" />
    <text x="184" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>
    <NumBox cx={212} cy={32} v={r[1]} w={42} h={28} fs={15} fill="#fef9c3" stroke="#ca8a04" />
  </QFig>
);

/** Két gyerek pénze: meglévő érmék + kapott érmék. */
const CoinRowsFig: React.FC<{ rows: { name: string; have: number[]; got: number[] }[] }> = ({ rows }) => (
  <QFig h={24 + rows.length * 46}>
    {rows.map((r, i) => {
      const y = 34 + i * 46;
      let x = 62;
      const els: React.ReactNode[] = [];
      r.have.forEach((c, k) => {
        els.push(<Coin key={`h${k}`} cx={x} cy={y} v={c} r={c >= 100 ? 17 : 14} />);
        x += c >= 100 ? 36 : 30;
      });
      els.push(<text key="p" x={x - 4} y={y + 6} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UP}>+</text>);
      x += 16;
      r.got.forEach((c, k) => {
        els.push(<Coin key={`g${k}`} cx={x} cy={y} v={c} r={c >= 100 ? 17 : 14} />);
        x += c >= 100 ? 36 : 30;
      });
      return (
        <g key={i}>
          <text x="10" y={y + 4} fontSize="12.5" fontWeight="bold" fill="#334155">{r.name}</text>
          {els}
        </g>
      );
    })}
  </QFig>
);

/** Persely egy összeggel, mellette a betett pénz. */
const Piggy: React.FC<{ x: number; y: number; text: string; color: string; add: string }> = ({ x, y, text, color, add }) => (
  <g>
    <ellipse cx={x + 44} cy={y + 30} rx="40" ry="26" fill={color} stroke="#475569" strokeWidth="1.6" />
    <circle cx={x + 84} cy={y + 26} r="9" fill={color} stroke="#475569" strokeWidth="1.6" />
    <circle cx={x + 86} cy={y + 26} r="1.6" fill="#475569" />
    <path d={`M ${x + 22} ${y + 8} L ${x + 26} ${y - 4} L ${x + 34} ${y + 6}`} fill={color} stroke="#475569" strokeWidth="1.6" />
    <rect x={x + 22} y={y + 52} width="8" height="9" fill={color} stroke="#475569" strokeWidth="1.4" />
    <rect x={x + 58} y={y + 52} width="8" height="9" fill={color} stroke="#475569" strokeWidth="1.4" />
    <rect x={x + 38} y={y + 4} width="16" height="3" rx="1.5" fill="#475569" />
    <text x={x + 44} y={y + 36} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{text}</text>
    <text x={x + 44} y={y - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UP}>{add}</text>
  </g>
);
const PiggiesFig: React.FC<{ a: string; b: string; add: string; names: [string, string] }> = ({ a, b, add, names }) => (
  <QFig h={118}>
    <Piggy x={14} y={30} text={a} color="#fbcfe8" add={add} />
    <Piggy x={130} y={30} text={b} color="#bae6fd" add={add} />
    <text x="58" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{names[0]}</text>
    <text x="174" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{names[1]}</text>
  </QFig>
);

/** Két nap vásárlása árcédulákkal. */
const TagRowsFig: React.FC<{ rows: { name: string; prices: number[] }[] }> = ({ rows }) => (
  <QFig h={20 + rows.length * 40}>
    {rows.map((r, i) => (
      <g key={i}>
        <text x="12" y={34 + i * 40} fontSize="12.5" fontWeight="bold" fill="#334155">{r.name}</text>
        {r.prices.map((p, k) => (
          <g key={k}>
            <PriceTag x={78 + k * 84} y={16 + i * 40} text={`${p} Ft`} w={70} fs={13} fill={k === 0 ? '#fef3c7' : '#e0f2fe'} />
            {k > 0 && <text x={78 + k * 84 - 8} y={34 + i * 40} textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+</text>}
          </g>
        ))}
      </g>
    ))}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SUM_CHANGES_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'scg3-q1',
    level: 1,
    questionTypeBadge: 'Egy tag nő',
    figure: <ChangeRowsFig rows={[[230, 150, 380], [330, 150, '?']]} changes={[['+100', null, '?']]} />,
    question: 'Az 1. tag 100-zal nőtt. Mennyi az új összeg?',
    options: ['480', '390', '380', '580'],
    correctAnswer: 0,
    explanation: 'Ha egy tag 100-zal nő, az összeg is 100-zal nő. 380 + 100 = 480.'
  },
  {
    id: 'scg3-q2',
    level: 1,
    questionTypeBadge: 'Hogyan változik?',
    figure: <ChangeRowsFig rows={[[146, 232, 378], [156, 232, '?']]} changes={[['+10', null, '?']]} />,
    question: 'Hogyan változik az összeg?',
    options: ['10-zel nő', '10-zel csökken', 'nem változik', '20-szal nő'],
    correctAnswer: 0,
    explanation: 'Az 1. tag 10-zel több lett, a 2. tag ugyanaz. Az összeg is 10-zel nő: 378 → 388.'
  },
  {
    id: 'scg3-q3',
    level: 1,
    questionTypeBadge: 'Egy tag csökken',
    figure: <ChangeRowsFig rows={[[415, 260, 675], [415, 250, '?']]} changes={[[null, '−10', '?']]} />,
    question: 'A 2. tag 10-zel csökkent. Mennyi az új összeg?',
    options: ['665', '685', '675', '565'],
    correctAnswer: 0,
    explanation: 'Ha egy tag 10-zel csökken, az összeg is 10-zel csökken. 675 − 10 = 665.'
  },
  {
    id: 'scg3-q4',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Az egyik tagot 100-zal növelem. A másikat nem változtatom. Mi lesz az összeggel?',
    options: ['100-zal nő', 'nem változik', '100-zal csökken', '200-zal nő'],
    correctAnswer: 0,
    explanation: 'Amennyivel nő a tag, annyival nő az összeg is. Most 100-zal.'
  },
  {
    id: 'scg3-q5',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: (
      <CoinRowsFig
        rows={[
          { name: 'Zsófi', have: [200, 20, 20], got: [100] },
          { name: 'Levi', have: [200, 20, 20], got: [100, 100] }
        ]}
      />
    ),
    question: 'Zsófinak és Levinek is 240 Ft-ja van. Zsófi kap 100 Ft-ot, Levi 200 Ft-ot. Kinek lesz több pénze?',
    options: ['Levinek, 100 Ft-tal', 'Zsófinak, 100 Ft-tal', 'Ugyanannyi lesz', 'Levinek, 200 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Az első tag (240 Ft) egyforma. Levi 100 Ft-tal többet kap, ezért neki 100 Ft-tal több lesz: 440 Ft és 340 Ft.'
  },
  {
    id: 'scg3-q6',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: '„Ha az egyik tagot 10-zel csökkentem, a másikat nem, akkor az összeg 10-zel nő.” Igaz ez?',
    options: ['Hamis: az összeg 10-zel csökken', 'Igaz', 'Hamis: az összeg nem változik', 'Hamis: az összeg 20-szal csökken'],
    correctAnswer: 0,
    explanation: 'Ha kevesebbet adok hozzá, kevesebb lesz az összeg. Például 240 + 130 = 370, de 240 + 120 = 360.'
  },
  {
    id: 'scg3-q7',
    level: 1,
    questionTypeBadge: 'Egy tag nő',
    figure: <ChangeRowsFig rows={[[500, 320, 820], [500, 321, '?']]} changes={[[null, '+1', '?']]} />,
    question: 'Mennyi az új összeg?',
    options: ['821', '822', '820', '831'],
    correctAnswer: 0,
    explanation: 'A 2. tag 1-gyel nőtt, ezért az összeg is 1-gyel nő: 820 + 1 = 821.'
  },
  {
    id: 'scg3-q8',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    figure: <ChangeRowsFig rows={[[146, 238, 384], [238, 146, '?']]} caption="A két tagot felcseréltük." />,
    question: 'Mennyi az összeg a felcserélés után?',
    options: ['384', '374', '284', '484'],
    correctAnswer: 0,
    explanation: 'Ha a tagokat felcseréled, az összeg nem változik. 238 + 146 = 384.'
  },
  {
    id: 'scg3-q9',
    level: 1,
    questionTypeBadge: 'Egy tag csökken',
    question: 'Két szám összege 600. Az egyik tagot 100-zal csökkentem. Mennyi lesz az összeg?',
    options: ['500', '700', '590', '600'],
    correctAnswer: 0,
    explanation: 'Ha egy tag 100-zal csökken, az összeg is 100-zal csökken: 600 − 100 = 500.'
  },
  {
    id: 'scg3-q10',
    level: 1,
    questionTypeBadge: 'Egy tag nő',
    figure: <ChangeRowsFig rows={[[318, 174, 492], [318, 184, '?']]} changes={[[null, '+10', '?']]} />,
    question: 'Mennyi az új összeg?',
    options: ['502', '492', '482', '592'],
    correctAnswer: 0,
    explanation: 'A 2. tag 10-zel nőtt. Az összeg is 10-zel nő: 492 + 10 = 502. Figyelj: itt átlépünk az 500-on!'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'scg3-q11',
    level: 2,
    questionTypeBadge: 'Mindkét tag nő',
    figure: <ChangeRowsFig rows={[[215, 132, 347], [225, 142, '?']]} changes={[['+10', '+10', '?']]} />,
    question: 'Mindkét tag 10-zel nőtt. Mennyi az új összeg?',
    options: ['367', '357', '347', '447'],
    correctAnswer: 0,
    explanation: 'Mindkét tag 10-zel nő, ez együtt 20. Az összeg 20-szal nő: 347 + 20 = 367.'
  },
  {
    id: 'scg3-q12',
    level: 2,
    questionTypeBadge: 'Nem változik',
    figure: <ChangeRowsFig rows={[[156, 167, 323], [166, 157, '?']]} changes={[['+10', '−10', '?']]} />,
    question: 'Mennyi az új összeg?',
    options: ['323', '343', '333', '313'],
    correctAnswer: 0,
    explanation: 'Az 1. tag 10-zel nő, a 2. tag 10-zel csökken. +10 és −10 együtt 0. Az összeg marad 323.'
  },
  {
    id: 'scg3-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[125, 147]} r={[225, 147]} />,
    question: 'Számolás nélkül: melyik igaz?',
    options: ['125 + 147 < 225 + 147', '125 + 147 > 225 + 147', '125 + 147 = 225 + 147', 'Csak számolással lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'A 2. tag ugyanaz (147). Az 1. tag jobbra 100-zal nagyobb. Ezért a jobb oldali összeg nagyobb.'
  },
  {
    id: 'scg3-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[138, 179]} r={[138, 169]} />,
    question: 'Számolás nélkül: melyik igaz?',
    options: ['138 + 179 > 138 + 169', '138 + 179 < 138 + 169', '138 + 179 = 138 + 169', 'Csak számolással lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'Az 1. tag ugyanaz. A 2. tag bal oldalon 10-zel nagyobb (179 és 169). Ezért a bal oldali összeg nagyobb: 317 > 307.'
  },
  {
    id: 'scg3-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig l={[245, 180]} r={[255, 170]} />,
    question: 'Számolás nélkül: melyik igaz?',
    options: ['245 + 180 = 255 + 170', '245 + 180 < 255 + 170', '245 + 180 > 255 + 170', 'Csak számolással lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'Jobbra az 1. tag 10-zel több, a 2. tag 10-zel kevesebb. Az összeg nem változik: mindkettő 425.'
  },
  {
    id: 'scg3-q16',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <SumTableFig a={[120, 130, 140, 150]} b={[280, 270, 260, '?']} s={[400, 400, 400, 400]} />,
    question: 'Az összeg mindig 400. Melyik szám hiányzik?',
    options: ['250', '240', '260', '150'],
    correctAnswer: 0,
    explanation: 'Az 1. tag 10-zel nő, ezért a 2. tagnak 10-zel kell csökkennie: 260 − 10 = 250. Ellenőrzés: 150 + 250 = 400.'
  },
  {
    id: 'scg3-q17',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Mindkét tagot 100-zal növelem. Hogyan változik az összeg?',
    options: ['200-zal nő', '100-zal nő', 'nem változik', '10-zel nő'],
    correctAnswer: 0,
    explanation: 'Az egyik tag miatt 100-zal, a másik miatt még 100-zal nő. Együtt 200-zal.'
  },
  {
    id: 'scg3-q18',
    level: 2,
    questionTypeBadge: 'Mindkét tag változik',
    figure: <ChangeRowsFig rows={[[250, 310, 560], [350, 300, '?']]} changes={[['+100', '−10', '?']]} />,
    question: 'Mennyi az új összeg?',
    options: ['650', '670', '560', '660'],
    correctAnswer: 0,
    explanation: 'Az 1. tag miatt 100-zal több, a 2. tag miatt 10-zel kevesebb. 560 + 100 = 660, 660 − 10 = 650.'
  },
  {
    id: 'scg3-q19',
    level: 2,
    questionTypeBadge: 'Okos számolás',
    question: 'Melyik összeg ugyanannyi, mint 198 + 147?',
    options: ['200 + 145', '200 + 147', '200 + 149', '190 + 147'],
    correctAnswer: 0,
    explanation: 'A 198-hoz 2-t adok, a 147-ből 2-t elveszek. Az összeg nem változik: 200 + 145 = 345.'
  },
  {
    id: 'scg3-q20',
    level: 2,
    questionTypeBadge: 'Nem változik',
    figure: <ChangeRowsFig rows={[[300, 180, 480], [320, 160, '?']]} changes={[['+20', '−20', '?']]} />,
    question: 'Mennyi az új összeg?',
    options: ['480', '520', '440', '500'],
    correctAnswer: 0,
    explanation: 'Amennyit az 1. tag kapott (20), annyit a 2. tag elvesztett. Az összeg marad 480.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'scg3-q21',
    level: 3,
    questionTypeBadge: 'Mi változott?',
    figure: <ChangeRowsFig rows={[[146, 157, 303], [166, 177, '?']]} changes={[['?', '?', '?']]} />,
    question: '146 + 157 = 303. Mennyi 166 + 177?',
    options: ['343', '323', '333', '303'],
    correctAnswer: 0,
    explanation: 'Mindkét tag 20-szal nőtt (146 → 166, 157 → 177). Az összeg 40-nel nő: 303 + 40 = 343.'
  },
  {
    id: 'scg3-q22',
    level: 3,
    questionTypeBadge: 'Persely',
    figure: <PiggiesFig a="165 Ft" b="265 Ft" add="+300 Ft" names={['Nóra', 'Dávid']} />,
    question: 'Nórának 165 Ft-ja, Dávidnak 265 Ft-ja van. Mindketten 300 Ft-ot tesznek a perselybe. Mennyivel lesz több Dávidnak?',
    options: ['100 Ft-tal', '300 Ft-tal', '400 Ft-tal', '200 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Mindketten ugyanannyit tesznek be, ezért a különbség marad: 265 − 165 = 100. Dávidnak 565 Ft, Nórának 465 Ft lesz.'
  },
  {
    id: 'scg3-q23',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás IGAZ?',
    options: [
      'Ha mindkét tagot 10-zel csökkentem, az összeg 20-szal csökken.',
      'Ha az egyik tagot 100-zal növelem, az összeg nem változik.',
      'Ha az egyik tagot 10-zel csökkentem, az összeg 10-zel nő.',
      'Ha az egyik tag 10-zel nő, a másik 10-zel csökken, az összeg 20-szal nő.'
    ],
    correctAnswer: 0,
    explanation: 'Két tag csökken 10-zel: az összeg 10-zel és még 10-zel, vagyis 20-szal lesz kevesebb.'
  },
  {
    id: 'scg3-q24',
    level: 3,
    questionTypeBadge: 'Változtasd meg!',
    question: '157 + 268 = 425. Melyik összeg lesz 10-zel nagyobb?',
    options: ['167 + 268', '147 + 268', '167 + 258', '167 + 278'],
    correctAnswer: 0,
    explanation: 'Az 1. tag 10-zel nő, a 2. ugyanaz: 167 + 268 = 435. A 167 + 258 ugyanannyi (425), a 167 + 278 20-szal nagyobb.'
  },
  {
    id: 'scg3-q25',
    level: 3,
    questionTypeBadge: 'Változtasd meg!',
    question: 'Melyik összeg 100-zal kisebb, mint 274 + 238?',
    options: ['174 + 238', '264 + 238', '274 + 338', '174 + 138'],
    correctAnswer: 0,
    explanation: 'Csak az egyik tagot csökkentsd 100-zal: 174 + 238 = 412. Az eredeti 512. A 174 + 138 már 200-zal kisebb.'
  },
  {
    id: 'scg3-q26',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <TagRowsFig
        rows={[
          { name: 'hétfő', prices: [95, 330] },
          { name: 'kedd', prices: [195, 230] }
        ]}
      />
    ),
    question: 'Kata hétfőn és kedden is két dolgot vett. Melyik nap költött többet?',
    options: ['Ugyanannyit költött.', 'Kedden 100 Ft-tal többet.', 'Hétfőn 100 Ft-tal többet.', 'Kedden 200 Ft-tal többet.'],
    correctAnswer: 0,
    explanation: 'Kedden az első ár 100-zal több, a második 100-zal kevesebb. Az összeg ugyanaz: 95 + 330 = 425 és 195 + 230 = 425.'
  },
  {
    id: 'scg3-q27',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <SumTableFig a={[100, 110, 120, 130]} b={[345, 335, 325, 315]} s={[445, '', '', '?']} />,
    question: 'Mennyi az összeg az utolsó oszlopban?',
    options: ['445', '475', '415', '485'],
    correctAnswer: 0,
    explanation: 'Az 1. tag mindig 10-zel nő, a 2. tag mindig 10-zel csökken. Az összeg nem változik: 130 + 315 = 445.'
  },
  {
    id: 'scg3-q28',
    level: 3,
    questionTypeBadge: 'Okos számolás',
    question: 'Számolj okosan! 299 + 436 = ?',
    options: ['735', '736', '725', '635'],
    correctAnswer: 0,
    explanation: 'A 299-hez 1-et adok, a 436-ból 1-et elveszek: 300 + 435 = 735.'
  },
  {
    id: 'scg3-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <ChangeRowsFig rows={[[238, 179, 417], [138, 289, '?']]} changes={[['−100', '+110', '?']]} />,
    question: 'Melyik összeg a nagyobb, és mennyivel?',
    options: ['138 + 289, 10-zel', '238 + 179, 10-zel', 'Egyenlők.', '138 + 289, 110-zel'],
    correctAnswer: 0,
    explanation: 'Az 1. tag 100-zal csökken, a 2. tag 110-zel nő. Együtt 10-zel több: 417 + 10 = 427.'
  },
  {
    id: 'scg3-q30',
    level: 3,
    questionTypeBadge: 'Mindkét tag változik',
    figure: <ChangeRowsFig rows={[[320, 245, 565], [420, 235, '?']]} changes={[['+100', '−10', '?']]} />,
    question: 'Az egyik tag 100-zal nő, a másik 10-zel csökken. Mi lesz az összeggel?',
    options: ['90-nel nő', '110-zel nő', 'nem változik', '90-nel csökken'],
    correctAnswer: 0,
    explanation: '+100 és −10 együtt +90. Az összeg 90-nel nő: 565 → 655.'
  }
];

export const SumChangesG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId="g3-wadd-valtozasok-quiz"
      subtopicId="az-osszeg-valtozasai"
      title="4. Az összeg változásai – Kvíz"
      subtitle="30 feladat 3 szinten: egy tag változik, mindkét tag változik, az összeg nem változik, összehasonlítás számolás nélkül, okos számolás."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
      questions={SUM_CHANGES_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Egy tag változik',
          items: ['A tag +10 → az összeg +10', 'A tag −100 → az összeg −100', '230 + 140 = 370 → 330 + 140 = 470']
        },
        {
          title: 'Két tag változik',
          items: ['+10 és +10 → az összeg +20', '+100 és −10 → az összeg +90', '+10 és −10 → nem változik']
        },
        {
          title: 'Okos számolás',
          items: ['198 + 147 = 200 + 145 = 345', '299 + 436 = 300 + 435 = 735', 'Felcserélés: 146 + 238 = 238 + 146']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SumChangesG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SumChangesG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SumChangesG3Quiz;
