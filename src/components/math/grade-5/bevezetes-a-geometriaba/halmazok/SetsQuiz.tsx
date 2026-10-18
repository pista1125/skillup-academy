import React from 'react';
import { QuizTemplate, Question, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SetsMatcher } from './SetsMatcher';
import { SetsSorter } from './SetsSorter';
import { CircleDot, Shapes, Layers, Filter, Sparkles, BookOpen } from 'lucide-react';

export interface SetsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ========================================================
  // --- 1. SZINT: HALMAZOK ALAPFOGALMAI ÉS JELÖLÉSEI ---
  // ========================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mit nevezünk halmaznak a matematikában?',
    options: [
      'Dolgok, tárgyak, alakzatok összessége, amelyekről egyértelműen eldönthető, hogy beletartoznak-e vagy sem',
      'Csak és kizárólag a pozitív egész számok csoportját',
      'Olyan csoportot, amelybe tetszőlegesen bárki bármit beletehet megkötések nélkül',
      'Egy olyan geometriai síkidomot, aminek 4 derékszöge van'
    ],
    correctAnswer: 0,
    explanation: 'A halmaz alapvető fogalom: olyan dolgok (elemek) összessége, amelyeket egyértelmű tulajdonság határoz meg, így minden dologról egyértelműen eldönthető, hogy eleme-e a halmaznak vagy sem.',
    hint: 'Gondolj a definícióra: egyértelműen eldönthető-e, hogy valami beletartozik?',
    breakdown: [
      { label: 'Halmaz feltétele', value: 'Egyértelmű eldönthetőség' },
      { label: 'Példa halmazra', value: 'A háromszögek összessége' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mit jelent a matematikai „a ∈ A” jelölés?',
    options: [
      'Az „a” dolog eleme az A halmaznak',
      'Az „a” dolog nem eleme az A halmaznak',
      'Az A halmaz üres',
      'Az „a” és az A számok összege'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 80 50" fill="none">
        <ellipse cx="46" cy="25" rx="28" ry="20" className="fill-purple-50 stroke-purple-600" strokeWidth="2" />
        <circle cx="42" cy="25" r="3.5" className="fill-purple-700" />
        <text x="42" y="17" textAnchor="middle" className="text-[12px] font-bold fill-purple-900">a</text>
        <text x="62" y="18" className="text-[13px] font-black fill-purple-600">A</text>
      </svg>
    ),
    explanation: 'Az „∈” szimbólum az „eleme” reláció jele. Az „a ∈ A” azt fejezi ki, hogy az „a” elem beletartozik az A halmazba.',
    hint: 'A görög epszilon (∈) betű az „eleme” szóból ered.',
    breakdown: [
      { label: '∈', value: 'Eleme' },
      { label: 'notin (∉)', value: 'Nem eleme' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Ha A = {Háromszög, Négyzet, Téglalap}, akkor melyik állítás IGAZ?',
    options: [
      'Kör ∉ A',
      'Kör ∈ A',
      'Kocka ∈ A',
      'Ötszög ∈ A'
    ],
    correctAnswer: 0,
    explanation: 'A megadott A halmazban csak a háromszög, a négyzet és a téglalap szerepel. A kör nincs benne a halmazban, tehát Kör ∉ A (nem eleme).',
    hint: 'Nézd meg a felsorolt 3 alakzatot! Szerepel köztük a kör?',
    breakdown: [
      { label: 'A halmaz elemei', value: 'Háromszög, Négyzet, Téglalap' },
      { label: 'Kör viszonya', value: 'Kör ∉ A (nem eleme)' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Mit jelent a halmazelméletben az „üres halmaz” (jele: ∅ vagy { })?',
    options: [
      'Olyan halmaz, amelynek egyetlen eleme sincs',
      'Olyan halmaz, amelynek egyetlen eleme a 0 szám',
      'Olyan halmaz, amibe csak negatív számok tartoznak',
      'Olyan halmaz, amit még nem rajzoltunk le'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="18" className="stroke-rose-500" strokeWidth="3" />
        <line x1="12" y1="38" x2="38" y2="12" className="stroke-rose-500" strokeWidth="3" />
      </svg>
    ),
    explanation: 'Az üres halmaznak egyáltalán nincs eleme (elemeinek száma 0). Nagyon fontos: a {0} halmaz nem üres, mert van 1 eleme (a 0)!',
    hint: 'Az üres dobozban sincs semmi – az üres halmazban sincs egyetlen elem sem.',
    breakdown: [
      { label: 'Jele', value: '∅ vagy { }' },
      { label: 'Elemek száma', value: '0 darab' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Az alábbiak közül melyik alkot ÜRES HALMAZT a geometriában?',
    options: [
      'A négy oldalú háromszögek halmaza',
      'A négyzetek halmaza',
      'A derékszögű síkidomok halmaza',
      'A szabályos sokszögek halmaza'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögnek definíció szerint pontosan 3 oldala van, így nem létezik négy oldalú háromszög. Ezért ez a halmaz üres (∅).',
    hint: 'Hány oldala lehet egy háromszögnek? Létezhet 4 oldalú háromszög?',
    breakdown: [
      { label: 'Háromszög oldalai', value: 'Mindig pontosan 3' },
      { label: '4 oldalú háromszög', value: 'Lehetetlen ⟹ üres halmaz' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hogyan ábrázolja a Venn-diagram a halmazokat és elemeiket?',
    options: [
      'Egy zárt vonallal (pl. körrel), ahol a belső rész jelenti a halmaz elemeit',
      'Egy egyenes vonallal, mint a számegyenesen',
      'Egy oszlopdiagrammal a füzet szélén',
      'Kizárólag egymás alá írt számokkal'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 80 50" fill="none">
        <rect x="2" y="2" width="76" height="46" rx="6" className="stroke-slate-400 fill-slate-50" strokeWidth="1.5" />
        <ellipse cx="40" cy="25" rx="22" ry="16" className="fill-blue-100 stroke-blue-500" strokeWidth="2" />
        <text x="24" y="14" className="text-[10px] font-black fill-slate-500">U</text>
        <text x="54" y="20" className="text-[11px] font-black fill-blue-700">A</text>
      </svg>
    ),
    explanation: 'A Venn-diagramon a halmazt egy zárt görbe (gyakran kör vagy ovális) határolja: ami a vonalon belül van, az a halmaz eleme; ami kívül van, az nem eleme.',
    hint: 'Gondolj egy elkerített udvarra: aki bent van, az a csoport tagja!',
    breakdown: [
      { label: 'Zárt görbén belül', value: 'Eleme a halmaznak' },
      { label: 'Zárt görbén kívül', value: 'Nem eleme a halmaznak' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mit nevezünk a halmazelméletben alaphalmaznak (univerzumnak, jele: U)?',
    options: [
      'Azt a legbővebb halmazt, amelyből az adott feladatban az elemeket vizsgáljuk',
      'A legkisebb, mindössze 1 elemet tartalmazó halmazt',
      'Az üres halmaz másik elnevezését',
      'A nullát tartalmazó halmazt'
    ],
    correctAnswer: 0,
    explanation: 'Az alaphalmaz (univerzum, U) az a keret, amelyből a feladat vizsgálata során az elemeket kiválogatjuk (pl. U = az összes geometriai síkidom).',
    hint: 'Az univerzum mindent magában foglal az adott vizsgálat során.',
    breakdown: [
      { label: 'Alaphalmaz jele', value: 'U' },
      { label: 'Szerepe', value: 'A vizsgálat teljes kerete' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Hány eleme van a H = {Háromszög, Négyzet, Kör, Henger, Gömb} halmaznak?',
    options: [
      '5 eleme',
      '4 eleme',
      '6 eleme',
      'Végtelen sok eleme'
    ],
    correctAnswer: 0,
    explanation: 'A megadott halmazban 5 különböző geometriai alakzat van felsorolva, így a számossága |H| = 5.',
    hint: 'Számold meg a vesszőkkel elválasztott alakzatokat a kapcsos zárójelben!',
    breakdown: [
      { label: 'Felsorolt elemek', value: 'Háromszög, Négyzet, Kör, Henger, Gömb' },
      { label: 'Elemek száma (|H|)', value: '5' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Számít-e a halmazban az elemek felsorolási sorrendje? Pl. {Kör, Négyzet} = {Négyzet, Kör}?',
    options: [
      'Nem számít a sorrend, a két halmaz pontosan ugyanaz',
      'Igen, a sorrend megváltoztatásával egy teljesen új halmaz keletkezik',
      'Csak akkor egyenlők, ha ábécérendben vannak felsorolva',
      'Csak a számoknál számít a sorrend, alakzatoknál nem'
    ],
    correctAnswer: 0,
    explanation: 'A halmazban a sorrend NEM számít! Mindkét halmaz pontosan ugyanazokat az elemeket tartalmazza, ezért {Kör, Négyzet} = {Négyzet, Kör}.',
    hint: 'Ha egy kosárba beteszel egy almát meg egy körtét, mindegy, melyiket tetted be először: a kosár tartalma ugyanaz marad.',
    breakdown: [
      { label: 'Sorrend szabálya', value: 'A halmazban nem számít a sorrend' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Hogyan kezeljük, ha egy elemet többször is leírunk egy halmazban, pl. {Kör, Kör, Négyzet}?',
    options: [
      'Minden elem csak egyszer számít, így ez megegyezik a {Kör, Négyzet} halmazzal',
      'A kör duplán fog számítani az elemek számában',
      'Ez egy hibás kifejezés, tilos ilyet leírni',
      'A második kör automatikusan gömbbé változik'
    ],
    correctAnswer: 0,
    explanation: 'Egy elem egy halmaznak vagy eleme, vagy nem: a többszöri felsorolás nem változtatja meg a halmazt. {Kör, Kör, Négyzet} = {Kör, Négyzet}, elemeinek száma 2.',
    hint: 'Ha valaki kétszer mondja, hogy a teremben van egy szék, attól még nem lesz ott két szék.',
    breakdown: [
      { label: 'Ismétlődés szabálya', value: 'Minden elem csak egyszer számít' }
    ]
  },

  // ========================================================
  // --- 2. SZINT: VENN-DIAGRAMOK, METSZET ÉS UNIÓ ---
  // ========================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Mit jelent két halmaz metszete (A ∩ B)?',
    options: [
      'Azon elemek halmazát, amelyek MINDKÉT halmazba beletartoznak (közös elemek)',
      'Azon elemek halmazát, amelyek legalább az egyik halmazba beletartoznak',
      'Azon elemek halmazát, amelyek csak az A halmazban vannak benne',
      'Azon elemek halmazát, amelyek egyik halmazban sincsenek benne'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="stroke-blue-500" strokeWidth="2" />
        <circle cx="56" cy="25" r="20" className="stroke-emerald-500" strokeWidth="2" />
        <path d="M 45 9.8 A 20 20 0 0 1 45 40.2 A 20 20 0 0 1 45 9.8 Z" className="fill-purple-300 stroke-purple-600" strokeWidth="2" />
        <text x="22" y="27" className="text-[12px] font-black fill-blue-700">A</text>
        <text x="66" y="27" className="text-[12px] font-black fill-emerald-700">B</text>
      </svg>
    ),
    explanation: 'A metszet (A ∩ B) a két halmaz közös része: azok az elemek, amelyek A-nak ÉS B-nek is elemei (a két zárt görbe átfedése).',
    hint: 'A metszet jele (∩) hasonlít egy lefordított tálkára vagy egy közös „tetőre”.',
    breakdown: [
      { label: 'Jele', value: 'A ∩ B' },
      { label: 'Jelentése', value: 'A és B közös elemei' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Legyen A = {Háromszög, Négyzet, Téglalap} és B = {Négyzet, Kör, Rombusz}. Mi az A ∩ B (metszet)?',
    options: [
      '{Négyzet}',
      '{Háromszög, Négyzet, Téglalap, Kör, Rombusz}',
      '{Kör, Rombusz}',
      'Üres halmaz (∅)'
    ],
    correctAnswer: 0,
    explanation: 'Az egyetlen olyan alakzat, amely mindkét felsorolásban szerepel, a Négyzet. Tehát A ∩ B = {Négyzet}.',
    hint: 'Keresd meg azt az alakzatot, amelyik mind az A, mind a B halmazban fel van sorolva!',
    breakdown: [
      { label: 'A halmaz', value: 'Háromszög, Négyzet, Téglalap' },
      { label: 'B halmaz', value: 'Négyzet, Kör, Rombusz' },
      { label: 'Közös elem', value: '{Négyzet}' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Mit jelent két halmaz uniója (A ∪ B)?',
    options: [
      'Azon elemek összessége, amelyek LEGALÁBB AZ EGYIK halmazba beletartoznak (egyesítés)',
      'Csak a mindkét halmazban egyszerre jelen lévő elemek összessége',
      'Azok az elemek, amelyek egyik halmazban sincsenek benne',
      'Az A halmazból a B halmaz elemeinek kivonása'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="fill-amber-200/80 stroke-amber-600" strokeWidth="2" />
        <circle cx="56" cy="25" r="20" className="fill-amber-200/80 stroke-amber-600" strokeWidth="2" />
        <text x="22" y="27" className="text-[12px] font-black fill-amber-900">A</text>
        <text x="66" y="27" className="text-[12px] font-black fill-amber-900">B</text>
      </svg>
    ),
    explanation: 'Az unió (A ∪ B) a halmazok egyesítése: belekerül minden olyan elem, ami az A-ban, a B-ben, vagy mindkettőben benne van.',
    hint: 'Az unió jele (∪) mint egy felfelé nyitott tálka vagy kupa, amibe mindkét halmaz elemeit beleöntjük.',
    breakdown: [
      { label: 'Jele', value: 'A ∪ B' },
      { label: 'Jelentése', value: 'A vagy B (vagy mindkettő) elemei' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Mikor mondjuk két halmazról, hogy DISZJUNKTAK (közös elem nélküliek)?',
    options: [
      'Ha nincs egyetlen közös elemük sem, vagyis A ∩ B = ∅',
      'Ha pontosan ugyanazok az elemeik',
      'Ha az egyik halmaz részhalmaza a másiknak',
      'Ha mindkét halmaznak páros számú eleme van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="25" cy="25" r="18" className="fill-blue-50 stroke-blue-500" strokeWidth="2" />
        <circle cx="65" cy="25" r="18" className="fill-emerald-50 stroke-emerald-500" strokeWidth="2" />
        <text x="25" y="28" textAnchor="middle" className="text-[11px] font-black fill-blue-700">A</text>
        <text x="65" y="28" textAnchor="middle" className="text-[11px] font-black fill-emerald-700">B</text>
      </svg>
    ),
    explanation: 'Két halmaz diszjunkt, ha egyetlen közös elemük sincs (metszetük az üres halmaz: A ∩ B = ∅). Venn-diagramon a két kör nem metszi egymást.',
    hint: 'A latin „disjunctus” jelentése elválasztott, különálló.',
    breakdown: [
      { label: 'Feltétel', value: 'A ∩ B = ∅' },
      { label: 'Venn-diagramon', value: 'Két különálló, nem érintkező kör' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Az alábbi alakzatpárok közül melyik halmazpár DISZJUNKT egymással?',
    options: [
      'Háromszögek halmaza ÉS Négyszögek halmaza',
      'Négyzetek halmaza ÉS Téglalapok halmaza',
      'Sokszögek halmaza ÉS Négyszögek halmaza',
      'Kék síkidomok halmaza ÉS Háromszögek halmaza'
    ],
    correctAnswer: 0,
    explanation: 'Egy alakzat nem lehet egyszerre 3 oldalú (háromszög) és 4 oldalú (négyszög), így nincs közös elemük: a két halmaz diszjunkt!',
    hint: 'Létezik olyan alakzat, ami egyszerre háromszög és négyszög is?',
    breakdown: [
      { label: 'Háromszögek ∩ Négyszögek', value: 'Üres halmaz (∅)' },
      { label: 'Következtetés', value: 'Diszjunkt halmazok' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Legyen A = {Kék alakzatok} és B = {Négyszögek}. Hová kerül a Venn-diagramon egy PIROS NÉGYZET?',
    options: [
      'Csak a B halmazba (a metszeten kívül, de a B körön belül)',
      'A metszetbe (A ∩ B)',
      'Csak az A halmazba',
      'A két halmazon kívülre, az alaphalmazba'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="stroke-blue-500" strokeWidth="1.5" />
        <circle cx="56" cy="25" r="20" className="stroke-emerald-500 fill-emerald-50/50" strokeWidth="2" />
        <rect x="62" y="20" width="10" height="10" className="fill-rose-500 stroke-rose-700" strokeWidth="1" />
        <text x="20" y="16" className="text-[10px] font-bold fill-blue-600">A (kék)</text>
        <text x="64" y="16" className="text-[10px] font-bold fill-emerald-600">B (4-szög)</text>
      </svg>
    ),
    explanation: 'A piros négyzet nem kék, tehát nem tartozik az A halmazba (nem lehet a metszetben sem). Viszont négyszög, így a B halmaz azon részébe kerül, ami nincs átfedésben A-val.',
    hint: 'Négyszög? Igen. Kék? Nem. Tehát csak a B halmazban van helye!',
    breakdown: [
      { label: 'Kék alakzat? (A)', value: 'Nem (piros)' },
      { label: 'Négyszög? (B)', value: 'Igen' },
      { label: 'Helye', value: 'Csak B (B \\ A)' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Legyen A = {Kék alakzatok} és B = {Négyszögek}. Hová kerül egy KÉK NÉGYZET a diagramon?',
    options: [
      'A metszetbe (A ∩ B közös rész)',
      'Csak az A halmazba',
      'Csak a B halmazba',
      'A körökön kívülre'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="stroke-blue-500" strokeWidth="1.5" />
        <circle cx="56" cy="25" r="20" className="stroke-emerald-500" strokeWidth="1.5" />
        <path d="M 45 9.8 A 20 20 0 0 1 45 40.2 A 20 20 0 0 1 45 9.8 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
        <rect x="42" y="21" width="8" height="8" className="fill-blue-600 stroke-blue-800" strokeWidth="1" />
      </svg>
    ),
    explanation: 'A kék négyzet kék is (eleme A-nak) és négyszög is (eleme B-nek), ezért a két halmaz közös metszetébe (A ∩ B) tartozik.',
    hint: 'Mindkét tulajdonsággal rendelkezik egyszerre!',
    breakdown: [
      { label: 'Mindkét feltétel teljesül', value: 'A ∩ B (metszet)' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Hová kerül egy SÁRGA KÖR a fenti Venn-diagramon (A: kék alakzatok, B: négyszögek)?',
    options: [
      'Mindkét körön kívülre, az alaphalmazba (U)',
      'A metszetbe (A ∩ B)',
      'Csak a B halmazba',
      'Csak az A halmazba'
    ],
    correctAnswer: 0,
    explanation: 'A sárga kör nem kék (nincs benne A-ban), és nem négyszög (nincs benne B-ben). Egyik halmaznak sem eleme, így mindkét körön kívül, az alaphalmaz keretében kap helyet.',
    hint: 'Egyik tulajdonság sem igaz rá: nem kék és nem négyszög.',
    breakdown: [
      { label: 'Nem kék', value: 'A-n kívül' },
      { label: 'Nem négyszög', value: 'B-n kívül' },
      { label: 'Helye', value: 'Kívül az alaphalmazban' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Ha egy osztályban 15-en rajzolnak kört, 12-en négyzetet, és 5-en mindkettőt, hányan rajzoltak LEGALÁBB EGYET a kettő közül?',
    options: [
      '22 tanuló (15 + 12 - 5)',
      '27 tanuló (15 + 12)',
      '32 tanuló (15 + 12 + 5)',
      '17 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'Az unió képlete szerint: |A ∪ B| = |A| + |B| - |A ∩ B|. Vagyis 15 + 12 - 5 = 22. Az 5 közös rajzolót nem szabad kétszer számolni!',
    hint: 'A közös 5 tanulót mindkét csoportban megszámoltad volna, ezért egyszer le kell vonni a metszetet!',
    breakdown: [
      { label: 'Csak kört rajzolt', value: '15 - 5 = 10 fő' },
      { label: 'Mindkettőt rajzolt', value: '5 fő' },
      { label: 'Csak négyzetet rajzolt', value: '12 - 5 = 7 fő' },
      { label: 'Összesen (unió)', value: '10 + 5 + 7 = 22 fő' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mit jelent a halmazok KÜLÖNBSÉGE: A \\ B (vagy A - B)?',
    options: [
      'Az A halmaz azon elemeit, amelyek NEM tartoznak bele B-be',
      'A két halmaz összes elemének kivonását egymásból',
      'Az A és B metszetének törlését a teljes füzetből',
      'A B halmaz elemeit, amelyek nincsenek benne A-ban'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="fill-violet-200 stroke-violet-600" strokeWidth="2" />
        <circle cx="56" cy="25" r="20" className="fill-white stroke-slate-400" strokeWidth="1.5" />
        <text x="24" y="28" className="text-[11px] font-black fill-violet-900">A \ B</text>
      </svg>
    ),
    explanation: 'Az A \\ B különbséghalmaz az A halmaz „tiszta” része: azok az elemek, amelyek A-ban benne vannak, de B-ből nem vettünk át semmit.',
    hint: 'Vedd az A halmazt, és vágd le belőle a B-vel közös metszetet!',
    breakdown: [
      { label: 'Jelölés', value: 'A \\ B' },
      { label: 'Jelentés', value: 'Csak az A halmaz elemei' }
    ]
  },

  // ========================================================
  // --- 3. SZINT: RÉSZHALMAZ-HIERARCHIA ÉS LOGIKAI SZABÁLYOK ---
  // ========================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mikor mondjuk, hogy a B halmaz RÉSZHALMAZA az A halmaznak (B ⊆ A)?',
    options: [
      'Ha B minden egyes eleme egyben az A halmaznak is eleme',
      'Ha B-nek kevesebb eleme van, mint A-nak, de nem azonosak',
      'Ha A és B metszete üres halmaz',
      'Ha B minden eleme nagyobb szám, mint A elemei'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 70 50" fill="none">
        <ellipse cx="35" cy="25" rx="30" ry="20" className="fill-blue-50 stroke-blue-500" strokeWidth="2" />
        <ellipse cx="40" cy="25" rx="16" ry="11" className="fill-indigo-100 stroke-indigo-600" strokeWidth="2" />
        <text x="40" y="27" textAnchor="middle" className="text-[10px] font-bold fill-indigo-900">B</text>
        <text x="17" y="20" className="text-[11px] font-black fill-blue-700">A</text>
      </svg>
    ),
    explanation: 'Akkor mondjuk, hogy B ⊆ A, ha B minden eleme egyúttal A-nak is eleme. Venn-diagramon a B halmaz karikája teljes egészében az A karikáján belül helyezkedik el.',
    hint: 'Gondolj egy kisebb körre a nagyobb körön belül!',
    breakdown: [
      { label: 'Részhalmaz definíció', value: 'B minden eleme eleme A-nak is' },
      { label: 'Venn-diagram', value: 'B zárt vonala A-n belül van' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Melyik geometriai állítás IGAZ a részhalmazok szempontjából?',
    options: [
      'A négyzetek halmaza részhalmaza a téglalapok halmazának (Négyzetek ⊆ Téglalapok)',
      'A téglalapok halmaza részhalmaza a négyzetek halmazának (Téglalapok ⊆ Négyzetek)',
      'A háromszögek halmaza részhalmaza a négyszögek halmazának',
      'A körök halmaza részhalmaza a sokszögek halmazának'
    ],
    correctAnswer: 0,
    explanation: 'Minden négyzet egyben téglalap is (mert 4 oldala és 4 derékszöge van), ezért a négyzetek halmaza valódi részhalmaza a téglalapoknak. Fordítva nem igaz: nem minden téglalap négyzet!',
    hint: 'Gondold végig: minden négyzet rendelkezik a téglalap összes tulajdonságával?',
    breakdown: [
      { label: 'Minden négyzet téglalap?', value: 'IGEN (4 derékszög)' },
      { label: 'Minden téglalap négyzet?', value: 'NEM (nem minden oldal egyenlő)' },
      { label: 'Következtetés', value: 'Négyzetek ⊆ Téglalapok' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik a helyes részhalmaz-láncolat a geometriai alakzatok között a legbővebbtől a legszűkebbig?',
    options: [
      'Síkidomok ⊃ Sokszögek ⊃ Négyszögek ⊃ Téglalapok ⊃ Négyzetek',
      'Négyzetek ⊃ Téglalapok ⊃ Négyszögek ⊃ Sokszögek ⊃ Síkidomok',
      'Síkidomok ⊃ Háromszögek ⊃ Négyszögek ⊃ Négyzetek',
      'Sokszögek ⊃ Körök ⊃ Négyzetek ⊃ Kockák'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 65" fill="none">
        <ellipse cx="50" cy="32" rx="48" ry="30" className="fill-slate-50 stroke-slate-400" strokeWidth="1.5" />
        <ellipse cx="54" cy="34" rx="38" ry="24" className="fill-blue-50 stroke-blue-400" strokeWidth="1.5" />
        <ellipse cx="58" cy="36" rx="28" ry="18" className="fill-emerald-50 stroke-emerald-500" strokeWidth="1.5" />
        <ellipse cx="62" cy="38" rx="18" ry="12" className="fill-amber-50 stroke-amber-500" strokeWidth="1.5" />
        <ellipse cx="66" cy="40" rx="9" ry="6" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
        <text x="14" y="24" className="text-[7px] font-bold fill-slate-600">Sík</text>
        <text x="24" y="30" className="text-[7px] font-bold fill-blue-700">Sokszög</text>
        <text x="36" y="38" className="text-[7px] font-bold fill-emerald-800">4-szög</text>
      </svg>
    ),
    explanation: 'A legbővebb a síkidomok halmaza, ezen belül vannak a sokszögek, azon belül a 4 oldalú négyszögek, azon belül a 4 derékszögű téglalapok, és legbelül a 4 egyenlő oldalú négyzetek.',
    hint: 'Minden négyzet téglalap, minden téglalap négyszög, minden négyszög sokszög, minden sokszög síkidom.',
    breakdown: [
      { label: 'Legszűkebb speciális halmaz', value: 'Négyzetek' },
      { label: 'Legtágabb általános halmaz', value: 'Síkidomok' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Ha B ⊆ A (B részhalmaza A-nak), akkor mivel egyenlő a metszetük: A ∩ B?',
    options: [
      'A ∩ B = B (maga a szűkebb B halmaz)',
      'A ∩ B = A (maga a tágabb A halmaz)',
      'A ∩ B = ∅ (mindig üres halmaz)',
      'A ∩ B = U (az alaphalmaz)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel B minden eleme benne van A-ban is, ezért az összes B-beli elem közös mindkét halmazban. Tehát a metszetük pontosan maga a B halmaz.',
    hint: 'Gondolj a téglalapokra és négyzetekre: Téglalapok ∩ Négyzetek = Négyzetek!',
    breakdown: [
      { label: 'B minden eleme közös', value: 'A ∩ B = B' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Ha B ⊆ A (B részhalmaza A-nak), akkor mivel egyenlő az uniójuk: A ∪ B?',
    options: [
      'A ∪ B = A (maga a tágabb A halmaz)',
      'A ∪ B = B (maga a szűkebb B halmaz)',
      'A ∪ B = ∅',
      'A ∪ B = A + B'
    ],
    correctAnswer: 0,
    explanation: 'Mivel B elemei már eleve benne vannak az A halmazban, a B hozzáadása az egyesítéshez nem hoz új elemet, így A ∪ B = A.',
    hint: 'Téglalapok ∪ Négyzetek = Téglalapok, hiszen a négyzetek már eleve téglalapok!',
    breakdown: [
      { label: 'Egyesítés eredménye', value: 'A ∪ B = A' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Mi a Téglalapok és a Rombuszok halmazának metszete?',
    options: [
      'A Négyzetek halmaza',
      'A Háromszögek halmaza',
      'Üres halmaz, mert nem metszik egymást',
      'A Trapézok halmaza'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-28 h-16 mx-auto" viewBox="0 0 90 50" fill="none">
        <circle cx="34" cy="25" r="20" className="stroke-blue-500" strokeWidth="1.5" />
        <circle cx="56" cy="25" r="20" className="stroke-amber-500" strokeWidth="1.5" />
        <rect x="42" y="21" width="8" height="8" className="fill-emerald-400 stroke-emerald-700" strokeWidth="1" />
        <text x="14" y="15" className="text-[8px] font-bold fill-blue-700">Téglalap (90°)</text>
        <text x="56" y="15" className="text-[8px] font-bold fill-amber-700">Rombusz (= oldal)</text>
      </svg>
    ),
    explanation: 'A téglalapnak minden szöge 90°, a rombusznak minden oldala egyenlő. A közös metszetben azok a négyszögek vannak, amelyeknek minden szöge 90° ÉS minden oldala egyenlő: ezek pontosan a NÉGYZETEK!',
    hint: 'Milyen alakzat az, amelyik egyszerre téglalap is és rombusz is?',
    breakdown: [
      { label: 'Téglalap tulajdonsága', value: 'Minden szöge 90° (derékszög)' },
      { label: 'Rombusz tulajdonsága', value: 'Minden oldala egyenlő hosszúságú' },
      { label: 'Metszetük (mindkettő)', value: 'Négyzet' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Részhalmaza-e minden halmaz önmagának? (Vagyis igaz-e, hogy A ⊆ A?)',
    options: [
      'Igen, minden halmaz részhalmaza önmagának',
      'Nem, egy halmaz soha nem lehet részhalmaza saját magának',
      'Csak akkor, ha a halmaz üres',
      'Csak a végtelen halmazoknál igaz'
    ],
    correctAnswer: 0,
    explanation: 'A definíció szerint B ⊆ A akkor teljesül, ha B minden eleme benne van A-ban. Mivel A minden eleme magától értetődően benne van A-ban, ezért minden A halmazra igaz, hogy A ⊆ A.',
    hint: 'Tartalmazza-e az A halmaz saját maga minden egyes elemét? Természetesen igen!',
    breakdown: [
      { label: 'Reflexív tulajdonság', value: 'A ⊆ A mindig igaz' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Részhalmaza-e az üres halmaz (∅) bármely A halmaznak?',
    options: [
      'Igen, az üres halmaz minden halmaznak részhalmaza (∅ ⊆ A)',
      'Nem, az üres halmaz semminek sem lehet részhalmaza',
      'Csak az üres halmaznak lehet részhalmaza',
      'Csak a páros számok halmazának lehet részhalmaza'
    ],
    correctAnswer: 0,
    explanation: 'Az üres halmaznak nincs egyetlen olyan eleme sem, ami ne lenne benne A-ban (hiszen nincs eleme!), így a részhalmaz definíciója szerint ∅ ⊆ A bármely A halmaz esetén igaz.',
    hint: 'Ez a halmazelmélet egyik fontos alapaxiómája: az üres halmaz minden halmaznak részhalmaza.',
    breakdown: [
      { label: 'Alapszabály', value: '∅ ⊆ A minden A-ra' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Ha az alaphalmaz U = {Síkidomok}, és A = {Sokszögek}, akkor mi az A komplementere (A\')?',
    options: [
      'A nem sokszög alakú síkidomok halmaza (pl. a kör és az ellipszis)',
      'A kockák és gömbök halmaza',
      'A háromszögek halmaza',
      'Az üres halmaz'
    ],
    correctAnswer: 0,
    explanation: 'Az A komplementere az alaphalmaz azon elemei, amelyek nincsenek benne A-ban. Ha az alaphalmaz a síkidomok, és kivesszük a sokszögeket, a görbe vonalú síkidomok (pl. kör, ellipszis) maradnak meg.',
    hint: 'Milyen síkidomok vannak a sokszögeken kívül?',
    breakdown: [
      { label: 'Alaphalmaz (U)', value: 'Minden síkidom' },
      { label: 'A halmaz', value: 'Sokszögek (egyenes határvonalúak)' },
      { label: 'A\' (komplementer)', value: 'Görbe határvonalú síkidomok (pl. kör)' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Legyen A = {Páros oldalszámú sokszögek} és B = {3-nál több oldalú sokszögek}. Melyik alakzat tartozik A ∩ B-be?',
    options: [
      'Hatszög (6 oldal: páros ÉS 3-nál több)',
      'Háromszög (3 oldal: páratlan és nem több 3-nál)',
      'Ötszög (5 oldal: páratlan)',
      'Kör (nem sokszög)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <polygon points="12,5 28,5 36,20 28,35 12,35 4,20" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
        <circle cx="12" cy="5" r="2" className="fill-purple-700" />
        <circle cx="28" cy="5" r="2" className="fill-purple-700" />
        <circle cx="36" cy="20" r="2" className="fill-purple-700" />
        <circle cx="28" cy="35" r="2" className="fill-purple-700" />
        <circle cx="12" cy="35" r="2" className="fill-purple-700" />
        <circle cx="4" cy="20" r="2" className="fill-purple-700" />
      </svg>
    ),
    explanation: 'A metszethez mindkét feltételnek teljesülnie kell: az oldalszámnak párosnak kell lennie ÉS nagyobbnak 3-nál. A hatszögnek 6 oldala van (páros és 6 > 3), így eleme a metszetnek.',
    hint: 'A hatszögnek 6 oldala van. Páros a 6? Nagyobb a 3-nál?',
    breakdown: [
      { label: 'Hatszög oldalai', value: '6 oldal' },
      { label: 'Páros? (A)', value: 'Igen (6 páros)' },
      { label: '> 3 oldal? (B)', value: 'Igen (6 > 3)' },
      { label: 'Eredmény', value: 'Hatszög ∈ A ∩ B' }
    ]
  }
];

const levelConfigs: Record<1 | 2 | 3, any> = {
  1: {
    title: '1. Szint: Alapfogalmak és jelölések',
    description: 'Halmaz fogalma, eleme (∈), nem eleme (∉), üres halmaz (∅), Venn-diagram alapjai',
    passingScore: 70
  },
  2: {
    title: '2. Szint: Venn-diagramok és halmazműveletek',
    description: 'Két halmaz metszete (∩), uniója (∪), diszjunkt halmazok és alakzatok elhelyezése',
    passingScore: 70
  },
  3: {
    title: '3. Szint: Részhalmazok és geometriai rendszerezés',
    description: 'Részhalmaz-hierarchia (⊆), négyszögek és sokszögek összefüggései, komplementer halmaz',
    passingScore: 70
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'symbols',
    title: 'Halmazelméleti alapszimbólumok',
    color: 'border-purple-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>a ∈ A:</strong> az „a” elem beletartozik az A halmazba (eleme).</p>
        <p><strong>b ∉ A:</strong> a „b” elem nem tartozik bele az A halmazba (nem eleme).</p>
        <p><strong>∅ vagy { }:</strong> üres halmaz (nincs egyetlen eleme sem).</p>
        <p><strong>|A|:</strong> a halmaz számossága (elemeinek száma).</p>
        <p><strong>U:</strong> alaphalmaz (univerzum, a vizsgálat teljes kerete).</p>
      </div>
    )
  },
  {
    id: 'operations',
    title: 'Halmazműveletek Venn-diagramon',
    color: 'border-blue-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>Metszet (A ∩ B):</strong> mindkét halmaz közös elemei („ÉS”).</p>
        <p><strong>Unió (A ∪ B):</strong> legalább az egyik halmazba tartozó elemek („VAGY”).</p>
        <p><strong>Különbség (A \ B):</strong> A azon elemei, amelyek nincsenek B-ben.</p>
        <p><strong>Diszjunkt halmazok:</strong> nincs közös elemük, A ∩ B = ∅ (különálló körök).</p>
      </div>
    )
  },
  {
    id: 'hierarchy',
    title: 'Geometriai részhalmaz-hierarchia',
    color: 'border-emerald-500',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>B ⊆ A (részhalmaz):</strong> B minden eleme egyben A-nak is eleme.</p>
        <p className="font-semibold text-emerald-700 dark:text-emerald-400">
          Négyzetek ⊆ Téglalapok ⊆ Négyszögek ⊆ Sokszögek ⊆ Síkidomok
        </p>
        <p className="italic text-[11px] text-slate-500">
          Minden négyzet téglalap, de nem minden téglalap négyzet!
        </p>
      </div>
    )
  }
];

export const SetsQuiz: React.FC<SetsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-geom-sets-quiz"
      title="Halmazok Kvíz és Gyakorlás"
      subtitle="Gyakorold a halmazokat, a Venn-diagramokat és a geometriai rendszerezést 3 nehézségi szinten!"
      badge="📐 5. Osztály • III. Geometria"
      themeColor="purple"
      levels={levelConfigs}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó kártyapárokat!',
          description: 'Párosítsd a halmazelméleti jeleket, metszeteket és geometriai csoportokat 3 nehézségi szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <SetsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét az alakzatokat Venn-régiók és halmazok szerint!',
          description: 'Rendezd az alakzatokat eleme/nem eleme, Venn-metszet vagy hierarchia alapján!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <SetsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default SetsQuiz;
