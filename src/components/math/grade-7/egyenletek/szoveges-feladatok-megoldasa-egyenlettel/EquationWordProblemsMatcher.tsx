import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationWordProblemsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Szöveges Állítások és Algebrai Egyenletek',
    subtitle: 'Párosítsd a feladat szöveges mondatát a helyesen felállított egyenlettel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Egy számnál 15-tel nagyobb szám a 42',
        value: 'x + 15 = 42'
      },
      {
        id: 'p2',
        prompt: 'Egy szám 4-szereséből 9-et kivonva 31-et kapunk',
        value: '4x - 9 = 31'
      },
      {
        id: 'p3',
        prompt: 'Egy szám harmadrésze 12-vel egyenlő',
        value: 'x / 3 = 12'
      },
      {
        id: 'p4',
        prompt: 'Egy szám 2-szeresének és 7-nek az összege 25',
        value: '2x + 7 = 25'
      },
      {
        id: 'p5',
        prompt: 'Két szám összege 50, az egyik 8-cal nagyobb',
        value: 'x + (x + 8) = 50'
      },
      {
        id: 'p6',
        prompt: 'Egy szám 3-szorosa egyenlő a nála 16-tal nagyobb számmal',
        value: '3x = x + 16'
      },
      {
        id: 'p7',
        prompt: 'Három egymást követő egész szám összege 45',
        value: 'x + (x + 1) + (x + 2) = 45'
      },
      {
        id: 'p8',
        prompt: 'Egy szám 5-szöröséből elvéve magát a számot 36-ot kapunk',
        value: '5x - x = 36'
      }
    ]
  },
  2: {
    title: '2. Szint: Életkoros és Összetettebb Modellek',
    subtitle: 'Párosítsd a feladatot az adatokból felírt megfelelő egyenlettel!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Apa 36, fia 8. Hány év (x) múlva lesz apa 3-szor idősebb?',
        value: '36 + x = 3(8 + x)'
      },
      {
        id: 'p10',
        prompt: 'Anya 40, lánya 16. Hány évvel ezelőtt (x) volt 3-szorosa?',
        value: '40 - x = 3(16 - x)'
      },
      {
        id: 'p11',
        prompt: 'Péternek 3-szor annyi bélyege van, mint Robinak, összesen 120',
        value: '3x + x = 120'
      },
      {
        id: 'p12',
        prompt: '90 könyv: első polcról 10-et átrakva a másodikra egyenlő lesz',
        value: 'x - 10 = (90 - x) + 10'
      },
      {
        id: 'p13',
        prompt: 'Három egymást követő páros szám összege 72',
        value: 'x + (x + 2) + (x + 4) = 72'
      },
      {
        id: 'p14',
        prompt: 'Téglalap K = 48 cm, hosszabb oldal 4 cm-rel több',
        value: '2 · [x + (x + 4)] = 48'
      },
      {
        id: 'p15',
        prompt: 'Egy szám felének és harmadának az összege 25',
        value: 'x / 2 + x / 3 = 25'
      },
      {
        id: 'p16',
        prompt: 'Zsebpénzből 500 Ft-ot költve a pénz negyede maradt',
        value: 'x - 500 = x / 4'
      }
    ]
  },
  3: {
    title: '3. Szint: Kérdések és Szöveges Végeredmények',
    subtitle: 'Párosítsd a feladatot a helyes végső szöveges válasszal!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Két szám összege 64, arányuk 3 : 5. Mennyi a nagyobbik?',
        value: 'Nagyobb szám: 40 (kisebb: 24)'
      },
      {
        id: 'p18',
        prompt: 'Apa 40, fia 12. Hány év múlva lesz az apa 2-szer idősebb?',
        value: '16 év múlva (apa 56, fia 28)'
      },
      {
        id: 'p19',
        prompt: 'Három egymást követő páratlan szám összege 57. Legkisebb?',
        value: 'A legkisebb szám: 17 (17, 19, 21)'
      },
      {
        id: 'p20',
        prompt: 'Téglalap oldalai x és 3x, K = 40 cm. Mekkora a terület (T)?',
        value: 'Terület: 75 cm² (oldalak: 5 cm és 15 cm)'
      },
      {
        id: 'p21',
        prompt: '100 alma két ládában. 15-öt átrakva egyenlő lesz. Elsőben?',
        value: 'Elsőben: 65 alma (másodikban: 35)'
      },
      {
        id: 'p22',
        prompt: 'Béla 14, nagyapja 70. Hány éve volt nagyapa 8-szor idősebb?',
        value: '6 évvel ezelőtt (Béla 8, nagyapa 64)'
      },
      {
        id: 'p23',
        prompt: 'Gondolt szám feléhez 12-t adva 28-at kapunk. Mi a szám?',
        value: 'Gondolt szám: 32 (32 : 2 + 12 = 28)'
      },
      {
        id: 'p24',
        prompt: '3 testvér 8, 11, 14 éves. Hány év múlva lesz összegük 60?',
        value: '9 év múlva (17 + 20 + 23 = 60)'
      }
    ]
  }
};

export const EquationWordProblemsMatcher: React.FC<EquationWordProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-eq-word-matcher',
  topicTitle = '4. Szöveges feladatok megoldása egyenlettel'
}) => {
  const activeLvl = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="amber"
    />
  );
};

export default EquationWordProblemsMatcher;
