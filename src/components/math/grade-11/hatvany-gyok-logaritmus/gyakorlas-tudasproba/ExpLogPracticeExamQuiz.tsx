import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExpLogPracticeExamMatcher } from './ExpLogPracticeExamMatcher';
import { ExpLogPracticeExamSorter } from './ExpLogPracticeExamSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const path = (f: (t: number) => number, t0: number, t1: number, sx: (t: number) => number, sy: (y: number) => number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = t0 + ((t1 - t0) * i) / 60;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx(t).toFixed(1)},${sy(f(t)).toFixed(1)}`);
  }
  return pts.join(' ');
};

/** y = aˣ grafikon egy kiemelt ponttal; az alap „?”. */
const ExpGraphFig: React.FC<{ a: number; px: number; label: string }> = ({ a, px, label }) => {
  const sx = (x: number) => 120 + x * 30;
  const sy = (y: number) => 130 - y * 12;
  const py = Math.pow(a, px);
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="10" y1="130" x2="232" y2="130" stroke="#475569" />
      <line x1="120" y1="142" x2="120" y2="8" stroke="#475569" />
      <text x="228" y="142" fontSize="9" textAnchor="end" fill="#334155">x</text>
      <text x="124" y="14" fontSize="9" fill="#334155">y</text>
      <line x1={sx(1)} y1="127" x2={sx(1)} y2="133" stroke="#475569" />
      <text x={sx(1)} y="142" fontSize="8" textAnchor="middle" fill="#334155">1</text>
      <line x1="117" y1={sy(1)} x2="123" y2={sy(1)} stroke="#475569" />
      <text x="114" y={sy(1) + 3} fontSize="8" textAnchor="end" fill="#334155">1</text>
      <path d={path((x) => Math.pow(a, x), a > 1 ? -3.6 : -2.2, a > 1 ? 2.1 : 3.6, sx, sy)} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <line x1={sx(px)} y1="130" x2={sx(px)} y2={sy(py)} stroke="#db2777" strokeDasharray="3 3" />
      <line x1="120" y1={sy(py)} x2={sx(px)} y2={sy(py)} stroke="#db2777" strokeDasharray="3 3" />
      <circle cx={sx(px)} cy={sy(py)} r="3.5" fill="#db2777" />
      <text x={sx(px) + (px > 0 ? 6 : -6)} y={sy(py) - 5} fontSize="10" fontWeight="bold" textAnchor={px > 0 ? 'start' : 'end'} fill="#9d174d">{label}</text>
      <text x="20" y="22" fontSize="11" fontWeight="bold" fill="#4c1d95">y = aˣ, a = ?</text>
    </svg>
  );
};

/** Felezési görbe: N₀ → N₀/2 → N₀/4, az idő „?”. */
const DecayFig: React.FC<{ title: string; mark: string }> = ({ title, mark }) => {
  const sx = (t: number) => 35 + t * 48;
  const sy = (r: number) => 125 - r * 95;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="35" y1="125" x2="230" y2="125" stroke="#475569" />
      <line x1="35" y1="128" x2="35" y2="18" stroke="#475569" />
      <path d={path((t) => Math.pow(0.5, t), 0, 4, sx, sy)} fill="none" stroke="#0f766e" strokeWidth="2.5" />
      {[1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={sx(k)} y1="125" x2={sx(k)} y2={sy(Math.pow(0.5, k))} stroke="#94a3b8" strokeDasharray="3 3" />
          <text x={sx(k)} y="138" fontSize="9" textAnchor="middle" fill="#334155">{k}T</text>
        </g>
      ))}
      <text x="31" y={sy(1) + 3} fontSize="9" textAnchor="end" fill="#334155">N₀</text>
      <text x={sx(3) + 6} y={sy(0.125) - 6} fontSize="11" fontWeight="bold" fill="#9d174d">{mark}</text>
      <text x="135" y="20" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#115e59">{title}</text>
    </svg>
  );
};

/** Kocka adott térfogattal; az él „?”. */
const CubeFig: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="70,50 150,50 150,130 70,130" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
    <polygon points="70,50 100,25 180,25 150,50" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.8" />
    <polygon points="150,50 180,25 180,105 150,130" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.8" />
    <text x="110" y="145" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9d174d">a = ?</text>
    <text x="110" y="95" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{label}</text>
  </svg>
);

/** Henger sugárral és magassággal. */
const CylinderFig: React.FC<{ ask: string }> = ({ ask }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <ellipse cx="45" cy="70" rx="12" ry="30" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.8" />
    <line x1="45" y1="40" x2="185" y2="40" stroke="#0f766e" strokeWidth="1.8" />
    <line x1="45" y1="100" x2="185" y2="100" stroke="#0f766e" strokeWidth="1.8" />
    <path d="M185 40 A12 30 0 0 1 185 100" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.8" />
    <line x1="45" y1="115" x2="185" y2="115" stroke="#475569" />
    <text x="115" y="130" fontSize="10" textAnchor="middle" fill="#334155">m = 2 · 10⁻⁶ m</text>
    <line x1="20" y1="40" x2="20" y2="100" stroke="#475569" />
    <text x="16" y="74" fontSize="9" textAnchor="end" fill="#334155">d</text>
    <text x="115" y="22" fontSize="10" textAnchor="middle" fill="#334155">d = 5 · 10⁻⁷ m</text>
    <text x="115" y="146" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9d174d">{ask} = ?</text>
  </svg>
);

/** Két mérési pont exponenciális növekedésnél. */
const TownFig: React.FC<{ ask: string }> = ({ ask }) => {
  const q = Math.pow(132000 / 130300, 1 / 4);
  const sx = (t: number) => 30 + t * 14;
  const sy = (n: number) => 125 - (n - 129500) / 75;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="30" y1="125" x2="232" y2="125" stroke="#475569" />
      <line x1="30" y1="128" x2="30" y2="12" stroke="#475569" />
      <path d={path((t) => 130300 * Math.pow(q, t), 0, 14, sx, sy)} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx={sx(0)} cy={sy(130300)} r="3.5" fill="#7c3aed" />
      <text x={sx(0) + 6} y={sy(130300) + 14} fontSize="9" fill="#4c1d95">1997: 130 300</text>
      <circle cx={sx(4)} cy={sy(132000)} r="3.5" fill="#7c3aed" />
      <text x={sx(4) + 6} y={sy(132000) + 12} fontSize="9" fill="#4c1d95">2001: 132 000</text>
      <circle cx={sx(13)} cy={sy(130300 * Math.pow(q, 13))} r="3.5" fill="#db2777" />
      <text x={sx(13) - 4} y={sy(130300 * Math.pow(q, 13)) - 6} fontSize="10" fontWeight="bold" textAnchor="end" fill="#9d174d">{ask}</text>
      <text x="228" y="140" fontSize="9" textAnchor="end" fill="#334155">t (év)</text>
    </svg>
  );
};

type Q = Omit<QuizQuestion, 'correctAnswer'> & { id: string; level: 1 | 2 | 3; options: React.ReactNode[]; explanation: string };
const mk = (q: Q): QuizQuestion => ({ ...q, correctAnswer: 0 });

const EXP_LOG_EXAM_QUESTIONS: QuizQuestion[] = [
  // ───────────── LEVEL 1 (30) ─────────────
  mk({ id: 'elx-1', level: 1, questionTypeBadge: 'Hatvány', question: 'Mennyi 2⁻³ értéke?', options: ['1/8', '−8', '−6', '8'], explanation: '2⁻³ = 1/2³ = 1/8. A negatív kitevő reciprokot jelent.' }),
  mk({ id: 'elx-2', level: 1, questionTypeBadge: 'Hatvány', question: 'Mennyi −3² értéke?', options: ['−9', '9', '−6', '6'], explanation: 'A hatványozás erősebb a negatív előjelnél: −3² = −(3²) = −9, míg (−3)² = 9.' }),
  mk({ id: 'elx-3', level: 1, questionTypeBadge: 'Azonosság', question: 'Melyik azonosság igaz azonos alapú hatványok szorzatára?', options: ['aᵐ · aⁿ = aᵐ⁺ⁿ', 'aᵐ · aⁿ = aᵐⁿ', 'aᵐ · aⁿ = (2a)ᵐ⁺ⁿ', 'aᵐ · aⁿ = aᵐ⁻ⁿ'], explanation: 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak.' }),
  mk({ id: 'elx-4', level: 1, questionTypeBadge: 'n-edik gyök', question: 'Mennyi ⁴√81 értéke?', options: ['3', '9', '20,25', '−3'], explanation: '3⁴ = 81, és a páros kitevőjű gyök nemnegatív, így ⁴√81 = 3.' }),
  mk({ id: 'elx-5', level: 1, questionTypeBadge: 'n-edik gyök', question: 'Mennyi ∛−8 értéke?', options: ['−2', '2', 'nincs értelmezve', '−8/3'], explanation: 'Páratlan kitevőjű gyök negatív számból is vonható: (−2)³ = −8.' }),
  mk({ id: 'elx-6', level: 1, questionTypeBadge: 'n-edik gyök', question: 'Milyen valós számokra értelmezzük a páros kitevőjű gyököt?', options: ['a nemnegatív számokra', 'minden valós számra', 'csak a pozitív egészekre', 'csak a negatív számokra'], explanation: 'Páros n esetén ⁿ√a csak a ≥ 0 esetén értelmezett, és értéke is nemnegatív.' }),
  mk({ id: 'elx-7', level: 1, questionTypeBadge: 'Törtkitevő', question: 'Mennyi 16^{1/2} értéke?', options: ['4', '8', '256', '1/16'], explanation: '16^{1/2} = √16 = 4.' }),
  mk({ id: 'elx-8', level: 1, questionTypeBadge: 'Törtkitevő', question: 'Mennyi 8^{1/3} értéke?', options: ['2', '8/3', '24', '1/2'], explanation: '8^{1/3} = ∛8 = 2.' }),
  mk({ id: 'elx-9', level: 1, questionTypeBadge: 'Törtkitevő', question: 'Mennyi 32^{3/5} értéke?', options: ['8', '2', '19,2', '6'], explanation: '32^{3/5} = (⁵√32)³ = 2³ = 8.' }),
  mk({ id: 'elx-10', level: 1, questionTypeBadge: 'Törtkitevő', question: 'Mennyi 81^{−1/2} értéke?', options: ['1/9', '−9', '9', '−1/9'], explanation: '81^{−1/2} = 1/√81 = 1/9. A negatív kitevő nem negatív előjelet jelent.' }),
  mk({ id: 'elx-11', level: 1, questionTypeBadge: 'Kamatos kamat', question: 'Évi 10%-os kamatos kamat esetén minden év végén mivel szorozzuk az év eleji összeget?', options: ['1,1', '0,1', '10', '1,01'], explanation: '100% + 10% = 110%, azaz 1,1-del.' }),
  mk({ id: 'elx-12', level: 1, questionTypeBadge: 'Kamatos kamat', question: '100 000 Ft-ot 1 évre lekötünk évi 5%-os kamatra. Mennyi lesz a pénzünk az év végén?', options: ['105 000 Ft', '150 000 Ft', '100 500 Ft', '95 000 Ft'], explanation: '100 000 · 1,05 = 105 000 Ft.' }),
  mk({ id: 'elx-13', level: 1, questionTypeBadge: 'Exp. függvény', question: 'Mi a valós számok halmazán értelmezett x ↦ 2ˣ függvény értékkészlete?', options: ['a pozitív valós számok', 'az összes valós szám', 'a nemnegatív valós számok', 'a pozitív egészek'], explanation: '2ˣ > 0 minden x-re, és minden pozitív értéket felvesz.' }),
  mk({ id: 'elx-14', level: 1, questionTypeBadge: 'Exp. függvény', question: 'Melyik ponton megy át minden x ↦ aˣ (a > 0, a ≠ 1) függvény grafikonja?', options: ['(0; 1)', '(1; 0)', '(0; 0)', '(1; 1)'], explanation: 'a⁰ = 1, ezért minden grafikon átmegy a (0; 1) ponton.' }),
  mk({ id: 'elx-15', level: 1, questionTypeBadge: 'Exp. függvény', question: 'Milyen az x ↦ 0,5ˣ függvény monotonitása?', options: ['szigorúan monoton csökkenő', 'szigorúan monoton növekvő', 'konstans', 'előbb csökken, majd nő'], explanation: 'Ha 0 < a < 1, az x ↦ aˣ függvény szigorúan csökkenő.' }),
  mk({ id: 'elx-16', level: 1, questionTypeBadge: 'Exp. folyamat', question: 'Mit ad meg a t ↦ N₀ · kᵗ hozzárendelésben az N₀?', options: ['a kezdeti értéket (t = 0)', 'a növekedési tényezőt', 'a felezési időt', 'az eltelt időt'], explanation: 't = 0 esetén N₀ · k⁰ = N₀, ez a kezdeti érték.' }),
  mk({ id: 'elx-17', level: 1, questionTypeBadge: 'Exp. folyamat', question: 'Milyen folyamatot ír le az F(t) = 5,67 · 0,79ᵗ függvény?', options: ['exponenciális csökkenést', 'exponenciális növekedést', 'lineáris csökkenést', 'állandó folyamatot'], explanation: 'A növekedési tényező 0,79 < 1, ezért a mennyiség időegységenként 21%-kal csökken.' }),
  mk({ id: 'elx-18', level: 1, questionTypeBadge: 'Felezési idő', question: 'Mit nevezünk egy exponenciálisan csökkenő mennyiség felezési idejének?', options: ['azt az időt, amely alatt a mennyiség a felére csökken', 'a folyamat teljes idejének felét', 'azt az időt, amely alatt a mennyiség elfogy', 'a kezdeti mennyiség felét'], explanation: 'A felezési idő alatt bármely időponttól számítva a mennyiség a felére csökken.' }),
  mk({ id: 'elx-19', level: 1, questionTypeBadge: 'Felezési idő', question: 'A jód-131 felezési ideje 8 nap. 100 g jódból mennyi marad 16 nap múlva?', figure: <DecayFig title="T = 8 nap, N₀ = 100 g" mark="16 nap: ?" />, options: ['25 g', '50 g', '12,5 g', '0 g'], explanation: '16 nap = 2 felezési idő: 100 → 50 → 25 g.' }),
  mk({ id: 'elx-20', level: 1, questionTypeBadge: 'Logaritmus', question: 'Mennyi log₂ 8 értéke?', options: ['3', '4', '16', '1/3'], explanation: '2³ = 8, ezért log₂ 8 = 3.' }),
  mk({ id: 'elx-21', level: 1, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) Mennyi log₃ 1 értéke?', options: ['0', '1', '3', '1/3'], explanation: '3⁰ = 1, ezért log₃ 1 = 0.' }),
  mk({ id: 'elx-22', level: 1, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) Mennyi 6^{log₆ 5} értéke?', options: ['5', '6', '30', '1'], explanation: 'A logaritmus definíciója szerint a^{logₐ b} = b, így 6^{log₆ 5} = 5.' }),
  mk({ id: 'elx-23', level: 1, questionTypeBadge: 'Tízes alapú log.', question: 'Mennyi lg 1000 értéke?', options: ['3', '100', '4', '30'], explanation: '10³ = 1000, ezért lg 1000 = 3.' }),
  mk({ id: 'elx-24', level: 1, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) Mennyi log₂ 0,5 értéke?', options: ['−1', '1', '0,25', '−2'], explanation: '2⁻¹ = 0,5, ezért log₂ 0,5 = −1.' }),
  mk({ id: 'elx-25', level: 1, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) log₀,₅ 4 = m. Mennyi m?', options: ['−2', '2', '−1/2', '8'], explanation: '0,5⁻² = 2² = 4, tehát m = −2.' }),
  mk({ id: 'elx-26', level: 1, questionTypeBadge: 'Egyetlen hatvány', question: '(Tudáspróba I.) Írd fel egyetlen hatványként: 2⁻⁴ · 4^{0,5}', options: ['2⁻³', '2⁻²', '8⁻²', '2⁻⁸'], explanation: '4^{0,5} = √4 = 2 = 2¹, így 2⁻⁴ · 2¹ = 2⁻³.' }),
  mk({ id: 'elx-27', level: 1, questionTypeBadge: 'Egyetlen hatvány', question: '(Tudáspróba I.) Írd fel egyetlen hatványként: (3^{1,5})²', options: ['3³', '3^{3,5}', '9³', '3^{2,25}'], explanation: '(aᵐ)ⁿ = aᵐⁿ: 3^{1,5 · 2} = 3³.' }),
  mk({ id: 'elx-28', level: 1, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) Mennyi 7^{log₇ 4} értéke?', options: ['4', '7', '28', '7/4'], explanation: 'a^{logₐ b} = b, ezért 7^{log₇ 4} = 4.' }),
  mk({ id: 'elx-29', level: 1, questionTypeBadge: 'Exp. egyenlet', question: 'Melyik adja meg az aˣ = b egyenlet megoldását (a > 0, a ≠ 1, b > 0)?', options: ['x = logₐ b', 'x = log_b a', 'x = b / a', 'x = b − a'], explanation: 'A logaritmus definíciója: logₐ b az a kitevő, amelyre a-t emelve b-t kapunk.' }),
  mk({ id: 'elx-30', level: 1, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Oldd meg: 2ˣ > 8.', options: ['x > 3', 'x < 3', 'x > 4', 'x > 2'], explanation: '8 = 2³, és az x ↦ 2ˣ szigorúan növekvő, így x > 3.' }),

  // ───────────── LEVEL 2 (30) ─────────────
  mk({ id: 'elx-31', level: 2, questionTypeBadge: 'Hatvány', question: 'Írd fel 2 hatványaként: 2³ · (2⁻²)⁻⁵', options: ['2¹³', '2⁻⁷', '2¹⁰', '2⁻⁴'], explanation: '(2⁻²)⁻⁵ = 2¹⁰, és 2³ · 2¹⁰ = 2¹³.' }),
  mk({ id: 'elx-32', level: 2, questionTypeBadge: 'Hatvány', question: 'Írd fel 3 hatványaként: 9² · 27⁻⁶', options: ['3⁻¹⁴', '3⁻²²', '3⁻⁴', '3¹⁴'], explanation: '9² = 3⁴, 27⁻⁶ = 3⁻¹⁸, így 3⁴⁻¹⁸ = 3⁻¹⁴.' }),
  mk({ id: 'elx-33', level: 2, questionTypeBadge: 'n-edik gyök', question: 'Egy kocka térfogata 64 cm³. Mekkora az éle?', figure: <CubeFig label="V = 64 cm³" />, options: ['4 cm', '8 cm', '16 cm', '21,3 cm'], explanation: 'a = ∛64 = 4 cm, mert 4³ = 64.' }),
  mk({ id: 'elx-34', level: 2, questionTypeBadge: 'n-edik gyök', question: 'Mennyi ∛(27/8) értéke?', options: ['3/2', '9/8', '27/2', '3/8'], explanation: '∛27 = 3 és ∛8 = 2, így ∛(27/8) = 3/2.' }),
  mk({ id: 'elx-35', level: 2, questionTypeBadge: 'Törtkitevő', question: 'Mennyi 27^{4/3} értéke?', options: ['81', '36', '9', '243'], explanation: '27^{4/3} = (∛27)⁴ = 3⁴ = 81.' }),
  mk({ id: 'elx-36', level: 2, questionTypeBadge: 'Azonosság', question: 'Mennyi 6,25^{1/3} · 6,25^{1/6} értéke?', options: ['2,5', '6,25', '1,25', '3,125'], explanation: 'A kitevők összeadódnak: 1/3 + 1/6 = 1/2, és 6,25^{1/2} = 2,5.' }),
  mk({ id: 'elx-37', level: 2, questionTypeBadge: 'Törtkitevő', question: 'Melyik egyenlő ¹⁵√(7⁶)-nal?', options: ['⁵√49', '∛7', '⁵√7', '√7'], explanation: '¹⁵√(7⁶) = 7^{6/15} = 7^{2/5} = ⁵√(7²) = ⁵√49.' }),
  mk({ id: 'elx-38', level: 2, questionTypeBadge: 'Kamatos kamat', question: '200 000 Ft-ot 2 évre kötünk le évi 10%-os kamatos kamatra. Mennyi lesz a pénzünk?', options: ['242 000 Ft', '240 000 Ft', '220 000 Ft', '400 000 Ft'], explanation: '200 000 · 1,1² = 200 000 · 1,21 = 242 000 Ft.' }),
  mk({ id: 'elx-39', level: 2, questionTypeBadge: 'Értékcsökkenés', question: 'Egy autó értéke évente az előző évi értékének 20%-ával csökken. Mivel szorozzuk évente az értékét?', options: ['0,8', '0,2', '1,2', '−0,2'], explanation: '100% − 20% = 80%, azaz 0,8-del.' }),
  mk({ id: 'elx-40', level: 2, questionTypeBadge: 'Exp. függvény', question: 'Legyen f(x) = 3ˣ. Mennyi f(−2)?', options: ['1/9', '−9', '−6', '9'], explanation: 'f(−2) = 3⁻² = 1/9.' }),
  mk({ id: 'elx-41', level: 2, questionTypeBadge: 'Exp. függvény', question: 'Az x ↦ aˣ függvény grafikonja átmegy a (2; 9) ponton. Mennyi a?', figure: <ExpGraphFig a={3} px={2} label="(2; 9)" />, options: ['3', '4,5', '81', '9'], explanation: 'a² = 9 és a > 0, tehát a = 3.' }),
  mk({ id: 'elx-42', level: 2, questionTypeBadge: 'Exp. folyamat', question: 'Mennyi a t ↦ 4^{2t} folyamat növekedési tényezője?', options: ['16', '8', '4', '2'], explanation: '4^{2t} = (4²)ᵗ = 16ᵗ, tehát a növekedési tényező 16.' }),
  mk({ id: 'elx-43', level: 2, questionTypeBadge: 'Exp. folyamat', question: 'Mennyi a G(t) = 3,8 · 1,25⁻ᵗ folyamat növekedési tényezője?', options: ['0,8', '1,25', '−1,25', '0,75'], explanation: '1,25⁻ᵗ = (1/1,25)ᵗ = 0,8ᵗ, tehát a tényező 0,8 (csökkenés).' }),
  mk({ id: 'elx-44', level: 2, questionTypeBadge: 'Felezési idő', question: 'Három felezési idő elteltével a kezdeti mennyiség hányad része marad meg?', figure: <DecayFig title="N(t) = N₀ · (1/2)^(t/T)" mark="3T: ?" />, options: ['1/8', '1/6', '1/3', '1/9'], explanation: '(1/2)³ = 1/8.' }),
  mk({ id: 'elx-45', level: 2, questionTypeBadge: 'Felezési idő', question: 'Mennyi a felezési idő az M(t) = 28,9 · 2^{−t/8} folyamatban?', options: ['8', '1/8', '28,9', '16'], explanation: '2^{−t/8} = (1/2)^{t/8}, így t = 8 időegység alatt feleződik.' }),
  mk({ id: 'elx-46', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) log₈ k = 4/3. Mennyi k?', options: ['16', '32/3', '6', '4'], explanation: 'k = 8^{4/3} = (∛8)⁴ = 2⁴ = 16.' }),
  mk({ id: 'elx-47', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) log₂₇ k = 2/3. Mennyi k?', options: ['9', '18', '3', '81'], explanation: 'k = 27^{2/3} = (∛27)² = 3² = 9.' }),
  mk({ id: 'elx-48', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) logₐ 243 = 5. Mennyi a?', options: ['3', '48,6', '5', '9'], explanation: 'a⁵ = 243 és 3⁵ = 243, tehát a = 3.' }),
  mk({ id: 'elx-49', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) logₐ 128 = 7. Mennyi a?', options: ['2', '7', '128/7', '4'], explanation: 'a⁷ = 128 = 2⁷, tehát a = 2.' }),
  mk({ id: 'elx-50', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) Mennyi log₇ ³√7 értéke?', options: ['1/3', '3', '7/3', '−3'], explanation: '³√7 = 7^{1/3}, ezért log₇ ³√7 = 1/3.' }),
  mk({ id: 'elx-51', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba II.) Mennyi (1/3)^{log₃ 12} értéke?', options: ['1/12', '12', '4', '1/4'], explanation: '(1/3)^{log₃ 12} = 3^{−log₃ 12} = 1 / 3^{log₃ 12} = 1/12.' }),
  mk({ id: 'elx-52', level: 2, questionTypeBadge: 'Logaritmus', question: '(Tudáspróba I.) Mennyi log₄ (1/2) értéke?', options: ['−1/2', '−2', '1/2', '2'], explanation: '4^{−1/2} = 1/√4 = 1/2, ezért log₄ (1/2) = −1/2.' }),
  mk({ id: 'elx-53', level: 2, questionTypeBadge: 'Exp. egyenlőtlenség', question: '(Tudáspróba I.) Oldd meg: (2/3)ˣ ≤ 4/9.', options: ['x ≥ 2', 'x ≤ 2', 'x ≥ −2', 'x ≤ −2'], explanation: '4/9 = (2/3)², és az alap 1-nél kisebb, ezért a reláció megfordul: x ≥ 2.' }),
  mk({ id: 'elx-54', level: 2, questionTypeBadge: 'Exp. egyenlőtlenség', question: '(Tudáspróba II.) Oldd meg: 0,64 < 0,8ˣ.', options: ['x < 2', 'x > 2', 'x < 0,8', 'x > 0,64'], explanation: '0,64 = 0,8², és 0 < 0,8 < 1, ezért 0,8² < 0,8ˣ ⇔ x < 2.' }),
  mk({ id: 'elx-55', level: 2, questionTypeBadge: 'Egyetlen hatvány', question: '(Tudáspróba II.) Írd fel egyetlen hatványként: 3⁻⁴ · 3⁷', options: ['3³', '3⁻²⁸', '3¹¹', '9³'], explanation: 'A kitevők összeadódnak: −4 + 7 = 3.' }),
  mk({ id: 'elx-56', level: 2, questionTypeBadge: 'Egyetlen hatvány', question: '(Tudáspróba II.) Írd fel egyetlen hatványként: (2^{0,5})⁸', options: ['2⁴', '2^{8,5}', '2^{1/16}', '4⁸'], explanation: '(aᵐ)ⁿ = aᵐⁿ: 2^{0,5 · 8} = 2⁴.' }),
  mk({ id: 'elx-57', level: 2, questionTypeBadge: 'Egyetlen hatvány', question: '(Tudáspróba II.) Írd fel egyetlen hatványként: (⁴√5)³', options: ['5^{3/4}', '5^{4/3}', '5¹²', '5^{7}'], explanation: '⁴√5 = 5^{1/4}, így (5^{1/4})³ = 5^{3/4}.' }),
  mk({ id: 'elx-58', level: 2, questionTypeBadge: 'Tízes alapú log.', question: 'lg x = −2. Mennyi x?', options: ['0,01', '−100', '−20', '0,1'], explanation: 'x = 10⁻² = 0,01.' }),
  mk({ id: 'elx-59', level: 2, questionTypeBadge: 'Logaritmus', question: 'Oldd meg: 1,056ᵗ = 6 (BSE-modell). Melyik a legjobb közelítés?', options: ['t ≈ 32,9', 't ≈ 5,7', 't ≈ 107', 't ≈ 3,3'], explanation: 't = log₁,₀₅₆ 6 = lg 6 / lg 1,056 ≈ 0,778 / 0,0237 ≈ 32,9.' }),
  mk({ id: 'elx-60', level: 2, questionTypeBadge: 'Exp. folyamat', question: 'Egy tápoldatban kezdetben 3 millió kólibaktérium van, számuk 15 percenként megduplázódik. Hány baktérium lesz 1,5 óra múlva?', options: ['192 millió', '18 millió', '96 millió', '384 millió'], explanation: '90 perc = 6 · 15 perc, így 3 000 000 · 2⁶ = 192 000 000.' }),

  // ───────────── LEVEL 3 (30) ─────────────
  mk({ id: 'elx-61', level: 3, questionTypeBadge: 'Exp. modell', question: 'Egy város lakossága 1997-ben 130 300, 2001-ben 132 000 fő volt (exponenciális növekedés). Hányszorosára nőtt egy év alatt?', figure: <TownFig ask="q = ?" />, options: ['≈ 1,00325', '≈ 1,01305', '≈ 1,0425', '≈ 1,00130'], explanation: 'q⁴ = 132 000 / 130 300 ≈ 1,01305, így q = ⁴√1,01305 ≈ 1,00325. (Az 1,01305 a 4 év alatti szorzó.)' }),
  mk({ id: 'elx-62', level: 3, questionTypeBadge: 'Exp. modell', question: 'Ugyanebben a modellben (130 300 fő 1997-ben, évente ≈ 1,00325-szörös) kb. hány lakosa volt a városnak 2010. január 1-jén?', figure: <TownFig ask="2010: ?" />, options: ['≈ 135 900', '≈ 137 500', '≈ 132 000', '≈ 147 800'], explanation: 'L(13) = 130 300 · (132 000 / 130 300)^{13/4} ≈ 135 900 fő.' }),
  mk({ id: 'elx-63', level: 3, questionTypeBadge: 'Exp. modell', question: 'Melyik hozzárendelés adja meg a lakosok számát t évvel 1997 után (1997: 130 300, 2001: 132 000)?', options: ['t ↦ 130 300 · (132 000 / 130 300)^{t/4}', 't ↦ 130 300 · (132 000 / 130 300)^{4t}', 't ↦ 130 300 + 425 · t', 't ↦ 132 000 · (130 300 / 132 000)^{t/4}'], explanation: 'A 4 év alatti szorzó 132 000 / 130 300, így t év alatt ennek t/4-edik hatványa. (A lineáris modell nem exponenciális.)' }),
  mk({ id: 'elx-64', level: 3, questionTypeBadge: 'Felezési idő', question: 'Egy ólomizotóp felezési ideje 27 perc. Kezdetben 3 mol (1 mol = 6 · 10²³ részecske) van. Melyik képlet adja meg a t perc múlva még el nem bomlott részecskék számát?', options: ['N(t) = 1,8 · 10²⁴ · (1/2)^{t/27}', 'N(t) = 1,8 · 10²⁴ · (1/2)^{27t}', 'N(t) = 3 · (1/2)^{t/27}', 'N(t) = 1,8 · 10²⁴ · 27^{−t}'], explanation: '3 · 6 · 10²³ = 1,8 · 10²⁴, és 27 percenként feleződik: (1/2)^{t/27}.' }),
  mk({ id: 'elx-65', level: 3, questionTypeBadge: 'Felezési idő', question: 'Ólom (T = 27 perc) és bizmut (T = 19,7 perc) kezdetben ugyanannyi van. Kb. mennyi idő múlva lesz ólomból tízszer annyi, mint bizmutból?', options: ['≈ 242 perc', '≈ 73 perc', '≈ 24 perc', '≈ 466 perc'], explanation: '(1/2)^{t/27} = 10 · (1/2)^{t/19,7} ⇒ t · (1/19,7 − 1/27) = log₂ 10 ≈ 3,322 ⇒ t ≈ 242 perc.' }),
  mk({ id: 'elx-66', level: 3, questionTypeBadge: 'Normálalak', question: '(Érettségi 2013) Mekkora a 2 μm magas, 0,5 μm átmérőjű forgáshenger térfogata?', figure: <CylinderFig ask="V" />, options: ['≈ 3,93 · 10⁻¹⁹ m³', '≈ 1,57 · 10⁻¹⁸ m³', '≈ 3,93 · 10⁻¹³ m³', '≈ 7,85 · 10⁻¹⁹ m³'], explanation: 'r = 2,5 · 10⁻⁷ m: V = r²π · m = 6,25 · 10⁻¹⁴ · π · 2 · 10⁻⁶ ≈ 3,93 · 10⁻¹⁹ m³. (1,57 · 10⁻¹⁸ az átmérővel számolva jönne ki.)' }),
  mk({ id: 'elx-67', level: 3, questionTypeBadge: 'Normálalak', question: '(Érettségi 2013) Mekkora a 2 μm magas, 0,5 μm átmérőjű forgáshenger felszíne?', figure: <CylinderFig ask="A" />, options: ['≈ 3,53 · 10⁻¹² m²', '≈ 3,14 · 10⁻¹² m²', '≈ 3,93 · 10⁻¹² m²', '≈ 3,53 · 10⁻¹⁸ m²'], explanation: 'A = 2r²π + 2rπ · m = 2π · 6,25 · 10⁻¹⁴ + 2π · 2,5 · 10⁻⁷ · 2 · 10⁻⁶ ≈ 3,93 · 10⁻¹³ + 3,14 · 10⁻¹² ≈ 3,53 · 10⁻¹² m².' }),
  mk({ id: 'elx-68', level: 3, questionTypeBadge: 'Exp. egyenlet', question: '(Érettségi 2013) B(t) = 3 000 000 · 2^{t/15}. Hány perc alatt éri el a baktériumok száma a 600 milliót (egészre kerekítve)?', options: ['115 perc', '3000 perc', '8 perc', '200 perc'], explanation: '2^{t/15} = 200 ⇒ t = 15 · log₂ 200 = 15 · lg 200 / lg 2 ≈ 114,66 ≈ 115 perc.' }),
  mk({ id: 'elx-69', level: 3, questionTypeBadge: 'Exp. folyamat', question: '(Tudáspróba I.) A polóniumizotópok száma 1 hónap alatt 6 · 10²³-ról 5,16 · 10²³-ra csökkent. Hányadrészére csökken a számuk fél év alatt?', options: ['≈ 0,405-ére (≈ 40,5%)', '≈ 0,16-ára (16%)', '≈ 0,84-ére (84%)', '≈ 0,86-ára (86%)'], explanation: 'A havi szorzó 5,16 / 6 = 0,86, így 6 hónap alatt 0,86⁶ ≈ 0,405.' }),
  mk({ id: 'elx-70', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: '(Tudáspróba I.) A polónium havonta 0,86-szorosára csökken. Mennyi idő alatt csökken 20% alá?', options: ['kb. 10,7 hónap után', 'kb. 1,4 hónap után', 'kb. 4,6 hónap után', 'kb. 5,7 hónap után'], explanation: '0,86ᵗ < 0,2 ⇒ t > lg 0,2 / lg 0,86 ≈ 10,67 hónap (a reláció megfordul, mert lg 0,86 < 0).' }),
  mk({ id: 'elx-71', level: 3, questionTypeBadge: 'Felezési idő', question: '(Tudáspróba I.) A polónium havonta 0,86-szorosára csökken. Mennyi a felezési ideje?', options: ['≈ 4,6 hónap', '≈ 0,22 hónap', '≈ 3,5 hónap', '≈ 5,8 hónap'], explanation: '0,86ᵀ = 0,5 ⇒ T = lg 0,5 / lg 0,86 ≈ 4,60 hónap.' }),
  mk({ id: 'elx-72', level: 3, questionTypeBadge: 'Kamatos kamat', question: '(Tudáspróba I.) Hajni 50 000 Ft-ot 3 évre köt le évi 8%-os kamatos kamatra. Mennyi pénzhez jut?', options: ['≈ 62 986 Ft', '62 000 Ft', '≈ 54 000 Ft', '≈ 68 024 Ft'], explanation: '50 000 · 1,08³ = 50 000 · 1,259712 ≈ 62 986 Ft. (62 000 Ft egyszerű kamattal jönne ki.)' }),
  mk({ id: 'elx-73', level: 3, questionTypeBadge: 'Kamatos kamat', question: '(Tudáspróba I.) Csilla 50 000 Ft-ot 34 hónapra köt le havi 0,7%-os kamatos kamatra. Mennyit kap, és kinek éri meg jobban (Hajni: ≈ 62 986 Ft)?', options: ['≈ 63 383 Ft, Csillának', '≈ 61 900 Ft, Hajninak', '≈ 63 383 Ft, Hajninak', '≈ 74 000 Ft, Csillának'], explanation: '50 000 · 1,007³⁴ ≈ 63 383 Ft > 62 986 Ft, tehát Csilla jár jobban (ráadásul rövidebb ideig köti le).' }),
  mk({ id: 'elx-74', level: 3, questionTypeBadge: 'Kamatos kamat', question: '(Tudáspróba II.) 350 000 Ft-ot évi 4,5%-os kamatos kamatra teszünk. Hány év alatt lesz 30%-kal több pénzünk?', options: ['6 év', '5 év', '7 év', '30 év'], explanation: '1,045ⁿ ≥ 1,3 ⇒ n ≥ lg 1,3 / lg 1,045 ≈ 5,96 ⇒ 6 év (1,045⁵ ≈ 1,246; 1,045⁶ ≈ 1,302).' }),
  mk({ id: 'elx-75', level: 3, questionTypeBadge: 'Exp. egyenlet', question: '(Tudáspróba II.) N(t) = 4,2 · 10²⁴ · 0,97ᵗ (t percben). Mennyi idő múlva lesz a részecskeszám 1 mol, azaz 6 · 10²³?', options: ['≈ 63,9 perc', '≈ 22,8 perc', '≈ 7 perc', '≈ 233 perc'], explanation: '0,97ᵗ = 6 · 10²³ / 4,2 · 10²⁴ = 1/7 ⇒ t = lg(1/7) / lg 0,97 ≈ 63,9 perc.' }),
  mk({ id: 'elx-76', level: 3, questionTypeBadge: 'Felezési idő', question: '(Tudáspróba II.) N(t) = 4,2 · 10²⁴ · 0,97ᵗ. Mennyi a felezési idő?', options: ['≈ 22,8 perc', '≈ 16,7 perc', '≈ 0,04 perc', '≈ 48,5 perc'], explanation: '0,97ᵀ = 0,5 ⇒ T = lg 0,5 / lg 0,97 ≈ 22,76 perc. (A 16,7 perc = 50/3 akkor jönne ki, ha percenként mindig a kezdeti mennyiség 3%-a bomlana el, azaz lineáris lenne a csökkenés.)' }),
  mk({ id: 'elx-77', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'A ¹⁴C felezési ideje 5730 év. Legfeljebb milyen régi az a csont, amelynek ¹⁴C-tartalma még több mint 15%-a az eredetinek?', options: ['≈ 15 680 év', '≈ 860 év', '≈ 4870 év', '≈ 38 200 év'], explanation: '(1/2)^{t/5730} > 0,15 ⇒ t < 5730 · lg 0,15 / lg 0,5 ≈ 15 683 év.' }),
  mk({ id: 'elx-78', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Egy részvény értéke f(x) = 2000 · 1,002ˣ Ft (x nap múlva). Mely egész napokon lesz az értéke 2300 és 2400 Ft között?', options: ['70 ≤ x ≤ 91', '69 ≤ x ≤ 92', '150 ≤ x ≤ 200', '7 ≤ x ≤ 9'], explanation: '1,15 < 1,002ˣ < 1,2 ⇒ 69,95 < x < 91,25, egész napokra 70 ≤ x ≤ 91.' }),
  mk({ id: 'elx-79', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Egy webáruház napi vásárlásainak száma N(x) = 10 · 1,08ˣ (x nap a nyitás óta). Hányadik napon lépi át először a napi 100-at?', options: ['a 30. napon', 'a 29. napon', 'a 10. napon', 'a 125. napon'], explanation: '1,08ˣ > 10 ⇒ x > lg 10 / lg 1,08 ≈ 29,92, tehát a 30. napon (N(29) ≈ 93,2; N(30) ≈ 100,6).' }),
  mk({ id: 'elx-80', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Oldd meg: 0,06 < 0,6ˣ < 6.', options: ['≈ −3,51 < x < ≈ 5,51', '≈ −5,51 < x < ≈ 3,51', 'x < −3,51 vagy x > 5,51', '−1 < x < 1'], explanation: 'Az alap 1-nél kisebb, ezért a relációk megfordulnak: log₀,₆ 6 < x < log₀,₆ 0,06, azaz kb. −3,51 < x < 5,51.' }),
  mk({ id: 'elx-81', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Oldd meg: (1/2)ˣ < 8.', options: ['x > −3', 'x < −3', 'x < 3', 'x > 3'], explanation: '8 = (1/2)⁻³, és 0 < 1/2 < 1, ezért a reláció megfordul: x > −3.' }),
  mk({ id: 'elx-82', level: 3, questionTypeBadge: 'Exp. egyenlőtlenség', question: 'Oldd meg: 3ˣ ≤ 2187.', options: ['x ≤ 7', 'x ≥ 7', 'x ≤ 729', 'x ≤ 6'], explanation: '2187 = 3⁷, és az x ↦ 3ˣ növekvő, így x ≤ 7.' }),
  mk({ id: 'elx-83', level: 3, questionTypeBadge: 'Log. egyenlet', question: '(Érettségi 2012) Mely valós x-ekre teljesül log₂ x² = 4?', options: ['x = 4 vagy x = −4', 'csak x = 4', 'x = 2 vagy x = −2', 'csak x = 16'], explanation: 'x² = 2⁴ = 16 ⇒ x = ±4. Mindkettő jó, mert x² > 0.' }),
  mk({ id: 'elx-84', level: 3, questionTypeBadge: 'Log. egyenlet', question: '(Érettségi 2007) Oldd meg a pozitív valós számok halmazán: log₁₆ x = −1/2.', options: ['x = 1/4', 'x = −4', 'x = −8', 'x = 4'], explanation: 'x = 16^{−1/2} = 1/√16 = 1/4.' }),
  mk({ id: 'elx-85', level: 3, questionTypeBadge: 'Exp. egyenlet', question: '(Érettségi 2016) Oldd meg: 2ˣ = 10 (három tizedesjegyre).', options: ['x ≈ 3,322', 'x = 5', 'x ≈ 0,301', 'x ≈ 3,162'], explanation: 'x = lg 10 / lg 2 = 1 / 0,30103 ≈ 3,322. (3,162 = √10.)' }),
  mk({ id: 'elx-86', level: 3, questionTypeBadge: 'Exp. egyenlet', question: '(Érettségi 2018) Oldd meg: 4ˣ = 8 (tizedes tört alakban).', options: ['x = 1,5', 'x = 2', 'x = 0,5', 'x = 1,25'], explanation: '2²ˣ = 2³ ⇒ 2x = 3 ⇒ x = 1,5.' }),
  mk({ id: 'elx-87', level: 3, questionTypeBadge: 'Richter-skála', question: '(Érettségi 2011) M = −4,42 + (2/3) · lg E. Mekkora erősségű az a rengés, amelyben E = 1,344 · 10¹⁴ J energia szabadul fel?', options: ['≈ 5,0', '≈ 9,7', '≈ 14,1', '≈ 2,8'], explanation: 'lg(1,344 · 10¹⁴) ≈ 14,128; (2/3) · 14,128 ≈ 9,419; −4,42 + 9,419 ≈ 5,0.' }),
  mk({ id: 'elx-88', level: 3, questionTypeBadge: 'Richter-skála', question: 'M = −4,42 + (2/3) · lg E. Ha egy földrengés erőssége 2-vel nagyobb egy másikénál, hányszor akkora energia szabadult fel?', options: ['1000-szer', '100-szor', '3-szor', '2-szer'], explanation: 'ΔM = (2/3) · Δlg E = 2 ⇒ Δlg E = 3 ⇒ az energiák aránya 10³ = 1000.' }),
  mk({ id: 'elx-89', level: 3, questionTypeBadge: 'n-edik gyök', question: 'Hollandia népessége 1950-ben 10 millió, 2013-ban 16,78 millió fő volt. Mennyi volt az átlagos évi népszaporodás?', options: ['≈ 0,825%', '≈ 1,08%', '≈ 6,78%', '≈ 0,11%'], explanation: 'q = ⁶³√1,678 ≈ 1,00825, vagyis évente ≈ 0,825%. (1,08% a 67,8% / 63 lineáris átlag lenne.)' }),
  mk({ id: 'elx-90', level: 3, questionTypeBadge: 'Összehasonlítás', question: '(4. feladat) Melyik a legnagyobb: (−2)³, −2⁴, 2⁻³, (−2)⁻⁴?', options: ['2⁻³', '(−2)⁻⁴', '(−2)³', '−2⁴'], explanation: '(−2)³ = −8, −2⁴ = −16, 2⁻³ = 1/8, (−2)⁻⁴ = 1/16. A legnagyobb az 1/8 = 2⁻³.' })
];

export const ExpLogPracticeExamQuiz: React.FC<{
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
      topicId="g11-exp-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 kérdés 3 szinten (30 kérdés/szint) a teljes III. fejezetből: hatvány, gyök, törtkitevő, kamatos kamat, exponenciális folyamatok, felezési idő, logaritmus."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={EXP_LOG_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hatvány, gyök, törtkitevő',
          items: [
            'a⁰ = 1; a⁻ⁿ = 1/aⁿ; aᵐ · aⁿ = aᵐ⁺ⁿ; (aᵐ)ⁿ = aᵐⁿ',
            'páros n: ⁿ√a csak a ≥ 0-ra; páratlan n: minden a-ra',
            'a^{p/q} = (q-adik gyök a)ᵖ; a^{−p/q} = 1 / a^{p/q}',
            '32^{3/5} = 8; 27^{4/3} = 81; 81^{−1/2} = 1/9'
          ]
        },
        {
          title: 'Exponenciális folyamatok',
          items: [
            'N(t) = N₀ · kᵗ: k > 1 nő, 0 < k < 1 csökken',
            'Kamatos kamat: Aₙ = A · (1 + p/100)ⁿ',
            'Felezés: N(t) = N₀ · (1/2)^{t/T}',
            'két mérésből: k = (N₁ / N₀)^{1/Δt}'
          ]
        },
        {
          title: 'Logaritmus',
          items: [
            'aˣ = b ⇔ x = logₐ b (a > 0, a ≠ 1, b > 0)',
            'logₐ b = lg b / lg a; a^{logₐ b} = b',
            'logₐ 1 = 0; logₐ a = 1',
            '0 < a < 1: a kitevők között megfordul a reláció'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExpLogPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ExpLogPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ExpLogPracticeExamQuiz;
