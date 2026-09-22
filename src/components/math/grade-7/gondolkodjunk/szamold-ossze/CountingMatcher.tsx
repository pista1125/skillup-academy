import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CountingMatcherFigure } from './CountingDiagrams';


const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfeladványok és Szorzási Szabály',
    description: 'Párosítsd a feladványokat a pontos matematikai kiszámításokkal és eredményekkel!',
    pairs: [
      {
        id: 'p1',
        promptFigure: <CountingMatcherFigure type="tree" />,
        prompt: '3 pénzérme feldobásának kimenetelei',
        value: '2 · 2 · 2 = 8 eset (FFF, FFÍ...)'
      },
      {
        id: 'p2',
        promptFigure: <CountingMatcherFigure type="tree" />,
        prompt: '3 póló és 4 nadrág kombinációi',
        value: '3 · 4 = 12 különböző öltözet'
      },
      {
        id: 'p3',
        promptFigure: <CountingMatcherFigure type="permutation" />,
        prompt: '1, 2, 3 jegyekből 3-jegyű számok (különböző jegyek)',
        value: '3 · 2 · 1 = 6 különböző szám'
      },
      {
        id: 'p4',
        promptFigure: <CountingMatcherFigure type="dice" />,
        prompt: 'Két szabályos dobókocka kimenetelei',
        value: '6 · 6 = 36 lehetséges dobáspár'
      },
      {
        id: 'p5',
        promptFigure: <CountingMatcherFigure type="socks" />,
        prompt: '2 színű zokniból biztos 1 pár húzása',
        value: '2 + 1 = 3 db húzás szükséges'
      },
      {
        id: 'p6',
        promptFigure: <CountingMatcherFigure type="pigeonhole" />,
        prompt: 'Garantáltan 2 azonos születési hónap',
        value: '12 + 1 = 13 ember szükséges'
      },
      {
        id: 'p7',
        promptFigure: <CountingMatcherFigure type="venn" />,
        prompt: 'Diszjunkt halmazok uniója (|A|=6, |B|=4)',
        value: '|A ∪ B| = 6 + 4 = 10 elem'
      },
      {
        id: 'p8',
        promptFigure: <CountingMatcherFigure type="tree" />,
        prompt: '2 féle levesből és 3 féle főételből menü',
        value: '2 · 3 = 6 féle 2-fogásos ebéd'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szorzási Szabály, Szita-formula & Skatulya-elv',
    description: 'Párosítsd az összetettebb kombinatorikai eseteket a pontos levezetésekkel!',
    pairs: [
      {
        id: 'p9',
        promptFigure: <CountingMatcherFigure type="permutation" />,
        prompt: '0, 4, 7, 9 jegyekből 3-jegyű számok (különböző jegyekkel)',
        value: '3 · 3 · 2 = 18 szám (első nem 0)'
      },
      {
        id: 'p10',
        promptFigure: <CountingMatcherFigure type="permutation" />,
        prompt: '4 jóbarát sorba ültetése egy padon',
        value: '4 · 3 · 2 · 1 = 24 ülésrend'
      },
      {
        id: 'p11',
        promptFigure: <CountingMatcherFigure type="dice" />,
        prompt: 'Két kockával dobva az összeg = 7',
        value: '6 eset: (1,6), (2,5), (3,4)...'
      },
      {
        id: 'p12',
        promptFigure: <CountingMatcherFigure type="pins" />,
        prompt: '4-jegyű különböző jegyű PIN kód',
        value: '10 · 9 · 8 · 7 = 5040 kód'
      },
      {
        id: 'p13',
        promptFigure: <CountingMatcherFigure type="venn" />,
        prompt: '|A|=18, |B|=14, |A ∩ B|=6 uniója',
        value: '|A ∪ B| = 18 + 14 - 6 = 26 elem'
      },
      {
        id: 'p14',
        promptFigure: <CountingMatcherFigure type="pigeonhole" />,
        prompt: '3 színű golyóból biztosan 3 egyszínű',
        value: '2 · 3 + 1 = 7 húzás kell a garanciához'
      },
      {
        id: 'p15',
        promptFigure: <CountingMatcherFigure type="venn" />,
        prompt: '1-től 60-ig 2-vel VAGY 3-mal osztható számok',
        value: '30 + 20 - 10 = 40 szám (szita)'
      },
      {
        id: 'p16',
        promptFigure: <CountingMatcherFigure type="pigeonhole" />,
        prompt: 'Garantáltan 2 azonos napon született a héten',
        value: '7 + 1 = 8 ember szükséges'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesteri Kombinatorika & Komplementer Módszer',
    description: 'Párosítsd a magasabb szintű logikai összefüggéseket és komplementer eseteket!',
    pairs: [
      {
        id: 'p17',
        promptFigure: <CountingMatcherFigure type="tournament" />,
        prompt: '8 fős sakkverseny körmérkőzései (mindenki mindenkivel)',
        value: '(8 · 7) / 2 = 28 mérkőzés'
      },
      {
        id: 'p18',
        promptFigure: <CountingMatcherFigure type="complement" />,
        prompt: 'Két kocka szorzata PÁROS',
        value: '36 - 9 (páratlanok) = 27 eset'
      },
      {
        id: 'p19',
        promptFigure: <CountingMatcherFigure type="socks" />,
        prompt: '10 pár fekete és 10 pár barna kesztyűből biztos 1 pár',
        value: '20 + 1 = 21 húzás (20 balos + 1 jobbos)'
      },
      {
        id: 'p20',
        promptFigure: <CountingMatcherFigure type="complement" />,
        prompt: '3 kockával dobva legalább egy 6-os',
        value: '216 - 125 (nincs 6-os) = 91 eset'
      },
      {
        id: 'p21',
        promptFigure: <CountingMatcherFigure type="permutation" />,
        prompt: '4 emberből 2 nem ül egymás mellett',
        value: '24 (összes) - 12 (szomszédok) = 12 ülésrend'
      },
      {
        id: 'p22',
        promptFigure: <CountingMatcherFigure type="pigeonhole" />,
        prompt: '35 fős osztály 4 szakkörbe osztva',
        value: 'Legnépesebb szakkörben min. ⌈35/4⌉ = 9 fő'
      },
      {
        id: 'p23',
        promptFigure: <CountingMatcherFigure type="tree" />,
        prompt: '4 fős csapatból elnök és titkár választása',
        value: '4 · 3 = 12 lehetséges párosítás'
      },
      {
        id: 'p24',
        promptFigure: <CountingMatcherFigure type="pins" />,
        prompt: '4-jegyű számok 1, 2, 3, 4 jegyekből (ismétlődhetnek)',
        value: '4 · 4 · 4 · 4 = 4⁴ = 256 szám'
      }
    ]
  }
};

interface CountingMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

export const CountingMatcher: React.FC<CountingMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-count-it',
  topicTitle = '1. Számold össze!'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Összeszámlálás Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a feladványokat a matematikai összefüggésekkel és eredményekkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
