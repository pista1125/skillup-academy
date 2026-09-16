import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '600 Ft-nak az 1/3 része', value: '200 Ft' },
      { id: 'p2', prompt: '1000 Ft-nak a 3/4 része', value: '750 Ft' },
      { id: 'p3', prompt: 'Egy szám 1/2 része 40. A szám:', value: '80' },
      { id: 'p4', prompt: 'Egy szám 1/4 része 15. A szám:', value: '60' },
      { id: 'p5', prompt: '1 órának (60 perc) a 2/3 része', value: '40 perc' },
      { id: 'p6', prompt: '24 diák 3/4 része lány. Hány lány van?', value: '18 lány' },
      { id: 'p7', prompt: '500 méter 1/5 része', value: '100 m' },
      { id: 'p8', prompt: 'Egy szám 2/3 része 30. A szám:', value: '45' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: 'Elköltöttük a pénzünk 2/5-ét. Maradt:', value: '3/5 rész' },
      { id: 'p10', prompt: 'Elolvastuk a könyv 5/8-át. Hátravan:', value: '3/8 rész' },
      { id: 'p11', prompt: 'Egy szám 3/5 része 45. A szám:', value: '75' },
      { id: 'p12', prompt: 'Egy szám 4/7 része 28. A szám:', value: '49' },
      { id: 'p13', prompt: '80-nak az 5/4 része (több az egésznél)', value: '100' },
      { id: 'p14', prompt: '120 liter 3/8 része', value: '45 liter' },
      { id: 'p15', prompt: '30 dkg a 60 dkg-nak hányadrésze?', value: '1/2 része' },
      { id: 'p16', prompt: '20 perc hányadrésze 1 órának?', value: '1/3 része' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: 'A pénzünk 3/8-a 1500 Ft. Mennyi az egész?', value: '4000 Ft' },
      { id: 'p18', prompt: 'A maradék 2/5-e 200 Ft. Mennyi a maradék?', value: '500 Ft' },
      { id: 'p19', prompt: 'Elköltöttük az 1/3-át, majd a maradék felét:', value: '1/3 maradt meg' },
      { id: 'p20', prompt: 'Egy szám 3/4-ének 2/3-a 20. A szám:', value: '40' },
      { id: 'p21', prompt: '150 Ft a 600 Ft-nak hányadrésze?', value: '1/4 része' },
      { id: 'p22', prompt: 'Tank 3/4-e tele, 15 liter hiányzik. Tank:', value: '60 liter' },
      { id: 'p23', prompt: '75 perc hányadrésze 2 órának?', value: '5/8 része' },
      { id: 'p24', prompt: '800 Ft-nak az 5/4 része', value: '1000 Ft' },
    ]
  }
};

export const WordProblemsMatcher: React.FC<WordProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  topicId = 'g7-rat-word-problems',
  topicTitle = '4. Szöveges feladatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="racionalis-szamok-algebra"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Szöveges Feladatok Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a szöveges kérdéseket a pontos válaszokkal!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
