import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { DirectProportionGraphMatcher } from './DirectProportionGraphMatcher';
import { DirectProportionGraphSorter } from './DirectProportionGraphSorter';

interface DirectProportionGraphQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const DirectProportionGraphQuiz: React.FC<DirectProportionGraphQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapfogalmak és tulajdonságok)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Milyen alakzat az egyenes arányosság grafikonja a derékszögű koordináta-rendszerben?',
      options: [
        'Egy origón (0; 0) átmenő egyenes vagy félegyenes (illetve ilyenre illeszkedő pontsor)',
        'Egy tetszőleges vízszintes egyenes',
        'Egy origót elkerülő parabola görbe',
        'Egy lefelé görbülő körív'
      ],
      correctAnswer: 0,
      hint: 'Gondolj arra, hogy ha a kiindulási adat 0, akkor a hozzá tartozó érték is 0.',
      explanation: 'Az egyenes arányosság grafikonja mindig az origón O(0; 0) áthaladó egyenes vagy félegyenes (diszkrét mennyiségeknél pedig egy ilyen egyenesre illeszkedő pontsor).'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Melyik kitüntetett ponton megy át MINDEN egyenes arányosság grafikonja?',
      options: [
        'Az origón, azaz az O(0; 0) ponton',
        'A (0; 1) ponton',
        'Az (1; 0) ponton',
        'A (10; 10) ponton'
      ],
      correctAnswer: 0,
      hint: '0 kg vásárlásáért 0 Ft-ot fizetünk.',
      explanation: 'Mivel 0-szoros bemenethez 0-szoros kimenet tartozik (y = k · 0 = 0), a grafikon mindig átmegy az O(0; 0) origón.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Melyik tengelyt nevezzük vízszintes tengelynek a derékszögű koordináta-rendszerben?',
      options: [
        'x-tengely (első tengely)',
        'y-tengely (második tengely)',
        'z-tengely (harmadik tengely)',
        'Origó-tengely'
      ],
      correctAnswer: 0,
      hint: 'A pont koordinátáinak jelölése P(x; y), az első a vízszintes.',
      explanation: 'A derékszögű koordináta-rendszer vízszintes tengelye az x-tengely (abszcissza), a függőleges tengely pedig az y-tengely (ordináta).'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mikor ábrázoljuk az egyenes arányosságot különálló PONTSORKÉNT folytonos vonal helyett?',
      options: [
        'Ha a mennyiség csak egész darabokban értelmezhető (pl. füzetek száma, mozijegyek)',
        'Ha a feladatban törtszámok és tizedestörtek szerepelnek',
        'Ha a grafikon meredeksége 2-nél nagyobb',
        'Ha a megtett utat és az eltelt időt ábrázoljuk'
      ],
      correctAnswer: 0,
      hint: 'Vásárolhatsz-e a boltban 1,7 darab vonaljegyet vagy mozibelépőt?',
      explanation: 'Ha a változó csak diszkrét, egész értékeket vehet fel (nem értelmezhető pl. 1,5 db füzet vagy 2,3 db jegy), a pontokat tilos folytonos vonallal összekötni, pontsorként kell ábrázolni.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Melyik esetben helyes a pontokat FOLYTONOS félegyenessel összekötni?',
      options: [
        'Autó által megtett út és eltelt idő folyamatos mozgásnál',
        'Megvásárolt golyóstollak darabszáma és ára',
        'Kosárlabda meccsen dobott kosarak száma',
        'Megvásárolt kutyakölykök száma és ára'
      ],
      correctAnswer: 0,
      hint: 'Melyik mennyiség osztható fel tetszőlegesen apró törtrészekre?',
      explanation: 'Az eltelt idő és a megtett út folytonosan változó mennyiségek: értelmezhető 1,5 óra, 2,25 óra is, ezért a pontokat folytonos vonallal kötjük össze.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Hogyan írható fel általánosan az egyenes arányosság grafikonjának egyenlete?',
      options: [
        'y = k · x',
        'y = k / x',
        'y = x + k',
        'y = k · x²'
      ],
      correctAnswer: 0,
      hint: 'Az összetartozó értékek hányadosa állandó: y / x = k.',
      explanation: 'Mivel az egyenes arányosságban y / x = k, mindkét oldalt x-szel szorozva a grafikon egyenlete: y = k · x (ahol k az arányossági tényező).'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Ha egy egyenes a függőleges y-tengelyt nem a 0-ban, hanem a (0; 500) pontban metszi, az egyenes arányosság grafikonja-e?',
      options: [
        'Nem, mert az egyenes arányosság grafikonjának kötelezően át kell mennie az origón (0; 0)',
        'Igen, minden egyenes vonal egyenes arányosság',
        'Igen, ha 500-zal egyenletesen növekszik',
        'Csak akkor, ha az x-tengelyt is 500-nál metszi'
      ],
      correctAnswer: 0,
      hint: 'Ha 0 km-ért már 500 Ft-ot kell fizetni (pl. alapdíj), a hányados nem lesz állandó.',
      explanation: 'Nem egyenes arányosság! Ha a vonal nem az origóból indul, a két mennyiség hányadosa (y / x) nem lesz állandó, így nem áll fenn egyenes arányosság.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mit jelent a grafikon meredekségében szereplő „k” arányossági tényező?',
      options: [
        'Az 1 egységnyi x-hez tartozó y értéket (pl. egységárat vagy sebességet)',
        'A grafikon teljes hosszát milliméterben',
        'Az origó és a pont közötti távolságot',
        'A tengelyek egymással bezárt 90 fokos szögét'
      ],
      correctAnswer: 0,
      hint: 'Ha x = 1, akkor y = k · 1 = k.',
      explanation: 'A k tényező megmutatja, hogy mekkora y érték tartozik pontosan x = 1 egységhez (ez az egységár, egységnyi sebesség stb.).'
    },
    {
      id: 'q9',
      level: 1,
      question: 'A koordináta-rendszerben melyik pont jelöli a koordináta-rendszer kezdőpontját (origót)?',
      options: [
        '(0; 0)',
        '(1; 1)',
        '(0; 1)',
        '(1; 0)'
      ],
      correctAnswer: 0,
      hint: 'Ahol a két tengely merőlegesen metszi egymást nulla értéknél.',
      explanation: 'Az origó a tengelyek metszéspontja, koordinátái: O(0; 0).'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Ha a grafikonon jobbra lépünk a vízszintes tengelyen, merre mozog az egyenes arányosság vonala?',
      options: [
        'Felfelé, mert mindkét mennyiség egyszerre növekszik',
        'Lefelé, mert az egyik csökken',
        'Csak vízszintesen halad',
        'Körbe-körbe forog'
      ],
      correctAnswer: 0,
      hint: 'Több áru = több pénz; több idő = nagyobb megtett út.',
      explanation: 'Mivel pozitív arányossági tényezőnél ha x nő, y is növekszik, a grafikon balról jobbra haladva emelkedik (felfelé tart).'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Pontok, leolvasás, meredekség)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Egy egyenes arányosság egyenlete y = 4 · x. Melyik pont illeszkedik erre a grafikonra?',
      options: [
        'P(3; 12)',
        'P(3; 7)',
        'P(3; 9)',
        'P(3; 16)'
      ],
      correctAnswer: 0,
      hint: 'Helyettesíts be: y = 4 · 3 = ?',
      explanation: 'Ha x = 3, akkor y = 4 · 3 = 12. Tehát a P(3; 12) pont illeszkedik a grafikonra.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Egy egyenes arányosság grafikonja átmegy a P(2; 500) ponton. Mennyi az arányossági tényező (k)?',
      options: [
        '250',
        '500',
        '1000',
        '2500'
      ],
      correctAnswer: 0,
      hint: 'Számold ki: k = y / x.',
      explanation: 'Az arányossági tényező: k = y / x = 500 / 2 = 250 (pl. 250 Ft/db).'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Két egyenes arányosság grafikonja látható: az „A” egyenes egyenlete y = 5x, a „B” egyenesé y = 2x. Melyik meredekebb?',
      options: [
        'Az „A” egyenes meredekebb, mert 5 > 2',
        'A „B” egyenes meredekebb, mert 2 kisebb szám',
        'Mindkettő egyformán meredek, mert mindkettő origón megy át',
        'Egyik sem meredek, mert egyenesek'
      ],
      correctAnswer: 0,
      hint: 'Nagyobb arányossági tényező (egységár) meredekebb emelkedést jelent.',
      explanation: 'Minél nagyobb a k arányossági tényező, annál gyorsabban nő az y az x-hez képest, tehát annál meredekebb a grafikon. Mivel 5 > 2, az „A” egyenes meredekebb.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Egy gyalogos sebességének grafikonján az x tengelyen az idő (óra), az y tengelyen a megtett út (km) szerepel. A grafikon átmegy a (3; 15) ponton. Hány km-t tesz meg 5 óra alatt?',
      options: [
        '25 km',
        '20 km',
        '30 km',
        '18 km'
      ],
      correctAnswer: 0,
      hint: 'Mennyi a sebessége (1 óra alatt megtett útja)? 15 : 3 = ?',
      explanation: 'A sebesség: v = 15 km : 3 h = 5 km/h. Így 5 óra alatt: 5 h · 5 km/h = 25 km-t tesz meg.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Egy grafikon egyenlete y = 350 · x (ahol x a banán kg-ban, y a fizetendő Ft). Mennyit kell fizetni 4,5 kg banánért?',
      options: [
        '1575 Ft',
        '1400 Ft',
        '1750 Ft',
        '1625 Ft'
      ],
      correctAnswer: 0,
      hint: 'Számold ki: 350 · 4,5.',
      explanation: 'y = 350 · 4,5 = 1400 + 175 = 1575 Ft.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Egyenes arányosság grafikonján melyik pont NEM fekszik az y = 6 · x egyenesen?',
      options: [
        '(4; 20)',
        '(1; 6)',
        '(2; 12)',
        '(5; 30)'
      ],
      correctAnswer: 0,
      hint: 'Ellenőrizd: 6 · 4 = 24, nem pedig 20.',
      explanation: 'A (4; 20) pontban y / x = 20 / 4 = 5 ≠ 6. A helyes pont a (4; 24) lenne, így a (4; 20) nem illeszkedik az y = 6x egyenesre.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Ha a grafikonról leolvasva az x = 4 értékhez y = 1000 tartozik, mennyi tartozik x = 10-hez?',
      options: [
        '2500',
        '2000',
        '3000',
        '4000'
      ],
      correctAnswer: 0,
      hint: 'Először számold ki az 1 egységre eső értéket: 1000 : 4 = 250.',
      explanation: 'k = 1000 / 4 = 250. Így x = 10 esetén: y = 250 · 10 = 2500.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Egy vásárlási grafikonon 1 kg sajt 2400 Ft. Hány kg sajtot kapunk 6000 Ft-ért?',
      options: [
        '2,5 kg',
        '2 kg',
        '3 kg',
        '3,5 kg'
      ],
      correctAnswer: 0,
      hint: 'Itt y = 6000 és k = 2400. x = y / k.',
      explanation: 'x = 6000 / 2400 = 60 / 24 = 5 / 2 = 2,5 kg.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'A derékszögű koordináta-rendszerben a P(5; 35) és Q(2; 14) pontok illeszkednek-e ugyanarra az egyenes arányosságra?',
      options: [
        'Igen, mert mindkettőnél y / x = 7 (az arányossági tényező azonos)',
        'Nem, mert a pontok koordinátái teljesen különbözőek',
        'Nem, mert 35 - 14 nem egyenlő 5 - 2-vel',
        'Csak akkor, ha az összegük páros'
      ],
      correctAnswer: 0,
      hint: 'Nézd meg a hányadosokat: 35 / 5 és 14 / 2.',
      explanation: 'P-nél: 35 / 5 = 7. Q-nál: 14 / 2 = 7. Mivel mindkét pont hányadosa megegyezik (k = 7), mindkettő illeszkedik az y = 7x egyenesre.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Hogyan állapítható meg a grafikonról közvetlenül a k arányossági tényező értéke?',
      options: [
        'Megnézzük, hogy a vízszintes tengely x = 1 pontjánál mekkora a grafikon y magassága',
        'Megszámoljuk, hány rácsnégyzet van a lapon',
        'Összeadjuk a koordinátatengelyek hosszát',
        'Megkeressük az origó koordinátáit'
      ],
      correctAnswer: 0,
      hint: 'Mivel y = k · x, ha x = 1, akkor y = k.',
      explanation: 'Az x = 1 függőleges vonalon a grafikon y magassága pontosan az 1 egységre jutó értéket, azaz a k arányossági tényezőt adja meg.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett feladatok és diagramok)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Egyenletes mozgást végző vonat útját ábrázoljuk. 1,5 óra alatt 120 km-t tett meg. Hány óra alatt tesz meg 280 km-t a grafikon összefüggése alapján?',
      options: [
        '3,5 óra',
        '3 óra',
        '4 óra',
        '2,5 óra'
      ],
      correctAnswer: 0,
      hint: 'Számold ki a sebességet: 120 / 1,5 = 80 km/h. Majd idő = 280 / 80.',
      explanation: 'A vonat sebessége (a grafikon meredeksége): k = 120 / 1,5 = 80 km/h. A 280 km megtételéhez szükséges idő: t = 280 / 80 = 3,5 óra (3 óra 30 perc).'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Két futó (Anna és Béla) mozgásának grafikonja az origóból indul. Anna grafikonja átmegy a (2; 16), Béla grafikonja a (3; 21) ponton (x: idő órában, y: út km-ben). Ki futott gyorsabban és mennyivel?',
      options: [
        'Anna gyorsabb 1 km/h-val (Anna: 8 km/h, Béla: 7 km/h)',
        'Béla gyorsabb 1 km/h-val (Béla: 8 km/h, Anna: 7 km/h)',
        'Béla gyorsabb 5 km-rel, mert 21 > 16',
        'Ugyanolyan gyorsak voltak'
      ],
      correctAnswer: 0,
      hint: 'Számold ki mindkét futó sebességét: k = y / x.',
      explanation: 'Anna sebessége: 16 / 2 = 8 km/h. Béla sebessége: 21 / 3 = 7 km/h. Anna sebessége nagyobb 1 km/h-val, az ő grafikonja meredekebb.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Egy víztartály egyenletes feltöltésének grafikonja átmegy a (4 perc; 60 liter) ponton. Hány liter víz folyik a tartályba negyedóra (15 perc) alatt?',
      options: [
        '225 liter',
        '200 liter',
        '240 liter',
        '180 liter'
      ],
      correctAnswer: 0,
      hint: 'Percenkénti töltési sebesség: 60 / 4 = 15 liter/perc.',
      explanation: 'A percenkénti vízmennyiség: k = 60 / 4 = 15 liter/perc. Negyedóra (15 perc) alatt: 15 · 15 = 225 liter folyik a tartályba.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Miért NEM egyenes arányosság grafikonja a taxi díjszabása, ha az alapdíj 1000 Ft és kilométerenként 400 Ft-ot kérnek?',
      options: [
        'Mert az egyenlet y = 400x + 1000, így a grafikon a (0; 1000) pontból indul, nem az origóból',
        'Mert a taxi nem egyenes úton megy, hanem kanyarodik',
        'Mert a 400 Ft túl kevés egy kilométerre',
        'Mert a kilométert méterben kellene mérni'
      ],
      correctAnswer: 0,
      hint: '0 km esetén is fizetni kell 1000 Ft-ot, ezért y / x nem állandó.',
      explanation: '1 km esetén 1400 Ft (hányados: 1400), 2 km esetén 1800 Ft (hányados: 900). A hányados nem állandó, és a grafikon nem az origóból (0; 0) indul, így nem egyenes arányosság.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy gyárban a gép 6 perc alatt 45 dobozt csomagol be. Hány perc szükséges 150 doboz becsomagolásához az egyenes arányosság alapján?',
      options: [
        '20 perc',
        '18 perc',
        '25 perc',
        '22,5 perc'
      ],
      correctAnswer: 0,
      hint: 'Hány dobozt csomagol 1 perc alatt? 45 / 6 = 7,5 doboz/perc. 150 / 7,5 = ?',
      explanation: 'A gép teljesítménye: 45 / 6 = 7,5 doboz/perc. A 150 dobozhoz szükséges idő: 150 / 7,5 = 20 perc.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Ha egy téglalap szélessége állandó (b = 5 cm), akkor a hossza (a) és a területe (T = 5 · a) egyenesen arányos. Milyen a területi grafikon képe?',
      options: [
        'Origóból induló, k = 5 meredekségű félegyenes',
        'Origót elkerülő görbe vonal',
        'Vízszintes egyenes 5 cm magasságban',
        'Diszkrét pontsor, mert csak egész terület létezik'
      ],
      correctAnswer: 0,
      hint: 'Mivel T = 5 · a, és az oldal tetszőleges valós nemnegatív szám lehet.',
      explanation: 'Mivel T = 5a alakú, a terület egyenesen arányos a hosszúsággal, és mivel a hosszúság folytonos mennyiség, a grafikon egy origóból induló, k = 5 meredekségű folytonos félegyenes.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy térképen a méretarány 1 : 200 000. Ha a grafikon x tengelye a térképi távolság (cm), y tengelye a valós távolság (km), mennyi az egyenes arányossági tényező (k)?',
      options: [
        'k = 2 (mert 1 cm a térképen = 2 km a valóságban)',
        'k = 200 000',
        'k = 20',
        'k = 0,2'
      ],
      correctAnswer: 0,
      hint: 'Váltsd át a 200 000 cm-t km-be: 200 000 cm = 2000 m = 2 km.',
      explanation: '1 cm a térképen megfelel 200 000 cm-nek = 2000 m-nek = 2 km-nek a valóságban. Így y (km) = 2 · x (cm), az arányossági tényező k = 2.'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy autópályán egy gépkocsi sebessége v₁ = 120 km/h, egy kamioné v₂ = 80 km/h. A megtett út-idő grafikonon mekkora a két egyenes magasságának (y) különbsége 2,5 óra elteltével?',
      options: [
        '100 km (300 km - 200 km)',
        '80 km',
        '40 km',
        '120 km'
      ],
      correctAnswer: 0,
      hint: 'Autó: 2,5 · 120 = 300 km. Kamion: 2,5 · 80 = 200 km.',
      explanation: 'Az autó útja 2,5 óra alatt: 2,5 · 120 = 300 km. A kamion útja: 2,5 · 80 = 200 km. A kettő különbsége a grafikonon: 300 - 200 = 100 km.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egyenletesen fogyó gyertya hossza az idő függvényében csökken: kezdetben 20 cm, óránként 2 cm-t ég le (y = 20 - 2x). Egyenes arányosság grafikonja-e ez?',
      options: [
        'Nem, mert a mennyiség csökken, a vonal lefelé lejt és a (0; 20) pontból indul, nem az origóból',
        'Igen, mert az égés egyenes vonalat alkot',
        'Igen, mert 2 cm-enként egyenletesen változik',
        'Igen, ha a leégett részt mérjük'
      ],
      correctAnswer: 0,
      hint: 'Nézd meg a kezdeti értéket: 0 óránál 20 cm, nem pedig 0 cm!',
      explanation: 'Nem egyenes arányosság! A meglévő gyertya hossza csökken (nem nő együtt a két adat), és nem az origóból indul (x = 0 esetén y = 20). A hányados sem állandó: 1 óránál 18/1 = 18, 2 óránál 16/2 = 8.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'A koordináta-rendszerben egy egyenes arányosság átmegy a P(3; 9) ponton. Hol metszi ez az egyenes az x = 7 függőleges egyenest?',
      options: [
        'Az y = 21 pontban, azaz a Q(7; 21) pontban',
        'Az y = 14 pontban',
        'Az y = 28 pontban',
        'Az y = 10 pontban'
      ],
      correctAnswer: 0,
      hint: 'P-ből az arányossági tényező: k = 9 / 3 = 3. Ekkor x = 7-nél y = 3 · 7.',
      explanation: 'Az arányossági tényező: k = 9 / 3 = 3. Az egyenes egyenlete: y = 3x. Ha x = 7, akkor y = 3 · 7 = 21, tehát a metszéspont a Q(7; 21).'
    }
  ];

  return (
    <QuizTemplate
      title="Egyenes arányosság grafikonja kvíz"
      subtitle="Gyakorold a koordináta-rendszer leolvasását, pontok vizsgálatát és meredekséget 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="lime"
      category="Grafikonok"
      topicTitle="Egyenes arányosság grafikonja"
      questions={questions}
      matcherComponent={DirectProportionGraphMatcher}
      sorterComponent={DirectProportionGraphSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DirectProportionGraphQuiz;
