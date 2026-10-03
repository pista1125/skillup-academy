import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MotionWorkProblemsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Mozgástípusok és Munkavégzés Csoportosítása',
    subtitle: 'Sorold be az állításokat találkozás, utolérés vagy munkavégzés kategóriába!',
    categories: [
      {
        id: 'cat-meet',
        name: 'Találkozási mozgás (Szembe)',
        description: 'Egymás felé haladás, az utak összeadódnak',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-catch',
        name: 'Utolérési mozgás (Egyirányú)',
        description: 'A gyorsabb utoléri a lassabbat, azonos út',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-work',
        name: 'Együttes munkavégzés & Tartály',
        description: 'Munkások, csapok és lefolyók közös ideje',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Két autó egymással szembe indul két távoli városból',
        category: 'cat-meet'
      },
      {
        id: 's2',
        label: 'A megtett utak összege egyenlő a teljes távolsággal: s₁ + s₂ = s',
        category: 'cat-meet'
      },
      {
        id: 's3',
        label: 'A közeledési sebesség a két jármű sebességének összege: v₁ + v₂',
        category: 'cat-meet'
      },
      {
        id: 's4',
        label: 'Két barát elindul egymás felé és útközben összetalálkoznak',
        category: 'cat-meet'
      },
      {
        id: 's5',
        label: 'A gyorsabb kerékpáros utoléri a korábban induló gyalogost',
        category: 'cat-catch'
      },
      {
        id: 's6',
        label: 'Mindketten ugyanabból a városból indulnak azonos útvonalon',
        category: 'cat-catch'
      },
      {
        id: 's7',
        label: 'A megtett utak egyenlők az utolérés pillanatában: s₁ = s₂',
        category: 'cat-catch'
      },
      {
        id: 's8',
        label: 'A relatív távolságcsökkenés a sebességek különbsége: v₁ - v₂',
        category: 'cat-catch'
      },
      {
        id: 's9',
        label: 'Két kőműves közösen felépít egy téglafalat a házon',
        category: 'cat-work'
      },
      {
        id: 's10',
        label: 'Két vízcsap egyszerre tölt fel egy kerti medencét',
        category: 'cat-work'
      },
      {
        id: 's11',
        label: 'Egy óra alatti teljesítmények összeadása: 1/t₁ + 1/t₂',
        category: 'cat-work'
      },
      {
        id: 's12',
        label: 'Lefolyó csap üríti ki a fürdőkád vizét',
        category: 'cat-work'
      }
    ]
  },
  2: {
    title: '2. Szint: Matematikai Modellek és Elvek',
    subtitle: 'Kategorizáld a fogalmakat és elveket a megfelelő matematikai modell szerint!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenletes mozgás & Folyóvíz',
        description: 's = v · t, folyásirány és szembeszél',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-motion-eq',
        name: 'Kétjárműves mozgásegyenlet',
        description: 'Előnyök és relatív sebességek kezelése',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-recip-work',
        name: 'Reciprok munkavégzési modell',
        description: '1/t törtek összeadása és kivonása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: 's = v · t összefüggés alkalmazása állandó sebességnél',
        category: 'cat-direct'
      },
      {
        id: 's14',
        label: 'Folyásirányban lefelé: v = v_saját + v_folyó',
        category: 'cat-direct'
      },
      {
        id: 's15',
        label: 'Folyásiránnyal szemben: v = v_saját - v_folyó',
        category: 'cat-direct'
      },
      {
        id: 's16',
        label: 'Sebesség átváltása: 1 m/s = 3,6 km/h',
        category: 'cat-direct'
      },
      {
        id: 's17',
        label: 'v₁ · t + v₂ · t = s_összes felírása',
        category: 'cat-motion-eq'
      },
      {
        id: 's18',
        label: 'v₁ · t = v₂ · (t + t_előny) megoldása',
        category: 'cat-motion-eq'
      },
      {
        id: 's19',
        label: 't = s_előny / (v_gyors - v_lassú) alkalmazása',
        category: 'cat-motion-eq'
      },
      {
        id: 's20',
        label: 'Eltérő indulás miatti előny levonása a teljes távolságból',
        category: 'cat-motion-eq'
      },
      {
        id: 's21',
        label: '1 / t₁ + 1 / t₂ = 1 / t_együtt felírása',
        category: 'cat-recip-work'
      },
      {
        id: 's22',
        label: '1 / t_töltő - 1 / t_lefolyó = 1 / t_eredő használata',
        category: 'cat-recip-work'
      },
      {
        id: 's23',
        label: 'Közös nevezőre hozás a munkavégzési törteknél',
        category: 'cat-recip-work'
      },
      {
        id: 's24',
        label: 'A közös munkaidő mindig kisebb a leggyorsabb egyéni idejénél',
        category: 'cat-recip-work'
      }
    ]
  },
  3: {
    title: '3. Szint: Konkrét Algebrai Egyenletek',
    subtitle: 'Rendszerezd az egyenleteket aszerint, hogy milyen feladattípust írnak le!',
    categories: [
      {
        id: 'cat-eq-meet',
        name: 'Találkozási egyenletek',
        description: 's₁ + s₂ = s_összes',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-eq-catch',
        name: 'Utolérési egyenletek',
        description: 's_gyors = s_lassú vagy előny ledolgozása',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-eq-work',
        name: 'Munkavégzési egyenletek',
        description: 'Reciprok egyenletek és közös munkaidő',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: '50t + 40t = 180',
        category: 'cat-eq-meet'
      },
      {
        id: 's26',
        label: '70(t + 0,5) + 90t = 170',
        category: 'cat-eq-meet'
      },
      {
        id: 's27',
        label: 's₁ + s₂ = 240',
        category: 'cat-eq-meet'
      },
      {
        id: 's28',
        label: '(v₁ + v₂) · t = s',
        category: 'cat-eq-meet'
      },
      {
        id: 's29',
        label: '15t = 5(t + 2)',
        category: 'cat-eq-catch'
      },
      {
        id: 's30',
        label: '16t = 4(t + 3)',
        category: 'cat-eq-catch'
      },
      {
        id: 's31',
        label: 'v_gyors · t - v_lassú · t = s₀',
        category: 'cat-eq-catch'
      },
      {
        id: 's32',
        label: 't = 12 / (16 - 4)',
        category: 'cat-eq-catch'
      },
      {
        id: 's33',
        label: '1/12 + 1/6 = 1/t',
        category: 'cat-eq-work'
      },
      {
        id: 's34',
        label: '1/4 - 1/6 = 1/t',
        category: 'cat-eq-work'
      },
      {
        id: 's35',
        label: '1/15 + 1/10 = 1/t',
        category: 'cat-eq-work'
      },
      {
        id: 's36',
        label: 't_együtt = (t₁ · t₂) / (t₁ + t₂)',
        category: 'cat-eq-work'
      }
    ]
  }
};

export const MotionWorkProblemsSorter: React.FC<MotionWorkProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-motion-work-sorter',
  topicTitle = 'Mozgás és Munka Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Mozgás és Munka Csoportosító"
      subtitle="Kategorizáld a mozgás- és munkatípusokat, fizikai modelleket és egyenleteket!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      themeColor="blue"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default MotionWorkProblemsSorter;
