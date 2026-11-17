import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenSubG3Matcher } from './WrittenSubG3Matcher';
import { WrittenSubG3Sorter } from './WrittenSubG3Sorter';
import { WrittenSubG3ColumnG, columnSubSize, WrittenSubG3ColumnProps } from './WrittenSubG3Column';
import { QFig, UNK } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Írásbeli kivonás oszlopban, a kérdésábra közepén. */
const ColQ: React.FC<WrittenSubG3ColumnProps & { note?: string }> = ({ note, ...p }) => {
  const props = { cell: 28, ...p };
  const { w, h } = columnSubSize(props);
  const H = h + 16 + (note ? 16 : 0);
  return (
    <QFig h={H}>
      <WrittenSubG3ColumnG {...props} x={(240 - w) / 2} y={8} />
      {note && <text x="120" y={H - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{note}</text>}
    </QFig>
  );
};

/** Egyenlőség dobozokkal: '?' = keresett. */
const EqQ: React.FC<{ parts: string[] }> = ({ parts }) => {
  const ws = parts.map((p) => (p === '−' || p === '=' || p === '+' ? 20 : 54));
  const total = ws.reduce((a, b) => a + b, 0) + (parts.length - 1) * 4;
  let x = (240 - total) / 2;
  return (
    <QFig h={66}>
      {parts.map((p, i) => {
        const w = ws[i];
        const x0 = x;
        x += w + 4;
        if (p === '−' || p === '=' || p === '+') return <text key={i} x={x0 + w / 2} y="41" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">{p}</text>;
        const q = p === '?';
        return (
          <g key={i}>
            <rect x={x0} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#eff6ff'} stroke={q ? UNK : '#2563eb'} strokeWidth="1.8" />
            <text x={x0 + w / 2} y="39" textAnchor="middle" fontSize="19" fontWeight="bold" fill={q ? UNK : '#1e3a8a'}>{p}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Adatok doboz a szöveges feladathoz. */
const DataQ: React.FC<{ rows: [string, string][] }> = ({ rows }) => (
  <QFig h={22 + rows.length * 22}>
    <text x="14" y="22" fontSize="12.5" fontWeight="bold" fill="#7c2d12">Adatok:</text>
    {rows.map(([k, v], i) => (
      <g key={k}>
        <text x="84" y={22 + i * 22} fontSize="13" fill="#0f172a">{k}</text>
        <text x="200" y={22 + i * 22} textAnchor="end" fontSize="14" fontWeight="bold" fill={v === '?' ? UNK : '#0f172a'}>{v}</text>
      </g>
    ))}
  </QFig>
);

/** Szalagok: fiúk és lányok. */
const BarsQ: React.FC = () => (
  <QFig h={96}>
    <rect x="20" y="14" width="200" height="22" rx="4" fill="#c7d2fe" stroke="#334155" />
    <text x="120" y="30" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">összesen 432 gyerek</text>
    <rect x="20" y="46" width="86" height="22" rx="4" fill="#fbcfe8" stroke="#334155" />
    <text x="63" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">lány: 186</text>
    <rect x="106" y="46" width="114" height="22" rx="4" fill="#bae6fd" stroke="#334155" />
    <text x="163" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">fiú: ?</text>
    <text x="120" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>Mennyivel több a fiú?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WRITTEN_SUB_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint: maradék nélkül és maradék az egyeseknél ----------------
  {
    id: 'wsu-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <ColQ minuend={486} subtrahend={253} result="???" />,
    question: 'Mennyi a különbség?',
    options: ['233', '239', '223', '739'],
    correctAnswer: 0,
    explanation: 'Pótolj! Egyesek: 3-hoz 3, az 6. Tízesek: 5-höz 3, az 8. Százasok: 2-höz 2, az 4. A különbség 233.'
  },
  {
    id: 'wsu-q2',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Melyik helyi értéken kezdjük az írásbeli kivonást?',
    options: ['az egyeseknél', 'a százasoknál', 'a tízeseknél', 'mindegy'],
    correctAnswer: 0,
    explanation: 'A legkisebb helyi értéken, az egyeseknél kezdünk. Aztán jönnek a tízesek, végül a százasok.'
  },
  {
    id: 'wsu-q3',
    level: 1,
    questionTypeBadge: 'Egyesek',
    figure: <ColQ minuend={397} subtrahend={124} result="  ?" highlight={0} />,
    question: 'Melyik számjegy kerül az egyesek helyére?',
    options: ['3', '7', '11', '4'],
    correctAnswer: 0,
    explanation: '4-hez 3, az 7. Az egyesek helyére 3 kerül.'
  },
  {
    id: 'wsu-q4',
    level: 1,
    questionTypeBadge: 'Pótlás',
    figure: <ColQ minuend={357} subtrahend={142} result="  ?" highlight={0} />,
    question: 'Pótlással számolsz: 2-höz mennyi kell, hogy 7 legyen?',
    options: ['5', '9', '4', '6'],
    correctAnswer: 0,
    explanation: '2-höz 5, az 7. Leírom az 5-öt. (Ugyanaz, mint 7 − 2 = 5.)'
  },
  {
    id: 'wsu-q5',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <ColQ minuend={372} subtrahend={145} result="   " highlight={0} />,
    question: 'Az egyeseknél a 2 kisebb, mint az 5. Mit mondasz?',
    options: ['5-höz 7, az 12. Maradt 1.', '2-höz 3, az 5.', '5-höz 7, az 12. Nem marad semmi.', '5-höz 2, az 7.'],
    correctAnswer: 0,
    explanation: 'A 2 kisebb, mint az 5, ezért 12-ig pótolunk: 5-höz 7, az 12. Leírom a 7-et, és maradt 1.'
  },
  {
    id: 'wsu-q6',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <ColQ minuend={372} subtrahend={145} result="  7" carries={[null, 1]} highlight={1} />,
    question: 'Az egyeseknél maradt 1. Mit mondasz a tízeseknél?',
    options: ['4 meg 1 az 5. 5-höz 2, az 7.', '4-hez 3, az 7.', '4 meg 1 az 5. 5-höz 3, az 8.', '7 meg 1 az 8.'],
    correctAnswer: 0,
    explanation: 'A maradékot a kivonandó jegyéhez adjuk: 4 meg 1 az 5. Aztán pótolunk: 5-höz 2, az 7. Leírom a 2-t.'
  },
  {
    id: 'wsu-q7',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <ColQ minuend={263} subtrahend={128} result="???" />,
    question: 'Számold ki írásban!',
    options: ['135', '145', '235', '136'],
    correctAnswer: 0,
    explanation: 'A 3 kisebb, mint a 8: 8-hoz 5, az 13, maradt 1. 2 meg 1 az 3, 3-hoz 3, az 6. 1-hez 1, az 2. Eredmény: 135. (A 145 a maradék nélkül jönne ki.)'
  },
  {
    id: 'wsu-q8',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadással ellenőrizheted ezt: 486 − 253 = 233?',
    options: ['233 + 253', '486 + 253', '486 + 233', '233 + 486'],
    correctAnswer: 0,
    explanation: 'Különbség + kivonandó = kisebbítendő. 233 + 253 = 486. Ha a kisebbítendőt kapod, jó a kivonás.'
  },
  {
    id: 'wsu-q9',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <ColQ minuend={458} subtrahend={136} result="???" />,
    question: 'Mennyi a különbség?',
    options: ['322', '594', '312', '332'],
    correctAnswer: 0,
    explanation: '6-hoz 2, az 8. 3-hoz 2, az 5. 1-hez 3, az 4. A különbség 322. (A 594 az összeg lenne!)'
  },
  {
    id: 'wsu-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <ColQ minuend={391} subtrahend={157} result="???" />,
    question: 'Mennyi a különbség?',
    options: ['234', '246', '244', '334'],
    correctAnswer: 0,
    explanation: 'Az 1 kisebb, mint a 7: 7-hez 4, az 11, maradt 1. 5 meg 1 az 6, 6-hoz 3, az 9. 1-hez 2, az 3. Eredmény: 234.'
  },

  // ---------------- 2. szint: tízesek, kétszer, hiányzó jegy ----------------
  {
    id: 'wsu-q11',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <ColQ minuend={428} subtrahend={175} result="???" />,
    question: 'Számold ki írásban!',
    options: ['253', '353', '263', '243'],
    correctAnswer: 0,
    explanation: '5-höz 3, az 8. A 2 kisebb, mint a 7: 7-hez 5, az 12, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4. Eredmény: 253.'
  },
  {
    id: 'wsu-q12',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <ColQ minuend={428} subtrahend={175} result="  3" highlight={1} />,
    question: 'A tízeseknél a 2 kisebb, mint a 7. Meddig pótolsz?',
    options: ['12-ig', '2-ig', '10-ig', '7-ig'],
    correctAnswer: 0,
    explanation: 'A 7-től nem tudunk 2-ig felfelé számolni, ezért 12-ig pótolunk: 7-hez 5, az 12. Leírom az 5-öt, maradt 1.'
  },
  {
    id: 'wsu-q13',
    level: 2,
    questionTypeBadge: 'Kétszer maradt 1',
    figure: <ColQ minuend={421} subtrahend={186} result="???" />,
    question: 'Számold ki írásban!',
    options: ['235', '345', '365', '245'],
    correctAnswer: 0,
    explanation: '6-hoz 5, az 11, maradt 1. 8 meg 1 az 9, 9-hez 3, az 12, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4. Eredmény: 235.'
  },
  {
    id: 'wsu-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend={364} subtrahend={178} result="1?6" />,
    question: 'Melyik számjegy hiányzik a különbségből?',
    options: ['8', '9', '7', '6'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8-hoz 6, az 14, maradt 1. Tízesek: 7 meg 1 az 8, 8-hoz 8, az 16. A hiányzó jegy 8.'
  },
  {
    id: 'wsu-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend="3?7" subtrahend={125} result={212} />,
    question: 'Melyik számjegy hiányzik a kisebbítendőből?',
    options: ['3', '1', '4', '8'],
    correctAnswer: 0,
    explanation: 'A tízeseknél: 2-höz 1, az ?. Tehát ? = 3. Próba: 337 − 125 = 212.'
  },
  {
    id: 'wsu-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend={456} subtrahend="1?2" result={344} />,
    question: 'Melyik számjegy hiányzik a kivonandóból?',
    options: ['1', '0', '2', '9'],
    correctAnswer: 0,
    explanation: 'A tízeseknél: ?-hez 4 kell, hogy 5 legyen, tehát ? = 1. Próba: 456 − 112 = 344.'
  },
  {
    id: 'wsu-q17',
    level: 2,
    questionTypeBadge: '0 a tízeseknél',
    figure: <ColQ minuend={403} subtrahend={157} result="  6" carries={[null, 1]} highlight={1} />,
    question: '403 − 157: a tízeseknél 5 meg 1 az 6. Felül 0 van. Meddig pótolsz?',
    options: ['10-ig', '0-ig', '6-ig', '16-ig'],
    correctAnswer: 0,
    explanation: 'A 6-tól nem tudunk 0-ig felfelé számolni, ezért 10-ig pótolunk: 6-hoz 4, az 10. Leírom a 4-et, maradt 1.'
  },
  {
    id: 'wsu-q18',
    level: 2,
    questionTypeBadge: '0 a tízeseknél',
    figure: <ColQ minuend={403} subtrahend={157} result="???" />,
    question: 'Számold ki írásban!',
    options: ['246', '356', '354', '346'],
    correctAnswer: 0,
    explanation: '7-hez 6, az 13, maradt 1. 5 meg 1 az 6, 6-hoz 4, az 10, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4. Eredmény: 246.'
  },
  {
    id: 'wsu-q19',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik kivonás eredménye hibás? Ellenőrizd összeadással!',
    options: ['326 − 118 = 218', '374 − 147 = 227', '291 − 174 = 117', '457 − 328 = 129'],
    correctAnswer: 0,
    explanation: '218 + 118 = 336, nem 326. A jó eredmény 208. A többi jó: 227 + 147 = 374, 117 + 174 = 291, 129 + 328 = 457.'
  },
  {
    id: 'wsu-q20',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <ColQ op="+" minuend={227} subtrahend={145} result="???" header={false} note="372 − 145 = 227 ellenőrzése" />,
    question: 'Ellenőrizd a 372 − 145 = 227 kivonást! Mennyi 227 + 145?',
    options: ['372', '362', '382', '272'],
    correctAnswer: 0,
    explanation: '227 + 145 = 372. Ez a kisebbítendő, tehát a kivonás jó.'
  },

  // ---------------- 3. szint: szöveges feladatok, hiányzó számok ----------------
  {
    id: 'wsu-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <DataQ rows={[['összes szék:', '364'], ['foglalt szék:', '178'], ['üres szék:', '?']]} />,
    question: 'A moziteremben 364 szék van. 178 néző ül le. Hány szék marad üresen?',
    options: ['186', '296', '196', '542'],
    correctAnswer: 0,
    explanation: '364 − 178 = 186. Becslés: 360 − 180 = 180. Ellenőrzés: 186 + 178 = 364.'
  },
  {
    id: 'wsu-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az iskolába 452 tanuló jár. 267-en ebédelnek a menzán. Hányan nem ebédelnek ott?',
    options: ['185', '295', '215', '195'],
    correctAnswer: 0,
    explanation: '452 − 267 = 185. Kétszer marad 1: 7-hez 5, az 12; 6 meg 1 az 7, 7-hez 8, az 15; 2 meg 1 az 3, 3-hoz 1, az 4. Ellenőrzés: 185 + 267 = 452.'
  },
  {
    id: 'wsu-q23',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['?', '−', '152', '=', '236']} />,
    question: 'Melyik szám hiányzik? □ − 152 = 236',
    options: ['388', '84', '378', '398'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapod: 236 + 152 = 388. Próba: 388 − 152 = 236.'
  },
  {
    id: 'wsu-q24',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqQ parts={['475', '−', '?', '=', '238']} />,
    question: 'Melyik szám hiányzik? 475 − □ = 238',
    options: ['237', '713', '247', '227'],
    correctAnswer: 0,
    explanation: 'A kivonandót kivonással kapod: 475 − 238 = 237. Próba: 475 − 237 = 238.'
  },
  {
    id: 'wsu-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kertben 405 tulipán nyílt. 168-at leszedtünk. Hány tulipán maradt?',
    options: ['237', '347', '363', '247'],
    correctAnswer: 0,
    explanation: '405 − 168: 8-hoz 7, az 15, maradt 1. 6 meg 1 az 7, 7-hez 3, az 10, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4. Maradt 237 tulipán.'
  },
  {
    id: 'wsu-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Szombaton 284 lufit adtak el, vasárnap 96-tal kevesebbet. Hány lufit adtak el vasárnap?',
    options: ['188', '380', '212', '198'],
    correctAnswer: 0,
    explanation: 'Kevesebbet, tehát kivonunk: 284 − 96 = 188. (A 380 az összeadás lenne.)'
  },
  {
    id: 'wsu-q27',
    level: 3,
    questionTypeBadge: 'Kisebbítendő',
    question: 'Két szám különbsége 157. A kivonandó 248. Mennyi a kisebbítendő?',
    options: ['405', '91', '395', '415'],
    correctAnswer: 0,
    explanation: 'Kisebbítendő = különbség + kivonandó: 157 + 248 = 405. Próba: 405 − 248 = 157.'
  },
  {
    id: 'wsu-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BarsQ />,
    question: 'A futóversenyen 432 gyerek indult. 186 lány volt, a többi fiú. Mennyivel több fiú indult, mint lány?',
    options: ['60-nal', '246-tal', '186-tal', '70-nel'],
    correctAnswer: 0,
    explanation: 'Előbb a fiúk: 432 − 186 = 246. Aztán a különbség: 246 − 186 = 60. 60-nal több fiú indult.'
  },
  {
    id: 'wsu-q29',
    level: 3,
    questionTypeBadge: 'Hiányzó jegy',
    figure: <ColQ minuend="4?1" subtrahend={263} result={178} />,
    question: 'Melyik számjegy hiányzik a kisebbítendőből?',
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd összeadással: 178 + 263 = 441. A hiányzó jegy 4.'
  },
  {
    id: 'wsu-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Egy könyv 300 oldalas. Az első héten 112, a második héten 95 oldalt olvastál el. Hány oldal van még hátra?',
    options: ['93', '188', '207', '103'],
    correctAnswer: 0,
    explanation: '300 − 112 = 188. 188 − 95 = 93. Még 93 oldal van hátra.'
  }
];

export const WrittenSubG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-kivonas"
    topicId="g3-wsub-irasbeli-quiz"
    subtopicId="irasbeli-kivonas"
    title="3. Írásbeli kivonás – Kvíz"
    subtitle="30 feladat 3 szinten: írásbeli kivonás pótlással, maradék nélkül és maradékkal, 0 a tízeseknél, ellenőrzés, szöveges feladatok."
    badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • KVÍZ"
    questions={WRITTEN_SUB_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Lépések', items: ['Egymás alá, helyi érték szerint', 'Egyesek → tízesek → százasok', 'A kivonandótól pótolunk felfelé: 3-hoz 3, az 6'] },
      { title: 'Maradék', items: ['Kisebb a felső jegy? Pótolj 10-zel többig!', '5-höz 7, az 12 – maradt 1', 'A maradékot add a következő kivonandó-jegyhez: 4 meg 1 az 5', '0 a felső jegy: 10-ig pótolunk'] },
      { title: 'Ellenőrzés', items: ['különbség + kivonandó = kisebbítendő', '227 + 145 = 372', 'Becslés: közel van az eredmény?'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<WrittenSubG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<WrittenSubG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default WrittenSubG3Quiz;
