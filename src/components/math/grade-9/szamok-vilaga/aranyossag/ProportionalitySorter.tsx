import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalitySorterProps {
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
    title: '1. Szint: Mennyiségpárok Osztályozása (Könnyű)',
    subtitle: 'Húzd a mindennapi kapcsolatokat a megfelelő arányossági kategóriába!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenes arányosság',
        description: 'Hányadosuk állandó: ha az egyik duplázódik, a másik is duplázódik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított arányosság',
        description: 'Szorzatuk állandó: ha az egyik duplázódik, a másik feleződik',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-neither',
        name: 'Nem arányos (Egyik sem)',
        description: 'Összeg állandó, fix alapdíjas vagy nincs funkcionális kapcsolat',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ps1-1', label: 'Vásárolt benzin literje és a fizetendő összeg', category: 'cat-direct' },
      { id: 'ps1-2', label: 'Megtett út és idő állandó sebességű haladásnál', category: 'cat-direct' },
      { id: 'ps1-3', label: 'Fénymásolt oldalak darabszáma és az ára', category: 'cat-direct' },
      { id: 'ps1-4', label: 'Munkaórák száma és munkabér fix órabér esetén', category: 'cat-direct' },
      { id: 'ps1-5', label: 'Autó sebessége és a menetidő egy fix 200 km-es úton', category: 'cat-inverse' },
      { id: 'ps1-6', label: 'Egy árok kiásásán dolgozó munkások száma és a munkaidő', category: 'cat-inverse' },
      { id: 'ps1-7', label: 'Fix 48 cm² területű téglalap két oldala (a és b)', category: 'cat-inverse' },
      { id: 'ps1-8', label: 'Medencét töltő egyforma csapok száma és a töltési idő', category: 'cat-inverse' },
      { id: 'ps1-9', label: 'Egy diák életkora és a testmagassága', category: 'cat-neither' },
      { id: 'ps1-10', label: 'Taxi viteldíja: 1000 Ft alapdíj + 450 Ft/km', category: 'cat-neither' },
      { id: 'ps1-11', label: 'Egy ember életkora és a cipőmérete', category: 'cat-neither' },
      { id: 'ps1-12', label: 'Egy négyzet oldalhossza és a területe (T = a²)', category: 'cat-neither' }
    ]
  },
  2: {
    title: '2. Szint: Függvények és Algebrai Alakok (Közepes)',
    subtitle: 'Kategorizáld a képleteket és grafikonos alakokat a matematikai definíció alapján!',
    categories: [
      {
        id: 'cat-direct-eqn',
        name: 'Egyenes arányosság (y = k · x)',
        description: 'Hányados állandó, origón átmenő egyenes vonal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-inverse-eqn',
        name: 'Fordított arányosság (y = k / x)',
        description: 'Szorzat állandó: x · y = k, hiperbola görbe',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-neither-eqn',
        name: 'Nem arányos összefüggés',
        description: 'Nem origón átmenő egyenes, másodfokú vagy összegfüggvény',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ps2-1', label: 'y = 4x', category: 'cat-direct-eqn' },
      { id: 'ps2-2', label: 'y / x = 7,5', category: 'cat-direct-eqn' },
      { id: 'ps2-3', label: 'y = 0,2x', category: 'cat-direct-eqn' },
      { id: 'ps2-4', label: 'Origón átmenő, m = 3 meredekségű egyenes', category: 'cat-direct-eqn' },
      { id: 'ps2-5', label: 'x · y = 36', category: 'cat-inverse-eqn' },
      { id: 'ps2-6', label: 'y = 10 / x', category: 'cat-inverse-eqn' },
      { id: 'ps2-7', label: 'x · y = 1', category: 'cat-inverse-eqn' },
      { id: 'ps2-8', label: 'Hiperbola görbe az I. síknegyedben', category: 'cat-inverse-eqn' },
      { id: 'ps2-9', label: 'y = 2x + 8 (Tengelymetszet: 8)', category: 'cat-neither-eqn' },
      { id: 'ps2-10', label: 'y = x² (Parabola görbe)', category: 'cat-neither-eqn' },
      { id: 'ps2-11', label: 'x + y = 20 (Összeg állandó)', category: 'cat-neither-eqn' },
      { id: 'ps2-12', label: 'y = 5 - 2x', category: 'cat-neither-eqn' }
    ]
  },
  3: {
    title: '3. Szint: Szabályok és Tévhitek (Nehéz)',
    subtitle: 'Válogasd szét a törvényszerűségeket és a gyakori matematikai buktatókat!',
    categories: [
      {
        id: 'cat-direct-rule',
        name: 'Egyenes arányosság tulajdonsága',
        description: 'Azonos irányú többszörözés, keresztszorzat egyenlősége',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-inverse-rule',
        name: 'Fordított arányosság tulajdonsága',
        description: 'Ellentétes irányú változás, soronkénti szorzat állandósága',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-neither-rule',
        name: 'Tévhit vagy nem érvényes szabály',
        description: 'Gyakori érettségi buktatók és hibás feltételezések',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ps3-1', label: 'Ha x háromszorosára nő, akkor y is háromszorosára nő', category: 'cat-direct-rule' },
      { id: 'ps3-2', label: 'A hármasszabályban a keresztszorzatok egyenlők: a · d = b · c', category: 'cat-direct-rule' },
      { id: 'ps3-3', label: 'Két érték hányadosa minden pontban azonos: y₁ / x₁ = y₂ / x₂', category: 'cat-direct-rule' },
      { id: 'ps3-4', label: 'Grafikonja egy origóból (0; 0) kiinduló félegyenes', category: 'cat-direct-rule' },
      { id: 'ps3-5', label: 'Ha x háromszorosára nő, akkor y a harmadára csökken', category: 'cat-inverse-rule' },
      { id: 'ps3-6', label: 'A táblázatban a soronkénti szorzat állandó: x₁ · y₁ = x₂ · y₂', category: 'cat-inverse-rule' },
      { id: 'ps3-7', label: 'A görbe alatti téglalapok területe (x · y) minden pontban megegyezik', category: 'cat-inverse-rule' },
      { id: 'ps3-8', label: 'Grafikonja hiperbola, amely sosem metszi a tengelyeket', category: 'cat-inverse-rule' },
      { id: 'ps3-9', label: '„Ha két mennyiség egyszerre nő, akkor biztosan egyenesen arányosak”', category: 'cat-neither-rule' },
      { id: 'ps3-10', label: '„Fordított arányosságnál is átlós keresztszorzattal számolunk”', category: 'cat-neither-rule' },
      { id: 'ps3-11', label: '„Egyenes arányosságnál x = 0 esetén y = 100 alapdíj áll”', category: 'cat-neither-rule' },
      { id: 'ps3-12', label: '„Ha x értéke 5-tel nő, akkor y értéke is 5-tel nő” (Különbség állandó)', category: 'cat-neither-rule' }
    ]
  }
};

export const ProportionalitySorter: React.FC<ProportionalitySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-aranyossag-sorter',
  topicTitle = 'Arányosság'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`prop-sorter-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      categories={config.categories}
      items={config.items}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="emerald"
    />
  );
};

export default ProportionalitySorter;
