import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ThalesMatcher, matcherLevels } from './ThalesMatcher';
import { ThalesSorter, sorterLevels } from './ThalesSorter';
import {
  ThalesTheoremSVG,
  ThalesProofSVG,
  ThalesLocusSVG
} from './ThalesFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface ThalesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Thalész-tétel Alapjai (Könnyű)',
    subtitle: 'A tétel kimondása, derékszögű háromszögek, átmérő és az R = c / 2 sugár.',
    range: '1 - 10. feladat',
    focus: 'A tétel alapvető tényei és felismerése',
    questions: [
      {
        id: 'thq1-1',
        questionTypeBadge: 'Thalész-tétel Kimondása',
        question: 'Mit mond ki a Thalész-tétel?',
        figure: <ThalesTheoremSVG size={200} />,
        options: [
          'A kör átmérőjének két végpontját a körvonal bármely más pontjával összekötve a kapott szög derékszög (90°)',
          'A háromszög belső szögeinek összege mindig 180°',
          'A derékszögű háromszög befogóinak négyzete egyenlő az átfogó négyzetével',
          'Bármely körbe írt háromszög szabályos'
        ],
        correctAnswer: 0,
        hint: 'A kör átmérőjéhez tartozó kerületi szög nagyságáról szól.',
        explanation: 'A Thalész-tétel szerint ha egy kör átmérőjének két végpontját összekötjük a körvonal bármely pontjával (a végpontok kivételével), akkor derékszöget kapunk.'
      },
      {
        id: 'thq1-2',
        questionTypeBadge: 'A Tétel Feltétele',
        question: 'Mi a feltétel az AB szakaszra vonatkozóan a Thalész-tételben?',
        options: [
          'Az AB szakasznak a kör átmérőjének kell lennie (át kell haladnia a középponton)',
          'Az AB szakasz tetszőleges húr lehet a körben',
          'Az AB szakasznak egyenlőnek kell lennie a sugárral',
          'Az AB szakasznak érintőnek kell lennie'
        ],
        correctAnswer: 0,
        hint: 'Csak átmérő esetén lesz a szög pontosan 90°.',
        explanation: 'A tétel alapfeltétele, hogy az AB szakasz a kör átmérője legyen. Ha tetszőleges rövidebb húrt vennénk, a szög nem lenne 90°.'
      },
      {
        id: 'thq1-3',
        questionTypeBadge: 'Szögérték',
        question: 'Egy kör átmérője AB = 10 cm, és C a körvonal tetszőleges, A-tól és B-től különböző pontja. Mekkora az ACB szög?',
        options: [
          'Pontosan 90°',
          '60°',
          'Attól függ, hol van a C pont a köríven',
          '180°'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel értelmében a C pont helyétől függetlenül mindig ugyanakkora a szög.',
        explanation: 'A tétel legfontosabb következménye, hogy a C pont bárhol mozoghat a körvonalon, az ACB szög mindig pontosan 90° (derékszög) marad.'
      },
      {
        id: 'thq1-4',
        questionTypeBadge: 'Körülírt Kör Középpontja',
        question: 'Hol található egy derékszögű háromszög körülírt körének (Thalész-körének) középpontja?',
        options: [
          'Az átfogó pontos felezőpontjában',
          'A derékszögű csúcsban',
          'A háromszög belsejében lévő súlypontban',
          'A hosszabbik befogó felezőpontjában'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel megfordítása szerint az átfogó maga a kör átmérője.',
        explanation: 'Mivel a derékszögű háromszög átfogója a körülírt kör átmérője, a középpont ($O$) pontosan az átfogó felezőpontja.'
      },
      {
        id: 'thq1-5',
        questionTypeBadge: 'Sugár Kiszámítása',
        question: 'Egy derékszögű háromszög átfogója c = 18 cm. Mekkora a köré írt Thalész-kör sugara (R)?',
        options: [
          '9 cm',
          '18 cm',
          '6 cm',
          '4.5 cm'
        ],
        correctAnswer: 0,
        hint: 'A sugár az átmérő (átfogó) fele: R = c / 2.',
        explanation: 'R = c / 2 = 18 / 2 = 9 cm.'
      },
      {
        id: 'thq1-6',
        questionTypeBadge: 'Átfogó Kiszámítása',
        question: 'A derékszögű háromszög körülírt körének sugara R = 5 cm. Milyen hosszú a háromszög átfogója (c)?',
        options: [
          '10 cm',
          '5 cm',
          '25 cm',
          '2.5 cm'
        ],
        correctAnswer: 0,
        hint: 'Az átfogó a kör átmérője: c = 2R.',
        explanation: 'c = 2 · R = 2 · 5 = 10 cm.'
      },
      {
        id: 'thq1-7',
        questionTypeBadge: 'A Tétel Megfordítása',
        question: 'Mit állít a Thalész-tétel megfordítása?',
        options: [
          'Ha egy háromszög derékszögű, akkor derékszögű csúcsa rajta van az átfogó mint átmérő fölé rajzolt körön',
          'Minden derékszögű háromszög egyenlő szárú is egyben',
          'Ha egy háromszög köré kör írható, akkor a háromszög biztosan derékszögű',
          'A derékszögű csúcs mindig a kör középpontja'
        ],
        correctAnswer: 0,
        hint: 'Ha eleve tudjuk, hogy van derékszög, abból következik a körvonalra esés.',
        explanation: 'A megfordítás azt állítja, hogy ha egy háromszög derékszögű, akkor az átfogó fölé rajzolt kör átmegy a derékszögű csúcson (és az átfogó felezőpontja a kör középpontja).'
      },
      {
        id: 'thq1-8',
        questionTypeBadge: 'Félkörív Háromszöge',
        question: 'Milyen típusú háromszög keletkezik, ha egy félkör átmérőjének végpontjait összekötjük a félkörív egy tetszőleges pontjával?',
        options: [
          'Derékszögű háromszög',
          'Tompaszögű háromszög',
          'Egyenlő oldalú (szabályos) háromszög',
          'Csak egyenlő szárú lehet'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel garantálja a derékszöget.',
        explanation: 'A félkörív bármely pontjában derékszög keletkezik, így a kapott háromszög mindig derékszögű.'
      },
      {
        id: 'thq1-9',
        questionTypeBadge: 'Hegyesszögek Összefüggése',
        question: 'A Thalész-körön lévő C csúcsnál lévő derékszög mellett a háromszög egyik hegyesszöge α = 35°. Mekkora a másik hegyesszög (β)?',
        options: [
          '55°',
          '65°',
          '45°',
          '35°'
        ],
        correctAnswer: 0,
        hint: 'Derékszögű háromszögben a két hegyesszög összege 90°: α + β = 90°.',
        explanation: 'β = 90° - 35° = 55°.'
      },
      {
        id: 'thq1-10',
        questionTypeBadge: 'Kizárt Pontok',
        question: 'Ha a derékszögű látószög mértani helyét keressük egy AB szakaszra, mely pontokat kell kizárnunk a körvonalról?',
        options: [
          'Magukat az A és B végpontokat',
          'A kör legfelső pontját',
          'A kör középpontját',
          'Egyetlen pontot sem kell kizárni'
        ],
        correctAnswer: 0,
        hint: 'Az A és B pontokban nem húzható két különböző egyenes a szakasz két végéhez.',
        explanation: 'Az A és B pontokban nem jön létre háromszög, és nem értelmezhető az ACB szög, ezért ezt a két pontot ki kell zárni a mértani helyből.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Bizonyítás, Mértani Hely és Látószögek (Közepes)',
    subtitle: 'A bizonyítás szerkezete, belső és külső pontok látószögei, átfogóhoz tartozó súlyvonal.',
    range: '11 - 20. feladat',
    focus: 'Összefüggések mélyebb megértése és levezetések',
    questions: [
      {
        id: 'thq2-11',
        questionTypeBadge: 'A Bizonyítás Lépése',
        question: 'Mi a legfontosabb geometriai ötlet a Thalész-tétel bizonyításában?',
        figure: <ThalesProofSVG size={200} />,
        options: [
          'Az O középpontot összekötjük a C ponttal, így a háromszög két egyenlő szárú háromszögre bomlik (OA = OB = OC = R)',
          'Behúzunk egy érintőt a C pontban',
          'Négyzetet rajzolunk az átmérő fölé',
          'Felírjuk a szinusztételt'
        ],
        correctAnswer: 0,
        hint: 'Az OC szakasz is a kör sugara, akárcsak OA és OB.',
        explanation: 'Mivel OA = OB = OC = R, az AOC és BOC háromszögek egyenlő szárúak, így alapon fekvő szögeik egyenlők (α és α, illetve β és β).'
      },
      {
        id: 'thq2-12',
        questionTypeBadge: 'Bizonyítás Összegzése',
        question: 'Milyen egyenlet vezeti le a bizonyításban, hogy a C csúcsnál lévő szög pontosan 90°?',
        options: [
          '2α + 2β = 180°  =>  2(α + β) = 180°  =>  γ = α + β = 90°',
          'α + β + 90° = 180°',
          'α² + β² = γ²',
          '3α = 180°  =>  α = 60°'
        ],
        correctAnswer: 0,
        hint: 'A nagy háromszög belső szögei α, β és (α + β).',
        explanation: 'Az ABC háromszög belső szögeinek összege α + β + (α + β) = 2α + 2β = 180°. Ebből 2(α + β) = 180°, vagyis γ = α + β = 90°.'
      },
      {
        id: 'thq2-13',
        questionTypeBadge: 'Külső Pont Látószöge',
        question: 'Egy P pont a Thalész-körön kívül helyezkedik el a síkban. Milyen az APB látószög?',
        figure: <ThalesLocusSVG size={200} />,
        options: [
          'Hegyesszög (< 90°)',
          'Tompaszög (> 90°)',
          'Pontosan 90°',
          'Egyenesszög (180°)'
        ],
        correctAnswer: 0,
        hint: 'Ahogy távolodunk a szakasztól a körön kívülre, a szög kisebbé válik.',
        explanation: 'A Thalész-körön kívül fekvő bármely pontból az AB szakasz hegyesszögben (< 90°) látszik.'
      },
      {
        id: 'thq2-14',
        questionTypeBadge: 'Belső Pont Látószöge',
        question: 'Egy P pont a Thalész-körön belül helyezkedik el a síkban. Milyen az APB látószög?',
        figure: <ThalesLocusSVG size={200} />,
        options: [
          'Tompaszög (> 90°)',
          'Hegyesszög (< 90°)',
          'Pontosan 90°',
          'Nulla szög'
        ],
        correctAnswer: 0,
        hint: 'A kör belsejében a szakasz végpontjai közelebb vannak, jobban szétnyílnak a szárak.',
        explanation: 'A Thalész-kör belsejében fekvő bármely pontból az AB szakasz tompaszögben (> 90°) látszik.'
      },
      {
        id: 'thq2-15',
        questionTypeBadge: 'Átfogóhoz Tartozó Súlyvonal',
        question: 'Egy derékszögű háromszög átfogója c = 14 cm. Milyen hosszú a derékszögű csúcsból induló súlyvonal (s_c)?',
        options: [
          '7 cm',
          '14 cm',
          '3.5 cm',
          '10 cm'
        ],
        correctAnswer: 0,
        hint: 'A súlyvonal az átfogó felezőpontjába mutat, ami a körülírt kör középpontja: s_c = R = c / 2.',
        explanation: 'Mivel a derékszögű csúcs és az átfogó felezője közötti szakasz a kör sugara, s_c = R = c / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'thq2-16',
        questionTypeBadge: 'Befogókból Sugár',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm. Mekkora a Thalész-kör sugara (R)?',
        options: [
          '5 cm',
          '10 cm',
          '7 cm',
          '4 cm'
        ],
        correctAnswer: 0,
        hint: 'Pitagorasz-tétellel számold ki az átfogót: c = √(6² + 8²) = 10 cm. Majd R = c / 2.',
        explanation: 'Az átfogó c = √(36 + 64) = √100 = 10 cm. A sugár R = c / 2 = 10 / 2 = 5 cm.'
      },
      {
        id: 'thq2-17',
        questionTypeBadge: 'Pitagorasz és Súlyvonal',
        question: 'Egy derékszögű háromszög befogói a = 5 cm és b = 12 cm. Milyen hosszú a derékszögű csúcsból az átfogó felezőpontjába húzott súlyvonal?',
        options: [
          '6.5 cm',
          '13 cm',
          '8.5 cm',
          '6 cm'
        ],
        correctAnswer: 0,
        hint: 'c = √(5² + 12²) = 13 cm. A súlyvonal s_c = c / 2.',
        explanation: 'Az átfogó hossza c = √(25 + 144) = √169 = 13 cm. A súlyvonal hossza s_c = 13 / 2 = 6.5 cm.'
      },
      {
        id: 'thq2-18',
        questionTypeBadge: 'Mértani Hely Definíció',
        question: 'A síkban egy AB = 8 cm hosszúságú szakasz adott. Mi azon pontok mértani helye, amelyekből az AB szakasz derékszögben látszik?',
        options: [
          'Az AB szakasz mint átmérő fölé rajzolt körvonal, kivéve az A és B pontokat',
          'Az AB szakasz felezőmerőlegese',
          'Egy 8 cm sugarú körvonal',
          'Az A és B pontokon átmenő két párhuzamos egyenes'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-kör minden pontjából (kivéve a végpontokat) derékszög látszik.',
        explanation: 'A derékszögű látószög mértani helye a szakasz mint átmérő fölé rajzolt Thalész-kör (az A és B pontok nélkül).'
      },
      {
        id: 'thq2-19',
        questionTypeBadge: 'Húr és Kerületi Szög',
        question: 'Egy körben felveszünk egy olyan AB húrt, amely nem megy át a középponton (hossza kisebb az átmérőnél). Lehet-e az AB-hez tartozó kerületi szög 90°?',
        options: [
          'Nem, csakis akkor lehet 90°, ha AB pontosan átmérő',
          'Igen, bármely húrnál lehet 90°',
          'Igen, ha a kör sugara elég nagy',
          'Csak akkor, ha a húr hossza a sugár fele'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel megfordítása kizárja, hogy más húrhoz 90° tartozzon.',
        explanation: 'A 90°-os kerületi szög egyértelműen a félkörívhez (vagyis az átmérőhöz) tartozik. Ha a húr nem átmérő, a szög nem lehet 90°.'
      },
      {
        id: 'thq2-20',
        questionTypeBadge: 'Szabályos Háromszög Félkörben',
        question: 'Az AB átmérőjű Thalész-körön lévő C csúcsra az AOC háromszög szabályos (egyenlő oldalú). Mekkorák az ABC háromszög szögei?',
        options: [
          'α = 60°, β = 30°, γ = 90°',
          'α = 45°, β = 45°, γ = 90°',
          'α = 70°, β = 20°, γ = 90°',
          'α = 60°, β = 60°, γ = 60°'
        ],
        correctAnswer: 0,
        hint: 'Ha AOC szabályos, akkor minden szöge 60°, így az A csúcsnál lévő szög α = 60°.',
        explanation: 'Mivel az AOC háromszög szabályos, α = 60°. A Thalész-tétel miatt γ = 90°, így a B csúcsnál lévő szög β = 90° - 60° = 30°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Számításos és Haladó Alkalmazások (Nehéz)',
    subtitle: 'Pitagorasz-kombinációk, koordináták, érintőszerkesztés elmélete és speciális összefüggések.',
    range: '21 - 30. feladat',
    focus: 'Összetett szerkesztési és algebrai feladatok',
    questions: [
      {
        id: 'thq2-21',
        questionTypeBadge: 'Átfogó és Befogó Számítás',
        question: 'Egy derékszögű háromszög átfogója c = 26 cm, egyik befogója a = 10 cm. Mekkora a másik befogó (b) és a Thalész-kör sugara (R)?',
        options: [
          'b = 24 cm és R = 13 cm',
          'b = 20 cm és R = 13 cm',
          'b = 24 cm és R = 26 cm',
          'b = 16 cm és R = 13 cm'
        ],
        correctAnswer: 0,
        hint: 'b = √(26² - 10²) és R = c / 2.',
        explanation: 'b = √(676 - 100) = √576 = 24 cm. A sugár R = 26 / 2 = 13 cm.'
      },
      {
        id: 'thq2-22',
        questionTypeBadge: 'Távolságok a Körben',
        question: 'Egy derékszögű háromszög átfogója c = 10 cm, derékszögű csúcsa C. Mekkora távolságra van C a körülírt kör középpontjától (O) és a magasságpontjától (M)?',
        options: [
          'O-tól 5 cm, M-től 0 cm (mert M maga a C csúcs)',
          'O-tól 5 cm, M-től 5 cm',
          'O-tól 10 cm, M-től 0 cm',
          'O-tól 2.5 cm, M-től 5 cm'
        ],
        correctAnswer: 0,
        hint: 'Derékszögű háromszögben a magasságpont maga a derékszögű csúcs!',
        explanation: 'C távolsága a körülírt kör középpontjától a sugár: R = c / 2 = 5 cm. A magasságpont (M) derékszögű háromszögben pontosan a C csúcsban van, így a távolságuk 0 cm.'
      },
      {
        id: 'thq2-23',
        questionTypeBadge: 'Területszámítás Sugárral',
        question: 'Az AB átmérőjű Thalész-körön felveszünk egy C pontot úgy, hogy AC = R (a kör sugara). Mekkora az ABC háromszög területe, ha R = 6 cm?',
        options: [
          '18√3 cm² ≈ 31.18 cm²',
          '36 cm²',
          '18 cm²',
          '36√3 cm²'
        ],
        correctAnswer: 0,
        hint: 'AC = 6 cm, c = 2R = 12 cm. Mivel AC a fele az átfogónak, ez egy 30°-60°-90° háromszög! BC = 6√3 cm.',
        explanation: 'A másik befogó BC = √(12² - 6²) = √(144 - 36) = √108 = 6√3 cm. A terület T = (6 · 6√3) / 2 = 18√3 cm² ≈ 31.18 cm².'
      },
      {
        id: 'thq2-24',
        questionTypeBadge: 'Látószög és Távolság',
        question: 'Egy síkbeli pontból egy 12 cm-es szakasz 120°-os szögben látszik. Milyen távol van ez a pont a szakasz felezőpontjától?',
        options: [
          'Biztosan kevesebb mint 6 cm-re (a Thalész-körön belül van)',
          'Pontosan 6 cm-re',
          'Biztosan több mint 6 cm-re (a Thalész-körön kívül van)',
          'Pontosan 12 cm-re'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-kör sugara R = 12 / 2 = 6 cm. Ha a látószög tompaszög (> 90°), a pont a körön belül van.',
        explanation: 'Mivel 120° > 90°, a pont a szakasz fölé rajzolt Thalész-kör belsejében található. Ezért a középponttól (a szakasz felezőjétől) vett távolsága szigorúan kisebb a sugárnál: d < 6 cm.'
      },
      {
        id: 'thq2-25',
        questionTypeBadge: 'Beírt és Körülírt Sugár Összefüggése',
        question: 'Egy derékszögű háromszög befogói a és b, átfogója c. Milyen elegáns összefüggés köti össze a beírt kör sugarát (r) és a körülírt kör sugarát (R)?',
        options: [
          '2R + 2r = a + b',
          'R + r = a + b',
          'R · r = a · b',
          'R² + r² = c²'
        ],
        correctAnswer: 0,
        hint: 'R = c/2  =>  2R = c.  r = (a + b - c)/2  =>  2r = a + b - c. Add össze a kettőt!',
        explanation: 'Mivel 2R = c és 2r = a + b - c, a két egyenlet összeadásával: 2R + 2r = c + (a + b - c) = a + b. Vagyis R + r = (a + b) / 2.'
      },
      {
        id: 'thq2-26',
        questionTypeBadge: 'Koordinátageometria és Thalész',
        question: 'Egy derékszögű háromszög csúcsai A(0, 0), B(8, 0) és C(0, 6). Mik a körülírt Thalész-kör középpontjának (O) koordinátái?',
        options: [
          'O(4, 3)',
          'O(4, 0)',
          'O(0, 3)',
          'O(3, 4)'
        ],
        correctAnswer: 0,
        hint: 'A derékszög az origóban (A-nál) van! Így az átfogó a BC szakasz. O a BC szakasz felezőpontja!',
        explanation: 'Mivel az AC szakasz az y tengelyen, az AB szakasz az x tengelyen fut, a derékszög az A(0, 0) csúcsban van. Az átfogó tehát a BC szakasz: B(8, 0) és C(0, 6). Ennek felezőpontja: O((8+0)/2, (0+6)/2) = O(4, 3).'
      },
      {
        id: 'thq2-27',
        questionTypeBadge: 'Pontok Száma a Síkban',
        question: 'Egy kör átmérője 10 cm. Hány olyan pont létezik a síkban, amelyből az átmérő pontosan 90°-ban látszik, és a pont távolsága a kör középpontjától 5 cm?',
        options: [
          'Végtelen sok pont (a körvonal összes pontja, kivéve az átmérő 2 végpontját)',
          'Pontosan 2 pont (a két pólus)',
          'Pontosan 4 pont',
          'Csak 1 pont'
        ],
        correctAnswer: 0,
        hint: 'A körvonal bármely pontja 5 cm-re van a középponttól, és a Thalész-tétel mindegyikre érvényes.',
        explanation: 'A Thalész-körvonal minden pontja pontosan 5 cm-re van a középponttól, és az átmérő végpontjait kivéve mindegyikből 90°-ban látszik a szakasz. Így végtelen sok ilyen pont van.'
      },
      {
        id: 'thq2-28',
        questionTypeBadge: 'Tompaszögű Pontok Tartománya',
        question: 'Adott egy AB = 10 cm hosszúságú szakasz. Hol helyezkednek el a síkban mindazon P pontok, amelyekre az APB háromszög tompaszögű a P csúcsnál?',
        options: [
          'Az AB mint átmérő fölé rajzolt nyílt körlapon (a Thalész-kör belsejében, az AB szakaszt kivéve)',
          'A Thalész-körön kívül',
          'Csak az AB szakasz felezőmerőlegesén',
          'A teljes síkon, kivéve magát a kört'
        ],
        correctAnswer: 0,
        hint: 'Ahol a szög nagyobb 90°-nál, az a körvonal által határolt belső tartomány.',
        explanation: 'A derékszögű látószög határvonala a Thalész-körvonal. A körön belül a látószög tompaszög (> 90°), kivéve magát az AB szakaszt, ahol a pontok egy egyenesre esnek.'
      },
      {
        id: 'thq2-29',
        questionTypeBadge: 'Speciális Derékszögű Magasság',
        question: 'Egy derékszögű háromszög átfogója c = 16 cm, egyik hegyesszöge 15°. Mekkora az átfogóhoz tartozó magasság (m_c)?',
        options: [
          '4 cm',
          '8 cm',
          '2 cm',
          '4√3 cm'
        ],
        correctAnswer: 0,
        hint: 'Rajzold meg a Thalész-kört! Az OC sugár és a kör középpontjából a C-hez húzott szög 2 · 15° = 30° lesz (középponti szög). Az O-ból vett magasság: R · sin(30°) = R / 2!',
        explanation: 'A Thalész-körben az OC sugár 8 cm. A középponti szög az átmérőhöz képest 2 · 15° = 30°. A C pont magassága az AB átmérőtől: m_c = R · sin(30°) = 8 · 0.5 = 4 cm (vagyis m_c = c / 4 = 16 / 4 = 4 cm).'
      },
      {
        id: 'thq2-30',
        questionTypeBadge: 'Téglalap és Thalész',
        question: 'Miért írható minden téglalap köré Thalész-kör?',
        options: [
          'Mert a téglalap átlói egyenlő hosszúak, felezik egymást, és mind a 4 csúcsnál 90°-os szög van',
          'Mert minden téglalap egyben négyzet is',
          'Mert a téglalap szemközti oldalai párhuzamosak',
          'Mert a területe a · b'
        ],
        correctAnswer: 0,
        hint: 'Az átló a téglalap körülírt körének átmérője.',
        explanation: 'A téglalap átlói egyenlő hosszúak és felezik egymást, metszéspontjuk egyenlő távol van mind a 4 csúcstól. Mindkét átló átmérőként szolgál, amelyre a csúcsok 90°-os szögben illeszkednek a Thalész-tétel miatt.'
      }
    ]
  }
};

export const ThalesQuiz: React.FC<ThalesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="10. Thalész tétele"
      subtitle="Az átmérőhöz tartozó kerületi szög, a tétel bizonyítása, megfordítása és a Thalész-kör mint mértani hely"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-thalesz"
      themeColor="indigo"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA"
      storageKey="grade9-thales-quiz"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      customGameModes={[
        {
          id: 'matcher',
          label: 'Párosító játék',
          icon: <ArrowRightLeft className="w-4 h-4" />,
          description: 'Keresd meg az összetartozó párokat!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <ThalesMatcher
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
            />
          )
        },
        {
          id: 'sorter',
          label: 'Csoportosító játék',
          icon: <LayoutGrid className="w-4 h-4" />,
          description: 'Válogasd szét a kategóriákba!',
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz }) => (
            <ThalesSorter
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onBack={onBack}
              onSwitchToTheory={onSwitchToTheory}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheatSheetCard
            title="Thalész Tétele"
            icon={<ThalesTheoremSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Kimondás:</strong> Kör átmérőjének két végét összekötve a körvonal bármely pontjával, a szög 90°</li>
              <li><strong>Feltétel:</strong> AB-nek átmérőnek kell lennie (át kell haladnia a középponton)</li>
              <li><strong>Félkörívhez tartozó kerületi szög:</strong> mindig derékszög</li>
              <li><strong>Kizárt pontok:</strong> A és B (itt nem értelmezhető háromszög)</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="A Bizonyítás Lépései"
            icon={<ThalesProofSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Kulcslépés:</strong> OC sugár behúzása (OA = OB = OC = R)</li>
              <li><strong>Egyenlő szárú háromszögek:</strong> AOC és BOC</li>
              <li><strong>Szögek:</strong> alapon fekvők egyenlők: α és α, β és β</li>
              <li><strong>Összeg:</strong> 2α + 2β = 180° → 2(α + β) = 180° → γ = α + β = 90°</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="A Tétel Megfordítása"
            icon={<Circle className="w-5 h-5 text-purple-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Megfordítás:</strong> Minden derékszögű háromszög derékszögű csúcsa illeszkedik az átfogó mint átmérő fölé rajzolt körre</li>
              <li><strong>Körülírt kör középpontja (O):</strong> Az átfogó felezőpontja</li>
              <li><strong>Körülírt kör sugara:</strong> R = c / 2</li>
              <li><strong>Átfogóhoz tartozó súlyvonal:</strong> s_c = R = c / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Mértani Hely & Látószögek"
            icon={<ThalesLocusSVG size={36} />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Körvonalon (P ∈ k, P ≠ A, B):</strong> Látószög = 90° (derékszög)</li>
              <li><strong>Körön belül (d &lt; R):</strong> Látószög &gt; 90° (tompaszög)</li>
              <li><strong>Körön kívül (d &gt; R):</strong> Látószög &lt; 90° (hegyesszög)</li>
              <li><strong>Sugárkapcsolat:</strong> 2R + 2r = a + b (derékszögűben)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};
