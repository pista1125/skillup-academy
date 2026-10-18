import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { BuildingMatcher } from './BuildingMatcher';
import { BuildingSorter } from './BuildingSorter';

export interface BuildingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const BUILDING_QUESTIONS: Question[] = [
  // ==========================================
  // 1. SZINT: KOCKAÉPÍTMÉNYEK ÉS ALAPRAJZOK (1-10)
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Egy kockaépítmény számozott alaprajzának számai: 2, 1, 3, 1. Hány darab kiskockából áll az építmény összesen?',
    options: [
      '7 kiskockából, mert 2 + 1 + 3 + 1 = 7',
      '8 kiskockából',
      '4 kiskockából (mert 4 oszlop van)',
      '6 kiskockából'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 50" fill="none">
        <rect x="6" y="6" width="22" height="18" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <rect x="32" y="6" width="22" height="18" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <rect x="6" y="26" width="22" height="18" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <rect x="32" y="26" width="22" height="18" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <text x="17" y="19" textAnchor="middle" className="text-xs font-black fill-pink-900">2</text>
        <text x="43" y="19" textAnchor="middle" className="text-xs font-black fill-pink-900">1</text>
        <text x="17" y="39" textAnchor="middle" className="text-xs font-black fill-pink-900">3</text>
        <text x="43" y="39" textAnchor="middle" className="text-xs font-black fill-pink-900">1</text>
      </svg>
    ),
    explanation: 'A számozott alaprajz minden száma egy-egy oszlop magasságát (kockáinak számát) adja meg. Az összes kocka száma a számok összege: 2 + 1 + 3 + 1 = 7 kocka.',
    hint: 'Add össze az alaprajzban lévő négy számot!',
    breakdown: [
      { label: 'Oszlopok', value: '2, 1, 3, 1' },
      { label: 'Összeg', value: '2 + 1 + 3 + 1 = 7 kocka' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Egy kockaépítményben az egyik kocka a 3. szinten (3. emeleten) helyezkedik el. Legalább hány kocka van alatta?',
    options: [
      'Pontosan 2 kocka (az 1. és 2. szinten alátámasztva)',
      '1 kocka elég alatta',
      '0 kocka, a levegőben is lebeghet',
      '3 kocka van alatta'
    ],
    correctAnswer: 0,
    explanation: 'A gravitáció miatt egy kocka a levegőben nem lebeghet: ha egy kocka a 3. emeleten van, alatta a földszinten (1. szint) és az 1. emeleten (2. szint) is biztosan lennie kell 1-1 alátámasztó kockának.',
    hint: 'Gondolj egy emeletes házra: a 3. emelet alatt van az 1. és a 2. szint.',
    breakdown: [
      { label: '3. szintű kocka', value: 'A legfelső kocka' },
      { label: 'Alátámasztás', value: 'Alatta 2 darab kocka van' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Az alaprajz egyik mezőjében a 2-es szám áll. Ha erre az oszlopra rátolsz még 1 kiskockát, hogyan változik az alaprajz?',
    options: [
      'A 2-es helyére 3 kerül',
      'A 2-es helyére 1 kerül',
      'Egy új mező keletkezik a semmiből',
      'Nem változik az alaprajz'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az oszlop magassága 1 kockával nőtt (2 + 1 = 3), az adott alaprajzi mezőbe az új oszlopmagasság, a 3-as szám kerül.',
    hint: '2 kocka volt egymáson, rátettünk még egyet.',
    breakdown: [
      { label: 'Kezdeti magasság', value: '2 kocka' },
      { label: 'Hozzáadva', value: '+1 kocka' },
      { label: 'Új szám', value: '3' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Hány darab egységkockából lehet felépíteni egy tömör, hiánytalan 2×2×2-es nagy kockát?',
    options: [
      '8 darab kiskockából (2 · 2 · 2 = 8)',
      '6 darab kiskockából',
      '4 darab kiskockából',
      '12 darab kiskockából'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 50 50" fill="none">
        <rect x="5" y="5" width="40" height="40" fill="#fce7f3" stroke="#be185d" strokeWidth="2" />
        <line x1="25" y1="5" x2="25" y2="45" stroke="#be185d" strokeWidth="1.5" />
        <line x1="5" y1="25" x2="45" y2="25" stroke="#be185d" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A 2×2×2-es kocka alapterülete 2 · 2 = 4 kocka. Mivel 2 szint magas, összesen 4 · 2 = 8 kocka alkotja.',
    hint: 'Alsó szinten 4 kocka, felső szinten még 4 kocka.',
    breakdown: [
      { label: 'Alsó szint', value: '2 · 2 = 4 kocka' },
      { label: 'Felső szint', value: '2 · 2 = 4 kocka' },
      { label: 'Összesen', value: '4 + 4 = 8 kocka' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Mit fejez ki a számozott alaprajzban lévő számok összege?',
    options: [
      'Az építményt alkotó összes kiskocka pontos darabszámát',
      'A kocka éleinek összegét',
      'A test elölnézetének területét',
      'A test körüljárási kerületét'
    ],
    correctAnswer: 0,
    explanation: 'Az alaprajz minden száma a megfelelő helyen álló oszlop kockáinak száma. Ha ezeket összeadjuk, a test összes kiskockájának számát kapjuk.',
    hint: 'Gondolj a lecke alapszabályára: számok összege = összes kocka.',
    breakdown: [
      { label: 'Alaprajz számai', value: 'Oszlopmagasságok' },
      { label: 'Számok összege', value: 'A test teljes kockaszáma' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Egy építmény 3 oszlopból áll: az első 3 kocka, a második 2 kocka, a harmadik 1 kocka magas. Hány kocka van az építményben?',
    options: [
      '6 kocka (3 + 2 + 1 = 6)',
      '5 kocka',
      '7 kocka',
      '9 kocka'
    ],
    correctAnswer: 0,
    explanation: 'Összeadjuk az oszlopok kockáit: 3 + 2 + 1 = 6 kiskocka alkotja az építményt.',
    hint: '3 + 2 + 1 = ?',
    breakdown: [
      { label: '1. oszlop', value: '3 kocka' },
      { label: '2. oszlop', value: '2 kocka' },
      { label: '3. oszlop', value: '1 kocka' },
      { label: 'Összesen', value: '6 kocka' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mit látunk egy kockaépítmény felülnézetén, ha nincsenek beleírva a magassági számok?',
    options: [
      'Azt, hogy melyik mezőkön áll legalább egy kocka (az építmény talajjal érintkező alakját)',
      'Azt, hogy melyik oszlop a legmagasabb',
      'A kockák oldalait és színeit',
      'A test belső üregeit'
    ],
    correctAnswer: 0,
    explanation: 'A felülnézeti kontúrrajz felülről lefelé mutatja a testet: pontosan azokat a négyzeteket látjuk beszínezve, amelyekben van legalább 1 kocka. A magasságok számozás nélkül nem látszanak.',
    hint: 'Ha madártávlatból nézel le egy városra, látod az épületek alaprajzát, de a magasságukat nem közvetlenül.',
    breakdown: [
      { label: 'Felülnézet', value: 'Fentről lefelé nézve' },
      { label: 'Információ', value: 'Lefedett mezők helye a síkban' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Egy építményből leveszünk 3 kockát. Hogyan változik a számozott alaprajz számainak összege?',
    options: [
      'Pontosan 3-mal csökken az összeg',
      'Nem változik az összeg',
      '3-mal nő az összeg',
      'Feleződik az összeg'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az alaprajz összege megegyezik a kockák számával, 3 kocka elvételekor az összeg pontosan 3-mal csökken.',
    hint: 'Kevesebb kocka = kisebb összeg.',
    breakdown: [
      { label: 'Elvett kockák', value: '3 darab' },
      { label: 'Összeg változása', value: '-3' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Hány kiskockából áll egy olyan teli építmény, amelynek alaprajza 3×3-as négyzet, és minden oszlopa pontosan 1 kocka magas?',
    options: [
      '9 kockából (3 · 3 = 9)',
      '6 kockából',
      '12 kockából',
      '3 kockából'
    ],
    correctAnswer: 0,
    explanation: 'A 3 sor mindegyikében 3 oszlop van, így 3 · 3 = 9 darab 1 magas oszlopunk van. Összesen 9 kocka.',
    hint: '3 sorban 3 kocka = 3 · 3.',
    breakdown: [
      { label: 'Oszlopok száma', value: '3 · 3 = 9' },
      { label: 'Magasságuk', value: '1 kocka mindegyik' },
      { label: 'Összesen', value: '9 kocka' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Hány határoló négyzetlapja van egyetlen kiskockának?',
    options: [
      'Pontosan 6 lapja van',
      '4 lapja van',
      '8 lapja van',
      '12 lapja van'
    ],
    correctAnswer: 0,
    explanation: 'A kockának 6 darab egybevágó négyzetlapja, 8 csúcsa és 12 éle van (mint egy hagyományos dobókockának).',
    hint: 'Gondolj a dobókocka oldalaira: 1-től 6-ig vannak a pöttyök.',
    breakdown: [
      { label: 'Lapok száma', value: '6 négyzetlap' },
      { label: 'Csúcsok száma', value: '8 csúcs' },
      { label: 'Élek száma', value: '12 él' }
    ]
  },

  // ==========================================
  // 2. SZINT: NÉZETEK ÉS VETÜLETEK (11-20)
  // ==========================================
  {
    id: 'l2-q11',
    level: 2,
    prompt: 'Egy oszlopban szemből nézve az elülső kocka 1 emelet magas, de közvetlenül mögötte áll egy 3 emelet magas oszlop. Mit látunk az elölnézetben?',
    options: [
      'Egy 3 emelet magas oszlopot (a magasabb eltakarja az alacsonyabbat)',
      'Csak az elülső 1 emeletest látjuk',
      'Összeadódnak: egy 4 emeletest látunk',
      'Egyik oszlopot sem látjuk'
    ],
    correctAnswer: 0,
    explanation: 'Szemből nézve a szemünk a testre merőlegesen vetíti a kockákat: mindig az adott oszlop LEGMAGASABB pontját látjuk. Mivel a hátsó oszlop 3 magas, a teteje kilátszik a 2 kockával alacsonyabb elülső fölött, így 3 kocka magas oszlopot látunk.',
    hint: 'Ha előtted áll egy alacsonyabb ember és mögötte egy magasabb, a magasabb tetejét látod.',
    breakdown: [
      { label: 'Elülső oszlop', value: '1 kocka' },
      { label: 'Hátsó oszlop', value: '3 kocka' },
      { label: 'Látható magasság', value: 'max(1, 3) = 3 kocka' }
    ]
  },
  {
    id: 'l2-q12',
    level: 2,
    prompt: 'Amikor egy kockaépítményre JOBBRÓL nézünk rá (jobb oldalnézet), a test elülső sora hová kerül a látómezőnkben?',
    options: [
      'A bal oldalunkra kerül',
      'A jobb oldalunkra kerül',
      'Középre kerül',
      'Eltűnik a látómezőből'
    ],
    correctAnswer: 0,
    explanation: 'Képzeld el, hogy a test jobb oldalához lépsz: ekkor az építmény eredeti eleje a bal kezed felé esik, a hátulja pedig a jobb kezed felé. Ezért a jobb oldalnézet rajzán a bal oszlop felel meg az elülső sornak.',
    hint: 'Fordulj 90 fokkal balra gondolatban: ami előtted volt, most balra lesz.',
    breakdown: [
      { label: 'Megfigyelési pont', value: 'Jobb oldalról' },
      { label: 'Elülső sor helye', value: 'A rajz bal oldalán' },
      { label: 'Hátsó sor helye', value: 'A rajz jobb oldalán' }
    ]
  },
  {
    id: 'l2-q13',
    level: 2,
    prompt: 'Egy építmény alaprajzában az első (bal oldali) oszlopban elöl 1, mögötte 2 kocka van. Milyen magas oszlopot látunk az elölnézet bal szélén?',
    options: [
      '2 kocka magasat (mert max(1, 2) = 2)',
      '1 kocka magasat',
      '3 kocka magasat (mert 1 + 2 = 3)',
      'Nem látható oszlop'
    ],
    correctAnswer: 0,
    explanation: 'Az elölnézetben minden oszlop magassága az adott oszlopban található számok maximuma. Itt max(1, 2) = 2 kocka magas.',
    hint: 'A legmagasabb oszlop látszik: 1 vagy 2 a nagyobb?',
    breakdown: [
      { label: 'Számok az oszlopban', value: '1 és 2' },
      { label: 'Maximum', value: '2 kocka' }
    ]
  },
  {
    id: 'l2-q14',
    level: 2,
    prompt: 'Lehetséges-e, hogy egy kockaépítmény elölnézetében látunk egy 4 kocka magas oszlopot, miközben az alaprajzban a legnagyobb szám csak 3?',
    options: [
      'Nem lehetséges (az elölnézet nem lehet magasabb az építmény legmagasabb oszlopánál)',
      'Igen, ha a kockák el vannak csúszva',
      'Igen, mert az elölnézetben összeadódnak a kockák',
      'Csak akkor lehetséges, ha 0-s mező is van'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az alaprajz legnagyobb száma 3, az egész építményben a legmagasabb oszlop pontosan 3 kocka magas. Így sem szemből, sem oldalról nem láthatunk 4 kocka magas oszlopot.',
    hint: 'Ha a legmagasabb torony 3 emeletes, láthatsz-e 4 emeleteset?',
    breakdown: [
      { label: 'Max magasság a testben', value: '3 kocka' },
      { label: 'Elölnézet max magassága', value: 'Legfeljebb 3 kocka lehet' }
    ]
  },
  {
    id: 'l2-q15',
    level: 2,
    prompt: 'Egy építmény felülnézetében pontosan 5 darab négyzet van kiszínezve. Legalább hány kiskockából kell állnia az építménynek?',
    options: [
      'Legalább 5 kockából (mert minden színezett mezőben lennie kell legalább 1 kockának)',
      'Legalább 10 kockából',
      'Legfeljebb 4 kockából',
      'Pontosan 1 kockából'
    ],
    correctAnswer: 0,
    explanation: 'Minden egyes színezett felülnézeti négyzet alá legalább 1 kockát kell tennünk a földszinten. Ezért a minimális kockaszám legalább 5.',
    hint: '5 különböző helyen látunk kockát felülről.',
    breakdown: [
      { label: 'Foglalt mezők száma', value: '5 mező' },
      { label: 'Minimális magasság', value: 'Mezőnként legalább 1 kocka' },
      { label: 'Minimális kockaszám', value: '5 · 1 = 5 kocka' }
    ]
  },
  {
    id: 'l2-q16',
    level: 2,
    prompt: 'Egy építmény alaprajzában az elülső sorban a legmagasabb oszlop 2, a hátsó sorban a legmagasabb oszlop 3 kocka magas. Mit mutat a jobb oldalnézet balról jobbra haladva?',
    options: [
      'Bal oszlop: 2 magas, Jobb oszlop: 3 magas',
      'Bal oszlop: 3 magas, Jobb oszlop: 2 magas',
      'Mindkét oszlop 5 magas',
      'Csak egyetlen 3 magas oszlopot'
    ],
    correctAnswer: 0,
    explanation: 'Jobbról nézve az elülső sor a bal oldalon látszik (magassága 2), a hátsó sor pedig a jobb oldalon (magassága 3). Ezért balról jobbra: 2 és 3.',
    hint: 'Jobb oldalnézetnél: balra az eleje (2), jobbra a hátulja (3).',
    breakdown: [
      { label: 'Bal oszlop (elülső sor)', value: '2 kocka magas' },
      { label: 'Jobb oszlop (hátsó sor)', value: '3 kocka magas' }
    ]
  },
  {
    id: 'l2-q17',
    level: 2,
    prompt: 'Egy építmény 4 kockából áll. Lehetséges-e, hogy az elölnézete, az oldalnézete és a felülnézete is pontosan ugyanúgy néz ki?',
    options: [
      'Igen, például egy 4 kockából álló L-alakzat megfelelő elrendezésben azonos vetületeket adhat',
      'Nem, két különböző irányból sosem lehet azonos a nézet',
      'Csak 1 kockánál lehet azonos',
      'Csak akkor, ha 10 kockánk van'
    ],
    correctAnswer: 0,
    explanation: 'Léteznek olyan térbeli alakzatok, amelyek vetületei mindhárom fő irányból azonosak. Például egy olyan 4 kockás testnél, amelynél mindhárom irányban 2x2-es keretben 3 négyzet látszik.',
    hint: 'Gondolj egy szimmetrikusan elhelyezett térbeli sarokformára.',
    breakdown: [
      { label: 'Vetületek azonossága', value: 'Megfelelő alakzatnál lehetséges' }
    ]
  },
  {
    id: 'l2-q18',
    level: 2,
    prompt: 'Egy építmény legfelső kockáját áttesszük egy másik, már meglévő oszlop tetejére. Hogyan változik a felülnézet kontúrja?',
    options: [
      'Változatlan marad (mert sem új mező nem jött létre, sem meglévő nem ürült ki teljesen)',
      '1 négyzettel nagyobb lesz a felülnézet',
      '1 négyzettel kisebb lesz a felülnézet',
      'Teljesen átalakul a felülnézet'
    ],
    correctAnswer: 0,
    explanation: 'Ha egy kockát olyan oszlopból veszünk el, amelyben alatta még maradt kocka (pl. 3-ból 2 lesz), és egy olyan oszlopra tesszük, ami eddig is létezett (pl. 1-ből 2 lesz), akkor egyetlen alaprajzi mező sem ürül ki és nem keletkezik új sem. Így a felülnézeti kontúr nem változik.',
    hint: 'Egyik mező sem vált 0-vá, és nem jött létre új mező sem.',
    breakdown: [
      { label: 'Foglalt mezők', value: 'Nem változnak' },
      { label: 'Felülnézet kontúrja', value: 'Változatlan marad' }
    ]
  },
  {
    id: 'l2-q19',
    level: 2,
    prompt: 'Egy tömör 3×3×3-as nagy kockát szeretnénk építeni. Jelenleg 19 darab kiskockánk van. Hány kocka hiányzik még a befejezéshez?',
    options: [
      '8 darab kiskocka (mert 3 · 3 · 3 = 27, és 27 - 19 = 8)',
      '7 darab kiskocka',
      '9 darab kiskocka',
      '6 darab kiskocka'
    ],
    correctAnswer: 0,
    explanation: 'A 3×3×3-as kocka teljes térfogata: 3 · 3 · 3 = 27 egységkocka. Mivel van 19 kockánk: 27 - 19 = 8 kocka hiányzik.',
    hint: 'Számold ki: 3 · 3 · 3 = 27. Ebből vond ki a meglévő 19-et!',
    breakdown: [
      { label: 'Teljes kocka térfogata', value: '3 · 3 · 3 = 27 kocka' },
      { label: 'Meglévő kockák', value: '19 kocka' },
      { label: 'Hiányzó kockák', value: '27 - 19 = 8 kocka' }
    ]
  },
  {
    id: 'l2-q20',
    level: 2,
    prompt: 'Egy 5 kockából álló építmény alaprajza: egy 2 magas oszlop, és mellette három 1 magas oszlop. Hány kocka van az építmény földszintjén (alsó szintjén)?',
    options: [
      '4 kocka (mert 4 különböző oszlop van a talajon)',
      '5 kocka',
      '3 kocka',
      '2 kocka'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 4 oszlopunk van (egy 2 magas és három 1 magas), a talajon mind a 4 oszlopnak van pontosan 1 darab földszinti kockája. Az 5. kocka az emeleten áll.',
    hint: 'Minden oszlop alja a földszinten van.',
    breakdown: [
      { label: 'Oszlopok száma', value: '4 oszlop' },
      { label: 'Alsó szint kockái', value: '4 kocka' },
      { label: 'Felső szint kockája', value: '1 kocka' }
    ]
  },

  // ==========================================
  // 3. SZINT: KOCKAHÁLÓK ÉS TESTEK HÁLÓI (21-30)
  // ==========================================
  {
    id: 'l3-q21',
    level: 3,
    prompt: 'Forgatásoktól és tükrözésektől eltekintve hány különböző kockaháló létezik a geometriában?',
    options: [
      'Pontosan 11 különböző kockaháló létezik',
      'Pontosan 6 kockaháló létezik',
      'Végtelen sokféle létezik',
      'Pontosan 8 kockaháló létezik'
    ],
    correctAnswer: 0,
    explanation: 'A kocka síkbeli kiterítésével pontosan 11 különböző alakzat hozható létre (6 db 1-4-1 típus, 3 db 1-3-2 típus, 1 db 2-2-2 típus és 1 db 3-3 típus).',
    hint: '6 + 3 + 1 + 1 = 11.',
    breakdown: [
      { label: '1-4-1 típus', value: '6 darab' },
      { label: '1-3-2 típus', value: '3 darab' },
      { label: '2-2-2 típus', value: '1 darab' },
      { label: '3-3 típus', value: '1 darab' },
      { label: 'Összesen', value: '11 különböző kockaháló' }
    ]
  },
  {
    id: 'l3-q22',
    level: 3,
    prompt: 'Miért NEM lehet kockaháló egy olyan 6 négyzetből álló alakzat, amelyben van egy 2×2-es négyzettömb?',
    options: [
      'Mert összehajtáskor a lapok egymásra torlódnának (átfednék egymást), és a kocka egyik oldala nyitva maradna',
      'Mert nincs benne 6 négyzet',
      'Mert a négyzetek nem egybevágók',
      'Mert egy kockának csak 5 lapja van'
    ],
    correctAnswer: 0,
    explanation: 'Ha 4 négyzet egyetlen közös csúcsban találkozik (2×2-es tömb), összehajtáskor két lap pontosan egymásra feküdne, így egy lap duplán fedne, egy másik helyen pedig lyuk maradna a kockán. Kockahálóban egy csúcsban legfeljebb 3 négyzet találkozhat.',
    hint: 'Gondolj a sarkokra: egy csúcsban nem találkozhat 4 lap egy kockánál.',
    breakdown: [
      { label: '2×2-es tömb', value: '4 négyzet egy csúcsban' },
      { label: 'Hiba összehajtáskor', value: 'Két lap egymásra fekszik (átfedés)' }
    ]
  },
  {
    id: 'l3-q23',
    level: 3,
    prompt: 'Egy 1-4-1 típusú kockaháló középső, 4 négyzetből álló egyenes sávjában melyik lap lesz a szemközti párja az 1. (bal szélső) négyzetnek?',
    options: [
      'A 3. négyzet (a második szomszéd)',
      'A 2. négyzet (a közvetlen szomszéd)',
      'A 4. négyzet (a jobb szélső)',
      'A felső fül'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-14 mx-auto" viewBox="0 0 80 40" fill="none">
        <rect x="5" y="14" width="16" height="16" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <rect x="23" y="14" width="16" height="16" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
        <rect x="41" y="14" width="16" height="16" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
        <rect x="59" y="14" width="16" height="16" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
        <text x="13" y="26" textAnchor="middle" className="text-[10px] font-black fill-pink-900">1</text>
        <text x="31" y="26" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">2</text>
        <text x="49" y="26" textAnchor="middle" className="text-[10px] font-black fill-pink-900">3</text>
        <text x="67" y="26" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">4</text>
      </svg>
    ),
    explanation: 'Egy egyenes 4-es sáv palásttá hajtogatásakor az 1. és 3. lap, valamint a 2. és 4. lap kerül pontosan szembe egymással. Két szemközti lap sosem lehet közvetlen szomszéd (mindig egy másik lap választja el őket).',
    hint: 'Közvetlen szomszédok 90 fokban hajlanak egymásra, nem szemköztiek!',
    breakdown: [
      { label: '1. lap párja', value: '3. lap (szemközti)' },
      { label: '2. lap párja', value: '4. lap (szemközti)' }
    ]
  },
  {
    id: 'l3-q24',
    level: 3,
    prompt: 'Hány darab négyzetből kell állnia egy kockahálónak?',
    options: [
      'Pontosan 6 darabból (mert a kockának 6 lapja van)',
      '8 darabból',
      '5 darabból',
      '12 darabból'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a kockát pontosan 6 lap határolja, a kiterített hálónak is szigorúan 6 darab négyzetlapból kell állnia: sem 5-ből (hiányos), sem 7-ből (felesleges lap).'
  },
  {
    id: 'l3-q25',
    level: 3,
    prompt: 'Egy szabványos dobókockán a szemközti lapokon lévő pontok összege mindig 7. Ha egy kockahálón az egyik lapon 2 pont van, hány pontnak kell lennie a szemközti lapján?',
    options: [
      '5 pontnak (mert 2 + 5 = 7)',
      '4 pontnak',
      '6 pontnak',
      '3 pontnak'
    ],
    correctAnswer: 0,
    explanation: 'A dobókocka szabálya: szemközti lapok összege = 7. Ha az egyik lap 2-es, a szemközti lap 7 - 2 = 5-ös kell legyen (1-6, 2-5, 3-4 párok).',
    hint: '7 - 2 = ?',
    breakdown: [
      { label: 'Párok összege', value: '7' },
      { label: 'Ismert lap', value: '2' },
      { label: 'Szemközti lap', value: '7 - 2 = 5' }
    ]
  },
  {
    id: 'l3-q26',
    level: 3,
    prompt: 'Milyen és hány darab síkidom határolja a téglatest kiterített hálóját?',
    options: [
      '6 darab téglalap, amelyek 3 pár egybevágó lapot alkotnak',
      '4 téglalap és 2 háromszög',
      '6 darab egyforma négyzet',
      '2 kör és 1 téglalap'
    ],
    correctAnswer: 0,
    explanation: 'A téglatest hálója 6 téglalapból áll. A szemközti lapok egybevágók, így 3 különböző méretű téglalappár alkotja a test felületét.',
    hint: 'A téglatest minden lapja téglalap.',
    breakdown: [
      { label: 'Lapok száma', value: '6 darab' },
      { label: 'Lapok alakja', value: 'Téglalapok' },
      { label: 'Párok száma', value: '3 pár egybevágó lap' }
    ]
  },
  {
    id: 'l3-q27',
    level: 3,
    prompt: 'Milyen síkidomokból áll egy négyzet alapú gúla (piramis) kiterített hálója?',
    options: [
      '1 négyzetből (alaplap) és 4 egyenlő szárú háromszögből (oldallapok)',
      '2 négyzetből és 4 téglalapból',
      '5 egyforma háromszögből',
      '1 körből és 1 körcikkből'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-16 mx-auto" viewBox="0 0 40 40" fill="none">
        <rect x="14" y="14" width="12" height="12" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
        <polygon points="20,4 14,14 26,14" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
        <polygon points="20,36 14,26 26,26" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
        <polygon points="4,20 14,14 14,26" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
        <polygon points="36,20 26,14 26,26" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
      </svg>
    ),
    explanation: 'A négyzetes gúla alapja 1 darab négyzet, palástját pedig 4 darab, a csúcsban találkozó egyenlő szárú háromszög alkotja. Kiterítve csillag alakú hálót kapunk.',
    hint: 'Gondolj a sátorra vagy piramisra: négyzet alap + 4 háromszög fal.',
    breakdown: [
      { label: 'Alaplap', value: '1 db négyzet' },
      { label: 'Palást', value: '4 db egyenlő szárú háromszög' },
      { label: 'Összes lap', value: '5 lap' }
    ]
  },
  {
    id: 'l3-q28',
    level: 3,
    prompt: 'Milyen síkidomok alkotják egy egyenes henger (pl. konzervdoboz) kiterített felületi hálóját?',
    options: [
      '1 téglalap (palást) és 2 egybevágó körlap (alap- és fedőlap)',
      '2 téglalap és 1 körlap',
      '1 négyzet és 4 háromszög',
      'Csak 2 darab körlap'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-14 mx-auto" viewBox="0 0 60 36" fill="none">
        <rect x="14" y="12" width="32" height="12" fill="#d1fae5" stroke="#047857" strokeWidth="1" />
        <circle cx="30" cy="6" r="4.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
        <circle cx="30" cy="30" r="4.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
      </svg>
    ),
    explanation: 'Ha egy henger palástját felvágjuk, egy sima téglalapot kapunk, amelynek hossza a kör kerülete. Ehhez csatlakozik a két körlap (alap és fedőlap).',
    hint: 'Gondolj egy konzervdoboz papírcímkéjére: ha lefejted, egy téglalap lesz belőle.',
    breakdown: [
      { label: 'Palást', value: '1 téglalap' },
      { label: 'Alaplapok', value: '2 db körlap' }
    ]
  },
  {
    id: 'l3-q29',
    level: 3,
    prompt: 'Miért NEM lehet kockaháló az az alakzat, amely 5 négyzetből álló egyenes sávot tartalmaz és egy 6. négyzetet valamelyik oldalon?',
    options: [
      'Mert az 5 négyzetes sávból nem lehet 4 oldalú palástot hajtani (az 5. négyzet átfedné az 1.-t)',
      'Mert nincs benne 6 négyzet',
      'Mert a négyzetek nem merőlegesek egymásra',
      'Mert hiányzik a fedőlap'
    ],
    correctAnswer: 0,
    explanation: 'A kocka palástját pontosan 4 négyzetlap alkotja (a 4 oldalfal). Ha 5 négyzet van egy sorban, a körbehajtáskor az 5. négyzet ráfeküdne az 1.-re, miközben a kocka egyik alsó vagy felső lapja hiányozna.',
    hint: 'Egy kockának 4 oldalsó fala van, nem 5!',
    breakdown: [
      { label: 'Kocka palástja', value: 'Legfeljebb 4 négyzet lehet egy sávban' },
      { label: '5-ös sáv', value: 'Átfedést okoz, nem kockaháló' }
    ]
  },
  {
    id: 'l3-q30',
    level: 3,
    prompt: 'A 2-2-2 típusú Z-alakú kockahálóban (ahol 3 darab kétnégyzetes szakasz van eltolva egymáshoz képest) hány négyzet érintkezik közvetlenül egymással?',
    options: [
      'Összesen 6 négyzet alkot egy lépcsős Z-formát, és összehajtható kockává',
      '8 négyzet alkotja',
      'Nem hajtogatható kockává',
      'Csak téglatestté hajtogatható'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 45" fill="none">
        <rect x="6" y="5" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="20" y="5" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="20" y="17" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="34" y="17" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="34" y="29" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="48" y="29" width="14" height="12" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
      </svg>
    ),
    explanation: 'A 2-2-2 típus a 11 kockaháló egyike: egy különleges lépcsős Z-alakzat, amelynek minden négyzetlapja pontosan a helyére fordul az összehajtogatás során.',
    hint: 'Ez a híres Z-kockaháló!',
    breakdown: [
      { label: 'Típus', value: '2-2-2 Z-alakzat' },
      { label: 'Lapok száma', value: '6 négyzet' },
      { label: 'Eredmény', value: 'Szabályos kockává záródik' }
    ]
  }
];

export const BuildingQuiz: React.FC<BuildingQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="6. Testek építése, szemléltetése kvíz"
      subtitle="30 feladat 3 szinten: kockaépítmények, számozott alaprajzok, 3 nézet és kockahálók"
      topicId="g5-geom-building-quiz"
      questions={BUILDING_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="pink"
      cheatSheetCards={[
        {
          title: "Kockaépítmények és alaprajz",
          content: "Számozott alaprajz: minden mezőbe az adott oszlop kockaszámát írjuk.\nÖsszes kocka száma: az alaprajz számainak összege!\nRejtett kockák: a felső szintek kockái alatt mindig van alátámasztó kocka (nem lebegnek)."
        },
        {
          title: "A 3 vetületi nézet",
          content: "Elölnézet (szemből): az oszlopok maximális magasságát látjuk.\nOldalnézet (jobbról): balra esik a test eleje, jobbra a hátulja (sorok max magassága).\nFelülnézet: mely mezőkön van legalább 1 kocka."
        },
        {
          title: "Kockahálók és testek hálói",
          content: "Kockának pontosan 11 különböző hálója van!\n1-4-1 (6 db), 1-3-2 (3 db), 2-2-2 (1 db), 3-3 (1 db).\nNEM kockaháló: ha 2×2-es tömb van benne (átfedés), vagy ha 5 vagy 7 lapból áll.\nSzemközti lapok: sosem érintkeznek közös éllel!"
        }
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó építményeket, alaprajzokat és nézeteket!',
          description: 'Párosítsd az építményeket számozott alaprajzukkal, 3 nézetükkel és kockahálókkal 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <BuildingMatcher
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
          subtitle: 'Válogasd szét a hálókat és nézeteket!',
          description: 'Rendezd a formákat érvényes/érvénytelen kockahálók, nézettípusok és testek szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <BuildingSorter
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

export default BuildingQuiz;
