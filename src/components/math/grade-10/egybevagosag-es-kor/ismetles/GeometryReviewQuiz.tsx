import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { GeometryReviewMatcher } from './GeometryReviewMatcher';
import { GeometryReviewSorter } from './GeometryReviewSorter';
import {
  GeometryReviewMapSvg,
  ThalesAndAngleSynthesisSvg,
  PillarCongruenceMiniSvg,
  PillarCircleMiniSvg,
  PillarAnglesMiniSvg,
  PillarPolygonsMiniSvg
} from './GeometryReviewFigures';

interface GeometryReviewQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A téma 4 alappillére',
    description: '1. Háromszögek egybevágósága • 2. Kör metrika (K, T) • 3. Szögek (α = 2β, Thálész) • 4. Húr- és érintőnégyszögek.',
    note: 'Használd a képlettárat az összefüggések gyors felidézéséhez!',
    color: 'from-teal-500 to-emerald-600',
    figure: <GeometryReviewMapSvg />
  },
  {
    title: 'Thálész és kerületi szög',
    description: 'Átmérő feletti kerületi szög = 90°. Azonos ívhez tartozó középponti szög a kerületi kétszerese: α = 2β.',
    note: 'Érintő mindig merőleges a sugárra!',
    color: 'from-blue-500 to-cyan-600',
    figure: <ThalesAndAngleSynthesisSvg />
  }
];

const easyQuestions: Question[] = [
  {
    id: 'gr-e1',
    text: 'Melyik NEM alapesete a háromszögek egybevágóságának?',
    figure: <PillarCongruenceMiniSvg size={130} />,
    options: ['sz-sz-sz (három szög megegyezik)', 'o-o-o (három oldal)', 'o-sz-o (két oldal és közbezárt szög)', 'sz-o-sz (egy oldal és rajta fekvő két szög)'],
    correctAnswer: 0,
    explanation: 'A három egyenlő szög csak hasonlóságot garantál, egybevágóságot nem (a háromszög lehet kisebb vagy nagyobb).'
  },
  {
    id: 'gr-e2',
    text: 'Mennyi a r = 5 cm sugarú kör kerülete (π ≈ 3,14)?',
    figure: <PillarCircleMiniSvg size={130} />,
    options: ['31,4 cm', '15,7 cm', '78,5 cm', '62,8 cm'],
    correctAnswer: 0,
    explanation: 'K = 2rπ = 2 · 5 · 3,14 = 31,4 cm.'
  },
  {
    id: 'gr-e3',
    text: 'Mennyi a r = 10 cm sugarú kör területe?',
    options: ['100π cm²', '20π cm²', '50π cm²', '200π cm²'],
    correctAnswer: 0,
    explanation: 'T = r²π = 10² · π = 100π cm².'
  },
  {
    id: 'gr-e4',
    text: 'Ha egy körben a középponti szög α = 80°, mekkora az azonos ívhez tartozó kerületi szög β?',
    figure: <PillarAnglesMiniSvg size={130} />,
    options: ['40°', '80°', '160°', '20°'],
    correctAnswer: 0,
    explanation: 'A kerületi szög a középponti szög fele: β = α / 2 = 40°.'
  },
  {
    id: 'gr-e5',
    text: 'Mekkora szög látszik a kör átmérőjéből a kör bármely pontjából (Thálész-tétel)?',
    figure: <ThalesAndAngleSynthesisSvg />,
    options: ['90°', '60°', '45°', '180°'],
    correctAnswer: 0,
    explanation: 'A Thálész-tétel értelmében az átmérő fölé rajzolt kerületi szög derékszög (90°).'
  },
  {
    id: 'gr-e6',
    text: 'Melyik összefüggés érvényes a húrnégyszögekre?',
    figure: <PillarPolygonsMiniSvg size={130} />,
    options: ['α + γ = 180° (szemközti szögek összege 180°)', 'a + c = b + d', 'Átlói merőlegesek', 'Minden oldala egyenlő'],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti belső szögek összege 180°.'
  },
  {
    id: 'gr-e7',
    text: 'Melyik összefüggés érvényes az érintőnégyszögekre?',
    figure: <PillarPolygonsMiniSvg size={130} />,
    options: ['a + c = b + d (szemközti oldalak összege egyenlő)', 'α + γ = 180°', 'Átlói felezik egymást', 'Minden szöge derékszög'],
    correctAnswer: 0,
    explanation: 'Érintőnégyszögben a szemközti oldalak összege egyenlő.'
  },
  {
    id: 'gr-e8',
    text: 'Mekkora a szabályos hatszög köré írt körének sugara (R), ha oldala a = 12 cm?',
    options: ['12 cm', '6 cm', '12√3 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög köré írt körének sugara megegyezik a hatszög oldalával: R = a = 12 cm.'
  },
  {
    id: 'gr-e9',
    text: 'Mekkora az ív hossza, ha a kör sugara r = 18 cm és a középponti szög α = 60°?',
    options: ['6π cm', '3π cm', '12π cm', '18π cm'],
    correctAnswer: 0,
    explanation: 'i = 2rπ · (60° / 360°) = 36π · (1/6) = 6π cm.'
  },
  {
    id: 'gr-e10',
    text: 'Melyik négyszög egyszerre mindig húrnégyszög és érintőnégyszög is?',
    options: ['Négyzet', 'Téglalap', 'Rombusz', 'Általános trapéz'],
    correctAnswer: 0,
    explanation: 'A négyzet szögei 90°-osak (húrnégyszög), és oldalai egyenlők (érintőnégyszög).'
  }
];

const mediumQuestions: Question[] = [
  {
    id: 'gr-m1',
    text: 'Melyik egybevágósági alapeset követeli meg, hogy a szög a NAGYOBBIK oldallal szemben legyen?',
    options: ['o-o-sz (két oldal és egy szög)', 'o-sz-o', 'sz-o-sz', 'o-o-o'],
    correctAnswer: 0,
    explanation: 'Ha a megadott szög nem a nagyobbik oldallal szemközti, akkor a szerkesztés során két különböző háromszög is kapható (nem egyértelmű).'
  },
  {
    id: 'gr-m2',
    text: 'Egy körcikk sugara r = 6 cm, középponti szöge α = 90°. Mekkora a teljes határoló kerülete?',
    options: ['3π + 12 cm', '3π cm', '6π + 12 cm', '9π cm'],
    correctAnswer: 0,
    explanation: 'Az ív i = 2rπ · (90°/360°) = 12π/4 = 3π cm. A körcikk határoló kerülete: K = i + 2r = 3π + 12 cm.'
  },
  {
    id: 'gr-m3',
    text: 'Egy húrnégyszög egymást követő szögei 70°, 110°, 110° és x. Mennyi az x értéke?',
    options: ['70°', '110°', '80°', '90°'],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti szögek összege 180°: 1. és 3. összege 70° + 110° = 180°, 2. és 4. összege 110° + x = 180° => x = 70°.'
  },
  {
    id: 'gr-m4',
    text: 'Egy érintőtrapéz alapjai a = 15 cm és c = 5 cm. Mekkora a szára, ha a trapéz szimmetrikus?',
    options: ['10 cm', '20 cm', '5 cm', '15 cm'],
    correctAnswer: 0,
    explanation: '2b = a + c = 15 + 5 = 20 => b = 10 cm.'
  },
  {
    id: 'gr-m5',
    text: 'Mekkora a beírt kör sugara egy a = 6 cm oldalú négyzetben?',
    options: ['3 cm', '6 cm', '3√2 cm', '1,5 cm'],
    correctAnswer: 0,
    explanation: 'r = a / 2 = 6 / 2 = 3 cm.'
  },
  {
    id: 'gr-m6',
    text: 'Egy körben az egyik kerületi szög 35°. Mekkora az ugyanahhoz az ívhez tartozó középponti szög?',
    options: ['70°', '35°', '17,5°', '140°'],
    correctAnswer: 0,
    explanation: 'A középponti szög a kerületi szög kétszerese: α = 2 · 35° = 70°.'
  },
  {
    id: 'gr-m7',
    text: 'Két kör sugara R = 8 cm és r = 6 cm (koncentrikusak). Mekkora a körgyűrű területe?',
    options: ['28π cm²', '100π cm²', '14π cm²', '48π cm²'],
    correctAnswer: 0,
    explanation: 'T = π(R² - r²) = π(64 - 36) = 28π cm².'
  },
  {
    id: 'gr-m8',
    text: 'Egy derékszögű háromszög átfogója c = 16 cm. Mekkora a köré írt kör sugara?',
    options: ['8 cm', '16 cm', '4 cm', '32 cm'],
    correctAnswer: 0,
    explanation: 'Thálész-tétel szerint az átfogó felezőpontja a körülírt kör középpontja: R = c / 2 = 8 cm.'
  },
  {
    id: 'gr-m9',
    text: 'Egy körcikk területe 24π cm², sugara r = 12 cm. Mekkora a középponti szöge?',
    options: ['60°', '30°', '45°', '90°'],
    correctAnswer: 0,
    explanation: 'A teljes kör területe T = 144π cm². 24π / 144π = 1/6 része a körnek. Így α = 360° / 6 = 60°.'
  },
  {
    id: 'gr-m10',
    text: 'Mekkora a szabályos hatszög beírt körének sugara r, ha oldala a = 8 cm?',
    options: ['4√3 cm', '8 cm', '4 cm', '8√3 cm'],
    correctAnswer: 0,
    explanation: 'r = a√3/2 = 8√3 / 2 = 4√3 cm.'
  }
];

const hardQuestions: Question[] = [
  {
    id: 'gr-h1',
    text: 'Egy szimmetrikus érintőtrapéz területe 96 cm², beírt körének sugara r = 4 cm. Mekkora a trapéz szára?',
    options: ['12 cm', '24 cm', '8 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'Magasság m = 2r = 8 cm. T = ((a+c)/2) · m => 96 = ((a+c)/2) · 8 => (a+c)/2 = 12 cm. Szimmetrikus érintőtrapéznál a szár b = (a+c)/2 = 12 cm.'
  },
  {
    id: 'gr-h2',
    text: 'Egy derékszögű háromszög befogói 7 cm és 24 cm. Mekkora a beírt körének sugara r?',
    options: ['3 cm', '4 cm', '2,5 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'Átfogó c = √(7² + 24²) = √(49 + 576) = √625 = 25 cm. r = (a + b - c)/2 = (7 + 24 - 25)/2 = 6/2 = 3 cm.'
  },
  {
    id: 'gr-h3',
    text: 'Egy a = 10 cm oldalú szabályos háromszögbe és köré kört rajzolunk. Mekkora a két kör sugarának aránya (R / r)?',
    options: ['2 : 1', '√3 : 1', '4 : 1', '3 : 1'],
    correctAnswer: 0,
    explanation: 'Szabályos háromszögben a súlypont 2:1 arányban osztja a magasságot: R = 2m/3 és r = m/3, így R / r = 2.'
  },
  {
    id: 'gr-h4',
    text: 'Egy kör két pontja A és B. Az AB ívhez tartozó kerületi szög 42°. Mekkora szögben látszik az AB ív a kör középpontjából?',
    options: ['84°', '42°', '21°', '138°'],
    correctAnswer: 0,
    explanation: 'A középponti szög kétszerese a kerületi szögnek: α = 2 · 42° = 84°.'
  },
  {
    id: 'gr-h5',
    text: 'Egy szabályos hatszög területe 96√3 cm². Mekkora a köré írt kör területe?',
    options: ['64π cm²', '32π cm²', '16π cm²', '128π cm²'],
    correctAnswer: 0,
    explanation: 'T = (3√3 / 2) · a² = 96√3 => a² = 96 · 2 / 3 = 64 => a = 8 cm. Köré írt kör sugara R = a = 8 cm. Területe: T = R²π = 64π cm².'
  },
  {
    id: 'gr-h6',
    text: 'Egy érintőnégyszög kerülete K = 50 cm, területe T = 150 cm². Mekkora a beírt kör sugara?',
    options: ['6 cm', '3 cm', '5 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'Félkerület s = K / 2 = 25 cm. T = s · r => 150 = 25 · r => r = 6 cm.'
  },
  {
    id: 'gr-h7',
    text: 'Egy húrnégyszög szögei aránya 1 : 2 : 5 : 4. Mekkora a legnagyobb szöge fokban?',
    options: ['150°', '120°', '135°', '160°'],
    correctAnswer: 0,
    explanation: 'Szemközti szögek: 1k + 5k = 6k = 180° => k = 30°. (Másik pár: 2k + 4k = 6k = 180°, szintén stimmel). A szögek: 30°, 60°, 150°, 120°. A legnagyobb szög 150°.'
  },
  {
    id: 'gr-h8',
    text: 'Egy körben egy 12 cm hosszú húr távolsága a középponttól 8 cm. Mekkora a kör sugara?',
    options: ['10 cm', '14 cm', '√208 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'A középpontból a húrra bocsátott merőleges felezi a húrt (fél húr = 6 cm). Pitagorasz: r = √(6² + 8²) = 10 cm.'
  },
  {
    id: 'gr-h9',
    text: 'Egy körcikk területe megegyezik a sugarával megegyező oldalú négyzet területével (Tc = r²). Mekkora a középponti szöge radiánban és fokban (kerekítve)?',
    options: ['2 radián ≈ 114,6°', '1 radián ≈ 57,3°', 'π radián = 180°', '0,5 radián ≈ 28,6°'],
    correctAnswer: 0,
    explanation: 'T_c = 1/2 · r² · α_rad. Ha T_c = r², akkor 1/2 · α_rad = 1 => α_rad = 2 rad. Fokban: 2 · (180° / π) ≈ 114,59°.'
  },
  {
    id: 'gr-h10',
    text: 'Melyik állítás HAMIS az alábbiak közül?',
    options: [
      'Minden deltoid húrnégyszög',
      'Minden húrtrapéz szemközti szögeinek összege 180°',
      'Minden téglalap köré írható kör',
      'A szabályos sokszögeknek mindig van beírt és körülírt köre is'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid általában NEM húrnégyszög (csak ha a két tompaszöge derékszög). A deltoid mindig érintőnégyszög!'
  }
];

export const GeometryReviewQuiz: React.FC<GeometryReviewQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-geo-ismetles"
      title="Gyakorlás, tudáspróba kvíz"
      subtitle="Mérd fel felkészültségedet az Egybevágóság és kör témakör összes fejezetéből!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TUDÁSPRÓBA"
      color="teal"
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
        <GeometryReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <GeometryReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
