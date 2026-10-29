import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ThalesAppsMatcher, matcherLevels } from './ThalesAppsMatcher';
import { ThalesAppsSorter, sorterLevels } from './ThalesAppsSorter';
import {
  TangentConstructionSVG,
  TangentLengthPythagorasSVG,
  RightTriangleConstructionSVG
} from './ThalesAppsFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface ThalesAppsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Érintők és Alapszerkesztések (Könnyű)',
    subtitle: 'Érintők tulajdonságai, merőlegesség, érintőszakaszok egyenlősége és a Thalész-kör átmérője.',
    range: '1 - 10. feladat',
    focus: 'Alapvető érintőtulajdonságok és szerkesztési lépések',
    questions: [
      {
        id: 'taq1-1',
        questionTypeBadge: 'Érintők Száma Külső Pontból',
        question: 'Hány érintő egyenes húzható egy körhöz a körön kívül fekvő P pontból?',
        figure: <TangentConstructionSVG size={200} />,
        options: [
          'Pontosan 2 darab',
          'Pontosan 1 darab',
          'Végtelen sok',
          'Attól függ, mekkora a kör sugara'
        ],
        correctAnswer: 0,
        hint: 'A pontból a kör mindkét oldalára fektethető egy-egy érintő egyenes.',
        explanation: 'Egy körhöz bármely külső pontból pontosan 2 érintő egyenes húzható.'
      },
      {
        id: 'taq1-2',
        questionTypeBadge: 'Érintő és Sugár Kapcsolata',
        question: 'Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?',
        options: [
          'Pontosan 90°-ot (merőlegesek)',
          '45°-ot',
          'Attól függ, hol van a külső pont',
          '60°-ot'
        ],
        correctAnswer: 0,
        hint: 'Az érintő a kör sugarára a legkisebb távolságú merőleges egyenes.',
        explanation: 'A kör érintője az érintési pontban mindig merőleges az érintési sugárra: OE ⟂ PE (90°).'
      },
      {
        id: 'taq1-3',
        questionTypeBadge: 'Érintőszakaszok Tétele',
        question: 'Mit állít az érintőszakaszok tétele a külső P pontból húzott PE_1 és PE_2 szakaszokról?',
        figure: <TangentLengthPythagorasSVG size={200} />,
        options: [
          'A két érintőszakasz hossza megegyezik: |PE_1| = |PE_2|',
          'Az egyik szakasz mindig kétszerese a másiknak',
          'A két szakasz összege egyenlő a sugárral',
          'A két szakasz merőleges egymásra'
        ],
        correctAnswer: 0,
        hint: 'A kör és az érintők tengelyesen szimmetrikusak az OP egyenesre.',
        explanation: 'A szimmetria miatt a külső pontból húzott két érintőszakasz hossza mindig pontosan megegyezik: |PE_1| = |PE_2|.'
      },
      {
        id: 'taq1-4',
        questionTypeBadge: 'Thalész-kör Átmérője',
        question: 'Melyik szakasz mint átmérő fölé kell megrajzolni a Thalész-kört, amikor külső P pontból érintőt szerkesztünk az O középpontú körhöz?',
        options: [
          'Az OP szakasz (a középpont és a külső pont távolsága)',
          'Az eredeti kör átmérője',
          'A kör sugara (r)',
          'Az E_1E_2 érintési húr'
        ],
        correctAnswer: 0,
        hint: 'A derékszög az érintési pontban (E-nél) lesz, így az OP szakasz lesz a derékszögű háromszög átfogója!',
        explanation: 'Mivel az OE ⟂ PE szög derékszög, az OEP háromszög átfogója az OP szakasz. Ezért a Thalész-kört az OP szakasz mint átmérő fölé kell megrajzolni.'
      },
      {
        id: 'taq1-5',
        questionTypeBadge: 'Érintési Pontok Meghatározása',
        question: 'Hogyan kapjuk meg az érintési pontokat a szerkesztés során?',
        options: [
          'Az OP átmérőjű Thalész-kör és az eredeti kör metszéspontjaiként',
          'A kör középpontjából tetszőleges merőlegest állítva',
          'A P pont körül r sugarú körívet húzva',
          'Szemmértékkel megjelölve'
        ],
        correctAnswer: 0,
        hint: 'Ahol a két kör metszi egymást, ott lesz derékszög és körív egyszerre.',
        explanation: 'A Thalész-kör és az eredeti kör két metszéspontja adja az E_1 és E_2 érintési pontokat.'
      },
      {
        id: 'taq1-6',
        questionTypeBadge: 'Érintő Belső Pontból',
        question: 'Hány érintő húzható a körhöz egy olyan pontból, amely a körön belül helyezkedik el?',
        options: [
          '0 darab (egyetlen érintő sem húzható)',
          '1 darab',
          '2 darab',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Bármely egyenes, ami átmegy a kör belsején, két pontban metszi a kört (szelő).',
        explanation: 'A kör belső pontjából nem húzható érintő, mert minden rajta átmenő egyenes szelő, amely két pontban metszi a körvonalat.'
      },
      {
        id: 'taq1-7',
        questionTypeBadge: 'Érintő Körvonalbeli Pontból',
        question: 'Hány érintője van a körnek egy a körvonalán lévő P pontban?',
        options: [
          'Pontosan 1 darab',
          '2 darab',
          '0 darab',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A sugár végpontjában pontosan egy merőleges egyenes húzható a sugárra.',
        explanation: 'A körvonal bármely pontjában pontosan egyetlen érintő egyenes húzható a körhöz (a ponthoz húzott sugárra merőleges egyenes).'
      },
      {
        id: 'taq1-8',
        questionTypeBadge: 'Derékszögű Négyszög Alakja',
        question: 'Milyen alakzat jön létre az O középpont, az E_1 és E_2 érintési pontok és a külső P pont összekötésével?',
        options: [
          'Tengelyesen szimmetrikus deltoid (érintődeltoid)',
          'Téglalap',
          'Rombusz',
          'Trapéz'
        ],
        correctAnswer: 0,
        hint: 'Két szomszédos oldal a sugár (r és r), a másik kettő az érintőszakasz (e és e).',
        explanation: 'Az OE_1PE_2 négyszög szomszédos oldalai páronként egyenlők (r = r és e = e), valamint van két szemközti derékszöge (E_1-nél és E_2-nél), ezért ez egy deltoid.'
      },
      {
        id: 'taq1-9',
        questionTypeBadge: 'Derékszögű Háromszög Feltétel',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm. Mekkora lehet legfeljebb az átfogóhoz tartozó magasság (m_c), hogy a háromszög megszerkeszthető legyen?',
        figure: <RightTriangleConstructionSVG size={200} />,
        options: [
          'Legfeljebb 5 cm',
          'Legfeljebb 10 cm',
          'Legfeljebb 2.5 cm',
          'Tetszőlegesen nagy lehet'
        ],
        correctAnswer: 0,
        hint: 'A magasság nem lehet nagyobb a Thalész-kör sugaránál: m_c ≤ R = c / 2.',
        explanation: 'A Thalész-kör sugara R = c / 2 = 5 cm. A kör legmagasabb pontja a felezőpont felett R távolságra van, így m_c ≤ 5 cm.'
      },
      {
        id: 'taq1-10',
        questionTypeBadge: 'Lehetetlen Szerkesztés',
        question: 'Megszerkeszthető-e olyan derékszögű háromszög, amelynek átfogója c = 12 cm, és az átfogóhoz tartozó magassága m_c = 7 cm?',
        options: [
          'Nem, mert 7 cm > 12 / 2 = 6 cm (a magasság nagyobb a sugárnál)',
          'Igen, minden méretből megszerkeszthető',
          'Igen, pontosan 1 megoldás van',
          'Csak tompaszögű háromszögként szerkeszthető meg'
        ],
        correctAnswer: 0,
        hint: 'A c-vel párhuzamos 7 cm távolságú egyenes elkerüli a 6 cm sugarú Thalész-kört.',
        explanation: 'Mivel m_c = 7 cm > c / 2 = 6 cm, a párhuzamos egyenes nem metszi a Thalész-kört, így nem létezik ilyen derékszögű háromszög.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Pitagorasz az Érintőre és Deltoidok (Közepes)',
    subtitle: 'Érintőszakasz hosszának kiszámítása, szögfelezők, derékszögű deltoid területe.',
    range: '11 - 20. feladat',
    focus: 'Algebrai és geometriai számítások az érintőkkel',
    questions: [
      {
        id: 'taq2-11',
        questionTypeBadge: 'Érintőszakasz Számítás Alap',
        question: 'Egy r = 6 cm sugarú kör középpontjától egy külső P pont d = 10 cm távolságra van. Milyen hosszú a P-ből húzott érintőszakasz (e)?',
        figure: <TangentLengthPythagorasSVG size={200} />,
        options: [
          '8 cm',
          '4 cm',
          '11.66 cm',
          '16 cm'
        ],
        correctAnswer: 0,
        hint: 'Az OEP háromszög derékszögű, átfogója d = 10 cm, egyik befogója r = 6 cm. e = √(d² - r²).',
        explanation: 'e = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'taq2-12',
        questionTypeBadge: 'Érintőszakasz Számítás 2',
        question: 'Egy kör sugara r = 5 cm, és a külső pontból húzott érintőszakasz e = 12 cm. Milyen távol van a külső P pont a kör középpontjától (d = |OP|)?',
        options: [
          '13 cm',
          '17 cm',
          '7 cm',
          '10.9 cm'
        ],
        correctAnswer: 0,
        hint: 'd az OEP derékszögű háromszög átfogója: d = √(e² + r²).',
        explanation: 'd = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.'
      },
      {
        id: 'taq2-13',
        questionTypeBadge: 'Érintődeltoid Területe',
        question: 'Egy kör sugara r = 5 cm, a külső pontból húzott érintőszakasz e = 12 cm. Mekkora az OE_1PE_2 deltoid területe?',
        options: [
          '60 cm²',
          '30 cm²',
          '120 cm²',
          '65 cm²'
        ],
        correctAnswer: 0,
        hint: 'A deltoid két egybevágó derékszögű háromszögből áll: T = 2 · (r · e / 2) = r · e.',
        explanation: 'T = r · e = 5 · 12 = 60 cm².'
      },
      {
        id: 'taq2-14',
        questionTypeBadge: 'Érintők Szögfelezője',
        question: 'Milyen szerepet játszik az OP szakasz a két érintő által bezárt E_1PE_2 szögben?',
        options: [
          'Felezi a szöget (belső szögfelezője a szögnek)',
          'Harmadolja a szöget',
          'Merőleges a szögszárakra',
          'Nincs köze a szöghöz'
        ],
        correctAnswer: 0,
        hint: 'Az OP szakasz a deltoid szimmetriatengelye.',
        explanation: 'Mivel a deltoid szimmetrikus az OP tengelyre, az OP félegyenes pontosan felezi az érintők által bezárt szöget.'
      },
      {
        id: 'taq2-15',
        questionTypeBadge: 'Érintési Húr Merőlegessége',
        question: 'Milyen összefüggés áll fenn az OP egyenes és az E_1E_2 érintési pontokat összekötő szakasz között?',
        options: [
          'Az OP egyenes merőlegesen felezi az E_1E_2 szakaszt',
          'Párhuzamosak egymással',
          'Egyenlő hosszúak',
          '45°-os szöget zárnak be'
        ],
        correctAnswer: 0,
        hint: 'A deltoid átlói mindig merőlegesek egymásra, és a szimmetriaátló felezi a másikat.',
        explanation: 'Az OE_1PE_2 deltoidban az átlók merőlegesek egymásra, így az OP szimmetriaátló merőlegesen felezi az E_1E_2 érintési húrt.'
      },
      {
        id: 'taq2-16',
        questionTypeBadge: 'Egyenlő Szárú Derékszögű Szerkesztés',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, és a magassága m_c = 5 cm. Hány ilyen háromszög szerkeszthető az átfogó egyik oldalára, és milyen típusú?',
        figure: <RightTriangleConstructionSVG size={200} />,
        options: [
          'Pontosan 1 darab, amely egyenlő szárú derékszögű háromszög',
          '2 darab különböző háromszög',
          '0 darab (nem létezik)',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Mivel m_c = c / 2 = 5 cm, a párhuzamos egyenes pontosan érinti a Thalész-kört.',
        explanation: 'Mivel a magasság egyenlő a sugárral (5 cm), a párhuzamos érinti a Thalész-kört a tetőpontban. Így az átfogó felett 1 megoldás van, és a háromszög egyenlő szárú (45°-45°-90°).'
      },
      {
        id: 'taq2-17',
        questionTypeBadge: 'Két Megoldás Feltétele',
        question: 'Egy derékszögű háromszög átfogója c = 12 cm. Mekkora magasság (m_c) esetén kapunk pontosan 2 darab (egymással egybevágó, de tükrös) megoldást az átfogó egyik oldalán?',
        options: [
          'Ha m_c < 6 cm (például m_c = 4 cm)',
          'Ha m_c = 6 cm',
          'Ha m_c > 6 cm',
          'Bármilyen magasság esetén'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamos egyenesnek két pontban kell metszenie a 6 cm sugarú félkört.',
        explanation: 'Két metszéspont akkor keletkezik, ha a magasság szigorúan kisebb a sugárnál: m_c < c / 2 = 6 cm.'
      },
      {
        id: 'taq2-18',
        questionTypeBadge: 'Befogókból Érintőszakasz',
        question: 'Egy derékszögű háromszög befogói 8 cm és 15 cm. A derékszögű csúcsból mint középpontból r = 4 cm sugarú kört rajzolunk. Milyen hosszú az átfogó egyik végpontjából a körhöz húzott érintőszakasz?',
        options: [
          '√(8² - 4²) = √48 ≈ 6.93 cm (vagy √(15² - 4²) = √209 ≈ 14.46 cm)',
          '17 cm',
          '12 cm',
          '8 cm'
        ],
        correctAnswer: 0,
        hint: 'A végpont távolsága a derékszögű csúcstól az egyik befogó: d = 8 cm vagy d = 15 cm. e = √(d² - r²).',
        explanation: 'A derékszögű csúcs és a csúcs távolsága maga a befogó (pl. d = 8 cm). Így az érintőszakasz: e = √(8² - 4²) = √48 ≈ 6.93 cm.'
      },
      {
        id: 'taq2-19',
        questionTypeBadge: 'Érintő Szöge a Középponthoz',
        question: 'Ha a külső pontból húzott érintő és az OP szakasz közötti szög 30°, mekkora a két érintő által bezárt teljes szög (E_1PE_2)?',
        options: [
          '60°',
          '30°',
          '90°',
          '120°'
        ],
        correctAnswer: 0,
        hint: 'Az OP szakasz a szögfelező, így a teljes szög a fél-szög duplája.',
        explanation: 'Mivel az OP szakasz szögfelező, a két érintő közötti teljes szög 2 · 30° = 60°.'
      },
      {
        id: 'taq2-20',
        questionTypeBadge: 'Középponti Szög Kapcsolata',
        question: 'Ha a két érintő által bezárt szög a P csúcsnál 50°, mekkora a két érintési sugár által bezárt E_1OE_2 szög a kör középpontjában?',
        options: [
          '130°',
          '50°',
          '90°',
          '100°'
        ],
        correctAnswer: 0,
        hint: 'A négyszög belső szögeinek összege 360°. A két érintési pontban 90° és 90° van (összesen 180°). A maradék két szög összege is 180°!',
        explanation: 'Az OE_1PE_2 négyszögben a szögek összege 360°. Mivel E_1 és E_2-nél 90°-90° van, a P-nél lévő és az O-nál lévő szög összege 180°: 180° - 50° = 130°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometria és Életbeli Alkalmazások (Nehéz)',
    subtitle: 'Érintési húr hossza, 30°-60°-os érintőháromszögek, kombinált magasság- és területszámítások.',
    range: '21 - 30. feladat',
    focus: 'Haladó bizonyítások és több lépéses szerkesztések',
    questions: [
      {
        id: 'taq2-21',
        questionTypeBadge: '30°-os Érintőháromszög',
        question: 'Egy r = 5 cm sugarú körhöz a külső P pontból úgy húzunk érintőket, hogy az érintők közötti szög 60° (vagyis az OP-vel bezárt szög 30°). Milyen távol van P a kör középpontjától (d)?',
        options: [
          '10 cm',
          '5√3 cm ≈ 8.66 cm',
          '15 cm',
          '20 cm'
        ],
        correctAnswer: 0,
        hint: 'Az OEP derékszögű háromszögben a 30°-os szöggel szemközti befogó a sugár: r = 5 cm. A 30°-os derékszögű háromszög átfogója kétszerese ennek a befogónak!',
        explanation: 'A 30°-60°-90° háromszögben a 30°-os szöggel szemközti befogó az átfogó fele: r = d / 2, amiből d = 2r = 2 · 5 = 10 cm.'
      },
      {
        id: 'taq2-22',
        questionTypeBadge: 'Érintőszakasz 60°-os Szögnél',
        question: 'Az előző feladatbeli körben (r = 5 cm, d = 10 cm, érintőszög = 60°) mekkora az érintőszakasz (e) pontos hossza?',
        options: [
          '5√3 cm ≈ 8.66 cm',
          '10 cm',
          '8 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        hint: 'e = √(d² - r²) = √(10² - 5²) = √(100 - 25) = √75.',
        explanation: 'e = √75 = 5√3 cm ≈ 8.66 cm.'
      },
      {
        id: 'taq2-23',
        questionTypeBadge: 'Érintési Húr Hossza',
        question: 'Egy r = 6 cm sugarú kör középpontjától d = 10 cm távolságra lévő P pontból érintőket húzunk (e = 8 cm). Milyen hosszú az E_1E_2 érintési húr?',
        options: [
          '9.6 cm',
          '8 cm',
          '10 cm',
          '4.8 cm'
        ],
        correctAnswer: 0,
        hint: 'A deltoid területe felírható az átlók szorzatának felével is: T = (OP · E1E2) / 2 = r · e.  Így E1E2 = 2 · r · e / d!',
        explanation: 'T = r · e = 6 · 8 = 48 cm². Ugyanakkor T = (d · |E_1E_2|) / 2 = (10 · |E_1E_2|) / 2 = 5 · |E_1E_2|. Ebből |E_1E_2| = 48 / 5 = 9.6 cm (a fele m = 4.8 cm).'
      },
      {
        id: 'taq2-24',
        questionTypeBadge: 'Derékszögű Háromszög és Érintő',
        question: 'Egy derékszögű háromszög átfogója c = 20 cm, egyik befogója a = 12 cm. Milyen hosszú a derékszögű csúcsból az átfogóra bocsátott magasság (m_c)?',
        options: [
          '9.6 cm',
          '8 cm',
          '10 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'Pitagorasz: b = √(20² - 12²) = 16 cm. Majd m_c = (a · b) / c.',
        explanation: 'A másik befogó b = √(400 - 144) = √256 = 16 cm. A magasság: m_c = (12 · 16) / 20 = 192 / 20 = 9.6 cm.'
      },
      {
        id: 'taq2-25',
        questionTypeBadge: 'Közös Külső Érintők Elve',
        question: 'Két különböző sugarú kör közös külső érintőinek szerkesztésekor hogyan használjuk a Thalész-tételt?',
        options: [
          'A nagyobb kör sugarát csökkentjük a kisebb kör sugarával (R - r), és ehhez a segédkörhöz húzunk érintőt a másik kör középpontjából Thalész-körrel',
          'A két kör középpontja közé egyenes vonalat húzunk és kész',
          'A két kör sugarát összeadjuk és Pitagoraszt alkalmazunk',
          'Csak körző nélküli vonalzóval szerkeszthető'
        ],
        correctAnswer: 0,
        hint: 'A koncentrikus segédkör sugara R - r, a pontszerűvé zsugorított kisebb kör középpontjából húzunk hozzá érintőt.',
        explanation: 'A klasszikus szerkesztési eljárásban a nagyobb kör sugarából levonjuk a kisebb kör sugarát (R - r), így a feladat visszavezetődik egy pontból egy körhöz húzott érintő szerkesztésére Thalész-körrel.'
      },
      {
        id: 'taq2-26',
        questionTypeBadge: 'Két Kör Érintési Szöge',
        question: 'Egy r = 4 cm sugarú körhöz a P pontból húzott érintők derékszöget (90°-ot) zárnak be egymással. Milyen távol van P a kör középpontjától (d)?',
        options: [
          '4√2 cm ≈ 5.66 cm',
          '8 cm',
          '4 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'Ha a P-nél lévő szög 90°, és az érintési pontoknál is 90° van, akkor az OE1PE2 deltoid egy NÉGYZET!',
        explanation: 'Mivel a négyszög minden szöge 90° és két szomszédos oldala r = 4 cm, az alakzat egy r oldalú négyzet. Az átlója a d = OP szakasz: d = r√2 = 4√2 cm ≈ 5.66 cm.'
      },
      {
        id: 'taq2-27',
        questionTypeBadge: 'Tengeri Látóhatár Számítás',
        question: 'Egy kilátótorony magassága a Föld felszíne felett h. A kilátóból a Föld horizontjára nézve a látóvonal a Föld gömbjének érintője. Milyen geometriai alakzat alapján számolható a látóhatár távolsága?',
        options: [
          'A Föld középpontja, a kilátó teteje és a horizont érintési pontja által alkotott derékszögű háromszög alapján',
          'Egy szabályos háromszög alapján',
          'Egy egyenlő szárú tompaszögű háromszög alapján',
          'Kizárólag gömbi trigonometriával, síkgeometria nélkül'
        ],
        correctAnswer: 0,
        hint: 'A látóvonal a Föld gömbjének érintője, a horizontnál lévő sugár derékszöget zár be vele.',
        explanation: 'A látóvonal mint érintő merőleges a Föld sugarára a horizont pontjában. Így az O-Horizont-Kilátó háromszög derékszögű, ahol az átfogó R + h, a befogó R, az érintőszakasz pedig a látóhatár távolsága: d = √((R+h)² - R²).'
      },
      {
        id: 'taq2-28',
        questionTypeBadge: 'Középvonal Szerkesztése Derékszögűben',
        question: 'Egy derékszögű háromszög átfogója c = 16 cm. Megrajzoljuk a Thalész-kört és az átfogóhoz tartozó középvonalat. Milyen hosszú ez a középvonal és hol halad?',
        options: [
          'Hossza 8 cm, és összeköti a két befogó felezőpontját, párhuzamosan az átfogóval',
          'Hossza 16 cm, és átmegy a derékszögű csúcson',
          'Hossza 4 cm, és merőleges az átfogóra',
          'Hossza 8 cm, és átmegy a kör középpontján'
        ],
        correctAnswer: 0,
        hint: 'A középvonal két oldal felezőjét köti össze, és párhuzamos a harmadikkal: k = c / 2.',
        explanation: 'Az átfogóval párhuzamos középvonal a két befogó felezőpontját köti össze, hossza k_c = c / 2 = 16 / 2 = 8 cm (pontosan a Thalész-kör sugara!).'
      },
      {
        id: 'taq2-29',
        questionTypeBadge: 'Derékszögű Háromszög és Magasságpont',
        question: 'Derékszögű háromszögben hol található a magasságpont (M) a Thalész-körhöz képest?',
        options: [
          'Pontosan a Thalész-kör körvonalán fekszik (maga a derékszögű csúcs)',
          'A Thalész-kör középpontjában van',
          'A Thalész-körön kívül fekszik',
          'A Thalész-körön belül, a súlypont mellett'
        ],
        correctAnswer: 0,
        hint: 'A derékszögű háromszög magasságpontja maga a derékszögű csúcs, a derékszögű csúcs pedig a Thalész-körön van.',
        explanation: 'Mivel derékszögű háromszögben a magasságpont egybeesik a derékszögű csúccsal, és a derékszögű csúcs a Thalész-tétel miatt a körvonalon van, így M pontosan a Thalész-körön fekszik.'
      },
      {
        id: 'taq2-30',
        questionTypeBadge: 'Összefoglaló Érintőtétel',
        question: 'Mi a legfőbb matematikai oka annak, hogy a külső pontból húzott érintők pontosan megszerkeszthetők Thalész-körrel?',
        options: [
          'Mert a Thalész-tétel biztosítja a 90°-os szöget az érintő és az érintési ponthoz húzott sugár között',
          'Mert a kör középpontja mindig vonzza az egyeneseket',
          'Mert a Pitagorasz-tétel csak körökben érvényes',
          'Mert az érintők mindig 45°-os szöget zárnak be a tengellyel'
        ],
        correctAnswer: 0,
        hint: 'Az érintő definíciója a sugárra való merőlegesség, a Thalész-kör pedig a derékszög mértani helye.',
        explanation: 'Az érintő elengedhetetlen tulajdonsága, hogy az érintési pontban merőleges a sugárra ($90^\circ$). Mivel a derékszögű látószög mértani helye a Thalész-kör, az OP szakasz fölé rajzolt Thalész-kör és az eredeti kör metszése pontosan és kizárólag a derékszögű érintési pontokat adja meg.'
      }
    ]
  }
};

export const ThalesAppsQuiz: React.FC<ThalesAppsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="11. A Thalész-tétel alkalmazásai"
      subtitle="Körhöz külső pontból húzott érintők megszerkesztése, érintőszakaszok és derékszögű háromszögek szerkesztése"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-thalesz-alkalmazas"
      themeColor="blue"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA"
      storageKey="grade9-thales-apps-quiz"
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
            <ThalesAppsMatcher
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
            <ThalesAppsSorter
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
            title="Érintők Szerkesztése"
            icon={<TangentConstructionSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>OP szakasz:</strong> A középpont és a külső pont összekötése</li>
              <li><strong>Thalész-kör:</strong> OP mint átmérő fölé rajzolt kör (felezőpont F)</li>
              <li><strong>Érintési pontok (E_1, E_2):</strong> A Thalész-kör és az eredeti kör metszése</li>
              <li><strong>Merőlegesség:</strong> OE ⟂ PE a Thalész-tétel miatt</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Érintőszakasz & Pitagorasz"
            icon={<TangentLengthPythagorasSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Egyenlőség:</strong> |PE_1| = |PE_2| (szimmetrikus érintők)</li>
              <li><strong>Képlet:</strong> e = √(d² - r²)  (ahol d = |OP|)</li>
              <li><strong>Alakzat:</strong> OE_1PE_2 deltoid, területe T = r · e</li>
              <li><strong>Szögfelező:</strong> Az OP egyenes felezi az érintők szögét</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Derékszögű Háromszög Szerkesztése"
            icon={<RightTriangleConstructionSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Feltétel (c és m_c):</strong> m_c ≤ c / 2</li>
              <li><strong>m_c &lt; c / 2:</strong> 2 megoldás (párhuzamos metszi a kört)</li>
              <li><strong>m_c = c / 2:</strong> 1 megoldás (egyenlő szárú derékszögű)</li>
              <li><strong>m_c &gt; c / 2:</strong> 0 megoldás (lehetetlen szerkesztés)</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Érintők Száma & Szögek"
            icon={<Circle className="w-5 h-5 text-blue-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Külső pont (d &gt; r):</strong> 2 érintő</li>
              <li><strong>Körvonalbeli pont (d = r):</strong> 1 érintő</li>
              <li><strong>Belső pont (d &lt; r):</strong> 0 érintő (szelő)</li>
              <li><strong>Középponti szög kapcsolata:</strong> ∢(E_1OE_2) + ∢(E_1PE_2) = 180°</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

