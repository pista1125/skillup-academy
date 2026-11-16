import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbSummarySorterProps {
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

const STAT_PROB_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Középérték vagy szóródás?",
    description: "Helyzeti / középérték, szóródási mutató vagy valószínűségszámítási fogalom?",
    categories: [
      { id: 'kozep', name: "középérték, helyzeti mutató", color: 'blue' },
      { id: 'szor', name: "szóródási mutató", color: 'amber' },
      { id: 'val', name: "valószínűségszámítási fogalom", color: 'purple' }
    ],
    items: [
      { id: 'sps101', text: "átlag", categoryId: 'kozep' },
      { id: 'sps102', text: "medián", categoryId: 'kozep' },
      { id: 'sps103', text: "módusz", categoryId: 'kozep' },
      { id: 'sps104', text: "alsó kvartilis", categoryId: 'kozep' },
      { id: 'sps105', text: "felső kvartilis", categoryId: 'kozep' },
      { id: 'sps106', text: "súlyozott átlag", categoryId: 'kozep' },
      { id: 'sps107', text: "a 10. és 11. adat átlaga (20 adatnál)", categoryId: 'kozep' },
      { id: 'sps108', text: "minimum", categoryId: 'kozep' },
      { id: 'sps109', text: "maximum", categoryId: 'kozep' },
      { id: 'sps110', text: "terjedelem", categoryId: 'szor' },
      { id: 'sps111', text: "félterjedelem", categoryId: 'szor' },
      { id: 'sps112', text: "szórás", categoryId: 'szor' },
      { id: 'sps113', text: "szórásnégyzet", categoryId: 'szor' },
      { id: 'sps114', text: "interkvartilis terjedelem", categoryId: 'szor' },
      { id: 'sps115', text: "a doboz hossza a dobozdiagramon", categoryId: 'szor' },
      { id: 'sps116', text: "legnagyobb − legkisebb adat", categoryId: 'szor' },
      { id: 'sps117', text: "Q₃ − Q₁", categoryId: 'szor' },
      { id: 'sps118', text: "√(Σ(xᵢ − x̄)²/n)", categoryId: 'szor' },
      { id: 'sps119', text: "várható érték", categoryId: 'val' },
      { id: 'sps120', text: "eseménytér", categoryId: 'val' },
      { id: 'sps121', text: "elemi esemény", categoryId: 'val' },
      { id: 'sps122', text: "komplementer esemény", categoryId: 'val' },
      { id: 'sps123', text: "független események", categoryId: 'val' },
      { id: 'sps124', text: "egymást kizáró események", categoryId: 'val' },
      { id: 'sps125', text: "binomiális eloszlás", categoryId: 'val' },
      { id: 'sps126', text: "geometriai valószínűség", categoryId: 'val' },
      { id: 'sps127', text: "biztos esemény", categoryId: 'val' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Melyik modell?",
    description: "Klasszikus (egyszerű leszámlálás), visszatevéses (binomiális) vagy visszatevés nélküli mintavétel?",
    categories: [
      { id: 'klass', name: "klasszikus modell, egy kísérlet", color: 'emerald' },
      { id: 'binom', name: "visszatevéses (binomiális)", color: 'blue' },
      { id: 'hyper', name: "visszatevés nélküli", color: 'rose' }
    ],
    items: [
      { id: 'sps201', text: "két kockával az összeg 10", categoryId: 'klass' },
      { id: 'sps202', text: "kétjegyű szám osztható 8-cal", categoryId: 'klass' },
      { id: 'sps203', text: "IFI három érmedobásból", categoryId: 'klass' },
      { id: 'sps204', text: "Klári Eszter előtt érkezik", categoryId: 'klass' },
      { id: 'sps205', text: "két kockával az összeg prím", categoryId: 'klass' },
      { id: 'sps206', text: "a két lány nem ül egymás mellett", categoryId: 'klass' },
      { id: 'sps207', text: "egy golyót húzunk 12 piros, 3 kék, 25 zöld közül", categoryId: 'klass' },
      { id: 'sps208', text: "kétjegyű szám kockadobásokból osztható 3-mal", categoryId: 'klass' },
      { id: 'sps209', text: "kockarulett: dobunk-e 6-ost két kockával", categoryId: 'klass' },
      { id: 'sps210', text: "20 tételből 5 húzás, minden húzás után visszatesszük", categoryId: 'binom' },
      { id: 'sps211', text: "200 termék, mindegyik 0,015 eséllyel selejtes", categoryId: 'binom' },
      { id: 'sps212', text: "szerencsekerék 6 pörgetése", categoryId: 'binom' },
      { id: 'sps213', text: "8 lépés a sérülést okozó mezőre", categoryId: 'binom' },
      { id: 'sps214', text: "100 áramkör ellenőrzése 0,005 hibaeséllyel", categoryId: 'binom' },
      { id: 'sps215', text: "12 érmefeldobás, pontosan 6 fej", categoryId: 'binom' },
      { id: 'sps216', text: "tízszer dobunk kockával: pontosan 2 hatos", categoryId: 'binom' },
      { id: 'sps217', text: "egy villanykörte-típus 5 db-ja 0,9 eséllyel működik", categoryId: 'binom' },
      { id: 'sps218', text: "büntetőrúgások: 4-ből 3 gól, ha minden rúgás 0,8 eséllyel gól", categoryId: 'binom' },
      { id: 'sps219', text: "20 tételből 5-öt húzunk egyszerre", categoryId: 'hyper' },
      { id: 'sps220', text: "ötöslottó: pontosan 2 találat", categoryId: 'hyper' },
      { id: 'sps221', text: "3 piros és 5 sárga közül egyszerre 2 golyó", categoryId: 'hyper' },
      { id: 'sps222', text: "32 lapos kártyából 4 lap, pontosan 2 ász", categoryId: 'hyper' },
      { id: 'sps223', text: "osztályból 3 tanuló kisorsolása, pontosan 1 lány", categoryId: 'hyper' },
      { id: 'sps224', text: "raktár 50 termékéből 5 kiválasztása, 2 hibás", categoryId: 'hyper' },
      { id: 'sps225', text: "10 tagú csapatból 4 fős küldöttség", categoryId: 'hyper' },
      { id: 'sps226', text: "kalapból 3 cédula húzása egyszerre", categoryId: 'hyper' },
      { id: 'sps227', text: "tombola: 100 sorsjegyből 10 nyerő, veszünk 3-at", categoryId: 'hyper' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Mekkora a valószínűség?",
    description: "Kisebb, mint 1/4; 1/4 és 1/2 között; vagy legalább 1/2?",
    categories: [
      { id: 'kicsi', name: "kisebb, mint 1/4", color: 'rose' },
      { id: 'kozep', name: "1/4 és 1/2 között", color: 'amber' },
      { id: 'nagy', name: "legalább 1/2", color: 'emerald' }
    ],
    items: [
      { id: 'sps301', text: "két kockával az összeg 10 (1/12)", categoryId: 'kicsi' },
      { id: 'sps302', text: "IFI (1/8)", categoryId: 'kicsi' },
      { id: 'sps303', text: "mindkét golyó piros (3/28)", categoryId: 'kicsi' },
      { id: 'sps304', text: "kétjegyű szám osztható 8-cal (11/90)", categoryId: 'kicsi' },
      { id: 'sps305', text: "ötöslottó 2 találat (≈ 0,022)", categoryId: 'kicsi' },
      { id: 'sps306', text: "12 érme, csupa fej (1/4096)", categoryId: 'kicsi' },
      { id: 'sps307', text: "pontosan 6 fej 12 dobásból (≈ 0,226)", categoryId: 'kicsi' },
      { id: 'sps308', text: "P(0 selejtes) 200-ból (≈ 0,049)", categoryId: 'kicsi' },
      { id: 'sps309', text: "két kockával dupla hatos (1/36)", categoryId: 'kicsi' },
      { id: 'sps310', text: "összeg prím (5/12)", categoryId: 'kozep' },
      { id: 'sps311', text: "pontosan 3 magyar visszatevéssel (0,3087)", categoryId: 'kozep' },
      { id: 'sps312', text: "pontosan 3 magyar visszatevés nélkül (≈ 0,352)", categoryId: 'kozep' },
      { id: 'sps313', text: "legfeljebb 2 selejtes (≈ 0,422)", categoryId: 'kozep' },
      { id: 'sps314', text: "pontosan 2 nyerés 6 pörgetésből (≈ 0,329)", categoryId: 'kozep' },
      { id: 'sps315', text: "kockadobásból kapott kétjegyű szám osztható 3-mal (1/3)", categoryId: 'kozep' },
      { id: 'sps316', text: "három kockával van ötös (≈ 0,421)", categoryId: 'kozep' },
      { id: 'sps317', text: "100 áramkörből legalább 1 hibás (≈ 0,394)", categoryId: 'kozep' },
      { id: 'sps318', text: "pontosan 3 sérülés 8-ból (≈ 0,254)", categoryId: 'kozep' },
      { id: 'sps319', text: "Klári Eszter előtt érkezik (1/2)", categoryId: 'nagy' },
      { id: 'sps320', text: "a két lány nem ül egymás mellett (1/2)", categoryId: 'nagy' },
      { id: 'sps321', text: "egyik golyó sárga, a másik piros (15/28)", categoryId: 'nagy' },
      { id: 'sps322', text: "100 áramkörből egy sem hibás (≈ 0,606)", categoryId: 'nagy' },
      { id: 'sps323', text: "P(Ā), ha P(A) = 0,35 (0,65)", categoryId: 'nagy' },
      { id: 'sps324', text: "legalább egy fej 3 dobásból (7/8)", categoryId: 'nagy' },
      { id: 'sps325', text: "nem dobunk dupla hatost (35/36)", categoryId: 'nagy' },
      { id: 'sps326', text: "két kockával az összeg legalább 3 (35/36)", categoryId: 'nagy' },
      { id: 'sps327', text: "legalább 1 selejtes 200-ból (≈ 0,951)", categoryId: 'nagy' }
    ]
  }
};

export const StatProbSummarySorter: React.FC<StatProbSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-statisztika-valoszinuseg-sorter',
  topicTitle = "10. Statisztika, valószínűségszámítás – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="statisztika-valoszinusegszamitas"
      title={topicTitle}
      subtitle="Csoportosítsd a statisztikai mutatókat, a mintavételi helyzeteket és a valószínűségeket!"
      levels={STAT_PROB_SUMMARY_SORTER_LEVELS}
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

export default StatProbSummarySorter;
