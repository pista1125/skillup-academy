import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MotionWorkMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Szituáció és az induló törtes egyenlet',
    subtitle: 'Párosítsd a szöveges problémát a hozzá tartozó helyes algebrai idő- vagy munkaegyenlettel!',
    pairs: [
      { id: 'mwm1-1', left: '180 km úton a gyorsabb 15 km/h-val sebesebb, 1 órával hamarabb érkezik', right: '180 / v - 180 / (v + 15) = 1' },
      { id: 'mwm1-2', left: 'Folyami csónak: 48 km oda-vissza, v_hajó = 20 km/h, összesen 5 óra', right: '48 / (20 + v_f) + 48 / (20 - v_f) = 5' },
      { id: 'mwm1-3', left: 'Két cső együtt 6 óra alatt tölti meg a medencét, az egyik 5 órával gyorsabb', right: '1 / t + 1 / (t + 5) = 1 / 6' },
      { id: 'mwm1-4', left: '240 km-es út: ha a sebesség 20 km/h-val nő, a menetidő 1 órával csökken', right: '240 / v - 240 / (v + 20) = 1' },
      { id: 'mwm1-5', left: 'Folyásirányban (lefelé) való mozgás menetideje', right: 't_le = s / (v_hajó + v_folyó)' },
      { id: 'mwm1-6', left: 'Sodrással szemben (felfelé) való haladás ideje', right: 't_fel = s / (v_hajó - v_folyó)' },
      { id: 'mwm1-7', left: 'Két munkás együttes óránkénti teljesítménye', right: 'P_összes = 1 / t₁ + 1 / t₂' },
      { id: 'mwm1-8', left: '20 perc időnyereség átváltása órára a képletben', right: 'Δt = 20 / 60 = 1 / 3 óra' }
    ]
  },
  2: {
    title: 'Feladat és a pontos számítási végeredmény',
    subtitle: 'Párosítsd a feladványokat a helyes számértékkel!',
    pairs: [
      { id: 'mwm2-1', left: '180 km, v + 15 km/h esetén 1 óra nyereség', right: 'Eredeti sebesség: v = 45 km/h (vonat)' },
      { id: 'mwm2-2', left: '48 km oda-vissza 5 óra alatt, v_hajó = 20 km/h', right: 'Folyó sebessége: v_f = 4 km/h' },
      { id: 'mwm2-3', left: 'Medence: együtt 6 óra, különbség 5 óra', right: 'Külön-külön: 10 óra és 15 óra' },
      { id: 'mwm2-4', left: '240 km, v + 20 km/h esetén 1 óra nyereség', right: 'Eredeti sebesség: v = 60 km/h (új: 80 km/h)' },
      { id: 'mwm2-5', left: 'Kerítésfestés: együtt 4 óra, az egyik 6 órával tovább dolgozna', right: 'Külön-külön: 6 óra és 12 óra' },
      { id: 'mwm2-6', left: '300 km távolság, 10 km/h lassulás miatt 1 óra késés', right: 'Tervezett sebesség: v = 60 km/h' },
      { id: 'mwm2-7', left: 'Folyami hajó: 30 km lefelé 2 óra, felfelé 3 óra', right: 'Hajó: 12,5 km/h, folyó: 2,5 km/h' },
      { id: 'mwm2-8', left: 'Két csap: 4 óra alatt töltik meg, az egyik egyedül 6 óra', right: 'A másik csap egyedül: 12 óra' }
    ]
  },
  3: {
    title: 'Fizikai összefüggések és gyökszűrési elvek',
    subtitle: 'Párosítsd a mozgásos és munkafeladatok szabályait a magyarázatukkal!',
    pairs: [
      { id: 'mwm3-1', left: 'Miért vetjük el az egyenlet negatív gyökét (pl. v = -60)?', right: 'Mert a sebesség nagysága mint fizikai skalár csak pozitív lehet' },
      { id: 'mwm3-2', left: 'Miért tart tovább az oda-vissza hajózás sodrásban, mint állóvízben?', right: 'Mert a sodrással szembeni lassabb szakaszon sokkal több időt tölt a hajó' },
      { id: 'mwm3-3', left: 'Miért kötelező a perceket órára váltani km/h esetén?', right: 'Mert a sebesség mértékegysége km/h, így az idő dimenziója óra kell legyen' },
      { id: 'mwm3-4', left: 'Hogyan modellezzük az egész munkát a reciprokos módszernél?', right: 'A teljes elvégzendő munkamennyiséget 1 egésznek tekintjük' },
      { id: 'mwm3-5', left: 'Miért kell v_hajó > v_folyó kikötést tennünk?', right: 'Különben felfelé nem tudna haladni, visszasodródna a hajó' },
      { id: 'mwm3-6', left: 'Hogyan alakul a közös nevező: (v + v_f)(v - v_f)?', right: 'A nevezetes négyzetkülönbség: v² - v_f²' },
      { id: 'mwm3-7', left: 'Hogyan kapunk másodfokú egyenletet az 1/t₁ + 1/t₂ = 1/T összefüggésből?', right: 'A közös nevezővel [T · t₁ · t₂] való beszorzás után' },
      { id: 'mwm3-8', left: 'Mit jelent a t₁ - t₂ = 0,5 óra az egyenletben?', right: 'Fél órás, azaz pontosan 30 perces menetidő-különbséget' }
    ]
  }
};

export const MotionWorkMatcher: React.FC<MotionWorkMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Mozgás és Munkavégzés Párosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

