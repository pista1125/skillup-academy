import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FinanceInvestmentsMatcher } from './FinanceInvestmentsMatcher';
import { FinanceInvestmentsSorter } from './FinanceInvestmentsSorter';
import { QFig, SeqBarChart, SText, S_BLUE, S_RED, S_GREEN, S_INK, S_PURPLE } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_COMPOUND = (
  <QFig>
    <SeqBarChart values={[200000, 220000, 242000]} x={40} y={22} w={170} h={100} maxV={260000} showValues valueDigits={0} highlight={[2]} />
    <SText x={125} y={150} t="0., 1., 2. év vége · 10% kamatos kamat" s={10} c={S_INK} />
  </QFig>
);

const FIG_QUARTER = (
  <QFig>
    <line x1={20} y1={100} x2={220} y2={100} stroke={S_INK} strokeWidth="1.6" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <line x1={20 + i * 50} y1={94} x2={20 + i * 50} y2={106} stroke={S_INK} strokeWidth="1.6" />
        <SText x={20 + i * 50} y={122} t={i === 0 ? 'start' : `${i}. n.év`} s={9} c="#475569" />
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={`a${i}`}>
        <path d={`M ${26 + i * 50} 88 Q ${45 + i * 50} 66 ${64 + i * 50} 88`} fill="none" stroke={S_GREEN} strokeWidth="1.4" />
        <SText x={45 + i * 50} y={64} t="· 1,02" s={9.5} c={S_GREEN} b />
      </g>
    ))}
    <SText x={120} y={30} t="évi 8%, negyedéves jóváírás" s={10.5} b />
    <SText x={120} y={148} t="egy év alatt: ? %" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_DALMA = (
  <QFig>
    {[24, 23, 22].map((k, i) => (
      <g key={i}>
        <rect x={40 + (24 - k) * 7} y={24 + i * 22} width={k * 7} height={12} rx={3} fill={S_BLUE} opacity={0.7} />
        <circle cx={40 + (24 - k) * 7} cy={30 + i * 22} r={3.5} fill={S_RED} />
      </g>
    ))}
    <SText x={120} y={100} t="⋮" s={14} c="#475569" />
    <rect x={40 + 23 * 7} y={108} width={7} height={12} rx={2} fill="#d97706" />
    <circle cx={40 + 23 * 7} cy={114} r={3.5} fill={S_RED} />
    <line x1={40} y1={134} x2={208} y2={134} stroke={S_INK} />
    <SText x={40} y={148} t="0" s={9} />
    <SText x={208} y={148} t="24. hó" s={9} />
    <SText x={120} y={158} t="20 000 Ft havonta, havi 0,5%" s={9.5} c={S_RED} b />
  </QFig>
);

const FIG_CAR = (
  <QFig>
    <line x1={30} y1={130} x2={225} y2={130} stroke="#64748b" />
    <line x1={30} y1={130} x2={30} y2={20} stroke="#64748b" />
    <polyline points={Array.from({ length: 13 }, (_, i) => `${30 + i * 15},${130 - 6 * 0.99 ** (i * 6) * 17}`).join(' ')} fill="none" stroke={S_RED} strokeWidth="2.2" />
    <line x1={30} y1={130 - 3 * 17} x2={225} y2={130 - 3 * 17} stroke={S_PURPLE} strokeDasharray="4 3" />
    <SText x={26} y={130 - 6 * 17 + 4} t="6" s={9.5} a="end" />
    <SText x={26} y={130 - 3 * 17 + 4} t="3" s={9.5} a="end" />
    <SText x={128} y={146} t="hónapok (havonta −1%)" s={9.5} c="#475569" />
    <SText x={150} y={64} t="felére: ? hónap" s={10} c={S_RED} b />
    <SText x={58} y={18} t="millió Ft" s={9} />
  </QFig>
);

const FIG_TWINS = (
  <QFig>
    <SeqBarChart values={Array.from({ length: 18 }, (_, i) => 500000 * 1.08 ** (i + 1))} x={34} y={20} w={190} h={104} labelEvery={6} color={S_GREEN} />
    <SText x={120} y={156} t="500 000 Ft · évi 8% · 18 év" s={10.5} c={S_RED} b />
  </QFig>
);

const FINANCE_INV_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fi-q1',
    questionTypeBadge: 'Kamatos kamat',
    level: 1,
    question: '100 000 Ft-ot 1 évre bankba teszünk évi 5%-os kamatra. Mennyi lesz a számlán az év végén?',
    options: ['105 000 Ft', '150 000 Ft', '100 500 Ft', '95 000 Ft'],
    correctAnswer: 0,
    explanation: 'A kamat 100 000 · 0,05 = 5000 Ft, így 100 000 · 1,05 = 105 000 Ft lesz a számlán.'
  },
  {
    id: 'fi-q2',
    questionTypeBadge: 'Kamattényező',
    level: 1,
    question: 'Mekkora a q kamattényező évi 6%-os kamatláb esetén?',
    options: ['1,06', '0,06', '1,6', '6'],
    correctAnswer: 0,
    explanation: 'q = 1 + p/100 = 1 + 0,06 = 1,06: egy év alatt a tőke 1,06-szorosára nő.'
  },
  {
    id: 'fi-q3',
    questionTypeBadge: 'Kamatos kamat',
    figure: FIG_COMPOUND,
    level: 1,
    question: '200 000 Ft-ot 2 évre lekötünk évi 10%-os kamatos kamatra, évenkénti jóváírással. Mennyi lesz a számlán?',
    options: ['242 000 Ft', '240 000 Ft', '220 000 Ft', '400 000 Ft'],
    correctAnswer: 0,
    explanation: '200 000 · 1,1² = 242 000 Ft. (240 000 Ft egyszerű kamatozásnál jönne ki.)'
  },
  {
    id: 'fi-q4',
    questionTypeBadge: 'Egyszerű kamat',
    level: 1,
    question: '200 000 Ft-ot 2 évre teszünk be évi 10%-os egyszerű kamatozással (a kamatot minden évben kivesszük). Mennyi kamatot kapunk összesen?',
    options: ['40 000 Ft', '42 000 Ft', '20 000 Ft', '242 000 Ft'],
    correctAnswer: 0,
    explanation: 'Egyszerű kamatnál a kamat nem kamatozik tovább: évente 20 000 Ft, 2 év alatt 40 000 Ft.'
  },
  {
    id: 'fi-q5',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mit jelent a kamatos kamatozás?',
    options: [
      'A kamat a tőkéhez adódik, és azzal együtt kamatozik tovább',
      'A kamatot minden évben kivesszük vagy átvezetjük',
      'A kamatláb évről évre nő',
      'A bank a kamatot csak a futamidő végén fizeti ki, kamatozás nélkül'
    ],
    correctAnswer: 0,
    explanation: 'Kamatos kamatnál a jóváírt kamat a tőke része lesz, így a tőke mértani sorozat szerint nő: Kₙ = K₀ · qⁿ.'
  },
  {
    id: 'fi-q6',
    questionTypeBadge: 'Kamatláb',
    level: 1,
    question: 'A negyedévre lekötött tőke kamata 3%. Mekkora a (törvény szerint éves időtartamra megadott) kamatláb?',
    options: ['évi 12%', 'évi 3%', 'évi ≈ 12,55%', 'évi 0,75%'],
    correctAnswer: 0,
    explanation: 'A kamatlábat éves időtartamra és egyszerű kamatozásra adják meg: 4 · 3% = 12%. A ≈ 12,55% a valódi hozam lenne (1,03⁴).'
  },
  {
    id: 'fi-q7',
    questionTypeBadge: 'Havi kamat',
    level: 1,
    question: 'Évi 6%-os kamatláb, havi jóváírás esetén hány százalékkal nő a tőke egy hónap alatt?',
    options: ['0,5%-kal', '6%-kal', '0,05%-kal', '0,6%-kal'],
    correctAnswer: 0,
    explanation: '6% : 12 = 0,5% a havi kamatláb, a havi kamattényező 1,005.'
  },
  {
    id: 'fi-q8',
    questionTypeBadge: 'Valódi hozam',
    figure: FIG_QUARTER,
    level: 1,
    question: 'Évi 8%-os kamatláb, negyedéves jóváírás és kamatos kamatozás mellett hány százalékkal nő a tőke egy év alatt?',
    options: ['≈ 8,24%-kal', '8%-kal', '2%-kal', '≈ 36%-kal'],
    correctAnswer: 0,
    explanation: 'Negyedévente 8% : 4 = 2%, egy év alatt 1,02⁴ ≈ 1,0824-szeresére nő a tőke, azaz 8,24%-kal.'
  },
  {
    id: 'fi-q9',
    questionTypeBadge: 'Gyűjtőjáradék',
    level: 1,
    question: 'Dalma 24 hónapon át minden hónap elején befizet egy összeget, a jóváírás a hónap végén van. Hányszor kamatozik az első befizetés?',
    options: ['24-szer', '23-szor', '1-szer', '12-szer'],
    correctAnswer: 0,
    explanation: 'Az első befizetés mind a 24 hónap végén kamatozik, a második 23-szor, …, az utolsó csak egyszer.'
  },
  {
    id: 'fi-q10',
    questionTypeBadge: 'Kamatos kamat',
    level: 1,
    question: '1 000 000 Ft-ot 3 évre lekötünk évi 4%-os kamatos kamatra. Mennyi lesz a számlán?',
    options: ['1 124 864 Ft', '1 120 000 Ft', '1 040 000 Ft', '1 124 000 Ft'],
    correctAnswer: 0,
    explanation: '1 000 000 · 1,04³ = 1 124 864 Ft. (1 120 000 Ft egyszerű kamatozással jönne ki.)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'fi-q11',
    questionTypeBadge: 'Gyűjtőjáradék',
    figure: FIG_DALMA,
    level: 2,
    question: 'Dalma minden hónap elején 20 000 Ft-ot tesz gyűjtőszámlára, évi 6%, havi jóváírás a hónap végén. Kb. mennyi lesz a számláján 2 év múlva?',
    options: ['≈ 511 182 Ft', '480 000 Ft', '≈ 508 639 Ft', '≈ 540 800 Ft'],
    correctAnswer: 0,
    explanation: 'S₂₄ = 20 000 · 1,005 · (1,005²⁴ − 1)/0,005 ≈ 511 182 Ft. (≈ 508 639 Ft hónap végi befizetésnél jönne ki; 480 000 Ft a befizetések összege.)'
  },
  {
    id: 'fi-q12',
    questionTypeBadge: 'Kamatláb',
    level: 2,
    question: 'Egy házaspár 5 éve 6 millió Ft-ot tett bankba kamatos kamatra, évenkénti jóváírással; most 7 millió Ft-ot vehettek fel. Mekkora volt az éves kamatláb?',
    options: ['≈ 3,13%', '≈ 3,33%', '≈ 16,7%', '≈ 2,5%'],
    correctAnswer: 0,
    explanation: '6 · q⁵ = 7 ⇒ q = ⁵√(7/6) ≈ 1,0313 ⇒ ≈ 3,13%. (3,33% az egyszerű kamatozásos számolás: 1/6 : 5.)'
  },
  {
    id: 'fi-q13',
    questionTypeBadge: 'Érettségi 2022',
    level: 2,
    question: 'Egy 6 millió Ft-os új autó értéke a lineáris modell szerint 5 év alatt csökken a felére. Hány forinttal csökken az értéke egy hónap alatt?',
    options: ['50 000 Ft-tal', '600 000 Ft-tal', '100 000 Ft-tal', '25 000 Ft-tal'],
    correctAnswer: 0,
    explanation: 'A csökkenés 3 millió Ft 60 hónap alatt: 3 000 000 : 60 = 50 000 Ft havonta (600 000 Ft évente).'
  },
  {
    id: 'fi-q14',
    questionTypeBadge: 'Értékcsökkenés',
    figure: FIG_CAR,
    level: 2,
    question: 'Az exponenciális modell szerint az autó értéke havonta 1%-kal csökken. Kb. mennyit ér a 6 millió Ft-os új autó 2 év múlva?',
    options: ['≈ 4 714 069 Ft', '4 560 000 Ft', '≈ 5 318 309 Ft', '≈ 4 860 000 Ft'],
    correctAnswer: 0,
    explanation: '6 000 000 · 0,99²⁴ ≈ 4 714 069 Ft. (4 560 000 Ft = 6 000 000 · (1 − 0,24) lineáris számolás; ≈ 5 318 309 Ft csak 1 év.)'
  },
  {
    id: 'fi-q15',
    questionTypeBadge: 'Összehasonlítás',
    level: 2,
    question: 'Két évre melyik kamatos kamatozású befektetés előnyösebb? A: évi 9,8%, évenkénti jóváírás; B: évi 9,6%, havi jóváírás.',
    options: ['B, mert 1,008²⁴ ≈ 1,2107 > 1,098² ≈ 1,2056', 'A, mert 9,8% > 9,6%', 'egyformák', 'A, mert 1,098² > 1,096²'],
    correctAnswer: 0,
    explanation: 'B havi kamatlába 9,6% : 12 = 0,8%, 24 hónap alatt 1,008²⁴ ≈ 1,2107-szeres; A: 1,098² ≈ 1,2056-szoros. B előnyösebb.'
  },
  {
    id: 'fi-q16',
    questionTypeBadge: 'Kamatláb',
    level: 2,
    question: 'Miklós 3 millió Ft-ot tesz bankba kamatos kamatra, évenkénti jóváírással. Mekkora a kamatláb, ha 12 év múlva 4,7 millió Ft lesz a számláján?',
    options: ['≈ 3,81%', '≈ 4,72%', '≈ 56,7%', '≈ 3,5%'],
    correctAnswer: 0,
    explanation: 'q¹² = 4,7/3 ⇒ q = ¹²√1,5667 ≈ 1,0381 ⇒ ≈ 3,81%. (4,72% egyszerű kamattal számolna.)'
  },
  {
    id: 'fi-q17',
    questionTypeBadge: 'Érettségi 2008',
    figure: FIG_TWINS,
    level: 2,
    question: 'Csilla számlájára születésekor 500 000 Ft-ot helyeztek el, évi 8%-os kamatos kamatra. Kb. mennyi gyűlt össze a 18. születésnapjára?',
    options: ['≈ 1 998 010 Ft', '1 220 000 Ft', '≈ 1 850 009 Ft', '≈ 2 157 851 Ft'],
    correctAnswer: 0,
    explanation: '500 000 · 1,08¹⁸ ≈ 1 998 010 Ft. (1 220 000 Ft egyszerű kamattal; a másik kettő 17, illetve 19 év.)'
  },
  {
    id: 'fi-q18',
    questionTypeBadge: 'Gyűjtőjáradék',
    level: 2,
    question: 'Zsuzsa öt éven át minden év elején 350 000 Ft-ot tesz gyűjtőszámlára, évi 7,5%, éves jóváírás az év végén. Kb. mennyi lesz a számlán öt év múlva?',
    options: ['≈ 2 185 407 Ft', '1 750 000 Ft', '≈ 2 032 937 Ft', '≈ 2 512 619 Ft'],
    correctAnswer: 0,
    explanation: 'S₅ = 350 000 · 1,075 · (1,075⁵ − 1)/0,075 ≈ 2 185 407 Ft. (≈ 2 032 937 Ft év végi befizetésekkel jönne ki.)'
  },
  {
    id: 'fi-q19',
    questionTypeBadge: 'Gyűjtőjáradék',
    level: 2,
    question: 'Egy fiatalember havi 10 000 Ft-ot költ cigarettára. Mennyi gyűlne össze 10 év alatt, ha ehelyett minden hónap elején gyűjtőszámlára tenné (évi 6%, havi jóváírás)?',
    options: ['≈ 1 646 987 Ft', '1 200 000 Ft', '≈ 1 638 793 Ft', '≈ 2 149 000 Ft'],
    correctAnswer: 0,
    explanation: '120 befizetés, q = 1,005: 10 000 · 1,005 · (1,005¹²⁰ − 1)/0,005 ≈ 1 646 987 Ft.'
  },
  {
    id: 'fi-q20',
    questionTypeBadge: 'Futamidő',
    level: 2,
    question: 'Évi 6%-os kamatos kamatnál (évenkénti jóváírás) legalább hány év alatt duplázódik meg a tőke?',
    options: ['12 év', '17 év', '11 év', '6 év'],
    correctAnswer: 0,
    explanation: '1,06ⁿ ≥ 2 ⇒ n ≥ lg 2/lg 1,06 ≈ 11,9 ⇒ 12 év. (Egyszerű kamatnál 100 : 6 ≈ 16,7 ⇒ 17 év kellene.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'fi-q21',
    questionTypeBadge: 'Logaritmus',
    figure: FIG_CAR,
    level: 3,
    question: 'Az exponenciális modell szerint (havonta −1%) hány hónap alatt csökken a felére a 6 millió Ft-os autó értéke?',
    options: ['≈ 69 hónap', '50 hónap', '60 hónap', '≈ 72 hónap'],
    correctAnswer: 0,
    explanation: '0,99ⁿ = 0,5 ⇒ n = lg 0,5/lg 0,99 ≈ 68,97 ⇒ kb. 69 hónap. (50 hónap: 50% : 1% lineárisan; 60 hónap: a lineáris modell.)'
  },
  {
    id: 'fi-q22',
    questionTypeBadge: 'Százalék',
    level: 3,
    question: 'Az exponenciális modellben (havonta −1%) hány százalékos csökkenést jelent 2 év az újkori értékhez képest?',
    options: ['≈ 21,4%', '24%', '≈ 78,6%', '≈ 11,4%'],
    correctAnswer: 0,
    explanation: '1 − 0,99²⁴ ≈ 1 − 0,7857 = 0,2143, azaz ≈ 21,4%. (A 24% a százalékok összeadása lenne.)'
  },
  {
    id: 'fi-q23',
    questionTypeBadge: 'Két szakasz',
    level: 3,
    question: 'Ferenc az 1–2. év elején 200 000 Ft-ot fizet be (7%), a 3–4. év elején 300 000 Ft-ot (9%), éves jóváírás az év végén. Kb. mennyi van a számláján a 4. év végén?',
    options: ['≈ 1 209 735 Ft', '1 000 000 Ft', '≈ 1 172 000 Ft', '≈ 1 156 000 Ft'],
    correctAnswer: 0,
    explanation: '2. év vége: 200 000 · 1,07² + 200 000 · 1,07 = 442 980 Ft. 3. év vége: (442 980 + 300 000) · 1,09 ≈ 809 848; 4. év vége: (809 848 + 300 000) · 1,09 ≈ 1 209 735 Ft.'
  },
  {
    id: 'fi-q24',
    questionTypeBadge: 'Visszafelé',
    level: 3,
    question: 'Dávid 4 éven át minden év elején ugyanakkora összeget tett gyűjtőszámlára (évi 7%, éves jóváírás). A 4. kamatozás után 1 140 000 Ft volt a számlán. Mekkora volt egy befizetés?',
    options: ['≈ 239 963 Ft', '285 000 Ft', '≈ 256 760 Ft', '≈ 217 470 Ft'],
    correctAnswer: 0,
    explanation: 'x · 1,07 · (1,07⁴ − 1)/0,07 = 1 140 000 ⇒ x · 4,7507 ≈ 1 140 000 ⇒ x ≈ 239 963 Ft. (285 000 = 1 140 000 : 4 kamat nélkül.)'
  },
  {
    id: 'fi-q25',
    questionTypeBadge: 'Érettségi 2008',
    level: 3,
    question: 'Csongor számlájára születésekor 400 000 Ft-ot tettek, félévente azonos kamatlábbal kamatozik; a 18. születésnapján 2 millió Ft-ot vehet fel. Mekkora a félévenkénti kamatláb?',
    options: ['≈ 4,57%', '≈ 9,35%', '≈ 11,1%', '≈ 2,26%'],
    correctAnswer: 0,
    explanation: '18 év = 36 félév: q³⁶ = 5 ⇒ q = ³⁶√5 ≈ 1,0457 ⇒ ≈ 4,57%. (≈ 9,35% az éves 18√5-ből adódna.)'
  },
  {
    id: 'fi-q26',
    questionTypeBadge: 'Kamatjövedelem',
    level: 3,
    question: 'Dalma 24 hónapon át havonta 20 000 Ft-ot fizetett be (évi 6%, havi jóváírás, hónap eleji befizetés). Mennyivel több a 2 év végi egyenleg a befizetett összegnél?',
    options: ['≈ 31 182 Ft', '≈ 28 800 Ft', '≈ 60 000 Ft', '≈ 2 880 Ft'],
    correctAnswer: 0,
    explanation: 'Egyenleg ≈ 511 182 Ft, befizetés 24 · 20 000 = 480 000 Ft, a különbség ≈ 31 182 Ft.'
  },
  {
    id: 'fi-q27',
    questionTypeBadge: 'Valódi hozam',
    level: 3,
    question: 'Évi 12%-os kamatláb, havi jóváírás, kamatos kamatozás. Kb. hány százalékkal nő a tőke egy év alatt?',
    options: ['≈ 12,68%', '12%', '≈ 12,55%', '≈ 13,2%'],
    correctAnswer: 0,
    explanation: 'Havi 1%: 1,01¹² ≈ 1,1268, azaz ≈ 12,68%. (12,55% negyedéves jóváírásnál jönne ki: 1,03⁴.)'
  },
  {
    id: 'fi-q28',
    questionTypeBadge: 'Manhattan',
    level: 3,
    question: 'Warren Buffett szerint az 1626-ban Manhattanért kapott 24 dollár évi 6,5%-kal kamatoztatva cikkének írásakor 24 · 1,065³³⁸ ≈ 42 milliárd dollárt ért volna. Mikor írta a cikket?',
    options: ['1964-ben', '1626-ban', '2008-ban', '1938-ban'],
    correctAnswer: 0,
    explanation: 'A kitevő az eltelt évek száma: 1626 + 338 = 1964.'
  },
  {
    id: 'fi-q29',
    questionTypeBadge: 'Kamatláb',
    level: 3,
    question: 'Anikó minden év elején 250 000 Ft-ot tesz gyűjtőszámlára, éves jóváírás az év végén. Két év elteltével 560 000 Ft van a számláján. Kb. mekkora az éves kamatláb?',
    options: ['≈ 7,8%', '12%', '≈ 6%', '≈ 5,8%'],
    correctAnswer: 0,
    explanation: '250 000(q² + q) = 560 000 ⇒ q² + q − 2,24 = 0 ⇒ q ≈ 1,078 ⇒ ≈ 7,8%.'
  },
  {
    id: 'fi-q30',
    questionTypeBadge: 'Futamidő',
    level: 3,
    question: 'Anikó minden év elején 250 000 Ft-ot tesz gyűjtőszámlára, évi 9%, éves jóváírás. Hány év után gyűlik össze legalább 1 600 000 Ft?',
    options: ['5 év', '4 év', '6 év', '7 év'],
    correctAnswer: 0,
    explanation: '250 000 · 1,09 · (1,09ⁿ − 1)/0,09 ≥ 1 600 000 ⇒ 1,09ⁿ ≥ 1,528 ⇒ n ≥ 4,92 ⇒ 5 év (S₄ ≈ 1 246 178 Ft, S₅ ≈ 1 630 834 Ft).'
  }
];

export const FinanceInvestmentsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="sorozatok"
      topicId="g12-seq-tokebefektetes-quiz"
      subtopicId="penzugyi-feladatok-1-tokebefektetesek"
      title="8. Pénzügyi feladatok I. – tőkebefektetések – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: egyszerű és kamatos kamat, jóváírási periódusok, kamatláb és futamidő, gyűjtőjáradék, értékcsökkenés."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={FINANCE_INV_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kamatos kamat',
          items: ['q = 1 + p/100', 'Kₙ = K₀ · qⁿ', 'egyszerű kamat: Kₙ = K₀(1 + n · p/100)', 'értékcsökkenés p%-kal: q = 1 − p/100']
        },
        {
          title: 'Periódusok',
          items: ['havi kamatláb: p/12 %', 'negyedéves: p/4 %', 'valódi éves hozam: (1 + p/(100m))ᵐ − 1', 'évi 8%, negyedévente: 8,24%']
        },
        {
          title: 'Gyűjtőjáradék',
          items: [
            'periódus eleji befizetés: Sₙ = x · q · (qⁿ − 1)/(q − 1)',
            'periódus végi befizetés: Sₙ = x · (qⁿ − 1)/(q − 1)',
            'ismeretlen q: q = ⁿ√(Kₙ/K₀)',
            'ismeretlen n: n = lg(Kₙ/K₀)/lg q'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FinanceInvestmentsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FinanceInvestmentsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FinanceInvestmentsQuiz;
