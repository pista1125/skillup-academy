import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Coins,
  TrendingUp,
  Percent,
  Landmark,
  Receipt,
  Scale,
  Award,
  LayoutGrid,
  ArrowRightLeft,
  Sparkles,
  AlertTriangle,
  PiggyBank
} from 'lucide-react';
import { FinancialProblemsMatcher } from './FinancialProblemsMatcher';
import { FinancialProblemsSorter } from './FinancialProblemsSorter';

interface FinancialProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egymást Követő Árváltozások',
    icon: <TrendingUp className="w-4 h-4 text-amber-600" />,
    formula: 'Ú = E \\cdot \\left(1 \\pm \\frac{p_1}{100}\\right) \\cdot \\left(1 \\pm \\frac{p_2}{100}\\right)',
    note: 'A százalékos változások NEM adódnak össze! Mindig az új, módosított ár képezi a következő számítás alapját (láncszorzás).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="10" y="10" width="38" height="25" rx="3" className="fill-amber-50 stroke-amber-400 stroke-[1]" />
        <rect x="62" y="10" width="38" height="25" rx="3" className="fill-blue-50 stroke-blue-400 stroke-[1]" />
        <rect x="114" y="10" width="38" height="25" rx="3" className="fill-rose-50 stroke-rose-400 stroke-[1]" />
        <text x="29" y="22" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">x</text>
        <text x="29" y="30" className="text-[6px] fill-amber-600" textAnchor="middle">Kezdőár</text>
        <text x="55" y="24" className="text-[7px] font-bold fill-slate-500" textAnchor="middle">→</text>
        <text x="81" y="22" className="text-[7px] font-bold fill-blue-800" textAnchor="middle">· 1,20</text>
        <text x="81" y="30" className="text-[5.5px] fill-blue-600" textAnchor="middle">+20% emelés</text>
        <text x="107" y="24" className="text-[7px] font-bold fill-slate-500" textAnchor="middle">→</text>
        <text x="133" y="22" className="text-[7px] font-bold fill-rose-800" textAnchor="middle">· 0,80</text>
        <text x="133" y="30" className="text-[5.5px] fill-rose-600" textAnchor="middle">-20% akció</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Eredeti Ár Visszaszámolása',
    icon: <Percent className="w-4 h-4 text-emerald-600" />,
    formula: 'x = \\frac{\\text{Akciós ár}}{1 - \\frac{p}{100}} = \\frac{\\text{Új ár}}{q}',
    note: 'Ha az akciós árat ismerjük, az eredeti árat osztással kapjuk meg a szorzótényezőből, nem pedig hozzáadással!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="15" y="12" width="60" height="22" rx="3" className="fill-emerald-50 stroke-emerald-400 stroke-[1]" />
        <rect x="95" y="12" width="50" height="22" rx="3" className="fill-slate-100 stroke-slate-300 stroke-[1]" />
        <text x="45" y="26" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">0,75 · x = 15 000</text>
        <text x="120" y="26" className="text-[7.5px] font-bold fill-slate-700" textAnchor="middle">x = 20 000 Ft</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Egyszerű Kamatszámítás Képlete',
    icon: <Landmark className="w-4 h-4 text-blue-600" />,
    formula: 'K = \\frac{T \\cdot p \\cdot t}{100}',
    note: 'T: Lekötött tőke, p: éves kamatláb (%), t: futamidő években. Havi lekötés esetén: t = hónap / 12.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="45" cy="22" r="14" className="fill-blue-50 stroke-blue-400 stroke-[1.5]" />
        <circle cx="115" cy="22" r="14" className="fill-emerald-50 stroke-emerald-400 stroke-[1.5]" />
        <text x="45" y="25" className="text-[8px] font-bold fill-blue-700" textAnchor="middle">Tőke (T)</text>
        <text x="115" y="25" className="text-[8px] font-bold fill-emerald-700" textAnchor="middle">+ Kamat (K)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Bruttó és Nettó ÁFA Összefüggése',
    icon: <Receipt className="w-4 h-4 text-indigo-600" />,
    formula: '\\text{Bruttó} = \\text{Nettó} \\cdot 1,27 \\iff \\text{Nettó} = \\frac{\\text{Bruttó}}{1,27}',
    note: '27%-os ÁFA mellett a bruttó ár 127%-a a nettónak. A bruttóból nettót mindig 1,27-tel való osztással számolunk!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="20" y="12" width="50" height="22" rx="3" className="fill-indigo-50 stroke-indigo-400 stroke-[1]" />
        <rect x="90" y="12" width="50" height="22" rx="3" className="fill-purple-50 stroke-purple-400 stroke-[1]" />
        <text x="45" y="26" className="text-[7.5px] font-bold fill-indigo-800" textAnchor="middle">Nettó: 100%</text>
        <text x="115" y="26" className="text-[7.5px] font-bold fill-purple-800" textAnchor="middle">Bruttó: 127%</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Kereskedői Haszon és Haszonkulcs',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: '\\text{Eladási ár} = \\text{Beszerzési ár} \\cdot (1 + h)',
    note: 'A haszonszázalékot mindig a beszerzési árhoz viszonyítjuk. 20% haszon esetén a szorzó 1,20.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-slate-300 stroke-[2]" />
        <polygon points="80,22 74,36 86,36" className="fill-amber-500" />
        <text x="50" y="18" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">Beszerzési ár</text>
        <text x="110" y="18" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">+ Haszon</text>
      </svg>
    )
  },
  {
    id: 'c6',
    title: 'Százalékos Aszimmetria Szabálya',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '0,80 \\cdot 1,25 = 1,00 \\iff -20\\% \\implies +25\\%',
    note: 'Egy árcsökkenés után mindig MAGASABB százalékos emelés szükséges az eredeti szint eléréséhez!',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <rect x="25" y="12" width="50" height="22" rx="3" className="fill-rose-50 stroke-rose-400 stroke-[1]" />
        <rect x="85" y="12" width="50" height="22" rx="3" className="fill-emerald-50 stroke-emerald-400 stroke-[1]" />
        <text x="50" y="26" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">-20% esés</text>
        <text x="110" y="26" className="text-[7.5px] font-bold fill-emerald-700" textAnchor="middle">+25% emelés</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapozó Pénzügyi Számítások',
    subtitle: 'Egyszerű áremelések, leértékelések, kamat és ÁFA alapösszefüggései',
    questions: [
      {
        id: 'g8-eq-fin-l1-q1',
        title: 'Télikabát leértékelése',
        question: 'Egy 20 000 Ft-os télikabátot 20%-kal leértékeltek a szezon végén. Mennyi az új akciós ára?',
        options: ['16 000 Ft', '18 000 Ft', '15 000 Ft', '17 000 Ft'],
        correctAnswer: '16 000 Ft',
        explanation: 'Az új ár az eredeti ár 80%-a (100% - 20% = 80%). Új ár = 20 000 · 0,80 = 16 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q2',
        title: 'Társasjáték drágulása',
        question: 'Egy társasjáték ára 8000 Ft volt, de 15%-kal megemelték az árát. Mennyibe kerül most?',
        options: ['9 200 Ft', '9 500 Ft', '8 800 Ft', '9 000 Ft'],
        correctAnswer: '9 200 Ft',
        explanation: '15%-os emelésnél az ár 115%-ra nő (szorzó: 1,15). Új ár = 8000 · 1,15 = 9200 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q3',
        title: 'Egyéves bankbetét',
        question: '100 000 Ft-ot lekötünk a bankban 1 évre évi 7%-os kamatra. Mennyi pénzünk lesz 1 év múlva kamattal együtt?',
        options: ['107 000 Ft', '103 500 Ft', '114 000 Ft', '170 000 Ft'],
        correctAnswer: '107 000 Ft',
        explanation: 'A tőke kamata: 100 000 · 0,07 = 7000 Ft. A teljes felvehető összeg: 100 000 + 7000 = 107 000 Ft (vagy 100 000 · 1,07).'
      },
      {
        id: 'g8-eq-fin-l1-q4',
        title: 'Pulóver eredeti ára',
        question: 'Egy pulóver ára a 30%-os leárazás után 14 000 Ft. Mennyi volt az eredeti ára a leárazás előtt?',
        options: ['20 000 Ft', '18 200 Ft', '19 000 Ft', '22 000 Ft'],
        correctAnswer: '20 000 Ft',
        explanation: 'A 30%-os leértékelés után a termék ára az eredeti ár 70%-a: 0,70 · x = 14 000 Ft => x = 14 000 / 0,70 = 20 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q5',
        title: 'Nettó ár bruttósítása ÁFA-val',
        question: 'Egy szerszámkészlet nettó ára 50 000 Ft. Mennyi a bruttó fogyasztói ára 27%-os ÁFA mellett?',
        options: ['63 500 Ft', '62 000 Ft', '65 000 Ft', '57 500 Ft'],
        correctAnswer: '63 500 Ft',
        explanation: 'Bruttó ár = Nettó ár · 1,27 = 50 000 · 1,27 = 63 500 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q6',
        title: 'Kereskedői haszonkulcs',
        question: 'Egy könyvesbolt egy albumot 2000 Ft-ért szerez be, és 25%-os haszonnal adja el. Mennyi a könyv eladási ára?',
        options: ['2 500 Ft', '2 400 Ft', '2 600 Ft', '2 250 Ft'],
        correctAnswer: '2 500 Ft',
        explanation: 'Haszon = 2000 · 0,25 = 500 Ft. Eladási ár = 2000 + 500 = 2500 Ft (vagy 2000 · 1,25 = 2500 Ft).'
      },
      {
        id: 'g8-eq-fin-l1-q7',
        title: 'Féléves lekötés kamata',
        question: '400 000 Ft-ot 6 hónapra (fél évre) kötünk le évi 8%-os egyszerű kamatra. Mennyi kamatot kapunk a félév végén?',
        options: ['16 000 Ft', '32 000 Ft', '8 000 Ft', '24 000 Ft'],
        correctAnswer: '16 000 Ft',
        explanation: 'Az éves kamat: 400 000 · 0,08 = 32 000 Ft. Mivel a futamidő fél év (t = 0,5 év), a jóváírt kamat: 32 000 · 0,5 = 16 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q8',
        title: 'Áremelkedés százaléka',
        question: 'Egy cipő ára 15 000 Ft-ról 18 000 Ft-ra nőtt. Hány százalékkal drágult a cipő?',
        options: ['20%-kal', '15%-kal', '25%-kal', '16,6%-kal'],
        correctAnswer: '20%-kal',
        explanation: 'A drágulás összege: 18 000 - 15 000 = 3000 Ft. A százalékos növekedés a kiindulási árhoz képest: 3000 / 15 000 = 0,20 = 20%.'
      },
      {
        id: 'g8-eq-fin-l1-q9',
        title: 'Bruttó árból nettó kiszámítása',
        question: 'Egy okostelefon bruttó ára 254 000 Ft (27% ÁFA-t tartalmaz). Mennyi a készülék nettó ára?',
        options: ['200 000 Ft', '185 420 Ft', '210 000 Ft', '198 000 Ft'],
        correctAnswer: '200 000 Ft',
        explanation: 'Bruttó = Nettó · 1,27 => Nettó = Bruttó / 1,27 = 254 000 / 1,27 = 200 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l1-q10',
        title: 'Emelés majd azonnali leértékelés',
        question: 'Egy 50 000 Ft-os kerékpár árát előbb 10%-kal felemelték, majd azonnal 10%-kal leértékelték. Mennyi lett a végső ára?',
        options: ['49 500 Ft', '50 000 Ft', '51 000 Ft', '48 500 Ft'],
        correctAnswer: '49 500 Ft',
        explanation: 'Láncszorzás: 50 000 · 1,10 · 0,90 = 50 000 · 0,99 = 49 500 Ft. (Nem marad 50 000 Ft, mert a 10%-os leértékelés már a magasabb, 55 000 Ft-os árból vonódik le!)'
      }
    ]
  },
  2: {
    title: '2. Szint: Összetett és Gyakorlati Pénzügyi Feladatok',
    subtitle: 'Kétlépcsős árváltozások, többéves kamatozás és pénzügyi egyenletek',
    questions: [
      {
        id: 'g8-eq-fin-l2-q1',
        title: 'Kétszeres 10%-os leértékelés',
        question: 'Egy elektronikai cikk árát egymás után kétszer csökkentették 10%-kal. Hány százalékkal csökkent az eredeti árhoz képest?',
        options: ['19%-kal', '20%-kal', '18%-kal', '21%-kal'],
        correctAnswer: '19%-kal',
        explanation: 'A szorzótényezők: 0,90 · 0,90 = 0,81 = 81%. Az eredeti 100%-hoz képest az árcsökkenés: 100% - 81% = 19%.'
      },
      {
        id: 'g8-eq-fin-l2-q2',
        title: '+20% majd -20% hatása',
        question: 'Egy cipő árát 20%-kal megemelték, majd az új árat 20%-kal leértékelték. Hogyan változott a végső ár a kezdetihez képest?',
        options: ['4%-kal csökkent', 'Változatlan maradt', '2%-kal csökkent', '4%-kal nőtt'],
        correctAnswer: '4%-kal csökkent',
        explanation: 'x · 1,20 · 0,80 = 0,96x. Mivel 0,96 = 96%, az ár pontosan 4%-kal lett alacsonyabb az eredetinél.'
      },
      {
        id: 'g8-eq-fin-l2-q3',
        title: 'Hároméves egyszerű kamatozás',
        question: '600 000 Ft-ot beteszünk a bankba évi 6%-os egyszerű kamatra 3 évre. Mennyi kamat gyűlik össze a 3 év alatt összesen?',
        options: ['108 000 Ft', '36 000 Ft', '72 000 Ft', '118 000 Ft'],
        correctAnswer: '108 000 Ft',
        explanation: 'Kamatképlet: K = (T · p · t) / 100 = (600 000 · 6 · 3) / 100 = 36 000 · 3 = 108 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l2-q4',
        title: 'Színházjegyek bevétele',
        question: 'Egy színházban a felnőttjegy 4000 Ft, a diákjegy 2500 Ft. Összesen 120 jegyet adtak el 375 000 Ft értékben. Hány diákjegy kelt el?',
        options: ['70 diákjegy', '50 diákjegy', '60 diákjegy', '80 diákjegy'],
        correctAnswer: '70 diákjegy',
        explanation: 'Legyen d a diákjegyek száma. 2500d + 4000(120 - d) = 375 000 => 2500d + 480 000 - 4000d = 375 000 => 1500d = 105 000 => d = 70 diákjegy.'
      },
      {
        id: 'g8-eq-fin-l2-q5',
        title: 'Árcsökkenés utáni visszadrágítás',
        question: 'Egy termék ára 25%-kal csökkent egy akcióban. Hány százalékkal kell most megemelni az akciós árat, hogy újra az eredeti árat kapjuk?',
        options: ['33,3%-kal (33 és 1/3 %)', '25%-kal', '30%-kal', '20%-kal'],
        correctAnswer: '33,3%-kal (33 és 1/3 %)',
        explanation: 'Az akciós ár 0,75x. Olyan q emelési szorzót keresünk, amelyre 0,75 · q = 1 => q = 1 / 0,75 = 4/3 ≈ 1,3333, ami 33,3%-os áremelést jelent!'
      },
      {
        id: 'g8-eq-fin-l2-q6',
        title: 'Beszerzési ár visszaszámolása',
        question: 'Egy kereskedő 20%-os haszonnal adott el egy készüléket 72 000 Ft-ért. Mennyi volt a beszerzési ára?',
        options: ['60 000 Ft', '57 600 Ft', '62 000 Ft', '55 000 Ft'],
        correctAnswer: '60 000 Ft',
        explanation: 'Beszerzési ár · 1,20 = 72 000 => Beszerzési ár = 72 000 / 1,20 = 60 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l2-q7',
        title: 'Négyhavi betét kamata',
        question: 'Béla 300 000 Ft-ot kötött le évi 9%-os kamatra 4 hónapra. Mennyi kamatot fizet a bank a lejáratkor?',
        options: ['9 000 Ft', '27 000 Ft', '6 000 Ft', '12 000 Ft'],
        correctAnswer: '9 000 Ft',
        explanation: 'A 4 hónap az év egyharmada (4/12 = 1/3 év). K = (300 000 · 9 · (1/3)) / 100 = 27 000 / 3 = 9000 Ft.'
      },
      {
        id: 'g8-eq-fin-l2-q8',
        title: 'Melyik akció éri meg jobban?',
        question: 'Egy 300 000 Ft-os laptopot az A boltban egyszeri 30%-os akcióval, a B boltban egymás után kétszer 15%-os akcióval adnak. Hol olcsóbb?',
        options: ['Az A boltban (210 000 Ft vs 216 750 Ft)', 'A B boltban (olcsóbb a kétszeri akció)', 'Pontosan ugyanannyiba kerül mindkét helyen', 'A B boltban (205 000 Ft)'],
        correctAnswer: 'Az A boltban (210 000 Ft vs 216 750 Ft)',
        explanation: 'A bolt: 300 000 · 0,70 = 210 000 Ft. B bolt: 300 000 · 0,85 · 0,85 = 300 000 · 0,7225 = 216 750 Ft. Az A bolt 6750 Ft-tal kedvezőbb.'
      },
      {
        id: 'g8-eq-fin-l2-q9',
        title: 'Fizetésemelés előtti bér',
        question: 'Egy cég minden dolgozó bérét 12%-kal megemelte. Anna új fizetése 448 000 Ft lett. Mennyi volt a fizetése az emelés előtt?',
        options: ['400 000 Ft', '395 000 Ft', '410 000 Ft', '388 000 Ft'],
        correctAnswer: '400 000 Ft',
        explanation: 'x · 1,12 = 448 000 => x = 448 000 / 1,12 = 400 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l2-q10',
        title: 'Megosztott tőke kamata',
        question: '2 000 000 Ft tőkénk egy részét évi 5%-os, a többit évi 8%-os kamatra fektettük be. Egy év után az összes kamat 136 000 Ft lett. Mennyit fektettünk be 8%-ra?',
        options: ['1 200 000 Ft-ot', '800 000 Ft-ot', '1 000 000 Ft-ot', '1 400 000 Ft-ot'],
        correctAnswer: '1 200 000 Ft-ot',
        explanation: '0,08x + 0,05(2 000 000 - x) = 136 000 => 0,03x + 100 000 = 136 000 => 0,03x = 36 000 => x = 1 200 000 Ft.'
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó Felvételi & Gazdasági Kihívások',
    subtitle: 'Többlépcsős árváltozási egyenletek, kamategyenlőségek és felvételi típusú szöveges feladatok',
    questions: [
      {
        id: 'g8-eq-fin-l3-q1',
        title: 'Kétlépcsős leértékelés visszafejtése',
        question: 'Egy kabát árát előbb 20%-kal, majd a szezon végén további 25%-kal csökkentették. Így a kabát 18 000 Ft-ba került. Mennyi volt az eredeti ára?',
        options: ['30 000 Ft', '28 000 Ft', '32 000 Ft', '35 000 Ft'],
        correctAnswer: '30 000 Ft',
        explanation: 'Az együttes szorzó: 0,80 · 0,75 = 0,60. Tehát 0,60 · x = 18 000 => x = 18 000 / 0,60 = 30 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l3-q2',
        title: 'Azonos százalékos dupla drágulás',
        question: 'Egy termék árát egymás után kétszer emelték ugyanazzal a p%-kal. A kezdeti 10 000 Ft-os ár 12 100 Ft-ra nőtt. Mekkora volt az emelés (p)?',
        options: ['10%', '10,5%', '11%', '9%'],
        correctAnswer: '10%',
        explanation: '10 000 · q² = 12 100 => q² = 1,21 => q = 1,10. A szorzó 1,10, tehát az emelés mértéke mindkétszer p = 10% volt.'
      },
      {
        id: 'g8-eq-fin-l3-q3',
        title: 'Drágítás majd akciós engedmény',
        question: 'Egy kereskedő a beszerzési árat 40%-kal megemelve szabta meg az árat, majd ebből adott 20% kedvezményt. Hány % haszna maradt a beszerzési árhoz képest?',
        options: ['12% haszon', '20% haszon', '10% haszon', '14% haszon'],
        correctAnswer: '12% haszon',
        explanation: 'Beszerzési ár · 1,40 · 0,80 = Beszerzési ár · 1,12. Az eladási ár 112%-a a beszerzésinek, így a tiszta haszon 12%.'
      },
      {
        id: 'g8-eq-fin-l3-q4',
        title: 'Éves kamatláb meghatározása',
        question: 'Egy bankban 1 500 000 Ft betét után 9 hónap elteltével 78 750 Ft egyszerű kamatot írtak jóvá. Mekkora volt az éves kamatláb (p)?',
        options: ['7%', '6,5%', '8%', '7,5%'],
        correctAnswer: '7%',
        explanation: 'A futamidő t = 9/12 = 0,75 év. K = (T · p · t) / 100 => 78 750 = (1 500 000 · p · 0,75) / 100 = 11 250 · p => p = 78 750 / 11 250 = 7%.'
      },
      {
        id: 'g8-eq-fin-l3-q5',
        title: 'Haszon és veszteség kiegyenlítése',
        question: 'Egy kereskedő két árucikkért összesen 100 000 Ft-ot fizetett. Az elsőt 20% haszonnal, a másodikat 10% veszteséggel adta el. A teljes bevétel 108 000 Ft lett. Mennyi volt az első cikk beszerzési ára?',
        options: ['60 000 Ft', '50 000 Ft', '70 000 Ft', '55 000 Ft'],
        correctAnswer: '60 000 Ft',
        explanation: '1,20x + 0,90(100 000 - x) = 108 000 => 0,30x + 90 000 = 108 000 => 0,30x = 18 000 => x = 60 000 Ft.'
      },
      {
        id: 'g8-eq-fin-l3-q6',
        title: '50%-os áremelés visszafordítása',
        question: 'Egy cikk ára 50%-kal emelkedett. Hány százalékkal kell csökkenteni a megemelt árat, hogy újra az eredeti árat érjük el?',
        options: ['33,3%-kal (33 és 1/3 %)', '50%-kal', '25%-kal', '40%-kal'],
        correctAnswer: '33,3%-kal (33 és 1/3 %)',
        explanation: 'A megemelt ár 1,50x. 1,50 · q = 1 => q = 1 / 1,5 = 2/3 ≈ 0,6667. Tehát 100% - 66,67% = 33,3%-os csökkentés szükséges.'
      },
      {
        id: 'g8-eq-fin-l3-q7',
        title: 'Hároméves befektetési hozam',
        question: 'Egy befektetés az 1. évben +20%-ot hozott, a 2. évben -10%-ot veszített, a 3. évben +25%-kal gyarapodott. Hány %-kal nőtt a tőke 3 év alatt az eredetihez képest?',
        options: ['35%-kal', '30%-kal', '40%-kal', '32,5%-kal'],
        correctAnswer: '35%-kal',
        explanation: 'Láncszorzás: 1,20 · 0,90 · 1,25 = 1,08 · 1,25 = 1,35. A tőke az eredeti 135%-ára növekedett, ami 35%-os össznövekedést jelent.'
      },
      {
        id: 'g8-eq-fin-l3-q8',
        title: '30%-os emelés visszavonása',
        question: 'Egy boltos 30%-kal felemelte egy termék árát, majd látva, hogy nem veszik, leárazta x%-kal az eredeti árra. Hány % volt a leárazás (kerekítve)?',
        options: ['23,08%', '30,00%', '25,00%', '20,00%'],
        correctAnswer: '23,08%',
        explanation: '1,30 · (1 - x/100) = 1 => 1 - x/100 = 1 / 1,30 ≈ 0,7692 => x/100 = 0,2308 => x ≈ 23,08%.'
      },
      {
        id: 'g8-eq-fin-l3-q9',
        title: 'Hitel visszafizetésének futamideje',
        question: 'Egy 800 000 Ft-os hitelre évi 10% egyszerű kamatot kell fizetni. Hány hónap múlva éri el a visszafizetendő teljes összeg a 860 000 Ft-ot?',
        options: ['9 hónap', '6 hónap', '8 hónap', '12 hónap'],
        correctAnswer: '9 hónap',
        explanation: 'A felhalmozandó kamat: 860 000 - 800 000 = 60 000 Ft. Az egyéves kamat 800 000 · 0,10 = 80 000 Ft. t = 60 000 / 80 000 = 0,75 év = 9 hónap.'
      },
      {
        id: 'g8-eq-fin-l3-q10',
        title: 'Azonos kamathozamú két betét',
        question: '1 000 000 Ft tőkét osztunk szét: az egyik rész évi 6%-os, a másik évi 9%-os kamatra kerül. Egy év múlva mindkét összeg PONTOSAN UGYANANNYI kamatot hoz! Mennyit tettünk a 9%-os számlára?',
        options: ['400 000 Ft-ot', '600 000 Ft-ot', '500 000 Ft-ot', '450 000 Ft-ot'],
        correctAnswer: '400 000 Ft-ot',
        explanation: 'Legyen x a 9%-os tőke, ekkor (1 000 000 - x) a 6%-os tőke. 0,09x = 0,06(1 000 000 - x) => 0,09x = 60 000 - 0,06x => 0,15x = 60 000 => x = 400 000 Ft. (Mindkét betét kamata 36 000 Ft).'
      }
    ]
  }
};

export const FinancialProblemsQuiz: React.FC<FinancialProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Pénzügyi Feladatok Kvíz"
      subtitle="Gyakorold az árváltozások, kamatok, haszonkulcsok és gazdasági szöveges feladatok megoldását!"
      badge="PÉNZÜGYI MATEMATIKA"
      themeColor="amber"
      topicId="g8-eq-financial"
      topicTitle="Pénzügyi Feladatok"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Találd meg a pénzügyi kifejezések, árváltozások és kamatképletek párját!',
          badgeText: '8 Pár szintenként',
          icon: <Coins className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapvető Árváltozások és Szorzótényezők',
              subtitle: 'Párosítsd a pénzügyi változást a megfelelő algebrai szorzóval vagy értékkel!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Alapfogalmak',
              focus: 'Árváltozások'
            },
            2: {
              title: '2. Szint: Kétlépcsős Árváltozások és Egyszerű Kamat',
              subtitle: 'Párosítsd az összetett árváltozást vagy kamatot a pontos hatással!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Kamat & Szorzók',
              focus: 'Összetett hatások'
            },
            3: {
              title: '3. Szint: Haladó Gazdasági Számítások és Képletek',
              subtitle: 'Párosítsd az összetett pénzügyi összefüggéseket!',
              rangeLabel: 'Megoldás:',
              range: '8 pár • Százalékos aszimmetria',
              focus: 'Mesterfok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <FinancialProblemsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld az áremeléseket, akciókat, kamatokat és gazdasági szabályokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-500" />,
          levels: {
            1: {
              title: '1. Szint: Árváltozás és Pénzügyi Alapfogalmak',
              subtitle: 'Sorold be: Áremelés / Leértékelés / Kamat & Megtakarítás szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Számítási Modellek és Egyenletek',
              subtitle: 'Csoportosítsd: Egyetlen változás / Egymást követő / Visszaszámolás szerint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Algebrai modellek'
            },
            3: {
              title: '3. Szint: Gazdasági Matematikai Összefüggések',
              subtitle: 'Kategorizáld az összetett pénzügyi és matematikai elveket!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Összefüggések'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <FinancialProblemsSorter
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
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default FinancialProblemsQuiz;
