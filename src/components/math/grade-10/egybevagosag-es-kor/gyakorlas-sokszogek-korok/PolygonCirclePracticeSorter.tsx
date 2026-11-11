import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SymmTangentialTrapezoidMiniSvg,
  RightTangentialTrapezoidMiniSvg,
  RegularOctagonMiniSvg
} from './PolygonCirclePracticeFigures';
import { HexagonMiniSvg } from '../sokszogek-es-korok/PolygonsAndCirclesFigures';

interface PolygonCirclePracticeSorterProps {
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
  { id: 'cat-hatszog', name: 'Szabályos hatszög' },
  { id: 'cat-erintotrapez', name: 'Érintőtrapéz' },
  { id: 'cat-derek-haromszog', name: 'Derékszögű háromszög' }
];

const easyItems: SorterItem[] = [
  { id: 'i1', text: 'R = a (sugár egyenlő az oldallal)', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'i2', text: '6 db szabályos háromszögből áll', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'i3', text: 'm = 2r (magasság = kör átmérője)', figure: <SymmTangentialTrapezoidMiniSvg size={44} />, categoryId: 'cat-erintotrapez' },
  { id: 'i4', text: 'b = (a + c) / 2 szimmetrikus esetben', figure: <SymmTangentialTrapezoidMiniSvg size={44} />, categoryId: 'cat-erintotrapez' },
  { id: 'i5', text: 'R = c / 2 (átfogó fele)', categoryId: 'cat-derek-haromszog' },
  { id: 'i6', text: 'r = (a + b - c) / 2', categoryId: 'cat-derek-haromszog' },
  { id: 'i7', text: 'Belső szögei 120°-osak', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'i8', text: 'Oldalaira teljesül: a + c = b + d', figure: <SymmTangentialTrapezoidMiniSvg size={44} />, categoryId: 'cat-erintotrapez' },
  { id: 'i9', text: 'Átfogója a köré írt kör átmérője', categoryId: 'cat-derek-haromszog' },
  { id: 'i10', text: 'r = (a√3) / 2', figure: <HexagonMiniSvg size={44} />, categoryId: 'cat-hatszog' },
  { id: 'i11', text: 'Párhuzamos oldalai távolsága 2r', figure: <SymmTangentialTrapezoidMiniSvg size={44} />, categoryId: 'cat-erintotrapez' },
  { id: 'i12', text: 'Befogói merőlegesek egymásra', categoryId: 'cat-derek-haromszog' }
];

const mediumCategories: SorterCategory[] = [
  { id: 'cat-hossz', name: 'Hosszúság / Sugár' },
  { id: 'cat-terulet', name: 'Területképlet' },
  { id: 'cat-szog', name: 'Szögtulajdonság' }
];

const mediumItems: SorterItem[] = [
  { id: 'm1', text: 'r = m / 3', categoryId: 'cat-hossz' },
  { id: 'm2', text: 'T = (3√3 / 2) · a²', categoryId: 'cat-terulet' },
  { id: 'm3', text: 'α + γ = 180°', categoryId: 'cat-szog' },
  { id: 'm4', text: 'R = (a√2) / 2', categoryId: 'cat-hossz' },
  { id: 'm5', text: 'T = s · r', categoryId: 'cat-terulet' },
  { id: 'm6', text: 'Középponti szög = 360° / n', categoryId: 'cat-szog' },
  { id: 'm7', text: 'm = √(b² - x²)', categoryId: 'cat-hossz' },
  { id: 'm8', text: 'T = ((a + c) / 2) · m', categoryId: 'cat-terulet' },
  { id: 'm9', text: 'Thálész-szög = 90°', categoryId: 'cat-szog' },
  { id: 'm10', text: 'b = (a + c) / 2', categoryId: 'cat-hossz' },
  { id: 'm11', text: 'T = x · y (derékszögű érintési szakaszokkal)', categoryId: 'cat-terulet' },
  { id: 'm12', text: 'Érintési sugár és érintő szöge 90°', categoryId: 'cat-szog' }
];

const hardCategories: SorterCategory[] = [
  { id: 'cat-hurnegy', name: 'Csak húrnégyszögre igaz' },
  { id: 'cat-erintonegy', name: 'Csak érintőnégyszögre igaz' },
  { id: 'cat-mindket-negy', name: 'Húr- és érintőnégyszögre is igaz' }
];

const hardItems: SorterItem[] = [
  { id: 'h1', text: 'Szemközti szögek összege 180°', categoryId: 'cat-hurnegy' },
  { id: 'h2', text: 'Szemközti oldalak összege egyenlő', categoryId: 'cat-erintonegy' },
  { id: 'h3', text: 'Minden négyzeten teljesül', categoryId: 'cat-mindket-negy' },
  { id: 'h4', text: 'Brahmagupta-képlet alkalmazható', categoryId: 'cat-hurnegy' },
  { id: 'h5', text: 'T = s · r érvényes rá', categoryId: 'cat-erintonegy' },
  { id: 'h6', text: 'Csúcsain át kör rajzolható és beírt köre is van', categoryId: 'cat-mindket-negy' },
  { id: 'h7', text: 'Téglalapra automatikusan igaz', categoryId: 'cat-hurnegy' },
  { id: 'h8', text: 'Rombuszra automatikusan igaz', categoryId: 'cat-erintonegy' },
  { id: 'h9', text: 'Szimmetrikus érintőtrapéz (egyenlőszárú)', categoryId: 'cat-mindket-negy' },
  { id: 'h10', text: 'Húrtrapézra mindig teljesül', categoryId: 'cat-hurnegy' },
  { id: 'h11', text: 'Deltoidra mindig teljesül', categoryId: 'cat-erintonegy' },
  { id: 'h12', text: 'Derékszögű deltoidra teljesül', categoryId: 'cat-mindket-negy' }
];

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Szabályos hatszög és érintőtrapéz alapok',
    subtitle: 'Válogasd szét a geometriai állításokat az alakzatok típusai szerint!',
    categories: easyCategories,
    items: easyItems
  },
  2: {
    title: 'Képletek és dimenziók',
    subtitle: 'Rendszerezd a formulákat a megfelelő matematikai kategóriákba!',
    categories: mediumCategories,
    items: mediumItems
  },
  3: {
    title: 'Négyszögek halmazai',
    subtitle: 'Döntsd el, hogy az adott tulajdonság húrnégyszögre, érintőnégyszögre vagy mindkettőre igaz-e!',
    categories: hardCategories,
    items: hardItems
  }
};

export const PolygonCirclePracticeSorter: React.FC<PolygonCirclePracticeSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId={props.topicId || "g10-geo-gyakorlas-sokszogek"}
      topicTitle={props.topicTitle || "Érintőtrapézok és szabályos sokszögek"}
      levels={sorterLevels}
      easyCategories={easyCategories}
      easyItems={easyItems}
      mediumCategories={mediumCategories}
      mediumItems={mediumItems}
      hardCategories={hardCategories}
      hardItems={hardItems}
      {...props}
    />
  );
};
