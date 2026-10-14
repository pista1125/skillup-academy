import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { ExperimentSimulationMatcher } from './ExperimentSimulationMatcher';
import { ExperimentSimulationSorter } from './ExperimentSimulationSorter';

interface ExperimentSimulationQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const experimentQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'exp-q1',
    level: 1,
    question: 'Mi a helyes sorrendje a statisztikai vizsgálat 3 lépéses módszertanának?',
    options: [
      '1. Tippelj (Elmélet) &rarr; 2. Kísérletezz (Mérés) &rarr; 3. Ellenőrizz (Összevetés)',
      '1. Kísérletezz &rarr; 2. Tippelj &rarr; 3. Ellenőrizz',
      '1. Ellenőrizz &rarr; 2. Tippelj &rarr; 3. Kísérletezz',
      '1. Kísérletezz &rarr; 2. Ellenőrizz &rarr; 3. Tippelj'
    ],
    correctAnswer: 0,
    explanation: 'Először megtippeljük az elméleti modellt (P = k/n), majd kísérletet végzünk (adatgyűjtés), végül a kapott relatív gyakoriságot ellenőrizzük és összevetjük az elmélettel.'
  },
  {
    id: 'exp-q2',
    level: 1,
    question: 'Mit mond ki a nagy számok törvénye a valószínűségszámításban?',
    options: [
      'Nagyszámú kísérlet esetén az esemény relatív gyakorisága megközelíti az elméleti valószínűséget (g ≈ P)',
      'Ha sokat dobunk egy kockával, biztosan mindig hatos jön ki',
      'A relatív gyakoriság mindig pontosan megegyezik az elméleti valószínűséggel már 5 dobás után is',
      'Minél többször dobunk, annál nagyobb lesz a dobott számok összege'
    ],
    correctAnswer: 0,
    explanation: 'A nagy számok törvénye szerint ha a kísérletek száma (N) nagyon nagy, a tapasztalati relatív gyakoriság egyre közelebb kerül az elméleti valószínűséghez.'
  },
  {
    id: 'exp-q3',
    level: 1,
    question: 'Hogyan számítjuk ki egy kísérlet során a mért relatív gyakoriságot (g)?',
    options: [
      'A kedvező kimenetelek számát (k) elosztjuk az elvégzett kísérletek számával (N): g = k / N',
      'Az összes kísérlet számát megszorozzuk a kedvező esetek számával',
      'Kivonjuk a kedvező esetek számát a kísérletek számából',
      'Összeadjuk a próbák számát és a kedvező eseteket'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság a kedvező események száma (k) és az összes elvégzett próba száma (N) hányadosa: g = k / N.'
  },
  {
    id: 'exp-q4',
    level: 1,
    question: 'Egy szabályos érmét 100-szor feldobva 52 fejet kaptunk. Mennyi a fej dobások relatív gyakorisága százalékban?',
    options: ['52%', '48%', '50%', '5,2%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 52 / 100 = 0,52 = 52%.'
  },
  {
    id: 'exp-q5',
    level: 1,
    question: 'Ha egy szabályos pénzérmét 10-szer feldobunk, biztosan pontosan 5 fejnek kell kijönnie?',
    options: [
      'Nem, mert kis mintaszámnál a véletlen ingadozás miatt eltérhet (pl. 4 vagy 7 fej is gyakori)',
      'Igen, a matematika törvényei szerint pontosan 5-nek kell lennie',
      'Nem, mert egy pénzérmével soha nem lehet 5 fejet dobni',
      'Igen, minden 10 dobásból pontosan fele fej és fele írás'
    ],
    correctAnswer: 0,
    explanation: 'Kis kísérletszámnál a véletlen ingadozás még jelentős, 10 dobásból a 4, 5, 6 vagy akár 7 fej dobása is teljesen természetes jelenség.'
  },
  {
    id: 'exp-q6',
    level: 1,
    question: 'Az alábbi kísérleti eszközök közül melyik ASZIMMETRIKUS test?',
    options: [
      'Földre ejtett rajzszög (hegyével fel vagy fekve áll meg)',
      'Szabályos hatoldalú dobókocka',
      'Szabályos pénzérme',
      'Egyforma golyók egy urnában'
    ],
    correctAnswer: 0,
    explanation: 'A rajzszög geometriailag aszimmetrikus test, a kétféle esemény bekövetkezési esélye nem egyforma, ezért elméleti képlet nélkül, csak méréssel határozható meg a valószínűsége.'
  },
  {
    id: 'exp-q7',
    level: 1,
    question: 'Egy dobókockával 50-szer dobtunk, és 24-szer kaptunk páros számot. Mennyi a páros dobások relatív gyakorisága?',
    options: ['24/50 = 48%', '24/50 = 24%', '50/24', '50%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 24 / 50 = 48 / 100 = 48%.'
  },
  {
    id: 'exp-q8',
    level: 1,
    question: 'Ha az elméleti valószínűség P = 50%, a mért relatív gyakoriság pedig g = 53%, mekkora az abszolút eltérés (|g - P|)?',
    options: ['3%', '103%', '53%', '0%'],
    correctAnswer: 0,
    explanation: 'Az abszolút eltérés: |g - P| = |53% - 50%| = 3%.'
  },
  {
    id: 'exp-q9',
    level: 1,
    question: 'Mit nevezünk SZIMMETRIKUS kísérleti eszköznek?',
    options: [
      'Olyan eszközt, amelynek lehetséges kimenetelei egyenlő valószínűséggel következnek be',
      'Olyan eszközt, amely csak gömb alakú lehet',
      'Olyan eszközt, amellyel mindig ugyanazt az eredményt kapjuk',
      'Olyan eszközt, aminek pontosan két oldala van'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetrikus eszközöknél (szabályos kocka, érme) a fizikai szimmetria biztosítja, hogy minden elemi esemény egyenlően valószínű.'
  },
  {
    id: 'exp-q10',
    level: 1,
    question: 'Mi történik a kísérleti relatív gyakorisággal, ha a kísérletek számát (N) 10-ről 1000-re növeljük?',
    options: [
      'Egyre közelebb kerül az elméleti valószínűséghez, és csökken a véletlen ingadozás mértéke',
      'Egyre távolabb kerül az elméleti valószínűségtől',
      'A relatív gyakoriság értéke mindig megháromszorozódik',
      'Semmi sem változik, pontosan ugyanazt a százalékot kapjuk'
    ],
    correctAnswer: 0,
    explanation: 'A minta méretének növelésével a relatív gyakoriság stabilizálódik, és egyre pontosabban megközelíti az elméleti értéket.'
  },

  // ===========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ===========================================
  {
    id: 'exp-q11',
    level: 2,
    question: '200 kockadobásból 36 alkalommal dobtunk hatost. Mennyi a hatos dobások relatív gyakorisága egyszerűsített tört alakban?',
    options: ['9/50 (18%)', '36/200 = 3/20', '1/6', '18/50'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: 36 / 200 = 18 / 100 = 9 / 50 = 0,18 = 18%.'
  },
  {
    id: 'exp-q12',
    level: 2,
    question: 'A hatos dobás elméleti valószínűsége P = 1/6 ≈ 16,7%. A kísérletben kapott g = 18%-hoz képest mekkora a kísérleti eltérés?',
    options: ['+1,3%', '+5%', '-2%', '18%'],
    correctAnswer: 0,
    explanation: 'Az eltérés: 18% - 16,7% = +1,3%. Ez 200 dobás esetén teljesen normális kísérleti ingadozásnak számít.'
  },
  {
    id: 'exp-q13',
    level: 2,
    question: 'Egy rajzszöget 200-szor feldobva 124-szer állt meg hegyével felfelé. Mennyi a tapasztalati valószínűsége a hegyes állásnak?',
    options: ['62%', '38%', '50%', '64%'],
    correctAnswer: 0,
    explanation: 'A tapasztalati valószínűség a relatív gyakoriság: 124 / 200 = 62 / 100 = 62%.'
  },
  {
    id: 'exp-q14',
    level: 2,
    question: 'Egy érmét 500-szor feldobva 260 fejet kaptunk (g = 52%). Mekkora a hiba az elméleti 50%-hoz képest?',
    options: ['2%', '10%', '0,2%', '5%'],
    correctAnswer: 0,
    explanation: 'A hibaszázalék: |52% - 50%| = 2%.'
  },
  {
    id: 'exp-q15',
    level: 2,
    question: 'Peti 20-szor, Lili 1000-szer dob egy szabályos dobókockával. Melyikük eredménye várhatóan megbízhatóbb az elméleti valószínűség igazolására?',
    options: [
      'Lilié, mert a lényegesen nagyobb mintaszám miatt a nagy számok törvénye nála érvényesül jobban',
      'Petié, mert kevesebb dobásnál kevesebbet lehet hibázni',
      'Mindkettőjüké teljesen egyforma megbízhatóságú',
      'Egyiküké sem, mert dobókockával nem lehet valószínűséget mérni'
    ],
    correctAnswer: 0,
    explanation: 'A statisztikában minél nagyobb a minta (N = 1000 >> 20), annál kisebb a véletlen ingadozás, így Lili kísérlete sokkal megbízhatóbb.'
  },
  {
    id: 'exp-q16',
    level: 2,
    question: 'Két érmét egyszerre 100-szor feldobva 27-szer kaptunk két fejet (FF). Mennyi a relatív gyakoriság, és mennyire tér el az elméleti 25%-tól?',
    options: ['g = 27%, eltérés: +2%', 'g = 25%, eltérés: 0%', 'g = 54%, eltérés: +29%', 'g = 27%, eltérés: +7%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 27 / 100 = 27%. Az elméleti érték P(FF) = 1/4 = 25%. Az eltérés: 27% - 25% = +2%.'
  },
  {
    id: 'exp-q17',
    level: 2,
    question: 'Egy érmét 1000-szer feldobva 495 fejet kaptunk. Mennyi az ÍRÁS dobások relatív gyakorisága?',
    options: ['50,5% (505/1000)', '49,5%', '50,0%', '55,0%'],
    correctAnswer: 0,
    explanation: 'Az írások száma: 1000 - 495 = 505. A relatív gyakoriság: 505 / 1000 = 0,505 = 50,5%.'
  },
  {
    id: 'exp-q18',
    level: 2,
    question: 'Egy gyanús dobókockával 300 dobásból 120-szor dobtak hatost (g = 40%). Milyen következtetés vonható le ebből?',
    options: [
      'A kocka szinte biztosan cinkelt (súlyozott), mert 300 dobásnál a 40% óriási mértékben eltér a várt 16,7%-tól',
      'A kocka teljesen szabályos, ez normális véletlen ingadozás',
      'Csak szerencséje volt a dobónak, nem jelent semmit',
      'Minden kockánál 40% a hatos dobás esélye'
    ],
    correctAnswer: 0,
    explanation: '300 dobás már elég nagy minta ahhoz, hogy a 40% és a 16,7% közötti hatalmas különbségből egyértelműen cinkelt (hamisított) kockára következtessünk.'
  },
  {
    id: 'exp-q19',
    level: 2,
    question: 'Egy feldobott gyufásdoboz háromféleképpen állhat meg: lapjára, élére vagy végére. Miért NEM 1/3 mindegyik esemény valószínűsége?',
    options: [
      'Mert a doboz oldalai nem egyenlő területűek és a tömegeloszlása sem szimmetrikus (lapjára a legkönnyebb megállnia)',
      'Mert csak kétféle kimenetel létezik',
      'Mert a gyufásdobozzal nem lehet kísérletezni',
      'Mert a gyufaszálak súlya miatt mindig 100% a végére esés esélye'
    ],
    correctAnswer: 0,
    explanation: 'A gyufásdoboz lapjai különböző méretűek, a lapjára esés felülete sokkal nagyobb, mint az éléé vagy a végéé, így a kimenetelek nem egyenlően valószínűek.'
  },
  {
    id: 'exp-q20',
    level: 2,
    question: 'Egy dobozból visszatevéssel 80-szor húztunk golyót, és 20-szor lett piros (g = 25%). Ha a dobozban összesen 100 golyó van, hány piros lehet benne a becslés szerint?',
    options: ['25 piros golyó', '20 piros golyó', '50 piros golyó', '10 piros golyó'],
    correctAnswer: 0,
    explanation: 'A tapasztalati arány g = 25%. A 100 golyó 25%-a: 100 · 0,25 = 25 piros golyó a legjobb becslésünk.'
  },

  // ===========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ===========================================
  {
    id: 'exp-q21',
    level: 3,
    question: 'Mit nevezünk a számítástechnikában és statisztikában Monte-Carlo módszernek?',
    options: [
      'Nagyszámú véletlenszerű szimuláció futtatását bonyolult matematikai és valószínűségi problémák megoldására',
      'Egy kaszinójátékot, ahol mindig a bank nyer',
      'A kockadobások pontos kézi lejegyzésének szabályát',
      'Egy olyan képletet, amely kizárólag kártyajátékoknál érvényes'
    ],
    correctAnswer: 0,
    explanation: 'A Monte-Carlo módszer számítógépes véletlenszám-generálással modellez összetett folyamatokat a nagy számok törvényére támaszkodva.'
  },
  {
    id: 'exp-q22',
    level: 3,
    question: 'Egy négyzetbe (oldala 2) írt kör (sugara 1) területének aránya a négyzethez π / 4. Ha 1000 véletlen pontból 785 esik a körbe, mekkora a π becsült értéke?',
    options: ['3,14', '3,00', '3,25', '3,50'],
    correctAnswer: 0,
    explanation: 'A pontok aránya: 785 / 1000 = 0,785 ≈ π / 4. Ebből π ≈ 4 · 0,785 = 3,14! Ez a Monte-Carlo módszer híres π-becslése.'
  },
  {
    id: 'exp-q23',
    level: 3,
    question: 'Két szabályos kockát 360-szor feldobva az elmélet szerint hányszor várható, hogy a dobott számok összege 7 lesz?',
    options: ['60 alkalommal', '36 alkalommal', '70 alkalommal', '50 alkalommal'],
    correctAnswer: 0,
    explanation: 'A 7-es összeg elméleti valószínűsége P = 6 / 36 = 1 / 6. 360 dobás esetén a várható gyakoriság: 360 · (1/6) = 60 alkalom.'
  },
  {
    id: 'exp-q24',
    level: 3,
    question: 'Egy 5 osztályból álló évfolyam minden diákja (100 tanuló) 10-szer dob érmével. Hogyan kapjuk a legpontosabb elméleti igazolást?',
    options: [
      'Ha az összes tanuló eredményét összevonjuk egyetlen N = 1000-es közös mintába',
      'Ha csak a legügyesebb tanuló 10 dobását vesszük figyelembe',
      'Ha kiválasztjuk a legnagyobb fejszámú diákot',
      'Ha az osztályok eredményeit kivonjuk egymásból'
    ],
    correctAnswer: 0,
    explanation: 'Az adatok összesítése N = 1000 próbára növeli a mintát, ami a nagy számok törvénye szerint a legkisebb véletlen ingadozást és legpontosabb eredményt adja.'
  },
  {
    id: 'exp-q25',
    level: 3,
    question: 'Egy minőségellenőrző kísérletben 400 legyártott alkatrészből 8 hibásat találtak. Mennyi a selejt tapasztalati relatív gyakorisága?',
    options: ['2% (8/400)', '4%', '0,2%', '8%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 8 / 400 = 2 / 100 = 2%. Ebből becsülhető a gyártási selejtarány.'
  },
  {
    id: 'exp-q26',
    level: 3,
    question: 'Egy gyárban 2% a tapasztalati selejtszázalék. Ha 5000 alkatrészt készítenek egy héten, várhatóan hány hibás darab keletkezik?',
    options: ['100 hibás darab', '50 hibás darab', '200 hibás darab', '20 hibás darab'],
    correctAnswer: 0,
    explanation: '5000 darab 2%-a: 5000 · 0,02 = 100 hibás alkatrész a várható érték.'
  },
  {
    id: 'exp-q27',
    level: 3,
    question: 'Két kockát dobva a dobott összeg relatív gyakoriságát vizsgáljuk 1000 dobás során. Melyik összeg relatív gyakorisága lesz a legnagyobb a nagy számok törvénye szerint?',
    options: [
      'A 7-es összeg (mert annak van a legtöbb kedvező kimenetele: 6 a 36-ból)',
      'A 12-es összeg',
      'A 2-es összeg',
      'Minden összeg relatív gyakorisága teljesen egyforma lesz'
    ],
    correctAnswer: 0,
    explanation: 'A 7-es összegnek van a legtöbb kimenetele (1+6, 2+5, 3+4, 4+3, 5+2, 6+1 &rarr; 6/36 ≈ 16,7%), így nagyszámú kísérletnél ez jelenik meg leggyakrabban.'
  },
  {
    id: 'exp-q28',
    level: 3,
    question: 'Mi a különbség a visszatevéses és a visszatevés nélküli golyóhúzási kísérlet szimulációjában?',
    options: [
      'Visszatevésnél a valószínűségek minden húzásnál azonosak maradnak, míg visszatevés nélkül húzásról húzásra változnak',
      'Visszatevés nélkül nem lehet valószínűséget számolni',
      'Visszatevésnél a golyók színe megváltozik a dobozban',
      'Nincs semmilyen különbség köztük'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevésnél a kísérlet feltételei függetlenek maradnak (azonos valószínűség). Visszatevés nélkül a golyók száma és aránya minden lépésben módosul.'
  },
  {
    id: 'exp-q29',
    level: 3,
    question: 'Egy közvélemény-kutatásban 500 megkérdezettből 350 igennel válaszolt. Mennyi az igen válaszok tapasztalati relatív gyakorisága?',
    options: ['70% (350/500 = 7/10)', '35%', '50%', '65%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: 350 / 500 = 70 / 100 = 70%.'
  },
  {
    id: 'exp-q30',
    level: 3,
    question: 'Mi a legfontosabb tanulsága a statisztikai kísérleteknek a mindennapi életben?',
    options: [
      'Egy-két véletlen esetből nem szabad általánosítani; megbízható következtetéshez nagy mintára és adatokra van szükség',
      'Minden kísérletet csak egyszer érdemes elvégezni',
      'A véletlent egyáltalán nem lehet matematikailag vizsgálni',
      'A kis minták mindig pontosabbak, mint a nagy minták'
    ],
    correctAnswer: 0,
    explanation: 'A statisztika legfőbb tanulsága a kritikus gondolkodás: kevés esetből elhamarkodott következtetést vonnánk le, megbízható döntésekhez nagyszámú adatra van szükség.'
  }
];

const experimentCheatSheets: CheatSheetContent[] = [
  {
    title: 'A 3 lépéses kísérleti módszertan',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-950 dark:text-orange-200 space-y-1 font-mono">
          <div>1. Tippelj: Elméleti valószínűség P(A) = k / n</div>
          <div>2. Kísérletezz: N próba elvégzése és k számlálása</div>
          <div>3. Ellenőrizz: g = k / N relatív gyakoriság és hiba = |g - P|</div>
        </div>
      </div>
    )
  },
  {
    title: 'A nagy számok törvénye (Bernoulli)',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-mono">
          g = k / N &rarr; P(A), ha N &rarr; &infin;
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Kis minta (N ≤ 20) &rarr; Nagy véletlen ingadozás</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Nagy minta (N ≥ 500) &rarr; Stabil elmélethez simulás</div>
        </div>
      </div>
    )
  },
  {
    title: 'Szimmetrikus vs. Aszimmetrikus eszközök',
    content: (
      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Szimmetrikus (Kocka, Érme):</strong> Előre kiszámítható klasszikus képlettel: P = k / n.</div>
        <div>• <strong>Aszimmetrikus (Rajzszög, Flakon):</strong> Nincs szimmetria, kizárólag nagyszámú kísérlet relatív gyakoriságából becsülhető az esély!</div>
        <div>• <strong>Monte-Carlo szimuláció:</strong> Számítógépes kísérletmodellezés több ezer véletlenszerű próbával.</div>
      </div>
    )
  }
];

export const ExperimentSimulationQuiz: React.FC<ExperimentSimulationQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="7. Tippelj, kísérletezz, ellenőrizz! Kvíz"
      subtitle="Teszteld a tudásod a kísérleti statisztika, szimulációk és a nagy számok törvénye témakörében!"
      topicId="g7-stats-exp"
      topicName="7. Tippelj, kísérletezz, ellenőrizz!"
      badgeText="7. OSZTÁLY • STATISZTIKA • 🎯 KVÍZ"
      themeColor="orange"
      questions={experimentQuestions}
      cheatSheets={experimentCheatSheets}
      pdfFilename="7_osztaly_tippelj_kiserletezz_ellenorizz_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<ExperimentSimulationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ExperimentSimulationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-orange-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-orange-600" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-orange-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-orange-600" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default ExperimentSimulationQuiz;
