import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface RatioSummaryMatcherProps {
  level?: any;
  currentLevel?: any;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
}

export const RatioSummaryMatcher: React.FC<RatioSummaryMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapfogalmak)
    // ==========================================
    {
      id: 'rsm-1',
      level: 1,
      prompt: '15 : 25 arány legegyszerűbb alakja',
      value: '3 : 5',
      hint: 'Oszd 5-tel.'
    },
    {
      id: 'rsm-2',
      level: 1,
      prompt: 'Egyenes arányosság összefüggése',
      value: 'y = k · x',
      hint: 'Állandó hányados.'
    },
    {
      id: 'rsm-3',
      level: 1,
      prompt: '2000 Ft 15%-a',
      value: '300 Ft',
      hint: '20 · 15.'
    },
    {
      id: 'rsm-4',
      level: 1,
      prompt: '120-nak a 3/4 része',
      value: '90',
      hint: '120 : 4 · 3.'
    },
    {
      id: 'rsm-5',
      level: 1,
      prompt: '3x + 5 = 26 egyenlet gyöke',
      value: 'x = 7',
      hint: '3x = 21.'
    },
    {
      id: 'rsm-6',
      level: 1,
      prompt: '24 fős osztály, fiú-lány arány 1 : 2',
      value: '16 lány (és 8 fiú)',
      hint: '3 rész.'
    },
    {
      id: 'rsm-7',
      level: 1,
      prompt: '10 000 Ft kabát -20% engedménnyel',
      value: '8 000 Ft az új ár',
      hint: '80%-a.'
    },
    {
      id: 'rsm-8',
      level: 1,
      prompt: '0 · x = 7 egyenlet megoldásai',
      value: '0 megoldás (nincs gyöke)',
      hint: 'Ellentmondás.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Alkalmazások)
    // ==========================================
    {
      id: 'rsm-9',
      level: 2,
      prompt: 'Két szám aránya 4 : 7, összegük 132',
      value: 'Nagyobbik szám: 84',
      hint: '11 rész = 132.'
    },
    {
      id: 'rsm-10',
      level: 2,
      prompt: '3 kg alma 1350 Ft, mennyi 5 kg?',
      value: '2 250 Ft',
      hint: '450 Ft/kg.'
    },
    {
      id: 'rsm-11',
      level: 2,
      prompt: 'Egy szám 30%-a 45',
      value: 'Az egész szám: 150',
      hint: '45 : 0,3.'
    },
    {
      id: 'rsm-12',
      level: 2,
      prompt: '35 a 140-nek',
      value: '25%-a',
      hint: '1/4 rész.'
    },
    {
      id: 'rsm-13',
      level: 2,
      prompt: '5x - 8 = 2x + 13 megoldása',
      value: 'x = 7',
      hint: '3x = 21.'
    },
    {
      id: 'rsm-14',
      level: 2,
      prompt: 'Téglalap K = 48 cm, arány 5 : 3',
      value: 'Terület: 135 cm²',
      hint: 'a = 15, b = 9.'
    },
    {
      id: 'rsm-15',
      level: 2,
      prompt: '+15% emelés után 4600 Ft',
      value: 'Eredeti ár: 4 000 Ft',
      hint: '4600 : 1,15.'
    },
    {
      id: 'rsm-16',
      level: 2,
      prompt: 'Anna 6 évvel idősebb, összegük 28 év',
      value: 'Péter kora: 11 év',
      hint: '2x + 6 = 28.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Kihívások)
    // ==========================================
    {
      id: 'rsm-17',
      level: 3,
      prompt: '40 000 Ft cipő: -10%, majd +10%',
      value: '39 600 Ft',
      hint: '36 000 · 1,1.'
    },
    {
      id: 'rsm-18',
      level: 3,
      prompt: 'Háromszög szögaránya 2 : 3 : 5',
      value: 'Legnagyobb szög: 90°',
      hint: '1 rész = 18°.'
    },
    {
      id: 'rsm-19',
      level: 3,
      prompt: 'Maradt víz 40%-a = 24 liter',
      value: 'Eredeti víz: 60 liter',
      hint: '24 : 0,4.'
    },
    {
      id: 'rsm-20',
      level: 3,
      prompt: '4(x - 3) = 2(x + 5) megoldása',
      value: 'x = 11',
      hint: '2x = 22.'
    },
    {
      id: 'rsm-21',
      level: 3,
      prompt: '180 km egymással szemben (70 és 50 km/h)',
      value: '1,5 óra múlva találkoznak',
      hint: '180 : 120.'
    },
    {
      id: 'rsm-22',
      level: 3,
      prompt: '2x + 3y = 18 természetes számpárok',
      value: '4 megoldás: (9;0) ... (0;6)',
      hint: 'y páros.'
    },
    {
      id: 'rsm-23',
      level: 3,
      prompt: 'Apa 38, lány 12 év; mikor kétszeres?',
      value: '14 év múlva',
      hint: '38 + x = 2(12 + x).'
    },
    {
      id: 'rsm-24',
      level: 3,
      prompt: 'Téglalap T = K egész oldalakkal (a ≤ b)',
      value: '2 megoldás: 4×4 és 3×6',
      hint: '(a-2)(b-2) = 4.'
    }
  ];

  return (
    <MatcherTemplate
      title="IV. Témaköri Összefoglaló Párosító"
      subtitle="Kösd össze a fejezet feladatait és modelljeit a pontos eredményekkel 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="slate"
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RatioSummaryMatcher;
