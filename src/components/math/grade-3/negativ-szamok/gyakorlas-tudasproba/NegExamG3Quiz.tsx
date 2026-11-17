import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegExamG3Matcher } from './NegExamG3Matcher';
import { NegExamG3Sorter } from './NegExamG3Sorter';
import { ThermoSvg, ThermoRow, ForecastSvg, BuildingSvg, DiverSvg, LiftPanelSvg, NLSvg, VNumberLine, ChangeThermoSvg, TempCardsSvg, WeekChartSvg, TempTableSvg, CompareThermosSvg } from './NegExamG3Parts';
import type { ChangeThermoProps } from '../osszehasonlitas-es-valtozasok/NegChangesG3Parts';
import type { DayForecast, Floor } from './NegExamG3Parts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
/** hőmérő egy értékkel */
const th = (v: number | null, min = -10, max = 10, step = 5) => <ThermoSvg min={min} max={max} value={v} labelStep={step} h={150} className="w-full max-w-[130px] h-auto mx-auto" />;
/** számegyenes „?” nyíllal */
const nlA = (from: number, to: number, labels: 'all' | number | number[], v: number) => <NLSvg from={from} to={to} labels={labels} arrows={[{ v, text: '?' }]} />;
/** változás a hőmérőn */
const ct = (p: Omit<ChangeThermoProps, 'className'>) => <ChangeThermoSvg {...p} className="w-full max-w-[260px] h-auto mx-auto" />;
const cards = (values: number[]) => <TempCardsSvg values={values} className={`w-full ${values.length > 4 ? 'max-w-[320px]' : 'max-w-[280px]'} h-auto mx-auto`} />;
const fc = (days: DayForecast[]) => <ForecastSvg days={days} className={`w-full ${days.length > 4 ? 'max-w-[300px]' : 'max-w-[260px]'} h-auto mx-auto`} />;
const lift = (buttons: number[]) => <LiftPanelSvg buttons={buttons} className="w-full max-w-[90px] h-auto mx-auto" />;
const VLine: React.FC<{ from: number; to: number; labels: number[]; v: number }> = ({ from, to, labels, v }) => {
  const h = Math.min(200, (to - from) * 12);
  return (
    <svg viewBox={`0 0 160 ${h + 50}`} className="w-full max-w-[160px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <VNumberLine from={from} to={to} x={62} y0={h + 26} y1={26} labels={labels} fs={13} arrow={{ v, text: '?' }} />
    </svg>
  );
};
const MAIN_FLOORS: Floor[] = [
  { n: 2, name: '2. emelet' },
  { n: 1, name: '1. emelet' },
  { n: 0, name: 'földszint' },
  { n: -1, name: 'pince' },
  { n: -2, name: 'mélygarázs', show: '?' }
];

// ---------------------------------------------------------------------------
// 1. szint – egy lépés
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'nege-q1', level: 1, questionTypeBadge: 'Hőmérő', figure: th(-4), question: 'Hány °C-ot mutat a hőmérő?', options: ['–4 °C', '4 °C', '–6 °C', '–3 °C'], explanation: 'Az oszlop teteje a 0 alatt van, a –5 fölött 1 vonallal. Ez –4 °C.' }),
  q({ id: 'nege-q2', level: 1, questionTypeBadge: 'Hőmérő', figure: th(7), question: 'Hány °C-ot mutat a hőmérő?', options: ['7 °C', '–7 °C', '8 °C', '3 °C'], explanation: 'Az oszlop teteje a 0 fölött van, az 5 fölött 2 vonallal. Ez 7 °C.' }),
  q({ id: 'nege-q3', level: 1, questionTypeBadge: 'Kiolvasás', question: 'Hogyan olvassuk ki: –6 °C?', options: ['mínusz hat celziusz-fok', 'hat celziusz-fok', 'mínusz hatvan celziusz-fok', 'plusz hat celziusz-fok'], explanation: 'A „–” jel neve mínusz, a °C neve celziusz-fok. –6 °C: mínusz hat celziusz-fok.' }),
  q({ id: 'nege-q4', level: 1, questionTypeBadge: 'Fagypont', question: 'Hány °C a fagypont?', options: ['0 °C', '1 °C', '–1 °C', '10 °C'], explanation: 'A víz 0 °C-on fagy meg. Ezért a 0 °C a fagypont.' }),
  q({ id: 'nege-q5', level: 1, questionTypeBadge: 'Fagypont alatt', question: 'Melyik hőmérséklet van a fagypont alatt?', options: ['–2 °C', '2 °C', '0 °C', '12 °C'], explanation: 'A fagypont alatti hőmérséklet elé mínuszt írunk: –2 °C. A 0 °C éppen a fagypont.' }),
  q({ id: 'nege-q6', level: 1, questionTypeBadge: 'Írd le!', question: 'Írd le számmal: mínusz kilenc celziusz-fok!', options: ['–9 °C', '9 °C', '–19 °C', '–6 °C'], explanation: 'A mínusz jele „–”. Utána jön a szám és a °C: –9 °C.' }),
  q({ id: 'nege-q7', level: 1, questionTypeBadge: 'Lift', figure: <BuildingSvg floors={MAIN_FLOORS} car className="w-full max-w-[260px] h-auto mx-auto" />, question: 'Melyik szám van a mélygarázs gombján?', options: ['–2', '2', '0', '–1'], explanation: 'A földszint a 0. Lefelé: pince –1, mélygarázs –2.' }),
  q({ id: 'nege-q8', level: 1, questionTypeBadge: 'Lift', figure: lift([2, 1, 0, -1, -2]), question: 'A földszinten vagy. A pince 1 szinttel lejjebb van. Melyik gombot nyomod meg?', options: ['–1', '1', '0', '–2'], explanation: 'A földszint a 0. Egy szinttel lejjebb: –1.' }),
  q({ id: 'nege-q9', level: 1, questionTypeBadge: 'Számegyenes', figure: nlA(-6, 6, [-1, 0, 1], -5), question: 'Melyik számot mutatja a nyíl?', options: ['–5', '5', '–4', '–6'], explanation: 'A nyíl a 0-tól 5 lépéssel balra van: –1, –2, –3, –4, –5.' }),
  q({ id: 'nege-q10', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <NLSvg from={-5} to={5} labels="all" unknown={[-3]} />, question: 'Melyik szám hiányzik a számegyenesről?', options: ['–3', '3', '–2', '–4'], explanation: 'A 0-tól balra: –1, –2, –3. A kérdőjel helyén –3 áll.' }),
  q({ id: 'nege-q11', level: 1, questionTypeBadge: 'Balra vagy jobbra?', figure: <NLSvg from={-8} to={8} labels={[0]} />, question: 'Merre van a –7 a 0-tól a számegyenesen?', options: ['balra', 'jobbra', 'pont a 0-n', 'nincs a számegyenesen'], explanation: 'A mínuszos számok a 0-tól balra vannak. A –7 7 lépéssel balra.' }),
  q({ id: 'nege-q12', level: 1, questionTypeBadge: 'Sorozat', question: 'Folytasd: 2, 1, 0, …', options: ['–1', '1', '–2', '10'], explanation: 'Mindig 1-gyel kevesebb. A 0 után a –1 jön.' }),
  q({ id: 'nege-q13', level: 1, questionTypeBadge: 'Számszomszéd', figure: <NLSvg from={-5} to={2} labels="all" unknown={[-2]} />, question: 'Melyik szám van a –3 és a –1 között?', options: ['–2', '2', '0', '–4'], explanation: 'A számegyenesen –3, –2, –1 jön egymás után. Középen a –2.' }),
  q({ id: 'nege-q14', level: 1, questionTypeBadge: 'Hidegebb', figure: <CompareThermosSvg values={[-2, -7]} />, question: 'Melyik hőmérő mutat hidegebbet?', options: ['a B', 'az A', 'egyformát mutatnak', 'nem lehet eldönteni'], explanation: 'Az A –2 °C-ot, a B –7 °C-ot mutat. A B oszlopa van lejjebb: a B mutat hidegebbet.' }),
  q({ id: 'nege-q15', level: 1, questionTypeBadge: 'Melegebb', question: 'Melyik a melegebb: –5 °C vagy –9 °C?', options: ['–5 °C', '–9 °C', 'egyforma meleg', 'nem lehet eldönteni'], explanation: 'A –5 °C közelebb van a 0-hoz, feljebb van a hőmérőn. A –5 °C a melegebb.' }),
  q({ id: 'nege-q16', level: 1, questionTypeBadge: 'Leghidegebb', figure: cards([-3, 4, -8, 0]), question: 'Melyik a leghidegebb?', options: ['–8 °C', '–3 °C', '0 °C', '4 °C'], explanation: 'A mínuszosak közül a –8 °C van a legmesszebb a 0 alatt. Ez a leghidegebb.' }),
  q({ id: 'nege-q17', level: 1, questionTypeBadge: 'Melegedett vagy hűlt?', figure: ct({ from: 6, to: 1, min: -5, max: 10, names: ['délután', 'este'] }), question: 'Délután 6 °C, este 1 °C volt. Melegedett vagy hűlt a levegő?', options: ['hűlt', 'melegedett', 'nem változott', 'előbb melegedett, aztán hűlt'], explanation: 'Az 1 °C kevesebb, mint a 6 °C: a hőmérő lefelé ment. A levegő hűlt.' }),
  q({ id: 'nege-q18', level: 1, questionTypeBadge: 'Hány fokkal?', figure: ct({ from: -1, to: -6, min: -10, max: 5, names: ['este', 'éjjel'], arrowText: '? fok' }), question: 'Este –1 °C, éjjel –6 °C volt. Hány fokkal hűlt?', options: ['5 fokkal', '7 fokkal', '6 fokkal', '1 fokkal'], explanation: '–1-től lefelé –6-ig: –2, –3, –4, –5, –6. Ez 5 lépés: hűlt 5 fokkal.' }),
  q({ id: 'nege-q19', level: 1, questionTypeBadge: 'Mennyi lett?', figure: ct({ from: 2, to: 0, min: -5, max: 5, names: ['este', 'éjjel'], hideTo: true, arrowText: '2 fok' }), question: 'Este 2 °C volt. Éjjel hűlt 2 fokkal. Hány fok lett?', options: ['0 °C', '4 °C', '–2 °C', '2 °C'], explanation: '2-től lefelé 2 fok: 1, 0. Éjjel 0 °C lett, éppen fagypont.' }),
  q({
    id: 'nege-q20',
    level: 1,
    questionTypeBadge: 'Időjárás',
    figure: fc([
      { day: 'hétfő', w: 'snow', hi: 1, lo: -3 },
      { day: 'kedd', w: 'cloud', hi: 4, lo: 1 },
      { day: 'szerda', w: 'snow', hi: 2, lo: -1 },
      { day: 'csüt.', w: 'cloud', hi: 3, lo: 0 },
      { day: 'péntek', w: 'sun', hi: 6, lo: 2 }
    ]),
    question: 'A kék körök az éjszakát mutatják. Hány éjszaka megy a hőmérséklet a 0 °C alá?',
    options: ['2', '3', '1', '4'],
    explanation: 'A 0 alatt csak a mínuszos számok vannak: hétfőn –3 °C és szerdán –1 °C. Ez 2 éjszaka. A 0 °C nem a 0 alatt van.'
  }),
  q({ id: 'nege-q21', level: 1, questionTypeBadge: 'Búvár', figure: <DiverSvg depth={4} className="w-full max-w-[260px] h-auto mx-auto" />, question: 'A vízfelszín a 0 m. Hol úszik a búvár?', options: ['–4 m', '4 m', '–3 m', '0 m'], explanation: 'A búvár a vízfelszín alatt van, 4 méterrel lejjebb: –4 m.' }),
  q({ id: 'nege-q22', level: 1, questionTypeBadge: 'Hőmérőfajták', question: 'Melyikkel méred meg, hogy lázas vagy-e?', options: ['lázmérővel', 'kinti hőmérővel', 'fürdővíz-hőmérővel', 'vonalzóval'], explanation: 'A testünk hőmérsékletét lázmérővel mérjük.' }),
  q({ id: 'nege-q23', level: 1, questionTypeBadge: 'Mindennapok', question: 'Melyik hőmérséklet lehet egy hideg téli reggelen az udvaron?', options: ['–5 °C', '25 °C', '37 °C', '30 °C'], explanation: 'Télen reggel gyakran fagy van, a hőmérő a 0 alatt áll: –5 °C. A 37 °C a testünk hőmérséklete.' }),
  q({ id: 'nege-q24', level: 1, questionTypeBadge: 'Számegyenes', figure: <NLSvg from={-6} to={6} labels={[0]} points={[{ v: 2 }]} />, question: 'Melyik számot jelöli a piros pont?', options: ['2', '–2', '3', '1'], explanation: 'A pont a 0-tól 2 lépéssel jobbra van. Jobbra nincs mínusz: 2.' }),
  q({ id: 'nege-q25', level: 1, questionTypeBadge: 'Lépések', figure: <NLSvg from={-7} to={2} labels="all" points={[{ v: -6 }]} />, question: 'Hány lépésre van a –6 a 0-tól?', options: ['6', '5', '7', '0'], explanation: 'A 0-tól balra lépkedünk: –1, –2, –3, –4, –5, –6. Ez 6 lépés.' }),
  q({ id: 'nege-q26', level: 1, questionTypeBadge: 'Relációs jel', question: 'Melyik igaz?', options: ['–4 °C < 0 °C', '–4 °C > 0 °C', '–4 °C = 0 °C', '0 °C < –4 °C'], explanation: 'A –4 °C hidegebb, mint a 0 °C, ezért kisebb: –4 °C < 0 °C.' }),
  q({ id: 'nege-q27', level: 1, questionTypeBadge: 'Álló számegyenes', figure: <VLine from={-6} to={6} labels={[-5, 0, 5]} v={-2} />, question: 'Melyik számot mutatja a nyíl?', options: ['–2', '2', '–3', '–1'], explanation: 'A nyíl a 0 alatt van, 2 vonallal lejjebb: –2.' }),
  q({ id: 'nege-q28', level: 1, questionTypeBadge: 'Mennyi lett?', figure: ct({ from: -3, to: 0, min: -5, max: 5, hideTo: true, arrowText: '3 fok' }), question: 'Reggel –3 °C volt. Délig melegedett 3 fokkal. Hány fok lett?', options: ['0 °C', '–6 °C', '3 °C', '6 °C'], explanation: '–3-tól fölfelé 3 fok: –2, –1, 0. Délben 0 °C lett.' }),
  q({ id: 'nege-q29', level: 1, questionTypeBadge: 'Hidegebb', question: 'Milyen a –1 °C a 0 °C-hoz képest?', options: ['hidegebb', 'melegebb', 'ugyanolyan', 'fagypont fölötti'], explanation: 'A –1 °C a 0 alatt van 1 fokkal. Ezért hidegebb, mint a 0 °C.' }),
  q({ id: 'nege-q30', level: 1, questionTypeBadge: 'Hőmérő', figure: th(-10, -20, 20, 10), question: 'Hány °C-ot mutat a hőmérő?', options: ['–10 °C', '10 °C', '–20 °C', '0 °C'], explanation: 'Az oszlop teteje pont a –10-es vonalnál áll, a 0 alatt. Ez –10 °C.' })
];

// ---------------------------------------------------------------------------
// 2. szint – egy lépés, nehezebb számok, leolvasás
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'nege-q31', level: 2, questionTypeBadge: 'Hőmérő', figure: th(-13, -20, 10), question: 'Hány °C-ot mutat a hőmérő?', options: ['–13 °C', '–17 °C', '13 °C', '–12 °C'], explanation: 'Az oszlop teteje a –15 fölött van 2 vonallal. A 0 felé haladunk: –14, –13. Ez –13 °C.' }),
  q({ id: 'nege-q32', level: 2, questionTypeBadge: 'Hőmérő', figure: th(-8, -10, 10, 10), question: 'Itt csak 10-esével van felirat. Hány °C-ot mutat a hőmérő?', options: ['–8 °C', '–2 °C', '8 °C', '–12 °C'], explanation: 'Az oszlop teteje a –10 fölött van 2 vonallal: –9, –8. Ez –8 °C.' }),
  q({ id: 'nege-q33', level: 2, questionTypeBadge: 'Hőmérő', figure: th(18, -5, 20), question: 'Hány °C-ot mutat a hőmérő?', options: ['18 °C', '17 °C', '22 °C', '–18 °C'], explanation: 'Az oszlop teteje a 20 alatt van 2 vonallal. Ez 18 °C.' }),
  q({ id: 'nege-q34', level: 2, questionTypeBadge: 'Növekvő sorrend', figure: cards([5, -6, -1, 2, -10]), question: 'Rendezd növekvő sorrendbe, a leghidegebbtől!', options: ['–10, –6, –1, 2, 5', '–1, –6, –10, 2, 5', '5, 2, –1, –6, –10', '–6, –10, –1, 2, 5'], explanation: 'A leghidegebb a –10 °C, utána a –6 °C és a –1 °C. Aztán a 2 °C, végül az 5 °C.' }),
  q({ id: 'nege-q35', level: 2, questionTypeBadge: 'Csökkenő sorrend', figure: cards([-4, 3, -12, 0]), question: 'Rendezd csökkenő sorrendbe, a legmelegebbtől!', options: ['3, 0, –4, –12', '–12, –4, 0, 3', '3, 0, –12, –4', '0, 3, –4, –12'], explanation: 'A legmelegebb a 3 °C, aztán a 0 °C. A mínuszosak közül a –4 °C a melegebb, a –12 °C a leghidegebb.' }),
  q({ id: 'nege-q36', level: 2, questionTypeBadge: 'Átlépés a 0-n', figure: ct({ from: -5, to: 2, arrowText: '? fok' }), question: 'Reggel –5 °C, délben 2 °C volt. Hány fokkal melegedett?', options: ['7 fokkal', '3 fokkal', '2 fokkal', '5 fokkal'], explanation: '–5-től a 0-ig 5 fok, a 0-tól a 2-ig 2 fok. 5 + 2 = 7. Melegedett 7 fokkal.' }),
  q({ id: 'nege-q37', level: 2, questionTypeBadge: 'Átlépés a 0-n', figure: ct({ from: 4, to: -6, names: ['este', 'éjjel'], arrowText: '? fok' }), question: 'Este 4 °C, éjjel –6 °C volt. Hány fokkal hűlt?', options: ['10 fokkal', '2 fokkal', '6 fokkal', '4 fokkal'], explanation: '4-től a 0-ig 4 fok, a 0-tól a –6-ig 6 fok. 4 + 6 = 10. Hűlt 10 fokkal.' }),
  q({ id: 'nege-q38', level: 2, questionTypeBadge: 'Mennyi lett?', figure: ct({ from: 6, to: -2, min: -5, max: 10, names: ['délután', 'éjjel'], hideTo: true, arrowText: '8 fok' }), question: 'Délután 6 °C volt. Éjjelre hűlt 8 fokkal. Hány fok lett?', options: ['–2 °C', '2 °C', '–14 °C', '14 °C'], explanation: '6 fok lefelé a 0-ig. Kell még 8 – 6 = 2 fok. A 0 alatt 2 fokkal: –2 °C.' }),
  q({ id: 'nege-q39', level: 2, questionTypeBadge: 'Mennyi lett?', question: 'Hajnalban –7 °C volt. Reggelre melegedett 4 fokkal. Hány fok lett?', options: ['–3 °C', '–11 °C', '3 °C', '–4 °C'], explanation: 'Melegedett: fölfelé lépünk, közelebb a 0-hoz. –6, –5, –4, –3. Reggel –3 °C lett.' }),
  q({ id: 'nege-q40', level: 2, questionTypeBadge: 'Számegyenes', figure: nlA(-10, 5, 5, -7), question: 'Melyik számot mutatja a nyíl?', options: ['–7', '–3', '–8', '7'], explanation: 'A nyíl a –5-től 2 lépéssel balra van: –6, –7. Ez a –7.' }),
  q({ id: 'nege-q41', level: 2, questionTypeBadge: 'Számegyenes', figure: nlA(-12, 3, [-10, 0], -9), question: 'Csak a –10 és a 0 van kiírva. Melyik számot mutatja a nyíl?', options: ['–9', '–11', '–1', '9'], explanation: 'A nyíl a –10-től 1 lépéssel jobbra, a 0 felé van. A –10 jobb szomszédja a –9.' }),
  q({ id: 'nege-q42', level: 2, questionTypeBadge: 'Sorozat', question: 'Folytasd: 5, 3, 1, …', options: ['–1', '0', '–2', '1'], explanation: 'Mindig 2-vel kevesebb. 1-től 2 lépés lefelé: 0, –1. A következő szám –1.' }),
  q({ id: 'nege-q43', level: 2, questionTypeBadge: 'Sorozat', question: 'Melyik szám hiányzik? –9, –6, ?, 0, 3', options: ['–3', '–4', '3', '–2'], explanation: 'Mindig 3-mal több: –9, –6, –3, 0, 3.' }),
  q({ id: 'nege-q44', level: 2, questionTypeBadge: 'Ugyanolyan messze', figure: <NLSvg from={-8} to={8} labels={[0, 7]} points={[{ v: 7 }]} />, question: 'Melyik szám van ugyanolyan messze a 0-tól, mint a 7, de a 0 másik oldalán?', options: ['–7', '7', '–6', '0'], explanation: 'A 7 a 0-tól 7 lépéssel jobbra van. A másik oldalon, 7 lépéssel balra: –7.' }),
  q({ id: 'nege-q45', level: 2, questionTypeBadge: 'Számok között', figure: <NLSvg from={-4} to={3} labels="all" />, question: 'Hány szám van a –3 és a 2 között? (A –3-at és a 2-t ne számold!)', options: ['4', '5', '3', '6'], explanation: 'A –3 és a 2 között: –2, –1, 0, 1. Ez 4 szám.' }),
  q({ id: 'nege-q46', level: 2, questionTypeBadge: 'Lift', figure: lift([2, 1, 0, -1, -2, -3]), question: 'A földszinten vagy. Lemész 3 szintet. Melyik gombot nyomod meg?', options: ['–3', '3', '–2', '–4'], explanation: 'A földszint a 0. Lefelé 3 szint: –1, –2, –3.' }),
  q({ id: 'nege-q47', level: 2, questionTypeBadge: 'Lift', figure: lift([3, 2, 1, 0, -1, -2]), question: 'A 2. emeletről lemész a –1. szintre. Hány szintet mész le?', options: ['3', '1', '2', '4'], explanation: '2-ről a 0-ig 2 szint, onnan a –1-ig még 1. 2 + 1 = 3 szint.' }),
  q({ id: 'nege-q48', level: 2, questionTypeBadge: 'Búvár', figure: <DiverSvg depth={2} label="–2 m" className="w-full max-w-[260px] h-auto mx-auto" />, question: 'A búvár –2 m-en van. Lemerül még 3 métert. Hol lesz?', options: ['–5 m', '–1 m', '1 m', '5 m'], explanation: 'Lefelé megy, még messzebb a vízfelszíntől: –3, –4, –5. A búvár –5 m-en lesz.' }),
  q({
    id: 'nege-q49',
    level: 2,
    questionTypeBadge: 'Időjárás',
    figure: fc([
      { day: 'hétfő', w: 'cloud', hi: 2, lo: -4 },
      { day: 'kedd', w: 'snow', hi: -1, lo: -8 },
      { day: 'szerda', w: 'cloud', hi: 0, lo: -2 },
      { day: 'csüt.', w: 'snow', hi: -3, lo: -7 },
      { day: 'péntek', w: 'suncloud', hi: 1, lo: -1 }
    ]),
    question: 'A piros körök a nappalt mutatják. Melyik nappal lesz a leghidegebb?',
    options: ['csütörtökön', 'kedden', 'szerdán', 'hétfőn'],
    explanation: 'Nappal (piros): 2, –1, 0, –3, 1. A legkisebb a –3 °C: csütörtökön. (A legkisebb kék szám, a –8 °C, éjszaka van!)'
  }),
  q({
    id: 'nege-q50',
    level: 2,
    questionTypeBadge: 'Grafikon',
    figure: (
      <WeekChartSvg
        days={[
          { day: 'hétfő', v: -2 },
          { day: 'kedd', v: 0 },
          { day: 'szerda', v: 3 },
          { day: 'csüt.', v: 5 },
          { day: 'péntek', v: -1 }
        ]}
        min={-4}
        max={6}
      />
    ),
    question: 'A grafikon a reggeli hőmérsékletet mutatja. Melyik reggel volt a leghidegebb?',
    options: ['hétfőn', 'pénteken', 'kedden', 'csütörtökön'],
    explanation: 'Hétfőn –2 °C, kedden 0 °C, szerdán 3 °C, csütörtökön 5 °C, pénteken –1 °C. A leglejjebb a hétfői pont van: –2 °C.'
  }),
  q({ id: 'nege-q51', level: 2, questionTypeBadge: 'Relációs jel', question: 'Melyik igaz?', options: ['–7 °C < –3 °C', '–7 °C > –3 °C', '–3 °C < –7 °C', '–7 °C = –3 °C'], explanation: 'A –7 °C a hidegebb, ezért kisebb: –7 °C < –3 °C.' }),
  q({ id: 'nege-q52', level: 2, questionTypeBadge: 'Számszomszéd', question: 'Melyik hőmérséklet van a –6 °C és a –2 °C között?', options: ['–4 °C', '–7 °C', '0 °C', '–1 °C'], explanation: 'A –6 °C és a –2 °C között: –5, –4, –3 °C. A válaszok közül a –4 °C van köztük.' }),
  q({ id: 'nege-q53', level: 2, questionTypeBadge: 'Igaza van?', question: 'Zoli szerint a 0 °C a fagypont alatt van. Igaza van?', options: ['Nem, a 0 °C éppen a fagypont.', 'Igen, igaza van.', 'Nem, a fagypont 1 °C.', 'Nem, a fagypont –1 °C.'], explanation: 'A 0 °C maga a fagypont. A fagypont alatt a mínuszos hőmérsékletek vannak: –1 °C, –2 °C …' }),
  q({ id: 'nege-q54', level: 2, questionTypeBadge: 'Bent és kint', figure: <ThermoRow items={[{ value: 22, caption: 'bent' }, { value: -2, caption: 'kint' }]} min={-5} max={25} labelStep={5} h={130} className="w-full max-w-[200px] h-auto mx-auto" />, question: 'Bent 22 °C, kint –2 °C van. Hány fokkal melegebb bent?', options: ['24 fokkal', '20 fokkal', '22 fokkal', '2 fokkal'], explanation: '–2-től a 0-ig 2 fok, a 0-tól a 22-ig 22 fok. 2 + 22 = 24. Bent 24 fokkal melegebb.' }),
  q({ id: 'nege-q55', level: 2, questionTypeBadge: 'Álló számegyenes', figure: <VLine from={-12} to={12} labels={[-10, 0, 10]} v={-4} />, question: 'Melyik számot mutatja a nyíl?', options: ['–4', '–6', '4', '–5'], explanation: 'A nyíl a 0 alatt van 4 vonallal: –4. (A –10 fölött 6 vonallal.)' }),
  q({ id: 'nege-q56', level: 2, questionTypeBadge: 'Visszafelé', figure: ct({ from: -2, to: 3, min: -5, max: 5, hideFrom: true, arrowText: '5 fok' }), question: 'Délben 3 °C volt. Reggel óta melegedett 5 fokkal. Hány fok volt reggel?', options: ['–2 °C', '8 °C', '2 °C', '–8 °C'], explanation: 'Reggel hidegebb volt. 3-tól lefelé 5 fok: 3 fok a 0-ig, még 2 fok: –2 °C.' }),
  q({ id: 'nege-q57', level: 2, questionTypeBadge: 'Sorrend', figure: cards([-1, -9, 4, -5]), question: 'Melyik a második leghidegebb?', options: ['–5 °C', '–9 °C', '–1 °C', '4 °C'], explanation: 'Növekvő sorrend: –9, –5, –1, 4. A második a –5 °C.' }),
  q({
    id: 'nege-q58',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <NLSvg from={-6} to={6} labels={[0]} points={[{ v: 3, letter: 'A' }, { v: -3, letter: 'B' }, { v: -4, letter: 'C' }, { v: -2, letter: 'D' }]} />,
    question: 'Melyik betű jelöli a –3-at?',
    options: ['B', 'A', 'C', 'D'],
    explanation: 'A –3 a 0-tól 3 lépéssel balra van. Ott a B áll. (Az A a 3, jobbra.)'
  }),
  q({ id: 'nege-q59', level: 2, questionTypeBadge: 'Különbség', figure: cards([-4, 4]), question: 'Hány fok a különbség a –4 °C és a 4 °C között?', options: ['8 fok', '0 fok', '4 fok', '16 fok'], explanation: '–4-től a 0-ig 4 fok, a 0-tól a 4-ig 4 fok. 4 + 4 = 8 fok.' }),
  q({ id: 'nege-q60', level: 2, questionTypeBadge: 'Változás', figure: ct({ from: -9, to: -2, min: -10, max: 5, arrowText: '? fok' }), question: 'Hogyan változott a hőmérséklet?', options: ['melegedett 7 fokkal', 'hűlt 7 fokkal', 'melegedett 11 fokkal', 'hűlt 11 fokkal'], explanation: 'Mindkettő a 0 alatt van. –9-től fölfelé –2-ig 7 lépés. Melegedett 7 fokkal.' })
];

// ---------------------------------------------------------------------------
// 3. szint – legfeljebb két lépés
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'nege-q61', level: 3, questionTypeBadge: 'Két változás', question: 'Reggel –6 °C volt. Délig melegedett 9 fokkal, estére hűlt 4 fokkal. Hány fok volt este?', options: ['–1 °C', '1 °C', '7 °C', '–19 °C'], explanation: 'Délben: –6-tól fölfelé 9 fok: 6 fok a 0-ig, még 3: 3 °C. Este: 3-tól lefelé 4 fok: 3 a 0-ig, még 1: –1 °C.' }),
  q({ id: 'nege-q62', level: 3, questionTypeBadge: 'Két változás', question: 'Este 2 °C volt. Éjjel hűlt 7 fokkal, reggelre melegedett 3 fokkal. Hány fok volt reggel?', options: ['–2 °C', '–8 °C', '2 °C', '–5 °C'], explanation: 'Éjjel: 2-től lefelé 7 fok: 2 a 0-ig, még 5: –5 °C. Reggel: –5-től fölfelé 3 fok: –2 °C.' }),
  q({
    id: 'nege-q63',
    level: 3,
    questionTypeBadge: 'Időjárás',
    figure: fc([
      { day: 'hétfő', w: 'cloud', hi: 4, lo: -3 },
      { day: 'kedd', w: 'sun', hi: 2, lo: -6 },
      { day: 'szerda', w: 'suncloud', hi: 6, lo: 1 },
      { day: 'csüt.', w: 'snow', hi: -1, lo: -5 }
    ]),
    question: 'Piros: nappal, kék: éjjel. Melyik napon a legnagyobb a különbség a nappali és az éjszakai hőmérséklet között?',
    options: ['kedden', 'hétfőn', 'szerdán', 'csütörtökön'],
    explanation: 'Hétfő: 3 + 4 = 7 fok. Kedd: 6 + 2 = 8 fok. Szerda: 6 – 1 = 5 fok. Csütörtök: –1-től –5-ig 4 fok. Kedden a legnagyobb.'
  }),
  q({
    id: 'nege-q64',
    level: 3,
    questionTypeBadge: 'Grafikon',
    figure: (
      <WeekChartSvg
        days={[
          { day: 'hétfő', v: 5 },
          { day: 'kedd', v: 2 },
          { day: 'szerda', v: -2 },
          { day: 'csüt.', v: -3 },
          { day: 'péntek', v: 2 }
        ]}
        min={-4}
        max={6}
      />
    ),
    question: 'Melyik két nap között változott a legtöbbet a reggeli hőmérséklet?',
    options: ['csütörtök és péntek között', 'kedd és szerda között', 'hétfő és kedd között', 'szerda és csütörtök között'],
    explanation: 'Hétfő → kedd: hűlt 3 fokkal. Kedd → szerda: hűlt 4 fokkal. Szerda → csütörtök: hűlt 1 fokkal. Csütörtök → péntek: –3-ról 2-re, melegedett 5 fokkal. Ez a legtöbb.'
  }),
  q({ id: 'nege-q65', level: 3, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik állítás HAMIS?', options: ['Ha 3 °C-ról hűl 5 fokkal, –8 °C lesz.', 'A –12 °C hidegebb, mint a –10 °C.', 'Ha –5 °C-ról 0 °C-ra változik, melegedett.', 'A 0 °C melegebb, mint a –1 °C.'], explanation: '3-tól lefelé 5 fok: 3 a 0-ig, még 2: –2 °C lesz, nem –8 °C. Igazzá téve: 3 °C-ról 5 fokkal hűlve –2 °C lesz.' }),
  q({ id: 'nege-q66', level: 3, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik állítás IGAZ?', options: ['A –2 °C melegebb, mint a –6 °C.', 'A –1 °C hidegebb, mint a –4 °C.', 'Ha –6 °C-ról melegszik 6 fokkal, –12 °C lesz.', 'Minden mínuszos hőmérséklet melegebb, mint a 0 °C.'], explanation: 'A –2 °C közelebb van a 0-hoz, feljebb van a hőmérőn: melegebb, mint a –6 °C. (–6 °C-ról 6 fokkal melegedve 0 °C lesz.)' }),
  q({ id: 'nege-q67', level: 3, questionTypeBadge: 'Hűtő, fagyasztó', figure: <ThermoRow items={[{ value: 6, caption: 'hűtő' }, { value: -14, caption: 'fagyasztó' }]} min={-20} max={10} labelStep={5} h={130} className="w-full max-w-[200px] h-auto mx-auto" />, question: 'A hűtőben 6 °C, a fagyasztóban –14 °C van. Hány fokkal hidegebb a fagyasztóban?', options: ['20 fokkal', '8 fokkal', '14 fokkal', '6 fokkal'], explanation: '6-tól a 0-ig 6 fok, a 0-tól a –14-ig 14 fok. 6 + 14 = 20. A fagyasztóban 20 fokkal hidegebb.' }),
  q({ id: 'nege-q68', level: 3, questionTypeBadge: 'Különbség', figure: cards([-7, 3, -2, 8]), question: 'Hány fok a különbség a leghidegebb és a legmelegebb hőmérséklet között?', options: ['15 fok', '1 fok', '10 fok', '5 fok'], explanation: 'A leghidegebb a –7 °C, a legmelegebb a 8 °C. 7 fok a 0-ig, onnan 8 fok. 7 + 8 = 15 fok.' }),
  q({ id: 'nege-q69', level: 3, questionTypeBadge: 'Lift', figure: lift([4, 3, 2, 1, 0, -1, -2]), question: 'A –2. szintről felmész a 3. emeletre. Hány szintet mész fel?', options: ['5', '1', '3', '6'], explanation: '–2-től a 0-ig 2 szint, a 0-tól a 3-ig 3 szint. 2 + 3 = 5 szint.' }),
  q({ id: 'nege-q70', level: 3, questionTypeBadge: 'Búvár', figure: <DiverSvg depth={5} label="–5 m" className="w-full max-w-[260px] h-auto mx-auto" />, question: 'A búvár –5 m-en van. Feljön 3 métert. Hol lesz?', options: ['–2 m', '–8 m', '2 m', '–3 m'], explanation: 'Feljön: a vízfelszín (0) felé megy. –4, –3, –2. A búvár –2 m-en lesz.' }),
  q({ id: 'nege-q71', level: 3, questionTypeBadge: 'Visszafelé', figure: ct({ from: 2, to: -4, names: ['délben', 'este'], hideFrom: true, arrowText: '6 fok' }), question: 'Este –4 °C volt. Ez 6 fokkal hidegebb, mint délben. Hány fok volt délben?', options: ['2 °C', '–10 °C', '–2 °C', '10 °C'], explanation: 'Délben melegebb volt. –4-től fölfelé 6 fok: 4 fok a 0-ig, még 2: 2 °C.' }),
  q({ id: 'nege-q72', level: 3, questionTypeBadge: 'Számegyenes', figure: nlA(-10, 10, [0, 10], -6), question: 'Csak a 0 és a 10 van kiírva. Melyik számot mutatja a nyíl?', options: ['–6', '–4', '6', '–5'], explanation: 'A nyíl a 0-tól balra van, 6 lépésre: –6.' }),
  q({ id: 'nege-q73', level: 3, questionTypeBadge: 'Sorozat', question: 'Folytasd: 8, 5, 2, … Melyik két szám jön?', options: ['–1, –4', '–1, –3', '1, –2', '–2, –5'], explanation: 'Mindig 3-mal kevesebb. 2-től 3 lépés lefelé: –1. Onnan még 3: –4.' }),
  q({ id: 'nege-q74', level: 3, questionTypeBadge: 'Számok között', figure: <NLSvg from={-6} to={4} labels="all" />, question: 'Hány szám van a –5 és a 3 között? (A –5-öt és a 3-at ne számold!)', options: ['7', '8', '2', '9'], explanation: 'A –5 és a 3 között: –4, –3, –2, –1, 0, 1, 2. Ez 7 szám.' }),
  q({
    id: 'nege-q75',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <TempTableSvg
        head={['reggel', 'délben', 'este']}
        rows={[
          { name: 'hétfő', cells: [-3, 4, -1] },
          { name: 'kedd', cells: [1, 6, -5] }
        ]}
        className="w-full max-w-[280px] h-auto mx-auto"
      />
    ),
    question: 'Kedden délről estére hány fokkal hűlt?',
    options: ['11 fokkal', '1 fokkal', '6 fokkal', '5 fokkal'],
    explanation: 'Kedden délben 6 °C, este –5 °C. 6 fok a 0-ig, még 5 fok. 6 + 5 = 11. Hűlt 11 fokkal.'
  }),
  q({
    id: 'nege-q76',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <TempTableSvg
        head={['reggel', 'délben', 'este']}
        rows={[
          { name: 'hétfő', cells: [-3, 4, -1] },
          { name: 'kedd', cells: [1, 6, -5] }
        ]}
        className="w-full max-w-[280px] h-auto mx-auto"
      />
    ),
    question: 'Hétfőn reggeltől délig hány fokkal melegedett?',
    options: ['7 fokkal', '1 fokkal', '4 fokkal', '3 fokkal'],
    explanation: 'Hétfőn reggel –3 °C, délben 4 °C. 3 fok a 0-ig, még 4 fok. 3 + 4 = 7. Melegedett 7 fokkal.'
  }),
  q({ id: 'nege-q77', level: 3, questionTypeBadge: 'Hidegebb', figure: <ThermoRow items={[{ value: -3, caption: 'A' }, { value: null, caption: 'B' }]} min={-10} max={5} labelStep={5} h={120} className="w-full max-w-[200px] h-auto mx-auto" />, question: 'Az A hőmérő –3 °C-ot mutat. A B 5 fokkal hidegebbet. Mit mutat a B?', options: ['–8 °C', '2 °C', '–2 °C', '8 °C'], explanation: 'Hidegebb: lefelé lépünk 5 fokot a –3-tól: –4, –5, –6, –7, –8. A B –8 °C-ot mutat.' }),
  q({ id: 'nege-q78', level: 3, questionTypeBadge: 'Két változás', question: 'Délben 1 °C volt. Délutánra melegedett 3 fokkal, estére hűlt 9 fokkal. Hány fok volt este?', options: ['–5 °C', '–8 °C', '13 °C', '5 °C'], explanation: 'Délután: 1 + 3 = 4 °C. Este: 4-től lefelé 9 fok: 4 a 0-ig, még 5: –5 °C.' }),
  q({
    id: 'nege-q79',
    level: 3,
    questionTypeBadge: 'Bent és kint',
    figure: (
      <TempTableSvg
        head={['hétfő', 'kedd', 'szerda']}
        rows={[
          { name: 'bent', cells: [20, 19, 21] },
          { name: 'kint', cells: [-5, 4, -2] }
        ]}
        className="w-full max-w-[280px] h-auto mx-auto"
      />
    ),
    question: 'Melyik napon volt a legkisebb a különbség a benti és a kinti hőmérséklet között?',
    options: ['kedden', 'hétfőn', 'szerdán', 'mindhárom napon ugyanannyi'],
    explanation: 'Hétfő: 5 + 20 = 25 fok. Kedd: 19 – 4 = 15 fok. Szerda: 2 + 21 = 23 fok. Kedden volt a legkisebb.'
  }),
  q({ id: 'nege-q80', level: 3, questionTypeBadge: 'Lift', figure: lift([3, 2, 1, 0, -1, -2]), question: 'A lift a 3. emeletről indul, és 5 szintet megy le. Hol áll meg?', options: ['a –2. szinten', 'a –1. szinten', 'a földszinten', 'a –3. szinten'], explanation: '3-tól a 0-ig 3 szint. Kell még 5 – 3 = 2 szint lefelé: a –2. szinten áll meg.' }),
  q({ id: 'nege-q81', level: 3, questionTypeBadge: 'Hőmérő és változás', figure: th(-7), question: 'Ennyit mutat a hőmérő reggel. Délig melegedett 10 fokkal. Hány fok lett délben?', options: ['3 °C', '–17 °C', '–3 °C', '17 °C'], explanation: 'Reggel –7 °C. Fölfelé 10 fok: 7 fok a 0-ig, még 3 fok. Délben 3 °C lett.' }),
  q({ id: 'nege-q82', level: 3, questionTypeBadge: 'Fagypont', figure: th(-12, -20, 10, 10), question: 'Hány fokkal kell melegednie, hogy éppen fagypont legyen?', options: ['12 fokkal', '8 fokkal', '2 fokkal', '22 fokkal'], explanation: 'A hőmérő –12 °C-ot mutat (a –10 alatt 2 vonallal). A fagypont 0 °C. A 0-ig 12 fokot kell fölfelé lépni.' }),
  q({
    id: 'nege-q83',
    level: 3,
    questionTypeBadge: 'Távolság',
    figure: <NLSvg from={-6} to={6} labels={[0]} points={[{ v: -5, letter: 'A' }, { v: -1, letter: 'B' }, { v: 2, letter: 'C' }, { v: 4, letter: 'D' }]} />,
    question: 'Melyik két betű van a legmesszebb egymástól?',
    options: ['A és D', 'A és B', 'C és D', 'B és C'],
    explanation: 'Az A a –5, a D a 4. Ők a két szélső pont: 5 + 4 = 9 lépés van köztük. A többi pár közelebb van.'
  }),
  q({ id: 'nege-q84', level: 3, questionTypeBadge: 'Lépések', figure: <NLSvg from={-6} to={4} labels="all" points={[{ v: -1 }]} />, question: 'Melyik két szám van 3 lépésre a –1-től?', options: ['–4 és 2', '–4 és 4', '–3 és 3', '–2 és 2'], explanation: 'A –1-től balra 3 lépés: –2, –3, –4. Jobbra 3 lépés: 0, 1, 2. A két szám: –4 és 2.' }),
  q({ id: 'nege-q85', level: 3, questionTypeBadge: 'Sorrend', question: 'Melyik sorrend NÖVEKVŐ?', options: ['–11, –4, 0, 6', '–4, –11, 0, 6', '6, 0, –4, –11', '0, –4, –11, 6'], explanation: 'Növekvő: a legkisebbtől (leghidegebbtől) indulunk. A –11 kisebb, mint a –4. Ezért: –11, –4, 0, 6.' }),
  q({
    id: 'nege-q86',
    level: 3,
    questionTypeBadge: 'Időjárás',
    figure: fc([
      { day: 'hétfő', w: 'cloud', hi: 3, lo: -1 },
      { day: 'kedd', w: 'snow', hi: 1, lo: -5 },
      { day: 'szerda', w: 'sun', hi: 4, lo: 0 }
    ]),
    question: 'Hány fokkal lesz melegebb szerdán nappal, mint kedden éjjel?',
    options: ['9 fokkal', '1 fokkal', '4 fokkal', '5 fokkal'],
    explanation: 'Kedden éjjel (kék) –5 °C, szerdán nappal (piros) 4 °C. 5 fok a 0-ig, még 4 fok. 5 + 4 = 9 fokkal.'
  }),
  q({ id: 'nege-q87', level: 3, questionTypeBadge: 'Két változás', question: 'Hétfő reggel –2 °C volt. Kedd reggel 2 fokkal hidegebb volt, szerda reggel 6 fokkal melegebb, mint kedden. Hány fok volt szerda reggel?', options: ['2 °C', '–10 °C', '6 °C', '–2 °C'], explanation: 'Kedd: –2-től lefelé 2 fok: –4 °C. Szerda: –4-től fölfelé 6 fok: 4 a 0-ig, még 2: 2 °C.' }),
  q({ id: 'nege-q88', level: 3, questionTypeBadge: 'Átlépés a 0-n', figure: ct({ from: -8, to: 7, arrowText: '? fok' }), question: 'Reggel –8 °C, délután 7 °C volt. Hány fokkal melegedett?', options: ['15 fokkal', '1 fokkal', '7 fokkal', '8 fokkal'], explanation: '–8-tól a 0-ig 8 fok, a 0-tól a 7-ig 7 fok. 8 + 7 = 15. Melegedett 15 fokkal.' }),
  q({ id: 'nege-q89', level: 3, questionTypeBadge: 'Igaza van?', question: 'Bori szerint –5 °C-ról 4 fokkal melegedve –9 °C lesz. Igaza van?', options: ['Nem, –1 °C lesz.', 'Igen, igaza van.', 'Nem, 9 °C lesz.', 'Nem, 1 °C lesz.'], explanation: 'Melegedéskor fölfelé lépünk, a 0 felé: –4, –3, –2, –1. –1 °C lesz. Bori lefelé lépett.' }),
  q({ id: 'nege-q90', level: 3, questionTypeBadge: 'Legmelegebb, leghidegebb', figure: <CompareThermosSvg values={[-4, 2, -9]} />, question: 'Hány fokkal mutat többet a legmelegebb hőmérő, mint a leghidegebb?', options: ['11 fokkal', '7 fokkal', '5 fokkal', '13 fokkal'], explanation: 'A: –4 °C, B: 2 °C, C: –9 °C. A legmelegebb a B (2 °C), a leghidegebb a C (–9 °C). 9 + 2 = 11 fokkal.' })
];

export const NEG_EXAM_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const NegExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId="g3-neg-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: hőmérő, fagypont, lift és búvár, számegyenes, hidegebb–melegebb, sorrend, melegedés és hűlés."
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEG_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hőmérő, fagypont',
          items: ['0 °C: fagypont', 'A 0 alatt mínusz: –3 °C', 'Olvasd: mínusz három celziusz-fok']
        },
        {
          title: 'Számegyenes',
          items: ['0-tól jobbra: 1, 2, 3 …', '0-tól balra: –1, –2, –3 …', 'Számold a lépéseket (a 0 nem lépés)!']
        },
        {
          title: 'Hidegebb, változás',
          items: ['Lejjebb = hidegebb = kisebb', 'Fölfelé: melegedett, lefelé: hűlt', 'Átlépés a 0-n: a 0-ig, aztán tovább']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<NegExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<NegExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default NegExamG3Quiz;
