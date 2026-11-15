import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { HalfLifeMatcher } from './HalfLifeMatcher';
import { HalfLifeSorter } from './HalfLifeSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/**
 * Csökkenő exponenciális görbe (a felezési idő = 1 egység a vízszintes tengelyen 40 px).
 * marks: megjelölt pontok (u = eltelt felezési idők száma), feliratuk és az x-tengely felirata.
 */
const DecayFig: React.FC<{
  yLabel: string;
  xLabel: string;
  marks: { u: number; y: string; x: string; q?: boolean }[];
  title?: string;
}> = ({ yLabel, xLabel, marks, title }) => {
  const toS = (u: number, v: number): [number, number] => [40 + u * 40, 130 - v * 100];
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const u = (4.8 * i) / 100;
    const [x, y] = toS(u, Math.pow(0.5, u));
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="40" y1="130" x2="235" y2="130" stroke="#64748b" />
      <line x1="40" y1="130" x2="40" y2="10" stroke="#64748b" />
      <text x="232" y="146" fontSize="9" textAnchor="end" fill="#334155">{xLabel}</text>
      <text x="44" y="14" fontSize="9" fill="#334155">{yLabel}</text>
      {title && (
        <text x="232" y="22" fontSize="10" textAnchor="end" fontWeight="bold" fill="#5b21b6">{title}</text>
      )}
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      {marks.map((m, i) => {
        const [x, y] = toS(m.u, Math.pow(0.5, m.u));
        const col = m.q ? '#b91c1c' : '#db2777';
        return (
          <g key={i}>
            <line x1="40" y1={y} x2={x} y2={y} stroke={col} strokeDasharray="3 3" />
            <line x1={x} y1={y} x2={x} y2="130" stroke={col} strokeDasharray="3 3" />
            <circle cx={x} cy={y} r="3.5" fill={col} />
            <text x="36" y={y + 3} fontSize="9" textAnchor="end" fontWeight="bold" fill={col}>{m.y}</text>
            <text x={x} y="142" fontSize="9" textAnchor="middle" fontWeight="bold" fill={col}>{m.x}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Táblázat: t és 0,83^t értékei (q14). */
const TABLE_FIG = (
  <svg viewBox="0 0 240 90" className={QSVG}>
    {['t', '2', '3', '4'].map((t, i) => (
      <g key={i}>
        <rect x={10 + i * 55} y="15" width="55" height="28" fill={i === 0 ? '#ede9fe' : '#fff'} stroke="#a78bfa" />
        <text x={37 + i * 55} y="34" fontSize="12" textAnchor="middle" fill="#0f172a">{t}</text>
      </g>
    ))}
    {['0,83ᵗ', '≈ 0,689', '≈ 0,572', '≈ 0,474'].map((t, i) => (
      <g key={i}>
        <rect x={10 + i * 55} y="43" width="55" height="28" fill={i === 0 ? '#ede9fe' : '#fff'} stroke="#a78bfa" />
        <text x={37 + i * 55} y="62" fontSize="11" textAnchor="middle" fill="#0f172a">{t}</text>
      </g>
    ))}
    <text x="120" y="86" fontSize="10" textAnchor="middle" fill="#b91c1c" fontWeight="bold">0,83ᵗ = 0,5 ⇒ t = ?</text>
  </svg>
);

const HALF_LIFE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'hlf-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit nevezünk egy exponenciálisan csökkenő mennyiség felezési idejének?',
    options: [
      'Azt az időtartamot, amely alatt a mennyiség a felére csökken',
      'A teljes kiürüléshez (elbomláshoz) szükséges idő felét',
      'Azt az időt, amely alatt a mennyiség felével nő',
      'A folyamat teljes időtartamát osztva kettővel'
    ],
    correctAnswer: 0,
    explanation: 'A felezési idő (T) az az időtartam, amely alatt a vizsgált mennyiség a kezdeti érték felére csökken. Exponenciális csökkenésnél „teljes kiürülés” nincs is.'
  },
  {
    id: 'hlf-q2',
    level: 1,
    questionTypeBadge: 'Felezés',
    question: 'A jód-131 felezési ideje 8 nap. 100 g jódból mennyi marad 16 nap múlva?',
    figure: <DecayFig yLabel="m (g)" xLabel="t (nap)" marks={[{ u: 0, y: '100', x: '0' }, { u: 2, y: '?', x: '16', q: true }]} />,
    options: ['25 g', '0 g', '50 g', '12,5 g'],
    correctAnswer: 0,
    explanation: '16 nap = 2 felezési idő: 100 → 50 → 25 g. (A 0 g a lineáris fogyás tévhite.)'
  },
  {
    id: 'hlf-q3',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Egy folyamatot az f(t) = 340 · (1/2)ᵗ képlet ír le (t órában). Mennyi a felezési idő?',
    options: ['1 óra', '2 óra', '170 óra', '0,5 óra'],
    correctAnswer: 0,
    explanation: 'Ha t 1-gyel nő, a kitevő 1-gyel nő, és az érték (1/2)-szeresére változik: T = 1 óra.'
  },
  {
    id: 'hlf-q4',
    level: 1,
    questionTypeBadge: 'Felezés',
    question: 'Három felezési idő elteltével a kezdeti mennyiség hányad része marad meg?',
    options: ['1/8', '1/6', '1/3', '1/9'],
    correctAnswer: 0,
    explanation: '(1/2)³ = 1/8 – minden felezési idő alatt a megmaradt rész feleződik.'
  },
  {
    id: 'hlf-q5',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Egy lázcsillapítóból 500 mg helyett csak 300 mg-ot veszünk be. Hogyan változik a hatóanyag felezési ideje?',
    options: ['Nem változik', 'A 3/5-ére csökken', 'Az 5/3-szorosára nő', '200 perccel rövidebb lesz'],
    correctAnswer: 0,
    explanation: 'Mindkét esetben a 0,5 = 0,83ᵗ egyenlethez jutunk: a felezési idő a folyamatra jellemző állandó, nem függ a kezdeti értéktől.'
  },
  {
    id: 'hlf-q6',
    level: 1,
    questionTypeBadge: 'Százalék',
    question: 'Négy felezési idő után a kezdeti mennyiség hány százaléka marad meg?',
    options: ['6,25%', '12,5%', '0%', '25%'],
    correctAnswer: 0,
    explanation: '(1/2)⁴ = 1/16 = 0,0625 = 6,25%.'
  },
  {
    id: 'hlf-q7',
    level: 1,
    questionTypeBadge: 'Kezdőérték',
    question: 'Egy mennyiség változását az M(t) = 58 · 0,9ᵗ képlet írja le. Mennyi a kezdeti érték, M(0)?',
    options: ['58', '52,2', '0,9', '64,4'],
    correctAnswer: 0,
    explanation: 'M(0) = 58 · 0,9⁰ = 58 · 1 = 58. (52,2 = M(1).)'
  },
  {
    id: 'hlf-q8',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Az M(t) = 28,9 · 2^(−t/8) képlettel leírt folyamatban mennyi a felezési idő?',
    options: ['8', '28,9', '1/8', '16'],
    correctAnswer: 0,
    explanation: '2^(−t/8) = (1/2)^(t/8): a kitevő t = 8-nál lesz 1, tehát T = 8 időegység.'
  },
  {
    id: 'hlf-q9',
    level: 1,
    questionTypeBadge: 'Radioaktivitás',
    question: 'A szén-14 felezési ideje 5730 év. Mennyi idő alatt csökken a mennyisége a nyolcadára?',
    figure: <DecayFig yLabel="N" xLabel="t (év)" title="¹⁴C" marks={[{ u: 1, y: 'N₀/2', x: '5730' }, { u: 3, y: 'N₀/8', x: '?', q: true }]} />,
    options: ['17 190 év', '45 840 év', '11 460 év', '716,25 év'],
    correctAnswer: 0,
    explanation: '1/8 = (1/2)³ ⇒ 3 felezési idő: 3 · 5730 = 17 190 év. (45 840 = 8 · 5730 – nem 8 felezés kell!)'
  },
  {
    id: 'hlf-q10',
    level: 1,
    questionTypeBadge: 'Grafikon',
    question: 'A grafikonon egy mennyiség csökkenése látható. Ha t-ben k, t + T-ben k/2 az értéke, mennyi t + 2T-ben?',
    figure: <DecayFig yLabel="y" xLabel="idő" marks={[{ u: 0.4, y: 'k', x: 't' }, { u: 1.4, y: 'k/2', x: 't+T' }, { u: 2.4, y: '?', x: 't+2T', q: true }]} />,
    options: ['k/4', '0', 'k/3', 'k/2'],
    correctAnswer: 0,
    explanation: 'Újabb T idő alatt a k/2 is feleződik: k/4.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'hlf-q11',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'Mennyi a felezési idő a g(t) = 2,4 · (1/2)^(t/3) folyamatban (t órában)?',
    options: ['3 óra', '1/3 óra', '2,4 óra', '1,5 óra'],
    correctAnswer: 0,
    explanation: 'A kitevő t/3 akkor 1, amikor t = 3: ennyi idő alatt feleződik az érték. T = 3 óra.'
  },
  {
    id: 'hlf-q12',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'Mennyi a felezési idő a h(t) = 54 · 2^(−5t) folyamatban (t órában)?',
    options: ['12 perc', '5 óra', '30 perc', '2,5 óra'],
    correctAnswer: 0,
    explanation: '2^(−5t) = (1/2)^(5t); a kitevő t = 1/5 óránál 1. T = 0,2 óra = 12 perc.'
  },
  {
    id: 'hlf-q13',
    level: 2,
    questionTypeBadge: 'Értékcsökkenés',
    question: 'Egy szerszámgép értéke exponenciálisan csökken, felezési ideje 4,5 év. Hány év alatt csökken az eredeti érték 12,5%-a alá?',
    options: ['13,5 év', '36 év', '9 év', '4,5 év'],
    correctAnswer: 0,
    explanation: '12,5% = 1/8 = (1/2)³ ⇒ 3 · 4,5 = 13,5 év. (36 = 8 · 4,5 hibás.)'
  },
  {
    id: 'hlf-q14',
    level: 2,
    questionTypeBadge: 'Közelítés',
    question: 'A táblázat alapján a 0,5 = 0,83ᵗ egyenlet megoldása melyik két egész szám közé esik?',
    figure: TABLE_FIG,
    options: ['3 és 4 közé', '2 és 3 közé', '4 és 5 közé', '0 és 1 közé'],
    correctAnswer: 0,
    explanation: '0,83³ ≈ 0,572 > 0,5 > 0,474 ≈ 0,83⁴, és a függvény csökkenő ⇒ 3 < t < 4 (pontosabban t ≈ 3,72).'
  },
  {
    id: 'hlf-q15',
    level: 2,
    questionTypeBadge: 'Gyógyszer',
    question: 'A lázcsillapító hatóanyaga m(t) = m₀ · 0,83ᵗ szerint csökken (t órában). Apa délben vette be. A hatóanyag hány %-a van még a szervezetében este 7-kor?',
    options: ['≈ 27,1%', '≈ 17%', '≈ 58,1%', '≈ 72,9%'],
    correctAnswer: 0,
    explanation: '7 óra telt el: 0,83⁷ ≈ 0,271 ⇒ ≈ 27,1%. (72,9% az elbomlott rész; 58,1% = 7 · 8,3%.)'
  },
  {
    id: 'hlf-q16',
    level: 2,
    questionTypeBadge: 'Gyógyszer',
    question: 'Este 7-kor apa szervezetében kb. 136 mg hatóanyag van (T ≈ 3,72 óra). Hány óra múlva csökken ennek a felére?',
    options: ['≈ 3,72 óra', '≈ 1,86 óra', '≈ 7 óra', '≈ 10,72 óra'],
    correctAnswer: 0,
    explanation: 'A felezési idő nem függ attól, mekkora a kiinduló mennyiség: bármely időponttól számítva ≈ 3,72 óra.'
  },
  {
    id: 'hlf-q17',
    level: 2,
    questionTypeBadge: 'Gyógyszer',
    question: 'A lázcsillapító felezési ideje ≈ 3,72 óra. Az 500 mg hatóanyag mennyi idő alatt csökken a tizenhatodára?',
    figure: <DecayFig yLabel="m (mg)" xLabel="t (óra)" marks={[{ u: 0, y: '500', x: '0' }, { u: 4, y: '500/16', x: '?', q: true }]} />,
    options: ['≈ 14,88 óra', '≈ 59,52 óra', '≈ 11,16 óra', '≈ 7,44 óra'],
    correctAnswer: 0,
    explanation: '1/16 = (1/2)⁴ ⇒ 4T ≈ 4 · 3,72 = 14,88 óra. (11,16 óra a nyolcadához tartozik.)'
  },
  {
    id: 'hlf-q18',
    level: 2,
    questionTypeBadge: 'Radioaktivitás',
    question: 'Egy elhalt szerves anyagban kezdetben 6 · 10¹² darab ¹⁴C atom volt (T = 5730 év). Körülbelül mennyi idő alatt csökken a számuk 3,75 · 10¹¹-re?',
    figure: <DecayFig yLabel="N" xLabel="t (év)" title="¹⁴C" marks={[{ u: 0, y: '6·10¹²', x: '0' }, { u: 4, y: '3,75·10¹¹', x: '?', q: true }]} />,
    options: ['22 920 év', '91 680 év', '17 190 év', '5730 év'],
    correctAnswer: 0,
    explanation: '6 · 10¹² / (3,75 · 10¹¹) = 16 = 2⁴ ⇒ 4 felezési idő: 4 · 5730 = 22 920 év. (91 680 = 16 · 5730 hibás.)'
  },
  {
    id: 'hlf-q19',
    level: 2,
    questionTypeBadge: 'Radioaktivitás',
    question: 'A cézium-137 felezési ideje 30 év. 90 év alatt a kezdeti mennyiség hányad része marad meg?',
    options: ['1/8', '1/3', '0', '1/6'],
    correctAnswer: 0,
    explanation: '90 év = 3 felezési idő ⇒ (1/2)³ = 1/8.'
  },
  {
    id: 'hlf-q20',
    level: 2,
    questionTypeBadge: 'Közelítés',
    question: 'M(t) = 58 · 0,9ᵗ. Tudjuk: 0,9⁶ ≈ 0,531 és 0,9⁷ ≈ 0,478. Körülbelül mennyi a felezési idő?',
    options: ['≈ 6,6', '≈ 29', '≈ 5', '≈ 0,9'],
    correctAnswer: 0,
    explanation: 'A 0,5 = 0,9ᵗ megoldása 6 és 7 közé esik, közelebb a 7-hez: T ≈ 6,58. (29 = 58/2 a kezdőérték fele, nem idő.)'
  },

  // LEVEL 3 (21–30)
  {
    id: 'hlf-q21',
    level: 3,
    questionTypeBadge: 'Gyógyszer',
    question: 'm(t) = 500 · 0,83ᵗ (mg, t órában). Körülbelül mikor marad 5 mg-nál kevesebb hatóanyag a szervezetben? (500 · 0,83²⁴ ≈ 5,71; 500 · 0,83²⁵ ≈ 4,74)',
    options: ['≈ 25 óra múlva', '≈ 7,44 óra múlva', '≈ 100 óra múlva', '≈ 372 óra múlva'],
    correctAnswer: 0,
    explanation: '0,83ᵗ < 0,01 kell; a megadott értékek szerint 24 óra után még 5,71 mg, 25 óra után már 4,74 mg ⇒ kb. 25 óra (pontosabban ≈ 24,7 óra).'
  },
  {
    id: 'hlf-q22',
    level: 3,
    questionTypeBadge: 'Radioaktivitás',
    question: 'A jód-131 felezési ideje 8 nap. Körülbelül mennyi idő után marad a kezdeti mennyiség kevesebb mint 0,5%-a? (2⁷ = 128, 2⁸ = 256)',
    options: ['≈ 61 nap (7 és 8 felezés között)', '≈ 32 nap', '≈ 1600 nap', '≈ 4 nap'],
    correctAnswer: 0,
    explanation: '0,5% = 1/200; 1/128 ≈ 0,78% > 0,5% > 0,39% ≈ 1/256 ⇒ 7T és 8T között, kb. 7,64 · 8 ≈ 61 nap (64 nap után biztosan).'
  },
  {
    id: 'hlf-q23',
    level: 3,
    questionTypeBadge: 'Radioaktivitás',
    question: 'A cézium-137 felezési ideje 30 év. A kezdeti mennyiség hány százaléka marad meg 4 év után?',
    options: ['≈ 91,2%', '≈ 86,7%', '≈ 6,7%', '≈ 93,3%'],
    correctAnswer: 0,
    explanation: '(1/2)^(4/30) ≈ 0,912 ⇒ ≈ 91,2%. (86,7% a lineáris 4/30 · 100% levonása, 93,3% a 4/60 levonása.)'
  },
  {
    id: 'hlf-q24',
    level: 3,
    questionTypeBadge: 'Radioaktivitás',
    question: 'A jód-131 felezési ideje ≈ 8 nap. Mennyi marad a kezdeti jódmennyiségből 4 év után?',
    options: ['Gyakorlatilag semmi (kb. 10⁻⁵⁵ rész)', '≈ 50%', '≈ 6,25%', '≈ 0,5%'],
    correctAnswer: 0,
    explanation: '4 év ≈ 1461 nap ≈ 182,6 felezési idő; (1/2)^{182,6} ≈ 10⁻⁵⁵ – mérhetetlenül kevés.'
  },
  {
    id: 'hlf-q25',
    level: 3,
    questionTypeBadge: 'Szorzó',
    question: 'Egy mennyiség felezési ideje 2 óra. Hányszorosára változik óránként?',
    options: ['√0,5 ≈ 0,707-szeresére', '0,25-szorosára', '0,75-szorosára', '0,5-szörösére'],
    correctAnswer: 0,
    explanation: 'Ha óránként q-szorosára változik, akkor q² = 0,5 ⇒ q = √0,5 = 0,5^(1/2) ≈ 0,707.'
  },
  {
    id: 'hlf-q26',
    level: 3,
    questionTypeBadge: 'Képlet',
    question: 'Egy izotóp felezési ideje 10 nap. A kezdeti mennyiség hány százaléka marad meg 25 nap után?',
    figure: <DecayFig yLabel="N" xLabel="t (nap)" marks={[{ u: 1, y: '50%', x: '10' }, { u: 2, y: '25%', x: '20' }, { u: 2.5, y: '?', x: '25', q: true }]} />,
    options: ['≈ 17,7%', '≈ 18,75%', '≈ 12,5%', '≈ 40%'],
    correctAnswer: 0,
    explanation: '(1/2)^(25/10) = 2^(−2,5) ≈ 0,177 ⇒ ≈ 17,7%. (18,75% a 25% és 12,5% számtani közepe – a görbe nem egyenes!)'
  },
  {
    id: 'hlf-q27',
    level: 3,
    questionTypeBadge: 'Kormeghatározás',
    question: 'Egy lelet ¹⁴C-tartalma a kezdeti érték negyede (T = 5730 év). Mennyi idős a lelet?',
    options: ['≈ 11 460 év', '≈ 22 920 év', '≈ 1432,5 év', '≈ 4297,5 év'],
    correctAnswer: 0,
    explanation: '1/4 = (1/2)² ⇒ 2 felezési idő = 11 460 év. (4297,5 = 0,75 · 5730 a lineáris tévhit.)'
  },
  {
    id: 'hlf-q28',
    level: 3,
    questionTypeBadge: 'Képlet',
    question: 'Melyik képlet írja le egy T felezési idejű, N₀ kezdeti értékű mennyiséget t idő múlva?',
    options: ['N₀ · (1/2)^(t/T)', 'N₀ · (1/2)^(T/t)', 'N₀ · (1 − t/(2T))', 'N₀ · 2^(t/T)'],
    correctAnswer: 0,
    explanation: 't idő alatt t/T felezés történik, mindegyik (1/2)-del szoroz. A 2^(t/T) növekedés lenne, az 1 − t/(2T) lineáris.'
  },
  {
    id: 'hlf-q29',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Egy exponenciálisan bomló anyag 2 óra alatt 80 mg-ról 20 mg-ra csökken. Mennyi a felezési ideje?',
    figure: <DecayFig yLabel="m (mg)" xLabel="t (óra)" marks={[{ u: 0, y: '80', x: '0' }, { u: 2, y: '20', x: '2' }]} />,
    options: ['1 óra', '2 óra', '0,5 óra', '4/3 óra'],
    correctAnswer: 0,
    explanation: '80 → 40 → 20: két felezés történt 2 óra alatt, tehát T = 1 óra.'
  },
  {
    id: 'hlf-q30',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Egy izotóp 30 nap alatt a kezdeti mennyiség 1/8 részére csökken. Mennyi a felezési ideje?',
    options: ['10 nap', '3,75 nap', '15 nap', '240 nap'],
    correctAnswer: 0,
    explanation: '1/8 = (1/2)³ ⇒ 3 felezés 30 nap alatt ⇒ T = 10 nap. (3,75 = 30/8 hibás.)'
  }
];

export const HalfLifeQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-felezesi-ido-quiz"
      subtopicId="felezesi-ido"
      title="9. Felezési idő – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a felezési idő fogalma, leolvasás képletből, gyógyszer kiürülése, radioaktív bomlás és kormeghatározás."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={HALF_LIFE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalom',
          items: ['T: ennyi idő alatt feleződik a mennyiség', 'T nem függ a kezdeti értéktől', 'n · T után: 1/2ⁿ rész marad', '1T: 50%, 2T: 25%, 3T: 12,5%, 4T: 6,25%']
        },
        {
          title: 'Képletek',
          items: ['m(t) = m₀ · (1/2)^(t/T)', 'm(t) = m₀ · qᵗ: q^T = 0,5', 'a · 2^(−kt) ⇒ T = 1/k', 'a · (1/2)^(t/c) ⇒ T = c']
        },
        {
          title: 'Tankönyvi adatok',
          items: ['Lázcsillapító: 0,83ᵗ, T ≈ 3,72 óra', 'Szén-14: T = 5730 év', 'Jód-131: T ≈ 8 nap', 'Cézium-137: T ≈ 30 év']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <HalfLifeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <HalfLifeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default HalfLifeQuiz;
