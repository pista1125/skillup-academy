import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { StatsSummaryMatcher } from './StatsSummaryMatcher';
import { StatsSummarySorter } from './StatsSummarySorter';

interface StatsSummaryQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const summaryQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'ss-q1',
    level: 1,
    question: 'Mikor nevezünk egy halmazok közötti hozzárendelést függvénynek?',
    options: [
      'Ha az alaphalmaz (értelmezési tartomány) minden eleméhez pontosan egy képelem tartozik',
      'Ha egy elemhez több különböző képelem is rendelhető',
      'Ha a képelemek száma mindig nagyobb, mint az alaphalmaz elemeinek száma',
      'Csak akkor, ha a grafikonja vízszintes egyenes'
    ],
    correctAnswer: 0,
    explanation: 'A függvény olyan egyértelmű hozzárendelés, ahol az értelmezési tartomány minden egyes eleméhez pontosan egy elem tartozik a képhalmazból.'
  },
  {
    id: 'ss-q2',
    level: 1,
    question: 'Hogyan számítjuk ki egy számsorozat számtani közepét (átlagát)?',
    options: [
      'Az adatok összegét elosztjuk az adatok darabszámával: x̄ = Σx / n',
      'A legnagyobb adatból kivonjuk a legkisebbet',
      'Megkeressük a leggyakrabban előforduló számot',
      'Növekvő sorrendbe rakjuk a számokat és kiválasztjuk a legelsőt'
    ],
    correctAnswer: 0,
    explanation: 'A számtani átlag az adatok összege osztva azok darabszámával: x̄ = (x₁ + x₂ + ... + xₙ) / n.'
  },
  {
    id: 'ss-q3',
    level: 1,
    question: 'Mit jelent a statisztikában a MÓDUSZ (Mo)?',
    options: [
      'A mintában a leggyakrabban előforduló értéket',
      'A nagyság szerint rendezett minta pontosan középső elemét',
      'A legkisebb és legnagyobb adat különbségét',
      'Az adatok számtani átlagát'
    ],
    correctAnswer: 0,
    explanation: 'A módusz az az érték, amely a legnagyobb gyakorisággal szerepel az adatsorban.'
  },
  {
    id: 'ss-q4',
    level: 1,
    question: 'Mi a MEDIÁN (Me) egy páratlan darabszámú, rendezett adatsor esetén?',
    options: [
      'A nagyság szerint növekvő sorrendbe állított adatsor pontosan középső eleme',
      'Az adatok összege osztva kettővel',
      'Mindig a legkisebb érték',
      'A leggyakrabban előforduló szám'
    ],
    correctAnswer: 0,
    explanation: 'Ha az adatokat nagyság szerint sorba rendezzük, páratlan elemszám esetén a medián a pontosan középen álló érték.'
  },
  {
    id: 'ss-q5',
    level: 1,
    question: 'Hogyan számítjuk ki egy adatsor terjedelmét (R)?',
    options: [
      'A legnagyobb adatból kivonjuk a legkisebb adatot: R = maximum - minimum',
      'Összeadjuk a legkisebb és legnagyobb adatot',
      'Az átlagból kivonjuk a mediánt',
      'Az adatok számát megszorozzuk kettővel'
    ],
    correctAnswer: 0,
    explanation: 'A terjedelem a minta szóródásának legegyszerűbb mutatója: R = x_max - x_min.'
  },
  {
    id: 'ss-q6',
    level: 1,
    question: 'Mennyi egy felmérés összes kategóriájához tartozó relatív gyakoriságok összege?',
    options: ['Mindig pontosan 1 (vagyis 100%)', 'Mindig 0', 'Mindig 360', 'Az adatok száma (n)'],
    correctAnswer: 0,
    explanation: 'Mivel a kategóriák a teljes mintát lefedik, a részek relatív gyakoriságainak összege mindig 1 (100%).'
  },
  {
    id: 'ss-q7',
    level: 1,
    question: 'Hogyan határozzuk meg az esemény klasszikus valószínűségét?',
    options: [
      'P(A) = kedvező esetek száma (k) / összes eset száma (n) = k / n',
      'P(A) = összes eset / kedvező esetek',
      'P(A) = kedvező esetek · összes eset',
      'P(A) = összes eset - kedvező esetek'
    ],
    correctAnswer: 0,
    explanation: 'Klasszikus valószínűségi modellben: P(A) = k / n, ahol minden kimenetel egyenlően valószínű.'
  },
  {
    id: 'ss-q8',
    level: 1,
    question: 'Mennyi a BIZTOS esemény (I) és a LEHETETLEN esemény (∅) valószínűsége?',
    options: [
      'Biztos: P(I) = 1 (100%), Lehetetlen: P(∅) = 0 (0%)',
      'Biztos: P = 0, Lehetetlen: P = 1',
      'Mindkettő valószínűsége P = 0,5 (50%)',
      'Biztos: P = 100, Lehetetlen: P = -1'
    ],
    correctAnswer: 0,
    explanation: 'A biztos esemény mindig bekövetkezik (P = 1), a lehetetlen esemény soha nem következhet be (P = 0).'
  },
  {
    id: 'ss-q9',
    level: 1,
    question: 'Egy szabályos érmét feldobva mekkora a valószínűsége, hogy Írást (Í) kapunk?',
    options: ['1/2 = 0,5 = 50%', '1/1 = 1 = 100%', '1/4 = 25%', '0%'],
    correctAnswer: 0,
    explanation: 'Két egyenlő esélyű kimenetel van (Fej, Írás). Kedvező eset: k = 1. Így P = 1/2 = 50%.'
  },
  {
    id: 'ss-q10',
    level: 1,
    question: 'Mit mond ki a nagy számok törvénye?',
    options: [
      'Ha a kísérletek száma (N) nagyon nagy, a relatív gyakoriság megközelíti az elméleti valószínűséget',
      'Ha sokat dobunk, mindig a legnagyobb szám jön ki',
      'Minden kísérletben a relatív gyakoriság pontosan 100%',
      'A nagy számok összege mindig páros'
    ],
    correctAnswer: 0,
    explanation: 'A nagy számok törvénye szerint nagyszámú kísérlet esetén a relatív gyakoriság (g) egyre jobban megközelíti a matematikai valószínűséget (P).'
  },

  // ===========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ===========================================
  {
    id: 'ss-q11',
    level: 2,
    question: 'Egy adatsor értékei: 3, 5, 8, 8, 11. Mennyi az átlag (x̄)?',
    options: ['7', '8', '35', '6'],
    correctAnswer: 0,
    explanation: 'Összeg: 3 + 5 + 8 + 8 + 11 = 35. Darabszám: n = 5. Átlag: x̄ = 35 / 5 = 7.'
  },
  {
    id: 'ss-q12',
    level: 2,
    question: 'Az előző adatsorban (3, 5, 8, 8, 11) mennyi a MÓDUSZ és a MEDIÁN?',
    options: [
      'Módusz = 8, Medián = 8',
      'Módusz = 8, Medián = 7',
      'Módusz = 5, Medián = 8',
      'Módusz = 11, Medián = 3'
    ],
    correctAnswer: 0,
    explanation: 'A leggyakoribb adat a 8 (kétszer szerepel &rarr; Mo = 8). A rendezett 5 elem közül a középső (3.) a 8 &rarr; Me = 8.'
  },
  {
    id: 'ss-q13',
    level: 2,
    question: 'Egy kördiagramban egy kategória relatív gyakorisága 20%. Mekkora a hozzá tartozó középponti szög (α)?',
    options: ['72°', '20°', '90°', '36°'],
    correctAnswer: 0,
    explanation: 'A teljes kör 360°. Ennek a 20%-a: α = 0,20 · 360° = 72°.'
  },
  {
    id: 'ss-q14',
    level: 2,
    question: 'Egy lineáris függvény képlete: y = 3x - 2. Mennyi a függvényérték, ha a bemenő x = 4?',
    options: ['y = 10', 'y = 14', 'y = 12', 'y = 9'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: y = 3 · 4 - 2 = 12 - 2 = 10.'
  },
  {
    id: 'ss-q15',
    level: 2,
    question: 'Egy szabályos dobókockával dobva mekkora a valószínűsége, hogy PRÍMSZÁMOT dobunk?',
    options: ['3/6 = 1/2 = 50%', '2/6 = 1/3', '4/6 = 2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A kocka lapjain szereplő prímszámok: 2, 3, 5 (az 1 nem prím!). Kedvező esetek száma: k = 3. Tehát P = 3/6 = 50%.'
  },
  {
    id: 'ss-q16',
    level: 2,
    question: 'Egy urnában 7 fehér és 3 fekete golyó van. Mekkora a valószínűsége, hogy fekete golyót húzunk?',
    options: ['3/10 = 0,3 = 30%', '7/10 = 70%', '3/7', '1/3'],
    correctAnswer: 0,
    explanation: 'Összesen n = 7 + 3 = 10 golyó van. Kedvező k = 3 fekete. Így P = 3/10 = 30%.'
  },
  {
    id: 'ss-q17',
    level: 2,
    question: 'Ha egy esemény valószínűsége P(A) = 0,42, mennyi az ellentett eseményének P(Ā) valószínűsége?',
    options: ['0,58 (58%)', '0,42 (42%)', '1,42', '0'],
    correctAnswer: 0,
    explanation: 'Az esemény és ellentettje valószínűségének összege 1 (100%): P(Ā) = 1 - 0,42 = 0,58 = 58%.'
  },
  {
    id: 'ss-q18',
    level: 2,
    question: 'Egy grafikonon az autó megtett útját ábrázoljuk az idő függvényében. Mit fejez ki a grafikon meredeksége?',
    options: [
      'Az autó átlagsebességét (sebesség = út / idő)',
      'Az autó tömegét',
      'Az elhasznált üzemanyag mennyiségét',
      'Az utazás teljes költségét'
    ],
    correctAnswer: 0,
    explanation: 'Az út-idő (s-t) grafikonon a meredekség Δs / Δt, ami pontosan a sebességet adja meg.'
  },
  {
    id: 'ss-q19',
    level: 2,
    question: 'Egy kísérletben 250 érmedobásból 130 fejet kaptunk. Mennyi a mért relatív gyakoriság?',
    options: ['52% (130/250)', '50%', '48%', '26%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 130 / 250 = 520 / 1000 = 52%.'
  },
  {
    id: 'ss-q20',
    level: 2,
    question: 'Egy páros darabszámú rendezett adatsor: 2, 4, 6, 10. Mennyi a MEDIÁN?',
    options: ['5 (a két középső: 4 és 6 átlaga)', '4', '6', '22'],
    correctAnswer: 0,
    explanation: 'Páros elemszám esetén a medián a két középső szám számtani közepe: (4 + 6) / 2 = 5.'
  },

  // ===========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ===========================================
  {
    id: 'ss-q21',
    level: 3,
    question: 'Két szabályos dobókockát egyszerre feldobva hányféle rendezett kimenetel (n) lehetséges, és mennyi a valószínűsége, hogy a dobott összeg 12 lesz?',
    options: ['n = 36, P(12) = 1/36 (kb. 2,8%)', 'n = 12, P(12) = 1/12', 'n = 36, P(12) = 2/36', 'n = 24, P(12) = 1/24'],
    correctAnswer: 0,
    explanation: 'Összesen 6 · 6 = 36 eset van. A 12-es összeg csak egyféleképpen állhat elő: (6; 6). Tehát P = 1/36 ≈ 2,8%.'
  },
  {
    id: 'ss-q22',
    level: 3,
    question: 'Két szabályos pénzérmét feldobva mekkora a valószínűsége annak, hogy LEGALÁBB egy Fejet dobunk?',
    options: ['3/4 = 75%', '1/2 = 50%', '1/4 = 25%', '2/3'],
    correctAnswer: 0,
    explanation: 'A lehetséges esetek (n = 4): FF, FÍ, ÍF, ÍÍ. Legalább egy fej van az FF, FÍ, ÍF esetekben (k = 3). Így P = 3/4 = 75%.'
  },
  {
    id: 'ss-q23',
    level: 3,
    question: 'Egy 32 lapos magyar kártyacsomagból egy lapot húzunk. Mekkora a valószínűsége, hogy ÁSZ lapot húzunk?',
    options: ['4/32 = 1/8 = 12,5%', '1/32 ≈ 3,1%', '8/32 = 25%', '1/4'],
    correctAnswer: 0,
    explanation: 'A pakliban 4 db ász van (piros, tök, zöld, makk). Így P = 4 / 32 = 1 / 8 = 12,5%.'
  },
  {
    id: 'ss-q24',
    level: 3,
    question: 'Egy osztály 20 diákjának átlaga 4,2, egy másik 30 fős osztály átlaga 3,7. Mennyi a két osztály 50 diákjának együttes súlyozott átlaga?',
    options: ['3,9', '3,95', '4,0', '3,85'],
    correctAnswer: 0,
    explanation: 'Első osztály összes pontja: 20 · 4,2 = 84. Második osztály: 30 · 3,7 = 111. Összes pont: 195. Összesen 50 diák: 195 / 50 = 3,9.'
  },
  {
    id: 'ss-q25',
    level: 3,
    question: 'Melyik állítás IGAZ az adatsor mutatóiról?',
    options: [
      'A számtani átlag mindig a legkisebb és legnagyobb adat közé esik (min ≤ x̄ ≤ max)',
      'A medián mindig pontosan megegyezik a számtani átlaggal',
      'Minden adatsornak pontosan egy módusza van',
      'A terjedelem lehet negatív szám is'
    ],
    correctAnswer: 0,
    explanation: 'A számtani átlag szigorúan a minimum és maximum közé esik (vagy velük egyenlő, ha minden adat azonos). A medián és átlag eltérhet, móduszból lehet több is.'
  },
  {
    id: 'ss-q26',
    level: 3,
    question: 'Egy egyenes arányosság grafikonja átmegy a (2; 6) ponton. Mi a függvény képlete?',
    options: ['y = 3x', 'y = 2x + 6', 'y = x + 4', 'y = 6x'],
    correctAnswer: 0,
    explanation: 'Az egyenes arányosság képlete y = ax. Ha x = 2 esetén y = 6, akkor a = 6 / 2 = 3. Tehát y = 3x.'
  },
  {
    id: 'ss-q27',
    level: 3,
    question: 'Miért nem alkalmazható a klasszikus P = k/n képlet egy földre dobott rajzszög esetében?',
    options: [
      'Mert a rajzszög aszimmetrikus test, és a kimenetelek (heggyel fel vagy le) nem egyenlően valószínűek',
      'Mert a rajzszög túl kicsi',
      'Mert a rajzszöget tilos feldobni',
      'Mert a hegyes állás valószínűsége mindig 100%'
    ],
    correctAnswer: 0,
    explanation: 'A klasszikus modell alapfeltétele az egyenlő valószínűségű kimenetelek megléte. Aszimmetrikus testnél ez nem teljesül, így csak kísérleti méréssel becsülhetünk.'
  },
  {
    id: 'ss-q28',
    level: 3,
    question: 'Egy dobozban 1-től 30-ig sorszámozott golyók vannak. Egyet húzva mekkora a valószínűsége, hogy a szám 5-tel osztható?',
    options: ['6/30 = 1/5 = 20%', '5/30 = 1/6', '7/30', '30/5 = 6'],
    correctAnswer: 0,
    explanation: 'Az 5-tel osztható számok 1 és 30 között: 5, 10, 15, 20, 25, 30 (k = 6 db). Összesen n = 30. P = 6 / 30 = 1 / 5 = 20%.'
  },
  {
    id: 'ss-q29',
    level: 3,
    question: 'Egy diagramon a tanulók száma osztályonként: 7.A: 24, 7.B: 26, 7.C: 25, 7.D: 25. Mennyi a 4 osztály tanulóinak átlaga és terjedelme?',
    options: ['Átlag = 25, Terjedelem = 2', 'Átlag = 25, Terjedelem = 26', 'Átlag = 24, Terjedelem = 1', 'Átlag = 25,5, Terjedelem = 3'],
    correctAnswer: 0,
    explanation: 'Összeg: 24 + 26 + 25 + 25 = 100. Átlag: 100 / 4 = 25. Terjedelem: max - min = 26 - 24 = 2.'
  },
  {
    id: 'ss-q30',
    level: 3,
    question: 'Mi a legfontosabb összefüggés a tapasztalati relatív gyakoriság (g) és az elméleti valószínűség (P) között?',
    options: [
      'A valószínűség az elméleti várakozás, míg a relatív gyakoriság a kísérleti mérés; sok kísérlet esetén g megközelíti P-t',
      'Mindig pontosan megegyeznek, akárhány kísérletet végzünk',
      'A relatív gyakoriságnak semmi köze az elmélethez',
      'A relatív gyakoriság mindig kisebb, mint a valószínűség'
    ],
    correctAnswer: 0,
    explanation: 'A statisztika és valószínűségszámítás hídja a nagy számok törvénye: az elmélet és a kísérleti gyakorlat sok próba után tökéletesen összeér.'
  }
];

const summaryCheatSheets: CheatSheetContent[] = [
  {
    title: 'Hozzárendelések és Függvények',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 space-y-1 font-mono">
          <div>Függvény: Minden x-hez pontosan 1 y tartozik</div>
          <div>Lineáris függvény: y = ax + b (egyenes vonal)</div>
          <div>Egyenes arányosság: y = ax (origón átmenő egyenes)</div>
          <div>Zérushely: ahol y = 0 (metszi az x tengelyt)</div>
        </div>
      </div>
    )
  },
  {
    title: 'Statisztikai Mutatók és Képletek',
    content: (
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Átlag: x̄ = Σx / n</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Módusz (Mo): Leggyakoribb</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Medián (Me): Középső adat</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Terjedelem: R = Max - Min</div>
        </div>
        <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
          <strong>Relatív gyakoriság:</strong> g = k / n (összegük 100%)<br />
          <strong>Kördiagram:</strong> α = g · 360° (pl. 50% &rarr; 180°, 25% &rarr; 90°)
        </div>
      </div>
    )
  },
  {
    title: 'Valószínűség és Kísérletek',
    content: (
      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Klasszikus valószínűség:</strong> P(A) = kedvező esetek (k) / összes eset (n).</div>
        <div>• <strong>Határok:</strong> 0 ≤ P(A) ≤ 1 (Biztos: P = 1, Lehetetlen: P = 0, Ellentett: P(Ā) = 1 - P(A)).</div>
        <div>• <strong>Nagy számok törvénye:</strong> Sok kísérletnél a tapasztalati relatív gyakoriság megközelíti a valószínűséget (g &rarr; P).</div>
      </div>
    )
  }
];

export const StatsSummaryQuiz: React.FC<StatsSummaryQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="8. Hozzárendelések és statisztika Összefoglaló Kvíz"
      subtitle="Átfogó témazáró kvíz a teljes VII. fejezet tananyagából, 3 nehézségi szinten!"
      topicId="g7-stats-summary"
      topicName="8. Összefoglalás"
      badgeText="7. OSZTÁLY • STATISZTIKA • 🏆 ÖSSZEFOGLALÓ KVÍZ"
      themeColor="slate"
      questions={summaryQuestions}
      cheatSheets={summaryCheatSheets}
      pdfFilename="7_osztaly_statisztika_osszefoglalo_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<StatsSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<StatsSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default StatsSummaryQuiz;
