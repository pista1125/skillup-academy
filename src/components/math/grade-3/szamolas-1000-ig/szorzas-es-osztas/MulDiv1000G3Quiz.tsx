import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv1000G3Matcher } from './MulDiv1000G3Matcher';
import { MulDiv1000G3Sorter } from './MulDiv1000G3Sorter';
import {
  BoxesFig,
  RodsFig,
  ShareFig,
  HopFig,
  CoinGridFig,
  CoinsFig,
  RibbonFig,
  FlatRowFig,
  FlatGroupsFig,
  HundredAnalogyFig,
  ExchangeFig,
  MachineFig,
  ShopFig,
  BusFig,
  TimesBarsFig,
  RuleTableFig,
  CutFig
} from './MulDiv1000G3QuizParts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MUL_DIV_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: egy lépés ----------------
  q({ id: 'md1000g3-q1', level: 1, questionTypeBadge: 'Kerek tízesek', figure: <BoxesFig n={7} label="80" />, question: 'Egy zacskóban 80 szem bab van. Hány szem bab van 7 zacskóban?', options: ['560', '87', '490', '640'], explanation: '7 · 8 = 56, tehát 7 · 8 tízes = 56 tízes = 560.' }),
  q({ id: 'md1000g3-q2', level: 1, questionTypeBadge: 'Szorzás 100-zal', figure: <FlatRowFig n={7} />, question: '7 · 100 = ?', options: ['700', '107', '70', '800'], explanation: '7 százas = 700. A 7 végére két 0 kerül.' }),
  q({ id: 'md1000g3-q3', level: 1, questionTypeBadge: 'Tízszeres', question: 'Mennyi a 46 tízszerese?', options: ['460', '56', '406', '640'], explanation: '46 · 10 = 46 tízes = 460. A 46 végére egy 0 kerül.' }),
  q({ id: 'md1000g3-q4', level: 1, questionTypeBadge: 'Beváltás', figure: <ExchangeFig total={900} coin={100} />, question: 'Hány 100 forintos kell 900 Ft-hoz?', options: ['9', '90', '10', '8'], explanation: '900 = 9 százas. 900 : 100 = 9.' }),
  q({ id: 'md1000g3-q5', level: 1, questionTypeBadge: 'Kerek százasok', figure: <FlatGroupsFig groups={4} per={2} />, question: '4 · 200 = ?', options: ['800', '80', '8', '600'], explanation: '4 · 2 = 8, tehát 4 · 2 százas = 8 százas = 800.' }),
  q({ id: 'md1000g3-q6', level: 1, questionTypeBadge: 'Kerek tízesek', figure: <RodsFig groups={6} per={9} />, question: '6 · 90 = ?', options: ['540', '54', '96', '630'], explanation: '6 · 9 = 54, tehát 6 · 9 tízes = 54 tízes = 540.' }),
  q({ id: 'md1000g3-q7', level: 1, questionTypeBadge: 'Osztás 10-zel', question: '1000 : 10 = ?', options: ['100', '10', '1000', '990'], explanation: '1000 = 100 tízes. 1000 : 10 = 100. Ellenőrzés: 100 · 10 = 1000.' }),
  q({ id: 'md1000g3-q8', level: 1, questionTypeBadge: 'Részekre osztás', figure: <ShareFig total={800} k={4} />, question: '800 : 4 = ?', options: ['200', '20', '400', '796'], explanation: '8 százast 4 részre osztunk. Egy részbe 2 százas jut: 200.' }),
  q({ id: 'md1000g3-q9', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsFig n={5} v={200} />, question: 'Mennyi pénz ez?', options: ['1000 Ft', '205 Ft', '800 Ft', '100 Ft'], explanation: '5 db 200 forintos: 5 · 200 = 1000 Ft.' }),
  q({ id: 'md1000g3-q10', level: 1, questionTypeBadge: 'Százszoros', question: 'Mennyi a 8 százszorosa?', options: ['800', '80', '108', '900'], explanation: '8 · 100 = 8 százas = 800.' }),

  // ---------------- 2. szint: nehezebb számok, kép ----------------
  q({ id: 'md1000g3-q11', level: 2, questionTypeBadge: 'Szorzótábla', figure: <HundredAnalogyFig a={3} b={3} />, question: 'Tudod, hogy 3 · 3 = 9. Mennyi 3 · 300?', options: ['900', '90', '9', '600'], explanation: '3 · 3 százas = 9 százas = 900.' }),
  q({ id: 'md1000g3-q12', level: 2, questionTypeBadge: 'Részekre osztás', figure: <ShareFig total={720} k={8} />, question: '720 : 8 = ?', options: ['90', '9', '80', '712'], explanation: '72 : 8 = 9, tehát 72 tízes : 8 = 9 tízes = 90. Ellenőrzés: 8 · 90 = 720.' }),
  q({ id: 'md1000g3-q13', level: 2, questionTypeBadge: 'Bennfoglalás', figure: <HopFig total={1000} size={200} />, question: 'Hányszor van meg az 1000-ben a 200?', options: ['5', '50', '4', '800'], explanation: '200-asával ugrálunk: 200, 400, 600, 800, 1000. Ez 5 ugrás. 1000 : 200 = 5.' }),
  q({ id: 'md1000g3-q14', level: 2, questionTypeBadge: 'Bennfoglalás', figure: <HopFig total={540} size={60} />, question: '540 : 60 = ?', options: ['9', '90', '8', '480'], explanation: '54 tízes : 6 tízes = 9, mert 6 · 9 = 54. Ellenőrzés: 9 · 60 = 540.' }),
  q({ id: 'md1000g3-q15', level: 2, questionTypeBadge: 'Pénz', figure: <CoinGridFig rows={3} cols={4} v={50} />, question: 'Mennyi pénz ez?', options: ['600 Ft', '120 Ft', '200 Ft', '650 Ft'], explanation: 'Egy sorban 4 · 50 = 200 Ft. 3 sor: 3 · 200 = 600 Ft.' }),
  q({ id: 'md1000g3-q16', level: 2, questionTypeBadge: 'Hiányzó szám', question: '□ · 70 = 630. Melyik szám a □?', options: ['9', '90', '8', '700'], explanation: '63 tízes = □ · 7 tízes. 9 · 7 = 63, tehát □ = 9. Ellenőrzés: 9 · 70 = 630.' }),
  q({ id: 'md1000g3-q17', level: 2, questionTypeBadge: 'Összehasonlítás', question: 'Melyik szorzat a legnagyobb?', options: ['8 · 90', '9 · 70', '6 · 100', '7 · 80'], explanation: '8 · 90 = 720, 9 · 70 = 630, 6 · 100 = 600, 7 · 80 = 560. A legnagyobb a 720.' }),
  q({ id: 'md1000g3-q18', level: 2, questionTypeBadge: 'Beváltás', figure: <ExchangeFig total={400} coin={50} />, question: 'Hány 50 forintosra váltható 400 Ft?', options: ['8', '80', '4', '9'], explanation: '50-esével számolunk: 2 db 50 Ft-os = 100 Ft. 400 Ft-hoz 4 · 2 = 8 db kell. 400 : 50 = 8.' }),
  q({ id: 'md1000g3-q19', level: 2, questionTypeBadge: 'Szöveges feladat', figure: <BoxesFig n={6} label="90" />, question: 'Egy virágládába 90 virághagyma kell. Hány hagyma kell 6 ládába?', options: ['540', '96', '450', '630'], explanation: '6 · 90 = 6 · 9 tízes = 54 tízes = 540 hagyma.' }),
  q({ id: 'md1000g3-q20', level: 2, questionTypeBadge: 'Részekre osztás', figure: <RibbonFig len={800} k={4} />, question: 'Egy 800 cm-es kötelet 4 egyforma darabra vágunk. Milyen hosszú egy darab?', options: ['200 cm', '20 cm', '400 cm', '796 cm'], explanation: '800 : 4 = 8 százas : 4 = 2 százas = 200 cm.' }),

  // ---------------- 3. szint: legfeljebb két lépés ----------------
  q({ id: 'md1000g3-q21', level: 3, questionTypeBadge: 'Műveleti sorrend', question: '1000 − 4 · 90 = ?', options: ['640', '360', '910', '994'], explanation: 'Előbb szorzunk: 4 · 90 = 360. Aztán kivonunk: 1000 − 360 = 640.' }),
  q({ id: 'md1000g3-q22', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <BoxesFig n={7} label="80" caption="eladtak 300-at" />, question: 'A boltban 7 láda alma van, mindegyikben 80 alma. Eladtak 300 almát. Hány alma maradt?', options: ['260', '560', '860', '220'], explanation: 'Összesen: 7 · 80 = 560 alma. Maradt: 560 − 300 = 260 alma.' }),
  q({ id: 'md1000g3-q23', level: 3, questionTypeBadge: 'Visszafelé', figure: <MachineFig op="· 6" out={480} />, question: 'Gondoltam egy számot. 6-tal szoroztam, és 480 lett. Mire gondoltam?', options: ['80', '8', '474', '90'], explanation: 'Visszafelé osztunk: 480 : 6 = 80. Ellenőrzés: 6 · 80 = 480.' }),
  q({ id: 'md1000g3-q24', level: 3, questionTypeBadge: 'Vásárlás', figure: <ShopFig n={3} price={200} what="füzet" />, question: 'Van 1000 Ft-od. Veszel 3 füzetet, mindegyik 200 Ft. Mennyi pénzed marad?', options: ['400 Ft', '600 Ft', '800 Ft', '200 Ft'], explanation: 'A füzetek: 3 · 200 = 600 Ft. Marad: 1000 − 600 = 400 Ft.' }),
  q({ id: 'md1000g3-q25', level: 3, questionTypeBadge: 'Bennfoglalás', figure: <BusFig total={400} per={50} />, question: 'Egy buszba 50 gyerek fér. Hány busz kell 400 gyereknek?', options: ['8', '80', '9', '350'], explanation: '400 : 50 = 8, mert 8 · 50 = 400. 8 busz kell.' }),
  q({ id: 'md1000g3-q26', level: 3, questionTypeBadge: 'Ötször annyi', figure: <TimesBarsFig a="tulipán" v={80} b="nárcisz" k={5} />, question: 'A kertben 80 tulipán van. Nárcisz ötször annyi. Hány virág van összesen?', options: ['480', '400', '85', '405'], explanation: 'Nárcisz: 5 · 80 = 400. Összesen: 80 + 400 = 480 virág.' }),
  q({ id: 'md1000g3-q27', level: 3, questionTypeBadge: 'Nyitott mondat', question: '420 : 6 < □ < 560 : 7. Melyik szám lehet a □?', options: ['75', '70', '80', '85'], explanation: '420 : 6 = 70 és 560 : 7 = 80. A □ 70-nél nagyobb, 80-nál kisebb: 75 jó.' }),
  q({ id: 'md1000g3-q28', level: 3, questionTypeBadge: 'Szabály', figure: <RuleTableFig top={[140, 350, '?']} bottom={[2, 5, 9]} />, question: 'Felül mindig a lenti szám 70-szerese áll. Mi kerül a ? helyére?', options: ['630', '79', '560', '700'], explanation: '2 · 70 = 140, 5 · 70 = 350, tehát 9 · 70 = 630.' }),
  q({ id: 'md1000g3-q29', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <CutFig n={5} piece={90} rest={150} />, question: 'Egy szalagról 5 darab 90 cm-est vágtunk le. Maradt 150 cm. Milyen hosszú volt a szalag?', options: ['600 cm', '450 cm', '245 cm', '300 cm'], explanation: 'Levágtunk 5 · 90 = 450 cm-t. Az egész: 450 + 150 = 600 cm.' }),
  q({ id: 'md1000g3-q30', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'Egy szekrényben 8 polc van. Minden polcon 40 könyv áll. Hány könyv van 2 ilyen szekrényben?', options: ['640', '320', '160', '480'], explanation: 'Egy szekrényben: 8 · 40 = 320 könyv. Két szekrényben: 2 · 320 = 640 könyv.' })
];

export const MulDiv1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId="g3-c1000-szorzas-quiz"
      subtopicId="szorzas-es-osztas"
      title="4. Szorzás és osztás – Kvíz"
      subtitle="30 feladat 3 szinten: szorzás és osztás 10-zel és 100-zal, kerek tízesek és százasok, kétféle osztás, pénzváltás, szöveges feladatok."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • KVÍZ"
      questions={MUL_DIV_1000_G3_QUESTIONS}
      cheatSheets={[
        {
          title: '10-zel, 100-zal',
          items: ['46 · 10 = 460 (46 tízes)', '7 · 100 = 700 (7 százas)', '900 : 100 = 9, 1000 : 10 = 100']
        },
        {
          title: 'A szorzótábla segít',
          items: ['6 · 90: 6 · 9 = 54 → 540', '4 · 200: 4 · 2 = 8 → 800', '720 : 8: 72 : 8 = 9 → 90']
        },
        {
          title: 'Kétféle osztás',
          items: ['560 : 7 = 80 (mennyi jut egyre?)', '560 : 70 = 8 (hányszor van meg?)', 'Előbb szorzás: 1000 − 4 · 90 = 640']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv1000G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulDiv1000G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulDiv1000G3Quiz;
