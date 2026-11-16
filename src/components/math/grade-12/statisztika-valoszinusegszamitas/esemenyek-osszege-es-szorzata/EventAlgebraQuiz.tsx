import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { EventAlgebraMatcher } from './EventAlgebraMatcher';
import { EventAlgebraSorter } from './EventAlgebraSorter';
import { Circuit, COIN_VENN_ITEMS, WEATHER } from './EventAlgebraFigures';
import { QFig, T, Venn2, F_GREEN, F_RED, F_AMBER, F_BLUE, C_RED, C_AMBER, C_BLUE, C_PURPLE, bar } from './probKit';

const A_ = bar('A');
const B_ = bar('B');

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_LENS = (
  <QFig>
    <Venn2 x={10} y={10} w={220} h={140} r={46} gap={58} shade={{ ab: F_GREEN }} />
  </QFig>
);
const FIG_UNION = (
  <QFig>
    <Venn2 x={10} y={10} w={220} h={140} r={46} gap={58} shade={{ aOnly: F_GREEN, ab: F_GREEN, bOnly: F_GREEN }} />
  </QFig>
);
const FIG_COINS = (
  <QFig>
    <Venn2 x={0} y={0} w={240} h={160} r={52} gap={74} items={COIN_VENN_ITEMS(0, 0)} />
  </QFig>
);
const FIG_DIE = (
  <QFig>
    <Venn2
      x={10}
      y={10}
      w={220}
      h={140}
      r={46}
      gap={58}
      items={[
        { x: 78, y: 84, t: '2', s: 13 },
        { x: 120, y: 72, t: '4', s: 13 },
        { x: 120, y: 100, t: '6', s: 13 },
        { x: 162, y: 84, t: '5', s: 13 },
        { x: 30, y: 136, t: '1', s: 13 },
        { x: 210, y: 136, t: '3', s: 13 }
      ]}
    />
  </QFig>
);
const FIG_COUNTS = (
  <QFig>
    <Venn2 x={10} y={10} w={220} h={140} r={46} gap={58} labelA="A: 7" labelB="B: 5" />
    <T x={120} y={86} t="2" s={15} b c={C_PURPLE} />
    <T x={120} y={142} t="|A + B| = ?" s={11} b />
  </QFig>
);

const weatherFig = (rows: ('A' | 'B' | 'C')[]) => {
  const D = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  const data = {
    A: { vals: WEATHER.TEMP.map((t) => `${t}°`), name: 'hőm.', c: C_BLUE },
    B: { vals: WEATHER.RAIN.map((r) => `${r}`), name: 'mm', c: C_RED },
    C: { vals: WEATHER.WIND.map((w) => `${w}`), name: 'km/h', c: C_AMBER }
  };
  return (
    <QFig w={240} h={30 + rows.length * 26 + 30}>
      {D.map((d, j) => (
        <T key={d} x={58 + j * 25 + 12.5} y={16} t={d} s={9} b />
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <T x={52} y={40 + i * 26} t={`${data[r].name}`} s={9} a="end" b c={data[r].c} />
          {data[r].vals.map((v, j) => (
            <g key={j}>
              <rect x={58 + j * 25} y={28 + i * 26} width={25} height={24} fill="#ffffff" stroke="#94a3b8" />
              <T x={58 + j * 25 + 12.5} y={40 + i * 26} t={v} s={9} />
            </g>
          ))}
        </g>
      ))}
    </QFig>
  );
};
const FIG_W_BC = weatherFig(['B', 'C']);
const FIG_W_AB = weatherFig(['A', 'B']);
const FIG_W_ABC = weatherFig(['A', 'B', 'C']);

const FIG_CIRCUIT = (
  <QFig w={240} h={180}>
    <Circuit x={2} y={4} />
  </QFig>
);

const EVENT_ALGEBRA_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'ea-q1',
    questionTypeBadge: 'Összeg',
    level: 1,
    question: 'Mikor következik be az A + B esemény?',
    options: ['ha A és B közül legalább az egyik bekövetkezik', 'ha A és B is bekövetkezik', 'ha pontosan az egyik következik be', 'ha egyik sem következik be'],
    correctAnswer: 0,
    explanation: 'Az A és B összege („A vagy B”) pontosan akkor következik be, ha legalább az egyik bekövetkezik – akár mindkettő is.'
  },
  {
    id: 'ea-q2',
    questionTypeBadge: 'Szorzat',
    level: 1,
    question: 'Mikor következik be az A · B esemény?',
    options: ['ha A és B is bekövetkezik', 'ha A és B közül legalább az egyik bekövetkezik', 'ha A bekövetkezik, B nem', 'ha egyik sem következik be'],
    correctAnswer: 0,
    explanation: 'Az A és B szorzata („A és B”) pontosan akkor következik be, ha mindkét esemény bekövetkezik.'
  },
  {
    id: 'ea-q3',
    questionTypeBadge: 'Venn-diagram',
    figure: FIG_LENS,
    level: 1,
    question: 'Melyik eseményt jelöli a színezett tartomány?',
    options: ['A · B', 'A + B', `A · ${B_}`, `${A_} · B`],
    correctAnswer: 0,
    explanation: 'A színezett rész a két kör közös része: azok az elemi események, amelyek A-hoz és B-hez is tartoznak – ez az A · B.'
  },
  {
    id: 'ea-q4',
    questionTypeBadge: 'Venn-diagram',
    figure: FIG_UNION,
    level: 1,
    question: 'Melyik eseményt jelöli a színezett tartomány?',
    options: ['A + B', 'A · B', `${A_} + ${B_}`, `${A_} · ${B_}`],
    correctAnswer: 0,
    explanation: 'Mindkét kör teljes egészében színezett: azok az elemi események, amelyek legalább az egyik eseményhez tartoznak – ez az A + B.'
  },
  {
    id: 'ea-q5',
    questionTypeBadge: 'Szorzat',
    figure: FIG_DIE,
    level: 1,
    question: 'Kockadobásnál A: páros számot dobunk, B: legalább 4-et dobunk. Melyik halmaz az A · B?',
    options: ['{4; 6}', '{2; 4; 5; 6}', '{4; 5; 6}', '{2; 4; 6}'],
    correctAnswer: 0,
    explanation: 'Páros is és legalább 4 is: 4 és 6. Ez a két kör közös része.'
  },
  {
    id: 'ea-q6',
    questionTypeBadge: 'Összeg',
    figure: FIG_DIE,
    level: 1,
    question: 'Kockadobásnál A: páros számot dobunk, B: legalább 4-et dobunk. Melyik halmaz az A + B?',
    options: ['{2; 4; 5; 6}', '{4; 6}', '{2; 4; 4; 5; 6; 6}', '{1; 3}'],
    correctAnswer: 0,
    explanation: 'Páros vagy legalább 4: 2, 4, 5, 6 (a közös elemeket csak egyszer írjuk). Az {1; 3} az A + B komplementere.'
  },
  {
    id: 'ea-q7',
    questionTypeBadge: 'Komplementer',
    level: 1,
    question: `Milyen esemény az A · ${A_}?`,
    options: ['a lehetetlen esemény', 'a biztos esemény', 'maga az A esemény', `az ${A_} esemény`],
    correctAnswer: 0,
    explanation: `A és ${A_} nem következhet be egyszerre (kizárják egymást), és egymást kizáró események szorzata a lehetetlen esemény.`
  },
  {
    id: 'ea-q8',
    questionTypeBadge: 'Komplementer',
    level: 1,
    question: `Milyen esemény az A + ${A_}?`,
    options: ['a biztos esemény', 'a lehetetlen esemény', 'maga az A esemény', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: `Minden kimenetelnél vagy A, vagy ${A_} bekövetkezik, így összegük a biztos esemény (az egész eseménytér, H).`
  },
  {
    id: 'ea-q9',
    questionTypeBadge: 'Kizáró események',
    level: 1,
    question: 'Kockadobásnál A: 1-est dobunk, B: 6-ost dobunk. Melyik állítás igaz?',
    options: ['A · B lehetetlen, A + B = {1; 6}', 'A · B = {1; 6}', 'A + B biztos esemény', 'A + B lehetetlen esemény'],
    correctAnswer: 0,
    explanation: 'Egyszerre nem dobhatunk 1-est és 6-ost (A · B = ∅), az „1-est vagy 6-ost dobunk” esemény pedig {1; 6}.'
  },
  {
    id: 'ea-q10',
    questionTypeBadge: 'Időjárás',
    figure: FIG_W_BC,
    level: 1,
    question: 'B: a csapadék több, mint 5 mm; C: a szél erősebb, mint 5 km/h. Melyik napon következett be a B · C esemény?',
    options: ['csak csütörtökön', 'szerdán és csütörtökön', 'csütörtökön és vasárnap', 'egyik nap sem'],
    correctAnswer: 0,
    explanation: 'B: szerda (12), csütörtök (8), vasárnap (6). C: kedd (8), csütörtök (26), péntek (18). Mindkettő csak csütörtökön teljesül.'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'ea-q11',
    questionTypeBadge: 'Három pénzérme',
    level: 2,
    question: 'Három érmét dobunk (10, 20, 50 Ft). A: a 10 Ft-oson írás van; B: pontosan egy fej van. Hány elemi esemény tartozik az A + B eseményhez?',
    options: ['5', '7', '2', '4'],
    correctAnswer: 0,
    explanation: 'A: III, IIF, IFI, IFF; B: IIF, IFI, FII. Az összeg: III, IIF, IFI, IFF, FII – 5 (4 + 3 − 2).'
  },
  {
    id: 'ea-q12',
    questionTypeBadge: 'Három pénzérme',
    level: 2,
    question: 'Ugyanebben a kísérletben (A: a 10 Ft-oson írás, B: pontosan egy fej) hány elemi esemény tartozik az A · B eseményhez?',
    options: ['2', '1', '3', '5'],
    correctAnswer: 0,
    explanation: 'Írás a 10 Ft-oson és pontosan egy fej: IIF és IFI – 2 elemi esemény.'
  },
  {
    id: 'ea-q13',
    questionTypeBadge: 'Venn-diagram',
    figure: FIG_COINS,
    level: 2,
    question: `Az ábra a három érme kísérletét mutatja (A: a 10 Ft-oson írás, B: pontosan egy fej). Melyik elemi esemény tartozik az ${A_} · B eseményhez?`,
    options: ['FII', 'IIF', 'III', 'FFF'],
    correctAnswer: 0,
    explanation: `${A_} · B: A nem, B igen – a B kör A-n kívüli része. Ott csak az FII van (a 10 Ft-oson fej, pontosan egy fej).`
  },
  {
    id: 'ea-q14',
    questionTypeBadge: 'Időjárás',
    figure: FIG_W_AB,
    level: 2,
    question: 'A: az átlaghőmérséklet több, mint 10 °C; B: a csapadék több, mint 5 mm. Hány napon következett be az A + B esemény?',
    options: ['5', '2', '7', '4'],
    correctAnswer: 0,
    explanation: 'A: hétfő, kedd, szerda, vasárnap; B: szerda, csütörtök, vasárnap. A + B: hétfő, kedd, szerda, csütörtök, vasárnap – 5 nap.'
  },
  {
    id: 'ea-q15',
    questionTypeBadge: 'Időjárás',
    figure: FIG_W_BC,
    level: 2,
    question: 'B: a csapadék több, mint 5 mm; C: a szél erősebb, mint 5 km/h. Mely napokon következett be a B + C esemény?',
    options: ['kedd, szerda, csütörtök, péntek, vasárnap', 'csak csütörtök', 'szerda, csütörtök, péntek, vasárnap', 'hétfő, kedd, szerda, csütörtök, vasárnap'],
    correctAnswer: 0,
    explanation: 'B: szerda, csütörtök, vasárnap; C: kedd, csütörtök, péntek. Legalább az egyik: kedd, szerda, csütörtök, péntek, vasárnap.'
  },
  {
    id: 'ea-q16',
    questionTypeBadge: 'Időjárás',
    figure: FIG_W_ABC,
    level: 2,
    question: 'A: több mint 10 °C, B: több mint 5 mm csapadék, C: 5 km/h-nál erősebb szél. Melyik napon következett be az A · B · C esemény?',
    options: ['egyik nap sem', 'csütörtökön', 'szerdán', 'vasárnap'],
    correctAnswer: 0,
    explanation: 'B · C csak csütörtökön teljesül, de akkor az átlaghőmérséklet 10 °C, ami nem több 10 °C-nál. Így A · B · C egyik nap sem következett be.'
  },
  {
    id: 'ea-q17',
    questionTypeBadge: 'Áramkör',
    figure: FIG_CIRCUIT,
    level: 2,
    question: 'Az ábrán A, B, C a kapcsolók zárt állapotát jelölő események. Ha a B · C esemény bekövetkezik, világít-e a lámpa?',
    options: ['igen, biztosan világít', 'nem biztos: csak akkor, ha az A is zárva van', 'biztosan nem világít', 'csak akkor, ha az A nyitva van'],
    correctAnswer: 0,
    explanation: 'A B és a C kapcsoló ugyanabban az ágban, sorba kötve van. Ha mindkettő zárva van, ezen az ágon záródik az áramkör, így az A kapcsoló állásától függetlenül világít a lámpa.'
  },
  {
    id: 'ea-q18',
    questionTypeBadge: 'Áramkör',
    figure: FIG_CIRCUIT,
    level: 2,
    question: `Ugyanebben az áramkörben bekövetkezik az A · ${B_} esemény (C-ről nem tudunk semmit). Világít-e a lámpa?`,
    options: ['igen, biztosan', 'nem, biztosan nem', 'csak ha a C is zárva van', 'csak ha a C nyitva van'],
    correctAnswer: 0,
    explanation: 'Az A kapcsoló zárva van, így az A ágon záródik az áramkör: a lámpa világít, bár a B–C ág (B nyitva) szakadt. C állása nem számít.'
  },
  {
    id: 'ea-q19',
    questionTypeBadge: 'Két dobókocka',
    level: 2,
    question: 'Két kockával dobunk. A: van hatos; B: a dobások összege legalább 10. Hány elemi esemény tartozik az A · B eseményhez?',
    options: ['5', '6', '11', '3'],
    correctAnswer: 0,
    explanation: 'B: (4;6), (5;5), (6;4), (5;6), (6;5), (6;6). Ezek közül hatos van: (4;6), (6;4), (5;6), (6;5), (6;6) – 5. Csak az (5;5) nem tartozik A-hoz.'
  },
  {
    id: 'ea-q20',
    questionTypeBadge: 'Elemszám',
    figure: FIG_COUNTS,
    level: 2,
    question: 'Az A esemény 7, a B esemény 5 elemi eseményből áll, és 2 elemi esemény mindkettőhöz tartozik. Hány elemi esemény tartozik az A + B eseményhez?',
    options: ['10', '12', '14', '2'],
    correctAnswer: 0,
    explanation: '|A + B| = |A| + |B| − |A · B| = 7 + 5 − 2 = 10. A 12 esetén a közös elemeket kétszer számolnánk.'
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'ea-q21',
    questionTypeBadge: 'Két dobókocka',
    level: 3,
    question: 'Két kockával dobunk. A: van hatos (11 elemi esemény); B: az összeg legalább 10 (6 elemi esemény). Hány elemi esemény tartozik az A + B eseményhez?',
    options: ['12', '17', '11', '5'],
    correctAnswer: 0,
    explanation: '|A · B| = 5, így |A + B| = 11 + 6 − 5 = 12. (Az A-hoz képest csak az (5;5) az új elem.)'
  },
  {
    id: 'ea-q22',
    questionTypeBadge: 'Legalább–legfeljebb',
    level: 3,
    question: 'Az A esemény 18, a B esemény 15 elemi esemény esetén következik be. Legalább hány elemi esemény esetén következik be az A + B?',
    options: ['18', '15', '33', '3'],
    correctAnswer: 0,
    explanation: 'A + B tartalmazza A-t, így legalább 18 eleme van; pontosan 18, ha B ⊂ A. A 33 a legnagyobb érték (kizáró események).'
  },
  {
    id: 'ea-q23',
    questionTypeBadge: 'Legalább–legfeljebb',
    level: 3,
    question: 'Az A esemény 18, a B esemény 15 elemi esemény esetén következik be. Legfeljebb hány elemi esemény esetén következik be az A · B?',
    options: ['15', '18', '33', '3'],
    correctAnswer: 0,
    explanation: 'A · B része B-nek, így legfeljebb 15 eleme van; ez akkor teljesül, ha B ⊂ A.'
  },
  {
    id: 'ea-q24',
    questionTypeBadge: 'Legalább–legfeljebb',
    level: 3,
    question: `Az ${A_} · B esemény 15, az A + B esemény 16 elemi esemény esetén következik be. Hány elemi eseményből áll az A esemény?`,
    options: ['1', '16', '15', '31'],
    correctAnswer: 0,
    explanation: `Az A + B két egymást kizáró részre bontható: A és ${A_} · B (B-nek az A-n kívüli része). Így |A| = 16 − 15 = 1 – ez a legkisebb és a legnagyobb lehetséges érték is. (B elemszáma 15 vagy 16.)`
  },
  {
    id: 'ea-q25',
    questionTypeBadge: 'Legalább–legfeljebb',
    level: 3,
    question: `A H eseménytér 20 elemi eseményből áll, |A| = 12, |B| = 16. Legfeljebb hány elemi esemény esetén következik be az ${A_} · ${B_} esemény?`,
    options: ['4', '8', '0', '12'],
    correctAnswer: 0,
    explanation: `${A_} · ${B_} (sem A, sem B) az A + B komplementere. |A + B| ≥ |B| = 16, így |${A_} · ${B_}| ≤ 20 − 16 = 4; ez akkor valósul meg, ha A ⊂ B.`
  },
  {
    id: 'ea-q26',
    questionTypeBadge: 'Lottó',
    level: 3,
    question: 'J: a szám 5-tel vagy 7-tel osztható; B: a számjegyek összege 9 vagy 10. A kihúzott számok: 42, 45, 49, 63, 64. Melyik számoknál következik be a J · B esemény?',
    options: ['45 és 63', '45, 63 és 64', '42, 45, 49 és 63', '64'],
    correctAnswer: 0,
    explanation: 'J-be tartozik: 42, 45, 49, 63. B-be: 45 (9), 63 (9), 64 (10). Mindkettő: 45 és 63.'
  },
  {
    id: 'ea-q27',
    questionTypeBadge: 'Lottó',
    level: 3,
    question: 'S: a szám négyzetszám vagy köbszám; J: a szám 5-tel vagy 7-tel osztható (1 ≤ szám ≤ 90). Hány számnál következik be az S · J esemény?',
    options: ['2', '1', '4', '0'],
    correctAnswer: 0,
    explanation: 'S = {1, 4, 8, 9, 16, 25, 27, 36, 49, 64, 81}. Ezek közül 5-tel vagy 7-tel osztható: 25 és 49 – 2 szám.'
  },
  {
    id: 'ea-q28',
    questionTypeBadge: 'Naptár',
    level: 3,
    question: 'Szerdán és szombaton koncert van (K), pénteken, szombaton és vasárnap színház (S). 2023. január 1. vasárnapra esett. Melyik napon következik be a K · S esemény?',
    options: ['február 11.', 'január 18.', 'január 10.', 'február 14.'],
    correctAnswer: 0,
    explanation: 'K · S csak szombaton teljesül. Január 1. vasárnap, így január 7., 14., …, február 4., 11. szombat. Január 18. szerda (csak koncert).'
  },
  {
    id: 'ea-q29',
    questionTypeBadge: 'Komplementer',
    level: 3,
    question: 'Melyik esemény az A + B komplementere?',
    options: [`${A_} · ${B_}`, `${A_} + ${B_}`, `A · ${B_}`, `${A_} · B`],
    correctAnswer: 0,
    explanation: `Az A + B akkor nem következik be, ha egyik esemény sem következik be: ${A_} és ${B_} is bekövetkezik, azaz ${A_} · ${B_} (De Morgan-azonosság).`
  },
  {
    id: 'ea-q30',
    questionTypeBadge: 'Áramkör',
    figure: FIG_CIRCUIT,
    level: 3,
    question: 'Az ábra áramkörében melyik esemény jelenti pontosan azt, hogy a lámpa világít?',
    options: ['A + B · C', 'A · (B + C)', 'A · B · C', '(A + B) · C'],
    correctAnswer: 0,
    explanation: 'Két párhuzamos ág van: az egyikben az A, a másikban a sorba kötött B és C kapcsoló. A lámpa akkor világít, ha az A ág zárt VAGY a B–C ág zárt (B ÉS C zárva): A + B · C. Az A · (B + C) rossz: ha csak B és C van zárva, a lámpa mégis világít.'
  }
];

export const EventAlgebraQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g12-stat-esemenyalgebra-quiz"
      subtopicId="esemenyek-osszege-es-szorzata"
      title="6. Események összege és szorzata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: A + B, A · B, komplementer, Venn-diagram, időjárás, áramkör, elemszámok."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={EVENT_ALGEBRA_QUESTIONS}
      cheatSheets={[
        {
          title: 'Összeg és szorzat',
          items: [
            'A + B: legalább az egyik bekövetkezik („vagy”).',
            'A · B: mindkettő bekövetkezik („és”).',
            'Halmazként: A + B = unió, A · B = metszet.',
            '|A + B| = |A| + |B| − |A · B|.'
          ]
        },
        {
          title: 'Speciális esetek',
          items: [
            'Kizáró események szorzata: lehetetlen esemény.',
            `A · ${A_} = ∅, A + ${A_} = H (biztos esemény).`,
            `Az A + B komplementere: ${A_} · ${B_}.`,
            `Az A · B komplementere: ${A_} + ${B_}.`
          ]
        },
        {
          title: 'Legalább – legfeljebb',
          items: [
            'max(|A|, |B|) ≤ |A + B| ≤ |A| + |B| (és ≤ |H|).',
            '|A · B| ≤ min(|A|, |B|).',
            '|A · B| ≥ |A| + |B| − |H|.',
            'Soros kapcsolás: szorzat; párhuzamos: összeg.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <EventAlgebraMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <EventAlgebraSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default EventAlgebraQuiz;
