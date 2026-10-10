import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { WordProblemsMatcher } from './WordProblemsMatcher';
import { WordProblemsSorter } from './WordProblemsSorter';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Home,
  IceCream,
  Clock,
  BookOpen
} from 'lucide-react';

interface WordProblemsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Szöveges Feladat Megoldási Algoritmusa',
    icon: <BookOpen className="w-4 h-4 text-teal-600" />,
    formula: 'Szövegértés ➔ Alap rögzítése ➔ Modell ➔ Számítás ➔ Ellenőrzés',
    note: 'Mindig azonosítsd, hogy mi a viszonyítási alap (a 100%), és a szöveges adatok alapján végezz életszerű ellenőrzést!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="10" width="30" height="30" rx="3" fill="#ccfbf1" stroke="#0d9488" />
        <text x="25" y="28" textAnchor="middle" className="text-[9px] font-bold fill-teal-900">100%</text>
        <path d="M 45 25 L 75 25" stroke="#0d9488" strokeWidth="2" />
        <rect x="80" y="10" width="30" height="30" rx="3" fill="#e0f2fe" stroke="#0284c7" />
        <text x="95" y="28" textAnchor="middle" className="text-[9px] font-bold fill-sky-900">Modell</text>
        <path d="M 115 25 L 140 25" stroke="#0284c7" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Lakásvásárlás és Pénzügyek',
    icon: <Home className="w-4 h-4 text-blue-600" />,
    formula: 'Előleg = Ár · 0,15  •  Hitel = Ár · 0,30  •  Illeték = Ár · 0,04',
    note: '16M Ft lakásnál az előleg 2,4M Ft, a hitel 4,8M Ft, az állami illeték pedig 640 000 Ft (4%).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="22" textAnchor="middle" className="text-[10px] font-bold fill-teal-700">15% Előleg</text>
        <text x="35" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">2,4M Ft</text>
        <text x="80" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">+</text>
        <text x="125" y="22" textAnchor="middle" className="text-[10px] font-bold fill-blue-700">30% Hitel</text>
        <text x="125" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">4,8M Ft</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A Jégkrém Visszatöltési Szabálya',
    icon: <IceCream className="w-4 h-4 text-emerald-600" />,
    formula: 'p% = (Eladott % / Maradt %) · 100% = (55 / 45) · 100% = 122,2%',
    note: 'Ha eladtunk 55%-ot, maradt 45%. A hiány pótlásakor a megmaradt 45% az új alap, így több mint a duplájával (+122,2%) kell növelni!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="20" y="10" width="45" height="30" fill="#fecdd3" stroke="#e11d48" />
        <text x="42" y="28" textAnchor="middle" className="text-[9px] font-bold fill-rose-900">-55%</text>
        <text x="80" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">➔</text>
        <rect x="95" y="10" width="45" height="30" fill="#bbf7d0" stroke="#16a34a" />
        <text x="117" y="28" textAnchor="middle" className="text-[9px] font-bold fill-emerald-900">+122,2%</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Munkaidő és Hatékonyság',
    icon: <Clock className="w-4 h-4 text-indigo-600" />,
    formula: 't_együtt = t_egyedül / (1 + hatékonyság) = 6 / 1,5 = 4 óra',
    note: 'Fordított arányosság: 50%-kal nagyobb hatékonyság 1,5-szörös tempót jelent, ami 6 / 1,5 = 4 óra munkaidőt eredményez.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="40" y="25" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">6 óra</text>
        <path d="M 65 25 L 95 25" stroke="#6366f1" strokeWidth="2" />
        <text x="80" y="18" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600">: 1,5</text>
        <text x="125" y="25" textAnchor="middle" className="text-[11px] font-mono font-bold fill-indigo-700">4 óra</text>
      </svg>
    )
  }
];

const wordProblemsQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: 'Egy matematikadolgozat átlaga 4,56 lett, ami 14%-kal jobb (nagyobb), mint a földrajzdolgozatok átlaga. Mennyi lett az osztályátlag földrajzból?',
    options: ['3,80', '4,00', '4,12', '4,20'],
    correctAnswer: '4,00',
    explanation: 'A földrajz az Alap (100%), a matek az 1,14-szerese: 4,56 / 1,14 = 4,00.',
    difficulty: 'easy',
    category: 'Átlagok és arányok'
  },
  {
    id: 'q2',
    text: 'Görögországi utazásunk során az út 75%-át repülővel tettük meg, az ötödét (20%-át) autóval, és 120 km-t biciklivel. Az út hány százalékát tettük meg biciklivel?',
    options: ['3%', '5%', '8%', '10%'],
    correctAnswer: '5%',
    explanation: '100% - 75% - 20% = 5%.',
    difficulty: 'easy',
    category: 'Utazás és részek'
  },
  {
    id: 'q3',
    text: 'Ha a 120 km biciklizés a teljes görögországi utazás 5%-a volt, hány kilométert utaztunk összesen a nyáron?',
    options: ['1800 km', '2000 km', '2400 km', '2500 km'],
    correctAnswer: '2400 km',
    explanation: 'Teljes út (Alap) = 120 / 0,05 = 2400 km.',
    difficulty: 'easy',
    category: 'Alap keresése'
  },
  {
    id: 'q4',
    text: 'Egy laptop 200 000 Ft-ba kerül. Megtakarításból kifizetünk 140 000 Ft-ot. A hiányzó 60 000 Ft-ra 15% kamatot számolnak fel félévre. Mennyi a kamat összege Ft-ban?',
    options: ['7500 Ft', '8000 Ft', '9000 Ft', '10 000 Ft'],
    correctAnswer: '9000 Ft',
    explanation: '60 000 · 0,15 = 9000 Ft.',
    difficulty: 'easy',
    category: 'Pénzügy és kamat'
  },
  {
    id: 'q5',
    text: 'Lakásvásárláskor a szerződés megkötésekor a lakás árának 15%-át kell kifizetni előlegként. Lucáék szülei 2,4 millió Ft-ot fizettek előlegként. Mennyibe került a lakás?',
    options: ['14 000 000 Ft', '15 000 000 Ft', '16 000 000 Ft', '18 000 000 Ft'],
    correctAnswer: '16 000 000 Ft',
    explanation: '2 400 000 / 0,15 = 16 000 000 Ft (16 millió Ft).',
    difficulty: 'easy',
    category: 'Lakásvásárlás'
  },
  {
    id: 'q6',
    text: 'A Margarita pizzázóban a mai nap eladott pizzák 16%-a sajtos, 20%-a hawaii és a fele (50%-a) sonkás volt. A pizzák hány százaléka volt zöldséges?',
    options: ['12%', '14%', '15%', '18%'],
    correctAnswer: '14%',
    explanation: '100% - 16% - 20% - 50% = 14%.',
    difficulty: 'easy',
    category: 'Gasztronómia'
  },
  {
    id: 'q7',
    text: 'A pizzériában 35 darab zöldséges pizza készült, ami az összes ma készült pizza 14%-a. Hány pizza készült összesen a mai nap?',
    options: ['200 db', '225 db', '250 db', '280 db'],
    correctAnswer: '250 db',
    explanation: '35 / 0,14 = 250 darab pizza.',
    difficulty: 'easy',
    category: 'Gasztronómia'
  },
  {
    id: 'q8',
    text: 'Egy iskolai büntetődobó bajnokságon 40 pontot lehetett szerezni. Dávid a pontok 85%-át szerezte meg. Hány pontot dobott Dávid?',
    options: ['32 pont', '34 pont', '35 pont', '36 pont'],
    correctAnswer: '34 pont',
    explanation: '40 · 0,85 = 34 pont.',
    difficulty: 'easy',
    category: 'Sport és pontok'
  },
  {
    id: 'q9',
    text: 'Anna a büntetődobások 40 pontjának 9/10 részét szerezte meg. Hány pontot ért el Anna?',
    options: ['34 pont', '35 pont', '36 pont', '38 pont'],
    correctAnswer: '36 pont',
    explanation: '40 · 9/10 = 36 pont.',
    difficulty: 'easy',
    category: 'Sport és pontok'
  },
  {
    id: 'q10',
    text: 'Lali a megszerezhető 40 pontból 26 pontot ért el. Hány százalékos volt Lali dobóteljesítménye?',
    options: ['60%', '62,5%', '65%', '67,5%'],
    correctAnswer: '65%',
    explanation: '26 / 40 = 13 / 20 = 65 / 100 = 65%.',
    difficulty: 'easy',
    category: 'Sport és pontok'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'A 200 000 Ft-os laptophoz felvett 60 000 Ft hitel a 15% kamattal együtt 69 000 Ft-ra nő. Hány forint lesz a havi törlesztőrészlet hathavi egyenlő részletfizetés esetén?',
    options: ['11 000 Ft', '11 500 Ft', '12 000 Ft', '12 500 Ft'],
    correctAnswer: '11 500 Ft',
    explanation: '69 000 / 6 = 11 500 Ft/hó.',
    difficulty: 'medium',
    category: 'Pénzügy és kamat'
  },
  {
    id: 'q12',
    text: 'Egy diák tengerimalac-állománya félévente 20%-kal növekszik. Jelenleg 100 tengerimalaca van. Hány tengerimalaca lesz fél év múlva, és hány 1 év múlva?',
    options: ['110 és 120', '120 és 140', '120 és 144', '125 és 150'],
    correctAnswer: '120 és 144',
    explanation: 'Fél év múlva: 100 · 1,2 = 120 db. Egy év múlva: 120 · 1,2 = 144 db.',
    difficulty: 'medium',
    category: 'Populáció növekedés'
  },
  {
    id: 'q13',
    text: 'Egy tableteket forgalmazó cég a 48 000 Ft-os előállítási költséget 150%-kal megnövelve szabta meg a tablet bevezető fogyasztói árát. Mennyiért árulták a piacra kerüléskor?',
    options: ['72 000 Ft', '96 000 Ft', '120 000 Ft', '144 000 Ft'],
    correctAnswer: '120 000 Ft',
    explanation: '48 000 · (1 + 1,50) = 48 000 · 2,50 = 120 000 Ft.',
    difficulty: 'medium',
    category: 'Kereskedelem és árképzés'
  },
  {
    id: 'q14',
    text: 'A 120 000 Ft-os tablet árát a verseny miatt később 30%-kal csökkentették. Hány forinttal csökkentették a tablet árát?',
    options: ['24 000 Ft', '30 000 Ft', '36 000 Ft', '40 000 Ft'],
    correctAnswer: '36 000 Ft',
    explanation: '120 000 · 0,30 = 36 000 Ft (az új ár 84 000 Ft lett).',
    difficulty: 'medium',
    category: 'Kereskedelem és árképzés'
  },
  {
    id: 'q15',
    text: 'A 16 millió Ft-os lakás vásárlásához a szülők a vételár 30%-át kitevő bankhitelt vettek fel. Mekkora hitelösszegre volt szükség?',
    options: ['3,6 millió Ft', '4,2 millió Ft', '4,8 millió Ft', '5,4 millió Ft'],
    correctAnswer: '4,8 millió Ft',
    explanation: '16 000 000 · 0,30 = 4 800 000 Ft (4,8 millió Ft).',
    difficulty: 'medium',
    category: 'Lakásvásárlás'
  },
  {
    id: 'q16',
    text: 'A 16 millió Ft értékű lakás vásárlásakor a családnak 640 000 Ft vagyonszerzési illetéket kellett befizetnie. A lakás árának hány százaléka ez az illeték?',
    options: ['2%', '3%', '4%', '5%'],
    correctAnswer: '4%',
    explanation: '640 000 / 16 000 000 = 0,04 = 4%.',
    difficulty: 'medium',
    category: 'Lakásvásárlás'
  },
  {
    id: 'q17',
    text: 'A nagy nyári hőségben eladták a jégkrémek 55%-át. Hány százalékkal kell növelni a megmaradt mennyiséget ahhoz, hogy újra az eredeti készlet legyen?',
    options: ['55%-kal', '82,5%-kal', '100%-kal', '122,2%-kal'],
    correctAnswer: '122,2%-kal',
    explanation: 'Maradt 45%. Szükséges növekmény: 55%. Százalékláb: 55 / 45 = 11/9 ≈ 1,222 ➔ +122,2% növelés.',
    difficulty: 'medium',
    category: 'Alapváltási feladatok'
  },
  {
    id: 'q18',
    text: 'A 250 darab elkészült pizzából 16% volt sajtos pizza. Mennyi volt a sajtos pizzákból származó teljes bevétel, ha egy pizza 750 Ft-ba kerül?',
    options: ['24 000 Ft', '28 000 Ft', '30 000 Ft', '32 500 Ft'],
    correctAnswer: '30 000 Ft',
    explanation: 'Sajtos pizza: 250 · 0,16 = 40 db. Bevétel: 40 · 750 = 30 000 Ft.',
    difficulty: 'medium',
    category: 'Gasztronómia'
  },
  {
    id: 'q19',
    text: 'Egy amerikai ember évente 8 kg chipset eszik, ami 23-szorosa a magyarnak. Hány százaléka a magyar chipsfogyasztás az amerikainak?',
    options: ['2,3%', '4,35%', '5,25%', '8%'],
    correctAnswer: '4,35%',
    explanation: '1 / 23 ≈ 0,04348 = 4,35% (a magyar fejenként kb. 0,348 kg-ot eszik).',
    difficulty: 'medium',
    category: 'Statisztikai összehasonlítás'
  },
  {
    id: 'q20',
    text: 'Egy fogorvosi felmérésen megkérdezett gyerekek 45%-a, azaz 5400 gyerek válaszolta, hogy naponta kétszer mos fogat. Hány gyereket kérdeztek meg összesen?',
    options: ['10 000', '11 500', '12 000', '13 200'],
    correctAnswer: '12 000',
    explanation: '5400 / 0,45 = 12 000 gyerek.',
    difficulty: 'medium',
    category: 'Felmérések és diagramok'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Eszter egyedül 6 óra alatt takarítja ki a lakást. Ha öccse, Kristóf is segít neki, akkor ketten együtt 50%-kal hatékonyabbak. Mennyi idő alatt végeznek ketten?',
    options: ['3 óra', '4 óra', '4,5 óra', '5 óra'],
    correctAnswer: '4 óra',
    explanation: '50%-kal hatékonyabb munka 1,5-szörös sebességet jelent. Fordított arányossággal a szükséges idő: 6 / 1,5 = 4 óra!',
    difficulty: 'hard',
    category: 'Munkavégzés és hatékonyság'
  },
  {
    id: 'q22',
    text: 'Szofi jegyeinek 65%-a ötös, 25%-a négyes, és van 2 darab hármasa is (más jegye nincs). Mennyi Szofi jegyeinek pontos átlaga?',
    options: ['4,35', '4,45', '4,50', '4,55'],
    correctAnswer: '4,55',
    explanation: 'A 2 hármas a jegyek 100% - (65 + 25)% = 10%-a. Összes jegy: 2 / 0,10 = 20 db (13 ötös, 5 négyes, 2 hármas). Összeg: 13·5 + 5·4 + 2·3 = 65 + 20 + 6 = 91. Átlag: 91 / 20 = 4,55.',
    difficulty: 'hard',
    category: 'Statisztika és átlag'
  },
  {
    id: 'q23',
    text: 'Egy fogorvosi felmérés szerint a megkérdezett gyerekek 5%-a nem mos fogat. Egy 1000 fős iskolában várhatóan hány gyerek nem mos fogat?',
    options: ['25', '40', '50', '60'],
    correctAnswer: '50',
    explanation: '1000 · 0,05 = 50 tanuló.',
    difficulty: 'hard',
    category: 'Felmérések és diagramok'
  },
  {
    id: 'q24',
    text: 'Gyümölcssaláta készítéséhez 4 főre 40 dkg alma, 20 dkg narancs, 30 dkg banán és 25 dkg meggy kell. Hány százaléka alma a kész salátának?',
    options: ['30%', '32,5%', '34,78%', '40%'],
    correctAnswer: '34,78%',
    explanation: 'Össztömeg: 40 + 20 + 30 + 25 = 115 dkg. Alma aránya: 40 / 115 ≈ 0,3478 = 34,78%.',
    difficulty: 'hard',
    category: 'Receptek és arányok'
  },
  {
    id: 'q25',
    text: 'Hány kg banánra van szükség 5,75 kg (575 dkg) gyümölcssaláta elkészítéséhez, ha 115 dkg salátába 30 dkg banán kerül?',
    options: ['1,2 kg', '1,4 kg', '1,5 kg', '1,8 kg'],
    correctAnswer: '1,5 kg',
    explanation: '575 · (30 / 115) = 5 · 30 = 150 dkg = 1,5 kg banán.',
    difficulty: 'hard',
    category: 'Receptek és arányok'
  },
  {
    id: 'q26',
    text: 'Egy cég 12 500 tabletet adott el a 120 000 Ft-os bevezető áron, és 21 000 darabot a 84 000 Ft-os csökkentett áron. Mennyi volt a cég teljes bevétele?',
    options: ['2,85 milliárd Ft', '3,12 milliárd Ft', '3,264 milliárd Ft', '3,48 milliárd Ft'],
    correctAnswer: '3,264 milliárd Ft',
    explanation: '12 500 · 120 000 = 1 500 000 000 Ft, 21 000 · 84 000 = 1 764 000 000 Ft. Összesen: 3 264 000 000 Ft (3,264 milliárd Ft).',
    difficulty: 'hard',
    category: 'Kereskedelem és bevétel'
  },
  {
    id: 'q27',
    text: 'Egy téglalap oldalai 15 és 10 egység hosszúságúak. Hosszabbik oldalát 30%-kal csökkentjük (10,5), rövidebbik oldalát 20%-kal növeljük (12). Hány százalékkal változott a területe?',
    options: ['10%-kal nőtt', '10%-kal csökkent', '16%-kal csökkent', '16%-kal nőtt'],
    correctAnswer: '16%-kal csökkent',
    explanation: 'T_eredeti = 150. T_új = 10,5 · 12 = 126. Változás: (150 - 126) / 150 = 24 / 150 = 16% csökkenés (0,7 · 1,2 = 0,84).',
    difficulty: 'hard',
    category: 'Geometria'
  },
  {
    id: 'q28',
    text: 'Egy 100 tengerimalacból álló tenyészet félévente 20%-kal szaporodik. Hány tengerimalac lesz a tenyészetben 2 év (4 egymást követő félév) múlva egészre kerekítve?',
    options: ['180 db', '196 db', '207 db', '224 db'],
    correctAnswer: '207 db',
    explanation: '100 · 1,20⁴ = 100 · 2,0736 ≈ 207 tengerimalac.',
    difficulty: 'hard',
    category: 'Populáció növekedés'
  },
  {
    id: 'q29',
    text: 'Dóri 2 ponttal kevesebbet szerzett a kosárlabda büntetődobó bajnokságon, mint Anna, aki a 40 pont 9/10 részét (36 pont) szerezte meg. Hány százalékos lett Dóri dobóteljesítménye?',
    options: ['80%', '82,5%', '85%', '87,5%'],
    correctAnswer: '85%',
    explanation: 'Dóri pontjai: 36 - 2 = 34 pont. Százalékláb: 34 / 40 = 85 / 100 = 85%.',
    difficulty: 'hard',
    category: 'Sport és pontok'
  },
  {
    id: 'q30',
    text: 'Egy diák egy héten 30 tanórán vesz részt, és 15 órát tölt otthon iskolai felkészüléssel. A heti 168 órának hány százalékát tölti tanulással (kerekítve)?',
    options: ['22%', '25%', '27%', '30%'],
    correctAnswer: '27%',
    explanation: 'Összes tanulási idő: 30 + 15 = 45 óra. Százalékláb: 45 / 168 ≈ 0,2678 = 26,8% ≈ 27%.',
    difficulty: 'hard',
    category: 'Időgazdálkodás'
  }
];

export const WordProblemsQuiz: React.FC<WordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-word-quiz"
      topicTitle="Szöveges feladatok"
      title="Szöveges feladatok - Gyakorló Kvíz"
      subtitle="30 életszerű feladat 3 nehézségi szinten: pénzügy, hitel, receptek, hatékonyság, diagramok és populációk"
      badge="GYAKORLÓ KVÍZ"
      themeColor="teal"
      questions={wordProblemsQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <WordProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <WordProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default WordProblemsQuiz;
