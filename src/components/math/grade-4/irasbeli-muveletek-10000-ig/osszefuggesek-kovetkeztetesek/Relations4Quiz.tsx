import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Relations4Matcher } from './Relations4Matcher';
import { Relations4Sorter } from './Relations4Sorter';

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

/** Kétsoros táblázat; a „?” piros. */
const QTable: React.FC<{ top: string; bottom: string; tops: string[]; bottoms: string[] }> = ({ top, bottom, tops, bottoms }) => {
  const lw = 86;
  const cw = Math.min(40, (226 - lw) / tops.length);
  const tx = (240 - (lw + tops.length * cw)) / 2;
  return (
    <QFig h={96}>
      <g transform={`translate(${tx} 14)`}>
        <rect x="0" y="0" width={lw} height="34" fill="#ccfbf1" stroke="#0f766e" />
        <rect x="0" y="34" width={lw} height="34" fill="#ccfbf1" stroke="#0f766e" />
        <text x={lw / 2} y="21" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#134e4a">{top}</text>
        <text x={lw / 2} y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#134e4a">{bottom}</text>
        {tops.map((t, i) => (
          <g key={i}>
            <rect x={lw + i * cw} y="0" width={cw} height="34" fill="#ffffff" stroke="#0f766e" />
            <rect x={lw + i * cw} y="34" width={cw} height="34" fill="#ffffff" stroke="#0f766e" />
            <text x={lw + i * cw + cw / 2} y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill={t === '?' ? C_UNK : '#0f172a'}>{t}</text>
            <text x={lw + i * cw + cw / 2} y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill={bottoms[i] === '?' ? C_UNK : '#0f172a'}>{bottoms[i]}</text>
          </g>
        ))}
      </g>
    </QFig>
  );
};

/** Nyíllánc: kezdő szám → műveletek → dobozok; a „?” piros. */
const QChain: React.FC<{ boxes: string[]; ops: string[]; bottom?: string }> = ({ boxes, ops, bottom }) => {
  const n = boxes.length;
  const bw = 46;
  const gap = (220 - n * bw) / (n - 1);
  const xs = boxes.map((_, i) => 10 + i * (bw + gap));
  return (
    <QFig h={bottom ? 110 : 80}>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={xs[i]} y="30" width={bw} height="26" rx="13" fill={b === '?' ? '#fee2e2' : '#ccfbf1'} stroke={b === '?' ? C_UNK : '#0f766e'} strokeWidth="1.5" />
          <text x={xs[i] + bw / 2} y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill={b === '?' ? C_UNK : '#0f172a'}>{b}</text>
          {i < n - 1 && (
            <g>
              <line x1={xs[i] + bw + 2} y1="43" x2={xs[i + 1] - 4} y2="43" stroke="#0f766e" strokeWidth="1.6" />
              <polygon points={`${xs[i + 1] - 2},43 ${xs[i + 1] - 8},39 ${xs[i + 1] - 8},47`} fill="#0f766e" />
              <text x={(xs[i] + bw + xs[i + 1]) / 2} y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f766e">{ops[i]}</text>
            </g>
          )}
        </g>
      ))}
      {bottom && (
        <g>
          <path d={`M ${xs[0] + bw / 2} 58 L ${xs[0] + bw / 2} 86 L ${xs[n - 1] + bw / 2} 86 L ${xs[n - 1] + bw / 2} 62`} fill="none" stroke="#7c3aed" strokeWidth="1.6" />
          <polygon points={`${xs[n - 1] + bw / 2},58 ${xs[n - 1] + bw / 2 - 4},65 ${xs[n - 1] + bw / 2 + 4},65`} fill="#7c3aed" />
          <text x="120" y="102" textAnchor="middle" fontSize="12" fontWeight="bold" fill={bottom.includes('?') ? C_UNK : '#7c3aed'}>{bottom}</text>
        </g>
      )}
    </QFig>
  );
};

/** Állatos képfeladvány (munkafüzet 17. o., 4. feladat) – egyszerű jelekkel. */
const Animal: React.FC<{ kind: 'm' | 'b' | 'c'; x: number; y: number }> = ({ kind, x, y }) =>
  kind === 'm' ? (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="7" fill="#ea580c" />
      <path d="M 4 -2 Q 14 -14 6 -16" fill="none" stroke="#ea580c" strokeWidth="4" />
    </g>
  ) : kind === 'b' ? (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="6" ry="8" fill="#a16207" />
      <circle cx="-2.5" cy="-3" r="2" fill="#fef3c7" />
      <circle cx="2.5" cy="-3" r="2" fill="#fef3c7" />
    </g>
  ) : (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="1" rx="8" ry="5" fill="#0f172a" />
      <circle cx="6" cy="-4" r="3.2" fill="#0f172a" />
    </g>
  );

const QAnimals: React.FC<{ rows: { a: ('m' | 'b' | 'c')[]; s: string }[]; legend: string }> = ({ rows, legend }) => (
  <QFig h={40 + rows.length * 28}>
    {rows.map((r, ri) => {
      // az állatok közti távolság a darabszámhoz igazodik, hogy a „+” jelek ne takarják egymást
      const sp = Math.min(24, 180 / r.a.length);
      return (
        <g key={ri}>
          {r.a.map((k, i) => (
            <g key={i}>
              <Animal kind={k} x={16 + i * sp} y={26 + ri * 28} />
              {i < r.a.length - 1 && (
                <text x={16 + i * sp + sp / 2} y={30 + ri * 28} textAnchor="middle" fontSize="9" fill="#334155">+</text>
              )}
            </g>
          ))}
          <text x={14 + r.a.length * sp} y={30 + ri * 28} fontSize="12" fontWeight="bold" fill="#0f172a">= {r.s}</text>
        </g>
      );
    })}
    <text x="120" y={28 + rows.length * 28} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>{legend}</text>
  </QFig>
);

/** Hatszög a munkafüzetből (18. o., 6. feladat). */
const QHexagon: React.FC = () => {
  const vals = ['50', '100', '200', '?', '', ''];
  const colors = ['#ef4444', '#facc15', '#22c55e', '#3b82f6', '#1e3a8a', '#c084fc'];
  const cx = 120;
  const cy = 72;
  const R = 58;
  const pt = (k: number) => {
    const a = ((k * 60 - 150) * Math.PI) / 180;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  };
  return (
    <QFig h={146}>
      {vals.map((v, i) => {
        const [x1, y1] = pt(i);
        const [x2, y2] = pt(i + 1);
        const mx = (cx + x1 + x2) / 3;
        const my = (cy + y1 + y2) / 3;
        return (
          <g key={i}>
            <polygon points={`${cx},${cy} ${x1},${y1} ${x2},${y2}`} fill={colors[i]} stroke="#ffffff" strokeWidth="1.5" />
            <text x={mx} y={my + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill={v === '?' ? '#ffffff' : '#0f172a'}>{v}</text>
          </g>
        );
      })}
      <text x="120" y="142" textAnchor="middle" fontSize="10" fill="#334155">a piros mezőtől az óramutató járásával</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const RELATIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'rel4-q1',
    level: 1,
    questionTypeBadge: 'Egyről többre',
    figure: <QTable top="Idő (óra)" bottom="Út (km)" tops={['1', '2', '3']} bottoms={['600', '1200', '?']} />,
    question: 'A gyorsvonat 1 óra alatt 600 km-t tesz meg. Mekkora utat tesz meg 3 óra alatt?',
    options: ['1800 km', '603 km', '1200 km', '2400 km'],
    correctAnswer: 0,
    explanation: 'Háromszor annyi idő alatt háromszor annyi utat tesz meg: 3 · 600 km = 1800 km.'
  },
  {
    id: 'rel4-q2',
    level: 1,
    questionTypeBadge: 'Többről egyre',
    figure: <QTable top="Összeg (Ft)" bottom="Lufi (db)" tops={['600', '?']} bottoms={['10', '1']} />,
    question: '10 lufi ára 600 Ft. Mennyibe kerül 1 lufi?',
    options: ['60 Ft', '6 Ft', '600 Ft', '590 Ft'],
    correctAnswer: 0,
    explanation: '1 lufi ára a 10 lufi árának tizedrésze: 600 Ft : 10 = 60 Ft.'
  },
  {
    id: 'rel4-q3',
    level: 1,
    questionTypeBadge: 'Táblázat',
    figure: <QTable top="Összeg (Ft)" bottom="Lufi (db)" tops={['600', '60', '300']} bottoms={['10', '1', '?']} />,
    question: 'Egy lufi 60 Ft. Hány lufit kapsz 300 Ft-ért?',
    options: ['5 lufit', '50 lufit', '30 lufit', '6 lufit'],
    correctAnswer: 0,
    explanation: '300 Ft-ban az 60 Ft ötször van meg: 300 : 60 = 5. Tehát 5 lufit kapsz.'
  },
  {
    id: 'rel4-q4',
    level: 1,
    questionTypeBadge: 'Felezés',
    question: '12 kiskanál ára 768 Ft. Mennyibe kerül 6 kiskanál?',
    options: ['384 Ft', '1536 Ft', '762 Ft', '64 Ft'],
    correctAnswer: 0,
    explanation: 'A 6 a 12-nek a fele, ezért a 6 kanál ára is a fele: 768 Ft : 2 = 384 Ft.'
  },
  {
    id: 'rel4-q5',
    level: 1,
    questionTypeBadge: 'Egyenlő hányados',
    question: 'Melyik osztás eredménye ugyanannyi, mint a 12 : 4 eredménye?',
    options: ['1200 : 400', '120 : 4', '12 : 3', '1200 : 40'],
    correctAnswer: 0,
    explanation: 'Az osztandót és az osztót is 100-szorosára növeltük, így a hányados nem változik: 1200 : 400 = 3, és 12 : 4 = 3.'
  },
  {
    id: 'rel4-q6',
    level: 1,
    questionTypeBadge: 'Nyíldiagram',
    figure: <QChain boxes={['456', '228', '76']} ops={[': 2', ': 3']} bottom="egy lépésben: ?" />,
    question: 'A 456-ot elosztjuk 2-vel, aztán 3-mal. Melyik egyetlen lépés adja ugyanezt?',
    options: [': 6', ': 5', ': 1', '· 6'],
    correctAnswer: 0,
    explanation: 'Előbb felezünk, aztán harmadolunk – ez ugyanaz, mint hatodolni: 456 : 6 = 76.'
  },
  {
    id: 'rel4-q7',
    level: 1,
    questionTypeBadge: 'Kétszerese',
    figure: <QChain boxes={['?', '1500']} ops={['· 2']} />,
    question: 'Egy szám kétszerese 1500. Melyik ez a szám?',
    options: ['750', '3000', '1498', '1502'],
    correctAnswer: 0,
    explanation: 'Visszafelé osztunk: 1500 : 2 = 750. Ellenőrzés: 750 · 2 = 1500.'
  },
  {
    id: 'rel4-q8',
    level: 1,
    questionTypeBadge: 'Többről egyre',
    question: 'A csapból 9 perc alatt 900 dl víz folyik ki. Mennyi víz folyik ki 1 perc alatt?',
    options: ['100 dl', '10 dl', '891 dl', '8100 dl'],
    correctAnswer: 0,
    explanation: '1 perc alatt a 9 percnyi víz kilencedrésze folyik ki: 900 dl : 9 = 100 dl.'
  },
  {
    id: 'rel4-q9',
    level: 1,
    questionTypeBadge: 'Feleannyi',
    figure: <QTable top="Kertészek (fő)" bottom="Palánta / fő" tops={['1', '2']} bottoms={['240', '?']} />,
    question: '240 palántát ültetnek el. Ha 2 kertész dolgozik, és ugyanannyit ültetnek, hány palántát ültet egy kertész?',
    options: ['120', '480', '238', '242'],
    correctAnswer: 0,
    explanation: 'Ketten osztoznak a munkán, ezért egy kertészre a fele jut: 240 : 2 = 120.'
  },
  {
    id: 'rel4-q10',
    level: 1,
    questionTypeBadge: 'Egyről többre',
    figure: <QTable top="Idő (óra)" bottom="Út (km)" tops={['1', '?']} bottoms={['600', '6000']} />,
    question: 'A gyorsvonat 1 óra alatt 600 km-t tesz meg. Mennyi idő alatt teszi meg a 6000 km-t?',
    options: ['10 óra alatt', '100 óra alatt', '6 óra alatt', '1 óra alatt'],
    correctAnswer: 0,
    explanation: 'A 6000-ben a 600 tízszer van meg: 6000 : 600 = 10. Tehát 10 óra alatt.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'rel4-q11',
    level: 2,
    questionTypeBadge: 'Nyíldiagram',
    figure: <QChain boxes={['?', '1500', '?']} ops={['· 2', '· 2']} bottom="· 4" />,
    question: 'Egy szám kétszerese 1500. Mennyi ennek a számnak a négyszerese?',
    options: ['3000', '6000', '1504', '375'],
    correctAnswer: 0,
    explanation: 'A négyszeres a kétszeres kétszerese: 1500 · 2 = 3000. (A szám 750, és 750 · 4 = 3000.)'
  },
  {
    id: 'rel4-q12',
    level: 2,
    questionTypeBadge: 'Nyíldiagram',
    question: 'Egy szám kétszerese 1500. Mennyi ennek a számnak a nyolcszorosa?',
    options: ['6000', '12 000', '3000', '1508'],
    correctAnswer: 0,
    explanation: 'A szám 1500 : 2 = 750. A nyolcszorosa 750 · 8 = 6000. (Vagy: 1500 · 4 = 6000.)'
  },
  {
    id: 'rel4-q13',
    level: 2,
    questionTypeBadge: 'Egyenlő szorzat',
    question: 'Melyik szorzat egyenlő a 600 · 8 szorzattal?',
    options: ['1200 · 4', '1200 · 16', '300 · 4', '601 · 7'],
    correctAnswer: 0,
    explanation: 'Az első tényezőt kétszeresére növeltük, a másodikat felére csökkentettük, így a szorzat nem változott: 1200 · 4 = 4800 = 600 · 8.'
  },
  {
    id: 'rel4-q14',
    level: 2,
    questionTypeBadge: 'Feleannyi',
    figure: <QTable top="Kertészek (fő)" bottom="Palánta / fő" tops={['2', '3', '6']} bottoms={['120', '80', '?']} />,
    question: '240 palántát 6 kertész ültet el egyenlően. Hány palánta jut egy kertészre?',
    options: ['40', '1440', '234', '60'],
    correctAnswer: 0,
    explanation: '240 : 6 = 40. Ellenőrzés: 6 · 40 = 240. (Kétszer annyi kertész, mint 3 → feleannyi, mint 80.)'
  },
  {
    id: 'rel4-q15',
    level: 2,
    questionTypeBadge: 'Metró',
    question: 'A metró 3 percenként indul. Hány szerelvény indul egy negyedóra alatt?',
    options: ['5', '45', '12', '18'],
    correctAnswer: 0,
    explanation: 'Negyedóra = 15 perc. 15 perc : 3 perc = 5, tehát 5 szerelvény indul.'
  },
  {
    id: 'rel4-q16',
    level: 2,
    questionTypeBadge: 'Metró',
    question: 'Egy metrószerelvényben 1023 utas fér el. Negyedóra alatt 5 szerelvény megy. Legfeljebb hány utas jut el a következő állomásra?',
    options: ['5115', '3069', '4092', '1028'],
    correctAnswer: 0,
    explanation: '5 szerelvény, mindegyikben 1023 utas: 5 · 1023 = 5115 utas.'
  },
  {
    id: 'rel4-q17',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Ági egy lépése 6 dm. Hány lépéssel teszi meg a 83 m 4 dm távolságot?',
    options: ['139 lépéssel', '278 lépéssel', '834 lépéssel', '14 lépéssel'],
    correctAnswer: 0,
    explanation: '83 m 4 dm = 834 dm. 834 dm : 6 dm = 139, tehát 139 lépés.'
  },
  {
    id: 'rel4-q18',
    level: 2,
    questionTypeBadge: 'Feleakkora',
    question: 'Ági húgának lépése feleakkora, mint Ágié (Ágié 6 dm). Hány lépéssel teszi meg a húga a 834 dm-t?',
    options: ['278 lépéssel', '139 lépéssel', '417 lépéssel', '70 lépéssel'],
    correctAnswer: 0,
    explanation: 'A húg lépése 3 dm. Feleakkora lépés → kétszer annyi lépés: 834 : 3 = 278 (= 2 · 139).'
  },
  {
    id: 'rel4-q19',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <QTable top="Barátok (fő)" bottom="Egy barát (Ft)" tops={['10', '5', '2']} bottoms={['408', '?', '2040']} />,
    question: 'A 4080 Ft-os társasjátékot 5 barát veszi meg egyenlően. Mennyit fizet egy barát?',
    options: ['816 Ft', '408 Ft', '20 400 Ft', '4075 Ft'],
    correctAnswer: 0,
    explanation: '4080 Ft : 5 = 816 Ft. (Feleannyi barát, mint 10 → kétszer annyi pénz, mint 408 Ft.)'
  },
  {
    id: 'rel4-q20',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <QTable top="Barátok (fő)" bottom="Egy barát (Ft)" tops={['2', '4', '8']} bottoms={['2040', '1020', '?']} />,
    question: 'Ha 4 barát fizeti a 4080 Ft-ot, egy barát 1020 Ft-ot ad. Mennyit ad egy barát, ha 8-an fizetik?',
    options: ['510 Ft', '2040 Ft', '1012 Ft', '8160 Ft'],
    correctAnswer: 0,
    explanation: 'Kétszer annyi barát → feleannyi pénz fejenként: 1020 Ft : 2 = 510 Ft. Ellenőrzés: 8 · 510 = 4080.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'rel4-q21',
    level: 3,
    questionTypeBadge: 'Idő',
    question: 'A gyorsvonat 1 óra alatt 600 km-t tenne meg. Hány perc alatt érne Székesfehérvárról a 300 km-re lévő Debrecenbe?',
    options: ['30 perc alatt', '60 perc alatt', '50 perc alatt', '300 perc alatt'],
    correctAnswer: 0,
    explanation: '300 km a 600 km fele, ezért fél óra kell hozzá. Fél óra = 30 perc.'
  },
  {
    id: 'rel4-q22',
    level: 3,
    questionTypeBadge: 'Komp',
    question: 'A komp naponta 4-szer fordul oda-vissza a két állomás között, és így 3 km 208 m-t tesz meg. Milyen messze van egymástól a két állomás?',
    options: ['401 m', '802 m', '1604 m', '3204 m'],
    correctAnswer: 0,
    explanation: '4 oda-vissza út = 8 út. 3 km 208 m = 3208 m. 3208 m : 8 = 401 m.'
  },
  {
    id: 'rel4-q23',
    level: 3,
    questionTypeBadge: 'Van elég adat?',
    question: 'Melyik feladat eredménye számítható ki a megadott adatokból?',
    options: [
      'A komp 4-szer fordul oda-vissza, és 3208 m-t tesz meg. Milyen messze vannak az állomások?',
      'A vonat 6 kocsit húz, az egyikbe 105 utas szállt. Hány utas szállt fel összesen?',
      'Hétfőn 236 utas utazott a helyi járaton. Hányan utaztak egész héten?',
      'A busz az 1. megállóig 700 m-t tett meg. Hány métert utazott Eszter a 3. megállóig?'
    ],
    correctAnswer: 0,
    explanation: 'Csak a kompos feladatban van minden adat. A többinél nem tudjuk, hány utas ült a többi kocsiban, mennyien utaztak a többi napon, és milyen messze vannak a többi megállók.'
  },
  {
    id: 'rel4-q24',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'A csapból percenként 100 dl víz folyik ki. Mennyi idő alatt telik meg a 100 l-es akvárium?',
    options: ['10 perc alatt', '1 perc alatt', '100 perc alatt', '9 perc alatt'],
    correctAnswer: 0,
    explanation: '100 l = 1000 dl. 1000 dl : 100 dl = 10, tehát 10 perc alatt telik meg.'
  },
  {
    id: 'rel4-q25',
    level: 3,
    questionTypeBadge: 'Képfeladvány',
    figure: (
      <QAnimals
        rows={[
          { a: ['m', 'm', 'm'], s: '210' },
          { a: ['m', 'm', 'b', 'b', 'b', 'b'], s: '500' }
        ]}
        legend="1 bagoly = ?"
      />
    ),
    question: '3 mókus együtt 210-et ér. 2 mókus és 4 bagoly együtt 500-at ér. Mennyit ér egy bagoly?',
    options: ['90', '70', '125', '360'],
    correctAnswer: 0,
    explanation: 'Egy mókus 210 : 3 = 70. Két mókus 140. A 4 bagoly 500 − 140 = 360, egy bagoly 360 : 4 = 90.'
  },
  {
    id: 'rel4-q26',
    level: 3,
    questionTypeBadge: 'Képfeladvány',
    figure: (
      <QAnimals rows={[{ a: ['c', 'c', 'c', 'c', 'c', 'c', 'b', 'm'], s: '640' }]} legend="mókus = 70, bagoly = 90, macska = ?" />
    ),
    question: 'Egy mókus 70-et, egy bagoly 90-et ér. 6 macska, 1 bagoly és 1 mókus együtt 640. Mennyit ér egy macska?',
    options: ['80', '480', '90', '70'],
    correctAnswer: 0,
    explanation: '640 − 90 − 70 = 480 – ennyit ér a 6 macska. Egy macska 480 : 6 = 80.'
  },
  {
    id: 'rel4-q27',
    level: 3,
    questionTypeBadge: 'Szabálykeresés',
    figure: <QHexagon />,
    question: 'A hatszög mezőiben 50, 100, 200 áll. Ugyanazzal a szabállyal melyik szám kerül a következő (kék) mezőbe?',
    options: ['400', '250', '300', '800'],
    correctAnswer: 0,
    explanation: 'Minden szám az előző kétszerese: 50 · 2 = 100, 100 · 2 = 200, 200 · 2 = 400.'
  },
  {
    id: 'rel4-q28',
    level: 3,
    questionTypeBadge: 'Szabálykeresés',
    question: 'Az első hatszögben 50, 100, 200 áll, a másodikban ugyanazokon a helyeken 150, 300, 600. Mi az összefüggés az azonos színű mezők között?',
    options: ['A második a háromszorosa', 'A második a kétszerese', 'A második 100-zal több', 'A második 3-mal több'],
    correctAnswer: 0,
    explanation: '50 · 3 = 150, 100 · 3 = 300, 200 · 3 = 600. Mindegyik a háromszorosa.'
  },
  {
    id: 'rel4-q29',
    level: 3,
    questionTypeBadge: 'Egyenlő szorzat',
    question: '1600 · 4 = 6400. Az első tényezőt felére csökkentem: 800. Mit tegyek a második tényezővel, hogy a szorzat 6400 maradjon?',
    options: ['A kétszeresére növelem (8)', 'A felére csökkentem (2)', 'Hozzáadok 800-at (804)', 'Nem változtatom (4)'],
    correctAnswer: 0,
    explanation: 'Ha az egyik tényező a felére csökken, a másiknak a kétszeresére kell nőnie: 800 · 8 = 6400.'
  },
  {
    id: 'rel4-q30',
    level: 3,
    questionTypeBadge: 'Egyenlő hányados',
    question: 'Melyik osztásnak NEM 30 a hányadosa?',
    options: ['120 : 40', '120 : 4', '1200 : 40', '3600 : 120'],
    correctAnswer: 0,
    explanation: '120 : 40 = 3. A többinél 30 a hányados: 120 : 4 = 30, 1200 : 40 = 30, 3600 : 120 = 30.'
  }
];

export const Relations4Quiz: React.FC<{
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
      topicId="g4-wops-osszefuggesek-quiz"
      subtopicId="osszefuggesek-kovetkeztetesek"
      title="5. Összefüggések, következtetések – Kvíz"
      subtitle="30 feladat 3 szinten: egyről többre, többről egyre, táblázatok, változatlan szorzat és hányados."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={RELATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Következtetés',
          items: [
            '1 óra → 600 km, 3 óra → 3 · 600 = 1800 km',
            '10 lufi → 600 Ft, 1 lufi → 600 : 10 = 60 Ft',
            '12 kanál → 768 Ft, 6 kanál → 768 : 2 = 384 Ft',
            'Előbb egyre következtetünk, aztán többre.'
          ]
        },
        {
          title: 'Fordított összefüggés',
          items: [
            '240 palánta: 2 kertész → 120, 4 kertész → 60',
            'Kétszer annyi kertész → feleannyi palánta fejenként',
            'Feleakkora lépés → kétszer annyi lépés',
            'Ellenőrzés: kertészek · palánta = 240'
          ]
        },
        {
          title: 'Változatlan szorzat, hányados',
          items: [
            '600 · 8 = 1200 · 4 = 2400 · 2',
            '12 : 4 = 120 : 40 = 1200 : 400',
            '456 : 2 : 3 = 456 : 6',
            'Van elég adat? Csak akkor számolj!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Relations4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Relations4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Relations4Quiz;
