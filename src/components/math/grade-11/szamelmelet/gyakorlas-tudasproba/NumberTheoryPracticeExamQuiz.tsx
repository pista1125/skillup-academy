import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberTheoryPracticeExamMatcher } from './NumberTheoryPracticeExamMatcher';
import { NumberTheoryPracticeExamSorter } from './NumberTheoryPracticeExamSorter';
import { rightAnglePath } from './NumberTheoryPracticeExamFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Számhalmazok (R ⊃ Q ⊃ Z ⊃ N és az irracionális számok); a vizsgált szám a jobb felső sarokban. */
const SetsFig: React.FC<{ value: string }> = ({ value }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="4" y="4" width="232" height="142" rx="10" fill="#f8fafc" stroke="#94a3b8" />
    <rect x="10" y="26" width="140" height="114" rx="14" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
    <rect x="24" y="46" width="112" height="84" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <rect x="40" y="66" width="80" height="54" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    <rect x="158" y="26" width="72" height="114" rx="14" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
    <text x="16" y="40" fontSize="10" fontWeight="bold" fill="#065f46">Q</text>
    <text x="30" y="60" fontSize="10" fontWeight="bold" fill="#075985">Z</text>
    <text x="46" y="80" fontSize="10" fontWeight="bold" fill="#5b21b6">N</text>
    <text x="194" y="40" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#9f1239">Q*</text>
    <text x="10" y="18" fontSize="9" fill="#475569">R: valós számok</text>
    <text x="194" y="84" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">{value}</text>
    <text x="194" y="106" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#b91c1c">?</text>
  </svg>
);

/** Kitevőtáblázat: sorok címkével és kitevőkkel; a „?” sor a keresett mennyiség. */
const ExpTableFig: React.FC<{ primes: string[]; rows: { label: string; vals: string[] }[] }> = ({ primes, rows }) => {
  const cw = 170 / primes.length;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <rect x="4" y="4" width="232" height="142" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      <text x="34" y="24" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">prím</text>
      {primes.map((p, i) => (
        <text key={p} x={64 + cw * i + cw / 2} y="24" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a">{p}</text>
      ))}
      {rows.map((r, j) => (
        <g key={r.label}>
          <rect x="10" y={32 + j * 28} width="220" height="24" rx="5" fill={j % 2 ? '#ecfdf5' : '#f8fafc'} />
          <text x="34" y={48 + j * 28} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#065f46">{r.label}</text>
          {r.vals.map((v, i) => (
            <text key={i} x={64 + cw * i + cw / 2} y={48 + j * 28} fontSize="12" fontWeight="bold" textAnchor="middle" fill={v === '?' ? '#b91c1c' : '#0f172a'}>{v}</text>
          ))}
        </g>
      ))}
      <text x="120" y="142" fontSize="9" textAnchor="middle" fill="#64748b">a táblázatban a prímtényezők kitevői</text>
    </svg>
  );
};

/** Számjegydobozok ismeretlen jegyekkel (betűk sárgával). */
const DigitsFig: React.FC<{ digits: string; note: string }> = ({ digits, note }) => {
  const ds = digits.split('');
  const w = 32;
  const x0 = 120 - (ds.length * (w + 4)) / 2;
  return (
    <svg viewBox="0 0 240 110" className={FIG_CLASS}>
      <rect x="4" y="4" width="232" height="102" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {ds.map((d, i) => {
        const unknown = /[A-Z]/.test(d);
        return (
          <g key={i}>
            <rect x={x0 + i * (w + 4)} y="18" width={w} height="40" rx="7" fill={unknown ? '#fef3c7' : '#ecfdf5'} stroke={unknown ? '#d97706' : '#059669'} strokeWidth="1.5" />
            <text x={x0 + i * (w + 4) + w / 2} y="45" fontSize="18" fontWeight="bold" textAnchor="middle" fill={unknown ? '#92400e' : '#065f46'}>{d}</text>
          </g>
        );
      })}
      <text x="120" y="88" fontSize="11" textAnchor="middle" fill="#334155">{note}</text>
    </svg>
  );
};

/** Helyiérték-táblázat egy n alapú számhoz. */
const PlaceValueFig: React.FC<{ base: number; digits: string }> = ({ base, digits }) => {
  const ds = digits.split('');
  const w = Math.min(46, 200 / ds.length);
  const x0 = 120 - (ds.length * w) / 2;
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return (
    <svg viewBox="0 0 240 130" className={FIG_CLASS}>
      <rect x="4" y="4" width="232" height="122" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {ds.map((d, i) => {
        const e = ds.length - 1 - i;
        return (
          <g key={i}>
            <rect x={x0 + i * w} y="20" width={w} height="30" fill="#e0f2fe" stroke="#0284c7" />
            <text x={x0 + i * w + w / 2} y="40" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#075985">
              {base}{String(e).split('').map((c) => SUP[Number(c)]).join('')}
            </text>
            <rect x={x0 + i * w} y="50" width={w} height="34" fill="#ffffff" stroke="#0284c7" />
            <text x={x0 + i * w + w / 2} y="73" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#0f172a">{d}</text>
          </g>
        );
      })}
      <text x="120" y="110" fontSize="11" textAnchor="middle" fill="#334155">{base}-es számrendszer – tízesben: ?</text>
    </svg>
  );
};

/** Ismételt maradékos osztás, a maradékok helyén „?”. */
const LadderFig: React.FC<{ n: number; base: number }> = ({ n, base }) => {
  const rows: number[] = [];
  let m = n;
  while (m > 0) {
    rows.push(m);
    m = Math.floor(m / base);
  }
  return (
    <svg viewBox="0 0 240 160" className={FIG_CLASS}>
      <rect x="4" y="4" width="232" height="152" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {rows.map((r, i) => (
        <g key={i}>
          <text x="90" y={24 + i * (130 / rows.length)} fontSize="12" textAnchor="end" fill="#0f172a">{r}</text>
          <text x="100" y={24 + i * (130 / rows.length)} fontSize="12" fill="#64748b">: {base}</text>
          <text x="150" y={24 + i * (130 / rows.length)} fontSize="12" fontWeight="bold" fill="#b91c1c">?</text>
        </g>
      ))}
      <text x="190" y="80" fontSize="10" textAnchor="middle" fill="#475569">maradékok</text>
      <text x="190" y="94" fontSize="10" textAnchor="middle" fill="#475569">alulról felfelé</text>
    </svg>
  );
};

/** Ismétlődő látogatások (napokban), közös nap: ? */
const CyclesFig: React.FC<{ cycles: number[]; note: string }> = ({ cycles, note }) => {
  const colors = ['#059669', '#0284c7', '#7c3aed'];
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      <rect x="4" y="4" width="232" height="132" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {cycles.map((c, j) => (
        <g key={c}>
          <text x="12" y={30 + j * 30} fontSize="10" fontWeight="bold" fill={colors[j]}>{c} naponta</text>
          <line x1="70" y1={26 + j * 30} x2="220" y2={26 + j * 30} stroke="#e2e8f0" strokeWidth="2" />
          {Array.from({ length: Math.floor(100 / c) + 1 }, (_, k) => (
            <circle key={k} cx={70 + (k * c * 150) / 100} cy={26 + j * 30} r="3.5" fill={colors[j]} />
          ))}
        </g>
      ))}
      <text x="120" y="126" fontSize="10" textAnchor="middle" fill="#334155">{note}</text>
    </svg>
  );
};

/** Négyzetrácsos alakzat „?” sorral és oszloppal. */
const FormationFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="4" y="4" width="232" height="142" rx="10" fill="#ffffff" stroke="#cbd5e1" />
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 11 }, (_, c) => <circle key={`${r}-${c}`} cx={30 + c * 16} cy={22 + r * 16} r="4.5" fill="#0284c7" />)
    )}
    <text x="120" y="122" fontSize="11" textAnchor="middle" fill="#334155">soronként 11 fő, a sorok száma: ?</text>
    <text x="120" y="138" fontSize="10" textAnchor="middle" fill="#64748b">2-, 3-, 4-, 5-, 6-osával 1 fő kimarad</text>
  </svg>
);

/** Dominó (2-6) pöttyökkel. */
const DominoFig: React.FC = () => {
  const pip = (cx: number, cy: number, n: number) => {
    const map: Record<number, [number, number][]> = {
      2: [
        [-12, -12],
        [12, 12]
      ],
      6: [
        [-12, -14],
        [-12, 0],
        [-12, 14],
        [12, -14],
        [12, 0],
        [12, 14]
      ]
    };
    return map[n].map(([dx, dy], i) => <circle key={`${cx}-${i}`} cx={cx + dx} cy={cy + dy} r="5" fill="#0f172a" />);
  };
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <rect x="50" y="20" width="140" height="70" rx="12" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      <line x1="120" y1="26" x2="120" y2="84" stroke="#0f172a" strokeWidth="2" />
      {pip(85, 55, 2)}
      {pip(155, 55, 6)}
      <text x="120" y="110" fontSize="11" textAnchor="middle" fill="#334155">a 2-6-os dominó: 2 · 6 = 12 (nem prím)</text>
    </svg>
  );
};

/** Téglalap átlóval. */
const RectDiagFig: React.FC = () => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    <rect x="40" y="30" width="160" height="70" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
    <line x1="40" y1="100" x2="200" y2="30" stroke="#b91c1c" strokeWidth="2" />
    <text x="120" y="118" fontSize="12" textAnchor="middle" fill="#0f172a">12</text>
    <text x="210" y="70" fontSize="12" fill="#0f172a">5</text>
    <text x="112" y="60" fontSize="14" fontWeight="bold" fill="#b91c1c">?</text>
  </svg>
);

/** A Theodorus-spirál első három háromszöge (derékszög: negyedkörív ponttal). */
const SpiralFig: React.FC = () => {
  const O = { x: 90, y: 110 };
  const u = 50;
  const pts = [{ x: O.x + u, y: O.y }];
  for (let i = 0; i < 3; i++) {
    const p = pts[i];
    const dx = p.x - O.x;
    const dy = p.y - O.y;
    const len = Math.hypot(dx, dy);
    pts.push({ x: p.x + (dy / len) * u, y: p.y - (dx / len) * u });
  }
  const labels = ['√2', '√3', '?'];
  return (
    <svg viewBox="0 0 240 170" className={FIG_CLASS}>
      {pts.slice(0, 3).map((p, i) => {
        const q = pts[i + 1];
        const ra = rightAnglePath(p, O, q, 9);
        return (
          <g key={i}>
            <polygon points={`${O.x},${O.y} ${p.x},${p.y} ${q.x},${q.y}`} fill={i % 2 ? '#ecfdf5' : '#e0f2fe'} stroke="#0f766e" strokeWidth="1.5" />
            <path d={ra.d} fill="none" stroke="#0f766e" strokeWidth="1" />
            <circle cx={ra.dot.x} cy={ra.dot.y} r="1.6" fill="#0f766e" />
            <text x={(p.x + q.x) / 2 + (q.x > O.x ? 8 : -8)} y={(p.y + q.y) / 2} fontSize="10" textAnchor="middle" fill="#334155">1</text>
            <text x={(O.x + q.x) / 2 - 6} y={(O.y + q.y) / 2 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill={labels[i] === '?' ? '#b91c1c' : '#9f1239'}>{labels[i]}</text>
          </g>
        );
      })}
      <text x={(O.x + pts[0].x) / 2} y={O.y + 14} fontSize="10" textAnchor="middle" fill="#334155">1</text>
    </svg>
  );
};

type Lvl = 1 | 2 | 3;
const q = (
  id: number,
  level: Lvl,
  badge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({
  id: `ntpe-q${id}`,
  level,
  questionTypeBadge: badge,
  question,
  ...(figure ? { figure } : {}),
  options,
  correctAnswer: 0,
  explanation
});

const P5 = ['2', '3', '5', '7', '11'];

const NUMBER_THEORY_EXAM_QUESTIONS: QuizQuestion[] = [
  // ───────────── LEVEL 1 ─────────────
  q(1, 1, 'Számhalmazok', 'Melyik a legszűkebb számhalmaz, amelynek a −12/4 eleme?', ['az egész, de nem természetes számok', 'a természetes számok', 'a racionális, de nem egész számok', 'az irracionális számok'], '−12/4 = −3, egész szám, de negatív, így nem természetes.', <SetsFig value="−12/4" />),
  q(2, 1, 'Irracionális szám', 'Melyik szám irracionális?', ['√50', '√49', '0,3̇', '22/7'], '√49 = 7, a 0,3̇ = 1/3 és a 22/7 is racionális; √50 = 5√2 nem írható fel két egész szám hányadosaként.'),
  q(3, 1, 'Tizedes tört', 'Melyik tört tizedes tört alakja véges?', ['21/28', '5/6', '4/9', '17/11'], '21/28 = 3/4, a nevező 2², ezért véges: 0,75. A többi egyszerűsített nevezőjében 3 vagy 11 is van.'),
  q(4, 1, 'Zártság', 'Melyik alapműveletre NEM zárt az egész számok halmaza?', ['az osztásra', 'az összeadásra', 'a kivonásra', 'a szorzásra'], 'Két egész szám hányadosa nem mindig egész, pl. 3 : (−2) = −1,5.'),
  q(5, 1, 'Osztók', 'Hány pozitív osztója van a 12-nek?', ['6', '4', '5', '12'], 'A 12 osztói: 1, 2, 3, 4, 6, 12 – összesen 6. (12 = 2² · 3, (2 + 1)(1 + 1) = 6.)'),
  q(6, 1, 'Prímszám', 'Melyik szám prímszám?', ['37', '51', '91', '1'], '51 = 3 · 17, 91 = 7 · 13, az 1 pedig nem prím (csak egy osztója van). A 37-nek pontosan két osztója van.'),
  q(7, 1, 'Prímszám', 'Melyik állítás igaz az 1-re?', ['se nem prím, se nem összetett', 'prímszám', 'összetett szám', 'minden prímszámnak többszöröse'], 'Az 1-nek egyetlen pozitív osztója van, ezért se nem prím (pontosan 2 osztó), se nem összetett (2-nél több osztó).'),
  q(8, 1, 'Prímtényezők', 'Melyik a 360 prímtényezős felbontása?', ['2³ · 3² · 5', '2² · 3² · 10', '2³ · 3 · 15', '2⁴ · 3² · 5'], '360 = 8 · 45 = 2³ · 3² · 5. A 10 és a 15 nem prím, a 2⁴ · 3² · 5 = 720.'),
  q(9, 1, 'Oszthatóság 4-gyel', 'Melyik szám osztható 4-gyel?', ['13 516', '13 518', '12 342', '10 506'], 'Az utolsó két jegyből álló szám dönt: 16 osztható 4-gyel, a 18, 42 és 06 nem.'),
  q(10, 1, 'Oszthatóság 9-cel', 'Melyik szám osztható 9-cel?', ['11 385', '11 386', '12 345', '20 701'], 'A számjegyek összege: 1 + 1 + 3 + 8 + 5 = 18, ami osztható 9-cel. A többinél 19, 15, 10.'),
  q(11, 1, 'Oszthatóság 25-tel', 'Melyik szám osztható 25-tel?', ['4175', '4155', '4120', '4105'], 'Az utolsó két jegy 00, 25, 50 vagy 75 kell legyen: csak a 4175 ilyen.'),
  q(12, 1, 'Ismeretlen jegy', 'Mit írhatunk az a helyére, hogy az 57a háromjegyű szám osztható legyen 5-tel?', ['0-t vagy 5-öt', 'csak 5-öt', '0-t, 2-t, 4-et, 6-ot vagy 8-at', 'csak 0-t'], 'Egy szám akkor osztható 5-tel, ha utolsó jegye 0 vagy 5.', <DigitsFig digits="57A" note="5 | 57A – mi lehet A?" />),
  q(13, 1, 'Oszthatóság 11-gyel', 'Osztható-e az 572 11-gyel?', ['igen, mert 5 − 7 + 2 = 0', 'nem, mert 5 + 7 + 2 = 14', 'nem, mert páros szám', 'csak akkor, ha 9-cel is osztható'], 'A váltakozó előjelű számjegyösszeg 0, ami osztható 11-gyel: 572 = 11 · 52.'),
  q(14, 1, 'LNKO', 'Mennyi (12; 18), azaz a 12 és a 18 legnagyobb közös osztója?', ['6', '36', '3', '2'], '12 = 2² · 3, 18 = 2 · 3²; a közös prímtényezők a kisebbik kitevőn: 2 · 3 = 6.'),
  q(15, 1, 'LKKT', 'Mennyi [12; 18], azaz a 12 és a 18 legkisebb közös többszöröse?', ['36', '216', '6', '72'], 'Minden prímtényező a nagyobbik kitevőn: 2² · 3² = 36. (216 = 12 · 18 csak egy közös többszörös.)'),
  q(16, 1, 'LNKO · LKKT', 'Két pozitív egész szám szorzata 240, legnagyobb közös osztójuk 4. Mennyi a legkisebb közös többszörösük?', ['60', '960', '236', '120'], '(a; b) · [a; b] = a · b, így [a; b] = 240 : 4 = 60.'),
  q(17, 1, 'Relatív prímek', 'Melyik számpár relatív prím?', ['8 és 15', '9 és 21', '14 és 35', '12 és 30'], '8 = 2³ és 15 = 3 · 5, nincs közös prímtényező, LNKO = 1. A többi párnál 3, 7, illetve 6 a közös osztó.'),
  q(18, 1, 'Tagadás', 'Melyik a „Minden prímszám páratlan.” kijelentés tagadása?', ['Van olyan prímszám, amely páros.', 'Minden prímszám páros.', 'Nincs páratlan prímszám.', 'Van olyan prímszám, amely páratlan.'], 'A „minden … igaz” tagadása: „van olyan, amelyre nem igaz”. (A tagadás igaz, hiszen a 2 páros prím.)'),
  q(19, 1, 'Logikai érték', 'p: „A 7 prímszám.”, q: „A 9 prímszám.” Mi a „p és q” logikai értéke?', ['hamis', 'igaz', 'nem kijelentés', 'nem dönthető el'], 'Az „és” kapcsolat csak akkor igaz, ha mindkét tag igaz; q hamis (9 = 3 · 3), így „p és q” hamis.'),
  q(20, 1, 'Megfordítás', 'Mi a megfordítása: „Ha egy szám osztható 10-zel, akkor osztható 5-tel.”?', ['Ha egy szám osztható 5-tel, akkor osztható 10-zel.', 'Ha egy szám nem osztható 10-zel, akkor nem osztható 5-tel.', 'Egy szám osztható 10-zel és 5-tel.', 'Ha egy szám nem osztható 5-tel, akkor nem osztható 10-zel.'], 'A megfordításban a feltétel és a következmény helyet cserél. (Ez a megfordítás hamis: 15.)'),
  q(21, 1, 'Számrendszer', 'Mennyi az 1201₃ hármas számrendszerbeli szám tízes számrendszerben?', ['46', '37', '50', '1201'], '1 · 27 + 2 · 9 + 0 · 3 + 1 · 1 = 46.', <PlaceValueFig base={3} digits="1201" />),
  q(22, 1, 'Számrendszer', 'Melyik az 53 kettes számrendszerbeli alakja?', ['110101₂', '101011₂', '110011₂', '111001₂'], '53 = 32 + 16 + 4 + 1 = 110101₂. (101011₂ = 43, 110011₂ = 51, 111001₂ = 57.)', <LadderFig n={53} base={2} />),
  q(23, 1, 'Számjegyek', 'Hány különböző számjegyre van szükség a nyolcas számrendszerben?', ['8', '7', '9', '10'], 'Minden számrendszerben annyi számjegy kell, amennyi az alapszám: 0, 1, …, 7.'),
  q(24, 1, 'Számjegyek', 'A tizenkettes számrendszerben melyik számot jelöli a B számjegy?', ['11-et', '12-t', '10-et', '2-t'], 'A tizenkettes számrendszerben a 9 utáni jegyek: A = 10, B = 11.'),
  q(25, 1, 'Számrendszer', 'Bence 12-es számrendszerben 943₁₂ bonbont számolt (9 karton, 4 díszdoboz, 3 bonbon). Hány bonbon ez tízes számrendszerben?', ['1347', '943', '1136', '1563'], '9 · 144 + 4 · 12 + 3 = 1296 + 48 + 3 = 1347. (1136 = 9 · 121 + 4 · 11 + 3 – rossz alapszám.)', <PlaceValueFig base={12} digits="943" />),
  q(26, 1, 'Szakaszos tört', 'Melyik közönséges tört egyenlő a 0,4̇ = 0,444… számmal?', ['4/9', '4/10', '2/5', '4/99'], 'A = 0,4̇; 10A = 4,4̇; 10A − A = 4, A = 4/9. (4/99 = 0,0̇4̇.)'),
  q(27, 1, 'Számrendszer', 'Melyik a legnagyobb háromjegyű szám a kettes számrendszerben, tízes számrendszerben felírva?', ['7', '8', '111', '6'], '111₂ = 4 + 2 + 1 = 7; a 8 már 1000₂, négyjegyű.'),
  q(28, 1, 'Osztók', 'Melyik szám NEM osztója a 36-nak?', ['8', '9', '12', '18'], '36 = 2² · 3²; a 8 = 2³ nem osztója, mert a 36-ban a 2 kitevője csak 2.'),
  q(29, 1, 'Prímszámok', 'Melyik állítás igaz?', ['A 2 az egyetlen páros prímszám.', 'A 9 prímszám.', 'Az 1 prímszám.', 'Véges sok prímszám van.'], 'Minden 2-nél nagyobb páros szám osztható 2-vel, így legalább 3 osztója van. Végtelen sok prím van, az 1 és a 9 nem prím.'),
  q(30, 1, 'Racionális szám', 'Melyik szám racionális?', ['√(16/25)', '√8', 'π', '√3 + 1'], '√(16/25) = 4/5 = 0,8 racionális. A √8, π és √3 + 1 irracionális.'),

  // ───────────── LEVEL 2 ─────────────
  q(31, 2, 'Oszthatóság', 'Mely 30-nál kisebb n természetes számokra teljesül, hogy 9 | 3471 − 2n?', ['3; 12; 21', '6; 15; 24', '1; 10; 19', 'csak a 3-ra'], '3471 számjegyösszege 15, kilences maradéka 6, így 2n maradéka is 6 kell legyen: n = 3, 12, 21 (pl. 3471 − 6 = 3465, számjegyösszeg 18).'),
  q(32, 2, 'Oszthatóság', 'Mely 30-nál kisebb n természetes számokra teljesül, hogy 4 | 132 457 + n?', ['3; 7; 11; 15; 19; 23; 27', '1; 5; 9; 13; 17; 21; 25; 29', '0; 4; 8; 12; 16; 20; 24; 28', 'csak a 3-ra'], 'Az 57 négyes maradéka 1, ezért n négyes maradéka 3 kell legyen.'),
  q(33, 2, 'Oszthatóság', 'Mely 30-nál kisebb n természetes számokra teljesül, hogy 5 | 1516 + 7n?', ['2; 7; 12; 17; 22; 27', '3; 8; 13; 18; 23; 28', '4; 9; 14; 19; 24; 29', '0; 5; 10; 15; 20; 25'], '1516 ötös maradéka 1, a 7n maradéka 4 kell legyen: 7 · 2 = 14 → n ötös maradéka 2.'),
  q(34, 2, 'Ismeretlen jegy', 'Mit írhatunk a B helyére, hogy a 3A407B hatjegyű szám osztható legyen 4-gyel?', ['2-t vagy 6-ot (A bármi lehet)', '0-t, 4-et vagy 8-at', 'csak 2-t', '2-t, 4-et, 6-ot vagy 8-at'], 'Az utolsó két jegy 7B: a 72 és a 76 osztható 4-gyel. Az A nem befolyásolja a 4-gyel való oszthatóságot.', <DigitsFig digits="3A407B" note="4 | 3A407B – mi lehet B?" />),
  q(35, 2, 'LNKO', 'K = 2⁴ · 3 · 5 és L = 2² · 3³ · 7. Mennyi (K; L)?', ['12', '432', '4', '60'], 'A közös prímtényezők a kisebbik kitevőn: 2² · 3 = 12.', <ExpTableFig primes={['2', '3', '5', '7']} rows={[{ label: 'K', vals: ['4', '1', '1', '0'] }, { label: 'L', vals: ['2', '3', '0', '1'] }, { label: '(K; L)', vals: ['?', '?', '?', '?'] }]} />),
  q(36, 2, 'LKKT', 'K = 2⁴ · 3 · 5 és L = 2² · 3³ · 7. Mennyi [K; L]?', ['15 120', '420', '432', '181 440'], 'Minden prímtényező a nagyobbik kitevőn: 2⁴ · 3³ · 5 · 7 = 15 120. (181 440 = K · L.)', <ExpTableFig primes={['2', '3', '5', '7']} rows={[{ label: 'K', vals: ['4', '1', '1', '0'] }, { label: 'L', vals: ['2', '3', '0', '1'] }, { label: '[K; L]', vals: ['?', '?', '?', '?'] }]} />),
  q(37, 2, 'Négyzetszám', 'L = 2² · 3³ · 7. Melyik M-mel szorozva kapunk négyzetszámot?', ['M = 3 · 7', 'M = 2 · 3 · 7', 'M = 3', 'M = 7'], 'Négyzetszám prímtényezős alakjában minden kitevő páros: L · 21 = 2² · 3⁴ · 7² = (2 · 3² · 7)².'),
  q(38, 2, 'LKKT', 'Három ismerős közül az egyik 45, a másik 18, a harmadik 30 naponta megy a fürdőbe. Ma együtt voltak. Legkorábban hány nap múlva találkoznak újra?', ['90', '270', '3', '180'], '45 = 3² · 5, 18 = 2 · 3², 30 = 2 · 3 · 5 ⇒ [45; 18; 30] = 2 · 3² · 5 = 90.', <CyclesFig cycles={[45, 18, 30]} note="az első közös nap: ? nap múlva" />),
  q(39, 2, 'LKKT', 'A három ismerős szombaton találkozott, és 90 nap múlva találkoznak újra. A hét melyik napján lesz ez?', ['pénteken', 'szombaton', 'csütörtökön', 'vasárnap'], '90 = 12 · 7 + 6, így 12 teljes hét után még 6 nap: a szombat után 6 nappal péntek van.'),
  q(40, 2, 'LNKO', 'A raktárban 2100 doboz csempe, 450 léc és 735 zsák cement van. Legfeljebb hány lerakatba oszthatók szét úgy, hogy mindenhová ugyanannyi jusson mindegyikből?', ['15', '5', '105', '30'], '2100 = 2² · 3 · 5² · 7, 450 = 2 · 3² · 5², 735 = 3 · 5 · 7² ⇒ LNKO = 3 · 5 = 15 (140 doboz, 30 léc, 49 zsák).'),
  q(41, 2, 'Osztók száma', 'Hány pozitív osztója van a 360 = 2³ · 3² · 5 számnak?', ['24', '6', '30', '12'], 'Az osztók száma (3 + 1) · (2 + 1) · (1 + 1) = 4 · 3 · 2 = 24.'),
  q(42, 2, 'Összetett osztó', 'Melyik szám osztható 6-tal és 8-cal is, de 48-cal NEM?', ['24', '96', '48', '36'], '[6; 8] = 24, ami osztható 6-tal és 8-cal, de 48-cal nem. A 36 nem osztható 8-cal, a 48 és 96 osztható 48-cal.'),
  q(43, 2, 'Maradékok', 'p = 86 420 és q = 13 579. Mennyi a p + q ötös maradéka (az összeadás elvégzése nélkül)?', ['4', '0', '1', '3'], 'p ötös maradéka 0 (0-ra végződik), q-é 4 (9-re végződik), így az összegé 0 + 4 = 4.'),
  q(44, 2, 'Maradékok', 'p = 86 420 és q = 13 579. Mennyi a p · q hármas maradéka (a szorzás elvégzése nélkül)?', ['2', '1', '0', 'számolás nélkül nem határozható meg'], 'p számjegyösszege 20 → maradék 2; q számjegyösszege 25 → maradék 1. A szorzat maradéka 2 · 1 = 2.'),
  q(45, 2, 'Szakaszos tört', 'Melyik közönséges tört egyenlő a 0,3̇6̇ = 0,3636… számmal?', ['4/11', '9/25', '2/5', '3/11'], 'A = 0,3̇6̇; 100A − A = 36, A = 36/99 = 4/11.'),
  q(46, 2, 'Szakaszos tört', 'Melyik tört egyenlő a 2,13̇2̇ = 2,13232… számmal?', ['2111/990', '2132/999', '211/99', '2111/999'], '1000A = 2132,3̇2̇ és 10A = 21,3̇2̇, így 990A = 2111. (211/99 = 2,1̇3̇ lenne.)'),
  q(47, 2, 'Tizedes tört', 'Melyik tört tizedes tört alakja végtelen szakaszos?', ['25/15', '45/72', '39/52', '21/16'], '25/15 = 5/3, a nevezőben 3 van. 45/72 = 5/8, 39/52 = 3/4, 21/16 nevezőjében csak a 2 szerepel.'),
  q(48, 2, 'Számrendszer', 'Mennyi a 11021₃ szám tízes számrendszerben?', ['115', '109', '124', '97'], '1 · 81 + 1 · 27 + 0 · 9 + 2 · 3 + 1 = 115.', <PlaceValueFig base={3} digits="11021" />),
  q(49, 2, 'Számrendszer', 'Melyik a 115 kettes számrendszerbeli alakja?', ['1110011₂', '1100111₂', '1011011₂', '1110101₂'], '115 = 64 + 32 + 16 + 2 + 1 = 1110011₂. (1100111₂ = 103, 1011011₂ = 91, 1110101₂ = 117.)', <LadderFig n={115} base={2} />),
  q(50, 2, 'Alapszám', 'Melyik számrendszerben igaz, hogy 16 · 5 = 106?', ['a 8-asban', 'a 7-esben', 'a 9-esben', 'a 6-osban'], 'n alapnál (n + 6) · 5 = n² + 6 ⇒ n² − 5n − 24 = 0 ⇒ n = 8 (a 6-os jegy miatt n > 6). Ellenőrzés: 14 · 5 = 70 = 64 + 6.'),
  q(51, 2, 'Számrendszer', 'Hány háromjegyű szám van a hármas számrendszerben?', ['18', '27', '26', '9'], 'A legkisebb 100₃ = 9, a legnagyobb 222₃ = 26: 26 − 9 + 1 = 18. (Másképp: 2 · 3 · 3, mert az első jegy nem lehet 0.)'),
  q(52, 2, 'Igaz / hamis', 'Igaz-e: „Ha egy természetes szám osztható 6-tal és 10-zel, akkor osztható 60-nal.”?', ['hamis, pl. a 30', 'igaz, mert 6 · 10 = 60', 'igaz, mert [6; 10] = 60', 'hamis, pl. a 120'], '[6; 10] = 30, így csak 30 | n következik. A 30 osztható 6-tal és 10-zel, de 60-nal nem. (A 120 osztható 60-nal, nem ellenpélda.)'),
  q(53, 2, 'Következtetés', 'Ha 3 | b és 7 | b, akkor melyik következtetés helyes?', ['21 | b', '10 | b', '4 | b', '63 | b'], 'A 3 és a 7 relatív prímek, így szorzatukkal is osztható b. A 63 = 3² · 7-tel nem feltétlenül (pl. b = 21).'),
  q(54, 2, 'ababab', 'Melyik szám osztója minden ababab alakú hatjegyű számnak?', ['7', '9', '11', '101'], 'ababab = ab · 10 101 és 10 101 = 3 · 7 · 13 · 37, ezért 7 mindig osztó; 9, 11, 101 nem osztója a 10 101-nek.'),
  q(55, 2, 'Prímek', 'Mennyi a 20-nál kisebb pozitív prímszámok összege?', ['77', '75', '60', '78'], '2 + 3 + 5 + 7 + 11 + 13 + 17 + 19 = 77 – páratlan.'),
  q(56, 2, 'Prímek', 'Mennyi az első 10 prímszám összege?', ['129', '100', '127', '158'], '2 + 3 + 5 + 7 + 11 + 13 + 17 + 19 + 23 + 29 = 129 – páratlan, mert egyetlen páros tag van (a 2).'),
  q(57, 2, 'Tizedes tört', 'A 12/A törtben A egyjegyű pozitív egész. Mely A-kra lesz a tört tizedes tört alakja végtelen szakaszos?', ['7 és 9', '3, 7 és 9', 'csak 7', '6, 7 és 9'], '12/3 = 4 és 12/6 = 2 egész; 12/9 = 4/3 és 12/7 nevezőjében 3, illetve 7 van, a többi A-ra véges.'),
  q(58, 2, 'Logikai érték', 'p: „53 = 110101₂.”, q: „A hármas számrendszerben 27 háromjegyű szám van.” Mi a „p vagy q”, illetve a „p és q” logikai értéke?', ['p vagy q: igaz; p és q: hamis', 'mindkettő igaz', 'mindkettő hamis', 'p vagy q: hamis; p és q: igaz'], 'p igaz, q hamis (csak 18 ilyen szám van). A „vagy” igaz, ha legalább az egyik igaz; az „és” csak akkor, ha mindkettő.'),
  q(59, 2, 'Racionális szám', 'Melyik kifejezés értéke racionális?', ['√2 · √8', '√2 + √8', '√2 · √3', 'π − 3'], '√2 · √8 = √16 = 4. A √2 + √8 = 3√2, √6 és π − 3 irracionális.'),
  q(60, 2, 'Számhalmazok', 'Melyik legszűkebb számhalmaz eleme az 5 és 12 egység oldalú téglalap átlójának hossza?', ['a természetes számoké', 'az irracionális számoké', 'a racionális, de nem egész számoké', 'az egész, de nem természetes számoké'], 'Pitagorasz-tétellel: √(5² + 12²) = √169 = 13, természetes szám.', <RectDiagFig />),

  // ───────────── LEVEL 3 ─────────────
  q(61, 3, 'LNKO, LKKT', 'a = 2³ · 3² · 5⁴ · 7; [a; b] = 2³ · 3⁴ · 5⁶ · 7² · 11; (a; b) = 2 · 3² · 5⁴ · 7. Mi b prímtényezős alakja?', ['2 · 3⁴ · 5⁶ · 7² · 11', '2³ · 3⁴ · 5⁶ · 7² · 11', '2 · 3⁴ · 5⁶ · 7 · 11', '3⁴ · 5⁶ · 7² · 11'], 'Prímenként: 2: az LNKO-ban 1 < 3 ⇒ b-ben 1; 3: az LNKO-ban 2 = a kitevője ⇒ b-ben 4; 5: 6; 7: 2; 11: 1.', <ExpTableFig primes={P5} rows={[{ label: 'a', vals: ['3', '2', '4', '1', '0'] }, { label: '(a; b)', vals: ['1', '2', '4', '1', '0'] }, { label: '[a; b]', vals: ['3', '4', '6', '2', '1'] }, { label: 'b', vals: ['?', '?', '?', '?', '?'] }]} />),
  q(62, 3, 'LNKO, LKKT', 'a = 3⁵ · 5² · 7³; (a; b) = 3³ · 5² · 7³; [a; b] = 3⁵ · 5² · 7³. Mi b prímtényezős alakja?', ['3³ · 5² · 7³', '3⁵ · 5² · 7³', '3² · 5² · 7³', '3⁸ · 5⁴ · 7⁶'], '[a; b] = a, tehát b osztója a-nak, így (a; b) = b. A 3 kitevője b-ben 3 (az LNKO-ban 3 < 5).'),
  q(63, 3, 'LKKT', 'K = 2⁴ · 3 · 5. Melyik N esetén teljesül [K; N] = 2⁴ · 3³ · 5² · 7³?', ['N = 3³ · 5² · 7³', 'N = 2⁴ · 3 · 5² · 7³', 'N = 3³ · 5 · 7³', 'N = 2⁵ · 3³ · 5² · 7³'], 'A 3³, 5², 7³ csak N-ből jöhet; a 2 kitevője N-ben legfeljebb 4 lehet. A 2⁵ túl nagy, a 3¹ és 5¹ túl kicsi.'),
  q(64, 3, 'Ismeretlen jegyek', 'Hány (A; B) számjegypár esetén osztható a 3A407B hatjegyű szám 15-tel?', ['6', '3', '20', '2'], '15 = 3 · 5. B = 0: 3 | 14 + A ⇒ A = 1; 4; 7. B = 5: 3 | 19 + A ⇒ A = 2; 5; 8. Összesen 6 pár.', <DigitsFig digits="3A407B" note="15 | 3A407B – hány (A; B) pár?" />),
  q(65, 3, 'Ismeretlen jegyek', 'Az A138B2 hatjegyű szám osztható 24-gyel. Mi lehet a B számjegy?', ['3 vagy 7', '1, 3, 5, 7 vagy 9', '2 vagy 6', 'csak 3'], '24 = 3 · 8, és 8 | 8B2: 832 = 8 · 104, 872 = 8 · 109; a többi 8B2 nem osztható 8-cal. (A-t a 3-mal való oszthatóság adja: B = 3-nál A = 1; 4; 7, B = 7-nél A = 3; 6; 9.)', <DigitsFig digits="A138B2" note="24 | A138B2 – mi lehet B?" />),
  q(66, 3, 'Maradékok', 'Egy sportklub tagjai 2-, 3-, 4-, 5- és 6-osával sorakozva mindig 1 fő kimarad, de 11-esével pontosan beállnak. Legalább hány tagról van szó?', ['121', '61', '181', '66'], 'A létszám a [2; 3; 4; 5; 6] = 60 többszöröse + 1: 61, 121, 181, … Ezek közül a 121 = 11 · 11 az első, amely osztható 11-gyel.', <FormationFig />),
  q(67, 3, 'Maradékok', 'Kevesebb mint 500 csemetét ültetnek. Ha soronként 8, 9, 10 vagy 12 kerül, az utolsó sorba mindig 5 jut. Hány csemete van (ha mindegyik esetben van legalább egy teli sor)?', ['365', '185', '245', '725'], '[8; 9; 10; 12] = 360, így a szám 360k + 5. 500 alatt és teli sorral: 365. (Az 5 nem ad teli sort, a 725 túl sok.)'),
  q(68, 3, 'Osztók', 'A 365 csemetét egyenlő sorokba ültetik, soronként legalább 5, de 10-nél kevesebb fával. Hogyan?', ['73 sor, soronként 5 fa', '45 sor, soronként 8 fa', '40 sor, soronként 9 fa', '61 sor, soronként 6 fa'], '365 = 5 · 73; az 5 és 10 közötti számok közül csak az 5 osztója. (45 · 8 = 360, 40 · 9 = 360, 61 · 6 = 366.)'),
  q(69, 3, 'Oszthatóság', 'Mely 30-nál kisebb n természetes számokra teljesül, hogy 15 | 6n − 42, és 6n − 42 ≥ 0?', ['7; 12; 17; 22; 27', '7 és 22', '12 és 27', '7; 17; 27'], '6n − 42 = 6(n − 7). A 15 = 3 · 5 közül a 3 osztója a 6-nak, ezért elég, hogy 5 | 2(n − 7), azaz 5 | n − 7.'),
  q(70, 3, 'Egyszerűsítés', 'Hány olyan 20-nál kisebb összetett B szám van, amelyre a B/18 tört egyszerűsíthető?', ['10', '8', '6', '9'], 'A 20-nál kisebb összetett számok: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18. Mind osztható 2-vel vagy 3-mal, ezért mind a 10 esetben van közös osztó a 18 = 2 · 3²-nel.'),
  q(71, 3, 'Tizedes tört', 'Melyik kétjegyű p prímszám esetén lesz az 51/(2p) tört tizedes tört alakja véges?', ['17', '13', '11', '19'], '51 = 3 · 17, ezért p = 17-nél 51/34 = 3/2 = 1,5. Más kétjegyű prímnél a p a nevezőben marad.'),
  q(72, 3, '10 hatványai', 'Melyik oszthatóság igaz?', ['9 | 10²⁰²¹ − 1', '9 | 10²⁰²¹ + 1', '11 | 10²⁰²¹ − 1', '4 | 10²⁰²¹ + 1'], '10²⁰²¹ − 1 = 99…9 (2021 kilences), osztható 9-cel. 10²⁰²¹ + 1 számjegyösszege 2, utolsó két jegye 01; 10 páratlan kitevős hatványa 11-gyel osztva 10 maradékot ad, így 10²⁰²¹ − 1 maradéka 9.'),
  q(73, 3, '10 hatványai', 'Melyik oszthatóság igaz?', ['12 | 10²⁰²² + 632', '75 | 10²⁰²² − 55', '9 | 10²⁰²² + 1', '8 | 10²⁰²² + 4'], '10²⁰²² + 632 = 100…0632: utolsó két jegye 32 → 4 | ; számjegyösszege 1 + 6 + 3 + 2 = 12 → 3 | ; így 12 | . A 10²⁰²² − 55 …45-re végződik, nem osztható 25-tel.'),
  q(74, 3, 'Oszthatóság 11-gyel', 'Melyik szám osztható 11-gyel?', ['10⁹ + 1', '10⁹ − 1', '10⁴ + 1', '10⁵ − 1'], 'A 10 páratlan kitevős hatványa 11-gyel osztva 10 (azaz −1) maradékot ad, páros kitevős 1-et. Így 10⁹ + 1 maradéka 0; 10⁹ − 1: 9; 10⁴ + 1: 2; 10⁵ − 1: 9.'),
  q(75, 3, 'Alapszám', '„Hatszor kilenc: negyvenkettő.” (Douglas Adams) Melyik számrendszerben igaz, hogy 6 · 9 = 42?', ['a 13-asban', 'a 12-esben', 'a 14-esben', 'a 11-esben'], '6 · 9 = 54 = 4 · n + 2 ⇒ n = 13. (A 9-es jegy miatt n > 9.)'),
  q(76, 3, 'Relatív prím', 'Igaz-e: „Van olyan prímszám, amely minden összetett számhoz relatív prím.”?', ['hamis: a p prím nem relatív prím a 2p összetett számhoz', 'igaz: a 2 ilyen', 'igaz: minden prímszám ilyen', 'hamis, mert az 1 nem prím'], 'Bármely p prímhez van p-vel osztható összetett szám (2p, p²), és ezekkel az LNKO p > 1.'),
  q(77, 3, 'Tagadás', 'Melyik a „Bármely két prímszám összege páros.” kijelentés tagadása?', ['Van két olyan prímszám, amelyek összege páratlan.', 'Bármely két prímszám összege páratlan.', 'Nincs két olyan prímszám, amelyek összege páros.', 'Van két olyan prímszám, amelyek összege páros.'], 'A „bármely … igaz” tagadása „van olyan, amelyre nem igaz”. A tagadás igaz: 2 + 3 = 5.'),
  q(78, 3, 'Megfordítás', 's: „Ha egy számrendszer alapja n, akkor a legnagyobb számjegy n − 1.” Mi s megfordítása, és igaz-e?', ['„Ha a legnagyobb számjegy n − 1, akkor az alap n.” – igaz', '„Ha a legnagyobb számjegy n − 1, akkor az alap n.” – hamis', '„Ha az alap nem n, akkor a legnagyobb jegy nem n − 1.” – igaz', '„Az alap n és a legnagyobb jegy n − 1.” – hamis'], 'A megfordításban felcseréljük a feltételt és a következményt. Igaz, mert az n alapú rendszer jegyei pontosan 0, 1, …, n − 1.'),
  q(79, 3, 'Osztók száma', 'Melyik számnak van páratlan sok pozitív osztója?', ['144', '72', '150', '48'], 'Az osztók párba állíthatók (d és n/d); páratlan sok csak a négyzetszámoknál van. 144 = 12² (15 osztó), a 72-nek 12, a 150-nek 12, a 48-nak 10 osztója van.'),
  q(80, 3, 'Egymást követő számok', 'Melyik a legnagyobb pozitív egész, amely bármely 5 egymást követő pozitív egész szám szorzatának osztója?', ['120', '10', '60', '30'], 'Az 1 · 2 · 3 · 4 · 5 = 120 miatt nagyobb nem lehet; és 5 egymást követő szám között mindig van 5-tel, 3-mal, 4-gyel és még egy 2-vel osztható, így 120 mindig osztó.'),
  q(81, 3, 'Irracionális szám', 'Melyik szám irracionális?', ['0,12112211122211112222…', '0,1̇2̇', '1/7', '√(0,01)'], 'A 0,1211221112… képzési szabálya (egyre több 1-es és 2-es) miatt nincs ismétlődő szakasz. 0,1̇2̇ = 12/99, √(0,01) = 0,1.'),
  q(82, 3, 'Theodorus-spirál', 'A Theodorus-spirál első háromszögének befogói 1 és 1, minden következő háromszög az előző átfogójára és egy új, 1 egységes befogóra épül. Hányadik háromszög átfogója √10?', ['a 9.', 'a 10.', 'a 8.', 'az 5.'], 'Az n-edik háromszög átfogója √(n + 1): √2, √3, √4, … így a √10 a 9. háromszögé.', <SpiralFig />),
  q(83, 3, 'Szerkesztés', 'Melyik befogópárral rendelkező derékszögű háromszög átfogója √13 hosszú?', ['2 és 3', '1 és 12', '4 és 9', '1 és 3'], '2² + 3² = 13. (1 + 144 = 145; 16 + 81 = 97; 1 + 9 = 10.)'),
  q(84, 3, 'LNKO', 'Melyik állítás igaz két különböző pozitív egész szám legnagyobb közös osztójára?', ['Mindig osztója a két szám összegének.', 'Mindig kisebb mindkét számnál.', 'Nem lehet 1.', 'Mindig prímszám.'], 'Ha d | a és d | b, akkor d | a + b. A 6 és 12 LNKO-ja 6 (nem kisebb a 6-nál), a 8 és 15 LNKO-ja 1, a 12 és 18-é 6 (nem prím).'),
  q(85, 3, 'Prímtényezők', 'Egy hajó hosszának (egész méter), a kapitány életkorának és gyermekei számának szorzata 25 756. Hány éves a kapitány?', ['47', '37', '52', '68'], '25 756 = 2² · 47 · 137. Reális felosztás: 4 gyerek, 47 éves kapitány, 137 m-es hajó.'),
  q(86, 3, 'Számrendszer', 'Melyik a 11010110₂ szám tizenhatos számrendszerbeli alakja?', ['D6₁₆', '6D₁₆', '214₁₆', 'B6₁₆'], 'Négyesével csoportosítva jobbról: 1101 | 0110 → D (13) és 6. Tízesben 214 = 13 · 16 + 6.'),
  q(87, 3, 'Maradékok', 'Az a szám 7-tel osztva 3, a b szám 5 maradékot ad. Mennyi az a · b + a hetes maradéka?', ['4', '1', '18', '6'], 'A maradékokkal számolhatunk: 3 · 5 + 3 = 18, és 18 = 2 · 7 + 4. (Az 1 csak az a · b maradéka; a 18 nem lehet maradék.)'),
  q(88, 3, 'Szakaszos tört', 'Melyik közönséges tört egyenlő a 24,7̇ = 24,777… számmal?', ['223/9', '247/9', '2223/90', '247/10'], 'A = 24,7̇; 10A = 247,7̇; 9A = 223, A = 223/9. (2223/90 = 24,7 véges; 247/9 = 27,4̇.)'),
  q(89, 3, 'Osztók száma', 'Melyik a legkisebb pozitív egész szám, amelynek pontosan 6 pozitív osztója van?', ['12', '32', '18', '36'], '6 = 6 · 1 vagy 3 · 2: p⁵ (legkisebb 32) vagy p² · q (legkisebb 2² · 3 = 12). A 18-nak is 6 osztója van, de nagyobb; a 36-nak 9.'),
  q(90, 3, 'Prímek (érettségi)', 'Egy dominókészletben a két rész pöttyszáma 0–6, minden pöttyözés egyszer szerepel. Hány olyan dominó van, amelyen a két szám szorzata prímszám?', ['3', '6', '4', '2'], 'Szorzat csak akkor prím, ha az egyik tényező 1, a másik prím: 1-2, 1-3, 1-5 – 3 dominó (az 1-2 és 2-1 ugyanaz a kő).', <DominoFig />)
];

export const NumberTheoryPracticeExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="11. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés (szintenként 30) a teljes fejezetből: számhalmazok, osztók és prímek, LNKO és LKKT, oszthatósági szabályok és maradékok, logika, számrendszerek, irracionális számok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      themeColor="emerald"
      questions={NUMBER_THEORY_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Osztók, LNKO, LKKT',
          items: [
            'a | b: van c pozitív egész, hogy a · c = b',
            'osztók száma: (α₁ + 1) · (α₂ + 1) · …',
            '(a; b): kisebbik kitevők; [a; b]: nagyobbik kitevők',
            '(a; b) · [a; b] = a · b; relatív prím: (a; b) = 1'
          ]
        },
        {
          title: 'Oszthatósági szabályok',
          items: [
            '2, 4, 8 / 5, 25, 125: az utolsó 1, 2, 3 jegy',
            '3, 9: a számjegyek összege; 11: váltakozó összeg',
            'összetett osztó: relatív prím tényezők (24 = 3 · 8)',
            'maradékokkal is számolhatunk (+, ·)'
          ]
        },
        {
          title: 'Számrendszerek, számhalmazok',
          items: [
            'n alapú: jegyek 0 … n − 1; 1201₃ = 27 + 18 + 1 = 46',
            'tízesből: ismételt osztás, maradékok alulról felfelé',
            'véges tizedes tört ⇔ a nevezőben csak 2 és 5',
            'irracionális: végtelen, nem szakaszos (√2, π)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberTheoryPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumberTheoryPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumberTheoryPracticeExamQuiz;
