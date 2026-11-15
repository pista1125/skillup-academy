import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CoordGroupPracticeMatcher } from './CoordGroupPracticeMatcher';
import { CoordGroupPracticeSorter } from './CoordGroupPracticeSorter';
import { MidpointPlane, MidpointPlaneProps } from '../felezopont/MidpointFigures';

// ---- Kvízábrák ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

/** Rács és beosztás nélkül, hogy a keresett pont koordinátái ne legyenek leolvashatók. */
const Fig: React.FC<MidpointPlaneProps> = (props) => <MidpointPlane className={FIG} grid={0} labels={-1} {...props} />;

const OCT = Array.from({ length: 8 }, (_, k) => {
  const a = (k * Math.PI) / 4;
  return [1 + 3 * Math.cos(a) + 4 * Math.sin(a), 3 + 3 * Math.sin(a) - 4 * Math.cos(a)] as [number, number];
});

const COORD_GROUP_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapok – koordináták, hossz, műveletek (1–10)
  {
    id: 'cgp-q1',
    level: 1,
    questionTypeBadge: 'Bázisvektorok',
    question: 'Mik az →a = 6→i − 8→j vektor koordinátái?',
    options: ['(6; −8)', '(−8; 6)', '(6; 8)', '(−6; 8)'],
    correctAnswer: 0,
    explanation: 'Az →a = a₁→i + a₂→j vektor koordinátái (a₁; a₂), vagyis az →i és a →j együtthatói: (6; −8).'
  },
  {
    id: 'cgp-q2',
    level: 1,
    questionTypeBadge: 'Vektor hossza',
    figure: (
      <Fig
        x={[-1, 8]}
        y={[-9, 1]}
        unit={20}
        vecs={[{ from: [0, 0], to: [6, -8], color: BLUE, label: 'a', lx: 12, ly: 0 }]}
        segs={[
          { from: [0, 0], to: [6, 0], color: '#94a3b8', dashed: true, width: 1.2 },
          { from: [6, 0], to: [6, -8], color: '#94a3b8', dashed: true, width: 1.2 }
        ]}
        rightAngles={[{ at: [6, 0], p: [0, 0], q: [6, -8] }]}
        texts={[
          { at: [3, 0], text: '6', dy: -5, color: '#475569' },
          { at: [6, -4], text: '8', dx: 9, dy: 4, color: '#475569' }
        ]}
      />
    ),
    question: 'Milyen hosszú az →a(6; −8) vektor?',
    options: ['10', '14', '−2', '100'],
    correctAnswer: 0,
    explanation: '|→a| = √(6² + (−8)²) = √(36 + 64) = √100 = 10. A 14 a koordináták összege abszolút értékben, a 100 a hossz négyzete.'
  },
  {
    id: 'cgp-q3',
    level: 1,
    questionTypeBadge: 'Vektor hossza',
    question: 'Milyen hosszú a →b = 12→i + 5→j vektor?',
    options: ['13', '17', '7', '√119 ≈ 10,9'],
    correctAnswer: 0,
    explanation: '→b(12; 5), |→b| = √(144 + 25) = √169 = 13. A √119 a négyzetek különbségéből adódna.'
  },
  {
    id: 'cgp-q4',
    level: 1,
    questionTypeBadge: 'Elforgatás',
    question: 'Mi az →a(6; −8) vektor +90°-os (pozitív irányú) elforgatottja?',
    options: ['(8; 6)', '(−8; −6)', '(−6; 8)', '(8; −6)'],
    correctAnswer: 0,
    explanation: '(v₁; v₂) +90°-os elforgatottja (−v₂; v₁) = (8; 6). A (−8; −6) a −90°-os elforgatott, a (−6; 8) az ellentett vektor.'
  },
  {
    id: 'cgp-q5',
    level: 1,
    questionTypeBadge: 'Vektor koordinátái',
    figure: (
      <Fig
        x={[-5, 4]}
        y={[-4, 1]}
        unit={26}
        vecs={[{ from: [-4, -3], to: [3, -1], color: BLUE, lx: 0, ly: -8 }]}
        points={[
          { at: [-4, -3], label: 'A(−4; −3)', dx: 8, dy: 14 },
          { at: [3, -1], label: 'B(3; −1)', dx: -4, dy: 14 }
        ]}
      />
    ),
    question: 'A(−4; −3), B(3; −1). Mik az →AB vektor koordinátái?',
    options: ['(7; 2)', '(−7; −2)', '(−1; −4)', '(−0,5; −2)'],
    correctAnswer: 0,
    explanation: '→AB = B − A = (3 − (−4); −1 − (−3)) = (7; 2). A (−7; −2) a →BA, a (−1; −4) az összeg, a (−0,5; −2) a felezőpont.'
  },
  {
    id: 'cgp-q6',
    level: 1,
    questionTypeBadge: 'Távolság',
    question: 'Milyen hosszú az AB szakasz, ha A(−4; −3) és B(3; −1)?',
    options: ['√53 ≈ 7,28', '√17 ≈ 4,12', '53', '9'],
    correctAnswer: 0,
    explanation: '→AB = (7; 2), AB = √(49 + 4) = √53 ≈ 7,28. A √17 a koordináták összeadásából kapott (−1; −4) hossza, az 53 a távolság négyzete, a 9 = 7 + 2 pedig nem hossz.'
  },
  {
    id: 'cgp-q7',
    level: 1,
    questionTypeBadge: 'Középpont',
    figure: (
      <Fig
        x={[-6, 4]}
        y={[-5, 9]}
        unit={18}
        segs={[{ from: [-4, -3], to: [2, 7], color: AMBER, dashed: true, width: 1.6 }]}
        points={[
          { at: [-4, -3], label: 'A(−4; −3)', dx: 8, dy: 14 },
          { at: [-1, 2], label: 'K(−1; 2)', dx: 28, dy: 4, color: RED },
          { at: [2, 7], label: 'C = ?', dx: -22, dy: 0, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Az ABCD paralelogramma A csúcsa A(−4; −3), középpontja K(−1; 2). Mik a C csúcs koordinátái?',
    options: ['C(2; 7)', 'C(−2,5; −0,5)', 'C(3; 5)', 'C(−7; −8)'],
    correctAnswer: 0,
    explanation: 'A paralelogramma átlói felezik egymást, K az AC felezőpontja: C = 2K − A = (−2 + 4; 4 + 3) = (2; 7). A (−2,5; −0,5) az AK felezőpontja, a (3; 5) a →AK vektor.'
  },
  {
    id: 'cgp-q8',
    level: 1,
    questionTypeBadge: 'Összeg',
    question: '→a(6; −8), →b(12; 5). Mik az →a + →b koordinátái?',
    options: ['(18; −3)', '(−6; −13)', '(6; 13)', '(18; 3)'],
    correctAnswer: 0,
    explanation: 'Koordinátánként adunk össze: (6 + 12; −8 + 5) = (18; −3). A (−6; −13) az →a − →b.'
  },
  {
    id: 'cgp-q9',
    level: 1,
    questionTypeBadge: 'Különbség',
    question: '→a(6; −8), →b(12; 5). Mik az →a − →b koordinátái?',
    options: ['(−6; −13)', '(6; 13)', '(18; −3)', '(−6; −3)'],
    correctAnswer: 0,
    explanation: '(6 − 12; −8 − 5) = (−6; −13). A (6; 13) a →b − →a, a (−6; −3) előjelhibás.'
  },
  {
    id: 'cgp-q10',
    level: 1,
    questionTypeBadge: 'Számszoros',
    question: 'Mik a 2 · →v koordinátái, ha →v(−3; 4)?',
    options: ['(−6; 8)', '(−1; 6)', '(−6; 4)', '(6; −8)'],
    correctAnswer: 0,
    explanation: 'Számszorosnál mindkét koordinátát szorozzuk: 2 · (−3; 4) = (−6; 8). A (−1; 6) a 2 hozzáadása, a (−6; 4) csak az első koordináta szorzása.'
  },

  // LEVEL 2: A feladatsorozatok számításai (11–20)
  {
    id: 'cgp-q11',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <Fig
        x={[-7, 5]}
        y={[-5, 9]}
        unit={18}
        polys={[{ pts: [[-4, -3], [3, -1], [2, 7]], stroke: '#94a3b8', dashed: true }]}
        points={[
          { at: [-4, -3], label: 'A', dx: -8, dy: 10 },
          { at: [3, -1], label: 'B(3; −1)', dx: 6, dy: 14 },
          { at: [2, 7], label: 'C', dx: 9, dy: 0 },
          { at: [-1, 2], label: 'K(−1; 2)', dx: 26, dy: 4, color: RED },
          { at: [-5, 5], label: 'D = ?', dx: 2, dy: -9, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Az ABCD paralelogramma B csúcsa B(3; −1), középpontja K(−1; 2). Mik a D csúcs koordinátái?',
    options: ['D(−5; 5)', 'D(1; 0,5)', 'D(2; 7)', 'D(7; −4)'],
    correctAnswer: 0,
    explanation: 'K a BD átló felezőpontja: D = 2K − B = (−2 − 3; 4 + 1) = (−5; 5). Az (1; 0,5) a BK felezőpontja, a (7; −4) a K tükörképe B-re.'
  },
  {
    id: 'cgp-q12',
    level: 2,
    questionTypeBadge: 'Távolság',
    question: 'A(−4; −3), D(−5; 5). Milyen hosszú az AD oldal?',
    options: ['√65 ≈ 8,06', '√53 ≈ 7,28', '9', '√17 ≈ 4,12'],
    correctAnswer: 0,
    explanation: '→AD = (−1; 8), AD = √(1 + 64) = √65 ≈ 8,06. A √53 az AB oldal hossza ugyanebben a paralelogrammában.'
  },
  {
    id: 'cgp-q13',
    level: 2,
    questionTypeBadge: 'Átlóvektor',
    question: 'B(3; −1), D(−5; 5). Mik a →BD átlóvektor koordinátái?',
    options: ['(−8; 6)', '(8; −6)', '(6; 10)', '(−2; 4)'],
    correctAnswer: 0,
    explanation: '→BD = D − B = (−5 − 3; 5 − (−1)) = (−8; 6). A (8; −6) a →DB, a (6; 10) a másik átlóvektor (→AC), a (−2; 4) a végpontok összege.'
  },
  {
    id: 'cgp-q14',
    level: 2,
    questionTypeBadge: 'Végpontok távolsága',
    figure: (
      <Fig
        x={[-1, 13]}
        y={[-9, 6]}
        unit={16}
        segs={[{ from: [6, -8], to: [12, 5], color: RED, dashed: true, width: 1.8 }]}
        vecs={[
          { from: [0, 0], to: [6, -8], color: BLUE, label: 'a', lx: -12, ly: 4 },
          { from: [0, 0], to: [12, 5], color: GREEN, label: 'b', lx: -2, ly: -8 }
        ]}
        texts={[{ at: [9, -1.5], text: '?', color: RED, size: 13, bold: true, dx: 10 }]}
      />
    ),
    question: '→a(6; −8) és →b(12; 5) közös kezdőpontból indul. Milyen hosszú a végpontjaikat összekötő szakasz?',
    options: ['√205 ≈ 14,32', '23', '3', '√269 ≈ 16,40'],
    correctAnswer: 0,
    explanation: 'A szakasz az →a − →b = (−6; −13) vektor hossza: √(36 + 169) = √205 ≈ 14,32. A 23 = 10 + 13 és a 3 = 13 − 10 csak párhuzamos vektoroknál lenne helyes.'
  },
  {
    id: 'cgp-q15',
    level: 2,
    questionTypeBadge: 'Négyzet területe',
    figure: (
      <Fig
        x={[-4, 2]}
        y={[-1, 7]}
        unit={24}
        polys={[{ pts: [[-3, 1], [1, 2], [0, 6], [-4, 5]], stroke: '#94a3b8', dashed: true }]}
        segs={[{ from: [-3, 1], to: [0, 6], color: PURPLE, width: 2 }]}
        points={[
          { at: [-3, 1], label: 'A(−3; 1)', dx: 6, dy: 14 },
          { at: [0, 6], label: 'C(0; 6)', dx: 8, dy: -8 }
        ]}
      />
    ),
    question: 'Az ABCD négyzet két szemközti csúcsa A(−3; 1) és C(0; 6). Mekkora a négyzet területe?',
    options: ['17', '34', '√34 ≈ 5,83', '8,5'],
    correctAnswer: 0,
    explanation: '→AC = (3; 5), AC² = 9 + 25 = 34. A négyzet területe az átló négyzetének fele: T = 34/2 = 17. A 34 az átló négyzete, nem a terület.'
  },
  {
    id: 'cgp-q16',
    level: 2,
    questionTypeBadge: 'Négyzet kerülete',
    question: 'Egy négyzet átlója √34 hosszú (A(−3; 1), C(0; 6)). Mekkora a kerülete?',
    options: ['4√17 ≈ 16,49', '4√34 ≈ 23,32', '17', '2√34 ≈ 11,66'],
    correctAnswer: 0,
    explanation: 'Az oldal a = átló/√2 = √34/√2 = √17, így K = 4√17 ≈ 16,49. A 4√34 az átlót venné oldalnak.'
  },
  {
    id: 'cgp-q17',
    level: 2,
    questionTypeBadge: 'Négyzet csúcsa',
    figure: (
      <Fig
        x={[-8, 1]}
        y={[-7, 2]}
        unit={22}
        segs={[{ from: [-3, -5.5], to: [-5, 0.5], color: AMBER, dashed: true, width: 1.6 }]}
        points={[
          { at: [-3, -5.5], label: 'A(−3; −5,5)', dx: 2, dy: 14 },
          { at: [-4, -2.5], label: 'K(−4; −2,5)', dx: -36, dy: 4, color: RED },
          { at: [-5, 0.5], label: 'C = ?', dx: 22, dy: 0, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Az ABCD négyzet középpontja K(−4; −2,5), egyik csúcsa A(−3; −5,5). Mik a C csúcs koordinátái?',
    options: ['C(−5; 0,5)', 'C(−3,5; −4)', 'C(−2; −8,5)', 'C(1; −3)'],
    correctAnswer: 0,
    explanation: 'C = 2K − A = (−8 + 3; −5 + 5,5) = (−5; 0,5). A (−2; −8,5) a K tükörképe A-ra, az (1; −3) a →KA vektor.'
  },
  {
    id: 'cgp-q18',
    level: 2,
    questionTypeBadge: 'Négyzet területe',
    question: 'K(−4; −2,5) a négyzet középpontja, A(−3; −5,5) egy csúcsa. Mekkora a négyzet területe?',
    options: ['20', '10', '40', '√20 ≈ 4,47'],
    correctAnswer: 0,
    explanation: '→KA = (1; −3), |→KA| = √10, az átló 2√10, T = (2√10)²/2 = 40/2 = 20. A 10 a |→KA|², a 40 az átló négyzete.'
  },
  {
    id: 'cgp-q19',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <Fig
        x={[-8, 7]}
        y={[-17, 9]}
        unit={10}
        polys={[{ pts: [[5, -12], [-6, 8], [-7, 4]], stroke: '#94a3b8', dashed: true }]}
        points={[
          { at: [5, -12], label: 'A(5; −12)', dx: -8, dy: 14 },
          { at: [-6, 8], label: 'B(−6; 8)', dx: 26, dy: -2 },
          { at: [-1, -4], label: 'K(−1; −4)', dx: -28, dy: 4, color: RED },
          { at: [4, -16], label: 'D = ?', dx: -22, dy: 4, color: GREEN, hollow: true }
        ]}
      />
    ),
    question: 'Egy ABCD paralelogramma két szomszédos csúcsa A(5; −12), B(−6; 8), szimmetria-középpontja K(−1; −4). Mik a D csúcs koordinátái?',
    options: ['D(4; −16)', 'D(−7; 4)', 'D(−3,5; 2)', 'D(−11; 20)'],
    correctAnswer: 0,
    explanation: 'D = 2K − B = (−2 + 6; −8 − 8) = (4; −16). A (−7; 4) a C csúcs (C = 2K − A), a (−11; 20) a K tükörképe B-re.'
  },
  {
    id: 'cgp-q20',
    level: 2,
    questionTypeBadge: 'Négyzet csúcsai',
    figure: (
      <Fig
        x={[-13, 13]}
        y={[-13, 13]}
        unit={8}
        vecs={[{ from: [0, 0], to: [5, -12], color: BLUE }]}
        points={[{ at: [5, -12], label: 'A(5; −12)', dx: 26, dy: 4 }]}
      />
    ),
    question: 'Egy négyzet középpontja az origó, egyik csúcsa A(5; −12). Melyik pont a négyzet egy másik csúcsa?',
    options: ['(12; 5)', '(5; 12)', '(−5; −12)', '(12; −5)'],
    correctAnswer: 0,
    explanation: 'A szomszédos csúcsok helyvektorai a (5; −12) ±90°-os elforgatottjai: (12; 5) és (−12; −5); a szemközti csúcs (−5; 12). Az (5; 12) és a (−5; −12) tükörképek, nem csúcsok.'
  },

  // LEVEL 3: Esetszétválasztás, |u ± v|, oldalfelező pontok, Ráadás (21–30)
  {
    id: 'cgp-q21',
    level: 3,
    questionTypeBadge: 'Esetszám',
    figure: (
      <Fig
        x={[-5, 5]}
        y={[-12, 6]}
        unit={11}
        points={[
          { at: [3, -10], label: 'A(3; −10)', dx: -6, dy: 14 },
          { at: [-3, -6], label: 'B(−3; −6)', dx: 4, dy: 14 },
          { at: [1, 4], label: 'C(1; 4)', dx: 24, dy: 2 }
        ]}
      />
    ),
    question: 'Egy paralelogramma három csúcsa A(3; −10), B(−3; −6) és C(1; 4) (a betűzés sorrendje nincs megadva). Hány helyen lehet a negyedik csúcs?',
    options: ['3', '1', '2', '4'],
    correctAnswer: 0,
    explanation: 'A negyedik csúcs bármelyik adott csúccsal szemközti lehet: D₁ = A + C − B, D₂ = A + B − C, D₃ = B + C − A – három különböző pont.'
  },
  {
    id: 'cgp-q22',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    question: 'A(3; −10), B(−3; −6), C(1; 4). Mik a D csúcs koordinátái, ha a paralelogramma betűzése ABCD?',
    options: ['D(7; 0)', 'D(−1; −20)', 'D(−5; 8)', 'D(2; −3)'],
    correctAnswer: 0,
    explanation: 'ABCD-ben B és D szemközti: D = A + C − B = (3 + 1 + 3; −10 + 4 + 6) = (7; 0). A (−1; −20) és a (−5; 8) a másik két esethez tartozik, a (2; −3) a középpont.'
  },
  {
    id: 'cgp-q23',
    level: 3,
    questionTypeBadge: 'Átlók',
    question: 'Milyen hosszúak az A(3; −10), B(−3; −6), C(1; 4), D(7; 0) csúcsú ABCD paralelogramma átlói?',
    options: ['AC ≈ 14,14 és BD ≈ 11,66', 'AC ≈ 7,21 és BD ≈ 24,08', 'AC ≈ 10,77 és BD ≈ 19,70', 'AC ≈ 14,14 és BD ≈ 10,77'],
    correctAnswer: 0,
    explanation: '→AC = (−2; 14) ⇒ √200 ≈ 14,14; →BD = (10; 6) ⇒ √136 ≈ 11,66. A többi számpár a másik két paralelogramma átlóihoz tartozik.'
  },
  {
    id: 'cgp-q24',
    level: 3,
    questionTypeBadge: '|u + v|',
    figure: (
      <Fig
        x={[-1, 5]}
        y={[-1, 5]}
        unit={30}
        vecs={[
          { from: [0, 0], to: [3, 0], color: BLUE, label: 'u', lx: 0, ly: 16 },
          { from: [3, 0], to: [3, 4], color: GREEN, label: 'v', lx: 12, ly: 4 },
          { from: [0, 0], to: [3, 4], color: PURPLE, width: 1.8 }
        ]}
        texts={[
          { at: [1.5, 2], text: '5', dx: -10, color: PURPLE, size: 12, bold: true },
          { at: [3, 0], text: '?', dx: -12, dy: -6, color: RED, size: 12, bold: true }
        ]}
      />
    ),
    question: '|→u| = 3, |→v| = 4 és |→u + →v| = 5. Milyen a két vektor helyzete egymáshoz képest?',
    options: ['Merőlegesek egymásra', 'Egyirányúak', 'Ellentétes irányúak', '60°-os szöget zárnak be'],
    correctAnswer: 0,
    explanation: '3² + 4² = 5², így a vektorokból összefűzéssel kapott háromszög derékszögű (Pitagorasz-tétel megfordítása): →u ⊥ →v. Egyirányúaknál 7, ellentéteseknél 1 lenne az összeg hossza.'
  },
  {
    id: 'cgp-q25',
    level: 3,
    questionTypeBadge: '|u − v|',
    question: '|→u| = 3, |→v| = 4. Melyik vektorpárra igaz, hogy |→u − →v| = 7?',
    options: ['→u(3; 0), →v(−4; 0)', '→u(3; 0), →v(4; 0)', '→u(3; 0), →v(0; 4)', '→u(3; 0), →v(0; −4)'],
    correctAnswer: 0,
    explanation: '|→u − →v| = 7 = 3 + 4 csak ellentétes irányú vektoroknál lehet: (3; 0) − (−4; 0) = (7; 0). Egyirányúaknál 1, merőlegeseknél 5 lenne.'
  },
  {
    id: 'cgp-q26',
    level: 3,
    questionTypeBadge: '|u − v|',
    question: '|→u| = 3, |→v| = 4. Melyik vektorpárra igaz, hogy |→u − →v| = 1?',
    options: ['→u(3; 0), →v(4; 0)', '→u(3; 0), →v(−4; 0)', '→u(3; 0), →v(0; 4)', '→u(3; 0), →v(0; −4)'],
    correctAnswer: 0,
    explanation: '|→u − →v| = 1 = 4 − 3 akkor teljesül, ha a vektorok egyirányúak: (3; 0) − (4; 0) = (−1; 0), hossza 1. (Ekkor |→u + →v| = 7.)'
  },
  {
    id: 'cgp-q27',
    level: 3,
    questionTypeBadge: 'Oldalfelező pontok',
    figure: (
      <Fig
        x={[-5, 7]}
        y={[-1, 9]}
        unit={22}
        polys={[
          { pts: [[0, 0], [6, 0], [1, 8], [-4, 4]], fill: 'rgba(37,99,235,0.06)', stroke: BLUE },
          { pts: [[3, 0], [3.5, 4], [-1.5, 6], [-2, 2]], stroke: RED, dashed: true }
        ]}
        points={[
          { at: [0, 0], label: 'A(0; 0)', dx: -12, dy: 13 },
          { at: [6, 0], label: 'B(6; 0)', dx: 0, dy: 13 },
          { at: [1, 8], label: 'C(1; 8)', dx: 22, dy: 0 },
          { at: [-4, 4], label: 'D(−4; 4)', dx: -4, dy: -8 },
          { at: [3, 0], label: 'E', dx: 0, dy: 13, color: RED },
          { at: [-2, 2], label: 'H', dx: -9, dy: 2, color: RED }
        ]}
      />
    ),
    question: 'Az ABCD négyszög csúcsai A(0; 0), B(6; 0), C(1; 8), D(−4; 4). E az AB, H a DA oldal felezőpontja. Mik a →HE vektor koordinátái?',
    options: ['(5; −2)', '(−5; 2)', '(3; 0)', '(5; 2)'],
    correctAnswer: 0,
    explanation: 'E(3; 0), H(−2; 2), →HE = E − H = (5; −2). Ez éppen ½ →DB = ½(10; −4). A (−5; 2) a →EH.'
  },
  {
    id: 'cgp-q28',
    level: 3,
    questionTypeBadge: 'Oldalfelező pontok',
    question: 'Egy tetszőleges ABCD négyszög oldalfelező pontjai E, F, G, H. Milyen négyszög EFGH, és miért?',
    options: [
      'Paralelogramma, mert →HE = →GF (mindkettő ½ →DB)',
      'Mindig négyzet, mert az oldalai egyenlők',
      'Mindig téglalap, mert az átlói egyenlők',
      'Trapéz, de nem paralelogramma'
    ],
    correctAnswer: 0,
    explanation: 'HE az ABD, GF a CBD háromszög középvonala, így mindkettő párhuzamos BD-vel és fele olyan hosszú: →HE = →GF = ½ →DB. Két szemközti oldal párhuzamos és egyenlő ⇒ paralelogramma.'
  },
  {
    id: 'cgp-q29',
    level: 3,
    questionTypeBadge: 'Ráadás',
    figure: (
      <Fig
        x={[-5, 7]}
        y={[-3, 9]}
        unit={18}
        polys={[{ pts: OCT, fill: 'rgba(100,116,139,0.08)', stroke: '#475569' }]}
        vecs={[{ from: [1, 3], to: [4, -1], color: BLUE, width: 1.8 }]}
        points={[
          { at: [1, 3], label: 'O(1; 3)', dx: -10, dy: -8 },
          { at: [4, -1], label: 'A(4; −1)', dx: 26, dy: 6 },
          { at: OCT[1], label: 'B', dx: 10, dy: 4 },
          { at: OCT[2], label: 'C = ?', dx: 6, dy: -8, color: RED, hollow: true }
        ]}
      />
    ),
    question: 'Egy szabályos nyolcszög középpontja O(1; 3), egyik csúcsa A(4; −1); a csúcsokat pozitív körüljárás szerint betűzzük. Mik a C csúcs koordinátái?',
    options: ['C(5; 6)', 'C(−3; 0)', 'C(4; 7)', 'C(−2; 7)'],
    correctAnswer: 0,
    explanation: 'C két csúccsal arrébb van, ami 2 · 45° = 90°-os elforgatás O körül. →OA = (3; −4), +90°-kal (4; 3), így C = O + (4; 3) = (5; 6). A (−3; 0) a −90°-os elforgatással kapott csúcs.'
  },
  {
    id: 'cgp-q30',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'A nyolcszögben A(4; −1), C(5; 6), O(1; 3), és F az AC felezőpontja. Milyen hosszú az OF szakasz?',
    options: ['√12,5 ≈ 3,54', '2,5', '5', '3,5√2 ≈ 4,95'],
    correctAnswer: 0,
    explanation: 'F(4,5; 2,5), →OF = (3,5; −0,5), |→OF| = √(12,25 + 0,25) = √12,5 ≈ 3,54. Az 5 az OA = OB sugár; a B csúcsot az →OF irányában 5 egységre kapjuk.'
  }
];

export const CoordGroupPracticeQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId="g11-geo-csoportmunka-quiz"
      subtopicId="gyakorlas-csoportban"
      title="8. Gyakorlás csoportban – Kvíz"
      subtitle="30 vegyes tesztkérdés 3 nehézségi szinten: vektorok koordinátái és hossza, elforgatás, paralelogramma és négyzet csúcsai, |→u ± →v|, oldalfelező pontok."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={COORD_GROUP_QUESTIONS}
      cheatSheets={[
        {
          title: 'Vektorok koordinátákkal',
          items: [
            '→a = a₁→i + a₂→j ⇔ →a(a₁; a₂)',
            '→AB = B − A (végpont − kezdőpont)',
            '|→v| = √(v₁² + v₂²)',
            '+90°: (−v₂; v₁), −90°: (v₂; −v₁)'
          ]
        },
        {
          title: 'Paralelogramma, négyzet',
          items: [
            'Az átlók felezik egymást: C = 2K − A, D = 2K − B',
            'Három csúcsból: D = A + C − B (három eset!)',
            'Négyzet: →KB = →KA ±90°-os elforgatottja',
            'Négyzet területe: átló²/2'
          ]
        },
        {
          title: '|→u ± →v| (|→u| = 3, |→v| = 4)',
          items: [
            'Merőlegesek: |→u + →v| = |→u − →v| = 5',
            'Egyirányúak: |→u + →v| = 7, |→u − →v| = 1',
            'Ellentétesek: |→u + →v| = 1, |→u − →v| = 7',
            'Oldalfelező pontok négyszöge: paralelogramma'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CoordGroupPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CoordGroupPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CoordGroupPracticeQuiz;
