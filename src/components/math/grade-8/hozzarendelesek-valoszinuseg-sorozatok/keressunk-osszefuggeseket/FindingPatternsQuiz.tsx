import React from 'react';
import { QuizTemplate, LevelConfig, DifficultyLevel, CheatSheetCard } from '../QuizTemplate';
import { FindingPatternsMatcher } from './FindingPatternsMatcher';
import { FindingPatternsSorter } from './FindingPatternsSorter';
import { ArrowRightLeft, LayoutGrid, Search, Boxes, Trophy, HelpCircle, Sparkles, Scale, TrendingUp, Hash } from 'lucide-react';

interface FindingPatternsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Lineáris Mintázatok & Gyufaszálak',
    icon: <Boxes className="w-4 h-4 text-amber-600" />,
    formula: 'f(n) = d \\cdot n + b, \\quad \\text{Négyzetlánc: } 3n + 1, \\quad \\text{Háromszög: } 2n + 1',
    note: 'Ha a szomszédos tagok különbsége (d) állandó, a szabály lineáris. A kezdőtag korrekciója a b konstans.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="2" />
        <rect x="45" y="10" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="2" />
        <rect x="75" y="10" width="30" height="30" fill="none" stroke="#d97706" strokeWidth="2" />
        <text x="125" y="24" className="text-[7px] font-bold fill-amber-900">3n + 1</text>
        <text x="125" y="34" className="text-[5.5px] fill-amber-700">4, 7, 10...</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Háromszögszámok & Gauss-összeg',
    icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
    formula: 'T_n = \\frac{n(n+1)}{2} = 1 + 2 + 3 + \\dots + n',
    note: 'Az első n pozitív egész szám összege. Két egymást követő háromszögszám összege mindig négyzetszám: T_{n-1} + T_n = n².',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="30" cy="38" r="3" fill="#f59e0b" />
        <circle cx="45" cy="38" r="3" fill="#f59e0b" /><circle cx="45" cy="26" r="3" fill="#f59e0b" />
        <circle cx="60" cy="38" r="3" fill="#f59e0b" /><circle cx="60" cy="26" r="3" fill="#f59e0b" /><circle cx="60" cy="14" r="3" fill="#f59e0b" />
        <text x="115" y="24" className="text-[7px] font-bold fill-amber-900">T₄ = 10</text>
        <text x="115" y="34" className="text-[5.5px] fill-amber-700">1 + 2 + 3 + 4</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Kézfogások & Gráfok Élei',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: 'K = \\frac{n(n-1)}{2}, \\quad n \\text{ fős társaság összes kézfogása}',
    note: 'Minden ember (n-1) másikkal fog kezet, de mindegyik kézfogást kétszer számoltunk, így osztunk 2-vel.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,12 65,22 55,42 25,42 15,22" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="40" y1="12" x2="55" y2="42" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="40" y1="12" x2="25" y2="42" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
        <text x="115" y="24" className="text-[7px] font-bold fill-amber-900">5 ember: 10</text>
        <text x="115" y="34" className="text-[5.5px] fill-amber-700">5 · 4 / 2 = 10</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Konvex Sokszögek Átlói',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: '\\text{Átlók} = \\frac{n(n-3)}{2}, \\quad \\text{Egy csúcsból: } (n-3) \\text{ átló}',
    note: 'Egy csúcsból azért (n-3) átló indul, mert önmagába és a 2 közvetlen szomszédjába oldal vezet, nem átló.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <polygon points="40,10 65,25 55,44 25,44 15,25" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="40" y1="10" x2="55" y2="44" stroke="#b45309" strokeWidth="1.5" />
        <line x1="40" y1="10" x2="25" y2="44" stroke="#b45309" strokeWidth="1.5" />
        <text x="115" y="24" className="text-[7px] font-bold fill-amber-900">Ötszög: 5 átló</text>
        <text x="115" y="34" className="text-[5.5px] fill-amber-700">5 · 2 / 2 = 5</text>
      </svg>
    )
  }
];

// --- 1. SZINT: ALAPVETŐ MINTÁZATOK ÉS KÉPLETEK (10 KÉRDÉS) ---
const level1Questions: LevelConfig['questions'] = [
  {
    id: 'fp-l1-q1',
    title: 'Négyzetlánc gyufaszálai',
    prompt: 'Gyufaszálakból egyenes láncban négyzeteket építünk: 1 négyzet = 4 szál, 2 négyzet = 7 szál, 3 négyzet = 10 szál. Melyik képlet adja meg az n darab négyzethez szükséges gyufák számát?',
    options: [
      'f(n) = 3n + 1',
      'f(n) = 4n',
      'f(n) = 3n - 1',
      'f(n) = 2n + 2'
    ],
    correctAnswer: 0,
    explanation: 'Az 1. négyzetnél 4 gyufa kell, majd minden újabb négyzet hozzáépítése +3 szálat igényel: d = 3. Az általános képlet: 3n + 1.',
    highlightValue: '3n + 1'
  },
  {
    id: 'fp-l1-q2',
    title: 'Háromszöglánc gyufaszálai',
    prompt: 'Gyufaszálakból egymáshoz kapcsolódó háromszögeket rakunk ki: 1 háromszög = 3 szál, 2 háromszög = 5 szál, 3 háromszög = 7 szál. Melyik képlet fejezi ki a gyufák számát n darab háromszög esetén?',
    options: [
      'f(n) = 2n + 1',
      'f(n) = 3n',
      'f(n) = 2n - 1',
      'f(n) = n + 2'
    ],
    correctAnswer: 0,
    explanation: 'Minden új háromszög hozzáépítése +2 gyufát igényel: d = 2. n = 1-re 2(1) + 1 = 3 szál, így a képlet: 2n + 1.',
    highlightValue: '2n + 1'
  },
  {
    id: 'fp-l1-q3',
    title: 'Kézfogások képlete',
    prompt: 'Melyik képlettel számítható ki az összes kézfogás száma, ha egy n fős társaságban mindenki mindenkivel pontosan egyszer kezet fog?',
    options: [
      'K = n(n - 1) / 2',
      'K = n(n + 1) / 2',
      'K = n(n - 3) / 2',
      'K = n² - 1'
    ],
    correctAnswer: 0,
    explanation: 'Minden ember (n - 1) másikkal fog kezet, ami n(n - 1) lenne, de minden kézfogást kétszer számoltunk, ezért osztunk 2-vel: n(n - 1) / 2.',
    highlightValue: 'n(n - 1) / 2'
  },
  {
    id: 'fp-l1-q4',
    title: 'Háromszögszámok képlete',
    prompt: 'Melyik zárt képlet határozza meg az n. háromszögszám (T_n) értékét (azaz az 1 + 2 + ... + n összeget)?',
    options: [
      'T_n = n(n + 1) / 2',
      'T_n = n(n - 1) / 2',
      'T_n = n²',
      'T_n = 2n + 1'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögszámok az első n pozitív egész szám összegei. A Gauss-formula szerint: T_n = n(n + 1) / 2.',
    highlightValue: 'n(n + 1) / 2'
  },
  {
    id: 'fp-l1-q5',
    title: 'Konvex sokszög átlói',
    prompt: 'Melyik képlet fejezi ki egy konvex n-szög összes belső átlójának számát?',
    options: [
      'Á = n(n - 3) / 2',
      'Á = n(n - 1) / 2',
      'Á = n(n + 1) / 2',
      'Á = n - 3'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból (n - 3) átló indul (önmaga és a 2 szomszédos csúcs nem ad átlót). n csúcsból n(n - 3), de minden átlónak 2 végpontja van, ezért osztunk 2-vel: n(n - 3) / 2.',
    highlightValue: 'n(n - 3) / 2'
  },
  {
    id: 'fp-l1-q6',
    title: 'Sorozat folytatása',
    prompt: 'Melyik szám következik a sorozatban: 4, 7, 10, 13, 16, [ ? ] ?',
    options: [
      '19 (állandó differencia: d = +3)',
      '18',
      '20',
      '22'
    ],
    correctAnswer: 0,
    explanation: 'A szomszédos elemek különbsége állandó: 7 - 4 = 3, 10 - 7 = 3, 13 - 10 = 3. A következő szám: 16 + 3 = 19.',
    highlightValue: '19'
  },
  {
    id: 'fp-l1-q7',
    title: 'Négyzetszámok sorozata',
    prompt: 'A négyzetszámok sorozata: 1, 4, 9, 16, 25, ... Mennyi a sorozat 6. eleme?',
    options: [
      '36 (mert 6² = 36)',
      '30',
      '35',
      '49'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetszámok általános tagja N_n = n². Az n = 6 sorszámú tag: 6² = 36.',
    highlightValue: '36'
  },
  {
    id: 'fp-l1-q8',
    title: 'Háromszög átlóinak száma',
    prompt: 'Hány átlója van egy konvex háromszögnek (n = 3)?',
    options: [
      '0 átlója van',
      '1 átlója van',
      '3 átlója van',
      '2 átlója van'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögnek nincs átlója, mert minden csúcs közvetlenül összekötve van oldalakkal a másik kettővel: 3 · (3 - 3) / 2 = 3 · 0 / 2 = 0.',
    highlightValue: '0 átló'
  },
  {
    id: 'fp-l1-q9',
    title: 'Négyszög átlóinak száma',
    prompt: 'Hány átlója van egy konvex négyszögnek (n = 4)?',
    options: [
      '2 átlója van',
      '4 átlója van',
      '1 átlója van',
      '0 átlója van'
    ],
    correctAnswer: 0,
    explanation: 'Képletbe helyettesítve: 4 · (4 - 3) / 2 = 4 · 1 / 2 = 2 átló (a két szemközti csúcsot összekötő szakaszok).',
    highlightValue: '2 átló'
  },
  {
    id: 'fp-l1-q10',
    title: 'Kézfogás 4 ember között',
    prompt: 'Egy 4 fős asztaltársaságban mindenki kezet fog mindenkivel. Hány kézfogás történik összesen?',
    options: [
      '6 kézfogás (4 · 3 / 2 = 6)',
      '4 kézfogás',
      '12 kézfogás',
      '8 kézfogás'
    ],
    correctAnswer: 0,
    explanation: 'Képlet szerint: n(n - 1) / 2 = 4 · 3 / 2 = 12 / 2 = 6 kézfogás.',
    highlightValue: '6 kézfogás'
  }
];

// --- 2. SZINT: SZÁMÍTÁSOK ÉS TÁBLÁZATOK (10 KÉRDÉS) ---
const level2Questions: LevelConfig['questions'] = [
  {
    id: 'fp-l2-q1',
    title: 'A 10. háromszögszám kiszámítása',
    prompt: 'Mennyi a 10. háromszögszám (T₁₀) értéke?',
    options: [
      '55 (10 · 11 / 2 = 55)',
      '45',
      '50',
      '100'
    ],
    correctAnswer: 0,
    explanation: 'T₁₀ = 10 · (10 + 1) / 2 = 10 · 11 / 2 = 110 / 2 = 55. Ez egyben az 1 + 2 + 3 + ... + 10 összege is.',
    highlightValue: '55'
  },
  {
    id: 'fp-l2-q2',
    title: 'Kézfogások 10 fős társaságban',
    prompt: 'Egy születésnapon 10 barát találkozik, és mindenki mindenkivel kezet fog egyszer. Hány kézfogás jön létre?',
    options: [
      '45 kézfogás (10 · 9 / 2 = 45)',
      '90 kézfogás',
      '100 kézfogás',
      '20 kézfogás'
    ],
    correctAnswer: 0,
    explanation: 'K = n(n - 1) / 2 = 10 · 9 / 2 = 90 / 2 = 45 kézfogás.',
    highlightValue: '45 kézfogás'
  },
  {
    id: 'fp-l2-q3',
    title: 'Nyolcszög átlóinak száma',
    prompt: 'Hány átlója van egy konvex nyolcszögnek (n = 8)?',
    options: [
      '20 átló (8 · 5 / 2 = 20)',
      '24 átló',
      '16 átló',
      '40 átló'
    ],
    correctAnswer: 0,
    explanation: 'Á = n(n - 3) / 2 = 8 · (8 - 3) / 2 = 8 · 5 / 2 = 40 / 2 = 20 átló.',
    highlightValue: '20 átló'
  },
  {
    id: 'fp-l2-q4',
    title: '20 négyzetből álló gyufalánc',
    prompt: 'Hány gyufaszál szükséges 20 egymáshoz csatlakozó négyzet kirakásához egyenes vonalban?',
    options: [
      '61 gyufaszál (3 · 20 + 1 = 61)',
      '80 gyufaszál (4 · 20)',
      '60 gyufaszál',
      '59 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetlánc képlete f(n) = 3n + 1. n = 20 esetén: 3 · 20 + 1 = 60 + 1 = 61 gyufaszál.',
    highlightValue: '61 gyufa'
  },
  {
    id: 'fp-l2-q5',
    title: 'Házikólánc képlete',
    prompt: 'Gyufaszálakból egymáshoz kapcsolódó házikókat építünk (négyzetalap háztetővel): 1 házikó = 6 szál, 2 házikó = 11 szál, 3 házikó = 16 szál. Mi a képlet n darab házikóra?',
    options: [
      'f(n) = 5n + 1',
      'f(n) = 6n',
      'f(n) = 5n - 1',
      'f(n) = 4n + 2'
    ],
    correctAnswer: 0,
    explanation: 'Minden új házikó a meglévő közös falhoz épül, így 5 új szálat igényel: d = 5. Az 1. házikóhoz 5(1) + 1 = 6 szál kell, a képlet: 5n + 1.',
    highlightValue: '5n + 1'
  },
  {
    id: 'fp-l2-q6',
    title: 'Hiányzó elem másodfokú sorozatban',
    prompt: 'Melyik szám hiányzik a sorozatból: 2, 5, 10, 17, 26, [ ? ] ?',
    options: [
      '37 (mert n² + 1 a szabály, ahol 6² + 1 = 37)',
      '35',
      '36',
      '40'
    ],
    correctAnswer: 0,
    explanation: 'A tagok: 1² + 1 = 2, 2² + 1 = 5, 3² + 1 = 10, 4² + 1 = 17, 5² + 1 = 26. A 6. elem: 6² + 1 = 36 + 1 = 37.',
    highlightValue: '37'
  },
  {
    id: 'fp-l2-q7',
    title: 'Sorozat algebrai képlete',
    prompt: 'Melyik képlet fejezi ki az alábbi sorozat n. tagját: 3, 8, 13, 18, 23... ?',
    options: [
      'f(n) = 5n - 2',
      'f(n) = 5n + 3',
      'f(n) = 3n + 5',
      'f(n) = 5n'
    ],
    correctAnswer: 0,
    explanation: 'A különbség állandó: d = +5. n = 1-re 5(1) + b = 3 → b = -2. A képlet: 5n - 2.',
    highlightValue: '5n - 2'
  },
  {
    id: 'fp-l2-q8',
    title: 'Kerítésoszlopok feladvány',
    prompt: 'Egy 20 méter hosszú egyenes kerítéshez 2 méterenként oszlopokat ásunk le a földbe (a kerítés mindkét végén is áll oszlop). Hány oszlopra van szükség?',
    options: [
      '11 oszlop (20 / 2 + 1 = 11)',
      '10 oszlop (20 / 2 = 10)',
      '9 oszlop',
      '12 oszlop'
    ],
    correctAnswer: 0,
    explanation: 'A 20 métert 2 méteres szakaszokra osztva 10 lécmező keletkezik. Mivel mindkét végén van oszlop, az oszlopok száma 1-gyel több a mezők számánál: 10 + 1 = 11 oszlop.',
    highlightValue: '11 oszlop'
  },
  {
    id: 'fp-l2-q9',
    title: 'Hatszög átlói',
    prompt: 'Hány átló húzható egy konvex hatszögben (n = 6)?',
    options: [
      '9 átló (6 · 3 / 2 = 9)',
      '6 átló',
      '12 átló',
      '18 átló'
    ],
    correctAnswer: 0,
    explanation: 'Á = 6 · (6 - 3) / 2 = 6 · 3 / 2 = 18 / 2 = 9 átló.',
    highlightValue: '9 átló'
  },
  {
    id: 'fp-l2-q10',
    title: 'Körmérkőzéses bajnokság',
    prompt: 'Egy sakkbajnokságon 6 versenyző indul, és mindenki mindenkivel egyszer játszik. Hány mérkőzést játszanak összesen?',
    options: [
      '15 mérkőzést (6 · 5 / 2 = 15)',
      '30 mérkőzést',
      '12 mérkőzést',
      '36 mérkőzést'
    ],
    correctAnswer: 0,
    explanation: 'A mérkőzések száma megegyezik a kézfogások számával: n(n - 1) / 2 = 6 · 5 / 2 = 15 mérkőzés.',
    highlightValue: '15 meccs'
  }
];

// --- 3. SZINT: HALADÓ ÖSSZEFÜGGÉSEK ÉS EGYENLETEK (10 KÉRDÉS) ---
const level3Questions: LevelConfig['questions'] = [
  {
    id: 'fp-l3-q1',
    title: 'Visszafelé számolás gyufákkal',
    prompt: 'Hány darab négyzetből áll az a négyzetlánc, amelynek megépítéséhez pontosan 301 gyufaszálat használtak fel?',
    options: [
      '100 négyzetből (3n + 1 = 301 → 3n = 300 → n = 100)',
      '75 négyzetből',
      '101 négyzetből',
      '99 négyzetből'
    ],
    correctAnswer: 0,
    explanation: 'Egyenlet: 3n + 1 = 301. Mindkét oldalból kivonunk 1-et: 3n = 300, osztunk 3-mal: n = 100.',
    highlightValue: '100 négyzet'
  },
  {
    id: 'fp-l3-q2',
    title: 'Visszafelé számolás kézfogásokból',
    prompt: 'Egy konferencián összesen 66 kézfogás történt (mindenki mindenkivel pontosan egyszer). Hány résztvevője volt a konferenciának?',
    options: [
      '12 résztvevő (12 · 11 / 2 = 66)',
      '11 résztvevő',
      '13 résztvevő',
      '22 résztvevő'
    ],
    correctAnswer: 0,
    explanation: 'n(n - 1) / 2 = 66 → n(n - 1) = 132. Két egymást követő egész szám szorzata 132: 12 · 11 = 132, tehát n = 12 ember.',
    highlightValue: '12 ember'
  },
  {
    id: 'fp-l3-q3',
    title: 'Két szomszédos háromszögszám összege',
    prompt: 'Milyen értéket kapunk, ha két egymást követő háromszögszámot összeadunk: T_{n-1} + T_n = ?',
    options: [
      'Mindig n² (négyzetszám)',
      'Mindig n³',
      'Mindig 2n + 1',
      'Mindig n(n + 1)'
    ],
    correctAnswer: 0,
    explanation: '(n - 1)n / 2 + n(n + 1) / 2 = n(n - 1 + n + 1) / 2 = n(2n) / 2 = n². Példa: T₂ + T₃ = 3 + 6 = 9 = 3².',
    highlightValue: 'n² (négyzetszám)'
  },
  {
    id: 'fp-l3-q4',
    title: 'Gauss-összeg 1-től 100-ig',
    prompt: 'Mennyi az első 100 pozitív egész szám összege: 1 + 2 + 3 + ... + 100 = ?',
    options: [
      '5050 (100 · 101 / 2 = 5050)',
      '5000',
      '10 100',
      '5100'
    ],
    correctAnswer: 0,
    explanation: 'T₁₀₀ = 100 · 101 / 2 = 50 · 101 = 5050. Ez az ifjú Carl Friedrich Gauss híres számítása.',
    highlightValue: '5050'
  },
  {
    id: 'fp-l3-q5',
    title: 'Oldalszám és átlószám egyenlősége',
    prompt: 'Melyik konvex sokszögnek van pontosan UGYANANNYI átlója, mint amennyi oldala?',
    options: [
      'Az ötszögnek (5 oldal és 5 átló)',
      'A négyszögnek',
      'A hatszögnek',
      'A nyolcszögnek'
    ],
    correctAnswer: 0,
    explanation: 'n(n - 3) / 2 = n → mindkét oldalt leosztva n-nel (mivel n > 0): (n - 3) / 2 = 1 → n - 3 = 2 → n = 5 (ötszög).',
    highlightValue: 'Ötszög'
  },
  {
    id: 'fp-l3-q6',
    title: 'Köbszámok sorozata',
    prompt: 'A köbszámok sorozata: 1, 8, 27, 64, 125... Mennyi a sorozat 6. eleme?',
    options: [
      '216 (mert 6³ = 216)',
      '180',
      '256',
      '343'
    ],
    correctAnswer: 0,
    explanation: 'Az n. köbszám képlete n³. A 6. elem: 6³ = 6 · 6 · 6 = 36 · 6 = 216.',
    highlightValue: '216'
  },
  {
    id: 'fp-l3-q7',
    title: 'Konvex tízszög átlói',
    prompt: 'Hány átlója van egy konvex tízszögnek (n = 10)?',
    options: [
      '35 átló (10 · 7 / 2 = 35)',
      '70 átló',
      '40 átló',
      '25 átló'
    ],
    correctAnswer: 0,
    explanation: 'Á = 10 · (10 - 3) / 2 = 10 · 7 / 2 = 70 / 2 = 35 átló.',
    highlightValue: '35 átló'
  },
  {
    id: 'fp-l3-q8',
    title: 'Pontrács kerületi pontjai',
    prompt: 'Egy n × n méretű négyzet alakú pontrács legkülső kerületén hány pont helyezkedik el?',
    options: [
      '4n - 4 (vagy 4(n - 1))',
      '4n',
      '4n - 2',
      'n² - 4'
    ],
    correctAnswer: 0,
    explanation: 'A 4 oldalon n pont van, de a 4 sarokpontot duplán számolnánk, ezért 4-et le kell vonni: 4n - 4 = 4(n - 1).',
    highlightValue: '4n - 4'
  },
  {
    id: 'fp-l3-q9',
    title: 'Mértani jellegű számsorozat',
    prompt: 'Melyik képlet fejezi ki a következő sorozat n. tagját: 1, 3, 7, 15, 31, 63... ?',
    options: [
      'f(n) = 2ⁿ - 1',
      'f(n) = 2n + 1',
      'f(n) = 2ⁿ + 1',
      'f(n) = 3ⁿ - 2'
    ],
    correctAnswer: 0,
    explanation: 'Figyeld meg a tagokat +1-gyel megnövelve: 2, 4, 8, 16, 32, 64... Ezek 2 hatványai (2ⁿ). Ezért a sorozat: 2ⁿ - 1.',
    highlightValue: '2ⁿ - 1'
  },
  {
    id: 'fp-l3-q10',
    title: 'Háromszögszámok különbsége',
    prompt: 'Mennyi két egymást követő háromszögszám különbsége: T_n - T_{n-1} = ?',
    options: [
      'Pontosan n',
      'Pontosan n - 1',
      'Mindig 1',
      'Pontosan 2n'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a háromszögszámok sorozatát úgy kapjuk, hogy az n. lépésben n-et adunk hozzá az előzőhöz (T_n = T_{n-1} + n), ezért a különbségük pontosan n.',
    highlightValue: 'n'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Mintázatok és Képletek',
    subtitle: 'Négyzet- és háromszögláncok, kézfogások képlete, háromszögszámok és átlók',
    range: '1-10. feladat • Alapvető szabályok',
    focus: 'Alapképletek és felismerés',
    questions: level1Questions
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és Táblázatok',
    subtitle: 'Konkrét értékek kiszámítása, házikólánc, másodfokú sorozatok és kerítések',
    range: '11-20. feladat • Kiszámítások',
    focus: 'Behelyettesítés és táblázatok',
    questions: level2Questions
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Összefüggések és Egyenletek',
    subtitle: 'Visszafelé számolás gyufáknál és kézfogásoknál, Gauss-összeg és algebrai bizonyítások',
    range: '21-30. feladat • Algebrai összefüggések',
    focus: 'Egyenletek és általánosítás',
    questions: level3Questions
  }
};

export const FindingPatternsQuiz: React.FC<FindingPatternsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="finding-patterns"
      topicTitle="Keressünk Összefüggéseket!"
      badge="VI. FEJEZET • 8. OSZTÁLY"
      documentId="finding-patterns-quiz-doc"
      pdfFilename="8_osztaly_keressunk_osszefuggeseket_kviz.pdf"
      title="Keressünk Összefüggéseket! Kvíz"
      subtitle="Mintázatok felismerése, számpárok szabályai, az n. tag algebrai kifejezése, gyufaláncok, háromszögszámok és átlók"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Kösd össze a mintázatokat, szabályokat és a kiszámított értékeket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Mintázatok és Nevezetes Képletek',
              subtitle: 'Kösd össze a gyufaszál-alakzatok és geometriai képletek párjait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapképletek',
              focus: 'Képletek'
            },
            2: {
              title: '2. Szint: Konkrét Értékek és Kiszámítások',
              subtitle: 'Párosítsd a sorszámokat a kiszámított értékekkel és hiányzó elemekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Kiszámítások',
              focus: 'Számítások'
            },
            3: {
              title: '3. Szint: Haladó Összefüggések és Algebra',
              subtitle: 'Találd meg az algebrai összefüggések, Gauss-összegek és egyenletek párjait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Algebra',
              focus: 'Összefüggések'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <FindingPatternsMatcher
              key={`fp-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Válogasd szét a sorozatokat növekedési típus és alkalmazási terület szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Növekedési Típusok',
              subtitle: 'Csoportosítsd: Lineáris (+d), Másodfokú (n²), vagy Exponenciális (·q)!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Növekedési típus',
              focus: 'Differenciák'
            },
            2: {
              title: '2. Szint: Képletek és Területek',
              subtitle: 'Válogasd szét: Sokszögek, Gyufaszál-alakzatok, vagy Kombinatorika!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Alkalmazási kör',
              focus: 'Kategorizálás'
            },
            3: {
              title: '3. Szint: Igaz, Hamis és Tévhitek',
              subtitle: 'Döntsd el a mintázatokról és szabályokról szóló állítások igazságtartalmát!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Állítások',
              focus: 'Kritikai megítélés'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <FindingPatternsSorter
              key={`fp-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default FindingPatternsQuiz;
