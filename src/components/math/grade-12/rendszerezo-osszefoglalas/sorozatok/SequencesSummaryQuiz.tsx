import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SequencesSummaryMatcher } from './SequencesSummaryMatcher';
import { SequencesSummarySorter } from './SequencesSummarySorter';
import { SeqChain, S_BLUE, S_RED, S_INK, S_GREEN, S_PURPLE } from './sumKit';

const QFIG = 'w-full max-w-[280px] h-auto mx-auto';

const FIG_Q1 = <SeqChain terms={['3', '9', '15', '21', 'a₅ = ?']} ops="+6" />;
const FIG_Q2 = <SeqChain terms={['3', '6', '12', '24', '…']} ops="· q = ?" />;
const FIG_Q11 = <SeqChain terms={['2', '?', '?', '54']} ops="+d" color={S_PURPLE} />;
const FIG_Q14 = <SeqChain terms={['a₃ = −7', 'a₄', 'a₅ = −112']} ops="· q" color={S_RED} />;

const FIG_Q6 = (
  <svg viewBox="0 0 240 150" className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={30 + i * 70} y={120 - (60 + i * 15)} width="44" height={60 + i * 15} rx="4" fill={i === 0 ? '#bfdbfe' : '#bbf7d0'} stroke={i === 0 ? S_BLUE : S_GREEN} />
        <text x={52 + i * 70} y={112 - (60 + i * 15)} fontSize="10" textAnchor="middle" fill={S_INK} fontWeight="bold">
          {['2 000 000', '· 1,08', '?'][i]}
        </text>
        <text x={52 + i * 70} y="136" fontSize="9.5" textAnchor="middle" fill="#475569">
          {['most', '1. év', '2. év'][i]}
        </text>
      </g>
    ))}
    <line x1="20" x2="225" y1="120" y2="120" stroke={S_INK} />
  </svg>
);

const FIG_Q15 = (
  <svg viewBox="0 0 240 150" className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={120 - (30 + i * 7)} y={20 + i * 9} width={2 * (30 + i * 7)} height="6" rx="3" fill={i === 11 ? '#fecaca' : '#e0e7ff'} stroke={i === 11 ? S_RED : '#6366f1'} strokeWidth="0.8" />
    ))}
    <text x="120" y="16" fontSize="9.5" textAnchor="middle" fill={S_INK}>
      12 sor, soronként +10 hely
    </text>
    <text x="120" y="146" fontSize="10" textAnchor="middle" fill={S_RED} fontWeight="bold">
      12. sor: 210 hely · összesen: ?
    </text>
  </svg>
);

const FIG_Q16 = (
  <svg viewBox="0 0 240 150" className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[1, 2, 3, 4].map((k, i) => {
      const y = 128 - i * 28;
      return (
        <g key={k}>
          {Array.from({ length: k }, (_, j) => (
            <path key={j} d={`M ${120 - (k - 1) * 9 + j * 18 - 5} ${y - 16} l 10 0 l -2 16 l -6 0 z`} fill="#e0f2fe" stroke={S_BLUE} strokeWidth="0.9" />
          ))}
          <rect x="70" y={y} width="100" height="4" fill="#94a3b8" />
          <text x="185" y={y - 4} fontSize="9.5" fill="#475569">
            {k} pohár
          </text>
        </g>
      );
    })}
    <text x="20" y="20" fontSize="10" fill={S_RED} fontWeight="bold">
      összesen 66 pohár: ? tálca
    </text>
  </svg>
);

const FIG_Q21 = <SeqChain terms={['6', '12', '24', '…', 'n = ?']} ops={['· 2', '· 2', '', '']} title="Sₙ > 10⁷ – legalább hány tag?" color={S_GREEN} />;

const FIG_Q23 = (
  <svg viewBox="0 0 240 120" className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="25" x2="215" y1="60" y2="60" stroke={S_INK} strokeWidth="2" />
    <circle cx="25" cy="60" r="5" fill={S_BLUE} />
    <circle cx="215" cy="60" r="5" fill={S_RED} />
    <text x="25" y="82" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">A</text>
    <text x="215" y="82" fontSize="11" textAnchor="middle" fill={S_RED} fontWeight="bold">B</text>
    <text x="120" y="52" fontSize="10" textAnchor="middle" fill={S_INK}>189 km</text>
    <text x="25" y="25" fontSize="9" fill={S_BLUE}>12 h: 21; 19,6; … km</text>
    <text x="215" y="102" fontSize="9" textAnchor="end" fill={S_RED}>14 h: 18; 20; … km</text>
    <text x="120" y="102" fontSize="11" textAnchor="middle" fill={S_GREEN} fontWeight="bold">találkozás: ?</text>
  </svg>
);

const SEQUENCES_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sseq-q1',
    questionTypeBadge: 'Számtani n-edik tag',
    figure: FIG_Q1,
    level: 1,
    question: 'A 3; 9; 15; 21; … számtani sorozatnak mennyi az 5. tagja?',
    options: ['27', '33', '30', '24'],
    correctAnswer: 0,
    explanation: 'a₁ = 3, d = 6, a₅ = a₁ + 4d = 3 + 24 = 27. (A 33 az a₁ + 5d hibás képletből jön.)'
  },
  {
    id: 'sseq-q2',
    questionTypeBadge: 'Kvóciens',
    figure: FIG_Q2,
    level: 1,
    question: 'Mennyi a 3; 6; 12; 24; … mértani sorozat kvóciense?',
    options: ['2', '3', '6', '1/2'],
    correctAnswer: 0,
    explanation: 'q = a₂/a₁ = 6/3 = 2; minden tag az előző kétszerese.'
  },
  {
    id: 'sseq-q3',
    questionTypeBadge: 'Megadás képlettel',
    level: 1,
    question: 'Melyik képlet adja meg a pozitív páros számok növekvő sorozatát (2; 4; 6; 8; …)?',
    options: ['aₙ = 2n', 'aₙ = 2ⁿ', 'aₙ = n + 2', 'aₙ = 2n − 1'],
    correctAnswer: 0,
    explanation: 'n = 1, 2, 3, 4-re 2n értéke 2; 4; 6; 8. A 2ⁿ már a 3. tagnál 8-at adna, a 2n − 1 a páratlanokat adja.'
  },
  {
    id: 'sseq-q4',
    questionTypeBadge: 'Rekurzió',
    level: 1,
    question: 'Egy sorozat első tagja −9, második tagja 4, és minden további tag az előtte álló két tag összege. Mennyi a 4. tag?',
    options: ['−1', '−5', '−6', '9'],
    correctAnswer: 0,
    explanation: 'a₃ = −9 + 4 = −5, a₄ = 4 + (−5) = −1. (A −5 a 3. tag, a −6 az 5. tag.)'
  },
  {
    id: 'sseq-q5',
    questionTypeBadge: 'Mértani n-edik tag',
    level: 1,
    question: 'Egy mértani sorozat második tagja −1/9, hányadosa 3. Mennyi az 5. tagja?',
    options: ['−3', '−1', '3', '−9'],
    correctAnswer: 0,
    explanation: 'a₅ = a₂ · q³ = −1/9 · 27 = −3. (A −1 a 4. tag, a −9 a 6. tag.)'
  },
  {
    id: 'sseq-q6',
    questionTypeBadge: 'Kamatos kamat',
    figure: FIG_Q6,
    level: 1,
    question: '2 millió Ft-ot évi 8%-os kamatos kamatra teszünk. Mennyi lesz a számlán 2 teljes év után?',
    options: ['2 332 800 Ft', '2 320 000 Ft', '2 160 000 Ft', '2 519 424 Ft'],
    correctAnswer: 0,
    explanation: 'A₂ = 2 000 000 · 1,08² = 2 332 800 Ft. A 2 320 000 Ft egyszerű kamattal jönne ki, a 2 519 424 Ft 3 év után.'
  },
  {
    id: 'sseq-q7',
    questionTypeBadge: 'Szimmetrikus tagok',
    level: 1,
    question: 'Egy számtani sorozat 3., 4. és 5. tagjának összege 123, differenciája 5. Mennyi a 6. tag?',
    options: ['51', '46', '56', '41'],
    correctAnswer: 0,
    explanation: 'a₃ + a₄ + a₅ = 3a₄ = 123 ⇒ a₄ = 41, így a₆ = a₄ + 2d = 51.'
  },
  {
    id: 'sseq-q8',
    questionTypeBadge: 'Mértani sorozat?',
    level: 1,
    question: 'Melyik egy mértani sorozat kezdete?',
    options: ['108; −36; 12; −4; …', '12; 7; 2; −3; …', '1; 4; 9; 16; …', '2; 4; 6; 8; …'],
    correctAnswer: 0,
    explanation: '108; −36; 12; −4 esetén a szomszédos tagok hányadosa állandó: q = −1/3. A 12; 7; 2; −3 számtani (d = −5).'
  },
  {
    id: 'sseq-q9',
    questionTypeBadge: 'Összegképlet',
    level: 1,
    question: 'Melyik a mértani sorozat első n tagjának összegképlete (q ≠ 1)?',
    options: ['Sₙ = a₁ · (qⁿ − 1)/(q − 1)', 'Sₙ = (a₁ + aₙ)/2 · n', 'Sₙ = a₁ · qⁿ⁻¹', 'Sₙ = n · a₁ · q'],
    correctAnswer: 0,
    explanation: 'Mértani sorozatra Sₙ = a₁ · (qⁿ − 1)/(q − 1). Az (a₁ + aₙ)/2 · n a számtani sorozat összegképlete, a₁ · qⁿ⁻¹ az n-edik tag.'
  },
  {
    id: 'sseq-q10',
    questionTypeBadge: 'Számtani és mértani',
    level: 1,
    question: 'Melyik sorozat számtani ÉS mértani sorozat is? (n ∈ N⁺)',
    options: ['bₙ = 6', 'aₙ = 6n', 'dₙ = 6ⁿ', 'cₙ = n⁶'],
    correctAnswer: 0,
    explanation: 'A konstans 6 sorozat számtani (d = 0) és mértani (q = 1) is. 6n csak számtani, 6ⁿ csak mértani, n⁶ egyik sem.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'sseq-q11',
    questionTypeBadge: 'Számok beiktatása',
    figure: FIG_Q11,
    level: 2,
    question: 'A 2 és az 54 közé két számot iktatunk úgy, hogy számtani sorozat négy egymást követő tagját kapjuk. Melyik ez a két szám?',
    options: ['58/3 és 110/3', '18 és 36', '28 és 41', '6 és 18'],
    correctAnswer: 0,
    explanation: '54 = 2 + 3d ⇒ d = 52/3, a beiktatott tagok 2 + 52/3 = 58/3 és 2 + 104/3 = 110/3. (A 6 és 18 a mértani sorozatot adná: 2; 6; 18; 54.)'
  },
  {
    id: 'sseq-q12',
    questionTypeBadge: 'Számtani összeg',
    level: 2,
    question: 'Mennyi a kétjegyű páratlan számok összege?',
    options: ['2475', '2430', '4905', '2500'],
    correctAnswer: 0,
    explanation: '11; 13; …; 99: a₁ = 11, d = 2, 45 tag; S₄₅ = (11 + 99)/2 · 45 = 2475. (A 2430 a kétjegyű párosak, a 4905 az összes kétjegyű szám összege.)'
  },
  {
    id: 'sseq-q13',
    questionTypeBadge: 'Maradékos sorozat',
    level: 2,
    question: 'Melyik az 50. olyan pozitív egész szám, amely 7-tel osztva 3 maradékot ad?',
    options: ['346', '353', '339', '350'],
    correctAnswer: 0,
    explanation: 'A számok: 3; 10; 17; … (a₁ = 3, d = 7), a₅₀ = 3 + 49 · 7 = 346. (A 353 az 51. tag.)'
  },
  {
    id: 'sseq-q14',
    questionTypeBadge: 'Kvóciens két tagból',
    figure: FIG_Q14,
    level: 2,
    question: 'Egy mértani sorozat 3. tagja −7, 5. tagja −112. Mennyi lehet a kvóciense?',
    options: ['4 vagy −4', 'csak 4', 'csak −4', '16'],
    correctAnswer: 0,
    explanation: 'a₅ = a₃ · q² ⇒ q² = 16 ⇒ q = 4 vagy q = −4 (mindkettőnél a₅ = −112). A 16 a q² értéke.'
  },
  {
    id: 'sseq-q15',
    questionTypeBadge: 'Számtani összeg',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy cirkusz 12 sorában minden sorban 10 hellyel több van, mint az előzőben; az utolsó sorban 210 hely van. Hány ember fér el?',
    options: ['1860', '2520', '1920', '1800'],
    correctAnswer: 0,
    explanation: 'a₁₂ = a₁ + 11 · 10 = 210 ⇒ a₁ = 100; S₁₂ = (100 + 210)/2 · 12 = 1860. (A 2520 = 12 · 210, mintha minden sor ugyanakkora lenne.)'
  },
  {
    id: 'sseq-q16',
    questionTypeBadge: 'Összegből tagszám',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy artista a tálcákra rendre 1, 2, 3, … poharat tesz. Hány tálcát halmoz egymásra, ha összesen 66 poharat helyez el?',
    options: ['11', '12', '10', '33'],
    correctAnswer: 0,
    explanation: '1 + 2 + … + n = n(n + 1)/2 = 66 ⇒ n² + n − 132 = 0 ⇒ n = 11 (a −12 nem jó).'
  },
  {
    id: 'sseq-q17',
    questionTypeBadge: 'Számtani sorozat?',
    level: 2,
    question: 'Lehet-e a √5; √20; √45 egy számtani sorozat három egymást követő tagja?',
    options: ['Igen, d = √5', 'Igen, d = √15', 'Nem, mert √20 − √5 ≠ √45 − √20', 'Nem, mert a tagok irracionálisak'],
    correctAnswer: 0,
    explanation: '√20 = 2√5, √45 = 3√5, így a tagok √5; 2√5; 3√5, a különbség mindig √5.'
  },
  {
    id: 'sseq-q18',
    questionTypeBadge: 'Mértani tag',
    level: 2,
    question: 'Egy mértani sorozat 3. tagja −2, 6. tagja 250. Mennyi a 10. tagja?',
    options: ['156 250', '−156 250', '31 250', '781 250'],
    correctAnswer: 0,
    explanation: 'q³ = 250/(−2) = −125 ⇒ q = −5; a₁₀ = a₆ · q⁴ = 250 · 625 = 156 250 (páros kitevő, pozitív).'
  },
  {
    id: 'sseq-q19',
    questionTypeBadge: 'Kezdőtőke',
    level: 2,
    question: 'Mennyit helyezett el egy befektető évi 7%-os kamatos kamatra, ha 10 év után 32 millió Ft volt a számláján (közben nem nyúlt hozzá)?',
    options: ['≈ 16,27 millió Ft', '≈ 18,82 millió Ft', '≈ 15,49 millió Ft', '≈ 17,41 millió Ft'],
    correctAnswer: 0,
    explanation: 'A₀ · 1,07¹⁰ = 32 · 10⁶ ⇒ A₀ = 32 · 10⁶/1,07¹⁰ ≈ 16,27 millió Ft. (18,82 = 32/1,7 egyszerű kamattal; 15,49 = 32 · 0,93¹⁰ hibás.)'
  },
  {
    id: 'sseq-q20',
    questionTypeBadge: 'Tagja-e?',
    level: 2,
    question: 'Egy számtani sorozat első tagja 7, differenciája −9. Tagja-e a sorozatnak a −472?',
    options: ['Nem, mert (−472 − 7)/(−9) nem egész', 'Igen, az 54. tag', 'Igen, az 53. tag', 'Igen, az 55. tag'],
    correctAnswer: 0,
    explanation: '7 + (n − 1)(−9) = −472 ⇒ n − 1 = 479/9 ≈ 53,2, ez nem egész. (a₅₄ = −470, a₅₅ = −479.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'sseq-q21',
    questionTypeBadge: 'Összeg korlát felett',
    figure: FIG_Q21,
    level: 3,
    question: 'A 6; 12; 24; … mértani sorozatnak legalább hány tagját kell összeadni (az elsőtől kezdve), hogy az összeg 10⁷-nél nagyobb legyen?',
    options: ['21', '20', '22', '24'],
    correctAnswer: 0,
    explanation: '6 · (2ⁿ − 1) > 10⁷ ⇒ 2ⁿ > 10⁷/6 + 1 ⇒ n > lg(10⁷/6 + 1)/lg 2 ≈ 20,67, tehát n = 21. (S₂₀ ≈ 6,3 · 10⁶ még kevés.)'
  },
  {
    id: 'sseq-q22',
    questionTypeBadge: 'Értékcsökkenés',
    level: 3,
    question: 'Egy 42 millió Ft-os gép értéke évente az előző évi 90%-ára esik, de a karbantartás évi 300 000 Ft-tal növeli. Mennyit ér 8 év múlva (százezer Ft-ra kerekítve)?',
    options: ['19 800 000 Ft', '18 100 000 Ft', '20 500 000 Ft', '17 800 000 Ft'],
    correctAnswer: 0,
    explanation: '42 · 10⁶ · 0,9⁸ + 300 000 · (0,9⁸ − 1)/(0,9 − 1) ≈ 19 788 221 Ft ≈ 19,8 millió Ft. (18,1 millió a karbantartás nélkül, 20,5 millió, ha a 8 · 300 000 Ft nem csökken.)'
  },
  {
    id: 'sseq-q23',
    questionTypeBadge: 'Mozgás + sorozat',
    figure: FIG_Q23,
    level: 3,
    question: 'A-ból délben indul egy kerékpáros (1. óra 21 km, utána óránként 1,4 km-rel kevesebb), a 189 km-re lévő B-ből 14 órakor egy másik (18 km, utána óránként 2 km-rel több). Mikor és A-tól milyen messze találkoznak?',
    options: ['18 órakor, 105 km-re', '18 órakor, 84 km-re', '17 órakor, 91 km-re', '19 órakor, 117,6 km-re'],
    correctAnswer: 0,
    explanation: 'S_A(n) + S_B(n − 2) = 189 ⇒ 0,3n² + 34,7n − 219 = 0 ⇒ n = 6. S_A(6) = (42 − 7)/2 · 6 = 105 km, S_B(4) = 84 km. (84 km a B-től mért távolság.)'
  },
  {
    id: 'sseq-q24',
    questionTypeBadge: 'Hány év alatt?',
    level: 3,
    question: 'Évi 6%-os kamatos kamat mellett hány teljes év alatt lesz egy betét legalább másfélszerese a kezdetinek?',
    options: ['7 év', '9 év', '6 év', '25 év'],
    correctAnswer: 0,
    explanation: '1,06ⁿ ≥ 1,5 ⇒ n ≥ lg 1,5/lg 1,06 ≈ 6,96, tehát 7 év. (A 9 év egyszerű kamattal jönne: 50/6 ≈ 8,3.)'
  },
  {
    id: 'sseq-q25',
    questionTypeBadge: 'Kamatláb',
    level: 3,
    question: 'Hány százalékos éves kamatos kamat mellett duplázódik meg a pénzünk 20 év alatt?',
    options: ['≈ 3,53%', '5%', '≈ 3,0%', '≈ 4,1%'],
    correctAnswer: 0,
    explanation: '(1 + p/100)²⁰ = 2 ⇒ 1 + p/100 = 2^{1/20} ≈ 1,0353 ⇒ p ≈ 3,53. (Az 5% = 100%/20 az egyszerű kamat.)'
  },
  {
    id: 'sseq-q26',
    questionTypeBadge: 'Gyűjtőjáradék',
    level: 3,
    question: 'Egy befektető 6 éven át minden év elején 1 200 000 Ft-ot tesz a gyűjtőszámlájára évi 8%-os kamatos kamatra. Mennyi lesz a 6. év végén a számlán?',
    options: ['≈ 9 507 364 Ft', '≈ 8 803 115 Ft', '7 200 000 Ft', '7 776 000 Ft'],
    correctAnswer: 0,
    explanation: '1,2 · 10⁶ · (1,08⁶ + 1,08⁵ + … + 1,08) = 1,2 · 10⁶ · 1,08 · (1,08⁶ − 1)/0,08 ≈ 9 507 364 Ft. (8 803 115 Ft akkor, ha év végén fizetne be.)'
  },
  {
    id: 'sseq-q27',
    questionTypeBadge: 'Törlesztőrészlet',
    level: 3,
    question: '1 500 000 Ft hitelt 4 év alatt, 4 egyenlő éves (év végi) részletben törlesztenek, évi 9%-os kamat mellett. Mekkora egy részlet?',
    options: ['≈ 463 003 Ft', '375 000 Ft', '408 750 Ft', '≈ 529 343 Ft'],
    correctAnswer: 0,
    explanation: 'H · 1,09⁴ = t · (1,09³ + 1,09² + 1,09 + 1) ⇒ t = 1,5 · 10⁶ · 1,09⁴ · 0,09/(1,09⁴ − 1) ≈ 463 003 Ft. (375 000 Ft kamat nélkül, 529 343 Ft = 1,5 · 10⁶ · 1,09⁴/4.)'
  },
  {
    id: 'sseq-q28',
    questionTypeBadge: 'Összegek aránya',
    level: 3,
    question: 'Egy számtani sorozat első két tagjának összege 48, a 2., 3. és 4. tag összege 54. Hányszorosa az első 10 tag összege a második 10 tag (11.–20.) összegének?',
    options: ['−1/4', '1/4', '−4', '−1/3'],
    correctAnswer: 0,
    explanation: '2a₁ + d = 48, 3a₃ = 54 ⇒ a₃ = 18 = a₁ + 2d ⇒ a₁ = 26, d = −4. S₁₀ = 80, S₂₀ = −240, a második 10 tag összege −320, hányados 80/(−320) = −1/4.'
  },
  {
    id: 'sseq-q29',
    questionTypeBadge: 'Abszolút értékek összege',
    level: 3,
    question: 'Egy számtani sorozat első tagja 7, differenciája −9. Mennyi az első 30 tag abszolút értékének összege?',
    options: ['3719', '3705', '3691', '3726'],
    correctAnswer: 0,
    explanation: 'S₃₀ = (14 + 29 · (−9))/2 · 30 = −3705. Csak a₁ = 7 pozitív, ezért |a₁| + … + |a₃₀| = −S₃₀ + 2 · 7 = 3719. (A 3705 csak |S₃₀|.)'
  },
  {
    id: 'sseq-q30',
    questionTypeBadge: 'Havi kamatozás',
    level: 3,
    question: 'Egy cirkusz telt házas (1860 fős) előadásán a jegy 1500 Ft. A bevétel 25%-a költség, a többit havi 1%-os kamatos kamatra teszik. Mennyi lesz a számlán egy év múlva?',
    options: ['≈ 2 357 881 Ft', '2 343 600 Ft', '≈ 3 143 842 Ft', '2 113 425 Ft'],
    correctAnswer: 0,
    explanation: '1860 · 1500 = 2 790 000 Ft, ennek 75%-a 2 092 500 Ft; 12 hónap: 2 092 500 · 1,01¹² ≈ 2 357 881 Ft. (2 343 600 Ft egyszerű 12%-kal, 3 143 842 Ft a költségek levonása nélkül.)'
  }
];

export const SequencesSummaryQuiz: React.FC<{
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
      topicId="g12-sum-sorozatok-quiz"
      subtopicId="sorozatok"
      title="6. Sorozatok – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: megadás, számtani és mértani sorozat, összegképletek, kamatos kamat, gyűjtőjáradék, törlesztés."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={SEQUENCES_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számtani sorozat',
          items: ['aₙ − aₙ₋₁ = d állandó.', 'aₙ = a₁ + (n − 1)d.', 'Sₙ = (a₁ + aₙ)/2 · n = (2a₁ + (n − 1)d)/2 · n.', 'Három szomszédos tag: a − d; a; a + d.']
        },
        {
          title: 'Mértani sorozat',
          items: ['aₙ/aₙ₋₁ = q ≠ 0 állandó.', 'aₙ = a₁ · qⁿ⁻¹.', 'Sₙ = a₁ · (qⁿ − 1)/(q − 1), ha q ≠ 1; Sₙ = n · a₁, ha q = 1.', 'aₘ = aₖ · qᵐ⁻ᵏ.']
        },
        {
          title: 'Pénzügyek',
          items: [
            'Kamatos kamat: Aₙ = A₀ · (1 + p/100)ⁿ.',
            'Gyűjtőjáradék (év eleji a): a · q · (qⁿ − 1)/(q − 1).',
            'Törlesztőrészlet: t = H · qⁿ · (q − 1)/(qⁿ − 1).',
            'Ismeretlen kitevő: logaritmus (n = lg x/lg q).'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SequencesSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SequencesSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SequencesSummaryQuiz;
