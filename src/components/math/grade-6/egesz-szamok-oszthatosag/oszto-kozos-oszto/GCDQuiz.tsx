import React, { useState } from 'react';
import {
  QuizTemplate,
  QuizQuestion,
  CheatSheetCard,
  CustomGameMode,
} from '../QuizTemplate';
import { GCDMatcher } from './GCDMatcher';
import { GCDSorter } from './GCDSorter';
import { Target, Layers, Zap, Scissors, ShieldCheck, HelpCircle } from 'lucide-react';

interface GCDQuizProps {
  onBack?: () => void;
}

const CHEAT_SHEET_CARDS: CheatSheetCard[] = [
  {
    id: 'cs-gcd-definition',
    title: 'Az LNKO fogalma és jelölése',
    icon: <Target className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>LNKO:</strong> A legnagyobb pozitív egész szám, amellyel mindkét szám maradék nélkül osztható.</div>
        <div>• Jelölése: <strong>(a, b)</strong> vagy <strong>LNKO(a, b)</strong>.</div>
        <div className="text-[11px] text-slate-500">Pl. (12, 18) = 6, mert 6 a legnagyobb közös osztó.</div>
      </div>
    ),
  },
  {
    id: 'cs-prime-factor-rule',
    title: 'Prímtényezős meghatározás',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p>1. Bontsd fel a számokat prímtényezőikre!</p>
        <p>2. Az LNKO-ba <strong>CSAK A KÖZÖS prímtényezőket vedd be a LEGKISEBB kitevőjükön</strong>!</p>
        <div className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[11px] font-mono">
          24 = 2³ · 3, 36 = 2² · 3² ⟹ (24, 36) = 2² · 3 = 12
        </div>
      </div>
    ),
  },
  {
    id: 'cs-coprime-definition',
    title: 'Relatív prímek fogalma',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Két szám <strong>relatív prím</strong>, ha a legnagyobb közös osztójuk 1, vagyis nincs 1-nél nagyobb közös osztójuk:</p>
        <div className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
          (a, b) = 1
        </div>
        <div className="text-[11px] text-slate-500">Pl. (8, 9) = 1, (15, 28) = 1, (7, 11) = 1.</div>
      </div>
    ),
  },
  {
    id: 'cs-divisor-case',
    title: 'Ha az egyik osztója a másiknak',
    icon: <Layers className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha a osztója b-nek (a | b), akkor az LNKO mindig a <strong>kisebbik szám (a)</strong>:</p>
        <div className="font-mono text-indigo-700 dark:text-indigo-300 font-bold">
          (6, 18) = 6 | (5, 20) = 5 | (12, 48) = 12
        </div>
      </div>
    ),
  },
  {
    id: 'cs-euclidean-algo',
    title: 'Euklideszi algoritmus',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Maradékos osztásokat végzünk: LNKO(a, b) = LNKO(b, a mod b).</p>
        <div className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[11px] font-mono">
          84 = 2 · 36 + 12 ⟹ 36 = 3 · 12 + 0 ⟹ LNKO = 12
        </div>
      </div>
    ),
  },
  {
    id: 'cs-word-problems',
    title: 'Gyakorlati szétosztási feladatok',
    icon: <Scissors className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha több dolgot kell a <strong>lehető legtöbb egyenlő részre vagy csomagra szétosztani</strong> maradék nélkül, a válasz az LNKO!</p>
        <div className="text-[11px] text-slate-500">Pl. 48 csoki és 72 cukor ⟹ (48, 72) = 24 csomag.</div>
      </div>
    ),
  },
];

const EASY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'e1',
    question: 'Mit jelent a Legnagyobb Közös Osztó (LNKO) fogalma?',
    options: [
      'A legnagyobb olyan pozitív egész számot, amely mindkét számnak osztója.',
      'A legkisebb olyan számot, amely mindkét számnak többszöröse.',
      'A két szám összegét elosztva kettővel.',
      'A két szám szorzatát.',
    ],
    correctAnswer: 'A legnagyobb olyan pozitív egész számot, amely mindkét számnak osztója.',
    explanation: 'A Legnagyobb Közös Osztó (a, b) az a legnagyobb pozitív egész szám, amellyel mind az a, mind a b szám maradék nélkül osztható.',
    breakdown: [
      { label: 'Definíció', value: 'Legnagyobb közös maradék nélküli osztó' },
      { label: 'Jelölés', value: '(a, b) vagy LNKO(a, b)' },
    ],
  },
  {
    id: 'e2',
    question: 'Mennyi a 12 és 18 legnagyobb közös osztója (12, 18)?',
    options: ['6', '3', '2', '36'],
    correctAnswer: '6',
    explanation: '12 osztói: 1, 2, 3, 4, 6, 12 | 18 osztói: 1, 2, 3, 6, 9, 18. A közös osztók: 1, 2, 3, 6. A legnagyobb a 6.',
    breakdown: [
      { label: '12 osztói', value: '1, 2, 3, 4, 6, 12' },
      { label: '18 osztói', value: '1, 2, 3, 6, 9, 18' },
      { label: 'LNKO', value: '(12, 18) = 6' },
    ],
  },
  {
    id: 'e3',
    question: 'Mennyi a 8 és 12 legnagyobb közös osztója (8, 12)?',
    options: ['4', '2', '8', '24'],
    correctAnswer: '4',
    explanation: '8 = 2³, 12 = 2² · 3. A közös prímtényező a 2, legkisebb hatványa 2² = 4.',
    breakdown: [
      { label: '8 = 2³', value: '12 = 2² · 3' },
      { label: 'LNKO', value: '2² = 4' },
    ],
  },
  {
    id: 'e4',
    question: 'Mennyi a 7 és 14 legnagyobb közös osztója (7, 14)?',
    options: ['7', '1', '14', '2'],
    correctAnswer: '7',
    explanation: 'Mivel a 7 osztója a 14-nek, a legnagyobb közös osztójuk maga a kisebb szám: (7, 14) = 7.',
    breakdown: [
      { label: 'Kapcsolat', value: '7 | 14' },
      { label: 'Szabály', value: 'Az LNKO a kisebb szám (7)' },
    ],
  },
  {
    id: 'e5',
    question: 'Mikor mondjuk két egész számra, hogy relatív prímek?',
    options: [
      'Ha a legnagyobb közös osztójuk 1.',
      'Ha mindkét szám prímszám.',
      'Ha a szorzatuk páratlan.',
      'Ha mindkét szám negatív.',
    ],
    correctAnswer: 'Ha a legnagyobb közös osztójuk 1.',
    explanation: 'Két szám akkor relatív prím, ha nincs 1-nél nagyobb közös osztójuk, vagyis LNKO-juk 1. Pl. a 8 és 9 összetett számok, de relatív prímek, mert (8, 9) = 1.',
    breakdown: [
      { label: 'Feltétel', value: 'LNKO(a, b) = 1' },
      { label: 'Példa', value: '(8, 9) = 1' },
    ],
  },
  {
    id: 'e6',
    question: 'Mennyi a 15 és 25 legnagyobb közös osztója (15, 25)?',
    options: ['5', '3', '15', '75'],
    correctAnswer: '5',
    explanation: '15 = 3 · 5, 25 = 5². A közös prímtényező az 5, legkisebb kitevője 1 ⟹ (15, 25) = 5.',
    breakdown: [
      { label: '15 = 3 · 5', value: '25 = 5²' },
      { label: 'LNKO', value: '5¹ = 5' },
    ],
  },
  {
    id: 'e7',
    question: 'Mennyi a 10 és 20 legnagyobb közös osztója (10, 20)?',
    options: ['10', '5', '2', '20'],
    correctAnswer: '10',
    explanation: 'Mivel a 10 osztója a 20-nak, (10, 20) = 10.',
    breakdown: [
      { label: 'Kapcsolat', value: '10 | 20 ⟹ LNKO = 10' },
    ],
  },
  {
    id: 'e8',
    question: 'Mennyi a 8 és 9 legnagyobb közös osztója (8, 9)?',
    options: ['1', '2', '3', '72'],
    correctAnswer: '1',
    explanation: '8 = 2³, 9 = 3². Nincs közös prímtényezőjük, így a legnagyobb közös osztójuk 1 (relatív prímek).',
    breakdown: [
      { label: '8 = 2³', value: '9 = 3²' },
      { label: 'Közös prím', value: 'Nincs ⟹ (8, 9) = 1' },
    ],
  },
  {
    id: 'e9',
    question: 'Mennyi a 14 és 21 legnagyobb közös osztója (14, 21)?',
    options: ['7', '2', '3', '42'],
    correctAnswer: '7',
    explanation: '14 = 2 · 7, 21 = 3 · 7. A közös prímtényező a 7 ⟹ (14, 21) = 7.',
    breakdown: [
      { label: '14 = 2 · 7', value: '21 = 3 · 7' },
      { label: 'LNKO', value: '7' },
    ],
  },
  {
    id: 'e10',
    question: 'Mennyi a 16 és 24 legnagyobb közös osztója (16, 24)?',
    options: ['8', '4', '2', '48'],
    correctAnswer: '8',
    explanation: '16 = 2⁴, 24 = 2³ · 3. A közös prím a 2, legkisebb hatványa 2³ = 8.',
    breakdown: [
      { label: '16 = 2⁴', value: '24 = 2³ · 3' },
      { label: 'LNKO', value: '2³ = 8' },
    ],
  },
];

const MEDIUM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'm1',
    question: 'Hogyan képezzük két szám LNKO-ját a prímtényezős felbontásból?',
    options: [
      'Csak a közös prímtényezőket szorozzuk össze a legkisebb kitevőjükön.',
      'Minden előforduló prímtényezőt a legnagyobb kitevőjükön szorzunk össze.',
      'A két szám prímtényezőinek szorzatát elosztjuk kettővel.',
      'Összeadjuk a közös prímtényezőket.',
    ],
    correctAnswer: 'Csak a közös prímtényezőket szorozzuk össze a legkisebb kitevőjükön.',
    explanation: 'Az LNKO aranyszabálya: Csak azokat a prímeket vesszük figyelembe, amelyek mindkét felbontásban szerepelnek, és a legkisebb előforduló kitevőjükkel vesszük be őket a szorzatba.',
    breakdown: [
      { label: 'Melyik prímek?', value: 'Csak a közös prímtényezők' },
      { label: 'Milyen kitevővel?', value: 'A legkisebb kitevővel: min(eA, eB)' },
    ],
  },
  {
    id: 'm2',
    question: 'Mennyi a 24 és 36 legnagyobb közös osztója (24, 36)?',
    options: ['12', '6', '18', '72'],
    correctAnswer: '12',
    explanation: '24 = 2³ · 3¹, 36 = 2² · 3². Az LNKO = 2² · 3¹ = 4 · 3 = 12.',
    breakdown: [
      { label: '24 felbontása', value: '2³ · 3¹' },
      { label: '36 felbontása', value: '2² · 3²' },
      { label: 'LNKO kiválasztás', value: '2² · 3¹ = 4 · 3 = 12' },
    ],
  },
  {
    id: 'm3',
    question: 'Mennyi a 48 és 72 legnagyobb közös osztója (48, 72)?',
    options: ['24', '12', '16', '144'],
    correctAnswer: '24',
    explanation: '48 = 2⁴ · 3, 72 = 2³ · 3². Az LNKO = 2³ · 3¹ = 8 · 3 = 24.',
    breakdown: [
      { label: '48 = 2⁴ · 3', value: '72 = 2³ · 3²' },
      { label: 'LNKO', value: '2³ · 3 = 24' },
    ],
  },
  {
    id: 'm4',
    question: 'Mennyi a 30 és 45 legnagyobb közös osztója (30, 45)?',
    options: ['15', '5', '3', '90'],
    correctAnswer: '15',
    explanation: '30 = 2 · 3 · 5, 45 = 3² · 5. Az LNKO = 3¹ · 5¹ = 15.',
    breakdown: [
      { label: '30 = 2 · 3 · 5', value: '45 = 3² · 5' },
      { label: 'LNKO', value: '3 · 5 = 15' },
    ],
  },
  {
    id: 'm5',
    question: 'Mennyi a 28 és 70 legnagyobb közös osztója (28, 70)?',
    options: ['14', '7', '2', '28'],
    correctAnswer: '14',
    explanation: '28 = 2² · 7, 70 = 2 · 5 · 7. Az LNKO = 2¹ · 7¹ = 14.',
    breakdown: [
      { label: '28 = 2² · 7', value: '70 = 2 · 5 · 7' },
      { label: 'LNKO', value: '2 · 7 = 14' },
    ],
  },
  {
    id: 'm6',
    question: 'Mennyi a három szám: 12, 18 és 24 legnagyobb közös osztója (12, 18, 24)?',
    options: ['6', '3', '12', '2'],
    correctAnswer: '6',
    explanation: '12 = 2² · 3, 18 = 2 · 3², 24 = 2³ · 3. A mindháromban közös prímek: 2¹ és 3¹ ⟹ LNKO = 2 · 3 = 6.',
    breakdown: [
      { label: 'Felbontások', value: '12=2²·3, 18=2·3², 24=2³·3' },
      { label: 'Közös minimumok', value: '2¹ · 3¹ = 6' },
    ],
  },
  {
    id: 'm7',
    question: 'Melyik számpár alkot relatív prím párt?',
    options: ['15 és 28', '14 és 21', '18 és 24', '15 és 35'],
    correctAnswer: '15 és 28',
    explanation: '15 = 3 · 5, 28 = 2² · 7. Nincs közös prímtényezőjük, így (15, 28) = 1. A többi párban van közös osztó (7, 6, 5).',
    breakdown: [
      { label: '15 = 3 · 5', value: '28 = 2² · 7' },
      { label: 'Közös prím', value: 'Nincs ⟹ LNKO = 1 (relatív prímek)' },
    ],
  },
  {
    id: 'm8',
    question: 'Mennyi a 36 és 60 legnagyobb közös osztója (36, 60)?',
    options: ['12', '6', '18', '4'],
    correctAnswer: '12',
    explanation: '36 = 2² · 3², 60 = 2² · 3 · 5. Az LNKO = 2² · 3¹ = 4 · 3 = 12.',
    breakdown: [
      { label: '36 = 2² · 3²', value: '60 = 2² · 3 · 5' },
      { label: 'LNKO', value: '2² · 3 = 12' },
    ],
  },
  {
    id: 'm9',
    question: 'Mennyi a 40 és 56 legnagyobb közös osztója (40, 56)?',
    options: ['8', '4', '2', '14'],
    correctAnswer: '8',
    explanation: '40 = 2³ · 5, 56 = 2³ · 7. Az LNKO = 2³ = 8.',
    breakdown: [
      { label: '40 = 2³ · 5', value: '56 = 2³ · 7' },
      { label: 'LNKO', value: '2³ = 8' },
    ],
  },
  {
    id: 'm10',
    question: 'Egyszerűsítsd a 48/72 törtet a lehető legegyszerűbb alakra az LNKO segítségével!',
    options: ['2/3', '4/6', '6/9', '12/18'],
    correctAnswer: '2/3',
    explanation: '(48, 72) = 24. Elosztva a számlálót és a nevezőt is 24-gyel: 48 : 24 = 2, 72 : 24 = 3 ⟹ 2/3.',
    breakdown: [
      { label: 'LNKO(48, 72)', value: '24' },
      { label: 'Egyszerűsítés', value: '48:24 / 72:24 = 2/3' },
    ],
  },
];

const HARD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'h1',
    question: 'Adott két szám prímfelbontása: A = 2³ · 3² · 5 · 11 és B = 2² · 3³ · 5² · 7. Mennyi az LNKO(A, B)?',
    options: [
      '2² · 3² · 5 = 180',
      '2³ · 3³ · 5² = 5400',
      '2² · 3² = 36',
      '2³ · 3³ · 5² · 7 · 11',
    ],
    correctAnswer: '2² · 3² · 5 = 180',
    explanation: 'Csak a közös prímeket (2, 3, 5) vesszük a legkisebb kitevőjükkel: 2² (B-ből), 3² (A-ból), 5¹ (A-ból). 7 és 11 nem közös. LNKO = 2² · 3² · 5 = 4 · 9 · 5 = 180.',
    breakdown: [
      { label: 'Közös prímek', value: '2, 3, 5' },
      { label: 'Min kitevők', value: '2², 3², 5¹' },
      { label: 'LNKO', value: '4 · 9 · 5 = 180' },
    ],
  },
  {
    id: 'h2',
    question: 'Van 48 tábla csokoládénk és 72 zacskó cukorkánk. Legfeljebb hány teljesen egyforma mikuláscsomagot készíthetünk úgy, hogy semmi se maradjon ki?',
    options: ['24 csomagot', '12 csomagot', '48 csomagot', '16 csomagot'],
    correctAnswer: '24 csomagot',
    explanation: 'A csomagok maximális száma az LNKO(48, 72) = 24. Minden csomagba 48 : 24 = 2 tábla csoki és 72 : 24 = 3 zacskó cukorka kerül.',
    breakdown: [
      { label: 'LNKO(48, 72)', value: '24' },
      { label: 'Csomagonként', value: '2 csoki + 3 cukor' },
    ],
  },
  {
    id: 'h3',
    question: 'Két szám szorzata a · b = 840, és az LKKT-jük [a, b] = 140. Mennyi a legnagyobb közös osztójuk (a, b)?',
    options: ['6', '12', '14', '7'],
    correctAnswer: '6',
    explanation: 'Az a · b = (a, b) · [a, b] tétel alapján: (a, b) = (a · b) / [a, b] = 840 / 140 = 6.',
    breakdown: [
      { label: 'Tétel', value: 'a · b = (a, b) · [a, b]' },
      { label: 'Számítás', value: '(a, b) = 840 / 140 = 6' },
    ],
  },
  {
    id: 'h4',
    question: 'Hogyan határozza meg az Euklideszi algoritmus a 84 és 36 legnagyobb közös osztóját?',
    options: [
      '84 = 2 · 36 + 12, majd 36 = 3 · 12 + 0 ⟹ LNKO = 12',
      '84 - 36 = 48, 48 - 36 = 12 ⟹ LNKO = 6',
      '84 : 36 = 2 ⟹ LNKO = 2',
      '84 + 36 = 120 ⟹ LNKO = 12',
    ],
    correctAnswer: '84 = 2 · 36 + 12, majd 36 = 3 · 12 + 0 ⟹ LNKO = 12',
    explanation: 'Az Euklideszi algoritmus lépései: 84 : 36 = 2, maradék 12. Ezután 36 : 12 = 3, maradék 0. Az utolsó nem nulla maradék a 12, tehát az LNKO = 12.',
    breakdown: [
      { label: '1. lépés', value: '84 = 2 · 36 + 12' },
      { label: '2. lépés', value: '36 = 3 · 12 + 0' },
      { label: 'Utolsó nem nulla maradék', value: '12' },
    ],
  },
  {
    id: 'h5',
    question: 'Egy 60 cm széles és 84 cm hosszú téglalap alakú lapot szeretnénk a lehető legnagyobb egyforma négyzetekre vágni hulladék nélkül. Mekkora legyen a négyzetek oldala?',
    options: ['12 cm', '6 cm', '4 cm', '14 cm'],
    correctAnswer: '12 cm',
    explanation: 'A négyzet oldalának osztania kell a 60-at és a 84-et is. A lehető legnagyobb négyzet oldala az LNKO(60, 84) = 12 cm. (A lapból 5 × 7 = 35 db négyzet lesz).',
    breakdown: [
      { label: 'LNKO(60, 84)', value: '12 cm' },
      { label: 'Négyzetek száma', value: '(60:12) · (84:12) = 5 · 7 = 35 db' },
    ],
  },
  {
    id: 'h6',
    question: 'Mennyi a három szám: 24, 35 és 77 legnagyobb közös osztója (24, 35, 77)?',
    options: ['1', '7', '5', '12'],
    correctAnswer: '1',
    explanation: '24 = 2³ · 3, 35 = 5 · 7, 77 = 7 · 11. Bár 35-nek és 77-nek van közös osztója (7), a 24-ben ez nincs meg. Nincs mindhárom számban közös 1-nél nagyobb prím, így (24, 35, 77) = 1.',
    breakdown: [
      { label: '24 = 2³ · 3', value: '35 = 5 · 7, 77 = 7 · 11' },
      { label: 'Közös prím mindháromban', value: 'Nincs ⟹ LNKO = 1' },
    ],
  },
  {
    id: 'h7',
    question: 'Tudjuk, hogy (a, b) = 12 és [a, b] = 72. Melyik lehet az a és b számpár értéke?',
    options: ['24 és 36', '12 és 72', 'Mindkettő lehetséges', 'Csak a 12 és 36'],
    correctAnswer: 'Mindkettő lehetséges',
    explanation: 'a · b = 12 · 72 = 864. Lehetséges párok: 1) a=12, b=72 ⟹ (12,72)=12, [12,72]=72. 2) a=24, b=36 ⟹ (24,36)=12, [24,36]=72. Mindkét pár helyes!',
    breakdown: [
      { label: '1. számpár', value: '(12, 72) = 12 és [12, 72] = 72' },
      { label: '2. számpár', value: '(24, 36) = 12 és [24, 36] = 72' },
      { label: 'Következtetés', value: 'Több megoldás is létezik' },
    ],
  },
  {
    id: 'h8',
    question: 'Hány pozitív közös osztója van a 36 és 60 számoknak?',
    options: ['6 db (1, 2, 3, 4, 6, 12)', '4 db', '8 db', '12 db'],
    correctAnswer: '6 db (1, 2, 3, 4, 6, 12)',
    explanation: 'A közös osztók pontosan a legnagyobb közös osztó (12) osztói! 12 osztói: 1, 2, 3, 4, 6, 12, vagyis összesen 6 darab közös osztójuk van.',
    breakdown: [
      { label: 'LNKO(36, 60)', value: '12' },
      { label: '12 osztói', value: '1, 2, 3, 4, 6, 12 (6 db)' },
    ],
  },
  {
    id: 'h9',
    question: 'Ha n tetszőleges pozitív egész szám, mennyi a két szomszédos szám: n és n+1 legnagyobb közös osztója (n, n+1)?',
    options: ['Mindig 1 (két szomszédos egész szám mindig relatív prím).', 'Mindig n.', 'Mindig 2.', 'Attól függ, hogy n páros-e.'],
    correctAnswer: 'Mindig 1 (két szomszédos egész szám mindig relatív prím).',
    explanation: 'Ha d osztója n-nek és n+1-nek is, akkor osztója a különbségüknek: (n+1) - n = 1. Mivel 1-nek csak az 1 az osztója, ezért (n, n+1) = 1 mindig.',
    breakdown: [
      { label: 'Különbség elv', value: 'd | n és d | (n+1) ⟹ d | 1' },
      { label: 'Eredmény', value: '(n, n+1) = 1 minden n-re' },
    ],
  },
  {
    id: 'h10',
    question: 'Melyik tört NEM egyszerűsíthető tovább (vagyis a számláló és nevező relatív prímek)?',
    options: ['14/33', '15/33', '21/35', '22/33'],
    correctAnswer: '14/33',
    explanation: '14 = 2 · 7, 33 = 3 · 11. (14, 33) = 1, így 14/33 tovább nem egyszerűsíthető. 15/33 osztója 3, 21/35 osztója 7, 22/33 osztója 11.',
    breakdown: [
      { label: '14 = 2 · 7', value: '33 = 3 · 11' },
      { label: 'LNKO(14, 33)', value: '1 ⟹ Tovább nem egyszerűsíthető' },
    ],
  },
];

export function GCDQuiz({ onBack }: GCDQuizProps) {
  const [activeCustomGame, setActiveCustomGame] = useState<'matcher' | 'sorter' | null>(null);

  if (activeCustomGame === 'matcher') {
    return <GCDMatcher onBack={() => setActiveCustomGame(null)} />;
  }

  if (activeCustomGame === 'sorter') {
    return <GCDSorter onBack={() => setActiveCustomGame(null)} />;
  }

  const customGameModes: CustomGameMode[] = [
    {
      id: 'matcher',
      title: 'Kártyapárosító Játék',
      description: 'Párosítsd össze a számpárokat, prímfelbontásokat és az LNKO-t 3 szinten!',
      badgeText: '8 Pár / Szint',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      onClick: () => setActiveCustomGame('matcher'),
    },
    {
      id: 'sorter',
      title: 'Csoportosító Játék',
      description: 'Rendezd a számpárokat és törteket LNKO kapcsolataik alapján!',
      badgeText: '10 Elem / Szint',
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      onClick: () => setActiveCustomGame('sorter'),
    },
  ];

  return (
    <QuizTemplate
      title="Osztó, LNKO Kvíz"
      description="Gyakorold a közös osztókat, a Legnagyobb Közös Osztó meghatározását, a relatív prímeket és a szöveges feladatokat 3 nehézségi szinten!"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="indigo"
      easyQuestions={EASY_QUESTIONS}
      mediumQuestions={MEDIUM_QUESTIONS}
      hardQuestions={HARD_QUESTIONS}
      cheatSheetCards={CHEAT_SHEET_CARDS}
      customGameModes={customGameModes}
      onBack={onBack}
    />
  );
}
