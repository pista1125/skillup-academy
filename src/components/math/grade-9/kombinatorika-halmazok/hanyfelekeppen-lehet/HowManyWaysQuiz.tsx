import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { HowManyWaysMatcher } from './HowManyWaysMatcher';
import { HowManyWaysSorter } from './HowManyWaysSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface HowManyWaysQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    name: '1. Szint: Alapok és Fadiagramok (Könnyű)',
    description: 'Egyszerű független döntések, öltözködési és menüválasztási feladatok, fadiagramok alapismeretei.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'hmq1-1',
        questionTypeBadge: 'Öltözködés és Fadiagram',
        question: 'Két nadrágunk (fekete, kék) és három pólónk (fehér, zöld, piros) van. Hányféle különböző összeállításban vehetjük fel őket?',
        options: ['5 féle', '6 féle', '8 féle', '9 féle'],
        correctAnswer: 1,
        hint: 'Minden nadrághoz bármelyik póló felvehető (független döntések).',
        explanation: 'A szorzási szabály értelmében, ha az első döntést 2-féleképpen (nadrág), a másodikat pedig 3-féleképpen (póló) hozhatjuk meg, akkor az összeállítások száma 2 · 3 = 6.',
        figure: (
          <svg viewBox="0 0 200 90" className="w-52 h-20">
            <rect x="15" y="12" width="42" height="28" rx="6" fill="#1e293b" />
            <text x="36" y="30" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">Fekete N.</text>
            <rect x="15" y="48" width="42" height="28" rx="6" fill="#2563eb" />
            <text x="36" y="66" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">Kék N.</text>
            <path d="M57 26 L120 18 M57 26 L120 44 M57 26 L120 70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M57 62 L120 18 M57 62 L120 44 M57 62 L120 70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="120" y="6" width="65" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="152" y="21" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">Fehér póló</text>
            <rect x="120" y="33" width="65" height="22" rx="5" fill="#10b981" />
            <text x="152" y="48" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Zöld póló</text>
            <rect x="120" y="60" width="65" height="22" rx="5" fill="#ef4444" />
            <text x="152" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Piros póló</text>
          </svg>
        )
      },
      {
        id: 'hmq1-2',
        questionTypeBadge: 'Étlap és Menü',
        question: 'Egy étterem napi menüjében 2-féle leves és 4-féle főétel közül választhatunk egy levest és egy főételt. Hányféle 2-fogásos menüt állíthatunk össze?',
        options: ['6 féle', '8 féle', '12 féle', '16 féle'],
        correctAnswer: 1,
        hint: 'Egy levest ÉS egy főételt választunk, a szorzási szabály érvényes.',
        explanation: 'Mindkét levest 4 különböző főétellel párosíthatjuk, így a lehetséges 2-fogásos menük száma 2 · 4 = 8.'
      },
      {
        id: 'hmq1-3',
        questionTypeBadge: 'Fagylaltrendelés',
        question: 'Egy fagyizóban 5-féle gombóc és 2-féle tölcsér kapható. Hányféleképpen kérhetünk egyetlen gombóc fagyit egy tölcsérben?',
        options: ['7 féle', '10 féle', '25 féle', '15 féle'],
        correctAnswer: 1,
        hint: 'A tölcsér fajtája és az íz két független döntés.',
        explanation: 'A tölcsér kiválasztása 2 lehetőség, a fagylalt ízének kiválasztása 5 lehetőség. Együttesen: 2 · 5 = 10 féle rendelés lehetséges.'
      },
      {
        id: 'hmq1-4',
        questionTypeBadge: 'Érmefeldobás',
        question: 'Hányféle kimenetele lehet két szabályos pénzérme egyidejű feldobásának (Fej = F, Írás = Í)?',
        options: ['2 kimenetel', '4 kimenetel', '6 kimenetel', '8 kimenetel'],
        correctAnswer: 1,
        hint: 'Mindkét érme kétféle állapotban állhat meg (F vagy Í).',
        explanation: 'Az első érme 2-féle (F vagy Í), a második érme szintén 2-féle lehet. Így 2 · 2 = 4 kimenetel létezik: FF, FÍ, ÍF, ÍÍ.',
        figure: (
          <svg viewBox="0 0 180 80" className="w-48 h-20">
            <circle cx="45" cy="38" r="24" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <text x="45" y="44" fill="#78350f" fontSize="14" fontWeight="bold" textAnchor="middle">1. Érme</text>
            <text x="90" y="44" fill="#64748b" fontSize="18" fontWeight="bold" textAnchor="middle">×</text>
            <circle cx="135" cy="38" r="24" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <text x="135" y="44" fill="#78350f" fontSize="14" fontWeight="bold" textAnchor="middle">2. Érme</text>
            <text x="45" y="74" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">(F vagy Í)</text>
            <text x="135" y="74" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">(F vagy Í)</text>
          </svg>
        )
      },
      {
        id: 'hmq1-5',
        questionTypeBadge: 'Kockadobás',
        question: 'Hányféle különböző kimenetel lehetséges egyetlen szabályos, hatoldalú dobókocka feldobásakor?',
        options: ['6 kimenetel', '12 kimenetel', '36 kimenetel', '8 kimenetel'],
        correctAnswer: 0,
        hint: 'A dobókocka lapjain 1-től 6-ig szerepelnek a pöttyök.',
        explanation: 'A hat lap mindegyike egy-egy lehetséges kimenetelt jelent: {1, 2, 3, 4, 5, 6}, ez összesen pontosan 6 kimenetel.'
      },
      {
        id: 'hmq1-6',
        questionTypeBadge: 'Párosítás',
        question: 'Egy iskolai versenyen 3 fiú és 4 lány indul. Hányféle vegyes páros (pontosan 1 fiú és 1 lány) alakítható ki közülük?',
        options: ['7 féle', '12 féle', '14 féle', '24 féle'],
        correctAnswer: 1,
        hint: 'A fiú és a lány kiválasztása egymástól független.',
        explanation: 'A fiút 3-féleképpen, a lányt 4-féleképpen választhatjuk ki, így 3 · 4 = 12 különböző vegyes páros hozható létre.'
      },
      {
        id: 'hmq1-7',
        questionTypeBadge: 'Összeadási Szabály',
        question: 'Egy büfében 3 féle üdítő és 2 féle ásványvíz kapható. Hányféleképpen választhatunk ki EGYETLEN italt?',
        options: ['5 féle', '6 féle', '8 féle', '1 féle'],
        correctAnswer: 0,
        hint: 'Figyelj! Vagy üdítőt, vagy vizet választunk, nem mindkettőt!',
        explanation: 'Mivel csak egyetlen italt veszünk, a két lehetőség egymást kizárja (VAGY kapcsolat). Az összeadási szabály alapján: 3 + 2 = 5 lehetőség van.'
      },
      {
        id: 'hmq1-8',
        questionTypeBadge: 'Útvonalhálózat',
        question: 'A városból B-be 3 különböző út vezet, B-ből C-be pedig 2 különböző út. Hányféleképpen juthatunk el A-ból C-be B-n keresztül?',
        options: ['5 úton', '6 úton', '8 úton', '9 úton'],
        correctAnswer: 1,
        hint: 'Mindegyik A-B útszakaszhoz bármelyik B-C útszakasz választható.',
        explanation: 'Az A-ból B-be vezető 3 út mindegyikéhez 2 folytatás választható B-ből C-be, így a teljes útvonalak száma 3 · 2 = 6.',
        figure: (
          <svg viewBox="0 0 220 90" className="w-56 h-20">
            <circle cx="28" cy="45" r="14" fill="#3b82f6" />
            <text x="28" y="50" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
            <circle cx="110" cy="45" r="14" fill="#10b981" />
            <text x="110" y="50" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
            <circle cx="192" cy="45" r="14" fill="#8b5cf6" />
            <text x="192" y="50" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
            <path d="M28 31 Q69 12 110 31" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <path d="M42 45 L96 45" stroke="#3b82f6" strokeWidth="2" />
            <path d="M28 59 Q69 78 110 59" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <text x="69" y="16" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">3 út</text>
            <path d="M110 31 Q151 18 192 31" fill="none" stroke="#a78bfa" strokeWidth="2" />
            <path d="M110 59 Q151 72 192 59" fill="none" stroke="#a78bfa" strokeWidth="2" />
            <text x="151" y="20" fill="#6d28d9" fontSize="9" fontWeight="bold" textAnchor="middle">2 út</text>
          </svg>
        )
      },
      {
        id: 'hmq1-9',
        question: 'Egy fadiagram gyökeréből 3 főág indul, és minden egyes főágból 4 újabb alág ágazik el. Hány végpontja (levele) van a fadiagramnak?',
        options: ['7', '12', '15', '16'],
        correctAnswer: 1,
        hint: 'A levelek száma a főágak és az alágak számának szorzata.',
        explanation: 'Mind a 3 főág 4-felé ágazik tovább, így a levelek (azaz a kimenetelek) száma 3 · 4 = 12.'
      },
      {
        id: 'hmq1-10',
        question: 'Egy 4 kérdésből álló igaz/hamis tesztlapon hányféle különböző módon tölthető ki a válaszok sora?',
        options: ['8 módon', '16 módon', '24 módon', '32 módon'],
        correctAnswer: 1,
        hint: 'Minden egyes kérdésre 2 lehetőség van (Igaz vagy Hamis).',
        explanation: 'Mind a 4 kérdésre egymástól függetlenül 2 választás lehetséges, ezért a kitöltések száma 2 · 2 · 2 · 2 = 2⁴ = 16.'
      }
    ]
  },
  2: {
    name: '2. Szint: Szorzási és Összeadási Szabály (Közepes)',
    description: 'Számjegyek alkotása, PIN kódok, sorbarendezések és kockadobások szisztematikus vizsgálata.',
    passingScore: 7,
    timeLimit: 720,
    questions: [
      {
        id: 'hmq2-1',
        question: 'Hány olyan kétjegyű szám készíthető az {1, 2, 3, 4, 5} számjegyekből, amelyben a jegyek KÜLÖNBÖZŐEK?',
        options: ['25 darab', '20 darab', '15 darab', '10 darab'],
        correctAnswer: 1,
        hint: 'Az első helyre 5 számjegy kerülhet, a második helyre már csak a maradék 4.',
        explanation: 'A tízesek helyére az 5 számjegy bármelyike kerülhet (5 lehetőség). Mivel a jegyek nem ismétlődhetnek, az egyesek helyére már csak 4 számjegy maradt. Így 5 · 4 = 20 szám képezhető.'
      },
      {
        id: 'hmq2-2',
        question: 'Hány olyan kétjegyű szám van, amely csak az {1, 2, 3, 4, 5} számjegyeket tartalmazza, ha a számjegyek ISMÉTLŐDHETNEK is?',
        options: ['20 darab', '25 darab', '30 darab', '32 darab'],
        correctAnswer: 1,
        hint: 'Mindkét helyiértékre mind az 5 számjegy beírható.',
        explanation: 'Mivel a számjegyek ismétlődhetnek (pl. 11, 22), mind a tízesek, mind az egyesek helyére 5 lehetőség van: 5 · 5 = 25 szám készíthető.'
      },
      {
        id: 'hmq2-3',
        question: 'Hányféle különböző kimenetele lehet két szabályos dobókocka egyidejű feldobásának?',
        options: ['12 kimenetel', '24 kimenetel', '36 kimenetel', '64 kimenetel'],
        correctAnswer: 2,
        hint: 'Az első kocka 6-féle, a második kocka szintén 6-féle értéket vehet fel.',
        explanation: 'A két kocka dobása rendezett számpárt alkot (pl. piros és fehér kocka). Mivel mindkét kockán 6 kimenetel lehet: 6 · 6 = 36 lehetséges dobáspár van.'
      },
      {
        id: 'hmq2-4',
        question: 'Hányféle 4-jegyű bankkártya PIN kód készíthető a 0-9 számjegyekből (az ismétlődés megengedett)?',
        options: ['10 000 kód', '9 000 kód', '5 040 kód', '1 000 kód'],
        correctAnswer: 0,
        hint: 'Minden pozícióra 10 számjegy (0-tól 9-ig) kerülhet, akár a 0 is lehet elöl (pl. 0123).',
        explanation: 'Mivel a PIN kód kezdődhet nullával is, és mind a 4 helyiértékre 10 jegy kerülhet: 10 · 10 · 10 · 10 = 10⁴ = 10 000 különböző PIN kód létezik (0000-tól 9999-ig).'
      },
      {
        id: 'hmq2-5',
        questionTypeBadge: 'Megkötéses Számalkotás',
        question: 'Hány olyan háromjegyű szám képezhető a {0, 1, 2, 3} számjegyekből, amelyben minden számjegy KÜLÖNBÖZŐ?',
        options: ['24 darab', '18 darab', '12 darab', '16 darab'],
        correctAnswer: 1,
        hint: 'Vigyázz! Háromjegyű szám nem kezdődhet 0-val!',
        explanation: 'Az első helyre (százasok) a 0 nem kerülhet, így ott 3 lehetőség van (1, 2 vagy 3). A második helyre a maradék 3 számjegy (már a 0 is bejöhet), a harmadikra pedig 2 jegy maradt. Tehát: 3 · 3 · 2 = 18 darab szám készíthető.',
        figure: (
          <svg viewBox="0 0 210 80" className="w-56 h-20">
            <rect x="12" y="14" width="50" height="52" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
            <text x="37" y="36" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">Százas</text>
            <text x="37" y="54" fill="#dc2626" fontSize="12" fontWeight="black" textAnchor="middle">3 db (≠0)</text>

            <text x="74" y="44" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>

            <rect x="84" y="14" width="50" height="52" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
            <text x="109" y="36" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">Tízes</text>
            <text x="109" y="54" fill="#16a34a" fontSize="12" fontWeight="black" textAnchor="middle">3 db</text>

            <text x="146" y="44" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>

            <rect x="156" y="14" width="46" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="179" y="36" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">Egyes</text>
            <text x="179" y="54" fill="#2563eb" fontSize="12" fontWeight="black" textAnchor="middle">2 db</text>
          </svg>
        )
      },
      {
        id: 'hmq2-6',
        question: 'Három jóbarát (Anna, Béla, Cili) moziba megy, és egy három fős üléssorba ülnek le. Hányféle különböző ülésrendjük lehet?',
        options: ['3 féle', '6 féle', '9 féle', '12 féle'],
        correctAnswer: 1,
        hint: 'Az első székre még 3-an, a másodikra 2-en, a harmadikra 1-en ülhetnek.',
        explanation: 'Az első székre 3 ember közül választhatunk, a másodikra a maradék 2 közül, a harmadikra 1 személy marad. Ez 3 · 2 · 1 = 6 különböző ülésrend.'
      },
      {
        id: 'hmq2-7',
        question: 'Egy 10 fős futóverseny döntőjében hányféleképpen alakulhat a dobogósok (arany, ezüst, bronz érmesek) sorrendje?',
        options: ['720 féleképpen', '120 féleképpen', '504 féleképpen', '1 000 féleképpen'],
        correctAnswer: 0,
        hint: 'Aranyérmes 10 ember közül kerülhet ki, ezüstérmes a maradék 9-ből, bronzérmes a maradék 8-ból.',
        explanation: 'A sorrend számít: az aranyérmet 10, az ezüstöt 9, a bronzot 8 futó nyerheti el. Így a dobogó kiosztása 10 · 9 · 8 = 720-féleképpen lehetséges.'
      },
      {
        id: 'hmq2-8',
        question: 'Egy diák a könyvtárból vagy egy természettudományi könyvet (15 db elérhető), vagy egy történelmi könyvet (12 db elérhető) szeretne kölcsönözni. Hányféleképpen választhat egyetlen könyvet?',
        options: ['180 féleképpen', '27 féleképpen', '30 féleképpen', '150 féleképpen'],
        correctAnswer: 1,
        hint: 'VAGY kapcsolat: a két kategória egymást kizárja.',
        explanation: 'Mivel egyetlen könyvet kölcsönöz a két független csoportból, az összeadási szabály érvényes: 15 + 12 = 27 választási lehetősége van.'
      },
      {
        id: 'hmq2-9',
        question: 'A-ból B-be 4 út vezet, B-ből C-be 3 út. Hányféleképpen tehetjük meg az A -> B -> C -> B -> A oda-vissza utat, ha tetszőleges utakon mehetünk?',
        options: ['144 úton', '12 úton', '24 úton', '48 úton'],
        correctAnswer: 0,
        hint: 'Odafelé és visszafelé is külön meg kell választani az utakat.',
        explanation: 'Odafelé A-ból C-be 4 · 3 = 12 útvonal van. Visszafelé C-ből A-ba szintén 3 · 4 = 12 útvonal van. A teljes oda-vissza út: 12 · 12 = 144 lehetőség.'
      },
      {
        id: 'hmq2-10',
        question: 'Hányféle kimenetele lehet 3 szabályos pénzérme egymás utáni feldobásának?',
        options: ['6 kimenetel', '8 kimenetel', '9 kimenetel', '12 kimenetel'],
        correctAnswer: 1,
        hint: 'Mindhárom dobásnál 2 lehetőség van: 2 · 2 · 2.',
        explanation: 'Minden érmedobás 2-féle eredményt adhat (Fej vagy Írás). A 3 független dobás együttes kimeneteleinek száma: 2 · 2 · 2 = 2³ = 8.'
      }
    ]
  },
  3: {
    name: '3. Szint: Összetett és Feltételes Feladatok (Haladó)',
    description: 'Paritási megkötések, komplementer módszer, kizáró utak és összetett esetszétválasztások.',
    passingScore: 7,
    timeLimit: 900,
    questions: [
      {
        id: 'hmq3-1',
        questionTypeBadge: 'Páros Számok Képzése',
        question: 'Hány darab háromjegyű PÁROS szám képezhető az {1, 2, 3, 4, 5} számjegyekből, ha a számjegyek NEM ismétlődhetnek?',
        options: ['12 darab', '24 darab', '36 darab', '48 darab'],
        correctAnswer: 1,
        hint: 'Kezdd az utolsó jeggyel: a párosság miatt csak 2 vagy 4 lehet!',
        explanation: 'Az utolsó helyre csak a 2 vagy a 4 kerülhet (2 lehetőség). Ekkor 4 számjegy maradt: az első helyre 4, a középsőre 3 jegyből választhatunk. Így: 4 · 3 · 2 = 24 darab páros szám készíthető.',
        figure: (
          <svg viewBox="0 0 210 80" className="w-56 h-20">
            <rect x="12" y="14" width="48" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="36" y="36" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">1. hely</text>
            <text x="36" y="54" fill="#2563eb" fontSize="12" fontWeight="black" textAnchor="middle">4 db</text>

            <text x="72" y="44" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>

            <rect x="82" y="14" width="48" height="52" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="106" y="36" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">2. hely</text>
            <text x="106" y="54" fill="#475569" fontSize="12" fontWeight="black" textAnchor="middle">3 db</text>

            <text x="142" y="44" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>

            <rect x="152" y="14" width="48" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="176" y="36" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">Páros!</text>
            <text x="176" y="54" fill="#d97706" fontSize="11" fontWeight="black" textAnchor="middle">2 db (2,4)</text>
          </svg>
        )
      },
      {
        id: 'hmq3-2',
        question: 'Hány olyan háromjegyű szám készíthető a {0, 1, 2, 3, 4, 5} jegyekből, amelyben a jegyek KÜLÖNBÖZŐEK és a szám 5-tel osztható?',
        options: ['20 darab', '36 darab', '40 darab', '48 darab'],
        correctAnswer: 1,
        hint: 'Bontsd 2 esetre: a szám 0-ra végződik VAGY 5-re végződik!',
        explanation: '1. eset: A szám 0-ra végződik. Ekkor az első helyre az {1,2,3,4,5} bármelyike kerülhet (5), a másodikra a maradék 4 jegy: 5 · 4 · 1 = 20 szám. 2. eset: A szám 5-re végződik. Ekkor az első helyre a 0 nem mehet (csak 1,2,3,4), azaz 4 lehetőség; a második helyre a maradék 4 jegy (már a 0 is): 4 · 4 · 1 = 16 szám. Összesen: 20 + 16 = 36 darab.'
      },
      {
        id: 'hmq3-3',
        question: 'Hány darab háromjegyű pozitív egész szám van a tízes számrendszerben, amelynek MINDEN számjegye PÁRATLAN?',
        options: ['125 darab', '60 darab', '100 darab', '250 darab'],
        correctAnswer: 0,
        hint: 'A páratlan számjegyek: {1, 3, 5, 7, 9} (összesen 5 darab).',
        explanation: 'A páratlan jegyek halmaza 5 elemű. Mivel nincs megkötés az ismétlődésre, a százasok, tízesek és egyesek helyére is 5 jegy kerülhet: 5 · 5 · 5 = 125 ilyen szám van.'
      },
      {
        id: 'hmq3-4',
        question: 'A-ból B-be 3 út vezet, B-ből C-be 4 út vezet. Hányféleképpen tehetjük meg az A -> B -> C -> B -> A utat úgy, hogy visszafelé egyik szakaszon SEM haladunk azon az úton, amelyen odafelé mentünk?',
        options: ['144 úton', '72 úton', '48 úton', '36 úton'],
        correctAnswer: 1,
        hint: 'Visszafelé mindkét szakaszon 1-gyel kevesebb útból választhatunk.',
        explanation: 'Odafelé A-ból C-be 3 · 4 = 12 útvonal van. Visszafelé C-ből B-be a használt út kiesik, így 3 út marad; B-ből A-ba szintén kiesik a használt út, így 2 út marad (3 · 2 = 6 út visszafelé). Összesen: 12 · 6 = 72 lehetséges oda-vissza út.'
      },
      {
        id: 'hmq3-5',
        question: 'Hány olyan kétjegyű pozitív egész szám van, amelynek a számjegyeinek összege PÁROS?',
        options: ['45 darab', '50 darab', '40 darab', '36 darab'],
        correctAnswer: 0,
        hint: 'Két szám összege akkor páros, ha mindkettő páros VAGY mindkettő páratlan.',
        explanation: '1. eset: Mindkét számjegy páros. Az első helyre {2,4,6,8} (4 db), a másodikra {0,2,4,6,8} (5 db): 4 · 5 = 20 szám. 2. eset: Mindkét számjegy páratlan. Az elsőre {1,3,5,7,9} (5 db), a másodikra {1,3,5,7,9} (5 db): 5 · 5 = 25 szám. Összesen: 20 + 25 = 45 darab.'
      },
      {
        id: 'hmq3-6',
        question: 'Négy fiú és négy lány szeretne egymás mellé ülni egy 8 fős padra úgy, hogy a fiúk és a lányok FELVÁLTVA üljenek. Hányféle ülésrend lehetséges?',
        options: ['576 féle', '1 152 féle', '40 320 féle', '2 304 féle'],
        correctAnswer: 1,
        hint: 'Kétféle ülésminta van: F-L-F-L-F-L-F-L vagy L-F-L-F-L-F-L-F.',
        explanation: 'Ha fiúval kezdünk (F-L-F-L-F-L-F-L), a 4 fiú 4! = 24, a 4 lány szintén 4! = 24 féleképpen ülhet le: 24 · 24 = 576 ülésrend. Ugyanennyi van, ha lánnyal kezdünk (576). Összesen: 576 + 576 = 1152 féle ülésrend létezik.'
      },
      {
        id: 'hmq3-7',
        question: 'Két szabályos dobókockával dobunk egyszerre. Hányféle kimenetel esetén lesz a dobott számok összege LEGALÁBB 10?',
        options: ['4 kimenetel', '6 kimenetel', '8 kimenetel', '10 kimenetel'],
        correctAnswer: 1,
        hint: 'Számold össze azokat a párokat, amelyek összege 10, 11 vagy 12!',
        explanation: 'Összeg = 10: (4;6), (5;5), (6;4) &rarr; 3 eset. Összeg = 11: (5;6), (6;5) &rarr; 2 eset. Összeg = 12: (6;6) &rarr; 1 eset. Összesen 3 + 2 + 1 = 6 kedvező kimenetel van.'
      },
      {
        id: 'hmq3-8',
        question: 'Egy 6 fős baráti társaságban mindenki mindenkivel pontosan egyszer kezet fog. Hány kézfogás történik összesen?',
        options: ['30 kézfogás', '15 kézfogás', '12 kézfogás', '36 kézfogás'],
        correctAnswer: 1,
        hint: 'Mindenki 5 emberrel fog kezet, de egy kézfogásban 2 ember vesz részt.',
        explanation: 'Az első ember 5 kézfogást végez, a második már csak 4 új emberrel fog kezet, és így tovább: 5 + 4 + 3 + 2 + 1 = 15 kézfogás. (Vagy képlettel: (6 · 5) / 2 = 15).'
      },
      {
        id: 'hmq3-9',
        question: 'Egy biciklizár 3 forgótárcsából áll (mindegyiken a 0-9 jegyek találhatók). Hány olyan kód állítható be, amelyben van LEGALÁBB EGY 7-es számjegy?',
        options: ['100 kód', '271 kód', '300 kód', '243 kód'],
        correctAnswer: 1,
        hint: 'Alkalmazd a komplementer elvet: Összes kód mínusz azok, amikben EGYÁLTALÁN NINCS 7-es!',
        explanation: 'Az összes kód száma: 10³ = 1000. Azok a kódok, amelyekben egyáltalán nem szerepel 7-es (csak a maradék 9 jegyből állnak): 9³ = 729. Így legalább egy 7-est tartalmazó kód: 1000 - 729 = 271 darab van.'
      },
      {
        id: 'hmq3-10',
        question: 'Hány olyan 4-jegyű szám készíthető az {1, 2, 3, 4, 5, 6} számjegyekből (ismétlődés nélkül), amely 4000-nél NAGYOBB?',
        options: ['120 darab', '180 darab', '240 darab', '360 darab'],
        correctAnswer: 1,
        hint: 'A szám akkor nagyobb 4000-nél, ha az ezresek helyén 4, 5 vagy 6 áll.',
        explanation: 'Az ezresek helyére a 4, 5 vagy 6 számjegy kerülhet (3 lehetőség). Ekkor 5 jegy marad a százasok helyére, 4 a tízesekére, és 3 az egyesekére. Tehát: 3 · 5 · 4 · 3 = 180 darab szám képezhető.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-mult',
    title: 'Szorzási Szabály (Multiplikatív elv)',
    description: 'Független döntések egymás után (ÉS kapcsolat):',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p className="font-bold text-blue-600 dark:text-blue-400">
          Összes kimenetel = n₁ · n₂ · ... · nₖ
        </p>
        <p>Ha az 1. döntést n₁-féleképpen, a 2. döntést tőle függetlenül n₂-féleképpen hozhatjuk meg, akkor a döntéspár n₁ · n₂-féleképpen választható meg.</p>
        <p className="text-[11px] text-slate-500">Példa: 2 nadrág és 3 ing = 2 · 3 = 6 öltözet.</p>
      </div>
    )
  },
  {
    id: 'cs-add',
    title: 'Összeadási Szabály (Additív elv)',
    description: 'Egymást kizáró alternatívák (VAGY kapcsolat):',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p className="font-bold text-emerald-600 dark:text-emerald-400">
          Összes kimenetel = n₁ + n₂ + ... + nₘ
        </p>
        <p>Csak akkor adható össze, ha a lehetőségek páronként kizárják egymást (nincs átfedés)!</p>
        <p className="text-[11px] text-slate-500">Példa: Szegedre 3 vonat VAGY 4 busz = 3 + 4 = 7 utazási mód.</p>
      </div>
    )
  },
  {
    id: 'cs-tree',
    title: 'Fadiagram (Döntési Fa)',
    description: 'A lehetőségek vizuális felrajzolása:',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Gyökér:</strong> A kiinduló állapot.</li>
          <li><strong>Szintek:</strong> Az egymást követő döntési lépések.</li>
          <li><strong>Levelek:</strong> A végpontok, amelyek száma az összes lehetséges kimenetelt adja.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'cs-numbers',
    title: 'Számképzés Aranyszabályai',
    description: 'Helyiértékek és a nulla (0) kezelése:',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>1. A 0 nem állhat az élen:</strong> Háromjegyű szám nem kezdődhet 0-val!</p>
        <p><strong>2. Ismétlés nélkül:</strong> A választható jegyek száma lépésről lépésre 1-gyel fogy: n · (n-1) · (n-2)...</p>
        <p><strong>3. Paritás / oszthatóság:</strong> A feladatot mindig a kötött helyiértékkel (pl. utolsó jegy) kezdjük vizsgálni!</p>
      </div>
    )
  }
];

export const HowManyWaysQuiz: React.FC<HowManyWaysQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Hányféleképpen lehet? Kvíz"
      subtitle="Szisztematikus felsorolás, fadiagramok, szorzási és összeadási szabály 30 válogatott feladatban"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 KVÍZ"
      themeColor="blue"
      levelConfigs={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Kombinatorika Segédlet & Képlettár"
      grade={9}
      chapterId="kombinatorika-halmazok"
      topicId="g9-komb-hanyfelekeppen-quiz"
      topicTitle="Hányféleképpen lehet?"
      emoji="🎲"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a feladatokat és a helyes számításokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Egyszerű Szabályok',
              subtitle: 'Párosítsd a döntési helyzeteket a számításokkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapok'
            },
            2: {
              title: '2. Szint: Számjegyek és Kódok Számítása',
              subtitle: 'Számképzés, PIN kódok és kockadobások',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Kódok'
            },
            3: {
              title: '3. Szint: Összetett és Feltételes Feladatok',
              subtitle: 'Paritási feltételek és összetett döntések',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <HowManyWaysMatcher
              key={`how-many-ways-matcher-${level}`}
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
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a feladatokat és szabályokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Szorzási vs. Összeadási vs. Mindkettő',
              subtitle: 'Döntsd el, melyik szabály érvényes a feladatra!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Szabályok'
            },
            2: {
              title: '2. Szint: Ismétlés Megengedett vs. Nélküli vs. Kötött',
              subtitle: 'Rendszerezd a feltételeket és szabadsági fokokat!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Feltételek'
            },
            3: {
              title: '3. Szint: Eredmények Nagyságrendje',
              subtitle: 'Kevés (≤10) vs. Közepes (11-100) vs. Sok (>100)',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Nagyságrend'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <HowManyWaysSorter
              key={`how-many-ways-sorter-${level}`}
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
      onBack={onBack || (() => {})}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default HowManyWaysQuiz;
