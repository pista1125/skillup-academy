import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PossibilitiesMatcherFigure } from './PossibilitiesDiagrams';

interface PossibilitiesMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Szabályok és Döntési Sorozatok',
    description: 'Párosítsd a feladványokat a matematikai kiszámításokkal és végeredményekkel!',
    pairs: [
      {
        id: 'p1',
        promptFigure: <PossibilitiesMatcherFigure type="outfit" />,
        prompt: '3 póló és 4 nadrág kombinációi',
        value: '3 · 4 = 12 szett'
      },
      {
        id: 'p2',
        promptFigure: <PossibilitiesMatcherFigure type="addition" />,
        prompt: 'Utazás: 2 vonatjárat VAGY 5 buszjárat',
        value: '2 + 5 = 7 lehetőség'
      },
      {
        id: 'p3',
        promptFigure: <PossibilitiesMatcherFigure type="tree" />,
        prompt: '2 pénzérme feldobásának kimenetelei',
        value: '2 · 2 = 4 eset (FF, FÍ, ÍF, ÍÍ)'
      },
      {
        id: 'p4',
        promptFigure: <PossibilitiesMatcherFigure type="dice" />,
        prompt: '1 dobókocka ÉS 1 pénzérme együttes feldobása',
        value: '6 · 2 = 12 kimenetel'
      },
      {
        id: 'p5',
        promptFigure: <PossibilitiesMatcherFigure type="outfit" />,
        prompt: '2 leves, 3 főétel és 2 desszertből álló menü',
        value: '2 · 3 · 2 = 12 menü'
      },
      {
        id: 'p6',
        promptFigure: <PossibilitiesMatcherFigure type="addition" />,
        prompt: 'Választás: 6 alma VAGY 4 körte közül 1 gyümölcs',
        value: '6 + 4 = 10 lehetőség'
      },
      {
        id: 'p7',
        promptFigure: <PossibilitiesMatcherFigure type="tree" />,
        prompt: '3 pénzérme feldobásának kimenetelei',
        value: '2 · 2 · 2 = 8 eset'
      },
      {
        id: 'p8',
        promptFigure: <PossibilitiesMatcherFigure type="dice" />,
        prompt: 'Két szabályos dobókockával dobunk egyszerre',
        value: '6 · 6 = 36 kimenetel'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Úthálózatok, Számképzés és Visszatevés',
    description: 'Párosítsd a többlépéses feladatokat a helyes összefüggésekkel!',
    pairs: [
      {
        id: 'p9',
        promptFigure: <PossibilitiesMatcherFigure type="roads" />,
        prompt: 'A-ból B-be 3 út, B-ből C-be 4 út vezet. Útvonalak A-ból C-be:',
        value: '3 · 4 = 12 útvonal'
      },
      {
        id: 'p10',
        promptFigure: <PossibilitiesMatcherFigure type="pin" />,
        prompt: '4-jegyű bankkártya PIN kódok száma (0-9 jegyekből)',
        value: '10 · 10 · 10 · 10 = 10 000'
      },
      {
        id: 'p11',
        promptFigure: <PossibilitiesMatcherFigure type="replacement" />,
        prompt: '3-jegyű számok az 1, 2, 3, 4, 5 jegyekből ISMÉTLÉSSEL',
        value: '5 · 5 · 5 = 125 szám'
      },
      {
        id: 'p12',
        promptFigure: <PossibilitiesMatcherFigure type="replacement" />,
        prompt: '3-jegyű számok az 1, 2, 3, 4, 5 jegyekből KÜLÖNBÖZŐ jegyekkel',
        value: '5 · 4 · 3 = 60 szám'
      },
      {
        id: 'p13',
        promptFigure: <PossibilitiesMatcherFigure type="roads" />,
        prompt: 'A-ból B-be 3 út, oda-vissza utazás KÜLÖNBÖZŐ utakon',
        value: '3 · 2 = 6 oda-vissza út'
      },
      {
        id: 'p14',
        promptFigure: <PossibilitiesMatcherFigure type="pin" />,
        prompt: '3-jegyű számok a 0, 1, 2, 3 jegyekből (különböző jegyek, 0 nem az élen)',
        value: '3 · 3 · 2 = 18 szám'
      },
      {
        id: 'p15',
        promptFigure: <PossibilitiesMatcherFigure type="replacement" />,
        prompt: '8 fős futóversenyen dobogós helyezések (arany, ezüst, bronz)',
        value: '8 · 7 · 6 = 336 dobogó'
      },
      {
        id: 'p16',
        promptFigure: <PossibilitiesMatcherFigure type="pin" />,
        prompt: '4-jegyű kód az A, B, C betűkből ismétlés megengedésével',
        value: '3 · 3 · 3 · 3 = 81 kód'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szita-formula, Komplementer és Esetszétválasztás',
    description: 'Párosítsd a halmazos és komplementer esetszámításokat a végeredményekkel!',
    pairs: [
      {
        id: 'p17',
        promptFigure: <PossibilitiesMatcherFigure type="sieve" />,
        prompt: '20 diák: 14 matek, 10 fizika szakkörös, 6 mindkettő. Legalább egyik:',
        value: '14 + 10 - 6 = 18 diák'
      },
      {
        id: 'p18',
        promptFigure: <PossibilitiesMatcherFigure type="tree" />,
        prompt: '3 érmedobásnál LEGALÁBB egy fej dobásának esetei (Komplementer)',
        value: '8 - 1 (ÍÍÍ) = 7 eset'
      },
      {
        id: 'p19',
        promptFigure: <PossibilitiesMatcherFigure type="roads" />,
        prompt: 'A-ból C-be B-n át (2 · 3) VAGY D-n át közvetlenül (4 út)',
        value: '(2 · 3) + 4 = 10 útvonal'
      },
      {
        id: 'p20',
        promptFigure: <PossibilitiesMatcherFigure type="dice" />,
        prompt: 'Két dobókockával dobva az összeg 7 lesz (1+6, 2+5, 3+4, 4+3, 5+2, 6+1)',
        value: '6 kedvező eset / 36'
      },
      {
        id: 'p21',
        promptFigure: <PossibilitiesMatcherFigure type="pin" />,
        prompt: '3-jegyű PÁROS számok az 1, 2, 3, 4, 5 jegyekből (különböző jegyek)',
        value: '2 · (4 · 3) = 24 szám'
      },
      {
        id: 'p22',
        promptFigure: <PossibilitiesMatcherFigure type="sieve" />,
        prompt: 'Számok 1-től 30-ig: 2-vel VAGY 3-mal oszthatók száma (Szita-elv)',
        value: '15 + 10 - 5 = 20 szám'
      },
      {
        id: 'p23',
        promptFigure: <PossibilitiesMatcherFigure type="tree" />,
        prompt: 'Két dobókocka dobásakor KÜLÖNBÖZŐ számokat kapunk (Komplementer)',
        value: '36 - 6 (egyformák) = 30 eset'
      },
      {
        id: 'p24',
        promptFigure: <PossibilitiesMatcherFigure type="replacement" />,
        prompt: '5 különböző könyvből 2 kiválasztása egymás mellé a polcon',
        value: '5 · 4 = 20 elrendezés'
      }
    ]
  }
};

export const PossibilitiesMatcher: React.FC<PossibilitiesMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-how-many-cases',
  topicTitle = '3. Hány eset van?'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Esetszámolás Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a döntési feladványokat a matematikai kiszámításokkal és végeredményekkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
