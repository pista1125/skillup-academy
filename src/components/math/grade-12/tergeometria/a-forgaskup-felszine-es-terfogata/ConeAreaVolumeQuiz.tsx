import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ConeAreaVolumeMatcher } from './ConeAreaVolumeMatcher';
import { ConeAreaVolumeSorter } from './ConeAreaVolumeSorter';
import { QFig, Txt, Seg, Poly, AngleArc, RoundQ, sectorPath, polar, SK, P2 } from '../a-gula/SolidSketch';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Körcikk (kiterített palást) felirattal. */
const SectorQ: React.FC<{ ang: number; radius?: string; arc?: string; angle?: string }> = ({ ang, radius, arc, angle }) => {
  const c: P2 = [120, ang > 180 ? 84 : 128];
  const R = ang > 180 ? 60 : 98;
  const start = 90 - ang / 2;
  return (
    <QFig>
      <path d={sectorPath(c, R, start, ang)} fill="rgba(124,58,237,0.14)" stroke={SK.purple} strokeWidth="1.8" />
      <Seg a={c} b={polar(c, R, start)} color={SK.green} w={2} />
      {radius && <Txt p={[polar(c, R * 0.55, start)[0] + 8, polar(c, R * 0.55, start)[1] + 6]} t={radius} anchor="start" size={10.5} color={SK.green} />}
      {angle !== undefined && <AngleArc v={c} p1={polar(c, R, start)} p2={polar(c, R, start + ang)} t={angle} r={14} tr={26} />}
      {arc && <Txt p={polar(c, R + 11, 90)} t={arc} size={10.5} color={SK.purple} />}
    </QFig>
  );
};

/** Csúcsával lefelé álló kúp rétegekkel (Finom csemege). */
const LayeredConeQ: React.FC = () => {
  const A: P2 = [120, 146];
  const top = 18;
  const halfW = 66;
  const yAt = (h: number) => A[1] - ((A[1] - top) * h) / 16;
  const wAt = (h: number) => (halfW * h) / 16;
  const band = (h1: number, h2: number, fill: string) => (
    <Poly
      p={h1 === 0 ? [A, [A[0] + wAt(h2), yAt(h2)], [A[0] - wAt(h2), yAt(h2)]] : [[A[0] - wAt(h1), yAt(h1)], [A[0] + wAt(h1), yAt(h1)], [A[0] + wAt(h2), yAt(h2)], [A[0] - wAt(h2), yAt(h2)]]}
      fill={fill}
      color={SK.line}
      w={1.4}
    />
  );
  return (
    <QFig>
      {band(0, 8, 'rgba(146,64,14,0.35)')}
      {band(8, 12, 'rgba(245,158,11,0.3)')}
      {band(12, 16, 'rgba(234,179,8,0.25)')}
      <Txt p={[120, 112]} t="mazsola" size={9.5} />
      <Txt p={[120, 64]} t="mandula" size={9.5} />
      <Txt p={[120, 32]} t="földimogyoró" size={9.5} />
      <Txt p={[200, 112]} t="8 cm" size={9.5} anchor="start" color={SK.aux} />
      <Txt p={[200, 64]} t="4 cm" size={9.5} anchor="start" color={SK.aux} />
      <Txt p={[200, 32]} t="4 cm" size={9.5} anchor="start" color={SK.aux} />
      <Txt p={[120, 10]} t="átmérő 12 cm" size={9} color={SK.aux} />
    </QFig>
  );
};

export const CONE_AREA_VOLUME_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cav-q1',
    level: 1,
    questionTypeBadge: 'Felszínképlet',
    question: 'Melyik képlet adja a forgáskúp felszínét (r: sugár, a: alkotó)?',
    options: ['A = r²π + rπa', 'A = 2r²π + 2rπa', 'A = r²π + 2rπa', 'A = rπa'],
    correctAnswer: 0,
    explanation: 'A = T_alaplap + T_palást = r²π + rπa = rπ(r + a). Az rπa önmagában csak a palást.'
  },
  {
    id: 'cav-q2',
    level: 1,
    questionTypeBadge: 'Térfogatképlet',
    question: 'Melyik képlet adja a forgáskúp térfogatát?',
    options: ['V = r²π · M / 3', 'V = r²π · M', 'V = r²π · a / 3', 'V = rπa · M / 3'],
    correctAnswer: 0,
    explanation: 'Mint a gúlánál: az alapterület és a testmagasság szorzatának harmada. A magasság M, nem az alkotó.'
  },
  {
    id: 'cav-q3',
    level: 1,
    questionTypeBadge: 'Palást területe',
    figure: <RoundQ R={3} M={4} l={{ R: 'r = 3', M: 'M = 4', a: 'a' }} />,
    question: 'Egy forgáskúp alapkörének sugara 3 cm, magassága 4 cm. Mekkora a palást területe?',
    options: ['15π ≈ 47,1 cm²', '12π ≈ 37,7 cm²', '24π ≈ 75,4 cm²', '9π ≈ 28,3 cm²'],
    correctAnswer: 0,
    explanation: 'a = √(3² + 4²) = 5 cm, T_palást = rπa = 3 · 5 · π = 15π ≈ 47,1 cm². (12π jönne ki M-mel.)'
  },
  {
    id: 'cav-q4',
    level: 1,
    questionTypeBadge: 'Kúp felszíne',
    figure: <RoundQ R={3} M={4} l={{ R: 'r = 3', M: 'M = 4', a: 'a' }} />,
    question: 'Mekkora az előző kúp (r = 3 cm, M = 4 cm) felszíne?',
    options: ['24π ≈ 75,4 cm²', '15π ≈ 47,1 cm²', '21π ≈ 66,0 cm²', '33π ≈ 103,7 cm²'],
    correctAnswer: 0,
    explanation: 'A = r²π + rπa = 9π + 15π = 24π ≈ 75,4 cm².'
  },
  {
    id: 'cav-q5',
    level: 1,
    questionTypeBadge: 'Kúp térfogata',
    figure: <RoundQ R={3} M={4} l={{ R: 'r = 3', M: 'M = 4' }} />,
    question: 'Mekkora a 3 cm sugarú, 4 cm magas forgáskúp térfogata?',
    options: ['12π ≈ 37,7 cm³', '36π ≈ 113,1 cm³', '4π ≈ 12,6 cm³', '15π ≈ 47,1 cm³'],
    correctAnswer: 0,
    explanation: 'V = r²π · M / 3 = 9π · 4 / 3 = 12π ≈ 37,7 cm³. (36π a henger térfogata lenne.)'
  },
  {
    id: 'cav-q6',
    level: 1,
    questionTypeBadge: 'Kúp és henger',
    question: 'Egy henger térfogata 90 cm³. Mekkora a vele azonos alapkörű és magasságú kúp térfogata?',
    options: ['30 cm³', '45 cm³', '60 cm³', '270 cm³'],
    correctAnswer: 0,
    explanation: 'A kúp térfogata a vele azonos alapterületű és magasságú henger térfogatának harmada: 90 / 3 = 30 cm³.'
  },
  {
    id: 'cav-q7',
    level: 1,
    questionTypeBadge: 'Kiterített palást',
    question: 'Milyen síkidom a forgáskúp síkba kiterített palástja?',
    options: [
      'Körcikk, amelynek sugara az alkotó, íve az alapkör kerülete',
      'Körcikk, amelynek sugara az alapkör sugara',
      'Egyenlő szárú háromszög',
      'Félkörlap, mindig'
    ],
    correctAnswer: 0,
    explanation: 'A palást körcikk: sugara a kúp alkotója, határoló íve az alapkör kerületével egyenlő hosszú. (Félkör csak akkor, ha a = 2r.)'
  },
  {
    id: 'cav-q8',
    level: 1,
    questionTypeBadge: 'Középponti szög',
    figure: <SectorQ ang={216} radius="a = 10" arc="ív = 2rπ" angle="?" />,
    question: 'Egy forgáskúp alapkörének sugara 6 cm, alkotója 10 cm. Mekkora a kiterített palást középponti szöge?',
    options: ['216°', '144°', '108°', '60°'],
    correctAnswer: 0,
    explanation: 'α = 360° · r / a = 360° · 6 / 10 = 216°.'
  },
  {
    id: 'cav-q9',
    level: 1,
    questionTypeBadge: 'Arkhimédész',
    question: 'Arkhimédész ábráján a henger magassága az alapkör átmérője, a gömb a hengerbe írt gömb, a kúp alapköre a henger alapköre, csúcsa a fedőlap középpontja. Mi a kúp, a gömb és a henger térfogatának aránya?',
    options: ['1 : 2 : 3', '1 : 3 : 2', '2 : 3 : 4', '1 : 4 : 3'],
    correctAnswer: 0,
    explanation: 'V_kúp = 2r³π/3, V_gömb = 4r³π/3, V_henger = 2r³π, így az arány 1 : 2 : 3.'
  },
  {
    id: 'cav-q10',
    level: 1,
    questionTypeBadge: 'Kúp térfogata',
    figure: <RoundQ R={5} M={9} l={{ R: 'r = 5', M: 'M = 9' }} />,
    question: 'Mekkora az 5 cm sugarú, 9 cm magas forgáskúp térfogata?',
    options: ['75π ≈ 235,6 cm³', '225π ≈ 706,9 cm³', '15π ≈ 47,1 cm³', '45π ≈ 141,4 cm³'],
    correctAnswer: 0,
    explanation: 'V = 25π · 9 / 3 = 75π ≈ 235,6 cm³.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'cav-q11',
    level: 2,
    questionTypeBadge: 'Kúp felszíne',
    figure: <RoundQ R={3.75} M={9} l={{ R: 'd = 7,5', M: 'M = 9', a: 'a' }} />,
    question: 'Egy forgáskúp alapkörének átmérője 7,5 cm, magassága 9 cm. Mekkora a felszíne?',
    options: ['≈ 159,0 cm²', '≈ 114,9 cm²', '≈ 274,9 cm²', '≈ 150,2 cm²'],
    correctAnswer: 0,
    explanation: 'r = 3,75 cm, a = √(3,75² + 81) = 9,75 cm. A = 3,75π · (3,75 + 9,75) = 50,625π ≈ 159,0 cm². (114,9 cm² csak a palást.)'
  },
  {
    id: 'cav-q12',
    level: 2,
    questionTypeBadge: 'Kúp térfogata',
    figure: <RoundQ R={3.75} M={9} l={{ R: 'd = 7,5', M: 'M = 9' }} />,
    question: 'Mekkora az előző kúp (d = 7,5 cm, M = 9 cm) térfogata?',
    options: ['≈ 132,5 cm³', '≈ 530,1 cm³', '≈ 397,6 cm³', '≈ 70,7 cm³'],
    correctAnswer: 0,
    explanation: 'V = 3,75²π · 9 / 3 = 42,1875π ≈ 132,5 cm³. (530,1 cm³ jönne ki, ha az átmérővel számolnánk sugár helyett.)'
  },
  {
    id: 'cav-q13',
    level: 2,
    questionTypeBadge: 'Nyílásszög',
    question: 'Mekkora a 7,5 cm átmérőjű, 9 cm magas forgáskúp nyílásszöge?',
    options: ['≈ 45,2°', '≈ 22,6°', '≈ 79,4°', '≈ 67,4°'],
    correctAnswer: 0,
    explanation: 'tg(φ/2) = 3,75 / 9 ⇒ φ/2 ≈ 22,6° ⇒ φ ≈ 45,2°. (67,4° az alkotó és az alapsík szöge.)'
  },
  {
    id: 'cav-q14',
    level: 2,
    questionTypeBadge: 'Térfogat háromszögből',
    figure: <RoundQ R={2.1} M={2} l={{ R: 'r = 2,1', a: 'a = 2,9', M: 'M' }} />,
    question: 'Egy egyenlő szárú háromszög alapja 4,2 dm, szára 2,9 dm. A szimmetriatengelye körül megforgatjuk. Mekkora a kúp térfogata?',
    options: ['≈ 9,24 dm³', '≈ 27,71 dm³', '≈ 13,39 dm³', '≈ 36,95 dm³'],
    correctAnswer: 0,
    explanation: 'r = 2,1 dm, M = √(2,9² − 2,1²) = √4 = 2 dm. V = 2,1²π · 2 / 3 ≈ 9,24 dm³.'
  },
  {
    id: 'cav-q15',
    level: 2,
    questionTypeBadge: 'Középponti szög',
    figure: <SectorQ ang={260.7} radius="2,9 dm" angle="?" />,
    question: 'Mekkora az előző kúp (r = 2,1 dm, a = 2,9 dm) kiterített palástjának középponti szöge?',
    options: ['≈ 260,7°', '≈ 138,1°', '≈ 99,3°', '≈ 130,3°'],
    correctAnswer: 0,
    explanation: 'α = 360° · r / a = 360° · 2,1 / 2,9 ≈ 260,7°.'
  },
  {
    id: 'cav-q16',
    level: 2,
    questionTypeBadge: 'Kúp felszíne',
    question: 'Mekkora az r = 2,1 dm sugarú, a = 2,9 dm alkotójú kúp felszíne?',
    options: ['10,5π ≈ 33,0 dm²', '6,09π ≈ 19,1 dm²', '4,41π ≈ 13,9 dm²', '12,6π ≈ 39,6 dm²'],
    correctAnswer: 0,
    explanation: 'A = rπ(r + a) = 2,1π · 5 = 10,5π ≈ 33,0 dm².'
  },
  {
    id: 'cav-q17',
    level: 2,
    questionTypeBadge: 'Sóderkupac',
    figure: <RoundQ R={1.5} M={0.8} l={{ R: 'd = 3 m', M: '0,8 m' }} />,
    question: '2 m³ sódert rendeltek. A leborított kupac nagyjából kúp: alapja 3 m átmérőjű kör, magassága kb. 80 cm. Körülbelül mekkora a kupac térfogata?',
    options: ['≈ 1,88 m³ (kevesebb a rendeltnél)', '≈ 5,65 m³ (több a rendeltnél)', '≈ 7,54 m³ (több a rendeltnél)', '≈ 2,00 m³ (pontosan annyi)'],
    correctAnswer: 0,
    explanation: 'V = 1,5²π · 0,8 / 3 ≈ 1,88 m³ < 2 m³. (5,65 m³ a 3/-mal való osztás nélkül, 7,54 m³ az átmérővel számolva jönne ki.)'
  },
  {
    id: 'cav-q18',
    level: 2,
    questionTypeBadge: 'Arkhimédész',
    figure: <RoundQ R={5} M={10} l={{ R: 'r = 5', M: 'M = 10', a: 'a' }} />,
    question: 'Arkhimédész ábráján a henger sugara 5 cm, magassága 10 cm. Mekkora a beírt kúp (alapja a henger alaplapja, csúcsa a fedőlap középpontja) felszíne?',
    options: ['25π(1 + √5) ≈ 254 cm²', '75π ≈ 236 cm²', '100π ≈ 314 cm²', '150π ≈ 471 cm²'],
    correctAnswer: 0,
    explanation: 'a = √(25 + 100) = 5√5 cm. A = 25π + 5π · 5√5 = 25π(1 + √5) ≈ 254 cm². (100π a gömb, 150π a henger felszíne.)'
  },
  {
    id: 'cav-q19',
    level: 2,
    questionTypeBadge: 'Forgatott háromszög',
    figure: <RoundQ R={35} M={84} l={{ R: 'r = 35 mm', M: 'M = 84 mm', a: 'a' }} />,
    question: 'Egy 35 mm és 84 mm befogójú derékszögű háromszöget a hosszabbik befogó körül megforgatunk. Mekkora a keletkező kúp térfogata?',
    options: ['≈ 107 757 mm³', '≈ 323 270 mm³', '≈ 258 606 mm³', '≈ 44 899 mm³'],
    correctAnswer: 0,
    explanation: 'r = 35 mm, M = 84 mm: V = 35²π · 84 / 3 = 34 300π ≈ 107 757 mm³ ≈ 107,8 cm³.'
  },
  {
    id: 'cav-q20',
    level: 2,
    questionTypeBadge: 'Térfogat szögből',
    figure: <RoundQ R={88} M={88} l={{ R: 'r', M: 'M = 88 mm', base: '45°' }} />,
    question: 'Egy 88 mm magas forgáskúp alkotói 45°-os szöget zárnak be az alapkör síkjával. Mekkora a térfogata?',
    options: ['≈ 713,6 cm³', '≈ 2140,9 cm³', '≈ 356,8 cm³', '≈ 1009,2 cm³'],
    correctAnswer: 0,
    explanation: 'A 45° miatt r = M = 88 mm = 8,8 cm. V = 8,8²π · 8,8 / 3 ≈ 713,6 cm³.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'cav-q21',
    level: 3,
    questionTypeBadge: 'Papírcsákó',
    figure: <SectorQ ang={132} arc="ív = 44 cm" angle="132°" radius="a" />,
    question: 'Egy forgáskúp alakú papírcsákót 132°-os középponti szögű, 44 cm ívhosszúságú körcikkből készítettek. Hány cm magas a csákó (egészre kerekítve)?',
    options: ['18 cm', '19 cm', '7 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'Alkotó: 2aπ · 132/360 = 44 ⇒ a ≈ 19,1 cm. Sugár: 2rπ = 44 ⇒ r ≈ 7,0 cm. M = √(19,1² − 7,0²) ≈ 17,8 ≈ 18 cm.'
  },
  {
    id: 'cav-q22',
    level: 3,
    questionTypeBadge: 'Popcorn-tölcsér',
    figure: <SectorQ ang={171.9} radius="20 cm" arc="ív = 60 cm" />,
    question: 'Egy popcorn-tölcsér palástja 20 cm sugarú körből kivágott körcikk, amelynek íve 60 cm. Mekkora a tölcsér térfogata?',
    options: ['≈ 1678 cm³', '≈ 5034 cm³', '≈ 1910 cm³', '≈ 600 cm³'],
    correctAnswer: 0,
    explanation: 'r = 60 / (2π) ≈ 9,55 cm, M = √(20² − 9,55²) ≈ 17,57 cm. V = 9,55²π · 17,57 / 3 ≈ 1678 cm³. (1910 cm³ jönne ki, ha M helyett az alkotóval számolnánk.)'
  },
  {
    id: 'cav-q23',
    level: 3,
    questionTypeBadge: 'Forgatott háromszög',
    figure: <RoundQ R={35} M={84} l={{ R: 'r = 35', M: 'M = 84', a: 'a = ?' }} />,
    question: 'Mekkora a 35 mm és 84 mm befogójú derékszögű háromszög hosszabbik befogó körüli forgatásával kapott kúp felszíne?',
    options: ['≈ 13 854 mm²', '≈ 10 006 mm²', '≈ 33 255 mm²', '≈ 9 236 mm²'],
    correctAnswer: 0,
    explanation: 'a = √(35² + 84²) = 91 mm. A = 35π · (35 + 91) = 4410π ≈ 13 854 mm². (10 006 mm² csak a palást.)'
  },
  {
    id: 'cav-q24',
    level: 3,
    questionTypeBadge: 'Felszín szögből',
    question: 'Egy 88 mm magas forgáskúp alkotói 45°-os szöget zárnak be az alapkör síkjával. Mekkora a felszíne?',
    options: ['≈ 587,3 cm²', '≈ 344,0 cm²', '≈ 243,3 cm²', '≈ 486,6 cm²'],
    correctAnswer: 0,
    explanation: 'r = 8,8 cm, a = 8,8√2 ≈ 12,45 cm. A = 8,8π · (8,8 + 12,45) ≈ 587,3 cm². (344,0 cm² csak a palást, 243,3 cm² az alaplap.)'
  },
  {
    id: 'cav-q25',
    level: 3,
    questionTypeBadge: 'Papírpohár',
    figure: <RoundQ R={3} M={9} l={{ R: 'd = 6 cm', M: 'M = 9' }} />,
    question: 'Egy kúp alakú papírpohár magassága 9 cm, átmérője 6 cm (az „alja” a kúp csúcsa). Legfeljebb mennyi víz fér bele?',
    options: ['≈ 84,8 cm³', '≈ 254,5 cm³', '≈ 339,3 cm³', '≈ 28,3 cm³'],
    correctAnswer: 0,
    explanation: 'r = 3 cm: V = 9π · 9 / 3 = 27π ≈ 84,8 cm³ ≈ 0,85 dl.'
  },
  {
    id: 'cav-q26',
    level: 3,
    questionTypeBadge: 'Anyagszükséglet',
    question: 'Hány dm² anyag kell 100 darab 9 cm magas, 6 cm átmérőjű kúp alakú papírpohárhoz (csak a palást), ha az átfedések miatt 5%-kal többel számolunk?',
    options: ['≈ 93,9 dm²', '≈ 89,4 dm²', '≈ 123,6 dm²', '≈ 9,4 dm²'],
    correctAnswer: 0,
    explanation: 'a = √(9 + 81) = √90 ≈ 9,49 cm, T_palást = 3π · 9,49 ≈ 89,4 cm². 100 db · 1,05 ≈ 9388 cm² ≈ 93,9 dm².'
  },
  {
    id: 'cav-q27',
    level: 3,
    questionTypeBadge: 'Rétegek a kúpban',
    figure: <LayeredConeQ />,
    question: 'Egy 16 cm magas, csúcsával lefelé álló kúp alakú csomagban legalul 8 cm magasan mazsola, felette 4 cm mandula, legfelül 4 cm földimogyoró van. A teljes térfogat hány százalékát tölti ki a mazsola?',
    options: ['12,5%', '50%', '25%', '29,7%'],
    correctAnswer: 0,
    explanation: 'A mazsola egy hasonló kis kúp, aránya λ = 8/16 = 1/2, térfogata λ³ = 1/8 = 12,5% (a mandula 29,7%, a földimogyoró 57,8%).'
  },
  {
    id: 'cav-q28',
    level: 3,
    questionTypeBadge: 'Gúla és kúp',
    question: 'Egy szabályos hatoldalú gúla alapéle 8 m, oldallapjai 40°-os szöget zárnak be az alaplappal. Mennyivel magasabb a gúlánál az a kúp, amelynek térfogata a gúláéval egyenlő, alaplapja pedig a gúla alaplapjába írt kör?',
    options: ['≈ 0,6 m-rel', '≈ 1,2 m-rel', '≈ 6,4 m-rel', 'Egyforma magasak'],
    correctAnswer: 0,
    explanation: 'ρ = 4√3 ≈ 6,93 m, M_gúla = ρ · tg 40° ≈ 5,81 m. A beírt kör területe kisebb a hatszögénél (150,8 < 166,3 m²), így h = M_gúla · 166,3 / 150,8 ≈ 6,41 m. A különbség ≈ 0,6 m.'
  },
  {
    id: 'cav-q29',
    level: 3,
    questionTypeBadge: 'Becslés',
    question: 'Egy nagyjából kúp alakú kráter-tó vízfelülete 2,4 km², legnagyobb mélysége 6 m. Körülbelül hány m³ víz van benne?',
    options: ['4,8 millió m³', '14,4 millió m³', '4800 m³', '0,8 millió m³'],
    correctAnswer: 0,
    explanation: '2,4 km² = 2 400 000 m². V ≈ 2 400 000 · 6 / 3 = 4 800 000 m³.'
  },
  {
    id: 'cav-q30',
    level: 3,
    questionTypeBadge: 'Félkör palást',
    figure: <SectorQ ang={180} radius="10 cm" angle="180°" />,
    question: 'Egy forgáskúp kiterített palástja 10 cm sugarú félkörlap. Mekkora a kúp felszíne?',
    options: ['75π ≈ 235,6 cm²', '50π ≈ 157,1 cm²', '150π ≈ 471,2 cm²', '100π ≈ 314,2 cm²'],
    correctAnswer: 0,
    explanation: 'a = 10 cm, és a félkör íve 10π = 2rπ ⇒ r = 5 cm. A = 25π + 5π · 10 = 75π ≈ 235,6 cm².'
  }
];

export const ConeAreaVolumeQuiz: React.FC<{
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
      topicId="g12-ter-forgaskup-felszin-terfogat-quiz"
      subtopicId="a-forgaskup-felszine-es-terfogata"
      title="13. A forgáskúp felszíne és térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: palást mint körcikk, felszín, térfogat, gyakorlati feladatok."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={CONE_AREA_VOLUME_QUESTIONS}
      cheatSheets={[
        {
          title: 'Képletek',
          items: ['T_palást = rπa', 'A = r²π + rπa = rπ(r + a)', 'V = r²π · M / 3', 'a² = r² + M²']
        },
        {
          title: 'A kiterített palást',
          items: [
            'Körcikk: sugara a, íve 2rπ',
            'Középponti szög: α = 360° · r / a',
            'Körcikk területe: i · r_cikk / 2',
            'Félkör palást ⇔ a = 2r'
          ]
        },
        {
          title: 'Összefüggések',
          items: [
            'V_kúp = V_henger / 3 (azonos alap és magasság)',
            'Arkhimédész: V_kúp : V_gömb : V_henger = 1 : 2 : 3',
            'Hasonló kúpok: térfogatarány λ³',
            'Mértékegység: 1 dm³ = 1 liter, 1 m³ = 1000 dm³'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ConeAreaVolumeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ConeAreaVolumeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ConeAreaVolumeQuiz;
