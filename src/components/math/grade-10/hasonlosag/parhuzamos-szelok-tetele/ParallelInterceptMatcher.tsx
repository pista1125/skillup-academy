import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParallelInterceptMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const PARALLEL_INTERCEPT_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Párhuzamos szelők és szelőszakaszok alapjai',
    description: 'Párosítsd a tételeket, szerkesztési szabályokat és buktatókat a leírásukkal!',
    pairs: [
      {
        id: 'pi1',
        left: 'Párhuzamos szelők tétele',
        right: 'Szögszárakat párhuzamosokkal metszve a szárakon keletkező megfelelő szakaszok aránya megegyezik (a/b = c/d)'
      },
      {
        id: 'pi2',
        left: 'Párhuzamos szelőszakaszok tétele',
        right: 'A párhuzamosokból kimetszett szakaszok aránya a csúcstól mért távolságok arányával egyenlő (c₁/c₂ = OA₁/OA₂)'
      },
      {
        id: 'pi3',
        left: 'Párhuzamos szelők tételének megfordítása',
        right: 'Ha a szárakon keletkező szakaszok aránya egyenlő (OA₁/OA₂ = OB₁/OB₂), akkor az egyenesek párhuzamosak'
      },
      {
        id: 'pi4',
        left: 'Szakasz adott arányú felosztása',
        right: 'Segédfélegyenesre az arányszámok összegének megfelelő számú egyenlő szakasz felmérése és párhuzamosok húzása'
      },
      {
        id: 'pi5',
        left: 'Negyedik arányos szerkesztése',
        right: 'Az a : b = c : x aránypárból az x = (b · c) / a ismeretlen szakasz megkeresése szögszárakon'
      },
      {
        id: 'pi6',
        left: 'Szelőszakaszok gyakori buktatója',
        right: 'A szelőszakaszok aránya NEM a trapéz szárainak szakaszával, hanem a csúcstól mért teljes hosszal arányos'
      },
      {
        id: 'pi7',
        left: 'Lakás felosztása (18, 24, 12 m²)',
        right: 'A területek aránya 3 : 4 : 2, ezért a szakaszt 3 + 4 + 2 = 9 egységre kell felosztani'
      },
      {
        id: 'pi8',
        left: 'Csúcstól mért szárszakaszok aránya',
        right: 'OA₁ / OA₂ = OB₁ / OB₂ bármely szög esetén, ha a metsző egyenesek párhuzamosak'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyakorlati számításos feladatok',
    description: 'Párosítsd a szerkesztési és felosztási feladatokat a helyes matematikai eredménnyel!',
    pairs: [
      {
        id: 'pi9',
        left: '539 m²-es telek felosztása 2 : 5 arányban',
        right: '7 részre osztva: 2/7 · 539 = 154 m² és 5/7 · 539 = 385 m²'
      },
      {
        id: 'pi10',
        left: 'Telek kettős 2 : 5 felosztása (4 résztelület)',
        right: 'A 4 rész: 44 m², 110 m², 110 m² és 275 m² (összegük 539 m², alapegység 11 m²)'
      },
      {
        id: 'pi11',
        left: '11 cm kerület szabályos háromszögre osztva',
        right: '1 : 1 : 1 arány (3 egyenlő rész): mindegyik oldal hossza pontosan 11/3 cm'
      },
      {
        id: 'pi12',
        left: '11 cm kerület egyenlő szárú háromszögre (alap 3x, szárak 2x)',
        right: '3 : 2 : 2 arány (7 egység): az oldalak 33/7 cm, 22/7 cm és 22/7 cm'
      },
      {
        id: 'pi13',
        left: '11 cm kerület egyenlő szárú háromszögre (szárak 3y, alap 2y)',
        right: '2 : 3 : 3 arány (8 egység): az oldalak 22/8 cm, 33/8 cm és 33/8 cm'
      },
      {
        id: 'pi14',
        left: 'Háromszög kerülete k, oldalainak aránya 3 : 3 : 4',
        right: 'A k szakaszt 3 + 3 + 4 = 10 egyenlő részre kell felosztani segédfélegyenessel'
      },
      {
        id: 'pi15',
        left: 'Téglalap oldalai 2 : 3 arányúak, kerülete k',
        right: 'A k/2 félkerületet 2 : 3 arányban (5 egységre) osztjuk fel'
      },
      {
        id: 'pi16',
        left: '8 cm-es szakasz 4 : 2 : 3 arányú felosztása',
        right: 'Összesen 9 részre osztjuk: a darabok 32/9 cm, 16/9 cm és 24/9 cm hosszúak'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Geometriai tételek és emelt szintű alkalmazások',
    description: 'Párosítsd a tételeket és geometriai következményeiket!',
    pairs: [
      {
        id: 'pi17',
        left: 'Szabályos ötszög aranymetszése',
        right: 'Az átlókat egymással metszve a szakaszok az oldal és átló (a : b) arányában metszik egymást'
      },
      {
        id: 'pi18',
        left: 'Háromszög belső szögfelezőjének tétele',
        right: 'A belső szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja fel'
      },
      {
        id: 'pi19',
        left: 'Súlypont osztóaránya háromszögben',
        right: 'A súlypont minden súlyvonalat 2 : 1 arányban oszt fel a csúcstól mérve'
      },
      {
        id: 'pi20',
        left: 'Trapéz átlóinak metszéspontja',
        right: 'Az átlók a két párhuzamos alap hosszának arányában (a : c) metszik egymást'
      },
      {
        id: 'pi21',
        left: 'Trapéz középvonalának tétele',
        right: 'A szárak felezőpontjait összekötő szakasz párhuzamos az alapokkal, hossza (a + c) / 2'
      },
      {
        id: 'pi22',
        left: 'Párhuzamos szelők tételének bizonyítási elve',
        right: 'Közös magasságú háromszögek területarányából vagy középpontos hasonlóságból vezethető le'
      },
      {
        id: 'pi23',
        left: 'Szakasz n egyenlő részre osztása',
        right: 'Vonalzóval való méregetés nélkül, segédfélegyenessel és párhuzamosokkal pontosan szerkeszthető'
      },
      {
        id: 'pi24',
        left: 'Mértani közép szerkesztése (√ab)',
        right: 'Thálész-körrel és a derékszögű háromszög magasságtételével szerkeszthető'
      }
    ]
  }
];

export const ParallelInterceptMatcher: React.FC<ParallelInterceptMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Párhuzamos szelők tétele – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="parhuzamos-szelok-tetele"
      title={topicTitle}
      subtitle="Gyakorold a párhuzamos szelők és szelőszakaszok tételét, a szakaszfelezési és arányos szerkesztési eljárásokat!"
      levels={PARALLEL_INTERCEPT_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      {...rest}
    />
  );
};

export default ParallelInterceptMatcher;

