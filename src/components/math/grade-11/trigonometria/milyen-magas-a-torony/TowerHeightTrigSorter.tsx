import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TowerHeightTrigSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const TOWER_HEIGHT_TRIG_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szögfüggvény kell?',
    description: 'Döntsd el, melyik szögfüggvénnyel számolunk az adott lépésben!',
    categories: [
      { id: 'tg', name: 'tangens (két befogó)', color: 'amber' },
      { id: 'cos', name: 'koszinusz (melletti befogó és átfogó)', color: 'emerald' },
      { id: 'sin', name: 'szinusz (szemközti befogó és átfogó)', color: 'rose' }
    ],
    items: [
      { id: 'thts1', text: 'AK a 250 m-es KL-ből és az ALK∢ = 36°-ból', categoryId: 'tg' },
      { id: 'thts2', text: 'AB az AK-ból és az AKB∢ = 32°-ból', categoryId: 'tg' },
      { id: 'thts3', text: 'LED: megvilágított kör sugara a magasságból és a félszögből', categoryId: 'tg' },
      { id: 'thts4', text: 'AL a 250 m-es KL-ből és az ALK∢ = 36°-ból', categoryId: 'cos' },
      { id: 'thts5', text: 'Tető oldallapjának magassága a fél alapélből (5 m) és a 40°-ból', categoryId: 'cos' },
      { id: 'thts6', text: 'Tetraéder: oldalél és alaplap szöge (vetület : oldalél)', categoryId: 'cos' },
      { id: 'thts7', text: 'Téglatest: testátló és oldallap szöge (merőleges él : testátló)', categoryId: 'sin' },
      { id: 'thts8', text: 'Gúla: két szomszédos oldalél szögének fele (fél alapél : oldalél)', categoryId: 'sin' },
      { id: 'thts9', text: 'Tetraéder: oldalél és magasság szöge (vetület : oldalél)', categoryId: 'sin' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen szög ez?',
    description: 'Csoportosítsd a szögeket: emelkedési szög, depressziószög vagy a vízszintes síkban mért szög?',
    categories: [
      { id: 'up', name: 'Emelkedési szög', color: 'blue' },
      { id: 'down', name: 'Depressziószög', color: 'purple' },
      { id: 'flat', name: 'Vízszintes síkban mért szög', color: 'teal' }
    ],
    items: [
      { id: 'thts10', text: 'K-ból a torony csúcsa 32°-ban látszik', categoryId: 'up' },
      { id: 'thts11', text: 'Péter a fa tetejét 22°-ban látja', categoryId: 'up' },
      { id: 'thts12', text: 'L-ből a torony csúcsa kb. 20°-ban látszik', categoryId: 'up' },
      { id: 'thts13', text: 'Péter a fa alját 10°-ban látja', categoryId: 'down' },
      { id: 'thts14', text: 'Hegytetőről a szomszédos csúcs 6°-kal a vízszintes alatt látszik', categoryId: 'down' },
      { id: 'thts15', text: 'A torony tetejéről egy lent álló autó felé néző látósugár szöge', categoryId: 'down' },
      { id: 'thts16', text: 'A parton mért ALK∢ = 36°', categoryId: 'flat' },
      { id: 'thts17', text: 'Az AKL∢ = 90° (K-nál merőlegesen mentünk el)', categoryId: 'flat' },
      { id: 'thts18', text: 'Felülnézetben az AM és az AK irány szöge (M a KL felezőpontja)', categoryId: 'flat' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'thts19', text: 'A függőleges torony merőleges a vízszintes sík minden egyenesére', categoryId: 'true' },
      { id: 'thts20', text: 'A kocka testátlójának a fedőlappal bezárt szöge nem függ az élhossztól', categoryId: 'true' },
      { id: 'thts21', text: 'Ugyanazon egyenes mentén távolodva a toronytól az emelkedési szög csökken', categoryId: 'true' },
      { id: 'thts22', text: 'Az ALK∢ = 36° a torony emelkedési szöge L-ből', categoryId: 'false' },
      { id: 'thts23', text: 'A KL felezőpontjából a torony a K-ból és L-ből mért szögek átlagában látszik', categoryId: 'false' },
      { id: 'thts24', text: 'A megvilágított kör sugara h · tg(világítási szög)', categoryId: 'false' },
      { id: 'thts25', text: 'A torony magasabb, mint a K ponttól mért távolsága', categoryId: 'depends' },
      { id: 'thts26', text: 'Egy gúla alakú tető oldalélei 30°-nál nagyobb szöget zárnak be a vízszintessel', categoryId: 'depends' },
      { id: 'thts27', text: 'Egy LED-lámpa a teljes 80 cm-es asztallapot megvilágítja', categoryId: 'depends' }
    ]
  }
];

const TOWER_HEIGHT_TRIG_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TOWER_HEIGHT_TRIG_SORTER_LEVELS_LIST[0],
  2: TOWER_HEIGHT_TRIG_SORTER_LEVELS_LIST[1],
  3: TOWER_HEIGHT_TRIG_SORTER_LEVELS_LIST[2]
};

export const TowerHeightTrigSorter: React.FC<TowerHeightTrigSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-torony-sorter',
  topicTitle = 'Ráadás: Milyen magas a torony? – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="milyen-magas-a-torony"
      title={topicTitle}
      subtitle="Rendszerezd a szögfüggvényeket, a szögtípusokat és az állításokat!"
      levels={TOWER_HEIGHT_TRIG_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default TowerHeightTrigSorter;
