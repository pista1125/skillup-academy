import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BlueprintMatcherProps {
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

const BLUEPRINT_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Alapvető méretarányok és rajzi jelölések',
    description: 'Párosítsd a méretarányokat és a műszaki rajzok alapszabályait a jelentésükkel!',
    pairs: [
      {
        id: 'bp1',
        left: 'M = 1 : 100 építészeti tervrajzon',
        right: 'A rajzon mért 1 cm a valóságban 100 cm = 1 méternek felel meg'
      },
      {
        id: 'bp2',
        left: 'M = 1 : 50 kivitelezési tervrajzon',
        right: 'A rajzon mért 1 cm a valóságban 50 cm = 0,5 méter'
      },
      {
        id: 'bp3',
        left: 'M = 1 : 200 helyszínrajzon',
        right: 'A rajzon mért 1 cm a valóságban 200 cm = 2 méter'
      },
      {
        id: 'bp4',
        left: 'M = 5 : 1 nagyítású műszaki rajzon',
        right: 'A rajzbeli méret a valóságos méret 5-szöröse (mikromechanika)'
      },
      {
        id: 'bp5',
        left: 'M = 1 : 1 természetes nagyság',
        right: 'A rajzon látható alakzat pontosan akkora, mint a valóságban'
      },
      {
        id: 'bp6',
        left: 'Gépészeti rajzon a méretalapegység',
        right: 'Mindig milliméter (mm), a mértékegységet nem írják ki'
      },
      {
        id: 'bp7',
        left: 'Tervrajzra írt kótaszám',
        right: 'Mindig a készülő tárgy valóságos méretét fejezi ki'
      },
      {
        id: 'bp8',
        left: 'Területarány M = 1 : N esetén',
        right: 'A rajzbeli felület a valóságos felületnek 1 / N² -szerese'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: A Gyulai Lovarda és mérnöki számítások',
    description: 'Párosítsd a Gyulai Várfürdő feladat adatát a geometriai ténnyel!',
    pairs: [
      {
        id: 'bp9',
        left: 'Gyulai tartóváz gerenda: 13 036 mm',
        right: 'A valóságban 13,036 méter hosszú fagerenda'
      },
      {
        id: 'bp10',
        left: 'Lovarda úszómedence alapterülete',
        right: '20 méter hosszúságú és 13 méter szélességű'
      },
      {
        id: 'bp11',
        left: 'Medence két hosszanti oldalfala',
        right: 'Párhuzamos síkú derékszögű trapézok (mélységük: 1,2 m és 1,6 m)'
      },
      {
        id: 'bp12',
        left: 'Medence két rövidebb végfala',
        right: 'Téglalapok (13 m × 1,2 m sekély vég és 13 m × 1,6 m mély vég)'
      },
      {
        id: 'bp13',
        left: 'Lovarda úszómedence geometriai teste',
        right: 'Fektetett egyenes trapézalapú hasáb (magassága 13 m)'
      },
      {
        id: 'bp14',
        left: 'Lovarda medence teljes víztérfogata',
        right: 'V = (1,2 + 1,6) / 2 · 20 · 13 = 364 m³ (364 000 liter)'
      },
      {
        id: 'bp15',
        left: 'Medence lejtős fenéklemezének hossza',
        right: 'Pitagorasz-tétellel: √(20² + 0,4²) ≈ 20,004 méter'
      },
      {
        id: 'bp16',
        left: 'Gyulai tető szögeinek összege: 181°',
        right: 'Az egész fokra kerekített mérési értékek kerekítési kumulációja'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Térképi mérések, területek és makettek',
    description: 'Párosítsd a térképészeti, makett- és felületi összefüggéseket!',
    pairs: [
      {
        id: 'bp17',
        left: '1 : 25 000 méretarányú turistatérképen 1 cm',
        right: 'A valóságban 25 000 cm = 250 méter'
      },
      {
        id: 'bp18',
        left: '1 : 50 000 méretarányú térképen 1 cm',
        right: 'A valóságban 50 000 cm = 500 méter (0,5 km)'
      },
      {
        id: 'bp19',
        left: '1 : 100 000 autóstérképen 1 cm',
        right: 'A valóságban 100 000 cm = 1 kilométer'
      },
      {
        id: 'bp20',
        left: '1 : 50 000 térképen mért 4 cm² erdő',
        right: 'A valóságban: 4 · 50 000² cm² = 1 000 000 m² = 100 hektár'
      },
      {
        id: 'bp21',
        left: '1 : 20 méretarányú tömör épületmakett tömege',
        right: 'A térfogat λ³ szerint skálázódik: a valós tömeg 1 / 8000 része (20³)'
      },
      {
        id: 'bp22',
        left: 'Vonalas mérték (grafikus lépték)',
        right: 'A térkép szélére rajzolt kilométer- vagy méterbeosztású mérőléc'
      },
      {
        id: 'bp23',
        left: 'Szintvonalas terepi távolság mérése',
        right: 'A térképi távolság a lejtő vízszintes vetülete, a hegyoldal hosszabb'
      },
      {
        id: 'bp24',
        left: 'Amerikai tervrajz: 1 ft (foot / láb)',
        right: 'Hivatalosan 0,3048 m, gyakorlati kerekítéssel 0,3 m (30 cm)'
      }
    ]
  }
];

export const BlueprintMatcher: React.FC<BlueprintMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Mit mutat a tervrajz? – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="mit-mutat-a-tervrajz"
      title={topicTitle}
      subtitle="Gyakorold a méretarányok értelmezését, a Gyulai Várfürdő geometriáját és a tervrajzi területszámítást!"
      levels={BLUEPRINT_MATCHER_LEVELS}
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

export default BlueprintMatcher;

