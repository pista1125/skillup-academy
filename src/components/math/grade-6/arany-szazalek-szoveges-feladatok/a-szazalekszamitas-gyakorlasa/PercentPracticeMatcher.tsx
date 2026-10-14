import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface PercentPracticeMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const PercentPracticeMatcher: React.FC<PercentPracticeMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Bolti akciók és szorzótényezők)
    // ==========================================
    {
      id: 'g6-pp-m-1',
      level: 1,
      prompt: '10 000 Ft-os cipő 20%-os kedvezménnyel',
      value: '8 000 Ft az akciós ár',
      hint: '10 000 · 0,80.'
    },
    {
      id: 'g6-pp-m-2',
      level: 1,
      prompt: '15%-os áremelés szorzótényezője',
      value: '1,15-szörös szorzó',
      hint: '100% + 15% = 115%.'
    },
    {
      id: 'g6-pp-m-3',
      level: 1,
      prompt: '25%-os árengedmény szorzótényezője',
      value: '0,75-szörös szorzó',
      hint: '100% - 25% = 75%.'
    },
    {
      id: 'g6-pp-m-4',
      level: 1,
      prompt: '50 000 Ft-os okostelefon 10%-os drágulása',
      value: '55 000 Ft az új ár',
      hint: '50 000 · 1,10.'
    },
    {
      id: 'g6-pp-m-5',
      level: 1,
      prompt: '15 000 Ft-os kabát 30%-os kedvezményének összege',
      value: '4 500 Ft engedmény',
      hint: '15 000 · 0,30.'
    },
    {
      id: 'g6-pp-m-6',
      level: 1,
      prompt: '200 000 Ft bankbetét 5%-os éves kamata',
      value: '10 000 Ft kamatnyereség',
      hint: '200 000 · 0,05.'
    },
    {
      id: 'g6-pp-m-7',
      level: 1,
      prompt: 'Egy termék árának 100%-os növekedése',
      value: 'Az ár pontos megduplázódása (2-szeres ár)',
      hint: '100% alap + 100% emelés.'
    },
    {
      id: 'g6-pp-m-8',
      level: 1,
      prompt: '4000 Ft-os könyv 10%-os diákkedvezménnyel',
      value: '3 600 Ft fizetendő összeg',
      hint: '4000 - 400.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Visszakövetkeztetés és gyakorlati feladatok)
    // ==========================================
    {
      id: 'g6-pp-m-9',
      level: 2,
      prompt: '20% kedvezmény után 16 000 Ft a kabát ára',
      value: 'Eredeti ár: 20 000 Ft',
      hint: '16 000 : 0,80.'
    },
    {
      id: 'g6-pp-m-10',
      level: 2,
      prompt: '10% áremelés után 66 000 Ft a kerékpár ára',
      value: 'Eredeti ár: 60 000 Ft',
      hint: '66 000 : 1,10.'
    },
    {
      id: 'g6-pp-m-11',
      level: 2,
      prompt: '400 g vízben feloldott 100 g cukor',
      value: '20%-os cukros oldat',
      hint: '100 / (400 + 100).'
    },
    {
      id: 'g6-pp-m-12',
      level: 2,
      prompt: '25% kedvezmény 40 000 Ft-ból',
      value: '10 000 Ft megtakarítás',
      hint: '40 000 · 0,25.'
    },
    {
      id: 'g6-pp-m-13',
      level: 2,
      prompt: '8000 Ft-ért vett termék 25% haszonnal eladva',
      value: '10 000 Ft-os eladási ár',
      hint: '8000 · 1,25.'
    },
    {
      id: 'g6-pp-m-14',
      level: 2,
      prompt: '500 férőhelyes teremben 450 eladott jegy',
      value: '90%-os telítettség',
      hint: '450 / 500 = 0,90.'
    },
    {
      id: 'g6-pp-m-15',
      level: 2,
      prompt: '80 000 Ft ára két egymást követő 10%-os leárazás után',
      value: '64 800 Ft végső ár',
      hint: '80 000 · 0,90 · 0,90.'
    },
    {
      id: 'g6-pp-m-16',
      level: 2,
      prompt: '500 g 12%-os oldatból 100 g víz elpárologtatása',
      value: '15%-os új sótartalom',
      hint: '60 g só / 400 g oldat.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Egymást követő árváltozások és keverékek)
    // ==========================================
    {
      id: 'g6-pp-m-17',
      level: 3,
      prompt: '20% emelés, majd az új ár 20% csökkentése',
      value: '4%-os veszteség az eredetihez képest',
      hint: '1,20 · 0,80 = 0,96.'
    },
    {
      id: 'g6-pp-m-18',
      level: 3,
      prompt: '20% akció + további 10% törzsvásárlói kedvezmény',
      value: 'Összesen 28% tényleges kedvezmény',
      hint: '1 - (0,80 · 0,90) = 0,28.'
    },
    {
      id: 'g6-pp-m-19',
      level: 3,
      prompt: '25% áremelés után szükséges visszacsökkentés',
      value: '20%-os leárazás kell az eredeti árhoz',
      hint: '25 / 125 = 1/5 = 20%.'
    },
    {
      id: 'g6-pp-m-20',
      level: 3,
      prompt: '300 g 10%-os és 200 g 20%-os sóoldat keveréke',
      value: '14%-os új keverék',
      hint: '(30 + 40) / 500.'
    },
    {
      id: 'g6-pp-m-21',
      level: 3,
      prompt: '„Vegyél 3-at, fizess 2-t!” akció',
      value: '33,3%-os átlagos árengedmény',
      hint: '1 / 3 ingyenes.'
    },
    {
      id: 'g6-pp-m-22',
      level: 3,
      prompt: '10% leárazás majd 10% emelés az új árból',
      value: '1%-os csökkenés az eredetihez képest',
      hint: '0,90 · 1,10 = 0,99.'
    },
    {
      id: 'g6-pp-m-23',
      level: 3,
      prompt: '20% áfával terhelt 6 000 000 Ft-os bruttó ár',
      value: '5 000 000 Ft nettó alapár',
      hint: '6 000 000 : 1,20.'
    },
    {
      id: 'g6-pp-m-24',
      level: 3,
      prompt: 'Első nap +50%, második nap -50% részvényárfolyam',
      value: '25%-os veszteség a kezdethez képest',
      hint: '1,50 · 0,50 = 0,75.'
    }
  ];

  return (
    <MatcherTemplate
      title="Százalékszámítás a gyakorlatban párosító"
      subtitle="Párosítsd az akciókat, áremeléseket, fordított számításokat és keverékeket 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="pink"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentPracticeMatcher;
