import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TimeG2Matcher } from './TimeG2Matcher';
import { TimeG2Sorter } from './TimeG2Sorter';
import { ClockPart, DigitalPart, CalendarPart, TIME_FONT, WEEKDAYS } from './TimeG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 130 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={TIME_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const ClockFig: React.FC<{ h: number; m?: number; sector?: number }> = ({ h, m = 0, sector }) => (
  <QFig h={140}>
    <ClockPart
      cx={130}
      cy={70}
      r={60}
      hour={h}
      minute={m}
      showHands={sector === undefined}
      sector={sector === undefined ? undefined : { from: 0, to: sector }}
      rim="#2563eb"
    />
  </QFig>
);

const DigitalFig: React.FC<{ text: string; caption?: string }> = ({ text, caption }) => (
  <QFig h={caption ? 120 : 100}>
    <DigitalPart x={55} y={14} w={150} h={70} text={text} />
    {caption && (
      <text x="130" y="108" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </QFig>
);

const SpanFig: React.FC<{ from: string; to: string; fromLabel: string; toLabel: string }> = ({ from, to, fromLabel, toLabel }) => (
  <QFig h={110}>
    <text x="65" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      {fromLabel}
    </text>
    <DigitalPart x={14} y={32} w={102} h={50} text={from} />
    <path d="M120 57 L136 57" stroke="#334155" strokeWidth="3" />
    <polygon points="134,50 134,64 144,57" fill="#334155" />
    <text x="196" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      {toLabel}
    </text>
    <DigitalPart x={145} y={32} w={102} h={50} text={to} color="#fbbf24" />
    <text x="130" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
      Hány óra telik el?
    </text>
  </QFig>
);

const SunFig: React.FC = () => (
  <QFig h={120}>
    <rect x="10" y="10" width="240" height="85" rx="8" fill="#bae6fd" />
    <path d="M25 95 Q130 -5 235 95" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />
    <circle cx="130" cy="34" r="15" fill="#facc15" stroke="#ea580c" strokeWidth="3" />
    <circle cx="40" cy="80" r="7" fill="#fde68a" opacity="0.7" />
    <circle cx="220" cy="80" r="7" fill="#fde68a" opacity="0.7" />
    <rect x="10" y="88" width="240" height="20" fill="#4ade80" />
    <text x="130" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </QFig>
);

const WeekRowFig: React.FC<{ missing: number }> = ({ missing }) => {
  const short = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];
  return (
    <QFig h={80}>
      {short.map((d, i) => (
        <g key={i}>
          <rect
            x={12 + i * 34}
            y="18"
            width="30"
            height="44"
            rx="7"
            fill={i === missing ? '#fee2e2' : i >= 5 ? '#fecaca' : '#dbeafe'}
            stroke={i === missing ? UNK : '#334155'}
            strokeWidth="2"
          />
          <text x={27 + i * 34} y="47" textAnchor="middle" fontSize="15" fontWeight="bold" fill={i === missing ? UNK : '#0f172a'}>
            {i === missing ? '?' : d}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const SeasonFig: React.FC = () => {
  const items = [
    { t: 'tavasz', c: '#fbcfe8' },
    { t: 'nyár', c: '#fecaca' },
    { t: '?', c: '#ffffff' },
    { t: 'tél', c: '#bae6fd' }
  ];
  return (
    <QFig h={80}>
      {items.map((s, i) => (
        <g key={i}>
          <rect x={10 + i * 62} y="20" width="54" height="40" rx="9" fill={s.c} stroke={s.t === '?' ? UNK : '#334155'} strokeWidth="2" />
          <text x={37 + i * 62} y="46" textAnchor="middle" fontSize={s.t === '?' ? 20 : 13} fontWeight="bold" fill={s.t === '?' ? UNK : '#0f172a'}>
            {s.t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const MonthSheetFig: React.FC<{ name: string; next?: boolean }> = ({ name, next }) => (
  <QFig h={110}>
    <g>
      <rect x={next ? 30 : 80} y="14" width="100" height="84" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
      <rect x={next ? 30 : 80} y="14" width="100" height="24" rx="8" fill="#ef4444" />
      <text x={next ? 80 : 130} y="74" textAnchor="middle" fontSize={name.length > 7 ? 15 : 19} fontWeight="bold" fill="#0f172a">
        {name}
      </text>
    </g>
    {next && (
      <>
        <path d="M136 56 L152 56" stroke="#334155" strokeWidth="3" />
        <polygon points="150,49 150,63 160,56" fill="#334155" />
        <rect x="164" y="14" width="80" height="84" rx="10" fill="#fef2f2" stroke={UNK} strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="204" y="72" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>
          ?
        </text>
      </>
    )}
  </QFig>
);

const WeekBlocksFig: React.FC<{ days: number }> = ({ days }) => {
  const cell = 22;
  const rows = Math.ceil(days / 7);
  const h = rows * cell + 30;
  return (
    <QFig h={h}>
      {Array.from({ length: days }, (_, i) => (
        <rect
          key={i}
          x={53 + (i % 7) * cell}
          y={15 + Math.floor(i / 7) * cell}
          width={cell - 4}
          height={cell - 4}
          rx="4"
          fill="#3b82f6"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />
      ))}
    </QFig>
  );
};

const CalendarFig: React.FC<{ today: number }> = ({ today }) => (
  <QFig h={232}>
    <CalendarPart x={25} y={14} cell={30} days={30} startDow={2} title="ÁPRILIS" highlight={{ [today]: '#fde68a' }} />
  </QFig>
);

const HoursBoardFig: React.FC = () => (
  <QFig h={120}>
    <rect x="30" y="10" width="200" height="100" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
    <text x="130" y="34" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0e7490">
      USZODA – NYITVA
    </text>
    <text x="48" y="66" fontSize="15" fontWeight="bold" fill="#0f172a">
      hétfő
    </text>
    <text x="212" y="66" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">
      7–19 óráig
    </text>
    <text x="48" y="94" fontSize="15" fontWeight="bold" fill="#0f172a">
      szombat
    </text>
    <text x="212" y="94" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">
      9–15 óráig
    </text>
  </QFig>
);

const WeekCycleFig: React.FC = () => (
  <QFig h={150}>
    {WEEKDAYS.map((d, i) => {
      const a = (i * 2 * Math.PI) / 7;
      const x = 130 + 56 * Math.sin(a);
      const y = 75 - 56 * Math.cos(a);
      return (
        <g key={d}>
          <circle cx={x} cy={y} r="17" fill={i === 6 ? '#fde68a' : '#e0e7ff'} stroke="#334155" strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'][i]}
          </text>
        </g>
      );
    })}
    <text x="130" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
      ma: V
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const TIME_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'timeg2-q1',
    level: 1,
    questionTypeBadge: 'Egész óra',
    figure: <ClockFig h={4} />,
    question: 'Hány órát mutat az óra?',
    options: ['4 óra', '12 óra', '5 óra', '3 óra'],
    correctAnswer: 0,
    explanation: 'A rövid kismutató a 4-en áll, a nagymutató a 12-n. Ez 4 óra.'
  },
  {
    id: 'timeg2-q2',
    level: 1,
    questionTypeBadge: 'Mutatók',
    figure: <ClockFig h={9} />,
    question: 'Mennyi az idő?',
    options: ['9 óra', '12 óra', '3 óra', '10 óra'],
    correctAnswer: 0,
    explanation: 'Az órát a rövid kismutató mutatja: 9. A nagymutató a 12-n áll, tehát pontosan 9 óra van.'
  },
  {
    id: 'timeg2-q3',
    level: 1,
    questionTypeBadge: 'Napszakok',
    figure: <SunFig />,
    question: 'A Nap a legmagasabban jár az égen. Melyik napszak van?',
    options: ['dél', 'este', 'hajnal', 'éjjel'],
    correctAnswer: 0,
    explanation: 'Délben jár a Nap a legmagasabban. Dél = 12 óra.'
  },
  {
    id: 'timeg2-q4',
    level: 1,
    questionTypeBadge: 'Napszakok sorrendje',
    question: 'Melyik napszak jön a délelőtt után?',
    options: ['dél', 'reggel', 'este', 'hajnal'],
    correctAnswer: 0,
    explanation: 'A sorrend: hajnal, reggel, délelőtt, dél, délután, este, éjjel. A délelőtt után a dél jön.'
  },
  {
    id: 'timeg2-q5',
    level: 1,
    questionTypeBadge: 'A hét napjai',
    figure: <WeekRowFig missing={3} />,
    question: 'Melyik nap hiányzik?',
    options: ['csütörtök', 'szerda', 'péntek', 'kedd'],
    correctAnswer: 0,
    explanation: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap. A szerda után a csütörtök jön.'
  },
  {
    id: 'timeg2-q6',
    level: 1,
    questionTypeBadge: '1 hét',
    question: 'Hány napból áll egy hét?',
    options: ['7', '5', '6', '10'],
    correctAnswer: 0,
    explanation: 'Egy hét 7 nap: 5 hétköznap és 2 nap hétvége.'
  },
  {
    id: 'timeg2-q7',
    level: 1,
    questionTypeBadge: 'Óra és perc',
    figure: <ClockFig h={12} sector={60} />,
    question: 'A nagymutató egyszer körbement. Hány perc telt el?',
    options: ['60 perc', '100 perc', '12 perc', '24 perc'],
    correctAnswer: 0,
    explanation: 'Egy teljes kör 1 óra. 1 óra = 60 perc.'
  },
  {
    id: 'timeg2-q8',
    level: 1,
    questionTypeBadge: '30 perc',
    figure: <ClockFig h={7} m={30} />,
    question: 'Mennyi az idő?',
    options: ['7 óra 30 perc', '8 óra 30 perc', '7 óra 6 perc', '6 óra 7 perc'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 6-on van: ez 30 perc (ötösével számolj!). A kismutató a 7 és a 8 között jár: 7 óra 30 perc.'
  },
  {
    id: 'timeg2-q9',
    level: 1,
    questionTypeBadge: 'Évszakok',
    figure: <SeasonFig />,
    question: 'Melyik évszak jön a nyár után?',
    options: ['ősz', 'tavasz', 'tél', 'nyár'],
    correctAnswer: 0,
    explanation: 'Tavasz, nyár, ősz, tél. A nyár után az ősz jön.'
  },
  {
    id: 'timeg2-q10',
    level: 1,
    questionTypeBadge: '1 év',
    question: 'Hány hónapból áll egy év?',
    options: ['12', '10', '7', '4'],
    correctAnswer: 0,
    explanation: 'Egy évben 12 hónap van: januártól decemberig. (4 évszak van, és 7 nap egy hét.)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'timeg2-q11',
    level: 2,
    questionTypeBadge: 'Két név',
    figure: <ClockFig h={3} />,
    question: 'Délután van. Hány óra van most?',
    options: ['15 óra', '13 óra', '23 óra', '9 óra'],
    correctAnswer: 0,
    explanation: 'Az óra 3 órát mutat. Délután adj hozzá 12-t: 3 + 12 = 15. Most 15 óra van.'
  },
  {
    id: 'timeg2-q12',
    level: 2,
    questionTypeBadge: 'Perc a nagymutatón',
    figure: <ClockFig h={8} m={15} />,
    question: 'Mennyi az idő?',
    options: ['8 óra 15 perc', '3 óra 40 perc', '8 óra 3 perc', '9 óra 15 perc'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 3-on van: 5, 10, 15 – ez 15 perc. A kismutató a 8 után jár: 8 óra 15 perc.'
  },
  {
    id: 'timeg2-q13',
    level: 2,
    questionTypeBadge: 'Digitális óra',
    figure: <DigitalFig text="10:45" />,
    question: 'Ezt mutatja a digitális óra. Mennyi az idő?',
    options: ['10 óra 45 perc', '45 óra 10 perc', '10 óra 4 perc', '11 óra 45 perc'],
    correctAnswer: 0,
    explanation: 'A kettőspont előtt az óra áll (10), utána a perc (45). Ez 10 óra 45 perc.'
  },
  {
    id: 'timeg2-q14',
    level: 2,
    questionTypeBadge: 'Eltelt perc',
    figure: <ClockFig h={12} sector={20} />,
    question: 'A nagymutató végigment a sárga részen. Hány perc telt el?',
    options: ['20 perc', '4 perc', '15 perc', '25 perc'],
    correctAnswer: 0,
    explanation: 'A sárga rész a 12-től a 4-ig tart. Ötösével: 5, 10, 15, 20. Ez 20 perc.'
  },
  {
    id: 'timeg2-q15',
    level: 2,
    questionTypeBadge: 'Eltelt órák',
    figure: <SpanFig from="8:00" to="13:00" fromLabel="kezdés" toLabel="vége" />,
    question: 'Hány óra telik el 8 órától 13 óráig?',
    options: ['5 óra', '4 óra', '6 óra', '21 óra'],
    correctAnswer: 0,
    explanation: 'A nagyobból vedd el a kisebbet: 13 − 8 = 5. Tehát 5 óra telik el.'
  },
  {
    id: 'timeg2-q16',
    level: 2,
    questionTypeBadge: 'Hét és nap',
    figure: <WeekBlocksFig days={14} />,
    question: '2 hét hány nap?',
    options: ['14 nap', '9 nap', '12 nap', '7 nap'],
    correctAnswer: 0,
    explanation: '1 hét = 7 nap. 2 hét = 7 + 7 = 14 nap. Egy sor a képen 1 hét.'
  },
  {
    id: 'timeg2-q17',
    level: 2,
    questionTypeBadge: 'A hónap napjai',
    question: 'Hány napos a július?',
    options: ['31', '30', '28', '29'],
    correctAnswer: 0,
    explanation: 'A július 31 napos. 30 napos csak az április, a június, a szeptember és a november.'
  },
  {
    id: 'timeg2-q18',
    level: 2,
    questionTypeBadge: 'Hónap és évszak',
    figure: <MonthSheetFig name="JANUÁR" />,
    question: 'Melyik évszakban van a január?',
    options: ['télen', 'ősszel', 'tavasszal', 'nyáron'],
    correctAnswer: 0,
    explanation: 'A téli hónapok: december, január, február. A január téli hónap.'
  },
  {
    id: 'timeg2-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a leghosszabb idő?',
    options: ['65 perc', '1 óra', '45 perc', 'fél óra'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc, fél óra = 30 perc. A 65 perc több, mint 60 perc, ez a leghosszabb.'
  },
  {
    id: 'timeg2-q20',
    level: 2,
    questionTypeBadge: 'Időpont',
    question: 'Melyik időpont? (Megmondja, mikor történik valami.)',
    options: ['május 24.', '5 hét', '4 nap', '15 perc'],
    correctAnswer: 0,
    explanation: 'A május 24. egy nap a naptárban: időpont. Az 5 hét, a 4 nap és a 15 perc azt mondja meg, meddig tart valami: időtartam.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'timeg2-q21',
    level: 3,
    questionTypeBadge: 'Mikor érkezik?',
    figure: <ClockFig h={7} m={30} />,
    question: 'Zsófi ekkor indul el. Az út 15 percig tart. Mikor ér oda?',
    options: ['7 óra 45 perc', '7 óra 15 perc', '8 óra 45 perc', '7 óra 35 perc'],
    correctAnswer: 0,
    explanation: 'Az óra 7 óra 30 percet mutat. 30 perc + 15 perc = 45 perc. Zsófi 7 óra 45 perckor ér oda.'
  },
  {
    id: 'timeg2-q22',
    level: 3,
    questionTypeBadge: 'Egész óráig',
    figure: <DigitalFig text="5:35" caption="Mikor lesz 6:00?" />,
    question: 'Hány perc múlva lesz 6 óra?',
    options: ['25 perc', '35 perc', '65 perc', '15 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 35 perc után még 60 − 35 = 25 perc kell a 6 óráig.'
  },
  {
    id: 'timeg2-q23',
    level: 3,
    questionTypeBadge: 'Éjfélen át',
    figure: <SpanFig from="21:00" to="7:00" fromLabel="lefekszik" toLabel="felkel" />,
    question: 'Marci 21 órakor fekszik le, és reggel 7 órakor kel fel. Hány órát alszik?',
    options: ['10 órát', '14 órát', '28 órát', '9 órát'],
    correctAnswer: 0,
    explanation: '21 órától éjfélig (24 óráig) 3 óra telik el. Éjféltől reggel 7-ig még 7 óra. 3 + 7 = 10 óra.'
  },
  {
    id: 'timeg2-q24',
    level: 3,
    questionTypeBadge: 'Naptár',
    figure: <CalendarFig today={9} />,
    question: 'Ma április 9. van. Melyik napon lesz 1 hét múlva?',
    options: ['április 16.', 'április 15.', 'április 10.', 'április 17.'],
    correctAnswer: 0,
    explanation: '1 hét = 7 nap. 9 + 7 = 16. A naptárban ugyanabban az oszlopban, egy sorral lejjebb van.'
  },
  {
    id: 'timeg2-q25',
    level: 3,
    questionTypeBadge: 'Teljes hetek',
    figure: <WeekBlocksFig days={30} />,
    question: '30 nap hány teljes hét, és hány nap marad?',
    options: ['4 hét és 2 nap', '4 hét és 3 nap', '3 hét és 2 nap', '5 hét'],
    correctAnswer: 0,
    explanation: '4 hét = 28 nap. 30 − 28 = 2. Tehát 30 nap = 4 hét és 2 nap.'
  },
  {
    id: 'timeg2-q26',
    level: 3,
    questionTypeBadge: 'Hét és nap',
    question: 'Lili 20 nap alatt olvasott el egy könyvet, Ádám 2 hét alatt. Ki volt gyorsabb, és hány nappal?',
    options: ['Ádám, 6 nappal', 'Lili, 6 nappal', 'Ádám, 18 nappal', 'Lili, 18 nappal'],
    correctAnswer: 0,
    explanation: '2 hét = 14 nap. 14 nap kevesebb, mint 20 nap, tehát Ádám volt gyorsabb. 20 − 14 = 6 nappal.'
  },
  {
    id: 'timeg2-q27',
    level: 3,
    questionTypeBadge: 'Nyitvatartás',
    figure: <HoursBoardFig />,
    question: 'Hány órával van tovább nyitva az uszoda hétfőn, mint szombaton?',
    options: ['6 órával', '12 órával', '4 órával', '2 órával'],
    correctAnswer: 0,
    explanation: 'Hétfőn: 19 − 7 = 12 óra. Szombaton: 15 − 9 = 6 óra. 12 − 6 = 6 órával van tovább nyitva hétfőn.'
  },
  {
    id: 'timeg2-q28',
    level: 3,
    questionTypeBadge: 'Múlva',
    figure: <ClockFig h={4} m={30} />,
    question: 'Mennyi lesz az idő 1 óra 30 perc múlva?',
    options: ['6 óra', '5 óra 30 perc', '6 óra 30 perc', '5 óra'],
    correctAnswer: 0,
    explanation: 'Most 4 óra 30 perc van. 1 óra múlva 5 óra 30 perc. Még 30 perc múlva 6 óra lesz.'
  },
  {
    id: 'timeg2-q29',
    level: 3,
    questionTypeBadge: 'Hónapok',
    figure: <MonthSheetFig name="SZEPTEMBER" next />,
    question: 'Melyik hónap jön a szeptember után, és hány napos?',
    options: ['október, 31 napos', 'október, 30 napos', 'augusztus, 31 napos', 'november, 30 napos'],
    correctAnswer: 0,
    explanation: 'A szeptember után az október jön. Az október 31 napos.'
  },
  {
    id: 'timeg2-q30',
    level: 3,
    questionTypeBadge: 'Napok múlva',
    figure: <WeekCycleFig />,
    question: 'Ma vasárnap van. Milyen nap lesz 3 nap múlva?',
    options: ['szerda', 'csütörtök', 'kedd', 'hétfő'],
    correctAnswer: 0,
    explanation: 'Vasárnap után: 1 nap múlva hétfő, 2 nap múlva kedd, 3 nap múlva szerda.'
  }
];

export const TimeG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="meresek"
      topicId="g2-meres-ido-quiz"
      subtopicId="ido-meres"
      title="4. Az idő mérése – Kvíz"
      subtitle="30 feladat 3 szinten: napszakok, az óra leolvasása, óra és perc, hét, hónap, évszak és eltelt idő."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • KVÍZ"
      questions={TIME_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az óra',
          items: [
            'Kismutató: óra, nagymutató: perc',
            '1 óra = 60 perc, fél óra = 30 perc',
            'A nagymutatónál ötösével számolj: 3-on 15 perc',
            'Délután + 12: 3 óra = 15 óra'
          ]
        },
        {
          title: 'Nap, hét, hónap, év',
          items: [
            '1 nap = 24 óra, 1 hét = 7 nap',
            'H, K, Sz, Cs, P, Sz, V',
            '1 év = 12 hónap',
            '30 napos: április, június, szeptember, november; február: 28 (29)'
          ]
        },
        {
          title: 'Évszakok és eltelt idő',
          items: [
            'Tavasz: III–V, nyár: VI–VIII, ősz: IX–XI, tél: XII–II',
            'Eltelt idő: nagyobb − kisebb (13 − 8 = 5 óra)',
            'Éjfélen át: 21-től 24-ig 3 óra, aztán tovább',
            'Időpont: mikor? Időtartam: meddig?'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TimeG2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TimeG2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TimeG2Quiz;
