import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinatoricsPracticeExamMatcher } from './CombinatoricsPracticeExamMatcher';
import { CombinatoricsPracticeExamSorter } from './CombinatoricsPracticeExamSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** Csúcsok körön, fokszám-címkékkel, élek nélkül (a kérdéses mennyiség: ?). */
const DegreeRing: React.FC<{ labels: string[]; note: string }> = ({ labels, note }) => {
  const n = labels.length;
  return (
    <svg viewBox="0 0 240 170" className={QSVG}>
      {labels.map((l, i) => {
        const t = (2 * Math.PI * i) / n - Math.PI / 2;
        const x = 120 + 62 * Math.cos(t);
        const y = 80 + 62 * Math.sin(t);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill="#eef2ff" stroke="#4f46e5" strokeWidth="2" />
            <text x={x} y={y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">
              {l}
            </text>
          </g>
        );
      })}
      <text x="120" y="86" fontSize="20" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
        ?
      </text>
      <text x="120" y="163" fontSize="10" textAnchor="middle" fill="#475569">
        {note}
      </text>
    </svg>
  );
};

/** n pont körön, opcionálisan egyetlen csúcsból kiinduló élekkel. */
const PointsOnCircle: React.FC<{ n: number; note: string; fromOne?: boolean }> = ({ n, note, fromOne = true }) => {
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n - Math.PI / 2;
    return { x: 120 + 60 * Math.cos(t), y: 80 + 60 * Math.sin(t) };
  });
  return (
    <svg viewBox="0 0 240 170" className={QSVG}>
      <circle cx="120" cy="80" r="60" fill="none" stroke="#cbd5e1" strokeDasharray="4 4" />
      {fromOne && pts.slice(1).map((p, i) => <line key={i} x1={pts[0].x} y1={pts[0].y} x2={p.x} y2={p.y} stroke="#818cf8" strokeWidth="1.5" />)}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#4f46e5" />
      ))}
      <text x="120" y="163" fontSize="10" textAnchor="middle" fill="#475569">
        {note}
      </text>
    </svg>
  );
};

/** 3 × 3-as mező (buszjegy vagy sakktábla). */
const Grid3: React.FC<{ numbers?: boolean; rook?: boolean }> = ({ numbers = true, rook = false }) => (
  <svg viewBox="0 0 240 170" className={QSVG}>
    {Array.from({ length: 9 }, (_, i) => {
      const x = 57 + (i % 3) * 42;
      const y = 15 + Math.floor(i / 3) * 42;
      const blocked = rook && (i % 3 === 0 || Math.floor(i / 3) === 0) && i !== 0;
      return (
        <g key={i}>
          <rect x={x} y={y} width="40" height="40" rx="4" fill={blocked ? '#fee2e2' : numbers ? '#fef9c3' : '#ffffff'} stroke="#a16207" strokeWidth="1.5" />
          {numbers && (
            <text x={x + 20} y={y + 26} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#713f12">
              {i + 1}
            </text>
          )}
        </g>
      );
    })}
    {rook && (
      <>
        <text x="77" y="44" fontSize="22" textAnchor="middle" fill="#0f172a">
          ♖
        </text>
        <text x="190" y="80" fontSize="11" fill="#b91c1c">
          ♜ = ?
        </text>
      </>
    )}
    <text x="120" y="160" fontSize="10" textAnchor="middle" fill="#475569">
      {rook ? 'Piros: ahová a fekete bástya nem kerülhet' : '9 mezős lyukasztó'}
    </text>
  </svg>
);

const FIG_K8 = <PointsOnCircle n={8} note="8 csúcs; egy csúcs élei berajzolva – összesen hány él?" />;
const FIG_CIRCLE7 = <PointsOnCircle n={7} fromOne={false} note="7 pont a körvonalon – hány szakasz?" />;
const FIG_TICKET = <Grid3 />;
const FIG_ROOK = <Grid3 numbers={false} rook />;
const FIG_TOAST = <DegreeRing labels={['1', '2', '2', '3', '3', '6', '6']} note="7 résztvevő – ki hány koccintást mondott" />;
const FIG_TEAM = <DegreeRing labels={['0', '1', '2', '2', '2', '5', '0', '0', '4', '4', '2']} note="11 játékos – kézfogások száma; összesen: ?" />;
const FIG_PINGPONG8 = <DegreeRing labels={['7', '7', '6', '6', '5', '5', '5', '5']} note="8 versenyző – eddig lejátszott meccsek" />;

const FIG_GROUPS = (
  <svg viewBox="0 0 240 150" className={QSVG}>
    {[0, 1].map((g) => {
      const cx = 65 + g * 110;
      const pts = [
        { x: cx, y: 35 },
        { x: cx - 30, y: 90 },
        { x: cx + 30, y: 90 }
      ];
      return (
        <g key={g}>
          <text x={cx} y="18" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
            {g === 0 ? 'I. csoport' : 'II. csoport'}
          </text>
          <line x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} stroke="#818cf8" strokeWidth="2" />
          <line x1={pts[1].x} y1={pts[1].y} x2={pts[2].x} y2={pts[2].y} stroke="#818cf8" strokeWidth="2" />
          <line x1={pts[0].x} y1={pts[0].y} x2={pts[2].x} y2={pts[2].y} stroke="#818cf8" strokeWidth="2" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="8" fill="#eef2ff" stroke="#4f46e5" strokeWidth="2" />
          ))}
        </g>
      );
    })}
    <text x="120" y="122" fontSize="11" textAnchor="middle" fill="#0f172a">
      + helyosztók: 1.–1., 2.–2., 3.–3.
    </text>
    <text x="120" y="140" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
      Összesen: ? mérkőzés
    </text>
  </svg>
);

const FIG_FAMILIES = (
  <svg viewBox="0 0 240 150" className={QSVG}>
    <rect x="15" y="20" width="85" height="100" rx="12" fill="#ecfdf5" stroke="#10b981" />
    <rect x="140" y="20" width="85" height="100" rx="12" fill="#eff6ff" stroke="#3b82f6" />
    <text x="57" y="14" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#047857">
      Tóth (5)
    </text>
    <text x="182" y="14" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">
      Lengyel (8)
    </text>
    {Array.from({ length: 5 }, (_, i) => (
      <circle key={`t${i}`} cx={35 + (i % 3) * 22} cy={45 + Math.floor(i / 3) * 40} r="7" fill="#10b981" />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <circle key={`l${i}`} cx={158 + (i % 3) * 24} cy={40 + Math.floor(i / 3) * 30} r="7" fill="#3b82f6" />
    ))}
    <line x1="100" y1="70" x2="140" y2="70" stroke="#b91c1c" strokeWidth="2" strokeDasharray="4 3" />
    <text x="120" y="62" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
      ?
    </text>
    <text x="120" y="142" fontSize="10" textAnchor="middle" fill="#475569">
      Koccintások a két család között
    </text>
  </svg>
);

const PlatePair: React.FC<{ second: string }> = ({ second }) => (
  <svg viewBox="0 0 240 130" className={QSVG}>
    {[
      { y: 15, t: 'BBB-SzSzSz' },
      { y: 70, t: second }
    ].map((p) => (
      <g key={p.t}>
        <rect x="30" y={p.y} width="180" height="40" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
        <rect x="30" y={p.y} width="18" height="40" rx="4" fill="#1d4ed8" />
        <text x="130" y={p.y + 26} fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace" fill="#0f172a">
          {p.t}
        </text>
      </g>
    ))}
    <text x="120" y="126" fontSize="10" textAnchor="middle" fill="#475569">
      B: 26-féle betű, Sz: 10-féle számjegy
    </text>
  </svg>
);

const FIG_PLATES = <PlatePair second="BB-BB-SzSzSz" />;
const FIG_PLATES_C = <PlatePair second="BB-SzSz-SzSz" />;

const FIG_KEYPAD = (
  <svg viewBox="0 0 240 170" className={QSVG}>
    <rect x="55" y="5" width="130" height="160" rx="14" fill="#1e293b" />
    {[
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', '']
    ].map((row, r) =>
      row.map((k, c) =>
        k ? (
          <g key={k}>
            <rect x={68 + c * 37} y={15 + r * 37} width="30" height="30" rx="7" fill={['#0ea5e9', '#4f46e5', '#10b981'][c]} />
            <text x={83 + c * 37} y={36 + r * 37} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#ffffff">
              {k}
            </text>
          </g>
        ) : null
      )
    )}
  </svg>
);

const FIG_FLAG = (
  <svg viewBox="0 0 240 150" className={QSVG}>
    <line x1="60" y1="10" x2="60" y2="140" stroke="#475569" strokeWidth="3" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="62" y={12 + i * 25} width="120" height="25" fill="#ffffff" stroke="#334155" />
        <text x="122" y={29 + i * 25} fontSize="12" textAnchor="middle" fill="#64748b">
          {i + 1}. sáv
        </text>
      </g>
    ))}
    <text x="120" y="135" fontSize="10" textAnchor="middle" fill="#475569">
      6 szín, kétszínű, két-két sáv azonos
    </text>
  </svg>
);

const COMBINATORICS_PRACTICE_EXAM_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapfogalmak, képletek (1–10)
  {
    id: 'cpe-q1',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'Hányféle sorrendben állhat sorba 5 különböző ember?',
    options: ['120', '25', '60', '3125'],
    correctAnswer: 0,
    explanation: '5 különböző elem sorba rendezése (permutáció): 5! = 5 · 4 · 3 · 2 · 1 = 120.'
  },
  {
    id: 'cpe-q2',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    figure: FIG_K8,
    question: 'Hány éle van egy 8 pontú teljes gráfnak?',
    options: ['28', '56', '64', '7'],
    correctAnswer: 0,
    explanation: 'A teljes gráfban bármely két csúcs között pontosan egy él fut: 8 · 7 / 2 = 28. (A 8 · 7 = 56 minden élt kétszer számol.)'
  },
  {
    id: 'cpe-q3',
    level: 1,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy gráfnak 5 csúcsa és 7 éle van. Mennyi a fokszámok összege?',
    options: ['14', '7', '12', '35'],
    correctAnswer: 0,
    explanation: 'A fokszámok összege az élek számának kétszerese: 2 · 7 = 14. A csúcsok száma ebben nem számít.'
  },
  {
    id: 'cpe-q4',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 0! értéke?',
    options: ['1', '0', 'Nincs értelmezve', '−1'],
    correctAnswer: 0,
    explanation: 'A faktoriálist technikai okokból 0-ra is értelmezzük: 0! = 1 (így pl. n alatt az n = n! / (n! · 0!) = 1).'
  },
  {
    id: 'cpe-q5',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hatan pingpongbajnokságot játszanak, mindenki mindenkivel pontosan egyszer. Hány mérkőzés lesz?',
    options: ['15', '30', '36', '12'],
    correctAnswer: 0,
    explanation: 'Annyi mérkőzés, ahányféleképpen kiválasztható 2 játékos a 6-ból: 6 alatt a 2 = 6 · 5 / 2 = 15.'
  },
  {
    id: 'cpe-q6',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'A tanár egy 17 fős csoportból 3 felelőt választ, akik írásban ugyanazt a feladatot kapják. Melyik modell illik ide?',
    options: [
      'Kombináció: nem számít a kiválasztás sorrendje',
      'Variáció: számít a kiválasztás sorrendje',
      'Ismétléses variáció: 17³',
      'Permutáció: 17!'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindhárman ugyanazt a feladatot kapják, csak az számít, kik a felelők: 17 alatt a 3 = 680.'
  },
  {
    id: 'cpe-q7',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Hányféle betűpár készíthető az angol ábécé 26 betűjéből, ha a két betű meg is egyezhet?',
    options: ['676', '650', '325', '52'],
    correctAnswer: 0,
    explanation: 'Mindkét helyre 26-féle betű kerülhet: 26² = 676. (650 = 26 · 25 akkor lenne, ha a betűk különbözők lennének.)'
  },
  {
    id: 'cpe-q8',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Mennyi egy n pontú teljes gráfban egy csúcs fokszáma?',
    options: ['n − 1', 'n', 'n(n − 1) / 2', '2n'],
    correctAnswer: 0,
    explanation: 'Minden csúcs a többi n − 1 csúccsal van összekötve. Az n(n − 1) / 2 az élek száma.'
  },
  {
    id: 'cpe-q9',
    level: 1,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Mit mondhatunk bármely gráf fokszámainak összegéről?',
    options: ['Mindig páros', 'Mindig páratlan', 'Mindig egyenlő a csúcsok számával', 'Mindig egyenlő az élek számával'],
    correctAnswer: 0,
    explanation: 'Fokszámok összege = 2 · élek száma, mert minden él két végpontjánál is beleszámít. Ezért az összeg páros.'
  },
  {
    id: 'cpe-q10',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Melyik binomiális együtthatóval egyenlő a 9 alatt az 5?',
    options: ['9 alatt a 4', '9 alatt a 6', '10 alatt az 5', '9 · 5'],
    correctAnswer: 0,
    explanation: 'Szimmetria: n alatt a k = n alatt az (n − k), így 9 alatt az 5 = 9 alatt a 4 = 126.'
  },

  // LEVEL 2: A gyakorló feladatok és a Tudáspróba I. (11–20)
  {
    id: 'cpe-q11',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Hányféle sorrendben ülhet egy padra 8 gyerek, ha közülük Zsófi a pad egyik szélén ül?',
    options: ['10 080', '5040', '40 320', '1440'],
    correctAnswer: 0,
    explanation: 'Zsófi 2 szélső hely közül választhat, a többi 7 gyerek 7! = 5040-féleképpen ülhet: 2 · 5040 = 10 080.'
  },
  {
    id: 'cpe-q12',
    level: 2,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány négyjegyű páros szám van, amelyben nem szerepel a 7-es számjegy?',
    options: ['3240', '3645', '2880', '4500'],
    correctAnswer: 0,
    explanation: 'Első jegy: 1–9 a 7 kivételével, 8-féle; a 2. és 3. jegy 9-féle (0–9, 7 nélkül); az utolsó páros: 5-féle. 8 · 9 · 9 · 5 = 3240.'
  },
  {
    id: 'cpe-q13',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Hányféleképpen választható ki november hónapban három nap gyümölcsnapnak?',
    options: ['4060', '24 360', '27 000', '90'],
    correctAnswer: 0,
    explanation: 'November 30 napos, a sorrend nem számít: 30 alatt a 3 = 30 · 29 · 28 / 6 = 4060.'
  },
  {
    id: 'cpe-q14',
    level: 2,
    questionTypeBadge: 'Ismétléses variáció',
    figure: FIG_PLATES,
    question: 'Hányszor annyi BB-BB-SzSzSz felépítésű rendszám készíthető, mint BBB-SzSzSz felépítésű? (26 betű, 10 számjegy, ismétlődhetnek.)',
    options: ['26-szor annyi', '10-szer annyi', '2,6-szer annyi', '260-szor annyi'],
    correctAnswer: 0,
    explanation: '26⁴ · 10³ : (26³ · 10³) = 26. Egy plusz betűhely 26-szorosára növeli a lehetőségeket.'
  },
  {
    id: 'cpe-q15',
    level: 2,
    questionTypeBadge: 'Kombináció',
    figure: FIG_TICKET,
    question: 'A 9 mezős buszjegyen hány olyan lyukasztás van, amelyben legalább 2 és legfeljebb 5 lyuk van?',
    options: ['372', '246', '498', '510'],
    correctAnswer: 0,
    explanation: '9 alatt a 2 + 9 alatt a 3 + 9 alatt a 4 + 9 alatt az 5 = 36 + 84 + 126 + 126 = 372.'
  },
  {
    id: 'cpe-q16',
    level: 2,
    questionTypeBadge: 'Gráf',
    figure: FIG_TOAST,
    question: 'Lehetséges-e, hogy egy 7 fős társaságban a résztvevők rendre 1; 2; 2; 3; 3; 6; 6 másik résztvevővel koccintottak?',
    options: [
      'Nem, mert a fokszámok összege 23, ami páratlan',
      'Igen, mert minden szám legfeljebb 6',
      'Igen, mert 7 csúcsú gráfban lehet 6-os fokszám',
      'Nem, mert két embernek nem lehet ugyanannyi koccintása'
    ],
    correctAnswer: 0,
    explanation: 'A koccintások száma a fokszámok összegének fele lenne, de 23 páratlan. (A két 6-os fokú ember miatt mindenkinek legalább 2 koccintása lenne – az 1-es is ellentmondás.)'
  },
  {
    id: 'cpe-q17',
    level: 2,
    questionTypeBadge: 'Variáció',
    question: 'Hányféleképpen választhat a tanár 3 felelőt egy 17 fős csoportból, ha szóban felelnek, és mindenki más feladatot kap?',
    options: ['4080', '680', '4913', '51'],
    correctAnswer: 0,
    explanation: 'Számít, ki melyik feladatot kapja: 17 · 16 · 15 = 4080. (680 az ugyanazt a feladatot kapó esetre, 17³ pedig ismétléssel lenne.)'
  },
  {
    id: 'cpe-q18',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Négy barát egymás melletti moziszékekre ül, de Hajni és Bence nem akar egymás mellé ülni. Hányféleképpen ülhetnek le?',
    options: ['12', '24', '6', '18'],
    correctAnswer: 0,
    explanation: 'Összes: 4! = 24. Egymás mellett: összeragasztva 3! · 2 = 12. Nem egymás mellett: 24 − 12 = 12.'
  },
  {
    id: 'cpe-q19',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    figure: FIG_TEAM,
    question: 'A focicsapat 11 játékosának kézfogás-számai: 0; 1; 2; 2; 2; 5; 0; 0; 4; 4; 2. Hány kézfogás történt?',
    options: ['11', '22', '44', '10'],
    correctAnswer: 0,
    explanation: 'A számok összege 22, és minden kézfogást két játékos is beszámolt: 22 : 2 = 11.'
  },
  {
    id: 'cpe-q20',
    level: 2,
    questionTypeBadge: 'Teljes gráf',
    figure: FIG_GROUPS,
    question: 'Hat játékos két háromfős csoportban körmérkőzést játszik, majd a csoportelsők, a második helyezettek és a harmadikok is játszanak egymással. Hány mérkőzés lesz?',
    options: ['9', '15', '6', '12'],
    correctAnswer: 0,
    explanation: 'Csoportonként 3 alatt a 2 = 3 meccs, ez 6; utána 3 helyosztó: 6 + 3 = 9.'
  },

  // LEVEL 3: Tudáspróba II. és érettségi feladatok (21–30)
  {
    id: 'cpe-q21',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelynek 171 éle van?',
    options: ['19', '18', '20', '13'],
    correctAnswer: 0,
    explanation: 'n(n − 1) / 2 = 171 ⇒ n(n − 1) = 342 = 19 · 18 ⇒ n = 19. (18 pontú teljes gráfnak csak 153 éle van.)'
  },
  {
    id: 'cpe-q22',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelyben a fokszámok összege 210?',
    options: ['15', '14', '21', '105'],
    correctAnswer: 0,
    explanation: 'Az élek száma 210 : 2 = 105. n(n − 1) / 2 = 105 ⇒ n(n − 1) = 210 = 15 · 14 ⇒ n = 15.'
  },
  {
    id: 'cpe-q23',
    level: 3,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Egy 10 kérdéses teszt minden kérdésére 4 válasz közül egyet kell bekarikázni, üresen nem hagyható. Hány különböző kitöltés van?',
    options: ['4¹⁰ = 1 048 576', '10⁴ = 10 000', '4 · 10 = 40', '10 alatt a 4 = 210'],
    correctAnswer: 0,
    explanation: 'Mind a 10 kérdésnél 4-féle választás van, egymástól függetlenül: 4¹⁰ = 1 048 576 (ismétléses variáció).'
  },
  {
    id: 'cpe-q24',
    level: 3,
    questionTypeBadge: 'Esetszámlálás',
    question: 'Ugyanebben a tesztben hány olyan kitöltés van, amelyben pontosan egy válasz hibás, a többi helyes?',
    options: ['30', '10', '40', '19 683'],
    correctAnswer: 0,
    explanation: 'A hibás kérdés 10-féle lehet, ott 3 rossz válasz közül választunk, a többi helyen 1-féle (helyes): 10 · 3 = 30.'
  },
  {
    id: 'cpe-q25',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Egy 27 fős osztályban 15 lány van. Hányféleképpen állítható össze öttagú küldöttség úgy, hogy legyen benne fiú?',
    options: ['77 727', '80 730', '79 938', '792'],
    correctAnswer: 0,
    explanation: 'Komplementerrel: összes − csak lányok = 27 alatt az 5 − 15 alatt az 5 = 80 730 − 3003 = 77 727. (79 938 a „legyen lány” eset.)'
  },
  {
    id: 'cpe-q26',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Hány hatjegyű páros szám van, amelyben előfordul a 0 számjegy?',
    options: ['213 804', '236 196', '450 000', '225 000'],
    correctAnswer: 0,
    explanation: 'Összes hatjegyű páros: 9 · 10⁴ · 5 = 450 000. 0 nélküli: 9⁵ · 4 = 236 196. A különbség: 213 804.'
  },
  {
    id: 'cpe-q27',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    figure: FIG_KEYPAD,
    question: 'Zsuzsi hétjegyű, különböző jegyekből álló, nem 0-val kezdődő telefonszámát két billentyűoszlop számaival lehet beütni: előbb az egyik oszlop számait valamilyen sorrendben, aztán a másikét. Hány ilyen szám lehet?',
    options: ['504', '576', '288', '5040'],
    correctAnswer: 0,
    explanation: 'Csak a {2; 5; 8; 0} és egy 3 elemű oszlop jöhet szóba. Középső elöl: (4! − 3!) · 3! · 2 = 216; szélső elöl: 3! · 4! · 2 = 288. Összesen 504. (576 jönne ki, ha megengednénk a 0-val kezdést.)'
  },
  {
    id: 'cpe-q28',
    level: 3,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Az okmányazonosító 6 számjegyből (0–9) és utána 2 betűből (26-féle) áll. Hány különböző azonosító készíthető?',
    options: ['676 000 000', '608 400 000', '52 000 000', '100 000 000'],
    correctAnswer: 0,
    explanation: '10⁶ · 26² = 1 000 000 · 676 = 676 000 000 – bőven elég 10 millió embernek. (608 400 000 akkor jönne ki, ha az első jegy nem lehetne 0.)'
  },
  {
    id: 'cpe-q29',
    level: 3,
    questionTypeBadge: 'Ismétléses variáció',
    figure: FIG_PLATES_C,
    question: 'Hányszorosa a BB-SzSz-SzSz felépítésű rendszámok száma a BBB-SzSzSz felépítésűekének?',
    options: ['10/26 ≈ 0,38-szorosa', '2,6-szerese', 'Ugyanannyi', '26-szorosa'],
    correctAnswer: 0,
    explanation: '26² · 10⁴ : (26³ · 10³) = 10 / 26 ≈ 0,38 – egy betűhelyet számjegyre cserélve kevesebb rendszám lesz.'
  },
  {
    id: 'cpe-q30',
    level: 3,
    questionTypeBadge: 'Szimmetria',
    figure: FIG_TICKET,
    question: 'A 3 × 3-as, 9 mezős buszjegyen hány olyan lyukasztás van, amely 5 lyukkal középpontosan szimmetrikus?',
    options: ['6', '126', '4', '10'],
    correctAnswer: 0,
    explanation: 'A középső mező a tükrözés középpontja – 5 (páratlan) lyuk esetén biztosan lyukas. A maradék 4 lyuk 2 szimmetrikus pár a 4 párból: 4 alatt a 2 = 6.'
  },

  // LEVEL 1 (folytatás): a fejezet alapfeladatai, 1–9. lecke (31–50)
  {
    id: 'cpe-q31',
    level: 1,
    questionTypeBadge: 'Jelszó',
    question: 'Bendi jelszava a {B; e; n; 1; 7} karakterekből áll, 3 különböző karakterből. Hány ilyen jelszó lehet?',
    options: ['60', '125', '10', '15'],
    correctAnswer: 0,
    explanation: '„Rekeszekkel”: az első karakter 5-, a második 4-, a harmadik 3-féle: 5 · 4 · 3 = 60.'
  },
  {
    id: 'cpe-q32',
    level: 1,
    questionTypeBadge: 'Jelszó',
    question: 'Hány 3 karakteres jelszó készíthető a {B; e; n; 1; 7} karakterekből, ha a karakterek ismétlődhetnek?',
    options: ['125', '60', '15', '243'],
    correctAnswer: 0,
    explanation: 'Mindhárom helyre 5-féle karakter kerülhet: 5 · 5 · 5 = 5³ = 125.'
  },
  {
    id: 'cpe-q33',
    level: 1,
    questionTypeBadge: 'Jelszó',
    question: 'Csilla minden jelszava 10 karakter hosszú, és a karakterek a {C; a} halmazból kerülnek ki. Hány jelszót készíthet?',
    options: ['1024', '20', '100', '512'],
    correctAnswer: 0,
    explanation: 'Mind a 10 helyre 2-féle karakter kerülhet: 2¹⁰ = 1024.'
  },
  {
    id: 'cpe-q34',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Egy 6 kérdéses teszt minden kérdésénél az A, B, C, D betűk közül kell egyet bekarikázni. Hány kitöltés van, ha minden kérdésre válaszolunk?',
    options: ['4096', '24', '1296', '360'],
    correctAnswer: 0,
    explanation: 'Mind a 6 kérdésnél 4-féle válasz: 4⁶ = 4096. (6⁴ = 1296 a kitevő és az alap felcserélése.)'
  },
  {
    id: 'cpe-q35',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Mit jelent az, hogy „számít a kiválasztás sorrendje”?',
    options: [
      'A kiválasztott elemek különböző szerepbe kerülnek (sorrendjük van, más feladatot kapnak, más nyereményt nyernek)',
      'Az elemeknek van sorszáma',
      'Egy elemet többször is kiválaszthatunk',
      'Az összes elemet ki kell választani'
    ],
    correctAnswer: 0,
    explanation: 'Ha a kiválasztott elemek felcserélése más esetet ad (pl. jelszó, sorban állás, különböző feladatok), akkor számít a sorrend.'
  },
  {
    id: 'cpe-q36',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Hány 4 elemű részhalmaza van a 9 elemű H = {a; b; c; d; e; f; g; h; i} halmaznak?',
    options: ['126', '3024', '36', '252'],
    correctAnswer: 0,
    explanation: '9 · 8 · 7 · 6 = 3024 sorrendben kiválasztás, de minden részhalmazt 4! = 24-szer számoltunk: 3024 : 24 = 126.'
  },
  {
    id: 'cpe-q37',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi a 10 alatt a 3 értéke?',
    options: ['120', '720', '30', '1000'],
    correctAnswer: 0,
    explanation: '10 alatt a 3 = 10 · 9 · 8 / 3! = 720 / 6 = 120.'
  },
  {
    id: 'cpe-q38',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi az n alatt a 0 értéke (n természetes szám)?',
    options: ['1', '0', 'n', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Egy n elemű halmaznak pontosan egy 0 elemű részhalmaza van, az üres halmaz: n alatt a 0 = 1.'
  },
  {
    id: 'cpe-q39',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    question: 'Összesen hány részhalmaza van egy 7 elemű halmaznak?',
    options: ['128', '49', '127', '5040'],
    correctAnswer: 0,
    explanation: 'Minden elemről eldöntjük, benne van-e: 2⁷ = 128 (az üres halmazt és magát a halmazt is beleértve).'
  },
  {
    id: 'cpe-q40',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Anita sálján 7 szemenként ismétlődik a minta: 3 sima és 4 fordított szem. Hányféle minta közül választhat?',
    options: ['35', '210', '21', '128'],
    correctAnswer: 0,
    explanation: 'A 7 hely közül kiválasztjuk a 3 sima szem helyét: 7 alatt a 3 = 7 · 6 · 5 / 6 = 35.'
  },
  {
    id: 'cpe-q41',
    level: 1,
    questionTypeBadge: 'Kombináció',
    figure: FIG_CIRCLE7,
    question: 'Egy körvonalon 7 pontot veszünk fel, és mindegyiket összekötjük mindegyikkel. Hány szakaszt rajzolunk?',
    options: ['21', '42', '49', '14'],
    correctAnswer: 0,
    explanation: 'A szakasz két végpontjának sorrendje nem számít: 7 alatt a 2 = 7 · 6 / 2 = 21.'
  },
  {
    id: 'cpe-q42',
    level: 1,
    questionTypeBadge: 'Variáció',
    question: '7 ember közül mindenki mindenkinek küld egy SMS-t. Összesen hány üzenetet küldenek?',
    options: ['42', '21', '49', '14'],
    correctAnswer: 0,
    explanation: 'Itt számít az irány (ki küldi, ki kapja): 7 · 6 = 42. A kézfogásnál lenne 21.'
  },
  {
    id: 'cpe-q43',
    level: 1,
    questionTypeBadge: 'Gráf',
    question: 'Mennyivel növeli egy hurokél a csúcs fokszámát?',
    options: ['2-vel', '1-gyel', '0-val', '3-mal'],
    correctAnswer: 0,
    explanation: 'A hurokél kezdő- és végpontja ugyanaz a csúcs, ezért kétszer számít bele a fokszámba.'
  },
  {
    id: 'cpe-q44',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 6! értéke?',
    options: ['720', '36', '120', '21'],
    correctAnswer: 0,
    explanation: '6! = 6 · 5 · 4 · 3 · 2 · 1 = 720. (21 = 1 + 2 + … + 6, 36 = 6².)'
  },
  {
    id: 'cpe-q45',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 10! : 9! értéke?',
    options: ['10', '1', '9', '90'],
    correctAnswer: 0,
    explanation: '10! = 10 · 9!, ezért 10! : 9! = 10.'
  },
  {
    id: 'cpe-q46',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'A 4 × 100-as gyorsváltó döntőjébe 4 csapat jutott. Hányféle sorrend lehet közöttük (holtverseny nélkül)?',
    options: ['24', '16', '12', '4'],
    correctAnswer: 0,
    explanation: '4 csapat sorba rendezése: 4! = 24.'
  },
  {
    id: 'cpe-q47',
    level: 1,
    questionTypeBadge: 'Gráf',
    question: 'Mit nevezünk egy gráfban egy csúcs fokszámának?',
    options: [
      'Az adott csúcsból kiinduló élek számát',
      'A gráf csúcsainak számát',
      'A gráf éleinek számát',
      'A csúcs sorszámát'
    ],
    correctAnswer: 0,
    explanation: 'Csúcs fokszáma: az adott csúcsból kiinduló élek száma (a hurokél 2-t ér).'
  },
  {
    id: 'cpe-q48',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Mikor nevezünk egy gráfot teljes gráfnak?',
    options: [
      'Ha bármely két csúcsa között pontosan egy él fut',
      'Ha minden csúcsának van legalább egy éle',
      'Ha minden csúcsa páros fokú',
      'Ha nincs benne hurokél'
    ],
    correctAnswer: 0,
    explanation: 'Teljes gráf: bármely két csúcs között pontosan egy él van, így n csúcs esetén n(n − 1) / 2 éle van.'
  },
  {
    id: 'cpe-q49',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Az ötös lottón 90 számból kell 5-öt megjelölni. Hány különböző szelvény tölthető ki?',
    options: ['90 alatt az 5', '90⁵', '90 · 89 · 88 · 87 · 86', '5⁹⁰'],
    correctAnswer: 0,
    explanation: 'A megjelölés sorrendje nem számít: 90 alatt az 5 = 43 949 268. A 90 · 89 · 88 · 87 · 86 minden szelvényt 5! = 120-szor számolna.'
  },
  {
    id: 'cpe-q50',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Egy eljegyzésen a Tóth család 5 tagja mind koccint egymással, mindenki mindenkivel egyszer. Hány koccintás történik közöttük?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: '5 alatt a 2 = 5 · 4 / 2 = 10 – az 5 pontú teljes gráf élei.'
  },

  // LEVEL 2 (folytatás): tankönyvi alkalmazások, 1–9. lecke (51–70)
  {
    id: 'cpe-q51',
    level: 2,
    questionTypeBadge: 'Jelszó',
    question: 'Hajni a {H; a; j; n; i; 1; 9} halmaz elemeiből 4 karakteres jelszót készít úgy, hogy nincs két egyforma karakter. Hány jelszó lehet?',
    options: ['840', '2401', '35', '28'],
    correctAnswer: 0,
    explanation: '7 · 6 · 5 · 4 = 840. (7⁴ = 2401 ismétléssel, 7 alatt a 4 = 35 sorrend nélkül lenne.)'
  },
  {
    id: 'cpe-q52',
    level: 2,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'A budapesti telefonszámok hétjegyűek, és nem kezdődhetnek 0-val. Hány ilyen telefonszám létezhet?',
    options: ['9 000 000', '10 000 000', '544 320', '4 782 969'],
    correctAnswer: 0,
    explanation: 'Első jegy 9-féle, a többi 6 jegy 10-10-féle: 9 · 10⁶ = 9 000 000. (A jegyek ismétlődhetnek.)'
  },
  {
    id: 'cpe-q53',
    level: 2,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány olyan négyjegyű szám van, amelyben minden számjegy különböző?',
    options: ['4536', '5040', '3024', '9000'],
    correctAnswer: 0,
    explanation: 'Az első jegy 9-féle (nem 0), a második 9-féle (0 már lehet), majd 8 és 7: 9 · 9 · 8 · 7 = 4536.'
  },
  {
    id: 'cpe-q54',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'A cirkuszban 5 állat vonul egymás után. Hány olyan sorrend van, amelyben a tigris és az oroszlán közvetlenül egymás után következik?',
    options: ['48', '24', '72', '96'],
    correctAnswer: 0,
    explanation: 'A két állatot egy „objektumnak” tekintve 4! = 24 sorrend, és kettőjük sorrendje 2-féle: 2 · 24 = 48.'
  },
  {
    id: 'cpe-q55',
    level: 2,
    questionTypeBadge: 'Körös sorrend',
    question: 'Az 5 állat körben vonul be, és egyiküket sem tekintjük „elsőnek”. Hány lényegében különböző sorrend van?',
    options: ['24', '120', '60', '5'],
    correctAnswer: 0,
    explanation: 'A 120 sorrendből mindegyik kör ötször szerepel (az 5 elforgatás ugyanaz): 120 : 5 = 24.'
  },
  {
    id: 'cpe-q56',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Öttusa (érettségi, 2015): Ádám előbb az 5 A, majd a 4 B, végül a 3 C típusú akadályon ugrat át, típuson belül szabad sorrendben. Hányféle sorrend lehet?',
    options: ['17 280', '479 001 600', '150', '60'],
    correctAnswer: 0,
    explanation: 'A csoportok sorrendje rögzített, a csoportokon belül 5!, 4!, 3!: 120 · 24 · 6 = 17 280. (12! akkor lenne, ha nem lenne megkötés.)'
  },
  {
    id: 'cpe-q57',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Három fiú és három lány úgy ül le 6 egymás melletti székre, hogy lány, fiú, lány, fiú, lány, fiú legyen a sorrend. Hányféleképpen tehetik?',
    options: ['36', '720', '72', '18'],
    correctAnswer: 0,
    explanation: 'A lányok a 3 „lányhelyen” 3!-, a fiúk a 3 „fiúhelyen” 3!-féleképpen ülhetnek: 6 · 6 = 36.'
  },
  {
    id: 'cpe-q58',
    level: 2,
    questionTypeBadge: 'Permutáció',
    question: 'Egy tánciskolában 7 fiú és 7 lány alkot 7 táncoló párt. Hányféleképpen lehetséges ez?',
    options: ['5040', '49', '14', '10 080'],
    correctAnswer: 0,
    explanation: 'Sorba állítjuk a lányokat, és melléjük rendeljük a fiúkat: 7! = 5040. (2 · 7! duplán számolna.)'
  },
  {
    id: 'cpe-q59',
    level: 2,
    questionTypeBadge: 'Variáció',
    question: 'Egy gyorsvasúthálózatnak 35 állomása van, a jegyre a kiinduló- és a célállomás is rákerül. Hányféle jegy létezik?',
    options: ['1190', '595', '1225', '70'],
    correctAnswer: 0,
    explanation: 'Számít, melyik a kiinduló és melyik a cél: 35 · 34 = 1190. (Különböző árú jegyből legfeljebb 35 alatt a 2 = 595 lehet.)'
  },
  {
    id: 'cpe-q60',
    level: 2,
    questionTypeBadge: 'Variáció',
    question: 'A nagyszülők 9 unokájuk közül 3-at hívnak korábban, mindegyik más feladatban segít. Hányféleképpen választhatók ki?',
    options: ['504', '84', '729', '27'],
    correctAnswer: 0,
    explanation: 'Különböző feladatok ⇒ számít a sorrend: 9 · 8 · 7 = 504.'
  },
  {
    id: 'cpe-q61',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'A 9 unoka közül 3-an közösen főzik meg a paprikás krumplit. Hányféleképpen választható ki a 3 unoka?',
    options: ['84', '504', '27', '729'],
    correctAnswer: 0,
    explanation: 'Ugyanazt a feladatot kapják ⇒ nem számít a sorrend: 9 alatt a 3 = 504 : 6 = 84.'
  },
  {
    id: 'cpe-q62',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Egy 12 fős társaság érkezik a lifthez, amelyben egyszerre 4 ember utazhat. Hányféle lehet az első utazó négyes?',
    options: ['495', '11 880', '48', '3'],
    correctAnswer: 0,
    explanation: 'A négyesen belül nincs sorrend: 12 alatt a 4 = 11 880 : 24 = 495.'
  },
  {
    id: 'cpe-q63',
    level: 2,
    questionTypeBadge: 'Variáció',
    question: 'Két különböző nyereményt sorsolnak ki egy parti 90 résztvevője között, és mindenki legfeljebb egyet nyerhet. Hányféle lehet az eredmény?',
    options: ['8010', '4005', '8100', '180'],
    correctAnswer: 0,
    explanation: 'Különböző nyeremények ⇒ számít a sorrend: 90 · 89 = 8010. (Egyforma nyereményeknél 4005, ismétléssel 8100.)'
  },
  {
    id: 'cpe-q64',
    level: 2,
    questionTypeBadge: 'Ismétléses permutáció',
    question: 'Hányféle sorrendben rakható sorba 3 egyforma piros és 5 egyforma sárga golyó?',
    options: ['56', '40 320', '336', '15'],
    correctAnswer: 0,
    explanation: 'A 8 hely közül kiválasztjuk a 3 piros helyét: 8 alatt a 3 = 56 (= 8 alatt az 5).'
  },
  {
    id: 'cpe-q65',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'A 32 lapos magyar kártyából 3 lapot osztanak nekünk. Hányféle lehet a kezdő 3 lap?',
    options: ['4960', '29 760', '32 768', '96'],
    correctAnswer: 0,
    explanation: 'A kézben a lapok sorrendje nem számít: 32 alatt a 3 = 32 · 31 · 30 / 6 = 4960.'
  },
  {
    id: 'cpe-q66',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Csilla 15 színből 4 különböző színt választ egy karkötőhöz. Hányféleképpen teheti meg?',
    options: ['1365', '32 760', '50 625', '60'],
    correctAnswer: 0,
    explanation: '15 alatt a 4 = 15 · 14 · 13 · 12 / 24 = 1365.'
  },
  {
    id: 'cpe-q67',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Egy nappaliban 7 külön kapcsolható lámpa van. Hányféleképpen valósulhat meg, hogy legalább 5 lámpa világít?',
    options: ['29', '21', '128', '35'],
    correctAnswer: 0,
    explanation: 'Esetszétválasztás: 7 alatt az 5 + 7 alatt a 6 + 7 alatt a 7 = 21 + 7 + 1 = 29.'
  },
  {
    id: 'cpe-q68',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'A vetélkedő 6 fős zsűrijét 5 tanár és 8 diák közül választják úgy, hogy 3 tanár és 3 diák legyen benne. Hányféleképpen lehet?',
    options: ['560', '1716', '66', '280'],
    correctAnswer: 0,
    explanation: 'A tanárok és a diákok kiválasztása független, ezért szorzunk: 5 alatt a 3 · 8 alatt a 3 = 10 · 56 = 560.'
  },
  {
    id: 'cpe-q69',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'A gyorsváltó döntőjében 4 csapat versenyez. Hányféle sorrend lehet, ha tudjuk, hogy a Delfinek nem lesznek a negyedikek?',
    options: ['18', '24', '6', '12'],
    correctAnswer: 0,
    explanation: 'Összes 4! = 24, ebből a Delfinek negyedikek 3! = 6 esetben: 24 − 6 = 18.'
  },
  {
    id: 'cpe-q70',
    level: 2,
    questionTypeBadge: 'Gráf',
    figure: FIG_FAMILIES,
    question: 'Az eljegyzésen a Tóth családból 5-en, a Lengyel családból 8-an vannak, mindenki mindenkivel koccint. Hány koccintás történik a két család tagjai között?',
    options: ['40', '13', '78', '38'],
    correctAnswer: 0,
    explanation: 'Minden Tóth minden Lengyellel koccint: 5 · 8 = 40. (78 az összes koccintás, 38 = 10 + 28 a családokon belüli.)'
  },

  // LEVEL 3 (folytatás): esetszétválasztás, összetett és érettségi feladatok (71–90)
  {
    id: 'cpe-q71',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Hányféleképpen osztható ki 3 egyforma jutalom 12 diák között, ha egy diák több jutalmat is kaphat?',
    options: ['364', '220', '1728', '1320'],
    correctAnswer: 0,
    explanation: 'Esetek: egy diák kapja mindet: 12; egy diák egyet, egy másik kettőt: 12 · 11 = 132; három diák: 12 alatt a 3 = 220. Összesen 364.'
  },
  {
    id: 'cpe-q72',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Egy 10 fős társaságban 3 egyforma csokoládét sorsolnak ki. Hányféle eredmény lehet, ha pontosan ketten nyernek csokoládét?',
    options: ['90', '45', '720', '120'],
    correctAnswer: 0,
    explanation: 'Valaki 2 csokit, valaki más 1-et nyer – különböző szerepek: 10 · 9 = 90.'
  },
  {
    id: 'cpe-q73',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Ugyanebben a sorsolásban (10 fő, 3 egyforma csoki) hányféle eredmény lehet, ha nincs semmi kikötés?',
    options: ['220', '1000', '120', '720'],
    correctAnswer: 0,
    explanation: 'Esetszétválasztás: egy ember nyer mindet: 10; ketten nyernek: 90; hárman nyernek: 10 alatt a 3 = 120. Összesen 220.'
  },
  {
    id: 'cpe-q74',
    level: 3,
    questionTypeBadge: 'Variáció',
    figure: FIG_ROOK,
    question: 'Egy 3 × 3-as tábla mezőire egy fehér és egy fekete bástyát teszünk úgy, hogy ne legyenek azonos sorban vagy oszlopban. Hányféleképpen lehet?',
    options: ['36', '72', '18', '81'],
    correctAnswer: 0,
    explanation: 'A fehér bástya 9 mezőre kerülhet; a fekete nem lehet a sorában és oszlopában, így 4 mező marad: 9 · 4 = 36.'
  },
  {
    id: 'cpe-q75',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'És ha a két bástya egyforma (nem üthetik egymást a 3 × 3-as táblán)?',
    options: ['18', '36', '9', '72'],
    correctAnswer: 0,
    explanation: 'Az előző 36 esetben minden elhelyezést kétszer számoltunk (a két bástya felcserélése), ezért 36 : 2 = 18.'
  },
  {
    id: 'cpe-q76',
    level: 3,
    questionTypeBadge: 'Színezés',
    figure: FIG_FLAG,
    question: 'Egy négysávos zászlót 6 színből kétszínűre színezünk úgy, hogy két-két sáv azonos színű. Hányféle zászló lehet?',
    options: ['90', '30', '180', '45'],
    correctAnswer: 0,
    explanation: 'A felső sávval azonos színű sáv 3-féle lehet; a két sávpárra 6 · 5 = 30 színezés: 3 · 30 = 90.'
  },
  {
    id: 'cpe-q77',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Szökőkút (érettségi, 2014): 6 vízsugár kék, piros vagy sárga, három-három azonos színű, de nem mind a hat. Hányféle látvány lehet?',
    options: ['60', '20', '120', '729'],
    correctAnswer: 0,
    explanation: 'A két szín kiválasztása 3 alatt a 2 = 3; az egyik szín 3 helye 6 alatt a 3 = 20-féle: 3 · 20 = 60.'
  },
  {
    id: 'cpe-q78',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Fagylaltozó (érettségi, 2018): 6 íz közül háromgombócos, pontosan kétféle ízű fagylalt, és számít a gombócok sorrendje. Hányféle lehet?',
    options: ['90', '30', '15', '120'],
    correctAnswer: 0,
    explanation: 'Két íz: 6 alatt a 2 = 15. Ezekből 3 gombócos sorrend 2³ − 2 = 6 (kivéve az egyízűeket): 15 · 6 = 90.'
  },
  {
    id: 'cpe-q79',
    level: 3,
    questionTypeBadge: 'Színezés',
    question: 'Kitűző (érettségi, 2012): 3 mező, 5 szín, a mezők lehetnek azonos színűek. Hány kétszínű kitűző készíthető?',
    options: ['60', '30', '20', '125'],
    correctAnswer: 0,
    explanation: 'A két szín 5 alatt a 2 = 10-féle; a 3 mező kétszínű színezése 2³ − 2 = 6: 10 · 6 = 60.'
  },
  {
    id: 'cpe-q80',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Hány 3 találatos szelvény létezik az ötös lottón egy adott héten?',
    options: ['35 700', '3570', '357 000', '10'],
    correctAnswer: 0,
    explanation: 'Az 5 kihúzott számból 3 eltalált: 5 alatt a 3 = 10; a 85 ki nem húzottból 2: 85 alatt a 2 = 3570. Szorzat: 35 700.'
  },
  {
    id: 'cpe-q81',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'A hatos lottón 45 számból 6-ot kell megjelölni. Hány különböző szelvény tölthető ki?',
    options: ['8 145 060', '43 949 268', '5 864 443 200', '8 303 765 625'],
    correctAnswer: 0,
    explanation: '45 alatt a 6 = 45 · 44 · 43 · 42 · 41 · 40 / 720 = 8 145 060. A telitalálat esélye kb. 1 : 8,1 millió.'
  },
  {
    id: 'cpe-q82',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'A 12 fős társaság 3 menetben, menetenként 4 fővel megy fel a lifttel. Hányféleképpen történhet ez?',
    options: ['34 650', '495', '1485', '479 001 600'],
    correctAnswer: 0,
    explanation: '12 alatt a 4 · 8 alatt a 4 · 4 alatt a 4 = 495 · 70 · 1 = 34 650 (a menetek sorrendje számít).'
  },
  {
    id: 'cpe-q83',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Egy 15 fős társaság egy 4, egy 5 és egy 6 személyes autóval kirándul. Hányféle beosztás van, ha az autókon belül az ülésrend lényegtelen?',
    options: ['630 630', '1 307 674 368 000', '1365', '5005'],
    correctAnswer: 0,
    explanation: '15 alatt a 4 · 11 alatt az 5 · 6 alatt a 6 = 1365 · 462 · 1 = 630 630.'
  },
  {
    id: 'cpe-q84',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'A 0, 1, …, 9 számjegykártyák sorba rakásai közül hány határoz meg tízjegyű számot?',
    options: ['3 265 920', '3 628 800', '362 880', '9 000 000 000'],
    correctAnswer: 0,
    explanation: 'Összes 10! = 3 628 800, ebből 9! = 362 880 kezdődik 0-val: 10! − 9! = 9 · 9! = 3 265 920.'
  },
  {
    id: 'cpe-q85',
    level: 3,
    questionTypeBadge: 'Oszthatóság',
    question: 'Az előző tízjegyű számok közül hány osztható 3-mal?',
    options: ['Mind a 3 265 920', '1 088 640', '362 880', 'Egyik sem'],
    correctAnswer: 0,
    explanation: 'Minden ilyen számban a jegyek összege 0 + 1 + … + 9 = 45, ami osztható 3-mal – tehát az összes osztható 3-mal.'
  },
  {
    id: 'cpe-q86',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelynek 36 éle van?',
    options: ['9', '6', '8', '18'],
    correctAnswer: 0,
    explanation: 'n(n − 1) / 2 = 36 ⇒ n(n − 1) = 72 = 9 · 8 ⇒ n = 9.'
  },
  {
    id: 'cpe-q87',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelyben a fokszámok összege 156?',
    options: ['13', '12', '78', '39'],
    correctAnswer: 0,
    explanation: 'Élek száma 156 : 2 = 78 = n(n − 1) / 2 ⇒ n(n − 1) = 156 = 13 · 12 ⇒ n = 13. (Teljes gráfban a fokszámösszeg közvetlenül n(n − 1).)'
  },
  {
    id: 'cpe-q88',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hét csapat körmérkőzést játszik (érettségi, 2018), eddig 9 mérkőzés zajlott le. Hány mérkőzés van hátra?',
    options: ['12', '21', '5', '33'],
    correctAnswer: 0,
    explanation: 'Az összes mérkőzés 7 alatt a 2 = 21, így 21 − 9 = 12 van hátra.'
  },
  {
    id: 'cpe-q89',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Egy teljes gráfnak 120 éle van. Hányféleképpen választható ki 4 csúcsa, ha a sorrend nem számít?',
    options: ['1820', '8 214 570', '43 680', '210'],
    correctAnswer: 0,
    explanation: 'n(n − 1) / 2 = 120 ⇒ n = 16. 16 alatt a 4 = 1820. (8 214 570 a 4 él kiválasztása lenne: 120 alatt a 4.)'
  },
  {
    id: 'cpe-q90',
    level: 3,
    questionTypeBadge: 'Fokszámösszeg',
    figure: FIG_PINGPONG8,
    question: 'Egy 8 fős asztalitenisz-körmérkőzésen ketten 7, ketten 6, négyen 5 meccset játszottak eddig. Hány mérkőzés van hátra?',
    options: ['5', '23', '18', '46'],
    correctAnswer: 0,
    explanation: 'Lejátszott: (2 · 7 + 2 · 6 + 4 · 5) : 2 = 46 : 2 = 23. Összes: 8 alatt a 2 = 28. Hátra: 28 − 23 = 5.'
  }
];

export const CombinatoricsPracticeExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId="g11-comb-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="10. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés (szintenként 30) a teljes fejezetből: jelszavak, sorba rendezés, kiválasztás, binomiális együtthatók, esetszétválasztás, gráfok, érettségi feladatok."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={COMBINATORICS_PRACTICE_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összeszámlálás',
          items: [
            'Mind az n elem sorba: n!',
            'k elem, számít a sorrend: n(n − 1)…(n − k + 1)',
            'k elem, ismétlődhet: nᵏ',
            'k elem, nem számít a sorrend: n alatt a k = n! / (k! (n − k)!)'
          ]
        },
        {
          title: 'Stratégiák',
          items: [
            'Egymást kizáró esetek ⇒ összeadás.',
            'Egymás utáni független döntések ⇒ szorzás.',
            '„Legalább egy” ⇒ összes − rossz esetek (komplementer).',
            'Feltételes hellyel (első jegy ≠ 0, szélső hely) kezdj!'
          ]
        },
        {
          title: 'Gráfok',
          items: [
            'Fokszámok összege = 2 · élek száma (mindig páros).',
            'n pontú teljes gráf: minden fokszám n − 1, élek: n(n − 1) / 2.',
            'Egyszerű gráfban a fokszám legfeljebb n − 1.',
            'Ismerősök párjai = élek; ismeretlenek párjai = n alatt a 2 − élek.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinatoricsPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CombinatoricsPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CombinatoricsPracticeExamQuiz;
