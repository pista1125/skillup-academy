import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { FrequencyAnalysisMatcher } from './FrequencyAnalysisMatcher';
import { FrequencyAnalysisSorter } from './FrequencyAnalysisSorter';

interface FrequencyAnalysisQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const frequencyQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'fa-q1',
    level: 1,
    question: 'Hogyan számítjuk ki egy esemény relatív gyakoriságát (g)?',
    options: [
      'A gyakoriságot (k) elosztjuk az összes megfigyelés számával (n): g = k / n',
      'A gyakoriságot megszorozzuk az összes adat számával',
      'Az összes adat számából kivonjuk a gyakoriságot',
      'Összeadjuk az adatokat és elosztjuk kettővel'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság a gyakoriság (k) és a teljes minta létszámának (n) hányadosa: g = k / n.'
  },
  {
    id: 'fa-q2',
    level: 1,
    question: 'Egy 20 fős csoportban 5 diák kitűnő eredményt ért el. Mennyi a kitűnők relatív gyakorisága egyszerűsített tört alakban?',
    options: ['1/4', '5/20', '1/5', '1/2'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 5 / 20. Egyszerűsítve 5-tel: 1 / 4.'
  },
  {
    id: 'fa-q3',
    level: 1,
    question: 'Egy kategória relatív gyakorisága g = 1/4. Mennyi ez százalékos alakban kifejezve?',
    options: ['25%', '20%', '40%', '14%'],
    correctAnswer: 0,
    explanation: '1 / 4 = 0,25 = 25%.'
  },
  {
    id: 'fa-q4',
    level: 1,
    question: 'Mennyi egy felmérés összes kategóriájához tartozó relatív gyakoriságok összege?',
    options: ['Mindig pontosan 1 (vagy 100%)', 'Mindig 0', 'Mindig 360', 'Az adatok darabszáma (n)'],
    correctAnswer: 0,
    explanation: 'Mivel a kategóriák a teljes mintát lefedik, a részek relatív gyakoriságainak összege mindig pontosan 1, azaz 100%.'
  },
  {
    id: 'fa-q5',
    level: 1,
    question: 'Egy kördiagramban mekkora középponti szög tartozik egy 50%-os (fél) részarányhoz?',
    options: ['180°', '90°', '360°', '50°'],
    correctAnswer: 0,
    explanation: 'A teljes kör 360°. Ennek az 50%-a: 0,50 · 360° = 180° (egyenesszög, félkör).'
  },
  {
    id: 'fa-q6',
    level: 1,
    question: 'Egy kördiagramban mekkora középponti szög tartozik egy 25%-os (negyed) részarányhoz?',
    options: ['90° (derékszög)', '45°', '25°', '120°'],
    correctAnswer: 0,
    explanation: 'A 360° negyedrésze: 0,25 · 360° = 90° (derékszög).'
  },
  {
    id: 'fa-q7',
    level: 1,
    question: 'Az alábbi állítások közül melyik fejez ki relatív gyakoriságot?',
    options: [
      'A tanulók 40%-a busszal jár iskolába',
      'A könyvtárban 12 diák olvas',
      'Péter 8 gólt lőtt a bajnokságban',
      'A dobozban 15 golyó van'
    ],
    correctAnswer: 0,
    explanation: 'A 40% egy arány a teljes létszámhoz képest, tehát relatív gyakoriság. A 12 diák, 8 gól és 15 golyó abszolút darabszámok (gyakoriságok).'
  },
  {
    id: 'fa-q8',
    level: 1,
    question: 'Egy érmét 100-szor feldobva 53 fejet kaptunk. Mennyi az írás dobások relatív gyakorisága tizedestört alakban?',
    options: ['0,47', '0,53', '47', '0,50'],
    correctAnswer: 0,
    explanation: 'Az írások száma: 100 - 53 = 47. A relatív gyakoriság: 47 / 100 = 0,47 (azaz 47%).'
  },
  {
    id: 'fa-q9',
    level: 1,
    question: 'Mekkora középponti szög tartozik egy kördiagramban a 10%-os részarányhoz?',
    options: ['36°', '10°', '18°', '360°'],
    correctAnswer: 0,
    explanation: 'A 360° 10%-a: 0,10 · 360° = 36°.'
  },
  {
    id: 'fa-q10',
    level: 1,
    question: 'Melyik diagramtípus mutatja meg a legszemléletesebben egy családi költségvetés kiadásainak részekre bontását az egészhez képest?',
    options: ['Kördiagram', 'Vonaldiagram', 'Szórásdiagram', 'Dobozdiagram'],
    correctAnswer: 0,
    explanation: 'A kördiagram kimondottan a részek és az egész arányának ábrázolására szolgál, ahol a teljes kör a 100%-os költségvetést szemlélteti.'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) --
  // ==========================================
  {
    id: 'fa-q11',
    level: 2,
    question: 'Egy felmérésben három kategória van. Az első kettő relatív gyakorisága 0,35 és 0,45. Mennyi a harmadik kategória relatív gyakorisága?',
    options: ['0,20 (20%)', '0,80 (80%)', '0,10 (10%)', '0,25 (25%)'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriságok összege 1,00. Ezért a harmadik kategória: 1,00 - (0,35 + 0,45) = 1,00 - 0,80 = 0,20 (azaz 20%).'
  },
  {
    id: 'fa-q12',
    level: 2,
    question: 'Egy 20 fős osztályban 6 diák jár busszal iskolába. Mekkora középponti szög tartozik hozzájuk a kördiagramban?',
    options: ['108°', '120°', '60°', '72°'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 6 / 20 = 0,30 = 30%. A középponti szög: α = 0,30 · 360° = 108°.'
  },
  {
    id: 'fa-q13',
    level: 2,
    question: 'Egy kördiagramban egy körcikk szöge pontosan 72°. A minta mekkora százalékát képviseli ez a körcikk?',
    options: ['20%', '25%', '15%', '30%'],
    correctAnswer: 0,
    explanation: 'A 72° a teljes 360°-os körnek: 72 / 360 = 1 / 5 része, ami 0,20 = 20%.'
  },
  {
    id: 'fa-q14',
    level: 2,
    question: 'Egy 40 fős diákcsoportban a sakkozók relatív gyakorisága 15%. Hányan sakkoznak a csoportban?',
    options: ['6 fő', '8 fő', '4 fő', '15 fő'],
    correctAnswer: 0,
    explanation: 'A gyakoriság: k = n · g = 40 · 0,15 = 6 fő.'
  },
  {
    id: 'fa-q15',
    level: 2,
    question: 'Egy oszlopdiagramon 4 oszlop látható, magasságaik: 3, 7, 12, 8. Hány adatot figyeltek meg összesen?',
    options: ['30', '28', '32', '24'],
    correctAnswer: 0,
    explanation: 'Az összes megfigyelés száma a gyakoriságok összege: n = 3 + 7 + 12 + 8 = 30.'
  },
  {
    id: 'fa-q16',
    level: 2,
    question: 'Az előző feladatban (összesen n = 30 adat) mekkora a 12 magasságú oszlop relatív gyakorisága?',
    options: ['40% (0,40)', '35%', '30%', '50%'],
    correctAnswer: 0,
    explanation: 'g = k / n = 12 / 30. Egyszerűsítve 6-tal: 2 / 5 = 0,40 = 40%.'
  },
  {
    id: 'fa-q17',
    level: 2,
    question: 'Egy szabályos dobókockával 60 dobásból 15-ször dobtunk hatost. Mennyi a hatos dobás relatív gyakorisága?',
    options: ['25% (1/4)', '15%', '1/6', '20%'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 15 / 60 = 1 / 4 = 0,25 = 25%.'
  },
  {
    id: 'fa-q18',
    level: 2,
    question: 'Egy kördiagram 4 szeletből áll. Három körcikk szöge: 120°, 90° és 70°. Mekkora a negyedik körcikk szöge?',
    options: ['80°', '90°', '75°', '100°'],
    correctAnswer: 0,
    explanation: 'A teljes szög 360°. A negyedik szög: 360° - (120° + 90° + 70°) = 360° - 280° = 80°.'
  },
  {
    id: 'fa-q19',
    level: 2,
    question: 'Ha egy dolgozatban a kitűnők aránya 20%, a jeleseké pedig 30%, mekkora körcikk-szög tartozik e két kategóriához együttesen?',
    options: ['180° (félkör)', '150°', '120°', '90°'],
    correctAnswer: 0,
    explanation: 'Együttes arányuk: 20% + 30% = 50%. A kördiagramban az 50%-hoz tartozó szög: 0,50 · 360° = 180° (félkör).'
  },
  {
    id: 'fa-q20',
    level: 2,
    question: 'Az A iskolában 40 diák bukott meg a 800-ból, a B iskolában 30 diák bukott meg a 300-ból. Melyik iskolában volt magasabb a bukási arány (relatív gyakoriság)?',
    options: [
      'A B iskolában (10% vs. 5%)',
      'Az A iskolában, mert ott 40 fő bukott meg (többen)',
      'Egyforma volt a bukási arány',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriságok: A iskola: 40 / 800 = 5%; B iskola: 30 / 300 = 10%. Bár az A-ban többen buktak meg számszerűen, a B-ben a bukási arány kétszer akkora volt!'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ / HALADÓ (21-30) -----
  // ==========================================
  {
    id: 'fa-q21',
    level: 3,
    question: 'Egy dolgozat jegyei a következő relatív gyakoriságokkal fordultak elő: 5 (20%), 4 (40%), 3 (30%), 2 (10%). Mennyi a jegyek súlyozott számtani közepe?',
    options: ['3,7', '3,5', '4,0', '3,8'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriságokkal súlyozott átlag: 5 · 0,2 + 4 · 0,4 + 3 · 0,3 + 2 · 0,1 = 1,0 + 1,6 + 0,9 + 0,2 = 3,7.'
  },
  {
    id: 'fa-q22',
    level: 3,
    question: 'Egy felmérésben az A kategória 12 főt számlál, ami a teljes minta 30%-a. Hány fő tartozik a B kategóriába, ha annak relatív gyakorisága 45%?',
    options: ['18 fő', '15 fő', '20 fő', '16 fő'],
    correctAnswer: 0,
    explanation: 'A teljes minta létszáma: n = 12 / 0,30 = 40 fő. A B kategória darabszáma: 40 · 0,45 = 18 fő.'
  },
  {
    id: 'fa-q23',
    level: 3,
    question: 'Egy minta 7/18 része esik egy adott csoportba. Mekkora középponti szög tartozik ehhez a kördiagramban?',
    options: ['140°', '120°', '150°', '135°'],
    correctAnswer: 0,
    explanation: 'A szög: α = (7 / 18) · 360° = 7 · (360° / 18) = 7 · 20° = 140°.'
  },
  {
    id: 'fa-q24',
    level: 3,
    question: 'Egy 200 fős minta kördiagramján egy körcikk szöge 54°. Hány fő tartozik ehhez a kategóriához?',
    options: ['30 fő', '25 fő', '36 fő', '27 fő'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság: g = 54° / 360° = 0,15 = 15%. A darabszám: k = 200 · 0,15 = 30 fő.'
  },
  {
    id: 'fa-q25',
    level: 3,
    question: '10 pénzérmedobásból 6 fej volt (60%). A következő 2 dobás írás lett. Mennyi lett a fejek új relatív gyakorisága?',
    options: ['50% (6/12)', '55%', '45%', '60%'],
    correctAnswer: 0,
    explanation: 'Az új összes dobásszám: 10 + 2 = 12. A fejek száma maradt 6. Az új relatív gyakoriság: 6 / 12 = 1 / 2 = 0,50 = 50%.'
  },
  {
    id: 'fa-q26',
    level: 3,
    question: 'Mikor NEM alkalmas a kördiagram az adatok ábrázolására?',
    options: [
      'Ha az adatok nem egy közös egész 100%-os megoszlását alkotják, vagy negatív értékek is vannak',
      'Ha túl sok adat van (több mint 3)',
      'Ha minden kategória értéke pozitív egész szám',
      'Ha a körcikkek szögei különbözőek'
    ],
    correctAnswer: 0,
    explanation: 'A kördiagram alapfeltétele, hogy a részek egy teljes egészet (100%-ot) alkossanak, és minden adat nemnegatív legyen. Ha az adatok független mérések vagy negatívak (pl. téli hőmérsékletek), a kördiagram értelmezhetetlen.'
  },
  {
    id: 'fa-q27',
    level: 3,
    question: '50 boltba betérő vevő kosárértéke sávokban: 0–2000 Ft (15 fő), 2001–5000 Ft (20 fő), 5000 Ft felett (15 fő). A vevők hány százaléka költött 2000 Ft felett?',
    options: ['70%', '60%', '30%', '40%'],
    correctAnswer: 0,
    explanation: 'A 2000 Ft feletti vásárlók száma: 20 + 15 = 35 fő. A relatív gyakoriság: 35 / 50 = 70 / 100 = 70%.'
  },
  {
    id: 'fa-q28',
    level: 3,
    question: 'Egy kördiagram két szomszédos körcikkének aránya 2 : 3, és együttesen egy félkört (180°) töltenek ki. Mekkora a kisebbik körcikk szöge?',
    options: ['72°', '60°', '90°', '36°'],
    correctAnswer: 0,
    explanation: 'Az arány 2x + 3x = 5x = 180°. Ebből x = 36°. A kisebbik körcikk: 2 · 36° = 72°, a nagyobbik 3 · 36° = 108°.'
  },
  {
    id: 'fa-q29',
    level: 3,
    question: 'Egy termékteszten az A terméket a tesztelők 62%-a, a B terméket 48%-a ajánlotta. Hány százalékponttal nagyobb az A termék relatív gyakorisága?',
    options: ['14 százalékponttal', '12 százalékponttal', '24 százalékponttal', '10 százalékponttal'],
    correctAnswer: 0,
    explanation: 'Két százalékos érték különbségét százalékpontban fejezzük ki: 62% - 48% = 14 százalékpont.'
  },
  {
    id: 'fa-q30',
    level: 3,
    question: 'Egy 50 fős minta 4 kategóriája: A (10 fő), B (15 fő), C (20 fő), D (5 fő). Az alábbi állítások közül melyik HAMIS?',
    options: [
      'Az A kategória körcikkének szöge 90°',
      'A C kategória relatív gyakorisága 40%',
      'A D kategória körcikkének szöge 36°',
      'Az A és B kategória együtt a minta 50%-át teszi ki'
    ],
    correctAnswer: 0,
    explanation: 'Számoljuk ki az értékeket: C: 20/50 = 40% (IGAZ); D: 5/50 · 360° = 36° (IGAZ); A+B: (10+15)/50 = 25/50 = 50% (IGAZ); A: 10/50 = 0,20 · 360° = 72° (és NEM 90°!). Tehát az A állítás a HAMIS.'
  }
];

const frequencyCheatSheets: CheatSheetContent[] = [
  {
    title: 'Gyakoriság és Relatív gyakoriság képletei',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-950 dark:text-teal-200 space-y-1 font-mono">
          <div>Gyakoriság (k): Adott érték előfordulási darabszáma</div>
          <div>Összes adat (n): A gyakoriságok összege (Σ k)</div>
          <div>Relatív gyakoriság (g): g = k / n</div>
          <div>Σ g = 1 = 100%  (A részek összege az egész!)</div>
        </div>
      </div>
    )
  },
  {
    title: 'Kördiagram középponti szögek',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200 font-mono">
          α = g · 360° = (k / n) · 360°
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">50% → 180° (félkör)</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">25% → 90° (derékszög)</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">10% → 36°</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">1% → 3,6°</div>
        </div>
      </div>
    )
  },
  {
    title: 'Diagramtípusok kiválasztása',
    content: (
      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Kördiagram:</strong> Részek aránya egy teljes 100%-os egészhez képest.</div>
        <div>• <strong>Oszlopdiagram:</strong> Különböző csoportok gyakoriságának összehasonlítására.</div>
        <div>• <strong>Vonaldiagram:</strong> Időbeli folytonos folyamatok, változások ábrázolására.</div>
      </div>
    )
  }
];

export const FrequencyAnalysisQuiz: React.FC<FrequencyAnalysisQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="5. Gyakoriság, relatív gyakoriság Kvíz"
      subtitle="Gyakorold a gyakorisági táblázatok kitöltését, százalékos átváltást és kördiagramok számítását!"
      topicId="g7-stats-freq"
      topicName="5. Gyakoriság, relatív gyakoriság"
      badgeText="7. OSZTÁLY • STATISZTIKA • 🎯 KVÍZ"
      themeColor="teal"
      questions={frequencyQuestions}
      cheatSheets={frequencyCheatSheets}
      pdfFilename="7_osztaly_gyakorisag_relativ_gyakorisag_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FrequencyAnalysisMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FrequencyAnalysisSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-600 dark:text-teal-300 border-teal-200 dark:border-teal-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-teal-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-teal-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-600 dark:text-teal-300 border-teal-200 dark:border-teal-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-teal-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default FrequencyAnalysisQuiz;
