import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ThreeDigitAddG3Matcher } from './ThreeDigitAddG3Matcher';
import { ThreeDigitAddG3Sorter } from './ThreeDigitAddG3Sorter';
import { QFig, UNK, BlockNum, blockNumWidth, Coin, PriceTag, ItemIcon, ItemKind, Rod } from './ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Két szám kirakva egymás alatt, „+” jellel. */
const BlocksQ: React.FC<{ a: [number, number, number]; b: [number, number, number] }> = ({ a, b }) => {
  const s = 26;
  const wa = blockNumWidth(a[0], a[1], a[2], s);
  const wb = blockNumWidth(b[0], b[1], b[2], s);
  const x0 = 40 + (200 - Math.max(wa, wb)) / 2;
  return (
    <QFig h={100}>
      <BlockNum x={x0} y={12} sz={a[0]} t={a[1]} e={a[2]} s={s} />
      <text x={x0 - 14} y={83} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a">+</text>
      <BlockNum x={x0} y={60} sz={b[0]} t={b[1]} e={b[2]} s={s} />
    </QFig>
  );
};

/** Két persely érmékkel. */
const CoinsQ: React.FC<{ left: number[]; right: number[] }> = ({ left, right }) => {
  const row = (coins: number[], x0: number, w: number) => {
    const r = Math.min(15, (w - (coins.length - 1) * 3) / (2 * coins.length));
    const gap = Math.min(4, (w - coins.length * 2 * r) / Math.max(1, coins.length - 1));
    const tw = coins.length * 2 * r + (coins.length - 1) * gap;
    const sx = x0 + (w - tw) / 2 + r;
    return coins.map((v, i) => <Coin key={i} cx={sx + i * (2 * r + gap)} cy={52} v={v} r={r} />);
  };
  return (
    <QFig h={92}>
      <rect x="8" y="14" width="106" height="66" rx="10" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.6" />
      <rect x="126" y="14" width="106" height="66" rx="10" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.6" />
      <text x="120" y="54" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#16a34a">+</text>
      {row(left, 10, 102)}
      {row(right, 128, 102)}
    </QFig>
  );
};

/** Tárgyak árcédulával. */
const TagsQ: React.FC<{ items: { kind: ItemKind; price: number; name?: string }[]; extra?: string }> = ({ items, extra }) => {
  const n = items.length;
  const w = 236 / n;
  return (
    <QFig h={extra ? 112 : 96}>
      {items.map((it, i) => {
        const cx = 2 + w * i + w / 2;
        return (
          <g key={i}>
            <ItemIcon kind={it.kind} cx={cx} cy={32} s={0.95} />
            <PriceTag x={cx - 28} y={56} text={`${it.price} Ft`} w={58} fs={11.5} />
            {it.name && <text x={cx} y={90} textAnchor="middle" fontSize="10.5" fill="#475569">{it.name}</text>}
          </g>
        );
      })}
      {extra && <text x="120" y="106" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">{extra}</text>}
    </QFig>
  );
};

/** Helyiérték-táblázat egy számmal és egy hozzáadandóval. */
const PlaceQ: React.FC<{ n: number; add: string }> = ({ n, add }) => {
  const d = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
  return (
    <QFig h={96}>
      {['sz', 't', 'e'].map((l, i) => (
        <g key={l}>
          <rect x={30 + i * 44} y="12" width="44" height="22" fill={['#f87171', '#60a5fa', '#facc15'][i]} stroke="#fff" />
          <text x={52 + i * 44} y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{l}</text>
          <rect x={30 + i * 44} y="34" width="44" height="40" fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} stroke="#fff" />
          <text x={52 + i * 44} y="63" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{d[i]}</text>
        </g>
      ))}
      <text x="196" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#16a34a">{add}</text>
    </QFig>
  );
};

/** Tízesrudak sora. */
const RodsQ: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={80}>
    {Array.from({ length: n }).map((_, i) => (
      <Rod key={i} x={120 - (n * 12) / 2 + i * 12} y={14} w={8} h={52} />
    ))}
  </QFig>
);

/** Egyenlőség dobozokkal: '?' = keresett. */
const EqQ: React.FC<{ parts: string[] }> = ({ parts }) => {
  const ws = parts.map((p) => (p === '+' || p === '=' ? 20 : 54));
  const total = ws.reduce((a, b) => a + b, 0) + (parts.length - 1) * 4;
  let x = (240 - total) / 2;
  return (
    <QFig h={66}>
      {parts.map((p, i) => {
        const w = ws[i];
        const x0 = x;
        x += w + 4;
        if (p === '+' || p === '=') return <text key={i} x={x0 + w / 2} y="41" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">{p}</text>;
        const q = p === '?';
        return (
          <g key={i}>
            <rect x={x0} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? UNK : '#0891b2'} strokeWidth="1.8" />
            <text x={x0 + w / 2} y="39" textAnchor="middle" fontSize="19" fontWeight="bold" fill={q ? UNK : '#164e63'}>{p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Szalagok (oszlopok) vízszintesen: hossz arányos az értékkel; '?' felirat = ismeretlen. */
const BarsQ: React.FC<{ bars: { label: string; v: number; text: string; color: string }[]; max?: number; brace?: string }> = ({ bars, max = 300, brace }) => {
  const x0 = 74;
  const W = 150;
  const h = 22 + bars.length * 30 + (brace ? 14 : 0);
  return (
    <QFig h={h}>
      {bars.map((b, i) => {
        const y = 14 + i * 30;
        const w = (W * b.v) / max;
        const q = b.text === '?';
        return (
          <g key={i}>
            <text x={x0 - 6} y={y + 15} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.label}</text>
            <rect x={x0} y={y} width={w} height="20" rx="4" fill={b.color} stroke="#334155" strokeWidth="1" />
            <text x={q ? x0 + w + 12 : x0 + w / 2} y={y + 15} textAnchor="middle" fontSize="13" fontWeight="bold" fill={q ? UNK : '#0f172a'}>{b.text}</text>
          </g>
        );
      })}
      {brace && <text x="120" y={h - 8} textAnchor="middle" fontSize="11.5" fill="#475569">{brace}</text>}
    </QFig>
  );
};

/** Oszlopdiagram két oszloppal. */
const ChartQ: React.FC = () => (
  <QFig h={140}>
    <line x1="50" y1="112" x2="210" y2="112" stroke="#334155" strokeWidth="1.6" />
    <line x1="50" y1="112" x2="50" y2="14" stroke="#334155" strokeWidth="1.6" />
    {[0, 100, 200, 300].map((v) => (
      <g key={v}>
        <line x1="46" y1={112 - v * 0.3} x2="210" y2={112 - v * 0.3} stroke="#cbd5e1" strokeWidth="0.8" />
        <text x="42" y={116 - v * 0.3} textAnchor="end" fontSize="10.5" fill="#475569">{v}</text>
      </g>
    ))}
    <rect x="76" y={112 - 180 * 0.3} width="40" height={180 * 0.3} fill="#60a5fa" stroke="#1e3a8a" />
    <text x="96" y={106 - 180 * 0.3} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">180</text>
    <rect x="144" y={112 - 230 * 0.3} width="40" height={230 * 0.3} fill="#fb923c" stroke="#7c2d12" />
    <text x="164" y={106 - 230 * 0.3} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">230</text>
    <text x="96" y="128" textAnchor="middle" fontSize="11" fill="#334155">délelőtt</text>
    <text x="164" y="128" textAnchor="middle" fontSize="11" fill="#334155">délután</text>
    <text x="20" y="14" fontSize="10" fill="#475569">fő</text>
  </QFig>
);

/** Két összeg kártyán, összehasonlításhoz. */
const CompareQ: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <QFig h={70}>
    <rect x="12" y="14" width="96" height="42" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.8" />
    <text x="60" y="41" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#164e63">{a}</text>
    <text x="120" y="42" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
    <rect x="132" y="14" width="96" height="42" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
    <text x="180" y="41" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#78350f">{b}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const THREE_DIGIT_ADD_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'tda-q1',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    figure: <BlocksQ a={[2, 3, 6]} b={[2, 0, 0]} />,
    question: 'Mennyi 236 + 200?',
    options: ['436', '238', '256', '446'],
    correctAnswer: 0,
    explanation: 'A 200 két százas. 2 százas + 2 százas = 4 százas. A tízes és az egyes marad: 436.'
  },
  {
    id: 'tda-q2',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 300 + 145?',
    options: ['445', '148', '345', '455'],
    correctAnswer: 0,
    explanation: '3 százas + 1 százas = 4 százas. A 45 marad: 445.'
  },
  {
    id: 'tda-q3',
    level: 1,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksQ a={[2, 4, 0]} b={[1, 3, 0]} />,
    question: 'Két számot kiraktunk. Mennyi az összegük?',
    options: ['370', '360', '270', '470'],
    correctAnswer: 0,
    explanation: 'Fent 240, lent 130. Százasok: 2 + 1 = 3. Tízesek: 4 + 3 = 7. Együtt 370.'
  },
  {
    id: 'tda-q4',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: 'Mennyi 140 + 50?',
    options: ['190', '145', '180', '200'],
    correctAnswer: 0,
    explanation: 'Az 50 öt tízes. 4 tízes + 5 tízes = 9 tízes. Így 140 + 50 = 190.'
  },
  {
    id: 'tda-q5',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ left={[200, 100, 50]} right={[100, 20]} />,
    question: 'Hány forint van a két perselyben együtt?',
    options: ['470 Ft', '460 Ft', '370 Ft', '480 Ft'],
    correctAnswer: 0,
    explanation: 'Piros: 200 + 100 + 50 = 350 Ft. Kék: 100 + 20 = 120 Ft. Együtt 350 + 120 = 470 Ft.'
  },
  {
    id: 'tda-q6',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: 'Mennyi 250 + 30?',
    options: ['280', '253', '380', '270'],
    correctAnswer: 0,
    explanation: 'A 30 három tízes. 5 tízes + 3 tízes = 8 tízes: 280.'
  },
  {
    id: 'tda-q7',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    figure: <PlaceQ n={158} add="+ 200" />,
    question: 'A 158-hoz hozzáadunk 200-at. Melyik helyen változik a szám?',
    options: ['a százasok helyén', 'a tízesek helyén', 'az egyesek helyén', 'mindhárom helyen'],
    correctAnswer: 0,
    explanation: 'A 200 csak százasokból áll. Ezért csak a százasok helyén nő a szám: 158 + 200 = 358.'
  },
  {
    id: 'tda-q8',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    figure: <BlocksQ a={[2, 1, 3]} b={[1, 0, 4]} />,
    question: 'Mennyi 213 + 104?',
    options: ['317', '327', '307', '417'],
    correctAnswer: 0,
    explanation: 'Százasok: 2 + 1 = 3. Tízesek: 1 + 0 = 1. Egyesek: 3 + 4 = 7. Az összeg 317.'
  },
  {
    id: 'tda-q9',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: 'Mennyi 430 + 40?',
    options: ['470', '434', '460', '440'],
    correctAnswer: 0,
    explanation: '3 tízes + 4 tízes = 7 tízes. A 4 százas marad: 470.'
  },
  {
    id: 'tda-q10',
    level: 1,
    questionTypeBadge: 'Vásár',
    figure: <TagsQ items={[{ kind: 'pencil', price: 120, name: 'ceruza' }, { kind: 'book', price: 200, name: 'mesekönyv' }]} />,
    question: 'Mennyibe kerül együtt a ceruza és a mesekönyv?',
    options: ['320 Ft', '122 Ft', '330 Ft', '420 Ft'],
    correctAnswer: 0,
    explanation: '120 Ft + 200 Ft: 1 százas + 2 százas = 3 százas, a 20 marad. Együtt 320 Ft.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'tda-q11',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <BlocksQ a={[1, 8, 0]} b={[2, 5, 0]} />,
    question: 'Mennyi 180 + 250?',
    options: ['430', '330', '420', '440'],
    correctAnswer: 0,
    explanation: 'Százasok: 1 + 2 = 3. Tízesek: 8 + 5 = 13. A 13 tízes = 1 százas és 3 tízes. Így 4 százas, 3 tízes: 430.'
  },
  {
    id: 'tda-q12',
    level: 2,
    questionTypeBadge: 'Beváltás',
    question: 'Mennyi 170 + 160?',
    options: ['330', '230', '320', '340'],
    correctAnswer: 0,
    explanation: '100 + 100 = 200. 70 + 60 = 130. Együtt 200 + 130 = 330.'
  },
  {
    id: 'tda-q13',
    level: 2,
    questionTypeBadge: 'Beváltás',
    question: 'Mennyi 290 + 140?',
    options: ['430', '330', '440', '410'],
    correctAnswer: 0,
    explanation: '200 + 100 = 300. 90 + 40 = 130. Együtt 300 + 130 = 430.'
  },
  {
    id: 'tda-q14',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <RodsQ n={13} />,
    question: 'Itt 13 tízesrúd van. Mennyit ér ez százasokban és tízesekben?',
    options: ['1 százas és 3 tízes', '13 százas', '3 százas és 1 tízes', '1 tízes és 3 egyes'],
    correctAnswer: 0,
    explanation: '10 tízes = 1 százas. A 13 tízesből 10 tízes lesz 1 százas, 3 tízes marad. Ez 130.'
  },
  {
    id: 'tda-q15',
    level: 2,
    questionTypeBadge: 'Vásár',
    figure: <TagsQ items={[{ kind: 'jar', price: 125, name: 'lekvár' }, { kind: 'kite', price: 250, name: 'sárkány' }]} />,
    question: 'Mennyibe kerül együtt a lekvár és a sárkány?',
    options: ['375 Ft', '365 Ft', '385 Ft', '475 Ft'],
    correctAnswer: 0,
    explanation: 'Százasok: 100 + 200 = 300. Tízesek: 20 + 50 = 70. Egyesek: 5. Együtt 375 Ft.'
  },
  {
    id: 'tda-q16',
    level: 2,
    questionTypeBadge: 'Helyi érték',
    question: 'Mennyi 342 + 105?',
    options: ['447', '437', '457', '357'],
    correctAnswer: 0,
    explanation: 'Százasok: 3 + 1 = 4. Tízesek: 4 + 0 = 4. Egyesek: 2 + 5 = 7. Az összeg 447.'
  },
  {
    id: 'tda-q17',
    level: 2,
    questionTypeBadge: 'Összeg',
    question: 'Mennyi a 260 és a 150 összege?',
    options: ['410', '310', '400', '420'],
    correctAnswer: 0,
    explanation: '200 + 100 = 300. 60 + 50 = 110. Együtt 300 + 110 = 410.'
  },
  {
    id: 'tda-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ left={[200, 50, 20, 20]} right={[100, 50, 10]} />,
    question: 'Hány forint van a két perselyben együtt?',
    options: ['450 Ft', '350 Ft', '440 Ft', '460 Ft'],
    correctAnswer: 0,
    explanation: 'Piros: 200 + 50 + 20 + 20 = 290 Ft. Kék: 100 + 50 + 10 = 160 Ft. Együtt 290 + 160 = 450 Ft.'
  },
  {
    id: 'tda-q19',
    level: 2,
    questionTypeBadge: 'Kerek tízesek',
    question: 'Melyik összeadás eredménye pontosan 400?',
    options: ['230 + 170', '230 + 160', '240 + 170', '130 + 170'],
    correctAnswer: 0,
    explanation: '230 + 170: 200 + 100 = 300, 30 + 70 = 100. Együtt 400. A többi: 390, 410, 300.'
  },
  {
    id: 'tda-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['150', '+', '?', '=', '400']} />,
    question: 'Melyik szám hiányzik? 150 + □ = 400',
    options: ['250', '350', '260', '150'],
    correctAnswer: 0,
    explanation: '150-től 200-ig 50 kell, 200-tól 400-ig még 200. 50 + 200 = 250. Próba: 150 + 250 = 400.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'tda-q21',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagsQ items={[{ kind: 'bear', price: 260, name: 'maci' }, { kind: 'mug', price: 230, name: 'bögre' }]} extra="Panna pénze: 500 Ft" />,
    question: 'Panna 500 Ft-tal megy a vásárba. Megveszi a macit és a bögrét. Elég a pénze?',
    options: ['Igen, és 10 Ft marad.', 'Igen, pont 500 Ft kell.', 'Nem, 10 Ft hiányzik.', 'Igen, és 100 Ft marad.'],
    correctAnswer: 0,
    explanation: '260 + 230 = 490 Ft. Ez kevesebb, mint 500 Ft. 500 − 490 = 10, tehát 10 Ft marad.'
  },
  {
    id: 'tda-q22',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <ChartQ />,
    question: 'A diagram mutatja, hányan jöttek a vásárra délelőtt és délután. Hányan jöttek összesen?',
    options: ['410', '310', '400', '420'],
    correctAnswer: 0,
    explanation: 'Délelőtt 180, délután 230. 100 + 200 = 300, 80 + 30 = 110. Együtt 410.'
  },
  {
    id: 'tda-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarsQ bars={[{ label: 'Noé', v: 150, text: '150', color: '#86efac' }, { label: 'Dani', v: 220, text: '?', color: '#fde68a' }]} brace="Dani 70-nel többet gyűjtött." />,
    question: 'Noé 150 gesztenyét gyűjtött, Dani 70-nel többet. Hány gesztenyét gyűjtöttek ketten együtt?',
    options: ['370', '220', '290', '360'],
    correctAnswer: 0,
    explanation: 'Dani: 150 + 70 = 220. Ketten: 150 + 220 = 370.'
  },
  {
    id: 'tda-q24',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: <BarsQ bars={[{ label: '3.a', v: 120, text: '120 kg', color: '#93c5fd' }, { label: '3.b', v: 200, text: '200 kg', color: '#fca5a5' }, { label: '3.c', v: 150, text: '150 kg', color: '#fde68a' }]} max={250} />,
    question: 'Három osztály papírt gyűjtött. Hány kilogramm papírt gyűjtöttek összesen?',
    options: ['470 kg', '370 kg', '460 kg', '480 kg'],
    correctAnswer: 0,
    explanation: 'Százasok: 100 + 200 + 100 = 400. Tízesek: 20 + 0 + 50 = 70. Együtt 470 kg.'
  },
  {
    id: 'tda-q25',
    level: 3,
    questionTypeBadge: 'Vásár',
    figure: (
      <TagsQ
        items={[
          { kind: 'ball', price: 160, name: 'labda' },
          { kind: 'book', price: 240, name: 'mesekönyv' },
          { kind: 'kite', price: 180, name: 'sárkány' },
          { kind: 'mug', price: 230, name: 'bögre' }
        ]}
      />
    ),
    question: 'Melyik két dolgot veheted meg pontosan 400 Ft-ért?',
    options: ['a labdát és a mesekönyvet', 'a sárkányt és a bögrét', 'a labdát és a bögrét', 'a mesekönyvet és a sárkányt'],
    correctAnswer: 0,
    explanation: '160 + 240 = 400. A többi: 180 + 230 = 410, 160 + 230 = 390, 240 + 180 = 420.'
  },
  {
    id: 'tda-q26',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <EqQ parts={['?', '+', '200', '=', '450']} />,
    question: 'Gondoltam egy számot. Hozzáadtam 200-at, és 450 lett. Melyik számra gondoltam?',
    options: ['250', '350', '150', '240'],
    correctAnswer: 0,
    explanation: 'A 200 két százas. 450-ben 4 százas van, ebből 2 a hozzáadott. Marad 250. Próba: 250 + 200 = 450.'
  },
  {
    id: 'tda-q27',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ left={[100, 20, 10, 5]} right={[200, 50]} />,
    question: 'Zsófinak 135 Ft-ja van. A nagymamájától kap 200 Ft-ot, az anyukájától 50 Ft-ot. Mennyi pénze lesz?',
    options: ['385 Ft', '335 Ft', '185 Ft', '375 Ft'],
    correctAnswer: 0,
    explanation: '135 + 200 = 335. 335 + 50 = 385. Zsófinak 385 Ft-ja lesz.'
  },
  {
    id: 'tda-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarsQ bars={[{ label: 'labda', v: 250, text: '250 Ft', color: '#fdba74' }, { label: 'sárkány', v: 420, text: '?', color: '#fda4af' }]} max={500} brace="A sárkány 170 Ft-tal drágább." />,
    question: 'A labda 250 Ft. A sárkány 170 Ft-tal drágább. Mennyibe kerül a sárkány?',
    options: ['420 Ft', '80 Ft', '320 Ft', '410 Ft'],
    correctAnswer: 0,
    explanation: 'Drágább, tehát többe kerül: 250 + 170. 200 + 100 = 300, 50 + 70 = 120. Együtt 420 Ft.'
  },
  {
    id: 'tda-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQ a="260 + 180" b="190 + 240" />,
    question: 'Melyik összeg a nagyobb?',
    options: ['260 + 180', '190 + 240', 'egyenlők', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '260 + 180 = 440. 190 + 240 = 430. A 440 a nagyobb.'
  },
  {
    id: 'tda-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy dobozban 10 ceruza van. Az egyik polcon 18 doboz, a másikon 25 doboz van. Hány ceruza van összesen?',
    options: ['430', '330', '43', '420'],
    correctAnswer: 0,
    explanation: '18 doboz = 180 ceruza, 25 doboz = 250 ceruza. 180 + 250 = 430 ceruza.'
  }
];

export const ThreeDigitAddG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-osszeadas"
    topicId="g3-wadd-haromjegyu-quiz"
    subtopicId="haromjegyu-szamok-osszeadasa"
    title="1. Háromjegyű számok összeadása – Kvíz"
    subtitle="30 feladat 3 szinten: kerek százas és kerek tízesek hozzáadása, beváltás, helyi értékenként, vásár."
    badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
    questions={THREE_DIGIT_ADD_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Kerek százas', items: ['236 + 200 = 436', 'Csak a százasok változnak', '300 + 145 = 445'] },
      { title: 'Kerek tízesek', items: ['10 tízes = 1 százas', '180 + 250: 8 + 5 = 13 tízes', '13 tízes = 130 → 300 + 130 = 430'] },
      { title: 'Helyi értékenként', items: ['Százas + százas', 'Tízes + tízes', 'Egyes + egyes', '125 + 250 = 300 + 70 + 5 = 375'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<ThreeDigitAddG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<ThreeDigitAddG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default ThreeDigitAddG3Quiz;
