import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleLines2Matcher, matcherLevels } from './TriangleLines2Matcher';
import { TriangleLines2Sorter, sorterLevels } from './TriangleLines2Sorter';
import {
  AltitudesAndOrthocenterSVG,
  MediansAndCentroidSVG,
  MidlinesSVG,
  EulerLineSVG
} from './TriangleLines2Figures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface TriangleLines2QuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Nevezetes Vonalak (Könnyű)',
    subtitle: 'Magasságvonalak, súlyvonalak, középvonalak definíciói és a magasságpont elhelyezkedése.',
    range: '1 - 10. feladat',
    focus: 'A vonalak és nevezetes pontok alapismeretei',
    questions: [
      {
        id: 'lq2-1',
        questionTypeBadge: 'Magasságvonal Definíció',
        question: 'Mi a háromszög magasságvonala?',
        figure: <AltitudesAndOrthocenterSVG size={200} />,
        options: [
          'A csúcsból a szemközti oldalegyenesre bocsátott merőleges egyenes',
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'Az oldalt derékszögben felező egyenes',
          'A belső szöget felező egyenes'
        ],
        correctAnswer: 0,
        hint: 'Merőlegesség és a csúcson való áthaladás a lényeg.',
        explanation: 'A háromszög magasságvonala a csúcsból a szemközti oldalegyenesre bocsátott merőleges egyenes. A csúcs és a talppont közötti szakasz a magasság ($m$).'
      },
      {
        id: 'lq2-2',
        questionTypeBadge: 'Súlyvonal Definíció',
        question: 'Mi a háromszög súlyvonala?',
        figure: <MediansAndCentroidSVG size={200} />,
        options: [
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'A csúcsból az oldalra bocsátott merőleges egyenes',
          'Két szomszédos oldal felezőpontját összekötő vonal',
          'Az oldalt felező merőleges egyenes'
        ],
        correctAnswer: 0,
        hint: 'A csúcsot köti össze a szemközti oldal felezőpontjával.',
        explanation: 'A súlyvonal a háromszög csúcsát a szemközti oldal felezőpontjával összekötő szakasz ($s_a, s_b, s_c$).'
      },
      {
        id: 'lq2-3',
        questionTypeBadge: 'Magasságpont Jele',
        question: 'Mely nevezetes pont a három magasságvonal közös metszéspontja?',
        options: [
          'Magasságpont (M)',
          'Súlypont (S)',
          'Körülírt kör középpontja (O)',
          'Beírt kör középpontja (I)'
        ],
        correctAnswer: 0,
        hint: 'Ortocentrum, jele M.',
        explanation: 'A három magasságvonal mindig egy közös pontban metszi egymást: ez a magasságpont ($M$).'
      },
      {
        id: 'lq2-4',
        questionTypeBadge: 'Súlypont Jele',
        question: 'Mely nevezetes pont a három súlyvonal közös metszéspontja?',
        options: [
          'Súlypont (S)',
          'Magasságpont (M)',
          'Körülírt kör középpontja (O)',
          'Beírt kör középpontja (I)'
        ],
        correctAnswer: 0,
        hint: 'A tömegközéppont, betűjele S.',
        explanation: 'A három súlyvonal egy közös pontban metszi egymást: ez a súlypont ($S$), amely a háromszög fizikai tömegközéppontja is.'
      },
      {
        id: 'lq2-5',
        questionTypeBadge: 'Súlypont Helyzete',
        question: 'Hol helyezkedik el a súlypont (S) egy tompaszögű háromszögben?',
        options: [
          'Kivétel nélkül mindig a háromszög belső tartományában',
          'A háromszögön kívül, a tompaszög mögött',
          'A leghosszabb oldal felezőpontjában',
          'A tompaszögű csúcsban'
        ],
        correctAnswer: 0,
        hint: 'A súlypont soha nem eshet a háromszögön kívülre.',
        explanation: 'Mivel a súlyvonalak végpontjai a csúcsok és oldalfelezők, a súlyvonalak teljes egészében a háromszög belsejében futnak, így a metszéspontjuk ($S$) MINDIG a háromszög belsejében van.'
      },
      {
        id: 'lq2-6',
        questionTypeBadge: 'Magasságpont Hegyesszögű Háromszögben',
        question: 'Hol található a magasságpont (M) egy hegyesszögű háromszögben?',
        options: [
          'A háromszög belsejében',
          'A háromszögön kívül',
          'A leghosszabb oldal felezőpontjában',
          'Valamelyik csúcsban'
        ],
        correctAnswer: 0,
        hint: 'Ha minden szög 90 foknál kisebb, a talppontok és a metszéspont is belül marad.',
        explanation: 'Hegyesszögű háromszög esetén mindhárom magasság talppontja a megfelelő oldalra esik, és a magasságvonalak a belső tartományban metszik egymást.'
      },
      {
        id: 'lq2-7',
        questionTypeBadge: 'Magasságpont Derékszögű Háromszögben',
        question: 'Hol helyezkedik el a magasságpont (M) derékszögű háromszögben?',
        options: [
          'Pontosan a derékszögű csúcsban',
          'Az átfogó felezőpontjában',
          'A háromszög belsejében',
          'A háromszögön kívül'
        ],
        correctAnswer: 0,
        hint: 'A két befogó merőleges egymásra, így ők maguk magasságvonalak!',
        explanation: 'Derékszögű háromszögben a két befogó merőleges egymásra, így az átfogóhoz nem tartozó két magasságvonal maga a két befogó. Metszéspontjuk ezért pontosan a derékszögű csúcs.'
      },
      {
        id: 'lq2-8',
        questionTypeBadge: 'Magasságpont Tompaszögű Háromszögben',
        question: 'Hol helyezkedik el a magasságpont (M) tompaszögű háromszög esetén?',
        options: [
          'A háromszögön kívül',
          'A háromszög belsejében',
          'A tompaszögű csúcsban',
          'A leghosszabb oldal felezőpontjában'
        ],
        correctAnswer: 0,
        hint: 'A tompaszög melletti oldalak magasságai csak az oldalegyenesek meghosszabbítására bocsáthatók.',
        explanation: 'Tompaszögű háromszögben két magasság talppontja az oldalak meghosszabbítására esik. A három magasságvonal így a háromszögön kívül, a tompaszögű csúcs mögötti külső tartományban találkozik.'
      },
      {
        id: 'lq2-9',
        questionTypeBadge: 'Középvonal Fogalma',
        question: 'Mi a háromszög középvonala?',
        figure: <MidlinesSVG size={200} />,
        options: [
          'Két oldal felezőpontját összekötő szakasz',
          'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
          'Az oldalt felező merőleges szakasz',
          'A szemközti csúcsok távolságának fele'
        ],
        correctAnswer: 0,
        hint: 'Nem megy át csúcson, csak oldalfelező pontokon.',
        explanation: 'A háromszög középvonala két oldal felezőpontját köti össze. Egy háromszögben 3 középvonal van.'
      },
      {
        id: 'lq2-10',
        questionTypeBadge: 'Középvonal Tulajdonsága',
        question: 'Hogyan viszonyul a középvonal a harmadik (szemközti) oldalhoz?',
        options: [
          'Párhuzamos vele és hossza pontosan feleakkora',
          'Merőleges rá és hossza feleakkora',
          'Párhuzamos vele és kétszer akkora hosszú',
          'Egyenlő hosszú vele'
        ],
        correctAnswer: 0,
        hint: 'k = a / 2 és az iránya párhuzamos.',
        explanation: 'A középvonal tétele szerint a háromszög középvonala párhuzamos a harmadik oldallal, és hossza pontosan fele a harmadik oldal hosszának ($k = a / 2$).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Arányok és Összefüggések (Közepes)',
    subtitle: 'Súlypont 2:1 osztásaránya, középvonalak területi arányai és az Euler-egyenes alapjai.',
    range: '11 - 20. feladat',
    focus: 'Arányos osztás és területi felosztások',
    questions: [
      {
        id: 'lq2-11',
        questionTypeBadge: 'Súlypont Osztásaránya',
        question: 'Milyen arányban osztja a súlypont a súlyvonalat?',
        figure: <MediansAndCentroidSVG size={200} />,
        options: [
          '2 : 1 arányban a csúcs felől nézve',
          '1 : 2 arányban a csúcs felől nézve',
          '1 : 1 arányban (felezi a súlyvonalat)',
          '3 : 1 arányban a csúcs felől'
        ],
        correctAnswer: 0,
        hint: 'A csúcs felőli szakasz a hosszabb: 2 rész.',
        explanation: 'A súlypont a súlyvonalakat 2 : 1 arányban osztja két részre úgy, hogy a csúcs felőli rész a hosszabb ($|AS| = 2/3 \\cdot s$, $|SF_a| = 1/3 \\cdot s$).'
      },
      {
        id: 'lq2-12',
        questionTypeBadge: 'Súlypont Számítás',
        question: 'Egy háromszög egyik súlyvonalának hossza 15 cm. Milyen hosszú a súlypont és a csúcs közötti szakasz?',
        options: [
          '10 cm',
          '5 cm',
          '7.5 cm',
          '12 cm'
        ],
        correctAnswer: 0,
        hint: 'A csúcs felőli rész a teljes szakasz 2/3 része.',
        explanation: 'A csúcs felőli szakasz $|AS| = \\frac{2}{3} \\cdot 15\\text{ cm} = 10\\text{ cm}$. (Az oldalfelező felőli rész pedig $5\\text{ cm}$.)'
      },
      {
        id: 'lq2-13',
        questionTypeBadge: 'Súlypont Visszaszámítás',
        question: 'A súlypont és az oldalfelező pont közötti szakasz hossza 4 cm. Milyen hosszú a teljes súlyvonal?',
        options: [
          '12 cm',
          '8 cm',
          '16 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'Az oldalfelező felőli szakasz az 1 rész (1/3). A teljes szakasz ennek háromszorosa.',
        explanation: 'Mivel az oldal felőli szakasz 1 egység = 4 cm, a csúcs felőli rész 2 egység = 8 cm, a teljes súlyvonal hossza pedig $4 + 8 = 12\\text{ cm}$ (vagyis $3 \\cdot 4 = 12\\text{ cm}$).'
      },
      {
        id: 'lq2-14',
        questionTypeBadge: 'Súlyvonalak és Terület',
        question: 'Hány egyenlő területű részre bontja a háromszöget a három súlyvonal együttesen?',
        options: [
          '6 egyenlő területű háromszögre',
          '3 egyenlő területű háromszögre',
          '4 egyenlő területű háromszögre',
          '8 egyenlő területű háromszögre'
        ],
        correctAnswer: 0,
        hint: 'Minden csúcsból két-két kis háromszög jön létre.',
        explanation: 'A három súlyvonal a háromszöget pontosan 6 olyan kis háromszögre bontja, amelyeknek a területe egymással megegyezik ($T_{\\text{kis}} = T / 6$).'
      },
      {
        id: 'lq2-15',
        questionTypeBadge: 'Középvonalak és Terület',
        question: 'A három középvonal berajzolásakor hány darab egymással egybevágó háromszög keletkezik?',
        figure: <MidlinesSVG size={200} />,
        options: [
          '4 darab egybevágó háromszög',
          '3 darab egybevágó háromszög',
          '6 darab egybevágó háromszög',
          '2 darab egybevágó háromszög'
        ],
        correctAnswer: 0,
        hint: 'A három sarok háromszög és a középső belső háromszög.',
        explanation: 'A három középvonal az eredeti háromszöget 4 darab egymással egybevágó kis háromszögre bontja, amelyek mindegyike hasonló az eredetihez 1:2 arányban.'
      },
      {
        id: 'lq2-16',
        questionTypeBadge: 'Középvonal Területszámítás',
        question: 'Egy háromszög területe 60 cm². Mekkora a középvonalai által határolt belső háromszög területe?',
        options: [
          '15 cm²',
          '30 cm²',
          '20 cm²',
          '10 cm²'
        ],
        correctAnswer: 0,
        hint: 'A 4 egybevágó rész egyike a belső háromszög: T / 4.',
        explanation: 'Mivel a középvonalak 4 egyenlő területű háromszögre bontják a síkidomot, a belső háromszög területe $T_{\\text{belső}} = \\frac{60}{4} = 15\\text{ cm}^2$.'
      },
      {
        id: 'lq2-17',
        questionTypeBadge: 'Középvonal Kerületszámítás',
        question: 'Egy háromszög kerülete 48 cm. Mekkora a középvonalak által határolt háromszög kerülete?',
        options: [
          '24 cm',
          '12 cm',
          '16 cm',
          '32 cm'
        ],
        correctAnswer: 0,
        hint: 'Minden oldala az eredeti oldal fele: K_kis = K / 2.',
        explanation: 'A középvonalak hossza $a/2, b/2, c/2$. Így a kerületük $K_{\\text{kis}} = \\frac{a+b+c}{2} = \\frac{48}{2} = 24\\text{ cm}$.'
      },
      {
        id: 'lq2-18',
        questionTypeBadge: 'Euler-egyenes Pontjai',
        question: 'Mely nevezetes pontok esnek egy egyenesre az Euler-egyenesen nem szabályos háromszögben?',
        figure: <EulerLineSVG size={200} />,
        options: [
          'O (körülírt kör kp.), S (súlypont) és M (magasságpont)',
          'I (beírt kör kp.), S (súlypont) és M (magasságpont)',
          'O (körülírt kör kp.), I (beírt kör kp.) és S (súlypont)',
          'O, I, S és M mind a négy pont'
        ],
        correctAnswer: 0,
        hint: 'A beírt kör középpontja (I) általános esetben nincs az egyenesen.',
        explanation: 'Az Euler-egyenes a körülírt kör középpontját ($O$), a súlypontot ($S$) és a magasságpontot ($M$) köti össze. Az $I$ pont általában nem esik rá.'
      },
      {
        id: 'lq2-19',
        questionTypeBadge: 'Euler-egyenes Sorrendje',
        question: 'Milyen sorrendben helyezkednek el a pontok az Euler-egyenesen?',
        options: [
          'M — S — O',
          'S — M — O',
          'M — O — S',
          'O — M — S'
        ],
        correctAnswer: 0,
        hint: 'A súlypont (S) van középen a kettő között!',
        explanation: 'Az Euler-egyenesen mindig a súlypont ($S$) van a magasságpont ($M$) és a körülírt kör középpontja ($O$) között: a sorrend $M - S - O$.'
      },
      {
        id: 'lq2-20',
        questionTypeBadge: 'Euler-egyenes Távolságaránya',
        question: 'Milyen arány áll fenn az Euler-egyenesen a pontok távolságai között?',
        options: [
          '|MS| = 2 · |SO|',
          '|SO| = 2 · |MS|',
          '|MS| = |SO| (S felezi MO-t)',
          '|MO| = 2 · |MS|'
        ],
        correctAnswer: 0,
        hint: 'A súlypont kétszer olyan messze van a magasságponttól, mint a körülírt kör középpontjától.',
        explanation: 'Az Euler-egyenes alapvető tétele szerint $|MS| : |SO| = 2 : 1$, vagyis $|MS| = 2 \\cdot |SO|$.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Számításos és Haladó Geometria (Nehéz)',
    subtitle: 'Euler-távolságok, koordináták, speciális háromszögek és kombinált feladatok.',
    range: '21 - 30. feladat',
    focus: 'Összetett tételek és geometriai bizonyítások',
    questions: [
      {
        id: 'lq2-21',
        questionTypeBadge: 'Euler Távolságszámítás',
        question: 'Egy háromszög Euler-egyenesén a súlypont és a körülírt kör középpontja közötti távolság |SO| = 5 cm. Mekkora a magasságpont és a körülírt kör kp. közötti teljes |MO| távolság?',
        figure: <EulerLineSVG size={200} />,
        options: [
          '15 cm',
          '10 cm',
          '20 cm',
          '12.5 cm'
        ],
        correctAnswer: 0,
        hint: '|MS| = 2 · |SO| = 10 cm. |MO| = |MS| + |SO|.',
        explanation: 'Mivel $|MS| = 2 \\cdot |SO| = 2 \\cdot 5\\text{ cm} = 10\\text{ cm}$, a teljes távolság $|MO| = |MS| + |SO| = 10 + 5 = 15\\text{ cm}$.'
      },
      {
        id: 'lq2-22',
        questionTypeBadge: 'Euler Szakaszmegosztás',
        question: 'Az Euler-egyenesen |MO| = 18 cm. Milyen távol van a súlypont (S) a magasságponttól (M)?',
        options: [
          '12 cm',
          '6 cm',
          '9 cm',
          '14 cm'
        ],
        correctAnswer: 0,
        hint: 'A teljes távolság 3 rész: 2 rész MS és 1 rész SO.',
        explanation: 'A 18 cm-es szakaszt a súlypont $2 : 1$ arányban osztja. Egy rész hossza $18 / 3 = 6\\text{ cm}$. Így $|MS| = 2 \\cdot 6 = 12\\text{ cm}$, $|SO| = 6\\text{ cm}$.'
      },
      {
        id: 'lq2-23',
        questionTypeBadge: 'Derékszögű Háromszög és Euler',
        question: 'Egy derékszögű háromszög átfogója c = 12 cm, a derékszögű csúcsa C. Mekkora a távolság a magasságpont (M) és a körülírt kör középpontja (O) között?',
        options: [
          '6 cm',
          '12 cm',
          '3 cm',
          '4 cm'
        ],
        correctAnswer: 0,
        hint: 'M a C csúcsban van, O az átfogó felezőpontja. |CO| az átfogóhoz tartozó sugár (R)!',
        explanation: 'Derékszögű háromszögben $M = C$ (a derékszögű csúcs), és $O$ az átfogó felezőpontja. A csúcs és az átfogó felezőpontjának távolsága pontosan a körülírt kör sugara: $R = c / 2 = 12 / 2 = 6\\text{ cm}$.'
      },
      {
        id: 'lq2-24',
        questionTypeBadge: 'Középvonalak Határolta Háromszög',
        question: 'Egy háromszög oldalai 14 cm, 18 cm és 22 cm. Mekkora a középvonalak által határolt háromszög leghosszabb oldala?',
        options: [
          '11 cm',
          '9 cm',
          '7 cm',
          '18 cm'
        ],
        correctAnswer: 0,
        hint: 'A leghosszabb középvonal a leghosszabb oldallal párhuzamos.',
        explanation: 'A középvonalak hossza a háromszög oldalainak fele: $14/2 = 7\\text{ cm}$, $18/2 = 9\\text{ cm}$, $22/2 = 11\\text{ cm}$. A leghosszabb középvonal tehát 11 cm.'
      },
      {
        id: 'lq2-25',
        questionTypeBadge: 'Szabályos Háromszög Nevezetes Pontjai',
        question: 'Mi igaz a szabályos (egyenlő oldalú) háromszög négy nevezetes pontjára (M, S, O, I)?',
        options: [
          'Mind a négy pont egybeesik egyetlen közös ponttá',
          'Csak O és I esik egybe, de M és S különálló pontok',
          'Az Euler-egyenes egy szabályos kört alkot',
          'A pontok egy négyzet csúcsait alkotják'
        ],
        correctAnswer: 0,
        hint: 'A teljes szimmetria miatt minden magasságvonal szögfelező és súlyvonal is egyben.',
        explanation: 'Szabályos háromszögben minden csúcsból a magasságvonal, a súlyvonal és a szögfelező egybeesik, valamint az oldalfelező merőleges is ezen fut. Ezért $M = S = O = I$ tökéletesen egybeesnek, nincs kiterjedt Euler-egyenes.'
      },
      {
        id: 'lq2-26',
        questionTypeBadge: 'Egyenlő Szárú Háromszög',
        question: 'Mi jellemző az Euler-egyenesre egyenlő szárú (nem szabályos) háromszögben?',
        options: [
          'Egybeesik az alaphoz tartozó szimmetriatengellyel, és az I pont is ráesik',
          'Párhuzamos az alaphoz tartozó magassággal',
          'Merőleges a szimmetriatengelyre',
          'A beírt kör középpontja (I) kívülre esik róla'
        ],
        correctAnswer: 0,
        hint: 'A tengelyes szimmetria miatt minden nevezetes pont a szimmetriatengelyen fekszik.',
        explanation: 'Egyenlő szárú háromszögben az alap felezőmerőlegese egyben az alaphoz tartozó magasságvonal, súlyvonal és szögfelező is (a szimmetriatengely). Így mind a négy pont ($O, I, S, M$) erre az egyetlen tengelyre esik.'
      },
      {
        id: 'lq2-27',
        questionTypeBadge: 'Területi Harmadolás',
        question: 'Egy háromszög területe T = 90 cm². A csúcsokat összekötjük a súlyponttal (S). Mekkora az ABS háromszög területe?',
        options: [
          '30 cm²',
          '15 cm²',
          '45 cm²',
          '20 cm²'
        ],
        correctAnswer: 0,
        hint: 'A súlypont a csúcsokkal összekötve 3 egyenlő területű háromszögre osztja a síkidomot.',
        explanation: 'A háromszög súlypontja a három csúccsal összekötve 3 egyenlő területű részháromszögre bontja az alakzatot ($ABS, BCS, CAS$). Ezek területe $T / 3 = 90 / 3 = 30\\text{ cm}^2$. (Mindegyik 2 db $T/6$ méretű részből áll.)'
      },
      {
        id: 'lq2-28',
        questionTypeBadge: 'Derékszögű Súlyvonal Számítás',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm. Mennyi a derékszögű csúcsból induló súlyvonal hossza?',
        options: [
          '5 cm',
          '4.8 cm',
          '10 cm',
          '2.5 cm'
        ],
        correctAnswer: 0,
        hint: 'Pitagorasz-tétellel számold ki az átfogót: c = √(6² + 8²) = 10 cm. A derékszögből induló súlyvonal az átfogó felezőpontjába mutat!',
        explanation: 'Az átfogó hossza $c = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\text{ cm}$. A derékszögű csúcsból az átfogó felezőjébe húzott súlyvonal a körülírt kör sugara ($R$): $s_c = R = c / 2 = 10 / 2 = 5\\text{ cm}$.'
      },
      {
        id: 'lq2-29',
        questionTypeBadge: 'Súlypont Koordinátái',
        question: 'A síkbeli háromszög csúcsainak koordinátái: A(2, 1), B(8, 3), C(5, 8). Mik a súlypont (S) koordinátái?',
        options: [
          'S(5, 4)',
          'S(4, 5)',
          'S(7.5, 6)',
          'S(5, 3)'
        ],
        correctAnswer: 0,
        hint: 'A súlypont koordinátái a csúcsok koordinátáinak számtani közepe: S = (A + B + C) / 3.',
        explanation: '$x_S = \\frac{2 + 8 + 5}{3} = \\frac{15}{3} = 5$, és $y_S = \\frac{1 + 3 + 8}{3} = \\frac{12}{3} = 4$. Tehát a súlypont koordinátái: $S(5, 4)$.'
      },
      {
        id: 'lq2-30',
        questionTypeBadge: 'Tompaszögű Magasságpont Okfejtés',
        question: 'Miért helyezkedik el a tompaszögű háromszög magasságpontja a háromszögön kívül?',
        options: [
          'Mert a tompaszög melletti két csúcsból induló magasság talppontja csak az oldalegyenesek meghosszabbítására esik',
          'Mert a tompaszög csúcsából nem lehet merőlegest húzni az átfogóra',
          'Mert a súlypont kilöki a magasságpontot a kerületen kívülre',
          'Mert a magasságvonalak ebben az esetben párhuzamosak'
        ],
        correctAnswer: 0,
        hint: 'A merőleges vetület kívülre esik az oldal szakaszon.',
        explanation: 'Tompaszögű háromszögben a két hegyesszögű csúcsból bocsátott merőlegesek talppontjai a szemközti oldalszakaszokon kívülre (az oldalegyenesek meghosszabbítására) esnek. Ezért a három magasságvonal a tompaszög mögötti külső síkrészben metszi egymást.'
      }
    ]
  }
};

export const TriangleLines2Quiz: React.FC<TriangleLines2QuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="8. A háromszög nevezetes vonalai és pontjai II."
      subtitle="Magasságvonalak, súlyvonalak, középvonalak és az Euler-egyenes összefüggései"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-nevezetes-vonalak-2"
      themeColor="teal"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA"
      storageKey="grade9-triangle-lines-2-quiz"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító játék',
          icon: <ArrowRightLeft className="w-4 h-4" />,
          description: 'Keresd meg az összetartozó párokat!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <TriangleLines2Matcher
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
            />
          )
        },
        {
          id: 'sorter',
          label: 'Csoportosító játék',
          icon: <LayoutGrid className="w-4 h-4" />,
          description: 'Válogasd szét a kategóriákba!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <TriangleLines2Sorter
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheatSheetCard
            title="Magasságvonalak és Magasságpont (M)"
            icon={<AltitudesAndOrthocenterSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Definíció:</strong> Csúcsból a szemközti oldalegyenesre bocsátott merőleges</li>
              <li><strong>Hegyesszögű háromszög:</strong> M a háromszög belsejében van</li>
              <li><strong>Derékszögű háromszög:</strong> M a derékszögű csúcsban van</li>
              <li><strong>Tompaszögű háromszög:</strong> M a háromszögön KÍVÜL van</li>
              <li><strong>Területszámítás:</strong> T = (a · m_a) / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Súlyvonalak és Súlypont (S)"
            icon={<MediansAndCentroidSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Definíció:</strong> Csúcsot a szemközti oldal felezőpontjával köti össze</li>
              <li><strong>2 : 1 arány tétele:</strong> |AS| = 2/3 · s_a  és  |SF_a| = 1/3 · s_a (csúcs felől a hosszabb!)</li>
              <li><strong>Elhelyezkedés:</strong> MINDIG a háromszög belsejében van (fizikai tömegközéppont)</li>
              <li><strong>Területfelosztás:</strong> 6 darab egyenlő területű (T / 6) háromszögre oszt</li>
              <li><strong>Koordináták:</strong> S = (A + B + C) / 3</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Középvonalak"
            icon={<MidlinesSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Definíció:</strong> Két oldal felezőpontját összekötő szakasz</li>
              <li><strong>Tulajdonság:</strong> k = a / 2 és párhuzamos a szemközti oldallal</li>
              <li><strong>Felosztás:</strong> 4 egybevágó kis háromszögre osztja a háromszöget</li>
              <li><strong>Belső háromszög:</strong> T_kis = T / 4  és  K_kis = K / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Euler-egyenes és Négy Pont"
            icon={<EulerLineSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Pontok:</strong> Körülírt kör kp. (O), súlypont (S), magasságpont (M)</li>
              <li><strong>Sorrend:</strong> M — S — O</li>
              <li><strong>Távolságarány:</strong> |MS| = 2 · |SO|</li>
              <li><strong>Szabályos háromszög:</strong> M = S = O = I (egybeesnek)</li>
              <li><strong>Egyenlő szárú háromszög:</strong> A szimmetriatengely maga az Euler-egyenes (I is rajta van)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

