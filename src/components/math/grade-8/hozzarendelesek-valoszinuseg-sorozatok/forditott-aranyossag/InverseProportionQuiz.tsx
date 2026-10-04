import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { InverseProportionMatcher } from './InverseProportionMatcher';
import { InverseProportionSorter } from './InverseProportionSorter';
import { ArrowRightLeft, LayoutGrid, Scale, LineChart, Clock, AlertTriangle } from 'lucide-react';

interface InverseProportionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Szorzat Állandósága',
    icon: <Scale className="w-4 h-4 text-indigo-600" />,
    formula: 'x · y = k ⟺ y = k / x (k ≠ 0)',
    note: 'Két mennyiség fordítottan arányos, ha az összetartozó értékek szorzata állandó. Ha az egyik többszörösére nő, a másik annyiad részére csökken.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="55" height="30" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
        <rect x="90" y="10" width="55" height="30" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
        <text x="42" y="28" className="text-[7.5px] font-black fill-indigo-900" textAnchor="middle">x · y = k</text>
        <text x="117" y="28" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">y = k / x</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A Hiperbola Grafikon',
    icon: <LineChart className="w-4 h-4 text-indigo-600" />,
    formula: 'x ≠ 0, y ≠ 0 (D = R kivéve 0)',
    note: 'A grafikon két ágból álló hiperbola. Ha k > 0: I. és III. negyed; ha k < 0: II. és IV. negyed. A tengelyeket soha nem metszi (nincs zérushely)!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="140" y2="25" stroke="#94a3b8" strokeWidth="1" />
        <line x1="80" y1="5" x2="80" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 85 8 Q 95 18 135 22" fill="none" stroke="#6366f1" strokeWidth="2" />
        <path d="M 25 28 Q 65 32 75 42" fill="none" stroke="#6366f1" strokeWidth="2" />
        <text x="120" y="14" className="text-[6.5px] font-bold fill-indigo-700">k &gt; 0</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Munkamegosztási Modell',
    icon: <Clock className="w-4 h-4 text-indigo-600" />,
    formula: 'n · t = M ⟹ t = M / n',
    note: 'Munkások száma (n) és a szükséges idő (t) szorzata adja az összmunkaórát (M). Kétszer annyi munkás feleannyi idő alatt végez.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="8" width="110" height="34" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
        <text x="80" y="23" className="text-[7.5px] font-black fill-slate-800" textAnchor="middle">4 munkás · 6 óra = 24 óra</text>
        <text x="80" y="35" className="text-[7px] font-bold fill-indigo-600" textAnchor="middle">3 munkásnak: 24 / 3 = 8 óra</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Gyakori Csapda: x = 0',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: 'x ≠ 0 (0-val való osztás kizárva)',
    note: 'Az y = k / x függvény nincs értelmezve x = 0 helyen, és a k / x = 0 egyenletnek sincs megoldása (a hiperbolának nincs tengelymetszete).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="10" width="120" height="30" rx="6" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.2" />
        <text x="80" y="24" className="text-[7.5px] font-black fill-rose-900" textAnchor="middle">k / 0 = ÉRTELMETLEN!</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-rose-700" textAnchor="middle">Nincs zérushely, nincs y-metszet</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és a Szorzat Állandósága',
    subtitle: 'Ismerd fel a fordított arányosságot, a szorzat állandóságát és a hiperbola alapjait!',
    questions: [
      {
        id: 'g8-fi-l1-q1',
        question: 'Mikor mondjuk két változó mennyiségről, hogy FORDÍTOTTAN ARÁNYOSAK?',
        options: [
          'Ha ahányszorosára nő az egyik, ugyanannyiad részére csökken a másik',
          'Ha ahányszorosára nő az egyik, ugyanannyiszorosára nő a másik is',
          'Ha az egyikből kivonva a másikat mindig állandó számot kapunk',
          'Ha mindkét mennyiség értéke folyamatosan növekszik'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a munkásokra: ha háromszor annyian dolgoznak, harmadannyi idő kell a munkához!',
        explanation: 'A fordított arányosság lényege, hogy ha az egyik mennyiség a-szorosára nő (a > 0), a másik az 1/a-szorosára (vagyis annyiad részére) csökken.'
      },
      {
        id: 'g8-fi-l1-q2',
        question: 'Mi a fordított arányosság matematikai alapképlete az összetartozó x és y értékekre?',
        options: [
          'x · y = k (vagyis y = k / x, ahol k ≠ 0 állandó)',
          'y / x = k (vagyis y = k · x)',
          'x + y = k',
          'y - x = k'
        ],
        correctAnswer: 0,
        hint: 'Fordított arányosságnál nem a hányados, hanem a SZORZAT állandó!',
        explanation: 'A fordított arányosságban a két változó szorzata állandó: x · y = k, amiből átrendezéssel y = k / x adódik.'
      },
      {
        id: 'g8-fi-l1-q3',
        question: 'Két fordítottan arányos mennyiségnél x = 6 esetén y = 8. Mennyi az arányossági szorzatérték (k)?',
        options: ['48', '14', '2', '4/3'],
        correctAnswer: 0,
        hint: 'Szorozd össze a két összetartozó értéket: k = x · y!',
        explanation: 'k = x · y = 6 · 8 = 48. Ez a szorzat a feladat összes összetartozó értékpárjára állandó marad.'
      },
      {
        id: 'g8-fi-l1-q4',
        question: 'Ha x és y fordítottan arányos, szorzatuk k = 30. Mennyi lesz az y értéke, ha x = 5?',
        options: ['6', '150', '25', '35'],
        correctAnswer: 0,
        hint: 'Használd az y = k / x képletet: oszd el a 30-at 5-tel!',
        explanation: 'y = k / x = 30 / 5 = 6 (ellenőrzés: 5 · 6 = 30).'
      },
      {
        id: 'g8-fi-l1-q5',
        question: 'Miért NEM szerepelhet a 0 az y = k / x függvény értelmezési tartományában (D = R \\ {0})?',
        options: [
          'Mert a matematikában nullával nem lehet osztani (értelmetlen)',
          'Mert a 0 nem valós szám',
          'Mert az y negatív számmá válna',
          'Mert a grafikon átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'A nevezőben áll az x változó. Lehet a nevezőben nulla?',
        explanation: 'Az y = k / x hozzárendelésben x a nevezőben van. Mivel nullával való osztás nincs értelmezve a valós számok körében, így x ≠ 0 a kötelező kikötés.'
      },
      {
        id: 'g8-fi-l1-q6',
        question: 'Melyik kapcsolat jelent FORDÍTOTT ARÁNYOSSÁGOT a hétköznapokban?',
        options: [
          'Egy rögzített 36 cm² területű téglalap két oldalhossza (a és b)',
          'Egy négyzet oldalhossza és kerülete',
          'A boltban vásárolt alma tömege és fizetendő ára',
          'Egy 10 cm magas égő gyertya magassága az idő múlásával'
        ],
        correctAnswer: 0,
        hint: 'Keresd azt a helyzetet, ahol a két mennyiség SZORZATA mindig ugyanannyi!',
        explanation: 'A téglalap területe T = a · b = 36 cm² állandó, így a = 36 / b, ami pontosan fordított arányosság. A bolt és a négyzet egyenes arányosság, a gyertya lineáris csökkenés.'
      },
      {
        id: 'g8-fi-l1-q7',
        question: 'Ha egy fordított arányossági összefüggésben az x értékét a 3-szorosára növeljük, hogyan változik az y értéke?',
        options: [
          'Az y értéke a harmadára csökken',
          'Az y értéke a 3-szorosára nő',
          'Az y értéke 3-mal csökken',
          'Az y értéke változatlan marad'
        ],
        correctAnswer: 0,
        hint: 'Ha az egyik mennyiség nő, a másik ugyanolyan arányban csökken!',
        explanation: 'Mivel x · y = k állandó, ha x helyére 3x lép, akkor ahhoz, hogy a szorzat k maradjon, y helyére y / 3-nak kell kerülnie.'
      },
      {
        id: 'g8-fi-l1-q8',
        question: 'Mi a neve az y = k / x alakú fordított arányosság grafikonjának?',
        options: ['Hiperbola', 'Parabola', 'Origón átmenő egyenes', 'Kör'],
        correctAnswer: 0,
        hint: 'Ez a görbe két szimmetrikus ágból áll, és nem metszi a tengelyeket.',
        explanation: 'Az y = k / x típusú törtfüggvények grafikonja a hiperbola, amely két különálló, szimmetrikus ágból áll.'
      },
      {
        id: 'g8-fi-l1-q9',
        question: 'Melyik síknegyedekben találhatók az y = 18 / x hiperbola ágai (mivel k = 18 > 0)?',
        options: [
          'Az I. és a III. síknegyedben',
          'A II. és a IV. síknegyedben',
          'Csak az I. síknegyedben',
          'Mind a négy síknegyedben'
        ],
        correctAnswer: 0,
        hint: 'Ha x pozitív, y is pozitív (+ / + = +); ha x negatív, y is negatív (- / - = +).',
        explanation: 'Pozitív k esetén ha x > 0, akkor y > 0 (I. negyed: +, +); ha x < 0, akkor y < 0 (III. negyed: -, -). Így az ágak az I. és III. síknegyedbe esnek.'
      },
      {
        id: 'g8-fi-l1-q10',
        question: 'Melyik síknegyedekben futnak az y = -12 / x hiperbola ágai (k = -12 < 0)?',
        options: [
          'A II. és a IV. síknegyedben',
          'Az I. és a III. síknegyedben',
          'Csak a II. síknegyedben',
          'Az I. és a II. síknegyedben'
        ],
        correctAnswer: 0,
        hint: 'Ha a számláló negatív: pozitív x-re negatív y, negatív x-re pozitív y adódik!',
        explanation: 'Negatív k esetén az x és y koordináták ellenkező előjelűek: ha x < 0, y > 0 (II. negyed); ha x > 0, y < 0 (IV. negyed).'
      }
    ]
  },
  2: {
    title: '2. Szint: Értékpárok, Koordináták és Hiperbola Tulajdonságok',
    subtitle: 'Számíts ki koordinátákat, ellenőrizd a pontilleszkedést és a szimmetriát!',
    questions: [
      {
        id: 'g8-fi-l2-q1',
        question: 'Illeszkedik-e a P(3; 8) pont az y = 24 / x hiperbola grafikonjára?',
        options: [
          'Igen, mert 3 · 8 = 24 (vagyis 24 / 3 = 8)',
          'Nem, mert 3 + 8 ≠ 24',
          'Nem, mert 24 / 8 = 3, nem pedig 8',
          'Csak akkor, ha x negatív szám'
        ],
        correctAnswer: 0,
        hint: 'Helyettesítsd be az x = 3 és y = 8 koordinátákat az x · y = 24 képletbe!',
        explanation: 'Egy pont akkor van rajta a görbén, ha koordinátái kielégítik a függvény egyenletét: x · y = 3 · 8 = 24. Az egyenlőség igaz, így a pont illeszkedik.'
      },
      {
        id: 'g8-fi-l2-q2',
        question: 'Ha f(x) = 36 / x, mennyi a függvény helyettesítési értéke az x = -4 helyen (f(-4))?',
        options: ['-9', '9', '-144', '32'],
        correctAnswer: 0,
        hint: 'Oszd el a pozitív 36-ot a negatív -4-gyel!',
        explanation: 'f(-4) = 36 / (-4) = -9. A pont koordinátái: (-4; -9), ami a III. síknegyedbe esik.'
      },
      {
        id: 'g8-fi-l2-q3',
        question: 'Az y = 16 / x hiperbolán rajta van a P(2; 8) pont. Melyik pont van garantáltan rajta a hiperbola origóra vett középpontos szimmetriája miatt?',
        options: ['P\'(-2; -8)', 'P\'(-2; 8)', 'P\'(8; 2)', 'P\'(2; -8)'],
        correctAnswer: 0,
        hint: 'Origóra vett tükrözésnél mindkét koordináta előjele ellentétesre vált: (x; y) → (-x; -y).',
        explanation: 'A hiperbola középpontosan szimmetrikus az origóra: f(-x) = -f(x). Ezért a P(2; 8) pont origóra vett tükörképe a P\'(-2; -8) pont, ahol (-2) · (-8) = 16.'
      },
      {
        id: 'g8-fi-l2-q4',
        question: 'Hol metszi az y = 10 / x függvény grafikonja az y-tengelyt (függőleges tengely)?',
        options: [
          'Sehol nem metszi az y-tengelyt',
          'A (0; 10) pontban',
          'A (0; 0) origóban',
          'A (0; 1) pontban'
        ],
        correctAnswer: 0,
        hint: 'Az y-tengelyen az x értéke mindig 0. Be lehet helyettesíteni az x = 0-t?',
        explanation: 'Az y-tengely metszéspontjában x = 0-nak kellene lennie. De nullával nem lehet osztani (10 / 0 értelmetlen), ezért a hiperbola soha nem metszi az y-tengelyt (az y-tengely aszimptota).'
      },
      {
        id: 'g8-fi-l2-q5',
        question: 'Hány valós zérushelye van az f(x) = 15 / x fordított arányosságnak?',
        options: [
          '0 (nincs zérushelye)',
          '1 zérushelye van (x = 0)',
          '1 zérushelye van (x = 15)',
          'Végtelen sok zérushelye van'
        ],
        correctAnswer: 0,
        hint: 'A zérushely azt jelenti, hogy f(x) = 0. Lehet-e egy olyan tört értéke nulla, amelynek a számlálója 15?',
        explanation: 'A 15 / x = 0 egyenletnek nincs megoldása, mert egy tört értéke csak akkor lehet nulla, ha a számlálója nulla. Mivel 15 ≠ 0, a függvénynek nincs zérushelye, vagyis a grafikon soha nem metszi az x-tengelyt.'
      },
      {
        id: 'g8-fi-l2-q6',
        question: 'Mennyi az y értéke az y = 10 / x fordított arányosságban, ha x = 0,2?',
        options: ['50', '2', '0,02', '5'],
        correctAnswer: 0,
        hint: 'Tizedestörttel való osztás: 10 / 0,2 = 100 / 2!',
        explanation: 'y = 10 / 0,2 = 100 / 2 = 50. Ahogy x közeledik a 0-hoz a pozitív oldalról, az y értéke meredeken növekszik a végtelen felé.'
      },
      {
        id: 'g8-fi-l2-q7',
        question: 'A Q(a; 16) pont illeszkedik az y = 64 / x görbére. Mennyi az a paraméter értéke?',
        options: ['a = 4', 'a = 48', 'a = 1024', 'a = 2'],
        correctAnswer: 0,
        hint: 'Helyettesíts be: a · 16 = 64!',
        explanation: 'A szorzat állandó: a · 16 = 64, ebből a = 64 / 16 = 4.'
      },
      {
        id: 'g8-fi-l2-q8',
        question: 'Az y = 12 / x hiperbolánál mennyivel csökken az y értéke, miközben x az 1-ről 2-re nő?',
        options: [
          '6-tal csökken (12-ről 6-ra)',
          '1-gyel csökken',
          '12-vel csökken',
          'Nem csökken, hanem nő'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az y értékét x = 1 és x = 2 helyeken!',
        explanation: 'Ha x = 1, akkor y = 12 / 1 = 12. Ha x = 2, akkor y = 12 / 2 = 6. A változás: 12 - 6 = 6-os csökkenés.'
      },
      {
        id: 'g8-fi-l2-q9',
        question: 'Az alábbi két értékpár egy fordított arányossághoz tartozik: A(3; 20) és B(5; y). Mennyi az y értéke?',
        options: ['12', '15', '25', '10'],
        correctAnswer: 0,
        hint: 'Az A pontból számold ki az állandó szorzatot: k = 3 · 20!',
        explanation: '1. Állandó szorzat: k = 3 · 20 = 60. 2. A B pontnál: 5 · y = 60, amiből y = 60 / 5 = 12.'
      },
      {
        id: 'g8-fi-l2-q10',
        question: 'Hogyan viselkedik az y = 8 / x függvény az x > 0 pozitív számok halmazán (monotonitás)?',
        options: [
          'Szigorúan monoton csökken',
          'Szigorúan monoton nő',
          'Konstans (vízszintes)',
          'Először nő, majd csökken'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg a hiperbola I. negyedbeli ágát: balról jobbra haladva merre tart a görbe?',
        explanation: 'Pozitív k esetén ahogy az x értéke nő (1, 2, 4, 8...), az y értéke folyamatosan csökken (8, 4, 2, 1...). Ezért az I. síknegyedben a függvény szigorúan monoton csökkenő.'
      }
    ]
  },
  3: {
    title: '3. Szint: Munkamegosztás, Sebesség és Szöveges Feladatok',
    subtitle: 'Oldj meg életszerű, felvételi típusú összetett fordított arányossági feladatokat!',
    questions: [
      {
        id: 'g8-fi-l3-q1',
        question: '6 munkás 8 óra alatt festi le a kerítést. Hány óra alatt végezne ugyanezzel a munkával 4 munkás azonos munkatempó mellett?',
        options: ['12 óra alatt', '5,3 óra alatt', '10 óra alatt', '16 óra alatt'],
        correctAnswer: 0,
        hint: '1. Számold ki a teljes munkaórát: 6 · 8. 2. Oszd el a 4 munkással!',
        explanation: 'Összes munkaóra: k = 6 · 8 = 48 munkaóra. 4 munkás esetén a szükséges idő: 48 / 4 = 12 óra.'
      },
      {
        id: 'g8-fi-l3-q2',
        question: 'Egy autó 90 km/h átlagsebességgel 2 óra alatt ér el a céljához. Mennyi időre lenne szüksége 60 km/h átlagsebességgel haladva?',
        options: ['3 óra', '1,5 óra', '2,5 óra', '4 óra'],
        correctAnswer: 0,
        hint: 'A távolság állandó: s = v · t = 90 · 2 km.',
        explanation: 'A teljes távolság: s = 90 · 2 = 180 km. Új menetidő: t = s / v = 180 / 60 = 3 óra.'
      },
      {
        id: 'g8-fi-l3-q3',
        question: '15 útépítő munkás 12 nap alatt aszfaltoz le egy útszakaszt. Hány munkásnak kellene dolgoznia ahhoz, hogy 9 nap alatt elkészüljenek?',
        options: ['20 munkás', '18 munkás', '24 munkás', '16 munkás'],
        correctAnswer: 0,
        hint: '1. Összes munkanap: 15 · 12 = 180 munkanap. 2. Oszd el a 9 nappal!',
        explanation: 'Összes munkanap: k = 15 · 12 = 180 munkanap. 9 napos határidőhöz: 180 / 9 = 20 munkás szükséges.'
      },
      {
        id: 'g8-fi-l3-q4',
        question: 'Egy medencét 4 egyforma csap 9 óra alatt tölt fel. Ha kinyitunk még 2 ugyanolyan csapot (összesen 6 csap folyik), mennyi idő alatt telik meg a medence?',
        options: ['6 óra alatt', '7 óra alatt', '5 óra alatt', '4,5 óra alatt'],
        correctAnswer: 0,
        hint: 'Ügyelj a csapok számára: 4 + 2 = 6 csap fog folyni!',
        explanation: 'Összes vízmennyiség egysége: 4 · 9 = 36 csapóra. 6 csap esetén: 36 / 6 = 6 óra szükséges.'
      },
      {
        id: 'g8-fi-l3-q5',
        question: 'Egy téglalap területe 48 cm². Ha az egyik oldalát 8 cm-ről 12 cm-re növeljük, hogyan változik a másik oldala?',
        options: [
          '6 cm-ről 4 cm-re csökken (2 cm-rel csökken)',
          '6 cm-ről 3 cm-re csökken',
          '8 cm-ről 6 cm-re csökken',
          'Nem változik'
        ],
        correctAnswer: 0,
        hint: 'Számold ki mindkét esetben a másik oldalt: b = 48 / a!',
        explanation: 'Kezdetben b₁ = 48 / 8 = 6 cm. Az új oldal b₂ = 48 / 12 = 4 cm. A másik oldal tehát 6 cm-ről 4 cm-re (2 cm-rel) csökken.'
      },
      {
        id: 'g8-fi-l3-q6',
        question: 'Ha egy autó sebességét 25%-kal növeljük (v_új = 1,25 · v), hány százalékkal csökken a menetidő ugyanazon az úton?',
        options: ['20%-kal csökken', '25%-kal csökken', '15%-kal csökken', '12,5%-kal csökken'],
        correctAnswer: 0,
        hint: 't_új = s / (1,25 · v) = (1 / 1,25) · t = (4/5) · t = 0,8 · t!',
        explanation: 'Az új menetidő: t_új = t / 1,25 = t / (5/4) = 0,8 · t, ami 80%-a az eredeti időnek, vagyis pontosan 20%-kal csökken!'
      },
      {
        id: 'g8-fi-l3-q7',
        question: 'Egy gépben két fogaskerék kapcsolódik egymáshoz. A nagyobb kerék 30 fogú és 120-at fordul percenként. Hányat fordul percenként a vele kapcsolódó 20 fogú kisebb kerék?',
        options: ['180-at', '80-at', '150-et', '200-at'],
        correctAnswer: 0,
        hint: 'A fogszám és a fordulatszám szorzata állandó: z₁ · n₁ = z₂ · n₂!',
        explanation: '30 · 120 = 3600. A 20 fogú kerék fordulatszáma: 3600 / 20 = 180 fordulat percenként.'
      },
      {
        id: 'g8-fi-l3-q8',
        question: '8 nyomtató 45 perc alatt nyomtat ki egy könyvadagot. Hány perc alatt végezne ugyanezzel 5 ugyanilyen gép?',
        options: ['72 perc', '60 perc', '80 perc', '54 perc'],
        correctAnswer: 0,
        hint: '1. Összes nyomtatóperc: 8 · 45 = 360. 2. Oszd el 5-tel!',
        explanation: 'Összes gépidő: 8 · 45 = 360 gép-perc. 5 gép esetén: 360 / 5 = 72 perc.'
      },
      {
        id: 'g8-fi-l3-q9',
        question: 'Egy kirándulócsoport 60 000 Ft-ért bérel kisbuszt. Ha 5-tel többen jönnének, mindenkinek 400 Ft-tal kevesebbet kellene fizetnie. Hányan mentek eredetileg kirándulni?',
        options: ['25 fő', '20 fő', '30 fő', '15 fő'],
        correctAnswer: 0,
        hint: 'Teszteld az opciókat: 25 fő esetén 60 000 / 25 = 2400 Ft/fő; 30 fő esetén 60 000 / 30 = 2000 Ft/fő (2400 - 2000 = 400 Ft)!',
        explanation: 'Eredetileg 25 fő fejenként 60 000 / 25 = 2400 Ft-ot fizet. Ha 5-tel többen vannak (30 fő), akkor 60 000 / 30 = 2000 Ft fejenként, ami pontosan 400 Ft megtakarítás fejenként.'
      },
      {
        id: 'g8-fi-l3-q10',
        question: 'Egy üzemben a napi munkához 12 gép szükséges 8 órán keresztül. Hány gépet kell még üzembe helyezni, hogy 6 óra alatt elkészüljön a napi norma?',
        options: [
          'Még 4 gépet (összesen 16 gép)',
          'Még 2 gépet (összesen 14 gép)',
          'Még 6 gépet (összesen 18 gép)',
          'Még 3 gépet (összesen 15 gép)'
        ],
        correctAnswer: 0,
        hint: '1. Összes gépóra: 12 · 8 = 96. 2. 6 órához: 96 / 6 = 16 gép. 3. Mennyi kell MÉG a 12 mellé?',
        explanation: 'Összesen 12 · 8 = 96 gépóra szükséges. 6 óra alatt: 96 / 6 = 16 gép kell. Mivel már van 12 gép, még 16 - 12 = 4 gépet kell pluszban beállítani.'
      }
    ]
  }
};

export const InverseProportionQuiz: React.FC<InverseProportionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Fordított Arányosság Kvíz"
      subtitle="Gyakorold a szorzat állandóságát (x · y = k), a hiperbola görbét és a gyakorlati munkamegosztást 3 nehézségi szinten!"
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicId="g8-func-inverse"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="indigo"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az állandó szorzatokat, hiperbola pontokat és munkamegosztásokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Szorzat Állandósága',
              subtitle: 'Párosítsd a fordított arányosság fogalmait, képleteit és grafikonjának tulajdonságait!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapösszefüggések'
            },
            2: {
              title: '2. Szint: Számítások és Hiányzó Értékek',
              subtitle: 'Határozd meg a hiányzó értéket vagy a k állandó szorzatot az értékpárokból!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számítások & Pontok'
            },
            3: {
              title: '3. Szint: Munkamegosztás, Sebesség és Geometria',
              subtitle: 'Párosítsd a valós életbeli helyzeteket a megfelelő számítással és megoldással!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Gyakorlati problémák'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <InverseProportionMatcher
              key={`ip-matcher-${level}`}
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
          subtitle: 'Kategorizáld a képleteket, hiperbola síknegyedeket és gyakorlati modelleket!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          levels: {
            1: {
              title: '1. Szint: Kapcsolatok és Hozzárendelések Típusa',
              subtitle: 'Válogasd szét: Fordított arányosság / Egyenes arányosság / Nem arányos!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Kapcsolattípusok'
            },
            2: {
              title: '2. Szint: Hiperbola Síknegyedei és Pontjai',
              subtitle: 'Sorold be: I. és III. negyed / II. és IV. negyed / Nem hiperbola!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Síknegyedek'
            },
            3: {
              title: '3. Szint: Hétköznapi Helyzetek és Gyakorlati Modell',
              subtitle: 'Csoportosítsd: Munkamegosztás / Sebesség és menetidő / Téglalap területe!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Gyakorlati modellek'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <InverseProportionSorter
              key={`ip-sorter-${level}`}
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

export default InverseProportionQuiz;
