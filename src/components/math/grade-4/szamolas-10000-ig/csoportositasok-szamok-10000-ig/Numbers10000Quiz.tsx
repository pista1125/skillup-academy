import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers10000Matcher } from './Numbers10000Matcher';
import { Numbers10000Sorter } from './Numbers10000Sorter';
import { AbacusDrawing, PV_COLORS } from './Numbers10000Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Helyiérték-táblázat: E, sz, t, e oszlopok, egy sor értékkel. */
const PVFig: React.FC<{ cells: string[]; heads?: string[] }> = ({ cells, heads = ['E', 'sz', 't', 'e'] }) => {
  const keys: (keyof typeof PV_COLORS)[] = ['E', 'sz', 't', 'e'];
  const w = 200 / cells.length;
  return (
    <QFig h={100}>
      {cells.map((c, i) => {
        const col = PV_COLORS[keys[i] ?? 'e'];
        const x = 20 + i * w;
        return (
          <g key={i}>
            <rect x={x} y="18" width={w} height="26" fill={col.stroke} stroke="#1e293b" />
            <text x={x + w / 2} y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{heads[i]}</text>
            <rect x={x} y="44" width={w} height="36" fill={col.fill} stroke="#1e293b" />
            <text x={x + w / 2} y="68" textAnchor="middle" fontSize={c.length > 3 ? 12 : 17} fontWeight="bold" fill={c.includes('?') ? UNK : col.text}>
              {c}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

const AbacusFig: React.FC<{ digits: number[] }> = ({ digits }) => (
  <svg viewBox="0 0 240 185" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="183" rx="10" fill="#f0f9ff" stroke="#cbd5e1" />
    <AbacusDrawing digits={digits} />
  </svg>
);

/** Számegyenes min..max, kis osztás step-enként, felirat a labelStep többszöröseinél, "?" nyíl az at helyen. */
const NumLineFig: React.FC<{ min: number; max: number; step: number; labelStep: number; at: number }> = ({ min, max, step, labelStep, at }) => {
  const x0 = 18;
  const x1 = 222;
  const sx = (n: number) => x0 + ((x1 - x0) * (n - min)) / (max - min);
  const ticks: number[] = [];
  for (let n = min; n <= max; n += step) ticks.push(n);
  return (
    <QFig h={95}>
      <line x1={x0} y1="55" x2={x1} y2="55" stroke="#166534" strokeWidth="2" />
      {ticks.map((n) => (
        <line key={n} x1={sx(n)} y1={(n - min) % labelStep === 0 ? 47 : 51} x2={sx(n)} y2={(n - min) % labelStep === 0 ? 63 : 59} stroke="#166534" strokeWidth={(n - min) % labelStep === 0 ? 1.8 : 0.9} />
      ))}
      {ticks
        .filter((n) => (n - min) % labelStep === 0)
        .map((n) => (
          <text key={n} x={sx(n)} y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">{n}</text>
        ))}
      <path d={`M ${sx(at)} 45 l -5 -11 l 10 0 z`} fill={UNK} />
      <text x={sx(at)} y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 220 / items.length;
  return (
    <QFig h={70}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={10 + i * w + 2} y="18" width={w - 4} height="34" rx="8" fill={t === '?' ? '#fee2e2' : '#ecfdf5'} stroke={t === '?' ? UNK : '#10b981'} strokeWidth="1.5" />
          <text x={10 + i * w + w / 2} y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill={t === '?' ? UNK : '#065f46'}>{t}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Leltártáblázat (csoportosítás). */
const LeltarFig: React.FC<{ heads: string[]; values: string[] }> = ({ heads, values }) => {
  const w = 220 / heads.length;
  return (
    <QFig h={90}>
      {heads.map((h, i) => (
        <g key={i}>
          <rect x={10 + i * w} y="14" width={w} height="32" fill="#fef9c3" stroke="#ca8a04" />
          <text x={10 + i * w + w / 2} y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">{h}</text>
          <rect x={10 + i * w} y="46" width={w} height="30" fill="#fff" stroke="#ca8a04" />
          <text x={10 + i * w + w / 2} y="67" textAnchor="middle" fontSize="15" fontWeight="bold" fill={values[i] === '?' ? UNK : '#713f12'}>{values[i]}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Számkártyák. */
const CardsFig: React.FC<{ digits: string[] }> = ({ digits }) => (
  <QFig h={80}>
    {digits.map((d, i) => {
      const x = 120 - (digits.length * 44) / 2 + i * 44;
      return (
        <g key={i}>
          <rect x={x + 3} y="16" width="38" height="48" rx="7" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
          <text x={x + 22} y="49" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#5b21b6">{d}</text>
        </g>
      );
    })}
  </QFig>
);

const ZAFIR_HEADS = ['zsák (27)', 'doboz (9)', 'zacskó (3)', 'zafír (1)'];

export const NUMBERS_10000_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'n10k-q1',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <PVFig cells={['5', '4', '7', '2']} />,
    question: 'Melyik szám áll 5 ezresből, 4 százasból, 7 tízesből és 2 egyesből?',
    options: ['5472', '5742', '4572', '547'],
    correctAnswer: 0,
    explanation: 'Írd a jegyeket a helyükre: E = 5, sz = 4, t = 7, e = 2. Balról jobbra olvasva: 5472.'
  },
  {
    id: 'n10k-q2',
    level: 1,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig digits={[3, 1, 3, 0]} />,
    question: 'Melyik számot mutatja a golyós számoló? (zöld = 1000, piros = 100, kék = 10, sárga = 1)',
    options: ['3130', '3103', '313', '1330'],
    correctAnswer: 0,
    explanation: '3 zöld = 3000, 1 piros = 100, 3 kék = 30, sárga nincs, ezért az egyesek helyén 0 áll: 3130.'
  },
  {
    id: 'n10k-q3',
    level: 1,
    questionTypeBadge: 'Beváltás',
    question: 'Mennyit ér 10 százas?',
    options: ['1 ezrest', '10 ezrest', '1 tízest', '100 egyest'],
    correctAnswer: 0,
    explanation: '10 százas = 1000 = 1 ezres. A 100 egyes csak 1 százas lenne.'
  },
  {
    id: 'n10k-q4',
    level: 1,
    questionTypeBadge: 'Számok írása',
    question: 'Hogyan írjuk le betűvel a 2001-et?',
    options: ['kétezer-egy', 'kétezeregy', 'kettőezer-egy', 'kétezer-tíz'],
    correctAnswer: 0,
    explanation: '2000 fölött, ha az ezresek után még folytatódik a szám, kötőjelet teszünk: kétezer-egy.'
  },
  {
    id: 'n10k-q5',
    level: 1,
    questionTypeBadge: 'Számok olvasása',
    question: 'Melyik szám a nyolcezer-hétszáztizennégy?',
    options: ['8714', '8741', '8417', '8704'],
    correctAnswer: 0,
    explanation: 'nyolcezer = 8000, hétszáz = 700, tizennégy = 14. Együtt: 8714.'
  },
  {
    id: 'n10k-q6',
    level: 1,
    questionTypeBadge: 'Valódi érték',
    figure: <PVFig cells={['4', '9', '2', '5']} />,
    question: 'Mennyi a 9 valódi értéke a 4925 számban?',
    options: ['900', '9', '90', '9000'],
    correctAnswer: 0,
    explanation: 'A 9 a százasok helyén áll, ezért 9 százast ér: 900.'
  },
  {
    id: 'n10k-q7',
    level: 1,
    questionTypeBadge: 'Számsorozat',
    figure: <SeqFig items={['2700', '2800', '2900', '?']} />,
    question: 'Folytasd a számsort! 2700, 2800, 2900, ?',
    options: ['3000', '2910', '3900', '2000'],
    correctAnswer: 0,
    explanation: 'A számok százasával nőnek: 2900 + 100 = 3000.'
  },
  {
    id: 'n10k-q8',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <NumLineFig min={1000} max={2000} step={100} labelStep={500} at={1700} />,
    question: 'Melyik számra mutat a nyíl a számegyenesen?',
    options: ['1700', '1070', '1600', '1800'],
    correctAnswer: 0,
    explanation: 'Egy kis osztás 100-at ér. 1500-tól még 2 osztást lépünk jobbra: 1500 + 200 = 1700.'
  },
  {
    id: 'n10k-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Debrida kertésze virágokat ültetett. Melyik szám a legnagyobb? 9177, 9717, 7051, 6820',
    options: ['9717', '9177', '7051', '6820'],
    correctAnswer: 0,
    explanation: 'Először az ezreseket nézd: 9 a legtöbb. A két 9-es közül a százasok döntenek: 7 > 1, ezért 9717 a legnagyobb.'
  },
  {
    id: 'n10k-q10',
    level: 1,
    questionTypeBadge: 'Beváltás',
    question: 'Hány ezerfabatkást kapsz 1 tízezerfabatkásért?',
    options: ['10', '100', '1000', '1'],
    correctAnswer: 0,
    explanation: '10 ezres = 1 tízezres, ezért 1 tízezresért 10 ezrest kapsz.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'n10k-q11',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik szám áll 37 százasból és 7 egyesből?',
    options: ['3707', '377', '3770', '3077'],
    correctAnswer: 0,
    explanation: '37 százas = 3700. Hozzá 7 egyes: 3707. A tízesek helyén 0 áll.'
  },
  {
    id: 'n10k-q12',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik szám áll 52 százasból, 25 tízesből és 18 egyesből?',
    options: ['5468', '5458', '5568', '5218'],
    correctAnswer: 0,
    explanation: '52 százas = 5200, 25 tízes = 250, 18 egyes = 18. 5200 + 250 + 18 = 5468.'
  },
  {
    id: 'n10k-q13',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    figure: <PVFig cells={['4', '19', '8', '0']} />,
    question: 'Melyik szám áll 4 ezresből, 19 százasból és 8 tízesből?',
    options: ['5980', '4980', '4198', '5908'],
    correctAnswer: 0,
    explanation: '19 százas = 1900 = 1 ezres és 9 százas. 4000 + 1900 + 80 = 5980.'
  },
  {
    id: 'n10k-q14',
    level: 2,
    questionTypeBadge: 'Pénztárgép',
    figure: <PVFig cells={['0', '11', '25', '36']} />,
    question: 'A pénztárgépben 11 százas, 25 tízes és 36 egyes fabatka van. Hány fabatka ez összesen?',
    options: ['1386', '1356', '1186', '1286'],
    correctAnswer: 0,
    explanation: '1100 + 250 + 36 = 1386. Beváltás után: 1 ezres, 3 százas, 8 tízes, 6 egyes.'
  },
  {
    id: 'n10k-q15',
    level: 2,
    questionTypeBadge: 'Helyesírás',
    question: 'Melyik a helyes írásmód az 1805-re?',
    options: ['ezernyolcszázöt', 'ezer-nyolcszázöt', 'egyezer-nyolcszázöt', 'ezernyolcszáz-öt'],
    correctAnswer: 0,
    explanation: 'Kétezerig minden számot egybeírunk: ezernyolcszázöt.'
  },
  {
    id: 'n10k-q16',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Melyik a 5321 helyes bontása valódi értékekre?',
    options: ['5000 + 300 + 20 + 1', '5 + 3 + 2 + 1', '500 + 300 + 20 + 1', '5000 + 300 + 2 + 1'],
    correctAnswer: 0,
    explanation: 'Az 5 ezreseket ér (5000), a 3 százasokat (300), a 2 tízeseket (20), az 1 egyest (1).'
  },
  {
    id: 'n10k-q17',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Rendezd csökkenő sorrendbe: 4678, 4876, 4708, 4807, 4768. Melyik lesz a második?',
    options: ['4807', '4876', '4768', '4708'],
    correctAnswer: 0,
    explanation: 'Csökkenő sorrend: 4876, 4807, 4768, 4708, 4678. Mindegyikben 4 ezres van, ezért a százasok, majd a tízesek döntenek.'
  },
  {
    id: 'n10k-q18',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <NumLineFig min={5000} max={7000} step={100} labelStep={1000} at={6400} />,
    question: 'Melyik számra mutat a nyíl?',
    options: ['6400', '6040', '5400', '6300'],
    correctAnswer: 0,
    explanation: 'Egy kis osztás 100. 6000-től 4 osztást lépünk jobbra: 6000 + 400 = 6400.'
  },
  {
    id: 'n10k-q19',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    figure: <LeltarFig heads={ZAFIR_HEADS} values={['1', '0', '1', '2']} />,
    question: 'A koboldok hármasával csomagolták a zafírokat. Hány zafír van a leltár szerint?',
    options: ['32', '1012', '30', '35'],
    correctAnswer: 0,
    explanation: '1 zsák = 27, 0 doboz = 0, 1 zacskó = 3, és 2 szabad zafír: 27 + 3 + 2 = 32. Ez nem tízes csoportosítás, ezért nem 1012!'
  },
  {
    id: 'n10k-q20',
    level: 2,
    questionTypeBadge: 'Számsorozat',
    figure: <SeqFig items={['7500', '7000', '6500', '?']} />,
    question: 'Ötszázasával csökkenő számsor: 7500, 7000, 6500, ? Mi a következő?',
    options: ['6000', '6400', '5500', '6050'],
    correctAnswer: 0,
    explanation: 'Minden lépésben 500-at vonunk le: 6500 − 500 = 6000.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'n10k-q21',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <PVFig cells={['?', '?', '?', '?']} />,
    question: 'Gondoltam egy négyjegyű számra. Az ezresek helyén a legnagyobb egyjegyű páros szám áll, az egyesek helyén a legnagyobb egyjegyű páratlan. A tízes az ezres negyede, a százas az egyes harmada. Melyik szám ez?',
    options: ['8329', '8239', '9328', '8392'],
    correctAnswer: 0,
    explanation: 'E = 8, e = 9. Tízes: 8 negyede = 2. Százas: 9 harmada = 3. A szám: 8329.'
  },
  {
    id: 'n10k-q22',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Firtos tündér fabatkái: az ezresek helyén a legnagyobb páros jegy, a százas jegy valódi értéke 900, a tízes és az egyes jegy páros (de nem 0), és az egyes jegy a tízes jegy háromszorosa. Hány fabatkája van?',
    options: ['8926', '8962', '9826', '8936'],
    correctAnswer: 0,
    explanation: 'E = 8, sz = 9. A tízes és az egyes páros, és az egyes a tízes háromszorosa: 2 és 6 (2 · 3 = 6). A szám: 8926.'
  },
  {
    id: 'n10k-q23',
    level: 3,
    questionTypeBadge: 'Számalkotás',
    figure: <CardsFig digits={['2', '4', '5', '9']} />,
    question: 'Hány különböző négyjegyű számot alkothatsz ebből a 4 kártyából, ha mindegyiket egyszer használod?',
    options: ['24', '16', '12', '4'],
    correctAnswer: 0,
    explanation: 'Az ezresek helyére 4-féle, a százasokéra 3-féle, a tízesekére 2-féle, az egyesekére 1 kártya jut: 4 · 3 · 2 · 1 = 24.'
  },
  {
    id: 'n10k-q24',
    level: 3,
    questionTypeBadge: 'Számalkotás',
    figure: <CardsFig digits={['2', '7', '6', '9']} />,
    question: 'Melyik a legkisebb páros szám, amit ebből a 4 kártyából kirakhatsz (mindegyiket egyszer használva)?',
    options: ['2796', '2679', '2976', '6792'],
    correctAnswer: 0,
    explanation: 'Páros szám a végén 2-vel vagy 6-tal. Ha elöl a 2 áll (hogy kicsi legyen), a végére a 6 kell, középre 7 és 9: 2796. A 2679 páratlan!'
  },
  {
    id: 'n10k-q25',
    level: 3,
    questionTypeBadge: 'Pénz',
    question: 'Hány darab 2000 forintos kell ahhoz, hogy kifizess 10 000 Ft-ot?',
    options: ['5', '2', '50', '20'],
    correctAnswer: 0,
    explanation: '2000, 4000, 6000, 8000, 10 000 – ez 5 darab 2000 Ft-os.'
  },
  {
    id: 'n10k-q26',
    level: 3,
    questionTypeBadge: 'Valódi érték',
    figure: <PVFig cells={['2', '13', '7', '31']} />,
    question: 'Mennyi: 2 E + 13 sz + 7 t + 31 e?',
    options: ['3401', '2401', '3371', '3311'],
    correctAnswer: 0,
    explanation: '2000 + 1300 + 70 + 31 = 3401.'
  },
  {
    id: 'n10k-q27',
    level: 3,
    questionTypeBadge: 'Valódi érték',
    figure: <PVFig cells={['0', '19', '19', '19']} />,
    question: 'Mennyi: 19 sz + 19 t + 19 e?',
    options: ['2109', '2009', '2119', '1999'],
    correctAnswer: 0,
    explanation: '1900 + 190 + 19 = 2109.'
  },
  {
    id: 'n10k-q28',
    level: 3,
    questionTypeBadge: 'Állítások',
    question: 'Melyik számra igaz mindkét állítás? „Minden helyi értéken páratlan számjegy áll.” és „Az 5 valódi értéke 50.”',
    options: ['3159', '3195', '3254', '5139'],
    correctAnswer: 0,
    explanation: 'A 3159-ben minden jegy páratlan (3, 1, 5, 9), és az 5 a tízesek helyén áll: 50. A 3195-ben az 5 csak 5-öt ér, a 3254-ben a 2 és a 4 páros, az 5139-ben az 5 ezreseket ér.'
  },
  {
    id: 'n10k-q29',
    level: 3,
    questionTypeBadge: 'Csoportosítás',
    figure: <LeltarFig heads={['doboz (16)', 'zacskó (4)', 'rubin (1)']} values={['?', '?', '?']} />,
    question: 'A rubinokat négyesével csomagolják (zacskó = 4, doboz = 16). Mi lesz a 27 rubin leltára, ha a lehető legkevesebb csomagot használják?',
    options: ['1 doboz, 2 zacskó, 3 rubin', '2 doboz, 1 zacskó, 3 rubin', '1 doboz, 1 zacskó, 7 rubin', '0 doboz, 6 zacskó, 3 rubin'],
    correctAnswer: 0,
    explanation: '27-ben a 16 egyszer van meg, marad 11. 11-ben a 4 kétszer (8), marad 3. Leltár: 1 | 2 | 3. Ellenőrzés: 16 + 8 + 3 = 27.'
  },
  {
    id: 'n10k-q30',
    level: 3,
    questionTypeBadge: 'Állítások',
    question: 'Mondj egy 1000-nél kisebb négyjegyű számot! Melyik válasz igaz?',
    options: ['Nincs ilyen szám.', 'A 999.', 'Az 1000.', 'A 0999.'],
    correctAnswer: 0,
    explanation: 'A legkisebb négyjegyű szám az 1000. Ennél kisebb négyjegyű szám nincs. A 999 háromjegyű, és a számot nem kezdjük 0-val.'
  }
];

export const Numbers10000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-szamok-10000-quiz"
      subtopicId="csoportositasok-szamok-10000-ig"
      title="9. Csoportosítások, számok 10 000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: csoportosítás, helyi érték, számok írása és a számegyenes 10 000-ig."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={NUMBERS_10000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Beváltás tízesével',
          items: [
            '10 egyes = 1 tízes (10)',
            '10 tízes = 1 százas (100)',
            '10 százas = 1 ezres (1000)',
            '10 ezres = 1 tízezres (10 000)'
          ]
        },
        {
          title: 'Helyiérték-táblázat',
          items: [
            'E = ezres, sz = százas, t = tízes, e = egyes',
            'Alaki érték: maga a számjegy.',
            'Valódi érték: amennyit a helyén ér (4213-ban a 2 → 200).',
            'Üres helyre 0 kerül: 7 E + 4 t + 5 e = 7045.'
          ]
        },
        {
          title: 'Számok betűvel',
          items: [
            '2000-ig egybeírjuk: ezernyolcszázöt.',
            'Kerek ezresek: kétezer, ötezer, tízezer.',
            '2000 fölött kötőjel: kétezer-egy, ötezer-tíz.',
            'Évszám kivétel: kétezerhuszonkettő.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers10000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers10000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers10000Quiz;
