import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Reflection4MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const REFLECTION4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Fogalmak",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: 'g4-geom-tukrozes-m1', left: "tükörtengely", right: "a tükör helye, a rajzon piros vonal" },
      { id: 'g4-geom-tukrozes-m2', left: "tükörkép", right: "ugyanakkora, ugyanolyan alakú, de fordított" },
      { id: 'g4-geom-tukrozes-m3', left: "szimmetrikus alakzat", right: "a két fele egymás tükörképe" },
      { id: 'g4-geom-tukrozes-m4', left: "szimmetriatengely", right: "mentén összehajtva a felek fedik egymást" },
      { id: 'g4-geom-tukrozes-m5', left: "a víz felszíne", right: "vízszintes tükörtengely" },
      { id: 'g4-geom-tukrozes-m6', left: "félbehajtott lapból kivágott minta", right: "kinyitva szimmetrikus" },
      { id: 'g4-geom-tukrozes-m7', left: "jobbra mutató nyíl függőleges tükörben", right: "balra mutat" },
      { id: 'g4-geom-tukrozes-m8', left: "fa a tó partján", right: "fejjel lefelé látszik a vízben" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hány szimmetriatengely?",
    description: "Párosítsd a síkidomot a szimmetriatengelyei számával!",
    pairs: [
      { id: 'g4-geom-tukrozes-m9', left: "négyzet", right: "4 tengely" },
      { id: 'g4-geom-tukrozes-m10', left: "téglalap (nem négyzet)", right: "2 tengely" },
      { id: 'g4-geom-tukrozes-m11', left: "egyenlő oldalú háromszög", right: "3 tengely" },
      { id: 'g4-geom-tukrozes-m12', left: "„vödör” alakú négyszög", right: "1 tengely" },
      { id: 'g4-geom-tukrozes-m13', left: "ferde négyszög", right: "nincs tengelye" },
      { id: 'g4-geom-tukrozes-m14', left: "kör", right: "végtelen sok tengely" },
      { id: 'g4-geom-tukrozes-m15', left: "hópehely", right: "6 tengely" },
      { id: 'g4-geom-tukrozes-m16', left: "stoptábla (szabályos nyolcszög)", right: "8 tengely" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Tükrözés rácson",
    description: "Párosítsd a feladatot az eredménnyel!",
    pairs: [
      { id: 'g4-geom-tukrozes-m17', left: "pont 3 négyzetnyire a tengelytől – a tükörképe", right: "3 négyzetnyire, a másik oldalon" },
      { id: 'g4-geom-tukrozes-m18', left: "pont 4 négyzetnyire a tengelytől – távolsága a tükörképétől", right: "8 négyzetnyi" },
      { id: 'g4-geom-tukrozes-m19', left: "5 négyzetből álló alakzat a tükörképével együtt", right: "10 négyzet" },
      { id: 'g4-geom-tukrozes-m20', left: "függőleges tengely: a tükörkép sora", right: "ugyanaz a sor" },
      { id: 'g4-geom-tukrozes-m21', left: "vízszintes tengely: a tükörkép oszlopa", right: "ugyanaz az oszlop" },
      { id: 'g4-geom-tukrozes-m22', left: "a tengelyt érintő négyzet tükörképe", right: "szintén a tengelyt érinti" },
      { id: 'g4-geom-tukrozes-m23', left: "2 · 4-es téglalap a tengely mellett + tükörképe", right: "4 · 4-es négyzet" },
      { id: 'g4-geom-tukrozes-m24', left: "fél ház (3 csúcs) + tükörképe", right: "ötszög" }
    ]
  }
];

const REFLECTION4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: REFLECTION4_MATCHER_LEVELS_LIST[0],
  2: REFLECTION4_MATCHER_LEVELS_LIST[1],
  3: REFLECTION4_MATCHER_LEVELS_LIST[2]
};

export const Reflection4Matcher: React.FC<Reflection4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-tukrozes-matcher',
  topicTitle = "4. A tükrözés – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-tukrozes"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, a síkidomokat és a tükrözéses feladatokat!"
      levels={REFLECTION4_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Reflection4Matcher;
