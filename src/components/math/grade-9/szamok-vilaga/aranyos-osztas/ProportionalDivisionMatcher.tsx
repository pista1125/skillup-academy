import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalDivisionMatcherProps {
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
    title: '1. Szint: Arányok és 1 Arányrész Értéke (Könnyű)',
    subtitle: 'Párosítsd a feladatokat az 1 arányrész kiszámított értékével!',
    pairs: [
      {
        id: 'pdm1-1',
        prompt: '60 cm felosztása 2 : 3 arányban (S = 5)',
        value: '1 arányrész = 12 cm'
      },
      {
        id: 'pdm1-2',
        prompt: '100 000 Ft felosztása 3 : 7 arányban (S = 10)',
        value: '1 arányrész = 10 000 Ft'
      },
      {
        id: 'pdm1-3',
        prompt: 'Háromszög szögei 1 : 2 : 3 arányban (S = 6, M = 180°)',
        value: '1 arányrész = 30°'
      },
      {
        id: 'pdm1-4',
        prompt: 'Háromszög szögei 2 : 3 : 4 arányban (S = 9, M = 180°)',
        value: '1 arányrész = 20°'
      },
      {
        id: 'pdm1-5',
        prompt: '1600 ml limonádé 1 : 2 : 5 arányban (S = 8)',
        value: '1 arányrész = 200 ml'
      },
      {
        id: 'pdm1-6',
        prompt: '50 kg bronz ötvözet 9 : 1 arányban (S = 10)',
        value: '1 arányrész = 5 kg'
      },
      {
        id: 'pdm1-7',
        prompt: '45 cm kerületű háromszög oldalai 3 : 5 : 7 arányban (S = 15)',
        value: '1 arányrész = 3 cm'
      },
      {
        id: 'pdm1-8',
        prompt: '900 000 Ft nyereség 4 : 5 arányban (S = 9)',
        value: '1 arányrész = 100 000 Ft'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyakorlati Kérdések és Kiszámított Eredmények (Közepes)',
    subtitle: 'Párosítsd a szöveges feladatot a keresett pontos mennyiséggel!',
    pairs: [
      {
        id: 'pdm2-1',
        prompt: '60 cm rúd 2 : 3 arányban: mekkora a hosszabbik darab?',
        value: '36 cm (3 · 12 cm)'
      },
      {
        id: 'pdm2-2',
        prompt: '100 000 Ft elosztása 3 : 7 arányban: mekkora a kisebbik összeg?',
        value: '30 000 Ft (3 · 10 000 Ft)'
      },
      {
        id: 'pdm2-3',
        prompt: 'Háromszög szögei 2 : 3 : 4: mekkora a legnagyobb szög (γ)?',
        value: '80° (4 · 20°)'
      },
      {
        id: 'pdm2-4',
        prompt: '1500 ml ital szirup : víz = 1 : 4 arányban: hány ml szirup kell?',
        value: '300 ml (1500 / 5)'
      },
      {
        id: 'pdm2-5',
        prompt: '20 kg sárgaréz réz és cink 7 : 3 arányban: hány kg réz van benne?',
        value: '14 kg (7 · 2 kg)'
      },
      {
        id: 'pdm2-6',
        prompt: 'Téglalap K = 50 cm, oldalak 2 : 3: mekkora a rövidebb oldal (a)?',
        value: '10 cm (félkerület 25 cm, 2 · 5 cm)'
      },
      {
        id: 'pdm2-7',
        prompt: '40 szem cukorka 4, 6, 10 éveseknek: hány szem jut a legidősebbnek?',
        value: '20 szem (10 · 2 szem)'
      },
      {
        id: 'pdm2-8',
        prompt: '160 oldalas könyv 3 : 5 arányban: hány oldal jut a második napra?',
        value: '100 oldal (5 · 20 oldal)'
      }
    ]
  },
  3: {
    title: '3. Szint: Geometria és Összetett Arányok (Nehéz)',
    subtitle: 'Párosítsd az emelt szintű és geometriai feladványokat a megoldásukkal!',
    pairs: [
      {
        id: 'pdm3-1',
        prompt: 'Téglalap területe T = 48 cm², oldalai 3 : 4 arányúak: kerülete?',
        value: 'K = 28 cm (oldalak: 6 cm és 8 cm)'
      },
      {
        id: 'pdm3-2',
        prompt: 'Derékszögű háromszög hegyesszögei 1 : 2 arányban (összeg: 90°)',
        value: '30° és 60°'
      },
      {
        id: 'pdm3-3',
        prompt: 'Háromszög oldalai 2 : 3 : 6 arányúak',
        value: 'Nem létezik (2 + 3 = 5 < 6, sérül a háromszög-egyenlőtlenség)'
      },
      {
        id: 'pdm3-4',
        prompt: 'Tört arányok egészre hozása: 1/2 : 1/3 : 1/4',
        value: '6 : 4 : 3 (közös nevező: 12)'
      },
      {
        id: 'pdm3-5',
        prompt: '200 g aranyékszer arany : ezüst : réz = 14 : 3 : 3 arányban',
        value: '140 g tiszta arany (14 · 10 g)'
      },
      {
        id: 'pdm3-6',
        prompt: 'Fordított arányos osztás 2 és 3 hibapont szerint',
        value: '1/2 : 1/3 = 3 : 2 arányú felosztás'
      },
      {
        id: 'pdm3-7',
        prompt: '420 000 Ft jutalom 12, 15, 18 nap arányában (4 : 5 : 6)',
        value: '168 000 Ft a legtöbbet dolgozónak (6 · 28 000 Ft)'
      },
      {
        id: 'pdm3-8',
        prompt: '36 golyó piros, kék, zöld 2 : 3 : 4 arányban: zöld húzásának esélye',
        value: 'P = 4/9 ≈ 44,4%'
      }
    ]
  }
};

export const ProportionalDivisionMatcher: React.FC<ProportionalDivisionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level;

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
      topicId={topicId || 'g9-szamok-aranyos-osztas-matcher'}
      topicTitle={topicTitle || 'Arányos Osztás Párosító'}
    />
  );
};

export default ProportionalDivisionMatcher;
