import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatCalculatorMatcher } from './StatCalculatorMatcher';
import { StatCalculatorSorter } from './StatCalculatorSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Kicsinyített számológép-kijelző a megadott sorokkal. */
const ScreenFig: React.FC<{ lines: [string, string][]; title?: string; highlight?: string }> = ({ lines, title = '1-változós stat', highlight }) => {
  const H = 40 + lines.length * 17;
  return (
    <svg viewBox={`0 0 240 ${H}`} className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height={H - 4} rx="12" fill="#334155" />
      <rect x="10" y="10" width="220" height={H - 20} rx="5" fill="#dfe8d8" />
      <rect x="10" y="10" width="220" height="16" rx="5" fill="#1e293b" />
      <text x="16" y="22" fontSize="9" fontWeight="bold" fill="#f8fafc">
        {title}
      </text>
      {lines.map(([k, v], i) => (
        <g key={i}>
          <text x="18" y={42 + i * 17} fontSize="11" fontWeight="bold" fill={k === highlight ? '#be123c' : '#0f172a'}>
            {k}
          </text>
          <text x="222" y={42 + i * 17} fontSize="11" fontFamily="monospace" textAnchor="end" fill={k === highlight ? '#be123c' : '#0f172a'}>
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Kis oszlopdiagram gyakoriságokkal. */
const BarFig: React.FC<{ values: number[]; freq: number[]; xMax: number; yMax: number; caption: string; color?: string }> = ({ values, freq, xMax, yMax, caption, color = '#f87171' }) => {
  const sx = (v: number) => 24 + (v / xMax) * 200;
  const sy = (f: number) => 100 - (f / yMax) * 76;
  const bw = Math.min(14, 160 / values.length);
  return (
    <svg viewBox="0 0 240 132" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="128" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="120" y="16" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#334155">
        {caption}
      </text>
      {values.map((v, i) => (
        <g key={v}>
          <rect x={sx(v) - bw / 2} y={sy(freq[i])} width={bw} height={100 - sy(freq[i])} fill={color} />
          <text x={sx(v)} y={sy(freq[i]) - 3} fontSize="8" textAnchor="middle" fill="#334155">
            {freq[i]}
          </text>
        </g>
      ))}
      <line x1="18" y1="100" x2="230" y2="100" stroke="#475569" />
      {Array.from({ length: xMax + 1 }, (_, k) => k).map((k) => (
        <text key={k} x={sx(k)} y="112" fontSize="7.5" textAnchor="middle" fill="#334155">
          {k}
        </text>
      ))}
    </svg>
  );
};

const BUS_SCREEN: [string, string][] = [
  ['x̄', '= 12'],
  ['Σx', '= 240'],
  ['Σx²', '= 3072'],
  ['σ²x', '= 9,6'],
  ['σx', '= 3,098386677'],
  ['s²x', '= 10,10526316'],
  ['sx', '= 3,178877657']
];

const STAT_CALCULATOR_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'sc-q1',
    level: 1,
    questionTypeBadge: 'Számológép',
    question: 'Melyik üzemmódot választjuk a tankönyvben bemutatott számológépen egy adatsor átlagának és szórásának kiszámításához?',
    options: ['6: Statisztika → 1: 1 változós', 'Egyenletmegoldás', 'Táblázat (függvénytáblázat) mód', 'Komplex számok mód'],
    correctAnswer: 0,
    explanation: 'A menü gomb után a 6: Statisztika pontot, azon belül az 1: 1 változós alpontot választjuk.'
  },
  {
    id: 'sc-q2',
    level: 1,
    questionTypeBadge: 'Érettségi',
    question: 'Számolhatunk-e az érettségin átlagot és szórást számológéppel, indoklás nélkül?',
    options: [
      'Igen, ha a feladat kifejezetten nem követeli meg a részletszámítás bemutatását',
      'Nem, soha',
      'Igen, mindig, akkor is, ha a feladat a részletszámítást kéri',
      'Csak az átlagot, a szórást nem'
    ],
    correctAnswer: 0,
    explanation: 'A „Fontos tudnivalók” szerint a gép további indoklás nélkül használható átlag és szórás számítására, ha a feladat nem kéri a részletszámítást; egyébként a géppel számolt lépésekért nem jár pont.'
  },
  {
    id: 'sc-q3',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Melyik sor mutatja a kijelzőn az általunk tanult (n-nel osztott) szórást?',
    options: ['σx', 'sx', 'Σx', 'x̄'],
    correctAnswer: 0,
    explanation: 'A σx a torzított szórás: σ² = Σ(xᵢ − x̄)² / n. Az sx a torzítatlan (n − 1-gyel osztott), a Σx az összeg, az x̄ az átlag.'
  },
  {
    id: 'sc-q4',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Mit jelent a kijelzőn a Σx?',
    options: ['az adatok összegét', 'az adatok átlagát', 'a szórást', 'az adatok számát'],
    correctAnswer: 0,
    explanation: 'A Σ (szumma) összegzést jelent: Σx = x₁ + x₂ + … + xₙ. A 20 járatnál Σx = 240.'
  },
  {
    id: 'sc-q5',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Mit jelent a kijelzőn a Σx²?',
    options: ['az adatok négyzetének összegét', 'az összeg négyzetét', 'a szórásnégyzetet', 'az átlag négyzetét'],
    correctAnswer: 0,
    explanation: 'Σx² = x₁² + x₂² + … + xₙ² (négyzetösszeg). Ez nem azonos (Σx)²-tel.'
  },
  {
    id: 'sc-q6',
    level: 1,
    questionTypeBadge: 'Gyakoriság',
    question: 'Mi történik, ha a gyakoriság (Gyak) oszlopot nem töltjük ki?',
    options: ['a gép minden adatot 1 gyakorisággal vesz', 'a gép hibát jelez', 'a gép minden adatot 0-szor vesz', 'a gép a legutóbbi gyakoriságokat használja'],
    correctAnswer: 0,
    explanation: 'Ha nem töltjük ki, a számológép automatikusan 1 gyakorisággal számol minden adatot.'
  },
  {
    id: 'sc-q7',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    question: 'A 20 járat adataira ez a képernyő jelent meg. Mennyi az adatok (tanult) szórása?',
    figure: <ScreenFig lines={BUS_SCREEN} />,
    options: ['≈ 3,098', '≈ 3,179', '9,6', '≈ 10,105'],
    correctAnswer: 0,
    explanation: 'A σx sort olvassuk le: 3,098386677. A 3,179 az sx (torzítatlan), a 9,6 és a 10,105 a két szórásnégyzet.'
  },
  {
    id: 'sc-q8',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    question: 'Mit jelent a második oldalon az n = 20?',
    figure: (
      <ScreenFig
        title="1-változós stat (2. oldal)"
        lines={[
          ['n', '= 20'],
          ['min(x)', '= 4'],
          ['Q₁', '= 11'],
          ['Med', '= 13'],
          ['Q₃', '= 14'],
          ['max(x)', '= 17']
        ]}
        highlight="n"
      />
    ),
    options: ['az adatok számát (a gyakoriságok összegét)', 'a különböző adatok számát', 'a legnagyobb adatot', 'az adatok összegét'],
    correctAnswer: 0,
    explanation: 'Az n az elemszám: 1 + 3 + 5 + 4 + 3 + 2 + 1 + 1 = 20 járat. Különböző érték csak 8 van.'
  },
  {
    id: 'sc-q9',
    level: 1,
    questionTypeBadge: 'Átlag',
    question: 'A kijelzőn Σx = 240 és n = 20 áll. Mennyi az átlag?',
    options: ['12', '4800', '220', '13'],
    correctAnswer: 0,
    explanation: 'x̄ = Σx / n = 240 / 20 = 12. (A 13 a medián.)'
  },
  {
    id: 'sc-q10',
    level: 1,
    questionTypeBadge: 'Számológép',
    question: 'Melyik mutatót NEM írja ki az „1-változós stat” menüpont a tankönyv leírása szerint?',
    options: ['a móduszt', 'a mediánt', 'a kvartiliseket', 'a minimumot és a maximumot'],
    correctAnswer: 0,
    explanation: 'Kiírja az átlagot, összeget, négyzetösszeget, a szórásnégyzeteket és szórásokat, az elemszámot, a minimumot, a kvartiliseket, a mediánt és a maximumot – a móduszt nem.'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'sc-q11',
    level: 2,
    questionTypeBadge: 'Átlag',
    question: 'Napi riasztások: 0 (1 nap), 1 (11 nap), 2 (6 nap), 4 (8 nap), 6 (4 nap), 14 (1 nap). Mennyi a riasztások napi átlaga?',
    figure: <BarFig values={[0, 1, 2, 4, 6, 14]} freq={[1, 11, 6, 8, 4, 1]} xMax={14} yMax={12} caption="hány napon (31 nap)" />,
    options: ['3', '4,5', '≈ 2,69', '5,17'],
    correctAnswer: 0,
    explanation: 'Σx = 0 + 11 + 12 + 32 + 24 + 14 = 93, n = 31, x̄ = 93 / 31 = 3. (A 4,5 a 6 különböző érték sima átlaga, a 2,69 a szórás.)'
  },
  {
    id: 'sc-q12',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a napi riasztások számának szórása (σx)?',
    figure: <BarFig values={[0, 1, 2, 4, 6, 14]} freq={[1, 11, 6, 8, 4, 1]} xMax={14} yMax={12} caption="hány napon (31 nap)" />,
    options: ['≈ 2,69', '≈ 2,73', '≈ 7,23', '3'],
    correctAnswer: 0,
    explanation: 'Gyakorisággal bevíve: σx ≈ 2,688. A 2,73 az sx, a 7,23 a szórásnégyzet (σ²x), a 3 az átlag.'
  },
  {
    id: 'sc-q13',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Márton Anita dobásai: 17,60; 18,72; 19,39; 19,38; 19,10; 19,87 m. Mit ír ki a gép σx-re és sx-re?',
    options: ['σx ≈ 0,72; sx ≈ 0,79', 'σx ≈ 0,79; sx ≈ 0,72', 'σx ≈ 0,52; sx ≈ 0,62', 'σx = sx ≈ 0,72'],
    correctAnswer: 0,
    explanation: 'σx ≈ 0,719 (n = 6-tal osztva), sx ≈ 0,788 (5-tel osztva). A torzítatlan érték mindig nagyobb. (0,52 a σ²x.)'
  },
  {
    id: 'sc-q14',
    level: 2,
    questionTypeBadge: 'Gyakoriság',
    question: 'Cinkelt kocka, 120 dobás: 1, 2, 3, 4, 5, 6 gyakorisága 21, 18, 4, 45, 22, 10. Mennyi az átlag és a szórás?',
    figure: <BarFig values={[1, 2, 3, 4, 5, 6]} freq={[21, 18, 4, 45, 22, 10]} xMax={6} yMax={48} caption="gyakoriság (120 dobás)" color="#a78bfa" />,
    options: ['x̄ ≈ 3,49; σ ≈ 1,57', 'x̄ = 3,5; σ ≈ 1,71', 'x̄ ≈ 3,49; σ ≈ 2,47', 'x̄ = 20; σ ≈ 13,5'],
    correctAnswer: 0,
    explanation: 'Gyakoriságokkal: x̄ = 419 / 120 ≈ 3,49, σx ≈ 1,57. Az 1–6 számok gyakoriság nélkül 3,5 átlagot és 1,71 szórást adnának; a 2,47 a szórásnégyzet.'
  },
  {
    id: 'sc-q15',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 33, 45, 46, 48 adatsokaság szórása?',
    options: ['≈ 5,87', '≈ 5,08', '≈ 6,78', '34,5'],
    correctAnswer: 0,
    explanation: 'Átlag 43; σx ≈ 5,87. (Az 5,08 a gyakoriságos változat, a 6,78 az sx, a 34,5 a σ²x.)'
  },
  {
    id: 'sc-q16',
    level: 2,
    questionTypeBadge: 'Gyakoriság',
    question: 'Mennyi a 33, 33, 45, 45, 45, 45, 45, 45, 46, 48 adatsokaság szórása?',
    options: ['≈ 5,08', '≈ 5,87', '≈ 5,35', '25,8'],
    correctAnswer: 0,
    explanation: 'Gyakoriságokkal (2, 6, 1, 1) bevíve: σx ≈ 5,08 (σ²x = 25,8). Az 5,35 az sx.'
  },
  {
    id: 'sc-q17',
    level: 2,
    questionTypeBadge: 'Értelmezés',
    question: 'A 33, 45, 46, 48 és a 33, 33, 45 (6-szor), 46, 48 adatsokaság átlaga egyaránt 43. Miért kisebb a második szórása (5,08 < 5,87)?',
    options: [
      'mert a második adatsokaságban sok adat (a hat 45-ös) közel van az átlaghoz',
      'mert a második adatsokaságnak több eleme van, és a szórás az elemszámmal mindig csökken',
      'mert a második adatsokaság terjedelme kisebb',
      'mert a gép a gyakoriságokat nem veszi figyelembe'
    ],
    correctAnswer: 0,
    explanation: 'A terjedelem (15) azonos, de a második adatsorban a 10 adatból 6 csak 2-vel tér el az átlagtól, ez lehúzza az eltérésnégyzetek átlagát. Önmagában a nagyobb elemszám nem csökkenti a szórást.'
  },
  {
    id: 'sc-q18',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'A kijelzőn: n = 20, Σx² = 3072, x̄ = 12. Mennyi a σ²x? (σ² = Σx² / n − x̄²)',
    options: ['9,6', '153,6', '3072', '≈ 10,11'],
    correctAnswer: 0,
    explanation: 'σ² = 3072 / 20 − 12² = 153,6 − 144 = 9,6. (Az eltérésnégyzetek átlaga = a négyzetek átlaga − az átlag négyzete.) A 10,11 az s²x.'
  },
  {
    id: 'sc-q19',
    level: 2,
    questionTypeBadge: 'Átlag',
    question: 'Az EB-n a magyar válogatott 18 játékosának legnagyobb sebességeinek összege Σx = 506,8 km/h. Mennyi az átlag?',
    options: ['≈ 28,16 km/h', '28,9 km/h', '≈ 25,34 km/h', '≈ 29,81 km/h'],
    correctAnswer: 0,
    explanation: 'x̄ = 506,8 / 18 ≈ 28,16 km/h. (A 28,9 a medián.)'
  },
  {
    id: 'sc-q20',
    level: 2,
    questionTypeBadge: 'Torzított szórás',
    question: 'Milyen kapcsolat van ugyanarra az adatsorra (n ≥ 2) a σx és az sx között?',
    options: ['sx ≥ σx mindig', 'σx > sx mindig', 'mindig egyenlők', 'hol az egyik, hol a másik nagyobb'],
    correctAnswer: 0,
    explanation: 'A számláló ugyanaz, de az sx-nél kisebb számmal (n − 1) osztunk: s² = σ² · n / (n − 1) ≥ σ². Egyenlőség csak akkor van, ha mindkettő 0.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'sc-q21',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi az EB-sebességek (19,0; 23,8; 25,0; 25,6; 26,1; 26,3; 27,4; 28,1; 28,8; 29,0; 29,2; 29,7; 29,9; 30,8; 31,3; 31,5; 31,5; 33,8 km/h) szórása?',
    options: ['≈ 3,39 km/h', '≈ 3,48 km/h', '≈ 4,7 km/h', '14,8 km/h'],
    correctAnswer: 0,
    explanation: 'Géppel: σx ≈ 3,385 km/h (sx ≈ 3,483). A 14,8 a terjedelem, a 4,7 a félterjedelem (30,8 − 26,1).'
  },
  {
    id: 'sc-q22',
    level: 3,
    questionTypeBadge: 'Torzított szórás',
    question: 'Egy 20 elemű adatsor torzított szórásnégyzete σ²x = 9,6. Mennyi a torzítatlan s²x?',
    options: ['≈ 10,11', '9,6', '≈ 9,12', '10,6'],
    correctAnswer: 0,
    explanation: 's² = σ² · n / (n − 1) = 9,6 · 20 / 19 ≈ 10,105. (A 9,12 = 9,6 · 19 / 20 – fordított arány.)'
  },
  {
    id: 'sc-q23',
    level: 3,
    questionTypeBadge: 'Torzított szórás',
    question: 'Mit mondhatunk σx és sx különbségéről nagyon nagy elemszámú (pl. 1000 adatból álló) adatsokaságnál?',
    options: ['alig különböznek, mert n / (n − 1) közel van 1-hez', 'sx kb. kétszerese σx-nek', 'σx 0 lesz', 'nagy n esetén sx nem számolható'],
    correctAnswer: 0,
    explanation: 'sx / σx = √(n / (n − 1)); n = 1000 esetén ez kb. 1,0005, a különbség elhanyagolható.'
  },
  {
    id: 'sc-q24',
    level: 3,
    questionTypeBadge: 'Kiugró adat',
    question: 'A tűzoltóságnál a 14 riasztásos napot (kiugró adat) kihagyjuk. Hogyan változik a szórás?',
    figure: <BarFig values={[0, 1, 2, 4, 6, 14]} freq={[1, 11, 6, 8, 4, 1]} xMax={14} yMax={12} caption="hány napon (31 nap)" />,
    options: ['≈ 2,69-ről ≈ 1,82-re csökken', 'nem változik', '≈ 2,69-ről ≈ 3,1-re nő', 'pontosan a felére csökken'],
    correctAnswer: 0,
    explanation: 'A maradék 30 nap: átlag 79 / 30 ≈ 2,63, σx ≈ 1,82. Egyetlen, az átlagtól messze lévő adat jelentősen megnöveli a szórást.'
  },
  {
    id: 'sc-q25',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    question: 'Valaki a 20 járat adatait gyakoriságok nélkül vitte be (4, 8, 11, 13, 14, 15, 16, 17 egyszer-egyszer). Milyen átlagot kap, és miből veheti észre a hibát?',
    figure: (
      <ScreenFig
        lines={[
          ['x̄', '= ?'],
          ['Σx', '= 98'],
          ['n', '= 8']
        ]}
        highlight="n"
      />
    ),
    options: ['12,25-öt; az n = 8 nem egyezik a 20 járattal', '12-t; nem veheti észre', '12,25-öt; a Σx negatív', '4,9-et; az n túl nagy'],
    correctAnswer: 0,
    explanation: 'Σx = 98, n = 8, x̄ = 12,25 (helyesen 12). Az elemszám ellenőrzése (n = 20 kellene) azonnal jelzi a hibát.'
  },
  {
    id: 'sc-q26',
    level: 3,
    questionTypeBadge: 'Kvartilisek',
    question: 'Mit ír ki a gép a napi riasztások (0×1, 1×11, 2×6, 4×8, 6×4, 14×1) mediánjára és kvartiliseire?',
    options: ['Q₁ = 1; Med = 2; Q₃ = 4', 'Q₁ = 1; Med = 3; Q₃ = 6', 'Q₁ = 0; Med = 2; Q₃ = 6', 'Q₁ = 1,5; Med = 2; Q₃ = 4'],
    correctAnswer: 0,
    explanation: 'n = 31, a medián a 16. elem: 2. Az alsó 15 elem mediánja (8. elem) 1, a felső 15 elemé (24. elem) 4.'
  },
  {
    id: 'sc-q27',
    level: 3,
    questionTypeBadge: 'Kvartilisek',
    question: 'Mit ír ki a gép a cinkelt kocka 120 dobásának (21, 18, 4, 45, 22, 10) kvartiliseire?',
    options: ['Q₁ = 2; Q₃ = 5', 'Q₁ = 1; Q₃ = 4', 'Q₁ = 2; Q₃ = 4', 'Q₁ = 1,5; Q₃ = 5,5'],
    correctAnswer: 0,
    explanation: 'Az alsó 60 dobás mediánja a 30. és 31. elem átlaga: mindkettő 2 (a 22–39. elem 2-es). A felső 60 mediánja a 90. és 91. elem: mindkettő 5 (a 89–110. elem 5-ös).'
  },
  {
    id: 'sc-q28',
    level: 3,
    questionTypeBadge: 'Képlet',
    question: 'A kijelzőn: n = 4, Σx = 172, Σx² = 7534. Mennyi a σx?',
    options: ['≈ 5,87', '34,5', '≈ 6,78', '43'],
    correctAnswer: 0,
    explanation: 'x̄ = 172 / 4 = 43; σ² = 7534 / 4 − 43² = 1883,5 − 1849 = 34,5; σ = √34,5 ≈ 5,87. (Ez a 33, 45, 46, 48 adatsor.)'
  },
  {
    id: 'sc-q29',
    level: 3,
    questionTypeBadge: 'Számológép',
    question: 'Az adatok bevitele után melyik gombsor vezet a statisztikai mutatók listájához a tankönyv gépén?',
    options: ['OPTN → 3: 1-változós stat', 'MENU → 6 → 1 ismét', 'SHIFT → AC', 'a = gomb kétszeri megnyomása'],
    correctAnswer: 0,
    explanation: 'Adatbevitel után az OPTN (option) gombbal jönnek elő a lehetőségek, ezek közül a 3: 1-változós stat menüpont adja a mutatókat.'
  },
  {
    id: 'sc-q30',
    level: 3,
    questionTypeBadge: 'Oszlopdiagram',
    question: 'Két kockával 20-szor dobtunk, és feljegyeztük a dobások különbségét (az oszlopdiagram szerint). Mennyi a 20 eredmény átlaga és szórása?',
    figure: <BarFig values={[0, 1, 2, 3, 4, 5]} freq={[3, 6, 5, 3, 2, 1]} xMax={5} yMax={7} caption="különbség – gyakoriság (20 dobás)" color="#38bdf8" />,
    options: ['x̄ = 1,9; σ ≈ 1,37', 'x̄ = 2,5; σ ≈ 1,71', 'x̄ = 1,9; σ ≈ 1,89', 'x̄ ≈ 3,33; σ ≈ 1,7'],
    correctAnswer: 0,
    explanation: 'Gyakoriságok 3, 6, 5, 3, 2, 1: Σx = 0 + 6 + 10 + 9 + 8 + 5 = 38, x̄ = 1,9; σ² = 1,89, σ ≈ 1,37. (A 2,5 és 1,71 a 0–5 számok gyakoriság nélküli átlaga és szórása.)'
  }
];

export const StatCalculatorQuiz: React.FC<{
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
      topicId="g11-stat-szamologep-quiz"
      subtopicId="statisztikai-szamitasok-szamologep"
      title="5. Ráadás – Statisztikai számítások számológéppel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a statisztika üzemmód, a kijelző leolvasása, σx és sx, gyakorisággal megadott adatok, érettségi szabályok."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={STAT_CALCULATOR_QUESTIONS}
      cheatSheets={[
        {
          title: 'Gombok',
          items: [
            'MENU → 6: Statisztika → 1: 1 változós',
            'x oszlop: adatok; Gyak oszlop: gyakoriság',
            'üres Gyak oszlop ⇒ minden adat 1-szer',
            'OPTN → 3: 1-változós stat ⇒ mutatók'
          ]
        },
        {
          title: 'A kijelző sorai',
          items: [
            'x̄ átlag; Σx összeg; Σx² négyzetösszeg',
            'σ²x, σx: n-nel osztott (ezt tanultuk)',
            's²x, sx: n − 1-gyel osztott (nagyobb)',
            'n, min(x), Q₁, Med, Q₃, max(x)'
          ]
        },
        {
          title: 'Ellenőrzés és érettségi',
          items: [
            'n = a gyakoriságok összege?',
            'σ² = Σx² / n − x̄²',
            's² = σ² · n / (n − 1)',
            'átlag, szórás géppel: ha a feladat nem kér részletszámítást'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatCalculatorMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatCalculatorSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatCalculatorQuiz;
