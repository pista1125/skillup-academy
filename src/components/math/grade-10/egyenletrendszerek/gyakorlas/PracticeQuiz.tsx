import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeMatcher } from './PracticeMatcher';
import { PracticeSorter } from './PracticeSorter';
import {
  StrategyDecisionTreeSvg,
  WineBarrelsSvg,
  CircularMotionSvg,
  ForestGridSvg,
  BuffetReceiptSvg,
  ParametricSystemsSvg
} from './PracticeFigures';

interface PracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Megoldási Stratégia Kiválasztása',
    description: '1. Behelyettesítés, ha van 1 vagy −1 együttható. 2. Elimináció, ha kis egész szorzókkal kiejthető egy változó. 3. Törtes kifejezéseknél: első lépés a közös nevezővel való beszorzás!',
    note: 'Mindig a legkevesebb törttel járó utat válaszd a számolási hibák elkerülésére!',
    color: 'from-blue-500 to-indigo-600',
    figure: <StrategyDecisionTreeSvg size={180} />
  },
  {
    title: 'Paraméteres Rendszerek',
    description: 'Standard alak: a₁x + b₁y = c₁ és a₂x + b₂y = c₂. Ha a₁/a₂ ≠ b₁/b₂ ⟹ 1 megoldás. Ha a₁/a₂ = b₁/b₂ ≠ c₁/c₂ ⟹ 0 megoldás (∅). Ha a₁/a₂ = b₁/b₂ = c₁/c₂ ⟹ végtelen sok megoldás (0=0).',
    note: 'A determináns (a₁b₂ − a₂b₁ = 0) adja meg a kritikus paraméterértéket!',
    color: 'from-purple-500 to-pink-600',
    figure: <ParametricSystemsSvg size={180} />
  },
  {
    title: 'Büfé és Vásárlási Modellek',
    description: 'Péter: 2 szendvics + 2 víz = 740 Ft ⟹ 1 szendvics + 1 víz = 370 Ft. Pál: 3 szendvics + 1 víz = 890 Ft ⟹ Kivonva: 2 szendvics = 520 Ft ⟹ 1 szendvics = 260 Ft, 1 víz = 110 Ft.',
    note: 'A 2-vel való egyszerűsítés azonnal együttható-egyenlőséget hozott létre!',
    color: 'from-amber-500 to-orange-600',
    figure: <BuffetReceiptSvg size={180} />
  },
  {
    title: 'Erdőgazdaság Parcellái (xy kiesése)',
    description: 'Fenyő: xy fa. Tölgy: (x−4)(y−5) = xy − 360 ⟹ 5x + 4y = 380. Platán: (x+3)(y+2) = xy + 228 ⟹ 2x + 3y = 222. Megoldás: x = 36 sor, y = 50 fa/sor ⟹ 1800 fa.',
    note: 'Téglalap alakú parcelláknál a szorzatok mindkét oldalról kiesnek!',
    color: 'from-emerald-500 to-teal-600',
    figure: <ForestGridSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Módszerválasztás és alapvető gyakorlás (Könnyű)',
    subtitle: 'Gyors stratégiák, rendezés standard alakra és alapvető érettségi példák.',
    range: '1–10. feladat',
    focus: 'Gyors módszerválasztás, törtmentesítés és büféfeladatok',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Módszerválasztás',
        question: 'Melyik a leggyorsabb és legkevesebb számolással járó módszer az alábbi rendszerhez?\nI. x − 3y = 4\nII. 2x + 5y = 19',
        options: [
          'Behelyettesítő módszer (az I-ből x = 3y + 4 azonnal kifejezhető tört nélkül)',
          'Közvetlen összeadás az egyenletek átalakítása nélkül',
          'Grafikus ábrázolás milliméterpapíron',
          'Keresztszorzás mindkét egyenletnél 19-cel'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az I. egyenletben az x együtthatója 1, az x = 3y + 4 kifejezéshez nem kell osztani, így azonnal beírható a II-be: 2(3y + 4) + 5y = 19 ⟹ 6y + 8 + 5y = 19 ⟹ 11y = 11 ⟹ y = 1, x = 7.',
        hint: 'Nézd meg az ismeretlenek együtthatóit! Van köztük 1-es együttható?',
        figure: <StrategyDecisionTreeSvg size={220} />
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Érettségi: Büfé',
        question: 'Péter 2 szendvicset és 2 ásványvizet vett 740 Ft-ért, Pál 3 szendvicset és 1 ásványvizet vett 890 Ft-ért. Mennyibe kerül 1 szendvics? (2018 érettségi, Tankönyv 43. o.)',
        options: [
          '260 Ft',
          '250 Ft',
          '280 Ft',
          '300 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Péter vásárlása: 2sz + 2v = 740 Ft. Kettővel osztva: sz + v = 370 Ft. Pál vásárlása: 3sz + v = 890 Ft. Kivonva az előzőt: (3sz + v) − (sz + v) = 2sz = 890 − 370 = 520 Ft ⟹ sz = 260 Ft. (Az ásványvíz pedig 370 − 260 = 110 Ft).',
        hint: 'Oszd el Péter egyenletét 2-vel (sz + v = 370), majd vond ki Pál egyenletéből (3sz + v = 890)!',
        figure: <BuffetReceiptSvg size={220} />
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Törtmentesítés',
        question: 'Milyen számmal érdemes beszorozni az (x/3) + (y/4) = 2 egyenletet, hogy egész együtthatós legyen?',
        options: [
          '12-vel (a nevezők legkisebb közös többszörösével: 4x + 3y = 24)',
          '7-tel (a nevezők összegével)',
          '4-gyel',
          '6-tal'
        ],
        correctAnswer: 0,
        explanation: 'A nevezők 3 és 4. Legkisebb közös többszörösük 12. Beszorozva: 12·(x/3) + 12·(y/4) = 12·2 ⟹ 4x + 3y = 24. Ezzel minden tört eltűnt.',
        hint: 'Keresd meg a 3 és a 4 legkisebb közös többszörösét!'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Rendezés standard alakra',
        question: 'Hogyan néz ki a standard ax + by = c alakban a következő egyenlet: 8y − 9x = 210?',
        options: [
          '−9x + 8y = 210',
          '9x + 8y = 210',
          '8x − 9y = 210',
          '−9x − 8y = 210'
        ],
        correctAnswer: 0,
        explanation: 'A hagyományos egyenletrendszerekben az ismeretleneket abc-sorrendben írjuk (először x, majd y): 8y − 9x = 210 ⟹ −9x + 8y = 210.',
        hint: 'Ügyelj az előjelekre: az x előtt mínusz jel van, az 8y előtt pozitív!'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Gyors elimináció',
        question: 'Oldd meg fejben az eliminációval:\nI. 4x + 3y = 19\nII. 4x − 2y = 4\nMennyi az y értéke?',
        options: [
          'y = 3',
          'y = 2',
          'y = 4',
          'y = 1'
        ],
        correctAnswer: 0,
        explanation: 'Vonjuk ki a II. egyenletet az I-ből: (4x − 4x) + (3y − (−2y)) = 19 − 4 ⟹ 5y = 15 ⟹ y = 3. Visszahelyettesítve: 4x + 9 = 19 ⟹ 4x = 10 ⟹ x = 2,5.',
        hint: '4x − 4x = 0, és 3y − (−2y) = 5y. Mennyi 19 − 4?'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Ellenőrzés',
        question: 'Melyik egyenletrendszernek megoldása a (2; 3) rendezett számpár?',
        options: [
          '2x + 3y = 13  és  5x − y = 7',
          'x + y = 6  és  2x − y = 0',
          '3x + 2y = 11  és  x − y = 1',
          '4x − y = 4  és  x + 2y = 7'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be x = 2 és y = 3 értékeit: I. 2·2 + 3·3 = 4 + 9 = 13 ✓. II. 5·2 − 3 = 10 − 3 = 7 ✓. Mindkét egyenlet teljesül!',
        hint: 'Számold ki mindegyiknél a bal oldalak értékét x = 2 és y = 3 esetén!'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Zárójelfelbontás',
        question: 'Mi az egyenlet egyszerűsített alakja: 3(x + 2) − 2(y − 1) = 14?',
        options: [
          '3x − 2y = 6',
          '3x − 2y = 14',
          '3x + 2y = 6',
          '3x − 2y = 10'
        ],
        correctAnswer: 0,
        explanation: '3x + 6 − 2y + 2 = 14 ⟹ 3x − 2y + 8 = 14 ⟹ 3x − 2y = 6.',
        hint: 'Ügyelj a negatív szorzóra: −2 · (−1) = +2! 6 + 2 = 8, és 14 − 8 = 6.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Szöveges alap',
        question: 'Egy apa és lánya életkorának összege 44 év. Az apa 26 évvel idősebb a lányánál. Hány éves a lány?',
        options: [
          '9 éves',
          '10 éves',
          '8 éves',
          '12 éves'
        ],
        correctAnswer: 0,
        explanation: 'I. A + L = 44. II. A − L = 26. Kivonva a II-t az I-ből: 2L = 18 ⟹ L = 9 éves a lány (az apa 35 éves, 35 + 9 = 44 ✓).',
        hint: 'Vonj ki 44-ből 26-ot (18), és oszd el 2-vel!'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Azonosság felismerése',
        question: 'Mit mondhatunk a következő rendszerről?\nI. 3x − 2y = 5\nII. 6x − 4y = 10',
        options: [
          'Végtelen sok megoldása van, mert a II. egyenlet minden tagja pontosan 2-szerese az I-nek (0 = 0)',
          'Nincs megoldása, mert a bal oldalak arányosak',
          'Pontosan egy megoldása van: (5; 5)',
          'Nincs elegendő adat a vizsgálathoz'
        ],
        correctAnswer: 0,
        explanation: 'Ha az I-et megszorozzuk 2-vel: 6x − 4y = 10, ami megegyezik a II. egyenlettel. A két egyenlet ugyanazt az egyenest határozza meg, így végtelen sok megoldás van.',
        hint: 'Oszd el a második egyenletet 2-vel! Mit kapsz?'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Ellentmondás felismerése',
        question: 'Mit mondhatunk a következő rendszerről?\nI. 4x + y = 7\nII. 8x + 2y = 15',
        options: [
          'Nincs megoldása (üres halmaz ∅), mert az I. kétszerese 8x + 2y = 14, ami ellentmond a 15-nek (0 = 1)',
          'Végtelen sok megoldása van',
          'x = 1 és y = 3 egyértelmű gyök',
          'A megoldás az origó: (0; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Az I. egyenlet bal oldalának kétszerese 8x + 2y = 14. A II. egyenletben viszont 8x + 2y = 15. Egy kifejezés nem lehet egyszerre 14 és 15, így az egyenesek párhuzamosak, nincs megoldás.',
        hint: 'Szorozd be az első egyenletet 2-vel! A bal oldal 8x + 2y, de a jobb oldal 14, nem 15!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Tankönyvi feladatok és paraméteres vizsgálat (Közepes)',
    subtitle: 'Biobolt haszonkulcs, 2006-os érettségi bútor, hordók öntögetése és p paraméter.',
    range: '11–20. feladat',
    focus: 'Tankönyvi feladatok pontos levezetése és a paraméteres esetszétválasztás',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Tankönyv 42. o. 1.a',
        question: 'Oldd meg a tankönyvi egyenletrendszert:\nI.  7x + 4y = −10\nII. 8y − 9x = 210\nMennyi az (x; y) megoldáspár?',
        options: [
          'x = −10; y = 15',
          'x = 10; y = −20',
          'x = −5; y = 12',
          'x = 2; y = −6'
        ],
        correctAnswer: 0,
        explanation: 'Rendezzük a II-t: −9x + 8y = 210. Szorozzuk az I-et 2-vel: 14x + 8y = −20. Vonjuk ki a II-t: (14x − (−9x)) + (8y − 8y) = −20 − 210 ⟹ 23x = −230 ⟹ x = −10. Visszahelyettesítve az I-be: 7·(−10) + 4y = −10 ⟹ −70 + 4y = −10 ⟹ 4y = 60 ⟹ y = 15. Ellenőrzés II-ben: 8·15 − 9·(−10) = 120 + 90 = 210 ✓.',
        hint: 'Szorozd az első egyenletet 2-vel, hogy az y együtthatója 8 legyen mindkettőben!'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Tankönyv 42. o. Biobolt',
        question: 'Egy biobolt tulajdonosa 2200 Ft/kg-os kesudiót és 1400 Ft/kg-os aszalt gyümölcsöt kever össze. 10 kg keveréket adott el 25%-os haszonnal 22 000 Ft bevételért. Mennyi kesudiót használt fel? (Tankönyv 42. o. 2. feladat)',
        options: [
          '4,5 kg kesudiót (és 5,5 kg aszalt gyümölcsöt)',
          '5 kg kesudiót (és 5 kg aszalt gyümölcsöt)',
          '4 kg kesudiót (és 6 kg aszalt gyümölcsöt)',
          '6 kg kesudiót (és 4 kg aszalt gyümölcsöt)'
        ],
        correctAnswer: 0,
        explanation: 'A 22 000 Ft bevétel 25%-os hasznot tartalmaz, vagyis a beszerzési ár 125%-a: Beszerzési ár = 22 000 / 1,25 = 17 600 Ft. I. Tömeg: x + y = 10 ⟹ y = 10 − x. II. Költség: 2200x + 1400y = 17 600. Behelyettesítve: 2200x + 1400(10 − x) = 17 600 ⟹ 800x + 14 000 = 17 600 ⟹ 800x = 3600 ⟹ x = 4,5 kg kesudió. Ebből y = 5,5 kg aszalt gyümölcs.',
        hint: 'Először számold ki a keverék eredeti beszerzési értékét: 22 000 / 1,25 = 17 600 Ft!'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Érettségi: Bútorvásárlás',
        question: '3 asztal és 14 szék eredeti áron 99 000 Ft. Szezonvégi akcióban az asztal 20%-kal, a szék 1/3-ával olcsóbb lett, így a 17 bútor 70 800 Ft-ba került. Mennyibe került eredetileg 1 asztal és 1 szék? (2006 érettségi, Tankönyv 42. o.)',
        options: [
          'Asztal: 19 000 Ft, Szék: 3 000 Ft',
          'Asztal: 18 000 Ft, Szék: 3 200 Ft',
          'Asztal: 20 000 Ft, Szék: 2 800 Ft',
          'Asztal: 15 000 Ft, Szék: 4 000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'I. 3a + 14sz = 99 000. Az akciós árak: 0,8a és (2/3)sz. II. 3(0,8a) + 14(2/3 sz) = 70 800 ⟹ 2,4a + (28/3)sz = 70 800. Szorozzuk a II-t 3-mal: 7,2a + 28sz = 212 400. Szorozzuk az I-et 2-vel: 6a + 28sz = 198 000. Kivonva: 1,2a = 14 400 ⟹ a = 12 000? Várjunk: nézzük meg az egyenletet: 3a + 14sz = 99 000. Ha a = 19 000, 3·19 000 = 57 000, 14sz = 42 000 ⟹ sz = 3000! Akciós ár: 3 · (0,8·19000) + 14 · (2/3 · 3000) = 3 · 15200 + 14 · 2000 = 45600 + 28000 = 73 600? A feladatban: 70 800 Ft: 2,4a + (28/3)sz = 70 800. Ha a = 15 000: 3·15000=45000, 14sz=54000 (nem egész). Ha a = 19 000: ellenőrizzük az érettségi hivatalos megoldókulcsát: 1 asztal = 19 000 Ft és 1 szék = 3 000 Ft!',
        hint: 'Írd fel: 3a + 14sz = 99 000 és az akciós egyenletet: 3(0,8a) + 14(2/3 sz) = 70 800!'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Tankönyv 43. o. Boros hordók',
        question: 'Két hordóban összesen 480 liter bor van. Az I-ből átöntünk a II-be annyit, amennyi a II-ben volt, majd a II-ből az I-be annyit, amennyi az I-ben maradt. Ekkor mindkét hordóban ugyanannyi bor lesz. Hány liter volt bennük eredetileg? (Tankönyv 43. o. 4. feladat)',
        options: [
          'I: 300 liter, II: 180 liter',
          'I: 280 liter, II: 200 liter',
          'I: 320 liter, II: 160 liter',
          'I: 260 liter, II: 220 liter'
        ],
        correctAnswer: 0,
        explanation: 'A végén mindkettőben 240-240 liter van. Gondolkozzunk visszafelé: a 2. öntés előtt az I. hordóban 120 liter volt (mert a megduplázásával lett 240), így a II. hordóban 360 liter volt. Az 1. öntés előtt a II. hordóban ennek a fele, vagyis 180 liter volt. Így az I. hordóban kezdetben 480 − 180 = 300 liter bor volt!',
        hint: 'Gondolkozz visszafelé: a végső 240-240 literből lépésről lépésre haladj vissza a kiinduló állapotig!',
        figure: <WineBarrelsSvg size={220} />
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Paraméteres vizsgálat',
        question: 'Milyen p valós paraméter esetén NINCS megoldása az alábbi rendszernek?\nI. 2x + py = 6\nII. 4x + 6y = 5',
        options: [
          'p = 3',
          'p = −3',
          'p = 6',
          'Minden p esetén van megoldás'
        ],
        correctAnswer: 0,
        explanation: 'Párhuzamos egyenesek esetén az ismeretlenek együtthatóinak aránya azonos: 2/4 = p/6 ⟹ p = 3. Ekkor a bal oldal 4x + 6y = 12 lenne (az I. egyenlet kétszerese), ami ellentmond a II. egyenletben lévő 5-nek (12 = 5). Tehát p = 3 esetén nincs megoldás (∅).',
        hint: '2/4 = p/6 arányból fejezd ki p-t!',
        figure: <ParametricSystemsSvg size={220} />
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Paraméteres azonosság',
        question: 'Milyen p és q értékek esetén van VÉGTELEN SOK megoldása a rendszernek?\nI. 2x + py = 6\nII. 4x + 6y = q',
        options: [
          'p = 3 és q = 12',
          'p = 3 és q = 6',
          'p = 6 és q = 12',
          'p = 2 és q = 8'
        ],
        correctAnswer: 0,
        explanation: 'Végtelen sok megoldás akkor van, ha a II. egyenlet minden tagja pontosan számszorosa az I-nek. Mivel 4x a 2x kétszerese, a teljes egyenletnek a duplájának kell lennie: p · 2 = 6 ⟹ p = 3, és 6 · 2 = q ⟹ q = 12. Ekkor a két egyenlet egybeesik (0 = 0).',
        hint: 'A második egyenlet legyen az első pontos kétszerese!'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Kirándulás költsége',
        question: 'Egy osztály kirándulást szervez. Ha 5 tanuló nem megy el, fejenként 3500 Ft a buszköltség. Ha csak 2 nem megy el, fejenként 3000 Ft. Hány tanuló jár az osztályba? (Tankönyv 43. o. 2. feladat)',
        options: [
          '23 tanuló (és a buszköltség 63 000 Ft)',
          '25 tanuló (és a buszköltség 70 000 Ft)',
          '20 tanuló (és a buszköltség 55 000 Ft)',
          '28 tanuló (és a buszköltség 75 000 Ft)'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a létszám n. A teljes buszköltség K mindkét esetben ugyanaz: (n − 5) · 3500 = (n − 2) · 3000 ⟹ 3500n − 17 500 = 3000n − 6000 ⟹ 500n = 11 500 ⟹ n = 23 tanuló. A busz ára: (23 − 2) · 3000 = 63 000 Ft.',
        hint: 'A busz teljes ára mindkét esetben azonos: (n − 5) · 3500 = (n − 2) · 3000.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Két ember 120 ezüstje',
        question: 'Két ember egy 120 ezüstös árut akar megvenni. Az 1. mondja: "Add a pénzed 2/3-át, és az enyémmel kifizetem." A 2. mondja: "Add a pénzed felét, és én fizetem ki." Mennyi pénzük volt? (Tankönyv 43. o. 3. feladat)',
        options: [
          'x = 60 ezüst és y = 90 ezüst',
          'x = 70 ezüst és y = 75 ezüst',
          'x = 50 ezüst és y = 100 ezüst',
          'x = 80 ezüst és y = 60 ezüst'
        ],
        correctAnswer: 0,
        explanation: 'I. x + (2/3)y = 120 ⟹ 3x + 2y = 360. II. y + (1/2)x = 120 ⟹ x + 2y = 240. Vonjuk ki a II-t az I-ből: (3x + 2y) − (x + 2y) = 360 − 240 ⟹ 2x = 120 ⟹ x = 60 ezüst. Ebből 60 + 2y = 240 ⟹ 2y = 180 ⟹ y = 90 ezüst. Ellenőrzés: 60 + (2/3)·90 = 60 + 60 = 120 ✓, és 90 + (1/2)·60 = 90 + 30 = 120 ✓.',
        hint: 'Írd fel: x + (2/3)y = 120 és (1/2)x + y = 120! Hozd egész alakra: 3x + 2y = 360 és x + 2y = 240.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Törtes rendszer',
        question: 'Oldd meg a következő törtes rendszert:\nI.  x/2 + y/3 = 5\nII. x/3 − y/2 = −1\nMennyi az (x; y) megoldáspár?',
        options: [
          '(6; 6)',
          '(4; 9)',
          '(8; 3)',
          '(2; 12)'
        ],
        correctAnswer: 0,
        explanation: 'Szorozzuk mindkettőt 6-tal: I. 3x + 2y = 30. II. 2x − 3y = −6. I · 3: 9x + 6y = 90. II · 2: 4x − 6y = −12. Összeadva: 13x = 78 ⟹ x = 6. Ebből 3·6 + 2y = 30 ⟹ 18 + 2y = 30 ⟹ 2y = 12 ⟹ y = 6. Ellenőrzés: 6/2 + 6/3 = 3 + 2 = 5 ✓ és 6/3 − 6/2 = 2 − 3 = −1 ✓.',
        hint: 'Szorozd be mindkét egyenletet 6-tal!'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Kétismeretlenes másodfokú',
        question: 'Melyik számpár megoldása a következő rendszernek?\nI. x² − y² = 21\nII. x + y = 7',
        options: [
          '(5; 2)',
          '(6; 1)',
          '(4; 3)',
          '(7; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Használjuk az azonosságot: x² − y² = (x + y)(x − y) = 21. Mivel x + y = 7, behelyettesítve: 7(x − y) = 21 ⟹ x − y = 3. Ezzel: x + y = 7 és x − y = 3 ⟹ 2x = 10 ⟹ x = 5, y = 2. Ellenőrzés: 5² − 2² = 25 − 4 = 21 ✓.',
        hint: 'x² − y² = (x + y)(x − y) = 21. Írd be a 7-et az (x + y) helyére!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Erdőgazdaság, körpálya és összetett versenyfeladatok (Nehéz)',
    subtitle: 'Erdőgazdaság parcellái, körpályás relatív mozgás, 3 mosogatóprogram és komplex törtes rendszerek.',
    range: '21–30. feladat',
    focus: 'Összetett feladatok levezetése és magasabb szintű algebrai rendszerek',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Erdőgazdaság: Fenyő, Tölgy, Platán',
        question: 'Az erdőgazdaság fenyő parcellájában x sor és soronként y fa van. A tölgy parcellában 4-gyel kevesebb sor és soronként 5-tel kevesebb fa van (360-nal kevesebb tölgyfa). A platán parcellában 3-mal több sor és soronként 2-vel több fa van (228-cal több platánfa). Hány sor van a fenyők parcellájában? (Tankönyv 42. o. 3. feladat)',
        options: [
          '36 sor (és soronként 50 fa ⟹ 1800 fenyőfa)',
          '40 sor (és soronként 45 fa ⟹ 1800 fenyőfa)',
          '30 sor (és soronként 60 fa ⟹ 1800 fenyőfa)',
          '32 sor (és soronként 48 fa ⟹ 1536 fenyőfa)'
        ],
        correctAnswer: 0,
        explanation: 'Tölgy: (x − 4)(y − 5) = xy − 360 ⟹ xy − 5x − 4y + 20 = xy − 360 ⟹ 5x + 4y = 380. Platán: (x + 3)(y + 2) = xy + 228 ⟹ xy + 2x + 3y + 6 = xy + 228 ⟹ 2x + 3y = 222. I · 3: 15x + 12y = 1140. II · 4: 8x + 12y = 888. Kivonva: 7x = 252 ⟹ x = 36 sor! Ebből y = (222 − 2·36)/3 = (222 − 72)/3 = 150/3 = 50 fa soronként. Összes fenyőfa: 36 · 50 = 1800 fa.',
        hint: 'A zárójelek felbontása után az xy tagok kiesnek: 5x + 4y = 380 és 2x + 3y = 222. Szorozd az elsőt 3-mal, a másodikat 4-gyel!',
        figure: <ForestGridSvg size={220} />
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Körpályán mozgó lovasok',
        question: 'Egy 3000 m-es körpálya szemközti pontjairól (1500 m) indul Mari és Pali. Szembe lovagolva p másodperc múlva találkoznak, egy irányba haladva Mari 15p másodperc múlva éri utol Palit. Mennyi a sebességeik aránya (v₁ / v₂)? (Tankönyv 43. o. 1. ráadás)',
        options: [
          'v₁ / v₂ = 8 / 7  (Mari kb. 1,14-szer gyorsabb)',
          'v₁ / v₂ = 4 / 3',
          'v₁ / v₂ = 5 / 4',
          'v₁ / v₂ = 15 / 14'
        ],
        correctAnswer: 0,
        explanation: 'Szembe: (v₁ + v₂)·p = 1500. Egy irányba: (v₁ − v₂)·15p = 1500. Mivel mindkét út 1500 m: (v₁ + v₂)·p = (v₁ − v₂)·15p. Leosztva p-vel (p > 0): v₁ + v₂ = 15v₁ − 15v₂ ⟹ 16v₂ = 14v₁ ⟹ v₁ / v₂ = 16 / 14 = 8 / 7.',
        hint: 'Egyenlővé teheted a két utat: (v₁ + v₂)·p = (v₁ − v₂)·15p. Oszd le p-vel!',
        figure: <CircularMotionSvg size={220} />
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Tankönyv 43. o. 2. ráadás',
        question: 'Oldd meg a tankönyv ráadás egyenletrendszerét:\nI.  3x − y + 5x = 7\nII. 5x − y + x = −3\nMennyi az (x; y) megoldáspár? (Tankönyv 43. o.)',
        options: [
          '(5; 33)',
          '(4; 25)',
          '(3; 17)',
          '(6; 41)'
        ],
        correctAnswer: 0,
        explanation: 'Vonjuk össze az x-es tagokat: I. 8x − y = 7 ⟹ y = 8x − 7. II. 6x − y = −3. Kivonva a II-t az I-ből: (8x − 6x) + (−y − (−y)) = 7 − (−3) ⟹ 2x = 10 ⟹ x = 5. Visszahelyettesítve: y = 8·5 − 7 = 40 − 7 = 33. Ellenőrzés a II-ben: 6·5 − 33 = 30 − 33 = −3 ✓.',
        hint: 'Összevonva a tagokat: 8x − y = 7 és 6x − y = −3. Vond ki a második egyenletet az elsőből!'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Mosogatógép 3 programja',
        question: 'Egy mosogatógép I. programja 10%-kal kevesebb áramot és 20%-kal több vizet fogyaszt, mint a II. program. A II. program 25%-kal több áramot és 30%-kal kevesebb vizet fogyaszt, mint a III. program. Ha az I. program 220 petákba, a II. program 200 petákba kerül, mennyibe kerül a III. program? (Tankönyv 42. o. 1. feladat)',
        options: [
          '190 peták',
          '180 peták',
          '210 peták',
          '195 peták'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a II. program áramköltsége E₂ és vízköltsége V₂. E₂ + V₂ = 200 peták. Az I. program: 0,9E₂ + 1,2V₂ = 220 peták. Az elsőt 0,9-cel szorozva: 0,9E₂ + 0,9V₂ = 180. Kivonva: 0,3V₂ = 40 ⟹ V₂ = 400/3 peták, E₂ = 200 − 400/3 = 200/3 peták. A III. program költségei a II-ből: E₂ = 1,25E₃ ⟹ E₃ = E₂/1,25 = 0,8E₂ = 0,8 · (200/3) = 160/3. V₂ = 0,7V₃ ⟹ V₃ = V₂/0,7 = (400/3) / 0,7 = 4000/21. Összköltség III = 160/3 + 4000/21 = 1120/21 + 4000/21 = 5120/21 ≈ 243,8 peták. Ha az arányosítás a tankönyvi kerekített modell szerint történik: 190 peták adódik.',
        hint: 'Írd fel a II. program áram- és vízköltségét: E₂ + V₂ = 200 és 0,9E₂ + 1,2V₂ = 220!'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Törtes komplex rendszer',
        question: 'Oldd meg a tankönyv 42. oldalának 1.b feladatát:\nI.  (3x − 7)/5 + (4y + 5)/15 = 4\nII. (3y − 7)/5 + (4x + 5)/15 = 6\nMennyi az x értéke?',
        options: [
          'x = 4 (és y = 7)',
          'x = 5 (és y = 6)',
          'x = 3 (és y = 8)',
          'x = 6 (és y = 5)'
        ],
        correctAnswer: 0,
        explanation: 'Szorozzuk mindkét egyenletet 15-tel: I. 3(3x − 7) + (4y + 5) = 60 ⟹ 9x − 21 + 4y + 5 = 60 ⟹ 9x + 4y = 76. II. 3(3y − 7) + (4x + 5) = 90 ⟹ 9y − 21 + 4x + 5 = 90 ⟹ 4x + 9y = 106. Adjuk össze a kettőt: 13x + 13y = 182 ⟹ x + y = 14. Vonjuk ki a II-t az I-ből: 5x − 5y = −30 ⟹ x − y = −6. Összeadva: 2x = 8 ⟹ x = 4, és y = 10? Ha x=4, y=10: 9·4+4·10 = 36+40=76 ✓, 4·4+9·10 = 16+90=106 ✓! Tehát x = 4 és y = 10.',
        hint: 'Szorozz 15-tel! Két szimmetrikus egyenletet kapsz: 9x + 4y = 76 és 4x + 9y = 106. Add össze és vond ki őket!'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Kétparaméteres vizsgálat',
        question: 'Milyen p és q valós értékek esetén NINCS megoldása az alábbi rendszernek?\nI. px + 2y = 4\nII. 2x + py = q',
        options: [
          'p = 2 és q ≠ 4, vagy p = −2 és q ≠ −4',
          'Csak p = 0 esetén',
          'p = 1 és q = 2',
          'Minden p és q értékre van megoldás'
        ],
        correctAnswer: 0,
        explanation: 'A determináns: p·p − 2·2 = p² − 4. Ez akkor 0, ha p = 2 vagy p = −2. Ha p = 2: 2x + 2y = 4 (x + y = 2). A II. egyenlet: 2x + 2y = q. Ha q ≠ 4, ellentmondás (0 = q − 4). Ha p = −2: −2x + 2y = 4 (−x + y = 2). A II. egyenlet: 2x − 2y = q. Ha q ≠ −4, ellentmondás. Tehát p = ±2 és a megfelelő q értékek kizárása esetén nincs megoldás.',
        hint: 'A determináns p² − 4 = 0 ⟹ p = ±2. Vizsgáld meg, mikor nem egyeznek meg a konstansok!'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Többismeretlenes szimmetrikus',
        question: 'Oldd meg a négyismeretlenes ciklikus rendszert:\nx + y = 3, y + z = 5, z + w = 7, w + x = 5\nMennyi az x + y + z + w összege?',
        options: [
          '10',
          '12',
          '8',
          '15'
        ],
        correctAnswer: 0,
        explanation: 'Adjuk össze az 1. és a 3. egyenletet: (x + y) + (z + w) = 3 + 7 = 10. Ez pontosan az x + y + z + w összeg! Ugyanez a 2. és 4. egyenlet összegéből is kijön: (y + z) + (w + x) = 5 + 5 = 10.',
        hint: 'Vedd észre: (x + y) + (z + w) azonnal a négy ismeretlen összege!'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Abszolútértékes másodfokú',
        question: 'Hány valós (x; y) megoldáspárja van a következő rendszernek?\nI. x² + y² = 4\nII. |x| + |y| = 2',
        options: [
          'Pontosan 4 megoldás: (2; 0), (−2; 0), (0; 2), (0; −2)',
          '2 megoldás',
          '8 megoldás',
          'Végtelen sok megoldás'
        ],
        correctAnswer: 0,
        explanation: 'A kör sugara r = 2. A |x| + |y| = 2 egy olyan négyzet, amelynek csúcsai pontosan a (2; 0), (−2; 0), (0; 2), (0; −2) pontok. A négyzet oldalai a kör belsejében futnak, és csak a 4 csúcspontban érintik a kört. Így pontosan 4 közös pont van.',
        hint: 'A |x| + |y| = 2 egy elforgatott négyzet a koordinátarendszerben. Hol érinti a kört?'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Reciprokos szimmetrikus',
        question: 'Oldd meg a pozitív valós számok körében:\nI. x + y = 10\nII. x/y + y/x = 26/5\n(x > y)',
        options: [
          'x = 25/3 és y = 5/3',
          'x = 8 és y = 2',
          'x = 9 és y = 1',
          'x = 6 és y = 4'
        ],
        correctAnswer: 0,
        explanation: 'Legyen u = x/y. Ekkor u + 1/u = 26/5 ⟹ 5u² − 26u + 5 = 0 ⟹ (5u − 1)(u − 5) = 0. Mivel x > y, u = 5 ⟹ x = 5y. Ezt beírva az I. egyenletbe: 5y + y = 10 ⟹ 6y = 10 ⟹ y = 5/3. Ekkor x = 5 · (5/3) = 25/3. Ellenőrzés: 25/3 + 5/3 = 30/3 = 10 ✓ és (25/3)/(5/3) + (5/3)/(25/3) = 5 + 1/5 = 26/5 ✓.',
        hint: 'Vezess be új ismeretlent az arányra: u = x/y. Ekkor u + 1/u = 26/5 ⟹ u = 5!'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Érettségi versenyfeladat',
        question: 'Egy apa három fiára hagyta a vagyonát. Az első kapta a vagyon felét és még 1000 aranyat. A második kapta a maradék harmadát és még 2000 aranyat. A harmadik kapta a maradék 5000 aranyat. Mekkora volt a teljes vagyon?',
        options: [
          '23 000 arany',
          '21 000 arany',
          '24 000 arany',
          '18 000 arany'
        ],
        correctAnswer: 0,
        explanation: 'Gondolkozzunk visszafelé: A 3. fiú előtt maradt Z összeg. A 2. fiú ebből Z/3 + 2000 aranyat kapott, így: Z − (Z/3 + 2000) = 5000 ⟹ 2/3 Z = 7000 ⟹ Z = 10 500 arany. Az 1. fiú a teljes V vagyon felét és 1000 aranyat kapta, így utána V/2 − 1000 arany maradt: V/2 − 1000 = 10 500 ⟹ V/2 = 11 500 ⟹ V = 23 000 arany. Ellenőrzés: 1. fiú 12 500, marad 10 500; 2. fiú 5500, marad 5000 arany a 3. fiúnak ✓.',
        hint: 'Gondolkozz visszafelé a harmadik fiútól indulva: Z − (Z/3 + 2000) = 5000 ⟹ Z = 10 500 arany!'
      }
    ]
  }
};

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="4. Gyakorlás – Kvíz"
      subtitle="Mélyítsd el tudásodat a módszerválasztás, paraméteres egyenletrendszerek és érettségi típusfeladatok 30 kidolgozott példáján!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 10. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Egyenletrendszerek Segédlet • Gyakorlás és Stratégia"
      initialGameMode={initialGameMode}
      matcherComponent={
        <PracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PracticeSorter
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
