import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatMeasuresMatcher } from './StatMeasuresMatcher';
import { StatMeasuresSorter } from './StatMeasuresSorter';
import { SFig, SBarChart, STable, SText, S_PURPLE, S_BLUE, S_RED, S_AXIS } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_HEIGHTS = (
  <SFig w={260} h={150} className="w-full max-w-[300px] h-auto mx-auto" title="Testmagasság (cm) – gyakoriság">
    <SBarChart
      x0={30}
      y0={128}
      w={220}
      h={90}
      yMax={5}
      ticks={[0, 1, 2, 3, 4, 5]}
      showValues
      color={S_PURPLE}
      tickFmt={(v) => String(v)}
      data={[
        { label: '168', value: 2 },
        { label: '170', value: 3 },
        { label: '171', value: 4 },
        { label: '172', value: 3 },
        { label: '175', value: 3 }
      ]}
    />
  </SFig>
);

const returnsFig = (vals: number[], title: string) => {
  const y0 = 92;
  const k = 3.4;
  return (
    <SFig w={240} h={140} className="w-full max-w-[280px] h-auto mx-auto" title={title}>
      {[-10, 0, 10, 20].map((t) => (
        <g key={t}>
          <line x1={34} y1={y0 - t * k} x2={226} y2={y0 - t * k} stroke="#e2e8f0" />
          <SText x={30} y={y0 - t * k + 3} t={`${t}%`} s={7} a="end" c={S_AXIS} />
        </g>
      ))}
      {vals.map((v, i) => {
        const x = 46 + i * (176 / vals.length);
        return (
          <g key={i}>
            <rect x={x} y={Math.min(y0, y0 - v * k)} width={22} height={Math.abs(v * k)} fill={S_BLUE} opacity={0.85} />
            <SText x={x + 11} y={v >= 0 ? y0 - v * k - 3 : y0 - v * k + 9} t={`${v}%`} s={7.5} />
          </g>
        );
      })}
      <line x1={34} y1={y0} x2={226} y2={y0} stroke={S_AXIS} strokeWidth={1.2} />
    </SFig>
  );
};

const FIG_DEV = (
  <SFig w={240} h={92} className="w-full max-w-[290px] h-auto mx-auto">
    <STable
      x={8}
      y={10}
      colW={[64, 40, 40, 40, 40]}
      rowH={18}
      s={8}
      rows={[
        ['xᵢ', 10, -4, 12, 2],
        ['xᵢ − x̄', 5, -9, 7, -3],
        ['(xᵢ − x̄)²', 25, 81, 49, 9]
      ]}
    />
    <SText x={120} y={82} t="σ = ?" s={9} c={S_RED} b />
  </SFig>
);

const FIG_PRICES = (
  <SFig w={260} h={66} className="w-full max-w-[300px] h-auto mx-auto">
    <STable
      x={8}
      y={10}
      colW={[60, 38, 38, 38, 38, 38]}
      rowH={20}
      s={8}
      rows={[
        ['év', 2015, 2016, 2017, 2018, 2019],
        ['árfolyam', 6150, 7380, 7011, 8063, 8789]
      ]}
    />
  </SFig>
);

const STAT_MEASURES_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'sme-q1',
    questionTypeBadge: 'Átlag',
    level: 1,
    question: 'Egy részvény hozama négy egymás utáni évben 6%, 11%, −2% és 5% volt. Mennyi az átlagos hozam?',
    options: ['5%', '6%', '5,5%', '4,5%'],
    correctAnswer: 0,
    explanation: '(6 + 11 − 2 + 5) / 4 = 20 / 4 = 5%.'
  },
  {
    id: 'sme-q2',
    questionTypeBadge: 'Medián',
    level: 1,
    question: 'Mennyi a 3; 8; 5; 1; 9 adatsor mediánja?',
    options: ['5', '8', '5,2', '4'],
    correctAnswer: 0,
    explanation: 'Rendezve: 1; 3; 5; 8; 9 – a középső (3.) adat az 5. (5,2 az átlag.)'
  },
  {
    id: 'sme-q3',
    questionTypeBadge: 'Módusz',
    level: 1,
    question: 'Mennyi a 2; 3; 3; 5; 7; 3; 5 adatsor módusza?',
    options: ['3', '5', '4', '7'],
    correctAnswer: 0,
    explanation: 'A 3 háromszor szerepel, ez a leggyakoribb adat.'
  },
  {
    id: 'sme-q4',
    questionTypeBadge: 'Terjedelem',
    level: 1,
    question: 'Mennyi a 12; 7; 19; 4; 10 adatsor terjedelme?',
    options: ['15', '19', '10,4', '12'],
    correctAnswer: 0,
    explanation: 'Terjedelem = legnagyobb − legkisebb = 19 − 4 = 15.'
  },
  {
    id: 'sme-q5',
    questionTypeBadge: 'Szórás lépései',
    level: 1,
    question: 'Mi a szórás kiszámításának helyes sorrendje?',
    options: [
      'átlag → eltérések négyzete → ezek átlaga (σ²) → gyökvonás',
      'gyökvonás → átlag → eltérések négyzete → összeadás',
      'eltérések összege → osztás n-nel → négyzetre emelés',
      'átlag → eltérések átlaga → négyzetre emelés'
    ],
    correctAnswer: 0,
    explanation: 'Előbb az átlag, majd az eltérések négyzete, ezek átlaga a szórásnégyzet, végül gyököt vonunk.'
  },
  {
    id: 'sme-q6',
    questionTypeBadge: 'Szórásnégyzet',
    level: 1,
    question: 'Egy adatsor szórásnégyzete 16. Mennyi a szórása?',
    options: ['4', '16', '256', '8'],
    correctAnswer: 0,
    explanation: 'σ = √σ² = √16 = 4.'
  },
  {
    id: 'sme-q7',
    questionTypeBadge: 'Szórás',
    level: 1,
    question: 'Mennyi a 4; 4; 4; 4 adatsor szórása?',
    options: ['0', '4', '1', '16'],
    correctAnswer: 0,
    explanation: 'Minden adat egyenlő az átlaggal, így minden eltérés 0, a szórás is 0.'
  },
  {
    id: 'sme-q8',
    questionTypeBadge: 'Hozam',
    level: 1,
    question: 'Egy részvény árfolyama egy év alatt 2600 Ft-ról 2756 Ft-ra nőtt. Mennyi volt a hozama?',
    options: ['6%', '156%', '5,7%', '1,06%'],
    correctAnswer: 0,
    explanation: '2756 / 2600 = 1,06, tehát az árfolyam 6%-kal nőtt: a hozam 6%.'
  },
  {
    id: 'sme-q9',
    questionTypeBadge: 'Átlag',
    level: 1,
    question: 'Egy részvény hozama három egymás utáni évben 6%, 4%, 5%. Mennyi az átlagos hozam?',
    options: ['5%', '15%', '4%', '6%'],
    correctAnswer: 0,
    explanation: '(6 + 4 + 5) / 3 = 15 / 3 = 5%.'
  },
  {
    id: 'sme-q10',
    questionTypeBadge: 'Kockázat',
    level: 1,
    question: 'Két részvény átlagos hozama egyaránt 5%, a hozamok szórása 4,64%, illetve 6,40%. Melyik a kockázatosabb?',
    options: ['a 6,40% szórású', 'a 4,64% szórású', 'egyformán kockázatosak', 'a szórásból nem dönthető el'],
    correctAnswer: 0,
    explanation: 'Azonos átlagos hozam esetén a nagyobb szórású (változékonyabb hozamú) részvény a kockázatosabb.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'sme-q11',
    questionTypeBadge: 'Szórás',
    level: 2,
    question: 'Mennyi a 2; 4; 6; 8 adatsor szórása (két tizedesre)?',
    options: ['≈ 2,24', '5', '≈ 2,58', '2'],
    correctAnswer: 0,
    explanation: 'x̄ = 5, eltérésnégyzetek: 9; 1; 1; 9, átlaguk 20 / 4 = 5, így σ = √5 ≈ 2,24. (5 a szórásnégyzet.)'
  },
  {
    id: 'sme-q12',
    questionTypeBadge: 'Szórás',
    figure: returnsFig([6, 11, -2, 5], 'Az A részvény hozamai'),
    level: 2,
    question: 'Az ábra az A részvény négy éves hozamát mutatja (átlaguk 5%). Mennyi a hozamok szórása?',
    options: ['≈ 4,64%', '21,5%', '≈ 3,5%', '13%'],
    correctAnswer: 0,
    explanation: 'Eltérésnégyzetek: 1; 36; 49; 0, összegük 86. σ² = 86 / 4 = 21,5, σ = √21,5 ≈ 4,64%.'
  },
  {
    id: 'sme-q13',
    questionTypeBadge: 'Szórás',
    figure: FIG_DEV,
    level: 2,
    question: 'A táblázat a B részvény hozamaihoz készült (x̄ = 5). Mennyi a hozamok szórása?',
    options: ['≈ 6,40%', '41%', '6%', '≈ 7,4%'],
    correctAnswer: 0,
    explanation: '(25 + 81 + 49 + 9) / 4 = 164 / 4 = 41 = σ², tehát σ = √41 ≈ 6,40%.'
  },
  {
    id: 'sme-q14',
    questionTypeBadge: 'Hozam',
    figure: FIG_PRICES,
    level: 2,
    question: 'Mennyi volt a részvény hozama 2017-ben (az előző évhez viszonyítva)?',
    options: ['−5%', '5%', '−369%', '−4,7%'],
    correctAnswer: 0,
    explanation: '7011 / 7380 = 0,95, az árfolyam 5%-kal csökkent: a hozam −5%.'
  },
  {
    id: 'sme-q15',
    questionTypeBadge: 'Szórás',
    figure: returnsFig([15, 12, 3, 8], 'Hozamok négy évben'),
    level: 2,
    question: 'Egy részvény hozama négy évben 15%, 12%, 3% és 8% volt (átlaguk 9,5%). Mennyi a hozamok szórása?',
    options: ['4,5%', '20,25%', '12%', '≈ 5,2%'],
    correctAnswer: 0,
    explanation: 'Eltérések: 5,5; 2,5; −6,5; −1,5; négyzetösszeg 81. σ = √(81 / 4) = √20,25 = 4,5%.'
  },
  {
    id: 'sme-q16',
    questionTypeBadge: 'Súlyozott átlag',
    figure: FIG_HEIGHTS,
    level: 2,
    question: 'Az ábra egy röplabdacsapat játékosainak testmagasságát mutatja. Mennyi az átlagos testmagasság?',
    options: ['171,4 cm', '171,2 cm', '171 cm', '172 cm'],
    correctAnswer: 0,
    explanation: '(2 · 168 + 3 · 170 + 4 · 171 + 3 · 172 + 3 · 175) / 15 = 2571 / 15 = 171,4 cm. (171,2 cm a súlyozás nélküli átlag.)'
  },
  {
    id: 'sme-q17',
    questionTypeBadge: 'Medián',
    figure: FIG_HEIGHTS,
    level: 2,
    question: 'Mennyi a testmagasságok mediánja?',
    options: ['171 cm', '172 cm', '171,5 cm', '170 cm'],
    correctAnswer: 0,
    explanation: '15 adat van, a medián a 8. adat. Az első 5 adat 168–170 cm, a 6–9. adat 171 cm, így a medián 171 cm.'
  },
  {
    id: 'sme-q18',
    questionTypeBadge: 'Módusz',
    figure: FIG_HEIGHTS,
    level: 2,
    question: 'Mennyi a testmagasságok módusza?',
    options: ['171 cm', '4', '175 cm', 'nincs módusz'],
    correctAnswer: 0,
    explanation: 'A 171 cm-es magasság fordul elő a legtöbbször (4-szer). A 4 a gyakoriság, nem az adat.'
  },
  {
    id: 'sme-q19',
    questionTypeBadge: 'Relatív szórás',
    level: 2,
    question: 'Egy részvény átlagos hozama 8%, a hozam szórása 2%. Mennyi a relatív szórás?',
    options: ['0,25', '4', '16%', '6%'],
    correctAnswer: 0,
    explanation: 'Relatív szórás = σ / x̄ = 2 / 8 = 0,25.'
  },
  {
    id: 'sme-q20',
    questionTypeBadge: 'Szórás',
    level: 2,
    question: 'Mennyi az 1; 2; 3; 4; 5 adatsor szórása (két tizedesre)?',
    options: ['≈ 1,41', '2', '≈ 1,58', '3'],
    correctAnswer: 0,
    explanation: 'x̄ = 3, eltérésnégyzetek: 4; 1; 0; 1; 4, átlaguk 10 / 5 = 2, σ = √2 ≈ 1,41.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'sme-q21',
    questionTypeBadge: 'Hozam és átlag',
    figure: FIG_PRICES,
    level: 3,
    question: 'A táblázat egy részvény éves záró árfolyamát mutatja. Mennyi a 2016–2019 közötti négy éves hozam átlaga (egészre kerekített hozamokkal)?',
    options: ['9,75%', '9%', '13,25%', '7,8%'],
    correctAnswer: 0,
    explanation: 'Hozamok: 20%, −5%, ≈ 15%, ≈ 9%. Átlaguk (20 − 5 + 15 + 9) / 4 = 39 / 4 = 9,75%.'
  },
  {
    id: 'sme-q22',
    questionTypeBadge: 'Szórás',
    figure: returnsFig([20, -5, 15, 9], 'Hozamok 2016–2019'),
    level: 3,
    question: 'A hozamok 20%, −5%, 15% és 9%, átlaguk 9,75%. Mennyi a hozamok szórása (egy tizedesre)?',
    options: ['≈ 9,4%', '≈ 87,7%', '≈ 7,8%', '≈ 12,5%'],
    correctAnswer: 0,
    explanation: 'Eltérésnégyzetek: 105,06; 217,56; 27,56; 0,56, átlaguk ≈ 87,69 = σ². σ ≈ 9,36 ≈ 9,4%.'
  },
  {
    id: 'sme-q23',
    questionTypeBadge: 'Szórás tulajdonságai',
    level: 3,
    question: 'Egy adatsor minden eleméhez hozzáadunk 10-et. Hogyan változik a szórás?',
    options: ['nem változik', '10-zel nő', '100-zal nő', '10-szeresére nő'],
    correctAnswer: 0,
    explanation: 'Az átlag is 10-zel nő, így az átlagtól való eltérések – és a szórás – változatlanok. Pl. 12; 14; 16 szórása ugyanannyi, mint 2; 4; 6-é.'
  },
  {
    id: 'sme-q24',
    questionTypeBadge: 'Szórás tulajdonságai',
    level: 3,
    question: 'Egy adatsor minden elemét megkétszerezzük. Hogyan változik a szórás?',
    options: ['kétszeresére nő', 'négyszeresére nő', 'nem változik', '√2-szeresére nő'],
    correctAnswer: 0,
    explanation: 'Minden eltérés kétszeres lesz, a szórásnégyzet négyszeres, így a szórás kétszeres. (Pl. 1; …; 5 szórása √2, a 2; 4; …; 10-é 2√2.)'
  },
  {
    id: 'sme-q25',
    questionTypeBadge: 'Súlyozott átlag',
    level: 3,
    question: 'Egy 30 fős osztályban a 12 lány matematikajegyeinek átlaga 4,5, az egész osztályé 4,1. Mennyi a fiúk átlaga (két tizedesre)?',
    options: ['≈ 3,83', '3,7', '4,3', '≈ 3,9'],
    correctAnswer: 0,
    explanation: 'Az osztály jegyeinek összege 30 · 4,1 = 123, a lányoké 12 · 4,5 = 54. A 18 fiúé 69, átlaguk 69 / 18 ≈ 3,83.'
  },
  {
    id: 'sme-q26',
    questionTypeBadge: 'Relatív szórás',
    level: 3,
    question: 'A C részvény átlagos hozama 10%, szórása 5%; a D részvényé 4%, szórása 3%. A relatív szórás alapján melyik a kockázatosabb?',
    options: ['a D (0,75 > 0,5)', 'a C (5% > 3%)', 'egyformán kockázatosak', 'a C (0,5 > 0,75)'],
    correctAnswer: 0,
    explanation: 'Eltérő átlagnál a relatív szórást hasonlítjuk: C: 5 / 10 = 0,5; D: 3 / 4 = 0,75. A D a kockázatosabb.'
  },
  {
    id: 'sme-q27',
    questionTypeBadge: 'Átlag',
    level: 3,
    question: 'Négy éves hozam átlaga 5%. Az első három év hozama 6%, 11% és −2%. Mennyi volt a negyedik évi hozam?',
    options: ['5%', '−5%', '15%', '3%'],
    correctAnswer: 0,
    explanation: 'Az összeg 4 · 5 = 20, így a negyedik hozam 20 − (6 + 11 − 2) = 5%.'
  },
  {
    id: 'sme-q28',
    questionTypeBadge: 'Szórás',
    figure: FIG_HEIGHTS,
    level: 3,
    question: 'A röplabdacsapat átlagos testmagassága 171,4 cm. Mennyi a testmagasságok szórása (két tizedesre)?',
    options: ['≈ 2,15 cm', '≈ 4,64 cm', '≈ 2,47 cm', '≈ 1,86 cm'],
    correctAnswer: 0,
    explanation: '(2 · 3,4² + 3 · 1,4² + 4 · 0,4² + 3 · 0,6² + 3 · 3,6²) / 15 = 69,6 / 15 = 4,64 = σ², így σ ≈ 2,15 cm.'
  },
  {
    id: 'sme-q29',
    questionTypeBadge: 'Szórásnégyzet',
    level: 3,
    question: 'Öt adat átlaga 10, szórásnégyzete 4. Mennyi az adatok négyzeteinek összege?',
    options: ['520', '500', '504', '120'],
    correctAnswer: 0,
    explanation: 'σ² = (x₁² + … + x₅²) / 5 − x̄², így x₁² + … + x₅² = 5 · (4 + 100) = 520.'
  },
  {
    id: 'sme-q30',
    questionTypeBadge: 'Szórás tulajdonságai',
    level: 3,
    question: 'A 2; 4; 6; 8 adatsor szórása √5 ≈ 2,24. Mennyi lesz a szórás, ha az adatsort kiegészítjük az 5-tel (az átlaggal)?',
    options: ['2', '≈ 2,24', '≈ 2,5', '≈ 1,8'],
    correctAnswer: 0,
    explanation: 'Az átlag 5 marad, az eltérésnégyzetek összege 20 marad, de már 5 adat van: σ² = 20 / 5 = 4, σ = 2. Az átlaggal egyenlő adat csökkenti a szórást.'
  }
];

export const StatMeasuresQuiz: React.FC<{
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
      topicId="g12-stat-jellemzok-quiz"
      subtopicId="statisztikai-jellemzok"
      title="2. Statisztikai jellemzők – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: átlag, medián, módusz, terjedelem, szórás, hozam és kockázat."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={STAT_MEASURES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Középértékek',
          items: [
            'Átlag: x̄ = (x₁ + … + xₙ) / n; gyakorisági táblázatból súlyozott átlag.',
            'Medián: a rendezett adatsor középső eleme (páros n: a két középső átlaga).',
            'Módusz: a leggyakoribb adat.',
            'Terjedelem: legnagyobb − legkisebb adat.'
          ]
        },
        {
          title: 'Szórás',
          items: [
            '1. x̄ 2. (xᵢ − x̄)² 3. ezek átlaga: σ² 4. σ = √σ²',
            'Minden adathoz c-t adva σ nem változik; c-szeresre véve |c|-szeresére nő.',
            'σ = 0 ⇔ minden adat egyenlő.',
            'σ² = (x₁² + … + xₙ²) / n − x̄²'
          ]
        },
        {
          title: 'Hozam és kockázat',
          items: [
            'Hozam: hány %-kal nőtt / csökkent az árfolyam az előző évhez képest.',
            'Azonos átlagos hozamnál a nagyobb szórású a kockázatosabb.',
            'Eltérő átlagnál: relatív szórás = σ / x̄.',
            'A: x̄ = 5%, σ ≈ 4,64%; B: x̄ = 5%, σ ≈ 6,40%.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatMeasuresMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatMeasuresSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatMeasuresQuiz;
