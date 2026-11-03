import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GraphicEqMatcher } from './GraphicEqMatcher';
import { GraphicEqSorter } from './GraphicEqSorter';
import {
  IntersectionConceptSvg,
  CasesOfSolutionsSvg,
  AbsLinearIntersectionSvg
} from './GraphicEqFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export interface GraphicEqQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Grafikus Megoldás Alapjai (Könnyű)',
    subtitle: 'A metszéspontok leolvasása, x és y szerepe, a megoldások lehetséges száma.',
    range: '1 - 10. feladat',
    focus: 'Metszéspont & x-koordináta',
    questions: [
      {
        id: 'gq1-1',
        questionTypeBadge: 'Alapelv',
        question: 'Mi a grafikus egyenletmegoldás első alapvető lépése egy f(x) = g(x) alakú egyenlet esetén?',
        figure: <IntersectionConceptSvg size={240} />,
        options: [
          'Az egyenlet bal és jobb oldalát két külön függvényként (y₁ = f(x) és y₂ = g(x)) ábrázoljuk azonos koordinátasíkban',
          'Mindkét oldalt nullára redukáljuk és ábrázolás nélkül szorzattá alakítjuk',
          'Csak a bal oldalt ábrázoljuk, a jobb oldalt elhagyjuk',
          'Kiszámoljuk az x-ek átlagát'
        ],
        correctAnswer: 0,
        hint: 'A két oldalt két külön grafikonként rajzoljuk fel, és közös pontjaikat keressük.',
        explanation: 'A grafikus megoldás lényege, hogy az egyenlőség a két függvény görbéjének metszéspontjaiban teljesül: f(x) = g(x).'
      },
      {
        id: 'gq1-2',
        questionTypeBadge: 'Megoldás Leolvasása',
        question: 'Ha a két ábrázolt függvény grafikonjának metszéspontja M(3; 5), mi az eredeti egyenlet megoldása?',
        options: [
          'x = 3 (kizárólag a metszéspont x-koordinátája)',
          'x = 3 és y = 5 egyszerre',
          'y = 5 (a felvett magasság)',
          'x = 8 (a koordináták összege)'
        ],
        correctAnswer: 0,
        hint: 'Az eredeti egyenletben csak x szerepelt! Az y csupán a behelyettesítési érték.',
        explanation: 'Az egyenlet ismeretlene az x, ezért a megoldás a metszéspont első, vízszintes koordinátája: x = 3. Az y = 5 nem része a megoldásnak!'
      },
      {
        id: 'gq1-3',
        questionTypeBadge: 'Esetek Száma',
        question: 'Hány megoldása van egy olyan egyenletnek, amelynek a két felrajzolt görbéje sehol sem metszi egymást?',
        figure: <CasesOfSolutionsSvg size={240} />,
        options: [
          '0 megoldása van (a megoldáshalmaz üres halmaz: M = ∅)',
          '1 megoldása van',
          'Végtelen sok megoldása van',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Nincs közös pont ⟹ nincs olyan x, ahol a két érték egyenlő.',
        explanation: 'Közös pont hiányában nincs olyan x érték, amelyre f(x) = g(x) teljesülne, így az egyenletnek nincs valós megoldása (M = ∅).'
      },
      {
        id: 'gq1-4',
        questionTypeBadge: 'Parabola Érintése',
        question: 'Hány megoldása van az x² = 0 egyenletnek grafikusan szemlélve?',
        options: [
          'Pontosan 1 megoldása van: x = 0 (a parabola csúcsa érinti az x-tengelyt)',
          '2 megoldása van: +0 és -0',
          '0 megoldása van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A parabola csúcspontja C(0; 0) az egyetlen közös pontja az y = 0 egyenessel.',
        explanation: 'Az y = x² parabola csúcspontja C(0; 0), ami pontosan egy pontban érinti az x-tengelyt (y = 0), így 1 megoldás van: x = 0.'
      },
      {
        id: 'gq1-5',
        questionTypeBadge: 'Abszolútérték Szétbontás',
        question: 'Melyik két függvényt érdemes ábrázolni az |x - 2| = 4 egyenlet grafikus megoldásához?',
        figure: <AbsLinearIntersectionSvg size={240} />,
        options: [
          'f(x) = |x - 2| (V-alak) és g(x) = 4 (vízszintes egyenes)',
          'f(x) = x - 2 és g(x) = 4',
          'f(x) = |x| és g(x) = 2',
          'f(x) = x² - 2 és g(x) = 4'
        ],
        correctAnswer: 0,
        hint: 'Bal oldal: |x - 2|, jobb oldal: 4 konstans függvény.',
        explanation: 'Az egyenlet bal oldala a C(2; 0) csúcsú V-alak, jobb oldala pedig az y = 4 magasságban húzódó vízszintes egyenes.'
      },
      {
        id: 'gq1-6',
        questionTypeBadge: 'Parabola és Egyenes',
        question: 'Legfeljebb hány metszéspontja lehet egy parabolának és egy egyenesnek a síkon?',
        options: [
          'Legfeljebb 2 metszéspontja (metsző, érintő vagy elkerülő)',
          'Legfeljebb 1 metszéspontja',
          'Akár 4 metszéspontja is lehet',
          'Végtelen sok metszéspontja mindig'
        ],
        correctAnswer: 0,
        hint: 'Egy másodfokú és egy elsőfokú kifejezés egyenlőségéből másodfokú egyenlet keletkezik.',
        explanation: 'A másodfokú egyenletnek legfeljebb 2 valós gyöke lehet, ezért geometriailag legfeljebb 2 metszéspont létezhet.'
      },
      {
        id: 'gq1-7',
        questionTypeBadge: 'Negatív Vízszintes',
        question: 'Mi a megoldása az x² = -1 egyenletnek a valós számok körében grafikusan vizsgálva?',
        options: [
          'Nincs valós megoldása (M = ∅), mert a parabola y ≥ 0, az egyenes pedig y = -1-nél fut',
          'x = 1 és x = -1',
          'x = 0',
          'x = -1'
        ],
        correctAnswer: 0,
        hint: 'A felfelé nyíló parabola legalacsonyabb pontja 0, az y = -1 egyenes ez alatt van.',
        explanation: 'A parabola grafikonja a felső félsíkban halad (y ≥ 0), míg az y = -1 egyenes az alsó félsíkban van, így sehol sem metszik egymást.'
      },
      {
        id: 'gq1-8',
        questionTypeBadge: 'Két Egyenes Metszése',
        question: 'Ha két különböző meredekségű egyenest ábrázolunk a síkban, hány metszéspontjuk és ezáltal hány megoldásuk lesz?',
        options: [
          'Pontosan 1 metszéspontjuk, így 1 megoldásuk van',
          '2 megoldásuk',
          '0 megoldásuk mindig',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Nem párhuzamos egyenesek a síkban mindig pontosan egy pontban metszik egymást.',
        explanation: 'Két különböző meredekségű egyenes nem párhuzamos, ezért pontosan egy közös metszéspontjuk van a síkon.'
      },
      {
        id: 'gq1-9',
        questionTypeBadge: 'Ellenőrzés Szükségessége',
        question: 'Mit kell elvégezni a metszéspontok koordinátáinak leolvasása után?',
        options: [
          'Behelyettesítéssel ellenőrizni kell a kapott x értékeket az eredeti egyenletben',
          'Meg kell szorozni az x és y koordinátákat',
          'Nem kell semmit tenni, a grafikon mindig tévedhetetlen',
          'Új koordináta-rendszert kell felvenni'
        ],
        correctAnswer: 0,
        hint: 'A szabadkézi rajz pontatlansága miatt mindig ellenőrizni kell!',
        explanation: 'A grafikus leolvasás pontatlanságait és az esetleges hamis gyököket behelyettesítéses algebrai ellenőrzéssel zárjuk ki.'
      },
      {
        id: 'gq1-10',
        questionTypeBadge: 'Párhuzamos Egyenesek',
        question: 'Mi a megoldása a 2x + 1 = 2x + 5 egyenletnek grafikusan?',
        options: [
          'Nincs megoldása (M = ∅), mert az egyenesek párhuzamosak és nem esnek egybe',
          'x = 0',
          'x = 4',
          'Minden valós szám megoldás'
        ],
        correctAnswer: 0,
        hint: 'Mindkét egyenes meredeksége m = 2, de tengelymetszetük különbözik (1 és 5).',
        explanation: 'Az y₁ = 2x + 1 és y₂ = 2x + 5 egyenesek meredeksége azonos, de el vannak tolva egymástól, így párhuzamosak és nincs metszéspontjuk.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Grafikonos Leolvasások és Gyökszámítás (Közepes)',
    subtitle: 'Parabolák, V-alakok és egyenesek metszéspontjainak pontos kiszámítása.',
    range: '11 - 20. feladat',
    focus: 'Konkrét Metszéspontok',
    questions: [
      {
        id: 'gq2-1',
        questionTypeBadge: 'Parabola és Egyenes',
        question: 'Az f(x) = x² parabola és a g(x) = x + 2 egyenes metszéspontjai M₁(-1; 1) és M₂(2; 4). Mi az x² = x + 2 egyenlet megoldása?',
        figure: <IntersectionConceptSvg size={240} />,
        options: [
          'x₁ = -1 és x₂ = 2',
          'x = 1 és x = 4',
          'x = -1, y = 1 és x = 2, y = 4',
          'x = 3'
        ],
        correctAnswer: 0,
        hint: 'Csak az x koordinátákat írd le a megoldáshalmazba!',
        explanation: 'Az egyenlet gyökei a metszéspontok x koordinátái: x₁ = -1 és x₂ = 2. Ellenőrzés: (-1)² = -1 + 2 = 1 és 2² = 2 + 2 = 4.'
      },
      {
        id: 'gq2-2',
        questionTypeBadge: 'Abszolútérték Távolság',
        question: 'Mik az |x - 3| = 2 egyenlet gyökei a V-alak és a vízszintes egyenes metszéspontjaiból leolvasva?',
        figure: <AbsLinearIntersectionSvg size={240} />,
        options: [
          'x = 1 és x = 5',
          'x = -1 és x = 5',
          'x = 2 és x = 3',
          'x = -2 és x = 2'
        ],
        correctAnswer: 0,
        hint: 'A 3-as számtól jobbra és balra 2-2 egység távolságra lévő számok.',
        explanation: 'x - 3 = 2 ⟹ x = 5; illetve x - 3 = -2 ⟹ x = 1. A két gyök: 1 és 5.'
      },
      {
        id: 'gq2-3',
        questionTypeBadge: 'Origóból Induló Metszés',
        question: 'Mi a megoldása az x² = 2x egyenletnek grafikusan?',
        options: [
          'x ∈ {0; 2}',
          'x = 2',
          'x = 0',
          'x ∈ {-2; 2}'
        ],
        correctAnswer: 0,
        hint: 'A parabola és az origón átmenő egyenes metszéspontjai (0; 0) és (2; 4).',
        explanation: 'x² - 2x = x(x - 2) = 0 ⟹ x₁ = 0 és x₂ = 2. Két metszéspont van: (0; 0) és (2; 4).'
      },
      {
        id: 'gq2-4',
        questionTypeBadge: 'Eltolt Parabola',
        question: 'Hány metszéspontja van az f(x) = (x - 1)² + 3 parabolának és a g(x) = 2 vízszintes egyenesnek?',
        options: [
          '0 metszéspontja van',
          '1 metszéspontja van',
          '2 metszéspontja van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A parabola csúcsa C(1; 3) magasan van és felfelé nyílik. Elérheti az y = 2 magasságot?',
        explanation: 'Mivel (x - 1)² + 3 ≥ 3 minden x-re, a függvény értéke soha nem lehet 2. A két görbe nem találkozik.'
      },
      {
        id: 'gq2-5',
        questionTypeBadge: 'Négyzet Gyökei',
        question: 'Mik a megoldásai a (x + 2)² = 4 egyenletnek?',
        options: [
          'x = -4 és x = 0',
          'x = 2 és x = -2',
          'x = 0 és x = 4',
          'Csak x = 0'
        ],
        correctAnswer: 0,
        hint: 'x + 2 = 2 ⟹ x = 0; vagy x + 2 = -2 ⟹ x = -4.',
        explanation: 'A C(-2; 0) csúcsú parabola és az y = 4 egyenes metszéspontjai (-4; 4) és (0; 4), a gyökök: -4 és 0.'
      },
      {
        id: 'gq2-6',
        questionTypeBadge: 'Abszolút és Ferde Egyenes',
        question: 'Hány valós megoldása van az |x + 1| = -x + 3 egyenletnek?',
        options: [
          '1 megoldása van: x = 1',
          '2 megoldása van: x = 1 és x = -2',
          '0 megoldása van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'x = 1 esetén: |1 + 1| = 2 és -1 + 3 = 2. A másik ágat a csökkenő egyenes nem metszi.',
        explanation: 'A V-alak jobb oldali ágát metszi az egyenes az M(1; 2) pontban. A bal ág meredeksége -1, akárcsak az egyenesé, így azzal párhuzamos és nem metszi.'
      },
      {
        id: 'gq2-7',
        questionTypeBadge: 'Érintő Egyenes',
        question: 'Mi a közös pontja az f(x) = x² parabolának és a g(x) = 4x - 4 egyenesnek?',
        options: [
          'Érintik egymást az É(2; 4) pontban, így a megoldás x = 2',
          'Metszik egymást x = 0 és x = 4-ben',
          'Nem érintik egymást',
          'A megoldás x = 4'
        ],
        correctAnswer: 0,
        hint: 'x² - 4x + 4 = (x - 2)² = 0.',
        explanation: 'x² - 4x + 4 = (x - 2)² = 0, így pontosan egyetlen közös érintési pont van É(2; 4), a megoldás x = 2.'
      },
      {
        id: 'gq2-8',
        questionTypeBadge: 'Gyökfüggvény Metszése',
        question: 'Mi a megoldása a √x = 2 egyenletnek grafikusan?',
        options: [
          'x = 4',
          'x = 2',
          'x = 16',
          'x = -4 és x = 4'
        ],
        correctAnswer: 0,
        hint: 'A fekvő félparabola hol éri el az y = 2 magasságot? Négyzetre emelve: x = 2².',
        explanation: 'Az y = √x görbe az y = 2 vízszintes egyenessel a (4; 2) pontban találkozik, így a megoldás x = 4.'
      },
      {
        id: 'gq2-9',
        questionTypeBadge: 'Előjel Vizsgálat',
        question: 'Melyik egyenletnek van biztosan KÉT különböző előjelű (egy pozitív és egy negatív) gyöke?',
        options: [
          'x² = 9',
          'x² - 5x + 6 = 0',
          '|x - 5| = 2',
          '(x - 4)² = 1'
        ],
        correctAnswer: 0,
        hint: 'x² = 9 esetén x = ±3, amelyek szimmetrikusak az origóra.',
        explanation: 'Az y = x² páros függvény és az y = 9 egyenes metszéspontjai x = -3 és x = +3, tehát az egyik negatív, a másik pozitív.'
      },
      {
        id: 'gq2-10',
        questionTypeBadge: 'Csúcspont Zérushelye',
        question: 'Hány megoldása van a |x - 5| = 0 egyenletnek grafikusan?',
        options: [
          'Pontosan 1 megoldása van: x = 5',
          '2 megoldása van: +5 és -5',
          '0 megoldása van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A V-alak csúcspontja C(5; 0) az x-tengelyen fekszik.',
        explanation: 'Az abszolútérték csúcsa x = 5-ben érinti az y = 0 tengelyt, így egyetlen megoldása van: x = 5.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Paraméterek és Hamis Gyökök (Nehéz)',
    subtitle: 'Paraméteres vizsgálatok, szigorú monotonitás és algebrai csapdák kiszűrése.',
    range: '21 - 30. feladat',
    focus: 'Paraméterek & Hamis Gyökök',
    questions: [
      {
        id: 'gq3-1',
        questionTypeBadge: 'Paraméteres Parabola',
        question: 'Milyen c valós paraméter esetén van az x² = c egyenletnek pontosan KÉT valós megoldása?',
        figure: <CasesOfSolutionsSvg size={240} />,
        options: [
          'c > 0 (pozitív számok esetén)',
          'c = 0 esetén',
          'c < 0 esetén',
          'Minden valós c értékre'
        ],
        correctAnswer: 0,
        hint: 'A vízszintes y = c egyenesnek az x-tengely felett kell haladnia a két metszéshez.',
        explanation: 'Ha c > 0, az egyenes két pontban metszi a parabolát (±√c). Ha c = 0, akkor 1 megoldás van, ha c < 0, akkor 0.'
      },
      {
        id: 'gq3-2',
        questionTypeBadge: 'Paraméteres Abszolútérték',
        question: 'Milyen c érték mellett van az |x - 2| = c egyenletnek pontosan EGYETLEN valós megoldása?',
        options: [
          'c = 0 (ekkor az egyenes éppen a V-alak csúcspontját érinti)',
          'c > 0',
          'c = 2',
          'c < 0'
        ],
        correctAnswer: 0,
        hint: 'Csak a csúcspontban van 1 érintési pont.',
        explanation: 'Ha c = 0, a vízszintes egyenes az y = 0 tengely, amely pontosan a C(2; 0) csúcspontban érinti a V-alakot.'
      },
      {
        id: 'gq3-3',
        questionTypeBadge: 'Hamis Gyök Kiszűrése',
        question: 'Mi a valós megoldása a √(x + 3) = x + 1 egyenletnek a grafikon alapján?',
        options: [
          'Csak az x = 1 (az x = -2 hamis gyök, mert ott a jobb oldal negatív)',
          'x = 1 és x = -2',
          'Csak x = -2',
          'Nincs valós megoldás'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emeléskor kijönne a -2, de x = -2 esetén a bal oldal √1 = 1, a jobb oldal pedig -1, ami nem egyenlő!',
        explanation: 'A grafikonon jól látszik, hogy x = -2-nél a gyökfüggvény értéke +1, míg az egyenes -1, így ott nincs metszéspont. Az egyetlen megoldás x = 1.'
      },
      {
        id: 'gq3-4',
        questionTypeBadge: 'Párhuzamosság Feltétele',
        question: 'Milyen m meredekség esetén NINCS metszéspontja az f(x) = 2x + 3 és g(x) = mx - 1 egyeneseknek?',
        options: [
          'm = 2 esetén (mert ekkor párhuzamosak, de eltér a tengelymetszetük)',
          'm = -2 esetén',
          'm = 0 esetén',
          'm = 3 esetén'
        ],
        correctAnswer: 0,
        hint: 'Két egyenes akkor nem metszi egymást, ha párhuzamosak (meredekségük azonos: m₁ = m₂).'
      },
      {
        id: 'gq3-5',
        questionTypeBadge: 'Teljes Négyzet Metszése',
        question: 'Hány megoldása van az x² - 4x + 4 = 1 egyenletnek?',
        options: [
          '2 megoldása van: x = 1 és x = 3',
          '1 megoldása van',
          '0 megoldása van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'x² - 4x + 4 = (x - 2)². Így (x - 2)² = 1 ⟹ x - 2 = ±1.',
        explanation: '(x - 2)² = 1 ⟹ x - 2 = 1 (x = 3) vagy x - 2 = -1 (x = 1). Két metszéspont van az y = 1 magasságban.'
      },
      {
        id: 'gq3-6',
        questionTypeBadge: 'Két V-Alak Metszése',
        question: 'Hány pontban metszi egymást az f(x) = |x| és a g(x) = -|x| + 4 függvények grafikonja?',
        options: [
          '2 pontban: M₁(-2; 2) és M₂(2; 2), a gyökök: x = -2 és x = 2',
          '1 pontban',
          '4 pontban',
          '0 pontban'
        ],
        correctAnswer: 0,
        hint: '|x| = -|x| + 4 ⟹ 2|x| = 4 ⟹ |x| = 2.',
        explanation: 'A felfelé nyíló és a lefelé nyíló V-alak két pontban találkozik: x = 2 és x = -2 esetén a magasságuk egyaránt 2.'
      },
      {
        id: 'gq3-7',
        questionTypeBadge: 'Érintési Paraméter',
        question: 'Milyen b érték esetén érinti az y = 2x + b egyenes az f(x) = x² parabolát (pontosan 1 megoldás)?',
        options: [
          'b = -1 (mert ekkor x² - 2x + 1 = (x - 1)² = 0)',
          'b = 0',
          'b = 1',
          'b = -4'
        ],
        correctAnswer: 0,
        hint: 'x² - 2x - b = 0. A diszkrimináns D = 4 + 4b = 0 kell legyen!',
        explanation: 'Az érintés feltétele D = 0: 4 + 4b = 0 ⟹ 4b = -4 ⟹ b = -1. Ekkor x = 1 az érintési pont.'
      },
      {
        id: 'gq3-8',
        questionTypeBadge: 'Gyök Becslése',
        question: 'Melyik két szomszédos egész szám közé esik az x² = 5 egyenlet pozitív megoldása a grafikon alapján?',
        options: [
          '2 és 3 közé (mivel 2² = 4 < 5 < 3² = 9)',
          '1 és 2 közé',
          '3 és 4 közé',
          '5 és 6 közé'
        ],
        correctAnswer: 0,
        hint: 'f(2) = 4, f(3) = 9. Az 5 a kettő között van.',
        explanation: 'Mivel 2² = 4 és 3² = 9, a parabola az y = 5 magasságot 2 és 3 között éri el (√5 ≈ 2.236).'
      },
      {
        id: 'gq3-9',
        questionTypeBadge: 'Monotonitási Tétel',
        question: 'Miért van a √x = -x + 2 egyenletnek BIZTOSAN legfeljebb 1 megoldása?',
        options: [
          'Mert a bal oldal szigorúan növő, a jobb oldal szigorúan csökkenő, így legfeljebb 1 pontban metszhetik egymást',
          'Mert mindkettő páros függvény',
          'Mert a diszkrimináns mindig negatív',
          'Mert mindkettő átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'Egy felfelé haladó görbe és egy lefelé tartó egyenes csak egyszer keresztezheti egymást.',
        explanation: 'A szigorúan monoton növő és szigorúan monoton csökkenő függvények grafikonja legfeljebb egyetlen pontban metszheti egymást (itt x = 1-ben: √1 = -1 + 2 = 1).'
      },
      {
        id: 'gq3-10',
        questionTypeBadge: 'Hiperbola és Egyenes',
        question: 'Mi a megoldáshalmaza a 4/x = x egyenletnek grafikusan (hiperbola és egyenes metszése)?',
        options: [
          'x ∈ {-2; 2} (az egyenes mindkét hiperbolaágat metszi)',
          'x = 2',
          'x = 4',
          'Nincs megoldása'
        ],
        correctAnswer: 0,
        hint: '4/x = x ⟹ x² = 4 ⟹ x = ±2.',
        explanation: 'Az y = 4/x hiperbola két ágát az y = x egyenes a (-2; -2) és (2; 2) pontokban metszi, így a gyökök: x = -2 és x = 2.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Grafikus Megoldás Alapelve',
    icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    color: 'emerald',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>f(x) = g(x)</strong> megoldása:</p>
        <p>1. Ábrázold közös koordinátasíkban az <em>y₁ = f(x)</em> és <em>y₂ = g(x)</em> görbéket!</p>
        <p>2. Keresd meg a metszéspontokat: <em>M(x; y)</em>.</p>
        <p><strong className="text-emerald-300">3. A megoldás CSAK az x-koordináta!</strong></p>
      </div>
    )
  },
  {
    title: 'Megoldások Száma',
    icon: <Target className="w-5 h-5 text-sky-400" />,
    color: 'sky',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><span className="text-emerald-400 font-semibold">2 metszéspont:</span> 2 valós megoldás.</p>
        <p><span className="text-amber-400 font-semibold">1 érintési pont:</span> 1 valós megoldás (D = 0).</p>
        <p><span className="text-rose-400 font-semibold">Nincs metszéspont:</span> M = ∅ (nincs megoldás).</p>
      </div>
    )
  },
  {
    title: 'Abszolútérték & Gyök Csapdák',
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    color: 'purple',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>|x| ≥ 0 és √x ≥ 0</strong> mindig nemnegatív!</p>
        <p>Ha az egyenes a tengely alatt fut (y &lt; 0), <strong>nincs metszéspont</strong>!</p>
        <p className="text-slate-400">Példa: |x| = -3 ⟹ M = ∅.</p>
      </div>
    )
  },
  {
    title: 'Mindig Ellenőrizz!',
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p>A szabadkézi rajz leolvasása pontatlan lehet.</p>
        <p>A kapott x értéket helyettesítsd be a bal és jobb oldalba is:</p>
        <p className="text-amber-300 font-mono">f(x) = g(x) ?</p>
      </div>
    )
  }
];

export const GraphicEqQuiz: React.FC<GraphicEqQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="egyenletek-grafikus-megoldasa"
      badgeLabel="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="Egyenletek Grafikus Megoldása Kvíz"
      subtitle="30 válogatott feladat 3 szinten: a metszéspontok leolvasásától kezdve az abszolútértékes és másodfokú görbék metszésén át a paraméteres és hamis gyökös vizsgálatokig."
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        onSwitchToMatcher ? (
          <GraphicEqMatcher
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToSorter={onSwitchToSorter}
          />
        ) : undefined
      }
      sorterComponent={
        onSwitchToSorter ? (
          <GraphicEqSorter
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToMatcher={onSwitchToMatcher}
          />
        ) : undefined
      }
    />
  );
};

