import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface GraphReadingMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'm1-1',
    prompt: 'Zérushely a grafikonon',
    value: 'A pont, ahol a görbe metszi az x-tengelyt (y = 0)',
  },
  {
    id: 'm1-2',
    prompt: 'Függvény maximuma',
    value: 'A grafikon legmagasabb pontja (legnagyobb y érték)',
  },
  {
    id: 'm1-3',
    prompt: 'Függvény minimuma',
    value: 'A grafikon legmélyebb pontja (legkisebb y érték)',
  },
  {
    id: 'm1-4',
    prompt: 'Vízszintes (konstans) szakasz',
    value: 'Az y értéke nem változik az idő múlásával sem',
  },
  {
    id: 'm1-5',
    prompt: 'Vízszintes (x) tengely',
    value: 'A független változó tengelye (pl. idő, darabszám)',
  },
  {
    id: 'm1-6',
    prompt: 'Függőleges (y) tengely',
    value: 'A függő változó tengelye (pl. út, hőfok, liter)',
  },
  {
    id: 'm1-7',
    prompt: 'Monoton növekvő szakasz',
    value: 'Balról jobbra haladva emelkedik a grafikon',
  },
  {
    id: 'm1-8',
    prompt: 'Monoton csökkenő szakasz',
    value: 'Balról jobbra haladva süllyed a grafikon',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'm2-1',
    prompt: 'Út–idő: Vízszintes szakasz',
    value: 'A jármű áll, sebessége 0 km/h (pihenő)',
  },
  {
    id: 'm2-2',
    prompt: 'Út–idő: Meredekebb egyenes',
    value: 'Nagyobb sebességű, gyorsabb egyenletes haladás',
  },
  {
    id: 'm2-3',
    prompt: 'Hőmérséklet: Grafikon az x-tengely alatt',
    value: 'Fagyáspont alatti negatív hőmérséklet (T < 0 °C)',
  },
  {
    id: 'm2-4',
    prompt: 'Hőmérséklet: Grafikon metszi az x-tengelyt',
    value: 'Pontosan 0 °C fagyáspont elérése',
  },
  {
    id: 'm2-5',
    prompt: 'Víztartály: Süllyedő egyenes vonal',
    value: 'A folyadék egyenletes leengedése a tartályból',
  },
  {
    id: 'm2-6',
    prompt: 'Sebesség–idő: Lefelé lejtő egyenes',
    value: 'Fékezés, a jármű sebességének egyenletes csökkenése',
  },
  {
    id: 'm2-7',
    prompt: 'Kiindulás az origóból (0; 0)',
    value: '0 másodperc elteltével 0 méter megtett távolság',
  },
  {
    id: 'm2-8',
    prompt: 'Magasság–idő: Csúcspont (maximum)',
    value: 'A hegycsúcs vagy dombtető legmagasabb pontja',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'm3-1',
    prompt: 'f(3) = 7',
    value: 'A grafikon átmegy a P(3; 7) ponton',
  },
  {
    id: 'm3-2',
    prompt: 'Zérushely: x = 5',
    value: 'A grafikon az (5; 0) pontban metszi az x-tengelyt',
  },
  {
    id: 'm3-3',
    prompt: 'y-tengelymetszet: (0; -4)',
    value: 'A függőleges tengelyt a -4 értéknél metszi: f(0) = -4',
  },
  {
    id: 'm3-4',
    prompt: 'Maximum pont: M(2; 9)',
    value: 'A legnagyobb felvett érték y = 9, ami x = 2-nél van',
  },
  {
    id: 'm3-5',
    prompt: 'Minimum pont: N(4; -3)',
    value: 'A legkisebb felvett érték y = -3, ami x = 4-nél van',
  },
  {
    id: 'm3-6',
    prompt: 'Konstans szakasz az [1; 4] intervallumon',
    value: 'x = 1 és x = 4 között a vízszintes vonalon y állandó',
  },
  {
    id: 'm3-7',
    prompt: 'Negatív zérushely: x = -2',
    value: 'A grafikon a (-2; 0) pontban keresztezi a vízszintes tengelyt',
  },
  {
    id: 'm3-8',
    prompt: 'f(x) = 6 megoldása: x = 1 és x = 5',
    value: 'A grafikon két különböző helyen is eléri a 6-os magasságot',
  },
];

export const GraphReadingMatcher: React.FC<GraphReadingMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-graph',
}) => {
  return (
    <MatcherTemplate
      title="Grafikon-leolvasás Párosító"
      subtitle="Találd meg az összetartozó fogalmakat, folyamatokat és koordináta-értékeket!"
      topicTitle="3. Olvassunk a grafikonról!"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="cyan"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: Grafikonos alapfogalmak',
          description: 'Párosítsd a grafikon jellegzetes elemeit azok szabatos meghatározásával!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Valós folyamatok a grafikonon',
          description: 'Párosítsd a grafikon szakaszait a fizikai és mindennapi eseményekkel!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Koordináták és leolvasott értékek',
          description: 'Kösd össze a függvényértékeket a grafikon megfelelő pontjaival!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default GraphReadingMatcher;
