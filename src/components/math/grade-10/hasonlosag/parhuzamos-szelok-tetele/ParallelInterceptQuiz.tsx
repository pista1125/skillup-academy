import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ParallelInterceptMatcher } from './ParallelInterceptMatcher';
import { ParallelInterceptSorter } from './ParallelInterceptSorter';

const PARALLEL_INTERCEPT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A párhuzamos szelők és szelőszakaszok alapjai (1-10)
  {
    id: 'pi-q1',
    level: 1,
    question: 'Mit mond ki a párhuzamos szelők tétele?',
    options: [
      'Ha egy szög szárait párhuzamos egyenesekkel metsszük, az egyik száron keletkező szakaszok aránya megegyezik a másik száron keletkező megfelelő szakaszok arányával',
      'A párhuzamos egyenesekből a szögszárak mindig egyenlő darabokat vágnak ki',
      'A keletkező háromszögek területe mindig a kerületük négyzetével arányos',
      'Két párhuzamos egyenes távolsága a csúcstól mért távolság négyzetével arányos'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos szelők tétele kimondja, hogy ha egy szög szárait párhuzamosokkal metsszük, a szárakon kimetszett szakaszok aránya páronként megegyezik: a / b = c / d.'
  },
  {
    id: 'pi-q2',
    level: 1,
    question: 'Mit mond ki a párhuzamos szelőszakaszok tétele a párhuzamosokból kimetszett c₁ és c₂ szakaszok arányára?',
    options: [
      'c₁ / c₂ = OA₁ / OA₂ (a csúcstól mért szakaszok arányával egyenlő)',
      'c₁ / c₂ = A₁A₂ / B₁B₂ (a trapéz szárdarabjainak arányával egyenlő)',
      'c₁ / c₂ = 1 (mindig egyenlő hosszúak)',
      'c₁ / c₂ = (OA₁ / OA₂)²'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos szelőszakaszok tétele szerint a párhuzamosok hossza a csúcstól mért távolságokkal arányos: c₁ / c₂ = OA₁ / OA₂ = OB₁ / OB₂.'
  },
  {
    id: 'pi-q3',
    level: 1,
    question: 'Mi a leggyakoribb hiba a párhuzamos szelőszakaszok felírásakor?',
    options: [
      'A párhuzamosok arányát tévesen a szárakon keletkező trapéz-darabok (A₁A₂) arányával teszik egyenlővé a csúcstól mért teljes szakasz (OA₂) helyett',
      'A párhuzamosokat fordított sorrendben osztják el',
      'A szögeket fok helyett radiánban számolják',
      'A tétel megfordítását alkalmazzák'
    ],
    correctAnswer: 0,
    explanation: 'Gyakori buktató: c₁ / c₂ ≠ A₁A₂ / B₁B₂! A szelőszakaszok aránya csakis a csúcstól mért teljes távolságokkal (OA₁ / OA₂) egyenlő.'
  },
  {
    id: 'pi-q4',
    level: 1,
    question: 'Mit állíthatunk a párhuzamos szelők tételének megfordításáról egy szög szárain?',
    options: [
      'Mindig igaz: ha a szárakon keletkező szakaszok aránya egyenlő (OA₁/OA₂ = OB₁/OB₂), akkor az egyenesek párhuzamosak',
      'Soha nem igaz',
      'Csak derékszögek esetén igaz',
      'Csak akkor igaz, ha a szakaszok hossza egész szám'
    ],
    correctAnswer: 0,
    explanation: 'A tétel megfordítása érvényes: ha a szög szárait úgy metszik az egyenesek, hogy az osztásarányok megegyeznek, akkor a metsző egyenesek feltétlenül párhuzamosak.'
  },
  {
    id: 'pi-q5',
    level: 1,
    question: 'Egy szakaszt 3 : 4 : 2 arányban szeretnénk felosztani. Hány egyenlő szakaszt kell felmérnünk a segédfélegyenesre?',
    options: [
      '9 egységet (3 + 4 + 2)',
      '7 egységet',
      '12 egységet',
      '24 egységet'
    ],
    correctAnswer: 0,
    explanation: 'Az arányszámok összege 3 + 4 + 2 = 9, így a segédfélegyenesre pontosan 9 egyenlő hosszúságú szakaszt mérünk fel körzővel.'
  },
  {
    id: 'pi-q6',
    level: 1,
    question: 'A 9 egység felmérése után melyik osztópontokból kell párhuzamosokat húzni az AB szakasz osztópontjainak kijelöléséhez?',
    options: [
      'A 3. és a 7. osztópontból (mivel 3 + 4 = 7)',
      'A 3. és a 4. osztópontból',
      'A 2. és a 4. osztópontból',
      'Minden egyes osztópontból'
    ],
    correctAnswer: 0,
    explanation: 'Az első részhez 3 egység tartozik (3. pont), a másodikhoz további 4 egység (3 + 4 = 7. pont), a harmadikhoz a maradék 2 egység (9. pont).'
  },
  {
    id: 'pi-q7',
    level: 1,
    question: 'Mi a geometriai előnye a párhuzamos szelőkkel történő szakaszfelosztásnak a számszerű vonalzós méréssel szemben?',
    options: [
      'Elméletileg és szerkesztésileg egzakt, nem függ a mérési és kerekítési pontatlanságoktól',
      'Gyorsabb, mert nem kell körzőt használni',
      'Csak decimális törteknél működik',
      'Automatikusan kiszámolja a területet is'
    ],
    correctAnswer: 0,
    explanation: 'Például egy 10 cm-es szakasz 3 egyenlő részre osztásakor a 3,333... cm vonalzóval nem mérhető fel pontosan, míg a szelőtételes szerkesztéssel matematikai pontossággal megkapjuk a harmadolópontokat.'
  },
  {
    id: 'pi-q8',
    level: 1,
    question: 'Negyedik arányos szerkesztése: ha a = 4 cm, b = 6 cm és c = 8 cm, mekkora az x szakasz az a : b = c : x aránypárból?',
    options: [
      '12 cm',
      '16 cm',
      '10 cm',
      '5,33 cm'
    ],
    correctAnswer: 0,
    explanation: 'Keresztszorzással: a · x = b · c ⇒ 4 · x = 6 · 8 = 48 ⇒ x = 48 / 4 = 12 cm.'
  },
  {
    id: 'pi-q9',
    level: 1,
    question: 'Milyen arányban osztja a szakaszfelező pont a szakaszt?',
    options: [
      '1 : 1 arányban',
      '1 : 2 arányban',
      '2 : 1 arányban',
      '0 : 1 arányban'
    ],
    correctAnswer: 0,
    explanation: 'A felezőpont a szakaszt két pontosan egyenlő részre osztja, így az arány 1 : 1.'
  },
  {
    id: 'pi-q10',
    level: 1,
    question: 'Érvényes-e a párhuzamos szelők tétele tompaszögre vagy egymást metsző egyenesekre?',
    options: [
      'Igen, tetszőleges szögre, sőt egymást metsző egyenesekre is érvényes',
      'Nem, csak hegyesszögekre érvényes',
      'Csak 60°-os és 90°-os szögekre érvényes',
      'Csak szabályos sokszögekben érvényes'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos szelők tétele tetszőleges szögű szögszárakra, valamint egymást egy pontban metsző tetszőleges egyenesekre is maradéktalanul érvényes.'
  },

  // LEVEL 2: Gyakorlati számítások (11-20)
  {
    id: 'pi-q11',
    level: 2,
    question: 'Egy 54 m²-es lakás három szobájának területe 18 m², 24 m² és 12 m². Milyen arányban állnak a területek legegyszerűbb egész számokkal?',
    options: [
      '3 : 4 : 2',
      '9 : 12 : 6',
      '6 : 8 : 4',
      '1 : 2 : 3'
    ],
    correctAnswer: 0,
    explanation: 'Mindhárom számot osztjuk a legnagyobb közös osztójukkal (6-tal): 18/6 = 3, 24/6 = 4, 12/6 = 2, tehát az arány 3 : 4 : 2.'
  },
  {
    id: 'pi-q12',
    level: 2,
    question: 'Egy 539 m²-es téglalap alakú telket valamelyik oldalával párhuzamosan 2 : 5 területarányú két részre kell osztani. Mekkorák a részek területei?',
    options: [
      '154 m² és 385 m²',
      '108 m² és 431 m²',
      '200 m² és 339 m²',
      '150 m² és 389 m²'
    ],
    correctAnswer: 0,
    explanation: 'Az arányszámok összege 2 + 5 = 7. Egy rész: 539 / 7 = 77 m². A kisebb rész: 2 · 77 = 154 m², a nagyobb rész: 5 · 77 = 385 m².'
  },
  {
    id: 'pi-q13',
    level: 2,
    question: 'Ha az 539 m²-es telket mindkét tengelye mentén 2 : 5 arányban felosztjuk, hány m² az alapegység (1 / 49 rész)?',
    options: [
      '11 m²',
      '7 m²',
      '14 m²',
      '9 m²'
    ],
    correctAnswer: 0,
    explanation: 'A két 7-es felosztás 7 · 7 = 49 kis téglalap-egységet hoz létre. Az alapegység: 539 / 49 = 11 m².'
  },
  {
    id: 'pi-q14',
    level: 2,
    question: 'Mekkora a fenti felosztás során keletkező 4 résztelület nagysága?',
    options: [
      '44 m², 110 m², 110 m² és 275 m²',
      '50 m², 100 m², 100 m² és 289 m²',
      '40 m², 120 m², 120 m² és 259 m²',
      '22 m², 110 m², 110 m² és 297 m²'
    ],
    correctAnswer: 0,
    explanation: 'Az arányok: 2·2 = 4 egység (44 m²), 2·5 = 10 egység (110 m²), 5·2 = 10 egység (110 m²), és 5·5 = 25 egység (275 m²). Összegük: 44 + 110 + 110 + 275 = 539 m².'
  },
  {
    id: 'pi-q15',
    level: 2,
    question: 'Egy 11 cm-es szakaszt 3 egyenlő részre osztunk szabályos háromszög szerkesztéséhez. Mekkora egy oldal hossza?',
    options: [
      '11/3 cm (kb. 3,67 cm)',
      '3,5 cm',
      '4 cm',
      '3,33 cm'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög mindhárom oldala egyenlő: a = K / 3 = 11/3 cm.'
  },
  {
    id: 'pi-q16',
    level: 2,
    question: 'Egy 11 cm-es kerületű egyenlő szárú háromszög alapja másfélszerese a száraknak (arány: 3 : 2 : 2). Mekkorák az oldalai?',
    options: [
      'Alap: 33/7 cm, szárak: 22/7 cm és 22/7 cm',
      'Alap: 5 cm, szárak: 3 cm és 3 cm',
      'Alap: 6 cm, szárak: 2,5 cm és 2,5 cm',
      'Alap: 30/7 cm, szárak: 25/7 cm és 25/7 cm'
    ],
    correctAnswer: 0,
    explanation: '3 + 2 + 2 = 7 egység. Egy egység 11/7 cm. Alap: 3 · (11/7) = 33/7 cm, szárak: 2 · (11/7) = 22/7 cm.'
  },
  {
    id: 'pi-q17',
    level: 2,
    question: 'Ha az egyenlő szárú háromszög szárai a másfélszeresei az alapnak (arány: 2 : 3 : 3, kerület: 11 cm), mekkorák az oldalai?',
    options: [
      'Alap: 22/8 cm (2,75 cm), szárak: 33/8 cm (4,125 cm) és 33/8 cm',
      'Alap: 3 cm, szárak: 4 cm és 4 cm',
      'Alap: 2 cm, szárak: 4,5 cm és 4,5 cm',
      'Alap: 2,5 cm, szárak: 4,25 cm és 4,25 cm'
    ],
    correctAnswer: 0,
    explanation: '2 + 3 + 3 = 8 egység. Egy egység 11/8 cm. Alap: 2 · (11/8) = 22/8 = 2,75 cm, szárak: 3 · (11/8) = 33/8 = 4,125 cm.'
  },
  {
    id: 'pi-q18',
    level: 2,
    question: 'Egy háromszög kerülete k = 40 cm, oldalainak aránya 3 : 3 : 4. Mekkorák a háromszög oldalai?',
    options: [
      '12 cm, 12 cm és 16 cm',
      '10 cm, 10 cm és 20 cm',
      '9 cm, 9 cm és 22 cm',
      '15 cm, 15 cm és 10 cm'
    ],
    correctAnswer: 0,
    explanation: '3 + 3 + 4 = 10 egység. Egy egység: 40 / 10 = 4 cm. Oldalak: 3 · 4 = 12 cm, 3 · 4 = 12 cm és 4 · 4 = 16 cm.'
  },
  {
    id: 'pi-q19',
    level: 2,
    question: 'Egy téglalap oldalainak aránya 2 : 3, kerülete k = 50 cm. Mekkorák a téglalap oldalai?',
    options: [
      '10 cm és 15 cm',
      '20 cm és 30 cm',
      '8 cm és 17 cm',
      '12 cm és 13 cm'
    ],
    correctAnswer: 0,
    explanation: 'A félkerület a + b = 25 cm. Az arányszámok összege 2 + 3 = 5 egység. Egy egység: 25 / 5 = 5 cm. Oldalak: 2 · 5 = 10 cm és 3 · 5 = 15 cm.'
  },
  {
    id: 'pi-q20',
    level: 2,
    question: 'Egy 8 cm-es szakaszt 4 : 2 : 3 arányban osztunk fel. Mekkora a legrövidebb rész hossza?',
    options: [
      '16/9 cm (kb. 1,78 cm)',
      '2 cm',
      '1,5 cm',
      '18/9 cm'
    ],
    correctAnswer: 0,
    explanation: '4 + 2 + 3 = 9 egység. A legrövidebb rész 2 egység: 8 cm · (2/9) = 16/9 cm ≈ 1,78 cm.'
  },

  // LEVEL 3: Geometriai bizonyítások, ötszög és emelt szint (21-30)
  {
    id: 'pi-q21',
    level: 3,
    question: 'Egy szabályos ötszög oldala a, átlója b. Milyen arányban osztja az egyik átlót a vele metsző másik átló?',
    options: [
      'a : b arányban (aranymetszés szerint)',
      '1 : 2 arányban',
      '1 : 1 arányban (felezi)',
      'a² : b² arányban'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos ötszög átlói párhuzamosak a szemközti oldalakkal, és a szelőtétel alapján a metszéspont pontosan az oldal és az átló arányában (a : b, aranymetszés) osztja fel az átlót.'
  },
  {
    id: 'pi-q22',
    level: 3,
    question: 'Egy háromszög oldalai a = 6 cm, b = 9 cm és c = 10 cm. A C csúcsból induló belső szögfelező mekkora szakaszokra osztja a c oldalt?',
    options: [
      '4 cm és 6 cm',
      '3 cm és 7 cm',
      '5 cm és 5 cm',
      '2 cm és 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A belső szögfelező-tétel szerint a szomszédos oldalak arányában osztja a szemközti oldalt: a/b = 6/9 = 2/3. A 10 cm-es oldalt 2 : 3 arányban osztva: 10 · (2/5) = 4 cm és 10 · (3/5) = 6 cm.'
  },
  {
    id: 'pi-q23',
    level: 3,
    question: 'Milyen arányban osztja a háromszög súlypontja a súlyvonalakat?',
    options: [
      'A csúcstól mérve 2 : 1 arányban',
      'A csúcstól mérve 1 : 2 arányban',
      '1 : 1 arányban (felezi)',
      '3 : 1 arányban'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög súlypontja minden súlyvonalat 2 : 1 arányban oszt fel a csúcstól az oldalfelező pont felé mérve.'
  },
  {
    id: 'pi-q24',
    level: 3,
    question: 'Egy trapéz párhuzamos alapjai a = 12 cm és c = 4 cm. Milyen arányban osztják egymást a trapéz átlói a metszéspontjukban?',
    options: [
      '3 : 1 arányban (12 : 4)',
      '4 : 1 arányban',
      '2 : 1 arányban',
      '1 : 1 arányban'
    ],
    correctAnswer: 0,
    explanation: 'Az átlók által bezárt két szemközti háromszög hasonló (csúcsszögek és váltószögek egyenlők), hasonlósági arányuk az alapok aránya: a / c = 12 / 4 = 3 : 1.'
  },
  {
    id: 'pi-q25',
    level: 3,
    question: 'Egy szög szárain párhuzamos egyenesek metszik ki az OA₁ = 3 cm, A₁A₂ = 6 cm és OB₁ = 4 cm szakaszokat. Milyen hosszú a B₁B₂ szakasz?',
    options: [
      '8 cm',
      '6 cm',
      '12 cm',
      '9 cm'
    ],
    correctAnswer: 0,
    explanation: 'Párhuzamos szelők tétele: OA₁ / A₁A₂ = OB₁ / B₁B₂ ⇒ 3 / 6 = 4 / B₁B₂ ⇒ B₁B₂ = (6 · 4) / 3 = 8 cm.'
  },
  {
    id: 'pi-q26',
    level: 3,
    question: 'A fenti feladatban mennyi a párhuzamos szelőszakaszok aránya: A₁B₁ / A₂B₂?',
    options: [
      '1 / 3 (3 / 9)',
      '1 / 2 (3 / 6)',
      '3 / 8',
      '1 / 4'
    ],
    correctAnswer: 0,
    explanation: 'A szelőszakaszok aránya a csúcstól mért távolságok aránya: OA₁ / OA₂ = 3 / (3 + 6) = 3 / 9 = 1 / 3.'
  },
  {
    id: 'pi-q27',
    level: 3,
    question: 'Hogyan bizonyítható a párhuzamos szelők tétele a háromszögek területének segítségével?',
    options: [
      'A közös magasságú háromszögek területeinek aránya egyenlő az alapjaik arányával, és a párhuzamosok miatt a trapéz átlói azonos területű háromszögeket határoznak meg',
      'Csak integrálszámítással igazolható',
      'A Pitagorasz-tétel többszöri alkalmazásával derékszögű háromszögek nélkül',
      'A tétel axióma, nem bizonyítható'
    ],
    correctAnswer: 0,
    explanation: 'Eukleidész klasszikus bizonyítása szerint a közös magasságú háromszögek területe megegyezik az alapok arányával, a párhuzamos alapú háromszögek területegyenlősége pedig azonnal kiadja az aránypárt.'
  },
  {
    id: 'pi-q28',
    level: 3,
    question: 'Adott a és b szakaszhoz hogyan szerkeszthető meg a mértani közép: x = √(ab)?',
    options: [
      'Az a és b szakaszokat egymás folytatásába mérve (a + b), megszerkesztjük a Thálész-kört, és az illeszkedési pontban emelt merőleges hossza x',
      'A párhuzamos szelők tételével közvetlenül',
      'Két négyzet területének különbségeként',
      'A szakaszok felezésével'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög magasságtétele szerint m² = p · q ⇒ x = √(ab), ami a Thálész-kör átmérőjére emelt merőlegessel szerkeszthető meg.'
  },
  {
    id: 'pi-q29',
    level: 3,
    question: 'Három párhuzamos egyenes két tetszőleges szelő egyenest metsz. Az első szelőn a szakaszok x = 5 cm és y = 8 cm. A másodikon az első szakasz u = 15 cm. Mennyi a v szakasz hossza?',
    options: [
      '24 cm',
      '18 cm',
      '20 cm',
      '28 cm'
    ],
    correctAnswer: 0,
    explanation: 'x / y = u / v ⇒ 5 / 8 = 15 / v ⇒ v = (8 · 15) / 5 = 24 cm.'
  },
  {
    id: 'pi-q30',
    level: 3,
    question: 'Mi a feltétele annak, hogy egy trapéz középvonala felezze a trapéz átlóit?',
    options: [
      'Minden trapéz középvonala automatikusan felezi mindkét átlót a párhuzamos szelők tétele miatt',
      'Csak szimmetrikus (húr-) trapézoknál igaz',
      'Csak derékszögű trapézoknál igaz',
      'Egyik trapéznál sem igaz'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a középvonal felezi a szárakat és párhuzamos az alapokkal, a szelőtétel megfordítása alapján az átlókat tartalmazó háromszögekben is oldalfelezőként metszi az átlókat.'
  }
];

export const ParallelInterceptQuiz: React.FC<{
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}> = (props) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="parhuzamos-szelok-tetele"
      title="Párhuzamos szelők tétele – Kvíz"
      subtitle="Teszteld tudásodat a párhuzamos szelők és szelőszakaszok tételéről, szakaszok arányos szerkesztéséről és emelt szintű alkalmazásairól!"
      questions={PARALLEL_INTERCEPT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Párhuzamos Szelők és Szelőszakaszok Tétele',
          items: [
            'Szárak aránya: a / b = c / d és csúcstól mérve: OA₁ / OA₂ = OB₁ / OB₂',
            'Párhuzamos szelőszakaszok: c₁ / c₂ = OA₁ / OA₂ (CSAK a csúcstól mért teljes hosszakkal!)',
            'Tévhit / buktató: c₁ / c₂ ≠ A₁A₂ / B₁B₂ (a trapéz szárdarabjaival nem arányos!)',
            'Tétel megfordítása: Ha a szárak aránya megegyezik, az egyenesek párhuzamosak'
          ]
        },
        {
          title: 'Szerkesztési Módszerek Segédfélegyenessel',
          items: [
            'Szakasz m : n arányú felosztása: m + n egység felmérése a segédfélegyenesre',
            'Zárópont összekötése a szakasz végével, majd párhuzamosok húzása az osztópontokból',
            'Lakásfelosztás (18, 24, 12 m²): 3 : 4 : 2 arány ⇒ 9 egység felmérése',
            'Negyedik arányos (a : b = c : x): x = (b · c) / a szerkesztése szögszárakon'
          ]
        },
        {
          title: 'Geometriai Következmények és Alkalmazások',
          items: [
            'Szabályos ötszög átlói egymást az oldal és átló (a : b) aranymetszés arányában metszik',
            'Belső szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja (a/b)',
            'Háromszög súlypontja a súlyvonalakat 2 : 1 arányban osztja a csúcstól mérve',
            'Trapéz átlói az alapok arányában (a : c) metszik egymást'
          ]
        }
      ]}
      matcherComponent={
        <ParallelInterceptMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={props.onSwitchToSorter}
        />
      }
      sorterComponent={
        <ParallelInterceptSorter
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

