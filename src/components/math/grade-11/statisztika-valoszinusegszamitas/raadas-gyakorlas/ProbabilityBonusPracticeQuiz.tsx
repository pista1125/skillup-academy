import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ProbabilityBonusPracticeMatcher } from './ProbabilityBonusPracticeMatcher';
import { ProbabilityBonusPracticeSorter } from './ProbabilityBonusPracticeSorter';
import { ProbabilityBonusDominoTile, PROBABILITY_BONUS_FENCERS } from './ProbabilityBonusPracticeFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** A 13 vívó listája kicsiben (név, életkor, érmes ★). */
const FencersFig: React.FC = () => (
  <svg viewBox="0 0 260 168" className={FIG_CLASS}>
    <rect x="2" y="2" width="256" height="164" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {PROBABILITY_BONUS_FENCERS.map((f, i) => {
      const col = i < 7 ? 0 : 1;
      const row = i < 7 ? i : i - 7;
      const x = 10 + col * 128;
      const y = 22 + row * 21;
      return (
        <g key={f.name}>
          <text x={x} y={y} fontSize="8.5" fill={f.female ? '#9d174d' : '#1e40af'}>
            {f.female ? '♀' : '♂'} {f.name}
            {f.medal ? ' ★' : ''}
          </text>
          <text x={x + 120} y={y} fontSize="8.5" fontWeight="bold" textAnchor="end" fill="#0f172a">{f.age}</text>
        </g>
      );
    })}
  </svg>
);

/** Üres 6 × 6-os rács „max” fejléccel. */
const MaxGridFig: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto mx-auto">
    <text x="16" y="22" fontSize="9" textAnchor="middle" fill="#0f172a">max</text>
    {[1, 2, 3, 4, 5, 6].map((v) => (
      <g key={v}>
        <text x={30 + (v - 0.5) * 27} y="22" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0369a1">{v}</text>
        <text x="18" y={30 + (v - 0.5) * 27 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#be123c">{v}</text>
      </g>
    ))}
    {[0, 1, 2, 3, 4, 5].map((a) =>
      [0, 1, 2, 3, 4, 5].map((b) => <rect key={`${a}-${b}`} x={30 + b * 27} y={30 + a * 27} width="27" height="27" fill="#ffffff" stroke="#94a3b8" />)
    )}
    <text x="111" y="120" fontSize="28" textAnchor="middle" fill="#9f1239" fillOpacity="0.5">?</text>
  </svg>
);

/** Egy dominókő, amelyhez illeszteni kell. */
const DominoFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 160 70" className="w-full max-w-[180px] h-auto mx-auto">
    <ProbabilityBonusDominoTile x={20} y={8} s={52} a={a} b={b} fill="#fef3c7" />
  </svg>
);

/** Céltábla 5 gyűrűvel (sugár 1–5); a kérdéses rész kiemelve. */
const TargetFig: React.FC<{ inner: number; outer: number }> = ({ inner, outer }) => (
  <svg viewBox="-60 -60 120 120" className="w-full max-w-[180px] h-auto mx-auto">
    {[5, 4, 3, 2, 1].map((r) => (
      <circle
        key={r}
        cx="0"
        cy="0"
        r={r * 10}
        fill={r <= outer && r > inner ? '#fda4af' : '#ffffff'}
        stroke="#334155"
        strokeWidth="0.8"
      />
    ))}
    <line x1="0" y1="0" x2="50" y2="0" stroke="#0369a1" strokeWidth="0.8" strokeDasharray="2 2" />
    <text x="25" y="-3" fontSize="6" textAnchor="middle" fill="#0369a1">R = 5</text>
    <text x="0" y="57" fontSize="6" textAnchor="middle" fill="#334155">a gyűrűk sugara 1, 2, 3, 4, 5</text>
  </svg>
);

/** Hat gyerek sora, két kiemelt hellyel. */
const LineupFig: React.FC = () => (
  <svg viewBox="0 0 260 70" className={FIG_CLASS}>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <circle cx={30 + i * 40} cy="20" r="9" fill="#e2e8f0" stroke="#64748b" />
        <rect x={20 + i * 40} y="31" width="20" height="26" rx="6" fill="#e2e8f0" stroke="#64748b" />
        <text x={30 + i * 40} y="49" fontSize="10" textAnchor="middle" fill="#0f172a">?</text>
      </g>
    ))}
    <text x="10" y="68" fontSize="8" fill="#334155">eleje</text>
    <text x="250" y="68" fontSize="8" textAnchor="end" fill="#334155">vége</text>
  </svg>
);

const PROBABILITY_BONUS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'pbp-q1',
    level: 1,
    questionTypeBadge: 'Táblázat',
    question: 'A tokiói olimpia 13 magyar vívója közül véletlenszerűen kiválasztunk egyet. Mennyi a valószínűsége, hogy női versenyző?',
    figure: <FencersFig />,
    options: ['8/13', '5/13', '1/2', '4/13'],
    correctAnswer: 0,
    explanation: 'Női tőr: 4 fő, női kard: 4 fő – 8 nő a 13 versenyzőből: 8/13.'
  },
  {
    id: 'pbp-q2',
    level: 1,
    questionTypeBadge: 'Táblázat',
    question: 'Mennyi a valószínűsége, hogy a véletlenszerűen kiválasztott vívó érmet nyert Tokióban? (★ = érmes)',
    figure: <FencersFig />,
    options: ['5/13', '6/13', '3/13', '4/13'],
    correctAnswer: 0,
    explanation: 'Érmesek: Szilágyi Áron (arany, csapatbronz), Siklósi Gergely, Decsi Tamás, Gémesi Csanád, Szatmári András – 5 versenyző. Szilágyi két érme ellenére egy elemi esemény.'
  },
  {
    id: 'pbp-q3',
    level: 1,
    questionTypeBadge: 'Táblázat',
    question: 'Mennyi a valószínűsége, hogy a véletlenszerűen kiválasztott vívó kevesebb mint 25 éves?',
    figure: <FencersFig />,
    options: ['5/13', '4/13', '6/13', '8/13'],
    correctAnswer: 0,
    explanation: '25 évnél fiatalabbak: Kondricz Kata (23), Pásztor Flóra (23), Pusztai Liza (20), Battai Sugár Katinka (18), Siklósi Gergely (23) – 5 fő.'
  },
  {
    id: 'pbp-q4',
    level: 1,
    questionTypeBadge: 'Táblázat',
    question: 'Mennyi a valószínűsége, hogy a véletlenszerűen kiválasztott vívó több mint 30 éves?',
    figure: <FencersFig />,
    options: ['5/13', '4/13', '6/13', '3/13'],
    correctAnswer: 0,
    explanation: '30 évnél idősebbek: Kreiss Fanni (32), Mohamed Aida (45), Decsi Tamás (38), Gémesi Csanád (34), Szilágyi Áron (31) – 5 fő.'
  },
  {
    id: 'pbp-q5',
    level: 1,
    questionTypeBadge: 'Védekező erő',
    question: 'Két kockával dobunk; a védekező erő a nagyobbik dobás (egyenlőnél a közös érték). Mennyi a valószínűsége, hogy a védekező erő 5?',
    figure: <MaxGridFig />,
    options: ['1/4', '1/6', '5/36', '11/36'],
    correctAnswer: 0,
    explanation: 'Az 5-ös erő cellái: (5;1)…(5;5) és (1;5)…(4;5) – 5 + 4 = 9 cella: 9/36 = 1/4.'
  },
  {
    id: 'pbp-q6',
    level: 1,
    questionTypeBadge: 'Védekező erő',
    question: 'Mennyi a valószínűsége, hogy két kockával dobva a védekező erő (a nagyobbik dobás) 3?',
    figure: <MaxGridFig />,
    options: ['5/36', '1/6', '1/12', '1/9'],
    correctAnswer: 0,
    explanation: 'A 3-as erő: (3;1), (3;2), (3;3), (1;3), (2;3) – 5 cella: 5/36.'
  },
  {
    id: 'pbp-q7',
    level: 1,
    questionTypeBadge: 'Sorrendek',
    question: '6 gyerek – köztük Sári – véletlenszerűen áll sorba. Mennyi a valószínűsége, hogy Sári áll legelöl?',
    figure: <LineupFig />,
    options: ['1/6', '1/5', '1/30', '1/2'],
    correctAnswer: 0,
    explanation: 'Mind a 6 gyerek egyforma eséllyel áll elöl: 1/6. (Sorrendekkel: 5!/6! = 1/6.)'
  },
  {
    id: 'pbp-q8',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: '6 gyerek – köztük Dóri – véletlenszerűen áll sorba. Mennyi a valószínűsége, hogy NEM Dóri áll leghátul?',
    figure: <LineupFig />,
    options: ['5/6', '1/6', '4/5', '1/2'],
    correctAnswer: 0,
    explanation: 'P(Dóri áll leghátul) = 1/6, így a komplementer: 1 − 1/6 = 5/6.'
  },
  {
    id: 'pbp-q9',
    level: 1,
    questionTypeBadge: 'Hatvány',
    question: 'Az egyjegyű pozitív egészek közül véletlenszerűen választunk egy n-et. Mennyi a valószínűsége, hogy 2ⁿ természetes szám?',
    options: ['1', '0', '1/2', '4/9'],
    correctAnswer: 0,
    explanation: '2ⁿ pozitív egész kitevőre mindig pozitív egész (2, 4, 8, …), tehát biztos esemény: P = 1.'
  },
  {
    id: 'pbp-q10',
    level: 1,
    questionTypeBadge: 'Hatvány',
    question: 'n az 1, 2, …, 9 számok egyike (véletlenszerűen). Mennyi a valószínűsége, hogy (1/2)ⁿ természetes szám?',
    options: ['0', '1', '1/9', '1/2'],
    correctAnswer: 0,
    explanation: '(1/2)ⁿ = 1/2ⁿ, ez n ≥ 1 esetén 0 és 1 közötti tört, sosem természetes szám: lehetetlen esemény, P = 0.'
  },

  // LEVEL 2
  {
    id: 'pbp-q11',
    level: 2,
    questionTypeBadge: 'Védekező erő',
    question: 'Mennyi a valószínűsége, hogy két kockával dobva a védekező erő (a nagyobbik dobás) legalább 5?',
    figure: <MaxGridFig />,
    options: ['5/9', '1/3', '1/2', '4/9'],
    correctAnswer: 0,
    explanation: 'Komplementer: mindkét kocka legfeljebb 4: 4 · 4 = 16 eset. P = 1 − 16/36 = 20/36 = 5/9. (1/3 = 2/6 hibás, mert a kimenetelek nem egyformán valószínűek.)'
  },
  {
    id: 'pbp-q12',
    level: 2,
    questionTypeBadge: 'Védekező erő',
    question: 'Mennyi a valószínűsége, hogy két kockával dobva a védekező erő kisebb, mint 3?',
    figure: <MaxGridFig />,
    options: ['1/9', '1/3', '1/36', '1/12'],
    correctAnswer: 0,
    explanation: 'Mindkét kocka legfeljebb 2: 2 · 2 = 4 eset: 4/36 = 1/9.'
  },
  {
    id: 'pbp-q13',
    level: 2,
    questionTypeBadge: 'Arányok',
    question: 'Egy láda jonatán- és egy láda idaredalma összekeveredett. Jonatánból 25%-kal több fér egy ládába, mint idaredből. Mennyi a valószínűsége, hogy egy véletlenszerűen kiválasztott alma jonatán?',
    options: ['5/9', '1/2', '5/8', '4/9'],
    correctAnswer: 0,
    explanation: 'Idared: n db, jonatán: 1,25n db. P = 1,25n / 2,25n = 5/9. (5/8 = 1,25/2 hibás: a nevező az összes alma, 2,25n.)'
  },
  {
    id: 'pbp-q14',
    level: 2,
    questionTypeBadge: 'Dominó',
    question: 'A 28 köves hatpontos dominókészletből kivesszük az 1–5-ös követ. A maradék kövek közül egyet választva mennyi a valószínűsége, hogy illeszthető az 1–5-ös kőhöz?',
    figure: <DominoFig a={1} b={5} />,
    options: ['4/9', '13/27', '13/28', '1/2'],
    correctAnswer: 0,
    explanation: '1-es van 7 kövön, 5-ös 7 kövön, mindkettő csak az 1–5-ösön: 13 kő, de az 1–5-ös már nincs a készletben. 12 kedvező a 27-ből: 12/27 = 4/9.'
  },
  {
    id: 'pbp-q15',
    level: 2,
    questionTypeBadge: 'Sorrendek',
    question: '6 gyerek – köztük Sári és Dóri – véletlenszerűen áll sorba. Mennyi a valószínűsége, hogy Sári az első és Dóri a második?',
    figure: <LineupFig />,
    options: ['1/30', '1/36', '1/15', '1/6'],
    correctAnswer: 0,
    explanation: 'A többi 4 gyerek 4! = 24-féleképpen állhat: 24/720 = 1/30. (Vagy: 1/6 · 1/5.)'
  },
  {
    id: 'pbp-q16',
    level: 2,
    questionTypeBadge: 'Sorrendek',
    question: '6 gyerek – köztük Sári és Dóri – véletlenszerűen áll sorba. Mennyi a valószínűsége, hogy Sári és Dóri egymás mögött áll (valamilyen sorrendben)?',
    figure: <LineupFig />,
    options: ['1/3', '1/6', '1/15', '2/5'],
    correctAnswer: 0,
    explanation: 'Sári–Dóri „blokk”: 5 helyen állhat, belül 2 sorrend, a többiek 4! = 24-féleképpen: 5 · 2 · 24 = 240. P = 240/720 = 1/3.'
  },
  {
    id: 'pbp-q17',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'n az 1, 2, …, 9 számok egyike (véletlenszerűen). Mennyi a valószínűsége, hogy log₂ n természetes szám?',
    options: ['4/9', '1/3', '1/9', '5/9'],
    correctAnswer: 0,
    explanation: 'log₂ n természetes, ha n a 2 hatványa: 1 (log = 0), 2, 4, 8 – 4 eset: 4/9. (1/3 akkor jönne ki, ha a 0-t nem tekintenénk természetes számnak.)'
  },
  {
    id: 'pbp-q18',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'n az 1, 2, …, 9 számok egyike (véletlenszerűen). Mennyi a valószínűsége, hogy log₀,₅ n természetes szám?',
    options: ['1/9', '0', '4/9', '1/3'],
    correctAnswer: 0,
    explanation: 'log₀,₅ n = −log₂ n ≤ 0; természetes szám csak akkor, ha 0, azaz n = 1. P = 1/9.'
  },
  {
    id: 'pbp-q19',
    level: 2,
    questionTypeBadge: 'Relatív gyakoriság',
    question: 'Két kockával dobva feljegyezték az összegeket: 9, 3, 5, 4, 11, 6, 9, 6, 10. A: az összeg 4-nél nagyobb, de 9-nél kisebb. Mennyi A relatív gyakorisága?',
    options: ['1/3', '5/9', '4/9', '2/9'],
    correctAnswer: 0,
    explanation: 'A 9 összeg közül 5, 6, 6 esik 5 és 8 közé: 3/9 = 1/3. (5/9 az A valószínűsége, nem a relatív gyakorisága.)'
  },
  {
    id: 'pbp-q20',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége annak, hogy az összeg 4-nél nagyobb, de 9-nél kisebb?',
    options: ['5/9', '1/3', '4/9', '2/3'],
    correctAnswer: 0,
    explanation: 'Összeg 5: 4 eset, 6: 5, 7: 6, 8: 5 – összesen 20: 20/36 = 5/9.'
  },

  // LEVEL 3
  {
    id: 'pbp-q21',
    level: 3,
    questionTypeBadge: 'Valószínűségi fa',
    question: 'Molnár úr négy egyforma kulcsa közül egy nyitja a kaput. Mennyi a valószínűsége, hogy először rossz kulccsal próbálkozik, de másodszorra (egy másik kulccsal) sikerül?',
    options: ['1/4', '3/16', '1/3', '3/4'],
    correctAnswer: 0,
    explanation: 'Először rossz: 3/4; a maradék 3 kulcsból a jó: 1/3. P = 3/4 · 1/3 = 1/4. (3/16 = 3/4 · 1/4 – visszatevéssel számolna.)'
  },
  {
    id: 'pbp-q22',
    level: 3,
    questionTypeBadge: 'Átlag',
    question: 'Egy sportcsarnok 1. zónájában az A, B, C szektorba 69, 96 és 85 jegy kelt el; szektoronként átlagosan 82 jegyet vásároltak. Hány jegyet adtak el a D szektor 1. zónájába?',
    options: ['78', '82', '83', '250'],
    correctAnswer: 0,
    explanation: '4 · 82 = 328 jegy fogyott az 1. zónában, ebből 69 + 96 + 85 = 250 az A, B, C szektorban: 328 − 250 = 78.'
  },
  {
    id: 'pbp-q23',
    level: 3,
    questionTypeBadge: 'Védekező erő',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a védekező erő (a nagyobbik dobás) 6?',
    figure: <MaxGridFig />,
    options: ['11/36', '1/6', '1/3', '25/36'],
    correctAnswer: 0,
    explanation: 'Legalább egy kocka 6-os: 1 − 5 · 5/36 = 11/36. (1/6 hibás: a 6 lehetséges erő nem egyformán valószínű.)'
  },
  {
    id: 'pbp-q24',
    level: 3,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a kisebbik dobás 5 (egyenlőnél a közös érték)?',
    options: ['1/12', '1/9', '1/6', '1/36'],
    correctAnswer: 0,
    explanation: 'A kisebbik dobás 5: (5;5), (5;6), (6;5) – 3 eset: 3/36 = 1/12.'
  },
  {
    id: 'pbp-q25',
    level: 3,
    questionTypeBadge: 'Három kocka',
    question: 'Három kockával dobunk. Mennyi a valószínűsége, hogy a legnagyobb dobás 6?',
    options: ['91/216', '1/2', '1/6', '125/216'],
    correctAnswer: 0,
    explanation: 'Összesen 6³ = 216 eset; egyik sem 6-os: 5³ = 125. P = 1 − 125/216 = 91/216 ≈ 0,42.'
  },
  {
    id: 'pbp-q26',
    level: 3,
    questionTypeBadge: 'Dominó',
    question: 'A 28 köves dominókészletből kivesszük a dupla 6-os követ. A maradék 27 kő közül egyet választva mennyi a valószínűsége, hogy illeszthető a 6–6-os kőhöz?',
    figure: <DominoFig a={6} b={6} />,
    options: ['2/9', '7/27', '1/4', '1/6'],
    correctAnswer: 0,
    explanation: '6-os 7 kövön van (6–0, …, 6–6), ebből a 6–6 már nincs a készletben: 6 kedvező a 27-ből: 6/27 = 2/9.'
  },
  {
    id: 'pbp-q27',
    level: 3,
    questionTypeBadge: 'Dominó',
    question: 'A teljes, 28 köves hatpontos dominókészletből véletlenszerűen kiveszünk egy követ. Mennyi a valószínűsége, hogy „dupla” (mindkét oldalán ugyanannyi pötty van)?',
    options: ['1/4', '1/7', '7/36', '1/6'],
    correctAnswer: 0,
    explanation: 'Duplák: 0–0, 1–1, …, 6–6 – 7 kő a 28-ból: 7/28 = 1/4.'
  },
  {
    id: 'pbp-q28',
    level: 3,
    questionTypeBadge: 'Geometriai valószínűség',
    question: 'Az 5 egység sugarú céltáblát egy lövés biztosan eltalálja, és bárhová egyforma eséllyel érkezik. Mennyi a valószínűsége, hogy a középső, 1 egység sugarú körbe (10 pont) talál?',
    figure: <TargetFig inner={0} outer={1} />,
    options: ['1/25', '1/5', '1/10', '1/50'],
    correctAnswer: 0,
    explanation: 'Területek aránya: 1²π / 5²π = 1/25. (1/5 a sugarak aránya – az nem jó, a terület számít.)'
  },
  {
    id: 'pbp-q29',
    level: 3,
    questionTypeBadge: 'Geometriai valószínűség',
    question: 'Ugyanezen az 5 egység sugarú céltáblán mennyi a valószínűsége, hogy a lövés a 2 és 3 egység sugarú körök közötti gyűrűbe talál?',
    figure: <TargetFig inner={2} outer={3} />,
    options: ['1/5', '1/25', '9/25', '1/3'],
    correctAnswer: 0,
    explanation: 'A gyűrű területe (3² − 2²)π = 5π, a tábláé 25π: 5/25 = 1/5. (9/25 a teljes 3 sugarú kör aránya.)'
  },
  {
    id: 'pbp-q30',
    level: 3,
    questionTypeBadge: 'Sorrendek',
    question: '6 gyerek – köztük Sári és Dóri – véletlenszerűen áll sorba. Mennyi a valószínűsége, hogy Sári valahol Dóri előtt áll?',
    figure: <LineupFig />,
    options: ['1/2', '1/3', '5/6', '1/6'],
    correctAnswer: 0,
    explanation: 'Minden sorrendhez tartozik egy „párja”, amelyben Sári és Dóri helyet cserél – a sorrendek pontosan felében áll Sári elöl: 1/2.'
  }
];

export const ProbabilityBonusPracticeQuiz: React.FC<{
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
      topicId="g11-stat-raadas-gyakorlas-quiz"
      subtopicId="raadas-gyakorlas"
      title="8. Ráadás – Gyakorlás – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: vívók, védekező erő, almák, dominók, sorban állás, logaritmus, kulcsok és célba dobás."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={PROBABILITY_BONUS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Elemi események',
          items: [
            'egy versenyző, egy dobáspár, egy sorrend = egy elemi esemény',
            'P = kedvező / összes (egyformán valószínű esetekkel)',
            'két kocka: 36 rendezett pár',
            'n ember sorrendje: n!'
          ]
        },
        {
          title: 'Két kocka: nagyobbik dobás',
          items: [
            'P(max = k) = (2k − 1)/36',
            'P(max ≤ k) = (k/6)²',
            'legalább 5: 1 − 16/36 = 5/9',
            'három kocka: P(max = 6) = 1 − 125/216'
          ]
        },
        {
          title: 'Trükkök',
          items: [
            'komplementer: P(A) = 1 − P(nem A)',
            'blokk-módszer: egymás mellett állók egy „blokk”',
            'egymás utáni húzás: 3/4 · 1/3 (valószínűségi fa)',
            'geometriai valószínűség: kedvező terület / teljes terület'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ProbabilityBonusPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ProbabilityBonusPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ProbabilityBonusPracticeQuiz;
