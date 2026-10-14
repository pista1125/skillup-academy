import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown, ArrowRightLeft } from 'lucide-react';
import { SetRelationsMatcher } from './SetRelationsMatcher';
import { SetRelationsSorter } from './SetRelationsSorter';

interface SetRelationsQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const setRelationsQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'sr-q1',
    level: 1,
    question: 'Hogyan nevezzük a matematikában azt a halmazt, amelynek elemeiből a hozzárendelés kiindul?',
    options: ['Értelmezési tartomány (alaphalmaz)', 'Értékkészlet', 'Képhalmaz', 'Üres halmaz'],
    correctAnswer: 0,
    explanation: 'A kiindulási elemek halmazát értelmezési tartománynak (vagy alaphalmaznak, jele: D vagy A) nevezzük.'
  },
  {
    id: 'sr-q2',
    level: 1,
    question: 'Mi a FÜGGVÉNY alapvető feltétele az értelmezési tartomány minden egyes elemére nézve?',
    options: [
      'Pontosan egyetlen képelem tartozik hozzá a képhalmazból',
      'Legalább kettő különböző képeleme kell hogy legyen',
      'Tetszőlegesen sok cél-elemhez rendelhető',
      'Nem indulhat ki belőle nyíl'
    ],
    correctAnswer: 0,
    explanation: 'A függvény aranyszabálya: az értelmezési tartomány minden egyes eleméhez a képhalmaz pontosan EGYETLEN eleme van hozzárendelve.'
  },
  {
    id: 'sr-q3',
    level: 1,
    question: 'A nyíldiagramon a = 2, b = 3, c = 4 elemekből a nyilak a 4, 6, 8 számokhoz futnak (2➔4, 3➔6, 4➔8). Mi a 3-as elem képe?',
    options: ['6', '4', '8', '3'],
    correctAnswer: 0,
    explanation: 'A 3-as elemből a nyíl a 6-oshoz mutat, tehát a 3 képe a 6 (a hozzárendelés szabálya a kétszerezés: x ➔ 2x).'
  },
  {
    id: 'sr-q4',
    level: 1,
    question: 'Az alábbi nyíldiagramon a 4-es számból két külön nyíl indul ki (4➔2 és 4➔8). Lehet-e ez a hozzárendelés függvény?',
    options: [
      'Nem, mert egy elemből két nyíl indul ki (többértelmű hozzárendelés)',
      'Igen, bármelyik elemből tetszőleges számú nyíl indulhat ki',
      'Igen, ha a többi számból csak egy nyíl indul ki',
      'Csak akkor, ha 4 páros szám'
    ],
    correctAnswer: 0,
    explanation: 'Nem lehet függvény! Egy kiinduló elemhez legfeljebb és legalább egy képelem tartozhat, így a többértelmű hozzárendelés tilos.'
  },
  {
    id: 'sr-q5',
    level: 1,
    question: 'Az értelmezési tartomány A = {Budapest, Bécs, Párizs}, és minden városhoz hozzárendeljük az országát. Függvény-e ez?',
    options: [
      'Igen, mert minden felsorolt városnak pontosan egy országa van',
      'Nem, mert a városok betűkből állnak, nem számokból',
      'Nem, mert egy országnak több városa is lehet',
      'Csak ha a városok lakossága egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'Igen, függvény! Nem csak számok alkothatnak halmazt, és minden egyes kiindulási városhoz pontosan 1 ország tartozik (Budapest➔Magyarország, Bécs➔Ausztria, Párizs➔Franciaország).'
  },
  {
    id: 'sr-q6',
    level: 1,
    question: 'Ha a hozzárendelés szabálya f(x) = x + 7, mennyi az f(5) értéke?',
    options: ['12', '35', '2', '7'],
    correctAnswer: 0,
    explanation: 'Az x helyére 5-öt behelyettesítve: f(5) = 5 + 7 = 12.'
  },
  {
    id: 'sr-q7',
    level: 1,
    question: 'Szabad-e egy függvény esetén két különböző bemeneti számnak ugyanarra a kimeneti értékre mutatnia (pl. -3➔9 és 3➔9)?',
    options: [
      'Igen, szabad (több az egyhez típusú hozzárendelés)',
      'Nem, mert a kimeneten is csak egy nyíl érkezhet be',
      'Csak pozitív számok esetén szabad',
      'Csak ha a célhalmaz egyetlen elemből áll'
    ],
    correctAnswer: 0,
    explanation: 'Igen! A függvény definíciója csak a kiinduló elemekre szab megkötést (mindenhonnan pontosan 1 nyíl indul). Az, hogy hova érkeznek a nyilak, nincs így korlátozva; az azonos érték (pl. négyzetre emelésnél) teljesen szabályos függvény.'
  },
  {
    id: 'sr-q8',
    level: 1,
    question: 'Egy iskola diákjaihoz hozzárendeljük a születési hónapjuk nevét (pl. Péter➔Április). Függvény-e ez a hozzárendelés?',
    options: [
      'Igen, mert minden diáknak pontosan egy születési hónapja van',
      'Nem, mert egy hónapban több diák is születhet',
      'Nem, mert csak 12 hónap van és több diák',
      'Csak ha az osztályban senki nem született ugyanabban a hónapban'
    ],
    correctAnswer: 0,
    explanation: 'Igen, függvény! Minden egyes diákból (bemenet) pontosan 1 nyíl indul a születési hónapjához (kimenet). Az, hogy egy hónapba több diák is mutat, teljesen szabályos.'
  },
  {
    id: 'sr-q9',
    level: 1,
    question: 'Fordítsuk meg az előzőt: A 12 hónaphoz hozzárendeljük a diákokat. Függvény-e ez a hozzárendelés a hónapok halmazán?',
    options: [
      'Nem függvény, mert egy hónaphoz több diák is tartozhat (többértelmű kapcsolat)',
      'Igen, ez is függvény marad mindig',
      'Igen, mert a hónapok száma állandó',
      'Csak ha szökőév van'
    ],
    correctAnswer: 0,
    explanation: 'Nem függvény! Egy hónapból több nyíl is kiindulna azon diákokhoz, akik abban a hónapban születtek. Mivel egy bemenethez több kimenet tartozna, ez nem függvény.'
  },
  {
    id: 'sr-q10',
    level: 1,
    question: 'Az A halmaz elemei: {1, 2, 3}. A nyíldiagramon az 1 és 2 elemekből indul nyíl, de a 3-asból egyetlen nyíl sem indul ki. Függvény-e az A halmazon?',
    options: [
      'Nem, mert a kiinduló halmaz minden eleméhez hozzá kell rendelni egy képet',
      'Igen, elég ha az elemek többségéből indul nyíl',
      'Igen, a 3-as elem értéke automatikusan 0',
      'Csak ha a 3 prím'
    ],
    correctAnswer: 0,
    explanation: 'Nem függvény az A halmazon! A függvény definíciója szerint az értelmezési tartomány MINDEN egyes eleméhez kötelező pontosan 1 képelemet rendelni. Nem maradhat ki egyetlen elem sem.'
  },

  // ===========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ===========================================
  {
    id: 'sr-q11',
    level: 2,
    question: 'Legyen A = {2, 4, 6} és a hozzárendelés szabálya f(x) = x / 2. Mi a függvény értékkészlete (R)?',
    options: ['{1, 2, 3}', '{2, 4, 6}', '{0, 1, 2}', '{4, 8, 12}'],
    correctAnswer: 0,
    explanation: 'Kiszámoljuk a képeket: f(2) = 2/2 = 1, f(4) = 4/2 = 2, f(6) = 6/2 = 3. Tehát az értékkészlet R = {1, 2, 3}.'
  },
  {
    id: 'sr-q12',
    level: 2,
    question: 'A hozzárendelés szabálya: Minden számhoz hozzárendeljük az összes pozitív egész osztóját. Függvény-e ez a 10-nél nagyobb egész számok halmazán?',
    options: [
      'Nem, mert egy számnak (pl. 12-nek: 1, 2, 3, 4, 6, 12) több osztója is van, így többértelmű',
      'Igen, mert minden számnak vannak osztói',
      'Igen, mert a prímszámoknak csak 2 osztója van',
      'Csak a páratlan számokon függvény'
    ],
    correctAnswer: 0,
    explanation: 'Nem függvény! Egy bemenethez (pl. 12) több kimenet tartozna (1, 2, 3, 4, 6, 12). Mivel egy számból több nyíl indulna, ez egy többértelmű hozzárendelés, nem függvény.'
  },
  {
    id: 'sr-q13',
    level: 2,
    question: 'Módosítsuk a szabályt: Minden pozitív egész számhoz hozzárendeljük a LEGNAGYOBB valódi osztóját. Függvény-e ez a 2-nél nagyobb egészeken?',
    options: [
      'Igen, mert minden számnak pontosan egyetlen legnagyobb valódi osztója van',
      'Nem, mert az osztók száma változó',
      'Nem, mert a prímszámoknak nincs ilyen osztója',
      'Csak ha a képhalmaz végtelen'
    ],
    correctAnswer: 0,
    explanation: 'Igen, ha a definíció értelmezési tartománya olyan összetett számokra korlátozódik, ahol van legnagyobb valódi osztó, akkor a "legnagyobb" jelző egyértelművé teszi a választ (pontosan 1 van belőle).'
  },
  {
    id: 'sr-q14',
    level: 2,
    question: 'Az alábbi értéktáblázat egy hozzárendelést ábrázol:\nx:  1 | 2 | 3 | 2\ny:  5 | 7 | 9 | 11\nFüggvény-e ez a hozzárendelés?',
    options: [
      'Nem függvény, mert az x = 2 értékhez egyszer 7, egyszer pedig 11 van rendelve',
      'Igen, mert minden számhoz tartozik egy y érték',
      'Igen, mert az y értékek mind páratlanok',
      'Csak akkor, ha az x = 2-t töröljük a táblázatból'
    ],
    correctAnswer: 0,
    explanation: 'Nem függvény! Az x = 2 bemenethez két különböző kimeneti érték tartozik (7 és 11). Mivel egy bemenetnek két képe van, nem teljesül az egyértelműség.'
  },
  {
    id: 'sr-q15',
    level: 2,
    question: 'Mi a különbség a KÉPHALMAZ (célhalmaz, B) és az ÉRTÉKKÉSZLET (R) között?',
    options: [
      'A képhalmaz az összes lehetséges cél-elemet tartalmazza, míg az értékkészlet csak azokat, amiket a függvény ténylegesen felvesz (R ⊆ B)',
      'Nincs különbség, a két fogalom teljesen azonos',
      'Az értékkészlet a bemeneti számok halmaza',
      'A képhalmaz mindig kisebb halmaz, mint az értékkészlet'
    ],
    correctAnswer: 0,
    explanation: 'A képhalmaz a lehetséges érkezési célhalmaz (pl. az összes egész szám), míg az értékkészlet azon elemek szűkebb halmaza, amelyekbe valóban mutat legalább egy nyíl (R ⊆ B).'
  },
  {
    id: 'sr-q16',
    level: 2,
    question: 'Legyen f(x) = 3x - 2, és az alaphalmaz A = {0, 1, 2, 3}. Mi a függvény értékkészlete?',
    options: ['{-2, 1, 4, 7}', '{0, 1, 2, 3}', '{1, 4, 7, 10}', '{-2, 0, 2, 4}'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve az elemeket: f(0)=3·0-2=-2, f(1)=3·1-2=1, f(2)=3·2-2=4, f(3)=3·3-2=7. Tehát R = {-2, 1, 4, 7}.'
  },
  {
    id: 'sr-q17',
    level: 2,
    question: 'A hozzárendelés: Minden emberhez hozzárendeljük a saját édesanyját. Függvény-e ez az élő emberek halmazán?',
    options: [
      'Igen, mert minden embernek pontosan egy biológiai édesanyja van',
      'Nem, mert egy anyának több gyermeke is lehet',
      'Nem, mert a testvéreknek ugyanaz az anyjuk',
      'Csak ha a családban egyke gyermek van'
    ],
    correctAnswer: 0,
    explanation: 'Igen, függvény! Minden egyes kiindulási emberből (bemenet) pontosan 1 nyíl indul az édesanyjához. Az nem számít, hogy egy anyához több gyermektől is futhat be nyíl.'
  },
  {
    id: 'sr-q18',
    level: 2,
    question: 'Ha f(x) = 2x + 5, és a képelem f(a) = 19, mennyi volt a kiinduló érték (az őskép, a)?',
    options: ['7', '12', '14', '9'],
    correctAnswer: 0,
    explanation: 'Megoldjuk az egyenletet: 2a + 5 = 19 ➔ 2a = 14 ➔ a = 7.'
  },
  {
    id: 'sr-q19',
    level: 2,
    question: 'Egy derékszögű koordináta-rendszerben mikor ábrázol egy pontsorozat vagy görbe függvényt?',
    options: [
      'Ha bármely függőleges egyenes legfeljebb egyetlen pontban metszi a grafikont',
      'Ha bármely vízszintes egyenes legalább két pontban metszi',
      'Ha a görbe csak pozitív számokon halad át',
      'Ha a vonal egyenes és nem hajlik meg'
    ],
    correctAnswer: 0,
    explanation: 'Ez a függőleges vonal teszt! Ha egy függőleges egyenes (adott x) több pontban metszené a grafikont, az azt jelentené, hogy egy x-hez több y tartozik, ami megsértené a függvény definícióját.'
  },
  {
    id: 'sr-q20',
    level: 2,
    question: 'A = {-2, -1, 0, 1, 2}. A hozzárendelés szabálya f(x) = x². Hány különböző elemből áll a függvény értékkészlete?',
    options: ['3 elemből: {0, 1, 4}', '5 elemből: {-4, -1, 0, 1, 4}', '4 elemből', '1 elemből'],
    correctAnswer: 0,
    explanation: 'A számok négyzetei: (-2)² = 4, (-1)² = 1, 0² = 0, 1² = 1, 2² = 4. Halmazban az azonos elemeket csak egyszer írjuk: R = {0, 1, 4}, ami 3 elemű.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'sr-q21',
    level: 3,
    question: 'Mikor mondjuk azt, hogy egy hozzárendelés KÖLCSÖNÖSEN EGYÉRTELMŰ (bijekció)?',
    options: [
      'Ha a kiinduló halmaz minden eleméhez pontosan egy képelem tartozik, ÉS minden képelemhez is pontosan egy kiinduló elem tartozik visszafelé',
      'Ha a kiinduló halmaz minden elemének képe megegyezik',
      'Ha az értelmezési tartománynak végtelen sok eleme van',
      'Ha a függvény grafikonja átmegy az origón'
    ],
    correctAnswer: 0,
    explanation: 'A kölcsönösen egyértelmű hozzárendelés mindkét irányban 1:1 kapcsolatot teremt: különböző elemekhez különböző képek tartoznak, és minden elérhető elem pontosan egy ősképhez van rendelve.'
  },
  {
    id: 'sr-q22',
    level: 3,
    question: 'Az alábbi függvények közül melyik KÖLCSÖNÖSEN EGYÉRTELMŰ a valós számok teljes halmazán?',
    options: ['f(x) = 2x + 3', 'f(x) = x²', 'f(x) = |x| (abszolút érték)', 'f(x) = 5 (konstans)'],
    correctAnswer: 0,
    explanation: 'Az f(x) = 2x + 3 szigorúan monoton növekvő egyenes: minden különböző x-hez más y tartozik, és bármely y-hoz pontosan egy x rendelhető vissza (x = (y-3)/2). Az x² és az |x| nem kölcsönösen egyértelmű, mert pl. f(-2) = f(2).'
  },
  {
    id: 'sr-q23',
    level: 3,
    question: 'Miért NEM kölcsönösen egyértelmű az f(x) = x² függvény az egész számok (Z) halmazán?',
    options: [
      'Mert az ellentett számok négyzete azonos (pl. f(-3) = 9 és f(3) = 9), így két bemenetnek ugyanaz a képe',
      'Mert a negatív számoknak nincs négyzete',
      'Mert a páratlan számok négyzete páratlan',
      'Mert az egész számok halmaza végtelen'
    ],
    correctAnswer: 0,
    explanation: 'A kölcsönös egyértelműséghez elengedhetetlen, hogy különböző kiinduló elemek képe is különböző legyen. Mivel (-3)² = 3² = 9, két különböző x ugyanarra az y-ra képeződik le.'
  },
  {
    id: 'sr-q24',
    level: 3,
    question: 'A hozzárendelés szabálya f(x) = 12 / x. Melyik szám NEM tartozhat a függvény értelmezési tartományához?',
    options: ['x = 0', 'x = -1', 'x = 12', 'x = 24'],
    correctAnswer: 0,
    explanation: 'A matematikában nullával való osztás nincs értelmezve! Ezért x = 0 esetén 12 / 0 nem értelmezhető, így x = 0-t kötelező kizárni az értelmezési tartományból.'
  },
  {
    id: 'sr-q25',
    level: 3,
    question: 'A nyíldiagramon a következő párok szerepelnek:\n1 ➔ 4\n2 ➔ 7\n3 ➔ 10\n4 ➔ 13\nMelyik képlet írja le a hozzárendelést?',
    options: ['f(x) = 3x + 1', 'f(x) = 4x', 'f(x) = 2x + 2', 'f(x) = x + 3'],
    correctAnswer: 0,
    explanation: 'A kimeneti értékek lépésköze 3 (4, 7, 10, 13), tehát a képlet 3x-szel kezdődik. x=1-re: 3·1 + 1 = 4; x=2-re: 3·2 + 1 = 7. A helyes szabály: f(x) = 3x + 1.'
  },
  {
    id: 'sr-q26',
    level: 3,
    question: 'Hol nem értelmezhető az f(x) = 15 / (x - 4) függvény?',
    options: ['x = 4-nél', 'x = 0-nál', 'x = -4-nél', 'x = 15-nél'],
    correctAnswer: 0,
    explanation: 'A nevező nem lehet 0. x - 4 = 0 esetén x = 4, ekkor nullával kellene osztani, így a függvény x = 4 helyen nincs értelmezve.'
  },
  {
    id: 'sr-q27',
    level: 3,
    question: 'Ha egy kölcsönösen egyértelmű hozzárendelésben f(x) = 4x - 5, és a célhalmazban y = 23, melyik x értékből indultunk ki?',
    options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
    correctAnswer: 0,
    explanation: 'Megoldjuk az egyenletet visszafelé: 4x - 5 = 23 ➔ 4x = 28 ➔ x = 7.'
  },
  {
    id: 'sr-q28',
    level: 3,
    question: 'Adott az A = {-3, -1, 1, 3} alaphalmaz és az f(x) = x² + 2 szabály. Hány elemű a függvény értékkészlete?',
    options: ['2 elemű: {3, 11}', '4 elemű: {3, 11, -3, -11}', '1 elemű', '3 elemű'],
    correctAnswer: 0,
    explanation: 'Számoljuk ki a képeket: f(-3) = (-3)² + 2 = 9 + 2 = 11; f(-1) = (-1)² + 2 = 1 + 2 = 3; f(1) = 1² + 2 = 3; f(3) = 3² + 2 = 11. Az értékkészlet R = {3, 11}, ami pontosan 2 különböző elemből áll.'
  },
  {
    id: 'sr-q29',
    level: 3,
    question: 'Melyik állítás IGAZ az alábbiak közül a KONSTANS (állandó) függvényre (pl. f(x) = 8 minden x-re)?',
    options: [
      'Szabályos függvény, amelynek az értékkészlete egyetlen elemből áll',
      'Nem függvény, mert több nyíl mutat a 8-ashoz',
      'Kölcsönösen egyértelmű hozzárendelés',
      'Csak a 0 helyen van értelmezve'
    ],
    correctAnswer: 0,
    explanation: 'A konstans függvény (pl. f(x) = 8) teljesen szabályos függvény! Minden bemeneti x-ből pontosan egy nyíl indul ki (a 8-ashoz). Az értékkészlete egyetlen elemből áll: R = {8}. Nem kölcsönösen egyértelmű, mert minden x-nek ugyanaz a képe.'
  },
  {
    id: 'sr-q30',
    level: 3,
    question: 'Melyik az az egyetlen tulajdonság, ami KÖTELEZŐ minden függvényre, de NEM kötelező a hozzárendelésekre általában?',
    options: [
      'Az értelmezési tartomány minden eleméből PONTOSAN egyetlen nyíl indul ki',
      'Minden képelembe pontosan egy nyíl érkezik be',
      'A függvény értékei csak pozitív számok lehetnek',
      'A függvény grafikonja mindig egyenes'
    ],
    correctAnswer: 0,
    explanation: 'A hozzárendelés lehet többértelmű (egy elemből több nyíl) vagy hiányos is, de a FÜGGVÉNY kötelező ismérve: az alaphalmaz minden egyes eleméhez a képhalmaz pontosan EGYETLEN eleme rendelődik hozzá.'
  }
];

const setRelationsCheatSheets: CheatSheetContent[] = [
  {
    title: '1. A Hozzárendelés és a Függvény Alapjai',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800">
          <strong className="text-blue-700 dark:text-blue-300 block mb-1">Fogalmak:</strong>
          <div>• <strong>Értelmezési tartomány (D / Alaphalmaz):</strong> Az a halmaz, amelynek elemeiből a hozzárendelés kiindul.</div>
          <div>• <strong>Képhalmaz (Célhalmaz):</strong> Az a halmaz, amelybe a hozzárendelt értékek érkeznek.</div>
          <div>• <strong>Kép:</strong> Az az elem a célhalmazban, amit egy bemenethez hozzárendelünk.</div>
          <div>• <strong>Őskép:</strong> A kiinduló elem az alaphalmazban.</div>
        </div>
        <div className="p-3 bg-emerald-50 dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">A Függvény Aranyszabálya:</strong>
          Egy hozzárendelés akkor és csak akkor <strong>FÜGGVÉNY</strong>, ha az alaphalmaz <em>minden egyes eleméhez</em> a képhalmaz <em>pontosan egyetlen</em> elemét rendeljük hozzá.
        </div>
      </div>
    )
  },
  {
    title: '2. Értelmezési tartomány és Értékkészlet',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-purple-50 dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800">
          <strong className="text-purple-700 dark:text-purple-300 block mb-1">Értékkészlet (R vagy R_f):</strong>
          <div>• Azoknak az értékeknek az összessége a célhalmazban, amelyeket a függvény <em>ténylegesen felvesz</em> (ahova valóban mutat legalább egy nyíl).</div>
          <div>• Mindig részhalmaza a képhalmaznak: <code className="bg-purple-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">R ⊆ B</code>.</div>
        </div>
        <div className="p-3 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
          <strong className="text-amber-700 dark:text-amber-300 block mb-1">Tiltott műveletek az értelmezési tartományban:</strong>
          <div>• <strong>Nullával való osztás tilos!</strong> Ha f(x) = k / x, akkor x ≠ 0.</div>
          <div>• Ha f(x) = 10 / (x - 3), akkor x - 3 ≠ 0, azaz x ≠ 3.</div>
        </div>
      </div>
    )
  },
  {
    title: '3. Kölcsönösen egyértelmű hozzárendelés',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-indigo-50 dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <strong className="text-indigo-700 dark:text-indigo-300 block mb-1">Bijekció (1 : 1 kapcsolat):</strong>
          <div>• Nemcsak minden bemenethez tartozik pontosan 1 kimenet, hanem visszafelé is: <strong>minden felvett értékhez pontosan 1 kiindulási elem tartozik</strong>.</div>
          <div>• Különböző bemenetek képe mindig különböző: ha <code className="bg-indigo-100 dark:bg-slate-800 px-1 py-0.5 rounded">x₁ ≠ x₂ ➔ f(x₁) ≠ f(x₂)</code>.</div>
          <div>• Példák: f(x) = 2x + 1 (1:1), diákok ➔ saját TAJ-számuk (1:1).</div>
          <div>• NEM 1:1: f(x) = x² (mert f(-2) = f(2) = 4).</div>
        </div>
      </div>
    )
  }
];

export const SetRelationsQuiz: React.FC<SetRelationsQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="1. Két halmaz közötti hozzárendelések Kvíz"
      subtitle="Gyakorold a halmazok közötti hozzárendelések, nyíldiagramok és a függvény fogalmát 30 feladaton keresztül!"
      topicId="g7-stats-relations"
      topicName="1. Két halmaz közötti hozzárendelések"
      badgeText="7. OSZTÁLY • HOZZÁRENDELÉSEK • 🎯 KVÍZ"
      themeColor="blue"
      questions={setRelationsQuestions}
      cheatSheets={setRelationsCheatSheets}
      pdfFilename="7_osztaly_hozzarendelesek_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<SetRelationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SetRelationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-blue-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-blue-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default SetRelationsQuiz;
