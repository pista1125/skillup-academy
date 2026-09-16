import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { NumberSystemsMatcher } from './NumberSystemsMatcher';
import { NumberSystemsSorter } from './NumberSystemsSorter';

export interface NumberSystemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // =================================================================
  // --- 1. SZINT: KÖNNYŰ (Kettes számrendszer alapjai, átváltás 1–15) ---
  // =================================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Hányféle számjegyet használunk a kettes (bináris) számrendszerben?',
    highlightValue: 'Kettes alap',
    questionTypeBadge: 'Alapfogalom',
    options: ['2-félét (0 és 1)', '10-félét (0-tól 9-ig)', '1-félét (csak 1)', '3-félét (0, 1, 2)'],
    correctAnswer: '2-félét (0 és 1)',
    explanation: 'A kettes (bináris) számrendszer alapja 2, ezért csak kétféle számjegyet használunk: a 0-t és az 1-et.',
    hint: 'A számrendszer alapja megegyezik a használható számjegyek darabszámával.',
    breakdown: [
      { label: 'Alap', value: 'b = 2' },
      { label: 'Jegyek', value: '0, 1' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Melyik decimális számnak felel meg a 101₂ bináris szám?',
    highlightValue: '101₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['5', '6', '3', '101'],
    correctAnswer: '5',
    explanation: '101₂ = 1 · 4 + 0 · 2 + 1 · 1 = 4 + 1 = 5.',
    hint: 'A helyiértékek jobbról balra: 1, 2, 4. Add össze: 4 + 1.',
    breakdown: [
      { label: 'Helyiértékek', value: '4 + 0 + 1' },
      { label: 'Összeg', value: '5' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hogyan írjuk fel a 8-as decimális számot kettes számrendszerben?',
    highlightValue: '8',
    questionTypeBadge: 'Decimális ➔ Bináris',
    options: ['1000₂', '100₂', '111₂', '1001₂'],
    correctAnswer: '1000₂',
    explanation: 'A 8 a 2 harmadik hatványa (2³ = 8), ezért kettes számrendszerben 1000₂.',
    hint: '8 a 4. helyiérték (1, 2, 4, 8), így egy 1-es és három 0.',
    breakdown: [
      { label: '2³ értéke', value: '8' },
      { label: 'Bináris alak', value: '1000₂' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik decimális számnak felel meg a 110₂ bináris szám?',
    highlightValue: '110₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['6', '5', '4', '7'],
    correctAnswer: '6',
    explanation: '110₂ = 1 · 4 + 1 · 2 + 0 · 1 = 4 + 2 = 6.',
    hint: 'A 4-es és 2-es helyiérték be van kapcsolva (4 + 2).',
    breakdown: [
      { label: 'Helyiértékek', value: '4 + 2 + 0' },
      { label: 'Összeg', value: '6' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Melyik decimális számnak felel meg a 1111₂ bináris szám?',
    highlightValue: '1111₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['15', '14', '16', '11'],
    correctAnswer: '15',
    explanation: '1111₂ = 1 · 8 + 1 · 4 + 1 · 2 + 1 · 1 = 8 + 4 + 2 + 1 = 15.',
    hint: 'Add össze: 8 + 4 + 2 + 1 = 15 (vagy 16 - 1 = 15).',
    breakdown: [
      { label: 'Helyiértékek', value: '8 + 4 + 2 + 1' },
      { label: 'Összeg', value: '15' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hogyan írjuk fel a 3-as számot kettes számrendszerben?',
    highlightValue: '3',
    questionTypeBadge: 'Decimális ➔ Bináris',
    options: ['11₂', '10₂', '101₂', '111₂'],
    correctAnswer: '11₂',
    explanation: '3 = 2 + 1, ezért binárisan 11₂.',
    hint: '3 = egy 2-es + egy 1-es.',
    breakdown: [
      { label: 'Bontás', value: '2 + 1' },
      { label: 'Bináris alak', value: '11₂' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyik decimális számnak felel meg a 1010₂ bináris szám?',
    highlightValue: '1010₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['10', '12', '8', '14'],
    correctAnswer: '10',
    explanation: '1010₂ = 1 · 8 + 0 · 4 + 1 · 2 + 0 · 1 = 8 + 2 = 10.',
    hint: 'Nyolcasok és kettesek helyén áll 1-es: 8 + 2.',
    breakdown: [
      { label: 'Helyiértékek', value: '8 + 2' },
      { label: 'Összeg', value: '10' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Hogyan nevezzük az informatikában az egyetlen 0 vagy 1 állapotot rögzítő legkisebb információegységet?',
    highlightValue: '0 vagy 1',
    questionTypeBadge: 'Informatikai alapfogalom',
    options: ['Bit (binary digit)', 'Bájt (byte)', 'Pixel', 'Megabájt'],
    correctAnswer: 'Bit (binary digit)',
    explanation: 'A bit a binary digit (bináris számjegy) rövidítése, a legkisebb digitális információegység.',
    hint: 'A binary digit angol kifejezés rövidítése.',
    breakdown: [
      { label: 'Kifejezés', value: 'Binary Digit' },
      { label: 'Rövidítés', value: 'Bit' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Melyik decimális számnak felel meg a 1100₂ bináris szám?',
    highlightValue: '1100₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['12', '10', '14', '6'],
    correctAnswer: '12',
    explanation: '1100₂ = 1 · 8 + 1 · 4 + 0 · 2 + 0 · 1 = 8 + 4 = 12.',
    hint: '8 + 4 = 12.',
    breakdown: [
      { label: 'Helyiértékek', value: '8 + 4' },
      { label: 'Összeg', value: '12' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Mennyi a helyiértéke a 1000₂ számban az 1-esnek?',
    highlightValue: '1000₂',
    questionTypeBadge: 'Helyiérték értelmezés',
    options: ['8 (2³)', '4 (2²)', '16 (2⁴)', '1000'],
    correctAnswer: '8 (2³)',
    explanation: 'Jobbról a negyedik helyiérték a 2³ = 8.',
    hint: 'Jobbról az 1., 2., 3., 4. helyiérték: 1, 2, 4, 8.',
    breakdown: [
      { label: 'Pozíció', value: '4. hely' },
      { label: 'Helyiérték', value: '2³ = 8' }
    ]
  },

  // ======================================================================
  // --- 2. SZINT: KÖZEPES (Számok 16–63 között, 2-hatványok és bájtok) ---
  // ======================================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Mennyi a jobbról számított 5. helyiérték értéke a kettes számrendszerben?',
    highlightValue: '5. helyiérték',
    questionTypeBadge: 'Helyiérték számítás',
    options: ['16 (2⁴)', '32 (2⁵)', '10', '8 (2³)'],
    correctAnswer: '16 (2⁴)',
    explanation: 'A kettes számrendszer helyiértékei jobbról: 1 (2⁰), 2 (2¹), 4 (2²), 8 (2³), 16 (2⁴).',
    hint: '2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16.',
    breakdown: [
      { label: '5. hely', value: '2⁴' },
      { label: 'Értéke', value: '16' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 10000₂ szám?',
    highlightValue: '10000₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['16', '32', '10', '20'],
    correctAnswer: '16',
    explanation: '10000₂ = 1 · 16 = 16.',
    hint: 'Egyetlen 1-es és négy 0: 2⁴ = 16.',
    breakdown: [
      { label: 'Helyiérték', value: '16' },
      { label: 'Összeg', value: '16' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 10101₂ bináris szám?',
    highlightValue: '10101₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['21', '19', '23', '25'],
    correctAnswer: '21',
    explanation: '10101₂ = 1 · 16 + 0 · 8 + 1 · 4 + 0 · 2 + 1 · 1 = 16 + 4 + 1 = 21.',
    hint: 'Add össze: 16 + 4 + 1 = 21.',
    breakdown: [
      { label: 'Helyiértékek', value: '16 + 4 + 1' },
      { label: 'Összeg', value: '21' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Hogyan írjuk fel a 25-öt kettes számrendszerben?',
    highlightValue: '25',
    questionTypeBadge: 'Decimális ➔ Bináris',
    options: ['11001₂', '11010₂', '10101₂', '11101₂'],
    correctAnswer: '11001₂',
    explanation: '25 = 16 + 8 + 1 = 11001₂.',
    hint: 'Bontsd fel 2-hatványokra: 25 = 16 + 8 + 1.',
    breakdown: [
      { label: 'Bontás', value: '16 + 8 + 1' },
      { label: 'Bináris alak', value: '11001₂' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 100000₂ bináris szám?',
    highlightValue: '100000₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['32', '64', '16', '50'],
    correctAnswer: '32',
    explanation: '100000₂ = 2⁵ = 32.',
    hint: 'Hatodik helyiérték: 2⁵ = 32.',
    breakdown: [
      { label: '6. helyiérték', value: '2⁵ = 32' },
      { label: 'Összeg', value: '32' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 101010₂ bináris szám?',
    highlightValue: '101010₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['42', '40', '44', '38'],
    correctAnswer: '42',
    explanation: '101010₂ = 32 + 8 + 2 = 42.',
    hint: '32 + 8 + 2 = 42.',
    breakdown: [
      { label: 'Helyiértékek', value: '32 + 8 + 2' },
      { label: 'Összeg', value: '42' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Hogyan írjuk fel a 48-at kettes számrendszerben?',
    highlightValue: '48',
    questionTypeBadge: 'Decimális ➔ Bináris',
    options: ['110000₂', '101000₂', '111000₂', '100110₂'],
    correctAnswer: '110000₂',
    explanation: '48 = 32 + 16, ezért binárisan 110000₂.',
    hint: '48 = 32 + 16.',
    breakdown: [
      { label: 'Bontás', value: '32 + 16' },
      { label: 'Bináris alak', value: '110000₂' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 111111₂ (hat darab egyes) bináris szám?',
    highlightValue: '111111₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['63', '64', '62', '31'],
    correctAnswer: '63',
    explanation: '111111₂ = 32 + 16 + 8 + 4 + 2 + 1 = 63 (egyébként 64 - 1 = 63).',
    hint: 'Hat darab 1-es: 64 - 1 = 63.',
    breakdown: [
      { label: 'Helyiértékek', value: '32+16+8+4+2+1' },
      { label: 'Összeg', value: '63' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Hány bit alkot 1 bájtot (byte-ot) az informatikában?',
    highlightValue: '1 Byte',
    questionTypeBadge: 'Informatikai mértékegység',
    options: ['8 bit', '4 bit', '16 bit', '10 bit'],
    correctAnswer: '8 bit',
    explanation: '1 bájt (byte) pontosan 8 bitből áll, amellyel 256 különböző érték (0–255) írható le.',
    hint: '1 Byte = 8 Bit.',
    breakdown: [
      { label: '1 Byte', value: '8 Bit' },
      { label: 'Értéktartomány', value: '0 – 255' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Melyik decimális számnak felel meg a 11011₂ bináris szám?',
    highlightValue: '11011₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['27', '29', '25', '31'],
    correctAnswer: '27',
    explanation: '11011₂ = 16 + 8 + 0 + 2 + 1 = 27.',
    hint: '16 + 8 + 2 + 1 = 27.',
    breakdown: [
      { label: 'Helyiértékek', value: '16 + 8 + 2 + 1' },
      { label: 'Összeg', value: '27' }
    ]
  },

  // =================================================================================
  // --- 3. SZINT: NEHÉZ (Nagyobb bináris számok 64–255, Bájt, 5-ös és 60-as alap) ---
  // =================================================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 10000000₂ (1-es után hét darab 0) szám?',
    highlightValue: '10000000₂',
    questionTypeBadge: 'Bájt legfelső bitje',
    options: ['128 (2⁷)', '256 (2⁸)', '64 (2⁶)', '100'],
    correctAnswer: '128 (2⁷)',
    explanation: 'A 8. helyiérték értéke 2⁷ = 128.',
    hint: 'A bájt legmagasabb bitje: 2⁷ = 128.',
    breakdown: [
      { label: '8. helyiérték', value: '2⁷' },
      { label: 'Értéke', value: '128' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mennyi 1 bájt (8 bit) legnagyobb lehetséges értéke decimálisan (11111111₂)?',
    highlightValue: '11111111₂',
    questionTypeBadge: 'Bájt maximális értéke',
    options: ['255', '256', '128', '512'],
    correctAnswer: '255',
    explanation: '8 darab egyes összege: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 (2⁸ - 1 = 255).',
    hint: '2⁸ = 256 állapot lehetséges, 0-tól 255-ig.',
    breakdown: [
      { label: '8 bit összege', value: '2⁸ - 1' },
      { label: 'Maximális érték', value: '255' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 1100100₂ bináris szám?',
    highlightValue: '1100100₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['100', '96', '104', '110'],
    correctAnswer: '100',
    explanation: '1100100₂ = 64 + 32 + 4 = 100.',
    hint: '64 + 32 + 4 = 100.',
    breakdown: [
      { label: 'Helyiértékek', value: '64 + 32 + 4' },
      { label: 'Összeg', value: '100' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Az 5-ös alapú számrendszerben milyen helyiértékek követik egymást jobbról balra haladva?',
    highlightValue: '5-ös alap (b = 5)',
    questionTypeBadge: '5-ös számrendszer',
    options: ['1, 5, 25, 125, ...', '1, 2, 4, 8, ...', '1, 10, 100, 1000, ...', '5, 10, 15, 20, ...'],
    correctAnswer: '1, 5, 25, 125, ...',
    explanation: 'Az 5-ös számrendszer helyiértékei az 5 hatványai: 5⁰ = 1, 5¹ = 5, 5² = 25, 5³ = 125.',
    hint: 'Az 5 hatványai: 5⁰, 5¹, 5², 5³.',
    breakdown: [
      { label: 'Hatványok', value: '5⁰, 5¹, 5², 5³' },
      { label: 'Helyiértékek', value: '1, 5, 25, 125' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 23₅ (ötös alapú) szám?',
    highlightValue: '23₅',
    questionTypeBadge: '5-ös alap ➔ Decimális',
    options: ['13', '23', '10', '15'],
    correctAnswer: '13',
    explanation: '23₅ = 2 · 5 + 3 · 1 = 10 + 3 = 13.',
    hint: '2 darab 5-ös + 3 darab 1-es: 10 + 3 = 13.',
    breakdown: [
      { label: 'Helyiértékek', value: '2 · 5 + 3 · 1' },
      { label: 'Összeg', value: '13' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 100₅ (ötös alapú) szám?',
    highlightValue: '100₅',
    questionTypeBadge: '5-ös alap ➔ Decimális',
    options: ['25', '100', '20', '125'],
    correctAnswer: '25',
    explanation: '100₅ = 1 · 5² + 0 · 5 + 0 · 1 = 25.',
    hint: 'A harmadik helyiérték 5² = 25.',
    breakdown: [
      { label: '3. helyiérték', value: '5² = 25' },
      { label: 'Összeg', value: '25' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 44₅ (ötös alapú) szám?',
    highlightValue: '44₅',
    questionTypeBadge: '5-ös alap ➔ Decimális',
    options: ['24', '44', '20', '25'],
    correctAnswer: '24',
    explanation: '44₅ = 4 · 5 + 4 · 1 = 20 + 4 = 24.',
    hint: '4 · 5 + 4 = 20 + 4 = 24 (eggyel kevesebb mint 100₅ = 25).',
    breakdown: [
      { label: 'Helyiértékek', value: '4 · 5 + 4 · 1' },
      { label: 'Összeg', value: '24' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Hány darab tárgyat jelent 1 nagytucat (grosz = 12 × 12)?',
    highlightValue: '1 grosz (12 tucat)',
    questionTypeBadge: '12-es számrendszer',
    options: ['144 darabot', '120 darabot', '100 darabot', '240 darabot'],
    correctAnswer: '144 darabot',
    explanation: '1 tucat = 12 db, 1 nagytucat (grosz) = 12 tucat = 12 · 12 = 144 db.',
    hint: '12 · 12 = 144.',
    breakdown: [
      { label: '1 tucat', value: '12 db' },
      { label: '1 grosz', value: '144 db' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Melyik ősi mezopotámiai számrendszeren alapul az időmérés (1 óra = 60 perc, 1 perc = 60 másodperc)?',
    highlightValue: 'Időmérés',
    questionTypeBadge: 'Történeti számrendszer',
    options: ['60-as (sexagesimális) rendszeren', '10-es rendszeren', '12-es rendszeren', '100-as rendszeren'],
    correctAnswer: '60-as (sexagesimális) rendszeren',
    explanation: 'Az időmérés és a szögmérés (kör 360°-os felosztása) az ókori babiloniak 60-as számrendszeréből maradt ránk.',
    hint: '60 perces és 60 másodperces felosztás.',
    breakdown: [
      { label: 'Alap', value: 'b = 60' },
      { label: 'Alkalmazás', value: 'Idő- és szögmérés' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Melyik decimális számnak felel meg a 1010100₂ bináris szám?',
    highlightValue: '1010100₂',
    questionTypeBadge: 'Bináris ➔ Decimális',
    options: ['84', '80', '88', '74'],
    correctAnswer: '84',
    explanation: '1010100₂ = 64 + 16 + 4 = 84.',
    hint: '64 + 16 + 4 = 84.',
    breakdown: [
      { label: 'Helyiértékek', value: '64 + 16 + 4' },
      { label: 'Összeg', value: '84' }
    ]
  }
];

export const NumberSystemsQuiz: React.FC<NumberSystemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-number-systems"
      topicTitle="Számrendszerek"
      grade={5}
      chapterId="egesz-szamok"
      title="Számrendszerek Kvíz"
      subtitle="Gyakorold a kettes számrendszert, a 2-hatványokat, a decimális átváltást és a biteket!"
      topicBadge="5. Osztály • I. Az egész számok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<NumberSystemsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<NumberSystemsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapok',
          subtitle: 'Bináris alapok (1–15)',
          focus: 'Bináris számjegyek (0, 1), alapvető helyiértékek (1, 2, 4, 8)'
        },
        level2: {
          title: '2. Szint: Közepes',
          subtitle: 'Számok 16–63 között',
          focus: '16, 32, 64 helyiértékek, kétirányú átváltás, bájtok fogalma'
        },
        level3: {
          title: '3. Szint: Haladó',
          subtitle: 'Bájt (64–255) és egyéb alapok',
          focus: 'Bájt felső határa, 5-ös és 60-as számrendszer működése'
        }
      }}
      cheatSheetContent={
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-bold text-cyan-800 dark:text-cyan-300 mb-1">Kettes Helyiértékek (jobbról balra):</h4>
            <p className="text-slate-700 dark:text-slate-300 font-mono">
              128 (2⁷), 64 (2⁶), 32 (2⁵), 16 (2⁴), 8 (2³), 4 (2²), 2 (2¹), 1 (2⁰)
            </p>
          </div>

          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800">
            <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-1">Informatikai és Történeti Alapok:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>1 Bájt (Byte)</strong> = 8 Bit (0-tól 255-ig terjedő értékek).<br />
              • <strong>1 Tucat</strong> = 12 db, <strong>1 Grosz</strong> = 144 db.<br />
              • <strong>60-as alap:</strong> Időmérés (60 perc, 60 mp), szögmérés (360°).
            </p>
          </div>
        </div>
      }
    />
  );
};

export default NumberSystemsQuiz;
