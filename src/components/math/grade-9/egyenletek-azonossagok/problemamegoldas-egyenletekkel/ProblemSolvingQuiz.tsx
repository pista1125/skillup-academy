import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ProblemSolvingMatcher } from './ProblemSolvingMatcher';
import { ProblemSolvingSorter } from './ProblemSolvingSorter';
import {
  ProblemSolvingStepsSvg,
  AgeProblemTableSvg,
  MixtureProblemSvg,
  MotionProblemSvg
} from './ProblemSolvingFigures';
import { ArrowRightLeft, LayoutGrid, Target, Users, FlaskConical, Car } from 'lucide-react';

interface ProblemSolvingQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Szövegből Egyenlet és Alapfeladatok (Könnyű)',
    subtitle: 'Szövegek matematikai lefordítása, ismeretlen kijelölése és klasszikus számos feladatok.',
    range: '1 - 10. feladat',
    focus: 'Modellalkotás és Számos Feladatok',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'A Feladatmegoldás Lépései',
        question: 'Mi a szöveges feladatok megoldásának legelső és elengedhetetlen lépése?',
        figure: <ProblemSolvingStepsSvg size={170} />,
        options: [
          'A szöveg gondos elolvasása, az adatok kigyűjtése és vázlatkészítés',
          'Azonnal felírni a leghosszabb egyenletet fejből',
          'Összeszorozni a szövegben található összes számot',
          'Behelyettesíteni az x = 1 értéket a feladatba'
        ],
        correctAnswer: 0,
        hint: 'Mielőtt számolni kezdenél, pontosan meg kell értened, mi van megadva és mit keresünk.',
        explanation: 'Az 1. lépés mindig a szövegértés, az adatok rendszerezése és a vázlat (táblázat, rajz) elkészítése.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Gondoltam egy számot',
        question: 'Gondoltam egy számot, megszoroztam 4-gyel, hozzáadtam 7-et, és 31-et kaptam. Melyik egyenlet modellezi ezt?',
        options: ['4x + 7 = 31', '4(x + 7) = 31', 'x / 4 + 7 = 31', '4x - 7 = 31'],
        correctAnswer: 0,
        hint: 'A szám x. Ennek négyszerese 4x, ehhez adunk 7-et: 4x + 7.',
        explanation: 'A szám 4-szerese: 4x; ehhez adunk 7-et: 4x + 7 = 31. (A megoldás x = 6 lenne).'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Zárójeles Szöveges Feladat',
        question: 'Gondoltam egy számot, kivontam belőle 6-ot, majd a kapott különbséget megszoroztam 3-mal, és 27-et kaptam. Melyik a gondolt szám?',
        options: ['15', '13', '9', '18'],
        correctAnswer: 0,
        hint: 'Egyenlet: 3 · (x - 6) = 27. Oszd el mindkét oldalt 3-mal: x - 6 = 9.',
        explanation: '3(x - 6) = 27 → x - 6 = 9 → x = 15. Ellenőrzés a szövegbe: (15 - 6) · 3 = 9 · 3 = 27.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Két Szám Összege és Különbsége',
        question: 'Két szám összege 42, a különbségük 12. Mennyi a nagyobbik szám?',
        options: ['27', '24', '15', '30'],
        correctAnswer: 0,
        hint: 'Legyen a nagyobbik x, ekkor a kisebbik x - 12. Összegük: x + (x - 12) = 42.',
        explanation: 'x + (x - 12) = 42 → 2x - 12 = 42 → 2x = 54 → x = 27. (A kisebbik szám 15, összegük 42, különbségük 12).'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Egymást Követő Egészek',
        question: 'Három egymást követő egész szám összege 48. Mennyi a legkisebb szám közülük?',
        options: ['15', '16', '14', '17'],
        correctAnswer: 0,
        hint: 'A három szám: x, x + 1, x + 2. Összegük: 3x + 3 = 48.',
        explanation: 'x + (x + 1) + (x + 2) = 48 → 3x + 3 = 48 → 3x = 45 → x = 15. A számok: 15, 16, 17.'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Arányos Darabszám',
        question: 'Egy dobozban kétszer annyi piros golyó van, mint kék. Összesen 36 golyó van benne. Hány kék golyó van a dobozban?',
        options: ['12', '18', '24', '9'],
        correctAnswer: 0,
        hint: 'Legyen a kék golyók száma x, a pirosaké 2x. Egyenlet: x + 2x = 36.',
        explanation: 'x + 2x = 36 → 3x = 36 → x = 12 kék golyó (és 24 piros golyó van).'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Geometriai Szöveges Feladat',
        question: 'Egy téglalap kerülete 40 cm. Az egyik oldala 4 cm-rel hosszabb a másiknál. Milyen hosszú a rövidebb oldal?',
        options: ['8 cm', '12 cm', '6 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'Kerület képlete: K = 2(a + b). Oldalak: x és x + 4. 2(x + x + 4) = 40.',
        explanation: '2(2x + 4) = 40 → 2x + 4 = 20 → 2x = 16 → x = 8 cm. A hosszabb oldal 12 cm, kerület: 2·(8+12) = 40 cm.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Mértékegység Szerepe',
        question: 'Miért fontos az ismeretlen (x) bevezetésekor a mértékegységet (pl. cm, év, Ft) is pontosan leírni?',
        options: [
          'Hogy az ismeretlennek fizikai értelme legyen, és a válaszban helyes dimenzióval adjuk meg az eredményt',
          'Mert anélkül a számológép nem tudja elvégezni az összeadást',
          'Mert a mértékegység nélkül az egyenlet azonossággá válna',
          'Csak azért, mert a tanárok szeretik levonni a pontot'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, mit jelent, ha a végén x = 5: öt méter, öt óra, vagy öt forint?',
        explanation: 'A pontos mértékegység nélkülözhetetlen a valós modell megalkotásához és a szöveges válasz helyes megfogalmazásához.'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Százalékszámításos Alapfeladat',
        question: 'Egy szám 30%-a 45. Mi ez a szám?',
        options: ['150', '135', '120', '180'],
        correctAnswer: 0,
        hint: 'Egyenlet: 0,30 · x = 45. Oszd el a 45-öt 0,3-mal!',
        explanation: '0,30 · x = 45 → x = 45 / 0,30 = 150. Ellenőrzés: 150-nek a 30%-a 150 · 0,3 = 45.'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Árcsökkenés',
        question: 'Egy kabát árát 20%-kal leértékelték, így 32 000 Ft-ba kerül. Mennyi volt az eredeti ára?',
        options: ['40 000 Ft', '38 400 Ft', '36 000 Ft', '42 000 Ft'],
        correctAnswer: 0,
        hint: '20%-os leértékelés után az eredeti ár 80%-át fizetjük ki: 0,80 · x = 32 000.',
        explanation: '0,80 · x = 32 000 → x = 32 000 / 0,80 = 40 000 Ft. (Gyakori hiba a 32 000 Ft-hoz 20%-ot hozzáadni, ami csak 38 400 Ft-ot adna!).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Életkoros és Keverési Feladatok (Közepes)',
    subtitle: 'Időbeli összefüggések kezelése, oldatok és ötvözetek keverésének egyenletei.',
    range: '11 - 20. feladat',
    focus: 'Életkor és Keverési Egyenletek',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Életkoros Feladat',
        question: 'Egy apa most 34, fia 8 éves. Hány év múlva lesz az apa pontosan háromszor olyan idős, mint a fia?',
        figure: <AgeProblemTableSvg size={170} />,
        options: ['5 év múlva', '4 év múlva', '6 év múlva', '7 év múlva'],
        correctAnswer: 0,
        hint: 'x év múlva apa 34 + x, fiú 8 + x éves lesz. Egyenlet: 34 + x = 3 · (8 + x).',
        explanation: '34 + x = 24 + 3x → 10 = 2x → x = 5. Öt év múlva a fiú 13, az apa 39 éves lesz, és 13 · 3 = 39.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Életkor Arányok',
        question: 'Egy anya most négyszer olyan idős, mint a lánya. 6 év múlva már csak 2,5-szer annyi idős lesz. Hány éves most a lánya?',
        options: ['6 éves', '8 éves', '5 éves', '10 éves'],
        correctAnswer: 0,
        hint: 'Mostani korok: lány x, anya 4x. 6 év múlva: x + 6 és 4x + 6. Egyenlet: 4x + 6 = 2,5 · (x + 6).',
        explanation: '4x + 6 = 2,5x + 15 → 1,5x = 9 → x = 6. A lány 6, az anya 24 éves. 6 év múlva 12 és 30 lesznek, 12 · 2,5 = 30.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Tiszta Hatóanyag Számítása',
        question: 'Hány gramm tiszta sót tartalmaz 300 g 15%-os konyhasóoldat?',
        figure: <MixtureProblemSvg size={170} />,
        options: ['45 g', '30 g', '15 g', '60 g'],
        correctAnswer: 0,
        hint: 'Szorozd össze az oldat tömegét a százaléklábbal: 300 · 0,15.',
        explanation: 'Tiszta só = 300 · 0,15 = 45 g.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Két Oldat Összekeverése',
        question: '200 g 10%-os cukoroldathoz hozzáöntünk 300 g 20%-os cukoroldatot. Hány százalékos lesz a kapott keverék?',
        options: ['16%', '15%', '18%', '14%'],
        correctAnswer: 0,
        hint: '1. edényben van 20 g cukor, a 2.-ban 60 g. Összes cukor: 80 g. Összes tömeg: 500 g.',
        explanation: '(200 · 0,10 + 300 · 0,20) / (200 + 300) = (20 + 60) / 500 = 80 / 500 = 0,16 = 16%.'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Víz Elpárologtatása (Bebepárlás)',
        question: '400 g 25%-os sóoldatból elpárologtatunk 100 g vizet. Hány százalékos lesz a megmaradó sűrűbb oldat?',
        options: ['33,3%', '30%', '35%', '28%'],
        correctAnswer: 0,
        hint: 'A só nem párolog el, marad 100 g só. Az új tömeg 400 - 100 = 300 g.',
        explanation: 'Tiszta só = 400 · 0,25 = 100 g. Új tömeg = 300 g. Töménység = 100 / 300 = 1/3 ≈ 33,3%.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Hígítás Tiszta Vízzel',
        question: 'Hány gramm tiszta vizet kell hozzáadni 200 g 30%-os ecetoldathoz, hogy 20%-os legyen?',
        options: ['100 g', '50 g', '80 g', '150 g'],
        correctAnswer: 0,
        hint: 'A tiszta ecet tömege 60 g nem változik. Egyenlet: 60 = (200 + x) · 0,20.',
        explanation: '200 · 0,30 = (200 + x) · 0,20 → 60 = 40 + 0,20x → 20 = 0,20x → x = 100 g víz.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Testvérek Életkora a Múltban',
        question: 'Két testvér életkorának összege most 32 év. 4 évvel ezelőtt az idősebb kétszer olyan idős volt, mint a fiatalabb. Hány éves most a fiatalabb?',
        options: ['12 éves', '10 éves', '14 éves', '8 éves'],
        correctAnswer: 0,
        hint: '4 évvel ezelőtt életkoraik összege 32 - 8 = 24 év volt. Ha az egyik 2x, a másik x: 3x = 24.',
        explanation: '4 éve összegük 24 év volt. 2x + x = 24 → x = 8 éves volt a fiatalabb. Most tehát 8 + 4 = 12 éves (az idősebb 20 éves).'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Keverési Alapelv',
        question: 'Mi a keverési feladatok matematikai megoldásának elméleti alapja?',
        options: [
          'A tiszta hatóanyag (só, cukor, nemesfém) tömegének megmaradása az összekeverés során',
          'Az, hogy a százalékokat egyszerűen össze kell adni',
          'Hogy a keletkező keverék térfogata mindig csökken',
          'Hogy a hidegebb oldat lehűti a melegebbet'
        ],
        correctAnswer: 0,
        hint: 'Az alkotórészekben lévő tiszta anyagok összege egyenlő a végtermék tiszta anyagával.',
        explanation: 'A hatóanyag-mérleg elve: m₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_új.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Töményítés Tiszta Anyaggal',
        question: '100 g 50%-os savoldathoz hány gramm 100%-os tiszta savat kell adni, hogy 60%-os oldatot kapjunk?',
        options: ['25 g', '20 g', '30 g', '15 g'],
        correctAnswer: 0,
        hint: 'A tiszta sav töménysége 1,00. Egyenlet: 50 + x · 1,00 = (100 + x) · 0,60.',
        explanation: '50 + x = 60 + 0,6x → 0,4x = 10 → x = 25 g.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Generációs Életkor Feladat',
        question: 'Nagyapa és unokája együtt 76 évesek. 6 évvel ezelőtt a nagyapa pontosan hétszer olyan idős volt, mint az unokája. Hány éves most az unoka?',
        options: ['14 éves', '12 éves', '16 éves', '10 éves'],
        correctAnswer: 0,
        hint: '6 éve mindkettejük kora 6-tal kevesebb volt, összegük: 76 - 12 = 64 év. 7x + x = 64.',
        explanation: '8x = 64 → x = 8 éves volt az unoka 6 éve. Mostani kora: 8 + 6 = 14 éves (a nagyapa 62 éves).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mozgásos Feladatok és Realitáskontroll (Nehéz)',
    subtitle: 'Találkozás, utolérés, mértékegység-egyeztetés és a szöveges megoldások érvényessége.',
    range: '21 - 30. feladat',
    focus: 'Mozgásos Feladatok és Realitáskontroll',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Szembejövő Járművek',
        question: 'Két város távolsága 300 km. Egyszerre indul egymással szembe egy 70 km/h-s és egy 80 km/h-s autó. Hány óra múlva találkoznak?',
        figure: <MotionProblemSvg size={170} />,
        options: ['2 óra múlva', '2,5 óra múlva', '1,5 óra múlva', '3 óra múlva'],
        correctAnswer: 0,
        hint: 'A járművek óránként 70 + 80 = 150 km-rel közelednek egymáshoz. t = s / v_össz.',
        explanation: '70t + 80t = 300 → 150t = 300 → t = 2 óra.'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Utolérési Feladat',
        question: 'Egy kerékpáros 20 km/h-val elindul, majd 1 óra múlva utána indul egy motoros 60 km/h-val. Mennyi idő alatt éri utol a motoros a biciklist?',
        options: ['30 perc (0,5 óra)', '45 perc', '1 óra', '20 perc'],
        correctAnswer: 0,
        hint: 'A biciklis előnye 20 km. A motoros óránként 60 - 20 = 40 km-t hoz be. t = 20 / 40.',
        explanation: '60t = 20(t + 1) → 60t = 20t + 20 → 40t = 20 → t = 0,5 óra = 30 perc.'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Oda-vissza Túraútvonal',
        question: 'Egy kiránduló a hegyre felfelé 3 km/h-val ment, lefelé ugyanazon az úton 6 km/h-val jött vissza. A teljes menetidő 3 óra volt. Hány km az út egy irányban?',
        options: ['6 km', '9 km', '4,5 km', '8 km'],
        correctAnswer: 0,
        hint: 'Felfelé az idő s / 3, lefelé s / 6. Egyenlet: s/3 + s/6 = 3. Szorozz be 6-tal!',
        explanation: '2s + s = 18 → 3s = 18 → s = 6 km. (Felfelé 2 óra, lefelé 1 óra, összesen 3 óra).'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Perc Átváltása Órára',
        question: 'Egy gyorsvonat 54 km/h átlagsebességgel halad. Mennyi utat tesz meg 20 perc alatt?',
        options: ['18 km', '27 km', '12 km', '15 km'],
        correctAnswer: 0,
        hint: '20 perc = 20 / 60 óra = 1/3 óra! s = v · t.',
        explanation: 's = 54 km/h · (1/3 h) = 18 km.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Realitáskontroll Negatív Gyöknél',
        question: 'Egy szöveges egyenlet megoldása során x = -5 adódik egy személy életkorára. Mi a matematikai és szöveges teendő?',
        options: [
          'A matematikai gyököt el kell vetni, és rögzíteni, hogy a feladatnak a valóságban nincs megoldása',
          'El kell hagyni a mínuszjelet, és a válasz 5 év',
          'Hozzá kell adni 100-at, így 95 év lesz a válasz',
          'Újra kell számolni egy másik ismeretlennel'
        ],
        correctAnswer: 0,
        hint: 'Létezik negatív életkor a valóságban? Az egyenlet levezetése lehet helyes, mégis reálisnak kell lennie a feltételnek.',
        explanation: 'Az életkor nemnegatív mennyiség. Ha a modellből negatív érték adódik, a feladat feltételrendszere a valóságban nem teljesíthető, nincs valós megoldás.'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Fejek és Lábak Feladat',
        question: 'Egy gazda udvarán csirkék (2 láb) és nyulak (4 láb) szaladgálnak. Összesen 35 fejet és 94 lábat számoltunk össze. Hány nyúl van?',
        options: ['12 nyúl', '15 nyúl', '10 nyúl', '14 nyúl'],
        correctAnswer: 0,
        hint: 'Legyen a nyulak száma x, a csirkéké 35 - x. Lábak egyenlete: 4x + 2(35 - x) = 94.',
        explanation: '4x + 70 - 2x = 94 → 2x = 24 → x = 12 nyúl (és 23 csirke: 12·4 + 23·2 = 48 + 46 = 94 láb).'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Tört Darabszám Vizsgálata',
        question: 'Egy színházi előadásra eladott diákjegyek számára a modell levezetése után x = 42,4 adódik. Mit mondhatunk a feladatról?',
        options: [
          'A megoldás a valóságban értelmetlen, mert a jegyek darabszáma csak egész szám lehet',
          'Kerekíteni kell 42-re, és az a pontos megoldás',
          'Az utolsó diáknak csak 40%-os jegyet kell váltania',
          'Minden rendben, a törtek teljesen szabályos jegyszámok'
        ],
        correctAnswer: 0,
        hint: 'Emberek, autók, jegyek diszkrét mennyiségek (ℕ halmaz).',
        explanation: 'Személyek és darabszámok esetében az alaphalmaz a természetes számok halmaza (ℕ). Tört érték esetén nincs reális megoldás.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Ellentétes Irányú Távolodás',
        question: 'Két autó azonos benzinkúttól egyszerre indul el ellenkező irányba. Egyikük 65 km/h, másikuk 85 km/h sebességgel halad. Hány óra múlva lesz a távolságuk 450 km?',
        options: ['3 óra múlva', '2,5 óra múlva', '3,5 óra múlva', '4 óra múlva'],
        correctAnswer: 0,
        hint: 'A távolodás sebessége 65 + 85 = 150 km/h. t = 450 / 150.',
        explanation: '65t + 85t = 450 → 150t = 450 → t = 3 óra.'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Vonat Áthaladása Oszlop Mellett',
        question: 'Egy 120 méter hosszú vonat 72 km/h sebességgel haladva hány másodperc alatt halad el egy villanyoszlop mellett?',
        options: ['6 másodperc', '5 másodperc', '8 másodperc', '10 másodperc'],
        correctAnswer: 0,
        hint: 'Váltsd át a sebességet m/s-ra: 72 km/h = 72 / 3,6 = 20 m/s! t = s / v.',
        explanation: '72 km/h = 20 m/s. Az oszlop mellett a vonat saját hosszának megfelelő utat tesz meg: t = 120 / 20 = 6 másodperc.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Szöveges vs. Algebrai Ellenőrzés',
        question: 'Mi a leglényegesebb különbség a puszta egyenlet-ellenőrzés és a szöveges feladat ellenőrzése között?',
        options: [
          'A szöveges ellenőrzés a valós feltételeket, az adatok reális értelmességét vizsgálja a feladat eredeti szövegében',
          'Nincs különbség, pontosan ugyanaz a kettő',
          'A szöveges ellenőrzésnél csak a helyesírást javítjuk',
          'Az algebrai ellenőrzést csak számológéppel szabad végezni'
        ],
        correctAnswer: 0,
        hint: 'Egy negatív szám kielégítheti a leírt egyenletet, de lehetetlen egy életkorra.',
        explanation: 'A szöveges ellenőrzés a teljes valósághűséget vizsgálja: a feltételek értelmezhetőségét, a fizikai dimenziókat és a kerek mondatos választ.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. A Szöveges Feladatmegoldás 5 Lépése',
    badge: 'Módszertan',
    points: [
      '1. Szövegértés & Adatgyűjtés: vázlat, táblázat készítése.',
      '2. Ismeretlen kijelölése: x elnevezése MÉRTÉKEGYSÉGGEL.',
      '3. Egyenlet felírása: a szöveges kapcsolat egyenlőségként.',
      '4. Megoldás: mérlegelvvel.',
      '5. Szöveges ellenőrzés és válasz kerek egész mondatban.'
    ]
  },
  {
    title: '2. Életkoros Feladatok',
    badge: 'Táblázatos modell',
    points: [
      'Készíts táblázatot: szereplők a sorokban, idősíkok („Most”, „k év múlva”, „m éve”) az oszlopokban.',
      'Az idő mindenkinek azonos mértékben telik (+k vagy -k év).',
      'Zárójel használata kötelező: pl. 3 · (x + 5).'
    ]
  },
  {
    title: '3. Keverési Feladatok',
    badge: 'Hatóanyag-megmaradás',
    points: [
      'Alapképlet: m₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_új.',
      'Tiszta víz hozzáadása: p = 0%.',
      'Tiszta só / hatóanyag hozzáadása: p = 100% (p = 1,00).',
      'Víz elpárologtatása: össztömegből kivonás, de a hatóanyag megmarad.'
    ]
  },
  {
    title: '4. Mozgásos Feladatok & Realitáskontroll',
    badge: 's = v · t & Valóság',
    points: [
      'Egyenletes mozgás: s = v · t. Szembehaladás: v_rel = v₁ + v₂.',
      'Mértékegység-egyeztetés: km/h esetén t órában (pl. 15 perc = 0,25 óra).',
      'Realitáskontroll: ember, tárgy nem lehet negatív vagy tört darabszámú!'
    ]
  }
];

export const ProblemSolvingQuiz: React.FC<ProblemSolvingQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Problémamegoldás Egyenletekkel – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten szöveges feladatok modellezéséből, életkoros, keverési és mozgásos problémákból"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 6. TÉMAKÖR"
      themeColor="amber"
      storageKey="grade9-problem-solving-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-problemamegoldas-quiz"
      topicTitle="Problémamegoldás egyenletekkel"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a szöveges feladatokat, kifejezéseket a modelljükkel és válaszukkal!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <ProblemSolvingMatcher
              key={`problem-solving-matcher-${level}`}
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
          subtitle: 'Kategorizáld a feladatokat típusuk, műveleteik és valósághűségük szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <ProblemSolvingSorter
              key={`problem-solving-sorter-${level}`}
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
