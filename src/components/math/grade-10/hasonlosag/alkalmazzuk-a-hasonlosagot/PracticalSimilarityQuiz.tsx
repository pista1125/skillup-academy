import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PracticalSimilarityMatcher } from './PracticalSimilarityMatcher';
import { PracticalSimilaritySorter } from './PracticalSimilaritySorter';

const PRACTICAL_SIMILARITY_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Közvetett mérések és alapvető összefüggések (1-10)
  {
    id: 'ps-q1',
    level: 1,
    question: 'Miért használható a napsütéses árnyékmérés magas fák és épületek magasságának meghatározására?',
    options: [
      'Mert a Nap sugarai a Föld távolsága miatt gyakorlatilag párhuzamosak, így hasonló derékszögű háromszögek keletkeznek',
      'Mert az árnyék hossza a Nap magasságától függetlenül mindig állandó',
      'Mert a fa magassága pontosan megegyezik a vetett árnyék hosszával',
      'Mert az árnyék csak déli 12 órakor látható'
    ],
    correctAnswer: 0,
    explanation: 'A távoli Napból érkező fénysugarak egymással párhuzamosak, így a függőleges tárgyak és árnyékaik által bezárt derékszögű háromszögek megfelelő szögei egyenlők, azaz hasonlóak.'
  },
  {
    id: 'ps-q2',
    level: 1,
    question: 'Péter 160 cm magas. Egy fától 4,5 méterre állva árnyéka még éppen belefér a fa árnyékába, úgy, hogy a fa árnyékának vége 1,2 méterre van Pétertől. Milyen hosszú a fa teljes árnyéka?',
    options: [
      '5,7 méter (4,5 m + 1,2 m)',
      '4,5 méter',
      '3,3 méter',
      '6,9 méter'
    ],
    correctAnswer: 0,
    explanation: 'A fa teljes árnyéka a fa törzsétől az árnyék végéig tart: 4,5 m + 1,2 m = 5,7 m.'
  },
  {
    id: 'ps-q3',
    level: 1,
    question: 'Milyen magas a fa a fenti feladatban (Péter: 1,6 m, Péter árnyéka: 1,2 m, fa teljes árnyéka: 5,7 m)?',
    options: [
      '7,6 méter',
      '6,0 méter',
      '8,2 méter',
      '9,1 méter'
    ],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya: λ = 5,7 / 1,2 = 4,75. A fa magassága: M = 1,6 m · 4,75 = 7,6 m.'
  },
  {
    id: 'ps-q4',
    level: 1,
    question: 'Mi a geometriai alapja a síktükörrel végzett magasságmérésnek?',
    options: [
      'A fényvisszaverődés törvénye: a beesési szög egyenlő a visszaverődési szöggel, így hasonló derékszögű háromszögek jönnek létre',
      'A síktükör megduplázza a tárgy látszólagos magasságát',
      'A tükörben látható kép mindig 90°-kal el van forgatva',
      'A tükör felületén a fény törést szenved'
    ],
    correctAnswer: 0,
    explanation: 'A talajra fektetett vízszintes tükörnél a beesési szög egyenlő a visszaverődési szöggel (α = α). A függőleges torony és a függőleges ember derékszöget zár be a talajjal, így a két háromszög hasonló.'
  },
  {
    id: 'ps-q5',
    level: 1,
    question: 'Egy síktükör 20 méterre van egy toronytól. A megfigyelő 2 méterre áll a tükörtől, és 1,7 m szemmagasságból látja a toronycsúcsot. Milyen magas a torony?',
    options: [
      '17 méter',
      '34 méter',
      '20 méter',
      '15 méter'
    ],
    correctAnswer: 0,
    explanation: 'M / m_szem = D / d ⇒ M / 1,7 = 20 / 2 = 10 ⇒ M = 1,7 · 10 = 17 méter.'
  },
  {
    id: 'ps-q6',
    level: 1,
    question: 'Mire kell ügyelni, ha közvetett magasságmérésnél a szögmérőt nem a földre, hanem szemmagasságba helyezzük?',
    options: [
      'A kiszámított magassághoz utólag hozzá kell adni a szemmagasságot',
      'A kiszámított magasságból le kell vonni a szemmagasságot',
      'A mért szöget meg kell duplázni',
      'A szemmagasság nem befolyásolja az eredményt'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög alapja a szemmagasságban lévő vízszintes egyenesre esik, így a talajig terjedő teljes magasság a kiszámított magasság és a szemmagasság összege.'
  },
  {
    id: 'ps-q7',
    level: 1,
    question: 'A Gyöngyszálló tetejét 8 méter távolságból, 1,6 m szemmagasságból 70°-os emelkedési szögben látjuk. Mekkora a szálloda magassága (tan 70° ≈ 2,747)?',
    options: [
      'Kb. 23,6 méter',
      'Kb. 21,98 méter',
      'Kb. 25,2 méter',
      'Kb. 18,4 méter'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög magassága: 8 m · tan 70° ≈ 8 · 2,747 = 21,98 m. Ehhez hozzáadva a szemmagasságot: 21,98 + 1,6 = 23,58 ≈ 23,6 méter.'
  },
  {
    id: 'ps-q8',
    level: 1,
    question: 'Miért biztos, hogy két szabályos háromszög alakú közlekedési tábla hasonló egymáshoz?',
    options: [
      'Mert minden szabályos háromszög szögei pontosan 60°-osak, és oldalaik aránya állandó',
      'Csak akkor hasonlók, ha azonos a méretük',
      'Mert a KRESZ előírja az egybevágóságot',
      'Csak akkor hasonlók, ha középpontosan hasonlók'
    ],
    correctAnswer: 0,
    explanation: 'Minden szabályos háromszög szögei 60°-osak, oldalaik egyenlők, így bármely két szabályos háromszög automatikusan hasonló egymáshoz.'
  },
  {
    id: 'ps-q9',
    level: 1,
    question: 'Hol található egy szabályos háromszög alakú közlekedési tábla külső és belső háromszögének hasonlósági középpontja?',
    options: [
      'A szabályos háromszög súlypontjában (beírt és körülírt körének közös középpontjában)',
      'A háromszög alsó vízszintes élének felezőpontjában',
      'A felső csúcsában',
      'Nincs hasonlósági középpontjuk'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetria miatt a kerettel párhuzamos belső háromszög a súlypontból (a beírt és körülírt körök középpontjából) vett középpontos kicsinyítéssel áll elő.'
  },
  {
    id: 'ps-q10',
    level: 1,
    question: 'Miért NEM alkalmazható az egyszerű árnyékmódszer éjszaka egy közeli utcai lámpa fényénél?',
    options: [
      'Mert a közeli lámpa pontszerű fényforrás, sugarai széttartók (divergensek), nem párhuzamosak',
      'Mert a lámpafényben az árnyék nem egyenes vonalú',
      'Mert a fény sebessége éjszaka kisebb',
      'Mert a lámpa alatt a tárgyak egybevágóvá válnak'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos napsugarakkal ellentétben a közeli lámpa pontszerű forrásként széttartó sugarakat bocsát ki, így a beesési szög a távolsággal folyamatosan változik, a háromszögek nem lesznek hasonlóak.'
  },

  // LEVEL 2: Érettségi feladatok, margó-cáfolat és folyóparti kitűzés (11-20)
  {
    id: 'ps-q11',
    level: 2,
    question: 'Egy A4-es lap mérete 21 cm × 29,7 cm. A margó minden oldalon 2,5 cm, így a belső téglalap 16 cm × 24,7 cm. Hasonló-e a belső téglalap az A4-es laphoz (Érettségi feladat)?',
    options: [
      'Nem hasonló, mert az oldalarányok eltérnek: 29,7 / 21 ≈ 1,414 ≠ 24,7 / 16 = 1,544',
      'Hasonló, mert mindkettő téglalap és minden szögük 90°',
      'Hasonló, mert a margó minden oldalon egyforma 2,5 cm',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Az oldalak aránya az eredeti lapnál 29,7 / 21 ≈ 1,414 (√2), míg a belső résznél (29,7 - 5) / (21 - 5) = 24,7 / 16 ≈ 1,544. Mivel az arányok nem egyenlők, a téglalapok NEM hasonlók!'
  },
  {
    id: 'ps-q12',
    level: 2,
    question: 'Mi az igazságértéke az állításnak: „Ha két négyszög hasonló, akkor megfelelő szögeik páronként egyenlők”?',
    options: [
      'Mindig IGAZ, mert a hasonlóság szögtartó transzformáció',
      'HAMIS, csak a szabályos négyszögekre igaz',
      'HAMIS, mert a szögek is λ-szorosukra változnak',
      'Csak téglalapokra igaz'
    ],
    correctAnswer: 0,
    explanation: 'A geometriai hasonlóság alapvető tulajdonsága a szögtartás, így bármely két hasonló sokszög megfelelő szögei egyenlők.'
  },
  {
    id: 'ps-q13',
    level: 2,
    question: 'Mi a logikai értéke az előbbi állítás megfordításának: „Ha két négyszög megfelelő szögei páronként egyenlők, akkor a két négyszög hasonló”?',
    options: [
      'HAMIS, mert ellenpéldaként két különböző oldalarányú téglalap szögei mind 90°-osak, mégsem hasonlók',
      'Mindig IGAZ, négyszögekre is érvényes a szög-szög alapeset',
      'Csak akkor hamis, ha a négyszög nem konvex',
      'Mindig IGAZ, ha húrnégyszögekről van szó'
    ],
    correctAnswer: 0,
    explanation: 'A megfordítás hamis: a szögek egyenlősége négyszögeknél nem garantálja a hasonlóságot (pl. egy 1 × 2-es és egy 1 × 4-es téglalap szögei egyenlők, de nem hasonlók).'
  },
  {
    id: 'ps-q14',
    level: 2,
    question: 'Egyenletesen mélyülő folyóparton egy 180 cm mélységű, majd 6 méterrel bentebb egy 720 cm mélységű táblát helyeznek el. Milyen messze van az 1. tábla a parttól?',
    options: [
      '2 méterre',
      '3 méterre',
      '1,5 méterre',
      '4 méterre'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenletes lejtés miatt a mélység arányos a távolsággal: 180 / x = 720 / (x + 6). Keresztszorzással: 720x = 180x + 1080 ⇒ 540x = 1080 ⇒ x = 2 méter.'
  },
  {
    id: 'ps-q15',
    level: 2,
    question: 'A fenti feladatban milyen távolságra van a 2. tábla a folyóparttól?',
    options: [
      '8 méterre (2 m + 6 m)',
      '6 méterre',
      '12 méterre',
      '10 méterre'
    ],
    correctAnswer: 0,
    explanation: 'Az első tábla 2 méterre van a parttól, a második tábla 6 méterrel beljebb van: 2 m + 6 m = 8 méter.'
  },
  {
    id: 'ps-q16',
    level: 2,
    question: 'Egy 1 : 3000 méretarányú térképen egy téglalap alakú telek oldalai 3,2 cm és 3,8 cm. Mekkorák a telek valódi oldalai méterben?',
    options: [
      '96 méter és 114 méter',
      '32 méter és 38 méter',
      '9,6 méter és 11,4 méter',
      '960 méter és 1140 méter'
    ],
    correctAnswer: 0,
    explanation: '3,2 cm · 3000 = 9600 cm = 96 m; 3,8 cm · 3000 = 11 400 cm = 114 m.'
  },
  {
    id: 'ps-q17',
    level: 2,
    question: 'Mekkora a 96 m × 114 m-es telek valódi területe megközelítőleg hektárban (1 ha = 10 000 m²)?',
    options: [
      'Kb. 1,1 hektár (10 944 m²)',
      'Kb. 11 hektár',
      'Kb. 0,11 hektár',
      'Kb. 2,2 hektár'
    ],
    correctAnswer: 0,
    explanation: 'Terület = 96 m · 114 m = 10 944 m² ≈ 1,094 ha ≈ 1,1 hektár.'
  },
  {
    id: 'ps-q18',
    level: 2,
    question: 'Egy 1 : 3 000 000 méretarányú térképen mekkora Magyarország területe (valós terület: 93 000 km²)?',
    options: [
      'Kb. 103 cm² (kb. 1 dm²)',
      'Kb. 10,3 cm²',
      'Kb. 310 cm²',
      'Kb. 1030 cm²'
    ],
    correctAnswer: 0,
    explanation: 'λ = 1 / (3 · 10⁶). T_térkép = 93 000 km² / (3 · 10⁶)² = 9,3 · 10⁴ / (9 · 10¹²) = 1,033 · 10⁻⁸ km². Mivel 1 km² = 10¹⁰ cm², ez 1,033 · 10⁻⁸ · 10¹⁰ = 103,3 cm².'
  },
  {
    id: 'ps-q19',
    level: 2,
    question: 'Egy 4,5 km hosszú utat 225 mm hosszúságú szakasz jelöl a térképen. Mi a térkép méretaránya?',
    options: [
      '1 : 20 000',
      '1 : 2000',
      '1 : 200 000',
      '1 : 50 000'
    ],
    correctAnswer: 0,
    explanation: '4,5 km = 4500 m = 4 500 000 mm. Méretarány: 225 / 4 500 000 = 1 / 20 000.'
  },
  {
    id: 'ps-q20',
    level: 2,
    question: 'Egy 900 m² alapterületű telek hány cm² felületet foglal el egy 1 : 300 méretarányú tervrajzon?',
    options: [
      '100 cm²',
      '30 cm²',
      '300 cm²',
      '10 cm²'
    ],
    correctAnswer: 0,
    explanation: '900 m² = 9 000 000 cm². T_rajz = 9 000 000 / 300² = 9 000 000 / 90 000 = 100 cm².'
  },

  // LEVEL 3: Thálész hajótávolság-mérése és biometrikus skálázás (21-30)
  {
    id: 'ps-q21',
    level: 3,
    question: 'Thálész hajótávolság-mérési eljárásában a part menti szakaszok b = 100 m, c = 10 m, a szárazföld felé tett séta d = 25 m, és a = 0. Milyen messze van a hajó a parttól?',
    options: [
      '250 méter',
      '500 méter',
      '125 méter',
      '100 méter'
    ],
    correctAnswer: 0,
    explanation: 'A hasonló háromszögekből: t / b = d / c ⇒ t = (d · b) / c = (25 · 100) / 10 = 250 méter.'
  },
  {
    id: 'ps-q22',
    level: 3,
    question: 'Miért ügyelt Thálész arra a hajómérésnél, hogy a c szakasz jóval rövidebb legyen, mint a b szakasz (c << b)?',
    options: [
      'Hogy a szárazföld belseje felé merőlegesen tett séta (d) kényelmesen rövid maradjon a méréshez',
      'Mert a partvonal ott véget ért',
      'Mert a tenger hullámzása elmosta volna a kitűzést',
      'Mert a görög mértékegységek ezt követelték meg'
    ],
    correctAnswer: 0,
    explanation: 'Mivel d = t · (c / b), ha c jóval kisebb, mint b, akkor d is jóval kisebb lesz a hajó t távolságánál, így Thálésznak nem kellett kilométereket gyalogolnia a szárazföldön a célzáshoz.'
  },
  {
    id: 'ps-q23',
    level: 3,
    question: 'Miért skálázódik egy élőlény abszolút izomereje a hasonlóság arányának négyzetével (λ²)?',
    options: [
      'Mert az izom által kifejthető húzóerő az izomrostok számával, vagyis az izom keresztmetszeti felületével arányos',
      'Mert az izomzat térfogata határozza meg az erőt',
      'Mert a gravitáció a magasság négyzetével csökken',
      'Mert az idegsejtek száma felületi eloszlású'
    ],
    correctAnswer: 0,
    explanation: 'A biomechanikában az izom maximális ereje a benne párhuzamosan futó miofibrillumok számától, azaz az izom fiziológiai keresztmetszetétől függ, ami felületi mérték (λ²).'
  },
  {
    id: 'ps-q24',
    level: 3,
    question: 'Miért skálázódik az élőlény saját testtömege a hasonlósági arány köbével (λ³)?',
    options: [
      'Mert állandó testsűrűség mellett a tömeg a test térfogatával (m = ρ · V) arányos',
      'Mert a tömeg a bőrfelülettel egyenesen arányos',
      'Mert a csontok hossza köbösen nő',
      'Mert a vérnyomás a magasság köbével arányos'
    ],
    correctAnswer: 0,
    explanation: 'A testtömeg a testsűrűség és a térfogat szorzata. Térbeli geometriai hasonlóságnál a térfogat λ³ szerint skálázódik.'
  },
  {
    id: 'ps-q25',
    level: 3,
    question: 'Hogyan függ egy élőlény relatív teherbírása (emelhető teher / saját testtömeg) a méretaránytól (λ)?',
    options: [
      'A relatív teherbírás a mérettel fordítottan arányos: λ² / λ³ = 1 / λ, így a kisebb élőlény relatíve erősebb',
      'A relatív teherbírás egyenesen arányos a mérettel (λ)',
      'A mérettől független állandó minden élőlényre',
      'A méret négyzetével nő'
    ],
    correctAnswer: 0,
    explanation: 'Relatív erő = Izomerő / Testtömeg ∼ λ² / λ³ = 1 / λ. Minél kisebb egy állat (kisebb λ), annál nagyobb a saját testsúlyához viszonyított relatív ereje.'
  },
  {
    id: 'ps-q26',
    level: 3,
    question: 'Egy 180 cm magas embert 1,5 cm-es hangya méretére kicsinyítünk (λ = 1/120). Mekkora teher felemelésére lenne képes saját tömegéhez képest az egyszerűsített modellben?',
    options: [
      'Saját testtömegének mintegy 120-szorosát bírná el',
      'Saját testtömegének pontosan a felét',
      'Csak a testtömege 1/120-ad részét',
      'A testtömege 14 400-szorosát'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a relatív erő 1 / λ = 120-szorosára nő, az emberméretűnél 1 testsúlyt felemelő ember hangyaméretben kényelmesen felemelné saját tömegének 120-szorosát.'
  },
  {
    id: 'ps-q27',
    level: 3,
    question: 'Gulliver Lilliputban: a lilliputiak 1/12-akkorák, mint Gulliver (λ = 1/12). Hány lilliputi ember tömege teszi ki Gulliver teljes testtömegét?',
    options: [
      '1728 lilliputi (12³)',
      '144 lilliputi (12²)',
      '12 lilliputi',
      '20 736 lilliputi (12⁴)'
    ],
    correctAnswer: 0,
    explanation: 'A tömeg a méret köbével arányos: V_Gulliver / V_lilliputi = 12³ = 1728.'
  },
  {
    id: 'ps-q28',
    level: 3,
    question: 'Hányszor több textilanyagra volt szükség Gulliver ruhájának megvarrásához egy lilliputi ember ruhájához képest?',
    options: [
      '144-szer több anyagra (12²)',
      '1728-szor több anyagra (12³)',
      '12-szer több anyagra',
      '24-szer több anyagra'
    ],
    correctAnswer: 0,
    explanation: 'A ruha felülete a felületi méretekkel, vagyis a hasonlóság négyzetével arányos: 12² = 144.'
  },
  {
    id: 'ps-q29',
    level: 3,
    question: 'Egy lakás három egymás melletti szobája 18 m², 24 m² és 12 m² területű. Ha szélességük azonos, milyen arányban kell felosztani a lakás hosszanti AB szakaszát?',
    options: [
      '3 : 4 : 2 arányban',
      '18 : 24 : 12 nem egyszerűsíthető',
      '1 : 2 : 3 arányban',
      '9 : 12 : 6 arányban kizárólag'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a szélesség azonos, a területek aránya megegyezik a hosszak arányával: 18 : 24 : 12 = 3 : 4 : 2 (6-tal osztva).'
  },
  {
    id: 'ps-q30',
    level: 3,
    question: 'Hogyan osztunk fel szerkesztéssel egy AB szakaszt 3 : 4 : 2 arányban a párhuzamos szelők segítségével?',
    options: [
      'A-ból segédfélegyenest húzunk, felmérünk 3 + 4 + 2 = 9 egyenlő szakaszt, az utolsó pontot B-vel összekötjük, majd a 3. és 7. osztópontból párhuzamosokat húzunk',
      'Felezzük a szakaszt kétszer',
      'Körzővel 3 cm-es, 4 cm-es és 2 cm-es köríveket metszünk',
      'Megmérjük vonalzóval és elosztjuk 3-mal'
    ],
    correctAnswer: 0,
    explanation: 'Ez a szakasz adott arányú felosztásának klasszikus szerkesztése: a segédfélegyenesre felmért 9 egység végpontját összekötjük B-vel, és a 3. illetve a (3+4)=7. osztópontból húzott párhuzamosok 3 : 4 : 2 arányban osztják fel az AB szakaszt.'
  }
];

export const PracticalSimilarityQuiz: React.FC<{
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}> = (props) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="alkalmazzuk-a-hasonlosagot"
      title="Alkalmazzuk a hasonlóságot! – Kvíz"
      subtitle="Teszteld tudásodat a közvetett terepi mérésekről, a Thálész-módszerről, az érettségi margó-cáfolatról és a biometrikus skálázásról!"
      questions={PRACTICAL_SIMILARITY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Közvetett Magasság- és Távolságmérések',
          items: [
            'Árnyékmódszer: M / m = Árnyék_nagy / Árnyék_kicsi (párhuzamos napsugarak)',
            'Tükörmódszer: M / m_szem = D_tükör-torony / d_ember-tükör (beesési szög = visszaverődési szög)',
            'Thálész tengerparti kitűzése: t = (d · b / c) - a (hasonló derékszögű háromszögek)',
            'Szemmagasság: utólag mindig hozzá kell adni a háromszög kiszámított magasságához!'
          ]
        },
        {
          title: 'A Margó-csapda és Négyszögek Logikája (Érettségi)',
          items: [
            'A4 lap (21 × 29,7 cm) margóval (16 × 24,7 cm): 29,7/21 ≈ 1,414 ≠ 24,7/16 ≈ 1,544 ⇒ NEM HASONLÓ!',
            'Egyenlő sáv levonása minden oldalból mindig torzítja az oldalarányt',
            'Állítás: Hasonló négyszögek szögei egyenlők ⇒ Mindig IGAZ',
            'Megfordítás: Szögeik egyenlők ⇒ Hasonlók ⇒ HAMIS (pl. téglalapok, amelyek oldalaránya más)'
          ]
        },
        {
          title: 'Biometrikus Skálázódás (Hangya vs. Ember)',
          items: [
            'Izomerő az izom keresztmetszetével (λ²) arányos',
            'Testtömeg a térfogattal (λ³) arányos',
            'Relatív erő (teherbírás / tömeg) = λ² / λ³ = 1 / λ',
            'Ha az embert 1/120-ára kicsinyítjük, relatív ereje 120-szorosára nő!'
          ]
        }
      ]}
      matcherComponent={
        <PracticalSimilarityMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={props.onSwitchToSorter}
        />
      }
      sorterComponent={
        <PracticalSimilaritySorter
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

