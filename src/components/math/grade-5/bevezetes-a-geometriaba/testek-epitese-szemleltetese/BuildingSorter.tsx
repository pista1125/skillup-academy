import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface BuildingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const BuildingSorter: React.FC<BuildingSorterProps> = ({
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
    // 1. SZINT: KOCKAHÁLÓ vs. NEM KOCKAHÁLÓ
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-valid-net',
          name: 'Szabályos kockaháló',
          description: '6 négyzetből áll és tökéletes kockává hajtogatható össze',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-invalid-net',
          name: 'Hibás 6 négyzetes forma',
          description: '6 négyzetből áll, de átfedés vagy ütközés miatt NEM hajtogatható kockává',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-wrong-count',
          name: 'Nem 6 négyzetből áll',
          description: 'Kevesebb (pl. 4, 5) vagy több (pl. 7, 8) négyzetből áll',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: 'Kereszt alakú háló (1-4-1)',
          category: 'cat-valid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="12" y="2" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="4" y="11" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="12" y="11" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="20" y="11" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="20" y="20" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="12" y="20" width="8" height="8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: '2×2-es tömb 2 füllel',
          category: 'cat-invalid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="12" y="8" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="4" y="16" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="12" y="16" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="20" y="8" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="20" y="16" width="8" height="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: '5 négyzetből álló kereszt (1 lap hiányzik)',
          category: 'cat-wrong-count',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="12" y="4" width="8" height="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <rect x="4" y="12" width="8" height="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <rect x="12" y="12" width="8" height="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <rect x="20" y="12" width="8" height="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <rect x="12" y="20" width="8" height="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: 'T-alakú háló (1-4-1)',
          category: 'cat-valid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="2" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="2" y="10" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="8" y="10" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="14" y="10" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="20" y="10" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="8" y="18" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: '6 négyzet egyetlen egyenes sorban',
          category: 'cat-invalid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="7" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="12" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="17" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="22" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="27" y="13" width="4.5" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: '7 négyzetből álló alakzat',
          category: 'cat-wrong-count',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">7 négyzet</div>
          )
        },
        {
          id: 'i1-7',
          label: 'Lépcsős háló (1-3-2)',
          category: 'cat-valid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="3" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="2" y="11" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="8" y="11" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="14" y="11" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="14" y="19" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="20" y="19" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-8',
          label: 'Két szárny ugyanazon az oldalon (átfedés)',
          category: 'cat-invalid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="3" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="14" y="3" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="2" y="12" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="8" y="12" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="14" y="12" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <rect x="20" y="12" width="6" height="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Z-alakú háló (2-2-2)',
          category: 'cat-valid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="3" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="10" y="3" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="10" y="11" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="17" y="11" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="17" y="19" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <rect x="24" y="19" width="6" height="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i1-10',
          label: '5 négyzet egyenes sávban és 1 fül',
          category: 'cat-invalid-net',
          figure: (
            <div className="text-center font-bold text-[9px] text-rose-700">5-ös sáv + 1 fül</div>
          )
        },
        {
          id: 'i1-11',
          label: '4 négyzetből álló nyitott cső',
          category: 'cat-wrong-count',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">4 négyzet</div>
          )
        },
        {
          id: 'i1-12',
          label: '8 négyzetből álló kettős kereszt',
          category: 'cat-wrong-count',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">8 négyzet</div>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: VETÜLETI NÉZETEK JELLEMZŐI
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-front',
          name: 'Elölnézet',
          description: 'Szemből nézve (oszlopok max. magassága balról jobbra)',
          badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800'
        },
        {
          id: 'cat-top',
          name: 'Felülnézet',
          description: 'Fentről lefelé nézve (mely mezők foglaltak a talajon)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-side',
          name: 'Jobb oldalnézet',
          description: 'Jobbról nézve (sorok max. magassága: balra az eleje, jobbra a hátulja)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: 'Oszloponként a maximális magasságot látjuk szemből',
          category: 'cat-front',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">max(h) szemből</div>
          )
        },
        {
          id: 'i2-2',
          label: 'Megmutatja, mely helyeken van legalább 1 kocka a talajon',
          category: 'cat-top',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">h &gt; 0 mezők</div>
          )
        },
        {
          id: 'i2-3',
          label: 'A test elülső sora a bal oldalon látszik',
          category: 'cat-side',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">Balra az eleje</div>
          )
        },
        {
          id: 'i2-4',
          label: 'A hátsó alacsonyabb kockák takarásba kerülnek az elülsők mögött',
          category: 'cat-front',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">Takarás szemből</div>
          )
        },
        {
          id: 'i2-5',
          label: 'Számozás nélkül ez a test alaprajzi kontúrja',
          category: 'cat-top',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">Alaprajzi kontúr</div>
          )
        },
        {
          id: 'i2-6',
          label: 'A sorok maximális magasságát látjuk oldalirányból',
          category: 'cat-side',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">max(sor) oldalról</div>
          )
        },
        {
          id: 'i2-7',
          label: 'Oszlopainak száma megegyezik az alaprajz oszlopszámával',
          category: 'cat-front',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">Oszlopok száma</div>
          )
        },
        {
          id: 'i2-8',
          label: 'Nem mutatja meg közvetlenül a kockák emeleteinek számát',
          category: 'cat-top',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">Nincs magasság</div>
          )
        },
        {
          id: 'i2-9',
          label: 'A hátsó sor a jobb oldalon látszik a rajzon',
          category: 'cat-side',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">Jobbra a hátulja</div>
          )
        },
        {
          id: 'i2-10',
          label: 'Szemből nézve egyforma magasnak látszik két különböző oszlop',
          category: 'cat-front',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">Azonos vetület</div>
          )
        },
        {
          id: 'i2-11',
          label: 'Madártávlati nézet a testre',
          category: 'cat-top',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">Madártávlat</div>
          )
        },
        {
          id: 'i2-12',
          label: 'Oszlopainak száma megegyezik az alaprajz sorainak számával',
          category: 'cat-side',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">Sorok száma</div>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GEOMETRIAI TESTEK HÁLÓI
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-cube-net',
          name: 'Kocka hálója',
          description: '6 darab egybevágó négyzetlapból áll',
          badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800'
        },
        {
          id: 'cat-box-net',
          name: 'Téglatest hálója',
          description: '6 téglalap alkotja, 3 különböző méretű téglalappárral',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        },
        {
          id: 'cat-pyramid-net',
          name: 'Négyzetes gúla hálója',
          description: '1 négyzet alaplap és 4 háromszög palást (csillag forma)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-cylinder-net',
          name: 'Henger vagy Prizma hálója',
          description: 'Körlapok vagy háromszög lapok + téglalap palást',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: '6 egyforma négyzetlapból áll',
          category: 'cat-cube-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-2',
          label: 'Cipősdoboz kiterített papírmintája',
          category: 'cat-box-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="9" width="24" height="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'i3-3',
          label: '1 négyzet alap és 4 háromszög (piramis forma)',
          category: 'cat-pyramid-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="10" width="12" height="12" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <polygon points="16,2 10,10 22,10" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i3-4',
          label: '1 téglalap palást és 2 körlap',
          category: 'cat-cylinder-net',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="10" width="20" height="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
              <circle cx="16" cy="5" r="4" fill="#99f6e4" stroke="#0d9488" strokeWidth="1" />
              <circle cx="16" cy="27" r="4" fill="#99f6e4" stroke="#0d9488" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'i3-5',
          label: 'Forgatások nélkül pontosan 11 különböző hálója létezik',
          category: 'cat-cube-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">11 háló</div>
          )
        },
        {
          id: 'i3-6',
          label: '6 darab téglalap, 3 pár egybevágó lap',
          category: 'cat-box-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">3 téglalappár</div>
          )
        },
        {
          id: 'i3-7',
          label: 'Összesen 5 lap határolja (1 négyzet + 4 háromszög)',
          category: 'cat-pyramid-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">5 lap összesen</div>
          )
        },
        {
          id: 'i3-8',
          label: 'Konzervdoboz lefejtett papírcímkéje és 2 teteje',
          category: 'cat-cylinder-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-teal-700">Konzerv címke</div>
          )
        },
        {
          id: 'i3-9',
          label: 'Dobókocka kiterített hálója',
          category: 'cat-cube-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-pink-700">Dobókocka</div>
          )
        },
        {
          id: 'i3-10',
          label: 'Tégla vagy könyv síkbeli kiterítése',
          category: 'cat-box-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-orange-700">Tégla alak</div>
          )
        },
        {
          id: 'i3-11',
          label: 'Kemping sátor kiterített hálója (csúcsban összefutó lapok)',
          category: 'cat-pyramid-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-amber-700">Sátor háló</div>
          )
        },
        {
          id: 'i3-12',
          label: '3 téglalap palást és 2 háromszög alap (3 oldalú prizma)',
          category: 'cat-cylinder-net',
          figure: (
            <div className="text-center font-bold text-[10px] text-teal-700">3 téglalap + 2 háromszög</div>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Testek és Hálók Csoportosító Játék"
      subtitle="Válogasd szét a kockahálókat, vetületi nézeteket és geometriai testeket!"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="pink"
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

export default BuildingSorter;
