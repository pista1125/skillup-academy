import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CentralAngleArcSectorMatcher } from './CentralAngleArcSectorMatcher';
import { CentralAngleArcSectorSorter } from './CentralAngleArcSectorSorter';
import {
  ArcAndSectorGeometrySvg,
  CircularSegmentDissectionSvg,
  CentralAngleMiniSvg,
  SectorMiniSvg,
  SegmentMiniSvg,
  InscribedAngleMiniSvg,
  ThalesMiniSvg
} from './CentralAngleArcSectorFigures';

interface CentralAngleArcSectorQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Ívhossz és körcikk',
    description: 'i = (2rπα)/360°. T_cikk = (r²πα)/360° = (i · r)/2. K_cikk = i + 2r.',
    note: 'Ne felejtsd el a 2r-t a körcikk kerületénél!',
    color: 'from-blue-500 to-indigo-600',
    figure: <ArcAndSectorGeometrySvg size={220} />
  },
  {
    title: 'Körszelet területe',
    description: 'T_szelet = T_cikk - T_háromszög = (r²πα)/360° - 1/2 · r² · sin α.',
    note: 'Derékszögnél (α = 90°) a háromszög területe r²/2.',
    color: 'from-amber-500 to-orange-600',
    figure: <CircularSegmentDissectionSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapképletek és nevezetes szögek',
    subtitle: '60°, 90°, 180° és egyszerű arányok ívhossza és területe.',
    range: '1–10. feladat',
    focus: 'i = (2rπα)/360°, T_cikk = (r²πα)/360°',
    questions: [
      {
        id: 'cas1-1',
        question: 'Egy r = 6 cm sugarú körben mekkora a 60°-os középponti szöghöz tartozó ívhossz pontos alakban?',
        figure: <CentralAngleMiniSvg size={140} />,
        options: ['2π cm', '6π cm', 'π cm', '3π cm'],
        correctAnswer: 0,
        explanation: 'i = (2 · 6 · π · 60°) / 360° = (12π · 1/6) = 2π cm.'
      },
      {
        id: 'cas1-2',
        question: 'Ugyanezen r = 6 cm sugarú körben mekkora a 60°-os körcikk területe?',
        figure: <SectorMiniSvg size={140} />,
        options: ['6π cm²', '36π cm²', '12π cm²', '3π cm²'],
        correctAnswer: 0,
        explanation: 'T_cikk = (r² · π · 60°) / 360° = (36π · 1/6) = 6π cm².'
      },
      {
        id: 'cas1-3',
        question: 'A teljes kör területének hányadrésze egy 90°-os körcikk?',
        options: ['Negyede (1/4 része)', 'Fele (1/2 része)', 'Harmada (1/3 része)', 'Nyolcada (1/8 része)'],
        correctAnswer: 0,
        explanation: '90° / 360° = 1/4, vagyis a 90°-os körcikk pontosan negyedkör.'
      },
      {
        id: 'cas1-4',
        question: 'Egy körcikk ívhossza i = 8 cm, sugara r = 5 cm. Mekkora a körcikk területe?',
        figure: <ArcAndSectorGeometrySvg size={170} />,
        options: ['20 cm²', '40 cm²', '10 cm²', '13 cm²'],
        correctAnswer: 0,
        explanation: 'T_cikk = (i · r) / 2 = (8 · 5) / 2 = 40 / 2 = 20 cm².'
      },
      {
        id: 'cas1-5',
        question: 'Mekkora az előző körcikk kerülete (i = 8 cm, r = 5 cm)?',
        options: ['18 cm', '8 cm', '13 cm', '26 cm'],
        correctAnswer: 0,
        explanation: 'K_cikk = i + 2 · r = 8 + 2 · 5 = 8 + 10 = 18 cm.'
      },
      {
        id: 'cas1-6',
        question: 'Ha a középponti szöget megduplázzuk változatlan sugár mellett, hogyan változik az ívhossz?',
        options: ['A duplájára nő', 'A négyszeresére nő', 'Nem változik', 'A felére csökken'],
        correctAnswer: 0,
        explanation: 'Az ívhossz egyenesen arányos a középponti szöggel: 2-szeres szög esetén az ívhossz is 2-szeresére nő.'
      },
      {
        id: 'cas1-7',
        question: 'Mekkora a 180°-os középponti szöghöz tartozó körcikk (félkör) ívhossza r sugár esetén?',
        options: ['r · π', '2r · π', 'r² · π', 'r · π / 2'],
        correctAnswer: 0,
        explanation: 'i = (2rπ · 180°) / 360° = 2rπ / 2 = r · π.'
      },
      {
        id: 'cas1-8',
        question: 'Egy körben 45°-os középponti szöghöz tartozó ívhossz 5 cm. Mekkora a teljes kör kerülete?',
        options: ['40 cm', '20 cm', '45 cm', '90 cm'],
        correctAnswer: 0,
        explanation: 'Mivel 360° / 45° = 8, a 45°-os szög a teljes kör 1/8 része. Teljes kerület: 8 · 5 cm = 40 cm.'
      },
      {
        id: 'cas1-9',
        question: 'Egy körcikk területe 15 cm², a teljes kör területe 60 cm². Mekkora a középponti szöge?',
        options: ['90°', '45°', '60°', '120°'],
        correctAnswer: 0,
        explanation: 'Arány: 15 / 60 = 1/4. A teljes szög negyede: 360° · (1/4) = 90°.'
      },
      {
        id: 'cas1-10',
        question: 'Mit nevezünk körszeletnek?',
        figure: <SegmentMiniSvg size={140} />,
        options: [
          'Egy húr és a hozzá tartozó körív által határolt síkrészt',
          'Két sugár és egy körív által határolt síkrészt',
          'Két koncentrikus kör közötti síkrészt',
          'A félkört'
        ],
        correctAnswer: 0,
        explanation: 'A körcikket két sugár és az ív határolja, míg a körszeletet a húr és a körív zárja közre.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és körszeletek',
    subtitle: 'Visszaszámolások ívhosszból, területszámítás és körszelet.',
    range: '11–20. feladat',
    focus: 'Körszelet, szög visszaszámolása, radián alapjai',
    questions: [
      {
        id: 'cas2-1',
        question: 'Egy r = 10 cm sugarú körben 90°-os a középponti szög. Mekkora a hozzá tartozó körszelet területe (π ≈ 3,14)?',
        figure: <CircularSegmentDissectionSvg size={160} />,
        options: ['28,5 cm²', '78,5 cm²', '50 cm²', '25 cm²'],
        correctAnswer: 0,
        explanation: 'T_cikk = 10² · 3,14 / 4 = 314 / 4 = 78,5 cm². A derékszögű háromszög területe: (10 · 10) / 2 = 50 cm². T_szelet = 78,5 - 50 = 28,5 cm².'
      },
      {
        id: 'cas2-2',
        question: 'Mekkora az r = 12 cm sugarú kör 30°-os körcikkének kerülete (π ≈ 3,14)?',
        options: ['kb. 30,28 cm', '6,28 cm', '24 cm', '18,84 cm'],
        correctAnswer: 0,
        explanation: 'i = (2 · 12 · 3,14 · 30) / 360 = (24 · 3,14) / 12 = 2 · 3,14 = 6,28 cm. K_cikk = i + 2r = 6,28 + 24 = 30,28 cm.'
      },
      {
        id: 'cas2-3',
        question: 'Egy r = 8 cm sugarú körben az ívhossz i = 4π cm. Mekkora a középponti szög?',
        options: ['90°', '45°', '60°', '120°'],
        correctAnswer: 0,
        explanation: 'i = (2rπα)/360 ⟹ 4π = (16πα)/360 ⟹ 4 = (16α)/360 ⟹ α = (4 · 360) / 16 = 90°.'
      },
      {
        id: 'cas2-4',
        question: 'Egy 120°-os körcikk területe 48π cm². Mekkora a sugara?',
        options: ['12 cm', '6 cm', '8 cm', '16 cm'],
        correctAnswer: 0,
        explanation: '120° a kör egyharmada: T_kör = 3 · 48π = 144π. r²π = 144π ⟹ r² = 144 ⟹ r = 12 cm.'
      },
      {
        id: 'cas2-5',
        question: 'Mekkora az 1 radián nagyságú szög fokban kifejezve körülbelül?',
        options: ['kb. 57,3°', 'kb. 60°', 'kb. 45°', 'kb. 90°'],
        correctAnswer: 0,
        explanation: '1 radián az a középponti szög, amelyhez a sugárral egyenlő ívhossz tartozik (i = r). 1 rad = 180° / π ≈ 180 / 3,14159 ≈ 57,2958° ≈ 57,3°.'
      },
      {
        id: 'cas2-6',
        question: 'Hány radián a 180°-os egyenesszög?',
        options: ['π radián', '2π radián', 'π / 2 radián', '1 radián'],
        correctAnswer: 0,
        explanation: 'A teljes 360°-os szög 2π radián, így a 180°-os szög pontosan π radián.'
      },
      {
        id: 'cas2-7',
        question: 'Egy körcikk kerülete 25 cm, sugara 7 cm. Mekkora az ívhossza?',
        figure: <SectorMiniSvg size={140} />,
        options: ['11 cm', '18 cm', '9 cm', '14 cm'],
        correctAnswer: 0,
        explanation: 'K_cikk = i + 2r ⟹ 25 = i + 2 · 7 = i + 14 ⟹ i = 25 - 14 = 11 cm.'
      },
      {
        id: 'cas2-8',
        question: 'Egy tortát 8 egyenlő szeletre vágnak. A torta átmérője 24 cm. Mekkora egy szelet tetejének területe (π ≈ 3,14)?',
        options: ['kb. 56,5 cm²', 'kb. 113 cm²', 'kb. 28,3 cm²', 'kb. 75 cm²'],
        correctAnswer: 0,
        explanation: 'Sugár r = 12 cm. Teljes terület: T = 12² · 3,14 = 144 · 3,14 = 452,16 cm². 1 szelet: 452,16 / 8 = 56,52 cm².'
      },
      {
        id: 'cas2-9',
        question: 'Mekkora a fenti tortaszelet íves peremének (külső kéregnek) a hossza?',
        options: ['kb. 9,42 cm', 'kb. 18,84 cm', 'kb. 4,71 cm', 'kb. 12 cm'],
        correctAnswer: 0,
        explanation: 'Teljes kerület: K = 2 · 12 · 3,14 = 75,36 cm. 1 szelet íve: 75,36 / 8 = 9,42 cm.'
      },
      {
        id: 'cas2-10',
        question: 'Milyen összefüggés érvényes a körcikk területe és a határoló ív hossza között?',
        options: [
          'T_cikk = (i · r) / 2',
          'T_cikk = i · r',
          'T_cikk = (i² · r) / 2',
          'T_cikk = 2 · i · r'
        ],
        correctAnswer: 0,
        explanation: 'T_cikk = (r²πα)/360° = (2rπα/360°) · (r/2) = i · (r/2) = (i · r) / 2.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt szintű és összetett geometriai feladatok',
    subtitle: 'Két kör metszetének lencséje, ívmenti mozgás, kombinált szeletek.',
    range: '21–30. feladat',
    focus: 'Két kör metszete, átfedések, húrhossz',
    questions: [
      {
        id: 'cas3-1',
        question: 'Két r = 10 cm sugarú kör középpontja egymástól 10 cm-re van. Mekkora a két kör egymásból kivágott közös metszetének (lencséjének) a területe?',
        options: ['kb. 122,8 cm²', 'kb. 100 cm²', 'kb. 61,4 cm²', 'kb. 157 cm²'],
        correctAnswer: 0,
        explanation: 'A két középpont és a metszéspontok szabályos háromszögeket alkotnak, a középponti szög α = 120°. Egy körszelet területe: T_cikk - T_△ = (100π·120/360) - (1/2·100·sin 120°) = (100π/3) - 25√3 ≈ 104,7 - 43,3 = 61,4 cm². A két szimmetrikus szelet együtt: 2 · 61,4 = 122,8 cm².'
      },
      {
        id: 'cas3-2',
        question: 'Egy körben a 60°-os középponti szöghöz tartozó húr hossza 8 cm. Mekkora az ívhossz?',
        options: ['(8π) / 3 cm (kb. 8,38 cm)', '8 cm', '4π cm', '16π / 3 cm'],
        correctAnswer: 0,
        explanation: 'A két sugár és a 60°-os szög szabályos háromszöget alkot, így a sugár egyenlő a húrral: r = 8 cm. Az ívhossz: i = (2 · 8 · π · 60) / 360 = 16π / 6 = 8π/3 cm.'
      },
      {
        id: 'cas3-3',
        question: 'Egy körcikk kerülete K = 20 cm. Milyen r sugár mellett lesz a körcikk területe maximális?',
        options: ['r = 5 cm (ekkor i = 10 cm)', 'r = 10 cm', 'r = 4 cm', 'r = 6 cm'],
        correctAnswer: 0,
        explanation: 'K = 2r + i = 20 ⟹ i = 20 - 2r. T = (i · r) / 2 = (20 - 2r) · r / 2 = 10r - r². Ez egy lefelé nyíló parabola, melynek csúcsa r_max = -b / (2a) = -10 / (-2) = 5 cm-nél van. Ekkor i = 10 cm, és T_max = 25 cm²!'
      },
      {
        id: 'cas3-4',
        question: 'A fenti maximális területű körcikkben mekkora a középponti szög radiánban?',
        options: ['2 radián (kb. 114,6°)', '1 radián', 'π radián', '0,5 radián'],
        correctAnswer: 0,
        explanation: 'Ívhossz és szög radiánban: i = r · α_rad ⟹ α_rad = i / r = 10 / 5 = 2 radián (2 · 57,3° ≈ 114,6°).'
      },
      {
        id: 'cas3-5',
        question: 'Egy gótikus csúcsíves ablak két r = 1 méter sugarú körívből áll, amelyek egymás középpontjából indulnak. Mekkora a csúcsív területe?',
        options: ['(π/3 - √3/4) m² ≈ 0,614 m²', '1 m²', 'π / 4 m²', '0,5 m²'],
        correctAnswer: 0,
        explanation: 'Az alakzat egy 60°-os szabályos háromszögből és két körszeletből (vagy két 60°-os körcikkből mínusz a közös szabályos háromszögből) áll: 2 · T_cikk - T_△ = 2 · (1²π/6) - (1²√3/4) = π/3 - √3/4 ≈ 1,047 - 0,433 = 0,614 m².'
      },
      {
        id: 'cas3-6',
        question: 'Egy ingaóra ingájának hossza 1 méter, és két szélső helyzete között 12°-os szöget ír le. Mekkora utat tesz meg az inga hegye egyetlen lengés (egyik széltől a másikig) alatt (π ≈ 3,14)?',
        options: ['kb. 20,9 cm', 'kb. 12 cm', 'kb. 41,8 cm', 'kb. 6,28 cm'],
        correctAnswer: 0,
        explanation: 'i = (2 · 100 cm · 3,14 · 12°) / 360° = (628 · 12) / 360 = 628 / 30 ≈ 20,93 cm.'
      },
      {
        id: 'cas3-7',
        question: 'Egy kerti körhintán a belső ülés 2 méterre, a külső 4 méterre van a forgástengelytől. Hányszor hosszabb utat tesz meg a külső ülés egy fordulat alatt?',
        options: ['Pontosan 2-szer hosszabbat', '4-szer hosszabbat', 'Azonos utat', '3-szor hosszabbat'],
        correctAnswer: 0,
        explanation: 'A megtett út a kör kerülete K = 2rπ. A sugár kétszeres (4 m / 2 m = 2), így az ívhossz és a kerület is pontosan 2-szer akkora.'
      },
      {
        id: 'cas3-8',
        question: 'Egy körben az r sugárhoz tartozó húr hossza r√2. Mekkora a hozzá tartozó középponti szög?',
        options: ['90°', '60°', '45°', '120°'],
        correctAnswer: 0,
        explanation: 'A két sugár és a húr háromszögére felírva a Pitagorasz-tételt: r² + r² = 2r² = (r√2)². Mivel teljesül a Pitagorasz-tétel, a háromszög derékszögű, tehát a középponti szög 90°.'
      },
      {
        id: 'cas3-9',
        question: 'Egy körben a húr hossza r√3. Mekkora a hozzá tartozó kisebbik középponti szög?',
        options: ['120°', '90°', '60°', '150°'],
        correctAnswer: 0,
        explanation: 'A koszinusztételből: h² = r² + r² - 2r²cos α ⟹ 3r² = 2r²(1 - cos α) ⟹ 1 - cos α = 3/2 ⟹ cos α = -1/2 ⟹ α = 120°.'
      },
      {
        id: 'cas3-10',
        question: 'Egy 60°-os körcikkbe beírható legnagyobb kör sugara hányadrésze a körcikk r sugarának?',
        options: ['r / 3 része (egyharmada)', 'r / 2 része', 'r / 4 része', 'r / √3 része'],
        correctAnswer: 0,
        explanation: 'Legyen a beírt kis kör sugara ρ. A kis kör középpontja a 60°-os szög felezőjén (30°) van. A szögfelezőn a távolság az O csúcstól: ρ / sin 30° = 2ρ. A körcikk sugara: R = 2ρ + ρ = 3ρ ⟹ ρ = R / 3.'
      }
    ]
  }
};

export const CentralAngleArcSectorQuiz: React.FC<CentralAngleArcSectorQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Középponti szög, körív, körcikk Kvíz"
      subtitle="Gyakorold az ívhossz, körcikk és körszelet számítását különböző szinteken!"
      badge="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • GYAKORLÓ KVÍZ"
      color="blue"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <CentralAngleArcSectorMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CentralAngleArcSectorSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
