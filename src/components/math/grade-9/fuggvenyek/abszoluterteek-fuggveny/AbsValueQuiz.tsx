import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AbsValueMatcher } from './AbsValueMatcher';
import { AbsValueSorter } from './AbsValueSorter';
import {
  BaseAbsValueSvg,
  TransformedAbsValueSvg,
  NegativeAbsValueSvg
} from './AbsValueFigures';
import { Split, Compass, Target, Scale, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface AbsValueQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Abszolútérték Alapok és Egyszerű Eltolások (Könnyű)',
    subtitle: 'Alapfüggvény V-alakja, tengelyes szimmetria, egyszerű vízszintes és függőleges eltolások.',
    range: '1 - 10. feladat',
    focus: 'Alapfüggvény és Eltolások',
    questions: [
      {
        id: 'aq1-1',
        questionTypeBadge: 'Alapfüggvény Grafikonja',
        question: 'Milyen alakú az f(x) = |x| abszolútérték-alapfüggvény grafikonja?',
        figure: <BaseAbsValueSvg size={240} />,
        options: [
          'Egy V-alakú törött vonal, amelynek csúcspontja az origóban (0; 0) van',
          'Egy U-alakú sima görbe (parabola)',
          'Egyetlen origón átmenő 45 fokos egyenes',
          'Két különálló hiperbola ág'
        ],
        correctAnswer: 0,
        hint: 'Mivel a negatív számok abszolút értéke is pozitív, a negatív félegyenes tükröződik felfelé, így V-alakot kapunk.',
        explanation: 'Az f(x) = |x| grafikonja két félegyenesből áll: x ≥ 0 esetén y = x, x < 0 esetén y = -x. Ezek a (0; 0) origóban találkoznak V-alakban.'
      },
      {
        id: 'aq1-2',
        questionTypeBadge: 'Értékkészlet Meghatározása',
        question: 'Mi az f(x) = |x| alapfüggvény értékkészlete (R_f)?',
        options: [
          'R_f = [0; +∞[ (csak nemnegatív valós számok)',
          'R_f = ℝ (minden valós szám)',
          'R_f = ]-∞; 0]',
          'R_f = ]0; +∞['
        ],
        correctAnswer: 0,
        hint: 'Lehet-e egy szám abszolút értéke negatív?',
        explanation: 'Mivel az abszolút érték egy pont távolságát méri a nullától, sosem lehet negatív. Legkisebb értéke 0, felső korlátja nincs: R_f = [0; +∞[.'
      },
      {
        id: 'aq1-3',
        questionTypeBadge: 'Szimmetria Tulajdonság',
        question: 'Milyen szimmetriával rendelkezik az f(x) = |x| grafikonja?',
        options: [
          'Tengelyesen szimmetrikus az y tengelyre (páros függvény)',
          'Középpontosan szimmetrikus az origóra (páratlan függvény)',
          'Tengelyesen szimmetrikus az x tengelyre',
          'Nincs semmilyen szimmetriája'
        ],
        correctAnswer: 0,
        hint: '|-x| = |x| minden valós számra.',
        explanation: 'Mivel f(-x) = |-x| = |x| = f(x), az abszolútérték páros függvény, grafikonja tükrös az y tengelyre.'
      },
      {
        id: 'aq1-4',
        questionTypeBadge: 'Vízszintes Eltolás Jobbra',
        question: 'Merre és hány egységgel tolódik el az f(x) = |x - 4| függvény csúcspontja az origóhoz képest?',
        options: [
          '4 egységgel jobbra a pozitív x-tengely mentén: C(4; 0)',
          '4 egységgel balra a negatív x-tengely mentén: C(-4; 0)',
          '4 egységgel lefelé az y tengely mentén: C(0; -4)',
          '4 egységgel felfelé az y tengely mentén: C(0; 4)'
        ],
        correctAnswer: 0,
        hint: 'Hol lesz a belső kifejezés értéke nulla? x - 4 = 0 ➔ x = 4.',
        explanation: 'Az abszolútértékjelek közötti negatív szám ellentétes irányú: x = 4-nél válik a belső kifejezés nullává, így a csúcspont 4 egységgel jobbra tolódik: C(4; 0).'
      },
      {
        id: 'aq1-5',
        questionTypeBadge: 'Vízszintes Eltolás Balra',
        question: 'Hol található az f(x) = |x + 5| függvény csúcspontja?',
        options: [
          'C(-5; 0)',
          'C(5; 0)',
          'C(0; 5)',
          'C(0; -5)'
        ],
        correctAnswer: 0,
        hint: 'x + 5 = 0 ➔ x = -5.',
        explanation: 'Az x + 5 = 0 egyenletből a csúcspont x koordinátája x = -5, y koordinátája 0: C(-5; 0).'
      },
      {
        id: 'aq1-6',
        questionTypeBadge: 'Függőleges Eltolás',
        question: 'Hol található az f(x) = |x| - 3 függvény csúcspontja?',
        options: [
          'C(0; -3)',
          'C(-3; 0)',
          'C(3; 0)',
          'C(0; 3)'
        ],
        correctAnswer: 0,
        hint: 'A -3 az abszolútértékjelen KÍVÜL van, tehát a teljes függvényértéket csökkenti 3-mal.',
        explanation: 'Zárójelen kívüli szám az y-tengely menti függőleges eltolást jelenti. x = 0 esetén y = |0| - 3 = -3, a csúcs tehát C(0; -3).'
      },
      {
        id: 'aq1-7',
        questionTypeBadge: 'Lefelé Nyíló Alak',
        question: 'Melyik függvény grafikonja egy lefelé nyíló fordított V (Λ) alakzat?',
        figure: <NegativeAbsValueSvg size={240} />,
        options: [
          'f(x) = -|x|',
          'f(x) = |x|',
          'f(x) = |-x|',
          'f(x) = |x - 1|'
        ],
        correctAnswer: 0,
        hint: 'Az abszolútértékjel előtti mínusz előjel tükrözi a grafikont az x tengelyre.',
        explanation: 'Az f(x) = -|x| képletben a kimenet mindig nempozitív (≤ 0), így a V-alak lefelé nyílik (Λ-alak).'
      },
      {
        id: 'aq1-8',
        questionTypeBadge: 'Kombinált Eltolás',
        question: 'Hol van az f(x) = |x - 2| + 5 függvény csúcspontja?',
        options: [
          'C(2; 5)',
          'C(-2; 5)',
          'C(2; -5)',
          'C(-2; -5)'
        ],
        correctAnswer: 0,
        hint: 'f(x) = |x - u| + v ➔ C(u; v). Figyelj az u előjelére!',
        explanation: 'u = 2 (2 jobbra) és v = 5 (5 fel), a csúcspont koordinátái: C(2; 5).'
      },
      {
        id: 'aq1-9',
        questionTypeBadge: 'Zérushely Alapfüggvénynél',
        question: 'Hány zérushelye van az f(x) = |x| alapfüggvénynek?',
        options: [
          'Pontosan 1 zérushelye van: x₀ = 0',
          'Kettő zérushelye van: x = 1 és x = -1',
          'Nincs zérushelye',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: '|x| = 0 pontosan akkor teljesül, ha x = 0.',
        explanation: 'Az egyetlen valós szám, amelynek abszolút értéke 0, maga a 0. A grafikon csúcspontja érinti az x tengelyt az origóban.'
      },
      {
        id: 'aq1-10',
        questionTypeBadge: 'Behelyettesítés Számolása',
        question: 'Mennyi az f(x) = 2|x - 3| - 4 függvény értéke az x = 1 helyen?',
        options: ['0', '-4', '4', '-8'],
        correctAnswer: 0,
        hint: 'f(1) = 2 · |1 - 3| - 4 = 2 · |-2| - 4.',
        explanation: 'f(1) = 2 · |-2| - 4 = 2 · 2 - 4 = 4 - 4 = 0. Tehát x = 1 a függvény egyik zérushelye!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Csúcspont C(u; v) és Szélsőértékek (Közepes)',
    subtitle: 'Általános transzformált alak, értékkészlet és szélsőértékek leolvasása, zérushelyek száma.',
    range: '11 - 20. feladat',
    focus: 'Csúcspont, Értékkészlet és Szélsőérték',
    questions: [
      {
        id: 'aq2-1',
        questionTypeBadge: 'Csúcspont és Szélsőérték',
        question: 'Milyen szélsőértéke van az f(x) = |x - 6| - 8 függvénynek, és hol veszi azt fel?',
        figure: <TransformedAbsValueSvg size={240} />,
        options: [
          'Minimuma van az x = 6 helyen, értéke y = -8',
          'Maximuma van az x = 6 helyen, értéke y = -8',
          'Minimuma van az x = -6 helyen, értéke y = 8',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'Mivel a V-alak felfelé nyílik (a = 1 > 0), a csúcspont MINIMUM.',
        explanation: 'A csúcspont C(6; -8). Mivel felfelé nyílik, a legalacsonyabb pont a csúcs: minimum van az x = 6 helyen, a minimum értéke -8.'
      },
      {
        id: 'aq2-2',
        questionTypeBadge: 'Lefelé Nyíló Szélsőértéke',
        question: 'Milyen szélsőértéke van a g(x) = -|x + 2| + 7 függvénynek?',
        options: [
          'Maximuma van az x = -2 helyen, értéke y = 7',
          'Minimuma van az x = -2 helyen, értéke y = 7',
          'Maximuma van az x = 2 helyen, értéke y = 7',
          'Minimuma van az x = 2 helyen, értéke y = -7'
        ],
        correctAnswer: 0,
        hint: 'A negatív előjel miatt lefelé nyílik, így a csúcs MAXIMUM.',
        explanation: 'Csúcspont: C(-2; 7). Mivel a < 0, a grafikon legmagasabb pontja a csúcspont: maximum van az x = -2 helyen, értéke 7.'
      },
      {
        id: 'aq2-3',
        questionTypeBadge: 'Értékkészlet Meghatározása',
        question: 'Mi a g(x) = -|x - 3| + 4 függvény értékkészlete (R_g)?',
        options: [
          'R_g = ]-∞; 4]',
          'R_g = [4; +∞[',
          'R_g = [-4; 4]',
          'R_g = ℝ'
        ],
        correctAnswer: 0,
        hint: 'A grafikon maximuma y = 4, és lefelé a végtelenbe tart.',
        explanation: 'Mivel lefelé nyílik és a legmagasabb pontja 4, a függvény értékei legfeljebb 4-ek lehetnek: R_g = ]-∞; 4].'
      },
      {
        id: 'aq2-4',
        questionTypeBadge: 'Zérushelyek Száma',
        question: 'Hány zérushelye van az f(x) = |x - 1| + 3 függvénynek?',
        options: [
          '0 zérushelye van (nem metszi az x tengelyt)',
          '1 zérushelye van',
          '2 zérushelye van',
          '3 zérushelye van'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont C(1; 3) az x tengely FELETT van, és a grafikon FELFELÉ nyílik.',
        explanation: 'Mivel a minimum értéke 3 > 0 és a V-alak felfelé nyílik, a függvény soha nem érheti el a 0-t, így nincs zérushelye.'
      },
      {
        id: 'aq2-5',
        questionTypeBadge: 'Zérushelyek Száma',
        question: 'Hány zérushelye van a h(x) = |x + 4| - 2 függvénynek?',
        options: [
          'Pontosan 2 zérushelye van',
          '1 zérushelye van',
          '0 zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'A csúcs C(-4; -2) az x tengely alatt van és felfelé nyílik: mindkét szára át kell hogy metssze a tengelyt.',
        explanation: '|x + 4| = 2 egyenletnek két megoldása van: x + 4 = 2 (x = -2) és x + 4 = -2 (x = -6). Tehát 2 zérushelye van.'
      },
      {
        id: 'aq2-6',
        questionTypeBadge: 'Szárak Nyújtása és Zsugorítása',
        question: "Hogyan módosítja az f(x) = 3|x| függvényben a '3'-as szorzó az alapfüggvény alakját?",
        options: [
          'Függőlegesen 3-szorosára nyújtja (a V-alak meredekebb, szűkebb lesz)',
          'Vízszintesen 3 egységgel jobbra tolja',
          'Függőlegesen 3 egységgel feljebb tolja',
          'Laposabbá, szélesebbé teszi a szárakat'
        ],
        correctAnswer: 0,
        hint: 'Ha x = 1, akkor y = 3 (nem 1): a szárak 3-szor meredekebben emelkednek.',
        explanation: 'Az a = 3 > 1 szorzó függőlegesen nyújtja a grafikont: a szárak meredeksége 3 (illetve -3), a V-alak meredekebb és szűkebb.'
      },
      {
        id: 'aq2-7',
        questionTypeBadge: 'Képlet Felírása Grafikonból',
        question: 'Egy abszolútérték-függvény csúcspontja C(-3; -4), szárai felfelé nyílnak normál (1-es) meredekséggel. Mi a képlete?',
        options: [
          'f(x) = |x + 3| - 4',
          'f(x) = |x - 3| - 4',
          'f(x) = |x + 3| + 4',
          'f(x) = -|x + 3| - 4'
        ],
        correctAnswer: 0,
        hint: 'f(x) = |x - u| + v. Ha u = -3, akkor |x - (-3)| = |x + 3|.',
        explanation: 'Behelyettesítve u = -3 és v = -4 értékeket: f(x) = |x - (-3)| + (-4) = |x + 3| - 4.'
      },
      {
        id: 'aq2-8',
        questionTypeBadge: 'Y-tengelymetszet Számítása',
        question: 'Hol metszi az y tengelyt az f(x) = |x - 5| - 2 függvény grafikonja?',
        options: [
          'A (0; 3) pontban',
          'A (0; -2) pontban',
          'A (0; 5) pontban',
          'A (0; -7) pontban'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be x = 0-t: f(0) = |0 - 5| - 2.',
        explanation: 'f(0) = |-5| - 2 = 5 - 2 = 3. Tehát az y-tengelymetszet a (0; 3) pont.'
      },
      {
        id: 'aq2-9',
        questionTypeBadge: 'Monotonitási Intervallumok',
        question: 'Melyik intervallumon szigorúan növekvő az f(x) = |x - 4| + 1 függvény?',
        options: [
          '[4; +∞[',
          ']-∞; 4]',
          '[1; +∞[',
          'A teljes valós számok halmazán (ℝ)'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont x = 4-nél van: a csúcstól jobbra a szár emelkedik.',
        explanation: 'A függvény a csúcspontig (]-∞; 4]) szigorúan csökken, majd a csúcsponttól jobbra ([4; +∞[) szigorúan nő.'
      },
      {
        id: 'aq2-10',
        questionTypeBadge: 'Pontilleszkedés Ellenőrzése',
        question: 'Rajta van-e a P(7; 5) pont az f(x) = 2|x - 3| - 3 függvény grafikonján?',
        options: [
          'Igen, mert f(7) = 2 · |7 - 3| - 3 = 2 · 4 - 3 = 5',
          'Nem, mert a meredekség 2 és nem 5',
          'Nem, mert f(7) = 8 lenne',
          'Csak akkor, ha x negatív'
        ],
        correctAnswer: 0,
        hint: 'f(7) = 2 · |4| - 3 = 8 - 3 = 5.',
        explanation: 'f(7) = 2 · 4 - 3 = 5, ami egyenlő a megadott y értékkel, így a pont rajta van a grafikonon.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Zérushelyek Számítása és Összetett Elemzés (Nehéz)',
    subtitle: 'Zérushelyek algebrai levezetése, metszéspontok egyenesekkel, szakaszonkénti függvényfelírás.',
    range: '21 - 30. feladat',
    focus: 'Zérushelyek Kiszámítása és Metszéspontok',
    questions: [
      {
        id: 'aq3-1',
        questionTypeBadge: 'Zérushelyek Pontos Kiszámítása',
        question: 'Mik az f(x) = |x - 5| - 3 függvény zérushelyei?',
        options: [
          'x₁ = 2 és x₂ = 8',
          'x₁ = -2 és x₂ = 8',
          'x₁ = 5 és x₂ = -3',
          'x₁ = 2 és x₂ = -8'
        ],
        correctAnswer: 0,
        hint: '|x - 5| - 3 = 0 ➔ |x - 5| = 3 ➔ x - 5 = 3 vagy x - 5 = -3.',
        explanation: '|x - 5| = 3. Ebből: 1. x - 5 = 3 ➔ x₂ = 8; 2. x - 5 = -3 ➔ x₁ = 2. A zérushelyek: 2 és 8.'
      },
      {
        id: 'aq3-2',
        questionTypeBadge: 'Zérushelyek Negatív Ágnál',
        question: 'Mik a g(x) = -|x + 2| + 6 függvény zérushelyei?',
        options: [
          'x₁ = -8 és x₂ = 4',
          'x₁ = -4 és x₂ = 8',
          'x₁ = -2 és x₂ = 6',
          'x₁ = 4 és x₂ = 8'
        ],
        correctAnswer: 0,
        hint: '-|x + 2| + 6 = 0 ➔ |x + 2| = 6 ➔ x + 2 = 6 vagy x + 2 = -6.',
        explanation: '|x + 2| = 6 ➔ x + 2 = 6 ➔ x₂ = 4; illetve x + 2 = -6 ➔ x₁ = -8. A zérushelyek: -8 és 4.'
      },
      {
        id: 'aq3-3',
        questionTypeBadge: 'Szakaszonkénti Felírás',
        question: 'Hogyan írható fel az f(x) = |x - 3| + 2 függvény abszolútértékjel nélkül a két tartományon?',
        options: [
          'x ≥ 3 esetén: f(x) = x - 1, míg x < 3 esetén: f(x) = -x + 5',
          'x ≥ 3 esetén: f(x) = x + 5, míg x < 3 esetén: f(x) = -x - 1',
          'Mindenütt f(x) = x + 2',
          'x ≥ 0 esetén f(x) = x - 1'
        ],
        correctAnswer: 0,
        hint: 'Ha x ≥ 3, akkor |x - 3| = x - 3. Ha x < 3, akkor |x - 3| = -(x - 3) = -x + 3.',
        explanation: '1. Ha x ≥ 3: f(x) = (x - 3) + 2 = x - 1. 2. Ha x < 3: f(x) = -(x - 3) + 2 = -x + 3 + 2 = -x + 5.'
      },
      {
        id: 'aq3-4',
        questionTypeBadge: 'Metszéspont Vízszintes Egyenessel',
        question: 'Mely pontokban metszi az f(x) = |x - 1| - 2 függvény az y = 2 vízszintes egyenest?',
        options: [
          '(-3; 2) és (5; 2)',
          '(-1; 2) és (3; 2)',
          '(0; 2) és (4; 2)',
          '(-2; 2) és (2; 2)'
        ],
        correctAnswer: 0,
        hint: '|x - 1| - 2 = 2 ➔ |x - 1| = 4.',
        explanation: '|x - 1| = 4 ➔ x - 1 = 4 ➔ x = 5; és x - 1 = -4 ➔ x = -3. A metszéspontok: (-3; 2) és (5; 2).'
      },
      {
        id: 'aq3-5',
        questionTypeBadge: 'Tengelyekkel Bezárt Terület',
        question: 'Az f(x) = -|x| + 4 függvény grafikonja és az x tengely egy háromszöget zár közre. Mekkora e háromszög területe?',
        options: [
          '16 területegység',
          '32 területegység',
          '8 területegység',
          '24 területegység'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont (0; 4) ➔ magasság m = 4. Zérushelyek: -|x| + 4 = 0 ➔ x = ±4 ➔ az alap hossza 8.',
        explanation: 'A háromszög alapja a két zérushely közötti szakasz: [-4; 4] hossza a = 8. A magasság a csúcs y koordinátája: m = 4. Terület = (8 · 4) / 2 = 16.'
      },
      {
        id: 'aq3-6',
        questionTypeBadge: 'Metszéspont Lineáris Egyenessel',
        question: 'Hány metszéspontja van az f(x) = |x| és a g(x) = x + 2 függvénynek?',
        options: [
          'Pontosan 1 metszéspontja az x = -1 helyen',
          '2 metszéspontja',
          'Nincs metszéspontjuk',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Pozitív x-ekre f(x) = x és g(x) = x + 2 párhuzamosak (nincs metszéspont). Negatív x-ekre -x = x + 2 ➔ 2x = -2.',
        explanation: 'x ≥ 0 esetén x = x + 2 (lehetetlen). x < 0 esetén -x = x + 2 ➔ 2x = -2 ➔ x = -1. f(-1) = 1 és g(-1) = 1. Egyetlen metszéspont van: (-1; 1).'
      },
      {
        id: 'aq3-7',
        questionTypeBadge: 'Abszolútértékes Egyenlet Grafikus Megoldása',
        question: 'A grafikon alapján hány megoldása van a |x - 2| = -1 egyenletnek?',
        options: [
          '0 megoldása van (üres halmaz)',
          '1 megoldása van',
          '2 megoldása van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Az abszolút érték sosem vehet fel negatív (-1) értéket.',
        explanation: 'Mivel |x - 2| ≥ 0 minden valós számra, sosem lehet egyenlő -1-gyel. A két grafikon (a V-alak és az y = -1 egyenes) nem metszi egymást.'
      },
      {
        id: 'aq3-8',
        questionTypeBadge: 'Zérushelyek Távolsága',
        question: 'Mekkora a távolság az f(x) = 2|x - 1| - 8 függvény két zérushelye között a számegyenesen?',
        options: ['8 egység', '4 egység', '16 egység', '6 egység'],
        correctAnswer: 0,
        hint: '2|x - 1| = 8 ➔ |x - 1| = 4 ➔ x₁ = -3, x₂ = 5.',
        explanation: '|x - 1| = 4 ➔ x₁ = -3, x₂ = 5. A távolság: 5 - (-3) = 8 egység.'
      },
      {
        id: 'aq3-9',
        questionTypeBadge: 'Paraméter Meghatározása',
        question: "Mekkora 'v' értéke, ha az f(x) = |x - 3| + v függvény átmegy a P(7; 1) ponton?",
        options: ['v = -3', 'v = 3', 'v = -5', 'v = 5'],
        correctAnswer: 0,
        hint: '1 = |7 - 3| + v ➔ 1 = 4 + v.',
        explanation: '1 = |7 - 3| + v ➔ 1 = 4 + v ➔ v = 1 - 4 = -3. A függvény: f(x) = |x - 3| - 3.'
      },
      {
        id: 'aq3-10',
        questionTypeBadge: 'Abszolútérték Belsejében Szorzó',
        question: 'Miben különbözik az f(x) = |2x - 6| függvény grafikonja az f(x) = 2|x - 3| függvényétől?',
        options: [
          'Teljesen azonosak, mert |2x - 6| = |2(x - 3)| = 2|x - 3|',
          'A |2x - 6| csúcspontja a (6; 0) helyen van',
          'A |2x - 6| meredeksége 1',
          'Az egyik felfelé, a másik lefelé nyílik'
        ],
        correctAnswer: 0,
        hint: 'Kiemelheted a 2-t az abszolútértékből: |2 · (x - 3)| = |2| · |x - 3|.',
        explanation: 'A szorzás tulajdonsága miatt |a · b| = |a| · |b|. Mivel |2| = 2, így |2x - 6| = 2|x - 3|, a két kifejezés matematikailag és grafikusan is pontosan megegyezik.'
      }
    ]
  }
};

const absValueCheatSheets: CheatSheetCard[] = [
  {
    title: 'Alapfüggvény: f(x) = |x|',
    category: 'Alapfogalom',
    icon: <Split className="w-5 h-5 text-rose-600" />,
    color: 'border-rose-200 bg-rose-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>• <strong>Grafikon:</strong> V-alakú törött vonal, csúcspontja <code>C(0; 0)</code>.</p>
        <p>• <strong>Szárak:</strong> Jobbra <code>y = x</code>, balra <code>y = -x</code>.</p>
        <p>• <strong>Szimmetria:</strong> Páros függvény (tükrös az y tengelyre).</p>
        <p>• <strong>Tartomány és készlet:</strong> D_f = ℝ, R_f = [0; +∞[.</p>
      </div>
    )
  },
  {
    title: 'Transzformációk: a·|x - u| + v',
    category: 'Szabály',
    icon: <Compass className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>• <strong>Csúcspont:</strong> <code>C(u; v)</code></p>
        <p>• <strong>u (zárójelen belüli):</strong> ellentétes előjel! <code>|x - 3|</code> ➔ 3 jobbra!</p>
        <p>• <strong>v (zárójelen kívüli):</strong> <code>+v</code> fel, <code>-v</code> le.</p>
        <p>• <strong>a &gt; 0:</strong> Felfelé nyíló V (minimum).</p>
        <p>• <strong>a &lt; 0:</strong> Lefelé nyíló Λ (maximum).</p>
      </div>
    )
  },
  {
    title: 'Szélsőérték és Értékkészlet',
    category: 'Elemzés',
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Ha a &gt; 0 (felfelé nyílik):</strong></p>
        <p>Minimum az <code>x = u</code> helyen, értéke <code>y = v</code> ➔ <strong>R_f = [v; +∞[</strong></p>
        <p><strong>Ha a &lt; 0 (lefelé nyílik):</strong></p>
        <p>Maximum az <code>x = u</code> helyen, értéke <code>y = v</code> ➔ <strong>R_f = ]-∞; v]</strong></p>
      </div>
    )
  },
  {
    title: 'Zérushelyek Száma',
    category: 'Algebra',
    icon: <Target className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>Oldd meg: <code>a|x - u| + v = 0 ➔ |x - u| = -v / a</code></p>
        <p>• <strong>Ha -v/a &gt; 0:</strong> 2 zérushely (metszi a tengelyt).</p>
        <p>• <strong>Ha v = 0:</strong> 1 zérushely (érinti a csúcspont: x₀ = u).</p>
        <p>• <strong>Ha -v/a &lt; 0:</strong> 0 zérushely (nem éri el a tengelyt).</p>
      </div>
    )
  }
];

export const AbsValueQuiz: React.FC<AbsValueQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="10. Abszolútérték-függvény"
      subtitle="Gyakorold az f(x) = a|x - u| + v függvények ábrázolását, a csúcspontok és zérushelyek meghatározását!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={absValueCheatSheets}
      topicId="abszoluterteek-fuggveny"
      topicTitle="Abszolútérték-függvény"
      activityType="g9-func-abszolut-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={AbsValueMatcher}
      sorterComponent={AbsValueSorter}
    />
  );
};

