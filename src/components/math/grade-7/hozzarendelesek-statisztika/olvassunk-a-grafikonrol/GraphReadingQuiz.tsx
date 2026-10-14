import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { GraphReadingMatcher } from './GraphReadingMatcher';
import { GraphReadingSorter } from './GraphReadingSorter';

interface GraphReadingQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const graphQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'gr-q1',
    level: 1,
    question: 'A derékszögű koordináta-rendszerben melyik tengely ábrázolja hagyományosan a független változót (pl. az eltelt időt)?',
    options: ['A vízszintes x-tengely', 'A függőleges y-tengely', 'Az origó', 'Egyik tengely sem'],
    correctAnswer: 0,
    explanation: 'A vízszintes tengelyt nevezzük x-tengelynek (abszcissza), és erre kerül a független változó (pl. eltelt idő, darabszám).'
  },
  {
    id: 'gr-q2',
    level: 1,
    question: 'Mit nevezünk egy grafikonon zérushelynek?',
    options: [
      'Azt az x értéket, ahol a grafikon metszi az x-tengelyt (vagyis y = 0)',
      'Ahol a grafikon eléri a maximális magasságát',
      'Azt a pontot, ahol a görbe metszi az y-tengelyt',
      'A koordináta-rendszer origóját'
    ],
    correctAnswer: 0,
    explanation: 'A zérushely az a független változó (x) érték, amelyhez tartozó függvényérték (y) pontosan nulla: (x; 0). Geometriailag az x-tengely metszéspontja.'
  },
  {
    id: 'gr-q3',
    level: 1,
    question: 'A rajzon látható egyenes grafikon alapján mennyi a függvényérték (y), ha x = 2?',
    options: ['4', '2', '6', '1'],
    correctAnswer: 0,
    explanation: 'Az x = 2 pontból függőlegesen a grafikonig haladva elérjük a (2; 4) pontot, ahonnan vízszintesen az y-tengelyre vetítve y = 4 adódik.',
    figure: (
      <svg viewBox="0 0 200 90" className="w-44 h-20 mx-auto bg-slate-50 dark:bg-slate-900 rounded-lg p-1">
        <line x1="25" y1="75" x2="180" y2="75" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="80" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        {/* Line y = 2x: (0,0)->(35,75), (2,4)->(95,35), (3,6)->(125,15) */}
        <line x1="35" y1="75" x2="140" y2="5" stroke="#0891b2" strokeWidth="2.5" />
        <line x1="95" y1="75" x2="95" y2="35" stroke="#38bdf8" strokeDasharray="2,2" strokeWidth="1" />
        <line x1="35" y1="35" x2="95" y2="35" stroke="#38bdf8" strokeDasharray="2,2" strokeWidth="1" />
        <circle cx="95" cy="35" r="3.5" fill="#0284c7" />
        <text x="95" y="86" textAnchor="middle" className="text-[8px] font-bold fill-slate-600">x = 2</text>
        <text x="24" y="38" textAnchor="middle" className="text-[8px] font-bold fill-cyan-600">y = ?</text>
      </svg>
    )
  },
  {
    id: 'gr-q4',
    level: 1,
    question: 'A hőmérséklet–idő grafikon szerint hány °C volt a hajnali legalacsonyabb hőmérséklet (minimum)?',
    options: ['-3 °C', '-1 °C', '0 °C', '2 °C'],
    correctAnswer: 0,
    explanation: 'A grafikon legmélyebb pontja a függőleges tengely skáláján a -3 °C értéknél található.',
    figure: (
      <svg viewBox="0 0 200 80" className="w-44 h-18 mx-auto">
        <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="1" />
        <line x1="35" y1="75" x2="35" y2="10" stroke="#94a3b8" strokeWidth="1" />
        <text x="180" y="36" className="text-[8px] fill-slate-500">0 °C</text>
        <path d="M 35 65 Q 65 65 95 40 T 170 15" stroke="#0284c7" strokeWidth="2" fill="none" />
        <circle cx="50" cy="65" r="3.5" fill="#ef4444" />
        <text x="50" y="75" textAnchor="middle" className="text-[8px] fill-slate-500">-3 °C</text>
      </svg>
    )
  },
  {
    id: 'gr-q5',
    level: 1,
    question: 'Mit jelent az út–idő (s - t) grafikonon a vízszintes szakasz?',
    options: [
      'A test áll, sebessége 0 km/h (nem változik a megtett út)',
      'A test maximális sebességgel száguld',
      'A test hátrafelé tolat',
      'A test hegynek felfelé kapaszkodik'
    ],
    correctAnswer: 0,
    explanation: 'Ha a grafikon vízszintes, az idő telik, de a távolság (s) nem nő és nem csökken, ami azt jelenti, hogy a jármű vagy személy egy helyben áll (pl. pihenő).'
  },
  {
    id: 'gr-q6',
    level: 1,
    question: 'A grafikon alapján melyik x értéknél lesz a függvényérték pontosan y = 6?',
    options: ['x = 3', 'x = 2', 'x = 6', 'x = 4'],
    correctAnswer: 0,
    explanation: 'Az y = 6 értéktől vízszintesen a grafikonig haladunk, majd onnan függőlegesen le az x-tengelyre vetítve pontosan az x = 3 helyet kapjuk.',
    figure: (
      <svg viewBox="0 0 200 80" className="w-44 h-18 mx-auto">
        <line x1="25" y1="65" x2="175" y2="65" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="75" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="65" x2="155" y2="15" stroke="#6366f1" strokeWidth="2" />
        <line x1="35" y1="30" x2="105" y2="30" stroke="#f43f5e" strokeDasharray="2,2" strokeWidth="1" />
        <line x1="105" y1="30" x2="105" y2="65" stroke="#f43f5e" strokeDasharray="2,2" strokeWidth="1" />
        <circle cx="105" cy="30" r="3.5" fill="#f43f5e" />
        <text x="24" y="33" className="text-[8px] font-bold fill-slate-700">y=6</text>
        <text x="105" y="75" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">x=?</text>
      </svg>
    )
  },
  {
    id: 'gr-q7',
    level: 1,
    question: 'Egy grafikon vízszintes tengelyén a skála: 1 rácsegység = 2 óra. Hány órát jelent 4 rácsegységnyi távolság jobbra?',
    options: ['8 órát', '4 órát', '6 órát', '2 órát'],
    correctAnswer: 0,
    explanation: 'Mivel 1 rács = 2 óra, ezért 4 rács = 4 · 2 óra = 8 óra.'
  },
  {
    id: 'gr-q8',
    level: 1,
    question: 'A képen látható hegycsúcs-túra magassági grafikonján mennyi a túrázó által elért maximális tengerszint feletti magasság?',
    options: ['700 m', '500 m', '600 m', '800 m'],
    correctAnswer: 0,
    explanation: 'A grafikon legmagasabb csúcspontjának függőleges koordinátája 700 méter.',
    figure: (
      <svg viewBox="0 0 200 80" className="w-44 h-18 mx-auto">
        <line x1="20" y1="65" x2="180" y2="65" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="70" x2="30" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 30 65 L 70 40 L 105 18 L 140 45 L 175 65" stroke="#059669" strokeWidth="2.5" fill="none" />
        <circle cx="105" cy="18" r="3.5" fill="#d97706" />
        <text x="105" y="12" textAnchor="middle" className="text-[8px] fill-slate-500">700 m</text>
      </svg>
    )
  },
  {
    id: 'gr-q9',
    level: 1,
    question: 'Hogyan ismerhető fel egy grafikonon a szigorúan monoton növekvő szakasz?',
    options: [
      'Balról jobbra haladva a vonal folyamatosan emelkedik',
      'Balról jobbra haladva a vonal folyamatosan lefelé süllyed',
      'A vonal teljesen vízszintes és párhuzamos az x-tengellyel',
      'A vonal merőleges a vízszintes tengelyre'
    ],
    correctAnswer: 0,
    explanation: 'A növekvő (monoton nő) szakasz geometriai jellemzője, hogy balról jobbra tekintve a grafikon pontjai egyre magasabbra kerülnek (nagyobb x-hez nagyobb y tartozik).'
  },
  {
    id: 'gr-q10',
    level: 1,
    question: 'Hol található a grafikon y-tengelymetszete?',
    options: [
      'Ahol a grafikon metszi a függőleges tengelyt (ahol x = 0)',
      'Ahol a grafikon metszi a vízszintes tengelyt (zérushely)',
      'Mindig az x = 1 pontban',
      'A grafikon legvégén'
    ],
    correctAnswer: 0,
    explanation: 'Az y-tengelymetszet a grafikon és az y-tengely közös pontja; ezen a tengelyen minden pont x-koordinátája pontosan 0, vagyis a koordinátája (0; f(0)).'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) --
  // ==========================================
  {
    id: 'gr-q11',
    level: 2,
    question: 'A rajzon látható egyenes grafikon alapján töltsd ki az értéktáblázatot! Mennyi a hiányzó y érték, ha x = 4?',
    options: ['7', '6', '8', '9'],
    correctAnswer: 0,
    explanation: 'A grafikon az y = 2x - 1 szabályt követi (átmegy a (0; -1), (1; 1), (2; 3) pontokon). Így x = 4 esetén y = 2 · 4 - 1 = 7.',
    figure: (
      <svg viewBox="0 0 220 85" className="w-48 h-20 mx-auto">
        <rect x="15" y="8" width="190" height="68" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="35" y="28" className="text-[9px] font-bold fill-slate-700">x</text>
        <text x="35" y="52" className="text-[9px] font-bold fill-slate-700">y</text>
        <line x1="50" y1="12" x2="50" y2="68" stroke="#cbd5e1" />
        <line x1="20" y1="36" x2="195" y2="36" stroke="#cbd5e1" />
        <text x="75" y="28" textAnchor="middle" className="text-[9px] fill-slate-800">1</text>
        <text x="75" y="52" textAnchor="middle" className="text-[9px] fill-slate-800">1</text>
        <line x1="100" y1="12" x2="100" y2="68" stroke="#cbd5e1" />
        <text x="125" y="28" textAnchor="middle" className="text-[9px] fill-slate-800">2</text>
        <text x="125" y="52" textAnchor="middle" className="text-[9px] fill-slate-800">3</text>
        <line x1="150" y1="12" x2="150" y2="68" stroke="#cbd5e1" />
        <text x="175" y="28" textAnchor="middle" className="text-[9px] font-bold fill-cyan-700">4</text>
        <text x="175" y="52" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">?</text>
      </svg>
    )
  },
  {
    id: 'gr-q12',
    level: 2,
    question: 'Egy gépkocsi egyenletes sebességgel halad. Az út–idő grafikonról leolvasva a 2. órában 140 km-t tett meg. Hány óra alatt tesz meg 280 km-t?',
    options: ['4 óra', '3 óra', '5 óra', '3,5 óra'],
    correctAnswer: 0,
    explanation: 'A sebesség egyenletes: v = 140 km / 2 h = 70 km/h. A 280 km megtételéhez t = 280 / 70 = 4 óra szükséges.'
  },
  {
    id: 'gr-q13',
    level: 2,
    question: 'A mellékelt szakaszos grafikonon mikor állandó (konstans) a folyamat értéke?',
    options: [
      'x = 2 és x = 5 között',
      'x = 0 és x = 2 között',
      'x = 5 és x = 8 között',
      'Sehol sem állandó'
    ],
    correctAnswer: 0,
    explanation: 'A grafikon az x = 2 és x = 5 közötti intervallumon vízszintes egyenes szakasz, ott az y értéke végig 4 marad.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="20" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="70" x2="30" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 30 60 L 65 30 L 125 30 L 165 10" stroke="#8b5cf6" strokeWidth="2.5" fill="none" />
        
        <text x="65" y="70" textAnchor="middle" className="text-[7.5px] fill-slate-500">2</text>
        <text x="125" y="70" textAnchor="middle" className="text-[7.5px] fill-slate-500">5</text>
        
      </svg>
    )
  },
  {
    id: 'gr-q14',
    level: 2,
    question: 'A képen látható V-alakú abszolútérték-grafikon hány zérushellyel rendelkezik, és melyek azok?',
    options: [
      '2 zérushelye van: x = -2 és x = 2',
      '1 zérushelye van: x = 0',
      'Nincs zérushelye',
      '3 zérushelye van: x = -2, 0, 2'
    ],
    correctAnswer: 0,
    explanation: 'A grafikon két pontban metszi az x-tengelyt: a (-2; 0) és a (2; 0) koordinátáknál, tehát 2 zérushelye van: x = -2 és x = 2.',
    figure: (
      <svg viewBox="0 0 200 80" className="w-44 h-18 mx-auto">
        <line x1="20" y1="45" x2="180" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="100" y1="75" x2="100" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 40 15 L 100 65 L 160 15" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
        <circle cx="65" cy="45" r="3.5" fill="#ef4444" />
        <circle cx="135" cy="45" r="3.5" fill="#ef4444" />
        
        
      </svg>
    )
  },
  {
    id: 'gr-q15',
    level: 2,
    question: 'Két kerékpáros (A és B) egyenes vonalú út–idő grafikonját látjuk. Melyikük haladt nagyobb sebességgel?',
    options: [
      'Az A kerékpáros, mert az ő grafikonja meredekebb',
      'A B kerékpáros, mert laposabb a vonala',
      'Mindketten azonos sebességgel haladtak',
      'Nem dönthető el az ábra alapján'
    ],
    correctAnswer: 0,
    explanation: 'Az út–idő (s - t) grafikonon a meredekség fejezi ki a sebességet (v = s/t). A meredekebb egyenes egységnyi idő alatt nagyobb utat jelent, így az A kerékpáros volt a gyorsabb.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="25" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="70" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="60" x2="105" y2="15" stroke="#ef4444" strokeWidth="2.5" />
        <line x1="35" y1="60" x2="165" y2="30" stroke="#3b82f6" strokeWidth="2" />
        <text x="110" y="20" className="text-[9px] font-bold fill-rose-600">A</text>
        <text x="168" y="35" className="text-[9px] font-bold fill-blue-600">B</text>
      </svg>
    )
  },
  {
    id: 'gr-q16',
    level: 2,
    question: 'A napi hőmérsékleti grafikonon a csúcshőmérséklet (maximum) 18 °C volt, a leghidegebb érték (minimum) pedig -4 °C. Mennyi volt a napi hőingás (terjedelem)?',
    options: ['22 °C', '14 °C', '-22 °C', '18 °C'],
    correctAnswer: 0,
    explanation: 'A napi hőingás a legmagasabb és legalacsonyabb hőmérséklet különbsége: T_max - T_min = 18 - (-4) = 18 + 4 = 22 °C.'
  },
  {
    id: 'gr-q17',
    level: 2,
    question: 'Egy víztartályban kezdetben 80 liter víz volt. 40 perc alatt egyenletesen leengedték, amíg teljesen kiürült. Mennyi víz maradt benne a 15. percben?',
    options: ['50 liter', '40 liter', '30 liter', '60 liter'],
    correctAnswer: 0,
    explanation: 'A leengedési sebesség: 80 l / 40 perc = 2 liter/perc. A 15. percig kifolyt 15 · 2 = 30 liter. A maradék víz: 80 - 30 = 50 liter.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="25" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="68" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="15" x2="155" y2="60" stroke="#0284c7" strokeWidth="2.5" />
        <text x="25" y="18" textAnchor="end" className="text-[7.5px] font-bold fill-sky-700">80 l</text>
        <text x="155" y="70" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-600">40 p</text>
        <circle cx="80" cy="32" r="3" fill="#0369a1" />
        <text x="80" y="26" textAnchor="middle" className="text-[7.5px] fill-sky-800">15 p</text>
      </svg>
    )
  },
  {
    id: 'gr-q18',
    level: 2,
    question: 'A hőmérsékleti grafikon x = 2 órától x = 7 óráig a vízszintes tengely alatt halad. Hány órán keresztül volt fagypont alatti a hőmérséklet?',
    options: ['5 órán át', '7 órán át', '2 órán át', '4 órán át'],
    correctAnswer: 0,
    explanation: 'Az intervallum hossza: 7 - 2 = 5 óra. Ezalatt a hőmérséklet folyamatosan negatív volt (az x-tengely alatt fut a görbe).',
    figure: (
      <svg viewBox="0 0 200 70" className="w-44 h-16 mx-auto">
        <line x1="20" y1="35" x2="180" y2="35" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 30 20 L 60 35 Q 100 60 140 35 L 170 20" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <text x="60" y="30" textAnchor="middle" className="text-[7.5px] fill-slate-600">2 h</text>
        <text x="140" y="30" textAnchor="middle" className="text-[7.5px] fill-slate-600">7 h</text>
        
      </svg>
    )
  },
  {
    id: 'gr-q19',
    level: 2,
    question: 'Az f(x) = |x| - 3 függvény grafikonja alapján mennyi a függvényérték az x = 0 helyen?',
    options: ['-3', '0', '3', '-1'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve x = 0-t: f(0) = |0| - 3 = 0 - 3 = -3. Ez a függvény minimuma és egyben y-tengelymetszete.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="20" y1="35" x2="180" y2="35" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="100" y1="70" x2="100" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 50 10 L 100 60 L 150 10" stroke="#0891b2" strokeWidth="2" fill="none" />
        <circle cx="100" cy="60" r="3.5" fill="#0891b2" />
        
      </svg>
    )
  },
  {
    id: 'gr-q20',
    level: 2,
    question: 'A koordináta-hálón jelölt P pont koordinátái: a függőleges tengelytől 3 egységnyire jobbra, a vízszintes tengelytől 4 egységnyire lefelé található. Mik a koordinátái?',
    options: ['P(3; -4)', 'P(-4; 3)', 'P(-3; 4)', 'P(3; 4)'],
    correctAnswer: 0,
    explanation: 'Jobbra 3 egység azt jelenti, hogy x = 3. Lefelé 4 egység azt jelenti, hogy y = -4. A rendezett számpár: P(3; -4).',
    figure: (
      <svg viewBox="0 0 200 70" className="w-44 h-16 mx-auto">
        <line x1="20" y1="30" x2="180" y2="30" stroke="#94a3b8" strokeWidth="1" />
        <line x1="60" y1="65" x2="60" y2="10" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="120" cy="55" r="3.5" fill="#f43f5e" />
        <text x="120" y="68" textAnchor="middle" className="text-[9px] font-bold fill-rose-600">P</text>
      </svg>
    )
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ / HALADÓ (21-30) -----
  // ==========================================
  {
    id: 'gr-q21',
    level: 3,
    question: 'Egy gyalogtúra során a kiránduló 2 óra alatt 8 km-t tett meg, majd 1 órát pihent, végül 1 óra alatt újabb 4 km-t gyalogolt. Mennyi volt az átlagsebessége a teljes 4 órás túrára?',
    options: ['3 km/h', '4 km/h', '2,5 km/h', '3,5 km/h'],
    correctAnswer: 0,
    explanation: 'A teljes megtett út: s_összes = 8 km + 0 km + 4 km = 12 km. A teljes eltelt idő (a pihenővel együtt): t_összes = 2 h + 1 h + 1 h = 4 h. Az átlagsebesség: v_átlag = 12 km / 4 h = 3 km/h.',
    figure: (
      <svg viewBox="0 0 200 80" className="w-44 h-18 mx-auto">
        <line x1="25" y1="65" x2="180" y2="65" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="72" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 35 65 L 85 35 L 115 35 L 155 15" stroke="#16a34a" strokeWidth="2.5" fill="none" />
        
      </svg>
    )
  },
  {
    id: 'gr-q22',
    level: 3,
    question: 'Az út–idő grafikon 3. órájától az 5. órájáig az autó által megtett út 120 km-ről 260 km-re nőtt. Mennyi volt az autó sebessége ezen a 2 órás szakaszon?',
    options: ['70 km/h', '60 km/h', '140 km/h', '80 km/h'],
    correctAnswer: 0,
    explanation: 'A megtett út a szakaszon: Δs = 260 - 120 = 140 km. Az eltelt idő: Δt = 5 - 3 = 2 h. A sebesség: v = 140 km / 2 h = 70 km/h.'
  },
  {
    id: 'gr-q23',
    level: 3,
    question: 'Mit jelent az út–idő koordináta-rendszerben az a pont, ahol két különböző mozgó jármű grafikonja metszi egymást?',
    options: [
      'A két jármű ugyanabban az időpontban ugyanazon a helyen tartózkodott (találkoztak vagy utolérték egymást)',
      'A két járműnek megegyezik a sebessége',
      'Mindkét jármű megállt',
      'Az egyik jármű kifogyott az üzemanyagból'
    ],
    correctAnswer: 0,
    explanation: 'A metszéspontban mind az x (idő), mind az y (pozíció/út) koordinátájuk azonos, vagyis pontosan ugyanabban az időben ugyanott voltak: találkoztak.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="25" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="68" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="60" x2="160" y2="15" stroke="#3b82f6" strokeWidth="2" />
        <line x1="35" y1="20" x2="160" y2="55" stroke="#ef4444" strokeWidth="2" />
        <circle cx="100" cy="37" r="4" fill="#d97706" />
        
      </svg>
    )
  },
  {
    id: 'gr-q24',
    level: 3,
    question: 'A rajzon látható f(x) függvény melyik intervallumon szigorúan növekvő ÉS vesz fel kizárólag pozitív értékeket (y > 0)?',
    options: [
      ']2; 5[ intervallumon',
      ']0; 2[ intervallumon',
      ']5; 8[ intervallumon',
      ']-3; 0[ intervallumon'
    ],
    correctAnswer: 0,
    explanation: 'Az ábrán a grafikon x = 2-nél metszi az x-tengelyt (zérushely), majd onnan x = 5-ig folyamatosan emelkedik a tengely felett, tehát növekvő és pozitív.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="20" y1="45" x2="180" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <line x1="40" y1="65" x2="40" y2="10" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 40 60 L 80 45 L 130 15 L 170 30" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
        <circle cx="80" cy="45" r="3" fill="#0891b2" />
        
        
        
      </svg>
    )
  },
  {
    id: 'gr-q25',
    level: 3,
    question: 'A grafikon alapján mely x értékek esetén lesz f(x) = 4?',
    options: [
      'x = 1 és x = 5',
      'Csak x = 3 esetén',
      'x = 0 és x = 4',
      'Minden x esetén'
    ],
    correctAnswer: 0,
    explanation: 'Az y = 4 magasságban húzott vízszintes egyenes két pontban metszi a grafikont: x = 1 és x = 5 helyen.',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="20" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="30" y1="70" x2="30" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 40 50 Q 100 5 160 50" stroke="#6366f1" strokeWidth="2.5" fill="none" />
        <line x1="30" y1="30" x2="170" y2="30" stroke="#f43f5e" strokeDasharray="2,2" strokeWidth="1" />
        <circle cx="68" cy="30" r="3" fill="#f43f5e" />
        <circle cx="132" cy="30" r="3" fill="#f43f5e" />
        <text x="22" y="32" className="text-[7.5px] font-bold fill-rose-600">4</text>
        <text x="68" y="70" textAnchor="middle" className="text-[7.5px] fill-slate-600">1</text>
        <text x="132" y="70" textAnchor="middle" className="text-[7.5px] fill-slate-600">5</text>
      </svg>
    )
  },
  {
    id: 'gr-q26',
    level: 3,
    question: 'Egy lakóház liftjének emelet–idő grafikonján hány alkalommal állt meg a lift emeleten (vízszintes szakaszok száma az 1. és a 10. perc között)?',
    options: ['3 alkalommal', '2 alkalommal', '4 alkalommal', '1 alkalommal'],
    correctAnswer: 0,
    explanation: 'Az emelet–idő grafikonon az emeleten való megállást a vízszintes szakaszok jelentik. Az ábrán 3 különálló vízszintes szakasz látható.',
    figure: (
      <svg viewBox="0 0 200 70" className="w-44 h-16 mx-auto">
        <line x1="20" y1="58" x2="180" y2="58" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 25 58 L 45 40 L 70 40 L 95 18 L 120 18 L 140 40 L 165 40 L 180 58" stroke="#0284c7" strokeWidth="2" fill="none" />
        <circle cx="57" cy="40" r="2.5" fill="#f59e0b" />
        <circle cx="107" cy="18" r="2.5" fill="#f59e0b" />
        <circle cx="152" cy="40" r="2.5" fill="#f59e0b" />
        
      </svg>
    )
  },
  {
    id: 'gr-q27',
    level: 3,
    question: 'A rajzon látható 4 szakasz közül melyik időintervallumban haladt a legnagyobb sebességgel a túrázó?',
    options: [
      'A 3. szakaszon (2 és 3 óra között: 6 km 1 óra alatt)',
      'Az 1. szakaszon (0 és 2 óra között: 4 km 2 óra alatt)',
      'A 2. szakaszon (vízszintes szakasz)',
      'A 4. szakaszon (3 és 5 óra között: 4 km 2 óra alatt)'
    ],
    correctAnswer: 0,
    explanation: 'A sebesség a meredekség: a 3. szakaszon v = 6 km / 1 h = 6 km/h, ami nagyobb mint az 1. szakasz (2 km/h) vagy a 4. szakasz (2 km/h).',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="25" y1="62" x2="180" y2="62" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="68" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 35 62 L 75 52 L 105 52 L 135 15 L 175 35" stroke="#059669" strokeWidth="2" fill="none" />
        
        
      </svg>
    )
  },
  {
    id: 'gr-q28',
    level: 3,
    question: 'A grafikonról leolvasva: f(-1) = 3, f(0) = 1, és f(2) = -3. Mennyi az f(-1) + f(0) - f(2) kifejezés értéke?',
    options: ['7', '1', '-1', '5'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve az értékeket: 3 + 1 - (-3) = 4 + 3 = 7.'
  },
  {
    id: 'gr-q29',
    level: 3,
    question: 'Egy alul széles, felül szűkülő vázát egyenletes vízhozammal töltenek. Milyen lesz a vízszint magasságának grafikonja az idő függvényében?',
    options: [
      'Kezdetben lassan emelkedik (laposabb), majd a szűkülő résznél egyre gyorsabban nő (meredekebb lesz)',
      'Végig egyenes vonalú marad',
      'Kezdetben meredek, majd lapossá válik',
      'Vízszintes egyenes lesz'
    ],
    correctAnswer: 0,
    explanation: 'A széles alsó részben azonos vízmennyiség kisebb magasságnövekedést okoz (laposabb szakasz), a szűkebb felső részben viszont sokkal gyorsabban emelkedik a vízszint (meredekebb görbe).',
    figure: (
      <svg viewBox="0 0 200 75" className="w-44 h-16 mx-auto">
        <line x1="25" y1="62" x2="180" y2="62" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="35" y1="70" x2="35" y2="10" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 35 62 Q 95 55 145 15" stroke="#0891b2" strokeWidth="2.5" fill="none" />
        
      </svg>
    )
  },
  {
    id: 'gr-q30',
    level: 3,
    question: 'Egy teherautó 3 óra alatt 180 km utat tett meg, 1 órát rakodott (állt), majd 2 óra alatt visszatért a kiindulási telephelyre (0 km-re). Mennyi volt a mozgásban töltött időre (rakodás nélkül) számított átlagsebessége?',
    options: ['72 km/h', '60 km/h', '50 km/h', '90 km/h'],
    correctAnswer: 0,
    explanation: 'A teljes megtett út oda-vissza: 180 km + 180 km = 360 km. A tiszta mozgásban töltött idő (rakodás nélkül): 3 h + 2 h = 5 h. Az átlagsebesség mozgás közben: 360 km / 5 h = 72 km/h.'
  }
];

const graphCheatSheets: CheatSheetContent[] = [
  {
    title: 'A tengelyek és a leolvasás aranyszabálya',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200">
          <strong>Vízszintes (x) tengely:</strong> Független változó (idő, darabszám, bemenet).<br />
          <strong>Függőleges (y) tengely:</strong> Függő változó (megtett út, sebesség, hőfok, liter).
        </div>
        <div className="space-y-1.5 pl-2">
          <div>• <strong>y keresése adott x-hez:</strong> x-ről függőlegesen a görbéig, majd vízszintesen az y-tengelyig.</div>
          <div>• <strong>x keresése adott y-hoz:</strong> y-ról vízszintesen a görbéig, majd lefelé az x-tengelyig.</div>
          <div>• <strong>Zérushely:</strong> Ahol a grafikon metszi az x-tengelyt (y = 0).</div>
        </div>
      </div>
    )
  },
  {
    title: 'Függvényjellemzők és alakzatok',
    content: (
      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <strong>Monoton nő:</strong> Balról jobbra emelkedik (nagyobb x-hez nagyobb y).
          </div>
          <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
            <strong>Monoton csökken:</strong> Balról jobbra süllyed (nagyobb x-hez kisebb y).
          </div>
        </div>
        <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <strong>Vízszintes szakasz:</strong> Állandó (konstans) érték (pl. álló jármű, pihenő).
        </div>
        <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
          <strong>Szélsőértékek:</strong> Legmagasabb pont (maximum), legalacsonyabb pont (minimum).
        </div>
      </div>
    )
  },
  {
    title: 'Fizikai folyamatok és átlagsebesség',
    content: (
      <div className="space-y-3 text-xs">
        <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 font-mono">
          v_átlag = s_összes / t_összes
        </div>
        <ul className="space-y-1 pl-2 list-disc text-slate-700 dark:text-slate-300">
          <li>Az út–idő grafikon meredeksége a sebességet adja meg (meredekebb = gyorsabb).</li>
          <li>Két grafikon metszéspontja: a mozgó testek találkozási pontja.</li>
          <li>A pihenőidőt az átlagsebesség kiszámításánál a teljes eltelt időhöz mindig hozzá kell adni!</li>
        </ul>
      </div>
    )
  }
];

export const GraphReadingQuiz: React.FC<GraphReadingQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory,
}) => {
  return (
    <QuizTemplate
      title="3. Olvassunk a grafikonról! Kvíz"
      subtitle="Gyakorold az adatok, szélsőértékek és fizikai folyamatok leolvasását koordináta-rendszerben!"
      topicId="g7-stats-graph"
      topicName="3. Olvassunk a grafikonról!"
      badgeText="7. OSZTÁLY • HOZZÁRENDELÉSEK • 🎯 KVÍZ"
      themeColor="cyan"
      questions={graphQuestions}
      cheatSheets={graphCheatSheets}
      pdfFilename="7_osztaly_olvassunk_a_grafikonrol_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<GraphReadingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GraphReadingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-cyan-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-cyan-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default GraphReadingQuiz;
