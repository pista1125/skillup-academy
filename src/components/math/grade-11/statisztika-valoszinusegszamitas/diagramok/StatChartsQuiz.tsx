import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatChartsMatcher } from './StatChartsMatcher';
import { StatChartsSorter } from './StatChartsSorter';
import { PieChart, StackedBar, LineChart, PyramidShape, PYRAMID_1950, PYRAMID_1990, PYRAMID_2020, CAT_COLORS } from './StatChartsFigures';
import { MiniBarChart } from '../adatrendezes-statisztikai-jellemzok/DataStatisticsFigures';

const ORCH_BAR = <MiniBarChart labels={['vonós', 'fúvós', 'ütős', 'egyéb']} values={[20, 16, 7, 2]} yTitle="fő" />;
const THEATER = (
  <StackedBar
    rows={[
      { label: '40 év alatt (120)', values: [52.5, 35, 12.5] },
      { label: 'legalább 40 (80)', values: [18.75, 37.5, 43.75] }
    ]}
    legend={['5-nél kevesebbszer', '5–10 alkalommal', '10-nél többször']}
  />
);
const DICE = <MiniBarChart labels={['3', '4', '5', '6', '7', '8', '9', '10', '11']} values={[1, 2, 2, 3, 5, 3, 2, 1, 1]} xTitle="a két kocka összege (20 dobás)" yTitle="gyakoriság" />;
const INTERNET = <PieChart values={[24, 120, 132, 84]} labels={['0–1 óra: 24°', '1–2 óra: 120°', '2–3 óra: 132°', '3 óra felett: 84°']} showPercent={false} />;

/** HF 1. sávdiagram: halmozott százalékok, a sávokon a jegyek. */
const GradesBand: React.FC<{ hide?: number }> = ({ hide }) => {
  const cum = [0, 3.1, 15.6, 57.8, 87.5, 100];
  return (
    <svg viewBox="0 0 260 90" className="w-full max-w-[300px] h-auto mx-auto">
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 10 + cum[i] * 2.4;
        const w = (cum[i + 1] - cum[i]) * 2.4;
        return (
          <g key={i}>
            <rect x={x + 1} y="22" width={Math.max(1, w - 2)} height="28" rx="3" fill={CAT_COLORS[i]} />
            <text x={x + w / 2} y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0f172a">
              {i + 1}
            </text>
          </g>
        );
      })}
      {cum.map((c, i) => (
        <text key={i} x={10 + c * 2.4} y={i % 2 ? 76 : 64} fontSize="8" textAnchor="middle" fill="#475569">
          {hide === i ? '?' : `${String(c).replace('.', ',')}%`}
        </text>
      ))}
      <text x="130" y="88" fontSize="8" textAnchor="middle" fill="#64748b">320 tanuló matematikajegye (halmozott %)</text>
    </svg>
  );
};

/** Félrevezető oszlopdiagram: a tengely 90-nél kezdődik. */
const TruncatedBars: React.FC = () => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto">
    {[90, 92, 94, 96, 98, 100].map((t) => {
      const y = 130 - (t - 90) * 11;
      return (
        <g key={t}>
          <line x1="40" y1={y} x2="220" y2={y} stroke="#e2e8f0" />
          <text x="34" y={y + 3} fontSize="8" textAnchor="end" fill="#64748b">
            {t}
          </text>
        </g>
      );
    })}
    <rect x="70" y={130 - 5 * 11} width="40" height={5 * 11} rx="3" fill={CAT_COLORS[0]} />
    <rect x="150" y={130 - 10 * 11} width="40" height={10 * 11} rx="3" fill={CAT_COLORS[1]} />
    <text x="90" y="143" fontSize="10" textAnchor="middle" fill="#0f172a">A</text>
    <text x="170" y="143" fontSize="10" textAnchor="middle" fill="#0f172a">B</text>
  </svg>
);

const PYRAMIDS = (
  <svg viewBox="0 0 380 160" className="w-full max-w-[320px] h-auto mx-auto">
    <PyramidShape widths={PYRAMID_2020} label="A" x0={0} />
    <PyramidShape widths={PYRAMID_1950} label="B" x0={128} />
    <PyramidShape widths={PYRAMID_1990} label="C" x0={256} />
  </svg>
);

type Lvl = 1 | 2 | 3;
const q = (id: number, level: Lvl, badge: string, question: string, options: string[], explanation: string, figure?: React.ReactNode): QuizQuestion => ({
  id: `sc-q${id}`,
  level,
  questionTypeBadge: badge,
  question,
  ...(figure ? { figure } : {}),
  options,
  correctAnswer: 0,
  explanation
});

const STAT_CHARTS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  q(1, 1, 'Oszlopdiagram', 'Az oszlopdiagram egy 45 fős szimfonikus zenekar összetételét mutatja. A zenészek hány százaléka vonós (egy tizedesre)?', ['44,4%', '20%', '40%', '55,6%'], '20 : 45 ≈ 0,444 = 44,4%. (A 20 a vonósok száma, nem a százalékuk.)', ORCH_BAR),
  q(2, 1, 'Kördiagram', 'Mekkora középponti szög tartozik a vonósokhoz, ha a zenekar (20 vonós a 45 zenészből) összetételét kördiagramon ábrázoljuk?', ['160°', '20°', '144°', '128°'], '360° : 45 = 8° jut egy zenészre, 20 · 8° = 160°. (128° a 16 fúvósé.)', ORCH_BAR),
  q(3, 1, 'Diagramtípus', 'Melyik diagram mutatja a legszemléletesebben, hogy egy egész milyen részekből áll (megoszlás)?', ['a kördiagram', 'a vonaldiagram', 'a pontdiagram', 'egyik sem'], 'A kördiagram szeleteinek középponti szöge arányos a részek gyakoriságával, a teljes kör az egész (100%). Hasonló célra jó a sávdiagram is.'),
  q(4, 1, 'Diagramtípus', 'Milyen diagram látható az ábrán?', ['vonaldiagram', 'oszlopdiagram', 'kördiagram', 'sávdiagram'], 'Az egymás utáni értékeket összekötő törött vonal a vonaldiagram – változás követésére (pl. időben) használjuk.', <LineChart labels={['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']} values={[12, 15, 9, 14, 18, 16, 11]} yMax={20} yTitle="°C" />),
  q(5, 1, 'Diagramtípus', 'Milyen diagram látható az ábrán?', ['sávdiagram', 'oszlopdiagram', 'vonaldiagram', 'kördiagram'], 'Egy téglalapot a részek arányában osztunk fel: ez a (megoszlási) sávdiagram.', THEATER),
  q(6, 1, 'Kördiagram', 'Egy kördiagram egyik szelete 90°-os. Az egész hány százalékát ábrázolja?', ['25%', '90%', '9%', '50%'], '90° : 360° = 1/4 = 25%.'),
  q(7, 1, 'Kördiagram', 'Egy 30 fős osztály internetezési szokásait mutatja a kördiagram. Hány diák tartozik a 120°-os szelethez?', ['10', '12', '120', '4'], '360° = 30 diák, így 1 diák = 12°; 120° : 12° = 10 diák.', INTERNET),
  q(8, 1, 'Módusz', 'Két dobókockával 20-szor dobtunk, az oszlopdiagram a dobott összegek gyakoriságát mutatja. Mennyi az összegek módusza?', ['7', '5', '11', '6'], 'A legmagasabb oszlop a 7-es összeghez tartozik (5-ször). Az 5 a gyakoriság, nem az adat.', DICE),
  q(9, 1, 'Súlyozott átlag', 'Hogyan számoljuk ki az átlagot gyakorisági táblázatból?', ['az értékeket szorozzuk a gyakoriságukkal, összeadjuk, és osztjuk a gyakoriságok összegével', 'a különböző értékeket összeadjuk, és osztjuk a számukkal', 'a gyakoriságokat összeadjuk, és osztjuk az értékek számával', 'a legnagyobb és legkisebb érték átlagát vesszük'], 'Ez a súlyozott átlag: Σ (érték · gyakoriság) : Σ gyakoriság.'),
  q(10, 1, 'Vonaldiagram', 'A vonaldiagram egy hét napi középhőmérsékletét mutatja. Melyik napon volt a legmelegebb?', ['pénteken', 'kedden', 'szombaton', 'csütörtökön'], 'A legmagasabb pont a P (péntek) felett van: 18 °C.', <LineChart labels={['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']} values={[12, 15, 9, 14, 18, 16, 11]} yMax={20} yTitle="°C" />),

  // LEVEL 2
  q(11, 2, 'Medián', 'Az oszlopdiagram 20 kockadobás összegeit mutatja. Mennyi a dobott összegek mediánja?', ['7', '6', '6,5', '8'], 'A 20 adat közül a 10. és 11. a középső. Halmozva: 3: 1, 4: 3, 5: 5, 6: 8, 7: 13 – a 10. és 11. adat is 7.', DICE),
  q(12, 2, 'Súlyozott átlag', 'Az oszlopdiagram 20 kockadobás összegeit mutatja. Mennyi a dobott összegek átlaga?', ['6,85', '7', '2,22', '6,5'], '(3 · 1 + 4 · 2 + 5 · 2 + 6 · 3 + 7 · 5 + 8 · 3 + 9 · 2 + 10 + 11) : 20 = 137 : 20 = 6,85.', DICE),
  q(13, 2, 'Sávdiagram', 'A felmérésben 80 legalább 40 éves ember vett részt. Hányan jártak közülük évente 5-nél kevesebbszer színházba?', ['15', '19', '42', '63'], '0,1875 · 80 = 15. (63 a 40 év alattiak közül ennyi.)', THEATER),
  q(14, 2, 'Sávdiagram', 'A 120 fiatalabb (40 év alatti) megkérdezett közül hányan járnak 10-nél többször színházba?', ['15', '12', '35', '50'], '0,125 · 120 = 15.', THEATER),
  q(15, 2, 'Sávdiagram', 'A 200 megkérdezett hány százaléka jár évente legalább 5, de legfeljebb 10 alkalommal színházba?', ['36%', '36,25%', '72%', '35%'], '0,35 · 120 + 0,375 · 80 = 42 + 30 = 72 fő; 72 : 200 = 36%. (36,25% a két százalék egyszerű átlaga – hibás.)', THEATER),
  q(16, 2, 'Kördiagram', 'A kördiagram egy 30 fős osztály napi internetezését mutatja. Hány diák internetezik naponta legalább 2 órát?', ['18', '11', '7', '20'], '132° + 84° = 216°; 216° : 12° = 18 diák (11 + 7).', INTERNET),
  q(17, 2, 'Kördiagram', 'A kördiagram alapján hány diák internetezik naponta legfeljebb 1 órát?', ['2', '24', '1', '3'], 'A 0–1 órás szelet 24°-os, 24° : 12° = 2 diák.', INTERNET),
  q(18, 2, 'Sávdiagram', 'A sávdiagram 320 tanuló jegyeinek halmozott százalékait mutatja. Hány tanuló kapott 3-ast?', ['135', '185', '57,8', '42'], 'A 3-as sáv 15,6%-tól 57,8%-ig tart: 42,2%, és 0,421875 · 320 = 135 (halmozva: 185 − 50).', <GradesBand />),
  q(19, 2, 'Medián', 'A sávdiagram 320 tanuló jegyeit mutatja. Mennyi a jegyek mediánja?', ['3', '4', '2', '3,5'], 'Az 50%-os pont a 15,6% és 57,8% közötti sávba, a 3-asokéba esik.', <GradesBand />),
  q(20, 2, 'Súlyozott átlag', 'A 320 jegy: 10 db 1-es, 40 db 2-es, 135 db 3-as, 95 db 4-es, 40 db 5-ös. Mennyi az átlag (két tizedesre)?', ['3,36', '3', '3,5', '64'], '(10 + 80 + 405 + 380 + 200) : 320 = 1075 : 320 ≈ 3,36. (64 a gyakoriságok átlaga.)', <MiniBarChart labels={['1', '2', '3', '4', '5']} values={[10, 40, 135, 95, 40]} xTitle="osztályzat" yTitle="fő" />),

  // LEVEL 3
  q(21, 3, 'Középponti szög', 'A 320 tanuló jegyeiről kördiagramot készítünk. Mekkora középponti szög tartozik a 135 darab 3-ashoz (egy tizedesre)?', ['151,9°', '135°', '42,2°', '160,5°'], '135 : 320 · 360° = 151,875° ≈ 151,9°.'),
  q(22, 3, 'Halmazok', 'A 30 diák mindegyike használ mobilt internetezésre, laptopot 24-en, tabletet 16-an, pontosan kétféle eszközt 14-en. Hányan használják mindhárom eszközt?', ['13', '10', '16', '3'], 'Ha x használ mindhármat, (16 − x) csak mobilt. A „jelölések” száma: (16 − x) + 2 · 14 + 3x = 30 + 24 + 16 = 70 ⇒ x = 13.'),
  q(23, 3, 'Súlyozott átlag', 'Egy filmre 1 012 963 szavazat érkezett, a pontok összege 9 031 275. Mennyi az értékelések átlaga (két tizedesre)?', ['8,92', '9,20', '5,50', '8,50'], '9 031 275 : 1 012 963 ≈ 8,92. (A honlapon közölt 9,2 korrigált érték, nem a szavazatok átlaga.)', <MiniBarChart labels={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} values={[3.1, 0.4, 0.4, 0.5, 1, 1.7, 4.5, 11.2, 23.4, 53.8]} yTitle="%" showValues={false} />),
  q(24, 3, 'Relatív gyakoriság', 'A film 1 012 963 szavazatából 544 471 volt 10 pontos. Mekkora a 10 pontos értékelések relatív gyakorisága?', ['≈ 53,75%', '≈ 46,25%', '≈ 10%', '≈ 54,4%'], '544 471 : 1 012 963 ≈ 0,5375 = 53,75%.'),
  q(25, 3, 'Visszaszámolás', 'A filmre leadott 1 012 963 szavazat pontösszege 9 031 275. Kb. hány további 10 pontos szavazat kellene ahhoz, hogy az átlag 9,2 legyen?', ['≈ 359 981', '≈ 287 985', '≈ 31 369', '≈ 544 471'], '(9 031 275 + 10x) : (1 012 963 + x) = 9,2 ⇒ 0,8x = 287 984,6 ⇒ x ≈ 359 981.'),
  q(26, 3, 'Kerekítés', 'Egy filmet 8-an értékeltek, mindenki 9 vagy 10 ponttal; a kerekített átlag 9,8. Hányan adtak 10 pontot?', ['6', '7', '8', '5'], 'a darab 10-es mellett az átlag (72 + a) : 8. a = 6: 9,75 ≈ 9,8; a = 7: 9,875 ≈ 9,9; a = 5: 9,625 ≈ 9,6.'),
  q(27, 3, 'Korfa', 'Az ábra Magyarország sematikus korfáit mutatja 1950-ben, 1990-ben és 2020-ban, összekeverve. Melyik a helyes időrend?', ['B, C, A', 'A, C, B', 'B, A, C', 'C, B, A'], 'Az 1950-es korfa széles alapú piramis (B), 1990-ben harang alakú (C), 2020-ban keskeny alapú urna (A): csökken a születések száma, öregszik a népesség.', PYRAMIDS),
  q(28, 3, 'Félrevezető diagram', 'Az oszlopdiagram függőleges tengelye 90-nél kezdődik. Az A értéke 95, a B értéke 100. Valójában hányszorosa B az A-nak?', ['≈ 1,05-szöröse', '2-szerese', '1,5-szerese', '10-szerese'], '100 : 95 ≈ 1,05. A B oszlop azért látszik kétszer olyan magasnak, mert a tengely nem 0-nál kezdődik (5 és 10 egység látszik a 95 és 100 helyett).', <TruncatedBars />),
  q(29, 3, 'Kördiagram', 'Melyik középponti szög-négyes ábrázolja helyesen a 20 vonós, 16 fúvós, 7 ütős és 2 egyéb zenészből álló zenekart?', ['160°, 128°, 56°, 16°', '180°, 120°, 45°, 15°', '200°, 160°, 70°, 20°', '144°, 128°, 63°, 25°'], '360° : 45 = 8°; 20 · 8 = 160, 16 · 8 = 128, 7 · 8 = 56, 2 · 8 = 16. A második arányai rosszak, a harmadik összege 450°, a negyedik arányai is hibásak.', <PieChart values={[20, 16, 7, 2]} labels={['vonós', 'fúvós', 'ütős', 'egyéb']} showPercent={false} />),
  q(30, 3, 'Súlyozott átlag', 'A 200 megkérdezett (120 fiatalabb, 80 idősebb) hány százaléka jár 10-nél többször színházba?', ['25%', '28,125%', '56,25%', '43,75%'], '0,125 · 120 + 0,4375 · 80 = 15 + 35 = 50 fő, 50 : 200 = 25%. A 28,125% a két százalék egyszerű átlaga – a különböző csoportméretek miatt hibás.', THEATER)
];

export const StatChartsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-diagramok-quiz"
      subtopicId="diagramok"
      title="2. Diagramok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: oszlop-, kör-, sáv- és vonaldiagramok olvasása, középponti szögek, súlyozott átlag, korfák és félrevezető diagramok."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={STAT_CHARTS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Diagramtípusok',
          items: ['oszlop: gyakoriságok összehasonlítása', 'kör: részek az egészhez (360° = 100%)', 'sáv: megoszlás egy téglalapon', 'vonal: változás követése (időben)']
        },
        {
          title: 'Kördiagram',
          items: ['középponti szög = gyakoriság : összes · 360°', '1 egység = 360° : összes (30 diák ⇒ 12°)', '90° = 25%, 180° = 50%, 36° = 10%', 'szelet ⇒ darab: szög : (1 egység szöge)']
        },
        {
          title: 'Súlyozott átlag',
          items: ['Σ (érték · gyakoriság) : Σ gyakoriság', 'százalékból: előbb darabszám, aztán összeg', 'különböző csoportok %-át NE átlagold egyszerűen', 'tengely nem 0-tól: félrevezető arányok']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<StatChartsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<StatChartsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default StatChartsQuiz;
