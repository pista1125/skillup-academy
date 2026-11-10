import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MotionWorkSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Mozgásos és munkavégzéses feladatok csoportosítása',
    subtitle: 'Válogasd szét a feladatokat a használt fizikai modell és összefüggés szerint!',
    categories: [
      {
        id: 'cat-motion-diff',
        name: 'Menetidő-különbség',
        description: 'Azonos úton két sebesség: s/v - s/(v + Δv) = Δt.',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-river',
        name: 'Folyami hajózás',
        description: 'Sodrással lefelé (v + v_f) és felfelé (v - v_f) oda-vissza.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-work',
        name: 'Együttes munkavégzés',
        description: 'Csövek vagy munkások közös ideje: 1/t₁ + 1/t₂ = 1/T.',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-stage',
        name: 'Szakaszos mozgás & részmunka',
        description: 'Pihenőidő, késés behozása, vagy együtt indulás után egyedül befejezés.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'mws1-1', content: 'Egy gyorsvonat 180 km-en 15 km/h-val sebesebb a személyvonatnál.', categoryId: 'cat-motion-diff' },
      { id: 'mws1-2', content: 'Egy motorcsónak oda-vissza halad a folyón 48 km-t 5 óra alatt.', categoryId: 'cat-river' },
      { id: 'mws1-3', content: 'Két csap együtt 6 óra alatt tölti meg a víztározót.', categoryId: 'cat-work' },
      { id: 'mws1-4', content: 'A kamion félúton 20 percet állt, majd gyorsított a késés behozására.', categoryId: 'cat-stage' },
      { id: 'mws1-5', content: '240 km-es úton 20 km/h-val növelt sebességgel 1 órát nyert.', categoryId: 'cat-motion-diff' },
      { id: 'mws1-6', content: 'A dunai kajakos 12 km-t evez lefelé, majd visszatér a kikötőbe.', categoryId: 'cat-river' },
      { id: 'mws1-7', content: 'Két kőműves együtt 10 nap alatt húzza fel a ház falait.', categoryId: 'cat-work' },
      { id: 'mws1-8', content: '2 órán át együtt ástak, majd Géza egyedül fejezte be a maradékot.', categoryId: 'cat-stage' },
      { id: 'mws1-9', content: 'A motoros 10 km/h-val lassabban ment a vihar miatt, így elkésett.', categoryId: 'cat-motion-diff' },
      { id: 'mws1-10', content: 'Széllel szemben 3 óra, hátszélben csak 2 óra a repülőgép útja.', categoryId: 'cat-river' }
    ]
  },
  2: {
    title: 'A közös nevező és az egyenlet szerkezete',
    subtitle: 'Csoportosítsd a feladatokat a beszorzáshoz használt közös nevező típusa szerint!',
    categories: [
      {
        id: 'cat-denom-speed',
        name: 'Nevező: v · (v + Δv)',
        description: 'Különböző sebességek menetidejének különbsége.',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-denom-river',
        name: 'Nevező: v² - v_f²',
        description: 'Folyami oda-vissza haladás: (v + v_f)(v - v_f) négyzetkülönbség.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-denom-work',
        name: 'Nevező: T · t · (t + d)',
        description: 'Együttes munkavégzés: 1/t + 1/(t + d) = 1/T.',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'mws2-1', content: '180 / v - 180 / (v + 15) = 1', categoryId: 'cat-denom-speed' },
      { id: 'mws2-2', content: '48 / (20 + v_f) + 48 / (20 - v_f) = 5', categoryId: 'cat-denom-river' },
      { id: 'mws2-3', content: '1 / t + 1 / (t + 5) = 1 / 6', categoryId: 'cat-denom-work' },
      { id: 'mws2-4', content: '300 / v - 300 / (v + 10) = 1', categoryId: 'cat-denom-speed' },
      { id: 'mws2-5', content: '36 / (15 + v_f) + 36 / (15 - v_f) = 5', categoryId: 'cat-denom-river' },
      { id: 'mws2-6', content: '1 / t + 1 / (t + 4) = 1 / 4,8', categoryId: 'cat-denom-work' },
      { id: 'mws2-7', content: '120 / (v - 10) - 120 / v = 0,5', categoryId: 'cat-denom-speed' },
      { id: 'mws2-8', content: '20 / (12 + v_f) + 20 / (12 - v_f) = 4', categoryId: 'cat-denom-river' },
      { id: 'mws2-9', content: '1 / t + 1 / (t + 6) = 1 / 4', categoryId: 'cat-denom-work' }
    ]
  },
  3: {
    title: 'Fizikai megoldások szűrése és valóságkontroll',
    subtitle: 'Válogasd szét a másodfokú megoldásokból adódó gyököket elfogadhatóságuk szerint!',
    categories: [
      {
        id: 'cat-accept',
        name: 'Elfogadható fizikai gyök',
        description: 'Pozitív valós sebesség vagy időérték (v > 0, t > 0).',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-reject-neg',
        name: 'Elvetendő (Negatív érték)',
        description: 'A sebesség vagy az idő skaláris nagysága nem lehet negatív.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-reject-phys',
        name: 'Elvetendő (Fizikai lehetetlenség)',
        description: 'A folyó sebessége nagyobb lenne a hajóénál (v_folyó ≥ v_hajó, elsodródna).',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'mws3-1', content: 'Vonat sebessége a másodfokú egyenletből: v = 45 km/h', categoryId: 'cat-accept' },
      { id: 'mws3-2', content: 'Vonat sebességének második gyöke: v = -60 km/h', categoryId: 'cat-reject-neg' },
      { id: 'mws3-3', content: 'Medence töltési ideje az 1. csőre: t = 10 óra', categoryId: 'cat-accept' },
      { id: 'mws3-4', content: 'Munkaidő a másodfokú gyökökből: t = -3 óra', categoryId: 'cat-reject-neg' },
      { id: 'mws3-5', content: 'Folyó sodrásának sebessége: v_f = 4 km/h (ha v_hajó = 20 km/h)', categoryId: 'cat-accept' },
      { id: 'mws3-6', content: 'Folyó sebessége: v_f = 25 km/h egy 20 km/h-s csónak esetén (felfelé nem jutna el)', categoryId: 'cat-reject-phys' },
      { id: 'mws3-7', content: 'Autóbusz sebessége: v = 80 km/h', categoryId: 'cat-accept' },
      { id: 'mws3-8', content: 'Folyami gyökvonás negatív gyöke: v_f = -4 km/h', categoryId: 'cat-reject-neg' }
    ]
  }
};

export const MotionWorkSorter: React.FC<MotionWorkSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Mozgás és Munkavégzés Csoportosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

