import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProofMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onNextLevel?: () => void;
  level?: DifficultyLevel;
  topicId?: string;
  topicTitle?: string;
}

// 3 levels × 8 pairs = 24 pairs
const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  // ==========================================
  // LEVEL 1: Állítások és Pontos Logikai Tagadásuk
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Állítások és Tagadások',
    description: 'Párosítsd az állításokat a pontos logikai tagadásukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '„Minden prímszám páratlan.”',
        value: '„Van olyan prímszám, amelyik páros.”'
      },
      {
        id: 'p2',
        prompt: '„Minden háromszög hegyesszögű.”',
        value: '„Van olyan háromszög, amelyik nem hegyesszögű.”'
      },
      {
        id: 'p3',
        prompt: '„Van olyan négyzetszám, ami páratlan.”',
        value: '„Egyetlen négyzetszám sem páratlan (mind páros).”'
      },
      {
        id: 'p4',
        prompt: '„Minden diák szereti a matekot.”',
        value: '„Van olyan diák, aki nem szereti a matekot.”'
      },
      {
        id: 'p5',
        prompt: '„Van olyan négyszög, amelynek 4 derékszöge van.”',
        value: '„Egyetlen négyszögnek sincs 4 derékszöge.”'
      },
      {
        id: 'p6',
        prompt: '„Minden páros szám osztható 4-gyel.”',
        value: '„Van olyan páros szám, amelyik nem osztható 4-gyel.”'
      },
      {
        id: 'p7',
        prompt: '„Minden egész szám négyzete pozitív.”',
        value: '„Van olyan egész szám, melynek négyzete nem pozitív (a 0).”'
      },
      {
        id: 'p8',
        prompt: '„Senki sem tudott minden feladatot megoldani.”',
        value: '„Volt legalább egy valaki, aki minden feladatot megoldott.”'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Hamis Állítások és Cáfoló Ellenpéldáik
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Állítások és Ellenpéldák',
    description: 'Párosítsd a hibás állításokat a cáfoló ellenpéldájukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '„Ha egy szám osztható 6-tal és 8-cal, osztható 48-cal is.”',
        value: 'Ellenpélda: 24 (osztható 6-tal és 8-cal, de 48-cal nem)'
      },
      {
        id: 'p2',
        prompt: '„Minden prímszám páratlan.”',
        value: 'Ellenpélda: 2 (az egyetlen páros prímszám)'
      },
      {
        id: 'p3',
        prompt: '„Ha egy négyszög minden oldala egyenlő, akkor négyzet.”',
        value: 'Ellenpélda: Rombusz (szögei nem derékszögek)'
      },
      {
        id: 'p4',
        prompt: '„Ha egy négyszög átlói merőlegesek, akkor deltoid.”',
        value: 'Ellenpélda: Szimmetrikus húrtrapéz merőleges átlókkal'
      },
      {
        id: 'p5',
        prompt: '„Két prímszám összege mindig páros.”',
        value: 'Ellenpélda: 2 + 3 = 5 (páratlan összeg a 2 miatt)'
      },
      {
        id: 'p6',
        prompt: '„Minden szám, melynek utolsó jegye 3, az prímszám.”',
        value: 'Ellenpélda: 33 (mert 33 = 3 · 11 összetett)'
      },
      {
        id: 'p7',
        prompt: '„Két háromszög területe egyenlő, ha kerületük egyenlő.”',
        value: 'Ellenpélda: 3-4-5 derékszögű (T=6) és 4-4-4 szabályos (T≈6.93)'
      },
      {
        id: 'p8',
        prompt: '„Egy szám négyzete mindig nagyobb magánál a számnál.”',
        value: 'Ellenpélda: 0 (0² = 0) vagy 1 (1² = 1)'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Logikai Szabályok és Skatulya-elv
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Szabályok, Bizonyítás és Skatulya-elv',
    description: 'Párosítsd a logikai összefüggéseket a megfelelő indoklással!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Két páratlan szám összege: (2k + 1) + (2m + 1)',
        value: 'Mindig PÁROS szám: 2 · (k + m + 1)'
      },
      {
        id: 'p2',
        prompt: 'Három egymást követő egész összege: (n-1) + n + (n+1)',
        value: 'Mindig OSZTHATÓ 3-mal: 3n'
      },
      {
        id: 'p3',
        prompt: 'Skatulya-elv: 13 ember van egy teremben',
        value: 'Legalább 2 ember azonos hónapban született (12 hónap)'
      },
      {
        id: 'p4',
        prompt: 'Skatulya-elv: Fiókban fekete és fehér zoknik',
        value: 'Legalább 3 zoknit kell húzni egy biztos párhoz'
      },
      {
        id: 'p5',
        prompt: 'Indirekt bizonyítás lényege',
        value: 'Feltesszük a tagadást, és ellentmondásra jutunk'
      },
      {
        id: 'p6',
        prompt: 'Általános állítás cáfolásához szükséges',
        value: 'Pontosan 1 db működő ellenpélda felmutatása elég'
      },
      {
        id: 'p7',
        prompt: 'Általános tétel igazolásához szükséges',
        value: 'Minden esetre kiterjedő levezetés (nem elég pár példa)'
      },
      {
        id: 'p8',
        prompt: 'Skatulya-elv: 5 pont egy 2×2-es négyzetben',
        value: 'Legalább 2 pont távolsága ≤ √2 (a 4 kis négyzet miatt)'
      }
    ]
  }
};

export const ProofMatcher: React.FC<ProofMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onNextLevel,
  level = 1,
  topicId = 'g7-logic-proofs',
  topicTitle = '5. Igazold! Cáfold!'
}) => {
  return (
    <MatcherTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      level={level}
      topicId={topicId}
      topicTitle={topicTitle}
      badgeText="7. Osztály • Gondolkodjunk!"
      themeColor="cyan"
      levels={matcherLevels}
    />
  );
};
