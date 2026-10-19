import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { RelationsMatcher } from './RelationsMatcher';
import { RelationsSorter } from './RelationsSorter';

export interface RelationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const RELATIONS_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: SZÁMGÉPEK ALAPJAI ÉS KÖZVETLEN KIMENETEK (1-10)
  // =========================================================================
  {
    id: 'rq1-1',
    level: 1,
    prompt: 'Egy számgép szabálya: „A bemenő számhoz adjunk hozzá 7-et!” (x + 7). Mi lesz a kimenő érték (y), ha a bemenet x = 8?',
    options: [
      '15 (mivel 8 + 7 = 15)',
      '1',
      '56',
      '14'
    ],
    correctAnswer: 0,
    explanation: 'A számgép a bemenethez hozzáad 7-et: 8 + 7 = 15. A kimenő érték 15.',
    hint: 'Add össze a bemenő 8-at és a 7-et!',
    breakdown: [
      { label: 'Bemenet (x)', value: '8' },
      { label: 'Művelet', value: '+ 7' },
      { label: 'Kimenet (y)', value: '8 + 7 = 15' }
    ],
    figure: (
      <svg className="w-44 h-16 mx-auto" viewBox="0 0 170 60">
        <rect x="5" y="15" width="30" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="20" y="34" textAnchor="middle" className="text-[12px] font-black fill-blue-900">8</text>
        <line x1="38" y1="30" x2="52" y2="30" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="55" y="10" width="60" height="40" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <text x="85" y="28" textAnchor="middle" className="text-[9px] font-bold fill-white">GÉP</text>
        <text x="85" y="42" textAnchor="middle" className="text-[10px] font-black fill-white">[ + 7 ]</text>
        <line x1="118" y1="30" x2="132" y2="30" stroke="#94a3b8" strokeWidth="2" />
        <rect x="135" y="15" width="30" height="30" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
        <text x="150" y="34" textAnchor="middle" className="text-[12px] font-black fill-emerald-900">15</text>
      </svg>
    )
  },
  {
    id: 'rq1-2',
    level: 1,
    prompt: 'Egy számgép szabálya: y = 3 · x. Mi lesz a kimenet, ha a bemenet x = 6?',
    options: [
      '18 (mivel 3 · 6 = 18)',
      '9',
      '2',
      '21'
    ],
    correctAnswer: 0,
    explanation: 'A számgép háromszoroz: 3 · 6 = 18. A kimenő érték 18.',
    hint: 'Szorozd meg a 6-ot 3-mal!',
    breakdown: [
      { label: 'Bemenet', value: '6' },
      { label: 'Szabály', value: '3 · x' },
      { label: 'Kimenet', value: '3 · 6 = 18' }
    ]
  },
  {
    id: 'rq1-3',
    level: 1,
    prompt: 'Egy számgép szabálya: y = 2 · x + 1. Mi lesz a kimenet, ha a bemenet x = 5?',
    options: [
      '11 (mivel 2 · 5 + 1 = 11)',
      '12',
      '10',
      '7'
    ],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 2 · 5 = 10, majd hozzáadunk egyet: 10 + 1 = 11.',
    hint: 'A műveleti sorrend: előbb szorzás, aztán összeadás!',
    breakdown: [
      { label: '1. lépés', value: '2 · 5 = 10' },
      { label: '2. lépés', value: '10 + 1 = 11' }
    ]
  },
  {
    id: 'rq1-4',
    level: 1,
    prompt: 'Egy számgépbe bedobjuk az 1, 2, 3, 4 számokat, és kimenetként sorban a 4, 5, 6, 7 értékeket kapjuk. Milyen szabály szerint működik a gép?',
    options: [
      'y = x + 3 (mindig 3-at ad hozzá a bemenethez)',
      'y = 2 · x',
      'y = 4 · x',
      'y = x - 3'
    ],
    correctAnswer: 0,
    explanation: 'Minden kimenő szám pontosan 3-mal nagyobb a bemenő számnál (1+3=4, 2+3=5, 3+3=6, 4+3=7). A szabály: y = x + 3.',
    hint: 'Nézd meg, mennyivel több a kimenet a bemenetnél: 4 - 1 = 3, 5 - 2 = 3...',
    breakdown: [
      { label: 'Összefüggés', value: 'Kimenet - Bemenet = 3' },
      { label: 'Szabály', value: 'y = x + 3' }
    ]
  },
  {
    id: 'rq1-5',
    level: 1,
    prompt: 'Mi a kimenet az y = 4 · x - 2 szabály esetén, ha a bemenet x = 3?',
    options: [
      '10 (mivel 4 · 3 = 12, és 12 - 2 = 10)',
      '14',
      '4',
      '12'
    ],
    correctAnswer: 0,
    explanation: '4 · 3 = 12. Ebből levonva 2-t: 12 - 2 = 10.',
    hint: 'Előbb szorozz 4-gyel: 4 · 3 = 12, majd vonj ki 2-t!',
    breakdown: [
      { label: 'Szorzás', value: '4 · 3 = 12' },
      { label: 'Kivonás', value: '12 - 2 = 10' }
    ]
  },
  {
    id: 'rq1-6',
    level: 1,
    prompt: 'Egy dobozban 12 darab színes ceruza van. Ha x darab dobozt veszünk, melyik képlet adja meg az összes ceruza számát (y)?',
    options: [
      'y = 12 · x',
      'y = x + 12',
      'y = x : 12',
      'y = 12 - x'
    ],
    correctAnswer: 0,
    explanation: 'Minden egyes dobozban 12 ceruza van, így a ceruzák száma a dobozok számának 12-szerese: y = 12 · x.',
    hint: 'Több dobozban sokkal több ceruza van: szorozni kell!',
    breakdown: [
      { label: '1 doboz', value: '12 ceruza' },
      { label: 'x doboz', value: '12 · x ceruza' }
    ]
  },
  {
    id: 'rq1-7',
    level: 1,
    prompt: 'Egy számgép szabálya y = x : 2 (felező gép). Mi lesz a kimenet, ha a bemenő szám x = 16?',
    options: [
      '8 (mivel 16 : 2 = 8)',
      '32',
      '14',
      '4'
    ],
    correctAnswer: 0,
    explanation: 'A bemenő szám fele: 16 : 2 = 8.',
    hint: 'Mennyi a 16 fele?',
    breakdown: [
      { label: 'Bemenet', value: '16' },
      { label: 'Felezés', value: '16 : 2 = 8' }
    ]
  },
  {
    id: 'rq1-8',
    level: 1,
    prompt: 'Egy táblázatban az alábbi párok szerepelnek: x = 2 esetén y = 6; x = 3 esetén y = 9; x = 5 esetén y = 15. Mi a szabály szavakkal megfogalmazva?',
    options: [
      'A bemenő szám háromszorosa (y = 3x)',
      'A bemenő számhoz hozzáadunk 4-et',
      'A bemenő szám kétszerese plusz 2',
      'A bemenő szám négyzete'
    ],
    correctAnswer: 0,
    explanation: 'Minden kimenet pontosan a bemenet 3-szorosa: 2 · 3 = 6, 3 · 3 = 9, 5 · 3 = 15. A szabály a háromszorozás.',
    hint: '6 : 2 = 3, 9 : 3 = 3, 15 : 5 = 3.',
    breakdown: [
      { label: 'Hányados', value: 'y : x = 3' },
      { label: 'Szabály', value: 'y = 3 · x' }
    ]
  },
  {
    id: 'rq1-9',
    level: 1,
    prompt: 'Mi a hiányzó érték az y = 2x + 4 szabály esetén, ha a bemenet x = 7?',
    options: [
      '18 (mivel 2 · 7 + 4 = 14 + 4 = 18)',
      '22',
      '15',
      '11'
    ],
    correctAnswer: 0,
    explanation: '2 · 7 = 14. Ehhez 4-et hozzáadva: 14 + 4 = 18.',
    hint: '2 · 7 = 14, ehhez adj hozzá 4-et!',
    breakdown: [
      { label: '2 · 7', value: '14' },
      { label: '14 + 4', value: '18' }
    ]
  },
  {
    id: 'rq1-10',
    level: 1,
    prompt: 'Egy számgép szabálya: y = 10 - x. Mi a kimenet, ha a bemenet x = 4?',
    options: [
      '6 (mivel 10 - 4 = 6)',
      '14',
      '40',
      '2'
    ],
    correctAnswer: 0,
    explanation: '10-ből kivonjuk a bemenő számot: 10 - 4 = 6.',
    hint: '10 - 4 = ?',
    breakdown: [
      { label: 'Művelet', value: '10 - 4' },
      { label: 'Eredmény', value: '6' }
    ]
  },

  // =========================================================================
  // 2. SZINT: VISSZAFELÉ SZÁMOLÁS ÉS TÁBLÁZATOK (11-20)
  // =========================================================================
  {
    id: 'rq2-1',
    level: 2,
    prompt: 'Egy számgép szabálya y = 2x + 1. A kimeneten a 13-as szám esett ki. Mi volt az eredeti bemenő szám (x)?',
    options: [
      '6 (visszafelé: (13 - 1) : 2 = 12 : 2 = 6)',
      '7',
      '27',
      '5'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé ellentétes műveleteket végzünk: először levonjuk az 1-et (13 - 1 = 12), majd osztunk 2-vel (12 : 2 = 6). Ellenőrzés: 2 · 6 + 1 = 13.',
    hint: 'Vond le az 1-et, majd felezd meg!',
    breakdown: [
      { label: '13 - 1', value: '12' },
      { label: '12 : 2', value: '6 (bemenet)' }
    ],
    figure: (
      <svg className="w-40 h-16 mx-auto" viewBox="0 0 160 60">
        <rect x="5" y="15" width="30" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="20" y="34" textAnchor="middle" className="text-[12px] font-black fill-amber-900">?</text>
        <line x1="125" y1="30" x2="40" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="42" y="10" width="76" height="40" rx="8" fill="#10b981" />
        <text x="80" y="28" textAnchor="middle" className="text-[8px] font-bold fill-white">VISSZAFELÉ</text>
        <text x="80" y="42" textAnchor="middle" className="text-[10px] font-black fill-white">[ - 1, majd : 2 ]</text>
        <rect x="125" y="15" width="30" height="30" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
        <text x="140" y="34" textAnchor="middle" className="text-[12px] font-black fill-emerald-900">13</text>
      </svg>
    )
  },
  {
    id: 'rq2-2',
    level: 2,
    prompt: 'Egy számgép szabálya y = 3x - 2. A kimenet 19. Melyik számot dobtuk be a gépbe?',
    options: [
      '7 (mivel (19 + 2) : 3 = 21 : 3 = 7)',
      '6',
      '8',
      '55'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé: a 19-hez először hozzáadjuk a 2-t (19 + 2 = 21), majd elosztjuk 3-mal (21 : 3 = 7).',
    hint: 'Add hozzá a 2-t (21), majd oszd el 3-mal!',
    breakdown: [
      { label: '19 + 2', value: '21' },
      { label: '21 : 3', value: '7' }
    ]
  },
  {
    id: 'rq2-3',
    level: 2,
    prompt: 'Egy négyzet kerülete K = 28 cm. A kerület szabálya K = 4 · a. Hány centiméter a négyzet egy oldala (a)?',
    options: [
      '7 cm (mivel 28 : 4 = 7)',
      '14 cm',
      '112 cm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van. Ha a 4 oldal összege 28 cm, akkor egy oldal: 28 : 4 = 7 cm.',
    hint: 'Oszd el a 28-at 4-gyel!',
    breakdown: [
      { label: 'Kerület', value: '28 cm' },
      { label: 'Oldalhossz', value: '28 : 4 = 7 cm' }
    ]
  },
  {
    id: 'rq2-4',
    level: 2,
    prompt: 'Ha a számgép szabálya y = x + 9, és a kimenő érték y = 25, mi volt a bemenet?',
    options: [
      '16 (mivel 25 - 9 = 16)',
      '34',
      '14',
      '15'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé kivonást végzünk: 25 - 9 = 16. Ellenőrzés: 16 + 9 = 25.',
    hint: 'Vonj ki 9-et a 25-ből!',
    breakdown: [
      { label: 'Kimenet', value: '25' },
      { label: '25 - 9', value: '16' }
    ]
  },
  {
    id: 'rq2-5',
    level: 2,
    prompt: 'Egy számgép az alábbi táblázat szerint működik: (1 &rarr; 5, 2 &rarr; 8, 3 &rarr; 11). Mennyivel nő a kimenet minden egyes lépésben, ha a bemenet 1-gyel nő?',
    options: [
      '3-mal (mivel 8 - 5 = 3 és 11 - 8 = 3)',
      '2-vel',
      '5-tel',
      '1-gyel'
    ],
    correctAnswer: 0,
    explanation: 'A kimenő értékek: 5, 8, 11... A szomszédos értékek különbsége mindig 3. Ez azt jelenti, hogy a szabályban 3-mal kell szorozni a bemenetet.',
    hint: 'Nézd meg a szomszédos kimenetek különbségét: 8 - 5 = ?',
    breakdown: [
      { label: '8 - 5', value: '3' },
      { label: '11 - 8', value: '3' },
      { label: 'Növekmény', value: '+3' }
    ]
  },
  {
    id: 'rq2-6',
    level: 2,
    prompt: 'Az előző feladat táblázatának (1 &rarr; 5, 2 &rarr; 8, 3 &rarr; 11) mi a pontos matematikai képlete?',
    options: [
      'y = 3 · x + 2',
      'y = 3 · x + 1',
      'y = 5 · x',
      'y = 2 · x + 3'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a lépésköz 3, a szabály 3x-szel indul. x = 1 esetén 3 · 1 = 3, amihez még 2-t kell adni, hogy 5 legyen. A képlet: y = 3x + 2. Ellenőrzés x = 2-re: 3 · 2 + 2 = 8!',
    hint: 'x = 1 esetén 3 · 1 + 2 = 5.',
    breakdown: [
      { label: 'Szorzó', value: '3 · x' },
      { label: 'Eltolás', value: '+ 2' },
      { label: 'Képlet', value: 'y = 3x + 2' }
    ]
  },
  {
    id: 'rq2-7',
    level: 2,
    prompt: 'Egy számgép szabálya y = 5x - 4. Ha a kimenet 36, mi volt a bemenet?',
    options: [
      '8 (mivel (36 + 4) : 5 = 40 : 5 = 8)',
      '7',
      '9',
      '6'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé: 36 + 4 = 40, majd 40 : 5 = 8. Ellenőrzés: 5 · 8 - 4 = 40 - 4 = 36.',
    hint: '36 + 4 = 40, majd oszd el 5-tel!',
    breakdown: [
      { label: '36 + 4', value: '40' },
      { label: '40 : 5', value: '8' }
    ]
  },
  {
    id: 'rq2-8',
    level: 2,
    prompt: 'Anna 3 évvel idősebb Péternél. Ha Péter életkora p, Anna életkora pedig a, melyik képlet fejezi ki helyesen az összefüggést?',
    options: [
      'a = p + 3',
      'p = a + 3',
      'a = 3 · p',
      'a = p - 3'
    ],
    correctAnswer: 0,
    explanation: 'Mivel Anna az idősebb, az ő életkora (a) Péter életkoránál (p) 3-mal több: a = p + 3.',
    hint: 'Anna az idősebb, tehát Péter korához kell hozzáadni a 3-at.',
    breakdown: [
      { label: 'Péter kora', value: 'p' },
      { label: 'Anna kora', value: 'a = p + 3' }
    ]
  },
  {
    id: 'rq2-9',
    level: 2,
    prompt: 'Ha a fenti feladatban Anna jelenleg 14 éves, hány éves Péter?',
    options: [
      '11 éves (mivel 14 - 3 = 11)',
      '17 éves',
      '12 éves',
      '10 éves'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé számolva: p = a - 3 = 14 - 3 = 11 éves.',
    hint: 'Péter 3 évvel fiatalabb Annánál: 14 - 3 = ?',
    breakdown: [
      { label: 'Anna kora', value: '14' },
      { label: 'Péter kora', value: '14 - 3 = 11' }
    ]
  },
  {
    id: 'rq2-10',
    level: 2,
    prompt: 'Egy táblázatban az értékek: (2 &rarr; 7, 4 &rarr; 13, 6 &rarr; 19). Melyik szabály érvényes a táblázatra?',
    options: [
      'y = 3 · x + 1',
      'y = 2 · x + 3',
      'y = 4 · x - 1',
      'y = 3 · x - 1'
    ],
    correctAnswer: 0,
    explanation: 'Próbáljuk ki az y = 3x + 1 képletet: 3 · 2 + 1 = 7, 3 · 4 + 1 = 13, 3 · 6 + 1 = 19. Mindegyikre pontosan illeszkedik!',
    hint: '3 · 2 + 1 = 7, és 3 · 4 + 1 = 13.',
    breakdown: [
      { label: 'x = 2', value: '3 · 2 + 1 = 7' },
      { label: 'x = 4', value: '3 · 4 + 1 = 13' },
      { label: 'Képlet', value: 'y = 3x + 1' }
    ]
  },

  // =========================================================================
  // 3. SZINT: GEOMETRIAI MINTÁZATOK ÉS GYUFASZÁLAK (21-30)
  // =========================================================================
  {
    id: 'rq3-1',
    level: 3,
    prompt: 'Egyetlen különálló négyzet kirakásához 4 gyufaszál kell. Ha 2 négyzetet összekapcsolva fűzünk láncba úgy, hogy egy közös oldaluk van, hány gyufaszál szükséges hozzá?',
    options: [
      '7 gyufaszál (mivel a közös oldal miatt a 2. négyzethez csak 3 új szál kell)',
      '8 gyufaszál',
      '6 gyufaszál',
      '5 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: 'Az 1. négyzet 4 szálból áll. A csatlakozó 2. négyzethez a közös belső oldal miatt már csak 3 új szál kell: 4 + 3 = 7 gyufaszál.',
    hint: 'Nem 4 + 4, mert egy belső oldal közös!',
    breakdown: [
      { label: '1. négyzet', value: '4 szál' },
      { label: '2. négyzet', value: '+3 szál' },
      { label: 'Összesen', value: '7 gyufaszál' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 110 60">
        <line x1="10" y1="10" x2="10" y2="50" stroke="#ea580c" strokeWidth="3" />
        <line x1="10" y1="10" x2="50" y2="10" stroke="#f59e0b" strokeWidth="3" />
        <line x1="50" y1="10" x2="50" y2="50" stroke="#dc2626" strokeWidth="3" />
        <line x1="10" y1="50" x2="50" y2="50" stroke="#f59e0b" strokeWidth="3" />
        <line x1="50" y1="10" x2="90" y2="10" stroke="#f59e0b" strokeWidth="3" />
        <line x1="90" y1="10" x2="90" y2="50" stroke="#ea580c" strokeWidth="3" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="#f59e0b" strokeWidth="3" />
        <text x="30" y="34" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">1.</text>
        <text x="70" y="34" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">2.</text>
      </svg>
    )
  },
  {
    id: 'rq3-2',
    level: 3,
    prompt: 'Melyik képlet adja meg n darab sorban összekapcsolt négyzet kirakásához szükséges gyufaszálak számát?',
    options: [
      'y = 3 · n + 1',
      'y = 4 · n',
      'y = 4 · n - 1',
      'y = 2 · n + 2'
    ],
    correctAnswer: 0,
    explanation: 'Minden egyes új négyzethez 3 gyufaszál kell (3 · n), plusz a legelső bal oldali lezáró szál (+ 1). Így a képlet: y = 3n + 1.',
    hint: 'n = 1 esetén 3·1 + 1 = 4; n = 2 esetén 3·2 + 1 = 7.',
    breakdown: [
      { label: 'Négyzetenként', value: '3 új szál' },
      { label: 'Kezdő szál', value: '+1' },
      { label: 'Képlet', value: '3n + 1' }
    ]
  },
  {
    id: 'rq3-3',
    level: 3,
    prompt: 'Hány gyufaszál szükséges 10 darab sorba kapcsolt négyzet kirakásához a 3n + 1 szabály alapján?',
    options: [
      '31 gyufaszál (mivel 3 · 10 + 1 = 31)',
      '40 gyufaszál',
      '30 gyufaszál',
      '29 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: 'Behelyettesítve a képletbe: 3 · 10 + 1 = 30 + 1 = 31 gyufaszál.',
    hint: '3 · 10 = 30, adj hozzá 1-et!',
    breakdown: [
      { label: '3 · 10', value: '30' },
      { label: '30 + 1', value: '31' }
    ]
  },
  {
    id: 'rq3-4',
    level: 3,
    prompt: 'Hány darab négyzetet tudunk láncban kirakni pontosan 40 darab gyufaszálból a 3n + 1 = 40 egyenlet alapján?',
    options: [
      '13 darab négyzetet (mivel (40 - 1) : 3 = 39 : 3 = 13)',
      '10 darab négyzetet',
      '14 darab négyzetet',
      '12 darab négyzetet'
    ],
    correctAnswer: 0,
    explanation: 'Visszafelé: a 40 szálból levonjuk a kezdő 1 szálat (40 - 1 = 39), majd elosztjuk 3-mal: 39 : 3 = 13 négyzet. Ellenőrzés: 3 · 13 + 1 = 39 + 1 = 40.',
    hint: '40 - 1 = 39, mennyi a 39 : 3?',
    breakdown: [
      { label: '40 - 1', value: '39' },
      { label: '39 : 3', value: '13 négyzet' }
    ]
  },
  {
    id: 'rq3-5',
    level: 3,
    prompt: 'Háromszögeket kapcsolunk össze láncban: 1 háromszög = 3 gyufa; 2 háromszög = 5 gyufa; 3 háromszög = 7 gyufa. Mi a képlet n darab összekapcsolt háromszögre?',
    options: [
      'y = 2 · n + 1',
      'y = 3 · n',
      'y = 3 · n - 1',
      'y = 2 · n + 2'
    ],
    correctAnswer: 0,
    explanation: 'Minden új háromszög 2 új szálat ad hozzá a közös oldal miatt, plusz a kezdő 1 szál: y = 2n + 1. Ellenőrzés: n=1 &rarr; 3, n=2 &rarr; 5, n=3 &rarr; 7.',
    hint: 'A lépésköz 2 (5-3=2, 7-5=2). Képlet: 2n + 1.',
    breakdown: [
      { label: 'Lépésköz', value: '+2 gyufa' },
      { label: 'Képlet', value: '2n + 1' }
    ]
  },
  {
    id: 'rq3-6',
    level: 3,
    prompt: 'Hány gyufaszál szükséges 15 darab egymáshoz csatlakozó háromszög kirakásához (2n + 1)?',
    options: [
      '31 gyufaszál (mivel 2 · 15 + 1 = 31)',
      '45 gyufaszál',
      '30 gyufaszál',
      '29 gyufaszál'
    ],
    correctAnswer: 0,
    explanation: '2 · 15 + 1 = 30 + 1 = 31 gyufaszál.',
    hint: '2 · 15 = 30, adj hozzá 1-et!',
    breakdown: [
      { label: '2 · 15', value: '30' },
      { label: '30 + 1', value: '31' }
    ]
  },
  {
    id: 'rq3-7',
    level: 3,
    prompt: 'Egy téglatest élhosszai a, b és c. Mindegyikből 4-4 darab egyenlő él található. Melyik képlet fejezi ki az összes él hosszának összegét (Ö)?',
    options: [
      'Ö = 4 · (a + b + c)',
      'Ö = a · b · c',
      'Ö = 2 · (a + b + c)',
      'Ö = 12 · a'
    ],
    correctAnswer: 0,
    explanation: 'A téglatestnek 12 éle van: 4 darab a, 4 darab b és 4 darab c. Ez kiemeléssel: Ö = 4 · a + 4 · b + 4 · c = 4 · (a + b + c).',
    hint: 'Négy a, négy b és négy c él van.',
    breakdown: [
      { label: 'Élek száma', value: '4a + 4b + 4c' },
      { label: 'Kiemeléssel', value: '4 · (a + b + c)' }
    ]
  },
  {
    id: 'rq3-8',
    level: 3,
    prompt: 'Kockákból lépcsőt építünk: az 1. oszlop 1 kocka, a 2. oszlop 2 kocka, a 3. oszlop 3 kocka, a 4. oszlop 4 kocka, az 5. oszlop 5 kocka. Hány kocka kell összesen az 5 oszlopos lépcsőhöz?',
    options: [
      '15 kocka (mivel 1 + 2 + 3 + 4 + 5 = 15)',
      '25 kocka',
      '10 kocka',
      '20 kocka'
    ],
    correctAnswer: 0,
    explanation: 'A számok összege: 1 + 2 + 3 + 4 + 5 = 15 kocka.',
    hint: 'Add össze az oszlopok magasságait: 1 + 2 + 3 + 4 + 5 = ?',
    breakdown: [
      { label: 'Összeg', value: '1 + 2 + 3 + 4 + 5' },
      { label: 'Eredmény', value: '15 kocka' }
    ]
  },
  {
    id: 'rq3-9',
    level: 3,
    prompt: 'Egy rejtett szabályos táblázat: (1 &rarr; 1, 2 &rarr; 4, 3 &rarr; 9, 4 &rarr; 16, 5 &rarr; 25). Mi lesz a kimenet, ha a bemenet x = 10?',
    options: [
      '100 (mivel a szabály y = x · x, vagyis négyzetszámok)',
      '30',
      '50',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'A kimenetek a bemenő számok négyzetei: 1·1=1, 2·2=4, 3·3=9, 4·4=16, 5·5=25. Így 10 esetén: 10 · 10 = 100.',
    hint: 'Minden számot önmagával szorzunk: 10 · 10 = ?',
    breakdown: [
      { label: 'Szabály', value: 'y = x · x' },
      { label: 'x = 10 esetén', value: '10 · 10 = 100' }
    ]
  },
  {
    id: 'rq3-10',
    level: 3,
    prompt: 'Miért a betűs kifejezés (algebrai képlet, pl. y = 2x + 1) a leghatékonyabb módja egy szabály leírásának?',
    options: [
      'Mert bármilyen tetszőleges bemenő értékre érvényes, és egyetlen sorban tömören összefoglalja az összefüggést',
      'Mert betűk nélkül nem lehet összeadni',
      'Mert a képletek csak az 5. osztályban érvényesek',
      'Mert így nem kell számolni semmit'
    ],
    correctAnswer: 0,
    explanation: 'A betűs kifejezések általános érvényűek: nemcsak az 1, 2, 3 számokra adnak választ, hanem akár az 1000-re vagy tetszőleges számra is azonnal kiszámíthatóvá teszik az eredményt.',
    hint: 'A képlet minden számra egyszerre érvényes.',
    breakdown: [
      { label: 'Általánosítás', value: 'Minden számra érvényes szabály' },
      { label: 'Előny', value: 'Gyors és tömör kiszámíthatóság' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'A Számgép Modell',
      badge: 'ALAPFOGALOM',
      description: 'Bemenet (x): a kiinduló szám. Szabály: a gép belső műveletsora. Kimenet (y): az eredmény.',
      formula: 'x \\quad \\xrightarrow{[ \\cdot 2 + 1 ]} \\quad y = 2x + 1',
      note: 'A műveleti sorrend: előbb szorzás/osztás, majd összeadás/kivonás!'
    },
    {
      id: 'cs1-2',
      title: 'Közvetlen Kiszámítás',
      badge: 'SZÁMOLÁS',
      description: 'Helyettesítsd be az x helyére a megadott bemenő számot, és végezd el a kijelölt műveleteket!',
      note: 'Példa: x = 4 esetén 3 · 4 - 2 = 12 - 2 = 10.'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Visszafelé Számolás (Inverz)',
      badge: 'INVERZ MŰVELETEK',
      description: 'Ha a kimenetet ismered, fordított sorrendben ellentétes műveleteket végezz!',
      formula: 'y = 2x + 1 \\quad \\Longleftrightarrow \\quad x = (y - 1) : 2',
      note: 'Összeadás ellentéte a kivonás, szorzás ellentéte az osztás.'
    },
    {
      id: 'cs2-2',
      title: 'Lépésköz a Táblázatban',
      badge: 'TÁBLÁZATOK',
      description: 'Ha a bemenet 1-gyel nő, és a kimenet mindig k-val nő, akkor a szabály k · x-szel kezdődik!',
      note: 'Példa: 5, 8, 11 (lépésköz 3) &rarr; y = 3x + 2.'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Gyufaszál Láncok Képletei',
      badge: 'GEOMETRIA',
      description: 'Négyzetlánc: y = 3n + 1 (1 kezdő szál + 3 szál négyzetenként). Háromszöglánc: y = 2n + 1.',
      formula: '\\text{Négyzetek: } 3n + 1 \\quad | \\quad \\text{Háromszögek: } 2n + 1',
      note: 'A közös belső oldalak miatt nem 4n vagy 3n a képlet!'
    },
    {
      id: 'cs3-2',
      title: 'Négyzetszámok és Alakzatok',
      badge: 'ÖSSZEFÜGGÉSEK',
      description: 'Négyzet kerülete: K = 4a. Négyzet területe: T = a · a. Négyzetszámok sorozata: 1, 4, 9, 16, 25, ..., 100.',
      note: 'Téglatest összes éle: 4 · (a + b + c).'
    }
  ]
};

export const RelationsQuiz: React.FC<RelationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-relations-quiz"
      title="Keressünk összefüggéseket! kvíz"
      subtitle="30 feladat 3 szinten: számgépek, táblázatok, visszafelé számolás és gyufaszál-feladványok"
      questions={RELATIONS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-relations-quiz"
      storageKey="g5-loc-relations-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={RelationsMatcher}
      sorterComponent={RelationsSorter}
    />
  );
};
