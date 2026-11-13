import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BalanceScaleSvg,
  ExtraneousRootsSvg,
  LostRootsSvg,
  DomainRestrictionSvg,
  FlowchartStepSvg
} from './EquivalentEquationsFigures';

interface EquivalentEquationsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Alapfogalmak és ekvivalens egyenletpárok',
    subtitle: 'Párosítsd az egyenleteket és az alapfogalmakat a megfelelő párjukkal!',
    pairs: [
      { id: 'eem1-1', prompt: 'Ekvivalens egyenletek definíciója', promptFigure: <BalanceScaleSvg size={42} />, value: 'Megoldáshalmazuk pontosan megegyezik az alaphalmazon' },
      { id: 'eem1-2', prompt: '2x + 5 = 15 egyszerűsítése', value: 'x = 5' },
      { id: 'eem1-3', prompt: 'Mérlegelv alapszabálya', value: 'Mindkét oldalhoz ugyanazt a számot adjuk hozzá / vonjuk ki' },
      { id: 'eem1-4', prompt: '3x = 12 ekvivalens párja', value: 'x = 4' },
      { id: 'eem1-5', prompt: 'Értelmezési tartomány (D)', value: 'Azon számok, amelyekkel az egyenlet műveletei elvégezhetők' },
      { id: 'eem1-6', prompt: 'Nullával való szorzás mindkét oldalon', value: 'Tilos, mert minden x-re 0 = 0 azonosságot eredményez' },
      { id: 'eem1-7', prompt: 'x - 7 = 0 ekvivalens alakja', value: 'x = 7' },
      { id: 'eem1-8', prompt: 'Döntési alapszabály', promptFigure: <FlowchartStepSvg size={42} />, value: 'Nemnulla számmal szorozva / osztva ekvivalens marad' }
    ]
  },
  2: {
    title: 'Átalakítások, hamis gyökök és gyökvesztés',
    subtitle: 'Párosítsd a matematikai lépéseket a helyes következményükkel!',
    pairs: [
      { id: 'eem2-1', prompt: 'Mindkét oldal négyzetre emelése: ( )²', promptFigure: <ExtraneousRootsSvg size={42} />, value: 'Nem ekvivalens, hamis gyökök keletkezhetnek' },
      { id: 'eem2-2', prompt: 'Mindkét oldal osztása ismeretlennel (: x)', promptFigure: <LostRootsSvg size={42} />, value: 'Gyökvesztés: ha x = 0 gyök volt, elveszítjük' },
      { id: 'eem2-3', prompt: 'x² = 25 megoldáshalmaza ℝ-en', value: '{-5; 5}' },
      { id: 'eem2-4', prompt: 'x = 5 és x² = 25 viszonya ℝ-en', value: 'Nem ekvivalensek ({-5; 5} ≠ {5})' },
      { id: 'eem2-5', prompt: 'x = 5 és x² = 25 viszonya ℕ-en', value: 'Ekvivalensek, mert mindkettő gyöke {5}' },
      { id: 'eem2-6', prompt: 'Törtes kifejezés nevezője: x - 3 ≠ 0', promptFigure: <DomainRestrictionSvg size={42} />, value: 'Kikötés: x ≠ 3 (3 kizárva a tartományból)' },
      { id: 'eem2-7', prompt: 'Köbgyökvonás mindkét oldalból ℝ-en', value: 'Ekvivalens átalakítás (kölcsönösen egyértelmű)' },
      { id: 'eem2-8', prompt: 'x² - 3x = 0 helyes megoldása', value: 'Kiemeléssel: x(x - 3) = 0 ⟹ x₁ = 0, x₂ = 3' }
    ]
  },
  3: {
    title: 'Érettségi buktatók és speciális esetek',
    subtitle: 'Párosítsd a bonyolultabb egyenletpárokat és hibákat a helyes indoklással!',
    pairs: [
      { id: 'eem3-1', prompt: '(x² - 1)/(x - 1) = 0', value: 'Gyöke csak x = -1, mert az 1 nem tartozik az értelmezési tartományba' },
      { id: 'eem3-2', prompt: '√(x - 4) = -2', value: 'Nincs valós megoldása (a négyzetgyök nem lehet negatív)' },
      { id: 'eem3-3', prompt: '|x| = 7 megoldáshalmaza', value: '{-7; 7}' },
      { id: 'eem3-4', prompt: 'x² + 4 = 0 valós gyökei', value: 'Üres halmaz (∅), mert x² ≥ 0' },
      { id: 'eem3-5', prompt: '0 · x = 0 egyenlet megoldása', value: 'Minden valós szám (azonosság)' },
      { id: 'eem3-6', prompt: '0 · x = 5 egyenlet megoldása', value: 'Nincs megoldás (ellentmondás, ∅)' },
      { id: 'eem3-7', prompt: '(x - 2)(x + 3) = 0 és x² + x - 6 = 0', value: 'Ekvivalens egyenletek ℝ-en ({2; -3})' },
      { id: 'eem3-8', prompt: 'Nem ekvivalens lépés utáni kötelező teendő', value: 'Behelyettesítés az eredeti kiinduló egyenletbe' }
    ]
  }
};

export const EquivalentEquationsMatcher: React.FC<EquivalentEquationsMatcherProps> = ({
  topicId = 'g10-eq-ekvivalens-egyenletek-matcher',
  topicTitle = 'Ekvivalens egyenletek',
  ...props
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levels={matcherLevels}
      themeColor="teal"
      {...props}
    />
  );
};

export default EquivalentEquationsMatcher;

