import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BenceTrapAverageOfAveragesSvg,
  HistogramIntervalsSvg,
  ContinuousVsDiscreteHistogramSvg
} from './ClassIntervalFigures';

interface ClassIntervalSorterProps {
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
    title: 'Osztályközepek nagyságrendi csoportosítása',
    subtitle: 'Számítsd ki az intervallumok osztályközepeit ((alsó + felső) / 2), és sorold be őket a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-less50',
        name: 'Osztályközép < 50',
        description: 'A kategória felezőpontja kisebb 50-nél',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-equal50',
        name: 'Osztályközép = 50',
        description: 'A kategória felezőpontja pontosan 50',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-more50',
        name: 'Osztályközép > 50',
        description: 'A kategória felezőpontja nagyobb 50-nél',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cis1-1', content: 'Intervallum: [0; 40]', categoryId: 'cat-less50' },
      { id: 'cis1-2', content: 'Intervallum: [20; 60]', categoryId: 'cat-less50' },
      { id: 'cis1-3', content: 'Intervallum: [10; 80]', categoryId: 'cat-less50', figure: <HistogramIntervalsSvg size={54} /> },
      { id: 'cis1-4', content: 'Intervallum: [30; 50]', categoryId: 'cat-less50' },

      { id: 'cis1-5', content: 'Intervallum: [40; 60]', categoryId: 'cat-equal50' },
      { id: 'cis1-6', content: 'Intervallum: [0; 100]', categoryId: 'cat-equal50' },
      { id: 'cis1-7', content: 'Intervallum: [25; 75]', categoryId: 'cat-equal50' },
      { id: 'cis1-8', content: 'Intervallum: [48; 52]', categoryId: 'cat-equal50' },

      { id: 'cis1-9', content: 'Intervallum: [40; 80]', categoryId: 'cat-more50' },
      { id: 'cis1-10', content: 'Intervallum: [50; 90]', categoryId: 'cat-more50' },
      { id: 'cis1-11', content: 'Intervallum: [60; 100]', categoryId: 'cat-more50', figure: <ContinuousVsDiscreteHistogramSvg size={54} /> },
      { id: 'cis1-12', content: 'Intervallum: [80; 120]', categoryId: 'cat-more50' }
    ]
  },
  2: {
    title: 'Matematikai Igazság vs. Tévhit az osztályozásról',
    subtitle: 'Válogasd szét a helytálló statisztikai törvényeket és a tipikus hibákat!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai Igazság',
        description: 'Tétel vagy mindig érvényes statisztikai szabály',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Tévhit / Csapda',
        description: 'Hibás feltételezés vagy hamis állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cis2-1', content: 'Két csoport összevont átlaga csak akkor a két átlag számtani közepe, ha létszámuk egyenlő', categoryId: 'cat-truth', figure: <BenceTrapAverageOfAveragesSvg size={54} /> },
      { id: 'cis2-2', content: 'Az osztályközép a kategória alsó és felső határának számtani közepe: (a + b) / 2', categoryId: 'cat-truth' },
      { id: 'cis2-3', content: 'Az osztályközökkel számított átlag közelítő érték az adatok egyedi ismeretéhez képest', categoryId: 'cat-truth' },
      { id: 'cis2-4', content: 'Az osztályközöknek diszjunktnak kell lenniük: minden adat pontosan egy osztályba eshet', categoryId: 'cat-truth' },
      { id: 'cis2-5', content: 'A nagyobb létszámú csoport átlaga erősebben húzza magához az összevont átlagot', categoryId: 'cat-truth' },
      { id: 'cis2-6', content: 'A relatív gyakoriságok összege az összes osztályközre mindig pontosan 1 (100%)', categoryId: 'cat-truth' },

      { id: 'cis2-7', content: 'Különböző létszámú csoportok átlaga mindig egyszerűen átlagolható: (x̄₁ + x̄₂) / 2', categoryId: 'cat-myth' },
      { id: 'cis2-8', content: 'Az osztályba sorolás után is pontosan visszaállítható minden eredeti adat egyéni értéke', categoryId: 'cat-myth' },
      { id: 'cis2-9', content: 'Folytonos változó hisztogramjánál az oszlopok között szünetet (rést) kell hagyni', categoryId: 'cat-myth', figure: <ContinuousVsDiscreteHistogramSvg size={54} /> },
      { id: 'cis2-10', content: 'Ha 20 fiú átlaga 175 cm és 30 lányé 165 cm, a teljes osztályátlag pontosan 170 cm', categoryId: 'cat-myth' },
      { id: 'cis2-11', content: 'A relatív gyakoriság értéke egyetlen osztályközben is meghaladhatja a 100%-ot', categoryId: 'cat-myth' },
      { id: 'cis2-12', content: 'Nyitott osztályközök esetén (pl. 80 év felettiek) pontos osztályközép határozható meg', categoryId: 'cat-myth' }
    ]
  },
  3: {
    title: 'Súlyozott csoportátlag viszonya az egyszerű átlaghoz',
    subtitle: 'Hogyan viszonyul az összevont súlyozott átlag a csoportátlagok egyszerű számtani közepéhez?',
    categories: [
      {
        id: 'cat-higher',
        name: 'Súlyozott átlag > Egyszerű átlag',
        description: 'A magasabb átlagú csoport létszámtöbbségben van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-equal',
        name: 'Súlyozott átlag = Egyszerű átlag',
        description: 'A részcsoportok létszáma pontosan megegyezik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-lower',
        name: 'Súlyozott átlag < Egyszerű átlag',
        description: 'Az alacsonyabb átlagú csoport létszámtöbbségben van',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cis3-1', content: '1. Csoport: 10 fő (átlag 3), 2. Csoport: 30 fő (átlag 5)', categoryId: 'cat-higher' },
      { id: 'cis3-2', content: '1. Csoport: 5 fő (átlag 2), 2. Csoport: 25 fő (átlag 4)', categoryId: 'cat-higher' },
      { id: 'cis3-3', content: '1. Csoport: 10 fő (átlag 160 cm), 2. Csoport: 40 fő (átlag 180 cm)', categoryId: 'cat-higher' },

      { id: 'cis3-4', content: '1. Csoport: 20 fő (átlag 3), 2. Csoport: 20 fő (átlag 5)', categoryId: 'cat-equal', figure: <BenceTrapAverageOfAveragesSvg size={54} /> },
      { id: 'cis3-5', content: '1. Csoport: 15 fő (átlag 160 cm), 2. Csoport: 15 fő (átlag 180 cm)', categoryId: 'cat-equal' },
      { id: 'cis3-6', content: '1. Csoport: 50 fő (átlag 70 pont), 2. Csoport: 50 fő (átlag 90 pont)', categoryId: 'cat-equal' },

      { id: 'cis3-7', content: '1. Csoport: 30 fő (átlag 3), 2. Csoport: 10 fő (átlag 5)', categoryId: 'cat-lower' },
      { id: 'cis3-8', content: '1. Csoport: 40 fő (átlag 160 cm), 2. Csoport: 10 fő (átlag 180 cm)', categoryId: 'cat-lower' },
      { id: 'cis3-9', content: 'Bence feladata: 3 fő (átlag 3) és 2 fő (átlag 6)', categoryId: 'cat-lower' }
    ]
  }
};

export const ClassIntervalSorter: React.FC<ClassIntervalSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId={props.topicId || 'g10-stat-osztalyba-sorolas-atlagok-sorter'}
      topicTitle={props.topicTitle || 'Osztályba sorolás, átlagok átlaga'}
      levels={sorterLevels}
      {...props}
    />
  );
};

export default ClassIntervalSorter;
