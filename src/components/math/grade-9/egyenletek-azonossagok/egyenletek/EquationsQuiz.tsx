import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { EquationsMatcher } from './EquationsMatcher';
import { EquationsSorter } from './EquationsSorter';
import {
  EquationBalanceSvg,
  EquationVsIdentitySvg,
  RootVerificationSvg,
  GraphicalSolutionSvg
} from './EquationsFigures';
import { ArrowRightLeft, LayoutGrid, Scale, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

interface EquationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Mérlegelv és Alapfogalmak (Könnyű)',
    subtitle: 'Egyszerű lineáris egyenletek, a mérlegelv és az ismeretlen alapvető tulajdonságai.',
    range: '1 - 10. feladat',
    focus: 'Mérlegelv és Lineáris Egyenletek',
    questions: [
      {
        id: 'eq1-1',
        questionTypeBadge: 'A Mérlegelv Fogalma',
        question: 'Mit mond ki a kétkarú mérlegelv az egyenletmegoldás során?',
        figure: <EquationBalanceSvg size={170} />,
        options: [
          'Az egyenlet mindkét oldalán ugyanazt a megengedett műveletet kell elvégezni',
          'Csak a bal oldalból szabad kivonni számokat',
          'A bal oldalnak mindig nagyobbnak kell lennie, mint a jobb oldalnak',
          'Mindkét oldalt tetszőleges számmal beszorozhatjuk, akár 0-val is'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a fizikai mérlegre: ha mindkét tálcára ugyanakkora súlyt teszel vagy veszel le, az egyensúly megmarad.',
        explanation: 'A mérlegelv értelmében az egyenlőség akkor marad fenn, ha mindkét oldalon ugyanazt a műveletet hajtjuk végre (nem 0-val szorozva/osztva).'
      },
      {
        id: 'eq1-2',
        questionTypeBadge: 'Egyszerű Egyenlet',
        question: 'Mi a 2x + 5 = 17 egyenlet gyöke a valós számok halmazán?',
        options: ['x = 6', 'x = 11', 'x = 8', 'x = 5'],
        correctAnswer: 0,
        hint: '1. lépés: vonj ki 5-öt mindkét oldalból: 2x = 12. 2. lépés: ossz 2-vel.',
        explanation: '2x + 5 = 17 → 2x = 12 → x = 6. Ellenőrzés: 2·6 + 5 = 12 + 5 = 17.'
      },
      {
        id: 'eq1-3',
        questionTypeBadge: 'Kivonásos Egyenlet',
        question: 'Mi az 5x - 8 = 22 egyenlet megoldása?',
        options: ['x = 6', 'x = 4', 'x = 5', 'x = 7'],
        correctAnswer: 0,
        hint: 'Adj hozzá 8-at mindkét oldalhoz: 5x = 30.',
        explanation: '5x - 8 = 22 → 5x = 30 → x = 6.'
      },
      {
        id: 'eq1-4',
        questionTypeBadge: 'Mérlegelvi Lépés',
        question: 'Melyik a legcélszerűbb első ekvivalens lépés a 3x + 7 = 19 egyenlet megoldásakor?',
        options: [
          'Mindkét oldalból kivonunk 7-et',
          'Mindkét oldalt elosztjuk 3-mal',
          'Mindkét oldalhoz hozzáadunk 7-et',
          'Kivonunk 19-et a jobb oldalból, a bal oldalt békén hagyjuk'
        ],
        correctAnswer: 0,
        hint: 'Célunk az x-es tag izolálása (egyedül hagyása).',
        explanation: 'A konstans tag eltávolításához mindkét oldalból kivonunk 7-et: 3x = 12.'
      },
      {
        id: 'eq1-5',
        questionTypeBadge: 'Negatív Együttható',
        question: 'Mi a megoldása a -4x = 20 egyenletnek?',
        options: ['x = -5', 'x = 5', 'x = -16', 'x = 24'],
        correctAnswer: 0,
        hint: 'Oszd mindkét oldalt (-4)-gyel! Pozitív szám osztva negatívval negatív lesz.',
        explanation: '-4x = 20 → x = 20 / (-4) = -5.'
      },
      {
        id: 'eq1-6',
        questionTypeBadge: 'Fogalommeghatározás',
        question: 'Mit nevezünk ismeretlennek egy egyenletben?',
        options: [
          'Azt a betűvel jelölt változót, amelynek a keresett értéke kielégíti az egyenlőséget',
          'A koordináta-rendszer origóját',
          'A feladatban szereplő legnagyobb számot',
          'Azt az egyenletet, aminek egyáltalán nincs megoldása'
        ],
        correctAnswer: 0,
        hint: 'Leggyakrabban x vagy y betűvel jelöljük.',
        explanation: 'Az ismeretlen az a változó (betű), amelynek azon konkrét értékeit keressük, amelyekre az egyenlőség igaz.'
      },
      {
        id: 'eq1-7',
        questionTypeBadge: 'Osztást Tartalmazó Egyenlet',
        question: 'Mi az x / 3 = 7 egyenlet megoldása?',
        options: ['x = 21', 'x = 10', 'x = 4', 'x = 7/3'],
        correctAnswer: 0,
        hint: 'A 3-mal való osztás ellentétes művelete a 3-mal való szorzás.',
        explanation: 'x / 3 = 7 → mindkét oldalt szorozzuk 3-mal → x = 21.'
      },
      {
        id: 'eq1-8',
        questionTypeBadge: 'Alaphalmaz Alapszabály',
        question: 'Ha a feladat szövege külön nem határozza meg az alaphalmazt (A), mit tekintünk annak alapértelmezetten?',
        options: [
          'A valós számok halmazát (ℝ)',
          'A természetes számok halmazát (ℕ)',
          'Csak a pozitív egész számokat (ℤ⁺)',
          'Az üres halmazt (∅)'
        ],
        correctAnswer: 0,
        hint: 'A középiskolában a lehető legbővebb valós számkört tekintjük alapnak.',
        explanation: 'Alapértelmezés szerint, ha a feladat másként nem rendelkezik, az alaphalmaz a valós számok halmaza: A = ℝ.'
      },
      {
        id: 'eq1-9',
        questionTypeBadge: 'Nulla Eredmény',
        question: 'Mi a 6x = 0 egyenlet gyöke a valós számok halmazán?',
        options: ['x = 0', 'Nincs megoldás', 'x = 6', 'Végtelen sok megoldás'],
        correctAnswer: 0,
        hint: '0 osztva 6-tal mennyi?',
        explanation: '6x = 0 → x = 0 / 6 = 0. A 0 teljesen szabályos, érvényes gyök!'
      },
      {
        id: 'eq1-10',
        questionTypeBadge: 'Lineáris Egyenlet',
        question: 'Mennyi a gyöke a 8 - 2x = 2 egyenletnek?',
        options: ['x = 3', 'x = 5', 'x = -3', 'x = 2'],
        correctAnswer: 0,
        hint: '8-ból mennyit kell kivonni, hogy 2-t kapjunk? 2x-nek 6-nak kell lennie.',
        explanation: '8 - 2x = 2 → -2x = -6 → x = 3. Ellenőrzés: 8 - 2·3 = 8 - 6 = 2.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egyenlet, Azonosság és Ellenőrzés (Közepes)',
    subtitle: 'Azonosságok, ellentmondások megkülönböztetése és a szigorú kétoldalas ellenőrzés.',
    range: '11 - 20. feladat',
    focus: 'Azonosság, Ellentmondás és Ellenőrzés',
    questions: [
      {
        id: 'eq2-1',
        questionTypeBadge: 'Azonosság Felismerése',
        question: 'Hány megoldása van a 3(x + 2) = 3x + 6 egyenlőségnek az alaphalmazon (A = ℝ)?',
        figure: <EquationVsIdentitySvg size={170} />,
        options: [
          'Végtelen sok megoldása van (minden valós szám, M = ℝ)',
          'Pontosan egy megoldása van (x = 2)',
          'Nincs megoldása (M = ∅)',
          'Csak az x = 0 megoldása'
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel a zárójelet a bal oldalon: 3·x + 3·2 = 3x + 6.',
        explanation: 'Mivel a bal oldal zárójelbontás után teljesen megegyezik a jobb oldallal (3x + 6 = 3x + 6), ez egy azonosság: M = ℝ.'
      },
      {
        id: 'eq2-2',
        questionTypeBadge: 'Ellentmondás Felismerése',
        question: 'Mi a megoldáshalmaza a 2x + 1 = 2x + 5 egyenletnek?',
        options: [
          'M = ∅ (nincs megoldás, ellentmondás)',
          'M = {4}',
          'M = ℝ (minden szám)',
          'x = 0'
        ],
        correctAnswer: 0,
        hint: 'Vonj ki 2x-et mindkét oldalból: 1 = 5 marad, ami lehetetlen!',
        explanation: '2x kivonása után 1 = 5 adódik, ami soha nem teljesülhet semmilyen x-re sem. Ezért M = ∅.'
      },
      {
        id: 'eq2-3',
        questionTypeBadge: 'Szabályos Ellenőrzés',
        question: 'Hogyan kell elvégezni a kapott gyök szigorú ellenőrzését?',
        figure: <RootVerificationSvg size={170} />,
        options: [
          'A gyököt külön behelyettesítjük az EREDETI bal és jobb oldalba, majd összehasonlítjuk az értékeket',
          'Csak a levezetés utolsó előtti sorába helyettesítünk vissza',
          'Kivonjuk a kapott gyököt a feladat számából',
          'Ha a levezetés hibátlannak tűnik, az ellenőrzést teljesen el szabad hagyni'
        ],
        correctAnswer: 0,
        hint: 'Mindig az eredeti, kiinduló egyenlet mindkét oldalába kell külön behelyettesíteni!',
        explanation: 'A szabályos ellenőrzésnél a B(x₀) és J(x₀) helyettesítési értékeket egymástól függetlenül számoljuk ki az eredeti egyenletből.'
      },
      {
        id: 'eq2-4',
        questionTypeBadge: 'Ellenőrzés Kiértékelése',
        question: 'Egyenlet ellenőrzésekor x = 2 behelyettesítésével azt kapjuk, hogy Bal oldal = 10, Jobb oldal = 10. Mit vonhatunk le ebből?',
        options: [
          'Az x = 2 valódi gyöke az egyenletnek, mert B(2) = J(2)',
          'Az egyenlet azonosság, mert az értékek megegyeznek',
          'Hibát követtünk el, mert az értéknek 0-nak kellene lennie',
          'Az egyenlet ellentmondásos'
        ],
        correctAnswer: 0,
        hint: 'Ha B(x) = J(x), akkor az egyenlőség teljesül.',
        explanation: 'Mivel a bal és jobb oldal helyettesítési értéke azonos (10 = 10), az x = 2 kielégíti az egyenletet, tehát valódi gyök.'
      },
      {
        id: 'eq2-5',
        questionTypeBadge: '0-val Szorzott Ismeretlen',
        question: 'Mi a megoldáshalmaza a 0 · x = 7 egyenletnek a valós számok halmazán?',
        options: ['M = ∅ (nincs megoldás)', 'x = 0', 'x = 7', 'M = ℝ'],
        correctAnswer: 0,
        hint: 'Bármilyen valós számot szorzunk 0-val, az eredmény mindig 0 lesz, sosem 7.',
        explanation: '0 · x mindig 0 minden valós x-re. A 0 = 7 egyenlőség lehetetlen, így M = ∅.'
      },
      {
        id: 'eq2-6',
        questionTypeBadge: '0 = 0 Eset',
        question: 'Mi a megoldáshalmaza a 0 · x = 0 egyenletnek?',
        options: ['M = ℝ (minden valós szám)', 'M = ∅', 'Csak x = 0', 'x = 1'],
        correctAnswer: 0,
        hint: 'Bármilyen számot szorozva 0-val nullát kapunk: 0 = 0 mindig igaz!',
        explanation: 'Mivel 0 · x = 0 minden valós számra teljesül, a megoldáshalmaz a teljes valós számok halmaza: M = ℝ.'
      },
      {
        id: 'eq2-7',
        questionTypeBadge: 'Zárójeles Egyenlet',
        question: 'Mi a megoldása a 2(x - 3) + 4 = 12 egyenletnek?',
        options: ['x = 7', 'x = 5', 'x = 8', 'x = 6'],
        correctAnswer: 0,
        hint: '2x - 6 + 4 = 12 → 2x - 2 = 12.',
        explanation: '2(x - 3) + 4 = 12 → 2x - 6 + 4 = 12 → 2x - 2 = 12 → 2x = 14 → x = 7.'
      },
      {
        id: 'eq2-8',
        questionTypeBadge: 'Gyök Tesztelése',
        question: 'Megoldása-e az x = -3 a 2x + 10 = 4 egyenletnek?',
        options: [
          'Igen, mert 2·(-3) + 10 = -6 + 10 = 4',
          'Nem, mert a végeredmény negatív',
          'Nem, mert a jobb oldal nem egyezik',
          'Csak akkor, ha az alaphalmaz a negatív számok'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be: 2 · (-3) = -6; -6 + 10 = 4.',
        explanation: 'B(-3) = 2(-3) + 10 = 4, ami megegyezik a jobb oldallal (4 = 4), így x = -3 valóban gyök.'
      },
      {
        id: 'eq2-9',
        questionTypeBadge: 'Azonosság Kifejezés',
        question: 'Melyik egyenlőség AZONOSSÁG az alábbiak közül?',
        options: [
          '(x + 2)² = x² + 4x + 4',
          'x + 2 = 5',
          '3x - 1 = 2x + 4',
          'x + 4 = x + 7'
        ],
        correctAnswer: 0,
        hint: 'Keresd a nevezetes szorzat azonosságot, ami minden x-re igaz!',
        explanation: 'Az (x + 2)² = x² + 4x + 4 a kéttagú összeg négyzetének nevezetes azonossága, amely minden valós számra azonosan igaz.'
      },
      {
        id: 'eq2-10',
        questionTypeBadge: 'Levezetés Végeredménye',
        question: 'Egy diák helyesen végez ekvivalens átalakításokat, és az utolsó sorban a 4 = 9 egyenlőséghez jut. Mi a feladat végkövetkeztetése?',
        options: [
          'Ellentmondásra jutottunk, ezért az egyenletnek nincs megoldása: M = ∅',
          'A megoldás x = 4 vagy x = 9',
          'A megoldás x = 5 (a kettő különbsége)',
          'Minden valós szám megoldás'
        ],
        correctAnswer: 0,
        hint: 'A 4 soha nem egyenlő 9-cel. Ha az ismeretlen kiesett és hamis állítás maradt, nincs gyök.',
        explanation: 'Ha az egyenlet átalakításakor az ismeretlenek kiejtik egymást, és egy hamis számazonosság (pl. 4 = 9) marad, akkor az egyenlet ellentmondásos, M = ∅.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Grafikus Megoldás, Alaphalmaz és Csapdák (Nehéz)',
    subtitle: 'Függvénygrafikonok metszéspontja, alaphalmaz szerinti kizárások és a 0-val való osztás csapdája.',
    range: '21 - 30. feladat',
    focus: 'Grafikus Megoldás és Emelt Szintű Szabályok',
    questions: [
      {
        id: 'eq3-1',
        questionTypeBadge: 'Grafikus Megoldás',
        question: 'A koordináta-rendszerben az f(x) = 2x - 1 és g(x) = -x + 5 egyenesek metszéspontja M(2; 3). Mi a 2x - 1 = -x + 5 egyenlet megoldása?',
        figure: <GraphicalSolutionSvg size={170} />,
        options: [
          'x = 2 (a metszéspont első koordinátája)',
          'y = 3 (a metszéspont második koordinátája)',
          'x = 5 (a két koordináta összege)',
          'Nincs megoldás'
        ],
        correctAnswer: 0,
        hint: 'Az egyenletben x az ismeretlen! A metszéspont melyik koordinátája felel meg az x-nek?',
        explanation: 'Az egyenlet ismeretlene az x, ezért a grafikus megoldás a grafikonok metszéspontjának x koordinátája: x = 2. (Az y = 3 a két oldal közös helyettesítési értéke).'
      },
      {
        id: 'eq3-2',
        questionTypeBadge: 'Párhuzamos Egyenesek',
        question: 'Ha az f(x) és g(x) lineáris függvények grafikonjai párhuzamosak és nem esnek egybe, mit mondhatunk az f(x) = g(x) egyenletről?',
        options: [
          'Nincs közös pontjuk, így az egyenletnek nincs megoldása (M = ∅)',
          'Végtelen sok megoldásuk van',
          'Pontosan az origóban van megoldás',
          'A megoldás a meredekségükkel egyenlő'
        ],
        correctAnswer: 0,
        hint: 'A metszéspontok száma megegyezik a gyökök számával. Ha a vonalak sosem metszik egymást, hány metszéspont van?',
        explanation: 'Két párhuzamos egyenes sehol sem metszi egymást, így a két oldal értéke semmilyen x-re nem egyezhet meg: M = ∅.'
      },
      {
        id: 'eq3-3',
        questionTypeBadge: 'Alaphalmaz Szűkítése',
        question: 'Mi a 2x = 5 egyenlet megoldáshalmaza, ha az alaphalmaz az egész számok halmaza (A = ℤ)?',
        options: [
          'M = ∅ (üres halmaz)',
          'M = {2.5}',
          'M = {2}',
          'M = {3}'
        ],
        correctAnswer: 0,
        hint: '2x = 5 megoldása x = 2.5. De benne van a 2.5 a ℤ halmazban?',
        explanation: 'x = 2.5 nem egész szám (2.5 ∉ ℤ). Mivel az alaphalmazon kívül esik, a megoldáshalmaz üres: M = ∅.'
      },
      {
        id: 'eq3-4',
        questionTypeBadge: 'Szorzatalakú Egyenlet',
        question: 'Melyek a (x - 3)(x + 4) = 0 egyenlet gyökei a valós számok halmazán?',
        options: [
          'x₁ = 3 és x₂ = -4',
          'x₁ = -3 és x₂ = 4',
          'Csak x = 3',
          'x = 12'
        ],
        correctAnswer: 0,
        hint: 'Egy szorzat akkor és csak akkor 0, ha valamelyik tényezője 0.',
        explanation: 'x - 3 = 0 → x₁ = 3;  x + 4 = 0 → x₂ = -4. Mindkét érték valós gyök.'
      },
      {
        id: 'eq3-5',
        questionTypeBadge: 'Gyökvesztés Veszélye',
        question: 'Egy diák az x² = 5x egyenlet mindkét oldalát elosztja x-szel, így x = 5-öt kap. Mi a hiba ebben a lépésben?',
        options: [
          'Ismeretlennel való osztás miatt elvesztette az x = 0 gyököt',
          'Az x²-ből osztás után x² marad',
          'Nincs hiba, az egyetlen gyök az x = 5',
          'Az 5x-et nem szabad elosztani x-szel'
        ],
        correctAnswer: 0,
        hint: 'Nullával nem szabad osztani! Ha x = 0, a 0-val való osztás tiltott művelet lett volna.',
        explanation: 'Az x² - 5x = 0 → x(x - 5) = 0 szorzattá alakítással látszik, hogy x₁ = 0 és x₂ = 5. Az x-szel való osztás elveszíti a 0 gyököt!'
      },
      {
        id: 'eq3-6',
        questionTypeBadge: 'Kikötés Törtes Egyenletnél',
        question: 'Mi a kötelező kikötés az 5 / (x - 4) = 1 egyenlet megoldása előtt?',
        options: ['x ≠ 4', 'x ≠ 0', 'x ≠ 5', 'x > 0'],
        correctAnswer: 0,
        hint: 'A tört nevezője soha nem lehet 0! x - 4 = 0 mikor lenne?',
        explanation: 'Mivel 0-val való osztás nincs értelmezve a valós számokon, x - 4 ≠ 0, azaz x ≠ 4.'
      },
      {
        id: 'eq3-7',
        questionTypeBadge: 'Törtes Egyenlet Megoldása',
        question: 'Mennyi az (x + 2) / 3 = (x - 1) / 2 egyenlet gyöke?',
        options: ['x = 7', 'x = 5', 'x = 1', 'x = -7'],
        correctAnswer: 0,
        hint: 'Szorozz be a közös nevezővel (6-tal) vagy alkalmazz keresztszorzást: 2(x + 2) = 3(x - 1).',
        explanation: '2(x + 2) = 3(x - 1) → 2x + 4 = 3x - 3 → 4 + 3 = 3x - 2x → x = 7.'
      },
      {
        id: 'eq3-8',
        questionTypeBadge: 'Másodfokú Tiszta Egyenlet',
        question: 'Hány valós gyöke van az x² = 16 egyenletnek?',
        options: [
          'Kettő: x₁ = 4 és x₂ = -4',
          'Csak egy: x = 4',
          'Nincs valós megoldása',
          'Négy gyöke van'
        ],
        correctAnswer: 0,
        hint: '(-4)² mennyi? (-4) · (-4) = +16 is!',
        explanation: 'Mind a +4, mind a -4 négyzete 16, így a megoldáshalmaz: M = {-4, 4}.'
      },
      {
        id: 'eq3-9',
        questionTypeBadge: 'Grafikus Egybeesés',
        question: 'Grafikus egyenletmegoldáskor mit jelent, ha az f(x) és g(x) függvények egyenesei teljesen fedik egymást (egybeesnek)?',
        options: [
          'Minden pontjuk közös, így végtelen sok megoldás van (azonosság)',
          'Nincs megoldás, mert nem metszik egymást pontszerűen',
          'Csak egyetlen közös gyök van',
          'A megoldás x = 0'
        ],
        correctAnswer: 0,
        hint: 'Ha minden pont közös, minden x érték kielégíti az egyenlőséget.',
        explanation: 'Az egybeeső egyenesek minden pontja közös metszéspont, vagyis a két oldal minden x-re egyenlő: az egyenlőség azonosság.'
      },
      {
        id: 'eq3-10',
        questionTypeBadge: 'Ellenőrzés Alapelve',
        question: 'Miért kötelező a gyököt mindig a legelső (eredeti) egyenletbe helyettesíteni az ellenőrzéskor?',
        options: [
          'Mert ha a levezetés során hibáztunk vagy hamis gyököt kaptunk, csak az eredeti alak buktatja le',
          'Mert az átalakított egyenletbe nem lehet számokat helyettesíteni',
          'Mert a tanár csak így fogadja el, matematikai oka nincs',
          'Mert a jobb oldal értéke egyébként mindig nulla lenne'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, mi van, ha a 2. sorban elírtál egy előjelet.',
        explanation: 'Ha egy hibás levezetési lépésbe helyettesítünk be, a hibás gyök abba a hibás alakba illeszkedni fog! Csak az eredeti feladatba való visszahelyettesítés garantálja a valódi ellenőrzést.'
      }
    ]
  }
};

const cheatSheetData: CheatSheetCard[] = [
  {
    title: '1. A Mérlegelv és Alaphalmaz',
    badge: 'Mérlegelv alapjai',
    points: [
      'Mindkét oldalhoz ugyanazt adhatjuk hozzá, vonhatjuk ki, szorozhatjuk vagy oszthatjuk (kivéve a 0-val való szorzást és osztást).',
      'Alaphalmaz (A): ahonnan az ismeretlen értékeit meríthetjük (alapértelmezetten A = ℝ).',
      'Megoldáshalmaz (M): azok az alaphalmazbeli értékek, amelyekre az egyenlőség igaz.'
    ]
  },
  {
    title: '2. Egyenlet, Azonosság, Ellentmondás',
    badge: 'Kategóriák',
    points: [
      'Egyenlet: csak bizonyos értékekre igaz (pl. 2x = 6 → M = {3}).',
      'Azonosság: az alaphalmaz minden elemére azonosan igaz (pl. 2(x+1) = 2x + 2 → M = ℝ).',
      'Ellentmondás: semmilyen valós számra sem teljesül (pl. x = x + 4 → M = ∅).'
    ]
  },
  {
    title: '3. A Szigorú Ellenőrzés',
    badge: 'Bal oldal vs. Jobb oldal',
    points: [
      '1. Számítsd ki a bal oldal helyettesítési értékét az EREDETI egyenletben: B(x₀).',
      '2. Külön számítsd ki a jobb oldal helyettesítési értékét: J(x₀).',
      '3. Hasonlítsd össze őket: ha B(x₀) = J(x₀), akkor a kapott szám valóban gyök!'
    ]
  },
  {
    title: '4. Grafikus Megoldás & Csapdák',
    badge: 'Grafikonok és Kikötések',
    points: [
      'Grafikus megoldásnál a két oldal f(x) és g(x) grafikonjának metszéspontját keressük: a gyök a metszéspont x koordinátája!',
      'Párhuzamos egyenesek: M = ∅; Egybeeső egyenesek: M = ℝ.',
      'Soha ne osszunk ismeretlennel meggondolatlanul (pl. x² = 5x esetén), mert gyökvesztéshez vezet!'
    ]
  }
];

export const EquationsQuiz: React.FC<EquationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Egyenletek – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten a mérlegelv, egyenlet, azonosság, ellenőrzés és grafikus megoldás témaköréből"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 5. TÉMAKÖR"
      themeColor="emerald"
      storageKey="grade9-equations-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-alap-quiz"
      topicTitle="Egyenletek"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd az egyenleteket a gyökeikkel és megoldáshalmazukkal!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <EquationsMatcher
              key={`equations-matcher-${level}`}
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
          subtitle: 'Kategorizáld az egyenlőségeket megoldások száma, gyök előjele és behelyettesítés szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <EquationsSorter
              key={`equations-sorter-${level}`}
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

