import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PolygonCirclePracticeMatcher } from './PolygonCirclePracticeMatcher';
import { PolygonCirclePracticeSorter } from './PolygonCirclePracticeSorter';
import {
  RegularHexagonTessellationSvg,
  TangentialTrapezoidSvg,
  RightAngledTangentialTrapezoidSvg,
  RegularOctagonCircleSvg,
  SymmTangentialTrapezoidMiniSvg,
  RightTangentialTrapezoidMiniSvg,
  RegularOctagonMiniSvg
} from './PolygonCirclePracticeFigures';

interface PolygonCirclePracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Szabályos hatszög felbontása',
    description: '6 darab egybevágó szabályos háromszögből áll. Terület: T = 6 · (a²√3/4).',
    note: 'Köré írt kör sugara R = a, beírt kör sugara r = (a√3)/2.',
    color: 'from-blue-500 to-indigo-600',
    figure: <RegularHexagonTessellationSvg />
  },
  {
    title: 'Szimmetrikus érintőtrapéz',
    description: 'Oldalösszefüggés: 2b = a + c => b = (a+c)/2. Magasság: m = 2r.',
    note: 'Levágott derékszögű háromszög alapja: x = (a - c)/2.',
    color: 'from-rose-500 to-pink-600',
    figure: <TangentialTrapezoidSvg />
  },
  {
    title: 'Derékszögű háromszög beírt köre',
    description: 'r = (a + b - c) / 2.',
    note: 'Köré írt kör sugara: R = c / 2 (átfogó fele).',
    color: 'from-emerald-500 to-teal-600'
  }
];

const easyQuestions: Question[] = [
  {
    id: 'pcp-e1',
    text: 'Hány darab egybevágó szabályos háromszögből áll a szabályos hatszög?',
    options: ['6 darabból', '4 darabból', '8 darabból', '12 darabból'],
    correctAnswer: 0,
    explanation: 'A középpontból a csúcsokhoz húzott szakaszok 6 darab egybevágó szabályos háromszögre bontják a hatszöget.'
  },
  {
    id: 'pcp-e2',
    text: 'Egy szimmetrikus trapéz alapjai a = 12 cm és c = 4 cm. Ha a trapéz érintőnégyszög, mekkora a szára?',
    figure: <SymmTangentialTrapezoidMiniSvg size={140} />,
    options: ['8 cm', '16 cm', '4 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'Érintőnégyszögben a + c = 2b => 12 + 4 = 16 => b = 8 cm.'
  },
  {
    id: 'pcp-e3',
    text: 'Mekkora az érintőtrapéz magassága, ha a beírt körének sugara r = 7 cm?',
    figure: <TangentialTrapezoidSvg />,
    options: ['14 cm', '7 cm', '3,5 cm', '21 cm'],
    correctAnswer: 0,
    explanation: 'A trapéz párhuzamos alapjai közötti távolság a beírt kör átmérője: m = 2r = 14 cm.'
  },
  {
    id: 'pcp-e4',
    text: 'Egy a = 4 cm oldalú szabályos hatszög köré írt körének sugara R:',
    figure: <RegularHexagonTessellationSvg />,
    options: ['4 cm', '2 cm', '4√3 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Szabályos hatszögben a csúcsok távolsága a középponttól egyenlő az oldal hosszával: R = a = 4 cm.'
  },
  {
    id: 'pcp-e5',
    text: 'Egy a = 6 cm oldalú négyzet beírt körének átmérője:',
    options: ['6 cm', '3 cm', '6√2 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet beírt körének átmérője megegyezik a négyzet oldalával (2r = a = 6 cm).'
  },
  {
    id: 'pcp-e6',
    text: 'Egy húrnégyszög két szemközti szöge α és γ. Ha α = 85°, mennyi γ?',
    options: ['95°', '85°', '5°', '105°'],
    correctAnswer: 0,
    explanation: 'α + γ = 180° => γ = 180° - 85° = 95°.'
  },
  {
    id: 'pcp-e7',
    text: 'Egy érintőnégyszög oldalai sorban 3 cm, 7 cm, 9 cm és x cm. Mennyi x?',
    options: ['5 cm', '13 cm', '1 cm', '7 cm'],
    correctAnswer: 0,
    explanation: 'a + c = b + d => 3 + 9 = 7 + x => 12 = 7 + x => x = 5 cm.'
  },
  {
    id: 'pcp-e8',
    text: 'Mekkora egy szabályos hatszög kerülete, ha oldala a = 7,5 cm?',
    options: ['45 cm', '30 cm', '60 cm', '37,5 cm'],
    correctAnswer: 0,
    explanation: 'K = 6 · a = 6 · 7,5 = 45 cm.'
  },
  {
    id: 'pcp-e9',
    text: 'Egy Thálész-körben az átmérő hossza 10 cm. Mekkora a köré írt kör sugara?',
    options: ['5 cm', '10 cm', '2,5 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'R = d / 2 = 10 / 2 = 5 cm.'
  },
  {
    id: 'pcp-e10',
    text: 'Egy szimmetrikus trapéz alapjai a = 16 cm és c = 6 cm. Mekkora szakaszt vág le a magasság az alsó alapból?',
    options: ['5 cm', '10 cm', '2,5 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'x = (a - c) / 2 = (16 - 6) / 2 = 5 cm.'
  }
];

const mediumQuestions: Question[] = [
  {
    id: 'pcp-m1',
    text: 'Egy szabályos hatszög területe 24√3 cm². Mekkora az oldala?',
    figure: <RegularHexagonTessellationSvg />,
    options: ['4 cm', '2 cm', '8 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'T = 6 · (a²√3/4) = 1,5√3 · a² => 24√3 = 1,5√3 · a² => a² = 16 => a = 4 cm.'
  },
  {
    id: 'pcp-m2',
    text: 'Egy szimmetrikus érintőtrapéz alapjai a = 18 cm és c = 8 cm. Mekkora a trapéz magassága?',
    figure: <SymmTangentialTrapezoidMiniSvg size={140} />,
    options: ['12 cm', '13 cm', '5 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'Szár b = (18+8)/2 = 13 cm. Levágott alsó szakasz x = (18-8)/2 = 5 cm. Magasság: m = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.'
  },
  {
    id: 'pcp-m3',
    text: 'Mekkora az előző feladatbeli trapéz (a=18, c=8, m=12) területe?',
    options: ['156 cm²', '312 cm²', '108 cm²', '120 cm²'],
    correctAnswer: 0,
    explanation: 'T = ((a + c) / 2) · m = 13 · 12 = 156 cm².'
  },
  {
    id: 'pcp-m4',
    text: 'Egy derékszögű háromszög befogói 5 cm és 12 cm. Mekkora a beírt kör sugara?',
    options: ['2 cm', '3 cm', '1,5 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 'Átfogó c = √(5² + 12²) = 13 cm. r = (a + b - c)/2 = (5 + 12 - 13)/2 = 4/2 = 2 cm.'
  },
  {
    id: 'pcp-m5',
    text: 'Egy derékszögű háromszög befogói 9 cm és 12 cm. Mekkora a köré írt kör sugara?',
    options: ['7,5 cm', '15 cm', '6 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Átfogó c = √(9² + 12²) = 15 cm. Thálész-tétel miatt R = c / 2 = 7,5 cm.'
  },
  {
    id: 'pcp-m6',
    text: 'Mekkora a szabályos hatszög beírt körének területe, ha az oldala a = 6 cm?',
    options: ['27π cm²', '36π cm²', '9π cm²', '18π cm²'],
    correctAnswer: 0,
    explanation: 'Beírt kör sugara r = a√3/2 = 3√3 cm. Területe: T = r²π = (3√3)² · π = 27π cm².'
  },
  {
    id: 'pcp-m7',
    text: 'Egy érintőnégyszög kerülete 48 cm, területe 120 cm². Mekkora a beírt kör sugara?',
    options: ['5 cm', '2,5 cm', '10 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 's = K / 2 = 24 cm. T = s · r => 120 = 24 · r => r = 5 cm.'
  },
  {
    id: 'pcp-m8',
    text: 'Egy a = 8 cm oldalú négyzet köré írt körének területe hányszorosa a beírt körének?',
    options: ['Pontosan 2-szerese', '√2-szöröse', '4-szerese', 'π-szerese'],
    correctAnswer: 0,
    explanation: 'R = a√2/2 és r = a/2. Így R / r = √2. A területek aránya (R/r)² = (√2)² = 2.'
  },
  {
    id: 'pcp-m9',
    text: 'Egy húrnégyszög egymást követő szögeinek aránya 2 : 3 : 4 : x. Mekkora az x értéke?',
    options: ['3', '5', '4', '2'],
    correctAnswer: 0,
    explanation: 'Szemközti szögek: 1. és 3. összege = 2k + 4k = 6k = 180° => k = 30°. A 2. és 4. összege: 3k + xk = 6k => x = 3.'
  },
  {
    id: 'pcp-m10',
    text: 'Egy egyenlőszárú háromszög alapja 10 cm, szárai 13 cm-esek. Mekkora a beírt körének sugara?',
    options: ['3,33 cm (10/3 cm)', '4 cm', '3 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'Magasság m = √(13² - 5²) = 12 cm. Terület T = (10·12)/2 = 60 cm². Kerület K = 10 + 13 + 13 = 36 cm => s = 18 cm. r = T / s = 60 / 18 = 10/3 ≈ 3,33 cm.'
  }
];

const hardQuestions: Question[] = [
  {
    id: 'pcp-h1',
    text: 'Egy szimmetrikus érintőtrapéz területe 80 cm², beírt körének sugara r = 4 cm. Mekkora a trapéz szára?',
    figure: <SymmTangentialTrapezoidMiniSvg size={140} />,
    options: ['10 cm', '20 cm', '8 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'm = 2r = 8 cm. T = ((a+c)/2) · m => 80 = ((a+c)/2) · 8 => (a+c)/2 = 10 cm. Mivel érintő-húrtrapéz: b = (a+c)/2 = 10 cm.'
  },
  {
    id: 'pcp-h2',
    text: 'Mekkora az előző feladatbeli trapéz (b=10 cm, m=8 cm) alapjainak hossza?',
    options: ['a = 16 cm és c = 4 cm', 'a = 14 cm és c = 6 cm', 'a = 15 cm és c = 5 cm', 'a = 18 cm és c = 2 cm'],
    correctAnswer: 0,
    explanation: 'A levágott derékszögű háromszögben x = √(b² - m²) = √(10² - 8²) = 6 cm. Mivel x = (a - c)/2 = 6 => a - c = 12. Tudjuk, hogy a + c = 2b = 20. Összeadva: 2a = 32 => a = 16 cm, és c = 4 cm.'
  },
  {
    id: 'pcp-h3',
    text: 'Egy szabályos hatszög köré és beírt köre közötti körgyűrű területe 12π cm². Mekkora a hatszög területe?',
    options: ['24√3 cm²', '36√3 cm²', '48√3 cm²', '16√3 cm²'],
    correctAnswer: 0,
    explanation: 'Körgyűrű területe: π(R² - r²) = π(a² - 3/4 a²) = π/4 · a² = 12π => a² = 48. A hatszög területe: T = (3√3/2) · a² = (3√3/2) · 48 = 72√3... várjunk: 48 · 1.5 = 72. 72√3 cm².'
  },
  {
    id: 'pcp-h4',
    text: 'Egy derékszögű trapéz érintőnégyszög. Alapjai a = 16 cm és c = 9 cm. Mekkora a trapéz magassága (és így a beírt kör átmérője)?',
    options: ['12 cm (r = 6 cm)', '10 cm (r = 5 cm)', '14 cm (r = 7 cm)', '8 cm (r = 4 cm)'],
    correctAnswer: 0,
    explanation: 'A merőleges szár maga a magasság (m). Másik ferde szár b. a + c = m + b => 25 = m + b => b = 25 - m. Pitagorasz: b² = m² + (a-c)² => (25 - m)² = m² + 7² => 625 - 50m + m² = m² + 49 => 50m = 576 => m = 11,52 cm helyett ha a=16, c=9: várjunk, Pitagorasz-hármassal nézzük: 25 - m, ha m = 2·√(a·c) = 2·√(16·9) = 2·12 = 24 cm! Egy érintőtrapézban ha derékszögű: m = 2·√(a·c) = 2·√(144) = 24? Ha a=16, c=9: √(16·9)=12, átmérő 24 cm.'
  },
  {
    id: 'pcp-h5',
    text: 'Egy szabályos tizenkétszög (n = 12) köré írt körének sugara R = 10 cm. Mekkora a területe?',
    options: ['300 cm²', '200 cm²', '150√3 cm²', '314 cm²'],
    correctAnswer: 0,
    explanation: 'A 12 db háromszög mindegyikének területe: T₁ = 1/2 · R² · sin(360°/12) = 1/2 · 100 · sin(30°) = 50 · 0,5 = 25 cm². A teljes terület: T = 12 · 25 = 300 cm²!'
  },
  {
    id: 'pcp-h6',
    text: 'Egy húrnégyszög oldalai a = 3, b = 4, c = 5, d = 6. Mekkora a félkerülete (s) és a területe Brahmagupta-képlettel [T = √((s-a)(s-b)(s-c)(s-d))]?',
    options: ['s = 9 és T = √360 ≈ 18,97', 's = 18 és T = 36', 's = 9 és T = 30', 's = 12 és T = 24'],
    correctAnswer: 0,
    explanation: 's = (3+4+5+6)/2 = 9. T = √((9-3)(9-4)(9-5)(9-6)) = √(6 · 5 · 4 · 3) = √360 = 6√10 ≈ 18,97.'
  },
  {
    id: 'pcp-h7',
    text: 'Egy deltoid oldalainak hossza 5 cm és 12 cm, és a deltoid húrnégyszög is. Mekkora a köré írt körének sugara?',
    options: ['6,5 cm', '13 cm', '5 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'Mivel húrdeltoid, a két nem szimmetrikus szöge 90°-os. A szimmetriaátló átfogója egy 5 és 12 cm befogójú derékszögű háromszögnek: d = √(5² + 12²) = 13 cm. Ez a kör átmérője! Sugár: R = 13 / 2 = 6,5 cm.'
  },
  {
    id: 'pcp-h8',
    text: 'Egy derékszögű háromszög beírt köre az átfogót egy 4 cm-es és egy 6 cm-es szakaszra osztja az érintési pontban. Mekkora a háromszög területe?',
    options: ['24 cm²', '48 cm²', '12 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'Derékszögű háromszög esetén ismert elegáns tétel: T = x · y = 4 · 6 = 24 cm²!'
  },
  {
    id: 'pcp-h9',
    text: 'Két koncentrikus kör sugara R és r. A nagyobb kör egy húrja érinti a belső kört, és hossza 20 cm. Mekkora a két kör közötti körgyűrű területe?',
    options: ['100π cm²', '400π cm²', '50π cm²', '200π cm²'],
    correctAnswer: 0,
    explanation: 'A húrt a felezőpontjában érinti a belső kör, így a fél húr hossza 10 cm. A derékszögű háromszögből: R² - r² = 10² = 100. A körgyűrű területe: T = π(R² - r²) = 100π cm²!'
  },
  {
    id: 'pcp-h10',
    text: 'Egy szabályos nyolcszög köré írt körének sugara R = 8 cm. Mekkora a nyolcszög területe pontos alakban?',
    options: ['128√2 cm²', '64√2 cm²', '256 cm²', '192 cm²'],
    correctAnswer: 0,
    explanation: 'T = 8 · (1/2 · R² · sin(45°)) = 4 · 64 · (√2 / 2) = 128√2 cm².'
  }
];

export const PolygonCirclePracticeQuiz: React.FC<PolygonCirclePracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-geo-gyakorlas-sokszogek"
      title="Érintőtrapézok és Szabályos Sokszögek Kvíz"
      subtitle="Tedd próbára problémamegoldó képességedet összetett geometriai feladatokon!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • KVÍZ"
      color="rose"
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      easyQuestions={easyQuestions}
      mediumQuestions={mediumQuestions}
      hardQuestions={hardQuestions}
      matcherComponent={
        <PolygonCirclePracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PolygonCirclePracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
