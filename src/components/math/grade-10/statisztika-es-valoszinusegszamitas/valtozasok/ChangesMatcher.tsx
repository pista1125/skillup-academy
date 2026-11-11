import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface ChangesMatcherProps {
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
}

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és viszonyszámok',
    description: 'Párosítsd össze a változások definícióit, a szorzótényezőket és a százalék vs. százalékpont alapjait!',
    badge: '1. SZINT • ALAPFOGALMAK',
    pairs: [
      {
        id: 'cm1-1',
        prompt: 'Abszolút változás képlete',
        value: 'Δx = x₁ - x₀'
      },
      {
        id: 'cm1-2',
        prompt: 'Relatív változás aránya',
        value: '(x₁ - x₀) / x₀'
      },
      {
        id: 'cm1-3',
        prompt: '4%-ról 5%-ra növő ráta (abszolút)',
        value: '+1 százalékpont'
      },
      {
        id: 'cm1-4',
        prompt: '4%-ról 5%-ra növő ráta (relatív)',
        value: '+25% relatív emelkedés'
      },
      {
        id: 'cm1-5',
        prompt: '+20%-os növekedés szorzója',
        value: 'q = 1,20'
      },
      {
        id: 'cm1-6',
        prompt: '-15%-os csökkenés szorzója',
        value: 'q = 0,85'
      },
      {
        id: 'cm1-7',
        prompt: 'Bázisviszonyszám meghatározása',
        value: 'Fix alapadathoz (x₀-hoz) viszonyít: B_i = x_i / x₀'
      },
      {
        id: 'cm1-8',
        prompt: 'Láncviszonyszám meghatározása',
        value: 'Előző adathoz viszonyít: L_i = x_i / x_{i-1}'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, kerékpártúra és értékvesztés',
    description: 'Párosítsd a tankönyvi kerékpártúra, autó amortizáció és népességváltozás konkrét eredményeit!',
    badge: '2. SZINT • ALKALMAZÁSOK',
    pairs: [
      {
        id: 'cm2-1',
        prompt: '62 km táv +15% majd -15% után',
        value: '60,605 km'
      },
      {
        id: 'cm2-2',
        prompt: '4,2M Ft-os autó 1 év (-20%) után',
        value: '3,36 millió Ft'
      },
      {
        id: 'cm2-3',
        prompt: '3,36M Ft-os autó 2. év (-15%) után',
        value: '2,856 millió Ft'
      },
      {
        id: 'cm2-4',
        prompt: 'Autó 2 év alatti összetett szorzója',
        value: 'q = 0,68'
      },
      {
        id: 'cm2-5',
        prompt: 'Autó 2 év alatti teljes értékvesztése',
        value: '32%'
      },
      {
        id: 'cm2-6',
        prompt: 'Láncviszonyszámok szorzata: L₁ · L₂ · L₃',
        value: 'Bázisviszonyszámot ad: B₃ = x₃ / x₀'
      },
      {
        id: 'cm2-7',
        prompt: '5 milliós népesség +21% majd +44% után',
        value: '8,712 millió fő'
      },
      {
        id: 'cm2-8',
        prompt: 'Abszolút változás: +14 km majd -14 km',
        value: 'Visszatér az eredeti 62 km-re'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Gazdasági dinamika és átlagos növekedési ütem',
    description: 'Párosítsd a dinamikus viszonyszámok összefüggéseit, az átlagos ütem mértani közepét és kamatváltozásokat!',
    badge: '3. SZINT • GAZDASÁGI DINAMIKA',
    pairs: [
      {
        id: 'cm3-1',
        prompt: 'Átlagos láncviszonyszám (ütem) n évre',
        value: 'L_átlag = ⁿ√(L₁ ··· L_n) = ⁿ√(B_n)'
      },
      {
        id: 'cm3-2',
        prompt: '10%-ról 15%-ra növő kamatláb',
        value: '+5 százalékpont (abszolút) és +50% (relatív)'
      },
      {
        id: 'cm3-3',
        prompt: 'Kétszeri egymást követő +10%-os drágulás',
        value: '+21% összesen'
      },
      {
        id: 'cm3-4',
        prompt: '+10% emelés, majd -10% csökkentés',
        value: '-1% összesen'
      },
      {
        id: 'cm3-5',
        prompt: 'Tőke 10 millióról 15 millióra nő',
        value: 'Abszolút: +5 millió Ft, relatív: +50%'
      },
      {
        id: 'cm3-6',
        prompt: 'Zenei oktáv frekvencia-aránya',
        value: 'Pontosan kétszeres frekvencia: q = 2'
      },
      {
        id: 'cm3-7',
        prompt: 'Két szomszédos félhang frekvencia-aránya',
        value: 'q = ¹²√2 ≈ 1,05946'
      },
      {
        id: 'cm3-8',
        prompt: 'Láncviszonyszám kiszámítása bázisokból',
        value: 'L_i = B_i / B_{i-1}'
      }
    ]
  }
};

export const ChangesMatcher: React.FC<ChangesMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicTitle="Változások párosító"
      topicSubtitle="Gyakorold az abszolút és relatív változást, a százalékpontot, a bázis- és láncviszonyszámokat!"
      levels={matcherLevels}
      themeColor="cyan"
      topicId="g10-stat-valtozasok-matcher"
      {...props}
    />
  );
};

export default ChangesMatcher;

