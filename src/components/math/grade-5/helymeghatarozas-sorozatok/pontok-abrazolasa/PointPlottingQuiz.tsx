import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { PointPlottingMatcher } from './PointPlottingMatcher';
import { PointPlottingSorter } from './PointPlottingSorter';

export interface PointPlottingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const POINT_PLOTTING_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: PONTOK FELVÉTELE ÉS LEOLVASÁSA (1-10)
  // =========================================================================
  {
    id: 'ppq1-1',
    level: 1,
    prompt: 'Honnan indulunk el mindig, amikor egy új pontot veszünk fel a koordináta-rendszerben a rendezett számpár alapján?',
    options: [
      'Az origóból: O(0; 0)',
      'Az x-tengely 1-es pontjából',
      'Az y-tengely 1-es pontjából',
      'Tetszőleges sarokpontból'
    ],
    correctAnswer: 0,
    explanation: 'Minden pont felvételét az origóból, vagyis a (0; 0) metszéspontból indítjuk. Innen számoljuk a vízszintes és függőleges lépéseket.',
    hint: 'A mérések nulla pontja a két tengely metszéspontja: az origó.',
    breakdown: [
      { label: 'Kiindulópont', value: 'Origó: O(0; 0)' },
      { label: 'Szerepe', value: 'Minden távolság mérésének kezdete' }
    ]
  },
  {
    id: 'ppq1-2',
    level: 1,
    prompt: 'Ha a P(5; 3) pontot szeretnénk felvenni, hány egységet és merre kell lépnünk az origóból vízszintesen az első lépésben?',
    options: [
      '5 egységet jobbra (az x-tengely mentén)',
      '5 egységet balra',
      '3 egységet jobbra',
      '3 egységet felfelé'
    ],
    correctAnswer: 0,
    explanation: 'A számpár első tagja az x koordináta, ami itt +5. Mivel pozitív, az origóból vízszintesen 5 egységet lépünk jobbra.',
    hint: 'Első szám = vízszintes irány. Pozitív szám = jobbra.',
    breakdown: [
      { label: 'Számpár', value: 'P(5; 3)' },
      { label: '1. koordináta (x)', value: '+5' },
      { label: 'Irány', value: 'Jobbra 5 egység' }
    ]
  },
  {
    id: 'ppq1-3',
    level: 1,
    prompt: 'Ha a Q(-4; 2) pontot szeretnénk felvenni, hány egységet és merre kell lépnünk az origóból vízszintesen az első lépésben?',
    options: [
      '4 egységet balra (negatív x irányban)',
      '4 egységet jobbra',
      '2 egységet balra',
      '2 egységet felfelé'
    ],
    correctAnswer: 0,
    explanation: 'Az első koordináta x = -4. A negatív előjel azt jelenti, hogy az origótól balra haladunk 4 egységet.',
    hint: 'Negatív x &rarr; balra lépünk.',
    breakdown: [
      { label: 'x koordináta', value: '-4' },
      { label: 'Irány', value: 'Balra 4 egység' }
    ]
  },
  {
    id: 'ppq1-4',
    level: 1,
    prompt: 'Mi a helyes koordinátája az ábrán látható A pontnak, amely az x-tengelyen a 2-nél, az y-tengelyen a 4-nél metszi a vetítővonalakat?',
    options: [
      'A(2; 4)',
      'A(4; 2)',
      'A(-2; 4)',
      'A(2; -4)'
    ],
    correctAnswer: 0,
    explanation: 'A vetítővonal a vízszintes tengelyt a 2-nél, a függőleges tengelyt a 4-nél metszi. Mivel a sorrend szigorúan (x; y), a pont koordinátája: A(2; 4).',
    hint: 'Először a vízszintes szám (2), utána a függőleges szám (4).',
    breakdown: [
      { label: 'Vízszintes (x)', value: '2' },
      { label: 'Függőleges (y)', value: '4' },
      { label: 'Pont', value: 'A(2; 4)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-10 -45 55 55">
        <line x1="-5" y1="0" x2="45" y2="0" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="0" y1="5" x2="0" y2="-40" stroke="#059669" strokeWidth="1.5" />
        <line x1="18" y1="0" x2="18" y2="-32" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="0" y1="-32" x2="18" y2="-32" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="18" cy="-32" r="3" fill="#7c3aed" />
        <text x="18" y="8" textAnchor="middle" className="text-[7px] font-bold fill-blue-600">2</text>
        <text x="-4" y="-30" textAnchor="end" className="text-[7px] font-bold fill-emerald-600">4</text>
        <text x="22" y="-34" className="text-[8px] font-black fill-violet-700">A(2; 4)</text>
      </svg>
    )
  },
  {
    id: 'ppq1-5',
    level: 1,
    prompt: 'Mi a koordinátája annak a pontnak, amelyet úgy kapunk, hogy az origóból 3 egységet lépünk balra, majd 4 egységet lefelé?',
    options: [
      '(-3; -4)',
      '(3; 4)',
      '(-4; -3)',
      '(3; -4)'
    ],
    correctAnswer: 0,
    explanation: 'Balra 3 egység: x = -3. Lefelé 4 egység: y = -4. Mindkét lépés negatív irányú, így a pont: (-3; -4), ami a III. síknegyedben van.',
    hint: 'Balra = negatív x (-3), lefelé = negatív y (-4).',
    breakdown: [
      { label: 'Vízszintes (balra 3)', value: 'x = -3' },
      { label: 'Függőleges (lefelé 4)', value: 'y = -4' },
      { label: 'Eredmény', value: '(-3; -4)' }
    ]
  },
  {
    id: 'ppq1-6',
    level: 1,
    prompt: 'Melyik pontot kapjuk, ha az origóból 6 egységet lépünk jobbra, de függőlegesen egyáltalán nem mozdulunk el?',
    options: [
      '(6; 0)',
      '(0; 6)',
      '(6; 6)',
      '(-6; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra 6 egység: x = +6. Mivel függőlegesen nem mozdultunk, y = 0. Ez a pont pontosan a vízszintes x-tengelyen fekszik: (6; 0).',
    hint: 'Ha nincs függőleges elmozdulás, a második szám nulla.',
    breakdown: [
      { label: 'x elmozdulás', value: '+6' },
      { label: 'y elmozdulás', value: '0' },
      { label: 'Pont', value: '(6; 0)' }
    ]
  },
  {
    id: 'ppq1-7',
    level: 1,
    prompt: 'Melyik pontot kapjuk, ha az origóból függőlegesen 5 egységet lefelé lépünk, vízszintesen pedig sem jobbra, sem balra nem térünk el?',
    options: [
      '(0; -5)',
      '(-5; 0)',
      '(0; 5)',
      '(-5; -5)'
    ],
    correctAnswer: 0,
    explanation: 'Nincs vízszintes elmozdulás: x = 0. Lefelé 5 egység: y = -5. A pont a függőleges y-tengely negatív felén fekszik: (0; -5).',
    hint: 'Nincs vízszintes lépés &rarr; első szám 0. Lefelé &rarr; második szám negatív.',
    breakdown: [
      { label: 'x koordináta', value: '0' },
      { label: 'y koordináta', value: '-5' },
      { label: 'Pont', value: '(0; -5)' }
    ]
  },
  {
    id: 'ppq1-8',
    level: 1,
    prompt: 'Egy diák a B(1; 4) pont helyett tévedésből a (4; 1) pontot jelölte be a füzetébe. Mi volt a pontos hibája?',
    options: [
      'Felcserélte a koordináták sorrendjét: a függőlegessel kezdte a vízszintes helyett',
      'Előjelhibát vétett: negatív számot használt',
      'Nem az origóból indult',
      'Rosszul adta össze a két számot'
    ],
    correctAnswer: 0,
    explanation: 'A rendezett számpárban a sorrend szigorúan kötött! Az (1; 4) 1 egység jobbra és 4 fel; a (4; 1) pedig 4 egység jobbra és 1 fel. A diák felcserélte az x és y koordinátákat.',
    hint: 'Gondolj a koordináták sorrendjére: mindig az x (vízszintes) jön először!',
    breakdown: [
      { label: 'Helyes pont', value: '(1; 4) &rarr; 1 jobbra, 4 fel' },
      { label: 'Téves pont', value: '(4; 1) &rarr; 4 jobbra, 1 fel' },
      { label: 'Hiba oka', value: 'Sorrend felcserélése' }
    ]
  },
  {
    id: 'ppq1-9',
    level: 1,
    prompt: 'Az ábrán látható K pont melyik tengelyen fekszik, és mik a pontos koordinátái?',
    options: [
      'Az x-tengelyen fekszik, koordinátája: (-3; 0)',
      'Az y-tengelyen fekszik, koordinátája: (0; -3)',
      'A II. síknegyedben fekszik, koordinátája: (-3; 1)',
      'Az origóban fekszik: (0; 0)'
    ],
    correctAnswer: 0,
    explanation: 'A pont közvetlenül a vízszintes számegyenesen található, a 0-tól 3 egységgel balra. Mivel a magassága 0, a koordinátája: K(-3; 0).',
    hint: 'A vízszintes tengelyen lévő pont második száma mindig 0.',
    breakdown: [
      { label: 'Tengely', value: 'x-tengely (vízszintes)' },
      { label: 'x érték', value: '-3' },
      { label: 'y érték', value: '0' },
      { label: 'Pont', value: 'K(-3; 0)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-40 -20 60 40">
        <line x1="-35" y1="0" x2="15" y2="0" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="0" y1="15" x2="0" y2="-15" stroke="#059669" strokeWidth="1.5" />
        <circle cx="-24" cy="0" r="3.5" fill="#ef4444" />
        <text x="-24" y="-7" textAnchor="middle" className="text-[7px] font-black fill-rose-600">K(-3; 0)</text>
        <circle cx="0" cy="0" r="2.5" fill="#f59e0b" />
      </svg>
    )
  },
  {
    id: 'ppq1-10',
    level: 1,
    prompt: 'Melyik pont fekszik a P(3; 2) ponttól pontosan 4 egységgel jobbra vízszintesen?',
    options: [
      '(7; 2)',
      '(3; 6)',
      '(-1; 2)',
      '(7; 6)'
    ],
    correctAnswer: 0,
    explanation: 'Vízszintesen jobbra lépve az x koordinátához adunk hozzá 4-et: 3 + 4 = 7. A magasság (y = 2) változatlan marad, így az új pont: (7; 2).',
    hint: 'Csak az első számhoz adj hozzá 4-et: 3 + 4 = 7.',
    breakdown: [
      { label: 'Eredeti pont', value: 'P(3; 2)' },
      { label: 'Jobbra 4 lépés', value: 'x = 3 + 4 = 7' },
      { label: 'y koordináta', value: 'Változatlanul 2' },
      { label: 'Új pont', value: '(7; 2)' }
    ]
  },

  // =========================================================================
  // 2. SZINT: PÁRHUZAMOS EGYENESEK ÉS SZAKASZOK (11-20)
  // =========================================================================
  {
    id: 'ppq2-1',
    level: 2,
    prompt: 'Milyen vonalra illeszkednek a (2; 5), (-1; 5), (4; 5) és (-3; 5) pontok a koordináta-rendszerben?',
    options: [
      'Egy vízszintes egyenesre, amely párhuzamos az x-tengellyel (y = 5)',
      'Egy függőleges egyenesre, amely párhuzamos az y-tengellyel',
      'Egy átlós egyenesre, amely átmegy az origón',
      'Egy körívre'
    ],
    correctAnswer: 0,
    explanation: 'Mind a négy pontban a második koordináta megegyezik: y = 5. Ez azt jelenti, hogy mindannyian pontosan 5 egység magasságban vannak, egy vízszintes egyenes mentén.',
    hint: 'Ha az y azonos minden pontnál, a pontok egy vízszintes vonalon sorakoznak.',
    breakdown: [
      { label: 'Közös koordináta', value: 'y = 5' },
      { label: 'Egyenes iránya', value: 'Vízszintes (x-tengellyel párhuzamos)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-35 -35 70 50">
        <line x1="-30" y1="0" x2="30" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <line x1="0" y1="10" x2="0" y2="-30" stroke="#94a3b8" strokeWidth="1" />
        <line x1="-30" y1="-20" x2="30" y2="-20" stroke="#2563eb" strokeWidth="1.5" />
        {[-15, -5, 10, 20].map((x, i) => (
          <circle key={i} cx={x} cy="-20" r="2.5" fill="#1d4ed8" />
        ))}
        <text x="0" y="-23" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">y = 5 egyenes</text>
      </svg>
    )
  },
  {
    id: 'ppq2-2',
    level: 2,
    prompt: 'Milyen vonalra illeszkednek a (-2; 1), (-2; 4), (-2; -3) és (-2; 0) pontok?',
    options: [
      'Egy függőleges egyenesre, amely párhuzamos az y-tengellyel (x = -2)',
      'Egy vízszintes egyenesre, amely párhuzamos az x-tengellyel',
      'Az x-tengelyre',
      'Az y-tengelyre'
    ],
    correctAnswer: 0,
    explanation: 'Mindegyik pont első koordinátája x = -2. Ez azt jelenti, hogy az origótól balra 2 egység távolságban egy függőleges egyenesre illeszkednek.',
    hint: 'Ha az x koordináta azonos, a pontok függőleges oszlopot alkotnak.',
    breakdown: [
      { label: 'Közös koordináta', value: 'x = -2' },
      { label: 'Egyenes iránya', value: 'Függőleges (y-tengellyel párhuzamos)' }
    ]
  },
  {
    id: 'ppq2-3',
    level: 2,
    prompt: 'Mekkora az A(1; 3) és B(7; 3) pontok által meghatározott vízszintes szakasz hossza?',
    options: [
      '6 egység',
      '8 egység',
      '7 egység',
      '3 egység'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a magasságuk azonos (y = 3), a távolságot a két vízszintes koordináta különbsége adja meg: 7 - 1 = 6 egység.',
    hint: 'Mindkettő magassága 3. Vond ki a nagyobb x-ből a kisebb x-et: 7 - 1 = ?',
    breakdown: [
      { label: 'A pont', value: 'x₁ = 1' },
      { label: 'B pont', value: 'x₂ = 7' },
      { label: 'Szakasz hossza', value: '7 - 1 = 6 egység' }
    ]
  },
  {
    id: 'ppq2-4',
    level: 2,
    prompt: 'Mekkora a C(-3; 2) és D(4; 2) pontok közötti vízszintes szakasz hossza?',
    options: [
      '7 egység',
      '1 egység',
      '-1 egység',
      '5 egység'
    ],
    correctAnswer: 0,
    explanation: 'A távolság: 4 - (-3) = 4 + 3 = 7 egység. (A C pont 3 egységgel van balra az origótól, a D pont 4 egységgel jobbra: 3 + 4 = 7).',
    hint: 'A bal oldali 3 egységhez add hozzá a jobb oldali 4 egységet: 3 + 4 = 7.',
    breakdown: [
      { label: 'C pont balra', value: '3 egység az origótól' },
      { label: 'D pont jobbra', value: '4 egység az origótól' },
      { label: 'Össztávolság', value: '3 + 4 = 7 egység' }
    ]
  },
  {
    id: 'ppq2-5',
    level: 2,
    prompt: 'Mekkora az E(3; -2) és F(3; 4) pontok közötti függőleges szakasz hossza?',
    options: [
      '6 egység',
      '2 egység',
      '4 egység',
      '7 egység'
    ],
    correctAnswer: 0,
    explanation: 'Az x koordináta azonos (x = 3). A függőleges távolság: 4 - (-2) = 4 + 2 = 6 egység (2 egység az x-tengely alatt, 4 egység felette).',
    hint: 'A tengely alatti 2 egység és a tengely feletti 4 egység összege: 2 + 4 = 6.',
    breakdown: [
      { label: 'Fent', value: '4 egység' },
      { label: 'Lent', value: '2 egység' },
      { label: 'Távolság', value: '4 - (-2) = 6 egység' }
    ]
  },
  {
    id: 'ppq2-6',
    level: 2,
    prompt: 'Mi a felezőpontja az A(2; 1) és B(8; 1) pontok közötti szakasznak?',
    options: [
      'F(5; 1)',
      'F(6; 1)',
      'F(5; 2)',
      'F(10; 2)'
    ],
    correctAnswer: 0,
    explanation: 'A szakasz vízszintes (y = 1). A 2 és a 8 számtani közepe (átlaga): (2 + 8) / 2 = 10 / 2 = 5. A felezőpont tehát: F(5; 1).',
    hint: 'Keresd meg a 2 és a 8 közötti középső számot: (2 + 8) / 2 = ?',
    breakdown: [
      { label: 'x koordináták', value: '2 és 8' },
      { label: 'Átlag', value: '(2 + 8) / 2 = 5' },
      { label: 'Felezőpont', value: 'F(5; 1)' }
    ]
  },
  {
    id: 'ppq2-7',
    level: 2,
    prompt: 'Melyik pont illeszkedik az I. és III. síknegyed szögfelezőjére, ahol az x és y koordináták pontosan megegyeznek (y = x)?',
    options: [
      '(-3; -3)',
      '(3; -3)',
      '(-3; 3)',
      '(3; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Az y = x egyenesen fekvő pontok mindkét koordinátája azonos szám. A (-3; -3) pontban x = -3 és y = -3, tehát illeszkedik erre a vonalra.',
    hint: 'Keresd a pontot, ahol a két szám és az előjelük is tökéletesen egyenlő!',
    breakdown: [
      { label: 'Szabály', value: 'x = y' },
      { label: 'Példa', value: '(-3; -3)' }
    ]
  },
  {
    id: 'ppq2-8',
    level: 2,
    prompt: 'Melyik pont illeszkedik a II. és IV. síknegyed szögfelezőjére, ahol a koordináták egymás ellentettjei (y = -x)?',
    options: [
      '(5; -5)',
      '(5; 5)',
      '(-5; -5)',
      '(0; 5)'
    ],
    correctAnswer: 0,
    explanation: 'Az y = -x egyenesen a két koordináta egymás ellentettje. Az (5; -5) pontban x = 5 és y = -5, amelyek összege 0, így ez a pont a szögfelezőn van.',
    hint: 'A két szám abszolútértéke egyenlő, de az előjelük ellentétes!',
    breakdown: [
      { label: 'Szabály', value: 'y = -x' },
      { label: 'Példa', value: '(5; -5)' }
    ]
  },
  {
    id: 'ppq2-9',
    level: 2,
    prompt: 'Ha a P(x; y) pontot eltoljuk 3 egységgel jobbra és 2 egységgel fel, hogyan írható fel az új P\' pont koordinátája?',
    options: [
      'P\'(x + 3; y + 2)',
      'P\'(x - 3; y - 2)',
      'P\'(x + 2; y + 3)',
      'P\'(3x; 2y)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra lépéskor az x koordinátához hozzáadódik az elmozdulás (+3), felfelé lépéskor az y koordinátához adódik hozzá (+2): P\'(x + 3; y + 2).',
    hint: 'Jobbra = +x, felfelé = +y.',
    breakdown: [
      { label: 'Jobbra 3', value: 'x + 3' },
      { label: 'Fel 2', value: 'y + 2' },
      { label: 'Új alak', value: '(x + 3; y + 2)' }
    ]
  },
  {
    id: 'ppq2-10',
    level: 2,
    prompt: 'Melyik pont esik pontosan egy vonalba (egy origón átmenő egyenesre) az origóval és a (2; 3) ponttal?',
    options: [
      '(4; 6)',
      '(4; 5)',
      '(3; 2)',
      '(2; 6)'
    ],
    correctAnswer: 0,
    explanation: 'Ha az origóból a (2; 3) pontba mutató lépést megduplázzuk: 2 · 2 = 4 és 2 · 3 = 6. A (4; 6) pont ugyanazon az egyenesen fekszik, kétszer akkora távolságra.',
    hint: 'Szorozd meg mindkét koordinátát ugyanazzal a számmal: 2·2=4 és 2·3=6!',
    breakdown: [
      { label: 'Alappont', value: '(2; 3)' },
      { label: 'Kétszerese', value: '(2·2; 3·2) = (4; 6)' }
    ]
  },

  // =========================================================================
  // 3. SZINT: SOKSZÖGEK, TÉGLALAPOK ÉS ALAKZATOK (21-30)
  // =========================================================================
  {
    id: 'ppq3-1',
    level: 3,
    prompt: 'Egy téglalap három csúcsa: A(1; 1), B(6; 1) és C(6; 4). Mik a negyedik csúcs (D) koordinátái?',
    options: [
      'D(1; 4)',
      'D(4; 1)',
      'D(1; 6)',
      'D(6; 6)'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap AD oldala függőleges (párhuzamos a BC oldallal), ezért a D csúcs x koordinátája megegyezik az A-val (1). A DC oldal vízszintes, ezért y koordinátája megegyezik a C-vel (4). Így: D(1; 4).',
    hint: 'A D pont az A pont felett van egy vonalban (x = 1), és a C-vel egy magasságban (y = 4).',
    breakdown: [
      { label: 'A(1; 1) &rarr; D', value: 'x = 1' },
      { label: 'C(6; 4) &rarr; D', value: 'y = 4' },
      { label: 'D koordinátája', value: 'D(1; 4)' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-5 -40 55 50">
        <line x1="-3" y1="0" x2="48" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <line x1="0" y1="5" x2="0" y2="-38" stroke="#94a3b8" strokeWidth="1" />
        <rect x="7" y="-30" width="35" height="23" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="7" cy="-7" r="2.5" fill="#7c3aed" />
        <circle cx="42" cy="-7" r="2.5" fill="#7c3aed" />
        <circle cx="42" cy="-30" r="2.5" fill="#7c3aed" />
        <circle cx="7" cy="-30" r="3" fill="#ef4444" />
        <text x="3" y="-3" className="text-[6px] font-bold fill-purple-900">A(1;1)</text>
        <text x="38" y="-3" className="text-[6px] font-bold fill-purple-900">B(6;1)</text>
        <text x="38" y="-32" className="text-[6px] font-bold fill-purple-900">C(6;4)</text>
        <text x="3" y="-32" className="text-[6px] font-black fill-rose-600">D(?)</text>
      </svg>
    )
  },
  {
    id: 'ppq3-2',
    level: 3,
    prompt: 'Egy négyzet két szomszédos csúcsa az x-tengellyel párhuzamos oldalon: A(2; 2) és B(6; 2). Mekkora a négyzet oldala és a kerülete?',
    options: [
      'Oldala a = 4 egység, kerülete K = 16 egység',
      'Oldala a = 4 egység, kerülete K = 12 egység',
      'Oldala a = 6 egység, kerülete K = 24 egység',
      'Oldala a = 2 egység, kerülete K = 8 egység'
    ],
    correctAnswer: 0,
    explanation: 'Az AB oldal hossza: 6 - 2 = 4 egység. Mivel négyzetről van szó, mind a 4 oldala 4 egység hosszú. A kerület: K = 4 · a = 4 · 4 = 16 egység.',
    hint: 'Számold ki az oldal hosszát: 6 - 2 = 4. A négyzet kerülete: 4 · 4 = ?',
    breakdown: [
      { label: 'Oldalhossz (a)', value: '6 - 2 = 4 egység' },
      { label: 'Kerület (K)', value: '4 · 4 = 16 egység' }
    ]
  },
  {
    id: 'ppq3-3',
    level: 3,
    prompt: 'Egy négyzet csúcsai A(-1; -1), B(3; -1), C(3; 3) és D(-1; 3). Mekkora a négyzet területe?',
    options: [
      '16 területegység',
      '12 területegység',
      '9 területegység',
      '20 területegység'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet oldalának hossza: 3 - (-1) = 3 + 1 = 4 egység. A négyzet területe: T = a · a = 4 · 4 = 16 területegység.',
    hint: 'Az oldal hossza 3 - (-1) = 4 egység. A terület: 4 · 4 = ?',
    breakdown: [
      { label: 'Oldal (a)', value: '3 - (-1) = 4 egység' },
      { label: 'Terület (T)', value: '4 · 4 = 16 területegység' }
    ]
  },
  {
    id: 'ppq3-4',
    level: 3,
    prompt: 'Egy derékszögű háromszög derékszögű csúcsa C(2; 2), a másik két csúcsa A(2; 6) és B(7; 2). Mekkora a két befogó hossza?',
    options: [
      'AC = 4 egység és BC = 5 egység',
      'AC = 6 egység és BC = 7 egység',
      'AC = 3 egység és BC = 4 egység',
      'AC = 4 egység és BC = 4 egység'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges befogó AC hossza: 6 - 2 = 4 egység. A vízszintes befogó BC hossza: 7 - 2 = 5 egység. A két befogó: 4 és 5 egység.',
    hint: 'AC függőleges: 6 - 2 = 4. BC vízszintes: 7 - 2 = 5.',
    breakdown: [
      { label: 'AC befogó', value: '6 - 2 = 4 egység' },
      { label: 'BC befogó', value: '7 - 2 = 5 egység' }
    ]
  },
  {
    id: 'ppq3-5',
    level: 3,
    prompt: 'Ha az A(-2; 1) pontot eltoljuk 5 egységgel jobbra és 3 egységgel lefelé, melyik pontba érkezünk?',
    options: [
      'A\'(3; -2)',
      'A\'(3; 4)',
      'A\'(-7; -2)',
      'A\'(2; -2)'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra 5 egység: x = -2 + 5 = +3. Lefelé 3 egység: y = 1 - 3 = -2. Az új pont: A\'(3; -2).',
    hint: 'Adj hozzá 5-öt a -2-höz (-2+5=3), és vonj ki 3-at az 1-ből (1-3=-2).',
    breakdown: [
      { label: 'x koordináta', value: '-2 + 5 = 3' },
      { label: 'y koordináta', value: '1 - 3 = -2' },
      { label: 'Új pont', value: 'A\'(3; -2)' }
    ]
  },
  {
    id: 'ppq3-6',
    level: 3,
    prompt: 'Egy paralelogramma három csúcsa: A(0; 0), B(5; 0) és D(2; 3). Mik a negyedik csúcs (C) koordinátái?',
    options: [
      'C(7; 3)',
      'C(5; 3)',
      'C(8; 3)',
      'C(7; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Az AB alsó oldal hossza 5 egység (0-tól 5-ig). A felső CD oldal ezzel párhuzamos és ugyanolyan hosszú (5 egység). A D(2; 3) csúcsból 5 egységet lépve jobbra: x = 2 + 5 = 7, az y magasság 3 marad. Így: C(7; 3).',
    hint: 'A paralelogramma szemközti oldalai egyenlő hosszúak: D-ből lépj 5 egységet jobbra!',
    breakdown: [
      { label: 'AB oldal hossza', value: '5 egység' },
      { label: 'CD oldal hossza', value: '5 egység' },
      { label: 'C x koordinátája', value: '2 + 5 = 7' },
      { label: 'C y koordinátája', value: '3' },
      { label: 'C pont', value: 'C(7; 3)' }
    ]
  },
  {
    id: 'ppq3-7',
    level: 3,
    prompt: 'Melyik pont az A(-4; 2) és B(2; 2) pontok közötti szakasz felezőpontja?',
    options: [
      'F(-1; 2)',
      'F(-2; 2)',
      'F(0; 2)',
      'F(-1; 0)'
    ],
    correctAnswer: 0,
    explanation: 'A szakasz vízszintes (y = 2). Az x koordináták átlaga: (-4 + 2) / 2 = -2 / 2 = -1. A felezőpont: F(-1; 2).',
    hint: 'Add össze a két x-et (-4 + 2 = -2) és oszd el 2-vel: -2 / 2 = -1.',
    breakdown: [
      { label: 'x átlag', value: '(-4 + 2) / 2 = -1' },
      { label: 'y koordináta', value: '2' },
      { label: 'Felezőpont', value: 'F(-1; 2)' }
    ]
  },
  {
    id: 'ppq3-8',
    level: 3,
    prompt: 'Egy rombusz átlói a koordinátatengelyeken fekszenek, csúcsai: A(4; 0), B(0; 3), C(-4; 0) és D(0; -3). Mekkora a két átló hossza?',
    options: [
      'Vízszintes átló: 8 egység, függőleges átló: 6 egység',
      'Mindkét átló 7 egység',
      'Vízszintes átló: 4 egység, függőleges átló: 3 egység',
      'Vízszintes átló: 16 egység, függőleges átló: 9 egység'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes átló az A(4; 0) és C(-4; 0) között húzódik: 4 - (-4) = 8 egység. A függőleges átló a B(0; 3) és D(0; -3) között húzódik: 3 - (-3) = 6 egység.',
    hint: 'A -4-től a +4-ig 8 egység, a -3-tól a +3-ig 6 egység.',
    breakdown: [
      { label: 'Vízszintes átló (AC)', value: '4 - (-4) = 8 egység' },
      { label: 'Függőleges átló (BD)', value: '3 - (-3) = 6 egység' }
    ]
  },
  {
    id: 'ppq3-9',
    level: 3,
    prompt: 'Összekötjük a sorban következő pontokat: A(0; 0) &rarr; B(4; 0) &rarr; C(2; 4) &rarr; A(0; 0). Milyen síkidomot kapunk?',
    options: [
      'Egyenlő szárú háromszöget (alapja 4 egység, magassága 4 egység)',
      'Téglalapot',
      'Derékszögű háromszöget',
      'Szabályos hatszöget'
    ],
    correctAnswer: 0,
    explanation: 'Az AB oldal vízszintes, 4 egység hosszú. A C(2; 4) csúcs x koordinátája pontosan felezi az AB oldalt (2 az 0 és 4 közepe), így az AC és BC szárak egyenlő hosszúak: egyenlő szárú háromszög.',
    hint: '3 csúcs összekötése háromszöget ad, a csúcsa pontosan az alap felezőpontja felett van.',
    breakdown: [
      { label: 'Csúcsok száma', value: '3 csúcs &rarr; háromszög' },
      { label: 'Alap', value: 'AB = 4 egység' },
      { label: 'Típus', value: 'Egyenlő szárú háromszög' }
    ]
  },
  {
    id: 'ppq3-10',
    level: 3,
    prompt: 'Egy házikó tetőcsúcsa a T(2; 5) pont, az eresz két vége az A(0; 3) és B(4; 3) pontok. Mekkora a tető háromszögének alapja és magassága?',
    options: [
      'Alapja AB = 4 egység, magassága m = 2 egység',
      'Alapja AB = 5 egység, magassága m = 3 egység',
      'Alapja AB = 2 egység, magassága m = 4 egység',
      'Alapja AB = 4 egység, magassága m = 5 egység'
    ],
    correctAnswer: 0,
    explanation: 'A tető alapja az A(0; 3) és B(4; 3) közötti vízszintes szakasz: 4 - 0 = 4 egység. A tető magassága a T csúcs és az eresz magasságának különbsége: 5 - 3 = 2 egység.',
    hint: 'Alap hossza: 4 - 0 = 4. Magasság: a csúcs y-ja (5) mínusz az eresz y-ja (3): 5 - 3 = ?',
    breakdown: [
      { label: 'Alap (AB)', value: '4 - 0 = 4 egység' },
      { label: 'Magasság (m)', value: '5 - 3 = 2 egység' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'Pontok Felvételének 3 Lépése',
      badge: 'LÉPÉSEK',
      description: '1. Origóból (0; 0) indulunk. 2. x szerint vízszintesen lépünk (jobbra: +, balra: -). 3. y szerint függőlegesen lépünk (fel: +, le: -).',
      formula: 'P(x; y) \\quad \\Longrightarrow \\quad \\text{Vízszintes (x) } \\longrightarrow \\text{ Függőleges (y)}',
      note: 'Vigyázat: (1; 4) NEM ugyanaz, mint (4; 1)!'
    },
    {
      id: 'cs1-2',
      title: 'Tengelyeken Lévő Pontok',
      badge: 'TENGELYEK',
      description: 'x-tengelyen: (x; 0) – nem lépünk fel vagy le. y-tengelyen: (0; y) – nem lépünk jobbra vagy balra.',
      note: 'Az origó (0; 0) a kezdőpont.'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Párhuzamos Egyenesek Pontjai',
      badge: 'EGYENESEK',
      description: 'Vízszintes egyenes: y = állandó (pl. minden pontnál y = 3). Függőleges egyenes: x = állandó (pl. minden pontnál x = -2).',
      formula: '\\text{Vízszintes: } y = c \\quad \\Big| \\quad \\text{Függőleges: } x = c',
      note: 'A szögfelező egyenesen x = y (pl. (3; 3) és (-2; -2)).'
    },
    {
      id: 'cs2-2',
      title: 'Vízszintes és Függőleges Távolságok',
      badge: 'SZAKASZHOSSZ',
      description: 'Azonos magasságú (y) pontok távolsága: |x₂ - x₁|. Azonos vízszintes helyzetű (x) pontok távolsága: |y₂ - y₁|.',
      note: 'A felezőpont koordinátája a végpontok számtani közepe (átlaga)!'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Sokszögek Csúcsai a Síkban',
      badge: 'ALAKZATOK',
      description: 'Téglalap szemközti oldalai párhuzamosak és egyenlőek. Hiányzó csúcs megadható a szomszédos csúcsok x és y koordinátáiból.',
      formula: 'T_{\\text{téglalap}} = a \\cdot b, \\quad K_{\\text{téglalap}} = 2 \\cdot (a + b)',
      note: 'Ha összekötjük a pontokat, síkidomokat és rajzokat kapunk!'
    },
    {
      id: 'cs3-2',
      title: 'Pontok Eltolása',
      badge: 'TRANSZFORMÁCIÓ',
      description: 'Jobbra a-val, fel b-vel tolva: P(x; y) → P\'(x + a; y + b). Balra tolás: kivonás az x-ből. Lefelé tolás: kivonás az y-ból.',
      note: 'A méret és alakzat formája eltoláskor változatlan marad.'
    }
  ]
};

export const PointPlottingQuiz: React.FC<PointPlottingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-points-quiz"
      title="Pontok ábrázolása kvíz"
      subtitle="30 feladat 3 szinten: pontfelvétel, párhuzamos egyenesek, távolságok és síkidomok csúcsai"
      questions={POINT_PLOTTING_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-point-plotting-quiz"
      storageKey="g5-loc-points-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={PointPlottingMatcher}
      sorterComponent={PointPlottingSorter}
    />
  );
};
