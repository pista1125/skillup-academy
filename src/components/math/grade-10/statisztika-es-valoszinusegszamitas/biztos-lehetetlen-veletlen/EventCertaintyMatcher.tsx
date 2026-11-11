import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface EventCertaintyMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Eseménytípusok és alapfogalmak',
    subtitle: 'Párosítsd az események típusait és valószínűségi tulajdonságait a szabatos definíciójukkal!',
    pairs: [
      {
        id: 'ecm1-1',
        left: 'Biztos esemény (I vagy Ω)',
        right: 'Minden kísérletben garantáltan bekövetkezik, valószínűsége P = 1 (100%)'
      },
      {
        id: 'ecm1-2',
        left: 'Lehetetlen esemény (∅)',
        right: 'Egyetlen kísérlet során sem valósulhat meg, valószínűsége P = 0 (0%)'
      },
      {
        id: 'ecm1-3',
        left: 'Véletlen (lehetséges) esemény',
        right: 'Bekövetkezhet, de nem biztos: valószínűsége szigorúan 0 és 1 közé esik (0 < P < 1)'
      },
      {
        id: 'ecm1-4',
        left: 'Komplementer (ellentett) esemény',
        right: 'Az A esemény be nem következése: valószínűsége P(nem A) = 1 – P(A)'
      },
      {
        id: 'ecm1-5',
        left: 'Egymást kizáró események',
        right: 'Egyszerre sohasem következhetnek be (metszetük üres halmaz)'
      },
      {
        id: 'ecm1-6',
        left: 'Egymást kizáró események uniója',
        right: 'Valószínűségük összeadódik: P(A vagy B) = P(A) + P(B)'
      },
      {
        id: 'ecm1-7',
        left: 'Két kocka összege legfeljebb 12',
        right: 'Biztos esemény (P = 1)'
      },
      {
        id: 'ecm1-8',
        left: 'Két kocka összege pontosan 13',
        right: 'Lehetetlen esemény (P = 0)'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Tankönyvi feladatok és törtes valószínűségek',
    subtitle: 'Párosítsd a tankönyvi szöveges feladatok eseményeit a pontos valószínűségükkel!',
    pairs: [
      {
        id: 'ecm2-1',
        left: 'Gyöngyök: 1/6 fehér, 1/4 piros, 1/2 zöld → Sárga esélye',
        right: '1/12'
      },
      {
        id: 'ecm2-2',
        left: 'Gyöngyök: kék gyöngy húzásának esélye',
        right: '0 (lehetetlen esemény)'
      },
      {
        id: 'ecm2-3',
        left: 'Gyöngyök: piros VAGY zöld húzásának esélye',
        right: '3/4 = 75%'
      },
      {
        id: 'ecm2-4',
        left: '10.a osztály: 22 lány, 13 fiú, 4 lány után fiú',
        right: '13/31'
      },
      {
        id: 'ecm2-5',
        left: 'Müzliszelet: 15 almás, 5 mogyorós → 2/5 mogyorós esélyhez',
        right: 'Még 5 db mogyorósat kell hozzátenni'
      },
      {
        id: 'ecm2-6',
        left: '60 golyó: 24 fehér és 36 fekete → 60% fehér esélyhez',
        right: 'Még 30 db fehér golyót kell betenni'
      },
      {
        id: 'ecm2-7',
        left: 'Repülőgép: 200 utasból 72 angol → NEM angol utas esélye',
        right: '128/200 = 64%'
      },
      {
        id: 'ecm2-8',
        left: 'Kockadobás: a dobott szám osztója 60-nak',
        right: '1 (biztos esemény)'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Tételek, logikai szabályok és biztos húzások',
    subtitle: 'Párosítsd a haladó valószínűségi tételeket és skatulyaelvi feladatokat!',
    pairs: [
      {
        id: 'ecm3-1',
        left: 'Kockadobás: a dobott szám osztható 60-nal',
        right: 'P = 0 (lehetetlen esemény)'
      },
      {
        id: 'ecm3-2',
        left: 'Számkártyák {1, 2, 3}: a háromjegyű szám páratlan',
        right: '2/3'
      },
      {
        id: 'ecm3-3',
        left: 'Három érme: pontosan 2 fej és 1 írás',
        right: '3/8'
      },
      {
        id: 'ecm3-4',
        left: 'Két érme: legalább az egyik érmén Írás látható',
        right: '3/4'
      },
      {
        id: 'ecm3-5',
        left: 'Két kocka összege kisebb 16-nál',
        right: 'P = 1 (biztos esemény)'
      },
      {
        id: 'ecm3-6',
        left: '„Legalább egy” feladatok megoldási stratégiája',
        right: 'P(legalább egy) = 1 – P(egyik sem)'
      },
      {
        id: 'ecm3-7',
        left: '10 szám (4 negatív, 6 nemnegatív) → biztos negatív húzása',
        right: 'Legalább 7 db számot kell húzni'
      },
      {
        id: 'ecm3-8',
        left: 'Valószínűségi értékhatárok axiómája',
        right: 'Minden eseményre 0 ≤ P(A) ≤ 1, és P(A) + P(Ā) = 1'
      }
    ]
  }
};

export const EventCertaintyMatcher: React.FC<EventCertaintyMatcherProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;
  return (
    <MatcherTemplate
      topicTitle="Biztos, lehetetlen, véletlen események"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="amber"
      levels={matcherLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default EventCertaintyMatcher;

