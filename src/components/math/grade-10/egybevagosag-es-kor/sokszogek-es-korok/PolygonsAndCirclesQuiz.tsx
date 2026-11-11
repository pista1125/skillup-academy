import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PolygonsAndCirclesMatcher } from './PolygonsAndCirclesMatcher';
import { PolygonsAndCirclesSorter } from './PolygonsAndCirclesSorter';
import {
  RegularHexagonCirclesSvg,
  CyclicQuadrilateralSvg,
  TangentialQuadrilateralSvg,
  ThalesRightAngleSvg,
  HexagonMiniSvg,
  CyclicQuadMiniSvg,
  TangentialQuadMiniSvg,
  ThalesMiniatureSvg
} from './PolygonsAndCirclesFigures';

interface PolygonsAndCirclesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Húrnégyszög tétele',
    description: 'Szemközti belső szögek összege 180°: α + γ = 180° és β + δ = 180°.',
    note: 'Minden téglalap, négyzet és húrtrapéz (szimmetrikus) húrnégyszög.',
    color: 'from-blue-500 to-indigo-600',
    figure: <CyclicQuadrilateralSvg />
  },
  {
    title: 'Érintőnégyszög tétele',
    description: 'Szemközti oldalak összege egyenlő: a + c = b + d.',
    note: 'Területe: T = s · r = (K / 2) · r.',
    color: 'from-emerald-500 to-teal-600',
    figure: <TangentialQuadrilateralSvg />
  },
  {
    title: 'Szabályos hatszög',
    description: 'R = a (köré írt kör sugara = oldal), beírt kör: r = (a√3)/2.',
    note: 'Területe 6 db szabályos háromszög összege: T = 6 · (a²√3/4).',
    color: 'from-amber-500 to-orange-600',
    figure: <RegularHexagonCirclesSvg />
  },
  {
    title: 'Thálész-tétel',
    description: 'A kör átmérőjéből a kör bármely pontja 90°-ban látszik.',
    note: 'A derékszögű háromszög átfogója mindig a körülírt kör átmérője: R = c / 2.',
    color: 'from-purple-500 to-violet-600',
    figure: <ThalesRightAngleSvg />
  }
];

const easyQuestions: Question[] = [
  {
    id: 'pc-e1',
    text: 'Mikor nevezünk egy négyszöget húrnégyszögnek?',
    options: [
      'Ha mind a négy csúcsa egy körön van (köré írható kör)',
      'Ha minden oldala érint egy kört',
      'Ha az oldalai mind egyenlő hosszúak',
      'Ha az átlói felezik egymást'
    ],
    correctAnswer: 0,
    explanation: 'A húrnégyszög csúcsai egy körön helyezkednek el, így oldalai a kör húrjai.'
  },
  {
    id: 'pc-e2',
    text: 'Mi a feltétele annak, hogy egy négyszög húrnégyszög legyen?',
    figure: <CyclicQuadMiniSvg size={140} />,
    options: [
      'Szemközti belső szögeinek összege 180°',
      'Szemközti oldalainak összege egyenlő',
      'Minden szöge hegyesszög',
      'Átlói merőlegesek egymásra'
    ],
    correctAnswer: 0,
    explanation: 'Húrnégyszögek alaptétele: a szemközti belső szögek összege 180° (α + γ = 180° és β + δ = 180°).'
  },
  {
    id: 'pc-e3',
    text: 'Melyik négyszög mindig húrnégyszög az alábbiak közül?',
    options: ['Téglalap', 'Általános rombusz', 'Általános paralelogramma', 'Általános deltoid'],
    correctAnswer: 0,
    explanation: 'A téglalap minden szöge 90°, így a szemközti szögek összege 90° + 90° = 180°, ezért mindig húrnégyszög.'
  },
  {
    id: 'pc-e4',
    text: 'Mi a feltétele annak, hogy egy négyszög érintőnégyszög legyen?',
    figure: <TangentialQuadMiniSvg size={140} />,
    options: [
      'Szemközti oldalainak összege egyenlő (a + c = b + d)',
      'Szemközti belső szögeinek összege 180°',
      'Átlói egyenlő hosszúak',
      'Minden oldala párhuzamos'
    ],
    correctAnswer: 0,
    explanation: 'Érintőnégyszögek alaptétele: a szemközti oldalak összege egyenlő (a + c = b + d).'
  },
  {
    id: 'pc-e5',
    text: 'Melyik négyszög mindig érintőnégyszög az alábbiak közül?',
    options: ['Rombusz', 'Téglalap', 'Általános trapéz', 'Húrtrapéz'],
    correctAnswer: 0,
    explanation: 'A rombusz minden oldala egyenlő (a), így a + a = a + a teljesül, ezért mindig írható bele kör.'
  },
  {
    id: 'pc-e6',
    text: 'Mekkora a szabályos hatszög köré írt körének sugara (R), ha oldala a = 8 cm?',
    figure: <HexagonMiniSvg size={140} />,
    options: ['8 cm', '4 cm', '8√3 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög 6 db szabályos háromszögből áll, így R = a = 8 cm.'
  },
  {
    id: 'pc-e7',
    text: 'Mit mond ki a Thálész-tétel?',
    figure: <ThalesMiniatureSvg size={140} />,
    options: [
      'A kör átmérőjéből a kör bármely más pontja 90°-os szögben látszik',
      'A kör kerülete arányos a sugarával',
      'Minden háromszög köré írható kör',
      'A középponti szög kétszerese a kerületi szögnek'
    ],
    correctAnswer: 0,
    explanation: 'Thálész tétele szerint a kör átmérője fölé rajzolt kerületi szög derékszög (90°).'
  },
  {
    id: 'pc-e8',
    text: 'Egy húrnégyszög egyik szöge α = 70°. Mekkora a vele szemközti γ szög?',
    options: ['110°', '70°', '20°', '180°'],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti szögek összege 180°, így γ = 180° - 70° = 110°.'
  },
  {
    id: 'pc-e9',
    text: 'Egy érintőnégyszög szemközti oldalai a = 6 cm és c = 9 cm. Mennyi a másik két szemközti oldal (b + d) összege?',
    options: ['15 cm', '30 cm', '3 cm', '54 cm'],
    correctAnswer: 0,
    explanation: 'Érintőnégyszögben a + c = b + d, így b + d = 6 + 9 = 15 cm.'
  },
  {
    id: 'pc-e10',
    text: 'Melyik alakzat egyszerre mindig húrnégyszög és érintőnégyszög is?',
    options: ['Négyzet', 'Általános téglalap', 'Általános rombusz', 'Paralelogramma'],
    correctAnswer: 0,
    explanation: 'A négyzet szögei 90°-osak (húrnégyszög), és oldalai egyenlőek (érintőnégyszög).'
  }
];

const mediumQuestions: Question[] = [
  {
    id: 'pc-m1',
    text: 'Egy húrnégyszög három szöge egymás után haladva: 80°, 105°, x. Mekkora az x szög?',
    options: ['100°', '75°', '95°', '80°'],
    correctAnswer: 0,
    explanation: 'Az első (80°) és a harmadik (x) szög szemközti szögek! Tehát 80° + x = 180°, amiből x = 100°.'
  },
  {
    id: 'pc-m2',
    text: 'Egy érintőnégyszög oldalai sorban: a = 5 cm, b = 8 cm, c = 11 cm. Mekkora a negyedik d oldal?',
    options: ['8 cm', '14 cm', '6 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'a + c = b + d => 5 + 11 = 8 + d => 16 = 8 + d => d = 8 cm.'
  },
  {
    id: 'pc-m3',
    text: 'Mekkora a beírt kör sugara egy a = 12 cm oldalú szabályos háromszögben?',
    options: ['2√3 cm', '4√3 cm', '6 cm', '6√3 cm'],
    correctAnswer: 0,
    explanation: 'm = a√3/2 = 6√3 cm. A beírt kör sugara a magasság egyharmada: r = m/3 = 2√3 cm.'
  },
  {
    id: 'pc-m4',
    text: 'Mekkora a beírt kör sugara egy a = 10 cm oldalú szabályos hatszögben?',
    figure: <HexagonMiniSvg size={140} />,
    options: ['5√3 cm', '5 cm', '10 cm', '10√3 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög beírt körének sugara egyenlő az a = 10 cm oldalú szabályos háromszög magasságával: r = a√3/2 = 5√3 cm.'
  },
  {
    id: 'pc-m5',
    text: 'Egy derékszögű háromszög átfogója c = 20 cm. Mekkora a köré írt körének sugara (R)?',
    figure: <ThalesMiniatureSvg size={140} />,
    options: ['10 cm', '20 cm', '5 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Thálész-tétel szerint a derékszögű háromszög átfogója a köré írt kör átmérője: R = c / 2 = 10 cm.'
  },
  {
    id: 'pc-m6',
    text: 'Egy érintőtrapéz alapjai a = 14 cm és c = 6 cm. Mekkora a trapéz kerülete?',
    options: ['40 cm', '20 cm', '28 cm', '32 cm'],
    correctAnswer: 0,
    explanation: 'Érintőnégyszögben a + c = b + d, így a szárak összege is b + d = 14 + 6 = 20 cm. A kerület K = (a+c) + (b+d) = 20 + 20 = 40 cm.'
  },
  {
    id: 'pc-m7',
    text: 'Lehet-e egy rombusz húrnégyszög, ha az egyik szöge 60°?',
    options: [
      'Nem, mert a szemközti szögei 60°-osak, így összegük 120° ≠ 180°',
      'Igen, mert minden rombusz húrnégyszög',
      'Igen, ha a másik két szöge 120°',
      'Csak akkor, ha az oldalai 10 cm-nél nagyobbak'
    ],
    correctAnswer: 0,
    explanation: 'Rombuszban a szemközti szögek egyenlők. Ha az egyik 60°, a szemközti is 60°, összegük 120° ≠ 180°, így nem lehet húrnégyszög.'
  },
  {
    id: 'pc-m8',
    text: 'Egy érintőnégyszög kerülete K = 36 cm, a beírt körének sugara r = 4 cm. Mekkora a területe?',
    options: ['72 cm²', '144 cm²', '36 cm²', '18 cm²'],
    correctAnswer: 0,
    explanation: 'T = s · r, ahol s = K / 2 = 18 cm. Így T = 18 · 4 = 72 cm².'
  },
  {
    id: 'pc-m9',
    text: 'Egy húrtrapéz szárai 5 cm-esek, egyik alapja 8 cm, másik 2 cm. Szemközti szögeinek összege:',
    options: ['Mindig 180°', 'Mindig 90°', 'Mindig 360°', 'Függ a magasságtól'],
    correctAnswer: 0,
    explanation: 'Minden húrtrapéz (szimmetrikus trapéz) húrnégyszög, így szemközti szögeinek összege mindig 180°.'
  },
  {
    id: 'pc-m10',
    text: 'Mekkora szöget zár be a kör érintője az érintési pontba húzott sugárral?',
    options: ['90°', '45°', '180°', '60°'],
    correctAnswer: 0,
    explanation: 'A kör érintője mindig merőleges (90°) az érintési pontba húzott sugárra.'
  }
];

const hardQuestions: Question[] = [
  {
    id: 'pc-h1',
    text: 'Egy szimmetrikus érintőtrapéz alapjai a = 18 cm és c = 2 cm. Mekkora a trapéz magassága?',
    options: ['6 cm', '10 cm', '8 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'Érintőtrapéz lévén b + b = a + c = 20 => szár b = 10 cm. A trapéz levágott derékszögű háromszögének alsó befogója (a - c)/2 = (18 - 2)/2 = 8 cm. Pitagorasz-tétellel: m = √(10² - 8²) = √(100 - 64) = √36 = 6 cm.'
  },
  {
    id: 'pc-h2',
    text: 'Egy szabályos hatszög területe T = 54√3 cm². Mekkora a köré írt körének sugara R?',
    options: ['6 cm', '3 cm', '6√3 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'Szabályos hatszög területe T = 6 · (a²√3/4) = (3√3/2) · a². 54√3 = (3√3/2) · a² => a² = 36 => a = 6 cm. Mivel R = a, ezért R = 6 cm.'
  },
  {
    id: 'pc-h3',
    text: 'Egy húrnégyszög szögei egymás után haladva: α = 2x, β = 3x, γ = 7x. Mennyi a legkisebb szöge fokban?',
    options: ['40°', '20°', '60°', '30°'],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti szögek összege 180°: α + γ = 2x + 7x = 9x = 180° => x = 20°. A szögek: α = 40°, β = 60°, γ = 140°, és δ = 180° - β = 120°. A legkisebb szög α = 40°.'
  },
  {
    id: 'pc-h4',
    text: 'Egy a = 6 cm oldalú négyzetbe és köré kört rajzolunk. Mekkora a két kör területe által bezárt körgyűrű területe?',
    options: ['9π cm²', '18π cm²', '36π cm²', '4,5π cm²'],
    correctAnswer: 0,
    explanation: 'Beírt kör sugara r = a/2 = 3 cm. Köré írt kör sugara R = a√2/2 = 3√2 cm. A körgyűrű területe: T = π(R² - r²) = π((3√2)² - 3²) = π(18 - 9) = 9π cm².'
  },
  {
    id: 'pc-h5',
    text: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora a beírt körének sugara (r)?',
    options: ['2 cm', '1 cm', '2,5 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'Átfogó c = √(6² + 8²) = 10 cm. Derékszögű háromszög beírt körének sugara: r = (a + b - c)/2 = (6 + 8 - 10)/2 = 4/2 = 2 cm.'
  },
  {
    id: 'pc-h6',
    text: 'Egy érintőnégyszög oldalai számtani sorozatot alkotnak: a, a+d, a+2d, a+3d körben haladva. Lehetséges ez?',
    options: [
      'Igen, bármilyen differencia esetén teljesül az a + c = b + d feltétel',
      'Nem, csak akkor ha d = 0',
      'Csak akkor, ha a = d',
      'Csak negatív differencia esetén'
    ],
    correctAnswer: 0,
    explanation: 'Szemközti oldalak összege: a + (a+2d) = 2a + 2d, és (a+d) + (a+3d) = 2a + 4d. Ezek csak akkor egyenlőek, ha 2d = 4d => d = 0! Tehát csak akkor, ha minden oldal egyenlő (rombusz)!'
  },
  {
    id: 'pc-h7',
    text: 'Egy szabályos sokszögben egy belső szög 144°. Hány oldala van, és mekkora a középponti szöge?',
    options: [
      'n = 10 oldalú, középponti szög 36°',
      'n = 8 oldalú, középponti szög 45°',
      'n = 12 oldalú, középponti szög 30°',
      'n = 9 oldalú, középponti szög 40°'
    ],
    correctAnswer: 0,
    explanation: 'Külső szög = 180° - 144° = 36°. Mivel a külső szögek összege 360°, n = 360° / 36° = 10 oldal. A középponti szög is 360° / n = 36°.'
  },
  {
    id: 'pc-h8',
    text: 'Egy Thálész-körben az átmérő AB = 26 cm. Egy C pont a körön úgy helyezkedik el, hogy AC = 10 cm. Mekkora a BC szakasz?',
    options: ['24 cm', '20 cm', '16 cm', '22 cm'],
    correctAnswer: 0,
    explanation: 'Thálész-tétel miatt az ABC háromszög derékszögű C-nél. Pitagorasz-tétel: BC = √(AB² - AC²) = √(26² - 10²) = √(676 - 100) = √576 = 24 cm.'
  },
  {
    id: 'pc-h9',
    text: 'Egy konvex négyszög húrnégyszög és deltoid is egyszerre. Milyen szögű lehet a deltoid a két szimmetria-csúcsánál?',
    options: [
      'Mindkét szimmetria-tengelyen kívüli csúcsánál derékszögnek (90°) kell lennie',
      'Minden szöge 60°',
      'Nem létezhet ilyen alakzat',
      'Bármilyen szögű lehet'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid két egymással szemközti szöge (a szimmetriatengelyre nem illeszkedők) egyenlő. Mivel húrnégyszög, ezek összege 180°, így mindkettőnek 180°/2 = 90°-nak kell lennie.'
  },
  {
    id: 'pc-h10',
    text: 'Egy szabályos nyolcszög köré írt körének sugara R. Hány darab egybevágó egyenlőszárú háromszögre osztják az átmérők a nyolcszöget?',
    options: ['8 db, szárszögük 45°', '8 db, szárszögük 60°', '4 db, szárszögük 90°', '16 db, szárszögük 22,5°'],
    correctAnswer: 0,
    explanation: 'A középpontból a 8 csúcshoz húzott sugarak 8 darab egybevágó háromszögre osztják, melyek csúcsszöge 360° / 8 = 45°.'
  }
];

export const PolygonsAndCirclesQuiz: React.FC<PolygonsAndCirclesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-geo-sokszogek-es-korok"
      title="Sokszögek és körök kapcsolata kvíz"
      subtitle="Teszteld tudásodat a húrnégyszögek, érintőnégyszögek és szabályos sokszögek tulajdonságaiból!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="amber"
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
        <PolygonsAndCirclesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PolygonsAndCirclesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
