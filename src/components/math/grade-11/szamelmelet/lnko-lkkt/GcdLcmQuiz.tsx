import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GcdLcmMatcher } from './GcdLcmMatcher';
import { GcdLcmSorter } from './GcdLcmSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Két fal egyforma csíkokkal, a csík szélessége ismeretlen. */
const WallFig: React.FC = () => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    {[0, 1, 2].map((i) => (
      <rect key={`a${i}`} x={12 + i * 28} y="20" width="28" height="80" fill={i % 2 ? '#a7f3d0' : '#d1fae5'} stroke="#047857" />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <rect key={`b${i}`} x={118 + i * 28} y="20" width="28" height="80" fill={i % 2 ? '#a7f3d0' : '#d1fae5'} stroke="#047857" />
    ))}
    <text x="26" y="64" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#dc2626">?</text>
    <text x="54" y="118" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">240 cm</text>
    <text x="174" y="118" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">320 cm</text>
    <text x="120" y="134" fontSize="10" textAnchor="middle" fill="#475569">legszélesebb csík?</text>
  </svg>
);

/** Prímtényezős Venn-diagram, a metszet kérdőjeles. */
const VennFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <circle cx="92" cy="75" r="58" fill="#d1fae5" fillOpacity="0.7" stroke="#059669" strokeWidth="1.5" />
    <circle cx="148" cy="75" r="58" fill="#bae6fd" fillOpacity="0.6" stroke="#0284c7" strokeWidth="1.5" />
    <text x="60" y="20" fontSize="10" fontWeight="bold" fill="#047857">2³ · 3⁴ · 7</text>
    <text x="140" y="20" fontSize="10" fontWeight="bold" fill="#0369a1">2⁴ · 3 · 11</text>
    <text x="64" y="72" fontSize="10" textAnchor="middle" fill="#065f46">3 · 3 · 3</text>
    <text x="64" y="88" fontSize="10" textAnchor="middle" fill="#065f46">7</text>
    <text x="120" y="80" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#dc2626">?</text>
    <text x="176" y="72" fontSize="10" textAnchor="middle" fill="#075985">2</text>
    <text x="176" y="88" fontSize="10" textAnchor="middle" fill="#075985">11</text>
    <text x="120" y="145" fontSize="10" textAnchor="middle" fill="#334155">4536 és 528</text>
  </svg>
);

/** 6, 8, 10 többszörösei. */
const MultiplesFig: React.FC = () => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    {[
      { k: 6, y: 28, c: '#059669' },
      { k: 8, y: 58, c: '#0284c7' },
      { k: 10, y: 88, c: '#9333ea' }
    ].map((r) => (
      <g key={r.k}>
        <line x1="24" y1={r.y} x2="230" y2={r.y} stroke="#94a3b8" />
        <text x="16" y={r.y + 4} fontSize="10" textAnchor="end" fontWeight="bold" fill={r.c}>{r.k}</text>
        {Array.from({ length: Math.floor(200 / r.k) }, (_, i) => (i + 1) * r.k).map((m) => (
          <circle key={m} cx={24 + m} cy={r.y} r="1.8" fill={r.c} />
        ))}
      </g>
    ))}
    <text x="120" y="112" fontSize="10" textAnchor="middle" fill="#334155">hol találkoznak először? (×1000 Ft)</text>
  </svg>
);

/** Téglalap méretekkel, a keresett mennyiség kérdőjeles. */
const RectFig: React.FC<{ label: string; w?: string; h?: string }> = ({ label, w = '126 cm', h = '84 cm' }) => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    <rect x="40" y="16" width="126" height="84" fill="#d1fae5" stroke="#047857" strokeWidth="1.8" />
    <text x="103" y="116" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">{w}</text>
    <text x="34" y="62" fontSize="11" textAnchor="end" fontWeight="bold" fill="#0f172a">{h}</text>
    <text x="205" y="62" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#dc2626">{label}</text>
  </svg>
);

/** Euklideszi algoritmus lépései. */
const EuclidFig: React.FC = () => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    {['675 = 1 · 495 + 180', '495 = 2 · 180 + 135', '180 = 1 · 135 + 45', '135 = 3 · 45 + 0'].map((t, i) => (
      <text key={t} x="120" y={24 + i * 24} fontSize="13" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{t}</text>
    ))}
    <text x="120" y="114" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#dc2626">(675; 495) = ?</text>
  </svg>
);

const GCD_LCM_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak (1–10)
  {
    id: 'gl-q1',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mit jelent két pozitív egész szám legnagyobb közös osztója?',
    options: [
      'A számok közös osztói közül a legnagyobb',
      'A számok közös többszörösei közül a legkisebb',
      'A két szám különbsége',
      'A nagyobbik szám legnagyobb valódi osztója'
    ],
    correctAnswer: 0,
    explanation: 'A közös osztók (mindkét számnak osztói) közül a legnagyobb a legnagyobb közös osztó, jele (a; b).'
  },
  {
    id: 'gl-q2',
    level: 1,
    questionTypeBadge: 'LNKO',
    question: 'Mennyi (18; 120)?',
    options: ['6', '3', '12', '2'],
    correctAnswer: 0,
    explanation: 'A 18 és a 120 közös osztói: 1, 2, 3, 6. A legnagyobb a 6. (A 12 nem osztója a 18-nak.)'
  },
  {
    id: 'gl-q3',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Mit jelöl a tankönyvben az [a; b] jelölés?',
    options: ['a és b legkisebb közös többszörösét', 'a és b legnagyobb közös osztóját', 'az a-tól b-ig terjedő zárt intervallumot', 'a és b szorzatát'],
    correctAnswer: 0,
    explanation: 'A számelméletben (a; b) a legnagyobb közös osztó, [a; b] a legkisebb közös többszörös jele.'
  },
  {
    id: 'gl-q4',
    level: 1,
    questionTypeBadge: 'Relatív prím',
    question: 'Melyik számpár relatív prím?',
    options: ['22 és 75', '21 és 35', '18 és 120', '39 és 351'],
    correctAnswer: 0,
    explanation: '22 = 2 · 11 és 75 = 3 · 5²: nincs közös prímtényező, (22; 75) = 1. (21; 35) = 7, (18; 120) = 6, (39; 351) = 39.'
  },
  {
    id: 'gl-q5',
    level: 1,
    questionTypeBadge: 'Közös osztók',
    question: 'Melyek a 18 és a 120 közös osztói?',
    options: ['1; 2; 3; 6', '1; 2; 3; 6; 9', '2; 3; 6', '1; 6'],
    correctAnswer: 0,
    explanation: 'A 18 osztói: 1, 2, 3, 6, 9, 18. Ezek közül a 120-nak osztói: 1, 2, 3, 6. (A 9 nem osztója a 120-nak.)'
  },
  {
    id: 'gl-q6',
    level: 1,
    questionTypeBadge: 'LKKT',
    question: 'Mennyi [1; 37]?',
    options: ['37', '1', '38', '74'],
    correctAnswer: 0,
    explanation: 'Az 1 és bármely pozitív egész szám legkisebb közös többszöröse maga az adott szám: [1; 37] = 37.'
  },
  {
    id: 'gl-q7',
    level: 1,
    questionTypeBadge: 'LKKT',
    question: 'Mennyi [18; 120]?',
    options: ['360', '2160', '720', '120'],
    correctAnswer: 0,
    explanation: '18 = 2 · 3², 120 = 2³ · 3 · 5. Minden prím a legnagyobb kitevőn: 2³ · 3² · 5 = 360. (2160 = 18 · 120 is közös többszörös, de nem a legkisebb.)'
  },
  {
    id: 'gl-q8',
    level: 1,
    questionTypeBadge: 'Szöveges',
    question: 'Egy 240 cm és egy 320 cm széles falat egyforma, függőleges tapétacsíkokkal borítunk, mindkét falra egész számú csík kerül. Legfeljebb milyen széles lehet egy csík?',
    figure: <WallFig />,
    options: ['80 cm', '40 cm', '160 cm', '960 cm'],
    correctAnswer: 0,
    explanation: 'A csík szélessége mindkét szám osztója, a legnagyobb ilyen: (240; 320) = 80. Ekkor 3 és 4 csík kell.'
  },
  {
    id: 'gl-q9',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Hány közös többszöröse van két pozitív egész számnak?',
    options: ['Végtelen sok', 'Véges sok', 'Pontosan egy', 'Annyi, ahány osztója van a kisebbiknek'],
    correctAnswer: 0,
    explanation: 'A két szám szorzata közös többszörös, és ennek minden többszöröse is az – így végtelen sok van. A közös osztókból viszont véges sok.'
  },
  {
    id: 'gl-q10',
    level: 1,
    questionTypeBadge: 'LNKO',
    question: 'Mennyi (12; 36; 144)?',
    options: ['12', '36', '144', '6'],
    correctAnswer: 0,
    explanation: 'A 12 osztója a 36-nak és a 144-nek is, és nagyobb közös osztó nem lehet a legkisebb számnál: (12; 36; 144) = 12. (A 6 közös osztó, de nem a legnagyobb.)'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'gl-q11',
    level: 2,
    questionTypeBadge: 'LNKO',
    question: 'Mennyi (675; 495)?',
    options: ['45', '15', '135', '9'],
    correctAnswer: 0,
    explanation: '675 = 3³ · 5², 495 = 3² · 5 · 11. Közös prímek a legkisebb kitevőn: 3² · 5 = 45.'
  },
  {
    id: 'gl-q12',
    level: 2,
    questionTypeBadge: 'LNKO',
    question: 'Mennyi (1176; 252)?',
    options: ['84', '42', '28', '168'],
    correctAnswer: 0,
    explanation: '1176 = 2³ · 3 · 7², 252 = 2² · 3² · 7. LNKO: 2² · 3 · 7 = 84.'
  },
  {
    id: 'gl-q13',
    level: 2,
    questionTypeBadge: 'LNKO',
    question: 'Mennyi (288; 528; 936)?',
    options: ['24', '48', '12', '8'],
    correctAnswer: 0,
    explanation: '288 = 2⁵ · 3², 528 = 2⁴ · 3 · 11, 936 = 2³ · 3² · 13. Mindháromban közös: 2³ · 3 = 24.'
  },
  {
    id: 'gl-q14',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'A Venn-diagram a 4536 és az 528 prímtényezőit mutatja. Mennyi a két szám legnagyobb közös osztója (a metszet szorzata)?',
    figure: <VennFig />,
    options: ['24', '48', '8', '1296'],
    correctAnswer: 0,
    explanation: 'A metszetben a közös prímtényezők állnak a kisebbik kitevőn: 2³ · 3 = 24. (1296 = 2⁴ · 3⁴ a legnagyobb kitevőkkel – hibás.)'
  },
  {
    id: 'gl-q15',
    level: 2,
    questionTypeBadge: 'LKKT',
    question: 'Mennyi [36; 180]?',
    options: ['180', '6480', '36', '360'],
    correctAnswer: 0,
    explanation: 'A 180 többszöröse a 36-nak (180 = 5 · 36), ezért ő maga a legkisebb közös többszörös.'
  },
  {
    id: 'gl-q16',
    level: 2,
    questionTypeBadge: 'LKKT',
    question: 'Mennyi [15; 22]?',
    options: ['330', '165', '37', '660'],
    correctAnswer: 0,
    explanation: '(15; 22) = 1, relatív prímek, így a legkisebb közös többszörösük a szorzatuk: 15 · 22 = 330.'
  },
  {
    id: 'gl-q17',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Egyszerűsítsd a 477/318 törtet a számláló és a nevező legnagyobb közös osztójával!',
    options: ['3/2', '5/3', '4/3', '7/5'],
    correctAnswer: 0,
    explanation: '477 = 3² · 53, 318 = 2 · 3 · 53, LNKO = 3 · 53 = 159. 477 : 159 = 3, 318 : 159 = 2, tehát 3/2.'
  },
  {
    id: 'gl-q18',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Egyszerűsítsd a 618/1545 törtet!',
    options: ['2/5', '3/5', '1/3', '2/3'],
    correctAnswer: 0,
    explanation: '618 = 2 · 3 · 103, 1545 = 3 · 5 · 103, LNKO = 309. 618 : 309 = 2, 1545 : 309 = 5, tehát 2/5.'
  },
  {
    id: 'gl-q19',
    level: 2,
    questionTypeBadge: 'Euklideszi algoritmus',
    question: 'Az ábrán az euklideszi algoritmus lépései láthatók. Mennyi (675; 495)?',
    figure: <EuclidFig />,
    options: ['45', '135', '180', '3'],
    correctAnswer: 0,
    explanation: 'A legnagyobb közös osztó az utolsó nem nulla maradék: 45. (A 3 egy hányados, nem maradék.)'
  },
  {
    id: 'gl-q20',
    level: 2,
    questionTypeBadge: 'Szöveges',
    question: 'A díjakra szánt összeget 6, 8 vagy 10 díjazott között is egyenlően kell tudni elosztani úgy, hogy minden díj ezerrel osztható legyen. Mekkora a legkisebb ilyen összeg?',
    figure: <MultiplesFig />,
    options: ['120 000 Ft', '480 000 Ft', '240 000 Ft', '60 000 Ft'],
    correctAnswer: 0,
    explanation: '[6; 8; 10] = 2³ · 3 · 5 = 120, tehát 120 000 Ft (fejenként 20 000, 15 000, illetve 12 000 Ft). A 480 = 6 · 8 · 10 nem a legkisebb.'
  },

  // LEVEL 3: Alkalmazások (21–30)
  {
    id: 'gl-q21',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'Legfeljebb 200 000 Ft-ot szánhatunk díjakra, és az összegnek 6, 8 és 10 egyenlő részre is oszthatónak kell lennie (a díj tetszőleges egész Ft). Mekkora a legnagyobb ilyen összeg?',
    options: ['199 920 Ft', '199 800 Ft', '200 000 Ft', '199 980 Ft'],
    correctAnswer: 0,
    explanation: 'Az összeg a 120 többszöröse: 200 000 : 120 ≈ 1666,7, így 1666 · 120 = 199 920 Ft. (199 800 is jó többszörös, de nem a legnagyobb; 200 000 nem osztható 6-tal, 199 980 nem osztható 8-cal.)'
  },
  {
    id: 'gl-q22',
    level: 3,
    questionTypeBadge: 'Közös többszörös',
    question: 'Hány olyan közös többszöröse van a 16-nak, a 20-nak és a 24-nek, amely 1000 és 2000 közé esik?',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: '[16; 20; 24] = 2⁴ · 3 · 5 = 240. Többszörösei 1000 és 2000 között: 1200, 1440, 1680, 1920 – 4 darab.'
  },
  {
    id: 'gl-q23',
    level: 3,
    questionTypeBadge: 'Négyzetekre bontás',
    question: 'Egy 84 cm × 126 cm-es téglalapot egyforma, egész cm oldalú négyzetekre bontunk. Legalább hány négyzet keletkezik?',
    figure: <RectFig label="? db" />,
    options: ['6', '4', '12', '21'],
    correctAnswer: 0,
    explanation: 'A legnagyobb négyzet oldala (84; 126) = 42 cm, így 2 · 3 = 6 négyzet keletkezik.'
  },
  {
    id: 'gl-q24',
    level: 3,
    questionTypeBadge: 'Négyzet kirakása',
    question: 'Egybevágó, 84 cm × 126 cm-es téglalapokból (hosszabb oldalaik párhuzamosak) négyzetet rakunk ki. Mekkora a legkisebb kirakható négyzet oldala?',
    options: ['252 cm', '126 cm', '504 cm', '210 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet oldala mindkét méret többszöröse: [84; 126] = 252 cm (3 · 2 = 6 téglalap). Az 504 is jó, de nem a legkisebb; 210 nem többszöröse a 84-nek.'
  },
  {
    id: 'gl-q25',
    level: 3,
    questionTypeBadge: 'LNKO · LKKT',
    question: 'Két pozitív egész szám szorzata 2160, legnagyobb közös osztójuk 6. Mennyi a legkisebb közös többszörösük?',
    options: ['360', '12 960', '2154', '180'],
    correctAnswer: 0,
    explanation: 'Két számra (a; b) · [a; b] = a · b, így [a; b] = 2160 : 6 = 360. (Pl. 18 és 120.)'
  },
  {
    id: 'gl-q26',
    level: 3,
    questionTypeBadge: 'LNKO · LKKT',
    question: 'Melyik az a pozitív egész c, amelyre (24; c) = 8 és [24; c] = 48?',
    options: ['16', '8', '48', '32'],
    correctAnswer: 0,
    explanation: '24 · c = 8 · 48 = 384, így c = 16. Ellenőrzés: 16 = 2⁴, 24 = 2³ · 3 ⇒ LNKO 2³ = 8, LKKT 2⁴ · 3 = 48. (32-re az LKKT 96 lenne.)'
  },
  {
    id: 'gl-q27',
    level: 3,
    questionTypeBadge: 'Ciklusok',
    question: 'Két aukció egyszerre indul, az egyik 8, a másik 6 naponként indul újra. Legközelebb hány nap múlva indulnak újra egyszerre?',
    options: ['24', '48', '14', '12'],
    correctAnswer: 0,
    explanation: 'Közös indulás a 8 és a 6 közös többszöröseinél van, először [8; 6] = 24 nap múlva. (48 = 8 · 6 csak a második alkalom.)'
  },
  {
    id: 'gl-q28',
    level: 3,
    questionTypeBadge: 'Burkolás',
    question: 'Egy 3,3 m × 4,2 m-es padlót egyforma, egész cm oldalú négyzetes lapokkal, hézag nélkül burkolunk, a lehető legkevesebb lappal. Mekkora a lap oldala?',
    figure: <RectFig label="lap: ? cm" w="4,2 m" h="3,3 m" />,
    options: ['30 cm', '10 cm', '15 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A lap oldala a 330 és a 420 közös osztója, a legkevesebb lap a legnagyobb közös osztónál: (330; 420) = 30 cm, 11 · 14 = 154 lap.'
  },
  {
    id: 'gl-q29',
    level: 3,
    questionTypeBadge: 'Törtek',
    question: 'Mennyi 15/242 + 5/99, ha a nevezők legkisebb közös többszörösét használjuk közös nevezőnek?',
    options: ['245/2178', '20/341', '245/23958', '140/2178'],
    correctAnswer: 0,
    explanation: '242 = 2 · 11², 99 = 3² · 11, [242; 99] = 2 · 3² · 11² = 2178. 15 · 9 + 5 · 22 = 135 + 110 = 245, tehát 245/2178.'
  },
  {
    id: 'gl-q30',
    level: 3,
    questionTypeBadge: 'Ráadás',
    question: 'Melyik szám tökéletes (egyenlő a nála kisebb osztóinak összegével)?',
    options: ['28', '12', '34', '100'],
    correctAnswer: 0,
    explanation: '28 = 1 + 2 + 4 + 7 + 14. A 12 bővelkedő (1 + 2 + 3 + 4 + 6 = 16), a 34 szűkölködő (20), a 100 bővelkedő (117).'
  }
];

export const GcdLcmQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-lnko-lkkt-quiz"
      subtopicId="lnko-lkkt"
      title="3. Legnagyobb közös osztó, legkisebb közös többszörös – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: LNKO, LKKT, relatív prímek, euklideszi algoritmus és szöveges feladatok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={GCD_LCM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Legnagyobb közös osztó',
          items: [
            '(a; b): a közös osztók közül a legnagyobb',
            'Közös prímtényezők a legkisebb hatványon',
            '(4536; 528) = 2³ · 3 = 24',
            '(a; b) = 1 ⇒ relatív prímek, pl. (22; 75)'
          ]
        },
        {
          title: 'Legkisebb közös többszörös',
          items: [
            '[a; b]: a közös pozitív többszörösök közül a legkisebb',
            'Minden prímtényező a legnagyobb hatványon',
            '[18; 120] = 360; [6; 8; 10] = 120',
            '(a; b) · [a; b] = a · b'
          ]
        },
        {
          title: 'Euklidesz és alkalmazások',
          items: [
            'a = q · b + r ⇒ (a; b) = (b; r); az utolsó nem 0 maradék az LNKO',
            'Egyenlő részekre bontás (csík, lap): LNKO',
            'Ciklusok találkozása, kirakott négyzet: LKKT',
            '84 × 126: 42 cm-es négyzet; 252 cm-es négyzet'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GcdLcmMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <GcdLcmSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default GcdLcmQuiz;
