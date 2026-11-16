import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatDiagramsMatcher } from './StatDiagramsMatcher';
import { StatDiagramsSorter } from './StatDiagramsSorter';
import { SFig, SBoxPlot, SBarChart, SPie, SText, S_BLUE, S_RED, S_PURPLE, S_AXIS } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_SWIM = (
  <SFig w={260} h={120} className="w-full max-w-[300px] h-auto mx-auto" title="Edzésidők (s)">
    <SBoxPlot
      q={[50.59, 50.62, 50.7, 50.76, 50.81]}
      axMin={50.55}
      axMax={50.85}
      ticks={[50.55, 50.6, 50.65, 50.7, 50.75, 50.8, 50.85]}
      x0={18}
      w={224}
      y={56}
      bh={28}
      color={S_BLUE}
    />
  </SFig>
);

const FIG_BOX_NAMES = (
  <SFig w={260} h={110} className="w-full max-w-[300px] h-auto mx-auto">
    <SBoxPlot q={[2, 5, 8, 12, 15]} axMin={0} axMax={16} ticks={[0, 4, 8, 12, 16]} x0={18} w={224} y={50} bh={28} tickFmt={(v) => String(v)} />
    <line x1={18 + (8 / 16) * 224} y1={20} x2={18 + (8 / 16) * 224} y2={34} stroke={S_RED} strokeWidth={1.4} />
    <SText x={18 + (8 / 16) * 224} y={17} t="?" s={10} c={S_RED} b />
  </SFig>
);

const FIG_TRUNC = (
  <SFig w={250} h={150} className="w-full max-w-[290px] h-auto mx-auto" title="Mosópor-eladás (kg)">
    <SBarChart
      x0={40}
      y0={128}
      w={200}
      h={95}
      yMin={9100}
      yMax={9190}
      ticks={[9100, 9130, 9160, 9190]}
      data={[
        { label: 'jan.', value: 9114 },
        { label: 'febr.', value: 9128 },
        { label: 'márc.', value: 9141 },
        { label: 'ápr.', value: 9155 },
        { label: 'máj.', value: 9170 },
        { label: 'jún.', value: 9185 }
      ]}
      color={S_RED}
      labelSize={7.5}
      tickFmt={(v) => String(v)}
    />
  </SFig>
);

const FIG_PIE_Q = (
  <SFig w={240} h={140} className="w-full max-w-[280px] h-auto mx-auto">
    <SPie values={[1, 3]} labels={['?', '']} cx={70} cy={72} r={55} />
    <SText x={175} y={60} t="kék szelet:" s={9} c={S_AXIS} />
    <SText x={175} y={76} t="az adatok 25%-a" s={9} b />
  </SFig>
);

const FIG_STAFF_PIE = (
  <SFig w={240} h={140} className="w-full max-w-[280px] h-auto mx-auto" title="Létszám (fő) – 28 nap">
    <SPie values={[3, 1, 6, 4, 7, 5, 2]} labels={['35', '36', '37', '38', '39', '40', '41']} cx={70} cy={78} r={55} />
    <SText x={180} y={60} t="39 fő: 7 nap" s={8.5} b />
    <SText x={180} y={76} t="37 fő: 6 nap" s={8.5} b />
    <SText x={180} y={92} t="középponti szög?" s={8.5} c={S_RED} b />
  </SFig>
);

const FIG_MILAK_FINAL = (
  <SFig w={260} h={120} className="w-full max-w-[300px] h-auto mx-auto" title="Döntő: Q₁ = 113,49 s, Q₃ = 115,36 s">
    <SBoxPlot q={[113.37, 113.49, 114.605, 115.36, 115.54]} outliers={[110.34]} axMin={110} axMax={116} ticks={[110, 111, 112, 113, 114, 115, 116]} x0={18} w={224} y={58} bh={26} color={S_PURPLE} tickFmt={(v) => String(v)} />
  </SFig>
);

const STAT_DIAGRAMS_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'sdi-q1',
    questionTypeBadge: 'Dobozdiagram',
    figure: FIG_BOX_NAMES,
    level: 1,
    question: 'Mit jelöl a dobozdiagramon a dobozt kettéosztó (kérdőjellel jelölt) vonal?',
    options: ['a mediánt (Q₂)', 'az átlagot', 'a móduszt', 'a félterjedelmet'],
    correctAnswer: 0,
    explanation: 'A dobozt a medián osztja ketté; a doboz széleit az alsó (Q₁) és a felső (Q₃) kvartilis adja.'
  },
  {
    id: 'sdi-q2',
    questionTypeBadge: 'Dobozdiagram',
    level: 1,
    question: 'Melyik NEM tartozik a dobozdiagramot meghatározó öt adat közé?',
    options: ['az átlag', 'a medián', 'az alsó kvartilis', 'a maximum'],
    correctAnswer: 0,
    explanation: 'Az öt adat: minimum (Q₀), alsó kvartilis (Q₁), medián (Q₂), felső kvartilis (Q₃), maximum (Q₄). Az átlag nem szerepel.'
  },
  {
    id: 'sdi-q3',
    questionTypeBadge: 'Leolvasás',
    figure: FIG_SWIM,
    level: 1,
    question: 'Az ábra Tamás úszó edzésidőinek dobozdiagramja. Mekkora volt a legjobb ideje?',
    options: ['50,59 s', '50,81 s', '50,62 s', '50,70 s'],
    correctAnswer: 0,
    explanation: 'Úszásban a legjobb idő a legkisebb adat, a minimum: 50,59 s.'
  },
  {
    id: 'sdi-q4',
    questionTypeBadge: 'Terjedelem',
    figure: FIG_SWIM,
    level: 1,
    question: 'Mennyi Tamás edzésidőinek terjedelme?',
    options: ['0,22 s', '0,14 s', '0,11 s', '50,81 s'],
    correctAnswer: 0,
    explanation: 'Terjedelem = maximum − minimum = 50,81 − 50,59 = 0,22 s.'
  },
  {
    id: 'sdi-q5',
    questionTypeBadge: 'Félterjedelem',
    figure: FIG_SWIM,
    level: 1,
    question: 'Mennyi az edzésidők félterjedelme (a felső és az alsó kvartilis különbsége)?',
    options: ['0,14 s', '0,22 s', '0,11 s', '0,08 s'],
    correctAnswer: 0,
    explanation: 'Q₃ − Q₁ = 50,76 − 50,62 = 0,14 s. (0,11 s a terjedelem fele lenne.)'
  },
  {
    id: 'sdi-q6',
    questionTypeBadge: 'Dobozdiagram',
    level: 1,
    question: 'Az adatok körülbelül hány százaléka esik az alsó és a felső kvartilis közé (a dobozba)?',
    options: ['50%', '25%', '75%', '100%'],
    correctAnswer: 0,
    explanation: 'Az öt adat négy, egyenként ≈ 25%-os részre vágja az adatokat; a dobozba kettő, azaz ≈ 50% esik.'
  },
  {
    id: 'sdi-q7',
    questionTypeBadge: 'Félrevezető diagram',
    figure: FIG_TRUNC,
    level: 1,
    question: 'Mi a félrevezető ezen az oszlopdiagramon?',
    options: [
      'A függőleges tengely nem 0-tól indul, így a kis növekedés nagynak látszik.',
      'Az oszlopok túl keskenyek.',
      'A hónapok nincsenek időrendben.',
      'Az oszlopok színe nem egyezik.'
    ],
    correctAnswer: 0,
    explanation: 'A tengely 9100 kg-tól indul, ezért az oszlopok magassága nem arányos az eladott mennyiséggel.'
  },
  {
    id: 'sdi-q8',
    questionTypeBadge: 'Százalékszámítás',
    level: 1,
    question: 'A mosópor eladása januárban 9114 kg, júniusban 9185 kg volt. Körülbelül hány százalékos ez a növekedés?',
    options: ['≈ 0,8%', '≈ 8%', '71%', '≈ 0,08%'],
    correctAnswer: 0,
    explanation: '(9185 − 9114) / 9114 = 71 / 9114 ≈ 0,0078, vagyis ≈ 0,8%.'
  },
  {
    id: 'sdi-q9',
    questionTypeBadge: 'Medián',
    level: 1,
    question: 'Mennyi a 3; 5; 7; 8; 10; 12; 15 adatsor mediánja?',
    options: ['8', '7', '8,57', '10'],
    correctAnswer: 0,
    explanation: '7 adat van, a középső (4.) adat a 8.'
  },
  {
    id: 'sdi-q10',
    questionTypeBadge: 'Kördiagram',
    figure: FIG_PIE_Q,
    level: 1,
    question: 'Egy kördiagramon a kék szelet az adatok 25%-át jelenti. Mekkora a középponti szöge?',
    options: ['90°', '25°', '45°', '100°'],
    correctAnswer: 0,
    explanation: '0,25 · 360° = 90°.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'sdi-q11',
    questionTypeBadge: 'Kvartilis',
    level: 2,
    question: 'Mennyi a 3; 5; 7; 8; 10; 12; 15 adatsor alsó kvartilise (a tankönyvi módszerrel)?',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: 'Páratlan elemszámnál a mediánt (8) elhagyjuk; az alsó fél 3; 5; 7, ennek mediánja 5. (6 jönne ki, ha a 8-at is az alsó félhez vennénk.)'
  },
  {
    id: 'sdi-q12',
    questionTypeBadge: 'Kvartilis',
    level: 2,
    question: 'Mennyi a 3; 5; 7; 8; 10; 12; 15 adatsor felső kvartilise?',
    options: ['12', '11', '10', '13,5'],
    correctAnswer: 0,
    explanation: 'A felső fél (a medián nélkül): 10; 12; 15, ennek mediánja 12.'
  },
  {
    id: 'sdi-q13',
    questionTypeBadge: 'Félterjedelem',
    level: 2,
    question: 'Mennyi a 2; 4; 4; 5; 6; 7; 9; 20 adatsor félterjedelme (Q₃ − Q₁)?',
    options: ['4', '18', '3', '5'],
    correctAnswer: 0,
    explanation: 'Alsó fél: 2; 4; 4; 5 → Q₁ = 4; felső fél: 6; 7; 9; 20 → Q₃ = 8. Q₃ − Q₁ = 4. (18 a terjedelem.)'
  },
  {
    id: 'sdi-q14',
    questionTypeBadge: 'Kiugró adat',
    level: 2,
    question: 'A 2; 4; 4; 5; 6; 7; 9; 20 adatsorban Q₁ = 4, Q₃ = 8. Melyik adat kiugró?',
    options: ['a 20', 'a 2', 'a 2 és a 20', 'nincs kiugró adat'],
    correctAnswer: 0,
    explanation: 'Határok: 4 − 1,5 · 4 = −2 és 8 + 1,5 · 4 = 14. Csak a 20 > 14 kiugró.'
  },
  {
    id: 'sdi-q15',
    questionTypeBadge: 'Dobozdiagram értelmezése',
    figure: FIG_SWIM,
    level: 2,
    question: 'Igaz-e a dobozdiagram alapján, hogy Tamás a mérések 60%-ában jobb időt úszott, mint 50,7 s?',
    options: [
      'Nem, mert az adatok legalább 50%-a nagyobb vagy egyenlő, mint a medián (50,7 s).',
      'Igen, mert a medián 50,7 s.',
      'Igen, mert a doboz nagyobb része 50,7 s alatt van.',
      'Nem dönthető el a dobozdiagramból.'
    ],
    correctAnswer: 0,
    explanation: 'Az 50,7 s a medián, így legfeljebb az adatok fele lehet kisebb nála – 60% nem lehet.'
  },
  {
    id: 'sdi-q16',
    questionTypeBadge: 'Dobozdiagram értelmezése',
    figure: FIG_SWIM,
    level: 2,
    question: 'A mérések legalább hány százaléka 50,76 s-nál nem rosszabb (kisebb vagy egyenlő)?',
    options: ['75%', '50%', '25%', '40%'],
    correctAnswer: 0,
    explanation: 'Az 50,76 s a felső kvartilis: az adatok legalább 75%-a kisebb vagy egyenlő nála.'
  },
  {
    id: 'sdi-q17',
    questionTypeBadge: 'Medián',
    level: 2,
    question: 'Az elődöntő 8 legjobb ideje (s): 112,39; 114,01; 114,20; 114,32; 114,50; 114,79; 114,87; 114,91. Mennyi a medián?',
    options: ['114,41 s', '114,32 s', '114,50 s', '≈ 114,25 s'],
    correctAnswer: 0,
    explanation: 'Páros elemszám: a két középső adat átlaga (114,32 + 114,50) / 2 = 114,41 s, azaz 1:54,41. (≈ 114,25 s az átlag.)'
  },
  {
    id: 'sdi-q18',
    questionTypeBadge: 'Kiugró adat',
    level: 2,
    question: 'Az 1968-as távolugródöntő 16 eredményére Q₁ = 7,8 m és Q₃ = 8,105 m. Kiugró adat-e Bob Beamon 8,90 m-es ugrása?',
    options: ['igen, mert 8,90 > 8,105 + 1,5 · 0,305 ≈ 8,56', 'nem, mert ez a maximum', 'nem, mert 8,90 < 2 · Q₃', 'csak az átlagból dönthető el'],
    correctAnswer: 0,
    explanation: 'Félterjedelem 0,305 m; felső határ 8,105 + 0,4575 = 8,5625 m. A 8,90 m ennél nagyobb, tehát kiugró.'
  },
  {
    id: 'sdi-q19',
    questionTypeBadge: 'Kiugró adat',
    level: 2,
    question: 'A góllövőlista 11 legjobbja: 31; 15; 15; 13; 13; 13; 11; 11; 11; 10; 10 gól (Q₁ = 11, Q₃ = 15). Melyik adat kiugró?',
    options: ['a 31', 'a 10', 'a 15 és a 31', 'nincs kiugró adat'],
    correctAnswer: 0,
    explanation: 'Határok: 11 − 6 = 5 és 15 + 1,5 · 4 = 21. Csak a 31 gól nagyobb 21-nél.'
  },
  {
    id: 'sdi-q20',
    questionTypeBadge: 'Kördiagram',
    figure: FIG_STAFF_PIE,
    level: 2,
    question: 'Egy cégnél februárban 28 napból 7 napon 39 fő volt a létszám. Mekkora a 39 főhöz tartozó körcikk középponti szöge?',
    options: ['90°', '39°', '70°', '7°'],
    correctAnswer: 0,
    explanation: '7 / 28 = 1/4, így 360° / 4 = 90°.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'sdi-q21',
    questionTypeBadge: 'Kiugró adat',
    figure: FIG_MILAK_FINAL,
    level: 3,
    question: 'A 200 m pillangó döntőjében Q₁ = 113,49 s, Q₃ = 115,36 s. Mennyi az a határ, amely alatti idő kiugró adat?',
    options: ['110,685 s (1:50,685)', '111,62 s', '112,40 s', '109,75 s'],
    correctAnswer: 0,
    explanation: 'Félterjedelem: 1,87 s; 113,49 − 1,5 · 1,87 = 113,49 − 2,805 = 110,685 s. Milák 1:50,34-es világcsúcsa ez alatt van, tehát kiugró.'
  },
  {
    id: 'sdi-q22',
    questionTypeBadge: 'Bajusz',
    level: 3,
    question: 'A távolugródöntőben a 8,90 m kiugró adat; a többi eredmény közül a legnagyobb 8,19 m. Meddig tart a dobozdiagram felső bajusza?',
    options: ['8,19 m-ig', '8,90 m-ig', '8,5625 m-ig', '8,105 m-ig'],
    correctAnswer: 0,
    explanation: 'A bajusz az utolsó, még nem kiugró adatig tart (8,19 m); a 8,90 m-t különálló pont jelöli.'
  },
  {
    id: 'sdi-q23',
    questionTypeBadge: 'Átlagos létszám',
    level: 3,
    question: 'Egy cég februári (28 napos) napi létszámainak összege – a pihenőnapokra az előző munkanap létszámát véve – 1070. Mennyi az átlagos állományi létszám (egész számban)?',
    options: ['38', '39', '53', '38,2'],
    correctAnswer: 0,
    explanation: '1070 / 28 ≈ 38,21. Az útmutató szerint egész számra kerekítve közöljük: 38 fő. (53 lenne, ha csak a 20 munkanappal osztanánk.)'
  },
  {
    id: 'sdi-q24',
    questionTypeBadge: 'Átlagos létszám',
    level: 3,
    question: 'Február 3-án (péntek) 35 fő, 6-án (hétfő) 36 fő dolgozott a cégnél. Az útmutató szerint mekkora létszámot kell február 4-re (szombat) számítani?',
    options: ['35 főt', '36 főt', '0 főt', '35,5 főt'],
    correctAnswer: 0,
    explanation: 'Pihenőnapokra az azt megelőző munkanap létszámát kell figyelembe venni: a pénteki 35 főt.'
  },
  {
    id: 'sdi-q25',
    questionTypeBadge: 'Bajusz',
    level: 3,
    question: 'Adatsor: 4; 6; 7; 7; 8; 9; 10; 11; 12; 25. Meddig tart a dobozdiagram felső bajusza?',
    options: ['12-ig', '25-ig', '17-ig', '11-ig'],
    correctAnswer: 0,
    explanation: 'Q₁ = 7, Q₃ = 11, félterjedelem 4; felső határ 11 + 6 = 17. A 25 kiugró, így a bajusz a 12-ig tart.'
  },
  {
    id: 'sdi-q26',
    questionTypeBadge: 'Dobozdiagram értelmezése',
    figure: FIG_SWIM,
    level: 3,
    question: 'Lehet-e a dobozdiagram alapján Tamás edzésidőinek átlaga 50,80 s?',
    options: [
      'Nem: az adatok legalább fele ≤ 50,7 s, a többi ≤ 50,81 s, így az átlag kb. 50,76 s-nál kisebb.',
      'Igen, ha sok adat van 50,81 s-nál.',
      'Igen, mert 50,80 a minimum és a maximum között van.',
      'Nem, mert az átlag mindig egyenlő a mediánnal.'
    ],
    correctAnswer: 0,
    explanation: 'Legalább az adatok fele legfeljebb 50,7 s, a többi legfeljebb 50,81 s, így az átlag legfeljebb ≈ (50,7 + 50,81) / 2 ≈ 50,76 s körüli.'
  },
  {
    id: 'sdi-q27',
    questionTypeBadge: 'Félrevezető diagram',
    figure: FIG_TRUNC,
    level: 3,
    question: 'A tengely 9100 kg-tól indul. Hányszor magasabbnak látszik a júniusi (9185 kg) oszlop a januárinál (9114 kg)?',
    options: ['≈ 6,1-szer', '≈ 1,008-szor', '≈ 2-szer', '≈ 71-szer'],
    correctAnswer: 0,
    explanation: 'A látható magasságok: 9185 − 9100 = 85 és 9114 − 9100 = 14; 85 / 14 ≈ 6,1. A valódi arány csak ≈ 1,008.'
  },
  {
    id: 'sdi-q28',
    questionTypeBadge: 'Félrevezető diagram',
    level: 3,
    question: '„A munkanélküliség folyamatos csökkenése” című cikk diagramja csak néhány évet mutat; a közbülső évek adataiban emelkedések is vannak. Milyen módszerrel támasztotta alá a szerző az állítását?',
    options: [
      'Csak a csökkenést mutató évek adatait ábrázolta, a közbülső emelkedéseket kihagyta.',
      'A tengelyt 0-tól indította.',
      'Kördiagramot használt oszlopdiagram helyett.',
      'Az átlagot ábrázolta a medián helyett.'
    ],
    correctAnswer: 0,
    explanation: 'A kiválasztott évek elrejtik az ingadozást; a „folyamatos csökkenés” állítás a teljes adatsor alapján nem igaz.'
  },
  {
    id: 'sdi-q29',
    questionTypeBadge: 'Kiugró adat',
    level: 3,
    question: 'Adatsor: 10; 12; 13; 15; 16; 18; 19; 30. Mennyi a felső határ, amely felett egy adat kiugró?',
    options: ['27,5', '24,5', '30', '22'],
    correctAnswer: 0,
    explanation: 'Q₁ = (12 + 13) / 2 = 12,5; Q₃ = (18 + 19) / 2 = 18,5; félterjedelem 6; 18,5 + 9 = 27,5. Így a 30 kiugró adat.'
  },
  {
    id: 'sdi-q30',
    questionTypeBadge: 'Kördiagram',
    figure: FIG_STAFF_PIE,
    level: 3,
    question: 'A februári 28 napból 6 napon 37 fő volt a létszám. Mekkora a kördiagramon a 37 főhöz tartozó körcikk középponti szöge?',
    options: ['≈ 77,1°', '37°', '60°', '≈ 21,4°'],
    correctAnswer: 0,
    explanation: '6 / 28 · 360° ≈ 77,1°. (21,4 a relatív gyakoriság százalékban.)'
  }
];

export const StatDiagramsQuiz: React.FC<{
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
      topicId="g12-stat-diagramok-quiz"
      subtopicId="diagramok"
      title="3. Diagramok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: félrevezető diagramok, kördiagram, dobozdiagram, kvartilisek és kiugró adatok."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={STAT_DIAGRAMS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Dobozdiagram',
          items: [
            'Q₀ minimum, Q₁ alsó kvartilis, Q₂ medián, Q₃ felső kvartilis, Q₄ maximum.',
            'A mediánnal kettéosztunk (páratlan n: a mediánt elhagyjuk), a felek mediánja Q₁ és Q₃.',
            'Terjedelem: Q₄ − Q₀; félterjedelem: Q₃ − Q₁.',
            'Mindegyik részbe az adatok ≈ 25%-a esik.'
          ]
        },
        {
          title: 'Kiugró adat',
          items: [
            'x > Q₃ + 1,5 · (Q₃ − Q₁) vagy x < Q₁ − 1,5 · (Q₃ − Q₁).',
            'A bajusz az utolsó, még nem kiugró adatig tart.',
            'A kiugró adatot különálló pont jelöli.',
            'Példák: Milák 1:50,34; Beamon 8,90 m; 31 gól.'
          ]
        },
        {
          title: 'Félrevezető diagramok',
          items: [
            'Oszlopdiagram: a tengely induljon 0-tól!',
            'A lépték megváltoztatása eltorzítja a változás látszatát.',
            'Csak kiválasztott évek: elrejti az ingadozást.',
            'Kördiagram: középponti szög = relatív gyakoriság · 360°.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatDiagramsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StatDiagramsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StatDiagramsQuiz;
