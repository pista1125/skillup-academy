import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CaseAnalysisMatcher } from './CaseAnalysisMatcher';
import { CaseAnalysisSorter } from './CaseAnalysisSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** 3 × 3-as tábla, opcionálisan bástyákkal. */
const BoardFig: React.FC<{ rooks?: { r: number; c: number; fill: string }[]; note?: string }> = ({ rooks = [], note }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {['A', 'B', 'C'].map((l, i) => (
      <text key={l} x={52 + i * 36} y="14" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">{l}</text>
    ))}
    {[1, 2, 3].map((l, i) => (
      <text key={l} x="24" y={40 + i * 36} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">{l}</text>
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={34 + (i % 3) * 36} y={20 + Math.floor(i / 3) * 36} width="36" height="36" fill={(i + Math.floor(i / 3)) % 2 ? '#fde68a' : '#fffbeb'} stroke="#92400e" />
    ))}
    {rooks.map((rk, i) => (
      <g key={i} fill={rk.fill} stroke="#0f172a" strokeWidth="1.2">
        <rect x={34 + rk.c * 36 + 9} y={20 + rk.r * 36 + 24} width="18" height="6" rx="1" />
        <rect x={34 + rk.c * 36 + 11} y={20 + rk.r * 36 + 12} width="14" height="12" />
        <rect x={34 + rk.c * 36 + 10} y={20 + rk.r * 36 + 6} width="16" height="6" />
      </g>
    ))}
    <text x="190" y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">{note ?? '? elhelyezés'}</text>
  </svg>
);

const FlagFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <line x1="40" y1="15" x2="40" y2="140" stroke="#475569" strokeWidth="3" />
    {['felső', 'középső', 'alsó'].map((l, i) => (
      <g key={l}>
        <rect x="42" y={18 + i * 30} width="110" height="30" fill="#f8fafc" stroke="#334155" />
        <text x="97" y={38 + i * 30} fontSize="12" textAnchor="middle" fill="#334155">{l}: ?</text>
      </g>
    ))}
    {['#ef4444', '#facc15', '#22c55e', '#3b82f6'].map((c, i) => (
      <circle key={c} cx={180 + (i % 2) * 26} cy={40 + Math.floor(i / 2) * 26} r="10" fill={c} stroke="#334155" />
    ))}
    <text x="193" y="110" fontSize="10" textAnchor="middle" fill="#475569">4 szín</text>
  </svg>
);

const DiceFig: React.FC<{ count: number; text: string }> = ({ count, text }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: count }, (_, i) => {
      const x = 120 - (count * 46) / 2 + i * 46 + 4;
      return (
        <g key={i}>
          <rect x={x} y="30" width="38" height="38" rx="7" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <text x={x + 19} y="56" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#7c3aed">?</text>
        </g>
      );
    })}
    <text x="120" y="100" fontSize="12" textAnchor="middle" fill="#0f172a">{text}</text>
    <text x="120" y="124" fontSize="11" textAnchor="middle" fill="#64748b">hány dobássorozat?</text>
  </svg>
);

const PrizeFig: React.FC<{ students: number; prizes: number }> = ({ students, prizes }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: prizes }, (_, i) => (
      <g key={i}>
        <rect x={120 - prizes * 16 + i * 32 + 4} y="16" width="24" height="20" rx="3" fill="#0d9488" />
        <line x1={120 - prizes * 16 + i * 32 + 16} y1="16" x2={120 - prizes * 16 + i * 32 + 16} y2="36" stroke="#ffffff" strokeWidth="2" />
      </g>
    ))}
    {Array.from({ length: students }, (_, i) => {
      const per = Math.min(students, 10);
      const r = Math.floor(i / per);
      const c = i % per;
      return <circle key={i} cx={30 + c * 20 + (per < 10 ? (10 - per) * 10 : 0)} cy={70 + r * 26} r="8" fill="#cbd5e1" stroke="#475569" />;
    })}
    <text x="120" y="140" fontSize="11" textAnchor="middle" fill="#334155">{prizes} egyforma jutalom, {students} diák – ? lehetőség</text>
  </svg>
);

const TigerFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <circle cx={24 + i * 24} cy="24" r="9" fill={i < 4 ? '#2563eb' : '#db2777'} />
        <text x={24 + i * 24} y="28" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">{i < 4 ? 'H' : 'N'}</text>
      </g>
    ))}
    <rect x="14" y="56" width="80" height="60" rx="10" fill="#fff7ed" stroke="#c2410c" strokeDasharray="5 3" />
    <rect x="106" y="50" width="124" height="72" rx="10" fill="#fff7ed" stroke="#c2410c" strokeDasharray="5 3" />
    <text x="54" y="90" fontSize="18" textAnchor="middle" fill="#c2410c" fontWeight="bold">?</text>
    <text x="168" y="92" fontSize="18" textAnchor="middle" fill="#c2410c" fontWeight="bold">?</text>
    <text x="54" y="134" fontSize="10" textAnchor="middle" fill="#7c2d12">kisebb kifutó</text>
    <text x="168" y="138" fontSize="10" textAnchor="middle" fill="#7c2d12">nagyobb kifutó</text>
  </svg>
);

const RelayFig: React.FC<{ tie?: boolean }> = ({ tie }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="40" y={14 + i * 30} width="160" height="24" rx="6" fill={tie && i < 2 ? '#fef3c7' : '#f1f5f9'} stroke="#94a3b8" />
        <text x="54" y={31 + i * 30} fontSize="11" fontWeight="bold" fill="#334155">{tie ? (i < 2 ? '1.' : `${i + 1}.`) : `${i + 1}.`}</text>
        <text x="130" y={31 + i * 30} fontSize="12" textAnchor="middle" fill="#0f172a">{i === 3 ? 'nem a Delfinek' : '?'}</text>
      </g>
    ))}
    <text x="120" y="142" fontSize="10" textAnchor="middle" fill="#64748b">Delfinek, Halak, Vidrák, Cápák</text>
  </svg>
);

const CASE_ANALYSIS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A módszer és egyszerű esetek (1–10)
  {
    id: 'ca-q1',
    level: 1,
    questionTypeBadge: 'Módszer',
    question: 'Mit jelent az esetszétválasztás az összeszámlálási feladatokban?',
    options: [
      'A lehetőségeket egymást kizáró esetekre bontjuk, esetenként megszámoljuk, majd az eredményeket összeadjuk',
      'A lehetőségek számát elosztjuk az esetek számával',
      'Minden esetet kétszer számolunk, majd 2-vel osztunk',
      'Az eseteket összeszorozzuk'
    ],
    correctAnswer: 0,
    explanation: 'Az esetszétválasztásnál olyan szempontot választunk, amely szerint a lehetőségek tisztán szétválnak; az esetszámokat összeadjuk.'
  },
  {
    id: 'ca-q2',
    level: 1,
    questionTypeBadge: 'Módszer',
    question: 'Mikor adhatjuk össze az egyes esetek lehetőségeinek számát?',
    options: [
      'Ha az esetek kizárják egymást, és együtt minden lehetőséget lefednek',
      'Mindig, bármilyen esetekről van szó',
      'Csak ha minden esetben ugyanannyi lehetőség van',
      'Ha az esetek között átfedés van'
    ],
    correctAnswer: 0,
    explanation: 'Ha két eset egyszerre is bekövetkezhet, az átfedést kétszer számolnánk; ha egy eset kimarad, keveset kapunk.'
  },
  {
    id: 'ca-q3',
    level: 1,
    questionTypeBadge: 'Egyforma jutalmak',
    question: '3 egyforma jutalmat osztunk ki 12 diák között (egy diák többet is kaphat). Hány olyan lehetőség van, amelyben egyetlen diák kapja mind a hármat?',
    figure: <PrizeFig students={12} prizes={3} />,
    options: ['12', '1', '3', '36'],
    correctAnswer: 0,
    explanation: 'Csak azt kell eldönteni, ki kapja a jutalmakat: 12 lehetőség.'
  },
  {
    id: 'ca-q4',
    level: 1,
    questionTypeBadge: 'Egyforma jutalmak',
    question: '3 egyforma jutalmat osztunk ki 12 diák között. Hány olyan lehetőség van, amelyben három különböző diák kap 1-1 jutalmat?',
    options: ['220', '1320', '36', '132'],
    correctAnswer: 0,
    explanation: 'A jutalmak egyformák, csak az számít, melyik 3 diák kapja: (12 alatt 3) = 220. Az 1320 = 12 · 11 · 10 a sorrendet is figyelembe venné.'
  },
  {
    id: 'ca-q5',
    level: 1,
    questionTypeBadge: 'Bástyák',
    question: 'Hányféleképpen helyezhető el egy 3 × 3-as táblán egy fehér és egy fekete bástya úgy, hogy ne legyenek azonos sorban vagy oszlopban?',
    figure: <BoardFig rooks={[{ r: 0, c: 1, fill: '#ffffff' }]} note="fekete: ?" />,
    options: ['36', '18', '72', '81'],
    correctAnswer: 0,
    explanation: 'A fehér bástya 9 mezőre kerülhet, sorát és oszlopát kizárva a fekete 4 mezőre: 9 · 4 = 36.'
  },
  {
    id: 'ca-q6',
    level: 1,
    questionTypeBadge: 'Bástyák',
    question: 'Hányféleképpen helyezhető el a 3 × 3-as táblán két EGYFORMA bástya úgy, hogy ne üssék egymást?',
    figure: <BoardFig />,
    options: ['18', '36', '9', '12'],
    correctAnswer: 0,
    explanation: 'A két különböző színű bástyánál 36 elhelyezés van; egyforma bástyáknál a két bástya felcserélése ugyanazt adja: 36 / 2 = 18.'
  },
  {
    id: 'ca-q7',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'A gyorsváltó döntőjében 4 csapat van (Delfinek, Halak, Vidrák, Cápák). Hány sorrend lehetséges, ha a Delfinek biztosan nem a negyedikek?',
    figure: <RelayFig />,
    options: ['18', '6', '24', '12'],
    correctAnswer: 0,
    explanation: 'Összes sorrend 4! = 24, ebből a Delfinek negyedikek 3! = 6 esetben: 24 − 6 = 18.'
  },
  {
    id: 'ca-q8',
    level: 1,
    questionTypeBadge: 'Egyforma jutalmak',
    question: 'Egy 10 fős társaság tagjai között 3 egyforma csokit sorsolunk ki. Hányféle eredmény van, ha egy ember nyeri mindegyiket?',
    options: ['10', '1', '30', '120'],
    correctAnswer: 0,
    explanation: 'Csak a nyertest kell kiválasztani: 10 lehetőség.'
  },
  {
    id: 'ca-q9',
    level: 1,
    questionTypeBadge: 'Egyforma jutalmak',
    question: '10 fő között 3 egyforma csokit sorsolunk ki. Hányféle eredmény van, ha mindegyik csokit más nyeri?',
    options: ['120', '720', '1000', '30'],
    correctAnswer: 0,
    explanation: 'A 3 nyertes kiválasztásánál a sorrend nem számít: (10 alatt 3) = 120.'
  },
  {
    id: 'ca-q10',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Hány olyan kétjegyű pozitív egész szám van, amelyben szerepel 7-es számjegy?',
    options: ['18', '19', '20', '17'],
    correctAnswer: 0,
    explanation: 'Komplementer: 90 kétjegyű szám van, 7-es nélkül 8 · 9 = 72. Így 90 − 72 = 18. (A 19 a 77-et kétszer számolná.)'
  },

  // LEVEL 2: Tankönyvi feladatok (11–20)
  {
    id: 'ca-q11',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Hányféleképpen osztható ki 3 egyforma jutalom 12 diák között, ha egy diák akár több jutalmat is kaphat?',
    figure: <PrizeFig students={12} prizes={3} />,
    options: ['364', '288', '1728', '220'],
    correctAnswer: 0,
    explanation: 'Esetek: egy diák kapja mindet (12) + egy diák 2-t, más 1-et (12 · 11 = 132) + három diák 1-1-et (220) = 364. A 288 = 12³ / 3! hibás.'
  },
  {
    id: 'ca-q12',
    level: 2,
    questionTypeBadge: 'Színezés',
    question: 'Hányféleképpen színezhető ki egy 3 sávos zászló piros, sárga, zöld és kék színekkel, ha a szomszédos sávok különbözők, és piros csak a legfelső sávba kerülhet?',
    figure: <FlagFig />,
    options: ['18', '24', '36', '12'],
    correctAnswer: 0,
    explanation: 'Felül piros: 1 · 3 · 2 = 6; felül nem piros: 3 · 2 · 2 = 12. Összesen 18.'
  },
  {
    id: 'ca-q13',
    level: 2,
    questionTypeBadge: 'Színezés',
    question: 'Az előző zászlós feladatban hány olyan színezés van, amelyben a felső sáv piros?',
    options: ['6', '9', '12', '3'],
    correctAnswer: 0,
    explanation: 'Középre 3 nem piros szín, alulra a középsőtől különböző 2 nem piros szín: 3 · 2 = 6.'
  },
  {
    id: 'ca-q14',
    level: 2,
    questionTypeBadge: 'Dobókocka',
    question: 'Egy társasjátékban 22 lépésre vagyunk a céltól; ha legalább 22-t lépünk, célba érünk. Hány olyan 4 dobásos sorozat van, amellyel célba érünk?',
    figure: <DiceFig count={4} text="összeg ≥ 22" />,
    options: ['15', '10', '6', '21'],
    correctAnswer: 0,
    explanation: 'Összeg 24: 1 sorozat; 23: 4 sorozat (melyik az ötös); 22: 4 (egy négyes) + 6 (két ötös) = 10. Összesen 15.'
  },
  {
    id: 'ca-q15',
    level: 2,
    questionTypeBadge: 'Dobókocka',
    question: 'Négy dobókockadobás sorozatai közül hányban lesz az összeg pontosan 23?',
    figure: <DiceFig count={4} text="összeg = 23" />,
    options: ['4', '1', '6', '10'],
    correctAnswer: 0,
    explanation: '23 = 5 + 6 + 6 + 6: csak az a kérdés, hányadik dobás az ötös: (4 alatt 1) = 4.'
  },
  {
    id: 'ca-q16',
    level: 2,
    questionTypeBadge: 'Egyforma jutalmak',
    question: '10 fő között 3 egyforma csokit sorsolunk ki. Hányféle eredmény van, ha pontosan ketten nyernek csokit?',
    options: ['90', '45', '180', '135'],
    correctAnswer: 0,
    explanation: 'Az egyik 2, a másik 1 csokit nyer – a szerepük különböző, ezért számít a sorrend: 10 · 9 = 90.'
  },
  {
    id: 'ca-q17',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    question: '10 fő között 3 egyforma csokit sorsolunk ki, semmi kikötés nincs (valaki többet is nyerhet). Hányféle eredmény lehetséges?',
    options: ['220', '120', '1000', '210'],
    correctAnswer: 0,
    explanation: 'Esetek: egy nyertes (10) + két nyertes (90) + három nyertes (120) = 220.'
  },
  {
    id: 'ca-q18',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Egy 10 fős csoportban 2 egyforma jutalmat osztunk ki, egy ember akár mindkettőt megkaphatja. Hányféleképpen?',
    options: ['55', '45', '100', '50'],
    correctAnswer: 0,
    explanation: 'Egy ember kapja mindkettőt: 10; két különböző ember: (10 alatt 2) = 45. Összesen 55.'
  },
  {
    id: 'ca-q19',
    level: 2,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány olyan 0-ra végződő négyjegyű szám van, amelynek minden számjegye különböző?',
    options: ['504', '448', '720', '648'],
    correctAnswer: 0,
    explanation: 'Az utolsó jegy 0, az első 9-féle (1–9), a második 8-, a harmadik 7-féle: 9 · 8 · 7 = 504.'
  },
  {
    id: 'ca-q20',
    level: 2,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány olyan 5-re végződő négyjegyű szám van, amelynek minden számjegye különböző?',
    options: ['448', '504', '392', '576'],
    correctAnswer: 0,
    explanation: 'Az utolsó jegy 5, az első nem lehet 0 és 5: 8-féle; a második 8-féle (a 0 már megengedett), a harmadik 7-féle: 8 · 8 · 7 = 448.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'ca-q21',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány olyan négyjegyű pozitív egész szám van, amely osztható 5-tel, és minden számjegye különböző?',
    options: ['952', '1008', '896', '1120'],
    correctAnswer: 0,
    explanation: 'Két eset az utolsó jegy szerint: 0-ra végződik: 504; 5-re végződik: 448. Összesen 952. (A két eset nem egyforma: az 5-ös végnél az első jegy nem lehet 0.)'
  },
  {
    id: 'ca-q22',
    level: 3,
    questionTypeBadge: 'Érettségi 2015',
    question: '4 hím és 5 nőstény tigrist helyeznek el egy kisebb és egy nagyobb kifutóban: egyikben sem lehet 3-nál kevesebb tigris, a nagyobbikba több kerül, mindkettőben van hím és nőstény, és egyikben sem több a hím, mint a nőstény. Hányféleképpen?',
    figure: <TigerFig />,
    options: ['100', '40', '60', '120'],
    correctAnswer: 0,
    explanation: 'Felosztás 3 + 6: kisebben 1 H + 2 N: 4 · 10 = 40. Felosztás 4 + 5: kisebben 2 H + 2 N: 6 · 10 = 60. Összesen 100.'
  },
  {
    id: 'ca-q23',
    level: 3,
    questionTypeBadge: 'Érettségi 2015',
    question: 'A tigrises feladatban hány elhelyezés van, amelyben a kisebb kifutóba 3 tigris kerül?',
    options: ['40', '60', '10', '4'],
    correctAnswer: 0,
    explanation: 'A kisebbikben csak 1 hím és 2 nőstény lehet (hímből nem lehet több): (4 alatt 1) · (5 alatt 2) = 4 · 10 = 40. A nagyobbikban ekkor 3 H + 3 N van, ez megengedett.'
  },
  {
    id: 'ca-q24',
    level: 3,
    questionTypeBadge: 'Érettségi 2005',
    question: 'A gyorsváltó-döntőben az élen kettős holtverseny alakult ki (más holtverseny nem volt), és a Delfinek nem lettek utolsók. Hányféle eredménylista lehetséges?',
    figure: <RelayFig tie />,
    options: ['9', '12', '6', '18'],
    correctAnswer: 0,
    explanation: 'Az élen álló pár (4 alatt 2) = 6-féle, a 3. és 4. hely 2-féle: 12 lista. A Delfinek utolsók: (3 alatt 2) = 3 lista. 12 − 3 = 9.'
  },
  {
    id: 'ca-q25',
    level: 3,
    questionTypeBadge: 'Azonos eredmény',
    question: 'Melyik feladatnak ugyanaz az eredménye, mint ennek: „Hányféleképpen rendezhetünk sorba 6 egyforma almát és 3 egyforma körtét?”',
    options: [
      'Hányféleképpen választhatunk ki egy 9 fős csoportból 3 képviselőt?',
      'Hány 3 betűs jelszó állítható össze a MATEK szó betűiből ismétléssel?',
      'Hányféleképpen választhatunk egy 6 fős csoportból elnököt, titkárt és jegyzőt?',
      'Hányféleképpen rakhatók sorba a MODERN szó betűi?'
    ],
    correctAnswer: 0,
    explanation: 'Mindkettő (9 alatt 3) = 84. A MATEK-es 5³ = 125, az elnök-titkár-jegyző 6 · 5 · 4 = 120, a MODERN 6! = 720.'
  },
  {
    id: 'ca-q26',
    level: 3,
    questionTypeBadge: 'Részhalmazok',
    question: 'Egy 6 elemű halmaznak hány olyan részhalmaza van, amely 2 vagy 3 elemű?',
    options: ['35', '300', '15', '64'],
    correctAnswer: 0,
    explanation: 'A két eset kizárja egymást, összeadunk: (6 alatt 2) + (6 alatt 3) = 15 + 20 = 35. (A 300 hibásan szorozna.)'
  },
  {
    id: 'ca-q27',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: '4 egyforma jutalmat osztunk ki 5 diák között, egy diák több jutalmat is kaphat. Hányféleképpen?',
    figure: <PrizeFig students={5} prizes={4} />,
    options: ['70', '625', '26', '56'],
    correctAnswer: 0,
    explanation: 'Esetek: 4 (egy diák): 5; 3 + 1: 5 · 4 = 20; 2 + 2: (5 alatt 2) = 10; 2 + 1 + 1: 5 · (4 alatt 2) = 30; 1 + 1 + 1 + 1: (5 alatt 4) = 5. Összesen 70.'
  },
  {
    id: 'ca-q28',
    level: 3,
    questionTypeBadge: 'Dobókocka',
    question: 'Három dobókockadobás sorozatai közül hányban lesz az összeg legalább 17?',
    figure: <DiceFig count={3} text="összeg ≥ 17" />,
    options: ['4', '3', '6', '2'],
    correctAnswer: 0,
    explanation: 'Összeg 18: 6-6-6 (1 sorozat); összeg 17: egy ötös és két hatos, az ötös helye 3-féle (3 sorozat). Összesen 4.'
  },
  {
    id: 'ca-q29',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Hányféleképpen helyezhető el a 3 × 3-as táblán két egyforma bástya úgy, hogy ÜSSÉK egymást (azonos sorban vagy oszlopban álljanak)?',
    figure: <BoardFig note="ütik egymást: ?" />,
    options: ['18', '36', '27', '9'],
    correctAnswer: 0,
    explanation: 'Összes elhelyezés: (9 alatt 2) = 36; nem ütik egymást: 18. Tehát 36 − 18 = 18. (Közvetlenül: 3 sor · 3 pár + 3 oszlop · 3 pár = 18.)'
  },
  {
    id: 'ca-q30',
    level: 3,
    questionTypeBadge: 'Színezés',
    question: 'Hányféleképpen színezhető ki egy 3 sávos zászló a piros, sárga, zöld és kék színekkel, ha csak annyi a feltétel, hogy a szomszédos sávok különbözők?',
    figure: <FlagFig />,
    options: ['36', '24', '64', '48'],
    correctAnswer: 0,
    explanation: 'Felső sáv 4-féle, a középső a felsőtől különböző 3-féle, az alsó a középsőtől különböző 3-féle: 4 · 3 · 3 = 36. (A felső és alsó lehet azonos!)'
  }
];

export const CaseAnalysisQuiz: React.FC<{
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
      topicId="g11-comb-esetszetvalasztas-quiz"
      subtopicId="esetszetvalasztas"
      title="6. Esetszétválasztás – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: egyforma jutalmak, bástyák, zászlók, dobássorozatok, számjegyek és érettségi feladatok."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={CASE_ANALYSIS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az esetszétválasztás lépései',
          items: [
            'Válassz szempontot (ki hány jutalmat kap, melyik az utolsó jegy, mennyi az összeg…).',
            'Az esetek zárják ki egymást, és fedjék le az összes lehetőséget.',
            'Esetenként számolj (szorzás, n!, (n alatt k)).',
            'Az esetszámokat add össze.'
          ]
        },
        {
          title: 'Komplementer',
          items: [
            'jó esetek = összes − rossz esetek',
            'Delfinek nem 4.: 4! − 3! = 18',
            'van benne 7-es: 90 − 72 = 18',
            'Akkor jó, ha a rossz eseteket könnyebb megszámolni.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            '3 egyforma jutalom, 12 diák: 12 + 132 + 220 = 364',
            'Bástyák: 36 és 18; zászló: 6 + 12 = 18',
            '4 dobás, legalább 22: 15; tigrisek: 40 + 60 = 100',
            'HF: csokik 10, 90, 120, 220; 5-tel osztható: 504 + 448 = 952'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CaseAnalysisMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CaseAnalysisSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CaseAnalysisQuiz;
