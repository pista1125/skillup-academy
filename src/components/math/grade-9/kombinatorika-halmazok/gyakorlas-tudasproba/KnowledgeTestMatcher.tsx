import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ChapterSummaryMindmapSvg,
  ExamVennSieveSvg,
  CompleteGraphKHandshakesSvg,
  IntervalSetIntersectionRulerSvg,
  CountingPermutationTreeSvg,
  DeMorganVennSvg,
  RussellParadoxScaleSvg
} from './KnowledgeTestFigures';

interface KnowledgeTestMatcherProps {
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
    title: '1. Szint: Alapvető Képletek és Alapfogalmak',
    subtitle: 'Párosítsd a fejezet kulcsfogalmait és típusfeladatait a pontos képleteikkel!',
    pairs: [
      {
        id: 'ktm1-1',
        prompt: 'n különböző elem sorbarendezése (Permutáció)',
        value: 'P_n = n! = n · (n-1) · ... · 1',
        figure: <CountingPermutationTreeSvg size={70} />
      },
      {
        id: 'ktm1-2',
        prompt: 'Kézfogások száma n ember között (mindenki mindenkivel)',
        value: 'n · (n-1) / 2',
        figure: <CompleteGraphKHandshakesSvg size={70} />
      },
      {
        id: 'ktm1-3',
        prompt: 'n elemű halmaz összes részhalmazának száma',
        value: '2ⁿ darab részhalmaz'
      },
      {
        id: 'ktm1-4',
        prompt: 'A ∩ B (Halmazok metszete)',
        value: 'Mindkét halmaz közös elemei'
      },
      {
        id: 'ktm1-5',
        prompt: 'A ∪ B (Halmazok uniója)',
        value: 'Legalább az egyik halmaz elemei'
      },
      {
        id: 'ktm1-6',
        prompt: 'A \\ B (Különbséghalmaz)',
        value: 'A-ban benne van, de B-ben nincs'
      },
      {
        id: 'ktm1-7',
        prompt: '[-2; 3] ∩ ℤ egész pontjai',
        value: '{-2, -1, 0, 1, 2, 3} (6 db szám)',
        figure: <IntervalSetIntersectionRulerSvg size={70} />
      },
      {
        id: 'ktm1-8',
        prompt: 'Dirichlet skatulya-elve (N > k)',
        value: 'Legalább egy dobozban legalább 2 tárgy van'
      }
    ]
  },
  2: {
    title: '2. Szint: Standard Témazáró Tételképletek és Azonosságok',
    subtitle: 'Párosítsd a tételeket, azonosságokat és összefüggéseket a leírásukkal!',
    pairs: [
      {
        id: 'ktm2-1',
        prompt: 'Gráfok fokszám-összege (Kézfogási lemma)',
        value: '∑ d(v) = 2 · e (mindig páros összeg)',
        figure: <CompleteGraphKHandshakesSvg size={70} />
      },
      {
        id: 'ktm2-2',
        prompt: 'Körasztal ülésrendje (n személy leültetése)',
        value: '(n - 1)! ciklikus permutáció'
      },
      {
        id: 'ktm2-3',
        prompt: 'Két halmaz szitaformulája',
        value: '|A ∪ B| = |A| + |B| - |A ∩ B|'
      },
      {
        id: 'ktm2-4',
        prompt: 'Szimmetrikus differencia (A Δ B)',
        value: '(A \\ B) ∪ (B \\ A)'
      },
      {
        id: 'ktm2-5',
        prompt: 'De Morgan törvény unióra: (A ∪ B)',
        value: 'Ā ∩ B̄ (komplementerek metszete)',
        figure: <DeMorganVennSvg size={70} />
      },
      {
        id: 'ktm2-6',
        prompt: 'De Morgan törvény metszetre: (A ∩ B)',
        value: 'Ā ∪ B̄ (komplementerek uniója)'
      },
      {
        id: 'ktm2-7',
        prompt: 'Konvex n-szög összes átlójának száma',
        value: 'n · (n - 3) / 2'
      },
      {
        id: 'ktm2-8',
        prompt: 'Nem üres, valódi részhalmazok száma',
        value: '2ⁿ - 2 darab'
      }
    ]
  },
  3: {
    title: '3. Szint: Emelt Szintű és Mester Témazáró Összefüggések',
    subtitle: 'Párosítsd az elméleti magasságokat, paradoxonokat és extremitásokat!',
    pairs: [
      {
        id: 'ktm3-1',
        prompt: 'Három halmaz szitaformulája',
        value: '∑|A| - ∑|A ∩ B| + |A ∩ B ∩ C|',
        figure: <ExamVennSieveSvg size={70} />
      },
      {
        id: 'ktm3-2',
        prompt: 'A Δ B átírása unióval és metszettel',
        value: '(A ∪ B) \\ (A ∩ B)'
      },
      {
        id: 'ktm3-3',
        prompt: 'A \\ B kifejezése komplementerrel',
        value: 'A ∩ B̄'
      },
      {
        id: 'ktm3-4',
        prompt: 'Másodlagos hatványhalmaz |𝒫(𝒫(A))| ha |A| = 2',
        value: '2⁴ = 16 elem'
      },
      {
        id: 'ktm3-5',
        prompt: 'Russell-paradoxon R = {X | X ∉ X}',
        value: 'R ∈ R ⟺ R ∉ R (ZFC axiomatika indoklása)',
        figure: <RussellParadoxScaleSvg size={70} />
      },
      {
        id: 'ktm3-6',
        prompt: 'Természetes és valós számok számossága',
        value: '|ℕ| = ℵ₀ (megszámlálható) < |ℝ| = 2^ℵ₀ (kontinuum)',
        figure: <ChapterSummaryMindmapSvg size={70} />
      },
      {
        id: 'ktm3-7',
        prompt: 'A ⊆ B állítás logikai tagadása',
        value: 'A \\ B ≠ ∅ (létezik x ∈ A, amire x ∉ B)'
      },
      {
        id: 'ktm3-8',
        prompt: 'Páratlan fokszámú csúcsok száma egyszerű gráfban',
        value: 'Csak páros darab lehet (0, 2, 4, ...)'
      }
    ]
  }
};

export const KnowledgeTestMatcher: React.FC<KnowledgeTestMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="red"
      topicId={topicId || 'g9-komb-tudasproba-matcher'}
      topicTitle={topicTitle || '9. Osztály - Fejezeti Témazáró Párosító'}
    />
  );
};

export default KnowledgeTestMatcher;
