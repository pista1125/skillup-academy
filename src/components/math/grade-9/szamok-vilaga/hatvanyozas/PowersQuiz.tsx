import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowersMatcher } from './PowersMatcher';
import { PowersSorter } from './PowersSorter';
import {
  PowersConceptSvg,
  NegativeZeroExponentSvg,
  PowerIdentitiesSvg,
  BaseSignParitySvg
} from './PowersFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface PowersQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szabályok (Könnyű)',
    subtitle: 'Alap, kitevő, nulladik és negatív kitevők, előjelek és zárójelek.',
    range: '1 - 10. feladat',
    focus: 'Definíciók és Kitevőszabályok',
    questions: [
      {
        id: 'pwq1-1',
        questionTypeBadge: 'Hatványozás Definíció',
        question: 'Mit jelent a 3⁴ kifejezés matematikailag?',
        figure: <PowersConceptSvg size={170} />,
        options: [
          '3 · 3 · 3 · 3 = 81 (négy darab hármas szorzata)',
          '3 · 4 = 12',
          '3 + 3 + 3 + 3 = 12',
          '4 · 4 · 4 = 64'
        ],
        correctAnswer: 0,
        hint: 'A kitevő (4) azt mondja meg, hányszor szerepel az alap (3) a szorzatban tényezőként.',
        explanation: 'A hatvány definíciója szerint aⁿ = a · a · ... · a (n darab). Így 3⁴ = 3 · 3 · 3 · 3 = 81.'
      },
      {
        id: 'pwq1-2',
        questionTypeBadge: 'Nulladik Hatvány',
        question: 'Mennyi 7⁰ értéke a hatványozás kiterjesztése szerint?',
        figure: <NegativeZeroExponentSvg size={170} />,
        options: [
          '1',
          '0',
          '7',
          'Nincs értelmezve'
        ],
        correctAnswer: 0,
        hint: 'Bármely nemnulla valós szám 0. hatványa egyenlő eggyel!',
        explanation: 'Az azonosságok alapján a⁰ = 1 minden a ≠ 0 valós számra. Így 7⁰ = 1.'
      },
      {
        id: 'pwq1-3',
        questionTypeBadge: 'Első Hatvány',
        question: 'Mennyi 9¹ értéke?',
        options: [
          '9',
          '1',
          '0',
          '10'
        ],
        correctAnswer: 0,
        hint: 'Egytényezős szorzat.',
        explanation: 'Minden valós szám első hatványa önmaga: a¹ = a, tehát 9¹ = 9.'
      },
      {
        id: 'pwq1-4',
        questionTypeBadge: 'Alap és Kitevő Cseréje',
        question: 'Mennyi 2³ és mennyi 3² értéke? Melyik a nagyobb?',
        options: [
          '2³ = 8 és 3² = 9, tehát 3² a nagyobb',
          '2³ = 6 és 3² = 6, egyenlőek',
          '2³ = 8 és 3² = 6, tehát 2³ a nagyobb',
          'Mindkettő 9'
        ],
        correctAnswer: 0,
        hint: '2 · 2 · 2 = 8, míg 3 · 3 = 9.',
        explanation: '2³ = 2 · 2 · 2 = 8, míg 3² = 3 · 3 = 9. Tehát 3² > 2³ (a hatványozás nem kommutatív!).'
      },
      {
        id: 'pwq1-5',
        questionTypeBadge: 'Negatív Kitevő Definíció',
        question: 'Mit jelent az a⁻¹ kifejezés, ha a ≠ 0?',
        options: [
          'Az a szám reciprokát: 1 / a',
          'A szám ellentettjét: -a',
          'Nullát',
          'A szám négyzetgyökét'
        ],
        correctAnswer: 0,
        hint: 'A negatív kitevő nem mínusz előjelet, hanem reciprok képzést jelent!',
        explanation: 'A negatív kitevő szabálya: a⁻ⁿ = 1 / aⁿ. Különösen n = 1 esetén: a⁻¹ = 1 / a (a szám reciproka).'
      },
      {
        id: 'pwq1-6',
        questionTypeBadge: 'Negatív Kitevő Kiszámítása',
        question: 'Mennyi 2⁻³ értéke?',
        options: [
          '1/8 = 0,125',
          '-8',
          '-6',
          '1/6'
        ],
        correctAnswer: 0,
        hint: '2⁻³ = 1 / 2³ = 1 / 8.',
        explanation: '2⁻³ = 1 / 2³ = 1 / 8 = 0,125. Fontos: az eredmény POZITÍV marad, a mínusz csak a reciprokra utal!'
      },
      {
        id: 'pwq1-7',
        questionTypeBadge: 'Negatív Alap Páros Kitevőn',
        question: 'Mennyi (-3)² értéke?',
        figure: <BaseSignParitySvg size={170} />,
        options: [
          '+9',
          '-9',
          '-6',
          '+6'
        ],
        correctAnswer: 0,
        hint: '(-3) · (-3) = ? Mínusz szorozva mínusszal plusz!',
        explanation: '(-3)² = (-3) · (-3) = +9. Negatív alap páros kitevőjű hatványa mindig szigorúan pozitív.'
      },
      {
        id: 'pwq1-8',
        questionTypeBadge: 'Negatív Alap Páratlan Kitevőn',
        question: 'Mennyi (-2)³ értéke?',
        options: [
          '-8',
          '+8',
          '-6',
          '+6'
        ],
        correctAnswer: 0,
        hint: '(-2) · (-2) · (-2) = (+4) · (-2) = ?',
        explanation: '(-2)³ = (-2) · (-2) · (-2) = -8. Negatív alap páratlan kitevőjű hatványa mindig negatív marad.'
      },
      {
        id: 'pwq1-9',
        questionTypeBadge: 'Zárójel Hiánya (Csapda)',
        question: 'Mennyi a -4² kifejezés értéke?',
        options: [
          '-16',
          '+16',
          '-8',
          '+8'
        ],
        correctAnswer: 0,
        hint: 'Figyeld meg: NINCS zárójel a -4 körül! A négyzet csak a 4-es számra vonatkozik: -(4²)!',
        explanation: 'Zárójel hiányában a hatványozás megelőzi az előjelet: -4² = -(4 · 4) = -16. Csak a (-4)² lenne +16!'
      },
      {
        id: 'pwq1-10',
        questionTypeBadge: '10 Negatív Hatványai',
        question: 'Mennyi 10⁻² értéke tizedestörtként?',
        options: [
          '0,01',
          '0,1',
          '-100',
          '-0,02'
        ],
        correctAnswer: 0,
        hint: '10⁻² = 1 / 10² = 1 / 100.',
        explanation: '10⁻² = 1 / 10² = 1 / 100 = 0,01 (egy század).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Azonosságok Alkalmazása (Közepes)',
    subtitle: 'Azonos alapú szorzás és osztás, hatvány hatványa, törtek negatív kitevőn.',
    range: '11 - 20. feladat',
    focus: 'Algebrai Azonosságok és Számolás',
    questions: [
      {
        id: 'pwq2-1',
        questionTypeBadge: 'Azonos Alapú Szorzás',
        question: 'Mivel egyenlő 2³ · 2⁴ a hatványozás azonosságai szerint?',
        figure: <PowerIdentitiesSvg size={170} />,
        options: [
          '2⁷ = 128',
          '4⁷',
          '2¹²',
          '4¹²'
        ],
        correctAnswer: 0,
        hint: 'aᵏ · aᵐ = aᵏ⁺ᵐ (az alapot leírjuk, a kitevőket összeadjuk: 3 + 4 = 7).',
        explanation: 'Azonos alapú hatványok szorzásakor a kitevők összeadódnak: 2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128.'
      },
      {
        id: 'pwq2-2',
        questionTypeBadge: 'Azonos Alapú Osztás',
        question: 'Mivel egyenlő 5⁷ / 5⁴?',
        options: [
          '5³ = 125',
          '1³ = 1',
          '5¹¹',
          '5²⁸'
        ],
        correctAnswer: 0,
        hint: 'aᵏ / aᵐ = aᵏ⁻ᵐ (a kitevőket kivonjuk: 7 - 4 = 3).',
        explanation: 'Azonos alapú hatványok osztásakor a kitevők kivonódnak: 5⁷ / 5⁴ = 5⁷⁻⁴ = 5³ = 125.'
      },
      {
        id: 'pwq2-3',
        questionTypeBadge: 'Hatvány Hatványozása',
        question: 'Mivel egyenlő (3²)⁴ kifejezés?',
        options: [
          '3⁸',
          '3⁶',
          '3¹⁶',
          '9⁴'
        ],
        correctAnswer: 0,
        hint: '(aᵏ)ᵐ = aᵏ · ᵐ (a kitevőket összeszorozzuk: 2 · 4 = 8).',
        explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: (3²)⁴ = 3²·⁴ = 3⁸ = 6561.'
      },
      {
        id: 'pwq2-4',
        questionTypeBadge: 'Szorzat Hatványozása',
        question: 'Hogyan alakítható át a (2x)³ kifejezés zárójel nélkül?',
        options: [
          '8x³',
          '2x³',
          '6x³',
          '8x'
        ],
        correctAnswer: 0,
        hint: '(a · b)ᵏ = aᵏ · bᵏ! A 3-as kitevő a 2-es számra és az x-re is vonatkozik: 2³ · x³!',
        explanation: 'A szorzat hatványozásának szabálya: (2x)³ = 2³ · x³ = 8x³.'
      },
      {
        id: 'pwq2-5',
        questionTypeBadge: 'Tört Negatív Kitevőn',
        question: 'Mennyi a (2/3)⁻² tört értéke?',
        options: [
          '9/4 = 2,25',
          '4/9',
          '-4/9',
          '-9/4'
        ],
        correctAnswer: 0,
        hint: '(a/b)⁻ⁿ = (b/a)ⁿ! Megfordítjuk a törtet, és pozitívra vált a kitevő: (3/2)²!',
        explanation: '(2/3)⁻² = (3/2)² = 3² / 2² = 9/4 = 2,25.'
      },
      {
        id: 'pwq2-6',
        questionTypeBadge: 'Kifejezés Egyszerűsítése',
        question: 'Mivel egyenlő az (a⁵ · a³) / a⁶ kifejezés (a ≠ 0)?',
        options: [
          'a²',
          'a⁴',
          'a⁸',
          'a'
        ],
        correctAnswer: 0,
        hint: 'Számláló: a⁵ · a³ = a⁸. Nevező: a⁶. a⁸ / a⁶ = a⁸⁻⁶!',
        explanation: '(a⁵ · a³) / a⁶ = a⁵⁺³ / a⁶ = a⁸ / a⁶ = a⁸⁻⁶ = a².'
      },
      {
        id: 'pwq2-7',
        questionTypeBadge: 'Alapok Közös Alapra Hozása',
        question: 'Mivel egyenlő 2⁵ · 4² egyetlen 2-es alapú hatványként?',
        options: [
          '2⁹',
          '8⁷',
          '2⁷',
          '2¹⁰'
        ],
        correctAnswer: 0,
        hint: 'Írd át a 4-et 2 hatványaként: 4 = 2² ⟹ 4² = (2²)² = 2⁴!',
        explanation: 'Mivel 4 = 2², így 4² = (2²)² = 2⁴. A szorzat: 2⁵ · 2⁴ = 2⁵⁺⁴ = 2⁹ = 512.'
      },
      {
        id: 'pwq2-8',
        questionTypeBadge: 'Negatív Eredményű Kitevő',
        question: 'Mivel egyenlő 3⁴ / 3⁷ értéke?',
        options: [
          '3⁻³ = 1/27',
          '3³ = 27',
          '-27',
          '-3³'
        ],
        correctAnswer: 0,
        hint: 'Kivonás: 4 - 7 = -3.',
        explanation: '3⁴ / 3⁷ = 3⁴⁻⁷ = 3⁻³ = 1 / 3³ = 1 / 27.'
      },
      {
        id: 'pwq2-9',
        questionTypeBadge: 'Nagy Kitevőjű (-1)',
        question: 'Mennyi (-1)¹⁰⁰ + (-1)⁹⁹ értéke?',
        options: [
          '0',
          '2',
          '-2',
          '1'
        ],
        correctAnswer: 0,
        hint: 'Páros kitevőnél +1, páratlan kitevőnél -1. Mennyi (+1) + (-1)?',
        explanation: '(-1)¹⁰⁰ = +1 (páros kitevő), (-1)⁹⁹ = -1 (páratlan kitevő). Összegük: 1 + (-1) = 0.'
      },
      {
        id: 'pwq2-10',
        questionTypeBadge: 'Negatív Kitevős Tört',
        question: 'Mennyi (1/2)⁻⁴ értéke?',
        options: [
          '16',
          '1/16',
          '-16',
          '-8'
        ],
        correctAnswer: 0,
        hint: 'Megfordítjuk a törtet: (2/1)⁴ = 2⁴ = ?',
        explanation: '(1/2)⁻⁴ = 2⁴ = 16.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Érettségi Típusfeladatok (Nehéz)',
    subtitle: 'Toronyhatványok, kiemeléses törtek, hatványegyenletek és nagyságrendi összehasonlítás.',
    range: '21 - 30. feladat',
    focus: 'Érettségi Feladványok és Kiemelések',
    questions: [
      {
        id: 'pwq3-1',
        questionTypeBadge: 'Toronyhatvány Csapda',
        question: 'Melyik állítás igaz a (2³)² és a 2³² kifejezések kapcsolatára?',
        options: [
          '(2³)² = 2⁶ = 64, míg 2³² = 2⁹ = 512, tehát a toronyhatvány jóval nagyobb',
          'A két kifejezés értéke megegyezik: mindkettő 2⁶ = 64',
          '(2³)² a nagyobb',
          'Toronyhatvány nem létezik a matematikában'
        ],
        correctAnswer: 0,
        hint: '(2³)² esetén a kitevők szorzódnak (3·2=6). A 2^(3²) esetén először a 3² = 9 számolandó ki!',
        explanation: '(2³)² = 2³·² = 2⁶ = 64. Toronyhatványnál fentről lefelé számolunk: 3² = 9, így 2³² = 2⁹ = 512. 512 > 64!'
      },
      {
        id: 'pwq3-2',
        questionTypeBadge: 'Összeadás Csapda',
        question: 'Mivel egyenlő a 2³ + 2³ kifejezés a legegyszerűbb hatványalakban?',
        options: [
          '2⁴',
          '2⁶',
          '4³',
          '4⁶'
        ],
        correctAnswer: 0,
        hint: 'Két darab 2³-t adunk össze: 2 · 2³! Azonos alapú szorzás: 2¹ · 2³ = ?',
        explanation: '2³ + 2³ = 2 · 2³ = 2¹ · 2³ = 2¹⁺³ = 2⁴ = 16. (Gyakori csapda: a kitevők nem adódnak össze összeadásnál!).'
      },
      {
        id: 'pwq3-3',
        questionTypeBadge: 'Tört Egyszerűsítése Különböző Alapokkal',
        question: 'Mennyi a (2⁵ · 3⁴) / 6³ kifejezés pontos értéke?',
        options: [
          '12',
          '6',
          '18',
          '24'
        ],
        correctAnswer: 0,
        hint: 'Bontsd fel a 6-ot prímekre a nevezőben: 6³ = (2 · 3)³ = 2³ · 3³!',
        explanation: 'A nevező: 6³ = (2 · 3)³ = 2³ · 3³. A tört: (2⁵ · 3⁴) / (2³ · 3³) = 2⁵⁻³ · 3⁴⁻³ = 2² · 3¹ = 4 · 3 = 12.'
      },
      {
        id: 'pwq3-4',
        questionTypeBadge: 'Közös Tényező Kiemelése',
        question: 'Mennyi a (3⁷ + 3⁵) / 3⁵ tört értéke?',
        options: [
          '10',
          '3²',
          '9',
          '3⁷'
        ],
        correctAnswer: 0,
        hint: 'Emeld ki a számlálóból a 3⁵-t: 3⁵ · (3² + 1) / 3⁵!',
        explanation: 'Kiemeléssel: 3⁷ + 3⁵ = 3⁵ · (3² + 1) = 3⁵ · (9 + 1) = 3⁵ · 10. Ezt elosztva 3⁵-tel: 10-et kapunk.'
      },
      {
        id: 'pwq3-5',
        questionTypeBadge: 'Nagyságrend Összehasonlítás',
        question: 'Melyik szám nagyobb: 2³⁰⁰ vagy 3²⁰⁰?',
        options: [
          '3²⁰⁰ nagyobb, mert (3²)¹⁰⁰ = 9¹⁰⁰ > (2³)¹⁰⁰ = 8¹⁰⁰',
          '2³⁰⁰ nagyobb, mert a kitevője 300',
          'Pontosan egyenlőek',
          'Nem lehet összehasonlítani számológép nélkül'
        ],
        correctAnswer: 0,
        hint: 'Hozz létre közös kitevőt (100): 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰, és 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰!',
        explanation: '2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰. 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Mivel 9 > 8, így 9¹⁰⁰ > 8¹⁰⁰, vagyis 3²⁰⁰ > 2³⁰⁰.'
      },
      {
        id: 'pwq3-6',
        questionTypeBadge: 'Hatványegyenlet Alapja',
        question: 'Melyik x valós számra igaz, hogy 3ˣ⁺¹ = 81?',
        options: [
          'x = 3',
          'x = 4',
          'x = 2',
          'x = 5'
        ],
        correctAnswer: 0,
        hint: '81 = 3⁴. Ha az alapok egyenlőek (3), a kitevőknek is egyenlőnek kell lenniük: x + 1 = 4!',
        explanation: '3ˣ⁺¹ = 81 = 3⁴. Mivel a hatványfüggvény szigorúan monoton: x + 1 = 4 ⟹ x = 3.'
      },
      {
        id: 'pwq3-7',
        questionTypeBadge: 'Tizedestört Negatív Kitevőn',
        question: 'Mennyi a (0,25)⁻² kifejezés értéke?',
        options: [
          '16',
          '4',
          '0,0625',
          '1/16'
        ],
        correctAnswer: 0,
        hint: '0,25 = 1/4. Tehát (1/4)⁻² = 4²!',
        explanation: '0,25 = 1/4. Negatív kitevő miatt: (1/4)⁻² = (4/1)² = 4² = 16.'
      },
      {
        id: 'pwq3-8',
        questionTypeBadge: 'Összetett Előjeles Művelet',
        question: 'Mennyi a -(-2)⁴ + (-2)³ kifejezés pontos értéke?',
        options: [
          '-24',
          '-8',
          '8',
          '24'
        ],
        correctAnswer: 0,
        hint: '(-2)⁴ = +16 ⟹ -(-2)⁴ = -16. És (-2)³ = -8. -16 + (-8) = ?',
        explanation: '(-2)⁴ = +16, így előtte a mínuszjellel: -16. Másrészt (-2)³ = -8. Összegük: -16 + (-8) = -24.'
      },
      {
        id: 'pwq3-9',
        questionTypeBadge: 'Normálalak Szorzása',
        question: 'Mennyi (2 · 10⁴) · (3 · 10⁻⁶) értéke normálalakban és tizedestörtben?',
        options: [
          '6 · 10⁻² = 0,06',
          '6 · 10⁻¹⁰',
          '6 · 10²',
          '0,6'
        ],
        correctAnswer: 0,
        hint: '(2 · 3) · 10⁴ · 10⁻⁶ = 6 · 10⁴⁻⁶ = 6 · 10⁻².',
        explanation: '(2 · 3) · (10⁴ · 10⁻⁶) = 6 · 10⁴⁺⁽⁻⁶⁾ = 6 · 10⁻² = 6 / 100 = 0,06.'
      },
      {
        id: 'pwq3-10',
        questionTypeBadge: 'Reciprokok Összege',
        question: 'Mennyi 2⁻¹ + 2⁻² értéke közönséges törtként?',
        options: [
          '3/4',
          '2/3',
          '1/6',
          '5/4'
        ],
        correctAnswer: 0,
        hint: '2⁻¹ = 1/2 = 2/4. 2⁻² = 1/4. 2/4 + 1/4 = ?',
        explanation: '2⁻¹ = 1/2 és 2⁻² = 1/4. Összegük: 1/2 + 1/4 = 2/4 + 1/4 = 3/4 (vagy tizedestörtben 0,75).'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Nulladik és Negatív Kitevők',
    formula: 'a⁰ = 1 (a ≠ 0) | a⁻ⁿ = 1 / aⁿ | (a/b)⁻ⁿ = (b/a)ⁿ',
    description: 'Bármely nemnulla szám 0. hatványa 1. Negatív kitevőnél a reciprokát vesszük a pozitív hatványnak.',
    badge: 'Kiterjesztés',
    badgeColor: 'purple'
  },
  {
    title: 'A Hatványozás 5 Alapazonossága',
    formula: 'aᵏ·aᵐ = aᵏ⁺ᵐ | aᵏ/aᵐ = aᵏ⁻ᵐ | (aᵏ)ᵐ = aᵏ·ᵐ | (ab)ᵏ = aᵏbᵏ | (a/b)ᵏ = aᵏ/bᵏ',
    description: 'Szorzásnál a kitevők összeadódnak, osztásnál kivonódnak, hatványozásnál összeszorzódnak.',
    badge: 'Azonosságok',
    badgeColor: 'teal'
  },
  {
    title: 'Zárójelek és Előjelek Csapdája',
    formula: '(-a)²ᵏ = +a²ᵏ | (-a)²ᵏ⁺¹ = -a²ᵏ⁺¹ | -aⁿ = -(aⁿ) (mindig negatív!)',
    description: 'A (-2)⁴ = +16, de -2⁴ = -16! Zárójel nélkül a kitevő csak a számra vonatkozik, az előjelre nem.',
    badge: 'Típuscsapda',
    badgeColor: 'rose'
  },
  {
    title: 'Összeadásra NINCS Azonosság!',
    formula: '2³ + 2⁴ ≠ 2⁷ !  |  2³ + 2³ = 2 · 2³ = 2⁴',
    description: 'Azonos alapú hatványok összeadásakor NEM lehet a kitevőket összeadni, csak kiszámolni vagy kiemelni!',
    badge: 'Vigyázat',
    badgeColor: 'amber'
  }
];

export const PowersQuiz: React.FC<PowersQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Hatványozás Kvíz"
      subtitle="30 válogatott feladat 3 szinten: definíciók, negatív kitevők, azonosságok és érettségi típusfeladatok"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ⚡ GYAKORLÁS"
      themeColor="purple"
      quizId="g9-szamok-hatvany-quiz"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a hatványkifejezéseket a kiszámított értékükkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PowersMatcher
              key={`pow-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket előjelük és azonosságtípusuk szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PowersSorter
              key={`pow-sorter-${level}`}
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

export default PowersQuiz;
