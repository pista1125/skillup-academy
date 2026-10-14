import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface PercentageMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const PercentageMatcher: React.FC<PercentageMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Nevezetes százalékok és fogalmak)
    // ==========================================
    {
      id: 'g6-pct-m-1',
      level: 1,
      prompt: '50% tört alakja és jelentése',
      value: '1/2 része (a szám fele)',
      hint: '50 / 100 egyszerűsítve.'
    },
    {
      id: 'g6-pct-m-2',
      level: 1,
      prompt: '25% tört alakja és jelentése',
      value: '1/4 része (a szám negyede)',
      hint: '25 / 100 egyszerűsítve.'
    },
    {
      id: 'g6-pct-m-3',
      level: 1,
      prompt: '75% tört alakja és jelentése',
      value: '3/4 része (a szám háromnegyede)',
      hint: '3 · 25%.'
    },
    {
      id: 'g6-pct-m-4',
      level: 1,
      prompt: '20% tört alakja és jelentése',
      value: '1/5 része (a szám ötödrésze)',
      hint: '20 / 100 egyszerűsítve.'
    },
    {
      id: 'g6-pct-m-5',
      level: 1,
      prompt: '10% tört alakja és jelentése',
      value: '1/10 része (a szám tizede)',
      hint: '10 / 100 egyszerűsítve.'
    },
    {
      id: 'g6-pct-m-6',
      level: 1,
      prompt: 'Százalékalap (a)',
      value: 'A kiinduló teljes 100%-os egész mennyiség',
      hint: 'A számítás viszonyítási alapja.'
    },
    {
      id: 'g6-pct-m-7',
      level: 1,
      prompt: 'Százalékláb (p%)',
      value: 'A százalékos arány megadása % jellel',
      hint: 'Megmutatja a századrészek számát.'
    },
    {
      id: 'g6-pct-m-8',
      level: 1,
      prompt: 'Százalékérték (é)',
      value: 'A százaléknak megfelelő tényleges részérték',
      hint: 'Az alap kiszámított része mértékegységgel.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Számítások mindhárom mennyiségre)
    // ==========================================
    {
      id: 'g6-pct-m-9',
      level: 2,
      prompt: '300 Ft-nak a 15%-a',
      value: '45 Ft',
      hint: '1% = 3 Ft, majd 3 · 15.'
    },
    {
      id: 'g6-pct-m-10',
      level: 2,
      prompt: 'Melyik számnak a 20%-a a 60?',
      value: '300',
      hint: '60 · 5 (az ötödrészből az egész).'
    },
    {
      id: 'g6-pct-m-11',
      level: 2,
      prompt: 'A 12 a 60-nak hány százaléka?',
      value: '20%-a',
      hint: '12 / 60 = 1/5 = 20%.'
    },
    {
      id: 'g6-pct-m-12',
      level: 2,
      prompt: '500-nak a 40%-a',
      value: '200',
      hint: '500 · 0,4 = 200.'
    },
    {
      id: 'g6-pct-m-13',
      level: 2,
      prompt: 'Melyik számnak a 25%-a az 50?',
      value: '200',
      hint: 'Ha a negyede 50, négyszer annyi az egész.'
    },
    {
      id: 'g6-pct-m-14',
      level: 2,
      prompt: '15 perc az 1 órának hány százaléka?',
      value: '25%-a (negyedóra)',
      hint: '15 / 60 = 1/4.'
    },
    {
      id: 'g6-pct-m-15',
      level: 2,
      prompt: '800 Ft-nak a 35%-a',
      value: '280 Ft',
      hint: '800 · 0,35 = 280.'
    },
    {
      id: 'g6-pct-m-16',
      level: 2,
      prompt: 'Melyik számnak a 10%-a a 42?',
      value: '420',
      hint: '42 · 10 = 420.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett feladványok és összefüggések)
    // ==========================================
    {
      id: 'g6-pct-m-17',
      level: 3,
      prompt: '20% kedvezmény után 16 000 Ft az ár (80% maradt)',
      value: 'Eredeti ár: 20 000 Ft',
      hint: '16 000 : 80 · 100.'
    },
    {
      id: 'g6-pct-m-18',
      level: 3,
      prompt: '25% áremelés után 2500 Ft az ár (125% lett)',
      value: 'Eredeti ár: 2000 Ft',
      hint: '2500 : 1,25.'
    },
    {
      id: 'g6-pct-m-19',
      level: 3,
      prompt: '10%-os áremelés szorzótényezője',
      value: '1,10-szeres szorzó',
      hint: '100% + 10% = 110% = 1,10.'
    },
    {
      id: 'g6-pct-m-20',
      level: 3,
      prompt: '15%-os árengedmény szorzótényezője',
      value: '0,85-szörös szorzó',
      hint: '100% - 15% = 85% = 0,85.'
    },
    {
      id: 'g6-pct-m-21',
      level: 3,
      prompt: '60-nak a 40%-a és 40-nek a 60%-a',
      value: 'Egyenlőek: mindkettő 24',
      hint: 'A szorzótényezők sorrendje felcserélhető.'
    },
    {
      id: 'g6-pct-m-22',
      level: 3,
      prompt: '500 fős iskola 44%-a fiú tanuló',
      value: '220 fiú jár az iskolába',
      hint: '500 · 0,44 = 220.'
    },
    {
      id: 'g6-pct-m-23',
      level: 3,
      prompt: '500 g 12%-os sóoldat konyhasótartalma',
      value: '60 gramm só',
      hint: '500 · 0,12 = 60.'
    },
    {
      id: 'g6-pct-m-24',
      level: 3,
      prompt: '20% emelés, majd az új ár 20% csökkentése',
      value: '4%-os csökkenés az eredetihez képest',
      hint: '1,2 · 0,8 = 0,96 (96%).'
    }
  ];

  return (
    <MatcherTemplate
      title="Százalékszámítás párosító"
      subtitle="Párosítsd a nevezetes százalékokat, számításokat és szöveges feladványokat 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="rose"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentageMatcher;
