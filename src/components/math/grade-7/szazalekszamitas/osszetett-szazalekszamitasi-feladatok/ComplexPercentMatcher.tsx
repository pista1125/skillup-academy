import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComplexPercentMatcherProps {
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
    title: '1. Szint: Kétszeri Változások és Szorzótényezők',
    subtitle: 'Párosítsd az egymást követő százalékos lépéseket a pontos összesített eredménnyel!',
    pairs: [
      {
        id: 'p1',
        prompt: '+10% majd +6% emelés',
        value: 'q = 1,166 (+16,6% egyszeri növekedés)'
      },
      {
        id: 'p2',
        prompt: '-12% majd -8% csökkenés',
        value: 'q = 0,8096 (-19,04% csökkenés)'
      },
      {
        id: 'p3',
        prompt: '+20% majd -20% változás',
        value: 'q = 0,96 (-4% csökkenés az eredetihez képest)'
      },
      {
        id: 'p4',
        prompt: '+25% majd -20% változás',
        value: 'q = 1,00 (0% változás, pont az eredeti ár!)'
      },
      {
        id: 'p5',
        prompt: '+10% majd +10% emelés',
        value: 'q = 1,21 (+21% drágulás)'
      },
      {
        id: 'p6',
        prompt: '-15% majd -10% leárazás',
        value: 'q = 0,765 (-23,5% egyszeri árengedmény)'
      },
      {
        id: 'p7',
        prompt: '+12% majd -12% változás',
        value: 'q = 0,9856 (-1,44% csökkenés)'
      },
      {
        id: 'p8',
        prompt: '+15% majd +25% növekedés',
        value: 'q = 1,4375 (+43,75% egyszeri növekedés)'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorlati Többlépéses Feladatok',
    subtitle: 'Keresd meg a tankönyvi szöveges problémákhoz tartozó pontos számítási eredményt!',
    pairs: [
      {
        id: 'p9',
        prompt: '2500 palack/óra gép +10% majd +6% után',
        value: '2915 palack/óra végső kapacitás'
      },
      {
        id: 'p10',
        prompt: '12 500 000 Ft gép amortizációja 2 év után (-12%, -8%)',
        value: '10 120 000 Ft érték két év elteltével'
      },
      {
        id: 'p11',
        prompt: '6500 Ft internet díjcsomagváltás (+12%, -12%)',
        value: '6406 Ft új havidíj (94 Ft-tal kevesebb)'
      },
      {
        id: 'p12',
        prompt: '30 000 Ft téli csizma leárazása (-15%, -10%)',
        value: '22 950 Ft végső akciós ár'
      },
      {
        id: 'p13',
        prompt: '500 csomag nápolyi (kedden -12%, szerdán -15%)',
        value: '126 csomag nápolyi fogyott el a két nap alatt'
      },
      {
        id: 'p14',
        prompt: '14 lány az edzésen, a csapat 72%-a fiú',
        value: '50 gyerek jár az edzésre (28% lány)'
      },
      {
        id: 'p15',
        prompt: 'Angoltábor 10%-kal olcsóbban 7830 Ft',
        value: '8700 Ft volt az eredeti tábori díj'
      },
      {
        id: 'p16',
        prompt: '1,2 óra időtartam 25%-a percekben',
        value: '18 perc (72 percnek a negyede)'
      }
    ]
  },
  3: {
    title: '3. Szint: Pályázatok, Geometria és Összetett Helyzetek',
    subtitle: 'Kapcsold össze a komplex gazdasági és geometriai helyzeteket a megoldásukkal!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Toldi-tanya iskola: 1/4 labda, 15% szőnyeg, maradék harmada korcsolya, 180 000 Ft síléc',
        value: '450 000 Ft támogatást nyert az iskola'
      },
      {
        id: 'p18',
        prompt: 'Jótékonysági koncert 1,5M Ft, 85% készpénz, a maradék 15% fele élelem',
        value: 'A bevétel 7,5%-a ment élelemre (112 500 Ft)'
      },
      {
        id: 'p19',
        prompt: '10 cm-es négyzet oldalait +40%-kal és -40%-kal változtatjuk',
        value: 'Kerület 40 cm (0%), terület 84 cm² (-16%)'
      },
      {
        id: 'p20',
        prompt: 'Téglalap mindkét oldalát 45%-kal növeljük',
        value: 'Területe +110,25%-kal nő (1,45 · 1,45 = 2,1025)'
      },
      {
        id: 'p21',
        prompt: '24 cm négyzet egyik oldala -40% (14,4 cm), területe marad 576 cm²',
        value: 'Másik oldala 40 cm lesz (+66,7% növekedés)'
      },
      {
        id: 'p22',
        prompt: '25 000 Ft cipő ára +25% majd -20% után',
        value: 'Pontosan 25 000 Ft (1,25 · 0,80 = 1,00)'
      },
      {
        id: 'p23',
        prompt: '25 000 Ft cipő ára +30% majd -20% után',
        value: '26 000 Ft végső ár (1,30 · 0,80 = 1,04)'
      },
      {
        id: 'p24',
        prompt: '200 000 Ft laptop: 140 000 Ft kp, 60 000 Ft hitelre 15% kamat',
        value: '9000 Ft kamattal drágább a laptop (havi 11 500 Ft)'
      }
    ]
  }
};

export const ComplexPercentMatcher: React.FC<ComplexPercentMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-pct-complex-matcher',
  topicTitle = 'Összetett százalékszámítási feladatok'
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
      themeColor="purple"
      title="Összetett százalékszámítás - Párkereső Játék"
      badge="PÁRKERESŐ"
    />
  );
};

export default ComplexPercentMatcher;
