import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ThalesSorterProps {
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

export const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Látószögek a Thalész-körhöz képest',
    subtitle: 'Sorold be az állításokat aszerint, hogy a pont a körvonalon, a körön belül vagy a körön kívül fekszik!',
    categories: [
      {
        id: 'cat-on-circle',
        name: 'A Körvonalon Van (Thalész-kör)',
        description: 'Látószög = 90° (derékszög)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-inside',
        name: 'A Körön Belül Van',
        description: 'Látószög > 90° (tompaszög)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-outside',
        name: 'A Körön Kívül Van',
        description: 'Látószög < 90° (hegyesszög)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Körvonalon
      { id: 'ths1-1', label: 'A szakasz végpontjaihoz húzott szögszárak pontosan 90°-ot zárnak be', category: 'cat-on-circle' },
      { id: 'ths1-2', label: 'A keletkező háromszög derékszögű', category: 'cat-on-circle' },
      { id: 'ths1-3', label: 'A pont távolsága az átmérő felezőpontjától pontosan a sugár', category: 'cat-on-circle' },
      { id: 'ths1-4', label: 'Érvényes rá a Pitagorasz-tétel: a² + b² = c²', category: 'cat-on-circle' },

      // Körön belül
      { id: 'ths1-5', label: 'A szakasz tompaszögben látszik a pontból', category: 'cat-inside' },
      { id: 'ths1-6', label: 'A pont távolsága a középponttól kisebb a sugárnál', category: 'cat-inside' },
      { id: 'ths1-7', label: 'A keletkező háromszög tompaszögű', category: 'cat-inside' },

      // Körön kívül
      { id: 'ths1-8', label: 'A szakasz hegyesszögben látszik a pontból', category: 'cat-outside' },
      { id: 'ths1-9', label: 'A pont távolsága a középponttól nagyobb a sugárnál', category: 'cat-outside' },
      { id: 'ths1-10', label: 'A keletkező háromszög hegyesszögű a vizsgált csúcsnál', category: 'cat-outside' }
    ]
  },
  2: {
    title: '2. Szint: A Tétel és Megfordítása',
    subtitle: 'Válogasd szét a kijelentéseket a Thalész-tétel egyenes iránya és megfordítása közé!',
    categories: [
      {
        id: 'cat-theorem',
        name: 'Thalész-tétel (Egyenes irány)',
        description: 'Feltétel: kör átmérője és körvonalbeli pont -> 90°',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-converse',
        name: 'A Tétel Megfordítása',
        description: 'Feltétel: derékszögű háromszög -> átfogó mint átmérő',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Egyenes irány
      { id: 'ths2-1', label: 'Kiindulás: kör átmérőjének két végpontja és a körvonal tetszőleges C pontja', category: 'cat-theorem' },
      { id: 'ths2-2', label: 'Következmény: az ACB szög garantáltan derékszög', category: 'cat-theorem' },
      { id: 'ths2-3', label: 'Bizonyítása az OC sugár behúzásával és két egyenlő szárú háromszöggel történik', category: 'cat-theorem' },
      { id: 'ths2-4', label: 'Megfogalmazás: a félkörívhez tartozó kerületi szög derékszög', category: 'cat-theorem' },

      // Megfordítás
      { id: 'ths2-5', label: 'Kiindulás: tudjuk, hogy a háromszög derékszögű', category: 'cat-converse' },
      { id: 'ths2-6', label: 'Következmény: a derékszögű csúcs illeszkedik az átfogó fölé rajzolt körre', category: 'cat-converse' },
      { id: 'ths2-7', label: 'Következmény: a derékszögű háromszög köré írt körének középpontja az átfogó felezője', category: 'cat-converse' },
      { id: 'ths2-8', label: 'Következmény: a kör sugara pontosan az átfogó fele', category: 'cat-converse' }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Látószöges Esetek',
    subtitle: 'Csoportosítsd a konkrét geometriai példákat a látószög nagysága szerint!',
    categories: [
      {
        id: 'cat-right-cases',
        name: 'Pontosan 90° (Derékszög)',
        description: 'Thalész-kör pontjai',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-obtuse-cases',
        name: 'Tompaszög (> 90°)',
        description: 'Belső pontokból látszó szög',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-acute-cases',
        name: 'Hegyesszög (< 90°)',
        description: 'Külső pontokból látszó szög',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // 90° esetek
      { id: 'ths3-1', label: 'Kör átmérője 10 cm, a C csúcs távolsága a középponttól 5 cm', category: 'cat-right-cases' },
      { id: 'ths3-2', label: 'Derékszögű csúcsból induló súlyvonal hossza s_c = c / 2', category: 'cat-right-cases' },
      { id: 'ths3-3', label: 'Az átmérő két végpontjával összekötve a szög 90°', category: 'cat-right-cases' },
      { id: 'ths3-4', label: 'A derékszögű háromszög átfogója c = 12 cm, a körülírt kör sugara R = 6 cm', category: 'cat-right-cases' },

      // Tompaszög esetek
      { id: 'ths3-5', label: 'A szakasz egy belső pontból 110°-os szögben látszik', category: 'cat-obtuse-cases' },
      { id: 'ths3-6', label: 'Kör átmérője 10 cm, a pont távolsága a középponttól 3 cm', category: 'cat-obtuse-cases' },
      { id: 'ths3-7', label: 'A szakasz végpontjaihoz húzott szárak szöge 135°', category: 'cat-obtuse-cases' },

      // Hegyesszög esetek
      { id: 'ths3-8', label: 'A szakasz egy külső pontból 55°-os szögben látszik', category: 'cat-acute-cases' },
      { id: 'ths3-9', label: 'Kör átmérője 10 cm, a pont távolsága a középponttól 8 cm', category: 'cat-acute-cases' },
      { id: 'ths3-10', label: 'A szakasz végpontjaihoz húzott szárak szöge 40°', category: 'cat-acute-cases' }
    ]
  }
};

export const ThalesSorter: React.FC<ThalesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Thalész tétele'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
      storageKey="grade9-thales-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
