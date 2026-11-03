import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { InequalityMatcher } from './InequalityMatcher';
import { InequalitySorter } from './InequalitySorter';
import {
  AboveBelowConceptSvg,
  IntervalBracketsSvg,
  AbsDistanceInequalitySvg
} from './InequalityFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export interface InequalityQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Grafikus Egyenlőtlenség Alapok (Könnyű)',
    subtitle: 'A „melyik van felül” elv, nyílt és zárt zárójelek, abszolútérték a számegyenesen.',
    range: '1 - 10. feladat',
    focus: 'Grafikus Értelmezés & Zárójelek',
    questions: [
      {
        id: 'iq1-1',
        questionTypeBadge: 'Grafikus Jelentés',
        question: 'Mit jelent geometriailag az f(x) > g(x) egyenlőtlenség a koordináta-rendszerben?',
        figure: <AboveBelowConceptSvg size={240} />,
        options: [
          'Azon x értékek halmazát, ahol az f(x) grafikonja a g(x) grafikonja FELETT halad',
          'Azon pontokat, ahol a két görbe metszi egymást',
          'Ahol mindkét függvény pozitív értéket vesz fel',
          'Ahol a görbék meredeksége pozitív'
        ],
        correctAnswer: 0,
        hint: 'f(x) > g(x) azt jelenti, hogy az f pontjainak y-magassága nagyobb a g megfelelő magasságánál.',
        explanation: 'Az f(x) > g(x) egyenlőtlenség megoldása azon x bemenetek halmaza, ahol az f(x) görbéje a g(x) görbéje felett helyezkedik el.'
      },
      {
        id: 'iq1-2',
        questionTypeBadge: 'Szigorú Reláció',
        question: 'Milyen zárójelet és jelölést használunk a számegyenesen szigorú egyenlőtlenség (< vagy >) esetén?',
        figure: <IntervalBracketsSvg size={240} />,
        options: [
          'Nyílt zárójelet (]a; b[) és üres karikát, mert a határpont nem része a megoldásnak',
          'Zárt szögletes zárójelet ([a; b]) és teli karikát',
          'Hullámos kapcsos zárójelet ({a; b})',
          'Bármelyik zárójel használható tetszés szerint'
        ],
        correctAnswer: 0,
        hint: 'Szigorú relációnál a határon egyenlőség lenne, ami itt tiltott, ezért kifelé áll a zárójel és üres a karika.',
        explanation: 'Szigorú relációknál (<, >) a határpontok nem tartoznak hozzá a megoldáshalmazhoz, ezért nyílt zárójelet és üres karikát alkalmazunk.'
      },
      {
        id: 'iq1-3',
        questionTypeBadge: 'Megengedő Reláció',
        question: 'Milyen zárójelet és jelölést használunk megengedő egyenlőtlenség (≤ vagy ≥) esetén?',
        options: [
          'Zárt szögletes zárójelet ([a; b]) és teli karikát, mert a határpont is része a megoldásnak',
          'Nyílt zárójelet (]a; b[) és üres karikát',
          'Kerek zárójelet',
          'Nincs szükség zárójelre'
        ],
        correctAnswer: 0,
        hint: 'Ahol egyenlőség is megengedett, ott a határpont benne van a megoldáshalmazban.',
        explanation: 'A megengedő relációknál (≤, ≥) a metszéspontok is kielégítik az egyenlőséget, így zárt zárójelet és teli karikát használunk.'
      },
      {
        id: 'iq1-4',
        questionTypeBadge: 'Abszolútérték Távolság',
        question: 'Mi a geometriai jelentése az |x| ≤ 3 egyenlőtlenségnek a számegyenesen?',
        figure: <AbsDistanceInequalitySvg size={240} />,
        options: [
          'Azon számok halmaza, amelyek távolsága az origótól legfeljebb 3 egység: x ∈ [-3; 3]',
          'Csak a 3 és a -3 két külön pontja',
          'A 3-nál nagyobb számok halmaza',
          'Az üres halmaz'
        ],
        correctAnswer: 0,
        hint: '|x| az x szám távolsága a nullától.',
        explanation: '|x| ≤ 3 azt jelenti, hogy x legfeljebb 3 egységnyire lehet a nullától balra vagy jobbra, tehát -3 ≤ x ≤ 3, azaz x ∈ [-3; 3].'
      },
      {
        id: 'iq1-5',
        questionTypeBadge: 'Parabola és Szintvonal',
        question: 'Mi a megoldása az x² ≤ 4 másodfokú egyenlőtlenségnek?',
        options: [
          'x ∈ [-2; 2]',
          'x ∈ ]-∞; -2] ∪ [2; ∞[',
          'x ∈ [0; 2]',
          'x = 2'
        ],
        correctAnswer: 0,
        hint: 'A parabola hol van az y = 4 egyenes ALATT vagy azon?',
        explanation: 'Az f(x) = x² parabola az y = 4 szintvonal alatt a két metszéspont (x = -2 és x = 2) közötti zárt szakaszon halad: x ∈ [-2; 2].'
      },
      {
        id: 'iq1-6',
        questionTypeBadge: 'Negatív Szorzás',
        question: 'Mi történik a relációjellel, ha egy egyenlőtlenség mindkét oldalát negatív számmal szorozzuk vagy osztjuk?',
        options: [
          'A relációjel iránya megfordul (pl. < helyett > lesz)',
          'A relációjel változatlan marad',
          'Egyenlőségjellé alakul át',
          'Csak a számok előjele változik, a jel nem'
        ],
        correctAnswer: 0,
        hint: 'Például 2 < 5, de (-1)-gyel szorozva: -2 > -5.',
        explanation: 'A számegyenesen a negatív számmal szorzás tükrözést jelent az origóra, ami megfordítja a számok nagyságrendi viszonyát.'
      },
      {
        id: 'iq1-7',
        questionTypeBadge: 'Nullával Összehasonlítás',
        question: 'Mit jelent grafikusan az f(x) > 0 feltétel?',
        options: [
          'Azon x intervallumokat, ahol a grafikon az x-tengely FELETT halad',
          'Ahol a grafikon metszi az y-tengelyt',
          'Ahol a függvény szigorúan nő',
          'A zérushelyek összességét'
        ],
        correctAnswer: 0,
        hint: 'Az y = 0 egyenes maga a vízszintes x-tengely.',
        explanation: 'Mivel az x-tengely egyenlete y = 0, az f(x) > 0 azt jelenti, hogy a görbe a vízszintes tengely felett, a pozitív félsíkban fekszik.'
      },
      {
        id: 'iq1-8',
        questionTypeBadge: 'Lineáris Megoldás',
        question: 'Mi a megoldása a 2x - 6 > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]3; ∞[',
          'x ∈ [-∞; 3[',
          'x ∈ [3; ∞[',
          'x ∈ ]-3; ∞['
        ],
        correctAnswer: 0,
        hint: '2x > 6 ⟹ x > 3.',
        explanation: '2x - 6 > 0 ⟹ 2x > 6 ⟹ x > 3, ami nyílt félegyenes: x ∈ ]3; ∞[.'
      },
      {
        id: 'iq1-9',
        questionTypeBadge: 'Négyzet Negatív Szint',
        question: 'Mi a megoldása az x² < 0 egyenlőtlenségnek a valós számok körében?',
        options: [
          'M = ∅ (nincs megoldás, mert valós szám négyzete sosem negatív)',
          'x = 0',
          'x ∈ ]-∞; 0[',
          'Minden valós szám'
        ],
        correctAnswer: 0,
        hint: 'Tud-e a parabola az x-tengely alá menni?',
        explanation: 'Minden valós x-re x² ≥ 0, így a kifejezés soha nem lehet szigorúan 0-nál kisebb. A megoldáshalmaz üres: M = ∅.'
      },
      {
        id: 'iq1-10',
        questionTypeBadge: 'Azonosság Halmaza',
        question: 'Ha egy egyenlőtlenség minden valós számra teljesül, hogyan jelöljük a megoldáshalmazát?',
        options: [
          'x ∈ ℝ (vagy ]-∞; ∞[)',
          'M = ∅',
          'x ∈ [0; ∞[',
          'x = 0'
        ],
        correctAnswer: 0,
        hint: 'A teljes valós számegyenes a megoldás.',
        explanation: 'Ha a reláció minden behelyettesíthető valós számra igaz (pl. x² + 1 > 0), a megoldáshalmaz az egész valós számhalmaz: x ∈ ℝ.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Intervallumok és Számítások (Közepes)',
    subtitle: 'Másodfokú zónák, eltolt abszolútértékes távolságok és előjelváltások.',
    range: '11 - 20. feladat',
    focus: 'Másodfokú & Abszolútértékes Zónák',
    questions: [
      {
        id: 'iq2-1',
        questionTypeBadge: 'Másodfokú Külső Ágak',
        question: 'Mi a megoldása az x² > 9 másodfokú egyenlőtlenségnek?',
        figure: <AboveBelowConceptSvg size={240} />,
        options: [
          'x ∈ ]-∞; -3[ ∪ ]3; ∞[',
          'x ∈ ]-3; 3[',
          'x ∈ [-3; 3]',
          'x > 3'
        ],
        correctAnswer: 0,
        hint: 'A parabola az y = 9 egyenes felett a két metszésponton (-3 és 3) KÍVÜL fut.',
        explanation: 'Az x² görbéje a 3-nál nagyobb és a -3-nál kisebb számok esetén magasabban van, mint 9: x ∈ ]-∞; -3[ ∪ ]3; ∞[.'
      },
      {
        id: 'iq2-2',
        questionTypeBadge: 'Eltolt Abszolútérték Belső',
        question: 'Mi a megoldása az |x - 4| ≤ 2 egyenlőtlenségnek?',
        figure: <AbsDistanceInequalitySvg size={240} />,
        options: [
          'x ∈ [2; 6]',
          'x ∈ ]2; 6[',
          'x ∈ [-2; 2]',
          'x ∈ ]-∞; 2] ∪ [6; ∞['
        ],
        correctAnswer: 0,
        hint: 'A 4-es számtól mért távolság legfeljebb 2 egység: 4 - 2 = 2 és 4 + 2 = 6.',
        explanation: 'A számegyenesen a 4-től való távolság legfeljebb 2, így az intervallum: [4 - 2; 4 + 2] = [2; 6].'
      },
      {
        id: 'iq2-3',
        questionTypeBadge: 'Eltolt Abszolútérték Külső',
        question: 'Mi a megoldása az |x + 3| > 5 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; -8[ ∪ ]2; ∞[',
          'x ∈ ]-8; 2[',
          'x ∈ [-8; 2]',
          'x ∈ ]2; ∞['
        ],
        correctAnswer: 0,
        hint: 'A -3 számtól mért távolság nagyobb mint 5: -3 - 5 = -8 és -3 + 5 = 2.',
        explanation: 'A távolság a -3-tól több mint 5 egység, ami a -8-nál kisebb vagy 2-nél nagyobb számokat jelenti: ]-∞; -8[ ∪ ]2; ∞[.'
      },
      {
        id: 'iq2-4',
        questionTypeBadge: 'Negatív Osztás',
        question: 'Oldd meg a -3x + 12 ≥ 0 egyenlőtlenséget!',
        options: [
          'x ∈ ]-∞; 4]',
          'x ∈ [4; ∞[',
          'x ∈ ]-∞; -4]',
          'x ≥ 4'
        ],
        correctAnswer: 0,
        hint: '-3x ≥ -12. Oszd el -3-mal, és fordítsd meg a relációjelet!',
        explanation: '-3x ≥ -12 ⟹ x ≤ 4. Mivel megengedő reláció, a 4 is része a halmaznak: x ∈ ]-∞; 4].'
      },
      {
        id: 'iq2-5',
        questionTypeBadge: 'Eltolt Parabola Szint alatt',
        question: 'Mi a megoldása az (x - 1)² ≤ 4 egyenlőtlenségnek?',
        options: [
          'x ∈ [-1; 3]',
          'x ∈ [1; 3]',
          'x ∈ ]-1; 3[',
          'x ∈ ]-∞; -1] ∪ [3; ∞['
        ],
        correctAnswer: 0,
        hint: '-2 ≤ x - 1 ≤ 2. Adj hozzá 1-et mindkét oldalhoz!',
        explanation: '-2 ≤ x - 1 ≤ 2 ⟹ -1 ≤ x ≤ 3, tehát a zárt intervallum: x ∈ [-1; 3].'
      },
      {
        id: 'iq2-6',
        questionTypeBadge: 'Lefelé Nyíló Parabola Pozitív része',
        question: 'Melyik intervallumon halad az f(x) = -x² + 4 függvény az x-tengely felett (f(x) > 0)?',
        options: [
          'x ∈ ]-2; 2[',
          'x ∈ [-2; 2]',
          'x ∈ ]-∞; -2[ ∪ ]2; ∞[',
          'x ∈ ]0; 4['
        ],
        correctAnswer: 0,
        hint: 'A lefelé nyíló parabola csúcsa (0; 4)-ben van, zérushelyei -2 és 2. A két zérushely között pozitív!',
        explanation: 'A csúcspont fent van (y = 4), a zérushelyek x = ±2. Szigorú reláció miatt a nyílt intervallumon pozitív: ]-2; 2[.'
      },
      {
        id: 'iq2-7',
        questionTypeBadge: 'Abszolút Szigorúan Kisebb Nullánál',
        question: 'Mi a megoldása az |x - 5| < 0 egyenlőtlenségnek?',
        options: [
          'M = ∅ (üres halmaz)',
          'x = 5',
          'x ∈ ]-∞; 5[',
          'x ∈ ℝ'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e egy abszolútérték negatív?',
        explanation: 'Az abszolútérték definíció szerint nemnegatív (≥ 0), ezért sosem lehet szigorúan 0-nál kisebb. M = ∅.'
      },
      {
        id: 'iq2-8',
        questionTypeBadge: 'Abszolút Legfeljebb Nulla',
        question: 'Mi a megoldása az |x - 5| ≤ 0 egyenlőtlenségnek?',
        options: [
          'x = 5 (egyetlen szám: {5})',
          'M = ∅',
          'x ∈ [-5; 5]',
          'x ∈ ℝ'
        ],
        correctAnswer: 0,
        hint: 'Mivel negatív nem lehet, csak a = 0 eset adhat megoldást.',
        explanation: 'Mivel |x - 5| soha nem negatív, az egyenlőtlenség kizárólag akkor teljesül, ha |x - 5| = 0 ⟹ x = 5.'
      },
      {
        id: 'iq2-9',
        questionTypeBadge: 'Parabola és Ferde Egyenes',
        question: 'Az f(x) = x² és g(x) = x + 2 görbék metszéspontjai x = -1 és x = 2. Hol teljesül az x² ≤ x + 2 egyenlőtlenség?',
        options: [
          'x ∈ [-1; 2]',
          'x ∈ ]-1; 2[',
          'x ∈ ]-∞; -1] ∪ [2; ∞[',
          'x ∈ [0; 2]'
        ],
        correctAnswer: 0,
        hint: 'Hol van a parabola az egyenes ALATT vagy azon?',
        explanation: 'A parabola völgye a két metszéspont között az egyenes alatt halad, és megengedő reláció miatt a zárt intervallum a megoldás: [-1; 2].'
      },
      {
        id: 'iq2-10',
        questionTypeBadge: 'Egyszerű Törtes Lineáris',
        question: 'Mi a megoldása a 0.5x - 1 < 2 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; 6[',
          'x ∈ ]-∞; 3[',
          'x ∈ [6; ∞[',
          'x ∈ ]-∞; 1.5['
        ],
        correctAnswer: 0,
        hint: '0.5x < 3 ⟹ x < 3 / 0.5 = 6.',
        explanation: '0.5x < 3 ⟹ x < 6. A nyílt félegyenes: ]-∞; 6[.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Különleges és Összetett Esetek (Nehéz)',
    subtitle: 'Gyökös korlátok, teljes négyzetek, kettős egyenlőtlenségek és paraméteres vizsgálatok.',
    range: '21 - 30. feladat',
    focus: 'Gyökös & Összetett Relációk',
    questions: [
      {
        id: 'iq3-1',
        questionTypeBadge: 'Parabola az Egyenes Felett',
        question: 'Mi a megoldása az x² > x + 2 egyenlőtlenségnek a metszéspontok (x₁ = -1, x₂ = 2) ismeretében?',
        figure: <AboveBelowConceptSvg size={240} />,
        options: [
          'x ∈ ]-∞; -1[ ∪ ]2; ∞[',
          'x ∈ ]-1; 2[',
          'x ∈ [-1; 2]',
          'x ∈ ]2; ∞['
        ],
        correctAnswer: 0,
        hint: 'A parabola a két metszésponton kívül emelkedik az egyenes fölé.',
        explanation: 'A két metszésponton kívül f(x) > g(x), szigorú reláció miatt a határok nem részei a halmaznak: ]-∞; -1[ ∪ ]2; ∞[.'
      },
      {
        id: 'iq3-2',
        questionTypeBadge: 'Gyökös Korlát Alulról',
        question: 'Mi a megoldása a √x ≤ 3 egyenlőtlenségnek a valós számok körében?',
        options: [
          'x ∈ [0; 9]',
          'x ∈ ]-∞; 9]',
          'x ∈ [0; 3]',
          'x ∈ [0; 6]'
        ],
        correctAnswer: 0,
        hint: 'Négyzetre emelve x ≤ 9, de ne feledkezz meg az értelmezési tartományról: x ≥ 0!',
        explanation: 'A négyzetgyök csak x ≥ 0 esetén értelmezett. A √x ≤ 3 feltételből x ≤ 9, a kettő metszete a zárt intervallum: [0; 9].'
      },
      {
        id: 'iq3-3',
        questionTypeBadge: 'Gyökös Negatív Szint Felett',
        question: 'Mi a megoldása a √x > -2 egyenlőtlenségnek?',
        options: [
          'x ∈ [0; ∞[ (a teljes értelmezési tartomány)',
          'x ∈ ℝ',
          'x ∈ [4; ∞[',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'A négyzetgyök értéke definíció szerint mindig nemnegatív (≥ 0), ami mindig nagyobb, mint -2.',
        explanation: 'Mivel minden megengedett x ≥ 0 számra √x ≥ 0 > -2, a feltétel minden olyan számon teljesül, ahol a gyök létezik: x ∈ [0; ∞[.'
      },
      {
        id: 'iq3-4',
        questionTypeBadge: 'Teljes Négyzet Legfeljebb Nulla',
        question: 'Mi a megoldása az x² + 6x + 9 ≤ 0 egyenlőtlenségnek?',
        options: [
          'x = -3 (egyetlen pont: {-3})',
          'M = ∅',
          'x ∈ [-3; 3]',
          'x ∈ ℝ'
        ],
        correctAnswer: 0,
        hint: 'x² + 6x + 9 = (x + 3)². Egy négyzet mikor lehet ≤ 0?',
        explanation: '(x + 3)² ≥ 0 minden valós x-re. A ≤ 0 reláció kizárólag egyenlőségként teljesülhet: x + 3 = 0 ⟹ x = -3.'
      },
      {
        id: 'iq3-5',
        questionTypeBadge: 'Mindig Pozitív Másodfokú',
        question: 'Mi a megoldása az x² + 6x + 10 > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ℝ (minden valós szám megoldás)',
          'M = ∅',
          'x ∈ ]-3; ∞[',
          'x ∈ ]-∞; -3['
        ],
        correctAnswer: 0,
        hint: 'Alakítsd teljes négyzetté: (x + 3)² + 1.',
        explanation: 'x² + 6x + 10 = (x + 3)² + 1 ≥ 1 > 0 minden valós x-re. A parabola teljesen az x-tengely felett lebeg, így a megoldás ℝ.'
      },
      {
        id: 'iq3-6',
        questionTypeBadge: 'Kettős Egyenlőtlenség',
        question: 'Mi a megoldása a 2 ≤ |x - 1| ≤ 5 kettős egyenlőtlenségnek?',
        options: [
          'x ∈ [-4; -1] ∪ [3; 6]',
          'x ∈ [-4; 6]',
          'x ∈ [3; 6]',
          'x ∈ [-1; 3]'
        ],
        correctAnswer: 0,
        hint: 'Az 1-től mért távolság legalább 2 és legfeljebb 5 egység: balra és jobbra is egy-egy zárt szakasz.',
        explanation: 'Jobbra: 1 + 2 = 3 és 1 + 5 = 6 ⟹ [3; 6]. Balra: 1 - 5 = -4 és 1 - 2 = -1 ⟹ [-4; -1]. Uniójuk: [-4; -1] ∪ [3; 6].'
      },
      {
        id: 'iq3-7',
        questionTypeBadge: 'Abszolút Külső Tartomány',
        question: 'Melyik tartományon halad az f(x) = |x + 1| a g(x) = 3 egyenes FELETT?',
        options: [
          'x ∈ ]-∞; -4[ ∪ ]2; ∞[',
          'x ∈ ]-4; 2[',
          'x ∈ [-4; 2]',
          'x ∈ ]2; ∞['
        ],
        correctAnswer: 0,
        hint: '|x + 1| > 3 ⟹ x + 1 > 3 vagy x + 1 < -3.',
        explanation: 'A távolság a -1-től nagyobb mint 3 egység: x > 2 vagy x < -4, tehát: ]-∞; -4[ ∪ ]2; ∞[.'
      },
      {
        id: 'iq3-8',
        questionTypeBadge: 'Csúcsponti Parabola Pozitív része',
        question: 'Egy lefelé nyíló parabola csúcspontja C(2; 9), zérushelyei x = -1 és x = 5. Hol teljesül, hogy f(x) ≥ 0?',
        options: [
          'x ∈ [-1; 5]',
          'x ∈ ]-1; 5[',
          'x ∈ ]-∞; -1] ∪ [5; ∞[',
          'x ∈ [2; 9]'
        ],
        correctAnswer: 0,
        hint: 'Lefelé nyíló parabola a két zérushely között a tengely felett tartózkodik, megengedő relációval.',
        explanation: 'A parabola csúcsa fent van, zérushelyei -1 és 5. A két zérushely közötti zárt szakaszon nemnegatív: [-1; 5].'
      },
      {
        id: 'iq3-9',
        questionTypeBadge: 'Törtes Egyenlőtlenség',
        question: 'Mi a megoldása az 1/x > 0 egyenlőtlenségnek a valós számok körében?',
        options: [
          'x ∈ ]0; ∞[',
          'x ∈ [0; ∞[',
          'x ∈ ℝ',
          'x ∈ ]-∞; 0['
        ],
        correctAnswer: 0,
        hint: 'A számláló (1) pozitív. Egy tört mikor lesz pozitív? És lehet-e a nevező 0?',
        explanation: 'Egy tört akkor pozitív, ha számlálója és nevezője azonos előjelű. Mivel a számláló 1 > 0, a nevezőnek is pozitívnak kell lennie: x > 0. A 0 nem lehet része: ]0; ∞[.'
      },
      {
        id: 'iq3-10',
        questionTypeBadge: 'Négyzet Szigorúan Kisebb Nulla',
        question: 'Mi a megoldása a (2x - 4)² < 0 egyenlőtlenségnek?',
        options: [
          'M = ∅',
          'x = 2',
          'x ∈ ]-∞; 2[',
          'x ∈ ]2; ∞['
        ],
        correctAnswer: 0,
        hint: 'Bármilyen valós szám négyzete legalább 0.',
        explanation: 'Minden valós számra (2x - 4)² ≥ 0, így soha nem lehet szigorúan negatív. A megoldáshalmaz üres: M = ∅.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A „Melyik van felül?” Szabály',
    icon: <BookOpen className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>f(x) &gt; g(x):</strong> Ahol az <em>f</em> görbéje a <em>g</em> felett halad.</p>
        <p><strong>f(x) &lt; g(x):</strong> Ahol az <em>f</em> görbéje a <em>g</em> alatt halad.</p>
        <p className="text-slate-400">A zónák határait a metszéspontok x-koordinátái szabják meg!</p>
      </div>
    )
  },
  {
    title: 'Zárójelek & Karikák',
    icon: <Target className="w-5 h-5 text-sky-400" />,
    color: 'sky',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong className="text-sky-300">Szigorú (&lt;, &gt;):</strong> Nyílt <em>]a; b[</em>, üres karika a tengelyen.</p>
        <p><strong className="text-emerald-300">Megengedő (≤, ≥):</strong> Zárt <em>[a; b]</em>, teli karika a tengelyen.</p>
      </div>
    )
  },
  {
    title: 'Abszolútérték Távolság',
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    color: 'purple',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>|x - u| ≤ d:</strong> Belső szakasz <em>[u - d; u + d]</em>.</p>
        <p><strong>|x - u| &gt; d:</strong> Két külső ág <em>]-∞; u - d[ ∪ ]u + d; ∞[</em>.</p>
      </div>
    )
  },
  {
    title: 'Előjelváltási Csapda',
    icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
    color: 'rose',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p>Negatív számmal szorzáskor vagy osztáskor a relációjel <strong>MEGFORDUL</strong>!</p>
        <p className="text-amber-300 font-mono">-2x &lt; 6 ⟹ x &gt; -3</p>
      </div>
    )
  }
];

export const InequalityQuiz: React.FC<InequalityQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="egyenlotlensegek"
      badgeLabel="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="Egyenlőtlenségek Grafikus Megoldása Kvíz"
      subtitle="30 válogatott feladat 3 szinten: a görbék kölcsönös helyzetétől és a zárójelektől kezdve a másodfokú zónákon át a gyökös és abszolútértékes relációkig."
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        onSwitchToMatcher ? (
          <InequalityMatcher
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToSorter={onSwitchToSorter}
          />
        ) : undefined
      }
      sorterComponent={
        onSwitchToSorter ? (
          <InequalitySorter
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

