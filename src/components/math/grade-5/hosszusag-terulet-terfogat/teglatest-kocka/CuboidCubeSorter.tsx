import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CuboidCubeSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CuboidCubeSorter: React.FC<CuboidCubeSorterProps> = ({
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
    // 1. SZINT: MELYIK TESTRE IGAZ AZ ÁLLÍTÁS?
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-cube',
          name: 'Csak a Kockára igaz',
          description: 'Minden éle és minden lapja egybevágó',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-cuboid',
          name: 'Kifejezetten Téglatestre jellemző',
          description: 'Különböző élhosszúságok és téglalap lapok (a ≠ b vagy c)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-both',
          name: 'Mindkét testre egyaránt igaz',
          description: 'A téglatest és a kocka közös geometriai tulajdonságai',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Mind a 6 határoló lapja egybevágó négyzet',
          categoryId: 'cat-cube',
          explanation: 'Csak a kockára igaz, a téglatest lapjai általában téglalapok.'
        },
        {
          id: 's1-2',
          text: 'Mind a 12 éle pontosan azonos hosszúságú',
          categoryId: 'cat-cube',
          explanation: 'A kocka 12 éle mind egyenlő (a).'
        },
        {
          id: 's1-3',
          text: 'Éleinek összhossza a 12 · a képlettel számítható ki',
          categoryId: 'cat-cube',
          explanation: 'Mivel 12 egyenlő éle van, az összhossz 12 · a.'
        },
        {
          id: 's1-4',
          text: 'Egy szabályos játékkocka geometriai formája',
          categoryId: 'cat-cube',
          explanation: 'A klasszikus dobókocka minden oldala egyforma négyzet.'
        },
        {
          id: 's1-5',
          text: '3 különböző élcsoportja van: 4a + 4b + 4c',
          categoryId: 'cat-cuboid',
          explanation: 'Téglatestnél a hosszúság, szélesség és magasság különböző lehet.'
        },
        {
          id: 's1-6',
          text: 'Határoló lapjai között van olyan, amely téglalap, de nem négyzet',
          categoryId: 'cat-cuboid',
          explanation: 'A nem-kocka téglatest lapjai nem négyzetek.'
        },
        {
          id: 's1-7',
          text: 'Szemközti lapjai egybevágók, de a szomszédosak eltérő méretűek lehetnek',
          categoryId: 'cat-cuboid',
          explanation: 'A téglatestnél 3 pár különböző lapméret van.'
        },
        {
          id: 's1-8',
          text: 'Egy átlagos cipősdoboz vagy könyv formája',
          categoryId: 'cat-cuboid',
          explanation: 'A cipősdoboz élei nem egyforma hosszúak: téglatest.'
        },
        {
          id: 's1-9',
          text: 'Pontosan 8 csúcsa van',
          categoryId: 'cat-both',
          explanation: 'Mind a téglatestnek, mind a kockának 8 csúcsa van.'
        },
        {
          id: 's1-10',
          text: 'Pontosan 12 éle van',
          categoryId: 'cat-both',
          explanation: 'Mindkét testnek pontosan 12 éle van.'
        },
        {
          id: 's1-11',
          text: 'Pontosan 6 határoló lapja van',
          categoryId: 'cat-both',
          explanation: 'Mindkét testet 6 síklap határolja.'
        },
        {
          id: 's1-12',
          text: 'Egy csúcsban találkozó 3 él páronként merőleges egymásra',
          categoryId: 'cat-both',
          explanation: 'A derékszögű térbeli testeknél a szomszédos élek és lapok merőlegesek.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: CSÚCSOK, ÉLEK, LAPOK CSOPORTOSÍTÁSA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-vertices',
          name: 'Csúcsok (8 db)',
          description: 'A test sarkai, élek találkozási pontjai',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-edges',
          name: 'Élek (12 db)',
          description: 'A határoló lapok metszésvonalai, drótváz szakaszok',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-faces',
          name: 'Lapok (6 db)',
          description: 'A testet határoló síkfelületek (téglalapok, négyzetek)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'A test sarkait alkotó geometriai pontok',
          categoryId: 'cat-vertices',
          explanation: 'A csúcsok pontok a térben.'
        },
        {
          id: 's2-2',
          text: 'Jelölésük a rajzokon: A, B, C, D, E, F, G, H nagybetűkkel',
          categoryId: 'cat-vertices',
          explanation: 'A pontokat / csúcsokat nyomtatott nagybetűkkel jelöljük.'
        },
        {
          id: 's2-3',
          text: '3 határoló él találkozási pontja',
          categoryId: 'cat-vertices',
          explanation: 'Minden csúcsban 3 él fut össze.'
        },
        {
          id: 's2-4',
          text: 'A test alján 4, a fedőlapján szintén 4 található belőlük',
          categoryId: 'cat-vertices',
          explanation: '4 alsó sarok + 4 felső sarok = 8 csúcs.'
        },
        {
          id: 's2-5',
          text: 'Két szomszédos határoló lap közös metszésvonala',
          categoryId: 'cat-edges',
          explanation: 'A lapok találkozása egy egyenes szakasz: az él.'
        },
        {
          id: 's2-6',
          text: 'Egy drótváz modell készítésekor a szükséges egyenes drótszakaszok',
          categoryId: 'cat-edges',
          explanation: 'A keretet az élek alkotják (12 db).'
        },
        {
          id: 's2-7',
          text: 'Téglatestnél 3 darab négyes párhuzamos csoportba rendezhetők (4a, 4b, 4c)',
          categoryId: 'cat-edges',
          explanation: 'Az élek 3 irányba mutatnak.'
        },
        {
          id: 's2-8',
          text: 'Kockánál mind a 12 darab egyenlő hosszúságú szakasz',
          categoryId: 'cat-edges',
          explanation: 'A kocka minden éle egyenlő.'
        },
        {
          id: 's2-9',
          text: 'A testet határoló síkbeli sokszögek',
          categoryId: 'cat-faces',
          explanation: 'A lapok 2 dimenziós felületek.'
        },
        {
          id: 's2-10',
          text: 'Kockánál 6 darab egybevágó négyzet alkotja',
          categoryId: 'cat-faces',
          explanation: 'A kocka határoló lapjai négyzetek.'
        },
        {
          id: 's2-11',
          text: 'Téglatestnél 3 pár szemközti, egybevágó felület',
          categoryId: 'cat-faces',
          explanation: 'Alap-fedél, jobb-bal, elöl-hátul lapok.'
        },
        {
          id: 's2-12',
          text: 'A síkbeli háló kiterítésekor ezekből kapunk 6 darabot',
          categoryId: 'cat-faces',
          explanation: 'A háló a 6 lap kiterítése a síkba.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: HÁLÓK ÉS TÉRBELI VISZONYOK
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-valid-net',
          name: 'Kockává hajtogatható (Szabályos háló)',
          description: 'Összehajtva hézagmentesen és átfedés nélkül kockát ad',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-invalid-net',
          name: 'NEM hajtogatható kockává (Hibás háló)',
          description: 'Laphiány, lapfelesleg vagy átfedés miatt nem ad kockát',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-spatial-rel',
          name: 'Térbeli helyzet (Párhuzamos / Merőleges)',
          description: 'Lapok és élek egymáshoz viszonyított térbeli helyzete',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Latin kereszt alakzat (4 négyzet egy sorban, 1 fent és 1 lent)',
          categoryId: 'cat-valid-net',
          explanation: 'A legismertebb szabályos kockaháló.'
        },
        {
          id: 's3-2',
          text: 'T-alakú elrendezés 6 négyzetből',
          categoryId: 'cat-valid-net',
          explanation: 'Szabályos kockaháló, tökéletesen összehajtható.'
        },
        {
          id: 's3-3',
          text: 'Lépcsős elrendezés 6 négyzetből átfedés nélkül',
          categoryId: 'cat-valid-net',
          explanation: 'A 11 lehetséges kockaháló egyike.'
        },
        {
          id: 's3-4',
          text: '6 négyzet úgy elrendezve, hogy a szemközti lapok között mindig 1 lap van',
          categoryId: 'cat-valid-net',
          explanation: 'Ez a feltétele annak, hogy ne essenek egybe a lapok.'
        },
        {
          id: 's3-5',
          text: '5 négyzet egy sorban egymás mellett',
          categoryId: 'cat-invalid-net',
          explanation: 'Egy kockahálóban egy sorban legfeljebb 4 négyzet lehet.'
        },
        {
          id: 's3-6',
          text: 'Csak 5 négyzetből álló alakzat',
          categoryId: 'cat-invalid-net',
          explanation: 'Hiányzik 1 lap a 6-ból, nem záródik be a kocka.'
        },
        {
          id: 's3-7',
          text: 'Olyan 6 négyzet, ahol a hajtásnál két lap teljesen egymásra feküdne',
          categoryId: 'cat-invalid-net',
          explanation: 'Átfedés keletkezik, egy másik oldal pedig nyitva marad.'
        },
        {
          id: 's3-8',
          text: '7 négyzetből álló síkbeli elrendezés',
          categoryId: 'cat-invalid-net',
          explanation: 'Lapfelesleg: a kockának pontosan 6 lapja van.'
        },
        {
          id: 's3-9',
          text: 'Az alaplap és a fedőlap egymáshoz viszonyított helyzete',
          categoryId: 'cat-spatial-rel',
          explanation: 'Szemközti lapok, egymással párhuzamosak.'
        },
        {
          id: 's3-10',
          text: 'Két egymással szomszédos (közös élben találkozó) lap helyzete',
          categoryId: 'cat-spatial-rel',
          explanation: 'Derékszöget zárnak be, merőlegesek egymásra.'
        },
        {
          id: 's3-11',
          text: 'A téglatest 4 függőleges oszlopéle egymáshoz képest',
          categoryId: 'cat-spatial-rel',
          explanation: 'Mind a 4 magassági él egymással párhuzamos.'
        },
        {
          id: 's3-12',
          text: 'Egyetlen csúcsból kiinduló 3 él viszonya',
          categoryId: 'cat-spatial-rel',
          explanation: 'Páronként derékszögűek, azaz merőlegesek egymásra.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Téglatest és Kocka Csoportosító"
      subtitle="Válogasd szét a testek tulajdonságait, geometriai elemeit és hálóit!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
