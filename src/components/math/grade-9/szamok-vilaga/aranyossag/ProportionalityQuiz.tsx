import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ProportionalityMatcher } from './ProportionalityMatcher';
import { ProportionalitySorter } from './ProportionalitySorter';
import {
  DirectProportionalitySvg,
  InverseProportionalitySvg,
  ProportionsBalanceSvg,
  UnitaryMethodTableSvg
} from './ProportionalityFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface ProportionalityQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szabályok (Könnyű)',
    subtitle: 'Egyenes és fordított arányosság definíciója, arányossági tényező és grafikonok.',
    range: '1 - 10. feladat',
    focus: 'Definíciók és Alapfogalmak',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Egyenes Arányosság Definíció',
        question: 'Mikor nevezünk két összetartozó mennyiséget (x és y) egyenesen arányosnak a tankönyv szerint?',
        figure: <DirectProportionalitySvg size={170} />,
        options: [
          'Ha hányadosuk állandó: y / x = k (k ≠ 0)',
          'Ha szorzatuk állandó: x · y = k',
          'Ha összegük állandó: x + y = k',
          'Ha különbségük állandó: y - x = k'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a bolti egységárra: ha a fizetendő összeget elosztod a kilókkal, mindig ugyanazt az árat kapod!',
        explanation: 'Két mennyiség akkor egyenesen arányos, ha hányadosuk állandó (y / x = k), vagyis y = k · x. Ha x n-szeresére nő, y is n-szeresére nő.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Fordított Arányosság Definíció',
        question: 'Mikor nevezünk két összetartozó mennyiséget fordítottan arányosnak?',
        figure: <InverseProportionalitySvg size={170} />,
        options: [
          'Ha szorzatuk állandó: x · y = k (k ≠ 0)',
          'Ha hányadosuk állandó: y / x = k',
          'Ha összegük nulla',
          'Ha a grafikonjuk egyenes vonal'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a sebességre és az időre fix távolságnál: sebesség · idő = állandó út!',
        explanation: 'Két mennyiség fordítottan arányos, ha szorzatuk állandó: x · y = k, azaz y = k / x. Ha x n-szeresére nő, y az n-ed részére csökken.'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Grafikon Felismerés',
        question: 'Milyen alakzat ábrázolja az egyenes arányosságot a derékszögű koordináta-rendszerben?',
        options: [
          'Az origón (0; 0) átmenő egyenes vagy félegyenes',
          'Az I. síknegyedben futó hiperbola görbe',
          'Tengelyekkel párhuzamos egyenes',
          'Parabola görbe'
        ],
        correctAnswer: 0,
        hint: 'Ha x = 0, akkor y = k · 0 = 0, vagyis a grafikon feltétlenül átmegy a (0; 0) ponton!',
        explanation: 'Az egyenes arányosság grafikonja mindig az origón (0; 0) átmenő egyenes (pozitív mennyiségeknél félegyenes).'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Hiperbola Görbe',
        question: 'Milyen alakzat ábrázolja a fordított arányosságot (x > 0 esetén)?',
        options: [
          'Hiperbola görbe ága az I. síknegyedben',
          'Origóból induló félegyenes',
          'Körvonal',
          'Negatív meredekségű egyenes vonal'
        ],
        correctAnswer: 0,
        hint: 'A görbe alatti x · y terület minden pontban állandó, és sosem éri el a tengelyeket.',
        explanation: 'Az y = k / x egyenlet grafikonja hiperbola, amelynek ágai a koordinátatengelyekhez simulnak (aszimptoták).'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Változás Iránya',
        question: 'Ha két mennyiség egyenesen arányos, és az egyik a négyszeresére nő, hogyan változik a másik?',
        options: [
          'A másik is pontosan a négyszeresére nő',
          'A negyedére csökken',
          '4-gyel növekszik',
          'Nem lehet megmondani'
        ],
        correctAnswer: 0,
        hint: 'Egyenes arányosság: ha 4-szer annyi almát veszel, 4-szer annyit fizetsz.',
        explanation: 'Egyenes arányosságnál a változás aránya megegyezik: n-szeres bemenet n-szeres kimenetet eredményez.'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Fordított Változás',
        question: 'Ha két mennyiség fordítottan arányos, és az egyik a háromszorosára nő, hogyan változik a másik?',
        options: [
          'A harmadára (1/3-ára) csökken',
          'A háromszorosára nő',
          '3-mal csökken',
          'Változatlan marad'
        ],
        correctAnswer: 0,
        hint: 'Ha 3-szor annyi munkás dolgozik ugyanazon a feladaton, harmadannyi idő kell nekik.',
        explanation: 'Fordított arányosságnál: x · y = k. Ha x helyébe 3x kerül, akkor y helyébe y/3 kell, hogy a szorzat (3x · y/3 = x · y = k) állandó maradjon.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Keresztszorzat Alaptétel',
        question: 'Mit mond ki az aránypárok alaptétele az a : b = c : d aránypárra vonatkozóan?',
        figure: <ProportionsBalanceSvg size={160} />,
        options: [
          'A külső tagok szorzata egyenlő a belső tagok szorzatával: a · d = b · c',
          'A számlálók összege egyenlő a nevezők összegével',
          'A szomszédos tagok különbsége állandó',
          'a · b = c · d'
        ],
        correctAnswer: 0,
        hint: 'Keresztbe szorzunk: a-t a d-vel, b-t a c-vel.',
        explanation: 'Az a/b = c/d egyenletet mindkét oldalon megszorozva (b · d)-vel kapjuk az alaptételt: a · d = b · c (külső tagok szorzata = belső tagok szorzata).'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Arányossági Tényező',
        question: 'Ha 1 kg sajt ára 3200 Ft, mennyi a k arányossági tényező az y = k · x képletben (ahol x a tömeg kg-ban, y a fizetendő Ft)?',
        options: ['3200 Ft/kg', '1/3200', '1600 Ft/kg', '6400 Ft/kg'],
        correctAnswer: 0,
        hint: 'A k arányossági tényező pontosan az egységnyi x-hez (1 kg) tartozó y értéke.',
        explanation: 'y = k · x ⟹ k = y / x = 3200 Ft / 1 kg = 3200 Ft/kg az arányossági tényező (egységár).'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Helyzet Felismerése',
        question: 'Milyen kapcsolat van egy autó megtett útja és a menetidő között, ha az autó állandó 90 km/h sebességgel halad?',
        options: [
          'Egyenes arányosság, mert s = 90 · t',
          'Fordított arányosság, mert több idő alatt kevesebb utat tesz meg',
          'Nem arányos kapcsolat',
          'Négyzetes arányosság'
        ],
        correctAnswer: 0,
        hint: 'Állandó sebességnél dupla idő alatt dupla távolságot tesz meg az autó.',
        explanation: 'Mivel s = v · t és v állandó, s / t = 90 (állandó hányados), ez egyenes arányosság.'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Helyzet Felismerése',
        question: 'Egy 100 km-es túra során milyen kapcsolat van a túrázók átlagsebessége és a túra időtartama között?',
        options: [
          'Fordított arányosság, mert v · t = 100 km',
          'Egyenes arányosság, mert nagyobb sebességhez több idő kell',
          'Nincs köztük semmilyen matematikai kapcsolat',
          'Lineáris, de nem arányos'
        ],
        correctAnswer: 0,
        hint: 'Ha gyorsabban mennek (nagyobb v), kevesebb idő (kisebb t) alatt teszik meg a 100 km-t: v · t = 100.',
        explanation: 'Mivel a távolság fix: sebesség · idő = 100 km (állandó szorzat), így ez fordított arányosság.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Gyakorlati Számítások és Hármasszabály (Közepes)',
    subtitle: 'Szöveges arányossági feladatok, ismeretlen tag kiszámítása és méretarány.',
    range: '11 - 20. feladat',
    focus: 'Hármasszabály és Aránypárok',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Hármasszabály: Egyenes Arányosság',
        question: '3 kg narancs ára 1650 Ft. Mennyibe kerül 7 kg narancs ugyanezen az egységáron?',
        figure: <UnitaryMethodTableSvg size={160} />,
        options: ['3850 Ft', '3300 Ft', '4200 Ft', '3500 Ft'],
        correctAnswer: 0,
        hint: 'Következtess az egységre: mennyi 1 kg narancs? 1650 : 3 = ? Ezután szorozz 7-tel!',
        explanation: '1 kg narancs: 1650 Ft / 3 = 550 Ft. 7 kg narancs: 7 · 550 Ft = 3850 Ft.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Hármasszabály: Fordított Arányosság',
        question: '5 munkás 12 nap alatt fejez be egy ház felújítását. Hány nap alatt végezne 6 ugyanolyan munkatempójú munkás?',
        options: ['10 nap', '14,4 nap', '15 nap', '8 nap'],
        correctAnswer: 0,
        hint: 'Számold ki az összes munkamennyiséget: 5 · 12 = 60 munkanap. Ezt oszd el 6 munkással!',
        explanation: 'A munka elvégzéséhez 5 · 12 = 60 munkanap szükséges. 6 munkás esetén: 60 / 6 = 10 napra van szükség.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Aránypár Megoldása',
        question: 'Melyik x érték teszi igazzá az x : 15 = 4 : 5 aránypárt?',
        options: ['12', '18', '20', '10'],
        correctAnswer: 0,
        hint: 'Alkalmazd a keresztszorzatot: 5 · x = 15 · 4 !',
        explanation: 'Keresztszorzattal: 5 · x = 15 · 4 ⟹ 5x = 60 ⟹ x = 12.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Sebesség és Idő Számítás',
        question: 'Egy vonat 90 km/h átlagsebességgel 4 óra alatt tesz meg egy utat. Mekkora sebességgel kellene haladnia, hogy 3 óra alatt megtegye?',
        options: ['120 km/h', '110 km/h', '100 km/h', '135 km/h'],
        correctAnswer: 0,
        hint: 'A távolság s = 90 · 4 = 360 km. Mekkora sebességgel kell menni 3 órán át: v = s / t ?',
        explanation: 'Az út hossza: s = 90 km/h · 4 h = 360 km. A szükséges új sebesség: v = 360 km / 3 h = 120 km/h.'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Aránypár Megoldása',
        question: 'Oldd meg a következő aránypárt: 8 : x = 24 : 33 !',
        options: ['11', '12', '9', '14'],
        correctAnswer: 0,
        hint: '24 · x = 8 · 33 = 264. Oszd el 24-gyel!',
        explanation: 'Keresztszorzattal: 24 · x = 8 · 33 ⟹ 24x = 264 ⟹ x = 11.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Térkép Méretarány',
        question: 'Egy 1 : 25 000 méretarányú térképen két falu távolsága 6 cm. Hány kilométer a valóságban a távolságuk légvonalban?',
        options: ['1,5 km', '15 km', '0,15 km', '2,5 km'],
        correctAnswer: 0,
        hint: '6 cm · 25 000 = 150 000 cm. Váltsd át méterbe (oszdd 100-zal), majd km-be (oszdd 1000-rel)!',
        explanation: 'Valódi hossz: 6 cm · 25 000 = 150 000 cm = 1500 m = 1,5 km.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Medence Feltöltése',
        question: '4 egyforma kerti csap 9 óra alatt tölt fel egy medencét. Hány óra alatt töltené fel ugyanezt a medencét 6 ilyen csap?',
        options: ['6 óra', '13,5 óra', '7 óra', '5 óra'],
        correctAnswer: 0,
        hint: 'Fordított arányosság: 4 · 9 = 36 csapóra összesen. Ezt oszd el a 6 csappal!',
        explanation: 'A medence feltöltéséhez 4 · 9 = 36 csapóra munka kell. 6 csappal ez 36 / 6 = 6 óra alatt kész.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Recept Arányosítás',
        question: 'Egy palacsintatészta receptje 4 adaghoz 30 dkg lisztet ír elő. Mennyi liszt szükséges 10 adag elkészítéséhez?',
        options: ['75 dkg', '70 dkg', '80 dkg', '60 dkg'],
        correctAnswer: 0,
        hint: '1 adaghoz 30 / 4 = 7,5 dkg liszt kell. Mennyi kell 10 adaghoz?',
        explanation: 'Egyenes arányosság: 1 adag lisztigénye 30 / 4 = 7,5 dkg. 10 adaghoz 10 · 7,5 = 75 dkg liszt kell.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Nem Arányos Csapda',
        question: 'Az alábbiak közül melyik függvény NEM ír le egyenes arányosságot?',
        options: ['y = 300x + 500', 'y = 4x', 'y = 0,5x', 'y = 12x'],
        correctAnswer: 0,
        hint: 'Nézd meg, melyik függvény grafikonja nem megy át az origón (0; 0)!',
        explanation: 'Az y = 300x + 500 esetén x = 0-nál y = 500 (nem 0!), és a hányados y/x sem állandó. Ez lineáris függvény, de NEM egyenes arányosság.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Fordított Arányosság Szorzata',
        question: 'Ha x és y fordítottan arányos, és x = 4 esetén y = 9, mennyi y értéke, ha x = 6?',
        options: ['6', '13,5', '5,4', '7'],
        correctAnswer: 0,
        hint: 'A szorzat k = 4 · 9 = 36. Mennyi 36 / 6 ?',
        explanation: 'Fordított arányosságnál a szorzat állandó: k = 4 · 9 = 36. Így x = 6 esetén: y = 36 / 6 = 6.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Érettségi Típusfeladatok (Nehéz)',
    subtitle: 'Fogaskerekek, származtatott mértékegységek, összetett arányok és algebrai aránypárok.',
    range: '21 - 30. feladat',
    focus: 'Érettségi és Összetett Feladatok',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Fogaskerék Áttétel',
        question: 'Egy fogaskerék-áttételben a meghajtó kerék fogszáma z₁ = 18, és fordulatszáma n₁ = 100 fordulat/perc. A hajtott kerék z₂ = 30 fogú. Mennyi a hajtott kerék fordulatszáma (n₂)?',
        options: ['60 fordulat/perc', '166,7 fordulat/perc', '150 fordulat/perc', '45 fordulat/perc'],
        correctAnswer: 0,
        hint: 'A fogaskerekeknél a fogszám és a fordulatszám fordítottan arányos: z₁ · n₁ = z₂ · n₂ !',
        explanation: 'Fordított arányosság: z₁ · n₁ = z₂ · n₂ ⟹ 18 · 100 = 30 · n₂ ⟹ 1800 = 30 · n₂ ⟹ n₂ = 60 fordulat/perc.'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Üzemanyag-fogyasztás',
        question: 'Egy gépkocsi átlagfogyasztása 6,5 liter benzin 100 km-en. Hány liter üzemanyag fogy el egy 460 km-es utazás során?',
        options: ['29,9 liter', '32,5 liter', '28,4 liter', '30,0 liter'],
        correctAnswer: 0,
        hint: '1 km-re 6,5 / 100 = 0,065 liter kell. Mennyi kell 460 km-re?',
        explanation: 'Egyenes arányosság: 460 · (6,5 / 100) = 460 · 0,065 = 29,9 liter.'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Téglalap Geometria',
        question: 'Egy téglalap területe állandó: T = 72 cm². Ha az egyik oldalát a 3-szorosára növeljük, hogyan kell megváltoztatni a másik oldalát, hogy a terület ne változzon?',
        options: [
          'A harmadára (1/3-ára) kell csökkenteni',
          'A 3-szorosára kell növelni',
          '3 cm-rel kell csökkenteni',
          '6 cm-re kell beállítani'
        ],
        correctAnswer: 0,
        hint: 'T = a · b = 72 cm² (szorzat állandó). Ha az egyik oldal 3a lesz, a másiknak b/3-nak kell lennie!',
        explanation: 'Mivel a terület a két oldal szorzata (a · b = 72), a két oldal fordítottan arányos: ha az egyik 3-szorosára nő, a másik a harmadára csökken.'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Összetett Munkafeladat',
        question: '6 traktor 4 nap alatt szánt fel egy szántóföldet napi 8 óra munkával. Hány nap alatt szántaná fel ugyanezt a területet 8 traktor napi 6 óra munkával?',
        options: ['4 nap', '3 nap', '5 nap', '6 nap'],
        correctAnswer: 0,
        hint: 'Számold ki az összes gépórát: 6 · 4 · 8 = 192 traktoróra. A másik csapat naponta 8 · 6 = 48 órát teljesít. Hány nap kell?',
        explanation: 'Összes munkaóra: 6 · 4 · 8 = 192 traktoróra. Az új felállásban naponta 8 · 6 = 48 traktoróra teljesül. Napok száma: 192 / 48 = 4 nap.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Mértékegység Átváltás',
        question: 'Egy kerékpáros 18 km/h sebességgel 35 perc alatt ér célba. Hány perc alatt tenné meg ugyanezt az utat 21 km/h sebességgel?',
        options: ['30 perc', '40,8 perc', '25 perc', '32 perc'],
        correctAnswer: 0,
        hint: 'Fordított arányosság: sebesség · idő = állandó út. 18 · 35 = 21 · t_új !',
        explanation: 'Fordított arányosság miatt nem is szükséges órára váltani: 18 km/h · 35 perc = 21 km/h · t ⟹ 630 = 21t ⟹ t = 30 perc.'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Aránypár Szöveges Feladat',
        question: 'Két szám aránya 3 : 5. Ha a kisebbik szám 42, mennyi a nagyobbik szám?',
        options: ['70', '65', '84', '75'],
        correctAnswer: 0,
        hint: '3 egység felel meg a 42-nek. Mennyi 1 egység: 42 : 3 = ? Mennyi 5 egység?',
        explanation: '3 egység = 42 ⟹ 1 egység = 14. A nagyobbik szám: 5 egység = 5 · 14 = 70.'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Algebrai Aránypár',
        question: 'Melyik x érték elégíti ki a következő aránypárt: (x + 2) : 10 = 9 : 15 ?',
        options: ['4', '6', '8', '3'],
        correctAnswer: 0,
        hint: 'Keresztszorzat: 15 · (x + 2) = 10 · 9 = 90. Oszd el 15-tel, majd vonj ki 2-t!',
        explanation: 'Keresztszorzattal: 15 · (x + 2) = 90 ⟹ x + 2 = 6 ⟹ x = 4.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Fénymásoló Sebesség',
        question: 'Egy nagy teljesítményű irodai nyomtató 40 másodperc alatt 24 oldalt nyomtat ki. Hány másodpercre van szüksége 90 oldal kinyomtatásához?',
        options: ['150 másodperc (2,5 perc)', '120 másodperc', '180 másodperc', '135 másodperc'],
        correctAnswer: 0,
        hint: '1 oldal nyomtatási ideje: 40 / 24 = 5/3 másodperc. Ezt szorozd meg 90-nel!',
        explanation: 'Egyenes arányosság: 1 oldal nyomtatási ideje 40/24 = 5/3 másodperc. 90 oldal esetén: 90 · (5/3) = 150 másodperc (azaz 2 perc 30 másodperc).'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Átfolyási Sebesség',
        question: 'Egy 120 literes hordót egy kerti tömlő 15 perc alatt tölt meg teljesen. Hány liter víz folyik a hordóba 6 perc alatt?',
        options: ['48 liter', '50 liter', '45 liter', '60 liter'],
        correctAnswer: 0,
        hint: 'Percenként hány liter folyik: 120 / 15 = ? Mennyi folyik 6 perc alatt?',
        explanation: 'A tömlő vízhozama: 120 liter / 15 perc = 8 liter/perc. 6 perc alatt: 6 · 8 = 48 liter víz folyik a hordóba.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Érettségi Elméleti Állítás',
        question: 'Melyik állítás IGAZ matematikailag az alábbiak közül?',
        options: [
          'Fordított arányosság esetén az összetartozó értékek szorzata állandó, és grafikonja hiperbola.',
          'Egyenes arányosságnál az összetartozó értékek szorzata állandó.',
          'Ha két mennyiség egyszerre növekszik, az automatikusan egyenes arányosságot jelent.',
          'Fordított arányosság esetén ha az egyik változó nő, a másik is szükségképpen nő.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a definíciókra: egyenes arányosságnál a HÁNYADOS, fordított arányosságnál a SZORZAT állandó.',
        explanation: 'Az egyetlen helyes állítás: a fordított arányosság definíciója x · y = k (állandó szorzat), és a grafikonja hiperbola. Az egyidejű növekedés önmagában nem garantál egyenes arányosságot (pl. y = x + 10 vagy y = x²).'
      }
    ]
  }
};

const proportionalityCheatSheets: CheatSheetCard[] = [
  {
    title: 'Egyenes Arányosság (y = k · x)',
    items: [
      'Definíció: Két mennyiség hányadosa állandó: y / x = k',
      'Arányossági tényező: k megmutatja az 1 egységre jutó értéket',
      'Változás: Ha x n-szeresére nő, y is n-szeresére nő',
      'Grafikon: Az origón (0; 0) átmenő egyenes / félegyenes'
    ]
  },
  {
    title: 'Fordított Arányosság (x · y = k)',
    items: [
      'Definíció: Két mennyiség szorzata állandó: x · y = k (y = k / x)',
      'Változás: Ha x n-szeresére nő, y az n-ed részére csökken',
      'Grafikon: Hiperbola görbe az I. síknegyedben',
      'Geometriai jelentés: A görbe alatti téglalapok területe azonos'
    ]
  },
  {
    title: 'Aránypárok és Keresztszorzat',
    items: [
      'Aránypár: a : b = c : d  (vagy a/b = c/d)',
      'Külső tagok: a és d  |  Belső tagok: b és c',
      'Alaptétel: a · d = b · c (keresztszorzat egyenlősége)',
      'Ismeretlen tag: x = (b · c) / a'
    ]
  },
  {
    title: 'Hármasszabály Módszere',
    items: [
      '1. Lépés: Írd fel az összetartozó párokat egymás mellé',
      '2. Lépés: Következtess az egységre (1 darabra, 1 kg-ra, 1 órára)',
      'Egyenesnél: mindkét oldalon ugyanazzal a számmal osztunk, majd szorzunk',
      'Fordítottnál: bal oldalon osztunk, jobb oldalon szorzunk (ellentétes műveletek)'
    ]
  }
];

export const ProportionalityQuiz: React.FC<ProportionalityQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Arányosság Gyakorló Kvíz"
      subtitle="Egyenes és fordított arányosság, aránypárok és hármasszabály 30 válogatott feladatban"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 📈 GYAKORLÓ KVÍZ"
      emoji="📈"
      themeColor="emerald"
      levelConfigs={quizLevels}
      cheatSheetCards={proportionalityCheatSheets}
      cheatSheetTitle="Arányosság és Hármasszabály Segédlet"
      defaultLevel={1}
      grade={9}
      chapterId="szamok-vilaga"
      topicId="g9-szamok-aranyossag-quiz"
      topicTitle="Arányosság"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd az arányossági fogalmakat, helyzeteket és számításokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <ProportionalityMatcher
              key={`prop-matcher-${level}`}
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
          subtitle: 'Kategorizáld a helyzeteket, egyenleteket és állításokat!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <ProportionalitySorter
              key={`prop-sorter-${level}`}
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

export default ProportionalityQuiz;
