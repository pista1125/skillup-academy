import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardBlocks, CardTag, CardCoins, CardRods, CardCoinMul } from './Count200ExamG3CardFigures';

interface Count200ExamG3SorterProps {
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

const bl = (h: number, t: number, e: number) => <CardBlocks h={h} t={t} e={e} size="s" />;
const tag = (p: number) => <CardTag price={p} size="s" />;

export const COUNT200_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mi áll a tízesek helyén?',
    description: 'Piros = 100, kék = 10, sárga = 1. Nézd meg a tízeseket!',
    categories: [
      { id: 't4', name: 'A tízesek helyén 4 áll', color: 'sky' },
      { id: 't6', name: 'A tízesek helyén 6 áll', color: 'emerald' },
      { id: 't8', name: 'A tízesek helyén 8 áll', color: 'rose' }
    ],
    items: [
      { id: 'c200es1', label: '', figure: bl(1, 4, 0), categoryId: 't4' },
      { id: 'c200es2', label: '', figure: bl(1, 4, 7), categoryId: 't4' },
      { id: 'c200es3', label: '', figure: bl(0, 4, 5), categoryId: 't4' },
      { id: 'c200es4', label: '', figure: bl(1, 4, 2), categoryId: 't4' },
      { id: 'c200es5', label: '143', categoryId: 't4' },
      { id: 'c200es6', label: '49', categoryId: 't4' },
      { id: 'c200es7', label: 'száznegyvenöt', categoryId: 't4' },
      { id: 'c200es8', label: '1 sz + 4 t + 8 e', categoryId: 't4' },
      { id: 'c200es9', label: '14 tízes', categoryId: 't4' },
      { id: 'c200es10', label: '', figure: bl(1, 6, 3), categoryId: 't6' },
      { id: 'c200es11', label: '', figure: bl(0, 6, 8), categoryId: 't6' },
      { id: 'c200es12', label: '', figure: bl(1, 6, 0), categoryId: 't6' },
      { id: 'c200es13', label: '', figure: bl(1, 6, 9), categoryId: 't6' },
      { id: 'c200es14', label: '161', categoryId: 't6' },
      { id: 'c200es15', label: '67', categoryId: 't6' },
      { id: 'c200es16', label: 'százhatvanhét', categoryId: 't6' },
      { id: 'c200es17', label: '1 sz + 6 t + 2 e', categoryId: 't6' },
      { id: 'c200es18', label: '16 tízes + 4 egyes', categoryId: 't6' },
      { id: 'c200es19', label: '', figure: bl(1, 8, 1), categoryId: 't8' },
      { id: 'c200es20', label: '', figure: bl(0, 8, 4), categoryId: 't8' },
      { id: 'c200es21', label: '', figure: bl(1, 8, 6), categoryId: 't8' },
      { id: 'c200es22', label: '', figure: bl(1, 8, 0), categoryId: 't8' },
      { id: 'c200es23', label: '189', categoryId: 't8' },
      { id: 'c200es24', label: '88', categoryId: 't8' },
      { id: 'c200es25', label: 'száznyolcvanhárom', categoryId: 't8' },
      { id: 'c200es26', label: '1 sz + 8 t + 5 e', categoryId: 't8' },
      { id: 'c200es27', label: '18 tízes + 2 egyes', categoryId: 't8' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mennyit fizetsz kb.?',
    description: 'Kerekítsd tízesre az árat, és tedd a jó dobozba!',
    categories: [
      { id: 'k150', name: '≈ 150 Ft', color: 'amber' },
      { id: 'k160', name: '≈ 160 Ft', color: 'purple' },
      { id: 'k170', name: '≈ 170 Ft', color: 'teal' }
    ],
    items: [
      { id: 'c200es28', label: '', figure: tag(146), categoryId: 'k150' },
      { id: 'c200es29', label: '', figure: tag(151), categoryId: 'k150' },
      { id: 'c200es30', label: '', figure: tag(147), categoryId: 'k150' },
      { id: 'c200es31', label: '', figure: tag(153), categoryId: 'k150' },
      { id: 'c200es32', label: '145 Ft', categoryId: 'k150' },
      { id: 'c200es33', label: '149 Ft', categoryId: 'k150' },
      { id: 'c200es34', label: '150 Ft', categoryId: 'k150' },
      { id: 'c200es35', label: '152 Ft', categoryId: 'k150' },
      { id: 'c200es36', label: '154 Ft', categoryId: 'k150' },
      { id: 'c200es37', label: '', figure: tag(155), categoryId: 'k160' },
      { id: 'c200es38', label: '', figure: tag(159), categoryId: 'k160' },
      { id: 'c200es39', label: '', figure: tag(162), categoryId: 'k160' },
      { id: 'c200es40', label: '', figure: tag(164), categoryId: 'k160' },
      { id: 'c200es41', label: '156 Ft', categoryId: 'k160' },
      { id: 'c200es42', label: '158 Ft', categoryId: 'k160' },
      { id: 'c200es43', label: '160 Ft', categoryId: 'k160' },
      { id: 'c200es44', label: '161 Ft', categoryId: 'k160' },
      { id: 'c200es45', label: '163 Ft', categoryId: 'k160' },
      { id: 'c200es46', label: '', figure: tag(165), categoryId: 'k170' },
      { id: 'c200es47', label: '', figure: tag(168), categoryId: 'k170' },
      { id: 'c200es48', label: '', figure: tag(171), categoryId: 'k170' },
      { id: 'c200es49', label: '', figure: tag(174), categoryId: 'k170' },
      { id: 'c200es50', label: '166 Ft', categoryId: 'k170' },
      { id: 'c200es51', label: '167 Ft', categoryId: 'k170' },
      { id: 'c200es52', label: '170 Ft', categoryId: 'k170' },
      { id: 'c200es53', label: '172 Ft', categoryId: 'k170' },
      { id: 'c200es54', label: '173 Ft', categoryId: 'k170' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mennyi az eredmény?',
    description: 'Számolj, és tedd a jó dobozba!',
    categories: [
      { id: 'r120', name: '120', color: 'sky' },
      { id: 'r150', name: '150', color: 'amber' },
      { id: 'r180', name: '180', color: 'rose' }
    ],
    items: [
      { id: 'c200es55', label: '', figure: <CardRods groups={3} per={4} size="s" />, categoryId: 'r120' },
      { id: 'c200es56', label: '', figure: <CardCoinMul n={6} v={20} />, categoryId: 'r120' },
      { id: 'c200es57', label: '', figure: <CardCoins values={[100, 20]} size="s" />, categoryId: 'r120' },
      { id: 'c200es58', label: '60 + 60', categoryId: 'r120' },
      { id: 'c200es59', label: '200 − 80', categoryId: 'r120' },
      { id: 'c200es60', label: '4 · 30', categoryId: 'r120' },
      { id: 'c200es61', label: '160 − 40', categoryId: 'r120' },
      { id: 'c200es62', label: '90 + 30', categoryId: 'r120' },
      { id: 'c200es63', label: '100 + 40 : 2', categoryId: 'r120' },
      { id: 'c200es64', label: '', figure: <CardCoinMul n={15} v={10} />, categoryId: 'r150' },
      { id: 'c200es65', label: '', figure: <CardCoinMul n={3} v={50} />, categoryId: 'r150' },
      { id: 'c200es66', label: '', figure: <CardCoins values={[100, 50]} size="s" />, categoryId: 'r150' },
      { id: 'c200es67', label: '70 + 80', categoryId: 'r150' },
      { id: 'c200es68', label: '200 − 50', categoryId: 'r150' },
      { id: 'c200es69', label: '5 · 30', categoryId: 'r150' },
      { id: 'c200es70', label: '180 − 30', categoryId: 'r150' },
      { id: 'c200es71', label: '90 + 60', categoryId: 'r150' },
      { id: 'c200es72', label: '200 − 5 · 10', categoryId: 'r150' },
      { id: 'c200es73', label: '', figure: <CardRods groups={2} per={9} size="s" />, categoryId: 'r180' },
      { id: 'c200es74', label: '', figure: <CardCoinMul n={9} v={20} />, categoryId: 'r180' },
      { id: 'c200es75', label: '', figure: <CardCoinMul n={18} v={10} />, categoryId: 'r180' },
      { id: 'c200es76', label: '90 + 90', categoryId: 'r180' },
      { id: 'c200es77', label: '200 − 20', categoryId: 'r180' },
      { id: 'c200es78', label: '6 · 30', categoryId: 'r180' },
      { id: 'c200es79', label: '2 · 90', categoryId: 'r180' },
      { id: 'c200es80', label: '120 + 60', categoryId: 'r180' },
      { id: 'c200es81', label: '(100 − 70) · 6', categoryId: 'r180' }
    ]
  }
};

export const Count200ExamG3Sorter: React.FC<Count200ExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-tudasproba-sorter',
  topicTitle = '6. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számok, kerekítés és műveletek 200-ig – válogasd szét őket!"
      levels={COUNT200_EXAM_G3_SORTER_LEVELS}
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

export default Count200ExamG3Sorter;
