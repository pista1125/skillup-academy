import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MixingBeakersSvg,
  ParallelFlowTubesSvg,
  DilutionStepsSvg,
  TechnicalFormulaBridgeSvg,
  LabBalanceBeakerSvg
} from './LabDevelopmentFigures';

interface LabDevelopmentMatcherProps {
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
    title: 'Keverési alapok és egyszerű oldatarányok',
    subtitle: 'Párosítsd az oldatjellemzőket és megmaradási törvényeket a megfelelő párjukkal!',
    pairs: [
      { id: 'ldm1-1', prompt: '200 g 10%-os sóoldat oldott anyaga', value: '20 g tiszta só (200 · 0,10)' },
      { id: 'ldm1-2', prompt: '300 g 20%-os cukoroldat cukortartalma', value: '60 g tiszta cukor (300 · 0,20)' },
      { id: 'ldm1-3', prompt: 'Hozzáadott tiszta víz töménysége (w_víz)', value: '0% (nem tartalmaz oldott anyagot)' },
      { id: 'ldm1-4', prompt: 'Hozzáadott tiszta só töménysége (w_só)', value: '100% (teljes egészében oldott anyag)' },
      { id: 'ldm1-5', prompt: '100 g 10%-os és 100 g 30%-os oldat keveréke', promptFigure: <MixingBeakersSvg size={42} />, value: '20% (azonos tömegek számtani közepe)' },
      { id: 'ldm1-6', prompt: '500 g vízhez 50 g só hozzáadása', value: 'Oldat tömege: 550 g (50 g / 550 g ≈ 9,09%)' },
      { id: 'ldm1-7', prompt: 'Tömegmegmaradás elve', value: 'm_össz = m₁ + m₂' },
      { id: 'ldm1-8', prompt: 'Keverési egyenlet anyagmérlege', promptFigure: <LabBalanceBeakerSvg size={42} />, value: 'm₁·w₁ + m₂·w₂ = (m₁ + m₂)·w_új' }
    ]
  },
  2: {
    title: 'Együttes munkavégzés és műszaki formulák',
    subtitle: 'Párosítsd a reciprok-modelleket, csapfeladatokat és fizikai képleteket!',
    pairs: [
      { id: 'ldm2-1', prompt: '1. csap: 3 h, 2. csap: 6 h együttes ideje', promptFigure: <ParallelFlowTubesSvg size={42} />, value: 'T = 2 óra (1/3 + 1/6 = 1/2)' },
      { id: 'ldm2-2', prompt: '1. csap: 4 h, 2. csap: 4 h együttes ideje', value: 'T = 2 óra (két egyforma gép felezi az időt)' },
      { id: 'ldm2-3', prompt: '1. csap: 2 h, 2. csap: 3 h együttes ideje', value: 'T = 1,2 óra = 1 óra 12 perc (6/5 óra)' },
      { id: 'ldm2-4', prompt: 'Párhuzamos ellenállások: R₁ = 6 Ω, R₂ = 3 Ω', promptFigure: <TechnicalFormulaBridgeSvg size={42} />, value: 'R_e = 2 Ω (1/6 + 1/3 = 1/2)' },
      { id: 'ldm2-5', prompt: 'Vékony lencse: t = 20 cm, k = 20 cm', value: 'f = 10 cm (1/f = 1/20 + 1/20 = 1/10)' },
      { id: 'ldm2-6', prompt: '1 óra alatt végzett munka összege', value: '1/t₁ + 1/t₂ = 1/T' },
      { id: 'ldm2-7', prompt: 'Közös munkaidő zárt képlete', value: 'T = (t₁ · t₂) / (t₁ + t₂)' },
      { id: 'ldm2-8', prompt: 'Munkavégzés fizikai kikötése', value: 't > 0 (fizikai idő nem lehet negatív)' }
    ]
  },
  3: {
    title: 'Összetett keverési, hígítási és másodfokú modellek',
    subtitle: 'Párosítsd a több lépéses és másodfokúra vezető feladatokat a megoldásukkal!',
    pairs: [
      { id: 'ldm3-1', prompt: '200 g 15%-osból 10%-os oldat készítése', value: '100 g víz hozzáadása szükséges (30 g / 300 g)' },
      { id: 'ldm3-2', prompt: '400 g 10%-osból 20%-os készítése sóval', value: '50 g só hozzáadása ((40 + 50) / 450 = 90 / 450)' },
      { id: 'ldm3-3', prompt: '600 g 10%-osból 200 g víz elpárologtatása', value: 'Új töménység: 15% (60 g / 400 g)' },
      { id: 'ldm3-4', prompt: 'Kétszeres lépcsőzetes hígítás képlete', promptFigure: <DilutionStepsSvg size={42} />, value: 'c₂ = c₀ · (1 - x/V)²' },
      { id: 'ldm3-5', prompt: '10 l-ből x l kivétele 2-szer, maradék 64%', value: 'x = 2 liter (1 - x/10 = 0,8)' },
      { id: 'ldm3-6', prompt: '1. csap x h, 2. csap x+3 h, együtt 2 h', value: 'Másodfokú egyenlete: x² - x - 6 = 0' },
      { id: 'ldm3-7', prompt: 'x² - x - 6 = 0 fizikai megoldása', value: 'x = 3 óra (az x = -2 kiesik)' },
      { id: 'ldm3-8', prompt: '1/R_e = 1/R₁ + 1/R₂ átrendezve R₁-re', value: 'R₁ = (R_e · R₂) / (R₂ - R_e)' }
    ]
  }
};

export const LabDevelopmentMatcher: React.FC<LabDevelopmentMatcherProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-laboratoriumi-fejlesztesek-matcher',
  topicTitle = 'Laboratóriumi modellek – Párkereső játék'
}) => {
  const activeLevel = level || currentLevel || 1;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

