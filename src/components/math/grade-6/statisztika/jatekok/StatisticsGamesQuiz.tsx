import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { StatisticsGamesMatcher } from './StatisticsGamesMatcher';
import { StatisticsGamesSorter } from './StatisticsGamesSorter';

interface StatisticsGamesQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-venn-basics',
    title: '1. Venn-diagram és alaphalmaz',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Alaphalmaz (U):</strong> Az összes vizsgált elemet tartalmazó halmaz (téglalap).</div>
        <div><strong>Halmazok (A, B):</strong> Adott tulajdonságú elemek csoportjai (zárt körök).</div>
        <div><strong>2 halmazos Venn:</strong> Pontosan <strong>4 diszjunkt tartományra</strong> osztja a síkot (Csak A, Csak B, Metszet, Kívül).</div>
        <div className="text-[11px] text-pink-600 dark:text-pink-400 font-semibold">
          John Venn (1834–1923) angol logikatudósról kapta a nevét.
        </div>
      </div>
    )
  },
  {
    id: 'cs-set-operations',
    title: '2. Halmazműveletek szimbólumai',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Metszet (A ∩ B):</strong> "ÉS" – mindkét halmazba beletartozó elemek.</div>
        <div><strong>Unió (A ∪ B):</strong> "VAGY" – legalább az egyik halmazba beletartozó elemek.</div>
        <div><strong>Különbség (A \ B):</strong> "CSAK A" – A-ban benne van, de B-ben nincs.</div>
        <div><strong>Üres halmaz (∅):</strong> Elem nélküli halmaz (ha a metszet üres: diszjunktak).</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          Könnyű megjegyezni: ∩ lefordított kosár (szűkít), ∪ kehely (egyesít).
        </div>
      </div>
    )
  },
  {
    id: 'cs-sieve-formula',
    title: '3. A Szita-formula és szöveges feladatok',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> |A ∪ B| = |A| + |B| - |A ∩ B|</div>
        <div><strong>Csak A létszáma:</strong> |A| - |A ∩ B|</div>
        <div><strong>Csak B létszáma:</strong> |B| - |A ∩ B|</div>
        <div><strong>Egyik sem (kívül):</strong> |U| - |A ∪ B|</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Aranyszabály: Mindig a közös metszetből indulj ki, és vond le az egyéni körökből!
        </div>
      </div>
    )
  },
  {
    id: 'cs-logic-games',
    title: '4. Barkochba és logikai mátrix',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Felezés (bináris keresés):</strong> Minden optimális kérdés felére csökkenti a lehetőségeket.</div>
        <div><strong>Kérdésszám:</strong> 1–100-ig: 7 kérdés (2⁷ = 128); 1–1000-ig: 10 kérdés (2¹⁰ = 1024).</div>
        <div><strong>20 kérdés:</strong> 2²⁰ = 1 048 576 lehetőség (több mint egymillió!).</div>
        <div><strong>Logikai mátrix:</strong> Ha beírsz egy ✓ pipát, a sor és oszlop többi mezője mind ✗ lesz!</div>
      </div>
    )
  }
];

const questions: Question[] = [
  // ==========================================
  // 1. SZINT: ALAPFOGALMAK ÉS JELEK (1-10)
  // ==========================================
  {
    id: 'stat-q1',
    level: 1,
    question: 'Mit jelent a halmazelméletben az A ∩ B szimbólum?',
    options: ['A két halmaz metszetét (a közös elemeket)', 'A két halmaz unióját (egyesítését)', 'Az A és B halmaz különbségét', 'Az alaphalmaz összes elemét'],
    correctAnswer: 'A két halmaz metszetét (a közös elemeket)',
    explanation: 'Az A ∩ B az A és B halmaz metszete, vagyis azon elemek összessége, amelyek mindkét halmazba egyszerre beletartoznak ("ÉS" kapcsolat).'
  },
  {
    id: 'stat-q2',
    level: 1,
    question: 'Mit jelent a halmazelméletben az A ∪ B szimbólum?',
    options: ['A két halmaz unióját (az elemek egyesítését)', 'A két halmaz metszetét', 'Csak az A halmaz elemeit', 'Az üres halmazt'],
    correctAnswer: 'A két halmaz unióját (az elemek egyesítését)',
    explanation: 'Az A ∪ B az unió (egyesítés): azon elemek halmaza, amelyek legalább az egyik halmazba beletartoznak ("VAGY" kapcsolat).'
  },
  {
    id: 'stat-q3',
    level: 1,
    question: 'Hány egymást kizáró (diszjunkt) tartományra osztja a síkot két egymást metsző zárt kör egy téglalap alakú alaphalmazon belül?',
    options: ['4 tartományra', '2 tartományra', '3 tartományra', '5 tartományra'],
    correctAnswer: '4 tartományra',
    explanation: 'Két metsző kör 4 tartományt hoz létre: 1. Csak A, 2. Metszet (A és B), 3. Csak B, 4. Külső rész (egyik sem).'
  },
  {
    id: 'stat-q4',
    level: 1,
    question: 'Mit nevezünk alaphalmaznak (jele: U)?',
    options: ['Azt a halmazt, amely az adott feladatban vizsgált összes elemet magában foglalja', 'A legkisebb, nulla elemű halmazt', 'Két kör metszetét', 'A számegyenes pozitív felét'],
    correctAnswer: 'Azt a halmazt, amely az adott feladatban vizsgált összes elemet magában foglalja',
    explanation: 'Az alaphalmaz (univerzum, U) a teljes vizsgálati terület, amelyet a Venn-diagramon a befoglaló téglalap ábrázol.'
  },
  {
    id: 'stat-q5',
    level: 1,
    question: 'Mi a jele az üres halmaznak, amelynek egyetlen eleme sincs?',
    options: ['∅', 'U', '∩', '∪'],
    correctAnswer: '∅',
    explanation: 'Az üres halmaz jele az áthúzott kör: ∅ (vagy üres kapcsos zárójel: {}).'
  },
  {
    id: 'stat-q6',
    level: 1,
    question: 'Mit fejez ki az A \\ B (A mínusz B) halmazművelet?',
    options: ['Azon elemek halmazát, amelyek A-ban benne vannak, de B-ben nincsenek benne', 'Azon elemeket, amelyek mindkét halmazban benne vannak', 'A két halmaz összesített elemszámát', 'A B halmaz elemeit A nélkül'],
    correctAnswer: 'Azon elemek halmazát, amelyek A-ban benne vannak, de B-ben nincsenek benne',
    explanation: 'Az A \\ B az A és B halmaz különbsége: a "Csak A" tartomány, vagyis az A azon elemei, amelyek a B-be nem tartoznak bele.'
  },
  {
    id: 'stat-q7',
    level: 1,
    question: 'Ha A = {1, 2, 3, 4} és B = {3, 4, 5, 6}, mi lesz az A ∩ B metszet?',
    options: ['{3, 4}', '{1, 2}', '{5, 6}', '{1, 2, 3, 4, 5, 6}'],
    correctAnswer: '{3, 4}',
    explanation: 'A 3 és a 4 mindkét halmazban szerepel, így a közös rész (metszet): {3, 4}.'
  },
  {
    id: 'stat-q8',
    level: 1,
    question: 'Ha A = {1, 2, 3, 4} és B = {3, 4, 5, 6}, mi lesz az A ∪ B unió?',
    options: ['{1, 2, 3, 4, 5, 6}', '{3, 4}', '{1, 2, 5, 6}', '{12}'],
    correctAnswer: '{1, 2, 3, 4, 5, 6}',
    explanation: 'Az unió az összes előforduló elemet tartalmazza (minden elemet csak egyszer felsorolva): {1, 2, 3, 4, 5, 6}.'
  },
  {
    id: 'stat-q9',
    level: 1,
    question: 'Mikor mondjuk két halmazról, hogy diszjunktak?',
    options: ['Ha nincs közös elemük (metszetük üres halmaz: A ∩ B = ∅)', 'Ha teljesen megegyeznek egymással', 'Ha minden elemük páros szám', 'Ha uniójuk üres'],
    correctAnswer: 'Ha nincs közös elemük (metszetük üres halmaz: A ∩ B = ∅)',
    explanation: 'Diszjunkt halmazoknak nincs közös elemük, a Venn-diagramon a köreik nem metszik egymást.'
  },
  {
    id: 'stat-q10',
    level: 1,
    question: 'Ha az alaphalmaz a 10-nél kisebb pozitív egész számok {1, 2, ..., 9}, és A a páros számok halmaza, mi az A komplementere (Ā)?',
    options: ['A páratlan számok: {1, 3, 5, 7, 9}', 'A páros számok: {2, 4, 6, 8}', 'Az üres halmaz', 'Csak a {0}'],
    correctAnswer: 'A páratlan számok: {1, 3, 5, 7, 9}',
    explanation: 'A komplementer (Ā) az alaphalmaz mindazon elemeit tartalmazza, amelyek nincsenek benne A-ban (itt a páratlan egyjegyű számokat).'
  },

  // ==========================================
  // 2. SZINT: OSZTÁLYTERMI SZÖVEGES FELADATOK ÉS SZITA-FORMULA (11-20)
  // ==========================================
  {
    id: 'stat-q11',
    level: 2,
    question: 'Egy 28 fős osztályban 18-an tanulnak angolul, 14-en németül, és 8-an mindkét nyelvet tanulják. Hányan tanulnak CSAK angolul?',
    options: ['10 fő', '18 fő', '8 fő', '4 fő'],
    correctAnswer: '10 fő',
    explanation: 'Az angolosok (18) közül le kell vonnunk azokat, akik németül is tanulnak (8): 18 - 8 = 10 fő tanul CSAK angolul.'
  },
  {
    id: 'stat-q12',
    level: 2,
    question: 'Ugyanebben a 28 fős osztályban (18 angol, 14 német, 8 mindkettő) hányan tanulnak CSAK németül?',
    options: ['6 fő', '14 fő', '8 fő', '12 fő'],
    correctAnswer: '6 fő',
    explanation: 'A németesek száma 14, ebből levonjuk a közös 8 főt: 14 - 8 = 6 fő tanul CSAK németül.'
  },
  {
    id: 'stat-q13',
    level: 2,
    question: 'Ugyanebben a 28 fős osztályban hány olyan tanuló van, aki legalább az egyik nyelvet tanulja (angol ∪ német)?',
    options: ['24 fő', '32 fő', '28 fő', '20 fő'],
    correctAnswer: '24 fő',
    explanation: 'Szita-formula: |A ∪ B| = |A| + |B| - |A ∩ B| = 18 + 14 - 8 = 24 fő. (Vagy tartományok összege: 10 + 8 + 6 = 24 fő).'
  },
  {
    id: 'stat-q14',
    level: 2,
    question: 'Ugyanebben a 28 fős osztályban hányan NEM tanulnak sem angolul, sem németül?',
    options: ['4 fő', '0 fő', '8 fő', '6 fő'],
    correctAnswer: '4 fő',
    explanation: 'Az alaphalmaz 28 fő, a legalább egy nyelvet tanulók száma 24 fő. A kívül maradó rész: 28 - 24 = 4 fő.'
  },
  {
    id: 'stat-q15',
    level: 2,
    question: 'Mi a Szita-formula helyes alakja két tetszőleges halmaz uniójának elemszámára?',
    options: ['|A ∪ B| = |A| + |B| - |A ∩ B|', '|A ∪ B| = |A| + |B|', '|A ∪ B| = |A| · |B|', '|A ∪ B| = |A| - |B| + |A ∩ B|'],
    correctAnswer: '|A ∪ B| = |A| + |B| - |A ∩ B|',
    explanation: 'Mivel az |A| + |B| összegben a közös metszetet kétszer számolnánk, egyszer le kell vonni: |A ∪ B| = |A| + |B| - |A ∩ B|.'
  },
  {
    id: 'stat-q16',
    level: 2,
    question: 'Egy 30 fős osztályban mindenki sportol legalább egy sportágat: 20-an fociznak és 15-en kosaraznak. Hányan űzik MINDKÉT sportágat?',
    options: ['5 fő', '10 fő', '15 fő', '0 fő'],
    correctAnswer: '5 fő',
    explanation: 'Mivel mindenki sportol, |A ∪ B| = 30. A Szita-formulából: |A ∩ B| = |A| + |B| - |A ∪ B| = 20 + 15 - 30 = 35 - 30 = 5 fő.'
  },
  {
    id: 'stat-q17',
    level: 2,
    question: 'Ha egy 25 fős csoportban 12 főnek van kutyája, 10 főnek van macskája, és 5 főnek mindkettő van, hány főnek van CSAK kutyája?',
    options: ['7 fő', '12 fő', '5 fő', '2 fő'],
    correctAnswer: '7 fő',
    explanation: 'A kutyások száma 12, ebből 5-nek macskája is van. Így csak kutyája 12 - 5 = 7 főnek van.'
  },
  {
    id: 'stat-q18',
    level: 2,
    question: 'Az előző feladatban (25 fős csoport, 12 kutyás, 10 macskás, 5 mindkettő) hány embernek nincs sem kutyája, sem macskája?',
    options: ['8 fő', '17 fő', '3 fő', '5 fő'],
    correctAnswer: '8 fő',
    explanation: 'A kisállattartók (unió): 12 + 10 - 5 = 17 fő. A kisállat nélküliek: 25 - 17 = 8 fő.'
  },
  {
    id: 'stat-q19',
    level: 2,
    question: 'A = {1-től 20-ig a páros számok}, B = {1-től 20-ig a néggyel osztható számok}. Hány eleme van az A \\ B különbségnek?',
    options: ['5 elem', '10 elem', '0 elem', '2 elem'],
    correctAnswer: '5 elem',
    explanation: 'A páros számok 1-20 között: 10 db (2,4,6,8,10,12,14,16,18,20). A 4-gyel oszthatók: 5 db (4,8,12,16,20). A páros, de 4-gyel NEM osztható számok: 2, 6, 10, 14, 18 (pontosan 5 db).'
  },
  {
    id: 'stat-q20',
    level: 2,
    question: 'Mi történik a Szita-formulában, ha a két halmaz diszjunkt (|A ∩ B| = 0)?',
    options: ['|A ∪ B| = |A| + |B|', '|A ∪ B| = 0', '|A ∪ B| = |A| - |B|', '|A ∪ B| nem számolható ki'],
    correctAnswer: '|A ∪ B| = |A| + |B|',
    explanation: 'Ha nincs közös elem, nem vonunk le semmit: az unió elemszáma a két elemszám tiszta összege.'
  },

  // ==========================================
  // 3. SZINT: HÁRMAS VENN, BARKOHBA ÉS LOGIKAI REJTVÉNYEK (21-30)
  // ==========================================
  {
    id: 'stat-q21',
    level: 3,
    question: 'Hány belső, egymást át nem fedő zárt tartományra osztja a síkot három egymást páronként metsző kör egy Venn-diagramban?',
    options: ['7 tartományra', '6 tartományra', '8 tartományra', '9 tartományra'],
    correctAnswer: '7 tartományra',
    explanation: 'Három metsző kör pontosan 7 belső tartományt hoz létre: 3 kizárólagos egyszemélyes, 3 kettes metszet, és 1 középső hármas metszet (a külsővel együtt összesen 8 tartomány).'
  },
  {
    id: 'stat-q22',
    level: 3,
    question: 'Háromhalmazos szöveges feladatnál melyik tartománnyal célszerű elkezdeni a diagram kitöltését?',
    options: ['A legbelső hármas metszettel (A ∩ B ∩ C)', 'Az alaphalmaz legszélével', 'Bármelyik halmaz teljes létszámával', 'Az unióval'],
    correctAnswer: 'A legbelső hármas metszettel (A ∩ B ∩ C)',
    explanation: 'Mindig belülről kifelé haladunk: először a mindhárom tulajdonsággal rendelkezőket írjuk be, hogy a páros metszetekből és a halmazokból levonhassuk őket.'
  },
  {
    id: 'stat-q23',
    level: 3,
    question: 'Gondoltam egy egész számra 1 és 100 között. Hány "Igen / Nem" válasszal eldönthető barkochba kérdésből lehet optimális felezéssel BIZTOSAN kitalálni a számot?',
    options: ['Legfeljebb 7 kérdésből', 'Legfeljebb 10 kérdésből', 'Legfeljebb 50 kérdésből', 'Pontosan 100 kérdésből'],
    correctAnswer: 'Legfeljebb 7 kérdésből',
    explanation: 'Minden felező kérdés megduplázza a lefedhető tartományt: 2⁶ = 64 < 100, de 2⁷ = 128 > 100. Ezért 7 kérdés elegendő!'
  },
  {
    id: 'stat-q24',
    level: 3,
    question: 'A klasszikus 20 kérdéses Barkochba játékban elméletileg hány különböző tárgyat/fogalmat lehetne egyértelműen azonosítani 20 tökéletes felező kérdéssel?',
    options: ['2²⁰ = 1 048 576 lehetőséget', '20 · 20 = 400 lehetőséget', '20 000 lehetőséget', '100 000 lehetőséget'],
    correctAnswer: '2²⁰ = 1 048 576 lehetőséget',
    explanation: '2²⁰ = 1 048 576, azaz több mint egymillió fogalom közül is egyértelműen kiválasztható a megoldás 20 eldöntendő kérdéssel!'
  },
  {
    id: 'stat-q25',
    level: 3,
    question: 'Egy logikai mátrix (szita táblázat) kitöltésekor mit kell tennünk, amint megtalálunk egy biztos párosítást és beírunk egy zöld ✓ pipát?',
    options: ['A pipa sorának és oszlopának többi üres mezőjébe azonnal ✗ jelet kell írnunk', 'Minden más mezőbe pipát kell írnunk', 'Semmit, meg kell várni a következő mondatot', 'Kitöröljük a teljes sort'],
    correctAnswer: 'A pipa sorának és oszlopának többi üres mezőjébe azonnal ✗ jelet kell írnunk',
    explanation: 'Mivel minden személyhez pontosan egy tulajdonság tartozik, a sorban és oszlopban más pipa már nem lehet, így a többi mező kizárható (✗).'
  },
  {
    id: 'stat-q26',
    level: 3,
    question: 'Anna, Béla és Cili mindegyike más hangszeren játszik: hegedű, zongora, furulya. Tudjuk: Béla nem hegedül, és a zongorista fiú. Ki zongorázik?',
    options: ['Béla', 'Anna', 'Cili', 'Nem dönthető el'],
    correctAnswer: 'Béla',
    explanation: 'A két fiú Béla és (ha Cili lány, Anna lány). Mivel a zongorista fiú, és az egyetlen fiú Béla, ezért Béla zongorázik! (Mivel zongorázik, nem hegedül, ami megegyezik a feladattal).'
  },
  {
    id: 'stat-q27',
    level: 3,
    question: 'Egy 32 fős osztályban mindenki sportol legalább egyet a 3 sportág közül: úszás (U), foci (F), kosár (K). Hármas metszet: 3 fő űzi mindhármat. Ha csak két sportágat senki sem űz, hányan űznek pontosan egy sportágat?',
    options: ['29 fő', '32 fő', '26 fő', '18 fő'],
    correctAnswer: '29 fő',
    explanation: 'Az unió 32 fő. A tartományok: (csak 1 sportág) + (páros metszetek = 0) + (mindhárom = 3) = 32. Tehát a csak egyet űzők száma: 32 - 3 = 29 fő.'
  },
  {
    id: 'stat-q28',
    level: 3,
    question: '1-től 1000-ig hány optimális barkochba kérdéssel lehet biztosan kitalálni egy gondolt egész számot?',
    options: ['Legfeljebb 10 kérdésből', 'Legfeljebb 8 kérdésből', 'Legfeljebb 12 kérdésből', 'Legfeljebb 500 kérdésből'],
    correctAnswer: 'Legfeljebb 10 kérdésből',
    explanation: 'Mivel 2⁹ = 512 < 1000, 9 kérdés még nem garantálja a sikert. Viszont 2¹⁰ = 1024 > 1000, így legfeljebb 10 kérdés elegendő.'
  },
  {
    id: 'stat-q29',
    level: 3,
    question: 'Miért hibás az a következtetés, hogy "ha egy 30 fős osztályban 20-an szeretnek olvasni és 18-an moziba járni, akkor legalább 38 diákról van szó"?',
    options: ['Mert vannak olyanok, akik mindkettőt szeretik (metszet), és őket nem szabad duplán számolni', 'Mert senki sem szeret olvasni', 'Mert az olvasók száma nem lehet nagyobb a moziba járóknál', 'Mert a 30 fős osztályban legfeljebb 10-en lehetnek'],
    correctAnswer: 'Mert vannak olyanok, akik mindkettőt szeretik (metszet), és őket nem szabad duplán számolni',
    explanation: 'Az egyszerű összeadás elfelejti levonni a metszetet! Mivel legfeljebb 30 diák van, legalább 20 + 18 - 30 = 8 diáknak mindkét dologban részt kell vennie.'
  },
  {
    id: 'stat-q30',
    level: 3,
    question: 'Egy bűnügyi rejtvényben 3 gyanúsított van (Kovács, Nagy, Szabó). Egyikük a tettes, a másik a szemtanú, a harmadik az ártatlan alibivel rendelkező. Tudjuk: Szabó nem a tettes; Kovács és a tettes jó barátok. Ki a tettes?',
    options: ['Nagy', 'Kovács', 'Szabó', 'Nem derül ki a leírásból'],
    correctAnswer: 'Nagy',
    explanation: 'Kovács és a tettes jó barátok → Kovács nem a tettes (nem lehet önmaga barátja). Szabó sem a tettes a feladat szerint. Kizárásos alapon (mátrix) a tettes csak Nagy lehet!'
  }
];

export const StatisticsGamesQuiz: React.FC<StatisticsGamesQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Játékok és Venn-diagramok kvíz"
      subtitle="Gyakorold a Venn-diagramokat, halmazműveleteket, osztálytermi feladványokat és barkochba stratégiákat 3 szinten!"
      topicBadge="6. OSZTÁLY • VI. STATISZTIKA • 1. JÁTÉKOK"
      badgeText="6. OSZTÁLY • VI. STATISZTIKA • 1. JÁTÉKOK"
      themeColor="pink"
      topicId="g6-stat-games-quiz"
      topicTitle="Játékok és Venn-diagramok"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={StatisticsGamesMatcher as any}
      sorterComponent={StatisticsGamesSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default StatisticsGamesQuiz;
