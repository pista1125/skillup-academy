import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { RoundingMatcher } from './RoundingMatcher';
import { RoundingSorter } from './RoundingSorter';

export interface RoundingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // =======================================================
  // --- 1. SZINT: KÖNNYŰ (Kerekítés a legközelebbi tízesre) ---
  // =======================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Kerekítsd a 43-at a legközelebbi tízesre!',
    highlightValue: '43 ≈ ? (tízesre)',
    questionTypeBadge: 'Kerekítés tízesre',
    options: ['40', '50', '45', '44'],
    correctAnswer: '40',
    explanation: 'A döntő egyes számjegy a 3 (< 5), ezért lefelé kerekítünk: 43 ≈ 40.',
    hint: 'A 3-as jegy dönt: 3 < 5, így lefelé kerekítünk.',
    breakdown: [
      { label: 'Szám', value: '43' },
      { label: 'Döntő jegy', value: '3 (egyesek)' },
      { label: 'Szabály', value: '3 < 5 ➔ Lefelé' },
      { label: 'Kerekített érték', value: '40' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Kerekítsd a 47-et a legközelebbi tízesre!',
    highlightValue: '47 ≈ ? (tízesre)',
    questionTypeBadge: 'Kerekítés tízesre',
    options: ['50', '40', '45', '48'],
    correctAnswer: '50',
    explanation: 'A döntő egyes számjegy a 7 (≥ 5), ezért felfelé kerekítünk: 47 ≈ 50.',
    hint: 'A 7-es jegy dönt: 7 ≥ 5, így felfelé kerekítünk.',
    breakdown: [
      { label: 'Szám', value: '47' },
      { label: 'Döntő jegy', value: '7 (egyesek)' },
      { label: 'Szabály', value: '7 ≥ 5 ➔ Felfelé' },
      { label: 'Kerekített érték', value: '50' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hogyan kerekítjük a pontos felezőponton lévő 45-öt tízesekre?',
    highlightValue: '45 ≈ ? (tízesre)',
    questionTypeBadge: '5-ös döntő jegy',
    options: ['50', '40', '45', '46'],
    correctAnswer: '50',
    explanation: 'Az 5-ös végű számok az aranyszabály szerint mindig FELFELÉ kerekednek: 45 ≈ 50.',
    hint: 'Az 5-ös mindig felfelé kerekedik!',
    breakdown: [
      { label: 'Szám', value: '45' },
      { label: 'Döntő jegy', value: '5' },
      { label: 'Szabály', value: '5 ➔ Felfelé' },
      { label: 'Kerekített érték', value: '50' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Kerekítsd a 72-t a legközelebbi tízesre!',
    highlightValue: '72 ≈ ? (tízesre)',
    questionTypeBadge: 'Kerekítés tízesre',
    options: ['70', '80', '75', '72'],
    correctAnswer: '70',
    explanation: 'A döntő jegy a 2 (< 5), ezért lefelé kerekítünk: 72 ≈ 70.',
    hint: '2 < 5 ➔ lefelé.',
    breakdown: [
      { label: 'Döntő jegy', value: '2' },
      { label: 'Kerekített érték', value: '70' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Kerekítsd a 96-ot tízesekre!',
    highlightValue: '96 ≈ ? (tízesre)',
    questionTypeBadge: 'Átforduló tízes',
    options: ['100', '90', '95', '110'],
    correctAnswer: '100',
    explanation: 'A 6 miatt felfelé kerekítünk: 9 tízesből 10 tízes (100) lesz: 96 ≈ 100.',
    hint: 'A 9 tízes felfelé kerekítve 10 tízes = 100.',
    breakdown: [
      { label: 'Döntő jegy', value: '6 ≥ 5' },
      { label: 'Kerekített érték', value: '100' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Melyik számjegy dönt arról, hogy egy számot merre kerekítünk tízesekre?',
    highlightValue: 'Kerekítés tízesre: döntő jegy',
    questionTypeBadge: 'Szabályismeret',
    options: ['Az egyesek helyén álló számjegy', 'A tízesek helyén álló számjegy', 'A százasok helyén álló számjegy', 'Az első számjegy'],
    correctAnswer: 'Az egyesek helyén álló számjegy',
    explanation: 'Mindig a kerekítendő helyiértéktől közvetlenül jobbra lévő jegy dönt (tízesek esetén az egyesek).',
    hint: 'A kerekítendő helytől eggyel jobbra nézünk.',
    breakdown: [
      { label: 'Kerekítendő hely', value: 'Tízesek' },
      { label: 'Döntő hely', value: 'Egyesek (jobbra)' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Kerekítsd a 124-et a legközelebbi tízesre!',
    highlightValue: '124 ≈ ? (tízesre)',
    questionTypeBadge: 'Kerekítés tízesre',
    options: ['120', '130', '100', '125'],
    correctAnswer: '120',
    explanation: 'A döntő egyes jegy a 4 (< 5), ezért lefelé kerekítünk: 124 ≈ 120.',
    hint: 'Csak a 4-es jegyet nézd: 4 < 5 ➔ 120.',
    breakdown: [
      { label: 'Döntő jegy', value: '4' },
      { label: 'Kerekített érték', value: '120' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Kerekítsd a 158-at a legközelebbi tízesre!',
    highlightValue: '158 ≈ ? (tízesre)',
    questionTypeBadge: 'Kerekítés tízesre',
    options: ['160', '150', '200', '155'],
    correctAnswer: '160',
    explanation: 'A döntő egyes jegy a 8 (≥ 5), így felfelé kerekítünk: 158 ≈ 160.',
    hint: '8 ≥ 5 ➔ felfelé 160-ra.',
    breakdown: [
      { label: 'Döntő jegy', value: '8' },
      { label: 'Kerekített érték', value: '160' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Mely természetes számok kerekített értéke lesz 60 tízesekre kerekítve?',
    highlightValue: 'X ≈ 60 (tízesre)',
    questionTypeBadge: 'Kerekítési tartomány',
    options: ['55-től 64-ig', '50-től 60-ig', '56-tól 65-ig', '60-tól 69-ig'],
    correctAnswer: '55-től 64-ig',
    explanation: 'Az 55, 56, 57, 58, 59 felfelé kerekedik 60-ra, a 60, 61, 62, 63, 64 pedig lefelé 60-ra.',
    hint: 'Felfelé 55-től, lefelé 64-ig tart a sáv.',
    breakdown: [
      { label: 'Felfelé kerekedők', value: '55, 56, 57, 58, 59' },
      { label: 'Lefelé kerekedők', value: '60, 61, 62, 63, 64' },
      { label: 'Tartomány', value: '55 – 64 (10 darab szám)' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Kerekítsd a 285-öt tízesekre!',
    highlightValue: '285 ≈ ? (tízesre)',
    questionTypeBadge: '5-ös döntő jegy',
    options: ['290', '280', '300', '285'],
    correctAnswer: '290',
    explanation: 'Az egyes helyen 5 áll, így felfelé kerekítünk: 285 ≈ 290.',
    hint: '5-ös jegy ➔ 28 tízesből 29 tízes (290) lesz.',
    breakdown: [
      { label: 'Döntő jegy', value: '5' },
      { label: 'Kerekített érték', value: '290' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: KÖZEPES (Kerekítés százasra és ezresre, becslés művelet előtt) ---
  // =========================================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Kerekítsd a 348-at a legközelebbi százasra!',
    highlightValue: '348 ≈ ? (százasra)',
    questionTypeBadge: 'Kerekítés százasra',
    options: ['300', '400', '350', '340'],
    correctAnswer: '300',
    explanation: 'A százasok utáni döntő tízes számjegy a 4 (< 5), ezért lefelé kerekítünk: 348 ≈ 300.',
    hint: 'A tízes helyen 4-es áll: 4 < 5 ➔ 300.',
    breakdown: [
      { label: 'Szám', value: '348' },
      { label: 'Döntő jegy', value: '4 (tízesek)' },
      { label: 'Szabály', value: '4 < 5 ➔ Lefelé' },
      { label: 'Kerekített érték', value: '300' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Kerekítsd a 350-et a legközelebbi százasra!',
    highlightValue: '350 ≈ ? (százasra)',
    questionTypeBadge: '5-ös döntő jegy százasnál',
    options: ['400', '300', '350', '500'],
    correctAnswer: '400',
    explanation: 'A döntő tízes számjegy az 5 (≥ 5), így felfelé kerekítünk: 350 ≈ 400.',
    hint: 'Az 5-ös tízes felfelé kerekít a 400-ra.',
    breakdown: [
      { label: 'Döntő jegy', value: '5' },
      { label: 'Kerekített érték', value: '400' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Kerekítsd a 782-t a legközelebbi százasra!',
    highlightValue: '782 ≈ ? (százasra)',
    questionTypeBadge: 'Kerekítés százasra',
    options: ['800', '700', '780', '790'],
    correctAnswer: '800',
    explanation: 'A döntő tízes számjegy a 8 (≥ 5), így felfelé kerekítünk: 782 ≈ 800.',
    hint: '8 ≥ 5 ➔ 800.',
    breakdown: [
      { label: 'Döntő jegy', value: '8' },
      { label: 'Kerekített érték', value: '800' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Kerekítsd az 1 249-et a legközelebbi ezresre!',
    highlightValue: '1 249 ≈ ? (ezresre)',
    questionTypeBadge: 'Kerekítés ezresre',
    options: ['1 000', '2 000', '1 200', '1 300'],
    correctAnswer: '1 000',
    explanation: 'Az ezresek után álló döntő százas számjegy a 2 (< 5), ezért lefelé kerekítünk: 1 249 ≈ 1 000.',
    hint: 'A százasok helyén 2 áll: 2 < 5 ➔ 1 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '2 (százasok)' },
      { label: 'Kerekített érték', value: '1 000' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Kerekítsd a 4 670-et a legközelebbi ezresre!',
    highlightValue: '4 670 ≈ ? (ezresre)',
    questionTypeBadge: 'Kerekítés ezresre',
    options: ['5 000', '4 000', '4 700', '4 600'],
    correctAnswer: '5 000',
    explanation: 'A döntő százas számjegy a 6 (≥ 5), így felfelé kerekítünk: 4 670 ≈ 5 000.',
    hint: '6 ≥ 5 ➔ 5 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '6' },
      { label: 'Kerekített érték', value: '5 000' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Becsüld meg az összeget kerekített százasokkal: 384 + 195 ≈ ?',
    highlightValue: '384 + 195 (becslés százasra)',
    questionTypeBadge: 'Összeadás becslése',
    options: ['400 + 200 = 600', '300 + 100 = 400', '400 + 100 = 500', '380 + 200 = 580'],
    correctAnswer: '400 + 200 = 600',
    explanation: '384 ≈ 400 és 195 ≈ 200. Becsült összeg: 400 + 200 = 600 (a pontos összeg 579).',
    hint: '384 ≈ 400, 195 ≈ 200.',
    breakdown: [
      { label: '1. tag kerekítve', value: '384 ≈ 400' },
      { label: '2. tag kerekítve', value: '195 ≈ 200' },
      { label: 'Becsült összeg', value: '400 + 200 = 600' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Becsüld meg a különbséget kerekített százasokkal: 712 - 289 ≈ ?',
    highlightValue: '712 - 289 (becslés százasra)',
    questionTypeBadge: 'Kivonás becslése',
    options: ['700 - 300 = 400', '700 - 200 = 500', '800 - 300 = 500', '710 - 290 = 420'],
    correctAnswer: '700 - 300 = 400',
    explanation: '712 ≈ 700 és 289 ≈ 300. Becsült különbség: 700 - 300 = 400 (a pontos érték 423).',
    hint: '712 ≈ 700, 289 ≈ 300.',
    breakdown: [
      { label: 'Kisebbítendő', value: '712 ≈ 700' },
      { label: 'Kivonandó', value: '289 ≈ 300' },
      { label: 'Becsült különbség', value: '700 - 300 = 400' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Kerekítsd a 9 950-et százasokra!',
    highlightValue: '9 950 ≈ ? (százasra)',
    questionTypeBadge: 'Átforduló 9-esek',
    options: ['10 000', '9 900', '9 000', '10 900'],
    correctAnswer: '10 000',
    explanation: 'Az 5-ös tízes miatt a 9 százasból 10 százas lesz, ami 1 ezressel növeli a 9 ezrest ➔ 10 000.',
    hint: '99 százasból 100 százas = 10 000 lesz.',
    breakdown: [
      { label: 'Döntő jegy', value: '5 (tízesek)' },
      { label: 'Átfordulás', value: '99Sz ➔ 100Sz' },
      { label: 'Kerekített érték', value: '10 000' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Melyik a legnagyobb természetes szám, amely százasokra kerekítve 500 lesz?',
    highlightValue: 'Legnagyobb X, ha X ≈ 500',
    questionTypeBadge: 'Határérték',
    options: ['549', '550', '544', '599'],
    correctAnswer: '549',
    explanation: 'Az 549 még lefelé kerekedik 500-ra (döntő jegy: 4). Az 550 már felfelé kerekedne 600-ra.',
    hint: '549 tízes helyén 4 áll ➔ 500. 550 tízes helyén 5 áll ➔ 600.',
    breakdown: [
      { label: '549 kerekítve', value: '500 (döntő: 4)' },
      { label: '550 kerekítve', value: '600 (döntő: 5)' },
      { label: 'Legnagyobb szám', value: '549' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Melyik a legkisebb természetes szám, amely százasokra kerekítve 500 lesz?',
    highlightValue: 'Legkisebb X, ha X ≈ 500',
    questionTypeBadge: 'Határérték',
    options: ['450', '451', '449', '400'],
    correctAnswer: '450',
    explanation: 'A 450 az első szám, amelynek a döntő tízes jegye 5, így már felfelé kerekedik 500-ra.',
    hint: 'A 450 a legkisebb szám, amelyik felfelé már 500-ra ugrik.',
    breakdown: [
      { label: '449 kerekítve', value: '400 (döntő: 4)' },
      { label: '450 kerekítve', value: '500 (döntő: 5)' },
      { label: 'Legkisebb szám', value: '450' }
    ]
  },

  // ==============================================================================
  // --- 3. SZINT: NEHÉZ (Tízezresre/százezresre kerekítés, hibahatárok, szorzás) ---
  // ==============================================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Kerekítsd a 43 780-at tízezresre!',
    highlightValue: '43 780 ≈ ? (tízezresre)',
    questionTypeBadge: 'Kerekítés tízezresre',
    options: ['40 000', '50 000', '44 000', '43 000'],
    correctAnswer: '40 000',
    explanation: 'A tízezresek (4) után az ezresek helyén a 3-as áll (< 5), így lefelé kerekítünk: 40 000.',
    hint: 'A 3-as ezres dönt: 3 < 5 ➔ 40 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '3 (ezresek)' },
      { label: 'Kerekített érték', value: '40 000' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Kerekítsd a 76 200-at tízezresre!',
    highlightValue: '76 200 ≈ ? (tízezresre)',
    questionTypeBadge: 'Kerekítés tízezresre',
    options: ['80 000', '70 000', '76 000', '75 000'],
    correctAnswer: '80 000',
    explanation: 'A döntő ezres számjegy a 6 (≥ 5), így felfelé kerekítünk: 76 200 ≈ 80 000.',
    hint: '6 ≥ 5 ➔ 80 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '6' },
      { label: 'Kerekített érték', value: '80 000' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Kerekítsd a 148 900-at százezresre!',
    highlightValue: '148 900 ≈ ? (százezresre)',
    questionTypeBadge: 'Kerekítés százezresre',
    options: ['100 000', '200 000', '150 000', '140 000'],
    correctAnswer: '100 000',
    explanation: 'A százezresek (1) után a tízezresek helyén a 4-es áll (< 5), így lefelé kerekítünk: 100 000.',
    hint: 'A 4-es tízezres dönt: 4 < 5 ➔ 100 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '4 (tízezresek)' },
      { label: 'Kerekített érték', value: '100 000' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Becsüld meg a szorzatot kerekített tízesekkel: 49 · 21 ≈ ?',
    highlightValue: '49 · 21 (becslés tízesre)',
    questionTypeBadge: 'Szorzás becslése',
    options: ['50 · 20 = 1 000', '40 · 20 = 800', '50 · 30 = 1 500', '49 · 20 = 980'],
    correctAnswer: '50 · 20 = 1 000',
    explanation: '49 ≈ 50 és 21 ≈ 20. Becsült szorzat: 50 · 20 = 1 000 (a pontos érték 1 029).',
    hint: '49 ≈ 50, 21 ≈ 20.',
    breakdown: [
      { label: '1. tényező', value: '49 ≈ 50' },
      { label: '2. tényező', value: '21 ≈ 20' },
      { label: 'Becsült szorzat', value: '50 · 20 = 1 000' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Mekkora lehet a maximális eltérés (kerekítési hiba) egy szám és a tízesre kerekített értéke között?',
    highlightValue: 'Maximális hiba tízesre kerekítéskor',
    questionTypeBadge: 'Hibahatár',
    options: ['5 egység (pl. 45-nél)', '10 egység', '4 egység', '1 egység'],
    correctAnswer: '5 egység (pl. 45-nél)',
    explanation: 'A legnagyobb eltérés a felezőponton fordul elő: |45 - 50| = 5 egység.',
    hint: 'A felezőponton pontosan fél lépésköz a távolság: 10 / 2 = 5.',
    breakdown: [
      { label: 'Lépésköz', value: '10' },
      { label: 'Felezési távolság', value: '10 / 2 = 5' },
      { label: 'Maximális hiba', value: '5 egység' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Mekkora lehet a maximális eltérés (kerekítési hiba) egy szám és a százasra kerekített értéke között?',
    highlightValue: 'Maximális hiba százasra kerekítéskor',
    questionTypeBadge: 'Hibahatár',
    options: ['50 egység (pl. 350-nél)', '100 egység', '49 egység', '25 egység'],
    correctAnswer: '50 egység (pl. 350-nél)',
    explanation: 'A százas lépésköz fele 100 / 2 = 50 egység (pl. 350 ≈ 400 esetén a hiba 50).',
    hint: '100 / 2 = 50.',
    breakdown: [
      { label: 'Lépésköz', value: '100' },
      { label: 'Maximális hiba', value: '100 / 2 = 50 egység' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Kerekítsd a 999 650-et ezresekre!',
    highlightValue: '999 650 ≈ ? (ezresre)',
    questionTypeBadge: 'Többszörös átfordulás',
    options: ['1 000 000', '999 000', '999 700', '1 000 700'],
    correctAnswer: '1 000 000',
    explanation: 'A 6-os százas miatt a 999 ezreshez 1 ezrest adunk ➔ 1 000 ezres = 1 000 000 (egymillió).',
    hint: '999 ezres + 1 ezres = 1 000 ezres = 1 000 000.',
    breakdown: [
      { label: 'Döntő jegy', value: '6 (százasok)' },
      { label: 'Átfordulás', value: '999E ➔ 1000E' },
      { label: 'Kerekített érték', value: '1 000 000' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Egy boltban három terméket vásárolsz: 1 890 Ft, 3 120 Ft és 4 950 Ft. Becsüld meg a fizetendő összeget ezer forintos kerekítéssel!',
    highlightValue: '1 890 + 3 120 + 4 950 ≈ ? (ezresre)',
    questionTypeBadge: 'Gyakorlati becslés',
    options: ['2 000 + 3 000 + 5 000 = 10 000 Ft', '1 000 + 3 000 + 4 000 = 8 000 Ft', '2 000 + 3 000 + 4 000 = 9 000 Ft', '10 500 Ft'],
    correctAnswer: '2 000 + 3 000 + 5 000 = 10 000 Ft',
    explanation: '1 890 ≈ 2 000, 3 120 ≈ 3 000, 4 950 ≈ 5 000. Becsült összeg: 2 000 + 3 000 + 5 000 = 10 000 Ft (pontos: 9 960 Ft).',
    hint: '1890 ≈ 2000, 3120 ≈ 3000, 4950 ≈ 5000.',
    breakdown: [
      { label: '1. termék', value: '1 890 ≈ 2 000' },
      { label: '2. termék', value: '3 120 ≈ 3 000' },
      { label: '3. termék', value: '4 950 ≈ 5 000' },
      { label: 'Összesen', value: '10 000 Ft' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hány olyan természetes szám van, amely tízezresre kerekítve 50 000 lesz?',
    highlightValue: 'X ≈ 50 000 (tízezresre) darabszám',
    questionTypeBadge: 'Számossági feladat',
    options: ['10 000 darab (45 000 – 54 999)', '5 000 darab', '9 999 darab', '1 000 darab'],
    correctAnswer: '10 000 darab (45 000 – 54 999)',
    explanation: 'A 45 000-től 54 999-ig terjedő intervallumban pontosan 54 999 - 45 000 + 1 = 10 000 szám található.',
    hint: 'A kerekítési intervallum szélessége megegyezik a kerekítési helyiértékkel (10 000).',
    breakdown: [
      { label: 'Legkisebb szám', value: '45 000' },
      { label: 'Legnagyobb szám', value: '54 999' },
      { label: 'Darabszám', value: '10 000' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'A 45 782 számot egymás után tízesre, százasra és ezresre kerekítjük. Melyik a helyes kerekítési sorozat?',
    highlightValue: '45 782 kerekítése 10, 100, 1000-re',
    questionTypeBadge: 'Összetett kerekítés',
    options: [
      'Tízesre: 45 780, Százasra: 45 800, Ezresre: 46 000',
      'Tízesre: 45 790, Százasra: 45 700, Ezresre: 45 000',
      'Tízesre: 45 780, Százasra: 45 700, Ezresre: 46 000',
      'Tízesre: 45 800, Százasra: 45 800, Ezresre: 50 000'
    ],
    correctAnswer: 'Tízesre: 45 780, Százasra: 45 800, Ezresre: 46 000',
    explanation: 'Tízesre (döntő: 2) ➔ 45 780; Százasra (döntő: 8) ➔ 45 800; Ezresre (döntő: 7) ➔ 46 000.',
    hint: 'Mindig az eredeti számból indulj ki!',
    breakdown: [
      { label: 'Tízesre (döntő: 2)', value: '45 780' },
      { label: 'Százasra (döntő: 8)', value: '45 800' },
      { label: 'Ezresre (döntő: 7)', value: '46 000' }
    ]
  }
];

export const RoundingQuiz: React.FC<RoundingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Becslés és Kerekítés Kvíz"
      subtitle="Gyakorold a kerekítést tízesre, százasra, ezresre és a műveletek becslését!"
      topicBadge="5. Osztály • I. Az egész számok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<RoundingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<RoundingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapok',
          subtitle: 'Kerekítés tízesekre',
          focus: 'Döntő egyes számjegy, 0-4 lefelé, 5-9 felfelé kerekítés'
        },
        level2: {
          title: '2. Szint: Közepes',
          subtitle: 'Kerekítés százasra és ezresre',
          focus: 'Százas/ezres döntő jegyek, becslés műveletek előtt'
        },
        level3: {
          title: '3. Szint: Haladó',
          subtitle: 'Tízezresek, hibahatárok, szorzás',
          focus: 'Nagy számok, kerekítési hibahatár, átforduló 9-esek'
        }
      }}
      cheatSheetContent={
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">A Kerekítés Aranyszabálya:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>0, 1, 2, 3, 4:</strong> Lefelé kerekítünk (a jegy marad).<br />
              • <strong>5, 6, 7, 8, 9:</strong> Felfelé kerekítünk (a jegy 1-gyel nő).<br />
              • Mindig a kerekítendő helyiérték <strong>közvetlen jobb oldali szomszédja</strong> dönt!
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Műveletek becslése:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              Számolás előtt kerekítsd a tagokat (pl. 384 + 195 ≈ 400 + 200 = 600).
            </p>
          </div>
        </div>
      }
    />
  );
};

export default RoundingQuiz;
