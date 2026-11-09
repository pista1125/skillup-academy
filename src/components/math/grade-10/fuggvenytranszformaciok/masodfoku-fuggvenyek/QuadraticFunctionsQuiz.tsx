import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticFunctionsMatcher } from './QuadraticFunctionsMatcher';
import { QuadraticFunctionsSorter } from './QuadraticFunctionsSorter';
import {
  CompletingSquareGeometricSvg,
  GeneralToCanonicalParabolaSvg,
  TwoParabolasSameVertexSvg
} from './QuadraticFunctionsFigures';

interface QuadraticFunctionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Általános vs. Kanonikus alak',
    description: 'Általános alak: f(x) = ax² + bx + c. A c tag azonnal megadja az y-tengelymetszetet: (0; c). Kanonikus alak: a(x - u)² + v, ahol T(u; v) a csúcspont.',
    note: 'Mindkét alakban ugyanaz az a főegyüttható szerepel, amely a meredekséget és a nyílás irányát határozza meg.',
    color: 'from-amber-500 to-orange-600',
    figure: <GeneralToCanonicalParabolaSvg size={180} />
  },
  {
    title: 'Teljes négyzetté kiegészítés',
    description: 'x² + bx kifejezés átírása: (x + b/2)² - (b/2)². Az elsőfokú tag együtthatóját felezzük, és a négyzetét levonjuk!',
    note: 'Ha a ≠ 1, először emeljük ki a-t a változós tagokból: a[x² + (b/a)x] + c.',
    color: 'from-indigo-500 to-purple-600',
    figure: <CompletingSquareGeometricSvg size={180} />
  },
  {
    title: 'A csúcspont képlete',
    description: 'u = -b / (2a) adja meg a szimmetriatengelyt és a csúcs x-koordinátáját. v = f(u) = c - b² / (4a) a csúcs y-koordinátája.',
    note: 'a > 0 esetén minimum van (értéke: v), a < 0 esetén maximum van (értéke: v).',
    color: 'from-emerald-500 to-teal-600',
    figure: <TwoParabolasSameVertexSvg size={180} />
  },
  {
    title: 'Egybevágó parabolák azonos csúccsal',
    description: 'Egy adott T(u; v) csúcsponttal és |a| = 1 görbülettel pontosan 2 másodfokú függvény létezik: f(x) = (x - u)² + v és g(x) = -(x - u)² + v.',
    note: 'Az egyik felfelé nyílik és minimuma van, a másik lefelé nyílik és maximuma van.',
    color: 'from-rose-500 to-pink-600',
    figure: <GeneralToCanonicalParabolaSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Nevezetes azonosságok és alapvető alakok',
    subtitle: 'Pontos teljes négyzetek, tengelymetszetek és csúcspontok azonosítása.',
    range: '1–10. feladat',
    focus: 'Azonosságok, y-metszet és alaptulajdonságok',
    questions: [
      {
        id: 'qfq1-1',
        questionTypeBadge: 'Nevezetes azonosság',
        question: 'Melyik teljes négyzetes alak felel meg az f(x) = x² + 6x + 9 függvénynek?',
        options: [
          'f(x) = (x + 3)²',
          'f(x) = (x - 3)²',
          'f(x) = (x + 6)²',
          'f(x) = (x + 9)²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 6x = 2 · 3 · x és 9 = 3², az (a + b)² = a² + 2ab + b² azonosság alapján f(x) = (x + 3)².'
      },
      {
        id: 'qfq1-2',
        questionTypeBadge: 'Csúcspont',
        question: 'Hol található az f(x) = (x + 5)² függvény csúcspontja?',
        options: [
          'T(-5; 0)',
          'T(5; 0)',
          'T(0; 5)',
          'T(0; -5)'
        ],
        correctAnswer: 0,
        explanation: 'Az (x + 5)² = (x - (-5))² + 0 kanonikus alakból u = -5 és v = 0, így T(-5; 0).'
      },
      {
        id: 'qfq1-3',
        questionTypeBadge: 'y-tengelymetszet',
        question: 'Hol metszi az y-tengelyt az f(x) = 2x² - 5x + 7 másodfokú függvény grafikonja?',
        options: [
          'A (0; 7) pontban',
          'A (0; -5) pontban',
          'A (7; 0) pontban',
          'A (0; 2) pontban'
        ],
        correctAnswer: 0,
        explanation: 'Az y-tengelyen x = 0. f(0) = 2·0² - 5·0 + 7 = 7. Az általános alak konstans tagja közvetlenül megadja a metszéspontot: (0; c) = (0; 7).'
      },
      {
        id: 'qfq1-4',
        questionTypeBadge: 'Nevezetes azonosság',
        question: 'Melyik függvény grafikonja ÉRINTI az x-tengelyt a (4; 0) pontban?',
        options: [
          'f(x) = x² - 8x + 16',
          'f(x) = x² + 8x + 16',
          'f(x) = x² - 4x + 16',
          'f(x) = x² - 16'
        ],
        correctAnswer: 0,
        explanation: 'A (4; 0) pontban érintő normálparabola képlete: (x - 4)² = x² - 8x + 16.'
      },
      {
        id: 'qfq1-5',
        questionTypeBadge: 'Szélsőérték iránya',
        question: 'Az f(x) = -3x² + 12x - 5 függvénynek minimuma vagy maximuma van?',
        options: [
          'Globális maximuma van, mert a = -3 < 0',
          'Globális minimuma van, mert a = -3 < 0',
          'Globális minimuma van, mert c = -5 < 0',
          'Nincs szélsőértéke'
        ],
        correctAnswer: 0,
        explanation: 'A szélsőérték típusát a főegyüttható (a) előjele dönti el: mivel a = -3 negatív, a parabola lefelé nyílik, így globális maximuma van.'
      },
      {
        id: 'qfq1-6',
        questionTypeBadge: 'Felezés szabálya',
        question: 'Ha az x² + 10x kifejezést teljes négyzetté alakítjuk, melyik tag jelenik meg a zárójelben?',
        options: [
          '(x + 5)²',
          '(x + 10)²',
          '(x + 20)²',
          '(x + 2,5)²'
        ],
        correctAnswer: 0,
        explanation: 'A lineáris tag együtthatóját felezni kell: 10 / 2 = 5, tehát (x + 5)².'
      },
      {
        id: 'qfq1-7',
        questionTypeBadge: 'Levonás szabálya',
        question: 'Mit kell levonni az (x - 4)² kifejezésből, hogy pontosan x² - 8x-et kapjunk?',
        options: [
          '16-ot',
          '-16-ot',
          '4-et',
          '8-at'
        ],
        correctAnswer: 0,
        explanation: '(x - 4)² = x² - 8x + 16. Hogy a felesleges 16 eltűnjön, 16-ot kell levonni: (x - 4)² - 16 = x² - 8x.'
      },
      {
        id: 'qfq1-8',
        questionTypeBadge: 'Csúcspont x-koordinátája',
        question: 'Mennyi a csúcspont x-koordinátája az f(x) = x² - 6x + 8 függvény esetén?',
        options: [
          'u = 3',
          'u = -3',
          'u = 6',
          'u = -6'
        ],
        correctAnswer: 0,
        explanation: 'u = -b / (2a) = -(-6) / (2 · 1) = 6 / 2 = 3.'
      },
      {
        id: 'qfq1-9',
        questionTypeBadge: 'Áttérés általános alakba',
        question: 'Mi az f(x) = (x - 3)² - 4 kanonikus alakú függvény általános (polinom) alakja?',
        options: [
          'f(x) = x² - 6x + 5',
          'f(x) = x² - 6x - 4',
          'f(x) = x² - 9x + 5',
          'f(x) = x² + 6x + 5'
        ],
        correctAnswer: 0,
        explanation: 'Zárójel felbontása: (x - 3)² - 4 = (x² - 6x + 9) - 4 = x² - 6x + 5.'
      },
      {
        id: 'qfq1-10',
        questionTypeBadge: 'Helyettesítési érték',
        question: 'Mennyi az f(x) = 2x² - 4x + 1 függvény értéke az x = 1 helyen (a csúcspontban)?',
        options: [
          '-1',
          '1',
          '3',
          '-3'
        ],
        correctAnswer: 0,
        explanation: 'f(1) = 2·1² - 4·1 + 1 = 2 - 4 + 1 = -1. Ez a parabola minimumának értéke (v = -1).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Teljes négyzetté kiegészítés és csúcspontszámítás',
    subtitle: 'Kanonikus alak levezetése lépésről lépésre, a ≠ 1 esetek és szélsőértékek.',
    range: '11–20. feladat',
    focus: 'Teljes négyzet levezetése és csúcsponti képlet',
    questions: [
      {
        id: 'qfq2-1',
        questionTypeBadge: 'Teljes négyzetté alakítás',
        question: 'Alakítsd teljes négyzetté az f(x) = x² + 4x + 7 kifejezést! Melyik a helyes kanonikus alak?',
        options: [
          'f(x) = (x + 2)² + 3',
          'f(x) = (x + 2)² + 7',
          'f(x) = (x + 4)² - 9',
          'f(x) = (x - 2)² + 3'
        ],
        correctAnswer: 0,
        explanation: 'x² + 4x = (x + 2)² - 4. Hozzáadva a 7-et: (x + 2)² - 4 + 7 = (x + 2)² + 3. Csúcspont: T(-2; 3).'
      },
      {
        id: 'qfq2-2',
        questionTypeBadge: 'Kiemelés a ≠ 1 esetén',
        question: 'Hogyan alakítható át az f(x) = 2x² + 8x + 6 függvény kanonikus alakra?',
        options: [
          'f(x) = 2(x + 2)² - 2',
          'f(x) = 2(x + 4)² - 2',
          'f(x) = (2x + 4)² - 10',
          'f(x) = 2(x + 2)² + 6'
        ],
        correctAnswer: 0,
        explanation: '1) 2 kiemelése: 2(x² + 4x) + 6. 2) Zárójel belseje: 2[(x + 2)² - 4] + 6. 3) Kifejtés: 2(x + 2)² - 8 + 6 = 2(x + 2)² - 2.'
      },
      {
        id: 'qfq2-3',
        questionTypeBadge: 'Negatív főegyüttható',
        question: 'Mi a csúcspontja az f(x) = -x² + 6x - 5 másodfokú függvénynek?',
        options: [
          'T(3; 4)',
          'T(-3; 4)',
          'T(3; -5)',
          'T(-3; -5)'
        ],
        correctAnswer: 0,
        explanation: 'u = -b / (2a) = -6 / (2 · (-1)) = 3. v = f(3) = -(3)² + 6·3 - 5 = -9 + 18 - 5 = 4. Csúcspont: T(3; 4).'
      },
      {
        id: 'qfq2-4',
        questionTypeBadge: 'Szélsőérték meghatározása',
        question: 'Hol és milyen szélsőértéke van az f(x) = 3x² - 12x + 14 függvénynek?',
        options: [
          'Minimuma van az x = 2 helyen, értéke: 2',
          'Maximuma van az x = 2 helyen, értéke: 2',
          'Minimuma van az x = -2 helyen, értéke: 2',
          'Minimuma van az x = 2 helyen, értéke: 14'
        ],
        correctAnswer: 0,
        explanation: 'a = 3 > 0 miatt minimuma van. u = -(-12)/(2·3) = 12/6 = 2. v = f(2) = 3·4 - 12·2 + 14 = 12 - 24 + 14 = 2.'
      },
      {
        id: 'qfq2-5',
        questionTypeBadge: 'Értékkészlet meghatározása',
        question: 'Mi az f(x) = -2x² + 8x - 3 függvény értékkészlete, ha Df = ℝ?',
        options: [
          'Rf = ]-∞; 5]',
          'Rf = [5; ∞[',
          'Rf = ]-∞; -3]',
          'Rf = [-3; ∞['
        ],
        correctAnswer: 0,
        explanation: 'a = -2 < 0 miatt a parabola lefelé nyílik. u = -8/(2·(-2)) = 2. v = f(2) = -2·4 + 8·2 - 3 = -8 + 16 - 3 = 5. A felvett értékek legfeljebb 5-ek: Rf = ]-∞; 5].'
      },
      {
        id: 'qfq2-6',
        questionTypeBadge: 'Áttérés polinom alakba',
        question: 'Mi az f(x) = -2(x - 3)² + 7 függvény általános alakja?',
        options: [
          'f(x) = -2x² + 12x - 11',
          'f(x) = -2x² - 12x + 7',
          'f(x) = -2x² + 6x - 11',
          'f(x) = -2x² + 12x + 7'
        ],
        correctAnswer: 0,
        explanation: '-2(x² - 6x + 9) + 7 = -2x² + 12x - 18 + 7 = -2x² + 12x - 11.'
      },
      {
        id: 'qfq2-7',
        questionTypeBadge: 'Tört együttható',
        question: 'Alakítsd kanonikus alakra az f(x) = 0,5x² - 2x + 4 függvényt!',
        options: [
          'f(x) = 0,5(x - 2)² + 2',
          'f(x) = 0,5(x - 2)² + 4',
          'f(x) = 0,5(x - 4)² + 2',
          'f(x) = (0,5x - 2)² + 2'
        ],
        correctAnswer: 0,
        explanation: '0,5(x² - 4x) + 4 = 0,5[(x - 2)² - 4] + 4 = 0,5(x - 2)² - 2 + 4 = 0,5(x - 2)² + 2.'
      },
      {
        id: 'qfq2-8',
        questionTypeBadge: 'Zérushelyek száma',
        question: 'Hány zérushelye van az f(x) = x² - 4x + 5 függvénynek?',
        options: [
          '0 zérushelye van',
          '1 zérushelye van',
          '2 zérushelye van',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        explanation: 'Kanonikus alak: (x - 2)² - 4 + 5 = (x - 2)² + 1. Mivel (x - 2)² ≥ 0, a függvény értéke mindig legalább 1 (f(x) ≥ 1), soha nem éri el a 0-t, így 0 zérushelye van.'
      },
      {
        id: 'qfq2-9',
        questionTypeBadge: 'Monotonitás',
        question: 'Melyik intervallumon szigorúan monoton NÖVEKVŐ az f(x) = x² - 8x + 12 függvény?',
        options: [
          '[4; ∞[ intervallumon',
          ']-∞; 4] intervallumon',
          '[2; 6] intervallumon',
          '[12; ∞[ intervallumon'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont u = -(-8)/(2·1) = 4. Mivel a = 1 > 0, felfelé nyílik, így a csúcsponttól jobbra, azaz a [4; ∞[ intervallumon szigorúan monoton nő.'
      },
      {
        id: 'qfq2-10',
        questionTypeBadge: 'Szimmetria',
        question: 'Tudjuk, hogy az f(x) = ax² + bx + c másodfokú függvényre f(1) = 5 és f(7) = 5. Mi a szimmetriatengelye?',
        options: [
          'Az x = 4 egyenes',
          'Az x = 3 egyenes',
          'Az x = 5 egyenes',
          'Az y = 5 egyenes'
        ],
        correctAnswer: 0,
        explanation: 'A parabola szimmetriája miatt az azonos függvényértékhez tartozó x-értékek felezőpontjában van a szimmetriatengely: u = (1 + 7) / 2 = 8 / 2 = 4.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szöveges optimumok, geometriai feladatok és emelt szint',
    subtitle: 'Összetett feladványok, paraméteres egyenletek és érettségi típusú szélsőérték-feladatok.',
    range: '21–30. feladat',
    focus: 'Összetett feladványok, paraméterek és komplex optimumok',
    questions: [
      {
        id: 'qfq3-1',
        questionTypeBadge: 'Parabola egybevágóság',
        question: 'Egy másodfokú függvény grafikonja olyan parabola, amely egybevágó az f₀(x) = x² függvény grafikonjával, és a csúcspontja a T(-2; 5) pont. Hány ilyen másodfokú függvény van?',
        options: [
          'Pontosan 2 ilyen függvény van: f₁(x) = (x + 2)² + 5 és f₂(x) = -(x + 2)² + 5',
          'Csak 1 ilyen függvény van: f(x) = (x + 2)² + 5',
          'Végtelen sok ilyen függvény van',
          'Nincs ilyen függvény'
        ],
        correctAnswer: 0,
        explanation: 'Egybevágóság esetén |a| = 1, ami két esetet enged meg: a = 1 (felfelé nyíló) és a = -1 (lefelé nyíló). Mindkettő csúcspontja (-2; 5), így pontosan 2 ilyen függvény létezik.'
      },
      {
        id: 'qfq3-2',
        questionTypeBadge: 'Függvény felírása',
        question: 'Adj meg olyan másodfokú függvényt, amelynek az x = -4 helyen minimuma van, a minimum értéke pedig -3, és egybevágó az x²-tel! Mi a polinom alakja?',
        options: [
          'f(x) = x² + 8x + 13',
          'f(x) = x² - 8x + 13',
          'f(x) = x² + 8x - 3',
          'f(x) = x² + 4x - 3'
        ],
        correctAnswer: 0,
        explanation: 'Minimum van ⟹ a = 1. Csúcs T(-4; -3) ⟹ Kanonikus alak: (x + 4)² - 3 = x² + 8x + 16 - 3 = x² + 8x + 13.'
      },
      {
        id: 'qfq3-3',
        questionTypeBadge: 'Pontokból felírás',
        question: 'Egy parabola átmegy az origón O(0; 0) és a P(4; 0) ponton, a csúcspontja T(2; -4). Mi a függvény általános alakja?',
        options: [
          'f(x) = x² - 4x',
          'f(x) = x² - 4x + 4',
          'f(x) = 2x² - 8x',
          'f(x) = -x² + 4x'
        ],
        correctAnswer: 0,
        explanation: 'Csúcs T(2; -4) ⟹ f(x) = a(x - 2)² - 4. Mivel átmegy az origón: f(0) = a·(-2)² - 4 = 4a - 4 = 0 ⟹ a = 1. Így f(x) = (x - 2)² - 4 = x² - 4x + 4 - 4 = x² - 4x.'
      },
      {
        id: 'qfq3-4',
        questionTypeBadge: 'Paraméter meghatározása',
        question: 'Az f(x) = 2x² + bx + 11 függvény csúcspontjának x-koordinátája u = 3. Mennyi a b paraméter értéke?',
        options: [
          'b = -12',
          'b = 12',
          'b = -6',
          'b = 6'
        ],
        correctAnswer: 0,
        explanation: 'u = -b / (2a) = -b / (2 · 2) = -b / 4 = 3 ⟹ -b = 12 ⟹ b = -12.'
      },
      {
        id: 'qfq3-5',
        questionTypeBadge: 'Paraméter meghatározása',
        question: 'Az f(x) = -x² + 4x + c függvény maximumértéke 9. Mennyi a c értéke?',
        options: [
          'c = 5',
          'c = 9',
          'c = -5',
          'c = 13'
        ],
        correctAnswer: 0,
        explanation: 'Maximumhely: u = -4 / (2 · (-1)) = 2. Maximumérték: f(2) = -(2)² + 4·2 + c = -4 + 8 + c = 4 + c = 9 ⟹ c = 5.'
      },
      {
        id: 'qfq3-6',
        questionTypeBadge: 'Zárt intervallum szélsőérték',
        question: 'Határozd meg az f(x) = x² - 4x + 1 függvény MINIMUMÁT a [0; 5] zárt intervallumon!',
        options: [
          '-3 (az x = 2 helyen)',
          '1 (az x = 0 helyen)',
          '6 (az x = 5 helyen)',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'Kanonikus alak: (x - 2)² - 3. A csúcs x = 2 helyen van, amely beletartozik a [0; 5] intervallumba. Mivel a = 1 > 0, itt van a globális minimum, amelynek értéke -3.'
      },
      {
        id: 'qfq3-7',
        questionTypeBadge: 'Zárt intervallum maximum',
        question: 'Határozd meg az előző f(x) = x² - 4x + 1 függvény MAXIMUMÁT a [0; 5] zárt intervallumon!',
        options: [
          '6 (az x = 5 helyen)',
          '1 (az x = 0 helyen)',
          '-3 (az x = 2 helyen)',
          '10'
        ],
        correctAnswer: 0,
        explanation: 'A végpontok értékei: f(0) = 1; f(5) = 5² - 4·5 + 1 = 25 - 20 + 1 = 6. A felvett legnagyobb érték a 6 az x = 5 helyen.'
      },
      {
        id: 'qfq3-8',
        questionTypeBadge: 'Érintő parabola feltétele',
        question: 'Milyen k valós szám esetén érinti az f(x) = x² - 6x + k másodfokú függvény grafikonja az x-tengelyt?',
        options: [
          'k = 9',
          'k = -9',
          'k = 3',
          'k = 36'
        ],
        correctAnswer: 0,
        explanation: 'Pontosan akkor érinti a tengelyt, ha pontos teljes négyzet: x² - 6x + k = (x - 3)² = x² - 6x + 9, azaz k = 9.'
      },
      {
        id: 'qfq3-9',
        questionTypeBadge: 'Közös pontok száma',
        question: 'Hány közös pontja van az f(x) = x² - 2x + 3 és a g(x) = 2x - 1 függvényeknek?',
        options: [
          '1 közös pontja van (érintik egymást a (2; 3) pontban)',
          '2 közös pontja van',
          '0 közös pontja van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'x² - 2x + 3 = 2x - 1 ⟹ x² - 4x + 4 = 0 ⟹ (x - 2)² = 0 ⟹ x = 2. y = 2·2 - 1 = 3. Pontosan egy közös érintési pont van: (2; 3).'
      },
      {
        id: 'qfq3-10',
        questionTypeBadge: 'Emelt szintű átírás',
        question: 'Ha az f(x) = -2x² + 12x - 10 függvényt a(x - u)² + v alakba írjuk, mennyi az a + u + v összege?',
        options: [
          '9',
          '13',
          '7',
          '5'
        ],
        correctAnswer: 0,
        explanation: 'u = -12 / (2 · (-2)) = 3. v = f(3) = -2·9 + 12·3 - 10 = -18 + 36 - 10 = 8. a = -2. Az összeg: a + u + v = -2 + 3 + 8 = 9.'
      }
    ]
  }
};

export const QuadraticFunctionsQuiz: React.FC<QuadraticFunctionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Másodfokú függvények"
      subtitle="Gyakorold az általános alak és a kanonikus alak közötti átváltást, valamint a csúcspont számítását!"
      themeColor="amber"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={QuadraticFunctionsMatcher}
      sorterComponent={QuadraticFunctionsSorter}
    />
  );
};

