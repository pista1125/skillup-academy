import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { BlueprintMatcher } from './BlueprintMatcher';
import { BlueprintSorter } from './BlueprintSorter';

const BLUEPRINT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapvető méretarányok és rajzolvasás (1-10)
  {
    id: 'bp-q1',
    level: 1,
    question: 'Mit jelent egy építészeti tervrajzon az 1 : 100 jelzés?',
    options: [
      'A tervrajzon mért 1 cm a valóságban 100 cm = 1 méternek felel meg',
      'A valóságban 1 cm a tervrajzon 100 cm-nek felel meg (nagyítás)',
      'A területek 1 : 100 arányban kicsinyülnek',
      'A tervrajz 100 darab azonos másolatot tartalmaz'
    ],
    correctAnswer: 0,
    explanation: 'Az 1 : 100 méretarány azt jelenti, hogy minden valóságos hosszúság a 100-adrészére van kicsinyítve, tehát a rajzbeli 1 cm a valóságban 100 cm = 1 m.'
  },
  {
    id: 'bp-q2',
    level: 1,
    question: 'Milyen mértékegységben értendők a műszaki és épületszerkezeti rajzokon szereplő kótaszámok, ha külön mértékegység nincs kiírva?',
    options: [
      'Milliméterben (mm)',
      'Centiméterben (cm)',
      'Méterben (m)',
      'Hüvelykben (inch)'
    ],
    correctAnswer: 0,
    explanation: 'A magyar és nemzetközi műszaki rajzi szabványok szerint a méretek alapegysége a milliméter (mm), a mértékegységet a rajzokon nem írják ki.'
  },
  {
    id: 'bp-q3',
    level: 1,
    question: 'A Gyulai Várfürdő tartóvázán egy gerenda mellett a 13 036 szám szerepel. Mekkora a gerenda hossza a valóságban méterben?',
    options: [
      '13,036 m',
      '130,36 m',
      '1,3036 m',
      '1303,6 m'
    ],
    correctAnswer: 0,
    explanation: 'A 13 036 szám milliméterben van megadva, ami méterbe átszámítva 13 036 / 1000 = 13,036 m.'
  },
  {
    id: 'bp-q4',
    level: 1,
    question: 'Egy 1 : 50 méretarányú kivitelezési tervrajzon egy ablak szélessége 2,4 cm. Mekkora az ablak szélessége a valóságban?',
    options: [
      '120 cm (1,2 m)',
      '48 cm',
      '240 cm (2,4 m)',
      '50 cm'
    ],
    correctAnswer: 0,
    explanation: 'A valós szélesség: 2,4 cm · 50 = 120 cm = 1,2 m.'
  },
  {
    id: 'bp-q5',
    level: 1,
    question: 'Egy 1 : 200 méretarányú helyszínrajzon egy 40 méter hosszú telekhatár hány centiméter hosszú szakaszként jelenik meg?',
    options: [
      '20 cm',
      '2 cm',
      '80 cm',
      '4 cm'
    ],
    correctAnswer: 0,
    explanation: '40 méter = 4000 cm. A rajzon a hossza: 4000 cm / 200 = 20 cm.'
  },
  {
    id: 'bp-q6',
    level: 1,
    question: 'Mit jelent az 5 : 1 méretarány a műszaki ábrázolásban?',
    options: [
      'Nagyítást: a rajzon látható hosszúság a valóságos méret 5-szöröse',
      'Kicsinyítést: a tárgy az 5-öd részére van kicsinyítve',
      'A tárgy 5 síkra történő vetületét',
      'A területek 5-szörös növekedését'
    ],
    correctAnswer: 0,
    explanation: 'Az N : 1 alakú méretarányok nagyító méretarányok: 5 : 1 esetén a rajzon mért méret az eredeti valós tárgyméret ötszöröse (finommechanika, óraalkatrészek).'
  },
  {
    id: 'bp-q7',
    level: 1,
    question: 'Hogyan jelöljük szabványosan a rajzokon a természetes nagyságot (amikor a rajz pontosan akkora, mint a valóság)?',
    options: [
      '1 : 1',
      '0 : 0',
      '100%',
      '1 : 0'
    ],
    correctAnswer: 0,
    explanation: 'A természetes nagyság szabványos jelölése: M = 1 : 1.'
  },
  {
    id: 'bp-q8',
    level: 1,
    question: 'Egy 1 : 100 méretarányú alaprajzon egy szoba alapterülete 6 cm². Mekkora a szoba valódi területe?',
    options: [
      '6 m² (60 000 cm²)',
      '600 cm² (0,06 m²)',
      '60 m²',
      '600 m²'
    ],
    correctAnswer: 0,
    explanation: 'A területek a méretarány négyzetével nőnek a valóságban: 6 cm² · 100² = 6 cm² · 10 000 = 60 000 cm² = 6 m².'
  },
  {
    id: 'bp-q9',
    level: 1,
    question: 'Mit jelent az úgynevezett „kótabölcsesség” a műszaki rajzokon?',
    options: [
      'A rajzra írt kótaszám mindig a valóságos tárgy méretét jelenti, függetlenül attól, hogy mekkorára van nyomtatva a rajz',
      'A kótaszámot a vonalzóval lemért távolság határozza meg a rajzon',
      'A kótaszám a szomszédos élek arányát adja meg',
      'A kóták mindig deciméterben értendők'
    ],
    correctAnswer: 0,
    explanation: 'A műszaki rajzon lévő számadat (kóta) a gyártandó/építendő darab valóságos geometriai méretét rögzíti, akkor is, ha a papírlap mérete fénymásolás miatt torzul.'
  },
  {
    id: 'bp-q10',
    level: 1,
    question: 'Mi a vonalas mérték (grafikus lépték) szerepe a térképeken?',
    options: [
      'Közvetlenül leolvashatóvá teszi a valóságos távolságokat egy méretskálával lemérve, nyomtatási átméretezés esetén is',
      'Megmutatja a mágneses észak irányát',
      'A tengerszint feletti magasságot ábrázolja',
      'A területi adóhatárokat rögzíti'
    ],
    correctAnswer: 0,
    explanation: 'A vonalas mérték a térképre nyomtatott skála, amely a térképpel együtt arányosan nagyul vagy kicsinyül, így fénymásoláskor sem veszíti el a pontosságát.'
  },

  // LEVEL 2: A Gyulai Várfürdő Lovarda feladatai (11-20)
  {
    id: 'bp-q11',
    level: 2,
    question: 'A Gyulai Várfürdő tartóvázának tervrajzán miért adódik a bal oldali nagy háromszög belső szögeinek összegeként 181°?',
    options: [
      'Mert a tervezők egész fokra kerekítették a szögeket, és a kerekítési hibák összeadódtak',
      'Mert nem euklideszi geometriát használtak a tervezéshez',
      'Mert a gerendák görbülnek a fa rugalmassága miatt',
      'Mert ez egy nyomdai elírás a tervrajzon'
    ],
    correctAnswer: 0,
    explanation: 'A tervrajzokon a milliméteres méretek a pontosak, a szögeket azonban a kivitelezéshez egész fokra kerekítették (pl. 24,4° + 24,4° + 132,6° = 181,4° helyett 24° + 24° + 133° = 181°).'
  },
  {
    id: 'bp-q12',
    level: 2,
    question: 'Miért nem egyenlő a bal oldali háromszögben a két szár hossza (13 036 mm vs. más méretek), ha mindkét alapon fekvő szög 24°-nak van feltüntetve?',
    options: [
      'Mert a szögek kerekítettek, a valóságban a két szög törtértékben minimálisan eltér egymástól',
      'Mert a háromszög nem egy síkban fekszik',
      'Mert a fa természetes hőtágulása miatt megnőtt az egyik szár',
      'Mert a tervrajzon a méretek aránytalanul torzítottak'
    ],
    correctAnswer: 0,
    explanation: 'A két szög csak kerekítve azonos (mindkettő egész fokra 24°), a milliméteres méretek alapján a háromszög nem pontosan egyenlő szárú.'
  },
  {
    id: 'bp-q13',
    level: 2,
    question: 'A Gyulai Lovarda úszómedencéje 20 m hosszú, 13 m széles, mélysége 120 cm-től 160 cm-ig egyenletesen mélyül. Milyen geometriai síkidom a medence két hosszanti oldalfala?',
    options: [
      'Derékszögű trapéz',
      'Téglalap',
      'Paralelogramma',
      'Általános négyszög'
    ],
    correctAnswer: 0,
    explanation: 'A hosszanti oldalfalak alapjai a két függőleges mélységél (1,2 m és 1,6 m), a felső vízszintes él merőleges rájuk (20 m), így derékszögű trapézok.'
  },
  {
    id: 'bp-q14',
    level: 2,
    question: 'Milyen alakúak ugyanezen medence rövidebb keresztirányú végfalai?',
    options: [
      'Téglalapok (13 m × 1,2 m a sekély, és 13 m × 1,6 m a mély végen)',
      'Szintén derékszögű trapézok',
      'Négyzetek',
      'Rombuszok'
    ],
    correctAnswer: 0,
    explanation: 'A két végfal függőleges síkú és vízszintes fenékcsatlakozású téglalap: 13 m széles és 1,2 m magas, illetve 13 m széles és 1,6 m magas.'
  },
  {
    id: 'bp-q15',
    level: 2,
    question: 'Milyen geometriai testként modellezhető a Lovarda medencéjében lévő víztömeg?',
    options: [
      'Egyenes, fektetett trapéz alapú hasábként',
      'Ferde téglatestként',
      'Csonkagúlaként',
      'Nem képez hasábot'
    ],
    correctAnswer: 0,
    explanation: 'A medence két hosszanti trapéz oldalfala egymással párhuzamos, és a rájuk merőleges élek hossza mindenütt a medence 13 méteres szélessége, tehát ez egy egyenes fektetett trapéz alapú hasáb.'
  },
  {
    id: 'bp-q16',
    level: 2,
    question: 'Mekkora a Lovarda medence teljes víztérfogata (20 m hosszú, 13 m széles, 1,2 m – 1,6 m mély)?',
    options: [
      '364 m³ (364 000 liter)',
      '416 m³',
      '312 m³',
      '520 m³'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz keresztmetszet területe: T = (1,2 + 1,6)/2 · 20 = 1,4 · 20 = 28 m². A térfogat: V = T · 13 m = 28 · 13 = 364 m³ = 364 000 liter.'
  },
  {
    id: 'bp-q17',
    level: 2,
    question: 'Mekkora a medence ferde lejtésű fenéklemezének hossza a 20 méteres hossz mentén?',
    options: [
      'Kb. 20,004 méter (√(20² + 0,4²))',
      '20,4 méter',
      '21,6 méter',
      'Pontosan 20 méter'
    ],
    correctAnswer: 0,
    explanation: 'A mélységkülönbség 1,6 m - 1,2 m = 0,4 m. Derékszögű háromszög átfogójaként: L = √(20² + 0,4²) = √(400 + 0,16) = √400,16 ≈ 20,004 m.'
  },
  {
    id: 'bp-q18',
    level: 2,
    question: 'Ha az úszómedence víztükrét 1 : 200 kicsinyítésben szerkesztjük meg, mekkorák a téglalap méretei a rajzon (valós méret: 20 m × 13 m)?',
    options: [
      '10 cm × 6,5 cm',
      '20 cm × 13 cm',
      '5 cm × 3,25 cm',
      '100 mm × 65 mm'
    ],
    correctAnswer: 0,
    explanation: '20 m = 2000 cm; 2000 / 200 = 10 cm. 13 m = 1300 cm; 1300 / 200 = 6,5 cm.'
  },
  {
    id: 'bp-q19',
    level: 2,
    question: 'Ugyanezen 1 : 200 méretarányú rajzon mekkora a sekély végfal mélysége (120 cm)?',
    options: [
      '0,6 cm = 6 mm',
      '1,2 cm = 12 mm',
      '2,4 mm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: '120 cm / 200 = 0,6 cm = 6 mm a rajzon.'
  },
  {
    id: 'bp-q20',
    level: 2,
    question: 'A tartóváz rajzán a leghosszabb gerenda mérete 13 036 mm. Mekkora szakaszként jelenik meg ez egy 1 : 100-as tervrajzon?',
    options: [
      '130,36 mm (kb. 13 cm)',
      '13,036 mm',
      '1303,6 mm',
      '1,3 cm'
    ],
    correctAnswer: 0,
    explanation: '13 036 mm / 100 = 130,36 mm = 13,036 cm.'
  },

  // LEVEL 3: Mérnöki számítások, térképek és makettek (21-30)
  {
    id: 'bp-q21',
    level: 3,
    question: 'Egy 1 : 50 000 méretarányú turistatérképen két hegycsúcs távolsága 7,2 cm. Mekkora a távolság a valóságban kilométerben?',
    options: [
      '3,6 km',
      '7,2 km',
      '36 km',
      '1,44 km'
    ],
    correctAnswer: 0,
    explanation: '1 cm a térképen = 50 000 cm = 500 m = 0,5 km. 7,2 cm · 0,5 km = 3,6 km.'
  },
  {
    id: 'bp-q22',
    level: 3,
    question: 'Egy 1 : 25 000 méretarányú térképen egy téglalap alakú erdő mérete 2 cm × 4 cm. Mekkora az erdő valódi területe hektárban (1 ha = 10 000 m²)?',
    options: [
      '50 ha',
      '25 ha',
      '100 ha',
      '5 ha'
    ],
    correctAnswer: 0,
    explanation: 'A valós oldalak: 2 cm · 25 000 = 50 000 cm = 500 m; 4 cm · 25 000 = 100 000 cm = 1000 m. Terület: 500 m · 1000 m = 500 000 m² = 50 hektár.'
  },
  {
    id: 'bp-q23',
    level: 3,
    question: 'Egy épület 1 : 50 méretarányú tömör makettjének elkészítéséhez 16 liter gipszet használtak fel. Hány köbméter lenne a valóságos tömör épület térfogata ugyanebből a modellből?',
    options: [
      '2000 m³',
      '800 m³',
      '40 m³',
      '1600 m³'
    ],
    correctAnswer: 0,
    explanation: 'A térfogat a méretarány köbével skálázódik: V_valós = 16 liter · 50³ = 16 · 125 000 = 2 000 000 liter. Mivel 1000 liter = 1 m³, ez 2000 m³.'
  },
  {
    id: 'bp-q24',
    level: 3,
    question: 'Egy gépalkatrész 20 : 1 nagyítású mikroszkopikus tervrajzán egy apró fogaskerék átmérője 60 mm. Mekkora a fogaskerék valódi átmérője?',
    options: [
      '3 mm',
      '1200 mm',
      '12 mm',
      '0,3 mm'
    ],
    correctAnswer: 0,
    explanation: 'Nagyításnál a rajzbeli méret a valóság 20-szorosa, így a valódi átmérő: 60 mm / 20 = 3 mm.'
  },
  {
    id: 'bp-q25',
    level: 3,
    question: 'A 20 m × 13 m alapterületű medence víztükre 260 m². Mekkora területet foglal el ez egy 1 : 200-as helyszínrajzon cm²-ben?',
    options: [
      '65 cm²',
      '130 cm²',
      '26 cm²',
      '6,5 cm²'
    ],
    correctAnswer: 0,
    explanation: '260 m² = 2 600 000 cm². A rajzbeli terület: 2 600 000 cm² / 200² = 2 600 000 / 40 000 = 65 cm².'
  },
  {
    id: 'bp-q26',
    level: 3,
    question: 'Miért tér el meredek hegyoldalon a térképen mért távolság a valóságban gyalog megtett úttól?',
    options: [
      'Mert a térkép a domborzat vízszintes ortogonális vetületét ábrázolja, a ferde lejtő valós hossza d = d_térkép / cos(α)',
      'Mert a térkép készítői szándékosan torzítják a méretarányt a hegyekben',
      'Mert a GPS műholdak jele késik a hegyek között',
      'Mert a lépéshossz csökken a fáradtság miatt'
    ],
    correctAnswer: 0,
    explanation: 'A térkép egy vízszintes síkra vetített rajz. Egy α hajlásszögű hegyoldalon a térképi távolság a lejtő vízszintes vetülete, így a valós hegyi út d = d_térkép / cos α, ami mindig hosszabb.'
  },
  {
    id: 'bp-q27',
    level: 3,
    question: 'Ha egy építészeti tervrajzot az eredeti méretének 75%-ára kicsinyítve fénymásolunk (λ = 0,75), hányszorosára változik a szobák területe a másolaton?',
    options: [
      '0,5625-szeresére (56,25%)',
      '0,75-szörösére (75%)',
      '0,375-szörösére (37,5%)',
      'Nem változik'
    ],
    correctAnswer: 0,
    explanation: 'A területek a lineáris méretarány négyzetével arányosak: λ² = 0,75² = 0,5625 = 56,25%.'
  },
  {
    id: 'bp-q28',
    level: 3,
    question: 'Amerikai tervrajzon egy szoba mérete 15 ft × 20 ft. Ha az 1 ft = 0,3 m kerekítést használjuk, mekkora a szoba területe m²-ben?',
    options: [
      '27 m²',
      '90 m²',
      '30 m²',
      '18 m²'
    ],
    correctAnswer: 0,
    explanation: 'A szoba oldalai: 15 · 0,3 = 4,5 m, és 20 · 0,3 = 6 m. A terület: 4,5 m · 6 m = 27 m².'
  },
  {
    id: 'bp-q29',
    level: 3,
    question: 'Gépészeti tervrajzon a furatok mellett a Ø45 jelölés látható. Mit jelent a Ø jelkép?',
    options: [
      'Átmérőt (kör alakú keresztmetszet 45 mm-es átmérővel)',
      'Sugár nagyságát (r = 45 mm)',
      'A furat mélységét',
      'A menetemelkedést'
    ],
    correctAnswer: 0,
    explanation: 'A műszaki rajzokon a körátmérő szabványos jelölése a Ø (átmérőjel), így Ø45 egy 45 mm átmérőjű hengeres furatot jelöl.'
  },
  {
    id: 'bp-q30',
    level: 3,
    question: 'A Gyulai Lovarda medencéjének (20 m × 13 m) mélységét minden pontban 20 cm-rel (0,2 m-rel) megnövelik (1,4 m – 1,8 m-re). Hány köbméterrel nő a medence víztérfogata?',
    options: [
      '52 m³ (52 000 literrel)',
      '26 m³',
      '104 m³',
      '40 m³'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a mélységnövekedés egyenletes (mindenütt 0,2 m), a többlettérfogat a víztükör alapterülete és a magasságtöbblet szorzata: ΔV = 20 m · 13 m · 0,2 m = 52 m³ = 52 000 liter.'
  }
];

export const BlueprintQuiz: React.FC<{
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}> = (props) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="mit-mutat-a-tervrajz"
      title="Mit mutat a tervrajz? – Kvíz"
      subtitle="Teszteld tudásodat a mérnöki tervrajzok méretarányairól, a Gyulai Várfürdő medencéjének geometriájáról és a térképi területszámításról!"
      questions={BLUEPRINT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Méretarányok és Mértékegységek (M = 1 : N)',
          items: [
            'M = 1 : 100 ⇒ 1 cm a rajzon = 100 cm = 1 m a valóságban',
            'Gépészeti és építészeti rajzokon a méretalapegység a milliméter (mm)',
            'Kótabölcsesség: A rajzra írt szám mindig a készülő tárgy valóságos mérete',
            'N : 1 méretarány = nagyítás (pl. 5 : 1 finommechanikai óraalkatrész)'
          ]
        },
        {
          title: 'A Gyulai Várfürdő Lovarda Medence Geometriája',
          items: [
            'Medence mérete: 20 m hosszú, 13 m széles, mélysége 1,2 m – 1,6 m',
            'Oldalfalak: két derékszögű trapéz és két téglalap végfal',
            'Testmodell: egyenes fektetett trapéz alapú hasáb (magassága 13 m)',
            'Víztérfogat: V = [(1,2 + 1,6)/2 · 20] · 13 = 1,4 · 20 · 13 = 364 m³ (364 000 liter)'
          ]
        },
        {
          title: 'Területi és Térképi Számítások',
          items: [
            'Térképi hossz: Valóság = Rajz · N | Terület: Valóság = Rajz · N²',
            '1 : 50 000 térképen 1 cm = 500 m = 0,5 km | 4 cm² erdő = 1 000 000 m² = 100 ha',
            'Térbeli makett tömege: a valós tömeg 1 / N³ része (20³ = 8000)',
            'Amerikai mértékek a tervrajzon: 1 ft (láb) ≈ 0,3 m = 30 cm'
          ]
        }
      ]}
      matcherComponent={
        <BlueprintMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={props.onSwitchToSorter}
        />
      }
      sorterComponent={
        <BlueprintSorter
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

