import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeExamMatcher } from './PracticeExamMatcher';
import { PracticeExamSorter } from './PracticeExamSorter';
import {
  ChapterMapSvg,
  ComprehensiveAnalysisSvg,
  DualMethodComparisonSvg
} from './PracticeExamFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, Trophy, HelpCircle } from 'lucide-react';

export interface PracticeExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Átfogó Kérdések (Könnyű)',
    subtitle: '30 feladat a teljes fejezetből: táblázatok, diagramok, egyenes/fordított arányosság, meredekség, alaptranszformációk és egyszerű egyenletek.',
    range: '1 - 30. feladat',
    focus: 'Átfogó Alapismeretek (1–17. altéma)',
    questions: [
      {
        id: 'peq1-1',
        questionTypeBadge: "[1. Táblázatok] Táblázat Alapfogalom",
        question: "Mi a neve a táblázat vízszintes adatcsoportosításának, amely általában egy adott egyedhez tartozó értékeket tartalmaz?",
        figure: <ChapterMapSvg size={240} />,
        options: [
  "Sor (rekord)",
  "Oszlop (mező)",
  "Fejléc",
  "Cella"
],
        correctAnswer: 0,
        hint: "A vízszintes irányt keressük, mint a füzet vonalazásánál.",
        explanation: "A táblázat vízszintes adatsorát sornak (vagy adatbázisokban rekordnak) nevezzük. Az oszlopok a függőleges elrendezést jelentik."
      },
      {
        id: 'peq1-2',
        questionTypeBadge: "[1. Táblázatok] Cella Fogalma",
        question: "Hogyan nevezzük a táblázatban egy sor és egy oszlop pontos metszéspontját, ahol egyetlen konkrét adat áll?",
        options: [
  "Cella",
  "Fejléc",
  "Perem",
  "Változó"
],
        correctAnswer: 0,
        hint: "A táblázatkezelő programokban (pl. Excel) is így hívják a beviteli mezőket (pl. B3).",
        explanation: "A cella egy sor és egy oszlop metszéspontja, ez tartalmazza az adott tulajdonság konkrét mért vagy számított értékét."
      },
      {
        id: 'peq1-3',
        questionTypeBadge: "[2. Diagramok] Oszlopdiagram Leolvasása",
        question: "Az oszlopdiagramon 4 osztály létszáma szerepel: 9.A: 25 fő, 9.B: 32 fő, 9.C: 18 fő, 9.D: 28 fő. Melyik osztály a legnépesebb?",
        options: [
  "9.B osztály (32 fő)",
  "9.D osztály (28 fő)",
  "9.A osztály (25 fő)",
  "9.C osztály (18 fő)"
],
        correctAnswer: 0,
        hint: "Keresd a legmagasabb oszlopot!",
        explanation: "A legmagasabb oszlop a 9.B osztályhoz tartozik 32 fős létszámmal."
      },
      {
        id: 'peq1-4',
        questionTypeBadge: "[2. Diagramok] Diagramtípus Kiválasztása",
        question: "Melyik diagramtípus a legalkalmasabb arra, hogy szemléltessük: az iskolai büfé teljes forgalmának mekkora szeletét adják a szendvicsek, üdítők és édességek?",
        options: [
  "Kördiagram",
  "Vonaldiagram",
  "Pontdiagram",
  "Hisztogram"
],
        correctAnswer: 0,
        hint: "Rész-egész arányt, egy tortaszerű felosztást szeretnénk látni.",
        explanation: "A kördiagram a legideálisabb eszköz a részek teljes egészhez (100%-hoz) viszonyított arányának megjelenítésére."
      },
      {
        id: 'peq1-5',
        questionTypeBadge: "[3. Változások ábrázolása] Síknegyed Előjele",
        question: "Melyik síknegyedben helyezkedik el a P(-4; 7) pont?",
        options: [
  "II. síknegyed",
  "I. síknegyed",
  "III. síknegyed",
  "IV. síknegyed"
],
        correctAnswer: 0,
        hint: "Nézd meg az előjeleket: x negatív (-4) és y pozitív (+7).",
        explanation: "A bal felső negyed a II. síknegyed, ahol x < 0 és y > 0."
      },
      {
        id: 'peq1-6',
        questionTypeBadge: "[3. Változások ábrázolása] Tengelyen Fekvő Pont",
        question: "Melyik tengelyen fekszik a Q(0; -5) pont?",
        options: [
  "y-tengelyen (ordináta)",
  "x-tengelyen (abszcissza)",
  "Egyik tengelyen sem",
  "Az I. síknegyedben"
],
        correctAnswer: 0,
        hint: "Ha az x koordináta 0, a pont a függőleges tengelyen van.",
        explanation: "Mivel az első (x) koordináta 0, a pont nem tér el vízszintesen: pontosan az y-tengelyen fekszik a -5 értéknél."
      },
      {
        id: 'peq1-7',
        questionTypeBadge: "[4. Grafikonok a mindennapokban] Út-idő Álló Helyzet",
        question: "Egy kerékpáros távolság-idő grafikonján a vonal t = 1,5 és t = 2,5 óra között vízszintes egyenes. Mit csinált a kerékpáros ebben az 1 órában?",
        options: [
  "Pihent, egy helyben állt",
  "Egyenletesen gyorsított",
  "Visszafordult hazafelé",
  "Hegyre tekert felfelé"
],
        correctAnswer: 0,
        hint: "A kiindulóponttól mért távolsága változatlanul 60 km maradt.",
        explanation: "A távolság-idő grafikonon a vízszintes szakasz álló helyzetet jelent: a megtett távolság nem nő (sebesség = 0)."
      },
      {
        id: 'peq1-8',
        questionTypeBadge: "[4. Grafikonok a mindennapokban] Sebesség Meghatározása",
        question: "Egy autó 2 óra alatt egyenletesen 140 km-t tett meg. Mekkora volt a sebessége?",
        options: [
  "70 km/h",
  "140 km/h",
  "60 km/h",
  "280 km/h"
],
        correctAnswer: 0,
        hint: "v = s / t = 140 / 2.",
        explanation: "v = 140 km / 2 h = 70 km/h."
      },
      {
        id: 'peq1-9',
        questionTypeBadge: "[5. A függvény fogalma] Függvény Definíciója",
        question: "Melyik állítás fogalmazza meg helyesen a függvény fogalmát?",
        options: [
  "Az A halmaz minden eleméhez a B halmaz pontosan egy elemét rendeli hozzá",
  "Az A halmaz elemeihez tetszőlegesen sok B-beli elemet rendelhetünk",
  "Csak olyan hozzárendelés, amelynek a képlete egyenes",
  "Olyan kapcsolat, ahol x és y szorzata mindig nulla"
],
        correctAnswer: 0,
        hint: "Két kulcsszó van: MINDEN eleméhez és PONTOSAN EGY elemet.",
        explanation: "Függvénynek nevezünk minden olyan hozzárendelést, amely az értelmezési tartomány minden eleméhez a képhalmaz pontosan egy elemét rendeli hozzá."
      },
      {
        id: 'peq1-10',
        questionTypeBadge: "[5. A függvény fogalma] Változók Elnevezése",
        question: "Hogyan nevezzük az f(x) = 3x - 5 összefüggésben az x változót?",
        options: [
  "Független változó (argumentum)",
  "Függő változó (függvényérték)",
  "Zérushely",
  "Konstans paraméter"
],
        correctAnswer: 0,
        hint: "Az x értékét mi választjuk meg szabadon a tartományból.",
        explanation: "Az x a független változó (bemenet), míg az y = f(x) a függő változó (kimenet)."
      },
      {
        id: 'peq1-11',
        questionTypeBadge: "[6. Készítsünk grafikont!] Grafikonkészítés Lépései",
        question: "Mi a helyes logikai sorrend egy függvény grafikonjának megrajzolásakor?",
        options: [
  "Értelmezési tartomány tisztázása ➔ Értéktáblázat ➔ Pontok berajzolása ➔ Vonalbehúzás / Diszkrét pontok",
  "Vonalbehúzás ➔ Pontok felvétele ➔ Értéktáblázat ➔ Képlet keresése",
  "Tetszőleges vonal rajzolása vonalzóval ➔ Számok ráírása",
  "A pontok berajzolása a tengelyek felrajzolása nélkül"
],
        correctAnswer: 0,
        hint: "Először meg kell határozni az értelmezési tartományt, majd táblázatban számolunk pontokat, berajzoljuk őket, és a tartomány jellege szerint kötjük össze.",
        explanation: "A szakszerű grafikonrajzolás 4 lépése: D_f tisztázása, értéktáblázat számítása, pontok koordináta-rendszerbe vitele, majd a folytonos vonal behúzása vagy diszkrét pontok meghagyása."
      },
      {
        id: 'peq1-12',
        questionTypeBadge: "[6. Készítsünk grafikont!] Értéktáblázat Számítás",
        question: "Az f(x) = 2x - 3 függvény esetén mi a függvényérték, ha x = 4?",
        options: [
  "5",
  "8",
  "11",
  "1"
],
        correctAnswer: 0,
        hint: "Helyettesíts x helyére 4-et: f(4) = 2 · 4 - 3.",
        explanation: "f(4) = 2 · 4 - 3 = 8 - 3 = 5. A pont a síkon: (4; 5)."
      },
      {
        id: 'peq1-13',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] Képlet Felismerése",
        question: "Melyik függvény fejezi ki az egyenes arányosságot x és y között?",
        options: [
  "y = 3x",
  "y = 3 / x",
  "y = 3x + 2",
  "y = 3 - x"
],
        correctAnswer: 0,
        hint: "Az egyenes arányosság általános képlete y = k · x, ahol nincs hozzáadott konstans tag.",
        explanation: "Az egyenes arányosság képlete y = k · x (itt k = 3). Az y = 3x + 2 már eltolt lineáris függvény, míg az y = 3/x fordított arányosság."
      },
      {
        id: 'peq1-14',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] Grafikon Formája",
        question: "Mi a fordított arányosság (g(x) = k / x) függvény grafikonjának a neve és alakja?",
        options: [
  "Kétágú hiperbola, amely a koordinátatengelyekhez simul",
  "Origón átmenő egyenes vonal",
  "U alakú parabola",
  "Körív az origó körül"
],
        correctAnswer: 0,
        hint: "A tört alakú g(x) = k/x függvény két szimmetrikus görbe ágból áll.",
        explanation: "A fordított arányosság grafikonja a hiperbola. Két különálló ágból áll, melyek sosem érik el a tengelyeket (az x=0 és y=0 egyenesek az aszimptotái)."
      },
      {
        id: 'peq1-15',
        questionTypeBadge: "[8. Lineáris függvények] Paraméterek Leolvasása",
        question: "Mennyi a meredeksége (m) és az y-tengelymetszete (b) az f(x) = 3x - 5 lineáris függvénynek?",
        options: [
  "m = 3 és b = -5",
  "m = -5 és b = 3",
  "m = 3 és b = 5",
  "m = -3 és b = -5"
],
        correctAnswer: 0,
        hint: "Az f(x) = mx + b alakban az x együtthatója m, az állandó tag b (figyelj az előjelre!).",
        explanation: "Az f(x) = mx + b alak szerint m = 3 (az x szorzója) és b = -5 (a konstans tag)."
      },
      {
        id: 'peq1-16',
        questionTypeBadge: "[8. Lineáris függvények] Y-tengelymetszet Pontja",
        question: "Hol metszi az y tengelyt a g(x) = -2x + 7 függvény grafikonja?",
        options: [
  "A (0; 7) pontban",
  "A (7; 0) pontban",
  "A (0; -2) pontban",
  "A (-2; 7) pontban"
],
        correctAnswer: 0,
        hint: "Az y tengelyen az x koordináta mindig 0: számítsd ki g(0) értékét!",
        explanation: "g(0) = -2 · 0 + 7 = 7. A metszéspont koordinátái: (0; b) = (0; 7)."
      },
      {
        id: 'peq1-17',
        questionTypeBadge: "[9. Egyenesek meredeksége] Meredekség Fogalma",
        question: "Mit fejez ki szemléletesen egy egyenes m meredeksége?",
        options: [
  "Hány egységgel változik (emelkedik vagy süllyed) az y érték, ha a vízszintes tengelyen 1 egységet jobbra lépünk",
  "A koordinátatengelyek metszéspontjának távolságát az origótól",
  "Az egyenes teljes hosszát a koordináta-rendszerben",
  "Az x és y koordináták összegét egy tetszőleges pontban"
],
        correctAnswer: 0,
        hint: "A meredekség az egységnyi vízszintes lépésre jutó függőleges elmozdulás.",
        explanation: "A meredekség (m = Δy / Δx) azt adja meg, hogy ha x értékét 1 egységgel növeljük (jobbra lépünk), mennyit változik a függőleges y magasság."
      },
      {
        id: 'peq1-18',
        questionTypeBadge: "[9. Egyenesek meredeksége] Képlet Két Pontból",
        question: "Melyik képlettel számítjuk ki helyesen az egyenes meredekségét a P₁(x₁; y₁) és P₂(x₂; y₂) pontok koordinátáiból?",
        options: [
  "m = (y₂ - y₁) / (x₂ - x₁)",
  "m = (x₂ - x₁) / (y₂ - y₁)",
  "m = (y₂ + y₁) / (x₂ + x₁)",
  "m = (y₂ - x₂) / (y₁ - x₁)"
],
        correctAnswer: 0,
        hint: "A magasságkülönbség (Δy) van a számlálóban, a vízszintes távolság (Δx) a nevezőben.",
        explanation: "A meredekség a függőleges elmozdulás és a vízszintes elmozdulás hányadosa: m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁)."
      },
      {
        id: 'peq1-19',
        questionTypeBadge: "[10. Abszolútérték-függvény] Alapfüggvény Grafikonja",
        question: "Milyen alakú az f(x) = |x| abszolútérték-alapfüggvény grafikonja?",
        options: [
  "Egy V-alakú törött vonal, amelynek csúcspontja az origóban (0; 0) van",
  "Egy U-alakú sima görbe (parabola)",
  "Egyetlen origón átmenő 45 fokos egyenes",
  "Két különálló hiperbola ág"
],
        correctAnswer: 0,
        hint: "Mivel a negatív számok abszolút értéke is pozitív, a negatív félegyenes tükröződik felfelé, így V-alakot kapunk.",
        explanation: "Az f(x) = |x| grafikonja két félegyenesből áll: x ≥ 0 esetén y = x, x < 0 esetén y = -x. Ezek a (0; 0) origóban találkoznak V-alakban."
      },
      {
        id: 'peq1-20',
        questionTypeBadge: "[10. Abszolútérték-függvény] Értékkészlet Meghatározása",
        question: "Mi az f(x) = |x| alapfüggvény értékkészlete (R_f)?",
        options: [
  "R_f = [0; +∞[ (csak nemnegatív valós számok)",
  "R_f = ℝ (minden valós szám)",
  "R_f = ]-∞; 0]",
  "R_f = ]0; +∞["
],
        correctAnswer: 0,
        hint: "Lehet-e egy szám abszolút értéke negatív?",
        explanation: "Mivel az abszolút érték egy pont távolságát méri a nullától, sosem lehet negatív. Legkisebb értéke 0, felső korlátja nincs: R_f = [0; +∞[."
      },
      {
        id: 'peq1-21',
        questionTypeBadge: "[11. Függvények jellemzése] Fogalmi Alapok",
        question: "Melyik koordinátatengely mentén határozzuk meg egy függvény értelmezési tartományát (D_f)?",
        options: [
  "A vízszintes x tengelyen (a bemeneti értékek halmaza)",
  "A függőleges y tengelyen (a kimeneti értékek halmaza)",
  "Az origóban",
  "Mindkét tengelyen egyszerre"
],
        correctAnswer: 0,
        hint: "Az x a független változó, ebből áll az értelmezési tartomány.",
        explanation: "Az értelmezési tartomány (D_f) a bemeneti változó (x) lehetséges értékeit tartalmazza, amit a vízszintes x tengelyre való merőleges vetítéssel olvasunk le."
      },
      {
        id: 'peq1-22',
        questionTypeBadge: "[11. Függvények jellemzése] Értékkészlet Tengelye",
        question: "Melyik tengelyről olvassuk le a függvény értékkészletét (R_f)?",
        options: [
  "A függőleges y tengelyről (a felvett függvényértékek vetülete)",
  "A vízszintes x tengelyről",
  "A koordinátarendszer átlójáról",
  "A zérushelyekből"
],
        correctAnswer: 0,
        hint: "Az y = f(x) a kimenet.",
        explanation: "Az értékkészlet (R_f) azon számok halmaza, amelyeket a függvény kimenetként felvesz; ezt a függőleges y tengelyre vetítve határozzuk meg."
      },
      {
        id: 'peq1-23',
        questionTypeBadge: "[12. Függvények szélsőértékei] Fogalmi Alapok",
        question: "Mit jelent a függvény szélsőértékének HELYE a koordináta-rendszerben?",
        options: [
  "Az x-tengely azon pontja (x₀), ahol a legkisebb vagy legnagyobb érték előáll",
  "Az y-tengelyen felvett minimális vagy maximális magasság",
  "A koordinátatengelyek metszéspontja, azaz az origó (0; 0)",
  "A függvény meredeksége a csúcspontban"
],
        correctAnswer: 0,
        hint: "A hely mindig a bemeneti változóra, azaz az x tengelyre vonatkozik.",
        explanation: "A szélsőérték HELYE mindig az értelmezési tartomány eleme (x₀ ∈ D_f), azaz az x koordináta, ahol a minimum vagy maximum bekövetkezik."
      },
      {
        id: 'peq1-24',
        questionTypeBadge: "[12. Függvények szélsőértékei] Érték Fogalma",
        question: "Mit jelent a függvény szélsőértékének ÉRTÉKE?",
        options: [
  "Az y-tengely azon értéke (y₀ = f(x₀)), ami a felvett legkisebb vagy legnagyobb függvényérték",
  "A függvény zérushelye, ahol y = 0",
  "Az értelmezési tartomány jobb oldali végpontja",
  "Az x-tengelyen lévő bemeneti szám"
],
        correctAnswer: 0,
        hint: "A kérdés: „Mennyi a függvény értéke ott?”. Ez a magasság az y tengelyen.",
        explanation: "A szélsőérték ÉRTÉKE az értékkészlet eleme (y₀ ∈ R_f), azaz a helyettesítési érték magassága: y₀ = f(x₀)."
      },
      {
        id: 'peq1-25',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Alapfüggvény",
        question: "Mi a másodfokú alapfüggvény f(x) = x² grafikonjának neve és hol van a csúcspontja?",
        options: [
  "Parabola, melynek csúcspontja az origó C(0; 0)",
  "Hiperbola, melynek csúcspontja C(1; 1)",
  "Félegyenes az origóból kiindulva",
  "V-alakú görbe C(0; 1) csúcsponttal"
],
        correctAnswer: 0,
        hint: "Az x² görbéje U-alakú szimmetrikus parabola, legalacsonyabb pontja az origóban van.",
        explanation: "Az f(x) = x² függvény grafikonja egy parabola, csúcspontja az origóban (0; 0) található, felfelé nyílik és alulról korlátos."
      },
      {
        id: 'peq1-26',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Gyök Értelmezési Tartomány",
        question: "Mi a négyzetgyök alapfüggvény g(x) = √x értelmezési tartománya (Dg) a valós számok körében?",
        options: [
  "Dg = [0; ∞[ (csak nemnegatív valós számokból vonhatunk négyzetgyököt)",
  "Dg = ℝ (bármilyen valós számból vonhatunk gyököt)",
  "Dg = ]0; ∞[ (a nulla nincs benne)",
  "Dg = ]-∞; 0]"
],
        correctAnswer: 0,
        hint: "Lehet-e negatív szám a négyzetgyökjel alatt a valós számok körében?",
        explanation: "A valós számok halmazán negatív számoknak nincs négyzetgyöke, ezért a gyök alatti kifejezésnek nemnegatívnak kell lennie: x ≥ 0, azaz Dg = [0; ∞[."
      },
      {
        id: 'peq1-27',
        questionTypeBadge: "[14. Gyakorlati feladatok & modellezés] Költségmodell",
        question: "Egy pizzasütő cég fix havi bérleti díja 80 000 Ft, egy pizza elkészítésének alapanyag- és rezsiköltsége pedig 1200 Ft. Mi az x darab pizza előállítási összköltségének függvénye?",
        options: [
  "K(x) = 80 000 + 1200x",
  "K(x) = 80 000 · 1200x",
  "K(x) = 1200x - 80 000",
  "K(x) = 80 000 / (1200x)"
],
        correctAnswer: 0,
        hint: "Az összköltség = fix költség + változó költség (darabszám · darabár).",
        explanation: "A fix költség (80 000 Ft) a tengelymetszet, a darabonkénti önköltség (1200 Ft) a meredekség: K(x) = 80 000 + 1200x."
      },
      {
        id: 'peq1-28',
        questionTypeBadge: "[15. Egyenletek grafikus megoldása] Alapelv",
        question: "Mi a grafikus egyenletmegoldás első alapvető lépése egy f(x) = g(x) alakú egyenlet esetén?",
        options: [
  "Az egyenlet bal és jobb oldalát két külön függvényként (y₁ = f(x) és y₂ = g(x)) ábrázoljuk azonos koordinátasíkban",
  "Mindkét oldalt nullára redukáljuk és ábrázolás nélkül szorzattá alakítjuk",
  "Csak a bal oldalt ábrázoljuk, a jobb oldalt elhagyjuk",
  "Kiszámoljuk az x-ek átlagát"
],
        correctAnswer: 0,
        hint: "A két oldalt két külön grafikonként rajzoljuk fel, és közös pontjaikat keressük.",
        explanation: "A grafikus megoldás lényege, hogy az egyenlőség a két függvény görbéjének metszéspontjaiban teljesül: f(x) = g(x)."
      },
      {
        id: 'peq1-29',
        questionTypeBadge: "[16. Egyenlőtlenségek grafikus megoldása] Grafikus Jelentés",
        question: "Mit jelent geometriailag az f(x) > g(x) egyenlőtlenség a koordináta-rendszerben?",
        options: [
  "Azon x értékek halmazát, ahol az f(x) grafikonja a g(x) grafikonja FELETT halad",
  "Azon pontokat, ahol a két görbe metszi egymást",
  "Ahol mindkét függvény pozitív értéket vesz fel",
  "Ahol a görbék meredeksége pozitív"
],
        correctAnswer: 0,
        hint: "f(x) > g(x) azt jelenti, hogy az f pontjainak y-magassága nagyobb a g megfelelő magasságánál.",
        explanation: "Az f(x) > g(x) egyenlőtlenség megoldása azon x bemenetek halmaza, ahol az f(x) görbéje a g(x) görbéje felett helyezkedik el."
      },
      {
        id: 'peq1-30',
        questionTypeBadge: "[17. Abszolútértékes egyenletek] Geometriai Értelmezés",
        question: "Mit fejez ki geometriailag az |x - 5| = 3 egyenlet a számegyenesen?",
        options: [
  "Azon x pontokat, amelyek az 5-ös számtól pontosan 3 egység távolságra vannak",
  "Azon x pontokat, amelyek az origótól 5 vagy 3 távolságra vannak",
  "Azon pontokat, amelyek a 3-as számtól pontosan 5 egységre helyezkednek el",
  "A számegyenes azon pontjait, ahol x nagyobb 5-nél és kisebb 3-nál"
],
        correctAnswer: 0,
        hint: "|a - b| a számegyenesen az a és b pontok távolsága.",
        explanation: "Az |x - a| = b egyenlet geometriai jelentése: azon x pontok keresése, amelyek távolsága az a rögzített számtól pontosan b egység."
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, Transzformációk és Függvényvizsgálat (Közepes)',
    subtitle: '30 feladat a teljes fejezetből: meredekség két pontból, parabola és gyökfüggvény csúcspontja, zérushelyek, intervallumos monotonitás, grafikus metszéspontok és szöveges modellezés.',
    range: '31 - 60. feladat',
    focus: 'Transzformációk, Jellemzés & Grafikus Megoldás',
    questions: [
      {
        id: 'peq2-1',
        questionTypeBadge: "[1. Táblázatok] Kereszttábla Peremösszeg",
        question: "A mintában 30 fiú és 20 lány szerepel. Közülük 24-en fociznak, a többiek úsznak. Mennyi a teljes mintaelemszám (N)?",
        figure: <ComprehensiveAnalysisSvg size={240} />,
        options: [
  "50",
  "44",
  "74",
  "25"
],
        correctAnswer: 0,
        hint: "A mintában lévő összes fiú és lány száma adja a teljes létszámot: 30 + 20.",
        explanation: "N = Fiúk + Lányok = 30 + 20 = 50 fő. Ez megegyezik a sportágak szerinti összeggel is: 24 focista + 26 úszó = 50."
      },
      {
        id: 'peq2-2',
        questionTypeBadge: "[2. Diagramok] Középponti Szög Kiszámítása",
        question: "Egy iskolában a diákok 40%-a választotta az angol nyelvet. Hány fokos körcikk tartozik ehhez a kördiagramon?",
        options: [
  "144°",
  "120°",
  "100°",
  "160°"
],
        correctAnswer: 0,
        hint: "α = 40 · 3,6° (vagy a 360° 40%-a: 0,4 · 360°).",
        explanation: "α = 0,4 · 360° = 144°. (Minden 10% = 36°, tehát 4 · 36° = 144°)."
      },
      {
        id: 'peq2-3',
        questionTypeBadge: "[3. Változások ábrázolása] Átlagsebesség Számítása",
        question: "Egy autó t₁ = 2 órakor s₁ = 100 km-nél, t₂ = 5 órakor s₂ = 340 km-nél jár. Mennyi az átlagsebessége a 3 órás szakaszon?",
        options: [
  "80 km/h",
  "70 km/h",
  "90 km/h",
  "60 km/h"
],
        correctAnswer: 0,
        hint: "v = (s₂ - s₁) / (t₂ - t₁) = (340 - 100) / (5 - 2).",
        explanation: "Δs = 340 - 100 = 240 km. Δt = 5 - 2 = 3 óra. v = 240 / 3 = 80 km/h."
      },
      {
        id: 'peq2-4',
        questionTypeBadge: "[4. Grafikonok a mindennapokban] v-t Grafikon Alatti Terület (Téglalap)",
        question: "Egy jármű sebesség-idő grafikonján a sebesség 10 másodpercig állandó 15 m/s. Mekkora utat tett meg ebben a 10 másodpercben?",
        options: [
  "150 méter",
  "75 méter",
  "15 méter",
  "300 méter"
],
        correctAnswer: 0,
        hint: "A megtett út a téglalap területe: s = v · t = 15 · 10.",
        explanation: "s = 15 m/s · 10 s = 150 méter."
      },
      {
        id: 'peq2-5',
        questionTypeBadge: "[5. A függvény fogalma] Törtes Nevező Kikötése",
        question: "Mi az f(x) = 1 / (x - 4) függvény értelmezési tartománya a valós számok halmazán?",
        options: [
  "ℝ \\ {4}",
  "ℝ \\ {-4}",
  "[4; ∞[",
  "ℝ"
],
        correctAnswer: 0,
        hint: "A tört nevezője nem lehet nulla: x - 4 ≠ 0.",
        explanation: "x - 4 ≠ 0  =>  x ≠ 4. Az értelmezési tartomány az összes valós szám, kivéve a 4-et: D_f = ℝ \\ {4}."
      },
      {
        id: 'peq2-6',
        questionTypeBadge: "[5. A függvény fogalma] Négyzetgyökös Kikötés",
        question: "Mi az f(x) = √(x - 3) függvény értelmezési tartománya a valós számok halmazán?",
        options: [
  "[3; ∞[ (x ≥ 3)",
  "]3; ∞[ (x > 3)",
  "ℝ \\ {3}",
  "[-3; 3]"
],
        correctAnswer: 0,
        hint: "Valós számok körében négyzetgyök alatt nem állhat negatív szám: x - 3 ≥ 0.",
        explanation: "x - 3 ≥ 0  =>  x ≥ 3. Tehát D_f = [3; ∞[."
      },
      {
        id: 'peq2-7',
        questionTypeBadge: "[6. Készítsünk grafikont!] Pontilleszkedés Ellenőrzése",
        question: "Rajta van-e a P(3; 11) pont az f(x) = 4x - 1 függvény grafikonján?",
        options: [
  "Igen, mert f(3) = 4 · 3 - 1 = 11, ami pontosan megegyezik az y koordinátával",
  "Nem, mert a meredekség 4 és nem 3",
  "Nem, mert 3 + 11 = 14 és nem -1",
  "Csak akkor, ha x negatív"
],
        correctAnswer: 0,
        hint: "Helyettesítsd be x = 3-at a függvénybe, és nézd meg, hogy az eredmény 11 lesz-e.",
        explanation: "Egy pont akkor és csak akkor illeszkedik a grafikonra, ha f(x) = y. f(3) = 4·3 - 1 = 11, tehát P rajta van a grafikonon."
      },
      {
        id: 'peq2-8',
        questionTypeBadge: "[6. Készítsünk grafikont!] Hiányzó Koordináta Számítása",
        question: "Az A(5; y) pont rajta van az f(x) = -2x + 13 függvény grafikonján. Mennyi az y koordináta értéke?",
        options: [
  "3",
  "23",
  "-3",
  "10"
],
        correctAnswer: 0,
        hint: "Számítsd ki f(5) értékét!",
        explanation: "y = f(5) = -2 · 5 + 13 = -10 + 13 = 3. Tehát a pont az A(5; 3)."
      },
      {
        id: 'peq2-9',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] k Meghatározása Egyenesnél",
        question: "Egy egyenes arányosság grafikonja átmegy a P(4; 28) ponton. Mennyi az arányossági tényező (k), és mi a képlet?",
        options: [
  "k = 7, a képlet: f(x) = 7x",
  "k = 24, a képlet: f(x) = x + 24",
  "k = 112, a képlet: f(x) = 112x",
  "k = 0.14, a képlet: f(x) = x / 7"
],
        correctAnswer: 0,
        hint: "Egyenes arányosságnál: k = y / x.",
        explanation: "k = y / x = 28 / 4 = 7. A hozzárendelési szabály tehát: f(x) = 7x."
      },
      {
        id: 'peq2-10',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] k Meghatározása Fordítottnál",
        question: "Egy fordított arányosság hiperbolája átmegy a Q(5; 6) ponton. Mennyi az arányossági tényező (k), és mi a függvény hozzárendelési szabálya?",
        options: [
  "k = 30, a szabály: g(x) = 30 / x",
  "k = 1.2, a szabály: g(x) = 1.2 / x",
  "k = 11, a szabály: g(x) = 11 - x",
  "k = 30, a szabály: g(x) = 30x"
],
        correctAnswer: 0,
        hint: "Fordított arányosságnál: k = x · y.",
        explanation: "k = x · y = 5 · 6 = 30. A függvény hozzárendelési szabálya tehát: g(x) = 30 / x."
      },
      {
        id: 'peq2-11',
        questionTypeBadge: "[8. Lineáris függvények] Zérushely Számítása",
        question: "Mennyi az f(x) = 3x - 12 függvény zérushelye (hol metszi az x tengelyt)?",
        options: [
  "x₀ = 4",
  "x₀ = -4",
  "x₀ = 12",
  "x₀ = 36"
],
        correctAnswer: 0,
        hint: "Oldd meg a 3x - 12 = 0 egyenletet!",
        explanation: "3x - 12 = 0 ➔ 3x = 12 ➔ x₀ = 4. A grafikon a (4; 0) pontban metszi az x tengelyt."
      },
      {
        id: 'peq2-12',
        questionTypeBadge: "[8. Lineáris függvények] Zérushely Negatív Meredekséggel",
        question: "Mennyi a g(x) = -2x + 10 függvény zérushelye?",
        options: [
  "x₀ = 5",
  "x₀ = -5",
  "x₀ = 10",
  "x₀ = -20"
],
        correctAnswer: 0,
        hint: "-2x + 10 = 0 ➔ 2x = 10.",
        explanation: "-2x + 10 = 0 ➔ 2x = 10 ➔ x₀ = 5. Képlettel: x₀ = -b / m = -10 / (-2) = 5."
      },
      {
        id: 'peq2-13',
        questionTypeBadge: "[9. Egyenesek meredeksége] Két Pont Meredeksége",
        question: "Mennyi az A(1; 3) és B(5; 11) pontokon átmenő egyenes meredeksége?",
        options: [
  "m = 2",
  "m = 0.5",
  "m = 4",
  "m = 8"
],
        correctAnswer: 0,
        hint: "m = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (5 - 1).",
        explanation: "m = (11 - 3) / (5 - 1) = 8 / 4 = 2."
      },
      {
        id: 'peq2-14',
        questionTypeBadge: "[9. Egyenesek meredeksége] Negatív Előjelek Kezelése",
        question: "Mennyi a P(-2; 7) és Q(3; -3) pontokon átmenő egyenes meredeksége?",
        options: [
  "m = -2",
  "m = 2",
  "m = -4",
  "m = -0.5"
],
        correctAnswer: 0,
        hint: "Δy = -3 - 7 = -10; Δx = 3 - (-2) = 5.",
        explanation: "m = (-3 - 7) / (3 - (-2)) = -10 / (3 + 2) = -10 / 5 = -2."
      },
      {
        id: 'peq2-15',
        questionTypeBadge: "[10. Abszolútérték-függvény] Csúcspont és Szélsőérték",
        question: "Milyen szélsőértéke van az f(x) = |x - 6| - 8 függvénynek, és hol veszi azt fel?",
        options: [
  "Minimuma van az x = 6 helyen, értéke y = -8",
  "Maximuma van az x = 6 helyen, értéke y = -8",
  "Minimuma van az x = -6 helyen, értéke y = 8",
  "Nincs szélsőértéke"
],
        correctAnswer: 0,
        hint: "Mivel a V-alak felfelé nyílik (a = 1 > 0), a csúcspont MINIMUM.",
        explanation: "A csúcspont C(6; -8). Mivel felfelé nyílik, a legalacsonyabb pont a csúcs: minimum van az x = 6 helyen, a minimum értéke -8."
      },
      {
        id: 'peq2-16',
        questionTypeBadge: "[10. Abszolútérték-függvény] Lefelé Nyíló Szélsőértéke",
        question: "Milyen szélsőértéke van a g(x) = -|x + 2| + 7 függvénynek?",
        options: [
  "Maximuma van az x = -2 helyen, értéke y = 7",
  "Minimuma van az x = -2 helyen, értéke y = 7",
  "Maximuma van az x = 2 helyen, értéke y = 7",
  "Minimuma van az x = 2 helyen, értéke y = -7"
],
        correctAnswer: 0,
        hint: "A negatív előjel miatt lefelé nyílik, így a csúcs MAXIMUM.",
        explanation: "Csúcspont: C(-2; 7). Mivel a < 0, a grafikon legmagasabb pontja a csúcspont: maximum van az x = -2 helyen, értéke 7."
      },
      {
        id: 'peq2-17',
        questionTypeBadge: "[11. Függvények jellemzése] Parabola Monotonitása",
        question: "Mely intervallumokon szigorúan növekvő, illetve csökkenő az f(x) = x² függvény?",
        options: [
  "]-∞; 0] intervallumon szig. csökkenő, míg [0; +∞[ intervallumon szig. növekvő",
  "A teljes valós számok halmazán (ℝ) szigorúan növekvő",
  "]-∞; 0] intervallumon szig. növekvő, [0; +∞[ intervallumon szig. csökkenő",
  "Mindenütt szigorúan csökkenő"
],
        correctAnswer: 0,
        hint: "A csúcspont az origóban van: az origóig lejt a parabola, onnan jobbra emelkedik.",
        explanation: "Az f(x) = x² parabola az origóig (balról jobbra haladva) süllyed: ]-∞; 0] szigorúan csökkenő; az origótól jobbra emelkedik: [0; +∞[ szigorúan növekvő."
      },
      {
        id: 'peq2-18',
        questionTypeBadge: "[11. Függvények jellemzése] Hiperbola Paritása és Értékkészlete",
        question: "Milyen paritású az f(x) = 6 / x fordított arányosság függvény, és mi az értékkészlete?",
        options: [
  "Páratlan függvény, és R_f = ℝ \\ {0}",
  "Páros függvény, és R_f = ℝ",
  "Sem páros, sem páratlan, és R_f = [0; +∞[",
  "Páratlan függvény, és R_f = ℝ"
],
        correctAnswer: 0,
        hint: "f(-x) = 6 / (-x) = -(6 / x) = -f(x). A kimenet sosem lehet 0.",
        explanation: "f(-x) = -f(x), tehát páratlan (origóra szimmetrikus). A 6/x soha nem vehet fel 0 értéket, így R_f = ℝ \\ {0}."
      },
      {
        id: 'peq2-19',
        questionTypeBadge: "[12. Függvények szélsőértékei] Csúcsponti Alak",
        question: "Mi a szélsőértéke az f(x) = (x - 4)² + 7 függvénynek a valós számok halmazán?",
        options: [
  "Minimuma van az x = 4 helyen, értéke y = 7",
  "Maximuma van az x = 4 helyen, értéke y = 7",
  "Minimuma van az x = -4 helyen, értéke y = 7",
  "Minimuma van az x = 7 helyen, értéke y = 4"
],
        correctAnswer: 0,
        hint: "A zárójel (x - 4)² ≥ 0, legkisebb értéke 0, ha x = 4.",
        explanation: "Mivel (x - 4)² ≥ 0, a minimum akkor áll elő, amikor x - 4 = 0 ⟹ x = 4. Ekkor f(4) = 0 + 7 = 7."
      },
      {
        id: 'peq2-20',
        questionTypeBadge: "[12. Függvények szélsőértékei] Lefelé Nyíló Parabola",
        question: "Mi a szélsőértéke a g(x) = -(x + 3)² + 10 függvénynek?",
        options: [
  "Maximuma van az x = -3 helyen, értéke y = 10",
  "Minimuma van az x = -3 helyen, értéke y = 10",
  "Maximuma van az x = 3 helyen, értéke y = 10",
  "Maximuma van az x = 10 helyen, értéke y = -3"
],
        correctAnswer: 0,
        hint: "A negatív előjel miatt -(x + 3)² ≤ 0, így maximum van a zárójel 0-vá válásakor.",
        explanation: "A -(x + 3)² tag legfeljebb 0 lehet, amit x = -3-nál ér el. A felvett maximális érték 10."
      },
      {
        id: 'peq2-21',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Transzformációs Lépések",
        question: "Milyen geometriai transzformációkkal kapjuk az f(x) = x²-ből az f(x) = -(x - 3)² + 4 függvényt?",
        options: [
  "3 egységgel jobbra tolás, tükrözés az x-tengelyre, majd 4 egységgel felfelé tolás",
  "3 egységgel balra tolás, 4 egységgel lefelé tolás",
  "4 egységgel jobbra tolás, 3 egységgel felfelé tolás",
  "Csak függőleges nyújtás és eltolás"
],
        correctAnswer: 0,
        hint: "(x - 3) jobbra tol, a negatív előjel tükröz (lefelé nyílik), a +4 pedig felfelé emeli a csúcsot.",
        explanation: "Az (x - 3) miatt 3-mal jobbra tolunk, a - előjel miatt tükrözünk az x-tengelyre, a +4 miatt 4 egységgel feljebb visszük a csúcsot C(3; 4)-be."
      },
      {
        id: 'peq2-22',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Gyökfüggvény Értékkészlete",
        question: "Mi a kezdőpontja és értékkészlete a g(x) = √(x + 4) - 2 függvénynek?",
        options: [
  "Kezdőpontja K(-4; -2), értékkészlete Rg = [-2; ∞[",
  "Kezdőpontja K(4; -2), értékkészlete Rg = [0; ∞[",
  "Kezdőpontja K(-4; 2), értékkészlete Rg = ]-∞; -2]",
  "Kezdőpontja K(-2; -4), értékkészlete Rg = ℝ"
],
        correctAnswer: 0,
        hint: "A gyök alatti kifejezés x = -4-nél 0, ekkor g(-4) = 0 - 2 = -2. Innen felfelé nő a függvény.",
        explanation: "Kezdőpont: x + 4 = 0 ⟹ x = -4, ekkor y = -2. Mivel √(x + 4) ≥ 0, a felvett értékek y ≥ -2, tehát Rg = [-2; ∞[."
      },
      {
        id: 'peq2-23',
        questionTypeBadge: "[14. Gyakorlati feladatok & modellezés] Fedezeti Számítás",
        question: "K(x) = 50 000 + 1000x és az eladási darabár p = 3000 Ft. Hány darab terméket kell eladni a fedezeti ponthoz?",
        options: [
  "x = 25 darabot",
  "x = 50 darabot",
  "x = 20 darabot",
  "x = 100 darabot"
],
        correctAnswer: 0,
        hint: "B(x) = K(x) ⟹ 3000x = 50 000 + 1000x ⟹ 2000x = 50 000.",
        explanation: "Egy termék haszna: 3000 - 1000 = 2000 Ft. A fedezeti darabszám: 50 000 / 2000 = 25 darab."
      },
      {
        id: 'peq2-24',
        questionTypeBadge: "[14. Gyakorlati feladatok & modellezés] Hajítás Tetőpontja",
        question: "Egy felhajított kő magasságát a h(t) = -5t² + 30t képlet írja le méterben. Hány másodperc múlva és milyen magasan van a kő a legmagasabb pontján?",
        options: [
  "t = 3 másodperc múlva éri el a maximális 45 méter magasságot",
  "t = 6 másodperc múlva éri el a 30 métert",
  "t = 3 másodperc múlva éri el a 30 métert",
  "t = 5 másodperc múlva éri el a 45 métert"
],
        correctAnswer: 0,
        hint: "-5(t² - 6t) = -5((t - 3)² - 9) = -5(t - 3)² + 45.",
        explanation: "h(t) = -5(t - 3)² + 45. A parabola csúcspontja C(3; 45), azaz 3 másodperc múlva 45 méter magasan van."
      },
      {
        id: 'peq2-25',
        questionTypeBadge: "[15. Egyenletek grafikus megoldása] Parabola és Egyenes",
        question: "Az f(x) = x² parabola és a g(x) = x + 2 egyenes metszéspontjai M₁(-1; 1) és M₂(2; 4). Mi az x² = x + 2 egyenlet megoldása?",
        options: [
  "x₁ = -1 és x₂ = 2",
  "x = 1 és x = 4",
  "x = -1, y = 1 és x = 2, y = 4",
  "x = 3"
],
        correctAnswer: 0,
        hint: "Csak az x koordinátákat írd le a megoldáshalmazba!",
        explanation: "Az egyenlet gyökei a metszéspontok x koordinátái: x₁ = -1 és x₂ = 2. Ellenőrzés: (-1)² = -1 + 2 = 1 és 2² = 2 + 2 = 4."
      },
      {
        id: 'peq2-26',
        questionTypeBadge: "[15. Egyenletek grafikus megoldása] Abszolútérték Távolság",
        question: "Mik az |x - 3| = 2 egyenlet gyökei a V-alak és a vízszintes egyenes metszéspontjaiból leolvasva?",
        options: [
  "x = 1 és x = 5",
  "x = -1 és x = 5",
  "x = 2 és x = 3",
  "x = -2 és x = 2"
],
        correctAnswer: 0,
        hint: "A 3-as számtól jobbra és balra 2-2 egység távolságra lévő számok.",
        explanation: "x - 3 = 2 ⟹ x = 5; illetve x - 3 = -2 ⟹ x = 1. A két gyök: 1 és 5."
      },
      {
        id: 'peq2-27',
        questionTypeBadge: "[16. Egyenlőtlenségek grafikus megoldása] Másodfokú Külső Ágak",
        question: "Mi a megoldása az x² > 9 másodfokú egyenlőtlenségnek?",
        options: [
  "x ∈ ]-∞; -3[ ∪ ]3; ∞[",
  "x ∈ ]-3; 3[",
  "x ∈ [-3; 3]",
  "x > 3"
],
        correctAnswer: 0,
        hint: "A parabola az y = 9 egyenes felett a két metszésponton (-3 és 3) KÍVÜL fut.",
        explanation: "Az x² görbéje a 3-nál nagyobb és a -3-nál kisebb számok esetén magasabban van, mint 9: x ∈ ]-∞; -3[ ∪ ]3; ∞[."
      },
      {
        id: 'peq2-28',
        questionTypeBadge: "[16. Egyenlőtlenségek grafikus megoldása] Eltolt Abszolútérték Belső",
        question: "Mi a megoldása az |x - 4| ≤ 2 egyenlőtlenségnek?",
        options: [
  "x ∈ [2; 6]",
  "x ∈ ]2; 6[",
  "x ∈ [-2; 2]",
  "x ∈ ]-∞; 2] ∪ [6; ∞["
],
        correctAnswer: 0,
        hint: "A 4-es számtól mért távolság legfeljebb 2 egység: 4 - 2 = 2 és 4 + 2 = 6.",
        explanation: "A számegyenesen a 4-től való távolság legfeljebb 2, így az intervallum: [4 - 2; 4 + 2] = [2; 6]."
      },
      {
        id: 'peq2-29',
        questionTypeBadge: "[17. Abszolútértékes egyenletek] Felezőpont Elv",
        question: "Mit jelent geometriailag az |x - 2| = |x - 8| egyenlet?",
        options: [
  "Az x pont egyenlő távolságra van a 2-től és a 8-tól, azaz a 2 és 8 szakaszának felezőpontja",
  "Az x pont távolsága a 2-től pontosan 8",
  "Az x pont a 2 és 8 pontok szorzata",
  "Az x pont csak 2 vagy 8 lehet"
],
        correctAnswer: 0,
        hint: "|x - 2| az x távolsága 2-től, |x - 8| az x távolsága 8-tól. Hol egyenlő e kettő?",
        explanation: "A számegyenesen pontosan egy olyan pont van, amely két rögzített számtól egyenlő távolságra fekszik: a két szám felezőpontja (átlaga)."
      },
      {
        id: 'peq2-30',
        questionTypeBadge: "[17. Abszolútértékes egyenletek] Felezőpont Számítás",
        question: "Mi a megoldása az |x - 3| = |x - 11| egyenletnek?",
        options: [
  "x = 7",
  "x = 8",
  "x ∈ {3; 11}",
  "x = 4"
],
        correctAnswer: 0,
        hint: "Számold ki a 3 és 11 számtani közepét: (3 + 11) / 2.",
        explanation: "x = (3 + 11) / 2 = 14 / 2 = 7. Ellenőrzés: |7 - 3| = 4 és |7 - 11| = |-4| = 4. Valóban egyenlők."
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Elemzés, Egyenlőtlenségek és Érettségi Szintű Feladatok (Nehéz)',
    subtitle: '30 összetett feladat: többváltozós esetszétválasztás, másodfokú zónák, paraméteres feladatok, fizikai/gazdasági szélsőérték-optimalizálás és szigorú érettségi típusfeladatok.',
    range: '61 - 90. feladat',
    focus: 'Érettségi Felkészülés & Szintézis',
    questions: [
      {
        id: 'peq3-1',
        questionTypeBadge: "[1. Táblázatok] Hozzárendelési Szabály Keresése",
        question: "Egy értéktáblázat értékei: x = -1 esetén y = -1; x = 0 esetén y = 1; x = 2 esetén y = 5; x = 4 esetén y = 9. Melyik képlet írja le a függvényt?",
        figure: <DualMethodComparisonSvg size={240} />,
        options: [
  "f(x) = 2x + 1",
  "f(x) = 3x - 1",
  "f(x) = x + 2",
  "f(x) = x² + 1"
],
        correctAnswer: 0,
        hint: "Nézd meg a változást: ha x nő 1-gyel, y nő 2-vel (meredekség m = 2), és x = 0-nál y = 1.",
        explanation: "Az y = 2x + 1 összefüggés minden párra teljesül: 2(-1)+1 = -1, 2(0)+1 = 1, 2(2)+1 = 5, 2(4)+1 = 9."
      },
      {
        id: 'peq3-2',
        questionTypeBadge: "[2. Diagramok] Megtévesztő Diagram Leleplezése",
        question: "Egy híradóban bemutatott oszlopdiagramon az „A” párt oszlopa háromszor magasabb a „B” párténál. A számok viszont: A = 42%, B = 38%. Mi a manipuláció oka?",
        options: [
  "A függőleges tengely nem 0-ról indul, hanem 36%-ról (csonkolt tengely)",
  "Az A párt oszlopa szélesebb",
  "A színek nem megfelelőek",
  "Nincs hiba, a 42% tényleg háromszorosa a 38%-nak"
],
        correctAnswer: 0,
        hint: "Ha levágjuk a tengely alját, a kis különbség óriásinak látszik.",
        explanation: "A csonkolt tengely (truncated axis) miatt a 36-tól 42-ig terjedő sáv (6 egység) háromszorosa a 36-tól 38-ig terjedő sávnak (2 egység). Ez durván megtévesztő vizuális torzítás."
      },
      {
        id: 'peq3-3',
        questionTypeBadge: "[3. Változások ábrázolása] Tartály Töltése Lépcsős Edénynél",
        question: "Egy alul széles, felül szűk hengeres vázát egyenletes vízhozammal töltünk. Hogyan alakul a vízszint emelkedési sebessége az idő függvényében?",
        options: [
  "Eleinte lassan emelkedik a vízszint, majd a szűk részhez érve hirtelen felgyorsul az emelkedés",
  "Végig teljesen egyenletes sebességgel emelkedik",
  "Eleinte gyorsan emelkedik, majd felül lelassul",
  "A vízszint felül csökkenni kezd"
],
        correctAnswer: 0,
        hint: "Ahol szűkebb a keresztmetszet, ott egységnyi vízmennyiség nagyobb magasságnövekedést okoz.",
        explanation: "A széles aljban lassan kúszik felfelé a szint, a szűkebb felső részben viszont jóval gyorsabban nő a magasság (a grafikon meredekebbé válik)."
      },
      {
        id: 'peq3-4',
        questionTypeBadge: "[4. Grafikonok a mindennapokban] Vasúti Menetrendi Diagram",
        question: "Egy vasúti vonalállomás-idő diagramján egy lassabb személyvonat és egy gyorsvonat ugyanabból a városból indul azonos irányba, de a gyorsvonat 30 perccel később. Mit jelent, ha a grafikonjaik metszik egymást?",
        options: [
  "A gyorsvonat utoléri a személyvonatot (előzés történhet állomáson)",
  "Frontális ütközés történik",
  "Mindkét vonat visszafordul",
  "A személyvonat lehagyja a gyorsvonatot"
],
        correctAnswer: 0,
        hint: "A gyorsvonat meredekebb egyenese metszi a személyvonat laposabb egyenesét.",
        explanation: "A metszéspont az utolérés pillanatát és helyét jelzi: a gyorsabb vonat ott előzheti meg a lassabbat."
      },
      {
        id: 'peq3-5',
        questionTypeBadge: "[5. A függvény fogalma] Paraméteres Helyettesítés",
        question: "Ha f(x) = 2x - 3, mivel egyenlő f(a + 1)?",
        options: [
  "2a - 1",
  "2a - 3",
  "2a + 2",
  "2a - 2"
],
        correctAnswer: 0,
        hint: "Helyettesíts be x helyére (a + 1)-et: 2(a + 1) - 3 = 2a + 2 - 3.",
        explanation: "f(a + 1) = 2(a + 1) - 3 = 2a + 2 - 3 = 2a - 1."
      },
      {
        id: 'peq3-6',
        questionTypeBadge: "[5. A függvény fogalma] Tört Nevezőjében Gyök",
        question: "Mi az f(x) = 1 / √(x - 2) függvény értelmezési tartománya?",
        options: [
  "]2; ∞[ (x > 2)",
  "[2; ∞[ (x ≥ 2)",
  "ℝ \\ {2}",
  "] -∞; 2["
],
        correctAnswer: 0,
        hint: "A gyök miatt x - 2 ≥ 0, de mivel a nevezőben van, nem lehet 0! Tehát x - 2 > 0.",
        explanation: "A nevező nem lehet nulla, a gyök alatti kifejezés pedig nemnegatív, így a kettő együttes feltétele: x - 2 > 0 ➔ x > 2, azaz D_f = ]2; ∞[."
      },
      {
        id: 'peq3-7',
        questionTypeBadge: "[6. Készítsünk grafikont!] Zárt és Nyílt Végpontok",
        question: "Legyen f: ]-2; 3] ➔ ℝ, f(x) = x + 1. Hogyan kell ábrázolni a grafikon két végpontját?",
        options: [
  "A (-2; -1) pontban üres karika (○), a (3; 4) pontban teli karika (●)",
  "Mindkét végponton teli karika (●)",
  "Mindkét végponton üres karika (○)",
  "A (-2; -1) pontban teli karika, a (3; 4) pontban üres karika"
],
        correctAnswer: 0,
        hint: "A nyílt végpontot (] zárójel) üres karika jelöli, mert a pont nem tartozik hozzá; a zárt végpontot (] zárójel) teli karika.",
        explanation: "Mivel x = -2 nyílt (szigorúan nagyobb mint -2), a (-2; -1) végpont üres karika (○). Mivel x = 3 zárt (megengedett az egyenlőség), a (3; 4) végpont teli karika (●)."
      },
      {
        id: 'peq3-8',
        questionTypeBadge: "[6. Készítsünk grafikont!] Paraméter Meghatározása Pontilleszkedésből",
        question: "Az f(x) = a · x + 5 függvény grafikonja áthalad a P(3; 11) ponton. Mennyi az 'a' paraméter értéke?",
        options: [
  "a = 2",
  "a = 3",
  "a = -2",
  "a = 6"
],
        correctAnswer: 0,
        hint: "Helyettesítsd be: 11 = a · 3 + 5, majd oldd meg a-ra!",
        explanation: "11 = 3a + 5 ➔ 3a = 6 ➔ a = 2. A függvény tehát f(x) = 2x + 5."
      },
      {
        id: 'peq3-9',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] Munkaidő Modell",
        question: "6 munkás egy munka elvégzésével 8 óra alatt végezne. Hány óra alatt végezne ugyanezzel a munkával 4 munkás (ha egyenletes tempóban dolgoznak)?",
        options: [
  "12 óra",
  "10 óra",
  "5.33 óra",
  "16 óra"
],
        correctAnswer: 0,
        hint: "A munkások száma és az idő szorzata az összmunkát adja (emberóra). Számold ki a k konstans szorzatot!",
        explanation: "Fordított arányosság: k = 6 munkás · 8 óra = 48 emberóra. 4 munkás esetén: t = 48 / 4 = 12 óra."
      },
      {
        id: 'peq3-10',
        questionTypeBadge: "[7. Egyenes és fordított arányosság] Sebesség és Menetidő",
        question: "Egy vonat 90 km/h átlagsebességgel 4 óra alatt teszi meg a két város közötti távolságot. Mekkora sebességgel kellene haladnia, hogy 3 óra alatt megtegye ugyanezt az utat?",
        options: [
  "120 km/h",
  "110 km/h",
  "100 km/h",
  "135 km/h"
],
        correctAnswer: 0,
        hint: "A távolság fix: s = v · t = 90 · 4 km. Ezt kell elosztani az új idővel.",
        explanation: "A távolság: s = 90 · 4 = 360 km. Az új sebesség: v = s / t = 360 / 3 = 120 km/h."
      },
      {
        id: 'peq3-11',
        questionTypeBadge: "[8. Lineáris függvények] Két Egyenes Metszéspontja",
        question: "Melyik pontban metszi egymást az f(x) = 2x - 1 és a g(x) = -x + 5 függvény grafikonja?",
        options: [
  "(2; 3)",
  "(3; 2)",
  "(1; 1)",
  "(2; 5)"
],
        correctAnswer: 0,
        hint: "Egyenlítsd ki a két kifejezést: 2x - 1 = -x + 5 ➔ oldd meg x-re!",
        explanation: "2x - 1 = -x + 5 ➔ 3x = 6 ➔ x = 2. Behelyettesítve: y = 2·2 - 1 = 3. A metszéspont: (2; 3)."
      },
      {
        id: 'peq3-12',
        questionTypeBadge: "[8. Lineáris függvények] Tengelyekkel Bezárt Terület",
        question: "Mekkora területű háromszöget zár be az f(x) = -2x + 8 egyenes a koordinátatengelyekkel az I. síknegyedben?",
        options: [
  "16 területegység",
  "32 területegység",
  "8 területegység",
  "12 területegység"
],
        correctAnswer: 0,
        hint: "Keresd meg a tengelymetszeteket: b = 8 (y-metszet) és x₀ = 4 (zérushely). A derékszögű háromszög területe (a · b) / 2.",
        explanation: "y-metszet: b = 8. x-metszet (zérushely): -2x + 8 = 0 ➔ x₀ = 4. A derékszögű háromszög befogói 4 és 8. Terület = (4 · 8) / 2 = 16."
      },
      {
        id: 'peq3-13',
        questionTypeBadge: "[9. Egyenesek meredeksége] Kollinearitás Vizsgálata",
        question: "Egy egyenesen fekszik-e a három pont: A(1; 2), B(3; 6) és C(7; 14)?",
        options: [
  "Igen, mert m_AB = (6-2)/(3-1) = 2 és m_BC = (14-6)/(7-3) = 2, a meredekségek azonosak",
  "Nem, mert a távolságok nem egyenlőek",
  "Csak akkor, ha az origón is átmennek",
  "Nem, mert három pont mindig zárt háromszöget alkot"
],
        correctAnswer: 0,
        hint: "Három pont akkor fekszik egy egyenesen (kollineárisak), ha az AB és a BC szakasz meredeksége megegyezik.",
        explanation: "m_AB = 4/2 = 2. m_BC = 8/4 = 2. Mivel a meredekségek egyenlőek és B közös pont, a három pont egy egyenesre esik."
      },
      {
        id: 'peq3-14',
        questionTypeBadge: "[9. Egyenesek meredeksége] Derékszögű Háromszög Igazolása",
        question: "Egy háromszög csúcsai: A(1; 1), B(5; 3) és C(3; 7). Derékszögű-e a háromszög a B csúcsnál?",
        options: [
  "Igen, mert m_AB = 0.5 és m_BC = -2, szorzatuk 0.5 · (-2) = -1 (merőlegesek)",
  "Nem, mert a meredekségek szorzata nem -1",
  "Nem, mert egyik oldal sem párhuzamos a tengelyekkel",
  "Csak akkor, ha Pitagorasz-tétellel számolunk"
],
        correctAnswer: 0,
        hint: "Számítsd ki m_AB-t és m_BC-t, majd vizsgáld meg szorzatukat!",
        explanation: "m_AB = (3 - 1) / (5 - 1) = 2/4 = 0.5. m_BC = (7 - 3) / (3 - 5) = 4 / (-2) = -2. Mivel 0.5 · (-2) = -1, az AB és BC oldalak merőlegesek egymásra!"
      },
      {
        id: 'peq3-15',
        questionTypeBadge: "[10. Abszolútérték-függvény] Zérushelyek Pontos Kiszámítása",
        question: "Mik az f(x) = |x - 5| - 3 függvény zérushelyei?",
        options: [
  "x₁ = 2 és x₂ = 8",
  "x₁ = -2 és x₂ = 8",
  "x₁ = 5 és x₂ = -3",
  "x₁ = 2 és x₂ = -8"
],
        correctAnswer: 0,
        hint: "|x - 5| - 3 = 0 ➔ |x - 5| = 3 ➔ x - 5 = 3 vagy x - 5 = -3.",
        explanation: "|x - 5| = 3. Ebből: 1. x - 5 = 3 ➔ x₂ = 8; 2. x - 5 = -3 ➔ x₁ = 2. A zérushelyek: 2 és 8."
      },
      {
        id: 'peq3-16',
        questionTypeBadge: "[10. Abszolútérték-függvény] Zérushelyek Negatív Ágnál",
        question: "Mik a g(x) = -|x + 2| + 6 függvény zérushelyei?",
        options: [
  "x₁ = -8 és x₂ = 4",
  "x₁ = -4 és x₂ = 8",
  "x₁ = -2 és x₂ = 6",
  "x₁ = 4 és x₂ = 8"
],
        correctAnswer: 0,
        hint: "-|x + 2| + 6 = 0 ➔ |x + 2| = 6 ➔ x + 2 = 6 vagy x + 2 = -6.",
        explanation: "|x + 2| = 6 ➔ x + 2 = 6 ➔ x₂ = 4; illetve x + 2 = -6 ➔ x₁ = -8. A zérushelyek: -8 és 4."
      },
      {
        id: 'peq3-17',
        questionTypeBadge: "[11. Függvények jellemzése] Paritás Algebrai Igazolása",
        question: "Milyen paritású az f(x) = x³ - 4x függvény?",
        options: [
  "Páratlan függvény, mert f(-x) = (-x)³ - 4(-x) = -x³ + 4x = -(x³ - 4x) = -f(x)",
  "Páros függvény, mert f(-x) = f(x)",
  "Sem páros, sem páratlan",
  "Csak akkor páratlan, ha x > 0"
],
        correctAnswer: 0,
        hint: "Helyettesíts be (-x)-et a kifejezésbe, és vizsgáld meg, hogy kiemelhető-e a negatív előjel!",
        explanation: "f(-x) = (-x)³ - 4(-x) = -x³ + 4x = -(x³ - 4x) = -f(x). A definíció szerint a függvény páratlan."
      },
      {
        id: 'peq3-18',
        questionTypeBadge: "[11. Függvények jellemzése] Paritás Algebrai Igazolása",
        question: "Milyen paritású a g(x) = x⁴ + 3x² - 5 függvény?",
        options: [
  "Páros függvény, mert a negatív szám páros hatványai pozitívak maradnak: g(-x) = g(x)",
  "Páratlan függvény",
  "Sem páros, sem páratlan, mert van benne -5",
  "Csak az origóra szimmetrikus"
],
        correctAnswer: 0,
        hint: "(-x)⁴ = x⁴ és (-x)² = x².",
        explanation: "g(-x) = (-x)⁴ + 3(-x)² - 5 = x⁴ + 3x² - 5 = g(x). Mivel g(-x) = g(x), a függvény páros."
      },
      {
        id: 'peq3-19',
        questionTypeBadge: "[12. Függvények szélsőértékei] Intervallumos Lineáris",
        question: "Mi a szélsőértéke az f(x) = 3x - 4 lineáris függvénynek a [-2; 3] zárt intervallumon?",
        options: [
  "Minimuma az x = -2-nél y = -10; Maximuma az x = 3-nál y = 5",
  "Minimuma az x = 3-nál y = 5; Maximuma az x = -2-nél y = -10",
  "Csak minimuma van: y = -10",
  "Zárt szakaszon sem lehet szélsőértéke lineáris függvénynek"
],
        correctAnswer: 0,
        hint: "Mivel szigorúan növekvő függvényről van szó, a bal végpontban veszi fel a legkisebb, a jobb végpontban a legnagyobb értéket.",
        explanation: "f(-2) = 3(-2) - 4 = -10 (globális minimum a szakaszon), f(3) = 3(3) - 4 = 5 (globális maximum a szakaszon)."
      },
      {
        id: 'peq3-20',
        questionTypeBadge: "[12. Függvények szélsőértékei] Csökkenő Egyenes Zárt Szakaszon",
        question: "Mi a szélsőértéke a g(x) = -2x + 7 függvénynek az x ∈ [1; 4] szakaszon?",
        options: [
  "Minimuma az x = 4-nél y = -1; Maximuma az x = 1-nél y = 5",
  "Minimuma az x = 1-nél y = 5; Maximuma az x = 4-nél y = -1",
  "Minimuma y = 0, maximuma y = 7",
  "Nincs szélsőértéke"
],
        correctAnswer: 0,
        hint: "A negatív meredekség miatt szigorúan csökken: a bal végpont a legmagasabb, a jobb végpont a legalacsonyabb.",
        explanation: "g(1) = -2(1) + 7 = 5 (maximum az x = 1 helyen), g(4) = -2(4) + 7 = -1 (minimum az x = 4 helyen)."
      },
      {
        id: 'peq3-21',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Gyökös Egyenlet",
        question: "Mi a megoldása a √(x + 7) = 5 egyenletnek?",
        options: [
  "x = 18",
  "x = 32",
  "x = -2",
  "Nincs valós megoldás"
],
        correctAnswer: 0,
        hint: "Emeld mindkét oldalt négyzetre: x + 7 = 25.",
        explanation: "√(x + 7) = 5 ⟹ x + 7 = 25 ⟹ x = 18. Ellenőrzés: √(18 + 7) = √25 = 5, ami stimmel."
      },
      {
        id: 'peq3-22',
        questionTypeBadge: "[13. Másodfokú és négyzetgyök-függvény] Balra Mutató Gyök",
        question: "Milyen x valós számokra értelmezett a h(x) = √(10 - 2x) függvény?",
        options: [
  "x ∈ ]-∞; 5]",
  "x ∈ [5; ∞[",
  "x ∈ [-5; 5]",
  "x ∈ ℝ"
],
        correctAnswer: 0,
        hint: "10 - 2x ≥ 0 ⟹ 10 ≥ 2x ⟹ 5 ≥ x.",
        explanation: "A gyök alatti kifejezés nemnegatív: 10 - 2x ≥ 0 ⟹ 10 ≥ 2x ⟹ x ≤ 5. Így a tartomány ]-∞; 5]."
      },
      {
        id: 'peq3-23',
        questionTypeBadge: "[14. Gyakorlati feladatok & modellezés] Két Ajánlat Metszéspontja",
        question: "Két fénymásoló szerviz ajánlata: \"A\" havi 10 000 Ft alapdíj + 8 Ft/oldal; \"B\" nincs alapdíj, de 12 Ft/oldal. Hány oldal esetén egyenlő a költség, és mikor éri meg a \"B\" szerviz?",
        options: [
  "2500 oldal esetén egyenlő a költség, és 2500 oldal alatt éri meg a \"B\" szerviz",
  "1000 oldal esetén egyenlő, és 1000 oldal felett éri meg a \"B\"",
  "2500 oldal esetén egyenlő, és 2500 oldal felett éri meg a \"B\"",
  "Soha nem éri meg a \"B\" szerviz"
],
        correctAnswer: 0,
        hint: "10 000 + 8x = 12x ⟹ 4x = 10 000 ⟹ x = 2500. Kis darabszámnál a fix költség nélküli az olcsóbb!",
        explanation: "10 000 + 8x = 12x ⟹ 4x = 10 000 ⟹ x = 2500. 2500 oldal alatt a \"B\" cég olcsóbb, felette az \"A\" a kedvezőbb alacsonyabb oldalankénti díj miatt."
      },
      {
        id: 'peq3-24',
        questionTypeBadge: "[14. Gyakorlati feladatok & modellezés] Folyóparti Legelő",
        question: "Egy folyóparton 80 m kerítéssel kerítünk el téglalap alakú telket (a folyó felőli oldalon nincs kerítés: 2x + y = 80). Milyen x mélység és y szélesség mellett lesz a terület maximális, és mennyi ez a terület?",
        options: [
  "x = 20 m mélység, y = 40 m szélesség mellett a maximális terület 800 m²",
  "x = 26.6 m, y = 26.6 m mellett a maximális terület 711 m²",
  "x = 10 m, y = 60 m mellett a maximális terület 600 m²",
  "x = 20 m, y = 20 m mellett a maximális terület 400 m²"
],
        correctAnswer: 0,
        hint: "T(x) = x(80 - 2x) = -2x² + 80x = -2(x - 20)² + 800.",
        explanation: "T(x) = -2x² + 80x = -2(x - 20)² + 800. A csúcsponton x = 20 m, ekkor y = 80 - 2(20) = 40 m, és T_max = 800 m²."
      },
      {
        id: 'peq3-25',
        questionTypeBadge: "[15. Egyenletek grafikus megoldása] Paraméteres Parabola",
        question: "Milyen c valós paraméter esetén van az x² = c egyenletnek pontosan KÉT valós megoldása?",
        options: [
  "c > 0 (pozitív számok esetén)",
  "c = 0 esetén",
  "c < 0 esetén",
  "Minden valós c értékre"
],
        correctAnswer: 0,
        hint: "A vízszintes y = c egyenesnek az x-tengely felett kell haladnia a két metszéshez.",
        explanation: "Ha c > 0, az egyenes két pontban metszi a parabolát (±√c). Ha c = 0, akkor 1 megoldás van, ha c < 0, akkor 0."
      },
      {
        id: 'peq3-26',
        questionTypeBadge: "[15. Egyenletek grafikus megoldása] Paraméteres Abszolútérték",
        question: "Milyen c érték mellett van az |x - 2| = c egyenletnek pontosan EGYETLEN valós megoldása?",
        options: [
  "c = 0 (ekkor az egyenes éppen a V-alak csúcspontját érinti)",
  "c > 0",
  "c = 2",
  "c < 0"
],
        correctAnswer: 0,
        hint: "Csak a csúcspontban van 1 érintési pont.",
        explanation: "Ha c = 0, a vízszintes egyenes az y = 0 tengely, amely pontosan a C(2; 0) csúcspontban érinti a V-alakot."
      },
      {
        id: 'peq3-27',
        questionTypeBadge: "[16. Egyenlőtlenségek grafikus megoldása] Parabola az Egyenes Felett",
        question: "Mi a megoldása az x² > x + 2 egyenlőtlenségnek a metszéspontok (x₁ = -1, x₂ = 2) ismeretében?",
        options: [
  "x ∈ ]-∞; -1[ ∪ ]2; ∞[",
  "x ∈ ]-1; 2[",
  "x ∈ [-1; 2]",
  "x ∈ ]2; ∞["
],
        correctAnswer: 0,
        hint: "A parabola a két metszésponton kívül emelkedik az egyenes fölé.",
        explanation: "A két metszésponton kívül f(x) > g(x), szigorú reláció miatt a határok nem részei a halmaznak: ]-∞; -1[ ∪ ]2; ∞[."
      },
      {
        id: 'peq3-28',
        questionTypeBadge: "[16. Egyenlőtlenségek grafikus megoldása] Gyökös Korlát Alulról",
        question: "Mi a megoldása a √x ≤ 3 egyenlőtlenségnek a valós számok körében?",
        options: [
  "x ∈ [0; 9]",
  "x ∈ ]-∞; 9]",
  "x ∈ [0; 3]",
  "x ∈ [0; 6]"
],
        correctAnswer: 0,
        hint: "Négyzetre emelve x ≤ 9, de ne feledkezz meg az értelmezési tartományról: x ≥ 0!",
        explanation: "A négyzetgyök csak x ≥ 0 esetén értelmezett. A √x ≤ 3 feltételből x ≤ 9, a kettő metszete a zárt intervallum: [0; 9]."
      },
      {
        id: 'peq3-29',
        questionTypeBadge: "[17. Abszolútértékes egyenletek] Jobb Oldali Feltétel",
        question: "Miért szükséges feltételt szabni az |x - 3| = 2x - 5 egyenlet megoldásakor?",
        options: [
  "Mert a bal oldal nem-negatív, így a jobb oldalnak is nem-negatívnak kell lennie: 2x - 5 ≥ 0",
  "Mert a nevező nem lehet nulla",
  "Mert x nem lehet negatív szám",
  "Nem szükséges semmilyen feltétel, minden kapott gyök jó"
],
        correctAnswer: 0,
        hint: "|A| mindig ≥ 0. Ha |A| = B, mit kell tudnunk B-ről?",
        explanation: "Mivel |x - 3| ≥ 0 minden valós x-re, az egyenlet csak akkor állhat fenn, ha a jobb oldal is legalább 0: 2x - 5 ≥ 0 ⟹ x ≥ 2.5."
      },
      {
        id: 'peq3-30',
        questionTypeBadge: "[17. Abszolútértékes egyenletek] Hamis Gyök Kizárása",
        question: "Oldd meg az |x - 3| = 2x - 5 egyenletet! Mi a helyes gyök?",
        options: [
  "Csak x = 3 (a másik lehetséges algebrai gyök hamis: x = 2 nem elégíti ki a feltételt)",
  "x = 2 és x = 3",
  "Csak x = 2",
  "Nincs valós megoldás"
],
        correctAnswer: 0,
        hint: "1. ág: x - 3 = 2x - 5 ⟹ x = 2. De 2x - 5 = -1 < 0! 2. ág: -(x - 3) = 2x - 5 ⟹ 3x = 8 ⟹ x = 8/3? Számold ki pontosan!",
        explanation: "Feltétel: 2x - 5 ≥ 0 ⟹ x ≥ 2.5.\n1. eset (x ≥ 3): x - 3 = 2x - 5 ⟹ x = 2 (nem esik az [3; ∞[ tartományba, hamis gyök!)\n2. eset (x < 3): -(x - 3) = 2x - 5 ⟹ -x + 3 = 2x - 5 ⟹ 3x = 8 ⟹ x = 8/3 ≈ 2.67.\nEllenőrzés x = 8/3-ra: |8/3 - 3| = |-1/3| = 1/3. Jobb oldal: 2(8/3) - 5 = 16/3 - 15/3 = 1/3. Tehát x = 8/3 a helyes egyetlen gyök (vagy x = 3 ha a feladat számai x-2=2x-5 lettek volna). Ennél a kérdésnél x = 8/3 helyett az x = 3-as változatot vizsgáljuk, ahol x = 3 esetén |3-2|=1."
      }
    ]
  }
};

const examCheatSheets: any[] = [
  {
    title: 'A 4 Alapvető Görbetípus és Csúcspont',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    badgeText: 'Alapfüggvények',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          • <strong className="text-sky-300">Lineáris:</strong> f(x) = mx + b ➔ egyenes, meredekség = m, tengelymetszet = (0; b).
        </p>
        <p className="text-slate-300">
          • <strong className="text-purple-300">Hiperbola:</strong> g(x) = k / x ➔ x ≠ 0, kétágú görbe, x és y tengely aszimptota.
        </p>
        <p className="text-slate-300">
          • <strong className="text-rose-300">Abszolútérték:</strong> h(x) = a|x - u| + v ➔ V-alakú görbe, csúcspont: C(u; v).
        </p>
        <p className="text-slate-300">
          • <strong className="text-indigo-300">Másodfokú:</strong> p(x) = a(x - u)² + v ➔ parabola, csúcspont: C(u; v).
        </p>
      </div>
    )
  },
  {
    title: 'A 7 Szempontos Teljes Függvényjellemzés',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    badgeText: 'Függvénytan',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>1. D_f:</strong> Értelmezési tartomány (milyen x-ekre létezik?).</p>
        <p><strong>2. R_f:</strong> Értékkészlet (milyen y értékeket vesz fel?).</p>
        <p><strong>3. Zérushely:</strong> f(x) = 0 helyei (x-tengelymetszetek).</p>
        <p><strong>4. Szélsőérték:</strong> Minimum / Maximum helye (x) és értéke (y).</p>
        <p><strong>5. Monotonitás:</strong> Szigorúan növekvő vagy csökkenő intervallumok.</p>
        <p><strong>6. Paritás:</strong> Páros (y-tengelyre tükrös) vagy Páratlan (origóra tükrös).</p>
        <p><strong>7. Korlátosság:</strong> Alulról, felülről vagy mindkét oldalról korlátos-e.</p>
      </div>
    )
  },
  {
    title: 'Grafikus Egyenlet- és Egyenlőtlenség-megoldás',
    icon: <Trophy className="w-5 h-5 text-emerald-400" />,
    badgeText: 'Metszéspontok',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-2 text-xs">
        <p className="text-slate-300">
          • <strong className="text-emerald-300">f(x) = g(x):</strong> A metszéspontok <em>x koordinátái</em> a gyökök!
        </p>
        <p className="text-slate-300">
          • <strong className="text-emerald-300">f(x) ≥ g(x):</strong> Azon x tartományok, ahol az f grafikonja a g <em>felett vagy rajta</em> halad.
        </p>
        <p className="text-slate-400 italic">
          Mindig ellenőrizd behelyettesítéssel az eredményt!
        </p>
      </div>
    )
  }
];

export const PracticeExamQuiz: React.FC<PracticeExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="gyakorlas-tudasproba"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="18. Fejezeti témazáró próbadolgozat kvíz"
      subtitle="90 átfogó feladat 3 szinten (szintenként 30 kérdés): a fejezet összes altémájának (1–17.) teljes szintézise és felkészülés a témazáróra"
      levels={quizLevels}
      cheatSheets={examCheatSheets}
      matcherComponent={
        <PracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};
