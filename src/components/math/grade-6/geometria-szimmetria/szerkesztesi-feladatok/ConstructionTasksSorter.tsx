import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ConstructionTasksMiniFigure } from './ConstructionTasksDiagrams';

export interface ConstructionTasksSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ConstructionTasksSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ConstructionTasksSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number'
    ? propLevel
    : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number'
      ? propLevel
      : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: HÁROMSZÖG SZERKESZTHETŐSÉG ÉS EGYENLŐTLENSÉG (10 ELEM)
    1: {
      level: 1,
      title: '1. Szint: Háromszögek szerkeszthetősége az adatokból',
      description: 'Csoportosítsd az adathalmazokat aszerint, hogy szerkeszthető-e belőlük valós háromszög!',
      categories: [
        {
          id: 'cat-possible',
          title: 'Szerkeszthető háromszög',
          description: 'A háromszög-egyenlőtlenség és szögek összege teljesül'
        },
        {
          id: 'cat-impossible',
          title: 'Nem szerkeszthető (0 megoldás)',
          description: 'Sérül a háromszög-egyenlőtlenség vagy a szögek összege'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'a = 3 cm, b = 4 cm, c = 5 cm',
          categoryId: 'cat-possible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" size={48} />
        },
        {
          id: 's1-2',
          text: 'a = 2 cm, b = 3 cm, c = 6 cm (2+3=5 < 6)',
          categoryId: 'cat-impossible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" size={48} />
        },
        {
          id: 's1-3',
          text: 'a = 5 cm, b = 5 cm, c = 5 cm (szabályos)',
          categoryId: 'cat-possible',
          figure: <ConstructionTasksMiniFigure type="equilateral_construction" size={48} />
        },
        {
          id: 's1-4',
          text: 'a = 4 cm, b = 4 cm, c = 8 cm (4+4=8 = 8, elfajult)',
          categoryId: 'cat-impossible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" size={48} />
        },
        {
          id: 's1-5',
          text: 'a = 6 cm, b = 8 cm, c = 10 cm (6+8=14 > 10)',
          categoryId: 'cat-possible',
          figure: <ConstructionTasksMiniFigure type="triangle_sss" size={48} />
        },
        {
          id: 's1-6',
          text: 'a = 1 cm, b = 2 cm, c = 4 cm (1+2=3 < 4)',
          categoryId: 'cat-impossible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" size={48} />
        },
        {
          id: 's1-7',
          text: 'a = 7 cm, b = 10 cm, c = 12 cm (7+10=17 > 12)',
          categoryId: 'cat-possible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" size={48} />
        },
        {
          id: 's1-8',
          text: 'α = 100°, β = 85°, c = 6 cm (100°+85°=185° > 180°)',
          categoryId: 'cat-impossible',
          figure: <ConstructionTasksMiniFigure type="angle_sum_check" size={48} />
        },
        {
          id: 's1-9',
          text: 'a = 4.5 cm, b = 4.5 cm, c = 6 cm (4.5+4.5=9 > 6)',
          categoryId: 'cat-possible',
          figure: <ConstructionTasksMiniFigure type="isosceles_base_height" size={48} />
        },
        {
          id: 's1-10',
          text: 'a = 3 cm, b = 7 cm, c = 11 cm (3+7=10 < 11)',
          categoryId: 'cat-impossible',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" size={48} />
        }
      ]
    },

    // 2. SZINT: SZERKESZTÉSI ELJÁRÁS TÍPUSA (10 ELEM)
    2: {
      level: 2,
      title: '2. Szint: Szerkesztési módszerek és alapesetek',
      description: 'Csoportosítsd a feladatokat a szerkesztéshez használt kulcsmódszer szerint!',
      categories: [
        {
          id: 'cat-arcs',
          title: 'Körívezéses alapeset (ooo / átlók)',
          description: 'A csúcsok meghatározása körívek metszéspontjával'
        },
        {
          id: 'cat-angles',
          title: 'Szögmásolásos alapeset (oszo / szosz)',
          description: 'Szögek felmérésével és szárak metszésével'
        },
        {
          id: 'cat-bisector',
          title: 'Felezőmerőlegesre épülő szerkesztés',
          description: 'Tengelyes szimmetria, magasság vagy felezőpontok'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Háromszög szerkesztése 3 oldalból (ooo)',
          categoryId: 'cat-arcs',
          figure: <ConstructionTasksMiniFigure type="triangle_sss" size={48} />
        },
        {
          id: 's2-2',
          text: 'Háromszög 2 oldalból és közbezárt szögből (oszo)',
          categoryId: 'cat-angles',
          figure: <ConstructionTasksMiniFigure type="triangle_sas" size={48} />
        },
        {
          id: 's2-3',
          text: 'Háromszög 1 oldalból és 2 rajta fekvő szögből (szosz)',
          categoryId: 'cat-angles',
          figure: <ConstructionTasksMiniFigure type="triangle_asa" size={48} />
        },
        {
          id: 's2-4',
          text: 'Egyenlő szárú háromszög alapból és magasságból (c, m_c)',
          categoryId: 'cat-bisector',
          figure: <ConstructionTasksMiniFigure type="isosceles_base_height" size={48} />
        },
        {
          id: 's2-5',
          text: 'Rombusz szerkesztése két átlójából (e, f)',
          categoryId: 'cat-bisector',
          figure: <ConstructionTasksMiniFigure type="rhombus_diagonals" size={48} />
        },
        {
          id: 's2-6',
          text: 'Deltoid szerkesztése e szimmetriaátlóból és a, b oldalakból',
          categoryId: 'cat-arcs',
          figure: <ConstructionTasksMiniFigure type="deltoid_construction" size={48} />
        },
        {
          id: 's2-7',
          text: 'Szabályos háromszög szerkesztése azonos a körzőnyílással',
          categoryId: 'cat-arcs',
          figure: <ConstructionTasksMiniFigure type="equilateral_construction" size={48} />
        },
        {
          id: 's2-8',
          text: 'Téglalap szerkesztése a oldalból és 90°-os derékszögekből',
          categoryId: 'cat-angles',
          figure: <ConstructionTasksMiniFigure type="rectangle_construction" size={48} />
        },
        {
          id: 's2-9',
          text: 'Húrtrapéz szerkesztése alapok közös felezőmerőlegesével',
          categoryId: 'cat-bisector',
          figure: <ConstructionTasksMiniFigure type="trapezoid_construction" size={48} />
        },
        {
          id: 's2-10',
          text: 'Egy pont merőleges tükrözése a szimmetriatengelyre',
          categoryId: 'cat-bisector',
          figure: <ConstructionTasksMiniFigure type="symmetric_completion" size={48} />
        }
      ]
    },

    // 3. SZINT: ELÉGSÉGES ADATOK SZÁMA (10 ELEM)
    3: {
      level: 3,
      title: '3. Szint: A szerkesztéshez szükséges független adatok száma',
      description: 'Csoportosítsd a síkidomokat az egyértelmű szerkesztéshez minimálisan szükséges adatok száma szerint!',
      categories: [
        {
          id: 'cat-1-data',
          title: '1 független adat elegendő',
          description: 'Magas fokú szimmetria (szabályos sokszög, négyzet)'
        },
        {
          id: 'cat-2-3-data',
          title: '2 vagy 3 független adat szükséges',
          description: 'Háromszögek, rombusz, téglalap, deltoid, húrtrapéz'
        },
        {
          id: 'cat-5-data',
          title: '5 független adat szükséges',
          description: 'Általános aszimmetrikus négyszögek'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Négyzet megszerkesztése (a oldalhossz)',
          categoryId: 'cat-1-data',
          figure: <ConstructionTasksMiniFigure type="square_construction" size={48} />
        },
        {
          id: 's3-2',
          text: 'Szabályos háromszög megszerkesztése (a oldal)',
          categoryId: 'cat-1-data',
          figure: <ConstructionTasksMiniFigure type="equilateral_construction" size={48} />
        },
        {
          id: 's3-3',
          text: 'Rombusz megszerkesztése (két átló: e, f)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="rhombus_diagonals" size={48} />
        },
        {
          id: 's3-4',
          text: 'Téglalap megszerkesztése (két oldal: a, b)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="rectangle_construction" size={48} />
        },
        {
          id: 's3-5',
          text: 'Egyenlő szárú háromszög (alap és magasság)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="isosceles_base_height" size={48} />
        },
        {
          id: 's3-6',
          text: 'Általános háromszög megszerkesztése (3 oldal: a, b, c)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="triangle_sss" size={48} />
        },
        {
          id: 's3-7',
          text: 'Deltoid megszerkesztése (e átló és a, b oldalak)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="deltoid_construction" size={48} />
        },
        {
          id: 's3-8',
          text: 'Húrtrapéz megszerkesztése (két alap és szár: a, c, b)',
          categoryId: 'cat-2-3-data',
          figure: <ConstructionTasksMiniFigure type="trapezoid_construction" size={48} />
        },
        {
          id: 's3-9',
          text: 'Szabályos hatszög megszerkesztése (a oldalhossz)',
          categoryId: 'cat-1-data',
          figure: <ConstructionTasksMiniFigure type="compass_straightedge" size={48} />
        },
        {
          id: 's3-10',
          text: 'Általános (aszimmetrikus) négyszög megszerkesztése',
          categoryId: 'cat-5-data',
          figure: <ConstructionTasksMiniFigure type="sketch_analysis" size={48} />
        }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <SorterTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szerkesztési feladatok csoportosító"
      badge="📐 6. Osztály • III. Geometria • 10. Fejezet"
      topicId="g6-construction-tasks-sorter"
      themeColor="teal"
      currentLevel={level}
      config={currentConfig}
      onLevelChange={(lvl) => setLevel(lvl)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
