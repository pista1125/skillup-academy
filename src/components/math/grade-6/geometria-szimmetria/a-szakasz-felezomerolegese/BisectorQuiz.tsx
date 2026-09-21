import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { BisectorMatcher } from './BisectorMatcher';
import { BisectorSorter } from './BisectorSorter';
import {
  BisectorOverviewDiagram,
  BisectorConstructionDiagram,
  CircumscribedCircleDiagram,
  BisectorSolverFigure
} from './BisectorDiagrams';
import { Scissors, Compass, Target, Calculator, Sparkles } from 'lucide-react';

export interface BisectorQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function BisectorQuiz({ onBack, onSwitchToTheory }: BisectorQuizProps) {
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (1 - 10. feladat)
    // ==========================================
    {
      id: 'bq1',
      level: 1,
      prompt: 'Mi a szakaszfelező merőleges pontos definíciója?',
      questionTypeBadge: 'Alapfogalom',
      figure: <BisectorSolverFigure type="definition" />,
      options: [
        'A szakasz felezőpontján (F) átmenő, a szakaszra merőleges (90°-os) egyenes.',
        'A szakasz végpontjából kiinduló bármilyen félegyenes.',
        'A szakasszal párhuzamosan futó tetszőleges egyenes.',
        'A szakaszt 45°-os szögben metsző egyenes.'
      ],
      correctAnswer: 'A szakasz felezőpontján (F) átmenő, a szakaszra merőleges (90°-os) egyenes.',
      explanation:
        'A szakaszfelező merőleges (f_AB) a szakasz pontos F felezőpontján halad át, és merőleges (f_AB ⊥ AB, 90°) a szakaszra.',
      breakdown: [
        { label: 'Pont', value: 'F felezőpont' },
        { label: 'Irány', value: 'Merőleges (90° derékszög)' }
      ],
      hint: 'Két fő tulajdonság: felezi a szakaszt, és derékszöget zár be vele.'
    },
    {
      id: 'bq2',
      level: 1,
      prompt: 'Milyen szöget zár be a szakaszfelező merőleges a szakasszal?',
      questionTypeBadge: 'Tulajdonság',
      options: ['Pontosan 90°-os derékszöget', '45°-os hegyesszöget', '180°-os egyenesszöget', '60°-os szöget'],
      correctAnswer: 'Pontosan 90°-os derékszöget',
      explanation:
        'A nevében is szerepel: "felezőmerőleges", vagyis mindig pontosan 90°-os derékszöget zár be a szakasszal (f ⊥ AB).',
      hint: 'A merőleges egyenesek mindig 90°-os derékszöget zárnak be.'
    },
    {
      id: 'bq3',
      level: 1,
      prompt: 'Ha az AB szakasz hossza 14 cm, mekkora az AF szakasz hossza, ha F a felezőpont?',
      questionTypeBadge: 'Számolás',
      options: ['7 cm', '14 cm', '28 cm', '3.5 cm'],
      correctAnswer: '7 cm',
      explanation:
        'A felezőpont (F) pontosan kettéosztja a szakaszt: AF = FB = AB / 2 = 14 cm / 2 = 7 cm.',
      breakdown: [
        { label: 'AB hossza', value: '14 cm' },
        { label: 'AF fele', value: '14 / 2 = 7 cm' }
      ],
      hint: 'Oszd el a teljes hosszt kettővel!'
    },
    {
      id: 'bq4',
      level: 1,
      prompt: 'Mit állít a szakaszfelező merőleges ponthalmaz alaptétele?',
      questionTypeBadge: 'Tétel',
      figure: <BisectorSolverFigure type="distance" param1="PA" param2="PB = PA" />,
      options: [
        'A szakaszfelező merőleges bármely P pontja egyenlő távolságra van a szakasz két végpontjától (PA = PB).',
        'A felezőmerőleges pontjai mindig közelebb vannak az A ponthoz.',
        'A felezőmerőleges pontjai a szakasz hosszának kétszeresére vannak.',
        'A felezőmerőleges minden pontja egybeesik a felezőponttal.'
      ],
      correctAnswer: 'A szakaszfelező merőleges bármely P pontja egyenlő távolságra van a szakasz két végpontjától (PA = PB).',
      explanation:
        'A szakaszfelező merőleges a sík azon pontjainak halmaza, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak: d(P, A) = d(P, B), azaz PA = PB.',
      hint: 'Minden pontja pontosan ugyanolyan messze van A-tól, mint B-től.'
    },
    {
      id: 'bq5',
      level: 1,
      prompt: 'A P pont rajta van az AB szakasz felezőmerőlegesén. Ha PA = 9 cm, mekkora a PB távolság?',
      questionTypeBadge: 'Számolás',
      figure: <BisectorSolverFigure type="distance" param1="PA = 9 cm" param2="PB = ?" />,
      options: ['9 cm', '18 cm', '4.5 cm', 'Nem határozható meg'],
      correctAnswer: '9 cm',
      explanation:
        'Mivel P pont rajta van a felezőmerőlegesen, a ponthalmaz tétel értelmében PA = PB, így PB = 9 cm.',
      breakdown: [
        { label: 'Feltétel', value: 'P ∈ f_AB' },
        { label: 'Összefüggés', value: 'PA = PB' },
        { label: 'Eredmény', value: 'PB = 9 cm' }
      ],
      hint: 'A felezőmerőlegesen lévő pontok egyenlő távol vannak mindkét végponttól.'
    },
    {
      id: 'bq6',
      level: 1,
      prompt: 'Milyen háromszöget alkot a felezőmerőleges tetszőleges P pontja a szakasz A és B végpontjaival (ha P ≠ F)?',
      questionTypeBadge: 'Geometriai alakzat',
      options: [
        'Egyenlő szárú háromszöget (szárai: PA = PB)',
        'Derékszögű háromszöget (mindig)',
        'Szabályos háromszöget (mindig)',
        'Tompaszögű háromszöget (mindig)'
      ],
      correctAnswer: 'Egyenlő szárú háromszöget (szárai: PA = PB)',
      explanation:
        'Mivel PA = PB, az APB háromszög két szára pontosan egyenlő hosszú, így az APB háromszög mindig egyenlő szárú háromszög (alapja AB).',
      hint: 'Két oldala egyenlő hosszú (PA = PB).'
    },
    {
      id: 'bq7',
      level: 1,
      prompt: 'Hány szimmetriatengelye van egy szakasznak a síkban?',
      questionTypeBadge: 'Szimmetria',
      options: [
        'Pontosan 2 szimmetriatengelye (a szakasz egyenese és a szakaszfelező merőleges)',
        'Csak 1 szimmetriatengelye',
        'Végtelen sok szimmetriatengelye',
        'Nincs szimmetriatengelye'
      ],
      correctAnswer: 'Pontosan 2 szimmetriatengelye (a szakasz egyenese és a szakaszfelező merőleges)',
      explanation:
        'Egy szakasznak pontosan 2 szimmetriatengelye van: 1. a szakaszt tartalmazó egyenes, 2. a szakaszfelező merőleges.',
      breakdown: [
        { label: '1. Tengely', value: 'Szakasz saját egyenese' },
        { label: '2. Tengely', value: 'Szakaszfelező merőleges' }
      ],
      hint: 'Hosszirányban és keresztben is felezhető tengelyesen.'
    },
    {
      id: 'bq8',
      level: 1,
      prompt: 'Ha a t egyenesre tükrözve az A pont képe a B pont lesz, mi a t egyenes neve az AB szakaszhoz képest?',
      questionTypeBadge: 'Tükrözés',
      figure: <BisectorSolverFigure type="symmetry" />,
      options: [
        'Az AB szakasz felezőmerőlegese',
        'Az AB szakasszal párhuzamos egyenes',
        'Az A ponton átmenő egyenes',
        'A B pont érintője'
      ],
      correctAnswer: 'Az AB szakasz felezőmerőlegese',
      explanation:
        'A tengelyes tükrözés definíciója szerint a tükörtengely az összetartozó pontpárokat összekötő szakasz felezőmerőlegese.',
      hint: 'A tükörtengely merőlegesen felezi a tükörkép-szakaszt.'
    },
    {
      id: 'bq9',
      level: 1,
      prompt: 'Ha a sík egy P pontjára PA = PB teljesül, hol helyezkedik el a P pont?',
      questionTypeBadge: 'Megfordított tétel',
      options: [
        'Biztosan rajta van az AB szakasz felezőmerőlegesén.',
        'Csak az AB szakasz felezőpontja lehet.',
        'A körön kívül van.',
        'Bárhol lehet a síkban, nincs megkötés.'
      ],
      correctAnswer: 'Biztosan rajta van az AB szakasz felezőmerőlegesén.',
      explanation:
        'A tétel megfordítása is igaz: ha egy pont egyenlő távolságra van A-tól és B-től (PA = PB), akkor az a pont biztosan a felezőmerőlegesen fekszik.',
      hint: 'Minden pont, ami egyenlő távol van a végpontoktól, a felezőmerőlegesre esik.'
    },
    {
      id: 'bq10',
      level: 1,
      prompt: 'Hol metszi a szakaszfelező merőleges az AB szakaszt?',
      questionTypeBadge: 'Alapfogalom',
      options: [
        'Pontosan az F felezőpontban',
        'Az A végpontban',
        'A B végpontban',
        'Nem metszi a szakaszt'
      ],
      correctAnswer: 'Pontosan az F felezőpontban',
      explanation:
        'A felezőmerőleges a szakasz F felezőpontján halad át, így ott metszi a szakaszt.',
      hint: 'A felezőpont a metszéspont.'
    },

    // ==========================================
    // 2. SZINT: SZERKESZTÉS ÉS TÁVOLSÁGOK (11 - 20.)
    // ==========================================
    {
      id: 'bq11',
      level: 2,
      prompt: 'Mekkora r körzőnyílást kell választani az AB szakasz felezőmerőlegesének szerkesztésekor?',
      questionTypeBadge: 'Szerkesztés',
      figure: <BisectorSolverFigure type="construction" />,
      options: [
        'A szakasz felénél nagyobbat (r > AB / 2)',
        'Pontosan a szakasz felét (r = AB / 2)',
        'A szakasz felénél kisebbet (r < AB / 2)',
        'Bármilyen tetszőleges sugarat, akár 1 mm-t is'
      ],
      correctAnswer: 'A szakasz felénél nagyobbat (r > AB / 2)',
      explanation:
        'A körzőnyílásnak nagyobbnak kell lennie a szakasz felénél (r > AB / 2), hogy az A és B pontból húzott körívek metszeni tudják egymást.',
      breakdown: [
        { label: 'Feltétel', value: 'r > AB / 2' },
        { label: 'Cél', value: 'Metszéspontok (M₁, M₂) létrehozása' }
      ],
      hint: 'Ha túl kicsi a körzőnyílás, a körívek el sem érik egymást!'
    },
    {
      id: 'bq12',
      level: 2,
      prompt: 'Mi történik a szerkesztés során, ha a körzőnyílás kisebb a szakasz felénél (r < AB / 2)?',
      questionTypeBadge: 'Szerkesztés',
      options: [
        'A körívek nem metszik egymást, így nem jön létre a két metszéspont.',
        'A felezőmerőleges ferde lesz.',
        'A felezőmerőleges párhuzamos lesz a szakasszal.',
        'Nem történik semmi, a szerkesztés ugyanúgy sikerül.'
      ],
      correctAnswer: 'A körívek nem metszik egymást, így nem jön létre a két metszéspont.',
      explanation:
        'Ha r < AB / 2, a két körív távolsága túl nagy, nem érnek össze és nem alakul ki metszéspont a felezőmerőleges megrajzolásához.',
      hint: 'A két körív nem fog összeérni a síkban.'
    },
    {
      id: 'bq13',
      level: 2,
      prompt: 'A sík egy Q pontjára QA = 4 cm és QB = 9 cm. Mit állíthatunk a Q pont helyzetéről?',
      questionTypeBadge: 'Félsíkok távolsága',
      figure: <BisectorSolverFigure type="distance_comparison" />,
      options: [
        'Az A felőli félsíkban van (közelebb van A-hoz, mint B-hez).',
        'A B felőli félsíkban van (közelebb van B-hez, mint A-hoz).',
        'Rajta van a felezőmerőlegesen.',
        'Pontosan az AB szakasz felezőpontja.'
      ],
      correctAnswer: 'Az A felőli félsíkban van (közelebb van A-hoz, mint B-hez).',
      explanation:
        'Mivel QA = 4 cm < QB = 9 cm, a Q pont közelebb van az A ponthoz, vagyis a felezőmerőleges által határolt, A-t tartalmazó félsíkban fekszik.',
      breakdown: [
        { label: 'QA', value: '4 cm' },
        { label: 'QB', value: '9 cm' },
        { label: 'Összehasonlítás', value: 'QA < QB ⟹ közelebb A-hoz' }
      ],
      hint: '4 cm kisebb mint 9 cm, tehát A-hoz van közelebb.'
    },
    {
      id: 'bq14',
      level: 2,
      prompt: 'Ha az AB szakasz hossza AB = 16 cm, melyik körzőnyílással (r) LEHET megszerkeszteni a felezőmerőlegest?',
      questionTypeBadge: 'Számolás & Szerkesztés',
      options: ['10 cm (mivel 10 > 8 cm)', '6 cm', '8 cm', '4 cm'],
      correctAnswer: '10 cm (mivel 10 > 8 cm)',
      explanation:
        'Mivel AB / 2 = 16 / 2 = 8 cm, a körzőnyílásnak r > 8 cm-nek kell lennie. Az opciók közül a 10 cm felel meg ennek a feltételnek.',
      hint: 'A fele 8 cm. Ennél nagyobbat kell választanod!'
    },
    {
      id: 'bq15',
      level: 2,
      prompt: 'Egyenlő szárú háromszögben melyik nevezetes vonal esik egybe az alap szakaszfelező merőlegesével?',
      questionTypeBadge: 'Tulajdonság',
      options: [
        'Az alaphoz tartozó magasságvonal és a csúcsszög szögfelezője',
        'A szár felezőmerőlegese',
        'A háromszög középvonala',
        'Egyik sem esik egybe'
      ],
      correctAnswer: 'Az alaphoz tartozó magasságvonal és a csúcsszög szögfelezője',
      explanation:
        'Egyenlő szárú háromszögben a szimmetriatengely átmegy a szemközti csúcson, felezi az alapot és merőleges rá, így egybeesik a magassággal és a szögfelezővel is.',
      hint: 'A szimmetriatengely a csúcsból indul és merőlegesen felezi az alapot.'
    },
    {
      id: 'bq16',
      level: 2,
      prompt: 'Hány pont határoz meg egyértelműen egy egyenest a síkban?',
      questionTypeBadge: 'Alapfogalom',
      options: ['2 pont', '1 pont', '3 pont', 'Végtelen sok pont'],
      correctAnswer: '2 pont',
      explanation:
        'Bármely két különböző ponton keresztül pontosan egy egyenes fektethető. Ezért kell a szerkesztésnél megtalálnunk az M₁ és M₂ pontokat.',
      hint: 'Két pontot összekötve már megvan az egyenes.'
    },
    {
      id: 'bq17',
      level: 2,
      prompt: 'Ha P pont rajta van az AB szakaszon, és PA = PB, akkor P pont az AB szakasz:',
      questionTypeBadge: 'Fogalom',
      options: [
        'Felezőpontja (F)',
        'Egyik végpontja',
        'Súlypontja',
        'Magasságpontja'
      ],
      correctAnswer: 'Felezőpontja (F)',
      explanation:
        'A szakaszon lévő egyetlen olyan pont, amely egyenlő távolságra van a két végponttól, a szakasz F felezőpontja.',
      hint: 'A szakasz azon pontja, ami pontosan középen van.'
    },
    {
      id: 'bq18',
      level: 2,
      prompt: 'Melyik állítás IGAZ az M₁ és M₂ szerkesztési metszéspontokra nézve?',
      questionTypeBadge: 'Szerkesztés',
      options: [
        'Mindkettőre igaz, hogy M₁A = M₁B és M₂A = M₂B (ugyanolyan távol vannak A-tól és B-től).',
        'Az M₁ pont közelebb van A-hoz, az M₂ pont közelebb van B-hez.',
        'Az M₁ és M₂ pontok a szakaszon fekszenek.',
        'M₁ és M₂ távolsága a szakasztól mindig 1 cm.'
      ],
      correctAnswer: 'Mindkettőre igaz, hogy M₁A = M₁B és M₂A = M₂B (ugyanolyan távol vannak A-tól és B-től).',
      explanation:
        'Mivel mindkét pontot azonos sugarú körívekkel hoztuk létre A-ból és B-ből, mindkét pont egyenlő távolságra van a végpontoktól.',
      hint: 'Mindkét metszéspont azonos sugarú körívekből keletkezett.'
    },
    {
      id: 'bq19',
      level: 2,
      prompt: 'Ha egy körben meghúzzuk egy tetszőleges húr felezőmerőlegesét, melyik nevezetes ponton halad át biztosan?',
      questionTypeBadge: 'Alkalmazás',
      options: [
        'A kör O középpontján',
        'Az érintési ponton',
        'A körív végpontján',
        'Egyik nevezetes ponton sem'
      ],
      correctAnswer: 'A kör O középpontján',
      explanation:
        'A húr két végpontja (A és B) a körvonalon van, így OA = OB = r (a kör sugara). Mivel O egyenlő távol van A-tól és B-től, a húr felezőmerőlegese átmegy O-n.',
      hint: 'A kör középpontja egyenlő távol van a körvonal minden pontjától.'
    },
    {
      id: 'bq20',
      level: 2,
      prompt: 'A számegyenesen A = 2 és B = 10. Melyik szám a szakasz felezőpontja (F)?',
      questionTypeBadge: 'Számegyenes',
      options: ['6', '5', '8', '4'],
      correctAnswer: '6',
      explanation:
        'A felezőpont a két koordináta számtani közepe: F = (2 + 10) / 2 = 12 / 2 = 6.',
      breakdown: [
        { label: 'Képlet', value: 'F = (A + B) / 2' },
        { label: 'Számolás', value: '(2 + 10) / 2 = 6' }
      ],
      hint: 'Add össze a két számot, és oszd el 2-vel!'
    },

    // ==========================================
    // 3. SZINT: HÁROMSZÖGEK ÉS KÖRÜLÍRT KÖR (21 - 30.)
    // ==========================================
    {
      id: 'bq21',
      level: 3,
      prompt: 'Mit állíthatunk egy tetszőleges háromszög három oldalfelező merőlegeséről?',
      questionTypeBadge: 'Tétel',
      figure: <BisectorSolverFigure type="triangle_center" />,
      options: [
        'Egyetlen közös pontban (O) metszik egymást.',
        'Párhuzamosak egymással.',
        'Három különböző pontban metszik egymást, egy kis háromszöget alkotva.',
        'Csak kettő metszi egymást, a harmadik elkerüli őket.'
      ],
      correctAnswer: 'Egyetlen közös pontban (O) metszik egymást.',
      explanation:
        'Alapvető geometriai tétel: bármely háromszög három oldalfelező merőlegese egyetlen közös pontban (O) metszi egymást.',
      breakdown: [
        { label: 'Tétel', value: 'Oldalfelező merőlegesek egy pontban metszik egymást' },
        { label: 'Metszéspont jele', value: 'O' }
      ],
      hint: 'Mindhárom felezőmerőleges pontosan egyetlen pontban találkozik.'
    },
    {
      id: 'bq22',
      level: 3,
      prompt: 'Milyen nevezetes pontot határoz meg a háromszög oldalfelező merőlegeseinek O metszéspontja?',
      questionTypeBadge: 'Nevezetes pont',
      figure: <CircumscribedCircleDiagram />,
      options: [
        'A háromszög körülírt körének középpontját',
        'A háromszög beírt körének középpontját',
        'A háromszög súlypontját',
        'A háromszög magasságpontját'
      ],
      correctAnswer: 'A háromszög körülírt körének középpontját',
      explanation:
        'Mivel az O pont mindhárom oldalfelezőn rajta van: OA = OB = OC = R, így O a mindhárom csúcson áthaladó körülírt kör középpontja.',
      hint: 'A csúcsokon átmenő kör (körülírt kör) középpontja.'
    },
    {
      id: 'bq23',
      level: 3,
      prompt: 'Miért egyenlő távolságra van az O metszéspont a háromszög mindhárom csúcsától (OA = OB = OC)?',
      questionTypeBadge: 'Bizonyítás',
      options: [
        'Mivel O rajta van az AB felezőjén (OA=OB) és a BC felezőjén is (OB=OC), így OA=OB=OC.',
        'Mert minden háromszög oldala egyenlő.',
        'Mert a háromszög területe állandó.',
        'Ez csak szabályos háromszögekre igaz.'
      ],
      correctAnswer: 'Mivel O rajta van az AB felezőjén (OA=OB) és a BC felezőjén is (OB=OC), így OA=OB=OC.',
      explanation:
        'f_c-ből következik OA = OB, f_a-ból következik OB = OC, tehát tranzitívan OA = OB = OC = R.',
      hint: 'Mivel mindkét felezőmerőlegesen rajta van, a távolságok láncszerűen megegyeznek.'
    },
    {
      id: 'bq24',
      level: 3,
      prompt: 'Hol helyezkedik el a körülírt kör O középpontja egy hegyesszögű háromszögben?',
      questionTypeBadge: 'Háromszögtípusok',
      figure: <BisectorSolverFigure type="triangle_center" />,
      options: [
        'A háromszög belsejében',
        'Az átfogó felezőpontján',
        'A háromszögön kívül',
        'A legnagyobb csúcsban'
      ],
      correctAnswer: 'A háromszög belsejében',
      explanation:
        'Hegyesszögű háromszög esetén mindhárom szög 90°-nál kisebb, így az oldalfelező merőlegesek a háromszög belsejében metszik egymást.',
      hint: 'Ha minden szög hegyes, az O pont a háromszög belsejébe esik.'
    },
    {
      id: 'bq25',
      level: 3,
      prompt: 'Hol helyezkedik el a körülírt kör O középpontja egy derékszögű háromszögben?',
      questionTypeBadge: 'Háromszögtípusok',
      figure: <BisectorSolverFigure type="right_triangle" />,
      options: [
        'Pontosan az átfogó felezőpontján (Thalész-tétel)',
        'A derékszögű csúcsban',
        'A háromszögön kívül',
        'A hosszabbik befogó harmadánál'
      ],
      correctAnswer: 'Pontosan az átfogó felezőpontján (Thalész-tétel)',
      explanation:
        'Derékszögű háromszögben az átfogó felezőpontja pontosan egyenlő távol van mindhárom csúcstól (Thalész-tétel), így a körülírt kör középpontja az átfogó felezőpontja.',
      breakdown: [
        { label: 'Típus', value: 'Derékszögű háromszög' },
        { label: 'O helye', value: 'Átfogó felezőpontja' },
        { label: 'Kapcsolódó tétel', value: 'Thalész-tétel' }
      ],
      hint: 'A derékszögű háromszög átfogója a körülírt kör átmérője!'
    },
    {
      id: 'bq26',
      level: 3,
      prompt: 'Hol helyezkedik el a körülírt kör O középpontja egy tompaszögű háromszögben?',
      questionTypeBadge: 'Háromszögtípusok',
      figure: <BisectorSolverFigure type="obtuse_triangle" />,
      options: [
        'A háromszögön kívül (a tompaszöggel szemközti oldal mögött)',
        'A háromszög belsejében',
        'A tompaszögű csúcsban',
        'A legrövidebb oldal felezőjén'
      ],
      correctAnswer: 'A háromszögön kívül (a tompaszöggel szemközti oldal mögött)',
      explanation:
        'Tompaszögű háromszögben a 90°-nál nagyobb szög miatt az oldalfelező merőlegesek a háromszögön kívül metszik egymást.',
      hint: 'Tompaszög esetén az O pont kiesik a háromszögből.'
    },
    {
      id: 'bq27',
      level: 3,
      prompt: 'Egy derékszögű háromszög átfogója c = 12 cm. Mekkora a háromszög körülírt körének sugara (R)?',
      questionTypeBadge: 'Számolás',
      options: ['6 cm', '12 cm', '24 cm', '3 cm'],
      correctAnswer: '6 cm',
      explanation:
        'Derékszögű háromszögben a körülírt kör középpontja az átfogó felezőpontja, így az átfogó a kör átmérője (d = c = 12 cm), a sugár pedig ennek a fele: R = c / 2 = 12 / 2 = 6 cm.',
      breakdown: [
        { label: 'Átfogó (átmérő)', value: 'c = 12 cm' },
        { label: 'Sugár', value: 'R = c / 2 = 6 cm' }
      ],
      hint: 'Az átfogó a körülírt kör átmérője. Oszd el 2-vel!'
    },
    {
      id: 'bq28',
      level: 3,
      prompt: 'Ha egy háromszög körülírt körének sugara R = 8 cm, mekkora az OB szakasz hossza?',
      questionTypeBadge: 'Számolás',
      options: ['8 cm', '16 cm', '4 cm', 'Nem határozható meg'],
      correctAnswer: '8 cm',
      explanation:
        'Mivel a B pont a háromszög egyik csúcsa a körülírt körön, az O középponttól mért távolsága pontosan a körülírt kör sugara: OB = R = 8 cm.',
      hint: 'Minden csúcs a körvonalon van, így távolságuk O-tól pontosan R.'
    },
    {
      id: 'bq29',
      level: 3,
      prompt: 'Mit állíthatunk egy szabályos (egyenlő oldalú) háromszög oldalfelező merőlegeseiről?',
      questionTypeBadge: 'Szabályos háromszög',
      options: [
        'Egybeesnek a magasságvonalakkal, a szögfelezőkkel és a súlyvonalakkal is.',
        'Csak a súlyvonalakkal esnek egybe, a magasságokkal nem.',
        'Kívül metszik egymást.',
        'Nem metszik egymást egy pontban.'
      ],
      correctAnswer: 'Egybeesnek a magasságvonalakkal, a szögfelezőkkel és a súlyvonalakkal is.',
      explanation:
        'Szabályos háromszögben a teljes szimmetria miatt az oldalfelező merőlegesek, a belső szögfelezők, a magasságvonalak és a súlyvonalak mind egybeesnek.',
      hint: 'A szabályos háromszög legtökéletesebb szimmetriája miatt minden nevezetes vonal egybeesik.'
    },
    {
      id: 'bq30',
      level: 3,
      prompt: 'Hogyan szerkeszthető meg az a kör, amely 3 adott, nem egy egyenesbe eső ponton (A, B, C) halad át?',
      questionTypeBadge: 'Szerkesztési feladat',
      figure: <CircumscribedCircleDiagram />,
      options: [
        'Megszerkesztjük az AB és BC szakaszok felezőmerőlegeseit; metszéspontjuk (O) lesz a kör középpontja, sugara OA.',
        'Összekötjük A-t és B-t, és annak felezőjéből tetszőleges sugarú kört rajzolunk.',
        'Megszerkesztjük az A és B pontok érintőit.',
        'Nem lehet ilyen kört szerkeszteni.'
      ],
      correctAnswer: 'Megszerkesztjük az AB és BC szakaszok felezőmerőlegeseit; metszéspontjuk (O) lesz a kör középpontja, sugara OA.',
      explanation:
        'A három pont által alkotott háromszög két oldalfelező merőlegesének metszéspontja adja a körülírt kör O középpontját, amiből OA = R sugárral megrajzolható a kör.',
      breakdown: [
        { label: '1. Lépés', value: 'AB és BC felezőmerőlegesének szerkesztése' },
        { label: '2. Lépés', value: 'Metszéspont: O középpont' },
        { label: '3. Lépés', value: 'Kör megrajzolása O középponttal, OA sugárral' }
      ],
      hint: 'Két oldal felezőmerőlegesének metszéspontja adja a kör középpontját.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      title: 'A szakaszfelező merőleges alapjai',
      description: 'Definíció, derékszög és ponthalmaz tétel',
      formula: 'd(P, A) = d(P, B)    és    f_AB ⊥ AB',
      color: 'teal',
      content: <BisectorOverviewDiagram />
    },
    {
      title: 'Szerkesztés lépései körzővel',
      description: 'Körzőnyílás r > AB/2, M₁ és M₂ metszéspontok',
      formula: 'r > AB / 2    ⟹    M₁M₂ egyenes = f_AB',
      color: 'cyan',
      content: <BisectorConstructionDiagram />
    },
    {
      title: 'Háromszög körülírt köre',
      description: 'Oldalfelezők metszéspontja (O) és a körülírt kör sugara (R)',
      formula: 'OA = OB = OC = R',
      color: 'indigo',
      content: <CircumscribedCircleDiagram />
    },
    {
      title: 'Középpont (O) helyzete háromszögekben',
      description: 'Hegyesszögű, derékszögű és tompaszögű esetek',
      formula: 'Hegyes: Belül  |  Derékszögű: Átfogón  |  Tompa: Kívül',
      color: 'purple',
      content: (
        <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 text-xs space-y-1.5">
          <div className="font-bold text-purple-800 dark:text-purple-300">Összefoglaló táblázat:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <div>• <strong className="text-sky-600">Hegyesszögű:</strong> O a háromszög belsejében</div>
            <div>• <strong className="text-emerald-600">Derékszögű:</strong> O az átfogó felezőpontján (R = c/2)</div>
            <div>• <strong className="text-rose-600">Tompaszögű:</strong> O a háromszögön kívülre esik</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <QuizTemplate
      title="A szakaszfelező merőleges Kvíz"
      subtitle="Definíció, ponthalmaz tétel, szerkesztés, szimmetria és körülírt kör"
      badge="📐 6. Osztály • III. Geometria • 4. Fejezet"
      topicId="g6-bisector-quiz"
      themeColor="teal"
      questions={questions}
      cheatSheetTitle="Felezőmerőleges Képtár & Képlettár"
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <BisectorMatcher {...props} />}
      renderSorter={(props) => <BisectorSorter {...props} />}
      matcherComponent={
        <BisectorMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <BisectorSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
