import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SimultaneousDrawMatcher } from './SimultaneousDrawMatcher';
import { SimultaneousDrawSorter } from './SimultaneousDrawSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const BALL_COLORS: Record<string, { fill: string; stroke: string; label: string }> = {
  red: { fill: '#fb7185', stroke: '#be123c', label: 'piros' },
  blue: { fill: '#38bdf8', stroke: '#0369a1', label: 'kék' },
  yellow: { fill: '#fde047', stroke: '#a16207', label: 'sárga' },
  white: { fill: '#ffffff', stroke: '#475569', label: 'fehér' },
  black: { fill: '#334155', stroke: '#0f172a', label: 'fekete' },
  green: { fill: '#86efac', stroke: '#15803d', label: 'zöld' }
};

/** Urna golyókkal; alatta: „egyszerre k-t húzunk”. */
const UrnFig: React.FC<{ groups: { color: keyof typeof BALL_COLORS; count: number }[]; k: number; caption?: string }> = ({ groups, k, caption }) => {
  const balls = groups.flatMap((g) => Array.from({ length: g.count }, () => g.color));
  const cols = Math.min(8, balls.length);
  const r = 9;
  const step = 22;
  const rows = Math.ceil(balls.length / cols);
  const w = cols * step;
  const x0 = 120 - w / 2 + step / 2;
  const urnBottom = 26 + rows * step + 6;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path
        d={`M ${120 - w / 2 - 8} 12 L ${120 - w / 2 - 8} ${urnBottom - 8} Q ${120 - w / 2 - 8} ${urnBottom} ${120 - w / 2} ${urnBottom} L ${120 + w / 2} ${urnBottom} Q ${120 + w / 2 + 8} ${urnBottom} ${120 + w / 2 + 8} ${urnBottom - 8} L ${120 + w / 2 + 8} 12`}
        fill="#f1f5f9"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      {balls.map((c, i) => (
        <circle key={i} cx={x0 + (i % cols) * step} cy={26 + Math.floor(i / cols) * step} r={r} fill={BALL_COLORS[c].fill} stroke={BALL_COLORS[c].stroke} strokeWidth="1.3" />
      ))}
      <text x="120" y={Math.min(urnBottom + 18, 128)} fontSize="10" textAnchor="middle" fill="#334155">
        {groups.map((g) => `${g.count} ${BALL_COLORS[g.color].label}`).join(', ')}
      </text>
      <text x="120" y={Math.min(urnBottom + 32, 142)} fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        {caption ?? `egyszerre ${k} golyót húzunk`}
      </text>
    </svg>
  );
};

/** Két csoport dobozzal: n elem = m + (n − m), k-t választunk. */
const GroupsFig: React.FC<{ total: string; a: string; b: string; k: string }> = ({ total, a, b, k }) => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="14" y="12" width="212" height="66" rx="10" fill="#ffffff" stroke="#334155" />
    <text x="120" y="28" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      {total}
    </text>
    <rect x="22" y="36" width="94" height="34" rx="7" fill="#fef3c7" stroke="#d97706" />
    <text x="69" y="57" fontSize="10" textAnchor="middle" fill="#92400e">
      {a}
    </text>
    <rect x="124" y="36" width="94" height="34" rx="7" fill="#e0f2fe" stroke="#0284c7" />
    <text x="171" y="57" fontSize="10" textAnchor="middle" fill="#0c4a6e">
      {b}
    </text>
    <text x="120" y="100" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      {k}
    </text>
  </svg>
);

/** Oszlopdiagram a nyári olimpiákról. */
const OlympicsFig: React.FC = () => {
  const data = [
    ['Afrika', 0],
    ['Amerika', 7],
    ['Ausztrália', 2],
    ['Ázsia', 4],
    ['Európa', 16]
  ] as const;
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="22" y1="112" x2="230" y2="112" stroke="#334155" />
      {data.map(([name, c], i) => (
        <g key={name}>
          <rect x={30 + i * 41} y={112 - c * 5.5} width="28" height={c * 5.5} fill="#38bdf8" stroke="#0369a1" />
          <text x={44 + i * 41} y={108 - c * 5.5} fontSize="9" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
            {c}
          </text>
          <text x={44 + i * 41} y="124" fontSize="8" textAnchor="middle" fill="#334155">
            {name}
          </text>
        </g>
      ))}
      <text x="120" y="134" fontSize="8" textAnchor="middle" fill="#475569">
        nyári olimpiák kontinensenként (2021-ig)
      </text>
    </svg>
  );
};

const SIMULTANEOUS_DRAW_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'sd-q1',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi a (10 alatt 3) értéke?',
    options: ['120', '720', '30', '1000'],
    correctAnswer: 0,
    explanation: '(10 alatt 3) = 10 · 9 · 8 / 3! = 720 / 6 = 120. A 720 a sorrendet is figyelembe venné.'
  },
  {
    id: 'sd-q2',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi az (5 alatt 2) értéke?',
    options: ['10', '20', '25', '7'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) = 5 · 4 / 2! = 10.'
  },
  {
    id: 'sd-q3',
    level: 1,
    questionTypeBadge: 'Szimmetria',
    question: 'Melyik egyenlő a (10 alatt 7) értékével?',
    options: ['(10 alatt 3)', '(7 alatt 3)', '(10 alatt 4)', '10 · 9 · 8 · 7'],
    correctAnswer: 0,
    explanation: '7 elem kiválasztása ugyanaz, mint a kimaradó 3 kiválasztása: (10 alatt 7) = (10 alatt 3) = 120.'
  },
  {
    id: 'sd-q4',
    level: 1,
    questionTypeBadge: 'Lottó',
    question: 'Hány lehetséges kimenetele van az ötös lottó sorsolásának (90 számból 5-öt húznak, a sorrend nem számít)?',
    options: ['(90 alatt 5)', '90⁵', '90 · 89 · 88 · 87 · 86', '(85 alatt 5)'],
    correctAnswer: 0,
    explanation: 'Sorrend nélküli kiválasztás: (90 alatt 5) = 43 949 268. A 90 · 89 · 88 · 87 · 86 a sorrendet is figyelembe venné, a 90⁵ ismétlést is megengedne.'
  },
  {
    id: 'sd-q5',
    level: 1,
    questionTypeBadge: 'Összes eset',
    question: 'Az urnából egyszerre 2 golyót húzunk. Hány különböző kimenetel lehetséges (a golyókat megkülönböztetjük)?',
    figure: <UrnFig groups={[{ color: 'red', count: 3 }, { color: 'blue', count: 2 }]} k={2} />,
    options: ['10', '20', '6', '25'],
    correctAnswer: 0,
    explanation: '5 golyóból 2-t választunk, a sorrend nem számít: (5 alatt 2) = 10.'
  },
  {
    id: 'sd-q6',
    level: 1,
    questionTypeBadge: 'Urnamodell',
    question: 'Az urnából egyszerre 2 golyót húzunk. Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <UrnFig groups={[{ color: 'red', count: 3 }, { color: 'blue', count: 2 }]} k={2} />,
    options: ['3/10', '9/25', '3/5', '1/10'],
    correctAnswer: 0,
    explanation: 'Kedvező: (3 alatt 2) = 3, összes: (5 alatt 2) = 10, így p = 3/10. (A 9/25 visszatevéses húzáshoz tartozna.)'
  },
  {
    id: 'sd-q7',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'A p = (m alatt k) / (n alatt k) képletben mit jelent az m?',
    figure: <GroupsFig total="n elem" a="egyik: m db" b="másik: n − m db" k="k elemet választunk" />,
    options: ['az adott tulajdonságú elemek számát', 'az összes elem számát', 'a kiválasztott elemek számát', 'a nem megfelelő elemek számát'],
    correctAnswer: 0,
    explanation: 'n = az összes elem száma, m = az adott tulajdonságú elemek száma, k = a kiválasztott elemek száma.'
  },
  {
    id: 'sd-q8',
    level: 1,
    questionTypeBadge: 'Két csoport',
    question: 'A 28 magyarfaktos közül 15 tizenegyedikes, 13 tizenkettedikes. Két diákot választunk. Mennyi a valószínűsége, hogy mindketten 11.-esek?',
    figure: <GroupsFig total="28 diák" a="11. évf.: 15" b="12. évf.: 13" k="2 diákot választunk" />,
    options: ['5/18', '15/28', '225/784', '13/63'],
    correctAnswer: 0,
    explanation: '(15 alatt 2) / (28 alatt 2) = 105/378 = 5/18 ≈ 0,278.'
  },
  {
    id: 'sd-q9',
    level: 1,
    questionTypeBadge: 'Urnamodell',
    question: 'Egyszerre 2 golyót húzunk. Mennyi a valószínűsége, hogy mindkettő sárga?',
    figure: <UrnFig groups={[{ color: 'red', count: 4 }, { color: 'yellow', count: 6 }]} k={2} />,
    options: ['1/3', '9/25', '3/5', '2/15'],
    correctAnswer: 0,
    explanation: '(6 alatt 2) / (10 alatt 2) = 15/45 = 1/3. (A 2/15 a két piros valószínűsége: 6/45.)'
  },
  {
    id: 'sd-q10',
    level: 1,
    questionTypeBadge: 'Lottó',
    question: 'Körülbelül mennyi a valószínűsége a nulla találatos szelvénynek az ötös lottón?',
    options: ['0,746', '0,944', '0,254', '0,056'],
    correctAnswer: 0,
    explanation: '(85 alatt 5) / (90 alatt 5) = 32 801 517 / 43 949 268 ≈ 0,746. (A 0,944 = 85/90 csak egyetlen szám esetén lenne jó.)'
  },

  // LEVEL 2
  {
    id: 'sd-q11',
    level: 2,
    questionTypeBadge: 'Könyvek',
    question: 'A polcon 10 prózai mű és 4 verseskönyv van. Két könyvet választunk. Mennyi a valószínűsége, hogy mindkettő prózai?',
    figure: <GroupsFig total="14 könyv" a="prózai: 10" b="vers: 4" k="2 könyvet választunk" />,
    options: ['45/91', '25/49', '5/7', '90/91'],
    correctAnswer: 0,
    explanation: '(10 alatt 2) / (14 alatt 2) = 45/91 ≈ 0,495. (A 25/49 = (10/14)² visszatevéses lenne.)'
  },
  {
    id: 'sd-q12',
    level: 2,
    questionTypeBadge: 'Könyvek',
    question: 'A 14 könyvből (10 prózai, 4 vers) kettőt választunk. Mennyi a valószínűsége, hogy egyik sem prózai?',
    options: ['6/91', '4/91', '45/91', '2/7'],
    correctAnswer: 0,
    explanation: 'Mindkettő verseskönyv: (4 alatt 2) / (14 alatt 2) = 6/91 ≈ 0,066.'
  },
  {
    id: 'sd-q13',
    level: 2,
    questionTypeBadge: 'Könyvek',
    question: 'A 14 könyv között 2 Dosztojevszkij-regény van. Két könyvet választunk. Mennyi a valószínűsége, hogy mindkettőt Dosztojevszkij írta?',
    options: ['1/91', '2/91', '1/49', '1/14'],
    correctAnswer: 0,
    explanation: 'Egyetlen kedvező eset van: (2 alatt 2) = 1, így p = 1/91 ≈ 0,011.'
  },
  {
    id: 'sd-q14',
    level: 2,
    questionTypeBadge: 'Könyvek',
    question: 'Két könyvet választunk a 14-ből (10 prózai, közte 2 Dosztojevszkij). Mennyi a valószínűsége, hogy mindkettő prózai, de egyiket sem Dosztojevszkij írta?',
    options: ['4/13', '45/91', '44/91', '8/14'],
    correctAnswer: 0,
    explanation: 'A 8 nem Dosztojevszkij-féle prózai mű közül kell kettő: (8 alatt 2) / (14 alatt 2) = 28/91 = 4/13 ≈ 0,308. (44/91 = 45/91 − 1/91 csak a „mindkettő Dosztojevszkij” esetet hagyná ki.)'
  },
  {
    id: 'sd-q15',
    level: 2,
    questionTypeBadge: 'Két csoport',
    question: 'A 28 faktos közül 13 tizenkettedikes. Két diákot választunk. Mennyi a valószínűsége, hogy mindketten 12.-esek?',
    figure: <GroupsFig total="28 diák" a="11. évf.: 15" b="12. évf.: 13" k="2 diákot választunk" />,
    options: ['13/63', '13/28', '169/784', '5/18'],
    correctAnswer: 0,
    explanation: '(13 alatt 2) / (28 alatt 2) = 78/378 = 13/63 ≈ 0,206.'
  },
  {
    id: 'sd-q16',
    level: 2,
    questionTypeBadge: 'Osztók',
    question: 'Az 1, 2, …, 20 számok közül véletlenszerűen kettőt választunk. Mennyi a valószínűsége, hogy mindkettő osztója a 20-nak?',
    options: ['3/38', '3/10', '9/100', '1/19'],
    correctAnswer: 0,
    explanation: 'A 20 osztói: 1, 2, 4, 5, 10, 20 – 6 db. (6 alatt 2) / (20 alatt 2) = 15/190 = 3/38 ≈ 0,079.'
  },
  {
    id: 'sd-q17',
    level: 2,
    questionTypeBadge: 'Kártya',
    question: 'A 32 lapos magyar kártyában 8 makk van. Három lapot osztanak. Mennyi a valószínűsége, hogy mindegyik makk?',
    figure: <GroupsFig total="32 lap" a="makk: 8" b="nem makk: 24" k="3 lapot osztanak" />,
    options: ['56/4960 ≈ 0,011', '1/64 ≈ 0,016', '3/32 ≈ 0,094', '8/32 = 0,25'],
    correctAnswer: 0,
    explanation: '(8 alatt 3) / (32 alatt 3) = 56/4960 ≈ 0,0113. (Az 1/64 = (1/4)³ visszatevéses lenne.)'
  },
  {
    id: 'sd-q18',
    level: 2,
    questionTypeBadge: 'Kártya',
    question: 'A 32 lapos magyar kártyából (8 makk) 3 lapot osztanak. Mennyi a valószínűsége, hogy egyik sem makk?',
    options: ['≈ 0,408', '≈ 0,422', '≈ 0,75', '≈ 0,989'],
    correctAnswer: 0,
    explanation: 'Mind a 3 lap a 24 nem makk közül jön: (24 alatt 3) / (32 alatt 3) = 2024/4960 ≈ 0,408. (0,422 ≈ 0,75³ visszatevéssel; 0,989 = 1 − P(mind makk).)'
  },
  {
    id: 'sd-q19',
    level: 2,
    questionTypeBadge: 'Urnamodell',
    question: 'Egyszerre 3 golyót húzunk. Mennyi a valószínűsége, hogy mindhárom fehér?',
    figure: <UrnFig groups={[{ color: 'white', count: 5 }, { color: 'black', count: 3 }]} k={3} />,
    options: ['5/28', '125/512', '5/8', '1/56'],
    correctAnswer: 0,
    explanation: '(5 alatt 3) / (8 alatt 3) = 10/56 = 5/28 ≈ 0,179. (125/512 = (5/8)³ visszatevéses lenne; 1/56 a három fekete valószínűsége.)'
  },
  {
    id: 'sd-q20',
    level: 2,
    questionTypeBadge: 'Egymás utáni húzás',
    question: 'Melyik szorzat adja ugyanazt, mint a (15 alatt 2) / (28 alatt 2)?',
    options: ['15/28 · 14/27', '15/28 · 15/28', '15/28 · 13/27', '15/28 + 14/27'],
    correctAnswer: 0,
    explanation: 'Egymás után, visszatevés nélkül húzva: az első 15/28 valószínűséggel 11.-es, utána 27-ből 14 a 11.-es: 15/28 · 14/27 = 5/18 = (15 alatt 2) / (28 alatt 2).'
  },

  // LEVEL 3
  {
    id: 'sd-q21',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Mennyi a valószínűsége, hogy az ötös lottón kihúzott mindegyik szám nagyobb, mint 10?',
    figure: <GroupsFig total="90 szám" a="1–10: 10 db" b="11–90: 80 db" k="5 számot húznak" />,
    options: ['≈ 0,547', '≈ 0,555', '≈ 0,889', '≈ 0,590'],
    correctAnswer: 0,
    explanation: '(80 alatt 5) / (90 alatt 5) = 24 040 016 / 43 949 268 ≈ 0,547. (≈ 0,555 = (8/9)⁵ visszatevéses lenne; 0,889 = 80/90 egyetlen számra.)'
  },
  {
    id: 'sd-q22',
    level: 3,
    questionTypeBadge: 'Vonatjegyek',
    question: 'A 32 jegyből 18 szól a 412-es, 14 a 413-as kocsiba. A jegyeket véletlenszerűen osztják ki. Mennyi a valószínűsége, hogy a 4 barátnő mind a 412-es kocsiba kap jegyet?',
    figure: <GroupsFig total="32 vonatjegy" a="412-es: 18" b="413-as: 14" k="4 barátnő jegye" />,
    options: ['≈ 0,085', '≈ 0,100', '≈ 0,563', '≈ 0,028'],
    correctAnswer: 0,
    explanation: '(18 alatt 4) / (32 alatt 4) = 3060 / 35 960 ≈ 0,085. (0,100 ≈ (18/32)⁴; 0,028 a 413-as kocsihoz tartozik.)'
  },
  {
    id: 'sd-q23',
    level: 3,
    questionTypeBadge: 'Vonatjegyek',
    question: 'Ugyanebben a helyzetben (18 + 14 jegy, 4 barátnő) mennyi a valószínűsége, hogy mind a négyen ugyanabba a kocsiba kapnak jegyet?',
    options: ['≈ 0,113', '≈ 0,085', '≈ 0,0024', '≈ 0,5'],
    correctAnswer: 0,
    explanation: 'A két kizáró eset valószínűsége összeadódik: (3060 + 1001) / 35 960 = 4061 / 35 960 ≈ 0,113.'
  },
  {
    id: 'sd-q24',
    level: 3,
    questionTypeBadge: 'Diagram',
    question: 'A diagram szerint 29 nyári olimpiát rendeztek. Hármat véletlenszerűen kiválasztunk. Mennyi a valószínűsége, hogy mindegyik Európán kívül volt?',
    figure: <OlympicsFig />,
    options: ['≈ 0,078', '≈ 0,090', '≈ 0,448', '≈ 0,0096'],
    correctAnswer: 0,
    explanation: 'Európán kívül 0 + 7 + 2 + 4 = 13 olimpia volt. (13 alatt 3) / (29 alatt 3) = 286/3654 ≈ 0,078. (0,090 ≈ (13/29)³; 0,0096 a „mind Amerikában” valószínűsége.)'
  },
  {
    id: 'sd-q25',
    level: 3,
    questionTypeBadge: 'Diagram',
    question: 'A 29 nyári olimpiából hármat választunk. Mennyi a valószínűsége, hogy mindhármat Amerikában rendezték?',
    figure: <OlympicsFig />,
    options: ['35/3654 ≈ 0,0096', '7/29 ≈ 0,241', '343/24 389 ≈ 0,014', '4/3654 ≈ 0,0011'],
    correctAnswer: 0,
    explanation: '(7 alatt 3) / (29 alatt 3) = 35/3654 ≈ 0,0096. (4/3654 a „mind Ázsiában” eset.)'
  },
  {
    id: 'sd-q26',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'A hatos lottón 45 számból 6-ot húznak. Mennyi a nulla találatos szelvény valószínűsége?',
    figure: <GroupsFig total="45 szám" a="nyerő: 6" b="nem nyerő: 39" k="6 számot jelölünk meg" />,
    options: ['≈ 0,401', '≈ 0,424', '≈ 0,867', '≈ 0,599'],
    correctAnswer: 0,
    explanation: '(39 alatt 6) / (45 alatt 6) = 3 262 623 / 8 145 060 ≈ 0,401. (0,424 ≈ (39/45)⁶; 0,599 a legalább egy találat valószínűsége.)'
  },
  {
    id: 'sd-q27',
    level: 3,
    questionTypeBadge: 'Urnamodell',
    question: 'Az urnából egyszerre 5 golyót húzunk. Mennyi a valószínűsége, hogy mindegyik sárga?',
    figure: <UrnFig groups={[{ color: 'red', count: 4 }, { color: 'yellow', count: 6 }]} k={5} />,
    options: ['6/252 ≈ 0,024', '(3/5)⁵ ≈ 0,078', '5/6 ≈ 0,833', '1/252 ≈ 0,004'],
    correctAnswer: 0,
    explanation: '(6 alatt 5) / (10 alatt 5) = 6/252 ≈ 0,024.'
  },
  {
    id: 'sd-q28',
    level: 3,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Az 1. feladatban az egyenlő kifejezéseket kell összekötni. Melyik binomiális együtthatónak NINCS párja a (10 alatt k) alakúak között (k = 2, 3, 4, 5, 6, 7, 8)?',
    options: ['(10 alatt 5) = 252', '(10 alatt 4) = 210', '(10 alatt 2) = 45', '(10 alatt 7) = 120'],
    correctAnswer: 0,
    explanation: '(10 alatt k) = (10 alatt 10 − k), így a 2–8, 3–7, 4–6 párok egyenlők. A k = 5 önmaga párja, (10 alatt 5) = 252 egyedül marad.'
  },
  {
    id: 'sd-q29',
    level: 3,
    questionTypeBadge: 'Minőségellenőrzés',
    question: '20 termék közül 3 hibás. Véletlenszerűen kiválasztunk 4-et. Mennyi a valószínűsége, hogy egyik sem hibás?',
    figure: <GroupsFig total="20 termék" a="hibás: 3" b="hibátlan: 17" k="4 terméket választunk" />,
    options: ['≈ 0,491', '≈ 0,522', '≈ 0,85', '≈ 0,509'],
    correctAnswer: 0,
    explanation: '(17 alatt 4) / (20 alatt 4) = 2380 / 4845 ≈ 0,491. (0,522 ≈ 0,85⁴ visszatevéssel; 0,509 a „legalább egy hibás” valószínűsége.)'
  },
  {
    id: 'sd-q30',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Az urnából egyszerre 2 golyót húzunk. Mennyi a valószínűsége, hogy legalább az egyik kék?',
    figure: <UrnFig groups={[{ color: 'red', count: 3 }, { color: 'blue', count: 2 }]} k={2} />,
    options: ['7/10', '3/10', '1/10', '16/25'],
    correctAnswer: 0,
    explanation: 'Komplementer: „nincs kék” = mindkettő piros, ennek valószínűsége 3/10. Így P(legalább egy kék) = 1 − 3/10 = 7/10.'
  }
];

export const SimultaneousDrawQuiz: React.FC<{
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
      topicId="g11-stat-egyszerre-huzas-quiz"
      subtopicId="ket-vagy-tobb-elem-egyszerre"
      title="10. Két vagy több elemet húzunk egyszerre – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: binomiális együtthatók, urnamodell, lottó, kártyák és könyvek."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={SIMULTANEOUS_DRAW_QUESTIONS}
      cheatSheets={[
        {
          title: 'Binomiális együttható',
          items: [
            '(n alatt k) = n · (n − 1) · … · (n − k + 1) / k!',
            '(n alatt k) = n! / (k! · (n − k)!)',
            '(n alatt k) = (n alatt n − k)',
            'számológépen: n nCr k; (10 alatt 3) = 120'
          ]
        },
        {
          title: 'Egyszerre húzás',
          items: [
            'összes eset: (n alatt k)',
            'mind a csoportból: (m alatt k) / (n alatt k)',
            'egyik sem: (n − m alatt k) / (n alatt k)',
            'legalább egy: 1 − (n − m alatt k) / (n alatt k)'
          ]
        },
        {
          title: 'Ellenőrzött eredmények',
          items: [
            'lottó, 0 találat: (85 alatt 5) / (90 alatt 5) ≈ 0,746',
            'faktosok: 5/18 és 13/63',
            'könyvek: 45/91, 6/91, 1/91, 4/13',
            'egymás után: 15/28 · 14/27 = 5/18'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SimultaneousDrawMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SimultaneousDrawSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SimultaneousDrawQuiz;
