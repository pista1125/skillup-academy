import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatProbSummaryMatcher } from './StatProbSummaryMatcher';
import { StatProbSummarySorter } from './StatProbSummarySorter';
import { S_BLUE, S_RED, S_INK, S_GREEN, S_PURPLE } from './sumKit';

const QFIG = 'w-full max-w-[280px] h-auto mx-auto';
const Box: React.FC<{ h?: number; children: React.ReactNode }> = ({ h = 150, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Gyakorisági táblázat ábraként. */
const FIG_Q1 = (
  <Box h={110}>
    {['adat', '14', '15', '16', '17', '18', '19', '20'].map((t, i) => (
      <g key={`a${i}`}>
        <rect x={10 + i * 28} y="25" width="28" height="26" fill={i === 0 ? '#e0e7ff' : '#ffffff'} stroke="#94a3b8" />
        <text x={24 + i * 28} y="42" fontSize={i === 0 ? 8.5 : 11} textAnchor="middle" fill={S_INK} fontWeight="bold">
          {t}
        </text>
      </g>
    ))}
    {['gyak.', '1', '3', '4', '3', '2', '1', '1'].map((t, i) => (
      <g key={`g${i}`}>
        <rect x={10 + i * 28} y="51" width="28" height="26" fill={i === 0 ? '#e0e7ff' : '#ffffff'} stroke="#94a3b8" />
        <text x={24 + i * 28} y="68" fontSize={i === 0 ? 8.5 : 11} textAnchor="middle" fill={S_BLUE} fontWeight="bold">
          {t}
        </text>
      </g>
    ))}
    <text x="120" y="98" fontSize="10.5" textAnchor="middle" fill={S_RED} fontWeight="bold">
      módusz, medián, átlag = ?
    </text>
  </Box>
);

const FIG_Q4 = (
  <Box h={150}>
    {(() => {
      const nodes: React.ReactNode[] = [];
      const lv = [120];
      const ys = [22, 62, 102, 140];
      let xs = lv;
      for (let d = 0; d < 3; d++) {
        const next: number[] = [];
        xs.forEach((x, i) => {
          const off = 52 / 2 ** d;
          [x - off, x + off].forEach((nx, k) => {
            const onPath = (d === 0 && x === 120 && k === 0) || (d === 1 && x === 68 && k === 1) || (d === 2 && x === 94 && k === 0);
            nodes.push(<line key={`${d}-${i}-${k}`} x1={x} y1={ys[d] + 6} x2={nx} y2={ys[d + 1] - 8} stroke={onPath ? S_RED : '#94a3b8'} strokeWidth={onPath ? 2.2 : 1} />);
            nodes.push(
              <text key={`t${d}-${i}-${k}`} x={nx} y={ys[d + 1]} fontSize="10" textAnchor="middle" fontWeight="bold" fill={onPath ? S_RED : S_INK}>
                {k === 0 ? 'I' : 'F'}
              </text>
            );
            next.push(nx);
          });
        });
        xs = next;
      }
      return nodes;
    })()}
    <circle cx="120" cy="20" r="4" fill={S_INK} />
    <text x="232" y="22" fontSize="10" textAnchor="end" fill={S_RED} fontWeight="bold">
      I – F – I: P = ?
    </text>
  </Box>
);

const urn = (groups: { n: number; color: string; label: string }[], extra?: string) => {
  const balls: React.ReactNode[] = [];
  let idx = 0;
  groups.forEach((g) => {
    for (let i = 0; i < g.n; i++) {
      const col = idx % 6;
      const row = Math.floor(idx / 6);
      balls.push(<circle key={idx} cx={64 + col * 20} cy={118 - row * 20} r="8.5" fill={g.color} stroke="#475569" strokeWidth="0.8" />);
      idx++;
    }
  });
  return (
    <Box h={150}>
      <path d="M 45 30 L 45 135 Q 45 142 52 142 L 172 142 Q 179 142 179 135 L 179 30" fill="none" stroke={S_INK} strokeWidth="2" />
      {balls}
      {groups.map((g, i) => (
        <text key={g.label} x="186" y={50 + i * 16} fontSize="10" fill={S_INK}>
          <tspan fill={g.color} fontWeight="bold">●</tspan> {g.label}
        </text>
      ))}
      {extra && (
        <text x="112" y="20" fontSize="10.5" textAnchor="middle" fill={S_RED} fontWeight="bold">
          {extra}
        </text>
      )}
    </Box>
  );
};

const FIG_Q16 = urn(
  [
    { n: 12, color: '#f87171', label: '12 piros' },
    { n: 3, color: '#60a5fa', label: '3 kék' }
  ],
  '+ ? zöld ⇒ P(piros) = 0,3'
);
const FIG_Q17 = urn(
  [
    { n: 3, color: '#f87171', label: '3 piros' },
    { n: 5, color: '#facc15', label: '5 sárga' }
  ],
  'egyszerre 2 golyó'
);

const FIG_Q20 = (() => {
  const parts = [
    { v: 4, c: '#93c5fd', t: '2-es: 4' },
    { v: 5, c: '#fca5a5', t: '4-es: 5' },
    { v: 4, c: '#86efac', t: '5-ös: 4' }
  ];
  let a = -Math.PI / 2;
  const cx = 80;
  const cy = 75;
  const r = 55;
  return (
    <Box h={150}>
      {parts.map((p, i) => {
        const a2 = a + (p.v / 13) * 2 * Math.PI;
        const d = `M ${cx} ${cy} L ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)} Z`;
        const mid = (a + a2) / 2;
        a = a2;
        return (
          <g key={i}>
            <path d={d} fill={p.c} stroke="#ffffff" strokeWidth="1.5" />
            {i === 1 && (
              <text x={cx + 30 * Math.cos(mid)} y={cy + 30 * Math.sin(mid) + 4} fontSize="12" textAnchor="middle" fill={S_RED} fontWeight="bold">
                ?
              </text>
            )}
          </g>
        );
      })}
      {parts.map((p, i) => (
        <text key={p.t} x="155" y={55 + i * 18} fontSize="10.5" fill={S_INK}>
          <tspan fill={p.c} fontWeight="bold">■</tspan> {p.t}
        </text>
      ))}
    </Box>
  );
})();

const FIG_Q22 = (
  <Box h={170}>
    {Array.from({ length: 6 }, (_, i) =>
      Array.from({ length: 6 }, (_, j) => (
        <g key={`${i}-${j}`}>
          <rect x={46 + j * 22} y={24 + i * 22} width="21" height="21" fill="#ffffff" stroke="#94a3b8" />
          <text x={56.5 + j * 22} y={39 + i * 22} fontSize="10" textAnchor="middle" fill={S_INK}>
            {Math.max(i + 1, j + 1)}
          </text>
        </g>
      ))
    )}
    {Array.from({ length: 6 }, (_, k) => (
      <g key={`h${k}`}>
        <text x={56.5 + k * 22} y="18" fontSize="9.5" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
          {k + 1}
        </text>
        <text x="36" y={39 + k * 22} fontSize="9.5" textAnchor="middle" fill={S_RED} fontWeight="bold">
          {k + 1}
        </text>
      </g>
    ))}
    <text x="196" y="80" fontSize="10.5" fill={S_PURPLE} fontWeight="bold">
      E = ?
    </text>
  </Box>
);

const FIG_Q24 = (
  <Box h={110}>
    {Array.from({ length: 20 }, (_, i) => (
      <rect key={i} x={14 + (i % 10) * 22} y={18 + Math.floor(i / 10) * 30} width="18" height="24" rx="3" fill={i < 14 ? '#bbf7d0' : '#fecaca'} stroke={i < 14 ? S_GREEN : S_RED} />
    ))}
    <text x="14" y="96" fontSize="10" fill={S_GREEN} fontWeight="bold">
      14 magyar
    </text>
    <text x="95" y="96" fontSize="10" fill={S_RED} fontWeight="bold">
      6 külföldi
    </text>
    <text x="226" y="96" fontSize="10" textAnchor="end" fill={S_INK} fontWeight="bold">
      5 húzás
    </text>
  </Box>
);

const FIG_Q26 = (
  <Box h={150}>
    <circle cx="90" cy="75" r="55" fill="#e5e7eb" stroke={S_INK} strokeWidth="1.5" />
    <path d={`M 90 75 L 90 20 A 55 55 0 0 1 ${90 + 55 * Math.cos(Math.PI / 6)} ${75 + 55 * Math.sin(Math.PI / 6)} Z`} fill="#86efac" stroke={S_INK} strokeWidth="1.5" />
    <text x="118" y="62" fontSize="10" textAnchor="middle" fill={S_INK} fontWeight="bold">
      NYERT
    </text>
    <text x="70" y="98" fontSize="10" textAnchor="middle" fill={S_INK} fontWeight="bold">
      NEM NYERT
    </text>
    <polygon points="90,14 85,4 95,4" fill={S_RED} />
    <text x="160" y="60" fontSize="10" fill={S_INK}>
      P(NYERT) = 1/3
    </text>
    <text x="160" y="78" fontSize="10" fill={S_INK}>
      6 pörgetés
    </text>
    <text x="160" y="96" fontSize="10" fill={S_RED} fontWeight="bold">
      pontosan 2: ?
    </text>
  </Box>
);

const STAT_PROB_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ssp-q1',
    questionTypeBadge: 'Módusz',
    figure: FIG_Q1,
    level: 1,
    question: 'Mennyi a táblázatban megadott adatsokaság módusza?',
    options: ['16', '4', '17', '15'],
    correctAnswer: 0,
    explanation: 'A 16 fordul elő a legtöbbször (4-szer). A 4 a gyakoriság, nem az adat.'
  },
  {
    id: 'ssp-q2',
    questionTypeBadge: 'Átlag',
    figure: FIG_Q1,
    level: 1,
    question: 'Mennyi a táblázatban megadott (15 elemű) adatsokaság átlaga?',
    options: ['16,6', '17', '16', '35,6'],
    correctAnswer: 0,
    explanation: '(14 + 3 · 15 + 4 · 16 + 3 · 17 + 2 · 18 + 19 + 20)/15 = 249/15 = 16,6. (17 a különböző értékek átlaga, súlyozás nélkül.)'
  },
  {
    id: 'ssp-q3',
    questionTypeBadge: 'Klasszikus valószínűség',
    level: 1,
    question: 'Két szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege 10?',
    options: ['1/12', '1/18', '1/11', '1/6'],
    correctAnswer: 0,
    explanation: 'Kedvező: (4; 6), (5; 5), (6; 4) – 3 eset a 36-ból: 3/36 = 1/12. (1/11 a lehetséges összegek 11 értékéből jönne – de azok nem egyformán valószínűek.)'
  },
  {
    id: 'ssp-q4',
    questionTypeBadge: 'Pénzfeldobás',
    figure: FIG_Q4,
    level: 1,
    question: 'Egy szabályos érmét háromszor feldobunk. Mennyi a valószínűsége, hogy az IFI sorozatot kapjuk?',
    options: ['1/8', '3/8', '1/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A 2³ = 8 egyformán valószínű sorozatból egy a kedvező: 1/8. (3/8 annak a valószínűsége, hogy pontosan egy fej lesz, sorrendtől függetlenül.)'
  },
  {
    id: 'ssp-q5',
    questionTypeBadge: 'Módusz',
    level: 1,
    question: 'Mennyi a 2; 4; 5; 5; 4; 2; 2; 5; 2; 4; 4; 4; 5 adatsokaság módusza?',
    options: ['4', '5', '2', '3,7'],
    correctAnswer: 0,
    explanation: 'A 4 ötször szerepel, a 2 és az 5 csak négyszer.'
  },
  {
    id: 'ssp-q6',
    questionTypeBadge: 'Komplementer',
    level: 1,
    question: 'Egy A esemény valószínűsége 0,35. Mennyi a komplementer esemény (Ā) valószínűsége?',
    options: ['0,65', '0,35', '1,35', '−0,35'],
    correctAnswer: 0,
    explanation: 'P(Ā) = 1 − P(A) = 1 − 0,35 = 0,65.'
  },
  {
    id: 'ssp-q7',
    questionTypeBadge: 'Klasszikus valószínűség',
    level: 1,
    question: 'Mennyi a valószínűsége, hogy egy véletlenszerűen választott kétjegyű szám osztható 8-cal?',
    options: ['11/90', '12/90', '1/8', '11/99'],
    correctAnswer: 0,
    explanation: 'Kétjegyű szám 90 van (10–99); a 8-cal oszthatók 16, 24, …, 96: 11 darab. P = 11/90.'
  },
  {
    id: 'ssp-q8',
    questionTypeBadge: 'Sorrend',
    level: 1,
    question: 'Klári, Eszter és Hanna véletlenszerű sorrendben érkezik. Mennyi a valószínűsége, hogy Klári hamarabb érkezik, mint Eszter?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'Szimmetria: a 3! = 6 sorrend felében Klári van előbb (3 eset): 3/6 = 1/2.'
  },
  {
    id: 'ssp-q9',
    questionTypeBadge: 'Terjedelem',
    level: 1,
    question: 'Egy dolgozat pontszámai: 16; 20; 24; 28; 28; 32; 36; 37; 38; 39; 41; 42; 43; 44; 46; 46; 47; 48; 48; 50. Mennyi a terjedelem?',
    options: ['34', '50', '16', '24'],
    correctAnswer: 0,
    explanation: 'Terjedelem = legnagyobb − legkisebb = 50 − 16 = 34. (16 a félterjedelem: 46 − 30.)'
  },
  {
    id: 'ssp-q10',
    questionTypeBadge: 'Medián',
    level: 1,
    question: 'Mennyi az előző 20 pontszám (16; 20; …; 48; 50) mediánja?',
    options: ['40', '39', '41', '37,65'],
    correctAnswer: 0,
    explanation: 'Páros elemszám: a 10. (39) és a 11. (41) adat átlaga, 40. (37,65 az átlag.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'ssp-q11',
    questionTypeBadge: 'Kvartilisek',
    level: 2,
    question: 'A 16; 20; 24; 28; 28; 32; 36; 37; 38; 39; 41; 42; 43; 44; 46; 46; 47; 48; 48; 50 adatsor alsó és felső kvartilise:',
    options: ['30 és 46', '28 és 46', '30 és 47', '24 és 46'],
    correctAnswer: 0,
    explanation: 'Alsó fél (10 adat) mediánja: az 5. és 6. adat átlaga (28 + 32)/2 = 30; felső fél: a 15. és 16. átlaga (46 + 46)/2 = 46.'
  },
  {
    id: 'ssp-q12',
    questionTypeBadge: 'Összevont átlag',
    level: 2,
    question: 'Egy 12 fős úszócsoport átlagideje 72,6 s, egy n fős csoporté 74,3 s, az összes eredmény átlaga 73,28 s. Mennyi n?',
    options: ['8', '12', '10', '6'],
    correctAnswer: 0,
    explanation: '73,28(n + 12) = 871,2 + 74,3n ⇒ 8,16 = 1,02n ⇒ n = 8.'
  },
  {
    id: 'ssp-q13',
    questionTypeBadge: 'Súlyozott átlag',
    level: 2,
    question: 'Egy 45 fős utazáson 12 pápai (átlag 48 év), 25 zirci (42 év) és a többi veszprémi (52 év). Mennyi a csoport átlagéletkora?',
    options: ['≈ 45,4 év', '≈ 47,3 év', '42 év', '≈ 44,8 év'],
    correctAnswer: 0,
    explanation: 'A veszprémiek 8-an vannak: (12 · 48 + 25 · 42 + 8 · 52)/45 = 2042/45 ≈ 45,4. (47,3 a három átlag egyszerű átlaga.)'
  },
  {
    id: 'ssp-q14',
    questionTypeBadge: 'Részcsoport átlaga',
    level: 2,
    question: 'Egy 12 fős csoport átlagéletkora 24 év, a 8 férfié 25,5 év. Mennyi a nők átlagéletkora?',
    options: ['21 év', '22,5 év', '18 év', '24 év'],
    correctAnswer: 0,
    explanation: 'Összesen 12 · 24 = 288 év, a férfiak 8 · 25,5 = 204 év, a 4 nőé 84 év ⇒ 84/4 = 21 év.'
  },
  {
    id: 'ssp-q15',
    questionTypeBadge: 'Átlag és medián',
    level: 2,
    question: 'A 42; a; 30 adatok csökkenő sorrendben vannak (30 < a < 42), és az átlaguk 2-vel nagyobb a mediánjuknál. Mennyi a?',
    options: ['33', '36', '34', '38'],
    correctAnswer: 0,
    explanation: 'A medián a. (42 + a + 30)/3 = a + 2 ⇒ 72 + a = 3a + 6 ⇒ a = 33.'
  },
  {
    id: 'ssp-q16',
    questionTypeBadge: 'Valószínűségből darabszám',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy zsákban 12 piros és 3 kék golyó van. Néhány zöldet teszünk hozzá, így egy golyót húzva 0,3 a piros valószínűsége. Hány zöld golyót tettünk be?',
    options: ['25', '40', '28', '22'],
    correctAnswer: 0,
    explanation: '12/(15 + z) = 0,3 ⇒ 15 + z = 40 ⇒ z = 25. (40 az összes golyó száma.)'
  },
  {
    id: 'ssp-q17',
    questionTypeBadge: 'Visszatevés nélkül',
    figure: FIG_Q17,
    level: 2,
    question: '3 piros és 5 sárga golyó közül egyszerre kettőt húzunk. Mennyi a valószínűsége, hogy mindkettő piros?',
    options: ['3/28', '9/64', '3/8', '1/8'],
    correctAnswer: 0,
    explanation: 'C(3; 2)/C(8; 2) = 3/28. (9/64 visszatevéses húzásnál lenne igaz.)'
  },
  {
    id: 'ssp-q18',
    questionTypeBadge: 'Összeg prím',
    level: 2,
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege prímszám?',
    options: ['5/12', '1/3', '7/18', '1/2'],
    correctAnswer: 0,
    explanation: 'Összeg 2: 1, 3: 2, 5: 4, 7: 6, 11: 2 eset ⇒ 15/36 = 5/12.'
  },
  {
    id: 'ssp-q19',
    questionTypeBadge: 'Várható érték',
    level: 2,
    question: 'Egy 4200 Ft-os részvény egy hét múlva 0,5 valószínűséggel 210 Ft-tal drágul, 0,2 valószínűséggel 400 Ft-tal olcsóbb lesz, 0,3 valószínűséggel nem változik. Mennyi a várható árfolyam?',
    options: ['4225 Ft', '4270 Ft', '4136,7 Ft', '4200 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0,5 · 4410 + 0,2 · 3800 + 0,3 · 4200 = 4225 Ft (= 4200 + 105 − 80).'
  },
  {
    id: 'ssp-q20',
    questionTypeBadge: 'Kördiagram',
    figure: FIG_Q20,
    level: 2,
    question: 'A 2; 4; 5; 5; 4; 2; 2; 5; 2; 4; 4; 4; 5 adatsort kördiagramon ábrázoljuk. Mekkora a 4-es értékhez tartozó körcikk középponti szöge?',
    options: ['≈ 138,5°', '≈ 110,8°', '120°', '≈ 27,7°'],
    correctAnswer: 0,
    explanation: 'A 13 adatból 5 darab 4-es: 5/13 · 360° ≈ 138,5°. (110,8° a 2-es és az 5-ös körcikke.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'ssp-q21',
    questionTypeBadge: 'Szórás osztályközepekkel',
    level: 3,
    question: 'Osztályközepek 18, 23, 28, 33, 38, 43, 48, gyakoriságok 2, 1, 2, 1, 4, 4, 6 (20 adat). Mennyi a szórás (az átlag 38)?',
    options: ['≈ 9,87', '97,5', '≈ 9,70', '≈ 4,94'],
    correctAnswer: 0,
    explanation: 'σ² = (2 · 400 + 225 + 2 · 100 + 25 + 0 + 4 · 25 + 6 · 100)/20 = 1950/20 = 97,5 ⇒ σ ≈ 9,87. (97,5 a szórásnégyzet; 9,70 a nyers adatok szórása.)'
  },
  {
    id: 'ssp-q22',
    questionTypeBadge: 'Várható érték',
    figure: FIG_Q22,
    level: 3,
    question: 'Két kockával dobunk; ha különbözők, a nagyobbik, ha egyenlők, a közös érték számít. Mennyi egy dobás várható értéke?',
    options: ['161/36 ≈ 4,47', '3,5', '7', '91/36 ≈ 2,53'],
    correctAnswer: 0,
    explanation: 'P(1) = 1/36, P(2) = 3/36, …, P(6) = 11/36. E = (1 + 6 + 15 + 28 + 45 + 66)/36 = 161/36 ≈ 4,47. (91/36 a kisebbik érték várható értéke.)'
  },
  {
    id: 'ssp-q23',
    questionTypeBadge: 'Visszatevés nélküli mintavétel',
    figure: FIG_Q24,
    level: 3,
    question: '20 érettségi tételből 14 magyar, 6 külföldi szerzőhöz kapcsolódik. 5-öt húzunk visszatevés nélkül. Mennyi a valószínűsége, hogy pontosan 3 magyar szerzős lesz?',
    options: ['≈ 0,352', '0,3087', '≈ 0,129', '0,6'],
    correctAnswer: 0,
    explanation: 'C(14; 3) · C(6; 2)/C(20; 5) = 364 · 15/15 504 ≈ 0,352. (0,3087 a visszatevéses eset.)'
  },
  {
    id: 'ssp-q24',
    questionTypeBadge: 'Binomiális eloszlás',
    figure: FIG_Q24,
    level: 3,
    question: 'Ugyanebből a 20 tételből (14 magyar, 6 külföldi) 5-öt húzunk úgy, hogy minden húzás után visszatesszük. Mennyi a valószínűsége, hogy pontosan 3 magyar lesz?',
    options: ['0,3087', '≈ 0,352', '0,0309', '0,1323'],
    correctAnswer: 0,
    explanation: 'p = 14/20 = 0,7; C(5; 3) · 0,7³ · 0,3² = 10 · 0,343 · 0,09 = 0,3087. (0,0309 a binomiális együttható nélkül jönne.)'
  },
  {
    id: 'ssp-q25',
    questionTypeBadge: 'Legfeljebb k',
    level: 3,
    question: 'Egy gép minden terméke 0,015 valószínűséggel selejtes. Mennyi a valószínűsége, hogy 200 termékből legfeljebb 2 selejtes?',
    options: ['≈ 0,422', '≈ 0,225', '≈ 0,578', '≈ 0,049'],
    correctAnswer: 0,
    explanation: 'P(0) + P(1) + P(2) = 0,985²⁰⁰ + 200 · 0,015 · 0,985¹⁹⁹ + C(200; 2) · 0,015² · 0,985¹⁹⁸ ≈ 0,049 + 0,148 + 0,225 ≈ 0,422. (0,225 csak P(2), 0,578 a komplementer.)'
  },
  {
    id: 'ssp-q26',
    questionTypeBadge: 'Binomiális eloszlás',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy szerencsekerék 1/3 valószínűséggel áll meg a NYERT feliratnál. 6-szor pörgetjük. Mennyi a valószínűsége, hogy pontosan 2-szer nyerünk?',
    options: ['240/729 ≈ 0,329', '16/729 ≈ 0,022', '1/3', '60/729 ≈ 0,082'],
    correctAnswer: 0,
    explanation: 'C(6; 2) · (1/3)² · (2/3)⁴ = 15 · 1/9 · 16/81 = 240/729 ≈ 0,329. (16/729 a C(6; 2) szorzó nélkül, 60/729 a felcserélt valószínűségekkel jönne.)'
  },
  {
    id: 'ssp-q27',
    questionTypeBadge: 'Binomiális eloszlás',
    level: 3,
    question: 'Egy játékban egy mezőre lépve 0,3 valószínűséggel sérülünk. 8-szor lépünk oda. Mennyi a valószínűsége, hogy pontosan 3-szor sérülünk?',
    options: ['≈ 0,254', '≈ 0,0045', '0,375', '≈ 0,136'],
    correctAnswer: 0,
    explanation: 'C(8; 3) · 0,3³ · 0,7⁵ = 56 · 0,027 · 0,16807 ≈ 0,254. (0,0045 a C(8; 3) nélkül, 0,375 = 3/8.)'
  },
  {
    id: 'ssp-q28',
    questionTypeBadge: 'Legalább egy',
    level: 3,
    question: 'Egy áramkör 0,005 valószínűséggel hibás. Legalább hány darabot kell (egymástól függetlenül) megvizsgálni, hogy 0,5-nél nagyobb legyen a valószínűsége, hogy legalább egy hibásat találunk?',
    options: ['139', '100', '138', '200'],
    correctAnswer: 0,
    explanation: '1 − 0,995ⁿ > 0,5 ⇒ 0,995ⁿ < 0,5 ⇒ n > lg 0,5/lg 0,995 ≈ 138,3 ⇒ n = 139. (100 darabnál a valószínűség csak ≈ 0,394.)'
  },
  {
    id: 'ssp-q29',
    questionTypeBadge: 'Oszthatóság kockával',
    level: 3,
    question: 'Egy kockával kétszer dobunk, a két számot egymás után írva kétjegyű számot kapunk. Mennyi a valószínűsége, hogy a szám osztható 3-mal?',
    options: ['1/3', '1/6', '5/12', '1/4'],
    correctAnswer: 0,
    explanation: 'A szám akkor osztható 3-mal, ha a jegyek összege az: 3 (2 eset), 6 (5), 9 (4), 12 (1) ⇒ 12/36 = 1/3.'
  },
  {
    id: 'ssp-q30',
    questionTypeBadge: 'Pontosan a fele',
    level: 3,
    question: 'Egy érmét 12-szer feldobunk. Mennyi a valószínűsége, hogy pontosan 6 fej lesz?',
    options: ['924/4096 ≈ 0,226', '1/2', '6/4096', '1/12'],
    correctAnswer: 0,
    explanation: 'C(12; 6)/2¹² = 924/4096 ≈ 0,226. Meglepően kicsi: a „pontosan fele-fele” csak a lehetőségek kb. 23%-a.'
  }
];

export const StatProbSummaryQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId="g12-sum-statisztika-valoszinuseg-quiz"
      subtopicId="statisztika-valoszinusegszamitas"
      title="10. Statisztika, valószínűségszámítás – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: középértékek, kvartilisek, szórás, diagramok, klasszikus valószínűség, várható érték, mintavételek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={STAT_PROB_QUESTIONS}
      cheatSheets={[
        {
          title: 'Statisztika',
          items: [
            'Átlag: Σxᵢ/n; súlyozott: Σfᵢxᵢ/Σfᵢ.',
            'Medián: rendezett sor közepe (párosnál két középső átlaga).',
            'Kvartilisek: az alsó / felső fél mediánja; félterjedelem Q₃ − Q₁.',
            'Szórás: √(Σ(xᵢ − x̄)²/n); kördiagram: relatív gyakoriság · 360°.'
          ]
        },
        {
          title: 'Valószínűség',
          items: [
            'P(A) = kedvező/összes; P(Ā) = 1 − P(A).',
            'Kizáró események: P(A + B) = P(A) + P(B).',
            'Független események: P(A · B) = P(A) · P(B).',
            'Várható érték: Σ xᵢ · pᵢ.'
          ]
        },
        {
          title: 'Mintavétel',
          items: [
            'Visszatevéssel: C(n; k) · pᵏ · (1 − p)ⁿ⁻ᵏ.',
            'Visszatevés nélkül: C(M; k) · C(N − M; n − k)/C(N; n).',
            '„Legalább egy”: 1 − P(egy sem).',
            '„Legfeljebb k”: P(0) + P(1) + … + P(k).'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatProbSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatProbSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatProbSummaryQuiz;
