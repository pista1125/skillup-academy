import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OrderOfOps1000Matcher } from './OrderOfOps1000Matcher';
import { OrderOfOps1000Sorter } from './OrderOfOps1000Sorter';

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

/** Műveletsor kártyákon; a műveleti jelek színesek, a zárójel narancs; opcionális „?” jelölés egy jel fölött. */
const QExpr: React.FC<{ expr: string; askOp?: boolean; result?: boolean }> = ({ expr, askOp, result = true }) => {
  const toks = expr.split(' ');
  const widths = toks.map((t) => (t.length <= 1 ? 14 : t.length * 10 + 6));
  const total = widths.reduce((a, b) => a + b, 0) + (result ? 40 : 0);
  const scale = Math.min(1, 220 / total);
  let x = 120 - (total * scale) / 2;
  return (
    <QFig h={askOp ? 100 : 80}>
      <g transform={`translate(0 ${askOp ? 20 : 0})`}>
        {toks.map((t, i) => {
          const w = widths[i] * scale;
          const cx = x + w / 2;
          x += w;
          const isOp = ['+', '−', '·', ':'].includes(t);
          const isPar = t === '(' || t === ')';
          return (
            <g key={i}>
              {isOp && askOp && (
                <text x={cx} y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">?</text>
              )}
              <text
                x={cx}
                y="46"
                textAnchor="middle"
                fontSize={18 * Math.max(scale, 0.75)}
                fontWeight="bold"
                fill={isOp ? '#7c3aed' : isPar ? '#ea580c' : '#0f172a'}
              >
                {t}
              </text>
            </g>
          );
        })}
        {result && (
          <text x={x + 20 * scale} y="46" textAnchor="middle" fontSize={18 * Math.max(scale, 0.75)} fontWeight="bold" fill={C_UNK}>
            = ?
          </text>
        )}
      </g>
    </QFig>
  );
};

/** Horgászbot felirattal. */
const QRod: React.FC<{ label: string; unit: string }> = ({ label, unit }) => (
  <QFig h={120}>
    <rect x="2" y="2" width="236" height="116" rx="9" fill="#dbeafe" />
    <circle cx="26" cy="96" r="10" fill="#fde68a" stroke="#92400e" />
    <line x1="32" y1="92" x2="200" y2="30" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M 200 30 Q 225 60 220 100" fill="none" stroke="#334155" strokeWidth="1" />
    <circle cx="220" cy="100" r="4" fill={C_UNK} />
    <text x="112" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14532d" transform="rotate(-20 112 50)">{label}</text>
    <text x="120" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Hossza: ? {unit}</text>
  </QFig>
);

/** Idővonal két horgásszal. */
const QTimeline: React.FC<{ askTotal: boolean }> = ({ askTotal }) => (
  <QFig h={110}>
    <text x="14" y="34" fontSize="11" fontWeight="bold" fill="#1e3a8a">Karcsi</text>
    <rect x="62" y="22" width="160" height="16" rx="4" fill="#60a5fa" />
    <text x="142" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">480 perc</text>
    <text x="14" y="66" fontSize="11" fontWeight="bold" fill="#14532d">Pista</text>
    <rect x="62" y="54" width="90" height="16" rx="4" fill="#4ade80" />
    <text x="107" y="66" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#14532d">480 : 2 + 30</text>
    <text x="120" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>
      {askTotal ? 'Összesen: ? perc' : 'Legfeljebb együtt: ? perc'}
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const ORDER_OPS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'oo-q1',
    level: 1,
    questionTypeBadge: 'Szorzás előbb',
    figure: <QExpr expr="500 + 4 · 90" />,
    question: 'Mennyi 500 + 4 · 90?',
    options: ['860', '594', '960', '360'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 4 · 90 = 360. Utána az összeadás: 500 + 360 = 860.'
  },
  {
    id: 'oo-q2',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <QExpr expr="70 · 9 − 8 · 40" askOp result={false} />,
    question: 'Mit végzünk el először a 70 · 9 − 8 · 40 műveletsorban?',
    options: ['a két szorzást', 'a kivonást', 'mindent balról jobbra, sorban', 'a 9 − 8-at'],
    correctAnswer: 0,
    explanation: 'A szorzás megelőzi a kivonást. Először 70 · 9 = 630 és 8 · 40 = 320, aztán 630 − 320 = 310.'
  },
  {
    id: 'oo-q3',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="1000 : ( 350 − 250 )" />,
    question: 'Mennyi 1000 : (350 − 250)?',
    options: ['10', '100', '1', '1100'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 350 − 250 = 100. Aztán 1000 : 100 = 10.'
  },
  {
    id: 'oo-q4',
    level: 1,
    questionTypeBadge: 'Balról jobbra',
    figure: <QExpr expr="350 − 190 + 680 + 160" />,
    question: 'Mennyi 350 − 190 + 680 + 160?',
    options: ['1000', '1380', '840', '1160'],
    correctAnswer: 0,
    explanation: 'Csak összeadás és kivonás van, ezért balról jobbra: 350 − 190 = 160, 160 + 680 = 840, 840 + 160 = 1000.'
  },
  {
    id: 'oo-q5',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 240-nél 10 · 7-tel nagyobb.',
    options: ['310', '1750', '257', '250'],
    correctAnswer: 0,
    explanation: '240 + 10 · 7 = 240 + 70 = 310. (Ha előbb összeadnál, 250 · 7 = 1750 lenne – az rossz!)'
  },
  {
    id: 'oo-q6',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <QExpr expr="180 + 8 · 42 − 9 · 11" askOp result={false} />,
    question: 'A 180 + 8 · 42 − 9 · 11 műveletsorban melyik műveletet végezzük el legelőször?',
    options: ['8 · 42', '180 + 8', '42 − 9', '9 · 11'],
    correctAnswer: 0,
    explanation: 'Először a szorzások jönnek balról jobbra haladva. Balról az első szorzás a 8 · 42 = 336, utána a 9 · 11 = 99.'
  },
  {
    id: 'oo-q7',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="70 · ( 9 − 8 ) · 4" />,
    question: 'Mennyi 70 · (9 − 8) · 4?',
    options: ['280', '598', '74', '2520'],
    correctAnswer: 0,
    explanation: 'A zárójelben: 9 − 8 = 1. Utána 70 · 1 = 70, és 70 · 4 = 280.'
  },
  {
    id: 'oo-q8',
    level: 1,
    questionTypeBadge: 'Osztás előbb',
    question: 'Mennyi 720 : 90 + 992?',
    options: ['1000', '1082', '992', '8'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 720 : 90 = 8. Aztán 8 + 992 = 1000.'
  },
  {
    id: 'oo-q9',
    level: 1,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="( 142 + 108 ) · 3" />,
    question: 'Mennyi (142 + 108) · 3?',
    options: ['750', '466', '250', '753'],
    correctAnswer: 0,
    explanation: 'A zárójel az első: 142 + 108 = 250. Aztán 250 · 3 = 750.'
  },
  {
    id: 'oo-q10',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? Az 50 hétszeresének és a 40 háromszorosának a különbsége.',
    options: ['230', '930', '350', '120'],
    correctAnswer: 0,
    explanation: '50 · 7 − 40 · 3 = 350 − 120 = 230.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'oo-q11',
    level: 2,
    questionTypeBadge: 'Balról jobbra',
    figure: <QExpr expr="60 · 5 : 100 · 80" />,
    question: 'Mennyi 60 · 5 : 100 · 80?',
    options: ['240', '3', '24', '2400'],
    correctAnswer: 0,
    explanation: 'Csak szorzás és osztás van, balról jobbra haladunk: 60 · 5 = 300, 300 : 100 = 3, 3 · 80 = 240.'
  },
  {
    id: 'oo-q12',
    level: 2,
    questionTypeBadge: 'Szorzás előbb',
    figure: <QExpr expr="970 − 324 · 2" />,
    question: 'Mennyi 970 − 324 · 2?',
    options: ['322', '1292', '648', '652'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 324 · 2 = 648. Aztán 970 − 648 = 322.'
  },
  {
    id: 'oo-q13',
    level: 2,
    questionTypeBadge: 'Szorzás előbb',
    question: 'Mennyi 255 · 3 − 535?',
    options: ['230', '765', '330', '240'],
    correctAnswer: 0,
    explanation: '255 · 3 = 765, és 765 − 535 = 230.'
  },
  {
    id: 'oo-q14',
    level: 2,
    questionTypeBadge: 'Zárójel',
    figure: <QExpr expr="970 − ( 688 − 538 )" />,
    question: 'Mennyi 970 − (688 − 538)?',
    options: ['820', '150', '1120', '720'],
    correctAnswer: 0,
    explanation: 'Zárójel: 688 − 538 = 150. Aztán 970 − 150 = 820.'
  },
  {
    id: 'oo-q15',
    level: 2,
    questionTypeBadge: 'Két szorzás',
    question: 'Mennyi (3 · 86) + (4 · 66)?',
    options: ['522', '532', '258', '512'],
    correctAnswer: 0,
    explanation: '3 · 86 = 258 és 4 · 66 = 264. Összesen 258 + 264 = 522. (Itt a zárójel el is hagyható, a szorzás amúgy is előbb jön.)'
  },
  {
    id: 'oo-q16',
    level: 2,
    questionTypeBadge: 'Horgászbot',
    figure: <QRod label="124 · 8 cm − 129 · 6 cm" unit="cm" />,
    question: 'Milyen hosszú a horgászbot? 124 · 8 cm − 129 · 6 cm',
    options: ['218 cm', '992 cm', '774 cm', '228 cm'],
    correctAnswer: 0,
    explanation: 'Először a szorzások: 124 · 8 = 992 és 129 · 6 = 774. Aztán 992 − 774 = 218 cm.'
  },
  {
    id: 'oo-q17',
    level: 2,
    questionTypeBadge: 'Horgászbot',
    figure: <QRod label="739 cm − 67 cm · 8" unit="cm" />,
    question: 'Milyen hosszú a horgászbot? 739 cm − 67 cm · 8',
    options: ['203 cm', '672 cm', '536 cm', '213 cm'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 67 · 8 = 536. Aztán 739 − 536 = 203 cm.'
  },
  {
    id: 'oo-q18',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 480 : 10 + 320 > □',
    options: ['367', '368', '369', '400'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 480 : 10 = 48, 48 + 320 = 368. A □ helyére 368-nál kisebb szám kell: 367 jó.'
  },
  {
    id: 'oo-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az egyik tóba 550 halivadékot telepítettek, a másikba 430-cal kevesebbet. A harmadikba annyit, mint az előző kettőbe együtt. Hányat telepítettek a harmadik tóba?',
    options: ['670', '980', '120', '1100'],
    correctAnswer: 0,
    explanation: 'Második tó: 550 − 430 = 120. Harmadik tó: 550 + 120 = 670 ivadék.'
  },
  {
    id: 'oo-q20',
    level: 2,
    questionTypeBadge: 'Zárójel',
    question: 'Melyik műveletsor eredménye 768?',
    options: ['3 · (139 + 117)', '3 · 139 + 117', '(3 · 139) + 117', '139 + 117 · 3'],
    correctAnswer: 0,
    explanation: '3 · (139 + 117) = 3 · 256 = 768. Zárójel nélkül 3 · 139 + 117 = 417 + 117 = 534, és 139 + 117 · 3 = 139 + 351 = 490.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'oo-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QTimeline askTotal />,
    question: 'Karcsi bácsi 480 percig horgászott, Pista bácsi ennek a felénél fél órával többet. Hány percet töltöttek a stégen összesen?',
    options: ['750 perc', '990 perc', '510 perc', '720 perc'],
    correctAnswer: 0,
    explanation: 'Pista bácsi: 480 : 2 + 30 = 240 + 30 = 270 perc. Összesen: 480 + 270 = 750 perc.'
  },
  {
    id: 'oo-q22',
    level: 3,
    questionTypeBadge: 'Gondolkodtató',
    figure: <QTimeline askTotal={false} />,
    question: 'Karcsi bácsi 480 percet, Pista bácsi 270 percet töltött a stégen. Legfeljebb mennyi ideig lehettek ott együtt?',
    options: ['270 perc', '480 perc', '750 perc', '210 perc'],
    correctAnswer: 0,
    explanation: 'Együtt legfeljebb annyi ideig lehettek, amennyit a rövidebb ideig ott lévő töltött: 270 percet.'
  },
  {
    id: 'oo-q23',
    level: 3,
    questionTypeBadge: 'Horgászzsinór',
    figure: <QRod label="46 dm · 3 + 47 dm · 5" unit="dm" />,
    question: 'Milyen messze van az úszó a bot végétől? 46 dm · 3 + 47 dm · 5',
    options: ['373 dm', '925 dm', '138 dm', '383 dm'],
    correctAnswer: 0,
    explanation: '46 · 3 = 138 és 47 · 5 = 235. Aztán 138 + 235 = 373 dm.'
  },
  {
    id: 'oo-q24',
    level: 3,
    questionTypeBadge: 'Malom',
    question: 'Levente: 1000 − 678 + 127, Márk: 1000 − (678 + 127). Mennyivel nagyobb Levente eredménye Márkénál?',
    options: ['254-gyel', '0-val, egyenlők', '127-tel', '244-gyel'],
    correctAnswer: 0,
    explanation: 'Levente: 1000 − 678 = 322, 322 + 127 = 449. Márk: 678 + 127 = 805, 1000 − 805 = 195. A különbség: 449 − 195 = 254.'
  },
  {
    id: 'oo-q25',
    level: 3,
    questionTypeBadge: 'Malom',
    question: 'Levente: 423 − 144 · 2, Márk: (423 − 144) · 2. Kinek nagyobb az eredménye?',
    options: ['Márknak: 558', 'Leventének: 135', 'Egyenlők: 558', 'Márknak: 135'],
    correctAnswer: 0,
    explanation: 'Levente: 144 · 2 = 288, 423 − 288 = 135. Márk: 423 − 144 = 279, 279 · 2 = 558. Márké a nagyobb.'
  },
  {
    id: 'oo-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Marci bácsi 3 kg-os halat fogott. Gyuri bácsi hala 34 dkg-mal könnyebb. Mennyi a két hal tömege összesen? (1 kg = 100 dkg)',
    options: ['566 dkg', '334 dkg', '634 dkg', '266 dkg'],
    correctAnswer: 0,
    explanation: '3 kg = 300 dkg. Gyuri bácsi hala: 300 − 34 = 266 dkg. Együtt: 300 + 266 = 566 dkg.'
  },
  {
    id: 'oo-q27',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 220 − □ < 800 : 8 : 4',
    options: ['196', '195', '194', '25'],
    correctAnswer: 0,
    explanation: 'Jobb oldal: 800 : 8 = 100, 100 : 4 = 25. 220 − □ kisebb legyen 25-nél: 220 − 196 = 24, ez jó. 220 − 195 = 25 még nem kisebb.'
  },
  {
    id: 'oo-q28',
    level: 3,
    questionTypeBadge: 'Zárójel helye',
    figure: <QExpr expr="7 · 724 − 654 = 490" result={false} />,
    question: 'Hová kell tenni a zárójelet, hogy igaz legyen? 7 · 724 − 654 = 490',
    options: ['7 · (724 − 654)', '(7 · 724) − 654', 'Nem kell zárójel', 'Sehogy sem lehet igaz'],
    correctAnswer: 0,
    explanation: '7 · (724 − 654) = 7 · 70 = 490. Zárójel nélkül 7 · 724 − 654 = 5068 − 654 = 4414 lenne.'
  },
  {
    id: 'oo-q29',
    level: 3,
    questionTypeBadge: 'Hosszú műveletsor',
    figure: <QExpr expr="( 460 − 267 ) · 5 − 400" />,
    question: 'Mennyi (460 − 267) · 5 − 400?',
    options: ['565', '965', '193', '575'],
    correctAnswer: 0,
    explanation: 'Zárójel: 460 − 267 = 193. Szorzás: 193 · 5 = 965. Kivonás: 965 − 400 = 565.'
  },
  {
    id: 'oo-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik horgászbot a leghosszabb?',
    options: ['124 · 8 cm − 129 · 6 cm', '97 · 9 cm − 663 cm', '739 cm − 67 cm · 8', 'Mind egyforma hosszú'],
    correctAnswer: 0,
    explanation: '124 · 8 − 129 · 6 = 992 − 774 = 218 cm, 97 · 9 − 663 = 873 − 663 = 210 cm, 739 − 67 · 8 = 739 − 536 = 203 cm. A leghosszabb a 218 cm-es.'
  }
];

export const OrderOfOps1000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-sorrend-quiz"
      subtopicId="a-muveletek-sorrendje"
      title="4. A műveletek sorrendje – Kvíz"
      subtitle="30 feladat 3 szinten: szorzás és osztás előbb, zárójel, balról jobbra, szöveges feladatok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={ORDER_OPS_QUESTIONS}
      cheatSheets={[
        {
          title: 'A sorrend',
          items: [
            '1. Zárójel ( )',
            '2. Szorzás és osztás – balról jobbra',
            '3. Összeadás és kivonás – balról jobbra',
            'Példa: 500 + 4 · 90 = 500 + 360 = 860'
          ]
        },
        {
          title: 'Zárójel',
          items: [
            '1000 : (350 − 250) = 1000 : 100 = 10',
            '3 · 139 + 117 = 534, de 3 · (139 + 117) = 768',
            '1000 − 678 + 127 = 449, de 1000 − (678 + 127) = 195',
            'A zárójel kijelöli, mit számolunk először.'
          ]
        },
        {
          title: 'Tippek',
          items: [
            'Húzd alá a szorzásokat és osztásokat!',
            'Írd körbe a jelek fölé, hányadikként végzed el őket.',
            'Ha csak + és − van: balról jobbra.',
            'Ha csak · és : van: szintén balról jobbra.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <OrderOfOps1000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <OrderOfOps1000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default OrderOfOps1000Quiz;
