import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OrderOfOps10000Matcher } from './OrderOfOps10000Matcher';
import { OrderOfOps10000Sorter } from './OrderOfOps10000Sorter';
import { FishHookSvg, MonaManoSvg, Wagon, WAGONS } from './OrderOfOps10000Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Műveletsor-kártya: a műveleti jelek lilák, a zárójel narancs; opcionálisan körök a jelek fölött. */
const QExpr: React.FC<{ expr: string; circles?: boolean; tail?: string }> = ({ expr, circles, tail = '= ?' }) => {
  const toks = expr.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ').filter(Boolean);
  const widths = toks.map((t) => (t.length <= 1 ? 12 : t.length * 10 + 4));
  const total = widths.reduce((a, b) => a + b, 0) + (tail ? 40 : 0);
  const scale = Math.min(1, 222 / total);
  let x = 120 - (total * scale) / 2;
  const h = circles ? 96 : 76;
  const y = circles ? 66 : 46;
  return (
    <QFig h={h}>
      {toks.map((t, i) => {
        const w = widths[i] * scale;
        const cx = x + w / 2;
        x += w;
        const isOp = ['+', '−', '·', ':'].includes(t);
        const isPar = t === '(' || t === ')';
        return (
          <g key={i}>
            {isOp && circles && <circle cx={cx} cy="28" r="9" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />}
            <text x={cx} y={y} textAnchor="middle" fontSize={18 * Math.max(scale, 0.7)} fontWeight="bold" fill={isOp ? '#7c3aed' : isPar ? '#ea580c' : '#0f172a'}>
              {t}
            </text>
          </g>
        );
      })}
      {tail && (
        <text x={x + 20 * scale} y={y} textAnchor="middle" fontSize={18 * Math.max(scale, 0.7)} fontWeight="bold" fill={C_UNK}>
          {tail}
        </text>
      )}
    </QFig>
  );
};

/** Egy kocsi a vasúti szerelvényből. */
const QWagon: React.FC<{ l: string }> = ({ l }) => {
  const w = WAGONS.find((x) => x.l === l)!;
  return (
    <QFig h={84}>
      <Wagon x={42} y={10} l={w.l} expr={w.expr} c={w.c} w={156} />
      <line x1="20" y1="70" x2="220" y2="70" stroke="#64748b" strokeWidth="2" />
    </QFig>
  );
};

/** Jelfelrakó: 4800 ■ 60 ■ 10 */
const QSigns: React.FC<{ target: number; left?: boolean }> = ({ target, left }) => (
  <QFig h={70}>
    <text x="120" y="42" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">
      {left ? `${target} = ` : ''}4800 <tspan fill={C_UNK}>■</tspan> 60 <tspan fill={C_UNK}>■</tspan> 10{left ? '' : ` = ${target}`}
    </text>
  </QFig>
);

/** Számegyenes-részlet nyitott mondathoz. */
const QInterval: React.FC<{ lo: string; hi: string; label: string }> = ({ lo, hi, label }) => (
  <QFig h={100}>
    <text x="120" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{label}</text>
    <line x1="14" y1="66" x2="226" y2="66" stroke="#334155" strokeWidth="2" />
    <polygon points="226,66 218,61 218,71" fill="#334155" />
    <line x1="56" y1="52" x2="184" y2="52" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
    <circle cx="56" cy="52" r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
    <circle cx="184" cy="52" r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
    <text x="56" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">{lo}</text>
    <text x="184" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">{hi}</text>
    <text x="120" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>□ = ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const ORDER10K_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'oo10-q1',
    level: 1,
    questionTypeBadge: 'Szorzás előbb',
    figure: <QExpr expr="4264 − 1316 · 3" circles />,
    question: 'Mennyi 4264 − 1316 · 3?',
    options: ['316', '8844', '2948', '416'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 1316 · 3 = 3948. Utána a kivonás: 4264 − 3948 = 316.'
  },
  {
    id: 'oo10-q2',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="(4264 − 1316) · 3" circles />,
    question: 'Mennyi (4264 − 1316) · 3?',
    options: ['8844', '316', '2948', '8834'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 4264 − 1316 = 2948. Utána 2948 · 3 = 8844.'
  },
  {
    id: 'oo10-q3',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    figure: <QExpr expr="9464 − 3518 + 1325" />,
    question: 'Mennyi 9464 − 3518 + 1325?',
    options: ['7271', '4621', '5946', '7281'],
    correctAnswer: 0,
    explanation: 'Csak kivonás és összeadás van, ezért balról jobbra: 9464 − 3518 = 5946, 5946 + 1325 = 7271.'
  },
  {
    id: 'oo10-q4',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    figure: <QExpr expr="5 · 1614 : 3" />,
    question: 'Mennyi 5 · 1614 : 3?',
    options: ['2690', '8070', '2590', '538'],
    correctAnswer: 0,
    explanation: 'Csak szorzás és osztás van, balról jobbra: 5 · 1614 = 8070, 8070 : 3 = 2690.'
  },
  {
    id: 'oo10-q5',
    level: 1,
    questionTypeBadge: 'Osztás előbb',
    figure: <QExpr expr="1386 + 2634 : 6" />,
    question: 'Mennyi 1386 + 2634 : 6?',
    options: ['1825', '670', '4020', '1835'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 2634 : 6 = 439. Utána 1386 + 439 = 1825.'
  },
  {
    id: 'oo10-q6',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="(1386 + 2634) : 6" />,
    question: 'Mennyi (1386 + 2634) : 6?',
    options: ['670', '1825', '4020', '680'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 1386 + 2634 = 4020. Utána 4020 : 6 = 670.'
  },
  {
    id: 'oo10-q7',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <QExpr expr="7464 − 2268 : 6" circles tail="" />,
    question: 'Melyik műveletet végezzük el először a 7464 − 2268 : 6 műveletsorban?',
    options: ['2268 : 6', '7464 − 2268', 'mindegy, melyiket', '7464 : 6'],
    correctAnswer: 0,
    explanation: 'Az osztás megelőzi a kivonást: 2268 : 6 = 378, aztán 7464 − 378 = 7086.'
  },
  {
    id: 'oo10-q8',
    level: 1,
    questionTypeBadge: 'Zsebpénz',
    figure: <MonaManoSvg className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Mona így számolt: 2550 : 2 + 3450 : 2. Mennyi jutott neki?',
    options: ['3000 Ft', '4725 Ft', '6000 Ft', '2550 Ft'],
    correctAnswer: 0,
    explanation: 'Először az osztások: 2550 : 2 = 1275 és 3450 : 2 = 1725. Utána 1275 + 1725 = 3000 Ft.'
  },
  {
    id: 'oo10-q9',
    level: 1,
    questionTypeBadge: 'Zsebpénz',
    question: 'Manó így számolt: (2550 + 3450) : 2. Ki osztotta el helyesen a pénzt, Mona vagy Manó?',
    options: ['Mindketten helyesen', 'Csak Mona', 'Csak Manó', 'Egyikük sem'],
    correctAnswer: 0,
    explanation: 'Manó: 6000 : 2 = 3000 Ft. Mona is 3000 Ft-ot kapott. Az összeg fele ugyanannyi, mint a felek összege, ezért mindketten jól gondolkodtak.'
  },
  {
    id: 'oo10-q10',
    level: 1,
    questionTypeBadge: 'Szorzás előbb',
    figure: <QExpr expr="3 · 450 + 1450" />,
    question: 'Mennyi 3 · 450 + 1450?',
    options: ['2800', '5700', '1900', '2850'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 3 · 450 = 1350. Utána 1350 + 1450 = 2800.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'oo10-q11',
    level: 2,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="3 · (450 + 1450)" />,
    question: 'Mennyi 3 · (450 + 1450)?',
    options: ['5700', '2800', '1900', '5600'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 450 + 1450 = 1900. Utána 3 · 1900 = 5700.'
  },
  {
    id: 'oo10-q12',
    level: 2,
    questionTypeBadge: 'Szövegből műveletsor',
    question: 'Melyik számra gondoltam? A 6540 és a 3120 összegének a harmada.',
    options: ['3220', '7580', '9660', '3320'],
    correctAnswer: 0,
    explanation: '(6540 + 3120) : 3 = 9660 : 3 = 3220. Zárójel nélkül (6540 + 3120 : 3 = 7580) rossz lenne!'
  },
  {
    id: 'oo10-q13',
    level: 2,
    questionTypeBadge: 'Szövegből műveletsor',
    question: 'Melyik számra gondoltam? A 8915 és a 4875 különbségének a fele.',
    options: ['2020', '4040', '2002', '2120'],
    correctAnswer: 0,
    explanation: '(8915 − 4875) : 2 = 4040 : 2 = 2020.'
  },
  {
    id: 'oo10-q14',
    level: 2,
    questionTypeBadge: 'Szövegből műveletsor',
    question: 'Melyik számra gondoltam? Az 5543 és a 4129 különbségének az ötszöröse.',
    options: ['7070', '1414', '7170', '6070'],
    correctAnswer: 0,
    explanation: '(5543 − 4129) · 5 = 1414 · 5 = 7070.'
  },
  {
    id: 'oo10-q15',
    level: 2,
    questionTypeBadge: 'Szövegből műveletsor',
    question: 'Melyik számra gondoltam? Az 1312 és a 2879 összegének a kétszerese.',
    options: ['8382', '7070', '4191', '8282'],
    correctAnswer: 0,
    explanation: '(1312 + 2879) · 2 = 4191 · 2 = 8382. (Zárójel nélkül 1312 + 2879 · 2 = 7070 lenne – az nem az összeg kétszerese.)'
  },
  {
    id: 'oo10-q16',
    level: 2,
    questionTypeBadge: 'Vasúti kocsi',
    figure: <QWagon l="P" />,
    question: 'Mennyi a P kocsi műveletsorának eredménye: (7464 − 2268) : 6?',
    options: ['866', '7086', '5196', '876'],
    correctAnswer: 0,
    explanation: 'Zárójel: 7464 − 2268 = 5196. Utána 5196 : 6 = 866.'
  },
  {
    id: 'oo10-q17',
    level: 2,
    questionTypeBadge: 'Vasúti kocsi',
    figure: <QWagon l="K" />,
    question: 'Mennyi a K kocsi műveletsorának eredménye: 3450 + 1456 · 4?',
    options: ['9274', '9824', '5824', '9264'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 1456 · 4 = 5824. Utána 3450 + 5824 = 9274.'
  },
  {
    id: 'oo10-q18',
    level: 2,
    questionTypeBadge: 'Tábor',
    figure: <QExpr expr="1294 · 7 − 9026" />,
    question: 'A tábor maximális létszáma: 1294 · 7 − 9026 fő. Hány fő ez?',
    options: ['32', '42', '23', '9058'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 1294 · 7 = 9058. Utána 9058 − 9026 = 32 fő.'
  },
  {
    id: 'oo10-q19',
    level: 2,
    questionTypeBadge: 'Tábor',
    figure: <QExpr expr="1657 · 4 + 2872" />,
    question: 'A tábor részvételi díja 1657 · 4 + 2872 Ft. Mennyi ez?',
    options: ['9500 Ft', '9400 Ft', '4529 Ft', '9510 Ft'],
    correctAnswer: 0,
    explanation: '1657 · 4 = 6628, 6628 + 2872 = 9500 Ft.'
  },
  {
    id: 'oo10-q20',
    level: 2,
    questionTypeBadge: 'Tábor',
    figure: <QExpr expr="9400 : 100 − 66" />,
    question: 'A tábor július 9400 : 100 − 66-án kezdődik. Hányadikán?',
    options: ['28-án', '38-án', '18-án', '94-én'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 9400 : 100 = 94. Utána 94 − 66 = 28. Július 28-án kezdődik.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'oo10-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Hanna és Péter 6120 Ft-jának a harmadát elköltötték. Mennyit kell még gyűjteniük, ha mindketten 3000 Ft-ot szeretnének vinni a táborba?',
    options: ['1920 Ft', '4080 Ft', '3960 Ft', '120 Ft'],
    correctAnswer: 0,
    explanation: 'Elköltöttek 6120 : 3 = 2040 Ft-ot, maradt 6120 − 2040 = 4080 Ft. Kell 2 · 3000 = 6000 Ft. 6000 − 4080 = 1920 Ft.'
  },
  {
    id: 'oo10-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Karcsi bakancsot vett 6450 Ft-ért és 3 pár zoknit, páronként 285 Ft-ért. Mennyit kaptak vissza a 10 000 Ft-osból?',
    options: ['2695 Ft', '4405 Ft', '3265 Ft', '2685 Ft'],
    correctAnswer: 0,
    explanation: '10 000 − (6450 + 3 · 285) = 10 000 − (6450 + 855) = 10 000 − 7305 = 2695 Ft.'
  },
  {
    id: 'oo10-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '3 egyforma pulóvert vettek, és 1450 Ft-ot kaptak vissza a 10 000 Ft-osból. Mennyibe került 1 pulóver?',
    options: ['2850 Ft', '8550 Ft', '2950 Ft', '2840 Ft'],
    correctAnswer: 0,
    explanation: 'A pulóverek ára együtt 10 000 − 1450 = 8550 Ft. Egy pulóver (10 000 − 1450) : 3 = 2850 Ft.'
  },
  {
    id: 'oo10-q24',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QInterval lo="2973 + 4122 : 3" hi="972 · 7" label="972 · 7 > □ > 2973 + 4122 : 3" />,
    question: 'Melyik szám teszi igazzá: 972 · 7 > □ > 2973 + 4122 : 3?',
    options: ['5000', '7000', '4347', '3000'],
    correctAnswer: 0,
    explanation: '972 · 7 = 6804 és 2973 + 4122 : 3 = 2973 + 1374 = 4347. A szám 4347-nél nagyobb, 6804-nél kisebb: az 5000 jó. A 4347 nem jó, mert nem nagyobb önmagánál.'
  },
  {
    id: 'oo10-q25',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QInterval lo="1184 · 2 + 184 · 4" hi="5485 − 379 · 3" label="1184 · 2 + 184 · 4 < □ < 5485 − 379 · 3" />,
    question: 'Melyik szám teszi igazzá: 1184 · 2 + 184 · 4 < □ < 5485 − 379 · 3?',
    options: ['4000', '3104', '4500', '3000'],
    correctAnswer: 0,
    explanation: '2368 + 736 = 3104 és 5485 − 1137 = 4348. A szám 3104 és 4348 között van: a 4000 jó.'
  },
  {
    id: 'oo10-q26',
    level: 3,
    questionTypeBadge: 'Műveleti jelek',
    figure: <QSigns target={5400} />,
    question: 'Melyik két jel teszi igazzá: 4800 ■ 60 ■ 10 = 5400?',
    options: ['+ és ·', '+ és +', '− és ·', '· és +'],
    correctAnswer: 0,
    explanation: '4800 + 60 · 10 = 4800 + 600 = 5400. (4800 + 60 + 10 = 4870, 4800 − 60 · 10 = 4200.)'
  },
  {
    id: 'oo10-q27',
    level: 3,
    questionTypeBadge: 'Műveleti jelek',
    figure: <QSigns target={90} left />,
    question: 'Melyik két jel teszi igazzá: 90 = 4800 ■ 60 ■ 10?',
    options: [': és +', ': és ·', '− és :', ': és −'],
    correctAnswer: 0,
    explanation: '4800 : 60 + 10 = 80 + 10 = 90. (4800 : 60 · 10 = 800, 4800 − 60 : 10 = 4794, 4800 : 60 − 10 = 70.)'
  },
  {
    id: 'oo10-q28',
    level: 3,
    questionTypeBadge: 'Lékhorgászat',
    figure: <FishHookSvg className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Melyik halat fogta ki Norbi apukája? 8569 − 1456 · 3 > □ > 4150',
    options: ['4197', '4295', '8028', '7998'],
    correctAnswer: 0,
    explanation: '8569 − 1456 · 3 = 8569 − 4368 = 4201. A szám 4150 és 4201 között van: csak a 4197 jó. A 4295 már nagyobb 4201-nél.'
  },
  {
    id: 'oo10-q29',
    level: 3,
    questionTypeBadge: 'Térkép',
    figure: <QExpr expr="(7344 − 6252) : 6" />,
    question: 'Az esztergomi bazilika képe alatt ez áll: (7344 − 6252) : 6. Melyik szám van a térkép Esztergomnál lévő részén?',
    options: ['182', '6302', '1092', '172'],
    correctAnswer: 0,
    explanation: 'Zárójel: 7344 − 6252 = 1092. Utána 1092 : 6 = 182. (Zárójel nélkül 7344 − 1042 = 6302 lenne.)'
  },
  {
    id: 'oo10-q30',
    level: 3,
    questionTypeBadge: 'Páros vagy páratlan?',
    figure: <QExpr expr="(4628 − 2353) · 3" />,
    question: 'A kidobósban a csapat annyi játékost veszít, ahány páros eredmény van. Páros vagy páratlan a (4628 − 2353) · 3 eredménye?',
    options: ['Páratlan, mert 6825', 'Páros, mert 6826', 'Páros, mert 6824', 'Páratlan, mert 2275'],
    correctAnswer: 0,
    explanation: 'Zárójel: 4628 − 2353 = 2275. Utána 2275 · 3 = 6825. Az 5-re végződik, tehát páratlan.'
  }
];

export const OrderOfOps10000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-wops-sorrend-quiz"
      subtopicId="a-muveletek-sorrendje"
      title="7. A műveletek sorrendje – Kvíz"
      subtitle="30 feladat 3 szinten: műveletsorok 10 000-ig, zárójel, szövegből műveletsor, nyitott mondatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={ORDER10K_QUESTIONS}
      cheatSheets={[
        {
          title: 'A sorrend',
          items: ['1. Zárójel ( )', '2. Szorzás és osztás – balról jobbra', '3. Összeadás és kivonás – balról jobbra', '4264 − 1316 · 3 = 4264 − 3948 = 316']
        },
        {
          title: 'Szövegből műveletsor',
          items: [
            'összegének a harmada → (6540 + 3120) : 3',
            'különbségének a fele → (8915 − 4875) : 2',
            'különbségének az ötszöröse → (5543 − 4129) · 5',
            '10 000 − (6450 + 3 · 285) = 2695'
          ]
        },
        {
          title: 'Tippek',
          items: [
            'Jelöld körökben a sorrendet a jelek fölött!',
            'A részeredményt írásban számold ki!',
            'Nyitott mondat: előbb mindkét oldalt számold ki!',
            'Becsléssel ellenőrizd, jó-e a nagyságrend!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <OrderOfOps10000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <OrderOfOps10000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default OrderOfOps10000Quiz;
