import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RepeatedTrialsMatcher } from './RepeatedTrialsMatcher';
import { RepeatedTrialsSorter } from './RepeatedTrialsSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Kísérletek sora: 's' = siker, 'k' = kudarc, '?' = ismeretlen. Alatta a lépések valószínűsége. */
const TrialsFig: React.FC<{ marks: ('s' | 'k' | '?')[]; probs?: string[]; caption?: string }> = ({ marks, probs, caption }) => {
  const gap = Math.min(44, 200 / Math.max(marks.length - 1, 1));
  const x0 = 120 - ((marks.length - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 240 100" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="96" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {marks.map((m, i) => {
        const x = x0 + i * gap;
        const fill = m === 's' ? '#d1fae5' : m === 'k' ? '#ffe4e6' : '#e0f2fe';
        const stroke = m === 's' ? '#059669' : m === 'k' ? '#e11d48' : '#0284c7';
        return (
          <g key={i}>
            <circle cx={x} cy="36" r="13" fill={fill} stroke={stroke} strokeWidth="1.8" />
            <text x={x} y="41" fontSize="13" fontWeight="bold" textAnchor="middle" fill={stroke}>
              {m === 's' ? '✓' : m === 'k' ? '✗' : '?'}
            </text>
            {probs && (
              <text x={x} y="64" fontSize="9.5" textAnchor="middle" fill="#334155">
                {probs[i]}
              </text>
            )}
          </g>
        );
      })}
      {caption && (
        <text x="120" y="88" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Kétszintű fagráf p / 1 − p élekkel; a levelek alatt a kimenetel. */
const Tree2Fig: React.FC<{ p: string; q: string; s?: string; f?: string }> = ({ p, q, s = 'S', f = 'K' }) => {
  const root = { x: 120, y: 16 };
  const mid = [
    { x: 65, y: 52 },
    { x: 175, y: 52 }
  ];
  const leaves = [30, 95, 145, 210];
  const lab = [s + s, s + f, f + s, f + f];
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {mid.map((m, i) => (
        <g key={i}>
          <line x1={root.x} y1={root.y} x2={m.x} y2={m.y} stroke={i === 0 ? '#059669' : '#e11d48'} strokeWidth="1.6" />
          <text x={(root.x + m.x) / 2 + (i === 0 ? -6 : 6)} y={(root.y + m.y) / 2} fontSize="9" textAnchor={i === 0 ? 'end' : 'start'} fill={i === 0 ? '#047857' : '#be123c'}>
            {i === 0 ? p : q}
          </text>
          {[0, 1].map((j) => (
            <g key={j}>
              <line x1={m.x} y1={m.y} x2={leaves[2 * i + j]} y2={88} stroke={j === 0 ? '#059669' : '#e11d48'} strokeWidth="1.6" />
              <text x={(m.x + leaves[2 * i + j]) / 2 + (j === 0 ? -5 : 5)} y={72} fontSize="9" textAnchor={j === 0 ? 'end' : 'start'} fill={j === 0 ? '#047857' : '#be123c'}>
                {j === 0 ? p : q}
              </text>
              <circle cx={leaves[2 * i + j]} cy={88} r="3.5" fill="#64748b" />
              <text x={leaves[2 * i + j]} y={106} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#334155">
                {lab[2 * i + j]}
              </text>
            </g>
          ))}
          <circle cx={m.x} cy={m.y} r="3.5" fill="#64748b" />
        </g>
      ))}
      <circle cx={root.x} cy={root.y} r="4" fill="#0369a1" />
    </svg>
  );
};

/** Dobókockák sora: szám = lap, 0 = „nem 6”, -1 = „?”. */
const DiceRowFig: React.FC<{ faces: number[]; caption?: string }> = ({ faces, caption }) => {
  const s = 30;
  const gap = 10;
  const total = faces.length * s + (faces.length - 1) * gap;
  const x0 = (240 - total) / 2;
  return (
    <svg viewBox="0 0 240 90" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {faces.map((f, i) => {
        const x = x0 + i * (s + gap);
        return (
          <g key={i}>
            <rect x={x} y="16" width={s} height={s} rx="6" fill={f === 6 ? '#d1fae5' : f === 0 ? '#ffe4e6' : '#ffffff'} stroke="#334155" strokeWidth="1.3" />
            <text x={x + s / 2} y="36" fontSize={f === 0 ? 8.5 : 13} fontWeight="bold" textAnchor="middle" fill="#1e293b">
              {f === 0 ? 'nem 6' : f === -1 ? '?' : f}
            </text>
            <text x={x + s / 2} y="58" fontSize="8.5" textAnchor="middle" fill="#64748b">
              {i + 1}.
            </text>
          </g>
        );
      })}
      {caption && (
        <text x="120" y="78" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Érmék sora (F = fej, I = írás). */
const CoinsFig: React.FC<{ labels: string[]; caption?: string }> = ({ labels, caption }) => {
  const gap = 26;
  const x0 = 120 - ((labels.length - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 240 80" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="76" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {labels.map((l, i) => (
        <g key={i}>
          <circle cx={x0 + i * gap} cy="32" r="11" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
          <text x={x0 + i * gap} y="36" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#78350f">
            {l}
          </text>
        </g>
      ))}
      {caption && (
        <text x="120" y="66" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

const REPEATED_TRIALS_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'rt-q1',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Özséb 0,7 valószínűséggel rúgja be a tizenegyest, és két büntetőt rúg (a rúgások függetlenek). Mennyi a valószínűsége, hogy mindkettő bemegy?',
    figure: <TrialsFig marks={['s', 's']} probs={['0,7', '0,7']} caption="1. rúgás és 2. rúgás" />,
    options: ['0,49', '1,4', '0,21', '0,7'],
    correctAnswer: 0,
    explanation: '„Első bemegy ÉS második bemegy”: a független lépések valószínűségét összeszorozzuk: 0,7 · 0,7 = 0,49.'
  },
  {
    id: 'rt-q2',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Özséb 0,7 valószínűséggel rúgja be a tizenegyest. Mennyi a valószínűsége, hogy két rúgásból egyik sem megy be?',
    figure: <TrialsFig marks={['k', 'k']} probs={['0,3', '0,3']} caption="egyik sem megy be" />,
    options: ['0,09', '0,6', '0,3', '0,49'],
    correctAnswer: 0,
    explanation: 'Egy rúgás 1 − 0,7 = 0,3 valószínűséggel nem megy be, így 0,3 · 0,3 = 0,09.'
  },
  {
    id: 'rt-q3',
    level: 1,
    questionTypeBadge: 'Érmedobás',
    question: 'Egy szabályos érmét háromszor feldobunk. Mennyi a valószínűsége, hogy mindhárom dobás fej?',
    figure: <CoinsFig labels={['F', 'F', 'F']} />,
    options: ['1/8', '1/6', '3/8', '1/2'],
    correctAnswer: 0,
    explanation: '(1/2) · (1/2) · (1/2) = (1/2)³ = 1/8.'
  },
  {
    id: 'rt-q4',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Egy szabályos kockával kétszer dobunk. Mennyi a valószínűsége, hogy mindkét dobás hatos?',
    figure: <DiceRowFig faces={[6, 6]} />,
    options: ['1/36', '2/6', '1/12', '11/36'],
    correctAnswer: 0,
    explanation: '1/6 · 1/6 = 1/36. (A 2/6 hibás: a valószínűségeket nem összeadni, hanem szorozni kell.)'
  },
  {
    id: 'rt-q5',
    level: 1,
    questionTypeBadge: 'Függetlenség',
    question: 'Mit jelent, hogy egy kísérletsorozat kísérletei függetlenek egymástól?',
    options: [
      'Egyik kísérlet kimenetele sincs hatással a következőre',
      'Minden kísérlet más-más eredményt ad',
      'A kísérleteket különböző emberek végzik',
      'Az összes kimenetel valószínűsége egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'Független kísérleteknél a korábbi eredmények nem befolyásolják a soron következőt, így minden alkalommal ugyanaz marad az esemény valószínűsége.'
  },
  {
    id: 'rt-q6',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Egy esemény minden kísérletben p valószínűséggel következik be. Mekkora valószínűséggel NEM következik be egy kísérletben?',
    options: ['1 − p', 'p − 1', '1/p', '−p'],
    correctAnswer: 0,
    explanation: 'A két lehetőség (bekövetkezik / nem következik be) valószínűségének összege 1, ezért a nem bekövetkezés valószínűsége 1 − p.'
  },
  {
    id: 'rt-q7',
    level: 1,
    questionTypeBadge: 'Függetlenség',
    question: 'Melyik esetben NEM tekinthetők függetlennek az egymás utáni lépések?',
    options: [
      '5 golyóból húzunk egymás után háromszor, visszatevés nélkül',
      'Egy kockával többször dobunk egymás után',
      'Egy gép állandó hibaszázalékkal gyárt termékeket',
      'Egy érmét tízszer egymás után feldobunk'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevés nélküli húzásnál minden lépésben kevesebb elemből húzunk, ezért a valószínűségek lépésről lépésre változnak.'
  },
  {
    id: 'rt-q8',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Egy esemény valószínűsége minden kísérletben p. Mennyi a valószínűsége, hogy n független kísérletben MINDEN alkalommal bekövetkezik?',
    options: ['pⁿ', 'n · p', 'p/n', 'n^p'],
    correctAnswer: 0,
    explanation: 'p · p · … · p (n tényező) = pⁿ.'
  },
  {
    id: 'rt-q9',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Kató minden dobásánál 0,6 valószínűséggel talál a kosárba. Mennyi a valószínűsége, hogy két dobásából mindkettő bemegy?',
    figure: <TrialsFig marks={['s', 's']} probs={['0,6', '0,6']} />,
    options: ['0,36', '1,2', '0,6', '0,24'],
    correctAnswer: 0,
    explanation: '0,6 · 0,6 = 0,36.'
  },
  {
    id: 'rt-q10',
    level: 1,
    questionTypeBadge: 'Selejtarány',
    question: 'Egy gép 0,05 valószínűséggel gyárt selejtes terméket. Mennyi a valószínűsége, hogy két egymás után gyártott termék közül mindkettő jó?',
    options: ['0,9025', '0,9', '0,0025', '0,95'],
    correctAnswer: 0,
    explanation: 'Egy termék 0,95 valószínűséggel jó, így 0,95 · 0,95 = 0,9025.'
  },
  // ---------- 2. szint ----------
  {
    id: 'rt-q11',
    level: 2,
    questionTypeBadge: 'Összeadás',
    question: 'Özséb (p = 0,7) két tizenegyest rúg. Mennyi a valószínűsége, hogy az egyik bemegy, a másik nem?',
    figure: <Tree2Fig p="0,7" q="0,3" s="B" f="N" />,
    options: ['0,42', '0,21', '0,49', '0,58'],
    correctAnswer: 0,
    explanation: 'Két eset lehetséges: BN (0,7 · 0,3 = 0,21) vagy NB (0,3 · 0,7 = 0,21). Ezek kizárják egymást, ezért összeadjuk: 0,42.'
  },
  {
    id: 'rt-q12',
    level: 2,
    questionTypeBadge: 'Hatvány',
    question: 'Kató (p = 0,6) ötször dob kosárra. Mennyi a valószínűsége, hogy mind az ötöt bedobja?',
    figure: <TrialsFig marks={['s', 's', 's', 's', 's']} probs={['0,6', '0,6', '0,6', '0,6', '0,6']} />,
    options: ['0,07776', '0,6', '3', '0,01024'],
    correctAnswer: 0,
    explanation: '0,6⁵ = 0,07776. (0,01024 = 0,4⁵ annak a valószínűsége, hogy egyiket sem dobja be.)'
  },
  {
    id: 'rt-q13',
    level: 2,
    questionTypeBadge: 'Csak az első',
    question: 'Kató (p = 0,6) ötször dob. Mennyi a valószínűsége, hogy az első dobását bedobja, a többit nem?',
    figure: <TrialsFig marks={['s', 'k', 'k', 'k', 'k']} probs={['0,6', '0,4', '0,4', '0,4', '0,4']} />,
    options: ['0,01536', '0,0768', '0,6', '0,0256'],
    correctAnswer: 0,
    explanation: '0,6 · 0,4⁴ = 0,6 · 0,0256 = 0,01536.'
  },
  {
    id: 'rt-q14',
    level: 2,
    questionTypeBadge: 'Pontosan egyszer',
    question: 'Kató (p = 0,6) ötször dob. Mennyi a valószínűsége, hogy pontosan egy dobása talál (bármelyik)?',
    figure: <TrialsFig marks={['?', '?', '?', '?', '?']} caption="pontosan egy ✓ – de melyik?" />,
    options: ['0,0768', '0,01536', '0,12', '0,3'],
    correctAnswer: 0,
    explanation: 'A találat 5 helyen lehet, mindegyik eset valószínűsége 0,6 · 0,4⁴ = 0,01536, így 5 · 0,01536 = 0,0768.'
  },
  {
    id: 'rt-q15',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Egy kockával háromszor dobunk. Mennyi a valószínűsége, hogy az első dobás hatos, a többi nem?',
    figure: <DiceRowFig faces={[6, 0, 0]} />,
    options: ['25/216', '1/216', '75/216', '1/18'],
    correctAnswer: 0,
    explanation: '1/6 · 5/6 · 5/6 = 25/216 ≈ 0,1157.'
  },
  {
    id: 'rt-q16',
    level: 2,
    questionTypeBadge: 'Pontosan egyszer',
    question: 'Egy kockával háromszor dobunk. Mennyi a valószínűsége, hogy pontosan egy dobás hatos?',
    figure: <DiceRowFig faces={[-1, -1, -1]} caption="pontosan egy hatos" />,
    options: ['25/72', '25/216', '1/2', '1/6'],
    correctAnswer: 0,
    explanation: 'A hatos 3 helyen lehet, mindegyik eset valószínűsége 25/216, így 3 · 25/216 = 75/216 = 25/72 ≈ 0,347.'
  },
  {
    id: 'rt-q17',
    level: 2,
    questionTypeBadge: 'Érmedobás',
    question: 'Egy szabályos érmét 8-szor feldobunk. Mennyi a valószínűsége, hogy mindegyik dobás írás?',
    figure: <CoinsFig labels={['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I']} />,
    options: ['1/256', '1/16', '1/8', '1/2'],
    correctAnswer: 0,
    explanation: '(1/2)⁸ = 1/256.'
  },
  {
    id: 'rt-q18',
    level: 2,
    questionTypeBadge: 'Pontosan egyszer',
    question: 'Egy szabályos érmét 8-szor feldobunk. Mennyi a valószínűsége, hogy pontosan egy dobás fej, a többi írás?',
    figure: <CoinsFig labels={['?', '?', '?', '?', '?', '?', '?', '?']} caption="pontosan egy fej" />,
    options: ['1/32', '1/256', '1/8', '1/2'],
    correctAnswer: 0,
    explanation: 'A fej 8 helyen lehet, mindegyik sorozat valószínűsége (1/2)⁸ = 1/256, így 8/256 = 1/32.'
  },
  {
    id: 'rt-q19',
    level: 2,
    questionTypeBadge: 'Fagráf',
    question: 'Egy játékban a kígyó 0,8 valószínűséggel marja meg a kígyós mezőre lépő játékost. A játékos háromszor lép kígyós mezőre. Mennyi a valószínűsége, hogy egyszer sem marja meg?',
    figure: <TrialsFig marks={['k', 'k', 'k']} probs={['0,2', '0,2', '0,2']} caption="✗ = nem marja meg" />,
    options: ['0,008', '0,2', '0,6', '0,512'],
    correctAnswer: 0,
    explanation: 'Egy alkalommal 0,2 valószínűséggel nem mar, így 0,2³ = 0,008.'
  },
  {
    id: 'rt-q20',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos kockával négyszer dobunk. Mennyi a valószínűsége, hogy egyik dobás sem hatos?',
    figure: <DiceRowFig faces={[0, 0, 0, 0]} />,
    options: ['(5/6)⁴ ≈ 0,482', '1 − 4/6 ≈ 0,333', '(1/6)⁴ ≈ 0,0008', '5/6 ≈ 0,833'],
    correctAnswer: 0,
    explanation: 'Minden dobás 5/6 valószínűséggel nem hatos: (5/6)⁴ = 625/1296 ≈ 0,482.'
  },
  // ---------- 3. szint ----------
  {
    id: 'rt-q21',
    level: 3,
    questionTypeBadge: 'Első siker',
    question: 'Addig dobunk egy kockával, amíg hatost nem dobunk. Mennyi a valószínűsége, hogy a harmadik dobás lesz az első hatos?',
    figure: <DiceRowFig faces={[0, 0, 6]} />,
    options: ['25/216', '1/216', '1/6', '75/216'],
    correctAnswer: 0,
    explanation: 'Az első két dobás nem hatos, a harmadik hatos: 5/6 · 5/6 · 1/6 = 25/216 ≈ 0,1157.'
  },
  {
    id: 'rt-q22',
    level: 3,
    questionTypeBadge: 'Első siker',
    question: 'Mennyi a valószínűsége, hogy kockadobásnál csak az ötödik dobásra dobunk először hatost?',
    figure: <DiceRowFig faces={[0, 0, 0, 0, 6]} />,
    options: ['≈ 0,0804', '≈ 0,4019', '≈ 0,1667', '≈ 0,000129'],
    correctAnswer: 0,
    explanation: '(5/6)⁴ · 1/6 = 625/7776 ≈ 0,0804. (A 0,4019 ennek ötszöröse – itt nem kell szorozni, mert a hatos helye rögzített.)'
  },
  {
    id: 'rt-q23',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek nagyobb a valószínűsége: hogy már elsőre hatost dobunk, vagy hogy a második dobás lesz az első hatos?',
    options: [
      'Az elsőre dobott hatosnak (1/6 > 5/36)',
      'Annak, hogy a második dobás az első hatos (5/36 > 1/6)',
      'Egyenlő a valószínűségük (mindkettő 1/6)',
      'Nem lehet eldönteni, mert a dobások függetlenek'
    ],
    correctAnswer: 0,
    explanation: 'P(elsőre hatos) = 1/6 = 6/36, P(második az első hatos) = 5/6 · 1/6 = 5/36. Tehát az elsőre dobott hatos a valószínűbb.'
  },
  {
    id: 'rt-q24',
    level: 3,
    questionTypeBadge: 'Első siker',
    question: 'Mennyi a valószínűsége, hogy kockadobásnál a negyedik dobás lesz először kisebb, mint 5?',
    figure: <DiceRowFig faces={[-1, -1, -1, -1]} caption="1–3.: legalább 5;  4.: kisebb, mint 5" />,
    options: ['2/81', '8/81', '1/81', '16/81'],
    correctAnswer: 0,
    explanation: 'P(kisebb, mint 5) = 4/6 = 2/3, P(nem kisebb) = 1/3. Az első három nem kisebb, a negyedik kisebb: (1/3)³ · 2/3 = 2/81 ≈ 0,0247.'
  },
  {
    id: 'rt-q25',
    level: 3,
    questionTypeBadge: 'Első siker',
    question: 'Mennyi a valószínűsége, hogy kockadobásnál az ötödik dobás lesz először az 5-nek valamelyik osztója?',
    options: ['16/243', '32/243', '1/243', '80/243'],
    correctAnswer: 0,
    explanation: 'Az 5 osztói az 1 és az 5, így p = 2/6 = 1/3. Az első négy nem osztó, az ötödik igen: (2/3)⁴ · 1/3 = 16/243 ≈ 0,0658.'
  },
  {
    id: 'rt-q26',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Egy szerencsekereket kétszer megforgatva 0,48 annak a valószínűsége, hogy egyszer NYERT, egyszer NEM NYERT jön ki. Mennyi lehet a NYERT valószínűsége egy forgatásnál?',
    options: ['0,6 vagy 0,4', '0,24', '0,48', 'kb. 0,69'],
    correctAnswer: 0,
    explanation: '2 · p · (1 − p) = 0,48 ⇒ p² − p + 0,24 = 0 ⇒ p = 0,6 vagy p = 0,4. Mindkettő megfelel a feltételnek.'
  },
  {
    id: 'rt-q27',
    level: 3,
    questionTypeBadge: 'Selejtarány',
    question: 'Egy meghibásodott gép 0,05 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy 20 termékből egyik sem selejtes?',
    options: ['≈ 0,3585', '0', '0,95', '≈ 0,6415'],
    correctAnswer: 0,
    explanation: '0,95²⁰ ≈ 0,3585. (A „0” abból a hibás gondolatból jön, hogy 20 · 0,05 = 1, tehát biztosan lesz selejt.)'
  },
  {
    id: 'rt-q28',
    level: 3,
    questionTypeBadge: 'Pontosan egyszer',
    question: 'Egy meghibásodott gép 0,05 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy 20 termékből pontosan egy selejtes?',
    options: ['≈ 0,3774', '≈ 0,0189', '1', '0,05'],
    correctAnswer: 0,
    explanation: 'A selejtes termék 20 helyen lehet: 20 · 0,05 · 0,95¹⁹ ≈ 20 · 0,0189 ≈ 0,3774.'
  },
  {
    id: 'rt-q29',
    level: 3,
    questionTypeBadge: 'Fagráf',
    question: 'A kígyó 0,8 valószínűséggel mar. A játékos háromszor lép kígyós mezőre. Mennyi a valószínűsége, hogy pontosan kétszer marja meg?',
    figure: <TrialsFig marks={['?', '?', '?']} caption="pontosan két marás – 3 ág a fagráfon" />,
    options: ['0,384', '0,128', '0,096', '0,64'],
    correctAnswer: 0,
    explanation: 'Egy ilyen ág valószínűsége 0,8² · 0,2 = 0,128, és 3 ilyen ág van (MMN, MNM, NMM): 3 · 0,128 = 0,384.'
  },
  {
    id: 'rt-q30',
    level: 3,
    questionTypeBadge: 'Legalább egy',
    question: 'A kígyó 0,8 valószínűséggel mar. A játékos háromszor lép kígyós mezőre. Mennyi a valószínűsége, hogy legalább egyszer megmarja?',
    options: ['0,992', '0,512', '0,8', '0,488'],
    correctAnswer: 0,
    explanation: 'A „legalább egyszer” ellentéte az „egyszer sem”: 1 − 0,2³ = 1 − 0,008 = 0,992.'
  }
];

export const RepeatedTrialsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-bernoulli-quiz"
      subtopicId="ugyanazt-tobbszor"
      title="12. Ugyanazt többször – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: független kísérletek, szorzási szabály, pontosan egyszer, első siker, fagráf."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={REPEATED_TRIALS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Független kísérletek',
          items: [
            'minden kísérletben: bekövetkezik p, nem következik be 1 − p',
            '„és” egymás után → szorzás',
            '„vagy” (egymást kizáró esetek) → összeadás',
            'visszatevés nélküli húzás: NEM független'
          ]
        },
        {
          title: 'n kísérlet',
          items: [
            'mindegyikben: pⁿ',
            'egyikben sem: (1 − p)ⁿ',
            'csak az elsőben: p · (1 − p)^{n−1}',
            'pontosan egyszer: n · p · (1 − p)^{n−1}'
          ]
        },
        {
          title: 'Hasznos minták',
          items: [
            'k-adikra az első siker: (1 − p)^{k−1} · p',
            'legalább egyszer: 1 − (1 − p)ⁿ',
            'fagráf: egy ág = az élek szorzata',
            'ellenőrzés: az összes eset valószínűségének összege 1'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RepeatedTrialsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RepeatedTrialsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RepeatedTrialsQuiz;
