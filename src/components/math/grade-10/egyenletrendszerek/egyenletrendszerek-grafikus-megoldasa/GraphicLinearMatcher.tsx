import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphicLinearMatcherProps {
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
    title: 'Egyenletrendszerek és Megoldáspárok',
    subtitle: 'Párosítsd az egyenletrendszereket a pontos metszéspontjukkal vagy a megoldások számával!',
    pairs: [
      {
        id: 'glm1-1',
        prompt: 'y = 7 − x  és  y = 10 − 2x (Tyúkok és nyulak)',
        value: 'Metszéspont: (3; 4) ⟹ 1 megoldás'
      },
      {
        id: 'glm1-2',
        prompt: 'y = 6 − x  és  y = 1,5x + 1 (Tankönyvi minta)',
        value: 'Metszéspont: (2; 4) ⟹ 1 megoldás'
      },
      {
        id: 'glm1-3',
        prompt: '3x + y = 5  és  6x + 2y = 1',
        value: 'Párhuzamosak ⟹ Nincs megoldás (∅)'
      },
      {
        id: 'glm1-4',
        prompt: '2x − y = 1  és  4x − 2y = 2',
        value: 'Egybeesnek ⟹ Végtelen sok megoldás'
      },
      {
        id: 'glm1-5',
        prompt: 'y = x + 4  és  y = −2x + 1',
        value: 'Metszéspont: (−1; 3) ⟹ 1 megoldás'
      },
      {
        id: 'glm1-6',
        prompt: 'x + y = 0  és  2x − y = 0',
        value: 'Origóban metszik egymást: (0; 0)'
      }
    ]
  },
  2: {
    title: 'Meredekség, Tengelymetszet és Helyzet',
    subtitle: 'Párosítsd a meredekségek és tengelymetszetek összefüggéseit a geometriai és algebrai következménnyel!',
    pairs: [
      {
        id: 'glm2-1',
        prompt: 'm₁ ≠ m₂ (különböző meredekségek)',
        value: 'Metsző egyenesek ⟹ Pontosan 1 megoldáspár (x₀; y₀)'
      },
      {
        id: 'glm2-2',
        prompt: 'm₁ = m₂  és  b₁ ≠ b₂ (azonos meredekség, eltérő tengelymetszet)',
        value: 'Párhuzamosak ⟹ 0 megoldás (ellentmondás, pl. 0 = 9)'
      },
      {
        id: 'glm2-3',
        prompt: 'm₁ = m₂  és  b₁ = b₂ (azonos egyenletek / számszorosok)',
        value: 'Egybeeső egyenesek ⟹ Végtelen sok megoldás (azonosság: 0 = 0)'
      },
      {
        id: 'glm2-4',
        prompt: 'm₁ · m₂ = −1 (meredekségek szorzata mínusz egy)',
        value: 'Merőleges egyenesek ⟹ 90°-os szögben metszik egymást (1 megoldás)'
      },
      {
        id: 'glm2-5',
        prompt: 'b₁ = b₂ = 0  és  m₁ ≠ m₂',
        value: 'Mindkét egyenes áthalad az origón ⟹ Metszéspont: (0; 0)'
      },
      {
        id: 'glm2-6',
        prompt: 'y = 2x + 3  és  y = 2x + 7',
        value: 'Párhuzamos egyenespár (távolságuk állandó, nincs közös pont)'
      }
    ]
  },
  3: {
    title: 'Szöveges Modellek és Eredmények',
    subtitle: 'Párosítsd a valós életbeli és tankönyvi szituációkat a modelljükkel és megoldásukkal!',
    pairs: [
      {
        id: 'glm3-1',
        prompt: 'Dani (60 m/perc) és Anyukája (30 m/perc) találkozása a 720 m-es úton',
        value: '8 perc múlva találkoznak, 240 m-re otthontól'
      },
      {
        id: 'glm3-2',
        prompt: 'Ágoston rollerrel (150 m/perc) és Apukája robogóval (450 m/perc, 6 perc késéssel)',
        value: 'Apa 3 perc alatt éri utol (Ágoston indulásától 9 perc, 1350 m)'
      },
      {
        id: 'glm3-3',
        prompt: 'Vacsora: 6 fő/asztal ⟹ 2-nek nincs hely; 7 fő/asztal ⟹ 1 üres szék',
        value: '3 asztal és 20 vendég (y = 6x + 2 és y = 7x − 1)'
      },
      {
        id: 'glm3-4',
        prompt: 'Vásár: 1 csikó = 2 malac + 5 tallér; 2 csikó = 1 malac + 22 tallér',
        value: '1 csikó = 13 tallér, 1 malac = 4 tallér'
      },
      {
        id: 'glm3-5',
        prompt: 'Büfé: Péter 2 szendvics + 2 víz = 740 Ft; Pál 3 szendvics + 1 víz = 890 Ft',
        value: '1 szendvics = 260 Ft, 1 ásványvíz = 110 Ft'
      },
      {
        id: 'glm3-6',
        prompt: 'Kétjegyű szám: számjegyek összege 9; felcserélve 27-tel nagyobb',
        value: 'Eredeti szám: 36 (felcserélve: 63, különbségük: 27)'
      }
    ]
  }
};

export const GraphicLinearMatcher: React.FC<GraphicLinearMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '1. Egyenletrendszerek grafikus megoldása'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="1. Egyenletrendszerek grafikus megoldása – Párosító Játék"
      subtitle="Találd meg a logikai párokat: egyenletrendszerek, egyenesek helyzete és szöveges feladatok!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 7. LECKE"
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

