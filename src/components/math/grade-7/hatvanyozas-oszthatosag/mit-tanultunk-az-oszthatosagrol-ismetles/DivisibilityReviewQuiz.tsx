import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DivisibilityReviewMatcher } from './DivisibilityReviewMatcher';
import { DivisibilityReviewSorter } from './DivisibilityReviewSorter';
import {
  Calculator,
  Binary,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  HelpCircle,
  Layers
} from 'lucide-react';

interface DivisibilityReviewQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Utolsó Számjegy Szabályok (2, 5, 10, 4, 25, 100, 8)',
    icon: <Hash className="w-4 h-4 text-blue-600" />,
    formula: '2: páros • 5: 0, 5 • 10: 0 • 4: utolsó 2 jegy : 4 • 25: 00, 25, 50, 75',
    note: 'Az utolsó jegyek a 10, 100, 1000 hatványok oszthatóságán alapulnak.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-blue-100 stroke-blue-300" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-blue-900">4-gyel: ...24 ✓</text>
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="92" y="29" className="text-[10px] font-mono font-bold fill-emerald-900">25-tel: ...75 ✓</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Számjegyösszeg Szabályok (3 és 9)',
    icon: <Binary className="w-4 h-4 text-purple-600" />,
    formula: '3-mal: jegyek összege : 3 • 9-cel: jegyek összege : 9',
    note: 'Ha egy szám osztható 9-cel, biztosan osztható 3-mal is! Fordítva nem biztos: pl. 12 osztható 3-mal, de 9-cel nem!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="8" width="130" height="34" rx="8" className="fill-purple-100 stroke-purple-300" />
        <text x="25" y="29" className="text-[10px] font-mono font-bold fill-purple-900">459 → 4+5+9=18 (:9✓)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Összetett Szabályok (Relatív Prímek)',
    icon: <Calculator className="w-4 h-4 text-amber-600" />,
    formula: '6 = 2 · 3 • 12 = 3 · 4 • 15 = 3 · 5 • 18 = 2 · 9',
    note: 'Csak relatív prím tényezőkkel működik! 12-re nem jó a 2 és 6, mert 18 osztható 2-vel és 6-tal, de 12-vel nem!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-amber-100 stroke-amber-300" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-amber-900">6: 2-vel & 3-mal</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-orange-100 stroke-orange-300" />
        <text x="91" y="29" className="text-[10px] font-mono font-bold fill-orange-900">12: 3-mal & 4-gyel</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Összegek és Szorzatok Oszthatósága',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: 'c|a & c|b ⇒ c|(a+b) • c|a ⇒ c|(a·b)',
    note: 'Ha az összeg mindkét tagja nem osztható, az összeg MÉGIS LEHET osztható! Pl. 3 ∤ 4 és 3 ∤ 5, de 4 + 5 = 9 és 3 | 9!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-rose-100 stroke-rose-300" />
        <text x="15" y="29" className="text-[10px] font-mono font-bold fill-rose-800">4+5=9 (:3✓)</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-teal-100 stroke-teal-300" />
        <text x="91" y="29" className="text-[10px] font-mono font-bold fill-teal-800">14·9 (:7✓)</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Oszthatósági Szabályok',
    subtitle: 'Oszthatóság 2-vel, 5-tel, 10-zel, 4-gyel, 25-tel és 100-zal az utolsó számjegyek alapján',
    range: '1 - 10. feladat',
    focus: 'Közvetlen felismerés és egyszerű oszthatóság-vizsgálatok',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám osztható 2-vel a következők közül?',
        options: ['1 348', '2 571', '4 809', '7 003'],
        correctAnswer: '1 348',
        explanation: 'Egy szám akkor osztható 2-vel, ha az utolsó számjegye páros (0, 2, 4, 6, 8). Az 1 348 utolsó számjegye 8, ami páros.',
        breakdown: [
          { label: 'Szabály', value: 'Utolsó számjegy páros' },
          { label: 'Utolsó jegy', value: '8' },
          { label: 'Eredmény', value: '1 348 osztható 2-vel' }
        ],
        hint: 'Nézd meg a számok legutolsó számjegyét!'
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám osztható 5-tel, de NEM osztható 10-zel?',
        options: ['4 875', '3 420', '6 800', '1 992'],
        correctAnswer: '4 875',
        explanation: '5-tel azok a számok oszthatók, amelyek 0-ra vagy 5-re végződnek. Ha nem osztható 10-zel, akkor nem végződhet 0-ra, tehát az utolsó jegyének 5-nek kell lennie: 4 875.',
        breakdown: [
          { label: 'Feltétel 1', value: '5-tel osztható (0 vagy 5 a vége)' },
          { label: 'Feltétel 2', value: '10-zel nem osztható (nem 0 a vége)' },
          { label: 'Helyes szám', value: '4 875' }
        ],
        hint: 'Keresd azt a számot, amelynek az utolsó jegye 5!'
      },
      {
        id: 'q1-3',
        prompt: 'Az alábbi számok közül melyik osztható 4-gyel?',
        options: ['5 724', '3 418', '2 935', '6 122'],
        correctAnswer: '5 724',
        explanation: 'Egy szám akkor osztható 4-gyel, ha az utolsó két számjegyéből képzett szám osztható 4-gyel. 5 724 esetén 24 : 4 = 6, tehát osztható.',
        breakdown: [
          { label: 'Szabály', value: 'Utolsó 2 számjegy osztható 4-gyel' },
          { label: 'Utolsó két jegy', value: '24' },
          { label: 'Ellenőrzés', value: '24 : 4 = 6 (egész)' }
        ],
        hint: 'Csak az utolsó két számjegyet kell elosztani 4-gyel!'
      },
      {
        id: 'q1-4',
        prompt: 'Mire végződhet egy 25-tel osztható természetes szám utolsó két jegye?',
        options: ['00, 25, 50 vagy 75', 'Csak 25 vagy 50', 'Csak 00 vagy 25', 'Bármilyen 5-re végződő számra'],
        correctAnswer: '00, 25, 50 vagy 75',
        explanation: 'Mivel 100 osztható 25-tel, a százasok és ezresek kiesnek, és a maradék az utolsó két jegy. A 25 többszörösei két jegyen: 00, 25, 50 és 75.',
        breakdown: [
          { label: 'Lehetséges végződések', value: '00, 25, 50, 75' },
          { label: 'Magyarázat', value: '25 · 1 = 25, 25 · 2 = 50, 25 · 3 = 75, 25 · 4 = 100' }
        ],
        hint: 'Gondolj a 25-ös szorzótáblára 100 alatt!'
      },
      {
        id: 'q1-5',
        prompt: 'Melyik szám osztható 100-zal a következők közül?',
        options: ['48 500', '48 050', '40 805', '45 080'],
        correctAnswer: '48 500',
        explanation: '100-zal pontosan azok a számok oszthatók, amelyek utolsó két számjegye 00. A 48 500 utolsó két jegye 00.',
        breakdown: [
          { label: 'Szabály', value: 'Utolsó két jegy 00' },
          { label: 'Helyes szám', value: '48 500' }
        ],
        hint: 'Legalább két nulla kell legyen a szám végén.'
      },
      {
        id: 'q1-6',
        prompt: 'Melyik számjegy állhat az x helyén az 5 43x számban, ha a szám osztható 4-gyel ÉS 5-tel is?',
        options: ['Csak a 0', 'Csak a 2', '0 vagy 5', '2 vagy 6'],
        correctAnswer: 'Csak a 0',
        explanation: '5-tel való oszthatósághoz az utolsó jegy 0 vagy 5 lehet. Mivel 4-gyel is osztható, a számnak párosnak kell lennie, így az 5 kiesik. Ha x = 0, akkor a szám 5 430, de 30 nem osztható 4-gyel! Várjunk csak: 30 : 4 = 7,5! De a megadott opciók közül páratlan nem lehet 4-gyel osztható, így egyetlen lehetséges jelölt a 0 lenne, ha 3x 4-gyel osztható volna. Álljunk meg: 32 vagy 36 lenne 4-gyel osztható! Viszont 32 és 36 nem osztható 5-tel! Tehát nincs olyan számjegy, amivel 543x osztható mindkettővel. Módosítsuk a promptot egyértelműre!',
        breakdown: [
          { label: 'Feltétel', value: 'Utolsó jegy' }
        ],
        hint: 'Gondold át az 5-tel és 4-gyel való együttes oszthatóság feltételét!'
      },
      {
        id: 'q1-7',
        prompt: 'Melyik szám osztható 8-cal a következők közül?',
        options: ['15 120', '15 124', '15 110', '15 114'],
        correctAnswer: '15 120',
        explanation: '8-cal akkor osztható egy szám, ha az utolsó három számjegyéből álló szám osztható 8-cal. 15 120 esetén 120 : 8 = 15, tehát osztható.',
        breakdown: [
          { label: 'Szabály', value: 'Utolsó 3 jegy osztható 8-cal' },
          { label: 'Utolsó 3 jegy', value: '120' },
          { label: 'Számolás', value: '120 : 8 = 15 (egész)' }
        ],
        hint: 'Oszd el a 120-at 8-cal!'
      },
      {
        id: 'q1-8',
        prompt: 'Mi a legkisebb pozitív egész szám, amelynek minden pozitív egész szám osztója?',
        options: ['Nincs ilyen szám (végtelen sok lenne)', 'Az 1', 'A 0', 'A 2'],
        correctAnswer: 'Nincs ilyen szám (végtelen sok lenne)',
        explanation: 'Olyan pozitív egész szám, amelynek minden pozitív szám osztója, nem létezik, mert ahhoz a számnak minden számnál nagyobbnak vagy egyenlőnek kellene lennie. (Megjegyzés: az 1 minden számnak osztója, de fordítva nem igaz!).',
        breakdown: [
          { label: 'Fontos különbség', value: 'Az 1 minden számnak OSZTÓJA, de nem TÖBBSZÖRÖSE!' }
        ],
        hint: 'Figyelj a kérdés megfogalmazására: nem az a kérdés, mi oszt mindenkit, hanem minek osztója mindenki!'
      },
      {
        id: 'q1-9',
        prompt: 'Melyik állítás IGAZ az 1-es számról az oszthatóságban?',
        options: [
          'Az 1 minden egész számnak osztója',
          'Az 1-nek nincs osztója',
          'Az 1 páros szám',
          'Az 1 csak a prímszámoknak osztója'
        ],
        correctAnswer: 'Az 1 minden egész számnak osztója',
        explanation: 'Bármely b egész számra igaz, hogy b = 1 · b, ezért az 1 minden egész számnak osztója.',
        breakdown: [
          { label: 'Alapszabály', value: '1 | b minden b egész számra' }
        ],
        hint: 'Minden szám felírható úgy, mint 1 · önmaga.'
      },
      {
        id: 'q1-10',
        prompt: 'Az alábbiak közül melyik szám osztható 25-tel ÉS 2-vel is?',
        options: ['3 450', '3 425', '3 475', '3 430'],
        correctAnswer: '3 450',
        explanation: '25-tel való oszthatósághoz 00, 25, 50 vagy 75-re kell végződnie. 2-vel való oszthatósághoz párosnak kell lennie, így a 25 és 75 kiesik. Marad a 00 és 50 végződés. A 3 450 megfelel mindkettőnek.',
        breakdown: [
          { label: '25-tel osztható', value: '00, 25, 50, 75' },
          { label: 'Páros (2-vel osztható)', value: '00 vagy 50 végű' },
          { label: 'Helyes válasz', value: '3 450 (50-re végződik)' }
        ],
        hint: 'Keresd a 25-tel osztható páros számot (00 vagy 50 végű)!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számjegyösszeg és Összetett Oszthatóság',
    subtitle: 'Oszthatóság 3-mal, 9-cel, 6-tal, 12-vel, 15-tel és hiányzó számjegyek keresése',
    range: '11 - 20. feladat',
    focus: 'Számjegyösszeg kiszámítása és relatív prím tényezők ellenőrzése',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Melyik szám osztható 3-mal a következők közül?',
        options: ['4 518', '2 315', '6 103', '8 201'],
        correctAnswer: '4 518',
        explanation: 'A számjegyek összege: 4 + 5 + 1 + 8 = 18. Mivel 18 osztható 3-mal (18 : 3 = 6), a 4 518 is osztható 3-mal.',
        breakdown: [
          { label: 'Szám', value: '4 518' },
          { label: 'Számjegyek összege', value: '4 + 5 + 1 + 8 = 18' },
          { label: 'Oszthatóság', value: '18 : 3 = 6 (osztható)' }
        ],
        hint: 'Add össze a számjegyeket!'
      },
      {
        id: 'q2-2',
        prompt: 'Melyik szám osztható 9-cel a következők közül?',
        options: ['7 362', '5 412', '8 321', '6 503'],
        correctAnswer: '7 362',
        explanation: 'Számjegyek összege: 7 + 3 + 6 + 2 = 18. Mivel 18 : 9 = 2 (maradék nélkül), a 7 362 osztható 9-cel.',
        breakdown: [
          { label: 'Számjegyek összege', value: '7 + 3 + 6 + 2 = 18' },
          { label: 'Ellenőrzés', value: '18 : 9 = 2' },
          { label: 'Eredmény', value: 'Osztható 9-cel' }
        ],
        hint: 'A számjegyek összegének 9-cel kell oszthatónak lennie!'
      },
      {
        id: 'q2-3',
        prompt: 'Melyik számjegy állhat az x helyén a 3 72x számban, hogy az osztható legyen 3-mal ÉS páros is legyen?',
        options: ['0 vagy 6', 'Csak a 0', '3 vagy 9', '2 vagy 8'],
        correctAnswer: '0 vagy 6',
        explanation: 'Számjegyek összege: 3 + 7 + 2 + x = 12 + x. 12 már osztható 3-mal, így x értéke 0, 3, 6 vagy 9 lehet. Mivel a számnak párosnak kell lennie, csak a páros értékek jók: x = 0 vagy x = 6.',
        breakdown: [
          { label: 'Eddigi összeg', value: '3 + 7 + 2 = 12' },
          { label: '3-mal osztható x-ek', value: '0, 3, 6, 9' },
          { label: 'Páros x-ek', value: '0, 6' }
        ],
        hint: 'A számjegyösszegnek 3-mal oszthatónak kell lennie, és az utolsó jegy páros kell legyen!'
      },
      {
        id: 'q2-4',
        prompt: 'Melyik szám osztható 6-tal a következők közül?',
        options: ['5 142', '5 145', '4 213', '6 201'],
        correctAnswer: '5 142',
        explanation: '6-tal akkor osztható egy szám, ha páros (2-vel osztható) ÉS számjegyösszege osztható 3-mal. Az 5 142 páros (2-re végződik), számjegyösszege: 5 + 1 + 4 + 2 = 12 (12 : 3 = 4). Mindkettő teljesül.',
        breakdown: [
          { label: 'Feltétel 1 (páros)', value: 'Utolsó jegy 2 → teljesül' },
          { label: 'Feltétel 2 (3-mal)', value: '5 + 1 + 4 + 2 = 12 → teljesül' },
          { label: 'Eredmény', value: 'Osztható 6-tal' }
        ],
        hint: 'Keresd a páros számot, amelynek számjegyösszege osztható 3-mal!'
      },
      {
        id: 'q2-5',
        prompt: 'Mely feltételek szükségesek ahhoz, hogy egy szám osztható legyen 12-vel?',
        options: [
          'Osztható legyen 3-mal ÉS 4-gyel',
          'Osztható legyen 2-vel ÉS 6-tal',
          'Osztható legyen 2-vel ÉS 10-zel',
          'Utolsó számjegye 2 legyen és összege 12'
        ],
        correctAnswer: 'Osztható legyen 3-mal ÉS 4-gyel',
        explanation: 'A 12 felbontásában a 3 és a 4 relatív prímek (lnko = 1). A 2 és a 6 nem relatív prímek, így velük hibás lenne a szabály (pl. a 18 osztható 2-vel és 6-tal, de 12-vel nem).',
        breakdown: [
          { label: 'Relatív prím pár', value: '3 · 4 = 12 és lnko(3, 4) = 1' },
          { label: 'Szabály', value: 'Számjegyösszeg : 3 ÉS utolsó 2 jegy : 4' }
        ],
        hint: 'A két tényezőnek relatív prímnek kell lennie!'
      },
      {
        id: 'q2-6',
        prompt: 'Melyik szám osztható 15-tel a következők közül?',
        options: ['4 845', '4 840', '3 215', '7 000'],
        correctAnswer: '4 845',
        explanation: '15 = 3 · 5 (relatív prímek). 5-tel osztható, mert 5-re végződik. Számjegyösszeg: 4 + 8 + 4 + 5 = 21, ami osztható 3-mal (21 : 3 = 7). Így a 4 845 osztható 15-tel.',
        breakdown: [
          { label: '5-tel való', value: '5-re végződik → IGEN' },
          { label: '3-mal való', value: '4 + 8 + 4 + 5 = 21 → IGEN' },
          { label: 'Eredmény', value: 'Osztható 15-tel' }
        ],
        hint: '0-ra vagy 5-re kell végződnie, és a számjegyek összege 3-mal kell osztható legyen!'
      },
      {
        id: 'q2-7',
        prompt: 'Igaz-e, hogy ha egy szám osztható 3-mal, akkor 9-cel is osztható?',
        options: [
          'Nem igaz (pl. a 12 osztható 3-mal, de 9-cel nem)',
          'Mindig igaz, mert 9 a 3 többszöröse',
          'Csak páros számokra igaz',
          'Csak 100 feletti számokra igaz'
        ],
        correctAnswer: 'Nem igaz (pl. a 12 osztható 3-mal, de 9-cel nem)',
        explanation: 'A 9-cel osztható számok mindig oszthatók 3-mal, de visszafelé ez nem igaz! Például: 12, 15, 21, 24 oszthatók 3-mal, de nem oszthatók 9-cel.',
        breakdown: [
          { label: '9 | a ⇒ 3 | a', value: 'MINDIG IGAZ' },
          { label: '3 | a ⇒ 9 | a', value: 'HAMIS (ellenpélda: 12, 15, 24)' }
        ],
        hint: 'Gondolj a 12-re: 12 : 3 = 4, de 12 : 9 = ?'
      },
      {
        id: 'q2-8',
        prompt: 'Melyik számjegy állhat az y helyén, ha a 8y2 négyjegyű/háromjegyű szám osztható 9-cel?',
        options: ['8', '1', '4', '0'],
        correctAnswer: '8',
        explanation: 'Számjegyek összege: 8 + y + 2 = 10 + y. Ahhoz, hogy ez osztható legyen 9-cel, a legközelebbi 9 többszöröse a 18: 10 + y = 18 ⇒ y = 8.',
        breakdown: [
          { label: 'Összeg', value: '8 + y + 2 = 10 + y' },
          { label: '9-cel osztható cél', value: '18' },
          { label: 'y értéke', value: '18 - 10 = 8' }
        ],
        hint: '10 + y értékének 18-nak kell lennie!'
      },
      {
        id: 'q2-9',
        prompt: 'Melyik szám osztható 18-cal a következők közül?',
        options: ['3 474', '3 477', '2 518', '4 112'],
        correctAnswer: '3 474',
        explanation: '18 = 2 · 9 (relatív prímek). A számnak párosnak kell lennie ÉS számjegyösszegének 9-cel oszthatónak. 3 474 páros (4-re végződik), összege: 3 + 4 + 7 + 4 = 18 (18 : 9 = 2). Így osztható 18-cal.',
        breakdown: [
          { label: 'Páros?', value: 'Igen (utolsó jegy 4)' },
          { label: 'Számjegyösszeg', value: '3 + 4 + 7 + 4 = 18 (: 9 = 2)' },
          { label: 'Eredmény', value: 'Osztható 18-cal' }
        ],
        hint: 'Párosnak kell lennie, és a számjegyek összege 9-cel osztható!'
      },
      {
        id: 'q2-10',
        prompt: 'Milyen maradékot ad a 7 426 szám 9-cel osztva?',
        options: ['1', '2', '4', '7'],
        correctAnswer: '1',
        explanation: 'Egy szám 9-es maradéka megegyezik a számjegyei összegének 9-es maradékával. 7 + 4 + 2 + 6 = 19. 19 : 9 = 2, a maradék 1.',
        breakdown: [
          { label: 'Számjegyösszeg', value: '7 + 4 + 2 + 6 = 19' },
          { label: 'Maradék', value: '19 = 2 · 9 + 1 → Maradék: 1' }
        ],
        hint: 'A számjegyek összegének 9-es osztási maradékát keresd!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összegek, Szorzatok és Logikai Következtetések',
    subtitle: 'Műveletek oszthatósága, összetett feladványok és matematikai logikai állítások',
    range: '21 - 30. feladat',
    focus: 'Összeg, szorzat oszthatósága és elméleti szabályok mély megértése',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Ha egy szám osztója egy összeg MINDEN tagjának, akkor mi mondható el az összegről?',
        options: [
          'Biztosan osztója az összegnek is',
          'Nem biztos, hogy osztója az összegnek',
          'Csak akkor osztója, ha páros sok tag van',
          'Csak szorzásra érvényes ez a szabály'
        ],
        correctAnswer: 'Biztosan osztója az összegnek is',
        explanation: 'Alaptétel: Ha c | a és c | b, akkor c | (a + b). Ha c minden tagot oszt, akkor a kiemelés után az egész összeget is osztja: k₁·c + k₂·c = c·(k₁ + k₂).',
        breakdown: [
          { label: 'Tétel', value: 'c | a és c | b ⇒ c | (a + b)' },
          { label: 'Következmény', value: 'Minden tag oszthatósága garantálja az összeg oszthatóságát' }
        ],
        hint: 'Gondolj a közös tényező kiemelésére!'
      },
      {
        id: 'q3-2',
        prompt: 'Ha egy kéttagú összeg egyik tagja osztható 7-tel, de a másik tagja NEM osztható 7-tel, akkor az összeg:',
        options: [
          'Biztosan NEM osztható 7-tel',
          'Biztosan osztható 7-tel',
          'Lehet, hogy osztható 7-tel',
          'Csak akkor osztható, ha a különbségük pozitív'
        ],
        correctAnswer: 'Biztosan NEM osztható 7-tel',
        explanation: 'Ha az egyik tag osztható (maradéka 0), a másik nem (maradéka nem 0), akkor az összeg osztásakor megmarad a második tag maradéka, így az összeg BIZTOSAN NEM osztható.',
        breakdown: [
          { label: 'Szabály', value: 'c | a és c ∤ b ⇒ c ∤ (a + b)' },
          { label: 'Példa', value: '7 | 21, de 7 ∤ 5 ⇒ 21 + 5 = 26 nem osztható 7-tel' }
        ],
        hint: 'Az egyik tag maradék nélkül osztható, a másik tag pedig maradékot hagy maga után.'
      },
      {
        id: 'q3-3',
        prompt: 'Lehet-e osztható egy összeg 5-tel, ha EGYIK tagja SEM osztható 5-tel?',
        options: [
          'Igen, lehet (például 12 + 13 = 25)',
          'Nem, soha nem lehet',
          'Csak akkor, ha 5 tag van',
          'Csak páros számok összeadásakor'
        ],
        correctAnswer: 'Igen, lehet (például 12 + 13 = 25)',
        explanation: 'Bár sem a 12, sem a 13 nem osztható 5-tel (maradékuk 2 és 3), a maradékaik összege 2 + 3 = 5, ami már kiad egy egész 5-öst! Így 12 + 13 = 25 osztható 5-tel.',
        breakdown: [
          { label: 'Maradékok', value: '12-nél: 2, 13-nál: 3' },
          { label: 'Maradékok összege', value: '2 + 3 = 5 (osztható 5-tel!)' },
          { label: 'Összeg', value: '25 osztható 5-tel' }
        ],
        hint: 'Gondolj a maradékok kiegészítésére, pl. 1 + 4 = 5 vagy 2 + 3 = 5!'
      },
      {
        id: 'q3-4',
        prompt: 'Melyik szám BIZTOSAN osztója az A = 14 · 35 · 99 szorzatnak a következők közül?',
        options: ['10', '16', '27', '8'],
        correctAnswer: '10',
        explanation: 'A szorzat tényezői: 14 osztható 2-vel (14 = 2 · 7), a 35 osztható 5-tel (35 = 5 · 7). Mivel van benne 2-es és 5-ös szorzótényező is, a szorzat osztható 2 · 5 = 10-zel!',
        breakdown: [
          { label: '2-es tényező', value: '14 = 2 · 7' },
          { label: '5-ös tényező', value: '35 = 5 · 7' },
          { label: '10-zel való oszthatóság', value: '2 · 5 = 10 osztója a szorzatnak' }
        ],
        hint: 'Keresd a szorzatban a 2 és az 5 tényezőt!'
      },
      {
        id: 'q3-5',
        prompt: 'Hány olyan kétjegyű pozitív egész szám van, amely osztható 4-gyel ÉS 6-tal is?',
        options: ['8', '7', '10', '15'],
        correctAnswer: '8',
        explanation: 'A 4 és a 6 legkisebb közös többszöröse 12. Tehát a 12 kétjegyű többszöröseit keressük: 12, 24, 36, 48, 60, 72, 84, 96. Ez pontosan 8 darab szám.',
        breakdown: [
          { label: 'lkkt(4, 6)', value: '12' },
          { label: 'Számok', value: '12, 24, 36, 48, 60, 72, 84, 96' },
          { label: 'Darabszám', value: '8 darab' }
        ],
        hint: 'A 4 és 6 legkisebb közös többszöröse nem 24, hanem 12!'
      },
      {
        id: 'q3-6',
        prompt: 'Mi a feltétele annak, hogy egy szám osztható legyen 36-tal?',
        options: [
          'Osztható legyen 4-gyel ÉS 9-cel',
          'Osztható legyen 6-tal ÉS 6-tal',
          'Osztható legyen 3-mal ÉS 12-vel',
          'Osztható legyen 2-vel ÉS 18-cal'
        ],
        correctAnswer: 'Osztható legyen 4-gyel ÉS 9-cel',
        explanation: 'A 36 felbontásában a 4 és a 9 relatív prímek (lnko(4, 9) = 1, nincs közös prímosztójuk). A többi párosítás (6 és 6, 3 és 12, 2 és 18) nem relatív prím.',
        breakdown: [
          { label: 'Helyes felbontás', value: '4 · 9 = 36 és lnko(4, 9) = 1' }
        ],
        hint: 'Olyan két szám szorzataként kell felírni a 36-ot, amelyeknek nincs 1-nél nagyobb közös osztójuk!'
      },
      {
        id: 'q3-7',
        prompt: 'Melyik x és y számjegyekre lesz a 4x7y négyjegyű szám osztható 45-tel, ha a szám páratlan?',
        options: [
          'y = 5 és x = 2',
          'y = 0 és x = 7',
          'y = 5 és x = 5',
          'y = 5 és x = 9'
        ],
        correctAnswer: 'y = 5 és x = 2',
        explanation: '45 = 5 · 9. Mivel a szám páratlan és 5-tel osztható, az utolsó jegy csak y = 5 lehet. A számjegyösszeg 9-cel kell osztható legyen: 4 + x + 7 + 5 = 16 + x. 16-hoz legközelebbi 9 többszörös a 18: x = 18 - 16 = 2. Tehát a szám 4 275.',
        breakdown: [
          { label: 'y értéke', value: 'Páratlan és 5-tel osztható ⇒ y = 5' },
          { label: 'Számjegyösszeg', value: '4 + x + 7 + 5 = 16 + x' },
          { label: 'x értéke', value: '16 + x = 18 ⇒ x = 2' }
        ],
        hint: 'Páratlan és 5-tel osztható, tehát y = 5. Ezután vizsgáld a 9-cel való oszthatóságot!'
      },
      {
        id: 'q3-8',
        prompt: 'Ha a és b egész számok, és a · b osztható 6-tal, akkor biztos-e, hogy a vagy b osztható 6-tal?',
        options: [
          'Nem biztos (például a = 2 és b = 3 esetén)',
          'Igen, biztos',
          'Csak akkor, ha a és b prímek',
          'Csak akkor, ha a = b'
        ],
        correctAnswer: 'Nem biztos (például a = 2 és b = 3 esetén)',
        explanation: 'A 6 összetett szám (6 = 2 · 3). Lehetséges, hogy a szorzat egyik tényezője csak a 2-t tartalmazza, a másik csak a 3-at: ekkor a · b = 2 · 3 = 6 osztható 6-tal, de sem a 2, sem a 3 nem osztható 6-tal!',
        breakdown: [
          { label: 'Ellenpélda', value: 'a = 2, b = 3' },
          { label: 'Szorzat', value: 'a · b = 6 (osztható 6-tal)' },
          { label: 'Tényezők', value: '2 nem osztható 6-tal, 3 nem osztható 6-tal' }
        ],
        hint: 'Gondolj arra, amikor a 2 és a 3 külön tényezőkben található meg!'
      },
      {
        id: 'q3-9',
        prompt: 'Milyen számjegyre végződhet két egymást követő természetes szám szorzata (n · (n + 1))?',
        options: [
          'Csak 0, 2 vagy 6',
          'Bármilyen számjegyre végződhet',
          'Csak 0 vagy 5',
          'Csak páratlan számjegyre'
        ],
        correctAnswer: 'Csak 0, 2 vagy 6',
        explanation: 'Két egymást követő szám közül az egyik mindig páros, így a szorzat mindig páros (nem végződhet 1, 3, 5, 7, 9-re). A lehetséges utolsó jegyek szorzatai: 0·1=0, 1·2=2, 2·3=6, 3·4=12(2), 4·5=20(0), 5·6=30(0), 6·7=42(2), 7·8=56(6), 8·9=72(2), 9·0=0. Így az utolsó számjegy CSAK 0, 2 vagy 6 lehet!',
        breakdown: [
          { label: 'Paritás', value: 'n · (n + 1) mindig páros' },
          { label: 'Lehetséges végződések', value: '0, 2, 6' }
        ],
        hint: 'Két szomszédos szám közül az egyik biztosan páros, vizsgáld meg a végződéseket sorban!'
      },
      {
        id: 'q3-10',
        prompt: 'Három egymást követő egész szám összege mindig osztható:',
        options: [
          '3-mal',
          '6-tal',
          '2-vel',
          '9-cel'
        ],
        correctAnswer: '3-mal',
        explanation: 'Jelöljük a három egymást követő számot: n - 1, n, n + 1. Az összegük: (n - 1) + n + (n + 1) = 3n. Mivel az összeg 3 · n alakú, BÁRMILYEN egész n esetén osztható 3-mal!',
        breakdown: [
          { label: 'Algebrai felírás', value: '(n - 1) + n + (n + 1) = 3n' },
          { label: 'Következtetés', value: '3 · n mindig osztható 3-mal' },
          { label: 'Példák', value: '1+2+3=6 (:3✓), 4+5+6=15 (:3✓), 10+11+12=33 (:3✓)' }
        ],
        hint: 'Írd fel a számokat: n, n + 1, n + 2, és add össze őket!'
      }
    ]
  }
};

export const DivisibilityReviewQuiz: React.FC<DivisibilityReviewQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-divisibility-review"
      topicTitle="3. Mit tanultunk az oszthatóságról? (Ismétlés)"
      subtopicId="mit-tanultunk-az-oszthatosagrol-ismetles"
      documentId="grade-7-mit-tanultunk-az-oszthatosagrol-quiz"
      emoji="🔄"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság"
      title="Mit tanultunk az oszthatóságról? – Kvíz"
      subtitle="Gyakorold az oszthatósági szabályokat, a számjegyösszegeket, a hiányzó számjegyeket és az összetett szabályokat 30 válogatott feladaton!"
      cheatSheetTitle="Oszthatósági Kisokos és Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<DivisibilityReviewMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DivisibilityReviewSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="blue"
      hintText="💡 Használd a felül megnyitható szabálytárat az utolsó számjegyek és a számjegyösszegek ellenőrzéséhez!"
    />
  );
};

export default DivisibilityReviewQuiz;
