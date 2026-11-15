import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbPracticeExamSorterProps {
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

const STAT_PROB_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Középérték, szóródás vagy diagram?',
    description: 'Sorold be a fogalmat a megfelelő csoportba!',
    categories: [
      { id: 'center', name: 'középérték', color: 'blue' },
      { id: 'spread', name: 'szóródási mutató', color: 'amber' },
      { id: 'chart', name: 'diagram', color: 'emerald' }
    ],
    items: [
      { id: 'sps1', text: 'átlag (számtani közép)', categoryId: 'center' },
      { id: 'sps2', text: 'medián', categoryId: 'center' },
      { id: 'sps3', text: 'módusz', categoryId: 'center' },
      { id: 'sps4', text: 'terjedelem', categoryId: 'spread' },
      { id: 'sps5', text: 'félterjedelem (Q₃ − Q₁)', categoryId: 'spread' },
      { id: 'sps6', text: 'szórás', categoryId: 'spread' },
      { id: 'sps7', text: 'kördiagram', categoryId: 'chart' },
      { id: 'sps8', text: 'sávdiagram', categoryId: 'chart' },
      { id: 'sps9', text: 'dobozdiagram', categoryId: 'chart' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a valószínűség?',
    description: 'Számold ki a valószínűséget, és sorold be!',
    categories: [
      { id: 'low', name: 'p < 0,1', color: 'rose' },
      { id: 'mid', name: '0,1 ≤ p < 0,5', color: 'teal' },
      { id: 'high', name: 'p ≥ 0,5', color: 'violet' }
    ],
    items: [
      { id: 'sps10', text: 'metró (p = 0,92): 50 utasból mindenkinek van jegye', categoryId: 'low' },
      { id: 'sps11', text: '36 fős osztály (14 nem olvasott), 4 diák: egyik sem olvasott', categoryId: 'low' },
      { id: 'sps12', text: '1–50 közül 3 szám: kettő osztható 5-tel, egy nem', categoryId: 'low' },
      { id: 'sps13', text: '1–50 közül 3 szám: mind páros', categoryId: 'mid' },
      { id: 'sps14', text: 'Bence (6 óra, p = 0,05): valamelyik órán felel', categoryId: 'mid' },
      { id: 'sps15', text: '10 érmedobás: pontosan 5 fej', categoryId: 'mid' },
      { id: 'sps16', text: 'automata (p = 0,8): 5 napból legalább 4', categoryId: 'high' },
      { id: 'sps17', text: 'ötös lottó: 0 találat', categoryId: 'high' },
      { id: 'sps18', text: '4 kockadobás: legalább egy hatos', categoryId: 'high' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik modellel számolunk?',
    description: 'Döntsd el, milyen eszközzel oldható meg a feladat!',
    categories: [
      { id: 'hyp', name: 'egyszerre / visszatevés nélkül', color: 'amber' },
      { id: 'bin', name: 'binomiális (független ismétlés)', color: 'blue' },
      { id: 'exp', name: 'várható érték', color: 'emerald' }
    ],
    items: [
      { id: 'sps19', text: '1–50 közül 3 különböző szám: mind páros', categoryId: 'hyp' },
      { id: 'sps20', text: '36 fős osztályból 4 tanuló: hárman olvasták A gyűrűk urát', categoryId: 'hyp' },
      { id: 'sps21', text: '64 csomagból 5 LEGO-figura: nincs űrhajós', categoryId: 'hyp' },
      { id: 'sps22', text: 'Anna 5 napon kér vizet az automatából (p = 0,8)', categoryId: 'bin' },
      { id: 'sps23', text: '21 doboz, mindegyik 0,01 eséllyel rossz matricás', categoryId: 'bin' },
      { id: 'sps24', text: '10 leeső vajas pirítós (p = 0,62)', categoryId: 'bin' },
      { id: 'sps25', text: 'a részvény jövő évi átlagos ára', categoryId: 'exp' },
      { id: 'sps26', text: 'a különleges kockával dobott átlagos pontszám', categoryId: 'exp' },
      { id: 'sps27', text: 'egy sorsjegy átlagos nyereménye', categoryId: 'exp' }
    ]
  }
};

export const StatProbPracticeExamSorter: React.FC<StatProbPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-tudasproba-sorter',
  topicTitle = '16. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Csoportosítsd a fogalmakat, a valószínűségeket és a feladatokat a megoldási modell szerint!"
      levels={STAT_PROB_EXAM_SORTER_LEVELS}
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

export default StatProbPracticeExamSorter;
