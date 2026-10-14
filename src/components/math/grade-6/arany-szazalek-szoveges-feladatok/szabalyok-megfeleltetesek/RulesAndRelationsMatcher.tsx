import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface RulesAndRelationsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const RulesAndRelationsMatcher: React.FC<RulesAndRelationsMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Szöveges utasítás és képlet)
    // ==========================================
    {
      id: 'g6-rr-m-1',
      level: 1,
      prompt: '„Minden számhoz a négyszeresét rendeld hozzá!”',
      value: 'y = 4 · x',
      hint: 'A számot 4-gyel szorozzuk meg.'
    },
    {
      id: 'g6-rr-m-2',
      level: 1,
      prompt: '„Minden számhoz a nála 6-tal nagyobb számot rendeld hozzá!”',
      value: 'y = x + 6',
      hint: 'Nagyobb = hozzáadás.'
    },
    {
      id: 'g6-rr-m-3',
      level: 1,
      prompt: '„Minden szám 2-szeresénél 1-gyel nagyobb szám”',
      value: 'y = 2 · x + 1',
      hint: 'Előbb szorzás 2-vel, majd + 1.'
    },
    {
      id: 'g6-rr-m-4',
      level: 1,
      prompt: '„Minden szám 3-szorosánál 2-vel kisebb szám”',
      value: 'y = 3 · x - 2',
      hint: 'Előbb szorzás 3-mal, majd - 2.'
    },
    {
      id: 'g6-rr-m-5',
      level: 1,
      prompt: 'A bemeneti adat jelölése a hozzárendelésben',
      value: 'x (független változó)',
      hint: 'Az alaphalmaz eleme, amit szabadon megválaszthatunk.'
    },
    {
      id: 'g6-rr-m-6',
      level: 1,
      prompt: 'A kimeneti eredmény jelölése a hozzárendelésben',
      value: 'y (függő változó)',
      hint: 'A képhalmaz eleme, a szabály kiszámított eredménye.'
    },
    {
      id: 'g6-rr-m-7',
      level: 1,
      prompt: 'Egyértelmű hozzárendelés definíciója',
      value: 'Minden bemenethez pontosan egyetlen kimenet tartozik',
      hint: 'Nem adhat kétféle eredményt ugyanaz a szám.'
    },
    {
      id: 'g6-rr-m-8',
      level: 1,
      prompt: '„Minden szám felénél 5-tel nagyobb szám”',
      value: 'y = x / 2 + 5',
      hint: 'Osztás 2-vel, majd + 5.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Számítások és szabálykeresés)
    // ==========================================
    {
      id: 'g6-rr-m-9',
      level: 2,
      prompt: 'y = 3 · x + 4 szabálynál x = 5 kimenete',
      value: 'y = 19',
      hint: 'Számold ki: 3 · 5 + 4.'
    },
    {
      id: 'g6-rr-m-10',
      level: 2,
      prompt: 'y = 5 · x - 7 szabálynál x = 4 kimenete',
      value: 'y = 13',
      hint: 'Számold ki: 5 · 4 - 7.'
    },
    {
      id: 'g6-rr-m-11',
      level: 2,
      prompt: 'y = 2 · x + 5 = 21 esetén a bemenő x értéke',
      value: 'x = 8',
      hint: '21 - 5 = 16, majd 16 : 2.'
    },
    {
      id: 'g6-rr-m-12',
      level: 2,
      prompt: 'y = 4 · x - 6 = 26 esetén a bemenő x értéke',
      value: 'x = 8',
      hint: '26 + 6 = 32, majd 32 : 4.'
    },
    {
      id: 'g6-rr-m-13',
      level: 2,
      prompt: '(1; 7), (2; 10), (3; 13) párokhoz tartozó szabály',
      value: 'y = 3 · x + 4',
      hint: '3-asával nő, 3·1 + 4 = 7.'
    },
    {
      id: 'g6-rr-m-14',
      level: 2,
      prompt: '(1; 3), (2; 6), (3; 9) párokhoz tartozó szabály',
      value: 'y = 3 · x (egyenes arányosság)',
      hint: 'Minden szám a 3-szorosára változik.'
    },
    {
      id: 'g6-rr-m-15',
      level: 2,
      prompt: 'y = x / 4 + 2 szabálynál x = 12 kimenete',
      value: 'y = 5',
      hint: '12 / 4 = 3, majd 3 + 2.'
    },
    {
      id: 'g6-rr-m-16',
      level: 2,
      prompt: 'y = x · x (négyzetre emelés) szabálynál x = 7',
      value: 'y = 49',
      hint: '7 · 7 = ?'
    },

    // ==========================================
    // 3. SZINT: MESTER (Kombinált szabályok és nyomozás)
    // ==========================================
    {
      id: 'g6-rr-m-17',
      level: 3,
      prompt: 'y = 2 · (x + 5) - 3 képlet egyszerűsített alakja',
      value: 'y = 2x + 7',
      hint: 'Bontsd fel a zárójelet: 2x + 10 - 3.'
    },
    {
      id: 'g6-rr-m-18',
      level: 3,
      prompt: 'y = 3 · (x - 2) + 4 képlet egyszerűsített alakja',
      value: 'y = 3x - 2',
      hint: 'Bontsd fel a zárójelet: 3x - 6 + 4.'
    },
    {
      id: 'g6-rr-m-19',
      level: 3,
      prompt: 'Melyik x-re egyenlő a 3x + 1 és az 5x - 9 kimenete?',
      value: 'x = 5 (mindkettőnél y = 16)',
      hint: '3 · 5 + 1 = 16 és 5 · 5 - 9 = 16.'
    },
    {
      id: 'g6-rr-m-20',
      level: 3,
      prompt: '5, 8, 11, 14, 17 számsorozat n-edik tagjának szabálya',
      value: 'y = 3 · n + 2',
      hint: '3-asával nő, n = 1-nél 3·1 + 2 = 5.'
    },
    {
      id: 'g6-rr-m-21',
      level: 3,
      prompt: '2, 6, 10, 14, 18 számsorozat n-edik tagjának szabálya',
      value: 'y = 4 · n - 2',
      hint: '4-esével nő, n = 1-nél 4·1 - 2 = 2.'
    },
    {
      id: 'g6-rr-m-22',
      level: 3,
      prompt: 'Szabálygép: 4 · (x - 1) + 2 = 30 esetén a kiinduló x',
      value: 'x = 8',
      hint: '30 - 2 = 28; 28 : 4 = 7; 7 + 1 = 8.'
    },
    {
      id: 'g6-rr-m-23',
      level: 3,
      prompt: 'A páros számok előállításának általános szabálya',
      value: 'y = 2 · x (ahol x egész szám)',
      hint: 'Bármely számot 2-vel szorozva párosat kapunk.'
    },
    {
      id: 'g6-rr-m-24',
      level: 3,
      prompt: 'A páratlan számok előállításának általános szabálya',
      value: 'y = 2 · x + 1 (vagy 2x - 1)',
      hint: 'Egy páros számnál 1-gyel nagyobb szám mindig páratlan.'
    }
  ];

  return (
    <MatcherTemplate
      title="Szabályok, megfeleltetések párosító"
      subtitle="Párosítsd a szöveges utasításokat a képletekkel, értékpárokkal és megoldásokkal 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="emerald"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RulesAndRelationsMatcher;
