import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { LineCard80, PieceCard80 } from './GeoIntroG2CardFigures';
import { P } from './GeoIntroG2Parts';

interface GeoIntroG2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen vonal?',
    description: 'Egyenes, görbe vagy törött vonal? Tedd a jó dobozba!',
    categories: [
      { id: 'egyenes', name: 'Egyenes vonal', color: 'sky' },
      { id: 'gorbe', name: 'Görbe vonal', color: 'rose' },
      { id: 'torott', name: 'Törött vonal', color: 'emerald' }
    ],
    items: [
      { id: 'gis1', text: '', categoryId: 'egyenes', figure: <LineCard80 kind="egyenes" v={0} /> },
      { id: 'gis2', text: '', categoryId: 'egyenes', figure: <LineCard80 kind="egyenes" v={1} /> },
      { id: 'gis3', text: 'a kifeszített madzag', categoryId: 'egyenes' },
      { id: 'gis4', text: '', categoryId: 'gorbe', figure: <LineCard80 kind="gorbe" v={1} /> },
      { id: 'gis5', text: '', categoryId: 'gorbe', figure: <LineCard80 kind="gorbe" v={2} /> },
      { id: 'gis6', text: 'a szivárvány íve', categoryId: 'gorbe' },
      { id: 'gis7', text: '', categoryId: 'torott', figure: <LineCard80 kind="torott" v={0} /> },
      { id: 'gis8', text: '', categoryId: 'torott', figure: <LineCard80 kind="torott" v={1} /> },
      { id: 'gis9', text: 'a villám rajza', categoryId: 'torott' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Nyitott vagy zárt?',
    description: 'Van két vége, vagy körbeér? Görbe vagy törött?',
    categories: [
      { id: 'nyitott', name: 'Nyitott vonal', color: 'amber' },
      { id: 'zartgorbe', name: 'Zárt görbe vonal', color: 'purple' },
      { id: 'zarttorott', name: 'Zárt törött vonal', color: 'blue' }
    ],
    items: [
      { id: 'gis10', text: '', categoryId: 'nyitott', figure: <LineCard80 kind="gorbe" v={0} color="#334155" /> },
      { id: 'gis11', text: '', categoryId: 'nyitott', figure: <LineCard80 kind="torott" v={2} color="#334155" /> },
      { id: 'gis12', text: 'egy kígyó rajza', categoryId: 'nyitott' },
      { id: 'gis13', text: '', categoryId: 'zartgorbe', figure: <LineCard80 kind="zartgorbe" v={0} color="#334155" /> },
      { id: 'gis14', text: '', categoryId: 'zartgorbe', figure: <LineCard80 kind="zartgorbe" v={1} color="#334155" /> },
      { id: 'gis15', text: 'a kör határa', categoryId: 'zartgorbe' },
      { id: 'gis16', text: '', categoryId: 'zarttorott', figure: <LineCard80 kind="zarttorott" v={0} color="#334155" /> },
      { id: 'gis17', text: '', categoryId: 'zarttorott', figure: <LineCard80 kind="zarttorott" v={2} color="#334155" /> },
      { id: 'gis18', text: 'a négyzet határa', categoryId: 'zarttorott' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Miben más?',
    description: 'Hasonlítsd össze a NAGY, PIROS, SIMA KÖRREL! Miben más a lap?',
    categories: [
      { id: 'szin', name: 'Csak a színe más', color: 'sky' },
      { id: 'forma', name: 'Csak a formája más', color: 'emerald' },
      { id: 'ketto', name: 'Két dologban más', color: 'rose' }
    ],
    items: [
      { id: 'gis19', text: '', categoryId: 'szin', figure: <PieceCard80 piece={P('kor', 'kek', true, false)} /> },
      { id: 'gis20', text: '', categoryId: 'szin', figure: <PieceCard80 piece={P('kor', 'sarga', true, false)} /> },
      { id: 'gis21', text: '', categoryId: 'szin', figure: <PieceCard80 piece={P('kor', 'zold', true, false)} /> },
      { id: 'gis22', text: '', categoryId: 'forma', figure: <PieceCard80 piece={P('negyzet', 'piros', true, false)} /> },
      { id: 'gis23', text: '', categoryId: 'forma', figure: <PieceCard80 piece={P('haromszog', 'piros', true, false)} /> },
      { id: 'gis24', text: '', categoryId: 'forma', figure: <PieceCard80 piece={P('teglalap', 'piros', true, false)} /> },
      { id: 'gis25', text: '', categoryId: 'ketto', figure: <PieceCard80 piece={P('kor', 'kek', false, false)} /> },
      { id: 'gis26', text: '', categoryId: 'ketto', figure: <PieceCard80 piece={P('haromszog', 'piros', true, true)} /> },
      { id: 'gis27', text: '', categoryId: 'ketto', figure: <PieceCard80 piece={P('negyzet', 'piros', false, false)} /> }
    ]
  }
];

export const GEO_INTRO_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const GeoIntroG2Sorter: React.FC<GeoIntroG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-geo-bevezeto-sorter',
  topicTitle = '1. Tájékozódás, vonalak, logikai lapok – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="bevezeto"
      title={topicTitle}
      subtitle="Válogasd szét a vonalakat és a logikai lapokat!"
      levels={GEO_INTRO_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default GeoIntroG2Sorter;
