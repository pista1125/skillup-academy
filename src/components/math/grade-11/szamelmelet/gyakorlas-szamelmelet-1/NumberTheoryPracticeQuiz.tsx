import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberTheoryPracticeMatcher } from './NumberTheoryPracticeMatcher';
import { NumberTheoryPracticeSorter } from './NumberTheoryPracticeSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Halmazábra A, B, C halmazzal, egy kérdőjeles számmal. */
const VennFig: React.FC<{ n: string }> = ({ n }) => (
  <svg viewBox="0 0 240 160" className={FIG_CLASS}>
    <circle cx="92" cy="66" r="46" fill="#10b981" fillOpacity="0.12" stroke="#047857" strokeWidth="1.8" />
    <circle cx="148" cy="66" r="46" fill="#0ea5e9" fillOpacity="0.12" stroke="#0284c7" strokeWidth="1.8" />
    <circle cx="120" cy="108" r="46" fill="#a855f7" fillOpacity="0.12" stroke="#7c3aed" strokeWidth="1.8" />
    <text x="44" y="24" fontSize="13" fontWeight="bold" fill="#047857">A</text>
    <text x="188" y="24" fontSize="13" fontWeight="bold" fill="#0284c7">B</text>
    <text x="172" y="152" fontSize="13" fontWeight="bold" fill="#7c3aed">C</text>
    <text x="212" y="90" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0f172a">{n}</text>
    <text x="212" y="108" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#dc2626">?</text>
  </svg>
);

/** Dominó 2-6 és kérdés. */
const DominoFig: React.FC = () => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="60" y="16" width="120" height="60" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <line x1="120" y1="22" x2="120" y2="70" stroke="#334155" strokeWidth="1.5" />
    {[
      [75, 31],
      [105, 61]
    ].map(([x, y], i) => (
      <circle key={`l${i}`} cx={x} cy={y} r="4.5" fill="#0f172a" />
    ))}
    {[
      [135, 31],
      [165, 31],
      [135, 46],
      [165, 46],
      [135, 61],
      [165, 61]
    ].map(([x, y], i) => (
      <circle key={`r${i}`} cx={x} cy={y} r="4.5" fill="#0f172a" />
    ))}
    <text x="120" y="100" fontSize="11.5" textAnchor="middle" fill="#334155">a 2-6-os dominó: 2 · 6 = 12 nem prím</text>
  </svg>
);

/** Sorok facsemetékkel. */
const RowsFig: React.FC = () => (
  <svg viewBox="0 0 240 130" className={FIG_CLASS}>
    {[8, 9, 10, 12].map((r, i) => (
      <g key={r}>
        <text x="8" y={24 + i * 26} fontSize="10" fontWeight="bold" fill="#065f46">{r}-as sor</text>
        {Array.from({ length: r }, (_, k) => (
          <circle key={k} cx={66 + k * 9} cy={20 + i * 26} r="3.5" fill="#22c55e" />
        ))}
        {Array.from({ length: 5 }, (_, k) => (
          <circle key={`e${k}`} cx={184 + k * 9} cy={20 + i * 26} r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.6" />
        ))}
      </g>
    ))}
    <text x="120" y="124" fontSize="10.5" textAnchor="middle" fill="#334155">utolsó sor mindig 5 fa; összesen &lt; 500 – hány fa?</text>
  </svg>
);

/** Helyiérték-táblázat. */
const PlaceFig: React.FC<{ heads: string[]; digits: string[]; note: string }> = ({ heads, digits, note }) => {
  const w = 220 / heads.length;
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      {heads.map((h, i) => (
        <g key={i}>
          <rect x={10 + i * w} y="12" width={w - 4} height="28" rx="6" fill="#d1fae5" stroke="#047857" />
          <text x={10 + i * w + (w - 4) / 2} y="31" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">{h}</text>
          <rect x={10 + i * w} y="46" width={w - 4} height="34" rx="6" fill="#ffffff" stroke="#94a3b8" />
          <text x={10 + i * w + (w - 4) / 2} y="69" fontSize="17" textAnchor="middle" fontWeight="bold" fill="#0f172a">{digits[i]}</text>
        </g>
      ))}
      <text x="120" y="104" fontSize="11.5" textAnchor="middle" fill="#334155">{note}</text>
    </svg>
  );
};

/** Kétjegyű szám: 10a + b − (a + b). */
const DigitFig: React.FC = () => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="60" y="14" width="50" height="44" rx="8" fill="#d1fae5" stroke="#047857" strokeWidth="1.5" />
    <rect x="114" y="14" width="50" height="44" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <text x="85" y="44" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#065f46">a</text>
    <text x="139" y="44" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#075985">b</text>
    <text x="120" y="84" fontSize="13" textAnchor="middle" fill="#0f172a">10a + b − (a + b) = ?</text>
    <text x="120" y="106" fontSize="10.5" textAnchor="middle" fill="#64748b">kétjegyű szám mínusz a jegyeinek összege</text>
  </svg>
);

const NUMBER_THEORY_PRACTICE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: alapfogalmak (1–10)
  {
    id: 'ntp-q1',
    level: 1,
    questionTypeBadge: 'Számhalmazok',
    question: 'Melyik számhalmaz zárt mind a négy alapműveletre (a 0-val való osztást kivéve)?',
    options: ['A racionális számok halmaza (ℚ)', 'Az egész számok halmaza (ℤ)', 'A természetes számok halmaza (ℕ)', 'Az irracionális számok halmaza'],
    correctAnswer: 0,
    explanation: 'ℕ-ből a kivonás, ℤ-ből az osztás kivezet; ℚ-ban két szám összege, különbsége, szorzata és hányadosa is racionális. Az irracionálisok még a szorzásra sem zártak: √2 · √2 = 2.'
  },
  {
    id: 'ntp-q2',
    level: 1,
    questionTypeBadge: 'Tizedes tört',
    question: 'Melyik tört tizedes tört alakja véges?',
    options: ['7/25', '4/9', '5/6', '17/11'],
    correctAnswer: 0,
    explanation: 'A tovább nem egyszerűsíthető tört akkor véges tizedes tört, ha a nevező prímtényezői csak 2 és 5 lehetnek: 25 = 5², 7/25 = 28/100 = 0,28. A 9, 6 és 11 nevezőnél végtelen szakaszos tört jön ki.'
  },
  {
    id: 'ntp-q3',
    level: 1,
    questionTypeBadge: 'Prímszám',
    question: 'Melyik prímszám az alábbiak közül?',
    options: ['97', '91', '87', '51'],
    correctAnswer: 0,
    explanation: '91 = 7 · 13, 87 = 3 · 29, 51 = 3 · 17. A 97 nem osztható a √97 < 10 alatti prímekkel (2, 3, 5, 7), tehát prím.'
  },
  {
    id: 'ntp-q4',
    level: 1,
    questionTypeBadge: 'Prímtényezők',
    question: 'Mi a 72 prímtényezős felbontása?',
    options: ['2³ · 3²', '2² · 3³', '2⁴ · 3', '2 · 3 · 12'],
    correctAnswer: 0,
    explanation: '72 = 8 · 9 = 2³ · 3². (2² · 3³ = 108, 2⁴ · 3 = 48, a 2 · 3 · 12 pedig nem csak prímekből áll.)'
  },
  {
    id: 'ntp-q5',
    level: 1,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van a 72-nek?',
    options: ['12', '6', '10', '5'],
    correctAnswer: 0,
    explanation: '72 = 2³ · 3², az osztók száma (3 + 1) · (2 + 1) = 12: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72.'
  },
  {
    id: 'ntp-q6',
    level: 1,
    questionTypeBadge: 'Lnko',
    question: 'Mennyi a 24 és a 36 legnagyobb közös osztója, (24; 36)?',
    options: ['12', '6', '72', '4'],
    correctAnswer: 0,
    explanation: '24 = 2³ · 3, 36 = 2² · 3²; a közös prímek a kisebbik kitevőn: 2² · 3 = 12. (72 az lkkt.)'
  },
  {
    id: 'ntp-q7',
    level: 1,
    questionTypeBadge: 'Oszthatóság',
    question: 'Osztható-e 45-tel a 765?',
    options: ['Igen, mert 5-re végződik és jegyeinek összege 18', 'Nem, mert nem osztható 3-mal', 'Igen, mert 5-re végződik', 'Nem, mert nem osztható 9-cel'],
    correctAnswer: 0,
    explanation: '45 = 5 · 9 és (5; 9) = 1. A 765 osztható 5-tel (5-re végződik) és 9-cel (7 + 6 + 5 = 18), tehát 45-tel is: 765 = 45 · 17.'
  },
  {
    id: 'ntp-q8',
    level: 1,
    questionTypeBadge: 'Maradék',
    question: 'Mennyi a 13 579 maradéka 4-gyel osztva?',
    options: ['3', '1', '2', '0'],
    correctAnswer: 0,
    explanation: 'A 4-gyel való osztási maradék az utolsó két jegyből álló szám maradéka: 79 = 4 · 19 + 3, így a maradék 3.'
  },
  {
    id: 'ntp-q9',
    level: 1,
    questionTypeBadge: 'Logika',
    question: '„Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel.” Igaz-e?',
    options: ['Hamis, ellenpélda a 12', 'Igaz, mert 4 · 6 = 24', 'Igaz, mert a 24 osztható 4-gyel és 6-tal', 'Hamis, ellenpélda a 24'],
    correctAnswer: 0,
    explanation: 'A 12 osztható 4-gyel és 6-tal, de 24-gyel nem, tehát az állítás hamis. A 4 és a 6 nem relatív prímek; helyesen: [4; 6] = 12 | n.'
  },
  {
    id: 'ntp-q10',
    level: 1,
    questionTypeBadge: 'Számrendszer',
    question: 'Mennyi az 10011010₂ tízes számrendszerben?',
    figure: <PlaceFig heads={['128', '64', '32', '16', '8', '4', '2', '1']} digits={['1', '0', '0', '1', '1', '0', '1', '0']} note="10011010₂ = ?" />,
    options: ['154', '155', '77', '308'],
    correctAnswer: 0,
    explanation: '128 + 16 + 8 + 2 = 154.'
  },

  // LEVEL 2: tankönyvi gyakorló feladatok (11–20)
  {
    id: 'ntp-q11',
    level: 2,
    questionTypeBadge: 'Lkkt',
    question: 'Egy kertészet 500-nál kevesebb facsemetét ad. Ha soronként 8, 9, 10 vagy 12 csemetét ültetnek, az utolsó sorba mindig 5 jut. Hány csemetét kaptak?',
    figure: <RowsFig />,
    options: ['365', '360', '485', '125'],
    correctAnswer: 0,
    explanation: 'n − 5 osztható 8-cal, 9-cel, 10-zel és 12-vel, így [8; 9; 10; 12] = 360 többszöröse. 500 alatt n = 365. (485 és 125 9-cel osztva 8 maradékot ad.)'
  },
  {
    id: 'ntp-q12',
    level: 2,
    questionTypeBadge: 'Prímek',
    question: 'Egy dominókészletben (0–6 pötty, minden pár egyszer) hány dominón prímszám a két rész pöttyszámának szorzata? (Érettségi 2018)',
    figure: <DominoFig />,
    options: ['3', '4', '6', '2'],
    correctAnswer: 0,
    explanation: 'A szorzat csak akkor prím, ha az egyik tényező 1, a másik prím: 1-2, 1-3, 1-5. Ez 3 dominó.'
  },
  {
    id: 'ntp-q13',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Legyen q = 13 579 és r = 123 456. Mennyi a q² · r ötös maradéka?',
    options: ['1', '4', '0', '2'],
    correctAnswer: 0,
    explanation: 'q maradéka 4, r maradéka 1 (5-tel osztva). q² · r maradéka 4² · 1 = 16 maradéka, azaz 1.'
  },
  {
    id: 'ntp-q14',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Legyen p = 86 420 és q = 13 579. Mennyi a p · q hármas maradéka?',
    options: ['2', '0', '1', 'Csak a szorzás elvégzése után dönthető el'],
    correctAnswer: 0,
    explanation: 'p jegyösszege 20, maradéka 2; q jegyösszege 25, maradéka 1. A szorzat maradéka 2 · 1 = 2.'
  },
  {
    id: 'ntp-q15',
    level: 2,
    questionTypeBadge: '9 többszörösei',
    question: 'Egy kétjegyű számból kivonjuk a számjegyei összegét. Mit tudunk biztosan az eredményről?',
    figure: <DigitFig />,
    options: ['9 többszöröse', 'Páros szám', '10 többszöröse', 'Prímszám'],
    correctAnswer: 0,
    explanation: '10a + b − (a + b) = 9a, tehát az eredmény mindig 9, 18, …, 81 valamelyike. (Pl. 23 − 5 = 18, de 34 − 7 = 27 páratlan.)'
  },
  {
    id: 'ntp-q16',
    level: 2,
    questionTypeBadge: 'Halmazok',
    question: 'A = {100-nál nem nagyobb pozitív egészek}, B = {300-nál nem nagyobb, 3-mal osztható pozitív egészek}, C = {400-nál nem nagyobb, 4-gyel osztható pozitív egészek}. Melyik halmaznak eleme az 52?',
    figure: <VennFig n="52" />,
    options: ['A-nak és C-nek, B-nek nem', 'Csak A-nak', 'Mindháromnak', 'A-nak és B-nek, C-nek nem'],
    correctAnswer: 0,
    explanation: '52 ≤ 100, tehát A eleme; jegyösszege 7, ezért 3-mal nem osztható (nem eleme B-nek); 52 = 4 · 13 ≤ 400, tehát C eleme.'
  },
  {
    id: 'ntp-q17',
    level: 2,
    questionTypeBadge: 'Lnko',
    question: 'a = 2⁴ · 3⁵ · 5² · 7 · 11² és b = 2ᵏ · 3ˡ · 5ᵐ · 7ⁿ · 11ᵖ. Mennyi l és m, ha (a; b) = 2⁴ · 3² · 7 · 11?',
    options: ['l = 2 és m = 0', 'l = 2 és m = 2', 'l = 5 és m = 0', 'l ≥ 2 és m = 1'],
    correctAnswer: 0,
    explanation: 'Az lnko-ban a kisebbik kitevő áll. A 3 kitevője 2, és a-ban 5, ezért b-ben pontosan 2. Az 5 nem szerepel az lnko-ban, de a-ban igen (5²), így b-ben 5⁰ kell: m = 0.'
  },
  {
    id: 'ntp-q18',
    level: 2,
    questionTypeBadge: 'Prímek',
    question: 'Mennyi a 20-nál kisebb pozitív prímszámok összege, és milyen paritású?',
    options: ['77, páratlan', '75, páratlan', '58, páros', '60, páros'],
    correctAnswer: 0,
    explanation: '2 + 3 + 5 + 7 + 11 + 13 + 17 + 19 = 77, ami páratlan (érettségi 2007, 2013). (75 a 2 nélkül, 58 a 19 nélkül jönne ki.)'
  },
  {
    id: 'ntp-q19',
    level: 2,
    questionTypeBadge: 'Számrendszer',
    question: '„Hatszor kilenc: negyvenkettő.” (Galaxis útikalauz stopposoknak) Melyik alapú számrendszerben igaz a 6 · 9 = 42?',
    options: ['13-as', '12-es', '14-es', '11-es'],
    correctAnswer: 0,
    explanation: '6 · 9 = 54, és 42 a b alapú rendszerben 4b + 2. 4b + 2 = 54 ⇒ b = 13.'
  },
  {
    id: 'ntp-q20',
    level: 2,
    questionTypeBadge: 'Számrendszer',
    question: 'Írd át az 1A7B₁₂ számot tízes számrendszerbe! (A = 10, B = 11)',
    figure: <PlaceFig heads={['1728', '144', '12', '1']} digits={['1', 'A', '7', 'B']} note="1A7B₁₂ = ?" />,
    options: ['3263', '3262', '2711', '3407'],
    correctAnswer: 0,
    explanation: '1 · 1728 + 10 · 144 + 7 · 12 + 11 = 1728 + 1440 + 84 + 11 = 3263.'
  },

  // LEVEL 3: érettségi típusú feladatok (21–30)
  {
    id: 'ntp-q21',
    level: 3,
    questionTypeBadge: 'Lkkt',
    question: 'a = 2⁴ · 3⁵ · 5² · 7 · 11². Hány olyan b = 2ᵏ · 3ˡ · 5ᵐ · 7ⁿ · 11ᵖ szám van, amelyre [a; b] = 2⁶ · 3⁵ · 5³ · 7³ · 11⁶?',
    options: ['6', '1', '5', '36'],
    correctAnswer: 0,
    explanation: 'Az lkkt-ben a nagyobbik kitevő áll: k = 6, m = 3, n = 3, p = 6 egyértelmű; a 3 kitevője a-ban már 5, ezért l bármelyik lehet 0, 1, …, 5 közül. Így 6 ilyen b van.'
  },
  {
    id: 'ntp-q22',
    level: 3,
    questionTypeBadge: 'Prímtényezők',
    question: 'a = 2⁴ · 3⁵ · 5² · 7 · 11². Melyik b-re igaz, hogy a · b = 2¹⁰ · 3⁶ · 5³ · 7² · 11⁵?',
    options: ['2⁶ · 3 · 5 · 7 · 11³', '2⁵ · 3 · 5 · 7 · 11³', '2⁶ · 3 · 5² · 7 · 11³', '2¹⁰ · 3⁶ · 5³ · 7² · 11⁵'],
    correctAnswer: 0,
    explanation: 'Szorzásnál a kitevők összeadódnak, így b kitevői a különbségek: 10 − 4 = 6, 6 − 5 = 1, 3 − 2 = 1, 2 − 1 = 1, 5 − 2 = 3.'
  },
  {
    id: 'ntp-q23',
    level: 3,
    questionTypeBadge: 'Négyzetszám',
    question: 'a = 2⁴ · 3⁵ · 5² · 7 · 11². Mi a legkisebb pozitív egész b, amelyre a · b négyzetszám?',
    options: ['21', '3', '7', '231'],
    correctAnswer: 0,
    explanation: 'Négyzetszámban minden kitevő páros. a-ban a 3 kitevője (5) és a 7 kitevője (1) páratlan, ezért b-nek legalább 3 · 7 = 21-nek kell lennie.'
  },
  {
    id: 'ntp-q24',
    level: 3,
    questionTypeBadge: 'Oszthatóság',
    question: 'b = 2ᵏ · 3ˡ · 5ᵐ · 7ⁿ · 11ᵖ. Pontosan mely esetekben osztható b 720-szal?',
    options: ['Ha k ≥ 4, l ≥ 2 és m ≥ 1', 'Ha k = 4, l = 2 és m = 1', 'Ha k ≥ 3, l ≥ 2 és m ≥ 1', 'Ha k ≥ 4, l ≥ 2, m ≥ 1 és n ≥ 1'],
    correctAnswer: 0,
    explanation: '720 = 2⁴ · 3² · 5. b akkor osztható vele, ha minden prím legalább ekkora kitevővel szerepel benne; a 7 és 11 kitevője tetszőleges.'
  },
  {
    id: 'ntp-q25',
    level: 3,
    questionTypeBadge: 'Logika',
    question: 'Melyik következtetés helyes?',
    options: ['Ha 29 | b, akkor 29 | 17b', 'Ha 6 | b és 9 | b, akkor 54 | b', 'Ha 3 | b és 7 | b, akkor 10 | b', 'Ha 6 | b és 10 | b, akkor 60 | b'],
    correctAnswer: 0,
    explanation: 'Ha 29 | b, akkor b minden többszöröse, így 17b is osztható 29-cel. Ellenpéldák: 18 (6 | 18, 9 | 18, de 54 ∤ 18); 21 (3 és 7 osztója, 10 nem); 30 (6 és 10 osztója, 60 nem).'
  },
  {
    id: 'ntp-q26',
    level: 3,
    questionTypeBadge: 'Oszthatóság',
    question: 'Melyik állítás HAMIS?',
    options: ['75 | 10²⁰²² − 55', '12 | 10²⁰²² + 632', '9 | 10²⁰²¹ − 1', '72 | 10¹⁰²⁴ + 101 024'],
    correctAnswer: 0,
    explanation: '10²⁰²² − 55 = 99…945, utolsó két jegye 45, ezért 25-tel (így 75-tel) sem osztható. A többi igaz: …632 (4 | 32, jegyösszeg 12); 99…9; …101 024 (8 | 24, jegyösszeg 9).'
  },
  {
    id: 'ntp-q27',
    level: 3,
    questionTypeBadge: 'Prímtényezők',
    question: 'Egy hajó egész méterben mért hosszának, a kapitány életkorának és gyermekei számának szorzata 25 756. Hány éves a kapitány?',
    options: ['47', '37', '137', '68'],
    correctAnswer: 0,
    explanation: '25 756 = 2² · 47 · 137. Reálisan: a hajó 137 m, a kapitány 47 éves, 4 gyermeke van.'
  },
  {
    id: 'ntp-q28',
    level: 3,
    questionTypeBadge: 'Prímtényezők',
    question: 'Ugyanez a szorzat egy másik hajón 6401. Hány éves a kapitány?',
    options: ['37', '47', '64', '173'],
    correctAnswer: 0,
    explanation: '6401 = 37 · 173 (mindkettő prím). A szorzat három tényezője 1, 37 és 173: a kapitány 37 éves, a hajó 173 m, 1 gyermeke van.'
  },
  {
    id: 'ntp-q29',
    level: 3,
    questionTypeBadge: 'Logika',
    question: 'Melyik állítás igaz két különböző pozitív egész szám legnagyobb közös osztójára?',
    options: ['Mindig osztója a két szám összegének', 'Mindig kisebb mindkét számnál', 'Nem lehet 1', 'Mindig prímszám'],
    correctAnswer: 0,
    explanation: 'Ha d | a és d | b, akkor d | a + b. Ellenpéldák: (3; 6) = 3 nem kisebb a 3-nál; (2; 3) = 1; (4; 8) = 4 nem prím.'
  },
  {
    id: 'ntp-q30',
    level: 3,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van az 1260-nak?',
    options: ['36', '24', '18', '48'],
    correctAnswer: 0,
    explanation: '1260 = 2² · 3² · 5 · 7, így az osztók száma (2 + 1)(2 + 1)(1 + 1)(1 + 1) = 36.'
  }
];

export const NumberTheoryPracticeQuiz: React.FC<{
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
      topicId="g11-num-gyakorlas-quiz"
      subtopicId="gyakorlas-szamelmelet-1"
      title="9. Gyakorlás – Kvíz"
      subtitle="30 vegyes tesztkérdés 3 nehézségi szinten: számhalmazok, prímek, lnko és lkkt, oszthatóság és maradékok, logika, számrendszerek."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={NUMBER_THEORY_PRACTICE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Prímtényezős alak',
          items: [
            '(a; b): közös prímek, kisebbik kitevő',
            '[a; b]: minden prím, nagyobbik kitevő',
            'Osztók száma: (α + 1)(β + 1)…',
            'Négyzetszám: minden kitevő páros'
          ]
        },
        {
          title: 'Oszthatóság, maradék',
          items: [
            '4, 25: utolsó két jegy; 8: utolsó három jegy',
            '3, 9: jegyösszeg',
            'Összevonás csak relatív prímekkel: 12 = 3 · 4, 72 = 8 · 9',
            'Összeg, szorzat maradéka = a maradékok összegének, szorzatának maradéka'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Facsemeték: 365 = 5 · 73 (73 sor, 5 fa)',
            'Dominók: 1-2, 1-3, 1-5 ⇒ 3',
            'Kapitány: 25 756 ⇒ 47 év; 6401 ⇒ 37 év',
            '6 · 9 = 42 a 13-as számrendszerben'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberTheoryPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumberTheoryPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumberTheoryPracticeQuiz;
