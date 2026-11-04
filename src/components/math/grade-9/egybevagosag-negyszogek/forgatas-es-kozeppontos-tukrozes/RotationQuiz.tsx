import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RotationMatcher } from './RotationMatcher';
import { RotationSorter } from './RotationSorter';
import {
  CentralSymmetrySvg,
  RotationAngleSvg,
  RotationalSymmetryShapesSvg,
  CoordinateRotationSvg
} from './RotationFigures';
import { Repeat, Compass, Sparkles, RotateCw, CheckCircle2, ShieldCheck, Scale, HelpCircle } from 'lucide-react';

interface RotationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Középpontos Tükrözés (Könnyű)',
    subtitle: 'Definíciók, távolságtartás, képpontok és párhuzamos egyenesek beazonosítása.',
    range: '1 - 10. feladat',
    focus: 'Középpontos tükrözés alaptulajdonságai',
    questions: [
      {
        id: 'rq1-1',
        questionTypeBadge: 'Középpont Képe',
        question: 'Mi a tükrözés O középpontjának képe középpontos tükrözés során?',
        options: ['Önmaga (O\' = O)', 'A végtelen távoli pont', 'Az origó', 'Nincs képe'],
        correctAnswer: 0,
        hint: 'A középpont az egyetlen pont, amely nem mozdul el a síkon.',
        explanation: 'A középpontos tükrözés definíciója szerint ha P = O, akkor P\' = O. Ez a transzformáció egyetlen fixpontja.'
      },
      {
        id: 'rq1-2',
        questionTypeBadge: 'Képpont Helyzete',
        question: 'Ha P ≠ O, hol helyezkedik el a P pont P\' középpontos tükörképe?',
        figure: <CentralSymmetrySvg size={220} />,
        options: [
          'Az OP egyenesen, és O felezi a PP\' szakaszt',
          'Az OP szakaszra állított merőleges felezőn',
          'Az O középpontú, |OP| sugarú kör tetszőleges pontján',
          'Mindig az x-tengelyen'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a tükrözésre: O-n keresztül kell egyenest húzni, és ugyanakkora távolságot mérni a túloldalra.',
        explanation: 'A P\' pont az OP félegyenes meghosszabbításán van úgy, hogy |OP| = |OP\'|, vagyis O a PP\' szakasz felezőpontja.'
      },
      {
        id: 'rq1-3',
        questionTypeBadge: 'Forgatási Ekvivalencia',
        question: 'Hány fokos elforgatással egyezik meg a síkban a középpontos tükrözés?',
        options: ['180°-os forgatással', '90°-os forgatással', '360°-os forgatással', '45°-os forgatással'],
        correctAnswer: 0,
        hint: 'Egy egyenes szög hány fokos?',
        explanation: 'A középpontos tükrözés a síkban megegyezik az O középpont körüli 180°-os elforgatással.'
      },
      {
        id: 'rq1-4',
        questionTypeBadge: 'Egyenes Képe',
        question: 'Milyen helyzetű egy tetszőleges, az O középponton át NEM menő egyenes középpontos tükörképe az eredeti egyeneshez képest?',
        options: ['Párhuzamos vele (e\' || e)', 'Merőleges rá', '60°-os szöget zár be vele', 'Metszi az egyenest'],
        correctAnswer: 0,
        hint: 'A középpontos tükrözés egyik legfontosabb tétele az egyenesek irányáról szól.',
        explanation: 'Középpontos tükrözésnél bármely egyenes képe egy vele párhuzamos egyenes. Ha az egyenes átmegy O-n, akkor a képe önmaga.'
      },
      {
        id: 'rq1-5',
        questionTypeBadge: 'Körüljárási Irány',
        question: 'Hogyan változik egy alakzat csúcsainak körüljárási iránya középpontos tükrözésnél?',
        options: [
          'Megmarad (nem változik)',
          'Megfordul (ellentétes lesz)',
          '90°-kal elfordul',
          'Csak háromszögeknél változik meg'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, hogy a középpontos tükrözés egy 180°-os forgatás a síkban!',
        explanation: 'Mivel a középpontos tükrözés egy 180°-os síkbeli forgatás, megőrzi a körüljárási irányt. (A tengelyes tükrözés az, ami megfordítja!)'
      },
      {
        id: 'rq1-6',
        questionTypeBadge: 'Távolságtartás',
        question: 'Egy AB szakasz hossza 7,5 cm. Mennyi a szakasz A\'B\' középpontos tükörképének hossza?',
        options: ['7,5 cm', '15 cm', '3,75 cm', 'Nem határozható meg'],
        correctAnswer: 0,
        hint: 'A középpontos tükrözés egybevágósági transzformáció.',
        explanation: 'A középpontos tükrözés egybevágóság, vagyis távolságtartó transzformáció: |A\'B\'| = |AB| = 7,5 cm.'
      },
      {
        id: 'rq1-7',
        questionTypeBadge: 'Origóra Tükrözés',
        question: 'A P(5; −3) pontot tükrözzük a koordináta-rendszer O(0; 0) origójára. Mik lesznek a P\' képpont koordinátái?',
        figure: <CoordinateRotationSvg size={200} />,
        options: ['(−5; 3)', '(5; 3)', '(−3; 5)', '(−5; −3)'],
        correctAnswer: 0,
        hint: 'Origóra tükrözésnél mindkét koordináta az ellentettjére vált: (x; y) ↦ (−x; −y).',
        explanation: 'P\'(−x; −y) = P\'(−5; −(−3)) = P\'(−5; 3).'
      },
      {
        id: 'rq1-8',
        questionTypeBadge: 'Fixegyenes Fogalma',
        question: 'Mely egyenesek a középpontos tükrözés fixegyenesei (amelyek képe önmagukba megy át)?',
        options: [
          'Az O középponton átmenő egyenesek',
          'Az x és y koordinátatengelyek',
          'Csak az O-ra merőleges egyenesek',
          'Nincsenek fixegyenesek'
        ],
        correctAnswer: 0,
        hint: 'Ha egy egyenes átmegy a tükrözési középponton, minden rajta lévő pont képe is ugyanerre az egyenesre esik.',
        explanation: 'Bármely egyenes, amely átmegy az O ponton, önmagába képződik le (bár az O ponton kívül a pontjai helyet cserélnek, maga az egyenes mint halmaz fix marad).'
      },
      {
        id: 'rq1-9',
        questionTypeBadge: 'Pozitív Forgásirány',
        question: 'A matematikában melyik irányt tekintjük pozitív (+) forgásiránynak a síkban?',
        figure: <RotationAngleSvg size={200} />,
        options: [
          'Az óramutató járásával ellentétes irányt',
          'Az óramutató járásával megegyező irányt',
          'A fentről lefelé mutató irányt',
          'A tetszőlegesen választott irányt'
        ],
        correctAnswer: 0,
        hint: 'Ez a trigonometriai alapszabály: a pozitív forgásirány az óramutatóval ellentétes.',
        explanation: 'Megállapodás szerint a pozitív forgásirány az óramutató járásával ellentétes (trigonometrikus irány).'
      },
      {
        id: 'rq1-10',
        questionTypeBadge: 'Forgatás Fixpontja',
        question: 'Hány fixpontja van egy síkbeli elforgatásnak, ha a forgásszög α = 75°?',
        options: ['Pontosan 1 (az O forgási középpont)', '2', 'Végtelen sok', '0'],
        correctAnswer: 0,
        hint: 'Ha a szög nem a 360° többszöröse, csak egyetlen pont marad a helyén.',
        explanation: 'Ha α nem 0° vagy 360° többszöröse, a forgatásnak egyetlen fixpontja van: az O forgási középpont.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Forgatások és Koordináta-geometria (Közepes)',
    subtitle: 'Origó és tetszőleges pont körüli 90°, 180°, 270° forgatások, felezőpontok és háromszögek képei.',
    range: '11 - 20. feladat',
    focus: 'Forgatás szögei és koordináták kiszámítása',
    questions: [
      {
        id: 'rq2-1',
        questionTypeBadge: '90°-os Forgatás',
        question: 'A P(2; 4) pontot +90°-kal (pozitív irányba) elforgatjuk az origó körül. Mik lesznek a képpont koordinátái?',
        figure: <CoordinateRotationSvg size={200} />,
        options: ['(−4; 2)', '(4; −2)', '(−2; −4)', '(−2; 4)'],
        correctAnswer: 0,
        hint: '+90°-os forgatás szabálya: (x; y) ↦ (−y; x).',
        explanation: 'A szabály szerint (x; y) ↦ (−y; x), tehát (2; 4) ↦ (−4; 2).'
      },
      {
        id: 'rq2-2',
        questionTypeBadge: '−90°-os Forgatás',
        question: 'A Q(−3; 5) pontot az óramutató járásával megegyező irányban 90°-kal (−90° vagy +270°) elforgatjuk az origó körül. Mi lesz a kép?',
        options: ['(5; 3)', '(−5; −3)', '(3; −5)', '(−3; −5)'],
        correctAnswer: 0,
        hint: '−90°-os (vagy 270°-os) forgatás szabálya: (x; y) ↦ (y; −x).',
        explanation: 'A negatív 90°-os forgatás szabálya: (x; y) ↦ (y; −x). Itt x = −3, y = 5, így a kép (5; −(−3)) = (5; 3).'
      },
      {
        id: 'rq2-3',
        questionTypeBadge: 'Középpont Kiszámítása',
        question: 'A P(1; 3) pont képe egy középpontos tükrözésnél a P\'(7; 5) pont. Mik a tükrözés O középpontjának koordinátái?',
        options: ['(4; 4)', '(3; 4)', '(8; 8)', '(6; 2)'],
        correctAnswer: 0,
        hint: 'O a PP\' szakasz felezőpontja: O = ((x1 + x2)/2; (y1 + y2)/2).',
        explanation: 'Mivel O felezi a PP\' szakaszt: x_O = (1 + 7)/2 = 4, y_O = (3 + 5)/2 = 4. Vagyis O(4; 4).'
      },
      {
        id: 'rq2-4',
        questionTypeBadge: 'Tetszőleges Középpontra Tükrözés',
        question: 'A P(2; 1) pontot tükrözzük a C(3; 4) pontra. Mik lesznek a P\' képpont koordinátái?',
        options: ['(4; 7)', '(5; 5)', '(1; 7)', '(4; 5)'],
        correctAnswer: 0,
        hint: 'Használd a képletet: x\' = 2x_C − x és y\' = 2y_C − y.',
        explanation: 'x\' = 2·3 − 2 = 6 − 2 = 4. y\' = 2·4 − 1 = 8 − 1 = 7. Tehát P\'(4; 7).'
      },
      {
        id: 'rq2-5',
        questionTypeBadge: 'Háromszög Területe',
        question: 'Egy ABC háromszög területe 24 cm². Mekkora lesz az A\'B\'C\' háromszög területe egy 60°-os forgatás után?',
        options: ['24 cm²', '12 cm²', '48 cm²', '24 · √3 cm²'],
        correctAnswer: 0,
        hint: 'A forgatás távolságtartó és szögtartó, tehát területőrző transzformáció.',
        explanation: 'Az elforgatás egybevágósági transzformáció, így az alakzatok területe nem változik: T\' = T = 24 cm².'
      },
      {
        id: 'rq2-6',
        questionTypeBadge: 'Egymást követő tükrözések',
        question: 'Ha egy alakzatot egymás után kétszer tükrözünk ugyanarra az O pontra, mi lesz az eredmény?',
        options: [
          'Visszakerül az eredeti helyzetébe (identitás)',
          '90°-kal elfordul',
          '360°-kal eltolódik',
          'Megfordul a körüljárási iránya'
        ],
        correctAnswer: 0,
        hint: 'Két egymást követő 180°-os forgatás 180° + 180° = 360°-os forgatást ad.',
        explanation: 'Egy alakzat kétszeri tükrözése ugyanarra a középpontra 180° + 180° = 360°-os forgatást jelent, ami az identitás (minden pont visszatér önmagába).'
      },
      {
        id: 'rq2-7',
        questionTypeBadge: 'Szabályos Háromszög Forgatása',
        question: 'Egy ABC szabályos háromszöget a középpontja körül elforgatunk úgy, hogy önmagába menjen át. Mekkora lehet a legkisebb pozitív forgásszög?',
        figure: <RotationalSymmetryShapesSvg size={220} />,
        options: ['120°', '60°', '90°', '180°'],
        correctAnswer: 0,
        hint: 'A szabályos háromszög 3 egybevágó harmadra osztja a teljes 360°-os kört: 360° / 3 = ?',
        explanation: 'A szabályos háromszög 3-adrendű forgásszimmetriával bír, a legkisebb szimmetria-szög 360° / 3 = 120°.'
      },
      {
        id: 'rq2-8',
        questionTypeBadge: 'Egyenesek Hajlásszöge',
        question: 'Egy e egyenest 45°-kal elforgatunk egy rajta kívül fekvő O pont körül. Mekkora szöget zár be az eredeti e és az elforgatott e\' egyenes?',
        options: ['45°', '90°', '135°', '0° (párhuzamosak)'],
        correctAnswer: 0,
        hint: 'A forgatás szögtartó: bármely egyenes és képe által bezárt szög megegyezik a forgatás szögével.',
        explanation: 'Ha egy egyenest α szöggel elforgatunk, az új egyenes az eredetivel pontosan α szöget (itt 45°-ot) zár be.'
      },
      {
        id: 'rq2-9',
        questionTypeBadge: 'Négyzet Forgatása',
        question: 'Egy négyzetet a középpontja körül hány fokos forgatások visznek át önmagába a 0° és 360° közötti tartományban?',
        options: ['90°, 180°, 270°', 'Csak 90° és 180°', '45°, 90°, 135°, 180°', 'Csak 180°'],
        correctAnswer: 0,
        hint: 'A négyzet 4-edrendű forgásszimmetriával rendelkezik: a 90° többszörösei.',
        explanation: 'A négyzet forgásszimmetriájának szögei: 90°, 180° és 270° (valamint a 360° és 0°).'
      },
      {
        id: 'rq2-10',
        questionTypeBadge: 'Párhuzamos Vonalak Képe',
        question: 'Ha két egyenes párhuzamos egymással (e || f), milyen helyzetűek lesznek a képeik egy 50°-os forgatás után?',
        options: ['Párhuzamosak maradnak (e\' || f\')', 'Metszik egymást 50°-ban', 'Merőlegesek lesznek', 'Egybeesnek'],
        correctAnswer: 0,
        hint: 'A forgatás távolság- és szögtartó transzformáció.',
        explanation: 'A forgatás egybevágósági transzformáció, így megtartja az alakzatok geometriai viszonyait: párhuzamos egyenesek képei is párhuzamosak egymással.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Forgásszimmetria, Bizonyítások és Összetett Feladatok (Nehéz)',
    subtitle: 'N-edrendű szimmetriák, négyszögek tulajdonságai, koordinátás levezetések és érettségi típusfeladatok.',
    range: '21 - 30. feladat',
    focus: 'Összetett forgatási feladványok és szimmetria-analízis',
    questions: [
      {
        id: 'rq3-1',
        questionTypeBadge: 'Paralelogramma Szimmetriája',
        question: 'Melyik állítás IGAZ minden paralelogrammára a szimmetria szempontjából?',
        figure: <RotationalSymmetryShapesSvg size={220} />,
        options: [
          'Középpontosan szimmetrikus az átlói metszéspontjára',
          'Mindig rendelkezik tengelyes szimmetriával',
          'Forgásszimmetriájának minimális szöge 90°',
          'Nincs semmilyen szimmetriája'
        ],
        correctAnswer: 0,
        hint: 'A paralelogramma átlói felezik egymást, ez az átlómetszéspont a szimmetriaközéppont.',
        explanation: 'Minden paralelogramma középpontosan szimmetrikus (180°-os forgásszimmetria) az átlói metszéspontjára nézve. Általános esetben viszont nincs szimmetriatengelye!'
      },
      {
        id: 'rq3-2',
        questionTypeBadge: 'Szabályos n-szög Szimmetriája',
        question: 'Mikor középpontosan szimmetrikus egy szabályos n-oldalú sokszög?',
        options: [
          'Akkor és csak akkor, ha n páros szám (n = 4, 6, 8, ...)',
          'Akkor és csak akkor, ha n páratlan szám',
          'Minden n ≥ 3 esetén',
          'Csak ha n a 4 többszöröse'
        ],
        correctAnswer: 0,
        hint: '180°-os elforgatással egy csúcsnak pontosan szemközti csúcsba kell átmennie.',
        explanation: 'Egy szabályos sokszög csak akkor középpontosan szimmetrikus, ha páros az oldalszáma (ekkor minden csúccsal szemben pontosan egy csúcs áll, és 360°/n többszöröse a 180°).'
      },
      {
        id: 'rq3-3',
        questionTypeBadge: 'Rombszög és Forgatás',
        question: 'Egy rombusz átlói 6 cm és 8 cm hosszúak. Az átlók metszéspontja körül elforgatjuk 180°-kal. Mekkora lesz a rombusz oldalainak összege (kerülete)?',
        options: ['20 cm', '14 cm', '28 cm', '40 cm'],
        correctAnswer: 0,
        hint: 'A rombusz átlói felezik egymást és merőlegesek. Oldala a Pitagorasz-tétellel: a² = 3² + 4².',
        explanation: 'Az átlók felei: 3 cm és 4 cm. Pitagorasz-tétellel a rombusz oldala: a = √(3² + 4²) = 5 cm. A rombusz középpontosan szimmetrikus, így önmagába megy át, kerülete K = 4 · 5 = 20 cm.'
      },
      {
        id: 'rq3-4',
        questionTypeBadge: 'Forgatások Kompozíciója',
        question: 'Egy alakzatot az O pont körül elforgatunk +70°-kal, majd ugyanazon O pont körül −160°-kal. Milyen egyetlen transzformációval helyettesíthető ez a két forgatás?',
        options: [
          'Az O pont körüli −90°-os (vagy +270°-os) elforgatással',
          'Az O pontra vonatkozó középpontos tükrözéssel',
          'Egy eltolással',
          'Egy tengelyes tükrözéssel'
        ],
        correctAnswer: 0,
        hint: 'Azonos középpontú forgatások szögei egyszerűen összeadódnak.',
        explanation: 'Az azonos középpontú forgatások kompozíciója is forgatás, melynek szöge az eredeti szögek összege: 70° + (−160°) = −90° (ami megegyezik a +270°-os forgatással).'
      },
      {
        id: 'rq3-5',
        questionTypeBadge: 'Középpontos Tükrözések Kompozíciója',
        question: 'Egy alakzatot először tükrözünk az O1 pontra, majd az eredményt tükrözzük egy másik O2 (≠ O1) pontra. Milyen transzformációt kapunk?',
        options: [
          'Egy eltolást a 2·O1O2 vektorral',
          'Egy 360°-os forgatást az O1 körül',
          'Egy tengelyes tükrözést az O1O2 egyenesre',
          'Egy középpontos tükrözést az O1O2 felezőpontjára'
        ],
        correctAnswer: 0,
        hint: 'Két 180°-os forgatás összege 360°, a fixpontok elvesznek, egyenesek párhuzamosak maradnak.',
        explanation: 'Két különböző pontra vonatkozó középpontos tükrözés egymásutánja (kompozíciója) egy ELTOLÁS, melynek vektora az O1O2 szakasz hosszának kétszerese és iránya O1-ből O2 felé mutat!'
      },
      {
        id: 'rq3-6',
        questionTypeBadge: 'Invariáns Alakzatok',
        question: 'Melyik alakzatnak van VÉGTELEN SOK forgásszimmetriája (tetszőleges szöggel önmagába forgatható)?',
        options: ['A körnek (középpontja körül)', 'A négyzetnek', 'A gömbnek a síkban', 'A parabolának'],
        correctAnswer: 0,
        hint: 'Minden sugara egyenlő hosszúságú.',
        explanation: 'A kör a középpontja körül tetszőleges szögű elforgatással önmagába megy át, ezért végtelen rendű forgásszimmetriával rendelkezik.'
      },
      {
        id: 'rq3-7',
        questionTypeBadge: 'Koordinátás Rendszeres Forgatás',
        question: 'Az A(3; 0) pontot az O(0; 0) körül +60°-kal elforgatjuk. Mik a pontos koordinátái az A\' pontnak?',
        options: [
          '(3/2; 3√3/2)',
          '(3√3/2; 3/2)',
          '(0; 3)',
          '(−3/2; 3√3/2)'
        ],
        correctAnswer: 0,
        hint: 'x\' = r · cos(60°), y\' = r · sin(60°), ahol r = 3.',
        explanation: 'A forgatás sugara r = 3. x\' = 3 · cos(60°) = 3 · 0,5 = 3/2. y\' = 3 · sin(60°) = 3 · (√3/2) = 3√3/2. Tehát A\'(1,5; 1,5√3).'
      },
      {
        id: 'rq3-8',
        questionTypeBadge: 'Téglalap és Rombusz Szimmetriája',
        question: 'Melyik állítás HAMIS a téglalap és a rombusz szimmetriáival kapcsolatban?',
        options: [
          'A rombusz rendelkezik 90°-os forgásszimmetriával',
          'Mindkettő középpontosan szimmetrikus',
          'A téglalapnak 2 szimmetriatengelye van (az oldalfelező merőlegesek)',
          'A rombusznak 2 szimmetriatengelye van (az átlói egyenesei)'
        ],
        correctAnswer: 0,
        hint: 'A 90°-os forgásszimmetriához minden szomszédos oldalnak egyenlőnek és merőlegesnek kell lennie (négyzet).',
        explanation: 'Egy általános rombusz NEM rendelkezik 90°-os forgásszimmetriával (csak 180°-ossal), csak a speciális rombusz, a négyzet!'
      },
      {
        id: 'rq3-9',
        questionTypeBadge: 'Csúcsok Tükörképe',
        question: 'Egy paralelogramma három csúcsa A(0; 0), B(4; 0), D(1; 3). Hol van a negyedik C csúcs, ha a paralelogramma átlói felezik egymást?',
        options: ['C(5; 3)', 'C(4; 3)', 'C(3; 3)', 'C(5; 4)'],
        correctAnswer: 0,
        hint: 'A paralelogramma vektoros tulajdonsága: C = B + D − A.',
        explanation: 'Mivel AC és BD felezőpontja megegyezik: x_C = x_B + x_D − x_A = 4 + 1 − 0 = 5. y_C = y_B + y_D − y_A = 0 + 3 − 0 = 3. Tehát C(5; 3).'
      },
      {
        id: 'rq3-10',
        questionTypeBadge: 'Szabályos 8-szög Rendje',
        question: 'Hanyadrendű forgásszimmetriával rendelkezik egy szabályos nyolcszög, és mekkora a legkisebb pozitív szimmetria-szöge?',
        options: [
          '8-adrendű, és a legkisebb szög 45°',
          '4-edrendű, és a legkisebb szög 90°',
          '8-adrendű, és a legkisebb szög 60°',
          '16-odrendű, és a legkisebb szög 22,5°'
        ],
        correctAnswer: 0,
        hint: 'Egy szabályos n-szög n-edrendű forgásszimmetriával bír: szög = 360° / n.',
        explanation: 'A szabályos nyolcszög 8-adrendű, legkisebb szimmetria-szöge 360° / 8 = 45°.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Középpontos tükrözés',
    badge: '180°-os forgatás',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'A sík egy rögzített O pontjára vonatkozó tükrözés.',
    formula: '|OP| = |OP\'| • e\' || e',
    note: 'Egyetlen fixpontja O. Megőrzi a körüljárási irányt, a távolságot és a szögeket.',
    icon: <Repeat className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Pont körüli elforgatás',
    badge: 'Forgatás',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: '3 meghatározó adat: O középpont, α forgásszög, körüljárási irány.',
    formula: '∠POP\' = α • |OP| = |OP\'|',
    note: 'Pozitív irány: óramutató járásával ellentétes. Egyetlen fixpontja O (ha α ≠ k·360°).',
    icon: <Compass className="w-5 h-5 text-indigo-600" />
  },
  {
    title: 'Koordináta-szabályok (Origó)',
    badge: 'Képletek',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Gyakori origó körüli transzformációk képletei:',
    formula: '180°: (x; y) ↦ (−x; −y)\n+90°: (x; y) ↦ (−y; x)\n−90°: (x; y) ↦ (y; −x)',
    note: 'C(x₀; y₀) középpontra: x\' = 2x₀ − x, y\' = 2y₀ − y',
    icon: <RotateCw className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Forgásszimmetria alakzatokban',
    badge: 'Alakzatok',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Melyik alakzat hány fokos forgatással megy önmagába?',
    formula: 'Négyzet: 90° (4-edrendű)\nSzabályos 3-szög: 120° (3-adrendű)\nParalelogramma: 180°\nSzabályos n-szög: 360°/n',
    note: 'Szabályos háromszög NEM középpontosan szimmetrikus!',
    icon: <Sparkles className="w-5 h-5 text-amber-600" />
  }
];

export const RotationQuiz: React.FC<RotationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="1. Forgatás és középpontos tükrözés kvíz"
      subtitle="Teszteld tudásodat a 9. osztályos egybevágósági transzformációkból: definíciók, koordináták és forgásszimmetriák!"
      topicId="g9-trans-forgatas"
      topicTitle="1. Forgatás és középpontos tükrözés"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <RotationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RotationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

