import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CircleHomothetySvg,
  CircleTouchingDilationSvg,
  InvariantLinesSvg,
  AngleInterceptThalesSvg,
  PyramidDilationSvg
} from './HomothetyFigures';

interface HomothetyMatcherProps {
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
    title: '1. Szint: Fixpontok, fixegyenesek és alaptulajdonságok',
    subtitle: 'Párosítsd a középpontos hasonlóság invariáns elemeit a megfelelő geometriai definícióval!',
    pairs: [
      {
        id: 'hm1-1',
        prompt: 'A középpontos hasonlóság fixpontja (λ ≠ 1)',
        promptFigure: <InvariantLinesSvg size={42} />,
        value: 'Kizárólag a hasonlóság O középpontja (O\' = O)'
      },
      {
        id: 'hm1-2',
        prompt: 'Fixegyenesek halmaza a síkban',
        value: 'Az összes O ponton átmenő egyenes (önmagukba képződnek le)'
      },
      {
        id: 'hm1-3',
        prompt: 'Egyenes képe, ha nem megy át O-n',
        value: 'Az eredeti egyenessel párhuzamos egyenes (e\' ∥ e)'
      },
      {
        id: 'hm1-4',
        prompt: 'Kör képe középpontos hasonlóságban',
        promptFigure: <CircleTouchingDilationSvg size={42} />,
        value: 'Kör, melynek sugara r\' = |λ| · r'
      },
      {
        id: 'hm1-5',
        prompt: 'Két tetszőleges kör viszonya a síkban',
        promptFigure: <CircleHomothetySvg size={42} />,
        value: 'Mindig középpontosan hasonlók (kivéve ha egybevágók és el vannak tolva)'
      },
      {
        id: 'hm1-6',
        prompt: 'Kör középpontjának (K) képe',
        value: 'A képi kör középpontja (K\')'
      },
      {
        id: 'hm1-7',
        prompt: 'Sokszögek hasonlósága',
        value: 'Megfelelő szögeik egyenlők, megfelelő oldalaik párhuzamosak'
      },
      {
        id: 'hm1-8',
        prompt: 'Fixegyenes pontjai (ha λ ≠ 1)',
        value: 'Elmozdulnak az egyenesen, nem pontonként fixek (kivéve O)'
      }
    ]
  },
  2: {
    title: '2. Szint: Körök hasonlósága és szelőszakaszok',
    subtitle: 'Párosítsd a körök érintőit és a szög szárait metsző párhuzamosokat a tételekkel!',
    pairs: [
      {
        id: 'hm2-1',
        prompt: 'Külső hasonlósági pont (H_k)',
        promptFigure: <CircleHomothetySvg size={42} />,
        value: 'A külső közös érintők metszéspontja (λ = r₂/r₁ > 0)'
      },
      {
        id: 'hm2-2',
        prompt: 'Belső hasonlósági pont (H_b)',
        value: 'A belső közös érintők metszéspontja (λ = -r₂/r₁ < 0)'
      },
      {
        id: 'hm2-3',
        prompt: 'Centrum a körvonalon van (λ = 0,5)',
        promptFigure: <CircleTouchingDilationSvg size={42} />,
        value: 'A két kör az O pontban belülről érinti egymást'
      },
      {
        id: 'hm2-4',
        prompt: 'Szögszárakat metsző párhuzamosok: △OAD és △OBE',
        promptFigure: <AngleInterceptThalesSvg size={42} />,
        value: 'Középpontosan hasonló háromszögek az O csúcsból'
      },
      {
        id: 'hm2-5',
        prompt: 'Két szomszédos trapéz: ABED és BCFE',
        value: 'NEM középpontosan hasonlók az O csúcsból'
      },
      {
        id: 'hm2-6',
        prompt: '5 cm sugarú kör kicsinyítése λ = 0,5-del',
        value: 'Az új kör sugara r\' = 2,5 cm, területe az eredeti 1/4-e'
      },
      {
        id: 'hm2-7',
        prompt: 'Két egybevágó kör külső hasonlósági pontja',
        value: 'Nem létezik a véges síkon (külső érintőik párhuzamosak)'
      },
      {
        id: 'hm2-8',
        prompt: 'Két koncentrikus kör hasonlósági pontja',
        value: 'A közös középpont (O₁ = O₂ = O)'
      }
    ]
  },
  3: {
    title: '3. Szint: Térbeli testek, gömbök és érettségi tévhitek',
    subtitle: 'Párosítsd a térbeli kiterjesztéseket és a tipikus geometriai kérdéseket!',
    pairs: [
      {
        id: 'hm3-1',
        prompt: 'Bármely két gömb viszonya a térben',
        value: 'Mindig középpontosan hasonlók a centrális egyenes pontjaiból'
      },
      {
        id: 'hm3-2',
        prompt: 'Bármely két nem egybevágó négyzet',
        value: 'Hasonlóak, de NEM feltétlenül középpontosan (ha el vannak forgatva)'
      },
      {
        id: 'hm3-3',
        prompt: 'Bármely két nem egybevágó kocka',
        value: 'Csak akkor középpontosan hasonlók, ha éleik párhuzamosak'
      },
      {
        id: 'hm3-4',
        prompt: 'Gúla nagyítása az E csúcsból λ = 8 aránnyal',
        promptFigure: <PyramidDilationSvg size={42} />,
        value: 'Alapterülete 64-szeresére (8²), térfogata 512-szeresére (8³) nő'
      },
      {
        id: 'hm3-5',
        prompt: 'Gúla nagyítása λ = √2 aránnyal',
        value: 'Oldallapok kerülete √2-szeres, alapterülete 2-szeres ( (√2)² )'
      },
      {
        id: 'hm3-6',
        prompt: 'Gömb sugara 6 cm ↦ kicsinyítés λ = 0,5-del',
        value: 'Felszíne az 1/4-ére (0,5²), térfogata az 1/8-ára (0,5³) csökken'
      },
      {
        id: 'hm3-7',
        prompt: 'Egy pontra illeszkedő alakzatok aránya',
        value: 'Ha F₁ és F₂ középpontosan hasonló, megfelelő oldalaik párhuzamosak'
      },
      {
        id: 'hm3-8',
        prompt: 'Két nem metsző különböző kör érintői',
        value: 'A külső érintők H_k-ban, a belső érintők H_b-ben metszik egymást'
      }
    ]
  }
};

export const HomothetyMatcher: React.FC<HomothetyMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Középpontos hasonlóság'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
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

export default HomothetyMatcher;

