import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LinearMatcher } from './LinearMatcher';
import { LinearSorter } from './LinearSorter';
import {
  LinearGeneralFormSvg,
  FastPlottingSvg,
  LinearParametersSvg
} from './LinearFigures';
import { TrendingUp, Zap, Target, Scale, Compass, CheckCircle2 } from 'lucide-react';

interface LinearQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Lineáris Függvények Alapjai (Könnyű)',
    subtitle: 'Általános alak, meredekség (m) és tengelymetszet (b) leolvasása, grafikonrajzolás alapjai.',
    range: '1 - 10. feladat',
    focus: 'Általános Alak és Paraméterek',
    questions: [
      {
        id: 'lq1-1',
        questionTypeBadge: 'Paraméterek Leolvasása',
        question: 'Mennyi a meredeksége (m) és az y-tengelymetszete (b) az f(x) = 3x - 5 lineáris függvénynek?',
        figure: <LinearGeneralFormSvg size={240} />,
        options: [
          'm = 3 és b = -5',
          'm = -5 és b = 3',
          'm = 3 és b = 5',
          'm = -3 és b = -5'
        ],
        correctAnswer: 0,
        hint: 'Az f(x) = mx + b alakban az x együtthatója m, az állandó tag b (figyelj az előjelre!).',
        explanation: 'Az f(x) = mx + b alak szerint m = 3 (az x szorzója) és b = -5 (a konstans tag).'
      },
      {
        id: 'lq1-2',
        questionTypeBadge: 'Y-tengelymetszet Pontja',
        question: 'Hol metszi az y tengelyt a g(x) = -2x + 7 függvény grafikonja?',
        options: [
          'A (0; 7) pontban',
          'A (7; 0) pontban',
          'A (0; -2) pontban',
          'A (-2; 7) pontban'
        ],
        correctAnswer: 0,
        hint: 'Az y tengelyen az x koordináta mindig 0: számítsd ki g(0) értékét!',
        explanation: 'g(0) = -2 · 0 + 7 = 7. A metszéspont koordinátái: (0; b) = (0; 7).'
      },
      {
        id: 'lq1-3',
        questionTypeBadge: 'Fordított Sorrendű Képlet',
        question: 'Mennyi a meredeksége és az y-metszete a h(x) = 8 - 4x függvénynek?',
        options: [
          'm = -4 és b = 8',
          'm = 8 és b = -4',
          'm = 4 és b = 8',
          'm = -4 és b = -8'
        ],
        correctAnswer: 0,
        hint: 'Az x szorzója a meredekség (m), még ha a második helyre van is írva!',
        explanation: 'A h(x) = 8 - 4x átírható h(x) = -4x + 8 alakra. Így m = -4 és b = 8.'
      },
      {
        id: 'lq1-4',
        questionTypeBadge: 'Monotonitás Meghatározása',
        question: 'Hogyan viselkedik az f(x) = -0.5x + 3 függvény a valós számok halmazán?',
        options: [
          'Szigorúan monoton csökkenő, mert m = -0.5 < 0',
          'Szigorúan monoton növekvő, mert b = 3 > 0',
          'Konstans függvény',
          'Először csökken, majd növekszik'
        ],
        correctAnswer: 0,
        hint: 'A monotonitást kizárólag a meredekség (m) előjele dönti el!',
        explanation: 'Mivel a meredekség m = -0.5 negatív, a függvény szigorúan monoton csökken. A b tengelymetszet a monotonitást nem befolyásolja.'
      },
      {
        id: 'lq1-5',
        questionTypeBadge: 'Gyors Rajzolás Lépései',
        question: 'Mi a helyes lépéssorozat az f(x) = 2x - 3 grafikonjának gyors megrajzolásához értéktáblázat nélkül?',
        figure: <FastPlottingSvg size={240} />,
        options: [
          'Bejelöljük a (0; -3) pontot az y tengelyen ➔ 1 egységet lépünk jobbra és 2-t fel ➔ összekötjük a két pontot',
          'Bejelöljük a (2; 0) pontot az x tengelyen ➔ 3-at lépünk le ➔ összekötjük',
          'Bejelöljük a (-3; 0) pontot ➔ 2-t lépünk jobbra és 1-et fel',
          'Origóból húzunk egy 2 meredekségű egyenest és eltoljuk 3-mal balra'
        ],
        correctAnswer: 0,
        hint: 'A (0; b) pont a kiindulás, innen lépünk 1-et jobbra és m-et fel (ha pozitív).',
        explanation: 'A gyors rajzolás algoritmusa: 1. felmérjük a (0; b) = (0; -3) pontot, 2. innen 1 jobbra, m = 2 fel, 3. a kapott két ponton át egyenest húzunk.'
      },
      {
        id: 'lq1-6',
        questionTypeBadge: 'Konstans Függvény Alakja',
        question: 'Hogyan néz ki a k(x) = -4 konstans függvény grafikonja?',
        options: [
          'Egy vízszintes egyenes az y = -4 magasságban (párhuzamos az x tengellyel)',
          'Egy függőleges egyenes az x = -4 helyen',
          'Egy origón átmenő, lefelé tartó egyenes',
          'Egyetlen pont a (0; -4) helyen'
        ],
        correctAnswer: 0,
        hint: 'Minden bemenethez pontosan -4 tartozik, a meredeksége m = 0.',
        explanation: 'Konstans függvénynél m = 0, így nem emelkedik és nem süllyed: egy vízszintes egyenes y = -4 magasságban.'
      },
      {
        id: 'lq1-7',
        questionTypeBadge: 'Konstans Függvény Értékkészlete',
        question: 'Mi az f(x) = 5 konstans függvény értékkészlete (R_f)?',
        options: [
          'R_f = {5} (egyetlen elemből álló halmaz)',
          'R_f = ℝ (minden valós szám)',
          'R_f = [0; 5]',
          'R_f = [5; ∞['
        ],
        correctAnswer: 0,
        hint: 'Milyen számokat vesz fel függvényértékként? Csak az 5-öt!',
        explanation: 'Bármilyen x valós számot helyettesítünk be, a kimenet mindig pontosan 5. Ezért az értékkészlet az egyelemű halmaz: R_f = {5}.'
      },
      {
        id: 'lq1-8',
        questionTypeBadge: 'Egyenes Arányosság Speciális Eset',
        question: 'Melyik lineáris függvény egyben egyenes arányosság is?',
        options: [
          'f(x) = 6x',
          'f(x) = 6x + 1',
          'f(x) = 6x - 2',
          'f(x) = 6'
        ],
        correctAnswer: 0,
        hint: 'Egyenes arányosság esetén b = 0, a grafikon átmegy az origón.',
        explanation: 'Az egyenes arányosság az a speciális lineáris függvény, amelynél b = 0, azaz f(x) = mx (itt f(x) = 6x).'
      },
      {
        id: 'lq1-9',
        questionTypeBadge: 'Párhuzamos Eltolás',
        question: 'Hogyan származtatható az f(x) = 2x + 4 grafikonja az alap g(x) = 2x grafikonjából?',
        figure: <LinearParametersSvg size={240} />,
        options: [
          'Függőlegesen eltoljuk 4 egységgel felfelé az y tengely mentén',
          'Vízszintesen eltoljuk 4 egységgel jobbra',
          'Elforgatjuk 4 fokkal az origó körül',
          'Függőlegesen eltoljuk 4 egységgel lefelé'
        ],
        correctAnswer: 0,
        hint: 'A hozzáadott +4 minden pont magasságát 4-gyel növeli.',
        explanation: 'Mivel a meredekségük azonos (m = 2), az egyenesek párhuzamosak; a +4 konstans tag a grafikont 4 egységgel tolja el függőlegesen felfelé.'
      },
      {
        id: 'lq1-10',
        questionTypeBadge: 'Értéktáblázat Kiszámítása',
        question: 'Mennyi az f(x) = -3x + 10 függvény értéke az x = 4 helyen?',
        options: ['-2', '2', '22', '-12'],
        correctAnswer: 0,
        hint: 'Helyettesíts be: f(4) = -3 · 4 + 10.',
        explanation: 'f(4) = -3 · 4 + 10 = -12 + 10 = -2. A síkbeli pont: (4; -2).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Zérushely és Egyenletfelírás (Közepes)',
    subtitle: 'Zérushely kiszámítása x₀ = -b/m képlettel, tört meredekségek, egyenes egyenlete pontokból.',
    range: '11 - 20. feladat',
    focus: 'Zérushely és Egyenletfelírás',
    questions: [
      {
        id: 'lq2-1',
        questionTypeBadge: 'Zérushely Számítása',
        question: 'Mennyi az f(x) = 3x - 12 függvény zérushelye (hol metszi az x tengelyt)?',
        options: ['x₀ = 4', 'x₀ = -4', 'x₀ = 12', 'x₀ = 36'],
        correctAnswer: 0,
        hint: 'Oldd meg a 3x - 12 = 0 egyenletet!',
        explanation: '3x - 12 = 0 ➔ 3x = 12 ➔ x₀ = 4. A grafikon a (4; 0) pontban metszi az x tengelyt.'
      },
      {
        id: 'lq2-2',
        questionTypeBadge: 'Zérushely Negatív Meredekséggel',
        question: 'Mennyi a g(x) = -2x + 10 függvény zérushelye?',
        options: ['x₀ = 5', 'x₀ = -5', 'x₀ = 10', 'x₀ = -20'],
        correctAnswer: 0,
        hint: '-2x + 10 = 0 ➔ 2x = 10.',
        explanation: '-2x + 10 = 0 ➔ 2x = 10 ➔ x₀ = 5. Képlettel: x₀ = -b / m = -10 / (-2) = 5.'
      },
      {
        id: 'lq2-3',
        questionTypeBadge: 'Tört Zérushely',
        question: 'Mennyi a h(x) = 4x + 6 függvény zérushelye?',
        options: ['x₀ = -1.5 (-3/2)', 'x₀ = 1.5', 'x₀ = -2.5', 'x₀ = -24'],
        correctAnswer: 0,
        hint: '4x + 6 = 0 ➔ 4x = -6 ➔ x = -6/4.',
        explanation: '4x + 6 = 0 ➔ 4x = -6 ➔ x₀ = -6/4 = -1.5.'
      },
      {
        id: 'lq2-4',
        questionTypeBadge: 'Egyenlet Felírása Paraméterekből',
        question: 'Írd fel annak az egyenesnek az egyenletét, amelynek meredeksége m = -3, és az y tengelyt a (0; 4) pontban metszi!',
        options: ['y = -3x + 4', 'y = 4x - 3', 'y = -3x - 4', 'y = 3x + 4'],
        correctAnswer: 0,
        hint: 'y = mx + b, ahol m = -3 és b = 4.',
        explanation: 'Közvetlenül behelyettesítve az y = mx + b általános alakba: y = -3x + 4.'
      },
      {
        id: 'lq2-5',
        questionTypeBadge: 'Tört Meredekség Lépcsőzése',
        question: 'Hogyan lépcsőzünk az f(x) = (2/3)x + 1 függvény grafikonjának rajzolásakor a (0; 1) pontból indulva?',
        options: [
          '3 egységet lépünk jobbra és 2 egységet fel',
          '2 egységet lépünk jobbra és 3 egységet fel',
          '3 egységet lépünk balra és 2 egységet le',
          '1 egységet lépünk jobbra és 2/3 egységet le'
        ],
        correctAnswer: 0,
        hint: 'm = Δy / Δx = 2 / 3: a nevező (3) a vízszintes lépés, a számláló (2) a függőleges lépés.',
        explanation: 'Mivel m = Δy / Δx = 2 / 3, kényelmes egész rácspontot kapunk, ha a nevezőnyit (3-at) lépünk jobbra és a számlálónyit (2-t) fel.'
      },
      {
        id: 'lq2-6',
        questionTypeBadge: 'Egyenlet Pontból és Meredekségből',
        question: 'Egy egyenes meredeksége m = 2, és áthalad a P(3; 11) ponton. Mennyi a b tengelymetszet értéke?',
        options: ['b = 5', 'b = -5', 'b = 17', 'b = 8'],
        correctAnswer: 0,
        hint: 'y = mx + b ➔ 11 = 2 · 3 + b ➔ 11 = 6 + b.',
        explanation: 'Behelyettesítve a pont koordinátáit: 11 = 2 · 3 + b ➔ 11 = 6 + b ➔ b = 5. A teljes egyenlet: y = 2x + 5.'
      },
      {
        id: 'lq2-7',
        questionTypeBadge: 'Párhuzamos Egyenes Keresése',
        question: 'Mi annak az egyenesnek az egyenlete, amely párhuzamos az y = -4x + 1 egyenessel, és átmegy a (0; -7) ponton?',
        options: ['y = -4x - 7', 'y = -4x + 7', 'y = 4x - 7', 'y = (1/4)x - 7'],
        correctAnswer: 0,
        hint: 'Párhuzamos ➔ azonos meredekség (m = -4). y-metszet (0; -7) ➔ b = -7.',
        explanation: 'Mivel párhuzamos, meredeksége megegyezik: m = -4. A (0; -7) pont miatt b = -7. Az egyenlet: y = -4x - 7.'
      },
      {
        id: 'lq2-8',
        questionTypeBadge: 'Zérushely Hiánya',
        question: 'Melyik lineáris függvénynek NINCS zérushelye a valós számok halmazán?',
        options: [
          'f(x) = 6',
          'f(x) = 6x',
          'f(x) = 6x - 6',
          'f(x) = -6x'
        ],
        correctAnswer: 0,
        hint: 'Olyan függvényt keress, amelyik sosem érheti el a 0-t (egy nem nulla konstans).',
        explanation: 'Az f(x) = 6 egy vízszintes egyenes az y = 6 magasságban. Sosem metszi az x tengelyt, így nincs zérushelye.'
      },
      {
        id: 'lq2-9',
        questionTypeBadge: 'Zérushelyből és b-ből Meredekség',
        question: 'Egy lineáris függvény zérushelye x₀ = 3, és az y tengelyt a (0; -6) pontban metszi. Mennyi a meredeksége (m)?',
        options: ['m = 2', 'm = -2', 'm = 0.5', 'm = -0.5'],
        correctAnswer: 0,
        hint: 'A két ismert pont: (3; 0) és (0; -6). m = (0 - (-6)) / (3 - 0).',
        explanation: 'm = (0 - (-6)) / (3 - 0) = 6 / 3 = 2. A függvény tehát f(x) = 2x - 6.'
      },
      {
        id: 'lq2-10',
        questionTypeBadge: 'Pontilleszkedés Ellenőrzése',
        question: 'Illeszkedik-e a Q(4; -1) pont az f(x) = -3x + 11 függvény grafikonjára?',
        options: [
          'Igen, mert f(4) = -3 · 4 + 11 = -12 + 11 = -1',
          'Nem, mert a meredekség -3',
          'Nem, mert az eredmény +1 lenne',
          'Csak akkor, ha x negatív'
        ],
        correctAnswer: 0,
        hint: 'Számold ki f(4) értékét, és hasonlítsd össze az y koordinátával (-1)!',
        explanation: 'f(4) = -3 · 4 + 11 = -12 + 11 = -1, ami pontosan egyenlő az adott y koordinátával, így a pont rajta van a grafikonon.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Metszéspontok, Területek és Szöveges Modellek (Nehéz)',
    subtitle: 'Két egyenes metszéspontja, tengelyekkel bezárt háromszög területe, életszerű gyakorlati feladatok.',
    range: '21 - 30. feladat',
    focus: 'Metszéspontok, Területek és Alkalmazások',
    questions: [
      {
        id: 'lq3-1',
        questionTypeBadge: 'Két Egyenes Metszéspontja',
        question: 'Melyik pontban metszi egymást az f(x) = 2x - 1 és a g(x) = -x + 5 függvény grafikonja?',
        options: ['(2; 3)', '(3; 2)', '(1; 1)', '(2; 5)'],
        correctAnswer: 0,
        hint: 'Egyenlítsd ki a két kifejezést: 2x - 1 = -x + 5 ➔ oldd meg x-re!',
        explanation: '2x - 1 = -x + 5 ➔ 3x = 6 ➔ x = 2. Behelyettesítve: y = 2·2 - 1 = 3. A metszéspont: (2; 3).'
      },
      {
        id: 'lq3-2',
        questionTypeBadge: 'Tengelyekkel Bezárt Terület',
        question: 'Mekkora területű háromszöget zár be az f(x) = -2x + 8 egyenes a koordinátatengelyekkel az I. síknegyedben?',
        options: ['16 területegység', '32 területegység', '8 területegység', '12 területegység'],
        correctAnswer: 0,
        hint: 'Keresd meg a tengelymetszeteket: b = 8 (y-metszet) és x₀ = 4 (zérushely). A derékszögű háromszög területe (a · b) / 2.',
        explanation: 'y-metszet: b = 8. x-metszet (zérushely): -2x + 8 = 0 ➔ x₀ = 4. A derékszögű háromszög befogói 4 és 8. Terület = (4 · 8) / 2 = 16.'
      },
      {
        id: 'lq3-3',
        questionTypeBadge: 'Tengelyekkel Bezárt Terület',
        question: 'Mekkora háromszögterületet zár közre az f(x) = (3/4)x - 6 egyenes a tengelyekkel?',
        options: ['24 területegység', '48 területegység', '18 területegység', '36 területegység'],
        correctAnswer: 0,
        hint: 'y-metszet: |b| = 6. Zérushely: (3/4)x = 6 ➔ x₀ = 8.',
        explanation: 'b = -6 ➔ magasság = 6. (3/4)x - 6 = 0 ➔ (3/4)x = 6 ➔ x₀ = 8 ➔ alap = 8. Terület = (8 · 6) / 2 = 24.'
      },
      {
        id: 'lq3-4',
        questionTypeBadge: 'Taxi Költségmodell',
        question: 'Egy taxitársaság 1100 Ft alapdíjat és kilométerenként 450 Ft-ot számít fel. Melyik képlet fejezi ki az utazás teljes költségét (K) a megtett x kilométer függvényében?',
        options: [
          'K(x) = 450x + 1100',
          'K(x) = 1100x + 450',
          'K(x) = 1550x',
          'K(x) = 450x - 1100'
        ],
        correctAnswer: 0,
        hint: 'A változó költség a kilométerenkénti díj (m = 450), a fix egyszeri tétel az alapdíj (b = 1100).',
        explanation: 'A költségfüggvény lineáris: meredeksége a kilométerdíj (m = 450 Ft/km), tengelymetszete az induló alapdíj (b = 1100 Ft): K(x) = 450x + 1100.'
      },
      {
        id: 'lq3-5',
        questionTypeBadge: 'Víztartály Ürülése',
        question: 'Egy 500 literes víztartályból percenként 25 liter víz folyik ki egyenletesen. Hány perc alatt ürül ki teljesen a tartály (mikor lesz a zérushely)?',
        options: ['20 perc alatt', '25 perc alatt', '15 perc alatt', '50 perc alatt'],
        correctAnswer: 0,
        hint: 'V(t) = 500 - 25t. Mikor lesz V(t) = 0?',
        explanation: 'V(t) = -25t + 500. Zérushely: -25t + 500 = 0 ➔ 25t = 500 ➔ t = 20 perc.'
      },
      {
        id: 'lq3-6',
        questionTypeBadge: 'Két Ponton Átmenő Egyenes',
        question: 'Mi a hozzárendelési szabálya annak az egyenesnek, amely áthalad a P(2; 1) és Q(4; 7) pontokon?',
        options: ['y = 3x - 5', 'y = 2x - 3', 'y = 3x + 1', 'y = 4x - 7'],
        correctAnswer: 0,
        hint: '1. m = (7 - 1) / (4 - 2) = 3. 2. y = 3x + b ➔ 1 = 3 · 2 + b ➔ b = -5.',
        explanation: 'm = (7 - 1) / (4 - 2) = 6 / 2 = 3. A P(2; 1) pontot behelyettesítve: 1 = 3·2 + b ➔ 1 = 6 + b ➔ b = -5. A képlet: y = 3x - 5.'
      },
      {
        id: 'lq3-7',
        questionTypeBadge: 'Hőmérséklet Átváltás (Celsius - Fahrenheit)',
        question: 'A Celsius (°C) és Fahrenheit (°F) közötti átszámítás lineáris: F(C) = 1.8 · C + 32. Milyen hőmérsékleten egyezik meg a két skála értéke (hol F = C)?',
        options: ['-40 fokon', '0 fokon', '-20 fokon', '32 fokon'],
        correctAnswer: 0,
        hint: 'Oldd meg a C = 1.8C + 32 egyenletet!',
        explanation: 'C = 1.8C + 32 ➔ -0.8C = 32 ➔ C = 32 / (-0.8) = -40. Tehát -40 °C pontosan -40 °F-nek felel meg.'
      },
      {
        id: 'lq3-8',
        questionTypeBadge: 'Merőleges Egyenes Egyenlete',
        question: 'Írd fel annak az egyenesnek az egyenletét, amely merőleges az y = 0.5x - 3 egyenesre, és átmegy a P(2; 5) ponton!',
        options: ['y = -2x + 9', 'y = -2x + 5', 'y = 2x + 1', 'y = -0.5x + 6'],
        correctAnswer: 0,
        hint: 'm₁ = 0.5 ➔ a merőleges meredeksége m₂ = -1 / 0.5 = -2. y = -2x + b ➔ 5 = -2 · 2 + b.',
        explanation: 'm₂ = -1 / 0.5 = -2. P(2; 5) behelyettesítésével: 5 = -2 · 2 + b ➔ 5 = -4 + b ➔ b = 9. Az egyenlet: y = -2x + 9.'
      },
      {
        id: 'lq3-9',
        questionTypeBadge: 'Paraméteres Feladat Zérushelyre',
        question: "Mekkora az 'a' paraméter értéke, ha az f(x) = a · x + 12 függvény zérushelye x₀ = -3?",
        options: ['a = 4', 'a = -4', 'a = 3', 'a = -36'],
        correctAnswer: 0,
        hint: 'f(-3) = 0 ➔ a · (-3) + 12 = 0.',
        explanation: '-3a + 12 = 0 ➔ 3a = 12 ➔ a = 4. A függvény tehát f(x) = 4x + 12.'
      },
      {
        id: 'lq3-10',
        questionTypeBadge: 'Gyertya Égése',
        question: 'Egy 24 cm hosszú gyertya óránként 3 cm-t ég le. Melyik képlet írja le a gyertya h hosszát t óra elteltével, és mikor ég le teljesen?',
        options: [
          'h(t) = -3t + 24, és 8 óra alatt ég le teljesen',
          'h(t) = 3t + 24, és 8 óra alatt ég le teljesen',
          'h(t) = 24t - 3, és 6 óra alatt ég le teljesen',
          'h(t) = -3t + 24, és 12 óra alatt ég le teljesen'
        ],
        correctAnswer: 0,
        hint: 'Kezdő hossz (b) = 24 cm, csökkenés (m) = -3 cm/óra. A leégés a zérushely: h(t) = 0.',
        explanation: 'h(t) = -3t + 24. A zérushely: -3t + 24 = 0 ➔ 3t = 24 ➔ t = 8 óra múlva ég el teljesen a gyertya.'
      }
    ]
  }
};

const linearCheatSheets: CheatSheetCard[] = [
  {
    title: 'Általános Alak: f(x) = mx + b',
    category: 'Alapképlet',
    icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>• <strong>m (meredekség):</strong> 1 egységet jobbra lépve m-et emelkedik/süllyed.</p>
        <p>• <strong>b (y-metszet):</strong> A grafikon az <code>M_y(0; b)</code> pontban metszi az y tengelyt.</p>
        <p>• <strong>m &gt; 0:</strong> növekvő | <strong>m &lt; 0:</strong> csökkenő | <strong>m = 0:</strong> vízszintes.</p>
        <p>• <strong>Tartomány és értékkészlet:</strong> D_f = ℝ, R_f = ℝ (ha m ≠ 0).</p>
      </div>
    )
  },
  {
    title: 'Zérushely Számítása: x₀',
    category: 'Számolási Szabály',
    icon: <Target className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>Az a bemeneti pont, ahol a függvényérték 0 lesz (metszi az x tengelyt):</p>
        <p className="font-mono font-bold text-emerald-900 text-center bg-white/80 py-1 rounded text-sm">
          m·x + b = 0 &nbsp;➔&nbsp; x₀ = -b / m
        </p>
        <p className="text-[11px] text-slate-500 italic">
          Vigyázat: Mindig -b/m, ne felejtsd el a negatív előjelet!
        </p>
      </div>
    )
  },
  {
    title: 'Gyors Rajzolás 3 Lépésben',
    category: 'Módszertan',
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p><strong>1. lépés:</strong> Bejelöljük a <code>(0; b)</code> pontot az y tengelyen.</p>
        <p><strong>2. lépés:</strong> Innen 1-et jobbra, majd m-et fel (vagy le).</p>
        <p><strong>Törtnél:</strong> pl. m = 2/3 esetén 3-at jobbra és 2-t fel!</p>
        <p><strong>3. lépés:</strong> Egyenes vonalzóval összekötjük a 2 pontot.</p>
      </div>
    )
  },
  {
    title: 'Tengelyekkel Bezárt Terület',
    category: 'Geometria',
    icon: <Scale className="w-5 h-5 text-blue-600" />,
    color: 'border-blue-200 bg-blue-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>Az egyenes a két tengellyel derékszögű háromszöget zár be:</p>
        <p className="font-mono font-bold text-blue-900 text-center bg-white/80 py-0.5 rounded">
          T = (|x₀| · |b|) / 2
        </p>
        <p>A két befogó hossza a zérushely és az y-tengelymetszet abszolút értéke.</p>
      </div>
    )
  }
];

export const LinearQuiz: React.FC<LinearQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="9. Lineáris függvények"
      subtitle="Gyakorold az f(x) = mx + b egyenesek ábrázolását, a zérushelyek kiszámítását és az életszerű alkalmazásokat!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={linearCheatSheets}
      topicId="linearis-fuggvenyek"
      topicTitle="Lineáris függvények"
      activityType="g9-func-linearis-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={LinearMatcher}
      sorterComponent={LinearSorter}
    />
  );
};

