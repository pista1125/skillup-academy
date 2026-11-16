import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ConeMatcher } from './ConeMatcher';
import { ConeSorter } from './ConeSorter';
import { QFig, Txt, Seg, Poly, RightMark, AngleArc, RoundQ, roundSolid, RoundBody, SK, P2 } from '../a-gula/SolidSketch';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Derékszögű háromszög (tengely menti befogó függőleges) a forgatás jelölésével. */
const RotTriQ: React.FC<{ axis: string; other: string; hyp?: string; phiHalf?: string }> = ({ axis, other, hyp, phiHalf }) => {
  const T: P2 = [100, 22];
  const B: P2 = [100, 132];
  const R: P2 = [170, 132];
  return (
    <QFig>
      <Seg a={[100, 12]} b={[100, 148]} color={SK.aux} dash w={1.1} />
      <Poly p={[T, B, R]} fill="rgba(245,158,11,0.18)" color={SK.arc} />
      <RightMark v={B} p1={T} p2={R} r={9} />
      <path d="M 70 140 A 30 7 0 1 0 128 140" fill="none" stroke={SK.arc} strokeWidth="1.4" />
      <Txt p={[94, 78]} t={axis} anchor="end" size={10.5} color={SK.red} />
      <Txt p={[135, 144]} t={other} size={10.5} />
      {hyp && <Txt p={[142, 72]} t={hyp} anchor="start" size={10.5} color={SK.green} />}
      {phiHalf !== undefined && <AngleArc v={T} p1={B} p2={R} t={phiHalf} r={16} tr={28} />}
      <Txt p={[215, 30]} t="tengely" size={9} color={SK.aux} anchor="end" />
    </QFig>
  );
};

/** Egyenlő szárú háromszög (tengelymetszet). */
const SectionQ: React.FC<{ base?: string; leg?: string; phi?: string; M?: string; baseAngle?: string; tall?: number }> = ({
  base,
  leg,
  phi,
  M,
  baseAngle,
  tall = 1.5
}) => {
  const halfW = Math.min(70, 112 / tall);
  const h = halfW * tall;
  const F: P2 = [120, 138];
  const T: P2 = [120, 138 - h];
  const L: P2 = [120 - halfW, 138];
  const R: P2 = [120 + halfW, 138];
  return (
    <QFig>
      <Poly p={[L, R, T]} fill="rgba(99,102,241,0.12)" />
      {M !== undefined && (
        <>
          <Seg a={T} b={F} color={SK.red} dash w={1.4} />
          <RightMark v={F} p1={T} p2={R} r={8} />
          <Txt p={[F[0] - 5, (T[1] + F[1]) / 2 + 8]} t={M} anchor="end" color={SK.red} size={10.5} />
        </>
      )}
      {base && <Txt p={[120, 150]} t={base} size={10.5} />}
      {leg && <Txt p={[(T[0] + R[0]) / 2 + 8, (T[1] + R[1]) / 2 - 2]} t={leg} anchor="start" size={10.5} color={SK.green} />}
      {phi !== undefined && <AngleArc v={T} p1={L} p2={R} t={phi} r={15} tr={27} />}
      {baseAngle !== undefined && <AngleArc v={R} p1={L} p2={T} t={baseAngle} r={14} tr={26} />}
    </QFig>
  );
};

/** Kettős kúp (rombusz forgatása). */
const DoubleConeQ: React.FC = () => {
  const g = roundSolid(1, 0, 1.07, { x: 70, y: 10, w: 100, h: 72 });
  const T2: P2 = [g.B[0], g.B[1] + (g.B[1] - g.T[1])];
  return (
    <QFig>
      <RoundBody g={g} />
      <path d={`M ${g.BL[0]} ${g.BL[1]} A ${g.rxB} ${g.ryB} 0 0 0 ${g.BR[0]} ${g.BR[1]} L ${T2[0]} ${T2[1]} Z`} fill="rgba(99,102,241,0.10)" stroke="none" />
      <Seg a={g.BL} b={T2} />
      <Seg a={g.BR} b={T2} />
      <AngleArc v={g.T} p1={g.BL} p2={g.BR} t="50°" r={13} tr={24} />
      <Txt p={[(g.T[0] + g.BR[0]) / 2 + 8, (g.T[1] + g.BR[1]) / 2]} t="?" anchor="start" />
      <Txt p={[205, 140]} t="T = 1964 cm²" size={9.5} anchor="end" color={SK.aux} />
    </QFig>
  );
};

/** Kúpszelet: forgáskúp tengelymetszete és egy metsző sík nyoma. */
const ConicQ: React.FC<{ line: [P2, P2] }> = ({ line }) => (
  <QFig>
    <Poly p={[[70, 140], [170, 140], [120, 18]]} fill="rgba(99,102,241,0.10)" />
    <Seg a={line[0]} b={line[1]} color={SK.red} w={2.4} />
    <Txt p={[205, 30]} t="metszet = ?" size={10} anchor="end" />
  </QFig>
);

export const CONE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cone-q1',
    level: 1,
    questionTypeBadge: 'Forgáskúp keletkezése',
    question: 'Milyen síkidomot kell megforgatnunk a szimmetriatengelye körül, hogy forgáskúpot kapjunk?',
    options: ['Egyenlő szárú háromszöget', 'Téglalapot', 'Félkört', 'Szimmetrikus trapézt'],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú háromszög szimmetriatengelye körüli forgatásával forgáskúp (egyenes körkúp) keletkezik. A téglalapból henger, a félkörből gömb, a szimmetrikus trapézból csonkakúp lesz.'
  },
  {
    id: 'cone-q2',
    level: 1,
    questionTypeBadge: 'Alkotó',
    question: 'Mit nevezünk a forgáskúp alkotójának?',
    options: [
      'A kúp csúcsát az alapkör egy pontjával összekötő szakaszt',
      'A csúcsot az alapkör középpontjával összekötő szakaszt',
      'Az alapkör átmérőjét',
      'Az alapkör sugarát'
    ],
    correctAnswer: 0,
    explanation: 'Az alkotók a csúcsot az alapkör pontjaival összekötő szakaszok; a forgáskúp minden alkotója egyenlő hosszú. A csúcs és az alapkör középpontja közti szakasz a magasság.'
  },
  {
    id: 'cone-q3',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Milyen alakú a forgáskúp tengelymetszete?',
    options: ['Egyenlő szárú háromszög', 'Kör', 'Derékszögű háromszög', 'Szimmetrikus trapéz'],
    correctAnswer: 0,
    explanation: 'A tengelymetszet éppen a megforgatott egyenlő szárú háromszög: alapja az alapkör átmérője, szárai az alkotók.'
  },
  {
    id: 'cone-q4',
    level: 1,
    questionTypeBadge: 'Alkotó számítása',
    figure: <RoundQ R={6} M={8} l={{ R: 'r = 6', M: 'M = 8', a: 'a = ?' }} />,
    question: 'Egy forgáskúp alapkörének sugara 6 cm, magassága 8 cm. Milyen hosszú az alkotója?',
    options: ['10 cm', '14 cm', '√28 ≈ 5,3 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'a = √(r² + M²) = √(36 + 64) = √100 = 10 cm.'
  },
  {
    id: 'cone-q5',
    level: 1,
    questionTypeBadge: 'Magasság',
    figure: <RoundQ R={5} M={12} l={{ R: 'r = 5', M: 'M = ?', a: 'a = 13' }} />,
    question: 'Egy forgáskúp alkotója 13 cm, alapkörének sugara 5 cm. Milyen magas a kúp?',
    options: ['12 cm', '8 cm', '√194 ≈ 13,9 cm', '18 cm'],
    correctAnswer: 0,
    explanation: 'M = √(a² − r²) = √(169 − 25) = √144 = 12 cm.'
  },
  {
    id: 'cone-q6',
    level: 1,
    questionTypeBadge: 'Sugár',
    figure: <RoundQ R={8} M={15} l={{ R: 'r = ?', M: 'M = 15', a: 'a = 17' }} />,
    question: 'Egy forgáskúp alkotója 17 cm, magassága 15 cm. Mekkora az alapkör sugara?',
    options: ['8 cm', '2 cm', '16 cm', '√514 ≈ 22,7 cm'],
    correctAnswer: 0,
    explanation: 'r = √(a² − M²) = √(289 − 225) = √64 = 8 cm.'
  },
  {
    id: 'cone-q7',
    level: 1,
    questionTypeBadge: 'Nyílásszög',
    question: 'Mit nevezünk a forgáskúp nyílásszögének?',
    options: [
      'A tengelymetszet (a megforgatott egyenlő szárú háromszög) szárszögét',
      'Az alkotó és az alaplap szögét',
      'Az alkotó és a magasság szögét',
      'A kiterített palást középponti szögét'
    ],
    correctAnswer: 0,
    explanation: 'A nyílásszög (φ) a megforgatott egyenlő szárú háromszög szárszöge. Az alkotó és a magasság szöge ennek csak a fele.'
  },
  {
    id: 'cone-q8',
    level: 1,
    questionTypeBadge: 'Befogó körüli forgatás',
    figure: <RotTriQ axis="4 cm" other="3 cm" hyp="?" />,
    question: 'Egy 3 cm és 4 cm befogójú derékszögű háromszöget a 4 cm-es befogója körül megforgatunk. Milyen hosszú a keletkező kúp alkotója?',
    options: ['5 cm', '7 cm', '4 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'A kúp alkotója a háromszög átfogója: √(3² + 4²) = 5 cm. (A sugár 3 cm, a magasság 4 cm.)'
  },
  {
    id: 'cone-q9',
    level: 1,
    questionTypeBadge: 'Alapkör területe',
    figure: <RoundQ R={5} M={7} l={{ R: 'r = 5 cm' }} />,
    question: 'Mekkora annak a forgáskúpnak az alapterülete, amelynek alapkörsugara 5 cm?',
    options: ['25π ≈ 78,5 cm²', '10π ≈ 31,4 cm²', '5π ≈ 15,7 cm²', '100π ≈ 314,2 cm²'],
    correctAnswer: 0,
    explanation: 'T = r²π = 25π ≈ 78,5 cm². (10π a kerület.)'
  },
  {
    id: 'cone-q10',
    level: 1,
    questionTypeBadge: 'Egyenlő oldalú kúp',
    question: 'Mekkora annak a forgáskúpnak a nyílásszöge, amelynek tengelymetszete szabályos háromszög?',
    options: ['60°', '30°', '90°', '120°'],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög minden szöge 60°, így a szárszög, azaz a nyílásszög is 60°.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'cone-q11',
    level: 2,
    questionTypeBadge: 'Triangulum',
    figure: <SectionQ base="20 cm" leg="20 cm" M="M = ?" tall={1.73} />,
    question: 'Egy 20 cm oldalú szabályos háromszög alakú triangulumot a felfüggesztése (egy csúcsa és a szemközti oldal felezőpontja) körül megforgatunk. Milyen magas a keletkező kúp?',
    options: ['10√3 ≈ 17,3 cm', '20 cm', '10 cm', '10√2 ≈ 14,1 cm'],
    correctAnswer: 0,
    explanation: 'r = 10 cm, a = 20 cm ⇒ M = √(400 − 100) = √300 = 10√3 ≈ 17,3 cm.'
  },
  {
    id: 'cone-q12',
    level: 2,
    questionTypeBadge: 'Alapkör kerülete',
    question: 'A 20 cm oldalú triangulum megforgatásával kapott kúp alapkörének mekkora a kerülete?',
    options: ['20π ≈ 62,8 cm', '40π ≈ 125,7 cm', '10π ≈ 31,4 cm', '100π ≈ 314,2 cm'],
    correctAnswer: 0,
    explanation: 'Az alapkör átmérője a háromszög oldala (20 cm), így r = 10 cm, K = 2rπ = 20π ≈ 62,8 cm.'
  },
  {
    id: 'cone-q13',
    level: 2,
    questionTypeBadge: 'Nyílásszög',
    figure: <SectionQ base="2r = 2 cm" leg="24 mm" phi="?" tall={2.2} />,
    question: 'Egy egyenes körkúp alkotója 24 mm, alapkörének átmérője 2 cm. Mekkora a nyílásszöge?',
    options: ['≈ 49,2°', '≈ 24,6°', '≈ 99,2°', '≈ 45,2°'],
    correctAnswer: 0,
    explanation: 'r = 10 mm. sin(φ/2) = 10 / 24 ⇒ φ/2 ≈ 24,6° ⇒ φ ≈ 49,2°. (24,6° csak a fele; 99,2° akkor jön ki, ha r = 20 mm-rel számolunk.)'
  },
  {
    id: 'cone-q14',
    level: 2,
    questionTypeBadge: 'Nyílásszög',
    figure: <RoundQ R={5} M={12} l={{ R: 'r = 5', M: 'M = 12', phi: '?' }} />,
    question: 'Egy forgáskúp alapkörének sugara 5 cm, magassága 12 cm. Mekkora a nyílásszöge?',
    options: ['≈ 45,2°', '≈ 22,6°', '≈ 134,8°', '≈ 67,4°'],
    correctAnswer: 0,
    explanation: 'tg(φ/2) = r / M = 5 / 12 ⇒ φ/2 ≈ 22,6° ⇒ φ ≈ 45,2°.'
  },
  {
    id: 'cone-q15',
    level: 2,
    questionTypeBadge: 'Alkotó hajlásszöge',
    figure: <RoundQ R={5} M={12} l={{ R: 'r = 5', M: 'M = 12', base: '?' }} />,
    question: 'Mekkora szöget zárnak be az előző kúp (r = 5 cm, M = 12 cm) alkotói az alaplap síkjával?',
    options: ['≈ 67,4°', '≈ 22,6°', '≈ 45,2°', '≈ 65,0°'],
    correctAnswer: 0,
    explanation: 'tg α = M / r = 12 / 5 ⇒ α ≈ 67,4°. Ellenőrzés: 90° − φ/2 = 90° − 22,6° = 67,4°.'
  },
  {
    id: 'cone-q16',
    level: 2,
    questionTypeBadge: 'Befogó körüli forgatás',
    figure: <RotTriQ axis="45 cm" other="24 cm" hyp="51 cm" phiHalf="φ/2" />,
    question: 'Egy derékszögű háromszög átfogója 51 cm, egyik befogója 24 cm. A hosszabbik befogója körül megforgatjuk. Mekkora a kapott kúp nyílásszöge?',
    options: ['≈ 56,1°', '≈ 28,1°', '≈ 123,9°', '≈ 61,9°'],
    correctAnswer: 0,
    explanation: 'A másik befogó √(51² − 24²) = 45 cm (ez a hosszabbik, a tengely). r = 24, M = 45: tg(φ/2) = 24 / 45 ⇒ φ/2 ≈ 28,1° ⇒ φ ≈ 56,1°.'
  },
  {
    id: 'cone-q17',
    level: 2,
    questionTypeBadge: 'Alaplap területe',
    question: 'Az előző kúp (átfogó 51 cm, befogók 24 és 45 cm, forgatás a hosszabbik befogó körül) alaplapjának mekkora a területe?',
    options: ['576π ≈ 1809,6 cm²', '2025π ≈ 6361,7 cm²', '48π ≈ 150,8 cm²', '2601π ≈ 8171,3 cm²'],
    correctAnswer: 0,
    explanation: 'Az alapkör sugara a rövidebb befogó: r = 24 cm, T = 24²π = 576π ≈ 1809,6 cm².'
  },
  {
    id: 'cone-q18',
    level: 2,
    questionTypeBadge: 'Magasság szögből',
    figure: <SectionQ leg="a = 10" phi="60°" M="M = ?" tall={1.73} />,
    question: 'Egy forgáskúp alkotója 10 cm, nyílásszöge 60°. Milyen magas a kúp?',
    options: ['5√3 ≈ 8,66 cm', '5 cm', '10 cm', '10√3 ≈ 17,3 cm'],
    correctAnswer: 0,
    explanation: 'A tengelymetszet szabályos háromszög (oldala 10 cm), így r = 5 cm és M = 10 · cos 30° = 5√3 ≈ 8,66 cm.'
  },
  {
    id: 'cone-q19',
    level: 2,
    questionTypeBadge: 'Alkotó hajlásszöge',
    figure: <RoundQ R={10} M={10} l={{ R: 'r = ?', M: 'M = 10', base: '45°' }} />,
    question: 'Egy 10 cm magas forgáskúp alkotói 45°-os szöget zárnak be az alapsíkkal. Mekkora az alapkör sugara?',
    options: ['10 cm', '5 cm', '10√2 ≈ 14,1 cm', '5√2 ≈ 7,1 cm'],
    correctAnswer: 0,
    explanation: 'A 45°-os derékszögű háromszög egyenlő szárú, ezért r = M = 10 cm. (A nyílásszög ekkor 90°.)'
  },
  {
    id: 'cone-q20',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás IGAZ minden forgáskúpra?',
    options: [
      'Az alkotó és az alaplap szöge a nyílásszög felének pótszöge.',
      'Az alkotó mindig hosszabb az alapkör átmérőjénél.',
      'Az alapkör sugara mindig rövidebb a magasságnál.',
      'Háromszoros nagyításnál a nyílásszög is háromszorosára nő.'
    ],
    correctAnswer: 0,
    explanation: 'A tengelymetszet felében a szögek φ/2, 90° és 90° − φ/2. A többi hamis: φ ≥ 60°-nál a ≤ 2r, lapos kúpnál r > M, nagyításnál a szögek nem változnak.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'cone-q21',
    level: 3,
    questionTypeBadge: 'Nyílásszög',
    figure: <RoundQ R={20} M={31.4} l={{ R: 'r', M: 'M = K/4', phi: '?' }} />,
    question: 'Egy forgáskúp alapkörének területe 1256,6 cm², magassága az alapkör kerületének negyede. Mekkora a nyílásszöge?',
    options: ['≈ 65,0°', '≈ 32,5°', '≈ 115,0°', '≈ 57,5°'],
    correctAnswer: 0,
    explanation: 'r²π = 1256,6 ⇒ r ≈ 20 cm; K ≈ 125,7 cm, M = K/4 ≈ 31,4 cm. tg(φ/2) = 20 / 31,4 ⇒ φ/2 ≈ 32,5° ⇒ φ ≈ 65,0°.'
  },
  {
    id: 'cone-q22',
    level: 3,
    questionTypeBadge: 'Tengelymetszet kerülete',
    figure: <SectionQ leg="2 dm" phi="40°" base="?" tall={2.75} />,
    question: 'Egy egyenes körkúp alkotója 2 dm, nyílásszöge 40°. Mekkora annak az egyenlő szárú háromszögnek a kerülete, amelynek megforgatásával a kúp keletkezett?',
    options: ['≈ 5,37 dm', '≈ 4,68 dm', '≈ 5,88 dm', '≈ 6,74 dm'],
    correctAnswer: 0,
    explanation: 'Az alap 2 · 2 · sin 20° ≈ 1,37 dm, a kerület 2 + 2 + 1,37 ≈ 5,37 dm.'
  },
  {
    id: 'cone-q23',
    level: 3,
    questionTypeBadge: 'Tengelymetszet területe',
    figure: <SectionQ leg="2 dm" phi="40°" tall={2.75} />,
    question: 'Mekkora az előző (2 dm alkotójú, 40°-os nyílásszögű) kúp tengelymetszetének területe?',
    options: ['≈ 1,29 dm²', '≈ 2,57 dm²', '≈ 0,64 dm²', '≈ 1,88 dm²'],
    correctAnswer: 0,
    explanation: 'T = ½ · a · a · sin φ = ½ · 2 · 2 · sin 40° ≈ 1,29 dm².'
  },
  {
    id: 'cone-q24',
    level: 3,
    questionTypeBadge: 'Kettős kúp',
    figure: <DoubleConeQ />,
    question: 'Egy rombuszt az egyik átlója körül megforgatva két, közös alapkörű kúpot kapunk. A kúpok nyílásszöge 50°, a közös alapkör területe 1964 cm². Mekkora a rombusz oldala?',
    options: ['≈ 59,2 cm', '≈ 27,6 cm', '≈ 29,6 cm', '≈ 53,6 cm'],
    correctAnswer: 0,
    explanation: 'r = √(1964/π) ≈ 25,0 cm. A rombusz oldala a kúp alkotója: sin 25° = r / a ⇒ a = 25,0 / sin 25° ≈ 59,2 cm.'
  },
  {
    id: 'cone-q25',
    level: 3,
    questionTypeBadge: 'Kúpszeletek',
    figure: <ConicQ line={[[100, 60], [160, 150]]} />,
    question: 'A forgáskúp palástját olyan síkkal metsszük, amely nem megy át a csúcson, és pontosan egy alkotóval párhuzamos. Milyen görbe a síkmetszet?',
    options: ['Parabolaív', 'Ellipszis', 'Hiperbolaív', 'Kör'],
    correctAnswer: 0,
    explanation: 'Egy alkotóval párhuzamos sík parabolaívet, két alkotóval párhuzamos hiperbolaívet, minden alkotót metsző ferde sík ellipszist, a tengelyre merőleges sík kört vág ki.'
  },
  {
    id: 'cone-q26',
    level: 3,
    questionTypeBadge: 'Kúpszeletek',
    figure: <ConicQ line={[[78, 96], [160, 128]]} />,
    question: 'Milyen síkmetszetet kapunk, ha a sík a forgáskúp minden alkotóját metszi, de nem merőleges a tengelyre (és nem megy át a csúcson)?',
    options: ['Ellipszist', 'Kört', 'Parabolaívet', 'Hiperbolaívet'],
    correctAnswer: 0,
    explanation: 'Minden alkotót metsző, a tengelyre nem merőleges sík ellipszist vág ki; ha merőleges a tengelyre, akkor kört.'
  },
  {
    id: 'cone-q27',
    level: 3,
    questionTypeBadge: 'Melyik befogó körül?',
    figure: <RotTriQ axis="6 cm" other="8 cm" phiHalf="?" />,
    question: 'Egy 6 cm és 8 cm befogójú derékszögű háromszöget a rövidebb befogója körül megforgatunk. Mekkora a keletkező kúp nyílásszöge?',
    options: ['≈ 106,3°', '≈ 73,7°', '≈ 53,1°', '≈ 36,9°'],
    correctAnswer: 0,
    explanation: 'A tengely a 6 cm-es befogó: M = 6, r = 8. tg(φ/2) = 8 / 6 ⇒ φ/2 ≈ 53,1° ⇒ φ ≈ 106,3°. (A hosszabbik befogó körül 73,7° lenne.)'
  },
  {
    id: 'cone-q28',
    level: 3,
    questionTypeBadge: 'Derékszögű nyílásszög',
    figure: <SectionQ base="r = 7" leg="a = ?" phi="90°" tall={1} />,
    question: 'Egy forgáskúp nyílásszöge 90°, alapkörének sugara 7 cm. Milyen hosszú az alkotója?',
    options: ['7√2 ≈ 9,9 cm', '14 cm', '7 cm', '7√3 ≈ 12,1 cm'],
    correctAnswer: 0,
    explanation: 'φ/2 = 45°, így a tengelymetszet fele egyenlő szárú derékszögű háromszög: M = r = 7 cm, a = 7√2 ≈ 9,9 cm.'
  },
  {
    id: 'cone-q29',
    level: 3,
    questionTypeBadge: 'Tengelymetszet területe',
    figure: <SectionQ base="2r = 10" leg="a = ?" M="M" tall={2.4} />,
    question: 'Egy forgáskúp alapkörének sugara 5 cm, tengelymetszetének területe 60 cm². Milyen hosszú az alkotója?',
    options: ['13 cm', '12 cm', '√61 ≈ 7,8 cm', '17 cm'],
    correctAnswer: 0,
    explanation: 'A tengelymetszet területe 2r · M / 2 = r · M = 60 ⇒ M = 12 cm. a = √(5² + 12²) = 13 cm.'
  },
  {
    id: 'cone-q30',
    level: 3,
    questionTypeBadge: 'Nagyítás',
    question: 'Egy forgáskúpot háromszorosára nagyítunk. Hogyan változnak az adatai?',
    options: [
      'Az alkotó 3-szoros, az alapkör területe 9-szeres, a nyílásszög nem változik',
      'Az alkotó 3-szoros, az alapkör területe 3-szoros, a nyílásszög 3-szoros',
      'Az alkotó 9-szeres, az alapkör területe 9-szeres, a nyílásszög nem változik',
      'Az alkotó 3-szoros, az alapkör területe 6-szoros, a nyílásszög 3-szoros'
    ],
    correctAnswer: 0,
    explanation: 'Hasonlóságnál a hosszak λ = 3-szorosra, a területek λ² = 9-szeresre nőnek, a szögek változatlanok.'
  }
];

export const ConeQuiz: React.FC<{
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
      topicId="g12-ter-forgaskup-quiz"
      subtopicId="a-forgaskup"
      title="12. A forgáskúp – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a forgáskúp részei, tengelymetszet, nyílásszög, forgatott háromszögek, kúpszeletek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={CONE_QUESTIONS}
      cheatSheets={[
        {
          title: 'A forgáskúp részei',
          items: [
            'Egyenlő szárú háromszög forgatása a szimmetriatengely körül',
            'Alkotó (a): csúcs – alapkör pontja; mind egyenlő',
            'Magasság (M): csúcs – alapkör középpontja, merőleges az alapra',
            'Tengelymetszet: egyenlő szárú háromszög (alap 2r, szár a)'
          ]
        },
        {
          title: 'Összefüggések',
          items: [
            'a² = r² + M²',
            'sin(φ/2) = r / a, tg(φ/2) = r / M',
            'alkotó–alaplap szöge: 90° − φ/2',
            'Alapkör: K = 2rπ, T = r²π'
          ]
        },
        {
          title: 'Nevezetes esetek',
          items: [
            'Szabályos háromszög tengelymetszet: φ = 60°, a = 2r',
            'φ = 90°: M = r, a = r√2',
            'Derékszögű háromszög befogó körül: M = befogó, r = másik befogó',
            'Kúpszeletek: kör, ellipszis, parabola, hiperbola'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<ConeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<ConeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default ConeQuiz;
