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
    title: 'Megoldási Stratégia és Első Lépés',
    subtitle: 'Párosítsd az egyenletrendszert a leggyorsabb és legkevesebb számolással járó első lépéssel!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'x + 4y = 11  és  3x − 2y = 5',
        value: 'I-ből x kifejezése: x = 11 − 4y'
      },
      {
        id: 'pm1-2',
        prompt: '3x + 2y = 10  és  5x − 2y = 6',
        value: 'Közvetlen összeadás ⟹ y kiesik (8x = 16)'
      },
      {
        id: 'pm1-3',
        prompt: 'x/3 + y/4 = 2  és  x/2 − y/3 = 1',
        value: 'Közös nevezőkkel szorzás: I · 12, II · 6'
      },
      {
        id: 'pm1-4',
        prompt: '2x + 3y = 7  és  4x + 6y = 14',
        value: 'Azonosság felismerése ⟹ Végtelen sok mo. (0=0)'
      },
      {
        id: 'pm1-5',
        prompt: '3x − y = 4  és  6x − 2y = 10',
        value: 'Ellentmondás felismerése ⟹ Nincs mo. (0=2)'
      },
      {
        id: 'pm1-6',
        prompt: 'x + y = 8  és  x · y = 15 (x ≥ y)',
        value: 'Viète-másodfokú: u² − 8u + 15 = 0 ⟹ (5; 3)'
      }
    ]
  },
  2: {
    title: 'Klasszikus és Érettségi Szöveges Feladatok',
    subtitle: 'Párosítsd a tankönyvi és érettségi szöveges problémákat a pontos megoldással!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'Büfé: 2 szendvics + 2 víz = 740 Ft, 3 szendvics + 1 víz = 890 Ft',
        value: 'Szendvics = 260 Ft, Ásványvíz = 110 Ft'
      },
      {
        id: 'pm2-2',
        prompt: 'Bútor: 3 asztal + 14 szék = 99 000 Ft; leértékelve 70 800 Ft',
        value: 'Asztal = 19 000 Ft, Szék = 3 000 Ft'
      },
      {
        id: 'pm2-3',
        prompt: 'Erdőgazdaság: Fenyő parcella (Tölgy: −4 sor, −5 fa; Platán: +3 sor, +2 fa)',
        value: '36 sor és 50 fa/sor ⟹ 1800 fa összesen'
      },
      {
        id: 'pm2-4',
        prompt: 'Két hordó bor: 480 liter bor oda-vissza öntögetése egyenlővé',
        value: 'A: 300 liter és B: 180 liter'
      },
      {
        id: 'pm2-5',
        prompt: 'Két ember: x + (2/3)y = 120 és y + (1/2)x = 120 ezüst',
        value: 'x = 60 ezüst és y = 90 ezüst'
      },
      {
        id: 'pm2-6',
        prompt: 'Kirándulás: 5 hiányzóval 3500 Ft/fő, 2 hiányzóval 3000 Ft/fő',
        value: '23 tanuló, 63 000 Ft összköltség'
      }
    ]
  },
  3: {
    title: 'Paraméteres és Törtes Egyenletrendszerek',
    subtitle: 'Párosítsd a feltételeket, paramétereket és speciális feladatokat a helyes válasszal!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: '2x + py = 6  és  4x + 6y = 5 esetén NINCS megoldás',
        value: 'p = 3  (mivel 4x + 6y = 12 ≠ 5 ellentmondás)'
      },
      {
        id: 'pm3-2',
        prompt: '2x + py = 6  és  4x + 6y = 12 esetén VÉGTELEN SOK megoldás',
        value: 'p = 3  (mivel a II. egyenlet 2 · I, azonosság)'
      },
      {
        id: 'pm3-3',
        prompt: 'px + 2y = 4  és  2x + py = 4 esetén a determináns 0',
        value: 'p = 2 vagy p = −2  (p² − 4 = 0)'
      },
      {
        id: 'pm3-4',
        prompt: '3x − y + 5x = 7  és  5x − y + x = −3 (Tankönyv 43. o.)',
        value: '8x − y = 7 és 6x − y = −3 ⟹ (5; 33)'
      },
      {
        id: 'pm3-5',
        prompt: 'Biobolt: 10 kg keverék 25% haszonnal 22 000 Ft (2200 és 1400 Ft/kg)',
        value: '4,5 kg kesudió és 5,5 kg aszalt gyümölcs'
      },
      {
        id: 'pm3-6',
        prompt: 'Körpálya: (v₁ + v₂)·p = 1500 és (v₁ − v₂)·15p = 1500',
        value: 'v₁ / v₂ = 8 / 7  (Mari 1,14-szer gyorsabb Palinál)'
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
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '4. Gyakorlás (Feladatmegoldási stratégiák)'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="4. Gyakorlás – Párosító Játék"
      subtitle="Párosítsd az egyenletrendszereket, megoldási stratégiákat és a végső eredményeket!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 10. LECKE"
      levels={matcherLevels}
      currentLevel={activeLvl}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

