import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { ProbabilityMatcher } from './ProbabilityMatcher';
import { ProbabilitySorter } from './ProbabilitySorter';

interface ProbabilityQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const probabilityQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'pr-q1',
    level: 1,
    question: 'Hogyan számítjuk ki egy esemény valószínűségét a klasszikus valószínűségi modellben?',
    options: [
      'A kedvező esetek számát (k) elosztjuk az összes eset számával (n): P(A) = k / n',
      'Az összes eset számát (n) elosztjuk a kedvező esetek számával (k)',
      'A kedvező esetek számát megszorozzuk az összes eset számával',
      'Kivonjuk a kedvező esetek számát az összes eset számából'
    ],
    correctAnswer: 0,
    explanation: 'A klasszikus modellben a valószínűség: P(A) = kedvező esetek száma (k) / összes lehetséges eset száma (n).'
  },
  {
    id: 'pr-q2',
    level: 1,
    question: 'Mennyi a biztos esemény (I) valószínűsége?',
    options: ['P(I) = 1 (azaz 100%)', 'P(I) = 0 (azaz 0%)', 'P(I) = 0,5 (azaz 50%)', 'Nem lehet előre tudni'],
    correctAnswer: 0,
    explanation: 'A biztos esemény minden kísérlet során biztosan bekövetkezik, ezért valószínűsége P(I) = 1 = 100%.'
  },
  {
    id: 'pr-q3',
    level: 1,
    question: 'Mennyi a lehetetlen esemény (∅) valószínűsége?',
    options: ['P(∅) = 0 (azaz 0%)', 'P(∅) = 1 (azaz 100%)', 'P(∅) = 0,1 (azaz 10%)', 'P(∅) = -1'],
    correctAnswer: 0,
    explanation: 'A lehetetlen esemény soha nem következhet be semmilyen kísérletben sem, ezért valószínűsége pontosan 0 (0%).'
  },
  {
    id: 'pr-q4',
    level: 1,
    question: 'Egy szabályos pénzérmét feldobva mekkora a valószínűsége, hogy Fejet (F) kapunk?',
    options: ['1/2 = 0,5 = 50%', '1/1 = 1 = 100%', '1/4 = 0,25 = 25%', '2/1 = 200%'],
    correctAnswer: 0,
    explanation: 'A lehetséges kimenetelek száma n = 2 (Fej, Írás). Kedvező eset: k = 1 (Fej). Tehát P = 1/2 = 50%.'
  },
  {
    id: 'pr-q5',
    level: 1,
    question: 'Egy szabályos dobókockával dobva hányféle elemi kimenetel lehetséges összesen (n)?',
    options: ['6 kimenetel (1, 2, 3, 4, 5, 6)', '12 kimenetel', '3 kimenetel', '36 kimenetel'],
    correctAnswer: 0,
    explanation: 'Egy szabályos hatoldalú kocka lapjain a számok: 1, 2, 3, 4, 5, 6, tehát összesen n = 6 egyenlően valószínű elemi kimenetel létezik.'
  },
  {
    id: 'pr-q6',
    level: 1,
    question: 'Egy szabályos dobókockával dobva mekkora a valószínűsége annak, hogy hatost dobunk?',
    options: ['1/6 (kb. 16,7%)', '6/6 = 1', '1/2 = 50%', '1/3'],
    correctAnswer: 0,
    explanation: 'Összes eset: n = 6. A kedvező eset a 6-os dobás, tehát k = 1. Valószínűség: P = 1/6 ≈ 16,7%.'
  },
  {
    id: 'pr-q7',
    level: 1,
    question: 'Melyik állítás ír le egy LEHETETLEN eseményt egy szabályos dobókocka esetén?',
    options: [
      '7-es számot dobunk a kockával',
      'Páros számot dobunk',
      '1-est dobunk',
      '6-nál nem nagyobb számot dobunk'
    ],
    correctAnswer: 0,
    explanation: 'A normál dobókockán a számok 1-től 6-ig terjednek. 7-est dobni lehetetlen, valószínűsége P = 0.'
  },
  {
    id: 'pr-q8',
    level: 1,
    question: 'Melyik állítás ír le egy BIZTOS eseményt egy szabályos dobókocka esetén?',
    options: [
      '7-nél kisebb pozitív egész számot dobunk',
      '6-ost dobunk',
      'Páratlan számot dobunk',
      '3-nál nagyobb számot dobunk'
    ],
    correctAnswer: 0,
    explanation: 'A kocka összes lapján 7-nél kisebb pozitív egész szám (1, 2, 3, 4, 5, 6) szerepel, így ez minden dobásnál bekövetkezik (P = 6/6 = 1).'
  },
  {
    id: 'pr-q9',
    level: 1,
    question: 'Egy dobozban 10 golyó van: 10 fehér és 0 fekete. Mennyi a fekete golyó húzásának valószínűsége?',
    options: ['0 (0%)', '1 (100%)', '1/10 (10%)', '0,5 (50%)'],
    correctAnswer: 0,
    explanation: 'Mivel a dobozban egyetlen fekete golyó sincs, k = 0, így P = 0/10 = 0 (lehetetlen esemény).'
  },
  {
    id: 'pr-q10',
    level: 1,
    question: 'Mely értékek közé eshet mindig egy tetszőleges esemény valószínűsége (P)?',
    options: ['0 és 1 közé: 0 ≤ P ≤ 1 (azaz 0% és 100% közé)', '-1 és 1 közé', '1 és 100 közé', 'Tetszőleges pozitív szám lehet'],
    correctAnswer: 0,
    explanation: 'Egy esemény valószínűsége soha nem lehet negatív, és nem lehet 1-nél (100%-nál) nagyobb: 0 ≤ P(A) ≤ 1.'
  },

  // ===========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ===========================================
  {
    id: 'pr-q11',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége annak, hogy páros számot dobunk?',
    options: ['3/6 = 1/2 = 50%', '2/6 = 1/3', '4/6 = 2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A páros számok a kockán: 2, 4, 6. Ez k = 3 kedvező eset a 6-ból. Tehát P = 3/6 = 1/2 = 50%.'
  },
  {
    id: 'pr-q12',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége annak, hogy prímszámot dobunk?',
    options: ['3/6 = 1/2 = 50%', '4/6 = 2/3', '2/6 = 1/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A kockán szereplő prímszámok: 2, 3, 5 (vigyázat: az 1 nem prím!). Kedvező esetek: k = 3. Tehát P = 3/6 = 1/2 = 50%.'
  },
  {
    id: 'pr-q13',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége, hogy 4-nél nagyobb számot dobunk?',
    options: ['2/6 = 1/3 (kb. 33,3%)', '3/6 = 1/2', '4/6 = 2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A 4-nél nagyobb számok: 5 és 6. Ez k = 2 kedvező eset. P = 2/6 = 1/3 ≈ 33,3%.'
  },
  {
    id: 'pr-q14',
    level: 2,
    question: 'Egy urnában 4 piros és 6 kék golyó van. Véletlenszerűen húzva egy golyót, mekkora a piros húzásának valószínűsége?',
    options: ['4/10 = 2/5 = 40%', '6/10 = 60%', '4/6 = 2/3', '1/4 = 25%'],
    correctAnswer: 0,
    explanation: 'Összesen n = 4 + 6 = 10 golyó van. Kedvező: k = 4 piros. Valószínűség: P = 4/10 = 2/5 = 0,4 = 40%.'
  },
  {
    id: 'pr-q15',
    level: 2,
    question: 'Ha egy esemény valószínűsége P(A) = 0,35, mennyi az ellentett eseményének P(Ā) valószínűsége?',
    options: ['0,65 (65%)', '0,35 (35%)', '1,35', '0'],
    correctAnswer: 0,
    explanation: 'Az esemény és ellentettjének valószínűsége 1-re egészíti ki egymást: P(Ā) = 1 - P(A) = 1 - 0,35 = 0,65 = 65%.'
  },
  {
    id: 'pr-q16',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége, hogy NEM hatost dobunk?',
    options: ['5/6 (kb. 83,3%)', '1/6', '6/5', '1/2'],
    correctAnswer: 0,
    explanation: 'A 6-os dobás ellentett eseménye az 1, 2, 3, 4, 5 dobása. P = 1 - 1/6 = 5/6 ≈ 83,3%.'
  },
  {
    id: 'pr-q17',
    level: 2,
    question: 'Egy urnában 5 piros, 3 kék és 2 zöld golyó található. Mekkora a valószínűsége, hogy kék golyót húzunk?',
    options: ['3/10 = 0,3 = 30%', '5/10 = 50%', '2/10 = 20%', '3/5 = 60%'],
    correctAnswer: 0,
    explanation: 'Összesen n = 5 + 3 + 2 = 10 golyó van. Kedvező: k = 3 kék. Valószínűség: P = 3/10 = 30%.'
  },
  {
    id: 'pr-q18',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége, hogy 3-mal osztható számot dobunk?',
    options: ['2/6 = 1/3 (kb. 33,3%)', '3/6 = 1/2', '1/6', '4/6 = 2/3'],
    correctAnswer: 0,
    explanation: 'A 3-mal osztható számok 1 és 6 között a 3 és a 6 (k = 2 eset). Tehát P = 2/6 = 1/3 ≈ 33,3%.'
  },
  {
    id: 'pr-q19',
    level: 2,
    question: 'A tombolán 200 sorsjegyet adtak el, ebből 10 nyereményt sorsolnak ki. Mekkora az esélye, hogy 1 db megvásárolt jegy nyer?',
    options: ['10/200 = 1/20 = 5%', '1/10 = 10%', '10/190', '1/200 = 0,5%'],
    correctAnswer: 0,
    explanation: 'Összes jegy: n = 200. Nyerő jegyek: k = 10. Valószínűség: P = 10 / 200 = 1 / 20 = 0,05 = 5%.'
  },
  {
    id: 'pr-q20',
    level: 2,
    question: 'Egy szabályos kockával dobva mekkora a valószínűsége annak, hogy legalább 2-est dobunk?',
    options: ['5/6 (kb. 83,3%)', '2/6 = 1/3', '4/6 = 2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A legalább 2-es azt jelenti: 2, 3, 4, 5, 6. Ez k = 5 kedvező eset a 6-ból. (Vagy ellentett eseménnyel: 1 - P(1) = 1 - 1/6 = 5/6).'
  },

  // ===========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ===========================================
  {
    id: 'pr-q21',
    level: 3,
    question: 'Két szabályos pénzérmét dobunk fel egyszerre. Mekkora a valószínűsége annak, hogy mindkettő Fej lesz?',
    options: ['1/4 = 0,25 = 25%', '1/2 = 50%', '2/4 = 50%', '1/3'],
    correctAnswer: 0,
    explanation: 'A lehetséges kimenetelek (n = 4): (F;F), (F;Í), (Í;F), (Í;Í). Csak az (F;F) a kedvező (k = 1). Tehát P = 1/4 = 25%.'
  },
  {
    id: 'pr-q22',
    level: 3,
    question: 'Két szabályos pénzérmét dobunk fel egyszerre. Mekkora a valószínűsége, hogy LEGALÁBB egy Fejet kapunk?',
    options: ['3/4 = 0,75 = 75%', '1/2 = 50%', '1/4 = 25%', '2/3'],
    correctAnswer: 0,
    explanation: 'A kimenetelek: FF, FÍ, ÍF, ÍÍ (n = 4). Legalább egy fej szerepel az FF, FÍ, ÍF esetekben (k = 3). Ellentett esemény: 1 - P(ÍÍ) = 1 - 1/4 = 3/4 = 75%.'
  },
  {
    id: 'pr-q23',
    level: 3,
    question: 'Egy jól megkevert 32 lapos magyar kártyacsomagból egy lapot húzunk. Mekkora a valószínűsége, hogy Ászt húzunk?',
    options: ['4/32 = 1/8 = 12,5%', '1/32 ≈ 3,1%', '8/32 = 25%', '4/4 = 1'],
    correctAnswer: 0,
    explanation: 'A 32 lapos pakliban 4 darab ász lap van (piros, tök, zöld, makk). Így P = 4/32 = 1/8 = 0,125 = 12,5%.'
  },
  {
    id: 'pr-q24',
    level: 3,
    question: 'Egy 32 lapos magyar kártyacsomagból egy lapot húzunk. Mekkora a valószínűsége, hogy Piros színű lapot húzunk?',
    options: ['8/32 = 1/4 = 25%', '4/32 = 12,5%', '16/32 = 50%', '1/8'],
    correctAnswer: 0,
    explanation: 'A pakliban 4 szín van egyenlő arányban (színenként 8 lap). Piros színű lap: k = 8. Így P = 8/32 = 1/4 = 25%.'
  },
  {
    id: 'pr-q25',
    level: 3,
    question: 'Két szabályos dobókockát dobunk fel egyszerre. Hányféle rendezett kimenetel (n) lehetséges összesen?',
    options: ['36 kimenetel (6 · 6 = 36)', '12 kimenetel', '24 kimenetel', '18 kimenetel'],
    correctAnswer: 0,
    explanation: 'Az első kocka 6-féle, a második kocka is 6-féle értéket vehet fel. A lehetséges számpárok száma: 6 · 6 = 36.'
  },
  {
    id: 'pr-q26',
    level: 3,
    question: 'Két szabályos dobókockát dobva mekkora a valószínűsége annak, hogy a dobott számok összege 12 lesz?',
    options: ['1/36 (kb. 2,8%)', '2/36 = 1/18', '1/12', '1/6'],
    correctAnswer: 0,
    explanation: 'A maximális 12-es összeg csak egyetlen módon érhető el: ha mindkét kockával 6-ost dobunk: (6; 6). k = 1 a 36-ból. Tehát P = 1/36 ≈ 2,8%.'
  },
  {
    id: 'pr-q27',
    level: 3,
    question: 'Két szabályos dobókockát dobva mekkora a valószínűsége, hogy mindkét kockával azonos számot dobunk (dupla dobás)?',
    options: ['6/36 = 1/6 (kb. 16,7%)', '2/36 = 1/18', '1/36', '12/36 = 1/3'],
    correctAnswer: 0,
    explanation: 'A kedvező párok: (1;1), (2;2), (3;3), (4;4), (5;5), (6;6). Ez k = 6 kedvező eset a 36-ból. Tehát P = 6/36 = 1/6 ≈ 16,7%.'
  },
  {
    id: 'pr-q28',
    level: 3,
    question: 'Egy urnában 3 fehér és 2 fekete golyó van. Visszatevés NÉLKÜL egymás után két golyót húzunk. Mekkora a valószínűsége, hogy mindkettő fehér lesz?',
    options: ['3/10 = 30%', '9/25 = 36%', '6/20 = 30%', '1/2 = 50%'],
    correctAnswer: 0,
    explanation: 'Az első fehér valószínűsége: 3/5. Maradt 4 golyó (2 fehér, 2 fekete). A második fehér esélye: 2/4. Összesen: (3/5) · (2/4) = 6/20 = 3/10 = 30%.'
  },
  {
    id: 'pr-q29',
    level: 3,
    question: 'Egy szabályos pénzérmét 1000-szer feldobva 492 fejet kapunk. Mit mond a nagy számok törvénye erről?',
    options: [
      'A fej dobások relatív gyakorisága (0,492) nagyon közel került az elméleti 0,5 valószínűséghez',
      'A kocka vagy érme hibás, mert pontosan 500 fejnek kellett volna kijönnie',
      'A következő 1000 dobás során biztosan több írás lesz',
      'A relatív gyakoriságnak semmi köze a valószínűséghez'
    ],
    correctAnswer: 0,
    explanation: 'A nagy számok törvénye szerint nagyszámú ismétlésnél a relatív gyakoriság (492/1000 = 0,492) megközelíti az elméleti valószínűséget (0,5).'
  },
  {
    id: 'pr-q30',
    level: 3,
    question: 'Egy dobozban 1-től 20-ig sorszámozott golyók vannak. Egyet húzva mekkora a valószínűsége, hogy a szám 4-gyel VAGY 5-tel osztható?',
    options: ['8/20 = 2/5 = 40%', '9/20 = 45%', '7/20 = 35%', '4/20 = 20%'],
    correctAnswer: 0,
    explanation: '4-gyel oszthatók: 4, 8, 12, 16, 20 (5 db). 5-tel oszthatók: 5, 10, 15, 20 (4 db). A 20 mindkettőben szerepel, ezért nem számoljuk duplán! Összes kedvező szám: {4, 5, 8, 10, 12, 15, 16, 20} &rarr; k = 8. P = 8/20 = 40%.'
  }
];

const probabilityCheatSheets: CheatSheetContent[] = [
  {
    title: 'A klasszikus valószínűség alapképlete',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1 font-mono">
          <div>P(A) = kedvező esetek (k) / összes eset (n) = k / n</div>
          <div>0 ≤ P(A) ≤ 1  (vagyis 0% és 100% között)</div>
          <div>Biztos esemény: P(I) = 1 = 100%</div>
          <div>Lehetetlen esemény: P(∅) = 0 = 0%</div>
          <div>Ellentett esemény: P(Ā) = 1 - P(A)</div>
        </div>
      </div>
    )
  },
  {
    title: 'Szabályos dobókocka és pénzérme esélyei',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-mono">
          Kockadobás (n = 6):
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Páros szám (2, 4, 6) → 3/6 = 50%</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Prímszám (2, 3, 5) → 3/6 = 50%</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">Egy adott szám (pl. 6) → 1/6 ≈ 16,7%</div>
          <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">4-nél nagyobb (5, 6) → 2/6 = 1/3 ≈ 33,3%</div>
        </div>
        <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-[11px]">
          <strong>Pénzérme (n = 2):</strong> P(Fej) = 1/2 = 50%, P(Írás) = 1/2 = 50%.<br />
          <strong>Két érme (n = 4):</strong> FF, FÍ, ÍF, ÍÍ &rarr; P(két fej) = 1/4 = 25%.
        </div>
      </div>
    )
  },
  {
    title: 'Golyóhúzás és Kártyapaklik',
    content: (
      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Urnamodell:</strong> Add össze a golyók darabszámát az összes esethez (n = összes golyó száma), majd a keresett szín darabszáma a k.</div>
        <div>• <strong>Magyar kártya (32 lap):</strong> 4 szín (piros, tök, zöld, makk), színenként 8 lap. 4 ász van benne &rarr; P(ász) = 4/32 = 1/8 = 12,5%.</div>
        <div>• <strong>Két kocka összege (n = 36):</strong> 6 · 6 = 36 kimenetel. Leggyakoribb összeg a 7 (6 párral: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1 &rarr; 6/36 = 1/6).</div>
      </div>
    )
  }
];

export const ProbabilityQuiz: React.FC<ProbabilityQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="6. Valószínűségszámítás Kvíz"
      subtitle="Teszteld a tudásod a klasszikus valószínűség, kockák, érmék, urnák és események témakörében!"
      topicId="g7-stats-prob"
      topicName="6. Valószínűség"
      badgeText="7. OSZTÁLY • STATISZTIKA • 🎯 KVÍZ"
      themeColor="amber"
      questions={probabilityQuestions}
      cheatSheets={probabilityCheatSheets}
      pdfFilename="7_osztaly_valoszinuseg_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<ProbabilityMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ProbabilitySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default ProbabilityQuiz;
