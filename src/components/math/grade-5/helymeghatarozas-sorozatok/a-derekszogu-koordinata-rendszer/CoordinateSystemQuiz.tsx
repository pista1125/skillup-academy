import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { CoordinateSystemMatcher } from './CoordinateSystemMatcher';
import { CoordinateSystemSorter } from './CoordinateSystemSorter';

export interface CoordinateSystemQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const COORDINATE_SYSTEM_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: A KOORDINÁTA-RENDSZER ALAPJAI, TENGELYEK ÉS ORIGÓ (1-10)
  // =========================================================================
  {
    id: 'csq1-1',
    level: 1,
    prompt: 'Mi a neve a derékszögű koordináta-rendszer két tengelyének metszéspontjának, és mik a koordinátái?',
    options: [
      'Origó, koordinátája: (0; 0)',
      'Centrum, koordinátája: (1; 1)',
      'Főpont, koordinátája: (0; 1)',
      'Csúcspont, koordinátája: (-1; -1)'
    ],
    correctAnswer: 0,
    explanation: 'A két tengely metszéspontja az origó (kezdőpont), jele O, és mindkét koordinátája nulla: (0; 0). Innen indul minden elmozdulás a síkon.',
    hint: 'A latin „origo” szó eredetet, kiindulópontot jelent, ahol a számlálás nulláról indul.',
    breakdown: [
      { label: 'Elnevezés', value: 'Origó (jele: O)' },
      { label: 'x koordináta', value: '0' },
      { label: 'y koordináta', value: '0' },
      { label: 'Számpár', value: '(0; 0)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-50 -50 100 100">
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#2563eb" strokeWidth="2" />
        <polygon points="45,0 38,-3 38,3" fill="#2563eb" />
        <text x="40" y="-5" className="text-[10px] font-bold fill-blue-600">x</text>
        <line x1="0" y1="45" x2="0" y2="-45" stroke="#059669" strokeWidth="2" />
        <polygon points="0,-45 -3,-38 3,-38" fill="#059669" />
        <text x="5" y="-38" className="text-[10px] font-bold fill-emerald-600">y</text>
        <circle cx="0" cy="0" r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        <text x="6" y="14" className="text-[10px] font-black fill-amber-600">O(0; 0)</text>
      </svg>
    )
  },
  {
    id: 'csq1-2',
    level: 1,
    prompt: 'Melyik a derékszögű koordináta-rendszer vízszintes tengelyének szokásos jelölése és szakszerű elnevezése?',
    options: [
      'x-tengely (más néven abszcissza-tengely)',
      'y-tengely (más néven ordináta-tengely)',
      'z-tengely (mélységi tengely)',
      '0-tengely (bázisvonal)'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes számegyenest x-tengelynek (abszcisszának) nevezzük. Jobbra találhatók a pozitív számok, balra pedig a negatív számok.',
    hint: 'Gondolj a betűrendben elfoglalt helyre: az x jön előbb, mint az y, és a vízszintes irány az első.',
    breakdown: [
      { label: 'Irány', value: 'Vízszintes (fekvő)' },
      { label: 'Jele', value: 'x-tengely' },
      { label: 'Szakszó', value: 'Abszcissza' }
    ]
  },
  {
    id: 'csq1-3',
    level: 1,
    prompt: 'Melyik a függőleges tengely és milyen irányba mutat a pozitív növekedést jelző nyíl?',
    options: [
      'y-tengely (ordináta), felfelé mutat a növekvő iránya',
      'x-tengely (abszcissza), lefelé mutat a növekvő iránya',
      'y-tengely, balra mutat a növekvő iránya',
      'Függőleges tengely, nincsen iránya'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges számegyenes az y-tengely (ordináta). A nyíl felfelé mutat, jelezve, hogy felfelé nőnek a pozitív számok, lefelé pedig a negatív számok találhatók.',
    hint: 'A hőmérőn is felfelé nőnek a melegebb (pozitív) fokok!',
    breakdown: [
      { label: 'Irány', value: 'Függőleges (álló)' },
      { label: 'Jele', value: 'y-tengely' },
      { label: 'Szakszó', value: 'Ordináta' },
      { label: 'Pozitív irány', value: 'Felfelé (▲)' }
    ]
  },
  {
    id: 'csq1-4',
    level: 1,
    prompt: 'Egy P(x; y) rendezett számpár esetén melyik adatot határozzuk meg és olvassuk le először?',
    options: [
      'Mindig az x koordinátát (a vízszintes tengelyen)',
      'Mindig az y koordinátát (a függőleges tengelyen)',
      'Tetszőleges, a sorrend felcserélhető',
      'A nagyobb számot írjuk mindig előre'
    ],
    correctAnswer: 0,
    explanation: 'A számpár azért „rendezett”, mert a sorrend kötött: az ELSŐ szám mindig a vízszintes (x) koordináta, a MÁSODIK szám mindig a függőleges (y) koordináta.',
    hint: 'Először vízszintesen lépkedünk a padlón, utána szállunk be a liftbe függőlegesen!',
    breakdown: [
      { label: '1. koordináta', value: 'x (vízszintes elmozdulás)' },
      { label: '2. koordináta', value: 'y (függőleges elmozdulás)' },
      { label: 'Alak', value: 'P(x; y)' }
    ]
  },
  {
    id: 'csq1-5',
    level: 1,
    prompt: 'Mi a koordinátája a képen látható, origóból indulva 3 lépéssel jobbra és 2 lépéssel felfelé található P pontnak?',
    options: [
      'P(3; 2)',
      'P(2; 3)',
      'P(-3; 2)',
      'P(3; -2)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra 3 egység azt jelenti, hogy x = +3; felfelé 2 egység azt jelenti, hogy y = +2. Így a pont koordinátája: P(3; 2).',
    hint: 'Először a vízszintes tengelyre vetíts: az x = 3; majd a függőlegesre: az y = 2.',
    breakdown: [
      { label: 'Vízszintes (x)', value: '+3 (jobbra)' },
      { label: 'Függőleges (y)', value: '+2 (felfelé)' },
      { label: 'Pont', value: 'P(3; 2)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-20 -50 80 70">
        <line x1="-15" y1="0" x2="55" y2="0" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="0" y1="15" x2="0" y2="-45" stroke="#059669" strokeWidth="1.5" />
        {/* Rácsvonalak */}
        <line x1="36" y1="0" x2="36" y2="-24" stroke="#9333ea" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="0" y1="-24" x2="36" y2="-24" stroke="#9333ea" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="36" cy="-24" r="3.5" fill="#9333ea" />
        <text x="36" y="10" textAnchor="middle" className="text-[8px] font-bold fill-blue-600">3</text>
        <text x="-8" y="-21" textAnchor="end" className="text-[8px] font-bold fill-emerald-600">2</text>
        <text x="40" y="-27" className="text-[9px] font-black fill-purple-700">P(3; 2)</text>
      </svg>
    )
  },
  {
    id: 'csq1-6',
    level: 1,
    prompt: 'Melyik pont helyezkedik el a vízszintes x-tengelyen?',
    options: [
      '(5; 0)',
      '(0; 5)',
      '(5; 5)',
      '(-5; 5)'
    ],
    correctAnswer: 0,
    explanation: 'Az x-tengelyen fekvő pontok függőleges irányban nem mozdultak el, ezért a második koordinátájuk (y) mindig nulla: (x; 0). Így az (5; 0) az x-tengelyen van.',
    hint: 'Ha egy pont a vízszintes tengelyen ül, sem fel, sem le nem lépett, tehát y = 0.',
    breakdown: [
      { label: 'x-tengely szabálya', value: 'y = 0 mindig' },
      { label: 'Helyes alak', value: '(x; 0) &rarr; (5; 0)' }
    ]
  },
  {
    id: 'csq1-7',
    level: 1,
    prompt: 'Melyik pont helyezkedik el a függőleges y-tengelyen?',
    options: [
      '(0; 4)',
      '(4; 0)',
      '(4; 4)',
      '(-4; 4)'
    ],
    correctAnswer: 0,
    explanation: 'Az y-tengelyen fekvő pontok vízszintes irányban sem jobbra, sem balra nem tértek el az origótól, ezért az első koordinátájuk (x) mindig nulla: (0; y). Így a (0; 4) az y-tengelyen van.',
    hint: 'A függőleges tengelyen fekvő pont első száma mindig 0: (0; y).',
    breakdown: [
      { label: 'y-tengely szabálya', value: 'x = 0 mindig' },
      { label: 'Helyes alak', value: '(0; y) &rarr; (0; 4)' }
    ]
  },
  {
    id: 'csq1-8',
    level: 1,
    prompt: 'Hány síknegyedre (kvadránsra) osztja a síkot a két egymásra merőleges tengely?',
    options: [
      '4 síknegyedre (I., II., III., IV.)',
      '2 félsíkra (alsó és felső)',
      '8 nyolcadra',
      '6 síkrészre'
    ],
    correctAnswer: 0,
    explanation: 'A két egymásra merőleges számegyenes a síkot pontosan négy negyedre (kvadránsra) osztja, amelyeket római számokkal (I., II., III., IV.) jelölünk.',
    hint: 'Gondolj a derékszögű keresztre: a két vonal négy sarkot hoz létre!',
    breakdown: [
      { label: 'Felosztás', value: '4 negyed (kvadráns)' },
      { label: 'Jelölés', value: 'Római számok: I., II., III., IV.' }
    ]
  },
  {
    id: 'csq1-9',
    level: 1,
    prompt: 'Milyen előjelűek az I. síknegyedben (jobbra fent) található pontok koordinátái?',
    options: [
      'Mindkét koordináta pozitív (+ ; +)',
      'Az első negatív, a második pozitív (- ; +)',
      'Mindkét koordináta negatív (- ; -)',
      'Az első pozitív, a második negatív (+ ; -)'
    ],
    correctAnswer: 0,
    explanation: 'Az I. síknegyed az origótól jobbra (x > 0) és felfelé (y > 0) helyezkedik el, ezért itt mind az x, mind az y koordináta pozitív (+ ; +).',
    hint: 'Jobbra = pozitív, felfelé = pozitív!',
    breakdown: [
      { label: 'x előjele', value: '+ (pozitív, mert jobbra van)' },
      { label: 'y előjele', value: '+ (pozitív, mert fent van)' },
      { label: 'I. negyed', value: '(+ ; +)' }
    ]
  },
  {
    id: 'csq1-10',
    level: 1,
    prompt: 'Melyik pontba érkezünk, ha az origóból kiindulva 4 egységet lépünk jobbra, majd 3 egységet lefelé?',
    options: [
      '(4; -3)',
      '(-4; 3)',
      '(3; -4)',
      '(-3; 4)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra 4 egység: x = +4. Lefelé 3 egység: y = -3 (mivel a lefelé haladás negatív előjelű). A pont koordinátája tehát: (4; -3).',
    hint: 'Jobbra = pozitív x, lefelé = negatív y.',
    breakdown: [
      { label: 'Jobbra 4', value: 'x = +4' },
      { label: 'Lefelé 3', value: 'y = -3' },
      { label: 'Eredmény', value: '(4; -3)' }
    ]
  },

  // =========================================================================
  // 2. SZINT: SÍKNEGYEDEK ÉS ELŐJELEK MÉLYEBB MEGÉRTÉSE (11-20)
  // =========================================================================
  {
    id: 'csq2-1',
    level: 2,
    prompt: 'Melyik síknegyedben helyezkedik el a Q(-3; 5) pont?',
    options: [
      'II. síknegyed (balra fent)',
      'I. síknegyed (jobbra fent)',
      'III. síknegyed (balra lent)',
      'IV. síknegyed (jobbra lent)'
    ],
    correctAnswer: 0,
    explanation: 'A pont első koordinátája negatív (-3 &rarr; balra), második koordinátája pozitív (+5 &rarr; felfelé). A balra-fenti terület a II. síknegyed.',
    hint: 'x < 0 (balra) és y > 0 (fent) = II. negyed.',
    breakdown: [
      { label: 'x = -3', value: 'Negatív (balra)' },
      { label: 'y = 5', value: 'Pozitív (felfelé)' },
      { label: 'Síknegyed', value: 'II. síknegyed' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-40 -40 80 80">
        <line x1="-35" y1="0" x2="35" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="0" y1="35" x2="0" y2="-35" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="-35" y="-35" width="35" height="35" fill="#f3e8ff" opacity="0.6" />
        <circle cx="-18" cy="-28" r="3.5" fill="#7e22ce" />
        <text x="-18" y="-31" textAnchor="middle" className="text-[7px] font-bold fill-purple-900">Q(-3; 5)</text>
        <text x="18" y="-18" textAnchor="middle" className="text-[10px] font-bold fill-slate-300">I.</text>
        <text x="-18" y="-10" textAnchor="middle" className="text-[10px] font-bold fill-purple-600">II.</text>
        <text x="-18" y="20" textAnchor="middle" className="text-[10px] font-bold fill-slate-300">III.</text>
        <text x="18" y="20" textAnchor="middle" className="text-[10px] font-bold fill-slate-300">IV.</text>
      </svg>
    )
  },
  {
    id: 'csq2-2',
    level: 2,
    prompt: 'Melyik síknegyedben van az a pont, amelynek mindkét koordinátája negatív, például R(-4; -2)?',
    options: [
      'III. síknegyed (balra lent)',
      'II. síknegyed (balra fent)',
      'IV. síknegyed (jobbra lent)',
      'I. síknegyed (jobbra fent)'
    ],
    correctAnswer: 0,
    explanation: 'A balra lévő (x < 0) és egyben lefelé lévő (y < 0) tartomány a III. síknegyed. Itt minden pont mindkét koordinátája negatív (- ; -).',
    hint: 'Balra lent = (- ; -) = III. negyed.',
    breakdown: [
      { label: 'x = -4', value: 'Negatív (balra)' },
      { label: 'y = -2', value: 'Negatív (lefelé)' },
      { label: 'Síknegyed', value: 'III. síknegyed' }
    ]
  },
  {
    id: 'csq2-3',
    level: 2,
    prompt: 'Melyik síknegyedbe esik az S(5; -3) pont?',
    options: [
      'IV. síknegyed (jobbra lent)',
      'I. síknegyed (jobbra fent)',
      'II. síknegyed (balra fent)',
      'III. síknegyed (balra lent)'
    ],
    correctAnswer: 0,
    explanation: 'Az x = 5 pozitív (jobbra van), az y = -3 negatív (lent van). A jobbra-lenti negyed a IV. síknegyed (+ ; -).',
    hint: 'x > 0 (jobbra) és y < 0 (lefelé) = IV. negyed.',
    breakdown: [
      { label: 'x = 5', value: 'Pozitív (jobbra)' },
      { label: 'y = -3', value: 'Negatív (lefelé)' },
      { label: 'Síknegyed', value: 'IV. síknegyed' }
    ]
  },
  {
    id: 'csq2-4',
    level: 2,
    prompt: 'Melyik kijelentés IGAZ a koordinátatengelyeken (vagy az origóban) fekvő pontokra?',
    options: [
      'Nem tartoznak egyik síknegyedbe sem, mert maguk a tengelyek alkotják a negyedek határát',
      'Mindig az I. síknegyedbe tartoznak',
      'Attól függ, melyik koordinátájuk a nagyobb',
      'Egyszerre két szomszédos síknegyedbe is beletartoznak'
    ],
    correctAnswer: 0,
    explanation: 'A tengelyeken fekvő pontok (ahol x = 0 vagy y = 0) a síknegyedek közötti határvonalakon vannak, így egyik síknegyedhez sem tartoznak!',
    hint: 'A határvonal, akárcsak az országhatár kerítése, nem része a szomszédos területeknek.',
    breakdown: [
      { label: 'Tengelypontok', value: '(x; 0) vagy (0; y)' },
      { label: 'Hovatartozás', value: 'Egyik síknegyedbe sem tartoznak!' }
    ]
  },
  {
    id: 'csq2-5',
    level: 2,
    prompt: 'Milyen körüljárási irányban számozzuk a síknegyedeket (I., II., III., IV.) a jobb felső negyedtől indulva?',
    options: [
      'Az óramutató járásával ellentétes irányban',
      'Az óramutató járásával megegyező irányban',
      'Sorfolytonosan: balról jobbra, majd fentről le',
      'Cikcakkos átlós sorrendben'
    ],
    correctAnswer: 0,
    explanation: 'A síknegyedeket a jobb felső I. negyedtől indítva az óramutató járásával ELLENTÉTES (pozitív forgási) irányban számozzuk: I. (jobbra fent) &rarr; II. (balra fent) &rarr; III. (balra lent) &rarr; IV. (jobbra lent).',
    hint: 'A matematikában a pozitív forgásirány az óramutató járásával ellentétes irány.',
    breakdown: [
      { label: 'Kiindulás', value: 'I. negyed (jobbra fent)' },
      { label: 'Irány', value: 'Óramutatóval ellentétes (↺)' }
    ]
  },
  {
    id: 'csq2-6',
    level: 2,
    prompt: 'Ha egy pont az x-tengely negatív felén fekszik, pontosan 6 egységre az origótól, mi a koordinátája?',
    options: [
      '(-6; 0)',
      '(0; -6)',
      '(-6; -6)',
      '(6; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az x-tengelyen fekszik balra 6 egységre, x = -6. Mivel a tengelyen van, y = 0. A koordinátája: (-6; 0).',
    hint: 'x-tengely pontja &rarr; y = 0. Negatív fél &rarr; x = -6.',
    breakdown: [
      { label: 'Vízszintes (x)', value: '-6' },
      { label: 'Függőleges (y)', value: '0 (mert a tengelyen van)' },
      { label: 'Pont', value: '(-6; 0)' }
    ]
  },
  {
    id: 'csq2-7',
    level: 2,
    prompt: 'Melyik állítás IGAZ a B(0; -4) pontra?',
    options: [
      'A negatív y-tengelyen fekszik, az origótól 4 egységre lefelé',
      'A negatív x-tengelyen fekszik, az origótól 4 egységre balra',
      'A III. síknegyed belsejében fekszik',
      'A IV. síknegyed belsejében fekszik'
    ],
    correctAnswer: 0,
    explanation: 'Az első koordinátája x = 0, így sem jobbra, sem balra nem tér el: a függőleges y-tengelyen fekszik. A második koordinátája -4, azaz lefelé 4 egységre van az origótól.',
    hint: 'Első szám 0 &rarr; y-tengely. Második szám negatív &rarr; lefelé.',
    breakdown: [
      { label: 'x = 0', value: 'y-tengelyen fekszik' },
      { label: 'y = -4', value: 'Origó alatt 4 egységgel' }
    ]
  },
  {
    id: 'csq2-8',
    level: 2,
    prompt: 'Az alábbi pontok közül melyik fekszik a II. síknegyedben (balra fent)?',
    options: [
      'A(-5; 2)',
      'B(3; 4)',
      'C(-2; -3)',
      'D(4; -1)'
    ],
    correctAnswer: 0,
    explanation: 'A II. síknegyedben az x negatív, az y pedig pozitív (- ; +). Az A(-5; 2) pontban x = -5 < 0 és y = 2 > 0, tehát ez a II. negyedbe tartozik.',
    hint: 'Keresd a (- ; +) előjelpárt!',
    breakdown: [
      { label: 'A(-5; 2)', value: '(- ; +) &rarr; II. negyed' },
      { label: 'B(3; 4)', value: '(+ ; +) &rarr; I. negyed' },
      { label: 'C(-2; -3)', value: '(- ; -) &rarr; III. negyed' },
      { label: 'D(4; -1)', value: '(+ ; -) &rarr; IV. negyed' }
    ]
  },
  {
    id: 'csq2-9',
    level: 2,
    prompt: 'Ha egy pont koordinátái P(a; b), és tudjuk, hogy a > 0 (pozitív), de b < 0 (negatív), melyik síknegyedben található?',
    options: [
      'IV. síknegyedben',
      'I. síknegyedben',
      'II. síknegyedben',
      'III. síknegyedben'
    ],
    correctAnswer: 0,
    explanation: 'Ha az első koordináta pozitív (a > 0 &rarr; jobbra) és a második koordináta negatív (b < 0 &rarr; lefelé), akkor a pont a IV. síknegyedben található.',
    hint: 'Jobbra és le = jobb alsó kvadráns = IV. negyed.',
    breakdown: [
      { label: 'a > 0', value: 'Jobbra' },
      { label: 'b < 0', value: 'Lefelé' },
      { label: 'Negyed', value: 'IV. síknegyed' }
    ]
  },
  {
    id: 'csq2-10',
    level: 2,
    prompt: 'Melyik pont fekszik a LEG-KÖZELEBB az origóhoz (0; 0) az alábbiak közül?',
    options: [
      'A(1; 1)',
      'B(3; 0)',
      'C(0; -4)',
      'D(-3; -3)'
    ],
    correctAnswer: 0,
    explanation: 'Az A(1; 1) pont távolsága az origótól alig kb. 1,41 egység. A B(3; 0) 3 egységre van, a C(0; -4) 4 egységre, a D(-3; -3) pedig több mint 4,2 egységre. Az A(1; 1) van legközelebb.',
    hint: 'Nézd meg a koordináták nagyságát: az 1 és 1 a legkisebb elmozdulás a nullához képest!',
    breakdown: [
      { label: 'A(1; 1)', value: 'Távolság négyzete: 1² + 1² = 2 (legközelebb)' },
      { label: 'B(3; 0)', value: 'Távolság: 3 egység' },
      { label: 'C(0; -4)', value: 'Távolság: 4 egység' }
    ]
  },

  // =========================================================================
  // 3. SZINT: TÜKRÖZÉSEK, TENGELYTÁVOLSÁGOK ÉS GEOMETRIAI KAPCSOLATOK (21-30)
  // =========================================================================
  {
    id: 'csq3-1',
    level: 3,
    prompt: 'Mi lesz a P(4; 3) pont koordinátája, ha tükrözzük a vízszintes x-tengelyre?',
    options: [
      'P\'(4; -3)',
      'P\'(-4; 3)',
      'P\'(-4; -3)',
      'P\'(3; 4)'
    ],
    correctAnswer: 0,
    explanation: 'Az x-tengelyre való tükrözésnél a vízszintes helyzet változatlan marad (x = 4), a pont felülről alulra kerül át, így a második koordináta előjele vált az ellentettjére: (4; -3).',
    hint: 'x-tengelyes tükrözésnél az x változatlan marad, az y előjelet vált: (x; y) &rarr; (x; -y).',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(4; 3)' },
      { label: 'Szabály x-re tükrözve', value: '(x; -y)' },
      { label: 'Tükörkép', value: 'P\'(4; -3)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-10 -35 55 70">
        <line x1="-5" y1="0" x2="45" y2="0" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="0" y2="-30" stroke="#059669" strokeWidth="1.5" />
        <circle cx="32" cy="-20" r="3" fill="#9333ea" />
        <text x="35" y="-22" className="text-[7px] font-bold fill-purple-700">P(4; 3)</text>
        <line x1="32" y1="-20" x2="32" y2="20" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="32" cy="20" r="3" fill="#d97706" />
        <text x="35" y="24" className="text-[7px] font-bold fill-amber-700">P'(4; -3)</text>
      </svg>
    )
  },
  {
    id: 'csq3-2',
    level: 3,
    prompt: 'Mi lesz a P(4; 3) pont koordinátája, ha a függőleges y-tengelyre tükrözzük?',
    options: [
      'P\'(-4; 3)',
      'P\'(4; -3)',
      'P\'(-4; -3)',
      'P\'(3; -4)'
    ],
    correctAnswer: 0,
    explanation: 'Az y-tengelyre tükrözve a magasság (y = 3) változatlan marad, de a pont jobb oldalról átkerül a bal oldalra, így az x koordináta vált előjelet: (-4; 3).',
    hint: 'y-tengelyes tükrözésnél az y marad, az x vált előjelet: (x; y) &rarr; (-x; y).',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(4; 3)' },
      { label: 'Szabály y-ra tükrözve', value: '(-x; y)' },
      { label: 'Tükörkép', value: 'P\'(-4; 3)' }
    ]
  },
  {
    id: 'csq3-3',
    level: 3,
    prompt: 'Mi lesz a P(4; 3) pont koordinátája, ha az origóra mint középpontra tükrözzük?',
    options: [
      'P\'(-4; -3)',
      'P\'(4; -3)',
      'P\'(-4; 3)',
      'P\'(0; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Az origóra való középpontos tükrözésnél a pont átkerül a szemközti (átlós) síknegyedbe, és MINDKÉT koordináta az ellentettjére változik: P\'(-4; -3).',
    hint: 'Origóra tükrözéskor mindkét előjel megfordul: (x; y) &rarr; (-x; -y).',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(4; 3) [I. negyed]' },
      { label: 'Szabály origóra', value: '(-x; -y)' },
      { label: 'Tükörkép', value: 'P\'(-4; -3) [III. negyed]' }
    ]
  },
  {
    id: 'csq3-4',
    level: 3,
    prompt: 'Milyen távolságra van a K(-5; 4) pont a vízszintes x-tengelytől?',
    options: [
      '4 egység távolságra',
      '5 egység távolságra',
      '-5 egység távolságra',
      '9 egység távolságra'
    ],
    correctAnswer: 0,
    explanation: 'Egy pont vízszintes x-tengelytől mért távolságát a pont második koordinátájának abszolútértéke adja meg: |y| = |4| = 4 egység (felfelé áll 4 egységgel a tengely felett).',
    hint: 'Az x-tengelytől való távolság a függőleges magasság: |y|.',
    breakdown: [
      { label: 'Pont', value: 'K(-5; 4)' },
      { label: 'Függőleges eltérés (y)', value: '4' },
      { label: 'Távolság x-tengelytől', value: '|4| = 4 egység' }
    ]
  },
  {
    id: 'csq3-5',
    level: 3,
    prompt: 'Milyen távolságra van az L(-6; -2) pont a függőleges y-tengelytől?',
    options: [
      '6 egység távolságra',
      '2 egység távolságra',
      '-6 egység távolságra',
      '8 egység távolságra'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges y-tengelytől mért távolság a pont vízszintes eltérésének nagysága, azaz az első koordináta abszolútértéke: |x| = |-6| = 6 egység. A távolság mindig nemnegatív!',
    hint: 'Az y-tengelytől való távolság a vízszintes elmozdulás abszolútértéke: |-6|.',
    breakdown: [
      { label: 'Pont', value: 'L(-6; -2)' },
      { label: 'Vízszintes eltérés (x)', value: '-6' },
      { label: 'Távolság y-tengelytől', value: '|-6| = 6 egység' }
    ]
  },
  {
    id: 'csq3-6',
    level: 3,
    prompt: 'Milyen alakzatot kapunk, ha a koordináta-rendszerben rendre összekötjük az A(1; 1), B(5; 1), C(5; 4) és D(1; 4) pontokat?',
    options: [
      'Téglalapot (4 egység széles, 3 egység magas)',
      'Négyzetet (4 egység oldalhosszúságú)',
      'Rombuszt',
      'Trapézt'
    ],
    correctAnswer: 0,
    explanation: 'Az AB oldal hossza 5 - 1 = 4 egység (vízszintes). A BC oldal hossza 4 - 1 = 3 egység (függőleges). A szemközti oldalak egyenlőek és merőlegesek egymásra: ez egy 4×3-as téglalap.',
    hint: 'Számold ki az oldalak hosszát: vízszintesen 5 - 1 = 4, függőlegesen 4 - 1 = 3!',
    breakdown: [
      { label: 'Szélesség (AB)', value: '5 - 1 = 4 egység' },
      { label: 'Magasság (BC)', value: '4 - 1 = 3 egység' },
      { label: 'Alakzat', value: 'Téglalap' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-5 -40 55 50">
        <line x1="-3" y1="0" x2="48" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <line x1="0" y1="5" x2="0" y2="-38" stroke="#94a3b8" strokeWidth="1" />
        <rect x="8" y="-32" width="32" height="24" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="8" cy="-8" r="2.5" fill="#7c3aed" />
        <circle cx="40" cy="-8" r="2.5" fill="#7c3aed" />
        <circle cx="40" cy="-32" r="2.5" fill="#7c3aed" />
        <circle cx="8" cy="-32" r="2.5" fill="#7c3aed" />
        <text x="5" y="-5" className="text-[6px] font-bold fill-purple-900">A(1;1)</text>
        <text x="35" y="-5" className="text-[6px] font-bold fill-purple-900">B(5;1)</text>
        <text x="35" y="-34" className="text-[6px] font-bold fill-purple-900">C(5;4)</text>
        <text x="5" y="-34" className="text-[6px] font-bold fill-purple-900">D(1;4)</text>
      </svg>
    )
  },
  {
    id: 'csq3-7',
    level: 3,
    prompt: 'Egy téglalap három csúcsának koordinátája: A(-2; 1), B(3; 1) és C(3; 5). Mik a negyedik csúcs (D) koordinátái?',
    options: [
      'D(-2; 5)',
      'D(-2; -5)',
      'D(2; 5)',
      'D(0; 5)'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap oldalai párhuzamosak a tengelyekkel. A D csúcs x koordinátája meg kell egyezzen az A csúcs x-ével (-2), az y koordinátája pedig a C csúcs y-jával (5). Így: D(-2; 5).',
    hint: 'A D pont az A felett van függőlegesen (x = -2), és a C-vel azonos magasságban (y = 5).',
    breakdown: [
      { label: 'x koordináta', value: 'Ugyanaz, mint A-nak: -2' },
      { label: 'y koordináta', value: 'Ugyanaz, mint C-nek: 5' },
      { label: 'D csúcs', value: 'D(-2; 5)' }
    ]
  },
  {
    id: 'csq3-8',
    level: 3,
    prompt: 'Melyik pont fekszik mindkét tengelytől pontosan EGYENLŐ távolságra az alábbiak közül?',
    options: [
      'P(-4; 4)',
      'Q(-4; 3)',
      'R(5; 2)',
      'S(-3; -5)'
    ],
    correctAnswer: 0,
    explanation: 'Egy pont akkor van egyenlő távolságra a tengelyektől, ha a két koordinátájának abszolútértéke megegyezik: |x| = |y|. A P(-4; 4) esetén |-4| = |4| = 4 egység mindkét tengelytől.',
    hint: 'Keresd azt a pontot, ahol a két szám előjel nélkül megegyezik: |-4| = |4|.',
    breakdown: [
      { label: 'P(-4; 4)', value: '|-4| = 4 és |4| = 4 &rarr; EGYENLŐ távolság' },
      { label: 'Q(-4; 3)', value: '|-4|=4 ≠ |3|=3' }
    ]
  },
  {
    id: 'csq3-9',
    level: 3,
    prompt: 'Mi a közös tulajdonsága az összes olyan pontnak, amely egy vízszintes egyenesen fekszik, például (1; 3), (4; 3), (-2; 3)?',
    options: [
      'A második koordinátájuk (y) azonos, mindegyiknél y = 3',
      'Az első koordinátájuk (x) azonos',
      'Mindegyik pont az x-tengelyen fekszik',
      'A koordinátáik összege mindig nulla'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes egyenes minden pontja ugyanolyan magasan van az x-tengely felett, ezért a függőleges helyzetük, azaz a második koordinátájuk (y) egyenlő: y = 3.',
    hint: 'Vízszintes vonalon a pontok magassága (y koordinátája) állandó.',
    breakdown: [
      { label: 'Vonal jellege', value: 'Vízszintes egyenes' },
      { label: 'Állandó érték', value: 'y = 3' },
      { label: 'Egyenes egyenlete', value: 'y = 3' }
    ]
  },
  {
    id: 'csq3-10',
    level: 3,
    prompt: 'Ha egy pont a II. síknegyedben van (- ; +), és tükrözzük a vízszintes x-tengelyre, melyik síknegyedbe kerül a tükörképe?',
    options: [
      'III. síknegyedbe (- ; -)',
      'I. síknegyedbe (+ ; +)',
      'IV. síknegyedbe (+ ; -)',
      'A vízszintes x-tengelyre kerül'
    ],
    correctAnswer: 0,
    explanation: 'A II. síknegyed pontjának koordinátái: (-x; y). Az x-tengelyre való tükrözéskor a vízszintes helyzet (negatív x) megmarad, de a pont a tengely alá vándorol, így az y is negatívvá válik: (-x; -y). Ez pontosan a III. síknegyed.',
    hint: 'Balra fentből &rarr; a vízszintes tengelyen átbillenve balra lent lesz!',
    breakdown: [
      { label: 'Kiindulás', value: 'II. negyed: (- ; +)' },
      { label: 'Tükrözés x-re', value: 'y ellentétesre vált: (- ; -)' },
      { label: 'Új negyed', value: 'III. síknegyed' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'Tengelyek és Origó Alapszabályai',
      badge: 'ALAPOK',
      description: 'Origó O(0; 0) – a két tengely metszéspontja. x-tengely: vízszintes, y-tengely: függőleges.',
      formula: 'P(x; y) \\quad \\text{1. szám: } x \\text{ (vízszintes)}, \\quad \\text{2. szám: } y \\text{ (függőleges)}',
      note: 'x-tengelyen fekvő pont: (x; 0). y-tengelyen fekvő pont: (0; y).'
    },
    {
      id: 'cs1-2',
      title: 'Elmozdulások az origóból',
      badge: 'IRÁNYOK',
      description: 'Jobbra: +x, Balra: -x, Felfelé: +y, Lefelé: -y.',
      note: 'Mindig a vízszintes elmozdulást határozzuk meg először, utána a függőlegest!'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'A Négy Síknegyed (Kvadráns)',
      badge: 'ELŐJELEK',
      description: 'I. negyed: (+ ; +) [jobbra fent], II. negyed: (- ; +) [balra fent], III. negyed: (- ; -) [balra lent], IV. negyed: (+ ; -) [jobbra lent].',
      formula: '\\text{Körüljárás: Óramutatóval ellentétes irányban (↺) I.-től IV.-ig}',
      note: 'A koordinátatengelyeken fekvő pontok NEM tartoznak egyik síknegyedbe sem!'
    },
    {
      id: 'cs2-2',
      title: 'Tengelyeken fekvő pontok azonosítása',
      badge: 'TENGELYEK',
      description: 'Ha a második szám 0 (pl. 5; 0): x-tengely pontja. Ha az első szám 0 (pl. 0; -3): y-tengely pontja.',
      note: 'Az origó (0; 0) mindkét tengely közös pontja.'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Tükrözések a Koordináta-rendszerben',
      badge: 'SZIMMETRIA',
      description: 'Tükrözés x-tengelyre: (x; y) → (x; -y). Tükrözés y-tengelyre: (x; y) → (-x; y). Tükrözés origóra: (x; y) → (-x; -y).',
      formula: 'P(x; y) \\xrightarrow{\\text{origóra}} P\'(-x; -y)',
      note: 'Origóra tükrözéskor mindkét koordináta az ellentettjére változik!'
    },
    {
      id: 'cs3-2',
      title: 'Távolságok a tengelyektől',
      badge: 'TÁVOLSÁGOK',
      description: 'Távolság az x-tengelytől: |y| (a második koordináta abszolútértéke). Távolság az y-tengelytől: |x| (az első koordináta abszolútértéke).',
      note: 'A távolság sohasem lehet negatív szám!'
    }
  ]
};

export const CoordinateSystemQuiz: React.FC<CoordinateSystemQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-coord-sys-quiz"
      title="A derékszögű koordináta-rendszer kvíz"
      subtitle="30 feladat 3 szinten: origó, tengelyek, síknegyedek és pontok tükrözése"
      questions={COORDINATE_SYSTEM_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-coordinate-system-quiz"
      storageKey="g5-loc-coord-sys-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={CoordinateSystemMatcher}
      sorterComponent={CoordinateSystemSorter}
    />
  );
};
