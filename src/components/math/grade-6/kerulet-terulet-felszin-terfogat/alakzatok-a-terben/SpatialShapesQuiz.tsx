import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { SpatialShapesMatcher } from './SpatialShapesMatcher';
import { SpatialShapesSorter } from './SpatialShapesSorter';

interface SpatialShapesQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-classification',
    title: '1. Testek Csoportosítása',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Poliéderek (soklapúak):</strong> Csak síklapok határolják (kocka, téglatest, hasábok, gúlák).</div>
        <div><strong>Forgástestek:</strong> Görbe határoló felületük is van (henger, kúp, gömb).</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          Kocka és téglatest: 8 csúcs, 12 él, 6 lap.
        </div>
      </div>
    )
  },
  {
    id: 'cs-euler',
    title: '2. Euler-féle Poliédertétel',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> C + L = É + 2 (konvex poliéderekre)</div>
        <div><strong>C:</strong> csúcsok száma, <strong>L:</strong> lapok száma, <strong>É:</strong> élek száma</div>
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          Átrendezve: C = É + 2 - L és É = C + L - 2
        </div>
      </div>
    )
  },
  {
    id: 'cs-prisms-pyramids',
    title: '3. Hasábok és Gúlák Szabályai',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>n-oldalú hasáb:</strong> C = 2n, É = 3n, L = n + 2</div>
        <div><strong>n-oldalú gúla:</strong> C = n + 1, É = 2n, L = n + 1</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Tetraéder: 4 csúcs, 6 él, 4 lap (a legegyszerűbb poliéder).
        </div>
      </div>
    )
  },
  {
    id: 'cs-nets-views',
    title: '4. Testhálók és Nézetek',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Kockaháló:</strong> A kockának pontosan 11 különböző síkbeli hálója van.</div>
        <div><strong>Henger hálója:</strong> 1 téglalap (palást) + 2 azonos kör (alapok).</div>
        <div><strong>Kúp hálója:</strong> 1 körcikk (palást) + 1 kör (alaplap).</div>
        <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
          Nézetek: Elölnézet (szemből), Felülnézet (fentről), Oldalnézet (oldalról).
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // --- 1. SZINT: ALAPFOGALMAK ÉS TESTELEMEK (1-10) ---
  {
    id: 'q1-1',
    level: 1,
    title: 'Kocka csúcsai',
    question: 'Hány csúcsa (C) van egy kockának?',
    options: ['8', '6', '12', '4'],
    correctAnswer: '8',
    explanation: 'A kockának 8 csúcsa van: 4 az alsó alaplapon és 4 a felső fedőlapon.'
  },
  {
    id: 'q1-2',
    level: 1,
    title: 'Téglatest élei',
    question: 'Hány éle (É) van egy téglatestnek?',
    options: ['12', '8', '6', '16'],
    correctAnswer: '12',
    explanation: 'A téglatestnek 12 éle van: 4 az alsó lapon, 4 a felső lapon és 4 függőleges oldalél köti össze őket.'
  },
  {
    id: 'q1-3',
    level: 1,
    title: 'Poliéder fogalma',
    question: 'Melyik test NEM tartozik a poliéderek (soklapú testek) közé?',
    options: ['Egyenes körhenger', 'Téglatest', 'Szabályos tetraéder', 'Négyzetes gúla'],
    correctAnswer: 'Egyenes körhenger',
    explanation: 'A henger nem poliéder, mert van görbe határoló felülete (palástja). A henger forgástest.'
  },
  {
    id: 'q1-4',
    level: 1,
    title: 'Négyzet alapú gúla lapjai',
    question: 'Hány lapja (L) van egy négyzet alapú gúlának összesen?',
    options: ['5', '4', '6', '8'],
    correctAnswer: '5',
    explanation: '1 négyzet alakú alaplapja és 4 háromszög alakú oldallapja (palástja) van, így összesen 5 lap határolja.'
  },
  {
    id: 'q1-5',
    level: 1,
    title: 'A téglatest lapjai',
    question: 'Milyen síkidomok határolják a téglatestet?',
    options: ['6 téglalap', '6 négyzet', '4 téglalap és 2 háromszög', '8 sokszög'],
    correctAnswer: '6 téglalap',
    explanation: 'A téglatestet 6 darab téglalap lap határolja, amelyek páronként egybevágóak és párhuzamosak.'
  },
  {
    id: 'q1-6',
    level: 1,
    title: 'Tetraéder elemei',
    question: 'Hány csúcsa van a szabályos tetraédernek (háromoldalú gúlának)?',
    options: ['4', '5', '6', '3'],
    correctAnswer: '4',
    explanation: 'A tetraédernek 3 csúcsa van a háromszög alaplapján és 1 a tetején, így összesen 4 csúcsa van.'
  },
  {
    id: 'q1-7',
    level: 1,
    title: 'Az él definíciója',
    question: 'Mi a geometriai él egy poliéderen?',
    options: [
      'Két szomszédos lap közös metszésvonala (szakasza)',
      'Három él találkozási pontja',
      'A test belsejében futó egyenes',
      'A test legnagyobb kiterjedése'
    ],
    correctAnswer: 'Két szomszédos lap közös metszésvonala (szakasza)',
    explanation: 'Az él két szomszédos határoló síklap közös határvonala, azaz egy egyenes szakasz.'
  },
  {
    id: 'q1-8',
    level: 1,
    title: 'Forgástest keletkezése',
    question: 'Milyen test keletkezik, ha egy téglalapot az egyik oldala körül megforgatunk 360 fokkal?',
    options: ['Egyenes körhenger', 'Egyenes körkúp', 'Gömb', 'Téglatest'],
    correctAnswer: 'Egyenes körhenger',
    explanation: 'A téglalap forgatási tengelye a henger magassága lesz, a forgó szemközti oldal pedig a palástot súrolja: létrejön az egyenes körhenger.'
  },
  {
    id: 'q1-9',
    level: 1,
    title: 'A gömb tulajdonságai',
    question: 'Melyik állítás IGAZ a geometriai gömbre?',
    options: [
      'Nincs csúcsa és nincs éle, felülete egyetlen zárt görbe felület',
      'Pontosan 2 csúcsa van az északi és déli sarkon',
      '1 éle van az egyenlítő mentén',
      'A gömb a poliéderek közé tartozik'
    ],
    correctAnswer: 'Nincs csúcsa és nincs éle, felülete egyetlen zárt görbe felület',
    explanation: 'A gömb minden pontja egyenlő távolságra van a középponttól; sima görbe felület, így nincsenek csúcsai és nincsenek élei.'
  },
  {
    id: 'q1-10',
    level: 1,
    title: 'Háromoldalú hasáb lapjai',
    question: 'Hány lapja van egy háromoldalú (háromszög alapú) hasábnak?',
    options: ['5 lap', '6 lap', '4 lap', '7 lap'],
    correctAnswer: '5 lap',
    explanation: '2 háromszög alaplap (alsó és felső) és 3 téglalap alakú oldallap alkotja, összesen 2 + 3 = 5 lap.'
  },

  // --- 2. SZINT: EULER-TÉTEL ÉS RÉSZLETES TULAJDONSÁGOK (11-20) ---
  {
    id: 'q2-1',
    level: 2,
    title: 'Euler-féle poliédertétel',
    question: 'Melyik képlet fejezi ki helyesen az Euler-féle poliédertételt konvex testekre?',
    options: ['C + L = É + 2', 'C + É = L + 2', 'C · L = É + 2', 'C + L + É = 2'],
    correctAnswer: 'C + L = É + 2',
    explanation: 'Minden konvex poliéderre igaz, hogy a csúcsok (C) és lapok (L) számának összege 2-vel nagyobb az élek (É) számánál: C + L = É + 2.'
  },
  {
    id: 'q2-2',
    level: 2,
    title: 'Csúcsok kiszámítása Eulerrel',
    question: 'Egy konvex testnek 6 lapja és 12 éle van. Hány csúcsa van a testnek?',
    options: ['8', '6', '10', '12'],
    correctAnswer: '8',
    explanation: 'Euler-tétel: C + 6 = 12 + 2 = 14. Ebből C = 14 - 6 = 8. (Ez a kocka vagy a téglatest).'
  },
  {
    id: 'q2-3',
    level: 2,
    title: 'Háromoldalú hasáb élei',
    question: 'Hány éle van egy háromoldalú hasábnak összesen?',
    options: ['9 él', '6 él', '12 él', '8 él'],
    correctAnswer: '9 él',
    explanation: '3 él az alsó háromszögön, 3 él a felső háromszögön és 3 függőleges oldalél köti össze őket: összesen 3 · 3 = 9 él.'
  },
  {
    id: 'q2-4',
    level: 2,
    title: 'Kúp kiterített palástja',
    question: 'Milyen alakú síkidom keletkezik, ha egy egyenes körkúp palástját kiterítjük a síkba?',
    options: ['Körcikk', 'Téglalap', 'Háromszög', 'Félkör mindig'],
    correctAnswer: 'Körcikk',
    explanation: 'A kúp palástja kiterítve egy körcikk, amelynek ívhossza megegyezik a kúp alapköre kerületével, sugara pedig a kúp alkotója.'
  },
  {
    id: 'q2-5',
    level: 2,
    title: 'Gúla alaplapja a csúcsszámból',
    question: 'Egy gúlának összesen 7 csúcsa van. Hány oldalú sokszög az alaplapja?',
    options: ['Hatszög', 'Hétszög', 'Ötszög', 'Nyolcszög'],
    correctAnswer: 'Hatszög',
    explanation: 'A gúla csúcsainak száma: C = n + 1 (ahol n az alaplap oldalainak száma). Ha C = 7, akkor n = 7 - 1 = 6, azaz hatszög alapú gúla.'
  },
  {
    id: 'q2-6',
    level: 2,
    title: 'Henger kiterített palástja',
    question: 'Milyen síkidom keletkezik, ha egy egyenes körhenger palástját a magassága mentén felvágjuk és kiterítjük?',
    options: ['Téglalap', 'Négyzet mindig', 'Körcikk', 'Ellipszis'],
    correctAnswer: 'Téglalap',
    explanation: 'A henger palástja síkba kiterítve egy téglalap, amelynek egyik oldala a henger magassága (m), a másik oldala az alaplap kerülete (K = 2·r·π).'
  },
  {
    id: 'q2-7',
    level: 2,
    title: 'Élek számítása Eulerrel',
    question: 'Egy testnek 5 csúcsa és 5 lapja van. Hány éle van a testnek?',
    options: ['8 él', '6 él', '10 él', '7 él'],
    correctAnswer: '8 él',
    explanation: 'C + L = É + 2 -> 5 + 5 = É + 2 -> 10 = É + 2 -> É = 8. Ez egy négyzet alapú gúla.'
  },
  {
    id: 'q2-8',
    level: 2,
    title: 'Téglatest testátlói',
    question: 'Hány testátlója van egy téglatestnek?',
    options: ['4', '8', '6', '2'],
    correctAnswer: '4',
    explanation: 'A téglatest 8 csúcsa 4 szemközti párt alkot, amelyek összekötésével 4 egyenlő hosszúságú, egy pontban metsző testátlót kapunk.'
  },
  {
    id: 'q2-9',
    level: 2,
    title: 'n-oldalú hasáb élei',
    question: 'Hány éle van egy n-oldalú hasábnak?',
    options: ['3n', '2n', 'n + 2', '4n'],
    correctAnswer: '3n',
    explanation: 'n él van az alsó alapon, n él a felső alapon és n oldalél köti össze őket, így összesen n + n + n = 3n él van.'
  },
  {
    id: 'q2-10',
    level: 2,
    title: 'Ötszög alapú hasáb elemei',
    question: 'Hány lapja (L), csúcsa (C) és éle (É) van egy ötszög alapú hasábnak?',
    options: [
      'L = 7, C = 10, É = 15',
      'L = 6, C = 10, É = 12',
      'L = 7, C = 12, É = 15',
      'L = 5, C = 10, É = 15'
    ],
    correctAnswer: 'L = 7, C = 10, É = 15',
    explanation: 'n = 5. L = n + 2 = 7; C = 2n = 10; É = 3n = 15. Ellenőrzés Eulerrel: 10 + 7 = 15 + 2 = 17 ✓.'
  },

  // --- 3. SZINT: HÁLÓK, NÉZETEK ÉS ÖSSZETETT FELADVÁNYOK (21-30) ---
  {
    id: 'q3-1',
    level: 3,
    title: 'Kockahálók száma',
    question: 'Hányféle különböző (forgatással és tükrözéssel egymásba nem vihető) síkbeli hálója van a kockának?',
    options: ['11', '6', '8', '14'],
    correctAnswer: '11',
    explanation: 'Matematikailag igazolt tény, hogy a kockának pontosan 11 különböző síkbeli hálózata létezik.'
  },
  {
    id: 'q3-2',
    level: 3,
    title: 'Henger elölnézete',
    question: 'Ha az alaplapján álló egyenes körhengert vízszintesen, pontosan szemből nézzük (elölnézet), milyen alakzatot látunk?',
    options: ['Téglalap', 'Kör', 'Ellipszis', 'Trapéz'],
    correctAnswer: 'Téglalap',
    explanation: 'A merőleges vetület szemből vetítve egy téglalap, melynek szélessége a henger átmérője (2r), magassága a henger magassága (m).'
  },
  {
    id: 'q3-3',
    level: 3,
    title: 'Kúp felülnézete',
    question: 'Milyen alakzatot látunk, ha egy alaplapján álló egyenes körkúpot függőlegesen fentről (felülnézet) tekintünk meg?',
    options: [
      'Egy körlapot, közepén egy ponttal (a csúccsal)',
      'Egy háromszöget',
      'Egy körcikket',
      'Csak egyetlen pontot'
    ],
    correctAnswer: 'Egy körlapot, közepén egy ponttal (a csúccsal)',
    explanation: 'Fentről a kör alaplap látszik, pontosan a középpontjában pedig a kúp legfelső csúcsának merőleges vetülete.'
  },
  {
    id: 'q3-4',
    level: 3,
    title: 'Kockaépítmény kiskockáinak száma',
    question: 'Egy kockaépítmény alaprajza 2×2-es, és a mezőkbe írt magasságok rendre: 1, 2, 3 és 1. Hány darab kiskockából áll az építmény?',
    options: ['7 darabból', '8 darabból', '6 darabból', '9 darabból'],
    correctAnswer: '7 darabból',
    explanation: 'Az egyes oszlopokban lévő kockák számát egyszerűen összeadjuk: 1 + 2 + 3 + 1 = 7 kiskocka.'
  },
  {
    id: 'q3-5',
    level: 3,
    title: 'Test azonosítása',
    question: 'Egy poliédernek 10 csúcsa és 7 lapja van. Melyik test ez biztosan?',
    options: ['Ötszög alapú hasáb', 'Hatszög alapú gúla', 'Négyzetes hasáb', 'Nyolcoldalú gúla'],
    correctAnswer: 'Ötszög alapú hasáb',
    explanation: 'C = 10 = 2·5 (hasáb 5 oldalú alaplappal), L = 5 + 2 = 7 lap. Ez az ötszög alapú hasáb.'
  },
  {
    id: 'q3-6',
    level: 3,
    title: 'Létezhet-e 7 élű poliéder?',
    question: 'Létezhet-e olyan konvex poliéder a térben, amelynek pontosan 7 éle van?',
    options: [
      'Nem létezhet ilyen poliéder',
      'Igen, a hétszög alapú gúla',
      'Igen, a háromoldalú hasáb',
      'Igen, ha trapéz az alapja'
    ],
    correctAnswer: 'Nem létezhet ilyen poliéder',
    explanation: 'A legkisebb élszámú poliéder a tetraéder (6 él). Gúláknál É = 2n (páros: 6, 8, 10...), hasáboknál É = 3n (3 többszöröse: 6, 9, 12...). Nincs 7 élű konvex poliéder!'
  },
  {
    id: 'q3-7',
    level: 3,
    title: 'Hibás kockaháló felismerése',
    question: 'Miért NEM lehet kockaháló 6 darab négyzet, ha mind a 6 egymás után, egyetlen egyenes sorban (1×6 sáv) csatlakozik egymáshoz?',
    options: [
      'Mert összetekeréskor 4 oldal fedné egymást, és nem lenne fedőlap meg alaplap',
      'Mert 6 négyzetből nem lehet kockát hajtani',
      'Mert a kockának 8 lapja van',
      'Mert a négyzetek oldalai nem érnek össze'
    ],
    correctAnswer: 'Mert összetekeréskor 4 oldal fedné egymást, és nem lenne fedőlap meg alaplap',
    explanation: 'Ha egy sorban van 6 négyzet, a 4. lap után a lapok átfedik a palástot, a két végére pedig nem jut alsó és felső fedőlap.'
  },
  {
    id: 'q3-8',
    level: 3,
    title: 'Henger kiterített palástjának mérete',
    question: 'Egy egyenes körhenger alapjának sugara r = 5 cm, magassága m = 8 cm. Mekkora a kiterített téglalap alakú palást alapéle (π ≈ 3,14)?',
    options: ['31,4 cm', '15,7 cm', '78,5 cm', '40 cm'],
    correctAnswer: '31,4 cm',
    explanation: 'A palást téglalapjának alapéle az alapkör kerülete: K = 2 · r · π = 2 · 5 · 3,14 = 31,4 cm.'
  },
  {
    id: 'q3-9',
    level: 3,
    title: 'Gúla éleinek felezése',
    question: 'Egy gúlának 16 éle van összesen. Hány lapja és hány csúcsa van a gúlának?',
    options: [
      '9 lap és 9 csúcs',
      '8 lap és 8 csúcs',
      '10 lap és 8 csúcs',
      '8 lap és 9 csúcs'
    ],
    correctAnswer: '9 lap és 9 csúcs',
    explanation: 'Gúla élei: É = 2n = 16 -> n = 8 (nyolcszög alapú gúla). Lapok száma: L = n + 1 = 9, csúcsok száma: C = n + 1 = 9.'
  },
  {
    id: 'q3-10',
    level: 3,
    title: 'Kocka nézetei',
    question: 'Melyik állítás igaz egy tetszőleges kocka elölnézetére, felülnézetére és bal oldali nézetére?',
    options: [
      'Mindhárom nézet pontosan ugyanolyan egybevágó négyzet',
      'Az elölnézet téglalap, a többi négyzet',
      'A felülnézet kisebb négyzet mint az elölnézet',
      'Mindhárom nézet rombusz'
    ],
    correctAnswer: 'Mindhárom nézet pontosan ugyanolyan egybevágó négyzet',
    explanation: 'Mivel a kocka minden lapja egybevágó négyzet, bármelyik merőleges irányból (elölről, felülről, oldalról) nézzük, mindig ugyanazt a négyzetet kapjuk vetületként.'
  }
];

export const SpatialShapesQuiz: React.FC<SpatialShapesQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Alakzatok a térben kvíz"
      subtitle="Térbeli testek csoportosítása, csúcsok, élek, lapok, az Euler-féle poliédertétel, testhálók és nézetek 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="purple"
      topicId="g6-spatial-shapes-quiz"
      topicTitle="Alakzatok a térben"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={SpatialShapesMatcher as any}
      sorterComponent={SpatialShapesSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default SpatialShapesQuiz;
