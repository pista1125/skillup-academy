import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LinesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LinesSorter: React.FC<LinesSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: SÍKBELI EGYENESEK VISZONYA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-intersect',
          name: 'Metsző egyenesek (nem 90°)',
          description: 'Pontosan 1 közös metszéspont, a bezárt szög hegyesszög és tompaszög',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-perpendicular',
          name: 'Merőleges egyenesek (⊥)',
          description: 'Pontosan 1 közös metszéspont, a bezárt szög pontosan 90° (derékszög)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-parallel',
          name: 'Párhuzamos egyenesek (∥)',
          description: 'Nincs közös pontjuk a síkban, távolságuk mindenütt állandó',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: 'Két egymást 45°-ban metsző egyenes',
          category: 'cat-intersect',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="26" x2="28" y2="6" stroke="#4f46e5" strokeWidth="2" />
              <line x1="4" y1="16" x2="28" y2="16" stroke="#4f46e5" strokeWidth="2" />
              <circle cx="16" cy="16" r="2" fill="#1e1b4b" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: 'Füzetlap két szomszédos éle (sarka)',
          category: 'cat-perpendicular',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="24" x2="26" y2="24" stroke="#059669" strokeWidth="2" />
              <line x1="8" y1="24" x2="8" y2="6" stroke="#059669" strokeWidth="2" />
              <path d="M 14 24 A 6 6 0 0 0 8 18" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="11" cy="21" r="0.8" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: 'Vasúti sínpár két egyenes sínszála',
          category: 'cat-parallel',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="8" x2="26" y2="8" stroke="#9333ea" strokeWidth="2" />
              <line x1="6" y1="24" x2="26" y2="24" stroke="#9333ea" strokeWidth="2" />
              <line x1="10" y1="8" x2="10" y2="24" stroke="#c084fc" strokeWidth="1" />
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c084fc" strokeWidth="1" />
              <line x1="22" y1="8" x2="22" y2="24" stroke="#c084fc" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: 'Olló kinyitott két szára',
          category: 'cat-intersect',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="8" x2="28" y2="24" stroke="#4f46e5" strokeWidth="2" />
              <line x1="4" y1="24" x2="28" y2="8" stroke="#4f46e5" strokeWidth="2" />
              <circle cx="16" cy="16" r="2" fill="#1e1b4b" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: 'Koordináta-rendszer X és Y tengelye',
          category: 'cat-perpendicular',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="24" x2="28" y2="24" stroke="#059669" strokeWidth="2" />
              <line x1="8" y1="28" x2="8" y2="4" stroke="#059669" strokeWidth="2" />
              <path d="M 14 24 A 6 6 0 0 0 8 18" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="11" cy="21" r="0.8" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: 'Vonalas füzet kék vonalai',
          category: 'cat-parallel',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="8" x2="28" y2="8" stroke="#9333ea" strokeWidth="1.5" />
              <line x1="4" y1="16" x2="28" y2="16" stroke="#9333ea" strokeWidth="1.5" />
              <line x1="4" y1="24" x2="28" y2="24" stroke="#9333ea" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i1-7',
          label: 'X betű két ága',
          category: 'cat-intersect',
          figure: (
            <div className="text-center font-black text-sm text-indigo-700">X</div>
          )
        },
        {
          id: 'i1-8',
          label: 'Szakaszfelező merőleges és a szakasz',
          category: 'cat-perpendicular',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="16" x2="28" y2="16" stroke="#059669" strokeWidth="2" />
              <line x1="16" y1="4" x2="16" y2="28" stroke="#ec4899" strokeWidth="2" />
              <path d="M 21 16 A 5 5 0 0 0 16 11" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="18.5" cy="13.5" r="0.7" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Zebra fehér sávjainak szegélyei',
          category: 'cat-parallel',
          figure: (
            <div className="text-center font-bold text-[9px] text-purple-700">Zebra csíkok</div>
          )
        },
        {
          id: 'i1-10',
          label: 'Két egyenes 60° és 120° szögekkel',
          category: 'cat-intersect',
          figure: (
            <div className="text-center font-bold text-[9px] text-indigo-700">60° és 120°</div>
          )
        },
        {
          id: 'i1-11',
          label: 'Ablakkeret találkozó függőleges és vízszintes lécei',
          category: 'cat-perpendicular',
          figure: (
            <div className="text-center font-bold text-[9px] text-emerald-700">Ablakkeret (90°)</div>
          )
        },
        {
          id: 'i1-12',
          label: 'Létra két függőleges tartószára',
          category: 'cat-parallel',
          figure: (
            <div className="text-center font-bold text-[9px] text-purple-700">Létra szárai</div>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SÍKBAN VAGY CSAK A TÉRBEN?
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-both',
          name: 'Síkban és térben is létezhet',
          description: 'Egysíkú helyzetek: metsző, merőleges, párhuzamos vagy egybeeső',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-space-only',
          name: 'CSAK a 3D térben létezhet',
          description: 'Kitérő egyenesek: nincsenek egy síkban, nem metszik egymást és nem párhuzamosak',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        },
        {
          id: 'cat-impossible',
          name: 'Lehetetlen (sehol sem létezik)',
          description: 'Geometriailag ellentmondásos vagy hibás állítások',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: 'Két párhuzamos egyenes, amelyek nem találkoznak',
          category: 'cat-both',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">e ∥ f</div>
          )
        },
        {
          id: 'i2-2',
          label: 'Két egyenes, amelyek nem metszik egymást és nem is párhuzamosak',
          category: 'cat-space-only',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">Kitérő egyenesek</div>
          )
        },
        {
          id: 'i2-3',
          label: 'Két egyenes, amelyeknek pontosan 2 közös pontjuk van',
          category: 'cat-impossible',
          figure: (
            <div className="text-center font-bold text-[10px] text-rose-700">2 közös pont ✗</div>
          )
        },
        {
          id: 'i2-4',
          label: 'Két egymásra 90°-ban merőleges metsző egyenes',
          category: 'cat-both',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">e ⊥ f (90°)</div>
          )
        },
        {
          id: 'i2-5',
          label: 'Autópálya és a felette átívelő felüljáró egyenesei',
          category: 'cat-space-only',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">Felüljáró modell</div>
          )
        },
        {
          id: 'i2-6',
          label: 'Egy síkban lévő két egyenes, amelyek nem párhuzamosak és nem metszők',
          category: 'cat-impossible',
          figure: (
            <div className="text-center font-bold text-[10px] text-rose-700">Síkban kitérő? ✗</div>
          )
        },
        {
          id: 'i2-7',
          label: 'Két egyenes, amelyek egyetlen pontban metszik egymást',
          category: 'cat-both',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">e ∩ f = {'{P}'}</div>
          )
        },
        {
          id: 'i2-8',
          label: 'Kocka alsó elülső éle és jobb hátsó függőleges éle',
          category: 'cat-space-only',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">Kocka kitérő élei</div>
          )
        },
        {
          id: 'i2-9',
          label: 'Két merőleges egyenes, amelyek párhuzamosak egymással',
          category: 'cat-impossible',
          figure: (
            <div className="text-center font-bold text-[10px] text-rose-700">⊥ és ∥ egyszerre? ✗</div>
          )
        },
        {
          id: 'i2-10',
          label: 'Két egybeeső egyenes végtelen sok közös ponttal',
          category: 'cat-both',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">e = f</div>
          )
        },
        {
          id: 'i2-11',
          label: 'Toronyház függőleges sarka és a mellette futó vízszintes utca',
          category: 'cat-space-only',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">Ház sarka és utca</div>
          )
        },
        {
          id: 'i2-12',
          label: 'Két kitérő egyenes, amely metszi egymást',
          category: 'cat-impossible',
          figure: (
            <div className="text-center font-bold text-[10px] text-rose-700">Metsző kitérő? ✗</div>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÉLEK A KOCKÁN (AB ALSÓ ELÜLSŐ ÉLHEZ KÉPEST)
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-cube-parallel',
          name: 'AB-vel párhuzamos él (∥)',
          description: 'Azonos irányba fut, nem metszi AB-t és egy lapban vagy átlós síkban van vele',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-cube-perp',
          name: 'AB-t merőlegesen metsző él (⊥)',
          description: 'Az A vagy B csúcsban találkozik AB-vel és 90°-os szöget zár be vele',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-cube-skew',
          name: 'AB-hez képest KITÉRŐ él',
          description: 'Nem metszi AB-t, nem párhuzamos vele, nincs vele közös sík',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: 'DC él (hátsó alsó él, vele szemben az alapon)',
          category: 'cat-cube-parallel',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">DC él (alsó lap)</div>
          )
        },
        {
          id: 'i3-2',
          label: 'AD él (alsó bal oldali él az A csúcsból)',
          category: 'cat-cube-perp',
          figure: (
            <div className="text-center font-bold text-[10px] text-blue-700">AD él (A-ból)</div>
          )
        },
        {
          id: 'i3-3',
          label: 'CG él (jobb hátsó függőleges él)',
          category: 'cat-cube-skew',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">CG él (hátsó függőleges)</div>
          )
        },
        {
          id: 'i3-4',
          label: 'EF él (felső elülső él, közvetlenül AB felett)',
          category: 'cat-cube-parallel',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">EF él (elülső lap)</div>
          )
        },
        {
          id: 'i3-5',
          label: 'BC él (alsó jobb oldali él a B csúcsból)',
          category: 'cat-cube-perp',
          figure: (
            <div className="text-center font-bold text-[10px] text-blue-700">BC él (B-ből)</div>
          )
        },
        {
          id: 'i3-6',
          label: 'DH él (bal hátsó függőleges él)',
          category: 'cat-cube-skew',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">DH él (hátsó függőleges)</div>
          )
        },
        {
          id: 'i3-7',
          label: 'HG él (hátsó felső él, legtávolabbi párhuzamos)',
          category: 'cat-cube-parallel',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">HG él (felső lap)</div>
          )
        },
        {
          id: 'i3-8',
          label: 'AE él (bal elülső függőleges él az A-ból)',
          category: 'cat-cube-perp',
          figure: (
            <div className="text-center font-bold text-[10px] text-blue-700">AE él (A-ból fel)</div>
          )
        },
        {
          id: 'i3-9',
          label: 'FG él (felső jobb oldali mélységi él)',
          category: 'cat-cube-skew',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">FG él (felső lap jobb)</div>
          )
        },
        {
          id: 'i3-10',
          label: 'BF él (jobb elülső függőleges él a B-ből)',
          category: 'cat-cube-perp',
          figure: (
            <div className="text-center font-bold text-[10px] text-blue-700">BF él (B-ből fel)</div>
          )
        },
        {
          id: 'i3-11',
          label: 'EH él (felső bal oldali mélységi él)',
          category: 'cat-cube-skew',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">EH él (felső lap bal)</div>
          )
        },
        {
          id: 'i3-12',
          label: 'A kocka 3 másik azonos irányú éle egyike',
          category: 'cat-cube-parallel',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">Párhuzamos csoport</div>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Egyenesek Csoportosító Játék"
      subtitle="Válogasd szét a síkbeli és térbeli egyenespárokat, és találd meg a kocka éleit!"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="indigo"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default LinesSorter;
