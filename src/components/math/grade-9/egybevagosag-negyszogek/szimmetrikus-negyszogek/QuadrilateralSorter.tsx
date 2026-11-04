import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadrilateralSorterProps {
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
    title: '1. Szint: Szimmetriatengelyek Száma Szerint',
    subtitle: 'Sorold be a négyszögeket és jellemzőiket a szimmetriatengelyeik száma szerint!',
    categories: [
      {
        id: 'cat-axis1',
        name: 'Pontosan 1 Tengely',
        description: 'Egyetlen szimmetriatengellyel rendelkező négyszögek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-axis2',
        name: 'Pontosan 2 Tengely',
        description: 'Két egymásra merőleges szimmetriatengellyel bíró alakzatok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-axis-other',
        name: '4 vagy 0 Tengely',
        description: 'Négyzet (4 tengely) vagy általános alakzatok (0 tengely)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // 1 tengely
      { id: 'qs1-1', label: 'Húrtrapéz (a párhuzamos alapok közös felezőmerőlegese)', category: 'cat-axis1' },
      { id: 'qs1-2', label: 'Deltoid (a két különböző csúcsot összekötő szimmetriaátló)', category: 'cat-axis1' },
      { id: 'qs1-3', label: 'Szimmetrikus trapéz az egyenlő száraival és szögeivel', category: 'cat-axis1' },
      { id: 'qs1-4', label: 'Olyan négyszög, amelynek csak a szimmetriaátlója felezi a belső szögeket', category: 'cat-axis1' },
      // 2 tengely
      { id: 'qs1-5', label: 'Téglalap (a két szemközti oldalpár felezőmerőlegesei)', category: 'cat-axis2' },
      { id: 'qs1-6', label: 'Rombusz (a két merőleges belső átlója)', category: 'cat-axis2' },
      { id: 'qs1-7', label: 'Olyan nem négyzet alakzat, amelynek két egymásra merőleges szimmetriatengelye van', category: 'cat-axis2' },
      { id: 'qs1-8', label: 'Egyenlő oldalú, de nem derékszögű paralelogramma', category: 'cat-axis2' },
      // 4 vagy 0 tengely
      { id: 'qs1-9', label: 'Négyzet (2 átló és 2 oldalfelező merőleges - 4 tengely)', category: 'cat-axis-other' },
      { id: 'qs1-10', label: 'Általános paralelogramma (egyetlen szimmetriatengelye sincs - 0 tengely)', category: 'cat-axis-other' },
      { id: 'qs1-11', label: 'Általános trapéz (nincs szimmetriatengelye - 0 tengely)', category: 'cat-axis-other' },
      { id: 'qs1-12', label: 'Szabályos 4-szög (maximális, 4 szimmetriatengellyel bír)', category: 'cat-axis-other' }
    ]
  },
  2: {
    title: '2. Szint: Átlók Kapcsolatai és Viszonya',
    subtitle: 'Válogasd szét a négyszögeket az átlóik merőlegessége és egyenlősége szerint!',
    categories: [
      {
        id: 'cat-perp',
        name: 'Átlók Merőlegesek (e ⊥ f)',
        description: 'Az átlók 90°-ot zárnak be, de nem feltétlenül egyenlők',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-equal',
        name: 'Átlók Egyenlők (e = f)',
        description: 'Az átlók egyenlő hosszúak, de nem feltétlenül merőlegesek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-both',
        name: 'Egyszerre Merőlegesek és Egyenlők',
        description: 'e = f és e ⊥ f mindkettő maradéktalanul teljesül',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Merőlegesek (de általában nem egyenlők)
      { id: 'qs2-1', label: 'Rombusz: átlói derékszöget zárnak be egymással és felezik a szögeket', category: 'cat-perp' },
      { id: 'qs2-2', label: 'Deltoid: a szimmetriaátló merőleges a harántátlóra', category: 'cat-perp' },
      { id: 'qs2-3', label: 'Olyan alakzat, amelynek területe t = (e · f) / 2 a merőlegesség miatt', category: 'cat-perp' },
      { id: 'qs2-4', label: 'Minden oldala egyenlő, de szögei nem 90°-osak', category: 'cat-perp' },
      // Egyenlők (de általában nem merőlegesek)
      { id: 'qs2-5', label: 'Téglalap: átlói pontosan azonos hosszúságúak és felezik egymást', category: 'cat-equal' },
      { id: 'qs2-6', label: 'Húrtrapéz: a két átló egyenlő szárú háromszögeket alkot', category: 'cat-equal' },
      { id: 'qs2-7', label: 'Köré írható szimmetrikus trapéz átlói', category: 'cat-equal' },
      { id: 'qs2-8', label: 'Minden szöge 90°, de oldalai nem mind egyenlők', category: 'cat-equal' },
      // Mindkettő
      { id: 'qs2-9', label: 'Négyzet: e = f és e ⊥ f egyszerre teljesül', category: 'cat-both' },
      { id: 'qs2-10', label: 'Szabályos 4-szög teljes átlórendszere', category: 'cat-both' },
      { id: 'qs2-11', label: 'Olyan négyszög, amelynek átlói 4 egybevágó egyenlő szárú derékszögű háromszögre bontják', category: 'cat-both' },
      { id: 'qs2-12', label: 'Egyszerre téglalap és rombusz tulajdonságú alakzat átlói', category: 'cat-both' }
    ]
  },
  3: {
    title: '3. Szint: Húrnégyszögek és Érintőnégyszögek',
    subtitle: 'Csoportosítsd a négyszögeket a körülírt és beírt körök létezése alapján!',
    categories: [
      {
        id: 'cat-cyclic',
        name: 'Csak Húrnégyszög',
        description: 'Köré írható kör (α + γ = 180°), de beírt köre általában nincs',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-tangent',
        name: 'Csak Érintőnégyszög',
        description: 'Beírt köre van (a + c = b + d), de köré nem írható kör',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-bicentric',
        name: 'Bicentrikus (Mindkettő)',
        description: 'Köré írt köre és beírt köre is van egyszerre',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Csak Húrnégyszög
      { id: 'qs3-1', label: 'Téglalap: minden szöge 90°, így szemközti szögei 180°-ot adnak', category: 'cat-cyclic' },
      { id: 'qs3-2', label: 'Húrtrapéz: alapon fekvő szögei egyenlők, így α + γ = 180°', category: 'cat-cyclic' },
      { id: 'qs3-3', label: 'Olyan négyszög, amelynek oldalfelező merőlegesei egy pontban metszik egymást', category: 'cat-cyclic' },
      { id: 'qs3-4', label: 'Thalész-tétel szerinti átlómetszéspontú téglalap', category: 'cat-cyclic' },
      // Csak Érintőnégyszög
      { id: 'qs3-5', label: 'Rombusz: minden oldala egyenlő, így a + c = 2a = b + d mindig igaz', category: 'cat-tangent' },
      { id: 'qs3-6', label: 'Deltoid: szomszédos oldalpárok egyenlősége miatt a + c = b + d', category: 'cat-tangent' },
      { id: 'qs3-7', label: 'Olyan négyszög, amelynek belső szögfelezői egyetlen pontban metszik egymást', category: 'cat-tangent' },
      { id: 'qs3-8', label: 'Beírt körrel rendelkező, de nem derékszögű rombikus forma', category: 'cat-tangent' },
      // Bicentrikus (mindkettő)
      { id: 'qs3-9', label: 'Négyzet: körülírt köre és beírt köre is létezik', category: 'cat-bicentric' },
      { id: 'qs3-10', label: 'Szabályos 4-szög, amely egyszerre teljesíti a szög- és oldalfeltételt', category: 'cat-bicentric' },
      { id: 'qs3-11', label: 'Olyan négyszög, amelyben α + γ = 180° és a + c = b + d is teljesül', category: 'cat-bicentric' },
      { id: 'qs3-12', label: 'Közös középpontú beírt és körülírt körrel rendelkező négyszög', category: 'cat-bicentric' }
    ]
  }
};

export const QuadrilateralSorter: React.FC<QuadrilateralSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-negyszogek-sorter',
  topicTitle = '6. Szimmetrikus négyszögek'
}) => {
  return (
    <SorterTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
    />
  );
};

(QuadrilateralSorter as any).sorterLevels = sorterLevels;

