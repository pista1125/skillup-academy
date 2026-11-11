import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AverageArithmeticMatcher } from './AverageArithmeticMatcher';
import { AverageArithmeticSorter } from './AverageArithmeticSorter';
import {
  BalanceMeanSvg,
  DeviationLineSvg,
  WeightedMeanBlocksSvg,
  TargetShootingSvg,
  OutlierImpactSvg
} from './AverageArithmeticFigures';

interface AverageArithmeticQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Egyszerű és súlyozott átlag',
    description: 'Az átlag az elemek összege osztva a darabszámmal: x̄ = (∑xᵢ) / n. Súlyozott esetben: x̄ = (∑fᵢ · xᵢ) / (∑fᵢ).',
    note: 'Ha ismered az átlagot (x̄) és a darabszámot (n), a számok összege: S = n · x̄.',
    color: 'from-emerald-500 to-teal-600',
    figure: <BalanceMeanSvg size={200} />
  },
  {
    title: 'Az eltérések alaptörvénye',
    description: 'Bármilyen adatsor esetén az átlagtól vett előjeles eltérések összege pontosan 0: ∑(xᵢ - x̄) = 0.',
    note: 'A negatív eltérések és a pozitív eltérések összege tökéletesen kiegyenlíti egymást.',
    color: 'from-blue-500 to-indigo-600',
    figure: <DeviationLineSvg size={200} />
  },
  {
    title: 'Tipikus csapdák és kiugró értékek',
    description: 'Az átlag nem robusztus: egyetlen extrém adat (outlier) erősen eltorzíthatja. Csoportok esetén az átlagok átlaga csak azonos létszámnál működik!',
    note: 'Feri lövészversenyén és célátlagoknál: felírt egyenlőtlenségből az összegre vonatkozó alsó korlát adja meg a szükséges jegyet.',
    color: 'from-rose-500 to-amber-600',
    figure: <OutlierImpactSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és egyszerű számtani közép',
    subtitle: '10 alapozó feladat az átlag fogalmáról, képletéről és számításáról',
    range: '1–10. kérdés',
    focus: 'Egyszerű átlag képlete, adatok összege és alapvető tulajdonságok',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'aaq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki n darab valós szám számtani közepét (átlagát)?',
        options: [
          'Az adatok összegét elosztjuk a számok darabszámával: (∑xᵢ) / n',
          'A legnagyobb és legkisebb adat összegét elosztjuk kettővel',
          'Az adatokat sorba rendezzük, és a középső elemet választjuk',
          'A leggyakrabban előforduló adatot vesszük'
        ],
        correctAnswer: 'Az adatok összegét elosztjuk a számok darabszámával: (∑xᵢ) / n',
        explanation: 'A számtani közép (átlag) definíciója szerint az elemek összegét osztjuk a darabszámmal: x̄ = (x₁ + x₂ + ... + xₙ) / n.',
        hint: 'Gondolj arra, hogy az összes értéket egyenlően szétosztjuk az elemek között.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'aaq1-2',
        level: 1,
        question: 'Mennyi a 12, 16, 20 és 28 számok számtani közepe?',
        options: ['19', '18', '20', '76'],
        correctAnswer: '19',
        explanation: 'A négy szám összege: 12 + 16 + 20 + 28 = 76. Ezt elosztva 4-gyel: 76 / 4 = 19.',
        hint: 'Add össze a négy számot, majd oszd el néggyel!',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'aaq1-3',
        level: 1,
        question: 'Egy 5 fős csoport átlagéletkora 14 év. Mennyi a csoporttagok életkorainak összege?',
        options: ['70 év', '50 év', '19 év', '2,8 év'],
        correctAnswer: '70 év',
        explanation: 'Mivel x̄ = (összeg) / n, ezért az összeg = n · x̄ = 5 · 14 = 70 év.',
        hint: 'Ha az átlag és a létszám adott, szorozd össze őket az összeghez!',
        questionTypeBadge: 'Összegképzés'
      },
      {
        id: 'aaq1-4',
        level: 1,
        question: 'Három szám átlaga 20. Az első két szám 15 és 22. Mennyi a harmadik szám?',
        options: ['23', '21', '25', '18'],
        correctAnswer: '23',
        explanation: 'A három szám összege 3 · 20 = 60. A harmadik szám: 60 - (15 + 22) = 60 - 37 = 23.',
        hint: 'A három szám összegéből vond ki az első kettő összegét!',
        questionTypeBadge: 'Hiányzó adat'
      },
      {
        id: 'aaq1-5',
        level: 1,
        question: 'Bármely valós adatsor esetén mennyi az adatok átlagtól vett előjeles eltéréseinek összege: Σ(xᵢ - x̄)?',
        options: ['Mindig pontosan 0', 'Mindig pozitív szám', 'Egyenlő az adatok számával (n)', 'Attól függ, mekkora az átlag'],
        correctAnswer: 'Mindig pontosan 0',
        explanation: 'Ez a számtani közép alaptétele: Σ(xᵢ - x̄) = Σxᵢ - n·x̄ = n·x̄ - n·x̄ = 0. A negatív és pozitív eltérések kiegyenlítik egymást.',
        hint: 'Gondolj a kétkarú mérlegre: a súlypont körül a forgatónyomatékok összege nulla!',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'aaq1-6',
        level: 1,
        question: 'Mennyi öt darab 8-as szám (8, 8, 8, 8, 8) számtani közepe?',
        options: ['8', '40', '1,6', '16'],
        correctAnswer: '8',
        explanation: 'Ha egy számsokaság minden eleme egyenlő (itt 8), akkor az átlaguk is pontosan megegyezik ezzel az értékkel: (5 · 8) / 5 = 8.',
        hint: 'Ha minden érték ugyanaz, mennyi lesz az átlaguk?',
        questionTypeBadge: 'Alaptulajdonság'
      },
      {
        id: 'aaq1-7',
        level: 1,
        question: 'Lehet-e egy számsokaság átlaga szigorúan kisebb, mint az adatsorban szereplő legkisebb szám?',
        options: [
          'Nem, az átlag soha nem lehet kisebb a minimumnál',
          'Igen, ha sok negatív szám van a mintában',
          'Igen, ha a minta elemszáma páratlan',
          'Igen, ha a számok összege negatív'
        ],
        correctAnswer: 'Nem, az átlag soha nem lehet kisebb a minimumnál',
        explanation: 'A számtani közép mindig a legkisebb és a legnagyobb adat közé esik (x_min ≤ x̄ ≤ x_max). Nem lehet kisebb a minimumnál és nagyobb a maximumnál.',
        hint: 'Vajon lehet-e a számok közepe kint a legkisebb számon túl?',
        questionTypeBadge: 'Tulajdonság'
      },
      {
        id: 'aaq1-8',
        level: 1,
        question: 'Peti matematikajegyei: 5, 4, 3, 5, 3. Mennyi Peti matematika átlaga?',
        options: ['4,0', '4,2', '3,8', '20'],
        correctAnswer: '4,0',
        explanation: 'A jegyek összege: 5 + 4 + 3 + 5 + 3 = 20. Jegyek száma 5. Átlag: 20 / 5 = 4,0.',
        hint: 'Add össze az 5 jegyet és oszd el 5-tel!',
        questionTypeBadge: 'Jegyátlag'
      },
      {
        id: 'aaq1-9',
        level: 1,
        question: 'Két szám számtani közepe 32. Az egyik szám 28. Mi a másik szám?',
        options: ['36', '34', '30', '64'],
        correctAnswer: '36',
        explanation: 'Két szám esetén (28 + x) / 2 = 32, így 28 + x = 64, amiből x = 64 - 28 = 36.',
        hint: 'A két szám összege 2 · 32 = 64.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'aaq1-10',
        level: 1,
        question: 'Kötelező-e, hogy az átlag értéke megegyezzen a kiinduló adatok valamelyikével?',
        options: [
          'Nem kötelező (pl. 2 és 3 átlaga 2,5, ami nem szerepel a számok között)',
          'Igen, az átlagnak mindig szerepelnie kell a mintában',
          'Csak akkor, ha az adatok száma páros',
          'Csak akkor, ha az adatok száma páratlan'
        ],
        correctAnswer: 'Nem kötelező (pl. 2 és 3 átlaga 2,5, ami nem szerepel a számok között)',
        explanation: 'Az átlag a minta súlypontját jelzi, nem kötelező, hogy az eredeti adatok között szerepeljen (pl. az átlagos gyermekszám egy családban 1,8).',
        hint: 'Gondolj egy olyan adatsorra, mint az 1 és a 2!',
        questionTypeBadge: 'Fogalom'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Súlyozott átlag, transzformációk és hiányzó adatok',
    subtitle: '10 közepes nehézségű feladat gyakorisági táblázatokkal és adatmódosításokkal',
    range: '11–20. kérdés',
    focus: 'Súlyozott számtani közép, lineáris transzformációk, kiugró értékek',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'aaq2-1',
        level: 2,
        question: 'Egy csoportban 4 diák kapott 5-öst, 3 diák 4-est, 2 diák 3-ast és 1 diák 2-est. Mennyi a csoport súlyozott jegyátlaga?',
        options: ['4,0', '3,8', '4,2', '3,5'],
        correctAnswer: '4,0',
        explanation: 'Súlyozott átlag: (4·5 + 3·4 + 2·3 + 1·2) / (4 + 3 + 2 + 1) = (20 + 12 + 6 + 2) / 10 = 40 / 10 = 4,0.',
        hint: 'Szorozd össze a jegyeket a gyakoriságukkal, majd oszd el az összlétszámmal (10)!',
        questionTypeBadge: 'Súlyozott átlag'
      },
      {
        id: 'aaq2-2',
        level: 2,
        question: 'Kata 20-szor dobott egy kockával: 1-es (2 db), 2-es (2 db), 3-as (4 db), 4-es (4 db), 5-ös (5 db), a többi 6-os. Mennyi a dobások átlaga?',
        options: ['3,85', '3,50', '4,10', '3,65'],
        correctAnswer: '3,85',
        explanation: 'A 6-os dobások száma: 20 - (2+2+4+4+5) = 3 db. Összeg: 2·1 + 2·2 + 4·3 + 4·4 + 5·5 + 3·6 = 2 + 4 + 12 + 16 + 25 + 18 = 77. Átlag: 77 / 20 = 3,85.',
        hint: 'Először határozd meg a 6-osok darabszámát (20-ból kivonva a többit)!',
        questionTypeBadge: 'Tankönyvi feladat'
      },
      {
        id: 'aaq2-3',
        level: 2,
        question: 'Egy dolgozat osztályátlaga 28 pont lett. A tanár minden diák dolgozatára +3 pont bónuszt ad. Mennyi lesz az új átlag?',
        options: ['31 pont', '28 pont', '34 pont', '84 pont'],
        correctAnswer: '31 pont',
        explanation: 'Ha minden adathoz hozzáadunk egy c konstans értéket, az új átlag is pontosan c-vel nő: x̄_új = x̄ + c = 28 + 3 = 31.',
        hint: 'A konstans hozzáadás közvetlenül hozzáadódik az átlaghoz.',
        questionTypeBadge: 'Lineáris transzformáció'
      },
      {
        id: 'aaq2-4',
        level: 2,
        question: 'Egy üzem dolgozóinak átlagbére 300 000 Ft. A cég minden dolgozó bérét egységesen 10%-kal megemeli. Mennyi lesz az új átlagbér?',
        options: ['330 000 Ft', '310 000 Ft', '300 000 Ft', '303 000 Ft'],
        correctAnswer: '330 000 Ft',
        explanation: 'A 10%-os emelés azt jelenti, hogy minden adat 1,10-szeresére változik. Ekkor az átlag is 1,10-szeresére nő: 300 000 · 1,10 = 330 000 Ft.',
        hint: 'Ha minden adat c-szeresére nő, az átlag is c-szeresére változik.',
        questionTypeBadge: 'Százalékos változás'
      },
      {
        id: 'aaq2-5',
        level: 2,
        question: 'A 100; 101; 103 és n számok átlaga 102. Mennyi az n értéke?',
        options: ['104', '102', '106', '100'],
        correctAnswer: '104',
        explanation: 'A 4 szám összege: 4 · 102 = 408. Az ismert 3 szám összege: 100 + 101 + 103 = 304. Így n = 408 - 304 = 104.',
        hint: 'A 4 szám összege 4 · 102 = 408. Ebből vond ki a megadott 3 szám összegét!',
        questionTypeBadge: 'Hiányzó adat'
      },
      {
        id: 'aaq2-6',
        level: 2,
        question: 'Juli matekjegyei: felelet (5-ös, 1x súly), házi feladat (4-es, 1x súly), témazáró dolgozat (5-ös, 2x súly). Mennyi Juli súlyozott átlaga?',
        options: ['4,75', '4,67', '4,50', '4,80'],
        correctAnswer: '4,75',
        explanation: 'Súlyok összege: 1 + 1 + 2 = 4. Súlyozott összeg: 1·5 + 1·4 + 2·5 = 5 + 4 + 10 = 19. Átlag: 19 / 4 = 4,75.',
        hint: 'A témazáró 2-szeres súllyal számít, mintha két darab 5-öst kapott volna!',
        questionTypeBadge: 'E-napló súlyozás'
      },
      {
        id: 'aaq2-7',
        level: 2,
        question: 'Egy évfolyamon a fiúk (15 fő) átlagmagassága 176 cm, a lányoké (10 fő) 166 cm. Mennyi a 25 tanuló együttes átlagmagassága?',
        options: ['172 cm', '171 cm', '170 cm', '173 cm'],
        correctAnswer: '172 cm',
        explanation: 'Súlyozott átlag a csoportlétszámokkal: (15·176 + 10·166) / 25 = (2640 + 1660) / 25 = 4300 / 25 = 172 cm. (Nem 171 cm, mert több a fiú!)',
        hint: 'Ne az egyszerű átlagot vedd, hanem a létszámokkal súlyozott összeget oszd 25-tel!',
        questionTypeBadge: 'Csoportátlag'
      },
      {
        id: 'aaq2-8',
        level: 2,
        question: '12 szám átlaga pontosan 20. Hozzáveszünk a mintához egy 13. számot, ami szintén 20. Hogyan változik a 13 szám átlaga?',
        options: ['Változatlan marad (20)', 'Megnő 20/13-mal', 'Csökken', 'Megduplázódik'],
        correctAnswer: 'Változatlan marad (20)',
        explanation: 'Ha pontosan az átlaggal megegyező értéket adunk a számsokasághoz, az átlag változatlan marad: (12·20 + 20) / 13 = (240 + 20) / 13 = 260 / 13 = 20.',
        hint: 'Ha egy olyan számot adsz hozzá, aminek az átlagtól vett eltérése 0, elbillenhet-e a mérleg?',
        questionTypeBadge: 'Tulajdonság'
      },
      {
        id: 'aaq2-9',
        level: 2,
        question: 'Négy dolgozó bére: 200, 210, 220 és 230 ezer Ft (átlaguk 215 ezer). Belép az igazgató 1 500 ezer Ft bérrel. Mennyi az 5 ember új átlagbére?',
        options: ['472 ezer Ft', '215 ezer Ft', '350 ezer Ft', '520 ezer Ft'],
        correctAnswer: '472 ezer Ft',
        explanation: 'Új összeg: 200 + 210 + 220 + 230 + 1500 = 2360 ezer Ft. Új átlag: 2360 / 5 = 472 ezer Ft. Ez szemlélteti a kiugró értékek (outlier) torzító hatását.',
        hint: 'Add össze mind az 5 fizetést és oszd el 5-tel!',
        questionTypeBadge: 'Kiugró érték'
      },
      {
        id: 'aaq2-10',
        level: 2,
        question: 'Egy adatsor elemei: 14, 18, 22, 26. Mennyi az átlagtól vett eltérések négyzeteinek összege nélkül az előjeles eltérések összege: (14-x̄) + (18-x̄) + (22-x̄) + (26-x̄)?',
        options: ['0', '4', '-4', '80'],
        correctAnswer: '0',
        explanation: 'Az átlag: (14 + 18 + 22 + 26) / 4 = 80 / 4 = 20. Az eltérések: (14-20) + (18-20) + (22-20) + (26-20) = (-6) + (-2) + (+2) + (+6) = 0.',
        hint: 'Az előjeles eltérések összege az átlagtól mindig...',
        questionTypeBadge: 'Eltérések'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kompetencia, érettségi és összetett szöveges feladatok',
    subtitle: '10 komplex, szöveges vizsgafeladat valós statisztikai problémákkal',
    range: '21–30. kérdés',
    focus: 'Feri lövészversenye, Gergő kosármeccsei, minőségellenőrzés, egyetemi súlyozás',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-pink-600',
    questions: [
      {
        id: 'aaq3-1',
        level: 3,
        question: 'Feri lövészversenyen vesz részt (Kompetenciamérés, 2011). Első 4 lövése: 8, 8, 9, 10. A győzelemhez 8,6-nél nagyobb átlag kell 5 lövésből. Legalább hány pontos lövés szükséges?',
        options: ['Legalább 9 pontos', 'Legalább 8 pontos', 'Pontosan 10 pontos', 'Már 7 pont is elég'],
        correctAnswer: 'Legalább 9 pontos',
        explanation: 'Egyenlőtlenség: (35 + x) / 5 > 8,6 ➔ 35 + x > 43 ➔ x > 8. Mivel a pontszám egész szám és szigorúan nagyobb 8-nál, ezért legalább 9 pont kell a győzelemhez.',
        hint: 'Az eddigi összeg 35. Az 5 lövés összegének nagyobbnak kell lennie, mint 5 · 8,6 = 43.',
        questionTypeBadge: 'Kompetenciamérés'
      },
      {
        id: 'aaq3-2',
        level: 3,
        question: 'Gergő kosárlabdázik (Kompetenciamérés, 2006). Az utolsó előtti meccsig 73 pontot dobott, meccsátlaga 14,6 volt. Az utolsó meccsén 20 pontot szerzett. Mennyi lett az új meccsátlaga?',
        options: ['15,5 pont', '15,0 pont', '16,2 pont', '14,8 pont'],
        correctAnswer: '15,5 pont',
        explanation: 'Az eddigi mérkőzések száma: 73 / 14,6 = 5 meccs. Az új meccsel együtt 6 meccset játszott, az új összpontszám 73 + 20 = 93 pont. Új átlag: 93 / 6 = 15,5 pont.',
        hint: 'Először határozd meg az eddigi meccsek számát: 73 / 14,6.',
        questionTypeBadge: 'Kompetenciamérés'
      },
      {
        id: 'aaq3-3',
        level: 3,
        question: 'Anna fizetése januártól májusig havi 160 ezer Ft volt. Júniustól 15%-kal megemelték, és ez maradt az év végéig (7 hónap). Mennyi volt Anna egész éves havi átlagfizetése?',
        options: ['174 ezer Ft', '172 ezer Ft', '170 ezer Ft', '175 ezer Ft'],
        correctAnswer: '174 ezer Ft',
        explanation: 'A megemelt bér: 160 · 1,15 = 184 ezer Ft. Éves összbevétel: 5 · 160 + 7 · 184 = 800 + 1288 = 2088 ezer Ft. Havi átlag: 2088 / 12 = 174 ezer Ft.',
        hint: '5 hónapig 160 ezer, 7 hónapig 160 · 1,15 = 184 ezer Ft. Számold ki a 12 hónap összegét!',
        questionTypeBadge: 'Tankönyvi feladat'
      },
      {
        id: 'aaq3-4',
        level: 3,
        question: 'Egy gyógyszer előállításához 24 g hatóanyag kell. 10 mérés súlyozott átlaga 24,074 g lett. Akkor fogadható el, ha az átlag legfeljebb 0,5%-kal tér el a 24 g-tól. Elfogadható-e az anyag?',
        options: [
          'Igen, mert az eltérés kb. 0,31%, ami nem haladja meg a 0,5%-ot',
          'Nem, mert az átlag nagyobb 24 grammnál',
          'Nem, mert az eltérés meghaladja az 1%-ot',
          'Nem dönthető el a szórás ismerete nélkül'
        ],
        correctAnswer: 'Igen, mert az eltérés kb. 0,31%, ami nem haladja meg a 0,5%-ot',
        explanation: 'A megengedett maximális eltérés 24 g 0,5%-a: 24 · 0,005 = 0,12 g. A tényleges eltérés |24,074 - 24| = 0,074 g (kb. 0,31%). Mivel 0,074 < 0,12, a csomagolóanyag elfogadható.',
        hint: 'Számold ki a 24 gramm 0,5%-át: 24 · 0,005 = 0,12 g!',
        questionTypeBadge: 'Minőségellenőrzés'
      },
      {
        id: 'aaq3-5',
        level: 3,
        question: 'Egy röplabdacsapat 6 pályán lévő játékosának átlagmagassága 172 cm. Egy játékost lecserélnek, így az átlagmagasság 174 cm lesz. Mennyivel magasabb az új játékos a réginél?',
        options: ['12 cm-rel', '2 cm-rel', '6 cm-rel', '24 cm-rel'],
        correctAnswer: '12 cm-rel',
        explanation: 'Az összeg korábban 6 · 172 = 1032 cm volt, a csere után 6 · 174 = 1044 cm lett. A növekedés 1044 - 1032 = 12 cm, tehát az új játékos 12 cm-rel magasabb.',
        hint: 'A 6 játékos összteljesítménye 6 · (174 - 172) cm-rel nőtt!',
        questionTypeBadge: 'Szöveges feladat'
      },
      {
        id: 'aaq3-6',
        level: 3,
        question: '15 szám átlaga 4,2. Hozzávettünk még egy számot, így a 16 szám új átlaga pontosan 5 lett. Melyik számot vettük hozzá?',
        options: ['17', '15', '21', '12'],
        correctAnswer: '17',
        explanation: 'A régi összeg: 15 · 4,2 = 63. Az új összeg: 16 · 5 = 80. A hozzáadott 16. szám: 80 - 63 = 17.',
        hint: 'Vond ki a régi összeget (15 · 4,2) az új összegből (16 · 5)!',
        questionTypeBadge: 'Hiányzó adat'
      },
      {
        id: 'aaq3-7',
        level: 3,
        question: 'A Csorba utcai iskola indulóinak átlaga 34 pont, a Konkoly utcai iskola indulóinak átlaga 42 pont. Együttes átlaguk 36 pont. Melyik iskolából indultak többen?',
        options: [
          'A Csorba utcai iskolából, 3-szor annyian (arány 3 : 1)',
          'A Konkoly utcai iskolából, 2-szer annyian',
          'Ugyanannyian indultak a két iskolából',
          'A Csorba utcai iskolából, de csak 1 fővel többen'
        ],
        correctAnswer: 'A Csorba utcai iskolából, 3-szor annyian (arány 3 : 1)',
        explanation: 'Súlyozott egyenlet: 34·c + 42·k = 36·(c + k) ➔ 34c + 42k = 36c + 36k ➔ 6k = 2c ➔ c = 3k. Mivel a 36 közelebb van a 34-hez (távolság 2), mint a 42-höz (távolság 6), a Csorba utcai létszám 3-szorosa a Konkolyénak.',
        hint: 'Melyik átlaghoz van közelebb a közös átlag (36)? A 34-hez (távolság 2) vagy a 42-höz (távolság 6)?',
        questionTypeBadge: 'Érettségi típus'
      },
      {
        id: 'aaq3-8',
        level: 3,
        question: 'Egy egyetemi tantárgy félévi jegye: házi dolgozat (1x súly) + 2·zh (2x súly) + 3·vizsga (3x súly), osztva 6-tal. Balázs házija 3-as, zh-ja 2-es lett. Legalább hányas vizsga kell a 3,51-es négyeshez?',
        options: ['5-ös vizsga szükséges', '4-es vizsga elég', 'Nem érhető el a négyes', '3-as vizsga is elég'],
        correctAnswer: '5-ös vizsga szükséges',
        explanation: 'Átlag: (1·3 + 2·2 + 3·v) / 6 ≥ 3,51 ➔ (7 + 3v) / 6 ≥ 3,51 ➔ 7 + 3v ≥ 21,06 ➔ 3v ≥ 14,06 ➔ v ≥ 4,69. Mivel a vizsgajegy egész szám, csakis az 5-ös vizsgával érhető el a négyes félévi jegy.',
        hint: 'Írd fel az egyenlőtlenséget: (3 + 4 + 3v) / 6 ≥ 3,51!',
        questionTypeBadge: 'Egyetemi súlyozás'
      },
      {
        id: 'aaq3-9',
        level: 3,
        question: 'Egy kamarakórus tagjai mind legalább 40 évesek. A kórus legidősebb tagja 54 éves. Az átlagéletkor 43 év. Amikor a korelnök (54 éves) hiányzik, az átlag 42 év. Hányan vannak a kórusban?',
        options: ['12 tagú a kórus', '10 tagú a kórus', '15 tagú a kórus', '8 tagú a kórus'],
        correctAnswer: '12 tagú a kórus',
        explanation: 'Legyen n a létszám. Összéletkor: 43n. A korelnök nélkül n - 1 tag van, életkoruk összege: 43n - 54 = 42(n - 1) ➔ 43n - 54 = 42n - 42 ➔ n = 12 tag.',
        hint: 'Állíts fel egyenletet az összéletkorra: 43n - 54 = 42(n - 1)!',
        questionTypeBadge: 'Összetett feladat'
      },
      {
        id: 'aaq3-10',
        level: 3,
        question: 'Egy diák angol jegyeinek átlaga jelenleg 4,375. Még egy dolgozatot írnak, és a jeleshez legalább 4,50-es átlag kell. Kiszámolta, hogy még 5-össel sem érheti el a jelest. Legalább hány jegye van eddig?',
        options: ['Legalább 5 jegye van', 'Legalább 8 jegye van', 'Pontosan 3 jegye van', 'Legfeljebb 4 jegye van'],
        correctAnswer: 'Legalább 5 jegye van',
        explanation: 'A 4,375 törve: 4 + 3/8 = 35/8, tehát a jegyek száma a 8 többszöröse kell legyen ahhoz, hogy a jegyek összege egész legyen (8 jegynél az összeg 35). Ha 8 jegye van, az összeg 35. Új 5-össel: (35 + 5) / 9 = 40 / 9 ≈ 4,44 < 4,50. Tehát valóban nem érheti el a jelest, és eddig legalább 8 jegye van.',
        hint: 'Figyeld meg a 4,375 tizedestörtet: 4,375 = 35 / 8, tehát legalább 8 darab jegye van!',
        questionTypeBadge: 'Érettségi feladat'
      }
    ]
  }
};

export const AverageArithmeticQuiz: React.FC<AverageArithmeticQuizProps> = (props) => {
  return (
    <QuizTemplate
      title="Átlag és számtani közép Kvíz"
      subtitle="Gyakorold az egyszerű és súlyozott átlag, a mérési adatok és a célátlagok kiszámítását!"
      topicId="g10-stat-atlag-szamtani-kozep-quiz"
      topicTitle="Átlag, számtani közép"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={<AverageArithmeticMatcher onBack={props.onBack} onSwitchToTheory={props.onSwitchToTheory} onSwitchToQuiz={props.onBack} />}
      sorterComponent={<AverageArithmeticSorter onBack={props.onBack} onSwitchToTheory={props.onSwitchToTheory} onSwitchToQuiz={props.onBack} />}
      {...props}
    />
  );
};

export default AverageArithmeticQuiz;

