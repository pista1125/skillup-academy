import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PasswordsMatcher } from './PasswordsMatcher';
import { PasswordsSorter } from './PasswordsSorter';

const FIG_CLASS = 'w-full max-w-[300px] h-auto mx-auto';

/** Karakterkészlet és üres „rekeszek” – a kérdőjelek a még ismeretlen választásokat jelzik. */
const slotFigure = (chars: string[], slots: string[], caption: string) => (
  <svg viewBox="0 0 260 130" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="126" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {chars.map((c, i) => {
      const step = Math.min(34, 236 / chars.length);
      const x0 = 130 - ((chars.length - 1) * step) / 2;
      return (
        <g key={c + i}>
          <circle cx={x0 + i * step} cy={26} r="12" fill="#ffffff" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x={x0 + i * step} y={31} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">
            {c}
          </text>
        </g>
      );
    })}
    {slots.map((s, i) => {
      const w = 40;
      const gap = 12;
      const x0 = 130 - (slots.length * w + (slots.length - 1) * gap) / 2;
      const fixed = s !== '?';
      return (
        <g key={i}>
          <rect
            x={x0 + i * (w + gap)}
            y={56}
            width={w}
            height={36}
            rx="7"
            fill={fixed ? '#fef3c7' : '#eef2ff'}
            stroke={fixed ? '#d97706' : '#6366f1'}
            strokeWidth="1.8"
          />
          <text x={x0 + i * (w + gap) + w / 2} y={80} fontSize="16" fontWeight="bold" textAnchor="middle" fill={fixed ? '#92400e' : '#4338ca'}>
            {s}
          </text>
        </g>
      );
    })}
    <text x="130" y="116" fontSize="11" textAnchor="middle" fill="#475569">
      {caption}
    </text>
  </svg>
);

const PW_FIG_BENDI = slotFigure(['B', 'e', 'n', '1', '7'], ['?', '?', '?'], '3 karakteres jelszó, rekeszenként hányféle?');
const PW_FIG_HAJNI = slotFigure(['H', 'a', 'j', 'n', 'i', '1', '9'], ['?', '?', '?', '?'], '4 karakteres jelszó');
const PW_FIG_THIRD8 = slotFigure(['0', '1', '2', '…', '9'], ['?', '?', '8', '?'], 'négyjegyű szám, a 3. jegy rögzített');
const PW_FIG_THIRD4 = slotFigure(['0', '1', '2', '…', '9'], ['?', '?', '4', '?'], 'különböző jegyek, a 3. jegy a 4-es');

const PW_FIG_TEST = (
  <svg viewBox="0 0 260 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="146" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 6 }, (_, r) => (
      <g key={r}>
        <text x="30" y={26 + r * 21} fontSize="11" fontWeight="bold" textAnchor="end" fill="#334155">
          {r + 1}.
        </text>
        {['A', 'B', 'C', 'D'].map((l, c) => (
          <g key={l}>
            <circle cx={55 + c * 34} cy={22 + r * 21} r="8" fill="#ffffff" stroke="#6366f1" strokeWidth="1.4" />
            <text x={55 + c * 34} y={26 + r * 21} fontSize="9" textAnchor="middle" fill="#4338ca">
              {l}
            </text>
          </g>
        ))}
      </g>
    ))}
    <text x="200" y="70" fontSize="11" textAnchor="middle" fill="#475569">6 kérdés,</text>
    <text x="200" y="86" fontSize="11" textAnchor="middle" fill="#475569">A, B, C, D</text>
  </svg>
);

const PW_FIG_LOGO = (
  <svg viewBox="0 0 260 140" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="136" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="20" y="55" width="140" height="34" rx="6" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
    <polygon points="26,49 126,49 126,32 156,55 26,55" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
    <polygon points="154,95 54,95 54,112 24,89 154,89" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
    <text x="90" y="77" fontSize="11" textAnchor="middle" fill="#334155">középső rész</text>
    <text x="80" y="50" fontSize="10" textAnchor="middle" fill="#334155">1. nyíl</text>
    <text x="100" y="105" fontSize="10" textAnchor="middle" fill="#334155">2. nyíl</text>
    {['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#f97316', '#a855f7'].map((c, i) => (
      <circle key={c} cx={190 + (i % 2) * 30} cy={40 + Math.floor(i / 2) * 30} r="10" fill={c} stroke="#0f172a" strokeWidth="0.8" />
    ))}
    <text x="205" y="130" fontSize="10" textAnchor="middle" fill="#475569">6 szín</text>
  </svg>
);

const PASSWORDS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Rekeszek, szorzási szabály (1–10)
  {
    id: 'pw-q1',
    level: 1,
    questionTypeBadge: 'Ismétlés nélkül',
    figure: PW_FIG_BENDI,
    question: 'Bendi jelszava 3 karakteres, a {B; e; n; 1; 7} karakterekből áll, és mindhárom karakter különböző. Hány ilyen jelszó van?',
    options: ['60', '125', '15', '10'],
    correctAnswer: 0,
    explanation: 'Az első rekeszbe 5-féle, a másodikba 4-féle, a harmadikba 3-féle karakter kerülhet: 5 · 4 · 3 = 60.'
  },
  {
    id: 'pw-q2',
    level: 1,
    questionTypeBadge: 'Ismétléssel',
    figure: PW_FIG_BENDI,
    question: 'Hány 3 karakteres jelszó készíthető a {B; e; n; 1; 7} karakterekből, ha a karakterek ismétlődhetnek?',
    options: ['125', '60', '15', '243'],
    correctAnswer: 0,
    explanation: 'Mindhárom rekeszbe 5-féle karakter kerülhet: 5 · 5 · 5 = 5³ = 125. (A 243 = 3⁵ a kitevő és az alap felcserélése.)'
  },
  {
    id: 'pw-q3',
    level: 1,
    questionTypeBadge: 'Ismétléssel',
    question: 'Hány különböző 4 jegyű PIN-kód van, ha a kód bármely számjeggyel kezdődhet, és a jegyek ismétlődhetnek?',
    options: ['10 000', '5040', '9999', '40'],
    correctAnswer: 0,
    explanation: 'Mind a 4 helyre 10-féle számjegy kerülhet: 10⁴ = 10 000 (0000-tól 9999-ig).'
  },
  {
    id: 'pw-q4',
    level: 1,
    questionTypeBadge: 'Ismétlés nélkül',
    figure: PW_FIG_HAJNI,
    question: 'Hajni a {H; a; j; n; i; 1; 9} halmaz elemeiből 4 karakteres jelszavakat készít úgy, hogy nincs két egyforma karakter. Hányféle jelszót gyárthat?',
    options: ['840', '2401', '28', '35'],
    correctAnswer: 0,
    explanation: '7 · 6 · 5 · 4 = 840. (A 2401 = 7⁴ az ismétléses eset, a 28 = 7 · 4 értelmetlen szorzat.)'
  },
  {
    id: 'pw-q5',
    level: 1,
    questionTypeBadge: 'Ismétléssel',
    figure: PW_FIG_HAJNI,
    question: 'Hajni a {H; a; j; n; i; 1; 9} halmaz elemeiből 4 karakteres jelszót készít, a karakterek ismétlődhetnek. Hányféle jelszó lehetséges?',
    options: ['2401', '840', '28', '16 384'],
    correctAnswer: 0,
    explanation: 'Minden rekeszbe 7-féle karakter kerülhet: 7⁴ = 2401. (A 16 384 = 4⁷, felcserélt alap és kitevő.)'
  },
  {
    id: 'pw-q6',
    level: 1,
    questionTypeBadge: 'Ismétléssel',
    question: 'Csilla jelszavai 10 karakter hosszúak, és a karakterek a {C; a} halmazból kerülnek ki. Hány különböző jelszót készíthet?',
    options: ['1024', '20', '100', '512'],
    correctAnswer: 0,
    explanation: 'Mind a 10 rekeszbe 2-féle karakter kerülhet: 2¹⁰ = 1024.'
  },
  {
    id: 'pw-q7',
    level: 1,
    questionTypeBadge: 'Ismétléssel',
    figure: PW_FIG_TEST,
    question: 'Egy 6 kérdéses tesztben minden kérdésnél az A, B, C, D közül kell egyet bekarikázni. Hány kitöltés van, ha minden kérdésre válaszolunk?',
    options: ['4096', '1296', '24', '360'],
    correctAnswer: 0,
    explanation: 'Kérdésenként 4 lehetőség, 6 kérdés: 4⁶ = 4096. (Az 1296 = 6⁴ felcserélt alap és kitevő.)'
  },
  {
    id: 'pw-q8',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Miért szorozzuk össze a rekeszekbe írt számokat?',
    options: [
      'Mert az előző döntések minden kimeneteléhez ugyanannyi folytatás tartozik',
      'Mert a rekeszek egymástól függetlenül bármilyen sorrendben összeadhatók',
      'Mert a lehetőségek száma mindig a karakterek számának négyzete',
      'Mert így kapjuk meg a rekeszek számát'
    ],
    correctAnswer: 0,
    explanation: 'Az első karakter mind az 5 választásához 4-féle második társul (5 · 4 eset), és mindegyikhez 3-féle harmadik: ezért szorzunk.'
  },
  {
    id: 'pw-q9',
    level: 1,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Melyik feladatban számít a kiválasztás sorrendje?',
    options: [
      'Egy 20 fős osztályból elnököt, titkárt és pénztárost választunk',
      'Egy 20 fős osztályból 3 fős küldöttséget választunk',
      'A 90 számból kihúznak 5 lottószámot',
      'A polcról 2 könyvet választunk, amelyeket elviszünk a nyaralásra'
    ],
    correctAnswer: 0,
    explanation: 'A kiválasztott tanulók különböző „szerepbe” kerülnek (elnök, titkár, pénztáros), így számít a sorrend. A többi esetben csak az számít, kik vagy mik kerülnek kiválasztásra.'
  },
  {
    id: 'pw-q10',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Egy étteremben 5-féle leves, 4-féle főétel és 3-féle desszert közül lehet választani. Hányféle háromfogásos ebéd állítható össze?',
    options: ['60', '12', '20', '15'],
    correctAnswer: 0,
    explanation: 'A három döntés egymás után: 5 · 4 · 3 = 60 ebéd.'
  },

  // LEVEL 2: Ismétlés, megkötések (11–20)
  {
    id: 'pw-q11',
    level: 2,
    questionTypeBadge: 'Ismétléssel',
    figure: PW_FIG_TEST,
    question: 'A 6 kérdéses (A, B, C, D válaszos) tesztnél az is lehet, hogy valamelyik vagy akár az összes kérdésre nem karikázunk semmit. Hány kitöltés van?',
    options: ['15 625', '4096', '16 384', '7776'],
    correctAnswer: 0,
    explanation: 'Kérdésenként 5 lehetőség van (A, B, C, D vagy semmi): 5⁶ = 15 625.'
  },
  {
    id: 'pw-q12',
    level: 2,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány négyjegyű szám van?',
    options: ['9000', '10 000', '9999', '5040'],
    correctAnswer: 0,
    explanation: 'Az első jegy nem lehet 0 (9-féle), a többi 10-féle: 9 · 10 · 10 · 10 = 9000.'
  },
  {
    id: 'pw-q13',
    level: 2,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány olyan négyjegyű szám van, amelyben minden számjegy különböző?',
    options: ['4536', '5040', '3024', '6561'],
    correctAnswer: 0,
    explanation: 'Első jegy: 9-féle (nem 0); második: 9-féle (a 0 már lehet, az első nem); aztán 8 és 7: 9 · 9 · 8 · 7 = 4536. (5040 = 10 · 9 · 8 · 7 a 0-val kezdődőket is számolja.)'
  },
  {
    id: 'pw-q14',
    level: 2,
    questionTypeBadge: 'Négyjegyű számok',
    figure: PW_FIG_THIRD8,
    question: 'Hány olyan négyjegyű szám van, amelyben a jegyek ismétlődhetnek, és a harmadik számjegy a 8-as?',
    options: ['900', '1000', '729', '810'],
    correctAnswer: 0,
    explanation: 'A harmadik rekesz rögzített (1-féle), az első 9-féle, a második és a negyedik 10-féle: 9 · 10 · 1 · 10 = 900.'
  },
  {
    id: 'pw-q15',
    level: 2,
    questionTypeBadge: 'Megkötéses kiválasztás',
    question: 'A budapesti telefonszámok hétjegyűek, és nem kezdődhetnek 0-val. Hány ilyen telefonszám létezhet?',
    options: ['9 000 000', '10 000 000', '9 999 999', '604 800'],
    correctAnswer: 0,
    explanation: 'Első jegy 9-féle, a további 6 jegy 10-féle: 9 · 10⁶ = 9 000 000.'
  },
  {
    id: 'pw-q16',
    level: 2,
    questionTypeBadge: 'Ismétlés nélkül',
    figure: PW_FIG_LOGO,
    question: 'Egy logó 3 tartományát 6 szín (piros, sárga, kék, zöld, narancs, lila) valamelyikével színezik, minden tartomány más színű. Hányféle színezés van?',
    options: ['120', '216', '18', '20'],
    correctAnswer: 0,
    explanation: '6 · 5 · 4 = 120. (A 216 = 6³ az az eset, amikor a színek ismétlődhetnek.)'
  },
  {
    id: 'pw-q17',
    level: 2,
    questionTypeBadge: 'Ismétlés nélkül',
    question: 'Az angol ábécé 26 betűjéből hány 6 karakteres jelszó készíthető, ha nincs ismétlődés?',
    options: ['165 765 600', '308 915 776', '230 230', '156'],
    correctAnswer: 0,
    explanation: '26 · 25 · 24 · 23 · 22 · 21 = 165 765 600. (308 915 776 = 26⁶ az ismétléses eset.)'
  },
  {
    id: 'pw-q18',
    level: 2,
    questionTypeBadge: 'Ismétlés nélkül',
    question: 'Hány olyan háromjegyű szám van, amelynek minden számjegye különböző?',
    options: ['648', '720', '900', '504'],
    correctAnswer: 0,
    explanation: '9 · 9 · 8 = 648. (720 = 10 · 9 · 8 a 0-val kezdődőket is tartalmazza.)'
  },
  {
    id: 'pw-q19',
    level: 2,
    questionTypeBadge: 'Ismétlés nélkül',
    question: '5 különböző sportszert sorsolunk ki 20 tanuló között, egy tanuló legfeljebb egy sportszert kaphat. Hány eredménye lehet a sorsolásnak?',
    options: ['1 860 480', '3 200 000', '15 504', '100'],
    correctAnswer: 0,
    explanation: 'Az 1. sportszer 20, a 2. 19, … az 5. 16 tanulóhoz kerülhet: 20 · 19 · 18 · 17 · 16 = 1 860 480.'
  },
  {
    id: 'pw-q20',
    level: 2,
    questionTypeBadge: 'Ismétléssel',
    question: '5 különböző sportszert sorsolunk ki 20 tanuló között, egy tanuló több sportszert is kaphat. Hány eredménye lehet a sorsolásnak?',
    options: ['20⁵ = 3 200 000', '5²⁰', '1 860 480', '100'],
    correctAnswer: 0,
    explanation: 'Mind az 5 sportszer („rekesz”) 20-féle tanulóhoz kerülhet: 20⁵ = 3 200 000. A rekeszek a sportszerek, nem a tanulók – ezért nem 5²⁰.'
  },

  // LEVEL 3: Összetett megkötések (21–30)
  {
    id: 'pw-q21',
    level: 3,
    questionTypeBadge: 'Négyjegyű számok',
    figure: PW_FIG_THIRD4,
    question: 'Hány olyan négyjegyű szám van, amelyben minden számjegy különböző, és a harmadik számjegy a 4-es?',
    options: ['448', '504', '567', '720'],
    correctAnswer: 0,
    explanation: 'Először a 3. rekesz (1). Az első jegy nem lehet 0 és 4: 8-féle; a második nem lehet az első és a 4: 8-féle; a negyedik 7-féle: 8 · 8 · 1 · 7 = 448.'
  },
  {
    id: 'pw-q22',
    level: 3,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány olyan négyjegyű szám van, amelynek minden számjegye páros (a jegyek ismétlődhetnek)?',
    options: ['500', '625', '256', '96'],
    correctAnswer: 0,
    explanation: 'Páros jegyek: 0, 2, 4, 6, 8. Az első nem lehet 0 (4-féle), a többi 5-féle: 4 · 5 · 5 · 5 = 500.'
  },
  {
    id: 'pw-q23',
    level: 3,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány olyan négyjegyű szám van, amelyben minden számjegy különböző és páros?',
    options: ['96', '120', '500', '625'],
    correctAnswer: 0,
    explanation: 'Első jegy: 2, 4, 6, 8 (4-féle); utána a maradék 4 páros jegyből 4, 3, 2: 4 · 4 · 3 · 2 = 96. (120 = 5 · 4 · 3 · 2 a 0-val kezdődőket is számolja.)'
  },
  {
    id: 'pw-q24',
    level: 3,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány olyan négyjegyű szám van, amelynek minden számjegye különböző, és nem szerepel benne a 7-es számjegy?',
    options: ['2688', '3024', '3584', '2401'],
    correctAnswer: 0,
    explanation: 'Használható jegyek: 0–6, 8, 9 (9 darab). Első: 8-féle (nem 0), majd 8, 7, 6: 8 · 8 · 7 · 6 = 2688.'
  },
  {
    id: 'pw-q25',
    level: 3,
    questionTypeBadge: 'Megkötéses kiválasztás',
    question: '5 különböző sportszert sorsolunk ki 20 tanuló között. Konrád pontosan egy sportszert kap, a többiek legfeljebb egyet. Hány eredménye lehet a sorsolásnak?',
    options: ['465 120', '93 024', '651 605', '1 860 480'],
    correctAnswer: 0,
    explanation: 'Konrád sportszere 5-féle lehet; a maradék 4 sportszer a többi 19 tanulóhoz kerül, mindenkihez legfeljebb egy: 19 · 18 · 17 · 16. Összesen 5 · 93 024 = 465 120.'
  },
  {
    id: 'pw-q26',
    level: 3,
    questionTypeBadge: 'Megkötéses kiválasztás',
    question: 'Egy üzemi étteremben 4-féle főétel és 3-féle desszert van. Hányféle leves lehet a kínálatban, ha a háromfogásos ebédek száma több mint 50 és kevesebb mint 80?',
    options: ['5 vagy 6', 'csak 6', '4, 5 vagy 6', '5, 6 vagy 7'],
    correctAnswer: 0,
    explanation: 'x-féle leves esetén 12x ebéd van: 50 < 12x < 80 ⇒ 4,17 < x < 6,67, tehát x = 5 (60 ebéd) vagy x = 6 (72 ebéd).'
  },
  {
    id: 'pw-q27',
    level: 3,
    questionTypeBadge: 'Megkötéses kiválasztás',
    figure: PW_FIG_LOGO,
    question: 'A logó 3 tartományát (középső rész és két nyíl) 6 színnel színezzük. A két nyíl akár egyforma színű is lehet, de a középső résztől mindkettő eltér. Hány színezés van?',
    options: ['150', '180', '216', '120'],
    correctAnswer: 0,
    explanation: 'Először a középső részt színezzük (6-féle), majd mindkét nyíl 5-féle lehet: 6 · 5 · 5 = 150.'
  },
  {
    id: 'pw-q28',
    level: 3,
    questionTypeBadge: 'Négyjegyű számok',
    question: 'Hány olyan páros négyjegyű szám van, amelynek minden számjegye különböző?',
    options: ['2296', '2268', '2520', '1792'],
    correctAnswer: 0,
    explanation: 'Utolsó jegy 0: 9 · 8 · 7 = 504. Utolsó jegy 2, 4, 6 vagy 8: az első nem lehet 0 és az utolsó (8-féle), majd 8 és 7: 4 · 8 · 8 · 7 = 1792. Összesen 2296.'
  },
  {
    id: 'pw-q29',
    level: 3,
    questionTypeBadge: 'Ismétléssel',
    question: 'Legalább hány karakter hosszúnak kell lennie egy csak a {C; a} karakterekből álló jelszónak, hogy legalább 1000 különböző jelszó legyen?',
    options: ['10', '9', '500', '8'],
    correctAnswer: 0,
    explanation: '2⁹ = 512 < 1000, de 2¹⁰ = 1024 ≥ 1000, tehát legalább 10 karakter kell.'
  },
  {
    id: 'pw-q30',
    level: 3,
    questionTypeBadge: 'Ismétléssel',
    question: '36 karakterből (26 betű + 10 számjegy) készítünk jelszót, a karakterek ismétlődhetnek. Hányszor több 7 karakteres jelszó van, mint 6 karakteres?',
    options: ['36-szor', '7/6-szor', '6-szor', '7-szer'],
    correctAnswer: 0,
    explanation: '36⁷ : 36⁶ = 36. Egy karakterrel hosszabb jelszó n-szer annyi lehetőséget ad – ezért erősebb a hosszabb jelszó.'
  }
];

export const PasswordsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId="g11-comb-jelszavak-quiz"
      subtopicId="jelszavak"
      title="1. Jelszavak – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: rekeszes összeszámlálás, ismétléssel és ismétlés nélkül, megkötésekkel."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={PASSWORDS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Rekeszes összeszámlálás',
          items: [
            'Minden helynek egy rekesz felel meg, rögzített sorrendben.',
            'A rekeszekbe a lehetőségek számát írjuk, majd összeszorozzuk.',
            'Ismétlés nélkül: n · (n − 1) · (n − 2) · …',
            'Ismétléssel: n · n · n · … = nᵏ'
          ]
        },
        {
          title: 'Megkötések',
          items: [
            'Számnál az első jegy nem lehet 0.',
            'A rögzített vagy megkötött rekeszt töltsd ki először!',
            'Üresen hagyható kérdés = +1 lehetőség kérdésenként.',
            'Mi a rekesz? Az, aminek „választunk” (karakterhely, sportszer, tartomány).'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Bendi: 5 · 4 · 3 = 60; 5³ = 125',
            'Hajni: 840 és 2401; Csilla: 2¹⁰ = 1024; teszt: 4096 és 15 625',
            'Négyjegyű: 9000; különböző jegyű: 4536; 3. jegy 8: 900; 3. jegy 4, különböző: 448',
            'Mind páros: 500; különböző és páros: 96; nincs 7-es, különböző: 2688'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PasswordsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PasswordsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PasswordsQuiz;
