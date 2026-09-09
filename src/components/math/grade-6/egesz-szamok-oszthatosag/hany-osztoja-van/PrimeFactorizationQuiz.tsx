import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { PrimeFactorizationMatcher } from './PrimeFactorizationMatcher';
import { PrimeFactorizationSorter } from './PrimeFactorizationSorter';

export interface PrimeFactorizationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Prímszám (Törzsszám)',
    formula: 'Pontosan 2 pozitív osztó: 1 és önmaga',
    note: 'Prímek: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...'
  },
  {
    topic: 'A 2 és az 1 különlegessége',
    formula: '2 = egyetlen páros prím | 1 = NEM prím!',
    note: 'Az 1 számnak csak 1 osztója van, ezért se nem prím, se nem összetett.'
  },
  {
    topic: 'Kanonikus alak',
    formula: 'N = p₁ᵃ · p₂ᵇ · p₃ᶜ ...',
    note: 'Prímhatványok növekvő sorrendű szorzata (pl. 360 = 2³ · 3² · 5).'
  },
  {
    topic: 'Osztók száma képlet d(N)',
    formula: 'd(N) = (a + 1) · (b + 1) · (c + 1)',
    note: 'Minden prímhatvány kitevőjéhez adj hozzá 1-et, és szorozd össze őket!'
  },
  {
    topic: 'Négyzetszámok szabálya',
    formula: 'Csak a négyzetszámoknak van PÁRATLAN sok osztójuk',
    note: 'Mert a középső osztópár két egyenlő számból áll (pl. 36 = 6·6).'
  },
  {
    topic: 'Prímek hatványai',
    formula: 'd(pᵏ) = k + 1',
    note: 'Pl. 8 = 2³ -> 3 + 1 = 4 osztó (1, 2, 4, 8).'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Prímszámok felismerése és egyszerű prímfelbontás',
    range: 'Számok 50-ig, egyjegyű és kis kétjegyű prímek',
    focus: 'Prímek, összetett számok, az 1 tulajdonsága, 2-3 prím szorzata',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám prímszám az alábbiak közül?',
        highlightValue: 'Prímszám keresése',
        questionTypeBadge: 'Prímek',
        options: ['9', '15', '17', '21'],
        correctAnswer: 2,
        explanation: 'A 17 prímszám, mert csak 1-gyel és 17-tel osztható (9 = 3·3, 15 = 3·5, 21 = 3·7 mind összetett számok).',
        breakdown: [
          '9 = 3 · 3 (3 osztó: 1, 3, 9)',
          '15 = 3 · 5 (4 osztó: 1, 3, 5, 15)',
          '17 = 1 · 17 (csak 2 osztó: 1 és 17 -> PRÍM)',
          '21 = 3 · 7 (4 osztó: 1, 3, 7, 21)'
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik az egyetlen páros prímszám?',
        highlightValue: 'Páros prím',
        questionTypeBadge: 'Alaptétel',
        options: ['0', '2', '4', 'Nincs ilyen'],
        correctAnswer: 1,
        explanation: 'A 2 az egyetlen páros prímszám. Minden más páros szám osztható 2-vel, így legalább 3 osztója van.',
        breakdown: [
          'A 2-nek pontosan két osztója van: 1 és 2.',
          'Minden 2-nél nagyobb páros szám (4, 6, 8, ...) osztható 2-vel, ezért összetett.'
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Miért NEM prímszám az 1?',
        highlightValue: 'Az 1 tulajdonsága',
        questionTypeBadge: 'Definíció',
        options: ['Mert páratlan', 'Mert csak egyetlen pozitív osztója van (önmaga)', 'Mert negatív', 'Mert összetett szám'],
        correctAnswer: 1,
        explanation: 'A prímszámoknak a definíció szerint pontosan 2 pozitív osztójuk van. Az 1-nek csak 1 db pozitív osztója van (az 1).',
        breakdown: [
          'Prímszám feltétele: pontosan 2 db pozitív osztó (1 és önmaga).',
          'Az 1 egyetlen pozitív osztója az 1.',
          'Ezért az 1 se nem prím, se nem összetett.'
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a 12 prímtényezős felbontása (kanonikus alakja)?',
        highlightValue: '12 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2 · 6', '3 · 4', '2² · 3', '2 · 3²'],
        correctAnswer: 2,
        explanation: '12 = 2 · 2 · 3 = 2² · 3. A 6 és a 4 nem prímszámok!',
        breakdown: [
          '12 : 2 = 6',
          '6 : 2 = 3',
          '3 : 3 = 1',
          'Kanonikus alak: 2² · 3.'
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Hány osztója van egy tetszőleges prímszámnak?',
        highlightValue: 'd(p) = ?',
        questionTypeBadge: 'Osztók száma',
        options: ['1', '2', '3', 'Végtelen sok'],
        correctAnswer: 1,
        explanation: 'Minden prímszámnak pontosan 2 darab pozitív osztója van: az 1 és a prím maga.',
        breakdown: [
          'Prím osztói: {1, p}',
          'Darabszám: pontosan 2.'
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 18 prímtényezős felbontása?',
        highlightValue: '18 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2 · 3²', '2² · 3', '2 · 9', '3 · 6'],
        correctAnswer: 0,
        explanation: '18 = 2 · 3 · 3 = 2 · 3².',
        breakdown: [
          '18 : 2 = 9',
          '9 : 3 = 3',
          '3 : 3 = 1',
          '18 = 2 · 3².'
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik szám prímfelbontása a 2³?',
        highlightValue: '2³ = ?',
        questionTypeBadge: 'Kiszámolás',
        options: ['6', '8', '9', '12'],
        correctAnswer: 1,
        explanation: '2³ = 2 · 2 · 2 = 8.',
        breakdown: [
          '2 · 2 = 4',
          '4 · 2 = 8'
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hány prímszám van 1 és 10 között?',
        highlightValue: 'Prímek 1 és 10 között',
        questionTypeBadge: 'Megszámlálás',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '1 és 10 között 4 prímszám van: 2, 3, 5, 7.',
        breakdown: [
          '1 nem prím',
          '2, 3, 5, 7 prímszámok (4 db)',
          '4, 6, 8, 9, 10 összetett számok'
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 20 prímtényezős felbontása?',
        highlightValue: '20 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2 · 10', '4 · 5', '2² · 5', '2 · 5²'],
        correctAnswer: 2,
        explanation: '20 = 2 · 2 · 5 = 2² · 5.',
        breakdown: [
          '20 : 2 = 10',
          '10 : 2 = 5',
          '5 : 5 = 1',
          '20 = 2² · 5.'
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik szám prímtényezős szorzata a 3 · 5?',
        highlightValue: '3 · 5 = ?',
        questionTypeBadge: 'Szorzás',
        options: ['8', '15', '25', '35'],
        correctAnswer: 1,
        explanation: '3 · 5 = 15.',
        breakdown: [
          '3 · 5 = 15'
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Nagyobb számok felbontása és az osztók számának kiszámítása képlettel',
    range: 'Számok 150-ig, kanonikus alak és d(n) képlet',
    focus: 'Kitevők megnövelése 1-gyel, négyzetszámok páratlan osztói',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hány pozitív osztója van a 24-nek, ha 24 = 2³ · 3¹?',
        highlightValue: 'd(24) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['6', '8', '10', '12'],
        correctAnswer: 1,
        explanation: 'd(24) = (3 + 1) · (1 + 1) = 4 · 2 = 8 darab osztója van.',
        breakdown: [
          '24 = 2³ · 3¹',
          'Kitevők: 3 és 1',
          'd(24) = (3 + 1) · (1 + 1) = 4 · 2 = 8',
          'Az osztók: 1, 2, 3, 4, 6, 8, 12, 24 (8 db).'
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 60 prímtényezős felbontása?',
        highlightValue: '60 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2 · 3 · 10', '2² · 3 · 5', '2 · 3² · 5', '4 · 15'],
        correctAnswer: 1,
        explanation: '60 = 4 · 15 = 2² · 3 · 5.',
        breakdown: [
          '60 : 2 = 30',
          '30 : 2 = 15',
          '15 : 3 = 5',
          '5 : 5 = 1',
          '60 = 2² · 3 · 5.'
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hány osztója van a 36-nak, ha 36 = 2² · 3²?',
        highlightValue: 'd(36) = ?',
        questionTypeBadge: 'Négyzetszám',
        options: ['6', '8', '9', '12'],
        correctAnswer: 2,
        explanation: 'd(36) = (2 + 1) · (2 + 1) = 3 · 3 = 9 darab osztója van (páratlan, mert négyzetszám!).',
        breakdown: [
          '36 = 2² · 3²',
          'Kitevők: 2 és 2',
          'd(36) = (2 + 1) · (2 + 1) = 3 · 3 = 9',
          'Osztók: 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 db).'
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Milyen számoknak van PÁRATLAN számú pozitív osztójuk?',
        highlightValue: 'Páratlan sok osztó',
        questionTypeBadge: 'Szabály',
        options: ['A prímszámoknak', 'A páratlan számoknak', 'A négyzetszámoknak', 'A 10-zel osztható számoknak'],
        correctAnswer: 2,
        explanation: 'Csak a négyzetszámoknak van páratlan számú osztójuk, mert a gyökük szorzatpárja önmaga.',
        breakdown: [
          'Általában az osztók párokat alkotnak: a · b = N (páros darabszám).',
          'Négyzetszámoknál: k · k = N, a k önmagával alkot párt, így páratlan lesz a darabszám.'
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 72 kanonikus alakja?',
        highlightValue: '72 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2² · 3³', '2³ · 3²', '2⁴ · 3', '8 · 9'],
        correctAnswer: 1,
        explanation: '72 = 8 · 9 = 2³ · 3².',
        breakdown: [
          '72 : 2 = 36',
          '36 : 2 = 18',
          '18 : 2 = 9',
          '9 : 3 = 3',
          '3 : 3 = 1',
          '72 = 2³ · 3².'
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hány osztója van a 72-nek (72 = 2³ · 3²)?',
        highlightValue: 'd(72) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['10', '12', '14', '16'],
        correctAnswer: 1,
        explanation: 'd(72) = (3 + 1) · (2 + 1) = 4 · 3 = 12.',
        breakdown: [
          'Kitevők: 3 és 2',
          '(3 + 1) · (2 + 1) = 4 · 3 = 12 osztó.'
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a 100 prímtényezős alakja?',
        highlightValue: '100 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['2 · 5²', '2² · 5²', '2² · 5³', '10²'],
        correctAnswer: 1,
        explanation: '100 = 4 · 25 = 2² · 5².',
        breakdown: [
          '100 : 2 = 50',
          '50 : 2 = 25',
          '25 : 5 = 5',
          '5 : 5 = 1',
          '100 = 2² · 5².'
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Hány osztója van a 100-nak (100 = 2² · 5²)?',
        highlightValue: 'd(100) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['4', '6', '8', '9'],
        correctAnswer: 3,
        explanation: 'd(100) = (2 + 1) · (2 + 1) = 3 · 3 = 9 (négyzetszám: 10²).',
        breakdown: [
          '(2 + 1) · (2 + 1) = 3 · 3 = 9 osztó.'
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Egy p prímszám 4. hatványának (p⁴) hány osztója van?',
        highlightValue: 'd(p⁴) = ?',
        questionTypeBadge: 'Prímhatvány',
        options: ['4', '5', '6', '16'],
        correctAnswer: 1,
        explanation: 'd(p⁴) = 4 + 1 = 5 darab osztója van (1, p, p², p³, p⁴).',
        breakdown: [
          'Kitevő: 4',
          'Osztók száma: 4 + 1 = 5.'
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a 45 prímtényezős felbontása?',
        highlightValue: '45 felbontása',
        questionTypeBadge: 'Prímfelbontás',
        options: ['3 · 15', '3² · 5', '3 · 5²', '5 · 9'],
        correctAnswer: 1,
        explanation: '45 = 9 · 5 = 3² · 5.',
        breakdown: [
          '45 : 3 = 15',
          '15 : 3 = 5',
          '5 : 5 = 1',
          '45 = 3² · 5.'
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy számok, összetett prímfelbontás és fordított osztószám-feladatok',
    range: 'Számok 1000-ig, számelméleti következtetések',
    focus: 'd(n) alapján számok keresése, többprímes felbontások',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a 360 prímtényezős felbontása?',
        highlightValue: '360 felbontása',
        questionTypeBadge: 'Nagy szám felbontása',
        options: ['2² · 3³ · 5', '2³ · 3² · 5', '2³ · 3 · 5²', '2⁴ · 3 · 5'],
        correctAnswer: 1,
        explanation: '360 = 36 · 10 = (2² · 3²) · (2 · 5) = 2³ · 3² · 5.',
        breakdown: [
          '360 : 2 = 180',
          '180 : 2 = 90',
          '90 : 2 = 45',
          '45 : 3 = 15',
          '15 : 3 = 5',
          '5 : 5 = 1',
          '360 = 2³ · 3² · 5.'
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Hány pozitív osztója van a 360-nak (360 = 2³ · 3² · 5¹)?',
        highlightValue: 'd(360) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['18', '20', '24', '30'],
        correctAnswer: 2,
        explanation: 'd(360) = (3 + 1) · (2 + 1) · (1 + 1) = 4 · 3 · 2 = 24 darab osztója van.',
        breakdown: [
          'Kitevők: 3, 2, 1',
          'd(360) = (3 + 1) · (2 + 1) · (1 + 1)',
          '= 4 · 3 · 2 = 24 osztó.'
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik az a legkisebb pozitív egész szám, amelynek pontosan 3 darab osztója van?',
        highlightValue: 'd(N) = 3 (minimum N)',
        questionTypeBadge: 'Fordított keresés',
        options: ['3', '4', '6', '9'],
        correctAnswer: 1,
        explanation: 'Pontosan 3 osztója a prímszámok négyzetének van (d(p²) = 2 + 1 = 3). A legkisebb prím a 2, négyzete 2² = 4 (osztói: 1, 2, 4).',
        breakdown: [
          '3 = 2 + 1, tehát a szám alakja p²',
          'Legkisebb prím: p = 2',
          'N = 2² = 4 (osztók: 1, 2, 4).'
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Melyik az a legkisebb pozitív egész szám, amelynek pontosan 4 darab osztója van?',
        highlightValue: 'd(N) = 4 (minimum N)',
        questionTypeBadge: 'Fordított keresés',
        options: ['4', '6', '8', '10'],
        correctAnswer: 1,
        explanation: 'A 6-nak 4 osztója van (1, 2, 3, 6). A 4-nek csak 3, a 8-nak 4 (de 8 > 6), így a 6 a legkisebb.',
        breakdown: [
          '4 felbontható: 2 · 2 = (1+1)(1+1) -> p · q alak (pl. 2 · 3 = 6)',
          'vagy 3 + 1 -> p³ alak (pl. 2³ = 8)',
          'Mivel 6 < 8, a legkisebb szám a 6.'
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a 210 prímtényezős felbontása?',
        highlightValue: '210 felbontása',
        questionTypeBadge: '4 prím szorzata',
        options: ['2 · 3 · 5 · 7', '2² · 3 · 5 · 7', '2 · 3² · 5 · 7', '2 · 5 · 21'],
        correctAnswer: 0,
        explanation: '210 = 2 · 3 · 5 · 7 (az első 4 prímszám szorzata!).',
        breakdown: [
          '210 : 2 = 105',
          '105 : 3 = 35',
          '35 : 5 = 7',
          '7 : 7 = 1',
          '210 = 2 · 3 · 5 · 7.'
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Hány osztója van a 210-nek (210 = 2 · 3 · 5 · 7)?',
        highlightValue: 'd(210) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['8', '12', '16', '24'],
        correctAnswer: 2,
        explanation: 'd(210) = (1+1) · (1+1) · (1+1) · (1+1) = 2⁴ = 16 osztó.',
        breakdown: [
          'Minden prím kitevője 1',
          'd(210) = 2 · 2 · 2 · 2 = 16.'
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Ha egy szám kanonikus alakja 2ᵃ · 3ᵇ, és pontosan 6 osztója van, mik lehetnek a kitevők?',
        highlightValue: '(a+1)(b+1) = 6',
        questionTypeBadge: 'Kombinatorikus osztószám',
        options: ['a = 1, b = 2 vagy a = 2, b = 1', 'a = 2, b = 2', 'a = 3, b = 3', 'a = 1, b = 5'],
        correctAnswer: 0,
        explanation: '6 felbontható 2 · 3 alakban, tehát a kitevők (1+1)(2+1), így {a, b} = {1, 2} vagy {2, 1}. (Pl. 2¹ · 3² = 18 vagy 2² · 3¹ = 12).',
        breakdown: [
          '(a + 1) · (b + 1) = 6 = 2 · 3',
          'a + 1 = 2 $\\to$ a = 1 és b + 1 = 3 $\\to$ b = 2',
          'Vagy fordítva: a = 2, b = 1.'
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a 256 prímtényezős alakja?',
        highlightValue: '256 felbontása',
        questionTypeBadge: 'Kettőhatvány',
        options: ['2⁶', '2⁷', '2⁸', '2⁹'],
        correctAnswer: 2,
        explanation: '256 = 2⁸ (2, 4, 8, 16, 32, 64, 128, 256).',
        breakdown: [
          '256 = 16 · 16 = 2⁴ · 2⁴ = 2⁸.'
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Hány osztója van a 256-nak (256 = 2⁸)?',
        highlightValue: 'd(256) = ?',
        questionTypeBadge: 'd(n) képlet',
        options: ['8', '9', '10', '16'],
        correctAnswer: 1,
        explanation: 'd(2⁸) = 8 + 1 = 9 osztó (páratlan, mert 256 = 16² négyzetszám).',
        breakdown: [
          'Kitevő: 8',
          'd(256) = 8 + 1 = 9.'
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Melyik az a szám, amelynek prímfelbontása 2⁴ · 5²?',
        highlightValue: '2⁴ · 5² = ?',
        questionTypeBadge: 'Érték kiszámítása',
        options: ['200', '400', '500', '800'],
        correctAnswer: 1,
        explanation: '2⁴ · 5² = 16 · 25 = 400 (ami 20² négyzetszám).',
        breakdown: [
          '2⁴ = 16',
          '5² = 25',
          '16 · 25 = 400.'
        ]
      }
    ]
  }
};

const GAME_MODES: CustomGameMode[] = [
  {
    id: 'matcher',
    title: 'Kártyás Párosító',
    subtitle: '8 pár megkeresése',
    badgeText: '8 Pár',
    icon: <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <PrimeFactorizationMatcher
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  },
  {
    id: 'sorter',
    title: 'Csoportosító',
    subtitle: 'Húzd a helyére (3 csoport)',
    badgeText: '10 Elem (3 csoport)',
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <PrimeFactorizationSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function PrimeFactorizationQuiz({ onBack, onSwitchToTheory }: PrimeFactorizationQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🧱"
      topicBadge="🧱 6. Osztály • I. Egész számok"
      title="Hány osztója van? Kvíz"
      subtitle="Gyakorold a prímszámok felismerését, a prímtényezős felbontást és az osztók számának kiszámítását 3 szinten!"
      cheatSheetTitle="Prímtényezős és osztószám-szabályok"
      hintText="💡 A kanonikus alak kitevőihez adj 1-et és szorozd össze őket: d(N) = (a+1)·(b+1)!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="indigo"
    />
  );
}

export { PrimeFactorizationQuiz as NumberOfDivisorsQuiz };
