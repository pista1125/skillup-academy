import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { TablesGraphsMatcher } from './TablesGraphsMatcher';
import { TablesGraphsSorter } from './TablesGraphsSorter';

export interface TablesGraphsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const TABLES_GRAPHS_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, DIAGRAMTÍPUSOK ÉS EGYSZERŰ LEOLVASÁS (1-10)
  // =========================================================================
  {
    id: 'tq1-1',
    level: 1,
    prompt: 'Milyen diagramot érdemes választani, ha egy egész (100%) részeinek arányát, megoszlását szeretnénk szemléltetni?',
    options: [
      'Kördiagram',
      'Vonaldiagram',
      'Számegyenes',
      'Pontdiagram'
    ],
    correctAnswer: 0,
    explanation: 'Egy egész megoszlásának, szeleteinek ábrázolására a kördiagram a legtökéletesebb választás, ahol a teljes kör a 100%-os egészet jelenti.',
    hint: 'Gondolj egy felvágott pizzára vagy tortára: ott a szeletek egy kerek egészet adnak ki!'
  },
  {
    id: 'tq1-2',
    level: 1,
    prompt: 'Melyik diagramtípus a legalkalmasabb egy folyamatos időbeli változás (pl. napi hőmérséklet vagy vízállás) nyomon követésére?',
    options: [
      'Vonaldiagram',
      'Kördiagram',
      'Venn-diagram',
      'Sávdiagram'
    ],
    correctAnswer: 0,
    explanation: 'A vonaldiagram pontjait egyenes szakaszokkal kötjük össze, így kiválóan szemlélteti az időbeli emelkedést, csökkenést és az állandóságot.',
    hint: 'A hőmérséklet folyamatosan változik percről percre, ezért vonallal kötjük össze a mért pontokat.'
  },
  {
    id: 'tq1-3',
    level: 1,
    prompt: 'Egy oszlopdiagramon melyik tengelyről olvassuk le a kategóriákhoz tartozó darabszámot (mennyiséget, gyakoriságot)?',
    options: [
      'A függőleges (y) tengelyről',
      'A vízszintes (x) tengelyről',
      'A diagram címéből',
      'A jobb oldali margóról'
    ],
    correctAnswer: 0,
    explanation: 'A hagyományos oszlopdiagramon a vízszintes tengely tartalmazza a kategóriák neveit, a függőleges tengelyen pedig a számértékek (darabszám, skála) találhatók.',
    hint: 'Melyik irányban növekszik az oszlop magassága? Felfelé!'
  },
  {
    id: 'tq1-4',
    level: 1,
    prompt: 'Hány fokos a teljes kör középponti szöge egy kördiagramban?',
    options: [
      '360°',
      '180°',
      '100°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'A teljes kör középponti szöge a geometriában és a kördiagramban is pontosan 360°, ami a 100%-os egésznek felel meg.',
    hint: 'Hány fokot fordulsz, ha egy teljes kört teszel meg magad körül?'
  },
  {
    id: 'tq1-5',
    level: 1,
    prompt: 'Egy kördiagramon az egyik körcikk pontosan félkört alkot (180°). A teljes mennyiség hány százaléka tartozik ide?',
    options: [
      '50%',
      '25%',
      '100%',
      '10%'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a teljes kör 360° és 100%, a 180° pontosan a fele: 100% : 2 = 50%.',
    hint: 'A 180° a 360°-nak pontosan a fele.'
  },
  {
    id: 'tq1-6',
    level: 1,
    prompt: 'Mit jelent egy vonaldiagramon, ha a vonal balról jobbra felfelé halad?',
    options: [
      'Az ábrázolt érték növekszik (emelkedik)',
      'Az ábrázolt érték csökken',
      'Az érték változatlan maradt',
      'A mérés megszakadt'
    ],
    correctAnswer: 0,
    explanation: 'Az idő előrehaladtával balról jobbra haladunk. Ha a vonal felfelé tart, az azt jelenti, hogy a mért érték egyre nagyobb (pl. melegszik az idő).',
    hint: 'Ha hegyre mászol, felfelé mész, a magasságod nő.'
  },
  {
    id: 'tq1-7',
    level: 1,
    prompt: 'Mit jelent egy vonaldiagramon egy teljesen vízszintes egyenes szakasz?',
    options: [
      'Az érték nem változott (állandó maradt)',
      'Az érték nullára esett',
      'Gyors ugrás történt',
      'Hiba történt a mérésben'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes szakasz azt jelzi, hogy az idő telt, de a mért mennyiség pontosan ugyanannyi maradt (pl. 2 órán át tartotta a 25°C-ot a hőmérséklet).',
    hint: 'Se felfelé nem megy, se lefelé nem tart: nem változik.'
  },
  {
    id: 'tq1-8',
    level: 1,
    prompt: 'Egy oszlopdiagramon 4 barát olvasott könyveinek száma látható: Anna (8), Béla (12), Cili (6), Dénes (10). Ki olvasta a legtöbb könyvet?',
    options: [
      'Béla (12 könyv)',
      'Dénes (10 könyv)',
      'Anna (8 könyv)',
      'Cili (6 könyv)'
    ],
    correctAnswer: 0,
    explanation: 'A legmagasabb oszlop Béla nevéhez tartozik, a teteje a 12-es értéknél van.',
    hint: 'Keresd a legmagasabb oszlopot a diagramon!'
  },
  {
    id: 'tq1-9',
    level: 1,
    prompt: 'Ugyanezen a diagramon (Anna: 8, Béla: 12, Cili: 6, Dénes: 10) hány könyvet olvasott a 4 barát összesen?',
    options: [
      '36 könyvet',
      '30 könyvet',
      '40 könyvet',
      '26 könyvet'
    ],
    correctAnswer: 0,
    explanation: 'Az oszlopok értékeit összeadjuk: 8 + 12 + 6 + 10 = 36 könyv.',
    hint: 'Add össze a négy gyerek könyveinek számát: 8 + 12 = 20, 20 + 6 + 10 = ?'
  },
  {
    id: 'tq1-10',
    level: 1,
    prompt: 'Mi a táblázatban a vízszintes adatsor hivatalos megnevezése?',
    options: [
      'Sor',
      'Oszlop',
      'Fejléc',
      'Cella'
    ],
    correctAnswer: 0,
    explanation: 'A táblázatban a vízszintesen elhelyezkedő adatcsoport a sor, a függőleges az oszlop.',
    hint: 'A moziban is sorokban ülünk vízszintesen.'
  },

  // =========================================================================
  // 2. SZINT: SKÁLABEOSZTÁS, SZÖGEK, KÜLÖNBSÉGEK ÉS HIÁNYZÓ ADATOK (11-20)
  // =========================================================================
  {
    id: 'tq2-1',
    level: 2,
    prompt: 'Egy oszlopdiagram függőleges tengelyén a fő beosztások 5-ösével követik egymást (0, 5, 10, 15...). Egy oszlop teteje pontosan a 10 és 15 közötti felezővonalig ér. Hány egységet jelent ez?',
    options: [
      '12,5 egység',
      '11 egység',
      '13 egység',
      '15 egység'
    ],
    correctAnswer: 0,
    explanation: 'A 10 és a 15 távolsága 5 egység. Ennek a fele 2,5 egység, így a felezővonal értéke: 10 + 2,5 = 12,5.',
    hint: 'Mennyi a 10 és a 15 számtani közepe (átlaga)?'
  },
  {
    id: 'tq2-2',
    level: 2,
    prompt: 'Hány fokos középponti szög tartozik egy 25%-os (negyed rész) arányhoz a kördiagramon?',
    options: [
      '90° (derékszög)',
      '45°',
      '180°',
      '60°'
    ],
    correctAnswer: 0,
    explanation: 'A teljes kör 360°. Ennek a negyede (25%-a): 360° : 4 = 90°, ami pontosan egy derékszög.',
    hint: 'Oszd el a 360°-ot 4-gyel!'
  },
  {
    id: 'tq2-3',
    level: 2,
    prompt: 'Egy táblázatban 4 tantárgy heti óraszáma: Matek: 5, Magyar: 4, Történelem: 2, Testnevelés: x. Tudjuk, hogy az összes heti óraszám 14. Mennyi az x értéke?',
    options: [
      '3 óra',
      '4 óra',
      '2 óra',
      '5 óra'
    ],
    correctAnswer: 0,
    explanation: 'A megadott órák összege: 5 + 4 + 2 = 11. Mivel az összesen 14, így a testnevelés: 14 − 11 = 3 óra.',
    hint: 'Vond ki a 14-ből a többi tantárgy óraszámainak összegét!'
  },
  {
    id: 'tq2-4',
    level: 2,
    prompt: 'Egy hőmérsékleti grafikonon hétfőn 14°C-ot, csütörtökön 26°C-ot látunk. Mennyivel nőtt a hőmérséklet hétfőtől csütörtökig?',
    options: [
      '12°C-kal',
      '14°C-kal',
      '10°C-kal',
      '26°C-kal'
    ],
    correctAnswer: 0,
    explanation: 'A különbség a két érték kivonásával számítható ki: 26°C − 14°C = 12°C-os felmelegedés történt.',
    hint: 'Vond ki a 26-ból a 14-et!'
  },
  {
    id: 'tq2-5',
    level: 2,
    prompt: 'Egy kördiagram 3 szeletből áll: Kék (40%), Piros (35%) és Zöld. Hány százalék jut a zöld körcikkre?',
    options: [
      '25%',
      '30%',
      '20%',
      '15%'
    ],
    correctAnswer: 0,
    explanation: 'A teljes kör 100%. A kék és piros együtt: 40% + 35% = 75%. A zöld rész: 100% − 75% = 25%.',
    hint: 'A kördiagram szeleteinek összege mindig pontosan 100%!'
  },
  {
    id: 'tq2-6',
    level: 2,
    prompt: 'Hány fokos körcikk tartozik a 10%-os arányhoz a kördiagramban?',
    options: [
      '36° (360° : 10)',
      '10°',
      '20°',
      '45°'
    ],
    correctAnswer: 0,
    explanation: 'A 10% a teljes 100% tized része. Ezért a szöge a 360° tized része: 360° : 10 = 36°.',
    hint: 'Oszd el a 360°-ot 10-zel!'
  },
  {
    id: 'tq2-7',
    level: 2,
    prompt: 'Egy 30 fős osztály kedvenc gyümölcsei: Alma: 12 fő, Banán: 9 fő, Narancs: 6 fő, Eper: 3 fő. Melyik gyümölcsöt választotta a tanulók pontosan 10%-a?',
    options: [
      'Eper (3 fő a 30-ból)',
      'Narancs (6 fő)',
      'Banán (9 fő)',
      'Alma (12 fő)'
    ],
    correctAnswer: 0,
    explanation: 'A 30 tanuló 10%-a pontosan 3 fő (30 : 10 = 3). Epret pontosan 3 tanuló választott.',
    hint: 'Mennyi a 30 tanuló 10%-a? (30 tized része).'
  },
  {
    id: 'tq2-8',
    level: 2,
    prompt: 'Egy heti vonaldiagramon a legmelegebb napon 28°C-ot (maximum), a leghidegebben 16°C-ot (minimum) mértek. Mennyi az adatsor terjedelme?',
    options: [
      '12°C',
      '16°C',
      '28°C',
      '44°C'
    ],
    correctAnswer: 0,
    explanation: 'Az adatok terjedelme a legnagyobb és a legkisebb mért érték különbsége: 28°C − 16°C = 12°C.',
    hint: 'Terjedelem = Maximum − Minimum.'
  },
  {
    id: 'tq2-9',
    level: 2,
    prompt: 'Miben különbözik a sávdiagram a hagyományos oszlopdiagramtól?',
    options: [
      'A sávdiagram oszlopai vízszintesen fekszenek',
      'A sávdiagram kör alakú',
      'A sávdiagram nem használ tengelyeket',
      'Nincs köztük semmilyen különbség'
    ],
    correctAnswer: 0,
    explanation: 'A sávdiagram vízszintes téglalapokból áll. Különösen akkor használják, ha a kategóriák nevei hosszúak (pl. könyvcímek, országok nevei), mert vízszintesen könnyebb elolvasni őket.',
    hint: 'Gondolj a fekvő sávokra a monitoron.'
  },
  {
    id: 'tq2-10',
    level: 2,
    prompt: 'Ha egy kördiagramban egy körcikk szöge 120°, a teljes sokaságnak mekkora része tartozik ide?',
    options: [
      'Egyharmad része (1/3)',
      'Egynegyed része (1/4)',
      'Fele (1/2)',
      'Egytizede (1/10)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 120° / 360° = 1 / 3, ez a körcikk a teljes egész egyharmad részét (kb. 33,3%-ot) jelenti.',
    hint: 'Hányszor van meg a 120 a 360-ban?'
  },

  // =========================================================================
  // 3. SZINT: FÉLREVEZETŐ GRAFIKONOK, ÖSSZETETT ELEMZÉS ÉS SZÁMÍTÁSOK (21-30)
  // =========================================================================
  {
    id: 'tq3-1',
    level: 3,
    prompt: 'Miért számít félrevezetőnek egy olyan oszlopdiagram, amelynek függőleges tengelye nem 0-ról, hanem 90-ről indul?',
    options: [
      'Mert az oszlopok magasságának aránya nem egyezik a valós számok arányával (eltúlozza a csekély különbséget)',
      'Mert nem lehet róla leolvasni a számértékeket',
      'Mert a 90 páratlan tízes',
      'Mert a szabályok szerint tilos 0-tól eltérő számot írni a tengelyre'
    ],
    correctAnswer: 0,
    explanation: 'Ha a skála nem 0-ról indul, a levágott tengely miatt egy alig 5%-os különbség (pl. 95 vs 100) a szemünknek kétszer akkorának tűnhet, mint a valóságban!',
    hint: 'Gondolj a magasságok arányára: a szemünk a téglalapok magasságát hasonlítja össze.'
  },
  {
    id: 'tq3-2',
    level: 3,
    prompt: 'Egy kördiagramon pontosan 1%-nak hány fokos középponti szög felel meg?',
    options: [
      '3,6° (mivel 360° : 100 = 3,6°)',
      '1°',
      '0,36°',
      '36°'
    ],
    correctAnswer: 0,
    explanation: 'A 100% felel meg 360°-nak. Így 1% = 360° : 100 = 3,6°.',
    hint: 'Oszd el a 360°-ot 100-zal!'
  },
  {
    id: 'tq3-3',
    level: 3,
    prompt: 'Egy vonaldiagram egy autó sebességét mutatja: a 0. percben 0 km/h, az 1. percben 60 km/h, a 2. percben 80 km/h. Melyik percben gyorsult intenzívebben (meredekebben) az autó?',
    options: [
      'Az 1. percben (60 km/h-s sebességnövekedés történt)',
      'A 2. percben (20 km/h-s sebességnövekedés történt)',
      'Egyformán gyorsult mindkét percben',
      'Nem állapítható meg a grafikonról'
    ],
    correctAnswer: 0,
    explanation: 'Az 1. percben a sebesség 0-ról 60-ra nőtt (+60 km/h), a 2. percben csak 60-ról 80-ra (+20 km/h). Az első szakaszon sokkal meredekebb a vonal!',
    hint: 'Hasonlítsd össze a növekményeket: 60 − 0 = 60, míg 80 − 60 = 20.'
  },
  {
    id: 'tq3-4',
    level: 3,
    prompt: 'Egy 36 fős osztályban a tanulók egyharmada (1/3-a) kutyát tart otthon. Hány fokos körcikk jelöli őket a kördiagramon, és hány tanulóról van szó?',
    options: [
      '120°-os körcikk és 12 tanuló',
      '90°-os körcikk és 9 tanuló',
      '180°-os körcikk és 18 tanuló',
      '60°-os körcikk és 6 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'A 36 tanuló harmada: 36 : 3 = 12 fő. A 360° harmada: 360° : 3 = 120°.',
    hint: 'Oszd el a 36-ot is és a 360°-ot is 3-mal!'
  },
  {
    id: 'tq3-5',
    level: 3,
    prompt: 'Egy bolt negyedéves bevételei: I.: 15 m Ft, II.: 20 m Ft, III.: 25 m Ft, IV.: 40 m Ft. Mennyi volt az éves összbevétel, és a IV. negyedév ennek hány százaléka?',
    options: [
      '100 millió Ft összbevétel és 40%',
      '80 millió Ft összbevétel és 50%',
      '100 millió Ft összbevétel és 25%',
      '90 millió Ft összbevétel és 44%'
    ],
    correctAnswer: 0,
    explanation: 'Összbevétel: 15 + 20 + 25 + 40 = 100 millió Ft. Ebből a 40 millió Ft pontosan 40%-ot jelent.',
    hint: 'Add össze a 4 összeget: 15 + 20 + 25 + 40 = ?'
  },
  {
    id: 'tq3-6',
    level: 3,
    prompt: 'Két város heti hőmérsékleti vonaldiagramja látható ugyanazon a koordináta-rendszeren. Pénteken a két vonal metszi egymást a 20°C-os magasságban. Mit jelent ez a metszéspont?',
    options: [
      'Pénteken mindkét városban pontosan ugyanakkora (20°C) volt a hőmérséklet',
      'Pénteken megszakadt a hőmérséklet mérése',
      'Pénteken volt a hét leghidegebb napja',
      'A két városban megfordult a szélirány'
    ],
    correctAnswer: 0,
    explanation: 'A két görbe metszéspontjában az x érték (Péntek) és az y érték (20°C) is azonos, tehát mindkét városban éppen 20°C volt a hőmérséklet.',
    hint: 'A metszéspontban mindkét grafikon értéke megegyezik.'
  },
  {
    id: 'tq3-7',
    level: 3,
    prompt: 'Egy 3D-s döntött kördiagramon az elöl lévő szelet 15%-os, a hátsó szelet 30%-os. Miért lehet ez vizuálisan csalóka?',
    options: [
      'A perspektíva miatt a közelebb lévő 15%-os szelet területe nagyobbnak látszhat a távolabbi 30%-osnál',
      'Mert a 3D-s kördiagram szögei nem 360 fokot adnak ki',
      'Mert a 3D-s diagramokon nem lehet színeket használni',
      'Nem csalóka semmilyen szempontból'
    ],
    correctAnswer: 0,
    explanation: 'A térbeli döntés és perspektíva optikai csalódást okoz: a közelebb eső szeletek elnyúlnak, így a kisebb adat nagyobbnak látszik a valóságosnál.',
    hint: 'A perspektíva a közelebbi dolgokat felnagyítja, a távolabbiakat lekicsinyíti.'
  },
  {
    id: 'tq3-8',
    level: 3,
    prompt: 'Egy könyvolvasási versenyen az 5.b osztály 45 könyvet, az 5.c osztály 55 könyvet olvasott. A három 5. osztály összesen 150 könyvet gyűjtött. Hány könyvet olvasott az 5.a?',
    options: [
      '50 könyvet (150 − 45 − 55 = 50)',
      '40 könyvet',
      '60 könyvet',
      '48 könyvet'
    ],
    correctAnswer: 0,
    explanation: 'Az 5.b és 5.c együtt: 45 + 55 = 100 könyvet olvasott. Mivel az összesen 150, így az 5.a osztály: 150 − 100 = 50 könyvet olvasott.',
    hint: 'Vond ki a 150-ből a 45-öt és az 55-öt!'
  },
  {
    id: 'tq3-9',
    level: 3,
    prompt: 'Egy kördiagramon egy körcikk középponti szöge pontosan 54°. A teljes sokaság hány százalékát képviseli ez a körcikk?',
    options: [
      '15% (mivel 54° : 3,6° = 15)',
      '20%',
      '10%',
      '12%'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1% = 3,6°, így 54° : 3,6° = 15%. Vagy aránypárral: 54 / 360 = 54 : 18 / 360 : 18 = 3 / 20 = 15 / 100 = 15%.',
    hint: 'Hányszor van meg a 3,6° az 54°-ban? Vagy egyszerűsítsd a törtszámot: 54/360!'
  },
  {
    id: 'tq3-10',
    level: 3,
    prompt: 'Melyik állítás IGAZ az oszlopdiagram helyes szerkesztési szabályairól?',
    options: [
      'Az oszlopok szélességének és a köztük lévő távolságnak minden kategóriánál egyenlőnek kell lennie',
      'A magasabb értékű oszlopokat mindig szélesebbre kell rajzolni',
      'Nem szükséges skálabeosztást tenni a függőleges tengelyre',
      'Az oszlopoknak kötelezően össze kell érniük'
    ],
    correctAnswer: 0,
    explanation: 'A korrekt oszlopdiagramon csak a magasság tükrözi az adat nagyságát! Az oszlopszélességnek és a térközöknek szigorúan azonosnak kell lenniük, különben a terület torzítja az érzékelést.',
    hint: 'Ha egy oszlop szélesebb a többinél, a területe becsapja a szemünket.'
  }
];

export const TablesGraphsQuiz: React.FC<TablesGraphsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="2. Táblázatok, grafikonok kvíz"
      subtitle="30 feladat 3 szinten: oszlop-, vonal- és kördiagramok leolvasása, arányok, skálák és a félrevezető grafikonok leleplezése"
      questions={TABLES_GRAPHS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-tables-graphs-quiz"
      storageKey="g5-tables-graphs-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <TablesGraphsMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <TablesGraphsSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-blue-700 dark:text-blue-400">1. Szint Puskája: Alapvető Diagramtípusok</div>
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <div>• <strong>Oszlopdiagram:</strong> Különböző kategóriák összehasonlítása.</div>
              <div>• <strong>Vonaldiagram:</strong> Folytonos időbeli változás (növekedés ↗️, csökkenés ↘️, állandó ➡️).</div>
              <div>• <strong>Kördiagram:</strong> Egy egész (100% = 360°) részeinek ábrázolása.</div>
              <div>• <strong>Félkör:</strong> 180° = 50% | <strong>Negyedkör:</strong> 90° = 25%.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-blue-700 dark:text-blue-400">2. Szint Puskája: Skálák és Számítások</div>
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <div>• <strong>Skálabeosztás:</strong> Mindig ellenőrizd az egységek távolságát a tengelyen!</div>
              <div>• <strong>10% arány:</strong> 360° : 10 = 36°-os körcikk.</div>
              <div>• <strong>Terjedelem:</strong> Legnagyobb mért érték (Maximum) − Legkisebb (Minimum).</div>
              <div>• <strong>Hiányzó adat:</strong> Összesen − Ismert adatok összege.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-blue-700 dark:text-blue-400">3. Szint Puskája: Kritikus Elemzés és Trükkök</div>
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <div>• <strong>Levágott tengely:</strong> Ha az y tengely nem 0-ról indul, eltúlozza a különbségeket!</div>
              <div>• <strong>1% szöge:</strong> 360° / 100 = 3,6° fokonként.</div>
              <div>• <strong>Szabályos oszlopok:</strong> Azonos szélesség, azonos térköz, egyenletes skála.</div>
              <div>• <strong>Meredekség:</strong> Minél meredekebb a vonal, annál gyorsabb a változás.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
