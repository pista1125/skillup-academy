import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LocksMatcher } from './LocksMatcher';
import { LocksSorter } from './LocksSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface LocksQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    name: '1. Szint: Számzárak és Alapvető Kódok (Könnyű)',
    description: 'Bőröndzárak, 4-jegyű PIN kódok, kapcsolók, bináris bájtok és az n^k képlet alapismeretei.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'lq1-1',
        questionTypeBadge: 'Számzár Modell',
        question: 'Egy bőrönd lakatján 3 forgatható tárcsa van, mindegyiken a 0-tól 9-ig terjedő számjegyekkel. Hány különböző kód állítható be?',
        options: ['1 000 kód', '900 kód', '720 kód', '30 kód'],
        correctAnswer: 0,
        hint: 'Mindhárom tárcsán 10 számjegy állítható be, az ismétlődés szabad.',
        explanation: 'A szorzási szabály szerint az első tárcsán 10, a másodikon 10, a harmadikon szintén 10 lehetőség van: 10 · 10 · 10 = 10³ = 1000 különböző kód (000-tól 999-ig).',
        figure: (
          <svg viewBox="0 0 220 90" className="w-56 h-20">
            <rect x="20" y="10" width="180" height="70" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <rect x="35" y="22" width="38" height="46" rx="6" fill="#334155" stroke="#94a3b8" />
            <text x="54" y="50" fill="#f59e0b" fontSize="16" fontWeight="black" textAnchor="middle">0..9</text>
            <rect x="91" y="22" width="38" height="46" rx="6" fill="#334155" stroke="#94a3b8" />
            <text x="110" y="50" fill="#f59e0b" fontSize="16" fontWeight="black" textAnchor="middle">0..9</text>
            <rect x="147" y="22" width="38" height="46" rx="6" fill="#334155" stroke="#94a3b8" />
            <text x="166" y="50" fill="#f59e0b" fontSize="16" fontWeight="black" textAnchor="middle">0..9</text>
            <line x1="25" y1="45" x2="195" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        )
      },
      {
        id: 'lq1-2',
        questionTypeBadge: 'Banki PIN Kód',
        question: 'Hányféle 4-jegyű bankkártya PIN kód készíthető a 0–9 számjegyekből, ha a számjegyek ismétlődhetnek?',
        options: ['10 000 kód', '9 000 kód', '5 040 kód', '1 000 kód'],
        correctAnswer: 0,
        hint: 'Minden mezőbe 10 számjegy kerülhet: 10 · 10 · 10 · 10.',
        explanation: 'Mivel mind a 4 pozícióra 10 számjegy közül választhatunk egymástól függetlenül: 10 · 10 · 10 · 10 = 10⁴ = 10 000 kód létezik (0000-tól 9999-ig).',
        figure: (
          <svg viewBox="0 0 240 75" className="w-56 h-18">
            <rect x="10" y="10" width="46" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="33" y="42" fill="#b45309" fontSize="15" fontWeight="black" textAnchor="middle">10</text>
            <text x="68" y="42" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
            <rect x="80" y="10" width="46" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="103" y="42" fill="#b45309" fontSize="15" fontWeight="black" textAnchor="middle">10</text>
            <text x="138" y="42" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
            <rect x="150" y="10" width="46" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="173" y="42" fill="#b45309" fontSize="15" fontWeight="black" textAnchor="middle">10</text>
            <text x="208" y="42" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
            <rect x="220" y="10" width="46" height="52" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
            <text x="243" y="42" fill="#b45309" fontSize="15" fontWeight="black" textAnchor="middle">10</text>
          </svg>
        )
      },
      {
        id: 'lq1-3',
        questionTypeBadge: 'Szabályértelmezés',
        question: 'Egy 4-jegyű PIN kód kezdődhet-e 0-val (például a 0421 érvényes kód-e)?',
        options: [
          'Igen, a kódoknál a 0 is érvényes első karakter',
          'Nem, mert a 0-val kezdődő számok háromjegyűek',
          'Csak akkor, ha utána páros szám áll',
          'Nem, az ATM elutasítja a 0-val kezdődő kódot'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a PIN kódok lényegére: ez egy karaktersorozat, nem matematikai egész szám.',
        explanation: 'A PIN kód vagy számzár egy szimbólumsorozat (kód), ahol a 0000 vagy a 0421 teljes értékű 4-jegyű kód!'
      },
      {
        id: 'lq1-4',
        questionTypeBadge: 'Kapcsolók Állapota',
        question: 'Egy kapcsolótáblán 5 darab kétállású (Ki/Be) kapcsoló van egymás mellett. Hányféle különböző beállítás lehetséges?',
        options: ['32 beállítás', '10 beállítás', '25 beállítás', '64 beállítás'],
        correctAnswer: 0,
        hint: 'Minden kapcsolónak 2 állapota van, a kapcsolók száma 5: 2⁵.',
        explanation: 'Mind az 5 kapcsoló 2-féleképpen állhat, egymástól függetlenül: 2 · 2 · 2 · 2 · 2 = 2⁵ = 32 különböző beállítási minta lehetséges.',
        figure: (
          <svg viewBox="0 0 220 70" className="w-52 h-16">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${15 + i * 40}, 15)`}>
                <rect x="0" y="0" width="30" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
                <rect x="4" y={i % 2 === 0 ? 4 : 20} width="22" height="18" rx="4" fill="#3b82f6" />
                <text x="15" y={i % 2 === 0 ? 16 : 32} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  {i % 2 === 0 ? 'BE' : 'KI'}
                </text>
              </g>
            ))}
          </svg>
        )
      },
      {
        id: 'lq1-5',
        questionTypeBadge: 'Szűkített Elemkészlet',
        question: 'Egy 3-tárcsás számzár tárcsáin csak a {1, 2, 3, 4} számok szerepelnek. Hányféle kód állítható be?',
        options: ['64 kód', '12 kód', '81 kód', '24 kód'],
        correctAnswer: 0,
        hint: 'Itt n = 4 és k = 3: 4 · 4 · 4.',
        explanation: 'Minden tárcsán 4 választási lehetőség van, így 4 · 4 · 4 = 4³ = 64 különböző kód készíthető.'
      },
      {
        id: 'lq1-6',
        questionTypeBadge: 'Ismétlés Nélkül',
        question: 'Hányféle 3-jegyű kód készíthető a 0–9 számjegyekből, ha egyetlen számjegy SEM ismétlődhet?',
        options: ['720 kód', '1 000 kód', '900 kód', '504 kód'],
        correctAnswer: 0,
        hint: '1. hely: 10, 2. hely: 9, 3. hely: 8 lehetőség.',
        explanation: 'Az első pozícióra 10 jegy mehet (a 0 is). A másodikra 9, a harmadikra 8 maradt: 10 · 9 · 8 = 720 különböző kód létezik.'
      },
      {
        id: 'lq1-7',
        questionTypeBadge: 'Kódkapacitás Növekedés',
        question: 'Egy 4 tárcsás számzárral hányszor több kód állítható be, mint egy 3 tárcsással (mindkettő 0–9 jegyeket használ)?',
        options: ['10-szer több', '4-szer több', '1 000-szer több', '2-szer több'],
        correctAnswer: 0,
        hint: '10⁴ = 10 000, míg 10³ = 1 000. Hányszorosa a 10 000 az 1 000-nek?',
        explanation: 'Mivel 10⁴ / 10³ = 10, minden egyes plusz tárcsa pontosan 10-szerezi a lehetséges kódok számát!'
      },
      {
        id: 'lq1-8',
        questionTypeBadge: 'Bináris Kódok',
        question: 'Egy 8 bites bináris bájt minden bitje 0 vagy 1 lehet. Hány különböző értéket képes felvenni egy bájt?',
        options: ['256 értéket', '128 értéket', '64 értéket', '512 értéket'],
        correctAnswer: 0,
        hint: '8 független pozíció, mindegyiken 2 lehetőség: 2⁸.',
        explanation: 'Mivel 8 pozíció van és mindegyik 2 állapotú: 2⁸ = 256 különböző érték kódolható egy bájton (0-tól 255-ig).'
      },
      {
        id: 'lq1-9',
        questionTypeBadge: 'Kétjegyű Kódok',
        question: 'Hány olyan 4-jegyű kód létezik, amelyben kizárólag az {1, 2} számjegyek szerepelhetnek?',
        options: ['16 kód', '8 kód', '24 kód', '32 kód'],
        correctAnswer: 0,
        hint: 'n = 2 és k = 4: 2⁴.',
        explanation: 'Mind a 4 pozícióra egymástól függetlenül 2 választás van: 2 · 2 · 2 · 2 = 2⁴ = 16 kód.'
      },
      {
        id: 'lq1-10',
        questionTypeBadge: 'Képletfelismerés',
        question: 'Melyik képlettel számoljuk ki a k hosszúságú, n elemű ábécéből képezhető ismétléses kódok számát?',
        options: ['n^k', 'k^n', 'n · k', 'n! / k!'],
        correctAnswer: 0,
        hint: 'Gondolj a 3-tárcsás számzárra: 10³ (itt n = 10 és k = 3).',
        explanation: 'Az ismétléses variáció képlete: V_n^{k, ism} = n^k, ahol n az alapelemek száma, k pedig a helyek (tárcsák) száma.'
      }
    ]
  },
  2: {
    name: '2. Szint: Megkötéses Számalkotás és Rendszámok (Közepes)',
    description: 'Valódi számok a tízes számrendszerben, paritási megkötések és a magyar rendszámok kombinatorikája.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'lq2-1',
        questionTypeBadge: 'Valódi Számok',
        question: 'Hány darab valódi háromjegyű pozitív egész szám létezik a tízes számrendszerben?',
        options: ['900 darab', '1 000 darab', '899 darab', '720 darab'],
        correctAnswer: 0,
        hint: 'A százasok helyére a 0 nem kerülhet (9 lehetőség: 1-től 9-ig).',
        explanation: 'A százasok helyére 9 jegy (1..9), a tízesekre 10, az egyesekre 10 jegy mehet: 9 · 10 · 10 = 900 darab (100-tól 999-ig).',
        figure: (
          <svg viewBox="0 0 210 75" className="w-52 h-18">
            <rect x="10" y="10" width="50" height="52" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
            <text x="35" y="32" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">Százas</text>
            <text x="35" y="50" fill="#dc2626" fontSize="13" fontWeight="black" textAnchor="middle">9 db (≠0)</text>
            <text x="75" y="42" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
            <rect x="85" y="10" width="50" height="52" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
            <text x="110" y="32" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">Tízes</text>
            <text x="110" y="50" fill="#16a34a" fontSize="13" fontWeight="black" textAnchor="middle">10 db</text>
            <text x="150" y="42" fill="#94a3b8" fontSize="16" fontWeight="bold" textAnchor="middle">×</text>
            <rect x="160" y="10" width="46" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="183" y="32" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">Egyes</text>
            <text x="183" y="50" fill="#2563eb" fontSize="13" fontWeight="black" textAnchor="middle">10 db</text>
          </svg>
        )
      },
      {
        id: 'lq2-2',
        questionTypeBadge: 'Különböző Jegyek',
        question: 'Hány olyan háromjegyű szám készíthető a {0, 1, 2, 3, 4} jegyekből, amelyben minden számjegy KÜLÖNBÖZŐ?',
        options: ['48 darab', '60 darab', '125 darab', '36 darab'],
        correctAnswer: 0,
        hint: '1. helyre 0 nem mehet (4 db). 2. helyre a 0 visszajöhet (4 db). 3. helyre 3 db.',
        explanation: 'Az első helyre 4 jegy (1,2,3,4) kerülhet. A másodikra a maradék 3 + a 0 (4 jegy), a harmadikra a maradék 3 jegy. Így 4 · 4 · 3 = 48 szám alkotható.'
      },
      {
        id: 'lq2-3',
        questionTypeBadge: 'Régi Rendszámtábla',
        question: 'A régi magyar rendszám 3 betűből és 3 számból állt (pl. ABC-123). Hányféle ilyen rendszám készíthető 26 betű és 10 számjegy esetén?',
        options: ['17 576 000', '1 000 000', '26 000 000', '15 000 000'],
        correctAnswer: 0,
        hint: '3 betűs blokk: 26³, 3 számos blokk: 10³. Szorozd össze őket!',
        explanation: 'A betűs rész 26 · 26 · 26 = 17 576 lehetőség. A számos rész 10 · 10 · 10 = 1 000 lehetőség. Együttesen: 17 576 · 1 000 = 17 576 000 kombináció.',
        figure: (
          <svg viewBox="0 0 200 65" className="w-52 h-16">
            <rect x="10" y="8" width="180" height="48" rx="8" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <rect x="15" y="13" width="16" height="38" rx="2" fill="#1d4ed8" />
            <text x="23" y="36" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">H</text>
            <text x="75" y="38" fill="#0f172a" fontSize="16" fontWeight="black" fontFamily="monospace">ABC</text>
            <text x="110" y="36" fill="#64748b" fontSize="16" fontWeight="bold">-</text>
            <text x="145" y="38" fill="#0f172a" fontSize="16" fontWeight="black" fontFamily="monospace">123</text>
          </svg>
        )
      },
      {
        id: 'lq2-4',
        questionTypeBadge: 'Paritási Megkötés',
        question: 'Hány darab 3-jegyű PÁROS szám létezik a tízes számrendszerben (az ismétlődés megengedett)?',
        options: ['450 darab', '500 darab', '400 darab', '900 darab'],
        correctAnswer: 0,
        hint: '1. hely: 9, 2. hely: 10, 3. hely (páros: 0,2,4,6,8): 5.',
        explanation: 'Százasok: 9 (1..9), tízesek: 10, egyesek: 5 páros jegy (0, 2, 4, 6, 8). Így: 9 · 10 · 5 = 450 páros szám van.'
      },
      {
        id: 'lq2-5',
        questionTypeBadge: 'Oszthatóság Feltétel',
        question: 'Hány olyan 4-jegyű szám készíthető az {1, 2, 3, 4, 5, 6} jegyekből, amelyben a jegyek KÜLÖNBÖZŐEK és a szám 5-re végződik?',
        options: ['60 darab', '120 darab', '24 darab', '360 darab'],
        correctAnswer: 0,
        hint: 'Az utolsó hely rögzített (csak az 5-ös lehet, 1 lehetőség). Az első három helyre a maradék 5 számból választunk.',
        explanation: 'Az utolsó jegy rögzített: 1 lehetőség (az 5-ös). Ekkor 5 számjegy maradt: az 1. helyre 5, a 2. helyre 4, a 3. helyre 3 lehetőség van: 5 · 4 · 3 · 1 = 60 darab szám.'
      },
      {
        id: 'lq2-6',
        questionTypeBadge: 'Csupa Páratlan',
        question: 'Hány darab háromjegyű pozitív egész szám van, amelynek MINDEN számjegye PÁRATLAN?',
        options: ['125 darab', '60 darab', '100 darab', '250 darab'],
        correctAnswer: 0,
        hint: 'A páratlan jegyek: {1, 3, 5, 7, 9} (5 darab). Mindhárom helyre ezek kerülhetnek.',
        explanation: 'Mivel a páratlan jegyek halmaza 5 elemű és nem tartalmazza a 0-t, mindhárom helyre 5 jegy mehet: 5 · 5 · 5 = 5³ = 125 darab ilyen szám létezik.'
      },
      {
        id: 'lq2-7',
        questionTypeBadge: 'Kapukód Ismétlés Nélkül',
        question: 'Egy kaputelefon 4-jegyű kódjához csak az {1, 2, 3, 4, 5} gombok működnek, és minden gombot csak egyszer szabad megnyomni. Hány kód készíthető?',
        options: ['120 kód', '625 kód', '24 kód', '60 kód'],
        correctAnswer: 0,
        hint: '5 elem közül választunk 4-et sorrendben, ismétlés nélkül: 5 · 4 · 3 · 2.',
        explanation: 'Az 1. gomb 5-féle, a 2. gomb 4-féle, a 3. gomb 3-féle, a 4. gomb 2-féle lehet: 5 · 4 · 3 · 2 = 120 különböző kód állítható össze.'
      },
      {
        id: 'lq2-8',
        questionTypeBadge: '5-tel Oszthatóság',
        question: 'Hány darab 3-jegyű, 5-tel osztható szám van a tízes számrendszerben?',
        options: ['180 darab', '200 darab', '90 darab', '150 darab'],
        correctAnswer: 0,
        hint: 'Egy szám akkor osztható 5-tel, ha 0-ra vagy 5-re végződik (2 lehetőség az egyesek helyén).',
        explanation: 'Százasok helye: 9 lehetőség (1..9), tízesek helye: 10 lehetőség, egyesek helye: 2 lehetőség (0 vagy 5). Így 9 · 10 · 2 = 180 darab.'
      },
      {
        id: 'lq2-9',
        questionTypeBadge: 'Teljes Sorbarendezés',
        question: 'Négy barát (Ádám, Bea, Csaba, Dóri) moziban egy 4 személyes sorba ül le. Hányféle különböző ülésrendjük lehetséges?',
        options: ['24 féle', '16 féle', '12 féle', '64 féle'],
        correctAnswer: 0,
        hint: 'Az első székre 4, a másodikra 3, a harmadikra 2, az utolsóra 1 ember ülhet: 4!.',
        explanation: 'Ez a 4 elem összes lehetséges sorrendje (permutációja): 4 · 3 · 2 · 1 = 4! = 24 különböző ülésrend.'
      },
      {
        id: 'lq2-10',
        questionTypeBadge: 'Vegyes Felhasználónév',
        question: 'Egy rendszerben az azonosító 2 angol kisbetűből és utána 2 számjegyből áll (pl. „ab12”). Hányféle azonosító készíthető (26 betű, 10 szám)?',
        options: ['67 600', '135 200', '26 000', '52 000'],
        correctAnswer: 0,
        hint: '2 betű: 26², 2 szám: 10². Szorozd össze!',
        explanation: 'A két betűs rész: 26 · 26 = 676. A két számos rész: 10 · 10 = 100. Együttesen: 676 · 100 = 67 600 különböző azonosító hozható létre.'
      }
    ]
  },
  3: {
    name: '3. Szint: Haladó Kódanalízis és Biztonság (Nehéz)',
    description: 'Komplementer módszer, új rendszámrendszer, jelszóbiztonság és szigorú feltételes kódalkotás.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'lq3-1',
        questionTypeBadge: 'Komplementer Módszer',
        question: 'Hány olyan 4-jegyű banki PIN kód létezik a 0–9 számjegyekből, amelyben van LEGALÁBB EGY ismétlődő számjegy?',
        options: ['4 960 kód', '5 040 kód', '4 536 kód', '5 000 kód'],
        correctAnswer: 0,
        hint: 'Használd a komplementer szabályt: Összes 4-jegyű PIN (10 000) − csupa különböző jegyű PIN (10·9·8·7).',
        explanation: 'Az összes PIN kód száma 10⁴ = 10 000. A csupa különböző számjegyű kódok száma: 10 · 9 · 8 · 7 = 5 040. Így a legalább egy ismétlődést tartalmazók száma: 10 000 − 5 040 = 4 960.',
        figure: (
          <svg viewBox="0 0 240 80" className="w-56 h-20">
            <rect x="10" y="15" width="90" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" />
            <text x="55" y="35" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Összes PIN</text>
            <text x="55" y="52" fill="#0f172a" fontSize="13" fontWeight="black" textAnchor="middle">10 000 db</text>
            <text x="110" y="44" fill="#ef4444" fontSize="18" fontWeight="bold" textAnchor="middle">−</text>
            <rect x="120" y="15" width="110" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" />
            <text x="175" y="35" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">Csupa különböző</text>
            <text x="175" y="52" fill="#2563eb" fontSize="13" fontWeight="black" textAnchor="middle">5 040 db</text>
          </svg>
        )
      },
      {
        id: 'lq3-2',
        questionTypeBadge: 'Esetszétválasztás',
        question: 'Hány olyan háromjegyű szám készíthető a {0, 1, 2, 3, 4, 5} jegyekből, amelyben a jegyek KÜLÖNBÖZŐEK és a szám 5-tel osztható?',
        options: ['36 darab', '40 darab', '20 darab', '48 darab'],
        correctAnswer: 0,
        hint: 'Bontsd 2 esetre: a szám 0-ra végződik VAGY 5-re végződik!',
        explanation: '1. eset: 0-ra végződik: 1. hely: 5, 2. hely: 4, 3. hely: 1 -> 5·4·1 = 20 szám. 2. eset: 5-re végződik: 1. helyre 0 nem mehet (4 lehetőség), 2. helyre 4 lehetőség -> 4·4·1 = 16 szám. Összesen: 20 + 16 = 36 darab.'
      },
      {
        id: 'lq3-3',
        questionTypeBadge: 'Új Magyar Rendszám',
        question: 'Az új magyar rendszám 4 betűből és 3 számból áll (pl. AA-AA-123). Hányszor több kombinációt tesz lehetővé, mint a régi 3 betű + 3 számos formátum?',
        options: ['Pontosan 26-szor annyit', '2-szer annyit', '10-szer annyit', '100-szor annyit'],
        correctAnswer: 0,
        hint: 'Régi: 26³ · 10³, Új: 26⁴ · 10³. Oszd el az újat a régivel!',
        explanation: 'Mivel (26⁴ · 10³) / (26³ · 10³) = 26, az egyetlen plusz betű bevezetése pontosan 26-szorosára növelte a kiadható rendszámok számát (17,5 millióról 456,9 millióra)!'
      },
      {
        id: 'lq3-4',
        questionTypeBadge: 'Szigorú Rendezés',
        question: 'Hány olyan 3-jegyű szám van, amelynek számjegyei balról jobbra szigorúan NÖVEKVŐ sorrendben állnak (pl. 137, 248)?',
        options: ['84 darab', '120 darab', '220 darab', '72 darab'],
        correctAnswer: 0,
        hint: 'A számban nem lehet 0 (mert 0-nál kisebb pozitív kezdőjegy nincs). Válassz ki 3 különböző jegyet az {1..9}-ből!',
        explanation: 'Mivel a sorrend szigorúan növekvő, a 0 nem szerepelhet (különben elöl kellene állnia). Bármely 3 kiválasztott számjegy az {1,2,...,9} halmazból pontosan egyféleképpen rendezhető növekvő sorrendbe! Így a lehetőségek száma: (9 · 8 · 7) / (3 · 2 · 1) = 84.'
      },
      {
        id: 'lq3-5',
        questionTypeBadge: 'Jelszóbiztonság',
        question: 'Egy 6 karakteres jelszóban csak 26 kisbetű használható (26⁶). Ha engedélyezzük a 26 nagybetűt és a 10 számjegyet is (62⁶), hányszorosára nő a lehetőségek száma?',
        options: ['Több mint 180-szorosára', 'Körülbelül 2,4-szeresére', '10-szeresére', '50-szeresére'],
        correctAnswer: 0,
        hint: 'Számold ki az arányt: (62 / 26)⁶ = (2,3846)⁶.',
        explanation: 'A kombinációk aránya: (62 / 26)⁶ ≈ 2,3846⁶ ≈ 184,3. Vagyis a jelszavak száma 308 millióról 56,8 milliárdra nő, több mint 180-szoros védelmet nyújtva!'
      },
      {
        id: 'lq3-6',
        questionTypeBadge: 'Pontosan Egy Nulla',
        question: 'Hány olyan négyjegyű szám létezik a tízes számrendszerben, amelyben a 0 számjegy PONTOSAN EGYSZER fordul elő?',
        options: ['2 187 darab', '2 430 darab', '1 944 darab', '3 000 darab'],
        correctAnswer: 0,
        hint: 'A nulla az 1. helyen nem lehet. Lehet a 2., 3. vagy 4. helyen (3 pozíció). A többi helyre a {1..9} számjegyek kerülhetnek.',
        explanation: 'A 0 nem állhat az 1. helyen (ezres). A 0 a százas, tízes vagy egyesek helyén állhat (3 lehetőség). A maradék 3 hely mindegyikére az {1..9} bármelyike kerülhet (9 lehetőség helyenként): 3 · 9 · 9 · 9 = 3 · 729 = 2 187 darab.'
      },
      {
        id: 'lq3-7',
        questionTypeBadge: 'Páros Jegyösszeg',
        question: 'Hány olyan kétjegyű pozitív egész szám van, amelynek a számjegyeinek összege PÁROS?',
        options: ['45 darab', '50 darab', '40 darab', '36 darab'],
        correctAnswer: 0,
        hint: 'Két szám összege akkor páros, ha mindkettő páros (P+P) VAGY mindkettő páratlan (Pt+Pt).',
        explanation: 'P+P: 1. helyre {2,4,6,8} (4 db), 2. helyre {0,2,4,6,8} (5 db) -> 4·5 = 20. Pt+Pt: 1. helyre {1,3,5,7,9} (5 db), 2. helyre {1,3,5,7,9} (5 db) -> 5·5 = 25. Összesen: 20 + 25 = 45 darab.'
      },
      {
        id: 'lq3-8',
        questionTypeBadge: 'Kizáró Feltétel',
        question: 'Egy 3 tárcsás számzár kódja babonából nem tartalmazhatja a 7-es számjegyet. Hányféle kód állítható így be?',
        options: ['729 kód', '900 kód', '504 kód', '810 kód'],
        correctAnswer: 0,
        hint: 'A 10 számjegyből kiesik a 7-es, így mindhárom tárcsán 9 számjegy maradt: 9³.',
        explanation: 'Mivel a 7-es nem megengedett, mindhárom pozícióra 9 számjegy közül választhatunk: 9 · 9 · 9 = 9³ = 729 különböző kód.'
      },
      {
        id: 'lq3-9',
        questionTypeBadge: 'Rögzített Szélek',
        question: 'Egy 5 fős családban apa és anya mindig a két szélső széken ül egy 5 fős padon. Hányféle ülésrend lehetséges?',
        options: ['12 féle', '24 féle', '6 féle', '120 féle'],
        correctAnswer: 0,
        hint: 'A szülők 2-féleképpen ülhetnek a szélekre (apa-anya vagy anya-apa). A 3 gyerek a középső 3 széken 3! = 6 féleképpen.',
        explanation: 'A két szélső helyre a szülők 2-féleképpen ülhetnek le. A középső 3 helyre a 3 gyerek 3! = 6-féleképpen ülhet: 2 · 6 = 12 különböző ülésrend lehetséges.'
      },
      {
        id: 'lq3-10',
        questionTypeBadge: 'Szuperszámítógépes Feltörés',
        question: 'Ha egy szuperszámítógép másodpercenként 1 milliárd (10⁹) próbát tesz, legfeljebb mennyi idő alatt töri fel az összes lehetséges 8-jegyű számból álló PIN kódot (10⁸ db)?',
        options: ['0,1 másodperc', '1 másodperc', '10 másodperc', '1 perc'],
        correctAnswer: 0,
        hint: 'Idő = Kódok száma / Sebesség = 10⁸ / 10⁹.',
        explanation: 'A 8-jegyű számból álló kódok száma 10⁸ = 100 000 000. A gép sebessége 10⁹ próba/mp: 10⁸ / 10⁹ = 0,1 másodperc (a másodperc tizedrésze alatt mindet végigpróbálja)!'
      }
    ]
  }
};

const lockCheatSheets: CheatSheetCard[] = [
  {
    id: 'cs-lock-1',
    title: 'Ismétléses Variáció',
    formula: 'V_n^{k, ism} = n^k',
    description: 'Ha a karakterek vagy számjegyek szabadon ismétlődhetnek, és minden pozícióra n választási lehetőség van.',
    note: 'Példa: 4-jegyű PIN kód -> 10⁴ = 10 000; 3-tárcsás számzár -> 10³ = 1 000.',
    color: 'amber'
  },
  {
    id: 'cs-lock-2',
    title: 'Ismétlés Nélküli Kódok',
    formula: 'n · (n-1) · ... · (n-k+1)',
    description: 'Amikor minden pozícióra csak korábban fel nem használt elem választható (fogyó készlet).',
    note: 'Példa: 4-jegyű kód különböző jegyekkel -> 10 · 9 · 8 · 7 = 5 040.',
    color: 'blue'
  },
  {
    id: 'cs-lock-3',
    title: 'Valódi Szám vs. Kód Szabály',
    formula: 'Kód: 0 állhat elöl | Valódi szám: 0 TILOS elöl!',
    description: 'A 0123 érvényes 4-jegyű PIN kód, de NEM négyjegyű szám, hanem a 123 háromjegyű szám!',
    note: 'Négyjegyű valódi számok száma: 9 · 10 · 10 · 10 = 9 000.',
    color: 'rose'
  },
  {
    id: 'cs-lock-4',
    title: 'Komplementer Szabály',
    formula: 'Keresett = Összes eset − Kizárandó esetek',
    description: '„Legalább egy azonos számjegy” esetén: Összes PIN (10 000) − Csupa különböző PIN (5 040) = 4 960.',
    note: 'Gyakran sokkal gyorsabb, mint az esetszétválasztás!',
    color: 'purple'
  }
];

export const LocksQuiz: React.FC<LocksQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Számzárak és Kódok Gyakorló Kvíz"
      subtitle="Ismétléses és ismétlés nélküli sorrendek, számalkotás megkötésekkel 30 feladatban"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🔐 GYAKORLÓ KVÍZ"
      emoji="🔐"
      themeColor="amber"
      levels={quizLevels}
      topicId="g9-komb-szamzarak-quiz"
      cheatSheets={lockCheatSheets}
      cheatSheetTitle="Számzárak és Kódok Segédlet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a számzárakat és kódokat a variációk számával!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <LocksMatcher
              key={`locks-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kódokat ismétléses és ismétlés nélküli típusokba!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <LocksSorter
              key={`locks-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
            />
          )
        }
      ]}
    />
  );
};

export default LocksQuiz;
