import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegativeChangesMatcher } from './NegativeChangesMatcher';
import { NegativeChangesSorter } from './NegativeChangesSorter';
import { MiniLine, WalletGroup, TempChangeSvg, CARD_NUMBERS, fmtNum } from './NegativeChangesFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FONT = 'system-ui, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Két szám a számegyenesen, köztük „?” jel. */
const QCompare: React.FC<{ a: number; b: number; min: number; max: number }> = ({ a, b, min, max }) => (
  <QFig h={110} w={280}>
    <text x="140" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
      {fmtNum(a)} <tspan fill={C_UNK}>?</tspan> {fmtNum(b)}
    </text>
    <MiniLine min={min} max={max} y={72} x0={20} x1={250} marks={[{ v: a, label: fmtNum(a) }, { v: b, label: fmtNum(b) }]} />
  </QFig>
);

/** A tankönyvi számkártyák. */
const QCards: React.FC = () => {
  const cols = ['#f97316', '#1e3a8a', '#c026d3', '#0ea5e9', '#db2777', '#f97316', '#7c2d12', '#b91c1c'];
  return (
    <QFig h={80} w={280}>
      {CARD_NUMBERS.map((n, i) => (
        <g key={n}>
          <rect x={14 + (i % 4) * 64} y={10 + Math.floor(i / 4) * 32} width="56" height="24" rx="12" fill={cols[i]} />
          <text x={42 + (i % 4) * 64} y={27 + Math.floor(i / 4) * 32} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">{fmtNum(n)}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Fabatka-pénztárca kérdőjellel. */
const QWallet: React.FC<{ cash: number; debt: number }> = ({ cash, debt }) => (
  <QFig h={150} w={260}>
    <circle cx="20" cy="18" r="6" fill="#ef4444" />
    <text x="30" y="22" fontSize="10" fill="#0f172a">1 fabatka</text>
    <rect x="130" y="12" width="12" height="12" fill="#2563eb" />
    <text x="148" y="22" fontSize="10" fill="#0f172a">1 adósság</text>
    <WalletGroup x={30} y={36} cash={cash} debt={debt} w={200} h={86} />
    <text x="130" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Vagyon: ? fabatka</text>
  </QFig>
);

/** Kriszti pénztárcája és a cédula. */
const QSlip: React.FC<{ cash: string; debt: string }> = ({ cash, debt }) => (
  <QFig h={110} w={280}>
    <rect x="14" y="16" width="100" height="56" rx="10" fill="#fde68a" stroke="#92400e" />
    <text x="64" y="50" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">{cash}</text>
    <rect x="128" y="24" width="140" height="40" rx="20" fill="#1e3a8a" />
    <text x="198" y="49" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{debt} tartozás</text>
    <text x="140" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Együtt: ?</text>
  </QFig>
);

const QChange: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <TempChangeSvg className="w-full max-w-[280px] h-auto mx-auto" from={from} to={to} ask />
);

/** Vagyonváltozás nyíllal. */
const QWealth: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={90} w={260}>
    <text x="50" y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{fmtNum(a)} Ft</text>
    <line x1="96" y1="47" x2="160" y2="47" stroke="#334155" strokeWidth="2" />
    <polygon points="168,47 158,41 158,53" fill="#334155" />
    <text x="128" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>?</text>
    <text x="212" y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{fmtNum(b)} Ft</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NEGATIVE_CHANGES_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'nc-q1',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <QCompare a={-1} b={-2} min={-5} max={5} />,
    question: 'Melyik igaz?',
    options: ['−1 > −2', '−1 < −2', '−1 = −2', '−2 > −1'],
    correctAnswer: 0,
    explanation: 'A −1 a számegyenesen jobbra van a −2-től, ezért nagyobb: −1 > −2. Közelebb van a 0-hoz.'
  },
  {
    id: 'nc-q2',
    level: 1,
    questionTypeBadge: 'Relációs jel',
    figure: <QCompare a={-20} b={-10} min={-25} max={5} />,
    question: 'Melyik jel kerül a „?” helyére: −20 ? −10',
    options: ['<', '>', '=', '+'],
    correctAnswer: 0,
    explanation: 'A −20 balra van a −10-től, tehát kisebb: −20 < −10.'
  },
  {
    id: 'nc-q3',
    level: 1,
    questionTypeBadge: 'Legkisebb',
    figure: <QCards />,
    question: 'Melyik a legkisebb szám a kártyák közül?',
    options: ['−14', '−2', '0', '−8'],
    correctAnswer: 0,
    explanation: 'A negatív számok közül az a legkisebb, amelyik a 0-tól a legmesszebb van balra: −14.'
  },
  {
    id: 'nc-q4',
    level: 1,
    questionTypeBadge: 'Legnagyobb',
    figure: <QCards />,
    question: 'Melyik a legnagyobb szám a kártyák közül?',
    options: ['11', '8', '−14', '0'],
    correctAnswer: 0,
    explanation: 'A pozitív számok nagyobbak a 0-nál és a negatív számoknál. A 11 > 8, tehát a 11 a legnagyobb.'
  },
  {
    id: 'nc-q5',
    level: 1,
    questionTypeBadge: 'Leghidegebb',
    question: 'Melyik a legalacsonyabb hőmérséklet: −21 °C, −45 °C, −3 °C?',
    options: ['−45 °C', '−21 °C', '−3 °C', 'mind egyforma'],
    correctAnswer: 0,
    explanation: 'A −45 °C van a legmélyebben a hőmérőn, a 0 alatt 45 fokkal. Ez a leghidegebb.'
  },
  {
    id: 'nc-q6',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Igaz vagy hamis? „Hidegebb van, amikor a hőmérő −7 °C-ot mutat, mint amikor −2 °C-ot.”',
    options: ['Igaz', 'Hamis', 'Egyforma hideg van', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'A −7 °C a hőmérőn lejjebb van, mint a −2 °C, ezért hidegebb. Az állítás igaz.'
  },
  {
    id: 'nc-q7',
    level: 1,
    questionTypeBadge: 'Fabatka',
    figure: <QWallet cash={4} debt={1} />,
    question: 'Zsuzsinak 4 fabatka készpénze és 1 fabatka adóssága van. Mennyi marad a törlesztés után?',
    options: ['3 fabatka', '5 fabatka', '4 fabatka', '−3 fabatka'],
    correctAnswer: 0,
    explanation: '1 kör és 1 négyzet együtt 0. Egy párt kiveszünk, marad 3 piros kör: 3 fabatka.'
  },
  {
    id: 'nc-q8',
    level: 1,
    questionTypeBadge: 'Adósság',
    figure: <QSlip cash="500 Ft" debt="200 Ft" />,
    question: 'Kriszti pénztárcájában 500 Ft és egy 200 Ft-os adósságcédula van. Mennyit ér ez együtt?',
    options: ['300 Ft', '700 Ft', '500 Ft', '−300 Ft'],
    correctAnswer: 0,
    explanation: 'Az adósság csökkenti a vagyont: 500 − 200 = 300 Ft.'
  },
  {
    id: 'nc-q9',
    level: 1,
    questionTypeBadge: 'Változás',
    question: 'A hőmérséklet −4 °C-ról 0 °C-ra változott. Mi történt?',
    options: ['melegedett', 'hűlt', 'nem változott', 'fagyott'],
    correctAnswer: 0,
    explanation: 'A 0 °C a hőmérőn feljebb van, mint a −4 °C. Felfelé változott, tehát melegedett (4 fokot).'
  },
  {
    id: 'nc-q10',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <QCompare a={0} b={-3} min={-5} max={5} />,
    question: 'Melyik igaz?',
    options: ['0 > −3', '0 < −3', '0 = −3', '−3 > 0'],
    correctAnswer: 0,
    explanation: 'Minden negatív szám kisebb a 0-nál, mert a 0-tól balra van. Tehát 0 > −3.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'nc-q11',
    level: 2,
    questionTypeBadge: 'Növekvő sorrend',
    question: 'Melyik a helyes növekvő sorrend? −2 °C, −7 °C, −5 °C, 0 °C, −17 °C, 13 °C',
    options: ['−17, −7, −5, −2, 0, 13', '−2, −5, −7, −17, 0, 13', '0, −2, −5, −7, 13, −17', '13, 0, −2, −5, −7, −17'],
    correctAnswer: 0,
    explanation: 'Növekvő: a legkisebbtől (leghidegebbtől) a legnagyobbig. A legkisebb a −17, utána −7, −5, −2, majd 0 és 13.'
  },
  {
    id: 'nc-q12',
    level: 2,
    questionTypeBadge: 'Csökkenő sorrend',
    question: 'Melyik a helyes csökkenő sorrend? 25 °C, −4 °C, 1 °C, −8 °C, 6 °C, −10 °C',
    options: ['25, 6, 1, −4, −8, −10', '−10, −8, −4, 1, 6, 25', '25, −10, −8, 6, −4, 1', '25, 6, 1, −10, −8, −4'],
    correctAnswer: 0,
    explanation: 'Csökkenő: a legnagyobbtól a legkisebbig. 25, 6, 1, aztán a negatívak a 0-hoz legközelebbivel kezdve: −4, −8, −10.'
  },
  {
    id: 'nc-q13',
    level: 2,
    questionTypeBadge: 'Hidegebb lett',
    figure: <QChange from={-4} to={-19} />,
    question: 'A hőmérséklet −4 °C-ról −19 °C-ra változott. Hány °C-kal lett hidegebb?',
    options: ['15 °C-kal', '23 °C-kal', '19 °C-kal', '4 °C-kal'],
    correctAnswer: 0,
    explanation: 'Mindkettő a 0 alatt van, ezért kivonunk: 19 − 4 = 15. A 23 akkor jönne ki, ha átlépnénk a 0-t, de itt nem lépjük át.'
  },
  {
    id: 'nc-q14',
    level: 2,
    questionTypeBadge: 'Hidegebb lett',
    figure: <QChange from={-51} to={-54} />,
    question: 'A hőmérséklet −51 °C-ról −54 °C-ra változott. Hány °C-kal lett hidegebb?',
    options: ['3 °C-kal', '105 °C-kal', '54 °C-kal', '4 °C-kal'],
    correctAnswer: 0,
    explanation: 'A −51-től lefelé lépünk: −52, −53, −54. Ez 3 lépés: 54 − 51 = 3.'
  },
  {
    id: 'nc-q15',
    level: 2,
    questionTypeBadge: 'Melegedés',
    question: 'A hőmérséklet −5 °C-ról 2 °C-ra változott. Hány fokot melegedett?',
    options: ['7 fokot', '3 fokot', '5 fokot', '2 fokot'],
    correctAnswer: 0,
    explanation: 'Átlépjük a 0-t: −5 °C-tól 0 °C-ig 5 fok, onnan 2 °C-ig még 2 fok. 5 + 2 = 7.'
  },
  {
    id: 'nc-q16',
    level: 2,
    questionTypeBadge: 'Hűlés',
    question: 'A hőmérséklet −4 °C-ról −8 °C-ra csökkent. Hány fokot hűlt a levegő?',
    options: ['4 fokot', '12 fokot', '8 fokot', '2 fokot'],
    correctAnswer: 0,
    explanation: 'Nem lépjük át a 0-t: 8 − 4 = 4 fokot hűlt.'
  },
  {
    id: 'nc-q17',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QFig h={80} w={280}><MiniLine min={-20} max={-10} y={44} x0={20} x1={250} labelEvery={1} marks={[]} /></QFig>,
    question: 'Mely egész számok teszik igazzá: −17 < ○ < −13?',
    options: ['−16, −15, −14', '−17, −16, −15, −14, −13', '−15, −14', '13, 14, 15, 16'],
    correctAnswer: 0,
    explanation: 'A −17 és a −13 közötti számok kellenek, a −17 és a −13 maga nem jó, mert egy szám nem kisebb önmagánál: −16, −15, −14.'
  },
  {
    id: 'nc-q18',
    level: 2,
    questionTypeBadge: 'Válogatás',
    figure: <QCards />,
    question: 'Melyek a −3-nál nagyobb számok a kártyák közül?',
    options: ['−2, 0, 8, 11', '−6, −5, −8, −14', '8, 11', '0, 8, 11'],
    correctAnswer: 0,
    explanation: 'A −3-tól jobbra lévő számok nagyobbak: −2, 0, 8, 11. A −2 is nagyobb, mert közelebb van a 0-hoz!'
  },
  {
    id: 'nc-q19',
    level: 2,
    questionTypeBadge: 'Fabatka',
    figure: <QWallet cash={7} debt={2} />,
    question: 'A cédulán ez áll: 7 fabatka és 2 adósságcédula. Melyik szám tartozik hozzá a számegyenesen?',
    options: ['5', '−5', '9', '7'],
    correctAnswer: 0,
    explanation: '2 fabatkával kifizetjük a 2 adósságot, marad 7 − 2 = 5 fabatka.'
  },
  {
    id: 'nc-q20',
    level: 2,
    questionTypeBadge: 'Kölcsön',
    question: 'Zitának 500 Ft-ja van. Hány forintot kell kölcsönkérnie a testvérétől, ha 690 Ft-os újságot szeretne venni?',
    options: ['190 Ft-ot', '1190 Ft-ot', '290 Ft-ot', '690 Ft-ot'],
    correctAnswer: 0,
    explanation: 'Ami hiányzik: 690 − 500 = 190 Ft. Ennyi lesz az adóssága a testvérénél.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'nc-q21',
    level: 3,
    questionTypeBadge: 'Fabatka',
    figure: <QWallet cash={9} debt={10} />,
    question: '9 fabatka készpénz és 10 adósságcédula van a pénztárcában. Mennyi a vagyon?',
    options: ['−1 fabatka', '1 fabatka', '19 fabatka', '−19 fabatka'],
    correctAnswer: 0,
    explanation: '9 adósságot kifizet a 9 fabatka, de 1 adósság marad: a vagyon −1 fabatka.'
  },
  {
    id: 'nc-q22',
    level: 3,
    questionTypeBadge: 'Fabatka',
    figure: <QWallet cash={9} debt={13} />,
    question: '9 fabatka készpénz és 13 adósságcédula van a pénztárcában. Mennyi a vagyon?',
    options: ['−4 fabatka', '4 fabatka', '−3 fabatka', '22 fabatka'],
    correctAnswer: 0,
    explanation: '9 párt törlesztünk, marad 13 − 9 = 4 adósság. A vagyon −4 fabatka.'
  },
  {
    id: 'nc-q23',
    level: 3,
    questionTypeBadge: 'Hidegebb lett',
    figure: <QChange from={-1} to={-21} />,
    question: 'A hőmérséklet −1 °C-ról −21 °C-ra változott. Hány °C-kal lett hidegebb?',
    options: ['20 °C-kal', '22 °C-kal', '21 °C-kal', '1 °C-kal'],
    correctAnswer: 0,
    explanation: 'Mindkettő a 0 alatt van: 21 − 1 = 20 fokkal lett hidegebb.'
  },
  {
    id: 'nc-q24',
    level: 3,
    questionTypeBadge: 'Melegedés',
    figure: <QChange from={-11} to={3} />,
    question: 'A hőmérséklet −11 °C-ról 3 °C-ra változott. Hány fokot emelkedett?',
    options: ['14 fokot', '8 fokot', '11 fokot', '3 fokot'],
    correctAnswer: 0,
    explanation: 'Átlépjük a 0-t: −11 °C-tól 0 °C-ig 11 fok, 0 °C-tól 3 °C-ig 3 fok. 11 + 3 = 14.'
  },
  {
    id: 'nc-q25',
    level: 3,
    questionTypeBadge: 'Csökkentés',
    question: 'A −15 °C-ot 6 °C-kal csökkentjük. Hány °C lesz?',
    options: ['−21 °C', '−9 °C', '21 °C', '−16 °C'],
    correctAnswer: 0,
    explanation: 'Csökkentés = lefelé lépünk a hőmérőn, még messzebb a 0-tól: −15-től 6-tal lejjebb −21 °C.'
  },
  {
    id: 'nc-q26',
    level: 3,
    questionTypeBadge: 'Csökkentés',
    question: 'A 15 °C-ot 35 °C-kal csökkentjük. Hány °C lesz?',
    options: ['−20 °C', '20 °C', '−50 °C', '50 °C'],
    correctAnswer: 0,
    explanation: '15 fokot lépünk le a 0-ig, a 35-ből még 20 marad: a 0 alatt 20 fokkal, −20 °C.'
  },
  {
    id: 'nc-q27',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'A szabály: ▲ = ● − 3 °C (a ▲ 3 fokkal hidegebb). Ha ● = −10 °C, mennyi ▲?',
    options: ['−13 °C', '−7 °C', '13 °C', '−30 °C'],
    correctAnswer: 0,
    explanation: 'A −10 °C-nál 3 fokkal hidegebb: lefelé lépünk 3-at: −11, −12, −13 °C.'
  },
  {
    id: 'nc-q28',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'A szabály: ▲ = ● − 3 °C (a ▲ 3 fokkal hidegebb). Ha ▲ = −7 °C, mennyi ●?',
    options: ['−4 °C', '−10 °C', '4 °C', '−21 °C'],
    correctAnswer: 0,
    explanation: 'A ● 3 fokkal melegebb a ▲-nál: a −7 °C-tól felfelé 3-at lépünk: −6, −5, −4 °C.'
  },
  {
    id: 'nc-q29',
    level: 3,
    questionTypeBadge: 'Vagyon',
    figure: <QWealth a={500} b={-1000} />,
    question: 'A vagyon 500 Ft-ról −1000 Ft-ra változott. Hogyan és mennyivel változott?',
    options: ['csökkent 1500 Ft-tal', 'csökkent 500 Ft-tal', 'nőtt 1500 Ft-tal', 'nőtt 500 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Lefelé változott, tehát csökkent. 500 Ft-tól 0-ig 500, 0-tól −1000-ig 1000: 500 + 1000 = 1500 Ft.'
  },
  {
    id: 'nc-q30',
    level: 3,
    questionTypeBadge: 'Tartozás',
    question: 'A perselyedben 50 Ft van, de 2080 Ft a tartozásod. Mennyi pénzt kell még gyűjtened, hogy ki tudd egyenlíteni?',
    options: ['2030 Ft-ot', '2130 Ft-ot', '2080 Ft-ot', '1580 Ft-ot'],
    correctAnswer: 0,
    explanation: 'Az 50 Ft-tal 50 Ft tartozást már ki tudsz fizetni. Még 2080 − 50 = 2030 Ft hiányzik.'
  }
];

export const NegativeChangesQuiz: React.FC<{
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
      topicId="g4-neg-valtozasok-quiz"
      subtopicId="osszehasonlitas-es-valtozasok"
      title="3. Összehasonlítás és változások – Kvíz"
      subtitle="30 feladat 3 szinten: kisebb, nagyobb, sorba rendezés, hőmérséklet-változás, fabatka és adósság."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEGATIVE_CHANGES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összehasonlítás',
          items: [
            'Jobbra a nagyobb, balra a kisebb szám.',
            'Minden negatív szám kisebb a 0-nál.',
            'Két negatív közül a 0-hoz közelebbi a nagyobb: −1 > −2.',
            'Hidegebb = kisebb szám: −7 °C < −2 °C.'
          ]
        },
        {
          title: 'Változás',
          items: [
            'A 0 egyik oldalán: kivonunk (−4 → −19: 19 − 4 = 15).',
            'A 0-n át: összeadunk (−5 → 2: 5 + 2 = 7).',
            'Csökken, hűl: lefelé lépünk.',
            'Emelkedik, melegszik: felfelé lépünk.'
          ]
        },
        {
          title: 'Fabatka',
          items: [
            '● = 1 fabatka készpénz, ■ = 1 fabatka adósság.',
            '● + ■ = 0 (törlesztés).',
            '7 ● és 2 ■ = 5; 9 ● és 13 ■ = −4.',
            '500 Ft és 200 Ft adósság: 300 Ft.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NegativeChangesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NegativeChangesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NegativeChangesQuiz;
