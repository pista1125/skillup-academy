import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ThreeDigitSubG3Matcher } from './ThreeDigitSubG3Matcher';
import { ThreeDigitSubG3Sorter } from './ThreeDigitSubG3Sorter';
import { QFig, UNK, Coin, DiscCell, PLACE_BODY, PLACE_FILL, ItemIcon, ItemKind, PriceTag, C_SZ, C_T } from './ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Helyiérték-táblázat korongokkal; jobbra a kivonandó. */
const DiscsQ: React.FC<{ n: number; minus: string }> = ({ n, minus }) => {
  const d = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
  const x0 = 72;
  const cw = [52, 60, 52];
  const xs = [x0, x0 + cw[0], x0 + cw[0] + cw[1]];
  return (
    <QFig h={104}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={xs[i]} y="12" width={cw[i]} height="18" fill={PLACE_FILL[i]} stroke="#fff" />
          <text x={xs[i] + cw[i] / 2} y="26" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{['sz', 't', 'e'][i]}</text>
          <rect x={xs[i]} y="30" width={cw[i]} height="62" fill={PLACE_BODY[i]} stroke="#fff" />
          <DiscCell x={xs[i]} y={36} w={cw[i]} n={d[i]} place={i as 0 | 1 | 2} r={5.5} perRow={i === 1 ? 4 : 3} />
        </g>
      ))}
      <text x="40" y="58" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{n}</text>
      <text x="40" y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626">{minus}</text>
    </QFig>
  );
};

/** Érmék egy sorban, az első `crossed` darab áthúzva. */
const CoinsQ: React.FC<{ coins: number[]; crossed?: number }> = ({ coins, crossed = 0 }) => {
  const r = Math.min(17, 220 / (coins.length * 2.25));
  const gap = 4;
  const w = coins.length * 2 * r + (coins.length - 1) * gap;
  const x0 = (240 - w) / 2 + r;
  return (
    <QFig h={74}>
      {coins.map((v, i) => (
        <Coin key={i} cx={x0 + i * (2 * r + gap)} cy={37} v={v} r={r} crossed={i < crossed} />
      ))}
    </QFig>
  );
};

/** Egyenlőség dobozokkal: '?' = keresett. */
const EqQ: React.FC<{ parts: string[] }> = ({ parts }) => {
  const ws = parts.map((p) => (p === '−' || p === '=' ? 20 : 54));
  const total = ws.reduce((a, b) => a + b, 0) + (parts.length - 1) * 4;
  let x = (240 - total) / 2;
  return (
    <QFig h={66}>
      {parts.map((p, i) => {
        const w = ws[i];
        const x0 = x;
        x += w + 4;
        if (p === '−' || p === '=') return <text key={i} x={x0 + w / 2} y="41" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">{p}</text>;
        const q = p === '?';
        return (
          <g key={i}>
            <rect x={x0} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#fff1f2'} stroke={q ? UNK : '#e11d48'} strokeWidth="1.8" />
            <text x={x0 + w / 2} y="39" textAnchor="middle" fontSize="19" fontWeight="bold" fill={q ? UNK : '#881337'}>{p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Pénztárca − játék. */
const BuyQ: React.FC<{ wallet: number; kind: ItemKind; price: number }> = ({ wallet, kind, price }) => (
  <QFig h={96}>
    <rect x="20" y="30" width="84" height="50" rx="9" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <rect x="20" y="22" width="84" height="14" rx="5" fill="#f59e0b" stroke="#a16207" strokeWidth="2" />
    <text x="62" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#713f12">{wallet} Ft</text>
    <text x="124" y="62" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">−</text>
    <ItemIcon kind={kind} cx={182} cy={34} s={1} />
    <PriceTag x={148} y={58} text={`${price} Ft`} w={74} fs={12.5} />
  </QFig>
);

/** Több játék árcédulával. */
const TagsQ: React.FC<{ items: { kind: ItemKind; price: number }[] }> = ({ items }) => {
  const w = 236 / items.length;
  return (
    <QFig h={86}>
      {items.map((it, i) => {
        const cx = 2 + w * i + w / 2;
        return (
          <g key={i}>
            <ItemIcon kind={it.kind} cx={cx} cy={30} s={0.9} />
            <PriceTag x={cx - 27} y={54} text={`${it.price} Ft`} w={56} fs={11} />
          </g>
        );
      })}
    </QFig>
  );
};

/** Számegyenes ugrásokkal visszafelé (vagy előre); a végpont '?'. */
const JumpQ: React.FC<{ lo: number; hi: number; pts: number[]; labels: string[]; forward?: boolean; tick?: number }> = ({ lo, hi, pts, labels, forward, tick = 10 }) => {
  const X = (v: number) => 16 + ((v - lo) * 208) / (hi - lo);
  return (
    <QFig h={104}>
      <line x1="10" y1="70" x2="230" y2="70" stroke="#334155" strokeWidth="1.8" />
      {Array.from({ length: (hi - lo) / tick + 1 }).map((_, k) => {
        const v = lo + k * tick;
        const big = v % 100 === 0;
        return <line key={v} x1={X(v)} y1={big ? 63 : 66} x2={X(v)} y2={big ? 77 : 74} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {pts.slice(0, -1).map((p, i) => {
        const q = pts[i + 1];
        const mid = (X(p) + X(q)) / 2;
        const hgt = 16 + Math.min(30, Math.abs(X(q) - X(p)) * 0.35);
        return (
          <g key={i}>
            <path d={`M ${X(p)} 65 Q ${mid} ${65 - hgt * 2} ${X(q)} 65`} fill="none" stroke={forward ? '#16a34a' : '#dc2626'} strokeWidth="2" />
            <text x={mid} y={65 - hgt - 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill={forward ? '#16a34a' : '#dc2626'}>{labels[i]}</text>
          </g>
        );
      })}
      {pts.map((p, i) => {
        const last = forward ? false : i === pts.length - 1;
        return (
          <g key={`p${i}`}>
            <circle cx={X(p)} cy="70" r="3.5" fill={last ? UNK : '#0f172a'} />
            <text x={X(p)} y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill={last ? UNK : '#0f172a'}>{last ? '?' : p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Szalagok: hossz arányos az értékkel. */
const BarsQ: React.FC<{ bars: { label: string; v: number; text: string; color: string }[]; max?: number; note?: string }> = ({ bars, max = 400, note }) => {
  const x0 = 70;
  const W = 150;
  const h = 22 + bars.length * 30 + (note ? 14 : 0);
  return (
    <QFig h={h}>
      {bars.map((b, i) => {
        const y = 14 + i * 30;
        const w = (W * b.v) / max;
        return (
          <g key={i}>
            <text x={x0 - 6} y={y + 15} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.label}</text>
            <rect x={x0} y={y} width={w} height="20" rx="4" fill={b.color} stroke="#334155" strokeWidth="1" />
            <text x={x0 + w / 2} y={y + 15} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">{b.text}</text>
          </g>
        );
      })}
      {note && <text x="120" y={h - 8} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={UNK}>{note}</text>}
    </QFig>
  );
};

/** 1 piros korong = ? kék korong. */
const SwapQ: React.FC = () => (
  <QFig h={74}>
    <circle cx="50" cy="37" r="16" fill={C_SZ} stroke="#7f1d1d" strokeWidth="2" />
    <text x="50" y="42" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">100</text>
    <text x="92" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={124 + i * 20} cy="37" r="8" fill={C_T} stroke="#1e3a8a" strokeWidth="1.5" />
    ))}
    <text x="186" y="42" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">…</text>
    <rect x="198" y="22" width="30" height="30" rx="6" fill="#fee2e2" stroke={UNK} strokeWidth="1.8" />
    <text x="213" y="44" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Két kivonás egymás mellett. */
const CompareQ: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={70}>
    <rect x="10" y="16" width="96" height="38" rx="9" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.8" />
    <text x="58" y="41" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#881337">{a}</text>
    <text x="120" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <rect x="134" y="16" width="96" height="38" rx="9" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8" />
    <text x="182" y="41" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">{b}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const THREE_DIGIT_SUB_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: kerek százast veszünk el ----------------
  {
    id: 'tds-q1',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    figure: <DiscsQ n={352} minus="− 100" />,
    question: 'Mennyi 352 − 100?',
    options: ['252', '342', '452', '251'],
    correctAnswer: 0,
    explanation: 'A 100 egy százas. 3 százasból elveszel 1-et, marad 2 százas. A tízes és az egyes nem változik: 252.'
  },
  {
    id: 'tds-q2',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ coins={[100, 100, 100, 100, 50, 20, 5]} crossed={3} />,
    question: 'A pénztárcában 475 Ft van. 300 Ft-ot elköltesz. Mennyi marad?',
    options: ['175 Ft', '472 Ft', '275 Ft', '145 Ft'],
    correctAnswer: 0,
    explanation: '4 százasból 3-at elköltesz, marad 1 százas. Az 50, 20 és 5 Ft megmarad: 175 Ft.'
  },
  {
    id: 'tds-q3',
    level: 1,
    questionTypeBadge: 'Különbség',
    figure: <EqQ parts={['476', '−', '200', '=', '?']} />,
    question: 'Mennyi 476 és 200 különbsége?',
    options: ['276', '474', '286', '376'],
    correctAnswer: 0,
    explanation: 'Csak a százasok változnak: 4 − 2 = 2 százas. 476 − 200 = 276.'
  },
  {
    id: 'tds-q4',
    level: 1,
    questionTypeBadge: 'Mennyivel kisebb?',
    question: 'Mennyivel kisebb a 200 a 438-nál?',
    options: ['238-cal', '436-tal', '248-cal', '338-cal'],
    correctAnswer: 0,
    explanation: 'Vond ki a nagyobbikból a kisebbet: 438 − 200 = 238.'
  },
  {
    id: 'tds-q5',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: '358-ból elveszel 200-at. Mennyi marad?',
    options: ['158', '356', '258', '138'],
    correctAnswer: 0,
    explanation: '3 százas − 2 százas = 1 százas. Marad az 58 is: 158.'
  },
  {
    id: 'tds-q6',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    figure: <DiscsQ n={289} minus="− 100" />,
    question: 'Mennyi 289 − 100?',
    options: ['189', '279', '288', '389'],
    correctAnswer: 0,
    explanation: 'Egy piros korongot (1 százast) veszel el. Marad 1 százas, 8 tízes, 9 egyes: 189.'
  },
  {
    id: 'tds-q7',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    figure: <DiscsQ n={470} minus="− 300" />,
    question: 'Mennyi 470 − 300?',
    options: ['170', '467', '140', '270'],
    correctAnswer: 0,
    explanation: '4 százasból 3-at elveszel, marad 1 százas és 7 tízes: 170.'
  },
  {
    id: 'tds-q8',
    level: 1,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['465', '−', '?', '=', '265']} />,
    question: 'Melyik szám hiányzik? 465 − □ = 265',
    options: ['200', '20', '2', '300'],
    correctAnswer: 0,
    explanation: 'A tízes és az egyes ugyanaz maradt, csak a százas lett kevesebb: 4 − 2. Tehát 200-at vettünk el.'
  },
  {
    id: 'tds-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ coins={[100, 200, 50, 10]} crossed={1} />,
    question: 'Ennyi pénzed van. A 100 Ft-ost elköltöd. Mennyi marad?',
    options: ['260 Ft', '360 Ft', '250 Ft', '160 Ft'],
    correctAnswer: 0,
    explanation: 'Megmarad a 200, az 50 és a 10 Ft: 200 + 50 + 10 = 260 Ft.'
  },
  {
    id: 'tds-q10',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Számold ki: 399 − 300',
    options: ['99', '96', '199', '369'],
    correctAnswer: 0,
    explanation: '3 százas − 3 százas = 0 százas. Marad 9 tízes és 9 egyes: 99.'
  },

  // ---------------- 2. szint: kerek tízesek, felváltás ----------------
  {
    id: 'tds-q11',
    level: 2,
    questionTypeBadge: 'Kerek tízesek',
    figure: <DiscsQ n={460} minus="− 230" />,
    question: 'Mennyi 460 − 230?',
    options: ['230', '240', '220', '330'],
    correctAnswer: 0,
    explanation: 'Van elég tízes. 4 − 2 = 2 százas, 6 − 3 = 3 tízes: 230.'
  },
  {
    id: 'tds-q12',
    level: 2,
    questionTypeBadge: 'Felváltás',
    figure: <DiscsQ n={430} minus="− 160" />,
    question: 'Mennyi 430 − 160?',
    options: ['270', '330', '370', '260'],
    correctAnswer: 0,
    explanation: '3 tízesből nem tudsz 6-ot elvenni. Válts fel 1 százast: 3 százas és 13 tízes. 13 − 6 = 7 tízes, 3 − 1 = 2 százas: 270.'
  },
  {
    id: 'tds-q13',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpQ lo={240} hi={420} pts={[410, 310, 260]} labels={['− 100', '− 50']} />,
    question: 'Mennyi 410 − 150? Nézd meg az ugrásokat!',
    options: ['260', '340', '360', '250'],
    correctAnswer: 0,
    explanation: 'Előbb a százast veszed el: 410 − 100 = 310. Aztán a tízeseket: 310 − 50 = 260.'
  },
  {
    id: 'tds-q14',
    level: 2,
    questionTypeBadge: 'Felváltás',
    figure: <SwapQ />,
    question: 'Hány tízesre váltható fel 1 százas?',
    options: ['10', '100', '1', '9'],
    correctAnswer: 0,
    explanation: '1 százas = 10 tízes, mert 10 · 10 = 100.'
  },
  {
    id: 'tds-q15',
    level: 2,
    questionTypeBadge: 'Felváltás',
    figure: <EqQ parts={['350', '−', '170', '=', '?']} />,
    question: 'Mennyi 350 − 170?',
    options: ['180', '220', '280', '170'],
    correctAnswer: 0,
    explanation: '350 − 100 = 250. 250 − 70 = 180. Próba: 180 + 170 = 350.'
  },
  {
    id: 'tds-q16',
    level: 2,
    questionTypeBadge: 'Különbség',
    question: 'Mennyi 320 és 150 különbsége?',
    options: ['170', '230', '270', '160'],
    correctAnswer: 0,
    explanation: '320 − 100 = 220. 220 − 50 = 170.'
  },
  {
    id: 'tds-q17',
    level: 2,
    questionTypeBadge: 'Felváltás',
    question: 'Melyik kivonásnál kell felváltani 1 százast?',
    options: ['420 − 180', '470 − 230', '390 − 160', '480 − 200'],
    correctAnswer: 0,
    explanation: 'A 420-ban csak 2 tízes van, a 180-ban 8 tízes. 2-ből nem lehet 8-at elvenni, ezért fel kell váltani.'
  },
  {
    id: 'tds-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <BuyQ wallet={440} kind="ball" price={260} />,
    question: '440 Ft-od van. Megveszed a labdát. Mennyi pénzed marad?',
    options: ['180 Ft', '220 Ft', '280 Ft', '170 Ft'],
    correctAnswer: 0,
    explanation: '440 − 200 = 240. 240 − 60 = 180. Marad 180 Ft.'
  },
  {
    id: 'tds-q19',
    level: 2,
    questionTypeBadge: 'Felváltás',
    figure: <DiscsQ n={260} minus="− 190" />,
    question: 'Mennyi 260 − 190?',
    options: ['70', '130', '170', '80'],
    correctAnswer: 0,
    explanation: '6 tízesből nem lehet 9-et elvenni. Válts fel 1 százast: 1 százas és 16 tízes. 16 − 9 = 7 tízes, 1 − 1 = 0 százas: 70.'
  },
  {
    id: 'tds-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['?', '−', '120', '=', '250']} />,
    question: 'Melyik szám hiányzik? □ − 120 = 250',
    options: ['370', '130', '360', '470'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapod meg: 250 + 120 = 370. Próba: 370 − 120 = 250.'
  },

  // ---------------- 3. szint: 500-ból, szöveges feladatok ----------------
  {
    id: 'tds-q21',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <BuyQ wallet={500} kind="kite" price={245} />,
    question: '500 Ft-od van. Megveszed a sárkányt. Mennyi marad?',
    options: ['255 Ft', '265 Ft', '355 Ft', '245 Ft'],
    correctAnswer: 0,
    explanation: 'Pótolj: 245 + 5 = 250, 250 + 50 = 300, 300 + 200 = 500. 5 + 50 + 200 = 255 Ft.'
  },
  {
    id: 'tds-q22',
    level: 3,
    questionTypeBadge: 'Pótlás',
    figure: <JumpQ lo={360} hi={500} pts={[365, 400, 500]} labels={['+ ?', '+ ?']} forward />,
    question: 'Mennyi kell a 365-höz, hogy 500 legyen?',
    options: ['135', '145', '235', '35'],
    correctAnswer: 0,
    explanation: '365 + 35 = 400. 400 + 100 = 500. Összesen 35 + 100 = 135.'
  },
  {
    id: 'tds-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TagsQ items={[{ kind: 'ball', price: 180 }, { kind: 'yoyo', price: 90 }]} />,
    question: '500 Ft-od van. Megveszed a labdát és a jojót. Mennyi marad?',
    options: ['230 Ft', '320 Ft', '410 Ft', '270 Ft'],
    correctAnswer: 0,
    explanation: 'Együtt: 180 + 90 = 270 Ft. 500 − 270 = 230 Ft marad.'
  },
  {
    id: 'tds-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A papírboltban 450 matrica volt. Eladtak 270-et. Hány matrica maradt?',
    options: ['180', '220', '280', '170'],
    correctAnswer: 0,
    explanation: '450 − 200 = 250. 250 − 70 = 180 matrica maradt.'
  },
  {
    id: 'tds-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A könyvtárban 430 mesekönyv van. 160-at kikölcsönöztek. Hány maradt a polcon?',
    options: ['270', '330', '370', '590'],
    correctAnswer: 0,
    explanation: 'Kikölcsönözték, tehát kevesebb lett: 430 − 160. 430 − 100 = 330, 330 − 60 = 270.'
  },
  {
    id: 'tds-q26',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: <BarsQ bars={[{ label: 'piros', v: 340, text: '340 Ft', color: '#fda4af' }, { label: 'kék', v: 190, text: '190 Ft', color: '#93c5fd' }]} note="Mennyivel drágább a piros?" />,
    question: 'A piros sárkány 340 Ft, a kék 190 Ft. Mennyivel drágább a piros?',
    options: ['150 Ft-tal', '250 Ft-tal', '530 Ft-tal', '160 Ft-tal'],
    correctAnswer: 0,
    explanation: 'A különbséget kivonással kapod: 340 − 190. 340 − 100 = 240, 240 − 90 = 150.'
  },
  {
    id: 'tds-q27',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <TagsQ items={[{ kind: 'puzzle', price: 365 }, { kind: 'bear', price: 415 }, { kind: 'kite', price: 245 }, { kind: 'robot', price: 320 }]} />,
    question: '500 Ft-od van. Melyiket vetted meg, ha 135 Ft maradt?',
    options: ['a 365 Ft-os kirakót', 'a 415 Ft-os macit', 'a 245 Ft-os sárkányt', 'a 320 Ft-os robotot'],
    correctAnswer: 0,
    explanation: 'Próbáld ki: 500 − 365 = 135. A többinél más marad: 85 Ft, 255 Ft, 180 Ft.'
  },
  {
    id: 'tds-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Bence 500 Ft-ot gyűjtött. 285 Ft-ot elköltött. Elég a maradék egy 200 Ft-os könyvre?',
    options: ['Igen, és 15 Ft marad.', 'Nem, 15 Ft hiányzik.', 'Igen, és 85 Ft marad.', 'Nem, 85 Ft hiányzik.'],
    correctAnswer: 0,
    explanation: '500 − 285 = 215 Ft maradt. 215 több, mint 200, tehát elég. 215 − 200 = 15 Ft marad.'
  },
  {
    id: 'tds-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="430 − 250" b="380 − 190" />,
    question: 'Melyik különbség a nagyobb?',
    options: ['380 − 190', '430 − 250', 'egyenlők', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '430 − 250 = 180. 380 − 190 = 190. A 190 a nagyobb.'
  },
  {
    id: 'tds-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy dobozban 480 gyöngy volt. Anna előbb 200-at, aztán még 150-et felfűzött. Hány gyöngy maradt a dobozban?',
    options: ['130', '280', '230', '330'],
    correctAnswer: 0,
    explanation: '480 − 200 = 280. 280 − 150 = 130 gyöngy maradt.'
  }
];

export const ThreeDigitSubG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-kivonas"
    topicId="g3-wsub-haromjegyu-quiz"
    subtopicId="haromjegyu-szamok-kivonasa"
    title="1. Háromjegyű számok kivonása – Kvíz"
    subtitle="30 feladat 3 szinten: kerek százas és kerek tízesek elvétele, felváltás, pótlás 500-ig, vásárlás."
    badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • KVÍZ"
    questions={THREE_DIGIT_SUB_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Kerek százas', items: ['465 − 200 = 265', 'Csak a százasok változnak', '378 − 300 = 78'] },
      { title: 'Kerek tízesek', items: ['1 százas = 10 tízes', '420 − 180: 2 tízesből nem megy 8', 'Felváltok: 3 százas, 12 tízes → 240'] },
      { title: 'Pótlás 500-ig', items: ['500 − 285 = ?', '285 + 15 = 300', '300 + 200 = 500', '15 + 200 = 215'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<ThreeDigitSubG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<ThreeDigitSubG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default ThreeDigitSubG3Quiz;
