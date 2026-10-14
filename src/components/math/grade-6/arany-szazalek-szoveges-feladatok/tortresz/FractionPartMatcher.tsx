import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface FractionPartMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const FractionPartMatcher: React.FC<FractionPartMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapfogalmak és törtrészek)
    // ==========================================
    {
      id: 'g6-fp-m-1',
      level: 1,
      prompt: '120-nak a 3/4 része',
      value: '90',
      hint: '120 : 4 = 30, majd 30 · 3.'
    },
    {
      id: 'g6-fp-m-2',
      level: 1,
      prompt: '80-nak a 2/5 része',
      value: '32',
      hint: '80 : 5 = 16, majd 16 · 2.'
    },
    {
      id: 'g6-fp-m-3',
      level: 1,
      prompt: '200-nak az 1/4 része',
      value: '50',
      hint: '200 : 4.'
    },
    {
      id: 'g6-fp-m-4',
      level: 1,
      prompt: 'Törtrész kiszámításának szabálya',
      value: 'Egész mennyiség megszorozva a megadott törttel',
      hint: 'Törtrész = Egész · (a/b).'
    },
    {
      id: 'g6-fp-m-5',
      level: 1,
      prompt: 'Egész visszaszámolásának szabálya',
      value: 'Törtrész elosztva a megadott törttel',
      hint: 'Egész = Törtrész : (a/b).'
    },
    {
      id: 'g6-fp-m-6',
      level: 1,
      prompt: '1 óra (60 perc) 2/3 része',
      value: '40 perc',
      hint: '60 : 3 = 20, majd 20 · 2.'
    },
    {
      id: 'g6-fp-m-7',
      level: 1,
      prompt: '100 Ft-nak a 7/10 része',
      value: '70 Ft',
      hint: '100 : 10 = 10, majd 10 · 7.'
    },
    {
      id: 'g6-fp-m-8',
      level: 1,
      prompt: 'Hányadrésze a 45 a 90-nek?',
      value: '1/2 része (a fele)',
      hint: '45 / 90 egyszerűsítve.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Egész keresése és mértékegységek)
    // ==========================================
    {
      id: 'g6-fp-m-9',
      level: 2,
      prompt: 'Melyik számnak a 3/4 része a 60?',
      value: '80',
      hint: '60 : 3 = 20, majd 20 · 4.'
    },
    {
      id: 'g6-fp-m-10',
      level: 2,
      prompt: 'Melyik számnak a 2/5 része az 50?',
      value: '125',
      hint: '50 : 2 = 25, majd 25 · 5.'
    },
    {
      id: 'g6-fp-m-11',
      level: 2,
      prompt: '45 perc hányadrésze a 2 órának?',
      value: '3/8 része',
      hint: '2 óra = 120 perc. 45 / 120.'
    },
    {
      id: 'g6-fp-m-12',
      level: 2,
      prompt: '250 g hányadrésze az 1 kg-nak?',
      value: '1/4 része',
      hint: '1 kg = 1000 g. 250 / 1000.'
    },
    {
      id: 'g6-fp-m-13',
      level: 2,
      prompt: '180-nak az 5/6 része',
      value: '150',
      hint: '180 : 6 = 30, majd 30 · 5.'
    },
    {
      id: 'g6-fp-m-14',
      level: 2,
      prompt: 'Melyik számnak a 4/7 része a 28?',
      value: '49',
      hint: '28 : 4 = 7, majd 7 · 7.'
    },
    {
      id: 'g6-fp-m-15',
      level: 2,
      prompt: '15 cm hányadrésze az 1 méternek?',
      value: '3/20 része',
      hint: '1 m = 100 cm. 15 / 100.'
    },
    {
      id: 'g6-fp-m-16',
      level: 2,
      prompt: 'Melyik számnak a 7/9 része a 63?',
      value: '81',
      hint: '63 : 7 = 9, majd 9 · 9.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett szöveges feladványok)
    // ==========================================
    {
      id: 'g6-fp-m-17',
      level: 3,
      prompt: 'Pénz 1/3-ának elköltése után megmaradt 4000 Ft (2/3 rész)',
      value: 'Eredetileg 6000 Ft-ja volt',
      hint: '4000 : 2 = 2000, majd 2000 · 3.'
    },
    {
      id: 'g6-fp-m-18',
      level: 3,
      prompt: '1/4 résszel megnövelt ár lett 15 000 Ft (5/4 rész)',
      value: 'Eredeti ár: 12 000 Ft',
      hint: '15 000 : 5 = 3000, majd 3000 · 4.'
    },
    {
      id: 'g6-fp-m-19',
      level: 3,
      prompt: 'Egy szám 2/3 részének a 3/4 része 20 (fél rész)',
      value: 'A keresett szám a 40',
      hint: '2/3 · 3/4 = 1/2. Ha a fele 20, az egész 40.'
    },
    {
      id: 'g6-fp-m-20',
      level: 3,
      prompt: 'Akvárium 3/4 részéből 10 litert kimerve félig (2/4) lesz',
      value: 'Teljes űrtartalom: 40 liter',
      hint: '1/4 rész = 10 liter, 10 · 4 = 40.'
    },
    {
      id: 'g6-fp-m-21',
      level: 3,
      prompt: '360 oldalas könyv 5/9 részének elolvasása után hátralévő rész',
      value: '160 oldal van még hátra (4/9 rész)',
      hint: '360 : 9 · 4 = 160.'
    },
    {
      id: 'g6-fp-m-22',
      level: 3,
      prompt: 'Iskola 4/7 része lány, 60-nal több lány van mint fiú (1/7 rész = 60)',
      value: 'Az iskola összlétszáma: 420 tanuló',
      hint: '60 · 7 = 420.'
    },
    {
      id: 'g6-fp-m-23',
      level: 3,
      prompt: 'Egy számnak és a 3/4 részének különbsége 15 (1/4 rész = 15)',
      value: 'A keresett szám a 60',
      hint: '15 · 4 = 60.'
    },
    {
      id: 'g6-fp-m-24',
      level: 3,
      prompt: 'Hordó 1/3 része után még 20 liter hiányzik a feléhez (1/6 rész = 20 l)',
      value: 'A teli hordó 120 literes',
      hint: '1/2 - 1/3 = 1/6. 20 · 6 = 120.'
    }
  ];

  return (
    <MatcherTemplate
      title="Törtrész és egész párosító"
      subtitle="Párosítsd a törtrészeket, visszaszámolt egészeket és feladványokat 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="teal"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default FractionPartMatcher;
