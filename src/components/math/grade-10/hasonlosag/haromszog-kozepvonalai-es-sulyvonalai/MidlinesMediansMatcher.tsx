import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MidlinesMediansMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const MIDLINES_MEDIANS_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Középvonalak és súlyvonalak alapfogalmai',
    description: 'Párosítsd a definíciókat, alaptételeket és geometriai összefüggéseket!',
    pairs: [
      {
        id: 'mm1',
        left: 'Háromszög középvonala',
        right: 'Két oldal felezőpontját összekötő szakasz, párhuzamos a 3. oldallal és fele akkora'
      },
      {
        id: 'mm2',
        left: 'Háromszög súlyvonala',
        right: 'Egy csúcsot a szemközti oldal felezőpontjával összekötő szakasz'
      },
      {
        id: 'mm3',
        left: 'Háromszög súlypontja (S)',
        right: 'A három súlyvonal egyetlen közös metszéspontja'
      },
      {
        id: 'mm4',
        left: 'Súlypont osztásaránya',
        right: '2 : 1 arányban osztja a súlyvonalakat, a hosszabb szakasz a csúcs felé esik'
      },
      {
        id: 'mm5',
        left: 'Középvonal-háromszög kerülete',
        right: 'K_közép = K / 2 (az eredeti háromszög kerületének pontosan a fele)'
      },
      {
        id: 'mm6',
        left: 'Középvonal-háromszög területe',
        right: 'T_közép = T / 4 (mivel a hasonlósági arány λ = 1/2, a terület λ² = 1/4)'
      },
      {
        id: 'mm7',
        left: 'Súlyvonal területfelezése',
        right: 'Bármely súlyvonal pontosan két egyenlő területű (T/2) részre osztja a háromszöget'
      },
      {
        id: 'mm8',
        left: 'Súlypont távolsága a csúcstól',
        right: 'A teljes súlyvonal hosszának kétharmada: d = (2/3) · s'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számításos geometriai feladatok',
    description: 'Párosítsd a geometriai példák adatait a helyes számítási eredménnyel!',
    pairs: [
      {
        id: 'mm9',
        left: 'Oldalak aránya 2 : 8 : 9, legkisebb középvonal 17 mm',
        right: 'Az oldalak hossza: 34 mm, 136 mm és 153 mm (alapegység = 17 mm)'
      },
      {
        id: 'mm10',
        left: 'Középvonal-Δ kerülete 255 dm, oldalarány 5 : 12 : 13',
        right: 'Az eredeti háromszög oldalai: 85 dm, 204 dm és 221 dm'
      },
      {
        id: 'mm11',
        left: '85 dm, 204 dm, 221 dm oldalú háromszög fajtája',
        right: 'Derékszögű háromszög, mert 85² + 204² = 7225 + 41616 = 48841 = 221²'
      },
      {
        id: 'mm12',
        left: 'Derékszögű Δ befogói 14 cm és 33,6 cm',
        right: 'Átfogója c = √(14² + 33,6²) = 36,4 cm'
      },
      {
        id: 'mm13',
        left: 'Átfogóhoz tartozó súlyvonal (c = 36,4 cm)',
        right: 's_c = c / 2 = 36,4 / 2 = 18,2 cm (megegyezik a köré írt kör sugarával)'
      },
      {
        id: 'mm14',
        left: 'Súlypont távolsága a derékszögű csúcstól',
        right: 'd = (2/3) · 18,2 ≈ 12,13 cm'
      },
      {
        id: 'mm15',
        left: 'Egyenlő szárú Δ (alap 42 mm, szár 29 mm) magassága',
        right: 'm = √(29² - 21²) = √(841 - 441) = √400 = 20 mm'
      },
      {
        id: 'mm16',
        left: 'Súlypont távolsága az alaptól (m = 20 mm)',
        right: 'd = (1/3) · 20 mm ≈ 6,67 mm'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Bizonyítások és területarányok',
    description: 'Párosítsd a mélyebb geometriai tételeket a megfelelő állítással!',
    pairs: [
      {
        id: 'mm17',
        left: 'Súlypont 2:1 arányának bizonyítása',
        right: 'ΔABS ~ ΔDES homokóra-háromszögek hasonlósága igazolja, ahol λ = AB / DE = 2'
      },
      {
        id: 'mm18',
        left: 'Súlyvonalak által alkotott 6 kis háromszög',
        right: 'Mind a 6 háromszög területe pontosan egyenlő: T / 6'
      },
      {
        id: 'mm19',
        left: 'Súlypontot a csúcsokkal összekötő 3 háromszög',
        right: 'T_ABS = T_BCS = T_CAS = T / 3 (mindhárom területe az eredeti harmada)'
      },
      {
        id: 'mm20',
        left: 'A 3 középvonal által határolt 4 háromszög',
        right: 'Négy egymással egybevágó, az eredetihez hasonló háromszög (T / 4)'
      },
      {
        id: 'mm21',
        left: 'Befogókhoz tartozó súlyvonalak (14 és 33,6 cm)',
        right: 's_a ≈ 34,32 cm és s_b ≈ 21,87 cm'
      },
      {
        id: 'mm22',
        left: 'Szabályos háromszög (a = 3,8 cm) súlypontja a csúcstól',
        right: 'R = a / √3 = 3,8 / 1,732 ≈ 2,19 cm'
      },
      {
        id: 'mm23',
        left: 'Egyenlő szárú derékszögű Δ (befogó 4,5 cm) súlypontja a befogóktól',
        right: 'd = a / 3 = 4,5 / 3 = 1,5 cm távolságra van mindkét befogótól'
      },
      {
        id: 'mm24',
        left: 'Egyenlő szárú Δ (42 × 29 mm) középvonalai',
        right: 'k_a = 21 mm, k_b = k_c = 14,5 mm'
      }
    ]
  }
];

export const MidlinesMediansMatcher: React.FC<MidlinesMediansMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '9. Háromszög középvonalai és súlyvonalai – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="haromszog-kozepvonalai-es-sulyvonalai"
      title={topicTitle}
      subtitle="Gyakorold a középvonalak és súlyvonalak tételeit, a 2:1-es súlypont-osztást és a számítási feladatokat!"
      levels={MIDLINES_MEDIANS_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default MidlinesMediansMatcher;

