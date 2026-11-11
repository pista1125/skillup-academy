import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SssMiniSvg,
  SasMiniSvg,
  AsaMiniSvg,
  SsaMiniSvg,
  RightAngleWithDotSvg
} from './TriangleCongruenceFigures';

interface TriangleCongruenceMatcherProps {
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
    title: 'Egybevágósági alapesetek és jelentésük',
    subtitle: 'Párosítsd a jeleket és feltételeket a megfelelő geometriai megnevezéssel!',
    pairs: [
      { id: 'tcm1-1', prompt: '(o, o, o) / SSS', promptFigure: <SssMiniSvg size={42} />, value: 'Mindhárom oldal páronként egyenlő' },
      { id: 'tcm1-2', prompt: '(o, sz, o) / SAS', promptFigure: <SasMiniSvg size={42} />, value: 'Két oldal és a közbezárt szög egyenlő' },
      { id: 'tcm1-3', prompt: '(sz, o, sz) / ASA', promptFigure: <AsaMiniSvg size={42} />, value: 'Egy oldal és a rajta fekvő két szög egyenlő' },
      { id: 'tcm1-4', prompt: '(o, o, sz) / SSA', promptFigure: <SsaMiniSvg size={42} />, value: 'Két oldal és a nagyobbikkal szemközti szög' },
      { id: 'tcm1-5', prompt: '△ABC ≅ △A\'B\'C\'', value: 'A két háromszög egybevágó' },
      { id: 'tcm1-6', prompt: '(sz, sz, sz)', value: 'NEM egybevágósági alapeset (csak hasonlóság)' },
      { id: 'tcm1-7', prompt: 'Magyar derékszög jelölés', promptFigure: <RightAngleWithDotSvg size={46} />, value: 'Körív és a belsejében egy pont' },
      { id: 'tcm1-8', prompt: 'Háromszög-egyenlőtlenség', value: 'a + b > c (bármely két oldal összege)' }
    ]
  },
  2: {
    title: 'Adott adathármasok és alapesetek párosítása',
    subtitle: 'Melyik alapeset alapján határozzák meg a megadott adatok a háromszöget?',
    pairs: [
      { id: 'tcm2-1', prompt: 'a = 5, b = 7, c = 9', value: '(o, o, o) / SSS alapeset' },
      { id: 'tcm2-2', prompt: 'a = 6, b = 8, γ = 60° (közbezárt)', value: '(o, sz, o) / SAS alapeset' },
      { id: 'tcm2-3', prompt: 'c = 10, α = 45°, β = 65°', value: '(sz, o, sz) / ASA alapeset' },
      { id: 'tcm2-4', prompt: 'a = 10, b = 6, α = 50° (a > b)', value: '(o, o, sz) egyértelmű eset' },
      { id: 'tcm2-5', prompt: 'a = 4, b = 9, α = 30° (a < b)', value: 'SSA csapda: 2 különböző megoldás' },
      { id: 'tcm2-6', prompt: 'Derékszögű: két befogó adott', value: '(o, sz, o) alapeset (90° közbezárt)' },
      { id: 'tcm2-7', prompt: 'Derékszögű: átfogó és egy befogó', value: '(o, o, sz) egyértelmű eset' },
      { id: 'tcm2-8', prompt: 'α = 30°, β = 60°, γ = 90°', value: 'Csak alakot határoz meg (hasonlóság)' }
    ]
  },
  3: {
    title: 'Geometriai bizonyítások és egybevágóságok',
    subtitle: 'Párosítsd a geometriai tételeket az egybevágósági bizonyításuk kulcsgondolatával!',
    pairs: [
      { id: 'tcm3-1', prompt: 'Egyenlő szárú alapi szögei egyenlők', value: 'Alap magassága 2 egybevágó derékszögűre bontja' },
      { id: 'tcm3-2', prompt: 'Paralelogramma szemközti oldalai egyenlők', value: 'Átló behúzásával 2 egybevágó háromszög keletkezik' },
      { id: 'tcm3-3', prompt: 'Paralelogramma átlói felezik egymást', value: 'Szemközti háromszögek egybevágóak (váltószögekkel)' },
      { id: 'tcm3-4', prompt: 'Szakaszfelező merőleges pontjai', value: 'Egyenlő távol vannak a két végponttól' },
      { id: 'tcm3-5', prompt: 'Szögfelező bármely pontja', value: 'Egyenlő távol van a szög száraitól' },
      { id: 'tcm3-6', prompt: 'Rombuszt az átlója bontja', value: '2 egybevágó egyenlő szárú háromszögre (SSS)' },
      { id: 'tcm3-7', prompt: 'Deltoid szimmetriaátlója', value: '2 egybevágó háromszögre osztja a deltoidot (SSS)' },
      { id: 'tcm3-8', prompt: 'Körben egyenlő húrok', value: 'Egyenlő távolságra vannak a középponttól' }
    ]
  }
};

export const TriangleCongruenceMatcher: React.FC<TriangleCongruenceMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="Háromszögek egybevágósága Párosító"
      subtitle="Kattints az összetartozó tételekre, adathármasokra és definíciókra!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="emerald"
      levels={matcherLevels}
      {...props}
    />
  );
};
