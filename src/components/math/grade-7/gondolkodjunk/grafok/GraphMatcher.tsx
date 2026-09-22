import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GraphMatcherFigure } from './GraphDiagrams';

interface GraphMatcherProps {
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
    title: '1. Szint: Gráf Alapfogalmak és Fokszámok',
    description: 'Párosítsd a gráfelméleti alapfogalmakat a matematikai definíciókkal és összefüggésekkel!',
    pairs: [
      {
        id: 'p1',
        promptFigure: <GraphMatcherFigure type="degree" />,
        prompt: 'Csúcs fokszáma: d(v)',
        value: 'A csúcsból kiinduló élek száma'
      },
      {
        id: 'p2',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'A gráfelmélet alaptétele (Kézfogási tétel)',
        value: 'Fokszámösszeg = 2 · Élek száma'
      },
      {
        id: 'p3',
        promptFigure: <GraphMatcherFigure type="isolated" />,
        prompt: 'Izolált csúcs definíciója',
        value: 'Olyan csúcs, amelynek foka 0 (nincs éle)'
      },
      {
        id: 'p4',
        promptFigure: <GraphMatcherFigure type="simple" />,
        prompt: 'Egyszerű gráf feltétele',
        value: 'Nincs benne hurokél és többszörös él'
      },
      {
        id: 'p5',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'Egy gráfban 5 él van. A fokszámok összege:',
        value: '2 · 5 = 10 (mindig páros)'
      },
      {
        id: 'p6',
        promptFigure: <GraphMatcherFigure type="cycle" />,
        prompt: 'Négyzet alakú kör gráf (C₄) éleinek száma:',
        value: '4 él (minden csúcs foka 2)'
      },
      {
        id: 'p7',
        promptFigure: <GraphMatcherFigure type="degree" />,
        prompt: 'Egy gráfban a fokszámok: 2, 2, 3, 3. Élek száma:',
        value: '(2 + 2 + 3 + 3) / 2 = 5 él'
      },
      {
        id: 'p8',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'A páratlan fokszámú csúcsok darabszáma:',
        value: 'Bármely gráfban mindig PÁROS'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Teljes Gráfok és Fa Gráfok',
    description: 'Párosítsd a nevezetes gráftípusokat a pontos élszámokkal és képletekkel!',
    pairs: [
      {
        id: 'p9',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: 'K₃ teljes gráf (háromszög) éleinek száma:',
        value: '(3 · 2) / 2 = 3 él'
      },
      {
        id: 'p10',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: 'K₄ teljes gráf (4 csúcsú teljes gráf) élei:',
        value: '(4 · 3) / 2 = 6 él'
      },
      {
        id: 'p11',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: 'K₅ teljes gráf (5 csúcsú teljes gráf) élei:',
        value: '(5 · 4) / 2 = 10 él'
      },
      {
        id: 'p12',
        promptFigure: <GraphMatcherFigure type="tree" />,
        prompt: 'Egy n csúcsú fa gráf éleinek száma:',
        value: 'n - 1 él (összefüggő és körmentes)'
      },
      {
        id: 'p13',
        promptFigure: <GraphMatcherFigure type="tree" />,
        prompt: '7 csúcsú fa gráf éleinek száma:',
        value: '7 - 1 = 6 él'
      },
      {
        id: 'p14',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: 'Egy n csúcsú teljes gráf (Kₙ) egy csúcsának foka:',
        value: 'd(v) = n - 1'
      },
      {
        id: 'p15',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: 'K₆ teljes gráf éleinek száma:',
        value: '(6 · 5) / 2 = 15 él'
      },
      {
        id: 'p16',
        promptFigure: <GraphMatcherFigure type="tree" />,
        prompt: 'Egy 10 csúcsú fa gráf fokszámösszege:',
        value: '2 · (10 - 1) = 18'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kézfogások, Körmérkőzések és Logikai Tételek',
    description: 'Párosítsd a gyakorlati hálózati és kombinatorikai feladványokat a megoldásokkal!',
    pairs: [
      {
        id: 'p17',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: '8 fős társaságban mindenki mindenkivel kezet fog:',
        value: '(8 · 7) / 2 = 28 kézfogás'
      },
      {
        id: 'p18',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: '6 csapatos focibajnokság körmérkőzéseinek száma:',
        value: '(6 · 5) / 2 = 15 mérkőzés'
      },
      {
        id: 'p19',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'Létezhet-e olyan egyszerű gráf, amelynek fokszámai: 1, 3, 3, 4?',
        value: 'NEM (3 db páratlan fokszám, összeg=11)'
      },
      {
        id: 'p20',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'Létezhet-e 4 csúcsú egyszerű gráf 4, 3, 2, 1 fokszámokkal?',
        value: 'NEM (4 csúcsnál a max fokszám 3 lehet)'
      },
      {
        id: 'p21',
        promptFigure: <GraphMatcherFigure type="tree" />,
        prompt: 'Fa gráf minden levelének (végpontjának) fokszáma:',
        value: 'd(v) = 1'
      },
      {
        id: 'p22',
        promptFigure: <GraphMatcherFigure type="complete" />,
        prompt: '10 fős társaság kézfogásai (K₁₀ élszáma):',
        value: '(10 · 9) / 2 = 45 kézfogás'
      },
      {
        id: 'p23',
        promptFigure: <GraphMatcherFigure type="cycle" />,
        prompt: 'Egy 5 csúcsú kör gráf (C₅) élszáma és fokszámösszege:',
        value: '5 él, fokszámösszeg = 10'
      },
      {
        id: 'p24',
        promptFigure: <GraphMatcherFigure type="handshake" />,
        prompt: 'Gráf fokszámai: 3, 3, 2, 2, 2. Az élek száma:',
        value: '(3 + 3 + 2 + 2 + 2) / 2 = 6 él'
      }
    ]
  }
};

export const GraphMatcher: React.FC<GraphMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-graphs',
  topicTitle = '4. Gráfok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Gráfelmélet Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a gráfelméleti összefüggéseket, élszámokat és fogalmakat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
