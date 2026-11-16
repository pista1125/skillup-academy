import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegativesEverydayMatcher } from './NegativesEverydayMatcher';
import { NegativesEverydaySorter } from './NegativesEverydaySorter';
import { ThermoGroup, DayGraphSvg, fmtNum } from './NegativesEverydayFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FONT = 'system-ui, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy hőmérő, mellette „? °C” vagy egy változás leírása. */
const QThermo: React.FC<{ value: number; min?: number; max?: number; labelEvery?: number; note?: string; note2?: string }> = ({
  value,
  min = -10,
  max = 10,
  labelEvery = 10,
  note = '? °C',
  note2
}) => (
  <QFig h={200}>
    <ThermoGroup x={70} y={24} h={130} min={min} max={max} value={value} labelEvery={labelEvery} color={value < 0 ? '#3b82f6' : '#ef4444'} />
    <text x="160" y={note2 ? 90 : 105} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>{note}</text>
    {note2 && (
      <text x="160" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{note2}</text>
    )}
  </QFig>
);

/** A reggeli hőmérsékletek táblázata. */
const QTowns: React.FC = () => {
  const rows: [string, number][] = [
    ['Budapest', 3],
    ['Pécs', 5],
    ['Zirc', -1],
    ['Zabar', -10],
    ['Miskolc', -3],
    ['Szeged', 0]
  ];
  return (
    <QFig h={190}>
      <rect x="40" y="10" width="160" height="22" rx="4" fill="#16a34a" />
      <text x="80" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">Település</text>
      <text x="160" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">Reggel</text>
      {rows.map(([t, v], i) => (
        <g key={t}>
          <rect x="40" y={34 + i * 25} width="160" height="23" fill={i % 2 ? '#f0fdf4' : '#dcfce7'} />
          <text x="80" y={50 + i * 25} textAnchor="middle" fontSize="12" fill="#14532d">{t}</text>
          <text x="178" y={50 + i * 25} textAnchor="end" fontSize="12" fontWeight="bold" fill="#0f172a">{fmtNum(v)} °C</text>
        </g>
      ))}
    </QFig>
  );
};

/** Tengerszint: jegesmedve a hegyen, fóka a vízen, hal a mélyben. */
const QSea: React.FC<{ ask: 'fish' | 'diff' | 'sea' }> = ({ ask }) => (
  <QFig h={170}>
    <rect x="2" y="2" width="236" height="88" rx="9" fill="#e0f2fe" />
    <polygon points="20,90 90,20 160,90" fill="#f1f5f9" stroke="#94a3b8" />
    <text x="82" y="18" fontSize="13">🐻‍❄️</text>
    <text x="104" y="28" fontSize="11" fontWeight="bold" fill={ask === 'diff' ? '#0f172a' : '#0f172a'}>350 m</text>
    <rect x="2" y="90" width="236" height="78" fill="#60a5fa" opacity="0.6" />
    <line x1="2" y1="90" x2="238" y2="90" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="6 4" />
    <text x="176" y="86" fontSize="13">🦭</text>
    <text x="196" y="84" fontSize="10" fontWeight="bold" fill="#1d4ed8">{ask === 'sea' ? '? m' : '0 m'}</text>
    <text x="150" y="150" fontSize="15">🐟</text>
    <text x="172" y="150" fontSize="12" fontWeight="bold" fill={ask === 'fish' ? C_UNK : '#ffffff'}>{ask === 'fish' ? '? m' : '−50 m'}</text>
    <text x="14" y="112" fontSize="10" fontWeight="bold" fill="#ffffff">tengerszint</text>
    {ask === 'diff' && (
      <g>
        <line x1="218" y1="28" x2="218" y2="76" stroke={C_UNK} strokeWidth="2" />
        <polygon points="218,22 213,32 223,32" fill={C_UNK} />
        <polygon points="218,82 213,72 223,72" fill={C_UNK} />
        <text x="214" y="56" textAnchor="end" fontSize="13" fontWeight="bold" fill={C_UNK}>?</text>
      </g>
    )}
  </QFig>
);

/** Ház emeletekkel; a megjelölt szint gombján „?” áll. */
const QFloors: React.FC<{ ask: number; from?: number }> = ({ ask, from }) => {
  const floors = [3, 2, 1, 0, -1, -2];
  return (
    <QFig h={200}>
      <rect x="2" y="134" width="236" height="64" fill="#d6d3d1" opacity="0.6" />
      <line x1="2" y1="134" x2="238" y2="134" stroke="#65a30d" strokeWidth="3" />
      {floors.map((f, i) => {
        const y = 12 + i * 30;
        return (
          <g key={f}>
            <rect x="50" y={y} width="100" height="28" fill={f < 0 ? '#a8a29e' : f === 0 ? '#fde68a' : '#bfdbfe'} stroke="#475569" />
            <text x="100" y={y + 18} textAnchor="middle" fontSize="10" fill="#0f172a">
              {f > 0 ? `${f}. emelet` : f === 0 ? 'földszint' : 'mélygarázs'}
            </text>
            <rect x="160" y={y + 4} width="34" height="20" rx="5" fill={f === ask ? '#fee2e2' : '#334155'} stroke={f === ask ? C_UNK : 'none'} />
            <text x="177" y={y + 19} textAnchor="middle" fontSize="13" fontWeight="bold" fill={f === ask ? C_UNK : '#ffffff'}>
              {f === ask && from === undefined ? '?' : fmtNum(f)}
            </text>
            {from === f && <text x="34" y={y + 19} fontSize="14">🧒</text>}
            {from !== undefined && f === ask && <text x="34" y={y + 19} fontSize="14">🚗</text>}
          </g>
        );
      })}
    </QFig>
  );
};

const QGraph: React.FC = () => <DayGraphSvg className="w-full max-w-[300px] h-auto mx-auto" />;

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NEGATIVES_EVERYDAY_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ne-q1',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <QThermo value={-4} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['−4 °C', '4 °C', '−6 °C', '−3 °C'],
    correctAnswer: 0,
    explanation: 'A folyadékoszlop a 0 alatt 4 osztással áll meg. A 0 alatti hőmérséklet negatív: −4 °C.'
  },
  {
    id: 'ne-q2',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <QThermo value={1} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['1 °C', '−1 °C', '2 °C', '10 °C'],
    correctAnswer: 0,
    explanation: 'A folyadékoszlop 1 osztással a 0 felett áll meg: 1 °C. Ez fagypont feletti, pozitív hőmérséklet.'
  },
  {
    id: 'ne-q3',
    level: 1,
    questionTypeBadge: 'Negatív szám',
    question: 'Melyik szám kisebb 0-nál?',
    options: ['−13', '13', '50', '0'],
    correctAnswer: 0,
    explanation: 'A 0-nál kisebb számok a negatív számok, ezek előtt mínusz jel áll: −13. A 0 nem kisebb önmagánál.'
  },
  {
    id: 'ne-q4',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Hogyan olvassuk ki: −6 °C?',
    options: ['mínusz 6 fok', 'plusz 6 fok', 'hat fok meleg', 'hatvan fok'],
    correctAnswer: 0,
    explanation: 'A „−” jelet mínusznak olvassuk: mínusz 6 fok. Ez 6 fokkal fagypont alatt van.'
  },
  {
    id: 'ne-q5',
    level: 1,
    questionTypeBadge: 'Fagypont',
    question: 'Hány °C a fagypont, amikor a víz megfagy?',
    options: ['0 °C', '100 °C', '−10 °C', '10 °C'],
    correctAnswer: 0,
    explanation: 'A víz 0 °C-on fagy meg (és olvad el). 100 °C-on forr a víz.'
  },
  {
    id: 'ne-q6',
    level: 1,
    questionTypeBadge: 'Emeletek',
    figure: <QFloors ask={-1} />,
    question: 'Milyen szám áll a lift gombján a földszint alatti első szintnél?',
    options: ['−1', '1', '0', '−2'],
    correctAnswer: 0,
    explanation: 'A földszint a 0. Az alatta lévő első szint −1, a következő −2.'
  },
  {
    id: 'ne-q7',
    level: 1,
    questionTypeBadge: 'Tengerszint',
    figure: <QSea ask="sea" />,
    question: 'A magasságot a tengerszinthez viszonyítjuk. Hány méter a tengerszint?',
    options: ['0 m', '1 m', '−1 m', '100 m'],
    correctAnswer: 0,
    explanation: 'A tengerszint a viszonyítási pont, ezért 0 m. Ami fölötte van, az pozitív, ami alatta, az negatív.'
  },
  {
    id: 'ne-q8',
    level: 1,
    questionTypeBadge: 'Mindennapok',
    question: 'Melyik hőmérséklet illik a szánkózáshoz?',
    options: ['−5 °C', '25 °C', '15 °C', '100 °C'],
    correctAnswer: 0,
    explanation: 'Szánkózni hóban lehet, ahhoz fagy kell: fagypont alatti, negatív hőmérséklet, például −5 °C.'
  },
  {
    id: 'ne-q9',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <QThermo value={-10} min={-10} max={20} />,
    question: 'Zabaron ennyit mutatott reggel a hőmérő. Hány °C volt?',
    options: ['−10 °C', '10 °C', '−1 °C', '0 °C'],
    correctAnswer: 0,
    explanation: 'Az oszlop a −10 jelnél áll meg, a 0 alatt. Ez −10 °C, nagyon hideg reggel.'
  },
  {
    id: 'ne-q10',
    level: 1,
    questionTypeBadge: 'Tengerszint',
    figure: <QSea ask="fish" />,
    question: 'A hal 50 méterrel a tengerszint alatt úszik. Hogyan írjuk le a helyét?',
    options: ['−50 m', '50 m', '0 m', '−5 m'],
    correctAnswer: 0,
    explanation: 'A tengerszint alatt negatív számmal írjuk a mélységet: −50 m.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ne-q11',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <QTowns />,
    question: 'Melyik településen volt a leghidegebb reggel?',
    options: ['Zabar', 'Zirc', 'Miskolc', 'Szeged'],
    correctAnswer: 0,
    explanation: 'A leghidegebb a hőmérőn a legalacsonyabb érték: −10 °C, ezt Zabaron mérték. A −1 °C (Zirc) sokkal kevésbé hideg.'
  },
  {
    id: 'ne-q12',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <QTowns />,
    question: 'Melyik településen volt a legmelegebb reggel?',
    options: ['Pécs', 'Budapest', 'Zabar', 'Szeged'],
    correctAnswer: 0,
    explanation: 'Pécsett 5 °C volt, ez a legmagasabb érték. Zabaron −10 °C volt: a 10 nagy szám, de mínusz előtte, tehát nagyon hideg.'
  },
  {
    id: 'ne-q13',
    level: 2,
    questionTypeBadge: 'Hidegebb, melegebb',
    question: 'Melyik a leghidegebb hőmérséklet?',
    options: ['−10 °C', '−1 °C', '0 °C', '1 °C'],
    correctAnswer: 0,
    explanation: 'A −10 °C 10 fokkal van fagypont alatt, a −1 °C csak 1 fokkal. A hőmérőn a −10 van a legalacsonyabban.'
  },
  {
    id: 'ne-q14',
    level: 2,
    questionTypeBadge: 'Grafikon',
    figure: <QGraph />,
    question: 'Manó grafikonja alapján hány °C volt reggel 8 órakor?',
    options: ['−3 °C', '3 °C', '−2 °C', '0 °C'],
    correctAnswer: 0,
    explanation: 'A 8 óránál lévő pont a 0 vonal alatt van, a −2 és a −4 között félúton: −3 °C.'
  },
  {
    id: 'ne-q15',
    level: 2,
    questionTypeBadge: 'Grafikon',
    figure: <QGraph />,
    question: 'Hány órakor volt a legmelegebb Manó grafikonja szerint?',
    options: ['13 órakor', '12 órakor', '19 órakor', '8 órakor'],
    correctAnswer: 0,
    explanation: 'A legmagasabban lévő pont 13 óránál van, ekkor 6 °C volt. 12 órakor még csak 5 °C.'
  },
  {
    id: 'ne-q16',
    level: 2,
    questionTypeBadge: 'Grafikon',
    figure: <QGraph />,
    question: 'Hány °C volt este 19 órakor?',
    options: ['−4 °C', '4 °C', '−2 °C', '−5 °C'],
    correctAnswer: 0,
    explanation: 'A 19 óránál lévő pont a −4 vonalán van, a 0 alatt: −4 °C. Estére lehűlt a levegő.'
  },
  {
    id: 'ne-q17',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <QThermo value={-15} min={-25} max={25} labelEvery={5} />,
    question: 'Olvasd le a hőmérőt! Hány °C-ot mutat?',
    options: ['−15 °C', '15 °C', '−16 °C', '−5 °C'],
    correctAnswer: 0,
    explanation: 'Ezen a hőmérőn 5-ösével vannak a számok. Az oszlop a 0 alatti harmadik számnál, a −15-nél áll meg: −15 °C.'
  },
  {
    id: 'ne-q18',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <QThermo value={15} min={-25} max={25} labelEvery={5} />,
    question: 'Olvasd le a hőmérőt! Hány °C-ot mutat?',
    options: ['15 °C', '−15 °C', '20 °C', '14 °C'],
    correctAnswer: 0,
    explanation: 'Az oszlop a 0 felett a 15-ös jelig ér: 15 °C. Ez fagypont feletti, kellemes idő.'
  },
  {
    id: 'ne-q19',
    level: 2,
    questionTypeBadge: 'Emeletek',
    figure: <QFloors ask={-1} from={2} />,
    question: 'Liftbe szállsz a 2. emeleten, és lemész a −1. szintre, a mélygarázsba. Hány szintet mész lefelé?',
    options: ['3', '1', '2', '4'],
    correctAnswer: 0,
    explanation: 'Számold a lépéseket: 2 → 1 → 0 (földszint) → −1. Ez 3 szint lefelé.'
  },
  {
    id: 'ne-q20',
    level: 2,
    questionTypeBadge: 'Negatív szám',
    question: 'Melyik szám NEM negatív?',
    options: ['2400', '−100', '−2005', '−37'],
    correctAnswer: 0,
    explanation: 'A negatív számok előtt mínusz jel áll. A 2400 előtt nincs mínusz, ez pozitív szám.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ne-q21',
    level: 3,
    questionTypeBadge: 'Változás',
    figure: <QThermo value={3} note="3 °C-kal" note2="hidegebb: ? °C" />,
    question: 'Budapesten reggel 3 °C volt. Estére 3 °C-kal hidegebb lett. Hány °C volt este?',
    options: ['0 °C', '6 °C', '−3 °C', '3 °C'],
    correctAnswer: 0,
    explanation: 'A hőmérőn 3 lépést lépünk lefelé: 3 → 2 → 1 → 0. Este 0 °C volt.'
  },
  {
    id: 'ne-q22',
    level: 3,
    questionTypeBadge: 'Változás',
    question: 'Zircen reggel −1 °C volt. Estére 4 °C-ot csökkent a hőmérséklet. Hány °C lett?',
    options: ['−5 °C', '3 °C', '−3 °C', '5 °C'],
    correctAnswer: 0,
    explanation: 'Csökken = lefelé lépünk a hőmérőn: −1 → −2 → −3 → −4 → −5. Este −5 °C volt.'
  },
  {
    id: 'ne-q23',
    level: 3,
    questionTypeBadge: 'Változás',
    question: 'Zabaron reggel −10 °C volt. Estére 2 °C-ot emelkedett a hőmérséklet. Hány °C lett?',
    options: ['−8 °C', '−12 °C', '8 °C', '−10 °C'],
    correctAnswer: 0,
    explanation: 'Emelkedik = felfelé lépünk a hőmérőn, a 0 felé: −10 → −9 → −8. Este −8 °C volt.'
  },
  {
    id: 'ne-q24',
    level: 3,
    questionTypeBadge: 'Változás',
    figure: <QThermo value={0} note="2 °C-ot hűlt" note2="este: ? °C" />,
    question: 'Szegeden reggel 0 °C volt. Estére 2 °C-ot hűlt a levegő. Hány °C lett?',
    options: ['−2 °C', '2 °C', '0 °C', '−20 °C'],
    correctAnswer: 0,
    explanation: 'Hűlt = hidegebb lett, lefelé lépünk a 0-tól: 0 → −1 → −2. Este −2 °C volt.'
  },
  {
    id: 'ne-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QThermo value={-17} min={-30} max={10} note="reggel" note2="+10 °C → ?" />,
    question: 'Reggel a hőmérő −17 °C-ot mutatott. Délutánra 10 °C-kal emelkedett a hőmérséklet. Mennyit mutatott a hőmérő délután?',
    options: ['−7 °C', '−27 °C', '7 °C', '27 °C'],
    correctAnswer: 0,
    explanation: 'Felfelé lépünk 10-et: −17-ről −10-ig 7 lépés, onnan még 3 lépés: −7 °C. Még mindig fagypont alatt van.'
  },
  {
    id: 'ne-q26',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: <QTowns />,
    question: 'Mennyivel volt hidegebb Miskolcon (−3 °C), mint Budapesten (3 °C)?',
    options: ['6 °C-kal', '0 °C-kal', '3 °C-kal', '9 °C-kal'],
    correctAnswer: 0,
    explanation: 'Budapest 3 °C-jától a 0-ig 3 lépés, onnan −3 °C-ig még 3 lépés. Összesen 3 + 3 = 6 fok.'
  },
  {
    id: 'ne-q27',
    level: 3,
    questionTypeBadge: 'Különbség',
    question: 'Mennyi a különbség a legmelegebb (Pécs, 5 °C) és a leghidegebb (Zabar, −10 °C) reggeli hőmérséklet között?',
    options: ['15 °C', '5 °C', '10 °C', '−5 °C'],
    correctAnswer: 0,
    explanation: '−10 °C-tól 0 °C-ig 10 fok, 0 °C-tól 5 °C-ig 5 fok. A különbség 10 + 5 = 15 °C.'
  },
  {
    id: 'ne-q28',
    level: 3,
    questionTypeBadge: 'Magasság',
    figure: <QSea ask="diff" />,
    question: 'A jegesmedve 350 m magasan van, a fóka a tengerszinten úszik. Mekkora köztük a magasságbeli különbség?',
    options: ['350 m', '0 m', '400 m', '300 m'],
    correctAnswer: 0,
    explanation: 'A tengerszint 0 m. A 0 m-től a 350 m-ig 350 m a különbség.'
  },
  {
    id: 'ne-q29',
    level: 3,
    questionTypeBadge: 'Nem negatív számok',
    question: 'Add össze a nem negatív számokat: −100, 50, 2400, −520, 1250, −13!',
    options: ['3700', '3650', '2450', '1300'],
    correctAnswer: 0,
    explanation: 'A nem negatív számok: 50, 2400, 1250. Összegük: 50 + 2400 + 1250 = 3700. A mínuszos számokat kihagyjuk.'
  },
  {
    id: 'ne-q30',
    level: 3,
    questionTypeBadge: 'Grafikon',
    figure: <QGraph />,
    question: 'Hány fokot emelkedett a hőmérséklet reggel 8 órától (−3 °C) délután 13 óráig (6 °C)?',
    options: ['9 °C-ot', '3 °C-ot', '6 °C-ot', '5 °C-ot'],
    correctAnswer: 0,
    explanation: '−3 °C-tól 0 °C-ig 3 fok, 0 °C-tól 6 °C-ig 6 fok. Összesen 3 + 6 = 9 fokot emelkedett.'
  }
];

export const NegativesEverydayQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-neg-mindennapok-quiz"
      subtopicId="negativ-szamok-a-mindennapokban"
      title="1. A negatív számok a mindennapokban – Kvíz"
      subtitle="30 feladat 3 szinten: hőmérő leolvasása, fagypont, tengerszint, emeletek, hőmérséklet-változás."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEGATIVES_EVERYDAY_QUESTIONS}
      cheatSheets={[
        {
          title: 'A 0 a kezdőpont',
          items: [
            'Hőmérő: 0 °C a fagypont.',
            'Tengerszint: 0 m.',
            'Ház: a földszint 0, a mélygarázs −1, −2.',
            '0 alatt negatív (−), 0 felett pozitív (+).'
          ]
        },
        {
          title: 'Hőmérő',
          items: [
            '−6 °C: „mínusz 6 fok”, 6 fokkal fagypont alatt.',
            'Ami lejjebb van a hőmérőn, az hidegebb.',
            '−10 °C hidegebb, mint −1 °C.',
            'Nézd meg, hányasával vannak a számok a skálán!'
          ]
        },
        {
          title: 'Változás',
          items: [
            'Emelkedik, melegszik: felfelé lépünk.',
            'Csökken, hűl: lefelé lépünk.',
            '−1 °C, 4 fokot csökken: −5 °C.',
            'Különbség a 0-n át: 3 °C és −3 °C között 3 + 3 = 6 fok.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NegativesEverydayMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NegativesEverydaySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NegativesEverydayQuiz;
