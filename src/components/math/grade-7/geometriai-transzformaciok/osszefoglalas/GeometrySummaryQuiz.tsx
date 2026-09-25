import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { summaryQuestionsLevel1 } from './questionsLevel1';
import { summaryQuestionsLevel2 } from './questionsLevel2';
import { summaryQuestionsLevel3 } from './questionsLevel3';
import { GeometrySummaryMatcher } from './GeometrySummaryMatcher';
import { GeometrySummarySorter } from './GeometrySummarySorter';

interface GeometrySummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

const allSummaryQuestions: Question[] = [
  ...summaryQuestionsLevel1,
  ...summaryQuestionsLevel2,
  ...summaryQuestionsLevel3
];

const summaryCheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-trans',
    title: 'Egybevágósági Transzformációk',
    description: 'Távolságtartó és szögtartó síkbeli geometriai leképezések',
    formula: 'd(A\', B\') = d(A, B)',
    color: 'teal',
    badge: 'Alapok',
    content: (
      <div className="space-y-2 text-xs">
        <div>• <strong>Tengelyes tükrözés:</strong> Megfordítja a körüljárási irányt! Fixpontjai a tengely pontjai. Két pont távolsága változatlan.</div>
        <div>• <strong>Középpontos tükrözés:</strong> 180°-os forgatás a középpont körül. Megtartja a körüljárási irányt. Egyetlen fixpontja a középpont.</div>
        <div>• <strong>Párhuzamos eltolás:</strong> Egy adott vektorral mozgatja el a sík minden pontját. Nincs fixpontja.</div>
        <div>• <strong>Forgatás:</strong> Adott pont körül adott szöggel való elmozdulás. Iránytartó és szögtartó.</div>
      </div>
    )
  },
  {
    id: 'cs-angles',
    title: 'Szögpárok és Szögösszegek',
    description: 'Metsző egyenesek és síkidomok szögösszefüggései',
    formula: 'α + β + γ = 180°',
    color: 'blue',
    badge: 'Szögtan',
    content: (
      <div className="space-y-2 text-xs">
        <div>• <strong>Csúcsszögek:</strong> Száraik egymás meghosszabbításai, nagyságuk egyenlő: <MathText>α = α\'</MathText>.</div>
        <div>• <strong>Mellékszögek:</strong> Egyik száruk közös, a másik egyenesbe esik: <MathText>α + β = 180°</MathText>.</div>
        <div>• <strong>Váltószögek:</strong> Párhuzamos egyeneseket metsző egyenes ellentétes oldalán (Z-alak): egyenlők.</div>
        <div>• <strong>Háromszög belső szögei:</strong> <MathText>α + β + γ = 180°</MathText>. Külső szögei összege: <strong>360°</strong>.</div>
        <div>• <strong>Külső szög tétele:</strong> Bármely külső szög egyenlő a két nem mellette fekvő belső szög összegével.</div>
      </div>
    )
  },
  {
    id: 'cs-triangle-lines',
    title: 'Háromszög Nevezetes Vonalai & Euler-egyenes',
    description: 'Súlyvonalak, magasságok, felezők és az Euler-tengely',
    formula: '|MS| = 2 · |SO|',
    color: 'purple',
    badge: 'Nevezetes Pontok',
    content: (
      <div className="space-y-2 text-xs">
        <div>• <strong>Súlypont (S):</strong> A súlyvonalak metszéspontja, mindig belső pont, <strong>2 : 1</strong> arányban osztja a vonalat a csúcstól.</div>
        <div>• <strong>Magasságpont (M):</strong> Magasságvonalak metszéspontja. Hegyesszögűben belül, derékszögűben a derékszögű csúcsban, tompaszögűben <strong>kívül</strong> van.</div>
        <div>• <strong>Körülírt kör (O):</strong> Oldalfelező merőlegesek metszéspontja. Derékszögűben az átfogó felezőpontja.</div>
        <div>• <strong>Beírt kör (I):</strong> Belső szögfelezők metszéspontja, mindig belső pont, egyenlő távol az oldalaktól.</div>
        <div>• <strong>Euler-egyenes:</strong> M, S és O egy egyenesen fekszik, és <MathText>|MS| = 2 · |SO|</MathText>.</div>
      </div>
    )
  },
  {
    id: 'cs-polygons-circles',
    title: 'Négyszögek, Sokszögek és a Thálész-tétel',
    description: 'Síkgeometriai alakzatok és a kör nevezetes tételei',
    formula: 'd = n(n - 3) / 2',
    color: 'amber',
    badge: 'Síkidomok & Kör',
    content: (
      <div className="space-y-2 text-xs">
        <div>• <strong>Paralelogramma:</strong> Átlói felezik egymást, szemközti szögek egyenlők. Területe: <MathText>T = a · m_a</MathText>.</div>
        <div>• <strong>Rombusz:</strong> Átlói merőlegesek egymásra és felezik a belső szögeket.</div>
        <div>• <strong>Trapéz:</strong> Középvonala az alapok számtani közepe: <MathText>k = (a + c) / 2</MathText>.</div>
        <div>• <strong>Sokszög átlói:</strong> n oldalú sokszög összes átlója: <MathText>d = n · (n - 3) / 2</MathText>.</div>
        <div>• <strong>Thálész-tétel:</strong> A kör átmérőjére támaszkodó kerületi szög derékszög (<strong>90°</strong>).</div>
        <div>• <strong>Érintő tétele:</strong> Az érintési pontba húzott sugár merőleges az érintőre.</div>
      </div>
    )
  }
];

export const GeometrySummaryQuiz: React.FC<GeometrySummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  return (
    <QuizTemplate
      title="14. Összefoglalás és Fejezetzáró Teszt"
      subtitle="Geometriai transzformációk, szögpárok, nevezetes vonalak, síkidomok és szerkesztések átfogó ellenőrzése (30-30-30 feladat)"
      topicId="g7-geom-summary-quiz"
      topicTitle="14. Összefoglalás"
      topicBadge="📐 7. Osztály • III. Geometriai transzformációk"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🎯 FEJEZETZÁRÓ KVÍZ"
      themeColor="teal"
      questions={allSummaryQuestions}
      cheatSheetCards={summaryCheatSheetCards}
      pdfFilename="7_osztaly_geometria_osszefoglalas_fejeBinaryOperation_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapfogalmak és Szimmetria',
          subtitle: 'Transzformációk, tükrözések, szögpárok és alapvető geometriai tulajdonságok',
          range: '1 – 30. feladat',
          focus: 'Alapfogalmak & Szimmetria'
        },
        level2: {
          title: '2. Szint: Számítások és Nevezetes Vonalak',
          subtitle: 'Szögszámítások, háromszögvonalak, négyszögek, sokszögek és szerkesztések',
          range: '31 – 60. feladat',
          focus: 'Számítások & Síkidomok'
        },
        level3: {
          title: '3. Szint: Mesterfok & Összetett Geometria',
          subtitle: 'Thálész-tétel, Euler-egyenes, geometriai bizonyítások és több lépéses feladatok',
          range: '61 – 90. feladat',
          focus: 'Mesterfok & Haladó Tételek'
        }
      }}
      matcherComponent={
        <GeometrySummaryMatcher
          onNextLevel={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <GeometrySummarySorter
          onNextLevel={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      customActionButtons={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="border-teal-300 text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-xs font-bold"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1.5" /> Párkereső játék
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="border-teal-300 text-teal-800 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-xs font-bold"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" /> Csoportosító játék
            </Button>
          )}
        </div>
      }
    />
  );
};

export default GeometrySummaryQuiz;
