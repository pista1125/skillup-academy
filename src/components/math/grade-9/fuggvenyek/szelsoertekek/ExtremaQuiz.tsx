import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ExtremaMatcher } from './ExtremaMatcher';
import { ExtremaSorter } from './ExtremaSorter';
import {
  ExtremaConceptSvg,
  VertexFormulaSvg,
  IntervalExtremaSvg
} from './ExtremaFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export interface ExtremaQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Szélsőérték Alapfogalmak (Könnyű)',
    subtitle: 'A hely és érték megkülönböztetése, leolvasás ábráról és alapvető tulajdonságok.',
    range: '1 - 10. feladat',
    focus: 'Hely (x) vs. Érték (y)',
    questions: [
      {
        id: 'eq1-1',
        questionTypeBadge: 'Fogalmi Alapok',
        question: 'Mit jelent a függvény szélsőértékének HELYE a koordináta-rendszerben?',
        figure: <ExtremaConceptSvg size={240} />,
        options: [
          'Az x-tengely azon pontja (x₀), ahol a legkisebb vagy legnagyobb érték előáll',
          'Az y-tengelyen felvett minimális vagy maximális magasság',
          'A koordinátatengelyek metszéspontja, azaz az origó (0; 0)',
          'A függvény meredeksége a csúcspontban'
        ],
        correctAnswer: 0,
        hint: 'A hely mindig a bemeneti változóra, azaz az x tengelyre vonatkozik.',
        explanation: 'A szélsőérték HELYE mindig az értelmezési tartomány eleme (x₀ ∈ D_f), azaz az x koordináta, ahol a minimum vagy maximum bekövetkezik.'
      },
      {
        id: 'eq1-2',
        questionTypeBadge: 'Érték Fogalma',
        question: 'Mit jelent a függvény szélsőértékének ÉRTÉKE?',
        options: [
          'Az y-tengely azon értéke (y₀ = f(x₀)), ami a felvett legkisebb vagy legnagyobb függvényérték',
          'A függvény zérushelye, ahol y = 0',
          'Az értelmezési tartomány jobb oldali végpontja',
          'Az x-tengelyen lévő bemeneti szám'
        ],
        correctAnswer: 0,
        hint: 'A kérdés: „Mennyi a függvény értéke ott?”. Ez a magasság az y tengelyen.',
        explanation: 'A szélsőérték ÉRTÉKE az értékkészlet eleme (y₀ ∈ R_f), azaz a helyettesítési érték magassága: y₀ = f(x₀).'
      },
      {
        id: 'eq1-3',
        questionTypeBadge: 'Leolvasás Grafikonról',
        question: 'Egy parabola csúcspontja (völgye) a koordináta-rendszerben a C(3; -5) pont. Mi a függvény minimumának helye és értéke?',
        options: [
          'Minimum helye: x = 3, minimum értéke: y = -5',
          'Minimum helye: x = -5, minimum értéke: y = 3',
          'Maximum helye: x = 3, maximum értéke: y = -5',
          'Csak értéke van: -5, helye nincs'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont koordinátái: (x; y) = (hely; érték).',
        explanation: 'A csúcspont C(x; y) = (3; -5). Völgy esetén ez minimum, tehát a minimum helye x = 3, értéke y = -5.'
      },
      {
        id: 'eq1-4',
        questionTypeBadge: 'Szélsőérték Típusa',
        question: 'Egy felfelé nyíló parabolának (f(x) = x² - 4) milyen szélsőértéke van a teljes valós számok (ℝ) halmazán?',
        options: [
          'Csak minimuma van (alulról korlátos), maximuma nincs',
          'Csak maximuma van, minimuma nincs',
          'Minimuma és maximuma is van',
          'Egyik szélsőértéke sincs'
        ],
        correctAnswer: 0,
        hint: 'Felfelé mindkét ága a végtelenbe tart, de lefelé a csúcsánál nem megy lejjebb.',
        explanation: 'Mivel x² ≥ 0, a legkisebb értéke x = 0-nál -4. Felfelé a végtelenbe nyúlik, ezért globális maximuma nincs.'
      },
      {
        id: 'eq1-5',
        questionTypeBadge: 'Abszolútérték Csúcs',
        question: 'A g(x) = -|x| + 3 függvény grafikonja egy lefelé nyíló V-alak. Milyen szélsőértéke van ℝ-en?',
        options: [
          'Maximuma van az x = 0 helyen, értéke y = 3',
          'Minimuma van az x = 0 helyen, értéke y = 3',
          'Maximuma van az x = 3 helyen, értéke y = 0',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'Mivel -|x| ≤ 0, a legnagyobb érték 0-nál áll elő: 0 + 3 = 3.',
        explanation: 'A -|x| tag sosem pozitív, legnagyobb értéke 0 (ha x = 0). Így a felvett maximális érték 3, ami az x = 0 helyen van.'
      },
      {
        id: 'eq1-6',
        questionTypeBadge: 'Lineáris Függvény',
        question: 'Lehet-e globális szélsőértéke a ferde egyenesnek, például f(x) = 2x + 1-nek a teljes ℝ halmazon?',
        options: [
          'Nem, mert mindkét irányban korlátlanul tart -∞-be és +∞-be',
          'Igen, a minimuma a zérushelyénél van',
          'Igen, a maximuma a tengelymetszetnél (y = 1) van',
          'Igen, az origóban van szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'Egy ferde egyenesnek van-e legmagasabb vagy legalacsonyabb pontja a síkon?',
        explanation: 'A nem konstans egyenesek nem korlátosak sem alulról, sem felülről, így a teljes valós számhalmazon nincs szélsőértékük.'
      },
      {
        id: 'eq1-7',
        questionTypeBadge: 'Konstans Függvény',
        question: 'Ha c(x) = 5 minden x ∈ ℝ esetén, akkor mi mondható a szélsőértékéről?',
        options: [
          'Minden pontjában egyszerre minimuma és maximuma is van, értéke 5',
          'Csak minimuma van: 5',
          'Csak maximuma van: 5',
          'Konstans függvénynek soha nincs szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'Mivel c(x) ≥ 5 és c(x) ≤ 5 is minden x-re teljesül, mindkét definíciónak eleget tesz.',
        explanation: 'A konstans függvény minden x pontban felveszi a legkisebb (5) és a legnagyobb (5) értékét is, tehát minden pontban minimuma és maximuma is van.'
      },
      {
        id: 'eq1-8',
        questionTypeBadge: 'Minimum Definíció',
        question: 'Melyik reláció írja le precízen, hogy a függvénynek az x₀ helyen globális minimuma van?',
        options: [
          'Minden x ∈ D_f esetén f(x) ≥ f(x₀)',
          'Minden x ∈ D_f esetén f(x) ≤ f(x₀)',
          'Minden x ∈ D_f esetén f(x) > 0',
          'f(x₀) = 0'
        ],
        correctAnswer: 0,
        hint: 'Minimum esetén semmilyen más függvényérték nem lehet kisebb, mint az f(x₀).',
        explanation: 'A globális minimum definíciója: minden x ∈ D_f-re f(x) ≥ f(x₀), azaz f(x₀) a lehető legkisebb felvett érték.'
      },
      {
        id: 'eq1-9',
        questionTypeBadge: 'Maximum Definíció',
        question: 'Melyik reláció írja le precízen, hogy a függvénynek az x₀ helyen globális maximuma van?',
        options: [
          'Minden x ∈ D_f esetén f(x) ≤ f(x₀)',
          'Minden x ∈ D_f esetén f(x) ≥ f(x₀)',
          'Minden x ∈ D_f esetén f(x) < 0',
          'f(x₀) = 1'
        ],
        correctAnswer: 0,
        hint: 'Maximum esetén minden más érték legfeljebb akkora lehet, mint f(x₀).',
        explanation: 'A globális maximum definíciója: minden x ∈ D_f esetén f(x) ≤ f(x₀).'
      },
      {
        id: 'eq1-10',
        questionTypeBadge: 'Valós Alkalmazás',
        question: 'Egy kiránduló tengerszint feletti magasságát az idő függvényében h(t) adja meg. Mit jelent a maximum helye (t_max) és értéke (h_max)?',
        options: [
          'A hely (t_max) az az időpont, amikor a csúcson volt; az érték (h_max) a hegycsúcs tengerszint feletti magassága méterben',
          'A hely a hegy magassága, az érték pedig a túra időtartama',
          'A hely a megtett távolság km-ben, az érték pedig a kalória-felhasználás',
          'Mindkettő a túra végének időpontját jelöli'
        ],
        correctAnswer: 0,
        hint: 'A bemenet (t) az idő (hely), a kimenet (h) a magasság (érték).',
        explanation: 'A független változó (t) az idő (helye: hány órakor), a függő változó (h) a magasság (értéke: milyen magasan volt).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Csúcsponti Alak és Algebrai Számítások (Közepes)',
    subtitle: 'Négyzetes és abszolútértékes hozzárendelések szélsőértékeinek pontos algebrai meghatározása.',
    range: '11 - 20. feladat',
    focus: 'Csúcspont: C(u; v)',
    questions: [
      {
        id: 'eq2-1',
        questionTypeBadge: 'Csúcsponti Alak',
        question: 'Mi a szélsőértéke az f(x) = (x - 4)² + 7 függvénynek a valós számok halmazán?',
        figure: <VertexFormulaSvg size={240} />,
        options: [
          'Minimuma van az x = 4 helyen, értéke y = 7',
          'Maximuma van az x = 4 helyen, értéke y = 7',
          'Minimuma van az x = -4 helyen, értéke y = 7',
          'Minimuma van az x = 7 helyen, értéke y = 4'
        ],
        correctAnswer: 0,
        hint: 'A zárójel (x - 4)² ≥ 0, legkisebb értéke 0, ha x = 4.',
        explanation: 'Mivel (x - 4)² ≥ 0, a minimum akkor áll elő, amikor x - 4 = 0 ⟹ x = 4. Ekkor f(4) = 0 + 7 = 7.'
      },
      {
        id: 'eq2-2',
        questionTypeBadge: 'Lefelé Nyíló Parabola',
        question: 'Mi a szélsőértéke a g(x) = -(x + 3)² + 10 függvénynek?',
        options: [
          'Maximuma van az x = -3 helyen, értéke y = 10',
          'Minimuma van az x = -3 helyen, értéke y = 10',
          'Maximuma van az x = 3 helyen, értéke y = 10',
          'Maximuma van az x = 10 helyen, értéke y = -3'
        ],
        correctAnswer: 0,
        hint: 'A negatív előjel miatt -(x + 3)² ≤ 0, így maximum van a zárójel 0-vá válásakor.',
        explanation: 'A -(x + 3)² tag legfeljebb 0 lehet, amit x = -3-nál ér el. A felvett maximális érték 10.'
      },
      {
        id: 'eq2-3',
        questionTypeBadge: 'Abszolútérték Völgy',
        question: 'Milyen szélsőértéke van a h(x) = 3|x - 5| - 2 függvénynek?',
        options: [
          'Minimuma van az x = 5 helyen, értéke y = -2',
          'Maximuma van az x = 5 helyen, értéke y = -2',
          'Minimuma van az x = -5 helyen, értéke y = -2',
          'Minimuma van az x = 5 helyen, értéke y = 3'
        ],
        correctAnswer: 0,
        hint: 'Az abszolútérték legkisebb értéke 0, amikor x = 5.',
        explanation: 'A 3|x - 5| tag minimális értéke 0, ha x = 5. Ekkor h(5) = 0 - 2 = -2. Ez globális minimum.'
      },
      {
        id: 'eq2-4',
        questionTypeBadge: 'Abszolútérték Csúcs',
        question: 'Milyen szélsőértéke van a p(x) = -2|x + 1| + 8 függvénynek?',
        options: [
          'Maximuma van az x = -1 helyen, értéke y = 8',
          'Minimuma van az x = -1 helyen, értéke y = 8',
          'Maximuma van az x = 1 helyen, értéke y = 8',
          'Maximuma van az x = 8 helyen, értéke y = -1'
        ],
        correctAnswer: 0,
        hint: 'A -2|x + 1| nempozitív (≤ 0), legnagyobb értéke 0, ha x = -1.',
        explanation: 'A kifejezés x = -1-ben éri el legnagyobb értékét: p(-1) = 0 + 8 = 8, lefelé nyíló V-alak.'
      },
      {
        id: 'eq2-5',
        questionTypeBadge: 'Teljes Négyzetté Alakítás',
        question: 'Határozd meg az f(x) = x² - 6x + 14 függvény szélsőértékét!',
        options: [
          'Minimuma van az x = 3 helyen, értéke y = 5',
          'Maximuma van az x = 3 helyen, értéke y = 5',
          'Minimuma van az x = -3 helyen, értéke y = 14',
          'Minimuma van az x = 6 helyen, értéke y = 14'
        ],
        correctAnswer: 0,
        hint: 'x² - 6x + 14 = (x - 3)² - 9 + 14 = (x - 3)² + 5.',
        explanation: 'Teljes négyzetté alakítva: x² - 6x + 14 = (x - 3)² - 9 + 14 = (x - 3)² + 5. Mivel a négyzet nemnegatív, minimum van x = 3-ban, értéke 5.'
      },
      {
        id: 'eq2-6',
        questionTypeBadge: 'Negatív Négyzetes Alakítás',
        question: 'Határozd meg az f(x) = -x² + 8x - 11 függvény szélsőértékét!',
        options: [
          'Maximuma van az x = 4 helyen, értéke y = 5',
          'Minimuma van az x = 4 helyen, értéke y = 5',
          'Maximuma van az x = -4 helyen, értéke y = 5',
          'Maximuma van az x = 4 helyen, értéke y = -11'
        ],
        correctAnswer: 0,
        hint: '-x² + 8x - 11 = -(x² - 8x) - 11 = -((x - 4)² - 16) - 11 = -(x - 4)² + 5.',
        explanation: '-(x² - 8x) - 11 = -((x - 4)² - 16) - 11 = -(x - 4)² + 5. Lefelé nyíló parabola: maximuma van x = 4 helyen, értéke 5.'
      },
      {
        id: 'eq2-7',
        questionTypeBadge: 'Belső Szorzó',
        question: 'Mennyi a k(x) = (2x - 6)² + 3 függvény minimumának HELYE?',
        options: [
          'x = 3',
          'x = 6',
          'x = 2',
          'x = -3'
        ],
        correctAnswer: 0,
        hint: 'Mikor lesz a négyzet alapja 0? Oldd meg a 2x - 6 = 0 egyenletet!',
        explanation: 'A négyzetes tag minimális értéke 0, ha a belső kifejezés 0: 2x - 6 = 0 ⟹ 2x = 6 ⟹ x = 3.'
      },
      {
        id: 'eq2-8',
        questionTypeBadge: 'Értékkészletből Következtetés',
        question: 'Egy másodfokú függvény értékkészlete R_f = ]-∞; 9]. Mi következik ebből a szélsőértékére vonatkozóan?',
        options: [
          'Van globális maximuma, melynek értéke y = 9 (minimuma nincs)',
          'Van globális minimuma, melynek értéke y = 9 (maximuma nincs)',
          'Mindkét szélsőértéke létezik',
          'Egyik szélsőértéke sem létezik'
        ],
        correctAnswer: 0,
        hint: 'A halmaz felülről zárt 9-nél, alulról végtelenbe nyitott.',
        explanation: 'Az értékkészlet legfelső eleme 9, tehát a felvett maximális érték 9. Alulról -∞-ig tart, így minimum nincs.'
      },
      {
        id: 'eq2-9',
        questionTypeBadge: 'Értékkészlet Minimum',
        question: 'Egy abszolútérték-függvény értékkészlete R_f = [-4; ∞[. Mi állítható biztosan a szélsőértékéről?',
        options: [
          'Van globális minimuma, melynek értéke y = -4 (maximuma nincs)',
          'Van globális maximuma, értéke y = -4',
          'A minimum helye biztosan x = -4',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'Az alsó határ -4, ez a legkisebb felvett y érték.',
        explanation: 'A tartomány legkisebb értéke -4, ezért globális minimuma y = -4. Felfelé korlátlan, így maximuma nincs.'
      },
      {
        id: 'eq2-10',
        questionTypeBadge: 'Képlet Rekonstrukció',
        question: 'Melyik függvénynek van MAXIMUMA az x = 2 helyen y = 6 értékkel?',
        options: [
          'f(x) = -(x - 2)² + 6',
          'f(x) = (x - 2)² + 6',
          'f(x) = -(x + 2)² + 6',
          'f(x) = -|x - 6| + 2'
        ],
        correctAnswer: 0,
        hint: 'Maximumhoz negatív előjelű négyzet kell: -(x - u)² + v, ahol u = 2 és v = 6.',
        explanation: 'A csúcspont C(2; 6) és lefelé nyílik (maximum): f(x) = -(x - 2)² + 6. Ekkor f(2) = 6 és x ≠ 2 esetén f(x) < 6.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Intervallumok és Szöveges Optimalizálás (Nehéz)',
    subtitle: 'Zárt szakaszon vett szélsőértékek és mindennapi optimalizálási feladatok megoldása.',
    range: '21 - 30. feladat',
    focus: 'Korlátos Szakaszok & Szöveges Feladatok',
    questions: [
      {
        id: 'eq3-1',
        questionTypeBadge: 'Intervallumos Lineáris',
        question: 'Mi a szélsőértéke az f(x) = 3x - 4 lineáris függvénynek a [-2; 3] zárt intervallumon?',
        figure: <IntervalExtremaSvg size={240} />,
        options: [
          'Minimuma az x = -2-nél y = -10; Maximuma az x = 3-nál y = 5',
          'Minimuma az x = 3-nál y = 5; Maximuma az x = -2-nél y = -10',
          'Csak minimuma van: y = -10',
          'Zárt szakaszon sem lehet szélsőértéke lineáris függvénynek'
        ],
        correctAnswer: 0,
        hint: 'Mivel szigorúan növekvő függvényről van szó, a bal végpontban veszi fel a legkisebb, a jobb végpontban a legnagyobb értéket.',
        explanation: 'f(-2) = 3(-2) - 4 = -10 (globális minimum a szakaszon), f(3) = 3(3) - 4 = 5 (globális maximum a szakaszon).'
      },
      {
        id: 'eq3-2',
        questionTypeBadge: 'Csökkenő Egyenes Zárt Szakaszon',
        question: 'Mi a szélsőértéke a g(x) = -2x + 7 függvénynek az x ∈ [1; 4] szakaszon?',
        options: [
          'Minimuma az x = 4-nél y = -1; Maximuma az x = 1-nél y = 5',
          'Minimuma az x = 1-nél y = 5; Maximuma az x = 4-nél y = -1',
          'Minimuma y = 0, maximuma y = 7',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        hint: 'A negatív meredekség miatt szigorúan csökken: a bal végpont a legmagasabb, a jobb végpont a legalacsonyabb.',
        explanation: 'g(1) = -2(1) + 7 = 5 (maximum az x = 1 helyen), g(4) = -2(4) + 7 = -1 (minimum az x = 4 helyen).'
      },
      {
        id: 'eq3-3',
        questionTypeBadge: 'Belső Csúcs + Végpont',
        question: 'Határozd meg az f(x) = (x - 3)² + 1 függvény szélsőértékeit a [0; 5] zárt intervallumon!',
        options: [
          'Minimuma a belső csúcsponton (x = 3) y = 1; maximuma a bal végponton (x = 0) y = 10',
          'Minimuma x = 0-nál y = 10; maximuma x = 5-nél y = 5',
          'Csak minimuma van: y = 1',
          'Minimuma x = 3-nál y = 1; maximuma x = 5-nél y = 5'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont x = 3 benne van [0; 5]-ben (y = 1). A végpontok: f(0) = (0-3)²+1 = 10, f(5) = (5-3)²+1 = 5. Hasonlítsd össze!',
        explanation: 'A belső csúcs x = 3-ban f(3) = 1 (ez a minimum). A végpontok: f(0) = 10 és f(5) = 5. A legnagyobb érték a 10, tehát a maximum x = 0-nál 10.'
      },
      {
        id: 'eq3-4',
        questionTypeBadge: 'Kívül Eső Csúcspont',
        question: 'Határozd meg az f(x) = (x - 1)² + 2 szélsőértékeit a [2; 5] intervallumon!',
        options: [
          'Minimuma a bal végponton (x = 2) y = 3; maximuma a jobb végponton (x = 5) y = 18',
          'Minimuma a csúcsponton (x = 1) y = 2; maximuma x = 5-nél y = 18',
          'Minimuma x = 2-nél y = 2; maximuma x = 5-nél y = 18',
          'Nincs szélsőértéke ezen az intervallumon'
        ],
        correctAnswer: 0,
        hint: 'A parabola csúcsa x = 1-ben van, de ez NINCS benne a [2; 5] intervallumban! A [2; 5] szakaszon a függvény szigorúan nő.',
        explanation: 'Mivel 1 ∉ [2; 5], a függvény ezen a szakaszon szigorúan monoton növekvő: min = f(2) = (2-1)² + 2 = 3, max = f(5) = (5-1)² + 2 = 18.'
      },
      {
        id: 'eq3-5',
        questionTypeBadge: 'Fizikai Hajítás',
        question: 'Függőlegesen felhajított kő magasságát a h(t) = -5t² + 20t képlet írja le (t másodperc, h méter). Hány másodperc múlva és milyen magasan van a kő pályájának legmagasabb pontja?',
        options: [
          't = 2 másodperc múlva éri el a maximális 20 méter magasságot',
          't = 4 másodperc múlva éri el a maximális 20 méter magasságot',
          't = 2 másodperc múlva éri el a maximális 40 méter magasságot',
          't = 20 másodperc múlva éri el a 5 métert'
        ],
        correctAnswer: 0,
        hint: 'Alakítsd teljes négyzetté: -5(t² - 4t) = -5((t - 2)² - 4) = -5(t - 2)² + 20.',
        explanation: 'h(t) = -5(t - 2)² + 20. A hegycsúcs t = 2 másodpercnél alakul ki, a maximális magasság 20 méter.'
      },
      {
        id: 'eq3-6',
        questionTypeBadge: 'Terület-optimalizálás',
        question: 'Egy téglalap kerülete 24 cm. Területét az egyik oldal (x) függvényében a T(x) = x(12 - x) = -x² + 12x adja meg. Milyen x esetén lesz maximális a terület, és mennyi ez a maximum?',
        options: [
          'x = 6 cm (négyzet esetén), a maximális terület 36 cm²',
          'x = 12 cm esetén a maximális terület 144 cm²',
          'x = 4 cm esetén a maximális terület 32 cm²',
          'x = 6 cm esetén a maximális terület 24 cm²'
        ],
        correctAnswer: 0,
        hint: '-x² + 12x = -(x - 6)² + 36. A csúcs x = 6-ban van.',
        explanation: 'T(x) = -(x - 6)² + 36. A maximális terület 36 cm², ami x = 6 cm oldalhossznál (azaz négyzetnél) áll elő.'
      },
      {
        id: 'eq3-7',
        questionTypeBadge: 'Két Abszolútérték Összege',
        question: 'Mi az f(x) = |x - 2| + |x - 6| függvény minimumának értéke?',
        options: [
          'Minimum értéke 4, amit a [2; 6] zárt szakasz minden pontjában felvesz',
          'Minimum értéke 0 az x = 4 helyen',
          'Minimum értéke 2 az x = 2 helyen',
          'Nincs minimuma'
        ],
        correctAnswer: 0,
        hint: '|x - 2| + |x - 6| a számegyenesen a 2-től és 6-tól vett távolságok összege. A kettő közötti szakaszon ez állandó!',
        explanation: 'Geometriailag: a 2 és 6 közötti bármely x számra a távolságok összege pontosan a két pont távolsága: 6 - 2 = 4. Tehát a minimum értéke 4, a [2; 6] szakaszon végig.'
      },
      {
        id: 'eq3-8',
        questionTypeBadge: 'Nyílt Intervallum Csapda',
        question: 'Milyen szélsőértéke van az f(x) = x² függvénynek a ]0; 3[ nyílt intervallumon?',
        options: [
          'Nincs sem minimuma, sem maximuma (mert a határok nincsenek a tartományban)',
          'Minimuma 0, maximuma 9',
          'Csak minimuma van: 0',
          'Csak maximuma van: 9'
        ],
        correctAnswer: 0,
        hint: 'A 0 és a 3 NEM eleme a nyílt intervallumnak! Létezik-e legkisebb pozitív szám?',
        explanation: 'A nyílt ]0; 3[ intervallumban az x = 0 nincs benne, és nincs legkisebb pozitív szám sem (mindig lehet közelebb menni 0-hoz). Így sem minimuma, sem maximuma nem létezik.'
      },
      {
        id: 'eq3-9',
        questionTypeBadge: 'Közgazdasági Profit',
        question: 'Egy termék eladásából származó napi nyereséget a P(p) = -2(p - 500)² + 180 000 adja meg, ahol p a termék forintos eladási ára. Milyen ár garantálja a maximális napi nyereséget, és mekkora ez az összeg?',
        options: [
          'p = 500 Ft eladási ár mellett a maximális profit 180 000 Ft',
          'p = 180 000 Ft ár mellett a profit 500 Ft',
          'p = 250 Ft ár mellett a profit 90 000 Ft',
          'p = 500 Ft ár mellett a profit 0 Ft'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont C(500; 180 000). A -2 együttható miatt ez maximum!',
        explanation: 'A -2(p - 500)² ≤ 0 tag legnagyobb értéke 0, amikor p = 500 Ft. Ekkor a maximális napi profit 180 000 Ft.'
      },
      {
        id: 'eq3-10',
        questionTypeBadge: 'Abszolútérték Szakaszon',
        question: 'Határozd meg az f(x) = -|x + 2| + 3 függvény szélsőértékeit a [-5; 1] zárt szakaszon!',
        options: [
          'Maximuma az x = -2 helyen y = 3; minimuma az x = -5 helyen y = 0',
          'Maximuma x = 1-nél y = 3; minimuma x = -5-nél y = 0',
          'Csak maximuma van: y = 3',
          'Minimuma y = -2, maximuma y = 3'
        ],
        correctAnswer: 0,
        hint: 'A csúcs x = -2 (benne van a szakaszban), értéke 3. Végpontok: f(-5) = -|-3|+3 = 0, f(1) = -|3|+3 = 0.',
        explanation: 'A csúcspont x = -2-ben f(-2) = 3 (globális maximum). Mindkét végponton f(-5) = 0 és f(1) = 0 (globális minimum).'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Hely (x) vs. Érték (y)',
    icon: <BookOpen className="w-5 h-5 text-teal-400" />,
    color: 'teal',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong className="text-teal-300">Hely (x₀):</strong> Az x-tengely eleme, ahol a szélsőérték bekövetkezik (pl. <em>x = 3</em>).</p>
        <p><strong className="text-emerald-300">Érték (y₀):</strong> A felvett magasság az y-tengelyen: <em>y = f(x₀)</em>.</p>
        <p className="text-slate-400">Válaszadáskor soha ne keverd össze a koordinátákat!</p>
      </div>
    )
  },
  {
    title: 'Csúcsponti Alak C(u; v)',
    icon: <Target className="w-5 h-5 text-sky-400" />,
    color: 'sky',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>f(x) = a(x - u)² + v</strong> vagy <strong>a|x - u| + v</strong></p>
        <p><span className="text-emerald-400 font-semibold">Ha a &gt; 0:</span> Völgy ⟹ MINIMUM helye <em>x = u</em>, értéke <em>y = v</em>.</p>
        <p><span className="text-rose-400 font-semibold">Ha a &lt; 0:</span> Csúcs ⟹ MAXIMUM helye <em>x = u</em>, értéke <em>y = v</em>.</p>
      </div>
    )
  },
  {
    title: 'Zárt Intervallum [a; b]',
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    color: 'purple',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p>1. Ellenőrizd a belső csúcspontot (ha az intervallumba esik)!</p>
        <p>2. Számold ki a végpontok értékét: <em>f(a)</em> és <em>f(b)</em>!</p>
        <p>3. A legkisebb érték a globális minimum, a legnagyobb a maximum.</p>
      </div>
    )
  },
  {
    title: 'Tipikus Vizsgacsapdák',
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong className="text-rose-400">Lineáris ℝ-en:</strong> Nincs se min, se max!</p>
        <p><strong className="text-amber-400">Nyílt intervallum ]a; b[:</strong> Ha a csúcs nem esik bele, a határoknál nincs szélsőérték!</p>
      </div>
    )
  }
];

export const ExtremaQuiz: React.FC<ExtremaQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="szelsoertekek"
      badgeLabel="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="Függvények Szélsőértékei Kvíz"
      subtitle="30 válogatott feladat 3 szinten: a hely és érték leolvasásától kezdve az algebrai teljes négyzeteken át a zárt intervallumos és szöveges szélsőérték-feladatokig."
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        onSwitchToMatcher ? (
          <ExtremaMatcher
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToSorter={onSwitchToSorter}
          />
        ) : undefined
      }
      sorterComponent={
        onSwitchToSorter ? (
          <ExtremaSorter
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToMatcher={onSwitchToMatcher}
          />
        ) : undefined
      }
    />
  );
};

