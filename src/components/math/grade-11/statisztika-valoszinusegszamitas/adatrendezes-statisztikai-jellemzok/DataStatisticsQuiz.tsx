import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DataStatisticsMatcher } from './DataStatisticsMatcher';
import { DataStatisticsSorter } from './DataStatisticsSorter';
import { MiniBarChart, DotStrip } from './DataStatisticsFigures';

const FIRE = <MiniBarChart labels={['0', '1', '2', '4', '6', '14']} values={[1, 11, 6, 8, 4, 1]} xTitle="napi riasztások száma" yTitle="napok száma" />;
const GRADES = <MiniBarChart labels={['1', '2', '3', '4', '5']} values={[0, 9, 8, 6, 5]} xTitle="osztályzat" yTitle="gyakoriság (fő)" />;
const TEN = <DotStrip values={[32, 18, 20, 18, 20, 24, 15, 18, 55, 10]} min={5} max={60} />;
const CLASSES = (
  <DotStrip
    values={[36, 36, 34, 36, 25, 38, 26, 35, 29, 30, 31, 27, 33, 20, 30, 31, 36, 33, 21, 26, 12, 27, 29, 34, 31]}
    min={10}
    max={40}
    height={130}
  />
);

/** Kis táblázat ábraként (pl. osztálylétszámok). */
const TableFig: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => {
  const cw = 220 / head.length;
  return (
    <svg viewBox={`0 0 240 ${30 + rows.length * 22}`} className="w-full max-w-[280px] h-auto mx-auto">
      {head.map((h, i) => (
        <text key={i} x={10 + cw * i + cw / 2} y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0f172a">
          {h}
        </text>
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          <rect x="10" y={24 + j * 22} width="220" height="20" rx="3" fill={j % 2 ? '#ffffff' : '#f0f9ff'} />
          {r.map((c, i) => (
            <text key={i} x={10 + cw * i + cw / 2} y={38 + j * 22} fontSize="10" textAnchor="middle" fill={c === '?' ? '#b91c1c' : '#0f172a'} fontWeight={i === 0 || c === '?' ? 'bold' : 'normal'}>
              {c}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
};

type Lvl = 1 | 2 | 3;
const q = (id: number, level: Lvl, badge: string, question: string, options: string[], explanation: string, figure?: React.ReactNode): QuizQuestion => ({
  id: `ds-q${id}`,
  level,
  questionTypeBadge: badge,
  question,
  ...(figure ? { figure } : {}),
  options,
  correctAnswer: 0,
  explanation
});

const DATA_STATISTICS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  q(1, 1, 'Átlag', 'Az oszlopdiagram egy tűzoltóság 31 napjának riasztásait mutatja. Mennyi a napi riasztások átlaga?', ['3', '2', '1', '2,63'], '0 · 1 + 1 · 11 + 2 · 6 + 4 · 8 + 6 · 4 + 14 · 1 = 93, és 93 : 31 = 3.', FIRE),
  q(2, 1, 'Módusz', 'Az oszlopdiagram alapján mennyi a napi riasztások számának módusza?', ['1', '11', '2', '14'], 'A leggyakoribb érték az 1 (11 napon fordult elő). A 11 a gyakoriság, nem az adat!', FIRE),
  q(3, 1, 'Medián', 'Az oszlopdiagram alapján mennyi a napi riasztások számának mediánja?', ['2', '1', '3', '4'], 'A 31 adat közül a 16. áll középen. Az első 12 adat 0 vagy 1, a 13–18. adat 2, így a medián 2.', FIRE),
  q(4, 1, 'Átlag', 'Mennyi a 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számok átlaga?', ['23', '19', '18', '20'], 'Az összeg 230, az adatok száma 10, így az átlag 230 : 10 = 23.', TEN),
  q(5, 1, 'Módusz', 'Mennyi a 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számok módusza?', ['18', '20', '19', '23'], 'A 18 háromszor, a 20 kétszer, a többi egyszer fordul elő.', TEN),
  q(6, 1, 'Medián', 'Mennyi a 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számok mediánja?', ['19', '22', '18', '20'], 'Rendezve: 10, 15, 18, 18, 18, 20, 20, 24, 32, 55. A két középső (5. és 6.) átlaga (18 + 20) : 2 = 19. (A 22 a rendezetlen sor közepe – hibás.)', TEN),
  q(7, 1, 'Terjedelem', 'Mennyi a 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számok terjedelme?', ['45', '55', '10', '40'], 'Terjedelem = maximum − minimum = 55 − 10 = 45.', TEN),
  q(8, 1, 'Fogalom', 'Hogyan kapjuk meg a mediánt, ha az adatok száma páros?', ['a rendezett sor két középső elemének átlagaként', 'a felsorolás két középső elemének átlagaként', 'a legnagyobb és a legkisebb adat átlagaként', 'a leggyakoribb két adat átlagaként'], 'Előbb nagyság szerint rendezünk, majd a két középső adat számtani közepét vesszük.'),
  q(9, 1, 'Fogalom', 'Melyik középértéket változtatja meg leginkább egyetlen kiugróan nagy adat?', ['az átlagot', 'a mediánt', 'a móduszt', 'egyiket sem'], 'Az átlag minden adat értékét felhasználja, így egy kiugró adat erősen eltolja. A medián és a módusz alig vagy egyáltalán nem változik.'),
  q(10, 1, 'Módusz', 'Az oszlopdiagram egy történelemdolgozat jegyeinek gyakoriságát mutatja. Mennyi az osztályzatok módusza?', ['2', '9', '3', '5'], 'A leggyakoribb jegy a 2-es (9 tanuló).', GRADES),

  // LEVEL 2
  q(11, 2, 'Medián', 'Mennyi az oszlopdiagramon ábrázolt osztályzatok mediánja?', ['3', '2', '3,5', '4'], '9 + 8 + 6 + 5 = 28 dolgozat; a medián a 14. és 15. adat átlaga. Az első 9 adat 2-es, a 10–17. adat 3-as, így a medián 3.', GRADES),
  q(12, 2, 'Átlag', 'Mennyi az oszlopdiagramon ábrázolt osztályzatok átlaga?', ['3,25', '3', '3,5', '7'], '(2 · 9 + 3 · 8 + 4 · 6 + 5 · 5) : 28 = 91 : 28 = 3,25. (A 7 a gyakoriságok átlaga lenne: 28 : 4.)', GRADES),
  q(13, 2, 'Relatív gyakoriság', 'Az oszlopdiagram alapján a dolgozatok hány százaléka lett 2-es (egy tizedesre kerekítve)?', ['32,1%', '9%', '36%', '25%'], 'Relatív gyakoriság = 9 : 28 ≈ 0,321 = 32,1%.', GRADES),
  q(14, 2, 'Terjedelem', 'Mennyi az oszlopdiagramon ábrázolt osztályzatok terjedelme?', ['3', '4', '5', '9'], 'Egyes nem született, így a legkisebb jegy 2, a legnagyobb 5: 5 − 2 = 3.', GRADES),
  q(15, 2, 'Átlag', 'Mennyi a 9. évfolyam osztályainak átlagos létszáma?', ['33', '34', '36', '32'], '36 + 36 + 34 + 36 + 25 + 38 + 26 = 231, és 231 : 7 = 33.', <TableFig head={['', 'A', 'B', 'C', 'D', 'E', 'F', 'G']} rows={[['9.', '36', '36', '34', '36', '25', '38', '26']]} />),
  q(16, 2, 'Átlag', 'Mennyi a 11. évfolyam osztályainak átlagos létszáma?', ['27', '30', '31', '26'], '30 + 31 + 36 + 33 + 21 + 26 + 12 = 189, és 189 : 7 = 27.', <TableFig head={['', 'A', 'B', 'C', 'D', 'E', 'F', 'G']} rows={[['11.', '30', '31', '36', '33', '21', '26', '12']]} />),
  q(17, 2, 'Módusz', 'A pontdiagram egy iskola 25 osztályának létszámát mutatja. Mennyi a létszámok módusza?', ['36', '31', '38', '34'], 'A 36 négyszer fordul elő, a 31 háromszor, a többi legfeljebb kétszer.', CLASSES),
  q(18, 2, 'Medián', 'A pontdiagram egy iskola 25 osztályának létszámát mutatja. Mennyi a létszámok mediánja?', ['31', '30', '29,84', '33'], 'A 25 rendezett adat közül a 13. a középső: 12, 20, 21, 25, 26, 26, 27, 27, 29, 29, 30, 30, 31, … – a medián 31. (29,84 az átlag.)', CLASSES),
  q(19, 2, 'Terjedelem', 'A pontdiagram egy iskola 25 osztályának létszámát mutatja. Mennyi a terjedelem?', ['26', '38', '24', '18'], 'Maximum 38, minimum 12, a terjedelem 38 − 12 = 26.', CLASSES),
  q(20, 2, 'Összeg', '25 tanuló történelemdolgozatának átlaga 3,16. Mennyi a jegyek összege?', ['79', '75', '80', '316'], 'Az átlag · adatok száma = összeg: 25 · 3,16 = 79.'),

  // LEVEL 3
  q(21, 3, 'Átlag', 'A gimnázium 16 osztályának létszáma összesen 518 fő. Mennyi a gimnáziumi osztályok átlagos létszáma (K)?', ['32,375', '32,5', '30,25', '33'], 'K = 518 : 16 = 32,375 fő.', <TableFig head={['', 'A', 'B', 'C', 'D']} rows={[['9.', '36', '36', '34', '36'], ['10.', '35', '29', '30', '31'], ['11.', '30', '31', '36', '33'], ['12.', '27', '29', '34', '31']]} />),
  q(22, 3, 'Átlagok átlaga', 'K a 16 gimnáziumi, L a 9 szakiskolai osztály átlagos létszáma. Mit ad meg a (16K + 9L) : 25 kifejezés?', ['mind a 25 osztály átlagos létszámát', 'a két átlag számtani közepét', 'a 25 létszám mediánját', 'a gimnáziumi és szakiskolai átlag különbségét'], '16K a gimnáziumi, 9L a szakiskolai tanulók száma; összegük az összes tanuló (746), ezt osztjuk az osztályok számával: 746 : 25 = 29,84.'),
  q(23, 3, 'Súlyozott átlag', 'A Balaton-átúszás indulóinak 36%-a nő (átlagéletkor 35 év), 64%-a férfi (átlagéletkor 38 év). Mennyi az összes induló átlagéletkora?', ['36,92 év', '36,5 év', '36,08 év', '37,04 év'], '0,36 · 35 + 0,64 · 38 = 12,6 + 24,32 = 36,92. (36,5 a két átlag számtani közepe, 36,08 a felcserélt súlyokkal kapott érték.)', <MiniBarChart labels={['nők', 'férfiak']} values={[36, 64]} yTitle="arány (%)" />),
  q(24, 3, 'Adatok megadása', 'Kilenc szám egyetlen módusza 1, mediánja 2, átlaga 16/9, terjedelme 2. Melyik lehet ez a kilenc szám?', ['1; 1; 1; 1; 2; 2; 2; 3; 3', '1; 1; 1; 2; 2; 2; 2; 2; 3', '1; 1; 1; 1; 1; 2; 3; 3; 3', '1; 1; 1; 1; 2; 2; 3; 3; 3'], 'Az első sor összege 16, középső (5.) eleme 2, a leggyakoribb az 1, terjedelme 2. A második sor módusza 2, a harmadiké mediánja 1, a negyediké összege 17.'),
  q(25, 3, 'Kiugró adat', 'A 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számokból elhagyjuk az 55-öt. Mennyi lesz a megmaradt 9 szám átlaga (két tizedesre)?', ['19,44', '23', '17,5', '20'], '230 − 55 = 175, és 175 : 9 ≈ 19,44. Egyetlen kiugró adat elhagyása 23-ról 19,44-re csökkenti az átlagot.', TEN),
  q(26, 3, 'Összeg', 'Bence ötször mérte a lázát, a mérések átlaga 36,8 °C. Kétszer 37,8 °C-ot mért. Mennyi volt a másik három mérés átlaga?', ['≈ 36,13 °C', '36,8 °C', '35,8 °C', '36,5 °C'], 'Az összeg 5 · 36,8 = 184; a két 37,8 összege 75,6; a maradék 108,4 : 3 ≈ 36,13 °C.'),
  q(27, 3, 'Kiugró adat', 'A tűzoltós példában a 14 riasztásos nap kiugró adat. Mennyi a többi 30 nap átlaga (két tizedesre)?', ['2,63', '3', '2,9', '2,5'], '93 − 14 = 79, és 79 : 30 ≈ 2,63.', <MiniBarChart labels={['0', '1', '2', '4', '6', '14']} values={[1, 11, 6, 8, 4, 1]} xTitle="napi riasztások száma" highlight={[5]} />),
  q(28, 3, 'Transzformáció', 'Egy számsokaság minden eleméhez hozzáadunk 5-öt. Hogyan változnak a jellemzők?', ['az átlag és a medián 5-tel nő, a terjedelem nem változik', 'minden jellemző 5-tel nő', 'az átlag 5-tel nő, a medián nem változik', 'az átlag 5-szörösére nő'], 'Az eltolás minden adatot ugyanannyival mozgat: az átlag, a medián, a módusz, a minimum és a maximum 5-tel nő, a különbségük (terjedelem) változatlan.'),
  q(29, 3, 'Adatok megadása', 'Melyik öt számnak ugyanaz a módusza (18) és mediánja (19), mint a 3. feladat számsokaságának, de átlaga kétszer akkora (46)?', ['18; 18; 19; 80; 95', '18; 19; 19; 80; 94', '18; 18; 20; 80; 94', '18; 18; 19; 40; 46'], 'Az első sor összege 230, átlaga 46, módusza 18, mediánja 19. A második módusza 19, a harmadiké mediánja 20, a negyedik átlaga 28,2.'),
  q(30, 3, 'Lehetséges?', 'Egy 25 fős osztály dolgozatainak átlaga 3,16. Lehetséges-e, hogy csak 3-as és 4-es született?', ['igen: 21 darab 3-as és 4 darab 4-es', 'igen: 20 darab 3-as és 5 darab 4-es', 'igen: 4 darab 3-as és 21 darab 4-es', 'nem, mert az átlag nem egész szám'], 'Az összeg 79; 3x + 4(25 − x) = 79 ⇒ x = 21. (20 · 3 + 5 · 4 = 80, 4 · 3 + 21 · 4 = 96.)')
];

export const DataStatisticsQuiz: React.FC<{
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
      topicId="g11-stat-adatrendezes-quiz"
      subtopicId="adatrendezes-statisztikai-jellemzok"
      title="1. Adatrendezés – statisztikai jellemzők – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: átlag, módusz, medián, terjedelem, relatív gyakoriság, súlyozott átlag – oszlop- és pontdiagramokkal."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={DATA_STATISTICS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Középértékek',
          items: ['átlag = összeg : darabszám', 'módusz: a leggyakoribb adat (lehet több)', 'medián: a RENDEZETT sor közepe', 'páros n: a két középső átlaga']
        },
        {
          title: 'Szóródás, gyakoriság',
          items: ['minimum, maximum: a legkisebb, legnagyobb adat', 'terjedelem = maximum − minimum', 'relatív gyakoriság = gyakoriság : n', 'gyakorisági táblázatból: Σ (érték · gyakoriság) : n']
        },
        {
          title: 'Visszafelé számolás',
          items: ['összeg = átlag · darabszám (25 · 3,16 = 79)', 'súlyozott átlag: 0,36 · 35 + 0,64 · 38 = 36,92', 'kiugró adat: az átlagot eltolja, a mediánt alig', 'eltolás (+5): a terjedelem nem változik']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<DataStatisticsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<DataStatisticsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default DataStatisticsQuiz;
