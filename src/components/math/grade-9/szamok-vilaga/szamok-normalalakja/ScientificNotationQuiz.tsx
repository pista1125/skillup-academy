import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ScientificNotationMatcher } from './ScientificNotationMatcher';
import { ScientificNotationSorter } from './ScientificNotationSorter';
import {
  ScientificNotationStructureSvg,
  DecimalShiftSvg,
  UniverseScaleSvg,
  CalculatorDisplaySvg
} from './ScientificNotationFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface ScientificNotationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Felismerés (Könnyű)',
    subtitle: 'Normálalak definíciója, a mantissza feltétele (1 ≤ |a| < 10) és a kitevő előjele.',
    range: '1 - 10. feladat',
    focus: 'Definíció és Szabványos Alak',
    questions: [
      {
        id: 'snq1-1',
        questionTypeBadge: 'Normálalak Definíció',
        question: 'Melyik az alábbiak közül a normálalak pontos matematikai definíciója?',
        figure: <ScientificNotationStructureSvg size={170} />,
        options: [
          'a · 10^k, ahol 1 ≤ |a| < 10 és k egész szám',
          'a · 10^k, ahol 0 ≤ a < 100 és k természetes szám',
          'a · 10^k, ahol a tetszőleges egész szám és k > 0',
          '10^a · k, ahol a és k racionális számok'
        ],
        correctAnswer: 0,
        hint: 'A mantisszának (a) 1 és 10 közé kell esnie, a kitevőnek (k) pedig egész számnak kell lennie.',
        explanation: 'A tudományos normálalak definíciója: a · 10^k, ahol 1 ≤ |a| < 10 és k ∈ ℤ.'
      },
      {
        id: 'snq1-2',
        questionTypeBadge: 'Alak Felismerése',
        question: 'Melyik szám van helyes, szabványos normálalakban felírva?',
        options: [
          '3,5 · 10⁶',
          '35 · 10⁵',
          '0,35 · 10⁷',
          '350 · 10⁴'
        ],
        correctAnswer: 0,
        hint: 'A tizedesvessző előtt PONTOSAN egy darab nemnulla számjegynek kell állnia (1 és 9 között).',
        explanation: 'Csak a 3,5 · 10⁶ helyes, mert 1 ≤ 3,5 < 10. A 35 túl nagy (≥10), a 0,35 pedig túl kicsi (<1).'
      },
      {
        id: 'snq1-3',
        questionTypeBadge: 'Mantissza Szabálya',
        question: 'Hány darab nemnulla számjegy állhat a tizedesvessző előtt egy szám helyes normálalakjában?',
        options: [
          'Pontosan 1 darab (1, 2, 3, 4, 5, 6, 7, 8 vagy 9)',
          'Legfeljebb 2 darab',
          'Tetszőleges számú',
          '0 darab'
        ],
        correctAnswer: 0,
        hint: 'Mivel 1 ≤ |a| < 10, a vessző előtt csak egyetlen jegy állhat.',
        explanation: 'A mantissza 1 és 10 közé esik, ezért az egészrészben mindig pontosan egy darab nemnulla számjegy szerepel.'
      },
      {
        id: 'snq1-4',
        questionTypeBadge: 'Kitevő Előjele',
        question: 'Milyen előjelű lesz a 10-es hatvány kitevője, ha a 450 000 számot normálalakra hozzuk?',
        figure: <DecimalShiftSvg size={170} />,
        options: [
          'Pozitív (+5)',
          'Negatív (-5)',
          'Nulla',
          'Nem lehet eldönteni'
        ],
        correctAnswer: 0,
        hint: 'Nagy számoknál (≥10) a vesszőt balra toljuk, a kitevő pozitív lesz: 4,5 · 10⁵.',
        explanation: '450 000 = 4,5 · 10⁵. Mivel a szám nagyobb 10-nél, a kitevő pozitív egész szám (+5).'
      },
      {
        id: 'snq1-5',
        questionTypeBadge: 'Kis Számok Kitevője',
        question: 'Milyen előjelű a kitevő a 0,00042 szám normálalakjában?',
        figure: <DecimalShiftSvg size={170} />,
        options: [
          'Negatív (-4)',
          'Pozitív (+4)',
          'Nulla',
          'Tört'
        ],
        correctAnswer: 0,
        hint: '1-nél kisebb pozitív számnál a vesszőt jobbra toljuk, a kitevő negatív: 4,2 · 10⁻⁴.',
        explanation: '0,00042 = 4,2 · 10⁻⁴. Mivel a szám kisebb 1-nél, a kitevő negatív (-4).'
      },
      {
        id: 'snq1-6',
        questionTypeBadge: 'Negatív Kitevő Csapdája',
        question: 'Milyen előjelű a 3 · 10⁻⁵ szám valójában?',
        options: [
          'Pozitív (+0,00003)',
          'Negatív (-0,00003)',
          'Nulla',
          'Nem létezik'
        ],
        correctAnswer: 0,
        hint: 'A kitevő mínuszjele a nagyságrendet (tizedesjegyek számát) jelzi, nem a szám előjelét!',
        explanation: '10⁻⁵ = 0,00001, így 3 · 10⁻⁵ = 0,00003, ami szigorúan POZITÍV szám.'
      },
      {
        id: 'snq1-7',
        questionTypeBadge: 'Nulladik Kitevő',
        question: 'Mennyi a 7 · 10⁰ kifejezés értéke?',
        options: [
          '7 (mert 10⁰ = 1)',
          '0',
          '70',
          '700'
        ],
        correctAnswer: 0,
        hint: 'Bármely nemnulla szám nulladik hatványa 1: 10⁰ = 1.',
        explanation: '10⁰ = 1, ezért 7 · 10⁰ = 7 · 1 = 7.'
      },
      {
        id: 'snq1-8',
        questionTypeBadge: 'Kerek Tízesek Normálalakja',
        question: 'Hogyan írjuk fel az 1000 számot szabványos normálalakban?',
        options: [
          '1 · 10³',
          '10 · 10²',
          '10³',
          '0,1 · 10⁴'
        ],
        correctAnswer: 0,
        hint: 'A mantisszának szerepelnie kell: 1 · 10³.',
        explanation: '1000 = 1 · 10³. Bár a köznyelvben sokszor csak 10³-t mondunk, a normálalak pontos felírása a · 10^k, azaz 1 · 10³.'
      },
      {
        id: 'snq1-9',
        questionTypeBadge: 'Számológépes Kijelző',
        question: 'Mit jelent a zsebszámológép kijelzőjén megjelenő 4.5 E+06 felirat?',
        figure: <CalculatorDisplaySvg size={170} />,
        options: [
          '4,5 · 10⁶ = 4 500 000',
          '4,5 + 6 = 10,5',
          '4,5⁶',
          '4,5 / 10⁶'
        ],
        correctAnswer: 0,
        hint: 'Az "E" betű a számológépen az Exponent (10-es hatványkitevő) rövidítése.',
        explanation: '4.5 E+06 = 4,5 · 10⁶ = 4 500 000.'
      },
      {
        id: 'snq1-10',
        questionTypeBadge: 'Egyjegyű Szám Normálalakja',
        question: 'Mi a 8 szám normálalakja?',
        options: [
          '8 · 10⁰',
          '0,8 · 10¹',
          '8 · 10¹',
          '80 · 10⁻¹'
        ],
        correctAnswer: 0,
        hint: 'Mivel 1 ≤ 8 < 10, a vesszőt 0 hellyel kell eltolni.',
        explanation: '8 = 8 · 1 = 8 · 10⁰. A mantissza 8, a kitevő 0.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Átváltások és Vesszőléptetés (Közepes)',
    subtitle: 'Tizedestört átírása normálalakra és vissza, korrekció és nagyságrendi összehasonlítás.',
    range: '11 - 20. feladat',
    focus: 'Átváltási Rutin és Összehasonlítás',
    questions: [
      {
        id: 'snq2-1',
        questionTypeBadge: 'Nagy Szám Átírása',
        question: 'Írd fel a 65 000 000 számot normálalakban!',
        figure: <DecimalShiftSvg size={170} />,
        options: [
          '6,5 · 10⁷',
          '6,5 · 10⁶',
          '65 · 10⁶',
          '0,65 · 10⁸'
        ],
        correctAnswer: 0,
        hint: 'A vesszőt 7 hellyel toljuk balra a 6-os utánig: 65 000 000,0.',
        explanation: 'A tizedesvessző 7 helyiértéket lép balra: 6,5 · 10⁷.'
      },
      {
        id: 'snq2-2',
        questionTypeBadge: 'Kis Szám Átírása',
        question: 'Hogyan írható fel a 0,000034 szám normálalakban?',
        figure: <DecimalShiftSvg size={170} />,
        options: [
          '3,4 · 10⁻⁵',
          '3,4 · 10⁻⁴',
          '34 · 10⁻⁶',
          '0,34 · 10⁻⁴'
        ],
        correctAnswer: 0,
        hint: 'Számold meg, hány helyet lép a vessző jobbra a 3-as utánig: 5 lépés.',
        explanation: 'A vessző 5 helyiértéket lép jobbra: 3,4 · 10⁻⁵.'
      },
      {
        id: 'snq2-3',
        questionTypeBadge: 'Visszaalakítás Tizedestörtté',
        question: 'Melyik számmal egyenlő az 5,2 · 10⁴ normálalak?',
        options: [
          '52 000',
          '520 000',
          '5 200',
          '0,00052'
        ],
        correctAnswer: 0,
        hint: 'A pozitív 4-es kitevő miatt a vesszőt 4 hellyel toljuk jobbra.',
        explanation: '5,2 · 10 000 = 52 000 (a vesszőt 4 hellyel toltuk jobbra).'
      },
      {
        id: 'snq2-4',
        questionTypeBadge: 'Visszaalakítás Negatív Kitevővel',
        question: 'Mennyi a 7,8 · 10⁻³ szám tizedestört alakja?',
        options: [
          '0,0078',
          '0,078',
          '0,00078',
          '-7800'
        ],
        correctAnswer: 0,
        hint: 'A negatív 3-as kitevő miatt a vesszőt 3 hellyel toljuk balra.',
        explanation: '7,8 · 10⁻³ = 7,8 / 1000 = 0,0078.'
      },
      {
        id: 'snq2-5',
        questionTypeBadge: 'Nem Szabványos Alak Korrekciója',
        question: 'Hogyan alakítható át a 75 · 10⁴ kifejezés helyes normálalakra?',
        options: [
          '7,5 · 10⁵',
          '7,5 · 10³',
          '0,75 · 10⁶',
          '750 · 10³'
        ],
        correctAnswer: 0,
        hint: '75 = 7,5 · 10¹. Így (7,5 · 10¹) · 10⁴ = 7,5 · 10⁵.',
        explanation: '75 · 10⁴ = (7,5 · 10¹) · 10⁴ = 7,5 · 10¹⁺⁴ = 7,5 · 10⁵.'
      },
      {
        id: 'snq2-6',
        questionTypeBadge: 'Nem Szabványos Tört Korrekciója',
        question: 'Hogyan írható fel helyes normálalakban a 0,06 · 10⁵ kifejezés?',
        options: [
          '6 · 10³',
          '6 · 10⁴',
          '6 · 10⁵',
          '0,6 · 10⁴'
        ],
        correctAnswer: 0,
        hint: '0,06 = 6 · 10⁻². (6 · 10⁻²) · 10⁵ = 6 · 10³.',
        explanation: '0,06 · 10⁵ = (6 · 10⁻²) · 10⁵ = 6 · 10⁻²⁺⁵ = 6 · 10³.'
      },
      {
        id: 'snq2-7',
        questionTypeBadge: 'Negatív Szám Normálalakja',
        question: 'Mi a -82 000 szám helyes normálalakja?',
        options: [
          '-8,2 · 10⁴',
          '8,2 · 10⁻⁴',
          '-(8,2 · 10⁻⁴)',
          '-82 · 10³'
        ],
        correctAnswer: 0,
        hint: 'A negatív előjel a mantissza része: -8,2. A 82 000 értéke miatt a kitevő pozitív: +4.',
        explanation: '-82 000 = -8,2 · 10⁴. 1 ≤ |-8,2| = 8,2 < 10 teljesül!'
      },
      {
        id: 'snq2-8',
        questionTypeBadge: 'Negatív Tizedestört Normálalakja',
        question: 'Írd fel normálalakban a -0,0005 számot!',
        options: [
          '-5 · 10⁻⁴',
          '-5 · 10⁴',
          '5 · 10⁻⁴',
          '-0,5 · 10⁻³'
        ],
        correctAnswer: 0,
        hint: 'A mantissza -5, a vesszőt 4 hellyel toljuk jobbra: 10⁻⁴.',
        explanation: '-0,0005 = -5 · 10⁻⁴.'
      },
      {
        id: 'snq2-9',
        questionTypeBadge: 'Nagyságrendi Összehasonlítás',
        question: 'Melyik a nagyobb: 2,5 · 10⁶ vagy 9,8 · 10⁵?',
        options: [
          '2,5 · 10⁶ a nagyobb (mert a 10-es kitevő 6 > 5)',
          '9,8 · 10⁵ a nagyobb (mert a mantissza 9,8 > 2,5)',
          'Egyenlők',
          'Nem összehasonlítható'
        ],
        correctAnswer: 0,
        hint: 'Pozitív számoknál a nagyobb 10-es kitevő mindig nagyobb számot jelent!',
        explanation: '2,5 · 10⁶ = 2 500 000, míg 9,8 · 10⁵ = 980 000. A nagyobb kitevő dominál, így 2,5 · 10⁶ a nagyobb.'
      },
      {
        id: 'snq2-10',
        questionTypeBadge: 'Azonos Kitevőjű Összehasonlítás',
        question: 'Melyik reláció igaz az alábbiak közül?',
        options: [
          '4,5 · 10⁻⁴ > 3,8 · 10⁻⁴',
          '4,5 · 10⁻⁴ < 3,8 · 10⁻⁴',
          '4,5 · 10⁻⁴ = 3,8 · 10⁻⁴',
          '3,8 · 10⁻⁴ > 4,5 · 10⁻⁴'
        ],
        correctAnswer: 0,
        hint: 'Ha a kitevők megegyeznek (-4), a mantisszák nagysága dönt: 4,5 > 3,8.',
        explanation: 'Mivel a kitevők azonosak (-4), a nagyobb mantissza adja a nagyobb értéket: 0,00045 > 0,00038.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi Alkalmazások, Mértékegységek és Becslés (Haladó)',
    subtitle: 'Fizikai konstansok, mértékegység-váltás, szorzások nagyságrendje és szöveges feladatok.',
    range: '21 - 30. feladat',
    focus: 'Érettségi és Alkalmazási Feladatok',
    questions: [
      {
        id: 'snq3-1',
        questionTypeBadge: 'Mértékegység Átváltás',
        question: 'A fénysebesség vákuumban kb. 3 · 10⁸ m/s. Mennyi ez km/s-ban normálalakban kifejezve?',
        options: [
          '3 · 10⁵ km/s',
          '3 · 10¹¹ km/s',
          '300 000 km/s',
          '3 · 10⁶ km/s'
        ],
        correctAnswer: 0,
        hint: '1 km = 1000 m = 10³ m. Tehát osztani kell 10³-nal: (3 · 10⁸) / 10³.',
        explanation: '(3 · 10⁸ m/s) / 10³ = 3 · 10⁸⁻³ = 3 · 10⁵ km/s (= 300 000 km/s).'
      },
      {
        id: 'snq3-2',
        questionTypeBadge: 'Hányszorosa Feladat',
        question: 'Hányszorosa a 6 · 10⁸ szám a 2 · 10⁵ számnak?',
        options: [
          '3 · 10³-szorosa (azaz 3000-szerese)',
          '3 · 10¹³-szorosa',
          '4 · 10³-szorosa',
          '300-szorosa'
        ],
        correctAnswer: 0,
        hint: 'Oszd el a két számot: (6 · 10⁸) / (2 · 10⁵) = (6/2) · 10⁸⁻⁵.',
        explanation: '(6 · 10⁸) / (2 · 10⁵) = (6 / 2) · 10⁸⁻⁵ = 3 · 10³ = 3000.'
      },
      {
        id: 'snq3-3',
        questionTypeBadge: 'Mikroszkopikus Mértékegység',
        question: 'Egy baktérium hossza 2 · 10⁻⁶ m. Hány nanométer (nm) ez, ha 1 nm = 10⁻⁹ m?',
        figure: <UniverseScaleSvg size={170} />,
        options: [
          '2000 nm (azaz 2 · 10³ nm)',
          '200 nm',
          '2 · 10⁻¹⁵ nm',
          '0,002 nm'
        ],
        correctAnswer: 0,
        hint: '(2 · 10⁻⁶) / 10⁻⁹ = 2 · 10⁻⁶⁻⁽⁻⁹⁾ = 2 · 10³ = 2000.',
        explanation: '(2 · 10⁻⁶ m) / (10⁻⁹ m/nm) = 2 · 10⁻⁶⁺⁹ = 2 · 10³ nm = 2000 nm.'
      },
      {
        id: 'snq3-4',
        questionTypeBadge: 'Összetett Korrekció',
        question: 'Hogyan írható fel helyes normálalakban a 0,0048 · 10⁻² szám?',
        options: [
          '4,8 · 10⁻⁵',
          '4,8 · 10⁻¹',
          '48 · 10⁻⁶',
          '4,8 · 10⁻⁴'
        ],
        correctAnswer: 0,
        hint: '0,0048 = 4,8 · 10⁻³. Ezt szorozzuk 10⁻²-nel: 4,8 · 10⁻³⁺⁽⁻²⁾.',
        explanation: '0,0048 · 10⁻² = (4,8 · 10⁻³) · 10⁻² = 4,8 · 10⁻⁵.'
      },
      {
        id: 'snq3-5',
        questionTypeBadge: 'Negatív Kitevők Összehasonlítása',
        question: 'Melyik a nagyobb: 7 · 10⁻⁶ vagy 2 · 10⁻⁵ ?',
        options: [
          '2 · 10⁻⁵ a nagyobb (mert -5 > -6)',
          '7 · 10⁻⁶ a nagyobb (mert 7 > 2)',
          'Egyenlők',
          'Nem összehasonlítható'
        ],
        correctAnswer: 0,
        hint: '2 · 10⁻⁵ = 0,000020, míg 7 · 10⁻⁶ = 0,000007. Mivel -5 > -6, a 2 · 10⁻⁵ a nagyobb!',
        explanation: '2 · 10⁻⁵ = 20 · 10⁻⁶ > 7 · 10⁻⁶. A -5 nagyobb a -6-nál, így 2 · 10⁻⁵ a nagyobb.'
      },
      {
        id: 'snq3-6',
        questionTypeBadge: 'Kijelző Olvasása',
        question: 'Melyik számnak felel meg a kijelzőn látható 1.23 -05 jelölés?',
        figure: <CalculatorDisplaySvg size={170} />,
        options: [
          '0,0000123 (1,23 · 10⁻⁵)',
          '0,000123',
          '-123 000',
          '123 000'
        ],
        correctAnswer: 0,
        hint: 'A -05 a kitevőt jelzi: 1,23 · 10⁻⁵.',
        explanation: '1,23 · 10⁻⁵ = 0,0000123 (a vesszőt 5 hellyel toljuk balra).'
      },
      {
        id: 'snq3-7',
        questionTypeBadge: 'Nagyságrend Becslése',
        question: 'A Föld tömege kb. 5,97 · 10²⁴ kg. Melyik 10-es hatvány fejezi ki legjobban a nagyságrendjét?',
        options: [
          '10²⁵ kg (mert 5,97 közelebb van a 10-hez, mint az 1-hez)',
          '10²⁴ kg',
          '10²⁶ kg',
          '10²³ kg'
        ],
        correctAnswer: 0,
        hint: 'A nagyságrendi kerekítés határa √10 ≈ 3,16. Mivel 5,97 > 3,16, a felső 10-es hatványhoz kerekítünk.',
        explanation: 'Mivel 5,97 ≥ √10 ≈ 3,16, a nagyságrend 10 · 10²⁴ = 10²⁵ kg.'
      },
      {
        id: 'snq3-8',
        questionTypeBadge: 'Érettségi Szöveges Feladat',
        question: 'Egy csepp vízben kb. 1,7 · 10²¹ molekula található. Hány molekula van 1000 csepp vízben normálalakban kifejezve?',
        options: [
          '1,7 · 10²⁴ molekula',
          '1,7 · 10²² molekula',
          '1700 · 10²¹ molekula',
          '1,7 · 10²³ molekula'
        ],
        correctAnswer: 0,
        hint: '1000 = 10³. Szorozd meg: (1,7 · 10²¹) · 10³ = 1,7 · 10²⁴.',
        explanation: '(1,7 · 10²¹) · 10³ = 1,7 · 10²¹⁺³ = 1,7 · 10²⁴ molekula.'
      },
      {
        id: 'snq3-9',
        questionTypeBadge: 'Összetett Szorzat Normálalakja',
        question: 'Írd fel normálalakban a 250 · 10⁻⁷ számot!',
        options: [
          '2,5 · 10⁻⁵',
          '2,5 · 10⁻⁹',
          '2,5 · 10⁻⁶',
          '25 · 10⁻⁶'
        ],
        correctAnswer: 0,
        hint: '250 = 2,5 · 10². Így 2,5 · 10² · 10⁻⁷ = 2,5 · 10²⁻⁷ = 2,5 · 10⁻⁵.',
        explanation: '250 · 10⁻⁷ = (2,5 · 10²) · 10⁻⁷ = 2,5 · 10²⁺⁽⁻⁷⁾ = 2,5 · 10⁻⁵.'
      },
      {
        id: 'snq3-10',
        questionTypeBadge: 'Növekvő Sorrend',
        question: 'Állítsd növekvő sorrendbe a következő számokat: A = 3 · 10⁻⁴, B = 5 · 10⁻⁵, C = 2 · 10⁻³ !',
        options: [
          'B < A < C (0,00005 < 0,0003 < 0,002)',
          'A < B < C',
          'C < A < B',
          'B < C < A'
        ],
        correctAnswer: 0,
        hint: 'A kitevők: B-é -5 (legkisebb), A-é -4, C-é -3 (legnagyobb).',
        explanation: 'B = 0,00005 < A = 0,00030 < C = 0,00200. Tehát B < A < C.'
      }
    ]
  }
};

export const ScientificNotationQuiz: React.FC<ScientificNotationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Gyakorló Kvíz – Számok Normálalakja"
      subtitle="30 válogatott feladat 3 szinten: definíció, vesszőléptetés, átváltás tizedestörtre, korrekció és csillagászati méretek."
      topicId="g9-szamok-normalalak-quiz"
      topicTitle="Számok Normálalakja"
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="emerald"
      cheatSheetCards={[
        <CheatSheetCard
          key="cs-def"
          title="A Normálalak Alapképlete"
          badge="Alapok"
          badgeColor="emerald"
        >
          <div className="space-y-1 text-xs">
            <p className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">• a · 10^k</p>
            <p>• <strong>1 ≤ |a| &lt; 10</strong> (Pontosan 1 jegy a vessző előtt!)</p>
            <p>• <strong>k ∈ ℤ</strong> (Egész szám: pozitív, nulla vagy negatív)</p>
            <p className="text-rose-600 font-bold">• 45 · 10³ NEM normálalak! (4,5 · 10⁴)</p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-shift"
          title="Vesszőléptetés Szabálya"
          badge="Irányok"
          badgeColor="blue"
        >
          <div className="space-y-1 text-xs">
            <p>• <strong>Balra léptetés:</strong> Nagy számok (≥10) ➔ <strong>+k</strong></p>
            <p className="font-mono pl-2">350 000 = 3,5 · 10⁵</p>
            <p>• <strong>Jobbra léptetés:</strong> Kis számok (&lt;1) ➔ <strong>-k</strong></p>
            <p className="font-mono pl-2">0,0042 = 4,2 · 10⁻³</p>
          </div>
        </CheatSheetCard>,
        <CheatSheetCard
          key="cs-traps"
          title="Gyakori Csapdák"
          badge="Vigyázat!"
          badgeColor="rose"
        >
          <div className="space-y-1 text-xs">
            <p>• 3 · 10⁻⁴ <strong>POZITÍV</strong> szám! (0,0003 &gt; 0)</p>
            <p>• -75 000 = <strong>-7,5 · 10⁴</strong> (nem negatív kitevő!)</p>
            <p>• Számológép: 3.5E8 = 3,5 · 10⁸</p>
            <p>• Összehasonlítás: 2 · 10⁻⁵ &gt; 7 · 10⁻⁶ (mert -5 &gt; -6)</p>
          </div>
        </CheatSheetCard>
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a számokat a pontos normálalakjukkal és értékükkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <ScientificNotationMatcher
              key={`scinote-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kifejezéseket érvényesség, nagyságrend és kitevő szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <ScientificNotationSorter
              key={`scinote-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default ScientificNotationQuiz;
