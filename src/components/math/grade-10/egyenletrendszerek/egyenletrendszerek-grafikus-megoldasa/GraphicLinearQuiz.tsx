import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GraphicLinearMatcher } from './GraphicLinearMatcher';
import { GraphicLinearSorter } from './GraphicLinearSorter';
import {
  IntersectingLinesSvg,
  ParallelLinesSvg,
  CoincidentLinesSvg,
  ChickensRabbitsSvg,
  MotionMeetingSvg,
  FleaGridSvg
} from './GraphicLinearFigures';
import { TrendingUp, Sparkles, CheckCircle2, Scale, Compass, Brain, Layers } from 'lucide-react';

interface GraphicLinearQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Egyenletrendszer Megoldása Grafikusan',
    description: 'A kétismeretlenes lineáris egyenletrendszer megoldása a két egyenlethez tartozó egyenesek közös pontjának (metszéspontjának) (x; y) koordinátapárja.',
    note: 'Explicit alak: y = mx + b, ahol m a meredekség, b az y-tengelymetszet.',
    color: 'from-blue-500 to-indigo-600',
    figure: <IntersectingLinesSvg size={180} />
  },
  {
    title: 'A Megoldások Száma és az Egyenesek',
    description: '1. Metsző (m₁ ≠ m₂) ⟹ Pontosan 1 megoldás. 2. Párhuzamos (m₁ = m₂, b₁ ≠ b₂) ⟹ 0 megoldás (∅). 3. Egybeeső (m₁ = m₂, b₁ = b₂) ⟹ Végtelen sok megoldás.',
    note: 'Párhuzamos egyeneseknél az ismeretlenek együtthatói arányosak, de a konstans tagok nem!',
    color: 'from-purple-500 to-pink-600',
    figure: <ParallelLinesSvg size={180} />
  },
  {
    title: 'Egybeeső Egyenesek (Azonosság)',
    description: 'Ha az egyik egyenlet a másik számszorosa (pl. 2x − y = 1 és 4x − 2y = 2), a két grafikon tökéletesen fedi egymást.',
    note: 'A végtelen sok megoldás az y = mx + b egyenes összes valós pontja.',
    color: 'from-emerald-500 to-teal-600',
    figure: <CoincidentLinesSvg size={180} />
  },
  {
    title: 'Tyúkok és Nyulak Modellje',
    description: '7 fej és 20 láb: Fejek: x + y = 7 ⟹ y = 7 − x. Lábak: 4x + 2y = 20 ⟹ y = 10 − 2x. Metszéspont: M(3; 4) ⟹ 3 nyúl és 4 tyúk.',
    note: 'Szöveges feladatoknál a kapott pontot mindig a szöveg logikája szerint is ellenőrizni kell!',
    color: 'from-amber-500 to-orange-600',
    figure: <ChickensRabbitsSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyenesek Ábrázolása (Könnyű)',
    subtitle: 'Kétismeretlenes egyenletek alakja, explicit függvényformára rendezés és pontok ellenőrzése.',
    range: '1–10. feladat',
    focus: 'Lineáris egyenletek, explicit alak és pontok behelyettesítése',
    questions: [
      {
        id: 'glq1-1',
        questionTypeBadge: 'Alapfogalom',
        question: 'Mi a kétismeretlenes elsőfokú egyenletrendszer megoldása?',
        options: [
          'Egy olyan (x; y) rendezett számpár, amely mindkét egyenletet egyidejűleg igazzá teszi',
          'Egyetlen valós szám, amely mindkét változó helyére beírható',
          'Bármely két valós szám, amelynek összege nulla',
          'A koordinátarendszer origója: (0; 0)'
        ],
        correctAnswer: 0,
        hint: 'Két ismeretlenünk van, így a megoldás egy összetartozó számpár.',
        explanation: 'A kétismeretlenes egyenletrendszer megoldása olyan (x; y) rendezett valós számpár, amelyet behelyettesítve az egyenletrendszer mindegyik egyenlete igaz kijelentéssé válik.'
      },
      {
        id: 'glq1-2',
        questionTypeBadge: 'Explicit Alak',
        question: 'Hogyan néz ki az x + y = 7 egyenlet y-ra rendezett (explicit) alakja?',
        options: [
          'y = 7 − x',
          'y = x − 7',
          'y = 7 + x',
          'y = 7x'
        ],
        correctAnswer: 0,
        hint: 'Mindkét oldalból vonj ki x-et.',
        explanation: 'Az x + y = 7 egyenlet mindkét oldalából x-et kivonva kapjuk: y = 7 − x.'
      },
      {
        id: 'glq1-3',
        questionTypeBadge: 'Metszéspont Leolvasás',
        question: 'A koordináta-rendszerben két egyenes a P(3; 4) pontban metszi egymást. Mi az egyenletrendszer megoldása?',
        figure: <IntersectingLinesSvg size={200} />,
        options: [
          'x = 3 és y = 4',
          'x = 4 és y = 3',
          'x = 7 és y = 1',
          'x = 12 és y = 0'
        ],
        correctAnswer: 0,
        hint: 'A rendezett számpárban az első tag az x, a második tag az y.',
        explanation: 'A P(x; y) pont koordinátái rendre az x és az y változó értékeit adják: P(3; 4) ⟹ x = 3 és y = 4.'
      },
      {
        id: 'glq1-4',
        questionTypeBadge: 'Behelyettesítéses Ellenőrzés',
        question: 'Megoldása-e a (2; 1) számpár a 2x + 3y = 7 és x − y = 1 egyenletrendszernek?',
        options: [
          'Igen, mert mindkét egyenletbe behelyettesítve igaz állítást kapunk',
          'Nem, mert a második egyenletet nem teljesíti',
          'Nem, mert az első egyenletet nem teljesíti',
          'Csak akkor, ha x és y természetes számok'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be: x = 2 és y = 1.',
        explanation: 'I. egyenlet: 2·2 + 3·1 = 4 + 3 = 7 (Igaz). II. egyenlet: 2 − 1 = 1 (Igaz). Mindkét egyenlet teljesül, így (2; 1) valóban megoldás.'
      },
      {
        id: 'glq1-5',
        questionTypeBadge: 'Meredekség',
        question: 'Mennyi az y = −2x + 10 egyenes meredeksége (m) és y-tengelymetszete (b)?',
        options: [
          'm = −2 és b = 10',
          'm = 2 és b = −10',
          'm = 10 és b = −2',
          'm = −2 és b = 0'
        ],
        correctAnswer: 0,
        hint: 'Az y = mx + b alakban az x együtthatója az m, a konstans tag a b.',
        explanation: 'Az y = mx + b lineáris függvény általános alakjában az x szorzója a meredekség (m = −2), az állandó tag pedig az y-tengelymetszet (b = 10).'
      },
      {
        id: 'glq1-6',
        questionTypeBadge: 'Negatív Előjel',
        question: 'Hogyan rendezhető y-ra a 2x − y = 5 egyenlet?',
        options: [
          'y = 2x − 5',
          'y = 5 − 2x',
          'y = −2x − 5',
          'y = 2x + 5'
        ],
        correctAnswer: 0,
        hint: 'Adj hozzá mindkét oldalhoz y-t, és vonj ki 5-öt.',
        explanation: '2x − y = 5 ⟹ 2x = y + 5 ⟹ y = 2x − 5. Ha mindkét oldalból kivonunk 2x-et: −y = 5 − 2x, majd (−1)-gyel szorozva: y = 2x − 5.'
      },
      {
        id: 'glq1-7',
        questionTypeBadge: 'Tengelymetszet',
        question: 'Melyik pontban metszi az y = 3x − 6 egyenes az y tengelyt?',
        options: [
          '(0; −6)',
          '(−6; 0)',
          '(2; 0)',
          '(0; 2)'
        ],
        correctAnswer: 0,
        hint: 'Az y tengelyen minden pont x koordinátája 0.',
        explanation: 'Ha x = 0, akkor y = 3·0 − 6 = −6. Tehát az y-tengelymetszet pontja a (0; −6).'
      },
      {
        id: 'glq1-8',
        questionTypeBadge: 'Zérushely',
        question: 'Melyik pontban metszi az y = 3x − 6 egyenes az x tengelyt?',
        options: [
          '(2; 0)',
          '(0; 2)',
          '(−2; 0)',
          '(0; −6)'
        ],
        correctAnswer: 0,
        hint: 'Az x tengelyen az y koordináta 0. Oldd meg a 3x − 6 = 0 egyenletet.',
        explanation: 'Az x tengelyen y = 0. Ekkor 0 = 3x − 6 ⟹ 3x = 6 ⟹ x = 2. A metszéspont koordinátája: (2; 0).'
      },
      {
        id: 'glq1-9',
        questionTypeBadge: 'Tyúk-Nyúl Feladat',
        question: 'Egy udvaron tyúkok (y) és nyulak (x) vannak. Összesen 7 fejük van. Melyik egyenlet írja le a fejek számát?',
        figure: <ChickensRabbitsSvg size={200} />,
        options: [
          'x + y = 7',
          '4x + 2y = 7',
          '2x + 4y = 7',
          'x · y = 7'
        ],
        correctAnswer: 0,
        hint: 'Minden állatnak (tyúknak és nyúlnak is) pontosan 1 feje van.',
        explanation: 'Mivel mind a tyúknak, mind a nyúlnak 1 feje van, a fejek összege: 1·x + 1·y = 7, azaz x + y = 7.'
      },
      {
        id: 'glq1-10',
        questionTypeBadge: 'Tyúk-Nyúl Lábak',
        question: 'A nyulaknak 4 lábuk, a tyúkoknak 2 lábuk van. Összesen 20 lábuk van. Melyik egyenlet helyes?',
        options: [
          '4x + 2y = 20',
          '2x + 4y = 20',
          'x + y = 20',
          '6(x + y) = 20'
        ],
        correctAnswer: 0,
        hint: 'x darab nyúl lábainak száma 4x, y darab tyúk lábainak száma 2y.',
        explanation: 'x nyúlnak egyenként 4 lába van (4x), y tyúknak egyenként 2 lába van (2y). A lábak összege: 4x + 2y = 20 (ami egyszerűsítve: 2x + y = 10).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kölcsönös Helyzet és Megoldások Száma (Közepes)',
    subtitle: 'Metsző, párhuzamos és egybeeső egyenesek vizsgálata meredekség és tengelymetszet alapján.',
    range: '11–20. feladat',
    focus: 'Metszéspontok, párhuzamosság, egybeesés és a megoldások száma',
    questions: [
      {
        id: 'glq2-1',
        questionTypeBadge: 'Metsző Egyenesek',
        question: 'Hány megoldása van annak a kétismeretlenes egyenletrendszernek, amelynek egyenletei: y = 2x + 1 és y = −x + 4?',
        figure: <IntersectingLinesSvg size={200} />,
        options: [
          'Pontosan 1 megoldása van, mert a meredekségek különböznek (m₁ = 2 ≠ m₂ = −1)',
          'Nincs megoldása, mert a konstans tagok pozitívak',
          'Végtelen sok megoldása van, mert mindkét egyenes lineáris',
          'Pontosan 2 megoldása van, mert két egyenlet van'
        ],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze az x-ek együtthatóit (a meredekségeket)!',
        explanation: 'm₁ = 2 és m₂ = −1. Mivel m₁ ≠ m₂, a két egyenes nem párhuzamos, így pontosan egy pontban metszik egymást. A metszéspont: 2x + 1 = −x + 4 ⟹ 3x = 3 ⟹ x = 1, y = 3. A megoldás az (1; 3) számpár.'
      },
      {
        id: 'glq2-2',
        questionTypeBadge: 'Párhuzamos Egyenesek',
        question: 'Mi a megoldása az y = 3x + 2 és y = 3x − 5 egyenletrendszernek?',
        figure: <ParallelLinesSvg size={200} />,
        options: [
          'Nincs megoldása (üres halmaz ∅), mert a két egyenes párhuzamos és nem esik egybe',
          'Egy megoldása van: (0; 2)',
          'Végtelen sok megoldása van, mert a meredekségük azonos',
          'A megoldás a (3; 3) számpár'
        ],
        correctAnswer: 0,
        hint: 'm₁ = 3 és m₂ = 3, viszont b₁ = 2 és b₂ = −5.',
        explanation: 'Mindkét egyenes meredeksége m = 3, de az y-tengelyt különböző pontokban metszik (2 ≠ −5). A két egyenes párhuzamos, nincs közös pontjuk, így az egyenletrendszernek nincs megoldása.'
      },
      {
        id: 'glq2-3',
        questionTypeBadge: 'Egybeeső Egyenesek',
        question: 'Hány megoldása van a 2x − y = 1 és 4x − 2y = 2 egyenletrendszernek?',
        figure: <CoincidentLinesSvg size={200} />,
        options: [
          'Végtelen sok megoldása van, mert a két egyenes egybeesik',
          'Pontosan 1 megoldása van',
          'Nincs megoldása',
          'Pontosan 2 megoldása van'
        ],
        correctAnswer: 0,
        hint: 'Figyeld meg a két egyenlet együtthatóit: mit kapsz, ha a másodikat elosztod 2-vel?',
        explanation: 'A második egyenlet mindkét oldalát 2-vel osztva pontosan az első egyenletet kapjuk: 2x − y = 1. A két egyenlet ugyanazt az egyenest határozza meg, így minden pontjuk közös: végtelen sok megoldás van.'
      },
      {
        id: 'glq2-4',
        questionTypeBadge: 'Ellentmondás Felismerése',
        question: 'Milyen algebrai eredményre vezet a 3x + y = 5 és 6x + 2y = 1 egyenletrendszer grafikus és algebrai vizsgálata?',
        options: [
          'Ellentmondásra (pl. 0 = 9), így az egyenesek párhuzamosak és nincs megoldás',
          'Azonosságra (0 = 0), így végtelen sok megoldás van',
          'x = 0 és y = 5 egyértelmű megoldásra',
          'x = 1 és y = 2 megoldásra'
        ],
        correctAnswer: 0,
        hint: 'Szorozd meg az első egyenletet 2-vel: 6x + 2y = 10, miközben a második: 6x + 2y = 1.',
        explanation: 'Az első egyenlet kétszerese 6x + 2y = 10. A második egyenlet 6x + 2y = 1. Ugyanaz a bal oldal nem lehet egyszerre 10 és 1 (kivonva: 0 = 9 ellentmondás). Az egyenesek párhuzamosak, nincs megoldás.'
      },
      {
        id: 'glq2-5',
        questionTypeBadge: 'Metszéspont Kiszámítása',
        question: 'Mi a metszéspontja az y = x + 4 és y = −2x + 1 egyeneseknek?',
        options: [
          '(−1; 3)',
          '(1; 5)',
          '(3; −1)',
          '(0; 4)'
        ],
        correctAnswer: 0,
        hint: 'Tedd egyenlővé: x + 4 = −2x + 1, oldd meg x-re!',
        explanation: 'x + 4 = −2x + 1 ⟹ 3x = −3 ⟹ x = −1. Ezt visszahelyettesítve: y = (−1) + 4 = 3. A metszéspont tehát a (−1; 3) rendezett számpár.'
      },
      {
        id: 'glq2-6',
        questionTypeBadge: 'Párhuzamosság Feltétele',
        question: 'Milyen p valós szám esetén lesz az y = px + 4 egyenes párhuzamos a 2x − y = 3 egyenessel?',
        options: [
          'p = 2',
          'p = −2',
          'p = 0,5',
          'p = 3'
        ],
        correctAnswer: 0,
        hint: 'Rendezd a 2x − y = 3 egyenletet y-ra a meredekség meghatározásához.',
        explanation: '2x − y = 3 ⟹ y = 2x − 3. Ennek az egyenesnek a meredeksége m = 2. Két egyenes akkor párhuzamos, ha meredekségük megegyezik: p = 2 (a tengelymetszetek 4 ≠ −3, tehát nem esnek egybe).'
      },
      {
        id: 'glq2-7',
        questionTypeBadge: 'Törtes Explicit Alak',
        question: 'Hogyan írható fel y-ra rendezve a 4x + 2y = 10 egyenlet?',
        options: [
          'y = −2x + 5',
          'y = 2x + 5',
          'y = −4x + 10',
          'y = −2x + 10'
        ],
        correctAnswer: 0,
        hint: '2y = 10 − 4x, majd oszd el mindkét oldalt 2-vel!',
        explanation: '4x + 2y = 10 ⟹ 2y = −4x + 10 ⟹ y = −2x + 5.'
      },
      {
        id: 'glq2-8',
        questionTypeBadge: 'Origón Átmenő Egyenesek',
        question: 'Mi a megoldása az x + y = 0 és 2x − y = 0 egyenletrendszernek?',
        options: [
          '(0; 0)',
          '(1; −1)',
          'Nincs megoldása',
          'Végtelen sok megoldása van'
        ],
        correctAnswer: 0,
        hint: 'Mindkét egyenletben a konstans tag 0, azaz mindkét egyenes áthalad az origón.',
        explanation: 'y = −x és y = 2x. Mindkét egyenes áthalad az origón (b = 0), meredekségük különböző (−1 ≠ 2), így az egyetlen metszéspont a (0; 0).'
      },
      {
        id: 'glq2-9',
        questionTypeBadge: 'Leolvasási Becslés Korlátja',
        question: 'Mi a grafikus megoldás legfőbb gyakorlati korlátja a füzetben végzett számításoknál?',
        options: [
          'Ha a metszéspont nem rácspont (pl. törtek vagy irracionális számok), a koordináták csak pontatlanul becsülhetők le',
          'Hogy grafikus úton csak pozitív számok ábrázolhatók',
          'Hogy a párhuzamos egyeneseket nem lehet megrajzolni',
          'Hogy a koordináta-rendszerben a vonalak elgörbülnek'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a rajzolási pontosságra és a törtekre.',
        explanation: 'A grafikus módszer nagy szemléleti előnye mellett hátránya, hogy a rajzolási és leolvasási pontatlanság miatt nem egész metszéspontok esetén csak becsülni lehet az eredményt, ezért pontos értékhez algebrai eljárás kell.'
      },
      {
        id: 'glq2-10',
        questionTypeBadge: 'Számpár Ellenőrzése',
        question: 'Melyik egyenletrendszernek megoldása a (3; −1) számpár?',
        options: [
          '5x + 4y = 11 és 2x − 3y = 9',
          'x + y = 4 és x − y = 2',
          '2x + y = 7 és 3x − y = 8',
          'x + 2y = 5 és 2x + y = 4'
        ],
        correctAnswer: 0,
        hint: 'Helyettesítsd be: x = 3 és y = −1 a válaszlehetőségek egyenleteibe!',
        explanation: '5·3 + 4·(−1) = 15 − 4 = 11 (Igaz) és 2·3 − 3·(−1) = 6 + 3 = 9 (Igaz). Tehát az (3; −1) számpár ennek a rendszernek megoldása.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szöveges Modellezés és Összetett Feladatok (Nehéz)',
    subtitle: 'Találkozási feladatok, érettségi típusú modellezések és paraméteres rendszerek.',
    range: '21–30. feladat',
    focus: 'Mozgásos szöveges feladatok, paraméteres egyenesek és érettségi típusok',
    questions: [
      {
        id: 'glq3-1',
        questionTypeBadge: 'Találkozási Feladat',
        question: 'Dani 720 m-re lévő iskolából 14:00-kor hazaindul 60 m/perc sebességgel. Anyukája ugyanekkor indul otthonról az iskola felé 30 m/perc sebességgel. Hány perc múlva találkoznak?',
        figure: <MotionMeetingSvg size={240} />,
        options: [
          '8 perc múlva',
          '10 perc múlva',
          '12 perc múlva',
          '6 perc múlva'
        ],
        correctAnswer: 0,
        hint: 'Dani távolsága otthontól: y = 720 − 60t; Anyukája: y = 30t. Tedd őket egyenlővé!',
        explanation: 'Dani és anyukája egymással szemben haladnak, együttes közeledési sebességük 60 + 30 = 90 m/perc. A találkozásig eltelt idő: t = 720 / 90 = 8 perc. Ekkor az otthontól mért távolság: 30 · 8 = 240 méter.'
      },
      {
        id: 'glq3-2',
        questionTypeBadge: 'Találkozási Távolság',
        question: 'Az előző feladatban (Dani és Anyukája) milyen távol lesznek otthonuktól a találkozás pillanatában?',
        options: [
          '240 méterre',
          '480 méterre',
          '360 méterre',
          '300 méterre'
        ],
        correctAnswer: 0,
        hint: 'Anyukája otthonról indult és 8 percig gyalogolt 30 m/perc sebességgel.',
        explanation: 'Anyukája otthonról indult, 8 perc alatt s = v · t = 30 m/perc · 8 perc = 240 métert tett meg az otthontól.'
      },
      {
        id: 'glq3-3',
        questionTypeBadge: 'Utolérési Feladat',
        question: 'Ágoston rollerrel 150 m/perc sebességgel indul. Apukája 6 perccel később robogóval utána indul 450 m/perc sebességgel. Hány perc múlva éri utol apukája Ágostont?',
        options: [
          '3 perc múlva (Ágoston indulásától számítva 9 perc)',
          '4 perc múlva',
          '2 perc múlva',
          '6 perc múlva'
        ],
        correctAnswer: 0,
        hint: 'Amikor apa indul, Ágoston előnye: 6 · 150 = 900 m. A relatív sebességkülönbség: 450 − 150 = 300 m/perc.',
        explanation: 'Ágoston 6 perc alatt 6 · 150 = 900 méter előnyt szerzett. Apukája percenként 450 − 150 = 300 méterrel csökkenti a távolságot. Az utolérés ideje az apa indulásától: 900 / 300 = 3 perc. Ágoston indulásától: 6 + 3 = 9 perc (megtett út: 9 · 150 = 1350 m).'
      },
      {
        id: 'glq3-4',
        questionTypeBadge: 'Vacsora Asztalok',
        question: 'Egy ünnepségen, ha minden asztalhoz 6 vendéget ültetnek, 2 főnek nem jut hely. Ha 7 széket tesznek egy asztalhoz, 1 hely üresen marad. Hány asztal (x) és hány vendég (y) van?',
        options: [
          '3 asztal és 20 vendég',
          '4 asztal és 26 vendég',
          '5 asztal és 32 vendég',
          '2 asztal és 14 vendég'
        ],
        correctAnswer: 0,
        hint: 'Írd fel a vendégek számát mindkét esetben: y = 6x + 2 és y = 7x − 1.',
        explanation: 'A két kifejezés egyenlő: 6x + 2 = 7x − 1 ⟹ x = 3 asztal. A vendégek száma: y = 6·3 + 2 = 20 fő (ellenőrzés: 7·3 − 1 = 20 ✓).'
      },
      {
        id: 'glq3-5',
        questionTypeBadge: 'Vásári Cserebere',
        question: 'A vásárban 1 csikóért 2 malacot és 5 tallért kérnek. 2 csikóért 1 malacot és 22 tallért. Mennyibe kerül 1 csikó (x) és 1 malac (y)?',
        options: [
          '1 csikó = 13 tallér, 1 malac = 4 tallér',
          '1 csikó = 15 tallér, 1 malac = 5 tallér',
          '1 csikó = 12 tallér, 1 malac = 3 tallér',
          '1 csikó = 14 tallér, 1 malac = 4 tallér'
        ],
        correctAnswer: 0,
        hint: 'I: x = 2y + 5, II: 2x = y + 22. Helyettesítsd be az elsőt a másodikba!',
        explanation: '2(2y + 5) = y + 22 ⟹ 4y + 10 = y + 22 ⟹ 3y = 12 ⟹ y = 4 tallér (malac). Ekkor x = 2·4 + 5 = 13 tallér (csikó). Ellenőrzés: 2·13 = 26 = 4 + 22 ✓.'
      },
      {
        id: 'glq3-6',
        questionTypeBadge: 'Bolha Ugrása (Tankönyv 44. o.)',
        question: 'Egy bolha a (0; −2) pontból indul, minden lépésben 1-et halad jobbra és 2-t fel (y = 2x − 2). Egy másik bolha olyan pontokra ugrik, ahol x + y = 7 (x, y ≥ 0). Melyik pontban találkoznak?',
        figure: <FleaGridSvg size={220} />,
        options: [
          '(3; 4)',
          '(2; 5)',
          '(4; 3)',
          '(1; 6)'
        ],
        correctAnswer: 0,
        hint: 'Metszéspont keresése: y = 2x − 2 és y = 7 − x.',
        explanation: '2x − 2 = 7 − x ⟹ 3x = 9 ⟹ x = 3. Ekkor y = 2·3 − 2 = 4 (illetve 7 − 3 = 4). Mindkét feltétel teljesül: a (3; 4) pontot mindkét bolha érinti.'
      },
      {
        id: 'glq3-7',
        questionTypeBadge: 'Paraméteres Elemzés',
        question: 'Milyen k érték esetén van végtelen sok megoldása a 3x − 6y = 9 és x − 2y = k egyenletrendszernek?',
        options: [
          'k = 3',
          'k = 9',
          'k = −3',
          'k = 0'
        ],
        correctAnswer: 0,
        hint: 'Oszd el az első egyenletet 3-mal!',
        explanation: 'Az első egyenletet 3-mal osztva: x − 2y = 3. Ahhoz, hogy végtelen sok megoldás legyen, a két egyenesnek egybe kell esnie, vagyis k = 3 kell legyen.'
      },
      {
        id: 'glq3-8',
        questionTypeBadge: 'Érettségi Feladat (Büfé)',
        question: 'Péter 2 szendvicset és 2 ásványvizet vett 740 Ft-ért. Pál 3 szendvicset és 1 ásványvizet vett 890 Ft-ért. Mennyibe kerül 1 szendvics (x) és 1 ásványvíz (y)?',
        options: [
          'Szendvics = 260 Ft, Ásványvíz = 110 Ft',
          'Szendvics = 250 Ft, Ásványvíz = 120 Ft',
          'Szendvics = 270 Ft, Ásványvíz = 100 Ft',
          'Szendvics = 280 Ft, Ásványvíz = 90 Ft'
        ],
        correctAnswer: 0,
        hint: '2x + 2y = 740 ⟹ x + y = 370. Második: 3x + y = 890. Vond ki a kettőt!',
        explanation: '2x + 2y = 740 ⟹ x + y = 370 ⟹ y = 370 − x. Ezt beírva: 3x + 370 − x = 890 ⟹ 2x = 520 ⟹ x = 260 Ft (szendvics). y = 370 − 260 = 110 Ft (ásványvíz). Ellenőrzés: 3·260 + 110 = 780 + 110 = 890 Ft ✓.'
      },
      {
        id: 'glq3-9',
        questionTypeBadge: 'Kétjegyű Számok',
        question: 'Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, 27-tel nagyobb számot kapunk. Melyik ez a szám?',
        options: [
          '36',
          '45',
          '27',
          '18'
        ],
        correctAnswer: 0,
        hint: 'Eredeti szám: 10t + e, számjegyek összege: t + e = 9. Új szám: 10e + t = 10t + e + 27 ⟹ 9e − 9t = 27 ⟹ e − t = 3.',
        explanation: 'Egyenletrendszer: t + e = 9 és e − t = 3. Összeadva: 2e = 12 ⟹ e = 6 (egyesek), t = 3 (tízesek). Az eredeti szám a 36. Felcserélve: 63, és 63 − 36 = 27 ✓.'
      },
      {
        id: 'glq3-10',
        questionTypeBadge: 'Középpontos Átló és Metszéspont',
        question: 'Adott az y = 2x − 4 és y = −0,5x + 6 egyenes. Milyen szöget zárnak be egymással, és mi a metszéspontjuk?',
        options: [
          'Derékszöget (90°) zárnak be, és metszéspontjuk a (4; 4)',
          '45°-os szöget zárnak be, metszéspontjuk a (2; 0)',
          'Párhuzamosak, nincs metszéspontjuk',
          'Derékszöget zárnak be, metszéspontjuk a (0; −4)'
        ],
        correctAnswer: 0,
        hint: 'm₁ = 2 és m₂ = −0,5. Mivel m₁ · m₂ = −1, az egyenesek merőlegesek!',
        explanation: 'Mivel a meredekségek szorzata 2 · (−0,5) = −1, a két egyenes merőleges egymásra (90°-os szög). A metszéspont: 2x − 4 = −0,5x + 6 ⟹ 2,5x = 10 ⟹ x = 4. y = 2·4 − 4 = 4. A metszéspont az M(4; 4).'
      }
    ]
  }
};

export const GraphicLinearQuiz: React.FC<GraphicLinearQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="1. Egyenletrendszerek grafikus megoldása – Kvíz"
      subtitle="Gyakorold a metszéspontok leolvasását, a megoldásszám vizsgálatát és a szöveges modellezést 30 interaktív feladaton keresztül!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 7. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Egyenletrendszerek Segédlet • Grafikus megoldás"
      initialGameMode={initialGameMode}
      matcherComponent={
        <GraphicLinearMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <GraphicLinearSorter
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

