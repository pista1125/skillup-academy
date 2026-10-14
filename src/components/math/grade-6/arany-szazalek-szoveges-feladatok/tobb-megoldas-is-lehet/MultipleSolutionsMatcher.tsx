import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface MultipleSolutionsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const MultipleSolutionsMatcher: React.FC<MultipleSolutionsMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Megoldások száma)
    // ==========================================
    {
      id: 'g6-ms-m-1',
      level: 1,
      prompt: '0 · x = 8 egyenlet a valós számokon',
      value: '0 megoldás (nincs megoldása)',
      hint: '0 sosem egyenlő 8-cal.'
    },
    {
      id: 'g6-ms-m-2',
      level: 1,
      prompt: '0 · x = 0 egyenlet a valós számokon',
      value: 'Végtelen sok megoldása van',
      hint: 'Minden valós számra teljesül.'
    },
    {
      id: 'g6-ms-m-3',
      level: 1,
      prompt: '2x + 6 = 16 egyenlet',
      value: 'Pontosan 1 megoldás (x = 5)',
      hint: '2x = 10.'
    },
    {
      id: 'g6-ms-m-4',
      level: 1,
      prompt: 'Pozitív egész számok, melyek kisebbek 5-nél',
      value: '4 megoldás: 1, 2, 3, 4',
      hint: 'A 0 nem pozitív szám.'
    },
    {
      id: 'g6-ms-m-5',
      level: 1,
      prompt: 'Két természetes szám szorzata 6 (a ≤ b)',
      value: '2 számpár: (1; 6) és (2; 3)',
      hint: '6 osztópárjai.'
    },
    {
      id: 'g6-ms-m-6',
      level: 1,
      prompt: 'Téglalap területe 12 cm², egész oldalakkal',
      value: '3 téglalap: 1×12, 2×6, 3×4',
      hint: '12 osztópárjai.'
    },
    {
      id: 'g6-ms-m-7',
      level: 1,
      prompt: 'Páros prímszám a természetes számok között',
      value: 'Pontosan 1 darab (a 2)',
      hint: 'Egyetlen páros prím.'
    },
    {
      id: 'g6-ms-m-8',
      level: 1,
      prompt: 'Gyerekek száma egyenletből: x = 14,5',
      value: 'A valóságban nincs megoldása',
      hint: 'A létszám csak egész lehet.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Esetvizsgálat)
    // ==========================================
    {
      id: 'g6-ms-m-9',
      level: 2,
      prompt: 'Egyenlő szárú háromszög egyik szöge 50°',
      value: '2 féle szöghármas (80° vagy 65° szárszög)',
      hint: 'Alapon vagy száron van.'
    },
    {
      id: 'g6-ms-m-10',
      level: 2,
      prompt: 'Természetes számpárokra: x + y = 6',
      value: '7 számpár: (0;6) ... (6;0)',
      hint: '0-tól 6-ig.'
    },
    {
      id: 'g6-ms-m-11',
      level: 2,
      prompt: '400 Ft kifizetése 100 és 200 Ft-os érmékkel',
      value: '3 féleképpen lehetséges',
      hint: '200-asból 0, 1 vagy 2 db.'
    },
    {
      id: 'g6-ms-m-12',
      level: 2,
      prompt: 'Téglalap K = 18 cm, egész oldalak (a ≤ b)',
      value: '4 féle téglalap (a + b = 9)',
      hint: '1+8, 2+7, 3+6, 4+5.'
    },
    {
      id: 'g6-ms-m-13',
      level: 2,
      prompt: '2x + 4y = 15 az egész számok halmazán',
      value: 'Nincs egész megoldása',
      hint: 'Páros nem lehet egyenlő páratlannal.'
    },
    {
      id: 'g6-ms-m-14',
      level: 2,
      prompt: 'Kétjegyű számok, melyek jegyösszege 4',
      value: '4 darab (13, 22, 31, 40)',
      hint: 'Tízesek 1, 2, 3, 4.'
    },
    {
      id: 'g6-ms-m-15',
      level: 2,
      prompt: '3x < 14 a természetes számok halmazán',
      value: '5 megoldás: 0, 1, 2, 3, 4',
      hint: 'x < 4,66.'
    },
    {
      id: 'g6-ms-m-16',
      level: 2,
      prompt: '|x| = 7 egyenlet az egész számokon',
      value: '2 megoldás: 7 és -7',
      hint: 'Távolság a nullától.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett összefüggések)
    // ==========================================
    {
      id: 'g6-ms-m-17',
      level: 3,
      prompt: '3x + 4y = 24 a természetes számokon',
      value: '3 számpár: (8;0), (4;3), (0;6)',
      hint: 'y csak 0, 3, 6 lehet.'
    },
    {
      id: 'g6-ms-m-18',
      level: 3,
      prompt: 'Derékszögű háromszög oldalai szomszédos egészek',
      value: 'Pontosan 1 háromszög: 3, 4, 5 cm',
      hint: 'Pitagoraszi számhármas.'
    },
    {
      id: 'g6-ms-m-19',
      level: 3,
      prompt: 'Két prímszám összege 35',
      value: '0 prímpár (nincs ilyen prímösszeg)',
      hint: '35 - 2 = 33 nem prím.'
    },
    {
      id: 'g6-ms-m-20',
      level: 3,
      prompt: '500 Ft felváltása 50 és 100 Ft-osokra (mindből van)',
      value: '4 féleképpen váltható fel',
      hint: '100-asból 1, 2, 3 vagy 4 db.'
    },
    {
      id: 'g6-ms-m-21',
      level: 3,
      prompt: 'Téglalap T = K egész oldalakkal (a ≤ b)',
      value: '2 megoldás: 4×4 és 3×6',
      hint: '(a-2)(b-2) = 4.'
    },
    {
      id: 'g6-ms-m-22',
      level: 3,
      prompt: '12 / n tört értéke pozitív egész szám',
      value: '6 darab pozitív egész n létezik',
      hint: '12 pozitív osztói.'
    },
    {
      id: 'g6-ms-m-23',
      level: 3,
      prompt: 'Egyenlő szárú háromszög K = 20 cm, egész oldalak',
      value: '4 különböző háromszög létezik',
      hint: 'Szárak: 6, 7, 8, 9 cm.'
    },
    {
      id: 'g6-ms-m-24',
      level: 3,
      prompt: 'Kétjegyű számok, jegyszorzatuk 12',
      value: '4 darab: 26, 62, 34, 43',
      hint: '2·6 és 3·4 felcserélve.'
    }
  ];

  return (
    <MatcherTemplate
      title="Több megoldás is lehet párosító"
      subtitle="Párosítsd a feladatokat és feltételeket a lehetséges megoldások számával és eseteivel 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="amber"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default MultipleSolutionsMatcher;
