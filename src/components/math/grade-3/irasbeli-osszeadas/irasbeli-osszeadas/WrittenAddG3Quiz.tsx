import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenAddG3Matcher } from './WrittenAddG3Matcher';
import { WrittenAddG3Sorter } from './WrittenAddG3Sorter';
import { WrittenAddG3Column, WrittenAddG3ColumnProps, WrittenAddG3ColumnG, columnAddSize } from './WrittenAddG3Column';
import { QFig, UNK } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const Col: React.FC<WrittenAddG3ColumnProps> = (p) => <WrittenAddG3Column {...p} className="w-full max-w-[150px] h-auto mx-auto" />;

/** Két írásbeli összeadás egymás mellett (ellenőrzéshez). */
const TwoCols: React.FC<{ left: WrittenAddG3ColumnProps; right: WrittenAddG3ColumnProps }> = ({ left, right }) => {
  const s = columnAddSize({ ...left, cell: 24 });
  return (
    <QFig h={s.h + 20}>
      <WrittenAddG3ColumnG {...left} cell={24} x={12} y={10} />
      <text x="120" y={10 + s.h / 2 + 6} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
      <WrittenAddG3ColumnG {...right} cell={24} x={228 - s.w} y={10} />
    </QFig>
  );
};

/** Szalagok vízszintesen. */
const BarsQ: React.FC<{ bars: { label: string; v: number; text: string; color: string }[]; max: number; note?: string }> = ({ bars, max, note }) => {
  const h = 22 + bars.length * 30 + (note ? 14 : 0);
  return (
    <QFig h={h}>
      {bars.map((b, i) => {
        const y = 12 + i * 30;
        const w = (150 * b.v) / max;
        const q = b.text === '?';
        return (
          <g key={i}>
            <text x="70" y={y + 15} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.label}</text>
            <rect x="76" y={y} width={w} height="20" rx="4" fill={b.color} stroke="#334155" strokeWidth="1" />
            <text x={q ? 76 + w + 12 : 76 + w / 2} y={y + 15} textAnchor="middle" fontSize="13" fontWeight="bold" fill={q ? UNK : '#0f172a'}>{b.text}</text>
          </g>
        );
      })}
      {note && <text x="120" y={h - 8} textAnchor="middle" fontSize="11.5" fill="#475569">{note}</text>}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WRITTEN_ADD_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'wadd-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <Col addends={[213, 154]} result="???" />,
    question: 'Számold ki írásban! 213 + 154',
    options: ['367', '357', '377', '467'],
    correctAnswer: 0,
    explanation: '3 meg 4 az 7. 1 meg 5 az 6. 2 meg 1 az 3. Az összeg: 367.'
  },
  {
    id: 'wadd-q2',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Melyik helyi értékkel kezdjük az írásbeli összeadást?',
    options: ['az egyesekkel', 'a tízesekkel', 'a százasokkal', 'mindegy, melyikkel'],
    correctAnswer: 0,
    explanation: 'Mindig az egyesekkel kezdünk, jobbról balra haladunk. Így a maradékot tovább tudjuk vinni.'
  },
  {
    id: 'wadd-q3',
    level: 1,
    questionTypeBadge: 'Egyesek',
    figure: <Col addends={[341, 126]} result="  ?" highlight={0} />,
    question: 'Mit írunk az egyesek helyére? 341 + 126',
    options: ['7', '6', '5', '8'],
    correctAnswer: 0,
    explanation: 'Az egyesek: 1 meg 6 az 7. Ezt írjuk le.'
  },
  {
    id: 'wadd-q4',
    level: 1,
    questionTypeBadge: 'Egymás alá írás',
    figure: <Col addends={[245, '__']} noResult />,
    question: 'A 245 alá írjuk a 32-t. A 32-ből a 3 melyik számjegy alá kerül?',
    options: ['a 4 alá', 'a 2 alá', 'az 5 alá', 'a 245 elé'],
    correctAnswer: 0,
    explanation: 'Helyi érték szerint írunk: a 2 egyes az 5 alá, a 3 tízes a 4 alá kerül.'
  },
  {
    id: 'wadd-q5',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <Col addends={[132, 205]} result="???" />,
    question: 'Számold ki írásban! 132 + 205',
    options: ['337', '327', '347', '437'],
    correctAnswer: 0,
    explanation: '2 meg 5 az 7. 3 meg 0 az 3. 1 meg 2 az 3. Az összeg: 337.'
  },
  {
    id: 'wadd-q6',
    level: 1,
    questionTypeBadge: 'Százasok',
    figure: <Col addends={[224, 153]} result="?77" highlight={2} />,
    question: 'Az egyeseket és a tízeseket már leírtuk. Mit írunk a százasok helyére?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'A százasok: 2 meg 1 az 3. Az összeg: 377.'
  },
  {
    id: 'wadd-q7',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    figure: <TwoCols left={{ addends: [157, 226], result: 383, header: false }} right={{ addends: [226, 157], result: 383, header: false }} />,
    question: 'Hogyan ellenőrizzük az összeadást?',
    options: ['a tagok felcserélésével', 'a tagok kerekítésével', 'az összeg kétszerezésével', 'az egyik tag elhagyásával'],
    correctAnswer: 0,
    explanation: 'Felcseréljük a tagokat, és újra összeadjuk. Ha ugyanaz az összeg, jól számoltunk.'
  },
  {
    id: 'wadd-q8',
    level: 1,
    questionTypeBadge: 'Három tag',
    figure: <Col addends={[120, 132, 214]} result="???" />,
    question: 'Számold ki írásban! 120 + 132 + 214',
    options: ['466', '456', '476', '366'],
    correctAnswer: 0,
    explanation: 'Egyesek: 0 meg 2 meg 4 az 6. Tízesek: 2 meg 3 meg 1 az 6. Százasok: 1 meg 1 meg 2 az 4. Az összeg: 466.'
  },
  {
    id: 'wadd-q9',
    level: 1,
    questionTypeBadge: 'Beváltás',
    figure: <Col addends={[157, 226]} result="  ?" highlight={0} />,
    question: 'Az egyesek: 7 meg 6 az 13. Mit írunk le az egyesek helyére?',
    options: ['3', '13', '1', '4'],
    correctAnswer: 0,
    explanation: 'A 13 = 1 tízes és 3 egyes. Az egyesek helyére a 3-at írjuk, az 1 tízes a maradék.'
  },
  {
    id: 'wadd-q10',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <Col addends={[157, 226]} result="  3" carries={[null, '?']} />,
    question: '7 meg 6 az 13. Leírtuk a 3-at. Mennyi maradt?',
    options: ['1', '3', '13', '0'],
    correctAnswer: 0,
    explanation: 'A 13-ban 1 tízes van. Maradt 1, ezt a tízesekhez adjuk.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'wadd-q11',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <Col addends={[157, 226]} result="???" />,
    question: 'Számold ki írásban! 157 + 226',
    options: ['383', '373', '483', '393'],
    correctAnswer: 0,
    explanation: '7 meg 6 az 13, leírom a 3-at, maradt 1. 5 meg 2 az 7, meg 1 az 8. 1 meg 2 az 3. Az összeg: 383.'
  },
  {
    id: 'wadd-q12',
    level: 2,
    questionTypeBadge: 'Beváltás',
    figure: <Col addends={[163, 254]} result="???" />,
    question: 'Számold ki írásban! 163 + 254',
    options: ['417', '317', '407', '427'],
    correctAnswer: 0,
    explanation: '3 meg 4 az 7. 6 meg 5 az 11, leírom az 1-et, maradt 1. 1 meg 2 az 3, meg 1 az 4. Az összeg: 417.'
  },
  {
    id: 'wadd-q13',
    level: 2,
    questionTypeBadge: 'Kétszer beváltás',
    figure: <Col addends={[168, 275]} result="???" />,
    question: 'Számold ki írásban! 168 + 275',
    options: ['443', '333', '433', '343'],
    correctAnswer: 0,
    explanation: '8 meg 5 az 13, leírom a 3-at, maradt 1. 6 meg 7 az 13, meg 1 az 14, leírom a 4-et, maradt 1. 1 meg 2 az 3, meg 1 az 4. Az összeg: 443.'
  },
  {
    id: 'wadd-q14',
    level: 2,
    questionTypeBadge: 'Kétszer beváltás',
    figure: <Col addends={[186, 237]} result="???" />,
    question: 'Számold ki írásban! 186 + 237',
    options: ['423', '313', '413', '323'],
    correctAnswer: 0,
    explanation: '6 meg 7 az 13, maradt 1. 8 meg 3 az 11, meg 1 az 12, maradt 1. 1 meg 2 az 3, meg 1 az 4. Az összeg: 423.'
  },
  {
    id: 'wadd-q15',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <Col addends={[249, 136]} result=" ?5" carries={[null, 1]} highlight={1} />,
    question: '249 + 136. Az egyeseknél maradt 1. Mit írunk a tízesek helyére?',
    options: ['8', '7', '9', '5'],
    correctAnswer: 0,
    explanation: 'A tízesek: 4 meg 3 az 7, meg 1 (maradék) az 8.'
  },
  {
    id: 'wadd-q16',
    level: 2,
    questionTypeBadge: 'Három tag',
    figure: <Col addends={[125, 136, 118]} result="???" />,
    question: 'Számold ki írásban! 125 + 136 + 118',
    options: ['379', '369', '389', '479'],
    correctAnswer: 0,
    explanation: '5 meg 6 meg 8 az 19, leírom a 9-et, maradt 1. 2 meg 3 meg 1 az 6, meg 1 az 7. 1 meg 1 meg 1 az 3. Az összeg: 379.'
  },
  {
    id: 'wadd-q17',
    level: 2,
    questionTypeBadge: 'Számjegy-nyomozó',
    figure: <Col addends={['2?4', 153]} result={417} />,
    question: 'Melyik számjegy van a ? helyén?',
    options: ['6', '5', '7', '1'],
    correctAnswer: 0,
    explanation: 'Egyesek: 4 meg 3 az 7. Tízesek: ? meg 5 – az eredményben 1 áll, a százasoknál 1 maradt, tehát 11 lett. 6 meg 5 az 11. Próba: 264 + 153 = 417.'
  },
  {
    id: 'wadd-q18',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: '238 + 147 = 385. Melyik összeadással ellenőrizzük?',
    options: ['147 + 238', '385 + 147', '238 + 385', '238 + 238'],
    correctAnswer: 0,
    explanation: 'Felcseréljük a tagokat: 147 + 238. Ennek is 385-nek kell lennie.'
  },
  {
    id: 'wadd-q19',
    level: 2,
    questionTypeBadge: 'Hibakeresés',
    figure: <Col addends={[256, 127]} result={373} />,
    question: 'Valaki így számolt: 256 + 127 = 373. Mi a hiba?',
    options: ['elfelejtette a maradék 1-et', 'rosszul adta össze a százasokat', 'nincs hiba', 'az egyeseket rosszul írta le'],
    correctAnswer: 0,
    explanation: '6 meg 7 az 13, leírja a 3-at, maradt 1. 5 meg 2 az 7, meg 1 az 8 – ő 7-et írt. A jó eredmény: 383.'
  },
  {
    id: 'wadd-q20',
    level: 2,
    questionTypeBadge: 'Kétszer beváltás',
    figure: <Col addends={[294, 158]} result="???" />,
    question: 'Számold ki írásban! 294 + 158',
    options: ['452', '342', '442', '352'],
    correctAnswer: 0,
    explanation: '4 meg 8 az 12, maradt 1. 9 meg 5 az 14, meg 1 az 15, maradt 1. 2 meg 1 az 3, meg 1 az 4. Az összeg: 452.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'wadd-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarsQ bars={[{ label: 'mese', v: 238, text: '238', color: '#fde68a' }, { label: 'ismeret', v: 147, text: '147', color: '#a5f3fc' }]} max={300} note="Összesen hány könyv?" />,
    question: 'A könyvtárban 238 mesekönyv és 147 ismeretterjesztő könyv van. Hány könyv van összesen?',
    options: ['385', '375', '395', '485'],
    correctAnswer: 0,
    explanation: '238 + 147: 8 meg 7 az 15, maradt 1. 3 meg 4 az 7, meg 1 az 8. 2 meg 1 az 3. Összesen 385 könyv.'
  },
  {
    id: 'wadd-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BarsQ bars={[{ label: '3.a', v: 127, text: '127 kg', color: '#93c5fd' }, { label: '3.b', v: 175, text: '?', color: '#fca5a5' }]} max={250} note="A 3.b 48 kg-mal többet gyűjtött." />,
    question: 'A 3.a 127 kg papírt gyűjtött, a 3.b 48 kg-mal többet. Mennyit gyűjtöttek együtt?',
    options: ['302 kg', '175 kg', '292 kg', '202 kg'],
    correctAnswer: 0,
    explanation: 'A 3.b: 127 + 48 = 175 kg. Együtt: 127 + 175 = 302 kg.'
  },
  {
    id: 'wadd-q23',
    level: 3,
    questionTypeBadge: 'Becslés és számítás',
    figure: <Col addends={[246, 178]} result="???" />,
    question: 'Becsülj tízesre, majd számold ki: 246 + 178. Melyik a jó párosítás?',
    options: ['B: 430, pontosan 424', 'B: 430, pontosan 414', 'B: 400, pontosan 324', 'B: 420, pontosan 424'],
    correctAnswer: 0,
    explanation: 'Becslés: 250 + 180 = 430. Számítás: 6 meg 8 az 14, maradt 1; 4 meg 7 az 11, meg 1 az 12, maradt 1; 2 meg 1 az 3, meg 1 az 4. Pontosan 424, közel van a 430-hoz.'
  },
  {
    id: 'wadd-q24',
    level: 3,
    questionTypeBadge: 'Írásbeli összeadás',
    question: 'Melyik összeadás eredménye pontosan 400?',
    options: ['176 + 224', '176 + 234', '186 + 224', '166 + 214'],
    correctAnswer: 0,
    explanation: '6 meg 4 az 10, leírom a 0-t, maradt 1. 7 meg 2 az 9, meg 1 az 10, leírom a 0-t, maradt 1. 1 meg 2 az 3, meg 1 az 4. Az összeg: 400.'
  },
  {
    id: 'wadd-q25',
    level: 3,
    questionTypeBadge: 'Számjegy-nyomozó',
    figure: <Col addends={['?67', 158]} result={425} />,
    question: 'Melyik számjegy van a ? helyén?',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation: '7 meg 8 az 15, maradt 1. 6 meg 5 az 11, meg 1 az 12, maradt 1. ? meg 1 meg 1 az 4, tehát ? = 2. Próba: 267 + 158 = 425.'
  },
  {
    id: 'wadd-q26',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: <BarsQ bars={[{ label: 'hétfő', v: 145, text: '145', color: '#c4b5fd' }, { label: 'kedd', v: 132, text: '132', color: '#c4b5fd' }, { label: 'szerda', v: 168, text: '168', color: '#c4b5fd' }]} max={250} />,
    question: 'A múzeumba hétfőn 145, kedden 132, szerdán 168 látogató jött. Hányan jöttek összesen?',
    options: ['445', '435', '345', '335'],
    correctAnswer: 0,
    explanation: '5 meg 2 meg 8 az 15, maradt 1. 4 meg 3 meg 6 az 13, meg 1 az 14, maradt 1. 1 meg 1 meg 1 az 3, meg 1 az 4. Összesen 445-en.'
  },
  {
    id: 'wadd-q27',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    question: 'Panninak 500 Ft-ja van. Vesz egy 265 Ft-os könyvet és egy 178 Ft-os füzetet. Elég a pénze?',
    options: ['Igen, mert 443 Ft-ot fizet.', 'Igen, mert 333 Ft-ot fizet.', 'Igen, mert 433 Ft-ot fizet.', 'Nem, mert 500 Ft-nál többet kell fizetnie.'],
    correctAnswer: 0,
    explanation: '265 + 178: 5 meg 8 az 13, maradt 1. 6 meg 7 az 13, meg 1 az 14, maradt 1. 2 meg 1 az 3, meg 1 az 4. 443 Ft, ez kevesebb, mint 500 Ft.'
  },
  {
    id: 'wadd-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik összeadásnak a legnagyobb az eredménye?',
    options: ['258 + 177', '249 + 176', '267 + 158', '238 + 186'],
    correctAnswer: 0,
    explanation: '258 + 177 = 435. A többi: 249 + 176 = 425, 267 + 158 = 425, 238 + 186 = 424.'
  },
  {
    id: 'wadd-q29',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <Col addends={[184, '???']} result={432} />,
    question: 'Gondoltam egy számot. A 184-hez adtam, és 432 lett. Próbáld ki! Melyik számra gondoltam?',
    options: ['248', '258', '238', '247'],
    correctAnswer: 0,
    explanation: 'Próbáljuk ki: 184 + 248 = 432. (184 + 258 = 442, 184 + 238 = 422, 184 + 247 = 431.)'
  },
  {
    id: 'wadd-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Melyik az a szám, amely a 186-nál 147-tel nagyobb?',
    options: ['333', '323', '233', '343'],
    correctAnswer: 0,
    explanation: '147-tel nagyobb: 186 + 147. 6 meg 7 az 13, maradt 1. 8 meg 4 az 12, meg 1 az 13, maradt 1. 1 meg 1 az 2, meg 1 az 3. Az eredmény: 333.'
  }
];

export const WrittenAddG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-osszeadas"
    topicId="g3-wadd-irasbeli-quiz"
    subtopicId="irasbeli-osszeadas"
    title="3. Írásbeli összeadás – Kvíz"
    subtitle="30 feladat 3 szinten: egymás alá írás, beváltás, maradék, három tag, ellenőrzés, számjegy-nyomozó, szöveges feladatok."
    badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
    questions={WRITTEN_ADD_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Lépések', items: ['Egymás alá, helyi érték szerint', 'Egyesek → tízesek → százasok', 'Ellenőrzés: cseréld fel a tagokat!'] },
      { title: 'Beváltás', items: ['7 meg 6 az 13', 'Leírom a 3-at, maradt 1', '5 meg 2 az 7, meg 1 az 8'] },
      { title: 'Szöveges feladat', items: ['Adatok, Terv', 'Becslés: 238 + 147 ≈ 240 + 150 = 390', 'Számítás, Ellenőrzés, Válasz'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<WrittenAddG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<WrittenAddG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default WrittenAddG3Quiz;
