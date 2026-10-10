import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PracticeMatcher } from './PracticeMatcher';
import { PracticeSorter } from './PracticeSorter';
import {
  Percent,
  Calculator,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Receipt,
  Scale
} from 'lucide-react';

interface PracticeQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Három Alaptípus Képlete',
    icon: <Percent className="w-4 h-4 text-amber-600" />,
    formula: 'É = A · (p/100)  •  A = É / (p/100)  •  p% = (É/A) · 100%',
    note: 'Százalékérték keresésekor szorzunk, Alap keresésekor osztunk a tizedessel, Százaléklábnál arányt képezünk.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="40" height="34" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="30" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-amber-800">Érték</text>
        <text x="65" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">=</text>
        <rect x="80" y="8" width="34" height="34" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="97" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-800">Alap</text>
        <text x="123" y="30" textAnchor="middle" className="text-[12px] font-bold fill-slate-400">·</text>
        <text x="142" y="30" textAnchor="middle" className="text-[11px] font-mono font-bold fill-emerald-600">p%</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'ÁFA és Bruttó-Nettó Számítás',
    icon: <Receipt className="w-4 h-4 text-emerald-600" />,
    formula: 'Bruttó = Nettó · (1 + ÁFA/100)  •  Nettó = Bruttó / (1 + ÁFA/100)',
    note: 'A nettó ár a 100%. 27%-os ÁFA esetén bruttó = nettó · 1,27. Visszafelé 1,27-tel osztunk (nem vonunk ki 27%-ot!).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="30" y="30" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600">Nettó</text>
        <path d="M 50 25 L 75 25" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="63" y="18" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">· 1,27</text>
        <text x="100" y="30" textAnchor="middle" className="text-[10px] font-mono font-bold fill-purple-600">Bruttó</text>
        <path d="M 120 25 L 145 25" stroke="#3b82f6" strokeWidth="2" />
        <text x="133" y="18" textAnchor="middle" className="text-[9px] font-bold fill-blue-600">: 1,27</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A Teve és az Alapváltás Szabálya',
    icon: <Scale className="w-4 h-4 text-rose-600" />,
    formula: '500 kg ➔ 300 kg (-40%)  ≠  300 kg ➔ 500 kg (+66,7%)',
    note: 'A fogyás után a visszahízás alapja már a lefogyott teve (300 kg), ezért a 200 kg visszahízás 200/300 = 66,7%-os gyarapodás!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="22" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">-40%</text>
        <text x="35" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">200/500</text>
        <text x="80" y="30" textAnchor="middle" className="text-[13px] font-bold fill-slate-400">≠</text>
        <text x="125" y="22" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">+66,7%</text>
        <text x="125" y="38" textAnchor="middle" className="text-[9px] font-mono fill-slate-500">200/300</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Egymást Követő Változások és Halmazok',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    formula: 'Kétszer +10% = +21%  •  Metszet % = A% + B% - 100%',
    note: 'Két egymást követő 10%-os emelés 1,1 · 1,1 = 1,21 (+21%). Halmazoknál a 70% + 60% = 130% feletti rész a közös metszet: 30%.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="65" cy="25" r="18" fill="#93c5fd" fillOpacity="0.5" stroke="#3b82f6" />
        <circle cx="95" cy="25" r="18" fill="#fde047" fillOpacity="0.5" stroke="#eab308" />
        <text x="80" y="29" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">30%</text>
      </svg>
    )
  }
];

const practiceQuestions: Question[] = [
  // ==========================================
  // KÖNNYŰ SZINT (1-10)
  // ==========================================
  {
    id: 'q1',
    text: '150 g tömegű csokoládé 45%-a kakaó. Hány gramm kakaót tartalmaz a csokoládé?',
    options: ['45 g', '60 g', '67,5 g', '75 g'],
    correctAnswer: '67,5 g',
    explanation: 'Százalékérték számítás: 150 · 0,45 = 67,5 g.',
    difficulty: 'easy',
    category: 'Alaptípusok felismerése'
  },
  {
    id: 'q2',
    text: 'Andris 32 jó feladata a dolgozat összes feladatának 80%-a. Hány feladatból állt a dolgozat?',
    options: ['36', '40', '48', '50'],
    correctAnswer: '40',
    explanation: 'Alap keresése: 32 / 0,8 = 40 feladat.',
    difficulty: 'easy',
    category: 'Alaptípusok felismerése'
  },
  {
    id: 'q3',
    text: 'Egy 25 fős osztály matematika dolgozatán 5 tanuló kapott jelest (5-öst). A tanulók hány százaléka írt jeles dolgozatot?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: '20%',
    explanation: 'Százalékláb meghatározása: 5 / 25 = 1/5 = 0,2 = 20%.',
    difficulty: 'easy',
    category: 'Alaptípusok felismerése'
  },
  {
    id: 'q4',
    text: 'Egy tankönyv nettó ára 5600 Ft, és 5%-os ÁFA terheli. Mennyi a könyv bruttó (fizetendő) ára?',
    options: ['5720 Ft', '5880 Ft', '5900 Ft', '6160 Ft'],
    correctAnswer: '5880 Ft',
    explanation: 'Bruttó ár = Nettó · (1 + ÁFA/100) = 5600 · 1,05 = 5880 Ft.',
    difficulty: 'easy',
    category: 'ÁFA és árak'
  },
  {
    id: 'q5',
    text: 'Egy csomag édes keksz nettó ára 500 Ft. Mennyi a bruttó ára az általános 27%-os ÁFA mellett?',
    options: ['527 Ft', '600 Ft', '635 Ft', '670 Ft'],
    correctAnswer: '635 Ft',
    explanation: 'Bruttó ár = 500 · 1,27 = 635 Ft (az ÁFA összege 135 Ft).',
    difficulty: 'easy',
    category: 'ÁFA és árak'
  },
  {
    id: 'q6',
    text: 'Egy 700 Ft-os sajtra 25%-os árengedményt adnak. Mennyit kell fizetni érte a pénztárnál?',
    options: ['475 Ft', '525 Ft', '550 Ft', '575 Ft'],
    correctAnswer: '525 Ft',
    explanation: 'A fizetendő ár az eredeti 75%-a: 700 · (1 - 0,25) = 700 · 0,75 = 525 Ft.',
    difficulty: 'easy',
    category: 'Árváltozások'
  },
  {
    id: 'q7',
    text: 'Egy 3200 Ft-os könyvből 400 Ft engedményt adnak. Hány százalékos az árengedmény?',
    options: ['10%', '12,5%', '15%', '16%'],
    correctAnswer: '12,5%',
    explanation: '400 / 3200 = 1 / 8 = 0,125 = 12,5%.',
    difficulty: 'easy',
    category: 'Árváltozások'
  },
  {
    id: 'q8',
    text: 'Egy 500 kg-os teve testsúlyának 40%-át elveszíti a sivatagi átkelés során. Hány kilogramm a teve súlyvesztesége?',
    options: ['150 kg', '200 kg', '250 kg', '300 kg'],
    correctAnswer: '200 kg',
    explanation: 'Súlyveszteség = 500 · 0,40 = 200 kg.',
    difficulty: 'easy',
    category: 'Súlyváltozás és alap'
  },
  {
    id: 'q9',
    text: 'Mekkora a teve testtömege a 40%-os fogyás után, ha eredetileg 500 kg volt?',
    options: ['200 kg', '250 kg', '300 kg', '350 kg'],
    correctAnswer: '300 kg',
    explanation: '500 kg - 200 kg = 300 kg (vagy 500 · 0,60 = 300 kg).',
    difficulty: 'easy',
    category: 'Súlyváltozás és alap'
  },
  {
    id: 'q10',
    text: 'Adorján első fotójára 68 lájk érkezett, a következőre 85. Hány százalékkal kapott több lájkot a második kép?',
    options: ['17%', '20%', '25%', '28%'],
    correctAnswer: '25%',
    explanation: 'Növekedés = 85 - 68 = 17 lájk. Alap a régi érték: 17 / 68 = 1/4 = 0,25 = 25%.',
    difficulty: 'easy',
    category: 'Árváltozások'
  },

  // ==========================================
  // KÖZEPES SZINT (11-20)
  // ==========================================
  {
    id: 'q11',
    text: 'A 300 kg-ra lefogyott teve az oázisban addig táplálkozik, amíg vissza nem nyeri eredeti 500 kg-os súlyát. Hány százalékkal gyarapodott a súlya a hízás során?',
    options: ['40%', '50%', '60%', '66,7%'],
    correctAnswer: '66,7%',
    explanation: 'Alapváltás: most a 300 kg a kiinduló alap (100%)! A gyarapodás 200 kg. 200 / 300 = 2/3 ≈ 66,67% ≈ 66,7%.',
    difficulty: 'medium',
    category: 'Alapváltási csapda'
  },
  {
    id: 'q12',
    text: 'Egy 5600 Ft-os pulóvert leáraznak 4760 Ft-ra. Hány százalékos engedményt adott az üzlet?',
    options: ['12%', '14%', '15%', '18%'],
    correctAnswer: '15%',
    explanation: 'Engedmény összege: 5600 - 4760 = 840 Ft. Százalékláb: 840 / 5600 = 0,15 = 15%.',
    difficulty: 'medium',
    category: 'Árváltozások'
  },
  {
    id: 'q13',
    text: 'Egy használt autó ára 20%-os áremelés után 3 000 000 Ft lett. Mennyi volt az autó ára az áremelés előtt?',
    options: ['2 400 000 Ft', '2 500 000 Ft', '2 600 000 Ft', '2 800 000 Ft'],
    correctAnswer: '2 500 000 Ft',
    explanation: 'Az új ár a régi ár 120%-a: Régi ár = 3 000 000 / 1,2 = 2 500 000 Ft.',
    difficulty: 'medium',
    category: 'Alap keresése'
  },
  {
    id: 'q14',
    text: 'Egy termék ára 10 000 Ft. Először felemelik 20%-kal, majd az új árat leértékelik 20%-kal. Mennyi lesz a végső ár?',
    options: ['9600 Ft', '9800 Ft', '10 000 Ft', '10 400 Ft'],
    correctAnswer: '9600 Ft',
    explanation: '1. lépés: 10 000 · 1,20 = 12 000 Ft. 2. lépés: 12 000 · 0,80 = 9600 Ft. A termék 4%-kal olcsóbb lett az eredetinél!',
    difficulty: 'medium',
    category: 'Egymást követő változások'
  },
  {
    id: 'q15',
    text: 'A palacsintázóban kétszer egymás után 10%-kal emelték a palacsinták árát. Összesen hány százalékkal lett drágább a palacsinta az eredeti árhoz képest?',
    options: ['19%', '20%', '21%', '22%'],
    correctAnswer: '21%',
    explanation: 'Egymást követő szorzás: 1,10 · 1,10 = 1,21, ami pontosan 21%-os drágulásnak felel meg!',
    difficulty: 'medium',
    category: 'Egymást követő változások'
  },
  {
    id: 'q16',
    text: 'Egy doboz keksz bruttó ára 635 Ft, és 27%-os ÁFA-t tartalmaz. Mennyi a keksz nettó ára?',
    options: ['463,55 Ft', '500 Ft', '508 Ft', '520 Ft'],
    correctAnswer: '500 Ft',
    explanation: 'Nettó ár = Bruttó / 1,27 = 635 / 1,27 = 500 Ft.',
    difficulty: 'medium',
    category: 'ÁFA és árak'
  },
  {
    id: 'q17',
    text: 'A 250 g-os tehéntúró 18%-os ÁFA-tartalma pontosan 63 Ft. Mennyi a tehéntúró bruttó (fizetendő) fogyasztói ára?',
    options: ['350 Ft', '387 Ft', '413 Ft', '425 Ft'],
    correctAnswer: '413 Ft',
    explanation: 'Nettó ár = 63 / 0,18 = 350 Ft. Bruttó ár = 350 + 63 = 413 Ft.',
    difficulty: 'medium',
    category: 'ÁFA és árak'
  },
  {
    id: 'q18',
    text: 'Egy iskolába 750 tanuló jár. Közülük 210 diák az iskola sítáborába megy. A tanulók hány százaléka jelentkezett a táborba?',
    options: ['25%', '28%', '30%', '32%'],
    correctAnswer: '28%',
    explanation: '210 / 750 = 21 / 75 = 7 / 25 = 28 / 100 = 28%.',
    difficulty: 'medium',
    category: 'Százalékláb meghatározása'
  },
  {
    id: 'q19',
    text: 'A 25 fős osztályban a dolgozatok megoszlása: 5 jeles, 8 jó, 6 közepes, 4 elégséges, 2 elégtelen. A tanulók hány százaléka kapott legalább közepest (3, 4 vagy 5)?',
    options: ['68%', '72%', '76%', '80%'],
    correctAnswer: '76%',
    explanation: 'Legalább közepes tanulók száma: 5 + 8 + 6 = 19 fő. Százalékos arány: 19 / 25 = 76 / 100 = 76%.',
    difficulty: 'medium',
    category: 'Diagram & Statisztika'
  },
  {
    id: 'q20',
    text: 'A tokiói paralimpián a magyar csapat 16 érmet szerzett, ebből 4 bronzérem volt. Az aranyérmek száma 40%-kal több volt az ezüstérmek számánál. Hány aranyérmet nyertek a sportolók?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: 'Arany + ezüst = 16 - 4 = 12 érem. Ha ezüst = x, arany = 1,4x. x + 1,4x = 12 ➔ 2,4x = 12 ➔ x = 5 ezüst, így arany = 1,4 · 5 = 7.',
    difficulty: 'medium',
    category: 'Szöveges feladatok'
  },

  // ==========================================
  // NEHÉZ SZINT (21-30)
  // ==========================================
  {
    id: 'q21',
    text: 'Egy 30 fős osztályban a gyerekek 70%-a szereti a mézet, 60%-a a mazsolát, és mindenki szereti legalább az egyiket. Hány gyerek szereti mindkettőt?',
    options: ['6', '8', '9', '12'],
    correctAnswer: '9',
    explanation: 'Halmazok metszete: 70% + 60% - 100% = 30%. A 30 fős osztály 30%-a: 30 · 0,30 = 9 gyerek.',
    difficulty: 'hard',
    category: 'Halmazos százalékszámítás'
  },
  {
    id: 'q22',
    text: 'Lázár varázsló 200 varázslatot tud. 23%-uk kezdődik „csiribú”-val, 84%-uk „csiribá”-val, és 14 varázslat mindkettővel. Hány varázslat kezdődik CSAK „csiribá”-val?',
    options: ['140', '154', '168', '175'],
    correctAnswer: '154',
    explanation: 'A 14 varázslat a 200-nak a 7%-a. Csak csiribá = 84% - 7% = 77%. 200 · 0,77 = 154 varázslat (vagy 200 · 0,84 = 168, és 168 - 14 = 154).',
    difficulty: 'hard',
    category: 'Halmazos százalékszámítás'
  },
  {
    id: 'q23',
    text: 'Hány százalékkal kell csökkenteni egy négyzet oldalát, hogy a területe az eredeti terület 64%-a legyen?',
    options: ['16%', '20%', '32%', '36%'],
    correctAnswer: '20%',
    explanation: 'T_új = 0,64 · T_régi, tehát a_új = √0,64 · a = 0,8 · a. Az oldal 80%-a lesz a réginek, tehát 20%-kal kell csökkenteni!',
    difficulty: 'hard',
    category: 'Geometria & Terület'
  },
  {
    id: 'q24',
    text: 'Maxim évfolyamán a diákok 40%-a fiú, a fiúk 40%-a szemüveges, a szemüveges fiúk 40%-a barna hajú. Pontosan 8 barna hajú, szemüveges fiú jár az évfolyamra. Hány diák jár összesen Maxim évfolyamára?',
    options: ['100', '120', '125', '150'],
    correctAnswer: '125',
    explanation: 'Részarány: 0,40 · 0,40 · 0,40 = 0,064 (6,4%). Alap = 8 / 0,064 = 125 tanuló.',
    difficulty: 'hard',
    category: 'Láncolt százalékok'
  },
  {
    id: 'q25',
    text: 'Egy könyv bruttó ára 5%-os ÁFA-val 5880 Ft. Mennyivel lenne drágább ugyanez a könyv, ha 27%-os ÁFA terhelné?',
    options: ['1050 Ft', '1120 Ft', '1232 Ft', '1512 Ft'],
    correctAnswer: '1232 Ft',
    explanation: 'Nettó ár = 5880 / 1,05 = 5600 Ft. 27%-os bruttó ár = 5600 · 1,27 = 7112 Ft. Különbség = 7112 - 5880 = 1232 Ft drágulás.',
    difficulty: 'hard',
    category: 'ÁFA és árak'
  },
  {
    id: 'q26',
    text: 'Tokió 2020 olimpia: A magyar küldöttség által nyert érmek 30%-a arany, 35%-a ezüst, és 7 bronzérem született. Hány érmet nyert összesen a magyar csapat?',
    options: ['18', '20', '21', '24'],
    correctAnswer: '20',
    explanation: 'Bronzérmek aránya: 100% - 30% - 35% = 35%. Összes érem = 7 / 0,35 = 20 érem.',
    difficulty: 'hard',
    category: 'Szöveges feladatok'
  },
  {
    id: 'q27',
    text: 'Egy iskolában a 750 tanulóból 210 diák az iskola sítáborába megy, és további 72 diák a családjával megy síelni. A tanulók hány százaléka síel összesen a télen?',
    options: ['34,2%', '36,5%', '37,6%', '39,4%'],
    correctAnswer: '37,6%',
    explanation: 'Összesen síel: 210 + 72 = 282 diák. Százalékláb: 282 / 750 = 0,376 = 37,6%.',
    difficulty: 'hard',
    category: 'Statisztika és részek'
  },
  {
    id: 'q28',
    text: 'Zita a nagymama minikrémeséből a második héten 4-gyel kevesebbet evett, mint az elsőn. Ez a 4 sütemény az összes elkészített minikrémes 10%-a volt. Hány minikrémes készült összesen?',
    options: ['30 db', '40 db', '50 db', '60 db'],
    correctAnswer: '40 db',
    explanation: 'Alap keresése: 4 / 0,10 = 40 minikrémes készült összesen.',
    difficulty: 'hard',
    category: 'Alap keresése'
  },
  {
    id: 'q29',
    text: 'A tejüzemben 1 kg (100 dkg) tejszínből 62 dkg vajat készítenek. Hány kg tejszín szükséges 1 kg (100 dkg) vaj előállításához? (Egy tizedesre kerekítve.)',
    options: ['1,4 kg', '1,6 kg', '1,8 kg', '2,0 kg'],
    correctAnswer: '1,6 kg',
    explanation: '100 / 0,62 ≈ 161,29 dkg ≈ 1,61 kg ≈ 1,6 kg tejszín kell.',
    difficulty: 'hard',
    category: 'Arányossági feladatok'
  },
  {
    id: 'q30',
    text: 'Egy okostelefon árát először felemelték 15%-kal, majd az új árat leértékelték 15%-kal. Hogyan változott a telefon végső ára a legelső kiinduló árhoz képest?',
    options: ['Változatlan maradt', '2,25%-kal csökkent', '2,25%-kal nőtt', '1,5%-kal csökkent'],
    correctAnswer: '2,25%-kal csökkent',
    explanation: '1,15 · 0,85 = 0,9775. Az ár az eredeti 97,75%-a lett, ami 100% - 97,75% = 2,25%-os csökkenést jelent!',
    difficulty: 'hard',
    category: 'Egymást követő változások'
  }
];

export const PracticeQuiz: React.FC<PracticeQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-percent-equations"
      topicId="g7-pct-practice-quiz"
      topicTitle="A százalékszámítás gyakorlása"
      title="A százalékszámítás gyakorlása - Gyakorló Kvíz"
      subtitle="30 életszerű feladat 3 nehézségi szinten: alaptípusok, ÁFA, teve súlyváltozás, láncolt árváltozások és halmazok"
      badge="GYAKORLÓ KVÍZ"
      themeColor="amber"
      questions={practiceQuestions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <PracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};

export default PracticeQuiz;
