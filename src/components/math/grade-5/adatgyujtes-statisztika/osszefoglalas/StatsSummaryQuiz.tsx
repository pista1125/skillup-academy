import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { StatsSummaryMatcher } from './StatsSummaryMatcher';
import { StatsSummarySorter } from './StatsSummarySorter';

export interface StatsSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const STATS_SUMMARY_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: A TÉMAKÖR ÁTFOGÓ ALAPISMERETEI (1-10)
  // =========================================================================
  {
    id: 'sum1-1',
    level: 1,
    prompt: 'Hány darab lapból áll a standard iskolai logikai készlet a 4 alaptulajdonság (szín, forma, méret, lyukasság) alapján?',
    options: [
      '64 darab lapból (4 × 4 × 2 × 2 = 64)',
      '32 darab lapból',
      '48 darab lapból',
      '100 darab lapból'
    ],
    correctAnswer: 0,
    explanation: '4 szín × 4 forma × 2 méret × 2 fajta lyukasság = 64 egyedi, különböző lap.',
    hint: '4 × 4 = 16, 16 × 2 = 32, 32 × 2 = ?'
  },
  {
    id: 'sum1-2',
    level: 1,
    prompt: 'Hány vonalat tartalmaz egy zárt strigulaköteg a statisztikai számlálásnál?',
    options: [
      '5 vonalat (4 függőleges + 1 ferde áthúzás)',
      '4 vonalat',
      '10 vonalat',
      '6 vonalat'
    ],
    correctAnswer: 0,
    explanation: 'Négy függőleges vonalat húzunk, és az ötödik ferdén áthúzza őket, így zárt 5-ös köteget kapunk.',
    hint: 'Gondolj a kezünk 5 ujjára!'
  },
  {
    id: 'sum1-3',
    level: 1,
    prompt: 'Milyen diagramot érdemes választani egy palánta magasságának napi növekedéséhez?',
    options: [
      'Vonaldiagramot (mert időbeli folyamatot, trendet ábrázol)',
      'Kördiagramot',
      'Piktogramot',
      'Fa-diagramot'
    ],
    correctAnswer: 0,
    explanation: 'Az időben folyamatosan változó értékek (folyamatok, hőmérséklet, magasság) bemutatására a vonaldiagram a legalkalmasabb.',
    hint: 'Időbeli változásokhoz és görbékhez vonalat húzunk.'
  },
  {
    id: 'sum1-4',
    level: 1,
    prompt: 'Mennyi a 4, 6 és 8 számok számtani közepe (átlaga)?',
    options: [
      '6 ((4 + 6 + 8) : 3 = 18 : 3 = 6)',
      '18',
      '7',
      '5'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 4 + 6 + 8 = 18. Darabszám: 3. Átlag: 18 : 3 = 6.',
    hint: 'Add össze a hármat, és oszd el 3-mal!'
  },
  {
    id: 'sum1-5',
    level: 1,
    prompt: 'Mit jelent a statisztikában a MÓDUSZ?',
    options: [
      'A mintában a legtöbbször előforduló, legnagyobb darabszámú értéket.',
      'A legkisebb és legnagyobb adat különbségét.',
      'Az összes adat számtani közepét.',
      'A minta középső sorszámú elemét.'
    ],
    correctAnswer: 0,
    explanation: 'A módusz a leggyakoribb érték (a gyakorisági csúcs), például a legnépszerűbb fagylaltíz.',
    hint: 'Melyikből van a legtöbb a kupacban?'
  },
  {
    id: 'sum1-6',
    level: 1,
    prompt: 'Milyen típusú esemény az, hogy szabályos dobókockával 7-nél kisebb számot dobunk?',
    options: [
      'Biztos esemény (100%)',
      'Lehetetlen esemény',
      'Lehetséges, de ritka esemény',
      'Egyenlő esélyű esemény'
    ],
    correctAnswer: 0,
    explanation: 'A kocka lapjai 1-től 6-ig számozottak, mindegyik kisebb 7-nél, így ez az esemény 100%-ban garantált.',
    hint: 'Minden lehetséges dobás kisebb 7-nél?'
  },
  {
    id: 'sum1-7',
    level: 1,
    prompt: 'Milyen típusú esemény az, hogy egy szabályos kockával 8-at dobunk?',
    options: [
      'Lehetetlen esemény (0%)',
      'Biztos esemény',
      'Lehetséges esemény',
      'Egyenlő esélyű esemény'
    ],
    correctAnswer: 0,
    explanation: 'A hatoldalú kockán csak 1-től 6-ig vannak számok, 8-at dobni lehetetlen.',
    hint: 'Van-e 8-as a kockán?'
  },
  {
    id: 'sum1-8',
    level: 1,
    prompt: 'Egy kördiagramon a teljes kör hány fokos és hány százalékot képvisel?',
    options: [
      '360° és 100%',
      '180° és 100%',
      '360° és 50%',
      '100° és 100%'
    ],
    correctAnswer: 0,
    explanation: 'A teljes szög 360°, és a teljes mintát (100%-ot) jelképezi.',
    hint: 'Hány fokos a teljes kör?'
  },
  {
    id: 'sum1-9',
    level: 1,
    prompt: 'Egy adathalmazban a legkisebb szám 12, a legnagyobb 28. Mennyi az adathalmaz terjedelme?',
    options: [
      '16 (mivel 28 − 12 = 16)',
      '40',
      '20',
      '14'
    ],
    correctAnswer: 0,
    explanation: 'Terjedelem = Maximum − Minimum = 28 − 12 = 16.',
    hint: 'A legnagyobb és legkisebb érték különbsége!'
  },
  {
    id: 'sum1-10',
    level: 1,
    prompt: 'Szabályos dobókockával dobva mekkora az esélye a páros szám dobásának?',
    options: [
      '3 a 6-ból (pontosan 50% esély)',
      '1 a 6-ból',
      '2 a 6-ból',
      '4 a 6-ból'
    ],
    correctAnswer: 0,
    explanation: 'Páros számok: {2, 4, 6}. Ez 3 eset a 6-ból, ami 3/6 = 1/2 = 50%.',
    hint: 'A 6 számból hány páros van?'
  },

  // =========================================================================
  // 2. SZINT: SZÁMÍTÁSOK ÉS ÖSSZEFÜGGÉSEK (11-20)
  // =========================================================================
  {
    id: 'sum2-1',
    level: 2,
    prompt: 'Dóri 3 dolgozatot írt: 5, 4, 5 (összegük 14). Mennyi a 4. dolgozata, ha a 4 dolgozat átlaga 4,5 lett?',
    options: [
      '4-es (mert 4 × 4,5 = 18, és 18 − 14 = 4)',
      '5-ös',
      '3-as',
      '2-es'
    ],
    correctAnswer: 0,
    explanation: 'A 4 dolgozat összege: 4 × 4,5 = 18. A meglévő három jegy összege: 5 + 4 + 5 = 14. A 4. jegy: 18 − 14 = 4.',
    hint: 'Összeg = Átlag × Darabszám (4 × 4,5 = 18). Ebből vond ki a 14-et!'
  },
  {
    id: 'sum2-2',
    level: 2,
    prompt: 'Egy osztály 20 tanulója közül 5 diák jár kerékpárral iskolába. Mennyi a kerékpárral járók relatív gyakorisága?',
    options: [
      '25% (törtként 5/20 = 1/4)',
      '5%',
      '20%',
      '50%'
    ],
    correctAnswer: 0,
    explanation: 'Relatív gyakoriság = Gyakoriság / Összes adat = 5 / 20 = 1/4 = 0,25 = 25%.',
    hint: '5 a 20-ból hányad része a 20-nak?'
  },
  {
    id: 'sum2-3',
    level: 2,
    prompt: 'Kati eddigi matematika átlaga 4,0. Kap egy 5-öst. Hogyan változik Kati átlaga?',
    options: [
      'Növekszik (nagyobb lesz, mint 4,0).',
      'Csökken.',
      'Pontosan 4,0 marad.',
      'Azonnal 5,0 lesz.'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az új érdemjegy (5) nagyobb az eddigi átlagnál (4,0), az új adat felfelé húzza a számtani közepet.',
    hint: 'Ha valami jobb az átlagnál, az javítja az eredményt.'
  },
  {
    id: 'sum2-4',
    level: 2,
    prompt: 'Mit mond ki a közrefogási tulajdonság az átlagra?',
    options: [
      'Az átlag mindig a legkisebb és a legnagyobb adat közé esik (Min ≤ Átlag ≤ Max).',
      'Az átlag mindig pontosan az adatok fele.',
      'Az átlag sosem lehet tizedestört.',
      'Az átlag mindig megegyezik a leggyakoribb értékkel.'
    ],
    correctAnswer: 0,
    explanation: 'A számtani közép nem lehet kisebb a legkisebb értéknél és nem lehet nagyobb a legnagyobbnál.',
    hint: 'Lehet-e az átlagod 5-nél jobb, ha a legjobb jegy az 5-ös?'
  },
  {
    id: 'sum2-5',
    level: 2,
    prompt: 'Egy sötét fiókban 4 piros és 2 kék zokni van. Legkevesebb hány zoknit kell kivennünk csukott szemmel, hogy BIZTOSAN legyen köztük legalább egy KÉK zokni?',
    options: [
      '5 zoknit (legrosszabb esetben kihúzzuk mind a 4 pirosat, az 5. már biztosan kék)',
      '2 zoknit',
      '3 zoknit',
      '6 zoknit'
    ],
    correctAnswer: 0,
    explanation: 'Skatulya-elv: a legpechesebb eset, ha az első 4 húzás mind piros. Az 5. húzás azonban már garantáltan kék lesz, mert elfogytak a piros zoknik.',
    hint: 'Képzeld el a legrosszabb esetet: először az összes pirosat kihúzod!'
  },
  {
    id: 'sum2-6',
    level: 2,
    prompt: 'Egy dobozban 8 piros és 2 zöld golyó van. Egyet húzunk. Milyen a piros golyó húzásának esélye a zöldhöz képest?',
    options: [
      'Valószínűbb (80% vs. 20%)',
      'Kevésbé valószínű',
      'Egyenlő esélyű',
      'Lehetetlen'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a 10 golyóból 8 piros és csak 2 zöld, a piros kihúzása jóval valószínűbb (8/10 = 80%).',
    hint: 'Melyik színből van négyszer annyi?'
  },
  {
    id: 'sum2-7',
    level: 2,
    prompt: 'Egy érmét egymás után 4-szer feldobunk, és mind a négyszer ÍRÁS lett. Mekkora az esélye annak, hogy az 5. dobásnál FEJET dobunk?',
    options: [
      'Pontosan 50% (az érmének nincs memóriája)',
      'Majdnem 100%, mert már rég volt fej',
      '0%, mert a széria folytatódik',
      '25%'
    ],
    correctAnswer: 0,
    explanation: 'A szerencsejátékos csapdájának elkerülése: minden egyes pénzfeldobás független, az érme nem emlékszik az előzményekre. Az esély marad 50%.',
    hint: 'Tudja az érme a levegőben, mi volt az előző dobás?'
  },
  {
    id: 'sum2-8',
    level: 2,
    prompt: 'Szabályos dobókockával 2-nél nagyobb számot dobunk. Hány kedvező eset van a 6-ból?',
    options: [
      '4 eset: {3, 4, 5, 6}',
      '3 eset',
      '5 eset',
      '2 eset'
    ],
    correctAnswer: 0,
    explanation: 'A 2-nél szigorúan nagyobb számok a 3, 4, 5 és 6. Ez 4 kedvező eset a 6-ból (4/6 = 2/3 esély).',
    hint: 'A 2-es NEM nagyobb 2-nél! Számold a 3, 4, 5, 6-ot.'
  },
  {
    id: 'sum2-9',
    level: 2,
    prompt: 'Egy felmérésen a következő adatok születtek: 2, 2, 5, 7, 9. Mennyi az adatok összege és átlaga?',
    options: [
      'Összeg = 25, Átlag = 5 (25 : 5 = 5)',
      'Összeg = 20, Átlag = 4',
      'Összeg = 25, Átlag = 2',
      'Összeg = 30, Átlag = 6'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 2 + 2 + 5 + 7 + 9 = 25. Darabszám: 5. Átlag: 25 : 5 = 5.',
    hint: '2 + 2 = 4, 4 + 5 = 9, 9 + 7 = 16, 16 + 9 = 25. Ezt oszd 5-tel!'
  },
  {
    id: 'sum2-10',
    level: 2,
    prompt: 'Mi történik a mintában lévő összes adat átlagával, ha minden egyes adathoz hozzáadunk 3-at?',
    options: [
      'Az új átlag is pontosan 3-mal növekszik.',
      'Az átlag változatlan marad.',
      'Az átlag a háromszorosára nő.',
      'Nem lehet tudni az eredeti adatok nélkül.'
    ],
    correctAnswer: 0,
    explanation: 'Eltolási szabály: Ha minden adatot megnövelünk k-val, a számtani közép is pontosan k-val növekszik.',
    hint: 'Ha mindenki 3 cm-t nő, az osztály átlagmagassága mennyivel nő?'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT FELVÉTELI ÉS VIZSGA TÍPUSÚ FELADATOK (21-30)
  // =========================================================================
  {
    id: 'sum3-1',
    level: 3,
    prompt: 'Egy csoportban 10 fiú átlagmagassága 150 cm, 10 lány átlagmagassága 140 cm. Mennyi a 20 fős csoport együttes átlagmagassága?',
    options: [
      '145 cm ((150 + 140) : 2 = 145, mert egyenlő a létszámuk)',
      '142 cm',
      '148 cm',
      '150 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét csoport létszáma 10-10 fő, az együttes átlag a két átlag számtani közepe: (150 + 140) : 2 = 145 cm. (Összmagasság: 1500 + 1400 = 2900 cm, 2900 : 20 = 145 cm).',
    hint: 'Egyenlő létszámnál az átlagok átlaga érvényes.'
  },
  {
    id: 'sum3-2',
    level: 3,
    prompt: 'Egy 10 fős csoport átlaga 4,0 (összeg: 40). Egy 20 fős csoport átlaga 1,0 (összeg: 20). Mennyi a 30 fős egyesített csoport átlaga?',
    options: [
      '2,0 (összesen 60 pont : 30 fő = 2,0)',
      '2,5',
      '3,0',
      '1,5'
    ],
    correctAnswer: 0,
    explanation: 'Összes pont: 40 + 20 = 60 pont. Összes tanuló: 10 + 20 = 30 fő. Átlag: 60 : 30 = 2,0. Figyelem: NEM (4 + 1) : 2 = 2,5, mert a második csoportban kétszer annyian vannak!',
    hint: 'Számold ki az összes pontot: 40 + 20 = 60, majd oszd el 30-cal!'
  },
  {
    id: 'sum3-3',
    level: 3,
    prompt: 'Két szabályos dobókockával egyszerre dobunk. Melyik összeg dobása a legvalószínűbb a lehetséges összegek közül?',
    options: [
      'A 7-es összeg (6-féleképpen jöhet ki: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1)',
      'A 2-es összeg',
      'A 12-es összeg',
      'A 6-os összeg'
    ],
    correctAnswer: 0,
    explanation: 'A 7-es összegnek van a legtöbb kedvező kimenetele a 36-ból (pontosan 6 eset a 36-ból, azaz 1/6 esély). A 2 és a 12 csak 1-1-féleképpen jöhet ki.',
    hint: 'Melyik összeget lehet a legtöbb számpárból összerakni?'
  },
  {
    id: 'sum3-4',
    level: 3,
    prompt: 'Egy kördiagramon egy kategória a szavazatok 25%-át kapta meg. Hány fokos körcikk tartozik hozzá a diagramban?',
    options: [
      '90° (a 360° negyede: 360° : 4 = 90°)',
      '45°',
      '180°',
      '25°'
    ],
    correctAnswer: 0,
    explanation: '25% az a teljes egész egynegyede (1/4 része). A teljes kör 360°, ennek az egynegyede 360° : 4 = 90° (derékszög).',
    hint: '360° negyede hány fok?'
  },
  {
    id: 'sum3-5',
    level: 3,
    prompt: 'Egy újságcikk grafikonján a függőleges tengely 90-től indul 0 helyett, így a 92 és a 98 közötti különbség hatalmasnak látszik. Milyen grafikon ez?',
    options: [
      'Félrevezető grafikon (letört tengelyű manipuláció)',
      'Vonaldiagram',
      'Tökéletesen szabványos és pontos grafikon',
      'Kördiagram'
    ],
    correctAnswer: 0,
    explanation: 'A letört, nem nulláról induló tengely aránytalanul felnagyítja a kis különbségeket, ezzel félrevezeti a szemlélőt.',
    hint: 'Honnan kellene indulnia a függőleges skálának?'
  },
  {
    id: 'sum3-6',
    level: 3,
    prompt: 'Egy 5 fős családban a tagok életkora: 10, 12, 14, 40 és 44 év. Mennyi az életkorok terjedelme és átlaga?',
    options: [
      'Terjedelem = 34 év, Átlag = 24 év ((10+12+14+40+44):5 = 120:5 = 24)',
      'Terjedelem = 44 év, Átlag = 20 év',
      'Terjedelem = 34 év, Átlag = 20 év',
      'Terjedelem = 24 év, Átlag = 24 év'
    ],
    correctAnswer: 0,
    explanation: 'Terjedelem = Max − Min = 44 − 10 = 34 év. Összeg: 10 + 12 + 14 + 40 + 44 = 120 év. Átlag: 120 : 5 = 24 év.',
    hint: 'Max (44) − Min (10) = 34. Összeg = 120, oszd 5-tel!'
  },
  {
    id: 'sum3-7',
    level: 3,
    prompt: 'Egy dobozban 10 piros, 8 kék és 2 zöld golyó van. Kihúzunk egy golyót. Mennyi az esélye annak, hogy a kihúzott golyó NEM zöld?',
    options: [
      '18 a 20-ból (90% esély)',
      '2 a 20-ból (10%)',
      '50%',
      '10 a 20-ból'
    ],
    correctAnswer: 0,
    explanation: 'Összes golyó: 10 + 8 + 2 = 20 db. Nem zöld golyók (piros vagy kék): 10 + 8 = 18 db. Esély: 18/20 = 9/10 = 90%.',
    hint: 'Hány olyan golyó van, ami NEM zöld? 18 darab a 20-ból.'
  },
  {
    id: 'sum3-8',
    level: 3,
    prompt: 'A kiegyenlítés elve szerint, ha egy számsor átlaga 8, és két adat eltérése az átlagtól +3 és +2, mennyi a harmadik adat eltérése, ha összesen 3 adat van?',
    options: [
      '−5 (mert a pozitív és negatív eltérések összege mindig 0)',
      '+5',
      '0',
      '−1'
    ],
    correctAnswer: 0,
    explanation: 'A kiegyenlítés törvénye szerint az eltérések összege mindig zérus: (+3) + (+2) + (−5) = 0. Így a harmadik adat értéke 8 − 5 = 3.',
    hint: 'A többletek összege +5. Mennyi hiány kell a nullához?'
  },
  {
    id: 'sum3-9',
    level: 3,
    prompt: 'Melyik kérdés számít SZUGGESZTÍV (elfogult, befolyásoló) kérdésnek egy statisztikai felmérésben?',
    options: [
      '„Ugye Ön is egyetért azzal, hogy az egészségtelen cukros üdítőket be kell tiltani az iskolában?”',
      '„Milyen gyakran fogyaszt gyümölcsöt egy héten?”',
      '„Melyik a kedvenc tantárgya a felsoroltak közül?”',
      '„Hány órát tölt átlagosan sportolással hetente?”'
    ],
    correctAnswer: 0,
    explanation: 'Az „Ugye Ön is egyetért...” típusú kérdések burkoltan sugalmazzák a választ és minősítik a témát („egészségtelen cukros”), ezzel elrontják a kutatás objektivitását.',
    hint: 'Melyik kérdés próbálja rávenni a válaszadót egy bizonyos válaszra?'
  },
  {
    id: 'sum3-10',
    level: 3,
    prompt: 'Egy versenyen 4 futó ideje: 10 mp, 12 mp, 13 mp és 15 mp. Ha a leglassabb futó helyett egy új futó érkezik, aki 11 mp alatt futja le a távot, hogyan változik a 4 futó átlagideje?',
    options: [
      'Az átlagidő 1 másodperccel csökken (gyorsabb lesz a csapat).',
      'Az átlagidő nem változik.',
      'Az átlagidő 4 másodperccel nő.',
      'Az átlagidő 4 másodperccel csökken.'
    ],
    correctAnswer: 0,
    explanation: 'A 15 mp-es futó helyett 11 mp-es jött, a teljes összidő 15 − 11 = 4 másodperccel lett kevesebb. Mivel 4 futó van, az átlagidő 4 : 4 = 1 másodperccel csökkent.',
    hint: 'Az összpontszám 4-gyel csökkent. Ezt oszd szét a 4 futó között!'
  }
];

export const StatsSummaryQuiz: React.FC<StatsSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="VII. Statisztika Összefoglaló Nagyteszt"
      subtitle="30 átfogó feladat 3 szinten: logikai halmazok, diagramok, adatgyűjtés, átlag és valószínűség"
      color="slate"
      questions={STATS_SUMMARY_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      MatcherComponent={({ onBack: mBack, level, onNextLevel }) => (
        <StatsSummaryMatcher
          onBack={mBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      SorterComponent={({ onBack: sBack, level, onNextLevel }) => (
        <StatsSummarySorter
          onBack={sBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">1. Szint Puskája: Alapfogalmak Áttekintése</div>
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
              <div>• <strong>Logikai készlet:</strong> 4 szín × 4 forma × 2 méret × 2 lyukasság = 64 lap.</div>
              <div>• <strong>Strigulázás:</strong> 4 álló vonal + 1 áthúzás = 5-ös köteg.</div>
              <div>• <strong>Diagramválasztás:</strong> Oszlop = kategóriák, Vonal = időbeli folyamat, Kör = 100%.</div>
              <div>• <strong>Módusz:</strong> A leggyakoribb érték. Terjedelem = Max − Min.</div>
              <div>• <strong>Események:</strong> Biztos = 100%, Lehetetlen = 0%, Lehetséges = 0..100%.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">2. Szint Puskája: Számítások és Képletek</div>
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
              <div>• <strong>Átlag:</strong> Összeg : Darabszám. Visszafelé: Összeg = Átlag × Darabszám.</div>
              <div>• <strong>Új jegy hatása:</strong> Ha &gt; Átlag → nő; ha &lt; Átlag → csökken; ha = Átlag → változatlan.</div>
              <div>• <strong>Skatulya-elv:</strong> Mindig a legpechesebb esetet számold a biztos sikerhez!</div>
              <div>• <strong>Nincs emlékezet:</strong> Érmedobásnál korábbi dobások nem hatnak az újra (50%).</div>
              <div>• <strong>Relatív gyakoriság:</strong> Gyakoriság / Összes adat (összegük mindig 100%).</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200">3. Szint Puskája: Vizsga- és Felvételi Trükkök</div>
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
              <div>• <strong>Csoportok átlaga:</strong> (A összeg + B összeg) : Összes létszám. (Nem az átlagok átlaga!)</div>
              <div>• <strong>Két kocka összege:</strong> A 7 a leggyakoribb (6 eset a 36-ból). Min = 2, Max = 12.</div>
              <div>• <strong>Kördiagram szögek:</strong> 100% = 360°, 50% = 180°, 25% = 90°, 10% = 36°.</div>
              <div>• <strong>Letört tengely:</strong> Manipuláció, ami eltorzítja a valódi arányokat.</div>
              <div>• <strong>Kiegyenlítés:</strong> Az átlagtól vett pozitív és negatív eltérések összege mindig 0!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
