import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PowerBasicsMatcher } from './PowerBasicsMatcher';
import { PowerBasicsSorter } from './PowerBasicsSorter';
import {
  PowerStructureSvg,
  SignRulesSvg,
  PowerIdentitiesSvg,
  DistributivePowerSvg
} from './PowerBasicsFigures';

interface PowerBasicsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A hatványozás definíciója és felépítése',
    description: 'aⁿ = a · a · ... · a (n tényező), ahol a az alap és n a kitevő. a¹ = a, 1ⁿ = 1, 0ⁿ = 0 (ha n > 0).',
    note: 'Fontos: 2⁵ = 32, de 5² = 25! A hatványalap és kitevő nem felcserélhető.',
    color: 'from-blue-500 to-indigo-600',
    figure: <PowerStructureSvg size={180} />
  },
  {
    title: 'Előjelszabályok és a zárójelezés veszélye',
    description: '(-a)²ᵏ > 0 (páros kitevő pozitív), (-a)²ᵏ⁺¹ < 0 (páratlan kitevő negatív). Zárójel nélkül: -aⁿ = -(aⁿ)!',
    note: 'Gyakori csapda: (-3)² = +9, de -3² = -9!',
    color: 'from-amber-500 to-rose-600',
    figure: <SignRulesSvg size={180} />
  },
  {
    title: 'Azonos alapú hatványok azonosságai',
    description: 'Szorzásnál a kitevők összeadódnak: aⁿ · aᵐ = aⁿ⁺ᵐ. Osztásnál kivonódnak: aⁿ : aᵐ = aⁿ⁻ᵐ (a ≠ 0). Hatványozásnál szorzódnak: (aⁿ)ᵐ = aⁿ·ᵐ.',
    note: 'Vigyázat: (2³)² = 2⁶ = 64, de 2^(3²) = 2⁹ = 512!',
    color: 'from-purple-500 to-indigo-600',
    figure: <PowerIdentitiesSvg size={180} />
  },
  {
    title: 'Szorzat, hányados hatványa és 0-ra végződés',
    description: '(a · b)ⁿ = aⁿ · bⁿ, valamint (a / b)ⁿ = aⁿ / bⁿ (b ≠ 0). A 10-es szorzók a 2 és 5 prímfaktorok párjaiból képződnek: 2ᵏ · 5ᵏ = 10ᵏ.',
    note: 'Példa: 2⁸ · 5⁶ = 2² · (2·5)⁶ = 4 · 10⁶ ⟹ 6 nullára végződik.',
    color: 'from-emerald-500 to-teal-600',
    figure: <DistributivePowerSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak, előjelszabályok és egyszerű hatványok',
    subtitle: 'Alap, kitevő, hatványérték, zárójelezés és alapműveletek.',
    range: '1–10. feladat',
    focus: 'Alapfogalmak és előjelek',
    questions: [
      {
        id: 'pbq1-1',
        questionTypeBadge: 'Fogalom',
        question: 'Mit fejez ki a kitevő (n) az aⁿ hatványkifejezésben (n ∈ ℤ⁺ esetén)?',
        options: [
          'Hogy hányszor kell az a alapot szorzótényezőként leírni önmagával',
          'Hogy mennyivel kell megszorozni az a alapot (n · a)',
          'Hány tizedesjegyből áll a kapott szám',
          'Az alap ellentettjét'
        ],
        correctAnswer: 0,
        explanation: 'A definíció szerint aⁿ = a · a · ... · a, ahol a tényezők száma pontosan n. Ezért a kitevő a szorzótényezők számát jelöli.',
        hint: 'Gondolj a 2³ = 2 · 2 · 2 példára! Hány darab kettes szorzódik össze?'
      },
      {
        id: 'pbq1-2',
        questionTypeBadge: 'Számolás',
        question: 'Mennyi a 2⁵ hatvány pontos értéke?',
        options: ['32', '10', '25', '64'],
        correctAnswer: 0,
        explanation: '2⁵ = 2 · 2 · 2 · 2 · 2 = 4 · 4 · 2 = 16 · 2 = 32. Nem 2 · 5 = 10!',
        hint: 'Szorozd össze a kettőt ötször önmagával: 2 · 2 · 2 · 2 · 2.'
      },
      {
        id: 'pbq1-3',
        questionTypeBadge: 'Előjelszabály',
        question: 'Mennyi a (-3)² kifejezés pontos értéke?',
        options: ['+9', '-9', '+6', '-6'],
        correctAnswer: 0,
        explanation: 'A zárójel miatt az alap a -3. Mivel a kitevő 2 (páros), két negatív szám szorzata pozitív: (-3) · (-3) = +9.',
        hint: 'Zárójelben van a negatív szám: (-3) szorozva (-3)-mal.'
      },
      {
        id: 'pbq1-4',
        questionTypeBadge: 'Zárójel csapda',
        question: 'Mennyi a -3² kifejezés pontos értéke?',
        options: ['-9', '+9', '+6', '-6'],
        correctAnswer: 0,
        explanation: 'Zárójel hiányában a négyzetre emelés csak a 3-as számra vonatkozik, a negatív előjel a művelet előtt áll: -3² = -(3 · 3) = -9.',
        hint: 'Nincs zárójel! Először emelj négyzetre (3² = 9), majd tedd elé a mínusz előjelet!',
        figure: <SignRulesSvg size={200} />
      },
      {
        id: 'pbq1-5',
        questionTypeBadge: 'Előjelszabály',
        question: 'Mennyi a (-2)³ kifejezés pontos értéke?',
        options: ['-8', '+8', '-6', '+6'],
        correctAnswer: 0,
        explanation: 'A kitevő páratlan (3), így: (-2) · (-2) · (-2) = (+4) · (-2) = -8.',
        hint: 'Negatív alap páratlan kitevőn: (-2) · (-2) · (-2).'
      },
      {
        id: 'pbq1-6',
        questionTypeBadge: 'Speciális alap',
        question: 'Mennyi a (-1)¹⁰⁰ kifejezés értéke?',
        options: ['+1', '-1', '100', '-100'],
        correctAnswer: 0,
        explanation: 'A -1 bármely páros pozitív egész kitevőjű hatványa +1, mert a páros számú (-1)-esek kettesével szorozva +1-et adnak.',
        hint: 'A 100 páros szám. Mi történik páros kitevő esetén?'
      },
      {
        id: 'pbq1-10',
        questionTypeBadge: 'Definíció',
        question: 'Mivel egyenlő az a¹ kifejezés tetszőleges a ∈ ℝ szám esetén?',
        options: ['a', '1', '0', 'a²'],
        correctAnswer: 0,
        explanation: 'Megállapodás szerint bármely szám 1. hatványa önmaga: a¹ = a.',
        hint: 'Egyetlen tényezőből álló szorzat értéke.'
      },
      {
        id: 'pbq1-11',
        questionTypeBadge: 'Azonosság',
        question: 'Írd fel egyetlen hatványként a 2³ · 2⁴ szorzatot!',
        options: ['2⁷', '2¹²', '4⁷', '4¹²'],
        correctAnswer: 0,
        explanation: 'Azonos alapú hatványok szorzásánál az alapot a kitevők összegére emeljük: 2³ · 2⁴ = 2³⁺⁴ = 2⁷ (= 128).',
        hint: 'Azonos alap (2) esetén a kitevők (3 és 4) összeadódnak!',
        figure: <PowerIdentitiesSvg size={200} />
      },
      {
        id: 'pbq1-12',
        questionTypeBadge: 'Azonosság',
        question: 'Írd fel egyetlen hatványként a 3⁵ : 3² hányadost!',
        options: ['3³', '3⁷', '3¹⁰', '1³'],
        correctAnswer: 0,
        explanation: 'Azonos alapú hatványok osztásánál a kitevők kivonódnak: 3⁵ : 3² = 3⁵⁻² = 3³ (= 27).',
        hint: 'Azonos alap esetén az osztásnál a kitevőket kivonjuk egymásból: 5 − 2.'
      },
      {
        id: 'pbq1-15',
        questionTypeBadge: 'Összehasonlítás',
        question: 'Melyik szám a nagyobb: 2⁵ vagy 5²?',
        options: [
          'A 2⁵ nagyobb, mert 32 > 25',
          'Az 5² nagyobb, mert az alapja nagyobb',
          'Egyenlők, mert ugyanazok a számok szerepelnek bennük',
          'Nem lehet összehasonlítani őket'
        ],
        correctAnswer: 0,
        explanation: '2⁵ = 32 és 5² = 25. Mivel 32 > 25, a 2⁵ a nagyobb. Ez mutatja, hogy az alap és a kitevő nem cserélhető fel.',
        hint: 'Számold ki mindkét szám értékét külön-külön: 2 · 2 · 2 · 2 · 2 és 5 · 5!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Hatványazonosságok, összetett kifejezések és nagyságrendek',
    subtitle: 'Hatvány hatványozása, szorzat és hányados hatványa, azonos alapra hozás és nullák száma.',
    range: '1–10. feladat',
    focus: 'Azonosságok alkalmazása és számolási stratégiák',
    questions: [
      {
        id: 'pbq2-1',
        questionTypeBadge: 'Hatvány hatványozása',
        question: 'Írd fel egyetlen 2-es alapú hatványként a (2³)⁴ kifejezést!',
        options: ['2¹²', '2⁷', '2⁸¹', '2⁶⁴'],
        correctAnswer: 0,
        explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: (aⁿ)ᵐ = aⁿ·ᵐ. Így (2³)⁴ = 2³·⁴ = 2¹² = 4096.',
        hint: 'A zárójelben lévő 3-as kitevőt meg kell szorozni a külső 4-es kitevővel!',
        figure: <PowerIdentitiesSvg size={200} />
      },
      {
        id: 'pbq2-2',
        questionTypeBadge: 'Azonos alapra hozás',
        question: 'Hogyan írható fel a 4⁵ kifejezés a 2 egyetlen hatványaként?',
        options: ['2¹⁰', '2⁷', '2²⁵', '2²⁰'],
        correctAnswer: 0,
        explanation: 'Mivel 4 = 2², ezért 4⁵ = (2²)⁵ = 2²·⁵ = 2¹⁰ = 1024.',
        hint: 'Írd át a 4-es alapot 2²-re, majd alkalmazd a hatvány hatványozását!'
      },
      {
        id: 'pbq2-3',
        questionTypeBadge: 'Azonos alapra hozás',
        question: 'Írd fel a 3 hatványaként a 9³ · 27 szorzatot!',
        options: ['3⁹', '3⁸', '3¹¹', '3⁶'],
        correctAnswer: 0,
        explanation: '9³ = (3²)³ = 3⁶, és 27 = 3³. Összeszorozva: 3⁶ · 3³ = 3⁶⁺³ = 3⁹.',
        hint: '9 = 3² és 27 = 3³. Vond össze a kitevőket!'
      },
      {
        id: 'pbq2-5',
        questionTypeBadge: 'Nullák száma',
        question: 'Hány nullára végződik a 2⁸ · 5⁶ szorzat értéke számológép nélkül kiszámítva?',
        options: [
          '6 nullára',
          '8 nullára',
          '14 nullára',
          '2 nullára'
        ],
        correctAnswer: 0,
        explanation: '2⁸ · 5⁶ = 2² · (2⁶ · 5⁶) = 4 · 10⁶ = 4 000 000. Mivel 6 darab 10-es szorzó keletkezik, a szám pontosan 6 nullára végződik.',
        hint: 'Minden 10-eshez egy 2-es és egy 5-ös kell. Hány párt tudsz képezni 8 db kettesből és 6 db ötösből?',
        figure: <DistributivePowerSvg size={200} />
      },
      {
        id: 'pbq2-7',
        questionTypeBadge: 'Tört egyszerűsítése',
        question: 'Mennyi a (2⁷ · 2⁵) : 2⁹ kifejezés értéke?',
        options: ['8', '16', '4', '2'],
        correctAnswer: 0,
        explanation: 'Számláló: 2⁷ · 2⁵ = 2¹². Osztás a 2⁹-cel: 2¹²⁻⁹ = 2³ = 8.',
        hint: 'Először add össze a kitevőket felül (7 + 5), majd vond ki belőle az alsó kitevőt (9)!'
      },
      {
        id: 'pbq2-11',
        questionTypeBadge: 'Tört hatványozása',
        question: 'Mennyi a (2/3)³ kifejezés értéke?',
        options: ['8/27', '6/9', '8/9', '2/27'],
        correctAnswer: 0,
        explanation: '(2/3)³ = 2³ / 3³ = 8 / 27.',
        hint: 'A számlálót és a nevezőt is emeld a 3. hatványra: 2³ és 3³!'
      },
      {
        id: 'pbq2-12',
        questionTypeBadge: 'Azonos kitevők',
        question: 'Mennyi a 6⁵ : 3⁵ kifejezés pontos értéke számológép nélkül?',
        options: ['32', '2', '64', '16'],
        correctAnswer: 0,
        explanation: 'Mivel a kitevők megegyeznek: 6⁵ : 3⁵ = (6 : 3)⁵ = 2⁵ = 32.',
        hint: 'Alkalmazd a hányados hatványozásának azonosságát fordítva: aⁿ : bⁿ = (a:b)ⁿ!'
      },
      {
        id: 'pbq2-17',
        questionTypeBadge: 'Együtthatós hatvány',
        question: 'Mennyi a (2x³)³ kifejezés legegyszerűbb alakja?',
        options: ['8x⁹', '2x⁹', '6x⁶', '8x⁶'],
        correctAnswer: 0,
        explanation: '(2x³)³ = 2³ · (x³)³ = 8 · x³·³ = 8x⁹. Sokan elfelejtik a 2-es együtthatót is köbre emelni!',
        hint: 'A 2-t is a 3. hatványra kell emelni (2³ = 8), és az x³-t is: x³·³ = x⁹.'
      },
      {
        id: 'pbq2-18',
        questionTypeBadge: 'Együtthatós hatvány',
        question: 'Mennyi a (-3a²)² kifejezés felbontott alakja?',
        options: ['9a⁴', '-9a⁴', '6a⁴', '-6a⁴'],
        correctAnswer: 0,
        explanation: '(-3a²)² = (-3)² · (a²)² = 9 · a⁴ = 9a⁴.',
        hint: '(-3)² = +9, és (a²)² = a⁴.'
      },
      {
        id: 'pbq2-20',
        questionTypeBadge: 'Összehasonlítás',
        question: 'Melyik szám a nagyobb: 2³⁰ vagy 3²⁰?',
        options: [
          'A 3²⁰ nagyobb, mert (3²)¹⁰ = 9¹⁰ > 8¹⁰ = (2³)¹⁰',
          'A 2³⁰ nagyobb, mert a kitevője 30 > 20',
          'Egyenlőek, mert 2 · 30 = 60 és 3 · 20 = 60',
          'Nem dönthető el számológép nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Hozzuk közös 10-es kitevőre: 2³⁰ = (2³)¹⁰ = 8¹⁰. Másrészt 3²⁰ = (3²)¹⁰ = 9¹⁰. Mivel 9 > 8, ezért 9¹⁰ > 8¹⁰, tehát 3²⁰ a nagyobb!',
        hint: 'Írd fel mindkét számot 10-es külső kitevővel: 2³⁰ = (2³)¹⁰ és 3²⁰ = (3²)¹⁰!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Versenyfeladatok, algebrai levezetések és logikai igazolások',
    subtitle: 'Tankönyvi összetett feladatok, emeletes hatványok, prímfelbontás és oszthatóság.',
    range: '1–10. feladat',
    focus: 'Összetett törtek, prímhatványok és matematikai bizonyítások',
    questions: [
      {
        id: 'pbq3-1',
        questionTypeBadge: 'Tankönyvi feladat',
        question: 'Számítsd ki számológép nélkül a (512 · 27 · 21) : (96 · 45 · 42) kifejezés pontos törtértékét prímhatványok segítségével!',
        options: ['8/5', '16/15', '32/15', '4/3'],
        correctAnswer: 0,
        explanation: 'Bontsuk fel: 512/96 = 16/3; 27/45 = 3/5; 21/42 = 1/2. Összeszorozva: (16/3) · (3/5) · (1/2) = 16 / 10 = 8/5. Lenyűgözően egyszerű számológép nélkül!',
        hint: 'Egyszerűsítsd a tényezőket páronként: 512/96 = 16/3, 27/45 = 3/5, 21/42 = 1/2!'
      },
      {
        id: 'pbq3-3',
        questionTypeBadge: 'Összetett betűs kifejezés',
        question: 'Hozd a legegyszerűbb alakra: [(a² b³)² · (-a b²)³] : (a⁷ b¹⁰)?',
        options: ['-b²', '+b²', '-a b²', '+a b'],
        correctAnswer: 0,
        explanation: 'Számláló: a⁴ b⁶ · (-a³ b⁶) = -a⁷ b¹². Nevező: a⁷ b¹⁰. Osztás után: -a⁰ b² = -b².',
        hint: 'Ügyelj a (-ab²)³ negatív előjelére, és add össze a megfelelő kitevőket!'
      },
      {
        id: 'pbq3-5',
        questionTypeBadge: 'Emeletes hatvány',
        question: 'Mi a pontos különbség a 2^(3²) és a (2³)² értékek között?',
        options: [
          '448 (mert 512 − 64 = 448)',
          '0 (ugyanaz az értékük)',
          '128',
          '256'
        ],
        correctAnswer: 0,
        explanation: '2^(3²) = 2⁹ = 512 (felső kitevő kiszámítása először: 3² = 9). Másrészt (2³)² = 2³·² = 2⁶ = 64. A különbségük: 512 − 64 = 448.',
        hint: 'A zárójel nélküli 2^(3²) esetén először 3² = 9-et számolunk. A zárójelesnél 3 · 2 = 6.'
      },
      {
        id: 'pbq3-6',
        questionTypeBadge: 'Összetett tört',
        question: 'Hozd legegyszerűbb alakra a (2a³ b / 3c²)³ · (9c⁵ / 4a⁷ b²) kifejezést (a, b, c ≠ 0)!',
        options: ['(2a² b) / (3c)', '(2a b c) / 3', '(4a² b) / (9c)', '(2b) / (3a c)'],
        correctAnswer: 0,
        explanation: 'Együtthatók: (8 · 9) / (27 · 4) = 2/3. Változók: a⁹ / a⁷ = a², b³ / b² = b, c⁵ / c⁶ = 1/c. Így a végeredmény (2a² b) / (3c).',
        hint: 'Emeld köbre a törtet tagonként: 2³=8, a⁹, b³, 3³=27, c⁶, majd egyszerűsíts!'
      },
      {
        id: 'pbq3-14',
        questionTypeBadge: 'Kitevős egyenlet',
        question: 'Oldd meg a pozitív egész számok halmazán a 2ˣ · 4ˣ · 8ˣ = 64⁴ egyenletet! Mennyi x értéke?',
        options: ['4', '3', '6', '2'],
        correctAnswer: 0,
        explanation: 'Írjuk át mindent 2-es alapra: 2ˣ · (2²)ˣ · (2³)ˣ = 2ˣ · 2²ˣ · 2³ˣ = 2^(x + 2x + 3x) = 2⁶ˣ. Jobb oldal: 64⁴ = (2⁶)⁴ = 2²⁴. Tehát 6x = 24 ⟹ x = 4.',
        hint: '4 = 2², 8 = 2³, 64 = 2⁶. Írd fel mindkét oldalt 2 hatványaként!'
      },
      {
        id: 'pbq3-20',
        questionTypeBadge: 'Verseny összehasonlítás',
        question: 'Melyik a nagyobb: 2¹⁰⁰ vagy 3⁷⁵?',
        options: [
          'A 3⁷⁵ a nagyobb, mert (3³)²⁵ = 27²⁵ > 16²⁵ = (2⁴)²⁵',
          'A 2¹⁰⁰ a nagyobb, mert a kitevője 100 > 75',
          'Egyenlők',
          'Nem hasonlíthatóak össze közös kitevő nélkül'
        ],
        correctAnswer: 0,
        explanation: 'A 100 és 75 legnagyobb közös osztója 25. Így 2¹⁰⁰ = (2⁴)²⁵ = 16²⁵. Másrészt 3⁷⁵ = (3³)²⁵ = 27²⁵. Mivel 27 > 16, ezért 27²⁵ > 16²⁵, vagyis 3⁷⁵ a nagyobb.',
        hint: 'Írd át mindkettőt 25-ös külső kitevőre: 100 = 4 · 25 és 75 = 3 · 25!'
      },
      {
        id: 'pbq3-22',
        questionTypeBadge: 'Helyettesítéses feladat',
        question: 'Ha tudjuk, hogy 2ᵃ = 3, akkor mennyi a 8ᵃ kifejezés pontos értéke?',
        options: ['27', '9', '24', '18'],
        correctAnswer: 0,
        explanation: 'Mivel 8 = 2³, ezért 8ᵃ = (2³)ᵃ = (2ᵃ)³ = 3³ = 27.',
        hint: '8 = 2³, így 8ᵃ = (2ᵃ)³.'
      },
      {
        id: 'pbq3-24',
        questionTypeBadge: 'Kiemelés',
        question: 'Számítsd ki a (2²⁰²⁶ − 2²⁰²⁴) : 2²⁰²⁴ kifejezés pontos értékét!',
        options: ['3', '2', '4', '2024'],
        correctAnswer: 0,
        explanation: 'Emeljük ki a számlálóból a kisebb hatványt, 2²⁰²⁴-et: 2²⁰²⁴ · (2² − 1). Ezt elosztva 2²⁰²⁴-gyel: 2² − 1 = 4 − 1 = 3.',
        hint: 'Emelj ki 2²⁰²⁴-et a számlálóban: 2²⁰²⁴ · (2² − 1).'
      },
      {
        id: 'pbq3-28',
        questionTypeBadge: 'Számjegyek száma',
        question: 'Hány számjegyből áll a 2¹⁸ · 5¹⁵ szorzat értéke a tízes számrendszerben felírva?',
        options: ['16 számjegyből', '15 számjegyből', '18 számjegyből', '33 számjegyből'],
        correctAnswer: 0,
        explanation: '2¹⁸ · 5¹⁵ = 2³ · (2¹⁵ · 5¹⁵) = 8 · 10¹⁵. Ez egy 8-as számjegy, amelyet 15 darab nulla követ. Összesen 1 + 15 = 16 számjegyből áll.',
        hint: '2¹⁸ = 2³ · 2¹⁵ = 8 · 2¹⁵. Mennyi 8 · 10¹⁵ számjegyeinek száma?'
      },
      {
        id: 'pbq3-30',
        questionTypeBadge: 'Gyakorlati modell',
        question: 'Egy baktériumtenyészet száma minden órában megduplázódik. Ha kezdetben 100 baktérium volt, hány baktérium lesz pontosan 10 óra múlva?',
        options: ['102 400', '10 000', '20 480', '1 024 000'],
        correctAnswer: 0,
        explanation: 'A folyamat képlete: N = N₀ · 2ⁿ = 100 · 2¹⁰. Mivel 2¹⁰ = 1024, az eredmény: 100 · 1024 = 102 400 baktérium.',
        hint: '10 óra alatt tízszer duplázódik meg: 100 · 2¹⁰.'
      }
    ]
  }
};

export const PowerBasicsQuiz: React.FC<PowerBasicsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode
}) => {
  return (
    <QuizTemplate
      title="1. A hatványozás (ismétlés) – Gyakorló Kvíz"
      subtitle="Mélyítsd el tudásodat a hatványozás alapfogalmairól, előjelszabályairól és azonosságairól 90 interaktív feladaton keresztül!"
      badge="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      topicBadge="10. OSZTÁLY • III. HATVÁNYOZÁS ÉS A NÉGYZETGYÖK"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Hatványozás Segédlet • A hatványozás alapjai"
      initialGameMode={initialGameMode}
      matcherComponent={
        <PowerBasicsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PowerBasicsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

