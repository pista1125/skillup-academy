import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumbersAgesMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Szöveges Átírás és Alapösszefüggések',
    subtitle: 'Párosítsd a magyar szöveges állításokat a megfelelő algebrai kifejezéssel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Egy szám 3-szorosánál 7-tel több',
        value: '3x + 7'
      },
      {
        id: 'p2',
        prompt: 'Egy szám fele csökkentve 4-gyel',
        value: 'x / 2 - 4'
      },
      {
        id: 'p3',
        prompt: 'Két szám aránya 2 : 5',
        value: '2x  és  5x'
      },
      {
        id: 'p4',
        prompt: 'Három egymást követő egész szám',
        value: 'n,  n + 1,  n + 2'
      },
      {
        id: 'p5',
        prompt: 'Egymást követő páros számok',
        value: '2k,  2k + 2,  2k + 4'
      },
      {
        id: 'p6',
        prompt: 'Egymást követő páratlan számok',
        value: '2k + 1,  2k + 3,  2k + 5'
      },
      {
        id: 'p7',
        prompt: 'Egy szám 15%-kal megnövelve',
        value: '1,15x'
      },
      {
        id: 'p8',
        prompt: 'Két szám összege 40, egyik x',
        value: 'A másik: 40 - x'
      },
      {
        id: 'p9',
        prompt: 'Két szám különbsége 12, kisebb x',
        value: 'A nagyobb: x + 12'
      },
      {
        id: 'p10',
        prompt: 'Maradékos osztás (osztó 7, maradék 3)',
        value: '7q + 3'
      }
    ]
  },
  2: {
    title: '2. Szint: Kétjegyű Számok és Életkori Modellek',
    subtitle: 'Párosítsd a helyiértékes formulákat és az életkori összefüggéseket!',
    pairs: [
      {
        id: 'p11',
        prompt: 'Kétjegyű szám (tízes a, egyes b)',
        value: '10a + b'
      },
      {
        id: 'p12',
        prompt: 'Számjegyek felcserélése után',
        value: '10b + a'
      },
      {
        id: 'p13',
        prompt: 'Eredeti és felcserélt szám különbsége',
        value: 'Mindig 9(a - b)'
      },
      {
        id: 'p14',
        prompt: 'Eredeti és felcserélt szám összege',
        value: 'Mindig 11(a + b)'
      },
      {
        id: 'p15',
        prompt: 'Apa kora t év múlva (most A)',
        value: 'A + t'
      },
      {
        id: 'p16',
        prompt: 'Gyerek kora k évvel ezelőtt (most G)',
        value: 'G - k'
      },
      {
        id: 'p17',
        prompt: 'Két személy életkorának különbsége',
        value: 'Időben mindig állandó'
      },
      {
        id: 'p18',
        prompt: 'Anya 3-szor annyi idős, mint lánya',
        value: 'A = 3 · L'
      },
      {
        id: 'p19',
        prompt: 'Háromjegyű szám értéke',
        value: '100a + 10b + c'
      },
      {
        id: 'p20',
        prompt: 'Számjegyek összege 10, tízes jegy x',
        value: 'Egyes jegy: 10 - x'
      }
    ]
  },
  3: {
    title: '3. Szint: Konkrét Feladatok és Megoldásaik',
    subtitle: 'Párosítsd a szöveges feladványokat a pontos végeredményükkel!',
    pairs: [
      {
        id: 'p21',
        prompt: 'Anya most 36, lánya 8. Mikor lesz 3-szorosa?',
        value: '6 év múlva'
      },
      {
        id: 'p22',
        prompt: 'Két szám összege 75, arányuk 2 : 3',
        value: '30 és 45'
      },
      {
        id: 'p23',
        prompt: '3 egymást követő páros szám összege 102',
        value: 'Legkisebb: 32'
      },
      {
        id: 'p24',
        prompt: 'Jegyei összege 9, felcserélve +27-tel nő',
        value: 'Eredeti szám: 36'
      },
      {
        id: 'p25',
        prompt: 'Péter kétszer annyi idős, mint Anna, 5 éve 3-szorosa',
        value: 'Péter most 20 éves'
      },
      {
        id: 'p26',
        prompt: 'Gondolt szám 4-szerese + 15 = hétszerese - 21',
        value: 'Gondolt szám: 12'
      },
      {
        id: 'p27',
        prompt: 'Egy szám harmada 8-cal kisebb a felénél',
        value: 'A keresett szám: 48'
      },
      {
        id: 'p28',
        prompt: 'Apa 40, fia 16. Hány éve volt 3-szorosa?',
        value: '4 évvel ezelőtt'
      },
      {
        id: 'p29',
        prompt: '3 testvér kora 2-2 év eltéréssel, összegük 42',
        value: '12, 14 és 16 évesek'
      },
      {
        id: 'p30',
        prompt: 'Jegyei összege 12, a tízes 2-szerese az egyesnek',
        value: 'A szám: 84'
      }
    ]
  }
};

export const NumbersAgesMatcher: React.FC<NumbersAgesMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-numbers-ages-matcher',
  topicTitle = '2. Szöveges feladatok számokról, életkorokról'
}) => {
  return (
    <MatcherTemplate
      title="Szöveges Feladatok Párosító"
      subtitle="Keresd meg a mondatok matematikai párját, helyiértékes formuláit és a feladatok megoldásait!"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • 👥 PÁROSÍTÓ"
      levels={matcherLevels}
      currentLevel={level}
      themeColor="rose"
      topicId={topicId}
      topicTitle={topicTitle}
      grade={8}
      chapterId="egyenletek"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default NumbersAgesMatcher;
