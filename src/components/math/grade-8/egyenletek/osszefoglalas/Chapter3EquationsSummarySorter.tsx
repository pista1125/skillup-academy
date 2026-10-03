import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter3EquationsSummarySorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Főbb Szöveges Feladattípusok Kategorizálása',
    subtitle: 'Sorold be a feladatokat Számok & Életkorok, Fizikai Modellek vagy Pénzügy & Geometria kategóriába!',
    categories: [
      {
        id: 'cat-algebraic',
        name: 'Számok & Életkorok',
        description: 'Kétjegyű számok, számjegyek összege, apa és fia életkora',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-physical',
        name: 'Keverés, Mozgás & Munka',
        description: 'Oldatok, járművek találkozása, csapok és munkások',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-applied',
        name: 'Pénzügy & Geometria',
        description: 'Árváltozás, banki kamat, téglalap oldalai és háromszög szögei',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Egy kétjegyű számban a tízesek száma 3-mal nagyobb az egyesekénél',
        category: 'cat-algebraic'
      },
      {
        id: 's2',
        label: 'Anya most négyszer annyi idős, mint a lánya; 5 év múlva háromszor annyi lesz',
        category: 'cat-algebraic'
      },
      {
        id: 's3',
        label: 'Két egész szám összege 45, hányadosuk 4',
        category: 'cat-algebraic'
      },
      {
        id: 's4',
        label: 'Három egymást követő páros szám összege 78',
        category: 'cat-algebraic'
      },
      {
        id: 's5',
        label: '3 kg 20%-os sóoldatot keverünk össze 5 kg 40%-os sóoldattal',
        category: 'cat-physical'
      },
      {
        id: 's6',
        label: 'Két városból egyszerre indul szembe két autó 70 km/h és 90 km/h sebességgel',
        category: 'cat-physical'
      },
      {
        id: 's7',
        label: 'Egy medencét az egyik csap 4 óra, a másik 6 óra alatt tölt meg',
        category: 'cat-physical'
      },
      {
        id: 's8',
        label: 'Egy motoros 15 perc előnnyel indul a 80 km/h sebességű autó előtt',
        category: 'cat-physical'
      },
      {
        id: 's9',
        label: 'Egy kabát árát 20%-kal megemelték, majd az új árat 25%-kal csökkentették',
        category: 'cat-applied'
      },
      {
        id: 's10',
        label: '500 000 Ft lekötése a bankban évi 8%-os egyszerű kamatra 3 évre',
        category: 'cat-applied'
      },
      {
        id: 's11',
        label: 'Egy téglalap egyik oldala 5 cm-rel hosszabb a másiknál, kerülete 42 cm',
        category: 'cat-applied'
      },
      {
        id: 's12',
        label: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5',
        category: 'cat-applied'
      }
    ]
  },
  2: {
    title: '2. Szint: Megoldási Módszerek és Egyenletmodellek',
    subtitle: 'Különböztesd meg a mérlegelvet, a törtes egyenleteket és a kétismeretlenes rendszereket!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Mérlegelv & Zárójelek',
        description: 'Elsőfokú egyenletek, zárójelbontás, egyneműek összevonása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-fractions',
        name: 'Törtes Egyenletek & Kikötések',
        description: 'Közös nevező, törtvonal előtti előjelváltás, nevező ≠ 0',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-systems',
        name: 'Kétismeretlenes Rendszerek',
        description: 'Behelyettesítés, ellentett együtthatók összeadása',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '3(2x - 5) + 4 = 2(x + 7) - 1 egyenlet rendezése',
        category: 'cat-linear'
      },
      {
        id: 's14',
        label: '5x - 8 = 2x + 13 mindkét oldalából 2x levonása',
        category: 'cat-linear'
      },
      {
        id: 's15',
        label: 'Zárójel előtti mínusz felbontása: -(4x - 9) = -4x + 9',
        category: 'cat-linear'
      },
      {
        id: 's16',
        label: 'Mindkét oldal osztása az ismeretlen szorzójával: 4x = 28 ⇒ x = 7',
        category: 'cat-linear'
      },
      {
        id: 's17',
        label: '(2x + 1)/3 - (x - 2)/4 = 5 egyenlet beszorzása 12-vel',
        category: 'cat-fractions'
      },
      {
        id: 's18',
        label: '12 / (x - 4) = 3 egyenletnél a kikötés: x ≠ 4',
        category: 'cat-fractions'
      },
      {
        id: 's19',
        label: 'Közös munkavégzés törtes modellje: 1/t₁ + 1/t₂ = 1/t',
        category: 'cat-fractions'
      },
      {
        id: 's20',
        label: 'Törtvonal előtti mínusz miatti számláló-előjelváltás',
        category: 'cat-fractions'
      },
      {
        id: 's21',
        label: 'Tyúkok és nyulak lábszámának kétismeretlenes leírása: t + ny = 30 és 2t + 4ny = 84',
        category: 'cat-systems'
      },
      {
        id: 's22',
        label: 'Két egyenlet összeadása az egyik ismeretlen azonnali kiejtésére',
        category: 'cat-systems'
      },
      {
        id: 's23',
        label: 'Egyik egyenletből y kifejezése és behelyettesítése a másikba',
        category: 'cat-systems'
      },
      {
        id: 's24',
        label: 'Diák- és felnőttjegyek eladása: darabszám és bevételi egyenlet',
        category: 'cat-systems'
      }
    ]
  },
  3: {
    title: '3. Szint: Egyenletek Megoldáshalmaza a Valós Számokon',
    subtitle: 'Rendszerezd az egyértelmű megoldást, az azonosságot és az ellentmondást!',
    categories: [
      {
        id: 'cat-unique',
        name: 'Egyetlen Megoldás (x = c)',
        description: 'Pontosan egy valós gyök létezik a mérlegelv után',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-identity',
        name: 'Azonosság (Minden szám)',
        description: '0 · x = 0, végtelen sok megoldás, x ∈ ℝ',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-contradiction',
        name: 'Ellentmondás (Nincs megoldás)',
        description: '0 · x = c (c ≠ 0), lehetetlen állítás, x ∈ ∅',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: '5x - 7 = 3x + 9 ⇒ 2x = 16 ⇒ x = 8',
        category: 'cat-unique'
      },
      {
        id: 's26',
        label: '2(3x - 1) = 4x + 6 ⇒ 6x - 2 = 4x + 6 ⇒ x = 4',
        category: 'cat-unique'
      },
      {
        id: 's27',
        label: '(x + 5)/2 = 8 ⇒ x + 5 = 16 ⇒ x = 11',
        category: 'cat-unique'
      },
      {
        id: 's28',
        label: '15 - 3x = 0 ⇒ 3x = 15 ⇒ x = 5',
        category: 'cat-unique'
      },
      {
        id: 's29',
        label: '3(x + 2) - x = 2x + 6 ⇒ 2x + 6 = 2x + 6 ⇒ 0x = 0',
        category: 'cat-identity'
      },
      {
        id: 's30',
        label: '4x - 8 = 4(x - 2) ⇒ 4x - 8 = 4x - 8 ⇒ x ∈ ℝ',
        category: 'cat-identity'
      },
      {
        id: 's31',
        label: '2(x + 1) + 2(x - 1) = 4x ⇒ 4x = 4x ⇒ minden valós szám megoldás',
        category: 'cat-identity'
      },
      {
        id: 's32',
        label: '5x - (2x + 3) = 3(x - 1) ⇒ 3x - 3 = 3x - 3 ⇒ 0x = 0',
        category: 'cat-identity'
      },
      {
        id: 's33',
        label: '2(x + 4) = 2x + 5 ⇒ 2x + 8 = 2x + 5 ⇒ 8 = 5 (lehetetlen)',
        category: 'cat-contradiction'
      },
      {
        id: 's34',
        label: '3x - 1 = 3x + 4 ⇒ -1 = 4 ⇒ x ∈ ∅ (üres halmaz)',
        category: 'cat-contradiction'
      },
      {
        id: 's35',
        label: '5(x - 1) - 2x = 3x + 10 ⇒ 3x - 5 = 3x + 10 ⇒ -5 = 10',
        category: 'cat-contradiction'
      },
      {
        id: 's36',
        label: '4x + 7 = 2(2x + 5) ⇒ 4x + 7 = 4x + 10 ⇒ 7 = 10 (nincs gyök)',
        category: 'cat-contradiction'
      }
    ]
  }
};

export const Chapter3EquationsSummarySorter: React.FC<Chapter3EquationsSummarySorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-summary-sorter',
  topicTitle = 'III. Fejezet Témazáró Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="III. Fejezet Témazáró Csoportosító"
      subtitle="Kategorizáld a feladattípusokat, egyenletmodelleket és megoldáshalmazokat!"
      badge="TÉMAZÁRÓ CSOPORTOSÍTÓ"
      themeColor="amber"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default Chapter3EquationsSummarySorter;
