import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LinesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LinesMatcher: React.FC<LinesMatcherProps> = ({
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
    // 1. SZINT: SÍKBELI EGYENESEK ÉS JELEIK
    // ========================================================
    1: {
      title: '1. Szint: Síkbeli egyenesek és jeleik',
      subtitle: 'Párosítsd az egyenesek helyzeteit, jeleit és ábráit!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Metsző egyenesek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="26" x2="36" y2="6" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="4" x2="32" y2="28" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="16" r="2.5" fill="#1e1b4b" />
            </svg>
          ),
          value: 'Pontosan 1 közös pontjuk van: a metszéspont (e ∩ f = {P})'
        },
        {
          id: 'p1-2',
          prompt: 'Merőleges egyenesek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="20" x2="36" y2="20" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="4" x2="20" y2="28" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
              <path d="M 26 20 A 6 6 0 0 0 20 14" fill="none" stroke="#047857" strokeWidth="1.2" />
              <circle cx="23" cy="17" r="0.8" fill="#047857" />
            </svg>
          ),
          value: 'Pontosan 90°-os derékszöget zárnak be egymással (e ⊥ f)'
        },
        {
          id: 'p1-3',
          prompt: 'Párhuzamos egyenesek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="10" x2="36" y2="10" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="22" x2="36" y2="22" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ),
          value: 'Egy síkban fekszenek és nincs közös pontjuk (e ∥ f)'
        },
        {
          id: 'p1-4',
          prompt: 'Egybeeső egyenesek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="16" x2="36" y2="16" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
              <line x1="4" y1="16" x2="36" y2="16" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
            </svg>
          ),
          value: 'Minden pontjuk közös, végtelen sok közös pontjuk van (e = f)'
        },
        {
          id: 'p1-5',
          prompt: 'Merőlegesség jele',
          promptFigure: (
            <div className="text-center font-black text-base text-indigo-700 dark:text-indigo-400">
              ⊥
            </div>
          ),
          value: 'A 90°-os szöget bezáró merőleges egyenesek matematikai szimbóluma'
        },
        {
          id: 'p1-6',
          prompt: 'Párhuzamosság jele',
          promptFigure: (
            <div className="text-center font-black text-base text-purple-700 dark:text-purple-400">
              ∥
            </div>
          ),
          value: 'A síkban nem metsző párhuzamos egyenesek matematikai szimbóluma'
        },
        {
          id: 'p1-7',
          prompt: 'Csúcsszögek',
          promptFigure: (
            <div className="text-center font-bold text-xs text-amber-700 dark:text-amber-400">
              α = α'
            </div>
          ),
          value: 'Metsző egyenesek szemközti szögei, nagyságuk mindig megegyezik'
        },
        {
          id: 'p1-8',
          prompt: 'Mellékszögek',
          promptFigure: (
            <div className="text-center font-bold text-xs text-rose-700 dark:text-rose-400">
              α + β = 180°
            </div>
          ),
          value: 'Metsző egyenesek egymás melletti szögei, összegük egyenesszög (180°)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TÉRBELI EGYENESEK ÉS A KOCKA ÉLEI
    // ========================================================
    2: {
      title: '2. Szint: Térbeli egyenesek és a kocka élei',
      subtitle: 'Párosítsd a térbeli egyenespárokat és távolságokat a tulajdonságaikkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Kitérő egyenesek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="24" x2="36" y2="24" stroke="#ea580c" strokeWidth="2" />
              <line x1="20" y1="4" x2="20" y2="18" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
              <line x1="20" y1="26" x2="20" y2="30" stroke="#0284c7" strokeWidth="2" />
            </svg>
          ),
          value: 'Nincsenek egy síkban: nem metszik egymást és nem is párhuzamosak'
        },
        {
          id: 'p2-2',
          prompt: 'Autópálya és felüljáró',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-orange-700 dark:text-orange-300">
              Különböző szintek
            </div>
          ),
          value: 'Valós példa a kitérő egyenesekre: különböző magasságban haladnak el'
        },
        {
          id: 'p2-3',
          prompt: 'Kocka párhuzamos élei',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" stroke="#cbd5e1" strokeWidth="1" fill="none" />
              <line x1="6" y1="26" x2="26" y2="26" stroke="#059669" strokeWidth="2.5" />
              <line x1="6" y1="6" x2="26" y2="6" stroke="#059669" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Egy adott éllel a kocka 12 éle közül pontosan 3 másik él párhuzamos'
        },
        {
          id: 'p2-4',
          prompt: 'Kocka merőleges élei',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="26" x2="26" y2="26" stroke="#2563eb" strokeWidth="2.5" />
              <line x1="6" y1="26" x2="6" y2="6" stroke="#2563eb" strokeWidth="2.5" />
              <circle cx="6" cy="26" r="2.5" fill="#1e40af" />
            </svg>
          ),
          value: 'Egy csúcsban találkoznak és 90°-os szöget zárnak be egymással'
        },
        {
          id: 'p2-5',
          prompt: 'Kocka kitérő élei',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-orange-700 dark:text-orange-300">
              4 kitérő él
            </div>
          ),
          value: 'Egy kiválasztott élhez képest pontosan 4 olyan él van a kockán, ami kitérő vele'
        },
        {
          id: 'p2-6',
          prompt: 'Pont és egyenes távolsága',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="4" y1="24" x2="36" y2="24" stroke="#4f46e5" strokeWidth="2" />
              <circle cx="20" cy="8" r="2.5" fill="#ea580c" />
              <line x1="20" y1="8" x2="20" y2="24" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 1" />
            </svg>
          ),
          value: 'A pontból az egyenesre bocsátott merőleges szakasz hossza (legrövidebb út)'
        },
        {
          id: 'p2-7',
          prompt: 'Párhuzamosok távolsága',
          promptFigure: (
            <div className="text-center font-bold text-xs text-purple-700 dark:text-purple-300">
              d = állandó
            </div>
          ),
          value: 'A rájuk merőleges összekötő szakasz hossza, amely minden pontban ugyanakkora'
        },
        {
          id: 'p2-8',
          prompt: 'Sík meghatározása',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-slate-700 dark:text-slate-300">
              2 metsző → 1 sík
            </div>
          ),
          value: 'Két metsző egyenes vagy két párhuzamos egyenes mindig pontosan egy síkot határoz meg'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SZERKESZTÉSEK ÉS ÖSSZEFÜGGÉSEK
    // ========================================================
    3: {
      title: '3. Szint: Szerkesztések és összefüggések',
      subtitle: 'Párosítsd a szerkesztési lépéseket és a geometriai tételeket!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Szakaszfelező merőleges',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <line x1="6" y1="16" x2="34" y2="16" stroke="#312e81" strokeWidth="2" />
              <line x1="20" y1="4" x2="20" y2="28" stroke="#ec4899" strokeWidth="2" />
              <circle cx="20" cy="16" r="2" fill="#831843" />
            </svg>
          ),
          value: 'A szakasz felezőpontján áthaladó, a szakaszra merőleges egyenes'
        },
        {
          id: 'p3-2',
          prompt: 'Felezőmerőleges pontjainak tulajdonsága',
          promptFigure: (
            <div className="text-center font-bold text-xs text-pink-700 dark:text-pink-300">
              |PA| = |PB|
            </div>
          ),
          value: 'Minden pontja egyenlő távolságra van a szakasz két végpontjától'
        },
        {
          id: 'p3-3',
          prompt: 'Körzőnyílás szabálya felezéskor',
          promptFigure: (
            <div className="text-center font-black text-xs text-amber-700 dark:text-amber-300">
              r &gt; |AB| : 2
            </div>
          ),
          value: 'A sugárnak nagyobbnak kell lennie a szakasz felénél, hogy a körívek messék egymást'
        },
        {
          id: 'p3-4',
          prompt: 'Párhuzamos rajzolása vonalzóval',
          promptFigure: (
            <div className="text-center font-bold text-[10px] text-indigo-700 dark:text-indigo-300">
              Vezetővonalzó
            </div>
          ),
          value: 'Egy rögzített vezetővonalzó mentén elcsúsztatott derékszögű vonalzóval történik'
        },
        {
          id: 'p3-5',
          prompt: 'Párhuzamosság láncszabálya (tranzitivitás)',
          promptFigure: (
            <div className="text-center font-bold text-xs text-emerald-700 dark:text-emerald-300">
              a ∥ b és b ∥ c ⇒ a ∥ c
            </div>
          ),
          value: 'Ha két egyenes párhuzamos egy harmadikkal, akkor egymással is párhuzamosak'
        },
        {
          id: 'p3-6',
          prompt: 'Merőlegesek párhuzamossága',
          promptFigure: (
            <div className="text-center font-bold text-xs text-purple-700 dark:text-purple-300">
              a ⊥ b és c ⊥ b ⇒ a ∥ c
            </div>
          ),
          value: 'A síkban ugyanarra az egyenesre merőleges két egyenes egymással párhuzamos'
        },
        {
          id: 'p3-7',
          prompt: 'Külső pontból bocsátható merőleges',
          promptFigure: (
            <div className="text-center font-black text-xs text-blue-700 dark:text-blue-300">
              Pontosan 1 db
            </div>
          ),
          value: 'Egy külső pontból egy adott egyenesre a síkban pontosan egy merőleges húzható'
        },
        {
          id: 'p3-8',
          prompt: 'Külső ponton át húzható párhuzamos',
          promptFigure: (
            <div className="text-center font-black text-xs text-teal-700 dark:text-teal-300">
              Pontosan 1 db
            </div>
          ),
          value: 'Egy adott ponton át egy adott egyenessel a síkban pontosan egy párhuzamos húzható'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Egyenesek Párosító Játék"
      subtitle="Találd meg az összetartozó egyeneseket, jeleket, térbeli helyzeteket és szerkesztéseket!"
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

export default LinesMatcher;
