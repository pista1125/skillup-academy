import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FunctionConceptMatcher } from './FunctionConceptMatcher';
import { FunctionConceptSorter } from './FunctionConceptSorter';
import {
  MappingDiagramSvg,
  VerticalLineTestSvg,
  DomainRangeGraphSvg
} from './FunctionConceptFigures';
import { Split, Compass, Calculator, Hash } from 'lucide-react';

interface FunctionConceptQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Függvény Alapfogalmai (Könnyű)',
    subtitle: 'Egyértelmű hozzárendelés felismerése, változók elnevezése és nyíldiagramok.',
    range: '1 - 10. feladat',
    focus: 'Függvénydefiníció és Alapok',
    questions: [
      {
        id: 'fq1-1',
        questionTypeBadge: 'Függvény Definíciója',
        question: 'Melyik állítás fogalmazza meg helyesen a függvény fogalmát?',
        figure: <MappingDiagramSvg size={240} />,
        options: [
          'Az A halmaz minden eleméhez a B halmaz pontosan egy elemét rendeli hozzá',
          'Az A halmaz elemeihez tetszőlegesen sok B-beli elemet rendelhetünk',
          'Csak olyan hozzárendelés, amelynek a képlete egyenes',
          'Olyan kapcsolat, ahol x és y szorzata mindig nulla'
        ],
        correctAnswer: 0,
        hint: 'Két kulcsszó van: MINDEN eleméhez és PONTOSAN EGY elemet.',
        explanation: 'Függvénynek nevezünk minden olyan hozzárendelést, amely az értelmezési tartomány minden eleméhez a képhalmaz pontosan egy elemét rendeli hozzá.'
      },
      {
        id: 'fq1-2',
        questionTypeBadge: 'Változók Elnevezése',
        question: 'Hogyan nevezzük az f(x) = 3x - 5 összefüggésben az x változót?',
        options: ['Független változó (argumentum)', 'Függő változó (függvényérték)', 'Zérushely', 'Konstans paraméter'],
        correctAnswer: 0,
        hint: 'Az x értékét mi választjuk meg szabadon a tartományból.',
        explanation: 'Az x a független változó (bemenet), míg az y = f(x) a függő változó (kimenet).'
      },
      {
        id: 'fq1-3',
        questionTypeBadge: 'Egyértelműség Ellenőrzése',
        question: 'Függvény-e az a hozzárendelés, amely minden emberhez hozzárendeli az édesanyját?',
        options: [
          'Igen, mert minden embernek pontosan egy biológiai édesanyja van',
          'Nem, mert egy édesanyának több gyermeke is lehet',
          'Nem, mert az emberek nem számok',
          'Csak akkor, ha az ember felnőtt'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg: minden bemenethez (ember) pontosan egy kimenet (anya) tartozik-e!',
        explanation: 'Minden emberhez pontosan egyetlen biológiai édesanya tartozik, így a hozzárendelés egyértelmű, tehát függvény! (Az nem baj, hogy egy anyához több gyerek is tartozhat).'
      },
      {
        id: 'fq1-4',
        questionTypeBadge: 'Nem Függvény Példa',
        question: 'Függvény-e az a hozzárendelés, amely minden édesanyához hozzárendeli a gyermekeit?',
        options: [
          'Nem feltétlenül, mert akinek 2 vagy több gyermeke van, ahhoz több kimenet rendelődne',
          'Igen, mert a család szent',
          'Igen, minden hozzárendelés függvény',
          'Csak akkor nem, ha fiúgyermekről van szó'
        ],
        correctAnswer: 0,
        hint: 'Egyetlen bemenethez (édesanya) több kimenet (gyerek 1, gyerek 2) is tartozhat, ami sérti az egyértelműséget.',
        explanation: 'Ha egy édesanyának több gyermeke van, akkor hozzá több kimenet tartozna, ami ellentmond a függvény „pontosan egy kimenet” feltételének.'
      },
      {
        id: 'fq1-5',
        questionTypeBadge: 'Függőleges Vonal Teszt',
        question: 'Mi a függőleges vonal teszt lényege a koordinátasíkon?',
        figure: <VerticalLineTestSvg size={240} />,
        options: [
          'Ha bármely függőleges egyenes legfeljebb 1 pontban metszi a görbét, akkor a grafikon függvény',
          'A függőleges vonalnak legalább 3 pontban kell metszenie a görbét',
          'Csak függőleges egyeneseket szabad rajzolni a füzetbe',
          'A vízszintes tengelyt kell ellenőrizni vele'
        ],
        correctAnswer: 0,
        hint: 'A függőleges egyenes egy adott x értéket képvisel. Ha 2 pontban metsz, akkor ahhoz az x-hez két y tartozna.',
        explanation: 'Ha egy függőleges egyenes legfeljebb 1 pontban metszi a görbét, akkor minden x-hez legfeljebb egy y tartozik, tehát a görbe függvény grafikonja.'
      },
      {
        id: 'fq1-6',
        questionTypeBadge: 'Függvényérték Kiszámítása',
        question: 'Adott az f(x) = 4x - 7 függvény. Mennyi az f(3) helyettesítési érték?',
        options: ['5', '12', '-5', '7'],
        correctAnswer: 0,
        hint: 'Helyettesíts be x helyére 3-at: 4 · 3 - 7.',
        explanation: 'f(3) = 4 · 3 - 7 = 12 - 7 = 5.'
      },
      {
        id: 'fq1-7',
        questionTypeBadge: 'Értelmezési Tartomány Jele',
        question: 'Hogyan jelöljük a matematikában a függvény értelmezési tartományát?',
        options: ['D_f', 'R_f', 'f(x)', 'x_0'],
        correctAnswer: 0,
        hint: 'Az angol / francia Domain / Définition szóból származik a D betű.',
        explanation: 'D_f jelöli az értelmezési tartományt (Domain of f), míg R_f az értékkészletet (Range of f).'
      },
      {
        id: 'fq1-8',
        questionTypeBadge: 'Értékkészlet Jele',
        question: 'Hogyan jelöljük a függvény értékkészletét?',
        options: ['R_f', 'D_f', 'K_f', 'y_max'],
        correctAnswer: 0,
        hint: 'Az angol Range szóból származó R betű.',
        explanation: 'Az értékkészlet nemzetközi és magyar jelölése R_f.'
      },
      {
        id: 'fq1-9',
        questionTypeBadge: 'Zérushely Fogalma',
        question: 'Mit nevezünk a függvény zérushelyének?',
        options: [
          'Azon x értékeket, amelyekre a függvény értéke 0: f(x) = 0',
          'Azt a pontot, ahol x = 0',
          'Az origót kizárólag',
          'Ahol a függvény nem értelmezett'
        ],
        correctAnswer: 0,
        hint: 'Ahol a függvény kimenete nulla (grafikon metszi az x-tengelyt).',
        explanation: 'A zérushely az értelmezési tartomány azon eleme, amelyhez a függvény nullát rendel hozzá: f(x) = 0.'
      },
      {
        id: 'fq1-10',
        questionTypeBadge: 'Konstans Függvény',
        question: 'Függvény-e az f(x) = 5 hozzárendelés minden valós x-re?',
        options: [
          'Igen, ez egy konstans (állandó) függvény, vízszintes egyenes grafikonnal',
          'Nem, mert nincs benne x változó a jobb oldalon',
          'Nem, mert az értéke nem változik',
          'Csak x = 5 esetén'
        ],
        correctAnswer: 0,
        hint: 'Minden bemenethez pontosan egy kimenetet (az 5-öt) rendel, ami teljesen szabályos.',
        explanation: 'Az f(x) = 5 hozzárendelés tökéletesen megfelel a definíciónak: minden x-hez egyetlen kimenetet (5) rendel. Grafikonja vízszintes egyenes.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Értelmezési Tartomány és Kikötések (Közepes)',
    subtitle: 'Kikötések felírása (nevező ≠ 0, négyzetgyök ≥ 0) és értékkészlet meghatározása.',
    range: '11 - 20. feladat',
    focus: 'Kikötések és Intervallumok',
    questions: [
      {
        id: 'fq2-1',
        questionTypeBadge: 'Törtes Nevező Kikötése',
        question: 'Mi az f(x) = 1 / (x - 4) függvény értelmezési tartománya a valós számok halmazán?',
        options: ['ℝ \\ {4}', 'ℝ \\ {-4}', '[4; ∞[', 'ℝ'],
        correctAnswer: 0,
        hint: 'A tört nevezője nem lehet nulla: x - 4 ≠ 0.',
        explanation: 'x - 4 ≠ 0  =>  x ≠ 4. Az értelmezési tartomány az összes valós szám, kivéve a 4-et: D_f = ℝ \\ {4}.'
      },
      {
        id: 'fq2-2',
        questionTypeBadge: 'Négyzetgyökös Kikötés',
        question: 'Mi az f(x) = √(x - 3) függvény értelmezési tartománya a valós számok halmazán?',
        options: ['[3; ∞[ (x ≥ 3)', ']3; ∞[ (x > 3)', 'ℝ \\ {3}', '[-3; 3]'],
        correctAnswer: 0,
        hint: 'Valós számok körében négyzetgyök alatt nem állhat negatív szám: x - 3 ≥ 0.',
        explanation: 'x - 3 ≥ 0  =>  x ≥ 3. Tehát D_f = [3; ∞[.'
      },
      {
        id: 'fq2-3',
        questionTypeBadge: 'Másodfokú Függvény Értékkészlete',
        question: 'Mi az f(x) = x² alapfüggvény értékkészlete, ha D_f = ℝ?',
        options: ['[0; ∞[ (nemnegatív valós számok)', 'ℝ (minden valós szám)', ']0; ∞[ (csak pozitív számok)', '[-∞; 0]'],
        correctAnswer: 0,
        hint: 'Bármely valós szám négyzete nemnegatív (legalább 0).',
        explanation: 'Mivel x² ≥ 0 minden valós x-re, és a 0 értéket is felveszi (0² = 0), így R_f = [0; ∞[.'
      },
      {
        id: 'fq2-4',
        questionTypeBadge: 'Két Kikötés Egyidejűleg',
        question: 'Mi az f(x) = √(x + 2) / (x - 5) függvény értelmezési tartománya?',
        options: ['[-2; ∞[ \\ {5}', '[-2; 5]', 'ℝ \\ {-2; 5}', ']5; ∞['],
        correctAnswer: 0,
        hint: 'Gyök alatti: x + 2 ≥ 0 ➔ x ≥ -2. Nevező: x - 5 ≠ 0 ➔ x ≠ 5.',
        explanation: 'A gyök miatt x ≥ -2, a nevező miatt x ≠ 5. A kettő metszete: D_f = [-2; ∞[ \\ {5}.'
      },
      {
        id: 'fq2-5',
        questionTypeBadge: 'Grafikonról Leolvasott Df és Rf',
        question: 'Egy függvény grafikonja az x tengely mentén a [-3; 4] intervallum felett rajzolódik ki, és y tengely mentén az [-1; 3] magasságok között fut zárt végpontokkal. Mi a D_f és R_f?',
        figure: <DomainRangeGraphSvg size={240} />,
        options: ['D_f = [-3; 4] és R_f = [-1; 3]', 'D_f = [-1; 3] és R_f = [-3; 4]', 'D_f = ℝ és R_f = ℝ', 'D_f = [0; 4] és R_f = [0; 3]'],
        correctAnswer: 0,
        hint: 'D_f az x-tengelyi vetület, R_f az y-tengelyi vetület.',
        explanation: 'Az x-koordináták -3-tól 4-ig terjednek (D_f = [-3; 4]), az elért y értékek pedig -1-től 3-ig futnak (R_f = [-1; 3]).'
      },
      {
        id: 'fq2-6',
        questionTypeBadge: 'Abszolútérték Értékkészlete',
        question: 'Mi az f(x) = |x| + 3 függvény értékkészlete, ha D_f = ℝ?',
        options: ['[3; ∞[', '[0; ∞[', 'ℝ', '[-3; ∞['],
        correctAnswer: 0,
        hint: '|x| legkisebb értéke 0, ehhez adunk hozzá 3-at.',
        explanation: 'Mivel |x| ≥ 0, ezért |x| + 3 ≥ 3. A legkisebb érték 3 (x = 0-nál), így R_f = [3; ∞[.'
      },
      {
        id: 'fq2-7',
        questionTypeBadge: 'Zérushely Számítása',
        question: 'Mennyi az f(x) = 3x - 12 függvény zérushelye?',
        options: ['x = 4', 'x = -4', 'x = 12', 'x = 0'],
        correctAnswer: 0,
        hint: 'Oldd meg a 3x - 12 = 0 egyenletet!',
        explanation: '3x - 12 = 0  =>  3x = 12  =>  x = 4.'
      },
      {
        id: 'fq2-8',
        questionTypeBadge: 'Kör Görbéje',
        question: 'Miért nem lehet egy kör alakú görbe egyetlen függvény grafikonja sem?',
        figure: <VerticalLineTestSvg size={240} />,
        options: [
          'Mert van olyan függőleges egyenes, amely két pontban metszi a kört',
          'Mert a körnek nincs egyenlete',
          'Mert a kör területe π·r²',
          'Mert a kör zárt alakzat'
        ],
        correctAnswer: 0,
        hint: 'Egy x értékhez két különböző y pont is tartozik a körön (fent és lent).',
        explanation: 'A kör átmérője mentén húzott függőleges egyenes 2 pontban metszi a kört, ami sérti az egyértelmű hozzárendelés definícióját.'
      },
      {
        id: 'fq2-9',
        questionTypeBadge: 'Nevező Másodfokú Kikötése',
        question: 'Mi az f(x) = 5 / (x² - 9) függvény értelmezési tartománya?',
        options: ['ℝ \\ {-3; 3}', 'ℝ \\ {3}', 'ℝ \\ {9}', '[-3; 3]'],
        correctAnswer: 0,
        hint: 'x² - 9 ≠ 0 ➔ x² ≠ 9 ➔ x ≠ 3 és x ≠ -3.',
        explanation: 'A nevező zérushelyei x = 3 és x = -3, ezért mindkét számot ki kell zárni: D_f = ℝ \\ {-3; 3}.'
      },
      {
        id: 'fq2-10',
        questionTypeBadge: 'Függvényérték Számítása Képletből',
        question: 'Adott az f(x) = x² - 2x + 3 függvény. Mennyi az f(-2) értéke?',
        options: ['11', '3', '-5', '7'],
        correctAnswer: 0,
        hint: '(-2)² - 2·(-2) + 3 = 4 + 4 + 3.',
        explanation: 'f(-2) = (-2)² - 2(-2) + 3 = 4 + 4 + 3 = 11.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Függvényanalízis és Transzformációk (Nehéz)',
    subtitle: 'Paraméteres behelyettesítés, összetett gyökös/törtes Df és inverz kérdések.',
    range: '21 - 30. feladat',
    focus: 'Összetett Elemzések és Szabályok',
    questions: [
      {
        id: 'fq3-1',
        questionTypeBadge: 'Paraméteres Helyettesítés',
        question: 'Ha f(x) = 2x - 3, mivel egyenlő f(a + 1)?',
        options: ['2a - 1', '2a - 3', '2a + 2', '2a - 2'],
        correctAnswer: 0,
        hint: 'Helyettesíts be x helyére (a + 1)-et: 2(a + 1) - 3 = 2a + 2 - 3.',
        explanation: 'f(a + 1) = 2(a + 1) - 3 = 2a + 2 - 3 = 2a - 1.'
      },
      {
        id: 'fq3-2',
        questionTypeBadge: 'Tört Nevezőjében Gyök',
        question: 'Mi az f(x) = 1 / √(x - 2) függvény értelmezési tartománya?',
        options: [']2; ∞[ (x > 2)', '[2; ∞[ (x ≥ 2)', 'ℝ \\ {2}', '] -∞; 2['],
        correctAnswer: 0,
        hint: 'A gyök miatt x - 2 ≥ 0, de mivel a nevezőben van, nem lehet 0! Tehát x - 2 > 0.',
        explanation: 'A nevező nem lehet nulla, a gyök alatti kifejezés pedig nemnegatív, így a kettő együttes feltétele: x - 2 > 0 ➔ x > 2, azaz D_f = ]2; ∞[.'
      },
      {
        id: 'fq3-3',
        questionTypeBadge: 'Négyzetgyök alatti Szorzat',
        question: 'Mi az f(x) = √( (x - 1)(x - 5) ) függvény értelmezési tartománya?',
        options: [']-∞; 1] ∪ [5; ∞[', '[1; 5]', 'ℝ \\ {1; 5}', '[5; ∞['],
        correctAnswer: 0,
        hint: 'A szorzat akkor nemnegatív (≥ 0), ha mindkét tényező azonos előjelű (mindkettő negatív vagy mindkettő pozitív).',
        explanation: '(x - 1)(x - 5) ≥ 0, ha x ≤ 1 vagy x ≥ 5. Tehát D_f = ]-∞; 1] ∪ [5; ∞[.'
      },
      {
        id: 'fq3-4',
        questionTypeBadge: 'Másodfokú Függvény Értékkészlete',
        question: 'Mi az f(x) = -(x - 2)² + 5 függvény értékkészlete a valós számok halmazán?',
        options: [']-∞; 5]', '[5; ∞[', 'ℝ', '[0; 5]'],
        correctAnswer: 0,
        hint: 'A parabola lefelé nyílik (mínusz előjel). A csúcspont a maximum: y_max = 5.',
        explanation: 'Mivel -(x - 2)² ≤ 0, a legnagyobb felvehető érték 5 (amikor x = 2). Így R_f = ]-∞; 5].'
      },
      {
        id: 'fq3-5',
        questionTypeBadge: 'Inverz Hozzárendelés Feltétele',
        question: 'Mikor létezik egy f: A ➔ B függvénynek inverz függvénye (f⁻¹)?',
        options: [
          'Ha a hozzárendelés kölcsönösen egyértelmű (bijektív: minden kimenethez pontosan egy bemenet tartozik)',
          'Minden függvénynek mindig létezik inverze',
          'Csak akkor, ha a függvény grafikonja kör',
          'Ha a zérushelye nulla'
        ],
        correctAnswer: 0,
        hint: 'Visszafelé is függvénynek kell lennie: nem indulhat két nyíl egyetlen kimenetből visszafelé.',
        explanation: 'Inverz függvény csak akkor létezik, ha a függvény kölcsönösen egyértelmű (injektív és szürjektív), vagyis különböző x értékekhez különböző y értékek tartoznak.'
      },
      {
        id: 'fq3-6',
        questionTypeBadge: 'Függvények Összetétele (Kompozíció)',
        question: 'Legyen f(x) = 2x + 1 és g(x) = x². Mennyi az f(g(3)) összetett függvény értéke?',
        options: ['19', '49', '13', '37'],
        correctAnswer: 0,
        hint: 'Először számold ki a belső értéket: g(3) = 3² = 9. Majd f(9) = 2·9 + 1.',
        explanation: 'g(3) = 9. Ekkor f(g(3)) = f(9) = 2 · 9 + 1 = 19.'
      },
      {
        id: 'fq3-7',
        questionTypeBadge: 'Zérushelyek Száma',
        question: 'Hány zérushelye van az f(x) = x² - 4x + 4 függvénynek?',
        options: ['Pontosan 1 zérushelye van (x = 2)', '2 zérushelye van', 'Nincs valós zérushelye', 'Végtelen sok'],
        correctAnswer: 0,
        hint: 'Alakítsd teljes négyzetté: x² - 4x + 4 = (x - 2)². Mikor nulla egy négyzet?',
        explanation: '(x - 2)² = 0  =>  x = 2. A függvénynek pontosan 1 (kétszeres) zérushelye van, érinti az x-tengelyt.'
      },
      {
        id: 'fq3-8',
        questionTypeBadge: 'Törtes Függvény Értékkészlete',
        question: 'Mi az f(x) = 1 / x² függvény értékkészlete a D_f = ℝ \\ {0} halmazon?',
        options: [']0; ∞[ (szigorúan pozitív valós számok)', '[0; ∞[', 'ℝ \\ {0}', 'ℝ'],
        correctAnswer: 0,
        hint: 'x² mindig pozitív, 1 osztva pozitív számmal mindig pozitív, de a 0-t soha nem érheti el.',
        explanation: 'Mivel x² > 0 minden x ≠ 0-ra, ezért 1/x² > 0. A tört értéke tetszőlegesen nagy lehet, de 0-val nem lehet egyenlő, így R_f = ]0; ∞[.'
      },
      {
        id: 'fq3-9',
        questionTypeBadge: 'Paritás Fogalma',
        question: 'Milyen tulajdonságú az f(x) = x⁴ - 3x² függvény, ha f(-x) = f(x)?',
        options: [
          'Páros függvény (grafikonja szimmetrikus az y-tengelyre)',
          'Páratlan függvény (grafikonja szimmetrikus az origóra)',
          'Periodikus függvény',
          'Nem szimmetrikus'
        ],
        correctAnswer: 0,
        hint: '(-x)⁴ = x⁴ és (-x)² = x², tehát f(-x) = f(x).',
        explanation: 'Ha minden x-re f(-x) = f(x), a függvény páros, és grafikonja tükrös az y-tengelyre.'
      },
      {
        id: 'fq3-10',
        questionTypeBadge: 'Értelmezési Tartomány Érettségi Csapda',
        question: 'Egy derékszögű háromszög befogói x és x + 3. Az átfogó függvénye: c(x) = √(x² + (x+3)²). Mi a függvény geometriai értelmezési tartománya?',
        options: [']0; ∞[ (x > 0)', 'ℝ', '[-3; ∞[', '[0; ∞['],
        correctAnswer: 0,
        hint: 'A geometria világában egy szakasz hossza szigorúan pozitív valós szám!',
        explanation: 'Bár a gyök algebrailag negatív számokra is értelmezhető lenne, egy háromszög oldalának hossza szigorúan pozitív kell legyen (x > 0), így D_f = ]0; ∞[.'
      }
    ]
  }
};

const functionConceptCheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A függvény definíciója',
    description: 'Hozzárendelés A halmazból B halmazba: A minden eleméhez B pontosan egy elemét rendeli.',
    formula: 'f: A ➔ B | x ↦ f(x)',
    badge: 'Alapdefiníció',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    title: 'Függőleges vonal teszt',
    description: 'Bármely függőleges egyenes legfeljebb 1 pontban metszi a görbét ➔ Függvény.',
    formula: 'Metszéspontok száma ≤ 1',
    badge: 'Grafikus teszt',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    title: 'Kikötési alapszabályok',
    description: '1. Nevező ≠ 0 (nullával nem osztunk). 2. Páros gyök alatti kifejezés ≥ 0.',
    formula: '1 / g(x) ➔ g(x) ≠ 0 | √h(x) ➔ h(x) ≥ 0',
    badge: 'Kikötések',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    title: 'Df és Rf tengelyei',
    description: 'Df (Értelmezési tartomány) mindig az x-tengelyen. Rf (Értékkészlet) mindig az y-tengelyen.',
    formula: 'x ∈ D_f ➔ y ∈ R_f',
    badge: 'Tengelyek',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  }
];

export const FunctionConceptQuiz: React.FC<FunctionConceptQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="5. A függvény fogalma Kvíz"
      subtitle="Sajátítsd el az egyértelmű hozzárendelés, a Df és Rf kikötéseinek és a függőleges vonal tesztnek a szabályait 3 szinten!"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 5. A FÜGGVÉNY FOGALMA"
      chapterId="fuggvenyek"
      topicId="g9-func-fogalom-quiz"
      topicTitle="5. A függvény fogalma"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetTitle="Függvényfogalom Segédlet"
      cheatSheetCards={functionConceptCheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={
        <FunctionConceptMatcher
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <FunctionConceptSorter
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

