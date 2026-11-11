import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BalanceMeanSvg,
  DeviationLineSvg,
  WeightedMeanBlocksSvg,
  TargetShootingSvg,
  OutlierImpactSvg
} from './AverageArithmeticFigures';

interface AverageArithmeticMatcherProps {
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
    title: 'Alapfogalmak és egyszerű átlagszámítás',
    subtitle: 'Párosítsd az átlagszámítás alapfogalmait és példáit a helyes értékekkel!',
    pairs: [
      { id: 'aam1-1', prompt: 'Egyszerű számtani közép képlete', promptFigure: <BalanceMeanSvg size={42} />, value: '(x₁ + x₂ + ... + xₙ) / n' },
      { id: 'aam1-2', prompt: '10, 20 és 30 átlaga', value: '20' },
      { id: 'aam1-3', prompt: '4 szám átlaga 15', value: 'A számok összege: 60' },
      { id: 'aam1-4', prompt: 'Átlagtól vett eltérések összege', promptFigure: <DeviationLineSvg size={42} />, value: 'Mindig pontosan 0: Σ(xᵢ - x̄) = 0' },
      { id: 'aam1-5', prompt: 'Súlyozott számtani közép elve', promptFigure: <WeightedMeanBlocksSvg size={42} />, value: 'Értékek és gyakoriságok szorzatösszege / összgyakoriság' },
      { id: 'aam1-6', prompt: 'Mérleg / forgáspont analógia', value: 'Az átlag a súlypont, ahol a mérleg egyensúlyban áll' },
      { id: 'aam1-7', prompt: '2 db 4-es és 3 db 5-ös átlaga', value: '4,6' },
      { id: 'aam1-8', prompt: '5 szám összege 45', value: '9' }
    ]
  },
  2: {
    title: 'Tulajdonságok, transzformációk és hiányzó adatok',
    subtitle: 'Párosítsd a műveletek hatását és a súlyozott átlagokat a helyes következményekkel!',
    pairs: [
      { id: 'aam2-1', prompt: 'Minden adathoz hozzáadunk 10-et', value: 'Az új átlag is pontosan 10-zel nő' },
      { id: 'aam2-2', prompt: 'Minden adatot megszorzunk 3-mal', value: 'Az új átlag is a 3-szorosára nő' },
      { id: 'aam2-3', prompt: 'Minden adatból kivonunk 4-et', value: 'Az új átlag 4-gyel kisebb lesz' },
      { id: 'aam2-4', prompt: 'Egyetlen extrém kiugró érték', promptFigure: <OutlierImpactSvg size={42} />, value: 'Erősen eltorzítja az átlagot (nem robusztus)' },
      { id: 'aam2-5', prompt: 'Adatok: 8, 12, x. Átlag: 15', value: 'x = 25' },
      { id: 'aam2-6', prompt: '3 szám átlaga 100, hozzáveszünk egy 100-ast', value: 'Az átlag nem változik' },
      { id: 'aam2-7', prompt: 'Azonos létszámú csoportok (10-10 fő, átlag 4 és 5)', value: 'Együttes átlag: 4,5' },
      { id: 'aam2-8', prompt: 'Különböző létszám (10 fő átlaga 4, 30 fő átlaga 5)', value: 'Súlyozott átlag: 4,75' }
    ]
  },
  3: {
    title: 'Kompetencia és érettségi alkalmazások',
    subtitle: 'Párosítsd a gyakorlati feladványokat a pontos matematikai megoldásukkal!',
    pairs: [
      { id: 'aam3-1', prompt: 'Feri lövészversenye (8, 8, 9, 10; átlag > 8,6)', promptFigure: <TargetShootingSvg size={42} />, value: 'Legalább 9 pont kell az 5. lövésre' },
      { id: 'aam3-2', prompt: 'Gergő: 73 pont összesen, meccsátlag 14,6', value: '5 mérkőzést játszott eddig' },
      { id: 'aam3-3', prompt: 'Gergő utolsó meccsén 20 pontot dob', value: 'Új átlag: 15,5 pont' },
      { id: 'aam3-4', prompt: 'Anna fizetése: 5 hó 160e Ft, 7 hó 184e Ft (+15%)', value: 'Éves átlag: 174 ezer Ft' },
      { id: 'aam3-5', prompt: '20 kockadobás: 1..5-ből 17 db, 6-ból 3 db', value: 'A dobások átlaga: 3,85' },
      { id: 'aam3-6', prompt: 'Analitikai mérleg: 10 mérés átlaga 24,074 g (cél 24 g)', value: 'Elfogadható minőség (eltérés < 0,5%)' },
      { id: 'aam3-7', prompt: 'Dolgozat 2x súllyal: jegyek 5 (1x), 4 (2x), 5 (1x)', value: 'Súlyozott átlag: 4,5' },
      { id: 'aam3-8', prompt: '15 szám átlaga 4,2; hozzáveszünk egy számot, új átlag 5', value: 'A hozzáadott szám: 17' }
    ]
  }
};

export const AverageArithmeticMatcher: React.FC<AverageArithmeticMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      levels={matcherLevels}
      title="Átlag és számtani közép Párosító"
      subtitle="Keresd meg az összetartozó fogalmakat, képleteket és számításokat!"
      topicId={props.topicId || 'g10-stat-atlag-szamtani-kozep-matcher'}
      topicTitle={props.topicTitle || 'Átlag, számtani közép'}
      {...props}
    />
  );
};

export default AverageArithmeticMatcher;

