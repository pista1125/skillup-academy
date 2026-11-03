import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PlottingMatcher } from './PlottingMatcher';
import { PlottingSorter } from './PlottingSorter';
import {
  PlottingStepsSvg,
  DiscreteVsContinuousSvg,
  PointsOnGraphSvg
} from './PlottingFigures';
import { TrendingUp, Layers, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

interface PlottingQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Grafikonkészítés Alapjai és Táblázatok (Könnyű)',
    subtitle: 'Értéktáblázat készítése, tengelyek skálázása, pontok leolvasása és berajzolása.',
    range: '1 - 10. feladat',
    focus: 'Alaplépések és Értéktáblázat',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Grafikonkészítés Lépései',
        question: 'Mi a helyes logikai sorrend egy függvény grafikonjának megrajzolásakor?',
        figure: <PlottingStepsSvg size={240} />,
        options: [
          'Értelmezési tartomány tisztázása ➔ Értéktáblázat ➔ Pontok berajzolása ➔ Vonalbehúzás / Diszkrét pontok',
          'Vonalbehúzás ➔ Pontok felvétele ➔ Értéktáblázat ➔ Képlet keresése',
          'Tetszőleges vonal rajzolása vonalzóval ➔ Számok ráírása',
          'A pontok berajzolása a tengelyek felrajzolása nélkül'
        ],
        correctAnswer: 0,
        hint: 'Először meg kell határozni az értelmezési tartományt, majd táblázatban számolunk pontokat, berajzoljuk őket, és a tartomány jellege szerint kötjük össze.',
        explanation: 'A szakszerű grafikonrajzolás 4 lépése: D_f tisztázása, értéktáblázat számítása, pontok koordináta-rendszerbe vitele, majd a folytonos vonal behúzása vagy diszkrét pontok meghagyása.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Értéktáblázat Számítás',
        question: 'Az f(x) = 2x - 3 függvény esetén mi a függvényérték, ha x = 4?',
        options: ['5', '8', '11', '1'],
        correctAnswer: 0,
        hint: 'Helyettesíts x helyére 4-et: f(4) = 2 · 4 - 3.',
        explanation: 'f(4) = 2 · 4 - 3 = 8 - 3 = 5. A pont a síkon: (4; 5).'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Koordinátapár Leolvasása',
        question: 'Egy pont koordinátái a síkon P(3; -2). Mit jelent ez a lépések szempontjából az origóból indulva?',
        options: [
          'Vízszintesen 3 egység jobbra, majd függőlegesen 2 egység lefelé',
          'Függőlegesen 3 egység fel, majd vízszintesen 2 egység balra',
          'Vízszintesen 2 egység balra, majd függőlegesen 3 egység fel',
          'Vízszintesen 3 egység balra, majd függőlegesen 2 egység fel'
        ],
        correctAnswer: 0,
        hint: 'P(x; y): az első szám (x) a vízszintes elmozdulás (+jobbra, -balra), a második (y) a függőleges (+fel, -le).',
        explanation: 'A P(x; y) = P(3; -2) esetén x = +3 (3 jobbra) és y = -2 (2 lefelé).'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Egyenes Pontszükséglete',
        question: 'Hány pontot kötelező minimum kiszámítani egy lineáris függvény (egyenes) megrajzolásához?',
        options: [
          'Legalább 2 pontot (de 3 ajánlott ellenőrzésnek)',
          'Legalább 5 pontot',
          'Elég 1etlen pont is',
          'Legalább 10 pontot'
        ],
        correctAnswer: 0,
        hint: 'Két pont egyértelműen meghatároz egy egyenest a geometriában.',
        explanation: 'Két különböző pont egyértelműen kijelöl egy egyenest. A harmadik pont kiváló ellenőrzésként szolgál az esetleges számolási hiba kizárására.'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Értéktáblázat Zérushely',
        question: 'Az f(x) = -3x + 6 függvény melyik x értéknél metszi az x tengelyt (hol 0 a függvényérték)?',
        options: ['x = 2', 'x = -2', 'x = 3', 'x = 6'],
        correctAnswer: 0,
        hint: 'Oldd meg a -3x + 6 = 0 egyenletet.',
        explanation: '-3x + 6 = 0 ➔ 3x = 6 ➔ x = 2. A grafikon a (2; 0) pontban metszi az x tengelyt.'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Y-tengelymetszet',
        question: 'Hol metszi az y tengelyt az f(x) = 4x - 7 függvény grafikonja?',
        options: ['A (0; -7) pontban', 'A (-7; 0) pontban', 'A (0; 4) pontban', 'A (4; -7) pontban'],
        correctAnswer: 0,
        hint: 'Az y tengelyen az x koordináta mindig 0: számítsd ki f(0) értékét!',
        explanation: 'f(0) = 4 · 0 - 7 = -7. Tehát az egyenes az y tengelyt a (0; -7) pontban metszi.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Origón Áthaladás',
        question: 'Melyik függvény grafikonja halad át biztosan az origón, azaz a (0; 0) ponton?',
        options: ['f(x) = 5x', 'f(x) = 5x + 2', 'f(x) = 5x - 3', 'f(x) = 5'],
        correctAnswer: 0,
        hint: 'Olyan függvényt keress, ahol f(0) = 0.',
        explanation: 'Az f(x) = 5x függvénynél f(0) = 5 · 0 = 0. Az egyenes arányosság grafikonja mindig átmegy az origón.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Tengely Skálázás',
        question: 'Mi a legfontosabb alapszabály a koordinátatengelyek beosztásának megválasztásakor?',
        options: [
          'Egy adott tengelyen az egységeknek szigorúan egyenletes térközűeknek kell lenniük',
          'A rácsnégyzetekre mindig a kiszámolt y értékeket kell sorban felírni',
          'Az x és y tengelyen kötelező pontosan ugyanakkorának lennie az 1 egység hosszának',
          'A negatív számokhoz nem szabad tengelyt rajzolni'
        ],
        correctAnswer: 0,
        hint: 'A skála nem torzulhat: minden rácsköz ugyanakkora növekményt jelent.',
        explanation: 'Egy tengely mentén az egységek távolsága állandó kell legyen. (Bár a két tengely egymáshoz képest eltérő léptékű lehet, ha a feladat indokolja, egy tengelyen belül a lépték fix!).'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Konstans Függvény Ábrája',
        question: 'Hogyan néz ki az f(x) = 3 konstans függvény grafikonja a derékszögű koordináta-rendszerben?',
        options: [
          'Egy vízszintes egyenes y = 3 magasságban, párhuzamosan az x tengellyel',
          'Egy függőleges egyenes x = 3 helyen',
          'Egy 45 fokos emelkedő egyenes',
          'Egyetlen pont az (1; 3) helyen'
        ],
        correctAnswer: 0,
        hint: 'Bármilyen x-et adunk meg, y mindig pontosan 3.',
        explanation: 'Mivel minden x értékhez 3-at rendel, a magasság állandó 3: ez egy vízszintes, x tengellyel párhuzamos egyenes.'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Negatív Számok Behelyettesítése',
        question: 'Az f(x) = -2x + 1 függvénynél mennyi f(-3)?',
        options: ['7', '-5', '-7', '5'],
        correctAnswer: 0,
        hint: 'Vigyázz az előjelekre: -2 · (-3) = +6.',
        explanation: 'f(-3) = -2 · (-3) + 1 = 6 + 1 = 7. A grafikon pontja: (-3; 7).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Grafikonrajzolás és Pontilleszkedés (Közepes)',
    subtitle: 'Pontok illeszkedésének ellenőrzése számolással, diszkrét vs. folytonos ábrázolás.',
    range: '11 - 20. feladat',
    focus: 'Pontilleszkedés és Diszkrét/Folytonos Vonalak',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Pontilleszkedés Ellenőrzése',
        question: 'Rajta van-e a P(3; 11) pont az f(x) = 4x - 1 függvény grafikonján?',
        figure: <PointsOnGraphSvg size={240} />,
        options: [
          'Igen, mert f(3) = 4 · 3 - 1 = 11, ami pontosan megegyezik az y koordinátával',
          'Nem, mert a meredekség 4 és nem 3',
          'Nem, mert 3 + 11 = 14 és nem -1',
          'Csak akkor, ha x negatív'
        ],
        correctAnswer: 0,
        hint: 'Helyettesítsd be x = 3-at a függvénybe, és nézd meg, hogy az eredmény 11 lesz-e.',
        explanation: 'Egy pont akkor és csak akkor illeszkedik a grafikonra, ha f(x) = y. f(3) = 4·3 - 1 = 11, tehát P rajta van a grafikonon.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Hiányzó Koordináta Számítása',
        question: 'Az A(5; y) pont rajta van az f(x) = -2x + 13 függvény grafikonján. Mennyi az y koordináta értéke?',
        options: ['3', '23', '-3', '10'],
        correctAnswer: 0,
        hint: 'Számítsd ki f(5) értékét!',
        explanation: 'y = f(5) = -2 · 5 + 13 = -10 + 13 = 3. Tehát a pont az A(5; 3).'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Hiányzó Bemenet Keresése',
        question: 'A B(x; 7) pont illeszkedik az f(x) = 3x - 5 függvény grafikonjára. Mennyi az x értéke?',
        options: ['4', '2', '6', '16'],
        correctAnswer: 0,
        hint: 'Oldd meg a 3x - 5 = 7 egyenletet x-re!',
        explanation: '3x - 5 = 7 ➔ 3x = 12 ➔ x = 4. A pont: B(4; 7).'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Diszkrét Grafikon Tulajdonsága',
        question: 'Egy függvény értelmezési tartománya D_f = {1, 2, 3, 4, 5}. Hogyan kell helyesen ábrázolni a grafikont?',
        figure: <DiscreteVsContinuousSvg size={240} />,
        options: [
          'Csak az 5 darab különálló, izolált pontot jelöljük be, összekötni szigorúan tilos',
          'Egyenes vonallal összekötjük a pontokat az 1-től az 5-ig terjedő szakaszon',
          'Mindkét irányban a végtelenig meghúzott egyenessel',
          'Oszlopdiagramként, téglalapokat rajzolva'
        ],
        correctAnswer: 0,
        hint: 'Mivel az értelmezési tartomány csak izolált számokat tartalmaz, a köztes törtszámok nincsenek értelmezve.',
        explanation: 'Ha D_f véges halmaz vagy csak egészekből áll, a grafikon kizárólag különálló pontokból áll. Tilos őket vonallal összekötni!'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Gyakorlati Diszkrét Hozzárendelés',
        question: 'Melyik valós szituáció grafikonja lesz BIZTOSAN diszkrét pontok halmaza (nem folytonos vonal)?',
        options: [
          'A vásárolt színházjegyek darabszáma és a fizetendő összeg',
          'Egy autó sebességének változása az idő függvényében',
          'A szoba hőmérsékletének alakulása a nap 24 órájában',
          'Egy növény magasságának növekedése hetek alatt'
        ],
        correctAnswer: 0,
        hint: 'Nem tudsz 2,37 darab színházjegyet vásárolni, a darabszám csak nemnegatív egész lehet.',
        explanation: 'Mivel színházjegyből csak egész darabszámot vehetünk (1, 2, 3...), a bemenet diszkrét, így a grafikon különálló pontokból áll.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Nem Illeszkedő Pont Azonosítása',
        question: 'Melyik pont NINCS rajta az f(x) = x² - 3 függvény grafikonján?',
        options: [
          'P(3; 7)',
          'Q(0; -3)',
          'R(2; 1)',
          'S(-2; 1)'
        ],
        correctAnswer: 0,
        hint: 'Számold ki f(3)-at: 3² - 3 = 9 - 3 = 6 ≠ 7.',
        explanation: 'f(3) = 3² - 3 = 6. Mivel a megadott y koordináta 7, a P(3; 7) nincs rajta a grafikonon (a helyes pont (3; 6) lenne).'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Abszolútérték Pontjai',
        question: 'Milyen alakú az f(x) = |x - 2| függvény grafikonja a valós számok halmazán?',
        options: [
          'Egy V alakú törött vonal, amelynek csúcspontja a (2; 0) helyen van',
          'Egyetlen egyenes vonal az origón át',
          'Egy U alakú sima parabola',
          'Két egymással párhuzamos egyenes'
        ],
        correctAnswer: 0,
        hint: 'Az abszolútérték soha nem negatív, és ott törik meg, ahol a belseje 0: x - 2 = 0 ➔ x = 2.',
        explanation: 'Az abszolútérték-függvény grafikonja jellegzetes V alak. x = 2-nél éri el a 0 minimumot, innen jobbra és balra is lineárisan emelkedik.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Tengelyek Metszéspontjai',
        question: 'Az f(x) = 2x - 6 egyenes hol metszi az x és hol az y tengelyt?',
        options: [
          'x tengelyt a (3; 0), y tengelyt a (0; -6) pontban',
          'x tengelyt a (-3; 0), y tengelyt a (0; 6) pontban',
          'x tengelyt a (0; 3), y tengelyt a (-6; 0) pontban',
          'Mindkettőt a (2; -6) pontban'
        ],
        correctAnswer: 0,
        hint: 'y tengelymetszet: x=0 ➔ f(0) = -6. x tengelymetszet: y=0 ➔ 2x - 6 = 0 ➔ x = 3.',
        explanation: 'f(0) = -6 ➔ (0; -6). 2x - 6 = 0 ➔ x = 3 ➔ (3; 0). Ezzel a két ponttal az egyenes máris pontosan behúzható.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Párhuzamos Egyenesek Rajzolása',
        question: 'Hogyan viszonyul egymáshoz az f(x) = 3x + 1 és a g(x) = 3x - 4 függvény grafikonja?',
        options: [
          'Két párhuzamos egyenes, mert a meredekségük megegyezik (m = 3)',
          'Egymásra merőleges egyenesek',
          'Metszik egymást a (0; 0) pontban',
          'Ugyanaz az egyenes, nincs különbség'
        ],
        correctAnswer: 0,
        hint: 'Ha két lineáris függvényben az x együtthatója megegyezik, az egyenesek hajlásszöge azonos.',
        explanation: 'Mivel mindkét függvény meredeksége m = 3, grafikonjaik párhuzamos egyenesek, csak függőlegesen vannak eltolva egymáshoz képest (az egyik +1-nél, a másik -4-nél metszi az y tengelyt).'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Másodfokú Görbe Pontjai',
        question: 'Miért nem elegendő 2 pontot kiszámolni az f(x) = x² függvény grafikonjának megrajzolásához?',
        options: [
          'Mert a képe nem egyenes, hanem görbe (parabola), amelynek ívéhez legalább 5 pont szükséges',
          'Mert 2 pontból nem lehet kiszámítani az origót',
          'Mert a negatív számoknak nincs négyzete',
          'Mert csak páros számú pontot szabad számolni'
        ],
        correctAnswer: 0,
        hint: 'Két pontot csak egyenes vonallal kötnénk össze, de a négyzetes függvény görbül.',
        explanation: 'A másodfokú függvény grafikonja parabola. A görbület és a tengelyponti szimmetria pontos ábrázolásához minimum 5 pontot (pl. x = -2, -1, 0, 1, 2) célszerű kiszámítani.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Korlátozott Tartományok és Összetett Elemzés (Nehéz)',
    subtitle: 'Zárt és nyílt intervallum-végpontok (karikák), szakaszonként értelmezett függvények, paraméteres feladatok.',
    range: '21 - 30. feladat',
    focus: 'Intervallumok, Nyílt/Zárt Végpontok és Szakaszok',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Zárt és Nyílt Végpontok',
        question: 'Legyen f: ]-2; 3] ➔ ℝ, f(x) = x + 1. Hogyan kell ábrázolni a grafikon két végpontját?',
        options: [
          'A (-2; -1) pontban üres karika (○), a (3; 4) pontban teli karika (●)',
          'Mindkét végponton teli karika (●)',
          'Mindkét végponton üres karika (○)',
          'A (-2; -1) pontban teli karika, a (3; 4) pontban üres karika'
        ],
        correctAnswer: 0,
        hint: 'A nyílt végpontot (] zárójel) üres karika jelöli, mert a pont nem tartozik hozzá; a zárt végpontot (] zárójel) teli karika.',
        explanation: 'Mivel x = -2 nyílt (szigorúan nagyobb mint -2), a (-2; -1) végpont üres karika (○). Mivel x = 3 zárt (megengedett az egyenlőség), a (3; 4) végpont teli karika (●).'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Paraméter Meghatározása Pontilleszkedésből',
        question: 'Az f(x) = a · x + 5 függvény grafikonja áthalad a P(3; 11) ponton. Mennyi az \'a\' paraméter értéke?',
        options: ['a = 2', 'a = 3', 'a = -2', 'a = 6'],
        correctAnswer: 0,
        hint: 'Helyettesítsd be: 11 = a · 3 + 5, majd oldd meg a-ra!',
        explanation: '11 = 3a + 5 ➔ 3a = 6 ➔ a = 2. A függvény tehát f(x) = 2x + 5.'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Tengelymetszetek és Terület',
        question: 'Az f(x) = -2x + 6 függvény grafikonja a koordinátatengelyekkel egy derékszögű háromszöget zár be. Mekkora e háromszög területe?',
        options: ['9 területegység', '18 területegység', '12 területegység', '6 területegység'],
        correctAnswer: 0,
        hint: 'Keresd meg a tengelymetszeteket: x tengely (3; 0), y tengely (0; 6). A háromszög befogói 3 és 6.',
        explanation: 'x-metszet: -2x + 6 = 0 ➔ x = 3. y-metszet: f(0) = 6. A derékszögű háromszög befogói a = 3 és b = 6. Terület = (a · b) / 2 = (3 · 6) / 2 = 9.'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Értékkészlet Grafikonról',
        question: 'Az f: [-1; 4] ➔ ℝ, f(x) = 2x - 3 függvény grafikonja egy zárt szakasz. Mi a függvény értékkészlete (R_f)?',
        options: ['[-5; 5]', '[-1; 4]', '[-3; 5]', '[0; 5]'],
        correctAnswer: 0,
        hint: 'Mivel a függvény szigorúan növekvő, a minimális értéket a bal végponton, a maximálisat a jobb végponton veszi fel.',
        explanation: 'f(-1) = 2·(-1) - 3 = -5. f(4) = 2·4 - 3 = 5. A két végpont közötti összes értéket felveszi, így R_f = [-5; 5].'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Két Egyenes Metszéspontja',
        question: 'Hol metszi egymást az f(x) = 2x - 1 és a g(x) = -x + 5 függvény grafikonja?',
        options: ['A (2; 3) pontban', 'A (3; 2) pontban', 'A (1; 1) pontban', 'A (2; 5) pontban'],
        correctAnswer: 0,
        hint: 'A metszéspontban a két függvényérték egyenlő: 2x - 1 = -x + 5.',
        explanation: '2x - 1 = -x + 5 ➔ 3x = 6 ➔ x = 2. Behelyettesítve: y = 2·2 - 1 = 3. A metszéspont koordinátái: (2; 3).'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Félegyenes Grafikon',
        question: 'Az f: [1; ∞[ ➔ ℝ, f(x) = 3 - x függvény grafikonja milyen geometriai alakzat?',
        options: [
          'Egy (1; 2) teli pontból induló, lefelé tartó félegyenes',
          'Mindkét irányban végtelen egyenes',
          'Egy (1; 2) üres pontból induló szakasz',
          'Egy V alakú görbe'
        ],
        correctAnswer: 0,
        hint: 'Mivel a tartomány balról zárt (1-nél indul), de jobbra végtelen, a grafikon egy zárt kezdőpontú félegyenes.',
        explanation: 'Kezdőpont: x = 1 ➔ f(1) = 3 - 1 = 2 (teli karika). Mivel x tetszőlegesen nagy lehet, a vonal jobbra-lefelé a végtelenbe tart: ez egy félegyenes.'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Parabola Tengelypontja',
        question: 'Hol található az f(x) = (x - 3)² + 2 parabola csúcspontja (tengelypontja)?',
        options: ['(3; 2)', '(-3; 2)', '(3; -2)', '(2; 3)'],
        correctAnswer: 0,
        hint: 'A négyzetes tag akkor minimális (0), ha x - 3 = 0, azaz x = 3.',
        explanation: 'A teljes négyzet alakból közvetlenül leolvasható a csúcspont: x = 3 esetén (x-3)² = 0, így y = 2. A csúcspont a (3; 2).'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Egyenesre Illeszkedés Kollinearitás',
        question: 'Egy egyenesen fekszik-e a három pont: A(1; 3), B(2; 5) és C(5; 11)?',
        options: [
          'Igen, mert mindhárom kielégíti az y = 2x + 1 egyenletet',
          'Nem, mert C koordinátái nem illeszkednek az AB egyenesre',
          'Csak akkor, ha az origót is belevesszük',
          'Nem, mert három pont mindig háromszöget alkot'
        ],
        correctAnswer: 0,
        hint: 'Az A és B pontok közötti meredekség m = (5-3)/(2-1) = 2. Ellenőrizd a képletet C-re!',
        explanation: 'Az A(1; 3) és B(2; 5) pontokon átmenő egyenes egyenlete y = 2x + 1. C-t behelyettesítve: 2·5 + 1 = 11, ami stimmel! Tehát a három pont egy egyenesre esik (kollineáris).'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Szétválasztott Értelmezési Tartomány',
        question: 'Milyen alakú az f: ℝ \\ {0} ➔ ℝ, f(x) = 1/x függvény grafikonja?',
        options: [
          'Egy hiperbola két különálló, folytonos ággal (az I. és III. síknegyedben)',
          'Egyetlen folytonos, origón áthaladó egyenes',
          'Egy U alakú parabola, aminek hiányzik a csúcspontja',
          'Két egymást derékszögben metsző egyenes'
        ],
        correctAnswer: 0,
        hint: 'Nullával nem oszthatunk, így az origónál szakadása van a függvénynek.',
        explanation: 'Az f(x) = 1/x grafikonja hiperbola: pozitív x-ekre az I. síknegyedben, negatív x-ekre a III. síknegyedben fut, a tengelyekhez simulva.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Inverz Grafikon Jellegzetessége',
        question: 'Hogyan tükröződik egy invertálható függvény grafikonja, ha megcseréljük az x és y koordinátákat (inverz függvényt készítünk)?',
        options: [
          'Tükröződik az y = x egyenesre (a síknegyed felezőjére)',
          'Tükröződik az x tengelyre',
          'Tükröződik az y tengelyre',
          '90 fokkal elfordul az origó körül'
        ],
        correctAnswer: 0,
        hint: 'A pontok koordinátái (x; y) ➔ (y; x) alakba mennek át, ami az első és harmadik síknegyedet felező y = x egyenesre való tengelyes tükrözés.',
        explanation: 'Az (x; y) pontok (y; x) pontokká alakítása a síkon az y = x főátlóra (szimmetriatengelyre) való tükrözésnek felel meg.'
      }
    ]
  }
};

const plottingCheatSheets: CheatSheetCard[] = [
  {
    title: 'A Grafikonkészítés 4 Lépése',
    category: 'Módszertan',
    icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
    color: 'border-indigo-200 bg-indigo-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>1. Tartomány:</strong> Határozd meg D_f-et (ℝ, ℤ vagy intervallum?).</p>
        <p><strong>2. Értéktáblázat:</strong> Válassz 3-5 kényelmes x-et (pl. -2, 0, 2), és számítsd ki y-t.</p>
        <p><strong>3. Pontok berajzolása:</strong> P(x; y) felmérése (x: vízszintesen, y: függőlegesen).</p>
        <p><strong>4. Vonalbehúzás:</strong> Csak ha D_f = ℝ! Ha D_f = ℤ, maradnak diszkrét pontok.</p>
      </div>
    )
  },
  {
    title: 'Pontilleszkedés Ellenőrzése',
    category: 'Számolási Szabály',
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>Egy <code>P(x₀; y₀)</code> pont akkor és csak akkor van rajta a grafikonon, ha:</p>
        <p className="font-mono font-bold text-emerald-800 text-center bg-white/80 py-1 rounded">
          f(x₀) = y₀
        </p>
        <p>Példa: <code>f(x) = 3x - 1</code> és <code>P(2; 5)</code>:</p>
        <p className="font-mono text-slate-600">f(2) = 3·2 - 1 = 5 ➔ RAJTA VAN ✓</p>
      </div>
    )
  },
  {
    title: 'Diszkrét vs. Folytonos',
    category: 'Gyakori Hiba',
    icon: <Layers className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Diszkrét (D_f = ℤ vagy darabszám):</strong></p>
        <p className="text-amber-900 font-medium">TILOS összekötni! Csak különálló pontokból áll a grafikon.</p>
        <p><strong>Folytonos (D_f = ℝ):</strong></p>
        <p className="text-emerald-900 font-medium">Sima, szakadásmentes vonallal/egyenessel kötjük össze.</p>
      </div>
    )
  },
  {
    title: 'Intervallum Végpontok Jelölése',
    category: 'Jelöléstan',
    icon: <AlertCircle className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Zárt végpont ([a vagy b]):</strong></p>
        <p className="font-medium text-purple-900">● Teli karika (a pont része a grafikonnak).</p>
        <p><strong>Nyílt végpont (]a vagy b[):</strong></p>
        <p className="font-medium text-purple-900">○ Üres karika (a pont nem része a grafikonnak).</p>
      </div>
    )
  }
];

export const PlottingQuiz: React.FC<PlottingQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="6. Készítsünk grafikont!"
      subtitle="Gyakorold az értéktáblázat-készítést, a pontilleszkedés ellenőrzését és a grafikonrajzolást!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={plottingCheatSheets}
      topicId="keszitsunk-grafikont"
      topicTitle="Készítsünk grafikont!"
      activityType="g9-func-grafikon-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={PlottingMatcher}
      sorterComponent={PlottingSorter}
    />
  );
};

