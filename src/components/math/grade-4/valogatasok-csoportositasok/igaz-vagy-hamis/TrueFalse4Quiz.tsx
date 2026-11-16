import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrueFalse4Matcher } from './TrueFalse4Matcher';
import { TrueFalse4Sorter } from './TrueFalse4Sorter';
import { AnimalsGlobeSvg, ThreeSetsSvg, MfSetSvg } from './TrueFalse4Figures';
import { LogicBlocksRowSvg, OtterBoatSvg } from '../valogatasok-halmazokba/SetSortingFigures';

const QCLS = 'w-full max-w-[300px] h-auto mx-auto';

const FIG_GLOBE = <AnimalsGlobeSvg className={QCLS} />;
const FIG_SETS = <ThreeSetsSvg className={QCLS} />;
const FIG_SET_A = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['A']} />;
const FIG_SET_B = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['B']} />;
const FIG_SET_C = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['C']} />;
const FIG_MF = <MfSetSvg className="w-full max-w-[200px] h-auto mx-auto" />;
const FIG_BLOCKS = <LogicBlocksRowSvg className={QCLS} />;
const FIG_OTTER = <OtterBoatSvg className={QCLS} />;

const numRow = (nums: string[]) => (
  <svg viewBox="0 0 300 60" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="56" rx="28" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
    {nums.map((n, i) => (
      <text key={n} x={(300 / (nums.length + 1)) * (i + 1)} y="37" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#7f1d1d">
        {n}
      </text>
    ))}
  </svg>
);

export const TRUE_FALSE_4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'tf-q1',
    level: 1,
    questionTypeBadge: 'Van közöttük',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis a képen látható állatokról: „Van közöttük emlősállat.”?',
    options: ['Igaz, például a tigris emlős', 'Hamis, mert mindegyik madár', 'Hamis, mert csak egy emlős van', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'A „van közöttük” állításhoz elég egyetlen példa. A tigris, a farkas, a medve, a hiúz is emlős – az állítás igaz.'
  },
  {
    id: 'tf-q2',
    level: 1,
    questionTypeBadge: 'Nincs olyan',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis: „Nincs olyan madár, amelyik ragadozó.”?',
    options: ['Hamis, mert a sas ragadozó madár', 'Igaz, mert a madarak nem vadásznak', 'Igaz, mert a pingvin nem repül', 'Hamis, mert a tigris ragadozó'],
    correctAnswer: 0,
    explanation: 'Egy ragadozó madár elég, hogy a „nincs olyan” hamis legyen: a rétisas (és a hóbagoly) ragadozó. A tigris nem madár, ezért az nem jó ellenpélda.'
  },
  {
    id: 'tf-q3',
    level: 1,
    questionTypeBadge: 'Nem mindegyik',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis: „Nem mindegyik madár tud repülni.”?',
    options: ['Igaz, mert a pingvin nem tud repülni', 'Hamis, mert a sas tud repülni', 'Hamis, mert egyik madár sem tud repülni', 'Igaz, mert egyik madár sem tud repülni'],
    correctAnswer: 0,
    explanation: 'A „nem mindegyik” azt jelenti: van olyan, amelyik nem. A pingvin madár, de nem tud repülni – az állítás igaz.'
  },
  {
    id: 'tf-q4',
    level: 1,
    questionTypeBadge: 'Egyik sem',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis: „Egyik sem hal.”?',
    options: ['Igaz, mert nincs hal a képen', 'Hamis, mert a vidra hal', 'Hamis, mert a teknős hal', 'Hamis, mert a pingvin hal'],
    correctAnswer: 0,
    explanation: 'A képen emlősök, madarak, egy teknős (hüllő) és egy szalamandra (kétéltű) van – hal egy sincs. A vidra halat eszik, de ő maga emlős.'
  },
  {
    id: 'tf-q5',
    level: 1,
    questionTypeBadge: 'Mindegyik',
    figure: FIG_SET_A,
    question: 'Igaz vagy hamis az A halmazra: „Mindegyik eleme páros szám.”?',
    options: ['Igaz', 'Hamis, mert az 54 páratlan', 'Hamis, mert a 9998 páratlan', 'Hamis, mert a 600 nem páros'],
    correctAnswer: 0,
    explanation: 'Nézd meg az utolsó számjegyeket: 1246, 54, 600, 8002, 9998 – mind 0, 2, 4, 6 vagy 8. Mindegyik páros, az állítás igaz.'
  },
  {
    id: 'tf-q6',
    level: 1,
    questionTypeBadge: 'Egyik sem',
    figure: FIG_SET_C,
    question: 'Igaz vagy hamis a C halmazra: „Egyik eleme sem páros.”?',
    options: ['Igaz', 'Hamis, mert az 1001 páros', 'Hamis, mert a 8889 páros', 'Hamis, mert a 77 páros'],
    correctAnswer: 0,
    explanation: 'A C halmaz számai 5-re, 9-re, 7-re, 1-re, 3-ra végződnek – mind páratlan. Egyik sem páros, tehát igaz.'
  },
  {
    id: 'tf-q7',
    level: 1,
    questionTypeBadge: 'Ellenpélda',
    figure: FIG_SET_B,
    question: 'Igaz vagy hamis a B halmazra: „Mindegyik eleme páros szám.”?',
    options: ['Hamis, mert a 475 páratlan', 'Igaz, mert a 6606 páros', 'Igaz, mert a 48 páros', 'Hamis, mert a 6606 páros'],
    correctAnswer: 0,
    explanation: 'Egy ellenpélda elég: a 475 5-re végződik, páratlan. Ezért a „mindegyik páros” hamis. (Az, hogy a 6606 páros, nem cáfolja az állítást.)'
  },
  {
    id: 'tf-q8',
    level: 1,
    questionTypeBadge: 'Melyik halmazra?',
    figure: FIG_SETS,
    question: 'Melyik halmazra igaz: „Van olyan eleme, amelyik nem páros.”?',
    options: ['A B-re és a C-re', 'Csak az A-ra', 'Csak a C-re', 'Mindhárom halmazra'],
    correctAnswer: 0,
    explanation: 'A B-ben van páratlan (pl. 475), a C-ben mind páratlan. Az A-ban minden szám páros, ott nincs ilyen elem.'
  },
  {
    id: 'tf-q9',
    level: 1,
    questionTypeBadge: 'Minden',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „A halmazban minden szám páratlan.”?',
    options: ['Hamis, mert a 4016 páros', 'Igaz, mert a 3063 páratlan', 'Igaz, mert a 9705 páratlan', 'Hamis, mert az 5939 páratlan'],
    correctAnswer: 0,
    explanation: 'A 4016 6-ra végződik, páros – ez ellenpélda. (A 7000, a 6624, a 8808 is páros.) Az állítás hamis.'
  },
  {
    id: 'tf-q10',
    level: 1,
    questionTypeBadge: 'Szavak',
    question: 'Melyik kifejezés jelenti azt, hogy „egy sincs ilyen”?',
    options: ['egyik sem', 'van olyan', 'mindegyik', 'nem mindegyik'],
    correctAnswer: 0,
    explanation: 'Az „egyik sem” (vagy „nincs olyan”) azt jelenti, hogy egyetlen ilyen elem sincs.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'tf-q11',
    level: 2,
    questionTypeBadge: 'Nem minden',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „Nem minden szám kisebb, mint a 10 000.”?',
    options: ['Hamis, mert mindegyik szám kisebb a 10 000-nél', 'Igaz, mert a 9705 nagy szám', 'Igaz, mert a 7000 kerek szám', 'Hamis, mert van köztük ötjegyű'],
    correctAnswer: 0,
    explanation: 'Mindegyik szám négyjegyű, tehát mindegyik kisebb a 10 000-nél. Akkor a „nem minden” állítás hamis.'
  },
  {
    id: 'tf-q12',
    level: 2,
    questionTypeBadge: 'Van olyan',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „Van olyan szám, amelyben a számjegyek összege 26.”?',
    options: ['Igaz: 5939', 'Igaz: 8808', 'Igaz: 9705', 'Hamis: nincs ilyen'],
    correctAnswer: 0,
    explanation: '5 + 9 + 3 + 9 = 26. A 8808 összege 24, a 9705-é 21. Az állítás igaz.'
  },
  {
    id: 'tf-q13',
    level: 2,
    questionTypeBadge: 'Nincs olyan',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „Nincs olyan szám, amelyben három egyforma számjegy van.”?',
    options: ['Hamis: a 7000-ben három 0, a 8808-ban három 8 van', 'Igaz: mindegyik szám más', 'Hamis: a 6624-ben három 6 van', 'Igaz: csak két egyforma számjegy lehet'],
    correctAnswer: 0,
    explanation: 'A 7000-ben három 0, a 8808-ban három 8 van. Mivel van ilyen szám, a „nincs olyan” hamis. (A 6624-ben csak két 6-os van.)'
  },
  {
    id: 'tf-q14',
    level: 2,
    questionTypeBadge: 'Több olyan',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „Több olyan szám van, amelyben benne van a legkisebb alaki értékű számjegy.”?',
    options: ['Igaz: a 0 öt számban is szerepel', 'Hamis: a 0 csak a 7000-ben van', 'Hamis: az 1-es csak a 4016-ban van', 'Igaz: az 1-es sok számban szerepel'],
    correctAnswer: 0,
    explanation: 'A legkisebb alaki értékű számjegy a 0. Benne van a 3063-ban, 4016-ban, 7000-ben, 8808-ban és 9705-ben. Ez több szám, tehát igaz.'
  },
  {
    id: 'tf-q15',
    level: 2,
    questionTypeBadge: 'Ugyanazt jelenti',
    question: 'Melyik jelenti ugyanazt, mint: „Nincs olyan eleme, amelyik páratlan.”?',
    options: ['Mindegyik eleme páros.', 'Van olyan eleme, amelyik páros.', 'Egyik eleme sem páros.', 'Nem mindegyik eleme páros.'],
    correctAnswer: 0,
    explanation: 'Ha egy páratlan sincs, akkor minden elem páros. A „van olyan, amelyik páros” ennél kevesebbet mond.'
  },
  {
    id: 'tf-q16',
    level: 2,
    questionTypeBadge: 'Ugyanazt jelenti',
    question: 'Melyik jelenti ugyanazt, mint: „Nem mindegyik madár tud repülni.”?',
    options: ['Van olyan madár, amelyik nem tud repülni.', 'Egyik madár sem tud repülni.', 'Mindegyik madár tud repülni.', 'Van olyan madár, amelyik tud repülni.'],
    correctAnswer: 0,
    explanation: 'A „nem mindegyik” = „van olyan, amelyik nem”. Nem azt jelenti, hogy egyik sem!'
  },
  {
    id: 'tf-q17',
    level: 2,
    questionTypeBadge: 'Melyik halmazra?',
    figure: FIG_SETS,
    question: 'Melyik halmazra igaz: „Van olyan eleme, amelyik nem páratlan.”?',
    options: ['Az A-ra és a B-re', 'Csak az A-ra', 'Csak a C-re', 'A B-re és a C-re'],
    correctAnswer: 0,
    explanation: 'A „nem páratlan” = páros. Az A-ban mind páros, a B-ben is van páros (6606, 48). A C-ben nincs páros.'
  },
  {
    id: 'tf-q18',
    level: 2,
    questionTypeBadge: 'Melyik halmazra?',
    figure: FIG_SETS,
    question: 'Melyik halmazra igaz: „Nincs olyan eleme, amelyik nem páros.”?',
    options: ['Csak az A-ra', 'Csak a C-re', 'A B-re és a C-re', 'Egyikre sem'],
    correctAnswer: 0,
    explanation: 'Ha nincs nem páros elem, akkor mindegyik páros. Ez csak az A halmazra igaz.'
  },
  {
    id: 'tf-q19',
    level: 2,
    questionTypeBadge: 'Ellenpélda',
    question: 'Melyik szám ellenpélda erre az állításra: „Minden négyjegyű szám páros.”?',
    options: ['1005', '1246', '54', '600'],
    correctAnswer: 0,
    explanation: 'Az ellenpélda négyjegyű, de NEM páros: 1005. Az 1246 páros, az 54 és a 600 pedig nem négyjegyű, ezek nem cáfolják az állítást.'
  },
  {
    id: 'tf-q20',
    level: 2,
    questionTypeBadge: 'Hamis állítás',
    figure: numRow(['12', '30', '48', '66']),
    question: 'Melyik állítás HAMIS ezekre a számokra: 12, 30, 48, 66?',
    options: ['Van köztük páratlan szám.', 'Mindegyik páros.', 'Egyik sem nagyobb 100-nál.', 'Van köztük a 10 többszöröse.'],
    correctAnswer: 0,
    explanation: 'Mind a négy szám páros (2, 0, 8, 6 a végük), páratlan nincs köztük. A 30 a 10 többszöröse, és mind kisebb 100-nál.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'tf-q21',
    level: 3,
    questionTypeBadge: 'Mindegyik',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis a képen látható állatokra: „Mindegyik vadon élő állat.”?',
    options: ['Igaz, mert nincs közöttük háziállat', 'Hamis, mert a farkas háziállat', 'Hamis, mert a panda az állatkertben él', 'Igaz, mert mindegyik ragadozó'],
    correctAnswer: 0,
    explanation: 'Mindegyik állat a természetben, vadon él – háziállat nincs köztük. (Az állatkertbe is a vadon élő fajokból kerülnek állatok.) Nem mind ragadozó: a panda bambuszt eszik.'
  },
  {
    id: 'tf-q22',
    level: 3,
    questionTypeBadge: 'Van olyan',
    figure: FIG_GLOBE,
    question: 'Igaz vagy hamis: „Az emlősök között van ragadozó.”?',
    options: ['Igaz, például a farkas', 'Hamis, mert a panda nem ragadozó', 'Hamis, mert a sas nem emlős', 'Igaz, például a sas'],
    correctAnswer: 0,
    explanation: 'Elég egy példa az emlősök közül: a farkas (vagy a tigris, a hiúz) ragadozó. A sas ragadozó, de nem emlős, ezért ő nem jó példa.'
  },
  {
    id: 'tf-q23',
    level: 3,
    questionTypeBadge: 'Két olyan',
    figure: FIG_MF,
    question: 'Igaz vagy hamis: „Két olyan szám van, amely ezresekre kerekített értéke a kisebb ezres számszomszédja.”?',
    options: ['Igaz: a 3063 és a 4016', 'Hamis: csak a 3063 ilyen', 'Hamis: négy ilyen szám van', 'Igaz: a 6624 és a 8808'],
    correctAnswer: 0,
    explanation: 'Lefelé kerekítünk, ha a százasok helyén 0–4 áll: 3063 → 3000, 4016 → 4000. A 6624 → 7000, 8808 → 9000, 9705 → 10 000, 5939 → 6000 felfelé kerekednek. A 7000 már kerek ezres. Tehát pontosan kettő: igaz.'
  },
  {
    id: 'tf-q24',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: FIG_BLOCKS,
    question: 'A tankönyv A–H logikai lapjairól: „Mindegyik kék lap háromszög.” Igaz vagy hamis?',
    options: ['Hamis: a D kék négyzet', 'Igaz: a B és a G kék háromszög', 'Hamis: az A sárga háromszög', 'Igaz: minden háromszög kék'],
    correctAnswer: 0,
    explanation: 'Kék lapok: B, D, F, G. A D és az F négyzet – ellenpélda, ezért hamis. Az A sárga, ő nem számít, mert nem kék.'
  },
  {
    id: 'tf-q25',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: FIG_BLOCKS,
    question: 'Igaz vagy hamis: „Van olyan lyukas lap, amelyik nem kék.”?',
    options: ['Igaz: az A sárga, lyukas háromszög', 'Hamis: minden lyukas lap kék', 'Igaz: a C zöld kör', 'Hamis: nincs lyukas lap'],
    correctAnswer: 0,
    explanation: 'Lyukas lapok: A, E, F, G. Az A sárga, az E zöld – vagyis van lyukas, nem kék lap. A C nem lyukas, ezért nem jó példa.'
  },
  {
    id: 'tf-q26',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: FIG_BLOCKS,
    question: 'Igaz vagy hamis: „Egyik zöld lap sem lyukas.”?',
    options: ['Hamis: az E zöld, lyukas négyzet', 'Igaz: a C és a H nem lyukas', 'Igaz: zöld lap nincs is', 'Hamis: a G zöld, lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Zöld lapok: C, E, H. Az E lyukas – egy ellenpélda elég, az „egyik sem” hamis. (A G kék, nem zöld.)'
  },
  {
    id: 'tf-q27',
    level: 3,
    questionTypeBadge: 'Tagadás',
    question: 'Melyik állítás az ellentéte (tagadása) annak, hogy „Mindegyik gyerek csónakázott.”?',
    options: ['Van olyan gyerek, aki nem csónakázott.', 'Egyik gyerek sem csónakázott.', 'Mindegyik gyerek nézte a vidraetetést.', 'Van olyan gyerek, aki csónakázott.'],
    correctAnswer: 0,
    explanation: 'A „mindegyik” akkor nem igaz, ha legalább egy kivétel van: „Van olyan gyerek, aki nem csónakázott.” Az „egyik sem” túl erős, nem ez az ellentéte.'
  },
  {
    id: 'tf-q28',
    level: 3,
    questionTypeBadge: 'Halmazábra',
    figure: FIG_OTTER,
    question: 'Igaz vagy hamis: „Mindegyik gyerek, aki csónakázott, a vidraetetést is nézte.”?',
    options: ['Hamis: András csónakázott, de nem nézte a vidraetetést', 'Igaz: Éva mindkettőn ott volt', 'Hamis: Dóri nem csónakázott', 'Igaz: a két keretnek van közös része'],
    correctAnswer: 0,
    explanation: 'András, Zsuzsi és Józsi csak csónakázott – ők ellenpéldák. Dóri nem jó ellenpélda, mert ő nem is csónakázott.'
  },
  {
    id: 'tf-q29',
    level: 3,
    questionTypeBadge: 'Ellenpélda',
    question: 'Hány ellenpélda kell ahhoz, hogy egy „mindegyik …” kezdetű állításról megmutasd: hamis?',
    options: ['Egy is elég', 'Legalább kettő', 'Az elemek fele', 'Mindegyik elem'],
    correctAnswer: 0,
    explanation: 'Ha egyetlen elemre nem igaz a tulajdonság, akkor már nem igaz, hogy mindegyikre igaz. Egy ellenpélda elég.'
  },
  {
    id: 'tf-q30',
    level: 3,
    questionTypeBadge: 'Tedd igazzá',
    figure: numRow(['24', '36', '51', '60']),
    question: 'Melyik számot kell kivenni a 24, 36, 51, 60 közül, hogy igaz legyen: „Mindegyik szám páros.”?',
    options: ['51', '24', '36', '60'],
    correctAnswer: 0,
    explanation: 'Az 51 1-re végződik, páratlan – ő az ellenpélda. Ha kivesszük, a maradék 24, 36, 60 mind páros.'
  }
];

export const TrueFalse4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId="g4-group-igaz-hamis-quiz"
      subtopicId="igaz-vagy-hamis"
      title="4. Igaz vagy hamis? – Kvíz"
      subtitle="30 feladat 3 szinten: mindegyik, van olyan, egyik sem, nincs olyan, nem mindegyik – állítások állatokról, számokról, logikai lapokról."
      badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={TRUE_FALSE_4_QUESTIONS}
      cheatSheets={[
        {
          title: 'A kis szavak',
          items: ['Mindegyik: kivétel nélkül mind.', 'Van olyan: legalább egy.', 'Egyik sem – Nincs olyan: egy sem.', 'Nem mindegyik: van olyan, amelyik nem.']
        },
        {
          title: 'Ugyanazt jelentik',
          items: [
            'Mindegyik páros = Nincs olyan, amelyik páratlan.',
            'Mindegyik páros = Egyik sem páratlan.',
            'Egyik sem páros = Mindegyik páratlan.',
            'Nem mindegyik páros = Van olyan, amelyik nem páros.'
          ]
        },
        {
          title: 'Hogyan döntsd el?',
          items: ['„Mindegyik” cáfolata: 1 ellenpélda elég.', '„Van olyan” igazolása: 1 példa elég.', '„Egyik sem” cáfolata: 1 példa elég.', 'A példa a megadott csoportból legyen!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrueFalse4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <TrueFalse4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default TrueFalse4Quiz;
