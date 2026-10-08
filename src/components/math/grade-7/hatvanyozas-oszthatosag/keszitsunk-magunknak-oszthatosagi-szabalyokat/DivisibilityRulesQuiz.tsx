import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DivisibilityRulesMatcher } from './DivisibilityRulesMatcher';
import { DivisibilityRulesSorter } from './DivisibilityRulesSorter';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Hash,
  AlertTriangle,
  Lightbulb,
  Layers,
  Calculator
} from 'lucide-react';

interface DivisibilityRulesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Szabályalkotás Alaptétele',
    icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
    formula: 'Ha LNKO(a, b) = 1, akkor (a|n ÉS b|n) ⟺ a·b|n',
    note: 'Csak relatív prím tényezőkre bonthatunk! 12 ≠ 2 · 6 (LNKO=2), helyesen: 12 = 3 · 4 (LNKO=1).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-teal-100 stroke-teal-300" />
        <text x="12" y="29" className="text-[10px] font-bold fill-teal-900">a|n és b|n</text>
        <path d="M 78 25 L 88 25" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="92" y="8" width="63" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="100" y="29" className="text-[10px] font-bold fill-emerald-900">a·b | n</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Gyakori Szabályok: 6, 12, 15, 18',
    icon: <Wrench className="w-4 h-4 text-teal-600" />,
    formula: '6 = 2·3  |  12 = 3·4  |  15 = 3·5  |  18 = 2·9',
    note: '6: páros és összeg 3-mal | 12: összeg 3-mal és utolsó 2 jegy 4-gyel | 18: páros és összeg 9-cel.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="10" y="20" className="text-[10px] font-mono fill-teal-800">12 = 3 · 4 (LNKO=1)</text>
        <text x="10" y="38" className="text-[10px] font-mono fill-purple-800">18 = 2 · 9 (LNKO=1)</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Nagyobb Osztók: 24, 36, 45, 72',
    icon: <Layers className="w-4 h-4 text-teal-600" />,
    formula: '24 = 3·8  |  36 = 4·9  |  45 = 5·9  |  72 = 8·9',
    note: '36: utolsó 2 jegy 4-gyel és összeg 9-cel | 45: 0/5 végű és összeg 9-cel.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="10" y="20" className="text-[10px] font-mono fill-teal-800">36 = 4 · 9 (LNKO=1)</text>
        <text x="10" y="38" className="text-[10px] font-mono fill-teal-800">45 = 5 · 9 (LNKO=1)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Hiányzó Számjegyek Stratégiája',
    icon: <Calculator className="w-4 h-4 text-teal-600" />,
    formula: '1. Utolsó jegy (2, 4, 5, 8)  ➜  2. Számjegyösszeg (3, 9)',
    note: 'Először mindig a helyiértékes szabállyal szűkítsük le a lehetőségeket, utána teszteljük a számjegyösszeget!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="65" height="34" rx="8" className="fill-amber-100 stroke-amber-300" />
        <text x="10" y="29" className="text-[9px] font-bold fill-amber-900">1. Végződés</text>
        <path d="M 72 25 L 82 25" stroke="#d97706" strokeWidth="2" />
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-teal-100 stroke-teal-300" />
        <text x="92" y="29" className="text-[9px] font-bold fill-teal-900">2. Összeg</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: A Relatív Prím Szabály és Alapvető Összetett Osztók',
    subtitle: 'A szabályalkotás feltétele (LNKO = 1), a 6-tal, 12-vel, 15-tel és 18-cal való oszthatóság',
    questions: [
      {
        id: 'q1-1',
        title: 'A szabályalkotás feltétele',
        question: 'Milyen feltétel szükséges ahhoz, hogy ha egy szám osztható a-val és b-vel, akkor osztható legyen a · b-vel is?',
        options: [
          'a és b relatív prímek legyenek (LNKO(a, b) = 1)',
          'a és b mindketten prímszámok legyenek',
          'a és b páratlanok legyenek',
          'a nagyobb legyen, mint b'
        ],
        correctAnswer: 'a és b relatív prímek legyenek (LNKO(a, b) = 1)',
        explanation: 'Az alaptétel szerint ha LNKO(a, b) = 1, akkor a közös többszörösük a · b, így a szám biztosan osztható a szorzattal is!',
        breakdown: [
          { label: 'Tétel', value: 'Ha LNKO(a, b) = 1, akkor a|n és b|n ⟺ a·b|n' },
          { label: 'Fontosság', value: 'Megakadályozza a többszörös tényezők duplázását' }
        ],
        hint: 'Milyen közös osztója lehet az a-nak és b-nek a szabály érvényességéhez?'
      },
      {
        id: 'q1-2',
        title: 'Miért hibás a 12 = 2 · 6 felbontás?',
        question: 'Miért nem készíthetünk a 12-re olyan szabályt, hogy „ha osztható 2-vel és 6-tal, akkor osztható 12-vel”?',
        options: [
          'Mert 2 és 6 nem relatív prímek (LNKO = 2). Pl. a 18 osztható 2-vel és 6-tal, de 12-vel nem',
          'Mert a 6 nem osztható 2-vel',
          'Mert a 12 páros szám',
          'Mert a 18 páratlan szám'
        ],
        correctAnswer: 'Mert 2 és 6 nem relatív prímek (LNKO = 2). Pl. a 18 osztható 2-vel és 6-tal, de 12-vel nem',
        explanation: 'A 2 és a 6 legnagyobb közös osztója 2, nem 1! Így a 18 tökéletesen osztható 2-vel (páros) és 6-tal is (18:6=3), mégsem osztható 12-vel!',
        breakdown: [
          { label: 'LNKO(2, 6)', value: '2 ≠ 1 (nem relatív prímek)' },
          { label: 'Ellenpélda', value: '18 osztható 2-vel és 6-tal, de 18 : 12 = 1,5 (nem osztható)' }
        ],
        hint: 'Gondolj a 18-ra: osztható 2-vel? És 6-tal? És 12-vel?'
      },
      {
        id: 'q1-3',
        title: 'Helyes felbontás 12-re',
        question: 'Melyik a helyes relatív prím felbontás a 12-vel való oszthatóság vizsgálatához?',
        options: ['3 · 4 (mert LNKO(3, 4) = 1)', '2 · 6', '1 · 12', '4 · 4'],
        correctAnswer: '3 · 4 (mert LNKO(3, 4) = 1)',
        explanation: '12 = 3 · 4, és LNKO(3, 4) = 1. Egy szám pontosan akkor osztható 12-vel, ha osztható 3-mal (számjegyösszeg) ÉS 4-gyel (utolsó 2 jegy)!',
        breakdown: [
          { label: 'Tényezők', value: '3 és 4' },
          { label: 'LNKO', value: 'LNKO(3, 4) = 1 ✓' },
          { label: 'Szabály', value: '3-mal osztható összeg ÉS 4-gyel osztható utolsó 2 jegy' }
        ],
        hint: 'Bontsd két olyan szám szorzatára, amelyeknek nincs 1-nél nagyobb közös osztójuk!'
      },
      {
        id: 'q1-4',
        title: 'A 6-tal való oszthatóság szabálya',
        question: 'Mikor osztható egy természetes szám 6-tal?',
        options: [
          'Ha páros ÉS a számjegyek összege osztható 3-mal',
          'Ha az utolsó számjegye 6',
          'Ha a számjegyek összege osztható 6-tal',
          'Ha osztható 2-vel és 4-gyel is'
        ],
        correctAnswer: 'Ha páros ÉS a számjegyek összege osztható 3-mal',
        explanation: 'Mivel 6 = 2 · 3 és LNKO(2, 3) = 1, a számnak 2-vel (páros) és 3-mal (számjegyösszeg) kell oszthatónak lennie.',
        breakdown: [
          { label: '2-es feltétel', value: 'Páros végződés (0, 2, 4, 6, 8)' },
          { label: '3-as feltétel', value: 'Számjegyösszeg osztható 3-mal' }
        ],
        hint: '6 = 2 · 3. Mi a 2-vel és a 3-mal való oszthatóság szabálya?'
      },
      {
        id: 'q1-5',
        title: 'A 15-tel való oszthatóság szabálya',
        question: 'Mikor osztható egy szám 15-tel?',
        options: [
          'Ha 0-ra vagy 5-re végződik ÉS a számjegyek összege osztható 3-mal',
          'Ha 5-re végződik ÉS páratlan',
          'Ha a számjegyek összege 15',
          'Ha az utolsó két számjegye 15'
        ],
        correctAnswer: 'Ha 0-ra vagy 5-re végződik ÉS a számjegyek összege osztható 3-mal',
        explanation: '15 = 3 · 5, és LNKO(3, 5) = 1. Az 5-tel való oszthatóság miatt 0-ra vagy 5-re kell végződnie, a 3-as feltétel miatt pedig a számjegyösszegnek kell oszthatónak lennie 3-mal.',
        breakdown: [
          { label: '5-ös szabály', value: 'Utolsó számjegy 0 vagy 5' },
          { label: '3-as szabály', value: 'Számjegyek összege osztható 3-mal' }
        ],
        hint: '15 = 3 · 5. Milyen számok oszthatók 5-tel, és mik 3-mal?'
      },
      {
        id: 'q1-6',
        title: 'A 18-cal való oszthatóság szabálya',
        question: 'Hogyan vizsgáljuk meg fejben, hogy egy szám osztható-e 18-cal?',
        options: [
          'Megnézzük, hogy páros-e ÉS a számjegyek összege osztható-e 9-cel',
          'Megnézzük, hogy osztható-e 3-mal és 6-tal',
          'Megnézzük, hogy 8-ra végződik-e',
          'Megnézzük, hogy a számjegyek összege 18-e'
        ],
        correctAnswer: 'Megnézzük, hogy páros-e ÉS a számjegyek összege osztható-e 9-cel',
        explanation: '18 = 2 · 9, és LNKO(2, 9) = 1. A 3 · 6 nem jó, mert nem relatív prímek. A 18-hoz párosnak kell lennie ÉS a számjegyösszegnek 9-cel oszthatónak kell lennie!',
        breakdown: [
          { label: 'Tényezők', value: '2 és 9 (LNKO = 1)' },
          { label: 'Egyesített szabály', value: 'Páros ÉS számjegyösszeg osztható 9-cel' }
        ],
        hint: 'Bontsd a 18-at relatív prímekre: 2 · 9!'
      },
      {
        id: 'q1-7',
        title: 'Szám vizsgálata: 348',
        question: 'Osztható-e a 348 12-vel?',
        options: [
          'IGEN, mert utolsó két jegye 48 (48:4=12) és összege 3+4+8=15 (osztható 3-mal)',
          'NEM, mert nem osztható 4-gyel',
          'NEM, mert nem osztható 3-mal',
          'Csak akkor, ha páratlan'
        ],
        correctAnswer: 'IGEN, mert utolsó két jegye 48 (48:4=12) és összege 3+4+8=15 (osztható 3-mal)',
        explanation: '12 = 3 · 4. Az utolsó 2 jegy: 48, ami osztható 4-gyel (48:4=12). A számjegyösszeg: 3+4+8 = 15, ami osztható 3-mal. Mindkét feltétel teljesül, így 348 : 12 = 29!',
        breakdown: [
          { label: '4-gyel osztható?', value: '48 : 4 = 12 (IGEN)' },
          { label: '3-mal osztható?', value: '3 + 4 + 8 = 15 (IGEN)' },
          { label: '12-vel osztható?', value: 'IGEN (348 : 12 = 29)' }
        ],
        hint: 'Nézd meg a 48-at (4-gyel) és az összeget: 3+4+8 (3-mal)!'
      },
      {
        id: 'q1-8',
        title: 'Szám vizsgálata: 735',
        question: 'Osztható-e a 735 15-tel?',
        options: [
          'IGEN, mert 5-re végződik és számjegyösszege 7+3+5=15 (osztható 3-mal)',
          'NEM, mert páratlan szám',
          'NEM, mert nem osztható 3-mal',
          'Csak 5-tel osztható, 15-tel nem'
        ],
        correctAnswer: 'IGEN, mert 5-re végződik és számjegyösszege 7+3+5=15 (osztható 3-mal)',
        explanation: '15 = 3 · 5. Végződése 5 (osztható 5-tel). Számjegyösszege: 7 + 3 + 5 = 15 (osztható 3-mal). Mivel mindkettő teljesül: 735 : 15 = 49!',
        breakdown: [
          { label: '5-ös szabály', value: '5-re végződik → IGEN' },
          { label: '3-as szabály', value: '7+3+5 = 15 → IGEN' },
          { label: 'Eredmény', value: 'Osztható 15-tel' }
        ],
        hint: '5-re végződik? És mennyi 7 + 3 + 5?'
      },
      {
        id: 'q1-9',
        title: 'Szám vizsgálata: 954',
        question: 'Osztható-e a 954 18-cal?',
        options: [
          'IGEN, mert páros (4-re végződik) és számjegyösszege 9+5+4=18 (osztható 9-cel)',
          'NEM, mert nem osztható 9-cel',
          'NEM, mert páratlan',
          'Csak 2-vel osztható'
        ],
        correctAnswer: 'IGEN, mert páros (4-re végződik) és számjegyösszege 9+5+4=18 (osztható 9-cel)',
        explanation: '18 = 2 · 9. A 954 páros (2-es teljesül), és 9 + 5 + 4 = 18, ami osztható 9-cel. Így 954 : 18 = 53!',
        breakdown: [
          { label: '2-es szabály', value: '4-re végződik (páros) → IGEN' },
          { label: '9-es szabály', value: '9 + 5 + 4 = 18 → IGEN' },
          { label: 'Eredmény', value: 'Osztható 18-cal (954 : 18 = 53)' }
        ],
        hint: 'Páros? És mennyi 9 + 5 + 4?'
      },
      {
        id: 'q1-10',
        title: 'A 20-szal való oszthatóság',
        question: 'Melyik a leggyorsabb szabály a 20-szal való oszthatóság ellenőrzésére?',
        options: [
          'A szám utolsó két számjegye 00, 20, 40, 60 vagy 80',
          'A számjegyek összege 20',
          'Páros szám és 5-re végződik',
          'Az utolsó számjegye 2'
        ],
        correctAnswer: 'A szám utolsó két számjegye 00, 20, 40, 60 vagy 80',
        explanation: '20 = 4 · 5 (LNKO = 1). Az 5 miatt 0-ra kell végződnie, a 4 miatt pedig az utolsó két jegynek 4-gyel oszthatónak kell lennie: 00, 20, 40, 60, 80.',
        breakdown: [
          { label: 'Feltételek', value: 'Osztható 5-tel (vége: 0) ÉS 4-gyel (utolsó 2 jegy)' },
          { label: 'Lehetséges végződések', value: '00, 20, 40, 60, 80' }
        ],
        hint: '20 = 4 · 5. 0-ra kell végződnie, és a 4-es szabály is kell.'
      }
    ]
  },
  2: {
    title: '2. Szint: Nagyobb Összetett Osztók (24, 36, 45, 72)',
    subtitle: 'Többjegyű vizsgálatok, 8-as és 9-es feltételek összekapcsolása',
    questions: [
      {
        id: 'q2-1',
        title: 'A 24-gyel való oszthatóság felbontása',
        question: 'Hogyan bontjuk fel a 24-et relatív prímekre oszthatósági szabályhoz?',
        options: ['3 · 8 (LNKO = 1)', '4 · 6', '2 · 12', '2 · 2 · 6'],
        correctAnswer: '3 · 8 (LNKO = 1)',
        explanation: '24 = 3 · 8, és LNKO(3, 8) = 1. A 4 · 6 hibás, mert LNKO(4, 6) = 2. Ezért a számjegyösszeget 3-mal, az utolsó 3 számjegyet 8-cal kell vizsgálni!',
        breakdown: [
          { label: 'Helyes felbontás', value: '3 · 8 (LNKO(3, 8) = 1)' },
          { label: 'Hibás felbontás', value: '4 · 6 (LNKO = 2 ≠ 1)' }
        ],
        hint: 'A 4 és a 6 osztható 2-vel, tehát nem relatív prímek. Mi van a 3-mal és 8-cal?'
      },
      {
        id: 'q2-2',
        title: 'A 36-tal való oszthatóság szabálya',
        question: 'Milyen feltételeket kell ellenőriznünk a 36-tal való oszthatósághoz?',
        options: [
          'Az utolsó 2 jegy osztható 4-gyel ÉS a számjegyek összege osztható 9-cel',
          'Osztható 6-tal és 6-tal',
          'Páros és a számjegyek összege 36',
          'Osztható 3-mal és 12-vel'
        ],
        correctAnswer: 'Az utolsó 2 jegy osztható 4-gyel ÉS a számjegyek összege osztható 9-cel',
        explanation: '36 = 4 · 9, és LNKO(4, 9) = 1. A 4-es szabály: utolsó 2 jegy 4-gyel osztható. A 9-es szabály: számjegyösszeg 9-cel osztható.',
        breakdown: [
          { label: '36 felbontása', value: '4 · 9 (LNKO = 1)' },
          { label: '1. feltétel', value: 'Utolsó két jegy osztható 4-gyel' },
          { label: '2. feltétel', value: 'Számjegyek összege osztható 9-cel' }
        ],
        hint: '36 = 4 · 9. Két jól ismert szabály egyesítése!'
      },
      {
        id: 'q2-3',
        title: 'A 45-tel való oszthatóság szabálya',
        question: 'Mikor osztható egy szám 45-tel?',
        options: [
          'Ha 0-ra vagy 5-re végződik ÉS a számjegyek összege osztható 9-cel',
          'Ha 5-re végződik és osztható 3-mal',
          'Ha páros és osztható 9-cel',
          'Ha a számjegyek összege 45'
        ],
        correctAnswer: 'Ha 0-ra vagy 5-re végződik ÉS a számjegyek összege osztható 9-cel',
        explanation: '45 = 5 · 9, és LNKO(5, 9) = 1. Az 5-ös szabály: 0 vagy 5 végződés. A 9-es szabály: számjegyösszeg osztható 9-cel.',
        breakdown: [
          { label: '5-ös szabály', value: 'Utolsó jegy 0 vagy 5' },
          { label: '9-es szabály', value: 'Számjegyösszeg osztható 9-cel' }
        ],
        hint: '45 = 5 · 9. Milyen szabály tartozik az 5-höz és a 9-hez?'
      },
      {
        id: 'q2-4',
        title: 'A 72-vel való oszthatóság szabálya',
        question: 'Hogyan készítünk szabályt a 72-re?',
        options: [
          '72 = 8 · 9 (LNKO = 1): az utolsó 3 jegy osztható 8-cal ÉS a számjegyösszeg osztható 9-cel',
          '72 = 6 · 12: osztható 6-tal és 12-vel',
          '72 = 2 · 36: páros és 36-tal osztható',
          'Osztható 2-vel és 9-cel'
        ],
        correctAnswer: '72 = 8 · 9 (LNKO = 1): az utolsó 3 jegy osztható 8-cal ÉS a számjegyösszeg osztható 9-cel',
        explanation: '72 = 8 · 9, és LNKO(8, 9) = 1. A 6 · 12 nem jó (LNKO=6). Az utolsó 3 jegy 8-as oszthatósága és a számjegyösszeg 9-es oszthatósága szükséges.',
        breakdown: [
          { label: 'Relatív prímek', value: '8 és 9 (LNKO = 1)' },
          { label: 'Szabály', value: '8-cal osztható utolsó 3 jegy ÉS 9-cel osztható összeg' }
        ],
        hint: '8 és 9 egymáshoz képest relatív prímek, szorzatuk 72.'
      },
      {
        id: 'q2-5',
        title: 'Szám vizsgálata: 1 548',
        question: 'Osztható-e az 1 548 36-tal?',
        options: [
          'IGEN, mert 48 osztható 4-gyel és 1+5+4+8 = 18 osztható 9-cel',
          'NEM, mert nem osztható 9-cel',
          'NEM, mert nem osztható 4-gyel',
          'Csak 18-cal osztható'
        ],
        correctAnswer: 'IGEN, mert 48 osztható 4-gyel és 1+5+4+8 = 18 osztható 9-cel',
        explanation: '36 = 4 · 9. Utolsó két jegy: 48 (48:4=12 ✓). Számjegyösszeg: 1+5+4+8 = 18 (18:9=2 ✓). Tehát 1548 : 36 = 43, osztható!',
        breakdown: [
          { label: '4-es teszt', value: '48 : 4 = 12 (IGEN)' },
          { label: '9-es teszt', value: '1 + 5 + 4 + 8 = 18 (IGEN)' },
          { label: 'Következtetés', value: 'Osztható 36-tal' }
        ],
        hint: 'Vizsgáld a 48-at és az 1+5+4+8 összeget!'
      },
      {
        id: 'q2-6',
        title: 'Szám vizsgálata: 2 385',
        question: 'Osztható-e a 2 385 45-tel?',
        options: [
          'IGEN, mert 5-re végződik és 2+3+8+5 = 18 (osztható 9-cel)',
          'NEM, mert páratlan szám',
          'NEM, mert az összege nem osztható 9-cel',
          'Csak 5-tel osztható'
        ],
        correctAnswer: 'IGEN, mert 5-re végződik és 2+3+8+5 = 18 (osztható 9-cel)',
        explanation: '45 = 5 · 9. Végződése 5 (5-tel osztható). Számjegyösszege: 2+3+8+5 = 18 (9-cel osztható). Így 2385 : 45 = 53!',
        breakdown: [
          { label: '5-ös teszt', value: '5-re végződik → IGEN' },
          { label: '9-es teszt', value: '2+3+8+5 = 18 → IGEN' },
          { label: 'Eredmény', value: 'Osztható 45-tel (2385 : 45 = 53)' }
        ],
        hint: '5-re végződik? És mennyi 2 + 3 + 8 + 5?'
      },
      {
        id: 'q2-7',
        title: 'Szám vizsgálata: 1 224',
        question: 'Osztható-e az 1 224 24-gyel?',
        options: [
          'IGEN, mert 224 osztható 8-cal (224:8=28) és 1+2+2+4=9 (osztható 3-mal)',
          'NEM, mert nem osztható 8-cal',
          'NEM, mert nem osztható 3-mal',
          'Csak 12-vel osztható'
        ],
        correctAnswer: 'IGEN, mert 224 osztható 8-cal (224:8=28) és 1+2+2+4=9 (osztható 3-mal)',
        explanation: '24 = 3 · 8. Utolsó 3 jegy: 224 : 8 = 28 (osztható 8-cal). Számjegyösszeg: 1+2+2+4 = 9 (osztható 3-mal). Tehát 1224 : 24 = 51!',
        breakdown: [
          { label: '8-as teszt', value: '224 : 8 = 28 (IGEN)' },
          { label: '3-as teszt', value: '1+2+2+4 = 9 (IGEN)' },
          { label: 'Eredmény', value: 'Osztható 24-gyel' }
        ],
        hint: 'Oszd el a 224-et 8-cal, és add össze a számjegyeket!'
      },
      {
        id: 'q2-8',
        title: 'Szám vizsgálata: 504',
        question: 'Melyikkel osztható az 504 az alábbiak közül?',
        options: ['Mindegyikkel (12, 18, 24, 36 és 72-vel is)', 'Csak 12-vel és 18-cal', 'Csak 36-tal', 'Egyikkel sem'],
        correctAnswer: 'Mindegyikkel (12, 18, 24, 36 és 72-vel is)',
        explanation: '504 = 7 · 72. Mivel 72-vel osztható, így a 72 összes osztójával is osztható: 12-vel, 18-cal, 24-gyel és 36-tal is! (504:72=7, 504:36=14, 504:24=21, 504:18=28, 504:12=42).',
        breakdown: [
          { label: '8-cal', value: '504 : 8 = 63' },
          { label: '9-cel', value: '5+0+4 = 9' },
          { label: '72-vel', value: '8 · 9 = 72 → 504 : 72 = 7' }
        ],
        hint: '5+0+4 = 9 (9-cel osztható), és 504 : 8 = 63. Ha 72-vel osztható, minddel osztható!'
      },
      {
        id: 'q2-9',
        title: 'Csapdahelyzet: 15-tel osztható, de 45-tel nem',
        question: 'Melyik szám osztható 15-tel, de NEM osztható 45-tel?',
        options: ['75', '90', '135', '180'],
        correctAnswer: '75',
        explanation: '75 : 15 = 5 (osztható 15-tel). De 7+5 = 12, ami nem osztható 9-cel, így 45-tel nem osztható! (90, 135 és 180 mind oszthatók 45-tel is).',
        breakdown: [
          { label: '75 : 15', value: '5 (osztható 15-tel)' },
          { label: 'Számjegyösszeg', value: '7 + 5 = 12 (nem osztható 9-cel)' },
          { label: '45-tel', value: 'NEM osztható 45-tel' }
        ],
        hint: 'Keresd azt a számot, amelynek számjegyösszege osztható 3-mal, de 9-cel nem!'
      },
      {
        id: 'q2-10',
        title: 'Miért nem jó a 24 = 4 · 6 felbontás?',
        question: 'Mi a baj a 24 = 4 · 6 felbontással a szabályalkotás szempontjából?',
        options: [
          'LNKO(4, 6) = 2 ≠ 1, így pl. a 36 osztható 4-gyel és 6-tal is, de 24-gyel nem',
          'A 4 és a 6 nem oszthatók 3-mal',
          'A 24 nem páros szám',
          'Nincs vele baj, tökéletes szabály'
        ],
        correctAnswer: 'LNKO(4, 6) = 2 ≠ 1, így pl. a 36 osztható 4-gyel és 6-tal is, de 24-gyel nem',
        explanation: 'A 36 osztható 4-gyel (36:4=9) és 6-tal is (36:6=6), mégis 36 nem osztható 24-gyel! Ez mutatja be a relatív prímség elengedhetetlen voltát.',
        breakdown: [
          { label: '36 : 4', value: '9 (teljesül)' },
          { label: '36 : 6', value: '6 (teljesül)' },
          { label: '36 : 24', value: '1,5 (NEM teljesül!)' }
        ],
        hint: 'Gondolj a 36-ra: 4-gyel és 6-tal osztható, de 24-gyel?'
      }
    ]
  },
  3: {
    title: '3. Szint: Rejtvényes Számjegyek Meghatározása',
    subtitle: 'Ismeretlen számjegyek (x, y) kiszámítása összetett oszthatósági feltételekből',
    questions: [
      {
        id: 'q3-1',
        title: 'Hiányzó utolsó számjegy: 12-vel való oszthatóság',
        question: 'Milyen x számjegy írható a 34x helyére, hogy a háromjegyű szám osztható legyen 12-vel?',
        options: ['Csak a 8', 'Csak a 2', '0 és 4', '2 és 6'],
        correctAnswer: 'Csak a 8',
        explanation: '12 = 3 · 4. A 4 miatt 4x-nek oszthatónak kell lennie 4-gyel: x lehet 0, 4, 8. A 3-as szabály (számjegyösszeg): 3+4+0=7 (nem), 3+4+4=11 (nem), 3+4+8=15 (igen!). Tehát egyedül x = 8 a jó megoldás: 348!',
        breakdown: [
          { label: '4-es feltétel (4x)', value: 'x ∈ {0, 4, 8}' },
          { label: '3-as feltétel', value: '3+4+0=7 (✗), 3+4+4=11 (✗), 3+4+8=15 (✓)' },
          { label: 'Megoldás', value: 'x = 8 (szám: 348)' }
        ],
        hint: 'A 4-es oszthatóság miatt a 40, 44, 48 jöhet szóba. Melyik összege osztható 3-mal?'
      },
      {
        id: 'q3-2',
        title: 'Hiányzó számjegy 15-tel való oszthatósághoz',
        question: 'A 42x háromjegyű szám osztható 15-tel. Melyik lehet az x értéke?',
        options: ['0', '5', '0 és 5 is', '3'],
        correctAnswer: '0',
        explanation: '15 = 3 · 5. Az 5 miatt x lehet 0 vagy 5. Ha x = 0: 4+2+0 = 6 (osztható 3-mal, 420 jó!). Ha x = 5: 4+2+5 = 11 (nem osztható 3-mal, 425 nem jó!). Így csak az x = 0 jó!',
        breakdown: [
          { label: '5-ös feltétel', value: 'x = 0 vagy x = 5' },
          { label: 'x = 0 teszt', value: '4+2+0 = 6 (osztható 3-mal ✓)' },
          { label: 'x = 5 teszt', value: '4+2+5 = 11 (nem osztható 3-mal ✗)' },
          { label: 'Megoldás', value: 'x = 0' }
        ],
        hint: 'x csak 0 vagy 5 lehet. Melyik esetén lesz 4 + 2 + x osztható 3-mal?'
      },
      {
        id: 'q3-3',
        title: 'Hiányzó számjegy 18-cal való oszthatósághoz',
        question: 'Milyen x számjegy esetén lesz a 7x4 háromjegyű szám osztható 18-cal?',
        options: ['x = 7', 'x = 2', 'x = 8', 'Nincs ilyen x'],
        correctAnswer: 'x = 7',
        explanation: '18 = 2 · 9. A szám 4-re végződik, így páros (a 2-es feltétel eleve teljesül). A 9-es feltétel: 7 + x + 4 = 11 + x. A 9 legközelebbi többszöröse a 18: 11 + x = 18 ⟹ x = 7. A szám: 774!',
        breakdown: [
          { label: '2-es feltétel', value: '4-re végződik (páros ✓)' },
          { label: '9-es feltétel', value: '7 + x + 4 = 11 + x osztható 9-cel' },
          { label: 'Egyenlet', value: '11 + x = 18 ⟹ x = 7' },
          { label: 'Ellenőrzés', value: '774 : 18 = 43 ✓' }
        ],
        hint: 'A párosság pipa. Mennyi hiányzik a 7 + 4 = 11-hez, hogy 18 legyen?'
      },
      {
        id: 'q3-4',
        title: 'Hiányzó belső számjegy 36-hoz',
        question: 'Az 5x24 négyjegyű szám osztható 36-tal. Mi az x számjegy értéke?',
        options: ['x = 7', 'x = 3', 'x = 0', 'x = 9'],
        correctAnswer: 'x = 7',
        explanation: '36 = 4 · 9. Utolsó két jegy: 24, ami osztható 4-gyel (24:4=6 ✓). A számjegyösszegnek oszthatónak kell lennie 9-cel: 5 + x + 2 + 4 = 11 + x. Tehát 11 + x = 18 ⟹ x = 7. A szám: 5724!',
        breakdown: [
          { label: '4-es feltétel', value: '24 : 4 = 6 (teljesül ✓)' },
          { label: '9-es feltétel', value: '5 + 2 + 4 + x = 11 + x = 18 ⟹ x = 7' },
          { label: 'Ellenőrzés', value: '5724 : 36 = 159 ✓' }
        ],
        hint: 'A 24 osztható 4-gyel. Mennyi hiányzik az 5 + 2 + 4 = 11-hez, hogy a számjegyösszeg 18 legyen?'
      },
      {
        id: 'q3-5',
        title: 'Két ismeretlen számjegy: 45-tel való oszthatóság',
        question: 'A 3x4y négyjegyű szám osztható 45-tel és páratlan szám. Milyen (x, y) számpár lehetséges?',
        options: ['x = 6 és y = 5', 'x = 2 és y = 0', 'x = 1 és y = 5', 'x = 5 és y = 5'],
        correctAnswer: 'x = 6 és y = 5',
        explanation: '45 = 5 · 9. Mivel a szám páratlan és osztható 5-tel, az y kötelezően 5! Ekkor a szám 3x45. Számjegyösszeg: 3 + x + 4 + 5 = 12 + x. A 9-cel való oszthatósághoz 12 + x = 18 ⟹ x = 6. A szám: 3645!',
        breakdown: [
          { label: 'Páratlan és 5-tel osztható', value: 'y = 5 (kötelező)' },
          { label: '9-es feltétel', value: '3 + x + 4 + 5 = 12 + x = 18 ⟹ x = 6' },
          { label: 'Megoldás', value: 'x = 6, y = 5 (szám: 3645)' }
        ],
        hint: 'Mivel páratlan, y nem lehet 0, csak 5. Mennyi ekkor x a 9-es összeghez?'
      },
      {
        id: 'q3-6',
        title: 'Oszthatóság 20-szal: ismeretlen számjegyek',
        question: 'A 7x8y négyjegyű szám osztható 20-szal és 9-cel is. Milyen számok az x és y?',
        options: ['x = 3 és y = 0', 'x = 5 és y = 0', 'x = 0 és y = 0', 'x = 1 és y = 0'],
        correctAnswer: 'x = 3 és y = 0',
        explanation: 'A 20-szal való oszthatóság miatt y = 0 (mert 80 osztható 4-gyel és 0-ra végződik). A 9-es szabály miatt: 7 + x + 8 + 0 = 15 + x. 15 + x = 18 ⟹ x = 3. A szám: 7380!',
        breakdown: [
          { label: '20-as feltétel', value: 'y = 0 (mert 80 osztható 20-szal)' },
          { label: '9-es feltétel', value: '7 + x + 8 + 0 = 15 + x = 18 ⟹ x = 3' },
          { label: 'Ellenőrzés', value: '7380 : 20 = 369 és 7380 : 9 = 820 ✓' }
        ],
        hint: 'A 20 miatt y = 0. Mennyi kell még a 7 + 8 = 15-höz, hogy 18 legyen?'
      },
      {
        id: 'q3-7',
        title: 'Kétismeretlenes 12-es feladat: hány megoldás van?',
        question: 'A 2x3y négyjegyű szám osztható 12-vel, és y páratlan nem lehet. Ha y = 2, mi lehet az x?',
        options: ['x = 1, 4 vagy 7', 'Csak x = 1', 'Csak x = 4', 'Nincs megoldás'],
        correctAnswer: 'x = 1, 4 vagy 7',
        explanation: 'Ha y = 2: az utolsó két jegy 32, ami osztható 4-gyel (32:4=8 ✓). A számjegyösszeg: 2 + x + 3 + 2 = 7 + x. A 3-mal való oszthatósághoz 7 + x lehet 9, 12 vagy 15, így x = 1, 4 vagy 7! (Számok: 2132, 2432, 2732).',
        breakdown: [
          { label: '4-es teszt (32)', value: '32 : 4 = 8 (teljesül ✓)' },
          { label: '3-as feltétel', value: '7 + x osztható 3-mal' },
          { label: 'Lehetséges x értékek', value: 'x = 1 (összeg: 9), x = 4 (összeg: 12), x = 7 (összeg: 15)' }
        ],
        hint: 'A 7-hez adj 1-et, 4-et vagy 7-et: mindhárom 3-mal osztható összeget ad!'
      },
      {
        id: 'q3-8',
        title: 'Számjegyek összege és 15-tel való oszthatóság',
        question: 'Hány különböző olyan háromjegyű 5-re végződő szám van, amely osztható 15-tel és a százasok helyén 6 áll (6x5 alakú)?',
        options: ['3 darab (615, 645, 675)', '1 darab', '2 darab', '4 darab'],
        correctAnswer: '3 darab (615, 645, 675)',
        explanation: 'Az 5-re végződés miatt 5-tel osztható. A 3-as oszthatósághoz: 6 + x + 5 = 11 + x osztható 3-mal. Lehetőségek: 11+1=12 (x=1), 11+4=15 (x=4), 11+7=18 (x=7). Pontosan 3 ilyen szám van: 615, 645, 675!',
        breakdown: [
          { label: 'Összeg', value: '11 + x' },
          { label: 'x = 1', value: '615 (11+1=12 ✓)' },
          { label: 'x = 4', value: '645 (11+4=15 ✓)' },
          { label: 'x = 7', value: '675 (11+7=18 ✓)' }
        ],
        hint: '11 + x mikor osztható 3-mal? x = 1, 4, 7.'
      },
      {
        id: 'q3-9',
        title: 'Oszthatóság 72-vel: 37x4 alakú szám',
        question: 'A 37x4 négyjegyű szám osztható 72-vel. Melyik számjegy áll az x helyén?',
        options: ['x = 4', 'x = 0', 'x = 8', 'x = 2'],
        correctAnswer: 'x = 4',
        explanation: '72 = 8 · 9 (LNKO = 1). A 8-as szabály szerint a 7x4 háromjegyű számnak oszthatónak kell lennie 8-cal: a 704, 744, 784 jöhet szóba (x lehet 0, 4, 8). A 9-es szabály szerint a számjegyösszegnek: 3 + 7 + x + 4 = 14 + x oszthatónak kell lennie 9-cel. 14 + x = 18 ⟹ x = 4! Ellenőrzés: 3744 : 72 = 52, pontos egész szám!',
        breakdown: [
          { label: '8-as feltétel (7x4)', value: 'x lehet 0, 4, 8 (704, 744, 784 osztható 8-cal)' },
          { label: '9-es feltétel', value: '3 + 7 + x + 4 = 14 + x = 18 ⟹ x = 4' },
          { label: 'Közös megoldás', value: 'Egyedül az x = 4 teljesíti mindkettőt (3744 : 72 = 52)' }
        ],
        hint: 'A számjegyek összege: 3 + 7 + x + 4 = 14 + x. Mennyi kell még a 18-hoz?'
      },
      {
        id: 'q3-10',
        title: 'Mi a legfontosabb tanulság?',
        question: 'Mi a legfontosabb lépés bármilyen összetett osztóval (pl. 36, 45, 72) való feladat megoldásakor?',
        options: [
          'Az osztó felbontása RELATÍV PRÍM tényezőkre, és először a végződés vizsgálata',
          'A szám elosztása írásban a nagy számmal',
          'Találomra számjegyek behelyettesítése',
          'Mindig a legnagyobb prímtényező elhagyása'
        ],
        correctAnswer: 'Az osztó felbontása RELATÍV PRÍM tényezőkre, és először a végződés vizsgálata',
        explanation: 'A matematika szépsége, hogy a relatív prím felbontás (LNKO=1) és az esetszétválasztás (végződés először, összeg másodszor) minden ilyen feladatot villámgyorsan és hibátlanul megoldhatóvá tesz!',
        breakdown: [
          { label: '1. Lépés', value: 'LNKO(a, b) = 1 felbontás' },
          { label: '2. Lépés', value: 'Végződéses feltétel (kevesebb eset)' },
          { label: '3. Lépés', value: 'Számjegyösszeges feltétel (pontos értékek)' }
        ],
        hint: 'Gondolj a lecke címére és az aranyszabályokra!'
      }
    ]
  }
};

export const DivisibilityRulesQuiz: React.FC<DivisibilityRulesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-custom-rules"
      topicTitle="6. Készítsünk magunknak oszthatósági szabályokat!"
      subtopicId="keszitsunk-magunknak-oszthatosagi-szabalyokat"
      documentId="grade-7-divisibility-rules-quiz"
      emoji="🛠️"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Számelmélet"
      title="6. Készítsünk magunknak oszthatósági szabályokat! – Kvíz"
      subtitle="Gyakorold az összetett oszthatósági szabályok (6, 12, 15, 18, 20, 24, 36, 45, 72) alkotását és az ismeretlen számjegyek kiszámítását 30 mesteri feladaton!"
      cheatSheetTitle="Oszthatósági Szabálykészítő Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<DivisibilityRulesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DivisibilityRulesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="teal"
      hintText="💡 Ügyelj a relatív prím feltételre (LNKO = 1), és a rejtvényes számoknál mindig az utolsó számjegyek vizsgálatával kezdj!"
    />
  );
};

export default DivisibilityRulesQuiz;
