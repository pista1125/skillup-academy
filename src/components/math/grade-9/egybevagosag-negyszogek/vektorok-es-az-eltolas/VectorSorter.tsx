import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorSorterProps {
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
    title: '1. Szint: Vektorok és Eltolás Fogalmi Besorolása',
    subtitle: 'Rendszerezd a fogalmakat és tulajdonságokat a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-vector',
        name: 'Vektor Jellemzői',
        description: 'Irányított szakaszok alaptulajdonságai',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-ops',
        name: 'Vektorműveletek',
        description: 'Összeadás, kivonás és skalárral szorzás',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-trans',
        name: 'Eltolás Transzformáció',
        description: 'A v vektorral való síkbeli elmozdítás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Vektor jellemzői
      { id: 'vs1-1', label: 'Hossza mindig nemnegatív: |v| ≥ 0', category: 'cat-vector' },
      { id: 'vs1-2', label: 'Hordozó egyenes állása (párhuzamosság)', category: 'cat-vector' },
      { id: 'vs1-3', label: 'Nullvektor: hossza 0, iránya tetszőleges', category: 'cat-vector' },
      { id: 'vs1-4', label: 'Ellentett vektor (−v): megfordult nyíl', category: 'cat-vector' },
      // Vektorműveletek
      { id: 'vs1-5', label: 'Háromszög-szabály: AB + BC = AC', category: 'cat-ops' },
      { id: 'vs1-6', label: 'Paralelogramma főátlója a + b', category: 'cat-ops' },
      { id: 'vs1-7', label: 'Számmal szorzás: λ · (vx; vy) = (λvx; λvy)', category: 'cat-ops' },
      { id: 'vs1-8', label: 'Kivonás: a − b = a + (−b)', category: 'cat-ops' },
      // Eltolás transzformáció
      { id: 'vs1-9', label: 'Nincs egyetlen fixpontja sem (ha v ≠ 0)', category: 'cat-trans' },
      { id: 'vs1-10', label: 'Minden egyenes képe vele párhuzamos egyenes', category: 'cat-trans' },
      { id: 'vs1-11', label: 'Alakzatok körüljárási iránya megmarad', category: 'cat-trans' },
      { id: 'vs1-12', label: 'Távolságtartó és szögtartó egybevágóság', category: 'cat-trans' }
    ]
  },
  2: {
    title: '2. Szint: Skalárral Való Szorzás Hatásai (λ · v)',
    subtitle: 'Csoportosítsd a skaláris szorzatokat a vektor hosszára és irányára gyakorolt hatásuk szerint!',
    categories: [
      {
        id: 'cat-extend',
        name: 'Nyújtott, Azonos Irány (λ > 1)',
        description: 'A vektor hossza nő, iránya nem változik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-shrink',
        name: 'Zsugorított, Azonos Irány (0 < λ < 1)',
        description: 'A vektor hossza csökken, iránya változatlan',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-reverse',
        name: 'Ellentétes Irány (λ < 0)',
        description: 'A vektor nyila pontosan megfordul',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // λ > 1
      { id: 'vs2-1', label: '2 · v (kétszeres hossz)', category: 'cat-extend' },
      { id: 'vs2-2', label: '3 · v', category: 'cat-extend' },
      { id: 'vs2-3', label: '1,5 · v', category: 'cat-extend' },
      { id: 'vs2-4', label: '5 · v', category: 'cat-extend' },
      // 0 < λ < 1
      { id: 'vs2-5', label: '0,5 · v (felezett hossz)', category: 'cat-shrink' },
      { id: 'vs2-6', label: '1/3 · v', category: 'cat-shrink' },
      { id: 'vs2-7', label: '0,8 · v', category: 'cat-shrink' },
      { id: 'vs2-8', label: '0,25 · v (negyedelt hossz)', category: 'cat-shrink' },
      // λ < 0
      { id: 'vs2-9', label: '−1 · v (ellentett vektor)', category: 'cat-reverse' },
      { id: 'vs2-10', label: '−2 · v (megnyújtott ellentétes)', category: 'cat-reverse' },
      { id: 'vs2-11', label: '−0,5 · v', category: 'cat-reverse' },
      { id: 'vs2-12', label: '−3 · v', category: 'cat-reverse' }
    ]
  },
  3: {
    title: '3. Szint: Eredményvektorok Előjelei a Síkban',
    subtitle: 'Rendszerezd a számításokat az eredménykoordináták előjelei szerint!',
    categories: [
      {
        id: 'cat-pos',
        name: 'Mindkettő Pozitív (+; +)',
        description: 'I. síknegyedbe mutató vektor',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-mix',
        name: 'Vegyes Előjel (+; − vagy −; +)',
        description: 'II. vagy IV. síknegyedbe mutató vektor',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-neg',
        name: 'Mindkettő Negatív (−; −)',
        description: 'III. síknegyedbe mutató vektor',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // (+; +)
      { id: 'vs3-1', label: '(1; 2) + (2; 3) = (3; 5)', category: 'cat-pos' },
      { id: 'vs3-2', label: '2 · (3; 4) = (6; 8)', category: 'cat-pos' },
      { id: 'vs3-3', label: '(7; 9) − (2; 4) = (5; 5)', category: 'cat-pos' },
      { id: 'vs3-4', label: 'P(2; 1) eltolva (4; 5) = P\'(6; 6)', category: 'cat-pos' },
      // Vegyes (+; - vagy -; +)
      { id: 'vs3-5', label: '(5; 2) − (1; 6) = (4; −4)', category: 'cat-mix' },
      { id: 'vs3-6', label: '−2 · (1; −3) = (−2; 6)', category: 'cat-mix' },
      { id: 'vs3-7', label: '(−1; 4) + (5; −2) = (4; 2)', category: 'cat-mix' },
      { id: 'vs3-8', label: '3 · (−1; 2) = (−3; 6)', category: 'cat-mix' },
      // (-; -)
      { id: 'vs3-9', label: '−1 · (3; 4) = (−3; −4)', category: 'cat-neg' },
      { id: 'vs3-10', label: '(−2; −1) + (−3; −4) = (−5; −5)', category: 'cat-neg' },
      { id: 'vs3-11', label: '(1; 2) − (5; 7) = (−4; −5)', category: 'cat-neg' },
      { id: 'vs3-12', label: '2 · (−2; −3) = (−4; −6)', category: 'cat-neg' }
    ]
  }
};

export const VectorSorter: React.FC<VectorSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-vektorok',
  topicTitle = '2. Vektorok és az eltolás'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

