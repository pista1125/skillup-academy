import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ElementaryGeometrySummaryMatcherProps {
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

const ELEMENTARY_GEOMETRY_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Fogalmak",
    description: "Párosítsd a fogalmat a meghatározásával!",
    pairs: [
      { id: 'egm101', left: "köré írt kör középpontja", right: "az oldalfelező merőlegesek metszéspontja" },
      { id: 'egm102', left: "beírt kör középpontja", right: "a belső szögfelezők metszéspontja" },
      { id: 'egm103', left: "magasságpont", right: "a magasságvonalak metszéspontja" },
      { id: 'egm104', left: "súlypont", right: "a súlyvonalak metszéspontja" },
      { id: 'egm105', left: "mellékszögek", right: "összegük 180°, egy száruk közös" },
      { id: 'egm106', left: "pótszögek", right: "összegük 90°" },
      { id: 'egm107', left: "kör", right: "a sík adott pontjától adott távolságra lévő pontok" },
      { id: 'egm108', left: "szakaszfelező merőleges", right: "a két végponttól egyenlő távol lévő pontok" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Sokszögek adatai",
    description: "Párosítsd a sokszöget a kérdezett adattal!",
    pairs: [
      { id: 'egm201', left: "hétszög belső szögösszege", right: "900°" },
      { id: 'egm202', left: "tízszög átlóinak száma", right: "35" },
      { id: 'egm203', left: "szabályos hatszög egy belső szöge", right: "120°" },
      { id: 'egm204', left: "szabályos ötszög egy belső szöge", right: "108°" },
      { id: 'egm205', left: "12-szög egy csúcsából induló átlók", right: "9" },
      { id: 'egm206', left: "bármely konvex sokszög külső szögösszege", right: "360°" },
      { id: 'egm207', left: "szabályos nyolcszög egy belső szöge", right: "135°" },
      { id: 'egm208', left: "szabályos 20-szög egy külső szöge", right: "18°" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: 'egm301', left: "óramutatók szöge 7 órakor", right: "150°" },
      { id: 'egm302', left: "óramutatók szöge fél 4-kor", right: "75°" },
      { id: 'egm303', left: "külső szögek 3 : 5 : 7 – a legkisebb belső szög", right: "12°" },
      { id: 'egm304', left: "35 és 91 cm-es oldal, egész harmadik: háromszögek száma", right: "69" },
      { id: 'egm305', left: "65 átlós szabályos sokszög oldalszáma", right: "13" },
      { id: 'egm306', left: "derékszögű háromszög, KM = 8 cm: a köré írt kör átmérője", right: "16 cm" },
      { id: 'egm307', left: "18 cm-es súlyvonal: a súlypont távolsága a csúcstól", right: "12 cm" },
      { id: 'egm308', left: "derékszögű háromszög, magasság és szögfelező szöge 20°: a kisebbik hegyesszög", right: "25°" }
    ]
  }
};

export const ElementaryGeometrySummaryMatcher: React.FC<ElementaryGeometrySummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-elemi-geometria-matcher',
  topicTitle = "7. Elemi geometria – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="elemi-geometria"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a meghatározásukkal, a sokszögeket az adataikkal és a feladatokat az eredményükkel!"
      levels={ELEMENTARY_GEOMETRY_SUMMARY_MATCHER_LEVELS}
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

export default ElementaryGeometrySummaryMatcher;
