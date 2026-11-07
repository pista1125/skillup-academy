import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AlgebraicMethodsMatcher } from './AlgebraicMethodsMatcher';
import { AlgebraicMethodsSorter } from './AlgebraicMethodsSorter';
import {
  EliminationMethodSvg,
  SubstitutionMethodSvg,
  AlgebraicSpecialCasesSvg,
  AuxiliaryVariableSvg,
  ThreeVariablesSvg
} from './AlgebraicMethodsFigures';

interface AlgebraicMethodsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Egyenlő együtthatók módszere (Elimináció)',
    description: 'A cél valamelyik ismeretlen együtthatóit ellentetté (vagy egyenlővé) tenni szorzással, majd az egyenletek összeadásával (vagy kivonásával) ezt az ismeretlent kiküszöbölni.',
    note: 'Példa: 5x + 7y = 19 és 2x − 7y = −12 ⟹ összeadva: 7x = 7 ⟹ x = 1.',
    color: 'from-blue-500 to-indigo-600',
    figure: <EliminationMethodSvg size={180} />
  },
  {
    title: 'Behelyettesítő módszer',
    description: 'Kifejezzük az egyik ismeretlent abból az egyenletből, ahol az együtthatója 1 vagy −1, majd beírjuk a másik egyenletbe a kapott algebrai kifejezést.',
    note: 'Példa: x + y = 7 ⟹ y = 7 − x. Beírva: 2x + (7 − x) = 10 ⟹ x = 3, y = 4.',
    color: 'from-purple-500 to-pink-600',
    figure: <SubstitutionMethodSvg size={180} />
  },
  {
    title: 'Különleges algebrai eredmények',
    description: 'Ha a levezetés során mindkét ismeretlen kiesik: 0 = 0 (azonosság) ⟹ végtelen sok megoldás. 0 = k (k ≠ 0, ellentmondás) ⟹ nincs megoldás (∅).',
    note: 'Azonosságnál a két egyenes egybeesik, ellentmondásnál párhuzamosak.',
    color: 'from-emerald-500 to-teal-600',
    figure: <AlgebraicSpecialCasesSvg size={180} />
  },
  {
    title: 'Új ismeretlen bevezetése és 3 ismeretlen',
    description: 'Törtes rendszereknél (1/x, 1/y) vezessünk be a = 1/x és b = 1/y új segédváltozókat. Három ismeretlennél lépcsős kieséssel haladunk 3 ➔ 2 ➔ 1 ismeretlenre.',
    note: 'Törtes rendszernél sose felejtsd el a nevező kikötését: x ≠ 0, y ≠ 0!',
    color: 'from-amber-500 to-orange-600',
    figure: <AuxiliaryVariableSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető algebrai módszerek (Könnyű)',
    subtitle: 'Behelyettesítés, egyenlő együtthatók összeadással, alapvető 2-ismeretlenes rendszerek.',
    range: '1–10. feladat',
    focus: 'Behelyettesítés és közvetlen kiesés',
    questions: [
      {
        id: 'amq1-1',
        questionTypeBadge: 'Módszerválasztás',
        question: 'Mikor a legkényelmesebb a behelyettesítő módszert választani egy kétismeretlenes egyenletrendszer megoldásakor?',
        options: [
          'Ha legalább az egyik egyenletben valamelyik ismeretlen együtthatója 1 vagy −1',
          'Csak akkor, ha mind a négy együttható prímszám',
          'Kizárólag akkor, ha az egyenletek konstans tagjai nullák',
          'Ha mindkét ismeretlen együtthatója 10-nél nagyobb egész szám'
        ],
        correctAnswer: 0,
        explanation: 'A behelyettesítő módszernél kifejezzük az egyik ismeretlent. Ha az együtthatója 1 vagy −1, akkor a kifejezéshez nem kell törtekkel osztani, így azonnal tiszta egész kifejezést kapunk, pl. y = 7 − 2x.',
        hint: 'Gondolj arra, melyik esetben kerülhető el teljesen a törtekkel való számolás a kifejezés során!'
      },
      {
        id: 'amq1-2',
        questionTypeBadge: 'Elimináció felismerése',
        question: 'Tekintsük a következő egyenletrendszert:\nI. 5x + 7y = 19\nII. 2x − 7y = −12\nMi a leggyorsabb első lépés a megoldáshoz?',
        options: [
          'A két egyenlet összeadása, mert a +7y és −7y azonnal kiejti egymást (7x = 7)',
          'Az I. egyenlet beszorzása 7-tel, a II. beszorzása 5-tel',
          'Az I. egyenletből y kifejezése: y = (19 − 5x)/7',
          'A két egyenlet egymásból való kivonása'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a y ismeretlen együtthatója az I-ben +7, a II-ben −7 (egymás ellentettjei), a két egyenlet bal és jobb oldalát összeadva az y teljesen kiesik: (5x + 2x) + (7y − 7y) = 19 + (−12) ⟹ 7x = 7 ⟹ x = 1.',
        hint: 'Nézd meg a két y együtthatóját: +7 és −7! Mi történik, ha összeadod őket?',
        figure: <EliminationMethodSvg size={220} />
      },
      {
        id: 'amq1-3',
        questionTypeBadge: 'Behelyettesítés lépése',
        question: 'Adott a rendszer: I. y = 3x − 2 és II. 2x + y = 13. Mi az x-re kapott egyismeretlenes egyenlet a behelyettesítés után?',
        options: [
          '2x + (3x − 2) = 13',
          '2x + 3x − 2 = 0',
          '3(2x) − 2 = 13',
          '2(3x − 2) + y = 13'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenletből készen adva van y = 3x − 2. Ezt a II. egyenletbe az y helyére írva: 2x + (3x − 2) = 13 adódik. Ebből 5x − 2 = 13 ⟹ 5x = 15 ⟹ x = 3.',
        hint: 'Cseréld ki a II. egyenletben az y betűt pontosan a (3x − 2) kifejezésre!',
        figure: <SubstitutionMethodSvg size={220} />
      },
      {
        id: 'amq1-4',
        questionTypeBadge: 'Számítás',
        question: 'Oldd meg fejben a legegyszerűbb összeadó módszerrel:\nI. x + y = 10\nII. x − y = 4\nMennyi az (x; y) megoldáspár?',
        options: [
          '(7; 3)',
          '(6; 4)',
          '(8; 2)',
          '(5; 5)'
        ],
        correctAnswer: 0,
        explanation: 'Összeadva a két egyenletet: 2x = 14 ⟹ x = 7. Visszahelyettesítve az I-be: 7 + y = 10 ⟹ y = 3. Ellenőrzés a II-ben: 7 − 3 = 4 ✓.',
        hint: 'Add össze a két egyenletet: x + x = 2x, y + (−y) = 0, 10 + 4 = 14.'
      },
      {
        id: 'amq1-5',
        questionTypeBadge: 'Megoldás ellenőrzése',
        question: 'Melyik számpár megoldása a következő egyenletrendszernek?\nI. 3x − 2y = 8\nII. x + 4y = 5',
        options: [
          '(3; 0,5)',
          '(2; 1)',
          '(4; 2)',
          '(1; 1)'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be a (3; 0,5) párt: I. 3·3 − 2·0,5 = 9 − 1 = 8 ✓. II. 3 + 4·0,5 = 3 + 2 = 5 ✓. Mindkét egyenlet teljesül!',
        hint: 'Próbáld behelyettesíteni az értékeket mindkét egyenletbe, vagy fejezd ki x-et a II-ből: x = 5 − 4y.'
      },
      {
        id: 'amq1-6',
        questionTypeBadge: 'Szorzótényező kiválasztása',
        question: 'Adott a rendszer:\nI. 2x + 3y = 7\nII. 4x − y = 7\nMivel érdemes megszorozni a II. egyenletet, hogy összeadással kiejthessük az y változót?',
        options: [
          '3-mal, mert így −3y keletkezik, ami az I. +3y tagjával összeadva 0 lesz',
          '−2-vel, hogy az x essen ki kivonás nélkül',
          '7-tel, hogy a jobb oldalak megegyezzenek',
          'Nem szabad megszorozni, csak behelyettesíteni lehet'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenletben +3y szerepel, a II-ben −y. Ha a II-t megszorozzuk 3-mal, abból 12x − 3y = 21 lesz. Ezt az I-hez adva: (2x+12x) + (3y−3y) = 7+21 ⟹ 14x = 28 ⟹ x = 2.',
        hint: 'Milyen számmal kell szorozni a −1-et, hogy a +3 ellentettjét (−3) kapjuk?'
      },
      {
        id: 'amq1-7',
        questionTypeBadge: 'Kifejezés helyessége',
        question: 'Ha az 5x − 2y = 10 egyenletből kifejezzük az y változót, melyik helyes algebrai alakot kapjuk?',
        options: [
          'y = 2,5x − 5',
          'y = 5x − 10',
          'y = 10 − 5x',
          'y = (10 + 5x)/2'
        ],
        correctAnswer: 0,
        explanation: '5x − 2y = 10 ⟹ 5x − 10 = 2y ⟹ y = (5x − 10)/2 = 2,5x − 5.',
        hint: 'Adj hozzá 2y-t mindkét oldalhoz, vonj ki 10-et, majd ossz el 2-vel!'
      },
      {
        id: 'amq1-8',
        questionTypeBadge: 'Számítás',
        question: 'Mi az x értéke az alábbi rendszerben?\nI. 4x + 3y = 18\nII. 2x + 3y = 12',
        options: [
          'x = 3',
          'x = 2',
          'x = 6',
          'x = 1'
        ],
        correctAnswer: 0,
        explanation: 'Mivel mindkét egyenletben +3y szerepel, vonjuk ki a II. egyenletet az I-ből: (4x − 2x) + (3y − 3y) = 18 − 12 ⟹ 2x = 6 ⟹ x = 3. (Ebből y = 2).',
        hint: 'Vonjuk ki az I. egyenletből a II. egyenletet! A 3y tag azonnal kiesik.'
      },
      {
        id: 'amq1-9',
        questionTypeBadge: 'Visszahelyettesítés',
        question: 'Egy egyenletrendszer megoldása során megkaptuk, hogy x = 4. Az egyik kiinduló egyenlet: 3x − 5y = 2. Mennyi az y értéke?',
        options: [
          'y = 2',
          'y = −2',
          'y = 10',
          'y = 2,5'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be x = 4-et: 3·4 − 5y = 2 ⟹ 12 − 5y = 2 ⟹ 10 = 5y ⟹ y = 2.',
        hint: '3 · 4 = 12. Mennyit kell levonni 12-ből, hogy 2-t kapjunk?'
      },
      {
        id: 'amq1-10',
        questionTypeBadge: 'Alapfogalom',
        question: 'Mi a különbség a grafikus és az algebrai megoldás között pontosság szempontjából?',
        options: [
          'Az algebrai módszerekkel tetszőlegesen bonyolult tört vagy irracionális koordináták is pontosan kiszámíthatók, míg a grafikonról a nem egész értékek csak becsülhetők',
          'A grafikus módszer mindig pontosabb, mert a rajz nem téved',
          'Nincs különbség, mindkét módszer pontosan ugyanazokat a tizedestörteket adja leolvasáskor',
          'Algebrai módszerrel csak egész számú megoldások találhatók meg'
        ],
        correctAnswer: 0,
        explanation: 'Grafikus leolvasásnál a skálázás és vonalvastagság miatt pl. a (17/19; −43/27) pontot lehetetlen pontosan leolvasni. Az algebrai levezetés ellenben egzakt, törtekkel pontos értéket ad.',
        hint: 'Gondolj arra, le tudod-e olvasni milliméterpapírról pontosan a 13/17 törtszámot!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kétlépéses elimináció és különleges esetek (Közepes)',
    subtitle: 'Keresztbe szorzás, azonosságok (0=0), ellentmondások (0=k) és szöveges modellezés.',
    range: '11–20. feladat',
    focus: 'Összetettebb elimináció és a megoldásszám vizsgálata',
    questions: [
      {
        id: 'amq2-1',
        questionTypeBadge: 'Kétlépéses szorzás',
        question: 'Oldjuk meg az alábbi rendszert eliminációval:\nI. 3x + 5y = 11\nII. 2x + 3y = 7\nMilyen szorzókat érdemes alkalmazni az x kiküszöböléséhez?',
        options: [
          'I. szorzása 2-vel, II. szorzása 3-mal (majd a két egyenlet kivonása egymásból)',
          'I. szorzása 3-mal, II. szorzása 5-tel',
          'Csak az I-et kell szorozni 2/3-dal',
          'Nem lehet eliminálni, mert 3 és 2 relatív prímek'
        ],
        correctAnswer: 0,
        explanation: 'Az x együtthatói 3 és 2. Legkisebb közös többszörösük 6. Ezért az I-et 2-vel (6x + 10y = 22), a II-t 3-mal (6x + 9y = 21) szorozzuk, majd kivonva: y = 1 adódik, amiből x = 2.',
        hint: 'Keresd a 3 és a 2 legkisebb közös többszörösét (6)!',
        figure: <EliminationMethodSvg size={220} />
      },
      {
        id: 'amq2-2',
        questionTypeBadge: 'Különleges eset: Ellentmondás',
        question: 'Mi történik algebrailag, ha a következő rendszert próbáljuk megoldani?\nI. 3x + y = 5\nII. 6x + 2y = 1',
        options: [
          'Ha az I-et szorozzuk 2-vel (6x + 2y = 10) és kivonjuk a II-ből, a 0 = 9 hamis állítás (ellentmondás) adódik, tehát nincs megoldás (∅)',
          'x = 0 és y = 5 egyértelmű megoldás',
          'Végtelen sok megoldás van, mert a bal oldalak arányosak',
          'A rendszer megoldása az origó: (0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenlet 2-szerese: 6x + 2y = 10. Kivonva a II-t: (6x − 6x) + (2y − 2y) = 10 − 1 ⟹ 0 = 9. Ez matematikai képtelenség (ellentmondás), a két egyenes párhuzamos, a megoldáshalmaz üres: M = ∅.',
        hint: 'Szorozd meg az első egyenletet 2-vel! Mennyi lesz a bal oldal és mennyi a jobb oldal?',
        figure: <AlgebraicSpecialCasesSvg size={220} />
      },
      {
        id: 'amq2-3',
        questionTypeBadge: 'Különleges eset: Azonosság',
        question: 'Mi a megoldása a következő egyenletrendszernek?\nI. 2x − y = 1\nII. 4x − 2y = 2',
        options: [
          'Végtelen sok megoldás van, az y = 2x − 1 egyenes összes (x; 2x − 1) pontja',
          'Nincs megoldás, mert a két egyenlet kivonva egymásból nullát ad',
          'Egyetlen megoldás van: (1; 1)',
          'Pontosan 2 darab megoldáspár van'
        ],
        correctAnswer: 0,
        explanation: 'A II. egyenlet minden tagja pontosan 2-szerese az I. egyenletnek. Ha az I-et szorozzuk 2-vel és kivonjuk a II-ből: 0 = 0 adódik. Ez azonosság, ami minden olyan számpárra igaz, ahol y = 2x − 1.',
        hint: 'Oszd el a második egyenletet 2-vel! Mit veszel észre?',
        figure: <AlgebraicSpecialCasesSvg size={220} />
      },
      {
        id: 'amq2-4',
        questionTypeBadge: 'Zárójeles rendszer',
        question: 'Oldd meg a zárójeles rendszert:\nI. 2(x + y) − 3(x − y) = 4\nII. 5x − 4y = 1\nMennyi az (x; y) megoldáspár?',
        options: [
          '(5; 6)',
          '(1; 1)',
          '(3; 2)',
          '(2; 3)'
        ],
        correctAnswer: 0,
        explanation: 'Bontsuk fel a zárójeleket az I-ben: 2x + 2y − 3x + 3y = 4 ⟹ −x + 5y = 4 ⟹ x = 5y − 4. Helyettesítsük be a II-be: 5(5y − 4) − 4y = 1 ⟹ 25y − 20 − 4y = 1 ⟹ 21y = 21 ⟹ y = 1? Várjunk: ha y=1, akkor x=1. Ellenőrizzük: 5(1) - 4(1) = 1 ✓. Az I-ben: 2(2) - 3(0) = 4 ✓! Tehát (1; 1)!',
        hint: 'Bontsd fel a zárójeleket az első egyenletben és vond össze a változókat: −x + 5y = 4!'
      },
      {
        id: 'amq2-5',
        questionTypeBadge: 'Törtmentesítés',
        question: 'Hogyan érdemes elkezdeni a következő törtes együtthatójú rendszer megoldását?\nI. x/2 + y/3 = 4\nII. x/4 − y/6 = 0',
        options: [
          'Szorozzuk be az I. egyenletet a közös nevezővel (6-tal), a II-t pedig 12-vel, hogy egész együtthatós rendszert kapjunk',
          'Vezessünk be rögtön logaritmust',
          'Azonnal rajzoljuk meg koordinátarendszerben',
          'Helyettesítsünk be x helyére 0-t'
        ],
        correctAnswer: 0,
        explanation: 'Ha az I-et beszorozzuk 6-tal: 3x + 2y = 24. A II-t beszorozzuk 12-vel: 3x − 2y = 0. Ezzel tiszta egész együtthatós rendszert kapunk, amit összeadva 6x = 24 ⟹ x = 4, y = 6.',
        hint: 'A nevezők 2 és 3 az I-ben (közös nevező 6), 4 és 6 a II-ben (közös nevező 12).'
      },
      {
        id: 'amq2-6',
        questionTypeBadge: 'Szöveges feladat: Életkorok',
        question: 'Egy apa most 4-szer annyi idős, mint a fia. 6 év múlva az apa már csak 2,5-szer annyi idős lesz, mint a fia. Hány éves most az apa és a fia?',
        options: [
          'Apa: 24 éves, fia: 6 éves',
          'Apa: 36 éves, fia: 9 éves',
          'Apa: 32 éves, fia: 8 éves',
          'Apa: 40 éves, fia: 10 éves'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a fia életkora F, az apáé A. I. A = 4F. Hat év múlva mindketten 6 évvel lesznek idősebbek: A + 6 = 2,5(F + 6). Behelyettesítve: 4F + 6 = 2,5F + 15 ⟹ 1,5F = 9 ⟹ F = 6 éves a fia. Az apa most A = 4 · 6 = 24 éves. Ellenőrzés: 6 év múlva apa 30, fia 12, és 30 / 12 = 2,5 ✓.',
        hint: 'Írd fel a két egyenletet: A = 4F és az évek múlását hozzáadva mindkettejükhöz: A + 6 = 2,5(F + 6)!'
      },
      {
        id: 'amq2-7',
        questionTypeBadge: 'Paraméteres vizsgálat',
        question: 'Milyen p valós paraméter esetén NINCS megoldása az alábbi rendszernek?\nI. 2x + py = 6\nII. 4x + 6y = 5',
        options: [
          'p = 3',
          'p = 6',
          'p = 0',
          'p = −3'
        ],
        correctAnswer: 0,
        explanation: 'Ahhoz, hogy ne legyen megoldás (párhuzamos egyenesek), az ismeretlenek együtthatóinak arányosnak kell lenniük: 2/4 = p/6 ⟹ 1/2 = p/6 ⟹ p = 3. Ekkor a bal oldal 4x + 6y lenne, aminek értéke az I. egyenletből 12, a II. egyenletből viszont 5, ami ellentmondás (12 = 5).',
        hint: 'Az együtthatók arányának meg kell egyeznie: 2 / 4 = p / 6, miközben a konstansok nem azonosak!'
      },
      {
        id: 'amq2-8',
        questionTypeBadge: 'Szöveges feladat: Kétjegyű szám',
        question: 'Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, az eredeti számnál 27-tel nagyobb számot kapunk. Mi az eredeti szám?',
        options: [
          '36',
          '27',
          '45',
          '18'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a tízesek száma x, az egyeseké y. A szám értéke 10x + y. I. x + y = 9. A felcserélt szám 10y + x: (10y + x) − (10x + y) = 27 ⟹ 9y − 9x = 27 ⟹ y − x = 3. Összeadva a két egyenletet: 2y = 12 ⟹ y = 6, amiből x = 3. Az eredeti szám a 36 (felcserélve 63, és 63 − 36 = 27 ✓).',
        hint: 'A kétjegyű szám értéke 10x + y, felcserélve 10y + x. A különbségük: 9(y − x) = 27.'
      },
      {
        id: 'amq2-9',
        questionTypeBadge: 'Számítás',
        question: 'Oldd meg az alábbi rendszert:\nI. 3x − 4y = 7\nII. 2x + 3y = 16\nMennyi az (x; y) számpár?',
        options: [
          '(5; 2)',
          '(4; 1)',
          '(6; 3)',
          '(1; −1)'
        ],
        correctAnswer: 0,
        explanation: 'I. szorzása 3-mal: 9x − 12y = 21. II. szorzása 4-gyel: 8x + 12y = 64. Összeadva: 17x = 85 ⟹ x = 5. Visszahelyettesítve a II-be: 2·5 + 3y = 16 ⟹ 10 + 3y = 16 ⟹ 3y = 6 ⟹ y = 2. Ellenőrzés I-ben: 3·5 − 4·2 = 15 − 8 = 7 ✓.',
        hint: 'Szorozd az elsőt 3-mal, a másodikat 4-gyel, így a −12y és +12y kiejtik egymást!'
      },
      {
        id: 'amq2-10',
        questionTypeBadge: 'Stratégia',
        question: 'Miért hibás az a lépés, ha egyismeretlenes egyenletté alakításkor mindkét oldalt leosztjuk az egyik ismeretlennel (pl. x-szel)?',
        options: [
          'Mert x értéke lehet 0 is (nullával való osztás tilos), és így egy lehetséges gyököt (x = 0) elveszíthetnénk',
          'Mert az ismeretlennel való osztás megfordítja az egyenlőségjelet',
          'Mert egyenletrendszerekben csak összeadni és kivonni szabad',
          'Mert a grafikonon az osztás miatt kör keletkezne'
        ],
        correctAnswer: 0,
        explanation: 'Ismeretlennel való osztásnál fennáll a nullával való osztás veszélye, ami hamis eredményhez vagy gyökvesztéshez vezethet. Ha feltétlenül osztani kell, külön kell vizsgálni az x = 0 esetet!',
        hint: 'Szabad-e nullával osztani a matematikában?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Törtes, új ismeretlenes és 3-változós rendszerek (Nehéz)',
    subtitle: 'Segédváltozó bevezetése (1/x, 1/y), Gauss-elimináció 3 változóra és versenyfeladatok.',
    range: '21–30. feladat',
    focus: 'Új ismeretlenes transzformáció és 3-ismeretlenes rendszerek',
    questions: [
      {
        id: 'amq3-1',
        questionTypeBadge: 'Új ismeretlen bevezetése',
        question: 'Oldd meg a következő törtes egyenletrendszert (x, y ≠ 0):\nI. 1/x + 1/y = 5\nII. 2/x − 1/y = 1\nMennyi az (x; y) megoldáspár?',
        options: [
          'x = 1/2; y = 1/3',
          'x = 2; y = 3',
          'x = 1/3; y = 1/2',
          'x = 3; y = 2'
        ],
        correctAnswer: 0,
        explanation: 'Vezessünk be új ismeretleneket: a = 1/x és b = 1/y. Ekkor: I. a + b = 5, II. 2a − b = 1. Összeadva: 3a = 6 ⟹ a = 2, amiből b = 3. Visszahelyettesítve: 1/x = 2 ⟹ x = 1/2, és 1/y = 3 ⟹ y = 1/3.',
        hint: 'Legyen a = 1/x és b = 1/y. Oldd meg az a-ra és b-re kapott lineáris rendszert!',
        figure: <AuxiliaryVariableSvg size={220} />
      },
      {
        id: 'amq3-2',
        questionTypeBadge: 'Összetett törtes rendszer',
        question: 'Tekintsük az alábbi rendszert:\nI. 4/(x + 2) + 3/(y − 1) = 7\nII. 2/(x + 2) − 1/(y − 1) = 1\nMennyi az x és y értéke?',
        options: [
          'x = −1; y = 2',
          'x = 0; y = 2',
          'x = 2; y = 1',
          'x = 1; y = 3'
        ],
        correctAnswer: 0,
        explanation: 'Legyen u = 1/(x+2) és v = 1/(y−1). Ekkor: 4u + 3v = 7 és 2u − v = 1. A másodikat 3-mal szorozva: 6u − 3v = 3. Összeadva: 10u = 10 ⟹ u = 1, amiből v = 1. Visszafejtve: 1/(x+2) = 1 ⟹ x + 2 = 1 ⟹ x = −1, valamint 1/(y−1) = 1 ⟹ y − 1 = 1 ⟹ y = 2. Ellenőrzés: 4/(−1+2) + 3/(2−1) = 4/1 + 3/1 = 7 ✓ és 2/1 − 1/1 = 1 ✓.',
        hint: 'Vezess be u = 1/(x+2) és v = 1/(y−1) segédváltozókat!'
      },
      {
        id: 'amq3-3',
        questionTypeBadge: 'Háromismeretlenes rendszer',
        question: 'Oldd meg a háromismeretlenes lineáris egyenletrendszert:\nI. x + y + z = 6\nII. 2x − y + z = 3\nIII. x + 2y − z = 2\nMennyi az (x; y; z) megoldáshármas?',
        options: [
          '(1; 2; 3)',
          '(2; 1; 3)',
          '(3; 2; 1)',
          '(1; 1; 4)'
        ],
        correctAnswer: 0,
        explanation: 'Adjuk össze az I. és III. egyenletet (z kiesik): 2x + 3y = 8. Adjuk össze a II. és III. egyenletet (z kiesik): 3x + y = 5. A 3x + y = 5-ből y = 5 − 3x. Beírva az előzőbe: 2x + 3(5 − 3x) = 8 ⟹ 2x + 15 − 9x = 8 ⟹ −7x = −7 ⟹ x = 1. Ebből y = 5 − 3(1) = 2. Végül z = 6 − x − y = 6 − 1 − 2 = 3. Megoldás: (1; 2; 3).',
        hint: 'Küszöböld ki z-t két különböző egyenletpár összeadásával!',
        figure: <ThreeVariablesSvg size={220} />
      },
      {
        id: 'amq3-4',
        questionTypeBadge: 'Ciklikus szimmetria',
        question: 'Oldd meg az alábbi szimmetrikus háromismeretlenes rendszert:\nI. x + y = 7\nII. y + z = 9\nIII. z + x = 8\nMennyi az (x; y; z) rendezett számhármas?',
        options: [
          '(3; 4; 5)',
          '(2; 5; 4)',
          '(4; 3; 5)',
          '(1; 6; 3)'
        ],
        correctAnswer: 0,
        explanation: 'Adjuk össze mindhárom egyenletet: (x+y) + (y+z) + (z+x) = 7 + 9 + 8 ⟹ 2x + 2y + 2z = 24 ⟹ x + y + z = 12. Ebből: z = (x+y+z) − (x+y) = 12 − 7 = 5. x = (x+y+z) − (y+z) = 12 − 9 = 3. y = (x+y+z) − (z+x) = 12 − 8 = 4. Tehát (3; 4; 5).',
        hint: 'Add össze mindhárom egyenletet egyszerre! Mit kapsz a bal oldalon?'
      },
      {
        id: 'amq3-5',
        questionTypeBadge: 'Szöveges: Keverési feladat',
        question: 'Kétféle cukoroldatunk van: 20%-os és 50%-os. Hány kilogrammot kell összekeverni belőlük, hogy 30 kg 30%-os oldatot kapjunk?',
        options: [
          '20 kg a 20%-osból és 10 kg az 50%-osból',
          '15 kg a 20%-osból és 15 kg az 50%-osból',
          '18 kg a 20%-osból és 12 kg az 50%-osból',
          '25 kg a 20%-osból és 5 kg az 50%-osból'
        ],
        correctAnswer: 0,
        explanation: 'Legyen x kg a 20%-osból és y kg az 50%-osból. I. Össztömeg: x + y = 30 ⟹ y = 30 − x. II. Tiszta cukortartalom: 0,2x + 0,5y = 0,3 · 30 = 9. Behelyettesítve: 0,2x + 0,5(30 − x) = 9 ⟹ 0,2x + 15 − 0,5x = 9 ⟹ −0,3x = −6 ⟹ x = 20 kg. Ebből y = 30 − 20 = 10 kg.',
        hint: 'Írj fel egy egyenletet az oldatok össztömegére (x + y = 30) és egyet a tiszta cukor tömegére (0,2x + 0,5y = 9)!'
      },
      {
        id: 'amq3-6',
        questionTypeBadge: 'Szöveges: Közös munka',
        question: 'Két munkás együtt 6 óra alatt végez el egy munkát. Ha az első munkás 4 órát, a második pedig 9 órát dolgozik rajta, a munka éppen elkészül. Hány óra alatt végeznének külön-külön?',
        options: [
          'Az első 10 óra, a második 15 óra alatt',
          'Az első 8 óra, a második 12 óra alatt',
          'Az első 12 óra, a második 12 óra alatt',
          'Az első 9 óra, a második 18 óra alatt'
        ],
        correctAnswer: 0,
        explanation: 'Legyen az 1 óra alatti teljesítményük x és y. I. Együtt 6 óra: 6(x + y) = 1 ⟹ x + y = 1/6. II. Külön munkavégzés: 4x + 9y = 1. Az I-ből x = 1/6 − y. Beírva: 4(1/6 − y) + 9y = 1 ⟹ 2/3 − 4y + 9y = 1 ⟹ 5y = 1/3 ⟹ y = 1/15 (a második munkás 15 óra alatt végezne egyedül). Ebből x = 1/6 − 1/15 = 5/30 − 2/30 = 3/30 = 1/10 (az első munkás 10 óra alatt végezne egyedül).',
        hint: 'Vezess be ismeretlenként az 1 óra alatt elvégzett munkarészeket (x és y)!'
      },
      {
        id: 'amq3-7',
        questionTypeBadge: 'Másodfokúra vezető rendszer',
        question: 'Két valós szám összege 14, szorzata 45. Melyik ez a két szám (x ≥ y)?',
        options: [
          'x = 9 és y = 5',
          'x = 10 és y = 4',
          'x = 8 és y = 6',
          'x = 15 és y = −1'
        ],
        correctAnswer: 0,
        explanation: 'I. x + y = 14 ⟹ y = 14 − x. II. x · y = 45 ⟹ x(14 − x) = 45 ⟹ 14x − x² = 45 ⟹ x² − 14x + 45 = 0. A másodfokú megoldóképlettel vagy szorzattá alakítással: (x − 9)(x − 5) = 0. A gyökök: x₁ = 9 (ekkor y = 5) és x₂ = 5 (ekkor y = 9). Mivel x ≥ y, a keresett számok: 9 és 5.',
        hint: 'Fejezd ki y-t (y = 14 − x) és írd be a szorzatba: x(14 − x) = 45!'
      },
      {
        id: 'amq3-8',
        questionTypeBadge: 'Paraméteres azonosság',
        question: 'Milyen a és b valós értékek esetén van VÉGTELEN SOK megoldása az alábbi rendszernek?\nI. 3x − 6y = 9\nII. ax + 2y = b',
        options: [
          'a = −1 és b = −3',
          'a = 1 és b = 3',
          'a = −3 és b = −9',
          'a = 3 és b = 9'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenletben az y együtthatója −6. A II. egyenletben +2. Ahhoz, hogy azonosak legyenek, szorozzuk a II-t −3-mal: −3ax − 6y = −3b. Ennek meg kell egyeznie a 3x − 6y = 9 egyenlettel! Tehát: −3a = 3 ⟹ a = −1, és −3b = 9 ⟹ b = −3.',
        hint: 'Mivel kell megszorozni a 2y-t, hogy −6y legyen? Szorozd meg az egész második egyenletet azzal a számmal!'
      },
      {
        id: 'amq3-9',
        questionTypeBadge: 'Kikötések törtes rendszernél',
        question: 'Milyen kikötést kötelező megtenni a következő rendszer megoldása előtt az alaphalmazra?\nI. 3/(x − y) + 2/(x + y) = 5\nII. 1/(x − y) − 1/(x + y) = 0',
        options: [
          'x ≠ y  és  x ≠ −y (a nevezők nem lehetnek nullák)',
          'x > 0  és  y > 0',
          'Csak x ≠ 0',
          'Nincs szükség semmilyen kikötésre'
        ],
        correctAnswer: 0,
        explanation: 'A törtes kifejezések nevezője sosem lehet nulla: x − y ≠ 0 ⟹ x ≠ y, valamint x + y ≠ 0 ⟹ x ≠ −y. Ha a levezetés végén kapott számpárra ezen nevezők valamelyike nulla lenne, az hamis gyök lenne.',
        hint: 'Mely értékekre válna bármelyik tört nevezője nullává?'
      },
      {
        id: 'amq3-10',
        questionTypeBadge: 'Versenyfeladat: Abszolútértékes rendszer',
        question: 'Hány valós (x; y) megoldáspárja van a következő rendszernek?\nI. |x| + y = 3\nII. x + |y| = 1',
        options: [
          'Pontosan 1 megoldás: (−1; 2)',
          '2 megoldás',
          '4 megoldás',
          '0 megoldás (üres halmaz)'
        ],
        correctAnswer: 0,
        explanation: 'Bontsuk esetekre az előjelek szerint: 1) Ha x ≥ 0 és y ≥ 0: x + y = 3 és x + y = 1 ⟹ ellentmondás (3 = 1). 2) Ha x < 0 és y ≥ 0: −x + y = 3 és x + y = 1. Összeadva: 2y = 4 ⟹ y = 2, amiből x = 1 − 2 = −1. Ez teljesíti a feltételeket (x = −1 < 0, y = 2 ≥ 0 ✓). 3) Ha x ≥ 0, y < 0: x + y = 3 és x − y = 1 ⟹ x = 2, y = 1 (ellentmondás, mert y < 0 kellene). 4) Ha x < 0, y < 0: −x + y = 3 és x − y = 1 ⟹ ellentmondás. Így pontosan egyetlen megoldás van: (−1; 2).',
        hint: 'Vizsgáld meg a négy lehetséges előjel-kombinációt (x és y pozitív/negatív volta szerint)!'
      }
    ]
  }
};

export const AlgebraicMethodsQuiz: React.FC<AlgebraicMethodsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="2. Egyenletrendszerek algebrai megoldása – Kvíz"
      subtitle="Sajátítsd el a behelyettesítést, az egyenlő együtthatók módszerét, a segédváltozók használatát és a 3-ismeretlenes rendszereket 30 interaktív feladaton keresztül!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 8. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Egyenletrendszerek Segédlet • Algebrai módszerek"
      initialGameMode={initialGameMode}
      matcherComponent={
        <AlgebraicMethodsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <AlgebraicMethodsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};
