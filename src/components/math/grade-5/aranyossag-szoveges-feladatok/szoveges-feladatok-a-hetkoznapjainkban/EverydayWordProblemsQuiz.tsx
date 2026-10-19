import React, { useState, useEffect } from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { EverydayWordProblemsMatcher } from './EverydayWordProblemsMatcher';
import { EverydayWordProblemsSorter } from './EverydayWordProblemsSorter';

export interface EverydayWordProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const EverydayWordProblemsQuiz: React.FC<EverydayWordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levelCheatSheets: Record<DifficultyLevel, React.ReactNode> = {
    1: (
      <div className="space-y-3">
        <h4 className="font-bold text-orange-700 dark:text-orange-300 text-sm">
          🛒 1. Szint: Vásárlás, forint kerekítés és visszajáró
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-lg border border-orange-200 dark:border-orange-900/40">
            <strong>Egységár képlet:</strong>
            <p className="mt-0.5">Fizetendő = Egységár · Mennyiség</p>
            <p className="mt-0.5">Egységár = Fizetendő : Mennyiség</p>
          </div>
          <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-lg border border-orange-200 dark:border-orange-900/40">
            <strong>Készpénzes kerekítés:</strong>
            <p className="mt-0.5">1, 2 Ft → 0 Ft | 3, 4 Ft → 5 Ft</p>
            <p className="mt-0.5">6, 7 Ft → 5 Ft | 8, 9 Ft → 10 Ft</p>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        <h4 className="font-bold text-orange-700 dark:text-orange-300 text-sm">
          🍳 2. Szint: Receptek és költségvetés
        </h4>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-lg border border-orange-200 dark:border-orange-900/40">
            <strong>Receptarányosítás (Szorzótényező):</strong>
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              Szorzótényező = Kívánt adag : Receptben lévő adag. Minden hozzávalót ezzel szorzunk meg!
            </p>
          </div>
          <div className="p-2 bg-orange-50 dark:bg-orange-950/40 rounded-lg border border-orange-200 dark:border-orange-900/40">
            <strong>Konyhai mértékegységek:</strong>
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              1 dl = 100 ml • 1 kg = 100 dkg = 1000 g • 1 evőkanál ≈ 15 ml
            </p>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <h4 className="font-bold text-orange-700 dark:text-orange-300 text-sm">
          🚗 3. Szint: Út, idő és sebesség ($s = v \cdot t$)
        </h4>
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Út (s):</strong> Sebesség (v) · Idő (t)</div>
          <div>• <strong>Menetidő (t):</strong> Út (s) : Sebesség (v)</div>
          <div>• <strong>Sebesség (v):</strong> Út (s) : Idő (t)</div>
          <div>• <strong>Időegységek:</strong> 15 perc = 0,25 óra (negyedóra) • 30 perc = 0,5 óra (fél óra) • 45 perc = 0,75 óra (háromnegyed óra)</div>
        </div>
      </div>
    )
  };

  const questions: Record<DifficultyLevel, Question[]> = {
    // ========================================================
    // 1. SZINT: VÁSÁRLÁS, KEREKÍTÉS ÉS VISSZAJÁRÓ (10 kérdés)
    // ========================================================
    1: [
      {
        id: 'every-l1-1',
        question: 'Egy kilogramm alma ára 420 Ft. Mennyit fizetünk 3 kg almáért?',
        options: ['1260 Ft-ot', '1200 Ft-ot', '840 Ft-ot', '1420 Ft-ot'],
        correctAnswer: '1260 Ft-ot',
        explanation: 'Fizetendő = 3 · 420 = 1260 Ft.',
        hint: 'Szorozd meg a kilónkénti árat 3-mal: 3 · 420 = ?'
      },
      {
        id: 'every-l1-2',
        question: 'Peti vásárolt egy csokit 380 Ft-ért és egy üdítőt 470 Ft-ért. 1000 Ft-os bankjeggyel fizetett. Mennyi visszajárót kapott?',
        options: ['150 Ft-ot', '250 Ft-ot', '120 Ft-ot', '850 Ft-ot'],
        correctAnswer: '150 Ft-ot',
        explanation: 'Összesen vásárolt: 380 + 470 = 850 Ft-ért. A visszajáró: 1000 − 850 = 150 Ft.',
        hint: '1000 − (380 + 470) = ?'
      },
      {
        id: 'every-l1-3',
        question: 'A boltban a vásárlás pontos összege 1432 Ft lett. Készpénzzel fizetünk. Mennyire kerekíti a kasszagép az összeget?',
        options: ['1430 Ft-ra', '1435 Ft-ra', '1400 Ft-ra', '1440 Ft-ra'],
        correctAnswer: '1430 Ft-ra',
        explanation: 'A magyar kerekítési szabály szerint az 1 és 2 forintra végződő összegeket lefelé, 0-ra kerekítjük. 1432 Ft → 1430 Ft.',
        hint: 'Az utolsó számjegy 2, tehát lefelé kerekítünk a legközelebbi 0-ra.'
      },
      {
        id: 'every-l1-4',
        question: 'A boltban a számla végösszege 2187 Ft. Készpénzes fizetésnél mennyit kell pontosan fizetnünk?',
        options: ['2185 Ft-ot', '2190 Ft-ot', '2180 Ft-ot', '2200 Ft-ot'],
        correctAnswer: '2185 Ft-ot',
        explanation: 'A 6 és 7 forintra végződő összegeket a szabály szerint 5-re kerekítjük lefelé: 2187 Ft → 2185 Ft.',
        hint: '7-re végződik, a legközelebbi 5-ös végű szám a 2185.'
      },
      {
        id: 'every-l1-5',
        question: 'Egy csomag füzet ára 680 Ft. „Vegyél 3-at, fizess 2-t!” akció van. Mennyit fizetünk 3 csomag füzetért?',
        options: ['1360 Ft-ot', '2040 Ft-ot', '1020 Ft-ot', '1700 Ft-ot'],
        correctAnswer: '1360 Ft-ot',
        explanation: 'Csak 2 csomagot kell kifizetnünk: 2 · 680 = 1360 Ft. A 3. csomag ingyenes (megtakarítás: 680 Ft).',
        hint: '3 darabból csak 2-t kell kifizetni: 2 · 680 = ?'
      },
      {
        id: 'every-l1-6',
        question: '4 doboz gyümölcsléért összesen 1920 Ft-ot fizettünk. Mennyibe került egy doboz gyümölcslé?',
        options: ['480 Ft-ba', '450 Ft-ba', '420 Ft-ba', '520 Ft-ba'],
        correctAnswer: '480 Ft-ba',
        explanation: 'Egységár = Teljes összeg : Darabszám = 1920 : 4 = 480 Ft.',
        hint: '1920 : 4 = ?'
      },
      {
        id: 'every-l1-7',
        question: 'Anna vett 1,5 kg narancsot, amelynek kilója 600 Ft. Mennyit fizetett a narancsért?',
        options: ['900 Ft-ot', '750 Ft-ot', '800 Ft-ot', '1200 Ft-ot'],
        correctAnswer: '900 Ft-ot',
        explanation: '1 kg narancs = 600 Ft, 0,5 kg narancs = 300 Ft. Együtt: 600 + 300 = 900 Ft (vagy 1,5 · 600 = 900 Ft).',
        hint: '1 kg ára 600 Ft, fél kiló 300 Ft. Összesen: 600 + 300.'
      },
      {
        id: 'every-l1-8',
        question: 'Egy péksütemény ára 230 Ft. Hány darabot tudunk venni belőle legfeljebb 1000 Ft-ból?',
        options: ['4 darabot', '5 darabot', '3 darabot', '6 darabot'],
        correctAnswer: '4 darabot',
        explanation: '4 · 230 = 920 Ft (80 Ft maradék). 5 darab már 5 · 230 = 1150 Ft lenne, ami több mint 1000 Ft.',
        hint: '1000 : 230 = 4 egész, marad 80 Ft.'
      },
      {
        id: 'every-l1-9',
        question: 'A pénztárnál a kerekített végösszeg 3745 Ft lett. Egy 5000 Ft-os bankjeggyel fizettünk. Mennyi visszajárót kapunk?',
        options: ['1255 Ft-ot', '1355 Ft-ot', '1260 Ft-ot', '1250 Ft-ot'],
        correctAnswer: '1255 Ft-ot',
        explanation: 'Visszajáró = 5000 − 3745 = 1255 Ft.',
        hint: '5000 − 3745 = ?'
      },
      {
        id: 'every-l1-10',
        question: 'Melyik összeg kerekítése HIBÁS a készpénzes kerekítési szabály szerint?',
        options: [
          '1234 Ft → 1230 Ft',
          '568 Ft → 570 Ft',
          '891 Ft → 890 Ft',
          '456 Ft → 455 Ft'
        ],
        correctAnswer: '1234 Ft → 1230 Ft',
        explanation: '1234 Ft végződése 4, így felfelé 1235 Ft-ra kell kerekíteni, nem pedig lefelé 1230 Ft-ra!',
        hint: 'A 3 és 4 végződésű összegek 5-re kerekednek.'
      }
    ],

    // ========================================================
    // 2. SZINT: RECEPTEK, FŐZÉS ÉS KÖLTSÉGVETÉS (10 kérdés)
    // ========================================================
    2: [
      {
        id: 'every-l2-1',
        question: 'Egy palacsintatészta receptje 4 főre 20 dkg lisztet ír elő. Hány dkg liszt kell 8 főre?',
        options: ['40 dkg', '30 dkg', '50 dkg', '60 dkg'],
        correctAnswer: '40 dkg',
        explanation: '8 fő a 4 fő kétszerese (8 : 4 = 2). A liszt mennyiségét is kétszerezzük: 20 · 2 = 40 dkg liszt.',
        hint: 'Kétszer annyi emberhez kétszer annyi liszt kell: 2 · 20 dkg = ?'
      },
      {
        id: 'every-l2-2',
        question: 'Egy sütemény receptje 6 főre 3 db tojást és 15 dkg cukrot ír elő. Mennyi cukor kell 10 főre?',
        options: ['25 dkg cukor', '20 dkg cukor', '30 dkg cukor', '22 dkg cukor'],
        correctAnswer: '25 dkg cukor',
        explanation: '1 főre jutó cukor: 15 : 6 = 2,5 dkg. 10 főre: 10 · 2,5 = 25 dkg cukor.',
        hint: '15 : 6 = 2,5 dkg fejenként. 10 főre 10 · 2,5 = ?'
      },
      {
        id: 'every-l2-3',
        question: 'Egy 5 fős családi ebédhez 1,5 kg hús szükséges. Hány gramm hús jut átlagosan egy családtagra?',
        options: ['300 gramm', '250 gramm', '350 gramm', '200 gramm'],
        correctAnswer: '300 gramm',
        explanation: '1,5 kg = 1500 g. Fejenkénti adag: 1500 : 5 = 300 gramm.',
        hint: 'Váltsd át a húst grammra: 1,5 kg = 1500 g, majd oszd el 5-tel!'
      },
      {
        id: 'every-l2-4',
        question: 'Bence havi zsebpénze 6000 Ft. A zsebpénze harmadát félreteszi megtakarításként, a felét fagyira és játékra költi. Mennyi pénze marad egyéb apróságokra?',
        options: ['1000 Ft', '2000 Ft', '1500 Ft', '500 Ft'],
        correctAnswer: '1000 Ft',
        explanation: 'Megtakarítás: 6000 : 3 = 2000 Ft. Költés: 6000 : 2 = 3000 Ft. Összesen elment: 2000 + 3000 = 5000 Ft. Maradék: 6000 − 5000 = 1000 Ft.',
        hint: 'Harmada 2000 Ft, fele 3000 Ft. 6000 − (2000 + 3000) = ?'
      },
      {
        id: 'every-l2-5',
        question: 'Egy 2 literes szörp hígítási aránya 1:7 (1 rész szörphöz 7 rész víz kell). Hány liter kész üdítőitalt kapunk a 2 liter szörpből?',
        options: ['16 litert', '14 litert', '8 litert', '15 litert'],
        correctAnswer: '16 litert',
        explanation: 'A 2 liter szörphöz 2 · 7 = 14 liter víz kell. Az elkészült üdítőital: 2 liter szörp + 14 liter víz = 16 liter (vagy 2 · (1 + 7) = 16 liter).',
        hint: 'A kész italban 1 rész szörp + 7 rész víz = 8 rész van. 2 · 8 = ?'
      },
      {
        id: 'every-l2-6',
        question: 'Dóri limonádét készít. A recept szerint 1 liter vízhez 2 citrom levét és 4 evőkanál cukrot kell adni. Mennyi citrom és cukor kell 3,5 liter limonádéhoz?',
        options: [
          '7 citrom és 14 evőkanál cukor',
          '6 citrom és 12 evőkanál cukor',
          '8 citrom és 16 evőkanál cukor',
          '5 citrom és 10 evőkanál cukor'
        ],
        correctAnswer: '7 citrom és 14 evőkanál cukor',
        explanation: 'Szorzótényező = 3,5. Citrom: 2 · 3,5 = 7 db. Cukor: 4 · 3,5 = 14 evőkanál.',
        hint: 'Szorozd meg a hozzávalókat 3,5-del: 2 · 3,5 és 4 · 3,5.'
      },
      {
        id: 'every-l2-7',
        question: 'Egy 4 fős család havi internet előfizetése 7200 Ft, a vízszámla 12 800 Ft. Mennyi az átlagos fejenkénti költség erre a két tételre?',
        options: ['5000 Ft / fő', '4500 Ft / fő', '5500 Ft / fő', '4000 Ft / fő'],
        correctAnswer: '5000 Ft / fő',
        explanation: 'Összes kiadás: 7200 + 12 800 = 20 000 Ft. Fejenként: 20 000 : 4 = 5000 Ft/fő.',
        hint: '(7200 + 12 800) : 4 = 20 000 : 4 = ?'
      },
      {
        id: 'every-l2-8',
        question: 'Egy 750 ml-es tusfürdő ára 1500 Ft, míg egy 250 ml-es kiszerelés ára 600 Ft. Melyik a gazdaságosabb, és mennyivel?',
        options: [
          'A 750 ml-es gazdaságosabb (2000 Ft/liter a 2400 Ft/liter helyett)',
          'A 250 ml-es gazdaságosabb (1800 Ft/liter)',
          'Egyforma az egységáruk',
          'A 250 ml-es olcsóbb, mert kevesebbet fizetünk érte'
        ],
        correctAnswer: 'A 750 ml-es gazdaságosabb (2000 Ft/liter a 2400 Ft/liter helyett)',
        explanation: '750 ml: 3-szorosa a 250 ml-nek. Ha a kicsiből vennénk 3-at (750 ml), az 3 · 600 = 1800 Ft-ba kerülne, míg a nagy csak 1500 Ft! Literár: nagy = 1500 / 0,75 = 2000 Ft/l; kicsi = 600 / 0,25 = 2400 Ft/l.',
        hint: 'Hasonlítsd össze 750 ml árait: a nagy 1500 Ft, 3 darab kicsi pedig 3 · 600 = 1800 Ft.'
      },
      {
        id: 'every-l2-9',
        question: 'Egy torta elkészítéséhez 25 dkg vaj kell. A boltban 10 dkg-os vajakat árulnak 450 Ft/db áron. Hány darabot kell vennünk, és mennyit fizetünk?',
        options: [
          '3 darabot kell venni, 1350 Ft-ot fizetünk',
          '2 darabot kell venni, 900 Ft-ot fizetünk',
          '2,5 darabot kell venni, 1125 Ft-ot fizetünk',
          '4 darabot kell venni, 1800 Ft-ot fizetünk'
        ],
        correctAnswer: '3 darabot kell venni, 1350 Ft-ot fizetünk',
        explanation: '2 darab vaj csak 20 dkg lenne, ami kevés a 25 dkg-hoz. Ezért legalább 3 darabot kell megvennünk (30 dkg). Ára: 3 · 450 = 1350 Ft.',
        hint: 'Fél vajat nem lehet venni a boltban, kerekíteni kell felfelé egész csomagra!'
      },
      {
        id: 'every-l2-10',
        question: 'Egy osztálykirándulás buszbérlése 96 000 Ft-ba kerül. Eredetileg 24 diák ment volna. 4 diák megbetegedett. Mennyivel nőtt az egy főre jutó költség?',
        options: ['800 Ft-tal', '4000 Ft-tal', '1000 Ft-tal', '600 Ft-tal'],
        correctAnswer: '800 Ft-tal',
        explanation: 'Eredeti költség: 96 000 : 24 = 4000 Ft/fő. Új létszám: 24 − 4 = 20 diák. Új költség: 96 000 : 20 = 4800 Ft/fő. Növekedés: 4800 − 4000 = 800 Ft/fő.',
        hint: 'Eredetileg 96 000 : 24 = 4000 Ft. 20 diákkal: 96 000 : 20 = 4800 Ft. Különbség?'
      }
    ],

    // ========================================================
    // 3. SZINT: UTAZÁS, SEBESSÉG ÉS MENETREND (10 kérdés)
    // ========================================================
    3: [
      {
        id: 'every-l3-1',
        question: 'Egy autó átlagsebessége 70 km/h. Hány kilométert tesz meg 3 óra alatt?',
        options: ['210 km-t', '240 km-t', '180 km-t', '140 km-t'],
        correctAnswer: '210 km-t',
        explanation: 'Út = Sebesség · Idő = 70 · 3 = 210 km.',
        hint: 's = v · t = 70 · 3 = ?'
      },
      {
        id: 'every-l3-2',
        question: 'Egy kerékpáros 18 km/h sebességgel halad. Mennyi idő alatt tesz meg egy 45 km-es távot?',
        options: ['2,5 óra (2 óra 30 perc)', '2 óra 15 perc', '3 óra', '2 óra 45 perc'],
        correctAnswer: '2,5 óra (2 óra 30 perc)',
        explanation: 'Idő = Út : Sebesség = 45 : 18 = 2,5 óra = 2 óra 30 perc.',
        hint: '45 : 18 = 2,5 óra. A 0,5 óra az fél óra, azaz 30 perc!'
      },
      {
        id: 'every-l3-3',
        question: 'A vonat 08:35-kor indul Budapestről, és a menetidő 1 óra 45 perc. Hány órakor érkezik meg a vonat az állomásra?',
        options: ['10:20-kor', '10:15-kor', '09:80-kor', '10:30-kor'],
        correctAnswer: '10:20-kor',
        explanation: '08:35 + 1 óra = 09:35. 09:35 + 25 perc = 10:00. Maradt még 20 perc (45 − 25 = 20) → 10:20.',
        hint: '08 óra 35 perc + 1 óra 45 perc = 9 óra 80 perc = 10 óra 20 perc.'
      },
      {
        id: 'every-l3-4',
        question: 'Egy gyalogos 4 km/h sebességgel sétál. Hány perc alatt tesz meg 2 km-t?',
        options: ['30 perc alatt', '20 perc alatt', '45 perc alatt', '15 perc alatt'],
        correctAnswer: '30 perc alatt',
        explanation: '2 km a 4 km fele, így a szükséges idő fél óra = 30 perc (2 : 4 = 0,5 óra).',
        hint: 'Ha 1 óra alatt 4 km-t tesz meg, akkor 2 km-t fél óra alatt!'
      },
      {
        id: 'every-l3-5',
        question: 'Egy intercity vonat 120 km távolságot 1 óra 30 perc alatt tett meg. Mekkora volt az átlagsebessége?',
        options: ['80 km/h', '90 km/h', '75 km/h', '100 km/h'],
        correctAnswer: '80 km/h',
        explanation: '1 óra 30 perc = 1,5 óra. Sebesség = Út : Idő = 120 : 1,5 = 80 km/h.',
        hint: '120 : 1,5 = 80.'
      },
      {
        id: 'every-l3-6',
        question: 'Egy gépkocsi 100 kilométerenként átlagosan 6,5 liter benzint fogyaszt. Hány liter benzint fogyaszt egy 400 km-es úton?',
        options: ['26 litert', '24 litert', '28 litert', '30 litert'],
        correctAnswer: '26 litert',
        explanation: '400 km az 4-szer 100 km. Fogyasztás: 4 · 6,5 = 26 liter benzin.',
        hint: '4 · 6,5 = ?'
      },
      {
        id: 'every-l3-7',
        question: 'Egy repülőgép 850 km/h sebességgel repül. Milyen messzire jut 3 óra 12 perc alatt?',
        options: ['2720 km-re', '2550 km-re', '2800 km-re', '2650 km-re'],
        correctAnswer: '2720 km-re',
        explanation: '12 perc = 12/60 óra = 1/5 óra = 0,2 óra. Teljes idő = 3,2 óra. Út = 850 · 3,2 = 2720 km.',
        hint: '12 perc = 0,2 óra. 850 · 3,2 = ?'
      },
      {
        id: 'every-l3-8',
        question: 'Két autó indul egymással szemben két, egymástól 240 km-re lévő városból. Az egyik sebessége 50 km/h, a másiké 70 km/h. Hány óra múlva találkoznak?',
        options: ['2 óra múlva', '2,5 óra múlva', '3 óra múlva', '1,5 óra múlva'],
        correctAnswer: '2 óra múlva',
        explanation: 'Egymáshoz képesti közeledési sebességük: 50 + 70 = 120 km/h. Találkozási idő: 240 : 120 = 2 óra múlva.',
        hint: 'Egy óra alatt együtt 50 + 70 = 120 km-t tesznek meg. 240 : 120 = ?'
      },
      {
        id: 'every-l3-9',
        question: 'A kirándulócsoportnak 14:00-ra kell a vár kapujához érnie. A vár 6 km-re van, és 4 km/h sebességgel tudnak gyalogolni. Legkésőbb mikor kell elindulniuk?',
        options: ['12:30-kor', '12:00-kor', '13:00-kor', '12:45-kor'],
        correctAnswer: '12:30-kor',
        explanation: 'Gyaloglási idő = 6 : 4 = 1,5 óra = 1 óra 30 perc. Indulás: 14:00 − 1 óra 30 perc = 12:30.',
        hint: '6 : 4 = 1,5 óra menetidő. 14:00-ból vonj le 1,5 órát!'
      },
      {
        id: 'every-l3-10',
        question: 'Máté 15 perc alatt tett meg 3 km-t kerékpárral. Mekkora volt az átlagsebessége km/h-ban?',
        options: ['12 km/h', '15 km/h', '10 km/h', '18 km/h'],
        correctAnswer: '12 km/h',
        explanation: '15 perc a negyedórája egy órának (1/4 óra). Egy teljes óra alatt 4-szer ennyit tenne meg: 3 · 4 = 12 km/h (vagy 3 : 0,25 = 12 km/h).',
        hint: 'Ha negyedóra alatt 3 km-t tesz meg, akkor 1 óra alatt 4 · 3 km-t!'
      }
    ]
  };

  return (
    <QuizTemplate
      title="Hétköznapi szöveges feladatok Kvíz"
      subtitle="Vásárlás, forint kerekítés, receptek és utazási számítások a mindennapokban!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-everyday-word-problems-quiz"
      documentId="5_osztaly_szoveges_feladatok_a_hetkoznapjainkban_kviz"
      storageKey="g5-everyday-word-problems-quiz"
      levelCheatSheets={levelCheatSheets}
      cheatSheetCards={levelCheatSheets}
      questions={questions}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      matcherComponent={
        <EverydayWordProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EverydayWordProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <EverydayWordProblemsMatcher
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
      renderSorter={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <EverydayWordProblemsSorter
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
    />
  );
};
export default EverydayWordProblemsQuiz;
