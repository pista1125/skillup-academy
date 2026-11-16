import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FunctionsSummaryMatcher } from './FunctionsSummaryMatcher';
import { FunctionsSummarySorter } from './FunctionsSummarySorter';
import { PlotBox, Axes, curvePath, mapX, mapY, F_BLUE, F_RED, F_GREEN, F_INK } from './plotKit';

const QSVG: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 170 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

// A5. feladat (tankönyv, 135. o.): a parabola csúcsa (−5; −2)
const B1: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -9, xmax: 2, ymin: -3, ymax: 6 };
const FIG_PAR = (
  <QSVG>
    <Axes b={B1} />
    <path d={curvePath(B1, (x) => (x + 5) ** 2 - 2)} fill="none" stroke={F_BLUE} strokeWidth="2.2" />
    <text x={mapX(B1, -2.3)} y="28" fontSize="12" fill={F_BLUE} fontWeight="bold">f</text>
  </QSVG>
);

// A12. feladat (tankönyv, 136. o.): f a ]1; 6] intervallumon, (1; 2) üres, (6; 4) teli végpont
const B6: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -1, xmax: 7, ymin: -3, ymax: 5 };
const FIG_A12 = (
  <QSVG>
    <Axes b={B6} />
    <polyline
      points={[
        [1, 2],
        [3, -2],
        [6, 4]
      ]
        .map(([x, y]) => `${mapX(B6, x)},${mapY(B6, y)}`)
        .join(' ')}
      fill="none"
      stroke={F_BLUE}
      strokeWidth="2.2"
    />
    <circle cx={mapX(B6, 1)} cy={mapY(B6, 2)} r="3.2" fill="#ffffff" stroke={F_BLUE} strokeWidth="1.6" />
    <circle cx={mapX(B6, 6)} cy={mapY(B6, 4)} r="3.2" fill={F_BLUE} />
    <text x={mapX(B6, 4.3)} y={mapY(B6, 1.6)} fontSize="11" fill={F_BLUE} fontWeight="bold">f</text>
  </QSVG>
);

const B2: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -7, xmax: 7, ymin: -4, ymax: 8 };
const FIG_LIN = (
  <QSVG>
    <Axes b={B2} />
    <path d={curvePath(B2, (x) => -0.8 * x + 2)} fill="none" stroke={F_BLUE} strokeWidth="2.2" />
    <circle cx={mapX(B2, -5)} cy={mapY(B2, 6)} r="4" fill={F_RED} />
    <circle cx={mapX(B2, 5)} cy={mapY(B2, -2)} r="4" fill={F_RED} />
    <text x={mapX(B2, -5) + 6} y={mapY(B2, 6) - 5} fontSize="10" fontWeight="bold" fill={F_RED}>A</text>
    <text x={mapX(B2, 5) + 6} y={mapY(B2, -2) - 5} fontSize="10" fontWeight="bold" fill={F_RED}>B</text>
  </QSVG>
);

const B3: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -7, xmax: 3, ymin: -5, ymax: 6 };
const FIG_SHIFT = (
  <QSVG>
    <Axes b={B3} />
    <path d={curvePath(B3, (x) => x * x)} fill="none" stroke={F_BLUE} strokeWidth="2" />
    <path d={curvePath(B3, (x) => (x + 3) ** 2 - 4)} fill="none" stroke={F_RED} strokeWidth="2" strokeDasharray="5 3" />
    <line x1={mapX(B3, 0)} y1={mapY(B3, 0)} x2={mapX(B3, -3)} y2={mapY(B3, -4)} stroke={F_GREEN} strokeWidth="1.8" />
    <text x={mapX(B3, -1.3)} y={mapY(B3, -2.4)} fontSize="10" fontWeight="bold" fill={F_GREEN}>v</text>
    <text x={mapX(B3, 1.3)} y={mapY(B3, 4.5)} fontSize="10" fontWeight="bold" fill={F_BLUE}>f</text>
    <text x={mapX(B3, -6.3)} y={mapY(B3, 4.5)} fontSize="10" fontWeight="bold" fill={F_RED}>g = ?</text>
  </QSVG>
);

const B4: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -1, xmax: 6, ymin: -1, ymax: 10 };
const FIG_THROW = (
  <QSVG>
    <Axes b={B4} />
    <path d={curvePath(B4, (x) => -((x - 2) ** 2) + 9, 0, 5)} fill="none" stroke={F_BLUE} strokeWidth="2.2" />
    <circle cx={mapX(B4, 0)} cy={mapY(B4, 5)} r="3.5" fill={F_RED} />
    <text x={mapX(B4, 0) + 6} y={mapY(B4, 5) + 12} fontSize="9" fill={F_RED}>kilövés</text>
    <text x="215" y="160" fontSize="9" textAnchor="end" fill="#475569">x (s)</text>
    <text x="34" y="22" fontSize="9" fill="#475569">y (m)</text>
  </QSVG>
);

const B5: PlotBox = { x0: 20, y0: 12, w: 200, h: 145, xmin: -5, xmax: 3, ymin: -2, ymax: 10 };
const FIG_P2 = (
  <QSVG>
    <Axes b={B5} />
    <path d={curvePath(B5, (x) => x * x)} fill="none" stroke={F_BLUE} strokeWidth="2" />
    <path d={curvePath(B5, (x) => 3 - 2 * x)} fill="none" stroke={F_RED} strokeWidth="2" />
    <text x={mapX(B5, 2.3)} y={mapY(B5, 7.5)} fontSize="10" fontWeight="bold" fill={F_BLUE}>g</text>
    <text x={mapX(B5, -4.6)} y={mapY(B5, 8.8)} fontSize="10" fontWeight="bold" fill={F_RED}>f</text>
  </QSVG>
);

const FIG_MAP = (
  <QSVG h={150}>
    <ellipse cx="60" cy="75" rx="40" ry="55" fill="#dbeafe" stroke={F_BLUE} />
    <ellipse cx="180" cy="75" rx="40" ry="55" fill="#fef3c7" stroke="#d97706" />
    {['1', '2', '3'].map((t, i) => (
      <text key={t} x="60" y={52 + i * 25} fontSize="12" textAnchor="middle" fill={F_INK}>{t}</text>
    ))}
    {['5', '6', '7'].map((t, i) => (
      <text key={t} x="180" y={52 + i * 25} fontSize="12" textAnchor="middle" fill={F_INK}>{t}</text>
    ))}
    <text x="120" y="20" fontSize="11" textAnchor="middle" fill={F_RED} fontWeight="bold">A → B: hány függvény?</text>
    <text x="60" y="142" fontSize="10" textAnchor="middle" fill={F_BLUE}>A</text>
    <text x="180" y="142" fontSize="10" textAnchor="middle" fill="#b45309">B</text>
  </QSVG>
);

export const FUNCTIONS_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'fu-q1',
    questionTypeBadge: 'Helyettesítési érték',
    level: 1,
    question: 'Mennyi a valós számokon értelmezett f(x) = 9ˣ + 5 függvény helyettesítési értéke az x = −1/2 helyen? (A4.)',
    options: ['16/3', '14/3', '1/2', '2'],
    correctAnswer: 0,
    explanation: '9^(−1/2) = 1/√9 = 1/3, így f(−1/2) = 1/3 + 5 = 16/3. (A 14/3 előjelhibából, az 1/2 a 9 · (−1/2) + 5 szorzásból jönne.)'
  },
  {
    id: 'fu-q2',
    questionTypeBadge: 'Függvény-e?',
    level: 1,
    question: 'Melyik hozzárendelés NEM függvény?',
    options: [
      'minden egész számhoz azt a valós számot, amelytől 2 egység távolságra van',
      'minden valós számhoz a négyzetét',
      'minden valós számhoz a nála 5-tel nagyobb számot',
      'minden háromszöghöz a területét (cm²-ben)'
    ],
    correctAnswer: 0,
    explanation: 'Egy egész számtól két szám van 2 egység távolságra (pl. 3-tól az 1 és az 5), így nem pontosan egy elemet rendelünk hozzá.'
  },
  {
    id: 'fu-q3',
    questionTypeBadge: 'Kölcsönösen egyértelmű',
    level: 1,
    question: 'Melyik ℝ → ℝ függvény kölcsönösen egyértelmű?',
    options: ['x ↦ x + 5', 'x ↦ x²', 'x ↦ |x|', 'x ↦ 7'],
    correctAnswer: 0,
    explanation: 'Különböző számokhoz különböző értéket rendel. x² és |x| a −3-hoz és a 3-hoz ugyanazt rendeli, a konstans mindenhez ugyanazt.'
  },
  {
    id: 'fu-q4',
    questionTypeBadge: 'Zérushely',
    level: 1,
    question: 'Hol van a valós számokon értelmezett f(x) = 0,5ˣ − 8 függvény zérushelye? (A6.)',
    options: ['x = −3', 'x = 3', 'x = 16', 'nincs zérushelye'],
    correctAnswer: 0,
    explanation: '0,5ˣ = 8 ⇒ 2⁻ˣ = 2³ ⇒ x = −3. (A 16 a 0,5 · x − 8 = 0 lineáris egyenlet megoldása lenne; az x = 3-nál 0,5³ = 1/8.)'
  },
  {
    id: 'fu-q5',
    questionTypeBadge: 'Egyenlet a függvényre',
    level: 1,
    question: 'Hol veszi fel az f(x) = −7x + 16 függvény a 13 értéket?',
    options: ['x = 3/7', 'x = −3/7', 'x = 29/7', 'x = 7/3'],
    correctAnswer: 0,
    explanation: '−7x + 16 = 13 ⇒ −7x = −3 ⇒ x = 3/7.'
  },
  {
    id: 'fu-q6',
    questionTypeBadge: 'Abszolút érték',
    figure: FIG_A12,
    level: 1,
    question: 'Az ábrán az f függvény grafikonja látható. Hol van az |f| függvény minimuma, és mennyi? (A12. a))',
    options: ['x = 2 és x = 4 helyen, értéke 0', 'x = 3 helyen, értéke −2', 'x = 3 helyen, értéke 2', 'x = 1 helyen, értéke 2'],
    correctAnswer: 0,
    explanation: 'Az |f| az x tengely alatti részt tükrözi, így nem negatív. Minimuma 0, ott, ahol f(x) = 0: x = 2 és x = 4. (A −2 az f minimuma, nem az |f|-é.) Az |f| maximuma 4, az x = 6 helyen.'
  },
  {
    id: 'fu-q7',
    questionTypeBadge: 'Exponenciális függvény',
    level: 1,
    question: 'Melyik állítás igaz a valós számokon értelmezett f(x) = 2ˣ függvényre?',
    options: ['szigorúan monoton nő, és nincs zérushelye', 'van zérushelye', 'értékkészlete ℝ', 'szigorúan monoton csökken'],
    correctAnswer: 0,
    explanation: 'a = 2 > 1, ezért nő; értékkészlete ]0; ∞[, így sosem 0.'
  },
  {
    id: 'fu-q8',
    questionTypeBadge: 'Grafikon és képlet',
    figure: FIG_PAR,
    level: 1,
    question: 'Melyik hozzárendelési szabály tartozik az ábrán látható parabolához?',
    options: ['f(x) = (x + 5)² − 2', 'f(x) = (x − 2)² − 5', 'f(x) = (x + 2)² − 5', 'f(x) = (x + 5)² + 2'],
    correctAnswer: 0,
    explanation: 'A csúcs a (−5; −2) pont (A5.): x² eltolva balra 5-tel, lefelé 2-vel ⇒ (x + 5)² − 2. A függvény negatív a ]−5 − √2; −5 + √2[ intervallumon.'
  },
  {
    id: 'fu-q9',
    questionTypeBadge: 'Igaz / hamis',
    level: 1,
    question: 'Melyik állítás IGAZ?',
    options: [
      'Minden elsőfokú függvény szigorúan monoton.',
      'Minden hozzárendelés függvény.',
      'Van olyan exponenciális függvény, amelynek van zérushelye.',
      'Az f(x) = 1/x függvénynek van minimuma.'
    ],
    correctAnswer: 0,
    explanation: 'ax + b (a ≠ 0) a > 0 esetén szigorúan nő, a < 0 esetén szigorúan csökken. A többi hamis.'
  },
  {
    id: 'fu-q10',
    questionTypeBadge: 'Monotonitás',
    level: 1,
    question: 'Jellemezd az f(x) = −(7/3)x + 22 függvényt monotonitás szempontjából!',
    options: ['szigorúan monoton csökkenő', 'szigorúan monoton növekvő', 'konstans', '22-ig nő, utána csökken'],
    correctAnswer: 0,
    explanation: 'A meredekség −7/3 < 0, ezért a függvény az egész ℝ-en szigorúan csökken.'
  },
  // ---------- 2. szint ----------
  {
    id: 'fu-q11',
    questionTypeBadge: 'Lineáris függvény',
    figure: FIG_LIN,
    level: 2,
    question: 'Az f lineáris függvény grafikonján van az A(−5; 6) és a B(5; −2) pont. Mi f hozzárendelési szabálya?',
    options: ['f(x) = −0,8x + 2', 'f(x) = 0,8x + 2', 'f(x) = −0,8x − 2', 'f(x) = −1,25x + 2'],
    correctAnswer: 0,
    explanation: 'a = (−2 − 6) / (5 − (−5)) = −0,8; b = 6 − (−0,8) · (−5) = 2.'
  },
  {
    id: 'fu-q12',
    questionTypeBadge: 'Helyettesítési érték',
    level: 2,
    question: 'Mennyi f(123), ha f(x) = −0,8x + 2?',
    options: ['−96,4', '100,4', '−98,4', '96,4'],
    correctAnswer: 0,
    explanation: '−0,8 · 123 + 2 = −98,4 + 2 = −96,4.'
  },
  {
    id: 'fu-q13',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 2,
    question: 'Hol negatív az f(x) = −0,8x + 2 függvény?',
    options: ['ha x > 2,5', 'ha x < 2,5', 'ha x > −2,5', 'ha x < 0'],
    correctAnswer: 0,
    explanation: 'Zérushely 2,5; a függvény csökkenő, így a zérushelytől jobbra negatív.'
  },
  {
    id: 'fu-q14',
    questionTypeBadge: 'Lineáris függvény',
    level: 2,
    question: 'Melyik az A(−3; 2) és a B(5; 4) ponton átmenő lineáris függvény?',
    options: ['f(x) = 0,25x + 2,75', 'f(x) = 4x + 14', 'f(x) = 0,25x + 2', 'f(x) = −0,25x + 2,75'],
    correctAnswer: 0,
    explanation: 'a = (4 − 2) / (5 + 3) = 0,25; b = 2 − 0,25 · (−3) = 2,75. Ellenőrzés: f(5) = 1,25 + 2,75 = 4 ✓.'
  },
  {
    id: 'fu-q15',
    questionTypeBadge: 'Zérushely',
    level: 2,
    question: 'Melyek az f(x) = 2x² − x − 1 függvény zérushelyei?',
    options: ['1 és −1/2', '−1 és 1/2', '1 és 1/2', 'nincs zérushelye'],
    correctAnswer: 0,
    explanation: 'x₁,₂ = (1 ± √(1 + 8)) / 4 = (1 ± 3) / 4 ⇒ 1 és −1/2.'
  },
  {
    id: 'fu-q16',
    questionTypeBadge: 'Függvények száma',
    figure: FIG_MAP,
    level: 2,
    question: 'Hány függvény van, amelynek értelmezési tartománya A = {1; 2; 3}, képhalmaza B = {5; 6; 7}? Ezek közül hány kölcsönösen egyértelmű?',
    options: ['27; ebből 6', '9; ebből 6', '27; ebből 3', '6; ebből 6'],
    correctAnswer: 0,
    explanation: 'Mindhárom elem képe 3-féle: 3³ = 27. Kölcsönösen egyértelmű: a képek különbözők, 3! = 6.'
  },
  {
    id: 'fu-q17',
    questionTypeBadge: 'Képlet szövegből',
    level: 2,
    question: '„Minden valós számhoz hozzárendeljük a számnál 4-gyel nagyobb szám négyzetét.” Melyik a képlet?',
    options: ['g(x) = (x + 4)²', 'g(x) = x² + 4', 'g(x) = (x − 4)²', 'g(x) = 4x²'],
    correctAnswer: 0,
    explanation: 'Előbb 4-et adunk hozzá, majd négyzetre emeljük: (x + 4)².'
  },
  {
    id: 'fu-q18',
    questionTypeBadge: 'Transzformáció',
    level: 2,
    question: 'Melyik vektorral kell eltolni az f(x) = x² grafikonját, hogy a g(x) = (x − 4)² − 3 grafikonját kapjuk?',
    options: ['v(4; −3)', 'v(−4; −3)', 'v(−4; 3)', 'v(4; 3)'],
    correctAnswer: 0,
    explanation: 'f(x − u) + v: u = 4 (jobbra), v = −3 (lefelé). A csúcs a (4; −3) pontba kerül.'
  },
  {
    id: 'fu-q19',
    questionTypeBadge: 'Transzformáció',
    figure: FIG_SHIFT,
    level: 2,
    question: 'Az f(x) = x² grafikonját a v(−3; −4) vektorral eltoljuk. Mi a kapott g függvény hozzárendelési szabálya?',
    options: ['g(x) = (x + 3)² − 4', 'g(x) = (x − 3)² − 4', 'g(x) = (x + 3)² + 4', 'g(x) = (x − 4)² − 3'],
    correctAnswer: 0,
    explanation: 'Balra 3-mal: x helyett x + 3; lefelé 4-gyel: −4. g(x) = (x + 3)² − 4.'
  },
  {
    id: 'fu-q20',
    questionTypeBadge: 'Zérushely',
    level: 2,
    question: 'Melyek a g(x) = (x + 3)² − 4 függvény zérushelyei?',
    options: ['−5 és −1', '5 és 1', '−3 és −4', '−7 és 1'],
    correctAnswer: 0,
    explanation: '(x + 3)² = 4 ⇒ x + 3 = ±2 ⇒ x = −1 vagy x = −5.'
  },
  // ---------- 3. szint ----------
  {
    id: 'fu-q21',
    questionTypeBadge: 'Metszéspont',
    level: 3,
    question: 'Hol metszi a g(x) = (x + 3)² − 4 függvény grafikonja a h(x) = −3 konstans függvény grafikonját?',
    options: ['x = −4 és x = −2', 'x = −3', 'x = −5 és x = −1', 'x = 4 és x = 2'],
    correctAnswer: 0,
    explanation: '(x + 3)² − 4 = −3 ⇒ (x + 3)² = 1 ⇒ x = −2 vagy x = −4.'
  },
  {
    id: 'fu-q22',
    questionTypeBadge: 'Értékkészlet',
    level: 3,
    question: 'Mi a h(x) = 1/x + 2 függvény értékkészlete, ha az értelmezési tartomány az [1; 4] intervallum?',
    options: ['[2,25; 3]', '[2; 3]', ']2; ∞[', '[3; 6]'],
    correctAnswer: 0,
    explanation: 'h csökken: h(1) = 3, h(4) = 1/4 + 2 = 2,25, és minden közbülső értéket felvesz.'
  },
  {
    id: 'fu-q23',
    questionTypeBadge: 'Szélsőérték',
    level: 3,
    question: 'Hol van a g(x) = |1/x + 2| (x ≠ 0) függvény minimumhelye?',
    options: ['x = −1/2', 'x = 1/2', 'x = −2', 'nincs minimuma'],
    correctAnswer: 0,
    explanation: 'Az abszolút érték minimuma 0, ahol 1/x + 2 = 0 ⇒ 1/x = −2 ⇒ x = −1/2. Maximuma nincs.'
  },
  {
    id: 'fu-q24',
    questionTypeBadge: 'Másodfokú modell',
    figure: FIG_THROW,
    level: 3,
    question: 'Egy test magassága x másodperc után f(x) = −(x − 2)² + 9 méter. Mikor és milyen magasan van a pálya legmagasabb pontján?',
    options: ['2 s-nál, 9 m-en', '9 s-nál, 2 m-en', '0 s-nál, 5 m-en', '5 s-nál, 0 m-en'],
    correctAnswer: 0,
    explanation: 'A parabola csúcsa (2; 9): −(x − 2)² ≤ 0, így f(x) ≤ 9, egyenlőség x = 2-nél.'
  },
  {
    id: 'fu-q25',
    questionTypeBadge: 'Másodfokú modell',
    level: 3,
    question: 'Az f(x) = −(x − 2)² + 9 pályán mozgó test hány másodperc múlva ér a talajra (f(x) = 0, x ≥ 0)?',
    options: ['5', '3', '−1 és 5', '4,5'],
    correctAnswer: 0,
    explanation: '(x − 2)² = 9 ⇒ x = 5 vagy x = −1; az idő nem negatív, így 5 s.'
  },
  {
    id: 'fu-q26',
    questionTypeBadge: 'Grafikus megoldás',
    figure: FIG_P2,
    level: 3,
    question: 'f(x) = 3 − 2x és g(x) = x². Mely x-ekre teljesül f(x) > g(x)?',
    options: ['−3 < x < 1', 'x < −3 vagy x > 1', '−1 < x < 3', 'x > 1'],
    correctAnswer: 0,
    explanation: 'x² = 3 − 2x ⇒ x² + 2x − 3 = 0 ⇒ x = −3 vagy 1. A két metszéspont között fut az egyenes a parabola fölött.'
  },
  {
    id: 'fu-q27',
    questionTypeBadge: 'Lineáris modell',
    level: 3,
    question: 'A csomagküldés díja f(x) = 12x + 640 Ft, ahol x a tömeg dekagrammban (10 kg alatt). Mennyibe kerül egy 450 grammos csomag?',
    options: ['1180 Ft', '6040 Ft', '1820 Ft', '540 Ft'],
    correctAnswer: 0,
    explanation: '450 g = 45 dkg: 12 · 45 + 640 = 1180 Ft. (6040 Ft akkor jönne ki, ha grammban helyettesítenénk.)'
  },
  {
    id: 'fu-q28',
    questionTypeBadge: 'Lineáris modell',
    level: 3,
    question: 'Ugyanennél a cégnél hány kilogramm az a küldemény, amelyért 1600 Ft-ot kell fizetni?',
    options: ['0,8 kg', '80 kg', '8 kg', '1,33 kg'],
    correctAnswer: 0,
    explanation: '12x + 640 = 1600 ⇒ x = 80 dkg = 0,8 kg. (1,33 kg: a fix díj levonása elmaradt.)'
  },
  {
    id: 'fu-q29',
    questionTypeBadge: 'Exponenciális modell',
    level: 3,
    question: 'A sörhab magassága f(t) = 14 · 0,991ᵗ mm (t másodpercben). Hány másodperc után lesz 3 mm (egy tizedesre)?',
    options: ['≈ 170,4 s', '≈ 81,9 s', '≈ 17,0 s', '≈ 1704 s'],
    correctAnswer: 0,
    explanation: '0,991ᵗ = 3/14 ⇒ t = lg(3/14) / lg 0,991 ≈ 170,4 s.'
  },
  {
    id: 'fu-q30',
    questionTypeBadge: 'Gyökös modell',
    level: 3,
    question: 'Egy h km magasan lévő pontból legfeljebb D(h) = √(12 740h + h²) km-re láthatunk el. Kb. milyen messzire látunk a 455 m magas kilátóból?',
    options: ['≈ 76 km', '≈ 2450 km', '≈ 5797 km', '≈ 8,7 km'],
    correctAnswer: 0,
    explanation: 'h = 0,455 km: √(12 740 · 0,455 + 0,455²) ≈ √5797 ≈ 76 km. (2450 km: méterben helyettesítve.)'
  }
];

export const FunctionsSummaryQuiz: React.FC<{
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
      topicId="g12-sum-fuggvenyek-quiz"
      subtopicId="fuggvenyek"
      title="5. Függvények – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: függvényfogalom, értékkészlet, zérushely, szélsőérték, monotonitás, alapfüggvények, transzformációk, modellek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={FUNCTIONS_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: ['függvény: minden elemhez pontosan egy', 'értékkészlet: a felvett értékek', 'zérushely: f(x₀) = 0', 'kölcsönösen egyértelmű ⇒ van inverz']
        },
        {
          title: 'Alapfüggvények',
          items: ['ax + b: meredekség a, metszés (0; b)', 'x², |x|: minimum 0 az x = 0-ban', '1/x: nincs zérushely, nincs szélsőérték', 'aˣ: R = ]0; ∞[, a > 1 nő']
        },
        {
          title: 'Transzformáció',
          items: ['f(x − u): jobbra u-val', 'f(x) + v: felfelé v-vel', 'k · f(x): nyújtás, k < 0 tükrözés', '|f(x)|: alsó rész tükrözése']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FunctionsSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FunctionsSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FunctionsSummaryQuiz;
