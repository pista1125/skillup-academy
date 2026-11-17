import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TimeG3Matcher } from './TimeG3Matcher';
import { TimeG3Sorter } from './TimeG3Sorter';
import { FONT, INK, UNK, ClockFace, StopwatchFace, DigitalFace, SunIcon, MoonIcon, MonthGrid, HU_DAYS_SHORT } from './TimeG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CLS = 'w-full max-w-[280px] h-auto mx-auto';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy mutatós óra; part: napszak jele bal oldalon. */
const ClockQ: React.FC<{ h: number; m: number; s?: number; showSec?: boolean; part?: 'délelőtt' | 'délután' | 'este' }> = ({ h, m, s, showSec, part }) => (
  <QFig h={150}>
    {part && (
      <g>
        {part === 'este' ? <MoonIcon cx={40} cy={60} r={17} /> : <SunIcon cx={40} cy={60} r={13} />}
        <text x="40" y="104" textAnchor="middle" fontSize="14" fontWeight="bold" fill={part === 'este' ? '#3730a3' : '#a16207'}>{part}</text>
      </g>
    )}
    <ClockFace cx={part ? 150 : 120} cy={75} r={64} h={h} m={m} s={s} showSec={showSec} />
  </QFig>
);

/** Kezdés és vége két órán. */
const TwoClocksQ: React.FC<{ h1: number; m1: number; h2: number; m2: number; l1?: string; l2?: string }> = ({ h1, m1, h2, m2, l1 = 'kezdés', l2 = 'vége' }) => (
  <QFig h={140}>
    <ClockFace cx={62} cy={66} r={50} h={h1} m={m1} />
    <ClockFace cx={178} cy={66} r={50} h={h2} m={m2} />
    <path d="M 114 66 L 126 66" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 121 59 L 128 66 L 121 73" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="62" y="133" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>{l1}</text>
    <text x="178" y="133" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>{l2}</text>
  </QFig>
);

const StopQ: React.FC<{ s: number }> = ({ s }) => (
  <QFig h={160}>
    <StopwatchFace cx={120} cy={92} r={58} s={s} />
  </QFig>
);

const DigitalQ: React.FC<{ text: string; caption?: string }> = ({ text, caption }) => (
  <QFig h={caption ? 110 : 90}>
    <DigitalFace x={55} y={18} w={130} h={54} text={text} />
    {caption && <text x="120" y="97" textAnchor="middle" fontSize="12" fill="#475569">{caption}</text>}
  </QFig>
);

const WeekQ: React.FC = () => (
  <QFig h={80}>
    {HU_DAYS_SHORT.map((d, i) => (
      <g key={d}>
        <rect x={12 + i * 31} y="22" width="27" height="36" rx="6" fill={i >= 5 ? '#fee2e2' : '#e0f2fe'} stroke={i >= 5 ? '#dc2626' : '#0369a1'} strokeWidth="1.6" />
        <text x={25.5 + i * 31} y="45" textAnchor="middle" fontSize={d.length > 2 ? 10 : 13} fontWeight="bold" fill={i >= 5 ? '#b91c1c' : '#0c4a6e'}>{d}</text>
      </g>
    ))}
    <text x="120" y="73" textAnchor="middle" fontSize="11" fill="#475569">egy hét napjai</text>
  </QFig>
);

const CalQ: React.FC<{ title: string; days: number; startDow: number; marks?: Record<number, string> }> = ({ title, days, startDow, marks }) => (
  <QFig h={Math.round(16 + 28 * 1.7 + Math.ceil((startDow + days) / 7) * 28)}>
    <MonthGrid x={22} y={8} title={title} days={days} startDow={startDow} cell={28} marks={marks} />
  </QFig>
);

/** Kis menetrend-táblázat. */
const TableQ: React.FC<{ title: string; rows: [string, string][] }> = ({ title, rows }) => {
  const h = 42 + rows.length * 26;
  return (
    <QFig h={h}>
      <rect x="20" y="10" width="200" height="26" rx="6" fill="#0ea5e9" />
      <text x="120" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">{title}</text>
      {rows.map(([a, b], i) => (
        <g key={a}>
          <rect x="20" y={36 + i * 26} width="200" height="26" fill={i % 2 ? '#e0f2fe' : '#ffffff'} stroke="#bae6fd" />
          <text x="32" y={54 + i * 26} fontSize="12.5" fill={INK}>{a}</text>
          <text x="208" y={54 + i * 26} textAnchor="end" fontSize="13" fontWeight="bold" fill={b === '?' ? UNK : INK}>{b}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Film kezdése digitálisan és a játékidő. */
const FilmQ: React.FC<{ start: string; len: string }> = ({ start, len }) => (
  <QFig h={110}>
    <rect x="16" y="18" width="70" height="52" rx="6" fill="#1e293b" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={20 + i * 17} y="22" width="9" height="6" fill="#f8fafc" />
        <rect x={20 + i * 17} y="60" width="9" height="6" fill="#f8fafc" />
      </g>
    ))}
    <path d="M 44 34 L 60 44 L 44 54 Z" fill="#fde047" />
    <text x="51" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>{len}</text>
    <text x="164" y="22" textAnchor="middle" fontSize="11.5" fill="#475569">kezdés</text>
    <DigitalFace x={112} y={28} w={104} h={40} text={start} />
    <text x="164" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>vége: ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const TIME_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'tg3-q1',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ h={3} m={0} />,
    question: 'Hány órát mutat az óra?',
    options: ['3 órát', '12 órát', 'fél 3-at', '6 órát'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 12-n áll, ezért egész óra van. A kismutató a 3-ra mutat: 3 óra.'
  },
  {
    id: 'tg3-q2',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ h={8} m={30} />,
    question: 'Mennyi időt mutat az óra?',
    options: ['fél 9', 'fél 8', 'negyed 9', 'háromnegyed 9'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 6-on áll: ez fél. A kismutató a 8 és a 9 között van, tehát fél 9 van (8 óra 30 perc).'
  },
  {
    id: 'tg3-q3',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ h={4} m={15} />,
    question: 'Mennyi időt mutat az óra?',
    options: ['negyed 5', 'negyed 4', 'háromnegyed 5', 'fél 5'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 3-on áll: 15 perc, azaz negyed. 4 óra 15 perc = negyed 5.'
  },
  {
    id: 'tg3-q4',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '1 perc = ? másodperc',
    options: ['60 másodperc', '100 másodperc', '10 másodperc', '24 másodperc'],
    correctAnswer: 0,
    explanation: 'Amíg a másodpercmutató egyszer körbeér, eltelik 1 perc. Ez 60 másodperc.'
  },
  {
    id: 'tg3-q5',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány órából áll egy nap?',
    options: ['24 órából', '12 órából', '60 órából', '7 órából'],
    correctAnswer: 0,
    explanation: 'Egy nap 24 óra. A kismutató ezalatt kétszer megy körbe az órán.'
  },
  {
    id: 'tg3-q6',
    level: 1,
    questionTypeBadge: 'Stopper',
    figure: <StopQ s={20} />,
    question: 'Hány másodpercet mutat a stopper?',
    options: ['20 másodpercet', '4 másodpercet', '40 másodpercet', '20 percet'],
    correctAnswer: 0,
    explanation: 'A stopper mutatója a 20-nál áll. 20 másodperc telt el.'
  },
  {
    id: 'tg3-q7',
    level: 1,
    questionTypeBadge: 'Időegységek',
    question: 'Melyik a legrövidebb idő?',
    options: ['1 másodperc', '1 perc', '1 óra', '1 nap'],
    correctAnswer: 0,
    explanation: 'Sorban: másodperc < perc < óra < nap. A legrövidebb az 1 másodperc.'
  },
  {
    id: 'tg3-q8',
    level: 1,
    questionTypeBadge: 'Naptár',
    figure: <WeekQ />,
    question: 'Hány nap van egy hétben?',
    options: ['7 nap', '5 nap', '6 nap', '12 nap'],
    correctAnswer: 0,
    explanation: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap: 7 nap.'
  },
  {
    id: 'tg3-q9',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel mérik a futóversenyen, hány másodperc alatt ér célba a futó?',
    options: ['stopperrel', 'naptárral', 'mérőszalaggal', 'mérleggel'],
    correctAnswer: 0,
    explanation: 'A rövid időt másodpercre pontosan a stopper méri.'
  },
  {
    id: 'tg3-q10',
    level: 1,
    questionTypeBadge: 'Digitális óra',
    figure: <DigitalQ text="7:45" />,
    question: 'Melyik időpontot mutatja az óra?',
    options: ['háromnegyed 8', 'háromnegyed 7', 'negyed 8', 'fél 8'],
    correctAnswer: 0,
    explanation: '7 óra 45 perc. 15 perc múlva 8 óra lesz, ezért mondjuk úgy: háromnegyed 8.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'tg3-q11',
    level: 2,
    questionTypeBadge: 'Pontos idő',
    figure: <ClockQ h={5} m={20} />,
    question: 'Hány óra hány perc van?',
    options: ['5 óra 20 perc', '4 óra 20 perc', '5 óra 4 perc', '4 óra 5 perc'],
    correctAnswer: 0,
    explanation: 'A kismutató már elhagyta az 5-öt: 5 óra. A nagymutató a 4-en áll: 4 · 5 = 20 perc. 5 óra 20 perc.'
  },
  {
    id: 'tg3-q12',
    level: 2,
    questionTypeBadge: 'Pontos idő',
    figure: <ClockQ h={10} m={50} />,
    question: 'Hány óra hány perc van?',
    options: ['10 óra 50 perc', '11 óra 50 perc', '10 óra 10 perc', '9 óra 50 perc'],
    correctAnswer: 0,
    explanation: 'A kismutató már közel van a 11-hez, de még nem érte el. Ezért 10 óra van. A nagymutató a 10-en áll: 50 perc.'
  },
  {
    id: 'tg3-q13',
    level: 2,
    questionTypeBadge: 'Napszak',
    figure: <ClockQ h={2} m={35} part="délután" />,
    question: 'Délután van. Hogyan mondjuk a napszaknak megfelelően?',
    options: ['14 óra 35 perc', '2 óra 35 perc', '12 óra 35 perc', '14 óra 7 perc'],
    correctAnswer: 0,
    explanation: 'Az óra 2 óra 35 percet mutat. Délután 12-t hozzáadunk: 2 + 12 = 14. Tehát 14 óra 35 perc.'
  },
  {
    id: 'tg3-q14',
    level: 2,
    questionTypeBadge: 'Napszak',
    figure: <ClockQ h={8} m={5} part="este" />,
    question: 'Este van. Hogyan mondjuk a napszaknak megfelelően?',
    options: ['20 óra 5 perc', '8 óra 5 perc', '18 óra 5 perc', '20 óra 1 perc'],
    correctAnswer: 0,
    explanation: 'Az óra 8 óra 5 percet mutat. Este 12-t hozzáadunk: 8 + 12 = 20. Tehát 20 óra 5 perc.'
  },
  {
    id: 'tg3-q15',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '2 óra = ? perc',
    options: ['120 perc', '200 perc', '60 perc', '24 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 2 óra = 60 + 60 = 120 perc.'
  },
  {
    id: 'tg3-q16',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1 óra 25 perc = ? perc',
    options: ['85 perc', '125 perc', '26 perc', '95 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 60 + 25 = 85 perc. (Nem 125, mert 1 óra nem 100 perc!)'
  },
  {
    id: 'tg3-q17',
    level: 2,
    questionTypeBadge: 'Később',
    figure: <ClockQ h={6} m={40} />,
    question: 'Mennyi lesz az idő 10 perccel később?',
    options: ['6:50', '6:30', '7:40', '6:41'],
    correctAnswer: 0,
    explanation: 'Most 6 óra 40 perc van. A nagymutató 2 lépést megy előre: 40 + 10 = 50. Tehát 6:50.'
  },
  {
    id: 'tg3-q18',
    level: 2,
    questionTypeBadge: 'Naptár',
    figure: <CalQ title="október" days={31} startDow={3} marks={{ 15: '#fde68a' }} />,
    question: 'A naptárban sárga az október 15. Milyen napra esik?',
    options: ['csütörtökre', 'szerdára', 'péntekre', 'hétfőre'],
    correctAnswer: 0,
    explanation: 'Keresd meg a 15-öt, és nézz fel az oszlop tetejére! Ott „Cs” áll: csütörtök.'
  },
  {
    id: 'tg3-q19',
    level: 2,
    questionTypeBadge: 'Menetrend',
    figure: <TableQ title="Busz menetrend" rows={[['Óvár', '7:50'], ['Malom utca', '8:05'], ['Iskola', '8:20']]} />,
    question: 'Mennyi ideig tart az út Óvártól az Iskoláig?',
    options: ['30 perc', '70 perc', '20 perc', '15 perc'],
    correctAnswer: 0,
    explanation: '7:50-től 8:00-ig 10 perc, 8:00-tól 8:20-ig még 20 perc. 10 + 20 = 30 perc.'
  },
  {
    id: 'tg3-q20',
    level: 2,
    questionTypeBadge: 'Stopper',
    figure: <StopQ s={45} />,
    question: 'Dani ennyi ideig állt egy lábon. Mennyi hiányzott még 1 egész percig?',
    options: ['15 másodperc', '55 másodperc', '45 másodperc', '25 másodperc'],
    correctAnswer: 0,
    explanation: 'A stopper 45 másodpercet mutat. 1 perc = 60 másodperc. 60 − 45 = 15 másodperc hiányzott.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'tg3-q21',
    level: 3,
    questionTypeBadge: 'Eltelt idő',
    figure: <TwoClocksQ h1={8} m1={45} h2={9} m2={20} />,
    question: 'Mennyi idő telt el a két óraállás között?',
    options: ['35 perc', '25 perc', '75 perc', '1 óra 35 perc'],
    correctAnswer: 0,
    explanation: '8:45-től 9:00-ig 15 perc. 9:00-tól 9:20-ig 20 perc. 15 + 20 = 35 perc.'
  },
  {
    id: 'tg3-q22',
    level: 3,
    questionTypeBadge: 'Mozi',
    figure: <FilmQ start="15:40" len="80 perc" />,
    question: 'A film 15:40-kor kezdődik, és 80 percig tart. Mikor lesz vége?',
    options: ['17:00', '16:20', '17:20', '16:00'],
    correctAnswer: 0,
    explanation: '80 perc = 20 perc + 60 perc. 15:40 + 20 perc = 16:00. 16:00 + 60 perc = 17:00.'
  },
  {
    id: 'tg3-q23',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Lili 1 óra 15 percig sétált, Bence 80 percig. Melyik igaz?',
    options: ['Bence 5 perccel tovább sétált.', 'Lili sétált tovább.', 'Ugyanannyi ideig sétáltak.', 'Bence 65 perccel tovább sétált.'],
    correctAnswer: 0,
    explanation: '1 óra 15 perc = 60 + 15 = 75 perc. 80 − 75 = 5. Bence 5 perccel tovább sétált.'
  },
  {
    id: 'tg3-q24',
    level: 3,
    questionTypeBadge: 'Másodperc',
    figure: <ClockQ h={9} m={16} s={50} showSec />,
    question: 'Az óra 9 óra 16 perc 50 másodpercet mutat. Mennyi lesz 25 másodperc múlva?',
    options: ['9 óra 17 perc 15 másodperc', '9 óra 16 perc 75 másodperc', '9 óra 16 perc 15 másodperc', '9 óra 18 perc 15 másodperc'],
    correctAnswer: 0,
    explanation: '50 + 10 = 60 másodperc, ez 1 perc: 9 óra 17 perc. A maradék 15 másodperc: 9 óra 17 perc 15 másodperc.'
  },
  {
    id: 'tg3-q25',
    level: 3,
    questionTypeBadge: 'Naptár',
    figure: <CalQ title="július" days={31} startDow={2} marks={{ 13: '#bbf7d0', 14: '#bbf7d0', 15: '#bbf7d0', 16: '#bbf7d0', 17: '#bbf7d0' }} />,
    question: 'A tábor július 13-án kezdődik, és július 17-én ér véget. Mindkét nap táborban vagy. Hány napos a tábor?',
    options: ['5 napos', '4 napos', '7 napos', '6 napos'],
    correctAnswer: 0,
    explanation: 'Számold meg a zöld napokat: 13, 14, 15, 16, 17. Ez 5 nap. (17 − 13 = 4 kevés, mert az első napot is számolni kell!)'
  },
  {
    id: 'tg3-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy papírhajót 40 másodperc alatt hajtogatsz. Mennyi idő kell 3 hajóhoz?',
    options: ['2 perc', '120 perc', '1 perc 20 másodperc', '43 másodperc'],
    correctAnswer: 0,
    explanation: '3 · 40 = 120 másodperc. 60 másodperc = 1 perc, tehát 120 másodperc = 2 perc.'
  },
  {
    id: 'tg3-q27',
    level: 3,
    questionTypeBadge: 'Mozi',
    figure: <TableQ title="Moziműsor" rows={[['1. film (70 perc)', '13:00'], ['2. film', '14:30']]} />,
    question: 'Az 1. film 70 percig tart. Hány perc szünet van a 2. film kezdéséig?',
    options: ['20 perc', '30 perc', '1 óra 30 perc', '10 perc'],
    correctAnswer: 0,
    explanation: '13:00 + 70 perc = 14:10. 14:10-től 14:30-ig 20 perc a szünet.'
  },
  {
    id: 'tg3-q28',
    level: 3,
    questionTypeBadge: 'Egész óráig',
    figure: <ClockQ h={7} m={35} />,
    question: 'Hány perc van még a következő egész óráig?',
    options: ['25 perc', '35 perc', '65 perc', '15 perc'],
    correctAnswer: 0,
    explanation: 'Az óra 7:35-öt mutat. 8:00-ig a nagymutatónak még 25 percet kell mennie: 60 − 35 = 25.'
  },
  {
    id: 'tg3-q29',
    level: 3,
    questionTypeBadge: 'Naptár',
    question: 'A július és az augusztus is 31 napos. Hány nap a kettő együtt?',
    options: ['62 nap', '61 nap', '60 nap', '56 nap'],
    correctAnswer: 0,
    explanation: '31 + 31 = 62 nap. Ez a nyári szünet nagy része!'
  },
  {
    id: 'tg3-q30',
    level: 3,
    questionTypeBadge: 'Eltelt idő',
    figure: <TwoClocksQ h1={10} m1={30} h2={12} m2={15} l1="indulás" l2="érkezés" />,
    question: 'A kirándulók ekkor indultak és ekkor érkeztek. Mennyi ideig tartott az út?',
    options: ['1 óra 45 perc', '2 óra 15 perc', '1 óra 15 perc', '2 óra 45 perc'],
    correctAnswer: 0,
    explanation: '10:30-tól 12:00-ig 1 óra 30 perc. 12:00-tól 12:15-ig 15 perc. Együtt 1 óra 45 perc.'
  }
];

export const TimeG3Quiz: React.FC<{
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
      topicId="g3-meas-ido-quiz"
      subtopicId="az-ido-merese"
      title="9. Az idő mérése – Kvíz"
      subtitle="30 feladat 3 szinten: óraleolvasás, napszakok, mértékváltás, eltelt idő, naptár."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={TIME_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Időegységek',
          items: ['1 perc = 60 másodperc', '1 óra = 60 perc', '1 nap = 24 óra', '1 hét = 7 nap', '1 év = 12 hónap']
        },
        {
          title: 'Óraleolvasás',
          items: ['Kismutató: óra. Nagymutató: perc.', 'Nagymutató a 3-on: negyed. A 6-on: fél. A 9-en: háromnegyed.', 'Délután és este: + 12 óra (3:20 → 15:20)']
        },
        {
          title: 'Eltelt idő',
          items: ['Először ugorj az egész óráig!', '8:45 → 9:00: 15 perc, 9:00 → 9:20: 20 perc', '15 + 20 = 35 perc', 'Napoknál az első napot is számold!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TimeG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TimeG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TimeG3Quiz;
