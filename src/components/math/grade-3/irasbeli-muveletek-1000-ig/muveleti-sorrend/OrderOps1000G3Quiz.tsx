import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OrderOps1000G3Matcher } from './OrderOps1000G3Matcher';
import { OrderOps1000G3Sorter } from './OrderOps1000G3Sorter';
import { ExprFig, ChainFig, WalletFig, GroupsFig, NoteFig } from './OrderOps1000G3Parts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// 1. szint – egy lépés, kerek számok
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'oo1000-q1', level: 1, questionTypeBadge: 'Első lépés', figure: <ExprFig expr="520 + 40 · 6" bubbles={['?', '?']} tail="" />, question: 'Melyik műveletet végzed el először? 520 + 40 · 6', options: ['a szorzást: 40 · 6', 'az összeadást: 520 + 40', 'mindegy, melyiket', 'egyszerre mindkettőt'], explanation: 'Előbb jön a szorzás: 40 · 6 = 240. Utána az összeadás: 520 + 240 = 760.' }),
  q({ id: 'oo1000-q2', level: 1, questionTypeBadge: 'Első lépés', figure: <ExprFig expr="(600 − 200) : 4" bubbles={['?', '?']} tail="" />, question: 'Mi az első lépés? (600 − 200) : 4', options: ['600 − 200 = 400', '200 : 4 = 50', '600 : 4 = 150', '600 − 50 = 550'], explanation: 'A zárójel belseje jön először: 600 − 200 = 400. Utána: 400 : 4 = 100.' }),
  q({ id: 'oo1000-q3', level: 1, questionTypeBadge: 'Balról jobbra', figure: <ChainFig start="700" ops={['− 300', '+ 200']} />, question: '700 − 300 + 200 = ?', options: ['600', '200', '400', '500'], explanation: 'Csak + és − van, ezért balról jobbra: 700 − 300 = 400, 400 + 200 = 600. (A 200 akkor jön ki, ha hátulról kezded.)' }),
  q({ id: 'oo1000-q4', level: 1, questionTypeBadge: 'Szorzás előbb', figure: <ExprFig expr="80 + 20 · 5" bubbles={['', '']} />, question: '80 + 20 · 5 = ?', options: ['180', '500', '105', '200'], explanation: 'Először a szorzás: 20 · 5 = 100. Utána: 80 + 100 = 180. (Az 500 rossz sorrend.)' }),
  q({ id: 'oo1000-q5', level: 1, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="(80 + 20) · 5" />, question: '(80 + 20) · 5 = ?', options: ['500', '180', '105', '400'], explanation: 'Most zárójel van! Először: 80 + 20 = 100. Utána: 100 · 5 = 500.' }),
  q({ id: 'oo1000-q6', level: 1, questionTypeBadge: 'Balról jobbra', figure: <ChainFig start="900" ops={['− 400', '− 200']} />, question: '900 − 400 − 200 = ?', options: ['300', '700', '500', '100'], explanation: 'Balról jobbra: 900 − 400 = 500, 500 − 200 = 300.' }),
  q({ id: 'oo1000-q7', level: 1, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="1000 − (500 + 300)" />, question: '1000 − (500 + 300) = ?', options: ['200', '800', '300', '100'], explanation: 'Először a zárójel: 500 + 300 = 800. Utána: 1000 − 800 = 200. (A 800-at az kapja, aki nem nézte a zárójelet: 1000 − 500 + 300.)' }),
  q({ id: 'oo1000-q8', level: 1, questionTypeBadge: 'Balról jobbra', question: '450 + 50 − 300 = ?', options: ['200', '100', '800', '300'], explanation: 'Balról jobbra: 450 + 50 = 500, 500 − 300 = 200.' }),
  q({ id: 'oo1000-q9', level: 1, questionTypeBadge: 'Első lépés', figure: <ExprFig expr="360 : 4 + 500" bubbles={['?', '?']} tail="" />, question: 'Mi az első lépés? 360 : 4 + 500', options: ['360 : 4 = 90', '4 + 500 = 504', '360 + 500 = 860', '500 : 4 = 125'], explanation: 'Az osztás előbb jön, mint az összeadás: 360 : 4 = 90. Utána: 90 + 500 = 590.' }),
  q({ id: 'oo1000-q10', level: 1, questionTypeBadge: 'Jó számolás', question: 'Melyik a jó számolás? 600 − 200 + 100', options: ['600 − 200 = 400, 400 + 100 = 500', '200 + 100 = 300, 600 − 300 = 300', '600 − 200 = 400, 400 − 100 = 300', '600 − 100 = 500, 500 + 200 = 700'], explanation: 'Csak + és − van: balról jobbra. 600 − 200 = 400, utána 400 + 100 = 500.' })
];

// ---------------------------------------------------------------------------
// 2. szint – nagyobb számok, írásbeli lépéssel
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'oo1000-q11', level: 2, questionTypeBadge: 'Balról jobbra', figure: <ChainFig start="645" ops={['− 280', '+ 136']} />, question: '645 − 280 + 136 = ?', options: ['501', '229', '491', '511'], explanation: 'Balról jobbra, írásban: 645 − 280 = 365. Utána 365 + 136 = 501. (A 229 akkor jön ki, ha előbb 280 + 136-ot számolsz.)' }),
  q({ id: 'oo1000-q12', level: 2, questionTypeBadge: 'Szorzás előbb', figure: <ExprFig expr="850 − 30 · 9" bubbles={['?', '?']} />, question: '850 − 30 · 9 = ?', options: ['580', '820', '600', '560'], explanation: 'Előbb a szorzás: 30 · 9 = 270 (mert 3 · 9 = 27). Utána: 850 − 270 = 580.' }),
  q({ id: 'oo1000-q13', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="(930 − 570) : 6" />, question: '(930 − 570) : 6 = ?', options: ['60', '835', '70', '36'], explanation: 'Először a zárójel: 930 − 570 = 360. Utána: 360 : 6 = 60. (A 835 akkor jön ki, ha előbb osztasz: 930 − 95.)' }),
  q({ id: 'oo1000-q14', level: 2, questionTypeBadge: 'Osztás előbb', question: '470 + 560 : 8 = ?', options: ['540', '550', '530', '610'], explanation: 'Előbb az osztás: 560 : 8 = 70 (mert 56 : 8 = 7). Utána: 470 + 70 = 540.' }),
  q({ id: 'oo1000-q15', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="900 − (365 + 248)" />, question: '900 − (365 + 248) = ?', options: ['287', '783', '297', '387'], explanation: 'Zárójel: 365 + 248 = 613. Utána: 900 − 613 = 287. (A 783 rossz: ott nem figyeltek a zárójelre.)' }),
  q({ id: 'oo1000-q16', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="726 − (418 − 129)" />, question: '726 − (418 − 129) = ?', options: ['437', '179', '447', '337'], explanation: 'Zárójel: 418 − 129 = 289. Utána: 726 − 289 = 437. (A 179 a zárójel nélküli eredmény.)' }),
  q({ id: 'oo1000-q17', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="4 · (275 − 185)" />, question: '4 · (275 − 185) = ?', options: ['360', '90', '350', '270'], explanation: 'Zárójel: 275 − 185 = 90. Utána: 4 · 90 = 360. (A 90 csak az első lépés.)' }),
  q({ id: 'oo1000-q18', level: 2, questionTypeBadge: 'Ügyes számolás', figure: <ExprFig expr="382 + 197 + 218" hl={false} caption="Keress két számot, ami kerek összeget ad!" />, question: '382 + 197 + 218 = ?', options: ['797', '787', '697', '807'], explanation: 'Ügyesen: 382 + 218 = 600. Utána: 600 + 197 = 797. Összeadásnál a tagok helyet cserélhetnek.' }),
  q({ id: 'oo1000-q19', level: 2, questionTypeBadge: 'Szorzás előbb', figure: <ExprFig expr="1000 − 6 · 70 − 135" bubbles={['?', '?', '?']} />, question: '1000 − 6 · 70 − 135 = ?', options: ['445', '455', '580', '545'], explanation: 'Előbb a szorzás: 6 · 70 = 420. Utána balról jobbra: 1000 − 420 = 580, 580 − 135 = 445.' }),
  q({ id: 'oo1000-q20', level: 2, questionTypeBadge: 'Hová a zárójel?', figure: <ExprFig expr="500 − 120 + 80" hl={false} tail="= 300" />, question: 'Hová kell tenni a zárójelet, hogy igaz legyen? 500 − 120 + 80 = 300', options: ['500 − (120 + 80)', '(500 − 120) + 80', 'nem kell zárójel', '(500 − 120 + 80)'], explanation: '500 − (120 + 80) = 500 − 200 = 300. Zárójel nélkül 500 − 120 + 80 = 460 lenne.' })
];

// ---------------------------------------------------------------------------
// 3. szint – két lépés, szöveges feladatok
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'oo1000-q21', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <ChainFig start="640" ops={['− 285', '+ 170']} caption="székek a tornateremben" />, question: 'A tornateremben 640 szék van. 285-öt kivisznek, aztán 170-et visszahoznak. Hány szék van bent?', options: ['525', '185', '535', '425'], explanation: '640 − 285 = 355, utána 355 + 170 = 525. Balról jobbra számolunk, ahogy a történet halad.' }),
  q({ id: 'oo1000-q22', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <WalletFig money="1000 Ft" tags={['365 Ft', '290 Ft']} />, question: '1000 Ft-od van. Veszel egy 365 Ft-os könyvet és egy 290 Ft-os ragasztót. Mennyi pénzed marad?', options: ['345 Ft', '925 Ft', '355 Ft', '445 Ft'], explanation: '1000 − (365 + 290). Előbb: 365 + 290 = 655. Utána: 1000 − 655 = 345 Ft.' }),
  q({ id: 'oo1000-q23', level: 3, questionTypeBadge: 'Műveletsor', figure: <GroupsFig k={8} label="90" extra="−135" />, question: '8 dobozban 90-90 gyöngy van. 135 gyöngyet elhasználunk. Melyik műveletsor mutatja, mennyi marad?', options: ['8 · 90 − 135', '8 · (90 − 135)', '8 + 90 − 135', '8 · 90 + 135'], explanation: 'Összesen 8 · 90 = 720 gyöngy. Ebből elveszünk 135-öt: 720 − 135 = 585. A műveletsor: 8 · 90 − 135.' }),
  q({ id: 'oo1000-q24', level: 3, questionTypeBadge: 'Hiányzó szám', figure: <ExprFig expr="(□ − 250) : 5" tail="= 70" />, question: 'Melyik szám illik a □ helyére? (□ − 250) : 5 = 70', options: ['600', '350', '270', '620'], explanation: 'A zárójelben 350 lesz, mert 350 : 5 = 70. □ − 250 = 350, ezért □ = 600. Ellenőrzés: (600 − 250) : 5 = 70.' }),
  q({ id: 'oo1000-q25', level: 3, questionTypeBadge: 'Hiányzó szám', figure: <ExprFig expr="600 − 4 · □" tail="= 320" />, question: 'Melyik szám illik a □ helyére? 600 − 4 · □ = 320', options: ['70', '280', '80', '60'], explanation: '600-ból 280-at kell elvenni, hogy 320 maradjon. 4 · □ = 280, ezért □ = 70.' }),
  q({ id: 'oo1000-q26', level: 3, questionTypeBadge: 'Összehasonlítás', question: 'Melyik műveletsor értéke a legnagyobb?', options: ['750 − 320 + 180', '750 − (320 + 180)', '750 − 3 · 80', '(750 − 350) : 4'], explanation: '750 − 320 + 180 = 610. A többi: 750 − 500 = 250; 750 − 240 = 510; 400 : 4 = 100. A legnagyobb a 610.' }),
  q({ id: 'oo1000-q27', level: 3, questionTypeBadge: 'Szövegből műveletsor', question: 'A 836 és a 268 különbségéből vond ki a 175-öt! Mennyi lesz?', options: ['393', '743', '403', '383'], explanation: '836 − 268 = 568, utána 568 − 175 = 393. (A 743 akkor jön ki, ha előbb 268 − 175-öt számolsz.)' }),
  q({ id: 'oo1000-q28', level: 3, questionTypeBadge: 'Gondoltam egy számot', question: 'Gondoltam egy számot. A 9 · 80-nál 245-tel kisebb. Melyik ez?', options: ['475', '965', '485', '575'], explanation: '9 · 80 = 720. 245-tel kisebb: 720 − 245 = 475.' }),
  q({ id: 'oo1000-q29', level: 3, questionTypeBadge: 'Hibakeresés', figure: <NoteFig lines={['520 − 120 : 4 =', '= 400 : 4 = 100']} mark="x" />, question: 'Bence így számolt. Mi a jó eredmény? 520 − 120 : 4', options: ['490', '100', '500', '130'], explanation: 'Bence balról jobbra számolt. De az osztás jön előbb: 120 : 4 = 30. Utána: 520 − 30 = 490.' }),
  q({ id: 'oo1000-q30', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <GroupsFig k={3} label="125 + 75" caption="tulipán + nárcisz egy sorban" color="#fbcfe8" />, question: 'A kertben 3 sor virág van. Minden sorban 125 tulipán és 75 nárcisz. Hány virág van összesen?', options: ['600', '450', '200', '610'], explanation: 'Egy sorban: 125 + 75 = 200 virág. 3 sorban: 3 · 200 = 600. Egy műveletsorral: 3 · (125 + 75) = 600.' })
];

export const ORDER_OPS_1000_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const OrderOps1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-muveletek-1000-ig"
    topicId="g3-wops-sorrend-quiz"
    subtopicId="muveleti-sorrend"
    title="3. A műveletek sorrendje és a zárójelek – Kvíz"
    subtitle="30 feladat 3 szinten: balról jobbra, szorzás és osztás előbb, zárójel, szöveges feladatok 1000-ig."
    badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • KVÍZ"
    questions={ORDER_OPS_1000_G3_QUESTIONS}
    cheatSheets={[
      { title: 'A sorrend', items: ['1. zárójel ( )', '2. szorzás · és osztás :', '3. összeadás + és kivonás −', 'Egyforma lépcsőn: balról jobbra'] },
      { title: 'Példák', items: ['645 − 280 + 136 = 365 + 136 = 501', '850 − 30 · 9 = 850 − 270 = 580', '(930 − 570) : 6 = 360 : 6 = 60', '900 − (365 + 248) = 900 − 613 = 287'] },
      { title: 'Vigyázz!', items: ['Karikázd be a zárójelet, azzal kezdd!', '700 − (250 − 100) = 550, de 700 − 250 − 100 = 350', 'A nagy + és − lépést írásban végezd!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<OrderOps1000G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<OrderOps1000G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default OrderOps1000G3Quiz;
