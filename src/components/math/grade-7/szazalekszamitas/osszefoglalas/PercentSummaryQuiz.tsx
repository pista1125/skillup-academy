import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PercentSummaryMatcher } from './PercentSummaryMatcher';
import { PercentSummarySorter } from './PercentSummarySorter';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Scale,
  FlaskConical,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface PercentSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs1',
    title: 'A Százalékszámítás Hármas Alapképlete',
    icon: <Percent className="w-4 h-4 text-rose-600" />,
    formula: 'É = A · (p / 100)  •  A = É : (p / 100)  •  p% = (É / A) · 100%',
    note: 'Érték (É): a megadott rész. Alap (A): a 100%-os egész. Százalékláb (p%): a rész és egész aránya százalékban.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="46" height="34" rx="4" className="fill-rose-100 stroke-rose-300 dark:fill-rose-950/60 dark:stroke-rose-800" />
        <text x="28" y="29" textAnchor="middle" className="text-[9px] font-bold fill-rose-900 dark:fill-rose-200">É = A · q</text>
        <rect x="57" y="8" width="46" height="34" rx="4" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="80" y="29" textAnchor="middle" className="text-[9px] font-bold fill-emerald-900 dark:fill-emerald-200">A = É / q</text>
        <rect x="109" y="8" width="46" height="34" rx="4" className="fill-cyan-100 stroke-cyan-300 dark:fill-cyan-950/60 dark:stroke-cyan-800" />
        <text x="132" y="29" textAnchor="middle" className="text-[9px] font-bold fill-cyan-900 dark:fill-cyan-200">p = É / A</text>
      </svg>
    )
  },
  {
    id: 'cs2',
    title: 'Egylépéses Szorzótényezők (Árváltozás és ÁFA)',
    icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
    formula: '+p% ⟹ · (1 + p/100)  •  -p% ⟹ · (1 - p/100)  •  Bruttó = Nettó · 1,27',
    note: '+20% esetén · 1,20; -15% esetén · 0,85. Visszaszámoláskor a bruttó vagy akciós árat elosztjuk a szorzótényezővel!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-amber-100 stroke-amber-300 dark:fill-amber-950/60 dark:stroke-amber-800" />
        <text x="80" y="28" textAnchor="middle" className="text-[9px] font-mono font-bold fill-amber-900 dark:fill-amber-200">+20% ➔ · 1,20  |  -25% ➔ · 0,75</text>
      </svg>
    )
  },
  {
    id: 'cs3',
    title: 'Arányosság és Arányos Osztás',
    icon: <Scale className="w-4 h-4 text-blue-600" />,
    formula: 'Egyenes: y / x = c  •  Fordított: x · y = c  •  Részek összege ➔ 1 rész',
    note: 'Arányos osztásnál összeadjuk az arányszámokat, kiszámoljuk 1 rész értékét (Összeg : Részek), majd visszaszorzunk.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-blue-100 stroke-blue-300 dark:fill-blue-950/60 dark:stroke-blue-800" />
        <text x="80" y="28" textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-900 dark:fill-blue-200">2 : 3 arány ⟹ 5 rész összesen</text>
      </svg>
    )
  },
  {
    id: 'cs4',
    title: 'Keverési Szabály (Tömegszázalék)',
    icon: <FlaskConical className="w-4 h-4 text-purple-600" />,
    formula: 'w% = (m_oldott / m_oldat) · 100%  •  m_oldat = m_oldott + m_víz',
    note: 'Oldatok összeöntésekor az oldott anyagok (só, cukor) és az oldatok tömegei külön-külön összeadódnak: w = Σm_oldott / Σm_oldat.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="8" y="8" width="144" height="34" rx="6" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="80" y="28" textAnchor="middle" className="text-[9px] font-mono font-bold fill-purple-900 dark:fill-purple-200">m_só / (m_só + m_víz) · 100%</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és Közvetlen Kiszámítások',
    subtitle: 'Százalékérték, alap és százalékláb meghatározása egyszerű alapesetekben (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Alapfogalmak, tört és tizedestört átváltások, egyszerű százalékszámítás fejben',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mit jelent a százalék (1%) fogalma?',
        options: ['Egy mennyiség századrésze (1/100 = 0,01)', 'Egy mennyiség tizedrésze (1/10 = 0,1)', 'Egy mennyiség ezredrésze (1/1000 = 0,001)', 'Százszorosa a kiinduló egésznek'],
        correctAnswer: 'Egy mennyiség századrésze (1/100 = 0,01)',
        explanation: 'A százalék a latin "per centum" kifejezésből származik, és az egész egy századrészét jelenti: 1% = 1/100 = 0,01.',
        breakdown: [{ label: '1%', value: '1 / 100 = 0,01' }],
        hint: 'Gondolj a nevére: száz-alék, azaz századrész!'
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi 500 Ft-nak a 20%-a?',
        options: ['100 Ft', '50 Ft', '150 Ft', '200 Ft'],
        correctAnswer: '100 Ft',
        explanation: '20% = 1/5 = 0,20. Számítás: 500 · 0,20 = 100 Ft (vagy 500 : 5 = 100 Ft).',
        breakdown: [{ label: 'Alap', value: '500 Ft' }, { label: 'Szorzó', value: '0,20' }, { label: 'Érték', value: '100 Ft' }],
        hint: 'A 20% pontosan az egyötöd rész!'
      },
      {
        id: 'q1-3',
        prompt: 'Hány százalék a 3/4 tört alakban megadott arány?',
        options: ['75%', '50%', '60%', '80%'],
        correctAnswer: '75%',
        explanation: '3/4 = 75/100 = 0,75 = 75%.',
        breakdown: [{ label: 'Tört', value: '3/4' }, { label: 'Századrész', value: '75/100' }, { label: 'Százalék', value: '75%' }],
        hint: 'Bővítsd a törtet 25-tel, hogy a nevező 100 legyen!'
      },
      {
        id: 'q1-4',
        prompt: 'Egy szám 10%-a 35. Mennyi maga a szám (a 100%)?',
        options: ['350', '3500', '35', '70'],
        correctAnswer: '350',
        explanation: 'A 100% a 10%-nak a tízszerese: 35 · 10 = 350 (vagy 35 : 0,10 = 350).',
        breakdown: [{ label: '10%', value: '35' }, { label: '100%', value: '35 · 10 = 350' }],
        hint: 'Hányszorosa a 100% a 10%-nak?'
      },
      {
        id: 'q1-5',
        prompt: '80-nak a 20 hány százaléka?',
        options: ['25%', '20%', '30%', '40%'],
        correctAnswer: '25%',
        explanation: 'p% = (20 / 80) · 100% = (1/4) · 100% = 25%.',
        breakdown: [{ label: 'Rész / Egész', value: '20 / 80 = 1/4' }, { label: 'Százalék', value: '25%' }],
        hint: 'Egyszerűsítsd a 20/80 törtet 20-szal!'
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi 1 ezrelék (1‰) értéke tizedestört alakban?',
        options: ['0,001', '0,01', '0,1', '0,0001'],
        correctAnswer: '0,001',
        explanation: '1 ezrelék az egész egy ezredrésze: 1‰ = 1/1000 = 0,001 = 0,1%.',
        breakdown: [{ label: '1‰', value: '1 / 1000 = 0,001' }],
        hint: 'Az ezrelék a százalék tizedrésze.'
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi 1200 kg-nak a 25%-a?',
        options: ['300 kg', '250 kg', '400 kg', '600 kg'],
        correctAnswer: '300 kg',
        explanation: '25% = 1/4 rész. 1200 : 4 = 300 kg.',
        breakdown: [{ label: 'Számítás', value: '1200 · 0,25 = 300 kg' }],
        hint: 'Oszd el a számot 4-gyel!'
      },
      {
        id: 'q1-8',
        prompt: 'Ha egy osztály 24 tanulójából 6 kapott jelest, hány százalék ez?',
        options: ['25%', '20%', '30%', '24%'],
        correctAnswer: '25%',
        explanation: '6 / 24 = 1/4 = 0,25 = 25%.',
        breakdown: [{ label: 'Arány', value: '6 / 24 = 1/4' }, { label: 'Százalék', value: '25%' }],
        hint: '24-ben a 6 pontosan négyszer van meg.'
      },
      {
        id: 'q1-9',
        prompt: 'Egy mennyiség 50%-a 48. Mennyi a mennyiség 25%-a?',
        options: ['24', '12', '48', '96'],
        correctAnswer: '24',
        explanation: 'A 25% a fele az 50%-nak: 48 : 2 = 24.',
        breakdown: [{ label: 'Összefüggés', value: '25% = 50% / 2' }, { label: 'Eredmény', value: '48 : 2 = 24' }],
        hint: 'Nem kell a 100%-ot kiszámolnod, elég felezni!'
      },
      {
        id: 'q1-10',
        prompt: 'Milyen tizedestört szorzó tartozik a 7%-hoz?',
        options: ['0,07', '0,7', '7,0', '0,007'],
        correctAnswer: '0,07',
        explanation: '7% = 7 / 100 = 0,07.',
        breakdown: [{ label: 'Átváltás', value: '7 / 100 = 0,07' }],
        hint: 'A tizedesvesszőt két hellyel kell balra tolni.'
      },
      {
        id: 'q1-11',
        prompt: 'Mennyi 250 Ft-nak a 4%-a?',
        options: ['10 Ft', '25 Ft', '4 Ft', '1 Ft'],
        correctAnswer: '10 Ft',
        explanation: '250 · 0,04 = 10 Ft (vagy 1% = 2,5 Ft, így 4% = 2,5 · 4 = 10 Ft).',
        breakdown: [{ label: '1%', value: '2,5 Ft' }, { label: '4%', value: '4 · 2,5 = 10 Ft' }],
        hint: 'Számold ki az 1%-ot, majd szorozd meg 4-gyel!'
      },
      {
        id: 'q1-12',
        prompt: 'Ha egy szám 5%-a 15, mennyi a szám 100%-a?',
        options: ['300', '150', '250', '75'],
        correctAnswer: '300',
        explanation: '15 : 0,05 = 300 (vagy mivel 100% = 20 · 5%, ezért 15 · 20 = 300).',
        breakdown: [{ label: '1%', value: '15 : 5 = 3' }, { label: '100%', value: '3 · 100 = 300' }],
        hint: '100-ban az 5 pontosan 20-szor van meg.'
      },
      {
        id: 'q1-13',
        prompt: 'Hány százalék a 0,35 tizedestört?',
        options: ['35%', '3,5%', '0,35%', '350%'],
        correctAnswer: '35%',
        explanation: '0,35 · 100% = 35%.',
        breakdown: [{ label: 'Szorzás 100-zal', value: '0,35 · 100 = 35%' }],
        hint: 'Tizedestörtből százalékba szorzással (·100) jutunk.'
      },
      {
        id: 'q1-14',
        prompt: 'Egy túrán a 40 km-es táv 30%-át már megtettük. Hány km van még hátra?',
        options: ['28 km', '12 km', '30 km', '24 km'],
        correctAnswer: '28 km',
        explanation: 'A megtett út 40 · 0,30 = 12 km. Hátravan még: 40 - 12 = 28 km (vagy 40 · 0,70 = 28 km).',
        breakdown: [{ label: 'Megtett út', value: '12 km' }, { label: 'Hátralévő út', value: '40 - 12 = 28 km (70%)' }],
        hint: 'Ha a 30%-át megtettük, hány százalék van még hátra?'
      },
      {
        id: 'q1-15',
        prompt: 'Mennyi 60-nak a 150%-a?',
        options: ['90', '75', '80', '120'],
        correctAnswer: '90',
        explanation: '150% = 1,5-szeres. 60 · 1,5 = 90 (vagy 60 + 30 = 90).',
        breakdown: [{ label: '100%', value: '60' }, { label: '+50%', value: '+30' }, { label: '150%', value: '90' }],
        hint: 'A 100% az 60, az 50% az 30. Add össze őket!'
      },
      {
        id: 'q1-16',
        prompt: 'Egy dobozban 50 golyó van: 15 piros, a többi kék. Hány százalék a kék golyók aránya?',
        options: ['70%', '60%', '30%', '35%'],
        correctAnswer: '70%',
        explanation: 'Kék golyók száma: 50 - 15 = 35. Arány: 35 / 50 = 70 / 100 = 70%.',
        breakdown: [{ label: 'Kék golyók', value: '35 db' }, { label: 'Arány', value: '35 / 50 = 70%' }],
        hint: 'Hány kék golyó van összesen az 50-ből?'
      },
      {
        id: 'q1-17',
        prompt: 'Ha a 200 Ft-os csokoládé árát 10%-kal felemelik, mennyi lesz az új ára?',
        options: ['220 Ft', '210 Ft', '240 Ft', '205 Ft'],
        correctAnswer: '220 Ft',
        explanation: '10% emelés = 200 · 0,10 = 20 Ft. Új ár: 200 + 20 = 220 Ft (vagy 200 · 1,10 = 220 Ft).',
        breakdown: [{ label: 'Emelés', value: '20 Ft' }, { label: 'Új ár', value: '220 Ft' }],
        hint: 'Szorozd meg 1,10-zel!'
      },
      {
        id: 'q1-18',
        prompt: 'Egy 8000 Ft-os pulóverre 20% kedvezményt adnak. Mennyit fizetünk érte?',
        options: ['6400 Ft', '6000 Ft', '7200 Ft', '6800 Ft'],
        correctAnswer: '6400 Ft',
        explanation: 'Kedvezmény: 8000 · 0,20 = 1600 Ft. Fizetendő: 8000 - 1600 = 6400 Ft (vagy 8000 · 0,80 = 6400 Ft).',
        breakdown: [{ label: 'Szorzó', value: '1 - 0,20 = 0,80' }, { label: 'Fizetendő', value: '8000 · 0,80 = 6400 Ft' }],
        hint: 'A 20% kedvezmény után az eredeti ár 80%-át kell kifizetni.'
      },
      {
        id: 'q1-19',
        prompt: 'Melyik összefüggés fejezi ki az egyenes arányosságot két változó (x és y) között?',
        options: ['y / x = c (hányadosuk állandó)', 'x · y = c (szorzatuk állandó)', 'x + y = c (összegük állandó)', 'x - y = c (különbségük állandó)'],
        correctAnswer: 'y / x = c (hányadosuk állandó)',
        explanation: 'Egyenes arányosság esetén az összetartozó értékek hányadosa állandó, grafikonja origón átmenő egyenes.',
        breakdown: [{ label: 'Egyenes arányosság', value: 'y / x = c' }],
        hint: 'Ha az egyik kétszeresére nő, a másik is kétszeresére nő.'
      },
      {
        id: 'q1-20',
        prompt: 'Melyik összefüggés fejezi ki a fordított arányosságot két változó között?',
        options: ['x · y = c (szorzatuk állandó)', 'y / x = c (hányadosuk állandó)', 'x + y = c', 'x² · y = c'],
        correctAnswer: 'x · y = c (szorzatuk állandó)',
        explanation: 'Fordított arányosság esetén a két összetartozó mennyiség szorzata állandó, grafikonja hiperbolaág.',
        breakdown: [{ label: 'Fordított arányosság', value: 'x · y = c' }],
        hint: 'Ha a sebesség kétszeresére nő, a menetidő felére csökken.'
      },
      {
        id: 'q1-21',
        prompt: '12 000 Ft-ot kell elosztani 1 : 2 arányban. Mennyi a nagyobbik rész?',
        options: ['8000 Ft', '6000 Ft', '9000 Ft', '4000 Ft'],
        correctAnswer: '8000 Ft',
        explanation: 'Összes rész: 1 + 2 = 3 rész. 1 rész = 12 000 : 3 = 4000 Ft. A nagyobbik (2 rész): 2 · 4000 = 8000 Ft.',
        breakdown: [{ label: 'Összes rész', value: '3 rész' }, { label: '1 rész', value: '4000 Ft' }, { label: '2 rész', value: '8000 Ft' }],
        hint: 'Hány részre osztjuk összesen az összeget?'
      },
      {
        id: 'q1-22',
        prompt: 'Hány százaléka a 45 perc egy órának (60 perc)?',
        options: ['75%', '60%', '45%', '80%'],
        correctAnswer: '75%',
        explanation: '45 / 60 = 3/4 = 0,75 = 75%.',
        breakdown: [{ label: 'Tört', value: '45 / 60 = 3/4' }, { label: 'Százalék', value: '75%' }],
        hint: 'Egyszerűsítsd a 45/60 törtet 15-tel!'
      },
      {
        id: 'q1-23',
        prompt: 'Mennyi 50-nek a 2%-a?',
        options: ['1', '2', '0,5', '5'],
        correctAnswer: '1',
        explanation: '50 · 0,02 = 1 (vagy az 50 fele a 100-nak, így a 2% értéke fele a 2-nek, azaz 1).',
        breakdown: [{ label: 'Számítás', value: '50 · 0,02 = 1' }],
        hint: '100-nak a 2%-a 2. Akkor 50-nek mennyi?'
      },
      {
        id: 'q1-24',
        prompt: 'Egy üveg szörpben 200 g oldott cukor van 1000 g teljes szörpben. Hány százalék a cukortartalom?',
        options: ['20%', '25%', '10%', '15%'],
        correctAnswer: '20%',
        explanation: '200 / 1000 = 20 / 100 = 20%.',
        breakdown: [{ label: 'Tömegarány', value: '200 / 1000 = 0,20' }, { label: 'Tömegszázalék', value: '20%' }],
        hint: 'Oszd el a 200-at 1000-rel!'
      },
      {
        id: 'q1-25',
        prompt: 'Ha egy termék ára 100 Ft-ról 125 Ft-ra nőtt, hány százalékos volt az áremelés?',
        options: ['25%', '20%', '30%', '15%'],
        correctAnswer: '25%',
        explanation: 'Az áremelkedés 125 - 100 = 25 Ft. Az eredeti 100 Ft-hoz viszonyítva ez 25 / 100 = 25%.',
        breakdown: [{ label: 'Árnövekedés', value: '25 Ft' }, { label: 'Százalék', value: '25 / 100 = 25%' }],
        hint: '100 Ft-hoz képest minden plusz forint pontosan 1%-ot jelent.'
      },
      {
        id: 'q1-26',
        prompt: 'Milyen szorzóval számolható ki közvetlenül egy ár 35%-os csökkenése?',
        options: ['0,65', '0,35', '1,35', '0,75'],
        correctAnswer: '0,65',
        explanation: '100% - 35% = 65%, amelynek szorzója 0,65.',
        breakdown: [{ label: 'Kivonás', value: '1 - 0,35 = 0,65' }],
        hint: '100-ból vonj ki 35-öt!'
      },
      {
        id: 'q1-27',
        prompt: 'Ha egy szám 12,5%-a 10, mennyi a szám 100%-a?',
        options: ['80', '100', '125', '60'],
        correctAnswer: '80',
        explanation: '12,5% = 1/8 rész. Ha 1/8 rész = 10, akkor a teljes egész: 10 · 8 = 80.',
        breakdown: [{ label: '12,5%', value: '1/8 rész' }, { label: '100%', value: '10 · 8 = 80' }],
        hint: '12,5% pontosan az egy nyolcad rész!'
      },
      {
        id: 'q1-28',
        prompt: 'Egy könyv eredeti ára 4000 Ft. Mennyi az ára 15%-os leértékelés után?',
        options: ['3400 Ft', '3200 Ft', '3600 Ft', '3500 Ft'],
        correctAnswer: '3400 Ft',
        explanation: '15% = 4000 · 0,15 = 600 Ft. Új ár: 4000 - 600 = 3400 Ft (vagy 4000 · 0,85 = 3400 Ft).',
        breakdown: [{ label: 'Kedvezmény', value: '600 Ft' }, { label: 'Új ár', value: '3400 Ft' }],
        hint: 'Szorozd meg 4000-et 0,85-tel!'
      },
      {
        id: 'q1-29',
        prompt: 'Hány fok felel meg egy kördiagramon a 25%-os részarányos körcikknek?',
        options: ['90°', '45°', '60°', '120°'],
        correctAnswer: '90°',
        explanation: 'A teljes kör 360°. Ennek 25%-a (negyedrésze): 360° · 0,25 = 90° (derékszög).',
        breakdown: [{ label: 'Teljes szög', value: '360°' }, { label: '25%', value: '360° : 4 = 90°' }],
        hint: 'A teljes kör 360 fok. Mennyi a negyede?'
      },
      {
        id: 'q1-30',
        prompt: 'Ha egy bankbetét évi 6% kamatot fizet, mennyi kamatot kapunk 500 000 Ft után egy évre?',
        options: ['30 000 Ft', '15 000 Ft', '60 000 Ft', '50 000 Ft'],
        correctAnswer: '30 000 Ft',
        explanation: '500 000 · 0,06 = 30 000 Ft.',
        breakdown: [{ label: 'Alap', value: '500 000 Ft' }, { label: 'Kamatláb', value: '6%' }, { label: 'Kamat', value: '30 000 Ft' }],
        hint: 'Szorozd meg 500 000-et 0,06-tal!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Árváltozások, Arányos Osztás és Kereskedelmi Feladatok',
    subtitle: 'Növekedés, leértékelés, ÁFA, kamat és kétlépéses következtetések (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Egylépéses szorzótényezők, árrés és ÁFA, arányos felosztás, típusfelismerés',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Egy termék nettó ára 40 000 Ft. Mennyi a bruttó ára 27%-os ÁFA felszámításával?',
        options: ['50 800 Ft', '54 000 Ft', '48 000 Ft', '52 400 Ft'],
        correctAnswer: '50 800 Ft',
        explanation: 'Bruttó = Nettó · 1,27 = 40 000 · 1,27 = 50 800 Ft.',
        breakdown: [{ label: 'Nettó ár', value: '40 000 Ft' }, { label: 'ÁFA (27%)', value: '10 800 Ft' }, { label: 'Bruttó ár', value: '50 800 Ft' }],
        hint: 'Szorozd meg a nettó árat 1,27-tel!'
      },
      {
        id: 'q2-2',
        prompt: 'Egy televízió bruttó ára 127 000 Ft (27% ÁFA-t tartalmaz). Mennyi a termék nettó ára?',
        options: ['100 000 Ft', '92 710 Ft', '102 000 Ft', '95 000 Ft'],
        correctAnswer: '100 000 Ft',
        explanation: 'Nettó = Bruttó : 1,27 = 127 000 : 1,27 = 100 000 Ft.',
        breakdown: [{ label: 'Bruttó ár', value: '127 000 Ft' }, { label: 'Osztó', value: '1,27' }, { label: 'Nettó ár', value: '100 000 Ft' }],
        hint: 'A bruttó árat kell elosztani 1,27-tel!'
      },
      {
        id: 'q2-3',
        prompt: 'Egy téli kabát ára a 20%-os leértékelés után 16 000 Ft lett. Mennyi volt az eredeti ára?',
        options: ['20 000 Ft', '19 200 Ft', '24 000 Ft', '18 000 Ft'],
        correctAnswer: '20 000 Ft',
        explanation: 'A 16 000 Ft a 80%-nak felel meg (1 - 0,20 = 0,80). Eredeti ár: 16 000 : 0,80 = 20 000 Ft.',
        breakdown: [{ label: 'Akciós ár', value: '16 000 Ft = 80%' }, { label: 'Eredeti ár', value: '16 000 / 0,80 = 20 000 Ft' }],
        hint: 'Nem a 16 000-nek kell a 20%-át hozzáadni, hanem el kell osztani 0,80-nal!'
      },
      {
        id: 'q2-4',
        prompt: 'Három testvér 180 000 Ft örökséget oszt szét 2 : 3 : 4 arányban. Mennyi pénzt kap a legidősebb (aki a 4 részt kapja)?',
        options: ['80 000 Ft', '60 000 Ft', '40 000 Ft', '90 000 Ft'],
        correctAnswer: '80 000 Ft',
        explanation: 'Összes rész: 2 + 3 + 4 = 9 rész. 1 rész = 180 000 : 9 = 20 000 Ft. 4 rész = 4 · 20 000 = 80 000 Ft.',
        breakdown: [{ label: 'Összes rész', value: '9' }, { label: '1 rész értéke', value: '20 000 Ft' }, { label: '4 rész', value: '80 000 Ft' }],
        hint: 'Add össze az arányszámokat: 2 + 3 + 4 = 9!'
      },
      {
        id: 'q2-5',
        prompt: 'Egy cipő ára 20 000 Ft-ról 25 000 Ft-ra emelkedett. Hány százalékos volt a drágulás?',
        options: ['25%', '20%', '30%', '15%'],
        correctAnswer: '25%',
        explanation: 'Áremelkedés: 25 000 - 20 000 = 5000 Ft. Százalékláb: 5000 / 20 000 = 1/4 = 25%.',
        breakdown: [{ label: 'Drágulás', value: '5000 Ft' }, { label: 'Kiinduló alap', value: '20 000 Ft' }, { label: 'Százalékláb', value: '5000 / 20 000 = 25%' }],
        hint: 'Mindig a kiinduló (eredeti) árhoz (20 000 Ft-hoz) viszonyítunk!'
      },
      {
        id: 'q2-6',
        prompt: 'Ha egy cipő ára 25 000 Ft-ról 20 000 Ft-ra csökkent, hány százalékos volt az árengedmény?',
        options: ['20%', '25%', '15%', '30%'],
        correctAnswer: '20%',
        explanation: 'Árcsökkenés: 25 000 - 20 000 = 5000 Ft. Most a kiinduló alap a 25 000 Ft: 5000 / 25 000 = 1/5 = 20%.',
        breakdown: [{ label: 'Árengedmény', value: '5000 Ft' }, { label: 'Kiinduló alap', value: '25 000 Ft' }, { label: 'Százalékláb', value: '5000 / 25 000 = 20%' }],
        hint: 'Figyeld meg az alapváltást: most a 25 000 Ft a 100%!'
      },
      {
        id: 'q2-7',
        prompt: 'Egy 5 fős kőműves brigád 12 nap alatt épít fel egy falat. Hány nap alatt végezne ugyanezzel 6 azonos tempójú kőműves?',
        options: ['10 nap', '14 nap', '9 nap', '8 nap'],
        correctAnswer: '10 nap',
        explanation: 'Fordított arányosság: 5 · 12 = 60 embernap. 60 : 6 = 10 nap.',
        breakdown: [{ label: 'Összes munka', value: '5 · 12 = 60 embernap' }, { label: 'Új idő', value: '60 : 6 = 10 nap' }],
        hint: 'Több munkás kevesebb nap alatt végez (fordított arányosság)!'
      },
      {
        id: 'q2-8',
        prompt: 'Egy bicikli ára 120 000 Ft. Először 10%-kal felemelték, majd a megnövelt árat 10%-kal leértékelték. Mennyi lett a végára?',
        options: ['118 800 Ft', '120 000 Ft', '116 000 Ft', '122 400 Ft'],
        correctAnswer: '118 800 Ft',
        explanation: 'Láncolt szorzó: 1,10 · 0,90 = 0,99 (1%-os veszteség). Végár: 120 000 · 0,99 = 118 800 Ft.',
        breakdown: [{ label: '1. emelés után', value: '120 000 · 1,10 = 132 000 Ft' }, { label: '2. akció után', value: '132 000 · 0,90 = 118 800 Ft' }],
        hint: '+10% és -10% után a termék 1%-kal olcsóbb lesz az eredetinél!'
      },
      {
        id: 'q2-9',
        prompt: 'Egy könyvkereskedő 3000 Ft-ért szerzi be a könyvet, és 40%-os árrést tesz rá. Mennyi lesz az eladási ár?',
        options: ['4200 Ft', '4000 Ft', '4500 Ft', '3800 Ft'],
        correctAnswer: '4200 Ft',
        explanation: 'Árrés: 3000 · 0,40 = 1200 Ft. Eladási ár: 3000 + 1200 = 4200 Ft (vagy 3000 · 1,40 = 4200 Ft).',
        breakdown: [{ label: 'Szorzó', value: '1,40' }, { label: 'Eladási ár', value: '3000 · 1,40 = 4200 Ft' }],
        hint: 'Szorozd meg a beszerzési árat 1,40-nel!'
      },
      {
        id: 'q2-10',
        prompt: 'Ha egy autó 100 km-en 6,4 litert fogyaszt, hány litert fogyaszt ugyanolyan körülmények között 350 km-en?',
        options: ['22,4 liter', '21,8 liter', '24,0 liter', '19,2 liter'],
        correctAnswer: '22,4 liter',
        explanation: 'Egyenes arányosság: 350 km az 3,5-szerese a 100 km-nek. 6,4 · 3,5 = 22,4 liter.',
        breakdown: [{ label: 'Szorzó', value: '350 / 100 = 3,5' }, { label: 'Fogyasztás', value: '6,4 · 3,5 = 22,4 liter' }],
        hint: 'Számold ki, hányszorosa a 350 km a 100 km-nek!'
      },
      {
        id: 'q2-11',
        prompt: 'Egy 50 000 Ft-os okosórát 15%-os előleggel vásárolunk meg, a többit 5 egyenlő havi részletben fizetjük. Mennyi egy havi részlet?',
        options: ['8500 Ft', '8000 Ft', '9000 Ft', '7500 Ft'],
        correctAnswer: '8500 Ft',
        explanation: 'Előleg: 50 000 · 0,15 = 7500 Ft. Marad: 42 500 Ft (85%). Egy havi részlet: 42 500 : 5 = 8500 Ft.',
        breakdown: [{ label: 'Előleg (15%)', value: '7500 Ft' }, { label: 'Maradék (85%)', value: '42 500 Ft' }, { label: '1 részlet', value: '42 500 : 5 = 8500 Ft' }],
        hint: 'Vond le az előleget a teljes árból, majd oszd el 5-tel!'
      },
      {
        id: 'q2-12',
        prompt: 'Egy dolgozaton a 40 maximális pontból Zoli 34 pontot ért el. Hány százalékos lett az eredménye?',
        options: ['85%', '82,5%', '88%', '80%'],
        correctAnswer: '85%',
        explanation: '34 / 40 = 17 / 20 = 85 / 100 = 85%.',
        breakdown: [{ label: 'Arány', value: '34 / 40 = 17 / 20' }, { label: 'Százalék', value: '85%' }],
        hint: 'Bővítsd a 34/40-et úgy, hogy 20-ra egyszerűsítesz, majd 5-tel szorzol!'
      },
      {
        id: 'q2-13',
        prompt: 'Egy farmer nadrág ára 15 000 Ft volt, most 11 250 Ft-ért kapható. Hány százalékos volt a leértékelés?',
        options: ['25%', '20%', '30%', '33,3%'],
        correctAnswer: '25%',
        explanation: 'Kedvezmény: 15 000 - 11 250 = 3750 Ft. Százalékláb: 3750 / 15 000 = 1/4 = 25%.',
        breakdown: [{ label: 'Árcsökkenés', value: '3750 Ft' }, { label: 'Százalékláb', value: '3750 / 15 000 = 25%' }],
        hint: '15 000-nek a negyedrésze pontosan 3750 Ft.'
      },
      {
        id: 'q2-14',
        prompt: 'Egy iskola 600 tanulójának 45%-a lány. Hány fiú jár az iskolába?',
        options: ['330', '320', '300', '270'],
        correctAnswer: '330',
        explanation: 'A fiúk aránya: 100% - 45% = 55%. Fiúk száma: 600 · 0,55 = 330.',
        breakdown: [{ label: 'Fiúk aránya', value: '55%' }, { label: 'Fiúk száma', value: '600 · 0,55 = 330' }],
        hint: '100% - 45% = 55%. Számold ki a 600-nak az 55%-át!'
      },
      {
        id: 'q2-15',
        prompt: 'Egy bank 12%-os éves kamatot hirdet. Mennyi kamat jár félévre (6 hónapra) 80 000 Ft után?',
        options: ['4800 Ft', '9600 Ft', '4000 Ft', '5200 Ft'],
        correctAnswer: '4800 Ft',
        explanation: 'Éves kamat: 80 000 · 0,12 = 9600 Ft. Féléves kamat (időarányosan a fele): 9600 : 2 = 4800 Ft.',
        breakdown: [{ label: 'Éves kamat', value: '9600 Ft' }, { label: 'Féléves kamat', value: '9600 : 2 = 4800 Ft' }],
        hint: 'A féléves kamat pontosan az éves kamat fele!'
      },
      {
        id: 'q2-16',
        prompt: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5. Mekkora a háromszög legnagyobb szöge?',
        options: ['90°', '75°', '100°', '80°'],
        correctAnswer: '90°',
        explanation: 'A belső szögek összege 180°. Összes rész: 2 + 3 + 5 = 10 rész. 1 rész = 180° : 10 = 18°. Legnagyobb szög (5 rész): 5 · 18° = 90°.',
        breakdown: [{ label: 'Összeg', value: '180°' }, { label: '1 rész', value: '18°' }, { label: 'Legnagyobb szög', value: '5 · 18° = 90° (derékszög)' }],
        hint: 'A háromszög belső szögeinek összege mindig 180 fok.'
      },
      {
        id: 'q2-17',
        prompt: 'Egy 400 g-os tésztaétel 18%-a fehérje. Hány gramm fehérjét tartalmaz az étel?',
        options: ['72 g', '64 g', '75 g', '80 g'],
        correctAnswer: '72 g',
        explanation: '400 · 0,18 = 72 g.',
        breakdown: [{ label: 'Alap', value: '400 g' }, { label: 'Szorzó', value: '0,18' }, { label: 'Fehérje', value: '72 g' }],
        hint: '4 · 18 = 72.'
      },
      {
        id: 'q2-18',
        prompt: 'Egy üzletben 3 darab azonos pólóért 12 000 Ft-ot fizetünk. Mennyibe kerül 5 darab ilyen póló?',
        options: ['20 000 Ft', '18 000 Ft', '22 000 Ft', '24 000 Ft'],
        correctAnswer: '20 000 Ft',
        explanation: 'Egy póló ára: 12 000 : 3 = 4000 Ft. 5 póló: 5 · 4000 = 20 000 Ft.',
        breakdown: [{ label: '1 db ára', value: '4000 Ft' }, { label: '5 db ára', value: '20 000 Ft' }],
        hint: 'Egyenes arányosság: számold ki 1 darab árát!'
      },
      {
        id: 'q2-19',
        prompt: 'Egy téglalap alaprajzán a hosszúság 20%-kal nőtt, a szélesség változatlan maradt. Hány százalékkal nőtt a területe?',
        options: ['20%-kal', '10%-kal', '40%-kal', '25%-kal'],
        correctAnswer: '20%-kal',
        explanation: 'T = a · b. Ha a hossza 1,20 · a lett: Új terület = 1,20 · a · b = 1,20 · T, azaz pontosan 20%-kal nőtt.',
        breakdown: [{ label: 'Új terület', value: '1,20 · T' }, { label: 'Növekedés', value: '+20%' }],
        hint: 'Mivel a terület egyenesen arányos az oldal hosszával, a növekedés megegyezik.'
      },
      {
        id: 'q2-20',
        prompt: 'Egy termék ára 8000 Ft-ról 10 000 Ft-ra nőtt. Hány százalékos volt az áremelés?',
        options: ['25%', '20%', '30%', '15%'],
        correctAnswer: '25%',
        explanation: 'Növekedés: 2000 Ft. 2000 / 8000 = 1/4 = 25%.',
        breakdown: [{ label: 'Növekedés', value: '2000 Ft' }, { label: 'Százalékláb', value: '2000 / 8000 = 25%' }],
        hint: '8000-nek a negyede a 2000.'
      },
      {
        id: 'q2-21',
        prompt: 'Egy gyümölcsösben a fák 35%-a almafa, 25%-a szilvafa, és a maradék 160 fa körtefa. Hány fa van összesen a gyümölcsösben?',
        options: ['400 fa', '350 fa', '450 fa', '500 fa'],
        correctAnswer: '400 fa',
        explanation: 'Körtefa aránya: 100% - 35% - 25% = 40%. A 40% = 160 fa. Teljes egész (100%): 160 : 0,40 = 400 fa.',
        breakdown: [{ label: 'Körtefa aránya', value: '40%' }, { label: 'Összes fa', value: '160 : 0,40 = 400 fa' }],
        hint: '100% - (35% + 25%) = 40%. Ha 40% = 160, mennyi a 100%?'
      },
      {
        id: 'q2-22',
        prompt: 'Egy cipő ára 18 000 Ft-ról 15 300 Ft-ra csökkent. Hány százalékos volt az engedmény?',
        options: ['15%', '18%', '12%', '20%'],
        correctAnswer: '15%',
        explanation: 'Engedmény: 18 000 - 15 300 = 2700 Ft. 2700 / 18 000 = 0,15 = 15%.',
        breakdown: [{ label: 'Engedmény', value: '2700 Ft' }, { label: 'Százalékláb', value: '2700 / 18 000 = 15%' }],
        hint: 'Oszd el a 2700-at 18 000-rel!'
      },
      {
        id: 'q2-23',
        prompt: 'Egy hordóban 150 liter bor van. Leveszünk belőle 30 litert. A bor hány százaléka maradt a hordóban?',
        options: ['80%', '75%', '85%', '70%'],
        correctAnswer: '80%',
        explanation: 'Maradt: 150 - 30 = 120 liter. 120 / 150 = 4/5 = 80%. (Vagy levettünk 30/150 = 20%-ot, így 80% maradt).',
        breakdown: [{ label: 'Levett rész', value: '30 / 150 = 20%' }, { label: 'Maradt rész', value: '100% - 20% = 80%' }],
        hint: 'A 30 liter a 150 liternek az ötödrésze (20%-a).'
      },
      {
        id: 'q2-24',
        prompt: 'Ha egy cég nettó 250 000 Ft értékben állít ki számlát 27% ÁFA mellett, mennyi a fizetendő ÁFA összege?',
        options: ['67 500 Ft', '65 000 Ft', '70 000 Ft', '62 500 Ft'],
        correctAnswer: '67 500 Ft',
        explanation: '250 000 · 0,27 = 67 500 Ft.',
        breakdown: [{ label: 'Nettó összeg', value: '250 000 Ft' }, { label: 'ÁFA kulcs', value: '27%' }, { label: 'ÁFA összege', value: '67 500 Ft' }],
        hint: 'Szorozd meg 250 000-et 0,27-tel!'
      },
      {
        id: 'q2-25',
        prompt: 'Egy gépkocsi ára 4 500 000 Ft. 20% készpénz befizetése után a fennmaradó összeget 36 hónapra finanszírozzák. Mennyi a finanszírozott összeg?',
        options: ['3 600 000 Ft', '3 500 000 Ft', '3 800 000 Ft', '4 000 000 Ft'],
        correctAnswer: '3 600 000 Ft',
        explanation: 'Készpénz: 4 500 000 · 0,20 = 900 000 Ft. Fennmaradó 80%: 4 500 000 · 0,80 = 3 600 000 Ft.',
        breakdown: [{ label: 'Készpénz (20%)', value: '900 000 Ft' }, { label: 'Fennmaradó (80%)', value: '3 600 000 Ft' }],
        hint: 'A vételár 80%-a a finanszírozott tőke.'
      },
      {
        id: 'q2-26',
        prompt: 'Két falu távolsága a térképen 6 cm, a térkép méretaránya 1 : 50 000. Hány kilométer a valóságos távolság?',
        options: ['3 km', '30 km', '0,3 km', '6 km'],
        correctAnswer: '3 km',
        explanation: 'Valós távolság: 6 cm · 50 000 = 300 000 cm = 3000 m = 3 km.',
        breakdown: [{ label: 'Számítás', value: '6 · 50 000 = 300 000 cm' }, { label: 'Átváltás km-be', value: '300 000 cm = 3 km' }],
        hint: '1 km = 100 000 cm.'
      },
      {
        id: 'q2-27',
        prompt: 'Egy téglalap kerülete 48 cm, hosszúságának és szélességének aránya 5 : 3. Mekkora a téglalap területe?',
        options: ['135 cm²', '140 cm²', '120 cm²', '150 cm²'],
        correctAnswer: '135 cm²',
        explanation: 'Félkerület (a + b) = 48 : 2 = 24 cm. Összes rész: 5 + 3 = 8 rész. 1 rész = 24 : 8 = 3 cm. Oldalak: a = 5 · 3 = 15 cm, b = 3 · 3 = 9 cm. Terület = 15 · 9 = 135 cm².',
        breakdown: [{ label: 'a + b', value: '24 cm' }, { label: 'Oldalak', value: 'a = 15 cm, b = 9 cm' }, { label: 'Terület', value: '15 · 9 = 135 cm²' }],
        hint: 'A félkerület (a + b) a 48 cm fele, azaz 24 cm.'
      },
      {
        id: 'q2-28',
        prompt: 'Ha egy számot 25%-kal megnövelünk, majd a kapott számot 20%-kal csökkentjük, az eredeti szám hány százalékát kapjuk?',
        options: ['100%-át (változatlan marad)', '95%-át', '105%-át', '98%-át'],
        correctAnswer: '100%-át (változatlan marad)',
        explanation: 'Szorzótényezők: 1,25 · 0,80 = 1,00, tehát pontosan az eredeti szám 100%-át kapjuk vissza!',
        breakdown: [{ label: 'Szorzók', value: '1,25 · 0,80 = 1,00' }, { label: 'Változás', value: '0% (pontosan 100%)' }],
        hint: '1,25 · 0,80 = 1,00!'
      },
      {
        id: 'q2-29',
        prompt: 'Egy 20 000 Ft-os termék árát 20%-kal felemelték, majd az új árat 25%-kal leértékelték. Mennyi lett a végára?',
        options: ['18 000 Ft', '19 000 Ft', '20 000 Ft', '17 500 Ft'],
        correctAnswer: '18 000 Ft',
        explanation: 'Emelés után: 20 000 · 1,20 = 24 000 Ft. Csökkentés után: 24 000 · 0,75 = 18 000 Ft (vagy 20 000 · 1,20 · 0,75 = 20 000 · 0,90 = 18 000 Ft).',
        breakdown: [{ label: 'Láncolt szorzó', value: '1,20 · 0,75 = 0,90' }, { label: 'Végár', value: '20 000 · 0,90 = 18 000 Ft (-10%)' }],
        hint: '1,20 · 0,75 = 0,90, tehát a termék 10%-kal lett olcsóbb.'
      },
      {
        id: 'q2-30',
        prompt: 'Egy hordóban lévő 240 liter víznek 15%-a elpárolgott a nyári melegben. Hány liter víz maradt a hordóban?',
        options: ['204 liter', '210 liter', '196 liter', '216 liter'],
        correctAnswer: '204 liter',
        explanation: 'Elpárolgott: 240 · 0,15 = 36 liter. Maradt: 240 - 36 = 204 liter (vagy 240 · 0,85 = 204 liter).',
        breakdown: [{ label: 'Elpárolgott víz', value: '36 liter' }, { label: 'Maradt víz', value: '204 liter' }],
        hint: 'Szorozd meg a 240-et 0,85-tel!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Keverési Mesterfeladatok',
    subtitle: 'Többlépéses árváltozások, keverékek és oldatok, alapváltások és felvételi szintű szöveges feladatok (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Láncolt szorzók, tömegszázalék, hígítás, összetett gazdasági és logikai feladatok',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Összeöntünk 200 g 10%-os és 300 g 20%-os sóoldatot. Hány tömegszázalékos lesz a kapott keverék?',
        options: ['16%', '15%', '18%', '14%'],
        correctAnswer: '16%',
        explanation: '1. oldat sója: 200 · 0,10 = 20 g. 2. oldat sója: 300 · 0,20 = 60 g. Összes só = 80 g. Összes oldat = 500 g. Töménység = 80 / 500 = 16 / 100 = 16%.',
        breakdown: [{ label: 'Összes só', value: '20 g + 60 g = 80 g' }, { label: 'Összes oldat', value: '200 g + 300 g = 500 g' }, { label: 'Töménység', value: '80 / 500 = 16%' }],
        hint: 'Számold ki külön a sók tömegét, majd oszd el az 500 g össztömeggel!'
      },
      {
        id: 'q3-2',
        prompt: 'Egy termék árát egymás után kétszer felemelték 20%-kal. Hány százalékkal lett drágább a termék az eredeti árához képest?',
        options: ['44%-kal', '40%-kal', '42%-kal', '48%-kal'],
        correctAnswer: '44%-kal',
        explanation: 'Láncolt szorzó: 1,20 · 1,20 = 1,44. Ez 144%-ot jelent, vagyis a növekedés pontosan 44% (nem 40%!).',
        breakdown: [{ label: 'Szorzók szorzata', value: '1,20 · 1,20 = 1,44' }, { label: 'Áremelkedés', value: '+44%' }],
        hint: 'A második 20% már a megemelt árra vonatkozik!'
      },
      {
        id: 'q3-3',
        prompt: 'Egy részvény ára az első napon 30%-kal zuhant, a második napon viszont 30%-kal emelkedett. Hogyan változott az ára az eredetihez képest?',
        options: ['9%-kal csökkent', 'Nem változott (0%)', '9%-kal nőtt', '6%-kal csökkent'],
        correctAnswer: '9%-kal csökkent',
        explanation: 'Szorzók: 0,70 · 1,30 = 0,91. A végső ár az eredeti 91%-a, ami 9%-os veszteséget jelent.',
        breakdown: [{ label: 'Szorzók', value: '0,70 · 1,30 = 0,91' }, { label: 'Változás', value: '100% - 91% = -9%' }],
        hint: '0,70 · 1,30 = 0,91.'
      },
      {
        id: 'q3-4',
        prompt: 'Hány gramm vizet kell hozzáadni 300 g 20%-os sóoldathoz, hogy 15%-os sóoldatot kapjunk?',
        options: ['100 g', '80 g', '120 g', '150 g'],
        correctAnswer: '100 g',
        explanation: 'A só mennyisége nem változik: 300 · 0,20 = 60 g só. Az új oldatban a 60 g só a 15%-ot jelenti: m_új = 60 : 0,15 = 400 g. Hozzáadott víz: 400 - 300 = 100 g.',
        breakdown: [{ label: 'Só tömege', value: '60 g' }, { label: 'Új oldat tömege', value: '60 / 0,15 = 400 g' }, { label: 'Hozzáadott víz', value: '400 - 300 = 100 g' }],
        hint: 'Hígításkor az oldott só tömege állandó marad!'
      },
      {
        id: 'q3-5',
        prompt: 'Egy termék bruttó ára 27% ÁFA mellett 76 200 Ft. Mennyi az ÁFA összege forintban?',
        options: ['16 200 Ft', '20 574 Ft', '18 000 Ft', '15 000 Ft'],
        correctAnswer: '16 200 Ft',
        explanation: 'Nettó ár = 76 200 : 1,27 = 60 000 Ft. ÁFA összege = 76 200 - 60 000 = 16 200 Ft (vagy 60 000 · 0,27 = 16 200 Ft).',
        breakdown: [{ label: 'Nettó ár', value: '76 200 : 1,27 = 60 000 Ft' }, { label: 'ÁFA összege', value: '16 200 Ft' }],
        hint: 'Először számold ki a nettó árat osztással (1,27-tel), majd vond ki a bruttóból!'
      },
      {
        id: 'q3-6',
        prompt: 'Egy hordóban 400 g 25%-os cukoroldat van. Hány gramm vizet kell elpárologtatni belőle, hogy 40%-os töménységű legyen?',
        options: ['150 g', '100 g', '120 g', '200 g'],
        correctAnswer: '150 g',
        explanation: 'Cukor tömege = 400 · 0,25 = 100 g. Az új oldatban ez 40%: m_új = 100 : 0,40 = 250 g. Elpárologtatott víz = 400 - 250 = 150 g.',
        breakdown: [{ label: 'Cukor', value: '100 g' }, { label: 'Új oldat tömege', value: '100 / 0,40 = 250 g' }, { label: 'Elpárolgott víz', value: '400 - 250 = 150 g' }],
        hint: 'A cukor mennyisége nem párolog el!'
      },
      {
        id: 'q3-7',
        prompt: 'Egy cipőboltban az árakat 25%-kal csökkentették. Hány százalékkal kell most felemelni az akciós árakat, hogy visszakapjuk az eredeti árat?',
        options: ['33,33%-kal (1/3 résszel)', '25%-kal', '30%-kal', '20%-kal'],
        correctAnswer: '33,33%-kal (1/3 résszel)',
        explanation: 'Az akciós ár az eredeti 75%-a (3/4 része). Hogy 1-et kapjunk, 4/3-mal kell szorozni, ami 1 + 1/3 = +33,33%-os emelést jelent.',
        breakdown: [{ label: 'Akciós szorzó', value: '0,75 = 3/4' }, { label: 'Szükséges szorzó', value: '1 / 0,75 = 4/3 ≈ 1,3333' }, { label: 'Emelés', value: '+33,33%' }],
        hint: 'A 75%-ról kell visszajutni 100%-ra: 25 / 75 = 1/3!'
      },
      {
        id: 'q3-8',
        prompt: 'Egy bankbetétbe 1 000 000 Ft-ot helyezünk el évi 10%-os kamatos kamatra. Mennyi lesz a megtakarítás értéke 2 év múlva?',
        options: ['1 210 000 Ft', '1 200 000 Ft', '1 220 000 Ft', '1 110 000 Ft'],
        correctAnswer: '1 210 000 Ft',
        explanation: 'Kamatos kamat: 1 000 000 · 1,10 · 1,10 = 1 000 000 · 1,21 = 1 210 000 Ft (az 1. év után 1,1M Ft, a 2. évben erre jön a 10%, ami +110 000 Ft).',
        breakdown: [{ label: '1. év után', value: '1 100 000 Ft' }, { label: '2. év után', value: '1 100 000 · 1,10 = 1 210 000 Ft' }],
        hint: 'Kamatos kamatnál a második évben a kamat is kamatozik!'
      },
      {
        id: 'q3-9',
        prompt: 'Egy 500 fős iskolában a tanulók 60%-a sportol rendszeresen. A sportolók 40%-a fiú. Hány lány sportol az iskolában?',
        options: ['180 lány', '120 lány', '200 lány', '150 lány'],
        correctAnswer: '180 lány',
        explanation: 'Sportolók száma: 500 · 0,60 = 300 fő. A sportolóknak 60%-a lány (100% - 40% = 60%). Lány sportolók: 300 · 0,60 = 180 fő (vagy 500 · 0,60 · 0,60 = 180).',
        breakdown: [{ label: 'Összes sportoló', value: '300 fő' }, { label: 'Lány sportolók aránya', value: '60%' }, { label: 'Lányok száma', value: '300 · 0,60 = 180' }],
        hint: '500-nak a 60%-a sportol, és ennek a 60%-a lány.'
      },
      {
        id: 'q3-10',
        prompt: 'Egy téglalap hosszúságát 20%-kal megnöveltük, szélességét viszont 10%-kal csökkentettük. Hogyan változott a téglalap területe?',
        options: ['8%-kal nőtt', '10%-kal nőtt', '8%-kal csökkent', 'Nem változott'],
        correctAnswer: '8%-kal nőtt',
        explanation: 'Terület szorzója = 1,20 · 0,90 = 1,08. Ez 108%-ot jelent, tehát a terület pontosan 8%-kal növekedett.',
        breakdown: [{ label: 'Szorzók', value: '1,20 · 0,90 = 1,08' }, { label: 'Változás', value: '+8%' }],
        hint: 'Szorozd össze a két oldal szorzótényezőjét: 1,20 · 0,90!'
      },
      {
        id: 'q3-11',
        prompt: 'Egy négyzet oldalát 30%-kal megnöveljük. Hány százalékkal nő meg a területe?',
        options: ['69%-kal', '60%-kal', '30%-kal', '90%-kal'],
        correctAnswer: '69%-kal',
        explanation: 'Új terület = (1,30 · a)² = 1,69 · a² = 1,69 · T. Ez 169%, vagyis a terület 69%-kal nőtt meg (nem 60%-kal!).',
        breakdown: [{ label: 'Oldal szorzója', value: '1,30' }, { label: 'Terület szorzója', value: '1,30² = 1,69' }, { label: 'Növekedés', value: '+69%' }],
        hint: '1,3 · 1,3 = 1,69.'
      },
      {
        id: 'q3-12',
        prompt: 'Egy kávéfőző árát előbb felemelték 15%-kal, majd az új árat leértékelték 20%-kal, így 27 600 Ft lett. Mennyi volt az eredeti ára?',
        options: ['30 000 Ft', '32 000 Ft', '29 000 Ft', '28 500 Ft'],
        correctAnswer: '30 000 Ft',
        explanation: 'Láncolt szorzó = 1,15 · 0,80 = 0,92. Eredeti ár = 27 600 : 0,92 = 30 000 Ft.',
        breakdown: [{ label: 'Láncolt szorzó', value: '1,15 · 0,80 = 0,92' }, { label: 'Eredeti ár', value: '27 600 / 0,92 = 30 000 Ft' }],
        hint: '1,15 · 0,80 = 0,92. Oszd el a 27 600-at 0,92-vel!'
      },
      {
        id: 'q3-13',
        prompt: 'Egy üzemben a selejt aránya 4%. Egy nap 2400 hibátlan terméket gyártottak. Hány darab terméket gyártottak összesen aznap?',
        options: ['2500 db', '2496 db', '2600 db', '2450 db'],
        correctAnswer: '2500 db',
        explanation: 'A hibátlan termékek aránya 100% - 4% = 96%. Összes gyártott termék: 2400 : 0,96 = 2500 db.',
        breakdown: [{ label: 'Hibátlan arány', value: '96%' }, { label: 'Összes gyártott termék', value: '2400 : 0,96 = 2500 db' }],
        hint: 'A 2400 darab nem a 100%, hanem a 96%!'
      },
      {
        id: 'q3-14',
        prompt: '150 g 12%-os cukoroldathoz hozzáadunk 50 g 20%-os cukoroldatot és 100 g tiszta vizet. Hány százalékos lesz a keverék?',
        options: ['9,33%', '10%', '8,5%', '11,2%'],
        correctAnswer: '9,33%',
        explanation: 'Cukor az 1.-ből: 150 · 0,12 = 18 g. Cukor a 2.-ból: 50 · 0,20 = 10 g. Vízben 0 g cukor. Összes cukor = 28 g. Összes oldat = 150 + 50 + 100 = 300 g. Töménység = 28 / 300 ≈ 0,0933 = 9,33%.',
        breakdown: [{ label: 'Összes cukor', value: '18 g + 10 g = 28 g' }, { label: 'Összes oldat', value: '300 g' }, { label: 'Töménység', value: '28 / 300 ≈ 9,33%' }],
        hint: 'A víz növeli az oldat össztömegét, de cukrot nem ad hozzá!'
      },
      {
        id: 'q3-15',
        prompt: 'Egy autó ára az amortizáció miatt évente 15%-ot veszít értékéből. Hány százaléka marad meg az eredeti értékének 2 év elteltével?',
        options: ['72,25%', '70%', '75%', '68%'],
        correctAnswer: '72,25%',
        explanation: 'Minden évben 0,85-szörösére csökken. 2 év múlva: 0,85 · 0,85 = 0,7225, vagyis az eredeti érték 72,25%-a marad meg.',
        breakdown: [{ label: '1 év után', value: '85%' }, { label: '2 év után', value: '0,85² = 0,7225 = 72,25%' }],
        hint: '0,85 · 0,85 = 0,7225.'
      },
      {
        id: 'q3-16',
        prompt: 'Egy társasház felújítási alapjához három lakó a lakásuk alapterülete (40 m², 60 m², 100 m²) arányában járul hozzá. Az összköltség 1 000 000 Ft. Mennyit fizet a 60 m²-es lakás tulajdonosa?',
        options: ['300 000 Ft', '200 000 Ft', '500 000 Ft', '350 000 Ft'],
        correctAnswer: '300 000 Ft',
        explanation: 'Összes terület: 40 + 60 + 100 = 200 m². 1 m² költsége: 1 000 000 : 200 = 5000 Ft. A 60 m²-es lakás: 60 · 5000 = 300 000 Ft (arány: 30%).',
        breakdown: [{ label: 'Összterület', value: '200 m²' }, { label: '1 m² költsége', value: '5000 Ft' }, { label: '60 m² költsége', value: '300 000 Ft' }],
        hint: 'A 60 m² a 200 m²-nek pontosan a 30%-a.'
      },
      {
        id: 'q3-17',
        prompt: 'Hány gramm 30%-os és hány gramm 10%-os oldatot kell összeönteni, hogy 400 g 15%-os oldatot kapjunk?',
        options: ['100 g 30%-os és 300 g 10%-os', '150 g 30%-os és 250 g 10%-os', '200 g 30%-os és 200 g 10%-os', '80 g 30%-os és 320 g 10%-os'],
        correctAnswer: '100 g 30%-os és 300 g 10%-os',
        explanation: 'Keverési egyenlet: 0,30 · x + 0,10 · (400 - x) = 400 · 0,15 = 60. 0,20 · x + 40 = 60 ⟹ 0,20 · x = 20 ⟹ x = 100 g a 30%-osból, és 300 g a 10%-osból.',
        breakdown: [{ label: 'Kívánt só', value: '400 · 0,15 = 60 g' }, { label: 'Megoldás', value: '100 g 30%-os (30 g) + 300 g 10%-os (30 g) = 60 g' }],
        hint: 'Keresztszabály: a távolságok aránya: (30-15) : (15-10) = 15 : 5 = 3 : 1 a 10%-os javára.'
      },
      {
        id: 'q3-18',
        prompt: 'Egy henger sugarát 10%-kal megnöveljük, a magasságát viszont 20%-kal csökkentjük. Hogyan változik a térfogata (V = r² · π · m)?',
        options: ['3,2%-kal csökken', '10%-kal csökken', '2%-kal nő', 'Nem változik'],
        correctAnswer: '3,2%-kal csökken',
        explanation: 'r² szorzója = 1,10² = 1,21. Magasság szorzója = 0,80. Térfogat szorzója = 1,21 · 0,80 = 0,968. Ez 96,8%, ami 3,2%-os csökkenést jelent.',
        breakdown: [{ label: 'Sugár négyzete', value: '1,10² = 1,21' }, { label: 'Magasság', value: '0,80' }, { label: 'Új térfogat', value: '1,21 · 0,80 = 0,968 (-3,2%)' }],
        hint: 'A sugár a négyzeten szerepel a képletben!'
      },
      {
        id: 'q3-19',
        prompt: 'Egy boltban minden árat 20%-kal felemeltek. A forgalom (vásárolt darabszám) emiatt 20%-kal visszaesett. Hogyan változott a bolt összbevétele?',
        options: ['4%-kal csökkent', 'Nem változott', '4%-kal nőtt', '2%-kal csökkent'],
        correctAnswer: '4%-kal csökkent',
        explanation: 'Bevétel = Ár · Darabszám. Új bevétel = 1,20 · 0,80 = 0,96-szorosa a korábbinak, azaz 4%-kal csökkent.',
        breakdown: [{ label: 'Láncolt szorzó', value: '1,20 · 0,80 = 0,96' }, { label: 'Változás', value: '-4%' }],
        hint: '1,20 · 0,80 = 0,96.'
      },
      {
        id: 'q3-20',
        prompt: 'Egy 14 karátos arany ékszer aranytartalma 58,5%. Hány gramm tiszta aranyat tartalmaz egy 20 grammos karkötő?',
        options: ['11,7 g', '12,0 g', '10,5 g', '14,0 g'],
        correctAnswer: '11,7 g',
        explanation: '20 · 0,585 = 11,7 g tiszta arany.',
        breakdown: [{ label: 'Karkötő tömege', value: '20 g' }, { label: 'Finomság', value: '58,5% = 0,585' }, { label: 'Tiszta arany', value: '11,7 g' }],
        hint: 'Szorozd meg a 20-at 0,585-tel!'
      },
      {
        id: 'q3-21',
        prompt: 'Egy dolgozatban Anna pontszáma 25%-kal több, mint Béláé. Béla pontszáma hány százalékkal kevesebb, mint Annáé?',
        options: ['20%-kal', '25%-kal', '15%-kal', '16,67%-kal'],
        correctAnswer: '20%-kal',
        explanation: 'Ha Béla 100 pont, Anna 125 pont. A különbség 25 pont. Annához képest: 25 / 125 = 1/5 = 20%.',
        breakdown: [{ label: 'Béla', value: '100 (alap)' }, { label: 'Anna', value: '125 (+25%)' }, { label: 'Béla Annához képest', value: '25 / 125 = 20% kevesebb' }],
        hint: 'Vigyázz a viszonyítási alapra: most Anna pontszáma a 100%!'
      },
      {
        id: 'q3-22',
        prompt: 'Hány kg friss gombából kapunk 6 kg szárított gombát, ha a friss gomba víztartalma 90%, a szárított gombáé pedig 20%?',
        options: ['48 kg', '60 kg', '54 kg', '40 kg'],
        correctAnswer: '48 kg',
        explanation: 'A szárazanyag tömege állandó: a 6 kg szárított gomba 80%-a szárazanyag: 6 · 0,80 = 4,8 kg. A friss gombában ez a 4,8 kg szárazanyag a 10%-ot (100% - 90%) teszi ki: 4,8 : 0,10 = 48 kg friss gomba kell.',
        breakdown: [{ label: 'Szárazanyag a szárítottban', value: '6 · 0,80 = 4,8 kg' }, { label: 'Szárazanyag a frissben', value: '10% = 4,8 kg' }, { label: 'Friss gomba tömege', value: '4,8 : 0,10 = 48 kg' }],
        hint: 'A szárazanyag (nem a víz!) tömege nem változik a száradás során!'
      },
      {
        id: 'q3-23',
        prompt: 'Egy 500 g-os 8%-os ecetoldatot bepárolunk úgy, hogy a tömege 400 g-ra csökken. Hány százalékos lesz a bepárolt ecetoldat?',
        options: ['10%', '12%', '9%', '11%'],
        correctAnswer: '10%',
        explanation: 'Ecetsav tömege = 500 · 0,08 = 40 g. Új tömeg = 400 g. Töménység = 40 / 400 = 1/10 = 10%.',
        breakdown: [{ label: 'Ecetsav tömege', value: '40 g' }, { label: 'Új oldat tömege', value: '400 g' }, { label: 'Töménység', value: '40 / 400 = 10%' }],
        hint: 'A tiszta ecetsav nem párolog el, csak a víz!'
      },
      {
        id: 'q3-24',
        prompt: 'Egy termék ára nettó 80 000 Ft. A kereskedő 20% árrést tesz rá, majd erre számol fel 27% ÁFA-t. Mennyi a végső fogyasztói ár?',
        options: ['121 920 Ft', '118 000 Ft', '124 500 Ft', '120 000 Ft'],
        correctAnswer: '121 920 Ft',
        explanation: 'Árréssel növelt ár = 80 000 · 1,20 = 96 000 Ft. ÁFÁ-val növelt bruttó ár = 96 000 · 1,27 = 121 920 Ft.',
        breakdown: [{ label: 'Árréssel', value: '80 000 · 1,20 = 96 000 Ft' }, { label: 'Bruttó ár (27% ÁFA)', value: '96 000 · 1,27 = 121 920 Ft' }],
        hint: '80 000 · 1,20 · 1,27 = 121 920 Ft.'
      },
      {
        id: 'q3-25',
        prompt: 'Egy 60 fős táborban az étkezési költség 14 napra 840 000 Ft. Mennyi lenne az étkezési költség 80 főre 10 napra ugyanilyen feltételekkel?',
        options: ['800 000 Ft', '850 000 Ft', '780 000 Ft', '900 000 Ft'],
        correctAnswer: '800 000 Ft',
        explanation: '1 fő 1 napi költsége: 840 000 : (60 · 14) = 840 000 : 840 = 1000 Ft/fő/nap. 80 fő 10 napra: 80 · 10 · 1000 = 800 000 Ft.',
        breakdown: [{ label: '1 főre 1 nap', value: '1000 Ft' }, { label: '80 fő 10 napra', value: '80 · 10 · 1000 = 800 000 Ft' }],
        hint: 'Számold ki az egy főre eső napi étkezési díjat!'
      },
      {
        id: 'q3-26',
        prompt: 'Ha egy számot előbb megnövelünk 50%-kal, majd a kapott számot csökkentjük 50%-kal, az eredeti szám hány százalékát kapjuk?',
        options: ['75%-át (25%-os veszteség)', '100%-át', '50%-át', '80%-át'],
        correctAnswer: '75%-át (25%-os veszteség)',
        explanation: '1,50 · 0,50 = 0,75 = 75%. Az eredeti szám egynegyed része (25%-a) elvész!',
        breakdown: [{ label: 'Szorzók', value: '1,50 · 0,50 = 0,75' }, { label: 'Változás', value: '-25%' }],
        hint: '1,5 szorozva 0,5-tel az 0,75!'
      },
      {
        id: 'q3-27',
        prompt: 'Egy üvegben 600 ml 40%-os alkoholos fertőtlenítő van. Mennyi tiszta vizet kell hozzáadni, hogy 30%-os legyen?',
        options: ['200 ml', '150 ml', '250 ml', '180 ml'],
        correctAnswer: '200 ml',
        explanation: 'Tiszta alkohol = 600 · 0,40 = 240 ml. Új térfogat 30%-osként: 240 : 0,30 = 800 ml. Hozzáadandó víz = 800 - 600 = 200 ml.',
        breakdown: [{ label: 'Tiszta alkohol', value: '240 ml' }, { label: 'Új össztérfogat', value: '240 / 0,30 = 800 ml' }, { label: 'Hozzáadandó víz', value: '800 - 600 = 200 ml' }],
        hint: '240 : 0,30 = 800 ml. Vonj ki 600-at!'
      },
      {
        id: 'q3-28',
        prompt: 'Egy 15 000 000 Ft értékű lakás vásárlásakor a vagyonszerzési illeték 4%, az ügyvédi díj 1%, a felújítás a vételár 12%-a. Mennyi az összes járulékos költség forintban?',
        options: ['2 550 000 Ft', '2 400 000 Ft', '2 700 000 Ft', '2 250 000 Ft'],
        correctAnswer: '2 550 000 Ft',
        explanation: 'Összes járulékos százalék: 4% + 1% + 12% = 17%. Költség: 15 000 000 · 0,17 = 2 550 000 Ft.',
        breakdown: [{ label: 'Összes százalék', value: '17%' }, { label: 'Költség', value: '15 000 000 · 0,17 = 2 550 000 Ft' }],
        hint: 'Add össze a százalékokat: 4 + 1 + 12 = 17%!'
      },
      {
        id: 'q3-29',
        prompt: 'Egy termék ára januárban 10%-kal, februárban 15%-kal, márciusban pedig 20%-kal nőtt. Milyen szorzóval kaphatjuk meg közvetlenül a márciusi árat a januári kiinduló árból?',
        options: ['1,518', '1,450', '1,500', '1,552'],
        correctAnswer: '1,518',
        explanation: 'Szorzók összeszorzása: 1,10 · 1,15 · 1,20 = 1,10 · 1,38 = 1,518 (vagyis 51,8%-os a teljes drágulás, nem 45%!).',
        breakdown: [{ label: '1,10 · 1,15', value: '1,265' }, { label: '1,265 · 1,20', value: '1,518 (+51,8%)' }],
        hint: 'Szorozd össze: 1,10 · 1,15 · 1,20!'
      },
      {
        id: 'q3-30',
        prompt: 'Egy iskolai szintfelmérőn a résztvevők 15%-a jeles, 45%-a jó, 30%-a közepes, és a maradék 12 diák elégséges lett. Hány tanuló írta meg a dolgozatot?',
        options: ['120 diák', '100 diák', '150 diák', '140 diák'],
        correctAnswer: '120 diák',
        explanation: 'Elégségesek aránya: 100% - (15% + 45% + 30%) = 100% - 90% = 10%. Ha 10% = 12 diák, akkor a 100% = 12 · 10 = 120 diák.',
        breakdown: [{ label: 'Elégséges arány', value: '10%' }, { label: '10% értéke', value: '12 diák' }, { label: 'Összes diák (100%)', value: '12 · 10 = 120 diák' }],
        hint: '100% - 90% = 10%. Ha a 10% az 12 diák, mennyi a 100%?'
      }
    ]
  }
};

export const PercentSummaryQuiz: React.FC<PercentSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percentages"
      topicId="g7-pct-summary"
      topicTitle="8. Összefoglalás"
      subtopicId="osszefoglalas"
      documentId="grade-7-szazalekszamitas-osszefoglalas-quiz"
      emoji="🏆"
      topicBadge="7. Osztály • Matematika V. Témakör"
      badgeText="7. Osztály • Matematika V. Témakör"
      category="Százalékszámítás"
      title="Százalékszámítás – Fejezeti Összefoglaló Kvíz"
      subtitle="Átfogó fejezeti szintézis: alap, érték, százalékláb, áremelés, leértékelés, ÁFA, keverési feladatok és arányos osztás 3 szinten 90 mesterfeladaton!"
      cheatSheetTitle="Fejezeti Rendszerező Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<PercentSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PercentSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="rose"
      hintText="💡 Használd a felül megnyitható szabálytárat az alapképletekhez, szorzókhoz és a keverési szabályhoz!"
    />
  );
};

export default PercentSummaryQuiz;
