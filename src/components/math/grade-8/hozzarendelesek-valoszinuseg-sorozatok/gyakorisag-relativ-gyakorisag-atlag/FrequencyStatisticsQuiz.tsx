import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FrequencyStatisticsMatcher } from './FrequencyStatisticsMatcher';
import { FrequencyStatisticsSorter } from './FrequencyStatisticsSorter';
import { ArrowRightLeft, LayoutGrid, BarChart3, TrendingUp, PieChart, Percent, Layers, CheckCircle2 } from 'lucide-react';

interface FrequencyStatisticsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Gyakoriság és Relatív Gyakoriság',
    icon: <BarChart3 className="w-4 h-4 text-emerald-600" />,
    formula: '\\text{Relatív gyakoriság} = \\frac{k}{N} \\quad (\\Sigma = 100\\%)',
    note: 'k az adat előfordulásának száma, N az összes megfigyelés (mintanagyság). A relatív gyakoriságok összege mindig pontosan 1 (100%).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="8" width="110" height="34" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
        <text x="80" y="22" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">Relatív = k / N</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-emerald-700" textAnchor="middle">Összegük = 1 (100%)</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A Három Középérték',
    icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
    formula: '\\bar{x} = \\frac{\\Sigma x}{N}, \\quad Mo = \\text{leggyakoribb}, \\quad Me = \\text{középső}',
    note: 'Átlag: összeg osztva darabszámmal. Módusz: a leggyakoribb érték. Medián: a nagyság szerint növekvő sorba rendezett adatok közepe.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="38" height="30" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="34" y="24" className="text-[6.5px] font-bold fill-blue-900" textAnchor="middle">Átlag (x̄)</text>
        <text x="34" y="33" className="text-[5.5px] fill-blue-700" textAnchor="middle">Összeg / N</text>

        <rect x="61" y="10" width="38" height="30" rx="4" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="80" y="24" className="text-[6.5px] font-bold fill-emerald-900" textAnchor="middle">Módusz (Mo)</text>
        <text x="80" y="33" className="text-[5.5px] fill-emerald-700" textAnchor="middle">Leggyakoribb</text>

        <rect x="107" y="10" width="38" height="30" rx="4" fill="#faf5ff" stroke="#e9d5ff" />
        <text x="126" y="24" className="text-[6.5px] font-bold fill-purple-900" textAnchor="middle">Medián (Me)</text>
        <text x="126" y="33" className="text-[5.5px] fill-purple-700" textAnchor="middle">Rendezett közép</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Terjedelem és Szóródás',
    icon: <Layers className="w-4 h-4 text-emerald-600" />,
    formula: 'R = x_{\\max} - x_{\\min}',
    note: 'A terjedelem a legnagyobb és legkisebb érték közötti különbség. Megmutatja, milyen széles sávban szóródnak az adatok.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="25" y1="25" x2="135" y2="25" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="25" cy="25" r="4" fill="#d97706" />
        <circle cx="135" cy="25" r="4" fill="#d97706" />
        <text x="25" y="38" className="text-[6px] font-mono font-bold fill-slate-600" textAnchor="middle">Min</text>
        <text x="135" y="38" className="text-[6px] font-mono font-bold fill-slate-600" textAnchor="middle">Max</text>
        <text x="80" y="18" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">Terjedelem (R)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Kördiagram Középponti Szöge',
    icon: <PieChart className="w-4 h-4 text-emerald-600" />,
    formula: '\\alpha = \\text{Relatív gyakoriság} \\cdot 360^\\circ = \\frac{k}{N} \\cdot 360^\\circ',
    note: 'A teljes kör 360 fok (100%). 50% = 180 fok, 25% = 90 fok, 10% = 36 fok, 1% = 3,6 fok.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 80 25 L 80 7 A 18 18 0 0 1 98 25 Z" fill="#10b981" />
        <text x="122" y="27" className="text-[6.5px] font-bold fill-emerald-800">25% = 90°</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Gyakoriságok',
    subtitle: 'Értelmezd a mintanagyságot, számíts abszolút és relatív gyakoriságot törtben és százalékban!',
    badge: '1. Szint • Kezdő',
    questions: [
      {
        id: 'q1-1',
        question: 'Egy 25 fős osztályban 10 diák kapott ötöst matematikából. Mennyi az ötösök relatív gyakorisága tört és százalékos alakban?',
        options: [
          '10 / 25 = 2 / 5 = 40%',
          '10%',
          '25 / 10 = 250%',
          '10 / 100 = 10%'
        ],
        correctAnswer: 0,
        explanation: 'Relatív gyakoriság = gyakoriság / összes esetszám = 10 / 25 = 0,40 = 40%.'
      },
      {
        id: 'q1-2',
        question: 'Mit jelent a mintanagyság (N) a leíró statisztikában?',
        options: [
          'A vizsgált adathalmazban szereplő összes adat (egyed) számát.',
          'A mintában előforduló legnagyobb számértéket.',
          'A minta átlagát.',
          'A leggyakoribb adat darabszámát.'
        ],
        correctAnswer: 0,
        explanation: 'A mintanagyság (N) az adatgyűjtésben részt vevő összes mérés vagy megfigyelés darabszáma.'
      },
      {
        id: 'q1-3',
        question: 'Mennyi egy adathalmaz összes lehetséges kimenetelének relatív gyakoriságának összege?',
        options: ['Pontosan 1 (azaz 100%)', 'Mindig 0', 'Tetszőleges szám lehet', '360'],
        correctAnswer: 0,
        explanation: 'Mivel a részek lefedik a teljes egészet, a relatív gyakoriságok összege mindig pontosan 1, azaz 100%.'
      },
      {
        id: 'q1-4',
        question: 'Egy dobókockát 50-szer dobtunk fel, és a 6-os szám 8-szor fordult elő. Mennyi a 6-os dobás abszolút gyakorisága?',
        options: ['8', '50', '8 / 50 = 16%', '6'],
        correctAnswer: 0,
        explanation: 'Az abszolút gyakoriság (k) a tényleges darabszámot jelenti, tehát k = 8.'
      },
      {
        id: 'q1-5',
        question: 'Egy felmérésben a megkérdezettek 35%-a kávét, 45%-a teát, a maradék pedig vizet iszik reggelire. Mennyi a vizet ivók relatív gyakorisága?',
        options: [
          '100% - 35% - 45% = 20% (0,20)',
          '80%',
          '10%',
          '25%'
        ],
        correctAnswer: 0,
        explanation: 'Az összes relatív gyakoriság összege 100%, így a vízivók aránya: 100% - 80% = 20%.'
      },
      {
        id: 'q1-6',
        question: 'Mit mutat meg egy oszlopdiagramon az egyes téglalapok magassága?',
        options: [
          'Az adott kategória gyakoriságát (vagy relatív gyakoriságát).',
          'Az adatok számtani átlagát.',
          'A kategória sorszámát.',
          'A mintanagyság négyzetét.'
        ],
        correctAnswer: 0,
        explanation: 'Az oszlopdiagramon az oszlop magassága egyenesen arányos az adott érték előfordulási gyakoriságával.'
      },
      {
        id: 'q1-7',
        question: 'Egy 20 fős csoportban a hajszínek: 8 barna, 6 szőke, 4 fekete, 2 vörös. Melyik a barna haj relatív gyakorisága?',
        options: ['8 / 20 = 40%', '8%', '20 / 8 = 2,5', '8 / 100 = 8%'],
        correctAnswer: 0,
        explanation: '8 / 20 = 4 / 10 = 0,4 = 40%.'
      },
      {
        id: 'q1-8',
        question: 'Hogyan számoljuk ki egy adat relatív gyakoriságát, ha ismerjük a gyakoriságát (k) és a mintanagyságot (N)?',
        options: ['k / N', 'N / k', 'k · N', 'N - k'],
        correctAnswer: 0,
        explanation: 'A relatív gyakoriság a rész és az egész hányadosa: k osztva N-nel.'
      },
      {
        id: 'q1-9',
        question: 'Egy minőségellenőrzésen 500 termékből 15 selejtes volt. Hány százalék a selejtarány?',
        options: ['15 / 500 = 3 / 100 = 3%', '15%', '0,3%', '5%'],
        correctAnswer: 0,
        explanation: '15 / 500 = 0,03 = 3%.'
      },
      {
        id: 'q1-10',
        question: 'Ha egy osztályban 12 fiú és 16 lány van, mekkora a mintanagyság (N)?',
        options: ['12 + 16 = 28 fő', '16 fő', '12 fő', '4 fő'],
        correctAnswer: 0,
        explanation: 'A mintanagyság az összes diák száma: 12 + 16 = 28.'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítások: Átlag, Módusz, Medián és Terjedelem',
    subtitle: 'Számítsd ki pontosan a középértékeket és a terjedelmet rendezett és nyers adatsorokból!',
    badge: '2. Szint • Haladó',
    questions: [
      {
        id: 'q2-1',
        question: 'Egy tanuló jegyei: 4, 5, 3, 5, 4, 3. Mennyi ezen jegyek számtani átlaga?',
        options: ['4,0', '4,2', '3,8', '4,5'],
        correctAnswer: 0,
        explanation: 'Összeg: 4 + 5 + 3 + 5 + 4 + 3 = 24. Darabszám: 6. Átlag: 24 / 6 = 4,0.'
      },
      {
        id: 'q2-2',
        question: 'Mi a mediánja a következő rendezetlen adatsornak: 2, 7, 3, 9, 5, 3, 8 ?',
        options: ['5', '3', '7', '5,3'],
        correctAnswer: 0,
        explanation: 'Sorba rendezve a 7 adatot: 2, 3, 3, [5], 7, 8, 9. A középső (4.) elem a medián: 5.'
      },
      {
        id: 'q2-3',
        question: 'Mennyi a mediánja az alábbi 6 elemű rendezett adatsornak: 4, 6, 8, 12, 14, 16 ?',
        options: ['10', '8', '12', '9'],
        correctAnswer: 0,
        explanation: 'Páros elemszám esetén a két középső adat (8 és 12) számtani átlaga a medián: (8 + 12) / 2 = 10.'
      },
      {
        id: 'q2-4',
        question: 'Egy csoport tagjainak cipőméretei: 36, 38, 38, 39, 40, 38, 42. Mi a módusz és a terjedelem?',
        options: [
          'Módusz: 38 (3-szor szerepel), Terjedelem: 42 - 36 = 6',
          'Módusz: 39, Terjedelem: 38',
          'Módusz: 36, Terjedelem: 42',
          'Módusz: 42, Terjedelem: 8'
        ],
        correctAnswer: 0,
        explanation: 'A 38 fordul elő a legtöbbször (módusz). A terjedelem a maximum és minimum különbsége: 42 - 36 = 6.'
      },
      {
        id: 'q2-5',
        question: 'Lehet-e egy adatsornak egynél több módusza?',
        options: [
          'Igen, ha több különböző érték is holtversenyben a legnagyobb gyakorisággal szerepel.',
          'Nem, a módusz definíció szerint mindig csak egyetlen szám lehet.',
          'Csak akkor, ha az átlaguk egész szám.',
          'Csak negatív számok esetén.'
        ],
        correctAnswer: 0,
        explanation: 'Ha például egy mintában a 2-es és a 4-es is egyaránt 5-ször szerepel (és ez a maximum), akkor a mintának két módusza van (bimodális).'
      },
      {
        id: 'q2-6',
        question: 'Egy dolgozat jegyei a következő gyakorisággal fordultak elő: 1-es: 1 db, 2-es: 2 db, 3-as: 5 db, 4-es: 8 db, 5-ös: 4 db. Mennyi a dolgozatok átlaga?',
        options: [
          '3,6',
          '3,0',
          '4,0',
          '3,8'
        ],
        correctAnswer: 0,
        explanation: 'Összpontszám: 1·1 + 2·2 + 3·5 + 4·8 + 5·4 = 1 + 4 + 15 + 32 + 20 = 72. Tanulók száma: 1 + 2 + 5 + 8 + 4 = 20. Átlag: 72 / 20 = 3,6.'
      },
      {
        id: 'q2-7',
        question: 'Mi a fenti dolgozatjegyek (1 db 1-es, 2 db 2-es, 5 db 3-as, 8 db 4-es, 4 db 5-ös) módusza és mediánja?',
        options: [
          'Módusz: 4 (8 db), Medián: 4 (a 10. és 11. diák is 4-est kapott)',
          'Módusz: 3, Medián: 3',
          'Módusz: 8, Medián: 3,5',
          'Módusz: 5, Medián: 4'
        ],
        correctAnswer: 0,
        explanation: 'A 4-esből van a legtöbb (8 db), így Mo = 4. 20 diák közül a 10. és 11. diák jegye határozza meg a mediánt: mindkettő 4-es, tehát Me = 4.'
      },
      {
        id: 'q2-8',
        question: 'Egy tanuló 5 tantárgyból kapott jegyet, az átlaga 4,2. Mennyi a jegyeinek az összege?',
        options: ['4,2 · 5 = 21', '20', '25', '18'],
        correctAnswer: 0,
        explanation: 'Átlag = Összeg / N -> Összeg = Átlag · N = 4,2 · 5 = 21.'
      },
      {
        id: 'q2-9',
        question: 'Melyik állítás IGAZ az alábbi adatsorra: 5, 5, 5, 5, 5 ?',
        options: [
          'Az átlag, a módusz és a medián egyaránt 5, a terjedelem pedig 0.',
          'Nincs módusza.',
          'A terjedelme 5.',
          'A mediánja nem határozható meg.'
        ],
        correctAnswer: 0,
        explanation: 'Minden mutató 5, és mivel nincs szóródás (max = 5, min = 5), a terjedelem R = 5 - 5 = 0.'
      },
      {
        id: 'q2-10',
        question: 'Egy 5 tagú család életkora: 8, 12, 14, 42, 44 év. Mennyi az életkorok terjedelme?',
        options: ['44 - 8 = 36 év', '42 év', '24 év', '50 év'],
        correctAnswer: 0,
        explanation: 'A terjedelem a legidősebb és a legfiatalabb különbsége: 44 - 8 = 36 év.'
      }
    ]
  },
  3: {
    title: '3. Szint: Diagramok, Körcikkek és Statisztikai Gondolkodás',
    subtitle: 'Számíts körcikk-szögeket, értsd meg a súlyozott átlagot és az extrém értékek hatását!',
    badge: '3. Szint • Mester',
    questions: [
      {
        id: 'q3-1',
        question: 'Egy kördiagramon egy kategória relatív gyakorisága 20%. Mekkora a hozzá tartozó körcikk középponti szöge (α)?',
        options: [
          'α = 0,20 · 360° = 72°',
          '20°',
          '90°',
          '36°'
        ],
        correctAnswer: 0,
        explanation: 'A teljes kör 360°, ennek 20%-a: 0,20 · 360° = 72°.'
      },
      {
        id: 'q3-2',
        question: 'Egy kördiagramon a zöldségfélék körcikkének középponti szöge 54°. A teljes termés hány százaléka ez?',
        options: [
          '(54° / 360°) · 100% = 15%',
          '54%',
          '25%',
          '10%'
        ],
        correctAnswer: 0,
        explanation: '54 / 360 = 3 / 20 = 0,15 = 15%.'
      },
      {
        id: 'q3-3',
        question: 'Egy kisvállalkozásban 4 alkalmazott keres havonta 300 000 Ft-ot, a tulajdonos igazgató pedig 3 300 000 Ft-ot. Mi a keresetek számtani átlaga és mediánja?',
        options: [
          'Átlag: 900 000 Ft, Medián: 300 000 Ft',
          'Átlag: 300 000 Ft, Medián: 900 000 Ft',
          'Átlag: 600 000 Ft, Medián: 300 000 Ft',
          'Mindkettő 900 000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Összeg: 4 · 300 000 + 3 300 000 = 4 500 000 Ft. 5 főre: 4 500 000 / 5 = 900 000 Ft az átlag! Rendezve: [300e, 300e, 300e, 300e, 3,3M], a középső (3.) elem 300 000 Ft. A medián híven tükrözi az alkalmazottak valós helyzetét!'
      },
      {
        id: 'q3-4',
        question: 'A fenti példa alapján miért hasznosabb a medián a jövedelmi adatok vizsgálatakor, mint a számtani átlag?',
        options: [
          'Mert az átlagot egyetlen kirívóan magas jövedelem erősen felhúzza, míg a medián robusztus, nem torzul el.',
          'Mert a mediánt könnyebb leírni.',
          'Mert a medián mindig pontosan a duplája az átlagnak.',
          'Mert a számtani átlagot tilos pénzre számolni.'
        ],
        correctAnswer: 0,
        explanation: 'A számtani átlag nagyon érzékeny az extrém kiugró értékekre (outlierek), míg a medián a tipikus középső jövedelmet mutatja.'
      },
      {
        id: 'q3-5',
        question: 'A 8.A osztály matematika átlaga 4,0 (30 tanuló), a 8.B osztály átlaga 3,0 (10 tanuló). Mennyi a két osztály összevont közös átlaga?',
        options: [
          '3,75 (mert (30·4 + 10·3) / 40 = 150 / 40 = 3,75)',
          '3,50 (mert (4,0 + 3,0) / 2 = 3,5)',
          '3,25',
          '3,80'
        ],
        correctAnswer: 0,
        explanation: 'Soha ne számolj átlagok számtani átlagát, ha a csoportok létszáma eltér! A 30 fős osztály háromszoros súllyal szerepel: 150 / 40 = 3,75.'
      },
      {
        id: 'q3-6',
        question: 'Egy híradóban bemutatott oszlopdiagramon az egyik cég eladásai kétszer olyan magasnak tűnnek, holott valójában csak 10%-kal nőttek. Mi okozza a vizuális megtévesztést?',
        options: [
          'A függőleges tengely skálája nem a nullánál kezdődött, hanem egy magasabb számnál (levágták a tengely alját).',
          'Nem használtak színeket.',
          'Kördiagram helyett oszlopdiagramot rajzoltak.',
          'A relatív gyakoriság helyett abszolút gyakoriságot használtak.'
        ],
        correctAnswer: 0,
        explanation: 'Ha a függőleges tengely nem 0-ról indul, az oszlopok aránya eltorzul, és a kicsi különbségek óriásinak látszanak.'
      },
      {
        id: 'q3-7',
        question: 'Egy diák eddig 4 dolgozatot írt, átlaga 3,5. Hányast kell kapnia az 5. dolgozatra, hogy az átlaga 3,8-ra javuljon?',
        options: [
          '5-öst (mert 5 · 3,8 = 19; eddigi összeg: 4 · 3,5 = 14; 19 - 14 = 5)',
          '4-est',
          'Nem lehetséges 3,8-ra javítani egyetlen jeggyel',
          'Elég egy 3-as is'
        ],
        correctAnswer: 0,
        explanation: '5 jegy összege 5 · 3,8 = 19 kell legyen. A meglévő 4 jegy összege 4 · 3,5 = 14. A szükséges jegy: 19 - 14 = 5.'
      },
      {
        id: 'q3-8',
        question: 'Hogyan változik egy számsor átlaga és terjedelme, ha minden egyes adathoz hozzáadunk 5-öt?',
        options: [
          'Az átlag 5-tel nő, a terjedelem változatlan marad.',
          'Mindkettő 5-tel nő.',
          'Az átlag változatlan, a terjedelem 5-tel nő.',
          'Mindkettő az 5-szörösére nő.'
        ],
        correctAnswer: 0,
        explanation: 'Az egész adathalmaz eltolódik 5-tel, így az átlag is 5-tel nő. Viszont a távolságuk nem változik: (xmax + 5) - (xmin + 5) = xmax - xmin = R.'
      },
      {
        id: 'q3-9',
        question: 'Hogyan változik egy számsor átlaga és terjedelme, ha minden adatot megszorzunk 2-vel?',
        options: [
          'Az átlag és a terjedelem is pontosan a 2-szeresére nő.',
          'Az átlag kétszeres lesz, a terjedelem változatlan.',
          'A terjedelem 4-szeres lesz.',
          'Semmi sem változik.'
        ],
        correctAnswer: 0,
        explanation: 'Szorzásnál a skálázás miatt az összeg és a szélső értékek távolsága (2xmax - 2xmin = 2R) is duplázódik.'
      },
      {
        id: 'q3-10',
        question: 'Egy kördiagram 4 körcikkből áll, szögeik: 120°, 90°, 90° és a negyedik körcikk. Hány fokos a negyedik körcikk, és hány százalékot képvisel?',
        options: [
          '60°, ami 60° / 360° = 1 / 6 ≈ 16,67%',
          '45°, ami 12,5%',
          '60°, ami 25%',
          '90°, ami 25%'
        ],
        correctAnswer: 0,
        explanation: 'A teljes kör 360°. Negyedik szög: 360° - (120° + 90° + 90°) = 360° - 300° = 60°. Aránya: 60 / 360 = 1/6 ≈ 16,67%.'
      }
    ]
  }
};

export const FrequencyStatisticsQuiz: React.FC<FrequencyStatisticsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Gyakoriság, relatív gyakoriság, átlag"
      subtitle="Mintanagyság, gyakorisági táblázatok, átlag, módusz, medián, terjedelem és kördiagramok"
      topicBadge="8. Osztály • VI. Fejezet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Találd meg a statisztikai fogalmak, számítások és diagramok párjait!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Statisztikai Alapfogalmak',
              subtitle: 'Párosítsd a leíró statisztikai fogalmakat a definíciójukkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapfogalmak',
              focus: 'Fogalmak & Képletek'
            },
            2: {
              title: '2. Szint: Számítási Feladatok és Eredmények',
              subtitle: 'Párosítsd az adatsorokat a kiszámított mutatójukkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Számítások',
              focus: 'Átlag, Módusz, Medián'
            },
            3: {
              title: '3. Szint: Valós Helyzetek és Döntések',
              subtitle: 'Párosítsd a hétköznapi statisztikai szituációkat a helyes szabállyal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Modellezés & Döntések',
              focus: 'Modellezés'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <FrequencyStatisticsMatcher
              key={`fs-matcher-${level}`}
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
          subtitle: 'Kategorizáld a középértékeket, diagramtípusokat és a statisztika fázisait!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: A Három Középérték Jellemzői',
              subtitle: 'Válogasd szét: Számtani átlag, Medián vagy Módusz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Átlag vs. Medián vs. Módusz'
            },
            2: {
              title: '2. Szint: Diagramtípusok és Előnyeik',
              subtitle: 'Kategorizáld: Oszlopdiagram, Kördiagram vagy Gyakorisági táblázat!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Diagram típusok'
            },
            3: {
              title: '3. Szint: A Statisztikai Munka 3 Fázisa',
              subtitle: 'Sorold be a teendőket: Adatgyűjtés, Számítás vagy Ábrázolás!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Statisztikai munkafolyamat'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <FrequencyStatisticsSorter
              key={`fs-sorter-${level}`}
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

export default FrequencyStatisticsQuiz;
