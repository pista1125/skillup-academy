import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DirectProportionGraphMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és a Grafikon Tulajdonságai',
    subtitle: 'Párosítsd a grafikon elemeit, tengelyeit és alapszabályait!',
    pairs: [
      {
        id: 'dpg_m1_1',
        prompt: 'A koordináta-rendszer origójának koordinátái',
        value: 'O(0; 0)'
      },
      {
        id: 'dpg_m1_2',
        prompt: 'A koordináta-rendszer vízszintes tengelye',
        value: 'x-tengely (első tengely)'
      },
      {
        id: 'dpg_m1_3',
        prompt: 'A koordináta-rendszer függőleges tengelye',
        value: 'y-tengely (második tengely)'
      },
      {
        id: 'dpg_m1_4',
        prompt: 'Az egyenes arányosság grafikonjának egyenlete',
        value: 'y = k · x'
      },
      {
        id: 'dpg_m1_5',
        prompt: 'Az arányossági tényező (k) leolvasása egy pontból',
        value: 'k = y / x'
      },
      {
        id: 'dpg_m1_6',
        prompt: 'Mikor ábrázoljuk az arányosságot pontsorként?',
        value: 'Ha a mennyiség csak egész darabokban létezik (pl. füzet, jegy)'
      },
      {
        id: 'dpg_m1_7',
        prompt: 'Mikor húzunk folytonos félegyenest?',
        value: 'Ha a mennyiség tetszőleges törtrészekre is osztható (út, idő, tömeg)'
      },
      {
        id: 'dpg_m1_8',
        prompt: 'Egyenes arányosság grafikonjának iránya balról jobbra',
        value: 'Felfelé emelkedő vonal'
      }
    ]
  },
  2: {
    title: '2. Szint: Értékpárok és Arányossági Tényező',
    subtitle: 'Határozd meg az összetartozó x és y koordinátákat és a tényezőt!',
    pairs: [
      {
        id: 'dpg_m2_1',
        prompt: 'y = 4 · x egyenesnél x = 3 esetén az y értéke',
        value: 'y = 12'
      },
      {
        id: 'dpg_m2_2',
        prompt: 'P(2; 500) ponton átmenő egyenesnél a k értéke',
        value: 'k = 250'
      },
      {
        id: 'dpg_m2_3',
        prompt: 'y = 500 · x vásárlásnál 3 kg áru ára',
        value: '1500 Ft'
      },
      {
        id: 'dpg_m2_4',
        prompt: 'P(4; 28) pont esetén az arányossági tényező (k)',
        value: 'k = 7'
      },
      {
        id: 'dpg_m2_5',
        prompt: 'v = 60 km/h sebességű jármű útja 3 óra alatt',
        value: '180 km'
      },
      {
        id: 'dpg_m2_6',
        prompt: 'y = 4 · x egyenesnél x értéke, ha y = 20',
        value: 'x = 5'
      },
      {
        id: 'dpg_m2_7',
        prompt: 'y = 8 · x egyenesnél y értéke, ha x = 7',
        value: 'y = 56'
      },
      {
        id: 'dpg_m2_8',
        prompt: 'y = 120 · x egyenletnél x = 0,5 esetén y',
        value: 'y = 60'
      }
    ]
  },
  3: {
    title: '3. Szint: Meredekség és Összetett Grafikonos Összefüggések',
    subtitle: 'Elemezd az egyenesek meredekségét és a pontok elhelyezkedését!',
    pairs: [
      {
        id: 'dpg_m3_1',
        prompt: 'y = 6x meredeksége az y = 2x grafikonhoz képest',
        value: '3-szor meredekebb egyenes'
      },
      {
        id: 'dpg_m3_2',
        prompt: 'A (0; 500) pontból induló, felfelé emelkedő egyenes vonal',
        value: 'NEM egyenes arányosság (nem az origóból indul)'
      },
      {
        id: 'dpg_m3_3',
        prompt: 's = 40 · t mozgásnál 200 km megtételéhez szükséges idő',
        value: '5 óra'
      },
      {
        id: 'dpg_m3_4',
        prompt: 'A grafikon átmegy a P(1,5 óra; 90 km) ponton. Sebesség:',
        value: 'v = 60 km/h'
      },
      {
        id: 'dpg_m3_5',
        prompt: 'A P(4; 18) és Q(6; 27) pontok arányossági tényezője (k)',
        value: 'k = 4,5'
      },
      {
        id: 'dpg_m3_6',
        prompt: 'P(5; 40) ponton átmenő grafikon magassága x = 1-nél',
        value: 'y = 8'
      },
      {
        id: 'dpg_m3_7',
        prompt: 'y = 250x vásárlásnál 2000 Ft-ért kapható kg mennyiség',
        value: '8 kg'
      },
      {
        id: 'dpg_m3_8',
        prompt: 'y₁ = 80x és y₂ = 60x közötti távolság x = 2 óránál',
        value: '40 km különbség'
      }
    ]
  }
};

export const DirectProportionGraphMatcher: React.FC<DirectProportionGraphMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-direct-prop-graph-matcher',
  topicTitle = 'Egyenes arányosság grafikonja (Párosító)'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      themeColor="lime"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default DirectProportionGraphMatcher;
