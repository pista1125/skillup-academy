import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CircleRadiusMiniSvg,
  CircleDiameterMiniSvg,
  CircularRingMiniSvg,
  SemicircleMiniSvg
} from './CircleCircumferenceAreaFigures';

interface CircleCircumferenceAreaSorterProps {
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
    title: 'Képletek és dimenziók csoportosítása',
    subtitle: 'Válogasd szét a kifejezéseket aszerint, hogy kerületet, területet vagy arányszámot fejeznek ki!',
    categories: [
      {
        id: 'cat-circumference',
        name: 'Kerület / Hosszúság (1D)',
        description: 'Mértékegység: cm, m (első hatvány)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-area',
        name: 'Terület (2D)',
        description: 'Mértékegység: cm², m² (második hatvány)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-ratio',
        name: 'Arányszám / Dimenziótlan',
        description: 'Mértékegység nélküli konstans vagy arány',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ccs1-1', content: 'K = 2rπ', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-circumference' },
      { id: 'ccs1-2', content: 'T = r²π', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-area' },
      { id: 'ccs1-3', content: 'π = K / d ≈ 3,14', categoryId: 'cat-ratio' },
      { id: 'ccs1-4', content: 'K = dπ', figure: <CircleDiameterMiniSvg size={44} />, categoryId: 'cat-circumference' },
      { id: 'ccs1-5', content: 'T = (d²π) / 4', figure: <CircleDiameterMiniSvg size={44} />, categoryId: 'cat-area' },
      { id: 'ccs1-6', content: 'T_gyűrű = π(R² - r²)', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-area' },
      { id: 'ccs1-7', content: 'Félkör határoló íve (rπ)', figure: <SemicircleMiniSvg size={44} />, categoryId: 'cat-circumference' },
      { id: 'ccs1-8', content: 'Félkör területe (r²π / 2)', figure: <SemicircleMiniSvg size={44} />, categoryId: 'cat-area' },
      { id: 'ccs1-9', content: 'Kerületek aránya: K₁ / K₂', categoryId: 'cat-ratio' },
      { id: 'ccs1-10', content: 'Területek aránya: (r₁ / r₂)²', categoryId: 'cat-ratio' },
      { id: 'ccs1-11', content: 'Biciklikerék által 1 fordulat alatt megtett út', categoryId: 'cat-circumference' },
      { id: 'ccs1-12', content: 'Pizza felszínének nagysága', categoryId: 'cat-area' }
    ]
  },
  2: {
    title: 'Területek nagysága r = 6 cm-hez képest',
    subtitle: 'Hasonlítsd össze az alakzatok területét a 36π cm² területű körrel!',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb, mint 36π cm²',
        description: 'T < 36π cm² (kb. 113 cm²)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 36π cm²',
        description: 'T = 36π cm²',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-greater',
        name: 'Nagyobb, mint 36π cm²',
        description: 'T > 36π cm²',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ccs2-1', content: 'r = 5 cm sugarú kör (25π)', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-less' },
      { id: 'ccs2-2', content: 'd = 12 cm átmérőjű kör (r = 6 cm)', figure: <CircleDiameterMiniSvg size={44} />, categoryId: 'cat-equal' },
      { id: 'ccs2-3', content: 'r = 7 cm sugarú kör (49π)', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-greater' },
      { id: 'ccs2-4', content: 'r = 6 cm sugarú félkör (18π)', figure: <SemicircleMiniSvg size={44} />, categoryId: 'cat-less' },
      { id: 'ccs2-5', content: 'Körgyűrű R = 10, r = 8 (100 - 64 = 36π)', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-equal' },
      { id: 'ccs2-6', content: 'Körgyűrű R = 9, r = 3 (81 - 9 = 72π)', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-greater' },
      { id: 'ccs2-7', content: 'd = 10 cm átmérőjű kör (25π)', figure: <CircleDiameterMiniSvg size={44} />, categoryId: 'cat-less' },
      { id: 'ccs2-8', content: 'r = 8 cm sugarú kör (64π)', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-greater' },
      { id: 'ccs2-9', content: 'Körgyűrű R = 7, r = √13 (49 - 13 = 36π)', figure: <CircularRingMiniSvg size={44} />, categoryId: 'cat-equal' },
      { id: 'ccs2-10', content: 'K = 12π kerületű kör (r = 6 cm)', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-equal' },
      { id: 'ccs2-11', content: 'r = 4 cm sugarú kör (16π)', figure: <CircleRadiusMiniSvg size={44} />, categoryId: 'cat-less' },
      { id: 'ccs2-12', content: 'd = 14 cm átmérőjű kör (49π)', figure: <CircleDiameterMiniSvg size={44} />, categoryId: 'cat-greater' }
    ]
  },
  3: {
    title: 'Számok típusa a geometriában',
    subtitle: 'Válogasd szét a geometriai mennyiségeket számhalmazok szerint!',
    categories: [
      {
        id: 'cat-irrational',
        name: 'Irracionális szám (π vagy gyök)',
        description: 'Nem írható fel két egész hányadosaként',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-rational',
        name: 'Racionális szám (egész vagy véges tört)',
        description: 'Véges tizedestört vagy egész',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-approx',
        name: 'Közelítő érték (nem egzakt)',
        description: 'Gyakorlati számolásokhoz használt kerekítés',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ccs3-1', content: 'A kör kerületének és átmérőjének valódi aránya (π)', categoryId: 'cat-irrational' },
      { id: 'ccs3-2', content: '3,14', categoryId: 'cat-approx' },
      { id: 'ccs3-3', content: 'Egész oldalhosszúságú négyzet kerülete', categoryId: 'cat-rational' },
      { id: 'ccs3-4', content: 'Egységnyi négyzet átlója (√2)', categoryId: 'cat-irrational' },
      { id: 'ccs3-5', content: '22 / 7 (Arkhimédész felső korlátja)', categoryId: 'cat-approx' },
      { id: 'ccs3-6', content: '10 cm sugarú kör átmérője (20 cm)', categoryId: 'cat-rational' },
      { id: 'ccs3-7', content: 'Szabályos háromszög magassága (a · √3 / 2)', categoryId: 'cat-irrational' },
      { id: 'ccs3-8', content: '355 / 113 (Zu Chongzhi törte)', categoryId: 'cat-approx' },
      { id: 'ccs3-9', content: 'Pitagoraszi 3-4-5 háromszög területe (6 cm²)', categoryId: 'cat-rational' },
      { id: 'ccs3-10', content: 'Egységnyi sugarú kör pontos területe (π)', categoryId: 'cat-irrational' },
      { id: 'ccs3-11', content: '3,14159', categoryId: 'cat-approx' },
      { id: 'ccs3-12', content: '6 cm és 8 cm befogójú derékszögű átfogója (10 cm)', categoryId: 'cat-rational' }
    ]
  }
};

export const CircleCircumferenceAreaSorter: React.FC<CircleCircumferenceAreaSorterProps> = (props) => {
  return (
    <SorterTemplate
      title="A kör kerülete és területe Csoportosító"
      subtitle="Válogasd szét a geometriai kifejezéseket és mennyiségeket a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      color="cyan"
      levels={sorterLevels}
      {...props}
    />
  );
};
