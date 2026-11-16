import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FrustumMatcher } from './FrustumMatcher';
import { FrustumSorter } from './FrustumSorter';
import { QFig, Txt, Seg, Poly, RightMark, AngleArc, PolyBody, polyhedron, frustumSolid, pyramidSolid, mid2, RoundQ, SK, P2 } from '../a-gula/SolidSketch';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Szabályos négyoldalú csonkagúla. */
const FrustQ: React.FC<{ base?: string; top?: string; m?: string; mo?: string; edge?: string; ratio?: number; h?: number }> = ({
  base,
  top,
  m,
  mo,
  edge,
  ratio = 0.45,
  h = 1
}) => {
  const f = frustumSolid(4, 1, ratio, h);
  const g = polyhedron(f.verts, f.faces, { x: 40, y: 18, w: 160, h: 116 });
  const O = g.P([0, 0, 0]);
  const Ot = g.P([0, h, 0]);
  const mB = mid2(g.pts[1], g.pts[2]);
  const mT = mid2(g.pts[5], g.pts[6]);
  return (
    <QFig>
      <PolyBody g={g} />
      {m !== undefined && (
        <>
          <Seg a={Ot} b={O} color={SK.red} dash w={1.4} />
          <RightMark v={O} p1={Ot} p2={mB} r={7} />
          <Txt p={[O[0] - 5, (O[1] + Ot[1]) / 2 + 4]} t={m} anchor="end" color={SK.red} size={10.5} />
        </>
      )}
      {mo !== undefined && (
        <>
          <Seg a={mT} b={mB} color={SK.blue} w={1.8} />
          <Txt p={[(mT[0] + mB[0]) / 2 + 7, (mT[1] + mB[1]) / 2]} t={mo} anchor="start" color={SK.blue} size={10.5} />
        </>
      )}
      {edge !== undefined && (
        <>
          <Seg a={g.pts[4]} b={g.pts[0]} color={SK.green} w={2.4} />
          <Txt p={[(g.pts[4][0] + g.pts[0][0]) / 2 - 7, (g.pts[4][1] + g.pts[0][1]) / 2]} t={edge} anchor="end" color={SK.green} size={10.5} />
        </>
      )}
      {base && <Txt p={[(g.pts[0][0] + g.pts[1][0]) / 2, g.pts[0][1] + 11]} t={base} size={10.5} />}
      {top && <Txt p={[(g.pts[6][0] + g.pts[7][0]) / 2, g.pts[7][1] - 8]} t={top} size={10.5} />}
    </QFig>
  );
};

/** Gúla elmetszése az alaplappal párhuzamos síkkal. */
const CutPyrQ: React.FC<{ M: string; cut: string; base: string; fromApex: boolean; t: number }> = ({ M, cut, base, fromApex, t }) => {
  const H = 1.9;
  const s = pyramidSolid(4, 1, H);
  const g = polyhedron(s.verts, s.faces, { x: 50, y: 14, w: 140, h: 122 });
  const apex = g.pts[4];
  const O = g.P([0, 0, 0]);
  const y = H * (1 - t);
  const Oc = g.P([0, y, 0]);
  const top = [0, 1, 2, 3].map((i) => g.P([s.verts[i][0] * t, y, s.verts[i][2] * t]));
  return (
    <QFig>
      <PolyBody g={g} />
      <Poly p={top} fill="rgba(245,158,11,0.3)" color={SK.arc} w={1.4} />
      <Seg a={apex} b={O} color={SK.red} dash w={1.3} />
      <Txt p={[200, 30]} t={`M = ${M}`} size={10} anchor="end" color={SK.red} />
      {fromApex ? (
        <Txt p={[apex[0] - 6, (apex[1] + Oc[1]) / 2 + 4]} t={cut} anchor="end" size={10} color={SK.ang} />
      ) : (
        <Txt p={[O[0] + 6, (O[1] + Oc[1]) / 2 + 2]} t={cut} anchor="start" size={10} color={SK.ang} />
      )}
      <Txt p={[(g.pts[0][0] + g.pts[1][0]) / 2, g.pts[0][1] + 11]} t={base} size={10.5} />
      <Txt p={[(top[2][0] + top[3][0]) / 2, top[3][1] - 8]} t="?" />
    </QFig>
  );
};

/** Szimmetrikus trapéz (tengelymetszet) a szimmetriatengellyel. */
const TrapQ: React.FC<{ bottom: string; topL: string; ang?: string; leg?: string; m?: string; Rr?: number; hh?: number }> = ({
  bottom,
  topL,
  ang,
  leg,
  m,
  Rr = 0.62,
  hh = 0.45
}) => {
  const W = 84;
  const BL: P2 = [120 - W, 128];
  const BR: P2 = [120 + W, 128];
  const TR: P2 = [120 + W * Rr, 128 - W * 2 * hh];
  const TL: P2 = [120 - W * Rr, 128 - W * 2 * hh];
  const F: P2 = [TR[0], 128];
  return (
    <QFig>
      <Seg a={[120, 22]} b={[120, 146]} color={SK.aux} dash w={1} />
      <Poly p={[BL, BR, TR, TL]} fill="rgba(99,102,241,0.13)" />
      {m !== undefined && (
        <>
          <Seg a={TR} b={F} color={SK.red} dash w={1.3} />
          <RightMark v={F} p1={TR} p2={BR} r={7} />
          <Txt p={[F[0] - 4, (TR[1] + F[1]) / 2]} t={m} anchor="end" color={SK.red} size={10.5} />
        </>
      )}
      {ang !== undefined && <AngleArc v={BR} p1={BL} p2={TR} t={ang} r={14} tr={27} />}
      {leg && <Txt p={[(TR[0] + BR[0]) / 2 + 9, (TR[1] + BR[1]) / 2 - 4]} t={leg} anchor="start" color={SK.green} size={10.5} />}
      <Txt p={[120, 141]} t={bottom} size={10.5} />
      <Txt p={[120, TL[1] - 8]} t={topL} size={10.5} />
    </QFig>
  );
};

export const FRUSTUM_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fru-q1',
    level: 1,
    questionTypeBadge: 'Keletkezés',
    question: 'Mi keletkezik, ha egy gúlát az alaplapjával párhuzamos síkkal elmetszünk?',
    options: [
      'Egy az eredetihez középpontosan hasonló gúla és egy csonkagúla',
      'Két egybevágó csonkagúla',
      'Egy hasáb és egy gúla',
      'Két tetraéder'
    ],
    correctAnswer: 0,
    explanation: 'A levágott, csúcsot tartalmazó rész az eredetihez középpontosan hasonló kiegészítő gúla, a másik rész a csonkagúla.'
  },
  {
    id: 'fru-q2',
    level: 1,
    questionTypeBadge: 'Palást',
    question: 'Milyen síkidomok alkotják a csonkagúla palástját?',
    options: ['Trapézok', 'Háromszögek', 'Téglalapok, mindig', 'Paralelogrammák'],
    correctAnswer: 0,
    explanation: 'A csonkagúla palástját annyi trapéz alkotja, ahány oldala van az alaplapnak (az oldallapok párhuzamos oldalai az alap- és a fedőél).'
  },
  {
    id: 'fru-q3',
    level: 1,
    questionTypeBadge: 'Lapok száma',
    question: 'Hány lapja van egy hatoldalú csonkagúlának?',
    options: ['8', '7', '6', '12'],
    correctAnswer: 0,
    explanation: 'Alaplap + fedőlap + 6 trapéz alakú oldallap = 8 lap.'
  },
  {
    id: 'fru-q4',
    level: 1,
    questionTypeBadge: 'Élek száma',
    question: 'Hány éle van egy ötoldalú csonkagúlának?',
    options: ['15', '10', '12', '20'],
    correctAnswer: 0,
    explanation: '5 alapél + 5 fedőél + 5 oldalél = 15 él (általában 3n).'
  },
  {
    id: 'fru-q5',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Milyen síkidom a csonkakúp tengelymetszete?',
    options: ['Szimmetrikus trapéz', 'Egyenlő szárú háromszög', 'Téglalap', 'Derékszögű trapéz'],
    correctAnswer: 0,
    explanation: 'A tengelyre illeszkedő sík szimmetrikus trapézt metsz ki: alapjai 2R és 2r, szárai az alkotók.'
  },
  {
    id: 'fru-q6',
    level: 1,
    questionTypeBadge: 'Alkotó',
    figure: <RoundQ R={6} rTop={3} M={4} l={{ R: 'R = 6', r: 'r = 3', M: 'm = 4', a: 'a = ?' }} />,
    question: 'Egy csonkakúp alapkörének sugara 6 cm, fedőkörének sugara 3 cm, magassága 4 cm. Milyen hosszú az alkotója?',
    options: ['5 cm', '√52 ≈ 7,2 cm', '√97 ≈ 9,8 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'A tengelymetszet felében: a² = m² + (R − r)² = 16 + 9 = 25 ⇒ a = 5 cm.'
  },
  {
    id: 'fru-q7',
    level: 1,
    questionTypeBadge: 'Magasság',
    figure: <RoundQ R={10} rTop={4} M={8} l={{ R: 'R = 10', r: 'r = 4', M: 'm = ?', a: 'a = 10' }} />,
    question: 'Egy csonkakúp alapkörének sugara 10 cm, fedőkörének sugara 4 cm, alkotója 10 cm. Milyen magas?',
    options: ['8 cm', '6 cm', '√84 ≈ 9,2 cm', '√116 ≈ 10,8 cm'],
    correctAnswer: 0,
    explanation: 'R − r = 6 cm, m = √(10² − 6²) = √64 = 8 cm.'
  },
  {
    id: 'fru-q8',
    level: 1,
    questionTypeBadge: 'Forgatás',
    question: 'Melyik síkidom megforgatásával kapunk csonkakúpot?',
    options: [
      'Szimmetrikus trapéz a szimmetriatengelye körül',
      'Téglalap az egyik oldala körül',
      'Egyenlő szárú háromszög a szimmetriatengelye körül',
      'Félkör az átmérője körül'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetrikus trapézból (és a derékszögű trapézból a derékszögű szára körül) csonkakúp lesz; téglalapból henger, háromszögből kúp, félkörből gömb.'
  },
  {
    id: 'fru-q9',
    level: 1,
    questionTypeBadge: 'Magasság',
    question: 'Mit nevezünk a csonkagúla magasságának?',
    options: [
      'Az alaplap és a fedőlap síkjának távolságát',
      'Az oldalél hosszát',
      'Az oldallap trapézának szárát',
      'A kiegészítő gúla magasságát'
    ],
    correctAnswer: 0,
    explanation: 'A csonkagúla / csonkakúp magassága az alaplap és a fedőlap síkjának távolsága.'
  },
  {
    id: 'fru-q10',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    figure: <TrapQ bottom="2R = ?" topL="2r = ?" leg="a" />,
    question: 'Egy csonkakúp alapkörének sugara 8 cm, fedőkörének sugara 5 cm. Mekkorák a tengelymetszet (szimmetrikus trapéz) párhuzamos oldalai?',
    options: ['16 cm és 10 cm', '8 cm és 5 cm', '13 cm és 3 cm', '16 cm és 5 cm'],
    correctAnswer: 0,
    explanation: 'A trapéz alapjai az alapkör és a fedőkör átmérői: 2R = 16 cm, 2r = 10 cm.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'fru-q11',
    level: 2,
    questionTypeBadge: 'Fedőél',
    figure: <CutPyrQ M="8 dm" cut="2 dm" base="a = 5" fromApex t={0.25} />,
    question: 'Egy szabályos négyoldalú gúla magassága 8 dm, alapéle 5 dm. A csúcstól 2 dm-re az alaplappal párhuzamos síkkal elmetsszük. Milyen hosszú a csonkagúla fedőéle?',
    options: ['1,25 dm', '3,75 dm', '1,5 dm', '2 dm'],
    correctAnswer: 0,
    explanation: 'A kiegészítő gúla hasonló, aránya λ = 2/8 = 1/4, így a fedőél 5 · 1/4 = 1,25 dm. A csonkagúla magassága 6 dm.'
  },
  {
    id: 'fru-q12',
    level: 2,
    questionTypeBadge: 'Fedőél',
    figure: <CutPyrQ M="20 cm" cut="2 cm" base="a = 6" fromApex={false} t={0.9} />,
    question: 'Egy szabályos négyoldalú gúla magassága 20 cm, alapéle 6 cm. Az alaplaptól 2 cm-re az alaplappal párhuzamos síkkal elmetsszük. Milyen hosszú a csonkagúla fedőéle?',
    options: ['5,4 cm', '0,6 cm', '5,7 cm', '4,8 cm'],
    correctAnswer: 0,
    explanation: 'A kiegészítő gúla magassága 20 − 2 = 18 cm, λ = 18/20 = 0,9 ⇒ fedőél = 0,9 · 6 = 5,4 cm. (0,6 cm a csúcstól mért 2 cm-rel számolva jönne ki.)'
  },
  {
    id: 'fru-q13',
    level: 2,
    questionTypeBadge: 'Csonkakúp magassága',
    figure: <TrapQ bottom="16 cm" topL="10 cm" ang="30°" m="m = ?" />,
    question: 'Egy szimmetrikus trapéz alapjai 16 cm és 10 cm, a hosszabb alapon fekvő szögei 30°-osak. A szimmetriatengelye körül megforgatjuk. Milyen magas a csonkakúp?',
    options: ['√3 ≈ 1,73 cm', '3 cm', '2√3 ≈ 3,46 cm', '1,5 cm'],
    correctAnswer: 0,
    explanation: 'R − r = 8 − 5 = 3 cm. A derékszögű háromszögben m = 3 · tg 30° = √3 ≈ 1,73 cm.'
  },
  {
    id: 'fru-q14',
    level: 2,
    questionTypeBadge: 'Csonkakúp alkotója',
    figure: <TrapQ bottom="16 cm" topL="10 cm" ang="30°" leg="a = ?" />,
    question: 'Milyen hosszú az előző csonkakúp (alapok 16 és 10 cm, 30°-os szögek) alkotója?',
    options: ['2√3 ≈ 3,46 cm', '√3 ≈ 1,73 cm', '6 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'a = (R − r) / cos 30° = 3 / (√3/2) = 2√3 ≈ 3,46 cm (a 30°-os szöggel szemközti befogó, m, az alkotó fele).'
  },
  {
    id: 'fru-q15',
    level: 2,
    questionTypeBadge: 'Bonbon',
    figure: <RoundQ R={1.65} rTop={0.75} M={1.2} l={{ R: '1,65', r: '0,75', M: 'm', a: '1,5' }} />,
    question: 'Egy csonkakúp alakú bonbon alapkörének átmérője 3,3 cm, fedőkörének átmérője és alkotója egyaránt 1,5 cm. Milyen magas díszdoboz kell két rétegnyi bonbonhoz?',
    options: ['2,4 cm', '1,2 cm', '3 cm', '≈ 3,3 cm'],
    correctAnswer: 0,
    explanation: 'R − r = 1,65 − 0,75 = 0,9 cm, m = √(1,5² − 0,9²) = 1,2 cm. Két réteg: 2,4 cm.'
  },
  {
    id: 'fru-q16',
    level: 2,
    questionTypeBadge: 'Derékszögű trapéz',
    figure: <RoundQ R={16} rTop={11} M={10.9} l={{ R: 'R = 16', r: 'r = 11', a: 'a = 12', M: 'm = ?' }} />,
    question: 'Egy derékszögű trapéz alapjai 16 cm és 11 cm, hosszabb szára 12 cm. A derékszögű szára körül megforgatjuk. Milyen magas a csonkakúp?',
    options: ['√119 ≈ 10,91 cm', '12 cm', '√25 = 5 cm', '√263 ≈ 16,2 cm'],
    correctAnswer: 0,
    explanation: 'R = 16, r = 11, a = 12 (a ferde szár). m = √(12² − 5²) = √119 ≈ 10,91 cm – ez a derékszögű szár hossza.'
  },
  {
    id: 'fru-q17',
    level: 2,
    questionTypeBadge: 'Kiegészítő kúp',
    figure: <RoundQ R={6} rTop={3} M={4} l={{ R: 'R = 6', r: 'r = 3', M: 'm = 4' }} />,
    question: 'Egy csonkakúp alapkörének sugara 6 cm, fedőkörének sugara 3 cm, magassága 4 cm. Milyen magas a kiegészítő kúp?',
    options: ['4 cm', '8 cm', '2 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'λ = r / R = 1/2, így a kiegészítő kúp magassága a teljes kúpénak fele: m₁ = r · m / (R − r) = 3 · 4 / 3 = 4 cm (a teljes kúp 8 cm magas).'
  },
  {
    id: 'fru-q18',
    level: 2,
    questionTypeBadge: 'Oldallap magassága',
    figure: <FrustQ base="10" top="4" m="m = 4" mo="mₒ = ?" />,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 10 cm, fedőéle 4 cm, magassága 4 cm. Mekkora az oldallapok (trapézok) magassága?',
    options: ['5 cm', '√32 ≈ 5,66 cm', '√52 ≈ 7,2 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'Az alapél- és fedőél-felezőpontokon átmenő metszetben a derékszögű háromszög befogói m = 4 és (10 − 4)/2 = 3 ⇒ mₒ = 5 cm.'
  },
  {
    id: 'fru-q19',
    level: 2,
    questionTypeBadge: 'Oldalél',
    figure: <FrustQ base="10" top="4" m="m = 4" edge="?" />,
    question: 'Milyen hosszú az előző csonkagúla (alapél 10 cm, fedőél 4 cm, magasság 4 cm) oldaléle?',
    options: ['√34 ≈ 5,83 cm', '5 cm', '√52 ≈ 7,21 cm', '√41 ≈ 6,40 cm'],
    correctAnswer: 0,
    explanation: 'Az átlós metszetben a fél átlók különbsége (10 − 4)·√2/2 = 3√2. b = √(4² + 18) = √34 ≈ 5,83 cm. (Ellenőrzés: √(mₒ² + 3²) = √34.)'
  },
  {
    id: 'fru-q20',
    level: 2,
    questionTypeBadge: 'Fedőkör sugara',
    figure: <RoundQ R={6} rTop={4} M={4} l={{ R: 'R = 6', r: 'r = ?', M: '4' }} />,
    question: 'Egy 12 cm magas, 6 cm alapsugarú forgáskúpot az alaplaptól 4 cm-re az alaplappal párhuzamos síkkal elmetszünk. Mekkora a keletkező csonkakúp fedőkörének sugara?',
    options: ['4 cm', '2 cm', '3 cm', '4,5 cm'],
    correctAnswer: 0,
    explanation: 'A kiegészítő kúp magassága 12 − 4 = 8 cm, λ = 8/12 = 2/3 ⇒ r = 6 · 2/3 = 4 cm.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'fru-q21',
    level: 3,
    questionTypeBadge: 'Szoknya – derékbőség',
    question: 'Egy A vonalú szoknyát 23 cm átmérőjű henger alakú állványon mutatnak be (a derékvonal éppen körbeéri). Mekkora a derékbősége annak, akinek éppen jó?',
    options: ['≈ 72,3 cm', '≈ 36,1 cm', '≈ 144,5 cm', '≈ 415,5 cm'],
    correctAnswer: 0,
    explanation: 'A derékbőség a henger kerülete: K = dπ = 23π ≈ 72,3 cm.'
  },
  {
    id: 'fru-q22',
    level: 3,
    questionTypeBadge: 'Szoknya – szabásminta',
    question: 'A szoknya (csonkakúp palástja) két egyforma körgyűrűcikkből áll. Derékvonal 23π ≈ 72,3 cm, csípővonal 91 cm, ezek távolsága a szoknyán 20 cm, a szoknya hossza 80 cm. Mekkora sugarú körből kell kivágni a körcikkeket?',
    options: ['≈ 157,1 cm', '≈ 77,1 cm', '≈ 97,1 cm', '80 cm'],
    correctAnswer: 0,
    explanation: 'A kiterített palást hasonló ívei: ρ / (ρ + 20) = 72,3 / 91 ⇒ ρ ≈ 77,1 cm (a derékvonal sugara). A szoknya alja ρ + 80 ≈ 157,1 cm-re van a középponttól.'
  },
  {
    id: 'fru-q23',
    level: 3,
    questionTypeBadge: 'Szoknya – alsó szegély',
    question: 'Milyen hosszú az előző szoknya aljának vonala (derék 72,3 cm, belső sugár ≈ 77,1 cm, külső sugár ≈ 157,1 cm)?',
    options: ['≈ 147,2 cm', '≈ 171,0 cm', '≈ 115,7 cm', '≈ 91,0 cm'],
    correctAnswer: 0,
    explanation: 'Az ívhossz arányos a sugárral: 72,3 · 157,1 / 77,1 ≈ 147,2 cm.'
  },
  {
    id: 'fru-q24',
    level: 3,
    questionTypeBadge: 'Alkotó hajlásszöge',
    figure: <RoundQ R={7} rTop={3} M={3} l={{ R: 'R = 7', r: 'r = 3', a: 'a = 5', base: '?' }} />,
    question: 'Egy csonkakúp alapkörének sugara 7 cm, fedőkörének sugara 3 cm, alkotója 5 cm. Mekkora szöget zár be az alkotó az alaplap síkjával?',
    options: ['≈ 36,9°', '≈ 53,1°', '≈ 25,4°', '≈ 64,6°'],
    correctAnswer: 0,
    explanation: 'cos α = (R − r) / a = 4 / 5 ⇒ α ≈ 36,9° (a magasság m = 3 cm).'
  },
  {
    id: 'fru-q25',
    level: 3,
    questionTypeBadge: 'Fedőlap területe',
    question: 'Egy gúlát a magasságának harmadában (az alaplaptól mérve) elmetszünk az alaplappal párhuzamos síkkal. Hányad része a csonkagúla fedőlapjának területe az alaplapénak?',
    options: ['4/9', '2/3', '1/9', '1/3'],
    correctAnswer: 0,
    explanation: 'A kiegészítő gúla magassága a teljesének 2/3-a, ez a hasonlóság aránya. A területek aránya λ² = 4/9.'
  },
  {
    id: 'fru-q26',
    level: 3,
    questionTypeBadge: 'Teljes kúp',
    figure: <RoundQ R={9} rTop={6} M={5} l={{ R: 'R = 9', r: 'r = 6', M: 'm = 5' }} />,
    question: 'Egy csonkakúp alapkörének sugara 9 cm, fedőkörének sugara 6 cm, magassága 5 cm. Milyen magas volt a kúp, amelyből levágták?',
    options: ['15 cm', '10 cm', '7,5 cm', '13,5 cm'],
    correctAnswer: 0,
    explanation: 'A kiegészítő kúp magassága m₁ = r · m / (R − r) = 6 · 5 / 3 = 10 cm, a teljes kúpé 10 + 5 = 15 cm. (Ellenőrzés: 10 / 15 = 6 / 9.)'
  },
  {
    id: 'fru-q27',
    level: 3,
    questionTypeBadge: 'Csonkagúla magassága',
    figure: <FrustQ base="12" top="6" edge="9" m="m = ?" ratio={0.5} h={1.2} />,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 12 cm, fedőéle 6 cm, oldaléle 9 cm. Milyen magas?',
    options: ['√63 ≈ 7,94 cm', '√72 ≈ 8,49 cm', '√45 ≈ 6,71 cm', '√77 ≈ 8,77 cm'],
    correctAnswer: 0,
    explanation: 'Az átlós metszet szimmetrikus trapéz: a fél átlók különbsége (12 − 6)·√2/2 = 3√2. m = √(81 − 18) = √63 ≈ 7,94 cm. (√72 az oldallap magassága.)'
  },
  {
    id: 'fru-q28',
    level: 3,
    questionTypeBadge: 'Kiegészítő gúla',
    question: 'Egy csonkagúla alaplapjának területe 36 cm², fedőlapjának területe 9 cm², magassága 4 cm. Milyen magas volt az eredeti gúla?',
    options: ['8 cm', '16 cm', '5,33 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A területek aránya λ² = 9/36 = 1/4 ⇒ λ = 1/2. Ha a teljes magasság M, akkor (M − 4)/M = 1/2 ⇒ M = 8 cm.'
  },
  {
    id: 'fru-q29',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás IGAZ?',
    options: [
      'A csonkagúla oldaléleinek egyenesei egy pontban metszik egymást.',
      'A csonkagúla oldallapjai paralelogrammák.',
      'A csonkagúla alaplapja és fedőlapja egybevágó.',
      'A csonkakúp alkotója mindig kétszer olyan hosszú, mint a magassága.'
    ],
    correctAnswer: 0,
    explanation: 'Az oldalélek egyenesei az eredeti gúla csúcsában találkoznak. Az oldallapok trapézok, az alap- és fedőlap csak hasonló, az alkotó és a magasság viszonya az adatoktól függ.'
  },
  {
    id: 'fru-q30',
    level: 3,
    questionTypeBadge: 'Alapkör átmérője',
    figure: <TrapQ bottom="2R = ?" topL="2r = 10" leg="13" m="12" />,
    question: 'Egy csonkakúp fedőkörének átmérője 10 cm, alkotója 13 cm, magassága 12 cm. Mekkora az alapkör átmérője?',
    options: ['20 cm', '15 cm', '10 cm', '26 cm'],
    correctAnswer: 0,
    explanation: 'R − r = √(13² − 12²) = 5 cm, r = 5 cm ⇒ R = 10 cm, az átmérő 20 cm. (15 cm-t kapunk, ha a különbséget az átmérőhöz adjuk.)'
  }
];

export const FrustumQuiz: React.FC<{
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
      topicId="g12-ter-csonka-testek-quiz"
      subtopicId="a-csonkagula-es-a-csonkakup"
      title="14. A csonkagúla és a csonkakúp – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: keletkezés, részek, hasonlóság a kiegészítő testtel, tengelymetszet, forgatott trapézok."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={FRUSTUM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: [
            'Alaplappal párhuzamos sík: kiegészítő (hasonló) test + csonka test',
            'Csonkagúla palástja: n trapéz; n + 2 lap, 3n él, 2n csúcs',
            'Csonkakúp tengelymetszete: szimmetrikus trapéz (2R, 2r, a)',
            'Magasság: az alap- és a fedőlap síkjának távolsága'
          ]
        },
        {
          title: 'Hasonlóság',
          items: [
            'λ = r / R = fedőél / alapél = m₁ / M (m₁: kiegészítő test magassága)',
            'A csúcstól mért távolsággal számolj!',
            'm₁ = r · m / (R − r)',
            'Fedőlap területe = λ² · alaplap területe'
          ]
        },
        {
          title: 'Derékszögű háromszögek',
          items: [
            'Csonkakúp: a² = m² + (R − r)²',
            'Négyzet alapú: mₒ² = m² + ((a − c)/2)²',
            'Oldalél: b² = m² + ((a − c)·√2/2)²',
            'Derékszögű trapéz forgatása: a derékszögű szár a magasság'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<FrustumMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<FrustumSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default FrustumQuiz;
