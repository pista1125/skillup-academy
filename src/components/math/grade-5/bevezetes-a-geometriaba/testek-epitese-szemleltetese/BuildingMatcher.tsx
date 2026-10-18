import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface BuildingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const BuildingMatcher: React.FC<BuildingMatcherProps> = ({
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

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: KOCKAÉPÍTMÉNYEK ÉS ALAPRAJZOK
    // ========================================================
    1: {
      title: '1. Szint: Kockaépítmények és alaprajzok',
      subtitle: 'Párosítsd az építményeket a számozott alaprajzukkal és kockaszámukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 db kocka',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 27,10 16,16 5,10" fill="#fce7f3" stroke="#9d174d" strokeWidth="1.2" />
              <polygon points="5,10 16,16 16,28 5,22" fill="#f472b6" stroke="#9d174d" strokeWidth="1.2" />
              <polygon points="16,16 27,10 27,22 16,28" fill="#db2777" stroke="#9d174d" strokeWidth="1.2" />
            </svg>
          ),
          value: 'Alaprajz: 1 darab 1-es négyzet (Összesen: 1 kocka)'
        },
        {
          id: 'p1-2',
          prompt: '3 kockás L-alakzat (2 magas oszlop + 1 mellette)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <rect x="6" y="8" width="12" height="12" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
              <rect x="20" y="8" width="12" height="12" fill="#fce7f3" stroke="#be185d" strokeWidth="1.5" />
              <text x="12" y="17" textAnchor="middle" className="text-[10px] font-black fill-pink-900">2</text>
              <text x="26" y="17" textAnchor="middle" className="text-[10px] font-black fill-pink-900">1</text>
            </svg>
          ),
          value: 'Alaprajz számai: [2, 1] → Összesen 2 + 1 = 3 kocka'
        },
        {
          id: 'p1-3',
          prompt: '4 kockás lapos négyzet (2×2-es talajon)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="11" height="11" fill="#fce7f3" stroke="#be185d" strokeWidth="1.2" />
              <rect x="17" y="4" width="11" height="11" fill="#fce7f3" stroke="#be185d" strokeWidth="1.2" />
              <rect x="4" y="17" width="11" height="11" fill="#fce7f3" stroke="#be185d" strokeWidth="1.2" />
              <rect x="17" y="17" width="11" height="11" fill="#fce7f3" stroke="#be185d" strokeWidth="1.2" />
              <text x="9.5" y="12.5" textAnchor="middle" className="text-[8px] font-black fill-pink-900">1</text>
              <text x="22.5" y="12.5" textAnchor="middle" className="text-[8px] font-black fill-pink-900">1</text>
              <text x="9.5" y="25.5" textAnchor="middle" className="text-[8px] font-black fill-pink-900">1</text>
              <text x="22.5" y="25.5" textAnchor="middle" className="text-[8px] font-black fill-pink-900">1</text>
            </svg>
          ),
          value: 'Alaprajz: 4 db 1-es mező → Összesen 1 + 1 + 1 + 1 = 4 kocka'
        },
        {
          id: 'p1-4',
          prompt: 'Lépcsős építmény (3, 2, 1 oszlopok)',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 48 32" fill="none">
              <rect x="4" y="8" width="12" height="14" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.2" />
              <rect x="18" y="8" width="12" height="14" fill="#fce7f3" stroke="#be185d" strokeWidth="1.2" />
              <rect x="32" y="8" width="12" height="14" fill="#fdf2f8" stroke="#be185d" strokeWidth="1.2" />
              <text x="10" y="19" textAnchor="middle" className="text-[10px] font-black fill-pink-900">3</text>
              <text x="24" y="19" textAnchor="middle" className="text-[10px] font-black fill-pink-900">2</text>
              <text x="38" y="19" textAnchor="middle" className="text-[10px] font-black fill-pink-900">1</text>
            </svg>
          ),
          value: 'Alaprajz: [3, 2, 1] → Összesen 3 + 2 + 1 = 6 kocka'
        },
        {
          id: 'p1-5',
          prompt: 'Tömör 2×2×2-es nagy kocka',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="11" height="11" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
              <rect x="17" y="4" width="11" height="11" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
              <rect x="4" y="17" width="11" height="11" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
              <rect x="17" y="17" width="11" height="11" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
              <text x="9.5" y="12.5" textAnchor="middle" className="text-[8px] font-black fill-white">2</text>
              <text x="22.5" y="12.5" textAnchor="middle" className="text-[8px] font-black fill-white">2</text>
              <text x="9.5" y="25.5" textAnchor="middle" className="text-[8px] font-black fill-white">2</text>
              <text x="22.5" y="25.5" textAnchor="middle" className="text-[8px] font-black fill-white">2</text>
            </svg>
          ),
          value: 'Alaprajz: 4 db 2-es mező → Összesen 2 · 2 · 2 = 8 kocka'
        },
        {
          id: 'p1-6',
          prompt: 'Számozott alaprajz szabálya',
          promptFigure: (
            <div className="text-center font-black text-xs text-pink-700 dark:text-pink-300">
              Σ számok = Összes kocka
            </div>
          ),
          value: 'Az alaprajz négyzeteiben lévő számok összege adja a kockák teljes számát'
        },
        {
          id: 'p1-7',
          prompt: 'Alátámasztási szabály (rejtett kockák)',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-slate-700 dark:text-slate-300">
              3. szint → Alatta 2 kocka
            </div>
          ),
          value: 'Egy felső szinten álló kocka alatt mindig lennie kell alátámasztó kockáknak'
        },
        {
          id: 'p1-8',
          prompt: 'Kocka hozzáadása az alaprajzhoz',
          promptFigure: (
            <div className="text-center font-black text-xs text-emerald-700 dark:text-emerald-300">
              +1 kocka → n + 1
            </div>
          ),
          value: 'Ha rátolsz egy kockát az oszlopra, az alaprajz száma 1-gyel növekszik'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: NÉZETEK ÉS VETÜLETEK
    // ========================================================
    2: {
      title: '2. Szint: Nézetek és vetületek',
      subtitle: 'Párosítsd a nézetfajtákat a leírásukkal és szabályaikkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Elölnézet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="8" width="9" height="20" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
              <rect x="17" y="16" width="9" height="12" fill="#f472b6" stroke="#831843" strokeWidth="1.2" />
            </svg>
          ),
          value: 'Szemből nézve: az oszlopok maximális magasságát látjuk'
        },
        {
          id: 'p2-2',
          prompt: 'Felülnézet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="9" height="9" fill="#818cf8" stroke="#312e81" strokeWidth="1.2" />
              <rect x="17" y="6" width="9" height="9" fill="#818cf8" stroke="#312e81" strokeWidth="1.2" />
              <rect x="6" y="17" width="9" height="9" fill="#818cf8" stroke="#312e81" strokeWidth="1.2" />
            </svg>
          ),
          value: 'Fentről lefelé nézve: megmutatja, mely mezőkön van legalább 1 kocka'
        },
        {
          id: 'p2-3',
          prompt: 'Jobb oldalnézet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="16" width="9" height="12" fill="#fbbf24" stroke="#78350f" strokeWidth="1.2" />
              <rect x="17" y="8" width="9" height="20" fill="#fbbf24" stroke="#78350f" strokeWidth="1.2" />
            </svg>
          ),
          value: 'Jobbról nézve: a test eleje a bal kezünk felé, hátulja jobbra esik'
        },
        {
          id: 'p2-4',
          prompt: 'Takarási szabály',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-indigo-700 dark:text-indigo-300">
              max(h1, h2) látszik
            </div>
          ),
          value: 'Az egymás mögött álló kockák közül a magasabb eltakarja az alacsonyabbat'
        },
        {
          id: 'p2-5',
          prompt: 'Lépcsős test elölnézete (1, 2, 3)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 36 30" fill="none">
              <rect x="4" y="20" width="8" height="8" fill="#f472b6" stroke="#831843" strokeWidth="1" />
              <rect x="14" y="12" width="8" height="16" fill="#f472b6" stroke="#831843" strokeWidth="1" />
              <rect x="24" y="4" width="8" height="24" fill="#f472b6" stroke="#831843" strokeWidth="1" />
            </svg>
          ),
          value: 'Balról jobbra növekvő oszlopok: 1 kocka, 2 kocka, 3 kocka magas'
        },
        {
          id: 'p2-6',
          prompt: 'Szimmetrikus építmény nézete',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 36 30" fill="none">
              <rect x="4" y="16" width="8" height="12" fill="#f472b6" stroke="#831843" strokeWidth="1" />
              <rect x="14" y="6" width="8" height="22" fill="#f472b6" stroke="#831843" strokeWidth="1" />
              <rect x="24" y="16" width="8" height="12" fill="#f472b6" stroke="#831843" strokeWidth="1" />
            </svg>
          ),
          value: 'Középen a legmagasabb (torony), két szélén egyforma alacsonyabb szárnyak'
        },
        {
          id: 'p2-7',
          prompt: '1 oszlopos test felülnézete',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="10" width="12" height="12" fill="#818cf8" stroke="#312e81" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Bármilyen magas az oszlop (1, 2 vagy 3 kocka), felülről pontosan 1 négyzet látszik'
        },
        {
          id: 'p2-8',
          prompt: 'Áthelyezési szabály',
          promptFigure: (
            <div className="text-center font-black text-[10px] text-pink-700 dark:text-pink-300">
              Kocka áthelyezése
            </div>
          ),
          value: 'Ha egy kockát meglévő oszlopról meglévő oszlopra teszünk, a felülnézet nem változik'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KOCKAHÁLÓK ÉS TESTEK KITERÍTÉSE
    // ========================================================
    3: {
      title: '3. Szint: Kockahálók és testek kiterítése',
      subtitle: 'Párosítsd a kockahálókat és geometriai testek hálóit!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '1-4-1 típusú T-alakú kockaháló',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 30" fill="none">
              <rect x="10" y="2" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="3" y="11" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="12" y="11" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="21" y="11" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="30" y="11" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="10" y="20" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
            </svg>
          ),
          value: 'Középen 4 négyzetes sáv, fent és lent 1-1 fül (ebből a típusból 6 db van)'
        },
        {
          id: 'p3-2',
          prompt: '2-2-2 típusú Z-alakú kockaháló',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 30" fill="none">
              <rect x="4" y="3" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="13" y="3" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="13" y="12" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="22" y="12" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="22" y="21" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
              <rect x="31" y="21" width="7" height="7" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
            </svg>
          ),
          value: '3 darab 2 négyzetes szakasz lépcsőzetesen eltolva (1 db létezik)'
        },
        {
          id: 'p3-3',
          prompt: 'Kockahálók összes száma',
          promptFigure: (
            <div className="text-center font-black text-xs text-emerald-700 dark:text-emerald-300">
              11 háló
            </div>
          ),
          value: 'Forgatásoktól és tükrözésektől eltekintve pontosan 11 különböző háló létezik'
        },
        {
          id: 'p3-4',
          prompt: 'Szemközti lapok szabálya',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-rose-700 dark:text-rose-300">
              Szemközti ≠ Szomszéd
            </div>
          ),
          value: 'A kiterített hálóban két szemközti lap sosem érintkezhet közös éllel'
        },
        {
          id: 'p3-5',
          prompt: 'Téglatest kiterített hálója',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 48 30" fill="none">
              <rect x="4" y="10" width="8" height="10" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
              <rect x="14" y="10" width="12" height="10" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
              <rect x="28" y="10" width="8" height="10" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
              <rect x="38" y="10" width="12" height="10" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
              <rect x="14" y="2" width="12" height="6" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
              <rect x="14" y="22" width="12" height="6" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
            </svg>
          ),
          value: '6 darab téglalap alkotja, amelyek 3 pár egybevágó lapot formálnak'
        },
        {
          id: 'p3-6',
          prompt: 'Négyzetes gúla hálója',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 36 30" fill="none">
              <rect x="12" y="9" width="12" height="12" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <polygon points="18,1 12,9 24,9" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
              <polygon points="18,29 12,21 24,21" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
              <polygon points="2,15 12,9 12,21" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
              <polygon points="34,15 24,9 24,21" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
            </svg>
          ),
          value: '1 négyzet (alaplap) és 4 egyenlő szárú háromszög (oldallapok/palást)'
        },
        {
          id: 'p3-7',
          prompt: 'Henger kiterített hálója',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 48 30" fill="none">
              <rect x="10" y="10" width="28" height="10" fill="#d1fae5" stroke="#047857" strokeWidth="1" />
              <circle cx="24" cy="5" r="4" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
              <circle cx="24" cy="25" r="4" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
            </svg>
          ),
          value: '1 téglalap (palást) és 2 egybevágó körlap (alap- és fedőlap)'
        },
        {
          id: 'p3-8',
          prompt: '2×2-es tömb hiba kockahálóban',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="11" height="11" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
              <rect x="17" y="4" width="11" height="11" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
              <rect x="4" y="17" width="11" height="11" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
              <rect x="17" y="17" width="11" height="11" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
              <line x1="4" y1="4" x2="28" y2="28" stroke="#b91c1c" strokeWidth="2" />
            </svg>
          ),
          value: 'Ha 4 négyzet egy csúcsban találkozik, a lapok átfedik egymást (NEM kockaháló!)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Testek Építése Párosító Játék"
      subtitle="Találd meg az összetartozó építményeket, alaprajzokat, nézeteket és test-hálókat!"
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

export default BuildingMatcher;
