import React, { useState, useEffect } from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { WordProblemsSummaryMatcher } from './WordProblemsSummaryMatcher';
import { WordProblemsSummarySorter } from './WordProblemsSummarySorter';

export interface WordProblemsSummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

export const WordProblemsSummaryQuiz: React.FC<WordProblemsSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levelCheatSheets: Record<DifficultyLevel, React.ReactNode> = {
    1: (
      <div className="space-y-3">
        <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm">
          🏆 1. Szint: Fejezeti alapfogalmak és alapváltások
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Mértékegység alapok:</strong>
            <p className="mt-0.5">• 1 t = 1000 kg | 1 q = 100 kg | 1 kg = 100 dkg = 1000 g</p>
            <p className="mt-0.5">• 1 hl = 100 l | 1 l = 10 dl = 1000 ml = 1 dm³</p>
            <p className="mt-0.5">• 1 nap = 24 óra | 1 h = 60 min = 3600 s</p>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Egyenletek & Szöveges feladatok:</strong>
            <p className="mt-0.5">• Fordított művelet: összeadás ↔ kivonás, szorzás ↔ osztás.</p>
            <p className="mt-0.5">• Szöveges feladat: Adatok → Terv → Számolás → Ellenőrzés → Válasz.</p>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm">
          ⚡ 2. Szint: Gyakorlat, összefüggések és egyenes arányosság
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Hármasszabály & Tizedestörtek:</strong>
            <p className="mt-0.5">• Egyenes arányosság: előbb számold ki 1 egység értékét!</p>
            <p className="mt-0.5">• Kisebb egységre váltáskor szorzunk, nagyobbra váltáskor osztunk.</p>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Nyitott mondatok & Vásárlás:</strong>
            <p className="mt-0.5">• Egyenlőtlenségeknél figyeld a szigorú (&lt;, &gt;) és megengedő (≤, ≥) jeleket!</p>
            <p className="mt-0.5">• Készpénzes kerekítés: 1, 2 → 0; 3, 4, 6, 7 → 5; 8, 9 → 10.</p>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm">
          👑 3. Szint: Mesterfok, szakaszos ábrázolás és logikai feladványok
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Szakaszos modell:</strong>
            <p className="mt-0.5">• Rajzolj arányos szakaszokat az ismeretleneknek!</p>
            <p className="mt-0.5">• Azonos részekre bontva könnyen számolható 1 egység értéke.</p>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Összetett számítások:</strong>
            <p className="mt-0.5">• Bruttó = Nettó + Tára (Össztömeg = Áru + Csomagolás).</p>
            <p className="mt-0.5">• Út = Sebesség · Idő ($s = v · t$).</p>
          </div>
        </div>
      </div>
    )
  };

  const questions: Record<DifficultyLevel, Question[]> = {
    // =========================================================================
    // 1. SZINT: FEJEZETI ALAPOK ÉS ALAPVETŐ SZÁMÍTÁSOK (1-30)
    // =========================================================================
    1: [
      {
        id: 'sum-l1-1',
        question: 'Hány gramm (g) tömegnek felel meg pontosan 1 kilogramm (kg)?',
        options: ['1000 g', '100 g', '10 g', '10 000 g'],
        correctAnswer: '1000 g',
        explanation: '1 kilogramm (kg) = 1000 gramm (g). A kilo- előtag ezerszerest jelent.',
        hint: '1 kg = 100 dkg = 1000 g.'
      },
      {
        id: 'sum-l1-2',
        question: 'Hány kilogramm 300 dekagramm (dkg) liszt?',
        options: ['3 kg', '30 kg', '0,3 kg', '3000 kg'],
        correctAnswer: '3 kg',
        explanation: 'Mivel 1 kg = 100 dkg, ezért 300 dkg = 300 : 100 = 3 kg.',
        hint: '100 dkg tesz ki 1 kg-ot.'
      },
      {
        id: 'sum-l1-3',
        question: 'Egy teherautó teherbírása 4 tonna (t). Hány kilogramm ez a teherbírás?',
        options: ['4000 kg', '400 kg', '40 000 kg', '40 kg'],
        correctAnswer: '4000 kg',
        explanation: '1 tonna = 1000 kg, ezért 4 tonna = 4 · 1000 = 4000 kg.',
        hint: '1 t = 1000 kg.'
      },
      {
        id: 'sum-l1-4',
        question: 'Hány deciliter (dl) folyadék van egy 1 literes tejesdobozban?',
        options: ['10 dl', '100 dl', '1 dl', '1000 dl'],
        correctAnswer: '10 dl',
        explanation: '1 liter = 10 deciliter. A deci- tizedrészt jelent.',
        hint: '1 l = 10 dl = 100 cl = 1000 ml.'
      },
      {
        id: 'sum-l1-5',
        question: 'Egy flakon öblítő 2500 milliliteres (ml). Hány liter ez?',
        options: ['2,5 liter', '25 liter', '0,25 liter', '250 liter'],
        correctAnswer: '2,5 liter',
        explanation: '1 liter = 1000 ml, így 2500 ml = 2500 : 1000 = 2,5 liter.',
        hint: 'Milliliterről literre váltva 1000-rel osztunk.'
      },
      {
        id: 'sum-l1-6',
        question: 'Hány liter űrtartalomnak felel meg pontosan 1 köbdeciméter (dm³) víz?',
        options: ['1 liter', '10 liter', '0,1 liter', '100 liter'],
        correctAnswer: '1 liter',
        explanation: 'Ez a mértékrendszer alapvető hídja: 1 dm³ térfogat pontosan 1 liter űrtartalomnak felel meg.',
        hint: '1 dm³ = 1 liter.'
      },
      {
        id: 'sum-l1-7',
        question: 'Hány másodpercből (s) áll 1 perc (min)?',
        options: ['60 másodperc', '100 másodperc', '10 másodperc', '3600 másodperc'],
        correctAnswer: '60 másodperc',
        explanation: 'Az időmérésben hatvanas váltószámot használunk: 1 perc = 60 másodperc.',
        hint: 'A percmutató 60 másodperc alatt tesz meg egyetlen percet.'
      },
      {
        id: 'sum-l1-8',
        question: 'Hány percig tart egy 3 órás filmvetítés?',
        options: ['180 percig', '120 percig', '300 percig', '150 percig'],
        correctAnswer: '180 percig',
        explanation: '1 óra = 60 perc, így 3 óra = 3 · 60 = 180 perc.',
        hint: 'Szorozd meg az órák számát 60-nal: 3 · 60 = ?'
      },
      {
        id: 'sum-l1-9',
        question: 'Hány órából áll egy teljes naptári nap?',
        options: ['24 óra', '12 óra', '60 óra', '48 óra'],
        correctAnswer: '24 óra',
        explanation: 'A Föld 24 óra alatt tesz meg egy teljes fordulatot a tengelye körül, ez 1 teljes nap.',
        hint: 'Éjféltől délig 12 óra, déltől éjfélig újabb 12 óra.'
      },
      {
        id: 'sum-l1-10',
        question: 'Hány dekagramm (dkg) 1,5 kg kenyér?',
        options: ['150 dkg', '15 dkg', '1500 dkg', '1,50 dkg'],
        correctAnswer: '150 dkg',
        explanation: '1 kg = 100 dkg, így 1,5 kg = 1,5 · 100 = 150 dkg.',
        hint: 'Kilogrammról dekagrammra váltva 100-zal szorzunk.'
      },
      {
        id: 'sum-l1-11',
        question: 'Egy recepthez fél liter (0,5 l) tej kell. Hány milliliter (ml) ez?',
        options: ['500 ml', '50 ml', '5000 ml', '5 ml'],
        correctAnswer: '500 ml',
        explanation: '1 liter = 1000 ml, így fél liter az 1000 fele: 500 ml.',
        hint: '0,5 · 1000 = 500.'
      },
      {
        id: 'sum-l1-12',
        question: 'Egy futóverseny 120 percig tartott. Hány óra volt ez?',
        options: ['2 óra', '1,5 óra', '3 óra', '12 óra'],
        correctAnswer: '2 óra',
        explanation: '120 : 60 = 2, tehát a verseny 2 órán át tartott.',
        hint: '60 perc = 1 óra, 120 perc = ? óra.'
      },
      {
        id: 'sum-l1-13',
        question: 'Ha egy számot x-szel jelölünk, és az y változó értéke y = 3 · x, mennyi y értéke, ha x = 4?',
        options: ['12', '7', '1', '16'],
        correctAnswer: '12',
        explanation: 'Behelyettesítve: y = 3 · 4 = 12.',
        hint: 'Szorozd meg a 4-et 3-mal!'
      },
      {
        id: 'sum-l1-14',
        question: 'Egy gép a bemenő x számhoz mindig hozzáad 5-öt. Milyen képlettel írható fel a kimenő y érték?',
        options: ['y = x + 5', 'y = 5 · x', 'y = x − 5', 'y = x : 5'],
        correctAnswer: 'y = x + 5',
        explanation: 'A hozzáadás műveletének jele a +, így y = x + 5.',
        hint: '„Hozzáad 5-öt” azt jelenti: + 5.'
      },
      {
        id: 'sum-l1-15',
        question: 'Egy négyzet kerülete a képlet szerint K = 4 · a. Mennyi a kerület, ha az oldal a = 6 cm?',
        options: ['24 cm', '36 cm', '10 cm', '12 cm'],
        correctAnswer: '24 cm',
        explanation: 'K = 4 · 6 cm = 24 cm.',
        hint: 'A négyzetnek 4 egyenlő oldala van: 4 · 6 = ?'
      },
      {
        id: 'sum-l1-16',
        question: '1 kg alma ára 400 Ft. Mennyibe kerül 3 kg alma?',
        options: ['1200 Ft', '800 Ft', '1600 Ft', '700 Ft'],
        correctAnswer: '1200 Ft',
        explanation: 'Egyenes arányosság: 3-szor akkora mennyiségért 3-szor annyit fizetünk: 3 · 400 Ft = 1200 Ft.',
        hint: 'Szorozd meg az egységárat (400 Ft) a tömeggel (3)!'
      },
      {
        id: 'sum-l1-17',
        question: 'Egy autó állandó sebességgel haladva 1 óra alatt 70 km-t tesz meg. Hány km-t tesz meg 2 óra alatt?',
        options: ['140 km', '72 km', '210 km', '100 km'],
        correctAnswer: '140 km',
        explanation: '2 óra alatt kétszer annyi utat tesz meg: 2 · 70 km = 140 km.',
        hint: 'Kétszer annyi idő = kétszer akkora megtett út.'
      },
      {
        id: 'sum-l1-18',
        question: '4 egyforma füzet ára 800 Ft. Mennyibe kerül 1 darab ilyen füzet?',
        options: ['200 Ft', '400 Ft', '150 Ft', '100 Ft'],
        correctAnswer: '200 Ft',
        explanation: 'Egységre következtetés: 800 Ft : 4 = 200 Ft füzetenként.',
        hint: 'Oszd el a teljes árat a darabszámmal!'
      },
      {
        id: 'sum-l1-19',
        question: 'Melyik szám teszi igazzá a □ + 8 = 15 nyitott mondatot?',
        options: ['7', '8', '6', '23'],
        correctAnswer: '7',
        explanation: 'A fordított művelettel számolva: 15 − 8 = 7. Ellenőrzés: 7 + 8 = 15.',
        hint: 'Vonj ki 8-at a 15-ből!'
      },
      {
        id: 'sum-l1-20',
        question: 'Ha az alaphalmaz a természetes számok (0, 1, 2, ...), mi az igazsághalmaza az x < 4 egyenlőtlenségnek?',
        options: ['{0, 1, 2, 3}', '{1, 2, 3, 4}', '{0, 1, 2, 3, 4}', '{1, 2, 3}'],
        correctAnswer: '{0, 1, 2, 3}',
        explanation: 'A 4-nél szigorúan kisebb természetes számok a 0, 1, 2, 3 (a 4 már nem tartozik bele!).',
        hint: 'Szigorú a relációs jel (<), a 4 nem megoldás, a 0 viszont természetes szám.'
      },
      {
        id: 'sum-l1-21',
        question: 'Mit jelent a matematikában a nyitott mondat alaphalmaza?',
        options: [
          'Azon számok halmazát, amelyek közül az ismeretlen értékét választhatjuk',
          'Csak a páros számok halmazát',
          'Az egyetlen helyes végeredményt',
          'A tankönyv feladatainak számát'
        ],
        correctAnswer: 'Azon számok halmazát, amelyek közül az ismeretlen értékét választhatjuk',
        explanation: 'Az alaphalmaz (A) az a megadott számkör, amelyben a feladat értelmezve van.',
        hint: 'Az alaphalmaz az a keret, amiből válogathatunk.'
      },
      {
        id: 'sum-l1-22',
        question: 'Mi a megoldása az x − 12 = 28 egyenletnek?',
        options: ['x = 40', 'x = 16', 'x = 30', 'x = 336'],
        correctAnswer: 'x = 40',
        explanation: 'A kivonás fordított művelete az összeadás: x = 28 + 12 = 40. Ellenőrzés: 40 − 12 = 28.',
        hint: 'Add hozzá a 12-t a 28-hoz!'
      },
      {
        id: 'sum-l1-23',
        question: 'Mi a megoldása az 5 · x = 35 egyenletnek?',
        options: ['x = 7', 'x = 30', 'x = 6', 'x = 175'],
        correctAnswer: 'x = 7',
        explanation: 'A szorzás fordított művelete az osztás: x = 35 : 5 = 7. Ellenőrzés: 5 · 7 = 35.',
        hint: 'Oszd el a 35-öt 5-tel!'
      },
      {
        id: 'sum-l1-24',
        question: 'Gondoltam egy számra, megszoroztam 2-vel, majd hozzáadtam 6-ot, és 20-at kaptam. Melyik számra gondoltam?',
        options: ['7', '8', '14', '13'],
        correctAnswer: '7',
        explanation: 'Lebontás visszafelé: 20 − 6 = 14, majd 14 : 2 = 7. Ellenőrzés: 7 · 2 + 6 = 14 + 6 = 20.',
        hint: 'Haladj visszafelé: előbb vonj le 6-ot, aztán oszd el 2-vel!'
      },
      {
        id: 'sum-l1-25',
        question: 'Anna 12 éves, bátyja 4 évvel idősebb nála. Hány éves a bátyja?',
        options: ['16 éves', '8 éves', '48 éves', '3 éves'],
        correctAnswer: '16 éves',
        explanation: '„-val/-vel idősebb” összeadást jelent: 12 + 4 = 16 éves.',
        hint: '12 + 4 = ?'
      },
      {
        id: 'sum-l1-26',
        question: 'Egy 5. osztályban 24 tanuló van, közülük 14 fiú. Hány lány jár az osztályba?',
        options: ['10 lány', '14 lány', '38 lány', '12 lány'],
        correctAnswer: '10 lány',
        explanation: 'Az összes tanulóból kivonjuk a fiúk számát: 24 − 14 = 10 lány.',
        hint: '24 − 14 = ?'
      },
      {
        id: 'sum-l1-27',
        question: 'Petinek 3-szor annyi matricája van, mint Robinak. Robinak 8 matricája van. Hány matricája van Petinek?',
        options: ['24 matrica', '11 matrica', '5 matrica', '16 matrica'],
        correctAnswer: '24 matrica',
        explanation: '„3-szor annyi” szorzást jelent: 3 · 8 = 24 matrica.',
        hint: '3 · 8 = ?'
      },
      {
        id: 'sum-l1-28',
        question: 'A boltban 1632 Ft a fizetendő összeg. Készpénzes fizetésnél hány forintra kerekít a pénztárgép?',
        options: ['1630 Ft', '1635 Ft', '1640 Ft', '1600 Ft'],
        correctAnswer: '1630 Ft',
        explanation: 'A 2-re végződő összegek a hivatalos kerekítési szabály szerint lefelé, 0-ra kerekednek: 1630 Ft.',
        hint: 'Az 1 és 2 forint 0-ra kerekedik lefelé.'
      },
      {
        id: 'sum-l1-29',
        question: '2000 Ft-os bankjeggyel fizetünk egy 1450 Ft-os fagyikehelyért. Mennyi visszajáró pénzt kapunk?',
        options: ['550 Ft', '650 Ft', '450 Ft', '1550 Ft'],
        correctAnswer: '550 Ft',
        explanation: 'Visszajáró = Fizetett összeg − Ár: 2000 − 1450 = 550 Ft.',
        hint: '2000-ből vonj le 1450-et!'
      },
      {
        id: 'sum-l1-30',
        question: 'Egy recept 4 személyre 20 dkg lisztet ír elő. Mennyi liszt szükséges 8 személyre azonos arányban?',
        options: ['40 dkg', '30 dkg', '25 dkg', '80 dkg'],
        correctAnswer: '40 dkg',
        explanation: '8 személy kétszer annyi, mint 4, így kétszer annyi liszt kell: 2 · 20 dkg = 40 dkg.',
        hint: 'A személyek száma duplázódott, a liszt mennyisége is duplázódik.'
      }
    ],

    // =========================================================================
    // 2. SZINT: KÖZEPES NEHÉZSÉGŰ, TÖBBLÉPÉSES ÉS ARÁNYOSSÁGI FELADATOK (31-60)
    // =========================================================================
    2: [
      {
        id: 'sum-l2-1',
        question: 'Egy 25 kg-os liszteszsákból kimérünk 350 dkg lisztet süteményekhez. Hány kg liszt maradt a zsákban?',
        options: ['21,5 kg', '22 kg', '21 kg', '24,65 kg'],
        correctAnswer: '21,5 kg',
        explanation: '350 dkg = 3,5 kg. A megmaradt liszt: 25 kg − 3,5 kg = 21,5 kg.',
        hint: 'Váltsd át a 350 dkg-ot kg-ba (3,5 kg), majd vond ki 25-ből!'
      },
      {
        id: 'sum-l2-2',
        question: 'Mennyi a három mennyiség összege kilogrammban kifejezve: 1,8 t + 450 kg + 2 q?',
        options: ['2450 kg', '2270 kg', '2050 kg', '2850 kg'],
        correctAnswer: '2450 kg',
        explanation: '1,8 t = 1800 kg; 2 q = 200 kg. Összegük: 1800 + 450 + 200 = 2450 kg.',
        hint: '1,8 t = 1800 kg, 2 q = 200 kg. Add össze őket!'
      },
      {
        id: 'sum-l2-3',
        question: 'Egy boltban 12 doboz gyógytea van, dobozonként 75 g nettó tömeggel. Hány dekagramm a teljes teafű tömege?',
        options: ['90 dkg', '900 dkg', '9 dkg', '95 dkg'],
        correctAnswer: '90 dkg',
        explanation: 'Össztömeg grammban: 12 · 75 g = 900 g. Dekagrammba váltva: 900 : 10 = 90 dkg.',
        hint: '12 · 75 = 900 g. 1 dkg = 10 g, ezért 900 g = ? dkg.'
      },
      {
        id: 'sum-l2-4',
        question: 'Egy 200 literes kerti esővízgyűjtő hordóban jelenleg 145 liter víz van. Hány darab 5 literes öntözőkannával lehet teljesen tele tölteni?',
        options: ['11 kannával', '10 kannával', '12 kannával', '9 kannával'],
        correctAnswer: '11 kannával',
        explanation: 'A hiányzó vízmennyiség: 200 − 145 = 55 liter. Kannák száma: 55 : 5 = 11 kanna.',
        hint: '200 − 145 = 55 liter hiányzik. Hányszor van meg benne az 5 liter?'
      },
      {
        id: 'sum-l2-5',
        question: 'Mennyi 4,5 liter + 35 dl + 800 ml folyadék összesen deciliterben (dl) kifejezve?',
        options: ['88 dl', '80 dl', '78 dl', '85 dl'],
        correctAnswer: '88 dl',
        explanation: 'Váltsunk deciliterbe: 4,5 l = 45 dl; 35 dl = 35 dl; 800 ml = 8 dl. Összeg: 45 + 35 + 8 = 88 dl.',
        hint: '4,5 l = 45 dl és 800 ml = 8 dl. 45 + 35 + 8 = ?'
      },
      {
        id: 'sum-l2-6',
        question: 'Egy díszakvárium belső űrtartalma 45 liter. Hány köbdeciméter (dm³) belső térfogatnak felel ez meg?',
        options: ['45 dm³', '450 dm³', '4,5 dm³', '4500 dm³'],
        correctAnswer: '45 dm³',
        explanation: 'Mivel 1 liter pontosan 1 dm³-rel egyenlő, 45 liter víz térfogata pontosan 45 dm³.',
        hint: 'A liter és a köbdeciméter 1:1 arányban felel meg egymásnak.'
      },
      {
        id: 'sum-l2-7',
        question: 'Egy intercity vonat 14:35-kor indult Budapestről és 17:15-kor érkezett meg Szegedre. Mennyi volt a teljes menetidő?',
        options: ['2 óra 40 perc', '2 óra 20 perc', '3 óra 20 perc', '2 óra 50 perc'],
        correctAnswer: '2 óra 40 perc',
        explanation: '14:35-től 15:00-ig 25 perc telik el. 15:00-tól 17:15-ig 2 óra 15 perc. Összesen: 2 óra + (25 + 15) perc = 2 óra 40 perc.',
        hint: 'Számolj a legközelebbi kerek óráig (15:00 = 25 perc), majd add hozzá az 17:15-ig tartó időt!'
      },
      {
        id: 'sum-l2-8',
        question: 'Hány órából áll egy 2 nap és 6 órás túra?',
        options: ['54 óra', '48 óra', '56 óra', '50 óra'],
        correctAnswer: '54 óra',
        explanation: '2 nap = 2 · 24 óra = 48 óra. Ehhez hozzáadva 6 órát: 48 + 6 = 54 óra.',
        hint: '2 · 24 + 6 = ?'
      },
      {
        id: 'sum-l2-9',
        question: 'Egy maratonfutó 3 óra 24 perc alatt futotta le a versenyt. Hány perccel fejezhető ki ez az időtartam?',
        options: ['204 perc', '194 perc', '214 perc', '180 perc'],
        correctAnswer: '204 perc',
        explanation: '3 óra = 3 · 60 perc = 180 perc. 180 + 24 = 204 perc.',
        hint: '3 · 60 + 24 = ?'
      },
      {
        id: 'sum-l2-10',
        question: 'Melyik a helyes relációs jel a két mennyiség közé: 3500 g ___ 3,6 kg?',
        options: ['<', '>', '=', 'Nem hasonlítható össze'],
        correctAnswer: '<',
        explanation: '3,6 kg = 3600 g. Mivel 3500 g < 3600 g, ezért a helyes jel a <.',
        hint: '3,6 kg = 3600 g. Hasonlítsd össze a 3500-zal!'
      },
      {
        id: 'sum-l2-11',
        question: 'Egy tartály térfogata 0,6 m³. Hány liter víz fér el benne?',
        options: ['600 liter', '60 liter', '6000 liter', '6 liter'],
        correctAnswer: '600 liter',
        explanation: '1 m³ = 1000 dm³ = 1000 liter. Így 0,6 m³ = 0,6 · 1000 = 600 liter.',
        hint: '1 m³ = 1000 liter. 0,6 · 1000 = ?'
      },
      {
        id: 'sum-l2-12',
        question: 'Hány grammnak felel meg 0,85 kg sajt?',
        options: ['850 g', '85 g', '8500 g', '8,5 g'],
        correctAnswer: '850 g',
        explanation: '0,85 · 1000 = 850 gramm.',
        hint: 'Kilogrammról grammra váltáskor 1000-rel szorzunk.'
      },
      {
        id: 'sum-l2-13',
        question: 'Egy téglalap területe T = 120 cm², az egyik oldala a = 15 cm. Mennyi a másik oldal (b) hossza?',
        options: ['8 cm', '9 cm', '7 cm', '10 cm'],
        correctAnswer: '8 cm',
        explanation: 'T = a · b összefüggésből b = T : a = 120 : 15 = 8 cm.',
        hint: 'Oszd el a területet az ismert oldallal: 120 : 15 = ?'
      },
      {
        id: 'sum-l2-14',
        question: 'Egy taxi alapdíja 800 Ft, és kilométerenként 400 Ft a viteldíj (K = 800 + 400 · s). Mennyibe kerül egy 6 km-es út?',
        options: ['3200 Ft', '2400 Ft', '3000 Ft', '3600 Ft'],
        correctAnswer: '3200 Ft',
        explanation: 'K = 800 + 400 · 6 = 800 + 2400 = 3200 Ft.',
        hint: 'Előbb számold ki a távolsági díjat (6 · 400), majd add hozzá a 800 Ft alapdíjat!'
      },
      {
        id: 'sum-l2-15',
        question: 'A gép szabálya: a bemenő számból kivon 3-at, majd a különbséget megszorozza 4-gyel (y = (x − 3) · 4). Ha a kimenet y = 28, mi volt a bemenő x szám?',
        options: ['10', '9', '8', '11'],
        correctAnswer: '10',
        explanation: 'Visszafelé számolunk: 28 : 4 = 7, majd 7 + 3 = 10. Ellenőrzés: (10 − 3) · 4 = 7 · 4 = 28.',
        hint: 'Fordított műveletek: 28-at oszd 4-gyel, majd adj hozzá 3-at!'
      },
      {
        id: 'sum-l2-16',
        question: '5 kg narancsért 3250 Ft-ot fizettünk a piacon. Mennyit fizetnénk ugyanilyen egységár mellett 8 kg narancsért?',
        options: ['5200 Ft', '4800 Ft', '5600 Ft', '5000 Ft'],
        correctAnswer: '5200 Ft',
        explanation: '1 kg narancs ára: 3250 : 5 = 650 Ft. 8 kg ára: 8 · 650 = 5200 Ft.',
        hint: '1 kg narancs ára 3250 : 5 = 650 Ft. Ezt szorozd meg 8-cal!'
      },
      {
        id: 'sum-l2-17',
        question: 'Egy kerékpáros egyenletes tempóban haladva 2 óra alatt 36 km-t tett meg. Hány km-t tesz meg 5 óra alatt?',
        options: ['90 km', '80 km', '72 km', '100 km'],
        correctAnswer: '90 km',
        explanation: 'Óránkénti sebessége: 36 : 2 = 18 km/h. 5 óra alatt: 5 · 18 = 90 km.',
        hint: '1 óra alatt 18 km-t tesz meg. 5 óra alatt: 5 · 18 = ?'
      },
      {
        id: 'sum-l2-18',
        question: 'Egy palacsintatészta recept 6 adaghoz 3 db tojást és 30 dkg lisztet ír elő. Mennyi kell ebből 10 adag elkészítéséhez?',
        options: ['5 tojás és 50 dkg liszt', '4 tojás és 40 dkg liszt', '6 tojás és 60 dkg liszt', '5 tojás és 40 dkg liszt'],
        correctAnswer: '5 tojás és 50 dkg liszt',
        explanation: '1 adaghoz kell 3 : 6 = 0,5 tojás és 30 : 6 = 5 dkg liszt. 10 adaghoz: 10 · 0,5 = 5 tojás és 10 · 5 = 50 dkg liszt.',
        hint: '1 adaghoz 5 dkg liszt és fél tojás kell.'
      },
      {
        id: 'sum-l2-19',
        question: 'Melyik szám teszi igazzá a 3 · x − 5 = 19 egyenletet?',
        options: ['x = 8', 'x = 7', 'x = 9', 'x = 6'],
        correctAnswer: 'x = 8',
        explanation: 'Lebontás: 3 · x = 19 + 5 = 24. Ebből x = 24 : 3 = 8. Ellenőrzés: 3 · 8 − 5 = 24 − 5 = 19.',
        hint: 'Adj hozzá 5-öt mindkét oldalhoz (24), majd oszd el 3-mal!'
      },
      {
        id: 'sum-l2-20',
        question: 'Ha az alaphalmaz az egyjegyű pozitív egész számok A = {1, 2, 3, 4, 5, 6, 7, 8, 9}, mi az igazsághalmaza a 2 · x + 1 ≤ 9 nyitott mondatnak?',
        options: ['{1, 2, 3, 4}', '{1, 2, 3, 4, 5}', '{0, 1, 2, 3, 4}', '{2, 4}'],
        correctAnswer: '{1, 2, 3, 4}',
        explanation: '2 · x ≤ 9 − 1 = 8, amiből x ≤ 4. Mivel az alaphalmaz pozitív egész számokból áll, az igazsághalmaz {1, 2, 3, 4}.',
        hint: '2 · x ≤ 8, tehát x ≤ 4. Az alaphalmaz legkisebb eleme 1.'
      },
      {
        id: 'sum-l2-21',
        question: 'Mi a megoldása a 45 : x = 9 egyenletnek?',
        options: ['x = 5', 'x = 6', 'x = 4', 'x = 405'],
        correctAnswer: 'x = 5',
        explanation: 'Az osztó kereséséhez az osztandót elosztjuk a hányadossal: x = 45 : 9 = 5. Ellenőrzés: 45 : 5 = 9.',
        hint: 'Hányszor van meg a 9 a 45-ben?'
      },
      {
        id: 'sum-l2-22',
        question: 'Lebontogatási módszerrel oldd meg: (x + 7) · 3 = 36. Mennyi x értéke?',
        options: ['x = 5', 'x = 12', 'x = 7', 'x = 4'],
        correctAnswer: 'x = 5',
        explanation: '1. lépés: osztunk 3-mal: x + 7 = 36 : 3 = 12. 2. lépés: kivonunk 7-et: x = 12 − 7 = 5. Ellenőrzés: (5 + 7) · 3 = 12 · 3 = 36.',
        hint: 'Előbb oszd el a 36-ot 3-mal, majd a kapott számból vonj ki 7-et!'
      },
      {
        id: 'sum-l2-23',
        question: 'Oldd meg a 60 − 4 · x = 24 egyenletet! Mennyi x értéke?',
        options: ['x = 9', 'x = 8', 'x = 10', 'x = 6'],
        correctAnswer: 'x = 9',
        explanation: 'A kivonandó (4 · x) keresése: 4 · x = 60 − 24 = 36. Ebből x = 36 : 4 = 9. Ellenőrzés: 60 − 4 · 9 = 60 − 36 = 24.',
        hint: 'Mennyit kell kivonni 60-ból, hogy 24 legyen? 36-ot! 4 · x = 36, tehát x = ?'
      },
      {
        id: 'sum-l2-24',
        question: 'Egy gondolt számhoz hozzáadtam a kétszeresét, és 42-t kaptam (x + 2 · x = 42). Melyik ez a szám?',
        options: ['14', '21', '12', '16'],
        correctAnswer: '14',
        explanation: 'Összesen 3 · x = 42, így x = 42 : 3 = 14. Ellenőrzés: 14 + 2 · 14 = 14 + 28 = 42.',
        hint: '1 rész + 2 rész = 3 rész. 42-t oszd el 3-mal!'
      },
      {
        id: 'sum-l2-25',
        question: 'Két szám összege 76. Az egyik szám 18-cal nagyobb a másiknál. Melyik a kisebbik szám?',
        options: ['29', '38', '47', '28'],
        correctAnswer: '29',
        explanation: 'Szakaszos modell: vegyük el a többletet: 76 − 18 = 58. Ezt 2 egyenlő részre osztjuk: 58 : 2 = 29. A nagyobbik szám 29 + 18 = 47. Összegük 29 + 47 = 76.',
        hint: 'Vond le a többletet (76 − 18 = 58), majd felezd meg!'
      },
      {
        id: 'sum-l2-26',
        question: 'Tamás és Gergő összesen 60 db diót szedtek. Tamásnak 3-szor annyi diója van, mint Gergőnek. Hány diót szedett Gergő?',
        options: ['15 diót', '20 diót', '12 diót', '45 diót'],
        correctAnswer: '15 diót',
        explanation: 'Gergőé 1 rész, Tamásé 3 rész, összesen 1 + 3 = 4 rész. 1 rész = 60 : 4 = 15 dió (Gergő). Tamásé 3 · 15 = 45 dió.',
        hint: 'Összesen 4 egyforma rész van: 60 : 4 = ?'
      },
      {
        id: 'sum-l2-27',
        question: 'Egy téglalap alakú virágágyás kerülete 54 cm. Hosszúsága kétszerese a szélességének. Mekkorák az oldalai?',
        options: ['18 cm és 9 cm', '20 cm és 10 cm', '16 cm és 8 cm', '24 cm és 12 cm'],
        correctAnswer: '18 cm és 9 cm',
        explanation: 'Félkerület (a + b) = 54 : 2 = 27 cm. Szélesség 1 rész, hosszúság 2 rész, összesen 3 rész: 27 : 3 = 9 cm (szélesség). A hosszúság 2 · 9 = 18 cm. Ellenőrzés: 2 · (18 + 9) = 54 cm.',
        hint: 'A félkerület 54 : 2 = 27 cm. Ez 1 + 2 = 3 részre oszlik.'
      },
      {
        id: 'sum-l2-28',
        question: 'Bevásárláskor vettünk 3 csomag tésztát (420 Ft/csom), 2 doboz tejet (380 Ft/dob) és 1 kenyeret (690 Ft). Mennyit fizetünk készpénzben kerekítés után?',
        options: ['2710 Ft', '2705 Ft', '2715 Ft', '2700 Ft'],
        correctAnswer: '2710 Ft',
        explanation: 'Tészta: 3 · 420 = 1260 Ft. Tej: 2 · 380 = 760 Ft. Kenyér: 690 Ft. Végösszeg: 1260 + 760 + 690 = 2710 Ft. Mivel 0-ra végződik, a kerekített összeg pontosan 2710 Ft.',
        hint: '1260 + 760 + 690 = 2710 Ft. A 0 végződés nem változik kerekítéskor.'
      },
      {
        id: 'sum-l2-29',
        question: 'Egy autó 90 km/h állandó átlagsebességgel halad az autópályán. Mennyi idő alatt teszi meg a 225 km távolságot?',
        options: ['2 óra 30 perc', '2 óra 15 perc', '2 óra 45 perc', '3 óra'],
        correctAnswer: '2 óra 30 perc',
        explanation: 'Idő = Út : Sebesség = 225 : 90 = 2,5 óra. A 0,5 óra fél órát, vagyis 30 percet jelent, így 2 óra 30 perc.',
        hint: '225 : 90 = 2,5 óra. Fél óra = 30 perc.'
      },
      {
        id: 'sum-l2-30',
        question: 'Egy 4 fős család havi vízfogyasztása 24 m³ volt. Egy 30 napos hónapban átlagosan hány liter víz jutott egy napra egyetlen családtagra?',
        options: ['200 liter', '150 liter', '250 liter', '180 liter'],
        correctAnswer: '200 liter',
        explanation: '24 m³ = 24 000 liter. Családi napi fogyasztás: 24 000 : 30 = 800 liter/nap. Személyenként: 800 : 4 = 200 liter/fő/nap.',
        hint: '24 m³ = 24 000 liter. Oszd el 30-cal (napi családi fogyasztás), majd 4-gyel!'
      }
    ],

    // =========================================================================
    // 3. SZINT: MESTERFOK, ÖSSZETETT PROBLÉMAMEGOLDÁS ÉS LOGIKA (61-90)
    // =========================================================================
    3: [
      {
        id: 'sum-l3-1',
        question: 'Egy teherautó rakománnyal együtt (bruttó) 8,4 tonna. A jármű üres tömege (tára) 3600 kg. Hány darab 60 kg-os krumpliszsákot szállít a teherautó?',
        options: ['80 darab', '75 darab', '85 darab', '70 darab'],
        correctAnswer: '80 darab',
        explanation: 'Bruttó tömeg: 8,4 t = 8400 kg. Nettó tömeg: 8400 − 3600 = 4800 kg. Zsákok száma: 4800 : 60 = 80 darab.',
        hint: 'Nettó = Bruttó − Tára = 8400 − 3600 = 4800 kg. Ezt oszd el 60-nal!'
      },
      {
        id: 'sum-l3-2',
        question: 'Mekkora a tömege egy 120 cm hosszú, 50 cm széles és 40 cm vízmagasságú akvárium vizének, ha 1 dm³ tiszta víz tömege pontosan 1 kg?',
        options: ['240 kg', '2400 kg', '120 kg', '180 kg'],
        correctAnswer: '240 kg',
        explanation: 'Váltsuk át az oldalakat dm-be: a = 12 dm, b = 5 dm, c = 4 dm. Víz térfogata: V = 12 · 5 · 4 = 240 dm³ = 240 liter. Tömege: 240 · 1 kg = 240 kg.',
        hint: 'Deciméterekben számolj: 12 dm · 5 dm · 4 dm = ? dm³. 1 dm³ víz = 1 kg.'
      },
      {
        id: 'sum-l3-3',
        question: 'Két zsák búzánk van. Ha az elsőből átrakunk 8 kg-ot a másodikba, mindkét zsákban pontosan 35 kg lesz. Hány kg búza volt eredetileg az első zsákban?',
        options: ['43 kg', '27 kg', '51 kg', '35 kg'],
        correctAnswer: '43 kg',
        explanation: 'Az első zsákból elvettek 8 kg-ot, és így lett 35 kg: x − 8 = 35 → x = 35 + 8 = 43 kg. (A másodikban eredetileg 35 − 8 = 27 kg volt).',
        hint: 'Ha elvétel UTÁN lett 35 kg, akkor előtte 8-cal több volt: 35 + 8 = ?'
      },
      {
        id: 'sum-l3-4',
        question: 'Egy 1,2 m³-es kerti medencét kerti slaggal töltünk, amelyből percenként 25 liter víz folyik. Hány perc alatt telik meg teljesen a medence?',
        options: ['48 perc alatt', '45 perc alatt', '50 perc alatt', '60 perc alatt'],
        correctAnswer: '48 perc alatt',
        explanation: '1,2 m³ = 1200 liter. Töltési idő: 1200 : 25 = 48 perc.',
        hint: '1,2 m³ = 1200 liter. Hányszor van meg benne a percenkénti 25 liter?'
      },
      {
        id: 'sum-l3-5',
        question: 'Egy edényből kiöntöttük a benne lévő víz felét, majd még 1,5 litert, és így 3,5 liter víz maradt az edényben. Hány liter víz volt benne eredetileg?',
        options: ['10 liter', '8 liter', '12 liter', '7 liter'],
        correctAnswer: '10 liter',
        explanation: 'Lebontogatás visszafelé: a maradékhoz visszatesszük a másfél litert: 3,5 + 1,5 = 5 liter. Ez volt az eredeti víz fele, így a teljes mennyiség: 5 · 2 = 10 liter.',
        hint: 'Haladj visszafelé: 3,5 + 1,5 = 5 liter volt a felezés után. Mennyi volt a felezés előtt?'
      },
      {
        id: 'sum-l3-6',
        question: 'Egy pohárban lévő 2 dl üdítőital 1,5 dl málnaszörpöt és 0,5 dl tiszta vizet tartalmaz. Milyen egyszerű egész arányban van a málnaszörp a vízhez?',
        options: ['3 : 1', '2 : 1', '4 : 1', '1,5 : 1'],
        correctAnswer: '3 : 1',
        explanation: 'Arány = 1,5 dl : 0,5 dl. Mindkét tagot megszorozzuk 10-zel: 15 : 5, majd osztunk 5-tel: 3 : 1.',
        hint: 'Hányszor több a szörp, mint a víz? 1,5 : 0,5 = ?'
      },
      {
        id: 'sum-l3-7',
        question: 'Egy repülőgép 21:40-kor száll fel és 6 óra 35 perces repülés után ér célba. Másnap éjjel/hajnalban hány órakor landol?',
        options: ['04:15-kor', '03:45-kor', '04:35-kor', '05:15-kor'],
        correctAnswer: '04:15-kor',
        explanation: '21:40-től éjfélig (24:00) 2 óra 20 perc telik el. A menetidőből még hátralévő idő: 6 óra 35 perc − 2 óra 20 perc = 4 óra 15 perc. Ezért éjfél után 04:15-kor landol.',
        hint: 'Éjfélig 2 óra 20 perc kell. Vonj le 2 óra 20 percet a 6 óra 35 percből!'
      },
      {
        id: 'sum-l3-8',
        question: 'Egy mechanikus falióra naponta 4 percet siet. Hány nap múlva siet pontosan 1 teljes órát?',
        options: ['15 nap múlva', '12 nap múlva', '20 nap múlva', '10 nap múlva'],
        correctAnswer: '15 nap múlva',
        explanation: '1 teljes óra = 60 perc. Napok száma: 60 : 4 = 15 nap.',
        hint: '1 óra = 60 perc. Hány nap alatt gyűlik össze 60 perc, ha naponta 4 percet siet?'
      },
      {
        id: 'sum-l3-9',
        question: 'Máté elhatározta, hogy minden egyes nap pontosan 45 percet olvas. Hány órányi olvasást jelent ez egy teljes (365 napos) év alatt?',
        options: ['273 óra 45 perc', '270 óra', '280 óra 30 perc', '265 óra 15 perc'],
        correctAnswer: '273 óra 45 perc',
        explanation: 'Összes perc: 365 · 45 = 16 425 perc. Órákra és percekre bontva: 16 425 : 60 = 273, maradék 45 perc, azaz 273 óra 45 perc.',
        hint: '365 · 45 perc = 16 425 perc. Oszd el 60-nal a maradékos osztás szerint!'
      },
      {
        id: 'sum-l3-10',
        question: 'Mennyi a pontos értéke kilogrammban: 0,04 t + 3,5 q + 450 dkg + 800 g?',
        options: ['395,3 kg', '394,5 kg', '435,3 kg', '395,8 kg'],
        correctAnswer: '395,3 kg',
        explanation: 'Átváltás kg-ba: 0,04 t = 40 kg; 3,5 q = 350 kg; 450 dkg = 4,5 kg; 800 g = 0,8 kg. Összeg: 40 + 350 + 4,5 + 0,8 = 395,3 kg.',
        hint: '40 kg + 350 kg + 4,5 kg + 0,8 kg = ?'
      },
      {
        id: 'sum-l3-11',
        question: 'Egy 5 km hosszú futópálya mentén minden 250 méternél frissítőállomást állítanak fel, beleértve a rajtot és a célt is. Hány állomás van összesen?',
        options: ['21 állomás', '20 állomás', '19 állomás', '25 állomás'],
        correctAnswer: '21 állomás',
        explanation: '5 km = 5000 méter. Az osztásközök száma: 5000 : 250 = 20 köz. Mivel a rajtnál és a célnál is van állomás, az állomások száma 20 + 1 = 21 darab.',
        hint: '5000 : 250 = 20 szakasz. A pontok száma mindig 1-gyel több, mint a szakaszoké!'
      },
      {
        id: 'sum-l3-12',
        question: 'Melyik mennyiség nagyobb és mennyivel: 2,4 hl vagy 235 dm³?',
        options: ['2,4 hl nagyobb 5 literrel', '235 dm³ nagyobb 5 literrel', 'Egyenlőek', '2,4 hl nagyobb 15 literrel'],
        correctAnswer: '2,4 hl nagyobb 5 literrel',
        explanation: '2,4 hl = 240 liter. 235 dm³ = 235 liter. Különbségük: 240 − 235 = 5 liter a 2,4 hl javára.',
        hint: 'Válts mindkettőt literbe: 2,4 hl = 240 l, 235 dm³ = 235 l.'
      },
      {
        id: 'sum-l3-13',
        question: 'Egyedi dobozok gyártásakor az alapanyag 120 Ft/db, az elkészítés 50 Ft/db, a fix gépi beállítási költség 3000 Ft. Hány darab doboz rendelése esetén lesz a teljes költség pontosan 20 000 Ft?',
        options: ['100 darab', '90 darab', '110 darab', '120 darab'],
        correctAnswer: '100 darab',
        explanation: 'Egy doboz előállítása 120 + 50 = 170 Ft. A dobozokra fordítható összeg: 20 000 − 3000 = 17 000 Ft. Dobozok száma: 17 000 : 170 = 100 darab.',
        hint: 'Vond le a 3000 Ft fix költséget, majd oszd el a dobozonkénti 170 Ft-tal!'
      },
      {
        id: 'sum-l3-14',
        question: 'Egy számsorozat képzési szabálya: minden tag az előző szám 2-szeresénél 3-mal kisebb. Ha a harmadik tag 11, mennyi volt a legelső tag?',
        options: ['5', '4', '7', '6'],
        correctAnswer: '5',
        explanation: '2. tag: (11 + 3) : 2 = 14 : 2 = 7. 1. tag: (7 + 3) : 2 = 10 : 2 = 5. Ellenőrzés: 1. tag = 5 → 2. tag = 2 · 5 − 3 = 7 → 3. tag = 2 · 7 − 3 = 11.',
        hint: 'Haladj visszafelé kétszer: adj hozzá 3-at, majd oszd el 2-vel!'
      },
      {
        id: 'sum-l3-15',
        question: 'Egy téglalap alakú kert kerülete K = 100 m. Hogyan változik a kert területe, ha az eredetileg a = 25 m, b = 25 m-es négyzet helyett a = 30 m és b = 20 m téglalappá alakítják?',
        options: ['25 m²-rel csökken', '25 m²-rel nő', 'Nem változik', '50 m²-rel csökken'],
        correctAnswer: '25 m²-rel csökken',
        explanation: 'Eredeti terület: 25 · 25 = 625 m². Új terület: 30 · 20 = 600 m². Csökkenés: 625 − 600 = 25 m².',
        hint: 'Számold ki mindkét területet: 25 · 25 = 625 és 30 · 20 = 600.'
      },
      {
        id: 'sum-l3-16',
        question: 'Egy üzemben 6 egyforma gép 4 óra alatt 720 alkatrészt állít elő. Hány alkatrészt gyárt le 9 ugyanilyen gép 5 óra alatt?',
        options: ['1350 darabot', '1200 darabot', '1500 darabot', '1400 darabot'],
        correctAnswer: '1350 darabot',
        explanation: '1 gép 4 óra alatt: 720 : 6 = 120 db. 1 gép 1 óra alatt: 120 : 4 = 30 db. 9 gép 1 óra alatt: 9 · 30 = 270 db. 9 gép 5 óra alatt: 5 · 270 = 1350 db.',
        hint: 'Számold ki, hány darabot gyárt 1etlen gép 1etlen óra alatt (720 : 6 : 4 = 30 db)!'
      },
      {
        id: 'sum-l3-17',
        question: '8 festő 6 nap alatt tudna kifesteni egy iskolaépületet. Ha 12 ugyanolyan gyorsaságú festő dolgozik, hány nap alatt készülnek el?',
        options: ['4 nap alatt', '3 nap alatt', '5 nap alatt', '4,5 nap alatt'],
        correctAnswer: '4 nap alatt',
        explanation: 'A munka mennyisége: 8 · 6 = 48 „embernap”. Ha 12 festő végzi, szükséges napok száma: 48 : 12 = 4 nap.',
        hint: 'Több munkásnak kevesebb nap kell! 8 · 6 = 48 munkanap, 48 : 12 = ?'
      },
      {
        id: 'sum-l3-18',
        question: 'Egy térképen 2,5 cm felel meg a valóságban 10 km távolságnak. Milyen távolságra van egymástól két olyan város a valóságban, amelyek a térképen 7 cm-re találhatók?',
        options: ['28 km-re', '25 km-re', '30 km-re', '35 km-re'],
        correctAnswer: '28 km-re',
        explanation: '1 cm a térképen: 10 : 2,5 = 4 km a valóságban. 7 cm a térképen: 7 · 4 = 28 km a valóságban.',
        hint: '1 cm megfelel 4 km-nek a valóságban. 7 · 4 = ?'
      },
      {
        id: 'sum-l3-19',
        question: 'Melyik szám teszi igazzá a (5 · x − 4) : 7 + 6 = 14 egyenletet?',
        options: ['x = 12', 'x = 10', 'x = 14', 'x = 8'],
        correctAnswer: 'x = 12',
        explanation: '1. lépés: kivonunk 6-ot: (5 · x − 4) : 7 = 8. 2. lépés: szorzunk 7-tel: 5 · x − 4 = 56. 3. lépés: hozzáadunk 4-et: 5 · x = 60. 4. lépés: osztunk 5-tel: x = 12. Ellenőrzés: (5 · 12 − 4) : 7 + 6 = 56 : 7 + 6 = 8 + 6 = 14.',
        hint: 'Haladj lépésről lépésre: −6, ·7, +4, majd :5.'
      },
      {
        id: 'sum-l3-20',
        question: 'Ha az alaphalmaz a pozitív egész számok halmaza, hány darab eleme van a 3 · x + 4 ≤ 22 egyenlőtlenség igazsághalmazának?',
        options: ['6 darab', '7 darab', '5 darab', 'Végtelen sok'],
        correctAnswer: '6 darab',
        explanation: '3 · x ≤ 22 − 4 = 18 → x ≤ 6. A pozitív egész számok a 6-nál kisebb vagy egyenlő számok közül az 1, 2, 3, 4, 5, 6, tehát összesen 6 darab elem.',
        hint: '3 · x ≤ 18, amiből x ≤ 6. Számold meg az 1, 2, 3, 4, 5, 6 elemeket!'
      },
      {
        id: 'sum-l3-21',
        question: 'Ha a 18 − 2 · x > 8 egyenlőtlenség alaphalmaza a prímszámok halmaza, mely számok alkotják az igazsághalmazt?',
        options: ['{2, 3}', '{2, 3, 5}', '{1, 2, 3}', '{3, 5}'],
        correctAnswer: '{2, 3}',
        explanation: 'Kivonandó keresése: 2 · x < 18 − 8 = 10 → x < 5. Az 5-nél szigorúan kisebb prímszámok a 2 és a 3 (az 1 nem prím, az 5 pedig nem szigorúan kisebb 5-nél).',
        hint: '2 · x < 10, tehát x < 5. Melyek az 5-nél kisebb prímszámok?'
      },
      {
        id: 'sum-l3-22',
        question: 'Egy gondolt számhoz hozzáadtam 15-öt, az összeget elosztottam 4-gyel, majd kivontam 3-at, és 7-et kaptam. Melyik volt az eredeti szám?',
        options: ['25', '20', '35', '30'],
        correctAnswer: '25',
        explanation: 'Visszafelé: 7 + 3 = 10 → 10 · 4 = 40 → 40 − 15 = 25. Ellenőrzés: (25 + 15) : 4 − 3 = 40 : 4 − 3 = 10 − 3 = 7.',
        hint: 'Fordított műveletek: 7 + 3 = 10, 10 · 4 = 40, 40 − 15 = ?'
      },
      {
        id: 'sum-l3-23',
        question: 'Egy kétkarú mérleg bal serpenyőjében 3 egyforma doboz és egy 5 kg-os súly van, a jobb serpenyőben 1 ugyanolyan doboz és egy 17 kg-os súly egyensúlyozza ki (3 · x + 5 = x + 17). Mennyi 1 doboz tömege?',
        options: ['6 kg', '5 kg', '7 kg', '8 kg'],
        correctAnswer: '6 kg',
        explanation: 'Mérlegelv: mindkét oldalról leveszünk 1 dobozt: 2 · x + 5 = 17. Leveszünk 5 kg-ot: 2 · x = 12. Kettéosztjuk: x = 6 kg.',
        hint: 'Mindkét oldalról vonj le 1 dobozt és 5 kg-ot: 2 · x = 12 kg.'
      },
      {
        id: 'sum-l3-24',
        question: 'Gondoltam egy számra: a 4-szereséből kivontam a szám felét (0,5-szeresét), és 28-at kaptam (3,5 · x = 28). Melyik számra gondoltam?',
        options: ['8', '7', '9', '6'],
        correctAnswer: '8',
        explanation: '4 · x − 0,5 · x = 3,5 · x = 28. x = 28 : 3,5 = 8. Ellenőrzés: 4 · 8 − 4 = 32 − 4 = 28.',
        hint: '3,5 · x = 28. Oszd el a 28-at 3,5-del!'
      },
      {
        id: 'sum-l3-25',
        question: 'Egy baromfiudvarban tyúkok és nyulak vannak. Összesen 20 fejet és 56 lábat számoltunk össze. Hány nyúl van az udvarban?',
        options: ['8 nyúl', '10 nyúl', '6 nyúl', '12 nyúl'],
        correctAnswer: '8 nyúl',
        explanation: 'Feltesszük, hogy mind a 20 állat 2 lábú tyúk: ekkor 20 · 2 = 40 láb lenne. A valóságban 56 − 40 = 16-tal több láb van. Mivel egy nyúlnak 2-vel több lába van, mint a tyúknak, a nyulak száma: 16 : 2 = 8 nyúl (és 20 − 8 = 12 tyúk). Ellenőrzés: 8 · 4 + 12 · 2 = 32 + 24 = 56 láb.',
        hint: 'Ha mind a 20 tyúk lenne, 40 láb lenne. A 16 hiányzó lábat nyulanként 2-esével adjuk hozzá!'
      },
      {
        id: 'sum-l3-26',
        question: 'Három egymást követő páros természetes szám összege 78. Melyik a legkisebb szám a három közül?',
        options: ['24', '26', '22', '28'],
        correctAnswer: '24',
        explanation: 'Jelöljük a középső számot x-szel, ekkor a három szám: (x − 2), x, (x + 2). Összegük: 3 · x = 78 → x = 26 (középső szám). A legkisebb szám: 26 − 2 = 24. A három szám: 24, 26, 28 (összegük: 24 + 26 + 28 = 78).',
        hint: 'A három szám átlaga pont a középső szám: 78 : 3 = 26. A legkisebb ennél 2-vel kevesebb.'
      },
      {
        id: 'sum-l3-27',
        question: 'Apa most 38 éves, a lánya 10 éves. Hány év múlva lesz az apa életkora pontosan a háromszorosa a lánya életkorának?',
        options: ['4 év múlva', '3 év múlva', '5 év múlva', '6 év múlva'],
        correctAnswer: '4 év múlva',
        explanation: 'Korkülönbségük állandó: 38 − 10 = 28 év. Amikor apa 3-szorosa a lánynak, a különbségük 3 − 1 = 2 rész. 1 rész (lány életkora) = 28 : 2 = 14 éves korában következik be. Mivel a lány most 10 éves, ez 14 − 10 = 4 év múlva lesz. Ekkor apa 38 + 4 = 42, a lány 14, és 42 : 14 = 3.',
        hint: 'A korkülönbség 28 év marad mindig. Amikor apa 3-szorosa a lánynak, apa 42 és a lány 14 éves.'
      },
      {
        id: 'sum-l3-28',
        question: 'Egy gépkocsi az út első 120 km-ét 60 km/h sebességgel tette meg, a következő 180 km-t pedig autópályán 90 km/h sebességgel. Mekkora volt a teljes 300 km-es út átlagsebessége?',
        options: ['75 km/h', '70 km/h', '80 km/h', '72 km/h'],
        correctAnswer: '75 km/h',
        explanation: '1. szakasz menetideje: 120 : 60 = 2 óra. 2. szakasz menetideje: 180 : 90 = 2 óra. Teljes megtett út: 120 + 180 = 300 km. Teljes menetidő: 2 + 2 = 4 óra. Átlagsebesség = Teljes út : Teljes idő = 300 : 4 = 75 km/h.',
        hint: 'Átlagsebesség = Teljes út (300 km) osztva a Teljes idővel (2 + 2 = 4 óra).'
      },
      {
        id: 'sum-l3-29',
        question: 'Egy webáruházban 15 000 Ft felett ingyenes a házhozszállítás, egyébként 1490 Ft a szállítási díj. Kosarunk értéke 13 800 Ft. Mennyivel járunk jobban forintban, ha a szállítási díj kifizetése helyett beteszünk egy 1400 Ft-os könyvet a kosárba?',
        options: ['90 Ft-tal kevesebbet fizetünk (és megkapjuk a könyvet is)', '100 Ft-tal kevesebbet fizetünk', 'Ugyanannyit fizetünk', '1400 Ft-tal kevesebbet fizetünk'],
        correctAnswer: '90 Ft-tal kevesebbet fizetünk (és megkapjuk a könyvet is)',
        explanation: 'Könyv nélkül: 13 800 + 1490 = 15 290 Ft. Könyvvel: 13 800 + 1400 = 15 200 Ft (és elértük az ingyenes szállítást!). 15 290 − 15 200 = 90 Ft-tal kevesebbet fizetünk, és még a könyv is a miénk.',
        hint: '13 800 + 1490 = 15 290 Ft vs 13 800 + 1400 = 15 200 Ft. 15 290 − 15 200 = ?'
      },
      {
        id: 'sum-l3-30',
        question: 'Egy 10 literes falfesték 80 m² falfelület egyszeri befestésére elegendő. Szobánk 4 falának összfelülete az ajtó- és ablaknyílások levonása után 40 m². A falakat kétszer szeretnénk átfesteni. Hány ilyen 10 literes vödör festéket kell vásárolnunk?',
        options: ['1 vödör elegendő', '2 vödör kell', '3 vödör kell', 'Nem elég 1 vödör'],
        correctAnswer: '1 vödör elegendő',
        explanation: 'A kétszeri festés miatt a teljes lefestendő felület: 2 · 40 m² = 80 m². Mivel 1 darab 10 literes vödör pontosan 80 m²-re elegendő, pontosan 1 vödör festékre van szükség.',
        hint: '2 · 40 m² = 80 m² teljes felület. 1 vödör pontosan 80 m²-re elég.'
      }
    ]
  };

  return (
    <QuizTemplate
      title="VI. Fejezet Összefoglaló Kvíz"
      subtitle="90 átfogó feladat 3 szinten: tömeg, űrtartalom, idő, arányosságok, nyitott mondatok és szöveges feladványok!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-summary-wp-quiz"
      documentId="5_osztaly_osszefoglalas_kviz"
      storageKey="g5-summary-wp-quiz"
      levelCheatSheets={levelCheatSheets}
      cheatSheetCards={levelCheatSheets}
      questions={questions}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <WordProblemsSummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <WordProblemsSummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <WordProblemsSummaryMatcher
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
      renderSorter={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <WordProblemsSummarySorter
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
    />
  );
};

export default WordProblemsSummaryQuiz;
