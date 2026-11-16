import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CylinderAreaVolumeMatcher } from './CylinderAreaVolumeMatcher';
import { CylinderAreaVolumeSorter } from './CylinderAreaVolumeSorter';
import { KFig, KLine, KText, KPoly, KCyl, K_RED, K_BLUE, K_GREEN, K_PURPLE, K_EDGE } from './figKit';

// ---------------------------------------------------------------------------
// Kérdésábrák (takart vonalak szaggatottak)
// ---------------------------------------------------------------------------

/** Álló henger r (vagy d) és M felirattal. */
const CylQ: React.FC<{ rx: number; h: number; lr?: string; lm?: string; diam?: boolean; water?: number; note?: string }> = ({
  rx,
  h,
  lr,
  lm,
  diam,
  water,
  note
}) => {
  const cx = note ? 85 : 110;
  const by = 132;
  const ty = by - h;
  const ry = rx * 0.3;
  return (
    <KFig>
      {water !== undefined && (
        <>
          <KPoly p={[[cx - rx, by - water], [cx + rx, by - water], [cx + rx, by], [cx - rx, by]]} fill="#7dd3fc" op={0.55} />
          <ellipse cx={cx} cy={by - water} rx={rx} ry={ry} fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
        </>
      )}
      <KCyl cx={cx} by={by} rx={rx} ry={ry} h={h} fill={water !== undefined ? 'rgba(224,231,255,0.25)' : undefined} />
      {lr && (
        <>
          <KLine a={[diam ? cx - rx : cx, by]} b={[cx + rx, by]} c={K_GREEN} w={2} />
          <KText p={[cx + rx + 6, by + 8]} t={lr} s={10.5} c={K_GREEN} a="start" />
        </>
      )}
      {lm && <KText p={[cx + rx + 6, (ty + by) / 2]} t={lm} s={10.5} c={K_BLUE} a="start" />}
      {note &&
        note.split('|').map((line, i) => (
          <text key={i} x="160" y={52 + i * 17} fontSize="10.5" fill={line.includes('?') ? K_RED : '#334155'} fontWeight={line.includes('?') ? 'bold' : 'normal'}>
            {line}
          </text>
        ))}
    </KFig>
  );
};

const FIG_Q2 = <CylQ rx={30} h={100} lr="r = 3 cm" lm="M = 10 cm" />;
const FIG_Q4 = <CylQ rx={40} h={80} lr="r = 5 cm" lm="M = 10 cm" />;
const FIG_Q5 = <CylQ rx={50} h={40} lr="d = 10 cm" lm="M = 4 cm" diam />;
const FIG_Q6 = <CylQ rx={40} h={80} lr="r = 3 cm" lm="M = 2r" />;
const FIG_Q11 = (
  <KFig>
    <KCyl cx={60} by={130} rx={25} ry={8} h={30} />
    <KText p={[60, 144]} t="r = 2,5; M = 3" s={9.5} c={K_GREEN} />
    <KText p={[60, 84]} t="65 g" s={10.5} c={K_BLUE} />
    <KCyl cx={165} by={130} rx={50} ry={16} h={60} />
    <KText p={[165, 150]} t="r = 5; M = 6" s={9.5} c={K_GREEN} />
    <KText p={[165, 46]} t="? g" s={11} />
  </KFig>
);
const FIG_Q13 = (
  <KFig>
    <KLine a={[50, 140]} b={[50, 26]} c={K_PURPLE} w={1.3} dash />
    <KPoly p={[[50, 105], [140, 105], [140, 134], [50, 134]]} fill="#c7d2fe" c={K_EDGE} w={2} />
    <KText p={[95, 146]} t="4,5 cm" s={10} c={K_BLUE} />
    <KText p={[160, 120]} t="2,6 cm" s={10} c={K_BLUE} />
    <text x="60" y="50" fontSize="10.5" fill="#334155">tengely: a rövidebb</text>
    <text x="60" y="65" fontSize="10.5" fill="#334155">oldal egyenese</text>
    <text x="60" y="88" fontSize="11" fontWeight="bold" fill={K_RED}>V = ?</text>
  </KFig>
);
const FIG_Q16 = <CylQ rx={50} h={60} water={45} lr="d = 3 m" diam note="víz: 1,2 m|havi: 18 m³|hány hónap?" />;
const FIG_Q18 = <CylQ rx={38} h={108} water={72} lm="18 cm" note="kerület: 37,7 cm|víz: 12 cm|+ 4,5 dl víz|új vízszint: ?" />;
const FIG_Q20 = <CylQ rx={40} h={70} lr="r = ?" lm="M = 10 cm" note="V = 1000 cm³" />;
const FIG_Q22 = <CylQ rx={48} h={96} water={68} lr="d = 16 cm" diam note="4,77 liter festék|vízszint: ?" />;

const FIG_Q23 = (() => {
  const k = 6.2;
  const x0 = 28;
  const y0 = 18;
  const r = 4;
  return (
    <KFig>
      <rect x={x0} y={y0} width={29.7 * k} height={21 * k * 0.95} fill="#f1f5f9" stroke={K_EDGE} strokeWidth="1.4" />
      <rect x={x0} y={y0} width={2 * r * Math.PI * k} height={(21 - 2 * r) * k * 0.95} fill="#fef3c7" stroke="#b45309" strokeWidth="1.3" />
      <circle cx={x0 + r * k} cy={y0 + (21 - r) * k * 0.95} r={r * k * 0.95} fill="#e0e7ff" stroke={K_EDGE} strokeWidth="1.3" />
      <circle cx={x0 + 3 * r * k} cy={y0 + (21 - r) * k * 0.95} r={r * k * 0.95} fill="#e0e7ff" stroke={K_EDGE} strokeWidth="1.3" />
      <KText p={[x0 + r * Math.PI * k, y0 + 6.5 * k * 0.95]} t="2rπ × (21 − 2r)" s={9.5} c="#92400e" />
      <KText p={[x0 + 2 * r * k, y0 + (21 - r) * k * 0.95]} t="r = 4" s={9} c={K_GREEN} />
      <KText p={[x0 + 29.7 * k - 30, y0 + 17 * k]} t="A = ?" s={10.5} />
    </KFig>
  );
})();

const FIG_Q28 = (() => {
  const k = 6;
  const x0 = 30;
  const y0 = 42;
  const L = 22 * k;
  const W = 12 * k;
  return (
    <KFig>
      <path d={`M ${x0} ${y0} L ${x0 + L} ${y0} A ${W / 2} ${W / 2} 0 0 1 ${x0 + L} ${y0 + W} L ${x0} ${y0 + W} Z`} fill="#e0e7ff" stroke={K_EDGE} strokeWidth="1.8" />
      <KLine a={[x0 + L, y0]} b={[x0 + L, y0 + W]} c="#94a3b8" w={1} dash />
      <KText p={[x0 + L / 2, y0 + W + 11]} t="22 m" s={10} c={K_BLUE} />
      <KText p={[x0 - 12, y0 + W / 2]} t="12 m" s={10} c={K_BLUE} />
      <text x="120" y="32" fontSize="10" textAnchor="middle" fill="#334155">magasság 4,5 m, 4 ajtó (2 m × 2,5 m)</text>
    </KFig>
  );
})();

const CYL_AV_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cav-q1',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik képlet adja az r sugarú, M magasságú egyenes körhenger térfogatát?',
    options: ['V = r²π · M', 'V = 2rπ · M', 'V = 2r²π + 2rπM', 'V = r²π · M / 3'],
    correctAnswer: 0,
    explanation: 'A henger térfogata az alapterület és a magasság szorzata: V = T_alaplap · M = r²π · M. (2rπM a palást, a harmadik a felszín, a negyedik a kúp térfogata.)'
  },
  {
    id: 'cav-q2',
    questionTypeBadge: 'Térfogat',
    figure: FIG_Q2,
    level: 1,
    question: 'Mekkora a 3 cm sugarú, 10 cm magas henger térfogata?',
    options: ['90π ≈ 282,74 cm³', '60π ≈ 188,50 cm³', '30π ≈ 94,25 cm³', '900π cm³'],
    correctAnswer: 0,
    explanation: 'V = r²π · M = 9π · 10 = 90π ≈ 282,74 cm³.'
  },
  {
    id: 'cav-q3',
    questionTypeBadge: 'Palást',
    level: 1,
    question: 'Mekkora a 2 cm sugarú, 5 cm magas henger palástjának területe?',
    options: ['20π ≈ 62,83 cm²', '10π ≈ 31,42 cm²', '20 cm²', '28π ≈ 87,96 cm²'],
    correctAnswer: 0,
    explanation: 'T_palást = 2rπ · M = 4π · 5 = 20π ≈ 62,83 cm². (28π a teljes felszín lenne.)'
  },
  {
    id: 'cav-q4',
    questionTypeBadge: 'Felszín',
    figure: FIG_Q4,
    level: 1,
    question: 'Mekkora az 5 cm sugarú, 10 cm magas henger felszíne?',
    options: ['150π ≈ 471,24 cm²', '125π ≈ 392,70 cm²', '100π ≈ 314,16 cm²', '250π ≈ 785,40 cm²'],
    correctAnswer: 0,
    explanation: 'A = 2r²π + 2rπM = 50π + 100π = 150π ≈ 471,24 cm². (125π: csak egy alapkörrel; 250π a térfogat.)'
  },
  {
    id: 'cav-q5',
    questionTypeBadge: 'Térfogat',
    figure: FIG_Q5,
    level: 1,
    question: 'Mekkora a 10 cm átmérőjű, 4 cm magas henger térfogata?',
    options: ['100π ≈ 314,16 cm³', '400π ≈ 1256,6 cm³', '40π ≈ 125,66 cm³', '20π ≈ 62,83 cm³'],
    correctAnswer: 0,
    explanation: 'r = 5 cm: V = 25π · 4 = 100π ≈ 314,16 cm³. (400π az átmérővel számolt hibás érték.)'
  },
  {
    id: 'cav-q6',
    questionTypeBadge: 'Egyenlő oldalú henger',
    figure: FIG_Q6,
    level: 1,
    question: 'Mekkora a 3 cm sugarú egyenlő oldalú henger (M = 2r) térfogata?',
    options: ['54π ≈ 169,65 cm³', '27π ≈ 84,82 cm³', '18π ≈ 56,55 cm³', '108π ≈ 339,29 cm³'],
    correctAnswer: 0,
    explanation: 'M = 6 cm, V = 9π · 6 = 54π ≈ 169,65 cm³ (= 2r³π).'
  },
  {
    id: 'cav-q7',
    questionTypeBadge: 'Mértékegység',
    level: 1,
    question: 'Egy edény térfogata 1000 cm³. Hány liter folyadék fér bele?',
    options: ['1 liter', '10 liter', '0,1 liter', '100 liter'],
    correctAnswer: 0,
    explanation: '1000 cm³ = 1 dm³ = 1 liter.'
  },
  {
    id: 'cav-q8',
    questionTypeBadge: 'Változás',
    level: 1,
    question: 'Hogyan változik a henger térfogata, ha a sugarát változatlanul hagyva a magasságát kétszeresére növeljük?',
    options: ['kétszeresére nő', 'négyszeresére nő', 'nyolcszorosára nő', 'nem változik'],
    correctAnswer: 0,
    explanation: 'V = r²π · M egyenesen arányos M-mel, így a térfogat is kétszeres lesz.'
  },
  {
    id: 'cav-q9',
    questionTypeBadge: 'Változás',
    level: 1,
    question: 'Hogyan változik a henger térfogata, ha a magasságát változatlanul hagyva a sugarát kétszeresére növeljük?',
    options: ['négyszeresére nő', 'kétszeresére nő', 'nyolcszorosára nő', 'felére csökken'],
    correctAnswer: 0,
    explanation: 'A térfogat r²-tel arányos: (2r)² = 4r², tehát négyszeres lesz.'
  },
  {
    id: 'cav-q10',
    questionTypeBadge: 'Konzervdoboz',
    level: 1,
    question: 'Hány cm² alumíniumlemez kell a 2,5 cm sugarú, 3 cm magas konzervdobozhoz (hulladék nélkül)?',
    options: ['27,5π ≈ 86,4 cm²', '15π ≈ 47,1 cm²', '21,25π ≈ 66,8 cm²', '18,75π ≈ 58,9 cm²'],
    correctAnswer: 0,
    explanation: 'Két kör: 2 · 6,25π = 12,5π; palást: 5π · 3 = 15π. Összesen 27,5π ≈ 86,4 cm². (18,75π cm³ a térfogata.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'cav-q11',
    questionTypeBadge: 'Hasonló hengerek',
    figure: FIG_Q11,
    level: 2,
    question: 'A kisebb konzervbe 65 g májkrém fér. Hány gramm fér abba a dobozba, amelynek minden mérete kétszeres?',
    options: ['520 g', '130 g', '260 g', '1040 g'],
    correctAnswer: 0,
    explanation: 'V_nagy = 5²π · 6 = 150π, V_kis = 2,5²π · 3 = 18,75π; az arány 8 = 2³. 8 · 65 = 520 g.'
  },
  {
    id: 'cav-q12',
    questionTypeBadge: 'Hasonló hengerek',
    level: 2,
    question: 'Hányszorosa a nagyobb (r = 5 cm, M = 6 cm) konzervdoboz felszíne a kisebbikének (r = 2,5 cm, M = 3 cm)?',
    options: ['4-szerese', '2-szerese', '8-szorosa', '6-szorosa'],
    correctAnswer: 0,
    explanation: 'A_nagy = 2 · 25π + 10π · 6 = 110π, A_kis = 27,5π; 110π : 27,5π = 4 = 2².'
  },
  {
    id: 'cav-q13',
    questionTypeBadge: 'Forgatás',
    figure: FIG_Q13,
    level: 2,
    question: 'Egy 2,6 cm × 4,5 cm-es téglalapot a rövidebb oldalának egyenese körül forgatunk meg. Mekkora a keletkező henger térfogata?',
    options: ['≈ 165,40 cm³', '≈ 95,57 cm³', '≈ 200,75 cm³', '≈ 36,76 cm³'],
    correctAnswer: 0,
    explanation: 'r = 4,5 cm, M = 2,6 cm: V = 20,25π · 2,6 = 52,65π ≈ 165,40 cm³.'
  },
  {
    id: 'cav-q14',
    questionTypeBadge: 'Forgatás',
    level: 2,
    question: 'Ugyanezt a 2,6 cm × 4,5 cm-es téglalapot a hosszabb oldala körül forgatjuk. Mekkora a henger felszíne?',
    options: ['≈ 115,99 cm²', '≈ 200,75 cm²', '≈ 73,51 cm²', '≈ 95,57 cm²'],
    correctAnswer: 0,
    explanation: 'r = 2,6, M = 4,5: A = 2rπ(r + M) = 5,2π · 7,1 = 36,92π ≈ 115,99 cm².'
  },
  {
    id: 'cav-q15',
    questionTypeBadge: 'Festőhenger',
    level: 2,
    question: 'Egy 2 cm sugarú, 20 cm széles festőhenger egy teljes fordulattal mekkora falfelületet fest be?',
    options: ['80π ≈ 251,3 cm²', '40π ≈ 125,7 cm²', '80 cm²', '88π ≈ 276,5 cm²'],
    correctAnswer: 0,
    explanation: 'Egy fordulat a henger palástjának területe: 2 · 2 · π · 20 = 80π ≈ 251,3 cm². (A körlapok nem festenek.)'
  },
  {
    id: 'cav-q16',
    questionTypeBadge: 'Kerti medence',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy 3 m átmérőjű hengeres medencét 1,2 m magasan töltenek fel. Hány hónapra elég ez a víz egy havi 18 m³-t fogyasztó családnak?',
    options: ['≈ 0,47 hónapra (kb. 2 hétre)', '≈ 1,88 hónapra', '≈ 2,12 hónapra', '≈ 0,63 hónapra'],
    correctAnswer: 0,
    explanation: 'V = 1,5²π · 1,2 = 2,7π ≈ 8,48 m³; 8,48 / 18 ≈ 0,47 hónap. (1,88 az átmérővel számolt hibás érték.)'
  },
  {
    id: 'cav-q17',
    questionTypeBadge: 'Mézes üvegek',
    level: 2,
    question: 'Egy hengeres üveg kétszer olyan magas, mint egy másik, de átmérője csak feleakkora. Hányszorosa a térfogata a másikénak?',
    options: ['a fele', 'ugyanakkora', 'a kétszerese', 'a negyede'],
    correctAnswer: 0,
    explanation: 'V′ = (r/2)²π · 2M = ½ · r²πM, vagyis feleakkora.'
  },
  {
    id: 'cav-q18',
    questionTypeBadge: 'Vízszint',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy hengeres edény fenekének kerülete 37,7 cm, 12 cm magasan áll benne a víz. Milyen magasan áll a víz, ha még 4,5 dl vizet töltünk bele?',
    options: ['≈ 16 cm', '≈ 13 cm', '≈ 24 cm', '≈ 12,4 cm'],
    correctAnswer: 0,
    explanation: 'r = 37,7 / (2π) ≈ 6 cm, T ≈ 113,1 cm². 450 cm³ / 113,1 cm² ≈ 4 cm emelkedés: ≈ 16 cm (az edény 18 cm magas, nem fut ki).'
  },
  {
    id: 'cav-q19',
    questionTypeBadge: 'Egyenlő oldalú henger',
    level: 2,
    question: 'Mekkora a 4 cm sugarú egyenlő oldalú henger felszíne?',
    options: ['96π ≈ 301,59 cm²', '64π ≈ 201,06 cm²', '48π ≈ 150,80 cm²', '128π ≈ 402,12 cm²'],
    correctAnswer: 0,
    explanation: 'M = 2r = 8: A = 2 · 16π + 8π · 8 = 32π + 64π = 96π (= 6r²π) ≈ 301,59 cm².'
  },
  {
    id: 'cav-q20',
    questionTypeBadge: 'Sugár a térfogatból',
    figure: FIG_Q20,
    level: 2,
    question: 'Egy 10 cm magas henger térfogata 1000 cm³. Mekkora az alapkör sugara?',
    options: ['≈ 5,64 cm', '10 cm', '≈ 31,83 cm', '≈ 3,18 cm'],
    correctAnswer: 0,
    explanation: 'r²π · 10 = 1000 ⇒ r² = 100/π ≈ 31,83 ⇒ r ≈ 5,64 cm.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'cav-q21',
    questionTypeBadge: 'Festőhenger',
    level: 3,
    question: 'A 2 cm sugarú, 20 cm széles festőhenger fordulatonként 3 ml festéket visz fel. Kb. hány liter festék kell egy 40 m²-es falfelület egyszeri lefestéséhez?',
    options: ['≈ 4,8 liter', '≈ 0,48 liter', '≈ 9,5 liter', '≈ 48 liter'],
    correctAnswer: 0,
    explanation: '40 m² = 400 000 cm²; 400 000 / (80π) ≈ 1591,5 fordulat; · 3 ml ≈ 4775 ml ≈ 4,8 liter.',
    breakdown: ['1 fordulat: 80π ≈ 251,3 cm²', '400 000 : 251,3 ≈ 1591,5 fordulat', '1591,5 · 3 ml ≈ 4775 ml ≈ 4,8 l']
  },
  {
    id: 'cav-q22',
    questionTypeBadge: 'Festékes vödör',
    figure: FIG_Q22,
    level: 3,
    question: 'Milyen magasan áll 4,77 liter festék egy 16 cm átmérőjű hengeres vödörben?',
    options: ['≈ 23,7 cm', '≈ 5,9 cm', '≈ 29,8 cm', '≈ 11,9 cm'],
    correctAnswer: 0,
    explanation: 'T = 8²π = 64π ≈ 201,1 cm²; 4775 cm³ / 201,1 cm² ≈ 23,7 cm. (5,9 cm az átmérővel számolt hibás érték.)'
  },
  {
    id: 'cav-q23',
    questionTypeBadge: 'Karton henger',
    figure: FIG_Q23,
    level: 3,
    question: 'Egy 29,7 × 21 cm-es kartonból a rajz szerint egy 2rπ × (21 − 2r)-es palástot és két r sugarú kört vágunk ki, r = 4 cm. Mekkora a henger felszíne?',
    options: ['136π ≈ 427,3 cm²', '104π ≈ 326,7 cm²', '168π ≈ 527,8 cm²', '120π ≈ 377,0 cm²'],
    correctAnswer: 0,
    explanation: 'M = 21 − 8 = 13 cm; A = 2 · 16π + 8π · 13 = 32π + 104π = 136π ≈ 427,3 cm².'
  },
  {
    id: 'cav-q24',
    questionTypeBadge: 'Hulladék',
    level: 3,
    question: 'Ha a kiterített palást hosszabbik oldala éppen 29,7 cm (2rπ = 29,7), hány százalék hulladék keletkezik a 29,7 × 21 cm-es kartonból?',
    options: ['≈ 22,5%', '≈ 45%', '≈ 77,5%', '≈ 10,5%'],
    correctAnswer: 0,
    explanation: 'r ≈ 4,73 cm, M = 21 − 2r ≈ 11,55 cm; a felhasznált rész 2r²π + 29,7 · M ≈ 483,3 cm² a 623,7 cm²-ből, a hulladék ≈ 140,4 cm² ≈ 22,5%.'
  },
  {
    id: 'cav-q25',
    questionTypeBadge: 'Forgatás',
    level: 3,
    question: 'Egy téglalap egyik oldala 4-szer olyan hosszú, mint a másik. Hányszor akkora a henger térfogata, ha a rövidebb oldal körül forgatjuk, mint ha a hosszabb körül?',
    options: ['4-szer', '16-szor', '2-szer', 'ugyanakkora'],
    correctAnswer: 0,
    explanation: 'Oldalak a és 4a. Rövidebb körül: r = 4a, M = a ⇒ 16πa³. Hosszabb körül: r = a, M = 4a ⇒ 4πa³. Az arány 4.'
  },
  {
    id: 'cav-q26',
    questionTypeBadge: 'Kerti medence',
    level: 3,
    question: 'A 3 m átmérőjű, 160 cm magas hengeres medence belső felületét (alját és oldalát) bevonják. Hány négyzetméter ez?',
    options: ['≈ 22,15 m²', '≈ 29,22 m²', '≈ 15,08 m²', '≈ 18,38 m²'],
    correctAnswer: 0,
    explanation: 'Alj: 1,5²π ≈ 7,07 m²; oldal: 2 · 1,5 · π · 1,6 ≈ 15,08 m². Összesen ≈ 22,15 m² (a medence nyitott, csak egy körlap van).'
  },
  {
    id: 'cav-q27',
    questionTypeBadge: 'Vízdíj',
    level: 3,
    question: 'A medencébe ≈ 8,48 m³ víz kerül, a víz- és csatornadíj együtt 620 Ft/m³. Mennyibe kerül egy feltöltés?',
    options: ['≈ 5259 Ft', '≈ 2629 Ft', '≈ 21 036 Ft', '≈ 620 Ft'],
    correctAnswer: 0,
    explanation: '8,48 · 620 ≈ 5259 Ft (pontosabban 2,7π · 620 ≈ 5259 Ft).'
  },
  {
    id: 'cav-q28',
    questionTypeBadge: 'Koncertterem',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy 4,5 m magas koncertterem alaprajza egy 22 m × 12 m-es téglalap és a 12 m-es oldalához illesztett félkör. Hány m²-t kell festeni (falak és mennyezet), ha 4 ajtó egyenként 2 m × 2,5 m?',
    options: ['≈ 637,4 m²', '≈ 657,4 m²', '≈ 584,4 m²', '≈ 693,9 m²'],
    correctAnswer: 0,
    explanation: 'Kerület: 22 + 22 + 12 + 6π ≈ 74,85 m, falak ≈ 336,8 m². Mennyezet: 264 + 18π ≈ 320,5 m². Ajtók: 20 m². Összesen ≈ 637,4 m².',
    breakdown: ['falak: (56 + 6π) · 4,5 ≈ 336,8 m²', 'mennyezet: 22 · 12 + 6²π/2 ≈ 320,5 m²', 'ajtók: 4 · 2 · 2,5 = 20 m²', '336,8 + 320,5 − 20 ≈ 637,4 m²']
  },
  {
    id: 'cav-q29',
    questionTypeBadge: 'Optimalizálás',
    level: 3,
    question: 'Adott térfogatú henger felszíne akkor a legkisebb, ha M = 2r. Mekkora legyen az 1 literes konzervdoboz sugara, hogy a legkevesebb lemez kelljen hozzá?',
    options: ['≈ 5,42 cm', '≈ 6,83 cm', '≈ 3,99 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'V = r²π · 2r = 2πr³ = 1000 ⇒ r³ = 1000/(2π) ≈ 159,15 ⇒ r ≈ 5,42 cm (M ≈ 10,84 cm).'
  },
  {
    id: 'cav-q30',
    questionTypeBadge: 'Palást és alapkörök',
    level: 3,
    question: 'Egy 4 cm sugarú henger palástjának területe egyenlő a két alapkör területének összegével. Mekkora a henger térfogata?',
    options: ['64π ≈ 201,06 cm³', '128π ≈ 402,12 cm³', '32π ≈ 100,53 cm³', '16π ≈ 50,27 cm³'],
    correctAnswer: 0,
    explanation: '2rπM = 2r²π ⇒ M = r = 4 cm, V = 16π · 4 = 64π ≈ 201,06 cm³.'
  }
];

export const CylinderAreaVolumeQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-henger-felszin-terfogat-quiz"
      subtopicId="a-henger-felszine-es-terfogata"
      title="5. A henger felszíne és térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: felszín, palást, térfogat, konzervdobozok, medencék, festőhenger."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={CYL_AV_QUESTIONS}
      cheatSheets={[
        {
          title: 'Képletek',
          items: ['T_alaplap = r²π, K = 2rπ', 'T_palást = 2rπ · M', 'A = 2r²π + 2rπM = 2rπ(r + M)', 'V = r²π · M']
        },
        {
          title: 'Speciális esetek',
          items: [
            'Egyenlő oldalú henger (M = 2r): A = 6r²π, V = 2r³π',
            'Nyitott edény: A = r²π + 2rπM',
            'Adott V mellett a legkisebb A: M = 2r',
            'Átmérő megadásakor először r = d / 2!'
          ]
        },
        {
          title: 'Változások, mértékegységek',
          items: [
            'M kétszeres ⇒ V kétszeres; r kétszeres ⇒ V négyszeres',
            'Minden méret λ-szoros: A · λ², V · λ³',
            '1 dm³ = 1 liter, 1 m³ = 1000 liter, 1 dl = 100 cm³',
            'Vízszint-emelkedés = hozzáadott térfogat : alapterület'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CylinderAreaVolumeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <CylinderAreaVolumeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default CylinderAreaVolumeQuiz;
