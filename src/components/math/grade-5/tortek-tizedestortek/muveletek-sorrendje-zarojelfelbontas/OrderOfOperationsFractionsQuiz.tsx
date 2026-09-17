import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { OrderOfOperationsFractionsMatcher } from './OrderOfOperationsFractionsMatcher';
import { OrderOfOperationsFractionsSorter } from './OrderOfOperationsFractionsSorter';

export interface OrderOfOperationsFractionsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const orderOfOperationsFractionsQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - 2 művelet, szorzás/osztás prioritása, alapok
  1: [
    {
      id: 'g5-oof-l1-1',
      question: 'Számítsd ki: 1/4 + 1/4 · 3!',
      options: ['1', '6/4', '3/4', '1/2'],
      correctAnswer: '1',
      explanation: 'Először a szorzást végezzük el: 1/4 · 3 = 3/4. Ezután az összeadást: 1/4 + 3/4 = 4/4 = 1 egész.',
      breakdown: [
        '1. lépés: Műveleti sorrend: a szorzás megelőzi az összeadást.',
        '2. lépés: Szorzás elvégzése: 1/4 · 3 = 3/4.',
        '3. lépés: Összeadás elvégzése: 1/4 + 3/4 = 4/4 = 1 egész.'
      ],
      hint: 'Előbb a szorzást számold ki, utána add hozzá az 1/4-et!',
      formula: '1/4 + 1/4 · 3 = 1/4 + 3/4 = 1'
    },
    {
      id: 'g5-oof-l1-2',
      question: 'Mennyi a 3/4 - 1/2 : 2 kifejezés értéke?',
      options: ['1/2', '1/4', '3/8', '0'],
      correctAnswer: '1/2',
      explanation: 'Először az osztást végezzük el: 1/2 : 2 = 1/4. Ezután a kivonást: 3/4 - 1/4 = 2/4 = 1/2.',
      breakdown: [
        '1. lépés: Osztás: 1/2 : 2 = 1/4.',
        '2. lépés: Kivonás: 3/4 - 1/4 = 2/4 = 1/2.'
      ],
      hint: 'Előbb oszd el az 1/2-et 2-vel!',
      formula: '3/4 - 1/2 : 2 = 3/4 - 1/4 = 1/2'
    },
    {
      id: 'g5-oof-l1-3',
      question: 'Számítsd ki: 1/2 + 1/2 : 2!',
      options: ['3/4', '1/2', '1', '2/4'],
      correctAnswer: '3/4',
      explanation: 'Először az osztás: 1/2 : 2 = 1/4. Majd az összeadás közös nevezővel: 2/4 + 1/4 = 3/4.',
      breakdown: [
        '1. lépés: 1/2 : 2 = 1/4.',
        '2. lépés: 1/2 = 2/4.',
        '3. lépés: 2/4 + 1/4 = 3/4.'
      ],
      hint: 'Fél plusz fél fele = fél plusz negyed.',
      formula: '1/2 + 1/2 : 2 = 2/4 + 1/4 = 3/4'
    },
    {
      id: 'g5-oof-l1-4',
      question: 'Melyik műveletet kell ELŐSZÖR elvégezni a 2/3 + 1/3 · 4 kifejezésben?',
      options: ['A szorzást (1/3 · 4)', 'Az összeadást (2/3 + 1/3)', 'Bármelyiket, a sorrend mindegy', 'Balról jobbra az összeadást'],
      correctAnswer: 'A szorzást (1/3 · 4)',
      explanation: 'A szorzás magasabb rendű művelet, mint az összeadás, ezért zárójel hiányában mindig a szorzást végezzük el először.',
      breakdown: [
        '1. lépés: Megvizsgáljuk a műveleteket: összeadás (+) és szorzás (·).',
        '2. lépés: A hierarchia szerint a szorzás megelőzi az összeadást.',
        '3. lépés: Első lépés: 1/3 · 4.'
      ],
      hint: 'A műveleti piramisban a szorzás magasabb szinten áll!',
      formula: '2/3 + (1/3 · 4)'
    },
    {
      id: 'g5-oof-l1-5',
      question: 'Mennyi az 1 - 1/4 · 2 kifejezés értéke?',
      options: ['1/2', '3/4', '1 1/2', '1/4'],
      correctAnswer: '1/2',
      explanation: 'Először a szorzás: 1/4 · 2 = 2/4 = 1/2. Ezután 1 - 1/2 = 1/2.',
      breakdown: [
        '1. lépés: 1/4 · 2 = 2/4 = 1/2.',
        '2. lépés: 1 - 1/2 = 1/2.'
      ],
      hint: '1 egészből vegyél el 2 negyedet (azaz felet)!',
      formula: '1 - 1/4 · 2 = 1 - 1/2 = 1/2'
    },
    {
      id: 'g5-oof-l1-6',
      question: 'Számítsd ki: (1/2 + 1/2) · 3!',
      options: ['3', '1 1/2', '2', '6/4'],
      correctAnswer: '3',
      explanation: 'A zárójelben lévő összeadásnak elsőbbsége van: 1/2 + 1/2 = 1. Ezután 1 · 3 = 3.',
      breakdown: [
        '1. lépés: Zárójel kiszámítása: 1/2 + 1/2 = 1.',
        '2. lépés: Szorzás: 1 · 3 = 3.'
      ],
      hint: 'A zárójel értéke pontosan 1 egész.',
      formula: '(1/2 + 1/2) · 3 = 1 · 3 = 3'
    },
    {
      id: 'g5-oof-l1-7',
      question: 'Mennyi a 2/5 + 1/5 · 3 kifejezés értéke?',
      options: ['1', '9/5', '3/5', '4/5'],
      correctAnswer: '1',
      explanation: 'Először a szorzás: 1/5 · 3 = 3/5. Ezután: 2/5 + 3/5 = 5/5 = 1 egész.',
      breakdown: [
        '1. lépés: 1/5 · 3 = 3/5.',
        '2. lépés: 2/5 + 3/5 = 5/5 = 1.'
      ],
      hint: '2 ötödhöz hozzáadunk 3 ötödöt.',
      formula: '2/5 + 1/5 · 3 = 2/5 + 3/5 = 1'
    },
    {
      id: 'g5-oof-l1-8',
      question: 'Számítsd ki: 3/8 + 1/8 · 5!',
      options: ['1', '4/8', '15/8', '6/8'],
      correctAnswer: '1',
      explanation: 'Először a szorzás: 1/8 · 5 = 5/8. Majd 3/8 + 5/8 = 8/8 = 1 egész.',
      breakdown: [
        '1. lépés: 1/8 · 5 = 5/8.',
        '2. lépés: 3/8 + 5/8 = 8/8 = 1.'
      ],
      hint: '1/8 · 5 = 5/8.',
      formula: '3/8 + 1/8 · 5 = 8/8 = 1'
    },
    {
      id: 'g5-oof-l1-9',
      question: 'Mennyi az 1/3 + 2/3 : 2 kifejezés értéke?',
      options: ['2/3', '1', '1/3', '3/6'],
      correctAnswer: '2/3',
      explanation: 'Először az osztás: 2/3 : 2 = 1/3. Ezután 1/3 + 1/3 = 2/3.',
      breakdown: [
        '1. lépés: 2/3 : 2 = 1/3 (számláló osztása).',
        '2. lépés: 1/3 + 1/3 = 2/3.'
      ],
      hint: '2 harmad fele 1 harmad.',
      formula: '1/3 + 2/3 : 2 = 1/3 + 1/3 = 2/3'
    },
    {
      id: 'g5-oof-l1-10',
      question: 'Miért HIBÁS a következő számolás: 1/2 + 1/2 · 4 = 1 · 4 = 4?',
      options: [
        'Mert a szorzást kellett volna először elvégezni, nem az összeadást',
        'Mert 1/2 + 1/2 nem egyenlő 1-gyel',
        'Mert 1 · 4 nem 4',
        'Nem hibás, teljesen jó eredmény'
      ],
      correctAnswer: 'Mert a szorzást kellett volna először elvégezni, nem az összeadást',
      explanation: 'A szorzás megelőzi az összeadást: helyesen 1/2 · 4 = 2, majd 1/2 + 2 = 2 1/2.',
      breakdown: [
        '1. lépés: Helyes sorrend: 1/2 · 4 = 4/2 = 2.',
        '2. lépés: 1/2 + 2 = 2 1/2 (nem 4!).'
      ],
      hint: 'A szorzásnak van elsőbbsége!',
      formula: '1/2 + 1/2 · 4 = 1/2 + 2 = 2 1/2 ≠ 4'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Zárójeles kifejezések, egyszerűsítés, balról jobbra szabály
  2: [
    {
      id: 'g5-oof-l2-1',
      question: 'Számítsd ki: (1/2 + 1/4) · 4!',
      options: ['3', '1 1/2', '2', '4'],
      correctAnswer: '3',
      explanation: 'Zárójelben: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Ezután: 3/4 · 4 = 3.',
      breakdown: [
        '1. lépés: Zárójeles összeadás közös nevezővel: 2/4 + 1/4 = 3/4.',
        '2. lépés: Szorzás 4-gyel: 3/4 · 4 = 12/4 = 3 egész.'
      ],
      hint: 'Előbb add össze a zárójelben lévő törteket!',
      formula: '(1/2 + 1/4) · 4 = 3/4 · 4 = 3'
    },
    {
      id: 'g5-oof-l2-2',
      question: 'Mennyi a (3/4 - 1/4) : 2 kifejezés értéke?',
      options: ['1/4', '1/2', '2/4', '1/8'],
      correctAnswer: '1/4',
      explanation: 'Zárójel: 3/4 - 1/4 = 2/4 = 1/2. Osztás: 1/2 : 2 = 1/4.',
      breakdown: [
        '1. lépés: 3/4 - 1/4 = 2/4 = 1/2.',
        '2. lépés: 1/2 : 2 = 1/4.'
      ],
      hint: 'Zárójelben fél marad, annak a fele.',
      formula: '(3/4 - 1/4) : 2 = 1/2 : 2 = 1/4'
    },
    {
      id: 'g5-oof-l2-3',
      question: 'Számítsd ki: (1/3 + 1/6) · 6!',
      options: ['3', '2', '1', '6'],
      correctAnswer: '3',
      explanation: 'Zárójel: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Ezután: 1/2 · 6 = 3.',
      breakdown: [
        '1. lépés: Közös nevező a 6: 2/6 + 1/6 = 3/6 = 1/2.',
        '2. lépés: 1/2 · 6 = 3.'
      ],
      hint: '3/6 · 6 = 3.',
      formula: '(1/3 + 1/6) · 6 = 1/2 · 6 = 3'
    },
    {
      id: 'g5-oof-l2-4',
      question: 'Mennyi az 1/2 : 2 · 4 kifejezés értéke?',
      options: ['1', '1/16', '1/4', '4'],
      correctAnswer: '1',
      explanation: 'A szorzás és osztás egyenrangú, így balról jobbra haladunk: 1/2 : 2 = 1/4, majd 1/4 · 4 = 1.',
      breakdown: [
        '1. lépés: Balról jobbra haladva először az osztás: 1/2 : 2 = 1/4.',
        '2. lépés: Ezután a szorzás: 1/4 · 4 = 1.'
      ],
      hint: 'Haladj szigorúan balról jobbra!',
      formula: '1/2 : 2 · 4 = 1/4 · 4 = 1'
    },
    {
      id: 'g5-oof-l2-5',
      question: 'Számítsd ki: 6 · (1/2 - 1/3)!',
      options: ['1', '2', '1/6', '3'],
      correctAnswer: '1',
      explanation: 'Zárójelben: 1/2 - 1/3 = 3/6 - 2/6 = 1/6. Ezután: 6 · 1/6 = 1.',
      breakdown: [
        '1. lépés: Közös nevezőre hozás a zárójelben: 3/6 - 2/6 = 1/6.',
        '2. lépés: Szorzás: 6 · 1/6 = 6/6 = 1.'
      ],
      hint: '1/2 - 1/3 = 1/6.',
      formula: '6 · (1/2 - 1/3) = 6 · 1/6 = 1'
    },
    {
      id: 'g5-oof-l2-6',
      question: 'Mennyi a (2/5 + 3/5) : 4 kifejezés értéke?',
      options: ['1/4', '5/20', '1', '4/5'],
      correctAnswer: '1/4',
      explanation: 'Zárójel: 2/5 + 3/5 = 5/5 = 1. Ezután: 1 : 4 = 1/4.',
      breakdown: [
        '1. lépés: 2/5 + 3/5 = 5/5 = 1.',
        '2. lépés: 1 : 4 = 1/4.'
      ],
      hint: '1 egész osztva 4 felé.',
      formula: '(2/5 + 3/5) : 4 = 1 : 4 = 1/4'
    },
    {
      id: 'g5-oof-l2-7',
      question: 'Számítsd ki: 1/3 + 2/3 · 2!',
      options: ['1 2/3 (azaz 5/3)', '2', '1', '6/3'],
      correctAnswer: '1 2/3 (azaz 5/3)',
      explanation: 'Először a szorzás: 2/3 · 2 = 4/3. Majd 1/3 + 4/3 = 5/3 = 1 2/3.',
      breakdown: [
        '1. lépés: Szorzás: 2/3 · 2 = 4/3.',
        '2. lépés: Összeadás: 1/3 + 4/3 = 5/3 = 1 2/3.'
      ],
      hint: 'Előbb a 2/3-ot szorozd meg 2-vel!',
      formula: '1/3 + 2/3 · 2 = 1/3 + 4/3 = 5/3 = 1 2/3'
    },
    {
      id: 'g5-oof-l2-8',
      question: 'Mennyi a (4/5 - 1/5) : 3 kifejezés értéke?',
      options: ['1/5', '3/15', '1', '3/5'],
      correctAnswer: '1/5',
      explanation: 'Zárójel: 4/5 - 1/5 = 3/5. Osztás: 3/5 : 3 = (3 : 3)/5 = 1/5.',
      breakdown: [
        '1. lépés: 4/5 - 1/5 = 3/5.',
        '2. lépés: 3/5 : 3 = 1/5.'
      ],
      hint: '3 ötödöt osztunk 3 felé.',
      formula: '(4/5 - 1/5) : 3 = 3/5 : 3 = 1/5'
    },
    {
      id: 'g5-oof-l2-9',
      question: 'Számítsd ki: 3/4 · 2 - 1/2!',
      options: ['1', '1/2', '2', '3/2'],
      correctAnswer: '1',
      explanation: 'Először a szorzás: 3/4 · 2 = 6/4 = 3/2. Majd a kivonás: 3/2 - 1/2 = 2/2 = 1.',
      breakdown: [
        '1. lépés: 3/4 · 2 = 6/4 = 3/2.',
        '2. lépés: 3/2 - 1/2 = 2/2 = 1.'
      ],
      hint: '3/2 - 1/2 = 1 egész.',
      formula: '3/4 · 2 - 1/2 = 3/2 - 1/2 = 1'
    },
    {
      id: 'g5-oof-l2-10',
      question: 'Egy süteményhez 3/4 kg liszt volt otthon. Elhasználtak 1/4 kg-ot, majd a maradékot 2 egyenlő adagra osztották. Hány kg liszt van egy adagban?',
      options: ['1/4 kg', '1/2 kg', '2/4 kg', '1/8 kg'],
      correctAnswer: '1/4 kg',
      explanation: 'Kifejezéssel: (3/4 - 1/4) : 2 = 2/4 : 2 = 1/2 : 2 = 1/4 kg.',
      breakdown: [
        '1. lépés: Maradék liszt: 3/4 - 1/4 = 2/4 = 1/2 kg.',
        '2. lépés: Két egyenlő adag: 1/2 : 2 = 1/4 kg.'
      ],
      hint: 'Először vond ki a felhasznált lisztet, majd felezd meg!',
      formula: '(3/4 - 1/4) : 2 = 1/4'
    }
  ],

  // 3. SZINT: HALADÓ (10 feladat) - Összetett több tagú kifejezések, zárójelfelbontás, egyenletek
  3: [
    {
      id: 'g5-oof-l3-1',
      question: 'Számítsd ki: 1/2 · 4 + 1/3 · 6!',
      options: ['4', '2', '3', '5'],
      correctAnswer: '4',
      explanation: 'A két szorzást külön elvégezzük: 1/2 · 4 = 2 és 1/3 · 6 = 2. Majd összeadjuk: 2 + 2 = 4.',
      breakdown: [
        '1. lépés: Első szorzás: 1/2 · 4 = 2.',
        '2. lépés: Második szorzás: 1/3 · 6 = 2.',
        '3. lépés: Összeadás: 2 + 2 = 4.'
      ],
      hint: 'Mindkét szorzás eredménye 2.',
      formula: '1/2 · 4 + 1/3 · 6 = 2 + 2 = 4'
    },
    {
      id: 'g5-oof-l3-2',
      question: 'Mennyi a 2 - (1/2 + 1/4) kifejezés értéke?',
      options: ['1 1/4', '1 1/2', '3/4', '1/4'],
      correctAnswer: '1 1/4',
      explanation: 'Zárójelben: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Kivonás: 2 - 3/4 = 1 1/4.',
      breakdown: [
        '1. lépés: Zárójel: 1/2 + 1/4 = 3/4.',
        '2. lépés: Kivonás 2 egészből: 2 - 3/4 = 1 1/4.'
      ],
      hint: '2-ből vonj ki 3 negyedet!',
      formula: '2 - (1/2 + 1/4) = 2 - 3/4 = 1 1/4'
    },
    {
      id: 'g5-oof-l3-3',
      question: 'Számítsd ki: (1/2 + 1/3) : 5!',
      options: ['1/6', '5/6', '1/30', '1/5'],
      correctAnswer: '1/6',
      explanation: 'Zárójelben: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Osztás 5-tel: 5/6 : 5 = (5 : 5)/6 = 1/6.',
      breakdown: [
        '1. lépés: Közös nevezőre hozás: 3/6 + 2/6 = 5/6.',
        '2. lépés: Osztás 5-tel (számláló osztása): 5/6 : 5 = 1/6.'
      ],
      hint: '5/6 osztva 5-tel.',
      formula: '(1/2 + 1/3) : 5 = 5/6 : 5 = 1/6'
    },
    {
      id: 'g5-oof-l3-4',
      question: 'Mennyi a 3 · (1/4 + 1/2) kifejezés értéke?',
      options: ['2 1/4 (azaz 9/4)', '1 3/4', '3/4', '3'],
      correctAnswer: '2 1/4 (azaz 9/4)',
      explanation: 'Zárójelben: 1/4 + 2/4 = 3/4. Szorzás 3-mal: 3 · 3/4 = 9/4 = 2 1/4.',
      breakdown: [
        '1. lépés: 1/4 + 1/2 = 1/4 + 2/4 = 3/4.',
        '2. lépés: 3 · 3/4 = 9/4 = 2 1/4.'
      ],
      hint: '3 · 3/4 = 9/4.',
      formula: '3 · (1/4 + 1/2) = 3 · 3/4 = 9/4 = 2 1/4'
    },
    {
      id: 'g5-oof-l3-5',
      question: 'Számítsd ki: 1 - (1/3 + 1/6 : 2)!',
      options: ['7/12', '1/2', '5/12', '2/3'],
      correctAnswer: '7/12',
      explanation: 'Zárójelen belül először az osztás: 1/6 : 2 = 1/12. Majd az összeadás: 1/3 + 1/12 = 4/12 + 1/12 = 5/12. Végül: 1 - 5/12 = 7/12.',
      breakdown: [
        '1. lépés: Zárójelen belüli osztás: 1/6 : 2 = 1/12.',
        '2. lépés: Zárójelen belüli összeadás: 1/3 + 1/12 = 4/12 + 1/12 = 5/12.',
        '3. lépés: Kivonás 1-ből: 12/12 - 5/12 = 7/12.'
      ],
      hint: 'Zárójelen belül is a szorzás/osztás jön előbb!',
      formula: '1 - (1/3 + 1/12) = 1 - 5/12 = 7/12'
    },
    {
      id: 'g5-oof-l3-6',
      question: 'Mennyi a 2 · (1/2 + 1/4) kifejezés értéke?',
      options: ['1 1/2', '3/2', '1', '2'],
      correctAnswer: '1 1/2',
      explanation: 'Zárójelben: 1/2 + 1/4 = 3/4. Szorzás: 2 · 3/4 = 6/4 = 3/2 = 1 1/2.',
      breakdown: [
        '1. lépés: 1/2 + 1/4 = 3/4.',
        '2. lépés: 2 · 3/4 = 6/4 = 3/2 = 1 1/2.'
      ],
      hint: '2 darab 3/4 = 6/4 = 1 1/2.',
      formula: '2 · (1/2 + 1/4) = 2 · 3/4 = 1 1/2'
    },
    {
      id: 'g5-oof-l3-7',
      question: 'Melyik műveleti jel hiányzik a négyzetből: 1/2 ■ 1/4 · 2 = 1?',
      options: ['+', '-', '·', ':'],
      correctAnswer: '+',
      explanation: 'Mivel 1/4 · 2 = 1/2, a kifejezés: 1/2 + 1/2 = 1. Tehát az összeadásjel (+) hiányzik.',
      breakdown: [
        '1. lépés: 1/4 · 2 = 2/4 = 1/2.',
        '2. lépés: 1/2 ■ 1/2 = 1.',
        '3. lépés: 1/2 + 1/2 = 1, így a hiányzó művelet: +.'
      ],
      hint: 'Fél plusz fél ad ki 1 egészet.',
      formula: '1/2 + 1/4 · 2 = 1/2 + 1/2 = 1'
    },
    {
      id: 'g5-oof-l3-8',
      question: 'Számítsd ki: (1 - 1/5) : 2 + 1/5!',
      options: ['3/5', '2/5', '4/5', '1'],
      correctAnswer: '3/5',
      explanation: 'Zárójel: 1 - 1/5 = 4/5. Osztás: 4/5 : 2 = 2/5. Összeadás: 2/5 + 1/5 = 3/5.',
      breakdown: [
        '1. lépés: Zárójel: 1 - 1/5 = 4/5.',
        '2. lépés: Osztás: 4/5 : 2 = 2/5.',
        '3. lépés: Összeadás: 2/5 + 1/5 = 3/5.'
      ],
      hint: 'Lépésenként: 4/5 : 2 = 2/5, majd + 1/5.',
      formula: '(1 - 1/5) : 2 + 1/5 = 2/5 + 1/5 = 3/5'
    },
    {
      id: 'g5-oof-l3-9',
      question: 'Egy 24 fős osztály 1/3 része focizik. A maradék tanulók 1/2 része kosarazik. Hányan kosaraznak?',
      options: ['8 tanuló', '16 tanuló', '4 tanuló', '12 tanuló'],
      correctAnswer: '8 tanuló',
      explanation: 'Focizik: 24 · 1/3 = 8 fő. Maradék: 24 - 8 = 16 fő. Kosarazik: 16 · 1/2 = 8 fő. Kifejezéssel: (24 - 24 · 1/3) : 2 = 8.',
      breakdown: [
        '1. lépés: Focizók: 24 · 1/3 = 8 fő.',
        '2. lépés: Maradék: 24 - 8 = 16 fő.',
        '3. lépés: Kosarasok: 16 : 2 = 8 fő.'
      ],
      hint: '24 harmada 8, a maradék 16, annak a fele 8.',
      formula: '(24 - 8) : 2 = 8'
    },
    {
      id: 'g5-oof-l3-10',
      question: 'Számítsd ki: (3/4 + 1/2) : 5!',
      options: ['1/4', '5/20', '1/5', '1/2'],
      correctAnswer: '1/4',
      explanation: 'Zárójelben: 3/4 + 2/4 = 5/4. Osztás: 5/4 : 5 = (5 : 5)/4 = 1/4.',
      breakdown: [
        '1. lépés: 3/4 + 2/4 = 5/4.',
        '2. lépés: 5/4 : 5 = 1/4.'
      ],
      hint: '5 negyed osztva 5-tel.',
      formula: '(3/4 + 1/2) : 5 = 5/4 : 5 = 1/4'
    }
  ]
};

export function OrderOfOperationsFractionsQuiz({ onBack, onSwitchToTheory }: OrderOfOperationsFractionsQuizProps) {
  return (
    <QuizTemplate
      title="Műveletek sorrendje törtekkel kvíz"
      subtitle="Teszteld a tudásodat a műveleti hierarchiáról, a zárójelekről és az összetett kifejezésekről 30 feladaton keresztül!"
      badge="🔢 5. Osztály • Törtek, tizedes törtek"
      topicId="g5-fractions-order-of-operations-quiz"
      category="fractions-order-of-operations"
      grade={5}
      questions={orderOfOperationsFractionsQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="violet"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <OrderOfOperationsFractionsMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <OrderOfOperationsFractionsSorter
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
}

export default OrderOfOperationsFractionsQuiz;
