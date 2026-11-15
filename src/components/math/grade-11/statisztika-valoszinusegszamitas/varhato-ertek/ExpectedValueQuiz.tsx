import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExpectedValueMatcher } from './ExpectedValueMatcher';
import { ExpectedValueSorter } from './ExpectedValueSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const PIPS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.27, 0.27], [0.73, 0.73]],
  3: [[0.27, 0.27], [0.5, 0.5], [0.73, 0.73]],
  4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]],
  5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]],
  6: [[0.27, 0.25], [0.73, 0.25], [0.27, 0.5], [0.73, 0.5], [0.27, 0.75], [0.73, 0.75]]
};

const MiniDie: React.FC<{ x: number; y: number; n: number; s?: number; fill?: string }> = ({ x, y, n, s = 30, fill = '#ffffff' }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx={s * 0.18} fill={fill} stroke="#334155" strokeWidth="1.3" />
    {PIPS[n].map(([a, b], i) => (
      <circle key={i} cx={x + a * s} cy={y + b * s} r={s * 0.08} fill="#1e293b" />
    ))}
  </g>
);

/** Kockák sora; a `win` lapok zöldek, a többiek pirosak (ha meg van adva), alatta felirat. */
const DiceFig: React.FC<{ faces?: number[]; win?: number[]; caption?: string }> = ({ faces = [1, 2, 3, 4, 5, 6], win, caption }) => {
  const s = 30;
  const gap = 8;
  const total = faces.length * s + (faces.length - 1) * gap;
  const x0 = (240 - total) / 2;
  return (
    <svg viewBox="0 0 240 90" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {faces.map((n, i) => (
        <MiniDie key={i} x={x0 + i * (s + gap)} y={16} n={n} s={s} fill={win ? (win.includes(n) ? '#dcfce7' : '#ffe4e6') : '#ffffff'} />
      ))}
      {caption && (
        <text x="120" y="72" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Eloszlástáblázat: felső sor érték, alsó sor valószínűség. */
const DistFig: React.FC<{ head: string; values: string[]; probs: string[]; probHead?: string }> = ({ head, values, probs, probHead = 'p' }) => {
  const cols = values.length;
  const firstW = 64;
  const w = (230 - firstW) / cols;
  return (
    <svg viewBox="0 0 240 90" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="5" y="15" width={firstW} height="30" fill="#e0f2fe" stroke="#0284c7" />
      <rect x="5" y="45" width={firstW} height="30" fill="#e0f2fe" stroke="#0284c7" />
      <text x={5 + firstW / 2} y="34" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        {head}
      </text>
      <text x={5 + firstW / 2} y="64" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        {probHead}
      </text>
      {values.map((v, i) => (
        <g key={i}>
          <rect x={5 + firstW + i * w} y="15" width={w} height="30" fill="#ffffff" stroke="#0284c7" />
          <rect x={5 + firstW + i * w} y="45" width={w} height="30" fill="#ffffff" stroke="#0284c7" />
          <text x={5 + firstW + i * w + w / 2} y="34" fontSize="10" textAnchor="middle" fill="#1e293b">
            {v}
          </text>
          <text x={5 + firstW + i * w + w / 2} y="64" fontSize="10" textAnchor="middle" fill={probs[i] === '?' ? '#be123c' : '#1e293b'} fontWeight={probs[i] === '?' ? 'bold' : 'normal'}>
            {probs[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Érmék sora (F = fej, I = írás), opcionális felirattal. */
const CoinsFig: React.FC<{ labels: string[]; caption?: string }> = ({ labels, caption }) => {
  const gap = 60;
  const x0 = 120 - ((labels.length - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 240 90" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {labels.map((l, i) => (
        <g key={i}>
          <circle cx={x0 + i * gap} cy="38" r="22" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          <circle cx={x0 + i * gap} cy="38" r="17" fill="none" stroke="#d97706" strokeWidth="1" />
          <text x={x0 + i * gap} y="43" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#78350f">
            {l}
          </text>
        </g>
      ))}
      {caption && (
        <text x="120" y="80" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Oszlopdiagram (pontszám → tanulók száma). */
const BarsFig: React.FC<{ labels: string[]; counts: number[]; max: number; caption?: string }> = ({ labels, counts, max, caption }) => {
  const x0 = 30;
  const yB = 112;
  const bw = 180 / labels.length;
  const sc = 90 / max;
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={x0} y1={yB} x2={x0 + 190} y2={yB} stroke="#334155" />
      <line x1={x0} y1={yB} x2={x0} y2={14} stroke="#334155" />
      {Array.from({ length: max / 2 + 1 }, (_, i) => i * 2).map((v) => (
        <text key={v} x={x0 - 4} y={yB - v * sc + 3} fontSize="8" textAnchor="end" fill="#475569">
          {v}
        </text>
      ))}
      {counts.map((c, i) => (
        <g key={i}>
          <rect x={x0 + 6 + i * bw} y={yB - c * sc} width={bw - 12} height={c * sc} fill="#7dd3fc" stroke="#0369a1" />
          <text x={x0 + 6 + i * bw + (bw - 12) / 2} y={yB + 11} fontSize="9" textAnchor="middle" fill="#334155">
            {labels[i]}
          </text>
        </g>
      ))}
      {caption && (
        <text x="125" y="134" fontSize="9" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

const EXPECTED_VALUE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'ev-q1',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Mennyi egy szabályos dobókockával dobott szám várható értéke?',
    figure: <DiceFig caption="mindegyik lap valószínűsége 1/6 – E = ?" />,
    options: ['3,5', '3', '4', '6'],
    correctAnswer: 0,
    explanation: 'E = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 21/6 = 3,5. Ilyen számot nem dobhatunk, de sok dobás átlaga 3,5 körül lesz.'
  },
  {
    id: 'ev-q2',
    level: 1,
    questionTypeBadge: 'Eloszlás',
    question: 'Egy kísérlet összes lehetséges kimenetelét felsoroltuk a valószínűségükkel. Mennyi a valószínűségek összege?',
    options: ['1', '0', '100', 'a kimenetelek száma'],
    correctAnswer: 0,
    explanation: 'Teljes felsorolás esetén a valószínűségek összege mindig 1 – ezzel érdemes ellenőrizni a táblázatot.'
  },
  {
    id: 'ev-q3',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'A statisztika melyik fogalmának felel meg a valószínűségszámításban a valószínűség?',
    options: ['a relatív gyakoriságnak', 'az átlagnak', 'a mediánnak', 'a terjedelemnek'],
    correctAnswer: 0,
    explanation: 'Összetartozó fogalmak: relatív gyakoriság ↔ valószínűség, átlag (súlyozott átlag) ↔ várható érték.'
  },
  {
    id: 'ev-q4',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'A valószínűségszámítás melyik fogalma felel meg a statisztikában az átlagnak (súlyozott átlagnak)?',
    options: ['a várható érték', 'a valószínűség', 'a módusz', 'a relatív gyakoriság'],
    correctAnswer: 0,
    explanation: 'Sok kísérlet átlaga a várható érték körül ingadozik: átlag ↔ várható érték.'
  },
  {
    id: 'ev-q5',
    level: 1,
    questionTypeBadge: 'Méltányos játék',
    question: 'Mikor nevezünk egy játékot méltányosnak (igazságosnak)?',
    options: [
      'ha a játékos nyereményének várható értéke 0',
      'ha a játékos nyerésének valószínűsége 1/2',
      'ha a nyeremény nagyobb a tétnél',
      'ha a legvalószínűbb eredmény a 0 nyeremény'
    ],
    correctAnswer: 0,
    explanation: 'Méltányos a játék, ha hosszú távon egyik fél sem jár jobban: a nyeremény várható értéke 0.'
  },
  {
    id: 'ev-q6',
    level: 1,
    questionTypeBadge: 'Érmedobás',
    question: 'Feldobunk egy érmét. Fej esetén 10 Ft-ot kapunk, írás esetén semmit. Mennyi a nyeremény várható értéke?',
    figure: <CoinsFig labels={['F', 'I']} caption="F: 10 Ft (p = 1/2), I: 0 Ft (p = 1/2)" />,
    options: ['5 Ft', '10 Ft', '0 Ft', '2,5 Ft'],
    correctAnswer: 0,
    explanation: 'E = 10 · 1/2 + 0 · 1/2 = 5 Ft.'
  },
  {
    id: 'ev-q7',
    level: 1,
    questionTypeBadge: 'Sorsjegy',
    question: '100 sorsjegy közül 95 nem nyer, 5 pedig 1000 Ft-ot nyer. Mennyi egy sorsjegy nyereményének várható értéke?',
    figure: <DistFig head="nyeremény" values={['0 Ft', '1000 Ft']} probs={['0,95', '0,05']} />,
    options: ['50 Ft', '500 Ft', '5 Ft', '95 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0,95 · 0 + 0,05 · 1000 = 50 Ft.'
  },
  {
    id: 'ev-q8',
    level: 1,
    questionTypeBadge: 'Tombola',
    question: 'Az iskola 500 tanulója kapott egy-egy tombolát, és 10 szelvényt húznak ki. Mennyi a valószínűsége, hogy egy adott szelvény nyer?',
    options: ['0,02', '0,1', '0,2', '0,98'],
    correctAnswer: 0,
    explanation: 'P(nyer) = 10/500 = 0,02, P(nem nyer) = 490/500 = 0,98.'
  },
  {
    id: 'ev-q9',
    level: 1,
    questionTypeBadge: 'Értelmezés',
    question: 'Mit mutat meg egy kísérlet kimenetelének várható értéke?',
    options: [
      'nagyszámú kísérlet esetén átlagosan milyen eredményt kapunk',
      'melyik a legvalószínűbb eredmény',
      'melyik eredmény fordul elő leggyakrabban egy adott kísérletsorozatban',
      'mekkora a legnagyobb elérhető eredmény'
    ],
    correctAnswer: 0,
    explanation: 'A várható érték a kimenetelek valószínűségekkel súlyozott átlaga: sok kísérlet átlaga körülötte ingadozik. Nem azonos a legvalószínűbb eredménnyel.'
  },
  {
    id: 'ev-q10',
    level: 1,
    questionTypeBadge: 'Eloszlás',
    question: 'Az X lehetséges értékei és valószínűségei a táblázatban láthatók. Mennyi X várható értéke?',
    figure: <DistFig head="X értéke" values={['0', '2', '4']} probs={['0,5', '0,3', '0,2']} />,
    options: ['1,4', '2', '1,2', '3'],
    correctAnswer: 0,
    explanation: 'E = 0 · 0,5 + 2 · 0,3 + 4 · 0,2 = 0 + 0,6 + 0,8 = 1,4.'
  },

  // LEVEL 2
  {
    id: 'ev-q11',
    level: 2,
    questionTypeBadge: 'Sorsjegy',
    question: 'A kereskedő 10 000 sorsjegyet nyomtat: 9800 nem nyer, 180 nyer 500 Ft-ot, 19 nyer 2000 Ft-ot, 1 nyer 10 000 Ft-ot. Mennyi egy sorsjegy nyereményének várható értéke?',
    figure: <DistFig head="nyeremény" values={['0', '500', '2000', '10 000']} probs={['0,98', '0,018', '0,0019', '0,0001']} />,
    options: ['13,8 Ft', '3125 Ft', '12,5 Ft', '138 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0 · 0,98 + 500 · 0,018 + 2000 · 0,0019 + 10 000 · 0,0001 = 9 + 3,8 + 1 = 13,8 Ft. (A 3125 Ft a négy nyeremény egyszerű átlaga lenne.)'
  },
  {
    id: 'ev-q12',
    level: 2,
    questionTypeBadge: 'Méltányos játék',
    question: 'Angéla kockával dob. Ötösnél fizet Panninak 50 Ft-ot, egyébként kap Pannitól 15 Ft-ot. Mennyi Angéla „nyereményének” várható értéke?',
    figure: <DiceFig win={[1, 2, 3, 4, 6]} caption="zöld: Angéla kap 15 Ft-ot; piros: fizet 50 Ft-ot" />,
    options: ['25/6 ≈ 4,17 Ft', '−25/6 ≈ −4,17 Ft', '−17,5 Ft', '0 Ft'],
    correctAnswer: 0,
    explanation: 'E = −50 · 1/6 + 15 · 5/6 = (−50 + 75)/6 = 25/6 ≈ 4,17 Ft. A játék Angélának kedvez.'
  },
  {
    id: 'ev-q13',
    level: 2,
    questionTypeBadge: 'Méltányos játék',
    question: 'Ugyanebben a játékban (ötösnél Angéla fizet 50 Ft-ot, máskor kap 15 Ft-ot) mennyi Panni „nyereményének” várható értéke?',
    options: ['−25/6 ≈ −4,17 Ft', '25/6 ≈ 4,17 Ft', '−65/6 ≈ −10,83 Ft', '0 Ft'],
    correctAnswer: 0,
    explanation: 'Panni nyereménye Angéláénak ellentettje: E = 50 · 1/6 − 15 · 5/6 = −25/6 ≈ −4,17 Ft.'
  },
  {
    id: 'ev-q14',
    level: 2,
    questionTypeBadge: 'Méltányos játék',
    question: 'Mennyit kellene Angélának fizetnie ötös dobásnál, hogy a játék igazságos legyen, ha más dobásnál továbbra is 15 Ft-ot kap?',
    options: ['75 Ft-ot', '50 Ft-ot', '90 Ft-ot', '65 Ft-ot'],
    correctAnswer: 0,
    explanation: '−x · 1/6 + 15 · 5/6 = 0 ⇒ x = 75. Ekkor E = −75/6 + 75/6 = 0.'
  },
  {
    id: 'ev-q15',
    level: 2,
    questionTypeBadge: 'Érmedobás',
    question: 'Feldobunk 3 különböző érmét (20, 50 és 100 Ft-ost). Mennyi a fejek számának várható értéke?',
    figure: <CoinsFig labels={['20', '50', '100']} caption="fejek száma: 0, 1, 2 vagy 3 – E = ?" />,
    options: ['1,5', '2', '1', '3/8'],
    correctAnswer: 0,
    explanation: 'A 8 elemi eseményből 0 fej: 1, 1 fej: 3, 2 fej: 3, 3 fej: 1. E = (0 · 1 + 1 · 3 + 2 · 3 + 3 · 1)/8 = 12/8 = 1,5.'
  },
  {
    id: 'ev-q16',
    level: 2,
    questionTypeBadge: 'Érmedobás',
    question: 'Három érmét feldobva mennyi a valószínűsége, hogy pontosan 2 fejet kapunk?',
    figure: <CoinsFig labels={['?', '?', '?']} caption="8 egyenlően valószínű elemi esemény" />,
    options: ['3/8', '1/4', '1/2', '2/3'],
    correctAnswer: 0,
    explanation: 'FFI, FIF, IFF – a 8 elemi eseményből 3 kedvező, így P = 3/8.'
  },
  {
    id: 'ev-q17',
    level: 2,
    questionTypeBadge: 'Tombola',
    question: '500 tombolaszelvényből 10-et húznak ki, mindegyik nyertes 1000 Ft-os utalványt kap. Mennyi egy szelvény nyereményének várható értéke?',
    figure: <DistFig head="nyeremény" values={['1000 Ft', '0 Ft']} probs={['?', '?']} />,
    options: ['20 Ft', '2 Ft', '200 Ft', '10 Ft'],
    correctAnswer: 0,
    explanation: 'P(1000 Ft) = 10/500 = 0,02, így E = 1000 · 0,02 + 0 · 0,98 = 20 Ft.'
  },
  {
    id: 'ev-q18',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Két szabályos kockával dobunk. Mennyi a dobott számok összegének várható értéke?',
    figure: <DiceFig faces={[3, 5]} caption="két kocka összege: 2, 3, …, 12 – E = ?" />,
    options: ['7', '6', '6,5', '12'],
    correctAnswer: 0,
    explanation: 'A 36 egyenlően valószínű esetet összegezve E = 252/36 = 7 (egyszerűbben: 3,5 + 3,5 = 7).'
  },
  {
    id: 'ev-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó valószínűség',
    question: 'Az X lehetséges értékei 1, 2 és 3. Egy valószínűség hiányzik a táblázatból. Mennyi X várható értéke?',
    figure: <DistFig head="X értéke" values={['1', '2', '3']} probs={['0,2', '0,5', '?']} />,
    options: ['2,1', '1,8', '2', '2,3'],
    correctAnswer: 0,
    explanation: 'A hiányzó valószínűség 1 − 0,2 − 0,5 = 0,3. E = 1 · 0,2 + 2 · 0,5 + 3 · 0,3 = 0,2 + 1 + 0,9 = 2,1.'
  },
  {
    id: 'ev-q20',
    level: 2,
    questionTypeBadge: 'Részvény',
    question: 'Egy részvény ára 4600 Ft. Egy év múlva 0,6 valószínűséggel 18%-kal nő, 0,4 valószínűséggel 5%-kal csökken. Mennyi a jövő évi árfolyam várható értéke?',
    figure: <DistFig head="árfolyam (Ft)" values={['4600 · 1,18', '4600 · 0,95']} probs={['0,6', '0,4']} />,
    options: ['5004,8 Ft', '4899 Ft', '5428 Ft', '4600 Ft'],
    correctAnswer: 0,
    explanation: '4600 · 1,18 = 5428 Ft és 4600 · 0,95 = 4370 Ft. E = 5428 · 0,6 + 4370 · 0,4 = 3256,8 + 1748 = 5004,8 Ft. (4899 Ft a két ár egyszerű átlaga.)'
  },

  // LEVEL 3
  {
    id: 'ev-q21',
    level: 3,
    questionTypeBadge: 'Tombola',
    question: 'Tombolák: 1250 db nem nyer, 200 db 300 Ft-ot, 40 db 600 Ft-ot, 8 db 1500 Ft-ot, 2 db 5000 Ft-ot nyer. Mennyi egy véletlenszerűen választott szelvény nyereményének várható értéke?',
    options: ['≈ 70,67 Ft', '1480 Ft', '≈ 21,2 Ft', '106 Ft'],
    correctAnswer: 0,
    explanation: 'Összesen 1500 szelvény. E = (300 · 200 + 600 · 40 + 1500 · 8 + 5000 · 2)/1500 = 106 000/1500 ≈ 70,67 Ft. (1480 Ft az öt nyereményfajta egyszerű átlaga.)'
  },
  {
    id: 'ev-q22',
    level: 3,
    questionTypeBadge: 'Három kocka',
    question: 'Zsóka három kockával dob, és négypontonként kap egy téglát (pl. 8–11 esetén 2-t). A 216 eset végigszámolásával a kapott téglák számának várható értéke 487/216. Melyik közelítés helyes, és miért nem 10,5 : 4?',
    figure: <DiceFig faces={[2, 4, 5]} caption="összeg 11 ⇒ 2 tégla" />,
    options: [
      '≈ 2,25; a lefelé kerekítés miatt kevesebb, mint 10,5 : 4 = 2,625',
      '≈ 2,625; pontosan 10,5 : 4',
      '≈ 2,25; mert a 10,5 felfelé kerekítve 11, és 11 : 4 ≈ 2,75',
      '≈ 3; mert a legvalószínűbb összeg 10 vagy 11'
    ],
    correctAnswer: 0,
    explanation: '487/216 ≈ 2,25. A téglák száma az összeg 4-gyel osztott egészrésze, és a lefelé kerekítés minden esetben „elvesz” valamennyit, ezért a várható érték kisebb, mint 10,5 : 4 = 2,625.'
  },
  {
    id: 'ev-q23',
    level: 3,
    questionTypeBadge: 'Méltányos játék',
    question: 'Kockajáték: hatos dobásnál W Ft-ot kapsz, minden más dobásnál 20 Ft-ot fizetsz. Mekkora W esetén méltányos a játék?',
    figure: <DiceFig win={[6]} caption="zöld: kapsz W Ft-ot; piros: fizetsz 20 Ft-ot" />,
    options: ['100 Ft', '120 Ft', '20 Ft', '80 Ft'],
    correctAnswer: 0,
    explanation: 'W · 1/6 − 20 · 5/6 = 0 ⇒ W = 100 Ft.'
  },
  {
    id: 'ev-q24',
    level: 3,
    questionTypeBadge: 'Méltányos játék',
    question: 'Két kockával dobsz. Ha az összeg 7, kapsz 50 Ft-ot, egyébként fizetsz 10 Ft-ot. Milyen a játék?',
    figure: <DiceFig faces={[1, 6]} caption="összeg 7: 6 kedvező eset a 36-ból" />,
    options: ['méltányos, E = 0', 'neked kedvez, E ≈ 6,67 Ft', 'ellened szól, E ≈ −1,67 Ft', 'neked kedvez, E = 40 Ft'],
    correctAnswer: 0,
    explanation: 'P(összeg 7) = 6/36 = 1/6. E = 50 · 1/6 − 10 · 5/6 = 50/6 − 50/6 = 0, tehát méltányos.'
  },
  {
    id: 'ev-q25',
    level: 3,
    questionTypeBadge: 'Sorsjegy',
    question: '100 sorsjegyből 5 nyer 1000 Ft-ot, a többi semmit. Egy sorsjegy ára 100 Ft. Mennyi a vásárló nettó nyereségének várható értéke sorsjegyenként?',
    options: ['−50 Ft', '50 Ft', '−100 Ft', '−95 Ft'],
    correctAnswer: 0,
    explanation: 'A nyeremény várható értéke 50 Ft, ebből le kell vonni a 100 Ft-os árat: 50 − 100 = −50 Ft. Sokszor játszva sorsjegyenként átlagosan 50 Ft-ot veszítünk.'
  },
  {
    id: 'ev-q26',
    level: 3,
    questionTypeBadge: 'Ismeretlen érték',
    question: 'Az X értékei 0, 10 és a, valószínűségük 0,5; 0,3 és 0,2. X várható értéke 7. Mennyi az a?',
    figure: <DistFig head="X értéke" values={['0', '10', 'a']} probs={['0,5', '0,3', '0,2']} />,
    options: ['20', '35', '10', '14'],
    correctAnswer: 0,
    explanation: '0 · 0,5 + 10 · 0,3 + a · 0,2 = 7 ⇒ 3 + 0,2a = 7 ⇒ a = 20.'
  },
  {
    id: 'ev-q27',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'Három kockával dobunk. Melyik állítás igaz a dobott számok összegére?',
    options: [
      'A várható érték 10,5, pedig ilyen összeget nem lehet dobni.',
      'A legvalószínűbb összeg a 10,5.',
      'A várható érték 10, mert az a leggyakoribb összeg.',
      '100 dobás átlaga biztosan pontosan 10,5.'
    ],
    correctAnswer: 0,
    explanation: 'E = 3 · 3,5 = 10,5, de az összeg mindig egész. A legvalószínűbb összegek a 10 és a 11 (27/216). 100 dobás átlaga (pl. 10,55) csak közel van a várható értékhez.'
  },
  {
    id: 'ev-q28',
    level: 3,
    questionTypeBadge: 'Méltányos játék',
    question: 'Két érmét dobsz fel. Két fejnél kapsz 40 Ft-ot, egy fejnél fizetsz 10 Ft-ot, nulla fejnél fizetsz x Ft-ot. Mekkora x mellett méltányos a játék?',
    figure: <CoinsFig labels={['?', '?']} caption="2 fej: +40 Ft; 1 fej: −10 Ft; 0 fej: −x Ft" />,
    options: ['20 Ft', '30 Ft', '40 Ft', '10 Ft'],
    correctAnswer: 0,
    explanation: 'P(2 fej) = 1/4, P(1 fej) = 1/2, P(0 fej) = 1/4. E = 40 · 1/4 − 10 · 1/2 − x · 1/4 = 10 − 5 − x/4 = 0 ⇒ x = 20.'
  },
  {
    id: 'ev-q29',
    level: 3,
    questionTypeBadge: 'Oszlopdiagram',
    question: 'Egy 30 fős osztály pontszámai egy 4 pontos feladatban a diagram szerint alakultak (0 pont: 2, 1 pont: 4, 2 pont: 6, 3 pont: 10, 4 pont: 8 tanuló). Mennyi egy véletlenszerűen választott dolgozat pontszámának várható értéke?',
    figure: <BarsFig labels={['0', '1', '2', '3', '4']} counts={[2, 4, 6, 10, 8]} max={10} caption="pontszám" />,
    options: ['2,6', '2', '3', '2,4'],
    correctAnswer: 0,
    explanation: 'E = (0 · 2 + 1 · 4 + 2 · 6 + 3 · 10 + 4 · 8)/30 = 78/30 = 2,6.'
  },
  {
    id: 'ev-q30',
    level: 3,
    questionTypeBadge: 'Sorsjegy',
    question: '1000 sorsjegy közül 1 nyer 20 000 Ft-ot, 10 nyer 1000 Ft-ot, 100 nyer 100 Ft-ot, a többi nem nyer. Mennyi egy sorsjegy nyereményének várható értéke?',
    figure: <DistFig head="nyeremény" values={['20 000', '1000', '100', '0']} probs={['0,001', '0,01', '0,1', '0,889']} />,
    options: ['40 Ft', '30 Ft', '21,1 Ft', '7033 Ft'],
    correctAnswer: 0,
    explanation: 'E = 20 000 · 0,001 + 1000 · 0,01 + 100 · 0,1 + 0 · 0,889 = 20 + 10 + 10 = 40 Ft.'
  }
];

export const ExpectedValueQuiz: React.FC<{
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
      topicId="g11-stat-varhato-ertek-quiz"
      subtopicId="varhato-ertek"
      title="9. Várható érték – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: eloszlástáblázat, várható érték, sorsjegyek, tombolák és méltányos játékok."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={EXPECTED_VALUE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Várható érték',
          items: [
            'E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ',
            'ellenőrzés: p₁ + p₂ + … + pₙ = 1',
            'jele: E (vagy M)',
            'kocka: 3,5; két kocka: 7; három kocka: 10,5'
          ]
        },
        {
          title: 'Lépések',
          items: [
            '1) táblázat: az összes lehetséges kimenetel',
            '2) minden kimenetel valószínűsége (kedvező / összes)',
            '3) érték · valószínűség, majd összeadás',
            'súlyozott átlag, NEM a nyeremények egyszerű átlaga!'
          ]
        },
        {
          title: 'Méltányos játék',
          items: [
            'méltányos: E(nyeremény) = 0',
            'E > 0: a játékosnak kedvez; E < 0: a szervezőnek',
            'nettó nyereség = nyeremény − ár',
            'Angéla: −50 · 1/6 + 15 · 5/6 = 25/6 ≈ 4,17 Ft'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExpectedValueMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ExpectedValueSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ExpectedValueQuiz;
