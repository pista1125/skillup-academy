import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface InverseProportionSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Kapcsolatok és Hozzárendelések Típusa',
    subtitle: 'Válogasd szét a képleteket: fordított arányosság, egyenes arányosság vagy nem arányos kapcsolat!',
    categories: [
      {
        id: 'cat-inv',
        name: 'Fordított Arányosság (k / x)',
        description: 'Szorzat állandó: x · y = k (hiperbola görbe)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-dir',
        name: 'Egyenes Arányosság (k · x)',
        description: 'Hányados állandó: y / x = k (origón átmenő egyenes)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-neither',
        name: 'Nem Arányos Kapcsolat',
        description: 'Lineáris tengelymetszettel, összeg vagy négyzetes',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'y = 12 / x', category: 'cat-inv' },
      { id: 's1-2', label: 'x · y = 48', category: 'cat-inv' },
      { id: 's1-3', label: 'y = 0,5 / x', category: 'cat-inv' },
      { id: 's1-4', label: 'y = -10 / x', category: 'cat-inv' },
      { id: 's1-5', label: 'y = 3x', category: 'cat-dir' },
      { id: 's1-6', label: 'y = -2x', category: 'cat-dir' },
      { id: 's1-7', label: 'y / x = 7', category: 'cat-dir' },
      { id: 's1-8', label: 'y = 0,4x', category: 'cat-dir' },
      { id: 's1-9', label: 'y = 2x + 5', category: 'cat-neither' },
      { id: 's1-10', label: 'y = 10 - x', category: 'cat-neither' },
      { id: 's1-11', label: 'y = x²', category: 'cat-neither' },
      { id: 's1-12', label: 'x + y = 20', category: 'cat-neither' }
    ]
  },
  2: {
    title: '2. Szint: Hiperbola Síknegyedei és Pontjai',
    subtitle: 'Határozd meg, hogy a kifejezés vagy pontpár melyik síknegyedbe esik, vagy nem hiperbola!',
    categories: [
      {
        id: 'cat-quad-1-3',
        name: 'I. és III. Síknegyed (k > 0)',
        description: 'Pozitív arányossági szorzat, azonos előjelű x és y',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-quad-2-4',
        name: 'II. és IV. Síknegyed (k < 0)',
        description: 'Negatív arányossági szorzat, ellentétes előjelű x és y',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-not-hyperbola',
        name: 'Nem Hiperbola (Tengelyeket Metsző)',
        description: 'Egyenesek vagy görbék, melyeknek van tengelymetszete',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'y = 24 / x', category: 'cat-quad-1-3' },
      { id: 's2-2', label: 'x · y = 16', category: 'cat-quad-1-3' },
      { id: 's2-3', label: 'P(2; 8) és Q(-4; -4)', category: 'cat-quad-1-3' },
      { id: 's2-4', label: 'y = 1 / x', category: 'cat-quad-1-3' },
      { id: 's2-5', label: 'y = -18 / x', category: 'cat-quad-2-4' },
      { id: 's2-6', label: 'x · y = -30', category: 'cat-quad-2-4' },
      { id: 's2-7', label: 'P(-2; 6) és Q(3; -4)', category: 'cat-quad-2-4' },
      { id: 's2-8', label: 'y = -5 / x', category: 'cat-quad-2-4' },
      { id: 's2-9', label: 'y = 4x (origón átmenő)', category: 'cat-not-hyperbola' },
      { id: 's2-10', label: 'y = -x + 3 (metszi a tengelyt)', category: 'cat-not-hyperbola' },
      { id: 's2-11', label: 'y = 8 (vízszintes egyenes)', category: 'cat-not-hyperbola' },
      { id: 's2-12', label: 'y = x² - 4 (parabola)', category: 'cat-not-hyperbola' }
    ]
  },
  3: {
    title: '3. Szint: Hétköznapi Helyzetek és Gyakorlati Modell',
    subtitle: 'Sorold be a szöveges szituációkat a megfelelő fordított arányossági modellbe!',
    categories: [
      {
        id: 'cat-work',
        name: 'Munkamegosztás (Munkások · Idő = k)',
        description: 'Több ember kevesebb idő alatt végez a rögzített munkával',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-motion',
        name: 'Sebesség és Menetidő (v · t = s)',
        description: 'Nagyobb sebességgel kevesebb idő kell ugyanahhoz az úthoz',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-geom',
        name: 'Rögzített Terület (a · b = T)',
        description: 'Téglalap egyik oldalának növelésével a másik csökken',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      }
    ],
    items: [
      { id: 's3-1', label: '4 festő 6 óra alatt fest le egy kerítést', category: 'cat-work' },
      { id: 's3-2', label: '8 munkás 15 nap alatt építi fel a falat', category: 'cat-work' },
      { id: 's3-3', label: '12 gép 4 óra alatt gyárt le egy tételt', category: 'cat-work' },
      { id: 's3-4', label: '3 diák 40 perc alatt hajtogatja be a leveleket', category: 'cat-work' },
      { id: 's3-5', label: '90 km/h-val 2 óra alatt érünk a Balatonhoz', category: 'cat-motion' },
      { id: 's3-6', label: '50 km/h-val 6 órás autóút a nagyszülőkhöz', category: 'cat-motion' },
      { id: 's3-7', label: '120 km/h-val 1,5 óra a menetidő Pécsig', category: 'cat-motion' },
      { id: 's3-8', label: 'Kerékpáros 20 km/h-val 3 óra alatt ér célba', category: 'cat-motion' },
      { id: 's3-9', label: '36 cm² területű téglalap szélessége és magassága', category: 'cat-geom' },
      { id: 's3-10', label: '50 m² alapterületű nappali két oldalhossza', category: 'cat-geom' },
      { id: 's3-11', label: '100 cm² területű fotó keretezési méretei', category: 'cat-geom' },
      { id: 's3-12', label: '64 cm² területű síkidom két merőleges kiterjedése', category: 'cat-geom' }
    ]
  }
};

export const InverseProportionSorter: React.FC<InverseProportionSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-inverse',
  topicTitle = 'Fordított Arányosság'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="indigo"
    />
  );
};

export default InverseProportionSorter;
