import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BalanceScaleSvg,
  ExtraneousRootsSvg,
  LostRootsSvg,
  DomainRestrictionSvg
} from './EquivalentEquationsFigures';

interface EquivalentEquationsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Átalakítások minősítése és hatásuk',
    subtitle: 'Döntsd el a megadott műveletekről, hogy ekvivalensek-e, vagy veszélyt hordoznak magukban!',
    categories: [
      {
        id: 'cat-equiv',
        name: 'Ekvivalens lépés ℝ-en',
        description: 'Nem változtatja meg az egyenlet megoldáshalmazát',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-extraneous',
        name: 'Hamis gyököt adhat',
        description: 'A megoldáshalmaz új, hamis gyökökkel bővülhet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-lost',
        name: 'Gyökvesztést okozhat',
        description: 'Létező valódi megoldás tűnhet el az egyenletből',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ees1-1', content: 'Mindkét oldalhoz hozzáadunk 8-at', categoryId: 'cat-equiv' },
      { id: 'ees1-2', content: 'Mindkét oldalt elosztjuk 4-gyel', categoryId: 'cat-equiv' },
      { id: 'ees1-3', content: 'Mindkét oldalt négyzetre emeljük: ( )²', figure: <ExtraneousRootsSvg size={42} />, categoryId: 'cat-extraneous' },
      { id: 'ees1-4', content: 'Mindkét oldalt elosztjuk x-szel', figure: <LostRootsSvg size={42} />, categoryId: 'cat-lost' },
      { id: 'ees1-5', content: 'Mindkét oldalt megszorozzuk (x - 3)-mal', categoryId: 'cat-extraneous' },
      { id: 'ees1-6', content: 'Zárójelek felbontása és összevonás a bal oldalon', categoryId: 'cat-equiv' },
      { id: 'ees1-7', content: 'Mindkét oldal osztása (x + 1)-gyel', categoryId: 'cat-lost' },
      { id: 'ees1-8', content: 'Mindkét oldal szorzása -5-tel', categoryId: 'cat-equiv' }
    ]
  },
  2: {
    title: 'Matematikai állítások és tévhitek',
    subtitle: 'Sorold be az egyenletmegoldással kapcsolatos állításokat igazságtartalmuk szerint!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz állítás',
        description: 'Matematikailag minden körülmények között érvényes',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak feltétellel igaz',
        description: 'Függ az alaphalmaztól vagy a kifejezés értékétől',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-myth',
        name: 'Matematikai tévhit',
        description: 'Hibás elv, amely gyakran vezet téves eredményre',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      }
    ],
    items: [
      { id: 'ees2-1', content: 'Ha két egyenlet megoldáshalmaza megegyezik, akkor ekvivalensek', categoryId: 'cat-always-true' },
      { id: 'ees2-2', content: 'Az x = 3 és x² = 9 egyenletek ekvivalensek', categoryId: 'cat-conditional' },
      { id: 'ees2-3', content: 'Négyzetre emelés után felesleges ellenőrizni, ha pontosan számoltunk', categoryId: 'cat-myth' },
      { id: 'ees2-4', content: 'Nullával szorozva mindkét oldalt nem vesztünk gyököt, így a lépés ekvivalens', categoryId: 'cat-myth' },
      { id: 'ees2-5', content: 'Az értelmezési tartományon kívüli szám nem tartozhat a megoldáshalmazba', figure: <DomainRestrictionSvg size={42} />, categoryId: 'cat-always-true' },
      { id: 'ees2-6', content: 'Mindkét oldalt leoszthatjuk ismeretlennel, ha az ismeretlen értéke nem lehet 0', categoryId: 'cat-conditional' },
      { id: 'ees2-7', content: 'Az egyenlet mindkét oldalából tetszőleges valós szám kivonható', categoryId: 'cat-always-true' },
      { id: 'ees2-8', content: 'Minden valós egyenletnek van legalább egy valós megoldása', categoryId: 'cat-myth' }
    ]
  },
  3: {
    title: 'Egyenletpárok ekvivalenciája alaphalmazonként',
    subtitle: 'Vizsgáld meg, hogy az adott egyenletpárok ekvivalensek-e ℝ-en, csak egy szűkebb halmazon, vagy sehol sem!',
    categories: [
      {
        id: 'cat-equiv-r',
        name: 'Ekvivalensek ℝ-en',
        description: 'Megoldáshalmazuk pontosan megegyezik a valós számokon',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-equiv-subset',
        name: 'Csak ℕ-en vagy ℤ-n ekvivalensek',
        description: 'ℝ-en nem ekvivalensek, de a természetes vagy egész számokon igen',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-not-equiv',
        name: 'Egyetlen alaphalmazon sem ekvivalensek',
        description: 'Megoldásaik egyetlen szokásos számkörben sem esnek egybe',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ees3-1', content: '3x - 6 = 0 és x = 2', categoryId: 'cat-equiv-r' },
      { id: 'ees3-2', content: 'x² = 4 és x = 2', categoryId: 'cat-equiv-subset' },
      { id: 'ees3-3', content: 'x = 3 és x = -3', categoryId: 'cat-not-equiv' },
      { id: 'ees3-4', content: '(x - 1)(x - 4) = 0 és x² - 5x + 4 = 0', categoryId: 'cat-equiv-r' },
      { id: 'ees3-5', content: '2x = 1 és x² = -9 (ℤ-n nézve mindkettő ∅)', categoryId: 'cat-equiv-subset' },
      { id: 'ees3-6', content: 'x² + 5 = 0 és x² + 9 = 0', categoryId: 'cat-equiv-r' },
      { id: 'ees3-7', content: 'x + 1 = x + 2 és 0 · x = 0', categoryId: 'cat-not-equiv' },
      { id: 'ees3-8', content: '|x| = 5 és x = 5', categoryId: 'cat-equiv-subset' }
    ]
  }
};

export const EquivalentEquationsSorter: React.FC<EquivalentEquationsSorterProps> = ({
  topicId = 'g10-eq-ekvivalens-egyenletek-sorter',
  topicTitle = 'Ekvivalens egyenletek',
  ...props
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      themeColor="teal"
      {...props}
    />
  );
};

export default EquivalentEquationsSorter;

