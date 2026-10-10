import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeMatcherProps {
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
    title: '1. Szint: Alapesetek és ÁFA Fejszámolás',
    subtitle: 'Párosítsd a feladat szöveges adatait a pontos számítási eredménnyel!',
    pairs: [
      {
        id: 'p1',
        prompt: '150 g csoki 45%-a kakaó',
        value: '67,5 g kakaótartalom'
      },
      {
        id: 'p2',
        prompt: 'Andris 32 jó feladata a dolgozat 80%-a',
        value: '40 feladat volt összesen'
      },
      {
        id: 'p3',
        prompt: 'Adorján lájkjai 68-ról 85-re nőttek',
        value: '+25% növekedés (17 / 68)'
      },
      {
        id: 'p4',
        prompt: '25 tanulóból 5 kapott jelest',
        value: '20% jeles dolgozat'
      },
      {
        id: 'p5',
        prompt: '5600 Ft nettó könyv 5% ÁFA-val',
        value: '5880 Ft bruttó ár (· 1,05)'
      },
      {
        id: 'p6',
        prompt: '500 Ft nettó keksz 27% ÁFA-val',
        value: '635 Ft bruttó ár (· 1,27)'
      },
      {
        id: 'p7',
        prompt: '700 Ft sajt 25% kedvezménnyel',
        value: '525 Ft akciós ár (· 0,75)'
      },
      {
        id: 'p8',
        prompt: '3200 Ft könyvből 400 Ft engedmény',
        value: '12,5% árengedmény (400 / 3200)'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Árváltozások és Alapváltások',
    subtitle: 'Keresd meg a szöveges problémákhoz tartozó helyes matematikai választ!',
    pairs: [
      {
        id: 'p9',
        prompt: '500 kg teve 40% súlyvesztés után',
        value: '300 kg testtömeg (500 - 200)'
      },
      {
        id: 'p10',
        prompt: '300 kg teve visszahízása 500 kg-ra',
        value: '+66,7% gyarapodás (200 / 300)'
      },
      {
        id: 'p11',
        prompt: '10 000 Ft termék +20% majd -20%',
        value: '9600 Ft végár (4%-kal olcsóbb!)'
      },
      {
        id: 'p12',
        prompt: 'Palacsintázó: kétszer egymás után +10%',
        value: '+21% drágulás (1,1 · 1,1 = 1,21)'
      },
      {
        id: 'p13',
        prompt: '5600 Ft termék ára 4760 Ft-ra csökkent',
        value: '15% kedvezmény (840 Ft levonás)'
      },
      {
        id: 'p14',
        prompt: 'Autó ára 20% emelés után 3 000 000 Ft',
        value: '2 500 000 Ft eredeti ár (osztás 1,2-vel)'
      },
      {
        id: 'p15',
        prompt: '750 diákból 210 sítáborba menne',
        value: '28% tanuló utazna'
      },
      {
        id: 'p16',
        prompt: 'Tokió: 35% ezüst, 30% arany, 7 bronz',
        value: '20 érem összesen (bronz = 35%)'
      }
    ]
  },
  3: {
    title: '3. Szint: Halmazok, Láncolt Százalékok és Geometria',
    subtitle: 'Kapcsold össze a halmazos és összetett százalékos kérdéseket az eredményükkel!',
    pairs: [
      {
        id: 'p17',
        prompt: '30 fős osztály: 70% méz, 60% mazsola',
        value: '9 diák (30%) szereti mindkettőt'
      },
      {
        id: 'p18',
        prompt: 'Lázár 200 varázslata (84% csiribá, 7% metszet)',
        value: '154 varázslat csak csiribá (77%)'
      },
      {
        id: 'p19',
        prompt: 'Négyzet területe az eredeti 64%-a lett',
        value: 'Oldala 20%-kal csökkent (√0,64 = 0,8)'
      },
      {
        id: 'p20',
        prompt: 'Maxim évfolyama: 40% fiú · 40% szemüveges · 40% barna = 8 fő',
        value: '125 tanuló az évfolyamon (8 / 0,064)'
      },
      {
        id: 'p21',
        prompt: 'Tehéntúró 18% ÁFA-tartalma 63 Ft',
        value: '350 Ft nettó ár (63 / 0,18)'
      },
      {
        id: 'p22',
        prompt: 'Paralimpia: 16 éremből 4 bronz, arany 40%-kal több mint ezüst',
        value: '7 arany és 5 ezüst érem'
      },
      {
        id: 'p23',
        prompt: '1 kg tejszínből 62 dkg vaj lesz',
        value: '1 kg vajhoz 1,61 kg tejszín kell'
      },
      {
        id: 'p24',
        prompt: 'Zita 4 minikrémessel evett kevesebbet (ez a sütik 10%-a)',
        value: '40 minikrémes készült összesen'
      }
    ]
  }
};

export const PracticeMatcher: React.FC<PracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-practice-matcher',
  topicTitle = 'A százalékszámítás gyakorlása'
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
      themeColor="amber"
      title="A százalékszámítás gyakorlása - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default PracticeMatcher;
