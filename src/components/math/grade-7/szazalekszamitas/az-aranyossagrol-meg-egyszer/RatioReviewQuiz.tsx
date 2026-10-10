import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { RatioReviewMatcher } from './RatioReviewMatcher';
import { RatioReviewSorter } from './RatioReviewSorter';
import {
  Scale,
  Split,
  Calculator,
  Percent,
  Layers,
  Sparkles,
  TrendingUp,
  PieChart
} from 'lucide-react';

interface RatioReviewQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Az Arány Fogalma és Tulajdonságai',
    icon: <Scale className="w-4 h-4 text-blue-600" />,
    formula: 'a : b = a / b (b ≠ 0)',
    note: 'Két szám vagy mennyiség aránya a hányadosuk. Azt fejezi ki, hogy az első hányszorosa a másodiknak. A sorrend kötött: a : b ≠ b : a!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="12" width="40" height="26" rx="6" className="fill-blue-100 stroke-blue-400" />
        <text x="35" y="29" textAnchor="middle" className="text-[12px] font-mono font-bold fill-blue-800">16</text>
        <text x="65" y="30" textAnchor="middle" className="text-[14px] font-mono font-black fill-slate-400">:</text>
        <rect x="75" y="12" width="40" height="26" rx="6" className="fill-amber-100 stroke-amber-400" />
        <text x="95" y="29" textAnchor="middle" className="text-[12px] font-mono font-bold fill-amber-800">24</text>
        <text x="125" y="30" textAnchor="middle" className="text-[12px] font-mono font-bold fill-emerald-600">= 2:3</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Arányok Egyszerűsítése & Törtek',
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    formula: 'LNKO osztás / Közös nevező',
    note: 'Tizedeseknél szorozz 10-zel/100-zal: 1,5 : 6,75 = 150 : 675 = 2 : 9. Törteknél hozz közös nevezőre: 1/2 : 3/4 = 2/4 : 3/4 = 2 : 3.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="25" y="30" className="text-[11px] font-mono font-bold fill-indigo-700">1/2 : 3/4</text>
        <path d="M 75 25 L 90 25" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="100" y="30" className="text-[12px] font-mono font-extrabold fill-emerald-600">2 : 3</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Az Arányos Osztás 3 Lépése',
    icon: <Split className="w-4 h-4 text-emerald-600" />,
    formula: '1 egység = Összeg / Részek összege',
    note: '1. lépés: Részek összege (a + b + c). 2. lépés: Egy rész = Teljes mennyiség / Összes rész. 3. lépés: Részek szorzása és ellenőrzés.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="15" width="40" height="20" rx="4" className="fill-blue-500" />
        <rect x="55" y="15" width="40" height="20" rx="4" className="fill-emerald-500" />
        <rect x="95" y="15" width="40" height="20" rx="4" className="fill-amber-500" />
        <text x="80" y="47" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">3 rész : 2 rész : 1 rész</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Geometria & Kerület Csapda',
    icon: <TrendingUp className="w-4 h-4 text-rose-600" />,
    formula: 'Téglalap: K = 2(a + b) → a + b = K / 2!',
    note: 'Téglalapnál a félkerületet (a + b) osztjuk fel a részek összegével! Háromszögnél a hegyesszögek összege 90°, a belső szögeké 180°.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="10" width="55" height="30" rx="2" className="fill-none stroke-rose-500 stroke-2" />
        <text x="52" y="28" textAnchor="middle" className="text-[9px] font-mono font-bold fill-rose-700">K = 66 cm</text>
        <text x="115" y="28" textAnchor="middle" className="text-[10px] font-mono font-bold fill-indigo-700">a+b = 33 cm</text>
      </svg>
    )
  }
];

const ratioReviewQuestions: Question[] = [
  // ==========================================
  // 1. SZINT: KÖNNYŰ (1 - 10)
  // ==========================================
  {
    id: 'q1',
    level: 1,
    question: 'Mi két szám vagy mennyiség arányának matematikai meghatározása?',
    options: [
      'A két szám összege',
      'A két szám szorzata',
      'A két szám hányadosa (a : b = a / b, ahol b ≠ 0)',
      'A két szám különbsége'
    ],
    correctAnswer: 2,
    explanation: 'Két szám vagy mennyiség aránya definíció szerint a két szám hányadosa: a : b = a / b (b ≠ 0). Azt fejezi ki, hogy az első szám hányszorosa a másodiknak.',
    hint: 'Gondolj az osztás műveletére és a törtvonalra!'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Egyszerűsítsd a 14 : 18 arányt a legkisebb egész számok alakjára!',
    options: ['7 : 9', '2 : 3', '14 : 9', '7 : 18'],
    correctAnswer: 0,
    explanation: 'Mindkét szám páros, így eloszthatók 2-vel: 14 : 2 = 7 és 18 : 2 = 9. A legegyszerűbb egész alak 7 : 9.',
    hint: 'Keresd a 14 és 18 legnagyobb közös osztóját (LNKO)!'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Egyszerűsítsd a 20 : 25 arányt a legegyszerűbb alakra!',
    options: ['2 : 5', '4 : 5', '5 : 4', '10 : 15'],
    correctAnswer: 1,
    explanation: 'Mindkét szám osztható 5-tel: 20 : 5 = 4 és 25 : 5 = 5. A helyes egyszerűsített arány 4 : 5.',
    hint: 'Mivel mindkét szám 0-ra vagy 5-re végződik, 5-tel oszthatók.'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Egy osztályban a lányok és a fiúk aránya 2 : 3. Ha az osztályban 10 lány tanul, hány fiú jár az osztályba?',
    options: ['12', '14', '15', '20'],
    correctAnswer: 2,
    explanation: 'A lányok száma 2 egységnek felel meg, tehát 1 egység = 10 : 2 = 5 fő. A fiúk száma 3 egység: 3 · 5 = 15 fő.',
    hint: 'Számold ki, hány tanuló felel meg 1 arányegységnek!'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Írd fel egész számok legkisebb arányaként: 1/2 : 3/4!',
    options: ['1 : 3', '2 : 3', '3 : 4', '4 : 6'],
    correctAnswer: 1,
    explanation: 'Közös nevezőre hozva: 1/2 = 2/4. Így 2/4 : 3/4 = 2 : 3. (Vagy reciprokkal szorozva: 1/2 · 4/3 = 4/6 = 2/3 → 2 : 3).',
    hint: 'Hozd a két törtet közös nevezőre (nevező: 4)!'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Egy 60 cm-es szalagot 2 : 3 arányban vágunk ketté. Hány egyenlő részre osztjuk fel a szalagot összesen?',
    options: ['3 részre', '5 részre', '6 részre', '10 részre'],
    correctAnswer: 1,
    explanation: 'Az arányos osztás 1. lépése a részek összeadása: 2 + 3 = 5 egyenlő részre osztjuk az egész szalagot.',
    hint: 'Add össze az arányszámokat: 2 + 3!'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Osszuk fel az 56-ot 3 : 5 arányban! Mekkorák a kapott részek?',
    options: ['21 és 35', '20 és 36', '18 és 38', '24 és 32'],
    correctAnswer: 0,
    explanation: 'Részek száma: 3 + 5 = 8 rész. 1 rész értéke: 56 : 8 = 7. A két rész: 3 · 7 = 21 és 5 · 7 = 35. Ellenőrzés: 21 + 35 = 56.',
    hint: '56 : (3 + 5) = ? Majd szorozd meg 3-mal és 5-tel!'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Két szám aránya 4 : 5. Ha a kisebbik szám 28, mekkora a nagyobbik szám?',
    options: ['30', '32', '35', '40'],
    correctAnswer: 2,
    explanation: 'A kisebbik szám 4 résznek felel meg: 1 rész = 28 : 4 = 7. A nagyobbik szám 5 rész: 5 · 7 = 35.',
    hint: 'A 28 a 4 résznek felel meg. Mennyi 1 rész?'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Írd fel egész számok legegyszerűbb arányaként: 3/9 : 7/9!',
    options: ['1 : 7', '3 : 7', '7 : 3', '9 : 21'],
    correctAnswer: 1,
    explanation: 'Mivel a két tört nevezője megegyezik (9), az arányuk egyszerűen a számlálóik aránya: 3 : 7.',
    hint: 'Azonos nevezőknél az arány megegyezik a számlálók arányával.'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Egy tálcán 6 túrós és 18 lekváros pogácsa van. Mi a túrós és lekváros pogácsák aránya a legegyszerűbb alakban?',
    options: ['1 : 2', '1 : 3', '2 : 3', '3 : 1'],
    correctAnswer: 1,
    explanation: 'A túrós és lekváros darabszám aránya 6 : 18. Mindkét számot 6-tal osztva: 1 : 3.',
    hint: '6 : 18 = ? Oszd el mindkét tagot 6-tal!'
  },

  // ==========================================
  // 2. SZINT: KÖZEPES (11 - 20)
  // ==========================================
  {
    id: 'q11',
    level: 2,
    question: 'Írd fel két egész szám legegyszerűbb arányaként a következő tizedes törteket: 1,5 : 6,75!',
    options: ['1 : 4', '2 : 9', '3 : 13', '2 : 7'],
    correctAnswer: 1,
    explanation: 'Szorozzuk meg mindkét tagot 100-zal, hogy egész számokat kapjunk: 150 : 675. Mindkettő osztható 75-tel (LNKO): 150 : 75 = 2, és 675 : 75 = 9. Tehát 2 : 9.',
    hint: 'Először szorozz 100-zal: 150 : 675, majd keresd a közös osztókat (pl. 25, majd 3)!'
  },
  {
    id: 'q12',
    level: 2,
    question: 'Írd fel egész számok legegyszerűbb arányaként: 3/5 : 8/20!',
    options: ['3 : 8', '3 : 2', '6 : 5', '15 : 8'],
    correctAnswer: 1,
    explanation: 'A második tört egyszerűsíthető: 8/20 = 2/5. Így az arány 3/5 : 2/5 = 3 : 2.',
    hint: 'Egyszerűsítsd a 8/20 törtet 4-gyel!'
  },
  {
    id: 'q13',
    level: 2,
    question: 'Alma és Zoé osztálykirándulására befizetendő összegek aránya 11 : 13. A két kirándulás összesen 14 400 Ft-ba kerül. Mennyibe került Zoé drágább kirándulása?',
    options: ['6600 Ft', '7200 Ft', '7800 Ft', '8400 Ft'],
    correctAnswer: 2,
    explanation: 'Részek száma: 11 + 13 = 24 rész. 1 rész = 14 400 : 24 = 600 Ft. Zoé kirándulása a 13 rész: 13 · 600 = 7800 Ft. (Alma kirándulása: 11 · 600 = 6600 Ft).',
    hint: 'Oszd el a 14 400 Ft-ot 24-gyel, majd szorozz 13-mal!'
  },
  {
    id: 'q14',
    level: 2,
    question: 'Két testvér életkorának összege 42 év, életkoruk aránya 8 : 6. Hány éves a fiatalabb testvér?',
    options: ['14 éves', '16 éves', '18 éves', '21 éves'],
    correctAnswer: 2,
    explanation: 'Részek száma: 8 + 6 = 14 rész. 1 rész értéke: 42 : 14 = 3 év. A fiatalabb testvér 6 rész: 6 · 3 = 18 éves. (Az idősebb: 8 · 3 = 24 éves).',
    hint: '42 : (8 + 6) = ? Majd szorozd meg 6-tal!'
  },
  {
    id: 'q15',
    level: 2,
    question: 'Két szám összege 546, arányuk 4 : 9. Mennyi a két szám közül a nagyobbik?',
    options: ['336', '378', '392', '412'],
    correctAnswer: 1,
    explanation: 'Részek száma: 4 + 9 = 13 rész. 1 rész értéke: 546 : 13 = 42. A nagyobbik szám a 9 rész: 9 · 42 = 378. (A kisebbik: 4 · 42 = 168).',
    hint: '546 : 13 = 42. Mennyi 9 · 42?'
  },
  {
    id: 'q16',
    level: 2,
    question: 'Osszuk fel a 6300-at 2 : 3 : 4 arányban! Mekkora a legkisebb kapott rész?',
    options: ['1200', '1400', '1500', '2100'],
    correctAnswer: 1,
    explanation: 'Részek összege: 2 + 3 + 4 = 9 rész. 1 rész értéke: 6300 : 9 = 700. A legkisebb rész a 2 arányú: 2 · 700 = 1400. (A többi rész: 2100 és 2800).',
    hint: '6300 : (2 + 3 + 4) = 700. A legkisebb tag 2 rész.'
  },
  {
    id: 'q17',
    level: 2,
    question: 'Két szám aránya 2 : 7, a két szám KÜLÖNBSÉGE 45. Melyik a kisebbik szám?',
    options: ['10', '14', '18', '24'],
    correctAnswer: 2,
    explanation: 'Mivel a KÜLÖNBSÉG van megadva, az arányszámok különbségét vesszük: 7 - 2 = 5 rész. 5 rész = 45 → 1 rész = 45 : 5 = 9. A kisebbik szám: 2 · 9 = 18. (A nagyobbik: 7 · 9 = 63, és 63 - 18 = 45).',
    hint: 'Figyelem! Nem az összegük, hanem a különbségük 45! Hány rész a különbség?'
  },
  {
    id: 'q18',
    level: 2,
    question: 'Egy derékszögű háromszög két hegyesszögének aránya 1 : 4. Hány fokos a kisebbik hegyesszög?',
    options: ['15°', '18°', '20°', '22,5°'],
    correctAnswer: 1,
    explanation: 'A derékszögű háromszög két hegyesszögének összege 90°. Részek száma: 1 + 4 = 5 rész. 1 rész = 90° : 5 = 18°. A kisebb hegyesszög 1 · 18° = 18°. (A nagyobb: 4 · 18° = 72°).',
    hint: 'A két hegyesszög összege 90° (mert 180° - 90° = 90°).'
  },
  {
    id: 'q19',
    level: 2,
    question: '24 darab könyvutalványt az 1., 2. és 3. helyezett között 3 : 2 : 1 arányban osztanak szét. Hány utalványt kap az első helyezett?',
    options: ['8 db', '10 db', '12 db', '15 db'],
    correctAnswer: 2,
    explanation: 'Részek összege: 3 + 2 + 1 = 6 rész. 1 rész értéke: 24 : 6 = 4 db utalvány. Az 1. helyezett 3 részt kap: 3 · 4 = 12 db utalvány.',
    hint: '24 : (3 + 2 + 1) = 4 utalvány egy egység.'
  },
  {
    id: 'q20',
    level: 2,
    question: 'Írd fel egész számok legkisebb arányaként: 1 1/2 : 7/8!',
    options: ['3 : 7', '6 : 7', '12 : 7', '14 : 3'],
    correctAnswer: 2,
    explanation: 'Írjuk át a vegyes számot áltört alakba: 1 1/2 = 3/2. Közös nevező 8: 3/2 = 12/8. Így 12/8 : 7/8 = 12 : 7.',
    hint: '1 1/2 = 3/2. Hány nyolcad a 3/2?'
  },

  // ==========================================
  // 3. SZINT: NEHÉZ (21 - 30)
  // ==========================================
  {
    id: 'q21',
    level: 3,
    question: 'Egy téglalap kerülete 66 cm, oldalainak aránya 3 : 8. Mekkora a téglalap területe (T)?',
    options: ['144 cm²', '216 cm²', '288 cm²', '432 cm²'],
    correctAnswer: 1,
    explanation: 'A téglalap kerülete K = 2(a + b) = 66 cm, így a félkerület a + b = 33 cm. Részek összege: 3 + 8 = 11 rész. 1 rész = 33 : 11 = 3 cm. Az oldalak: a = 3 · 3 = 9 cm és b = 8 · 3 = 24 cm. A terület: T = a · b = 9 · 24 = 216 cm².',
    hint: 'Tipikus csapda: Először felezd meg a kerületet (a + b = 33 cm), ne a 66-ot oszd 11-gyel!'
  },
  {
    id: 'q22',
    level: 3,
    question: 'Két testvérnek összesen 420 focis kártyája van. Az idősebbnek háromszor annyi kártyája van, mint a fiatalabbnak. Hány kártyája van a fiatalabbnak?',
    options: ['95 db', '105 db', '140 db', '210 db'],
    correctAnswer: 1,
    explanation: 'Az idősebb és a fiatalabb kártyáinak aránya 3 : 1. Részek száma: 3 + 1 = 4 rész. 1 rész = 420 : 4 = 105 db kártya. A fiatalabbnak 1 része van, tehát 105 kártyája van.',
    hint: 'Ha az egyik háromszor annyi, mint a másik, az arányuk 3 : 1. Összesen 4 rész!'
  },
  {
    id: 'q23',
    level: 3,
    question: 'Három testvér nyári munkát vállalt. Eszter négyszer annyit dolgozott, mint Kristóf, aki kétszer annyit, mint Kisbence. Kisbence 2000 Ft-ot kapott. Hány forintot fizetett összesen édesanyjuk?',
    options: ['18 000 Ft', '20 000 Ft', '22 000 Ft', '24 000 Ft'],
    correctAnswer: 2,
    explanation: 'Kisbence pénze: 2000 Ft (1 egység). Kristóf kétszer annyit dolgozott: 2 · 2000 = 4000 Ft (2 egység). Eszter négyszer annyit, mint Kristóf: 4 · 4000 = 16 000 Ft (8 egység). Összesen: 2000 + 4000 + 16 000 = 22 000 Ft.',
    hint: 'Számold ki sorban: Kisbence 2000 Ft, Kristóf 2-szerese, Eszter ennek 4-szerese!'
  },
  {
    id: 'q24',
    level: 3,
    question: 'A Vidám családban a szülők és a 3 gyerek életkorának összege 116 év. Az apa 4 évvel idősebb az anyánál, és ha az apa életkorának kétszereséhez 4-et adunk, 100-at kapunk. A 3 gyerek életkorának aránya 5 : 4 : 3. Hány éves a legidősebb gyermek?',
    options: ['8 éves', '10 éves', '12 éves', '15 éves'],
    correctAnswer: 1,
    explanation: 'Apa életkora: 2 · A + 4 = 100 → 2 · A = 96 → A = 48 év. Anya: 48 - 4 = 44 év. Szülők együtt: 48 + 44 = 92 év. A 3 gyerek együtt: 116 - 92 = 24 év. A gyerekek aránya: 5 + 4 + 3 = 12 rész = 24 év → 1 rész = 2 év. A legidősebb gyerek: 5 · 2 = 10 éves.',
    hint: 'Először számold ki az apa (48 év) és anya (44 év) korát, vond ki a 116-ból a szülők korát!'
  },
  {
    id: 'q25',
    level: 3,
    question: 'Írd fel két egész szám legegyszerűbb arányaként: 3 1/3 : 5 2/7!',
    options: ['35 : 56', '70 : 111', '70 : 117', '21 : 37'],
    correctAnswer: 1,
    explanation: 'Alakítsuk át közönséges áltörtté: 3 1/3 = 10/3, és 5 2/7 = 37/7. Az arány: 10/3 : 37/7 = (10/3) · (7/37) = 70 / 111. Mivel 70 és 111 relatív prímek, az arány 70 : 111.',
    hint: '3 1/3 = 10/3, 5 2/7 = 37/7. Oszd el a két törtet (szorozz a reciprokával)!'
  },
  {
    id: 'q26',
    level: 3,
    question: 'Egy tepsiben lévő muffinok hatodát Lajos, harmadát Irénke ette meg, a többi megmaradt. Milyen arányban oszlik meg a sütemény Lajos része, Irénke része és a megmaradt rész között?',
    options: ['1 : 3 : 2', '1 : 2 : 3', '2 : 3 : 1', '1 : 1 : 2'],
    correctAnswer: 1,
    explanation: 'Lajos: 1/6 rész. Irénke: 1/3 = 2/6 rész. Együtt ettek: 1/6 + 2/6 = 3/6 = 1/2 részt. Megmaradt: 1 - 3/6 = 3/6 rész. Az arány: 1/6 : 2/6 : 3/6 = 1 : 2 : 3.',
    hint: 'Hozd az összes részt hatodokra: 1/6, 2/6, és ami megmaradt az 1 egészből!'
  },
  {
    id: 'q27',
    level: 3,
    question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5. Milyen típusú a háromszög a szögei szerint?',
    options: [
      'Hegyesszögű háromszög',
      'Tompaszögű háromszög',
      'Derékszögű háromszög',
      'Szabályos háromszög'
    ],
    correctAnswer: 2,
    explanation: 'A háromszög belső szögeinek összege 180°. Részek száma: 2 + 3 + 5 = 10 rész. 1 rész = 180° : 10 = 18°. A szögek: 2 · 18° = 36°, 3 · 18° = 54°, és 5 · 18° = 90°. Mivel az egyik szöge pontosan 90°, ez egy derékszögű háromszög.',
    hint: 'A háromszög belső szögeinek összege 180°. Számold ki a legnagyobb szöget!'
  },
  {
    id: 'q28',
    level: 3,
    question: 'Két szám aránya 3 : 5. Ha mindkét számhoz hozzáadunk 4-et, az arányuk 2 : 3 lesz. Melyik volt az eredeti kisebbik szám?',
    options: ['9', '12', '15', '18'],
    correctAnswer: 1,
    explanation: 'Legyen a két szám 3x és 5x. Az egyenlet: (3x + 4) / (5x + 4) = 2 / 3. Keresztbeszorzással: 3 · (3x + 4) = 2 · (5x + 4) → 9x + 12 = 10x + 8 → x = 4. Az eredeti kisebb szám: 3 · 4 = 12. (A nagyobb: 5 · 4 = 20. Ellenőrzés: (12+4)/(20+4) = 16/24 = 2/3).',
    hint: 'Írd fel egyenlettel: a számok 3x és 5x. (3x + 4)/(5x + 4) = 2/3.'
  },
  {
    id: 'q29',
    level: 3,
    question: 'Málnaszörpöt készítünk szörp és víz 1 : 7 arányú keverékéből. Hány deciliter szörp és víz kell 2,4 liter kész italhoz?',
    options: [
      '2 dl szörp és 22 dl víz',
      '3 dl szörp és 21 dl víz',
      '4 dl szörp és 20 dl víz',
      '3,5 dl szörp és 20,5 dl víz'
    ],
    correctAnswer: 1,
    explanation: 'Váltsuk át az űrtartalmat: 2,4 liter = 24 dl. Részek száma: 1 + 7 = 8 rész. 1 rész = 24 : 8 = 3 dl. Szörp (1 rész): 3 dl, víz (7 rész): 7 · 3 = 21 dl.',
    hint: '2,4 liter = 24 dl. Részek száma: 1 + 7 = 8 rész.'
  },
  {
    id: 'q30',
    level: 3,
    question: 'Három munkatárs 1 800 000 Ft év végi jutalmon osztozik a ledolgozott hónapjaik arányában: 6 : 10 : 14. Mennyivel kap többet a legrégebbi munkatárs, mint a legújabb?',
    options: ['360 000 Ft', '420 000 Ft', '480 000 Ft', '540 000 Ft'],
    correctAnswer: 2,
    explanation: 'Részek összege: 6 + 10 + 14 = 30 rész. 1 rész értéke: 1 800 000 : 30 = 60 000 Ft. A különbség részekben: 14 - 6 = 8 rész. 8 · 60 000 Ft = 480 000 Ft. (Vagy: 14 · 60 000 = 840 000 Ft, 6 · 60 000 = 360 000 Ft, különbség: 480 000 Ft).',
    hint: 'Számold ki 1 rész értékét (1 800 000 : 30), majd szorozd meg a részek különbségével (14 - 6 = 8)!'
  }
];

export const RatioReviewQuiz: React.FC<RatioReviewQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-ratio-quiz"
      topicTitle="Az arányosságról még egyszer"
      title="Az arányosságról még egyszer - Gyakorló Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: arány fogalma, egyszerűsítése, törtek aránya és arányos osztás"
      badge="GYAKORLÓ KVÍZ"
      themeColor="blue"
      questions={ratioReviewQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <RatioReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <RatioReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default RatioReviewQuiz;
