import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EverydayGraphsSorterProps {
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

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Grafikonfajták és Tengelyek Csoportosítása',
    subtitle: 'Sorold be a kifejezéseket a megfelelő diagramtípushoz!',
    categories: [
      {
        id: 'cat-st',
        name: 'Út-idő grafikon (s-t)',
        description: 'Időbeli elmozdulás, meredekség = sebesség',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-vt',
        name: 'Sebesség-idő grafikon (v-t)',
        description: 'Pillanatnyi tempó, terület = megtett út',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-bio',
        name: 'Élettani & Időjárás diagram',
        description: 'Pulzus, vérnyomás, hőmérséklet, légnyomás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // s-t
      { id: 'es1-1', label: 'Vízszintes szakasz = álló test (v = 0)', category: 'cat-st' },
      { id: 'es1-2', label: 'Meredekség a haladási sebességet jelenti', category: 'cat-st' },
      { id: 'es1-3', label: 'Metszéspont = két jármű találkozása', category: 'cat-st' },
      { id: 'es1-4', label: 'Lefelé tartó görbe = hazatérés a startponthoz', category: 'cat-st' },
      // v-t
      { id: 'es1-5', label: 'A görbe alatti terület a megtett utat adja', category: 'cat-vt' },
      { id: 'es1-6', label: 'Vízszintes szakasz = állandó sebességű suhanás', category: 'cat-vt' },
      { id: 'es1-7', label: 'Meredekség a test gyorsulását fejezi ki', category: 'cat-vt' },
      { id: 'es1-8', label: 'Fékezéskor a vonal eléri a v = 0 tengelyt', category: 'cat-vt' },
      // bio / időjárás
      { id: 'es1-9', label: 'Nyugalmi szint 70 bpm, sprint 165 bpm', category: 'cat-bio' },
      { id: 'es1-10', label: 'Napi hőingadozás (T_max - T_min)', category: 'cat-bio' },
      { id: 'es1-11', label: 'Fagyáspont elérése 0 °C-os zérushelynél', category: 'cat-bio' },
      { id: 'es1-12', label: 'Légnyomás esése vihar közeledtekor', category: 'cat-bio' }
    ]
  },
  2: {
    title: '2. Szint: Mozgásállapotok Értelmezése Grafikonokról',
    subtitle: 'Kategorizáld az eseményeket a mozgás jellege szerint!',
    categories: [
      {
        id: 'cat-moving',
        name: 'Egyenletes Mozgás',
        description: 'Állandó sebesség, egyenes út-idő vonal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-stopped',
        name: 'Álló Helyzet / Pihenő',
        description: 'Sebesség nulla, távolság nem változik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-accel',
        name: 'Gyorsuló / Lassuló Mozgás',
        description: 'Változó sebesség, hajló út-idő ív',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Egyenletes
      { id: 'es2-1', label: 'Tempomattal 130 km/h-val haladó autó', category: 'cat-moving' },
      { id: 'es2-2', label: 'Út-idő grafikonon állandó meredekségű egyenes', category: 'cat-moving' },
      { id: 'es2-3', label: 'Egyenletes tempójú gyaloglás sík terepen', category: 'cat-moving' },
      { id: 'es2-4', label: 'v-t grafikonon vízszintes szakasz (v > 0)', category: 'cat-moving' },
      // Álló
      { id: 'es2-5', label: 'Út-idő grafikonon vízszintes egyenes szakasz', category: 'cat-stopped' },
      { id: 'es2-6', label: 'Piros lámpánál vagy sorompónál várakozás', category: 'cat-stopped' },
      { id: 'es2-7', label: 'Menet közbeni 30 perces ebédpihenő benzinkútnál', category: 'cat-stopped' },
      { id: 'es2-8', label: 'v-t grafikonon a görbe a vízszintes tengelyen fekszik', category: 'cat-stopped' },
      // Gyorsuló / lassuló
      { id: 'es2-9', label: 'Álló helyzetből kilövő sportautó', category: 'cat-accel' },
      { id: 'es2-10', label: 'Gyalogosátkelő előtt satuféket nyomó sofőr', category: 'cat-accel' },
      { id: 'es2-11', label: 'Toronyból leejtett kő szabadesése', category: 'cat-accel' },
      { id: 'es2-12', label: 'Megállóba begördülő villamos lassulása', category: 'cat-accel' }
    ]
  },
  3: {
    title: '3. Szint: Hétköznapi Függvénymodellek Típusai',
    subtitle: 'Sorold be a hétköznapi jelenségeket a matematikai modelljük szerint!',
    categories: [
      {
        id: 'cat-mod-linear',
        name: 'Lineáris Modell (y = mx + b)',
        description: 'Egyenletes változás, állandó arány',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-mod-step',
        name: 'Lépcsős Modell (Szakaszosan konstans)',
        description: 'Díjsávok, tarifák, darabos ugrások',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-mod-exp',
        name: 'Exponenciális / Nemlineáris Modell',
        description: 'Gyorsuló vagy csillapodó folyamatok',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Lineáris
      { id: 'es3-1', label: 'Fix 500 Ft alapdíj + 300 Ft/km taxi viteldíj', category: 'cat-mod-linear' },
      { id: 'es3-2', label: 'Egyenletes sebességgel ürülő víztartály', category: 'cat-mod-linear' },
      { id: 'es3-3', label: 'Órabéres fizetés a ledolgozott órák függvényében', category: 'cat-mod-linear' },
      { id: 'es3-4', label: 'Állandó gázfogyasztás melegítéskor', category: 'cat-mod-linear' },
      // Lépcsős
      { id: 'es3-5', label: 'Csomagküldés súlysávos tarifái (0-2 kg, 2-5 kg)', category: 'cat-mod-step' },
      { id: 'es3-6', label: 'Parkolási díj minden megkezdett órára kerekítve', category: 'cat-mod-step' },
      { id: 'es3-7', label: 'Épület emeletei közötti liftmagasság megállásokkal', category: 'cat-mod-step' },
      { id: 'es3-8', label: 'Mobilnet adatkeret túllépési csomagjai', category: 'cat-mod-step' },
      // Exponenciális / Nemlineáris
      { id: 'es3-9', label: 'Évente 8% kamatos kamattal gyarapodó megtakarítás', category: 'cat-mod-exp' },
      { id: 'es3-10', label: 'Szobahőmérsékletre csillapodó forró tea hűlése', category: 'cat-mod-exp' },
      { id: 'es3-11', label: 'Lítium akkumulátor 80% feletti lassuló gyorstöltése', category: 'cat-mod-exp' },
      { id: 'es3-12', label: 'Járvány terjedése korlátlan környezetben', category: 'cat-mod-exp' }
    ]
  }
};

export const EverydayGraphsSorter: React.FC<EverydayGraphsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-mindennapok-sorter',
  topicTitle = '4. Grafikonok a mindennapokban'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="9. Osztály • V. Függvények"
      levelConfigs={sorterLevels}
    />
  );
};

