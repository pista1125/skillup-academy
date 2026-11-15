import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MidlinesMediansMatcher } from './MidlinesMediansMatcher';
import { MidlinesMediansSorter } from './MidlinesMediansSorter';

const MIDLINES_MEDIANS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapfogalmak és alaptételek (1-10)
  {
    id: 'mm-q1',
    level: 1,
    question: 'Mi a háromszög középvonala?',
    options: [
      'A háromszög két oldalának felezőpontját összekötő szakasz',
      'A csúcsból a szemközti oldalra bocsátott merőleges szakasz',
      'A belső szögfelező egyenes szakasza',
      'A háromszög súlypontját a csúccsal összekötő szakasz'
    ],
    correctAnswer: 0,
    explanation: 'A középvonal definíció szerint a háromszög bármely két oldalának felezőpontját összekötő szakasz.'
  },
  {
    id: 'mm-q2',
    level: 1,
    question: 'Mit mond ki a háromszög középvonalának tétele a harmadik oldalhoz viszonyítva?',
    options: [
      'A középvonal párhuzamos a harmadik oldallal, és hossza pontosan fele annak (k = c / 2)',
      'A középvonal merőleges a harmadik oldalra',
      'A középvonal kétszer olyan hosszú, mint a harmadik oldal',
      'A középvonal hossza a harmadik oldal négyzetgyöke'
    ],
    correctAnswer: 0,
    explanation: 'A középvonal-tétel kimondja, hogy a középvonal párhuzamos a harmadik oldallal és feleolyan hosszú, mint a harmadik oldal.'
  },
  {
    id: 'mm-q3',
    level: 1,
    question: 'Hány középvonala van egy háromszögnek?',
    options: [
      'Pontosan 3 középvonala (mindegyik oldalpárhoz egy)',
      '1 középvonala',
      '2 középvonala',
      'Végtelen sok'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a háromszögnek 3 oldala és 3 oldalfelező pontja van, ezek páronként pontosan 3 középvonalat határoznak meg.'
  },
  {
    id: 'mm-q4',
    level: 1,
    question: 'Hány darab és milyen háromszögre osztja a háromszöget a három középvonal együttesen?',
    options: [
      '4 darab egymással egybevágó, az eredetihez hasonló háromszögre',
      '3 darab egyenlő szárú háromszögre',
      '6 darab különböző háromszögre',
      '2 darab derékszögű háromszögre'
    ],
    correctAnswer: 0,
    explanation: 'A három középvonal az eredeti háromszöget 4 egymással egybevágó, az eredetihez λ = 1/2 arányban hasonló háromszögre bontja.'
  },
  {
    id: 'mm-q5',
    level: 1,
    question: 'Mi a háromszög súlyvonala?',
    options: [
      'A háromszög egyik csúcsát a szemközti oldal felezőpontjával összekötő szakasz',
      'Az oldalfelező merőleges egyenes',
      'A csúcsból induló magasságvonal',
      'A háromszög kerületét felező vonal'
    ],
    correctAnswer: 0,
    explanation: 'A súlyvonal a háromszög csúcsát a szemközti oldal felezőpontjával köti össze.'
  },
  {
    id: 'mm-q6',
    level: 1,
    question: 'Mi a háromszög súlypontja (S)?',
    options: [
      'A három súlyvonal egyetlen közös metszéspontja',
      'A három magasságvonal metszéspontja',
      'A köré írt kör középpontja',
      'A leghosszabb oldal felezőpontja'
    ],
    correctAnswer: 0,
    explanation: 'A három súlyvonal mindig egyetlen pontban metszi egymást, ezt nevezzük a háromszög súlypontjának (S).'
  },
  {
    id: 'mm-q7',
    level: 1,
    question: 'Milyen arányban osztja a súlypont a súlyvonalakat?',
    options: [
      '2 : 1 arányban, a hosszabb szakasz a csúcs felé esik',
      '1 : 1 arányban (felezi a súlyvonalat)',
      '3 : 1 arányban',
      'Aranyarányban (1,618)'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a csúcstól mért távolság és az oldalfelező ponttól mért távolság között pontosan 2 : 1 arányt valósít meg.'
  },
  {
    id: 'mm-q8',
    level: 1,
    question: 'Ha egy súlyvonal teljes hossza 15 cm, mekkora a csúcstól a súlypontig tartó darabja?',
    options: [
      '10 cm (mivel (2/3) · 15 cm = 10 cm)',
      '5 cm',
      '7,5 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'A súlyvonal 2 + 1 = 3 egységre oszlik, 1 egység = 5 cm. A csúcs felőli rész 2 egység: 2 · 5 = 10 cm.'
  },
  {
    id: 'mm-q9',
    level: 1,
    question: 'Hogyan osztja meg a háromszög területét egyetlen súlyvonal?',
    options: [
      'Pontosan felezi a területet: két egyenlő területű (T/2) háromszögre osztja',
      '2 : 1 arányban osztja a területet',
      '4 : 1 arányban osztja a területet',
      'Nem határoz meg egyenlő területeket'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az alap felére feleződik és a magasság mindkét részháromszögben közös: T₁ = (a/2 · m) / 2 = T / 2.'
  },
  {
    id: 'mm-q10',
    level: 1,
    question: 'Mekkora a középvonal-háromszög kerülete az eredeti háromszög kerületéhez viszonyítva?',
    options: [
      'Pontosan a fele: K_közép = K / 2',
      'A negyede: K / 4',
      'Megegyezik vele',
      'Kétszerese'
    ],
    correctAnswer: 0,
    explanation: 'Mivel minden középvonal a megfelelő oldal fele (a/2, b/2, c/2), a kerületük összege is az eredeti fele: K_közép = K / 2.'
  },

  // LEVEL 2: Számítások és tankönyvi feladatok (11-20)
  {
    id: 'mm-q11',
    level: 2,
    question: 'Egy háromszög oldalainak aránya 2 : 8 : 9, legrövidebb középvonala 17 mm. Mekkora a legrövidebb oldal?',
    options: [
      '34 mm (mivel a legrövidebb középvonal a legrövidebb oldal fele: 2 · 17 mm = 34 mm)',
      '17 mm',
      '68 mm',
      '8,5 mm'
    ],
    correctAnswer: 0,
    explanation: 'A legrövidebb középvonal a legrövidebb oldalhoz tartozik, így a legrövidebb oldal a középvonal kétszerese: 2 · 17 = 34 mm.'
  },
  {
    id: 'mm-q12',
    level: 2,
    question: 'Mekkorák a fenti háromszög további oldalai (arány: 2 : 8 : 9, a = 34 mm)?',
    options: [
      'b = 136 mm és c = 153 mm (1 arányegység = 17 mm, 8 · 17 = 136 és 9 · 17 = 153)',
      'b = 68 mm és c = 85 mm',
      'b = 100 mm és c = 120 mm',
      'b = 128 mm és c = 144 mm'
    ],
    correctAnswer: 0,
    explanation: 'Ha 2 arányegység = 34 mm, akkor 1 egység = 17 mm. Így b = 8 · 17 = 136 mm és c = 9 · 17 = 153 mm.'
  },
  {
    id: 'mm-q13',
    level: 2,
    question: 'A középvonal-háromszög kerülete 255 dm. Mekkora az eredeti háromszög kerülete?',
    options: [
      '510 dm (mivel K_eredeti = 2 · K_közép = 2 · 255 = 510 dm)',
      '127,5 dm',
      '1020 dm',
      '255 dm'
    ],
    correctAnswer: 0,
    explanation: 'A középvonal-háromszög kerülete fele az eredetinek, így az eredeti háromszög kerülete a duplája: 2 · 255 = 510 dm.'
  },
  {
    id: 'mm-q14',
    level: 2,
    question: 'A középvonal-háromszög oldalai 5 : 12 : 13 arányúak, kerülete 255 dm. Mekkorák az eredeti háromszög oldalai?',
    options: [
      '85 dm, 204 dm és 221 dm (arányegység = 17 dm az eredeti háromszögben)',
      '42,5 dm, 102 dm és 110,5 dm',
      '50 dm, 120 dm és 130 dm',
      '100 dm, 240 dm és 260 dm'
    ],
    correctAnswer: 0,
    explanation: 'Az eredeti háromszög kerülete 510 dm. 5 + 12 + 13 = 30 arányegység. 1 egység = 510 / 30 = 17 dm. Az oldalak: 5·17=85 dm, 12·17=204 dm, 13·17=221 dm.'
  },
  {
    id: 'mm-q15',
    level: 2,
    question: 'Milyen fajta a 85 dm, 204 dm és 221 dm oldalú háromszög a szögei szerint?',
    options: [
      'Derékszögű háromszög, mert 85² + 204² = 7225 + 41616 = 48841 = 221²',
      'Hegyesszögű háromszög',
      'Tompaszögű háromszög',
      'Szabályos háromszög'
    ],
    correctAnswer: 0,
    explanation: 'Pitagorasz tételének megfordítása szerint: 85² + 204² = 7225 + 41616 = 48841 = 221², tehát a háromszög derékszögű!'
  },
  {
    id: 'mm-q16',
    level: 2,
    question: 'Egy derékszögű háromszög befogói 14 cm és 33,6 cm. Mekkora az átfogója?',
    options: [
      '36,4 cm (c = √(14² + 33,6²) = √(196 + 1128,96) = √1324,96 = 36,4 cm)',
      '35 cm',
      '40 cm',
      '47,6 cm'
    ],
    correctAnswer: 0,
    explanation: 'Pitagorasz-tétellel: c = √(14² + 33,6²) = √(196 + 1128,96) = √1324,96 = 36,4 cm.'
  },
  {
    id: 'mm-q17',
    level: 2,
    question: 'Mekkora az átfogóhoz tartozó súlyvonal (s_c) hossza ebben a derékszögű háromszögben (c = 36,4 cm)?',
    options: [
      '18,2 cm (mivel Thálész-tétel miatt derékszögű háromszögben s_c = c / 2 = R)',
      '14 cm',
      '24 cm',
      '12,13 cm'
    ],
    correctAnswer: 0,
    explanation: 'Thálész-tétel következménye: a derékszögű háromszög átfogója a körülírt kör átmérője, így az átfogó felezőpontja a kör középpontja. Ezért s_c = R = c / 2 = 18,2 cm!'
  },
  {
    id: 'mm-q18',
    level: 2,
    question: 'Mekkora távolságra van a derékszögű csúcstól a háromszög súlypontja, ha s_c = 18,2 cm?',
    options: [
      'Kb. 12,13 cm (a súlyvonal 2/3 része: (2/3) · 18,2 = 36,4 / 3 ≈ 12,13 cm)',
      '6,07 cm',
      '9,1 cm',
      '18,2 cm'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a csúcstól a súlyvonal 2/3 részére helyezkedik el: d = (2/3) · 18,2 ≈ 12,13 cm.'
  },
  {
    id: 'mm-q19',
    level: 2,
    question: 'Egyenlő szárú háromszög alapja 42 mm, szára 29 mm. Mekkora az alaphoz tartozó magasság és súlyvonal?',
    options: [
      '20 mm (m = √(29² - 21²) = √(841 - 441) = √400 = 20 mm)',
      '25 mm',
      '15 mm',
      '18 mm'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetria miatt a magasság felezi az alapot (21 mm): m = √(29² - 21²) = √(841 - 441) = √400 = 20 mm.'
  },
  {
    id: 'mm-q20',
    level: 2,
    question: 'Milyen messze van az előző háromszög súlypontja az alaptól, ha a magasság 20 mm?',
    options: [
      'Kb. 6,67 mm (a súlyvonal 1/3 része: 20 / 3 ≈ 6,67 mm)',
      '10 mm',
      '13,33 mm',
      '5 mm'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont az oldaltól mért távolsága a súlyvonal 1/3 része: 20 mm / 3 ≈ 6,67 mm.'
  },

  // LEVEL 3: Területek, mélyebb tételek, speciális esetek (21-30)
  {
    id: 'mm-q21',
    level: 3,
    question: 'Hány egyenlő területű részre osztja a háromszöget a három súlyvonal együttese?',
    options: [
      '6 darab egyenlő területű háromszögre (mindegyik területe T / 6)',
      '4 darab egyenlő területű háromszögre',
      '3 darab egyenlő területű háromszögre',
      '8 darab háromszögre'
    ],
    correctAnswer: 0,
    explanation: 'A 3 súlyvonal pontosan 6 darab olyan kisebb háromszögre osztja az idomot, amelyek területe egyaránt T / 6.'
  },
  {
    id: 'mm-q22',
    level: 3,
    question: 'Ha egy egyenlő szárú háromszög (alap 42 mm, magasság 20 mm) területe T = 420 mm², mekkora a 6 kis rész területe?',
    options: [
      '70 mm² (420 mm² / 6 = 70 mm² mindegyiknél)',
      '60 mm²',
      '105 mm²',
      '140 mm²'
    ],
    correctAnswer: 0,
    explanation: 'Minden rész területe T / 6 = 420 / 6 = 70 mm².'
  },
  {
    id: 'mm-q23',
    level: 3,
    question: 'Ha a súlypontot összekötjük a 3 csúccsal, mekkora háromszögek keletkeznek az előző 420 mm² területű idomban?',
    options: [
      'Mindhárom háromszög területe pontosan 140 mm² (T / 3)',
      'Mindhárom területe 105 mm²',
      'Különböző területűek',
      '210 mm²'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont és a csúcsok 3 darab T/3 területű háromszögre bontják a nagy háromszöget: 420 / 3 = 140 mm².'
  },
  {
    id: 'mm-q24',
    level: 3,
    question: 'Mekkora a középvonal-háromszög területe az előző 420 mm²-es háromszög esetén?',
    options: [
      '105 mm² (mivel T_közép = T / 4 = 420 / 4 = 105 mm²)',
      '210 mm²',
      '70 mm²',
      '140 mm²'
    ],
    correctAnswer: 0,
    explanation: 'A középvonal-háromszög területe az eredeti negyede: T / 4 = 420 / 4 = 105 mm².'
  },
  {
    id: 'mm-q25',
    level: 3,
    question: 'Melyik hasonlósági alapeset alapján bizonyítható, hogy a középvonal által levágott felső háromszög hasonló az eredetihez?',
    options: [
      'A II. alapeset (o-sz-o), mert a közös szög és a két oldal felezési aránya (1/2) adott',
      'A IV. alapeset (o-o-sz)',
      'Csak a Pitagorasz-tétellel igazolható',
      'Egybevágóság alapján'
    ],
    correctAnswer: 0,
    explanation: 'A felső csúcsnál lévő szög közös, és a két szomszédos oldal aránya CD/CA = CE/CB = 1/2, így a II. alapeset (o-sz-o) teljesül.'
  },
  {
    id: 'mm-q26',
    level: 3,
    question: 'A súlypont 2 : 1 arányát a ΔABS és ΔDES háromszögekkel bizonyítjuk. Melyik alapeset igazolja hasonlóságukat?',
    options: [
      'Az I. alapeset (sz-sz), mert az S-nél lévő csúcsszögek és a párhuzamos szárak váltószögei egyenlők',
      'A III. alapeset (o-o-o)',
      'A IV. alapeset (o-o-sz)',
      'Nem hasonlók egymáshoz'
    ],
    correctAnswer: 0,
    explanation: 'Mivel DE || AB, a váltószögek egyenlők (α = α\', β = β\') és a csúcsszögek is egyenlők, az I. alapeset (sz-sz) bizonyítja a hasonlóságot.'
  },
  {
    id: 'mm-q27',
    level: 3,
    question: 'Mekkora a hasonlóság aránya a fenti ΔABS és ΔDES háromszögek között, és mi következik ebből a súlyvonalakra?',
    options: [
      'λ = AB / DE = 2, amiből következik, hogy AS / SD = 2 és BS / SE = 2 (a 2 : 1 arány)',
      'λ = 1 (egybevágók)',
      'λ = 3',
      'λ = 4'
    ],
    correctAnswer: 0,
    explanation: 'Mivel DE a középvonal (DE = AB / 2), a hasonlósági arány AB / DE = 2, ami közvetlenül bizonyítja a súlyvonalak 2 : 1 arányú metszését!'
  },
  {
    id: 'mm-q28',
    level: 3,
    question: 'Mekkora távolságra van egy 3,8 cm oldalú szabályos háromszög súlypontja a csúcsaitól?',
    options: [
      'Kb. 2,19 cm (mivel R = a / √3 = 3,8 / 1,732 ≈ 2,19 cm)',
      '1,9 cm',
      '3,8 cm',
      '1,27 cm'
    ],
    correctAnswer: 0,
    explanation: 'Szabályos háromszögben a magasság m = (a·√3)/2. A súlypont a csúcstól (2/3)·m = a / √3 = 3,8 / 1,732 ≈ 2,19 cm távolságra van.'
  },
  {
    id: 'mm-q29',
    level: 3,
    question: 'Egy 4,5 cm befogójú egyenlő szárú derékszögű háromszög súlypontja mekkora távolságra van a befogók egyeneseitől?',
    options: [
      '1,5 cm-re (mivel d = a / 3 = 4,5 / 3 = 1,5 cm mindkét befogótól)',
      '2,25 cm-re',
      '3 cm-re',
      '0,75 cm-re'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű csúcsot koordináta-origo gyanánt véve a súlypont koordinátái (a/3, a/3), tehát mindkét befogótól 4,5 / 3 = 1,5 cm távolságra fekszik.'
  },
  {
    id: 'mm-q30',
    level: 3,
    question: 'Egy háromszög területe 72 cm². Megrajzoljuk a három középvonalát, és megkeressük a középvonal-háromszög súlypontját. Hol található ez a pont?',
    options: [
      'Pontosan megegyezik (egybeesik) az eredeti háromszög súlypontjával',
      'A leghosszabb oldal felezőpontjára esik',
      'Az eredeti háromszögön kívül található',
      'Az eredeti magasságpontban van'
    ],
    correctAnswer: 0,
    explanation: 'Minden háromszögben a középvonal-háromszög súlypontja tökéletesen egybeesik az eredeti háromszög súlypontjával!'
  }
];

export const MidlinesMediansQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="haromszog-kozepvonalai-es-sulyvonalai"
      title="9. Háromszög középvonalai és súlyvonalai – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: definíciók, aránypárok, derékszögű és egyenlő szárú háromszögek, hasonlósági bizonyítások."
      questions={MIDLINES_MEDIANS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Középvonalak Tétele és Arányai',
          content:
            '• Középvonal: két oldal felezőpontját köti össze.\n• Tétel: k_c || c és k_c = c / 2.\n• A 3 középvonal 4 egymással egybevágó háromszöget alkot.\n• Középvonal-háromszög: kerülete K / 2, területe T / 4 (λ = 1/2 ⇒ λ² = 1/4).\n• Bizonyítás: ΔEDC ~ ΔABC a II. alapeset (o-sz-o) alapján.'
        },
        {
          title: 'Súlyvonalak és a Súlypont (S)',
          content:
            '• Súlyvonal: csúcsot a szemközti oldal felezőpontjával köti össze.\n• A 3 súlyvonal 1 közös pontban metszi egymást: Súlypont (S).\n• Osztásarány: 2 : 1 (a hosszabbik szakasz esik a csúcs felé):\n  AS = (2/3) · s_a  és  SF_a = (1/3) · s_a.\n• Bizonyítás: ΔABS ~ ΔDES (homokóra) I. eset (sz-sz), λ = AB / DE = 2.'
        },
        {
          title: 'Területfelosztás és Speciális Esetek',
          content:
            '• 1 súlyvonal: 2 egyenlő területű részre felez (T / 2).\n• 3 súlyvonal: 6 egyenlő területű háromszögre oszt (T / 6).\n• S összekötve a csúcsokkal: 3 harmad keletkezik (T / 3).\n• Derékszögű háromszög: átfogóhoz tartozó súlyvonal s_c = c / 2 = R (Thálész-tétel).\n• Szabályos háromszög (a): súlypont távolsága a csúcsoktól R = a / √3.\n• A középvonal-háromszög súlypontja egybeesik az eredeti súlyponttal!'
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MidlinesMediansMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MidlinesMediansSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
export default MidlinesMediansQuiz;

