import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SegmentBisectorSvg,
  AngleBisectorSvg,
  ConstructibleAnglesSvg
} from './ConstructionFigures';

interface ConstructionMatcherProps {
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
    title: '1. Szint: Euklideszi Alapszerkesztések',
    subtitle: 'Párosítsd a szerkesztési feladatokat a helyes lépésekkel és módszerekkel!',
    pairs: [
      {
        id: 'cm1-1',
        prompt: 'Szakaszfelező merőleges szerkesztése',
        value: 'A végpontokból R > AB/2 körívek metszéspontjait összekötjük',
        figure: <SegmentBisectorSvg size={70} />
      },
      {
        id: 'cm1-2',
        prompt: 'Szögfelező szerkesztése',
        value: 'Szárakon metszéspontok kimérése, majd azokból azonos sugarú metsző körívek',
        figure: <AngleBisectorSvg size={70} />
      },
      {
        id: 'cm1-3',
        prompt: 'Adott pontban merőleges egyenesre',
        value: 'Pontból két azonos távolságú pont kijelölése, majd ezek felezőmerőlegese'
      },
      {
        id: 'cm1-4',
        prompt: 'Egyenesre külső pontból merőleges',
        value: 'Külső pontból körív két pontban metszi az egyenest, azok felezőmerőlegese'
      },
      {
        id: 'cm1-5',
        prompt: 'Szög másolása félegyenesre',
        value: 'Azonos sugarú körív a csúcsból, majd a szárak közötti húr átvitele körzővel'
      },
      {
        id: 'cm1-6',
        prompt: 'Párhuzamos egyenes szerkesztése',
        value: 'Merőlegesre merőleges állítása vagy egyenlő állásszögek átmásolása'
      }
    ]
  },
  2: {
    title: '2. Szint: Szögek Megszerkeszthetősége',
    subtitle: 'Kösd össze az adott szögeket a megszerkesztésük módjával vagy tulajdonságával!',
    pairs: [
      {
        id: 'cm2-1',
        prompt: '60° szerkesztése',
        value: 'Szabályos háromszög szerkesztése (adott sugár körívként történő felmérése)',
        figure: <ConstructibleAnglesSvg size={70} />
      },
      {
        id: 'cm2-2',
        prompt: '90° és 45° előállítása',
        value: 'Egyenesre merőleges állítása, majd a kapott derékszög elfelezése'
      },
      {
        id: 'cm2-3',
        prompt: '30° és 15° előállítása',
        value: 'A 60°-os szabályos szög egyszeri, illetve kétszeri szögfelezése'
      },
      {
        id: 'cm2-4',
        prompt: '75° és 105° szerkesztése',
        value: 'Összegképzés: 60° + 15° = 75° és 90° + 15° = 105°'
      },
      {
        id: 'cm2-5',
        prompt: '120° és 135° szerkesztése',
        value: '180° − 60° = 120° vagy 90° + 45° = 135°'
      },
      {
        id: 'cm2-6',
        prompt: '20° szerkesztése és a szögharmadolás',
        value: 'Körzővel és vonalzóval euklideszi módon NEM szerkeszthető!'
      }
    ]
  },
  3: {
    title: '3. Szint: Háromszög-szerkesztések és Feltételek',
    subtitle: 'Párosítsd a háromszög adott adatait a megoldhatóság és szerkeszthetőség feltételével!',
    pairs: [
      {
        id: 'cm3-1',
        prompt: 'Három oldal adott: a, b, c',
        value: 'Háromszög-egyenlőtlenség: bármely két oldal összege nagyobb a harmadiknál'
      },
      {
        id: 'cm3-2',
        prompt: 'Két oldal és közbezárt szög: a, b, γ',
        value: 'Mindig egyértelműen szerkeszthető egybevágóság erejéig'
      },
      {
        id: 'cm3-3',
        prompt: 'Egy oldal és két szög: c, α, β',
        value: 'Szerkeszthető, ha α + β < 180° (a harmadik szög automatikusan adott)'
      },
      {
        id: 'cm3-4',
        prompt: 'Két oldal és a nagyobbikkal szemközti szög: a, b, α (a > b)',
        value: 'Mindig egyetlen (egyértelmű) megoldás létezik'
      },
      {
        id: 'cm3-5',
        prompt: 'Két oldal és a kisebbikkel szemközti szög: a, b, α (a < b)',
        value: 'Két metszéspont, egy érintő vagy nulla megoldás is előfordulhat'
      },
      {
        id: 'cm3-6',
        prompt: 'Csak három szög adott: α, β, γ (összegük 180°)',
        value: 'Végtelen sok hasonló háromszög létezik, az oldalméretek nincsenek rögzítve'
      }
    ]
  }
};

export const ConstructionMatcher: React.FC<ConstructionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-szerkesztes',
  topicTitle = '4. Szerkesztések'
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

