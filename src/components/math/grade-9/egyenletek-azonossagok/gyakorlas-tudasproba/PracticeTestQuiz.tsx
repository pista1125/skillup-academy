import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeTestMatcher } from './PracticeTestMatcher';
import { PracticeTestSorter } from './PracticeTestSorter';
import {
  AlgebraMasterySvg,
  EquivalenceMapSvg,
  ProblemSolvingMapSvg,
  LinearSystemMapSvg
} from './PracticeTestFigures';
import { ArrowRightLeft, LayoutGrid, Trophy, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';

interface PracticeTestQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Alapműveletek (Könnyű)',
    subtitle: '30 válogatott alapfeladat a III. fejezet összes témaköréből a magabiztos tudásért.',
    range: '1 - 30. feladat',
    focus: 'Azonosságok, egyszerű mérlegelv, alapkikötések és egyszerű rendszerek',
    questions: [
      {
        id: 'ptq1-1',
        questionTypeBadge: 'Betűk szerepe a számolásban',
        question: 'Mennyi a 3x + 7 kifejezés értéke, ha x = 4?',
        figure: <AlgebraMasterySvg size={170} />,
        options: ['19', '18', '21', '12'],
        correctAnswer: 0,
        hint: 'Helyettesíts 4-et az x helyére: 3 · 4 + 7.',
        explanation: '3 · 4 + 7 = 12 + 7 = 19.'
      },
      {
        id: 'ptq1-2',
        questionTypeBadge: 'Betűk szerepe a számolásban',
        question: 'Mi a -5x³y kifejezés együtthatója és fokszáma?',
        options: ['Együtthatója -5, fokszáma 4 (3 + 1)', 'Együtthatója 5, fokszáma 3', 'Együtthatója -5, fokszáma 3', 'Együtthatója 3, fokszáma -5'],
        correctAnswer: 0,
        hint: 'Az együttható a numerikus szorzó (-5), a fokszám a változók kitevőinek összege (3 + 1 = 4).',
        explanation: 'A számszorzó -5. Az x kitevője 3, az y kitevője 1, összegük 3 + 1 = 4.'
      },
      {
        id: 'ptq1-3',
        questionTypeBadge: 'Betűk szerepe a számolásban',
        question: 'Mennyi a 2a - 3b értéke, ha a = 5 és b = -2?',
        options: ['16', '4', '10', '-1'],
        correctAnswer: 0,
        hint: 'Figyelj a negatív előjelre: -3 · (-2) = +6.',
        explanation: '2 · 5 - 3 · (-2) = 10 + 6 = 16.'
      },
      {
        id: 'ptq1-4',
        questionTypeBadge: 'Számolás az algebrában',
        question: 'Vond össze az egynemű tagokat: 4x + 7y - 2x + 3y = ?',
        options: ['2x + 10y', '6x + 10y', '2x + 4y', '12xy'],
        correctAnswer: 0,
        hint: 'Az x-es tagokat külön, az y-os tagokat külön vond össze.',
        explanation: '(4x - 2x) + (7y + 3y) = 2x + 10y.'
      },
      {
        id: 'ptq1-5',
        questionTypeBadge: 'Számolás az algebrában',
        question: 'Bontsd fel a zárójelet: -(3x - 5) = ?',
        figure: <EquivalenceMapSvg size={170} />,
        options: ['-3x + 5', '-3x - 5', '3x - 5', '3x + 5'],
        correctAnswer: 0,
        hint: 'A zárójel előtti mínuszjel minden bent lévő tag előjelét az ellenkezőjére változtatja.',
        explanation: '-(3x - 5) = -3x - (-5) = -3x + 5.'
      },
      {
        id: 'ptq1-6',
        questionTypeBadge: 'Számolás az algebrában',
        question: 'Szorozd össze: 2x · (3x² - 4) = ?',
        options: ['6x³ - 8x', '6x² - 8x', '5x³ - 8x', '6x³ - 4'],
        correctAnswer: 0,
        hint: 'Disztributivitás: 2x · 3x² és 2x · (-4).',
        explanation: '2x · 3x² - 2x · 4 = 6x³ - 8x.'
      },
      {
        id: 'ptq1-7',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Mivel egyenlő az (x + 5)² kifejezés?',
        options: ['x² + 10x + 25', 'x² + 25', 'x² + 5x + 25', 'x² + 10x + 10'],
        correctAnswer: 0,
        hint: '(a + b)² = a² + 2ab + b², ne felejtsd el a 2ab vegyes szorzatot!',
        explanation: 'x² + 2 · x · 5 + 5² = x² + 10x + 25.'
      },
      {
        id: 'ptq1-8',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Mivel egyenlő az (x - 3)² kifejezés?',
        options: ['x² - 6x + 9', 'x² - 9', 'x² - 6x - 9', 'x² + 6x + 9'],
        correctAnswer: 0,
        hint: '(a - b)² = a² - 2ab + b².',
        explanation: 'x² - 2 · x · 3 + 3² = x² - 6x + 9.'
      },
      {
        id: 'ptq1-9',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Mivel egyenlő az (x - 4)(x + 4) szorzat?',
        options: ['x² - 16', 'x² + 16', 'x² - 8x - 16', 'x² - 8'],
        correctAnswer: 0,
        hint: '(a - b)(a + b) = a² - b².',
        explanation: 'x² - 4² = x² - 16.'
      },
      {
        id: 'ptq1-10',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Emelj ki közös tényezőt: 5x + 15 = ?',
        options: ['5(x + 3)', '5(x + 15)', 'x(5 + 15)', '15(x + 1)'],
        correctAnswer: 0,
        hint: 'A legnagyobb közös osztó az 5.',
        explanation: '5x + 15 = 5 · x + 5 · 3 = 5(x + 3).'
      },
      {
        id: 'ptq1-11',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Alakítsd szorzattá a négyzetek különbségét: x² - 36 = ?',
        options: ['(x - 6)(x + 6)', '(x - 6)²', '(x - 18)(x + 18)', '(x + 6)²'],
        correctAnswer: 0,
        hint: 'a² - b² = (a - b)(a + b), ahol a = x és b = 6.',
        explanation: 'x² - 6² = (x - 6)(x + 6).'
      },
      {
        id: 'ptq1-12',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Emelj ki közös tényezőt: 4x² - 6x = ?',
        options: ['2x(2x - 3)', '2(2x² - 3x)', '4x(x - 2)', 'x(4x - 6)'],
        correctAnswer: 0,
        hint: 'Mindkét tag osztható 2-vel és x-szel is, a közös tényező 2x.',
        explanation: '4x² - 6x = 2x · 2x - 2x · 3 = 2x(2x - 3).'
      },
      {
        id: 'ptq1-13',
        questionTypeBadge: 'Egyenletek és mérlegelv',
        question: 'Oldd meg az egyenletet: 3x - 4 = 11.',
        figure: <ProblemSolvingMapSvg size={170} />,
        options: ['x = 5', 'x = 3', 'x = 15', 'x = 7'],
        correctAnswer: 0,
        hint: 'Adj hozzá mindkét oldalhoz 4-et: 3x = 15, majd ossz 3-mal.',
        explanation: '3x - 4 = 11 ⇒ 3x = 15 ⇒ x = 5.'
      },
      {
        id: 'ptq1-14',
        questionTypeBadge: 'Egyenletek és mérlegelv',
        question: 'Oldd meg: 5x + 8 = 2x + 20.',
        options: ['x = 4', 'x = 6', 'x = 2', 'x = 12'],
        correctAnswer: 0,
        hint: 'Vonj ki 2x-et és 8-at mindkét oldalból: 3x = 12.',
        explanation: '5x - 2x = 20 - 8 ⇒ 3x = 12 ⇒ x = 4.'
      },
      {
        id: 'ptq1-15',
        questionTypeBadge: 'Egyenletek és mérlegelv',
        question: 'Oldd meg az egyenletet: x / 4 = 6.',
        options: ['x = 24', 'x = 10', 'x = 1.5', 'x = 2'],
        correctAnswer: 0,
        hint: 'Szorozd meg mindkét oldalt 4-gyel.',
        explanation: 'x / 4 = 6 ⇒ x = 6 · 4 = 24.'
      },
      {
        id: 'ptq1-16',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Oldd meg az egyenlőtlenséget: x + 5 < 12.',
        options: ['x < 7', 'x > 7', 'x ≤ 7', 'x < 17'],
        correctAnswer: 0,
        hint: 'Vonj ki 5-öt mindkét oldalból.',
        explanation: 'x < 12 - 5 ⇒ x < 7.'
      },
      {
        id: 'ptq1-17',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Mi történik a relációs jellel, ha az egyenlőtlenség mindkét oldalát negatív számmal szorozzuk?',
        options: ['Megfordul a relációs jel iránya', 'Változatlan marad', 'Egyenlőségjellé alakul', 'Nem szabad negatív számmal szorozni'],
        correctAnswer: 0,
        hint: 'Pl. 2 < 5 szorozva (-1)-gyel: -2 > -5.',
        explanation: 'Negatív számmal való szorzáskor vagy osztáskor a relációs jel megfordul.'
      },
      {
        id: 'ptq1-18',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Oldd meg a -2x ≤ 8 egyenlőtlenséget.',
        options: ['x ≥ -4', 'x ≤ -4', 'x ≥ 4', 'x ≤ 4'],
        correctAnswer: 0,
        hint: 'Ossz (-2)-vel és fordítsd meg a relációs jelet!',
        explanation: '-2x ≤ 8 ⇒ x ≥ 8 / (-2) ⇒ x ≥ -4.'
      },
      {
        id: 'ptq1-19',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Gondoltam egy számot, elvettem belőle 7-et, majd az eredményt megszoroztam 2-vel, így 18-at kaptam. Mi a gondolt szám?',
        options: ['16', '12', '20', '9'],
        correctAnswer: 0,
        hint: 'Egyenlet: 2(x - 7) = 18. Oszthatsz 2-vel először!',
        explanation: 'x - 7 = 9 ⇒ x = 16. Ellenőrzés: (16 - 7) · 2 = 9 · 2 = 18.'
      },
      {
        id: 'ptq1-20',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Két szám összege 25, különbségük 7. Melyik a nagyobbik szám?',
        options: ['16', '18', '14', '19'],
        correctAnswer: 0,
        hint: 'Legyen a két szám x és x - 7. Összegük x + (x - 7) = 25.',
        explanation: '2x - 7 = 25 ⇒ 2x = 32 ⇒ x = 16. A kisebbik 16 - 7 = 9. Összeg: 16 + 9 = 25.'
      },
      {
        id: 'ptq1-21',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Egy apa 40 éves, fia 12. Hány évvel ezelőtt volt az apa pontosan ötször annyi idős, mint a fia?',
        options: ['5 évvel ezelőtt', '4 évvel ezelőtt', '6 évvel ezelőtt', '8 évvel ezelőtt'],
        correctAnswer: 0,
        hint: 'x évvel ezelőtt az apa 40 - x, a fia 12 - x éves volt. 40 - x = 5(12 - x).',
        explanation: '40 - x = 60 - 5x ⇒ 4x = 20 ⇒ x = 5. (Apa: 35, fia: 7, és 35 = 5 · 7).'
      },
      {
        id: 'ptq1-22',
        questionTypeBadge: 'Alaphalmaz és Értelmezési Tartomány',
        question: 'Mi a feltétele annak, hogy egy törtes kifejezés értelmezhető legyen a valós számok halmazán?',
        options: ['A nevező nem lehet egyenlő nullával', 'A számláló nem lehet egyenlő nullával', 'A számláló nagyobb kell legyen a nevezőnél', 'Csak pozitív számok szerepelhetnek benne'],
        correctAnswer: 0,
        hint: 'Nullával való osztás nincs értelmezve a matematikában.',
        explanation: 'A tört nevezője sosem lehet nulla, ezért mindig ki kell kötni: nevező ≠ 0.'
      },
      {
        id: 'ptq1-23',
        questionTypeBadge: 'Alaphalmaz és Értelmezési Tartomány',
        question: 'Mi az értelmezési tartománya a 7 / (x - 3) kifejezésnek, ha U = ℝ?',
        options: ['Df = ℝ \ {3}', 'Df = ℝ \ {-3}', 'Df = ℝ \ {0}', 'Df = ℝ \ {7}'],
        correctAnswer: 0,
        hint: 'A nevező nem lehet 0: x - 3 ≠ 0.',
        explanation: 'x - 3 ≠ 0 ⇒ x ≠ 3, így Df = ℝ \ {3}.'
      },
      {
        id: 'ptq1-24',
        questionTypeBadge: 'Alaphalmaz és Értelmezési Tartomány',
        question: 'Oldd meg a 2x = 7 egyenletet, ha az alaphalmaz az egész számok halmaza (U = ℤ)!',
        options: ['M = ∅ (nincs megoldás ℤ-ben)', 'M = {3.5}', 'M = {7/2}', 'M = {3}'],
        correctAnswer: 0,
        hint: '2x = 7 megoldása x = 3.5, de a 3.5 benne van-e ℤ-ben?',
        explanation: 'x = 3.5, azonban 3.5 ∉ ℤ. Mivel az alaphalmaz ℤ, a megoldáshalmaz üres: M = ∅.'
      },
      {
        id: 'ptq1-25',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Oldd meg az egyenletet: (x + 3) / 2 = 5.',
        options: ['x = 7', 'x = 10', 'x = 4', 'x = 13'],
        correctAnswer: 0,
        hint: 'Szorozz be a nevezővel (2-vel): x + 3 = 10.',
        explanation: 'x + 3 = 10 ⇒ x = 7.'
      },
      {
        id: 'ptq1-26',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Hogyan célszerű eltüntetni a nevezőket az x/3 + x/4 = 7 egyenletből?',
        options: ['Mindkét oldalt megszorozzuk a legkisebb közös nevezővel, 12-vel', 'Mindkét oldalhoz hozzáadunk 12-t', 'Kivonjuk egymásból a két törtet', 'Megszorozzuk 7-tel mindkét oldalt'],
        correctAnswer: 0,
        hint: 'A 3 és 4 legkisebb közös többszöröse 12.',
        explanation: '12-vel beszorozva 4x + 3x = 84 adódik, eltűnnek a törtek.'
      },
      {
        id: 'ptq1-27',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Oldd meg a 4(x - 2) = 4x - 8 egyenletet!',
        options: ['Minden valós szám megoldás (azonosság)', 'Csak az x = 0 megoldás', 'Csak az x = 2 megoldás', 'Nincs megoldás (ellentmondás)'],
        correctAnswer: 0,
        hint: 'Bontsd fel a zárójelet a bal oldalon: 4x - 8 = 4x - 8.',
        explanation: 'A két oldal azonos, 0 = 0 adódik, tehát minden valós számra igaz.'
      },
      {
        id: 'ptq1-28',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Oldd meg a rendszert: x + y = 10 és x - y = 4.',
        figure: <LinearSystemMapSvg size={170} />,
        options: ['(x; y) = (7; 3)', '(x; y) = (6; 4)', '(x; y) = (8; 2)', '(x; y) = (5; 5)'],
        correctAnswer: 0,
        hint: 'Add össze a két egyenletet: 2x = 14.',
        explanation: '2x = 14 ⇒ x = 7. y = 10 - 7 = 3. Megoldás: (7; 3).'
      },
      {
        id: 'ptq1-29',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Ha y = 2x és x + y = 9, mennyi x és y értéke?',
        options: ['x = 3, y = 6', 'x = 6, y = 3', 'x = 2, y = 4', 'x = 4.5, y = 4.5'],
        correctAnswer: 0,
        hint: 'Helyettesíts 2x-et az y helyére: x + 2x = 9.',
        explanation: '3x = 9 ⇒ x = 3, így y = 2 · 3 = 6.'
      },
      {
        id: 'ptq1-30',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Mit jelent geometriailag két lineáris egyenlet rendszerének megoldása?',
        options: ['A két egyenlethez tartozó egyenes metszéspontjának koordinátáit', 'A két egyenes meredekségének összegét', 'Az egyenesek x-tengellyel bezárt szögét', 'A két egyenes távolságát'],
        correctAnswer: 0,
        hint: 'Minden ax + by = c alakú egyenlet egy egyenest határoz meg a koordinátarendszerben.',
        explanation: 'A rendszer (x; y) megoldása a két egyenes közös pontja, azaz metszéspontja.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Alkalmazások, Modellezés és Módszertan (Közepes)',
    subtitle: '30 feladat a zárójelbontásokból, törtek közös nevezőjéből, szöveges feladatokból és rendszerekből.',
    range: '31 - 60. feladat',
    focus: 'Szorzattá alakítás, életkor és keverés, értelmezési tartomány, kiküszöbölés',
    questions: [
      {
        id: 'ptq2-1',
        questionTypeBadge: 'Algebrai kifejezések',
        question: 'Mennyi a 2x² - 3xy + y² értéke, ha x = -2 és y = 3?',
        figure: <AlgebraMasterySvg size={170} />,
        options: ['35', '17', '-1', '29'],
        correctAnswer: 0,
        hint: 'Számold ki tagonként: 2(-2)², -3(-2)(3), és 3².',
        explanation: '2 · 4 - 3 · (-2) · 3 + 9 = 8 - (-18) + 9 = 8 + 18 + 9 = 35.'
      },
      {
        id: 'ptq2-2',
        questionTypeBadge: 'Algebrai kifejezések',
        question: 'Milyen x értékre lesz a 4x - 12 kifejezés értéke pontosan 0?',
        options: ['x = 3', 'x = -3', 'x = 4', 'x = 12'],
        correctAnswer: 0,
        hint: 'Állítsd egyenlővé nullával: 4x - 12 = 0.',
        explanation: '4x = 12 ⇒ x = 3. Ezt nevezzük a kifejezés zérushelyének.'
      },
      {
        id: 'ptq2-3',
        questionTypeBadge: 'Algebrai műveletek',
        question: 'Végezd el a szorzást és vond össze: (2x - 3)(x + 4) = ?',
        options: ['2x² + 5x - 12', '2x² - 5x - 12', '2x² + 11x - 12', '2x² - 12'],
        correctAnswer: 0,
        hint: 'Minden tagot minden taggal: 2x · x + 2x · 4 - 3 · x - 3 · 4.',
        explanation: '2x² + 8x - 3x - 12 = 2x² + 5x - 12.'
      },
      {
        id: 'ptq2-4',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Fejtsd ki a (3x - 2y)² kifejezést!',
        options: ['9x² - 12xy + 4y²', '9x² - 6xy + 4y²', '9x² - 4y²', '9x² + 12xy + 4y²'],
        correctAnswer: 0,
        hint: '(a - b)² = a² - 2ab + b², ahol a = 3x és b = 2y. A vegyes szorzat 2 · 3x · 2y = 12xy.',
        explanation: '(3x)² - 2 · (3x) · (2y) + (2y)² = 9x² - 12xy + 4y².'
      },
      {
        id: 'ptq2-5',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Egyszerűsítsd: (x + 3)² - (x - 3)² = ?',
        figure: <EquivalenceMapSvg size={170} />,
        options: ['12x', '0', '2x² + 18', '6x'],
        correctAnswer: 0,
        hint: '(x² + 6x + 9) - (x² - 6x + 9). Ügyelj a mínuszra!',
        explanation: 'x² + 6x + 9 - x² + 6x - 9 = 12x.'
      },
      {
        id: 'ptq2-6',
        questionTypeBadge: 'Nevezetes szorzatok',
        question: 'Melyik számmal kell kiegészíteni az x² + 8x kifejezést, hogy teljes négyzet legyen?',
        options: ['16', '64', '8', '4'],
        correctAnswer: 0,
        hint: 'A középső tag 2 · b · x = 8x, tehát b = 4. A hiányzó tag b².',
        explanation: 'x² + 2 · 4 · x + 4² = (x + 4)², tehát 16 a hiányzó szám.'
      },
      {
        id: 'ptq2-7',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Alakítsd szorzattá: 3x² - 12 = ?',
        options: ['3(x - 2)(x + 2)', '3(x - 2)²', '(3x - 6)(x + 2)', '(x - 2)(3x + 6)'],
        correctAnswer: 0,
        hint: 'Előbb emelj ki 3-at: 3(x² - 4), majd használd a négyzetek különbségét.',
        explanation: '3(x² - 4) = 3(x - 2)(x + 2).'
      },
      {
        id: 'ptq2-8',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Alakítsd szorzattá a teljes négyzetet: 4x² + 12x + 9 = ?',
        options: ['(2x + 3)²', '(4x + 9)²', '(2x - 3)²', '(2x + 9)²'],
        correctAnswer: 0,
        hint: 'a = 2x, b = 3. Ellenőrizd: 2 · 2x · 3 = 12x.',
        explanation: '(2x + 3)² = 4x² + 12x + 9.'
      },
      {
        id: 'ptq2-9',
        questionTypeBadge: 'Szorzattá alakítás',
        question: 'Alakítsd szorzattá csoportosítással: ax + ay + bx + by = ?',
        options: ['(a + b)(x + y)', '(a + x)(b + y)', 'ab(x + y)', '(ax + by)(1 + 1)'],
        correctAnswer: 0,
        hint: 'Kiemelés páronként: a(x + y) + b(x + y).',
        explanation: 'a(x + y) + b(x + y) = (a + b)(x + y).'
      },
      {
        id: 'ptq2-10',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Oldd meg a 3(2x - 1) - 2(x + 4) = 5 egyenletet!',
        options: ['x = 4', 'x = 3', 'x = 2', 'x = 5'],
        correctAnswer: 0,
        hint: 'Bontsd fel a zárójeleket: 6x - 3 - 2x - 8 = 5.',
        explanation: '4x - 11 = 5 ⇒ 4x = 16 ⇒ x = 4.'
      },
      {
        id: 'ptq2-11',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Oldd meg: (2x - 1) / 3 - (x + 2) / 4 = 1.',
        options: ['x = 4.4 (vagy 22/5)', 'x = 5', 'x = 3', 'x = 12'],
        correctAnswer: 0,
        hint: 'Szorozz be a közös nevezővel, 12-vel: 4(2x - 1) - 3(x + 2) = 12.',
        explanation: '8x - 4 - 3x - 6 = 12 ⇒ 5x - 10 = 12 ⇒ 5x = 22 ⇒ x = 22/5 = 4.4.'
      },
      {
        id: 'ptq2-12',
        questionTypeBadge: 'Egyenletek megoldása',
        question: 'Oldd meg: 2x - (5 - x) = 3x + 1.',
        options: ['Nincs megoldás (ellentmondás)', 'Minden valós szám megoldás', 'x = 0', 'x = -6'],
        correctAnswer: 0,
        hint: 'Bal oldal: 2x - 5 + x = 3x - 5. Egyenlet: 3x - 5 = 3x + 1.',
        explanation: 'Kivonva 3x-et mindkét oldalból: -5 = 1. Ez lehetetlen, tehát M = ∅.'
      },
      {
        id: 'ptq2-13',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Oldd meg a 4 - 3x ≥ 2x - 11 egyenlőtlenséget!',
        figure: <ProblemSolvingMapSvg size={170} />,
        options: ['x ≤ 3', 'x ≥ 3', 'x ≤ -3', 'x ≥ -3'],
        correctAnswer: 0,
        hint: '-5x ≥ -15. Ne felejtsd el megfordítani a relációs jelet a negatívval való osztáskor!',
        explanation: '4 - 3x ≥ 2x - 11 ⇒ -5x ≥ -15 ⇒ x ≤ 3.'
      },
      {
        id: 'ptq2-14',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Hogyan jelöljük intervallumként azokat a valós számokat, amelyekre x > -2 és x ≤ 5?',
        options: [']-2; 5]', '[-2; 5[', '[-2; 5]', ']-2; 5['],
        correctAnswer: 0,
        hint: 'Szigorú egyenlőtlenségnél (>) nyílt kapocs, megengedőnél (≤) zárt kapocs jár.',
        explanation: 'Balról nyílt ]-2, jobbról zárt 5], tehát ]-2; 5].'
      },
      {
        id: 'ptq2-15',
        questionTypeBadge: 'Egyenlőtlenségek',
        question: 'Hány pozitív egész megoldása van a 2x - 7 < 4 egyenlőtlenségnek?',
        options: ['5 megoldás (1, 2, 3, 4, 5)', '6 megoldás', '4 megoldás', 'Végtelen sok'],
        correctAnswer: 0,
        hint: '2x < 11 ⇒ x < 5.5. A pozitív egészek: 1, 2, 3, 4, 5.',
        explanation: 'x < 5.5. A szóba jöhető pozitív egészek halmaza {1; 2; 3; 4; 5}, ez pontosan 5 szám.'
      },
      {
        id: 'ptq2-16',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Egy téglalap kerülete 36 cm, egyik oldala 4 cm-rel hosszabb a másiknál. Hány cm hosszúak az oldalak?',
        options: ['7 cm és 11 cm', '6 cm és 10 cm', '8 cm és 12 cm', '5 cm és 13 cm'],
        correctAnswer: 0,
        hint: 'Kerület: 2(a + b) = 36 ⇒ a + b = 18. Mivel b = a + 4, a + (a + 4) = 18.',
        explanation: '2a + 4 = 18 ⇒ 2a = 14 ⇒ a = 7 cm, b = 11 cm. Ellenőrzés: 2·(7+11) = 36.'
      },
      {
        id: 'ptq2-17',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Két munkás együtt 6 óra alatt végezne el egy munkát. Az egyik egyedül 10 óra alatt készítené el. Hány óra kell a másiknak egyedül?',
        options: ['15 óra', '12 óra', '16 óra', '14 óra'],
        correctAnswer: 0,
        hint: 'Munkateljesítmények 1 óra alatt: 1/10 + 1/x = 1/6.',
        explanation: '1/x = 1/6 - 1/10 = 5/30 - 3/30 = 2/30 = 1/15 ⇒ x = 15 óra.'
      },
      {
        id: 'ptq2-18',
        questionTypeBadge: 'Szöveges feladatok',
        question: 'Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, 27-tel nagyobb számot kapunk. Mi az eredeti szám?',
        options: ['36', '27', '45', '18'],
        correctAnswer: 0,
        hint: 'Számjegyek a és 9 - a. Eredeti szám 10a + (9-a), felcserélt 10(9-a) + a.',
        explanation: 'Felcserélt - Eredeti = 27 ⇒ 9(9 - 2a) = 27 ⇒ 9 - 2a = 3 ⇒ 2a = 6 ⇒ a = 3. A szám: 36 (felcserélve 63, és 63 - 36 = 27).'
      },
      {
        id: 'ptq2-19',
        questionTypeBadge: 'Keverési feladatok',
        question: 'Hány gramm 40%-os sóoldatot kapunk, ha 200 g 20%-os és 300 g 50%-os sóoldatot összekeverünk?',
        options: ['500 g 38%-os oldatot kapunk (nem 40%-osat)', '500 g 40%-os oldatot', '400 g 35%-os oldatot', '500 g 35%-os oldatot'],
        correctAnswer: 0,
        hint: 'Sómennyiségek: 200 · 0.20 = 40 g és 300 · 0.50 = 150 g. Összes só = 190 g. Töménység = 190 / 500.',
        explanation: '190 / 500 = 0.38 = 38%. Az össztömeg 500 g, a kapott koncentráció 38%.'
      },
      {
        id: 'ptq2-20',
        questionTypeBadge: 'Keverési feladatok',
        question: 'Mennyi tiszta vizet kell hozzáadni 300 g 60%-os sziruphoz, hogy 30%-os szirupot kapjunk?',
        options: ['300 g vizet', '150 g vizet', '200 g vizet', '600 g vizet'],
        correctAnswer: 0,
        hint: 'Oldott cukor nem változik: 300 · 0.60 = 180 g. Új tömeg: 180 / 0.30 = 600 g.',
        explanation: 'Új tömeg = 600 g. Hozzáadott víz = 600 - 300 = 300 g.'
      },
      {
        id: 'ptq2-21',
        questionTypeBadge: 'Keverési feladatok',
        question: 'Egy apa most négyszer annyi idős, mint a fia. 6 év múlva már csak két és félszer annyi idős lesz. Hány évesek most?',
        options: ['Apa 24, fia 6 éves', 'Apa 32, fia 8 éves', 'Apa 28, fia 7 éves', 'Apa 36, fia 9 éves'],
        correctAnswer: 0,
        hint: 'apa = 4x. 6 év múlva: 4x + 6 = 2.5(x + 6).',
        explanation: '4x + 6 = 2.5x + 15 ⇒ 1.5x = 9 ⇒ x = 6. Apa: 4 · 6 = 24 év, fia: 6 év.'
      },
      {
        id: 'ptq2-22',
        questionTypeBadge: 'Értelmezési tartomány',
        question: 'Mi az értelmezési tartománya a (3x - 1) / (x² - 9) kifejezésnek?',
        options: ['Df = ℝ \ {-3; 3}', 'Df = ℝ \ {3}', 'Df = ℝ \ {9}', 'Df = ℝ \ {0}'],
        correctAnswer: 0,
        hint: 'x² - 9 = 0 két helyen: x = 3 és x = -3.',
        explanation: 'x² - 9 ≠ 0 ⇒ (x - 3)(x + 3) ≠ 0 ⇒ x ≠ 3 és x ≠ -3. Df = ℝ \ {-3; 3}.'
      },
      {
        id: 'ptq2-23',
        questionTypeBadge: 'Kikötések és hamis gyök',
        question: 'Oldd meg: (2x - 8) / (x - 4) = 2.',
        options: ['M = ℝ \ {4}', 'M = {4}', 'M = ∅', 'M = ℝ'],
        correctAnswer: 0,
        hint: 'Kikötés: x ≠ 4. A bal oldal 2(x - 4)/(x - 4) = 2 minden x ≠ 4-re.',
        explanation: 'Bár azonosság, de az x = 4 pontban nincs értelmezve! Ezért M = ℝ \ {4}.'
      },
      {
        id: 'ptq2-24',
        questionTypeBadge: 'Kikötések és hamis gyök',
        question: 'Mi az x / (x - 2) = 2 / (x - 2) + 3 egyenlet megoldása?',
        options: ['Nincs megoldás (x = 2 hamis gyök)', 'x = 2', 'x = -1', 'x = 5'],
        correctAnswer: 0,
        hint: 'Kikötés: x ≠ 2. Szorozz be (x - 2)-vel: x = 2 + 3(x - 2).',
        explanation: 'x = 2 + 3x - 6 ⇒ x = 3x - 4 ⇒ -2x = -4 ⇒ x = 2. De x = 2 nem eleme a Df-nek! M = ∅.'
      },
      {
        id: 'ptq2-25',
        questionTypeBadge: 'Ekvivalencia és egyenletek',
        question: 'Melyik átalakítás NEM ekvivalens az egyenletmegoldás során?',
        options: ['Mindkét oldal osztása ismeretlennel (pl. x-szel)', 'Mindkét oldalhoz ugyanannak a valós számnak a hozzáadása', 'Mindkét oldal szorzása egy nem nulla valós számmal', 'Zárójelek kibontása és tagok összevonása'],
        correctAnswer: 0,
        hint: 'Ismeretlennel való osztás gyökvesztéshez vezethet (ha az ismeretlen 0-val egyenlő).',
        explanation: 'Ismeretlennel osztani veszélyes, mert elveszíthetjük a 0-vá tévő megoldásokat.'
      },
      {
        id: 'ptq2-26',
        questionTypeBadge: 'Ekvivalencia és egyenletek',
        question: 'Miért hamis a következő levezetés: x² = 4x ⇒ x = 4?',
        options: ['Mert x-szel osztottunk, és elveszett az x = 0 gyök', 'Mert 4x-ből nem lehet gyököt vonni', 'Mert x = -4 is gyök', 'A levezetés hibátlan, x = 4 az egyetlen gyök'],
        correctAnswer: 0,
        hint: 'x² - 4x = 0 ⇒ x(x - 4) = 0, két megoldás van: x = 0 és x = 4.',
        explanation: 'Ismeretlennel való osztás miatt az x = 0 megoldás elveszett (gyökvesztés).'
      },
      {
        id: 'ptq2-27',
        questionTypeBadge: 'Ekvivalencia és egyenletek',
        question: 'Milyen veszéllyel jár egy egyenlet mindkét oldalának négyzetre emelése?',
        options: ['Gyökbevitel (hamis gyökök jelenhetnek meg)', 'Gyökvesztés (megoldások tűnnek el)', 'Nem változik semmi', 'Megfordul az egyenlőség iránya'],
        correctAnswer: 0,
        hint: 'Pl. x = 2 négyzetre emelve x² = 4, aminek már az x = -2 is megoldása.',
        explanation: 'A négyzetre emelés nem kölcsönösen egyértelmű művelet, idegen (hamis) gyökök keletkezhetnek.'
      },
      {
        id: 'ptq2-28',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Oldd meg a 2x + 3y = 13 és x - 2y = -4 rendszert!',
        figure: <LinearSystemMapSvg size={170} />,
        options: ['(x; y) = (2; 3)', '(x; y) = (3; 2)', '(x; y) = (5; 1)', '(x; y) = (1; 3)'],
        correctAnswer: 0,
        hint: 'A másodikból x = 2y - 4. Helyettesítsd az elsőbe: 2(2y - 4) + 3y = 13.',
        explanation: '4y - 8 + 3y = 13 ⇒ 7y = 21 ⇒ y = 3. x = 2(3) - 4 = 2. Megoldás: (2; 3).'
      },
      {
        id: 'ptq2-29',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Oldd meg az egyenlő együtthatók módszerével: 3x + 2y = 16 és 5x - 2y = 16.',
        options: ['(x; y) = (4; 2)', '(x; y) = (2; 5)', '(x; y) = (3; 3)', '(x; y) = (4; 0)'],
        correctAnswer: 0,
        hint: 'Mivel a 2y és -2y ellentett előjelű, add össze a két egyenletet: 8x = 32.',
        explanation: '8x = 32 ⇒ x = 4. 3(4) + 2y = 16 ⇒ 12 + 2y = 16 ⇒ 2y = 4 ⇒ y = 2.'
      },
      {
        id: 'ptq2-30',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Hány megoldása van a 2x + 4y = 10 és x + 2y = 7 rendszernek?',
        options: ['0 megoldás (párhuzamosak, ellentmondás)', 'Pontosan 1 megoldás', 'Végtelen sok megoldás', '2 megoldás'],
        correctAnswer: 0,
        hint: 'Szorozd meg a második egyenletet 2-vel: 2x + 4y = 14. Hasonlítsd össze az elsővel!',
        explanation: '2x + 4y = 10 és 2x + 4y = 14 kivonva egymásból: 0 = -4. Ellentmondás, nincs megoldás.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Problémák, Csapdák és Versenyfeladatok (Nehéz)',
    subtitle: '30 haladó feladat: hamis gyökök kiszűrése, mozgásos feladatok, paraméteres egyenletek és szorzat alak.',
    range: '61 - 90. feladat',
    focus: 'Ekvivalencia, kieső gyökök, abszolútérték, sebesség-idő, kétismeretlenes vizsgálatok',
    questions: [
      {
        id: 'ptq3-1',
        questionTypeBadge: 'Azonosságok és szélsőérték',
        question: 'Mennyi az x² - 6x + 14 másodfokú kifejezés legkisebb értéke és hol veszi fel?',
        figure: <AlgebraMasterySvg size={170} />,
        options: ['Minimuma 5, az x = 3 helyen', 'Minimuma 14, az x = 0 helyen', 'Minimuma -5, az x = -3 helyen', 'Minimuma 0, az x = 6 helyen'],
        correctAnswer: 0,
        hint: 'Alakítsd teljes négyzetté: (x - 3)² + 5. A négyzetszám mindig ≥ 0.',
        explanation: 'x² - 6x + 14 = (x - 3)² - 9 + 14 = (x - 3)² + 5. Mivel (x - 3)² ≥ 0, a minimum 5, mikor x = 3.'
      },
      {
        id: 'ptq3-2',
        questionTypeBadge: 'Azonosságok alkalmazása',
        question: 'Számold ki számológép nélkül: 1005² - 995² = ?',
        options: ['20 000', '10 000', '40 000', '19 900'],
        correctAnswer: 0,
        hint: 'Használd az a² - b² = (a - b)(a + b) azonosságot!',
        explanation: '(1005 - 995)(1005 + 995) = 10 · 2000 = 20 000.'
      },
      {
        id: 'ptq3-3',
        questionTypeBadge: 'Törtes kifejezések',
        question: 'Egyszerűsítsd a (x² - 16) / (2x - 8) törtet, ha x ≠ 4!',
        options: ['(x + 4) / 2', '(x - 4) / 2', 'x + 2', '(x² - 8) / x'],
        correctAnswer: 0,
        hint: 'Számláló: (x - 4)(x + 4), nevező: 2(x - 4). Egyszerűsíts (x - 4)-gyel.',
        explanation: '(x - 4)(x + 4) / [2(x - 4)] = (x + 4) / 2.'
      },
      {
        id: 'ptq3-4',
        questionTypeBadge: 'Szorzat alakú egyenletek',
        question: 'Melyek a (2x - 6)(3x + 9) = 0 egyenlet gyökei a valós számok halmazán?',
        options: ['x = 3 és x = -3', 'Csak x = 3', 'Csak x = -3', 'x = 6 és x = -9'],
        correctAnswer: 0,
        hint: 'Egy szorzat pontosan akkor nulla, ha legalább az egyik tényezője nulla.',
        explanation: '2x - 6 = 0 ⇒ x = 3, vagy 3x + 9 = 0 ⇒ x = -3.'
      },
      {
        id: 'ptq3-5',
        questionTypeBadge: 'Szorzat alakú egyenletek',
        question: 'Oldd meg az x³ - 4x = 0 egyenletet!',
        figure: <EquivalenceMapSvg size={170} />,
        options: ['x₁ = 0, x₂ = 2, x₃ = -2', 'Csak x = 2 és x = -2', 'Csak x = 0', 'x₁ = 0, x₂ = 4'],
        correctAnswer: 0,
        hint: 'Emelj ki x-et: x(x² - 4) = 0, majd alakítsd szorzattá a zárójelet: x(x - 2)(x + 2) = 0.',
        explanation: 'Három tényező van: x = 0, x = 2, x = -2.'
      },
      {
        id: 'ptq3-6',
        questionTypeBadge: 'Szorzat alakú egyenletek',
        question: 'Oldd meg a (x + 5)² = 4 egyenletet!',
        options: ['x = -3 és x = -7', 'x = -3', 'x = 3 és x = 7', 'x = -1 és x = -9'],
        correctAnswer: 0,
        hint: 'x + 5 = 2 vagy x + 5 = -2.',
        explanation: 'x + 5 = 2 ⇒ x = -3;  x + 5 = -2 ⇒ x = -7.'
      },
      {
        id: 'ptq3-7',
        questionTypeBadge: 'Abszolútértékes egyenletek',
        question: 'Oldd meg a |2x - 5| = 9 egyenletet!',
        options: ['x = 7 és x = -2', 'x = 7', 'x = -7 és x = 2', 'x = 2 és x = -7'],
        correctAnswer: 0,
        hint: 'Két eset: 2x - 5 = 9 vagy 2x - 5 = -9.',
        explanation: '1. eset: 2x = 14 ⇒ x = 7. 2. eset: 2x = -4 ⇒ x = -2.'
      },
      {
        id: 'ptq3-8',
        questionTypeBadge: 'Abszolútértékes egyenletek',
        question: 'Oldd meg a |x + 3| = -4 egyenletet!',
        options: ['M = ∅ (nincs megoldás)', 'x = 1 és x = -7', 'x = -1', 'x = 7'],
        correctAnswer: 0,
        hint: 'Egy valós szám abszolút értéke sosem lehet negatív!',
        explanation: '|x + 3| ≥ 0 minden valós számra, így sosem lehet egyenlő -4-gyel. M = ∅.'
      },
      {
        id: 'ptq3-9',
        questionTypeBadge: 'Abszolútértékes egyenletek',
        question: 'Oldd meg a |x - 2| = 2x - 5 egyenletet!',
        options: ['x = 3 (az x = 1 hamis gyök)', 'x = 3 és x = 1', 'x = 1', 'Nincs megoldás'],
        correctAnswer: 0,
        hint: 'Kikötés: a jobb oldal nem lehet negatív: 2x - 5 ≥ 0 ⇒ x ≥ 2.5.',
        explanation: 'Ha x - 2 = 2x - 5 ⇒ x = 3 (jó, mert 3 ≥ 2.5). Ha x - 2 = -(2x - 5) ⇒ 3x = 7 ⇒ x = 7/3 ≈ 2.33 (kiesik, mert 2x - 5 negatív lenne). Megoldás: x = 3.'
      },
      {
        id: 'ptq3-10',
        questionTypeBadge: 'Összetett törtes egyenletek',
        question: 'Oldd meg: (x + 3) / (x - 2) + 1 = 5 / (x - 2).',
        options: ['M = ∅ (az x = 2 kiesik a kikötés miatt)', 'x = 2', 'x = 4', 'x = 0'],
        correctAnswer: 0,
        hint: 'Kikötés: x ≠ 2. Szorozz be (x - 2)-vel: (x + 3) + (x - 2) = 5.',
        explanation: '2x + 1 = 5 ⇒ 2x = 4 ⇒ x = 2. Mivel a kikötés szerint x ≠ 2, ez hamis gyök! Megoldáshalmaz: M = ∅.'
      },
      {
        id: 'ptq3-11',
        questionTypeBadge: 'Összetett törtes egyenletek',
        question: 'Oldd meg: 3 / (x - 1) = 2 / (x + 2).',
        options: ['x = -8', 'x = 8', 'x = -4', 'x = 5'],
        correctAnswer: 0,
        hint: 'Keresztbe szorzás (ha x ≠ 1 és x ≠ -2): 3(x + 2) = 2(x - 1).',
        explanation: '3x + 6 = 2x - 2 ⇒ x = -8. Ellenőrzés: 3/(-9) = -1/3 és 2/(-6) = -1/3 (Igaz).'
      },
      {
        id: 'ptq3-12',
        questionTypeBadge: 'Összetett törtes egyenletek',
        question: 'Mi az értelmezési tartománya az 1 / (x² - 4) + 1 / (x + 2) = 3 egyenletnek?',
        options: ['Df = ℝ \ {-2; 2}', 'Df = ℝ \ {2}', 'Df = ℝ \ {-2}', 'Df = ℝ \ {4}'],
        correctAnswer: 0,
        hint: 'x² - 4 = (x - 2)(x + 2). Mindkét nevezőnek nullától különbözőnek kell lennie.',
        explanation: 'A nevezők zérushelyei 2 és -2, tehát ezeket ki kell zárni a valós számokból.'
      },
      {
        id: 'ptq3-13',
        questionTypeBadge: 'Mozgásos feladatok',
        question: 'Két város távolsága 180 km. Két autó egyszerre indul szembe egymással: az egyik 50 km/h, a másik 70 km/h sebességgel. Hány óra múlva találkoznak?',
        figure: <ProblemSolvingMapSvg size={170} />,
        options: ['1.5 óra múlva', '2 óra múlva', '1 óra 40 perc múlva', '2.5 óra múlva'],
        correctAnswer: 0,
        hint: 'Szembehaladáskor a relatív közeledési sebesség v₁ + v₂ = 50 + 70 = 120 km/h. t = s / v.',
        explanation: 't = 180 / 120 = 1.5 óra (1 óra 30 perc).'
      },
      {
        id: 'ptq3-14',
        questionTypeBadge: 'Mozgásos feladatok',
        question: 'Egy motoros 60 km/h sebességgel halad. 20 perccel később utána indul egy autó 80 km/h-val. Hány km-re a starttól éri utol az autó a motorost?',
        options: ['80 km-re', '60 km-re', '100 km-re', '120 km-re'],
        correctAnswer: 0,
        hint: '20 perc = 1/3 óra. A motoros előnye 60 · (1/3) = 20 km. A sebességkülönbség 80 - 60 = 20 km/h.',
        explanation: 'Utolérési idő: 20 km / 20 km/h = 1 óra. Megtett távolság: 80 km/h · 1 h = 80 km.'
      },
      {
        id: 'ptq3-15',
        questionTypeBadge: 'Mozgásos feladatok',
        question: 'Egy folyami hajó sebessége állóvízben 18 km/h, a folyó folyási sebessége 2 km/h. Mennyi idő alatt tesz meg a hajó 40 km-t a folyásirányban és 40 km-t vissza?',
        options: ['4.5 óra', '4 óra', '5 óra', '4.25 óra'],
        correctAnswer: 0,
        hint: 'Lefelé v = 18 + 2 = 20 km/h, felfelé v = 18 - 2 = 16 km/h. Idők: 40/20 és 40/16.',
        explanation: 't₁ = 40 / 20 = 2 óra; t₂ = 40 / 16 = 2.5 óra. Összidő = 2 + 2.5 = 4.5 óra.'
      },
      {
        id: 'ptq3-16',
        questionTypeBadge: 'Keverési feladatok',
        question: 'Hány kg 20%-os és hány kg 50%-os savat kell összeönteni, hogy 30 kg 30%-os savat kapjunk?',
        options: ['20 kg 20%-os és 10 kg 50%-os', '15 kg 20%-os és 15 kg 50%-os', '25 kg 20%-os és 5 kg 50%-os', '18 kg 20%-os és 12 kg 50%-os'],
        correctAnswer: 0,
        hint: 'x + y = 30 és 0.20x + 0.50y = 0.30 · 30 = 9.',
        explanation: 'y = 30 - x ⇒ 0.20x + 0.50(30 - x) = 9 ⇒ -0.30x + 15 = 9 ⇒ 0.30x = 6 ⇒ x = 20 kg, y = 10 kg.'
      },
      {
        id: 'ptq3-17',
        questionTypeBadge: 'Keverési feladatok',
        question: 'Elpárologtatunk némi vizet 500 g 10%-os sóoldatból, így a töménysége 25%-ra nő. Hány gramm víz párolgott el?',
        options: ['300 g víz', '250 g víz', '200 g víz', '150 g víz'],
        correctAnswer: 0,
        hint: 'Oldott só nem változik: 500 · 0.10 = 50 g. Az új oldat tömege: 50 / 0.25 = 200 g.',
        explanation: 'Az új oldat tömege 200 g, tehát 500 - 200 = 300 g víz párolgott el.'
      },
      {
        id: 'ptq3-18',
        questionTypeBadge: 'Szöveges modellezés',
        question: 'Egy áruházban egy nadrág árát 20%-kal leszállították, majd az új árat 10%-kal emelték, így 17 600 Ft lett. Mennyi volt az eredeti ára?',
        options: ['20 000 Ft', '19 000 Ft', '22 000 Ft', '21 500 Ft'],
        correctAnswer: 0,
        hint: 'Eredeti ár: x. Leszállítás után 0.80x, felemelés után 0.80x · 1.10 = 0.88x = 17 600.',
        explanation: '0.88x = 17 600 ⇒ x = 17 600 / 0.88 = 20 000 Ft.'
      },
      {
        id: 'ptq3-19',
        questionTypeBadge: 'Paraméteres egyenletek',
        question: 'Milyen a valós paraméter esetén NINCS megoldása az ax + 3 = 2x + 7 egyenletnek?',
        options: ['a = 2', 'a = 0', 'a = 4', 'a = -2'],
        correctAnswer: 0,
        hint: 'Rendezd x-re: (a - 2)x = 4. Mikor nem oszthatunk (a - 2)-vel?',
        explanation: 'Ha a = 2, akkor 0 · x = 4 adódik, aminek nincs megoldása (0 = 4 ellentmondás).'
      },
      {
        id: 'ptq3-20',
        questionTypeBadge: 'Paraméteres egyenletek',
        question: 'Milyen p paraméter esetén lesz a px - 6 = 2(x - 3) egyenletnek VÉGTELEN SOK megoldása?',
        options: ['p = 2', 'p = 0', 'p = 3', 'p = -2'],
        correctAnswer: 0,
        hint: 'Bontsd fel a jobb oldalt: px - 6 = 2x - 6. A két oldal pontosan mikor egyezik meg minden x-re?',
        explanation: 'px - 6 = 2x - 6 ⇒ (p - 2)x = 0. Ha p = 2, akkor 0 · x = 0, ami minden x valós számra igaz.'
      },
      {
        id: 'ptq3-21',
        questionTypeBadge: 'Egyenletek elmélete',
        question: 'Mi a különbség egy azonosság és egy egyenlet között?',
        options: ['Az azonosság az értelmezési tartomány minden elemére igaz, az egyenlet csak bizonyos x értékekre', 'Az azonosságban nincsenek ismeretlenek', 'Az azonosságnak mindig 0 a jobb oldala', 'Nincs semmi különbség, a két szó szinonima'],
        correctAnswer: 0,
        hint: 'Pl. (x + 1)² = x² + 2x + 1 minden x-re igaz (azonosság), de 2x + 1 = 5 csak x = 2-re.',
        explanation: 'Az azonosság olyan egyenlőség, amely a benne szereplő változók minden megengedett értékére igaz.'
      },
      {
        id: 'ptq3-22',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Oldd meg a 3x - 4y = 1 és 2x + 3y = 12 egyenletrendszert!',
        options: ['(x; y) = (3; 2)', '(x; y) = (2; 3)', '(x; y) = (4; 1)', '(x; y) = (1; 2)'],
        correctAnswer: 0,
        hint: 'Szorozd az elsőt 3-mal (9x - 12y = 3), a másodikat 4-gyel (8x + 12y = 48), majd add össze őket: 17x = 51.',
        explanation: '17x = 51 ⇒ x = 3. 2(3) + 3y = 12 ⇒ 6 + 3y = 12 ⇒ 3y = 6 ⇒ y = 2.'
      },
      {
        id: 'ptq3-23',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Milyen m paraméter esetén nincs megoldása a 2x - y = 5 és 4x - 2y = m rendszernek?',
        options: ['Minden m ≠ 10 esetén nincs megoldása', 'Csak ha m = 10', 'Csak ha m = 0', 'Minden m valós számra van megoldása'],
        correctAnswer: 0,
        hint: 'Az első egyenlet kétszerese 4x - 2y = 10. Ha a második jobb oldala nem 10, ellentmondást kapunk (0 = m - 10).',
        explanation: 'Ha m ≠ 10, a két egyenes párhuzamos és különálló, így nincs közös metszéspont.'
      },
      {
        id: 'ptq3-24',
        questionTypeBadge: 'Egyenletrendszerek',
        question: 'Oldd meg a törtes rendszert: x/2 + y/3 = 4 és x/4 - y/6 = 0.',
        options: ['(x; y) = (4; 6)', '(x; y) = (6; 4)', '(x; y) = (2; 9)', '(x; y) = (8; 0)'],
        correctAnswer: 0,
        hint: 'A második egyenlet szorozva 12-vel: 3x - 2y = 0 ⇒ 2y = 3x. Az első szorozva 6-tal: 3x + 2y = 24.',
        explanation: 'Helyettesíts 3x-et 2y helyére az elsőbe: 3x + 3x = 24 ⇒ 6x = 24 ⇒ x = 4. 2y = 12 ⇒ y = 6.'
      },
      {
        id: 'ptq3-25',
        questionTypeBadge: 'Szöveges egyenletrendszerek',
        question: 'Egy farmon tyúkok és nyulak vannak, összesen 35 fej és 94 láb. Hány tyúk és hány nyúl van?',
        options: ['23 tyúk és 12 nyúl', '20 tyúk és 15 nyúl', '25 tyúk és 10 nyúl', '18 tyúk és 17 nyúl'],
        correctAnswer: 0,
        hint: 't + ny = 35 és 2t + 4ny = 94.',
        explanation: '2(35 - ny) + 4ny = 94 ⇒ 70 + 2ny = 94 ⇒ 2ny = 24 ⇒ ny = 12 nyúl. Tyúk: 35 - 12 = 23 tyúk. Lábak: 23·2 + 12·4 = 46 + 48 = 94.'
      },
      {
        id: 'ptq3-26',
        questionTypeBadge: 'Szöveges egyenletrendszerek',
        question: '3 füzet és 2 ceruza ára 1300 Ft. 2 füzet és 3 ceruza ára 1200 Ft. Mennyibe kerül 1 füzet és 1 ceruza?',
        options: ['1 füzet 300 Ft, 1 ceruza 200 Ft', '1 füzet 350 Ft, 1 ceruza 150 Ft', '1 füzet 280 Ft, 1 ceruza 220 Ft', '1 füzet 400 Ft, 1 ceruza 100 Ft'],
        correctAnswer: 0,
        hint: 'Add össze a két egyenletet: 5 füzet + 5 ceruza = 2500 Ft ⇒ 1 füzet + 1 ceruza = 500 Ft.',
        explanation: 'f + c = 500 Ft ⇒ f = 500 - c. 3(500 - c) + 2c = 1300 ⇒ 1500 - c = 1300 ⇒ c = 200 Ft, f = 300 Ft. Ellenőrzés: 3·300 + 2·200 = 900 + 400 = 1300 Ft.'
      },
      {
        id: 'ptq3-27',
        questionTypeBadge: 'Szöveges egyenletrendszerek',
        question: 'Egy kétjegyű szám tízeseinek száma 3-mal nagyobb az egyesekénél. Ha a számjegyek összegét megszorozzuk 7-tel, az eredeti számot kapjuk. Mi a szám?',
        options: ['63', '74', '52', '85'],
        correctAnswer: 0,
        hint: 't = e + 3. Szám: 10t + e. Egyenlet: 7(t + e) = 10t + e.',
        explanation: '7(e + 3 + e) = 10(e + 3) + e ⇒ 7(2e + 3) = 11e + 30 ⇒ 14e + 21 = 11e + 30 ⇒ 3e = 9 ⇒ e = 3, t = 6. A szám: 63. Ellenőrzés: 7 · (6 + 3) = 7 · 9 = 63.'
      },
      {
        id: 'ptq3-28',
        questionTypeBadge: 'Összegző feladvány',
        question: 'Oldd meg a valós számok halmazán: (x - 1)² + (y - 3)² = 0.',
        figure: <LinearSystemMapSvg size={170} />,
        options: ['x = 1 és y = 3', 'x = -1 és y = -3', 'Végtelen sok megoldás van', 'Nincs megoldás'],
        correctAnswer: 0,
        hint: 'Két valós négyzetszám összege csak akkor lehet 0, ha mindkét tag egyszerre 0!',
        explanation: '(x - 1)² ≥ 0 és (y - 3)² ≥ 0. Összegük csak akkor 0, ha x - 1 = 0 (x = 1) és y - 3 = 0 (y = 3).'
      },
      {
        id: 'ptq3-29',
        questionTypeBadge: 'Összegző feladvány',
        question: 'Melyik az a szám, amelynek négyzete megegyezik a háromszorosával?',
        options: ['0 és 3', 'Csak a 3', 'Csak a 0', '-3 és 3'],
        correctAnswer: 0,
        hint: 'x² = 3x ⇒ x² - 3x = 0 ⇒ x(x - 3) = 0. Ne felejtsd el a 0-t!',
        explanation: 'x(x - 3) = 0 ⇒ x = 0 vagy x = 3. Mindkettő megfelel: 0² = 3·0 és 3² = 3·3.'
      },
      {
        id: 'ptq3-30',
        questionTypeBadge: 'Összegző feladvány',
        question: 'Egy hajó lefelé 3 óra alatt, felfelé 5 óra alatt tesz meg egy utat a folyón. Hány óra alatt tenne meg egy deszkadarab (a folyó sodrásával) ugyanezt az utat?',
        options: ['15 óra alatt', '8 óra alatt', '12 óra alatt', '10 óra alatt'],
        correctAnswer: 0,
        hint: 'v_hajó + v_víz = s/3, v_hajó - v_víz = s/5. A deszka sebessége a víz sebessége: v_víz = (s/3 - s/5)/2 = s/15.',
        explanation: 'v_víz = (5s - 3s)/(2 · 15) = 2s / 30 = s / 15. Az idő t = s / v_víz = 15 óra.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. Nevezetes Azonosságok',
    items: [
      { label: '(a + b)²', value: 'a² + 2ab + b² (összeg négyzete)' },
      { label: '(a - b)²', value: 'a² - 2ab + b² (különbség négyzete)' },
      { label: 'a² - b²', value: '(a - b)(a + b) (négyzetek különbsége)' },
      { label: 'Közös tényező', value: 'ab + ac = a(b + c)' }
    ]
  },
  {
    title: '2. Mérlegelv & Kikötések',
    items: [
      { label: 'Törtes kikötés', value: 'Nevező ≠ 0 (Df = ℝ \\ {zérushelyek})' },
      { label: 'Negatívval szorzás', value: 'Egyenlőtlenségnél a reláció MEGFORDUL!' },
      { label: 'Ekvivalens művelet', value: 'Hozzáadás/kivonás, szorzás/osztás c ≠ 0 számmal' },
      { label: 'Veszélyes művelet', value: 'Ismeretlennel való osztás (gyökvesztés) / négyzetre emelés' }
    ]
  },
  {
    title: '3. Szöveges & Rendszerek',
    items: [
      { label: 'Életkoros', value: 'A korkülönbség időben mindig állandó marad' },
      { label: 'Keverési', value: 'Oldott anyag mérlege: m₁p₁ + m₂p₂ = (m₁+m₂)p_új' },
      { label: 'Mozgásos', value: 's = v · t; Szembe: v₁ + v₂; Utolérés: v₁ - v₂' },
      { label: 'Rendszer esetek', value: '1 metszéspont (1 mo.), párhuzamos (0 mo.), egybeeső (∞ mo.)' }
    ]
  }
];

export const PracticeTestQuiz: React.FC<PracticeTestQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Fejezeti Nagy Tudáspróba Kvíz"
      subtitle="90 válogatott feladat 3 szinten (szintenként 30 kérdés) az Egyenletek és azonosságok fejezet teljes anyagából"
      badgeText="9. OSZTÁLY • III. FEJEZET • NAGY TUDÁSPRÓBA"
      themeColor="purple"
      storageKey="grade9-chapter3-practice-test-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-gyakorlas-quiz"
      topicTitle="Gyakorlás, tudáspróba"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket, azonosságokat és egyenleteket a gyökeikkel!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PracticeTestMatcher
              key={`practice-test-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kifejezéseket témakör, megoldáshalmaz és ekvivalencia szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PracticeTestSorter
              key={`practice-test-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};
