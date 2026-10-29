import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DistancesMatcher } from './DistancesMatcher';
import { DistancesSorter } from './DistancesSorter';
import {
  PointLineDistanceSvg,
  ParallelDistanceSvg,
  LociSvg
} from './DistancesFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, MoveHorizontal, Compass, Circle } from 'lucide-react';

interface DistancesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Távolság Alapfogalma és Tulajdonságai (Könnyű)',
    subtitle: 'Pont és egyenes, két pont távolsága, a merőleges szakasz mint legrövidebb út.',
    range: '1 - 10. feladat',
    focus: 'Távolságok alapismeretei',
    questions: [
      {
        id: 'dq1-1',
        questionTypeBadge: 'Pont és Egyenes Távolsága',
        question: 'Hogyan határozzuk meg egy pont és egy egyenes távolságát a síkban?',
        figure: <PointLineDistanceSvg size={200} />,
        options: [
          'A pontból az egyenesre bocsátott merőleges szakasz hosszával',
          'A pontból az egyenes tetszőleges pontjához húzott szakasszal',
          'A pont és az egyenes metszéspontjának távolságával',
          'Mindig 0'
        ],
        correctAnswer: 0,
        hint: 'A pont és az egyenes között végtelen sok szakasz húzható, de a távolság a legrövidebb.',
        explanation: 'Egy pont és egy egyenes távolsága definíció szerint a pontból az egyenesre bocsátott merőleges szakasz hossza, mert ez adja a legrövidebb összekötő utat.'
      },
      {
        id: 'dq1-2',
        questionTypeBadge: 'Legrövidebb Út Elve',
        question: 'Miért a merőleges szakasz a legrövidebb egy pont és egy egyenes között?',
        figure: <PointLineDistanceSvg size={200} />,
        options: [
          'Mert a talpponttal alkotott derékszögű háromszögben a merőleges a befogó, minden más szakasz átfogó',
          'Mert a merőleges vonal mindig függőleges',
          'Mert az axiómák tiltják a ferde távolságot',
          'Ez nem igaz, létezik nála rövidebb szakasz is'
        ],
        correctAnswer: 0,
        hint: 'A derékszögű háromszögben az átfogó mindig hosszabb bármelyik befogónál.',
        explanation: 'A P pont, a T talppont és az egyenes bármely Q pontja derékszögű háromszöget alkot. Ebben a PT merőleges szakasz befogó, a PQ ferde szakasz pedig átfogó, így |PT| < |PQ| mindig teljesül.'
      },
      {
        id: 'dq1-3',
        questionTypeBadge: 'Távolság Nemnegativitása',
        question: 'Lehet-e két geometriai alakzat távolsága negatív szám?',
        options: [
          'Nem, a távolság mindig nemnegatív (d ≥ 0)',
          'Igen, ha a koordináták negatívak',
          'Igen, ha az alakzat az x tengely alatt van',
          'Csak vektorok esetén lehet negatív'
        ],
        correctAnswer: 0,
        hint: 'A távolság egy szakasz fizikai hossza, ami sohasem negatív.',
        explanation: 'A távolság a matematika axiómái szerint mindig nemnegatív valós szám ($d \ge 0$), és pontosan akkor 0, ha a két alakzatnak van közös pontja.'
      },
      {
        id: 'dq1-4',
        questionTypeBadge: 'Nulla Távolság Feltétele',
        question: 'Mikor 0 egy P pont és egy e egyenes távolsága?',
        options: [
          'Pontosan akkor, ha a P pont illeszkedik az e egyenesre (P ∈ e)',
          'Ha a pont az origóban van',
          'Ha az egyenes párhuzamos az x tengellyel',
          'Soha nem lehet 0'
        ],
        correctAnswer: 0,
        hint: 'Ha a pont már eleve rajta van az egyenesen, mekkora utat kell megtenni hozzá?',
        explanation: 'Ha $P \in e$, akkor a pont és az egyenes távolsága 0, mivel nem kell elmozdulni a pontból, hogy az egyenesen legyünk.'
      },
      {
        id: 'dq1-5',
        questionTypeBadge: 'Párhuzamosok Távolsága',
        question: 'Mi mondható el két párhuzamos egyenes távolságáról?',
        figure: <ParallelDistanceSvg size={200} />,
        options: [
          'Mindenütt állandó (bármelyik pontból mérve ugyanakkora)',
          'A metszéspont felé haladva csökken',
          'Függ a pontok x koordinátájától',
          'Nem értelmezhető'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamos egyenesek sosem metszik egymást, sávszélességük egyenletes.',
        explanation: 'Két párhuzamos egyenes távolsága a sík minden pontjában azonos és állandó: az egyik egyenes bármely pontjából a másikra bocsátott merőleges szakasz hossza megegyezik.'
      },
      {
        id: 'dq1-6',
        questionTypeBadge: 'Két Pont Távolsága',
        question: 'Mi a geometriai definíciója két pont (A és B) távolságának?',
        options: [
          'Az A és B pontokat összekötő szakasz hossza (|AB|)',
          'A pontok koordinátáinak szorzata',
          'A pontokból az origóba vezető sugarak összege',
          'A felezőpontjuk távolsága'
        ],
        correctAnswer: 0,
        hint: 'Két pont közötti legrövidebb út az egyenes szakasz.',
        explanation: 'Két pont távolsága az őket összekötő egyenes szakasz hossza: $d(A, B) = |AB|$.'
      },
      {
        id: 'dq1-7',
        questionTypeBadge: 'Középpárhuzamos Fogalma',
        question: 'Hogyan helyezkedik el a középpárhuzamos két párhuzamos egyeneshez képest?',
        figure: <ParallelDistanceSvg size={200} />,
        options: [
          'Párhuzamos velük, és pontosan félúton fekszik köztük (távolsága mindkettőtől d / 2)',
          'Merőleges rájuk',
          '45°-os szögben metszi őket',
          'Átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'A két egyenestől egyenlő távolságra lévő pontok alkotják.',
        explanation: 'A középpárhuzamos egyenes párhuzamos az eredeti egyenesekkel, és mindkettőtől pontosan $d/2$ távolságra helyezkedik el.'
      },
      {
        id: 'dq1-8',
        questionTypeBadge: 'Távolság az Origótól',
        question: 'Milyen távol van az origótól az A(6; 8) pont a síkon?',
        options: ['10 egység', '14 egység', '48 egység', '2 egység'],
        correctAnswer: 0,
        hint: 'Alkalmazd a Pitagorasz-tételt: d = √(6² + 8²).',
        explanation: 'd = √(6² + 8²) = √(36 + 64) = √100 = 10 egység.'
      },
      {
        id: 'dq1-9',
        questionTypeBadge: 'Tengelytől Vett Távolság',
        question: 'Mekkora a P(4; -7) pont távolsága az x tengelytől?',
        options: ['7 egység', '-7 egység', '4 egység', '11 egység'],
        correctAnswer: 0,
        hint: 'Az x tengelytől mért távolság az y koordináta abszolút értéke: |y|.',
        explanation: 'Az x tengely egyenlete y = 0. A pont távolsága ettől a merőleges mentén mért elmozdulás: d = |-7| = 7 egység (a távolság nem lehet negatív!).'
      },
      {
        id: 'dq1-10',
        questionTypeBadge: 'Tengelytől Vett Távolság',
        question: 'Mekkora a Q(-9; 5) pont távolsága az y tengelytől?',
        options: ['9 egység', '-9 egység', '5 egység', '14 egység'],
        correctAnswer: 0,
        hint: 'Az y tengelytől mért távolság az x koordináta abszolút értéke: |x|.',
        explanation: 'Az y tengelytől mért távolság az x koordináta abszolút értéke: d = |-9| = 9 egység.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Nevezetes Mértani Helyek és Számítások (Közepes)',
    subtitle: 'Szakaszfelező merőleges, szögfelezők, párhuzamosok távolsága és koordinátasíkbeli feladatok.',
    range: '11 - 20. feladat',
    focus: 'Mértani helyek és egyenletek',
    questions: [
      {
        id: 'dq2-1',
        questionTypeBadge: 'Két Ponttól Egyenlő Távolság',
        question: 'Mi a sík azon pontjainak mértani helye, amelyek egyenlő távol vannak az A és B rögzített pontoktól (|PA| = |PB|)?',
        figure: <LociSvg size={200} />,
        options: [
          'Az AB szakasz felezőmerőleges egyenese',
          'Az AB átmérőjű körvonal',
          'Az AB egyenes',
          'A két pontot összekötő szakasz'
        ],
        correctAnswer: 0,
        hint: 'A pontok egy egyenest alkotnak, amely merőleges az AB szakaszra annak felezőpontjában.',
        explanation: 'Két ponttól egyenlő távolságra lévő síkbeli pontok mértani helye az őket összekötő szakasz felezőmerőleges egyenese ($f_{AB}$).'
      },
      {
        id: 'dq2-2',
        questionTypeBadge: 'Két Metsző Egyenestől Egyenlő Távolság',
        question: 'Mi a sík azon pontjainak mértani helye, amelyek egyenlő távolságra vannak két egymást metsző egyenestől?',
        figure: <LociSvg size={200} />,
        options: [
          'A két metsző egyenes által bezárt szögek szögfelező egyeneseinek párja',
          'Egyetlen szögfelező félegyenes',
          'A metszéspont körüli körvonal',
          'Egy párhuzamos egyenes'
        ],
        correctAnswer: 0,
        hint: 'Két metsző egyenes négy szöget alkot, két egymásra merőleges szögfelező egyenessel.',
        explanation: 'Két metsző egyenestől egyenlő távolságra lévő pontok mértani helye a két metsző egyenes szögfelezőinek párja. Ez a két egyenes egymásra mindig merőleges!'
      },
      {
        id: 'dq2-3',
        questionTypeBadge: 'Egyenestől Adott Távolság',
        question: 'Mi a sík azon pontjainak mértani helye, amelyek egy adott e egyenestől pontosan 4 cm távolságra vannak?',
        figure: <LociSvg size={200} />,
        options: [
          'Két darab, az e egyenessel párhuzamos egyenes 4 cm távolságra (mindkét oldalán)',
          'Egyetlen párhuzamos egyenes',
          'Egy 4 cm sugarú körvonal',
          'Egy 4 cm széles sáv'
        ],
        correctAnswer: 0,
        hint: 'Az egyenes mindkét oldalán (fölötte és alatta) léteznek ilyen pontok.',
        explanation: 'Az egyenestől adott $d$ távolságra lévő pontok két darab, az eredeti egyenessel párhuzamos egyenest alkotnak, az egyenes két oldalán $d$ távolságban.'
      },
      {
        id: 'dq2-4',
        questionTypeBadge: 'Párhuzamos Egyenesek Távolsága',
        question: 'Mekkora az y = 3 és az y = 11 vízszintes egyenesek távolsága a koordinátasíkon?',
        options: ['8 egység', '14 egység', '11 egység', '3 egység'],
        correctAnswer: 0,
        hint: 'Mivel mindkét egyenes párhuzamos az x tengellyel, a távolság az y értékek különbsége: 11 - 3.',
        explanation: 'd = |11 - 3| = 8 egység.'
      },
      {
        id: 'dq2-5',
        questionTypeBadge: 'Középpárhuzamos Egyenlete',
        question: 'Mi az egyenlete az y = -1 és y = 7 egyenesek középpárhuzamosának?',
        options: ['y = 3', 'y = 4', 'y = 6', 'y = 3,5'],
        correctAnswer: 0,
        hint: 'A középpárhuzamos magassága a két koordináta számtani közepe: (-1 + 7) / 2.',
        explanation: 'y = (-1 + 7) / 2 = 6 / 2 = 3.'
      },
      {
        id: 'dq2-6',
        questionTypeBadge: 'Háromszög Csúcsaitól Egyenlő Távolság',
        question: 'Melyik nevezetes pont van egyenlő távol egy háromszög mindhárom CSÚCSÁTÓL?',
        options: [
          'A körülírt kör középpontja (az oldalfelező merőlegesek metszéspontja)',
          'A beírt kör középpontja (a belső szögfelezők metszéspontja)',
          'A magasságpont',
          'A súlypont'
        ],
        correctAnswer: 0,
        hint: 'Mivel mindhárom csúcs a körvonalon van, a középpont távolsága a sugarak hossza (R).',
        explanation: 'A körülírt kör középpontja a három oldalfelező merőleges metszéspontja, ezért mindhárom csúcstól azonos ($R$ sugárnyi) távolságra van.'
      },
      {
        id: 'dq2-7',
        questionTypeBadge: 'Háromszög Oldalaitól Egyenlő Távolság',
        question: 'Melyik pont van egyenlő távol egy háromszög mindhárom OLDALÁTÓL?',
        options: [
          'A beírt kör középpontja (a belső szögfelezők metszéspontja)',
          'A körülírt kör középpontja',
          'A súlypont',
          'A magasságpont'
        ],
        correctAnswer: 0,
        hint: 'A belső szögfelezőkön lévő pontok egyenlő távol vannak a szárak által alkotott oldalaktól.',
        explanation: 'A belső szögfelezők metszéspontja mindhárom oldaltól egyenlő ($r$ sugárnyi) távolságra van, ez a háromszögbe írt kör középpontja.'
      },
      {
        id: 'dq2-8',
        questionTypeBadge: 'Két Pont Távolsága Képlettel',
        question: 'Mekkora az A(1; 3) és B(5; 6) pontok távolsága?',
        options: ['5 egység', '7 egység', '25 egység', '√7 egység'],
        correctAnswer: 0,
        hint: 'd = √((5 - 1)² + (6 - 3)²) = √(4² + 3²).',
        explanation: 'd = √((5 - 1)² + (6 - 3)²) = √(16 + 9) = √25 = 5 egység. (A 3-4-5 számhármas).'
      },
      {
        id: 'dq2-9',
        questionTypeBadge: 'Kör Húrjának Távolsága',
        question: 'Egy r = 5 cm sugarú körben egy húr hossza 8 cm. Milyen távol van a húr a kör középpontjától?',
        options: ['3 cm', '4 cm', '2 cm', '√41 cm'],
        correctAnswer: 0,
        hint: 'A középpontból a húrra bocsátott merőleges felezi a húrt (4 cm). A sugár (5 cm) az átfogó.',
        explanation: 'A derékszögű háromszögben az átfogó r = 5 cm, a befogó a húr fele (4 cm). A távolság: d = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.'
      },
      {
        id: 'dq2-10',
        questionTypeBadge: 'Háromszög Magassága mint Távolság',
        question: 'Mi a geometriai jelentése a háromszög egyik csúcsából húzott magasságvonalnak a távolság fogalmával?',
        options: [
          'A csúcspont távolsága a szemközti oldal egyenesétől',
          'A csúcspont távolsága a szemközti csúcstól',
          'A szemközti oldal felezőpontjának távolsága',
          'A kerület fele'
        ],
        correctAnswer: 0,
        hint: 'A magasságvonal merőleges az oldal egyenesére.',
        explanation: 'A háromszög $m_a$ magassága pontosan az $A$ csúcs merőleges távolsága a szemközti $a$ oldal egyenesétől: $m_a = d(A, e_a)$.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometriai Távolságok és Mértani Helyek (Nehéz)',
    subtitle: 'Mértani helyek metszéspontjai, térbeli távolságok, érintők és szerkesztési feladatok.',
    range: '21 - 30. feladat',
    focus: 'Emelt szintű távolsági problémák',
    questions: [
      {
        id: 'dq3-1',
        questionTypeBadge: 'Mértani Helyek Metszete (Kör és Egyenes)',
        question: 'Legfeljebb hány olyan pont létezhet a síkban, amely egy adott O ponttól 5 cm-re van, ÉS egy adott e egyenestől 3 cm-re van?',
        options: ['4 pont', '2 pont', '1 pont', 'Végtelen sok'],
        correctAnswer: 0,
        hint: 'Az O-tól 5 cm-re lévő pontok kört alkotnak. Az e-től 3 cm-re lévők két párhuzamos egyenest. Egy egyenes legfeljebb 2 pontban metszheti a kört.',
        explanation: 'Az első feltétel egy 5 cm sugarú kört ad. A második feltétel két, egymástól 6 cm-re lévő párhuzamos egyenest. Mindkét párhuzamos egyenes legfeljebb 2-2 pontban metszheti a kört, így összesen legfeljebb 2 · 2 = 4 metszéspont létezhet.'
      },
      {
        id: 'dq3-2',
        questionTypeBadge: 'Két Pont Távolsága Térben',
        question: 'Egy derékszögű térbeli koordináta-rendszerben mekkora a P(2; 3; 6) pont távolsága az origótól?',
        options: ['7 egység', '11 egység', '√13 egység', '49 egység'],
        correctAnswer: 0,
        hint: 'Térbeli távolság: d = √(x² + y² + z²).',
        explanation: 'd = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 egység.'
      },
      {
        id: 'dq3-3',
        questionTypeBadge: 'Pont és Sík Távolsága',
        question: 'Egy kocka alaplapja az α síkban fekszik, élhossza a = 6 cm. Milyen távol van a kocka felső lapjának középpontja az α alapsíktól?',
        options: ['6 cm', '6√2 cm', '3 cm', '6√3 cm'],
        correctAnswer: 0,
        hint: 'A felső lap minden pontjának merőleges távolsága az alaptól a kocka élhossza.',
        explanation: 'A kocka oldallapjai merőlegesek az alapsíkra, így a felső lap bármely pontjából az alapsíkra bocsátott merőleges hossza pontosan az élhossz, azaz 6 cm.'
      },
      {
        id: 'dq3-4',
        questionTypeBadge: 'Kör Érintőjének Távolsága',
        question: 'Egy r sugarú körhöz húzott érintőegyenes milyen távol van a kör középpontjától?',
        options: [
          'Pontosan r távolságra (az érintési pontba húzott sugár merőleges az érintőre)',
          'Nagyobb mint r',
          'Kisebb mint r',
          '2r'
        ],
        correctAnswer: 0,
        hint: 'Az érintő egyetlen pontban metszi a kört, és a sugár merőleges rá.',
        explanation: 'Az érintőegyenes távolsága a kör középpontjától pontosan megegyezik a kör sugarával ($d(O, e) = r$), mert a sugár merőleges az érintőre az érintési pontban.'
      },
      {
        id: 'dq3-5',
        questionTypeBadge: 'Két Kör Távolsága',
        question: 'Két egymáson kívül elhelyezkedő kör középpontjainak távolsága d = 15 cm. Sugaraik r₁ = 4 cm és r₂ = 3 cm. Mekkora a két körvonal közötti legkisebb távolság?',
        options: ['8 cm', '15 cm', '7 cm', '22 cm'],
        correctAnswer: 0,
        hint: 'A két körvonal közötti legkisebb távolság a középpontok távolságából kivonva a két sugár összegét: d - (r₁ + r₂).',
        explanation: 'A legkisebb távolság a centrális (középpontokat összekötő egyenes) mentén alakul ki: d_min = 15 - (4 + 3) = 15 - 7 = 8 cm.'
      },
      {
        id: 'dq3-6',
        questionTypeBadge: 'Pont Távolsága Két Síktól',
        question: 'Mi a mértani helye azon pontoknak a térben, amelyek két metsző síktól egyenlő távolságra vannak?',
        options: [
          'A két metsző sík által bezárt lapszögek szögfelező síkjainak párja',
          'Egyetlen egyenes (a metszésvonal)',
          'Egy gömbfelület',
          'A síkokkal párhuzamos sík'
        ],
        correctAnswer: 0,
        hint: 'A síkbeli szögfelező egyenesek térbeli megfelelője a szögfelező sík.',
        explanation: 'A térben két metsző síktól egyenlő távolságra lévő pontok a két metsző sík szögfelező síkjainak párját alkotják (amelyek egymásra merőlegesek).'
      },
      {
        id: 'dq3-7',
        questionTypeBadge: 'Szakaszfelező Merőlegesek és Hegyesszög',
        question: 'Hol található a tompaszögű háromszög csúcsaitól egyenlő távolságra lévő pont (a körülírt kör középpontja)?',
        options: [
          'A háromszögön KÍVÜL',
          'A háromszögön BELÜL',
          'A leghosszabb oldal felezőpontján',
          'A tompaszögű csúcsban'
        ],
        correctAnswer: 0,
        hint: 'Csak hegyesszögű háromszögnél esik a háromszög belsejébe; derékszögűnél az átfogó felezőpontjára.',
        explanation: 'Tompaszögű háromszög esetén az oldalfelező merőlegesek metszéspontja mindig a háromszögön kívülre esik (mivel a tompaszöggel szemközti ív nagyobb egy félkörnél).'
      },
      {
        id: 'dq3-8',
        questionTypeBadge: 'Rombusz Magassága',
        question: 'Egy rombusz oldala a = 10 cm, területe T = 60 cm². Milyen távol van egymástól a rombusz két párhuzamos szemközti oldala?',
        options: ['6 cm', '10 cm', '12 cm', '5 cm'],
        correctAnswer: 0,
        hint: 'A rombusz területe T = a · m. A magasság pontosan a szemközti oldalak távolsága!',
        explanation: 'A szemközti párhuzamos oldalak távolsága a rombusz magassága: m = T / a = 60 / 10 = 6 cm.'
      },
      {
        id: 'dq3-9',
        questionTypeBadge: 'Háromszög-egyenlőtlenség Távolságokra',
        question: 'A sík három pontjára ismert: d(A, B) = 7 cm és d(B, C) = 4 cm. Milyen határok közé eshet az A és C pontok d(A, C) távolsága?',
        options: ['3 cm ≤ d(A, C) ≤ 11 cm', '4 cm < d(A, C) < 7 cm', 'd(A, C) = 11 cm', '0 cm ≤ d(A, C) ≤ 28 cm'],
        correctAnswer: 0,
        hint: 'A háromszög-egyenlőtlenség: |7 - 4| ≤ d(A, C) ≤ 7 + 4 (ha a pontok egy egyenesre esnek, az egyenlőség is megengedett).',
        explanation: 'A távolságfüggvény háromszög-egyenlőtlensége alapján: |d(A, B) - d(B, C)| ≤ d(A, C) ≤ d(A, B) + d(B, C), vagyis 3 cm ≤ d(A, C) ≤ 11 cm. Ha a pontok egy egyenesbe esnek, a minimális (3) és maximális (11) határérték is felvehető.'
      },
      {
        id: 'dq3-10',
        questionTypeBadge: 'Mértani Hely Térben (Ponttól Távolság)',
        question: 'Mi a mértani helye a térben azon pontoknak, amelyek egy adott O ponttól pontosan R távolságra vannak?',
        options: [
          'R sugarú gömbfelület',
          'R sugarú körlap',
          'R sugarú hengerfelület',
          'Kockafelület'
        ],
        correctAnswer: 0,
        hint: 'A kör 2D-s fogalmának 3D-s megfelelője.',
        explanation: 'A síkban a körvonal felel meg ennek a definíciónak, a 3 dimenziós térben pedig az $O$ középpontú, $R$ sugarú gömbfelület.'
      }
    ]
  }
};

export const DistancesQuiz: React.FC<DistancesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Távolságok"
      subtitle="30 feladat 3 szinten, párosító és csoportosító módokkal a távolságokról és nevezetes mértani helyekről"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-tavolsagok"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó távolsági párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <DistancesMatcher
              key={`distances-matcher-${level}`}
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
          subtitle: 'Csoportosítsd a mértani helyeket és távolságokat!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <DistancesSorter
              key={`distances-sorter-${level}`}
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
            title="Távolság-definíciók"
            icon={<MoveHorizontal className="w-5 h-5 text-cyan-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Pont és egyenes:</strong> merőleges szakasz hossza (|PT| ⊥ e)</li>
              <li><strong>Két pont:</strong> összekötő szakasz hossza (|AB|)</li>
              <li><strong>Párhuzamosok:</strong> közös merőleges szakaszuk hossza (állandó)</li>
              <li><strong>Legrövidebb út elve:</strong> a merőleges mindig rövidebb bármely ferde szakasznál</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Nevezetes Mértani Helyek"
            icon={<Compass className="w-5 h-5 text-emerald-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Ponttól r távolságra:</strong> körvonal (k(O, r))</li>
              <li><strong>Két ponttól egyenlő távol:</strong> szakaszfelező merőleges (f_AB)</li>
              <li><strong>Két metsző egyenestől:</strong> két egymásra merőleges szögfelező egyenes</li>
              <li><strong>Két párhuzamostól:</strong> középpárhuzamos egyenes (d/2 távolságban)</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Koordinátageometria és Háromszögek"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Két pont távolsága:</strong> d = √((x₂ - x₁)² + (y₂ - y₁)²)</li>
              <li><strong>Körülírt kör középpontja:</strong> egyenlő távol van a 3 csúcstól</li>
              <li><strong>Beírt kör középpontja:</strong> egyenlő távol van a 3 oldaltól</li>
              <li><strong>Kör és húr:</strong> d = √(r² - (h/2)²)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};
