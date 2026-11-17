import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SmallChain, SmallWallet, MiniBar, MiniRoute, MiniRows } from './MixedOps1000G3CardFigures';

interface Props {
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

export const MIXED_OPS_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hogyan találod meg a □-et?',
    description: 'Melyik művelettel számolod ki a hiányzó számot?',
    categories: [
      { id: 'add', name: 'Összeadással', color: 'emerald' },
      { id: 'sub', name: 'Kivonással', color: 'sky' },
      { id: 'mul', name: 'Szorzással', color: 'purple' }
    ],
    items: [
      { id: 'mo1000s1', text: '□ − 462 = 237', categoryId: 'add', figure: <MiniBar vb="s" whole="□" a="462" b="237" /> },
      { id: 'mo1000s2', text: '□ − 150 = 600', categoryId: 'add', figure: <MiniBar vb="s" whole="□" a="150" b="600" wa={0.4} /> },
      { id: 'mo1000s3', text: '□ − 305 = 95', categoryId: 'add' },
      { id: 'mo1000s4', text: '□ + 386 = 912', categoryId: 'sub', figure: <MiniBar vb="s" whole="912" a="□" b="386" /> },
      { id: 'mo1000s5', text: '803 − □ = 357', categoryId: 'sub', figure: <MiniBar vb="s" whole="803" a="□" b="357" /> },
      { id: 'mo1000s6', text: '450 + □ = 800', categoryId: 'sub' },
      { id: 'mo1000s7', text: '□ : 4 = 90', categoryId: 'mul' },
      { id: 'mo1000s8', text: '□ : 6 = 70', categoryId: 'mul' },
      { id: 'mo1000s9', text: '□ : 8 = 50', categoryId: 'mul' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számolj írásban, és tedd a helyére!',
    categories: [
      { id: 'lo', name: 'Kevesebb, mint 500', color: 'sky' },
      { id: 'mid', name: '500 és 800 között', color: 'amber' },
      { id: 'hi', name: 'Több, mint 800', color: 'rose' }
    ],
    items: [
      { id: 'mo1000s10', text: '1000 − (385 + 240)', categoryId: 'lo', figure: <SmallWallet money="1000" tags={['385', '240']} /> },
      { id: 'mo1000s11', text: '924 − 586', categoryId: 'lo' },
      { id: 'mo1000s12', text: '209 + 128 + 147', categoryId: 'lo', figure: <SmallChain start="209" ops={['+ 128', '+ 147']} /> },
      { id: 'mo1000s13', text: '1000 − (180 + 245)', categoryId: 'mid', figure: <SmallWallet money="1000" tags={['180', '245']} /> },
      { id: 'mo1000s14', text: '386 + 297', categoryId: 'mid' },
      { id: 'mo1000s15', text: '458 + 367 − 150', categoryId: 'mid', figure: <SmallChain start="458" ops={['+ 367', '− 150']} /> },
      { id: 'mo1000s16', text: '345 + 473', categoryId: 'hi' },
      { id: 'mo1000s17', text: '1000 − (65 + 85)', categoryId: 'hi', figure: <SmallWallet money="1000" tags={['65', '85']} /> },
      { id: 'mo1000s18', text: '615 + 207 − 9', categoryId: 'hi', figure: <SmallChain start="615" ops={['+ 207', '− 9']} /> }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Hány lépés kell?',
    description: 'Olvasd el! Milyen művelet kell a megoldáshoz?',
    categories: [
      { id: 'add', name: 'Egy összeadás', color: 'emerald' },
      { id: 'sub', name: 'Egy kivonás', color: 'sky' },
      { id: 'two', name: 'Két lépés kell', color: 'purple' }
    ],
    items: [
      { id: 'mo1000s19', text: 'Délelőtt 345, délután 278 gombóc fogyott. Hány összesen?', categoryId: 'add' },
      { id: 'mo1000s20', text: 'Két szakasz: 275 m és 348 m. Milyen hosszú az út?', categoryId: 'add', figure: <MiniRoute vb="s" d1="275" d2="348" /> },
      { id: 'mo1000s21', text: 'Peti 236 matricát gyűjtött, Zoli 185-tel többet. Hány matricája van Zolinak?', categoryId: 'add' },
      { id: 'mo1000s22', text: '520 gyöngyből 135 elfogyott. Mennyi maradt?', categoryId: 'sub' },
      { id: 'mo1000s23', text: 'Mennyivel magasabb a 882 m-es hegy a 709 m-esnél?', categoryId: 'sub' },
      { id: 'mo1000s24', text: 'Az 1. dobozban 520 gyöngy van. Ez 135-tel több, mint a 2. dobozban. Hány van a 2. dobozban?', categoryId: 'sub', figure: <MiniRows vb="s" a="520" diff="135" more={false} /> },
      { id: 'mo1000s25', text: 'Délelőtt 345 gombóc, délután 128-cal több fogyott. Hány egész nap?', categoryId: 'two', figure: <MiniRows vb="s" a="345" diff="+128" more /> },
      { id: 'mo1000s26', text: '1000 Ft-ból veszel egy 365 Ft-os és egy 290 Ft-os dolgot. Mennyi marad?', categoryId: 'two', figure: <SmallWallet money="1000" tags={['365', '290']} /> },
      { id: 'mo1000s27', text: '1000 m-ből Lili 615 m-t, Ádám 478 m-t futott. Mennyi van hátra kettejüknek?', categoryId: 'two' }
    ]
  }
};

export const MixedOps1000G3Sorter: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-vegyes-sorter',
  topicTitle = '4. Vegyes műveletek és szöveges feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="vegyes-muveletek-szoveges"
      title={topicTitle}
      subtitle="Válogasd szét a feladatokat!"
      levels={MIXED_OPS_1000_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default MixedOps1000G3Sorter;
