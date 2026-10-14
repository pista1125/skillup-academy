import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface OpenSentencesMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const OpenSentencesMatcher: React.FC<OpenSentencesMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Egylépéses egyenletek és alapok)
    // ==========================================
    {
      id: 'g6-os-m-1',
      level: 1,
      prompt: 'x + 9 = 25',
      value: 'x = 16',
      hint: '25 - 9.'
    },
    {
      id: 'g6-os-m-2',
      level: 1,
      prompt: 'x - 14 = 30',
      value: 'x = 44',
      hint: '30 + 14.'
    },
    {
      id: 'g6-os-m-3',
      level: 1,
      prompt: '4x = 36',
      value: 'x = 9',
      hint: '36 : 4.'
    },
    {
      id: 'g6-os-m-4',
      level: 1,
      prompt: 'x / 5 = 8',
      value: 'x = 40',
      hint: '8 · 5.'
    },
    {
      id: 'g6-os-m-5',
      level: 1,
      prompt: '35 - x = 18',
      value: 'x = 17',
      hint: '35 - 18.'
    },
    {
      id: 'g6-os-m-6',
      level: 1,
      prompt: 'x + 15 = 15',
      value: 'x = 0',
      hint: '15 - 15.'
    },
    {
      id: 'g6-os-m-7',
      level: 1,
      prompt: '„Egy szám háromszorosánál 7-tel több”',
      value: '3x + 7 algebrai kifejezés',
      hint: '3-szoros szorzás + 7.'
    },
    {
      id: 'g6-os-m-8',
      level: 1,
      prompt: 'x < 4 a természetes számokon',
      value: '0, 1, 2, 3 megoldáshalmaz',
      hint: '4-nél kisebb természetes számok.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Kétlépéses egyenletek lebontogatással)
    // ==========================================
    {
      id: 'g6-os-m-9',
      level: 2,
      prompt: '2x + 7 = 23',
      value: 'x = 8 megoldás',
      hint: '2x = 16.'
    },
    {
      id: 'g6-os-m-10',
      level: 2,
      prompt: '3x - 8 = 16',
      value: 'x = 8 ellenőrizve',
      hint: '3x = 24.'
    },
    {
      id: 'g6-os-m-11',
      level: 2,
      prompt: '5x + 12 = 47',
      value: 'x = 7 gyök',
      hint: '5x = 35.'
    },
    {
      id: 'g6-os-m-12',
      level: 2,
      prompt: '(x + 6) / 4 = 5',
      value: 'x = 14 megoldás',
      hint: 'x + 6 = 20.'
    },
    {
      id: 'g6-os-m-13',
      level: 2,
      prompt: '30 - 3x = 12',
      value: 'x = 6 gyök',
      hint: '3x = 18.'
    },
    {
      id: 'g6-os-m-14',
      level: 2,
      prompt: '6x - 15 = 21',
      value: 'x = 6 megoldás',
      hint: '6x = 36.'
    },
    {
      id: 'g6-os-m-15',
      level: 2,
      prompt: 'Két egymást követő egész összege 45',
      value: '22 és 23 számok',
      hint: '2x + 1 = 45.'
    },
    {
      id: 'g6-os-m-16',
      level: 2,
      prompt: '2x + 3 ≤ 11 a természetes számokon',
      value: '5 darab megoldás (0, 1, 2, 3, 4)',
      hint: 'x ≤ 4.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Zárójelek, mindkét oldalon ismeretlen)
    // ==========================================
    {
      id: 'g6-os-m-17',
      level: 3,
      prompt: '5x + 4 = 2x + 19',
      value: 'x = 5 megoldás',
      hint: '3x = 15.'
    },
    {
      id: 'g6-os-m-18',
      level: 3,
      prompt: '3 · (x + 4) = 27',
      value: 'x = 5 gyök',
      hint: 'x + 4 = 9.'
    },
    {
      id: 'g6-os-m-19',
      level: 3,
      prompt: '4 · (2x - 3) = 28',
      value: 'x = 5 ellenőrzéssel',
      hint: '2x - 3 = 7.'
    },
    {
      id: 'g6-os-m-20',
      level: 3,
      prompt: '7x - 15 = 3x + 9',
      value: 'x = 6 megoldás',
      hint: '4x = 24.'
    },
    {
      id: 'g6-os-m-21',
      level: 3,
      prompt: 'x / 2 + x / 4 = 18',
      value: 'x = 24 megoldás',
      hint: '3x = 72.'
    },
    {
      id: 'g6-os-m-22',
      level: 3,
      prompt: '5 · (x - 2) - 2x = 11',
      value: 'x = 7 megoldás',
      hint: '3x - 10 = 11.'
    },
    {
      id: 'g6-os-m-23',
      level: 3,
      prompt: '2x + 6 = 2 · (x + 3)',
      value: 'Végtelen sok megoldás (azonosság)',
      hint: 'Minden valós szám kielégíti.'
    },
    {
      id: 'g6-os-m-24',
      level: 3,
      prompt: '3x + 5 = 3x + 10',
      value: 'Nincs megoldása (ellentmondás: 5 = 10)',
      hint: 'Lehetetlen egyenlőség.'
    }
  ];

  return (
    <MatcherTemplate
      title="Nyitott mondatok és egyenletek párosító"
      subtitle="Párosítsd az egyenleteket, kifejezéseket és a megoldásaikat 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="violet"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default OpenSentencesMatcher;
