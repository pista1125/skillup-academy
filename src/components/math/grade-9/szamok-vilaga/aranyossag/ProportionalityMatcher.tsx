import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalityMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Képletek (Könnyű)',
    subtitle: 'Párosítsd az arányosság alapfogalmait és képleteit a definíciójukkal!',
    pairs: [
      {
        id: 'prop-m1-1',
        prompt: 'Egyenes arányosság definíciója',
        value: 'Hányadosuk állandó: y / x = k (vagy y = k · x)'
      },
      {
        id: 'prop-m1-2',
        prompt: 'Fordított arányosság definíciója',
        value: 'Szorzatuk állandó: x · y = k (vagy y = k / x)'
      },
      {
        id: 'prop-m1-3',
        prompt: 'Aránypár fogalma',
        value: 'Két arány (hányados) egyenlősége: a : b = c : d'
      },
      {
        id: 'prop-m1-4',
        prompt: 'Keresztszorzat alaptétele',
        value: 'Külső tagok szorzata egyenlő a belső tagokéval: a · d = b · c'
      },
      {
        id: 'prop-m1-5',
        prompt: 'Egyenes arányosság grafikonja',
        value: 'Az origón (0; 0) átmenő egyenes vonal'
      },
      {
        id: 'prop-m1-6',
        prompt: 'Fordított arányosság grafikonja',
        value: 'Az I. síknegyedben futó hiperbola görbe'
      },
      {
        id: 'prop-m1-7',
        prompt: 'Arányossági tényező (k)',
        value: 'Megmutatja az 1 egységnyi bemenethez tartozó értéket'
      },
      {
        id: 'prop-m1-8',
        prompt: 'Következtetés az egységre',
        value: 'Előbb 1 egység értékét számoljuk ki osztással, majd szorzunk'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorlati Helyzetek Felismerése (Közepes)',
    subtitle: 'Párosítsd a mindennapi élethelyzeteket a rájuk érvényes arányossági szabállyal!',
    pairs: [
      {
        id: 'prop-m2-1',
        prompt: 'Megtett út és idő állandó v sebességnél',
        value: 'Egyenes arányosság (s = v · t, kétszer annyi idő alatt kétszer akkora út)'
      },
      {
        id: 'prop-m2-2',
        prompt: 'Sebesség és menetidő fix s távolságon',
        value: 'Fordított arányosság (v · t = s, dupla sebességhez feleannyi idő kell)'
      },
      {
        id: 'prop-m2-3',
        prompt: 'Munkások száma és az idő ugyanarra a munkára',
        value: 'Fordított arányosság (kétszer annyi munkás feleannyi idő alatt végez)'
      },
      {
        id: 'prop-m2-4',
        prompt: 'Vásárolt sajt tömege és a fizetendő ár',
        value: 'Egyenes arányosság (ár = egységár · kg, 0 kg-hoz 0 Ft tartozik)'
      },
      {
        id: 'prop-m2-5',
        prompt: 'Fix 36 cm² területű téglalap két oldala',
        value: 'Fordított arányosság (a · b = 36 cm², téglalap oldalai)'
      },
      {
        id: 'prop-m2-6',
        prompt: 'Kútásás: mélység és az összköltség',
        value: 'Egyenes arányosság (ha 1 méter ára állandó és nincs fix díj)'
      },
      {
        id: 'prop-m2-7',
        prompt: 'Hányados állandóságának vizsgálata',
        value: 'y₁ / x₁ = y₂ / x₂ egyenlőség ellenőrzése'
      },
      {
        id: 'prop-m2-8',
        prompt: 'Sorok szorzatának vizsgálata',
        value: 'x₁ · y₁ = x₂ · y₂ egyenlőség ellenőrzése'
      }
    ]
  },
  3: {
    title: '3. Szint: Keresztszorzatok és Számítások (Nehéz)',
    subtitle: 'Párosítsd az aránypárokat és szöveges feladatokat a pontos végeredményükkel!',
    pairs: [
      {
        id: 'prop-m3-1',
        prompt: 'x : 6 = 15 : 10 ismeretlen tagja',
        value: 'x = (6 · 15) / 10 = 9'
      },
      {
        id: 'prop-m3-2',
        prompt: '4 : x = 12 : 21 ismeretlen tagja',
        value: 'x = (4 · 21) / 12 = 7'
      },
      {
        id: 'prop-m3-3',
        prompt: '5 kg alma 1750 Ft. Mennyi 8 kg ára?',
        value: '(1750 : 5) · 8 = 350 · 8 = 2800 Ft'
      },
      {
        id: 'prop-m3-4',
        prompt: '4 munkás 6 óra alatt végez. Hány óra kell 3 munkásnak?',
        value: '(4 · 6) : 3 = 24 : 3 = 8 óra'
      },
      {
        id: 'prop-m3-5',
        prompt: '60 km/h-val 2 óra az út. Mennyi 80 km/h-val?',
        value: '(60 · 2) : 80 = 120 : 80 = 1,5 óra (90 perc)'
      },
      {
        id: 'prop-m3-6',
        prompt: '1 : 50 000 méretarányú térképen 4 cm valódi hossza',
        value: '4 · 50 000 cm = 200 000 cm = 2 km'
      },
      {
        id: 'prop-m3-7',
        prompt: 'Két fogaskerék: z₁ = 20, n₁ = 120 f/p, z₂ = 30. n₂ = ?',
        value: '(20 · 120) : 30 = 2400 : 30 = 80 fordulat/perc'
      },
      {
        id: 'prop-m3-8',
        prompt: 'y = 5x egyenes arányosság értéke x = 4,5 esetén',
        value: 'y = 5 · 4,5 = 22,5'
      }
    ]
  }
};

export const ProportionalityMatcher: React.FC<ProportionalityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-aranyossag-matcher',
  topicTitle = 'Arányosság'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`prop-matcher-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="emerald"
    />
  );
};

export default ProportionalityMatcher;
