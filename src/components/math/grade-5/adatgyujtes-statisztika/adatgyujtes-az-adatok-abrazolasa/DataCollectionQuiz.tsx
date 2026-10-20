import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { DataCollectionMatcher } from './DataCollectionMatcher';
import { DataCollectionSorter } from './DataCollectionSorter';

export interface DataCollectionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const DATA_COLLECTION_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: STRIGULÁZÁS, GYAKORISÁG ÉS A KUTATÁS LÉPÉSEI (1-10)
  // =========================================================================
  {
    id: 'dc1-1',
    level: 1,
    prompt: 'Hány vonalat tartalmaz egy teljes strigulaköteg a vonalkázásos számlálásnál?',
    options: [
      '5 vonalat (4 függőleges + 1 ferde áthúzás)',
      '4 vonalat',
      '10 vonalat',
      '3 vonalat'
    ],
    correctAnswer: 0,
    explanation: 'A vonalkázásnál négy függőleges vonalat húzunk egymás mellé, majd az ötödik vonallal ferdén áthúzzuk őket, így egy zárt 5-ös köteg keletkezik.',
    hint: 'Négy ujj a kézen, és a hüvelykujj fogja össze őket!'
  },
  {
    id: 'dc1-2',
    level: 1,
    prompt: 'Mi a statisztikai kutatás legelső lépése a felsoroltak közül?',
    options: [
      'A célkitűzés és a kérdésfeltevés (Mit akarunk megtudni?)',
      'A diagram megrajzolása a füzetben',
      'A következtetések levonása',
      'A szavazatok leadása'
    ],
    correctAnswer: 0,
    explanation: 'Bármilyen adatgyűjtés előtt pontosan tisztázni kell a célt és fel kell tenni a vizsgálati kérdést: csak ezután tudjuk eldönteni, hogy milyen adatokat és hogyan gyűjtsünk.',
    hint: 'Mielőtt útnak indulsz, tudnod kell, hová tartasz!'
  },
  {
    id: 'dc1-3',
    level: 1,
    prompt: 'Egy szavazáson egy jelölt neve mellett 3 teljes ötös köteg és 2 különálló vonal látható. Hány szavazatot kapott?',
    options: [
      '17 szavazatot (3 × 5 + 2 = 17)',
      '15 szavazatot',
      '12 szavazatot',
      '18 szavazatot'
    ],
    correctAnswer: 0,
    explanation: '3 teljes köteg az 3 × 5 = 15 szavazat. Ehhez hozzáadva a 2 külön vonalat: 15 + 2 = 17 szavazatot kapott.',
    hint: 'Számolj ötösével: 5, 10, 15, majd adj hozzá még kettőt!'
  },
  {
    id: 'dc1-4',
    level: 1,
    prompt: 'Mit fejez ki a gyakoriság a statisztikában?',
    options: [
      'Azt, hogy egy adott érték vagy válasz hányszor fordult elő a megfigyelés során',
      'A legnagyobb adat értékét',
      'Az adatok összegét',
      'A felmérés pontos idejét'
    ],
    correctAnswer: 0,
    explanation: 'A gyakoriság egyszerűen az előfordulások darabszáma: megmutatja, hány darab vagy hány személy tartozik az adott kategóriába.',
    hint: 'Gondolj a szóra: milyen gyakran (hányszor) fordult elő?'
  },
  {
    id: 'dc1-5',
    level: 1,
    prompt: 'Melyik adatgyűjtési módszert érdemes használni, ha a tanulók kedvenc ételeit szeretnénk megismerni?',
    options: [
      'Kérdőíves felmérés vagy szavazás',
      'Hőmérővel végzett mérés',
      'Vonalzóval végzett mérés',
      'Stopperórás időmérés'
    ],
    correctAnswer: 0,
    explanation: 'Az emberek ízlését, véleményét és döntéseit kérdőíven, szavazólapon vagy kézfeltartásos szavazással gyűjtjük össze.',
    hint: 'A kedvenc ételt nem lehet hőmérővel vagy vonalzóval megmérni!'
  },
  {
    id: 'dc1-6',
    level: 1,
    prompt: 'Hány darab ötös kötegre van szükség pontosan 25 szavazat ábrázolásához?',
    options: [
      '5 darab teljes kötegre (5 × 5 = 25)',
      '4 darab kötegre',
      '6 darab kötegre',
      '10 darab kötegre'
    ],
    correctAnswer: 0,
    explanation: 'Mivel minden köteg 5 vonalból áll: 25 : 5 = 5 darab teljes ötös köteg szükséges.',
    hint: 'Oszd el a 25-öt 5-tel!'
  },
  {
    id: 'dc1-7',
    level: 1,
    prompt: 'Egy osztályban 4-en jöttek busszal, 8-an autóval, 6-an gyalog, 2-en biciklivel. Hány tanuló vett részt a felmérésben?',
    options: [
      '20 tanuló (4 + 8 + 6 + 2 = 20)',
      '18 tanuló',
      '22 tanuló',
      '24 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'A kategóriák gyakoriságait összeadjuk: 4 + 8 + 6 + 2 = 20 tanuló alkotja a mintát.',
    hint: 'Add össze a négy kategória létszámát: 4 + 8 = 12, 12 + 6 = 18, 18 + 2 = ?'
  },
  {
    id: 'dc1-8',
    level: 1,
    prompt: 'Mi a szerepe az „Összesen” sornak a gyakorisági táblázat alján?',
    options: [
      'Segít ellenőrizni, hogy minden adat megvan-e, és megmutatja a teljes minta méretét',
      'Csak díszítő elem a táblázat végén',
      'Ott kell feltüntetni az osztályfőnök nevét',
      'Csak páros számú minták esetén kötelező'
    ],
    correctAnswer: 0,
    explanation: 'Az Összesen sor a számolási hibák azonnali ellenőrzésére szolgál: a gyakoriságok összege pontosan meg kell egyezzen a megkérdezettek összlétszámával.',
    hint: 'Ha valaki kimaradt vagy kétszer lett beszámolva, az összeg nem fog stimmelni.'
  },
  {
    id: 'dc1-9',
    level: 1,
    prompt: 'Egy 5. osztályos dolgozatnál a jegyek gyakorisága: 5-ös: 6 db, 4-es: 8 db, 3-as: 5 db, 2-es: 1 db. Hány diák írta meg a dolgozatot?',
    options: [
      '20 diák (6 + 8 + 5 + 1 = 20)',
      '19 diák',
      '21 diák',
      '25 diák'
    ],
    correctAnswer: 0,
    explanation: 'A dolgozatot író tanulók száma a jegyek darabszámainak összege: 6 + 8 + 5 + 1 = 20 diák.',
    hint: 'Add össze az egyes osztályzatok darabszámait!'
  },
  {
    id: 'dc1-10',
    level: 1,
    prompt: 'Miért előnyös az ötös kötegek (strigulák) használata az egyesével húzott vonalakhoz képest?',
    options: [
      'Mert ötösével sokkal gyorsabban és kevesebb hibával lehet összeszámolni a vonalakat',
      'Mert kevesebb tinta fogy a tollból',
      'Mert csak így lehet páros számokat leírni',
      'Mert így kisebb helyet foglal a füzetben'
    ],
    correctAnswer: 0,
    explanation: 'Ha sok különálló vonal van egymás mellett (pl. 23 darab), a szemünk könnyen elvéti a számlálást. Ötös kötegekben viszont pillanatok alatt látszik: 5, 10, 15, 20 és még 3 = 23.',
    hint: 'Próbálj meg 30 különálló vonalat megszámolni a lapon: könnyű eltéveszteni!'
  },

  // =========================================================================
  // 2. SZINT: RELATÍV GYAKORISÁG, MÓDUSZ ÉS SKÁLATERVEZÉS (11-20)
  // =========================================================================
  {
    id: 'dc2-1',
    level: 2,
    prompt: 'Egy 20 fős osztályban 5 tanuló jár zeneiskolába. Mennyi a zeneiskolások relatív gyakorisága?',
    options: [
      '5 / 20 = 1 / 4 = 25%',
      '5 / 20 = 50%',
      '5 / 20 = 10%',
      '5 / 20 = 20%'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság a kedvező eset és az összes eset hányadosa: 5 / 20 = 1 / 4 = 25 / 100 = 25%.',
    hint: 'Hányadrésze az 5 a 20-nak? Egyszerűsítsd az 5/20 törtet!'
  },
  {
    id: 'dc2-2',
    level: 2,
    prompt: 'Mi a statisztikai minta „módusza” (leggyakoribb értéke)?',
    options: [
      'A leggyakrabban előforduló (legnagyobb gyakoriságú) adat a mintában',
      'A legnagyobb és legkisebb adat különbsége',
      'Az összes adat számtani közepe (átlaga)',
      'A mintában szereplő legkisebb adat'
    ],
    correctAnswer: 0,
    explanation: 'A módusz a mintában a legtöbbször előforduló érték (a legnépszerűbb kategória, a leggyakoribb jegy stb.).',
    hint: 'Gondolj a „divat” szóra: amit a legtöbben hordanak vagy választanak.'
  },
  {
    id: 'dc2-3',
    level: 2,
    prompt: 'Egy parkolóban az autómárkák száma: Ford: 8 db, Opel: 12 db, Toyota: 12 db, Suzuki: 6 db. Mi az autómárkák módusza?',
    options: [
      'Az Opel és a Toyota holtversenyben (12-12 db-bal)',
      'Csak a Ford',
      'Csak a Suzuki',
      'Nincs módusz ebben a mintában'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét márkából (Opel és Toyota) pontosan 12-12 darab van, és ez a legmagasabb gyakoriság, mindkettő a minta módusza (kétmóduszú minta).',
    hint: 'Keresd meg a legnagyobb számot a gyakoriságok között!'
  },
  {
    id: 'dc2-4',
    level: 2,
    prompt: 'Egy 25 fős csoportban a tanulók 40%-a fiú. Hány fiú tanul a csoportban?',
    options: [
      '10 fiú (25 × 0,4 = 10)',
      '12 fiú',
      '8 fiú',
      '15 fiú'
    ],
    correctAnswer: 0,
    explanation: 'A 25 tanuló 10%-a 2,5 fő. A 40% ennek a négyszerese: 4 × 2,5 = 10 fiú. (Vagy: 25 × 40 / 100 = 1000 / 100 = 10 fő).',
    hint: 'Számold ki a 25-nek a 40%-át!'
  },
  {
    id: 'dc2-5',
    level: 2,
    prompt: 'Egy oszlopdiagram függőleges tengelyén a legnagyobb ábrázolandó adat 24 fő, és a füzetben 12 cm magasság áll rendelkezésre. Milyen skálabeosztást érdemes választani?',
    options: [
      '1 cm = 2 fő (így a 24 fős oszlop pontosan 12 cm magas lesz)',
      '1 cm = 10 fő',
      '1 cm = 1 fő',
      '1 cm = 5 fő'
    ],
    correctAnswer: 0,
    explanation: 'Ha 1 cm = 2 fő, akkor 24 fő ábrázolásához pontosan 24 : 2 = 12 cm magas oszlop kell, ami tökéletesen kihasználja a rendelkezésre álló helyet.',
    hint: 'Oszd el a 24-et a 12 cm-rel: 24 : 12 = ?'
  },
  {
    id: 'dc2-6',
    level: 2,
    prompt: 'Egy felmérésben 50 embert kérdeztek meg. 35-en válaszoltak igennel. Mennyi az „igen” válaszok relatív gyakorisága százalékban?',
    options: [
      '70% (mivel 35 / 50 = 70 / 100 = 70%)',
      '35%',
      '50%',
      '80%'
    ],
    correctAnswer: 0,
    explanation: 'A 35 / 50 törtet bővítjük 2-vel, hogy a nevező 100 legyen: 35 × 2 / 50 × 2 = 70 / 100 = 70%.',
    hint: 'Bővítsd a 35/50 törtet úgy, hogy az alsó szám 100 legyen!'
  },
  {
    id: 'dc2-7',
    level: 2,
    prompt: 'Hány vonalból áll 4 teljes ötös köteg és még 3 különálló vonal összesen?',
    options: [
      '23 vonalból (4 × 5 + 3 = 23)',
      '20 vonalból',
      '24 vonalból',
      '25 vonalból'
    ],
    correctAnswer: 0,
    explanation: '4 × 5 = 20, és 20 + 3 = 23 vonal.',
    hint: 'Szorozd össze a 4-et 5-tel, majd adj hozzá 3-at!'
  },
  {
    id: 'dc2-8',
    level: 2,
    prompt: 'Egy osztályban 10 tanuló kutyát, 10 macskát, 5 papagájt tart, 5 tanulónak nincs háziállata (összesen 30 fő). Mekkora a kutyatartók relatív gyakorisága?',
    options: [
      '10 / 30 = 1 / 3 rész (kb. 33,3%)',
      '10 / 30 = 50%',
      '10 / 30 = 25%',
      '10 / 30 = 10%'
    ],
    correctAnswer: 0,
    explanation: 'A kutyások száma 10, az összes tanuló 30. A relatív gyakoriság: 10 / 30 = 1 / 3 rész.',
    hint: 'Egyszerűsítsd a 10/30 törtet 10-zel!'
  },
  {
    id: 'dc2-9',
    level: 2,
    prompt: 'Melyik állítás IGAZ az oszlopdiagram megrajzolásakor a kategóriák oszlopairól?',
    options: [
      'Minden oszlop szélességének pontosan egyenlőnek kell lennie',
      'A nagyobb létszámú kategóriák oszlopát szélesebbre kell rajzolni',
      'Az oszlopoknak kötelezően össze kell érniük',
      'A színek határozzák meg a kategória darabszámát'
    ],
    correctAnswer: 0,
    explanation: 'Az oszlopdiagramnál szigorú szabály, hogy csak a magasság tükrözi a darabszámot! A szélességnek és a térköznek minden kategóriánál azonosnak kell lennie.',
    hint: 'Ha különböző szélességűek lennének az oszlopok, a felületük becsapná a szemünket.'
  },
  {
    id: 'dc2-10',
    level: 2,
    prompt: 'Egy felmérésben 4 válaszlehetőség volt. Az első három relatív gyakorisága: 20%, 35% és 15%. Mekkora a negyedik kategória relatív gyakorisága?',
    options: [
      '30% (mivel 100% − 20% − 35% − 15% = 30%)',
      '20%',
      '40%',
      '25%'
    ],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriságok összege mindig pontosan 100% (1 egész): 100% − (20% + 35% + 15%) = 100% − 70% = 30%.',
    hint: 'A teljes kör vagy teljes sokaság mindig pontosan 100%!'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT ELEMZÉS, ADATHIBÁK ÉS DIAGRAMTERVEZÉS (21-30)
  // =========================================================================
  {
    id: 'dc3-1',
    level: 3,
    prompt: 'Egy kutatásban 40 diákot kérdeztek meg a kedvenc sportágukról. A relatív gyakoriságok: Foci: 45%, Kosárlabda: 30%, Kézilabda: 15%, Egyéb: 10%. Hány diák választotta a kosárlabdát?',
    options: [
      '12 tanuló (40 × 0,3 = 12)',
      '10 tanuló',
      '15 tanuló',
      '8 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'A 40 tanuló 30%-a: 40 × 30 / 100 = 1200 / 100 = 12 tanuló.',
    hint: 'Mennyi a 40-nek a 10%-a? 4 fő. Ennek a 3-szorosa a 30%!'
  },
  {
    id: 'dc3-2',
    level: 3,
    prompt: 'Egy könyvtári felmérésben: Mesekönyv: 35 db, Ifjúsági regény: 45 db, Ismeretterjesztő: 20 db. Mennyi az ifjúsági regények aránya az összes könyvhöz képest?',
    options: [
      '45% (mivel 45 / 100 = 45%)',
      '50%',
      '40%',
      '35%'
    ],
    correctAnswer: 0,
    explanation: 'Az összes könyv száma: 35 + 45 + 20 = 100 db. Ebből a 45 db ifjúsági regény pontosan 45 / 100 = 45%.',
    hint: 'Add össze a könyvek számát, a kapott összeg éppen 100 lesz!'
  },
  {
    id: 'dc3-3',
    level: 3,
    prompt: 'Mi a lényegi különbség a gyakoriság és a relatív gyakoriság között?',
    options: [
      'A gyakoriság egy konkrét darabszám (pl. 6 fő), a relatív gyakoriság egy arány az egészhez képest (pl. 6/24 = 25%)',
      'Nincs köztük semmilyen különbség',
      'A gyakoriság mindig százalék, a relatív gyakoriság darabszám',
      'A relatív gyakoriság mindig nagyobb a sima gyakoriságnál'
    ],
    correctAnswer: 0,
    explanation: 'A gyakoriság közvetlen darabszám (hány darab fordult elő), míg a relatív gyakoriság a teljes sokasághoz (az összes esethez) viszonyított hányados, tört vagy százalék.',
    hint: 'Gondolj az 5 fős adatra: 5 fő önmagában a gyakoriság, de 5 fő a 20-ból (25%) már a relatív gyakoriság.'
  },
  {
    id: 'dc3-4',
    level: 3,
    prompt: 'Egy természetjáró madarakat számlált strigulázással: Cinke: 3 köteg + 4 vonal; Veréb: 5 köteg + 1 vonal; Rigó: 2 köteg. Hány madarat regisztrált összesen?',
    options: [
      '55 madarat (19 + 26 + 10 = 55)',
      '50 madarat',
      '60 madarat',
      '48 madarat'
    ],
    correctAnswer: 0,
    explanation: 'Cinke: 3 × 5 + 4 = 19 db; Veréb: 5 × 5 + 1 = 26 db; Rigó: 2 × 5 = 10 db. Összesen: 19 + 26 + 10 = 55 madár.',
    hint: 'Számold ki az egyes madárfajok darabszámát: 19, 26 és 10, majd add össze őket!'
  },
  {
    id: 'dc3-5',
    level: 3,
    prompt: 'Egy 60 fős évfolyamon a diákok 25%-a kitűnő bizonyítványt szerzett. Hány tanuló lett kitűnő?',
    options: [
      '15 tanuló (60 negyede: 60 : 4 = 15)',
      '20 tanuló',
      '12 tanuló',
      '18 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'A 25% az egynegyed részt jelent. 60 : 4 = 15 tanuló ért el kitűnő eredményt.',
    hint: 'A 25% a 100% negyed része, így oszd el a 60-at 4-gyel!'
  },
  {
    id: 'dc3-6',
    level: 3,
    prompt: 'Egy kérdőíven ez a kérdés áll: „Ugye Ön is egyetért azzal, hogy a matek a legfontosabb tantárgy?” Miért hibás ez a kérdés statisztikai szempontból?',
    options: [
      'Mert szuggesztív (befolyásoló), nem teszi lehetővé a semleges és objektív véleménynyilvánítást',
      'Mert túl hosszú a mondat',
      'Mert kérdőjel van a végén',
      'Egyáltalán nem hibás, nagyon jó kérdés'
    ],
    correctAnswer: 0,
    explanation: 'A jó kérdőív semleges és tárgyilagos. Az „ugye Ön is egyetért” fordulat sugalmazza a választ, torzítja az adatgyűjtés hitelességét.',
    hint: 'A kérdés már előre sugallja a kívánt választ.'
  },
  {
    id: 'dc3-7',
    level: 3,
    prompt: 'Bármilyen statisztikai mintában mennyi az összes lehetséges kategória relatív gyakoriságainak összege?',
    options: [
      'Mindig pontosan 1 (vagyis 100%)',
      'Pontosan a minta elemszáma (N)',
      'Tetszőleges pozitív szám lehet',
      'Mindig 0'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az egyes részek együttesen kiadják az egész mintát, a relatív gyakoriságok összege törtekben kifejezve mindig 1, százalékban kifejezve mindig pontosan 100%.',
    hint: 'A részek összege mindig kiadja a teljes egészet.'
  },
  {
    id: 'dc3-8',
    level: 3,
    prompt: 'Egy gyakorisági táblázatban az adatok: A kategória: 14, B: 21, C: x, D: 18. Az Összesen sorban 70 szerepel. Mennyi a C kategória gyakorisága (x)?',
    options: [
      '17 (mivel 70 − 14 − 21 − 18 = 17)',
      '19',
      '15',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'Az ismert adatok összege: 14 + 21 + 18 = 53. Az összesen 70-ből kivonva: 70 − 53 = 17 a hiányzó érték.',
    hint: 'Vond ki a 70-ből a három ismert szám összegét!'
  },
  {
    id: 'dc3-9',
    level: 3,
    prompt: 'Egy oszlopdiagramon 1 rácsnégyzet 4 főt jelent a függőleges skálán. Egy kategória oszlopának magassága 7 rácsnégyzet. Hány fő tartozik ehhez a kategóriához?',
    options: [
      '28 fő (7 × 4 = 28)',
      '24 fő',
      '32 fő',
      '11 fő'
    ],
    correctAnswer: 0,
    explanation: 'Minden rácsnégyzet 4 egységnek felel meg, így 7 rácsnégyzet magasság: 7 × 4 = 28 főt jelent.',
    hint: 'Szorozd meg a rácsnégyzetek számát az 1 rácsnégyzethez tartozó értékkel!'
  },
  {
    id: 'dc3-10',
    level: 3,
    prompt: 'Egy osztályban a dolgozatjegyek: 8-an 5-öst, 10-en 4-est, 6-an 3-ast, 2-en 2-est kaptak (összesen 26 tanuló). Melyik jegy a dolgozat módusza?',
    options: [
      'A 4-es érdemjegy (10 tanulóval ez a leggyakoribb)',
      'Az 5-ös érdemjegy',
      'A 3-as érdemjegy',
      'A 26-os szám'
    ],
    correctAnswer: 0,
    explanation: 'A módusz a leggyakoribb érték: 4-est kaptak a legtöbben (10 fő), így a módusz a 4-es érdemjegy.',
    hint: 'Melyik jegy melletti gyakoriság (darabszám) a legnagyobb?'
  }
];

export const DataCollectionQuiz: React.FC<DataCollectionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="3. Adatgyűjtés és ábrázolás kvíz"
      subtitle="30 feladat 3 szinten: strigulázás, gyakoriság, relatív gyakoriság, módusz és diagramtervezés"
      questions={DATA_COLLECTION_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-data-collection-quiz"
      storageKey="g5-data-collection-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <DataCollectionMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <DataCollectionSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">1. Szint Puskája: Strigulázás és Lépések</div>
            <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <div>• <strong>Strigulaköteg:</strong> 4 álló vonal + 1 ferde áthúzás = <strong>5 darab</strong>.</div>
              <div>• <strong>Kutatás 5 lépése:</strong> Célkitűzés → Adatgyűjtés → Rendszerezés → Ábrázolás → Következtetés.</div>
              <div>• <strong>Gyakoriság:</strong> Hány alkalommal fordult elő az adott érték.</div>
              <div>• <strong>Összesen sor:</strong> A gyakoriságok összege a teljes minta mérete.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">2. Szint Puskája: Relatív Gyakoriság és Módusz</div>
            <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <div>• <strong>Relatív gyakoriság:</strong> Gyakoriság / Összes adat (törtként vagy százalékként).</div>
              <div>• <strong>Módusz:</strong> A leggyakoribb (legnagyobb létszámú) adat.</div>
              <div>• <strong>Összeg szabály:</strong> A relatív gyakoriságok összege mindig 100% (vagy 1 egész).</div>
              <div>• <strong>Skálaválasztás:</strong> Maximum érték / rendelkezésre álló cm-ek száma.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">3. Szint Puskája: Kritikus Kutatás és Diagramok</div>
            <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <div>• <strong>Szuggesztív kérdés:</strong> Befolyásolja a válaszadót, rontja a kutatás hitelességét.</div>
              <div>• <strong>Oszlopszélesség:</strong> Minden oszlopnak szigorúan egyforma szélesnek kell lennie!</div>
              <div>• <strong>Hiányzó gyakoriság:</strong> Teljes összeg − ismert gyakoriságok összege.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
