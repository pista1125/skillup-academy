import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleSimilaritySorterProps {
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

const TRIANGLE_SIMILARITY_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Hasonlósági alapesetek besorolása',
    description: 'Csoportosítsd a geometriai adatokat és szituációkat a 4 alapeset szerint!',
    categories: [
      { id: 'case_1', name: 'I. alapeset: sz-sz (Két szög egyenlő)', color: 'emerald' },
      { id: 'case_2_3', name: 'II. és III. eset: Oldalak aránya (o-sz-o, o-o-o)', color: 'blue' },
      { id: 'case_4_or_invalid', name: 'IV. eset (o-o-sz) és Elégtelen feltételek', color: 'amber' }
    ],
    items: [
      { id: 'ts_s1', text: 'Két derékszögű háromszögben egy hegyesszög megegyezik (α₁ = α₂)', categoryId: 'case_1' },
      { id: 'ts_s2', text: 'Két szabályos háromszög (mindkettő minden szöge 60°)', categoryId: 'case_1' },
      { id: 'ts_s3', text: 'Homokóra alakzatban csúcsszögek és váltószögek egyezése', categoryId: 'case_1' },
      { id: 'ts_s4', text: 'Oldalak aránya 2 : 1 mindhárom oldalpárra (3,4,5 és 6,8,10)', categoryId: 'case_2_3' },
      { id: 'ts_s5', text: 'Két oldal aránya 3 és a közbezárt szög 45° mindkét háromszögben', categoryId: 'case_2_3' },
      { id: 'ts_s6', text: 'Két oldal aránya 1,5 és a közbezárt derékszög (γ = 90°)', categoryId: 'case_2_3' },
      { id: 'ts_s7', text: 'Két oldal aránya 2 és a nagyobbikkal szemközti szög 70° (a > b)', categoryId: 'case_4_or_invalid' },
      { id: 'ts_s8', text: 'Két oldal aránya 2 és a kisebbikkel szemközti szög 30° (nem elégséges!)', categoryId: 'case_4_or_invalid' },
      { id: 'ts_s9', text: 'Csak egyetlen szög egyezik meg a két háromszögben (nem elégséges!)', categoryId: 'case_4_or_invalid' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Háromszögpárok geometriai kapcsolata',
    description: 'Csoportosítsd a háromszögpárokat egybevágóság, hasonlóság és nem hasonlóság szerint!',
    categories: [
      { id: 'congruent', name: 'Egybevágó háromszögek (λ = 1)', color: 'emerald' },
      { id: 'similar', name: 'Hasonló, de nem egybevágó (λ ≠ 1)', color: 'blue' },
      { id: 'not_similar', name: 'Nem szükségszerűen hasonló', color: 'rose' }
    ],
    items: [
      { id: 'ts_s10', text: 'Három oldaluk páronként megegyezik: 3 cm, 4 cm, 5 cm mindkettőben', categoryId: 'congruent' },
      { id: 'ts_s11', text: 'Egy háromszög és annak tengelyes tükörképe', categoryId: 'congruent' },
      { id: 'ts_s12', text: 'Két oldaluk 5 cm és 7 cm, közbezárt szögük 50° mindkettőben', categoryId: 'congruent' },
      { id: 'ts_s13', text: 'Két szabályos háromszög, oldaluk 4 cm és 12 cm', categoryId: 'similar' },
      { id: 'ts_s14', text: 'Két derékszögű háromszög 30°-os hegyesszöggel, átfogójuk 10 cm és 25 cm', categoryId: 'similar' },
      { id: 'ts_s15', text: 'Felhőkarcoló 1,4 m-es makettje és a 280 m-es valódi épület', categoryId: 'similar' },
      { id: 'ts_s16', text: 'Két derékszögű háromszög, amelyeknek csak a derékszöge (90°) azonos', categoryId: 'not_similar' },
      { id: 'ts_s17', text: 'Két egyenlő szárú háromszög 40°-os, illetve 70°-os szárszöggel', categoryId: 'not_similar' },
      { id: 'ts_s18', text: 'Két tompaszögű háromszög, ahol a tompaszögek eltérőek (100° és 120°)', categoryId: 'not_similar' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások a háromszögek hasonlóságáról',
    description: 'Döntsd el a geometriai tételek és állítások matematikai érvényességét!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'ts_s19', text: 'Bármely két szabályos (egyenlő oldalú) háromszög hasonló egymáshoz', categoryId: 'always_true' },
      { id: 'ts_s20', text: 'Ha két háromszögben két szög egyezik, a harmadik is egyezik (180° miatt)', categoryId: 'always_true' },
      { id: 'ts_s21', text: 'Két hasonló háromszög területeinek aránya a hasonlóság arányának négyzete (λ²)', categoryId: 'always_true' },
      { id: 'ts_s22', text: 'Hasonló háromszögek megfelelő magasságainak aránya megegyezik a hasonlósági aránnyal (λ)', categoryId: 'always_true' },
      { id: 'ts_s23', text: 'Két derékszögű háromszög hasonló egymáshoz', categoryId: 'cond_true' },
      { id: 'ts_s24', text: 'Két egyenlő szárú háromszög hasonló egymáshoz', categoryId: 'cond_true' },
      { id: 'ts_s25', text: 'Két tompaszögű háromszög hasonló egymáshoz', categoryId: 'cond_true' },
      { id: 'ts_s26', text: 'Két oldal aránya és a kisebbikkel szemközti szög egyenlősége garantálja a hasonlóságot', categoryId: 'false_stmt' },
      { id: 'ts_s27', text: 'Ha két háromszög hasonló, kerületük aránya megegyezik a területeik arányával', categoryId: 'false_stmt' },
      { id: 'ts_s28', text: 'Csak a három szög összegének egyenlősége (180° = 180°) már bizonyítja a hasonlóságot', categoryId: 'false_stmt' }
    ]
  }
];

export const TriangleSimilaritySorter: React.FC<TriangleSimilaritySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '8. Háromszögek hasonlósága – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="haromszogek-hasonlosaga"
      title={topicTitle}
      subtitle="Rendszerezd az alapeseteket, a háromszögpárok viszonyát és az elméleti tételeket!"
      levels={TRIANGLE_SIMILARITY_SORTER_LEVELS}
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

export default TriangleSimilaritySorter;

