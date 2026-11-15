import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExponentialProcessesMatcher } from './ExponentialProcessesMatcher';
import { ExponentialProcessesSorter } from './ExponentialProcessesSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** Kis időgrafikon: görbe a [t0; t1] intervallumon, megjelölt pontok (a „?” pont értéke nincs kiírva). */
const ProcessFig: React.FC<{
  f: (t: number) => number;
  t0: number;
  t1: number;
  vMax: number;
  ticks: number[];
  marks: { t: number; label: string; unknown?: boolean }[];
  title: string;
  color?: string;
  showCurve?: boolean;
}> = ({ f, t0, t1, vMax, ticks, marks, title, color = '#059669', showCurve = true }) => {
  const X = (t: number) => 25 + ((t - t0) / (t1 - t0)) * 200;
  const Y = (v: number) => 135 - (v / vMax) * 110;
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const t = t0 + ((t1 - t0) * i) / 120;
    d += `${i === 0 ? 'M' : 'L'} ${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)} `;
  }
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="20" y1="135" x2="232" y2="135" stroke="#64748b" />
      {t0 <= 0 && t1 >= 0 && <line x1={X(0)} y1="140" x2={X(0)} y2="18" stroke="#64748b" />}
      {ticks.map((t) => (
        <text key={t} x={X(t)} y="148" fontSize="9" textAnchor="middle" fill="#475569">
          {String(t).replace('-', '−')}
        </text>
      ))}
      {showCurve && <path d={d} fill="none" stroke={color} strokeWidth="2.5" />}
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={X(m.t)} y1="135" x2={X(m.t)} y2={Y(f(m.t))} stroke="#cbd5e1" strokeDasharray="3 3" />
          <circle cx={X(m.t)} cy={Y(f(m.t))} r="4" fill={m.unknown ? '#be185d' : '#7c3aed'} />
          <text x={X(m.t) + 5} y={Y(f(m.t)) - 6} fontSize="10" fill={m.unknown ? '#be185d' : '#6d28d9'} fontWeight="bold">
            {m.label}
          </text>
        </g>
      ))}
      <text x="120" y="12" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        {title}
      </text>
    </svg>
  );
};

const bact = (t: number) => 120 * Math.pow(1.5, t);
const city = (t: number) => 20 * Math.pow(1.026, t);

const POPULATION_FIG = (
  <svg viewBox="0 0 240 120" className={QSVG}>
    <defs>
      <marker id="epqArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 z" fill="#334155" />
      </marker>
    </defs>
    {[
      { x: 35, t: '2001' },
      { x: 120, t: '2006' },
      { x: 205, t: '2011' }
    ].map((b) => (
      <g key={b.t}>
        <rect x={b.x - 28} y="45" width="56" height="28" rx="6" fill="#ede9fe" stroke="#7c3aed" />
        <text x={b.x} y="64" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
          {b.t}
        </text>
      </g>
    ))}
    <path d="M65 52 L90 52" stroke="#334155" strokeWidth="1.5" markerEnd="url(#epqArrow)" />
    <path d="M150 52 L175 52" stroke="#334155" strokeWidth="1.5" markerEnd="url(#epqArrow)" />
    <path d="M175 68 L150 68" stroke="#be185d" strokeWidth="1.5" markerEnd="url(#epqArrow)" />
    <text x="162" y="92" fontSize="11" textAnchor="middle" fill="#be185d" fontWeight="bold">
      × ?
    </text>
    <text x="120" y="25" fontSize="10" textAnchor="middle" fill="#334155">
      évente az előző évi szám 99,8%-a
    </text>
    <text x="77" y="40" fontSize="9" textAnchor="middle" fill="#059669">
      5 év
    </text>
    <text x="162" y="40" fontSize="9" textAnchor="middle" fill="#059669">
      5 év
    </text>
  </svg>
);

const EXP_PROCESS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: fogalmak, egyszerű leolvasás (1–10)
  {
    id: 'exp-q1',
    level: 1,
    questionTypeBadge: 'Növekedési tényező',
    question: 'Mennyi a t ↦ 4ᵗ folyamat növekedési tényezője, és milyen a folyamat?',
    options: ['k = 4, exponenciálisan növekvő', 'k = 4, exponenciálisan csökkenő', 'k = 1/4, exponenciálisan csökkenő', 'k = 1, konstans'],
    correctAnswer: 0,
    explanation: 'N₀ · kᵗ alakban N₀ = 1, k = 4 > 1, tehát exponenciálisan növekvő: egységnyi idő alatt négyszeresére nő.'
  },
  {
    id: 'exp-q2',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Milyen folyamatot ír le a t ↦ 4⁻ᵗ hozzárendelés, és mennyi a növekedési tényező?',
    options: ['Csökkenőt, k = 1/4', 'Csökkenőt, k = −4', 'Növekvőt, k = 4', 'Növekvőt, k = 1/4'],
    correctAnswer: 0,
    explanation: '4⁻ᵗ = (4⁻¹)ᵗ = (1/4)ᵗ, és 0 < 1/4 < 1, tehát exponenciálisan csökkenő. A növekedési tényező mindig pozitív.'
  },
  {
    id: 'exp-q3',
    level: 1,
    questionTypeBadge: 'Kezdeti érték',
    question: 'Mit ad meg a t ↦ N₀ · kᵗ hozzárendelésben az N₀ szám?',
    options: ['A t = 0 helyen felvett értéket (kezdeti érték)', 'Az egységnyi idő alatti változás szorzóját', 'A folyamat végén felvett értéket', 'A t = 1 helyen felvett értéket'],
    correctAnswer: 0,
    explanation: 'N₀ · k⁰ = N₀ · 1 = N₀: a vizsgálat kezdetén (t = 0) felvett érték. A t = 1 helyen az érték N₀ · k.'
  },
  {
    id: 'exp-q4',
    level: 1,
    questionTypeBadge: 'Növekedési tényező',
    question: 'Mit ad meg a t ↦ N₀ · kᵗ hozzárendelésben a k szám (a növekedési tényező)?',
    options: [
      'Hányszorosára változik a mennyiség egységnyi idő alatt',
      'Mennyivel nő a mennyiség egységnyi idő alatt',
      'A mennyiség értékét a vizsgálat kezdetén',
      'Hány időegység alatt duplázódik a mennyiség'
    ],
    correctAnswer: 0,
    explanation: 'N(t + 1) = N₀ · kᵗ⁺¹ = k · N(t): egységnyi idő alatt k-szorosára változik a mennyiség (nem k-val nő).'
  },
  {
    id: 'exp-q5',
    level: 1,
    questionTypeBadge: 'Kezdeti érték',
    question: 'Mennyi az E(t) = 0,38 · 1,22ᵗ folyamat kezdeti értéke?',
    options: ['0,38', '1,22', '1,6', '0,4636'],
    correctAnswer: 0,
    explanation: 'E(0) = 0,38 · 1,22⁰ = 0,38. (0,4636 = 0,38 · 1,22 az E(1) érték, 1,22 a növekedési tényező.)'
  },
  {
    id: 'exp-q6',
    level: 1,
    questionTypeBadge: 'Csökkenés',
    question: 'Milyen folyamatot jellemez az F(t) = 5,67 · 0,79ᵗ függvény?',
    options: ['Exponenciálisan csökkenőt', 'Exponenciálisan növekvőt', 'Lineárisan csökkenőt', 'Állandót'],
    correctAnswer: 0,
    explanation: 'A növekedési tényező k = 0,79, és 0 < 0,79 < 1, ezért a függvény szigorúan monoton csökkenő: exponenciális csökkenés.'
  },
  {
    id: 'exp-q7',
    level: 1,
    questionTypeBadge: 'Modell',
    question: '250 ezer forint évi 4%-os kamatos kamattal gyarapszik. Melyik függvény adja meg a pénz mennyiségét (ezer Ft) t év múlva?',
    options: ['t ↦ 250 · 1,04ᵗ', 't ↦ 250 · 0,04ᵗ', 't ↦ 250 + 1,04ᵗ', 't ↦ 250 · 4ᵗ'],
    correctAnswer: 0,
    explanation: 'Évente 1,04-dal szorzódik az összeg, a kezdeti érték 250: N(t) = 250 · 1,04ᵗ.'
  },
  {
    id: 'exp-q8',
    level: 1,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 4^{2t} folyamat növekedési tényezője?',
    options: ['16', '8', '4', '2'],
    correctAnswer: 0,
    explanation: '4^{2t} = (4²)ᵗ = 16ᵗ, tehát k = 16. (8 = 4 · 2 hibás: a kitevőben lévő szorzó hatványozást jelent.)'
  },
  {
    id: 'exp-q9',
    level: 1,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 4^{t/2} folyamat növekedési tényezője?',
    options: ['2', '8', '1/2', '16'],
    correctAnswer: 0,
    explanation: '4^{t/2} = (4^{1/2})ᵗ = (√4)ᵗ = 2ᵗ, tehát k = 2.'
  },
  {
    id: 'exp-q10',
    level: 1,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Mennyi a G(t) = 3,8 · 1,25⁻ᵗ folyamat növekedési tényezője?',
    options: ['0,8', '1,25', '−1,25', '0,25'],
    correctAnswer: 0,
    explanation: '1,25⁻ᵗ = (1,25⁻¹)ᵗ = 0,8ᵗ, így k = 0,8: exponenciálisan csökkenő folyamat.'
  },

  // LEVEL 2: összetett alakok, baktériumok (11–20)
  {
    id: 'exp-q11',
    level: 2,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 6,2 · 1,15^{−2t} folyamat növekedési tényezője (három tizedesjegyre), és milyen a folyamat?',
    options: ['≈ 0,756, csökkenő', '1,15, növekvő', '≈ 1,323, növekvő', '−2,3, csökkenő'],
    correctAnswer: 0,
    explanation: '1,15^{−2t} = (1,15⁻²)ᵗ, és 1,15⁻² = 1/1,3225 ≈ 0,756 < 1, tehát exponenciálisan csökkenő. (1,323 = 1,15² – az előjel lemaradt.)'
  },
  {
    id: 'exp-q12',
    level: 2,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 10²³ · (1/2)^{4t} folyamat kezdeti értéke és növekedési tényezője?',
    options: ['N₀ = 10²³, k = 1/16', 'N₀ = 10²³, k = 1/8', 'N₀ = 10²³/2, k = 4', 'N₀ = 1, k = 1/2'],
    correctAnswer: 0,
    explanation: '(1/2)^{4t} = ((1/2)⁴)ᵗ = (1/16)ᵗ; t = 0-nál az érték 10²³. Csökkenő folyamat.'
  },
  {
    id: 'exp-q13',
    level: 2,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 6 · 10²³ · 2^{3t} folyamat növekedési tényezője?',
    options: ['8', '6', '2', '3'],
    correctAnswer: 0,
    explanation: '2^{3t} = (2³)ᵗ = 8ᵗ, tehát k = 8 – exponenciálisan növekvő. A kezdeti érték 6 · 10²³.'
  },
  {
    id: 'exp-q14',
    level: 2,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Milyen folyamatot ír le a t ↦ 3,8 · 0,8⁻ᵗ hozzárendelés?',
    options: ['Növekvőt, k = 1,25', 'Csökkenőt, k = 0,8', 'Csökkenőt, k = −0,8', 'Növekvőt, k = 1,2'],
    correctAnswer: 0,
    explanation: '0,8⁻ᵗ = (1/0,8)ᵗ = 1,25ᵗ, és 1,25 > 1, tehát exponenciálisan növekvő. (1,2 = 1 + 0,2 hibás reciprok.)'
  },
  {
    id: 'exp-q15',
    level: 2,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 2,1 · 5^{−1,2t} folyamat növekedési tényezője (három tizedesjegyre)?',
    options: ['≈ 0,145', '≈ 6,899', '−6', '0,2'],
    correctAnswer: 0,
    explanation: '5^{−1,2t} = (5^{−1,2})ᵗ, és 5^{−1,2} ≈ 0,145 < 1: csökkenő folyamat. (6,899 ≈ 5^1,2 – az előjel lemaradt; 0,2 = 5⁻¹ – az 1,2-es szorzó lemaradt.)'
  },
  {
    id: 'exp-q16',
    level: 2,
    questionTypeBadge: 'Modellalkotás',
    question: 'Egy mintában 120 millió baktériumot számoltak, egy óra múlva 180 milliót. Melyik képlet adja meg a baktériumok számát (millióban) az első méréstől eltelt t óra múlva, ha a szaporodás exponenciális?',
    figure: <ProcessFig f={bact} t0={-0.5} t1={2} vMax={300} ticks={[0, 1, 2]} marks={[{ t: 0, label: '120' }, { t: 1, label: '180' }]} title="baktériumok (millió), t órában" />,
    options: ['N(t) = 120 · 1,5ᵗ', 'N(t) = 120 + 60t', 'N(t) = 180 · 1,5ᵗ', 'N(t) = 120 · 60ᵗ'],
    correctAnswer: 0,
    explanation: 'N₀ = 120 (t = 0), k = 180/120 = 1,5 ⇒ N(t) = 120 · 1,5ᵗ. A 120 + 60t lineáris modell lenne.'
  },
  {
    id: 'exp-q17',
    level: 2,
    questionTypeBadge: 'Baktériumok',
    question: 'N(t) = 120 · 1,5ᵗ millió baktérium (t órában). Hány baktérium van az első mérés után 3 órával?',
    figure: <ProcessFig f={bact} t0={-0.5} t1={3.3} vMax={450} ticks={[0, 1, 2, 3]} marks={[{ t: 0, label: '120' }, { t: 1, label: '180' }, { t: 3, label: '?', unknown: true }]} title="N(t) = 120 · 1,5ᵗ (millió)" />,
    options: ['405 millió', '300 millió', '270 millió', '607,5 millió'],
    correctAnswer: 0,
    explanation: 'N(3) = 120 · 1,5³ = 120 · 3,375 = 405 millió. (300 millió a lineáris növekedés, 270 millió a 2 óra utáni érték.)'
  },
  {
    id: 'exp-q18',
    level: 2,
    questionTypeBadge: 'Tört idő',
    question: 'N(t) = 120 · 1,5ᵗ millió baktérium (t órában). Kb. hány baktérium van fél órával az első mérés után?',
    options: ['≈ 147 millió', '150 millió', '180 millió', '≈ 135 millió'],
    correctAnswer: 0,
    explanation: 'N(0,5) = 120 · 1,5^{0,5} = 120 · √1,5 ≈ 120 · 1,2247 ≈ 147 millió. A 150 millió a 120 és 180 számtani közepe – az csak lineáris növekedésnél lenne igaz.'
  },
  {
    id: 'exp-q19',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'N(t) = 120 · 1,5ᵗ millió baktérium (t órában). Kb. hány baktérium volt 3 órával az első mérés előtt?',
    figure: <ProcessFig f={bact} t0={-3.3} t1={1.3} vMax={220} ticks={[-3, -2, -1, 0, 1]} marks={[{ t: -3, label: '?', unknown: true }, { t: 0, label: '120' }, { t: 1, label: '180' }]} title="N(t) = 120 · 1,5ᵗ (millió)" />,
    options: ['≈ 35,6 millió', '−60 millió', '≈ 80 millió', '0'],
    correctAnswer: 0,
    explanation: 'N(−3) = 120 · 1,5⁻³ = 120 / 3,375 ≈ 35,6 millió. Az exponenciális modell sosem ad negatív értéket (a −60 a lineáris visszaszámolás lenne).'
  },
  {
    id: 'exp-q20',
    level: 2,
    questionTypeBadge: 'Kezdeti érték',
    question: 'Mennyi a t ↦ 2,25 · 5⁻ᵗ folyamat kezdeti értéke és növekedési tényezője?',
    options: ['N₀ = 2,25, k = 0,2', 'N₀ = 2,25, k = 5', 'N₀ = 5, k = 2,25', 'N₀ = 2,25, k = −5'],
    correctAnswer: 0,
    explanation: '5⁻ᵗ = (1/5)ᵗ = 0,2ᵗ, a t = 0-beli érték 2,25. Exponenciálisan csökkenő folyamat.'
  },

  // LEVEL 3: alkalmazások, modellek összevetése (21–30)
  {
    id: 'exp-q21',
    level: 3,
    questionTypeBadge: 'Negatív kitevő',
    question: 'Milyen folyamatot ír le a t ↦ 3 · 10²³ · 0,4⁻ᵗ hozzárendelés, és mennyi a növekedési tényező?',
    options: ['Növekvőt, k = 2,5', 'Csökkenőt, k = 0,4', 'Növekvőt, k = 1,4', 'Csökkenőt, k = −0,4'],
    correctAnswer: 0,
    explanation: '0,4⁻ᵗ = (1/0,4)ᵗ = 2,5ᵗ, és 2,5 > 1 ⇒ exponenciálisan növekvő folyamat.'
  },
  {
    id: 'exp-q22',
    level: 3,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 0,0134 · 0,5^{2t} folyamat növekedési tényezője?',
    options: ['0,25', '1', '0,5', '0,0268'],
    correctAnswer: 0,
    explanation: '0,5^{2t} = (0,5²)ᵗ = 0,25ᵗ, tehát k = 0,25 – csökkenő. (1 = 0,5 · 2 hibás: a kitevő szorzója hatványoz.)'
  },
  {
    id: 'exp-q23',
    level: 3,
    questionTypeBadge: 'Átírás',
    question: 'Mennyi a t ↦ 1270 · 0,3^{t/2} folyamat növekedési tényezője (három tizedesjegyre)?',
    options: ['≈ 0,548', '0,15', '0,09', '≈ 1,826'],
    correctAnswer: 0,
    explanation: '0,3^{t/2} = (0,3^{1/2})ᵗ = (√0,3)ᵗ ≈ 0,548ᵗ. (0,15 = 0,3/2, 0,09 = 0,3² hibás átírás.)'
  },
  {
    id: 'exp-q24',
    level: 3,
    questionTypeBadge: 'Modellalkotás',
    question: 'Egy exponenciális folyamatban a kezdeti érték 360 000, egy óra múlva 345 000. Kb. mekkora értéket mérünk 3,5 óra múlva?',
    figure: (
      <ProcessFig
        f={(t) => 360000 * Math.pow(23 / 24, t)}
        t0={-0.3}
        t1={4}
        vMax={400000}
        ticks={[0, 1, 2, 3, 4]}
        marks={[{ t: 0, label: '360 000' }, { t: 1, label: '345 000' }, { t: 3.5, label: '?', unknown: true }]}
        title="exponenciális csökkenés (t órában)"
        color="#0ea5e9"
      />
    ),
    options: ['≈ 310 178', '307 500', '≈ 316 849', '≈ 303 647'],
    correctAnswer: 0,
    explanation: 'k = 345 000 / 360 000 = 23/24 ⇒ N(3,5) = 360 000 · (23/24)^{3,5} ≈ 310 178. (307 500 a lineáris csökkenés, 316 849 és 303 647 a 3, ill. 4 óra utáni érték.)'
  },
  {
    id: 'exp-q25',
    level: 3,
    questionTypeBadge: 'Népesség',
    question:
      'Magyarország lélekszáma 2001 és 2011 között egy modell szerint évente az előző évi szám 0,2%-ával csökkent. Melyik állítások becsülik elméletileg helyesen a 2006-os adatot? A) 5 év alatt összesen 1%-kal csökkent. B) A 2006-os lélekszám a 2001-es 0,998⁵-szerese. C) A 2006-os adat a 2011-esből 0,998⁻⁵-nel szorozva kapható. D) A 2006-os lélekszám a 2011-es 1,002⁵-szerese.',
    options: ['Csak B és C', 'Csak A', 'Csak B', 'Mind a négy'],
    correctAnswer: 0,
    explanation: 'B és C helyes (2011 = 2006 · 0,998⁵). A hibás: a százalékok nem adódnak össze (0,998⁵ ≈ 0,99004). D hibás: visszafelé 1/0,998 ≈ 1,002004-del kell szorozni, nem 1,002-del.'
  },
  {
    id: 'exp-q26',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Ugyanebben a modellben (évente az előző évi szám 99,8%-a) mivel kell megszorozni a 2011-es lélekszámot, hogy a 2006-ost kapjuk?',
    figure: POPULATION_FIG,
    options: ['0,998⁻⁵-nel', '0,998⁵-nel', '1,01-gyel', '0,99-dal'],
    correctAnswer: 0,
    explanation: '2011 = 2006 · 0,998⁵ ⇒ 2006 = 2011 / 0,998⁵ = 2011 · 0,998⁻⁵ (≈ 1,01006). A 0,998⁵ előre lép az időben, nem vissza.'
  },
  {
    id: 'exp-q27',
    level: 3,
    questionTypeBadge: 'Város',
    question: 'Egy város lakossága 1900-ban 20 ezer fő volt, és 2000-ig a t ↦ 20 · 1,026ᵗ szabály szerint nőtt (t az 1900 óta eltelt évek száma, ezer fő). Kb. mennyi volt a lakosság 2000-ben?',
    figure: <ProcessFig f={city} t0={0} t1={105} vMax={300} ticks={[0, 50, 100]} marks={[{ t: 0, label: '20' }, { t: 100, label: '?', unknown: true }]} title="20 · 1,026ᵗ (ezer fő)" color="#7c3aed" />,
    options: ['≈ 260,5 ezer fő', '72 ezer fő', '52 ezer fő', '2052 ezer fő'],
    correctAnswer: 0,
    explanation: '20 · 1,026¹⁰⁰ ≈ 20 · 13,02 ≈ 260,5 ezer fő. (72 ezer = 20 · (1 + 100 · 0,026) az egyszerű, lineáris növekedés.)'
  },
  {
    id: 'exp-q28',
    level: 3,
    questionTypeBadge: 'Város',
    question: 'A t ↦ 20 · 1,026ᵗ modell szerint (ezer fő, t = 0 az 1900-as év) kb. hány lakosa volt a városnak 1960-ban?',
    options: ['≈ 93,3 ezer', '≈ 164,3 ezer', '≈ 51,2 ezer', '≈ 120 ezer'],
    correctAnswer: 0,
    explanation: 't = 60: 20 · 1,026⁶⁰ ≈ 93,3 ezer fő. (164,3 ezer a lineáris modell értéke 1960-ra.)'
  },
  {
    id: 'exp-q29',
    level: 3,
    questionTypeBadge: 'Lineáris modell',
    question: 'Ha a város lakossága 1900 és 2000 között LINEÁRISAN nőtt volna 20 ezerről ≈ 260,5 ezer főre, kb. mennyi lett volna 1940-ben?',
    figure: <ProcessFig f={(t) => 20 + 2.405 * t} t0={0} t1={105} vMax={300} ticks={[0, 40, 100]} marks={[{ t: 0, label: '20' }, { t: 40, label: '?', unknown: true }, { t: 100, label: '260,5' }]} title="lineáris növekedés (ezer fő)" color="#0ea5e9" />,
    options: ['≈ 116,2 ezer fő', '≈ 55,8 ezer fő', '≈ 104,2 ezer fő', '≈ 130,3 ezer fő'],
    correctAnswer: 0,
    explanation: 'Évi növekmény: (260,5 − 20) / 100 ≈ 2,405 ezer fő ⇒ 1940-ben 20 + 40 · 2,405 ≈ 116,2 ezer. (55,8 ezer az exponenciális modell értéke.)'
  },
  {
    id: 'exp-q30',
    level: 3,
    questionTypeBadge: 'Becslés',
    question: 'A t ↦ 20 · 1,026ᵗ modellel (ezer fő, t = 0 az 1900-as év) számolva melyik évben érné el a város lakossága a 400 ezer főt? (1,026¹¹⁶ ≈ 19,64; 1,026¹¹⁷ ≈ 20,15)',
    options: ['2017-ben', '2000-ben', '2059-ben', '2077-ben'],
    correctAnswer: 0,
    explanation: '20 · 1,026ᵗ = 400 ⇒ 1,026ᵗ = 20. 1,026¹¹⁶ < 20 < 1,026¹¹⁷, tehát t ≈ 117 ⇒ 2017. (2059 a lineáris modell szerinti év.)'
  }
];

export const ExponentialProcessesQuiz: React.FC<{
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
      topicId="g11-exp-exponencialis-folyamat-quiz"
      subtopicId="exponencialis-folyamatok"
      title="8. Exponenciális folyamatok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kezdeti érték és növekedési tényező, átírás N₀ · kᵗ alakba, baktériumok, népesség, exponenciális és lineáris modell."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={EXP_PROCESS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Modell',
          items: ['N(t) = N₀ · kᵗ (N₀ > 0, k > 0, k ≠ 1)', 'N₀: kezdeti érték (t = 0)', 'k: egységnyi idő alatt k-szorosára változik', 'k > 1 növekvő, 0 < k < 1 csökkenő']
        },
        {
          title: 'Átírás',
          items: ['b^{c·t} = (b^c)ᵗ ⇒ k = b^c', 'b⁻ᵗ = (1/b)ᵗ', '4^{2t} = 16ᵗ; 4^{t/2} = 2ᵗ', '1,25⁻ᵗ = 0,8ᵗ']
        },
        {
          title: 'Alkalmazás',
          items: ['Két mérésből: k = N(1) / N(0)', 'Visszafelé: N(−t) = N₀ / kᵗ', 'Baktériumok: N(t) = 120 · 1,5ᵗ', 'Nem összeadunk, hanem szorzunk: 0,998⁵ ≠ 0,99']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExponentialProcessesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ExponentialProcessesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ExponentialProcessesQuiz;
