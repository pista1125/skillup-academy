import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TransformationsMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Fixpontok',
    subtitle: 'Párosítsd a transzformációk alapfogalmait és a fixpontok jellemzőit!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Geometriai transzformáció (leképezés)',
        value: 'A sík minden P pontjához egyértelműen hozzárendeli a P\' képpontot',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="18" cy="15" r="3" className="fill-teal-700" />
            <circle cx="52" cy="15" r="3" className="fill-indigo-700" />
            <path d="M 22 12 Q 35 6 48 12" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <polygon points="49,13 43,9 45,16" className="fill-teal-600" />
            <text x="14" y="26" className="text-[7px] font-bold fill-teal-800">P</text>
            <text x="50" y="26" className="text-[7px] font-bold fill-indigo-800">P'</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Fixpont definíciója (P\' = P)',
        value: 'Olyan pont, amelyet a leképezés önmagába visz át (helyben marad)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="4.5" className="fill-emerald-600" />
            <text x="44" y="18" className="text-[7px] font-bold fill-emerald-800">P = P'</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Fixegyenes definíciója',
        value: 'Olyan egyenes, amelynek minden egyes pontja fixpont (pontonként fix)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" className="stroke-teal-600 stroke-[2.5]" />
            <circle cx="25" cy="15" r="2.5" className="fill-teal-800" />
            <circle cx="45" cy="15" r="2.5" className="fill-teal-800" />
            <text x="54" y="11" className="text-[7px] font-bold fill-teal-800">e</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Invariáns egyenes definíciója',
        value: 'Ponthalmazként önmagára képződik (e\' = e), de pontjai elmozdulhatnak rajta',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" className="stroke-purple-600 stroke-[2] stroke-dasharray-2" />
            <path d="M 22 11 L 38 11" stroke="#a855f7" strokeWidth="1.2" />
            <polygon points="40,11 35,9 35,13" fill="#a855f7" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Tengelyes tükrözés fixpontjai',
        value: 'A tükörtengely minden pontja (végtelen sok fixpont van)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="4" x2="35" y2="26" className="stroke-teal-600 stroke-[2]" />
            <circle cx="35" cy="10" r="2.5" className="fill-teal-700" />
            <circle cx="35" cy="20" r="2.5" className="fill-teal-700" />
            <text x="40" y="16" className="text-[7px] font-bold fill-teal-800">t</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Párhuzamos eltolás fixpontjai (v⃗ ≠ 0)',
        value: '0 darab (nem létezik egyetlen fixpont sem, minden pont elmozdul)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="50" y2="15" className="stroke-amber-600 stroke-[2]" />
            <polygon points="55,15 48,11 48,19" fill="#d97706" />
            <text x="25" y="11" className="text-[7px] font-bold fill-amber-700">0 fixpont</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Invariáns Alakzatok Leképezésenként',
    subtitle: 'Párosítsd az egyes transzformációk invariáns egyeneseit és köreit!',
    pairs: [
      {
        id: 'p7',
        prompt: 'Tengelyes tükrözés invariáns egyenesei',
        value: 'Maga a t tükörtengely, valamint a t-re merőleges összes egyenes (e ⊥ t)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="4" x2="35" y2="26" className="stroke-teal-600 stroke-[2]" />
            <line x1="12" y1="15" x2="58" y2="15" className="stroke-purple-600 stroke-[1.8]" />
            <text x="20" y="11" className="text-[7px] font-bold fill-purple-700">⊥</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Középpontos tükrözés fixpontja',
        value: 'Kizárólag az O tükörközéppont (pontosan 1 fixpont van, fixegyenes nincs)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3.5" className="fill-amber-600" />
            <text x="32" y="26" className="text-[7px] font-bold fill-amber-800">O</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: 'Középpontos tükrözés invariáns egyenesei',
        value: 'Az O középponton áthaladó összes egyenes (e ∋ O)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" className="fill-amber-600" />
            <line x1="10" y1="6" x2="60" y2="24" className="stroke-purple-600 stroke-[1.5]" />
            <line x1="10" y1="24" x2="60" y2="6" className="stroke-purple-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Párhuzamos eltolás invariáns egyenesei',
        value: 'Az eltolásvektorral párhuzamos összes egyenes (e ∥ v⃗)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" className="stroke-amber-600 stroke-[1.8]" />
            <line x1="10" y1="20" x2="60" y2="20" className="stroke-purple-600 stroke-[1.8]" />
            <text x="25" y="17" className="text-[7px] font-bold fill-purple-700">∥</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Forgatás (O, α ≠ 180°) invariáns körei',
        value: 'Az O forgásközéppontú koncentrikus körök mindegyike (k(O, r))',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" className="fill-teal-700" />
            <circle cx="35" cy="15" r="9" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <circle cx="35" cy="15" r="13" fill="none" className="stroke-teal-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Identikus transzformáció (helybenhagyás)',
        value: 'A sík minden pontja fixpont, és a sík minden egyenese fixegyenes',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="8" width="40" height="14" rx="4" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
            <text x="22" y="18" className="text-[7px] font-black fill-teal-900">P' = P</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Tulajdonságok, Invariánsok és Tételek',
    subtitle: 'Párosítsd az összetett összefüggéseket és a geometriai invariánsokat!',
    pairs: [
      {
        id: 'p13',
        prompt: 'Indirekt (körüljárást megfordító) leképezés',
        value: 'A tengelyes tükrözés (az egyetlen alapvető egybevágóság, ami megfordítja az orientációt)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="4" x2="35" y2="26" className="stroke-slate-400 stroke-[1.5]" />
            <text x="18" y="19" className="text-[7px] font-bold fill-teal-700">↺</text>
            <text x="46" y="19" className="text-[7px] font-bold fill-indigo-700">↻</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Egybevágósági transzformációk invariánsai',
        value: 'Távolságtartás, szögtartás, egyenestartás, párhuzamosságtartás és területtartás',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="12" y="19" className="text-[8px] font-bold fill-emerald-800">|A\'B\'| = |AB|</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Hasonlóságban NEM invariáns tulajdonságok',
        value: 'A szakaszok abszolút hossza és a terület nagysága (arányosan változnak: λ és λ²)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="8" y="19" className="text-[7px] font-bold fill-rose-700">d\' = λ · d (≠ d)</text>
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Két metsző tengelyre tükrözés egymásutánja',
        value: 'Forgatás a metszéspont körül a tengelyek hajlásszögének kétszeresével (2α)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="20" x2="55" y2="10" className="stroke-teal-600 stroke-[1.5]" />
            <line x1="20" y1="25" x2="50" y2="5" className="stroke-indigo-600 stroke-[1.5]" />
            <text x="56" y="18" className="text-[7px] font-bold fill-purple-700">2α</text>
          </svg>
        )
      },
      {
        id: 'p17',
        prompt: 'Két párhuzamos tengelyre tükrözés egymásutánja',
        value: 'Párhuzamos eltolás a tengelyek távolságának kétszeresével (2d)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="25" y1="5" x2="25" y2="25" className="stroke-teal-600 stroke-[1.5]" />
            <line x1="45" y1="5" x2="45" y2="25" className="stroke-teal-600 stroke-[1.5]" />
            <text x="30" y="18" className="text-[7px] font-bold fill-teal-800">2d</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Fixpont nélküli egybevágóságok a síkon',
        value: 'A nullvektortól különböző párhuzamos eltolás (és a csúsztatva tükrözés)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="8" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="29" y1="9" x2="41" y2="21" stroke="#e11d48" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  }
};

export const TransformationsMatcher: React.FC<TransformationsMatcherProps> = ({
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
      title="Transzformációk párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a fogalmakat, fixpontokat és invariánsokat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId || 'g8-geom-transforms'}
      topicTitle={topicTitle || 'Transzformációk'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default TransformationsMatcher;
