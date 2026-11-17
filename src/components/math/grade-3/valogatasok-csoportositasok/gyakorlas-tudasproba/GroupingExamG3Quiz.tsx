import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GroupingExamG3Matcher } from './GroupingExamG3Matcher';
import { GroupingExamG3Sorter } from './GroupingExamG3Sorter';
import {
  B,
  Block,
  LogicBlock,
  T,
  UNK,
  QFig,
  QVenn,
  vits,
  AskTop,
  regionOpts,
  CodeRow,
  BlockRow,
  NumRow,
  NumSet,
  Cards,
  BallsFig,
  OutfitsFig,
  TowersFig,
  TreeFig,
  ScoopsFig,
  RoutesFig,
  KidsRowFig
} from './GroupingExamG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
/** Jelkártya jelmagyarázattal. */
const CodeFig: React.FC<{ b: Block }> = ({ b }) => (
  <QFig h={92}>
    <CodeRow b={b} x={20} y={12} />
    {['szín', 'méret', 'lyukas?', 'forma'].map((t, i) => (
      <T key={t} x={20 + 25 + i * 50} y={78} s={11} c="#475569" w="normal">{t}</T>
    ))}
  </QFig>
);

/** Doboz címkével és lapokkal. */
const LabelledBox: React.FC<{ label: string; blocks: Block[] }> = ({ label, blocks }) => {
  const step = 212 / blocks.length;
  return (
    <QFig h={124}>
      <rect x="12" y="24" width="216" height="90" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
      <rect x={120 - Math.max(18, label.length * 4.4 + 10)} y="12" width={Math.max(36, label.length * 8.8 + 20)} height="24" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
      <T x={120} y={29} s={14} c={label === '?' ? UNK : '#0f172a'}>{label}</T>
      {blocks.map((b, i) => (
        <LogicBlock key={i} b={b} x={14 + step * (i + 0.5)} y={74} k={0.95} />
      ))}
    </QFig>
  );
};

/** 3 × 3-as tábla formákkal (sorban, oszlopban nincs két egyforma). */
const ShapeGrid: React.FC = () => {
  const g: (Block['shape'] | null)[][] = [
    ['kor', 'negyzet', 'haromszog'],
    ['negyzet', 'haromszog', 'kor'],
    ['haromszog', 'kor', null]
  ];
  return (
    <QFig h={150}>
      {g.map((row, r) =>
        row.map((s, c) => (
          <g key={`${r}${c}`}>
            <rect x={60 + c * 42} y={10 + r * 42} width="42" height="42" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
            {s ? (
              <LogicBlock b={B('kek', s, true, false)} x={81 + c * 42} y={31 + r * 42} k={0.72} sw={2} />
            ) : (
              <T x={81 + c * 42} y={39 + r * 42} s={24} c={UNK}>?</T>
            )}
          </g>
        ))
      )}
    </QFig>
  );
};

const Podium3: React.FC<{ names: string }> = ({ names }) => (
  <QFig h={150}>
    <rect x="90" y="88" width="60" height="50" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <rect x="30" y="104" width="60" height="34" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
    <rect x="150" y="114" width="60" height="24" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
    <T x={120} y={120} s={20}>1</T>
    <T x={60} y={128} s={18}>2</T>
    <T x={180} y={132} s={16}>3</T>
    {[60, 120, 180].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={[78, 62, 88][i]} r={14} fill="#fee2e2" stroke={UNK} strokeWidth="2.5" strokeDasharray="4 3" />
        <T x={x} y={[84, 68, 94][i]} s={16} c={UNK}>?</T>
      </g>
    ))}
    <T x={120} y={24} s={12} c="#475569" w="normal">{names}</T>
  </QFig>
);

const apartOpts = (a: string, b: string, right: 'a' | 'b' | 'out') => {
  const t = { a: `a „${a}” karikába`, b: `a „${b}” karikába`, out: 'egyik karikába sem' };
  return [right, ...(['a', 'b', 'out'] as const).filter((r) => r !== right)].map((r) => t[r]);
};
const nestedOpts = (a: string, b: string, right: 'a' | 'ab' | 'out') => {
  const t = { a: `csak a „${a}” karikába`, ab: `a belső „${b}” karikába`, out: 'egyik karikába sem' };
  return [right, ...(['a', 'ab', 'out'] as const).filter((r) => r !== right)].map((r) => t[r]);
};

// ---------------------------------------------------------------------------
// Kérdések – 30 / szint: 10 válogatás (1. lecke), 10 halmazábra (2. lecke), 10 sorrend, lehetőség, igaz/hamis (3. lecke)
// ---------------------------------------------------------------------------
export const GROUPING_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // =========================== 1. SZINT ===========================
  {
    id: 'gex-g3-q1',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    figure: <BlockRow blocks={[B('kek', 'haromszog', true, true)]} k={1.6} />,
    question: 'Milyen ez a lap?',
    options: ['nagy, kék, lyukas háromszög', 'kicsi, kék, lyukas háromszög', 'nagy, kék, nem lyukas háromszög', 'nagy, zöld, lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Nézd meg a 4 tulajdonságot: nagy, kék, van rajta lyuk, és háromszög.'
  },
  {
    id: 'gex-g3-q2',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: <BlockRow numbered blocks={[B('piros', 'kor'), B('piros', 'negyzet'), B('kek', 'kor'), B('piros', 'haromszog')]} />,
    question: 'Melyik lap nem illik a sorba?',
    options: ['a 3. lap', 'az 1. lap', 'a 2. lap', 'a 4. lap'],
    correctAnswer: 0,
    explanation: 'Három lap piros, a 3. lap kék. Ezért a 3. nem illik a sorba.'
  },
  {
    id: 'gex-g3-q3',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: <NumRow nums={[24, 58, 37, 86]} />,
    question: 'Melyik szám nem illik a többi közé?',
    options: ['37', '24', '58', '86'],
    correctAnswer: 0,
    explanation: 'A 24, az 58 és a 86 páros. A 37 páratlan, ezért nem illik közéjük.'
  },
  {
    id: 'gex-g3-q4',
    level: 1,
    questionTypeBadge: 'Címke',
    figure: <LabelledBox label="?" blocks={[B('piros', 'kor', true, true), B('kek', 'negyzet', false, true), B('sarga', 'haromszog', true, true), B('zold', 'kor', false, true)]} />,
    question: 'Mi lehet a doboz címkéje?',
    options: ['lyukas lapok', 'piros lapok', 'körök', 'nagy lapok'],
    correctAnswer: 0,
    explanation: 'A lapok színe, formája és mérete is különböző. Egy közös van: mindegyik lyukas.'
  },
  {
    id: 'gex-g3-q5',
    level: 1,
    questionTypeBadge: 'Válogatás',
    figure: <BlockRow numbered blocks={[B('piros', 'kor'), B('zold', 'kor', false), B('piros', 'negyzet', false), B('piros', 'haromszog')]} />,
    question: 'Melyik lap kerül a „nem piros lapok” dobozba?',
    options: ['a 2. lap', 'az 1. lap', 'a 3. lap', 'a 4. lap'],
    correctAnswer: 0,
    explanation: 'Csak a 2. lap nem piros: zöld. A többi piros, azok a másik dobozba kerülnek.'
  },
  {
    id: 'gex-g3-q6',
    level: 1,
    questionTypeBadge: 'Jelek',
    figure: <CodeFig b={B('piros', 'kor', false, true)} />,
    question: 'Melyik lapot írják le a jelek?',
    options: ['kicsi, piros, lyukas kör', 'nagy, piros, lyukas kör', 'kicsi, piros, nem lyukas kör', 'kicsi, sárga, lyukas kör'],
    correctAnswer: 0,
    explanation: 'Piros paca: piros. Kicsi emberke: kicsi. Pötty a szürke lapon: lyukas. A forma: kör.'
  },
  {
    id: 'gex-g3-q7',
    level: 1,
    questionTypeBadge: 'Válogatás',
    question: 'Melyik szám kerül a „300-nál nagyobb számok” dobozba?',
    options: ['312', '299', '300', '213'],
    correctAnswer: 0,
    explanation: 'A 312 nagyobb 300-nál. A 300 nem nagyobb önmagánál, a 299 és a 213 kisebb.'
  },
  {
    id: 'gex-g3-q8',
    level: 1,
    questionTypeBadge: 'Barkochba',
    question: 'Gondoltam egy lapra. „Nagy?” – „Nem.” Milyen a lap?',
    options: ['kicsi', 'nagy', 'lyukas', 'piros'],
    correctAnswer: 0,
    explanation: 'A lap vagy nagy, vagy kicsi. Ha nem nagy, akkor biztosan kicsi.'
  },
  {
    id: 'gex-g3-q9',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    question: 'Hányféle színű lap van a logikai készletben?',
    options: ['4', '3', '2', '48'],
    correctAnswer: 0,
    explanation: 'Piros, sárga, kék és zöld: 4 szín. (A 48 a lapok száma.)'
  },
  {
    id: 'gex-g3-q10',
    level: 1,
    questionTypeBadge: 'Válogatási fa',
    figure: <TreeFig root="kicsi, piros" l1={['lyukas', 'nem lyukas']} l2={['kör', 'háromszög']} leaves={[B('piros', 'kor', false, true), B('piros', 'haromszog', false, true), null, B('piros', 'haromszog', false, false)]} />,
    question: 'Melyik lap kerül a „?” helyére?',
    options: ['kicsi, piros, nem lyukas kör', 'kicsi, piros, lyukas kör', 'kicsi, piros, nem lyukas háromszög', 'nagy, piros, nem lyukas kör'],
    correctAnswer: 0,
    explanation: 'Kövesd az ágat: kicsi, piros → nem lyukas → kör. Ez a kicsi, piros, nem lyukas kör.'
  },
  {
    id: 'gex-g3-q11',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx11" frame="Logikai lapok" a="piros" b="kicsi" top={<AskTop b={B('piros', 'negyzet', false, false)} />} />,
    question: 'Hová kerül a kicsi, piros négyzet?',
    options: regionOpts('piros', 'kicsi', 'ab'),
    correctAnswer: 0,
    explanation: 'Piros is, kicsi is. Mindkét címke igaz rá: a közös részbe kerül.'
  },
  {
    id: 'gex-g3-q12',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx12" frame="Logikai lapok" a="piros" b="kicsi" top={<AskTop b={B('kek', 'kor', true, false)} />} />,
    question: 'Hová kerül a nagy, kék kör?',
    options: regionOpts('piros', 'kicsi', 'out'),
    correctAnswer: 0,
    explanation: 'Nem piros és nem kicsi. Egyik karikába sem kerül, de a kereten belül marad.'
  },
  {
    id: 'gex-g3-q13',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx13" frame="Számok 500-ig" a="páros" b="háromjegyű" top={<AskTop n={135} />} />,
    question: 'Hová kerül a 135?',
    options: regionOpts('páros', 'háromjegyű', 'b'),
    correctAnswer: 0,
    explanation: 'A 135 háromjegyű, de páratlan (5 a vége). Csak a „háromjegyű” karikába kerül.'
  },
  {
    id: 'gex-g3-q14',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx14" frame="Számok 500-ig" a="páros" b="háromjegyű" top={<AskTop n={48} />} />,
    question: 'Hová kerül a 48?',
    options: regionOpts('páros', 'háromjegyű', 'a'),
    correctAnswer: 0,
    explanation: 'A 48 páros, de csak kétjegyű. Csak a „páros” karikába kerül.'
  },
  {
    id: 'gex-g3-q15',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx15" frame="Számok 500-ig" a="páros" b="háromjegyű" top={<AskTop n={260} />} />,
    question: 'Hová kerül a 260?',
    options: regionOpts('páros', 'háromjegyű', 'ab'),
    correctAnswer: 0,
    explanation: 'A 260 páros (0 a vége) és háromjegyű. A közös részbe kerül.'
  },
  {
    id: 'gex-g3-q16',
    level: 1,
    questionTypeBadge: 'Olvasd le!',
    figure: <QVenn id="gx16" frame="Számok 500-ig" a="páros" b="háromjegyű" items={vits([['a', 18], ['a', 46], ['ab', 120], ['b', 305], ['b', 211], ['out', 7]])} />,
    question: 'Melyik szám van a közös részben?',
    options: ['120', '46', '305', '7'],
    correctAnswer: 0,
    explanation: 'A közös rész a két karika találkozása. Ott a 120 van: páros is, háromjegyű is.'
  },
  {
    id: 'gex-g3-q17',
    level: 1,
    questionTypeBadge: 'Olvasd le!',
    figure: <QVenn id="gx17" frame="Számok 500-ig" a="páros" b="háromjegyű" items={vits([['a', 32], ['a', 64], ['ab', 150], ['ab', 208], ['b', 111], ['out', 9], ['out', 75]])} />,
    question: 'Hány szám van a „páros” karikában?',
    options: ['4', '2', '6', '3'],
    correctAnswer: 0,
    explanation: 'Csak a páros karikában: 32, 64. A közös részben: 150, 208. Ezek is a karikában vannak! 2 + 2 = 4.'
  },
  {
    id: 'gex-g3-q18',
    level: 1,
    questionTypeBadge: 'Közös rész',
    figure: (
      <QVenn
        id="gx18"
        frame="Logikai lapok"
        a="kék"
        b="lyukas"
        items={vits([['a', B('kek', 'kor', true, false)], ['ab', B('kek', 'haromszog', true, true)], ['b', B('piros', 'negyzet', true, true)], ['b', B('zold', 'kor', true, true)], ['out', B('sarga', 'haromszog', true, false)]])}
      />
    ),
    question: 'Mit tudsz a közös részben lévő lapról?',
    options: ['kék és lyukas', 'kék, de nem lyukas', 'lyukas, de nem kék', 'se nem kék, se nem lyukas'],
    correctAnswer: 0,
    explanation: 'A közös részben az a lap van, amelyikre mindkét címke igaz: kék is, lyukas is.'
  },
  {
    id: 'gex-g3-q19',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx19" frame="Számok 500-ig" a="kerek tízes" b="200-nál nagyobb" top={<AskTop n={250} />} />,
    question: 'Hová kerül a 250?',
    options: regionOpts('kerek tízes', '200-nál nagyobb', 'ab'),
    correctAnswer: 0,
    explanation: 'A 250 végén 0 van: kerek tízes. És nagyobb 200-nál. A közös részbe kerül.'
  },
  {
    id: 'gex-g3-q20',
    level: 1,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx20" frame="Számok 500-ig" a="5-re végződik" b="100-nál kisebb" top={<AskTop n={130} />} />,
    question: 'Hová kerül a 130?',
    options: regionOpts('5-re végződik', '100-nál kisebb', 'out'),
    correctAnswer: 0,
    explanation: 'A 130 végén 0 van, nem 5. És nem kisebb 100-nál. Egyik karikába sem kerül.'
  },
  {
    id: 'gex-g3-q21',
    level: 1,
    questionTypeBadge: 'Csökkenő sorrend',
    figure: <TowersFig heights={[3, 5, 2]} />,
    question: 'Rakd sorba a tornyokat a legmagasabbtól! Melyik a jó sorrend?',
    options: ['B, A, C', 'C, A, B', 'A, B, C', 'B, C, A'],
    correctAnswer: 0,
    explanation: 'B 5 kocka, A 3 kocka, C 2 kocka. A legmagasabbtól: B, A, C.'
  },
  {
    id: 'gex-g3-q22',
    level: 1,
    questionTypeBadge: 'Növekvő sorrend',
    question: 'Melyik sor növekvő? (A legkisebbel kezdődik.)',
    options: ['36, 63, 306', '63, 36, 306', '306, 63, 36', '36, 306, 63'],
    correctAnswer: 0,
    explanation: 'Növekvő: mindig nagyobb jön. 36 < 63 < 306.'
  },
  {
    id: 'gex-g3-q23',
    level: 1,
    questionTypeBadge: 'Hányféle sorrend?',
    figure: <BallsFig balls={['sarga', 'lila']} />,
    question: 'Hányféle sorrendben teheted le egymás mellé a 2 golyót?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: 'Sárga, lila vagy lila, sárga. Ez 2 sorrend.'
  },
  {
    id: 'gex-g3-q24',
    level: 1,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[6, 1]} />,
    question: 'Melyik a nagyobb kétjegyű szám, amit kirakhatsz?',
    options: ['61', '16', '7', '66'],
    correctAnswer: 0,
    explanation: 'A nagyobb jegy kerül előre: 6, aztán 1. Így 61.'
  },
  {
    id: 'gex-g3-q25',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <BlockRow blocks={[B('zold', 'kor', true, true), B('sarga', 'negyzet', false, true), B('piros', 'haromszog', true, true), B('kek', 'negyzet', true, true)]} />,
    question: '„Mindegyik lap lyukas.” Igaz vagy hamis?',
    options: ['Igaz', 'Hamis'],
    correctAnswer: 0,
    explanation: 'Mind a 4 lapon van lyuk. Az állítás igaz.'
  },
  {
    id: 'gex-g3-q26',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <NumSet nums={[14, 27, 38, 50]} />,
    question: '„Van olyan szám, amelyik páratlan.” Igaz vagy hamis?',
    options: ['Igaz', 'Hamis'],
    correctAnswer: 0,
    explanation: 'A 27 páratlan. Egy is elég, ezért igaz.'
  },
  {
    id: 'gex-g3-q27',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <NumSet nums={[120, 340, 205, 418]} />,
    question: '„Egyik szám sem páros.” Igaz vagy hamis?',
    options: ['Hamis', 'Igaz'],
    correctAnswer: 0,
    explanation: 'A 120, a 340 és a 418 páros. Ha egy is páros, az állítás hamis.'
  },
  {
    id: 'gex-g3-q28',
    level: 1,
    questionTypeBadge: 'Öltözetek',
    figure: <OutfitsFig shirts={['piros']} pants={['kek', 'zold', 'barna', 'lila']} />,
    question: '1 pólód és 4 nadrágod van. Hányféleképpen öltözhetsz fel?',
    options: ['4', '5', '1', '8'],
    correctAnswer: 0,
    explanation: 'A póló mindig ugyanaz. Csak a nadrágot választod: 4 nadrág, 4 öltözet.'
  },
  {
    id: 'gex-g3-q29',
    level: 1,
    questionTypeBadge: 'Sorba rendezés',
    figure: <KidsRowFig kids={[['rozsa', 'Dorka', '9 éves'], ['kek', 'Levi', '8 éves'], ['narancs', 'Hanna', '10 éves']]} />,
    question: 'Ki a legfiatalabb?',
    options: ['Levi', 'Dorka', 'Hanna'],
    correctAnswer: 0,
    explanation: 'Sorba rakva: Levi 8, Dorka 9, Hanna 10 éves. A legfiatalabb Levi.'
  },
  {
    id: 'gex-g3-q30',
    level: 1,
    questionTypeBadge: 'Növekvő sorrend',
    question: 'Rakd növekvő sorrendbe: 250, 205, 52. Melyik kerül középre?',
    options: ['205', '250', '52'],
    correctAnswer: 0,
    explanation: 'A legkisebb az 52, aztán 205, végül 250. Középen a 205 áll.'
  },

  // =========================== 2. SZINT ===========================
  {
    id: 'gex-g3-q31',
    level: 2,
    questionTypeBadge: 'Kakukktojás',
    figure: <BlockRow numbered blocks={[B('piros', 'kor'), B('piros', 'haromszog'), B('piros', 'kor', false), B('piros', 'haromszog'), B('piros', 'kor')]} />,
    question: 'Melyik lap nem illik a többi közé?',
    options: ['a 3. lap', 'az 1. lap', 'a 2. lap', 'az 5. lap'],
    correctAnswer: 0,
    explanation: 'Mindegyik piros és nem lyukas. Formából kör és háromszög is több van. Csak a 3. lap kicsi.'
  },
  {
    id: 'gex-g3-q32',
    level: 2,
    questionTypeBadge: 'Címke',
    figure: <LabelledBox label="?" blocks={[B('piros', 'kor', false, false), B('piros', 'negyzet', false, true), B('piros', 'haromszog', false, false)]} />,
    question: 'Melyik címke illik a dobozra?',
    options: ['kicsi, piros lapok', 'piros körök', 'kicsi, lyukas lapok', 'nagy, piros lapok'],
    correctAnswer: 0,
    explanation: 'Mindegyik lap kicsi és piros. A forma különböző, és csak egy lyukas.'
  },
  {
    id: 'gex-g3-q33',
    level: 2,
    questionTypeBadge: 'Jelek',
    figure: <CodeFig b={B('kek', 'negyzet', true, false)} />,
    question: 'Melyik lapot írják le a jelek?',
    options: ['nagy, kék, nem lyukas négyzet', 'kicsi, kék, nem lyukas négyzet', 'nagy, kék, lyukas négyzet', 'nagy, kék, nem lyukas kör'],
    correctAnswer: 0,
    explanation: 'Kék paca, nagy emberke, szürke lap pötty nélkül (nem lyukas), négyzet körvonal.'
  },
  {
    id: 'gex-g3-q34',
    level: 2,
    questionTypeBadge: 'Két tulajdonság',
    question: 'Melyik szám kerül a „páros, és 200-nál kisebb” dobozba?',
    options: ['196', '197', '206', '200'],
    correctAnswer: 0,
    explanation: 'A 196 páros és kisebb 200-nál. A 197 páratlan, a 206 nagyobb, a 200 pedig nem kisebb 200-nál.'
  },
  {
    id: 'gex-g3-q35',
    level: 2,
    questionTypeBadge: 'Kakukktojás',
    figure: <NumRow nums={[140, 260, 380, 425]} />,
    question: 'Melyik szám nem illik a többi közé?',
    options: ['425', '140', '260', '380'],
    correctAnswer: 0,
    explanation: 'A 140, 260, 380 kerek tízes (0 a vége) és páros. A 425 végén 5 van.'
  },
  {
    id: 'gex-g3-q36',
    level: 2,
    questionTypeBadge: 'Logikai készlet',
    question: 'Hány piros kör van a logikai készletben?',
    options: ['4', '12', '2', '16'],
    correctAnswer: 0,
    explanation: 'Piros kör lehet nagy vagy kicsi, lyukas vagy nem lyukas: nagy lyukas, nagy nem lyukas, kicsi lyukas, kicsi nem lyukas. Ez 4.'
  },
  {
    id: 'gex-g3-q37',
    level: 2,
    questionTypeBadge: 'Barkochba',
    question: '„Kék?” – igen. „Kör?” – igen. „Nagy?” – nem. Hány lap jöhet még szóba?',
    options: ['2', '1', '4', '3'],
    correctAnswer: 0,
    explanation: 'Kicsi, kék kör: lehet lyukas vagy nem lyukas. Még 2 lap marad.'
  },
  {
    id: 'gex-g3-q38',
    level: 2,
    questionTypeBadge: 'Válogatási fa',
    figure: <TreeFig root="nagy négyzetek" l1={['piros', 'nem piros']} l2={['lyukas', 'nem lyukas']} leaves={[B('piros', 'negyzet', true, true), null, B('sarga', 'negyzet', true, true), B('zold', 'negyzet', true, false)]} />,
    question: 'Melyik lap kerül a „?” helyére?',
    options: ['nagy, piros, nem lyukas négyzet', 'nagy, kék, nem lyukas négyzet', 'nagy, piros, lyukas négyzet', 'kicsi, piros, nem lyukas négyzet'],
    correctAnswer: 0,
    explanation: 'Kövesd az ágat: nagy négyzet → piros → nem lyukas.'
  },
  {
    id: 'gex-g3-q39',
    level: 2,
    questionTypeBadge: 'Két tulajdonság',
    question: 'Melyik szám páratlan, és 300-nál nagyobb?',
    options: ['315', '135', '314', '299'],
    correctAnswer: 0,
    explanation: 'A 315 páratlan (5 a vége) és nagyobb 300-nál. A 135 és a 299 kisebb, a 314 páros.'
  },
  {
    id: 'gex-g3-q40',
    level: 2,
    questionTypeBadge: 'Tagadás',
    question: 'Melyik lap NEM kerülhet a „nem körök” dobozba?',
    options: ['a kicsi, sárga kör', 'a nagy, sárga négyzet', 'a kicsi, kék háromszög', 'a nagy, zöld négyzet'],
    correctAnswer: 0,
    explanation: 'A „nem körök” közé minden négyzet és háromszög bekerül. Csak a kör marad ki.'
  },
  {
    id: 'gex-g3-q41',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx41" frame="Számok 500-ig" a="páros" b="300-nál nagyobb" top={<AskTop n={301} />} />,
    question: 'Hová kerül a 301?',
    options: regionOpts('páros', '300-nál nagyobb', 'b'),
    correctAnswer: 0,
    explanation: 'A 301 nagyobb 300-nál, de páratlan (1 a vége). Csak a „300-nál nagyobb” karikába kerül.'
  },
  {
    id: 'gex-g3-q42',
    level: 2,
    questionTypeBadge: 'Külön karikák',
    figure: <QVenn id="gx42" mode="apart" frame="Számok 500-ig" a="kerek tízes" b="páratlan" top={<AskTop n={75} />} />,
    question: 'Hová kerül a 75?',
    options: apartOpts('kerek tízes', 'páratlan', 'b'),
    correctAnswer: 0,
    explanation: 'A 75 páratlan (5 a vége), és nem kerek tízes. A „páratlan” karikába kerül.'
  },
  {
    id: 'gex-g3-q43',
    level: 2,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QVenn
        id="gx43"
        frame="Logikai lapok"
        a="piros"
        b="háromszög"
        items={vits([['a', B('piros', 'kor', true, false)], ['a', B('piros', 'negyzet', true, false)], ['ab', B('piros', 'haromszog', true, true)], ['ab', B('piros', 'haromszog', false, false)], ['b', B('kek', 'haromszog', true, false)], ['out', B('zold', 'kor', true, false)], ['out', B('sarga', 'negyzet', false, false)]])}
      />
    ),
    question: 'Hány piros lap van az ábrán?',
    options: ['4', '2', '6', '3'],
    correctAnswer: 0,
    explanation: 'Csak a piros karikában 2 lap, a közös részben 2 piros háromszög. 2 + 2 = 4.'
  },
  {
    id: 'gex-g3-q44',
    level: 2,
    questionTypeBadge: 'Olvasd le!',
    figure: (
      <QVenn
        id="gx44"
        frame="Logikai lapok"
        a="nagy"
        b="lyukas"
        items={vits([['a', B('piros', 'kor', true, false)], ['a', B('kek', 'haromszog', true, false)], ['ab', B('zold', 'negyzet', true, true)], ['b', B('sarga', 'kor', false, true)], ['b', B('piros', 'negyzet', false, true)], ['out', B('kek', 'haromszog', false, false)], ['out', B('zold', 'kor', false, false)], ['out', B('piros', 'kor', false, false)]])}
      />
    ),
    question: 'Hány lap van egyik karikában sem?',
    options: ['3', '2', '5', '1'],
    correctAnswer: 0,
    explanation: 'A karikákon kívül, de a kereten belül 3 lap van: ezek kicsik és nem lyukasak.'
  },
  {
    id: 'gex-g3-q45',
    level: 2,
    questionTypeBadge: 'Hibakereső',
    figure: <QVenn id="gx45" frame="Számok 500-ig" a="páros" b="háromjegyű" items={vits([['a', 34], ['a', 58], ['ab', 146], ['ab', 200], ['b', 333], ['b', 124], ['out', 9]])} />,
    question: 'Melyik szám van rossz helyen?',
    options: ['124', '333', '146', '9'],
    correctAnswer: 0,
    explanation: 'A 124 páros is (4 a vége), háromjegyű is. A közös részbe kellene tenni, nem csak a „háromjegyű” karikába.'
  },
  {
    id: 'gex-g3-q46',
    level: 2,
    questionTypeBadge: 'Címke',
    figure: <QVenn id="gx46" frame="Számok 500-ig" a="?" b="háromjegyű" items={vits([['a', 15], ['a', 37], ['a', 59], ['ab', 101], ['ab', 243], ['b', 300], ['b', 418], ['out', 22]])} />,
    question: 'Mi lehet a bal oldali karika címkéje?',
    options: ['páratlan', 'páros', 'kétjegyű', 'kerek tízes'],
    correctAnswer: 0,
    explanation: 'A bal karikában (a közös részt is nézd!) 15, 37, 59, 101, 243: mind páratlan. A 300, 418, 22 páros, ezek a bal karikán kívül vannak.'
  },
  {
    id: 'gex-g3-q47',
    level: 2,
    questionTypeBadge: 'Karika a karikában',
    figure: <QVenn id="gx47" mode="nested" frame="Számok 500-ig" a="páros" b="kerek tízes" top={<AskTop n={46} />} />,
    question: 'Hová kerül a 46?',
    options: nestedOpts('páros', 'kerek tízes', 'a'),
    correctAnswer: 0,
    explanation: 'A 46 páros, de nem kerek tízes (6 a vége). A nagy karikába kerül, a belsőn kívülre.'
  },
  {
    id: 'gex-g3-q48',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QVenn id="gx48" frame="Gyerekek" a="foci" b="kosárlabda" items={[{ r: 'a', n: '?' }, { r: 'ab', n: 5 }, { r: 'b', n: '?' }]} />,
    question: '12 gyerek szereti a focit, 9 a kosárlabdát. 5 gyerek mindkettőt. Hány gyerek szereti csak a focit?',
    options: ['7', '12', '17', '4'],
    correctAnswer: 0,
    explanation: 'Az 5 gyerek a közös részben van. A foci karikában 12 gyerek van, ebből 5 a közös részben. 12 – 5 = 7.'
  },
  {
    id: 'gex-g3-q49',
    level: 2,
    questionTypeBadge: 'Közös rész',
    figure: <QVenn id="gx49" frame="Számok 500-ig" a="5-re végződik" b="200-nál kisebb" items={[{ r: 'ab', n: '?', hl: true }]} />,
    question: 'Melyik szám kerül a közös részbe?',
    options: ['145', '245', '140', '205'],
    correctAnswer: 0,
    explanation: 'A 145 végén 5 van, és kisebb 200-nál. A 245 és a 205 nagyobb 200-nál, a 140 végén 0 van.'
  },
  {
    id: 'gex-g3-q50',
    level: 2,
    questionTypeBadge: 'Hová kerül?',
    figure: <QVenn id="gx50" frame="Számok 500-ig" a="páros" b="200-nál nagyobb" top={<AskTop n={200} />} />,
    question: 'Hová kerül a 200?',
    options: regionOpts('páros', '200-nál nagyobb', 'a'),
    correctAnswer: 0,
    explanation: 'A 200 páros. De nem nagyobb 200-nál, hiszen egyenlő vele. Csak a „páros” karikába kerül.'
  },
  {
    id: 'gex-g3-q51',
    level: 2,
    questionTypeBadge: 'Hányféle sorrend?',
    figure: <BallsFig balls={['piros', 'kek', 'zold']} />,
    question: 'Hányféle sorrendben teheted egymás mellé a 3 golyót?',
    options: ['6', '3', '9', '4'],
    correctAnswer: 0,
    explanation: 'Mindegyik golyó 2-szer áll elöl: 3 · 2 = 6 sorrend.'
  },
  {
    id: 'gex-g3-q52',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[3, 0, 4]} />,
    question: 'Hány háromjegyű számot rakhatsz ki? Minden kártyát egyszer használsz.',
    options: ['4', '6', '3', '2'],
    correctAnswer: 0,
    explanation: '304, 340, 403, 430. A 0 nem állhat elöl, ezért csak 4 szám van.'
  },
  {
    id: 'gex-g3-q53',
    level: 2,
    questionTypeBadge: 'Legkisebb szám',
    figure: <Cards digits={[2, 4, 1]} />,
    question: 'Melyik a legkisebb háromjegyű szám, amit kirakhatsz?',
    options: ['124', '142', '214', '421'],
    correctAnswer: 0,
    explanation: 'A legkisebb jegy kerül előre: 1, aztán 2, végül 4. Így 124.'
  },
  {
    id: 'gex-g3-q54',
    level: 2,
    questionTypeBadge: 'Legnagyobb szám',
    figure: <Cards digits={[4, 0, 3]} />,
    question: 'Melyik a legnagyobb háromjegyű szám, amit kirakhatsz?',
    options: ['430', '403', '340', '304'],
    correctAnswer: 0,
    explanation: 'A legnagyobb jegy kerül előre: 4, aztán 3, végül 0. Így 430.'
  },
  {
    id: 'gex-g3-q55',
    level: 2,
    questionTypeBadge: 'Öltözetek',
    figure: <OutfitsFig shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila', 'sarga']} />,
    question: 'Hányféleképpen öltözhetsz fel egy pólóba és egy nadrágba?',
    options: ['8', '6', '2', '4'],
    correctAnswer: 0,
    explanation: 'Mindegyik pólóhoz 4 nadrág illik. 2 · 4 = 8 öltözet.'
  },
  {
    id: 'gex-g3-q56',
    level: 2,
    questionTypeBadge: 'Útvonalak',
    figure: <RoutesFig a={3} b={2} />,
    question: 'Hányféleképpen juthatsz el a háztól az iskoláig, ha a bolton át mész?',
    options: ['6', '5', '3', '9'],
    correctAnswer: 0,
    explanation: 'A boltig 3 út vezet, onnan 2. Mindegyik után 2 út jöhet: 3 · 2 = 6.'
  },
  {
    id: 'gex-g3-q57',
    level: 2,
    questionTypeBadge: 'Melyik igaz?',
    figure: <BlockRow blocks={[B('piros', 'kor', true, true), B('kek', 'negyzet', false, false), B('sarga', 'haromszog', true, true), B('piros', 'kor', false, false), B('zold', 'negyzet', true, true)]} />,
    question: 'Melyik állítás igaz?',
    options: ['Van olyan lap, amelyik kicsi és kék.', 'Minden lap nagy.', 'Egyik lap sem kör.', 'Minden kör lyukas.'],
    correctAnswer: 0,
    explanation: 'A kék négyzet kicsi: ez igaz. Van kicsi lap, van kör, és a kicsi piros kör nem lyukas.'
  },
  {
    id: 'gex-g3-q58',
    level: 2,
    questionTypeBadge: 'Ki a legnehezebb?',
    question: 'Pötyi nehezebb Morzsinál. Bodri könnyebb Morzsinál. Ki a legnehezebb?',
    options: ['Pötyi', 'Morzsi', 'Bodri'],
    correctAnswer: 0,
    explanation: 'Sorrend a könnyebbtől: Bodri, Morzsi, Pötyi. A legnehezebb Pötyi.'
  },
  {
    id: 'gex-g3-q59',
    level: 2,
    questionTypeBadge: 'Rendszerezés',
    figure: <BallsFig balls={['piros', 'kek', 'zold', 'sarga']} />,
    question: 'A 4 golyót sorba rakod. Hány sorrend kezdődik a pirossal?',
    options: ['6', '3', '4', '24'],
    correctAnswer: 0,
    explanation: 'Ha a piros elöl van, a másik 3 golyó jön utána. 3 golyó 6-féle sorrendben állhat.'
  },
  {
    id: 'gex-g3-q60',
    level: 2,
    questionTypeBadge: 'Melyik hamis?',
    figure: <NumSet nums={[100, 250, 400, 30]} />,
    question: 'Melyik állítás hamis?',
    options: ['Minden szám kerek százas.', 'Minden szám kerek tízes.', 'Van olyan szám, amelyik kétjegyű.', 'Egyik szám sem páratlan.'],
    correctAnswer: 0,
    explanation: 'A 250 és a 30 nem kerek százas. Ezért a „Minden szám kerek százas” hamis. A többi igaz.'
  },

  // =========================== 3. SZINT ===========================
  {
    id: 'gex-g3-q61',
    level: 3,
    questionTypeBadge: 'Három feltétel',
    figure: <BlockRow numbered blocks={[B('piros', 'negyzet', true, true), B('kek', 'kor', true, true), B('zold', 'haromszog', true, true), B('sarga', 'negyzet', true, false), B('piros', 'haromszog', false, true)]} />,
    question: 'Melyik lap nem piros, nem kör, és lyukas?',
    options: ['a 3. lap', 'az 1. lap', 'a 2. lap', 'a 4. lap'],
    correctAnswer: 0,
    explanation: 'Az 1. és az 5. piros, a 2. kör, a 4. nem lyukas. Csak a 3. (zöld, lyukas háromszög) jó.'
  },
  {
    id: 'gex-g3-q62',
    level: 3,
    questionTypeBadge: 'Logikai készlet',
    question: 'Hány nagy, lyukas lap van a logikai készletben?',
    options: ['12', '24', '6', '4'],
    correctAnswer: 0,
    explanation: 'Minden színből 3 forma van: 4 szín, mindegyikből 3. 4 · 3 = 12.'
  },
  {
    id: 'gex-g3-q63',
    level: 3,
    questionTypeBadge: 'Tagadás',
    question: 'Nem piros, nem sárga, nem zöld. Kicsi. Nem lyukas. Nem kör, nem háromszög. Melyik lap ez?',
    options: ['kicsi, kék, nem lyukas négyzet', 'kicsi, kék, lyukas négyzet', 'nagy, kék, nem lyukas négyzet', 'kicsi, kék, nem lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Ha nem piros, sárga, zöld, akkor kék. Ha nem kör és nem háromszög, akkor négyzet.'
  },
  {
    id: 'gex-g3-q64',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <NumRow nums={[132, 154, 176, 189]} />,
    question: 'Melyik szám nem illik a többi közé?',
    options: ['189', '132', '154', '176'],
    correctAnswer: 0,
    explanation: 'A 132, 154, 176 páros. A 189 páratlan (9 a vége).'
  },
  {
    id: 'gex-g3-q65',
    level: 3,
    questionTypeBadge: 'Logikai készlet',
    question: 'Egy dobozba a nagy, piros lapok kerülnek. Hány lap lesz benne?',
    options: ['6', '12', '3', '24'],
    correctAnswer: 0,
    explanation: 'Nagy, piros: 3 forma, mindegyik lyukas vagy nem lyukas. 3 · 2 = 6.'
  },
  {
    id: 'gex-g3-q66',
    level: 3,
    questionTypeBadge: 'Barkochba',
    question: '„Nagy?” – igen. „Piros?” – nem. „Sárga?” – nem. „Kék?” – nem. „Lyukas?” – igen. „Háromszög?” – nem. „Kör?” – nem. Melyik lap ez?',
    options: ['nagy, zöld, lyukas négyzet', 'nagy, zöld, lyukas kör', 'nagy, kék, lyukas négyzet', 'kicsi, zöld, lyukas négyzet'],
    correctAnswer: 0,
    explanation: 'Nem piros, sárga, kék: zöld. Nem háromszög, nem kör: négyzet. Nagy és lyukas.'
  },
  {
    id: 'gex-g3-q67',
    level: 3,
    questionTypeBadge: 'Címke',
    figure: <NumSet nums={[105, 215, 335, 445, 495]} label="?" />,
    question: 'Melyik címke illik a halmazra?',
    options: ['5-re végződő háromjegyű számok', 'páros számok', 'kerek tízesek', '300-nál nagyobb számok'],
    correctAnswer: 0,
    explanation: 'Mindegyik háromjegyű, és 5 a vége. A 105 és a 215 kisebb 300-nál.'
  },
  {
    id: 'gex-g3-q68',
    level: 3,
    questionTypeBadge: 'Válogatási fa',
    question: 'A kicsi lapokat válogatod. Először szín szerint ágazik el a fa, aztán forma szerint. Hány ág lesz a fa végén?',
    options: ['12', '7', '24', '8'],
    correctAnswer: 0,
    explanation: '4 szín, mindegyik ág 3 formára ágazik: 4 · 3 = 12 ág.'
  },
  {
    id: 'gex-g3-q69',
    level: 3,
    questionTypeBadge: 'Két tulajdonság',
    figure: <LabelledBox label="nem piros, lyukas" blocks={[]} />,
    question: 'Melyik lap kerülhet ebbe a dobozba?',
    options: ['nagy, kék, lyukas kör', 'kicsi, piros, lyukas kör', 'nagy, zöld, nem lyukas kör', 'kicsi, piros, nem lyukas négyzet'],
    correctAnswer: 0,
    explanation: 'Két dolog kell: ne legyen piros, és legyen lyukas. Csak a kék, lyukas kör ilyen.'
  },
  {
    id: 'gex-g3-q70',
    level: 3,
    questionTypeBadge: 'Logikai rejtvény',
    figure: <ShapeGrid />,
    question: 'Egy sorban és egy oszlopban sincs két egyforma forma. Mi kerül a „?” helyére?',
    options: ['négyzet', 'kör', 'háromszög'],
    correctAnswer: 0,
    explanation: 'Az utolsó sorban már van háromszög és kör. Az oszlopban is van háromszög és kör. Marad a négyzet.'
  },
  {
    id: 'gex-g3-q71',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A piros karikában 6 lap van, a lyukas karikában 5. Ebből 2 lap a közös részben van. Hány lap van összesen a két karikában?',
    options: ['9', '11', '13', '7'],
    correctAnswer: 0,
    explanation: 'A 2 közös lapot mindkét karikánál megszámoltuk. 6 + 5 = 11, de a 2 lap kétszer szerepel: 11 – 2 = 9.'
  },
  {
    id: 'gex-g3-q72',
    level: 3,
    questionTypeBadge: 'Karikákon kívül',
    figure: <QVenn id="gx72" frame="Számok 500-ig" a="páros" b="háromjegyű" items={[{ r: 'out', n: '?', hl: true }]} />,
    question: 'Melyik szám kerül a karikákon kívülre?',
    options: ['47', '46', '147', '146'],
    correctAnswer: 0,
    explanation: 'Kívülre az kerül, ami se nem páros, se nem háromjegyű. A 47 páratlan és kétjegyű.'
  },
  {
    id: 'gex-g3-q73',
    level: 3,
    questionTypeBadge: 'Címke',
    figure: <QVenn id="gx73" frame="Számok 500-ig" a="páros" b="?" items={vits([['a', 12], ['a', 46], ['ab', 120], ['ab', 340], ['b', 205], ['b', 111], ['b', 499], ['out', 7]])} />,
    question: 'Mi lehet a jobb oldali karika címkéje?',
    options: ['háromjegyű', 'páratlan', '100-nál kisebb', 'kerek tízes'],
    correctAnswer: 0,
    explanation: 'A jobb karikában 120, 340, 205, 111, 499 van: mind háromjegyű. A 12, 46, 7 kívül van, ezek nem háromjegyűek.'
  },
  {
    id: 'gex-g3-q74',
    level: 3,
    questionTypeBadge: 'Olvasd le!',
    figure: <QVenn id="gx74" frame="Számok 500-ig" a="páros" b="háromjegyű" items={vits([['a', 18], ['a', 36], ['a', 74], ['ab', 102], ['ab', 400], ['b', 115], ['out', 5]])} />,
    question: 'Hány szám páros, de nem háromjegyű?',
    options: ['3', '5', '2', '6'],
    correctAnswer: 0,
    explanation: 'Ezek csak a „páros” karikában vannak, a közös részen kívül: 18, 36, 74. Ez 3 szám.'
  },
  {
    id: 'gex-g3-q75',
    level: 3,
    questionTypeBadge: 'Karika a karikában',
    figure: <QVenn id="gx75" mode="nested" frame="Számok 500-ig" a="páros" b="kerek tízes" items={vits([['a', 46], ['a', 124], ['ab', 70], ['ab', 300], ['out', 33]])} />,
    question: 'Miért van a „kerek tízes” karika a „páros” karika belsejében?',
    options: ['Mert minden kerek tízes páros.', 'Mert minden páros szám kerek tízes.', 'Mert nincs páros kerek tízes.', 'Mert a kerek tízesek nagyobbak.'],
    correctAnswer: 0,
    explanation: 'A kerek tízesek végén 0 van, ezért mind párosak. De nem minden páros kerek tízes (pl. 46).'
  },
  {
    id: 'gex-g3-q76',
    level: 3,
    questionTypeBadge: 'Külön karikák',
    figure: <QVenn id="gx76" mode="apart" frame="Számok 500-ig" a="páros" b="páratlan" />,
    question: 'Miért nem ér össze a „páros” és a „páratlan” karika?',
    options: ['Nincs olyan szám, amelyik páros is, páratlan is.', 'Mert kevés a szám.', 'Mert minden szám páros.', 'Mert a páratlan számok nagyobbak.'],
    correctAnswer: 0,
    explanation: 'Egy szám vagy páros, vagy páratlan, egyszerre a kettő nem lehet. A közös rész üres lenne.'
  },
  {
    id: 'gex-g3-q77',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '18 gyerek van az osztályban. 10 szeret rajzolni, 11 szeret énekelni. Mindenki szereti legalább az egyiket. Hányan szeretik mindkettőt?',
    options: ['3', '21', '8', '1'],
    correctAnswer: 0,
    explanation: '10 + 11 = 21, de csak 18 gyerek van. Aki mindkettőt szereti, azt kétszer számoltuk: 21 – 18 = 3.'
  },
  {
    id: 'gex-g3-q78',
    level: 3,
    questionTypeBadge: 'Közös rész',
    figure: <QVenn id="gx78" frame="Logikai lapok" a="kicsi" b="háromszög" items={[{ r: 'ab', n: '?', hl: true }]} />,
    question: 'Az egész készletet szétválogatod. Hány lap kerül a közös részbe?',
    options: ['8', '4', '12', '24'],
    correctAnswer: 0,
    explanation: 'Kicsi háromszög: 4 szín, mindegyik lyukas vagy nem lyukas. 4 · 2 = 8.'
  },
  {
    id: 'gex-g3-q79',
    level: 3,
    questionTypeBadge: 'Hibakereső',
    figure: <QVenn id="gx79" frame="Számok 500-ig" a="200-nál kisebb" b="kerek tízes" items={vits([['a', 45], ['a', 199], ['ab', 60], ['ab', 190], ['b', 250], ['b', 205], ['out', 333]])} />,
    question: 'Melyik szám van rossz helyen?',
    options: ['205', '199', '250', '333'],
    correctAnswer: 0,
    explanation: 'A 205 végén 5 van, nem kerek tízes. És nem kisebb 200-nál. A karikákon kívül lenne a helye.'
  },
  {
    id: 'gex-g3-q80',
    level: 3,
    questionTypeBadge: 'Határ',
    figure: <QVenn id="gx80" frame="Számok 500-ig" a="150-nél kisebb" b="kerek tízes" top={<AskTop n={150} />} />,
    question: 'Hová kerül a 150?',
    options: regionOpts('150-nél kisebb', 'kerek tízes', 'b'),
    correctAnswer: 0,
    explanation: 'A 150 nem kisebb 150-nél, hiszen egyenlő vele. De kerek tízes. Csak a „kerek tízes” karikába kerül.'
  },
  {
    id: 'gex-g3-q81',
    level: 3,
    questionTypeBadge: 'Feltétel',
    figure: <Podium3 names="Bori, Kata, Dani" />,
    question: 'Bori, Kata és Dani versenyez. Dani nem lett utolsó. Hány sorrend lehet?',
    options: ['4', '6', '2', '3'],
    correctAnswer: 0,
    explanation: 'Összesen 6 sorrend van. 2 sorrendben Dani az utolsó. 6 – 2 = 4.'
  },
  {
    id: 'gex-g3-q82',
    level: 3,
    questionTypeBadge: 'Páratlan számok',
    figure: <Cards digits={[1, 3, 4]} />,
    question: 'Hány páratlan háromjegyű számot rakhatsz ki? Minden kártyát egyszer használsz.',
    options: ['4', '2', '6', '3'],
    correctAnswer: 0,
    explanation: 'Páratlan, ha 1-re vagy 3-ra végződik: 341, 431, 143, 413. Ez 4 szám.'
  },
  {
    id: 'gex-g3-q83',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[5, 2, 0]} />,
    question: 'Hány 500-nál kisebb háromjegyű számot rakhatsz ki?',
    options: ['2', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'A 0 nem lehet elöl, az 5-tel kezdődő szám nem kisebb 500-nál. Marad a 2 elöl: 205 és 250.'
  },
  {
    id: 'gex-g3-q84',
    level: 3,
    questionTypeBadge: 'Ki hányadik?',
    question: 'Négy autó versenyez: piros, kék, zöld, sárga. A sárga lett az első. A piros lett az utolsó. A kék a zöld előtt ért célba. Melyik lett a második?',
    options: ['a kék', 'a zöld', 'a piros', 'a sárga'],
    correctAnswer: 0,
    explanation: 'Az 1. a sárga, a 4. a piros. A 2. és 3. helyre a kék és a zöld jut. A kék a zöld előtt van: 2. a kék.'
  },
  {
    id: 'gex-g3-q85',
    level: 3,
    questionTypeBadge: 'Választás',
    figure: <ScoopsFig flavours={['rozsa', 'barna', 'sarga', 'zold']} />,
    question: 'Eper, csoki, vanília, pisztácia. 2 különböző gombócot kérsz. A sorrend mindegy. Hányféleképpen választhatsz?',
    options: ['6', '12', '4', '8'],
    correctAnswer: 0,
    explanation: 'Az eper mellé 3 íz: 3 pár. A csoki mellé még 2 új: 2 pár. A vanília mellé 1: 1 pár. 3 + 2 + 1 = 6.'
  },
  {
    id: 'gex-g3-q86',
    level: 3,
    questionTypeBadge: 'Tedd hamissá!',
    figure: <NumSet nums={[24, 106, 380]} />,
    question: '„Minden szám páros.” Melyik számot tedd be, hogy az állítás hamis legyen?',
    options: ['215', '216', '400', '98'],
    correctAnswer: 0,
    explanation: 'Egy páratlan szám elég, hogy hamis legyen. A 215 páratlan, a többi páros.'
  },
  {
    id: 'gex-g3-q87',
    level: 3,
    questionTypeBadge: 'Útvonalak',
    figure: <RoutesFig a={3} b={4} names={['tanya', 'híd', 'falu']} />,
    question: 'Hányféleképpen juthatsz el a tanyától a faluig, ha a hídon át mész?',
    options: ['12', '7', '9', '16'],
    correctAnswer: 0,
    explanation: 'A hídig 3 út vezet, onnan 4. Mindegyik után 4 út jöhet: 3 · 4 = 12.'
  },
  {
    id: 'gex-g3-q88',
    level: 3,
    questionTypeBadge: 'Feltétel',
    figure: <OutfitsFig shirts={['piros', 'kek', 'zold']} pants={['barna', 'lila']} />,
    question: 'A piros pólót nem veszed fel a lila nadrággal. Hányféleképpen öltözhetsz fel?',
    options: ['5', '6', '4', '3'],
    correctAnswer: 0,
    explanation: '3 · 2 = 6 öltözet lenne. A piros póló a lila nadrággal kiesik: 6 – 1 = 5.'
  },
  {
    id: 'gex-g3-q89',
    level: 3,
    questionTypeBadge: 'Rendszerezés',
    figure: <Cards digits={[1, 2, 3]} />,
    question: 'Növekvő sorrendben felírod az összes háromjegyű számot ezekből a kártyákból. Melyik lesz a negyedik?',
    options: ['231', '213', '312', '132'],
    correctAnswer: 0,
    explanation: 'Sorban: 123, 132, 213, 231, 312, 321. A negyedik a 231.'
  },
  {
    id: 'gex-g3-q90',
    level: 3,
    questionTypeBadge: 'Tedd igazzá!',
    figure: <BlockRow numbered blocks={[B('piros', 'kor', true, false), B('kek', 'negyzet', true, true), B('sarga', 'haromszog', false, true), B('zold', 'kor', false, false), B('piros', 'negyzet', true, true)]} />,
    question: 'Egy lapot elveszel. Utána igaz lesz: „Egyik lap sem sárga.” Melyiket veszed el?',
    options: ['a 3. lapot', 'az 1. lapot', 'a 4. lapot', 'az 5. lapot'],
    correctAnswer: 0,
    explanation: 'Csak a 3. lap sárga. Ha elveszed, egyik lap sem lesz sárga.'
  }
];

export const GroupingExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId="g3-grp-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: logikai lapok, címkék, halmazábrák, sorrendek, lehetőségek, igaz vagy hamis."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={GROUPING_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Válogatás',
          items: ['Logikai lap: szín, forma, méret, lyukas-e.', 'A címke megmondja, mi kerül a dobozba.', '„piros és lyukas”: mindkettő kell.', '„nem piros”: minden más szín.']
        },
        {
          title: 'Halmazábra',
          items: ['Karikán belül: igaz rá a címke.', 'Közös rész: mindkét címke igaz.', 'Karikákon kívül: egyik sem igaz.', 'Számolásnál a közös részt is számold!']
        },
        {
          title: 'Sorrend, lehetőség, igaz/hamis',
          items: ['3 dolog: 6 sorrend. Elöl nem állhat 0.', '2 póló, 3 nadrág: 2 · 3 = 6.', '„Minden”: egy rossz is elég, és hamis.', '„Van olyan”: egy jó is elég, és igaz.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GroupingExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <GroupingExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default GroupingExamG3Quiz;
