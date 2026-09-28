import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GeometrySoftwareMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető szoftvereszközök és funkcióik',
    subtitle: 'Párosítsd a dinamikus geometriai program eszközeit a matematikai jelentésükkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Szabad pont eszköz',
        value: 'Az egérrel bárhová tetszőlegesen elvonszolható, független kezdőobjektum',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="4.5" className="fill-blue-500 stroke-blue-700 stroke-[1.5]" />
            <path d="M 22 15 L 14 15 M 17 12 L 14 15 L 17 18" className="stroke-slate-500 stroke-[1.2]" />
            <path d="M 48 15 L 56 15 M 53 12 L 56 15 L 53 18" className="stroke-slate-500 stroke-[1.2]" />
            <path d="M 35 6 L 35 2 M 32 4 L 35 2 L 38 4" className="stroke-slate-500 stroke-[1.2]" />
            <path d="M 35 24 L 35 28 M 32 26 L 35 28 L 38 26" className="stroke-slate-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Metszéspont eszköz',
        value: 'Két vonal találkozási pontja; önállóan nem mozgatható, a szülőobjektumok határozzák meg',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="24" x2="58" y2="6" className="stroke-slate-400 stroke-[1.8]" />
            <line x1="12" y1="6" x2="58" y2="24" className="stroke-slate-400 stroke-[1.8]" />
            <circle cx="35" cy="15" r="4" className="fill-slate-700 stroke-slate-900 stroke-[1.5]" />
            <text x="38" y="11" className="text-[7px] font-bold fill-slate-800">M</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Szakaszfelező merőleges',
        value: 'A szakasz két végpontjától egyenlő távol lévő pontok mértani helyét adja meg',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-cyan-700 stroke-[2]" />
            <line x1="35" y1="3" x2="35" y2="27" className="stroke-cyan-500 stroke-[1.5] stroke-dasharray-[2,2]" />
            <circle cx="15" cy="15" r="2.5" className="fill-cyan-800" />
            <circle cx="55" cy="15" r="2.5" className="fill-cyan-800" />
            <path d="M 35 11 L 39 11 L 39 15" fill="none" className="stroke-cyan-700 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Szögfelező egyenes',
        value: 'A szög száraitól egyenlő távolságra fekvő pontok félegyenese/egyenese',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="25" x2="55" y2="25" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="15" y1="25" x2="48" y2="5" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="15" y1="25" x2="56" y2="15" className="stroke-amber-500 stroke-[1.5]" />
            <path d="M 28 25 A 13 13 0 0 0 25 19" fill="none" className="stroke-amber-600 stroke-[1]" />
            <path d="M 25 19 A 13 13 0 0 0 23 15" fill="none" className="stroke-amber-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Párhuzamos egyenes',
        value: 'Egy megadott egyenessel azonos állású, közös pont nélküli egyenes adott ponton át',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="8" x2="60" y2="8" className="stroke-indigo-600 stroke-[1.8]" />
            <line x1="10" y1="22" x2="60" y2="22" className="stroke-indigo-600 stroke-[1.8]" />
            <circle cx="35" cy="8" r="2.5" className="fill-indigo-700" />
            <text x="38" y="7" className="text-[6px] font-bold fill-indigo-800">P</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Kör középponttal és sugárral',
        value: 'A középponttól pontosan a megadott távolságra lévő pontok mértani helye',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="12" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <circle cx="35" cy="15" r="2.5" className="fill-teal-700" />
            <line x1="35" y1="15" x2="47" y2="15" className="stroke-teal-500 stroke-[1.2]" />
            <text x="39" y="13" className="text-[6px] font-bold fill-teal-800">r</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Háromszögek nevezetes vonalai és mértani helyek',
    subtitle: 'Kösd össze a háromszög nevezetes pontjait és köreit a pontos szerkesztési lépéseikkel!',
    pairs: [
      {
        id: 'p7',
        prompt: 'Körülírt kör középpontja (O)',
        value: 'A 3 oldalfelező merőleges metszéspontja; mindhárom csúcstól egyenlő távol van',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="13" fill="none" className="stroke-cyan-400 stroke-[1] stroke-dasharray-[2,2]" />
            <polygon points="23,20 47,20 35,2" fill="none" className="stroke-cyan-700 stroke-[1.5]" />
            <circle cx="35" cy="15" r="2.5" className="fill-cyan-800" />
            <text x="38" y="16" className="text-[6px] font-bold fill-cyan-900">O</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Beírt kör középpontja (K)',
        value: 'A 3 belső szögfelező metszéspontja; mindhárom oldaltól egyenlő távolságra van',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="18,25 52,25 35,5" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <circle cx="35" cy="18" r="7" fill="none" className="stroke-amber-500 stroke-[1.2]" />
            <circle cx="35" cy="18" r="2" className="fill-amber-700" />
            <text x="38" y="19" className="text-[6px] font-bold fill-amber-900">K</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: 'Háromszög magasságpontja (M)',
        value: 'A csúcsokból a szemközti oldalakra bocsátott 3 merőleges egyenes metszéspontja',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="16,24 54,24 40,6" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="40" y1="6" x2="40" y2="24" className="stroke-indigo-400 stroke-[1.2] stroke-dasharray-[2,2]" />
            <circle cx="40" cy="18" r="2" className="fill-indigo-800" />
            <text x="43" y="19" className="text-[6px] font-bold fill-indigo-900">M</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Háromszög súlypontja (S)',
        value: 'A csúcsokat a szemközti oldalfelező pontokkal összekötő szakaszok metszéspontja (2:1 arány)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="16,24 54,24 35,6" fill="none" className="stroke-emerald-600 stroke-[1.5]" />
            <line x1="35" y1="6" x2="35" y2="24" className="stroke-emerald-400 stroke-[1] stroke-dasharray-[2,2]" />
            <line x1="16" y1="24" x2="44.5" y2="15" className="stroke-emerald-400 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="35" cy="18" r="2.5" className="fill-emerald-800" />
            <text x="38" y="19" className="text-[6px] font-bold fill-emerald-900">S</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Thalész-tétel szerkesztése',
        value: 'Szakasz felezőpontja köré rajzolt kör; a körív pontjai 90°-os szöget látnak',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 A 20 20 0 0 1 55 22" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <line x1="15" y1="22" x2="55" y2="22" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="15" y1="22" x2="25" y2="5" className="stroke-teal-700 stroke-[1.2]" />
            <line x1="25" y1="5" x2="55" y2="22" className="stroke-teal-700 stroke-[1.2]" />
            <circle cx="25" cy="5" r="2" className="fill-teal-800" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Kör érintője egy P pontban',
        value: 'Az érintési ponthoz tartozó sugárra állított merőleges egyenes',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="26" cy="15" r="11" fill="none" className="stroke-rose-500 stroke-[1.5]" />
            <circle cx="37" cy="15" r="2.5" className="fill-rose-700" />
            <line x1="37" y1="2" x2="37" y2="28" className="stroke-rose-600 stroke-[1.8]" />
            <line x1="26" y1="15" x2="37" y2="15" className="stroke-slate-400 stroke-[1] stroke-dasharray-[1.5,1.5]" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Vonszolási teszt és robusztus dinamikus geometriai elvek',
    subtitle: 'Párosítsd a szoftveres viselkedési fogalmakat a megfelelő definícióval!',
    pairs: [
      {
        id: 'p13',
        prompt: 'Robusztus szerkesztés',
        value: 'A szabad csúcsok elmozdításakor is minden definiált geometriai tulajdonság fennmarad',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 55,22 25,6" fill="#06b6d4" fillOpacity="0.2" className="stroke-cyan-600 stroke-[1.5]" />
            <path d="M 23 4 L 19 2 M 27 4 L 31 2" className="stroke-cyan-700 stroke-[1.2]" />
            <text x="28" y="27" className="text-[6px] font-bold fill-cyan-800">Stabil alakzat</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Szemre rajzolt ábra',
        value: 'Nem tartalmaz valódi matematikai relációkat; vonszoláskor az alakzat szétesik',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 58,21 33,5" fill="#f43f5e" fillOpacity="0.1" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
            <line x1="33" y1="5" x2="45" y2="10" className="stroke-rose-600 stroke-[1.5]" />
            <text x="24" y="28" className="text-[6px] font-bold fill-rose-700">Széteső rajz</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Nyomvonal (Trace / Locus)',
        value: 'Megjeleníti a síkban azt az összefüggő pályát/vonalat, amelyet egy mozgó pont leír',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 12 22 Q 35 4 58 22" fill="none" className="stroke-purple-500 stroke-[1.8] stroke-dasharray-[1,2]" />
            <circle cx="35" cy="13" r="3" className="fill-purple-700" />
            <text x="38" y="12" className="text-[6px] font-bold fill-purple-800">P(t)</text>
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Csúszka (Slider) eszköz',
        value: 'Szabadon változtatható numerikus paraméter (hosszúság, szög, nagyítási arány) vezérlésére szolgál',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-slate-300 stroke-[3] stroke-linecap-round" />
            <line x1="15" y1="15" x2="35" y2="15" className="stroke-blue-500 stroke-[3] stroke-linecap-round" />
            <circle cx="35" cy="15" r="4.5" className="fill-blue-600 stroke-white stroke-[1.5]" />
            <text x="30" y="26" className="text-[6px] font-bold fill-slate-700">a = 4.2</text>
          </svg>
        )
      },
      {
        id: 'p17',
        prompt: 'Pályához kötött pont',
        value: 'Egy egyenesen vagy görbén elhelyezett pont, amely csak az adott vonalon mozgatható',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" className="stroke-slate-400 stroke-[1.8]" />
            <circle cx="35" cy="15" r="3.5" className="fill-cyan-600 stroke-cyan-800 stroke-[1]" />
            <path d="M 27 15 L 24 15 M 43 15 L 46 15" className="stroke-cyan-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Geometriai Invariáns',
        value: 'Olyan mennyiség vagy összefüggés, amely a csúcsok tetszőleges mozgatásakor sem változik meg',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="6" width="40" height="18" rx="4" fill="#ecfdf5" className="stroke-emerald-500 stroke-[1.2]" />
            <text x="21" y="17" className="text-[7px] font-bold fill-emerald-800">{"Σα = 180°"}</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometrySoftwareMatcher: React.FC<GeometrySoftwareMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Szerkesztőprogram párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a szoftvereszközöket, mértani helyeket és dinamikus elveket!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId || 'g8-geom-software'}
      topicTitle={topicTitle || 'Használjunk szerkesztőprogramot!'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default GeometrySoftwareMatcher;
