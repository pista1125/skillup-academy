import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GeometricConstructionsMatcherProps {
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
    title: '1. Szint: Alapfogalmak és szerkesztési eszközök',
    subtitle: 'Párosítsd a szerkesztési eljárásokat és a klasszikus geometriai fogalmakat!',
    pairs: [
      {
        id: 'gc-m1',
        prompt: 'Klasszikus euklideszi eszközök',
        value: 'Kizárólag körző (körök és távolságátvitel) és beosztás nélküli egyenes vonalzó',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#d97706" strokeWidth="2" />
            <path d="M 25 20 L 35 6 L 45 20" fill="none" stroke="#b45309" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m2',
        prompt: 'Szakasz felosztása 2 : 3 arányban',
        value: '2 + 3 = 5 egyenlő körosztás felmérése a segédfélegyenesre',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="22" x2="60" y2="22" stroke="#0284c7" strokeWidth="2" />
            <line x1="10" y1="22" x2="55" y2="8" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="28" cy="16.5" r="2" fill="#10b981" />
            <circle cx="55" cy="8" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'gc-m3',
        prompt: 'Negyedik arányos szakasz',
        value: 'Az az x szakasz, amelyre a : b = c : x teljesül, azaz x = (b · c) / a',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">a : b = c : x</text>
          </svg>
        )
      },
      {
        id: 'gc-m4',
        prompt: 'Harmadik arányos szakasz',
        value: 'Az az x szakasz, amelyre a : b = b : x teljesül, azaz x = b² / a',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">x = b² / a</text>
          </svg>
        )
      },
      {
        id: 'gc-m5',
        prompt: 'Szakaszfelező merőleges',
        value: 'A két végpontból húzott azonos sugarú körívek metszéspontjait összekötő egyenes',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="4" x2="35" y2="26" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m6',
        prompt: 'Segédfélegyenes szöge',
        value: 'Tetszőleges hegyesszög (az arány a párhuzamosok miatt független a szögtől)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 55 22 M 15 22 L 50 8" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <text x="32" y="18" className="text-[6px] font-bold fill-slate-500">tetszőleges</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Aránypárok és elméleti tételek',
    subtitle: 'Párosítsd az arányossági tételeket a hozzájuk kapcsolódó szerkesztési lépésekkel!',
    pairs: [
      {
        id: 'gc-m7',
        prompt: 'Párhuzamos szelők tételének szerepe',
        value: 'Biztosítja, hogy a segédfélegyenes osztása és a szakaszon kapott osztás aránya megegyezzen',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="6" stroke="#64748b" strokeWidth="1" />
            <line x1="10" y1="20" x2="60" y2="25" stroke="#64748b" strokeWidth="1" />
            <line x1="30" y1="14" x2="30" y2="22" stroke="#10b981" strokeWidth="1.5" />
            <line x1="50" y1="9" x2="50" y2="24" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m8',
        prompt: 'Szakasz felosztása 3 egyenlő részre',
        value: '3 darab egyenlő körosztást mérünk fel, majd a 3. pontot kötjük B-vel és párhuzamosokat húzunk',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="26.6" cy="20" r="2" fill="#10b981" />
            <circle cx="43.3" cy="20" r="2" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'gc-m9',
        prompt: 'Szakasz négyzetének szerkesztése',
        value: 'Harmadik arányos szerkesztése x = b² hosszal, ha az alapegység a = 1',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">1 : b = b : b²</text>
          </svg>
        )
      },
      {
        id: 'gc-m10',
        prompt: 'Aranymetszés aránya (Φ)',
        value: 'A kisebb rész úgy aránylik a nagyobbhoz, mint a nagyobb az egészhez (Φ ≈ 1,618)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="41" y2="15" stroke="#d97706" strokeWidth="2" />
            <line x1="41" y1="15" x2="60" y2="15" stroke="#f59e0b" strokeWidth="2" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-amber-800">Φ ≈ 1,618</text>
          </svg>
        )
      },
      {
        id: 'gc-m11',
        prompt: 'Párhuzamos egyenes húzása',
        value: 'Megszerkeszthető szögmásolással vagy segédvonalas szelőmódszerrel',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="10" y1="22" x2="60" y2="22" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m12',
        prompt: 'Nagyítás λ = 2 aránnyal az A csúcsból',
        value: 'Az AB és AC szakaszok hosszát kétszeresükre mérjük fel az AB és AC félegyenesekre',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 30,22 22.5,12" fill="none" stroke="#2563eb" strokeWidth="1" />
            <polygon points="15,22 45,22 30,2" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és méretarányos szerkesztések',
    subtitle: 'Párosítsd a haladóbb szerkesztési feladatokat a helyes megoldási elvvel!',
    pairs: [
      {
        id: 'gc-m13',
        prompt: 'Háromszög szerkesztése szögekből és kerületből',
        value: 'Segédháromszöget szerkesztünk a szögekkel, majd a valódi kerületet az oldalak arányában osztjuk fel',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 20,10" fill="none" stroke="#0284c7" strokeWidth="1" />
            <polygon points="36,26 62,26 49,6" fill="none" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m14',
        prompt: 'Szabályos ötszög átlói',
        value: 'Minden átló aranymetszés arányában osztja a másikat, pentagrammát alkotva',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="35,4 62,14 52,26 18,26 8,14" fill="none" stroke="#d97706" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'gc-m15',
        prompt: 'Mértani közép szerkesztése: m = √(p·q)',
        value: 'Thálész-tételes félkörrel és a derékszögű háromszög magasságtételével szerkeszthető',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 12 24 A 23 23 0 0 1 58 24" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="12" y1="24" x2="58" y2="24" stroke="#64748b" strokeWidth="1" />
            <line x1="28" y1="24" x2="28" y2="6" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m16',
        prompt: 'Háromszög súlypontjának szerkesztése',
        value: 'Az oldalfelező merőlegesek helyett az oldalfelező pontokat a szemközti csúcsokkal kötjük össze',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,26 58,26 35,4" fill="none" stroke="#64748b" strokeWidth="1" />
            <circle cx="35" cy="18.6" r="2" fill="#ef4444" />
          </svg>
        )
      },
      {
        id: 'gc-m17',
        prompt: 'Középvonal tulajdonsága',
        value: 'Párhuzamos a harmadik oldallal és feleakkora hosszúságú annál',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,26 55,26 35,6" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="25" y1="16" x2="45" y2="16" stroke="#2563eb" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-m18',
        prompt: 'Kétszeres területű hasonló háromszög',
        value: 'Oldalait nem kétszeresére, hanem √2 ≈ 1,414-szeresére kell növelni (négyzetes arány)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">k = √2</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometricConstructionsMatcher: React.FC<GeometricConstructionsMatcherProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-geom-constructions',
  topicTitle = 'Szerkesztések'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Szerkesztések Párosító"
      subtitle="Kapcsold össze a szerkesztési eljárásokat és geometriai összefüggéseket!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-constructions-matcher"
    />
  );
};

export default GeometricConstructionsMatcher;
