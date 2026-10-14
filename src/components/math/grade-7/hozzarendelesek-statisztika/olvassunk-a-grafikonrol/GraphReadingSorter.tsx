import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface GraphReadingSorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1 Categories & Items
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'growing', title: 'Növekvő (emelkedik)', color: 'emerald' },
  { id: 'decreasing', title: 'Csökkenő (süllyed)', color: 'rose' },
  { id: 'constant', title: 'Állandó (vízszintes)', color: 'amber' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 's1-1', text: 'Autó egyenletes haladása az út–idő grafikonon', correctCategoryId: 'growing' },
  { id: 's1-2', text: 'Forró tea lehűlése a szobában a hőmérséklet grafikonon', correctCategoryId: 'decreasing' },
  { id: 's1-3', text: 'Piros lámpánál várakozó busz út–idő grafikonon', correctCategoryId: 'constant' },
  { id: 's1-4', text: 'Növekvő napraforgó magassága az idő múlásával', correctCategoryId: 'growing' },
  { id: 's1-5', text: 'Aszály idején apadó folyó vízállása', correctCategoryId: 'decreasing' },
  { id: 's1-6', text: 'Változatlan raktárkészlet a hétvégi zárva tartás alatt', correctCategoryId: 'constant' },
  { id: 's1-7', text: 'Leszálláshoz készülő, süllyedő repülőgép magassága', correctCategoryId: 'decreasing' },
  { id: 's1-8', text: 'Hegyre felkapaszkodó túrázó magasságának alakulása', correctCategoryId: 'growing' },
  { id: 's1-9', text: 'Termosztáton beállított állandó 22 °C szobahőmérséklet', correctCategoryId: 'constant' },
];

// Level 2 Categories & Items
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'independent', title: 'Független változó (x-tengely / vízszintes)', color: 'sky' },
  { id: 'dependent', title: 'Függő változó (y-tengely / függőleges)', color: 'indigo' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 's2-1', text: 'Eltelt idő órában vagy másodpercben (t)', correctCategoryId: 'independent' },
  { id: 's2-2', text: 'Futó által megtett távolság méterben (s)', correctCategoryId: 'dependent' },
  { id: 's2-3', text: 'Vásárolt füzetek darabszáma (db)', correctCategoryId: 'independent' },
  { id: 's2-4', text: 'Pénztárnál fizetendő végösszeg forintban (Ft)', correctCategoryId: 'dependent' },
  { id: 's2-5', text: 'Mért levegő-hőmérséklet Celsius-fokban (°C)', correctCategoryId: 'dependent' },
  { id: 's2-6', text: 'Mérési napok sorszáma a naptárban', correctCategoryId: 'independent' },
  { id: 's2-7', text: 'Hordóban lévő folyadék mennyisége literben (l)', correctCategoryId: 'dependent' },
  { id: 's2-8', text: 'Autó pillanatnyi sebessége (km/h)', correctCategoryId: 'dependent' },
  { id: 's2-9', text: 'Fűtés bekapcsolva tartásának ideje (perc)', correctCategoryId: 'independent' },
];

// Level 3 Categories & Items
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'positive', title: 'Pozitív érték (x-tengely felett: y > 0)', color: 'emerald' },
  { id: 'zero', title: 'Zérushely (x-tengelyen: y = 0)', color: 'cyan' },
  { id: 'negative', title: 'Negatív érték (x-tengely alatt: y < 0)', color: 'purple' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 's3-1', text: 'Déli napsütésben mért 26 °C hőmérséklet', correctCategoryId: 'positive' },
  { id: 's3-2', text: 'Téli hajnali fagy: -5 °C hőmérséklet', correctCategoryId: 'negative' },
  { id: 's3-3', text: 'Fagyáspontot elérő víz hőfoka (0 °C)', correctCategoryId: 'zero' },
  { id: 's3-4', text: 'Startvonal: 0 méter megtett út a futóverseny rajtjakor', correctCategoryId: 'zero' },
  { id: 's3-5', text: 'Tengerszint feletti 500 méteres kilátó magassága', correctCategoryId: 'positive' },
  { id: 's3-6', text: 'Tengerszint alatti barlang járat: -45 méter mélység', correctCategoryId: 'negative' },
  { id: 's3-7', text: 'Cég 4 millió forintos nyeresége az éves grafikonon', correctCategoryId: 'positive' },
  { id: 's3-8', text: 'Cég 1,5 millió forintos vesztesége (tartozás)', correctCategoryId: 'negative' },
  { id: 's3-9', text: 'Teljesen kiürült tartály víztartalma (0 liter)', correctCategoryId: 'zero' },
];

export const GraphReadingSorter: React.FC<GraphReadingSorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-graph',
}) => {
  return (
    <SorterTemplate
      title="Grafikon-leolvasás Csoportosító"
      subtitle="Csoportosítsd a folyamatok menettípusait, tengelyváltozóit és függvényértékeit!"
      topicTitle="3. Olvassunk a grafikonról!"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="cyan"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: Grafikon menetének jellege',
          description: 'Húzd az eseményeket a megfelelő szakasztípushoz (Növekvő, Csökkenő vagy Állandó)!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: Tengelyek és változók szerepe',
          description: 'Válaszd szét a független (x) és a függő (y) változókat!',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Függvényértékek előjele a grafikonon',
          description: 'Döntsd el, hogy az érték az x-tengely felett (pozitív), rajta (zérushely) vagy alatta (negatív) helyezkedik el!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default GraphReadingSorter;
