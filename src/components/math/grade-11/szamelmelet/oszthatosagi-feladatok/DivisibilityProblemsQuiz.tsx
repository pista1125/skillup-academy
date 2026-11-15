import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DivisibilityProblemsMatcher } from './DivisibilityProblemsMatcher';
import { DivisibilityProblemsSorter } from './DivisibilityProblemsSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Venn-diagram két relatív prím osztóval, a vizsgált számmal. */
const TwoDivisorFig: React.FC<{ d1: number; d2: number; n: string }> = ({ d1, d2, n }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <circle cx="95" cy="75" r="55" fill="#dbeafe" fillOpacity="0.8" stroke="#2563eb" strokeWidth="1.5" />
    <circle cx="145" cy="75" r="55" fill="#fef3c7" fillOpacity="0.8" stroke="#d97706" strokeWidth="1.5" />
    <text x="65" y="60" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{d1} | n</text>
    <text x="175" y="60" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#92400e">{d2} | n</text>
    <text x="120" y="70" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#065f46">{d1 * d2} | n</text>
    <text x="120" y="96" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">{n} ?</text>
    <text x="120" y="145" fontSize="9.5" textAnchor="middle" fill="#475569">{d1 * d2} = {d1} · {d2}</text>
  </svg>
);

/** Választási idővonal: pontok a ciklusok szerint, a keresett év „?”. */
const TimelineFig: React.FC<{ rows: { label: string; start: number; step: number; color: string }[] }> = ({ rows }) => {
  const s = 2014;
  const e = 2040;
  const x = (y: number) => 20 + ((y - s) / (e - s)) * 200;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {rows.map((r, i) => {
        const yy = 35 + i * 38;
        const pts: number[] = [];
        for (let y = r.start; y <= 2019; y += r.step) if (y >= s) pts.push(y);
        return (
          <g key={r.label}>
            <text x="20" y={yy - 9} fontSize="9" fontWeight="bold" fill={r.color}>{r.label}</text>
            <line x1="20" y1={yy} x2="220" y2={yy} stroke="#cbd5e1" />
            {pts.map((y) => (
              <circle key={y} cx={x(y)} cy={yy} r="3.5" fill={r.color} />
            ))}
            <text x={x(2021)} y={yy + 4} fontSize="10" fill={r.color}>+{r.step} év … ?</text>
          </g>
        );
      })}
      {[2014, 2020, 2026, 2032, 2038].map((y) => (
        <text key={y} x={x(y)} y="145" fontSize="8.5" textAnchor="middle" fill="#64748b">{y}</text>
      ))}
      <text x="225" y="20" fontSize="12" textAnchor="end" fontWeight="bold" fill="#dc2626">?</text>
    </svg>
  );
};

/** Két buszjárat indulási ütemei. */
const BusFig: React.FC<{ m1: number; m2: number; label: string }> = ({ m1, m2, label }) => {
  const x = (t: number) => 20 + (t / 30) * 180;
  return (
    <svg viewBox="0 0 240 130" className={FIG_CLASS}>
      <text x="20" y="22" fontSize="9.5" fontWeight="bold" fill="#2563eb">1. járat: {m1} percenként</text>
      <line x1="20" y1="35" x2="220" y2="35" stroke="#cbd5e1" />
      <text x="226" y="58" fontSize="14" fontWeight="bold" fill="#dc2626">?</text>
      {Array.from({ length: Math.floor(30 / m1) + 1 }, (_, i) => (
        <rect key={i} x={x(i * m1) - 3} y="31" width="6" height="8" fill="#2563eb" />
      ))}
      <text x="20" y="62" fontSize="9.5" fontWeight="bold" fill="#d97706">2. járat: {m2} percenként</text>
      <line x1="20" y1="75" x2="220" y2="75" stroke="#cbd5e1" />
      {Array.from({ length: Math.floor(30 / m2) + 1 }, (_, i) => (
        <circle key={i} cx={x(i * m2)} cy="75" r="3.5" fill="#d97706" />
      ))}
      <line x1="20" y1="100" x2="220" y2="100" stroke="#475569" />
      {[0, 10, 20, 30].map((t) => (
        <text key={t} x={x(t)} y="114" fontSize="9" textAnchor="middle" fill="#64748b">+{t} perc</text>
      ))}
      <text x="120" y="127" fontSize="9.5" textAnchor="middle" fill="#0f172a">{label}</text>
    </svg>
  );
};

const BoxFig: React.FC = () => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    <g stroke="#be185d" strokeWidth="1.2">
      <polygon points="20,110 90,110 90,96 20,96" fill="#fbcfe8" />
      <polygon points="20,96 90,96 118,76 48,76" fill="#fbcfe8" fillOpacity="0.7" />
      <polygon points="90,110 118,90 118,76 90,96" fill="#fbcfe8" fillOpacity="0.5" />
    </g>
    <text x="55" y="124" fontSize="9" textAnchor="middle" fill="#9d174d">20 cm</text>
    <text x="14" y="107" fontSize="9" textAnchor="end" fill="#9d174d">4</text>
    <text x="110" y="72" fontSize="9" fill="#9d174d">16 cm</text>
    <g stroke="#047857" strokeWidth="1.2">
      <polygon points="140,120 210,120 210,50 140,50" fill="#d1fae5" />
      <polygon points="140,50 210,50 230,35 160,35" fill="#d1fae5" fillOpacity="0.7" />
      <polygon points="210,120 230,105 230,35 210,50" fill="#d1fae5" fillOpacity="0.5" />
    </g>
    <text x="175" y="90" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#065f46">?</text>
    <text x="175" y="135" fontSize="9" textAnchor="middle" fill="#065f46">kocka alakú karton</text>
  </svg>
);

export const DIVISIBILITY_PROBLEMS_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'dp-q1',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Osztható-e 45-tel a 765?',
    figure: <TwoDivisorFig d1={5} d2={9} n="765" />,
    options: ['Igen, mert 5-re végződik és a számjegyeinek összege (18) osztható 9-cel', 'Nem, mert a számjegyeinek összege nem osztható 9-cel', 'Nem, mert nem osztható 2-vel', 'Nem, mert 45 nem prímszám'],
    correctAnswer: 0,
    explanation: '45 = 5 · 9 és (5; 9) = 1. A 765 5-re végződik, és 7 + 6 + 5 = 18 osztható 9-cel, tehát 45 | 765 (765 = 45 · 17).'
  },
  {
    id: 'dp-q2',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Osztható-e 45-tel a 2900?',
    options: ['Nem, mert a számjegyeinek összege 11, így 9-cel nem osztható', 'Igen, mert 0-ra végződik', 'Igen, mert osztható 5-tel', 'Nem, mert 5-tel nem osztható'],
    correctAnswer: 0,
    explanation: 'A 2900 osztható 5-tel (0-ra végződik), de 2 + 9 + 0 + 0 = 11, ami nem osztható 9-cel. Ezért 45-tel sem osztható.'
  },
  {
    id: 'dp-q3',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Mikor osztható egy természetes szám 6-tal?',
    options: ['Ha osztható 2-vel és 3-mal', 'Ha osztható 2-vel vagy 3-mal', 'Ha számjegyeinek összege osztható 6-tal', 'Ha 6-ra végződik'],
    correctAnswer: 0,
    explanation: '6 = 2 · 3, és a 2 és a 3 relatív prímek, ezért 6 | n ⇔ 2 | n és 3 | n. (A 24 számjegyösszege 6, és osztható 6-tal, de a 15 számjegyösszege is 6, mégsem.)'
  },
  {
    id: 'dp-q4',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Mikor osztható egy természetes szám 15-tel?',
    options: ['Ha osztható 3-mal és 5-tel', 'Ha 5-re végződik', 'Ha osztható 3-mal vagy 5-tel', 'Ha számjegyeinek összege 15'],
    correctAnswer: 0,
    explanation: '15 = 3 · 5, (3; 5) = 1, ezért 15 | n ⇔ 3 | n és 5 | n. (A 25 5-re végződik, de nem osztható 15-tel.)'
  },
  {
    id: 'dp-q5',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Mikor osztható egy természetes szám 12-vel?',
    options: ['Ha osztható 3-mal és 4-gyel', 'Ha osztható 2-vel és 6-tal', 'Ha osztható 2-vel és 3-mal', 'Ha számjegyeinek összege osztható 12-vel'],
    correctAnswer: 0,
    explanation: '12 = 3 · 4 és (3; 4) = 1. A 2 és 6 nem relatív prímek: a 6 osztható 2-vel és 6-tal, de 12-vel nem. A „2-vel és 3-mal” csak a 6-tal való oszthatóságot jelenti.'
  },
  {
    id: 'dp-q6',
    level: 1,
    questionTypeBadge: 'Végződés',
    question: 'Melyik szám osztható 1000-rel?',
    options: ['45 000', '45 500', '40 050', '4 500'],
    correctAnswer: 0,
    explanation: 'Egy szám akkor és csak akkor osztható 1000-rel, ha 000-ra végződik. Ez csak a 45 000-re teljesül.'
  },
  {
    id: 'dp-q7',
    level: 1,
    questionTypeBadge: 'Paritás',
    question: 'Milyen két páratlan szám összege?',
    options: ['Mindig páros', 'Mindig páratlan', 'Lehet páros is, páratlan is', 'Mindig osztható 4-gyel'],
    correctAnswer: 0,
    explanation: '(2k + 1) + (2m + 1) = 2(k + m + 1), ez mindig páros. 4-gyel nem mindig osztható: 1 + 5 = 6.'
  },
  {
    id: 'dp-q8',
    level: 1,
    questionTypeBadge: 'Paritás',
    question: 'Milyen egy páratlan és egy páros szám szorzata?',
    options: ['Mindig páros', 'Mindig páratlan', 'Lehet páros is, páratlan is', 'Mindig osztható 4-gyel'],
    correctAnswer: 0,
    explanation: 'Ha az egyik tényező páros (2-vel osztható), akkor a szorzat is osztható 2-vel. 4-gyel nem mindig: 3 · 2 = 6.'
  },
  {
    id: 'dp-q9',
    level: 1,
    questionTypeBadge: 'Paritás',
    question: 'Milyen két páratlan szám szorzata?',
    options: ['Mindig páratlan', 'Mindig páros', 'Lehet páros is, páratlan is', 'Mindig osztható 3-mal'],
    correctAnswer: 0,
    explanation: 'A 2 prím, ezért ha egyik tényező sem osztható 2-vel, akkor a szorzat sem: (2k + 1)(2m + 1) = 2(2km + k + m) + 1.'
  },
  {
    id: 'dp-q10',
    level: 1,
    questionTypeBadge: 'Összetett szabály',
    question: 'Melyik szám osztható 18-cal?',
    options: ['5238', '3699', '2316', '5240'],
    correctAnswer: 0,
    explanation: '18 = 2 · 9. Az 5238 páros, és 5 + 2 + 3 + 8 = 18 osztható 9-cel. A 3699 páratlan, a 2316 számjegyösszege 12, az 5240-é 11.'
  },
  // ---------- 2. szint ----------
  {
    id: 'dp-q11',
    level: 2,
    questionTypeBadge: 'Prímtényezők',
    question: 'Mi az 1260 prímtényezős felbontása?',
    options: ['2² · 3² · 5 · 7', '2 · 3² · 5 · 7', '2² · 3 · 5 · 7', '2³ · 3² · 5'],
    correctAnswer: 0,
    explanation: '1260 = 2 · 630 = 2² · 315 = 2² · 3² · 35 = 2² · 3² · 5 · 7. (A többi szorzat értéke 630, 420 és 360.)'
  },
  {
    id: 'dp-q12',
    level: 2,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van az 1260 = 2² · 3² · 5 · 7 számnak?',
    options: ['36', '24', '18', '48'],
    correctAnswer: 0,
    explanation: 'Egy osztó 2^a · 3^b · 5^c · 7^d alakú: a és b 3-féle (0, 1, 2), c és d 2-féle (0, 1) lehet: 3 · 3 · 2 · 2 = 36.'
  },
  {
    id: 'dp-q13',
    level: 2,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Igaz-e: „Ha egy szám osztható 3-mal, akkor a négyzete osztható 9-cel.”?',
    options: ['Igaz, mert n = 3k esetén n² = 9k²', 'Hamis, a négyzete csak 3-mal osztható', 'Csak páratlan számokra igaz', 'Hamis, pl. 3² = 9 nem osztható 9-cel'],
    correctAnswer: 0,
    explanation: 'Ha n = 3k, akkor n² = 9k², ami mindig osztható 9-cel. Pl. 6² = 36 = 9 · 4.'
  },
  {
    id: 'dp-q14',
    level: 2,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Miért osztható 6-tal bármely három egymást követő pozitív egész szám szorzata?',
    options: [
      'Mert van köztük páros szám és 3-mal osztható szám is',
      'Mert az összegük mindig osztható 6-tal',
      'Mert közöttük mindig ott van a 6',
      'Mert mindhárom szám osztható 2-vel'
    ],
    correctAnswer: 0,
    explanation: 'Három egymást követő szám között van páros és van 3-mal osztható; mivel (2; 3) = 1, a szorzat osztható 6-tal. (Az összeg nem mindig: 1 + 2 + 3 = 6, de 2 + 3 + 4 = 9.)'
  },
  {
    id: 'dp-q15',
    level: 2,
    questionTypeBadge: 'Ellenpélda',
    question: '„Ha egy összetett szám osztható 3-mal, akkor bárhogyan két pozitív egész tag összegére bontva a tagok is oszthatók 3-mal.” Melyik ellenpélda cáfolja?',
    options: ['6 = 1 + 5', '6 = 3 + 3', '9 = 3 + 6', '12 = 6 + 6'],
    correctAnswer: 0,
    explanation: 'A 6 osztható 3-mal, de 6 = 1 + 5 esetén egyik tag sem osztható 3-mal. A többi felbontásban mindkét tag osztható 3-mal, ezért azok nem cáfolnak.'
  },
  {
    id: 'dp-q16',
    level: 2,
    questionTypeBadge: 'Ellenpélda',
    question: '„Ha egy összetett szám osztható 3-mal, akkor bárhogyan két pozitív egész tényező szorzatára bontva mindkét tényező osztható 3-mal.” Melyik ellenpélda cáfolja?',
    options: ['6 = 2 · 3', '9 = 3 · 3', '36 = 6 · 6', '18 = 3 · 6'],
    correctAnswer: 0,
    explanation: 'A 6 = 2 · 3 felbontásban a 2 nem osztható 3-mal. A 3 prím, ezért csak annyi igaz, hogy legalább az egyik tényező osztható 3-mal.'
  },
  {
    id: 'dp-q17',
    level: 2,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Igaz-e: „A 10 minden 1-nél nagyobb egész kitevőjű hatványa osztható 25-tel.”?',
    options: [
      'Igaz, mert 100, 1000, … mind a 100 többszöröse, és 25 | 100',
      'Hamis, mert a 10 nem osztható 25-tel',
      'Csak páros kitevőre igaz',
      'Hamis, mert az 1000 nem osztható 25-tel'
    ],
    correctAnswer: 0,
    explanation: 'Legalább második hatványnál 10ⁿ = 100 · 10ⁿ⁻², és 100 = 4 · 25. Az 1000 = 25 · 40 is osztható 25-tel.'
  },
  {
    id: 'dp-q18',
    level: 2,
    questionTypeBadge: 'lnko és lkkt',
    question: 'Két szám legkisebb közös többszöröse 48, legnagyobb közös osztója 6. Melyik lehet ez a két szám?',
    options: ['6 és 48', '12 és 24', '6 és 8', '16 és 18'],
    correctAnswer: 0,
    explanation: 'a = 6u, b = 6v, ahol (u; v) = 1 és 6 · u · v = 48, azaz u · v = 8 ⇒ u = 1, v = 8. Tehát 6 és 48. (12 és 24 lnko-ja 12; 6 és 8, valamint 16 és 18 lnko-ja 2.)'
  },
  {
    id: 'dp-q19',
    level: 2,
    questionTypeBadge: 'Fermat-tétel',
    question: 'A kis Fermat-tétel szerint p prím esetén a^p − a osztható p-vel. Mennyi 2⁵ − 2, és mit kapunk 5-tel osztva?',
    options: ['30 = 5 · 6, osztható 5-tel', '32, 2 maradékot ad', '30, 1 maradékot ad', '10 = 5 · 2, osztható 5-tel'],
    correctAnswer: 0,
    explanation: '2⁵ = 32, így 2⁵ − 2 = 30 = 5 · 6 – a tétel ebben az esetben teljesül.'
  },
  {
    id: 'dp-q20',
    level: 2,
    questionTypeBadge: 'lkkt',
    question: 'Az országgyűlési választás 1990 óta 4 évente, a köztársasági elnök választása 5 évente van (pl. 2017-ben). 2017 után legközelebb melyik évben van mindkettő?',
    figure: (
      <TimelineFig
        rows={[
          { label: 'országgyűlés (4 év)', start: 2014, step: 4, color: '#059669' },
          { label: 'elnök (5 év)', start: 2017, step: 5, color: '#2563eb' }
        ]}
      />
    ),
    options: ['2022', '2027', '2037', '2020'],
    correctAnswer: 0,
    explanation: 'Országgyűlés: 2018, 2022, 2026, …; elnök: 2022, 2027, … Az első közös év 2022, utána [4; 5] = 20 évente (2042, 2062, …).'
  },
  // ---------- 3. szint ----------
  {
    id: 'dp-q21',
    level: 3,
    questionTypeBadge: 'lnko',
    question: 'x és y egyjegyű pozitív egészek; xy az x, y jegyekből álló kétjegyű, 3xy pedig a 3, x, y jegyekből álló háromjegyű szám. Hány megoldása van a (3xy; xy) = 3 feltételnek?',
    options: ['12', '30', '9', '16'],
    correctAnswer: 0,
    explanation: '3xy = 300 + xy, így (3xy; xy) = (300; xy). 300 = 2² · 3 · 5², tehát xy osztható 3-mal, páratlan és 5-tel nem osztható: 21, 27, 33, 39, 51, 57, 63, 69, 81, 87, 93, 99 – 12 lehetőség.'
  },
  {
    id: 'dp-q22',
    level: 3,
    questionTypeBadge: 'lnko',
    question: 'Melyik xy kétjegyű számra teljesül, hogy (3xy; xy) = 3?',
    options: ['21 (321 és 21)', '24 (324 és 24)', '45 (345 és 45)', '15 (315 és 15)'],
    correctAnswer: 0,
    explanation: '(321; 21) = (300; 21) = 3. A többi: (324; 24) = 12, (345; 45) = 15, (315; 15) = 15.'
  },
  {
    id: 'dp-q23',
    level: 3,
    questionTypeBadge: 'lkkt',
    question: 'Az Európai Parlament képviselőit 5 évente választjuk, Magyarországon először 2004-ben. Az országgyűlési választás 1990 óta 4 évente van. 2014 után legközelebb melyik évben lesz mindkettő?',
    figure: (
      <TimelineFig
        rows={[
          { label: 'országgyűlés (4 év)', start: 2014, step: 4, color: '#059669' },
          { label: 'Európai Parlament (5 év)', start: 2014, step: 5, color: '#9333ea' }
        ]}
      />
    ),
    options: ['2034', '2024', '2029', '2044'],
    correctAnswer: 0,
    explanation: 'Mindkettő volt 2014-ben; a közös évek [4; 5] = 20 évente ismétlődnek, így a következő 2034. (2024, 2029 és 2044 csak EP-választási év.)'
  },
  {
    id: 'dp-q24',
    level: 3,
    questionTypeBadge: 'Maradékok',
    question: 'Ha nem változik a rend, mikor lesz egy évben országgyűlési (4 évente, 1990-től), elnök- (5 évente, 2017-től) és EP-választás (5 évente, 2004-től)?',
    options: ['Soha, mert az elnök- és az EP-választás évei 5-tel osztva különböző maradékot adnak', '2042-ben', '2062-ben', '2034-ben'],
    correctAnswer: 0,
    explanation: 'Elnökválasztás: 2017 + 5k (5-tel osztva 2 maradék), EP: 2004 + 5m (4 maradék). Ugyanaz az év nem adhat két különböző maradékot, így a kettő sosem esik egybe.'
  },
  {
    id: 'dp-q25',
    level: 3,
    questionTypeBadge: 'lnko és lkkt',
    question: 'A = 48, B = 60, C = 75. Mennyi (A; [B; C])?',
    options: ['12', '15', '60', '300'],
    correctAnswer: 0,
    explanation: '[60; 75] = 300 (60 = 2² · 3 · 5, 75 = 3 · 5²), és (48; 300) = 12. (15 = ([A; B]; C), 60 = [B; (A; C)], 300 = [(A; B); C].)'
  },
  {
    id: 'dp-q26',
    level: 3,
    questionTypeBadge: 'lnko és lkkt',
    question: 'A, B, C különböző pozitív egészek. Melyik állítás igaz MINDEN ilyen számhármasra?',
    options: [
      '([A; B]; C) osztója [(A; B); C]-nek',
      '(A; [B; C]) osztója ([A; B]; C)-nek',
      '[(A; B); C] osztója [B; (A; C)]-nek',
      '[B; (A; C)] osztója (A; [B; C])-nek'
    ],
    correctAnswer: 0,
    explanation: '([A; B]; C) osztója C-nek, C pedig osztója [(A; B); C]-nek. A többi nem mindig igaz: A = 48, B = 60, C = 75 esetén 12 ∤ 15, 300 ∤ 60 és 60 ∤ 12.'
  },
  {
    id: 'dp-q27',
    level: 3,
    questionTypeBadge: 'lkkt',
    question: 'Két buszjárat 6.00-kor egyszerre indul; az egyik 8, a másik 5 percenként. 6.00 után mikor indulnak legközelebb egyszerre?',
    figure: <BusFig m1={8} m2={5} label="6.00 után mikor indulnak együtt?" />,
    options: ['6.40-kor', '6.20-kor', '6.24-kor', '7.00-kor'],
    correctAnswer: 0,
    explanation: '[8; 5] = 40, így 40 percenként indulnak egyszerre: 6.40, 7.20, 8.00. (6.20-kor csak a 2., 6.24-kor csak az 1. indul, 7.00-kor egyik sem együtt.)'
  },
  {
    id: 'dp-q28',
    level: 3,
    questionTypeBadge: 'lkkt',
    question: '16.00-kor a két buszjárat egyszerre indul, ezután 20.00-ig az egyik 8, a másik 7 percenként. Hányszor indulnak egyszerre 16.00 és 20.00 között (a 16.00-t beleszámítva)?',
    figure: <BusFig m1={8} m2={7} label="16.00-tól: 8 és 7 perc" />,
    options: ['5', '4', '6', '8'],
    correctAnswer: 0,
    explanation: '[8; 7] = 56 perc. 16.00, 16.56, 17.52, 18.48, 19.44 – a következő 20.40 lenne. Összesen 5 alkalom.'
  },
  {
    id: 'dp-q29',
    level: 3,
    questionTypeBadge: 'lkkt',
    question: '4 × 16 × 20 cm-es bonbonos dobozokkal úgy kell kitölteni egy kartondobozt, hogy bármelyik lapjukra állítva is hézagmentesen beférjenek (mind ugyanabban az állásban). Mekkora a legkisebb ilyen karton, és hány bonbonos doboz fér bele?',
    figure: <BoxFig />,
    options: ['80 cm élű kocka, 400 doboz', '80 cm élű kocka, 512 doboz', '40 cm élű kocka, 50 doboz', '320 cm élű kocka, 400 doboz'],
    correctAnswer: 0,
    explanation: 'Minden élnek a 4, 16 és 20 közös többszörösének kell lennie: [4; 16; 20] = 80. A kocka térfogata 512 000 cm³, egy doboz 1280 cm³: 512 000 : 1280 = 400. (A 40 nem többszöröse a 16-nak.)'
  },
  {
    id: 'dp-q30',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a helyes növekvő sorrend? (3575; 3125), (5120; 4480), [72; 15], [75; 40]',
    options: [
      '(3575; 3125) < [72; 15] < [75; 40] < (5120; 4480)',
      '(3575; 3125) < (5120; 4480) < [72; 15] < [75; 40]',
      '[72; 15] < (3575; 3125) < [75; 40] < (5120; 4480)',
      '(3575; 3125) < [72; 15] < (5120; 4480) < [75; 40]'
    ],
    correctAnswer: 0,
    explanation: '(3575; 3125) = 25, (5120; 4480) = 640, [72; 15] = 360, [75; 40] = 600. Tehát 25 < 360 < 600 < 640.'
  }
];

export const DivisibilityProblemsQuiz: React.FC<{
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
      topicId="g11-num-oszthatosagi-feladatok-quiz"
      subtopicId="oszthatosagi-feladatok"
      title="6. Oszthatósági feladatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: összetett oszthatósági szabályok, paritás, osztók, lnko, lkkt és szöveges feladatok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={DIVISIBILITY_PROBLEMS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összetett oszthatóság',
          items: [
            'a | n, b | n és (a; b) = 1 ⇒ a · b | n',
            '6 = 2 · 3, 12 = 3 · 4, 15 = 3 · 5, 18 = 2 · 9, 45 = 5 · 9',
            '10, 100, 1000: 0-ra, 00-ra, 000-ra végződik',
            'Nem relatív prím párral nem szabad: 4 | 12, 6 | 12, de 24 ∤ 12'
          ]
        },
        {
          title: 'lnko és lkkt a gyakorlatban',
          items: [
            'Ismétlődő események: közös időpont [p; q] lépésenként',
            'Választások: [4; 5] = 20 év; buszok: [8; 5] = 40 perc',
            'Dobozok kitöltése: [4; 16; 20] = 80 cm',
            '(a; b) · [a; b] = a · b, pl. 6 · 48 = 288'
          ]
        },
        {
          title: 'Paritás és tételek',
          items: [
            'páros ± páros, páratlan ± páratlan: páros',
            'páratlan · páratlan: páratlan; ha van páros tényező: páros',
            '3 egymást követő egész szorzata: 6 | …',
            'Kis Fermat-tétel: p prím ⇒ p | a^p − a'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <DivisibilityProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <DivisibilityProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default DivisibilityProblemsQuiz;
