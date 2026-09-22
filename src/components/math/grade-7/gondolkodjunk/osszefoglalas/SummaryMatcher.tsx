import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SummaryMatcherProps {
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
  // LEVEL 1: Fejezeti Képletek és Alapfogalmak
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Fejezeti Képletek és Alapfogalmak',
    description: 'Párosítsd a fejezet legfontosabb fogalmait a pontos matematikai képletekkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'n elem összes lehetséges sorrendje (permutáció)',
        value: 'n! = n · (n - 1) · ... · 1'
      },
      {
        id: 'p2',
        prompt: 'Gráfelmélet alaptétele (Kézfogási tétel)',
        value: 'Fokszámösszeg = 2 · Élek száma (Σ d(v) = 2|E|)'
      },
      {
        id: 'p3',
        prompt: 'Teljes gráf (Kₙ) éleinek száma',
        value: 'n · (n - 1) / 2 él'
      },
      {
        id: 'p4',
        prompt: 'Fa gráf (Tₙ) éleinek száma',
        value: 'n - 1 él (körmentes és összefüggő)'
      },
      {
        id: 'p5',
        prompt: '21-es kavicslevételi játék nyerő számai',
        value: 'A 4 többszörösei (4, 8, 12, 16, 20)'
      },
      {
        id: 'p6',
        prompt: 'Skatulya-elv (Dirichlet)',
        value: 'n + 1 elem n dobozban → legalább egyben ≥ 2 elem'
      },
      {
        id: 'p7',
        prompt: '„Minden...” állítás pontos tagadása',
        value: '„Van olyan, amelyik NEM...”'
      },
      {
        id: 'p8',
        prompt: 'Kombinatorikai szorzási szabály',
        value: 'Független választások: a · b · c...'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Számolási Mintafeladatok
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Számolási Feladványok és Eredmények',
    description: 'Párosítsd a feladványokat a pontos számolási eredménnyel!',
    pairs: [
      {
        id: 'p1',
        prompt: '5 tanuló hányféleképpen állhat sorba az ebédlőnél?',
        value: '5! = 5 · 4 · 3 · 2 · 1 = 120 féle sorrend'
      },
      {
        id: 'p2',
        prompt: '6 fős baráti társaságban mindenki kezet fog mindenkivel',
        value: '(6 · 5) / 2 = 15 kézfogás'
      },
      {
        id: 'p3',
        prompt: '3 nadrág és 4 ing kombinációi',
        value: '3 · 4 = 12 különböző szett'
      },
      {
        id: 'p4',
        prompt: 'Egy 5 csúcsú fa gráf éleinek száma',
        value: '5 - 1 = 4 él'
      },
      {
        id: 'p5',
        prompt: 'Hány 4-jegyű PIN kód készíthető a 0-9 jegyekből?',
        value: '10 · 10 · 10 · 10 = 10 000 kód'
      },
      {
        id: 'p6',
        prompt: 'Hány 3-jegyű szám alkotható az 1, 2, 3 jegyekből (különböző jegyek)?',
        value: '3! = 6 darab szám'
      },
      {
        id: 'p7',
        prompt: '2 színű zokniból legalább hányat kell húzni egy biztos párhoz?',
        value: '2 + 1 = 3 darab zokni'
      },
      {
        id: 'p8',
        prompt: 'Két szabályos dobókocka együttes kimenetelei',
        value: '6 · 6 = 36 dobáspár'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Összetett Logika és Szabályok
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Haladó Logika és Nyerő Stratégiák',
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
        prompt: 'Kerek asztal érmelerakós játék nyerő lépése',
        value: 'Kezdő elfoglalja a középpontot, majd tükrözi a lépéseket'
      },
      {
        id: 'p4',
        prompt: 'Általános állítás cáfolatához szükséges',
        value: 'Pontosan 1 db működő ellenpélda felmutatása elegendő'
      },
      {
        id: 'p5',
        prompt: 'Gráfban a páratlan fokszámú csúcsok száma',
        value: 'Mindig PÁROS darab (0, 2, 4, 6...)'
      },
      {
        id: 'p6',
        prompt: 'Két egyforma kupacos Nim játék nyerő lépése',
        value: 'A 2. játékos szimmetrikusan ugyanannyit vesz el a másik kupacból'
      },
      {
        id: 'p7',
        prompt: 'Lakos mondja: „Mindketten hazugok vagyunk.”',
        value: 'A beszélő hazug, a társa igazmondó (lovag)'
      },
      {
        id: 'p8',
        prompt: 'Indirekt bizonyítás lényege',
        value: 'Feltesszük a tagadást, és ellentmondásra jutunk'
      }
    ]
  }
};

export const SummaryMatcher: React.FC<SummaryMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onNextLevel,
  level = 1,
  topicId = 'g7-logic-summary',
  topicTitle = '7. Összefoglalás'
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
      themeColor="rose"
      levels={matcherLevels}
    />
  );
};
