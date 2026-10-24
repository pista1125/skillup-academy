import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CountingContMatcher } from './CountingContMatcher';
import { CountingContSorter } from './CountingContSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface CountingContQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Permutációk és Faktoriális Alapjai (Könnyű)',
    subtitle: 'Faktoriális értékek, sorbarendezések polcon, dobogón és alapvető kézfogások.',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak és Számítások',
    questions: [
      {
        id: 'cq1-1',
        questionTypeBadge: 'Könyvek a Polcon',
        question: 'Hányféleképpen rakhatunk sorba 4 különböző könyvet egy könyvespolcon?',
        options: ['24 féleképpen', '16 féleképpen', '12 féleképpen', '4 féleképpen'],
        correctAnswer: 0,
        hint: 'Az első helyre 4, a másodikra 3, a harmadikra 2, a negyedikre 1 könyv tehető: 4!.',
        explanation: 'A szorzási szabály szerint: 4 · 3 · 2 · 1 = 4! = 24 különböző sorrend lehetséges.',
        breakdown: [
          '1. helyre 4 könyv választható',
          '2. helyre a maradék 3 könyv',
          '3. helyre a maradék 2 könyv',
          '4. helyre a maradék 1 könyv',
          'Összes eset: 4 · 3 · 2 · 1 = 24'
        ],
        figure: (
          <svg viewBox="0 0 200 70" className="w-52 h-18">
            <rect x="10" y="55" width="180" height="8" rx="2" fill="#64748b" />
            <rect x="25" y="15" width="28" height="40" rx="3" fill="#a855f7" />
            <text x="39" y="38" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">1.</text>
            <rect x="65" y="15" width="28" height="40" rx="3" fill="#3b82f6" />
            <text x="79" y="38" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">2.</text>
            <rect x="105" y="15" width="28" height="40" rx="3" fill="#10b981" />
            <text x="119" y="38" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">3.</text>
            <rect x="145" y="15" width="28" height="40" rx="3" fill="#f59e0b" />
            <text x="159" y="38" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">4.</text>
          </svg>
        )
      },
      {
        id: 'cq1-2',
        questionTypeBadge: 'Faktoriális Definíció',
        question: 'Mennyi 0! értéke a matematikai konvenció és definíció szerint?',
        options: ['1', '0', 'Nem értelmezett', '-1'],
        correctAnswer: 0,
        hint: 'Gondolj arra, hogy az üres halmazt egyetlen módon tudjuk elrendezni (üresen), illetve n! = n · (n-1)! alapján 1! = 1 · 0!.',
        explanation: 'A 0! értéke definíció szerint 1. Így működnek helyesen a kombinatorikai képletek (pl. n elem közül n kiválasztása).'
      },
      {
        id: 'cq1-3',
        questionTypeBadge: 'Futóverseny Sorrend',
        question: 'Hányféle sorrendben érhet célba 3 futó egy versenyen, ha nincs holtverseny?',
        options: ['6 sorrend', '9 sorrend', '3 sorrend', '12 sorrend'],
        correctAnswer: 0,
        hint: '3 futó sorbarendezése: 3! = 3 · 2 · 1.',
        explanation: 'Az első helyre 3, a másodikra 2, a harmadikra 1 futó érhet be: 3! = 6 lehetséges befutási sorrend van.'
      },
      {
        id: 'cq1-4',
        questionTypeBadge: 'Ültetés Padban',
        question: 'Egy 5 fős család tagjai egyenes padra ülnek le. Hányféleképpen helyezkedhetnek el?',
        options: ['120 féleképpen', '25 féleképpen', '60 féleképpen', '24 féleképpen'],
        correctAnswer: 0,
        hint: '5 különböző ember egyenes sorba ültetése: 5!.',
        explanation: '5 ember egyenes sorba ültetésének száma: 5! = 5 · 4 · 3 · 2 · 1 = 120.'
      },
      {
        id: 'cq1-5',
        questionTypeBadge: 'Körasztal Körüli Ülés',
        question: 'Hányféleképpen ülhet le 4 ember egy kerek asztal köré, ha a forgatási változatokat nem tekintjük különbözőnek?',
        options: ['6 féleképpen', '24 féleképpen', '12 féleképpen', '4 féleképpen'],
        correctAnswer: 0,
        hint: 'Körasztalnál a forgatás miatt (n - 1)! képletet használjuk.',
        explanation: 'Körasztalnál egy ember helyét rögzítve a maradék 3 ember (4 - 1)! = 3! = 6-féleképpen ülhet le.',
        figure: (
          <svg viewBox="0 0 160 120" className="w-44 h-24">
            <circle cx="80" cy="60" r="32" fill="#e2e8f0" stroke="#a855f7" strokeWidth="2" />
            <text x="80" y="64" fill="#7e22ce" fontSize="10" fontWeight="bold" textAnchor="middle">Asztal</text>
            <circle cx="80" cy="16" r="10" fill="#a855f7" />
            <circle cx="124" cy="60" r="10" fill="#3b82f6" />
            <circle cx="80" cy="104" r="10" fill="#10b981" />
            <circle cx="36" cy="60" r="10" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'cq1-6',
        questionTypeBadge: 'Kézfogások Száma',
        question: 'Hány kézfogás történik egy 5 fős társaságban, ha mindenki mindenkivel pontosan egyszer kezet fog?',
        options: ['10 kézfogás', '20 kézfogás', '25 kézfogás', '5 kézfogás'],
        correctAnswer: 0,
        hint: 'Használd az n · (n - 1) / 2 képletet!',
        explanation: 'Mindenki 4 másikkal fog kezet (5 · 4 = 20), de minden kézfogást kétszer számoltunk, így 20 / 2 = 10 kézfogás történik.'
      },
      {
        id: 'cq1-7',
        questionTypeBadge: 'Anagramma Képzés',
        question: 'Hányféle 3 betűs anagramma (karaktersorozat) készíthető a T, O, L betűk mindegyikének egyszeri felhasználásával?',
        options: ['6 szó', '9 szó', '3 szó', '27 szó'],
        correctAnswer: 0,
        hint: '3 különböző betű sorbarendezése: 3!.',
        explanation: 'A 3 különböző betű 3! = 3 · 2 · 1 = 6 különböző sorrendben írható le (TOL, TLO, OTL, OLT, LTO, LOT).'
      },
      {
        id: 'cq1-8',
        questionTypeBadge: 'Faktoriális Számítás',
        question: 'Mennyi 6! pontos értéke?',
        options: ['720', '120', '36', '5 040'],
        correctAnswer: 0,
        hint: '6! = 6 · 5! = 6 · 120.',
        explanation: '6! = 6 · 5 · 4 · 3 · 2 · 1 = 720.'
      },
      {
        id: 'cq1-9',
        questionTypeBadge: 'Dobogósok Kiválasztása',
        question: 'Egy 6 fős futóversenyen hányféleképpen alakulhat az arany- és ezüstérmes személye (az első két helyezett)?',
        options: ['30 féleképpen', '36 féleképpen', '12 féleképpen', '15 féleképpen'],
        correctAnswer: 0,
        hint: 'Az első helyre 6, a másodikra 5 futó érhet be: 6 · 5.',
        explanation: 'Az aranyérmes 6-féle, az ezüstérmes a maradék 5-féle lehet: 6 · 5 = 30-féleképpen alakulhat az első két hely.'
      },
      {
        id: 'cq1-10',
        questionTypeBadge: 'Logikai Értelmezés',
        question: 'Miért osztunk 2-vel a kézfogások számának (n · (n-1) / 2) kiszámításakor?',
        options: [
          'Mert egy kézfogásban két ember vesz részt, így oda-vissza kétszer számolnánk ugyanazt a kézfogást',
          'Mert mindenkinek két keze van',
          'Mert a kézfogások pontosan fele elmarad',
          'Mert a kézfogás páros tevékenységnek minősül'
        ],
        correctAnswer: 0,
        hint: 'Ha Anna kezet fog Bélával, az ugyanaz az esemény, mint hogy Béla kezet fog Annával.',
        explanation: 'A szorzásban (n · (n-1)) az A-B és B-A kézfogást külön számoljuk, holott ez ugyanaz a kézfogás. A kétszeres számlálás miatt kell 2-vel osztani.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Ültetési Rendek és Megkötések (Közepes)',
    subtitle: 'Blokk-trükk, komplementer számítás, felváltva ülés és dobogós helyezések.',
    range: '11 - 20. feladat',
    focus: 'Összefüggések és Gyakorlati Alkalmazások',
    questions: [
      {
        id: 'cq2-1',
        questionTypeBadge: 'Blokk-elv (Egymás mellett)',
        question: '5 barát moziban ül egy sorban. Hányféleképpen ülhetnek le, ha Anna és Béla feltétlenül egymás mellett akar ülni?',
        options: ['48 féleképpen', '24 féleképpen', '60 féleképpen', '120 féleképpen'],
        correctAnswer: 0,
        hint: 'Kösd össze Annát és Bélát 1 blokká! Így 4 elemet rendezel, majd megszorzod a blokkon belüli sorrenddel (2!).',
        explanation: 'A 4 blokk sorrendje 4! = 24. A blokkon belül Anna és Béla 2!-féleképpen ülhet: 24 · 2 = 48.',
        breakdown: [
          '1. lépés: Anna és Béla egy blokk [AB]',
          '2. lépés: 4 elem sorrendje: 4! = 24',
          '3. lépés: [AB] vagy [BA] belső sorrend: 2! = 2',
          'Összesen: 24 · 2 = 48'
        ]
      },
      {
        id: 'cq2-2',
        questionTypeBadge: 'Komplementer Módszer',
        question: '5 barát moziban ül egy sorban. Hányféleképpen ülhetnek le, ha Anna és Béla SEMMIKÉPPEN sem ülhet egymás mellett?',
        options: ['72 féleképpen', '48 féleképpen', '96 féleképpen', '60 féleképpen'],
        correctAnswer: 0,
        hint: 'Vonjuk ki az összes esetből (5! = 120) az egymás mellett ülős eseteket (48)!',
        explanation: 'Összes lehetséges ülésrend = 5! = 120. Egymás mellett ülnek = 48. Nem ülnek egymás mellett = 120 - 48 = 72.',
        breakdown: [
          'Összes eset: 5! = 120',
          'Egymás mellett ülnek: 48',
          'Nem egymás mellett ülnek: 120 - 48 = 72'
        ]
      },
      {
        id: 'cq2-3',
        questionTypeBadge: 'Körasztal 6 Fővel',
        question: 'Hányféleképpen ülhet le 6 diplomata egy kerek tárgyalóasztal köré?',
        options: ['120 féleképpen', '720 féleképpen', '360 féleképpen', '24 féleképpen'],
        correctAnswer: 0,
        hint: 'A körasztal képlete: (n - 1)!.',
        explanation: 'Körasztal körül n = 6 ember (6 - 1)! = 5! = 120-féleképpen ülhet le.'
      },
      {
        id: 'cq2-4',
        questionTypeBadge: 'Futóverseny Dobogó',
        question: 'Egy 8 fős futóversenyen hányféleképpen alakulhat az arany-, ezüst- és bronzérmesek sorrendje?',
        options: ['336 féleképpen', '512 féleképpen', '56 féleképpen', '24 féleképpen'],
        correctAnswer: 0,
        hint: '1. hely: 8, 2. hely: 7, 3. hely: 6 lehetőség: 8 · 7 · 6.',
        explanation: 'Az aranyérmesre 8, az ezüstre 7, a bronzra 6 lehetőség van: 8 · 7 · 6 = 336 különböző dobogó lehetséges.'
      },
      {
        id: 'cq2-5',
        questionTypeBadge: 'Koccintások Buliban',
        question: 'Egy 10 fős szilveszteri buliban mindenki pontosan egyszer koccint mindenkivel. Hány koccintás történik?',
        options: ['45 koccintás', '90 koccintás', '100 koccintás', '20 koccintás'],
        correctAnswer: 0,
        hint: 'n = 10 esetén (10 · 9) / 2.',
        explanation: 'A kézfogási képlet szerint: (10 · 9) / 2 = 90 / 2 = 45 koccintás hallatszik.'
      },
      {
        id: 'cq2-6',
        questionTypeBadge: 'Teljes Gráf Élei',
        question: 'Hány éle van egy 6 csúcsú teljes gráfnak (amelyben minden csúcs össze van kötve minden más csúccsal)?',
        options: ['15 éle', '30 éle', '12 éle', '36 éle'],
        correctAnswer: 0,
        hint: 'A teljes gráf éleinek száma megegyezik 6 ember kézfogásainak számával.',
        explanation: 'Egy 6 csúcsú teljes gráfban az élek száma: (6 · 5) / 2 = 15 él.'
      },
      {
        id: 'cq2-7',
        questionTypeBadge: 'Felváltva Ülés',
        question: 'Hányféleképpen ülhet le 3 fiú és 3 lány egy 6 fős padba úgy, hogy fiúk és lányok felváltva üljenek?',
        options: ['72 féleképpen', '36 féleképpen', '144 féleképpen', '720 féleképpen'],
        correctAnswer: 0,
        hint: 'Kezdhet fiú (FLFLFL) vagy lány (LFLFLF): 2 · 3! · 3!.',
        explanation: 'Kétféle mintázat van (F-L-F-L-F-L vagy L-F-L-F-L-F). Mindkét esetben a fiúk 3! = 6, a lányok 3! = 6 módon ülhetnek: 2 · 6 · 6 = 72.'
      },
      {
        id: 'cq2-8',
        questionTypeBadge: 'Tisztségek Választása',
        question: 'Egy 25 fős osztályban elnököt, titkárt és jegyzőkönyvvezetőt választanak. Hányféle kimenetel lehetséges, ha senki sem tölthet be több tisztséget?',
        options: ['13 800 féleképpen', '15 625 féleképpen', '2 300 féleképpen', '75 féleképpen'],
        correctAnswer: 0,
        hint: 'Elnök: 25, titkár: 24, jegyzőkönyvvezető: 23 választás.',
        explanation: 'Mivel a tisztségek különböznek (a sorrend számít): 25 · 24 · 23 = 13 800-féleképpen alakulhat a vezetőség.'
      },
      {
        id: 'cq2-9',
        questionTypeBadge: 'Tantárgyi Könyvek',
        question: '3 matek és 2 fizika könyvet teszünk a polcra. Hányféleképpen rendezhetjük el őket, ha a 3 matekkönyvnek egymás mellett kell lennie?',
        options: ['36 féleképpen', '24 féleképpen', '72 féleképpen', '12 féleképpen'],
        correctAnswer: 0,
        hint: 'A 3 matekkönyv egy blokk. A blokk + 2 fizikakönyv = 3 elem (3! = 6). A blokkon belül a 3 matekkönyv 3! = 6 módon állhat.',
        explanation: 'A 3 blokk elrendezése 3! = 6. A matekkönyvek belső sorrendje 3! = 6: 6 · 6 = 36-féleképpen rendezhetők el.'
      },
      {
        id: 'cq2-10',
        questionTypeBadge: 'Rögzített Hely',
        question: '7 diák áll sorba a menzán. Hányféle sorrend lehetséges, ha Péternek feltétlenül a legelső helyen kell állnia?',
        options: ['720 féleképpen', '5 040 féleképpen', '120 féleképpen', '2 520 féleképpen'],
        correctAnswer: 0,
        hint: 'Péter helye fix (1 lehetőség), a maradék 6 diák sorrendje tetszőleges (6!).',
        explanation: 'Péter helye adott, így a mögötte lévő 6 helyre a 6 másik diák 6! = 720-féleképpen állhat be.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó és Versenyfeladványok (Nehéz)',
    subtitle: 'Körasztal megkötésekkel, sokszög átlói, delegációk és anagrammák.',
    range: '21 - 30. feladat',
    focus: 'Mesterfok és Logikai Kihívások',
    questions: [
      {
        id: 'cq3-1',
        questionTypeBadge: 'Körasztal Egymás Mellett',
        question: '6 ember ül le egy kerek asztalhoz. Hányféleképpen ülhetnek le, ha Anna és Béla egymás mellett akar ülni?',
        options: ['48 féleképpen', '24 féleképpen', '120 féleképpen', '96 féleképpen'],
        correctAnswer: 0,
        hint: 'Az [AB] blokkot 1 elemnek tekintjük, így 5 elemet ültetünk körasztalhoz: (5-1)! = 24. A blokk belső sorrendje 2! = 2.',
        explanation: 'Körasztalnál az 5 egység (4 ember + 1 blokk) (5 - 1)! = 4! = 24-féleképpen ülhet le. Anna és Béla 2! módon helyezkedhet el a blokkban: 24 · 2 = 48.',
        breakdown: [
          '1. lépés: Anna és Béla összevonva [AB] blokká',
          '2. lépés: 5 egység körasztalnál: (5 - 1)! = 4! = 24',
          '3. lépés: Anna és Béla belső sorrendje: 2! = 2',
          'Összes eset: 24 · 2 = 48'
        ]
      },
      {
        id: 'cq3-2',
        questionTypeBadge: 'Körasztal Komplementer',
        question: '6 ember ül le egy kerek asztalhoz. Hányféleképpen ülhetnek le, ha Anna és Béla NEM ülhet egymás mellett?',
        options: ['72 féleképpen', '48 féleképpen', '96 féleképpen', '600 féleképpen'],
        correctAnswer: 0,
        hint: 'Összes körasztal eset ((6-1)! = 120) mínusz az egymás mellett ülős esetek (48).',
        explanation: 'Az összes körasztal-elrendezés (6 - 1)! = 5! = 120. Ebből kivonva az egymás mellett ülők számát (48): 120 - 48 = 72.'
      },
      {
        id: 'cq3-3',
        questionTypeBadge: 'Fiúk-Lányok Körasztalnál',
        question: '4 fiú és 4 lány ül le egy 8 fős kerek asztalhoz. Hányféleképpen ülhetnek le úgy, hogy a nemek felváltva következzenek?',
        options: ['144 féleképpen', '576 féleképpen', '288 féleképpen', '72 féleképpen'],
        correctAnswer: 0,
        hint: 'Ültessük le először a 4 fiút körasztalhoz ((4-1)! = 6). A köztük lévő 4 szék már rögzített hely, ide a 4 lány 4! = 24 módon ülhet.',
        explanation: 'A 4 fiú leültetése körasztalhoz: (4 - 1)! = 3! = 6. Ezután a fiúk közötti 4 hely már megkülönböztetett széknek számít, ide a 4 lány 4! = 24 módon ülhet: 6 · 24 = 144.'
      },
      {
        id: 'cq3-4',
        questionTypeBadge: 'Sokszög Átlói',
        question: 'Hány átlója van egy 8 csúcsú konvex sokszögnek?',
        options: ['20 átlója', '28 átlója', '24 átlója', '16 átlója'],
        correctAnswer: 0,
        hint: 'A 8 csúcs között összesen (8 · 7) / 2 = 28 szakasz húzható. Ebből 8 darab a sokszög oldala, a többi az átló!',
        explanation: 'Összes csúcspár (szakasz) = (8 · 7) / 2 = 28. Ebből levonva a 8 oldalt: 28 - 8 = 20 átló marad.'
      },
      {
        id: 'cq3-5',
        questionTypeBadge: 'Ismétléses Anagramma',
        question: 'A „BALATON” szó betűiből hány különböző 7 betűs anagramma (karaktersorozat) képezhető? (Az A betű kétszer szerepel!)',
        options: ['2 520 anagramma', '5 040 anagramma', '1 260 anagramma', '720 anagramma'],
        correctAnswer: 0,
        hint: '7 betű lenne 7! = 5040, de a 2 azonos A betű felcserélése nem hoz új szót, így osztani kell 2!-sal!',
        explanation: '7 betű permutációja 7! = 5040. Mivel az A betű 2-szer szerepel, 7! / 2! = 5040 / 2 = 2520 különböző anagramma készíthető.'
      },
      {
        id: 'cq3-6',
        questionTypeBadge: 'Egyenrangú Delegáció',
        question: 'Hányféleképpen választhatunk ki egy 10 fős társaságból egy 3 fős küldöttséget, ha a küldöttek között nincs rangsor (egyenrangúak)?',
        options: ['120 féleképpen', '720 féleképpen', '240 féleképpen', '360 féleképpen'],
        correctAnswer: 0,
        hint: 'Sorrenddel 10 · 9 · 8 = 720 lenne, de mivel a 3 ember sorrendje nem számít, osztani kell 3! = 6-tal.',
        explanation: 'A választás sorrenddel 10 · 9 · 8 = 720. A 3 ember egymás közötti 3! = 6 sorrendje nem hoz új csoportot: 720 / 6 = 120.'
      },
      {
        id: 'cq3-7',
        questionTypeBadge: 'Széleken Kötött Hely',
        question: '6 barát ül le egy padra. Hányféleképpen ülhetnek le úgy, hogy a legfiatalabb és a legidősebb a pad két szélén foglaljon helyet?',
        options: ['48 féleképpen', '24 féleképpen', '72 féleképpen', '12 féleképpen'],
        correctAnswer: 0,
        hint: 'A két szélső helyre a két személy 2! = 2 módon ülhet le. A belső 4 székre a maradék 4 barát 4! = 24 módon.',
        explanation: 'A két szélső helyre a legfiatalabb és legidősebb 2! = 2 módon ülhet (bal-jobb vagy jobb-bal). A belső 4 helyre a maradék 4 ember 4! = 24 módon ülhet: 2 · 24 = 48.'
      },
      {
        id: 'cq3-8',
        questionTypeBadge: 'Körmérkőzés Bajnokság',
        question: 'Egy 12 csapatos labdarúgó-bajnokságban minden csapat pontosan egyszer játszik minden más csapattal. Hány mérkőzést rendeznek összesen?',
        options: ['66 mérkőzést', '132 mérkőzést', '72 mérkőzést', '144 mérkőzést'],
        correctAnswer: 0,
        hint: '12 csapatból kiválasztunk 2 csapatot egy mérkőzésre: (12 · 11) / 2.',
        explanation: 'Minden mérkőzés két csapat összecsapása: (12 · 11) / 2 = 132 / 2 = 66 mérkőzés.'
      },
      {
        id: 'cq3-9',
        questionTypeBadge: 'Faktoriális Egyszerűsítés',
        question: 'Mennyi a 10! / (8! · 2!) algebrai kifejezés pontos értéke?',
        options: ['45', '90', '5', '10'],
        correctAnswer: 0,
        hint: 'Egyszerűsíts 8!-sal: 10! / 8! = 10 · 9 = 90. Majd oszd el 2!-sal!',
        explanation: '10! / (8! · 2!) = (10 · 9 · 8!) / (8! · 2) = (10 · 9) / 2 = 90 / 2 = 45.'
      },
      {
        id: 'cq3-10',
        questionTypeBadge: 'Részhalmaz Sorrenddel',
        question: '5 futó közül kiválasztunk 3 embert a dobogóra (arany, ezüst, bronz). Hány különböző dobogó lehetséges?',
        options: ['60 dobogó', '10 dobogó', '120 dobogó', '20 dobogó'],
        correctAnswer: 0,
        hint: '1. helyre 5, 2. helyre 4, 3. helyre 3 választás van: 5 · 4 · 3.',
        explanation: 'Mivel a helyezések különböző érmeket jelentenek (a sorrend számít): 5 · 4 · 3 = 60 különböző dobogó alakulhat ki.'
      }
    ]
  }
};

const countingCheatSheets: CheatSheetCard[] = [
  {
    id: 'cs-perm-1',
    title: 'Sorbarendezés (Permutáció)',
    formula: 'P_n = n! = n · (n-1) · ... · 1',
    description: 'Amikor n különböző elemet mind egy számozott egyenes sorba rendezünk.',
    note: 'Példa: 5 könyv a polcon -> 5! = 120 lehetőség.',
    color: 'purple'
  },
  {
    id: 'cs-perm-2',
    title: 'Körasztal Körüli Ülésrend',
    formula: 'P_{n, \\text{kör}} = (n - 1)!',
    description: 'A forgatási szimmetria miatt n-szer kevesebb különböző ülésrend létezik.',
    note: 'Példa: 5 barát körasztalnál -> (5 - 1)! = 4! = 24 lehetőség.',
    color: 'violet'
  },
  {
    id: 'cs-perm-3',
    title: 'Kézfogás és Részhalmaz Képlet',
    formula: '\\text{Kézfogások} = \\frac{n(n-1)}{2}',
    description: 'Mindenki mindenkivel egyszer lép kapcsolatba, a kapcsolat oda-vissza kölcsönös.',
    note: 'Példa: 6 ember kézfogásai -> (6 · 5) / 2 = 15.',
    color: 'emerald'
  },
  {
    id: 'cs-perm-4',
    title: 'Blokk-elv és Komplementer Módszer',
    formula: '\\text{Nem egymás mellett} = \\text{Összes} - \\text{Egymás mellett}',
    description: 'Egymás mellett ülők: blokkba vonjuk őket ((blokkok)! · 2!). Nem egymás mellett: kivonjuk az összesből.',
    note: '5 ember, 2 egymás mellett: 4! · 2! = 48. Nem egymás mellett: 120 - 48 = 72.',
    color: 'rose'
  }
];

export const CountingContQuiz: React.FC<CountingContQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Folytatjuk az Összeszámlálást: Permutációk Kvíz"
      subtitle="Sorbarendezések (n!), körasztal ((n-1)!), dobogók és kézfogások 3 szinten"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 GYAKORLÓ KVÍZ"
      themeColor="purple"
      levels={quizLevels}
      topicId="g9-komb-osszeszamlalas-quiz"
      topicTitle="Folytatjuk az összeszámlálást"
      grade={9}
      chapterId="kombinatorika-halmazok"
      cheatSheetCards={countingCheatSheets}
      cheatSheetTitle="Permutáció és Sorbarendezés Segédlet"
      emoji="🔀"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a feladatokat és a helyes képleteket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <CountingContMatcher
              key={`counting-cont-matcher-${level}`}
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
          subtitle: 'Kategorizáld a feladatokat típus és nagyságrend szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <CountingContSorter
              key={`counting-cont-sorter-${level}`}
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

export default CountingContQuiz;
