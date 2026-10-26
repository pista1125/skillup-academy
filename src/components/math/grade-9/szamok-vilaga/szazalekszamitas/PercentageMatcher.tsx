import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentageMatcherProps {
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
    title: '1. Szint: Törtek, Tizedestörtek és Százalékok (Könnyű)',
    subtitle: 'Párosítsd a tört és tizedestört alakokat a százalékos értékükkel!',
    pairs: [
      {
        id: 'pcm1-1',
        prompt: '1/2 (egy ketted, fele)',
        value: '50% (0,50)'
      },
      {
        id: 'pcm1-2',
        prompt: '1/4 (egy negyed)',
        value: '25% (0,25)'
      },
      {
        id: 'pcm1-3',
        prompt: '3/4 (három negyed)',
        value: '75% (0,75)'
      },
      {
        id: 'pcm1-4',
        prompt: '1/5 (egy ötöd)',
        value: '20% (0,20)'
      },
      {
        id: 'pcm1-5',
        prompt: '1/10 (egy tized)',
        value: '10% (0,10)'
      },
      {
        id: 'pcm1-6',
        prompt: '0,08 (nyolc század)',
        value: '8%'
      },
      {
        id: 'pcm1-7',
        prompt: '0,35 (harmincöt század)',
        value: '35%'
      },
      {
        id: 'pcm1-8',
        prompt: '1,00 (egy egész Alap)',
        value: '100%'
      }
    ]
  },
  2: {
    title: '2. Szint: Szorzótényezők és Kördiagramok (Közepes)',
    subtitle: 'Párosítsd a százalékos változást a közvetlen szorzótényezőjével vagy szögével!',
    pairs: [
      {
        id: 'pcm2-1',
        prompt: '+20% áremelés szorzótényezője',
        value: '· 1,20'
      },
      {
        id: 'pcm2-2',
        prompt: '-15% leárazás szorzótényezője',
        value: '· 0,85'
      },
      {
        id: 'pcm2-3',
        prompt: '+27% magyar ÁFA szorzótényezője',
        value: '· 1,27 (Bruttó = Nettó · 1,27)'
      },
      {
        id: 'pcm2-4',
        prompt: '-30% kiárusítás szorzótényezője',
        value: '· 0,70'
      },
      {
        id: 'pcm2-5',
        prompt: '+5% kamat szorzótényezője',
        value: '· 1,05'
      },
      {
        id: 'pcm2-6',
        prompt: '25%-os kördiagram szektor középponti szöge',
        value: '90° (derékszög, 360° · 0,25)'
      },
      {
        id: 'pcm2-7',
        prompt: '50%-os kördiagram szektor középponti szöge',
        value: '180° (félkör)'
      },
      {
        id: 'pcm2-8',
        prompt: '10%-os kördiagram szektor középponti szöge',
        value: '36° (360° · 0,10)'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi Feladványok és Számítások (Nehéz)',
    subtitle: 'Párosítsd a százalékszámítási problémát a helyes végeredménnyel!',
    pairs: [
      {
        id: 'pcm3-1',
        prompt: '500-nak a 20%-a',
        value: '100 (500 · 0,20)'
      },
      {
        id: 'pcm3-2',
        prompt: '80 000 Ft nettó ár bruttó értéke (27% ÁFA)',
        value: '101 600 Ft (80 000 · 1,27)'
      },
      {
        id: 'pcm3-3',
        prompt: '25 400 Ft bruttó fogyasztói ár nettó értéke',
        value: '20 000 Ft (25 400 / 1,27)'
      },
      {
        id: 'pcm3-4',
        prompt: '14 000 Ft akciós ár 30% kedvezmény után: eredeti ár',
        value: '20 000 Ft (14 000 / 0,70)'
      },
      {
        id: 'pcm3-5',
        prompt: '+20% emelés majd -20% leárazás végső hatása',
        value: '4% veszteség (1,20 · 0,80 = 0,96)'
      },
      {
        id: 'pcm3-6',
        prompt: 'Kétszeri -10%-os leárazás összevont hatása',
        value: '19% engedmény (0,90 · 0,90 = 0,81)'
      },
      {
        id: 'pcm3-7',
        prompt: 'Kamat 8%-ról 10%-ra nő: relatív növekedés',
        value: '25% növekedés (2 százalékpont mellett)'
      },
      {
        id: 'pcm3-8',
        prompt: 'Kocka éle +10%-kal nő: térfogatának változása',
        value: '+33,1% növekedés (1,10³ = 1,331)'
      }
    ]
  }
};

export const PercentageMatcher: React.FC<PercentageMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level;

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
      topicId={topicId || 'g9-szamok-szazalek-matcher'}
      topicTitle={topicTitle || 'Százalékszámítás Párosító'}
    />
  );
};

export default PercentageMatcher;
