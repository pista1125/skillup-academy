import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TrianglesMatcher } from './TrianglesMatcher';
import { TrianglesSorter } from './TrianglesSorter';
import {
  TriangleClassificationSvg,
  TriangleInequalitySvg,
  TriangleAnglesSvg,
  IsoscelesAndEquilateralSvg
} from './TrianglesFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Sparkles } from 'lucide-react';

interface TrianglesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Háromszögfajták (Könnyű)',
    subtitle: 'Háromszögek típusai oldalak és szögek szerint, belső szögek összege (180°).',
    range: '1 - 10. feladat',
    focus: 'Alaptulajdonságok és Osztályozás',
    questions: [
      {
        id: 'tq1-1',
        questionTypeBadge: 'Belső Szögek Összege',
        question: 'Mennyi bármely síkbeli háromszög belső szögeinek összege (α + β + γ)?',
        figure: <TriangleAnglesSvg size={200} />,
        options: ['180°', '360°', '90°', '270°'],
        correctAnswer: 0,
        hint: 'A háromszög belső szögeinek összege mindig egyenesszöget alkot.',
        explanation: 'Minden euklideszi síkbeli háromszög belső szögeinek összege pontosan 180°.'
      },
      {
        id: 'tq1-2',
        questionTypeBadge: 'Szabályos Háromszög',
        question: 'Mekkorák a szabályos (egyenlő oldalú) háromszög belső szögei?',
        figure: <IsoscelesAndEquilateralSvg size={200} />,
        options: ['60°, 60°, 60°', '90°, 45°, 45°', '45°, 45°, 90°', '70°, 70°, 40°'],
        correctAnswer: 0,
        hint: 'A három egyenlő oldalhoz három egyenlő szög tartozik: 180° / 3.',
        explanation: 'Mivel a szabályos háromszög mindhárom oldala egyenlő, belső szögei is egyenlők: 180° / 3 = 60°.'
      },
      {
        id: 'tq1-3',
        questionTypeBadge: 'Derékszögű Háromszög',
        question: 'Mennyi a derékszögű háromszög két hegyesszögének összege?',
        figure: <TriangleClassificationSvg size={200} />,
        options: ['90° (pótszögek)', '180°', '45°', '120°'],
        correctAnswer: 0,
        hint: 'Mivel a derékszög 90°, a maradék két szögre 180° - 90° jut.',
        explanation: 'A derékszögű háromszögben a két hegyesszög összege mindig 90°, vagyis egymás pótszögei.'
      },
      {
        id: 'tq1-4',
        questionTypeBadge: 'Hiányzó Belső Szög',
        question: 'Egy háromszög két belső szöge 50° és 60°. Mekkora a harmadik belső szöge?',
        options: ['70°', '80°', '60°', '90°'],
        correctAnswer: 0,
        hint: 'Vond ki 180-ból az 50 és 60 összegét!',
        explanation: 'γ = 180° - (50° + 60°) = 180° - 110° = 70°. Mivel mindhárom szög < 90°, a háromszög hegyesszögű.'
      },
      {
        id: 'tq1-5',
        questionTypeBadge: 'Egyenlő Szárú Háromszög',
        question: 'Egy egyenlő szárú háromszög szárszöge (a csúcsszöge) 40°. Mekkorák az alapon fekvő szögei?',
        figure: <IsoscelesAndEquilateralSvg size={200} />,
        options: ['70° és 70°', '60° és 60°', '40° és 100°', '80° és 80°'],
        correctAnswer: 0,
        hint: 'Az alapon fekvő szögek egyenlők: (180° - 40°) / 2.',
        explanation: 'Az alap két szögének összege 180° - 40° = 140°. Mivel az egyenlő szárú háromszög alapon fekvő szögei egyenlők: 140° / 2 = 70°.'
      },
      {
        id: 'tq1-6',
        questionTypeBadge: 'Háromszög Osztályozása Szögek Szerint',
        question: 'Milyen háromszög az, amelynek egyik belső szöge 115°?',
        options: ['Tompaszögű háromszög', 'Hegyesszögű háromszög', 'Derékszögű háromszög', 'Szabályos háromszög'],
        correctAnswer: 0,
        hint: 'A 115°-os szög nagyobb 90°-nál.',
        explanation: 'Ha egy háromszögnek van egy 90°-nál nagyobb belső szöge, akkor tompaszögűnek nevezzük.'
      },
      {
        id: 'tq1-7',
        questionTypeBadge: 'Szimmetriatengelyek Száma',
        question: 'Hány szimmetriatengelye van egy szabályos háromszögnek?',
        figure: <IsoscelesAndEquilateralSvg size={200} />,
        options: ['3 szimmetriatengely', '1 szimmetriatengely', '0 (nincs)', '2 szimmetriatengely'],
        correctAnswer: 0,
        hint: 'Mindhárom csúcsból húzható oldalfelező merőleges/magasság, amely tengely.',
        explanation: 'A szabályos háromszögnek 3 szimmetriatengelye van (a három oldalfelező merőlegese, melyek egyben szögfelezők és magasságvonalak).'
      },
      {
        id: 'tq1-8',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Szimmetriája',
        question: 'Hány szimmetriatengelye van egy nem szabályos egyenlő szárú háromszögnek?',
        options: ['1 szimmetriatengely', '2 szimmetriatengely', '3 szimmetriatengely', '0'],
        correctAnswer: 0,
        hint: 'Csak az alap felezőmerőlegese tükrözi a két szárat egymásba.',
        explanation: 'Az egyenlő szárú háromszögnek pontosan 1 szimmetriatengelye van: az alap felezőmerőlegese (amely átmegy a szárak közös csúcsán).'
      },
      {
        id: 'tq1-9',
        questionTypeBadge: 'Derékszögű Háromszög Oldalai',
        question: 'Hogyan nevezzük a derékszögű háromszög derékszöggel szemközti, leghosszabb oldalát?',
        options: ['Átfogó', 'Befogó', 'Alap', 'Szár'],
        correctAnswer: 0,
        hint: 'A két derékszöget bezáró oldal a befogó, a szemközti az...',
        explanation: 'A derékszögű háromszögben a 90°-os szöggel szemközti oldal az átfogó, a derékszöget bezáró két oldal a befogó.'
      },
      {
        id: 'tq1-10',
        questionTypeBadge: 'Szögek és Típus',
        question: 'Egy háromszög belső szögei 30°, 60° és 90°. Milyen háromszög ez?',
        options: ['Derékszögű háromszög', 'Hegyesszögű háromszög', 'Tompaszögű háromszög', 'Szabályos háromszög'],
        correctAnswer: 0,
        hint: 'Az egyik szöge pontosan 90°.',
        explanation: 'Mivel a háromszög egyik szöge 90°, derékszögű háromszögről beszélünk (a nevezetes 30°-60°-90°-os derékszögű háromszög, amely egy szabályos háromszög fele).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Háromszög-egyenlőtlenség és Külső Szögek (Közepes)',
    subtitle: 'Szerkeszthetőség (a + b > c), külső szög tétel (α\' = β + γ) és szögarányok.',
    range: '11 - 20. feladat',
    focus: 'Tételek és Egyenlőtlenségek',
    questions: [
      {
        id: 'tq2-1',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Szerkeszthető-e háromszög 4 cm, 7 cm és 12 cm hosszú szakaszokból?',
        figure: <TriangleInequalitySvg size={200} />,
        options: ['Nem, mert 4 + 7 = 11 < 12', 'Igen, mert minden oldal pozitív', 'Igen, mert 12 - 4 = 8 > 7', 'Igen, mert van tompaszöge'],
        correctAnswer: 0,
        hint: 'A két rövidebb oldal összegének szigorúan nagyobbnak kell lennie a leghosszabb oldalnál.',
        explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összege nagyobb a harmadiknál. Itt 4 + 7 = 11, ami kisebb mint 12, így a két rövidebb szakasz nem ér össze, nem alkothat háromszöget.'
      },
      {
        id: 'tq2-2',
        questionTypeBadge: 'Háromszög-egyenlőtlenség Határeset',
        question: 'Alkothatnak-e háromszöget a 6 cm, 8 cm és 14 cm hosszú szakaszok?',
        options: ['Nem, mert 6 + 8 = 14 (egy egyenesbe esnének, elfajuló eset)', 'Igen, ez egy derékszögű háromszög', 'Igen, ez egy tompaszögű háromszög', 'Igen, mert a 14 a leghosszabb'],
        correctAnswer: 0,
        hint: 'A két rövidebb oldal összege egyenlő a harmadikkal. Mi történik, ha szigorú egyenlőtlenséget várunk el?',
        explanation: 'A háromszög-egyenlőtlenség szigorú: a + b > c szükséges. Ha a + b = c, a három csúcs egyetlen egyenesre esik (elfajuló háromszög), nem jön létre valódi síkbeli háromszög.'
      },
      {
        id: 'tq2-3',
        questionTypeBadge: 'Harmadik Oldal Lehetséges Értékei',
        question: 'Egy háromszög két oldala 5 cm és 9 cm. Milyen határok közé eshet a harmadik oldal (c) hossza?',
        options: ['4 cm < c < 14 cm', '5 cm < c < 9 cm', 'c > 14 cm', '0 cm < c < 4 cm'],
        correctAnswer: 0,
        hint: 'A harmadik oldalnak nagyobbnak kell lennie a különbségnél (|9 - 5|), és kisebbnek az összegnél (9 + 5).',
        explanation: 'A háromszög-egyenlőtlenség következménye: |a - b| < c < a + b. Vagyis |9 - 5| = 4 < c < 9 + 5 = 14 cm.'
      },
      {
        id: 'tq2-4',
        questionTypeBadge: 'Külső Szög Tétele',
        question: 'Egy háromszög két belső szöge 45° és 65°. Mekkora a harmadik csúcsnál lévő külső szög (γ\')?',
        figure: <TriangleAnglesSvg size={200} />,
        options: ['110°', '70°', '135°', '115°'],
        correctAnswer: 0,
        hint: 'A háromszög bármely külső szöge egyenlő a két nem mellette fekvő belső szög összegével.',
        explanation: 'A külső szög tétele alapján: γ\' = α + β = 45° + 65° = 110°. (Ellenőrzés: a belső szög γ = 180° - 110° = 70°, és γ + γ\' = 70° + 110° = 180° mellékszögek).'
      },
      {
        id: 'tq2-5',
        questionTypeBadge: 'Külső Szögből Belső Szög',
        question: 'Egy háromszög egyik külső szöge 130°, az egyik nem mellette fekvő belső szöge 50°. Mekkora a másik nem mellette fekvő belső szög?',
        options: ['80°', '50°', '100°', '130°'],
        correctAnswer: 0,
        hint: 'α\' = β + γ, ebből fejezd ki a hiányzó szöget: 130° - 50°.',
        explanation: 'A külső szög tételéből: 130° = 50° + β, amiből β = 130° - 50° = 80°.'
      },
      {
        id: 'tq2-6',
        questionTypeBadge: 'Külső Szögek Összege',
        question: 'Mennyi bármely háromszög három csúcsánál vett (egy-egy) külső szögének összege (α\' + β\' + γ\')?',
        options: ['360°', '180°', '540°', '720°'],
        correctAnswer: 0,
        hint: 'Minden csúcsnál a belső és külső szög összege 180° (összesen 3 · 180° = 540°). Ebből a belső szögek összege 180°.',
        explanation: 'Bármely konvex sokszög – így a háromszög – külső szögeinek összege 360°. (Számítással: 3 · 180° - 180° = 360°).'
      },
      {
        id: 'tq2-7',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Szögei',
        question: 'Egy egyenlő szárú háromszög egyik alapon fekvő belső szöge 35°. Mekkora a szárszöge?',
        options: ['110° (tompaszög)', '70°', '145°', '55°'],
        correctAnswer: 0,
        hint: 'A két alapon fekvő szög 35° és 35°. Számold ki: 180° - 2 · 35°!',
        explanation: 'Az alapon lévő mindkét szög 35°, így összegük 70°. A szárszög: 180° - 70° = 110°. Tehát ez egy egyenlő szárú tompaszögű háromszög!'
      },
      {
        id: 'tq2-8',
        questionTypeBadge: 'Oldalak és Szemközti Szögek',
        question: 'Egy háromszög oldalai a = 8 cm, b = 10 cm, c = 6 cm. Melyik szöge a legnagyobb a háromszögnek?',
        options: ['β (a b oldallal szemközti szög)', 'α (az a oldallal szemközti szög)', 'γ (a c oldallal szemközti szög)', 'Mindhárom szög egyenlő'],
        correctAnswer: 0,
        hint: 'Nagyobb oldallal szemben nagyobb belső szög fekszik.',
        explanation: 'A háromszög alaptétele szerint hosszabb oldallal szemben nagyobb belső szög található. Mivel a b = 10 cm a leghosszabb oldal, a vele szemközti β szög a háromszög legnagyobb szöge.'
      },
      {
        id: 'tq2-9',
        questionTypeBadge: 'Szögarányok Számítása',
        question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Mekkora a legkisebb belső szöge?',
        options: ['40°', '20°', '60°', '80°'],
        correctAnswer: 0,
        hint: 'Oszd el a 180°-ot az arányszámok összegével (2 + 3 + 4 = 9 rész), majd szorozd 2-vel.',
        explanation: 'Az arányos részek összege: 2 + 3 + 4 = 9 egység. 1 egység = 180° / 9 = 20°. A legkisebb szög: 2 · 20° = 40°. (A három szög: 40°, 60°, 80°).'
      },
      {
        id: 'tq2-10',
        questionTypeBadge: 'Egyenlő Szárú Külső Szög',
        question: 'Egy egyenlő szárú háromszög alapjával szemközti szárszögének külső szöge 70°. Mekkorák az alapon fekvő belső szögek?',
        options: ['35° és 35°', '70° és 70°', '55° és 55°', '40° és 40°'],
        correctAnswer: 0,
        hint: 'A szárszöghöz tartozó külső szög egyenlő a két alapon fekvő belső szög összegével.',
        explanation: 'A külső szög tétele szerint a szárszög külső szöge pontosan a két alapi szög összege: α\' = β + γ. Mivel β = γ, ezért 2 · β = 70° => β = 35°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Számítások és Geometriai Bizonyítások (Nehéz)',
    subtitle: 'Szögfelezők metszésszöge, szimmetria-tulajdonságok, haladó arányok és tételek.',
    range: '21 - 30. feladat',
    focus: 'Emelt Szintű Problémamegoldás',
    questions: [
      {
        id: 'tq3-1',
        questionTypeBadge: 'Szögfelezők Metszésszöge',
        question: 'Egy háromszög egyik belső szöge 70°. Mekkora tompaszöget zár be egymással a másik két belső szögének szögfelezője?',
        options: ['125°', '110°', '135°', '145°'],
        correctAnswer: 0,
        hint: 'A másik két félszög összege (180° - 70°) / 2 = 55°. A szögfelezők által bezárt szög: 180° - 55°.',
        explanation: 'Ha α = 70°, akkor β + γ = 180° - 70° = 110°. A belső szögfelezők a szemközti csúcsokkal egy kis háromszöget alkotnak, melynek két alapi szöge β/2 és γ/2. Ezek összege (β + γ)/2 = 55°. A szögfelezők metszésszöge: 180° - 55° = 125°.'
      },
      {
        id: 'tq3-2',
        questionTypeBadge: 'Egész Oldalhosszúságok és Számlálás',
        question: 'Egy háromszög két oldala 4 cm és 11 cm. Hányféle KÜLÖNBÖZŐ PÁROS egész szám lehet a harmadik oldal hossza cm-ben?',
        figure: <TriangleInequalitySvg size={200} />,
        options: ['4 (8, 10, 12, 14)', '3 (8, 10, 12)', '5 (6, 8, 10, 12, 14)', '7'],
        correctAnswer: 0,
        hint: 'A háromszög-egyenlőtlenség: 11 - 4 < c < 11 + 4 => 7 < c < 15. Keresd a páros számokat!',
        explanation: 'A határok: 7 < c < 15. A tartományba eső páros egész számok: 8, 10, 12, 14. Ez összesen 4 lehetséges érték.'
      },
      {
        id: 'tq3-3',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Oldalai',
        question: 'Egy egyenlő szárú háromszög kerülete 32 cm. Az alapja 4 cm-rel rövidebb a száránál. Milyen hosszú a háromszög alapja?',
        options: ['8 cm', '12 cm', '10 cm', '6 cm'],
        correctAnswer: 0,
        hint: 'Legyen a szár a. Ekkor az alap c = a - 4. A kerület K = 2a + c = 32.',
        explanation: '2a + (a - 4) = 32 => 3a - 4 = 32 => 3a = 36 => a = 12 cm (a szárak). Az alap c = 12 - 4 = 8 cm. Ellenőrzés: 12 + 12 + 8 = 32 cm, és 8 + 12 > 12 teljesül.'
      },
      {
        id: 'tq3-4',
        questionTypeBadge: 'Szögegyenlet Megoldása',
        question: 'Egy háromszög belső szögeire igaz: β = 2α és γ = α + 20°. Mekkora a háromszög legnagyobb szöge?',
        options: ['80° (a β szög)', '70°', '90°', '85°'],
        correctAnswer: 0,
        hint: 'Írd fel a belső szögek összegét: α + 2α + (α + 20°) = 180°!',
        explanation: '4α + 20° = 180° => 4α = 160° => α = 40°. Ekkor β = 2 · 40° = 80°, és γ = 40° + 20° = 60°. A háromszög legnagyobb szöge a β = 80°.'
      },
      {
        id: 'tq3-5',
        questionTypeBadge: 'Magasságvonal és Szögfelező',
        question: 'Melyik állítás IGAZ minden egyenlő szárú háromszögre?',
        figure: <IsoscelesAndEquilateralSvg size={200} />,
        options: [
          'Az alaphoz tartozó magasságvonal egyben az alap felezőmerőlegese és a csúcsszög szögfelezője',
          'Mindhárom magasságvonala felezi a belső szögeket',
          'A háromszögnek három szimmetriatengelye van',
          'Az alapon fekvő belső szögek lehetnek derékszögek is'
        ],
        correctAnswer: 0,
        hint: 'A tükörszimmetria miatt az alappal szemközti csúcsból induló vonal egyszerre tölt be több nevezetes szerepet.',
        explanation: 'Az egyenlő szárú háromszög alapjának felezőmerőlegese a háromszög szimmetriatengelye, ezért egybeesik az alaphoz tartozó magasságvonallal, súlyvonallal és a szárszög szögfelezőjével.'
      },
      {
        id: 'tq3-6',
        questionTypeBadge: 'Külső Szögekből Belső Szögek',
        question: 'Egy háromszög két külső szöge 110° és 140°. Milyen típusú a háromszög az oldalai szerint?',
        options: ['Egyenlő szárú háromszög', 'Szabályos háromszög', 'Általános háromszög (minden oldala különböző)', 'Nem létezik ilyen háromszög'],
        correctAnswer: 0,
        hint: 'Számold ki a három belső szöget a külső szögek mellékszögeiként: 180° - 110° és 180° - 140°!',
        explanation: 'A két belső szög: 180° - 110° = 70° és 180° - 140° = 40°. A harmadik belső szög: 180° - (70° + 40°) = 70°. Mivel két belső szöge egyenlő (70° és 70°), a háromszög egyenlő szárú!'
      },
      {
        id: 'tq3-7',
        questionTypeBadge: 'Tompaszögű és Szimmetria',
        question: 'Lehet-e egy tompaszögű háromszög egyenlő szárú háromszög?',
        options: [
          'Igen, ha a tompaszög a szárszög (pl. 120°, 30°, 30°)',
          'Nem, mert a tompaszögű háromszög soha nem lehet szimmetrikus',
          'Csak akkor, ha két tompaszöge van',
          'Nem, mert egyenlő szárú háromszög csak hegyesszögű lehet'
        ],
        correctAnswer: 0,
        hint: 'Az alapon fekvő szögeknek hegyesszögnek kell lenniük, de a harmadik (a csúcsszög) lehet tompa.',
        explanation: 'Igen! Ha a csúcsszög tompaszög (pl. 100°), akkor a két alapon fekvő szög hegyesszög lesz ((180° - 100°) / 2 = 40°). Két tompaszöge egyetlen háromszögnek sem lehet.'
      },
      {
        id: 'tq3-8',
        questionTypeBadge: 'Derékszögű Háromszög és Magasság',
        question: 'Egy derékszögű háromszög átfogóhoz tartozó magassága a derékszöget 35°-os és 55°-os szögekre bontja. Mekkorák a háromszög hegyesszögei?',
        options: ['35° és 55°', '45° és 45°', '30° és 60°', '20° és 70°'],
        correctAnswer: 0,
        hint: 'A magasságvonal a háromszöget két hozzá hasonló derékszögű háromszögre osztja.',
        explanation: 'A magasságvonal merőleges az átfogóra, így két kisebb derékszögű háromszög keletkezik. Mindkét részben az egyik hegyesszög a magasság melletti szög pótszöge: 90° - 55° = 35°, illetve 90° - 35° = 55°. Az eredeti háromszög hegyesszögei tehát pontosan 35° és 55°.'
      },
      {
        id: 'tq3-9',
        questionTypeBadge: 'Szerkeszthetőség Változóval',
        question: 'Egy háromszög oldalai x, 2x és 18 cm. Mely intervallumba kell esnie az x pozitív valós számnak, hogy a háromszög létezzen?',
        options: ['6 < x < 18', 'x > 9', '0 < x < 9', '9 < x < 18'],
        correctAnswer: 0,
        hint: 'Alkalmazd a háromszög-egyenlőtlenséget mindhárom oldalra: 2x - x < 18 és x + 2x > 18.',
        explanation: 'A háromszög-egyenlőtlenségből: 1) x + 2x > 18 => 3x > 18 => x > 6. 2) x + 18 > 2x => x < 18. 3) 2x + 18 > x (automatikusan teljesül pozitív x-re). Tehát 6 < x < 18.'
      },
      {
        id: 'tq3-10',
        questionTypeBadge: 'Geometriai Tétel (Viviani-tétel)',
        question: 'Egy szabályos háromszög belsejében kijelölünk egy tetszőleges P pontot. Mi mondható el a P pontból a három oldalra bocsátott merőleges szakaszok összegéről?',
        figure: <IsoscelesAndEquilateralSvg size={200} />,
        options: [
          'Állandó, és pontosan megegyezik a szabályos háromszög magasságával (m)',
          'Függ a P pont helyétől: a középpontban a legkisebb',
          'Állandó, és megegyezik a háromszög kerületével',
          'Egyenlő a háromszög területének felével'
        ],
        correctAnswer: 0,
        hint: 'Ez a híres Viviani-tétel, amit a három kis részháromszög területének összegével lehet bizonyítani: a/2 · (m₁ + m₂ + m₃) = a/2 · m.',
        explanation: 'A Viviani-tétel szerint szabályos háromszög tetszőleges belső pontjából az oldalakra bocsátott merőleges szakaszok összege állandó, és egyenlő a háromszög magasságával (m₁ + m₂ + m₃ = m).'
      }
    ]
  }
};

export const TrianglesQuiz: React.FC<TrianglesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Általános és szimmetrikus háromszögek"
      subtitle="Gyakorló feladatsor, párosító és csoportosító feladatok a háromszögek tulajdonságairól"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-haromszogek"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó geometriai párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <TrianglesMatcher
              key={`triangles-matcher-${level}`}
              level={level}
              currentLevel={level}
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
          title: 'Csoportosító játék',
          subtitle: 'Csoportosítsd a háromszögeket és geometriai tulajdonságaikat!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <TrianglesSorter
              key={`triangles-sorter-${level}`}
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="space-y-4">
          <CheatSheetCard
            title="Háromszögek Alapszabályai"
            icon={<Layers className="w-5 h-5 text-blue-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Belső szögek összege:</strong> α + β + γ = 180°</li>
              <li><strong>Külső szög tétele:</strong> α' = β + γ (külső szögek összege = 360°)</li>
              <li><strong>Szabályos háromszög:</strong> mindhárom belső szöge 60°, 3 szimmetriatengely</li>
              <li><strong>Derékszögű háromszög:</strong> hegyesszögek összege α + β = 90°</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Háromszög-egyenlőtlenség & Szimmetria"
            icon={<Scale className="w-5 h-5 text-amber-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Háromszög-egyenlőtlenség:</strong> a + b &gt; c, a + c &gt; b, b + c &gt; a</li>
              <li><strong>Harmadik oldal tartománya:</strong> |a - b| &lt; c &lt; a + b</li>
              <li><strong>Hosszabb oldallal szemben</strong> nagyobb belső szög található</li>
              <li><strong>Egyenlő szárú háromszög:</strong> alapon fekvő szögek egyenlők (α = β), alap felezőmerőlegese az egyetlen szimmetriatengely</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

