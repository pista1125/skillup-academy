import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ChangesSorterProps {
  onNextLevel?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
}

const sorterLevels: Record<number, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Változások típusa és kifejezésmódja',
    description: 'Döntsd el minden statisztikai adatról, hogy abszolút változást, relatív változást vagy százalékpontot fejez-e ki!',
    badge: '1. SZINT • MUTATÓK TÍPUSA',
    categories: [
      {
        id: 'cat-abs',
        title: 'Abszolút változás (mértékegységben)',
        color: 'sky',
        description: 'Értékbeli növekedés vagy csökkenés konkrét mértékegységgel (különbség).'
      },
      {
        id: 'cat-rel',
        title: 'Relatív változás (százalékban)',
        color: 'emerald',
        description: 'A változás kiindulási alaphoz mért aránya, százalékban kifejezve.'
      },
      {
        id: 'cat-point',
        title: 'Százalékpont (sz.p.)',
        color: 'purple',
        description: 'Százalékban kifejezett mutatók (kamatláb, infláció, arány) abszolút különbsége.'
      }
    ],
    items: [
      { id: 'cs1-1', text: 'Kerékpáros táv növekedése: +14 km', categoryId: 'cat-abs' },
      { id: 'cs1-2', text: 'Tőke vagyoni növekedése: +3,5 millió Ft', categoryId: 'cat-abs' },
      { id: 'cs1-3', text: 'Autó vételárának csökkenése: -840 000 Ft', categoryId: 'cat-abs' },
      { id: 'cs1-4', text: 'Napi táv megváltozása: +15%', categoryId: 'cat-rel' },
      { id: 'cs1-5', text: 'Autó értékének csökkenése: -20%', categoryId: 'cat-rel' },
      { id: 'cs1-6', text: 'Város lakosságának évi növekedése: +4,2%', categoryId: 'cat-rel' },
      { id: 'cs1-7', text: 'Banki alapkamat emelkedése 4%-ról 5%-ra', categoryId: 'cat-point' },
      { id: 'cs1-8', text: 'Munkanélküliségi ráta csökkenése 7,5%-ról 6,0%-ra', categoryId: 'cat-point' },
      { id: 'cs1-9', text: 'Párt támogatottságának változása 20%-ról 25%-ra', categoryId: 'cat-point' }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Igaz állítás vagy Tévhit a változásokról?',
    description: 'Válogasd szét a változásokra vonatkozó helytálló matematikai szabályokat és a gyakori buktatókat!',
    badge: '2. SZINT • IGAZ VAGY TÉVHIT',
    categories: [
      {
        id: 'cat-true',
        title: 'Matematikailag Igaz',
        color: 'emerald',
        description: 'Helytálló matematikai és statisztikai tétel vagy összefüggés.'
      },
      {
        id: 'cat-false',
        title: 'Tévhit / Hibás érvelés',
        color: 'rose',
        description: 'Bázis-eltolódási hiba, hibás százalék-összeadás vagy téves definíció.'
      }
    ],
    items: [
      {
        id: 'cs2-1',
        text: 'Ha egy árat 10%-kal emelünk, majd 10%-kal csökkentünk, az ár nem tér vissza az eredetire.',
        categoryId: 'cat-true'
      },
      {
        id: 'cs2-2',
        text: 'Ha egy értékhez hozzáadunk 14-et, majd levonunk 14-et, pontosan a kiindulási értéket kapjuk.',
        categoryId: 'cat-true'
      },
      {
        id: 'cs2-3',
        text: 'A láncviszonyszámok szorzata megadja a megfelelő bázisviszonyszámot (B_n = L₁ · L₂ ··· L_n).',
        categoryId: 'cat-true'
      },
      {
        id: 'cs2-4',
        text: 'A százalékpont a százalékos ráták közötti kivonásos (abszolút) különbséget fejezi ki.',
        categoryId: 'cat-true'
      },
      {
        id: 'cs2-5',
        text: 'Ha az autó ára 1. évben 20%-kal, 2. évben 15%-kal csökken, a teljes értékvesztés 35%.',
        categoryId: 'cat-false'
      },
      {
        id: 'cs2-6',
        text: 'A bázisviszonyszám mindig a közvetlenül megelőző időszak adatához viszonyít.',
        categoryId: 'cat-false'
      },
      {
        id: 'cs2-7',
        text: 'Egy 4%-ról 5%-ra növő kamatláb 1%-os relatív emelkedést jelent.',
        categoryId: 'cat-false'
      },
      {
        id: 'cs2-8',
        text: 'Egymást követő százalékos árváltozások esetén a százalékok egyszerűen összeadhatók.',
        categoryId: 'cat-false'
      },
      {
        id: 'cs2-9',
        text: 'A láncviszonyszámok átlaga mindig a láncviszonyszámok egyszerű számtani közepe.',
        categoryId: 'cat-false'
      },
      {
        id: 'cs2-10',
        text: 'A legelső időszakra (i = 1) a bázisviszonyszám és a láncviszonyszám értéke azonos (x₁ / x₀).',
        categoryId: 'cat-true'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Dinamikus viszonyszámok rendszerezése',
    description: 'Csoportosítsd a statisztikai feladatokat és formulákat bázisviszonyszám, láncviszonyszám vagy átlagos növekedési ütem szerint!',
    badge: '3. SZINT • IDŐSOROK ÉS ÜTEMEK',
    categories: [
      {
        id: 'cat-base',
        title: 'Bázisviszonyszám (rögzített alaphoz)',
        color: 'sky',
        description: 'Mindig egy kijelölt fix bázisidőszak (x₀) adatához viszonyít: B_i = x_i / x₀.'
      },
      {
        id: 'cat-chain',
        title: 'Láncviszonyszám (előző időszakhoz)',
        color: 'teal',
        description: 'Mindig a közvetlenül megelőző időszak adatához viszonyít: L_i = x_i / x_{i-1}.'
      },
      {
        id: 'cat-rate',
        title: 'Átlagos növekedési ütem (mértani közép)',
        color: 'indigo',
        description: 'Több időszak láncviszonyszámainak mértani közepe: L_átlag = ⁿ√(B_n).'
      }
    ],
    items: [
      {
        id: 'cs3-1',
        text: '2024-es lakosság viszonyítása a 2000-es bázisév lakosságához: x₂₄ / x₀',
        categoryId: 'cat-base'
      },
      {
        id: 'cs3-2',
        text: 'A vállalat mai árbevétele az alapítás évéhez (2015) viszonyítva',
        categoryId: 'cat-base'
      },
      {
        id: 'cs3-3',
        text: 'Teljes 100 éves népességváltozás az 1900-as kiindulási évhez: B_n = x_n / x₀',
        categoryId: 'cat-base'
      },
      {
        id: 'cs3-4',
        text: '2023-as termelés viszonyítása a 2022-es közvetlenül megelőző évhez: x₂₃ / x₂₂',
        categoryId: 'cat-chain'
      },
      {
        id: 'cs3-5',
        text: 'Éves értékcsökkenés az előző évi maradványértékhez viszonyítva: q₂ = x₂ / x₁',
        categoryId: 'cat-chain'
      },
      {
        id: 'cs3-6',
        text: 'Havonta mért inflációs drágulási tényező a közvetlenül megelőző hónaphoz képest',
        categoryId: 'cat-chain'
      },
      {
        id: 'cs3-7',
        text: 'Több év láncviszonyszámainak mértani közepe: ⁿ√(L₁ ··· L_n)',
        categoryId: 'cat-rate'
      },
      {
        id: 'cs3-8',
        text: 'Átlagos évenkénti szaporulat szorzója 2 év alatt: √(q₁ · q₂)',
        categoryId: 'cat-rate'
      },
      {
        id: 'cs3-9',
        text: 'Állandó évenkénti értékcsökkenési szorzó meghatározása 2 év adataiból: q = √(x₂ / x₀)',
        categoryId: 'cat-rate'
      }
    ]
  }
};

export const ChangesSorter: React.FC<ChangesSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicTitle="Változások csoportosító"
      topicSubtitle="Válogasd szét a mutatókat, ismerd fel a bázis- és láncviszonyszámokat és leplezd le a tévhiteket!"
      levels={sorterLevels}
      themeColor="cyan"
      topicId="g10-stat-valtozasok-sorter"
      {...props}
    />
  );
};

export default ChangesSorter;

