import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegChangesG3Matcher } from './NegChangesG3Matcher';
import { NegChangesG3Sorter } from './NegChangesG3Sorter';
import { ChangeThermoSvg, TempCardsSvg, WeekChartSvg, TempTableSvg, CompareThermosSvg, ForecastSvg, ThermoRow } from './NegChangesG3Parts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

const small = 'w-full max-w-[260px] h-auto mx-auto';

export const NEG_CHANGES_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  q({
    id: 'neg-chg-g3-q1',
    level: 1,
    questionTypeBadge: 'Hidegebb',
    figure: <CompareThermosSvg values={[-6, 3]} />,
    question: 'Melyik hőmérő mutat hidegebbet?',
    options: ['az A', 'a B', 'egyformát mutatnak', 'nem lehet eldönteni'],
    explanation: 'Az A –6 °C-ot mutat, a B 3 °C-ot. Az A oszlopa van lejjebb, ezért az A mutat hidegebbet.'
  }),
  q({
    id: 'neg-chg-g3-q2',
    level: 1,
    questionTypeBadge: 'Hidegebb',
    question: 'Melyik a hidegebb: –8 °C vagy –3 °C?',
    options: ['–8 °C', '–3 °C', 'egyforma hideg', 'nem lehet eldönteni'],
    explanation: 'A –8 °C 8 fokkal van a 0 alatt, a –3 °C csak 3 fokkal. A –8 °C a hidegebb.'
  }),
  q({
    id: 'neg-chg-g3-q3',
    level: 1,
    questionTypeBadge: 'Legmelegebb',
    figure: <TempCardsSvg values={[-1, -9, 0, -4]} className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Melyik a legmelegebb?',
    options: ['0 °C', '–9 °C', '–1 °C', '–4 °C'],
    explanation: 'A többi mind mínuszos, vagyis a 0 alatt van. A 0 °C van közülük a legfeljebb a hőmérőn.'
  }),
  q({
    id: 'neg-chg-g3-q4',
    level: 1,
    questionTypeBadge: 'Melegedett vagy hűlt?',
    figure: <ChangeThermoSvg from={2} to={7} min={-5} max={10} className={small} />,
    question: 'Reggel 2 °C, délben 7 °C volt. Melegedett vagy hűlt a levegő?',
    options: ['melegedett', 'hűlt', 'nem változott', 'előbb hűlt, aztán melegedett'],
    explanation: 'A 7 °C több, mint a 2 °C: a hőmérő fölfelé ment. A levegő melegedett.'
  }),
  q({
    id: 'neg-chg-g3-q5',
    level: 1,
    questionTypeBadge: 'Hány fokkal?',
    figure: <ChangeThermoSvg from={9} to={4} min={-5} max={10} names={['délben', 'este']} arrowText="? fok" className={small} />,
    question: 'Délben 9 °C, este 4 °C volt. Hány fokkal hűlt a levegő?',
    options: ['5 fokkal', '13 fokkal', '4 fokkal', '9 fokkal'],
    explanation: 'Lefelé lépünk 9-től 4-ig: 5 lépés. Kivonással: 9 – 4 = 5. Hűlt 5 fokkal.'
  }),
  q({
    id: 'neg-chg-g3-q6',
    level: 1,
    questionTypeBadge: 'Változás',
    figure: <ChangeThermoSvg from={-6} to={-2} min={-10} max={5} arrowText="? fok" className={small} />,
    question: 'Hogyan változott a hőmérséklet?',
    options: ['melegedett 4 fokkal', 'hűlt 4 fokkal', 'melegedett 8 fokkal', 'hűlt 8 fokkal'],
    explanation: '–6-tól fölfelé –2-ig: –5, –4, –3, –2. Ez 4 lépés fölfelé. Melegedett 4 fokkal.'
  }),
  q({
    id: 'neg-chg-g3-q7',
    level: 1,
    questionTypeBadge: 'Relációs jel',
    figure: <ThermoRow items={[{ value: -5, caption: '–5 °C' }, { value: -1, caption: '–1 °C' }]} min={-10} max={5} labelStep={5} h={110} className="w-full max-w-[200px] h-auto mx-auto" />,
    question: 'Melyik igaz?',
    options: ['–5 °C < –1 °C', '–5 °C > –1 °C', '–5 °C = –1 °C', '–1 °C < –5 °C'],
    explanation: 'A –5 °C a hidegebb, ezért ez a kisebb: –5 °C < –1 °C. A jel hegye a kisebb felé mutat.'
  }),
  q({
    id: 'neg-chg-g3-q8',
    level: 1,
    questionTypeBadge: 'Mennyi lett?',
    figure: <ChangeThermoSvg from={0} to={-3} min={-5} max={5} names={['este', 'éjjel']} hideTo arrowText="3 fok" className={small} />,
    question: 'Este 0 °C volt. Éjjel hűlt 3 fokkal. Hány fok lett?',
    options: ['–3 °C', '3 °C', '–2 °C', '0 °C'],
    explanation: 'A 0-tól 3 fokot lépünk lefelé: –1, –2, –3. Éjjel –3 °C lett.'
  }),
  q({
    id: 'neg-chg-g3-q9',
    level: 1,
    questionTypeBadge: 'Hidegebb',
    question: 'Melyik hőmérséklet hidegebb, mint a –2 °C?',
    options: ['–5 °C', '–1 °C', '0 °C', '3 °C'],
    explanation: 'A –5 °C lejjebb van a hőmérőn, mint a –2 °C. A –1 °C, a 0 °C és a 3 °C mind melegebb.'
  }),
  q({
    id: 'neg-chg-g3-q10',
    level: 1,
    questionTypeBadge: 'Időjárás',
    figure: (
      <ForecastSvg
        days={[
          { day: 'hétfő', w: 'snow', hi: 1, lo: -2 },
          { day: 'kedd', w: 'suncloud', hi: 3, lo: -6 },
          { day: 'szerda', w: 'cloud', hi: 4, lo: 1 },
          { day: 'csüt.', w: 'snow', hi: 0, lo: -4 }
        ]}
        className="w-full max-w-[260px] h-auto mx-auto"
      />
    ),
    question: 'A kék körök az éjszakai hőmérsékletet mutatják. Melyik éjszaka lesz a leghidegebb?',
    options: ['kedden', 'csütörtökön', 'hétfőn', 'szerdán'],
    explanation: 'Éjjel: hétfőn –2 °C, kedden –6 °C, szerdán 1 °C, csütörtökön –4 °C. A –6 °C a leghidegebb: kedden.'
  }),

  // ------------------------------- 2. szint -------------------------------
  q({
    id: 'neg-chg-g3-q11',
    level: 2,
    questionTypeBadge: 'Növekvő sorrend',
    figure: <TempCardsSvg values={[6, -3, 0, -8]} className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Rendezd növekvő sorrendbe, a leghidegebbtől kezdve!',
    options: ['–8, –3, 0, 6', '–3, –8, 0, 6', '6, 0, –3, –8', '0, –3, –8, 6'],
    explanation: 'A leghidegebb a –8 °C, utána a –3 °C, aztán a 0 °C, végül a 6 °C. Növekvő sorrend: –8, –3, 0, 6.'
  }),
  q({
    id: 'neg-chg-g3-q12',
    level: 2,
    questionTypeBadge: 'Csökkenő sorrend',
    figure: <TempCardsSvg values={[-2, 4, -7, 1]} className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Rendezd csökkenő sorrendbe, a legmelegebbtől kezdve!',
    options: ['4, 1, –2, –7', '–7, –2, 1, 4', '4, 1, –7, –2', '1, 4, –2, –7'],
    explanation: 'A legmelegebb a 4 °C, aztán az 1 °C. A mínuszosak közül a –2 °C a melegebb, a –7 °C a leghidegebb. Csökkenő sorrend: 4, 1, –2, –7.'
  }),
  q({
    id: 'neg-chg-g3-q13',
    level: 2,
    questionTypeBadge: 'Átlépés a 0-n',
    figure: <ChangeThermoSvg from={-2} to={5} min={-10} max={10} arrowText="? fok" className={small} />,
    question: 'Reggel –2 °C, délben 5 °C volt. Hány fokkal melegedett?',
    options: ['7 fokkal', '3 fokkal', '5 fokkal', '8 fokkal'],
    explanation: '–2-től a 0-ig 2 fok, a 0-tól az 5-ig 5 fok. 2 + 5 = 7. Melegedett 7 fokkal. (Az 5 – 2 = 3 rossz, mert a –2 a 0 alatt van!)'
  }),
  q({
    id: 'neg-chg-g3-q14',
    level: 2,
    questionTypeBadge: 'Átlépés a 0-n',
    figure: <ChangeThermoSvg from={3} to={-4} min={-10} max={10} names={['este', 'éjjel']} arrowText="? fok" className={small} />,
    question: 'Este 3 °C, éjjel –4 °C volt. Hány fokkal hűlt?',
    options: ['7 fokkal', '1 fokkal', '4 fokkal', '3 fokkal'],
    explanation: '3-tól a 0-ig 3 fok, a 0-tól a –4-ig 4 fok. 3 + 4 = 7. Hűlt 7 fokkal.'
  }),
  q({
    id: 'neg-chg-g3-q15',
    level: 2,
    questionTypeBadge: 'Mennyi lett?',
    figure: <ChangeThermoSvg from={-5} to={0} min={-10} max={5} hideTo arrowText="5 fok" className={small} />,
    question: 'Reggel –5 °C volt. Délig melegedett 5 fokkal. Hány fok lett délben?',
    options: ['0 °C', '–10 °C', '5 °C', '–1 °C'],
    explanation: '–5-től fölfelé 5 fok: –4, –3, –2, –1, 0. Délben 0 °C lett.'
  }),
  q({
    id: 'neg-chg-g3-q16',
    level: 2,
    questionTypeBadge: 'Mennyi lett?',
    figure: <ChangeThermoSvg from={4} to={-2} min={-5} max={10} names={['délután', 'éjjel']} hideTo arrowText="6 fok" className={small} />,
    question: 'Délután 4 °C volt. Éjjelre hűlt 6 fokkal. Hány fok lett éjjel?',
    options: ['–2 °C', '2 °C', '–10 °C', '10 °C'],
    explanation: '4 fokot lépünk le a 0-ig. Kell még 6 – 4 = 2 fok lefelé. A 0 alatt 2 fokkal: –2 °C.'
  }),
  q({
    id: 'neg-chg-g3-q17',
    level: 2,
    questionTypeBadge: 'Mennyi lett?',
    question: 'Hajnalban –3 °C volt. Reggelre hűlt még 4 fokkal. Hány fok lett?',
    options: ['–7 °C', '–1 °C', '1 °C', '7 °C'],
    explanation: 'Hűlt: lefelé megyünk, még messzebb a 0-tól. –4, –5, –6, –7. Reggel –7 °C lett.'
  }),
  q({
    id: 'neg-chg-g3-q18',
    level: 2,
    questionTypeBadge: 'Grafikon',
    figure: (
      <WeekChartSvg
        days={[
          { day: 'hétfő', v: -3 },
          { day: 'kedd', v: -1 },
          { day: 'szerda', v: 2 },
          { day: 'csüt.', v: 4 },
          { day: 'péntek', v: 1 }
        ]}
        min={-4}
        max={6}
      />
    ),
    question: 'A grafikon a reggeli hőmérsékletet mutatja. Hány fokkal volt melegebb szerdán reggel, mint hétfőn reggel?',
    options: ['5 fokkal', '1 fokkal', '2 fokkal', '3 fokkal'],
    explanation: 'Hétfőn –3 °C, szerdán 2 °C volt. –3-tól a 0-ig 3 fok, onnan 2-ig 2 fok. 3 + 2 = 5 fokkal volt melegebb.'
  }),
  q({
    id: 'neg-chg-g3-q19',
    level: 2,
    questionTypeBadge: 'Igaza van?',
    question: 'Zsófi azt mondja: „A –3 °C melegebb, mint a –1 °C, mert a 3 több, mint az 1.” Igaza van?',
    options: ['Nem, a –3 °C a hidegebb.', 'Igen, igaza van.', 'Nem, mert egyforma meleg van.', 'Nem, mert a –1 °C a hidegebb.'],
    explanation: 'A –3 °C 3 fokkal van a 0 alatt, a –1 °C csak 1 fokkal. Ami lejjebb van, az a hidegebb: a –3 °C.'
  }),
  q({
    id: 'neg-chg-g3-q20',
    level: 2,
    questionTypeBadge: 'Bent és kint',
    figure: <ThermoRow items={[{ value: 20, caption: 'bent' }, { value: -3, caption: 'kint' }]} min={-5} max={25} labelStep={5} h={130} className="w-full max-w-[200px] h-auto mx-auto" />,
    question: 'Bent 20 °C, kint –3 °C van. Hány fokkal melegebb bent?',
    options: ['23 fokkal', '17 fokkal', '20 fokkal', '3 fokkal'],
    explanation: '–3-tól a 0-ig 3 fok, a 0-tól a 20-ig 20 fok. 3 + 20 = 23. Bent 23 fokkal melegebb.'
  }),

  // ------------------------------- 3. szint -------------------------------
  q({
    id: 'neg-chg-g3-q21',
    level: 3,
    questionTypeBadge: 'Két változás',
    question: 'Reggel –4 °C volt. Délig melegedett 7 fokkal, estére hűlt 5 fokkal. Hány fok volt este?',
    options: ['–2 °C', '2 °C', '8 °C', '–6 °C'],
    explanation: 'Délben: –4-től fölfelé 7 fok: 4 fok a 0-ig, még 3 fok: 3 °C. Este: 3-tól lefelé 5 fok: 3 fok a 0-ig, még 2 fok: –2 °C.'
  }),
  q({
    id: 'neg-chg-g3-q22',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás HAMIS?',
    options: ['A –9 °C melegebb, mint a –4 °C.', 'A –1 °C hidegebb, mint a 0 °C.', 'Ha 2 °C-ról 0 °C-ra változik, hűlt a levegő.', 'A –6 °C hidegebb, mint a 2 °C.'],
    explanation: 'A –9 °C lejjebb van a hőmérőn, mint a –4 °C, tehát hidegebb. Igazzá téve: a –9 °C hidegebb, mint a –4 °C. A másik három állítás igaz.'
  }),
  q({
    id: 'neg-chg-g3-q23',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás IGAZ?',
    options: ['Ha 5 °C-ról hűl 7 fokkal, –2 °C lesz.', 'Ha –3 °C-ról melegszik 3 fokkal, –6 °C lesz.', 'Ha –2 °C-ról 0 °C-ra változik, hidegebb lett.', 'A –8 °C melegebb, mint a –5 °C.'],
    explanation: '5-től lefelé 5 fok a 0-ig, még 2 fok: –2 °C. Ez igaz. (–3-ról 3 fokkal melegedve 0 °C lesz; –2 °C-ról 0 °C-ra melegedett; a –8 °C hidegebb.)'
  }),
  q({
    id: 'neg-chg-g3-q24',
    level: 3,
    questionTypeBadge: 'Időjárás',
    figure: (
      <ForecastSvg
        days={[
          { day: 'hétfő', w: 'cloud', hi: 3, lo: -2 },
          { day: 'kedd', w: 'sun', hi: 5, lo: -4 },
          { day: 'szerda', w: 'cloud', hi: 2, lo: 0 },
          { day: 'csüt.', w: 'snow', hi: 1, lo: -5 }
        ]}
        className="w-full max-w-[260px] h-auto mx-auto"
      />
    ),
    question: 'Piros: nappal, kék: éjjel. Melyik napon a legnagyobb a különbség a nappali és az éjszakai hőmérséklet között?',
    options: ['kedden', 'csütörtökön', 'hétfőn', 'szerdán'],
    explanation: 'Hétfő: 2 + 3 = 5 fok. Kedd: 4 + 5 = 9 fok. Szerda: 2 fok. Csütörtök: 5 + 1 = 6 fok. Kedden a legnagyobb.'
  }),
  q({
    id: 'neg-chg-g3-q25',
    level: 3,
    questionTypeBadge: 'Hűtő, fagyasztó',
    figure: <ThermoRow items={[{ value: 4, caption: 'hűtő' }, { value: -15, caption: 'fagyasztó' }]} min={-20} max={10} labelStep={5} h={130} className="w-full max-w-[200px] h-auto mx-auto" />,
    question: 'A hűtőben 4 °C van, a fagyasztóban –15 °C. Hány fokkal hidegebb a fagyasztóban?',
    options: ['19 fokkal', '11 fokkal', '15 fokkal', '4 fokkal'],
    explanation: '4-től a 0-ig 4 fok, a 0-tól a –15-ig 15 fok. 4 + 15 = 19. A fagyasztóban 19 fokkal hidegebb.'
  }),
  q({
    id: 'neg-chg-g3-q26',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: <TempCardsSvg values={[-6, 2, -1, 5]} className="w-full max-w-[280px] h-auto mx-auto" />,
    question: 'Hány fok a különbség a leghidegebb és a legmelegebb hőmérséklet között?',
    options: ['11 fok', '1 fok', '8 fok', '6 fok'],
    explanation: 'A leghidegebb a –6 °C, a legmelegebb az 5 °C. –6-tól a 0-ig 6 fok, onnan 5-ig 5 fok. 6 + 5 = 11 fok.'
  }),
  q({
    id: 'neg-chg-g3-q27',
    level: 3,
    questionTypeBadge: 'Két változás',
    question: 'Este –1 °C volt. Éjjel hűlt 4 fokkal, reggelre melegedett 2 fokkal. Hány fok volt reggel?',
    options: ['–3 °C', '–7 °C', '1 °C', '–5 °C'],
    explanation: 'Éjjel: –1-től lefelé 4 fok: –5 °C. Reggel: –5-től fölfelé 2 fok: –3 °C.'
  }),
  q({
    id: 'neg-chg-g3-q28',
    level: 3,
    questionTypeBadge: 'Grafikon',
    figure: (
      <WeekChartSvg
        days={[
          { day: 'hétfő', v: 4 },
          { day: 'kedd', v: 1 },
          { day: 'szerda', v: -3 },
          { day: 'csüt.', v: -2 },
          { day: 'péntek', v: 3 }
        ]}
        min={-4}
        max={6}
      />
    ),
    question: 'Melyik két nap között hűlt a legtöbbet a reggeli hőmérséklet?',
    options: ['kedd és szerda között', 'hétfő és kedd között', 'csütörtök és péntek között', 'szerda és csütörtök között'],
    explanation: 'Hétfő → kedd: hűlt 3 fokkal. Kedd → szerda: 1 → –3, hűlt 4 fokkal. Szerda → csütörtök és csütörtök → péntek: melegedett. A legtöbbet kedd és szerda között hűlt.'
  }),
  q({
    id: 'neg-chg-g3-q29',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <ChangeThermoSvg from={-3} to={5} min={-10} max={10} hideFrom arrowText="8 fok" className={small} />,
    question: 'Délben 5 °C volt. Ez 8 fokkal melegebb, mint reggel. Hány fok volt reggel?',
    options: ['–3 °C', '13 °C', '3 °C', '–13 °C'],
    explanation: 'Reggel hidegebb volt: 5-től lefelé lépünk 8 fokot. 5 fok a 0-ig, még 3 fok: –3 °C.'
  }),
  q({
    id: 'neg-chg-g3-q30',
    level: 3,
    questionTypeBadge: 'Bent és kint',
    figure: (
      <TempTableSvg
        head={['hétfő', 'kedd', 'szerda']}
        rows={[
          { name: 'bent', cells: [21, 20, 22] },
          { name: 'kint', cells: [3, -4, -1] }
        ]}
        className="w-full max-w-[280px] h-auto mx-auto"
      />
    ),
    question: 'Melyik napon volt a legnagyobb a különbség a benti és a kinti hőmérséklet között?',
    options: ['kedden', 'hétfőn', 'szerdán', 'mindhárom napon ugyanannyi'],
    explanation: 'Hétfő: 21 – 3 = 18 fok. Kedd: 4 + 20 = 24 fok. Szerda: 1 + 22 = 23 fok. Kedden volt a legnagyobb.'
  })
];

export const NegChangesG3Quiz: React.FC<{
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
      topicId="g3-neg-valtozasok-quiz"
      subtopicId="osszehasonlitas-es-valtozasok"
      title="3. Összehasonlítás és változások – Kvíz"
      subtitle="30 feladat 3 szinten: hidegebb, melegebb, sorba rendezés, melegedés és hűlés."
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEG_CHANGES_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hidegebb, melegebb',
          items: ['Lejjebb a hőmérőn = hidegebb.', 'A –6 °C hidegebb, mint a –1 °C.', 'Hidegebb = kisebb: –6 °C < –1 °C']
        },
        {
          title: 'Sorrend',
          items: ['Növekvő: a leghidegebbtől.', 'Csökkenő: a legmelegebbtől.', 'Kezdd a mínuszos számokkal!']
        },
        {
          title: 'Változás',
          items: ['Fölfelé: melegedett. Lefelé: hűlt.', 'Számold a lépéseket!', 'Átlépés a 0-n: –2 °C → 5 °C: 2 + 5 = 7 fok']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<NegChangesG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<NegChangesG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default NegChangesG3Quiz;
