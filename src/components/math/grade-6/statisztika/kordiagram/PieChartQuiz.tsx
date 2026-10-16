import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PieChartMatcher } from './PieChartMatcher';
import { PieChartSorter } from './PieChartSorter';

interface PieChartQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-pie-concept',
    title: '1. A kördiagram lényege',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Teljes egész:</strong> A teljes körlap ($360^\circ$) reprezentálja a $100\%$-ot.</div>
        <div><strong>Körcikkek:</strong> A szeletek középponti szöge egyenesen arányos a kategória részesedésével.</div>
        <div><strong>Összegellenőrzés:</strong> A szögek összege kötelezően $360^\circ$, a százalékoké $100\%$.</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Kiváló eszköz egy egész megoszlásának (pl. költségvetés, szakkörök) bemutatására.
        </div>
      </div>
    )
  },
  {
    id: 'cs-angle-formula',
    title: '2. Az 1% = 3,6° aranyszabály',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>1% értéke:</strong> {"$360^\\circ : 100 = 3,6^\\circ$"}</div>
        <div><strong>Százalékból szög:</strong> {"$\\alpha = p \\cdot 3,6^\\circ$ (pl. $20\\% \\to 20 \\cdot 3,6^\\circ = 72^\\circ$)"}</div>
        <div><strong>Szögből százalék:</strong> {"$p = \\alpha : 3,6^\\circ$ (pl. $108^\\circ \\to 108 : 3,6 = 30\\%$)"}</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          10% = 36° • 25% = 90° (derékszög) • 50% = 180° (egyenesszög)
        </div>
      </div>
    )
  },
  {
    id: 'cs-notable-fractions',
    title: '3. Nevezetes törtrészek',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Fél (1/2):</strong> $180^\circ$ (50%)</div>
        <div><strong>Negyed (1/4):</strong> $90^\circ$ (25%)</div>
        <div><strong>Harmad (1/3):</strong> $120^\circ$ (33,3%)</div>
        <div><strong>Ötöd (1/5):</strong> $72^\circ$ (20%)</div>
        <div><strong>Nyolcad (1/8):</strong> $45^\circ$ (12,5%)</div>
      </div>
    )
  },
  {
    id: 'cs-pie-cautions',
    title: '4. Szerkesztés és 3D torzítás',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Szerkesztés:</strong> Körzővel kör → függőleges kezdősugár → szögmérővel kimért szögek egymás után.</div>
        <div><strong>3D manipuláció:</strong> A döntött tortadiagramon az elülső szelet optikailag felnagyítottnak látszik, mindig a 2D nézet megbízható!</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Nem ajánlott 7-nél több kategóriára, mert a vékony szeletek átláthatatlanok.
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // ==========================================
  // 1. SZINT: ALAPFOGALMAK ÉS NEVEZETES SZÖGEK (1-10)
  // ==========================================
  {
    id: 'pie-q1',
    level: 1,
    question: 'Hány fokos középponti szög felel meg a teljes kördiagramnak, vagyis a 100%-os egésznek?',
    options: ['360°', '180°', '100°', '90°'],
    correctAnswer: '360°',
    explanation: 'A teljes körlap teljesszöge pontosan 360°, ez reprezentálja a teljes 100%-ot.'
  },
  {
    id: 'pie-q2',
    level: 1,
    question: 'Hány fokos középponti szög tartozik az 1%-os részesedéshez egy kördiagramon?',
    options: ['3,6°', '1°', '10°', '0,36°'],
    correctAnswer: '3,6°',
    explanation: '360° : 100 = 3,6°. Tehát 1% mindig pontosan 3,6°-os szögnek felel meg.'
  },
  {
    id: 'pie-q3',
    level: 1,
    question: 'Egy kördiagramon egy körcikk derékszögű (90°-os). A teljes egész hány százalékát képviseli ez a körcikk?',
    options: ['25 % (negyedrész)', '50 % (félrész)', '10 % (tizedrész)', '90 %'],
    correctAnswer: '25 % (negyedrész)',
    explanation: '90° a 360°-nak pontosan a negyede (90 : 360 = 1/4 = 0,25 = 25%).'
  },
  {
    id: 'pie-q4',
    level: 1,
    question: 'Hány fokos középponti szög tartozik az 50%-os (fél) részesedéshez?',
    options: ['180°', '90°', '200°', '360°'],
    correctAnswer: '180°',
    explanation: 'Az 50% a kör fele: 360° : 2 = 180° (egyenesszög).'
  },
  {
    id: 'pie-q5',
    level: 1,
    question: 'Mit kell kiadnia összegül egy kördiagram összes körcikke középponti szögének?',
    options: ['Pontosan 360°-ot', 'Pontosan 100°-ot', 'Pontosan 180°-ot', 'Bármennyi lehet'],
    correctAnswer: 'Pontosan 360°-ot',
    explanation: 'Mivel a körcikkek kitöltik a teljes kört, szögeik összege mindig kötelezően 360° kell hogy legyen.'
  },
  {
    id: 'pie-q6',
    level: 1,
    question: 'Hány fokos középponti szög felel meg a 10%-os részesedésnek a kördiagramon?',
    options: ['36°', '10°', '18°', '72°'],
    correctAnswer: '36°',
    explanation: '10 · 3,6° = 36° (vagy 360° : 10 = 36°).'
  },
  {
    id: 'pie-q7',
    level: 1,
    question: 'Hogyan nevezzük a kör középpontjából kiinduló két sugár és a körív által határolt síkrészt, amely a kördiagram egy szeletét alkotja?',
    options: ['Körcikk', 'Körszelet', 'Körgyűrű', 'Húrnégyszög'],
    correctAnswer: 'Körcikk',
    explanation: 'A két sugár és a körív által határolt alakzat a körcikk (angolul pie slice).'
  },
  {
    id: 'pie-q8',
    level: 1,
    question: 'Egy kördiagram három szeletből áll. Az első szelet 120°, a második 150°. Hány fokos a harmadik szelet?',
    options: ['90°', '100°', '80°', '110°'],
    correctAnswer: '90°',
    explanation: 'A szögek összege 360°. A harmadik szög: 360° - (120° + 150°) = 360° - 270° = 90°.'
  },
  {
    id: 'pie-q9',
    level: 1,
    question: 'A 75%-os részesedéshez mekkora középponti szög tartozik?',
    options: ['270°', '250°', '180°', '300°'],
    correctAnswer: '270°',
    explanation: '75 · 3,6° = 270° (vagy a teljes 360° háromnegyede: 3 · 90° = 270°).'
  },
  {
    id: 'pie-q10',
    level: 1,
    question: 'Hány fokos körcikk jelenti a kör nyolcadát (1/8 rész, 12,5%)?',
    options: ['45°', '30°', '60°', '40°'],
    correctAnswer: '45°',
    explanation: 'A negyedkör fele: 90° : 2 = 45° (vagy 360° : 8 = 45°).'
  },

  // ==========================================
  // 2. SZINT: KÖZÉPPONTI SZÖGEK ÉS LÉTSZÁMOK KISZÁMÍTÁSA (11-20)
  // ==========================================
  {
    id: 'pie-q11',
    level: 2,
    question: 'Egy felmérésben az emberek 20%-a válaszolta, hogy biciklivel jár munkába. Hány fokos szöget kell kimérnünk ehhez a kördiagramon?',
    options: ['72°', '20°', '36°', '60°'],
    correctAnswer: '72°',
    explanation: 'α = p · 3,6° = 20 · 3,6° = 72° (vagy 360° : 5 = 72°).'
  },
  {
    id: 'pie-q12',
    level: 2,
    question: 'Egy 28 fős osztályban a tanulók 25%-a kitűnő tanuló. Hány fokos körcikk ábrázolja őket, és hány tanulóról van szó?',
    options: ['90° és 7 tanuló', '90° és 14 tanuló', '45° és 7 tanuló', '180° és 14 tanuló'],
    correctAnswer: '90° és 7 tanuló',
    explanation: '25% középponti szöge: 25 · 3,6° = 90°. A létszám: 28 · 0,25 = 7 tanuló.'
  },
  {
    id: 'pie-q13',
    level: 2,
    question: 'Egy kördiagramon egy körcikk középponti szöge 108°. A teljes egész hány százalékát jelenti ez a szelet?',
    options: ['30 %', '25 %', '35 %', '40 %'],
    correctAnswer: '30 %',
    explanation: 'p = α : 3,6° = 108 : 3,6 = 30%.'
  },
  {
    id: 'pie-q14',
    level: 2,
    question: 'Egy 30 fős osztályban 15-en sportolnak, 10-en zenélnek, és 5-en rajzolnak. Hány fokos körcikk tartozik a zenélőkhöz?',
    options: ['120°', '180°', '60°', '90°'],
    correctAnswer: '120°',
    explanation: 'A zenélők aránya: 10 / 30 = 1/3 rész. 360° : 3 = 120°.'
  },
  {
    id: 'pie-q15',
    level: 2,
    question: 'Egy kördiagramon a tanulók 40%-a kézilabdázik. Hány fokos körcikket kell rajzolnunk számukra?',
    options: ['144°', '120°', '160°', '100°'],
    correctAnswer: '144°',
    explanation: '40 · 3,6° = 144°.'
  },
  {
    id: 'pie-q16',
    level: 2,
    question: 'Egy 40 fős csoportban a tagok egy kördiagram szerint 144°-os szeletet alkotnak. Hány ember tartozik ebbe a csoportba?',
    options: ['16 fő', '14 fő', '20 fő', '10 fő'],
    correctAnswer: '16 fő',
    explanation: '144° : 3,6 = 40%. A 40 fő 40%-a: 40 · 0,40 = 16 fő.'
  },
  {
    id: 'pie-q17',
    level: 2,
    question: 'Egy kördiagram négy kategóriából áll: 72°, 108°, 90° és egy negyedik szelet. Hány fokos a negyedik szelet?',
    options: ['90°', '100°', '80°', '70°'],
    correctAnswer: '90°',
    explanation: '360° - (72° + 108° + 90°) = 360° - 270° = 90°.'
  },
  {
    id: 'pie-q18',
    level: 2,
    question: 'Egy családi havi költségvetés kördiagramján az élelmiszerre fordított összeg 126°-os szeletet kapott. A teljes fizetés hány százalékát költik élelmiszerre?',
    options: ['35 %', '30 %', '40 %', '25 %'],
    correctAnswer: '35 %',
    explanation: '126 : 3,6 = 35%.'
  },
  {
    id: 'pie-q19',
    level: 2,
    question: 'Hány fokos középponti szög tartozik a kör hatodához (1/6 rész)?',
    options: ['60°', '50°', '45°', '30°'],
    correctAnswer: '60°',
    explanation: '360° : 6 = 60°.'
  },
  {
    id: 'pie-q20',
    level: 2,
    question: 'Egy 20 fős osztályban a tanulók 15%-a hiányzott influenzajárvány miatt. Hány fokos középponti szög felel meg a hiányzóknak a kördiagramon?',
    options: ['54°', '15°', '36°', '60°'],
    correctAnswer: '54°',
    explanation: '15 · 3,6° = 54° (létszámban: 20 · 0,15 = 3 fő).'
  },

  // ==========================================
  // 3. SZINT: ÖSSZETETT ELEMZÉS ÉS STATISZTIKAI CSAPDÁK (21-30)
  // ==========================================
  {
    id: 'pie-q21',
    level: 3,
    question: 'Miért tekinthető félrevezetőnek és megtévesztőnek a térhatású, megdöntött (3D-s) tortadiagram a reklámokban?',
    options: ['Mert a perspektivikus rövidülés miatt az elülső szelet optikailag jóval nagyobbnak látszik a valós arányánál', 'Mert a 3D diagramot nem lehet kinyomtatni', 'Mert a 3D diagram szögeinek összege több mint 360°', 'Mert a 3D diagramon csak páros számok szerepelhetnek'],
    correctAnswer: 'Mert a perspektivikus rövidülés miatt az elülső szelet optikailag jóval nagyobbnak látszik a valós arányánál',
    explanation: 'A térbeli döntés eltorzítja a területeket és szögeket: az elöl lévő cikkely felnagyítottnak látszik a hátrébb lévő, azonos vagy nagyobb szeletekhez képest.'
  },
  {
    id: 'pie-q22',
    level: 3,
    question: 'Egy újságcikkben megjelent kördiagramon a következő százalékok szerepelnek: 35%, 28%, 22% és 10%. Mi a probléma ezzel a diagrammal?',
    options: ['A százalékok összege csak 95%, így hiányzik 5% (18°-nyi adat)', 'A 35% nem osztható 3-mal', 'Nem lehet négy kategóriát ábrázolni', 'Nincs vele semmi probléma'],
    correctAnswer: 'A százalékok összege csak 95%, így hiányzik 5% (18°-nyi adat)',
    explanation: '35 + 28 + 22 + 10 = 95%. Egy kördiagram csak akkor korrekt, ha az összeg pontosan 100% (360°).'
  },
  {
    id: 'pie-q23',
    level: 3,
    question: 'Mikor NEM javasolt kördiagramot használni adatábrázolásra?',
    options: ['Ha 8-10-nél jóval több kategóriánk van, vagy a szeletek túl aprók és szinte azonosak', 'Ha százalékos megoszlást akarunk mutatni', 'Ha 3 kategóriánk van', 'Ha a kategóriák összege 100%'],
    correctAnswer: 'Ha 8-10-nél jóval több kategóriánk van, vagy a szeletek túl aprók és szinte azonosak',
    explanation: 'Túl sok kategória esetén a vékony szeletek zsúfolttá és olvashatatlanná válnak; ilyenkor az oszlop- vagy sávdiagram a megfelelő választás.'
  },
  {
    id: 'pie-q24',
    level: 3,
    question: 'Egy iskolai könyvtár 1200 könyvének megoszlását kördiagram ábrázolja. A képregények szelete 54°-os. Hány darab képregény található a könyvtárban?',
    options: ['180 darab', '200 darab', '150 darab', '54 darab'],
    correctAnswer: '180 darab',
    explanation: '54° : 3,6 = 15% (vagy 54° / 360° = 3/20 rész). 1200 könyv 15%-a: 1200 · 0,15 = 180 darab képregény.'
  },
  {
    id: 'pie-q25',
    level: 3,
    question: 'Egy kördiagramon az A kategória 72°-os, a B kategória 144°-os. Hányszor akkora a B kategória részesedése, mint az A kategóriáé?',
    options: ['Pontosan 2-szer akkora', '4-szer akkora', '1,5-szer akkora', '72-szer akkora'],
    correctAnswer: 'Pontosan 2-szer akkora',
    explanation: 'Mivel a szög egyenesen arányos a mért értékkel: 144° : 72° = 2. A B kategória pontosan kétszer akkora, mint az A.'
  },
  {
    id: 'pie-q26',
    level: 3,
    question: 'Hogyan kell felhelyezni a szögmérőt a kördiagram készítésekor a második körcikk kiméréséhez?',
    options: ['A szögmérő középpontját a kör középpontjára, alapvonalát pedig az elsőként kimért körcikk záró sugarára', 'Mindig a függőleges kezdősugárra', 'A kör kerületére kívülről', 'Tetszőleges irányba fordítva'],
    correctAnswer: 'A szögmérő középpontját a kör középpontjára, alapvonalát pedig az elsőként kimért körcikk záró sugarára',
    explanation: 'A körcikkeket egymás után, láncszerűen mérjük ki, ezért a szögmérő alapvonalát mindig az előző sugárhoz kell illeszteni.'
  },
  {
    id: 'pie-q27',
    level: 3,
    question: 'Egy iskola 360 diákja közül 180 lány és 180 fiú. Ha ezt kördiagramon ábrázoljuk, milyen alakzatot kapunk?',
    options: ['A kört egy átmérővel két egyenlő félkörre (180°-os egyenesszögekre) osztjuk', 'Két 90°-os negyedkört', 'Három körcikket', 'Egyetlen teljes kört'],
    correctAnswer: 'A kört egy átmérővel két egyenlő félkörre (180°-os egyenesszögekre) osztjuk',
    explanation: '180 / 360 = 50%, ami pontosan 180°-os egyenesszög, vagyis a kör átmérője felezi a kört.'
  },
  {
    id: 'pie-q28',
    level: 3,
    question: 'Egy kördiagramon három szelet aránya 1 : 2 : 3. Hány fokosak a körcikkek?',
    options: ['60°, 120°, 180°', '30°, 60°, 90°', '45°, 90°, 135°', '50°, 100°, 150°'],
    correctAnswer: '60°, 120°, 180°',
    explanation: 'Összesen 1 + 2 + 3 = 6 rész. 1 rész = 360° : 6 = 60°. Így a szögek: 1 · 60° = 60°, 2 · 60° = 120°, 3 · 60° = 180°.'
  },
  {
    id: 'pie-q29',
    level: 3,
    question: 'Ha egy kördiagramon az egyik kategória a teljes kör 1/12-ed részét foglalja el, hány fokos ez a körcikk, és hány százaléknak felel meg?',
    options: ['30° és 8,33 %', '12° és 12 %', '24° és 10 %', '36° és 12 %'],
    correctAnswer: '30° és 8,33 %',
    explanation: 'Középponti szög: 360° : 12 = 30°. Százalékban: 100% : 12 ≈ 8,33%.'
  },
  {
    id: 'pie-q30',
    level: 3,
    question: 'Egy felmérésben az A terméket a válaszadók 45%-a, a B terméket 35%-a, a C terméket a maradék választotta. Hány fokos körcikk jelöli a C terméket?',
    options: ['72°', '90°', '54°', '108°'],
    correctAnswer: '72°',
    explanation: 'A C termék részesedése: 100% - (45% + 35%) = 100% - 80% = 20%. Középponti szög: 20 · 3,6° = 72°.'
  }
];

export const PieChartQuiz: React.FC<PieChartQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Kördiagram kvíz"
      subtitle="Gyakorold a középponti szögek kiszámítását (1% = 3,6°), a nevezetes arányokat és a kördiagram szerkesztését 3 szinten!"
      topicBadge="6. OSZTÁLY • VI. STATISZTIKA • 3. KÖRDIAGRAM"
      badgeText="6. OSZTÁLY • VI. STATISZTIKA • 3. KÖRDIAGRAM"
      themeColor="indigo"
      topicId="g6-pie-chart-quiz"
      topicTitle="Kördiagram"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={PieChartMatcher as any}
      sorterComponent={PieChartSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PieChartQuiz;
