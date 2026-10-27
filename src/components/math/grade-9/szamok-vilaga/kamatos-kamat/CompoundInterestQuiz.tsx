import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { CompoundInterestMatcher } from './CompoundInterestMatcher';
import { CompoundInterestSorter } from './CompoundInterestSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface CompoundInterestQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const questions: QuizQuestion[] = [
  // ==========================================
  // 1. SZINT: ALAPFOGALMAK ÉS A KÉPLET FELÉPÍTÉSE (1-10)
  // ==========================================
  {
    id: 'ci-q1',
    level: 1,
    question: 'Mi a kamatos kamat alaptételének képlete (T₀ kezdőtőke, p kamatláb, n évek száma)?',
    options: [
      'Tₙ = T₀ · (1 + p/100)ⁿ',
      'Tₙ = T₀ · (1 + n · p/100)',
      'Tₙ = T₀ + n · p',
      'Tₙ = T₀ · (p/100)ⁿ'
    ],
    correctAnswer: 0,
    explanation: 'A kamatos kamatnál a tőke évről évre a q = (1 + p/100) kamattényezővel szorzódik, így n év alatt Tₙ = T₀ · qⁿ.'
  },
  {
    id: 'ci-q2',
    level: 1,
    question: 'Mennyi a kamattényező (q), ha a bank évi 7%-os kamatot fizet a betétre?',
    options: ['q = 1,07', 'q = 1,7', 'q = 0,07', 'q = 7,0'],
    correctAnswer: 0,
    explanation: 'q = 1 + p/100 = 1 + 7/100 = 1 + 0,07 = 1,07. (Vigyázat: az 1,7 a 70%-os kamatlábat jelentené!).'
  },
  {
    id: 'ci-q3',
    level: 1,
    question: 'Mi a legfontosabb különbség az egyszerű kamat és a kamatos kamat között?',
    options: [
      'Kamatos kamatnál a korábban jóváírt kamat is kamatozik a következő években',
      'Egyszerű kamatnál a kamatláb évről évre a duplájára nő',
      'Kamatos kamatnál a bank minden évben levonja a tőke felét',
      'Nincs matematikai különbség köztük, mindkettő lineáris folyamat'
    ],
    correctAnswer: 0,
    explanation: 'Kamatos kamatnál a kamatot hozzáadják a tőkéhez (tőkésítés), így a következő kamatperiódusban már a kamat is kamatot termel (exponenciális növekedés).'
  },
  {
    id: 'ci-q4',
    level: 1,
    question: 'Mekkora összegre nő 100 000 Ft betét 1 év alatt 8%-os éves kamatláb mellett?',
    options: ['108 000 Ft', '180 000 Ft', '104 000 Ft', '116 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₁ = 100 000 · (1 + 8/100) = 100 000 · 1,08 = 108 000 Ft.'
  },
  {
    id: 'ci-q5',
    level: 1,
    question: 'Mennyi az egyszerű kamattal számított végösszeg, ha 500 000 Ft-ot kötünk le 3 évre évi 10%-os kamattal?',
    options: ['650 000 Ft', '665 500 Ft', '600 000 Ft', '1 500 000 Ft'],
    correctAnswer: 0,
    explanation: 'Egyszerű kamatnál minden évben csak a kezdőtőke 10%-a (50 000 Ft) jár. 3 év alatt a kamat 3 · 50 000 = 150 000 Ft. Végösszeg: 500 000 + 150 000 = 650 000 Ft.'
  },
  {
    id: 'ci-q6',
    level: 1,
    question: 'Mennyi a csökkenési tényező (q) évi 4%-os értékvesztés (amortizáció) esetén?',
    options: ['q = 0,96', 'q = 1,04', 'q = 0,6', 'q = 0,04'],
    correctAnswer: 0,
    explanation: 'Értékcsökkenésnél q = 1 - p/100 = 1 - 0,04 = 0,96.'
  },
  {
    id: 'ci-q7',
    level: 1,
    question: 'Mit jelent a bankbetéteknél az EBKM rövidítés?',
    options: [
      'Egységesített Betéti Kamatláb Mutató',
      'Elsődleges Banki Kamat Maximum',
      'Éves Betéti Kamat Mértéke',
      'Európai Betétbiztosítási Kárpótlási Modell'
    ],
    correctAnswer: 0,
    explanation: 'Az EBKM (Egységesített Betéti Kamatláb Mutató) a különböző banki ajánlatok összehasonlítására szolgál, megmutatva a tényleges éves hozamot.'
  },
  {
    id: 'ci-q8',
    level: 1,
    question: 'Mit mutat meg a hiteleknél kötelezően feltüntetett THM mutató?',
    options: [
      'A hitel teljes költségét (kamat + folyósítási és kezelési díjak)',
      'A havi törlesztőrészlet tiszta kamattartalmát',
      'A hitelfelvevő maximálisan engedélyezett hitelkeretét',
      'A bank profitmarzsát százalékban'
    ],
    correctAnswer: 0,
    explanation: 'A THM (Teljes Hiteldíj Mutató) a hitel valódi árát mutatja, mert a kamaton felül tartalmazza az összes járulékos banki költséget és díjat.'
  },
  {
    id: 'ci-q9',
    level: 1,
    question: 'Ha T₀ = 200 000 Ft és a kamattényező q = 1,1, mennyi a tőke 2 év múlva kamatos kamattal?',
    options: ['242 000 Ft', '240 000 Ft', '220 000 Ft', '250 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₂ = 200 000 · 1,1² = 200 000 · 1,21 = 242 000 Ft. (Egyszerű kamattal csak 240 000 Ft lenne!).'
  },
  {
    id: 'ci-q10',
    level: 1,
    question: 'Hogyan alakul a képlet, ha a bank évente kétszer (félévente) tőkésíti a kamatot?',
    options: [
      'A féléves kamatláb p/2, a periódusok száma pedig 2n',
      'A kamatláb duplázódik és a periódusok száma feleződik',
      'A képlet teljesen változatlan marad',
      'A kamatot le kell vonni a tőkéből'
    ],
    correctAnswer: 0,
    explanation: 'Évente kétszeri tőkésítésnél félévente p/2 kamatlábbal számolunk, és n év alatt 2n kamatperiódus telik el: Tₙ = T₀ · (1 + p/200)²ⁿ.'
  },

  // ==========================================
  // 2. SZINT: SZÁMÍTÁSOK ÉS KAMATOZÁSI PERIÓDUSOK (11-20)
  // ==========================================
  {
    id: 'ci-q11',
    level: 2,
    question: '1 000 000 Ft-ot kötünk le 2 évre 6%-os kamatos kamatra. Mennyi lesz a végtőke?',
    options: ['1 123 600 Ft', '1 120 000 Ft', '1 200 000 Ft', '1 060 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₂ = 1 000 000 · 1,06² = 1 000 000 · 1,1236 = 1 123 600 Ft.'
  },
  {
    id: 'ci-q12',
    level: 2,
    question: 'Mennyi tiszta kamatot termelt a fenti 1 000 000 Ft 2 év alatt 6%-os kamatos kamat mellett?',
    options: ['123 600 Ft', '120 000 Ft', '60 000 Ft', '23 600 Ft'],
    correctAnswer: 0,
    explanation: 'Kamat = T₂ - T₀ = 1 123 600 - 1 000 000 = 123 600 Ft (ebből 3600 Ft a kamat kamata!).'
  },
  {
    id: 'ci-q13',
    level: 2,
    question: 'Egy új autó ára 8 000 000 Ft. Évente 10%-ot veszít az értékéből. Mennyit ér 2 év múlva?',
    options: ['6 480 000 Ft', '6 400 000 Ft', '7 200 000 Ft', '6 000 000 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1 - 0,10 = 0,90. T₂ = 8 000 000 · 0,90² = 8 000 000 · 0,81 = 6 480 000 Ft.'
  },
  {
    id: 'ci-q14',
    level: 2,
    question: '400 000 Ft-ot fektetünk be 3 évre évi 5%-os kamatos kamatra. Mennyi lesz a végtőke?',
    options: ['463 050 Ft', '460 000 Ft', '472 000 Ft', '500 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₃ = 400 000 · 1,05³ = 400 000 · 1,157625 = 463 050 Ft.'
  },
  {
    id: 'ci-q15',
    level: 2,
    question: 'Hány százalékkal nő a tőke 3 év alatt évi 10%-os kamatos kamat mellett?',
    options: ['33,1%-kal', '30%-kal', '30,3%-kal', '40%-kal'],
    correctAnswer: 0,
    explanation: 'A 3 éves növekedési tényező: 1,10³ = 1,331. Ez 133,1%-ot jelent, ami 33,1%-os növekedésnek felel meg.'
  },
  {
    id: 'ci-q16',
    level: 2,
    question: 'Egy hitel éves kamata 12%, és havonta tőkésítik. Mekkora a havi kamattényező?',
    options: ['1,01 (1%)', '1,12 (12%)', '1,001 (0,1%)', '1,06 (6%)'],
    correctAnswer: 0,
    explanation: 'A havi kamatláb: 12% / 12 = 1%. Ennek megfelelő kamattényező: q = 1 + 1/100 = 1,01.'
  },
  {
    id: 'ci-q17',
    level: 2,
    question: 'Melyik biztosít magasabb tényleges hozamot az év végén: évi 10% évente egyszer, vagy évi 10% félévente tőkésítve?',
    options: [
      'A félévente tőkésített (mert a féléves kamat az év 2. felében már kamatozik)',
      'Az évente egyszer tőkésített',
      'Pontosan egyenlő a hozamuk',
      'Kizárólag a betett tőke nagyságától függ'
    ],
    correctAnswer: 0,
    explanation: 'Féléves tőkésítésnél: (1 + 0,05)² = 1,1025, vagyis 10,25% a tényleges éves hozam (EBKM), ami magasabb a 10%-nál.'
  },
  {
    id: 'ci-q18',
    level: 2,
    question: '100 000 Ft félévente 5%-ot kamatozik (évi 10%). Mennyi lesz az értéke 1 év elteltével?',
    options: ['110 250 Ft', '110 000 Ft', '105 000 Ft', '115 000 Ft'],
    correctAnswer: 0,
    explanation: '1 év = 2 félév. T₂ = 100 000 · 1,05² = 100 000 · 1,1025 = 110 250 Ft.'
  },
  {
    id: 'ci-q19',
    level: 2,
    question: 'Egy gép értéke 3 év alatt a felére csökken. Milyen képlettel kapjuk meg az éves amortizációs tényezőt (q)?',
    options: ['q = ∛0,5', 'q = 0,5 / 3', 'q = 1 - 0,5 / 3', 'q = 3 · 0,5'],
    correctAnswer: 0,
    explanation: 'T₀ · q³ = 0,5 · T₀ ⟹ q³ = 0,5 ⟹ q = ∛0,5 ≈ 0,7937 (évi kb. 20,63%-os értékvesztés).'
  },
  {
    id: 'ci-q20',
    level: 2,
    question: 'Hány év alatt duplázódik meg a pénz egyszerű kamattal évi 10%-os kamatláb mellett?',
    options: ['10 év alatt', 'kb. 7,2 év alatt', '20 év alatt', '5 év alatt'],
    correctAnswer: 0,
    explanation: 'Egyszerű kamatnál évente a tőke 10%-át kapjuk meg, így 100%-os növekedéshez pontosan 10 évre van szükség (10 · 10% = 100%).'
  },

  // ==========================================
  // 3. SZINT: ÉRETTSÉGI ÉS ÖSSZETETT PÉNZÜGYI MODELLEK (21-30)
  // ==========================================
  {
    id: 'ci-q21',
    level: 3,
    question: 'A 72-es szabály (n ≈ 72 / p) alapján kb. hány év alatt duplázódik meg a pénz évi 8%-os kamatos kamat mellett?',
    options: ['kb. 9 év alatt', 'kb. 12,5 év alatt', 'kb. 8 év alatt', 'kb. 7,2 év alatt'],
    correctAnswer: 0,
    explanation: 'n ≈ 72 / 8 = 9 év. Ellenőrzés kamatos kamattal: 1,08⁹ ≈ 1,999 ≈ 2-szeres tőke!'
  },
  {
    id: 'ci-q22',
    level: 3,
    question: 'Gyermekünknek születésekor 500 000 Ft-ot kötünk le 18 évre évi 8%-os kamatos kamatra. Mennyi lesz a tőke 18 év múlva?',
    options: ['kb. 1 998 010 Ft', 'kb. 1 220 000 Ft', 'kb. 720 000 Ft', 'kb. 3 500 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₁₈ = 500 000 · 1,08¹⁸ ≈ 500 000 · 3,99602 ≈ 1 998 010 Ft (csaknem a négyszeresére nőtt a kezdőtőke!).'
  },
  {
    id: 'ci-q23',
    level: 3,
    question: 'Mekkora kezdőtőkét kell lekötni évi 6%-os kamatos kamatra, hogy 4 év múlva 2 524 954 Ft legyen a számlán?',
    options: ['2 000 000 Ft', '2 100 000 Ft', '1 800 000 Ft', '2 200 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₀ = T₄ / q⁴ = 2 524 954 / 1,06⁴ = 2 524 954 / 1,262477 ≈ 2 000 000 Ft.'
  },
  {
    id: 'ci-q24',
    level: 3,
    question: 'Egy cég bevétele 4 egymást követő évben minden évben 5%-kal nőtt. Hány százalékkal nőtt a bevétel 4 év alatt összesen?',
    options: ['kb. 21,55%-kal', 'pontosan 20%-kal', '25%-kal', '24,15%-kal'],
    correctAnswer: 0,
    explanation: 'q = 1,05⁴ ≈ 1,215506, ami 121,55%-os szintet jelent, tehát az össznövekedés 21,55%.'
  },
  {
    id: 'ci-q25',
    level: 3,
    question: 'Évi 5%-os infláció mellett mennyit ér 1 000 000 Ft vásárlóereje 10 év múlva a mai árakon számolva?',
    options: ['kb. 598 737 Ft', 'kb. 500 000 Ft', 'kb. 750 000 Ft', 'kb. 650 000 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1 - 0,05 = 0,95. T₁₀ = 1 000 000 · 0,95¹⁰ ≈ 1 000 000 · 0,598737 ≈ 598 737 Ft.'
  },
  {
    id: 'ci-q26',
    level: 3,
    question: 'Egy 10 000 000 Ft-os hitel éves kamata 8%. Ha az 1. évben egyetlen forintot sem törlesztünk, mennyi lesz a tartozás 1 év múlva?',
    options: ['10 800 000 Ft', '10 080 000 Ft', '18 000 000 Ft', '11 200 000 Ft'],
    correctAnswer: 0,
    explanation: 'A felhalmozott kamat 10 000 000 · 0,08 = 800 000 Ft, így a tartozás 10 800 000 Ft-ra nő.'
  },
  {
    id: 'ci-q27',
    level: 3,
    question: 'Egy 1 200 000 Ft-os betét 2 év alatt 1 346 700 Ft-ra gyarapodott kamatos kamattal. Mekkora volt az éves kamatláb?',
    options: ['5,9%', '6,0%', '5,5%', '7,0%'],
    correctAnswer: 0,
    explanation: 'q² = 1 346 700 / 1 200 000 = 1,12225 ⟹ q = √1,12225 = 1,059 ⟹ p = 5,9%.'
  },
  {
    id: 'ci-q28',
    level: 3,
    question: 'Mennyi a pontos reálhozam, ha a bank 9%-os névleges kamatot fizet, de az éves infláció 6%?',
    options: [
      'kb. 2,83% (mert 1,09 / 1,06 ≈ 1,0283)',
      'pontosan 3,0% (kivonással)',
      '15,0% (összeadással)',
      '-3,0%'
    ],
    correctAnswer: 0,
    explanation: 'A pontos reálhozam képlete: q_reál = (1 + p_névleges) / (1 + infláció) = 1,09 / 1,06 ≈ 1,0283 ⟹ 2,83% (a 3% csak durva közelítés).'
  },
  {
    id: 'ci-q29',
    level: 3,
    question: 'Ha Tₙ = 2 · T₀ (megduplázódás), hogyan fejezhető ki a futamidő (n) a q kamattényezőből?',
    options: [
      'n = lg 2 / lg q',
      'n = lg(2 · q)',
      'n = lg q / lg 2',
      'n = 2 · lg q'
    ],
    correctAnswer: 0,
    explanation: 'T₀ · qⁿ = 2 · T₀ ⟹ qⁿ = 2. Mindkét oldal logaritmusát véve: n · lg q = lg 2 ⟹ n = lg 2 / lg q.'
  },
  {
    id: 'ci-q30',
    level: 3,
    question: 'Egy telefon értéke évente 20%-kal csökken. Hány év múlva éri el az eredeti árának kevesebb mint 40%-át?',
    options: [
      '5 év múlva (mert 0,8⁴ ≈ 41%, míg 0,8⁵ ≈ 32,8%)',
      '3 év múlva',
      '2 év múlva',
      '7 év múlva'
    ],
    correctAnswer: 0,
    explanation: 'q = 0,80. 0,80⁴ = 0,4096 (40,96%), míg 0,80⁵ = 0,32768 (32,77%). Tehát az 5. év végén esik 40% alá.'
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Kamatos Kamat Képlete',
    category: 'Alapképlet',
    content: 'Tₙ = T₀ · (1 + p/100)ⁿ = T₀ · qⁿ\nT₀ = kezdőtőke, p = éves kamatláb (%), q = kamattényező, n = futamidő (évek száma).'
  },
  {
    title: 'Egyszerű vs. Kamatos Kamat',
    category: 'Összehasonlítás',
    content: 'Egyszerű kamat: Tₙ = T₀ + n · (T₀ · p/100) (csak a kezdőtőke kamatozik, lineáris).\nKamatos kamat: a korábbi kamatok is kamatoznak (exponenciális, tőkésítés).'
  },
  {
    title: 'Értékcsökkenés (Amortizáció)',
    category: 'Csökkenés',
    content: 'Tₙ = T₀ · (1 - p/100)ⁿ = T₀ · qⁿ (ahol 0 < q < 1)\nGépjárművek, elektronika értékvesztése és az infláció vásárlóerő-csökkentő hatása.'
  },
  {
    title: 'Pénzügyi Mutatók',
    category: 'Banki fogalmak',
    content: 'EBKM: Egységesített Betéti Kamatláb Mutató (betétek valós, adózott éves hozama).\nTHM: Teljes Hiteldíj Mutató (hitelek teljes költsége: kamat + kezelési díjak).\n72-es szabály: duplázódási idő n ≈ 72 / p.'
  }
];

export const CompoundInterestQuiz: React.FC<CompoundInterestQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      topicId="g9-szamok-kamatos-kamat-quiz"
      topicTitle="Kamatos kamat"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a pénzügyi alapfogalmakat a matematikai leírásukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <CompoundInterestMatcher
              key={`ci-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a pénzügyi kifejezéseket és folyamatokat!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <CompoundInterestSorter
              key={`ci-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="indigo"
    />
  );
};

export default CompoundInterestQuiz;
