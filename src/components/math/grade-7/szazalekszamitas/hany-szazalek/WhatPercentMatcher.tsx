import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WhatPercentMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Törtek és Mennyiségek Százaléka',
    subtitle: 'Párosítsd a kifejezéseket a pontos százalékos értékükkel!',
    pairs: [
      {
        id: 'p1',
        prompt: '24 a 48-nak',
        value: '50% (a fele, 1/2)'
      },
      {
        id: 'p2',
        prompt: '12 a 120-nak',
        value: '10% (tizedrésze, 1/10)'
      },
      {
        id: 'p3',
        prompt: '10 az 50-nek',
        value: '20% (ötödrésze, 1/5)'
      },
      {
        id: 'p4',
        prompt: '10 a 4-nek',
        value: '250% (2,5-szerese)'
      },
      {
        id: 'p5',
        prompt: '15 perc az 1 órának (60 perc)',
        value: '25% (negyed óra)'
      },
      {
        id: 'p6',
        prompt: '15 perc a 2 órának (120 perc)',
        value: '12,5% (nyolcad része)'
      },
      {
        id: 'p7',
        prompt: '12 perc az 1 órának',
        value: '20% (ötödrésze)'
      },
      {
        id: 'p8',
        prompt: '12 perc a fél órának (30 perc)',
        value: '40% (2/5 része)'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorlati Arányok és Statisztikák',
    subtitle: 'Keresd meg a szöveges adatokhoz tartozó pontos százaléklábat!',
    pairs: [
      {
        id: 'p9',
        prompt: '192 GB adat a 256 GB pendrive-on',
        value: '75% a tárhely foglaltsága'
      },
      {
        id: 'p10',
        prompt: '42 kg víz a 60 kg-os emberben',
        value: '70% a test víztartalma'
      },
      {
        id: 'p11',
        prompt: '1320 autó a 3000 háztartásban',
        value: '44% a gépkocsi-arány'
      },
      {
        id: 'p12',
        prompt: '29 440 000 Ft a 32 000 000 Ft-nak',
        value: '92% a lealkudott ár (8% kedvezmény)'
      },
      {
        id: 'p13',
        prompt: 'Matyi 119 pontja a 140-ből',
        value: '85%-os dolgozateredmény'
      },
      {
        id: 'p14',
        prompt: '176 km után hátralévő 264 km (440-ből)',
        value: '60% van még hátra az útból'
      },
      {
        id: 'p15',
        prompt: '27°-os szög a derékszögnek (90°)',
        value: '30%-a a derékszögnek'
      },
      {
        id: 'p16',
        prompt: '27°-os szög a másik hegyesszögnek (63°)',
        value: 'kb. 42,86%-a a 63°-nak'
      }
    ]
  },
  3: {
    title: '3. Szint: Százalékos Változások és Csalóka Alapok',
    subtitle: 'Párosítsd a változásokat a pontos relatív százalékkal!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Lázár tanulása heti 5 óráról 7 órára',
        value: '+40% növekedés (2 / 5)'
      },
      {
        id: 'p18',
        prompt: 'Szendvics ára 250 Ft-ról 180 Ft-ra',
        value: '-28% árcsökkenés (70 / 250)'
      },
      {
        id: 'p19',
        prompt: 'Könyv ára 2000 Ft-ról 1600 Ft-ra',
        value: '-20% leárazás (400 / 2000)'
      },
      {
        id: 'p20',
        prompt: 'Könyv ára 1600 Ft-ról 2000 Ft-ra',
        value: '+25% áremelés (400 / 1600)'
      },
      {
        id: 'p21',
        prompt: 'Tej ára 290 Ft-ról 430 Ft-ra',
        value: 'kb. +48% drágulás (140 / 290)'
      },
      {
        id: 'p22',
        prompt: 'Téglalap területe +20% oldalnöveléssel',
        value: '+44% terület-gyarapodás (1,44-szerese)'
      },
      {
        id: 'p23',
        prompt: 'Morgós Miska 27 iskolás morgása a 120-ból',
        value: '22,5%-a a morgásoknak'
      },
      {
        id: 'p24',
        prompt: 'Aladár 28 anyai rászólása a 40-ből',
        value: '70%-ban anya szól a rendetlenségért'
      }
    ]
  }
};

export const WhatPercentMatcher: React.FC<WhatPercentMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-what-matcher',
  topicTitle = 'Hány százalék?'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="cyan"
      title="Hány százalék? - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default WhatPercentMatcher;
