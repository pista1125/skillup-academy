import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  FriezePatternsSvg,
  TessellationSvg,
  EscherTessellationSvg
} from './AppliedFigures';

interface AppliedMatcherProps {
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
    title: '1. Szint: Friz-típusok és Alapműveletek',
    subtitle: 'Párosítsd a szalagornamens típusokat és szimmetriaműveleteket a jellemzőikkel!',
    pairs: [
      {
        id: 'amm1-1',
        prompt: 'Tiszta eltolás (p1 / hop)',
        value: 'Csak egy irányú periodikus v eltolás jellemzi, egyéb szimmetria nincs',
        figure: <FriezePatternsSvg size={70} />
      },
      {
        id: 'amm1-2',
        prompt: 'Csúsztatva tükrözés (p11g / step)',
        value: 'Fél lépésnyi eltolás és a hossztengelyre tükrözés egymásutánja (lábnyom-minta)'
      },
      {
        id: 'amm1-3',
        prompt: 'Függőleges tükrözések (p1m1 / sidle)',
        value: 'A haladási egyenesre merőleges szimmetriatengelyek sora'
      },
      {
        id: 'amm1-4',
        prompt: 'Hosszirányú tükrözés (p11m / jump)',
        value: 'A díszítősor teljes felező egyenese szimmetriatengely'
      },
      {
        id: 'amm1-5',
        prompt: 'Félfordulatos szimmetria (p112 / spin)',
        value: 'A motívumok közötti pontok körüli 180°-os forgásszimmetria'
      },
      {
        id: 'amm1-6',
        prompt: 'Kétszeri egymást követő csúsztatva tükrözés',
        value: 'Tiszta 2v vektorú eltolást eredményez'
      }
    ]
  },
  2: {
    title: '2. Szint: Síklefedések és Csúcsszögek',
    subtitle: 'Kösd össze a sokszögeket a csúcs körüli szögeikkel és parkettázhatóságukkal!',
    pairs: [
      {
        id: 'amm2-1',
        prompt: 'Szabályos háromszög parketta',
        value: '6 × 60° = 360° (pontosan 6 darab zár be egy csúcsot)',
        figure: <TessellationSvg size={70} />
      },
      {
        id: 'amm2-2',
        prompt: 'Négyzetes parketta',
        value: '4 × 90° = 360° (hagyományos derékszögű négyzetháló)'
      },
      {
        id: 'amm2-3',
        prompt: 'Szabályos hatszög parketta',
        value: '3 × 120° = 360° (hatékony természetes méhsejt-rács)'
      },
      {
        id: 'amm2-4',
        prompt: 'Szabályos ötszög',
        value: '3 × 108° = 324° (36° üres hézag marad, önmagában nem parkettáz)'
      },
      {
        id: 'amm2-5',
        prompt: 'Szabályos nyolcszög és négyzet',
        value: '2 × 135° + 90° = 360° (félig szabályos 4.8.8-as mozaik)'
      },
      {
        id: 'amm2-6',
        prompt: 'Tetszőleges háromszög vagy négyszög',
        value: 'Oldalfelezők körüli 180°-os forgatással bármelyik parkettázza a síkot'
      }
    ]
  },
  3: {
    title: '3. Szint: Természeti és Művészeti Szimmetriák',
    subtitle: 'Párosítsd a valós és művészi alkalmazásokat a matematikai hátterükkel!',
    pairs: [
      {
        id: 'amm3-1',
        prompt: 'Hópehely kristályszerkezete',
        value: '6 szimmetriatengely és 60°-os forgásszimmetria a hexagonális jégrács miatt'
      },
      {
        id: 'amm3-2',
        prompt: 'Lábnyomok sora a homokban',
        value: 'Csúsztatva tükrözés a haladási vonalra mint tengelyre',
        figure: <EscherTessellationSvg size={70} />
      },
      {
        id: 'amm3-3',
        prompt: 'Escher-módszer a négyszögeknél',
        value: 'Egyik élből kivágott formát párhuzamosan eltoljuk a szemközti élre'
      },
      {
        id: 'amm3-4',
        prompt: 'Alhambra mór palota mozaikjai',
        value: 'A világ legteljesebb történelmi gyűjteménye a 17 síkbeli tapétacsoportból'
      },
      {
        id: 'amm3-5',
        prompt: '2D síkbeli tapétacsoportok száma',
        value: 'Pontosan 17 matematikailag különböző csoport létezik a síkban'
      },
      {
        id: 'amm3-6',
        prompt: 'Két párhuzamos tengelyes tükrözés',
        value: 'A tengelyek közötti d távolság kétszeresével (2d) való merőleges eltolás'
      }
    ]
  }
};

export const AppliedMatcher: React.FC<AppliedMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-gyakorlat-matcher',
  topicTitle = '5. Egybevágósági transzformációk a gyakorlatban'
}) => {
  return (
    <MatcherTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
    />
  );
};

(AppliedMatcher as any).matcherLevels = matcherLevels;


