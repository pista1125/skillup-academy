import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LogicMatcher } from './LogicMatcher';
import { LogicSorter } from './LogicSorter';
import {
  Brain,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Scale,
  ShieldCheck,
  ArrowRight,
  ArrowLeftRight
} from 'lucide-react';

interface LogicQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Állítások és Tagadásuk (Negáció)',
    icon: <Brain className="w-4 h-4 text-indigo-600" />,
    formula: 'Minden ... tagadása: Van olyan, ami nem ...',
    note: 'Egy állítás pontosan akkor igaz, ha a tagadása hamis. A cáfolathoz 1 ellenpélda is elég!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300" />
        <text x="12" y="29" className="text-[10px] font-bold fill-indigo-900">Állítás: I / H</text>
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-purple-100 stroke-purple-300" />
        <text x="92" y="29" className="text-[10px] font-bold fill-purple-900">Tagadás: H / I</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Feltételes Állítások (A ⟹ B vs. B ⟹ A)',
    icon: <ArrowRight className="w-4 h-4 text-blue-600" />,
    formula: 'Eredeti: Ha A, akkor B • Megfordítás: Ha B, akkor A',
    note: 'Egy igaz állítás megfordítása nem feltétlenül igaz! Pl. 10|a ⟹ 5|a igaz, de 5|a ⟹ 10|a hamis!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="60" height="34" rx="8" className="fill-blue-100 stroke-blue-300" />
        <text x="16" y="29" className="text-[10px] font-bold fill-blue-900">10|a ⟹ 5|a ✓</text>
        <rect x="90" y="8" width="60" height="34" rx="8" className="fill-rose-100 stroke-rose-300" />
        <text x="96" y="29" className="text-[10px] font-bold fill-rose-900">5|a ⟹ 10|a ✗</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Szükséges és Elégséges Feltételek',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: 'Szükséges: nélkülözhetetlen • Elégséges: garancia',
    note: 'Ekvivalencia (A ⟺ B): a feltétel szükséges ÉS elégséges („akkor és csak akkor”).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-purple-100 stroke-purple-300" />
        <text x="15" y="29" className="text-[10px] font-bold fill-purple-900">Szükséges</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="90" y="29" className="text-[10px] font-bold fill-emerald-900">Elégséges</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Esetszétválasztásos Számelméleti Tételek',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    formula: 'n(n+1) : 2✓ • n(n+1)(n+2) : 6✓ • (2k+1)+(2k+3) : 4✓',
    note: 'Szomszédos számok szorzata mindig páros. Három egymást követő szám szorzata mindig osztható 6-tal.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-emerald-900">n(n+1): páros</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-teal-100 stroke-teal-300" />
        <text x="94" y="29" className="text-[10px] font-mono font-bold fill-teal-900">3 szám: :6✓</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Állítások és Tagadások Alapjai',
    subtitle: 'Matematikai állítások felismerése, igazságértékük és a pontos logikai tagadás',
    range: '1 - 10. feladat',
    focus: 'Állítások, tagadás és ellenpélda keresése',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mi a matematikai állítás?',
        options: [
          'Olyan kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz vagy hamis',
          'Bármilyen felkiáltó mondat vagy felszólítás a matematikában',
          'Olyan kérdés, amire számolással válaszolunk',
          'Minden olyan állítás, ami kötelezően igaz'
        ],
        correctAnswer: 'Olyan kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz vagy hamis',
        explanation: 'A matematikai állítás definíciója szerint olyan kijelentő mondat, amely vagy igaz, vagy hamis, harmadik lehetőség nincs.',
        breakdown: [
          { label: 'Definíció', value: 'Kijelentő mondat' },
          { label: 'Tulajdonság', value: 'Egyértelműen igaz vagy hamis' },
          { label: 'Harmadik eset', value: 'Nincs' }
        ],
        hint: 'Gondolj arra, hogy egy mondatnak egyértelműen igaznak vagy hamisnak kell lennie!'
      },
      {
        id: 'q1-2',
        prompt: 'Melyik mondat NEM matematikai állítás a következők közül?',
        options: [
          'Számold ki gyorsan a számjegyek összegét!',
          'A 15 osztható 3-mal.',
          'A 8 páratlan szám.',
          'Minden páros szám osztható 2-vel.'
        ],
        correctAnswer: 'Számold ki gyorsan a számjegyek összegét!',
        explanation: 'A „Számold ki gyorsan a számjegyek összegét!” felszólító mondat, így nem lehet igaz vagy hamis, tehát nem állítás.',
        breakdown: [
          { label: 'Mondattípus', value: 'Felszólító mondat' },
          { label: 'Igazságérték', value: 'Nem értelmezhető' },
          { label: 'Következtetés', value: 'Nem állítás' }
        ],
        hint: 'Keresd a felkiáltójeles felszólítást!'
      },
      {
        id: 'q1-3',
        prompt: 'Melyik kijelentés IGAZ matematikai állítás a következők közül?',
        options: [
          'Két páratlan szám összege mindig páros.',
          'Minden prímszám páratlan.',
          'A 0 nem osztható semmilyen számmal.',
          'Minden páros szám osztható 4-gyel.'
        ],
        correctAnswer: 'Két páratlan szám összege mindig páros.',
        explanation: 'Két páratlan szám felírható: (2k + 1) + (2m + 1) = 2(k + m + 1), ami mindig páros. A prímszámok között a 2 páros; a 0 minden számmal osztható; a 6 páros, de nem osztható 4-gyel.',
        breakdown: [
          { label: 'Állítás', value: 'Páratlan + páratlan = páros' },
          { label: 'Példa', value: '3 + 5 = 8 (páros)' },
          { label: 'Eredmény', value: 'Mindig IGAZ' }
        ],
        hint: 'Adj össze fejben két tetszőleges páratlan számot: 3 + 5 = 8!'
      },
      {
        id: 'q1-4',
        prompt: 'Mi a pontos tagadása a következő állításnak: „A 24 osztható 5-tel”?',
        options: [
          'A 24 nem osztható 5-tel.',
          'A 24 osztható 10-zel.',
          'A 25 osztható 5-tel.',
          'Minden szám osztható 5-tel.'
        ],
        correctAnswer: 'A 24 nem osztható 5-tel.',
        explanation: 'Egy egyszerű állítás tagadását úgy kapjuk, hogy az állítást negáljuk: „A 24 nem osztható 5-tel.” Mivel az eredeti hamis, a tagadása igaz.',
        breakdown: [
          { label: 'Eredeti állítás', value: 'A 24 osztható 5-tel (Hamis)' },
          { label: 'Tagadás képzése', value: 'Állítmány negálása' },
          { label: 'Tagadás', value: 'A 24 nem osztható 5-tel (Igaz)' }
        ],
        hint: 'A tagadás pontosan az ellentétes igazságértékű kijelentés.'
      },
      {
        id: 'q1-5',
        prompt: 'Mi a HELYES tagadása az állításnak: „Minden prímszám páratlan”?',
        options: [
          'Van olyan prímszám, amelyik páros.',
          'Minden prímszám páros.',
          'Egyetlen prímszám sem páratlan.',
          'Minden páratlan szám prímszám.'
        ],
        correctAnswer: 'Van olyan prímszám, amelyik páros.',
        explanation: 'A „Minden A rendelkezik B tulajdonsággal” tagadása: „Van olyan A, amely nem rendelkezik B tulajdonsággal”. A 2 prímszám páros, így ez a tagadás IGAZ.',
        breakdown: [
          { label: 'Eredeti állítás', value: 'Minden prím páratlan (Hamis)' },
          { label: 'Gyakori hiba', value: '„Minden prím páros” (Helytelen)' },
          { label: 'Helyes tagadás', value: 'Van olyan prím, ami páros (Igaz, a 2)' }
        ],
        hint: 'Ha valaki azt állítja, hogy MINDEN dolog ilyen, elég egyetlen ellenpéldát találni!'
      },
      {
        id: 'q1-6',
        prompt: 'Mi a helyes tagadása a következő mondatnak: „Minden páros szám osztható 4-gyel”?',
        options: [
          'Van olyan páros szám, amely nem osztható 4-gyel.',
          'Minden páros szám osztható 8-cal.',
          'Egyetlen páros szám sem osztható 4-gyel.',
          'Minden páratlan szám osztható 4-gyel.'
        ],
        correctAnswer: 'Van olyan páros szám, amely nem osztható 4-gyel.',
        explanation: 'A „minden” állítás tagadása a „van olyan, amelyik nem”. Például a 6 vagy a 10 páros, de nem osztható 4-gyel.',
        breakdown: [
          { label: 'Eredeti állítás', value: 'Minden páros szám : 4 (Hamis)' },
          { label: 'Ellenpélda', value: '6, 10, 14 páros, de nem : 4' },
          { label: 'Tagadás', value: 'Van olyan páros szám, ami nem : 4 (Igaz)' }
        ],
        hint: 'Gondolj a 6-ra vagy a 10-re: párosak, de nem oszthatók 4-gyel!'
      },
      {
        id: 'q1-7',
        prompt: 'Hány ellenpéldát kell találni ahhoz, hogy bebizonyítsuk egy általános matematikai állításról, hogy HAMIS?',
        options: [
          'Pontosan egyetlen ellenpélda felmutatása elegendő',
          'Legalább három ellenpélda szükséges',
          'Legalább tíz ellenpélda kell különböző számkörökből',
          'Az összes lehetséges szám felét meg kell vizsgálni'
        ],
        correctAnswer: 'Pontosan egyetlen ellenpélda felmutatása elegendő',
        explanation: 'Egy univerzális állítás („minden számra igaz...”) megdöntéséhez egyetlenegy olyan konkrét eset felmutatása elegendő, amelyre az állítás nem teljesül.',
        breakdown: [
          { label: 'Matematikai elv', value: 'Cáfolat ellenpéldával' },
          { label: 'Szükséges darabszám', value: 'Pontosan 1 darab' },
          { label: 'Következmény', value: 'Az állítás hamissá válik' }
        ],
        hint: 'Ha valaki azt mondja, minden hattyú fehér, hány fekete hattyút kell mutatnod?'
      },
      {
        id: 'q1-8',
        prompt: 'Mi a tagadása a következő állításnak: „Van olyan 3-mal osztható szám, amely páros”?',
        options: [
          'Egyetlen 3-mal osztható szám sem páros.',
          'Minden 3-mal osztható szám páros.',
          'Van olyan 3-mal osztható szám, ami páratlan.',
          'Egyetlen páros szám sem osztható 3-mal.'
        ],
        correctAnswer: 'Egyetlen 3-mal osztható szám sem páros.',
        explanation: 'A „Létezik (van olyan)...” típusú állítás tagadása azt jelenti, hogy egyáltalán nincs ilyen: „Egyetlen 3-mal osztható szám sem páros” (vagy „Minden 3-mal osztható szám páratlan”).',
        breakdown: [
          { label: 'Eredeti állítás', value: 'Van olyan 3-mal osztható, ami páros (Igaz, pl. 6)' },
          { label: 'Tagadás', value: 'Egyetlen 3-mal osztható sem páros (Hamis)' }
        ],
        hint: 'A létezési állítás tagadása az, hogy semelyikre sem teljesül.'
      },
      {
        id: 'q1-9',
        prompt: 'Ha egy matematikai állításról tudjuk, hogy IGAZ, akkor mit tudunk biztosan a tagadásáról?',
        options: [
          'A tagadása biztosan HAMIS',
          'A tagadása lehet igaz és hamis is',
          'A tagadása is biztosan igaz',
          'A tagadásáról nem mondható semmi'
        ],
        correctAnswer: 'A tagadása biztosan HAMIS',
        explanation: 'A negáció alapelve, hogy megfordítja az igazságértéket: ha az állítás igaz, a tagadása hamis; ha az állítás hamis, a tagadása igaz.',
        breakdown: [
          { label: 'Eredeti igazságérték', value: 'IGAZ' },
          { label: 'Negáció hatása', value: 'Megfordítja' },
          { label: 'Tagadás értéke', value: 'HAMIS' }
        ],
        hint: 'Az állítás és a tagadása kizárják egymást: nem lehetnek egyszerre igazak!'
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám szolgál ellenpéldaként arra a hibás állításra, hogy „Minden páratlan szám prímszám”?',
        options: [
          '9',
          '7',
          '11',
          '13'
        ],
        correctAnswer: '9',
        explanation: 'A 9 páratlan szám, de van 1-en és önmagán kívüli osztója (3 · 3 = 9), tehát összetett szám, nem prímszám. Így ellenpélda az állításra.',
        breakdown: [
          { label: 'Feltétel vizsgálata', value: '9 páratlan szám (teljesül)' },
          { label: 'Következmény', value: 'Nem prím, mert 3 | 9' },
          { label: 'Szerepe', value: 'Tökéletes ellenpélda' }
        ],
        hint: 'Keresd azt a páratlan számot, aminek van 1-en és önmagán kívüli osztója!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Feltételes Állítások és Megfordításaik',
    subtitle: '„Ha A, akkor B” szerkezet, megfordítások, igazságértékek és ellenpéldák',
    range: '11 - 20. feladat',
    focus: 'Következtetések helyessége és megfordított állítások vizsgálata',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mi a feltétel és mi a következmény a mondatban: „Ha egy szám osztható 10-zel, akkor osztható 5-tel”?',
        options: [
          'Feltétel: a szám osztható 10-zel; Következmény: a szám osztható 5-tel',
          'Feltétel: a szám osztható 5-tel; Következmény: a szám osztható 10-zel',
          'Mindkettő feltétel',
          'Mindkettő következmény'
        ],
        correctAnswer: 'Feltétel: a szám osztható 10-zel; Következmény: a szám osztható 5-tel',
        explanation: 'A „Ha A, akkor B” szerkezetben a „Ha” utáni rész a feltétel (A), az „akkor” utáni rész pedig a következmény (B).',
        breakdown: [
          { label: '„Ha...” rész', value: 'A szám osztható 10-zel (feltétel)' },
          { label: '„Akkor...” rész', value: 'A szám osztható 5-tel (következmény)' }
        ],
        hint: 'A „Ha” mutatja a kiindulási feltételt, az „akkor” az eredményt!'
      },
      {
        id: 'q2-2',
        prompt: 'Mi a megfordítása az állításnak: „Ha egy szám osztható 10-zel, akkor osztható 5-tel”?',
        options: [
          'Ha egy szám osztható 5-tel, akkor osztható 10-zel.',
          'Ha egy szám nem osztható 10-zel, akkor nem osztható 5-tel.',
          'Ha egy szám nem osztható 5-tel, akkor nem osztható 10-zel.',
          'Egy szám osztható 5-tel és 10-zel is.'
        ],
        correctAnswer: 'Ha egy szám osztható 5-tel, akkor osztható 10-zel.',
        explanation: 'Egy feltételes állítás megfordításakor megcseréljük a feltételt és a következményt: B ⟹ A.',
        breakdown: [
          { label: 'Eredeti: A ⟹ B', value: '10-zel osztható ⟹ 5-tel osztható' },
          { label: 'Megfordítás: B ⟹ A', value: '5-tel osztható ⟹ 10-zel osztható' }
        ],
        hint: 'Cseréld fel a mondat két felét!'
      },
      {
        id: 'q2-3',
        prompt: 'Igaz-e a megfordított állítás: „Ha egy szám osztható 5-tel, akkor osztható 10-zel is”?',
        options: [
          'HAMIS, mert például a 15 osztható 5-tel, de nem osztható 10-zel',
          'IGAZ, mert 10 többszöröse az 5-nek',
          'IGAZ minden egész számra',
          'Csak negatív számokra igaz'
        ],
        correctAnswer: 'HAMIS, mert például a 15 osztható 5-tel, de nem osztható 10-zel',
        explanation: 'Bármely 5-re végződő szám (pl. 15, 25, 35) osztható 5-tel, de nem osztható 10-zel, így a megfordítás hamis.',
        breakdown: [
          { label: 'Megfordítás', value: '5-tel osztható ⟹ 10-zel osztható' },
          { label: 'Ellenpélda', value: '15, 25, 35' },
          { label: 'Igazságérték', value: 'HAMIS' }
        ],
        hint: 'Gondolj a 15-re: osztható 5-tel, de osztható 10-zel?'
      },
      {
        id: 'q2-4',
        prompt: 'Igaz-e az a szabály, hogy ha egy matematikai tétel IGAZ, akkor a megfordítása is automatikusan IGAZ?',
        options: [
          'NEM, egy igaz állítás megfordítása lehet hamis is',
          'IGEN, a matematikában minden igaz tétel megfordítása is igaz',
          'IGEN, feltéve, hogy pozitív számokról van szó',
          'NEM, a megfordítás mindig kötelezően hamis'
        ],
        correctAnswer: 'NEM, egy igaz állítás megfordítása lehet hamis is',
        explanation: 'Az egyik legfontosabb logikai törvény: egy igaz állítás megfordítása nem feltétlenül igaz! Lehet igaz is, de nagyon gyakran hamis.',
        breakdown: [
          { label: 'Eredeti', value: 'Lehet igaz' },
          { label: 'Megfordítás', value: 'Lehet igaz vagy hamis' },
          { label: 'Szabály', value: 'Nem következik automatikusan!' }
        ],
        hint: 'Idézd fel a 10-es és 5-ös oszthatóság példáját!'
      },
      {
        id: 'q2-5',
        prompt: 'Mi a megfordítása az állításnak: „Ha egy szám osztható 6-tal, akkor páros”?',
        options: [
          'Ha egy szám páros, akkor osztható 6-tal.',
          'Ha egy szám páratlan, akkor nem osztható 6-tal.',
          'Ha egy szám nem osztható 6-tal, akkor páratlan.',
          'Minden páros szám osztható 3-mal.'
        ],
        correctAnswer: 'Ha egy szám páros, akkor osztható 6-tal.',
        explanation: 'A megfordításnál felcseréljük a tagokat: „Ha páros, akkor osztható 6-tal.” Ez az állítás ráadásul hamis (pl. a 4 páros, de 6-tal nem osztható).',
        breakdown: [
          { label: 'Eredeti', value: 'Osztható 6-tal ⟹ páros (Igaz)' },
          { label: 'Megfordítás', value: 'Páros ⟹ osztható 6-tal (Hamis)' }
        ],
        hint: 'Cseréld fel a feltételt és a következményt!'
      },
      {
        id: 'q2-6',
        prompt: 'Melyik szám szolgál ellenpéldaként arra az állításra, hogy „Ha egy szám páros, akkor osztható 4-gyel”?',
        options: [
          '6',
          '8',
          '12',
          '16'
        ],
        correctAnswer: '6',
        explanation: 'A 6 páros szám, de nem osztható 4-gyel (6 : 4 = 1,5), így cáfolja az állítást. A 8, 12, 16 mind oszthatók 4-gyel.',
        breakdown: [
          { label: 'Feltétel', value: '6 páros (teljesül)' },
          { label: 'Következmény', value: '6 : 4 nem egész (nem teljesül)' },
          { label: 'Eredmény', value: 'A 6 ellenpélda' }
        ],
        hint: 'Keresd azt a páros számot, ami 4-gyel nem osztható!'
      },
      {
        id: 'q2-7',
        prompt: 'Melyik szám szolgál ellenpéldaként arra, hogy „Ha egy szám osztható 3-mal, akkor osztható 9-cel is”?',
        options: [
          '12',
          '18',
          '27',
          '36'
        ],
        correctAnswer: '12',
        explanation: 'A 12 osztható 3-mal (12 : 3 = 4), de nem osztható 9-cel (12 : 9 = 1,33...), így cáfolja a megfordítást. A 18, 27, 36 oszthatók 9-cel.',
        breakdown: [
          { label: 'Feltétel', value: '12 osztható 3-mal' },
          { label: 'Következmény', value: '12 nem osztható 9-cel' },
          { label: 'Szerepe', value: 'Ellenpélda' }
        ],
        hint: 'Keresd azt a 3 többszörösét, ami 9-nek nem többszöröse!'
      },
      {
        id: 'q2-8',
        prompt: 'Melyik állításra igaz, hogy az állítás ÉS a megfordítása is egyszerre IGAZ?',
        options: [
          'Egy szám akkor és csak akkor osztható 3-mal, ha a számjegyeinek összege osztható 3-mal.',
          'Ha egy szám osztható 10-zel, akkor osztható 5-tel.',
          'Ha egy szám osztható 4-gyel, akkor páros.',
          'Ha egy szám osztható 100-zal, akkor osztható 25-tel.'
        ],
        correctAnswer: 'Egy szám akkor és csak akkor osztható 3-mal, ha a számjegyeinek összege osztható 3-mal.',
        explanation: 'A 3-as oszthatósági szabály mindkét irányban igaz tétel: ha a szám osztható 3-mal, az összege is az; és ha az összege osztható 3-mal, a szám is az.',
        breakdown: [
          { label: 'Odafelé', value: '3|szám ⟹ 3|összeg (Igaz)' },
          { label: 'Visszafelé', value: '3|összeg ⟹ 3|szám (Igaz)' },
          { label: 'Összegzés', value: 'Ekvivalencia (akkor és csak akkor)' }
        ],
        hint: 'Keresd az „akkor és csak akkor” szerkezetű szabályt!'
      },
      {
        id: 'q2-9',
        prompt: 'Mit jelent a matematikában a „szükséges feltétel” kifejezés?',
        options: [
          'Olyan feltétel, amely nélkül az állítás biztosan nem teljesülhet',
          'Olyan feltétel, amely önmagában garantálja a következményt',
          'Olyan feltétel, ami mindig felesleges',
          'Olyan feltétel, ami csak páros számokra vonatkozik'
        ],
        correctAnswer: 'Olyan feltétel, amely nélkül az állítás biztosan nem teljesülhet',
        explanation: 'A szükséges feltétel elengedhetetlen: ha nem teljesül, a cél biztosan elbukik. (De önmagában nem biztos, hogy elég a sikerhez).',
        breakdown: [
          { label: 'Jelentés', value: 'Elengedhetetlen előfeltétel' },
          { label: 'Ha hiányzik', value: 'Biztosan nem teljesül a cél' }
        ],
        hint: 'Gondolj a szóra: elengedhetetlenül „szükség” van rá!'
      },
      {
        id: 'q2-10',
        prompt: 'Mit jelent a matematikában az „elégséges feltétel” kifejezés?',
        options: [
          'Olyan feltétel, amely önmagában garantálja a következmény teljesülését',
          'Olyan feltétel, amely nélkül nem teljesülhet az állítás',
          'Olyan feltétel, ami éppen hogy csak elég egy ketteshez',
          'Olyan feltétel, ami csak geometriában létezik'
        ],
        correctAnswer: 'Olyan feltétel, amely önmagában garantálja a következmény teljesülését',
        explanation: 'Az elégséges feltétel egy garancia: ha teljesül, a következmény biztosan megvalósul (más ellenőrzés már nem is kell).',
        breakdown: [
          { label: 'Jelentés', value: 'Önmagában garancia' },
          { label: 'Ha teljesül', value: 'A cél biztosan megvalósul' }
        ],
        hint: 'Ha valami önmagában „elég”, akkor garantálja a sikert!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szükséges és Elégséges Feltételek, Bizonyítások',
    subtitle: 'Feltételek logikai besorolása és oszthatósági tételek esetszétválasztással',
    range: '21 - 30. feladat',
    focus: 'Összetett logikai következtetések és algebrai bizonyítások',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Milyen feltétel a párosság ahhoz, hogy egy egész szám osztható legyen 6-tal?',
        options: [
          'Szükséges, de nem elégséges feltétel',
          'Elégséges, de nem szükséges feltétel',
          'Szükséges és elégséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Szükséges, de nem elégséges feltétel',
        explanation: 'Páratlan szám nem lehet 6-tal osztható (szükséges a párosság). Viszont a 8 páros, de nem osztható 6-tal, így önmagában nem elégséges (a 3-as oszthatóság is kell).',
        breakdown: [
          { label: 'Szükséges?', value: 'Igen (páratlan nem lehet 6-tal osztható)' },
          { label: 'Elégséges?', value: 'Nem (pl. 8, 14 páros, de nem : 6)' },
          { label: 'Következtetés', value: 'Szükséges, de nem elégséges' }
        ],
        hint: 'Páratlan szám lehet 6-tal osztható? És a 8 vagy 10 osztható 6-tal?'
      },
      {
        id: 'q3-2',
        prompt: 'Milyen feltétel a 10-zel való oszthatóság ahhoz, hogy egy szám osztható legyen 5-tel?',
        options: [
          'Elégséges, de nem szükséges feltétel',
          'Szükséges, de nem elégséges feltétel',
          'Szükséges és elégséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Elégséges, de nem szükséges feltétel',
        explanation: 'Ha egy szám osztható 10-zel, az garantálja az 5-ös oszthatóságot (elégséges). De nem szükséges, mert a 15, 25 is osztható 5-tel, pedig nem osztható 10-zel.',
        breakdown: [
          { label: 'Elégséges?', value: 'Igen (10|a ⟹ 5|a biztos garancia)' },
          { label: 'Szükséges?', value: 'Nem (25 osztható 5-tel, de nem 10-zel)' },
          { label: 'Következtetés', value: 'Elégséges, de nem szükséges' }
        ],
        hint: 'Ha egy szám osztható 10-zel, biztosan osztható 5-tel? És a 25?'
      },
      {
        id: 'q3-3',
        prompt: 'Milyen feltétel a számjegyösszeg 9-es oszthatósága a 9-cel való oszthatósághoz?',
        options: [
          'Szükséges és elégséges feltétel',
          'Szükséges, de nem elégséges feltétel',
          'Elégséges, de nem szükséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Szükséges és elégséges feltétel',
        explanation: 'Egy szám akkor és csak akkor osztható 9-cel, ha a számjegyösszege osztható 9-cel. Mindkét irányban igaz tétel, tehát ekvivalens (szükséges és elégséges).',
        breakdown: [
          { label: 'Szükséges?', value: 'Igen' },
          { label: 'Elégséges?', value: 'Igen' },
          { label: 'Következtetés', value: 'Szükséges ÉS elégséges (A ⟺ B)' }
        ],
        hint: 'A 9-es oszthatósági szabály mindkét irányban pontosan érvényes!'
      },
      {
        id: 'q3-4',
        prompt: 'Milyen feltétel a 100-zal való oszthatóság ahhoz, hogy egy szám osztható legyen 25-tel?',
        options: [
          'Elégséges, de nem szükséges feltétel',
          'Szükséges, de nem elégséges feltétel',
          'Szükséges és elégséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Elégséges, de nem szükséges feltétel',
        explanation: 'Mivel 100 = 4 · 25, ha egy szám osztható 100-zal, automatikusan osztható 25-tel (elégséges). Viszont a 75 is osztható 25-tel, pedig nem osztható 100-zal (nem szükséges).',
        breakdown: [
          { label: 'Elégséges?', value: 'Igen (100|a ⟹ 25|a)' },
          { label: 'Szükséges?', value: 'Nem (75:25=3, de nem :100)' },
          { label: 'Következtetés', value: 'Elégséges, de nem szükséges' }
        ],
        hint: 'A 100 osztható 25-tel, de a 75 is osztható 25-tel!'
      },
      {
        id: 'q3-5',
        prompt: 'Miért osztható két egymást követő egész szám szorzata, n · (n + 1) BÁRMILYEN egész n esetén 2-vel?',
        options: [
          'Mert két egymást követő egész szám közül az egyik biztosan páros',
          'Mert az összegük mindig páros számot ad',
          'Mert minden egész szám osztható 2-vel',
          'Csak akkor igaz, ha n pozitív egész szám'
        ],
        correctAnswer: 'Mert két egymást követő egész szám közül az egyik biztosan páros',
        explanation: 'Bármely két egymást követő szám közül az egyik páros, a másik páratlan. Mivel egy szorzat osztható 2-vel, ha legalább az egyik tényezője páros, n · (n + 1) mindig páros.',
        breakdown: [
          { label: '1. eset', value: 'Ha n páros, a szorzat páros' },
          { label: '2. eset', value: 'Ha n páratlan, n+1 kötelezően páros' },
          { label: 'Összegzés', value: 'Mindig van páros tényező ⟹ szorzat páros' }
        ],
        hint: 'Nézd meg a szomszédos számokat: páros, páratlan, páros, páratlan...'
      },
      {
        id: 'q3-6',
        prompt: 'Melyik számmal osztható BIZTOSAN bármely három egymást követő egész szám szorzata: n · (n + 1) · (n + 2)?',
        options: [
          '6-tal',
          '8-cal',
          '9-cel',
          '12-vel'
        ],
        correctAnswer: '6-tal',
        explanation: 'Három egymást követő szám közül legalább egy páros (osztható 2-vel), és pontosan egy osztható 3-mal. Mivel 2 és 3 relatív prímek, a szorzatuk mindig osztható 2 · 3 = 6-tal.',
        breakdown: [
          { label: '2-es osztó', value: 'Legalább egy páros szám van benne' },
          { label: '3-as osztó', value: 'Pontosan egy szám osztható 3-mal' },
          { label: 'Szorzat', value: 'Osztható 2 · 3 = 6-tal' }
        ],
        hint: 'Pl. 4 · 5 · 6 = 120 (:6 = 20), 1 · 2 · 3 = 6 (:6 = 1).'
      },
      {
        id: 'q3-7',
        prompt: 'Mit mondhatunk el két szomszédos páratlan szám összegéről: (2k + 1) + (2k + 3)?',
        options: [
          'Mindig osztható 4-gyel',
          'Mindig osztható 8-cal',
          'Mindig páratlan számot ad',
          'Csak akkor osztható 4-gyel, ha k páros'
        ],
        correctAnswer: 'Mindig osztható 4-gyel',
        explanation: '(2k + 1) + (2k + 3) = 4k + 4 = 4 · (k + 1). Mivel 4 kiemelhető a teljes összegből, az eredmény bármely k egész számra osztható 4-gyel.',
        breakdown: [
          { label: 'Összeg felírása', value: '(2k + 1) + (2k + 3)' },
          { label: 'Összevonás', value: '4k + 4' },
          { label: 'Kiemelés', value: '4 · (k + 1) ⟹ mindig osztható 4-gyel' }
        ],
        hint: 'Pl. 1 + 3 = 4 (:4✓), 3 + 5 = 8 (:4✓), 5 + 7 = 12 (:4✓).'
      },
      {
        id: 'q3-8',
        prompt: 'Milyen feltétel a 4-gyel való oszthatóság ahhoz, hogy egy szám páros legyen?',
        options: [
          'Elégséges, de nem szükséges feltétel',
          'Szükséges, de nem elégséges feltétel',
          'Szükséges és elégséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Elégséges, de nem szükséges feltétel',
        explanation: 'Minden 4-gyel osztható szám kötelezően páros (elégséges feltétel). De nem szükséges, mert a 6 vagy a 10 is páros, pedig nem osztható 4-gyel.',
        breakdown: [
          { label: 'Elégséges?', value: 'Igen (ha 4|a ⟹ a páros)' },
          { label: 'Szükséges?', value: 'Nem (a 6 páros, de 4-gyel nem osztható)' },
          { label: 'Következtetés', value: 'Elégséges, de nem szükséges' }
        ],
        hint: 'Ha egy szám osztható 4-gyel, az garantálja a párosságot, de a 6 is páros!'
      },
      {
        id: 'q3-9',
        prompt: 'Egy egész szám utolsó jegye 5. Milyen feltétel ez ahhoz, hogy a szám osztható legyen 5-tel?',
        options: [
          'Elégséges, de nem szükséges feltétel',
          'Szükséges, de nem elégséges feltétel',
          'Szükséges és elégséges feltétel',
          'Sem nem szükséges, sem nem elégséges'
        ],
        correctAnswer: 'Elégséges, de nem szükséges feltétel',
        explanation: 'Ha az utolsó jegy 5, a szám biztosan osztható 5-tel (elégséges). Viszont nem szükséges, hogy 5 legyen, mert a 0-ra végződő számok (pl. 20, 30) is oszthatók 5-tel.',
        breakdown: [
          { label: 'Elégséges?', value: 'Igen (5-re végződik ⟹ 5|a)' },
          { label: 'Szükséges?', value: 'Nem (a 0-ra végződők is oszthatók 5-tel)' },
          { label: 'Következtetés', value: 'Elégséges, de nem szükséges' }
        ],
        hint: 'A 20 is osztható 5-tel, pedig az utolsó jegye nem 5!'
      },
      {
        id: 'q3-10',
        prompt: 'Lehet-e egy összeg osztható 3-mal, ha az összeg egyik tagja sem osztható 3-mal?',
        options: [
          'IGEN, például 4 + 5 = 9, és a 9 osztható 3-mal',
          'NEM, az összeg oszthatóságához legalább egy tagnak oszthatónak kell lennie',
          'NEM, csak akkor lehet osztható, ha minden tag osztható',
          'Csak akkor, ha az összeg 0-t ad'
        ],
        correctAnswer: 'IGEN, például 4 + 5 = 9, és a 9 osztható 3-mal',
        explanation: 'Klasszikus számelméleti csapda! Ha egyik tag sem osztható, a maradékaik összeadódhatnak 3-má: 4 maradéka 1, 5 maradéka 2, 1 + 2 = 3, így 4 + 5 = 9 osztható 3-mal!',
        breakdown: [
          { label: '1. tag', value: '4 nem osztható 3-mal (maradék 1)' },
          { label: '2. tag', value: '5 nem osztható 3-mal (maradék 2)' },
          { label: 'Összeg', value: '4 + 5 = 9 (osztható 3-mal!)' }
        ],
        hint: 'Próbáld ki a legegyszerűbb számokat: 4 + 5 = ?'
      }
    ]
  }
};

export const LogicQuiz: React.FC<LogicQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-logic"
      topicTitle="4. Egy kis logika"
      subtopicId="egy-kis-logika"
      documentId="grade-7-egy-kis-logika-quiz"
      emoji="💡"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Logika"
      title="4. Egy kis logika – Kvíz"
      subtitle="Gyakorold az állításokat, a tagadásokat, a megfordításokat, a szükséges és elégséges feltételeket 30 kihívást jelentő feladaton!"
      cheatSheetTitle="Logikai Kisokos és Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<LogicMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<LogicSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="indigo"
      hintText="💡 Keresd az ellenpéldákat a megfordított állításoknál, és vizsgáld meg, hogy egy feltétel nélkülözhetetlen (szükséges) vagy önmagában elég (elégséges)!"
    />
  );
};

export default LogicQuiz;
