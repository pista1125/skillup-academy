import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LineIntersectionMatcher } from './LineIntersectionMatcher';
import { LineIntersectionSorter } from './LineIntersectionSorter';
import { LineIntersectionPlane } from './LineIntersectionFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG = 'w-full max-w-[280px] h-auto mx-auto';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';

export const LINE_INTERSECTION_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapok (1–10)
  {
    id: 'li-q1',
    level: 1,
    questionTypeBadge: 'Közös pontok',
    question: 'Mit adnak meg két egyenes egyenletéből álló egyenletrendszer megoldásai?',
    options: ['A két egyenes közös pontjait', 'A két egyenes meredekségét', 'A két egyenes hajlásszögét', 'A két egyenes távolságát'],
    correctAnswer: 0,
    explanation: 'Két síkbeli alakzat egyenletéből álló egyenletrendszer megoldásai éppen a két alakzat közös pontjait adják meg.'
  },
  {
    id: 'li-q2',
    level: 1,
    questionTypeBadge: 'Illeszkedés',
    question: 'Melyik pont illeszkedik az e: 5x + 4y = 7 egyenesre?',
    options: ['(3; −2)', '(4; 2)', '(−1; −3)', '(2; 1)'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: 5 · 3 + 4 · (−2) = 15 − 8 = 7, igaz. (4; 2): 28 ≠ 7; (−1; −3): −17 ≠ 7; (2; 1): 14 ≠ 7.'
  },
  {
    id: 'li-q3',
    level: 1,
    questionTypeBadge: 'Grafikus leolvasás',
    figure: (
      <LineIntersectionPlane
        xMin={-2}
        xMax={5}
        yMin={-2}
        yMax={5}
        unit={26}
        ticks="all"
        className={FIG}
        lines={[
          { p: [0, -1], q: [3, 2], color: BLUE, label: 'e', labelAt: 0.92 },
          { p: [0, 5], q: [3, -1], color: RED, label: 'f', labelAt: 0.08, labelDx: 8, labelDy: 10 }
        ]}
      />
    ),
    question: 'Olvasd le az ábráról az e és az f egyenes metszéspontját!',
    options: ['(2; 1)', '(1; 2)', '(0; 5)', '(1; 0)'],
    correctAnswer: 0,
    explanation: 'A két egyenes a (2; 1) rácspontban metszi egymást (e: y = x − 1, f: y = −2x + 5; mindkettőbe helyettesítve igaz). A (1; 2) a koordináták felcserélése.'
  },
  {
    id: 'li-q4',
    level: 1,
    questionTypeBadge: 'Párhuzamos egyenesek',
    figure: (
      <LineIntersectionPlane
        xMin={-3}
        xMax={4}
        yMin={-3}
        yMax={4}
        unit={26}
        className={FIG}
        lines={[
          { p: [0, 0], q: [2, 1], color: BLUE, label: 'e', labelAt: 0.92 },
          { p: [0, 2], q: [2, 3], color: RED, label: 'f', labelAt: 0.85 }
        ]}
      />
    ),
    question: 'Az ábrán két különböző, párhuzamos egyenes látható. Hány megoldása van az egyenleteikből felírt egyenletrendszernek?',
    options: ['Nincs megoldása', 'Pontosan egy', 'Pontosan kettő', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Két különböző párhuzamos egyenesnek nincs közös pontja, ezért az egyenletrendszer megoldáshalmaza az üres halmaz.'
  },
  {
    id: 'li-q5',
    level: 1,
    questionTypeBadge: 'Egybeeső egyenesek',
    question: 'Hány közös pontja van az x − y = 4 és az 5x − 5y = 20 egyenletű egyenesnek?',
    options: ['Végtelen sok', 'Nincs közös pontjuk', 'Pontosan egy', 'Pontosan kettő'],
    correctAnswer: 0,
    explanation: 'A második egyenlet az első ötszöröse, tehát ugyanazt az egyenest adják meg: a két egyenes egybeesik, végtelen sok közös pontjuk van.'
  },
  {
    id: 'li-q6',
    level: 1,
    questionTypeBadge: 'Metszéspont',
    figure: (
      <LineIntersectionPlane
        xMin={-1}
        xMax={5}
        yMin={-1}
        yMax={7}
        unit={22}
        grid={false}
        className={FIG}
        lines={[
          { p: [0, 0], q: [1, 2], color: BLUE, label: 'y = 2x', labelAt: 0.75, labelDx: 8, labelDy: 10 },
          { p: [0, 6], q: [1, 6], color: GREEN, label: 'y = 6', labelAt: 0.82, labelDy: -6 }
        ]}
        points={[{ at: [3, 6], label: '?', color: PURPLE, dx: 4, dy: -8 }]}
      />
    ),
    question: 'Melyik pontban metszi egymást az y = 2x és az y = 6 egyenletű egyenes?',
    options: ['(3; 6)', '(6; 3)', '(6; 12)', '(2; 6)'],
    correctAnswer: 0,
    explanation: 'A metszéspontban y = 6, így 2x = 6 ⇒ x = 3. A metszéspont (3; 6).'
  },
  {
    id: 'li-q7',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    figure: (
      <LineIntersectionPlane
        xMin={-1}
        xMax={8}
        yMin={-1}
        yMax={5}
        unit={24}
        grid={false}
        className={FIG}
        lines={[{ p: [0, 4], q: [6, 0], color: BLUE, label: '2x + 3y = 12', labelAt: 0.25, labelDx: 6, labelDy: -8 }]}
        points={[{ at: [6, 0], label: '?', color: RED, dx: 2, dy: -8 }]}
      />
    ),
    question: 'Melyik pontban metszi az x tengelyt a 2x + 3y = 12 egyenletű egyenes?',
    options: ['(6; 0)', '(4; 0)', '(0; 4)', '(12; 0)'],
    correctAnswer: 0,
    explanation: 'Az x tengely egyenlete y = 0. Behelyettesítve 2x = 12 ⇒ x = 6, tehát a metszéspont (6; 0). (A (0; 4) az y tengellyel vett metszéspont.)'
  },
  {
    id: 'li-q8',
    level: 1,
    questionTypeBadge: 'Tengelymetszet',
    question: 'Melyik pontban metszi az y tengelyt a 2x + 3y = 12 egyenletű egyenes?',
    options: ['(0; 4)', '(0; 6)', '(4; 0)', '(0; 12)'],
    correctAnswer: 0,
    explanation: 'Az y tengely egyenlete x = 0. Behelyettesítve 3y = 12 ⇒ y = 4, a metszéspont (0; 4).'
  },
  {
    id: 'li-q9',
    level: 1,
    questionTypeBadge: 'Kölcsönös helyzet',
    question: 'Két egyenes meredeksége különböző. Hány közös pontjuk van?',
    options: ['Pontosan egy', 'Egy sincs', 'Végtelen sok', 'Az egyenesektől függően 0 vagy 1'],
    correctAnswer: 0,
    explanation: 'Különböző meredekségű egyenesek nem párhuzamosak, tehát metszők: pontosan egy közös pontjuk van.'
  },
  {
    id: 'li-q10',
    level: 1,
    questionTypeBadge: 'Hajópályák',
    question: 'A NewSea az e: 5x + 4y = 7, a DrunkenSailor az f: 4x − y = 14 egyenesen halad. Melyik ponton halad át mindkét hajó?',
    options: ['B(3; −2)', 'A(−1; 3)', 'C(4; 2)', 'O(0; 0)'],
    correctAnswer: 0,
    explanation: 'B: 15 − 8 = 7 és 12 + 2 = 14, mindkettő igaz. A csak e-n (f-be helyettesítve −7 ≠ 14), C csak f-en van (e-be helyettesítve 28 ≠ 7), O egyiken sem.'
  },

  // LEVEL 2: Egyenletrendszerek (11–20)
  {
    id: 'li-q11',
    level: 2,
    questionTypeBadge: 'Behelyettesítő módszer',
    question: 'Hol metszi egymást a 3x + y = −1 és a 2x − 3y = −19 egyenletű egyenes?',
    options: ['(−2; 5)', '(5; −2)', '(2; −7)', '(−1; 2)'],
    correctAnswer: 0,
    explanation: 'y = −3x − 1, így 2x − 3(−3x − 1) = −19 ⇒ 11x = −22 ⇒ x = −2, y = 5. (A (2; −7) csak az első egyenletet elégíti ki.)'
  },
  {
    id: 'li-q12',
    level: 2,
    questionTypeBadge: 'Egyenlő együtthatók',
    question: 'Mi a 3x − 7y = −7 és a 6x − 7y = −28 egyenletű egyenesek közös pontja?',
    options: ['(−7; −2)', '(7; 2)', '(−7; 2)', '(−2; −7)'],
    correctAnswer: 0,
    explanation: 'A másodikból kivonva az elsőt: 3x = −21 ⇒ x = −7. Ezután 3 · (−7) − 7y = −7 ⇒ −7y = 14 ⇒ y = −2.'
  },
  {
    id: 'li-q13',
    level: 2,
    questionTypeBadge: 'Behelyettesítő módszer',
    question: 'Mi a 3x − y = 16 és a 2x + 5y = 5 egyenletű egyenesek közös pontja?',
    options: ['(5; −1)', '(−5; 1)', '(5; 1)', '(1; −5)'],
    correctAnswer: 0,
    explanation: 'y = 3x − 16, így 2x + 5(3x − 16) = 5 ⇒ 17x = 85 ⇒ x = 5, y = −1. Ellenőrzés: 15 + 1 = 16, 10 − 5 = 5.'
  },
  {
    id: 'li-q14',
    level: 2,
    questionTypeBadge: 'Párhuzamos egyenesek',
    question: 'Van-e közös pontja a 6x − 10y = 3 és a −3x + 5y = 2 egyenletű egyenesnek?',
    options: ['Nincs, a két egyenes párhuzamos', 'Végtelen sok, az egyenesek egybeesnek', 'Igen, a (0,5; 0) pont', 'Igen, az (1; 0,3) pont'],
    correctAnswer: 0,
    explanation: 'A második egyenlet −2-szerese 6x − 10y = −4, ami ellentmond a 6x − 10y = 3 egyenletnek: nincs megoldás, az egyenesek párhuzamosak. (A (0,5; 0) csak az elsőre illeszkedik.)'
  },
  {
    id: 'li-q15',
    level: 2,
    questionTypeBadge: 'Grafikus megoldás',
    figure: (
      <LineIntersectionPlane
        xMin={-3}
        xMax={5}
        yMin={-1}
        yMax={5}
        unit={26}
        ticks="all"
        className={FIG}
        lines={[
          { p: [0, 1], q: [2, 2], color: BLUE, label: 'y = 0,5x + 1', labelAt: 0.05, labelDx: 2, labelDy: -10 },
          { p: [0, 4], q: [1, 3], color: RED, label: 'y = −x + 4', labelAt: 0.85, labelDx: -10, labelDy: -10 }
        ]}
      />
    ),
    question: 'Az ábrán az y = 0,5x + 1 és az y = −x + 4 egyenes látható. Mi az y = 0,5x + 1, y = −x + 4 egyenletrendszer megoldása?',
    options: ['x = 2, y = 2', 'x = 2, y = 3', 'x = 0, y = 1', 'x = 4, y = 0'],
    correctAnswer: 0,
    explanation: 'A metszéspont (2; 2): 0,5 · 2 + 1 = 2 és −2 + 4 = 2. Algebrailag: 0,5x + 1 = −x + 4 ⇒ 1,5x = 3 ⇒ x = 2.'
  },
  {
    id: 'li-q16',
    level: 2,
    questionTypeBadge: 'Metszéspont',
    question: 'Melyik pontban metszi a 4x − 5y = 13 egyenletű egyenes az x + 2y = 0 egyenletű egyenest?',
    options: ['(2; −1)', '(−2; 1)', '(1; −2)', '(3; −0,2)'],
    correctAnswer: 0,
    explanation: 'x = −2y, így −8y − 5y = 13 ⇒ y = −1, x = 2. (A (3; −0,2) csak az első egyenletre illeszkedik: 12 + 1 = 13.)'
  },
  {
    id: 'li-q17',
    level: 2,
    questionTypeBadge: 'Kölcsönös helyzet',
    question: 'Milyen a kölcsönös helyzete az 5x + 3y = 43 és a 15x + 9y = 7 egyenletű egyenesnek?',
    options: ['Párhuzamosak, nincs közös pontjuk', 'Egybeesnek', 'Merőlegesen metszik egymást', 'Pontosan egy közös pontjuk van, de nem merőlegesek'],
    correctAnswer: 0,
    explanation: 'Az első egyenlet háromszorosa 15x + 9y = 129, ami ellentmond a 15x + 9y = 7-nek: a megoldáshalmaz üres, az egyenesek párhuzamosak (meredekségük egyaránt −5/3).'
  },
  {
    id: 'li-q18',
    level: 2,
    questionTypeBadge: 'Metszéspont',
    question: 'Hol metszi egymást az y = 2x − 3 és az y = −x + 6 egyenletű egyenes?',
    options: ['(3; 3)', '(1; 5)', '(−3; 9)', '(3; −3)'],
    correctAnswer: 0,
    explanation: '2x − 3 = −x + 6 ⇒ 3x = 9 ⇒ x = 3, y = 3. (Az (1; 5) csak a második, a (3; −3) egyik egyenesre sem illeszkedik.)'
  },
  {
    id: 'li-q19',
    level: 2,
    questionTypeBadge: 'Függőleges egyenes',
    figure: (
      <LineIntersectionPlane
        xMin={-1}
        xMax={6}
        yMin={-5}
        yMax={4}
        unit={22}
        className={FIG}
        lines={[
          { p: [3, 0], q: [3, 1], color: PURPLE, label: 'x = 3', labelAt: 0.95, labelDx: 6 },
          { p: [0, -4], q: [2, 0], color: BLUE, label: 'y = 2x − 4', labelAt: 0.9, labelDx: -78, labelDy: 0 }
        ]}
      />
    ),
    question: 'Melyik pontban metszi egymást az x = 3 és az y = 2x − 4 egyenletű egyenes?',
    options: ['(3; 2)', '(2; 3)', '(3; 10)', '(3; −4)'],
    correctAnswer: 0,
    explanation: 'Az x = 3 egyenes minden pontjának első koordinátája 3, így y = 2 · 3 − 4 = 2. A metszéspont (3; 2).'
  },
  {
    id: 'li-q20',
    level: 2,
    questionTypeBadge: 'Egyenes adott metszésponttal',
    figure: (
      <LineIntersectionPlane
        xMin={-6}
        xMax={2}
        yMin={-2}
        yMax={6}
        unit={24}
        className={FIG}
        lines={[{ p: [-2, 2], q: [0, 5], color: BLUE, label: 'e', labelAt: 0.9 }]}
        points={[{ at: [-3, 0.5], label: '(−3; 0,5)', color: RED, dx: -60, dy: -6 }]}
      />
    ),
    question: 'Az e: −3x + 2y = 10 egyenes átmegy a (−3; 0,5) ponton. Melyik egyenes metszi az e egyenest éppen ebben a pontban?',
    options: ['x = −3', 'y = 1,5x + 5', 'x = 0,5', 'y = −3'],
    correctAnswer: 0,
    explanation: 'Az x = −3 egyenes átmegy a (−3; 0,5) ponton, és nem párhuzamos e-vel, tehát ott metszi. Az y = 1,5x + 5 maga az e egyenes (nem metszi, hanem egybeesik vele), x = 0,5 és y = −3 nem megy át a ponton.'
  },

  // LEVEL 3: Alkalmazás (21–30)
  {
    id: 'li-q21',
    level: 3,
    questionTypeBadge: 'Súlyvonal',
    figure: (
      <LineIntersectionPlane
        xMin={-8}
        xMax={3}
        yMin={-10}
        yMax={8}
        unit={12}
        ticks="none"
        grid={false}
        className="w-full max-w-[200px] h-auto mx-auto"
        polygons={[{ pts: [[-5.5, -8.5], [-2.5, -1.5], [0, 7]], fill: 'rgba(37,99,235,0.07)', stroke: '#94a3b8' }]}
        lines={[
          { p: [-5.5, -8.5], q: [-2.5, -1.5], color: BLUE },
          { p: [0, 7], q: [-4, -5], color: RED, dashed: true }
        ]}
        points={[
          { at: [-5.5, -8.5], label: 'A', dx: 6, dy: 6 },
          { at: [-2.5, -1.5], label: 'B', dx: 6, dy: 8 },
          { at: [0, 7], label: 'C', dx: 6, dy: 0 },
          { at: [-4, -5], label: 'F = ?', color: PURPLE, dx: 8, dy: 6 }
        ]}
      />
    ),
    question: 'Az ABC háromszög AB oldalegyenesének egyenlete 7x − 3y = −13, a C csúcsból induló súlyvonal egyenlete −6x + 2y = 14. Mik az AB oldal F felezőpontjának koordinátái?',
    options: ['(−4; −5)', '(4; 5)', '(−5; −4)', '(−1; 2)'],
    correctAnswer: 0,
    explanation: 'A súlyvonal az AB oldalt a felezőpontjában metszi. y = 3x + 7-et behelyettesítve: 7x − 9x − 21 = −13 ⇒ x = −4, y = −5. (A (−1; 2) rajta van az AB egyenesen, de nincs rajta a súlyvonalon.)'
  },
  {
    id: 'li-q22',
    level: 3,
    questionTypeBadge: 'Súlypont',
    question: 'Az ABC háromszög B-ből induló súlyvonalának egyenlete 2x + 6y = 5, az A-ból induló súlyvonalé x − 5y = 6,5. Hol van a háromszög súlypontja?',
    options: ['(4; −0,5)', '(−4; 0,5)', '(4; 0,5)', '(6,5; 0)'],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonalak közös pontja. x = 6,5 + 5y, így 13 + 10y + 6y = 5 ⇒ y = −0,5, x = 4. Ellenőrzés: 8 − 3 = 5 és 4 + 2,5 = 6,5.'
  },
  {
    id: 'li-q23',
    level: 3,
    questionTypeBadge: 'Egyenes felírása',
    question: 'Melyik egyenes metszi az e: −3x + 2y = 10 egyenest a 2 abszcisszájú pontjában, és meredeksége −3?',
    options: ['y = −3x + 14', 'y = −3x + 8', 'y = −3x + 2', 'y = 3x + 2'],
    correctAnswer: 0,
    explanation: 'x = 2 esetén −6 + 2y = 10 ⇒ y = 8, a pont (2; 8). A −3 meredekségű egyenes: y − 8 = −3(x − 2) ⇒ y = −3x + 14. (Az y = 3x + 2 is átmegy (2; 8)-on, de a meredeksége 3.)'
  },
  {
    id: 'li-q24',
    level: 3,
    questionTypeBadge: 'Egyenes felírása',
    question: 'Melyik egyenes metszi az f: 5x − 3y = 7 egyenest az 1 ordinátájú pontjában, és meredeksége −3?',
    options: ['y = −3x + 7', 'y = −3x + 1', 'y = −3x + 4', 'y = −3x + 5'],
    correctAnswer: 0,
    explanation: 'y = 1 esetén 5x − 3 = 7 ⇒ x = 2, a pont (2; 1). y − 1 = −3(x − 2) ⇒ y = −3x + 7.'
  },
  {
    id: 'li-q25',
    level: 3,
    questionTypeBadge: 'Meredekség reciproka',
    question: 'Melyik az az origón átmenő egyenes, amelynek meredeksége az f: 5x − 3y = 7 egyenes meredekségének reciprokával egyenlő?',
    options: ['y = 3/5 x', 'y = 5/3 x', 'y = −3/5 x', 'y = −5/3 x'],
    correctAnswer: 0,
    explanation: 'f: y = 5/3 x − 7/3, a meredeksége 5/3, ennek reciproka 3/5. Az origón átmenő egyenes: y = 3/5 x. (A −3/5 a negatív reciprok lenne – az a merőleges egyenesé.)'
  },
  {
    id: 'li-q26',
    level: 3,
    questionTypeBadge: 'Törtes metszéspont',
    question: 'Melyik pontban metszi a 4x − 5y = 13 egyenletű egyenes az x + 4y = 4 egyenletű egyenest?',
    options: ['(24/7; 1/7)', '(1/7; 24/7)', '(4; 0)', '(3; −1/5)'],
    correctAnswer: 0,
    explanation: 'x = 4 − 4y, így 16 − 16y − 5y = 13 ⇒ 21y = 3 ⇒ y = 1/7, x = 4 − 4/7 = 24/7. (A (4; 0) csak a második, a (3; −1/5) csak az első egyenesen van.)'
  },
  {
    id: 'li-q27',
    level: 3,
    questionTypeBadge: 'Paraméter',
    question: 'Milyen p érték esetén nincs közös pontja a 2x + py = 3 és a 4x + 6y = 1 egyenletű egyenesnek?',
    options: ['p = 3', 'p = 6', 'p = 12', 'p = −3'],
    correctAnswer: 0,
    explanation: 'Párhuzamosság kell: a bal oldalak arányosak, 2 : 4 = p : 6 ⇒ p = 3. Ekkor 2x + 3y = 3 és 2x + 3y = 0,5 ellentmondó, tehát nincs közös pont.'
  },
  {
    id: 'li-q28',
    level: 3,
    questionTypeBadge: 'Háromszög területe',
    figure: (
      <LineIntersectionPlane
        xMin={-1}
        xMax={7}
        yMin={-1}
        yMax={5}
        unit={26}
        className={FIG}
        polygons={[{ pts: [[0, 0], [6, 0], [3, 3]], fill: 'rgba(124,58,237,0.12)' }]}
        lines={[
          { p: [0, 0], q: [1, 1], color: BLUE, label: 'y = x', labelAt: 0.75, labelDx: -36, labelDy: -4 },
          { p: [6, 0], q: [5, 1], color: RED, label: 'y = −x + 6', labelAt: 0.32, labelDx: 6, labelDy: -2 }
        ]}
        segs={[{ from: [0, 0], to: [6, 0], color: GREEN, width: 3 }]}
      />
    ),
    question: 'Az y = x, az y = −x + 6 és az x tengely (y = 0) által határolt háromszöget színeztük. Mekkora a területe?',
    options: ['9', '18', '6', '4,5'],
    correctAnswer: 0,
    explanation: 'Csúcsok: (0; 0), (6; 0) és a két ferde egyenes metszéspontja: x = −x + 6 ⇒ (3; 3). Alap 6, magasság 3, T = 6 · 3 / 2 = 9.'
  },
  {
    id: 'li-q29',
    level: 3,
    questionTypeBadge: 'Három egyenes egy ponton',
    figure: (
      <LineIntersectionPlane
        xMin={-1}
        xMax={6}
        yMin={-2}
        yMax={6}
        unit={24}
        className={FIG}
        lines={[
          { p: [0, 5], q: [5, 0], color: BLUE, label: 'x + y = 5', labelAt: 0.1, labelDx: 8, labelDy: 2 },
          { p: [1, 0], q: [5, 4], color: RED, label: 'x − y = 1', labelAt: 0.9, labelDx: -66, labelDy: 0 },
          { p: [2, 0], q: [3, 2], color: GREEN, dashed: true, label: 'y = 2x + c', labelAt: 0.92, labelDx: 6, labelDy: 10 }
        ]}
        points={[{ at: [3, 2], label: 'M', color: PURPLE, dx: 8, dy: 4 }]}
      />
    ),
    question: 'Milyen c esetén megy át az y = 2x + c egyenes az x + y = 5 és az x − y = 1 egyenesek M metszéspontján?',
    options: ['c = −4', 'c = 4', 'c = −1', 'c = 2'],
    correctAnswer: 0,
    explanation: 'Összeadva a két egyenletet 2x = 6 ⇒ x = 3, y = 2, tehát M(3; 2). Behelyettesítve 2 = 2 · 3 + c ⇒ c = −4.'
  },
  {
    id: 'li-q30',
    level: 3,
    questionTypeBadge: 'Hajópályák',
    figure: (
      <LineIntersectionPlane
        xMin={-3}
        xMax={6}
        yMin={-4}
        yMax={5}
        unit={26}
        className={FIG}
        lines={[
          { p: [-1, 3], q: [3, -2], color: BLUE, label: 'e', labelAt: 0.06, labelDx: 10, labelDy: 2 },
          { p: [3, -2], q: [4, 2], color: RED, label: 'f', labelAt: 0.93, labelDx: 8, labelDy: 2 }
        ]}
        points={[
          { at: [-1, 3], label: 'A(−1; 3)', dx: 6, dy: -6 },
          { at: [3, -2], label: '?', color: PURPLE, dx: 8, dy: 4 }
        ]}
      />
    ),
    question: 'A NewSea az A(−1; 3) pontból indulva az e: 5x + 4y = 7 egyenesen halad. Mekkora utat tesz meg (egységben), amíg eléri a DrunkenSailor f: 4x − y = 14 pályáját?',
    options: ['√41 ≈ 6,40', '9', '√17 ≈ 4,12', '41'],
    correctAnswer: 0,
    explanation: 'A pályák metszéspontja B(3; −2). Az AB távolság: √((3 + 1)² + (−2 − 3)²) = √(16 + 25) = √41 ≈ 6,40. (A 9 a koordináta-különbségek összege lenne.)'
  }
];

export const LineIntersectionQuiz: React.FC<{
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
      topicId="g11-geo-metszespont-quiz"
      subtopicId="egyenesek-metszespontja"
      title="14. Egyenesek metszéspontja – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: illeszkedés, metszéspont egyenletrendszerrel és grafikusan, párhuzamos és egybeeső egyenesek."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      themeColor="blue"
      questions={LINE_INTERSECTION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Illeszkedés',
          items: [
            'P rajta van e-n ⇔ koordinátáit behelyettesítve igaz kijelentést kapunk.',
            'Metszéspont: MINDKÉT egyenletet kielégíti.',
            'x tengely: y = 0; y tengely: x = 0.',
            'Hajók: B(3; −2) mindkét pályán van.'
          ]
        },
        {
          title: 'Megoldási módszerek',
          items: [
            'Behelyettesítő módszer: az egyik ismeretlent kifejezzük.',
            'Egyenlő együtthatók módszere: az egyenletek kivonása/összeadása.',
            'y = m₁x + b₁ és y = m₂x + b₂ esetén m₁x + b₁ = m₂x + b₂.',
            'Mindig ellenőrizzünk visszahelyettesítéssel!'
          ]
        },
        {
          title: 'Kölcsönös helyzet',
          items: [
            '1 megoldás: metsző egyenesek (különböző meredekség).',
            'Nincs megoldás (pl. 0 = 122): párhuzamos egyenesek.',
            'Végtelen sok (0 = 0): egybeeső egyenesek.',
            'Súlyvonalak metszéspontja: a súlypont.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LineIntersectionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LineIntersectionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LineIntersectionQuiz;
