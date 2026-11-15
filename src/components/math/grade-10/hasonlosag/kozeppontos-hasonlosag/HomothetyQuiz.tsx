import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { HomothetyMatcher } from './HomothetyMatcher';
import { HomothetySorter } from './HomothetySorter';
import {
  CircleHomothetySvg,
  CircleTouchingDilationSvg,
  InvariantLinesSvg,
  AngleInterceptThalesSvg,
  PyramidDilationSvg
} from './HomothetyFigures';

interface HomothetyQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Körök középpontos hasonlósága',
    description: 'Bármely két egy síkban fekvő, különböző sugarú kör (r₁ ≠ r₂) mindig középpontosan hasonló. Két hasonlósági centrumuk van a centrálison: a külső (H_k, külső érintők metszéspontja, λ > 0) és a belső (H_b, belső érintők metszéspontja, λ < 0).',
    note: 'Kör képe mindig kör! A kör középpontjának képe a képkör középpontja, sugara pedig r\' = |λ| · r.',
    color: 'from-sky-500 to-blue-600',
    figure: <CircleHomothetySvg size={260} />
  },
  {
    title: 'Fixpontok és fixegyenesek',
    description: 'Ha a hasonlósági arány λ ≠ 1, akkor pontosan egyetlen fixpont létezik: maga az O centrum. Az O-n átmenő egyenesek mind fixegyenesek (önmagukba képződnek), de a pontjaik elmozdulnak! Az O-ra nem illeszkedő egyenesek képe párhuzamos az eredetivel.',
    note: 'Vigyázz: egyenes fixegyenes volta nem jelenti azt, hogy pontonként fix!',
    color: 'from-amber-500 to-orange-600',
    figure: <InvariantLinesSvg size={260} />
  },
  {
    title: 'Hasonlóság vs. Középpontos hasonlóság',
    description: 'Bár minden négyzet hasonló egymáshoz, KÖZÉPPONTOSAN csak akkor hasonlók, ha megfelelő oldalaik párhuzamosak! Ugyanez érvényes a kockákra is. Ezzel szemben két gömb vagy két kör mindig középpontosan hasonló.',
    note: 'A szög szárait metsző párhuzamosok háromszögei (△OAD és △OBE) középpontosan hasonlók az O csúcsból, de a köztük lévő trapézok (ABED és BCFE) nem!',
    color: 'from-purple-500 to-indigo-600',
    figure: <AngleInterceptThalesSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Fixpontok, fixegyenesek és alaptulajdonságok',
    subtitle: '10 alapozó feladat az invariáns elemekről, egyenesekről és a körök képéről',
    range: '1–10. kérdés',
    focus: 'Fixpont, fixegyenes, párhuzamosság, kör sugara és középpontja',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'hq1-1',
        level: 1,
        question: 'Mi a középpontos hasonlóság egyetlen fixpontja, ha a hasonlósági arány λ ≠ 1?',
        options: [
          'A hasonlóság O középpontja (centrum)',
          'Az alakzat súlypontja',
          'A koordinátarendszer origója',
          'Végtelen sok fixpont van minden irányban'
        ],
        correctAnswer: 0,
        explanation: 'A definíció szerint csak az O pont felel meg az O\' = O egyenlőségnek. Ha λ ≠ 1, semmilyen más pont nem maradhat helyben.',
        hint: 'Melyik pontból mérjük a távolságokat a definíció szerint?'
      },
      {
        id: 'hq1-2',
        level: 1,
        question: 'Mely egyenesek a középpontos hasonlóság fixegyenesei (önmagukba leképeződő egyenesei)?',
        options: [
          'Kizárólag az O centrumon áthaladó egyenesek',
          'Az O-ra merőleges egyenesek',
          'A koordinátatengelyekkel párhuzamos egyenesek',
          'Minden egyenes a síkban'
        ],
        correctAnswer: 0,
        explanation: 'Egy pont képe P\' az OP egyenesen fekszik. Ezért egy egyenes akkor és csak akkor képeződik le önmagára, ha tartalmazza a centrumot (O).',
        hint: 'A sugarak O-ból indulnak ki.'
      },
      {
        id: 'hq1-3',
        level: 1,
        question: 'Mi lesz egy kör képe középpontos hasonlóság során?',
        options: [
          'Mindig kör, melynek sugara r\' = |λ| · r',
          'Ellipszis, ha az arány nem egész szám',
          'Parabola',
          'Kör, melynek sugara mindig megegyezik az eredetivel'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a távolságok minden irányban azonos |λ| aránnyal skálázódnak, a középponttól azonos távolságra lévő pontok képei is azonos távolságra lesznek a képi középponttól: a kép mindig kör marad.',
        hint: 'A hasonlóság alaktartó transzformáció.'
      },
      {
        id: 'hq1-4',
        level: 1,
        question: 'Egy 5 cm sugarú kört kicsinyítünk λ = 0,5 aránnyal. Mekkora lesz a képi kör sugara és területe?',
        options: [
          'Sugár: 2,5 cm, Terület: az eredeti negyede (0,25×)',
          'Sugár: 2,5 cm, Terület: az eredeti fele (0,5×)',
          'Sugár: 10 cm, Terület: 4-szeres',
          'Sugár: 5 cm, Terület: változatlan'
        ],
        correctAnswer: 0,
        explanation: 'r\' = 0,5 · 5 = 2,5 cm. A terület T\' = λ² · T = 0,5² · T = 0,25 · T (az eredeti negyede).',
        hint: 'A sugár lineárisan (0,5×), a terület kvadratikusan (0,5² = 0,25×) változik.'
      },
      {
        id: 'hq1-5',
        level: 1,
        question: 'Hogyan képződik le egy kör K középpontja a középpontos hasonlóságban?',
        options: [
          'A képi kör K\' középpontjába képződik le',
          'A körvonal egy tetszőleges pontjába',
          'Helyben marad a síkon',
          'Az O centrumba olvad be'
        ],
        correctAnswer: 0,
        explanation: 'A kör szimmetriája miatt a kör középpontjának képe pontosan a nagyított vagy kicsinyített kör középpontja lesz (K ↦ K\').',
        hint: 'A pontok távolságaránya a középpontra nézve is érvényes.'
      },
      {
        id: 'hq1-6',
        level: 1,
        question: 'Egy f egyenes átmegy az O hasonlósági centrumon. Igaz-e, hogy az f egyenes minden pontja fixpont?',
        options: [
          'Nem igaz: az egyenes maga fixegyenes, de egyedül az O pont fixpont rajta',
          'Igaz: minden pontja helyben marad',
          'Csak akkor igaz, ha λ > 1',
          'Csak akkor igaz, ha az egyenes függőleges'
        ],
        correctAnswer: 0,
        explanation: 'Fontos definícióbeli különbség: a pontok az egyenes mentén elmozdulnak (|OP\'| = |λ| · |OP|), így csak mint halmaz képeződik le önmagára. Egyetlen fixpont van: maga az O.',
        hint: 'Gondolj arra, mi történik egy P ponttal az egyenesen, ha λ = 2.'
      },
      {
        id: 'hq1-7',
        level: 1,
        question: 'Egy sokszög megfelelő belső szögei a középpontos hasonlóság után:',
        options: [
          'Pontosan megegyeznek az eredeti szögekkel (szögtartás)',
          'A hasonlósági aránnyal arányosan nőnek',
          'A felükre csökkennek, ha kicsinyítünk',
          'Csak derékszögek esetén maradnak változatlanok'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos hasonlóság szigorúan szögtartó: α\' = α, β\' = β minden sokszögre érvényes.',
        hint: 'Az alakzatok hasonlóságának alaptulajdonsága a megfelelő szögek egyenlősége.'
      },
      {
        id: 'hq1-8',
        level: 1,
        question: 'Két sokszög középpontosan hasonló. Milyen viszonyban vannak az egymásnak megfelelő oldalaik egyenesei?',
        options: [
          'Párhuzamosak egymással vagy egybeesnek',
          'Merőlegesek egymásra',
          'Tetszőleges szöget bezárhatnak',
          'Mindig metszik egymást 45°-ban'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos hasonlóságban bármely egyenes képe párhuzamos az eredetivel (vagy egybeesik vele, ha átmegy O-n). Ezért a megfelelő oldalak mindig párhuzamosak!',
        hint: 'A megfelelő oldalak párhuzamosak: AB ∥ A\'B\', BC ∥ B\'C\'.'
      },
      {
        id: 'hq1-9',
        level: 1,
        question: 'Két koncentrikus kör (közös középpontú körök, r₁ ≠ r₂) középpontosan hasonló-e?',
        options: [
          'Igen, a közös középpont a hasonlóság centruma, az arány pedig λ = r₂/r₁',
          'Nem, mert nincs közös érintőjük',
          'Csak akkor, ha a sugaraik egész számok',
          'Nem, mert egymásban fekszenek'
        ],
        correctAnswer: 0,
        explanation: 'A közös középpontból bármelyik kör átvihető a másikba λ = r₂/r₁ arányú középpontos hasonlósággal.',
        hint: 'A közös középpontból minden sugár arányosan megnyújtható.'
      },
      {
        id: 'hq1-10',
        level: 1,
        question: 'Egy síkidomot O-ból λ = 1 aránnyal transzformálunk. Mi lesz az eredmény?',
        options: [
          'Az alakzat önmaga marad (identitás / helybenhagyás)',
          'Ponttá zsugorodik az O-ban',
          'Kétszer akkora lesz',
          'Tükröződik az O pontra'
        ],
        correctAnswer: 0,
        explanation: 'Ha λ = 1, akkor minden pontra OP\' = 1 · OP = OP, tehát minden pont önmagába képeződik le (identitás).',
        hint: '1-gyel való szorzás nem változtat semmin.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Körök hasonlósági pontjai és szelőszakaszok',
    subtitle: '10 feladat a külső és belső hasonlósági pontokról, érintőkről és trapézokról',
    range: '11–20. kérdés',
    focus: 'H_k és H_b pontok, érintők, szög szárait metsző párhuzamosok, gömbök méretei',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    questions: [
      {
        id: 'hq2-1',
        level: 2,
        question: 'Két különböző sugarú, egymást kívülről elkerülő síkbeli körnek hány hasonlósági középpontja létezik a síkban?',
        options: [
          'Pontosan 2: egy külső (H_k) és egy belső (H_b) hasonlósági pont',
          'Csak 1 hasonlósági pont',
          'Végtelen sok',
          'Egyetlenegy sem'
        ],
        correctAnswer: 0,
        explanation: 'A két körnek két hasonlósági centruma van a centrálison: a külső közös érintők metszéspontja (H_k, pozitív arány) és a belső közös érintők metszéspontja (H_b, negatív arány).',
        hint: 'Nézd meg a két kör külső és belső közös érintőit!'
      },
      {
        id: 'hq2-2',
        level: 2,
        question: 'Melyik egyenesen helyezkedik el két kör külső és belső hasonlósági pontja?',
        options: [
          'A két kör középpontját összekötő egyenesen (a centrálison)',
          'A két kör közös húrján',
          'A két kör sugarainak felezőmerőlegesén',
          'A sík egy tetszőleges egyenesén'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a transzformáció az O₁ középpontot az O₂ középpontba viszi át, az O₁ és O₂ pontoknak a hasonlósági centrummal egy egyenesen kell lenniük. Ez a centrális egyenes.',
        hint: 'Centrum, O₁ és O₂ mindig egy egyenesbe esik.'
      },
      {
        id: 'hq2-3',
        level: 2,
        question: 'Egy kör sugara R = 5 cm. A hasonlóság O centruma a körvonalon helyezkedik el, az arány λ = 0,5. Milyen helyzetben lesz az új kör az eredetihez képest?',
        options: [
          'Az új kör az O pontban belülről érinti az eredeti kört',
          'Az új kör koncentrikus lesz az eredetivel',
          'A két kör két pontban metszi egymást',
          'Az új kör teljesen kívül esik az eredetin'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az O pont a körvonalon van és fixpont (O\' = O), az O pont mindkét körnek pontja. Mivel az O-beli érintő mindkét kör közös érintője, az új kör belülről érinti az eredetit.',
        hint: 'Az O pont közös pontja mindkét körnek, és a sugár feleakkora.'
      },
      {
        id: 'hq2-4',
        level: 2,
        question: 'Az O csúcsú szög szárait három párhuzamos egyenessel metszettük: AD, BE, CF. Melyik állítás IGAZ az alábbiak közül?',
        options: [
          'Az △OAD és △OBE háromszögek középpontosan hasonlók az O csúcsból',
          'Az ABED és BCFE trapézok középpontosan hasonlók az O csúcsból',
          'Az OCF és OBD háromszögek középpontosan hasonlók',
          'Az ABED és ACFD trapézok középpontosan hasonlók az O csúcsból'
        ],
        correctAnswer: 0,
        explanation: 'Az OAD és OBE háromszögek az O csúcsból sugarasan tágulnak ki, oldalaik párhuzamosak, így középpontosan hasonlók. A trapézok viszont nem vihetők át egymásba az O-ból, mert a párhuzamos alapjaik aránya nem egyezik a csúcsok távolságarányával!',
        hint: 'A csúcsból induló háromszögek hasonlók, a levágott trapézok nem!'
      },
      {
        id: 'hq2-5',
        level: 2,
        question: 'Egy gömb sugara 6 cm. λ = 0,5 arányú kicsinyítéssel mekkora lesz a képi gömb felszínének és térfogatának aránya az eredetihez képest?',
        options: [
          'Felszín: 1/4-e (0,25×), Térfogat: 1/8-a (0,125×)',
          'Felszín: 1/2-e, Térfogat: 1/4-e',
          'Felszín: 1/4-e, Térfogat: 1/16-a',
          'Mindkettő az 1/2-ére csökken'
        ],
        correctAnswer: 0,
        explanation: 'A felszín területi jellegű (A = 4r²π), ezért λ² = 0,5² = 0,25 (negyede). A térfogat köbös (V = 4/3 r³π), ezért λ³ = 0,5³ = 0,125 (nyolcada).',
        hint: 'Felszínarány: λ², térfogatarány: λ³.'
      },
      {
        id: 'hq2-6',
        level: 2,
        question: 'Két kör sugara r₁ = 3 cm és r₂ = 6 cm. A középpontjaik távolsága |O₁O₂| = 12 cm. Milyen messze van a külső hasonlósági pont (H_k) az O₁ ponttól?',
        options: [
          '12 cm-re az O₁-től (az O₂-vel ellentétes oldalon: |H_k O₁| = 12 cm)',
          '6 cm-re',
          '24 cm-re',
          '4 cm-re'
        ],
        correctAnswer: 0,
        explanation: 'A hasonlóság aránya λ = r₂/r₁ = 6/3 = 2. Mivel |H_k O₂| = 2 · |H_k O₁| és |H_k O₂| = |H_k O₁| + |O₁O₂|, ezért |H_k O₁| = |O₁O₂| = 12 cm.',
        hint: 'A távolságok aránya megegyezik a sugarak arányával: H_k O₂ / H_k O₁ = 2.'
      },
      {
        id: 'hq2-7',
        level: 2,
        question: 'Mi történik a külső hasonlósági ponttal (H_k), ha a két kör egyenlő sugarú (r₁ = r₂), de különböző középpontú?',
        options: [
          'Nem létezik véges pontként a síkon (a külső közös érintők párhuzamosak egymással)',
          'A két kör középpontjának felezőpontjába esik',
          'A sík bármely pontja lehet',
          'Egybeesik az O₁ középponttal'
        ],
        correctAnswer: 0,
        explanation: 'Ha r₁ = r₂, akkor a sugarak aránya λ = 1 (egybevágóság). A külső érintők párhuzamosak, így nincs véges metszéspontjuk (az alakzat eltolással vihető át).',
        hint: 'Párhuzamos egyenesek nem metszik egymást a véges síkon.'
      },
      {
        id: 'hq2-8',
        level: 2,
        question: 'Két kör sugarai 4 cm és 2 cm, középpontjaik távolsága 9 cm. Hol helyezkedik el a belső hasonlósági pont (H_b)?',
        options: [
          'Az O₁O₂ szakaszon, az O₁-től 6 cm-re, az O₂-től 3 cm-re',
          'Az O₁-től 3 cm-re, az O₂-től 6 cm-re',
          'Az O₁O₂ szakaszon kívül',
          'A szakasz pontos felezőpontjában'
        ],
        correctAnswer: 0,
        explanation: 'A belső hasonlósági pont az O₁O₂ szakaszt a sugarak arányában osztja: |H_b O₁| : |H_b O₂| = 4 : 2 = 2 : 1. A 9 cm-es távolságot 2:1 arányban osztva: 6 cm és 3 cm.',
        hint: '4 + 2 = 6 rész, 9 / 3 = 3 cm egy egység.'
      },
      {
        id: 'hq2-9',
        level: 2,
        question: 'Miért NEM középpontosan hasonlók az ABED és BCFE trapézok az O pontból a szögszárakat metsző párhuzamosok esetén?',
        options: [
          'Mert a megfelelő oldalaik hosszának aránya nem egyezik meg az O-ból mért távolságok arányával',
          'Mert nem párhuzamosak a szárai',
          'Mert belső szögeik különbözőek',
          'Mert a trapézok nem síkidomok'
        ],
        correctAnswer: 0,
        explanation: 'Egy O-ból való középpontos hasonlóság minden pontot azonos λ aránnyal mozdítana el. A két trapéz megfelelő oldalainak aránya azonban nem állandó az O centrumból.',
        hint: 'A trapéz felső és alsó alapjának aránya megváltozik.'
      },
      {
        id: 'hq2-10',
        level: 2,
        question: 'Egy egyenlő oldalú háromszög oldala 8 cm. Egyik oldalfelező pontjából λ = 0,5 aránnyal kicsinyítjük. Mekkora lesz az új háromszög területe az eredetihez képest?',
        options: [
          'Pontosan az eredeti terület 1/4-e (0,25×)',
          'Az eredeti terület fele',
          'Az eredeti terület 1/8-a',
          'Változatlan marad'
        ],
        correctAnswer: 0,
        explanation: 'A hasonlóság aránya 0,5, így a területarány a centrum helyétől függetlenül mindig λ² = 0,5² = 0,25 (1/4).',
        hint: 'A területarány csak a hasonlósági aránytól függ, a centrum elhelyezkedésétől független!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Térbeli gúlák, elforgatott alakzatok és érettségi alkalmazások',
    subtitle: '10 emelt szintű feladat a gúlák nagyításáról, cáfolatokról és térbeli összefüggésekről',
    range: '21–30. kérdés',
    focus: 'Gúla nagyítása az E csúcsból (λ = 2, 8, 100, √2), négyzetek és kockák cáfolata, sokszögek',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-red-600',
    questions: [
      {
        id: 'hq3-1',
        level: 3,
        question: 'Igaz-e, hogy bármely két nem egybevágó négyzet középpontosan hasonló?',
        options: [
          'Hamis, mert ha az egyik négyzet el van forgatva a másikhoz képest, oldalaik nem párhuzamosak, így nem létezik középpontos hasonlóság',
          'Igaz, mert minden négyzet hasonló egymáshoz',
          'Igaz, mert a négyzetek szögei mindig 90°-osak',
          'Csak akkor igaz, ha a középpontjaik egybeesnek'
        ],
        correctAnswer: 0,
        explanation: 'Minden négyzet hasonló, de KÖZÉPPONTOSAN csak akkor hasonlók, ha megfelelő oldalaik párhuzamosak egymással! Ha el vannak forgatva, nincs olyan O pont, amiből átvihetők lennének.',
        hint: 'A középpontos hasonlóság mindig megtartja az egyenesek irányát (párhuzamosságtartó).'
      },
      {
        id: 'hq3-2',
        level: 3,
        question: 'Igaz-e, hogy bármely két egy síkban fekvő, nem egybevágó kör középpontosan hasonló?',
        options: [
          'Igaz, mert a körök középpontjait összekötő centrálison mindig létezik külső és belső hasonlósági pont',
          'Hamis, ha a körök metszik egymást',
          'Hamis, ha az egyik kör a másik belsejében van',
          'Csak koncentrikus körökre igaz'
        ],
        correctAnswer: 0,
        explanation: 'Bármely két körnek van külső és belső hasonlósági pontja a centrálison (r₁ ≠ r₂ esetén), amiből a kör sugara és középpontja átvihető. Ezért mindig középpontosan hasonlók!',
        hint: 'A kör teljesen forgásszimmetrikus, nincs „elforgatott” állása.'
      },
      {
        id: 'hq3-3',
        level: 3,
        question: 'Igaz-e, hogy bármely két gömb középpontosan hasonló a térben?',
        options: [
          'Igaz, a középpontjaikat összekötő egyenesen lévő pontokból mindig középpontosan hasonlóak',
          'Hamis, a térben nem értelmezhető középpontos hasonlóság',
          'Csak akkor, ha a középpontjaik egybeesnek',
          'Hamis, ha különböző anyagból készültek'
        ],
        correctAnswer: 0,
        explanation: 'A gömbök tökéletesen gömbszimmetrikusak, így a centrális egyenesen lévő hasonlósági centrumokból mindig középpontosan egymásba nagyíthatók/kicsinyíthetők.',
        hint: 'A gömb a kör 3 dimenziós megfelelője.'
      },
      {
        id: 'hq3-4',
        level: 3,
        question: 'Egy ABCDE szabályos négyoldalú gúlát az E csúcsából középpontosan nagyítunk λ = 8 aránnyal. Hányszorosa lesz a nagyított gúla alapterülete az eredetinek?',
        options: [
          '64-szerese (8²)',
          '8-szorosa',
          '512-szerese',
          '16-szorosa'
        ],
        correctAnswer: 0,
        explanation: 'Az alapterület a hasonlósági arány négyzetével nő: T\' = λ² · T = 8² · T = 64 · T.',
        hint: 'Területarány = λ².'
      },
      {
        id: 'hq3-5',
        level: 3,
        question: 'Ugyanezt a gúlát az E csúcsból λ = 100 aránnyal nagyítva hányszorosa lesz az oldallapok kerülete az eredeti ABE oldallap kerületének?',
        options: [
          '100-szorosa',
          '10 000-szerese',
          '1 000 000-szorosa',
          '50-szerese'
        ],
        correctAnswer: 0,
        explanation: 'A kerület egydimenziós hosszúság, így aránya megegyezik magával a hasonlósági aránnyal: K\' = λ · K = 100 · K.',
        hint: 'A kerület mindig λ-szorosára változik.'
      },
      {
        id: 'hq3-6',
        level: 3,
        question: 'A gúlát az E csúcsból λ = √2 aránnyal nagyítjuk. Hányszorosa lesz a nagyított gúla alapterülete és oldallapjainak kerülete az eredetinek?',
        options: [
          'Alapterület: 2-szerese ( (√2)² ), Kerület: √2-szerese',
          'Alapterület: √2-szerese, Kerület: 2-szerese',
          'Alapterület: 4-szerese, Kerület: 2-szerese',
          'Mindkettő 2-szerese'
        ],
        correctAnswer: 0,
        explanation: 'Kerület: K\' = √2 · K. Terület: T\' = (√2)² · T = 2 · T.',
        hint: 'A területek szorzója (√2)² = 2, a kerületek szorzója √2.'
      },
      {
        id: 'hq3-7',
        level: 3,
        question: 'Mi a feltétele annak, hogy két nem egybevágó kocka középpontosan hasonló legyen a térben?',
        options: [
          'Megfelelő éleik páronként párhuzamosak legyenek egymással',
          'Csak az, hogy a térfogatuk aránya egész szám legyen',
          'Semmilyen feltétel nem szükséges, bármely két kocka automatikusan az',
          'Közös csúcsuk kell, hogy legyen'
        ],
        correctAnswer: 0,
        explanation: 'Bár minden kocka hasonló egymáshoz, a középpontos hasonlóság párhuzamosságtartó: csak akkor középpontosan hasonlók, ha az éleik iránya megegyezik (nincsenek elforgatva).',
        hint: 'Ugyanaz az elv, mint a síkban a négyzeteknél.'
      },
      {
        id: 'hq3-8',
        level: 3,
        question: 'Egy gömb sugara R. Egy pontból kicsinyítve a térfogata az eredeti 1/27-ed része lett. Mekkora a hasonlóság aránya (λ > 0)?',
        options: [
          'λ = 1/3',
          'λ = 1/9',
          'λ = 1/27',
          'λ = 3'
        ],
        correctAnswer: 0,
        explanation: 'A térfogatarány a hasonlósági arány köbe: V\'/V = λ³ = 1/27. Köbgyököt vonva: λ = ∛(1/27) = 1/3.',
        hint: 'Melyik szám köbe 1/27? 3³ = 27.'
      },
      {
        id: 'hq3-9',
        level: 3,
        question: 'Adott a síkban egy ABC háromszög és egy A\'B\'C\' háromszög. Megfelelő oldalaik páronként párhuzamosak és nem egyenlő hosszúak. Következik-e ebből, hogy a háromszögek középpontosan hasonlók?',
        options: [
          'Igen, a megfelelő csúcsokat összekötő egyenesek (AA\', BB\', CC\') egyetlen O pontban metszik egymást',
          'Nem, csak akkor, ha a háromszögek derékszögűek',
          'Nem, mert lehet, hogy nem hasonlók',
          'Csak egyenlő szárú háromszögekre igaz'
        ],
        correctAnswer: 0,
        explanation: 'Ha két háromszög megfelelő oldalai párhuzamosak és nem egyenlők, akkor a szelőtételek miatt a csúcsokat összekötő egyenesek egy pontban metszik egymást, amely a középpontos hasonlóság centruma.',
        hint: 'Desargues-tétel és a párhuzamos szelők összefüggése.'
      },
      {
        id: 'hq3-10',
        level: 3,
        question: 'Két kör egymást két pontban metszi (r₁ ≠ r₂). Létezik-e hozzájuk külső és belső hasonlósági pont a síkban?',
        options: [
          'Igen, metsző körök esetén is létezik mind a külső, mind a belső hasonlósági pont a centrális egyenesen',
          'Csak belső hasonlósági pont létezik',
          'Nem létezik, mert a metsző körök nem lehetnek hasonlók',
          'Csak külső hasonlósági pont létezik'
        ],
        correctAnswer: 0,
        explanation: 'A hasonlósági pontok létezése nem függ attól, hogy a körök metszik-e egymást: amíg r₁ ≠ r₂, a centrális egyenesen a sugarak arányában mindig egyértelműen kijelölhető a H_k és a H_b pont!',
        hint: 'A H_k és H_b a középpontok és sugarak arányából mindig kiszámítható algebrailag.'
      }
    ]
  }
};

export const HomothetyQuiz: React.FC<HomothetyQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      topicTitle="2. Középpontos hasonlóság"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <HomothetyMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <HomothetySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default HomothetyQuiz;

