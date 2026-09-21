import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { PlanarShapesMatcher } from './PlanarShapesMatcher';
import { PlanarShapesSorter } from './PlanarShapesSorter';
import {
  BasicElementsDiagram,
  LineRelationshipsDiagram,
  AngleTypesDiagram,
  ConvexConcaveDiagram,
  PolygonDiagonalsDiagram,
  AngleFigure,
  SegmentFigure,
  RayFigure,
  ParallelLinesFigure,
  PerpendicularLinesFigure,
  AngleAdditionFigure,
  TriangleAnglesFigure,
  PolygonFigure,
  ConcaveShapeFigure,
  VerticalAnglesFigure
} from './GeometryDiagrams';
import { Compass, MoveHorizontal, Target, Shapes, Calculator } from 'lucide-react';

export interface PlanarShapesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function PlanarShapesQuiz({ onBack, onSwitchToTheory }: PlanarShapesQuizProps) {
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (1 - 10. feladat)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      prompt: 'Hogyan jelöljük a síkgeometriában a pontokat a megadott ábra szerint?',
      questionTypeBadge: 'Jelölések',
      figure: <BasicElementsDiagram />,
      options: [
        'Nyomtatott nagybetűkkel (pl. A, B, P)',
        'Latin kisbetűkkel (pl. a, b, e)',
        'Görög kisbetűkkel (pl. α, β, γ)',
        'Római számokkal (pl. I, II, III)'
      ],
      correctAnswer: 'Nyomtatott nagybetűkkel (pl. A, B, P)',
      explanation:
        'A geometriában a pontokat nyomtatott nagybetűkkel (pl. A, B, P, Q), míg az egyeneseket kisbetűkkel (pl. e, f, a, b) jelöljük.',
      hint: 'Nézd meg a fenti ábrán a pontok melletti feliratokat!'
    },
    {
      id: 'q2',
      level: 1,
      prompt: 'Mit látunk az alábbi ábrán? Két végpont határolja, és pontosan mérhető a hossza.',
      questionTypeBadge: 'Alapelemek',
      figure: <SegmentFigure label="AB szakasz" length="6 cm" />,
      options: ['Szakasz (AB)', 'Félegyenes [AB)', 'Egyenes (e)', 'Szög (α)'],
      correctAnswer: 'Szakasz (AB)',
      explanation:
        'A két végpont (A és B) által határolt egyenes vonaldarab a szakasz. Hossza véges és mérhető.',
      breakdown: [
        { label: 'Végpontok száma', value: '2 végpont (A és B)' },
        { label: 'Kiterjedés', value: 'Véges, mérhető hossz' },
        { label: 'Jelölés', value: 'AB vagy d(A, B)' }
      ],
      hint: 'Mindkét végén zárt vonaldarab, aminek lemérhetjük a hosszát.'
    },
    {
      id: 'q3',
      level: 1,
      prompt: 'Hány közös pontja van két egymást metsző egyenesnek a síkban?',
      questionTypeBadge: 'Egyenesek helyzete',
      figure: <LineRelationshipsDiagram />,
      options: ['Pontosan 1 közös pontja', '0 közös pontja', 'Végtelen sok pontja', '2 közös pontja'],
      correctAnswer: 'Pontosan 1 közös pontja',
      explanation:
        'Két metsző egyenesnek a síkban pontosan egyetlen közös pontja van (a metszéspont, M).',
      breakdown: [
        { label: 'Metsző egyenesek', value: 'Pontosan 1 metszéspont (M)' },
        { label: 'Párhuzamos egyenesek', value: '0 közös pont (vagy egybeesnek)' }
      ],
      hint: 'Ha két ceruzát keresztbe teszel az asztalon, egyetlen pontban keresztezik egymást!'
    },
    {
      id: 'q4',
      level: 1,
      prompt: 'Milyen helyzetű a két egyenes az alábbi ábrán, és mekkora szöget zárnak be egymással?',
      questionTypeBadge: 'Merőlegesség',
      figure: <PerpendicularLinesFigure label="a ⊥ b" />,
      options: ['Egymásra merőlegesek (90°)', 'Párhuzamosak (0°)', 'Metszőek, de nem merőlegesek (45°)', 'Egybeesők'],
      correctAnswer: 'Egymásra merőlegesek (90°)',
      explanation:
        'A merőleges egyenesek (a ⊥ b) egymást 90°-os szögben, azaz derékszögben metszik. A derékszöget a sarokban lévő kis négyzet és pont jelöli.',
      hint: 'A sarokba rajzolt négyzet a 90°-os derékszöget jelöli!'
    },
    {
      id: 'q5',
      level: 1,
      prompt: 'Milyen kapcsolatban áll egymással az ábrán látható két egyenes?',
      questionTypeBadge: 'Párhuzamosság',
      figure: <ParallelLinesFigure label="a ∥ b" />,
      options: [
        'Párhuzamosak (nincs közös pontjuk, távolságuk állandó)',
        'Metszőek (1 közös pontjuk van)',
        'Merőlegesek (90°-os szöget zárnak be)',
        'Ferde metszők'
      ],
      correctAnswer: 'Párhuzamosak (nincs közös pontjuk, távolságuk állandó)',
      explanation:
        'A párhuzamos egyenesek (a ∥ b) síkbeli egyenesek, amelyek sosem metszik egymást (0 közös pont), és távolságuk mindenütt állandó.',
      hint: 'Gondolj a vasúti sínekre: mindig egyforma távolságra futnak egymástól!'
    },
    {
      id: 'q6',
      level: 1,
      prompt: 'Milyen fajta szög látható az alábbi ábrán?',
      questionTypeBadge: 'Vizuális Szögfelismerés',
      figure: <AngleFigure degrees={55} showDegrees={false} showGuide="90" color="#0284c7" />,
      options: ['Hegyesszög', 'Tompaszög', 'Derékszög', 'Homorúszög'],
      correctAnswer: 'Hegyesszög',
      explanation:
        'Az ábrán látható szög kisebb a szaggatott vonallal jelölt derékszögnél (90°-nál), és nagyobb 0°-nál (0° < α < 90°). Ezért ez egy hegyesszög.',
      breakdown: [
        { label: 'Feltétel', value: '0° < α < 90°' },
        { label: 'Típus', value: 'Hegyesszög (kb. 55°)' }
      ],
      hint: 'Nézd meg a szaggatott derékszög-segédvonalat: a szög ennél szűkebb/hegyesebb!'
    },
    {
      id: 'q7',
      level: 1,
      prompt: 'Milyen fajta szög látható az alábbi ábrán?',
      questionTypeBadge: 'Vizuális Szögfelismerés',
      figure: <AngleFigure degrees={135} showDegrees={false} showGuide="90" color="#7c3aed" />,
      options: ['Tompaszög', 'Hegyesszög', 'Egyenesszög', 'Homorúszög'],
      correctAnswer: 'Tompaszög',
      explanation:
        'Az ábrán látható szög tágabb a derékszögnél (90°-nál), de még nem éri el az egyenest (180°-ot). Mivel 90° < α < 180°, ez egy tompaszög.',
      breakdown: [
        { label: 'Feltétel', value: '90° < α < 180°' },
        { label: 'Típus', value: 'Tompaszög (kb. 135°)' }
      ],
      hint: 'Nagyobb a derékszögnél (90°), de kisebb az egyenesszögnél (180°).'
    },
    {
      id: 'q8',
      level: 1,
      prompt: 'Milyen típusú szög látható az alábbi ábrán, amelynek szárai egy egyenest alkotnak?',
      questionTypeBadge: 'Vizuális Szögfelismerés',
      figure: <AngleFigure degrees={180} showDegrees={false} color="#ea580c" />,
      options: ['Egyenesszög (180°)', 'Derékszög (90°)', 'Teljesszög (360°)', 'Tompaszög'],
      correctAnswer: 'Egyenesszög (180°)',
      explanation:
        'Az egyenesszög szárai egymás meghosszabbításai, egyetlen egyenest alkotnak. Pontos nagysága 180°, ami egy félkörnek felel meg.',
      hint: 'A félkör ívének megfelelő szög, amelynek szárai egy egyenes vonalat képeznek.'
    },
    {
      id: 'q9',
      level: 1,
      prompt: 'Konvex vagy konkáv az alábbi ábrán látható "beharapott" sokszög?',
      questionTypeBadge: 'Alakzat felismerés',
      figure: <ConcaveShapeFigure label="Nyílhegy alakzat" />,
      options: [
        'Konkáv sokszög (van 180°-nál nagyobb szöge, átlója kimegy a sokszögből)',
        'Konvex sokszög (minden szöge kisebb 180°-nál)',
        'Szabályos négyszög',
        'Nem sokszög'
      ],
      correctAnswer: 'Konkáv sokszög (van 180°-nál nagyobb szöge, átlója kimegy a sokszögből)',
      explanation:
        'A konkáv sokszög könnyen felismerhető a "beharapásról": van legalább egy 180°-nál nagyobb (homorú) belső szöge, és a beharapás két csúcsát összekötő átló (piros szaggatott vonal) a sokszög határain kívül halad.',
      hint: 'Figyeld meg a piros szaggatott vonalat: kívül fut a sokszögön!'
    },
    {
      id: 'q10',
      level: 1,
      prompt: 'Hány átlója van az ábrán látható háromszögnek?',
      questionTypeBadge: 'Átlók száma',
      figure: <PolygonFigure sides={3} showDiagonals={false} />,
      options: ['0 átlója van', '1 átlója van', '3 átlója van', '2 átlója van'],
      correctAnswer: '0 átlója van',
      explanation:
        'A háromszög bármely két csúcsa szomszédos, így nem lehet benne nem-szomszédos csúcsokat összekötni. A képlet alapján is: d = (3 · (3 - 3)) / 2 = 0.',
      hint: 'Az átló nem szomszédos csúcsokat köt össze. Van a háromszögben nem szomszédos csúcs?'
    },

    // ==========================================
    // 2. SZINT: KÖZEPES / GYAKORLÓ (11 - 20. feladat)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      prompt: 'Hány átlója van összesen az ábrán látható konvex négyszögnek?',
      questionTypeBadge: 'Átlók számítása',
      figure: <PolygonFigure sides={4} showDiagonals={true} />,
      options: ['2 átlója van', '4 átlója van', '1 átlója van', '3 átlója van'],
      correctAnswer: '2 átlója van',
      explanation:
        'A négyszög (n = 4) átlóinak száma a képlettel: d = (4 · (4 - 3)) / 2 = (4 · 1) / 2 = 2.',
      breakdown: [
        { label: 'Képlet', value: 'd = (n · (n - 3)) / 2' },
        { label: 'Behelyettesítés', value: '4 · 1 / 2 = 2 átló' }
      ],
      hint: 'Két szemközti csúcspár van a négyszögben.'
    },
    {
      id: 'q12',
      level: 2,
      prompt: 'Hány átló húzható ki az ábrán látható ötszög egyetlen kijelölt (piros) csúcsából?',
      questionTypeBadge: '1 csúcsból induló átlók',
      figure: <PolygonFigure sides={5} showDiagonals={true} diagonalsFromOneVertex={true} />,
      options: ['2 átló', '3 átló', '5 átló', '1 átló'],
      correctAnswer: '2 átló',
      explanation:
        'Egy n-szög egyetlen csúcsából n - 3 darab átló húzható (mivel önmagába és a két közvetlen szomszédjába nem húzható átló). Ötszögnél (n = 5): 5 - 3 = 2 átló.',
      breakdown: [
        { label: 'Összefüggés', value: '1 csúcsból induló átlók száma = n - 3' },
        { label: 'Számolás', value: '5 - 3 = 2 átló' }
      ],
      hint: 'Az 5 csúcsból vond le az adott csúcsot és a 2 szomszédját!'
    },
    {
      id: 'q13',
      level: 2,
      prompt: 'Hány háromszögre bontják a konvex hatszöget az egy csúcsából kiinduló átlók az ábrán?',
      questionTypeBadge: 'Háromszögekre bontás',
      figure: <PolygonFigure sides={6} showDiagonals={true} diagonalsFromOneVertex={true} />,
      options: ['4 háromszögre', '3 háromszögre', '5 háromszögre', '6 háromszögre'],
      correctAnswer: '4 háromszögre',
      explanation:
        'Egy konvex n-szöget egy csúcsból húzott átlói mindig n - 2 darab háromszögre bontanak. Hatszögnél (n = 6): 6 - 2 = 4 háromszög keletkezik.',
      breakdown: [
        { label: 'Szabály', value: 'Háromszögek száma = n - 2' },
        { label: 'Hatszögnél', value: '6 - 2 = 4 háromszög' }
      ],
      hint: 'Minden egyes behúzott átlóval eggyel több háromszög keletkezik: (n - 2).'
    },
    {
      id: 'q14',
      level: 2,
      prompt: 'Hány átlója van összesen az ábrán látható konvex hatszögnek?',
      questionTypeBadge: 'Átlók számítása',
      figure: <PolygonFigure sides={6} showDiagonals={true} />,
      options: ['9 átlója', '6 átlója', '12 átlója', '15 átlója'],
      correctAnswer: '9 átlója',
      explanation:
        'A hatszög (n = 6) összes átlójának száma: d = (6 · (6 - 3)) / 2 = (6 · 3) / 2 = 18 / 2 = 9.',
      breakdown: [
        { label: 'Képlet', value: 'd = (n · (n - 3)) / 2' },
        { label: 'Számítás', value: '6 · 3 / 2 = 18 / 2 = 9 átló' }
      ],
      hint: '6 · 3 / 2 = ?'
    },
    {
      id: 'q15',
      level: 2,
      prompt: 'Mennyi egy tetszőleges konvex négyszög belső szögeinek összege?',
      questionTypeBadge: 'Belső szögösszeg',
      figure: <PolygonFigure sides={4} highlightAngle="S = 360°" />,
      options: ['360°', '180°', '540°', '720°'],
      correctAnswer: '360°',
      explanation:
        'A konvex négyszöget 1 átlója 2 darab háromszögre bontja. Mivel minden háromszög szögösszege 180°, a négyszögé: 2 · 180° = 360°. A képlettel: (4 - 2) · 180° = 360°.',
      hint: 'Két háromszögből áll össze: 2 · 180° = ?'
    },
    {
      id: 'q16',
      level: 2,
      prompt: 'Mennyi egy konvex ötszög belső szögeinek összege az ábra alapján?',
      questionTypeBadge: 'Belső szögösszeg',
      figure: <PolygonFigure sides={5} highlightAngle="S = 540°" />,
      options: ['540°', '360°', '720°', '900°'],
      correctAnswer: '540°',
      explanation:
        'Az ötszög belső szögeinek összege: S₅ = (5 - 2) · 180° = 3 · 180° = 540°.',
      breakdown: [
        { label: 'Képlet', value: 'S = (n - 2) · 180°' },
        { label: 'Számítás', value: '(5 - 2) · 180° = 3 · 180° = 540°' }
      ],
      hint: '3 darab háromszögre bontható: 3 · 180° = ?'
    },
    {
      id: 'q17',
      level: 2,
      prompt: 'Mekkora az ábrán látható 35°-os szög melletti pótszög (β), ha összegük derékszög (90°)?',
      questionTypeBadge: 'Pótszögek számítása',
      figure: <AngleAdditionFigure type="complementary" alpha={35} findTarget="beta" />,
      options: ['55°', '145°', '65°', '45°'],
      correctAnswer: '55°',
      explanation:
        'Két szög pótszög, ha összegük derékszög (90°). A 35°-os szög pótszöge: 90° - 35° = 55°.',
      breakdown: [
        { label: 'Pótszög feltétel', value: 'α + β = 90°' },
        { label: 'Számolás', value: 'β = 90° - 35° = 55°' }
      ],
      hint: 'Mennyit kell adni a 35°-hoz, hogy 90°-ot kapjunk?'
    },
    {
      id: 'q18',
      level: 2,
      prompt: 'Mekkora az ábrán látható 110°-os szög kiegészítő szöge (β), ha összegük egyenesszög (180°)?',
      questionTypeBadge: 'Kiegészítő szögek',
      figure: <AngleAdditionFigure type="supplementary" alpha={110} findTarget="beta" />,
      options: ['70°', '80°', '90°', '20°'],
      correctAnswer: '70°',
      explanation:
        'Két szög kiegészítő szög (mellékszög), ha összegük egyenesszög (180°). A 110°-os szög kiegészítő szöge: 180° - 110° = 70°.',
      breakdown: [
        { label: 'Kiegészítő szög feltétel', value: 'α + β = 180°' },
        { label: 'Számolás', value: 'β = 180° - 110° = 70°' }
      ],
      hint: 'Mennyit kell hozzáadni a 110°-hoz, hogy 180° legyen?'
    },
    {
      id: 'q19',
      level: 2,
      prompt: 'Milyen fajta szög látható az alábbi ábrán, ahol a szög íve kívül halad (nagyobb mint 180°)?',
      questionTypeBadge: 'Vizuális Szögfelismerés',
      figure: <AngleFigure degrees={240} showDegrees={false} color="#db2777" />,
      options: ['Homorúszög', 'Tompaszög', 'Teljesszög', 'Egyenesszög'],
      correctAnswer: 'Homorúszög',
      explanation:
        'A homorúszög 180°-nál nagyobb, de 360°-nál kisebb (180° < α < 360°). Az ábrán látható szög kb. 240°-os, ezért homorúszög.',
      hint: 'Nagyobb, mint az egyenesszög (180°), de kisebb a teljesszögnél (360°).'
    },
    {
      id: 'q20',
      level: 2,
      prompt: 'Egy háromszög két belső szöge 45° és 75°. Mekkora az ábrán látható harmadik szög (γ)?',
      questionTypeBadge: 'Háromszög szögei',
      figure: <TriangleAnglesFigure a={45} b={75} />,
      options: ['60°', '50°', '70°', '80°'],
      correctAnswer: '60°',
      explanation:
        'A háromszög belső szögeinek összege mindig 180°. A harmadik szög: 180° - (45° + 75°) = 180° - 120° = 60°.',
      breakdown: [
        { label: 'Két szög összege', value: '45° + 75° = 120°' },
        { label: 'Harmadik szög', value: '180° - 120° = 60°' }
      ],
      hint: 'A három belső szög összege 180°.'
    },

    // ==========================================
    // 3. SZINT: HALADÓ / MESTERFOK (21 - 30. feladat)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      prompt: 'Mekkora egy szabályos ötszög egyetlen belső szöge az alábbi ábra szerint?',
      questionTypeBadge: 'Szabályos sokszögek',
      figure: <PolygonFigure sides={5} highlightAngle="α = 108°" />,
      options: ['108°', '120°', '90°', '135°'],
      correctAnswer: '108°',
      explanation:
        'A szabályos ötszög belső szögeinek összege 540°. Mivel mind az 5 szöge egyenlő: 540° : 5 = 108°.',
      breakdown: [
        { label: 'Összes belső szög', value: '(5 - 2) · 180° = 540°' },
        { label: '1 szög nagysága', value: '540° / 5 = 108°' }
      ],
      hint: 'Oszd el az 540°-ot az 5 egyenlő szögre!'
    },
    {
      id: 'q22',
      level: 3,
      prompt: 'Mekkora egy szabályos hatszög egyetlen belső szöge az ábra alapján?',
      questionTypeBadge: 'Szabályos sokszögek',
      figure: <PolygonFigure sides={6} highlightAngle="α = 120°" />,
      options: ['120°', '108°', '135°', '140°'],
      correctAnswer: '120°',
      explanation:
        'A szabályos hatszög belső szögeinek összege S₆ = (6 - 2) · 180° = 4 · 180° = 720°. Egy belső szög: 720° : 6 = 120°.',
      breakdown: [
        { label: 'Szögösszeg', value: '(6 - 2) · 180° = 720°' },
        { label: 'Egy szög', value: '720° / 6 = 120°' }
      ],
      hint: '720° / 6 = ?'
    },
    {
      id: 'q23',
      level: 3,
      prompt: 'Mekkora egy szabályos nyolcszög egyetlen belső szöge az ábra szerint?',
      questionTypeBadge: 'Szabályos sokszögek',
      figure: <PolygonFigure sides={8} highlightAngle="α = 135°" />,
      options: ['135°', '140°', '120°', '150°'],
      correctAnswer: '135°',
      explanation:
        'A szabályos nyolcszög belső szögeinek összege S₈ = (8 - 2) · 180° = 6 · 180° = 1080°. Egy szög: 1080° : 8 = 135°.',
      breakdown: [
        { label: 'Szögösszeg', value: '6 · 180° = 1080°' },
        { label: 'Egy szög', value: '1080° / 8 = 135°' }
      ],
      hint: '1080° : 8 = ?'
    },
    {
      id: 'q24',
      level: 3,
      prompt: 'Hány oldala van annak a konvex sokszögnek, amelynek összesen 20 átlója van?',
      questionTypeBadge: 'Visszaszámolás',
      figure: <PolygonFigure sides={8} showDiagonals={true} />,
      options: ['8 oldala (nyolcszög)', '7 oldala (hétszög)', '9 oldala (kilencszög)', '10 oldala (tízszög)'],
      correctAnswer: '8 oldala (nyolcszög)',
      explanation:
        'A képlet szerint (n · (n - 3)) / 2 = 20 ⟹ n · (n - 3) = 40. Mivel 8 · (8 - 3) = 8 · 5 = 40, a keresett sokszög a nyolcszög (n = 8).',
      breakdown: [
        { label: 'Egyenlet', value: '(n · (n - 3)) / 2 = 20' },
        { label: 'Szorzat', value: 'n · (n - 3) = 40' },
        { label: 'Megoldás', value: '8 · 5 = 40, így n = 8' }
      ],
      hint: 'Melyik számnál lesz n · (n - 3) éppen 40?'
    },
    {
      id: 'q25',
      level: 3,
      prompt: 'Hány oldala van annak a konvex sokszögnek, amelynek belső szögeinek összege 1260°?',
      questionTypeBadge: 'Visszaszámolás',
      figure: <PolygonFigure sides={9} />,
      options: ['9 oldala (kilencszög)', '8 oldala (nyolcszög)', '10 oldala (tízszög)', '7 oldala (hétszög)'],
      correctAnswer: '9 oldala (kilencszög)',
      explanation:
        'A belső szögösszeg képlete: (n - 2) · 180° = 1260°. Ebből n - 2 = 1260 : 180 = 7, vagyis n = 7 + 2 = 9.',
      breakdown: [
        { label: 'Egyenlet', value: '(n - 2) · 180° = 1260°' },
        { label: 'Háromszögek száma', value: '1260 / 180 = 7 háromszög' },
        { label: 'Oldalak száma', value: 'n = 7 + 2 = 9 oldal' }
      ],
      hint: 'Hányszor van meg a 180 az 1260-ban? (Ehhez adj hozzá 2-t!)'
    },
    {
      id: 'q26',
      level: 3,
      prompt: 'Két egyenes metszi egymást az ábrán, az egyik szög α = 50°. Mekkora a vele szemközti csúcsszög (β)?',
      questionTypeBadge: 'Csúcsszögek',
      figure: <VerticalAnglesFigure angle={50} />,
      options: ['50°', '130°', '40°', '180°'],
      correctAnswer: '50°',
      explanation:
        'A metsző egyenesek által bezárt szemközti szögek (csúcsszögek) egymással mindig egyenlő nagyságúak: β = α = 50°. A szomszédos mellékszögek összege pedig 180° lenne (130°).',
      hint: 'A csúcsszögek (szemközti szögek) mindig egyenlők!'
    },
    {
      id: 'q27',
      level: 3,
      prompt: 'Mit állíthatunk az ábrán látható konkáv sokszög átlóiról?',
      questionTypeBadge: 'Konkáv sokszögek',
      figure: <ConcaveShapeFigure />,
      options: [
        'Legalább egy átlója a sokszög határain kívül (külső térben) halad.',
        'Minden átlója szigorúan a sokszög belsejében fut.',
        'Nincsenek átlói.',
        'Minden átlója egyenlő hosszúságú.'
      ],
      correctAnswer: 'Legalább egy átlója a sokszög határain kívül (külső térben) halad.',
      explanation:
        'A konkáv sokszögnek van legalább egy 180°-nál nagyobb (homorú) belső szöge, és a beharapás két csúcsát összekötő átló a sokszögön kívül halad.',
      hint: 'A konkáv sokszög "beharapásánál" az átló kilép a síkidomból.'
    },
    {
      id: 'q28',
      level: 3,
      prompt: 'Egy derékszögű háromszög egyik hegyesszöge az ábrán α = 38°. Mekkora a másik hegyesszöge (β)?',
      questionTypeBadge: 'Derékszögű háromszög',
      figure: <AngleAdditionFigure type="complementary" alpha={38} findTarget="beta" />,
      options: ['52°', '62°', '42°', '142°'],
      correctAnswer: '52°',
      explanation:
        'A derékszögű háromszögben a derékszög 90°, így a két hegyesszög összege mindig 90° (pótszögek). A másik hegyesszög: 90° - 38° = 52°.',
      breakdown: [
        { label: 'Hegyesszögek összege', value: 'α + β = 90°' },
        { label: 'Számítás', value: 'β = 90° - 38° = 52°' }
      ],
      hint: '90° - 38° = ?'
    },
    {
      id: 'q29',
      level: 3,
      prompt: 'Mekkora egy szabályos tízszög egyetlen belső szöge az ábra alapján?',
      questionTypeBadge: 'Szabályos sokszögek',
      figure: <PolygonFigure sides={10} highlightAngle="α = 144°" />,
      options: ['144°', '140°', '150°', '135°'],
      correctAnswer: '144°',
      explanation:
        'A tízszög (n = 10) belső szögösszege S₁₀ = (10 - 2) · 180° = 8 · 180° = 1440°. Egy belső szög nagysága: 1440° : 10 = 144°.',
      breakdown: [
        { label: 'Szögösszeg', value: '8 · 180° = 1440°' },
        { label: 'Egy szög', value: '1440° / 10 = 144°' }
      ],
      hint: '1440° / 10 = ?'
    },
    {
      id: 'q30',
      level: 3,
      prompt: 'Egy konvex sokszög egyetlen csúcsából 7 átló húzható. Hány oldala van ennek a sokszögnek?',
      questionTypeBadge: 'Visszaszámolás',
      figure: <PolygonFigure sides={10} showDiagonals={true} diagonalsFromOneVertex={true} />,
      options: ['10 oldala (tízszög)', '9 oldala (kilencszög)', '11 oldala (tizenegyszög)', '8 oldala (nyolcszög)'],
      correctAnswer: '10 oldala (tízszög)',
      explanation:
        'Mivel 1 csúcsból n - 3 darab átló húzható: n - 3 = 7 ⟹ n = 7 + 3 = 10. Tehát a sokszög egy tízszög.',
      breakdown: [
        { label: 'Összefüggés', value: '1 csúcsból induló átlók = n - 3' },
        { label: 'Egyenlet', value: 'n - 3 = 7' },
        { label: 'Megoldás', value: 'n = 7 + 3 = 10 oldal' }
      ],
      hint: 'n - 3 = 7, mennyi az n?'
    }
  ];

  // Cheat Sheet Card previews
  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs-elements',
      title: 'Geometriai Alapelemek',
      icon: <Compass className="w-4 h-4 text-cyan-500" />,
      figure: <BasicElementsDiagram className="scale-90" />,
      note: 'Pont: kiterjedés nélküli (A). Szakasz: 2 végpont (AB). Félegyenes: 1 kezdőpont [AB). Egyenes: végtelen (e).'
    },
    {
      id: 'cs-lines',
      title: 'Egyenesek helyzete',
      icon: <MoveHorizontal className="w-4 h-4 text-purple-500" />,
      figure: <LineRelationshipsDiagram className="scale-90" />,
      note: 'Metsző (1 közös pont), merőleges (90°-os szög), párhuzamos (0 közös pont, állandó távolság).'
    },
    {
      id: 'cs-angles',
      title: 'Szögtípusok határai',
      icon: <Target className="w-4 h-4 text-indigo-500" />,
      formula: '0° < hegyes < 90° < tompa < 180° < homorú < 360°',
      note: 'Derékszög = 90°, egyenesszög = 180°, teljesszög = 360°.'
    },
    {
      id: 'cs-polygons',
      title: 'Sokszögek képletei',
      icon: <Calculator className="w-4 h-4 text-emerald-500" />,
      formula: 'd = (n · (n - 3)) / 2    és    Sₙ = (n - 2) · 180°',
      note: '1 csúcsból induló átlók száma: n - 3. Háromszögek száma: n - 2. Szabályos n-szög 1 szöge: Sₙ / n.'
    }
  ];

  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={6}
      chapterId="g6-geometry"
      topicId="g6-planar-shapes-quiz"
      title="Síkbeli alakzatok Kvíz"
      subtitle="30 feladatos átfogó geometriai szintfelmérő 3 nehézségi szinten"
      badgeText="📐 6. Osztály • III. Geometria • 1. Fejezet"
      badgeColor="cyan"
      questions={questions}
      cheatSheetTitle="Síkbeli alakzatok Képtár & Képlettár"
      cheatSheetCards={cheatSheetCards}
      renderMatcher={(props) => <PlanarShapesMatcher {...props} />}
      renderSorter={(props) => <PlanarShapesSorter {...props} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapfogalmak és felismerés',
          subtitle: '10 feladat • Alapok',
          focus: 'Pont, egyenes, szakasz, szögtípusok, konvex és konkáv alakzatok',
          range: '1-10. feladat'
        },
        level2: {
          title: '2. Szint: Számítások és összefüggések',
          subtitle: '10 feladat • Gyakorló',
          focus: 'Pótszögek, kiegészítő szögek, átlók száma és belső szögösszeg',
          range: '11-20. feladat'
        },
        level3: {
          title: '3. Szint: Szabályos sokszögek és mesterfeladatok',
          subtitle: '10 feladat • Haladó',
          focus: 'Szabályos sokszögek 1 belső szöge, visszaszámolások és csúcsszögek',
          range: '21-30. feladat'
        }
      }}
    />
  );
}
