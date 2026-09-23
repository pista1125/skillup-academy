import React from 'react';
import { MatcherTemplate, MatcherPair, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  Compass,
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  Ruler,
  Triangle,
  CircleDot,
  Scale
} from 'lucide-react';

interface TriangleLinesMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const level1Pairs: MatcherPair[] = [
  {
    id: 'l1-p1',
    prompt: 'Oldalfelező merőleges (f_a)',
    value: 'Szakaszfelezőre állított merőleges',
    hint: 'Minden pontja egyenlő távol van a szakasz végpontjaitól.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <line x1="10" y1="20" x2="90" y2="20" className="stroke-indigo-600 stroke-[2]" />
        <line x1="50" y1="5" x2="50" y2="35" className="stroke-teal-500 stroke-[2]" strokeDasharray="2 2" />
        <circle cx="50" cy="20" r="2.5" className="fill-slate-700" />
      </svg>
    )
  },
  {
    id: 'l1-p2',
    prompt: 'Belső szögfelező (w_α)',
    value: 'Belső szöget felező félegyenes',
    hint: 'Egyenlő távol van a szöget bezáró két oldaltól.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <line x1="20" y1="30" x2="80" y2="30" className="stroke-teal-600 stroke-[2]" />
        <line x1="20" y1="30" x2="65" y2="8" className="stroke-teal-600 stroke-[2]" />
        <line x1="20" y1="30" x2="75" y2="18" className="stroke-emerald-500 stroke-[1.8]" strokeDasharray="2 2" />
        <circle cx="20" cy="30" r="2.5" className="fill-teal-700" />
      </svg>
    )
  },
  {
    id: 'l1-p3',
    prompt: 'Magasságvonal (m_a)',
    value: 'Csúcsból szemközti oldalra bocsátott merőleges',
    hint: 'A csúcs és a szemközti oldalegyenes távolsága.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <polygon points="50,6 20,34 80,34" fill="none" className="stroke-blue-600 stroke-[1.5]" />
        <line x1="50" y1="6" x2="50" y2="34" className="stroke-rose-500 stroke-[2]" />
        <rect x="50" y="28" width="6" height="6" fill="none" className="stroke-rose-400 stroke-[1]" />
      </svg>
    )
  },
  {
    id: 'l1-p4',
    prompt: 'Súlyvonal (s_a)',
    value: 'Csúcsot szemközti oldal felezőpontjával köti össze',
    hint: 'A súlypontba fut be, és 2:1 arányban osztódik.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <polygon points="50,6 20,34 80,34" fill="none" className="stroke-purple-600 stroke-[1.5]" />
        <line x1="50" y1="6" x2="50" y2="34" className="stroke-purple-500 stroke-[2]" />
        <circle cx="50" cy="34" r="2.5" className="fill-slate-700" />
      </svg>
    )
  },
  {
    id: 'l1-p5',
    prompt: 'Köré írt kör középpontja (O)',
    value: 'Oldalfelező merőlegesek metszéspontja',
    hint: 'Egyenlő távol van a háromszög mindhárom csúcsától (OA = OB = OC = R).'
  },
  {
    id: 'l1-p6',
    prompt: 'Beírt kör középpontja (K)',
    value: 'Belső szögfelezők metszéspontja',
    hint: 'Egyenlő távol van a háromszög mindhárom oldalától (sugár: r).'
  },
  {
    id: 'l1-p7',
    prompt: 'Magasságpont (M)',
    value: 'Magasságvonalak metszéspontja',
    hint: 'Tompaszögű háromszögnél a háromszögön kívülre esik.'
  },
  {
    id: 'l1-p8',
    prompt: 'Súlypont (S)',
    value: 'Súlyvonalak metszéspontja',
    hint: 'A háromszög fizikai tömegközéppontja.'
  }
];

const level2Pairs: MatcherPair[] = [
  {
    id: 'l2-p1',
    prompt: 'Derékszögű háromszög O pontja',
    value: 'Átfogó felezőpontja',
    hint: 'Thalész-tétel alapján a köré írt kör középpontja az átfogó közepe.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <polygon points="20,10 20,34 80,34" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        <circle cx="50" cy="22" r="3" className="fill-indigo-600" />
        <text x="56" y="24" className="text-[8px] font-bold fill-indigo-700">O</text>
      </svg>
    )
  },
  {
    id: 'l2-p2',
    prompt: 'Derékszögű háromszög M pontja',
    value: 'A derékszögű csúcs',
    hint: 'A két befogó egyben a magasságvonalak is, így a csúcsban metszik egymást.'
  },
  {
    id: 'l2-p3',
    prompt: 'Tompaszögű háromszög O és M pontja',
    value: 'A háromszögön KÍVÜL van',
    hint: 'Csak a súlypont (S) és a beírt kör középpontja (K) marad mindig belül.'
  },
  {
    id: 'l2-p4',
    prompt: 'Középvonal (k)',
    value: 'Párhuzamos a 3. oldallal, hossza c / 2',
    hint: 'Két oldal felezőpontját összekötő szakasz.',
    promptFigure: (
      <svg viewBox="0 0 100 40" className="w-16 h-8 mx-auto">
        <polygon points="50,6 20,34 80,34" fill="none" className="stroke-teal-600 stroke-[1.5]" />
        <line x1="35" y1="20" x2="65" y2="20" className="stroke-amber-500 stroke-[2]" />
      </svg>
    )
  },
  {
    id: 'l2-p5',
    prompt: '3 középvonal felosztása',
    value: '4 db egybevágó kis háromszög',
    hint: 'Minden kis háromszög területe az eredeti terület negyede (T / 4).'
  },
  {
    id: 'l2-p6',
    prompt: 'Euler-egyenes',
    value: 'M, S és O egy egyenesre esik',
    hint: 'Nem szabályos háromszögben a magasságpont, súlypont és köré írt kör kp. kollineáris.'
  },
  {
    id: 'l2-p7',
    prompt: 'Szabályos háromszög nevezetes pontjai',
    value: 'Mind a 4 pont egybeesik',
    hint: 'O, K, M és S egyetlen pontot alkotnak a szimmetria miatt.'
  },
  {
    id: 'l2-p8',
    prompt: 'Háromszög területe magassággal',
    value: 'T = (a · m_a) / 2',
    hint: 'Oldal szorozva a hozzá tartozó magassággal, osztva kettővel.'
  }
];

const level3Pairs: MatcherPair[] = [
  {
    id: 'l3-p1',
    prompt: 'Súlypont osztóaránya',
    value: '2 : 1 a csúcstól számítva',
    hint: 'A csúcstól a súlypontig tartó szakasz kétszer olyan hosszú, mint a felezőpontig tartó.'
  },
  {
    id: 'l3-p2',
    prompt: 'Ha s_a = 15 cm, akkor AS hossza',
    value: '10 cm  (és SF_a = 5 cm)',
    hint: '15 / 3 = 5 cm (1 egység), a csúcs felőli rész 2 · 5 = 10 cm.'
  },
  {
    id: 'l3-p3',
    prompt: 'Ha SF_b = 4 cm, akkor s_b hossza',
    value: '12 cm  (BS = 8 cm)',
    hint: 'SF_b az 1/3 rész. A teljes súlyvonal 3 · 4 = 12 cm.'
  },
  {
    id: 'l3-p4',
    prompt: 'Ha c = 18 cm, a k_c középvonal hossza',
    value: '9 cm',
    hint: 'A középvonal mindig pontosan fele a vele párhuzamos oldalnak (18 / 2 = 9).'
  },
  {
    id: 'l3-p5',
    prompt: 'Derékszögű háromszög átfogója c = 20 cm',
    value: 'R = 10 cm (Köré írt kör sugara)',
    hint: 'A köré írt kör középpontja az átfogó felezője, így R = c / 2 = 10 cm.'
  },
  {
    id: 'l3-p6',
    prompt: 'Euler-egyenesen az osztásarány',
    value: 'MS : SO = 2 : 1',
    hint: 'A magasságpont és súlypont távolsága kétszerese a súlypont és köré írt kör kp. távolságának.'
  },
  {
    id: 'l3-p7',
    prompt: 'Középvonalak által határolt háromszög kerülete',
    value: 'Az eredeti kerület fele (K / 2)',
    hint: 'Minden oldala az eredeti háromszög oldalának a fele, így a kerülete is feleződik.'
  },
  {
    id: 'l3-p8',
    prompt: 'Egyenlő szárú háromszög alapon lévő magassága',
    value: 'Egybeesik az oldalfelezővel, szögfelezővel és súlyvonallal',
    hint: 'A szimmetriatengelyen mind a négy nevezetes vonal azonos egyenessé olvad össze.'
  }
];

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: "1. Szint: Alapfogalmak és Nevezetes Pontok",
    pairs: level1Pairs
  },
  2: {
    title: "2. Szint: Tulajdonságok és Háromszögtípusok",
    pairs: level2Pairs
  },
  3: {
    title: "3. Szint: Számítások, Arányok (2:1) és Összefüggések",
    pairs: level3Pairs
  }
};

export const TriangleLinesMatcher: React.FC<TriangleLinesMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-triangle-lines',
  topicTitle = '2. Háromszögek nevezetes vonalai'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Háromszögek Nevezetes Vonalai Kártyás Párosító"
      subtitle="Párosítsd a nevezetes vonalakat, pontokat, ábrákat és számítási szabályokat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default TriangleLinesMatcher;
