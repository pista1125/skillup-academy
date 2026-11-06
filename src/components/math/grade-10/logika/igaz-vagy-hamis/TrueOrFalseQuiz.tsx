import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TrueOrFalseMatcher } from './TrueOrFalseMatcher';
import { TrueOrFalseSorter } from './TrueOrFalseSorter';
import {
  LogicStatementSvg,
  ExcludedMiddleSvg,
  BoundaryNegationSvg,
  PaintedCubeSvg
} from './TrueOrFalseFigures';
import { Brain, Sparkles, CheckCircle2, ShieldCheck, Scale, HelpCircle, Layers } from 'lucide-react';

interface TrueOrFalseQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Az Állítás (Kijelentés) Fogalma',
    description: 'Csak olyan kijelentő mondat lehet állítás, amelyről objektíven és egyértelműen eldönthető, hogy igaz vagy hamis.',
    note: 'Nem állítás: kérdés, parancs, óhaj, szubjektív vélemény és nyitott mondat (amíg a változó nincs rögzítve).',
    color: 'from-indigo-500 to-purple-600',
    figure: <LogicStatementSvg size={180} />
  },
  {
    title: 'A Klasszikus Logika 2 Alaptörvénye',
    description: '1. Harmadik kizárása: Egy állítás vagy igaz, vagy hamis, harmadik eset nincs. 2. Ellentmondásmentesség: Egy állítás nem lehet egyszerre igaz és hamis.',
    note: 'A logikában minden kijelentésnek pontosan egy logikai értéke van: I (1) vagy H (0).',
    color: 'from-purple-500 to-pink-600',
    figure: <ExcludedMiddleSvg size={180} />
  },
  {
    title: 'A Negáció (Tagadás) Aranyszabálya',
    description: '¬A akkor igaz, ha A hamis, és akkor hamis, ha A igaz. Nem elég, ha nem lehetnek egyszerre igazak: NEM LEHETNEK EGYSZERRE HAMISAK SEM!',
    note: 'Határértékek tagadása: x > 32 tagadása x ≤ 32 (legfeljebb 32); x ≥ 100 tagadása x < 100 (legfeljebb 99).',
    color: 'from-teal-500 to-emerald-600',
    figure: <BoundaryNegationSvg size={180} />
  },
  {
    title: 'A Festett Kocka Modellje (3×3×3 = 27)',
    description: 'Kompetenciamérések klasszikusa: 8 csúcs = 3 piros lap; 12 él = 2 piros lap; 6 lapközép = 1 piros lap; 1 belső = 0 piros lap.',
    note: 'Legalább 2 piros lap: 8 + 12 = 20 kocka. Legfeljebb 2 piros lap: 1 + 6 + 12 = 19 kocka.',
    color: 'from-rose-500 to-red-600',
    figure: <PaintedCubeSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Igazságértékek (Könnyű)',
    subtitle: 'Állítás vagy nem állítás? Kijelentések felismerése és alapvető igazságértékek eldöntése.',
    range: '1–10. feladat',
    focus: 'Állítás fogalma és igazságértékek',
    questions: [
      {
        id: 'tfq1-1',
        questionTypeBadge: 'Állítás Fogalma',
        question: 'Melyik kijelentő mondatot nevezzük állításnak a logikában?',
        options: [
          'Amiről egyértelműen és objektíven eldönthető, hogy igaz vagy hamis',
          'Amelyik mindig igaz a mindennapi életben',
          'Amelyik kérdő vagy felkiáltó formában fejezi ki a véleményünket',
          'Minden olyan mondatot, amit egy tankönyvben leírtak'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a definícióra: egyértelmű és objektív igazságérték kell.',
        explanation: 'A logikában csak azok a kijelentő mondatok minősülnek állításnak (kijelentésnek), amelyekről objektíven eldönthető, hogy igazak vagy hamisak.'
      },
      {
        id: 'tfq1-2',
        questionTypeBadge: 'Nem Állítás Felismerése',
        question: 'Az alábbi mondatok közül melyik NEM állítás a matematikában?',
        options: [
          '„Hány óra van most?”',
          '„A sósav képlete HCl.”',
          '„Svájc fővárosa Zürich.”',
          '„A 2 az egyetlen páros prímszám.”'
        ],
        correctAnswer: 0,
        hint: 'A kérdő mondatok nem állítanak semmit a valóságról.',
        explanation: 'A „Hány óra van most?” egy kérdő mondat. Nincs tényállása, amiről eldönthető lenne, hogy igaz vagy hamis, így nem állítás.'
      },
      {
        id: 'tfq1-3',
        questionTypeBadge: 'Szubjektív Értékítélet',
        question: 'Miért NEM állítás a „Budapest szebb város, mint Tokió.” mondat a logikában?',
        options: [
          'Mert szubjektív vélemény, egyéni ízlés kérdése, nincs rá objektív mérce',
          'Mert Tokió valójában nagyobb területű, mint Budapest',
          'Mert mindkét város főváros',
          'Mert nem tartalmaz számokat'
        ],
        correctAnswer: 0,
        hint: 'Létezik-e egzakt, tudományos definíció a „szépségre”?',
        explanation: 'Az esztétikai és ízlésbeli ítéletek szubjektívek. Mivel nincs objektív, mindenki által elfogadható mérce a szépség eldöntésére, nem tekinthető logikai állításnak.'
      },
      {
        id: 'tfq1-4',
        questionTypeBadge: 'Igazságérték Meghatározása',
        question: 'Mi a „Svájc fővárosa Zürich.” mondat logikai értéke?',
        options: [
          'Hamis állítás (mert Svájc de facto fővárosa Bern)',
          'Igaz állítás (mert Zürich a legnépesebb svájci város)',
          'Nem állítás, mert földrajzi kérdés',
          'Bizonytalan, nem eldönthető'
        ],
        correctAnswer: 0,
        hint: 'Vajon a legnépesebb város mindig megegyezik a fővárossal?',
        explanation: 'Ez egy állítás, hiszen egyértelmű tényről szól, de a tartalma téves: Svájc szövetségi fővárosa Bern, így az állítás logikai értéke HAMIS.'
      },
      {
        id: 'tfq1-5',
        questionTypeBadge: 'Kizárt Harmadik',
        question: 'Mit mond ki a harmadik kizárásának elve (principium tertii exclusi)?',
        options: [
          'Egy állítás vagy igaz, vagy hamis, harmadik eset nincs',
          'Egy állítás egyszerre lehet igaz és hamis is',
          'Egy állításban legfeljebb három ismeretlen szerepelhet',
          'A harmadik válaszadó mindig a helyes döntést hozza meg'
        ],
        correctAnswer: 0,
        hint: 'Létezhet-e „félig igaz” állítás a klasszikus logikában?',
        explanation: 'A klasszikus logika alapelve szerint minden állítás pontosan a két lehetséges érték (igaz vagy hamis) egyikét veszi fel, harmadik lehetőség nincs.'
      },
      {
        id: 'tfq1-6',
        questionTypeBadge: 'Matematikai Állítás',
        question: 'Döntsd el az állítás igazságértékét: „A 17 prímszám.”',
        options: [
          'Igaz állítás (mert pontosan két pozitív osztója van: 1 és 17)',
          'Hamis állítás (mert páratlan)',
          'Nem állítás, csak egy szám',
          'Csak a természetes számok körében igaz, máskor nem'
        ],
        correctAnswer: 0,
        hint: 'Milyen osztói vannak a 17-nek?',
        explanation: 'A 17-nek pontosan két pozitív osztója van (1 és 17), így megfelel a prímszám definíciójának. Az állítás IGAZ.'
      },
      {
        id: 'tfq1-7',
        questionTypeBadge: 'Kémiai Tényállítás',
        question: 'Mi az igazságértéke a tankönyvi példának: „A sósav képlete HCl.”?',
        options: [
          'Igaz állítás',
          'Hamis állítás',
          'Nem állítás',
          'Vélemény'
        ],
        correctAnswer: 0,
        hint: 'A hidrogén-klorid vizes oldata a sósav.',
        explanation: 'A sósav a hidrogén-klorid (HCl) vizes oldata, ez természettudományosan igazolt tény, így IGAZ állítás.'
      },
      {
        id: 'tfq1-8',
        questionTypeBadge: 'Felszólító Mondat',
        question: 'Állítás-e a logikában az alábbi mondat: „Oldd meg az egyenletet a füzetedben!”?',
        options: [
          'Nem, mert felszólító mondat (parancs/utasítás)',
          'Igen, mert matematikáról szól',
          'Igen, és az értéke igaz',
          'Igen, de csak akkor, ha van megoldása az egyenletnek'
        ],
        correctAnswer: 0,
        hint: 'Kifejez-e tényállítást egy utasítás?',
        explanation: 'A felszólítások, kérések és parancsok cselekvésre szólítanak fel, nem tényeket közölnek. Nem lehet róluk megmondani, hogy igazak vagy hamisak, így NEM állítások.'
      },
      {
        id: 'tfq1-9',
        questionTypeBadge: 'Geometriai Állítás',
        question: 'Döntsd el az állítás igazságértékét: „A derékszögű háromszögnek van tompaszöge.”',
        options: [
          'Hamis állítás (a háromszög belső szögeinek összege 180°, így derékszög mellett nem lehet tompaszög)',
          'Igaz állítás (bármely háromszögnek lehet tompaszöge)',
          'Nem állítás, mert ábrázolás nélkül nem eldönthető',
          'Csak egyenlő szárú derékszögű háromszögre igaz'
        ],
        correctAnswer: 0,
        hint: 'Ha van egy 90°-os szög, a másik kettő összege mennyi?',
        explanation: 'Egy derékszögű háromszögben a két hegyesszög összege 90°. Tompaszög (>90°) nem fordulhat elő, így az állítás HAMIS.'
      },
      {
        id: 'tfq1-10',
        questionTypeBadge: 'Logikai Értékek',
        question: 'Hány logikai értéke lehet egy állításnak a klasszikus logikában?',
        options: [
          'Pontosan kettő: Igaz (1) vagy Hamis (0)',
          'Végtelen sok a valószínűségek szerint',
          'Három: Igaz, Hamis és Nem tudom',
          'Egyetlen, mert egy állítás mindig csak igaz lehet'
        ],
        correctAnswer: 0,
        hint: 'Boole-algebra és a kétértékű logika.',
        explanation: 'A klasszikus logikában kétértékűségről beszélünk: minden állítás értéke vagy IGAZ (1), vagy HAMIS (0).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Logikai Szabályok, Kvantorok és Negáció (Közepes)',
    subtitle: 'Rejtett általánosítások, határpontok tagadása és a negáció feltételei.',
    range: '11–20. feladat',
    focus: 'Kvantorok, negáció és határértékek',
    questions: [
      {
        id: 'tfq2-1',
        questionTypeBadge: 'Rejtett Kvantor',
        question: 'Hogyan kell értelmezni a matematikában azt az állítást, hogy „Két páros szám összege osztható 4-gyel.”?',
        options: [
          'Úgy, hogy „Bármely két páros szám összege MINDIG osztható 4-gyel”, ezért HAMIS állítás.',
          'Úgy, hogy „Néha osztható 4-gyel”, ezért IGAZ állítás.',
          'Úgy, hogy csak pozitív számokra vonatkozik.',
          'Nem állítás, mert hiányzik a „mindig” szó.'
        ],
        correctAnswer: 0,
        hint: 'Ha nincs odaírva feltétel, a matematikában általános érvényűnek kell tekinteni.',
        explanation: 'A matematikai nyelvben a feltétel nélküli kijelentő alak általános érvényű („minden esetben”). Mivel pl. 4 + 6 = 10 nem osztható 4-gyel, az állítás HAMIS.'
      },
      {
        id: 'tfq2-2',
        questionTypeBadge: 'Ellenpélda Szerepe',
        question: 'Mi szükséges egy általános („Minden...”) állítás megdöntéséhez (cáfolatához)?',
        options: [
          'Elegendő egyetlenegy ellenpéldát mutatni',
          'Az esetek többségében ellenpéldát kell találni',
          'Minden lehetséges esetre be kell bizonyítani, hogy nem működik',
          'Az ellenkezőjét kell bebizonyítani minden számra'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra: „Minden hattyú fehér”. Hány fekete hattyú kell a cáfolathoz?',
        explanation: 'Egy általános állítás cáfolatához egyetlen ellenpélda felmutatása tökéletesen elegendő (pl. a 2 páros prím megbuktatja a „Minden prím páratlan” állítást).'
      },
      {
        id: 'tfq2-3',
        questionTypeBadge: 'Tagadás Feltétele',
        question: 'Mikor tagadása egymásnak a B állítás az A állításnak?',
        options: [
          'Ha minden lehetséges helyzetben ellentétes az igazságértékük (nem lehetnek egyszerre igazak, és nem lehetnek egyszerre hamisak sem)',
          'Ha egyszerre nem lehetnek igazak',
          'Ha van olyan eset, amikor az egyik igaz, a másik hamis',
          'Ha a B állítás a „nem” szóval kezdődik'
        ],
        correctAnswer: 0,
        hint: 'Mi a helyzet, ha van olyan harmadik szituáció, amikor mindkettő hamis?',
        explanation: 'Két állítás pontosan akkor tagadása egymásnak, ha nemcsak egyszerre igazak nem lehetnek, hanem elképzelhetetlen olyan eset is, amikor egyszerre mindkettő hamis.'
      },
      {
        id: 'tfq2-4',
        questionTypeBadge: 'Panni Kutyája Buktató',
        question: 'Miért NEM tagadása egymásnak az alábbi két állítás: A: „Panni kutyája fekete.” és B: „Panni kutyája tarka.”?',
        options: [
          'Mert ha a kutya fehér, akkor mindkét állítás egyszerre HAMIS',
          'Mert egy kutya egyszerre lehet fekete és tarka',
          'Mert a kutyák színe nem matematikai kérdés',
          'Mert az A állítás rövidebb, mint a B'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy harmadik színű kutyára!',
        explanation: 'Ha Panni kutyája zsemleszínű vagy fehér, akkor sem az A, sem a B állítás nem teljesül. Mivel egyszerre mindkettő lehet hamis, nem egymás tagadásai.'
      },
      {
        id: 'tfq2-5',
        questionTypeBadge: 'Határpont Tagadása',
        question: 'Mi az A: „Többen vagyunk az osztályban, mint 32.” (x > 32) állítás helyes tagadása?',
        figure: <BoundaryNegationSvg size={240} />,
        options: [
          '„Legfeljebb 32-en vagyunk az osztályban.” (x ≤ 32)',
          '„Kevesebben vagyunk az osztályban, mint 32.” (x < 32)',
          '„Pontosan 32-en vagyunk az osztályban.”',
          '„Többen vagyunk az osztályban, mint 33.”'
        ],
        correctAnswer: 0,
        hint: 'Mi történik a határesetben, ha pontosan 32-en vagytok az osztályban?',
        explanation: 'Ha pontosan 32-en vannak, az „x > 32” és az „x < 32” is hamis lenne. Ezért a 32-t a tagadásnak tartalmaznia kell: x ≤ 32, azaz legfeljebb 32-en vagyunk.'
      },
      {
        id: 'tfq2-6',
        questionTypeBadge: 'Mennyiségi Állítás Tagadása',
        question: 'Melyik mondat az A: „Legalább 100 barátom van.” (x ≥ 100) állítás pontos tagadása?',
        options: [
          '„Legfeljebb 99 barátom van.” (x < 100)',
          '„Legfeljebb 100 barátom van.” (x ≤ 100)',
          '„Kevesebb mint 99 barátom van.”',
          '„Több mint 100 barátom van.”'
        ],
        correctAnswer: 0,
        hint: 'Ha 100 barátod van, az eredeti állítás igaz. A tagadásnak ekkor HAMISNAK kell lennie!',
        explanation: 'A „legalább 100” azt jelenti: x ≥ 100. Ennek tagadása: x < 100, ami egész számoknál: x ≤ 99 (legfeljebb 99).'
      },
      {
        id: 'tfq2-7',
        questionTypeBadge: 'Maximum Tagadása',
        question: 'Mi a pontos tagadása a „Ez a könyv maximum 300 oldalas.” (x ≤ 300) kijelentésnek?',
        options: [
          '„Ez a könyv több mint 300 oldalas.” (legalább 301 oldalas)',
          '„Ez a könyv legfeljebb 299 oldalas.”',
          '„Ez a könyv pontosan 300 oldalas.”',
          '„Ez a könyv legalább 300 oldalas.”'
        ],
        correctAnswer: 0,
        hint: 'A „maximum 300” megengedi a 300-at. A tagadásban nem lehet benne a 300!',
        explanation: 'A megengedő reláció (x ≤ 300) tagadása szigorú egyenlőtlenség: x > 300, vagyis a könyv több mint 300 (minimum 301) oldalas.'
      },
      {
        id: 'tfq2-8',
        questionTypeBadge: 'Minden Kvantor Tagadása',
        question: 'Hogyan tagadjuk helyesen az állítást: „A ládában minden kocka barna.”?',
        options: [
          '„A ládában van olyan kocka, amely nem barna.”',
          '„A ládában egyetlen kocka sem barna.”',
          '„A ládában minden kocka fekete.”',
          '„A ládában pontosan egy barna kocka van.”'
        ],
        correctAnswer: 0,
        hint: 'Elég, ha egyetlen nem barna kocka akad a ládában ahhoz, hogy a „minden kocka barna” megbukjon!',
        explanation: 'A „minden A tulajdonságú” állítás tagadása: „létezik legalább egy, amely nem A tulajdonságú” (van olyan kocka, amely nem barna).'
      },
      {
        id: 'tfq2-9',
        questionTypeBadge: 'Létezik Kvantor Tagadása',
        question: 'Mi a tagadása a „Van olyan diák, aki szeret korán kelni.” kijelentésnek?',
        options: [
          '„Egyetlen diák sem szeret korán kelni.” (Minden diák nem szeret)',
          '„Van olyan diák, aki nem szeret korán kelni.”',
          '„Sok diák nem szeret korán kelni.”',
          '„A diákok fele nem szeret korán kelni.”'
        ],
        correctAnswer: 0,
        hint: 'A „van olyan” létezési állítás tagadása egyetemes tagadás.',
        explanation: 'A létezési állítás („van olyan”) pontosan akkor dől meg, ha egyáltalán nincs ilyen elem az univerzumban: azaz egyetlen diák sem szeret korán kelni.'
      },
      {
        id: 'tfq2-10',
        questionTypeBadge: 'Ellentmondásmentesség',
        question: 'Lehetséges-e a klasszikus logikában, hogy egy állítás és annak tagadása egyszerre legyen IGAZ?',
        options: [
          'Nem, az ellentmondásmentesség elve miatt szigorúan kizárt',
          'Igen, ha a mondat szimbolikus jelentésű',
          'Igen, ha két különböző ember mondja',
          'Csak a végtelen halmazok elméletében lehetséges'
        ],
        correctAnswer: 0,
        hint: 'A és ¬A sosem metszhetik egymást.',
        explanation: 'Az ellentmondásmentesség elve szerint semmilyen állítás nem lehet egyszerre igaz és hamis is: A ∧ ¬A azonosan hamis (ellentmondás).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi és Kompetenciamérés Típusú Feladványok (Haladó)',
    subtitle: 'Festett kockák, érettségi logikai következtetések és kombinált feladványok.',
    range: '21–30. feladat',
    focus: 'Összetett következtetések és fejtörők',
    questions: [
      {
        id: 'tfq3-1',
        questionTypeBadge: 'Festett Kocka (Élek)',
        question: 'Egy 3×3×3-as fehér kocka minden lapját pirosra festjük, majd feldaraboljuk 27 egybevágó kis kockára. Hány olyan kis kocka keletkezik, amelynek PONTOSAN 2 LAPJA piros?',
        figure: <PaintedCubeSvg size={240} />,
        options: [
          '12 darab (az élek középső kockái)',
          '8 darab (a csúcskockák)',
          '6 darab (a lapközépi kockák)',
          '1 darab (a belső kocka)'
        ],
        correctAnswer: 0,
        hint: 'Hol találhatók azok a kockák, amelyeknek pontosan két külső határoló lapjuk van? Az éleken!',
        explanation: 'A kockának 12 éle van. Egy 3-as élhosszúságú élen a két sarok a csúcsokhoz tartozik (3 piros lap), a belső 1 darab pedig pontosan 2 lapján piros. 12 él × 1 = 12 db élkocka.'
      },
      {
        id: 'tfq3-2',
        questionTypeBadge: 'Festett Kocka (Csúcsok)',
        question: 'A 27 kis kocka közül hány darabnak lesz PONTOSAN 3 LAPJA pirosra festve?',
        options: [
          '8 darab (a kocka 8 csúcsánál lévő kockák)',
          '12 darab',
          '6 darab',
          '4 darab'
        ],
        correctAnswer: 0,
        hint: 'Hány csúcsa van a kockának?',
        explanation: 'Csak a csúcsokban elhelyezkedő kockáknak látszik ki 3 lapjuk a nagykocka felületén. A kockának 8 csúcsa van, így pontosan 8 ilyen kis kocka létezik.'
      },
      {
        id: 'tfq3-3',
        questionTypeBadge: 'Festett Kocka (Legalább 2)',
        question: 'Döntsd el az állítás igazságértékét: „Azon kis kockák száma, amelyeknek legalább 2 lapja piros, osztható 4-gyel vagy 5-tel.”',
        options: [
          'Igaz állítás (mert 8 csúcs + 12 él = 20 kocka, ami 4-gyel és 5-tel is osztható)',
          'Hamis állítás (mert a 20 nem osztható 4-gyel)',
          'Hamis állítás (mert csak 14 ilyen kocka van)',
          'Nem állítás, mert valószínűségi kérdés'
        ],
        correctAnswer: 0,
        hint: 'A legalább 2 azt jelenti: pontosan 2 lapja piros VAGY pontosan 3 lapja piros.',
        explanation: 'A legalább két piros lapú kockák száma: 12 (él) + 8 (csúcs) = 20 darab. A 20 osztható 4-gyel (20 / 4 = 5) és 5-tel is (20 / 5 = 4), így az állítás IGAZ.'
      },
      {
        id: 'tfq3-4',
        questionTypeBadge: 'Festett Kocka (Belső Mag)',
        question: 'Hány olyan kis kocka van a 27 darab között, amelynek EGYETLEN LAPJA SEM lett piros (0 piros lap)?',
        options: [
          '1 darab (a nagykocka legbelső magkockája)',
          '0 darab (mindegyik kapott festéket)',
          '6 darab',
          '3 darab'
        ],
        correctAnswer: 0,
        hint: '(3 - 2) × (3 - 2) × (3 - 2) = ?',
        explanation: 'A külső rétegek levonása után a belső mag mérete 1×1×1 = 1 kocka. Ennek egyetlen lapja sem érintkezett a külső festékkel, így 0 piros lapja van.'
      },
      {
        id: 'tfq3-5',
        questionTypeBadge: 'Logikai Következtetés (Gyakorló)',
        question: 'Tudjuk, hogy: „Morzsa kutya kedveli Cili cicát.” Melyik állítás következik ebből BIZTOSAN logikailag?',
        options: [
          '„Van olyan kutya, amelyik kedveli Cili cicát.”',
          '„Morzsa kutya minden macskát kedvel.”',
          '„Minden kutya kedveli Cili cicát.”',
          '„Van olyan kutya, amelyik nem kedveli Cili cicát.”'
        ],
        correctAnswer: 0,
        hint: 'Ha egy konkrét egyedre igaz a tulajdonság, mit állíthatunk a létezésről?',
        explanation: 'Mivel Morzsa maga egy kutya, aki kedveli Cilit, ez közvetlen bizonyíték arra, hogy LÉTEZIK olyan kutya (legalább Morzsa), aki kedveli Cili cicát. A többi macskáról vagy kutyáról semmit sem tudunk.'
      },
      {
        id: 'tfq3-6',
        questionTypeBadge: 'Összetett Feltétel (Dominik)',
        question: 'Tudjuk, hogy Dominik a pályán pontrúgásban és hosszú passzokban is kiemelkedően jó. Melyik kijelentés HAMIS az alábbiak közül?',
        options: [
          '„Dominik ügyes a hosszú passzokban, de nem sikeres a pontrúgásokban.”',
          '„Dominik kitűnő pontrúgásokat végez.”',
          '„Dominiknek pontosak a hosszú passzai, vagy jól végzi el a pontrúgásokat.”',
          '„Nem igaz, hogy Dominik pontatlanul passzol.”'
        ],
        correctAnswer: 0,
        hint: 'Keresd azt az opciót, amely tagadja Dominik valamelyik bizonyított képességét!',
        explanation: 'Mivel tudjuk, hogy Dominik pontrúgásban IS sikeres, az az állítás, miszerint „nem sikeres a pontrúgásokban”, egyértelműen HAMIS.'
      },
      {
        id: 'tfq3-7',
        questionTypeBadge: 'A 4 Aranyműves Segéd',
        question: 'Négy segéd közül pontosan kettő mond igazat. Tóbiás: „A 2. a legkönnyebb.”, Móric: „A 2. a legnehezebb.”, Jónás: „A 2. nem a legnehezebb és nem is a legkönnyebb.”, Kázmér: „A 4. a legkönnyebb.” Melyik két segéd mondott IGAZAT?',
        options: [
          'Kázmér és Jónás',
          'Tóbiás és Móric',
          'Kázmér és Tóbiás',
          'Móric és Jónás'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg a 2. nyakláncra vonatkozó három állítást: kizárják egymást, és lefedik az összes esetet!',
        explanation: 'A 2. nyakláncra Tóbiás, Móric és Jónás három egymást kizáró és teljes eseményrendszert alkotó kijelentést tett: közülük PONTOSAN EGY igaz. Mivel összesen két igaz állítás van, a fennmaradó Kázmér kijelentése BIZTOSAN IGAZ („A 4. a legkönnyebb”). Így Tóbiás („2. legkönnyebb”) hamis, Móric hamis, tehát Jónás és Kázmér mondott igazat!'
      },
      {
        id: 'tfq3-8',
        questionTypeBadge: 'Halmazelméleti Következtetés',
        question: 'Döntsd el az állítás igazságértékét: „Ha egy A halmaz valódi részhalmaza a B halmaznak (A ⊂ B), és B véges halmaz, akkor |A| < |B|.”',
        options: [
          'Igaz állítás (valódi részhalmaz esetén van olyan eleme B-nek, ami nem eleme A-nak, így elemszáma kisebb)',
          'Hamis állítás (az elemszámuk megegyezhet)',
          'Nem állítás, csak definíció',
          'Csak akkor igaz, ha A üres halmaz'
        ],
        correctAnswer: 0,
        hint: 'Mit jelent a valódi részhalmaz kifejezés véges halmazoknál?',
        explanation: 'Véges halmazoknál a valódi részhalmaz (A ⊂ B) azt jelenti, hogy A ⊆ B és A ≠ B. Emiatt van legalább egy olyan elem B-ben, ami A-ban nincs benne, így |A| szigorúan kisebb, mint |B|. Az állítás IGAZ.'
      },
      {
        id: 'tfq3-9',
        questionTypeBadge: 'Társasjáték Következtetés',
        question: 'A 100 mezős játékban Marci a 95., Imre a 89. mezőn áll. Egy dobókockával dobnak (1-6). Melyik állítás IGAZ az alábbiak közül?',
        options: [
          '„Lehetetlen, hogy Imre bábuja a következő dobás után a 96. mezőn álljon.”',
          '„Biztos, hogy Marci nyeri meg a játékot.”',
          '„Imre biztosan beéri Marcit 2 körön belül.”',
          '„Marci nem nyerhet a legközelebbi dobással.”'
        ],
        correctAnswer: 0,
        hint: 'Imre a 89.-en áll. Mennyit kellene dobnia, hogy a 96.-ra lépjen? (96 - 89 = 7)',
        explanation: 'Mivel 96 - 89 = 7 mező különbség van, és egy szabályos dobókockával legfeljebb 6-ot lehet dobni, valóban LEHETETLEN, hogy Imre egyetlen dobással a 96. mezőre érjen. Az állítás IGAZ.'
      },
      {
        id: 'tfq3-10',
        questionTypeBadge: 'Tudáspróba Összegzés',
        question: 'Mi a legfontosabb különbség a logikai tagadás (¬A) és egy egyszerű ellentétes értelmű szó (pl. fekete vs. fehér) között?',
        options: [
          'A logikai tagadás az univerzum MINDEN egyéb esetét lefedi (nem lehet mindkettő hamis), míg az ellentétpárnál maradhatnak köztes esetek',
          'Nincs különbség, a kettő pontosan ugyanazt jelenti',
          'A logikai tagadást csak matematikai formulákra lehet alkalmazni',
          'Az ellentétes értelmű szó mindig hosszabb, mint a negáció'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a kizárt harmadik törvényére: A ∨ ¬A mindig az egész univerzumot lefedi!',
        explanation: 'A logikai tagadás lényege, hogy A és ¬A felosztja a teljes univerzumot: minden objektum pontosan az egyikbe tartozik. Egy hétköznapi ellentét (pl. fekete/fehér, pozitív/negatív) kihagyhat köztes eseteket (szürke, 0), így azok egyszerre is hamisak lehetnek.'
      }
    ]
  }
};

export const TrueOrFalseQuiz: React.FC<TrueOrFalseQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="1. Igaz vagy hamis?"
      subtitle="Kijelentések, igazságértékek, logikai alapelvek és a negáció pontos alkalmazása"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      badgeText="10. OSZTÁLY • I. LOGIKA • 1. LECKE"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • Igaz vagy hamis?"
      matcherComponent={
        <TrueOrFalseMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <TrueOrFalseSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default TrueOrFalseQuiz;

