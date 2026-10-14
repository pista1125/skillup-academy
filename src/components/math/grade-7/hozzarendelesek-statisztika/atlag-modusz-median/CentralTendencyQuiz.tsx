import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { CentralTendencyMatcher } from './CentralTendencyMatcher';
import { CentralTendencySorter } from './CentralTendencySorter';

interface CentralTendencyQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const centralTendencyQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'ct-q1',
    level: 1,
    question: 'Mennyi a [4, 6, 8, 10] számok számtani közepe (átlaga)?',
    options: ['7', '8', '6', '28'],
    correctAnswer: 0,
    explanation: 'Az adatok összege: 4 + 6 + 8 + 10 = 28. Az adatok száma 4. Az átlag: 28 / 4 = 7.'
  },
  {
    id: 'ct-q2',
    level: 1,
    question: 'Mi a módusza a következő jegyeknek: 3, 5, 2, 5, 4, 5, 1?',
    options: ['5', '3', '4', '25'],
    correctAnswer: 0,
    explanation: 'A módusz a legtöbbször előforduló érték. Az 5-ös jegy 3 alkalommal szerepel, többször mint bármelyik másik jegy, így a módusz 5.'
  },
  {
    id: 'ct-q3',
    level: 1,
    question: 'Mennyi a [2, 7, 5, 1, 9] adatsor mediánja?',
    options: ['5', '7', '2', '24'],
    correctAnswer: 0,
    explanation: 'Növekvő sorrendbe állítva az adatokat: 1, 2, 5, 7, 9. Mivel 5 elem van (páratlan), a pontosan középen álló (3.) elem a medián: Me = 5.'
  },
  {
    id: 'ct-q4',
    level: 1,
    question: 'Mennyi a [3, 8, 12, 4, 15] adatsor terjedelme?',
    options: ['12', '15', '3', '8'],
    correctAnswer: 0,
    explanation: 'A terjedelem a legnagyobb és a legkisebb adat különbsége: R = Max - Min = 15 - 3 = 12.'
  },
  {
    id: 'ct-q5',
    level: 1,
    question: 'Mi a legelső kötelező lépés egy minta mediánjának megállapításakor?',
    options: [
      'Az adatok nagyság szerinti (növekvő) sorrendbe állítása',
      'Az összes adat összeadása',
      'A legkisebb szám elosztása kettővel',
      'Az adatok átlagának kiszámítása'
    ],
    correctAnswer: 0,
    explanation: 'A medián a rendezett minta középső értéke. Rendezetlen adatokból kiválasztani a középen levőt szigorúan tilos és téves.'
  },
  {
    id: 'ct-q6',
    level: 1,
    question: 'Egy tanuló dolgozatjegyei: 5, 4, 5, 5, 3, 4, 2. Mennyi a jegyek számtani közepe (átlaga)?',
    options: ['4,0', '4,2', '3,8', '4,5'],
    correctAnswer: 0,
    explanation: 'A jegyek összege: 5 + 4 + 5 + 5 + 3 + 4 + 2 = 28. Jegyek száma: 7. Átlag: 28 / 7 = 4,0.'
  },
  {
    id: 'ct-q7',
    level: 1,
    question: 'Mennyi a [3, 5, 7, 9] adatsor mediánja?',
    options: ['6', '5', '7', '6,5'],
    correctAnswer: 0,
    explanation: 'Mivel 4 adat van (páros elemszám), a két középső szám (5 és 7) számtani közepét vesszük: (5 + 7) / 2 = 12 / 2 = 6.'
  },
  {
    id: 'ct-q8',
    level: 1,
    question: 'Egy adatsorban minden szám pontosan egyszer fordul elő (pl. 2, 4, 7, 9). Mi a módusz?',
    options: [
      'Nincs kitüntetett módusz (vagy nincs módusza)',
      'Mindegyik szám egyszerre a módusz',
      'Mindig a legkisebb szám',
      'Mindig a legnagyobb szám'
    ],
    correctAnswer: 0,
    explanation: 'Ha minden érték gyakorisága azonos (mind 1-szer fordul elő), akkor a sokaságnak nincs kitüntetett leggyakoribb értéke, azaz nincs módusza.'
  },
  {
    id: 'ct-q9',
    level: 1,
    question: 'Mennyi a [6, 6, 6, 6] adatsor terjedelme?',
    options: ['0', '6', '24', '1'],
    correctAnswer: 0,
    explanation: 'A legnagyobb érték 6, a legkisebb érték 6. A terjedelem: R = 6 - 6 = 0.'
  },
  {
    id: 'ct-q10',
    level: 1,
    question: 'Egy osztályban a kedvenc gyümölcsökről szavaztak: Alma (12 szavazat), Banán (18 szavazat), Narancs (7 szavazat). Mi a felmérés módusza?',
    options: ['Banán', '18', 'Alma', '37'],
    correctAnswer: 0,
    explanation: 'A módusz maga a leggyakoribb kategória vagy érték. A legtöbb szavazatot (18) a Banán kapta, így a módusz a Banán (és nem a 18-as gyakoriság!).'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) --
  // ==========================================
  {
    id: 'ct-q11',
    level: 2,
    question: 'Mennyi a [12, 18, 14, 22, 10, 20] adatsor mediánja?',
    options: ['16', '14', '18', '16,5'],
    correctAnswer: 0,
    explanation: 'Növekvő sorrendbe állítva: 10, 12, 14, 18, 20, 22. A két középső szám a 14 és a 18. Számtani közepük: (14 + 18) / 2 = 32 / 2 = 16.'
  },
  {
    id: 'ct-q12',
    level: 2,
    question: 'Péter eddigi 4 dolgozatjegye: 5, 4, 3, 4. Hányast kapott az 5. dolgozatra, ha a félévi átlaga pontosan 4,2 lett?',
    options: ['5-öst', '4-est', '3-ast', 'Nem kaphatott egész jegyet'],
    correctAnswer: 0,
    explanation: '5 jegy esetén az átlag 4,2, így a jegyek összege: 5 · 4,2 = 21. Az eddigi 4 jegy összege: 5 + 4 + 3 + 4 = 16. A hiányzó 5. jegy: 21 - 16 = 5.'
  },
  {
    id: 'ct-q13',
    level: 2,
    question: 'A táblázat egy osztály matematikajegyeit mutatja: 1-es (2 fő), 2-es (4 fő), 3-as (7 fő), 4-es (11 fő), 5-ös (5 fő). Mi a módusz?',
    options: ['4', '11', '3', '5'],
    correctAnswer: 0,
    explanation: 'A legnagyobb létszám (11 fő) a 4-es jegynél szerepel, így a módusz a 4-es jegy (a leggyakoribb érdemjegy).'
  },
  {
    id: 'ct-q14',
    level: 2,
    question: 'Mely értékek a móduszai a [2, 2, 4, 5, 5, 6, 7] adatsornak?',
    options: ['2 és 5 (kétmóduszú)', 'Csak a 2', 'Csak az 5', 'Nincs módusza'],
    correctAnswer: 0,
    explanation: 'A 2-es és az 5-ös is pontosan 2-szer fordul elő, és ez a legnagyobb előfordulási szám. Ezért az adatsor bimodal (kétmóduszú): 2 és 5.'
  },
  {
    id: 'ct-q15',
    level: 2,
    question: 'Az [2, 3, 4, 5, 6] minta átlaga 4, mediánja 4. Ha bekerül a mintába a 100-as kiugró adat, hogyan változik az átlag és a medián?',
    options: [
      'Az átlag 4-ről 20-ra ugrik, miközben a medián alig nő (4-ről 4,5-re)',
      'Az átlag és a medián is pontosan 20 lesz',
      'Egyik sem változik',
      'A medián 50-re ugrik, az átlag változatlan marad'
    ],
    correctAnswer: 0,
    explanation: 'Az új átlag: (20 + 100) / 6 = 120 / 6 = 20. Az új medián: 2, 3, [4, 5], 6, 100 -> (4 + 5) / 2 = 4,5. Az átlag drasztikusan megugrott, a medián stabil maradt.'
  },
  {
    id: 'ct-q16',
    level: 2,
    question: 'Egy téli héten 5 napon át a következő hőmérsékleteket mérték: -4, -2, 0, 2, 4 °C. Mennyi a heti átlaghőmérséklet?',
    options: ['0 °C', '-2 °C', '2 °C', '-1 °C'],
    correctAnswer: 0,
    explanation: 'Az adatok összege: (-4) + (-2) + 0 + 2 + 4 = 0 °C. Az átlag: 0 / 5 = 0 °C.'
  },
  {
    id: 'ct-q17',
    level: 2,
    question: 'Mennyi a [-6, -3, 0, 5, 8] hőmérsékleti adatsor terjedelme?',
    options: ['14', '2', '8', '-14'],
    correctAnswer: 0,
    explanation: 'A legnagyobb érték 8, a legkisebb érték -6. Terjedelem: R = Max - Min = 8 - (-6) = 8 + 6 = 14.'
  },
  {
    id: 'ct-q18',
    level: 2,
    question: 'Hányadik adat a medián egy 15 elemű, nagyság szerint növekvő sorba rendezett adathalmazban?',
    options: ['A 8. adat', 'A 7. adat', 'A 7,5. adat', 'A 9. adat'],
    correctAnswer: 0,
    explanation: 'Páratlan elemszámnál a középső sorszám: (n + 1) / 2 = (15 + 1) / 2 = 16 / 2 = 8. előtte 7 adat van, utána is 7 adat.'
  },
  {
    id: 'ct-q19',
    level: 2,
    question: 'Hányadik adatok számtani közepe a medián egy 20 elemű páros rendezett mintában?',
    options: ['A 10. és a 11. adaté', 'A 9. és a 10. adaté', 'A 10. adaté', 'A 11. és a 12. adaté'],
    correctAnswer: 0,
    explanation: 'Páros n = 20 esetén a két középső sorszám: n/2 = 10 és n/2 + 1 = 11, tehát a 10. és a 11. adat számtani közepe a medián.'
  },
  {
    id: 'ct-q20',
    level: 2,
    question: 'Egy 5 fős csoport jegyei: egy 2-es, kettő 4-es és kettő 5-ös. Mennyi a csoport átlaga?',
    options: ['4,0', '4,2', '3,8', '4,5'],
    correctAnswer: 0,
    explanation: 'Összeg: 1 · 2 + 2 · 4 + 2 · 5 = 2 + 8 + 10 = 20. Átlag: 20 / 5 = 4,0.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ / HALADÓ (21-30) -----
  // ==========================================
  {
    id: 'ct-q21',
    level: 3,
    question: 'Egy osztály A csoportjának (10 fő) dolgozatátlaga 4,0 lett, míg a B csoporté (15 fő) 3,0 lett. Mennyi az egész 25 fős osztály összesített átlaga?',
    options: ['3,4', '3,5', '3,6', '3,2'],
    correctAnswer: 0,
    explanation: 'Az A csoport összpontszáma: 10 · 4,0 = 40. A B csoport összpontszáma: 15 · 3,0 = 45. A teljes osztály összege: 40 + 45 = 85. Az osztályátlag: 85 / 25 = 3,4.'
  },
  {
    id: 'ct-q22',
    level: 3,
    question: 'Egy 5 tagú növekvő adatsor: [2, 5, x, 12, 15]. Tudjuk, hogy a medián 8. Mennyi az x értéke?',
    options: ['8', '7', '9', '10'],
    correctAnswer: 0,
    explanation: 'Mivel a minta 5 elemű és növekvő sorrendben van, a 3. elem (x) a medián. Ezért x = 8.'
  },
  {
    id: 'ct-q23',
    level: 3,
    question: 'Egy kosárlabdázó 4 mérkőzésen elért átlaga 15 pont volt. Hány pontot kell dobnia az 5. meccsen, hogy az új átlaga 17 pontra emelkedjen?',
    options: ['25 pontot', '23 pontot', '20 pontot', '27 pontot'],
    correctAnswer: 0,
    explanation: '4 meccs után a pontok összege: 4 · 15 = 60. Az 5 meccs után szükséges összeg: 5 · 17 = 85. Az 5. meccsen szerzendő pontok száma: 85 - 60 = 25 pont.'
  },
  {
    id: 'ct-q24',
    level: 3,
    question: 'Egy dolgozat minden diákjának pontszámához utólag hozzáadnak 3 bónuszpontot. Hogyan változik a pontszámok átlaga és terjedelme?',
    options: [
      'Az átlag 3-mal nő, miközben a terjedelem nem változik',
      'Az átlag és a terjedelem is 3-mal nő',
      'Csak a terjedelem nő 3-mal, az átlag változatlan',
      'Semelyik mutató sem változik'
    ],
    correctAnswer: 0,
    explanation: 'Ha minden adathoz hozzáadunk egy c konstans számot, az átlag c-vel nő. Mivel a maximum és a minimum is pontosan 3-mal nőtt, különbségük (Max - Min) nem változik!'
  },
  {
    id: 'ct-q25',
    level: 3,
    question: 'Egy 8 elemű rendezett minta mediánja 15. A 4. elem 12. Mennyi az 5. elem?',
    options: ['18', '15', '16', '20'],
    correctAnswer: 0,
    explanation: '8 elem esetén a medián a 4. és 5. elem átlaga: (12 + x) / 2 = 15. Ebből 12 + x = 30, tehát x = 18.'
  },
  {
    id: 'ct-q26',
    level: 3,
    question: 'Egy felmérésben 12 diák olvasási szokásait vizsgálták. A könyvek száma rendezve: 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6. Mennyi a medián?',
    options: ['3', '3,5', '2,5', '4'],
    correctAnswer: 0,
    explanation: '12 adat van, a 6. és 7. elem: mindkettő 3. Számtani közepük: (3 + 3) / 2 = 3. Tehát a medián Me = 3.'
  },
  {
    id: 'ct-q27',
    level: 3,
    question: 'Egy 5 pozitív egész számból álló minta legkisebb értéke 2, terjedelme 7. Mennyi a legnagyobb szám ebben a mintában?',
    options: ['9', '5', '14', '7'],
    correctAnswer: 0,
    explanation: 'Mivel a terjedelem R = Max - Min = 7, és a legkisebb szám Min = 2, így a legnagyobb szám Max = Min + R = 2 + 7 = 9.'
  },
  {
    id: 'ct-q28',
    level: 3,
    question: 'Miért használják a közgazdászok gyakran a mediánbért az átlagbér helyett az életszínvonal vizsgálatakor?',
    options: [
      'Mert a néhány kiugróan milliárdos jövedelem nem húzza fel megtévesztően a mediánt',
      'Mert a mediánt könnyebb összeadni géppel',
      'Mert az átlag mindig kisebb mint a medián',
      'Mert a medián csak kerek szám lehet'
    ],
    correctAnswer: 0,
    explanation: 'A jövedelmek eloszlása erősen jobbra ferde: van néhány rendkívül gazdag ember, aki az átlagot jelentősen megemeli, így az átlag nem mutatja a tipikus dolgozó valós bérét. A medián viszont pontosan a lakosság felének jövedelmi határa.'
  },
  {
    id: 'ct-q29',
    level: 3,
    question: 'Egy adatsor: [-3, 0, 3, 6, 9]. Milyen viszonyban van egymással az átlag és a medián?',
    options: [
      'Egyenlőek: mindkettő pontosan 3',
      'Az átlag nagyobb mint a medián',
      'A medián nagyobb mint az átlag',
      'Nem határozható meg'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: -3 + 0 + 3 + 6 + 9 = 15. Átlag: 15 / 5 = 3. Rendezett középső: 3. Mivel az adatsor szimmetrikusan helyezkedik el a 3 körül, az átlag és a medián megegyezik: mindkettő 3.'
  },
  {
    id: 'ct-q30',
    level: 3,
    question: 'Egy futó 5 napi távjai: 6, 8, 10, 10, 16 km. Az alábbi állítások közül melyik HAMIS?',
    options: [
      'A terjedelem 8 km',
      'Az átlag 10 km',
      'A módusz 10 km',
      'A medián 10 km'
    ],
    correctAnswer: 0,
    explanation: 'Számoljuk ki az értékeket: Átlag = (6+8+10+10+16)/5 = 50/5 = 10 km (IGAZ). Módusz = 10 km (két 10-es van, IGAZ). Medián = 10 km (a középső adat, IGAZ). Terjedelem = 16 - 6 = 10 km (és NEM 8 km!). Tehát az A állítás a HAMIS.'
  }
];

const centralTendencyCheatSheets: CheatSheetContent[] = [
  {
    title: 'A 4 statisztikai mutató képlete',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-1 font-mono">
          <div>Átlag (x̄) = Σx / n  (Összeg / darabszám)</div>
          <div>Módusz (Mo) = A legtöbbször előforduló érték</div>
          <div>Medián (Me) = A rendezett minta középső eleme</div>
          <div>Terjedelem (R) = Max - Min  (Különbség)</div>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          A mediánhoz kötelező az adatok nagyság szerinti sorba rendezése!
        </p>
      </div>
    )
  },
  {
    title: 'Medián számítás lépései',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
          <strong>1. Páratlan elemszám (n páratlan):</strong><br />
          Pontosan a középen lévő elem (sorszám: (n + 1) / 2).
        </div>
        <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong>2. Páros elemszám (n páros):</strong><br />
          A két középső adat számtani közepe: (n/2. és (n/2 + 1). adat átlaga).
        </div>
      </div>
    )
  },
  {
    title: 'Átlag vs. Medián összehasonlítás',
    content: (
      <div className="space-y-3 text-xs">
        <ul className="space-y-1.5 pl-2 list-disc text-slate-700 dark:text-slate-300">
          <li><strong>Átlag:</strong> Nagyon érzékeny a kiugró szélsőséges értékekre.</li>
          <li><strong>Medián:</strong> Robusztus, nem torzul el néhány extrém adattól.</li>
          <li><strong>Módusz:</strong> Akkor is használható, ha az adatok szöveges kategóriák (pl. kedvenc szín).</li>
        </ul>
      </div>
    )
  }
];

export const CentralTendencyQuiz: React.FC<CentralTendencyQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="4. Átlag, módusz, medián Kvíz"
      subtitle="Gyakorold a középértékek, rendezett medián és szóródási terjedelem kiszámítását!"
      topicId="g7-stats-central"
      topicName="4. Átlag, módusz, medián"
      badgeText="7. OSZTÁLY • STATISZTIKA • 🎯 KVÍZ"
      themeColor="emerald"
      questions={centralTendencyQuestions}
      cheatSheets={centralTendencyCheatSheets}
      pdfFilename="7_osztaly_atlag_modusz_median_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<CentralTendencyMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<CentralTendencySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default CentralTendencyQuiz;
