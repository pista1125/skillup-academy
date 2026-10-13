import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleCongruenceMatcher } from './TriangleCongruenceMatcher';
import { TriangleCongruenceSorter } from './TriangleCongruenceSorter';
import {
  Sparkles,
  Compass,
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  ArrowRightLeft,
  LayoutGrid,
  Ruler,
  Triangle,
  Scale
} from 'lucide-react';

interface TriangleCongruenceQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-sss',
    title: '1. o-o-o (SSS) Alapeset',
    formula: 'a = a\',  b = b\',  c = c\'',
    note: 'Feltétel: a + b > c, a + c > b, b + c > a (háromszög-egyenlőtlenség).',
    badge: '1. ALAPESET',
    figure: (
      <svg viewBox="0 0 160 80" className="w-36 h-14">
        <polygon points="20,68 140,68 75,15" fill="none" className="stroke-teal-600 stroke-2" />
        <line x1="80" y1="65" x2="80" y2="71" className="stroke-teal-700 stroke-2" />
        <line x1="45" y1="38" x2="51" y2="42" className="stroke-teal-700 stroke-2" />
        <line x1="105" y1="42" x2="111" y2="38" className="stroke-teal-700 stroke-2" />
      </svg>
    )
  },
  {
    id: 'cs-sas',
    title: '2. o-sz-o (SAS) Alapeset',
    formula: 'a = a\',  b = b\',  γ = γ\'',
    note: 'A szögnek KÖTELEZŐEN a két megadott oldal KÖZÖTT kell lennie!',
    badge: '2. ALAPESET',
    figure: (
      <svg viewBox="0 0 160 80" className="w-36 h-14">
        <polygon points="20,68 140,68 55,20" fill="none" className="stroke-blue-600 stroke-2" />
        <line x1="20" y1="68" x2="55" y2="20" className="stroke-blue-600 stroke-[3]" />
        <line x1="55" y1="20" x2="140" y2="68" className="stroke-blue-600 stroke-[3]" />
        <path d="M 45,34 A 18,18 0 0,0 70,28" fill="none" className="stroke-amber-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'cs-asa',
    title: '3. sz-o-sz (ASA) Alapeset',
    formula: 'c = c\',  α = α\',  β = β\'',
    note: 'Egy oldal és a rajta fekvő két szög egyenlő (α + β < 180°).',
    badge: '3. ALAPESET',
    figure: (
      <svg viewBox="0 0 160 80" className="w-36 h-14">
        <polygon points="20,68 140,68 85,20" fill="none" className="stroke-indigo-600 stroke-2" />
        <line x1="20" y1="68" x2="140" y2="68" className="stroke-indigo-600 stroke-[3.5]" />
        <path d="M 40,68 A 18,18 0 0,0 32,52" fill="none" className="stroke-amber-500 stroke-2" />
        <path d="M 120,68 A 18,18 0 0,1 128,52" fill="none" className="stroke-rose-500 stroke-2" />
      </svg>
    )
  },
  {
    id: 'cs-ssa',
    title: '4. o-o-sz (SsA) Alapeset',
    formula: 'a = a\',  b = b\',  α = α\'  (a ≥ b)',
    note: 'A szög a NAGYOBBIK oldallal néz szembe! (Különben 2 megoldás is lehet).',
    badge: '4. ALAPESET',
    figure: (
      <svg viewBox="0 0 160 80" className="w-36 h-14">
        <polygon points="20,68 140,68 45,20" fill="none" className="stroke-emerald-600 stroke-2" />
        <line x1="45" y1="20" x2="140" y2="68" className="stroke-emerald-600 stroke-[3.5]" />
        <path d="M 38,68 A 18,18 0 0,0 30,52" fill="none" className="stroke-amber-500 stroke-2" />
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a 4 Alapeset',
    subtitle: 'Ismerd fel az egybevágósági alapeseteket ábrák és jelölések alapján!',
    range: '1-10. Kérdés',
    focus: 'o-o-o, o-sz-o, sz-o-sz, o-o-sz definíciók és tévhitek',
    questions: [
      {
        id: 'q1-1',
        title: 'Egybevágóság fogalma',
        prompt: 'Mikor mondjuk azt, hogy két síkidom (pl. két háromszög) egybevágó?',
        questionTypeBadge: 'Alapfogalom',
        figure: (
          <svg viewBox="0 0 160 70" className="w-36 h-14 mx-auto">
            <polygon points="20,55 70,55 45,15" className="fill-teal-500/20 stroke-teal-600 stroke-2" />
            <polygon points="90,55 140,55 115,15" className="fill-teal-500/20 stroke-teal-600 stroke-2" />
            <text x="80" y="40" textAnchor="middle" className="text-sm font-bold fill-teal-600">≅</text>
          </svg>
        ),
        options: [
          'Ha egybevágósági transzformációval egymásba vihetők (alakjuk és méretük megegyezik)',
          'Ha csak a területük egyenlő',
          'Ha csak a szögeik egyenlők, de a méretük tetszőleges',
          'Ha a kerületük összege 180 cm'
        ],
        correctAnswer: 'Ha egybevágósági transzformációval egymásba vihetők (alakjuk és méretük megegyezik)',
        explanation: 'Két síkidom egybevágó, ha egybevágósági transzformációval (tükrözés, forgatás, eltolás) egymásba vihetők, azaz pontról pontra tökéletesen lefedik egymást.'
      },
      {
        id: 'q1-2',
        title: 'o-o-o (SSS) eset felismerése',
        prompt: 'Melyik egybevágósági alapesetet ábrázolja a rajz, ahol mindhárom oldal egyenlőségét jelöltük vonásokkal?',
        questionTypeBadge: 'o-o-o (SSS)',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="20,65 140,65 75,15" fill="none" className="stroke-teal-600 stroke-2" />
            <line x1="80" y1="62" x2="80" y2="68" className="stroke-teal-800 stroke-2" />
            <line x1="44" y1="38" x2="50" y2="42" className="stroke-teal-800 stroke-2" />
            <line x1="47" y1="41" x2="53" y2="45" className="stroke-teal-800 stroke-2" />
            <line x1="104" y1="42" x2="110" y2="38" className="stroke-teal-800 stroke-2" />
            <line x1="107" y1="45" x2="113" y2="41" className="stroke-teal-800 stroke-2" />
            <line x1="110" y1="48" x2="116" y2="44" className="stroke-teal-800 stroke-2" />
          </svg>
        ),
        options: ['o-o-o (oldal-oldal-oldal / SSS)', 'o-sz-o (SAS)', 'sz-sz-sz (AAA)', 'sz-o-sz (ASA)'],
        correctAnswer: 'o-o-o (oldal-oldal-oldal / SSS)',
        explanation: 'Mivel a háromszög mindhárom oldalpárja egyenlő hosszúságú (a = a\', b = b\', c = c\'), ez az o-o-o (SSS) alapeset.'
      },
      {
        id: 'q1-3',
        title: 'o-sz-o (SAS) eset felismerése',
        prompt: 'Milyen feltételnek kell teljesülnie az o-sz-o (SAS) alapesetnél a szög elhelyezkedésére vonatkozóan?',
        questionTypeBadge: 'o-sz-o (SAS)',
        figure: (
          <svg viewBox="0 0 160 75" className="w-36 h-15 mx-auto">
            <polygon points="20,65 140,65 55,20" fill="none" className="stroke-blue-600 stroke-2" />
            <line x1="20" y1="65" x2="55" y2="20" className="stroke-blue-600 stroke-[3.5]" />
            <line x1="55" y1="20" x2="140" y2="65" className="stroke-blue-600 stroke-[3.5]" />
            <path d="M 45,34 A 18,18 0 0,0 70,28" fill="none" className="stroke-amber-500 stroke-[2.5]" />
          </svg>
        ),
        options: [
          'A szögnek pontosan a két megadott oldal KÖZÖTT (közbezárt szögként) kell feküdnie',
          'A szög bármelyik csúcsnál lehet',
          'A szögnek mindig derékszögnek kell lennie',
          'A szögnek a leghosszabb oldallal kell szemben lennie'
        ],
        correctAnswer: 'A szögnek pontosan a két megadott oldal KÖZÖTT (közbezárt szögként) kell feküdnie',
        explanation: 'Az o-sz-o (SAS) tétel lényege, hogy a megadott szög a két ismert oldal által bezárt szög (γ).'
      },
      {
        id: 'q1-4',
        title: 'sz-o-sz (ASA) eset felismerése',
        prompt: 'Két háromszögben egy-egy oldal 8 cm, és a rajtuk fekvő szögek 40° és 65°. Egybevágó-e a két háromszög?',
        questionTypeBadge: 'sz-o-sz (ASA)',
        options: [
          'Igen, a sz-o-sz (ASA) alapeset alapján',
          'Nem, mert a harmadik oldalt nem ismerjük',
          'Csak akkor, ha derékszögű háromszögek',
          'Nem, mert 40° + 65° nem 180°'
        ],
        correctAnswer: 'Igen, a sz-o-sz (ASA) alapeset alapján',
        explanation: 'Egy oldal (c = 8 cm) és a rajta fekvő két szög (α = 40°, β = 65°) egyértelműen meghatározza a háromszöget a sz-o-sz alapeset szerint.'
      },
      {
        id: 'q1-5',
        title: 'o-o-sz (SsA) kritikus feltétele',
        prompt: 'Az o-o-sz (oldal-oldal-szög) alapesetnél melyik oldallal KELL szemben lennie a megadott szögnek?',
        questionTypeBadge: 'o-o-sz (SsA)',
        options: [
          'A két megadott oldal közül a NAGYOBBIKKAL',
          'A kisebbikkel',
          'Bármelyik oldallal',
          'Csak a legrövidebb oldallal'
        ],
        correctAnswer: 'A két megadott oldal közül a NAGYOBBIKKAL',
        explanation: 'Ha a szög a kisebbik oldallal szemben van, a körív két pontban is metszheti a szögszárat, így 2 különböző háromszög is létezhet. Ezért kötelező a nagyobbik oldal!'
      },
      {
        id: 'q1-6',
        title: 'sz-sz-sz (AAA) csapda',
        prompt: 'Igaz-e, hogy ha két háromszögnek mindhárom szöge páronként egyenlő (sz-sz-sz), akkor feltétlenül egybevágók?',
        questionTypeBadge: 'Tévhitek & Csapdák',
        figure: (
          <svg viewBox="0 0 160 65" className="w-36 h-13 mx-auto">
            <polygon points="20,55 55,55 37,20" fill="none" className="stroke-rose-600 stroke-2" />
            <polygon points="75,55 145,55 110,10" fill="none" className="stroke-rose-600 stroke-2" />
          </svg>
        ),
        options: [
          'Nem! A háromszögek ekkor csak hasonlóak (azonos alakúak, de méretük eltérhet)',
          'Igen, ez az ötödik alapeset',
          'Igen, mert a szögek meghatározzák az oldalakat is',
          'Csak tompaszögű háromszögek esetén igaz'
        ],
        correctAnswer: 'Nem! A háromszögek ekkor csak hasonlóak (azonos alakúak, de méretük eltérhet)',
        explanation: 'A sz-sz-sz (AAA) NEM egybevágósági eset! Például minden szabályos háromszög szögei 60°-osak, mégis létezik 2 cm-es és 100 cm-es oldalú szabályos háromszög is.'
      },
      {
        id: 'q1-7',
        title: 'Egyenlő kerület csapda',
        prompt: 'Két háromszög kerülete egyaránt K = 24 cm. Következik-e ebből, hogy a két háromszög egybevágó?',
        questionTypeBadge: 'Kerület & Terület',
        options: [
          'Nem, mert az oldalak aránya teljesen eltérhet (pl. 8,8,8 vs. 6,8,10 cm)',
          'Igen, mert azonos a méretük',
          'Igen, az o-o-o eset miatt',
          'Csak derékszögű háromszögeknél következik'
        ],
        correctAnswer: 'Nem, mert az oldalak aránya teljesen eltérhet (pl. 8,8,8 vs. 6,8,10 cm)',
        explanation: 'A kerület vagy terület egyenlősége önmagában nem jelent egybevágóságot, hiszen egy 8, 8, 8 cm-es szabályos és egy 6, 8, 10 cm-es derékszögű háromszög kerülete is 24 cm, de alakjuk teljesen eltérő.'
      },
      {
        id: 'q1-8',
        title: 'Egybevágóság jelölése csúcsok szerint',
        prompt: 'Ha ΔABC ≅ ΔDEF, akkor a betűsorrend alapján melyik oldalpár felel meg egymásnak kötelezően?',
        questionTypeBadge: 'Jelölési konvenció',
        options: [
          'AB = DE, BC = EF és AC = DF',
          'AB = EF és BC = DE',
          'A betűsorrend tetszőleges, bármelyik bármelyikkel párba állítható',
          'AC = DE és BC = DF'
        ],
        correctAnswer: 'AB = DE, BC = EF és AC = DF',
        explanation: 'A matematikai jelölésnél a betűk sorrendje a megfelelő csúcsokat jelöli: A-nak D, B-nek E, C-nek F felel meg, így AB = DE, BC = EF, AC = DF.'
      },
      {
        id: 'q1-9',
        title: 'Belső szögek összege',
        prompt: 'Egy háromszögben α = 55° és β = 65°. Mekkora a harmadik szög (γ)?',
        questionTypeBadge: 'Számítás',
        options: ['60°', '70°', '50°', '80°'],
        correctAnswer: '60°',
        explanation: 'Mivel a háromszög belső szögeinek összege mindig 180°, ezért γ = 180° - (55° + 65°) = 180° - 120° = 60°.'
      },
      {
        id: 'q1-10',
        title: 'Egyenlő szárú háromszögek egybevágósága',
        prompt: 'Két egyenlő szárú háromszög alapja 6 cm, szárai 9 cm hosszúak. Egybevágók-e?',
        questionTypeBadge: 'o-o-o eset',
        options: [
          'Igen, az o-o-o (SSS) alapeset alapján (oldalaik: 6, 9, 9 cm)',
          'Nem, mert a szögeket nem ismerjük',
          'Csak akkor, ha a szárak szöge hegyesszög',
          'Nem, mert egyenlő szárú háromszögekre nem érvényes a tétel'
        ],
        correctAnswer: 'Igen, az o-o-o (SSS) alapeset alapján (oldalaik: 6, 9, 9 cm)',
        explanation: 'Mivel mindkét háromszög oldalai 6 cm, 9 cm és 9 cm hosszúak, mindhárom oldalpáruk megegyezik, így az o-o-o eset alapján egybevágók.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szerkeszthetőség és Esetelemzés',
    subtitle: 'Határozd meg, melyik alapeset alkalmazható és mikor szerkeszthető egyértelműen a háromszög!',
    range: '11-20. Kérdés',
    focus: 'Szerkesztési alapesetek, háromszög-egyenlőtlenség, derékszögű háromszögek',
    questions: [
      {
        id: 'q2-1',
        title: 'Közbezárt szög azonosítása',
        prompt: 'Adottak az a = 7 cm, b = 5 cm oldalak és a γ = 40° szög. Melyik alapeset alapján szerkeszthető meg a háromszög?',
        questionTypeBadge: 'Esetfelismerés',
        options: [
          'o-sz-o (SAS), mert γ az a és b oldalak közbezárt szöge',
          'o-o-sz (SsA)',
          'sz-o-sz (ASA)',
          'Nem szerkeszthető meg, mert nincs meg a c oldal'
        ],
        correctAnswer: 'o-sz-o (SAS), mert γ az a és b oldalak közbezárt szöge',
        explanation: 'A háromszögben a C csúcsnál lévő γ szög az a (BC) és b (AC) oldalak által bezárt szög, így ez pontosan az o-sz-o (SAS) eset.'
      },
      {
        id: 'q2-2',
        title: 'Kisebb oldallal szemközti szög veszélye',
        prompt: 'Adottak: a = 6 cm, b = 9 cm és α = 30°. Miért NEM alkalmazható közvetlenül az o-o-sz egybevágósági alapeset?',
        questionTypeBadge: 'SsA feltétel',
        figure: (
          <svg viewBox="0 0 160 70" className="w-36 h-14 mx-auto">
            <line x1="20" y1="55" x2="140" y2="55" className="stroke-slate-400 stroke-1 stroke-dasharray-[2,2]" />
            <line x1="20" y1="55" x2="80" y2="15" className="stroke-blue-600 stroke-2" />
            <path d="M 100,55 A 40,40 0 0,0 60,55" fill="none" className="stroke-rose-500 stroke-2" />
            <text x="50" y="30" className="text-[9px] fill-blue-600 font-bold">b=9</text>
            <text x="35" y="52" className="text-[9px] fill-amber-600 font-bold">α=30°</text>
          </svg>
        ),
        options: [
          'Mert az α szög a KISEBBIK oldallal (a = 6 cm < 9 cm) néz szembe',
          'Mert 30° túl kicsi szög',
          'Mert a + b = 15 cm páratlan szám',
          'Mert hiányzik a γ szög'
        ],
        correctAnswer: 'Mert az α szög a KISEBBIK oldallal (a = 6 cm < 9 cm) néz szembe',
        explanation: 'Mivel a = 6 cm < b = 9 cm, a megadott szög a kisebbik oldallal néz szembe. Ilyenkor a szerkesztés során a körív két pontban is metszheti a szögszárat, tehát 2 nem egybevágó háromszög is létezhet!'
      },
      {
        id: 'q2-3',
        title: 'Háromszög-egyenlőtlenség ellenőrzése',
        prompt: 'Megszerkeszthető-e a háromszög, ha a = 4 cm, b = 5 cm és c = 10 cm?',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        options: [
          'Nem, mert 4 + 5 = 9 cm < 10 cm (nem érik el egymást a körívek)',
          'Igen, az o-o-o alapeset szerint',
          'Igen, mert mindhárom oldal pozitív szám',
          'Csak akkor, ha tompaszögű háromszög'
        ],
        correctAnswer: 'Nem, mert 4 + 5 = 9 cm < 10 cm (nem érik el egymást a körívek)',
        explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összege nagyobb kell legyen a harmadiknál. Mivel 4 + 5 = 9 < 10, a két körív nem metszi egymást, a háromszög nem létezik.'
      },
      {
        id: 'q2-4',
        title: 'Derékszögű háromszög átfogója és befogója',
        prompt: 'Két derékszögű háromszög átfogója 10 cm, és egyik befogójuk 6 cm. Egybevágók-e?',
        questionTypeBadge: 'Derékszögű háromszögek',
        options: [
          'Igen, az o-o-sz eset alapján (az átfogó a legnagyobb oldal, szemközt a 90°-kal)',
          'Nem, mert a másik befogót nem ismerjük',
          'Csak akkor, ha a hegyesszögeik is adottak',
          'Nem, derékszögű háromszögekre más szabályok vonatkoznak'
        ],
        correctAnswer: 'Igen, az o-o-sz eset alapján (az átfogó a legnagyobb oldal, szemközt a 90°-kal)',
        explanation: 'A derékszögű háromszögben az átfogó mindig a leghosszabb oldal, és vele szemben fekszik a 90°-os szög. Így teljesül az o-o-sz feltétel (a nagyobbik oldallal szemközti szög egyenlő).'
      },
      {
        id: 'q2-5',
        title: 'Szögösszeg kizáró feltétel',
        prompt: 'Szerkeszthető-e háromszög a következő adatokkal: c = 8 cm, α = 75°, β = 110°?',
        questionTypeBadge: 'sz-o-sz feltétel',
        options: [
          'Nem, mert α + β = 185° > 180° (a szögszárak széttartanak, nem metszik egymást)',
          'Igen, mert a c oldal tetszőlegesen felvehető',
          'Igen, a sz-o-sz alapeset alapján',
          'Csak akkor, ha negatív szög keletkezik'
        ],
        correctAnswer: 'Nem, mert α + β = 185° > 180° (a szögszárak széttartanak, nem metszik egymást)',
        explanation: 'Egy háromszögben a belső szögek összege 180°. Mivel már a két megadott szög összege 75° + 110° = 185° > 180°, a szögszárak a félsíkban soha nem találkoznak, háromszög nem hozható létre.'
      },
      {
        id: 'q2-6',
        title: 'A szerkesztés 1. lépése',
        prompt: 'Mi a geometriai szerkesztések első kötelező lépése a pontozás szerint?',
        questionTypeBadge: 'Szerkesztési lépések',
        options: [
          'Vázlatkészítés szabadkézzel és a megadott adatok színessel való jelölése',
          'A háromszög azonnali kihúzása tusvonallal',
          'A segédvonalak kiradírozása',
          'A kerület és terület kiszámítása zsebszámológéppel'
        ],
        correctAnswer: 'Vázlatkészítés szabadkézzel és a megadott adatok színessel való jelölése',
        explanation: 'A szerkesztés 1. lépése mindig a szabadkézi vázlatrajz elkészítése, ahol színessel jelöljük az ismert adatokat, és átlátjuk, melyik alapesetről van szó.'
      },
      {
        id: 'q2-7',
        title: 'Egybevágóság és terület azonossága',
        prompt: 'Ha ΔABC ≅ ΔA\'B\'C\' és a ΔABC területe T = 28 cm², mekkora a ΔA\'B\'C\' területe?',
        questionTypeBadge: 'Területi összefüggés',
        options: ['Pontosan 28 cm²', '14 cm²', '56 cm²', 'Nem határozható meg az oldalak hossza nélkül'],
        correctAnswer: 'Pontosan 28 cm²',
        explanation: 'Egybevágó alakzatok területe mindig megegyezik: T = T\' = 28 cm².'
      },
      {
        id: 'q2-8',
        title: 'Körzőnyílás beállítása o-o-o szerkesztésnél',
        prompt: 'Háromszög szerkesztésekor c = 7 cm, a = 5 cm, b = 4 cm. Milyen sugarú köríveket kell húzni az A és B pontokból a C csúcs meghatározásához?',
        questionTypeBadge: 'Körzős kivitelezés',
        options: [
          'A-ból r = 4 cm (b oldal), B-ből r = 5 cm (a oldal)',
          'Mindkét pontból r = 7 cm sugarú körívet',
          'A-ból r = 5 cm, B-ből r = 4 cm',
          'A felezőpontból r = 3,5 cm sugarú kört'
        ],
        correctAnswer: 'A-ból r = 4 cm (b oldal), B-ből r = 5 cm (a oldal)',
        explanation: 'A C csúcs távolsága A-tól pontosan a b oldal (4 cm), B-től pedig az a oldal (5 cm). Ezért A körül 4 cm-es, B körül 5 cm-es körívet kell húzni.'
      },
      {
        id: 'q2-9',
        title: 'Szabályos háromszög szerkesztése',
        prompt: 'Egy szabályos háromszög oldala a = 6 cm. Hány adat megadására van szükségünk a szerkesztéshez?',
        questionTypeBadge: 'Szabályos háromszög',
        options: [
          'Elég az 1 megadott oldal, mert ekkor mindhárom oldal 6 cm (o-o-o eset)',
          'Legalább 3 különböző számadat szükséges',
          'Két oldal és egy szög',
          'Mindenképpen szükséges a magasság hossza is'
        ],
        correctAnswer: 'Elég az 1 megadott oldal, mert ekkor mindhárom oldal 6 cm (o-o-o eset)',
        explanation: 'Szabályos háromszög esetén mindhárom oldal egyenlő (a = b = c = 6 cm), így az egyetlen oldal megadása valójában mindhárom oldalt meghatározza (o-o-o eset).'
      },
      {
        id: 'q2-10',
        title: 'Tengelyes tükrözés hatása az egybevágóságra',
        prompt: 'Ha egy háromszöget tükrözünk egy tetszőleges síkbeli egyenesre, egybevágó lesz-e a képe az eredetivel?',
        questionTypeBadge: 'Geometriai transzformációk',
        options: [
          'Igen, mert a tengelyes tükrözés egybevágósági transzformáció (távolságtartó és szögtartó)',
          'Nem, mert a körüljárási iránya megfordul',
          'Csak akkor, ha a tükörtengely átmegy a háromszögön',
          'Csak szabályos háromszögek esetén'
        ],
        correctAnswer: 'Igen, mert a tengelyes tükrözés egybevágósági transzformáció (távolságtartó és szögtartó)',
        explanation: 'A tengelyes tükrözés távolságtartó és szögtartó transzformáció, így a keletkezett kép mindig egybevágó az eredeti alakzattal (bár körüljárási iránya ellenkezőre vált).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesteri Esetek és Diszkusszió',
    subtitle: 'Oldj meg komplex geometriai feladványokat, diszkussziót és több megoldásos szerkesztéseket!',
    range: '21-30. Kérdés',
    focus: '2 megoldásos esetek, logikai bizonyítások, szerkesztési lépések rekonstruálása',
    questions: [
      {
        id: 'q3-1',
        title: 'Két megoldás az o-o-sz szerkesztésben',
        prompt: 'Legyen b = 8 cm, a = 5 cm és α = 30° (α szemközt van a kisebbik a oldallal). Hány egymással NEM egybevágó háromszög szerkeszthető a felső félsíkban?',
        questionTypeBadge: 'Diszkusszió',
        figure: (
          <svg viewBox="0 0 180 75" className="w-40 h-15 mx-auto">
            <line x1="20" y1="60" x2="160" y2="60" className="stroke-slate-400 stroke-1 stroke-dasharray-[2,2]" />
            <line x1="20" y1="60" x2="80" y2="20" className="stroke-blue-600 stroke-2" />
            <line x1="80" y1="20" x2="55" y2="60" className="stroke-rose-600 stroke-2" />
            <line x1="80" y1="20" x2="115" y2="60" className="stroke-emerald-600 stroke-2" />
            <text x="50" y="70" className="text-[8px] font-bold fill-rose-600">B₁ (tompa)</text>
            <text x="115" y="70" className="text-[8px] font-bold fill-emerald-600">B₂ (hegyes)</text>
          </svg>
        ),
        options: [
          'Pontosan 2 különböző háromszög (egy hegyesszögű és egy tompaszögű)',
          'Csak 1 háromszög',
          'Végtelen sok háromszög',
          '0 megoldás, mert a feladat hibás'
        ],
        correctAnswer: 'Pontosan 2 különböző háromszög (egy hegyesszögű és egy tompaszögű)',
        explanation: 'Mivel a = 5 cm nagyobb, mint a magasság (m = 8 · sin 30° = 4 cm), de kisebb mint b = 8 cm, a körív két pontban metszi a szögszárat: B₁ és B₂ csúcsokat adva. Így 2 nem egybevágó háromszög keletkezik!'
      },
      {
        id: 'q3-2',
        title: 'Két oldal és a kerület egyenlősége',
        prompt: 'Két háromszögben a = a\', b = b\' és a kerületek is megegyeznek: K = K\'. Egybevágó-e a két háromszög?',
        questionTypeBadge: 'Logikai bizonyítás',
        options: [
          'Igen, mert c = K - a - b = K\' - a\' - b\' = c\', így az o-o-o (SSS) eset miatt egybevágók',
          'Nem, mert a szögek eltérhetnek',
          'Csak akkor, ha derékszögűek',
          'Nem határozható meg'
        ],
        correctAnswer: 'Igen, mert c = K - a - b = K\' - a\' - b\' = c\', így az o-o-o (SSS) eset miatt egybevágók',
        explanation: 'Mivel c = K - (a + b) és a másikban c\' = K\' - (a\' + b\'), és az ismert értékek megegyeznek, ezért c = c\'. Ekkor mindhárom oldalpár egyenlő, ami az o-o-o alapeset!'
      },
      {
        id: 'q3-3',
        title: 'Egybevágó háromszögek magasságvonalai',
        prompt: 'Ha ΔABC ≅ ΔA\'B\'C\', igaz-e, hogy az azonos oldalakhoz tartozó magasságvonalak is egyenlő hosszúak (m_a = m_a\')?',
        questionTypeBadge: 'Nevezetes vonalak',
        options: [
          'Igen, egybevágó háromszögek minden megfelelő szakasza (magasság, súlyvonal, szögfelező) egyenlő',
          'Nem, csak a kerület és a terület egyenlő',
          'Csak szabályos háromszögek esetén',
          'Csak a súlyvonalak egyenlők, a magasságok nem'
        ],
        correctAnswer: 'Igen, egybevágó háromszögek minden megfelelő szakasza (magasság, súlyvonal, szögfelező) egyenlő',
        explanation: 'Egybevágó alakzatoknál a megfelelő csúcsok és oldalak távolságai is azonosak, így a megfelelő magasságok, súlyvonalak és szögfelezők hossza is pontosan megegyezik.'
      },
      {
        id: 'q3-4',
        title: 'Szerkesztési lépések rekonstruálása',
        prompt: 'A szerkesztési füzetben azt látjuk, hogy a c alapszakasz után a szerkesztő az A végpontból r = 6 cm-es, a B végpontból r = 5 cm-es körívet húzott. Melyik alapeset szerkesztése ez?',
        questionTypeBadge: 'Szerkesztési eljárás',
        options: ['o-o-o (SSS) alapeset', 'o-sz-o (SAS) alapeset', 'sz-o-sz (ASA) alapeset', 'sz-sz-sz alapeset'],
        correctAnswer: 'o-o-o (SSS) alapeset',
        explanation: 'Amikor egy felmért alapszakasz két végpontjából körívezéssel keressük meg a harmadik csúcsot, mindhárom oldal ismert, ez az o-o-o (SSS) szerkesztés.'
      },
      {
        id: 'q3-5',
        title: 'Pitagorasz-tétellel kombinált egybevágóság',
        prompt: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Egy másik derékszögű háromszög átfogója 10 cm, egyik befogója 8 cm. Egybevágók-e?',
        questionTypeBadge: 'Kombinált geometria',
        options: [
          'Igen, mert az első átfogója √(6² + 8²) = 10 cm, így minden oldaluk megegyezik (6, 8, 10 cm)',
          'Nem, mert a megadott adatok fajtája nem azonos',
          'Csak akkor, ha a hegyesszögek 45°-osak',
          'Nem dönthető el'
        ],
        correctAnswer: 'Igen, mert az első átfogója √(6² + 8²) = 10 cm, így minden oldaluk megegyezik (6, 8, 10 cm)',
        explanation: 'A Pitagorasz-tétel alapján az első háromszög átfogója √(36+64) = 10 cm, a második másik befogója pedig √(100-64) = 6 cm. Mindkét háromszög oldalai 6, 8, 10 cm, így egybevágók!'
      },
      {
        id: 'q3-6',
        title: 'Szögfelező pontjainak távolsági tulajdonsága',
        prompt: 'Egy szögfelező tetszőleges pontja...',
        questionTypeBadge: 'Alapszerkesztések elmélete',
        options: [
          'Egyenlő távol van a szög két szárától (szögszárakra bocsátott merőlegesek azonosak)',
          'Felezi a szemközti oldalt',
          'Mindig 90°-os szöget zár be az alappal',
          'Egyenlő távol van a háromszög csúcsaitól'
        ],
        correctAnswer: 'Egyenlő távol van a szög két szárától (szögszárakra bocsátott merőlegesek azonosak)',
        explanation: 'A szögfelező azon pontok mértani helye a síkban, amelyek egyenlő távolságra vannak a szög két szárától.'
      },
      {
        id: 'q3-7',
        title: 'Szakaszfelező merőleges geometriai helye',
        prompt: 'A szakaszfelező merőleges egyenes pontjai...',
        questionTypeBadge: 'Alapszerkesztések elmélete',
        options: [
          'Egyenlő távol vannak a szakasz két végpontjától',
          'Egyenlő távol vannak a háromszög súlypontjától',
          'Átmennek a szemközti csúcson',
          'Felezik a háromszög területét'
        ],
        correctAnswer: 'Egyenlő távol vannak a szakasz két végpontjától',
        explanation: 'A szakaszfelező merőleges azon pontok mértani helye a síkban, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak.'
      },
      {
        id: 'q3-8',
        title: 'Hamis állítás kiszűrése',
        prompt: 'Tudjuk, hogy ΔABC ≅ ΔKLM. Melyik állítás biztosan HAMIS az alábbiak közül?',
        questionTypeBadge: 'Logikai tagadás',
        options: [
          'AB = LM',
          'AB = KL',
          'BC = LM',
          'AC = KM'
        ],
        correctAnswer: 'AB = LM',
        explanation: 'A betűsorrend alapján A↔K, B↔L, C↔M. Ezért AB = KL, BC = LM és AC = KM. Az AB = LM állítás hamis, mert AB nem az LM-nek felel meg.'
      },
      {
        id: 'q3-9',
        title: 'Egybevágóság eltolás és forgatás után',
        prompt: 'Ha a ΔABC háromszöget eltoljuk v vektorral, majd az új alakzatot elforgatjuk 120°-kal, hogyan viszonyul a kapott háromszög az eredetihez?',
        questionTypeBadge: 'Transzformációk összetétele',
        options: [
          'Egybevágó marad az eredetivel, mert az eltolás és a forgatás is egybevágósági transzformáció',
          'Kétszeresére nő a területe',
          'Csak hasonló lesz, de nem egybevágó',
          'Megváltozik a belső szögeinek összege'
        ],
        correctAnswer: 'Egybevágó marad az eredetivel, mert az eltolás és a forgatás is egybevágósági transzformáció',
        explanation: 'Egybevágósági transzformációk tetszőleges egymásutánja (összetétele) ismét egybevágósági transzformáció, így a létrejött alakzat teljesen egybevágó marad az eredetivel.'
      },
      {
        id: 'q3-10',
        title: 'Diszkusszió összegzése',
        prompt: 'Ha a megadott adatok kielégítik a 4 alapeset valamelyikét és a geometriai feltételeket (egyenlőtlenség, szögösszeg), akkor a feladatnak a síkban...',
        questionTypeBadge: 'Összegző tétel',
        options: [
          'Pontosan 1 egyértelmű megoldása van (a síkban megszerkesztett háromszögek mind egybevágók)',
          'Végtelen sok nem egybevágó megoldása van',
          'Csak közelítő megoldása lehet',
          'Mindig 2 különböző megoldása van'
        ],
        correctAnswer: 'Pontosan 1 egyértelmű megoldása van (a síkban megszerkesztett háromszögek mind egybevágók)',
        explanation: 'A 4 alapeset pontosan azt jelenti, hogy az adatok egyértelműen meghatározzák a háromszöget, így a kapott megoldások egymással mind egybevágók.'
      }
    ]
  }
};

export const TriangleCongruenceQuiz: React.FC<TriangleCongruenceQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g7-geom-triangle-congruence-quiz"
      chapterId="geometria"
      grade={7}
      topicBadge="7. OSZTÁLY • VII. GEOMETRIA • 1. LECKE"
      title="1. Egybevágó Háromszögek, Szerkesztések Kvíz"
      subtitle=""
      cheatSheetTitle="Egybevágósági Esetek Képtára & Szabályok"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={
        <TriangleCongruenceMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <TriangleCongruenceSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default TriangleCongruenceQuiz;
