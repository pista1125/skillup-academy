import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PillarCongruenceMiniSvg,
  PillarCircleMiniSvg,
  PillarAnglesMiniSvg,
  PillarPolygonsMiniSvg
} from './GeometryReviewFigures';

interface GeometryReviewSorterProps {
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
  { id: 'cat-haromszog-egybe', name: 'Egybevágóság' },
  { id: 'cat-kor-mertek', name: 'Kör metrika (K, T)' },
  { id: 'cat-sokszog-kor', name: 'Sokszögek és körök' }
];

const easyItems: SorterItem[] = [
  { id: 'i1', text: 'o-o-o alapeset', figure: <PillarCongruenceMiniSvg size={44} />, categoryId: 'cat-haromszog-egybe' },
  { id: 'i2', text: 'o-sz-o alapeset', figure: <PillarCongruenceMiniSvg size={44} />, categoryId: 'cat-haromszog-egybe' },
  { id: 'i3', text: 'K = 2rπ', figure: <PillarCircleMiniSvg size={44} />, categoryId: 'cat-kor-mertek' },
  { id: 'i4', text: 'T = r²π', figure: <PillarCircleMiniSvg size={44} />, categoryId: 'cat-kor-mertek' },
  { id: 'i5', text: 'Húrnégyszög: α + γ = 180°', figure: <PillarPolygonsMiniSvg size={44} />, categoryId: 'cat-sokszog-kor' },
  { id: 'i6', text: 'Érintőnégyszög: a + c = b + d', figure: <PillarPolygonsMiniSvg size={44} />, categoryId: 'cat-sokszog-kor' },
  { id: 'i7', text: 'sz-o-sz alapeset', figure: <PillarCongruenceMiniSvg size={44} />, categoryId: 'cat-haromszog-egybe' },
  { id: 'i8', text: 'Körgyűrű területe: (R²-r²)π', figure: <PillarCircleMiniSvg size={44} />, categoryId: 'cat-kor-mertek' },
  { id: 'i9', text: 'Thálész-tétel: átmérő felett 90°', figure: <PillarPolygonsMiniSvg size={44} />, categoryId: 'cat-sokszog-kor' },
  { id: 'i10', text: 'o-o-sz alapeset (nagyobbikkal szemben)', figure: <PillarCongruenceMiniSvg size={44} />, categoryId: 'cat-haromszog-egybe' },
  { id: 'i11', text: 'Középponti szög α = 2β', figure: <PillarAnglesMiniSvg size={44} />, categoryId: 'cat-kor-mertek' },
  { id: 'i12', text: 'Szabályos hatszög R = a', figure: <PillarPolygonsMiniSvg size={44} />, categoryId: 'cat-sokszog-kor' }
];

const mediumCategories: SorterCategory[] = [
  { id: 'cat-lineáris', name: 'Hosszúság / Ív / Sugár' },
  { id: 'cat-kvadratikus', name: 'Terület / Felszín' },
  { id: 'cat-szögmérék', name: 'Szögtulajdonság' }
];

const mediumItems: SorterItem[] = [
  { id: 'm1', text: 'i = 2rπ · (α / 360°)', categoryId: 'cat-lineáris' },
  { id: 'm2', text: 'Tc = r²π · (α / 360°)', categoryId: 'cat-kvadratikus' },
  { id: 'm3', text: 'α = 2β', categoryId: 'cat-szögmérék' },
  { id: 'm4', text: 'r = a / 2', categoryId: 'cat-lineáris' },
  { id: 'm5', text: 'T = s · r', categoryId: 'cat-kvadratikus' },
  { id: 'm6', text: 'Thálész-szög = 90°', categoryId: 'cat-szögmérék' },
  { id: 'm7', text: 'b = (a + c) / 2', categoryId: 'cat-lineáris' },
  { id: 'm8', text: 'T = (3√3 / 2) · a²', categoryId: 'cat-kvadratikus' },
  { id: 'm9', text: 'β + δ = 180°', categoryId: 'cat-szögmérék' },
  { id: 'm10', text: 'R = (a√2) / 2', categoryId: 'cat-lineáris' },
  { id: 'm11', text: 'T = (i · r) / 2', categoryId: 'cat-kvadratikus' },
  { id: 'm12', text: 'Érintő és érintési sugár = 90°', categoryId: 'cat-szögmérék' }
];

const hardCategories: SorterCategory[] = [
  { id: 'cat-mindig-igaz', name: 'Minden négyszögre igaz' },
  { id: 'cat-hurnegy-spec', name: 'Húrnégyszögre igaz' },
  { id: 'cat-erinto-spec', name: 'Érintőnégyszögre igaz' }
];

const hardItems: SorterItem[] = [
  { id: 'h1', text: 'Belső szögek összege 360°', categoryId: 'cat-mindig-igaz' },
  { id: 'h2', text: 'Szemközti szögek összege 180°', categoryId: 'cat-hurnegy-spec' },
  { id: 'h3', text: 'Szemközti oldalak összege egyenlő', categoryId: 'cat-erinto-spec' },
  { id: 'h4', text: 'Átlók száma n(n-3)/2 = 2', categoryId: 'cat-mindig-igaz' },
  { id: 'h5', text: 'Minden csúcson át kör rajzolható', categoryId: 'cat-hurnegy-spec' },
  { id: 'h6', text: 'Minden oldalt érintő kör rajzolható', categoryId: 'cat-erinto-spec' },
  { id: 'h7', text: 'Kerülete a + b + c + d', categoryId: 'cat-mindig-igaz' },
  { id: 'h8', text: 'Téglalapra mindig teljesül', categoryId: 'cat-hurnegy-spec' },
  { id: 'h9', text: 'Rombuszra mindig teljesül', categoryId: 'cat-erinto-spec' },
  { id: 'h10', text: 'Külső szögek összege 360°', categoryId: 'cat-mindig-igaz' },
  { id: 'h11', text: 'Húrtrapézra mindig teljesül', categoryId: 'cat-hurnegy-spec' },
  { id: 'h12', text: 'T = (K / 2) · r érvényes rá', categoryId: 'cat-erinto-spec' }
];

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Nagy geometria rendszerező',
    subtitle: 'Válogasd szét a fogalmakat a három fő témaegység szerint!',
    categories: easyCategories,
    items: easyItems
  },
  2: {
    title: 'Mértékek és tulajdonságok',
    subtitle: 'Rendszerezd az összefüggéseket a mértékegységek és jellegek szerint!',
    categories: mediumCategories,
    items: mediumItems
  },
  3: {
    title: 'Négyszögek általános és speciális tulajdonságai',
    subtitle: 'Különítsd el az általános és speciális négyszögek tulajdonságait!',
    categories: hardCategories,
    items: hardItems
  }
};

export const GeometryReviewSorter: React.FC<GeometryReviewSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId={props.topicId || "g10-geo-ismetles"}
      topicTitle={props.topicTitle || "Gyakorlás, tudáspróba"}
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
