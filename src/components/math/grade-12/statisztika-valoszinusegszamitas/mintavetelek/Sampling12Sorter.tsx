import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Sampling12SorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const SAMPLING_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen a mintavétel?',
    description: 'Döntsd el, milyen módon választunk!',
    categories: [
      { id: 'nelk', name: 'visszatevés nélkül egy halmazból', color: 'blue' },
      { id: 'vissza', name: 'visszatevéssel (ismételt kísérlet)', color: 'amber' },
      { id: 'ketto', name: 'egy-egy elem két külön csoportból', color: 'emerald' }
    ],
    items: [
      { id: 'sms1', text: 'az ötöslottó heti húzása', categoryId: 'nelk' },
      { id: 'sms2', text: 'egy újságíró a 49 végzős közül kettőt választ', categoryId: 'nelk' },
      { id: 'sms3', text: 'a 20 edényből 4-et tesz a tálcára az alkalmazott', categoryId: 'nelk' },
      { id: 'sms4', text: '100 vizsgálat, akár ugyanazt a beteget többször', categoryId: 'vissza' },
      { id: 'sms5', text: 'egy szerencsekereket 10-szer megpörgetünk', categoryId: 'vissza' },
      { id: 'sms6', text: '8 palacsinta, mindegyik egymástól függetlenül szakadhat el', categoryId: 'vissza' },
      { id: 'sms7', text: 'az elnök a 12. a-ból és a 12. b-ből is választ egy diákot', categoryId: 'ketto' },
      { id: 'sms8', text: 'két külön urnából húzunk egy-egy golyót', categoryId: 'ketto' },
      { id: 'sms9', text: 'két külön pakliból húzunk egy-egy kártyát', categoryId: 'ketto' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a valószínűség?',
    description: 'Csoportosítsd a tankönyvi feladatok eredményeit nagyság szerint!',
    categories: [
      { id: 'kicsi', name: '0,1-nél kisebb', color: 'slate' },
      { id: 'kozep', name: '0,25 és 0,3 között', color: 'purple' },
      { id: 'nagy', name: '0,4 és 0,5 között', color: 'rose' }
    ],
    items: [
      { id: 'sms10', text: 'ötöslottó: pontosan 2 találat', categoryId: 'kicsi' },
      { id: 'sms11', text: '100 vizsgálatból egyszer sem mellékhatás (p = 0,03)', categoryId: 'kicsi' },
      { id: 'sms12', text: 'Sándor: pontosan 3 kedvenc szám a kihúzott ötben', categoryId: 'kicsi' },
      { id: 'sms13', text: 'egy-egy diák a két osztályból: mindkettő lány', categoryId: 'kozep' },
      { id: 'sms14', text: 'szerencsekerék (p = 0,25), 10 pörgetés: pontosan 2 nyerés', categoryId: 'kozep' },
      { id: 'sms15', text: '4 játékosból pontosan 2 húzhat kártyát (p = 2/3)', categoryId: 'kozep' },
      { id: 'sms16', text: '100 vizsgálatból háromnál kevesebb mellékhatás', categoryId: 'nagy' },
      { id: 'sms17', text: '4 müzlis edényből pontosan 1 natúr', categoryId: 'nagy' },
      { id: 'sms18', text: '8 palacsintából egy sem szakad el (p = 0,1)', categoryId: 'nagy' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik képlet kell?',
    description: 'Válaszd ki a feladathoz illő modellt!',
    categories: [
      { id: 'bin', name: 'binomiális: (n alatt k) · p^k · (1 − p)^{n − k}', color: 'amber' },
      { id: 'hyp', name: 'hipergeometrikus: (M alatt k)(N − M alatt n − k) / (N alatt n)', color: 'blue' },
      { id: 'pow', name: 'pⁿ: mind az n kísérlet ugyanúgy végződik', color: 'emerald' }
    ],
    items: [
      { id: 'sms19', text: '100 vizsgálatból pontosan 3 mellékhatás', categoryId: 'bin' },
      { id: 'sms20', text: '10 pörgetésből pontosan 2 nyerés', categoryId: 'bin' },
      { id: 'sms21', text: '4 játékosból pontosan 2 húzhat szerencsekártyát', categoryId: 'bin' },
      { id: 'sms22', text: '4 kiválasztott müzlis edényből pontosan 1 natúr', categoryId: 'hyp' },
      { id: 'sms23', text: '5 kiválasztott tanulóból pontosan 2 Carbonara-párti', categoryId: 'hyp' },
      { id: 'sms24', text: '6 kihúzott tételből (vissza nem téve) pontosan 2 XX. századi', categoryId: 'hyp' },
      { id: 'sms25', text: 'mind a 4 játékos húzhat szerencsekártyát', categoryId: 'pow' },
      { id: 'sms26', text: '5 alkalomból egyszer sem csípi meg a pók (p = 0,7)', categoryId: 'pow' },
      { id: 'sms27', text: '12 visszatevéssel kiválasztott adat mind a B vagy C osztályba esik', categoryId: 'pow' }
    ]
  }
};

export const Sampling12Sorter: React.FC<Sampling12SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-mintavetelek-sorter',
  topicTitle = '10. Mintavételek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="mintavetelek"
      title={topicTitle}
      subtitle="Rendszerezd a mintavételi modelleket és a valószínűségeket!"
      levels={SAMPLING_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Sampling12Sorter;
