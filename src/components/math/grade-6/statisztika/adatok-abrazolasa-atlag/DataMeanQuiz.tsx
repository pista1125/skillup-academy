import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { DataMeanMatcher } from './DataMeanMatcher';
import { DataMeanSorter } from './DataMeanSorter';
import {
  QuizDotPlotSvg,
  QuizGradesBarMeanSvg,
  QuizBalanceScaleSvg,
  QuizFrequencyTableSvg,
  QuizMedianLineSvg,
  QuizOutlierChartSvg,
  FrequencyTableVisualSvg,
  MeanBalanceScaleSvg,
  MedianFindingSvg,
  ModeAndRangeSvg,
  OutlierEffectSvg
} from './DataMeanDiagrams';

interface DataMeanQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-mean',
    title: '1. Számtani közép (Átlag, x̄)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Kiszámítása:</strong> Adatok összege osztva a darabszámmal ($n$).</div>
        <div><strong>Képlet:</strong> {"$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$"}</div>
        <div><strong>Fizikai jelentés:</strong> A számegyenes súlypontja (egyensúlyi pont).</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Vigyázat: Az extrém kiugró értékek (outlierek) erősen eltorzíthatják!
        </div>
      </div>
    )
  },
  {
    id: 'cs-median',
    title: '2. Medián (Középső érték, Me)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Kötelező 1. lépés:</strong> Az adatokat növekvő sorrendbe KELL állítani!</div>
        <div><strong>Páratlan elemszám:</strong> Pontosan 1 középső elem van.</div>
        <div><strong>Páros elemszám:</strong> A két középső szám számtani közepe.</div>
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          Nagy előnye: Nem érzékeny a kiugró adatokra!
        </div>
      </div>
    )
  },
  {
    id: 'cs-mode',
    title: '3. Módusz (Leggyakoribb, Mo)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Jelentése:</strong> Az adathalmazban a legtöbbször előforduló érték.</div>
        <div><strong>Diagramon:</strong> A legmagasabb oszlop vagy legtöbb pont csúcsa.</div>
        <div><strong>Típusok:</strong> Lehet 1 módusz, több módusz (bimodális), vagy egy sem (ha minden adat egyszeri).</div>
      </div>
    )
  },
  {
    id: 'cs-range',
    title: '4. Terjedelem (Szóródás, R)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> {"$R = x_{\\max} - x_{\\min}$"}</div>
        <div><strong>Jelentése:</strong> A legnagyobb és a legkisebb adat távolsága.</div>
        <div><strong>Szerepe:</strong> Megmutatja, mekkora sávban szóródnak az adatok.</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          Gyakoriság ($k$): előfordulási darabszám • Relatív gyakoriság ($f = k/n$).
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // =========================================================================
  // 1. SZINT: KÖNNYŰ (Alapozó - 10 kérdés ábrákkal)
  // =========================================================================
  {
    id: 'dm-q1',
    difficulty: 1,
    title: 'Módusz leolvasása a pontdiagramról',
    text: 'A mellékelt pötty-diagramon a diákok által az elmúlt hónapban elolvasott könyvek száma látható. Melyik könyvszám az adatsor módusza ($Mo$)?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Pötty-diagram: elolvasott könyvek száma diákok szerint',
    options: [
      '2 könyv (6 diák olvasta el)',
      '6 könyv',
      '1 könyv (4 diák)',
      '4 könyv (a legnagyobb érték)'
    ],
    correctAnswer: 0,
    explanation:
      'A módusz a leggyakrabban előforduló érték. A diagramon a 2-es könyvszám felett van a legmagasabb ponttorony (6 pötty = 6 tanuló), így a módusz 2 könyv.'
  },
  {
    id: 'dm-q2',
    difficulty: 1,
    title: 'Adatok összegezése a diagramról',
    text: 'A mellékelt pötty-diagram alapján hány olyan tanuló volt, aki legalább 3 könyvet elolvasott?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Pötty-diagram: olvasási eredmények',
    options: [
      '4 tanuló (3 könyv: 3 fő + 4 könyv: 1 fő)',
      '3 tanuló',
      '1 tanuló',
      '7 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A "legalább 3" azt jelenti: 3 vagy 4 könyvet olvasott. A 3-as oszlopban 3 pont van, a 4-es oszlopban 1 pont van, így összesen 3 + 1 = 4 tanuló olvasott legalább 3 könyvet.'
  },
  {
    id: 'dm-q3',
    difficulty: 1,
    title: 'Gyakoriság leolvasása az oszlopdiagramról',
    text: 'A mellékelt oszlopdiagram a matematika dolgozat jegyeit mutatja be. Hány diák kapott jeles (5-ös) érdemjegyet?',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: 'Matematika dolgozat érdemjegyeinek eloszlása',
    options: [
      '3 tanuló',
      '5 tanuló',
      '7 tanuló',
      '1 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'Az 5-ös zöld oszlop tetején a szám és az y tengely beosztása is mutatja: pontosan 3 tanuló írt 5-ös dolgozatot.'
  },
  {
    id: 'dm-q4',
    difficulty: 1,
    title: 'Gyakoriság leolvasása táblázatból',
    text: 'A fagylaltos gyakorisági táblázat alapján hány diák kedvenc íze a vanília?',
    figure: <QuizFrequencyTableSvg />,
    figureCaption: 'Gyakorisági táblázat: fagylalt választás',
    options: [
      '7 fő',
      '10 fő',
      '3 fő',
      '28 fő'
    ],
    correctAnswer: 0,
    explanation:
      'A Vanília sorban a "Gyakoriság (fő)" oszlopban pontosan 7 fő szerepel (ami 28%-os relatív gyakoriságnak felel meg).'
  },
  {
    id: 'dm-q5',
    difficulty: 1,
    title: 'Medián leolvasása rendezett kártyákról',
    text: 'A mellékelt ábrán 9 darab számkártya látható nagyság szerint növekvő sorrendbe rendezve. Melyik szám az adatsor mediánja ($Me$)?',
    figure: <QuizMedianLineSvg />,
    figureCaption: 'Rendezett számkártyák (n = 9)',
    options: [
      '21 (az 5. elem)',
      '18 (a 4. elem)',
      '25 (a 6. elem)',
      '23 (a szélsők átlaga)'
    ],
    correctAnswer: 0,
    explanation:
      'Mivel 9 adat van (páratlan), a medián pontosan a középső, azaz az 5. elem. Előtte 4 adat van (12, 14, 15, 18), utána is 4 adat van (25, 28, 30, 35). A medián a 21.'
  },
  {
    id: 'dm-q6',
    difficulty: 1,
    title: 'Átlag mint mérleghinta alátámasztása',
    text: 'A mérlegen három 1 kg-os súly található az x = 1, x = 3 és x = 8 pozíciókban. Hová kell helyezni az alátámasztást (a számtani közepet), hogy a mérleg tökéletesen vízszintben legyen?',
    figure: <QuizBalanceScaleSvg />,
    figureCaption: 'Egyensúlyozó számegyenes mérleg',
    options: [
      'x = 4-hez, mert (1 + 3 + 8) : 3 = 4',
      'x = 3-hoz (a középső súlyhoz)',
      'x = 5-höz (a számegyenes feléhez)',
      'x = 6-hoz'
    ],
    correctAnswer: 0,
    explanation:
      'A számtani közép fizikai súlypont. Az átlag: (1 + 3 + 8) / 3 = 12 / 3 = 4. Az alátámasztást x = 4-hez helyezve balra a távolságok: (4-1) + (4-3) = 3 + 1 = 4, jobbra a távolság: (8-4) = 4, ami tökéletes egyensúlyt eredményez!'
  },
  {
    id: 'dm-q7',
    difficulty: 1,
    title: 'Módusz érdemjegy leolvasása',
    text: 'A matematika dolgozat eloszlási diagramján melyik érdemjegy a módusz?',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: 'Dolgozat eredmények oszlopdiagramja',
    options: [
      'A 4-es érdemjegy (7 diák kapta)',
      'A 3-as érdemjegy (6 diák)',
      'Az 5-ös érdemjegy (mert az a legjobb)',
      'A 7-es érdemjegy'
    ],
    correctAnswer: 0,
    explanation:
      'A módusz a leggyakoribb adat, vagyis a legmagasabb oszlop. A 4-es érdemjegyet kapták a legtöbben (7 fő).'
  },
  {
    id: 'dm-q8',
    difficulty: 1,
    title: 'Terjedelem leolvasása kártyákról',
    text: 'A rendezett kártyákon (12, 14, 15, 18, 21, 25, 28, 30, 35) mekkora az adatok terjedelme ($R = \text{Max} - \text{Min}$)?',
    figure: <QuizMedianLineSvg />,
    figureCaption: 'Rendezett kártyasorozat',
    options: [
      '23 (mert 35 - 12 = 23)',
      '35 (a legnagyobb)',
      '12 (a legkisebb)',
      '18'
    ],
    correctAnswer: 0,
    explanation:
      'A terjedelem a legnagyobb és a legkisebb érték különbsége: R = 35 - 12 = 23.'
  },
  {
    id: 'dm-q9',
    difficulty: 1,
    title: 'Kiugró érték (outlier) azonosítása',
    text: 'A 60 méteres futás időeredményeinek diagramján melyik mérési adat számít kiugró értéknek?',
    figure: <QuizOutlierChartSvg />,
    figureCaption: 'Futási idők pontdiagramja',
    options: [
      'A 24,0 másodperc (a sérült/elesett futó ideje)',
      'A 9,2 másodperc (a leggyorsabb futó)',
      'A 10,1 másodperc',
      'Nincs kiugró érték'
    ],
    correctAnswer: 0,
    explanation:
      'Öt tanuló szorosan egymás mellett futott 9,2 és 10,1 s között. A 24,0 másodperc kirívóan messze esik a többiek eredményétől, ez egy klasszikus kiugró érték (outlier).'
  },
  {
    id: 'dm-q10',
    difficulty: 1,
    title: 'Százalékos arány leolvasása táblázatból',
    text: 'A gyakorisági táblázat alapján a 25 megkérdezett diák hány százaléka választotta kedvencének a csokoládé fagylaltot?',
    figure: <QuizFrequencyTableSvg />,
    figureCaption: 'Gyakorisági táblázat',
    options: [
      '40% (10 fő a 25-ből)',
      '25%',
      '10%',
      '50%'
    ],
    correctAnswer: 0,
    explanation:
      'A táblázatban 10 fő választotta a csokoládét. Relatív gyakorisága: 10 / 25 = 2/5 = 0,40 = 40%.'
  },

  // =========================================================================
  // 2. SZINT: KÖZEPES (Gyakorló - 10 kérdés ábrákkal)
  // =========================================================================
  {
    id: 'dm-q11',
    difficulty: 2,
    title: 'Mintanagyság (összes adat) kiszámítása pontdiagramról',
    text: 'A mellékelt pötty-diagramon látható pontok alapján hány tanuló vett részt összesen a könyvolvasási felmérésben?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Pötty-diagram: diákok olvasási adatai',
    options: [
      '16 tanuló (2 + 4 + 6 + 3 + 1 = 16)',
      '10 tanuló',
      '29 tanuló',
      '4 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'Minden pötty egy diákot jelent: 0 könyv: 2 fő; 1 könyv: 4 fő; 2 könyv: 6 fő; 3 könyv: 3 fő; 4 könyv: 1 fő. Összesen: 2 + 4 + 6 + 3 + 1 = 16 tanuló.'
  },
  {
    id: 'dm-q12',
    difficulty: 2,
    title: 'Medián megkeresése pontdiagramról',
    text: 'A pötty-diagramon látható 16 adatnak mennyi a mediánja ($Me$)?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Pötty-diagram: olvasott könyvek',
    options: [
      '2 könyv (a 8. és 9. rendezett adat is 2)',
      '1,5 könyv',
      '3 könyv',
      '2,5 könyv'
    ],
    correctAnswer: 0,
    explanation:
      'Mivel n = 16 (páros), a két középső (8. és 9.) adat átlaga a medián. Az adatok rendezve: 0, 0 (1-2.); 1, 1, 1, 1 (3-6.); 2, 2, 2, 2, 2, 2 (7-12.). A 8. és a 9. adat is 2, így a medián (2 + 2) / 2 = 2 könyv.'
  },
  {
    id: 'dm-q13',
    difficulty: 2,
    title: 'Számtani közép kiszámítása oszlopdiagramról',
    text: 'A mellékelt oszlopdiagram alapján számítsd ki a 20 fős osztály matematika dolgozatainak pontos átlagát!',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: '20 diák matematika dolgozatjegyei',
    options: [
      '3,40 (Összeg: 68, darabszám: 20)',
      '3,00',
      '3,75',
      '4,00'
    ],
    correctAnswer: 0,
    explanation:
      'Jegyek összege: (1×1) + (2×3) + (3×6) + (4×7) + (5×3) = 1 + 6 + 18 + 28 + 15 = 68. Átlag: 68 : 20 = 3,4.'
  },
  {
    id: 'dm-q14',
    difficulty: 2,
    title: 'Medián érdemjegy kiszámítása páros mintából',
    text: 'Mennyi az érdemjegyek mediánja a 20 fős osztályban a diagram adatai szerint?',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: 'Matematika jegyek eloszlása',
    options: [
      '3,5 (a 10. elem a 3-as, a 11. elem a 4-es, átlaguk 3,5)',
      '3,0 (a 3-as jegy)',
      '4,0 (a 4-es jegy)',
      '3,4'
    ],
    correctAnswer: 0,
    explanation:
      '20 adatnál a 10. és 11. elem adja a mediánt. Kumulált létszámok: 1-es: 1 fő; 2-es: 1+3=4 fő; 3-as: 4+6=10 fő; 4-es: 10+7=17 fő. A 10. elem még 3-as, a 11. már 4-es. Medián = (3 + 4) : 2 = 3,5!'
  },
  {
    id: 'dm-q15',
    difficulty: 2,
    title: 'Hiányzó gyakoriság kiszámítása a százalékból',
    text: 'A gyakorisági táblázatban az Eper sorban a relatív gyakoriság 20%. Hány diák felel meg ennek a 25 fős mintában (mennyi a hiányzó [X] érték)?',
    figure: <QuizFrequencyTableSvg />,
    figureCaption: 'Gyakorisági táblázat hiányzó mezővel',
    options: [
      '5 fő (25 × 0,20 = 5)',
      '4 fő',
      '6 fő',
      '2 fő'
    ],
    correctAnswer: 0,
    explanation:
      '25 diák 20%-a: 25 × 0,20 = 5 fő (vagy 25 - (10 + 7 + 3) = 25 - 20 = 5 fő). Tehát 5 diák jelölte meg az epret.'
  },
  {
    id: 'dm-q16',
    difficulty: 2,
    title: 'Terjedelem változása kiugró érték hatására',
    text: 'A futási idők diagramján mekkora a terjedelem a kiugró értékkel (24,0 s) együtt, és mekkora lenne nélküle?',
    figure: <QuizOutlierChartSvg />,
    figureCaption: '60 m futási idők',
    options: [
      'Vele: 14,8 s (24,0 - 9,2); nélküle: csupán 0,9 s (10,1 - 9,2)',
      'Vele: 24,0 s; nélküle: 10,1 s',
      'Vele: 10,1 s; nélküle: 9,2 s',
      'Nem változik a terjedelem'
    ],
    correctAnswer: 0,
    explanation:
      'Kiugró értékkel a maximum 24,0 s, a minimum 9,2 s: R = 24,0 - 9,2 = 14,8 s. Nélküle a maximum 10,1 s: R = 10,1 - 9,2 = 0,9 s. A kiugró érték drasztikusan megváltoztatja a terjedelmet!'
  },
  {
    id: 'dm-q17',
    difficulty: 2,
    title: 'Egyensúlyi pozíció áthelyezése a mérlegen',
    text: 'A mérlegen jelenleg 1 kg van az 1, 3 és 8 pontokon (átlag: 4). Ha a 3-as súlyt áttesszük a 6-os pozícióra (súlyok: 1, 6, 8), hová tolódik el az új egyensúlyi pont (átlag)?',
    figure: <QuizBalanceScaleSvg />,
    figureCaption: 'Mérleg számegyenes',
    options: [
      'x = 5-höz, mert (1 + 6 + 8) : 3 = 15 : 3 = 5',
      'x = 4,5-höz',
      'x = 6-hoz',
      'Marad x = 4-nél'
    ],
    correctAnswer: 0,
    explanation:
      'Az új összeg: 1 + 6 + 8 = 15. A darabszám változatlanul 3. Az új számtani közép: 15 : 3 = 5 pontnál lesz.'
  },
  {
    id: 'dm-q18',
    difficulty: 2,
    title: 'Relatív gyakoriság tört alakja',
    text: 'A táblázatban 20 diákból 6 kedveli a testnevelést. Mennyi ennek a relatív gyakorisága egyszerűsített tört alakban?',
    figure: <FrequencyTableVisualSvg />,
    figureCaption: 'Kedvenc tantárgyak adatai',
    options: [
      '3/10 (6/20 egyszerűsítve 2-vel)',
      '6/10',
      '1/4',
      '3/5'
    ],
    correctAnswer: 0,
    explanation:
      'A relatív gyakoriság: f = k / n = 6 / 20. Számlálót és nevezőt 2-vel egyszerűsítve: 3 / 10, ami tizedestörtként 0,3 és százalékban 30%.'
  },
  {
    id: 'dm-q19',
    difficulty: 2,
    title: 'Páros elemszámú medián definíciója',
    text: 'A medián keresési ábra alapján miért kell páros elemszám ($n = 6$) esetén a két középső szám számtani közepét venni?',
    figure: <MedianFindingSvg />,
    figureCaption: 'Medián páratlan és páros elemszám esetén',
    options: [
      'Mert páros darabszám esetén nincs egyetlen kitüntetett középső pozíció',
      'Mert a páros számok átlaga mindig egész szám',
      'Mert a legnagyobb számot nem vesszük figyelembe',
      'Mert így a móduszt kapjuk meg'
    ],
    correctAnswer: 0,
    explanation:
      'Páros elemszám esetén a minta pontosan két egyenlő fére oszlik (3 elem balra, 3 elem jobbra), így a két belső határoló elem átlaga jelöli ki az adatsort felező értéket.'
  },
  {
    id: 'dm-q20',
    difficulty: 2,
    title: 'Módusz változása új adatok bevitelekor',
    text: 'A diagramon látható adatsorban (1 db 1, 2 db 2, 1 db 3, 4 db 4, 2 db 5, 1 db 6) jelenleg 4 a módusz. Mi történne, ha kapnánk még két darab 2-est?',
    figure: <ModeAndRangeSvg />,
    figureCaption: 'Gyakorisági diagram: módusz és terjedelem',
    options: [
      'Két módusz lenne: a 2 és a 4 is (mindkettőből 4 darab)',
      'Csak a 2 lenne az új módusz',
      'Megszűnne a módusz',
      'A módusz 3-ra változna'
    ],
    correctAnswer: 0,
    explanation:
      'Eredetileg a 2-esből 2 db volt, még kettővel 4 db lenne. Mivel a 4-esből is 4 db van, holtverseny alakulna ki: az adatsor bimodális lenne (két módusszal: 2 és 4).'
  },

  // =========================================================================
  // 3. SZINT: NEHÉZ (Bajnok - 10 kérdés ábrákkal)
  // =========================================================================
  {
    id: 'dm-q21',
    difficulty: 3,
    title: 'Pontos átlag kiszámítása pontdiagramról',
    text: 'A pötty-diagramon szereplő 16 tanuló által elolvasott könyvek összesített száma alapján mennyi az egy diákra jutó elolvasott könyvek pontos átlaga?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Pötty-diagram könyvolvasási adatokkal',
    options: [
      '1,8125 könyv (29 könyv : 16 tanuló)',
      '2,0000 könyv',
      '1,5000 könyv',
      '2,5000 könyv'
    ],
    correctAnswer: 0,
    explanation:
      'Összes elolvasott könyv: (0×2) + (1×4) + (2×6) + (3×3) + (4×1) = 0 + 4 + 12 + 9 + 4 = 29 könyv. Átlag: 29 : 16 = 1,8125 könyv (kereken kb. 1,81).'
  },
  {
    id: 'dm-q22',
    difficulty: 3,
    title: 'Kiugró érték hatása átlagra vs mediánra',
    text: 'A 60 méteres futásnál ha kizárjuk az elesett futó kiugró 24,0 másodperces idejét, hogyan változik az 5 normál futó átlaga és mediánja?',
    figure: <QuizOutlierChartSvg />,
    figureCaption: 'Futási idők és kiugró érték',
    options: [
      'Az átlag drasztikusan javul (kb. 12 s-ról 9,6 s-ra), míg a medián alig változik (9,65 s-ról 9,5 s-ra)',
      'Mind az átlag, mind a medián pontosan ugyanannyival változik',
      'A medián drasztikusan változik, az átlag változatlan marad',
      'Egyik sem változik'
    ],
    correctAnswer: 0,
    explanation:
      'Az átlag minden egyes adat értékét belekalkulálja, így a 24 s extrém módon felhúzta az átlagot. A medián viszont csak a pozíciótól függ, így a kiugró adat elhagyása szinte semmilyen hatással nincs rá!'
  },
  {
    id: 'dm-q23',
    difficulty: 3,
    title: 'Új adatok hatása az osztályátlagra',
    text: 'A matematika dolgozat jelenlegi összpontszáma 68 (20 diák, átlag: 3,40). Ha 2 hiányzó tanuló pótdolgozatot ír, és mindketten 5-öst kapnak, mennyi lesz az új osztályátlag?',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: 'Dolgozat eredmények és pótdolgozatok',
    options: [
      'kb. 3,55 (Új összeg: 78, új létszám: 22 diák)',
      '3,80',
      '3,50',
      '4,00'
    ],
    correctAnswer: 0,
    explanation:
      'Új összeg: 68 + 5 + 5 = 78. Új létszám: 20 + 2 = 22 diák. Új átlag: 78 : 22 = 3,5454... $\approx$ 3,55.'
  },
  {
    id: 'dm-q24',
    difficulty: 3,
    title: 'Előjeles eltérések összege a számtani középtől',
    text: 'A mérlegen az átlag x = 4. Mennyi az adatok (1, 3, 8) átlagtól vett előjeles eltéréseinek összege: $(1 - 4) + (3 - 4) + (8 - 4)$?',
    figure: <QuizBalanceScaleSvg />,
    figureCaption: 'Egyensúlyozott mérleg',
    options: [
      'Pontosan 0 (mert -3 + (-1) + 4 = 0)',
      '4',
      '12',
      '-4'
    ],
    correctAnswer: 0,
    explanation:
      'A számtani közép egyik legfontosabb matematikai alaptulajdonsága, hogy a tőle mért előjeles távolságok összege BÁRMELY adathalmaz esetén mindig pontosan 0: (-3) + (-1) + (+4) = 0!'
  },
  {
    id: 'dm-q25',
    difficulty: 3,
    title: 'Komplementer relatív gyakoriság',
    text: 'A táblázatban a diákok 40%-a választotta a csokoládét. Mekkora a relatív gyakorisága annak, hogy egy véletlenszerűen kiválasztott diák NEM csokoládét választott?',
    figure: <QuizFrequencyTableSvg />,
    figureCaption: 'Fagylalt gyakorisági táblázat',
    options: [
      '60% (vagyis 3/5 rész, 15 fő a 25-ből)',
      '40%',
      '50%',
      '10/25'
    ],
    correctAnswer: 0,
    explanation:
      'A teljes sokaság 100% (1,0). Ha 40% csokoládé, akkor nem csokoládé: 100% - 40% = 60%, azaz 15/25 = 3/5 rész.'
  },
  {
    id: 'dm-q26',
    difficulty: 3,
    title: 'Miért félrevezető az átlag fizetéseknél?',
    text: 'Az ábra szerint egy 5 fős cégnél a 4 dolgozó 300 ezer Ft-ot kap, az igazgató viszont 2,8 millió Ft-ot. Miért a medián (300 ezer Ft) mutatja be jobban az átlagos dolgozó anyagi helyzetét?',
    figure: <OutlierEffectSvg />,
    figureCaption: 'Kiugró érték hatása a statisztikára',
    options: [
      'Mert az átlagot (800 ezer Ft) az 1 kiugró fizetés megtévesztően magasra húzza, miközben senki sem kap 800 ezret',
      'Mert a mediánt könnyebb kiszámolni',
      'Mert az igazgató fizetése nem számít bele az átlagba',
      'Mert a dolgozók száma páratlan'
    ],
    correctAnswer: 0,
    explanation:
      'Összes bér: 4×300 + 2800 = 4000 ezer Ft. Átlag: 4000 / 5 = 800 ezer Ft! A dolgozók 80%-a viszont csak 300 ezret kap. Az átlag tehát azt a hamis látszatot keltené, hogy ott jól keresnek, míg a medián hűen tükrözi a tipikus fizetést.'
  },
  {
    id: 'dm-q27',
    difficulty: 3,
    title: 'Új extrém adat beillesztése rendezett adatsorba',
    text: 'A 9 darab rendezett kártya (12, 14, 15, 18, 21, 25, 28, 30, 35) mediánja 21. Ha hozzáírunk egy 10. adatot, amely 100, mennyi lesz az új medián?',
    figure: <QuizMedianLineSvg />,
    figureCaption: 'Rendezett kártyák új elemmel',
    options: [
      '23 (a két új középső elem: a 21 és a 25 átlaga)',
      '21 (változatlan marad)',
      '25',
      '50'
    ],
    correctAnswer: 0,
    explanation:
      '10 adat esetén az 5. és 6. elem számtani közepe a medián. Az 5. elem továbbra is a 21, a 6. elem a 25. Új medián: (21 + 25) / 2 = 23.'
  },
  {
    id: 'dm-q28',
    difficulty: 3,
    title: 'Arányok és százalékok összetett számítása',
    text: 'A matematika dolgozat eloszlásán a tanulók hány százaléka ért el legalább jó (4-es vagy 5-ös) eredményt a 20 fős osztályban?',
    figure: <QuizGradesBarMeanSvg />,
    figureCaption: 'Matematika érdemjegyek',
    options: [
      '50% (7 fő 4-es + 3 fő 5-ös = 10 fő, ami 10/20)',
      '35%',
      '40%',
      '60%'
    ],
    correctAnswer: 0,
    explanation:
      '4-est 7 tanuló, 5-öst 3 tanuló kapott. Összesen 7 + 3 = 10 diák. A teljes osztálylétszám 20 fő, így 10 / 20 = 50% ért el legalább jó osztályzatot.'
  },
  {
    id: 'dm-q29',
    difficulty: 3,
    title: 'Terjedelem alakulása új rekord esetén',
    text: 'A könyvolvasási felmérésben (0-tól 4-ig terjedő adatok, terjedelem: 4) jelentkezik egy diák, aki 7 könyvet olvasott el a hónapban. Hogyan változik a terjedelem?',
    figure: <QuizDotPlotSvg />,
    figureCaption: 'Olvasási pontdiagram',
    options: [
      '4-ről 7-re nő (új terjedelem: 7 - 0 = 7)',
      '4-ről 11-re nő (4 + 7)',
      'Nem változik, mert a minimum nem változott',
      '3-ra csökken'
    ],
    correctAnswer: 0,
    explanation:
      'A legkisebb érték marad 0 könyv, de az új maximum 7 könyv lesz. Új terjedelem: R = 7 - 0 = 7 könyv.'
  },
  {
    id: 'dm-q30',
    difficulty: 3,
    title: 'Adatok eltolása konstans értékkel',
    text: 'Ha egy adathalmaz MINDEN egyes eleméhez hozzáadunk 5-öt, hogyan változik az átlag, a medián és a terjedelem?',
    figure: <MeanBalanceScaleSvg />,
    figureCaption: 'Számegyenes eltolási elv',
    options: [
      'Az átlag és a medián is 5-tel nő, de a terjedelem NEM változik!',
      'Mindhárom mutató 5-tel nő',
      'Csak az átlag nő 5-tel, a medián és a terjedelem nem',
      'Az átlag változatlan marad'
    ],
    correctAnswer: 0,
    explanation:
      'Minden pont 5 egységgel jobbra tolódik a számegyenesen, így a középértékek (átlag, medián) pontosan 5-tel nőnek. A legnagyobb és legkisebb adat közötti távolság (terjedelem) viszont változatlan marad: (Max + 5) - (Min + 5) = Max - Min = R!'
  }
];

export const DataMeanQuiz: React.FC<DataMeanQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="4. Adatok ábrázolása, átlag kvíz"
      subtitle="Olvasd le a diagramokat: számítsd ki az átlagot, móduszt, mediánt és terjedelmet a valós ábrák alapján!"
      badge="VI. STATISZTIKA • 4. ALTÉMA"
      topicId="g6-data-mean-quiz"
      themeColor="teal"
      matcherComponent={DataMeanMatcher as any}
      sorterComponent={DataMeanSorter as any}
      difficultyLevels={[
        {
          level: 1,
          title: '1. Szint: Alapozó leolvasások',
          description: 'Gyakoriságok, módusz, medián és egyensúly leolvasása pont- és oszlopdiagramokról'
        },
        {
          level: 2,
          title: '2. Szint: Gyakorló számítások',
          description: 'Átlag, páros medián, relatív gyakoriság és terjedelem kiszámítása a grafikonokból'
        },
        {
          level: 3,
          title: '3. Szint: Bajnok statisztika',
          description: 'Kiugró értékek, előjeles eltérések, pótdolgozatok hatása és adathalmaz-transzformáció'
        }
      ]}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DataMeanQuiz;
