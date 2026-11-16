import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatDataCollectionMatcher } from './StatDataCollectionMatcher';
import { StatDataCollectionSorter } from './StatDataCollectionSorter';
import { SFig, SVenn, STable, SBarChart, SText, S_BLUE, S_AMBER, S_RED, S_GREEN, S_AXIS } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const venn = (a: string, ab: string, b: string, none: string | undefined, la: string, lb: string) => (
  <SFig w={240} h={165} className="w-full max-w-[280px] h-auto mx-auto">
    <SVenn onlyA={a} both={ab} onlyB={b} none={none} labelA={la} labelB={lb} labelU="U" cy={86} />
  </SFig>
);

const FIG_TOWN = (
  <SFig w={300} h={86} className="w-full max-w-[340px] h-auto mx-auto">
    <STable
      x={6}
      y={10}
      colW={[60, 60, 58, 58, 52]}
      rowH={20}
      s={8}
      rows={[
        ['', 'alapfokú', 'szakiskola', 'érettségi', 'felsőfokú'],
        ['Nők', 1927, 1281, 2271, 1121],
        ['Férfiak', 1610, 1963, 1845, 982]
      ]}
    />
  </SFig>
);

const FIG_SAMPLE = (
  <SFig w={300} h={86} className="w-full max-w-[340px] h-auto mx-auto">
    <STable
      x={6}
      y={10}
      colW={[60, 60, 58, 58, 52]}
      rowH={20}
      s={8}
      rows={[
        ['minta', 'alapfokú', 'szakiskola', 'érettségi', 'felsőfokú'],
        ['Nők', 297, 197, 349, 172],
        ['Férfiak', 248, 302, 284, 151]
      ]}
    />
  </SFig>
);

const tree = (top: string, l: string, r: string, ll: string, rl: string) => (
  <SFig w={260} h={130} className="w-full max-w-[300px] h-auto mx-auto">
    <line x1={130} y1={30} x2={65} y2={62} stroke={S_AXIS} />
    <line x1={130} y1={30} x2={195} y2={62} stroke={S_AXIS} />
    <line x1={65} y1={78} x2={65} y2={100} stroke={S_RED} />
    <line x1={195} y1={78} x2={195} y2={100} stroke={S_RED} />
    <rect x={80} y={12} width={100} height={20} rx={6} fill="#fff" stroke={S_AXIS} />
    <SText x={130} y={25} t={top} s={8.5} b />
    <rect x={15} y={60} width={100} height={20} rx={6} fill="#fff" stroke={S_BLUE} />
    <SText x={65} y={73} t={l} s={8} c={S_BLUE} b />
    <rect x={145} y={60} width={100} height={20} rx={6} fill="#fff" stroke={S_AMBER} />
    <SText x={195} y={73} t={r} s={8} c={S_AMBER} b />
    <rect x={15} y={100} width={100} height={20} rx={6} fill="#fee2e2" stroke={S_RED} />
    <SText x={65} y={113} t={ll} s={8} c={S_RED} b />
    <rect x={145} y={100} width={100} height={20} rx={6} fill="#fee2e2" stroke={S_RED} />
    <SText x={195} y={113} t={rl} s={8} c={S_RED} b />
  </SFig>
);

const FIG_NATIONS = (
  <SFig w={260} h={150} className="w-full max-w-[300px] h-auto mx-auto" title="Arány (%): sokaság (kék) – minta (narancs)">
    <SBarChart
      x0={30}
      y0={125}
      w={220}
      h={90}
      yMax={40}
      ticks={[0, 10, 20, 30, 40]}
      color={S_BLUE}
      color2={S_AMBER}
      labelSize={7}
      data={[
        { label: 'RO', value: 36.7, value2: 36.5 },
        { label: 'SK', value: 24.9, value2: 25.0 },
        { label: 'AT', value: 22.7, value2: 22.6 },
        { label: 'PL', value: 5.9, value2: 6.0 },
        { label: 'DE', value: 9.9, value2: 9.9 }
      ]}
    />
  </SFig>
);

const FIG_STAY = (
  <SFig w={260} h={150} className="w-full max-w-[300px] h-auto mx-auto" title="Tartózkodás (%): sokaság (kék) – minta (narancs)">
    <SBarChart
      x0={30}
      y0={125}
      w={220}
      h={90}
      yMax={100}
      ticks={[0, 25, 50, 75, 100]}
      color={S_BLUE}
      color2={S_AMBER}
      labelSize={7.5}
      data={[
        { label: '1 napos', value: 84.1, value2: 74.5 },
        { label: '1–3 éj', value: 8.3, value2: 14.3 },
        { label: '4+ éj', value: 7.6, value2: 11.2 }
      ]}
    />
  </SFig>
);

const FIG_STRATA3 = (
  <SFig w={260} h={70} className="w-full max-w-[300px] h-auto mx-auto">
    <STable
      x={10}
      y={12}
      colW={[80, 56, 56, 56]}
      rowH={20}
      s={8.5}
      rows={[
        ['osztály', 'I.', 'II.', 'III.'],
        ['létszám', 470, 350, 180]
      ]}
      highlight={[[1, 3]]}
    />
    <SText x={130} y={64} t="60 fős arányos minta – III. osztályból: ?" s={8} c={S_GREEN} b />
  </SFig>
);

const STAT_DATA_COLLECTION_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'sdc-q1',
    questionTypeBadge: 'Reprezentatív minta',
    level: 1,
    question: 'Mikor mondjuk egy mintavételről, hogy reprezentatív?',
    options: [
      'Ha a mintához tartozó adatok megfelelő módon tükrözik a teljes adatsokaságot.',
      'Ha a minta legalább 1 millió elemből áll.',
      'Ha a mintába csak önként jelentkezők kerülnek.',
      'Ha a minta minden csoportjából pontosan ugyanannyi elemet választunk.'
    ],
    correctAnswer: 0,
    explanation: 'A reprezentatív minta a teljes sokaságot tükrözi: a csoportok arányai a mintában közelítőleg ugyanazok, mint a sokaságban.'
  },
  {
    id: 'sdc-q2',
    questionTypeBadge: 'Torzított minta',
    level: 1,
    question: 'Miért tévedett 1936-ban a Literary Digest közvélemény-kutatása 2,4 millió válasz ellenére?',
    options: [
      'Mert csak a vagyonosabb rétegeket (olvasóikat, autó- és telefontulajdonosokat) kérdezték, a minta torzított volt.',
      'Mert túl kevés választ gyűjtöttek.',
      'Mert rosszul adták össze a szavazatokat.',
      'Mert a Gallup ugyanazokat az embereket kérdezte meg.'
    ],
    correctAnswer: 0,
    explanation: 'A megkérdezett csoportokba mind a vagyonosabb amerikaiak tartoztak, így a minta nem tükrözte a választók összetételét.'
  },
  {
    id: 'sdc-q3',
    questionTypeBadge: 'Reprezentatív minta',
    level: 1,
    question: 'Mekkora reprezentatív minta alapján becsülte meg pontosan a Gallup az 1936-os választás eredményét?',
    options: ['50 000 fős', '2,4 millió fős', '500 fős', '24 000 fős'],
    correctAnswer: 0,
    explanation: 'A Gallup egy 50 000 fős reprezentatív mintával pontos becslést adott – a jól kiválasztott kisebb minta jobb volt a torzított hatalmas mintánál.'
  },
  {
    id: 'sdc-q4',
    questionTypeBadge: 'Arányos minta',
    level: 1,
    question: 'Egy 1000 fős sokaság 40%-a nő. Hány nő legyen egy 200 fős reprezentatív mintában?',
    options: ['80', '40', '120', '100'],
    correctAnswer: 0,
    explanation: 'A nők aránya a mintában is 40%: 0,4 · 200 = 80 fő.'
  },
  {
    id: 'sdc-q5',
    questionTypeBadge: 'Arányos minta',
    level: 1,
    question: 'Egy 600 fős iskolában 150 kilencedikes tanul. Hány kilencedikes kerüljön egy 40 fős, évfolyamok szerint arányos mintába?',
    options: ['10', '15', '4', '25'],
    correctAnswer: 0,
    explanation: '150 / 600 = 1/4, így a minta negyede: 40 · 1/4 = 10 fő.'
  },
  {
    id: 'sdc-q6',
    questionTypeBadge: 'Torzított minta',
    level: 1,
    question: 'Arról szeretnénk képet kapni, hogy a város lakói hetente átlagosan mennyit sportolnak. Melyik mintavétel torzít a legjobban?',
    options: [
      'Csak egy edzőterem vendégeit kérdezzük meg.',
      'Életkor és lakóhely szerint arányosan, véletlenszerűen választunk lakókat.',
      'A lakcímnyilvántartásból véletlenszerűen sorsolunk ki lakókat.',
      'Minden városrészből a lakosság arányában kérdezünk.'
    ],
    correctAnswer: 0,
    explanation: 'Az edzőterem vendégei a sportolók közül kerülnek ki, ők sokkal többet sportolnak az átlagnál – a minta torzított.'
  },
  {
    id: 'sdc-q7',
    questionTypeBadge: 'Venn-diagram',
    figure: venn('?', '10%', '', undefined, 'A (30%)', 'B (20%)'),
    level: 1,
    question: 'A megkérdezettek 30%-a tartozik az A, 20%-a a B csoportba, 10%-uk mindkettőbe. Hány százalékuk tartozik CSAK az A csoportba?',
    options: ['20%', '30%', '10%', '40%'],
    correctAnswer: 0,
    explanation: 'Csak A = A − (A · B) = 30% − 10% = 20%.'
  },
  {
    id: 'sdc-q8',
    questionTypeBadge: 'Valószínűség',
    level: 1,
    question: 'Egy 400 fős iskolában 120 tanuló szemüveges. Mekkora a valószínűsége, hogy egy véletlenszerűen kiválasztott tanuló szemüveges?',
    options: ['0,3', '0,12', '0,4', '0,25'],
    correctAnswer: 0,
    explanation: 'Kedvező / összes = 120 / 400 = 0,3.'
  },
  {
    id: 'sdc-q9',
    questionTypeBadge: 'Reprezentatív minta',
    level: 1,
    question: 'Melyik állítás HAMIS a reprezentatív mintára?',
    options: [
      'A sokaság minden osztályából ugyanannyi főt kell a mintába választani.',
      'A csoportok létszámarányai a mintában közelítőleg ugyanazok, mint a sokaságban.',
      'A minta nagysága is lényeges szempont.',
      'Meg kell határozni a gyűjtés körülményeit és módszertanát.'
    ],
    correctAnswer: 0,
    explanation: 'Nem egyenlő, hanem a sokaságbeli létszámokkal arányos számú főt választunk az egyes osztályokból.'
  },
  {
    id: 'sdc-q10',
    questionTypeBadge: 'Arányos minta',
    level: 1,
    question: 'Egy ország felnőtt lakosságának 52%-a nő. Melyik 500 fős minta felel meg ennek a szempontnak?',
    options: ['260 nő és 240 férfi', '250 nő és 250 férfi', '52 nő és 448 férfi', '240 nő és 260 férfi'],
    correctAnswer: 0,
    explanation: '0,52 · 500 = 260 nő, a többi 240 fő férfi.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'sdc-q11',
    questionTypeBadge: 'Rétegzett minta',
    figure: FIG_TOWN,
    level: 2,
    question: 'A táblázat egy város 13 000 lakosát mutatja. Hány nő legyen egy 2000 fős reprezentatív mintában (egészre kerekítve)?',
    options: ['1015', '1000', '985', '6600'],
    correctAnswer: 0,
    explanation: 'A nők száma 1927 + 1281 + 2271 + 1121 = 6600, így 6600 · 2000 / 13 000 ≈ 1015,4 ≈ 1015 nő.'
  },
  {
    id: 'sdc-q12',
    questionTypeBadge: 'Valószínűség',
    figure: FIG_TOWN,
    level: 2,
    question: 'Mennyi a valószínűsége, hogy a város teljes lakosságából véletlenszerűen kiválasztott személy férfi, és a legmagasabb végzettsége szakiskola?',
    options: ['≈ 0,151', '≈ 0,307', '≈ 0,25', '≈ 0,099'],
    correctAnswer: 0,
    explanation: '1963 / 13 000 ≈ 0,151. (1963 / 6400 ≈ 0,307 a férfiakon belüli arány lenne.)'
  },
  {
    id: 'sdc-q13',
    questionTypeBadge: 'Venn-diagram',
    figure: venn('48%', '12%', '13%', '?', 'kártya', 'kupon'),
    level: 2,
    question: 'A vásárlók 60%-ának van törzsvásárlói kártyája, 25%-uk használ kupont, 12%-uk mindkettőt. Mekkora a valószínűsége, hogy egy véletlenszerűen választott vásárló a két kedvezmény valamelyikét használja?',
    options: ['0,73', '0,85', '0,61', '0,97'],
    correctAnswer: 0,
    explanation: 'P(A + B) = 0,60 + 0,25 − 0,12 = 0,73 (a metszetet egyszer levonjuk).'
  },
  {
    id: 'sdc-q14',
    questionTypeBadge: 'Venn-diagram',
    level: 2,
    question: 'Az előző áruháznak kb. 10 000 vásárlója van; 73%-uk használja a kártyát vagy a kupont. Közülük hányan nem élnek egyik lehetőséggel sem?',
    options: ['2700', '7300', '1500', '1200'],
    correctAnswer: 0,
    explanation: '100% − 73% = 27%, és 0,27 · 10 000 = 2700 vásárló.'
  },
  {
    id: 'sdc-q15',
    questionTypeBadge: 'Kétszempontú adatok',
    figure: tree('5000 ügyfél', 'rendszeres: 72%', 'nem rendszeres', 'baleset', 'baleset: 9%'),
    level: 2,
    question: 'Egy biztosító 5000 ügyfelének 72%-a rendszeresen vezet. A nem rendszeres vezetők 9%-a volt érintett balesetben. Hány nem rendszeres vezetőnek volt balesete?',
    options: ['126', '450', '324', '174'],
    correctAnswer: 0,
    explanation: 'Nem rendszeres vezető: 28% · 5000 = 1400 fő, ennek 9%-a 0,09 · 1400 = 126 fő.'
  },
  {
    id: 'sdc-q16',
    questionTypeBadge: 'Kétszempontú adatok',
    figure: tree('5000 ügyfél · 6% baleset', '3600 rendszeres', '1400 nem rendszeres', '?', '126'),
    level: 2,
    question: 'Az 5000 ügyfél 6%-a volt érintett balesetben, közülük 126 nem rendszeres vezető. Hány rendszeres vezetőnek volt balesete?',
    options: ['174', '216', '300', '426'],
    correctAnswer: 0,
    explanation: 'Összes baleset: 0,06 · 5000 = 300, a rendszeres vezetők közül 300 − 126 = 174 fő.'
  },
  {
    id: 'sdc-q17',
    questionTypeBadge: 'Rétegzett minta',
    level: 2,
    question: 'Egy 10 000 fős sokaság korcsoportjai: 3000 fiatal, 5000 középkorú, 2000 idős. Hány középkorú legyen egy 500 fős, korcsoportok szerint arányos mintában?',
    options: ['250', '167', '150', '500'],
    correctAnswer: 0,
    explanation: '5000 / 10 000 = 0,5, tehát 0,5 · 500 = 250 középkorú. (167 lenne, ha egyenlően osztanánk a 3 csoport közt.)'
  },
  {
    id: 'sdc-q18',
    questionTypeBadge: 'Kerekítés',
    level: 2,
    question: 'Egy 2000 fős arányos minta osztályonkénti létszámait kerekítve 1999-et kapunk összegként. Mit tegyünk?',
    options: [
      'Az egyik legnagyobb törtrészű (pl. ,46-os) értéket felfelé kerekítjük, hogy az összeg 2000 legyen.',
      'Elfogadjuk az 1999 fős mintát, mert a kerekítés miatt ez pontosabb.',
      'Minden osztályhoz hozzáadunk 1 főt.',
      'A legkisebb osztályt kihagyjuk a mintából.'
    ],
    correctAnswer: 0,
    explanation: 'A minta nagysága adott (2000), ezért a hiányzó 1 főt annál az osztálynál pótoljuk, amelynek a pontos értéke a legközelebb van a felfelé kerekítéshez.'
  },
  {
    id: 'sdc-q19',
    questionTypeBadge: 'Venn-diagram',
    figure: venn('', '?', '', '20%', 'A (50%)', 'B (40%)'),
    level: 2,
    question: 'A megkérdezettek 50%-a sportol (A), 40%-a zenél (B), és 20%-uk egyiket sem csinálja. Hány százalékuk sportol és zenél is?',
    options: ['10%', '20%', '0%', '30%'],
    correctAnswer: 0,
    explanation: 'Valamelyiket csinálja: 100% − 20% = 80%. A · B = 50% + 40% − 80% = 10%.'
  },
  {
    id: 'sdc-q20',
    questionTypeBadge: 'Valószínűség a mintában',
    figure: FIG_SAMPLE,
    level: 2,
    question: 'A táblázat a 2000 fős reprezentatív mintát mutatja (legmagasabb végzettség szerint). Mennyi a valószínűsége, hogy egy véletlenszerűen kiválasztott személy érettségizett nő? (Nem biztos, hogy az érettségi a legmagasabb végzettsége!)',
    options: ['≈ 0,26', '≈ 0,17', '≈ 0,09', '≈ 0,32'],
    correctAnswer: 0,
    explanation: 'Érettségije van a legfeljebb érettségizett és a felsőfokú végzettségű nőknek is: (349 + 172) / 2000 = 521 / 2000 ≈ 0,26.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'sdc-q21',
    questionTypeBadge: 'Valószínűség',
    level: 3,
    question: 'A balesetben érintett 300 ügyfélből 174 rendszeres vezető. Mekkora a valószínűsége, hogy közülük egyet véletlenszerűen kiválasztva rendszeres vezetőt választunk?',
    options: ['0,58', '0,72', '0,42', '0,048'],
    correctAnswer: 0,
    explanation: '174 / 300 = 0,58. (0,72 a rendszeres vezetők aránya az összes ügyfél között – a balesetesek körében ez kisebb.)'
  },
  {
    id: 'sdc-q22',
    questionTypeBadge: 'Valószínűség',
    level: 3,
    question: 'A KSH 2021-es adatai szerint (ezer fő) legfeljebb 3 éjszakát 23 335 ezer látogató töltött Magyarországon (öt ország), közülük 1038 + 540 = 1578 ezer német. Mennyi a valószínűsége, hogy egy ilyen látogató német?',
    options: ['≈ 0,068', '≈ 0,099', '≈ 0,62', '≈ 0,044'],
    correctAnswer: 0,
    explanation: '1578 / 23 335 ≈ 0,068.'
  },
  {
    id: 'sdc-q23',
    questionTypeBadge: 'Reprezentativitás',
    figure: FIG_STAY,
    level: 3,
    question: 'Az ábra a tartózkodás hossza szerinti megoszlást mutatja a látogatók sokaságában és az 1000 fős mintában. Mi következik belőle?',
    options: [
      'A tartózkodás hossza szerint a minta nem reprezentatív: az 1 napos látogatók alul vannak reprezentálva.',
      'A minta minden szempontból reprezentatív.',
      'A minta a több éjszakát eltöltőket alulreprezentálja.',
      'A sokaság és a minta megoszlása megegyezik.'
    ],
    correctAnswer: 0,
    explanation: 'Az 1 naposak a sokaság 84,1%-át, de a mintának csak 74,5%-át adják, a több éjszakát eltöltők aránya pedig nagyobb a mintában.'
  },
  {
    id: 'sdc-q24',
    questionTypeBadge: 'Reprezentativitás',
    figure: FIG_NATIONS,
    level: 3,
    question: 'Az ábra a látogatók nemzetek szerinti arányát mutatja a sokaságban és a mintában. Melyik állítás helyes?',
    options: [
      'A nemzetek szerinti eloszlást tekintve a minta reprezentatívnak tekinthető.',
      'A minta a románokat erősen felülreprezentálja.',
      'A minta a lengyeleket 10-szer nagyobb arányban tartalmazza.',
      'A minta nem reprezentatív, mert csak 1000 fős.'
    ],
    correctAnswer: 0,
    explanation: 'Az arányok szinte azonosak (pl. Románia 36,7% – 36,5%, Szlovákia 24,9% – 25%), tehát nemzetek szerint a minta reprezentatív.'
  },
  {
    id: 'sdc-q25',
    questionTypeBadge: 'Visszaszámolás',
    level: 3,
    question: 'Egy 13 000 lakosú város 2000 fős reprezentatív mintájában 302 szakiskolai végzettségű férfi van. Körülbelül hány ilyen férfi él a városban?',
    options: ['≈ 1963', '≈ 302', '≈ 4600', '≈ 650'],
    correctAnswer: 0,
    explanation: 'A minta a sokaság 2000 / 13 000 része, ezért 302 · 13 000 / 2000 = 302 · 6,5 = 1963.'
  },
  {
    id: 'sdc-q26',
    questionTypeBadge: 'Kétszempontú adatok',
    figure: tree('4000 ügyfél · 5% baleset', 'rendszeres: 75%', 'nem rendszeres', '?', 'baleset: 8%'),
    level: 3,
    question: 'Egy biztosító 4000 ügyfelének 75%-a rendszeresen vezet, az ügyfelek 5%-a volt érintett balesetben, a nem rendszeres vezetők közt ez az arány 8%. A rendszeres vezetők hány százalékának volt balesete?',
    options: ['4%', '5%', '3%', '6%'],
    correctAnswer: 0,
    explanation: 'Nem rendszeres: 1000 fő, ebből 80 baleset. Összes baleset 200, így rendszeres: 120 fő a 3000-ből: 120 / 3000 = 4%.'
  },
  {
    id: 'sdc-q27',
    questionTypeBadge: 'Venn-diagram',
    level: 3,
    question: 'A vásárlók 60%-ának van kártyája, 55%-uk használ kupont. Legalább hány százalékuk használja mindkettőt?',
    options: ['15%', '0%', '55%', '5%'],
    correctAnswer: 0,
    explanation: 'Az unió legfeljebb 100%, így A · B ≥ 60% + 55% − 100% = 15%.'
  },
  {
    id: 'sdc-q28',
    questionTypeBadge: 'Rétegzett minta',
    figure: FIG_STRATA3,
    level: 3,
    question: 'Egy 1000 fős sokaság három osztályának létszáma 470, 350 és 180. Hány fő kerüljön a III. osztályból egy 60 fős arányos mintába?',
    options: ['11', '10', '12', '18'],
    correctAnswer: 0,
    explanation: 'Pontos értékek: 28,2; 21; 10,8. Kerekítve 28 + 21 + 11 = 60, tehát a III. osztályból 11 fő.'
  },
  {
    id: 'sdc-q29',
    questionTypeBadge: 'Valószínűség',
    figure: venn('48%', '12%', '13%', '27%', 'kártya', 'kupon'),
    level: 3,
    question: 'A Venn-diagram a vásárlók megoszlását mutatja. A kuponhasználók közül véletlenszerűen választunk egy vásárlót. Mekkora a valószínűsége, hogy van törzsvásárlói kártyája?',
    options: ['0,48', '0,12', '0,2', '0,6'],
    correctAnswer: 0,
    explanation: 'A kuponhasználók 25%-ot tesznek ki, közülük 12% kártyás: 12 / 25 = 0,48.'
  },
  {
    id: 'sdc-q30',
    questionTypeBadge: 'Torzított minta',
    level: 3,
    question: 'A Literary Digest Landon 19 százalékpontos győzelmét jósolta, valójában Roosevelt nyert 24 százalékpontos fölénnyel. Hány százalékpont volt a különbség előrejelzésének hibája?',
    options: ['43', '5', '24', '19'],
    correctAnswer: 0,
    explanation: 'Landon szemszögéből: előrejelzés +19, valóság −24 százalékpont, a hiba 19 − (−24) = 43 százalékpont.'
  }
];

export const StatDataCollectionQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g12-stat-adatgyujtes-quiz"
      subtopicId="statisztikai-adatgyujtes"
      title="1. Statisztikai adatgyűjtés – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: reprezentatív minta, arányos minta készítése, Venn-diagram, valószínűség a mintában."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={STAT_DATA_COLLECTION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Reprezentatív minta',
          items: [
            'A minta adatai megfelelő módon tükrözik a teljes adatsokaságot.',
            'A csoportok létszámarányai a mintában ≈ a sokaságbeli arányok.',
            'A minta nagysága is fontos, de a torzított minta nagy elemszámmal sem jó.',
            'Literary Digest (2,4 millió, torzított) ✗ – Gallup (50 000, reprezentatív) ✓'
          ]
        },
        {
          title: 'Arányos minta készítése',
          items: [
            'Egy osztályból: n · Nᵢ / N fő (n: mintanagyság, N: sokaság).',
            'Kerekítés után az összeg legyen pontosan n.',
            'Hiány esetén a legnagyobb törtrészű értéket kerekítjük felfelé.',
            'P(esemény) = kedvező esetek / összes eset.'
          ]
        },
        {
          title: 'Két szempont (Venn-diagram)',
          items: [
            'Csak A = A − A · B; csak B = B − A · B.',
            'Valamelyik: P(A + B) = P(A) + P(B) − P(A · B).',
            'Egyik sem: 1 − P(A + B).',
            'Részcsoporton belül: osszunk a részcsoport létszámával!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatDataCollectionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatDataCollectionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatDataCollectionQuiz;
