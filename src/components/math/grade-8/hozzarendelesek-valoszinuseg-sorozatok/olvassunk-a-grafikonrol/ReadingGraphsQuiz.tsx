import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ReadingGraphsMatcher } from './ReadingGraphsMatcher';
import { ReadingGraphsSorter } from './ReadingGraphsSorter';
import { ArrowRightLeft, LayoutGrid, Eye, Activity, LineChart, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface ReadingGraphsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Menetdiagram Alapszabályai',
    icon: <Activity className="w-4 h-4 text-teal-600" />,
    formula: 'v = \\Delta s / \\Delta t \\quad (\\text{Meredekség} = \\text{Sebesség})',
    note: 'Minél meredekebb az egyenes szakasz, annál nagyobb a sebesség. A vízszintes szakasz állóhelyzetet (pihenő, v = 0), a lefelé lejtő szakasz visszafordulást jelent.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="15" y1="40" x2="50" y2="15" stroke="#0d9488" strokeWidth="2" />
        <line x1="50" y1="15" x2="90" y2="15" stroke="#f59e0b" strokeWidth="2.5" />
        <line x1="90" y1="15" x2="135" y2="40" stroke="#ef4444" strokeWidth="2" />
        <text x="32" y="24" className="text-[6px] font-bold fill-teal-800">Előre</text>
        <text x="70" y="11" className="text-[6px] font-bold fill-amber-700">Pihenő</text>
        <text x="115" y="24" className="text-[6px] font-bold fill-rose-800">Visszaút</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Két Menetdiagram Metszéspontja',
    icon: <Eye className="w-4 h-4 text-teal-600" />,
    formula: 's_A(t) = s_B(t) \\implies \\text{Találkozás vagy előzés}',
    note: 'Ahol két görbe metszi egymást, ott a két mozgó test azonos időpontban azonos helyen tartózkodik (találkozási pont).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="140" y2="10" stroke="#3b82f6" strokeWidth="1.8" />
        <line x1="20" y1="10" x2="140" y2="40" stroke="#ef4444" strokeWidth="1.8" />
        <circle cx="80" cy="25" r="3.5" fill="#10b981" />
        <text x="80" y="42" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">Metszéspont</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Átlagsebesség Kiszámítása',
    icon: <Clock className="w-4 h-4 text-teal-600" />,
    formula: 'v_{\\text{átlag}} = \\frac{\\text{Összes megtett út}}{\\text{Összes eltelt idő}}',
    note: 'Az átlagsebességnél a teljes utat kell elosztani a teljes idővel. A pihenőidőt (ahol v = 0) kötelező beleszámolni az összes időbe!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="8" width="120" height="34" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        <text x="80" y="22" className="text-[7px] font-black fill-emerald-900" textAnchor="middle">s_összes / t_összes</text>
        <text x="80" y="34" className="text-[6px] fill-slate-600" textAnchor="middle">Nem az átlagok átlaga!</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Szélsőérték: Helye vs. Értéke',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '\\text{Hely} \\in x\\text{-tengely} \\quad | \\quad \\text{Érték} \\in y\\text{-tengely}',
    note: 'Ha a kérdés „Mikor?”, akkor az időpontot (x) kell megadni. Ha a kérdés „Mennyi?”, akkor a csúcsértéket (y) kell válaszolni.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <path d="M 20 40 Q 80 5 140 40" fill="none" stroke="#6366f1" strokeWidth="2" />
        <circle cx="80" cy="18" r="3" fill="#6366f1" />
        <text x="80" y="11" className="text-[6px] font-bold fill-indigo-800" textAnchor="middle">Max: (t₀; y_max)</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Menetdiagram és Grafikon Alapok',
    subtitle: 'Ismerd fel a grafikon szakaszait, a vízszintes pihenőt, a meredekséget és az értékeket!',
    questions: [
      {
        id: 'g8-rg-l1-q1',
        question: 'Egy út-idő menetdiagramon vízszintes egyenes szakasz látható. Mit jelent ez a mozgás szempontjából?',
        options: [
          'A test áll, nyugalomban van (pihenő, sebessége 0 km/h)',
          'A test egyenletesen gyorsul',
          'A test hátrafelé tolat',
          'A jármű hegyre megy felfelé'
        ],
        correctAnswer: 0,
        hint: 'A vízszintes vonalon az idő telik, de az út (s) értéke nem változik.',
        explanation: 'Ha az út nem változik az idő múlásával, akkor a test helyzete változatlan, vagyis sebessége v = 0 km/h (nyugalmi állapot, pihenő).'
      },
      {
        id: 'g8-rg-l1-q2',
        question: 'Két kerékpáros menetdiagramján az I. szakasz meredekebb, mint a II. szakasz. Mit mondhatunk a sebességükről?',
        options: [
          'Az I. szakaszon nagyobb a sebesség, mint a II. szakaszon',
          'A II. szakaszon nagyobb a sebesség',
          'Egyenlő a sebességük mindkét szakaszon',
          'A meredekségnek nincs köze a sebességhez'
        ],
        correctAnswer: 0,
        hint: 'Az s-t grafikon meredeksége: v = Δs / Δt. Minél meredekebb, annál gyorsabb!',
        explanation: 'A menetdiagram meredeksége a sebességet fejezi ki: v = Δs / Δt. A meredekebb egyenes egységnyi idő alatt nagyobb utat jelent, így nagyobb sebességet képvisel.'
      },
      {
        id: 'g8-rg-l1-q3',
        question: 'Két mozgó test menetdiagramja egy pontban metszi egymást. Mit jelent ez a metszéspont?',
        options: [
          'A két test abban az időpontban és helyen találkozik (vagy elhalad egymás mellett)',
          'Mindkét test megáll pihenni',
          'A két test egyszerre indult el',
          'A két test visszafordult'
        ],
        correctAnswer: 0,
        hint: 'A metszéspontban azonos a t időpont és azonos az s távolság.',
        explanation: 'A metszéspont koordinátái (t₀; s₀) azt jelentik, hogy a két test ugyanabban a t₀ időpontban pontosan ugyanabban az s₀ helyzetben van, vagyis találkoznak.'
      },
      {
        id: 'g8-rg-l1-q4',
        question: 'Egy autó menetdiagramja az origóból (0; 0) indulva egyenesen a (2; 120) pontba érkezik (t órában, s km-ben). Mennyi az autó sebessége?',
        options: ['60 km/h', '120 km/h', '240 km/h', '30 km/h'],
        correctAnswer: 0,
        hint: 'Oszd el a megtett 120 km utat a 2 óra időtartammal: v = s / t!',
        explanation: 'v = s / t = 120 km / 2 h = 60 km/h.'
      },
      {
        id: 'g8-rg-l1-q5',
        question: 'Egy kirándulás menetdiagramja a vízszintes tengelyen reggel 8:00-tól délután 16:00-ig tart. Mi a függvény értelmezési tartománya?',
        options: [
          'A [8; 16] óra közötti zárt intervallum',
          'A [0; 8] km távolság',
          'Csak a 8:00 és a 16:00 időpont',
          'Bármely valós szám'
        ],
        correctAnswer: 0,
        hint: 'Az értelmezési tartomány a vízszintes tengely azon része, ahol a folyamat zajlik.',
        explanation: 'Az értelmezési tartomány a független változó (itt az idő) lehetséges értékeinek halmaza: reggel 8-tól 16 óráig tart, vagyis a [8; 16] intervallum.'
      },
      {
        id: 'g8-rg-l1-q6',
        question: 'Mit jelent egy menetdiagramon a lefelé lejtő szakasz (ahol a távolság csökken)?',
        options: [
          'A mozgó test visszafordul a kiindulópont felé',
          'A jármű lejtőn gurul le gyorsulva',
          'A jármű leállt',
          'A jármű eltévedt'
        ],
        correctAnswer: 0,
        hint: 'A starttól mért s távolság csökken, vagyis közeledik a rajthoz.',
        explanation: 'Ha az s(t) grafikon lefelé lejt, a kiindulási ponttól mért távolság csökken, ami a kiindulási hely felé való visszatérést jelzi.'
      },
      {
        id: 'g8-rg-l1-q7',
        question: 'Mit jelent a zérushely egy napi hőmérsékletet ábrázoló grafikonon (T - t)?',
        options: [
          'Azt az időpontot, amikor a hőmérséklet pontosan 0 °C (fagyáspont átlépése)',
          'A nap legmelegebb pillanatát',
          'A napfelkelte pontos idejét',
          'Azt, hogy elromlott a hőmérő'
        ],
        correctAnswer: 0,
        hint: 'A zérushely azt jelenti, hogy a függőleges tengely értéke nulla: T = 0 °C.',
        explanation: 'A grafikon zérushelye az a pont, ahol átmetszi az x-tengelyt (T = 0 °C), vagyis a víz fagyáspontjának átlépését mutatja.'
      },
      {
        id: 'g8-rg-l1-q8',
        question: 'Egy túrázó 3 óra alatt 45 km-t tesz meg kerékpárral, ebből 1 órát egy kilátónál pihent. Mennyi volt a tényleges menetsebessége a tekerés közben?',
        options: ['22,5 km/h', '15 km/h', '45 km/h', '30 km/h'],
        correctAnswer: 0,
        hint: 'A tiszta menetidő: 3 óra - 1 óra pihenő = 2 óra!',
        explanation: 'Tiszta tekerési idő: t = 3 - 1 = 2 óra. Menetsebesség: v = 45 km / 2 h = 22,5 km/h.'
      },
      {
        id: 'g8-rg-l1-q9',
        question: 'Egy hőmérsékleti grafikon legmagasabb pontja a P(14; 26) pontban van. Mi a maximum helye és értéke?',
        options: [
          'A maximum helye 14 óra, értéke 26 °C',
          'A maximum helye 26 °C, értéke 14 óra',
          'A maximum helye és értéke is 14',
          'A maximum helye és értéke is 26'
        ],
        correctAnswer: 0,
        hint: 'A hely a vízszintes tengelyen (idő), az érték a függőleges tengelyen (hőmérséklet) van.',
        explanation: 'A szélsőérték HELYE mindig az x koordináta (14:00 óra), az ÉRTÉKE pedig az y koordináta (26 °C).'
      },
      {
        id: 'g8-rg-l1-q10',
        question: 'Egy hegyi túra során a tengerszint feletti magasság 200 méterről indult és a legmagasabb ponton 850 méter volt. Mi a magasságfüggvény értékkészlete?',
        options: [
          'A [200; 850] méter zárt intervallum',
          'A [0; 850] méter intervallum',
          '650 méter',
          '[0; 200] méter'
        ],
        correctAnswer: 0,
        hint: 'Az értékkészlet a felvett legkisebb és legnagyobb y értékek közötti szakasz.',
        explanation: 'Az értékkészlet a függőleges tengelyen felvett minimum (200 m) és maximum (850 m) közötti összes érték: R = [200; 850] m.'
      }
    ]
  },
  2: {
    title: '2. Szint: Sebességszámítás, Pontleolvasás és Szakaszok',
    subtitle: 'Elemezz több szakaszból álló mozgásokat, számíts átlagsebességet és hőingadozást!',
    questions: [
      {
        id: 'g8-rg-l2-q1',
        question: 'Egy autó menetdiagramja: az 1. órában 60 km-t tesz meg, a 2. órában pihen (áll), a 3–4. órában (2 óra alatt) 100 km-t halad. Mennyi az átlagsebessége a teljes 4 órás útra?',
        options: ['40 km/h', '50 km/h', '53,3 km/h', '80 km/h'],
        correctAnswer: 0,
        hint: 'Teljes megtett út: 60 + 100 = 160 km. Teljes idő: 4 óra. v_átlag = Összes út / Összes idő!',
        explanation: 'Összes út: s = 60 + 0 + 100 = 160 km. Összes idő: t = 4 óra. Átlagsebesség: v_átlag = 160 / 4 = 40 km/h.'
      },
      {
        id: 'g8-rg-l2-q2',
        question: 'Egy gyalogos a starttól 12 km-re túrázik 3 óra alatt, majd visszafordul, és 2 óra alatt visszatér a kiindulópontra. Mennyi a teljes megtett út és az elmozdulás?',
        options: [
          'Megtett út: 24 km, Elmozdulás: 0 km',
          'Megtett út: 12 km, Elmozdulás: 12 km',
          'Megtett út: 0 km, Elmozdulás: 24 km',
          'Megtett út: 24 km, Elmozdulás: 24 km'
        ],
        correctAnswer: 0,
        hint: 'A megtett út a lábunk által megtett összes kilométer (oda + vissza), az elmozdulás a kezdő- és végpont távolsága.',
        explanation: 'Megtett út: 12 km oda + 12 km vissza = 24 km. Mivel visszatért a kezdőpontra, a kezdőponthoz képesti elmozdulása 0 km.'
      },
      {
        id: 'g8-rg-l2-q3',
        question: 'Egy tavaszi napon a hajnali minimum -3 °C volt, a délutáni maximum 19 °C. Mennyi volt a napi hőingadozás (szélsőértékek különbsége)?',
        options: ['22 °C', '16 °C', '-22 °C', '19 °C'],
        correctAnswer: 0,
        hint: 'Kivonás negatív számmal: 19 - (-3) = 19 + 3!',
        explanation: 'A hőingadozás a maximum és a minimum különbsége: ΔT = 19 - (-3) = 19 + 3 = 22 °C.'
      },
      {
        id: 'g8-rg-l2-q4',
        question: 'Két futó mozog egyenes pályán: Péter helyzete s_P = 10 · t, Zoli helyzete s_Z = 30 - 5 · t. Hány óra múlva találkoznak (metszéspont)?',
        options: ['2 óra múlva', '3 óra múlva', '1,5 óra múlva', '6 óra múlva'],
        correctAnswer: 0,
        hint: 'A találkozáskor s_P = s_Z: 10t = 30 - 5t. Add hozzá az 5t-t mindkét oldalhoz!',
        explanation: '10t = 30 - 5t ⟹ 15t = 30 ⟹ t = 2 óra. A találkozási hely s = 10 · 2 = 20 km.'
      },
      {
        id: 'g8-rg-l2-q5',
        question: 'Egy menetdiagramon a P(2,5; 50) pont látható (t órában, s km-ben). Mit fejez ki ez a pont?',
        options: [
          'A starttól számított 2,5 óra múlva a jármű 50 km távolságban volt',
          'Az autó sebessége 2,5 km/h volt',
          'Az autó 50 óra alatt 2,5 km-t ment',
          'Az autó 2,5 órán át állt'
        ],
        correctAnswer: 0,
        hint: 'Az első koordináta az idő (t = 2,5 h), a második a megtett távolság (s = 50 km).',
        explanation: 'A P(t; s) pont a mozgás egy állapotát adja meg: t = 2,5 óra elteltével a jármű 50 km-re volt a kiindulási ponttól.'
      },
      {
        id: 'g8-rg-l2-q6',
        question: 'Egy medencében 10:00-kor 200 liter víz van, 10:30-kor pedig 800 liter. Mennyi volt a vízszint növekedési sebessége (vízhozam)?',
        options: ['20 liter/perc', '600 liter/perc', '30 liter/perc', '10 liter/perc'],
        correctAnswer: 0,
        hint: 'Változás: 800 - 200 = 600 liter. Eltelt idő: 30 perc. Sebesség = Változás / Idő!',
        explanation: 'ΔV = 800 - 200 = 600 liter. Δt = 30 perc. Vízhozam = 600 / 30 = 20 liter/perc.'
      },
      {
        id: 'g8-rg-l2-q7',
        question: 'Melyik szakaszon volt a leggyorsabb a mozgás az alábbiak közül?\nI. szakasz: 30 km 1 óra alatt\nII. szakasz: 50 km 2 óra alatt\nIII. szakasz: 40 km 30 perc alatt',
        options: [
          'A III. szakaszon (80 km/h)',
          'Az I. szakaszon (30 km/h)',
          'A II. szakaszon (25 km/h)',
          'Egyforma gyors volt mindegyik'
        ],
        correctAnswer: 0,
        hint: 'Számold ki mindegyik szakasz sebességét: v = s / t (30 perc = 0,5 óra)!',
        explanation: 'I: 30 / 1 = 30 km/h. II: 50 / 2 = 25 km/h. III: 40 / 0,5 = 80 km/h. A III. szakasz meredeksége a legnagyobb, így ott volt a leggyorsabb.'
      },
      {
        id: 'g8-rg-l2-q8',
        question: 'Egy autó egyenletesen gyorsul a zöld lámpától indulva. Milyen formájú az s-t menetdiagramja ebben az időszakban?',
        options: [
          'Felfelé egyre meredekebben ívelő görbe (parabola ív)',
          'Egyenes vonal',
          'Vízszintes vonal',
          'Lefelé hajló laposodó görbe'
        ],
        correctAnswer: 0,
        hint: 'Mivel a sebesség folyamatosan nő, a görbe meredekségének is egyre nagyobbnak kell lennie.',
        explanation: 'Egyenletesen gyorsuló mozgásnál a sebesség nő, így az s(t) grafikon meredeksége pontról pontra növekszik: a grafikon egy felfelé hajló parabola ív.'
      },
      {
        id: 'g8-rg-l2-q9',
        question: 'Egy kiránduló magassága: 0–3 óra között 300 m-ről 900 m-re nő, 3–4 óra között 900 m (pihenő), 4–6 óra között 900 m-ről 300 m-re csökken. Melyik intervallumon szigorúan monoton növekvő a magasságfüggvény?',
        options: [
          'A [0; 3] óra intervallumon',
          'A [3; 4] óra intervallumon',
          'A [4; 6] óra intervallumon',
          'A teljes [0; 6] intervallumon'
        ],
        correctAnswer: 0,
        hint: 'Ahol a grafikon balról jobbra felfelé halad, ott nő az érték.',
        explanation: 'A függvény a [0; 3] intervallumon szigorúan monoton növekvő, [3; 4] között konstans (állandó), [4; 6] között pedig szigorúan monoton csökkenő.'
      },
      {
        id: 'g8-rg-l2-q10',
        question: 'Egy kerékpáros 20 km-t tesz meg 20 km/h-val (1 óra), majd 1 órát pihen a strandon. Mennyi az átlagsebessége a 2 órás programra nézve?',
        options: ['10 km/h', '20 km/h', '0 km/h', '15 km/h'],
        correctAnswer: 0,
        hint: 'v_átlag = Összes út / Összes idő = 20 km / 2 óra!',
        explanation: 'Összes út: 20 km. Összes idő a pihenővel: 1 h + 1 h = 2 h. Átlagsebesség: v = 20 / 2 = 10 km/h.'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Menetdiagramok és Szöveges Elemzések',
    subtitle: 'Oldj meg találkozásos feladványokat, relatív mozgásokat és valós életbeli grafikonokat!',
    questions: [
      {
        id: 'g8-rg-l3-q1',
        question: 'Két állomás távolsága 240 km. Az 1. vonat A-ból indul 80 km/h-val, a 2. vonat B-ből indul szembe 40 km/h-val. Hány óra múlva metszi egymást a két menetdiagram (találkozás)?',
        options: ['2 óra múlva (160 km-nél A-tól)', '3 óra múlva', '1,5 óra múlva', '4 óra múlva'],
        correctAnswer: 0,
        hint: 'Egymással szemben haladva a közeledési sebesség: 80 + 40 = 120 km/h. Idő = 240 / 120!',
        explanation: 'A két vonat együttes sebessége 80 + 40 = 120 km/h. A 240 km-t t = 240 / 120 = 2 óra alatt teszik meg. Az 1. vonat eközben 80 · 2 = 160 km-t tesz meg A-tól.'
      },
      {
        id: 'g8-rg-l3-q2',
        question: 'Anna reggel 8:00-kor indul 4 km/h gyaloglótempóval. Béla 9:00-kor indul utána kerékpárral 12 km/h-val. Mikor és milyen távolságban éri utol Béla Annát?',
        options: [
          '9:30-kor, a starttól 6 km-re',
          '9:45-kor, a starttól 8 km-re',
          '10:00-kor, a starttól 8 km-re',
          '9:20-kor, a starttól 4 km-re'
        ],
        correctAnswer: 0,
        hint: 'Anna 1 óra alatt 4 km előnyt szerzett. Béla relatív sebessége: 12 - 4 = 8 km/h. Utolérési idő: 4 / 8 = 0,5 óra (30 perc)!',
        explanation: '9:00-kor Anna 4 km-re van. Béla 12 - 4 = 8 km/h-val közeledik. Utolérési idő: 4 / 8 = 0,5 óra = 30 perc. Így 9:30-kor éri utol, megtett út: 12 · 0,5 = 6 km.'
      },
      {
        id: 'g8-rg-l3-q3',
        question: 'Egy kamion 120 km-t tesz meg 80 km/h sebességgel (1,5 óra), majd 30 percet áll a határon, majd 60 km-t halad 60 km/h-val (1 óra). Mennyi az egész fuvar átlagsebessége?',
        options: ['60 km/h', '70 km/h', '65 km/h', '75 km/h'],
        correctAnswer: 0,
        hint: 'Összes út: 120 + 60 = 180 km. Összes idő: 1,5 h + 0,5 h + 1 h = 3 h. v = 180 / 3!',
        explanation: 'Összes út: 120 + 60 = 180 km. Összes idő: 1,5 + 0,5 + 1 = 3 óra. Teljes átlagsebesség: v_átlag = 180 / 3 = 60 km/h.'
      },
      {
        id: 'g8-rg-l3-q4',
        question: 'Egy túrázó menetdiagramján a t = 2 és t = 5 óra közötti szakasz vízszintes, s = 15 km magasságban. Mennyi ideig tartott a pihenője?',
        options: ['3 órán keresztül', '5 órán keresztül', '2 órán keresztül', '15 órán keresztül'],
        correctAnswer: 0,
        hint: 'A pihenő időtartama a vízszintes szakasz kezdete és vége közötti különbség: 5 - 2!',
        explanation: 'A pihenő hossza az időtengelyen mért szakasz: t_pihenő = 5 - 2 = 3 óra.'
      },
      {
        id: 'g8-rg-l3-q5',
        question: 'Egy beteg napi lázgörbéje: 8:00-kor 38,5 °C, 12:00-kor 37,0 °C, 16:00-kor 39,2 °C, 20:00-kor 37,5 °C. Mennyi volt a napi lázmaximum és mikor mérte az orvos?',
        options: [
          '39,2 °C a maximum, 16:00-kor mérték',
          '38,5 °C a maximum, 8:00-kor mérték',
          '37,0 °C a minimum, 12:00-kor mérték',
          '39,2 °C a maximumhely, 16:00 a maximumérték'
        ],
        correctAnswer: 0,
        hint: 'A legmagasabb felvett érték 39,2 °C, az ehhez tartozó időpont 16:00.',
        explanation: 'A legmagasabb hőmérséklet a 39,2 °C, a mérés időpontja pedig délután 16:00 volt.'
      },
      {
        id: 'g8-rg-l3-q6',
        question: 'Két város között 180 km a távolság. Egy autó 1 óra alatt eléri a felét (90 km), megáll 30 percre kávézni, majd a maradék 90 km-t 1 óra alatt teszi meg. Mennyi volt a mozgási sebessége a második szakaszon?',
        options: ['90 km/h', '60 km/h', '72 km/h', '120 km/h'],
        correctAnswer: 0,
        hint: 'A 2. szakaszon 90 km-t tett meg 1 óra alatt: v = 90 / 1!',
        explanation: 'A kérdés kifejezetten a második mozgási szakasz sebességére vonatkozik: v₂ = 90 km / 1 h = 90 km/h.'
      },
      {
        id: 'g8-rg-l3-q7',
        question: 'Egy víztartály leeresztését a V(t) = 600 - 30 · t képlet írja le (V literben, t percben). Hány perc múlva ürül ki teljesen a tartály (zérushely)?',
        options: ['20 perc múlva', '30 perc múlva', '15 perc múlva', '10 perc múlva'],
        correctAnswer: 0,
        hint: 'A kiürülés azt jelenti, hogy V(t) = 0: 600 - 30t = 0 ⟹ 30t = 600!',
        explanation: '600 - 30t = 0 ⟹ 30t = 600 ⟹ t = 20 perc.'
      },
      {
        id: 'g8-rg-l3-q8',
        question: 'Egy kerékpáros 20 km/h-val teker odafelé 2 órát (40 km), majd visszafelé szembeszélben 10 km/h-val teszi meg ugyanezt az utat (4 óra). Mennyi az oda-vissza út átlagsebessége?',
        options: ['13,3 km/h', '15 km/h', '12 km/h', '16,7 km/h'],
        correctAnswer: 0,
        hint: 'Összes út: 40 + 40 = 80 km. Összes idő: 2 + 4 = 6 óra. v = 80 / 6 (Nem 15 km/h)!',
        explanation: 'Gyakori csapda a (20 + 10) / 2 = 15 km/h számtani átlag! A helyes átlagsebesség: v_átlag = Összes út / Összes idő = 80 km / 6 h = 13,33 km/h.'
      },
      {
        id: 'g8-rg-l3-q9',
        question: 'Egy kilőtt rakéta magasságát a h(t) = -5t² + 40t képlet írja le. Mikor éri el a pálya csúcspontját (maximumhely)?',
        options: ['4 másodperc múlva', '8 másodperc múlva', '2 másodperc múlva', '10 másodperc múlva'],
        correctAnswer: 0,
        hint: 'A parabola csúcspontjának t koordinátája: t = -b / (2a) = -40 / (2 · (-5)) = 40 / 10!',
        explanation: 'A másodfokú görbe csúcspontja a szimmetriatengelynél van: t = -40 / (2 · (-5)) = 4 másodperc. A maximális magasság: h(4) = -5 · 16 + 160 = 80 méter.'
      },
      {
        id: 'g8-rg-l3-q10',
        question: 'Mi a különbség az elmozdulás és a megtett út között a menetdiagram elemzésekor?',
        options: [
          'A megtett út a valóságban lefutott kilométerek összege, az elmozdulás a kezdő- és végpont közötti távolságvektor',
          'Nincs különbség, szinonimák',
          'Az elmozdulás mindig nagyobb a megtett útnál',
          'A megtett út lehet negatív szám is'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, ha körbefutsz egy 400 méteres atlétikai pályán és visszatérsz a rajtba.',
        explanation: 'Ha körbefutsz egy 400 m-es pályán, a megtett utad 400 m, de mivel a rajtnál fejezed be, az elmozdulásod 0 m.'
      }
    ]
  }
};

export const ReadingGraphsQuiz: React.FC<ReadingGraphsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Olvassunk a Grafikonról Kvíz"
      subtitle="Elemezz menetdiagramokat, sebességet, találkozási pontokat és szélsőértékeket 3 nehézségi szinten!"
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicId="g8-func-reading"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="teal"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a menetdiagram szakaszait, sebességeket és találkozási pontokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-500" />,
          levels: {
            1: {
              title: '1. Szint: Grafikon Fogalmak és Menetdiagram Jelölések',
              subtitle: 'Párosítsd a menetdiagramok szakaszait a fizikai jelentésükkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Sebességszámítások és Pontleolvasás',
              subtitle: 'Határozd meg a sebességet, távolságot vagy hőmérséklet-ingadozást a grafikonról!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Sebességek & Értékek'
            },
            3: {
              title: '3. Szint: Összetett Menetdiagramok és Találkozások',
              subtitle: 'Elemezz találkozásokat, átlagsebességeket és több szakaszból álló mozgásokat!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Összetett feladatok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <ReadingGraphsMatcher
              key={`rg-matcher-${level}`}
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
          subtitle: 'Kategorizáld a mozgástípusokat, változási szakaszokat és grafikon-fajtákat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-teal-500" />,
          levels: {
            1: {
              title: '1. Szint: Mozgástípusok a Menetdiagramon',
              subtitle: 'Válogasd szét: előrehaladás, pihenő/állóhelyzet vagy visszaút!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Mozgástípusok'
            },
            2: {
              title: '2. Szint: Szélsőértékek és Monotonitási Szakaszok',
              subtitle: 'Kategorizáld: növekvő, csökkenő vagy szélsőérték/állandó szakasz!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Monotonitás & Szélsőérték'
            },
            3: {
              title: '3. Szint: Grafikon Típusok és Fizikai Mennyiségek',
              subtitle: 'Sorold be a tulajdonságokat: menetdiagram, hőmérséklet vagy vízszint!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Grafikon típusok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <ReadingGraphsSorter
              key={`rg-sorter-${level}`}
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

export default ReadingGraphsQuiz;
