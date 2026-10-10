import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationMethodsMatcherProps {
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
    title: '1. Szint: Szöveges Állítások és Kifejezéseik',
    subtitle: 'Párosítsd a szöveges megfogalmazást a helyes algebrai betűs kifejezéssel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Egy szám kétszeresénél 5-tel nagyobb szám',
        value: '2x + 5'
      },
      {
        id: 'p2',
        prompt: 'Egy számnál 12-vel nagyobb szám háromszorosa',
        value: '3(x + 12)'
      },
      {
        id: 'p3',
        prompt: 'Egy szám háromnegyed részének és a számnak az összege',
        value: '3/4 x + x'
      },
      {
        id: 'p4',
        prompt: 'Egy szám ötszörösét elvesszük 100-ból, majd szorozzuk (-4)-gyel',
        value: '(100 - 5x) · (-4)'
      },
      {
        id: 'p5',
        prompt: 'Egy gondolt szám háromszorosánál 20-szal nagyobb szám',
        value: '3x + 20'
      },
      {
        id: 'p6',
        prompt: 'Egy gondolt szám felénél 14-gyel nagyobb szám',
        value: '1/2 x + 14'
      },
      {
        id: 'p7',
        prompt: '60 és a gondolt szám különbségének az ötszöröse',
        value: '(60 - x) · 5'
      },
      {
        id: 'p8',
        prompt: 'A szám és kétszeresénél 23-mal nagyobb szám összege 47',
        value: 'x + (2x + 23) = 47'
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenletek és Első Lebontási Lépésük',
    subtitle: 'Milyen ellentétes művelettel kezdjük az egyenlet lebontogatását?',
    pairs: [
      {
        id: 'p9',
        prompt: '(5x - 4) / 3 = 7 lebontása',
        value: 'Első lépés: · 3 (5x - 4 = 21)'
      },
      {
        id: 'p10',
        prompt: '(3x + 8) · 2 - 5 = 17 lebontása',
        value: 'Első lépés: + 5 ((3x + 8) · 2 = 22)'
      },
      {
        id: 'p11',
        prompt: '4(x/6 - 9) = -16 lebontása',
        value: 'Első lépés: : 4 (x/6 - 9 = -4)'
      },
      {
        id: 'p12',
        prompt: '(13 - 2x) / 3 = 7 lebontása',
        value: 'Első lépés: · 3 (13 - 2x = 21)'
      },
      {
        id: 'p13',
        prompt: '(x/4 + 10) · 5 = 60 lebontása',
        value: 'Első lépés: : 5 (x/4 + 10 = 12)'
      },
      {
        id: 'p14',
        prompt: '(4x - 3) / 5 = 5 lebontása',
        value: 'Első lépés: · 5 (4x - 3 = 25)'
      },
      {
        id: 'p15',
        prompt: '3(x + 2) + 2(x - 1) = 14 előkészítése',
        value: 'Első lépés: Zárójelbontás & összevonás (5x + 4 = 14)'
      },
      {
        id: 'p16',
        prompt: 'x/3 + 20 = 200 (busz tervezett útja)',
        value: 'Első lépés: - 20 (x/3 = 180)'
      }
    ]
  },
  3: {
    title: '3. Szint: Egyenletek és Megoldásaik',
    subtitle: 'Párosítsd a tankönyvi és munkafüzeti egyenleteket a pontos gyökükkel!',
    pairs: [
      {
        id: 'p17',
        prompt: '(5x - 4) / 3 = 7 (Mf. 1/a)',
        value: 'x = 5'
      },
      {
        id: 'p18',
        prompt: '(3x + 8) · 2 - 5 = 17 (Tk. 1/a)',
        value: 'x = 1'
      },
      {
        id: 'p19',
        prompt: '(13 - 2x) / 3 = 7 (Mf. 2/b)',
        value: 'x = -4'
      },
      {
        id: 'p20',
        prompt: '4(x/6 - 9) = -16 (Mf. 2/a)',
        value: 'x = 30'
      },
      {
        id: 'p21',
        prompt: 'x · (12 - x) = 32 egész prímek közt (Mf. 4.)',
        value: 'x = 4 vagy x = 8'
      },
      {
        id: 'p22',
        prompt: 'x · (x - 1) = 6 a 10-nél kisebb prímekben (Tk. 1/b)',
        value: 'x = 3'
      },
      {
        id: 'p23',
        prompt: 'Téglalap: x · (x + 2) = 168 (Tk. 7.)',
        value: 'x = 12 cm (K = 52 cm)'
      },
      {
        id: 'p24',
        prompt: 'Busz útja: x/3 + 20 = 200 (Tk. 5.)',
        value: 'x = 540 km a teljes tervezett út'
      }
    ]
  }
};

export const EquationMethodsMatcher: React.FC<EquationMethodsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-eq-methods-matcher',
  topicTitle = 'Egyenletmegoldási módszerek: próbálgatás és lebontogatás'
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
      themeColor="indigo"
    />
  );
};

export default EquationMethodsMatcher;
