import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface ArithmeticGeometricMatcherProps {
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
}

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és egyszerű középértékek',
    description: 'Párosítsd össze a számokat a számtani és mértani közepükkel vagy alapvető geometriai jelentésükkel!',
    badge: '1. SZINT • ALAPOK',
    pairs: [
      {
        id: 'agm1-1',
        prompt: '2 és 8 számtani közepe',
        value: '5'
      },
      {
        id: 'agm1-2',
        prompt: '2 és 8 mértani közepe',
        value: '4'
      },
      {
        id: 'agm1-3',
        prompt: '4 és 9 mértani közepe',
        value: '6'
      },
      {
        id: 'agm1-4',
        prompt: '100 és 400 számtani közepe',
        value: '250'
      },
      {
        id: 'agm1-5',
        prompt: '100 és 400 mértani közepe',
        value: '200'
      },
      {
        id: 'agm1-6',
        prompt: 'A = G egyenlőség feltétele',
        value: 'Pontosan akkor, ha a = b'
      },
      {
        id: 'agm1-7',
        prompt: 'Azonos területű négyzet oldala (a, b téglalaphoz)',
        value: 's = √(ab)'
      },
      {
        id: 'agm1-8',
        prompt: 'Azonos kerületű négyzet oldala (a, b téglalaphoz)',
        value: 's = (a + b) / 2'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egyenlőtlenség, geometriai tételek és hiányzó adatok',
    description: 'Párosítsd a nevezetes egyenlőtlenség geometriai modelljét és konkrét számítási feladatait!',
    badge: '2. SZINT • KÖZÉPSZINT',
    pairs: [
      {
        id: 'agm2-1',
        prompt: 'Két szám: számtani közép = 125, mértani = 44',
        value: 'a = 242 és b = 8'
      },
      {
        id: 'agm2-2',
        prompt: '18 és 50 mértani közepe',
        value: '30'
      },
      {
        id: 'agm2-3',
        prompt: '121 és 361 mértani közepe',
        value: '209'
      },
      {
        id: 'agm2-4',
        prompt: 'Thálész-félkör sugara mint középérték',
        value: 'R = (a + b) / 2'
      },
      {
        id: 'agm2-5',
        prompt: 'Thálész-félkörben állított magasság',
        value: 'm = √(ab)'
      },
      {
        id: 'agm2-6',
        prompt: 'Téglalap: a = 27 cm, b = 12 cm területe',
        value: 'T = 324 cm²'
      },
      {
        id: 'agm2-7',
        prompt: 'Kerület minimalizálása adott 100 m² területhez',
        value: 'K_min = 40 m'
      },
      {
        id: 'agm2-8',
        prompt: 'Pozitív szám és reciproka: a + 1/a (a > 0)',
        value: 'Mindig legalább 2 (egyenlőség ha a = 1)'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szélsőértékek, pénzügyek és emelt szintű összefüggések',
    description: 'Párosítsd a szélsőérték-feladatokat, a tőkenövekedési arányokat és az algebrai bizonyítás lépéseit!',
    badge: '3. SZINT • EMELT SZINT',
    pairs: [
      {
        id: 'agm3-1',
        prompt: 'Antal köztes bére (150k és 216k, fix forintnövekedés)',
        value: '183 ezer Ft'
      },
      {
        id: 'agm3-2',
        prompt: 'Benő köztes bére (150k és 216k, fix szorzó)',
        value: '180 ezer Ft'
      },
      {
        id: 'agm3-3',
        prompt: 'Tőkenövekedés szorzói: 1,21 és 1,69',
        value: 'Átlagos éves szorzó: 1,43'
      },
      {
        id: 'agm3-4',
        prompt: 'Telek bekerítése 52 m kerítéssel',
        value: 'Max terület: 169 m²'
      },
      {
        id: 'agm3-5',
        prompt: 'Pozitív számok: összegük 20, maximális szorzatuk',
        value: 'Max szorzat = 100'
      },
      {
        id: 'agm3-6',
        prompt: 'Pozitív számok: szorzatuk 36, minimális összegük',
        value: 'Min összeg = 12'
      },
      {
        id: 'agm3-7',
        prompt: 'Az egyenlőtlenség alapténye: (a - b)² ≥ 0',
        value: 'a² + 2ab + b² ≥ 4ab ⟹ (a+b)/2 ≥ √(ab)'
      },
      {
        id: 'agm3-8',
        prompt: 'Negatív szám és reciproka: a + 1/a (a < 0)',
        value: 'Mindig legfeljebb -2 (egyenlőség ha a = -1)'
      }
    ]
  }
};

export const ArithmeticGeometricMatcher: React.FC<ArithmeticGeometricMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicTitle="Számtani és mértani közép párosító"
      topicSubtitle="Gyakorold a számtani és mértani közép fogalmát, a nevezetes egyenlőtlenséget és a szélsőérték-feladatokat!"
      levels={matcherLevels}
      themeColor="teal"
      topicId="g10-stat-szamtani-mertani-kozep-matcher"
      {...props}
    />
  );
};

export default ArithmeticGeometricMatcher;

