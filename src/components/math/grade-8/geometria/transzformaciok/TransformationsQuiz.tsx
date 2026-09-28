import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  Sparkles,
  RotateCw,
  Target,
  Compass,
  Shapes,
  Maximize2,
  RefreshCw,
  Calculator,
  ArrowRightLeft,
  LayoutGrid,
  GitCompare,
  Layers
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { TransformationsMatcher } from './TransformationsMatcher';
import { TransformationsSorter } from './TransformationsSorter';

interface TransformationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Fixpont és Fixegyenes',
    icon: <Target className="w-4 h-4 text-teal-600" />,
    formula: "P' = P (Fixpont)  |  \\forall P \\in e: P' = P (Fixegyenes)",
    note: 'A fixegyenes minden pontja fixpont. Az invariáns egyenesnél e\' = e ponthalmazként, de a pontok elmozdulhatnak rajta.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="140" y2="22" className="stroke-teal-600 stroke-[2.5]" />
        <circle cx="50" cy="22" r="3" className="fill-teal-700" />
        <circle cx="110" cy="22" r="3" className="fill-teal-700" />
        <text x="55" y="15" className="text-[7px] font-bold fill-teal-900">P=P'</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Invariáns Egyenesek',
    icon: <Compass className="w-4 h-4 text-purple-600" />,
    formula: "Tengelyes: e \\perp t  |  Középpontos: e \\ni O  |  Eltolás: e \\parallel \\vec{v}",
    note: 'Tengelyesnél a tengelyre merőlegesek, középpontosnál az O-n átmenők, eltolásnál a vektorral párhuzamosak invariánsak.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="40" y1="5" x2="40" y2="40" stroke="#0d9488" strokeWidth="2" />
        <line x1="10" y1="22" x2="70" y2="22" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="120" cy="22" r="3.5" fill="#f59e0b" />
        <line x1="95" y1="12" x2="145" y2="32" stroke="#a855f7" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Fixpontok száma',
    icon: <Shapes className="w-4 h-4 text-amber-600" />,
    formula: 'Eltolás: 0  |  Középpontos/Forgatás: 1  |  Tengelyes: \\infty',
    note: 'Az identitásnak a sík minden pontja fixpontja és minden egyenese fixegyenes.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <text x="15" y="26" className="text-[8px] font-mono font-bold fill-slate-700">0 db | 1 db | végtelen</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Körüljárási irány (Orientáció)',
    icon: <RotateCw className="w-4 h-4 text-emerald-600" />,
    formula: 'Tengelyes: MEGFORDÍTJA (indirekt) | Többi: MEGŐRZI (direkt)',
    note: 'Két tengelyes tükrözés egymásutánja metsző tengelyeknél 2α forgatás, párhuzamos tengelyeknél 2d eltolás.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="80" y1="5" x2="80" y2="40" className="stroke-slate-400 stroke-[1.5]" />
        <text x="35" y="27" className="text-[10px] font-bold fill-emerald-700">↺</text>
        <text x="115" y="27" className="text-[10px] font-bold fill-indigo-700">↻</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Fixpontok',
    subtitle: 'A transzformáció definíciója, fixpontok és fixegyenesek alapjai',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Fixpontok',
    questions: [
      {
        id: 'q1',
        title: 'A geometriai transzformáció fogalma',
        question: 'Mi a sík geometriai transzformációjának (leképezésének) a pontos matematikai jelentése?',
        options: [
          'Egy olyan hozzárendelés, amely a sík minden P pontjához egyértelműen hozzárendeli a sík egy P\' képpontját.',
          'Bármilyen elmozdulás, amely a síkot nagyítja vagy kicsinyíti.',
          'Egy olyan művelet, amely csak a sokszögek csúcsait változtatja meg.',
          'Kizárólag a derékszögű koordináta-rendszer tengelyeinek elforgatása.'
        ],
        correctAnswer: 'Egy olyan hozzárendelés, amely a sík minden P pontjához egyértelműen hozzárendeli a sík egy P\' képpontját.',
        explanation: 'A síkbeli geometriai transzformáció a sík pontjain értelmezett egyértelmű függvény (leképezés): P ↦ P\'.',
        breakdown: [
          { label: 'Definíció', value: 'Minden P ponthoz pontosan egy P\' pont tartozik' },
          { label: 'Tárgy és kép', value: 'P: tárgypont, P\': képpont' }
        ]
      },
      {
        id: 'q2',
        title: 'A fixpont definíciója',
        question: 'Mikor nevezünk egy P pontot a transzformáció fixpontjának?',
        options: [
          'Ha a transzformáció önmagába viszi át, azaz a képpont megegyezik a tárgyponttal: P\' = P.',
          'Ha a pont az origóban helyezkedik el.',
          'Ha a pont távolsága a tengelytől pontosan 1 egység.',
          'Ha a pontnak nincs képe a leképezés során.'
        ],
        correctAnswer: 'Ha a transzformáció önmagába viszi át, azaz a képpont megegyezik a tárgyponttal: P\' = P.',
        explanation: 'A fixpont olyan pont, amely a leképezés során „helyben marad”: P\' = P.',
        breakdown: [
          { label: 'Matematikai feltétel', value: "P' = P" },
          { label: 'Jelentése', value: 'A pont helyzete változatlan marad' }
        ]
      },
      {
        id: 'q3',
        title: 'A fixegyenes fogalma',
        question: 'Mit jelent pontosan az, hogy egy e egyenes fixegyenes egy geometriai transzformációban?',
        options: [
          'Az egyenes minden egyes pontja fixpont (pontonként fix: minden P ∈ e esetén P\' = P).',
          'Az egyenes nem mozdul el, de a pontjai tetszőlegesen elcsúszhatnak rajta.',
          'Az egyenes merőleges a koordináta-tengelyre.',
          'Az egyenesnek pontosan 2 fixpontja van.'
        ],
        correctAnswer: 'Az egyenes minden egyes pontja fixpont (pontonként fix: minden P ∈ e esetén P\' = P).',
        explanation: 'A fixegyenesen a pontok nem mozognak: minden pontja önmaga képe. Például a tengelyes tükrözésnél a tükörtengely az egyetlen fixegyenes.',
        breakdown: [
          { label: 'Fixegyenes', value: "Minden P ∈ e esetén P' = P (pontonként fix)" }
        ]
      },
      {
        id: 'q4',
        title: 'Az invariáns egyenes fogalma',
        question: 'Mi a különbség az invariáns egyenes és a fixegyenes között?',
        options: [
          'Az invariáns egyenes mint ponthalmaz önmagára képződik (e\' = e), de a pontjai elmozdulhatnak az egyenesen belül; a fixegyenesen viszont minden pont helyben marad.',
          'Az invariáns egyenes görbe vonal, a fixegyenes egyenes.',
          'Nincs különbség, a két fogalom teljesen azonos jelentésű.',
          'Az invariáns egyenes nem képezhető le a síkon.'
        ],
        correctAnswer: 'Az invariáns egyenes mint ponthalmaz önmagára képződik (e\' = e), de a pontjai elmozdulhatnak az egyenesen belül; a fixegyenesen viszont minden pont helyben marad.',
        explanation: 'Minden fixegyenes invariáns egyenes is, de visszafelé nem igaz: egy invariáns egyenes pontjai átcserélődhetnek vagy elcsúszhatnak az egyenesen belül.',
        breakdown: [
          { label: 'Invariáns egyenes', value: "e' = e mint ponthalmaz" },
          { label: 'Fixegyenes', value: "Minden pontja fixpont (szigorúbb feltétel)" }
        ]
      },
      {
        id: 'q5',
        title: 'Tengelyes tükrözés fixpontjai',
        question: 'Hány fixpontja van a tengelyes tükrözésnek a síkban?',
        options: [
          'Végtelen sok (a tükörtengely minden pontja fixpont).',
          'Pontosan 1 fixpontja van.',
          'Nincs egyetlen fixpontja sem.',
          'Pontosan 2 fixpontja van.'
        ],
        correctAnswer: 'Végtelen sok (a tükörtengely minden pontja fixpont).',
        explanation: 'A tengelyes tükrözésnél a tükörtengely minden pontja a helyén marad, a tengelyen kívüli pontok viszont mind átkerülnek a túloldalra.',
        breakdown: [
          { label: 'Tengely pontjai', value: 'Végtelen sok pont a t egyenesen' },
          { label: 'Fixpontok száma', value: 'Végtelen sok' }
        ]
      },
      {
        id: 'q6',
        title: 'Párhuzamos eltolás fixpontjai',
        question: 'Hány fixpontja van egy nullvektortól különböző párhuzamos eltolásnak (v⃗ ≠ 0)?',
        options: [
          '0 darab (nincs egyetlen fixpontja sem).',
          '1 darab (az origó).',
          'Végtelen sok.',
          'Pontosan a vektor végpontja.'
        ],
        correctAnswer: '0 darab (nincs egyetlen fixpontja sem).',
        explanation: 'Ha v⃗ ≠ 0, akkor minden síkbeli pont elmozdul |v⃗| távolsággal a v⃗ irányában, így egyetlen pont sem maradhat a helyén.',
        breakdown: [
          { label: 'Eltolás feltétele', value: "P' = P + v⃗" },
          { label: 'v⃗ ≠ 0 esetén', value: "P' ≠ P minden pontra ⟹ 0 fixpont" }
        ]
      },
      {
        id: 'q7',
        title: 'Középpontos tükrözés fixpontjai',
        question: 'Hány fixpontja van egy O pontra vonatkozó középpontos tükrözésnek?',
        options: [
          'Pontosan 1 fixpontja van (az O tükörközéppont).',
          '0 darab.',
          'Végtelen sok fixpontja van.',
          '2 fixpontja van.'
        ],
        correctAnswer: 'Pontosan 1 fixpontja van (az O tükörközéppont).',
        explanation: 'Középpontos tükrözésnél kizárólag a tükrözés középpontja (O) marad helyben (O\' = O). Minden más P pont átfordul a túloldalra.',
        breakdown: [
          { label: 'Fixpont', value: 'Kizárólag az O centrum (1 db)' },
          { label: 'Fixegyenes', value: '0 db (egyetlen fixegyenes sincs!)' }
        ]
      },
      {
        id: 'q8',
        title: 'Identitás (helybenhagyás)',
        question: 'Melyik geometriai transzformációnak van a síkban végtelen sok fixegyenese?',
        options: [
          'Az identikus transzformációnak (helybenhagyásnak).',
          'A tengelyes tükrözésnek.',
          'A középpontos tükrözésnek.',
          'A 90°-os elforgatásnak.'
        ],
        correctAnswer: 'Az identikus transzformációnak (helybenhagyásnak).',
        explanation: 'Az identikus leképezés (helybenhagyás) a sík minden pontját önmagához rendeli, ezért a sík minden egyenese fixegyenes.',
        breakdown: [
          { label: 'Identitás', value: "Minden P: P' = P" },
          { label: 'Fixegyenesek száma', value: 'A sík összes egyenese (végtelen sok)' }
        ]
      },
      {
        id: 'q9',
        title: 'Alakzat képe',
        question: 'Egy sokszög képe tengelyes tükrözés után milyen alakzat lesz?',
        options: [
          'Az eredetivel egybevágó sokszög, azonos oldalhosszakkal és szögekkel, de megfordított körüljárási iránnyal.',
          'Nagyobb területű sokszög.',
          'Minden esetben derékszögű sokszög.',
          'Kör alakúvá torzul.'
        ],
        correctAnswer: 'Az eredetivel egybevágó sokszög, azonos oldalhosszakkal és szögekkel, de megfordított körüljárási iránnyal.',
        explanation: 'Mivel a tengelyes tükrözés egybevágósági transzformáció, az alakzat mérete és alakja változatlan (egybevágó), csupán a körüljárási iránya fordul meg.',
        breakdown: [
          { label: 'Egybevágóság', value: 'Oldalak és szögek változatlanok' },
          { label: 'Orientáció', value: 'Megfordul (indirekt)' }
        ]
      },
      {
        id: 'q10',
        title: 'Forgatás fixpontja',
        question: 'Egy O pont körüli 60°-os elforgatásnak hány fixpontja van?',
        options: [
          'Pontosan 1 fixpontja van (az O forgáscentrum).',
          '0 darab.',
          'Végtelen sok.',
          '6 darab (a 360° / 60° miatt).'
        ],
        correctAnswer: 'Pontosan 1 fixpontja van (az O forgáscentrum).',
        explanation: 'Bármely nem teljes (α ≠ k · 360°) elforgatás esetén kizárólag a forgatás O középpontja marad helyben, így pontosan 1 fixpont létezik.',
        breakdown: [
          { label: 'Forgásközéppont', value: 'O fixpont (O\' = O)' },
          { label: 'Többi pont', value: 'Köríven elmozdul 60°-kal' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Invariáns Egyenesek és Leképezési Szabályok',
    subtitle: 'Invariáns egyenesek felismerése és transzformációk tulajdonságai',
    range: '11 - 20. feladat',
    focus: 'Invariáns egyenesek & Tulajdonságok',
    questions: [
      {
        id: 'q11',
        title: 'Tengelyes tükrözés invariáns egyenesei',
        question: 'A t tükörtengelyen kívül mely egyenesek invariánsak még a tengelyes tükrözés során?',
        options: [
          'A t tükörtengelyre merőleges összes egyenes.',
          'A t tükörtengellyel párhuzamos egyenesek.',
          'A t tengellyel 45°-os szöget bezáró egyenesek.',
          'Egyetlen más egyenes sem invariáns.'
        ],
        correctAnswer: 'A t tükörtengelyre merőleges összes egyenes.',
        explanation: 'Bármely a tengelyre merőleges egyenes pontjai a tengelyre nézve átfordulnak a túloldalra, de maga az egyenes vonala önmagába képződik (e\' = e).',
        breakdown: [
          { label: 'Fixegyenes', value: 'Maga a t tengely' },
          { label: 'További invariánsok', value: 'Minden e ⊥ t merőleges egyenes' }
        ]
      },
      {
        id: 'q12',
        title: 'Középpontos tükrözés invariáns egyenesei',
        question: 'Középpontos tükrözésnél (O centrum) mely egyenesek képe lesz önmaga (invariáns egyenes)?',
        options: [
          'Az O tükörközépponton áthaladó összes egyenes.',
          'Minden vízszintes egyenes.',
          'Csak azok, amelyek nem metszik az O pontot.',
          'Nincsenek invariáns egyenesei.'
        ],
        correctAnswer: 'Az O tükörközépponton áthaladó összes egyenes.',
        explanation: 'Ha egy e egyenes áthalad az O ponton, akkor bármely rajta fekvő P pont tükörképe szintén az e egyenesre esik (az O túloldalán), így e\' = e.',
        breakdown: [
          { label: 'Feltétel', value: 'e ∋ O (az egyenes tartalmazza a centrumot)' },
          { label: 'Tulajdonság', value: 'Invariáns, de NEM fixegyenes (pontjai átfordulnak)' }
        ]
      },
      {
        id: 'q13',
        title: 'Párhuzamos eltolás invariáns egyenesei',
        question: 'Párhuzamos eltolás során (v⃗ ≠ 0) mely egyenesek invariánsak?',
        options: [
          'A v⃗ eltolásvektorral párhuzamos egyenesek.',
          'A v⃗ eltolásvektorra merőleges egyenesek.',
          'Minden egyenes invariáns.',
          'Egyetlen egyenes sem invariáns.'
        ],
        correctAnswer: 'A v⃗ eltolásvektorral párhuzamos egyenesek.',
        explanation: 'Az eltolásvektor irányában fekvő egyenesek mentén a pontok csak csúsznak az egyenes vonalán belül, így az egyenes ponthalmazként önmagára képződik.',
        breakdown: [
          { label: 'Feltétel', value: 'e ∥ v⃗' },
          { label: 'Invariáns egyenesek', value: 'A vektor irányával párhuzamos egyenesek' }
        ]
      },
      {
        id: 'q14',
        title: 'Forgatás invariáns alakzatai',
        question: 'Egy O pont körüli 90°-os elforgatásnak mik az invariáns alakzatai a síkon?',
        options: [
          'Az O középpontú koncentrikus körök mindegyike.',
          'Az O ponton átmenő egyenesek.',
          'A négyzetek és téglalapok.',
          'Minden síkbeli kör.'
        ],
        correctAnswer: 'Az O középpontú koncentrikus körök mindegyike.',
        explanation: 'Mivel a pontok távolsága az O-tól változatlan, egy O középpontú k(O, r) kör minden pontja elfordul 90°-kal a köríven, de a kör maga helyben marad.',
        breakdown: [
          { label: 'Invariáns körök', value: 'k(O, r) koncentrikus körök' },
          { label: 'Egyenesek', value: 'Nincs invariáns egyenes (mind elfordul 90°-kal)' }
        ]
      },
      {
        id: 'q15',
        title: 'Függőleges tengely invariánsai',
        question: 'Az x = 3 függőleges egyenesre tükrözünk. Mely egyenesek invariánsak ezen kívül?',
        options: [
          'A vízszintes (y = konstans) egyenesek mindegyike.',
          'A függőleges (x = konstans) egyenesek mindegyike.',
          'Csak az origón átmenő egyenesek.',
          'Az y = x egyenes.'
        ],
        correctAnswer: 'A vízszintes (y = konstans) egyenesek mindegyike.',
        explanation: 'A függőleges x = 3 tengelyre merőleges egyenesek a vízszintes y = c egyenesek, így ezek mind invariáns egyenesek.',
        breakdown: [
          { label: 'Tengely', value: 'x = 3 (függőleges)' },
          { label: 'Merőlegesek rá', value: 'y = c (vízszintes egyenesek)' }
        ]
      },
      {
        id: 'q16',
        title: 'Körüljárási irány megváltozása',
        question: 'Melyik az egyetlen alapvető egybevágósági transzformáció, amely MEGFORDÍTJA a síkban a körüljárási irányt (indirekt)?',
        options: [
          'A tengelyes tükrözés.',
          'A középpontos tükrözés.',
          'A forgatás.',
          'A párhuzamos eltolás.'
        ],
        correctAnswer: 'A tengelyes tükrözés.',
        explanation: 'Az eltolás, a forgatás és a középpontos tükrözés mind direkt egybevágóságok (megőrzik az orientációt). Egyedül a tengelyes tükrözés fordítja meg a körüljárást.',
        breakdown: [
          { label: 'Direkt (iránytartó)', value: 'Eltolás, Forgatás, Középpontos tükrözés' },
          { label: 'Indirekt (irányváltó)', value: 'Tengelyes tükrözés' }
        ]
      },
      {
        id: 'q17',
        title: 'Tengellyel párhuzamos egyenes képe',
        question: 'Ha egy e egyenes párhuzamos a t tükörtengellyel (e ∥ t), akkor mi lesz a képe a tengelyes tükrözésnél?',
        options: [
          'Egy a t-vel párhuzamos egyenes a túloldalon, a tengelytől azonos távolságra (e\' ∥ t, d(e\', t) = d(e, t)).',
          'Maga az e egyenes (invariáns marad).',
          'Egy a t-re merőleges egyenes.',
          'Egyetlen ponttá zsugorodik.'
        ],
        correctAnswer: 'Egy a t-vel párhuzamos egyenes a túloldalon, a tengelytől azonos távolságra (e\' ∥ t, d(e\', t) = d(e, t)).',
        explanation: 'Párhuzamosságtartás miatt e\' is párhuzamos t-vel, távolságtartás miatt pedig ugyanolyan messze lesz a túloldalon (e\' ≠ e, tehát NEM invariáns!).',
        breakdown: [
          { label: 'Párhuzamosság', value: "e ∥ t ⟹ e' ∥ t" },
          { label: 'Elhelyezkedés', value: 'A túloldalon, azonos távolságra' }
        ]
      },
      {
        id: 'q18',
        title: 'Koordináta-tükrözés origóra',
        question: 'Egy P(4; -3) pontot tükrözünk az origóra. Mik lesznek a képpont P\' koordinátái?',
        options: [
          'P\'(-4; 3)',
          'P\'(4; 3)',
          'P\'(-4; -3)',
          'P\'(-3; 4)'
        ],
        correctAnswer: "P'(-4; 3)",
        explanation: 'Origóra vonatkozó középpontos tükrözésnél mindkét koordináta az ellentettjére változik: (x; y) ↦ (-x; -y). Így (4; -3) ↦ (-4; 3).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (-x; -y)' },
          { label: 'Számítás', value: 'x\' = -4, y\' = -(-3) = 3' }
        ]
      },
      {
        id: 'q19',
        title: 'Koordináta-tükrözés x tengelyre',
        question: 'Egy P(2; 5) pontot tükrözünk az x tengelyre. Mik lesznek a P\' koordinátái?',
        options: [
          'P\'(2; -5)',
          'P\'(-2; 5)',
          'P\'(-2; -5)',
          'P\'(5; 2)'
        ],
        correctAnswer: "P'(2; -5)",
        explanation: 'Az x tengelyre tükrözve a vízszintes helyzet (x) nem változik, a függőleges (y) ellentettjére vált: (x; y) ↦ (x; -y).',
        breakdown: [
          { label: 'Szabály', value: '(x; y) ↦ (x; -y)' },
          { label: 'Eredmény', value: "P'(2; -5)" }
        ]
      },
      {
        id: 'q20',
        title: 'Tengelyes tükrözés szakaszfelező merőlegesre',
        question: 'Ha az AB szakasz felezőmerőlegesére tükrözzük a síkot, mi lesz az A pont képe?',
        options: [
          'A B pont (A\' = B és B\' = A).',
          'Maga az A pont.',
          'A szakasz felezőpontja.',
          'A sík tetszőleges pontja.'
        ],
        correctAnswer: 'A B pont (A\' = B és B\' = A).',
        explanation: 'Mivel a felezőmerőleges merőleges az AB szakaszra és felezi azt, a tükrözés pontosan az A és B pontokat cseréli fel egymással.',
        breakdown: [
          { label: 'Felezőmerőleges', value: 'Merőlegesen felezi az AB szakaszt' },
          { label: 'Kép', value: "A' = B és B' = A" }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Invariánsok, Kompozíciók és Felvételi Tételek',
    subtitle: 'Transzformációk összetétele, tételek és invariánsok magas szinten',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Felvételi kihívások',
    questions: [
      {
        id: 'q21',
        title: 'Hasonlóságban NEM invariáns tulajdonságok',
        question: 'Mely geometriai tulajdonság NEM invariáns egy általános (λ ≠ 1) hasonlósági transzformáció során?',
        options: [
          'A szakaszok abszolút hossza és a sokszögek területe.',
          'A szögek nagysága.',
          'Az egyenesség és az illeszkedés.',
          'A párhuzamosság.'
        ],
        correctAnswer: 'A szakaszok abszolút hossza és a sokszögek területe.',
        explanation: 'Hasonlóságnál az alakzat skálázódik: a hosszak λ-szorosukra, a területek λ²-szeresükre változnak, így nem invariánsak. A szögek és a párhuzamosság viszont invariánsak maradnak.',
        breakdown: [
          { label: 'Invariáns marad', value: 'Szögek, párhuzamosság, egyenesség' },
          { label: 'Nem invariáns', value: 'Hosszúság (|A\'B\'| = λ·|AB|), Terület (T\' = λ²·T)' }
        ]
      },
      {
        id: 'q22',
        title: 'Két metsző tengelyre tükrözés egymásutánja',
        question: 'Két, egymást egy O pontban α szögben metsző tengelyre történő egymás utáni tengelyes tükrözés egyenértékű egy...',
        options: [
          'O pont körüli 2α szögű elforgatással.',
          'Párhuzamos eltolással.',
          'Egyetlen tengelyes tükrözéssel.',
          'Középpontos tükrözéssel minden esetben.'
        ],
        correctAnswer: 'O pont körüli 2α szögű elforgatással.',
        explanation: 'Alaptétel: két metsző tengelyre tükrözés kompozíciója a metszéspont körüli elforgatás, a tengelyek hajlásszögének kétszeresével (2α).',
        breakdown: [
          { label: 'Tengelyek viszonya', value: 'Metsző tengelyek O pontban, α szögben' },
          { label: 'Eredmény', value: 'Forgatás O körül 2α szöggel' }
        ]
      },
      {
        id: 'q23',
        title: 'Két párhuzamos tengelyre tükrözés',
        question: 'Két párhuzamos, egymástól d távolságra lévő tengelyre történő egymás utáni tükrözés eredménye...',
        options: [
          'Párhuzamos eltolás a tengelyekre merőleges irányban, 2d hosszúságú vektorral.',
          'Középpontos tükrözés.',
          'Forgatás d szöggel.',
          'Identitás.'
        ],
        correctAnswer: 'Párhuzamos eltolás a tengelyekre merőleges irányban, 2d hosszúságú vektorral.',
        explanation: 'Alaptétel: két párhuzamos tengelyre való tükrözés kompozíciója párhuzamos eltolás, az elmozdulás mértéke a tengelyek távolságának kétszerese (2d).',
        breakdown: [
          { label: 'Tengelyek távolsága', value: 'd' },
          { label: 'Eredő elmozdulás', value: '2d hosszúságú párhuzamos eltolás' }
        ]
      },
      {
        id: 'q24',
        title: 'Két középpontos tükrözés kompozíciója',
        question: 'Két különböző pontra (O₁ ≠ O₂) vonatkozó középpontos tükrözés egymásutánja milyen transzformációt eredményez?',
        options: [
          'Párhuzamos eltolást, melynek hossza 2 · |O₁O₂|.',
          'Egy harmadik középpontos tükrözést.',
          'Tengelyes tükrözést.',
          '90°-os forgatást.'
        ],
        correctAnswer: 'Párhuzamos eltolást, melynek hossza 2 · |O₁O₂|.',
        explanation: 'Mivel mindkét középpontos tükrözés egy-egy 180°-os forgatásnak felel meg, az eredő elfordulás 180° + 180° = 360° (0°), ami párhuzamos eltolás, 2·|O₁O₂| nagyságú vektorral.',
        breakdown: [
          { label: 'Forgások összege', value: '180° + 180° = 360° ⟹ nincs elfordulás' },
          { label: 'Eredmény', value: 'Párhuzamos eltolás 2·|O₁O₂| vektorral' }
        ]
      },
      {
        id: 'q25',
        title: 'Merőleges tengelyek szimmetriája',
        question: 'Ha egy síkidomnak van két egymásra merőleges szimmetriatengelye (t₁ ⊥ t₂), akkor milyen szimmetriája van kötelezően még?',
        options: [
          'Középpontosan szimmetrikus a két tengely metszéspontjára.',
          'Van egy harmadik szimmetriatengelye is.',
          'Nincs semmilyen más szimmetriája.',
          'Bármely pontra nézve középpontosan szimmetrikus.'
        ],
        correctAnswer: 'Középpontosan szimmetrikus a két tengely metszéspontjára.',
        explanation: 'Két merőleges tengely hajlásszöge α = 90°. Az egymás utáni tükrözésük egy 2 · 90° = 180°-os forgatást ad a metszéspont körül, ami pontosan a középpontos tükrözés!',
        breakdown: [
          { label: 'Hajlásszög', value: 'α = 90°' },
          { label: 'Kompozíció', value: 'Forgatás 2 · 90° = 180°-kal ⟹ Középpontos szimmetria' }
        ]
      },
      {
        id: 'q26',
        title: 'Területváltozás hasonlóságnál',
        question: 'Egy háromszög területe 24 cm². Egy λ = 3 arányú középpontos hasonlósággal leképezzük. Mekkora lesz a képháromszög területe?',
        options: [
          '216 cm²',
          '72 cm²',
          '48 cm²',
          '144 cm²'
        ],
        correctAnswer: '216 cm²',
        explanation: 'Hasonlóságnál a területek a hasonlósági arány NÉGYZETÉVEL arányosak: T\' = λ² · T = 3² · 24 cm² = 9 · 24 cm² = 216 cm².',
        breakdown: [
          { label: 'Szabály', value: 'T\' = λ² · T' },
          { label: 'Számítás', value: 'T\' = 3² · 24 = 9 · 24 = 216 cm²' }
        ]
      },
      {
        id: 'q27',
        title: 'Három nem kollineáris fixpont',
        question: 'Egy távolságtartó síkbeli transzformációnak van három nem egy egyenesre eső fixpontja (A, B, C). Mi állítható biztosan a transzformációról?',
        options: [
          'Ez az identitás (a sík minden egyes pontja fixpont).',
          'Ez egy tengelyes tükrözés.',
          'Ez egy 180°-os forgatás.',
          'Csak annyi, hogy az ABC háromszög területe nem 0.'
        ],
        correctAnswer: 'Ez az identitás (a sík minden egyes pontja fixpont).',
        explanation: 'Ha három nem egy egyenesre illeszkedő pont távolságtartóan helyben marad, akkor a sík bármely más pontja egyértelműen meghatározott a három ponttól mért távolságával, így az egész sík minden pontja fixpont (identitás).',
        breakdown: [
          { label: 'Feltétel', value: '3 nem kollineáris fixpont + izometria' },
          { label: 'Következmény', value: 'Az egész sík helyben marad ⟹ Identitás' }
        ]
      },
      {
        id: 'q28',
        title: 'Középpontos tükrözés egyenese',
        question: 'Igaz-e az az állítás, hogy középpontos tükrözésnél a tükörközépponton áthaladó egyenes fixegyenes?',
        options: [
          'Hamis: az egyenes invariáns egyenes, de NEM fixegyenes, mert az O pont kivételével a pontjai átfordulnak a túloldalra.',
          'Igaz: mert minden egyenes, ami helyben marad, fixegyenes.',
          'Igaz: mert az egyenes nem mozog a síkban.',
          'Hamis: az egyenes egyáltalán nem marad önmaga képe.'
        ],
        correctAnswer: 'Hamis: az egyenes invariáns egyenes, de NEM fixegyenes, mert az O pont kivételével a pontjai átfordulnak a túloldalra.',
        explanation: 'A fixegyenesen minden pontnak helyben kell maradnia. A középponton átmenő egyenes pontjai átcserélődnek (P ↦ P\'), csak az O pont marad helyben, így nem fixegyenes.',
        breakdown: [
          { label: 'Pontonkénti fixitás', value: "Csak az O pontra igaz (P' ≠ P)" },
          { label: 'Kategória', value: 'Invariáns egyenes, de NEM fixegyenes' }
        ]
      },
      {
        id: 'q29',
        title: 'Párhuzamos képszakaszok',
        question: 'Egy AB szakasz és képe A\'B\' minden helyzetben párhuzamos egymással (AB ∥ A\'B\'). Melyik leképezésre IGAZ ez mindig?',
        options: [
          'A párhuzamos eltolásra és a középpontos tükrözésre.',
          'A tengelyes tükrözésre.',
          'Minden forgatásra.',
          'Csak a tengelyes tükrözésre.'
        ],
        correctAnswer: 'A párhuzamos eltolásra és a középpontos tükrözésre.',
        explanation: 'Eltolásnál minden szakasz párhuzamosan mozdul el. Középpontos tükrözésnél az alakzat 180°-kal fordul el, így bármely egyenes és képe párhuzamos (e ∥ e\'). Tengelyes tükrözésnél ez nem teljesül.',
        breakdown: [
          { label: 'Párhuzamos eltolás', value: "AB ∥ A'B' mindig teljesül" },
          { label: 'Középpontos tükrözés', value: "180°-os forgatás ⟹ AB ∥ A'B' mindig" }
        ]
      },
      {
        id: 'q30',
        title: 'Fixpont nélküli egybevágóságok',
        question: 'A sík egybevágósági transzformációi közül melyeknek nincs egyetlen fixpontja sem a síkban?',
        options: [
          'A nullvektortól különböző párhuzamos eltolásnak és a csúsztatva tükrözésnek.',
          'Kizárólag a 90°-os forgatásnak.',
          'A tengelyes tükrözésnek.',
          'Egyetlen egybevágóság sincs fixpont nélkül.'
        ],
        correctAnswer: 'A nullvektortól különböző párhuzamos eltolásnak és a csúsztatva tükrözésnek.',
        explanation: 'A párhuzamos eltolás (v⃗ ≠ 0) és a csúsztatva tükrözés (tengelyes tükrözés és tengelyirányú eltolás) olyan izometriák, amelyek egyetlen pontot sem hagynak helyben a síkon.',
        breakdown: [
          { label: 'Fixpont nélküli izometriák', value: 'Eltolás (v⃗ ≠ 0) és Csúsztatva tükrözés' },
          { label: 'Fixpontok száma', value: '0 db' }
        ]
      }
    ]
  }
};

export const TransformationsQuiz: React.FC<TransformationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-transforms"
      grade={8}
      chapterId="geometria"
      topicTitle="Transzformációk"
      emoji="🔀"
      topicBadge="8. Osztály • II. Geometria • 2. Témakör"
      badgeText="8. Osztály • Matematika"
      title="Transzformációk kvíz"
      subtitle="Invariánsok, fixpontok, fixegyenesek és geometriai leképezések 3 szinten"
      cheatSheetTitle="Transzformációk és Invariánsok Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Figyeld a különbséget a fixegyenes (minden pontja helyben marad) és az invariáns egyenes (ponthalmazként marad helyben) között!"
      levels={quizLevels}
      matcherComponent={<TransformationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<TransformationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="teal"
    />
  );
};

export default TransformationsQuiz;
