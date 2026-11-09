import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { StretchTransformMatcher } from './StretchTransformMatcher';
import { StretchTransformSorter } from './StretchTransformSorter';
import {
  ParabolaStretchSvg,
  ParabolaReflectionSvg,
  AbsFunctionStretchSvg,
  ParabolaFocusDirectrixSvg
} from './StretchTransformFigures';

interface StretchTransformQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Nyújtás és zsugorítás: |a| szerepe',
    description: '|a| > 1 esetén az y-tengely mentén nyújtjuk a grafikont („soványabb”, meredekebb). 0 < |a| < 1 esetén zsugorítjuk („kövérebb”, laposabb).',
    note: 'Minden pont y-koordinátája a-szorosára nő: (x; y) ↦ (x; a · y). A zérushelyek és a csúcspont helye nem változik!',
    color: 'from-emerald-500 to-teal-600',
    figure: <ParabolaStretchSvg size={180} />
  },
  {
    title: 'Tükrözés az x-tengelyre: a < 0',
    description: 'Ha a negatív, a teljes grafikon az x-tengelyre tükröződik. A szárak lefelé nyílnak, a minimumból maximum lesz.',
    note: 'Értékkészlet: Rf = ]-∞; 0]. A monotonitási irányok megfordulnak (előbb nő, majd csökken).',
    color: 'from-rose-500 to-pink-600',
    figure: <ParabolaReflectionSvg size={180} />
  },
  {
    title: 'A páratlan lépések szorzója',
    description: 'Normálparabolánál a csúcsból indulva: 1, 3, 5, 7... lépéseket teszünk fel. f(x) = a · x² esetén ezek a-szorosukra módosulnak: 1a, 3a, 5a...',
    note: 'Példa: a = 2 esetén 2, 6, 10 egységet lépünk fel; a = -1 esetén 1, 3, 5 egységet lépünk lefelé!',
    color: 'from-indigo-500 to-purple-600',
    figure: <AbsFunctionStretchSvg size={180} />
  },
  {
    title: 'A parabola geometriai definíciója',
    description: 'A sík azon pontjainak halmaza, amelyek a fókusztól (F) és a vezéregyenestől (v) egyenlő távolságra vannak: d(P, F) = d(P, v).',
    note: 'A csúcspont pontosan félúton van a fókuszpont és a vezéregyenes között!',
    color: 'from-blue-500 to-cyan-600',
    figure: <ParabolaFocusDirectrixSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Nyújtás, zsugorítás és tükrözés alapjai',
    subtitle: 'Alapvető fogalmak, a és |a| geometriai jelentése, felfelé és lefelé nyíló görbék.',
    range: '1–10. feladat',
    focus: 'Meredekség, nyílásirány és ponttranszformáció',
    questions: [
      {
        id: 'stq1-1',
        questionTypeBadge: 'Nyújtás',
        question: 'Melyik állítás IGAZ az f(x) = 3x² függvény grafikonjára az f₀(x) = x² normálparabolához képest?',
        options: [
          '„Soványabb” (függőlegesen nyújtott, meredekebb szárakkal)',
          '„Kövérebb” (függőlegesen összenyomott, laposabb szárakkal)',
          'Lefelé nyíló parabola',
          '3 egységgel felfelé eltolt parabola'
        ],
        correctAnswer: 0,
        explanation: 'Mivel |a| = 3 > 1, a függvényértékek a 3-szorosukra nőnek, így a görbe függőlegesen megnyúlik, azaz „soványabb”, meredekebb lesz.'
      },
      {
        id: 'stq1-2',
        questionTypeBadge: 'Zsugorítás',
        question: 'Milyen alakú az f(x) = 0,25x² függvény grafikonja a normálparabolához képest?',
        options: [
          '„Kövérebb”, laposabb és kitárulóbb',
          '„Soványabb” és meredekebb',
          'Lefelé nyíló normálparabola',
          'Negyed egységgel lefelé eltolt parabola'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 0 < a = 0,25 < 1, a függőleges értékek a negyedükre zsugorodnak, így a parabola szárai szétnyílnak, „kövérebb” görbe keletkezik.'
      },
      {
        id: 'stq1-3',
        questionTypeBadge: 'Tükrözés',
        question: 'Mi történik egy parabola grafikonjával, ha az együtthatója negatív (pl. f(x) = -x²)?',
        options: [
          'Tükröződik az x-tengelyre, szárai lefelé nyílnak',
          'Tükröződik az y-tengelyre, szárai nem változnak',
          'Eltolódik a negatív y irányba',
          'Megfordul a csúcspontjának x-koordinátája'
        ],
        correctAnswer: 0,
        explanation: 'Az f(x) szorzása -1-gyel a pontok y-koordinátáit az ellentettjükre változtatja: (x; y) ↦ (x; -y), ami az x-tengelyre való tükrözésnek felel meg.'
      },
      {
        id: 'stq1-4',
        questionTypeBadge: 'Szélsőérték típusa',
        question: 'Milyen szélsőértéke van az f(x) = -2x² függvénynek a valós számok halmazán?',
        options: [
          'Globális maximuma van az origóban (értéke: 0)',
          'Globális minimuma van az origóban (értéke: 0)',
          'Nincs szélsőértéke',
          'Minimuma van x = -2 helyen'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = -2 < 0, a parabola lefelé nyílik, így a csúcspontjában (az origóban) a függvény a legnagyobb értékét veszi fel: maximuma van, értéke 0.'
      },
      {
        id: 'stq1-5',
        questionTypeBadge: 'Értékkészlet',
        question: 'Mi az értékkészlete az f(x) = -5x² függvénynek, ha Df = ℝ?',
        options: [
          'Rf = ]-∞; 0]',
          'Rf = [0; ∞[',
          'Rf = [-5; ∞[',
          'Rf = ]-∞; -5]'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x² ≥ 0, ezért -5x² ≤ 0 minden valós számra. A legfelső érték 0, lefelé bármilyen negatív értéket felvesz: Rf = ]-∞; 0].'
      },
      {
        id: 'stq1-6',
        questionTypeBadge: 'Pontkoordináta',
        question: 'Az f₀(x) = x² normálparabola átmegy a P(2; 4) ponton. Melyik pontba kerül ez az f(x) = 3x² függvény grafikonján?',
        options: [
          'P\'(2; 12)',
          'P\'(6; 4)',
          'P\'(6; 12)',
          'P\'(2; 7)'
        ],
        correctAnswer: 0,
        explanation: 'Az x-koordináta változatlan marad (x = 2), az y-koordináta a 3-szorosára nő: y\' = 3 · 4 = 12. Tehát a pont P\'(2; 12).'
      },
      {
        id: 'stq1-7',
        questionTypeBadge: 'Csúcspont',
        question: 'Hol található az f(x) = -4x² parabola csúcspontja (tengelypontja)?',
        options: [
          'T(0; 0)',
          'T(0; -4)',
          'T(-4; 0)',
          'T(4; 0)'
        ],
        correctAnswer: 0,
        explanation: 'Az a · x² alakú függvényeknél nincs eltolás, így a csúcspont mindig az origó: T(0; 0).'
      },
      {
        id: 'stq1-8',
        questionTypeBadge: 'Abszolútérték',
        question: 'Melyik állítás IGAZ az f(x) = 2|x| függvény grafikonjára?',
        options: [
          'V alakú grafikon, szárainak meredeksége ±2',
          'U alakú parabola, szárai kétszeresére nyúlnak',
          'Lefelé nyíló V alakú grafikon',
          'Az origóból 2 egységgel felfelé eltolt grafikon'
        ],
        correctAnswer: 0,
        explanation: 'Az abszolútérték-függvény grafikonja V alakú, és a 2 szorzó miatt a félegyenesek meredeksége 1 helyett 2 (jobbra 1 ⟶ fel 2), illetve -2 (balra 1 ⟶ fel 2).'
      },
      {
        id: 'stq1-9',
        questionTypeBadge: 'Zérushely',
        question: 'Hány zérushelye van a valós számok halmazán az f(x) = -10x² függvénynek?',
        options: [
          'Pontosan 1 zérushelye van: x = 0',
          '0 zérushelye van',
          '2 zérushelye van: x = ±10',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: '-10x² = 0 ⟹ x² = 0 ⟹ x = 0. A függvénynek egyetlen zérushelye van, az origóban érinti az x-tengelyt.'
      },
      {
        id: 'stq1-10',
        questionTypeBadge: 'Helyettesítési érték',
        question: 'Mennyi az f(x) = -0,5x² függvény helyettesítési értéke x = -4 esetén?',
        options: [
          '-8',
          '8',
          '-4',
          '16'
        ],
        correctAnswer: 0,
        explanation: 'f(-4) = -0,5 · (-4)² = -0,5 · 16 = -8.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, együtthatók és lépésszabály',
    subtitle: 'Együttható meghatározása pontokból, páratlan lépések mérete és szélsőértékek vizsgálata.',
    range: '11–20. feladat',
    focus: 'Együtthatók, pontillesztés és lépésszabály',
    questions: [
      {
        id: 'stq2-1',
        questionTypeBadge: 'Együttható kiszámítása',
        question: 'Egy f(x) = a · x² hozzárendelésű parabola átmegy a P(2; 12) ponton. Mennyi az a együttható értéke?',
        options: [
          'a = 3',
          'a = 6',
          'a = 1,5',
          'a = 2'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve: 12 = a · 2² ⟹ 12 = a · 4 ⟹ a = 12 / 4 = 3.'
      },
      {
        id: 'stq2-2',
        questionTypeBadge: 'Együttható kiszámítása',
        question: 'Egy lefelé nyíló parabola egyenlete f(x) = a · x², és átmegy a Q(3; -4,5) ponton. Mennyi az a értéke?',
        options: [
          'a = -0,5',
          'a = -1,5',
          'a = -2',
          'a = 0,5'
        ],
        correctAnswer: 0,
        explanation: '-4,5 = a · 3² ⟹ -4,5 = a · 9 ⟹ a = -4,5 / 9 = -0,5.'
      },
      {
        id: 'stq2-3',
        questionTypeBadge: 'Páratlan lépések',
        question: 'Az f(x) = 2x² parabola rajzolásakor a csúcspontból jobbra 1-et lépve hány egységet kell sorban függőlegesen fellépnünk?',
        options: [
          '2, majd 6, majd 10...',
          '1, majd 3, majd 5...',
          '2, majd 4, majd 6...',
          '4, majd 8, majd 12...'
        ],
        correctAnswer: 0,
        explanation: 'A normál lépések (1, 3, 5, 7...) 2-szeresét lépjük: 2·1 = 2; 2·3 = 6; 2·5 = 10; 2·7 = 14.'
      },
      {
        id: 'stq2-4',
        questionTypeBadge: 'Páratlan lépések',
        question: 'Ha egy parabolánál a csúcspontból 1-et jobbra lépve 0,5 egységet, a következő lépésnél 1,5 egységet lépünk fel, mi a függvény hozzárendelési szabálya?',
        options: [
          'f(x) = 0,5x²',
          'f(x) = 0,25x²',
          'f(x) = 2x²',
          'f(x) = x² + 0,5'
        ],
        correctAnswer: 0,
        explanation: 'Az első lépés értéke pontosan az a együttható: a · 1 = 0,5 ⟹ a = 0,5. Tehát f(x) = 0,5x².'
      },
      {
        id: 'stq2-5',
        questionTypeBadge: 'Monotonitás intervalluma',
        question: 'Melyik intervallumon szigorúan monoton NÖVEKVŐ az f(x) = -3x² függvény?',
        options: [
          ']-∞; 0] intervallumon',
          '[0; ∞[ intervallumon',
          ']-∞; -3] intervallumon',
          'Sehol sem növekvő'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = -3 < 0, a parabola lefelé nyílik. A bal oldalon (]-∞; 0]) felfelé halad a csúcspont felé, tehát itt szigorúan monoton nő!'
      },
      {
        id: 'stq2-6',
        questionTypeBadge: 'Metszéspont egyenessel',
        question: 'Hol metszi egymást az f(x) = 2x² parabola és az y = 8 vízszintes egyenes?',
        options: [
          'Az x = -2 és x = 2 helyeken',
          'Csak az x = 2 helyen',
          'Az x = -4 és x = 4 helyeken',
          'Nem metszik egymást'
        ],
        correctAnswer: 0,
        explanation: '2x² = 8 ⟹ x² = 4 ⟹ x = ±2. A metszéspontok: (-2; 8) és (2; 8).'
      },
      {
        id: 'stq2-7',
        questionTypeBadge: 'Gyökfüggvény tükrözése',
        question: 'Mi a g(x) = -2√x függvény értelmezési tartománya és értékkészlete?',
        options: [
          'Dg = [0; ∞[ és Rg = ]-∞; 0]',
          'Dg = ]-∞; 0] és Rg = [0; ∞[',
          'Dg = [0; ∞[ és Rg = [0; ∞[',
          'Dg = ℝ és Rg = ]-∞; 0]'
        ],
        correctAnswer: 0,
        explanation: 'A gyök alatt x ≥ 0 kell legyen, így Dg = [0; ∞[. A √x ≥ 0 értékeit megszorozva -2-vel az eredmény mindig nempozitív lesz: Rg = ]-∞; 0].'
      },
      {
        id: 'stq2-8',
        questionTypeBadge: 'Abszolútérték egyenlet',
        question: 'Mely x értékekre veszi fel az f(x) = -3|x| függvény a -12 értéket?',
        options: [
          'x = -4 és x = 4',
          'Csak x = 4',
          'Csak x = -4',
          'Nincs ilyen x, mert az abszolútérték nem lehet negatív'
        ],
        correctAnswer: 0,
        explanation: '-3|x| = -12 ⟹ |x| = 4 ⟹ x = 4 vagy x = -4. Mindkét érték helyes!'
      },
      {
        id: 'stq2-9',
        questionTypeBadge: 'Szélsőérték zárt intervallumon',
        question: 'Mi az f(x) = -2x² függvény MAXIMUMA a [-1; 3] intervallumon?',
        options: [
          '0 (az x = 0 helyen)',
          '-2 (az x = -1 helyen)',
          '-18 (az x = 3 helyen)',
          '18 (az x = -3 helyen)'
        ],
        correctAnswer: 0,
        explanation: 'A függvény értékei: f(-1) = -2; f(0) = 0; f(3) = -18. A legnagyobb érték a 0, amit az x = 0 helyen vesz fel.'
      },
      {
        id: 'stq2-10',
        questionTypeBadge: 'Különbség felismerése',
        question: 'Melyik összefüggés IGAZ az f(x) = -(3x)² és g(x) = -3x² függvényekre?',
        options: [
          'f(x) = -9x², így háromszor meredekebb lefelé nyíló görbe, mint g(x) = -3x²',
          'A két függvény hozzárendelési szabálya teljesen azonos',
          'f(x) felfelé nyílik, míg g(x) lefelé nyílik',
          'f(x) értékkészlete [0; ∞['
        ],
        correctAnswer: 0,
        explanation: '-(3x)² = -(9x²) = -9x², míg a g(x) = -3x². Mindkettő lefelé nyílik, de f(x) háromszor olyan meredeken zuhan lefelé.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett modellek, érettségi és emelt szint',
    subtitle: 'A Gateway Arch vizsgálata, fókusz és vezéregyenes, összetett transzformációk és paraméterek.',
    range: '21–30. feladat',
    focus: 'Valós modellek, mértani hely és összetett skálázás',
    questions: [
      {
        id: 'stq3-1',
        questionTypeBadge: 'Tankönyvi feladat: Gateway Arch',
        question: 'A St. Louis-i Gateway Arch boltív külső ívén a mérések szerint a (3; -5) pont illeszkedik. Ha feltesszük, hogy y = a · x² alakú parabola, mennyi lenne az a együttható?',
        options: [
          'a = -5/9',
          'a = -9/5',
          'a = -5/3',
          'a = -3/5'
        ],
        correctAnswer: 0,
        explanation: '-5 = a · 3² ⟹ -5 = 9a ⟹ a = -5/9 ≈ -0,56. (A tankönyvi vizsgálat bebizonyította, hogy a többi pont nem illeszkedik erre a parabolára, így a boltív valójában láncgörbe, nem parabola!)'
      },
      {
        id: 'stq3-2',
        questionTypeBadge: 'Parabola definíció',
        question: 'Egy parabola fókusza az F(0; 1) pont, vezéregyenese az y = -1 egyenes. Hol van a parabola csúcspontja?',
        options: [
          'Az origóban: T(0; 0)',
          'A T(0; 1) pontban',
          'A T(0; -1) pontban',
          'A T(0; 2) pontban'
        ],
        correctAnswer: 0,
        explanation: 'A parabola csúcspontja a fókusz és a vezéregyenes távolságának pontosan a felezőpontja: (1 + (-1)) / 2 = 0. Tehát a csúcspont az origó, T(0; 0).'
      },
      {
        id: 'stq3-3',
        questionTypeBadge: 'Összetett transzformáció',
        question: 'Melyik függvényt kapjuk, ha az f(x) = x² normálparabolát kétszeresére nyújtjuk, lefelé tükrözzük, majd 3-mal feljebb toljuk?',
        options: [
          'g(x) = -2x² + 3',
          'g(x) = -(2x + 3)²',
          'g(x) = 2x² - 3',
          'g(x) = -0,5x² + 3'
        ],
        correctAnswer: 0,
        explanation: 'Nyújtás 2-vel és lefelé tükrözés: a = -2. Felfelé tolás 3-mal: +3. Így g(x) = -2x² + 3.'
      },
      {
        id: 'stq3-4',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van a g(x) = -2x² + 8 függvénynek a valós számok halmazán?',
        options: [
          '2 zérushelye van: x = -2 és x = 2',
          '0 zérushelye van, mert lefelé nyílik',
          '1 zérushelye van: x = 0',
          '4 zérushelye van'
        ],
        correctAnswer: 0,
        explanation: '-2x² + 8 = 0 ⟹ 2x² = 8 ⟹ x² = 4 ⟹ x₁ = -2, x₂ = 2. Mivel a csúcs T(0; 8) fent van és lefelé nyílik, kétszer metszi az x-tengelyt.'
      },
      {
        id: 'stq3-5',
        questionTypeBadge: 'Szélsőérték és tartomány',
        question: 'Mi a h(x) = -0,5(x - 4)² + 6 függvény szélsőértéke és értékkészlete?',
        options: [
          'Maximuma van az x = 4 helyen (értéke: 6), Rh = ]-∞; 6]',
          'Minimuma van az x = 4 helyen (értéke: 6), Rh = [6; ∞[',
          'Maximuma van az x = -4 helyen (értéke: 6), Rh = ]-∞; 6]',
          'Maximuma van az x = 4 helyen (értéke: -6), Rh = ]-∞; -6]'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont T(4; 6). Mivel a = -0,5 < 0, a parabola lefelé nyílik, így globális maximuma van 6 értékkel, és Rh = ]-∞; 6].'
      },
      {
        id: 'stq3-6',
        questionTypeBadge: 'Geometriai affinitás',
        question: 'Egy sokszög területe 20 területegység. Ha a koordinátarendszerben x tengelyre merőleges affinitást alkalmazunk a = 3 aránnyal, mekkora lesz a transzformált alakzat területe?',
        options: [
          '60 területegység (3-szorosára nő)',
          '20 területegység (nem változik)',
          '180 területegység (9-szeresére nő)',
          '6,67 területegység'
        ],
        correctAnswer: 0,
        explanation: 'A merőleges affinitás az egyik irányban a-szorosára nyújtja a hosszakat, míg a másik irány változatlan marad, így az alakzatok területe pontosan |a|-szorosára (3 · 20 = 60) változik.'
      },
      {
        id: 'stq3-7',
        questionTypeBadge: 'Közös metszéspontok',
        question: 'Hány pontban metszi egymást az f(x) = 2x² és a g(x) = -2x² + 16 függvény?',
        options: [
          '2 metszéspontban: (-2; 8) és (2; 8)',
          '1 metszéspontban: az origóban',
          '0 metszéspontban',
          'Végtelen sok pontban'
        ],
        correctAnswer: 0,
        explanation: '2x² = -2x² + 16 ⟹ 4x² = 16 ⟹ x² = 4 ⟹ x = ±2. y = 2(±2)² = 8. Metszéspontok: (-2; 8) és (2; 8).'
      },
      {
        id: 'stq3-8',
        questionTypeBadge: 'Paraméter meghatározása',
        question: 'Az f(x) = a · |x - 2| + 5 függvényről tudjuk, hogy átmegy a P(6; -3) ponton. Mennyi az a értéke?',
        options: [
          'a = -2',
          'a = 2',
          'a = -1',
          'a = -0,5'
        ],
        correctAnswer: 0,
        explanation: '-3 = a · |6 - 2| + 5 ⟹ -3 = a · 4 + 5 ⟹ -8 = 4a ⟹ a = -2.'
      },
      {
        id: 'stq3-9',
        questionTypeBadge: 'Érettségi elmélet',
        question: 'Melyik állítás HAMIS az f: ℝ → ℝ, f(x) = -3(x + 1)² függvényre?',
        options: [
          'A függvénynek van pozitív értéke',
          'A függvény zérushelye x = -1',
          'A függvény értékkészlete ]-∞; 0]',
          'A grafikon szimmetriatengelye az x = -1 egyenes'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = -3 és a csúcs az x-tengelyen van T(-1; 0), a függvény értékei mindenütt legfeljebb 0-k (f(x) ≤ 0), így pozitív értéket soha nem vesz fel. Ezért az állítás HAMIS.'
      },
      {
        id: 'stq3-10',
        questionTypeBadge: 'Hiperbola nyújtása',
        question: 'Mi történik az f(x) = 1/x függvény grafikonjával, ha az egyenlete g(x) = -2/x lesz?',
        options: [
          'A hiperbola ágai a II. és IV. síknegyedbe tükröződnek és kétszeresükre nyúlnak',
          'A hiperbola ágai változatlanul az I. és III. negyedben maradnak',
          'Csak 2 egységgel lefelé tolódik',
          'A függőleges aszimptota az x = -2 egyenes lesz'
        ],
        correctAnswer: 0,
        explanation: 'g(x) = -2 · (1/x). A negatív előjel miatt a hiperbolaágak átkerülnek a II. és IV. síknegyedbe, a 2-es szorzó miatt pedig távolabb kerülnek az origótól (kétszeresére nyúlnak).'
      }
    ]
  }
};

export const StretchTransformQuiz: React.FC<StretchTransformQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="„Soványabb”, „kövérebb”"
      subtitle="Gyakorold a grafikonok nyújtását, zsugorítását és x-tengelyre való tükrözését!"
      themeColor="emerald"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={StretchTransformMatcher}
      sorterComponent={StretchTransformSorter}
    />
  );
};

