import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SimilarityMatcher } from './SimilarityMatcher';
import { SimilaritySorter } from './SimilaritySorter';

const SIMILARITY_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapfogalmak és egyszerű méretezés (1-10)
  {
    id: 'sim-q1',
    level: 1,
    question: 'Hogyan definiáljuk a geometriai hasonlósági transzformációt?',
    options: [
      'Egy középpontos hasonlóság és egy egybevágósági transzformáció egymásutánjaként (kompozíciójaként)',
      'Két tetszőleges párhuzamos eltolás összegeként',
      'Kizárólag tengelyes tükrözések szorzataként',
      'Minden olyan leképezésként, amely megtartja a pontok közötti távolságot'
    ],
    correctAnswer: 0,
    explanation: 'A geometriai definíció szerint minden hasonlósági transzformáció előáll egy középpontos hasonlóság és egy egybevágóság egymásutánjaként.'
  },
  {
    id: 'sim-q2',
    level: 1,
    question: 'Egy háromszög két belső szöge 35° és 65°. Mekkora a hozzá hasonló másik háromszög harmadik szöge?',
    options: [
      '80°',
      '100°',
      '70°',
      'Nem határozható meg a hasonlóság aránya nélkül'
    ],
    correctAnswer: 0,
    explanation: 'A hasonlóság szögtartó transzformáció: a megfelelő szögek pontosan egyenlők. A harmadik szög 180° - 35° - 65° = 80° mindkét háromszögben.'
  },
  {
    id: 'sim-q3',
    level: 1,
    question: 'Egy sokszög kerülete 24 cm. Mekkora a hozzá hasonló sokszög kerülete, ha a hasonlóság aránya λ = 3?',
    options: [
      '72 cm',
      '216 cm',
      '8 cm',
      '48 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hasonló síkidomok kerületének aránya megegyezik a hasonlóság arányával: K\' = λ · K = 3 · 24 cm = 72 cm.'
  },
  {
    id: 'sim-q4',
    level: 1,
    question: 'Egy téglalap területe 15 cm². Mekkora a hozzá hasonló téglalap területe, ha a hasonlóság aránya λ = 2?',
    options: [
      '60 cm²',
      '30 cm²',
      '120 cm²',
      '45 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A területek aránya a hasonlósági arány négyzetével egyenlő: T\' = λ² · T = 2² · 15 cm² = 4 · 15 = 60 cm².'
  },
  {
    id: 'sim-q5',
    level: 1,
    question: 'Milyen kapcsolatban áll az egybevágóság a hasonlósággal?',
    options: [
      'Az egybevágóság a hasonlóság speciális esete, amikor a hasonlósági arány λ = 1',
      'Az egybevágóság és a hasonlóság egymást kizáró geometriai fogalmak',
      'Minden hasonlóság egyben egybevágóság is',
      'Az egybevágóság csak forgatásokra és eltolásokra értelmezhető'
    ],
    correctAnswer: 0,
    explanation: 'Az egybevágósági transzformációk halmaza valódi részhalmaza a hasonlósági transzformációk halmazának; λ = 1 esetén izometriáról (egybevágóságról) beszélünk.'
  },
  {
    id: 'sim-q6',
    level: 1,
    question: 'Egy háromszög egyik oldala 6 cm, a hozzá hasonló háromszög megfelelő oldala 15 cm. Mennyi a hasonlóság aránya (kisebbről a nagyobbra)?',
    options: [
      '2,5',
      '0,4',
      '9',
      '3'
    ],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya a képszakasz és az eredeti szakasz hosszának hányadosa: λ = 15 / 6 = 2,5.'
  },
  {
    id: 'sim-q7',
    level: 1,
    question: 'Két hasonló síkidom területe 18 cm² és 72 cm². Mennyi a hasonlóság aránya a nagyobb és a kisebb síkidom között?',
    options: [
      '2',
      '4',
      '√2',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'A területek aránya T₂ / T₁ = 72 / 18 = 4 = λ². Ebből a hasonlóság aránya: λ = √4 = 2.'
  },
  {
    id: 'sim-q8',
    level: 1,
    question: 'Igaz-e, hogy bármely két síkbeli négyzet hasonló egymáshoz?',
    options: [
      'Mindig igaz, mert minden szögük 90°-os és oldalaik aránya állandó',
      'Csak akkor igaz, ha középpontosan hasonlók',
      'Csak akkor igaz, ha azonos az oldalhosszuk',
      'Hamis, mert a tájolásuk eltérhet'
    ],
    correctAnswer: 0,
    explanation: 'Bármely két négyzet megfelelő szögei derékszögek (90° = 90°), oldalaik aránya pedig a₂/a₁, ezért minden négyzet hasonló egymáshoz.'
  },
  {
    id: 'sim-q9',
    level: 1,
    question: 'Egy kör sugara 4 cm, egy másik köré 12 cm. Milyen arányban áll egymással a két kör kerülete és területe?',
    options: [
      'Kerületek aránya 3, területek aránya 9',
      'Kerületek aránya 3, területek aránya 3',
      'Kerületek aránya 9, területek aránya 27',
      'Kerületek aránya 12, területek aránya 144'
    ],
    correctAnswer: 0,
    explanation: 'A sugárarány λ = 12 / 4 = 3. A kerületek aránya λ = 3, a területek aránya λ² = 3² = 9.'
  },
  {
    id: 'sim-q10',
    level: 1,
    question: 'Egy kocka éleit a 3-szorosára növeljük. Hányszorosára változik a kocka térfogata?',
    options: [
      '27-szeresére (3³)',
      '9-szeresére (3²)',
      '3-szorosára (3¹)',
      '81-szeresére (3⁴)'
    ],
    correctAnswer: 0,
    explanation: 'Térbeli hasonló testek térfogatának aránya a hasonlóság arányának köbével egyenlő: V\'/V = λ³ = 3³ = 27.'
  },

  // LEVEL 2: Tankönyvi feladatok és kombinált számítások (11-20)
  {
    id: 'sim-q11',
    level: 2,
    question: 'Egy háromszög oldalai 12 cm, 15 cm és 16 cm. Egy hozzá hasonló háromszög egyik oldala 10 cm. Ha a 10 cm-es oldal a legrövidebb oldalnak felel meg, mekkorák a többi oldalai?',
    options: [
      '12,5 cm és 13,33 cm (40/3 cm)',
      '13 cm és 14 cm',
      '8 cm és 9,5 cm',
      '15 cm és 20 cm'
    ],
    correctAnswer: 0,
    explanation: 'Ha a 10 cm-es oldal a 12 cm-esnek felel meg, akkor λ = 10/12 = 5/6. A többi oldal: 15 · (5/6) = 12,5 cm, és 16 · (5/6) = 80/6 = 13,33 cm.'
  },
  {
    id: 'sim-q12',
    level: 2,
    question: 'Ugyanezen háromszög (12 cm, 15 cm, 16 cm) esetén ha a 10 cm-es oldal a középső (15 cm-es) oldalnak felel meg, mennyi a hasonlóság aránya?',
    options: [
      '2/3 (≈ 0,667)',
      '5/6 (≈ 0,833)',
      '5/8 (0,625)',
      '3/2 (1,5)'
    ],
    correctAnswer: 0,
    explanation: 'Ha a 10 cm-es oldal a 15 cm-es oldalnak felel meg, a hasonlósági arány λ = 10 / 15 = 2/3.'
  },
  {
    id: 'sim-q13',
    level: 2,
    question: 'Egy egyenlő szárú háromszög oldalai 10 cm, 10 cm és 12 cm (kerülete 32 cm). Egy hozzá hasonló háromszög kerülete 16 dm. Mekkorák az oldalai?',
    options: [
      '50 cm, 50 cm és 60 cm',
      '30 cm, 30 cm és 36 cm',
      '20 cm, 20 cm és 24 cm',
      '100 cm, 100 cm és 120 cm'
    ],
    correctAnswer: 0,
    explanation: '16 dm = 160 cm. A kerületek aránya λ = 160 / 32 = 5. Az oldalak 5-ször akkorák: 5 · 10 = 50 cm, 5 · 10 = 50 cm és 5 · 12 = 60 cm.'
  },
  {
    id: 'sim-q14',
    level: 2,
    question: 'Az előző háromszög (10, 10, 12 cm) magassága m = 8 cm, így területe 48 cm². Egy hozzá hasonló háromszög területe 12 cm². Mekkorák ennek az oldalai?',
    options: [
      '5 cm, 5 cm és 6 cm',
      '2,5 cm, 2,5 cm és 3 cm',
      '7,5 cm, 7,5 cm és 9 cm',
      '4 cm, 4 cm és 5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A területek aránya: T\' / T = 12 / 48 = 1/4 = λ², amiből λ = 1/2. Az oldalak fele akkorák: 5 cm, 5 cm és 6 cm.'
  },
  {
    id: 'sim-q15',
    level: 2,
    question: 'Egy négyzet oldala 24 mm. Egy másik négyzet kerülete 24 mm. Mennyi a két négyzet hasonlóságának aránya?',
    options: [
      '4 (vagy 1/4)',
      '2 (vagy 1/2)',
      '16 (vagy 1/16)',
      '1 (egybevágók)'
    ],
    correctAnswer: 0,
    explanation: 'A második négyzet oldala: a₂ = 24 / 4 = 6 mm. A hasonlóság aránya: λ = 24 / 6 = 4 (vagy fordítva 6 / 24 = 0,25).'
  },
  {
    id: 'sim-q16',
    level: 2,
    question: 'Egy négyzet oldala 25 mm (2,5 cm). Egy másik négyzet területe 25 cm². Mennyi a két négyzet hasonlóságának aránya?',
    options: [
      '2 (vagy 0,5)',
      '10 (vagy 0,1)',
      '4 (vagy 0,25)',
      '5 (vagy 0,2)'
    ],
    correctAnswer: 0,
    explanation: 'A második négyzet területe 25 cm², így oldala a₂ = √25 = 5 cm. A hasonlósági arány: λ = 5 / 2,5 = 2 (vagy fordítva 0,5).'
  },
  {
    id: 'sim-q17',
    level: 2,
    question: 'Egy négyzet kerülete 25 mm. Egy másik négyzet területe 25 cm². Mennyi a hasonlóságuk aránya?',
    options: [
      '8 (vagy 0,125)',
      '4 (vagy 0,25)',
      '10 (vagy 0,1)',
      '16 (vagy 0,0625)'
    ],
    correctAnswer: 0,
    explanation: 'Az első négyzet oldala: a₁ = 25 / 4 = 6,25 mm = 0,625 cm. A második oldal: a₂ = √25 = 5 cm. A hasonlóság aránya: λ = 5 / 0,625 = 8.'
  },
  {
    id: 'sim-q18',
    level: 2,
    question: 'Egy téglalap oldalai 3 cm és 12 cm (arányuk 4 : 1). Levágunk belőle egy résztéglalapot úgy, hogy az hasonló legyen az eredeti téglalaphoz. Mekkora a levágott rész rövidebb oldala?',
    options: [
      '0,75 cm (és a másik oldala 3 cm)',
      '1,5 cm',
      '1 cm',
      '2 cm'
    ],
    correctAnswer: 0,
    explanation: 'A levágott hasonló téglalap hosszabb oldala 3 cm. Hogy az oldalarány 4 : 1 maradjon: 3 / x = 4 / 1, amiből x = 3/4 = 0,75 cm.'
  },
  {
    id: 'sim-q19',
    level: 2,
    question: 'Egy gúla magasságát 3 párhuzamos síkkal 4 egyenlő részre osztjuk. Hányszorosa a legkisebb csúcsgúla alaplapja területének a 3. szinten lévő gúla alaplapja?',
    options: [
      '9-szerese (3²)',
      '3-szorosa',
      '27-szerese (3³)',
      '6-szorosa'
    ],
    correctAnswer: 0,
    explanation: 'A csúcstól a 3. szintig a magasság 3-szorosa a legkisebbnek (λ = 3). Az alaplapok területei a hasonlósági arány négyzetével nőnek: λ² = 3² = 9.'
  },
  {
    id: 'sim-q20',
    level: 2,
    question: 'Az előző 4 szintre osztott gúla esetén hányszorosa a teljes (legnagyobb) gúla térfogata a legkisebb csúcsgúla térfogatának?',
    options: [
      '64-szerese (4³)',
      '16-szorosa (4²)',
      '4-szerese',
      '32-szerese'
    ],
    correctAnswer: 0,
    explanation: 'A teljes gúla magassága 4-szerese a kis gúlának (λ = 4). A térfogatok aránya λ³ = 4³ = 64.'
  },

  // LEVEL 3: Gyakorlati méretarány, mérnöki számítások és emelt szint (21-30)
  {
    id: 'sim-q21',
    level: 3,
    question: 'Egy épület tervrajzának méretaránya M = 1 : 100. Egy folyosó hossza a rajzon 4,5 cm. Mekkora a valóságos hossza méterben?',
    options: [
      '4,5 m',
      '45 m',
      '0,45 m',
      '450 m'
    ],
    correctAnswer: 0,
    explanation: '1 : 100 méretarány esetén 1 cm a rajzon 100 cm = 1 m a valóságban. Tehát 4,5 cm a rajzon 4,5 · 1 m = 4,5 m a valóságban.'
  },
  {
    id: 'sim-q22',
    level: 3,
    question: 'Egy nappali területe a valóságban 24 m² (240 000 cm²). Mekkora felületet foglal el ez a szoba egy M = 1 : 50 méretarányú tervrajzon?',
    options: [
      '96 cm²',
      '48 cm²',
      '480 cm²',
      '24 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A területek a méretarány négyzetével kicsinyülnek: T_rajz = 240 000 cm² / 50² = 240 000 / 2500 = 96 cm².'
  },
  {
    id: 'sim-q23',
    level: 3,
    question: 'Amerikai tervrajzon egy bejárati ajtó szélessége 3 láb (3 ft). Ha az 1 ft = 0,3 m átváltást használjuk, mekkora az ajtó szélessége cm-ben?',
    options: [
      '90 cm',
      '100 cm',
      '80 cm',
      '60 cm'
    ],
    correctAnswer: 0,
    explanation: '3 ft · 0,3 m/ft = 0,9 m = 90 cm széles a bejárati ajtó.'
  },
  {
    id: 'sim-q24',
    level: 3,
    question: 'A 4 szintre vágott gúlában mekkora a legfelső csúcsgúla és a közvetlenül alatta lévő 2. réteg (csonkagúla) térfogatának aránya?',
    options: [
      '1 : 7',
      '1 : 8',
      '1 : 4',
      '1 : 3'
    ],
    correctAnswer: 0,
    explanation: 'A 2. szintig érő gúla térfogata 2³ · V₁ = 8 · V₁. A csonkagúla réteg térfogata így 8 · V₁ - V₁ = 7 · V₁. Az arány: 1 : 7.'
  },
  {
    id: 'sim-q25',
    level: 3,
    question: 'Két hasonló forgáshenger felszínének aránya A₂ / A₁ = 9 / 4. Mekkora a térfogataik aránya (V₂ / V₁)?',
    options: [
      '27 / 8 = 3,375',
      '9 / 4 = 2,25',
      '3 / 2 = 1,5',
      '81 / 16 = 5,0625'
    ],
    correctAnswer: 0,
    explanation: 'A felszínek arányából λ² = 9/4, amiből λ = 3/2. A térfogatok aránya: λ³ = (3/2)³ = 27/8 = 3,375.'
  },
  {
    id: 'sim-q26',
    level: 3,
    question: 'Egy bronzszobor magassága 20 cm, tömege 1,5 kg. Mekkora a tömege az ugyanabból az ötvözetből készült, hozzá geometriailag hasonló, 60 cm magas szobornak?',
    options: [
      '40,5 kg',
      '13,5 kg',
      '4,5 kg',
      '121,5 kg'
    ],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya λ = 60 / 20 = 3. Azonos anyag esetén a tömeg a térfogattal arányos: m\' = λ³ · m = 3³ · 1,5 kg = 27 · 1,5 kg = 40,5 kg.'
  },
  {
    id: 'sim-q27',
    level: 3,
    question: 'Melyik feltétel szükséges és elégséges ahhoz, hogy két síkbeli rombusz hasonló legyen egymáshoz?',
    options: [
      'Egy-egy belső szögük egyenlő nagyságú legyen',
      'Oldalaik hossza megegyezzen',
      'Minden rombusz automatikusan hasonló',
      'Átlóik hossza egyenlő legyen'
    ],
    correctAnswer: 0,
    explanation: 'A rombuszok oldalai mind egyenlők (oldalarány mindig 1:1), így a hasonlósághoz a szögek egyenlősége szükséges, ami már egyetlen szög megegyezésekor teljesül.'
  },
  {
    id: 'sim-q28',
    level: 3,
    question: 'Egy téglatest élei 2 cm, 3 cm és 5 cm. Egy hozzá hasonló téglatest leghosszabb éle 20 cm. Hányszorosa az új téglatest felszíne az eredetinek?',
    options: [
      '16-szorosa',
      '4-szerese',
      '64-szerese',
      '8-szorosa'
    ],
    correctAnswer: 0,
    explanation: 'A leghosszabb élek aránya λ = 20 / 5 = 4. A felszínek aránya a hasonlóság arányának négyzetével egyenlő: A\'/A = λ² = 4² = 16.'
  },
  {
    id: 'sim-q29',
    level: 3,
    question: 'Egy 1 : 25 000 méretarányú turistatérképen egy tó felülete 8 cm². Mekkora a tó valódi területe hektárban (1 ha = 10 000 m²)?',
    options: [
      '50 ha',
      '20 ha',
      '5 ha',
      '200 ha'
    ],
    correctAnswer: 0,
    explanation: 'T_valós = 8 cm² · 25 000² = 8 · 625 000 000 cm² = 5 000 000 000 cm² = 500 000 m². Mivel 1 ha = 10 000 m², ez 500 000 / 10 000 = 50 hektár.'
  },
  {
    id: 'sim-q30',
    level: 3,
    question: 'Egy háromszög beírt körének sugara r = 3 cm, területe T = 54 cm². Egy hozzá hasonló háromszög területe T\' = 216 cm². Mekkora a hasonló háromszög beírt körének sugara?',
    options: [
      '6 cm',
      '12 cm',
      '9 cm',
      '4,5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A területek aránya λ² = 216 / 54 = 4, amiből λ = 2. Mivel a beírt kör sugara hosszmértekkel arányos: r\' = λ · r = 2 · 3 cm = 6 cm.'
  }
];

export const SimilarityQuiz: React.FC<{
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}> = (props) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="hasonlosag"
      title="Hasonlóság – Kvíz"
      subtitle="Teszteld tudásodat a hasonlóság alapfogalmairól, kerület-, terület- és térfogatarányairól, valamint gyakorlati tervrajzokról!"
      questions={SIMILARITY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hasonlósági Transzformáció és Skálázódás',
          items: [
            'Hasonlóság = Középpontos hasonlóság ∘ Egybevágóság (szögtartó és aránytartó)',
            'Hosszak és kerületek aránya: K\' / K = a\' / a = m\' / m = r\' / r = λ',
            'Területek és felszínek aránya: T\' / T = A\' / A = λ²',
            'Térfogatok és tömegek aránya: V\' / V = m\' / m = λ³ (azonos sűrűség esetén)'
          ]
        },
        {
          title: 'Alakzatpárok és Érettségi Szabályok',
          items: [
            'Mindig hasonlók: bármely két négyzet, kör, gömb, kocka, szabályos háromszög',
            'Nem feltétlen hasonlók: téglalapok, rombuszok, egyenlő szárú háromszögek (szög/arány kell)',
            'Egybevágóság: speciális hasonlóság λ = 1 hasonlósági aránnyal',
            'Gúla magasságának n egyenlő részre osztása: alaplapok aránya 1 : 4 : ... : n²'
          ]
        },
        {
          title: 'Mérnöki Tervrajzok és Méretarány (M = 1 : N)',
          items: [
            'Rajzbeli 1 cm a valóságban N cm-nek felel meg (pl. 1 : 100 esetén 1 cm = 1 m)',
            'Valódi hossz = Rajzbeli hossz · N',
            'Valódi terület = Rajzbeli terület · N²',
            'Angolszász mértékek: 1 ft (láb) ≈ 0,3048 m (gyakorlati egyszerűsítéssel: 0,3 m = 30 cm)'
          ]
        }
      ]}
      matcherComponent={
        <SimilarityMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={props.onSwitchToSorter}
        />
      }
      sorterComponent={
        <SimilaritySorter
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={props.onSwitchToMatcher}
        />
      }
      {...props}
    />
  );
};

