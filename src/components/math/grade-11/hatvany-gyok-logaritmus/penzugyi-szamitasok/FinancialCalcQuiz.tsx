import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FinancialCalcMatcher } from './FinancialCalcMatcher';
import { FinancialCalcSorter } from './FinancialCalcSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** Oszlopdiagram: tőke és évenkénti szorzó, az utolsó oszlop értéke ismeretlen. */
const BarsFig: React.FC<{ start: string; factor: string; bars: number[]; lastLabel: string; target?: number }> = ({ start, factor, bars, lastLabel, target }) => {
  const max = Math.max(...bars, target ?? 0) * 1.1;
  const bw = 180 / bars.length;
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="30" y1="130" x2="230" y2="130" stroke="#64748b" />
      {target !== undefined && (
        <>
          <line x1="30" y1={130 - (target / max) * 110} x2="230" y2={130 - (target / max) * 110} stroke="#e11d48" strokeDasharray="5 4" />
          <text x="228" y={126 - (target / max) * 110} fontSize="9" textAnchor="end" fill="#e11d48">
            cél
          </text>
        </>
      )}
      {bars.map((v, i) => (
        <g key={i}>
          <rect
            x={36 + i * bw}
            y={130 - (v / max) * 110}
            width={bw * 0.7}
            height={(v / max) * 110}
            fill={i === bars.length - 1 ? '#7c3aed' : '#c4b5fd'}
            rx="2"
          />
          <text x={36 + i * bw + bw * 0.35} y="143" fontSize="9" textAnchor="middle" fill="#475569">
            {i}
          </text>
        </g>
      ))}
      <text x="36" y="14" fontSize="11" fill="#0f172a" fontWeight="bold">
        {start}
      </text>
      <text x="36" y="27" fontSize="10" fill="#be185d">
        {factor}
      </text>
      <text x="230" y="156" fontSize="10" textAnchor="end" fill="#7c3aed" fontWeight="bold">
        {lastLabel}
      </text>
    </svg>
  );
};

const SIMPLE_VS_COMPOUND_FIG = (
  <svg viewBox="0 0 240 160" className={QSVG}>
    <line x1="30" y1="135" x2="230" y2="135" stroke="#64748b" />
    <line x1="30" y1="135" x2="30" y2="10" stroke="#64748b" />
    {[0, 1, 2, 3].map((n) => (
      <g key={n}>
        <rect x={45 + n * 48} y={135 - (100000 * Math.pow(1.1, n) / 140000) * 115} width="16" height={(100000 * Math.pow(1.1, n) / 140000) * 115} fill="#7c3aed" />
        <rect x={63 + n * 48} y={135 - ((100000 * (1 + 0.1 * n)) / 140000) * 115} width="16" height={((100000 * (1 + 0.1 * n)) / 140000) * 115} fill="#7dd3fc" />
        <text x={63 + n * 48} y="148" fontSize="9" textAnchor="middle" fill="#475569">
          {n}. év
        </text>
      </g>
    ))}
    <rect x="40" y="8" width="10" height="8" fill="#7c3aed" />
    <text x="54" y="16" fontSize="9" fill="#0f172a">
      kamatos kamat
    </text>
    <rect x="130" y="8" width="10" height="8" fill="#7dd3fc" />
    <text x="144" y="16" fontSize="9" fill="#0f172a">
      egyszerű kamat
    </text>
    <text x="230" y="40" fontSize="11" textAnchor="end" fill="#be185d" fontWeight="bold">
      különbség = ?
    </text>
  </svg>
);

const PANTS_FIG = (
  <svg viewBox="0 0 240 150" className={QSVG}>
    <rect x="80" y="20" width="80" height="20" fill="#ede9fe" stroke="#7c3aed" />
    <text x="120" y="35" fontSize="11" textAnchor="middle" fill="#4c1d95" fontWeight="bold">
      1000 Ft
    </text>
    <text x="120" y="60" fontSize="11" textAnchor="middle" fill="#be185d">
      hetente ×1,05
    </text>
    <path d="M120 66 L120 92" stroke="#be185d" strokeWidth="2" markerEnd="url(#fcArrow)" />
    <defs>
      <marker id="fcArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill="#be185d" />
      </marker>
    </defs>
    <rect x="70" y="98" width="100" height="22" fill="#fce7f3" stroke="#be185d" />
    <text x="120" y="114" fontSize="11" textAnchor="middle" fill="#9d174d" fontWeight="bold">
      10 hét után: ?
    </text>
    <text x="120" y="140" fontSize="10" textAnchor="middle" fill="#475569">
      Mennyivel nőtt az ár?
    </text>
  </svg>
);

const FINANCIAL_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: szorzók, egyszerű kamatos kamat (1–10)
  {
    id: 'fin-q1',
    level: 1,
    questionTypeBadge: 'Szorzó',
    question: 'Évi 6%-os kamatos kamat esetén minden év végén mivel szorozzuk az év eleji összeget?',
    options: ['1,06', '0,06', '1,6', '6'],
    correctAnswer: 0,
    explanation: 'Az év eleji összeghez hozzáadják a 6%-át: A + 0,06A = 1,06 · A. A szorzó tehát 1 + 6/100 = 1,06.'
  },
  {
    id: 'fin-q2',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Melyik kifejezés adja meg 500 000 Ft értékét 10 év múlva évi 6%-os kamatos kamat mellett?',
    options: ['500 000 · 1,06¹⁰', '500 000 · (1 + 10 · 0,06)', '500 000 · 1,6¹⁰', '500 000 · 10 · 1,06'],
    correctAnswer: 0,
    explanation: 'Minden évben 1,06-dal szorzunk, 10 éven át: 10 darab 1,06-os tényező, azaz 1,06¹⁰. Az 500 000 · (1 + 10 · 0,06) az egyszerű kamat lenne.'
  },
  {
    id: 'fin-q3',
    level: 1,
    questionTypeBadge: 'Kamatos kamat',
    question: '100 000 Ft-ot 1 évre lekötünk évi 5%-os kamatra. Mennyi lesz a pénzünk az év végén?',
    options: ['105 000 Ft', '100 500 Ft', '150 000 Ft', '5000 Ft'],
    correctAnswer: 0,
    explanation: '100 000 · 1,05 = 105 000 Ft. (Az 5000 Ft csak a kamat.)'
  },
  {
    id: 'fin-q4',
    level: 1,
    questionTypeBadge: 'Kamatos kamat',
    question: '200 000 Ft-ot 2 évre kötünk le évi 10%-os kamatos kamatra. Mennyi lesz a pénzünk a futamidő végén?',
    options: ['242 000 Ft', '240 000 Ft', '220 000 Ft', '244 000 Ft'],
    correctAnswer: 0,
    explanation: '200 000 · 1,1² = 200 000 · 1,21 = 242 000 Ft. A 240 000 Ft az egyszerű kamatos eredmény lenne (a második évben a kamat is kamatozik).'
  },
  {
    id: 'fin-q5',
    level: 1,
    questionTypeBadge: 'Értékcsökkenés',
    question: 'Egy autó értéke minden évben az előző évi értékének 20%-ával csökken. Mivel szorozzuk évente az értékét?',
    options: ['0,8', '1,2', '0,2', '−0,2'],
    correctAnswer: 0,
    explanation: 'Ha 20%-kal csökken, akkor 100% − 20% = 80% marad meg: a szorzó 1 − 20/100 = 0,8.'
  },
  {
    id: 'fin-q6',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Az Aₙ = A · (1 + p/100)ⁿ képletben mit jelent az n?',
    options: ['Az évek (kamatozási ciklusok) számát', 'A kamatlábat', 'A kezdő tőkét', 'A kamat összegét forintban'],
    correctAnswer: 0,
    explanation: 'A a tőke, p az évi kamatláb (%), n az évek (ciklusok) száma, Aₙ a felnövekedett összeg.'
  },
  {
    id: 'fin-q7',
    level: 1,
    questionTypeBadge: 'Ismételt emelés',
    question: 'A benzin árát ötször egymás után felemelték úgy, hogy az új ár mindig az előző ár 106%-a lett. Hányszorosára nőtt az ár?',
    options: ['1,06⁵ ≈ 1,338-szorosára', '1,30-szorosára', '5,3-szorosára', '1,6-szorosára'],
    correctAnswer: 0,
    explanation: 'Minden emelés az előző árat szorozza 1,06-dal: 1,06⁵ ≈ 1,338. A növekedés tehát ≈ 33,8%, nem 30%.'
  },
  {
    id: 'fin-q8',
    level: 1,
    questionTypeBadge: 'Kamatos kamat',
    question: 'Egy 1000 Ft-os nadrág árát hetente az előző heti ár 5%-ával növelik. Mennyi az ár 2 hét múlva?',
    options: ['1102,5 Ft', '1100 Ft', '1105 Ft', '1010 Ft'],
    correctAnswer: 0,
    explanation: '1000 · 1,05² = 1000 · 1,1025 = 1102,5 Ft. (Az 1100 Ft csak akkor jönne ki, ha mindig az eredeti 1000 Ft 5%-ával emelnének.)'
  },
  {
    id: 'fin-q9',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent a kamatos kamat?',
    options: [
      'Minden év végén az év eleji (már megnövekedett) összeg után jár kamat',
      'Minden évben csak az eredeti tőke után jár kamat',
      'A kamatot a futamidő végén egy összegben, az eredeti tőke után fizetik',
      'A kamatláb évről évre a duplájára nő'
    ],
    correctAnswer: 0,
    explanation: 'Kamatos kamatnál a kamat is kamatozik: az év végén a növekmény hozzáadódik a tőkéhez, és a következő évben már ez után jár kamat.'
  },
  {
    id: 'fin-q10',
    level: 1,
    questionTypeBadge: 'Duplázódás',
    question: 'Tudjuk, hogy 1,06¹¹ ≈ 1,898 és 1,06¹² ≈ 2,012. Évi 6%-os kamatos kamat mellett legalább hány év alatt duplázódik meg a tőke?',
    figure: <BarsFig start="500 000 Ft" factor="évente ×1,06" bars={[1, 1.06, 1.1236, 1.191, 1.2625, 1.3382, 1.4185, 1.5036, 1.5938, 1.6895, 1.7908, 1.8983, 2.0122]} lastLabel="hány év? ?" target={2} />,
    options: ['12 év', '11 év', '10 év', '17 év'],
    correctAnswer: 0,
    explanation: '11 év után a tőke még csak ≈ 1,898-szoros (kevesebb mint kétszeres), 12 év után már ≈ 2,012-szeres. Tehát legalább 12 év kell.'
  },

  // LEVEL 2: számolás, gyökvonás, kamatadó, értékcsökkenés (11–20)
  {
    id: 'fin-q11',
    level: 2,
    questionTypeBadge: 'Kamatos kamat',
    question: 'Mennyi lesz 500 000 Ft 10 év múlva évi 6%-os kamatos kamattal (egész forintra kerekítve)?',
    options: ['895 424 Ft', '800 000 Ft', '1 000 000 Ft', '530 000 Ft'],
    correctAnswer: 0,
    explanation: '500 000 · 1,06¹⁰ ≈ 500 000 · 1,79085 ≈ 895 424 Ft. Az összeg tehát nem duplázódik meg. (800 000 Ft az egyszerű kamatos érték lenne.)'
  },
  {
    id: 'fin-q12',
    level: 2,
    questionTypeBadge: 'Kamatláb',
    question: 'Legalább mekkora évi kamatláb mellett duplázódik meg a tőke 10 év alatt?',
    options: ['≈ 7,2%', '10%', '20%', '≈ 5%'],
    correctAnswer: 0,
    explanation: 'x¹⁰ = 2 ⇒ x = ¹⁰√2 ≈ 1,0718, tehát p ≈ 7,2%. (10%-kal 10 év alatt ≈ 2,59-szeres lenne, ez több a szükségesnél.)'
  },
  {
    id: 'fin-q13',
    level: 2,
    questionTypeBadge: 'Kamatos kamat',
    question: '600 ezer forintot fektettünk be 3 évre, évi 6,5%-os kamatos kamatra. Három év után kb. mennyivel nőtt a pénzünk?',
    options: ['≈ 124 770 Ft-tal', '117 000 Ft-tal', '39 000 Ft-tal', '≈ 724 770 Ft-tal'],
    correctAnswer: 0,
    explanation: '600 000 · 1,065³ ≈ 724 770 Ft, a növekmény ≈ 124 770 Ft. (117 000 Ft az egyszerű kamat: 3 · 39 000.)'
  },
  {
    id: 'fin-q14',
    level: 2,
    questionTypeBadge: 'Kamatadó',
    question: 'Az előző befektetésnél (600 000 Ft, 3 év, 6,5%) kivételkor a kamat 15%-át kamatadóként kell befizetni. Kb. mennyit kapunk kézhez?',
    options: ['≈ 706 054 Ft', '≈ 616 054 Ft', '≈ 724 770 Ft', '≈ 690 000 Ft'],
    correctAnswer: 0,
    explanation: 'Az adó csak a kamatra vonatkozik: 0,15 · 124 770 ≈ 18 715 Ft. Kézhez: 724 770 − 18 715 ≈ 706 054 Ft. (A 616 054 Ft a teljes összeg 85%-a lenne – ez hiba.)'
  },
  {
    id: 'fin-q15',
    level: 2,
    questionTypeBadge: 'Kamatláb',
    question: 'Hány százalékos kamatos kamat esetén nőne 10 év alatt a tőke a másfélszeresére?',
    options: ['≈ 4,14%', '5%', '15%', '1,5%'],
    correctAnswer: 0,
    explanation: 'x¹⁰ = 1,5 ⇒ x = ¹⁰√1,5 ≈ 1,0414 ⇒ p ≈ 4,14%. Az 5% az 50% : 10 egyszerű osztás lenne, ami kamatos kamatnál túl sok.'
  },
  {
    id: 'fin-q16',
    level: 2,
    questionTypeBadge: 'Kamatláb',
    question: 'Hány százalékos kamatos kamat esetén nőne 10 év alatt a tőke a háromszorosára?',
    options: ['≈ 11,6%', '30%', '20%', '≈ 3%'],
    correctAnswer: 0,
    explanation: 'x¹⁰ = 3 ⇒ x = ¹⁰√3 ≈ 1,1161 ⇒ p ≈ 11,6%. (A 20% a 200% : 10 lenne – kamatos kamatnál ennél jóval kevesebb is elég.)'
  },
  {
    id: 'fin-q17',
    level: 2,
    questionTypeBadge: 'Értékcsökkenés',
    question: 'Egy 3,5 millió forintos új autó értéke minden évben az előző évi értékének 20%-ával csökken. Hány forintot veszít az értékéből 3 év alatt?',
    figure: <BarsFig start="3,5 M Ft" factor="évente ×0,8" bars={[3.5, 2.8, 2.24, 1.792]} lastLabel="3. év: veszteség = ?" />,
    options: ['1 708 000 Ft-ot', '2 100 000 Ft-ot', '1 792 000 Ft-ot', '700 000 Ft-ot'],
    correctAnswer: 0,
    explanation: '3 év után 3 500 000 · 0,8³ = 1 792 000 Ft az érték, a veszteség 3 500 000 − 1 792 000 = 1 708 000 Ft. (A 2 100 000 Ft a 3 · 20% = 60%-os hibás számolás.)'
  },
  {
    id: 'fin-q18',
    level: 2,
    questionTypeBadge: 'Értékcsökkenés',
    question: 'Egy 2,5 millió forintos használt autó értéke minden évben az előző évi értékének 12%-ával csökken. Mennyivel csökken az értéke 3 év alatt?',
    options: ['796 320 Ft-tal', '900 000 Ft-tal', '1 703 680 Ft-tal', '300 000 Ft-tal'],
    correctAnswer: 0,
    explanation: '2 500 000 · 0,88³ = 1 703 680 Ft marad, a csökkenés 2 500 000 − 1 703 680 = 796 320 Ft.'
  },
  {
    id: 'fin-q19',
    level: 2,
    questionTypeBadge: 'Érettségi',
    question: '(Érettségi, 2011) Egy autó ára újonnan 2 152 000 Ft, öt év múlva 900 000 Ft. Értéke minden évben az előző évi értékének ugyanannyi százalékával csökkent. Hány százalék ez?',
    options: ['16%', '≈ 11,6%', '≈ 58,2%', '≈ 8,4%'],
    correctAnswer: 0,
    explanation: '2 152 000 · x⁵ = 900 000 ⇒ x = ⁵√(900 000/2 152 000) ≈ 0,84, tehát évente 16%-kal csökken. (11,6% a teljes 58,2%-os csökkenés ötöde – ez hibás.)'
  },
  {
    id: 'fin-q20',
    level: 2,
    questionTypeBadge: 'Befektetés',
    question: 'Befektettünk 1,5 millió forintot, és minden évben 18%-os gyarapodást érünk el az előző évi állományhoz képest. Kb. mennyire nő a tőkénk 5 év alatt?',
    options: ['≈ 3 431 637 Ft-ra', '2 850 000 Ft-ra', '1 770 000 Ft-ra', '≈ 3 186 000 Ft-ra'],
    correctAnswer: 0,
    explanation: '1 500 000 · 1,18⁵ ≈ 1 500 000 · 2,2878 ≈ 3 431 637 Ft. (2 850 000 Ft az egyszerű kamat lenne: 1,5 M · 1,9.)'
  },

  // LEVEL 3: próbálgatás, összetett feladatok (21–30)
  {
    id: 'fin-q21',
    level: 3,
    questionTypeBadge: 'Kamatláb',
    question: 'Legalább hány százalékos éves gyarapodás garantálja, hogy 5 év alatt megduplázódjon a tőke?',
    options: ['≈ 14,87%', '20%', '40%', '≈ 10%'],
    correctAnswer: 0,
    explanation: 'x⁵ = 2 ⇒ x = ⁵√2 ≈ 1,1487 ⇒ p ≈ 14,87%. (A 20% a 100% : 5 egyszerű osztás – kamatos kamatnál kevesebb is elég.)'
  },
  {
    id: 'fin-q22',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    question: 'Évi 18%-os gyarapodás mellett legalább hány év kell ahhoz, hogy a tőke megháromszorozódjon?',
    options: ['7 év', '6 év', '11 év', '17 év'],
    correctAnswer: 0,
    explanation: '1,18⁶ ≈ 2,70 < 3, de 1,18⁷ ≈ 3,19 ≥ 3, tehát 7 év kell.'
  },
  {
    id: 'fin-q23',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    question: 'Hány év alatt nőne kétszeresére a pénzünk évi 7,5%-os kamatláb esetén (egész évekkel számolva)?',
    options: ['10 év', '9 év', '13 év', '27 év'],
    correctAnswer: 0,
    explanation: '1,075⁹ ≈ 1,917 < 2, 1,075¹⁰ ≈ 2,061 ≥ 2, tehát 10 év alatt. (13 év a 100% : 7,5% egyszerű kamatos becslés.)'
  },
  {
    id: 'fin-q24',
    level: 3,
    questionTypeBadge: 'Kamatadó',
    question: 'Évi 7,5%-os kamat mellett a pénz kivételekor a kamat 16%-át adóként kell fizetni. Legalább hány év után duplázódna meg a kézhez kapott összeg?',
    options: ['11 év', '10 év', '12 év', '16 év'],
    correctAnswer: 0,
    explanation: 'Kézhez: A · (1 + 0,84 · (1,075ⁿ − 1)) ≥ 2A ⇒ 1,075ⁿ ≥ 1 + 1/0,84 ≈ 2,190. 1,075¹⁰ ≈ 2,061 kevés, 1,075¹¹ ≈ 2,216 elég ⇒ 11 év.'
  },
  {
    id: 'fin-q25',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Egy 4 éves autó ma 2,5 millió Ft. Értéke 3 éves koráig évente 20%-kal, utána évente 12%-kal csökkent. Kb. mennyi volt új korában?',
    options: ['≈ 5,55 millió Ft', '≈ 4,88 millió Ft', '≈ 6,10 millió Ft', '≈ 4,17 millió Ft'],
    correctAnswer: 0,
    explanation: 'X · 0,8³ · 0,88 = 2 500 000 ⇒ X = 2 500 000 / 0,45056 ≈ 5 548 651 Ft. (4,88 M: a 4. év 12%-a kimaradt; 6,10 M: mind a 4 évben 20%-kal számolt.)'
  },
  {
    id: 'fin-q26',
    level: 3,
    questionTypeBadge: 'Kamatos kamat',
    question: 'Az 1000 Ft-os nadrág árát hetente az előző heti ár 5%-ával növelik. Kb. mennyivel nőtt az ár 10 hét alatt?',
    figure: PANTS_FIG,
    options: ['≈ 629 Ft-tal', '500 Ft-tal', '≈ 1629 Ft-tal', '1050 Ft-tal'],
    correctAnswer: 0,
    explanation: '1000 · 1,05¹⁰ ≈ 1628,9 Ft, tehát ≈ 629 Ft-tal nőtt (a tankönyv ≈ 630 Ft-ot ír). 500 Ft az egyszerű 10 · 50 Ft; 1629 Ft maga az új ár.'
  },
  {
    id: 'fin-q27',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    question: 'Ha a nadrág ára hetente 5%-kal nő, legalább hány hét után lesz az ár az eredeti tízszerese? (1,05⁴⁷ ≈ 9,91; 1,05⁴⁸ ≈ 10,40)',
    options: ['48 hét', '47 hét', '180 hét', '200 hét'],
    correctAnswer: 0,
    explanation: '1,05⁴⁷ ≈ 9,91 még kevesebb mint 10, 1,05⁴⁸ ≈ 10,40 már több – tehát 48 hét. (180 hét az egyszerű növekedés: 900% : 5%.)'
  },
  {
    id: 'fin-q28',
    level: 3,
    questionTypeBadge: 'Egyszerű vs. kamatos',
    question: '100 000 Ft-ot 3 évre teszünk be évi 10%-ra. Mennyivel kapunk többet kamatos kamattal, mint egyszerű kamattal?',
    figure: SIMPLE_VS_COMPOUND_FIG,
    options: ['3100 Ft-tal', '0 Ft-tal', '1000 Ft-tal', '33 100 Ft-tal'],
    correctAnswer: 0,
    explanation: 'Kamatos: 100 000 · 1,1³ = 133 100 Ft; egyszerű: 100 000 · (1 + 3 · 0,1) = 130 000 Ft. A különbség 3100 Ft.'
  },
  {
    id: 'fin-q29',
    level: 3,
    questionTypeBadge: 'Kamatláb',
    question: 'Évente hány százalékkal kell nőnie a tőkének, hogy 20 év alatt a négyszeresére nőjön?',
    options: ['≈ 7,2%', '≈ 14,4%', '20%', '15%'],
    correctAnswer: 0,
    explanation: 'x²⁰ = 4 ⇒ x = ²⁰√4 = ¹⁰√2 ≈ 1,0718 ⇒ ≈ 7,2%. Ugyanaz, mint a 10 év alatti duplázódás: ha 10 év alatt kétszeres, akkor 20 év alatt 2 · 2 = 4-szeres.'
  },
  {
    id: 'fin-q30',
    level: 3,
    questionTypeBadge: 'Értékcsökkenés',
    question: 'Az érettségi feladat autója (2 152 000 Ft → 900 000 Ft, 5 év) összesen kb. hány százalékot veszített az értékéből?',
    options: ['≈ 58,2%-ot', '80%-ot (5 · 16%)', '≈ 41,8%-ot', '16%-ot'],
    correctAnswer: 0,
    explanation: '900 000 / 2 152 000 ≈ 0,418, tehát az eredeti érték ≈ 41,8%-a maradt meg, a veszteség ≈ 58,2%. A százalékok nem adódnak össze: 0,84⁵ ≈ 0,418, nem 1 − 0,8.'
  }
];

export const FinancialCalcQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-penzugyek-quiz"
      subtopicId="penzugyi-szamitasok"
      title="6. Pénzügyi számítások – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kamatos kamat, szükséges kamatláb gyökvonással, futamidő próbálgatással, kamatadó és értékcsökkenés."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={FINANCIAL_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kamatos kamat',
          items: ['Aₙ = A · (1 + p/100)ⁿ', 'p% növekedés: szorzó 1 + p/100', 'p% csökkenés: szorzó 1 − p/100', '500 000 · 1,06¹⁰ ≈ 895 424 Ft']
        },
        {
          title: 'Hiányzó adat',
          items: ['Aₙ keresése: hatványozás', 'p keresése: 1 + p/100 = ⁿ√(Aₙ/A)', 'n keresése: próbálgatás (1,06¹¹ ≈ 1,898; 1,06¹² ≈ 2,012)', '10 év alatti duplázódás: ¹⁰√2 ≈ 1,072 ⇒ ≈ 7,2%']
        },
        {
          title: 'Csapdák',
          items: ['A százalékok nem adódnak össze: 1,06⁵ ≈ 1,338', 'Kamatadó csak a kamatra (növekményre)', '+25%, majd −20%: 1,25 · 0,8 = 1', 'Egyszerű kamat: A · (1 + n · p/100)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FinancialCalcMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FinancialCalcSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FinancialCalcQuiz;
