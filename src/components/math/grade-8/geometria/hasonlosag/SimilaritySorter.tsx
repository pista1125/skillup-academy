import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SimilaritySorterProps {
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
    title: '1. Szint: Hasonlóság Típusa a k Arány Szerint',
    subtitle: 'Sorold be az alakzatpárokat és transzformációkat a hasonlósági arány (k) alapján!',
    categories: [
      {
        id: 'cat-enlarge',
        name: 'Nagyítás (k > 1)',
        description: 'A kép minden szakasza hosszabb, kerülete és területe nagyobb az eredetinél',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-congruent',
        name: 'Egybevágóság (k = 1)',
        description: 'Távolságtartó leképezés: minden szakasz és a terület is változatlan marad',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-reduce',
        name: 'Kicsinyítés (0 < k < 1)',
        description: 'A kép minden szakasza rövidebb, kerülete és területe kisebb az eredetinél',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Háromszög minden oldalának megkétszerezése (k = 2)',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 24,24 18,12" fill="#dbeafe" className="stroke-blue-600 stroke-[1]" />
            <polygon points="34,26 62,26 48,4" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Fénykép 200%-os nagyítása fali poszterré',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="14" y="14" width="12" height="10" rx="1" fill="#dbeafe" className="stroke-blue-500 stroke-[1]" />
            <rect x="36" y="6" width="24" height="20" rx="2" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Egy a = 3 cm-es négyzetből a\' = 6 cm-es négyzet készítése',
        category: 'cat-enlarge',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="14" width="12" height="12" fill="#dbeafe" className="stroke-blue-500 stroke-[1]" />
            <rect x="38" y="4" width="24" height="24" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Alakzat tengelyes tükrözése egyenesre',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="3" x2="35" y2="27" className="stroke-slate-400 stroke-[1.2]" />
            <polygon points="18,22 30,22 24,10" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <polygon points="52,22 40,22 46,10" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Alakzat eltolása vektorral vagy elforgatása 90°-kal',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,24 28,24 21,10" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <polygon points="42,24 56,24 49,10" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <line x1="28" y1="17" x2="38" y2="17" className="stroke-emerald-700 stroke-[1.2]" />
            <polygon points="40,17 36,15 36,19" className="fill-emerald-700" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Középpontos tükrözés egy pontra (180°-os forgatás)',
        category: 'cat-congruent',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" className="fill-slate-700" />
            <polygon points="15,22 27,22 21,12" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <polygon points="55,8 43,8 49,18" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Turistatérkép készítése 1 : 25 000 méretarányban',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="20" y="6" width="30" height="18" rx="2" fill="#e0e7ff" className="stroke-indigo-500 stroke-[1.2]" />
            <text x="23" y="17" className="text-[6px] font-bold fill-indigo-900">1 : 25 000</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Háromszög középvonalai által levágott csúcsháromszög (k = 0.5)',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,26 56,26 35,6" fill="none" className="stroke-indigo-400 stroke-[1]" />
            <polygon points="24.5,16 45.5,16 35,6" fill="#c7d2fe" className="stroke-indigo-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Egy autó 1 : 43 méretarányú fém makettje',
        category: 'cat-reduce',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="10" width="40" height="12" rx="3" fill="#e0e7ff" className="stroke-indigo-600 stroke-[1.2]" />
            <text x="24" y="18" className="text-[6px] font-bold fill-indigo-800">M 1 : 43</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Háromszögek Hasonlóságának Alapesetei',
    subtitle: 'Csoportosítsd a feladatokat és feltételeket a megfelelő hasonlósági alapesethez!',
    categories: [
      {
        id: 'cat-angles',
        name: 'Két szög egyenlő (sz-sz)',
        description: 'Két-két megfelelő szög megegyezik (a 180°-os összeg miatt a harmadik is azonos)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-sides',
        name: 'Három oldal aránya (o-o-o)',
        description: 'Mindhárom oldalpár aránya egyenlő: a\'/a = b\'/b = c\'/c = k',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-mixed',
        name: 'Két oldal aránya és közbezárt szög (o-sz-o)',
        description: 'Két-két oldal aránya k, és a köztük lévő belső szög pontosan egyenlő',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's10',
        label: 'Két derékszögű háromszög, mindkettőben van 35°-os hegyesszög',
        category: 'cat-angles',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 12,12" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <polygon points="36,25 60,25 36,7" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <text x="20" y="22" className="text-[5px] font-bold fill-teal-800">35°</text>
            <text x="48" y="23" className="text-[5px] font-bold fill-teal-800">35°</text>
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Bármely két szabályos háromszög (szögeik: 60°, 60°, 60°)',
        category: 'cat-angles',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,24 28,24 21,12" fill="#ccfbf1" className="stroke-teal-600 stroke-[1.2]" />
            <polygon points="38,26 62,26 50,5" fill="#ccfbf1" className="stroke-teal-600 stroke-[1.5]" />
            <text x="47" y="22" className="text-[5px] font-bold fill-teal-900">60°</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Két egyenlő szárú háromszög, amelyek szárszöge egyaránt 50°',
        category: 'cat-angles',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 20,8" fill="none" className="stroke-teal-600 stroke-[1.2]" />
            <polygon points="38,25 62,25 50,5" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <text x="18" y="13" className="text-[5px] font-bold fill-teal-800">50°</text>
            <text x="48" y="11" className="text-[5px] font-bold fill-teal-800">50°</text>
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Oldalak: 3, 4, 5 cm és 9, 12, 15 cm (minden oldal 3-szorosa)',
        category: 'cat-sides',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 12,12" fill="#dbeafe" className="stroke-blue-600 stroke-[1.2]" />
            <polygon points="36,26 62,26 36,6" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
            <text x="46" y="20" className="text-[5px] font-bold fill-blue-900">k = 3</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Oldalak: 6, 8, 10 cm és 3, 4, 5 cm (minden oldal a fele)',
        category: 'cat-sides',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,26 36,26 12,8" fill="#dbeafe" className="stroke-blue-600 stroke-[1.5]" />
            <polygon points="46,24 62,24 46,12" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.2]" />
            <text x="20" y="20" className="text-[5px] font-bold fill-blue-900">k = 0.5</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Oldalak: 5, 5, 8 cm és 15, 15, 24 cm (arányuk páronként 3)',
        category: 'cat-sides',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 30,24 21,10" fill="#dbeafe" className="stroke-blue-600 stroke-[1.2]" />
            <polygon points="38,26 64,26 51,6" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's16',
        label: 'a = 4 cm, b = 6 cm, γ = 40° és a\' = 8 cm, b\' = 12 cm, γ\' = 40°',
        category: 'cat-mixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 30,24 20,10" fill="none" className="stroke-purple-600 stroke-[1.2]" />
            <polygon points="38,26 64,26 50,5" fill="none" className="stroke-purple-600 stroke-[1.5]" />
            <text x="21" y="14" className="text-[5px] font-bold fill-purple-800">40°</text>
            <text x="51" y="11" className="text-[5px] font-bold fill-purple-800">40°</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Befogók: 3 cm és 4 cm (derékszög), valamint 6 cm és 8 cm (derékszög)',
        category: 'cat-mixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 12,12" fill="none" className="stroke-purple-600 stroke-[1.2]" />
            <polygon points="38,26 62,26 38,8" fill="none" className="stroke-purple-600 stroke-[1.5]" />
            <path d="M 12 20 L 16 20 L 16 24" fill="none" className="stroke-purple-700 stroke-[1]" />
            <path d="M 38 21 L 43 21 L 43 26" fill="none" className="stroke-purple-700 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Két-két oldal aránya k = 2.5 és a közbezárt tompaszög mindkettőben 110°',
        category: 'cat-mixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 32,24 18,12" fill="none" className="stroke-purple-600 stroke-[1.2]" />
            <polygon points="38,26 65,26 48,8" fill="none" className="stroke-purple-600 stroke-[1.5]" />
            <text x="20" y="16" className="text-[5px] font-bold fill-purple-800">110°</text>
            <text x="50" y="13" className="text-[5px] font-bold fill-purple-800">110°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Mennyiségek Változása Hasonlóságnál',
    subtitle: 'Sorold be a geometriai mennyiségeket a k-szorzóval való összefüggésük szerint!',
    categories: [
      {
        id: 'cat-invariant',
        name: 'Változatlan marad (1-szeres)',
        description: 'Értéke független a k hasonlósági aránytól, szigorúan konstans',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-linear',
        name: 'k-szorosára változik (Lineáris)',
        description: 'Egydimenziós hosszméretek és szakaszösszegek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-squared',
        name: 'k²-szeresére változik (Négyzetes)',
        description: 'Kétdimenziós síkbeli méretek, területek',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's19',
        label: 'A háromszög belső szögeinek nagysága (α, β, γ)',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,24 55,24 35,6" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <text x="25" y="21" className="text-[6px] font-bold fill-emerald-800">α' = α</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Két belső oldal által bezárt szög',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 20 22 L 50 22 M 20 22 L 40 8" className="stroke-emerald-600 stroke-[1.5]" />
            <text x="28" y="18" className="text-[6px] font-bold fill-emerald-800">γ</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Bármely háromszög belső szögeinek összege (180°)',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#ecfdf5" className="stroke-emerald-500 stroke-[1.2]" />
            <text x="20" y="17" className="text-[7px] font-bold fill-emerald-900">Σ = 180°</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'A háromszög megfelelő oldalainak hossza (a, b, c)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="18" x2="58" y2="18" className="stroke-blue-600 stroke-[2]" />
            <text x="25" y="13" className="text-[7px] font-bold fill-blue-800">a' = k · a</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'A háromszög vagy sokszög kerülete (K = a + b + c)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#eff6ff" className="stroke-blue-400 stroke-[1.2]" />
            <text x="20" y="17" className="text-[7px] font-bold fill-blue-900">K' = k · K</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Az oldalhoz tartozó magasságvonal hossza (m)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="5" x2="35" y2="25" className="stroke-blue-600 stroke-[1.5] stroke-dasharray-[2,2]" />
            <text x="38" y="16" className="text-[6px] font-bold fill-blue-800">m' = k·m</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'A háromszög területe (T = a · m_a / 2)',
        category: 'cat-squared',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#ffe4e6" className="stroke-rose-400 stroke-[1.2]" />
            <text x="20" y="17" className="text-[7px] font-bold fill-rose-800">T' = k² · T</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'A beírt vagy körülírt kör lapjának területe',
        category: 'cat-squared',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="10" fill="#ffe4e6" className="stroke-rose-500 stroke-[1.2]" />
            <text x="28" y="17" className="text-[6px] font-bold fill-rose-900">k²·r²·π</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Bármely síkidom felületének nagysága',
        category: 'cat-squared',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="20,24 50,24 45,8 25,8" fill="#ffe4e6" className="stroke-rose-500 stroke-[1.2]" />
            <text x="30" y="18" className="text-[6px] font-bold fill-rose-900">k²-szeres</text>
          </svg>
        )
      }
    ]
  }
};

export const SimilaritySorter: React.FC<SimilaritySorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Hasonlóság csoportosító játék"
      subtitle="Kategorizáld a transzformációkat, alapeseteket és geometriai mennyiségeket!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g8-geom-similarity'}
      topicTitle={topicTitle || 'Hasonlóság'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default SimilaritySorter;
