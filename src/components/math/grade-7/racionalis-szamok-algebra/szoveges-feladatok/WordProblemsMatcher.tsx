import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '1200 Ft 3/4 része', value: '900 Ft' },
      { id: 'p2', prompt: '200 oldal 2/5 része', value: '80 oldal' },
      { id: 'p3', prompt: 'Egy szám 1/3 része 15. A szám:', value: '45' },
      { id: 'p4', prompt: 'Egy szám 2/3 része 40. A szám:', value: '60' },
      { id: 'p5', prompt: '30 perc hányadrésze 1 órának?', value: '1/2' },
      { id: 'p6', prompt: '15 perc hányadrésze 1 órának?', value: '1/4' },
      { id: 'p7', prompt: '500 g 1/5 része', value: '100 g' },
      { id: 'p8', prompt: 'Egy szám 3/4 része 30. A szám:', value: '40' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '4000 Ft-ból elköltöttük a 3/5-ét. Költés:', value: '2400 Ft' },
      { id: 'p10', prompt: '4000 Ft 3/5-ét elköltve megmaradt:', value: '1600 Ft' },
      { id: 'p11', prompt: '300 km-es út 2/3 része', value: '200 km' },
      { id: 'p12', prompt: 'Egy szám 5/6 része 50. A szám:', value: '60' },
      { id: 'p13', prompt: '45 perc hányadrésze 1 órának?', value: '3/4' },
      { id: 'p14', prompt: '200 m hányadrésze 1 km-nek?', value: '1/5' },
      { id: 'p15', prompt: '80 liter 3/8 része', value: '30 liter' },
      { id: 'p16', prompt: 'Egy összeg 4/5 része 1200 Ft. Az összeg:', value: '1500 Ft' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '60 fős csoport 3/5-e fiú. Fiúk száma:', value: '36 fő' },
      { id: 'p18', prompt: '36 fiú 1/4-e szemüveges. Szemüvegesek:', value: '9 fő' },
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
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Szöveges Feladatok Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a szöveges kérdéseket a pontos válaszokkal!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
