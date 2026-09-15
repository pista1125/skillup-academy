import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { NumberReadingMatcher } from './NumberReadingMatcher';
import { NumberReadingSorter } from './NumberReadingSorter';

export interface NumberReadingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1 000 – 99 999) ---
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Melyik a helyesen hármas tagolással leírt alakja a 45200 számnak?',
    highlightValue: '45200',
    questionTypeBadge: 'Hármas csoportosítás',
    options: ['45 200', '4 52 00', '452 00', '4 5200'],
    correctAnswer: '45 200',
    explanation: 'A számjegyeket jobbról (hátulról) balra haladva hármas csoportokba (osztályokba) osztjuk, és szóközzel tagoljuk: 45 200.',
    hint: 'Hátulról (jobbról) számolj le 3 jegyet, és tegyél oda szóközt!',
    breakdown: [
      { label: 'Ezresek osztálya', value: '45' },
      { label: 'Egyesek osztálya', value: '200' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Hogyan olvassuk ki helyesen a következő számot?',
    highlightValue: '12 350',
    questionTypeBadge: 'Szám kiolvasása',
    options: [
      'tizenkétezer-háromszázötven',
      'egyszázhuszonhárom ezer ötven',
      'tizenkétezer-harmincöt',
      'tizenkét-háromszázötven'
    ],
    correctAnswer: 'tizenkétezer-háromszázötven',
    explanation: '12 ezer + 350 -> tizenkétezer-háromszázötven.',
    hint: 'Először olvasd ki az ezreseket (12 ezer), majd az egyesek osztályát (350).',
    breakdown: [
      { label: '12 (ezresek)', value: 'tizenkétezer' },
      { label: '350 (egyesek)', value: 'háromszázötven' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Melyik szám felel meg a kiolvasott szövegnek?',
    highlightValue: '„hetvenezer-nyolc”',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['70 008', '70 080', '7 008', '700 008'],
    correctAnswer: '70 008',
    explanation: 'Hetvenezer (70 000) meg nyolc (8) = 70 008. A százasok és tízesek helyén 0 áll.',
    hint: '70 ezer = 70 000, plusz 8 az egyes helyen -> 70 008.',
    breakdown: [{ label: '70 000 + 8', value: '70 008' }]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Hány osztályba sorolható egy 5-jegyű szám (pl. 24 500)?',
    highlightValue: '24 500',
    questionTypeBadge: 'Osztályok száma',
    options: ['2 osztályba (egyesek és ezresek)', '1 osztályba', '3 osztályba', '5 osztályba'],
    correctAnswer: '2 osztályba (egyesek és ezresek)',
    explanation: 'Az 5-jegyű szám 2 csoportra oszlik: az utolsó 3 jegy az egyesek osztálya (500), az első 2 jegy az ezresek osztálya (24).',
    hint: '1–3 jegy: 1 osztály; 4–6 jegy: 2 osztály.',
    breakdown: [
      { label: 'Ezresek osztálya', value: '24' },
      { label: 'Egyesek osztálya', value: '500' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hogyan olvassuk ki a következő számot?',
    highlightValue: '8 090',
    questionTypeBadge: 'Szám kiolvasása',
    options: [
      'nyolcezer-kilencven',
      'nyolcezer-kilencszáz',
      'nyolcvanezer-kilencven',
      'nyolcezer-kilenc'
    ],
    correctAnswer: 'nyolcezer-kilencven',
    explanation: '8 090 = 8 ezer + 90 = nyolcezer-kilencven (a százasok helyén 0 áll).',
    hint: '8 ezer + 0 százas + 90 = nyolcezer-kilencven.',
    breakdown: [{ label: '8 000 + 90', value: 'nyolcezer-kilencven' }]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Honnan kezdjük a számjegyek hármas csoportosítását?',
    highlightValue: 'Szabály',
    questionTypeBadge: 'Szabályismeret',
    options: [
      'Jobbról (hátulról) balra haladva',
      'Balról jobbra haladva',
      'Középről kifelé',
      'Tetszőleges irányból'
    ],
    correctAnswer: 'Jobbról (hátulról) balra haladva',
    explanation: 'A hármas csoportosítást mindig a legkisebb helyiértéktől (jobbról, az egyesektől) kezdjük balra haladva.',
    hint: 'Mindig a legkisebb helyiértéktől (egyesektől) csoportosítunk balra!',
    breakdown: [{ label: 'Irány', value: 'Jobbról balra (←)' }]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyik szám felel meg a kiolvasásnak?',
    highlightValue: '„harmincötezer-négyszázhat”',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['35 406', '35 460', '350 406', '3 546'],
    correctAnswer: '35 406',
    explanation: '35 ezer = 35 000, négyszázhat = 406. Összesen: 35 406.',
    hint: '35 ezer + 406 (a tízes helyen 0 van).',
    breakdown: [{ label: '35 000 + 406', value: '35 406' }]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Melyik a helyes tagolása a 10050 számnak?',
    highlightValue: '10050',
    questionTypeBadge: 'Tagolás',
    options: ['10 050', '1 0050', '100 50', '1005 0'],
    correctAnswer: '10 050',
    explanation: 'Jobbról hármat leválasztva: 050, elöl marad: 10 -> 10 050.',
    hint: 'Válassz le 3 jegyet jobbról (050), elé jön a szóköz!',
    breakdown: [{ label: 'Helyes alak', value: '10 050' }]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Hogyan olvassuk ki a 99 999 számot?',
    highlightValue: '99 999',
    questionTypeBadge: 'Kiolvasás',
    options: [
      'kilencvenkilencezer-kilencszázkilencvenkilenc',
      'kilencszázkilencvenezer-kilencszázkilencven',
      'kilencvenezer-kilencszázkilencvenkilenc',
      'kilencvenkilencezer-kilencvenkilenc'
    ],
    correctAnswer: 'kilencvenkilencezer-kilencszázkilencvenkilenc',
    explanation: '99 ezer + 999 = kilencvenkilencezer-kilencszázkilencvenkilenc.',
    hint: '99 ezer + 999 összeolvasva.',
    breakdown: [{ label: '99 ezer + 999', value: '99 999' }]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Melyik szám az „ezer-egy”?',
    highlightValue: 'ezer-egy',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['1 001', '1 010', '1 100', '10 001'],
    correctAnswer: '1 001',
    explanation: '1000 + 1 = 1 001 (a százasok és tízesek helyén 0 van).',
    hint: '1 000 + 1 = 1 001.',
    breakdown: [{ label: '1 000 + 1', value: '1 001' }]
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (100 000 – 999 999) ---
  // ==========================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Hogyan tagoljuk helyesen a 704005 számot?',
    highlightValue: '704005',
    questionTypeBadge: '6-jegyű tagolás',
    options: ['704 005', '70 4005', '7040 05', '7 04 005'],
    correctAnswer: '704 005',
    explanation: 'Hátulról 3 jegy: 005, elöl 3 jegy: 704 -> 704 005.',
    hint: 'Mindkét osztályban 3 számjegy lesz: 704 és 005.',
    breakdown: [
      { label: 'Ezresek osztálya', value: '704' },
      { label: 'Egyesek osztálya', value: '005' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Hogyan olvassuk ki a következő számot?',
    highlightValue: '350 400',
    questionTypeBadge: '6-jegyű kiolvasás',
    options: [
      'háromszázötvenezer-négyszáz',
      'harmincötezer-négyszáz',
      'háromszázötvenezer-negyven',
      'háromszázötven-négyszáz'
    ],
    correctAnswer: 'háromszázötvenezer-négyszáz',
    explanation: '350 ezer + 400 = háromszázötvenezer-négyszáz.',
    hint: '350 ezer + 400.',
    breakdown: [
      { label: '350 (ezresek)', value: 'háromszázötvenezer' },
      { label: '400 (egyesek)', value: 'négyszáz' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Melyik szám felel meg a leírásnak?',
    highlightValue: '„ötszázezer-ötven”',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['500 050', '500 500', '50 050', '505 000'],
    correctAnswer: '500 050',
    explanation: 'Ötszázezer (500 000) meg ötven (50) = 500 050.',
    hint: '500 ezer (500) és 50 (050).',
    breakdown: [{ label: '500 000 + 50', value: '500 050' }]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Hány jegyű az „egyszázezer” szám?',
    highlightValue: '100 000',
    questionTypeBadge: 'Jegyek száma',
    options: ['6 jegyű', '5 jegyű', '7 jegyű', '4 jegyű'],
    correctAnswer: '6 jegyű',
    explanation: 'Az egyszázezer számmal leírva: 100 000, amely 1 darab egyesből és 5 darab nullából áll (összesen 6 jegyű).',
    hint: '1-es és utána 5 darab nulla = 6 számjegy.',
    breakdown: [{ label: 'Számjegyek száma', value: '6 jegy (100 000)' }]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hogyan olvassuk ki a 208 500 számot?',
    highlightValue: '208 500',
    questionTypeBadge: 'Kiolvasás',
    options: [
      'ktszáznyolcezer-ötszáz',
      'húszezer-nyolcszázötven',
      'ktszáznyolcvan-ötszáz',
      'ktszáznyolcezer-ötven'
    ],
    correctAnswer: 'ktszáznyolcezer-ötszáz',
    explanation: '208 ezer + 500 = ktszáznyolcezer-ötszáz.',
    hint: '208 ezer = kétszáznyolcezer, 500 = ötszáz.',
    breakdown: [{ label: '208 000 + 500', value: '208 500' }]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik szám a „négyszázezer-négy”?',
    highlightValue: 'négyszázezer-négy',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['400 004', '400 400', '404 000', '40 004'],
    correctAnswer: '400 004',
    explanation: '400 000 + 4 = 400 004.',
    hint: '400 ezer + 4 egyes.',
    breakdown: [{ label: '400 000 + 4', value: '400 004' }]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Hány darab 3-as számcsoportba (osztályba) osztható egy 6-jegyű szám?',
    highlightValue: '6 számjegy',
    questionTypeBadge: 'Osztályok',
    options: ['Pontosan 2 osztályba (3 + 3 jegy)', '3 osztályba', '1 osztályba', '6 osztályba'],
    correctAnswer: 'Pontosan 2 osztályba (3 + 3 jegy)',
    explanation: '6 : 3 = 2, tehát egy 6-jegyű számban pontosan 2 teljes osztály van (egyesek osztálya és ezresek osztálya).',
    hint: '6 számjegy = 2 darab 3-as csoport.',
    breakdown: [{ label: '6 jegy', value: '2 teljes osztály' }]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Hogyan tagoljuk a 801010 számot?',
    highlightValue: '801010',
    questionTypeBadge: 'Tagolás',
    options: ['801 010', '80 1010', '8010 10', '8 010 10'],
    correctAnswer: '801 010',
    explanation: 'Hátulról: 010, elöl: 801 -> 801 010 (nyolcszázegyezer-tíz).',
    hint: 'Válassz le 3 jegyet a végéről: 010, az eleje 801 marad.',
    breakdown: [{ label: 'Tagolt szám', value: '801 010' }]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Melyik szám a „kilencszázkilencvenezer”?',
    highlightValue: 'kilencszázkilencvenezer',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['990 000', '909 000', '999 000', '900 090'],
    correctAnswer: '990 000',
    explanation: '990 ezer = 990 000.',
    hint: '990 ezer = 990 000.',
    breakdown: [{ label: 'Szám', value: '990 000' }]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Hogyan olvassuk ki a 625 300 számot?',
    highlightValue: '625 300',
    questionTypeBadge: 'Kiolvasás',
    options: [
      'hatszázhuszonötezer-háromszáz',
      'hatszázhúszezer-háromszázöt',
      'hatvankétezer-ötszázhárom',
      'hatszázhuszonöt-háromszáz'
    ],
    correctAnswer: 'hatszázhuszonötezer-háromszáz',
    explanation: '625 ezer + 300 = hatszázhuszonötezer-háromszáz.',
    hint: '625 ezer = hatszázhuszonötezer, 300 = háromszáz.',
    breakdown: [{ label: '625 ezer + 300', value: '625 300' }]
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (1 000 000+) ---
  // ==========================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Melyik a helyesen tagolt alakja az 1000000 (egymillió) számnak?',
    highlightValue: '1000000',
    questionTypeBadge: 'Milliós tagolás',
    options: ['1 000 000', '1000 000', '10 000 00', '100 0000'],
    correctAnswer: '1 000 000',
    explanation: 'Hátulról: 000 (egyesek osztálya), 000 (ezresek osztálya), 1 (milliók osztálya) -> 1 000 000 (3 csoport).',
    hint: 'Hátulról haladva kétszer választunk le 3-3 nullát.',
    breakdown: [
      { label: 'Milliók', value: '1' },
      { label: 'Ezresek', value: '000' },
      { label: 'Egyesek', value: '000' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Hogyan olvassuk ki a 25 400 000 számot?',
    highlightValue: '25 400 000',
    questionTypeBadge: 'Milliós kiolvasás',
    options: [
      'huszonötmillió-négyszázezer',
      'kétmillió-ötszáznegyvenezer',
      'ktszázötvenmillió-négyszáz',
      'huszonötezer-négyszáz'
    ],
    correctAnswer: 'huszonötmillió-négyszázezer',
    explanation: '25 millió + 400 ezer + 0 = huszonötmillió-négyszázezer.',
    hint: '25 millió + 400 ezer.',
    breakdown: [
      { label: 'Milliók osztálya', value: '25 millió' },
      { label: 'Ezresek osztálya', value: '400 ezer' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik szám felel meg a kiolvasásnak?',
    highlightValue: '„hétmillió-háromszázezer-ötven”',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['7 300 050', '7 030 050', '7 300 500', '73 000 050'],
    correctAnswer: '7 300 050',
    explanation: '7 millió (7 000 000) + 300 ezer (300 000) + 50 = 7 300 050.',
    hint: '7 millió (7) + 300 ezer (300) + ötven (050).',
    breakdown: [{ label: '7M + 300E + 50', value: '7 300 050' }]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Hány osztályba tagolódik egy 8-jegyű szám (pl. 45 600 700)?',
    highlightValue: '45 600 700',
    questionTypeBadge: 'Osztályok azonosítása',
    options: [
      '3 osztályba (egyesek, ezresek, milliók)',
      '2 osztályba',
      '4 osztályba',
      '8 osztályba'
    ],
    correctAnswer: '3 osztályba (egyesek, ezresek, milliók)',
    explanation: '700 (egyesek), 600 (ezresek), 45 (milliók) -> 3 osztály.',
    hint: 'Egyesek osztálya, ezresek osztálya, milliók osztálya.',
    breakdown: [
      { label: '1. osztály', value: 'Egyesek (700)' },
      { label: '2. osztály', value: 'Ezresek (600)' },
      { label: '3. osztály', value: 'Milliók (45)' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Hogyan olvassuk ki a 4 000 008 számot?',
    highlightValue: '4 000 008',
    questionTypeBadge: 'Kiolvasás',
    options: [
      'négymillió-nyolc',
      'négyszázezer-nyolc',
      'négymillió-nyolcvan',
      'negyvenmillió-nyolc'
    ],
    correctAnswer: 'négymillió-nyolc',
    explanation: '4 millió (4 000 000) + 8 = négymillió-nyolc.',
    hint: '4 millió és 8 az egyes helyen.',
    breakdown: [{ label: '4 000 000 + 8', value: 'négymillió-nyolc' }]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Melyik szám a „százmillió”?',
    highlightValue: 'százmillió',
    questionTypeBadge: 'Szöveg ➔ Szám',
    options: ['100 000 000', '10 000 000', '1 000 000 000', '100 000'],
    correctAnswer: '100 000 000',
    explanation: 'Százmillió = 100 · 1 000 000 = 100 000 000 (9 jegyű szám: 1-es és 8 darab 0).',
    hint: '100 és utána kétszer 3 darab 0 = 100 000 000.',
    breakdown: [{ label: 'Szám', value: '100 000 000' }]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Hogyan tagoljuk helyesen az 50000005 számot?',
    highlightValue: '50000005',
    questionTypeBadge: 'Tagolás',
    options: ['50 000 005', '500 000 05', '5 000 0005', '5000 0005'],
    correctAnswer: '50 000 005',
    explanation: 'Hátulról: 005, 000, 50 -> 50 000 005 (ötvenmillió-öt).',
    hint: 'Hátulról válassz le 3, majd még 3 jegyet: 50 000 005.',
    breakdown: [{ label: 'Tagolt szám', value: '50 000 005' }]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Melyik számban van a legtöbb számjegy?',
    highlightValue: 'Összehasonlítás',
    questionTypeBadge: 'Jegyek száma',
    options: [
      'tízmillió-egyszáz (10 000 100)',
      'kilencszázkilencvenezer (990 000)',
      'egymillió-ötszázezer (1 500 000)',
      'ötszázezer (500 000)'
    ],
    correctAnswer: 'tízmillió-egyszáz (10 000 100)',
    explanation: '10 000 100 -> 8 számjegyű. (Az 1 500 000 7 jegyű, a 990 000 és 500 000 6 jegyű).',
    hint: 'Írd fel számjegyekkel mindegyiket és számold meg a jegyeket!',
    breakdown: [{ label: 'Legtöbb jegy', value: '10 000 100 (8 jegy)' }]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hogyan olvassuk ki a 12 050 300 számot?',
    highlightValue: '12 050 300',
    questionTypeBadge: 'Kiolvasás',
    options: [
      'tizenkétmillió-ötvenezer-háromszáz',
      'tizenkétezer-ötszáz-háromszáz',
      'egyszázhúszmillió-ötvenezer',
      'tizenkétmillió-ötszáz-háromszáz'
    ],
    correctAnswer: 'tizenkétmillió-ötvenezer-háromszáz',
    explanation: '12 millió + 50 ezer + 300 = tizenkétmillió-ötvenezer-háromszáz.',
    hint: '12 millió + 50 ezer + 300.',
    breakdown: [{ label: '12M + 50E + 300', value: '12 050 300' }]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Melyik a legnagyobb 7-jegyű szám?',
    highlightValue: 'Legnagyobb 7-jegyű szám',
    questionTypeBadge: 'Számképzés',
    options: ['9 999 999', '1 000 000', '99 999 999', '9 000 000'],
    correctAnswer: '9 999 999',
    explanation: 'A legnagyobb 7-jegyű szám a csupa 9-esből álló 9 999 999 (kilencmillió-kilencszázkilencvenkilencezer-kilencszázkilencvenkilenc).',
    hint: 'Hét darab kilences: 9 999 999.',
    breakdown: [{ label: 'Legnagyobb 7 jegyű', value: '9 999 999' }]
  }
];

export const NumberReadingQuiz: React.FC<NumberReadingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A számjegyek hármas csoportosítása és kiolvasása – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: hármas tagolás, számosztályok (egyesek, ezresek, milliók), helyes kiolvasási szabályok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-number-reading-quiz"
      pdfFilename="5_osztaly_szamok_kiolvasasa_kviz.pdf"
      badgeText="🗣️ 5. Osztály • I. Az egész számok"
      badgeColor="indigo"
      matcherComponent={<NumberReadingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<NumberReadingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheets={[
        {
          title: "A Hármas Csoportosítás Szabálya",
          items: [
            "Jobbról balra (hátulról) haladva 3-as csoportokba tagoljuk a számjegyeket",
            "A magyar helyesírás szerint szóközzel választjuk el az osztályokat (pl. 4 520 030)",
            "A legbaloldalibb csoport 1, 2 vagy 3 jegyből is állhat"
          ]
        },
        {
          title: "Számosztályok Rendszere",
          items: [
            "1. Egyesek osztálya (1–3. jegy jobbról): egyes (e), tízes (T), százas (Sz) — nem mondunk osztálynevet",
            "2. Ezresek osztálya (4–6. jegy jobbról): egyezres (E), tízezres (Té), százezres (Sze) — utána mondjuk: „ezer”",
            "3. Milliók osztálya (7–9. jegy jobbról): egymilliós (M), tízmilliós (TM), százmilliós (SzM) — utána mondjuk: „millió”"
          ]
        },
        {
          title: "A Kétezres Szabály (Betűs írás)",
          items: [
            "2 000-ig (kétezerig): Teljesen egybeírjuk a számokat (pl. 1550 = ezerötszázötven, 2000 = kétezer)",
            "2 000 felett: Kötőjelet teszünk a hármas osztályok határán (pl. 2001 = kétezer-egy, 45 800 = negyvenötezer-nyolcszáz)",
            "Kerek számoknál nincs kötőjel (pl. 100 000 = egyszázezer, 1 000 000 = egymillió)"
          ]
        }
      ]}
    />
  );
};

export default NumberReadingQuiz;
