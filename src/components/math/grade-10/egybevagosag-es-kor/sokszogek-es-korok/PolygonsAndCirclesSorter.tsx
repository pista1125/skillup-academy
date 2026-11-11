import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CyclicQuadMiniSvg, TangentialQuadMiniSvg, HexagonMiniSvg } from './PolygonsAndCirclesFigures';

interface PolygonsAndCirclesSorterProps {
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

const easyCategories: SorterCategory[] = [
  { id: 'cat-hurnegyszog', name: 'Mindig húrnégyszög' },
  { id: 'cat-erintonegyszog', name: 'Mindig érintőnégyszög' },
  { id: 'cat-mindketto', name: 'Mindkettő egyszerre' }
];

const easyItems: SorterItem[] = [
  { id: 'i1', text: 'Téglalap', figure: <CyclicQuadMiniSvg size={44} />, categoryId: 'cat-hurnegyszog' },
  { id: 'i2', text: 'Húrtrapéz (szimmetrikus)', figure: <CyclicQuadMiniSvg size={44} />, categoryId: 'cat-hurnegyszog' },
  { id: 'i3', text: 'Rombusz', figure: <TangentialQuadMiniSvg size={44} />, categoryId: 'cat-erintonegyszog' },
  { id: 'i4', text: 'Konvex deltoid', figure: <TangentialQuadMiniSvg size={44} />, categoryId: 'cat-erintonegyszog' },
  { id: 'i5', text: 'Négyzet', categoryId: 'cat-mindketto' },
  { id: 'i6', text: 'Szemközti szögek összege 180°', figure: <CyclicQuadMiniSvg size={44} />, categoryId: 'cat-hurnegyszog' },
  { id: 'i7', text: 'Szemközti oldalak összege egyenlő', figure: <TangentialQuadMiniSvg size={44} />, categoryId: 'cat-erintonegyszog' },
  { id: 'i8', text: 'Csúcsain át kör rajzolható', categoryId: 'cat-hurnegyszog' },
  { id: 'i9', text: 'Belsejébe minden oldalt érintő kör írható', categoryId: 'cat-erintonegyszog' },
  { id: 'i10', text: 'Szabályos 4-szög (négyzet)', categoryId: 'cat-mindketto' },
  { id: 'i11', text: 'Oldalai a kör húrjai', categoryId: 'cat-hurnegyszog' },
  { id: 'i12', text: 'Oldalai a kör érintői', categoryId: 'cat-erintonegyszog' }
];

const mediumCategories: SorterCategory[] = [
  { id: 'cat-haromszog', name: 'Szabályos háromszög' },
  { id: 'cat-negyzet', name: 'Négyzet' },
  { id: 'cat-hatszog', name: 'Szabályos hatszög' }
];

const mediumItems: SorterItem[] = [
  { id: 'm1', text: 'R = a (köré írt kör sugara = oldal)', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'm2', text: 'r = a / 2 (beírt kör sugara)', categoryId: 'cat-negyzet' },
  { id: 'm3', text: 'r = (a√3) / 6', categoryId: 'cat-haromszog' },
  { id: 'm4', text: 'R = (a√3) / 3', categoryId: 'cat-haromszog' },
  { id: 'm5', text: 'R = (a√2) / 2', categoryId: 'cat-negyzet' },
  { id: 'm6', text: 'r = (a√3) / 2', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'm7', text: 'Középponti szög 120°', categoryId: 'cat-haromszog' },
  { id: 'm8', text: 'Középponti szög 90°', categoryId: 'cat-negyzet' },
  { id: 'm9', text: 'Középponti szög 60°', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'm10', text: 'Belső szög 60°', categoryId: 'cat-haromszog' },
  { id: 'm11', text: 'Belső szög 90°', categoryId: 'cat-negyzet' },
  { id: 'm12', text: 'Belső szög 120°', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' }
];

const hardCategories: SorterCategory[] = [
  { id: 'cat-szogek', name: 'Szögekre vonatkozó tétel' },
  { id: 'cat-oldalak', name: 'Oldalakra / sugárra vonatkozó tétel' },
  { id: 'cat-terulet', name: 'Területképlet' }
];

const hardItems: SorterItem[] = [
  { id: 'h1', text: 'α + γ = 180°', categoryId: 'cat-szogek' },
  { id: 'h2', text: 'a + c = b + d', categoryId: 'cat-oldalak' },
  { id: 'h3', text: 'Thálész-tétel: átmérőből 90°', categoryId: 'cat-szogek' },
  { id: 'h4', text: 'T = s · r', categoryId: 'cat-terulet' },
  { id: 'h5', text: 'Érintő merőleges az érintési sugárra', categoryId: 'cat-szogek' },
  { id: 'h6', text: 'Derékszögű háromszög r = (a+b-c)/2', categoryId: 'cat-oldalak' },
  { id: 'h7', text: 'Derékszögű háromszög R = c / 2', categoryId: 'cat-oldalak' },
  { id: 'h8', text: 'Hatszög T = 6 · (a²√3)/4', categoryId: 'cat-terulet' },
  { id: 'h9', text: 'Körgyűrű T = π(R² - r²)', categoryId: 'cat-terulet' },
  { id: 'h10', text: 'Szabályos n-szög belső szög: (n-2)·180°/n', categoryId: 'cat-szogek' },
  { id: 'h11', text: 'Szabályos hatszög R = a', categoryId: 'cat-oldalak' },
  { id: 'h12', text: 'Korcikk területe: T = (r²π·α) / 360°', categoryId: 'cat-terulet' }
];

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Húrnégyszög és érintőnégyszög csoportosítás',
    subtitle: 'Válogasd szét a négyszögeket aszerint, hogy köréjük vagy beléjük írható kör!',
    categories: easyCategories,
    items: easyItems
  },
  2: {
    title: 'Szabályos sokszögek köradatai',
    subtitle: 'Válogasd szét a képleteket a háromszög, négyzet és hatszög szerint!',
    categories: mediumCategories,
    items: mediumItems
  },
  3: {
    title: 'Geometriai tételek jellege',
    subtitle: 'Válogasd szét a tételeket szögek, oldalak vagy területképletek szerint!',
    categories: hardCategories,
    items: hardItems
  }
};

export const PolygonsAndCirclesSorter: React.FC<PolygonsAndCirclesSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId="g10-geo-sokszogek-es-korok"
      topicTitle="Sokszögek és körök kapcsolata"
      title="Sokszögek és körök kapcsolata Csoportosító"
      subtitle="Válogasd szét a geometriai kifejezéseket és alakzatokat a megfelelő kategóriákba!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      levels={sorterLevels}
      {...props}
    />
  );
};
