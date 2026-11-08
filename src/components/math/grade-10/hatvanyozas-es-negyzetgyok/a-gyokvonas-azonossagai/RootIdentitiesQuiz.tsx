import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RootIdentitiesMatcher } from './RootIdentitiesMatcher';
import { RootIdentitiesSorter } from './RootIdentitiesSorter';
import {
  SquareRootDefinitionSvg,
  AbsoluteValueRootSvg,
  ProductAndQuotientRootSvg,
  RootSumTrapSvg
} from './RootIdentitiesFigures';

interface RootIdentitiesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A négyzetgyök definíciója és feltételei',
    description: 'Nemnegatív valós szám (a ≥ 0) négyzetgyöke az a nemnegatív szám, amelynek négyzete a. Negatív számnak nincs valós négyzetgyöke!',
    note: 'Két alappillér: a ≥ 0 ÉS √a ≥ 0. Például √25 = 5 (és NEM -5 vagy ±5)!',
    color: 'from-teal-500 to-emerald-600',
    figure: <SquareRootDefinitionSvg size={180} />
  },
  {
    title: 'A √(a²) = |a| abszolútérték szabály',
    description: 'Bármely valós szám négyzete nemnegatív, így a √(a²) mindig értelmezett, és értéke sosem negatív, hanem a szám abszolút értéke: |a|.',
    note: 'Példa: √((-7)²) = |-7| = 7. Változóknál: ha x < 0, akkor √(x²) = -x!',
    color: 'from-amber-500 to-orange-600',
    figure: <AbsoluteValueRootSvg size={180} />
  },
  {
    title: 'Szorzat és hányados négyzetgyöke',
    description: 'Nemnegatív tényezők szorzatának négyzetgyöke egyenlő a tényezők négyzetgyökének szorzatával: √(a · b) = √a · √b. Hasonlóan: √(a / b) = √a / √b (b > 0).',
    note: 'Alkalmazása: tényező kiemelése (√18 = √(9·2) = 3√2) vagy összevonás (√2 · √8 = √16 = 4).',
    color: 'from-sky-500 to-blue-600',
    figure: <ProductAndQuotientRootSvg size={180} />
  },
  {
    title: 'Az összeg és különbség gyökének csapdája',
    description: 'A négyzetgyökvonás NEM additív művelet! Összeg vagy különbség gyökét NEM lehet tagonként vonni: √(a + b) ≠ √a + √b!',
    note: 'Példa: √(9 + 16) = √25 = 5, miközben √9 + √16 = 3 + 4 = 7. 5 ≠ 7!',
    color: 'from-rose-500 to-red-600',
    figure: <RootSumTrapSvg size={180} />
  }
];

const levels: QuizLevelConfig[] = [
  // 1. SZINT: KÖNNYŰ (10 KÉRDÉS)
  {
    level: 1,
    title: '1. Könnyű szint: A négyzetgyök definíciója és alapértékei',
    subtitle: 'Négyzetgyök definíciója, értelmezési tartomány (a ≥ 0), nemnegativitás és nevezetes négyzetszámok gyöke.',
    range: '1–10. feladat',
    focus: 'a ≥ 0, √a ≥ 0 és alapértékek',
    color: 'teal',
    questions: [
      {
        id: 'r1-1',
        question: 'Mennyi √0 értéke?',
        options: ['0', '1', 'Nem értelmezett', '±0'],
        correctAnswer: 0,
        explanation: '0² = 0, és a definíció szerint a nemnegatív szám a 0, így √0 = 0.'
      },
      {
        id: 'r1-3',
        question: 'Mennyi √64 értéke a valós számok halmazán?',
        options: ['8', '±8', '-8', '32'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök definíciója szerint az eredmény mindig nemnegatív szám, tehát √64 = +8 (és nem ±8).'
      },
      {
        id: 'r1-4',
        question: 'Mennyi √144 értéke?',
        options: ['12', '14', '72', '±12'],
        correctAnswer: 0,
        explanation: '12² = 144 és 12 ≥ 0, ezért √144 = 12.'
      },
      {
        id: 'r1-5',
        question: 'Milyen feltételnek kell teljesülnie az "a" valós számra ahhoz, hogy a √a kifejezés valós számként értelmezve legyen?',
        options: ['a ≥ 0 (nemnegatív)', 'a > 0 (szigorúan pozitív)', 'a bármilyen valós szám lehet', 'a egész szám kell legyen'],
        correctAnswer: 0,
        explanation: 'Valós számok körében kizárólag nemnegatív számból (a ≥ 0) vonhatunk négyzetgyököt.'
      },
      {
        id: 'r1-6',
        question: 'Mennyi √(-16) értéke a valós számok halmazán?',
        options: ['Nem értelmezett valós számként', '-4', '±4', '4'],
        correctAnswer: 0,
        explanation: 'Nincs olyan valós szám, amelynek a négyzete negatív (-16) lenne, ezért √(-16) a valós számok halmazán nem értelmezett.'
      },
      {
        id: 'r1-15',
        question: 'Mennyi √0,25 értéke?',
        options: ['0,5', '0,05', '0,25', '5'],
        correctAnswer: 0,
        explanation: '0,5 · 0,5 = 0,25, ezért √0,25 = 0,5.'
      },
      {
        id: 'r1-18',
        question: 'Mennyi √(4/9) értéke?',
        options: ['2/3', '4/9', '2/9', '4/3'],
        correctAnswer: 0,
        explanation: '√(4/9) = √4 / √9 = 2/3.'
      },
      {
        id: 'r1-21',
        question: 'Mennyi a √4 · √9 szorzat értéke?',
        options: ['6', '36', '12', '5'],
        correctAnswer: 0,
        explanation: '√4 = 2 és √9 = 3, szorzatuk 2 · 3 = 6.'
      },
      {
        id: 'r1-23',
        question: 'Mennyi a √100 / √25 hányados értéke?',
        options: ['2', '4', '10', '25'],
        correctAnswer: 0,
        explanation: '√100 / √25 = 10 / 5 = 2.'
      },
      {
        id: 'r1-27',
        question: 'Mennyi (√7)² értéke?',
        options: ['7', '49', '√49', '14'],
        correctAnswer: 0,
        explanation: 'A négyzetgyök definíciója szerint nemnegatív számra (√a)² = a, így (√7)² = 7.'
      }
    ]
  },

  // 2. SZINT: KÖZEPES (10 KÉRDÉS)
  {
    level: 2,
    title: '2. Közepes szint: √(a²) = |a|, tényező kiemelése és bevitele, gyökös szorzatok',
    subtitle: 'Abszolútérték szabály, tényező kiemelése gyökjel alól, bevitele gyökjel alá és az összeg gyökének csapdája.',
    range: '11–20. feladat',
    focus: 'Abszolútérték szabály, tényező kiemelés és bevitel',
    color: 'teal',
    questions: [
      {
        id: 'r2-1',
        question: 'Mennyi √((-7)²) értéke?',
        options: ['7', '-7', '±7', '-49'],
        correctAnswer: 0,
        explanation: '(-7)² = 49, és √49 = 7. Szabály: √(a²) = |a|, így |-7| = 7.'
      },
      {
        id: 'r2-4',
        question: 'Mi a pontos matematikai értéke a √(a²) kifejezésnek tetszőleges "a" valós szám esetén?',
        options: ['|a| (az "a" abszolút értéke)', 'a (mindig maga az "a")', '±a', '-a'],
        correctAnswer: 0,
        explanation: 'Mivel a gyök értéke nemnegatív kell legyen, negatív "a" esetén is pozitív eredményt kapunk, tehát √(a²) = |a|.'
      },
      {
        id: 'r2-5',
        question: 'Ha x negatív valós szám (x < 0), akkor mennyi √(x²) értéke?',
        options: ['-x', 'x', 'x²', '-x²'],
        correctAnswer: 0,
        explanation: '√(x²) = |x|. Ha x negatív, akkor az abszolút értéke -x (például ha x = -5, akkor |-5| = -(-5) = 5).'
      },
      {
        id: 'r2-6',
        question: 'Mennyi √(9 + 16) pontos értéke?',
        options: ['5', '7', '√7', '25'],
        correctAnswer: 0,
        explanation: 'Először a gyök alatti összeadást kell elvégezni: √(9 + 16) = √25 = 5.'
      },
      {
        id: 'r2-7',
        question: 'Igaz-e, hogy √(9 + 16) = √9 + √16?',
        options: ['Nem igaz, mert √25 = 5, miközben 3 + 4 = 7 (5 ≠ 7)', 'Igaz, mert a gyököt tagonként lehet vonni', 'Csak pozitív számokra igaz', 'Mindig igaz'],
        correctAnswer: 0,
        explanation: 'A négyzetgyökvonás NEM tagolható összegen: √(a + b) ≠ √a + √b. √(9+16) = 5 ≠ 7!'
      },
      {
        id: 'r2-10',
        question: 'Mennyi a √2 · √8 szorzat értéke?',
        options: ['4', '16', '2√8', '√10'],
        correctAnswer: 0,
        explanation: '√2 · √8 = √(2 · 8) = √16 = 4.'
      },
      {
        id: 'r2-14',
        question: 'Mennyi a √50 / √2 hányados értéke?',
        options: ['5', '25', '√25 / 2', '10'],
        correctAnswer: 0,
        explanation: '√50 / √2 = √(50 / 2) = √25 = 5.'
      },
      {
        id: 'r2-17',
        question: 'Hogyan alakítható át a √18, ha kiemeljük a lehető legnagyobb négyzetszámot a gyökjel alól?',
        options: ['3√2', '2√3', '9√2', '6√3'],
        correctAnswer: 0,
        explanation: '18 = 9 · 2, így √18 = √(9 · 2) = √9 · √2 = 3√2.'
      },
      {
        id: 'r2-21',
        question: 'Hogyan alakítható át a √72 a lehető legnagyobb négyzetszám kiemelésével?',
        options: ['6√2', '2√18', '3√8', '12√2'],
        correctAnswer: 0,
        explanation: '72 = 36 · 2, így √72 = √(36 · 2) = 6√2.'
      },
      {
        id: 'r2-24',
        question: 'Vigyük be a szorzótényezőt a gyökjel alá: 2√5 = ?',
        options: ['√20', '√10', '√50', '√40'],
        correctAnswer: 0,
        explanation: '2 = √4, így 2√5 = √4 · √5 = √(4 · 5) = √20.'
      }
    ]
  },

  // 3. SZINT: NEHÉZ (10 KÉRDÉS)
  {
    level: 3,
    title: '3. Nehéz szint: Összetett gyökös kifejezések, nevező gyöktelenítése és algebrai alkalmazások',
    subtitle: 'Azonos gyökök összevonása, nevező gyöktelenítése, nevezetes szorzatok gyökökkel, algebrai kifejezések abszolútértékkel.',
    range: '21–30. feladat',
    focus: 'Összetett gyökös kifejezések, gyöktelenítés',
    color: 'teal',
    questions: [
      {
        id: 'r3-1',
        question: 'Mennyi a √8 + √18 összeg legegyszerűbb alakja?',
        options: ['5√2', '√26', '6√2', '7√2'],
        correctAnswer: 0,
        explanation: '√8 = 2√2 és √18 = 3√2. Mivel a gyökös tényező azonos (√2), összevonhatók: 2√2 + 3√2 = 5√2.'
      },
      {
        id: 'r3-2',
        question: 'Mennyi a √50 - √8 különbség legegyszerűbb alakja?',
        options: ['3√2', '√42', '2√2', '7√2'],
        correctAnswer: 0,
        explanation: '√50 = 5√2 és √8 = 2√2. Kivonva őket: 5√2 - 2√2 = 3√2.'
      },
      {
        id: 'r3-7',
        question: 'Gyöktelenítsük az 1 / √2 tört nevezőjét!',
        options: ['√2 / 2', '2 / √2', '√2', '1 / 2'],
        correctAnswer: 0,
        explanation: 'Számlálót és nevezőt megszorozzuk √2-vel: (1 · √2) / (√2 · √2) = √2 / 2.'
      },
      {
        id: 'r3-8',
        question: 'Gyöktelenítsük a 6 / √3 tört nevezőjét!',
        options: ['2√3', '3√3', '6√3', '√3 / 2'],
        correctAnswer: 0,
        explanation: '(6 · √3) / (√3 · √3) = (6√3) / 3 = 2√3.'
      },
      {
        id: 'r3-13',
        question: 'Mennyi a (√5 + √2)(√5 - √2) szorzat értéke a nevezetes szorzat alapján?',
        options: ['3', '7', '√3', '√21'],
        correctAnswer: 0,
        explanation: '(a + b)(a - b) = a² - b². Így (√5)² - (√2)² = 5 - 2 = 3.'
      },
      {
        id: 'r3-18',
        question: 'Fejtsük ki a (√3 + √2)² kifejezést!',
        options: ['5 + 2√6', '5', '5 + √6', '6 + 2√6'],
        correctAnswer: 0,
        explanation: '(a + b)² = a² + 2ab + b² = (√3)² + 2(√3 · √2) + (√2)² = 3 + 2√6 + 2 = 5 + 2√6.'
      },
      {
        id: 'r3-22',
        question: 'Mennyi a √(4x²) kifejezés értéke, ha tudjuk, hogy x < 0 (negatív valós szám)?',
        options: ['-2x', '2x', '4x', '-4x'],
        correctAnswer: 0,
        explanation: '√(4x²) = √4 · √(x²) = 2 · |x|. Mivel x < 0, így |x| = -x, ezért a kifejezés értéke 2(-x) = -2x (ami egy pozitív szám).'
      },
      {
        id: 'r3-25',
        question: 'Mennyi a √((3 - π)²) kifejezés pontos értéke?',
        options: ['π - 3', '3 - π', '±(3 - π)', '0'],
        correctAnswer: 0,
        explanation: '√(a²) = |a|, így |3 - π|. Mivel π ≈ 3,14 > 3, a 3 - π különbség negatív, ezért abszolút értéke -(3 - π) = π - 3.'
      },
      {
        id: 'r3-28',
        question: 'Gyöktelenítsük az 1 / (√3 - 1) tört nevezőjét!',
        options: ['(√3 + 1) / 2', '√3 + 1', '(√3 - 1) / 2', '√3 / 2'],
        correctAnswer: 0,
        explanation: 'A számlálót és nevezőt megszorozzuk a konjugálttal (√3 + 1)-gyel: (√3 + 1) / ((√3)² - 1²) = (√3 + 1) / (3 - 1) = (√3 + 1) / 2.'
      },
      {
        id: 'r3-30',
        question: 'Mennyi a √(2 + √3) · √(2 - √3) szorzat pontos értéke?',
        options: ['1', '√7', '4', '2'],
        correctAnswer: 0,
        explanation: 'A gyökök közös gyökjel alá vonhatók: √((2 + √3)(2 - √3)) = √(2² - (√3)²) = √(4 - 3) = √1 = 1.'
      }
    ]
  }
];

export const RootIdentitiesQuiz: React.FC<RootIdentitiesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      badgeText="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      title="A gyökvonás azonosságai kvíz"
      subtitle="Definíció, feltételek, abszolútérték szabály, szorzat és hányados négyzetgyöke, kiemelés és bevitel"
      themeColor="teal"
      levels={levels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <RootIdentitiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <RootIdentitiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      initialGameMode={initialGameMode}
    />
  );
};

export default RootIdentitiesQuiz;

