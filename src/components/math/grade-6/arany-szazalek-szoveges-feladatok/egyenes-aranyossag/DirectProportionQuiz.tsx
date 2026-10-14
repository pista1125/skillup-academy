import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { DirectProportionMatcher } from './DirectProportionMatcher';
import { DirectProportionSorter } from './DirectProportionSorter';

interface DirectProportionQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const directProportionCheatSheetContent: CheatSheetContent = {
  title: 'Szabálytár: Egyenes Arányosság',
  sections: [
    {
      title: '1. Az egyenes arányosság fogalma',
      content:
        'Két összetartozó mennyiség egyenesen arányos, ha az egyik valahányszorosára (2-szeresére, 3-szorosára, felére stb.) változik, akkor a másik is pontosan ugyanannyiszorosára változik.\nKéplet: y = k · x, ahol k az arányossági tényező.'
    },
    {
      title: '2. Állandó hányados',
      content:
        'Egyenesen arányos mennyiségek összetartozó értékeinek hányadosa állandó szám:\ny / x = k (állandó).\nPéldául ha 3 kg alma 1200 Ft, akkor 1200 / 3 = 400 Ft/kg.'
    },
    {
      title: '3. Következtetés 1 egységre (3 lépéses módszer)',
      content:
        '1. Kiinduló állapot: felírjuk a megadott adatokat (pl. 4 füzet = 1000 Ft).\n2. 1 egység kiszámítása osztással: 1 füzet = 1000 Ft : 4 = 250 Ft.\n3. Keresett mennyiség szorzással: 7 füzet = 7 · 250 Ft = 1750 Ft.'
    },
    {
      title: '4. Veszélyzóna: Mikor NEM egyenes arányosság?',
      content:
        '• Négyzet területe: T = a² (az oldal duplázásakor a terület négyszereződik, négyzetes arányosság).\n• Jármű fékútja: sebesség négyzetével arányos.\n• Munkások száma és munkaidő: fordított arányosság (több munkás hamarabb kész).\n• Életkor és testméretek: a különbség állandó, nem a hányados!'
    }
  ]
};

const directProportionQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'dp-q1',
    level: 1,
    question: 'Mit jelent az, hogy két összetartozó mennyiség egyenesen arányos?',
    options: [
      'Ha az egyik mennyiség valahányszorosára változik, a másik is ugyanannyiszorosára változik',
      'Ha az egyik mennyiség nő, akkor a másik mennyiség mindig csökken',
      'A két mennyiség összege minden esetben ugyanannyi marad',
      'A két mennyiség szorzata mindig állandó számot ad'
    ],
    correctAnswer: 0,
    hint: 'Gondolj a vásárlásra: ha kétszer annyi almát veszel, hányszor annyit fizetsz?',
    explanation: 'Egyenes arányosságnál ha az egyik mennyiség n-szeresére nő vagy csökken, a hozzá tartozó másik mennyiség is pontosan n-szeresére nő vagy csökken.'
  },
  {
    id: 'dp-q2',
    level: 1,
    question: 'Melyik összefüggés igaz az egyenesen arányos mennyiségek összetartozó értékeire?',
    options: [
      'A hányadosuk (y / x) mindig állandó szám',
      'A szorzatuk (y · x) mindig állandó szám',
      'A különbségük (y - x) soha nem változik',
      'Az összegük (y + x) mindig egyenlő 100-zal'
    ],
    correctAnswer: 0,
    hint: 'Az egységár (pl. Ft/kg vagy km/h) a két mennyiség hányadosa, és ez nem változik.',
    explanation: 'Egyenes arányosság esetén az összetartozó értékek hányadosa állandó: y / x = k, ahol k az arányossági tényező.'
  },
  {
    id: 'dp-q3',
    level: 1,
    question: 'Ha 1 kg alma ára 400 Ft, mennyibe kerül 3 kg ugyanolyan alma?',
    options: ['1200 Ft', '800 Ft', '1600 Ft', '700 Ft'],
    correctAnswer: 0,
    hint: 'Háromszor akkora mennyiségért háromszor annyit kell fizetni: 3 · 400 Ft.',
    explanation: 'A vásárolt mennyiség 3-szorosára nőtt (1 kg -> 3 kg), így az ár is a 3-szorosára nő: 3 · 400 Ft = 1200 Ft.'
  },
  {
    id: 'dp-q4',
    level: 1,
    question: 'Egy füzet ára 250 Ft. Mennyibe kerül 4 darab ilyen füzet?',
    options: ['1000 Ft', '750 Ft', '1250 Ft', '500 Ft'],
    correctAnswer: 0,
    hint: 'Szorozd meg az egy darab árát néggyel: 4 · 250 Ft.',
    explanation: 'A füzetek száma 4-szeresére nőtt, így a fizetendő összeg is a négyszerese lesz: 4 · 250 Ft = 1000 Ft.'
  },
  {
    id: 'dp-q5',
    level: 1,
    question: 'Egy autó állandó 60 km/h sebességgel halad. Mennyi utat tesz meg 2 óra alatt?',
    options: ['120 km', '60 km', '180 km', '30 km'],
    correctAnswer: 0,
    hint: 'Egy óra alatt 60 km-t tesz meg, két óra alatt kétszer annyit!',
    explanation: 'Egyenletes mozgásnál a megtett út egyenesen arányos az idővel: s = v · t = 60 km/h · 2 h = 120 km.'
  },
  {
    id: 'dp-q6',
    level: 1,
    question: 'Melyik alábbi mennyiségpár között van EGYENES arányosság?',
    options: [
      'A megvásárolt kiflik száma és a fizetendő összeg',
      'Egy gyerek életkora és a lábmérete',
      'A munkások száma és a fal lefestéséhez szükséges idő',
      'Egy autó sebessége és a menetidő ugyanazon az úton'
    ],
    correctAnswer: 0,
    hint: 'Keresd azt a párt, ahol duplázáskor a másik mennyiség is pontosan duplázódik!',
    explanation: 'Kétszer annyi kifli pontosan kétszer annyiba kerül. Az életkornál nincs arányosság, a munkások száma és az idő pedig fordítottan arányos.'
  },
  {
    id: 'dp-q7',
    level: 1,
    question: 'Melyik alábbi esetben NINCS egyenes arányosság a két mennyiség között?',
    options: [
      'Egy ember életkora és a cipőmérete',
      'A négyzet oldalhossza és a kerülete',
      'A felhasznált benzin mennyisége és az ára',
      'A kifestett falfelület nagysága és a szükséges festék mennyisége'
    ],
    correctAnswer: 0,
    hint: 'Ha egy 10 éves gyerek lába 36-os, akkor 20 évesen nem lesz 72-es cipője!',
    explanation: 'Az ember növekedése és lábmérete nem egyenes arányosság: a láb növekedése egy idő után megáll, és nem duplázódik a korral.'
  },
  {
    id: 'dp-q8',
    level: 1,
    question: 'Egy négyzet oldala 5 cm, kerülete 20 cm. Ha az oldalát kétszeresére növeljük (10 cm), mekkora lesz a kerülete?',
    options: ['40 cm', '25 cm', '50 cm', '80 cm'],
    correctAnswer: 0,
    hint: 'A négyzet kerülete K = 4 · a. Ha az oldal duplázódik, a kerület is pontosan duplázódik!',
    explanation: 'A négyzet oldala és kerülete egyenesen arányos: K = 4 · 10 cm = 40 cm, ami pontosan a 20 cm kétszerese.'
  },
  {
    id: 'dp-q9',
    level: 1,
    question: 'Ha 5 gombóc fagylaltért 2000 Ft-ot fizetünk, mennyibe kerül 1 gombóc fagylalt?',
    options: ['400 Ft', '500 Ft', '350 Ft', '450 Ft'],
    correctAnswer: 0,
    hint: 'Oszd el a teljes árat a gombócok számával: 2000 Ft : 5.',
    explanation: 'Egységre való visszavezetéssel: 1 gombóc ára = 2000 Ft : 5 = 400 Ft.'
  },
  {
    id: 'dp-q10',
    level: 1,
    question: 'Egy recept szerint 2 adag kakaóitalhoz 4 dl tej kell. Hány dl tej szükséges 6 adaghoz?',
    options: ['12 dl', '8 dl', '10 dl', '16 dl'],
    correctAnswer: 0,
    hint: 'A 6 adag a 2 adagnak a 3-szorosa, így a tejből is 3-szor annyi kell!',
    explanation: 'Mivel 6 adag a 2 adag háromszorosa (6 : 2 = 3), a tej mennyiségét is hárommal szorozzuk: 3 · 4 dl = 12 dl.'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ==========================================
  {
    id: 'dp-q11',
    level: 2,
    question: 'Ha 3 kg narancs 1500 Ft-ba kerül, mennyibe kerül 7 kg narancs?',
    options: ['3500 Ft', '3000 Ft', '4000 Ft', '2800 Ft'],
    correctAnswer: 0,
    hint: 'Először számold ki 1 kg narancs árát (1500 : 3), majd szorozd meg 7-tel!',
    explanation: '1. lépés: 1 kg narancs = 1500 Ft : 3 = 500 Ft. 2. lépés: 7 kg narancs = 7 · 500 Ft = 3500 Ft.'
  },
  {
    id: 'dp-q12',
    level: 2,
    question: 'Egy személygépkocsi 2 óra alatt 140 km utat tesz meg egyenletesen. Hány km-t tesz meg 5 óra alatt?',
    options: ['350 km', '300 km', '280 km', '420 km'],
    correctAnswer: 0,
    hint: 'Mennyit tesz meg 1 óra alatt (140 : 2)? Szorozd meg 5-tel!',
    explanation: '1 óra alatt megtett út (sebesség): 140 km : 2 = 70 km/h. 5 óra alatt: 5 · 70 km = 350 km.'
  },
  {
    id: 'dp-q13',
    level: 2,
    question: '4 doboz gyümölcslé ára 1800 Ft. Mennyibe kerül 6 doboz ugyanilyen gyümölcslé?',
    options: ['2700 Ft', '2400 Ft', '3000 Ft', '2250 Ft'],
    correctAnswer: 0,
    hint: '1 doboz ára = 1800 : 4 = 450 Ft. Szorozz 6-tal!',
    explanation: '1 doboz ára: 1800 Ft : 4 = 450 Ft. 6 doboz ára: 6 · 450 Ft = 2700 Ft.'
  },
  {
    id: 'dp-q14',
    level: 2,
    question: '5 méter pamutszövet ára 7500 Ft. Hány méter szövetet vásárolhatunk 12 000 Ft-ért?',
    options: ['8 métert', '7 métert', '9 métert', '10 métert'],
    correctAnswer: 0,
    hint: '1 méter ára = 7500 : 5 = 1500 Ft. Hányszor van meg az 1500 a 12 000-ben?',
    explanation: '1 méter szövet ára: 7500 Ft : 5 = 1500 Ft/m. 12 000 Ft-ért: 12 000 : 1500 = 8 méter szövetet vehetünk.'
  },
  {
    id: 'dp-q15',
    level: 2,
    question: 'Egy kerékpáros 20 perc alatt 5 km utat tesz meg. Hány kilométert tesz meg 1 óra (60 perc) alatt?',
    options: ['15 km', '12 km', '18 km', '20 km'],
    correctAnswer: 0,
    hint: 'Hányszorosa a 60 perc a 20 percnek? 60 : 20 = 3-szorosa!',
    explanation: '1 óra = 60 perc, ami 3-szorosa a 20 percnek (60 : 20 = 3). Így a megtett út is 3-szorosa: 3 · 5 km = 15 km.'
  },
  {
    id: 'dp-q16',
    level: 2,
    question: '3 kg falfesték pontosan 18 m² felületre elegendő. Hány m² fal festhető le 8 kg festékkel?',
    options: ['48 m²', '42 m²', '54 m²', '36 m²'],
    correctAnswer: 0,
    hint: '1 kg festék hány négyzetméterre elég? 18 : 3 = 6 m². Ezt szorozd meg 8-cal!',
    explanation: '1 kg festékkel lefesthető felület: 18 m² : 3 = 6 m²/kg. 8 kg festékkel: 8 · 6 m² = 48 m² festhető le.'
  },
  {
    id: 'dp-q17',
    level: 2,
    question: 'Egy automata csomagológép 4 perc alatt 48 dobozt készít el. Hány dobozt készít el 9 perc alatt?',
    options: ['108 dobozt', '96 dobozt', '112 dobozt', '84 dobozt'],
    correctAnswer: 0,
    hint: 'Percenként hány dobozt készít el (48 : 4)? Szorozd meg 9-cel!',
    explanation: '1 perc alatt elkészülő dobozok: 48 : 4 = 12 doboz/perc. 9 perc alatt: 9 · 12 = 108 doboz készül el.'
  },
  {
    id: 'dp-q18',
    level: 2,
    question: 'Egy turistatérkép méretaránya szerint 1 cm a térképen 500 méternek felel meg a valóságban. Hány méternek felel meg 4 cm a térképen?',
    options: ['2000 méternek (2 km)', '1500 méternek', '2500 méternek', '1000 méternek'],
    correctAnswer: 0,
    hint: 'A távolság egyenesen arányos a térképi hosszal: szorozz 4-gyel!',
    explanation: 'A méretarány egyenes arányosságot jelent: 4 cm a térképen = 4 · 500 m = 2000 m (azaz 2 km) a terepen.'
  },
  {
    id: 'dp-q19',
    level: 2,
    question: 'Egy gyártósor 6 óra alatt 900 alkatrészt állít elő. Hány alkatrészt készít el 8 óra alatt azonos tempóban?',
    options: ['1200 alkatrészt', '1100 alkatrészt', '1350 alkatrészt', '1050 alkatrészt'],
    correctAnswer: 0,
    hint: 'Óránkénti darabszám: 900 : 6 = 150 db/óra. Szorozz 8-cal!',
    explanation: '1 óra alatt: 900 : 6 = 150 alkatrész készül el. 8 óra alatt: 8 · 150 = 1200 alkatrész készül el.'
  },
  {
    id: 'dp-q20',
    level: 2,
    question: 'Egy táblázatban az összetartozó értékek: ha x = 2, akkor y = 500; ha x = 4, akkor y = 1000; ha x = 6, akkor y = 1500. Mennyi az arányossági tényező (k = y / x)?',
    options: ['250', '500', '200', '125'],
    correctAnswer: 0,
    hint: 'Oszd el az y értékét a hozzá tartozó x-szel: 500 / 2 vagy 1000 / 4.',
    explanation: 'Az arányossági tényező a hányados: k = 500 : 2 = 1000 : 4 = 1500 : 6 = 250.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'dp-q21',
    level: 3,
    question: '1,5 kg prémium sajtért 3600 Ft-ot fizettünk. Mennyibe kerül 2,5 kg ugyanebből a sajtból?',
    options: ['6000 Ft', '5400 Ft', '6500 Ft', '5000 Ft'],
    correctAnswer: 0,
    hint: '1 kg sajt ára = 3600 : 1,5 = 2400 Ft. Szorozd meg 2,5-del!',
    explanation: '1 kg sajt ára: 3600 Ft : 1,5 = 2400 Ft/kg. 2,5 kg sajt ára: 2,5 · 2400 Ft = 6000 Ft.'
  },
  {
    id: 'dp-q22',
    level: 3,
    question: 'Egy gyalogos 15 perc alatt 1200 métert tesz meg egyenletesen. Mekkora a sebessége km/h-ban (mennyi utat tesz meg 1 óra alatt)?',
    options: ['4,8 km/h', '4,2 km/h', '5,0 km/h', '3,6 km/h'],
    correctAnswer: 0,
    hint: '1 óra = 60 perc = 4 · 15 perc. 4 · 1200 m = hány kilométer?',
    explanation: '1 óra alatt 4-szer annyi utat tesz meg, mint 15 perc alatt: 4 · 1200 m = 4800 m. Mivel 4800 m = 4,8 km, a sebessége 4,8 km/h.'
  },
  {
    id: 'dp-q23',
    level: 3,
    question: 'Egy négyzet oldala 2 cm (területe 4 cm²). Ha az oldalt megduplázzuk 4 cm-re, mekkora lesz a területe? Egyenesen arányos-e a négyzet oldala és területe?',
    options: [
      '16 cm², és NEM egyenesen arányos (a terület négyszereződött)',
      '8 cm², és egyenesen arányos (a terület is duplázódott)',
      '12 cm², és nem arányos',
      '16 cm², és egyenesen arányos'
    ],
    correctAnswer: 0,
    hint: 'A terület képlete T = a · a. Ha a = 4, akkor T = 4 · 4 = 16 cm².',
    explanation: 'A 4 cm oldalú négyzet területe 4 · 4 = 16 cm², ami négyszerese a 4 cm²-nek. Mivel az oldal 2-szeresére nőtt, de a terület 4-szeresére, ez NEM egyenes arányosság, hanem négyzetes!'
  },
  {
    id: 'dp-q24',
    level: 3,
    question: 'Egy kerti csapból percenként egyenletesen 12 liter víz folyik ki. Hány perc alatt telik meg egy 180 literes esővízgyűjtő hordó?',
    options: ['15 perc alatt', '12 perc alatt', '18 perc alatt', '20 perc alatt'],
    correctAnswer: 0,
    hint: 'Oszd el a teljes űrtartalmat az egy perc alatt befolyó vízmennyiséggel: 180 : 12.',
    explanation: 'Az idő és a vízmennyiség egyenesen arányos: 180 liter : 12 liter/perc = 15 perc alatt telik meg a hordó.'
  },
  {
    id: 'dp-q25',
    level: 3,
    question: '2,4 méter díszszalag 1440 Ft-ba kerül. Mennyibe kerül 3,5 méter ebből a szalagból?',
    options: ['2100 Ft', '1950 Ft', '2250 Ft', '2400 Ft'],
    correctAnswer: 0,
    hint: '1 méter ára = 1440 : 2,4 = 600 Ft. Szorozd meg 3,5-del!',
    explanation: '1 méter szalag ára: 1440 Ft : 2,4 = 600 Ft/m. 3,5 méter ára: 3,5 · 600 Ft = 2100 Ft.'
  },
  {
    id: 'dp-q26',
    level: 3,
    question: 'Egy 250 grammos különleges csomagolású tea ára 1500 Ft. Mennyibe kerül 1 kilogramm (1000 gramm) ugyanebből a teából?',
    options: ['6000 Ft', '5000 Ft', '4500 Ft', '7500 Ft'],
    correctAnswer: 0,
    hint: 'Hányszorosa az 1000 g a 250 g-nak? 1000 : 250 = 4-szerese!',
    explanation: '1 kg = 1000 g. Mivel az 1000 g négyszerese a 250 g-nak (1000 : 250 = 4), az ár is négyszeres lesz: 4 · 1500 Ft = 6000 Ft.'
  },
  {
    id: 'dp-q27',
    level: 3,
    question: 'Ha 4 munkás 6 óra alatt ássa fel a kertet, egyenes arányosság van-e a munkások száma és a munka elvégzéséhez szükséges idő között?',
    options: [
      'Nem, mert több munkás kevesebb idő alatt végez (ez fordított arányosság)',
      'Igen, mert ha több munkás van, több munkát tudnak elvégezni',
      'Igen, mert mindkét adat órában vagy főben mérhető',
      'Nem, mert a munkások száma és az idő között nincs semmilyen kapcsolat'
    ],
    correctAnswer: 0,
    hint: 'Ha kétszer annyi munkás dolgozik, kétszer annyi vagy feleannyi idő kell?',
    explanation: 'Ha kétszer annyian dolgoznak (8 munkás), feleannyi idő (3 óra) alatt készülnek el. Ez FORDÍTOTT arányosság, nem egyenes!'
  },
  {
    id: 'dp-q28',
    level: 3,
    question: 'Egy vonat egyenletes sebességgel haladva 45 perc alatt 60 km utat tesz meg. Hány kilométert tesz meg 2 óra (120 perc) alatt?',
    options: ['160 km', '150 km', '180 km', '140 km'],
    correctAnswer: 0,
    hint: '45 perc alatt 60 km, tehát 15 perc alatt 20 km. A 120 perc = 8 · 15 perc!',
    explanation: '15 perc (a 45 perc harmada) alatt: 60 km : 3 = 20 km. 120 perc alatt: (120 : 15) · 20 km = 8 · 20 km = 160 km.'
  },
  {
    id: 'dp-q29',
    level: 3,
    question: 'Egy süteményrecept 4 adaghoz 30 dkg lisztet és 20 dkg vajat ír elő. Mennyi liszt és vaj kell 6 adaghoz?',
    options: [
      '45 dkg liszt és 30 dkg vaj',
      '40 dkg liszt és 25 dkg vaj',
      '50 dkg liszt és 35 dkg vaj',
      '60 dkg liszt és 40 dkg vaj'
    ],
    correctAnswer: 0,
    hint: 'A 6 adag a 4 adagnak a másfélszerese (6 : 4 = 1,5). Szorozz 1,5-del!',
    explanation: 'Az adagszorzó: 6 / 4 = 1,5. Liszt: 30 dkg · 1,5 = 45 dkg. Vaj: 20 dkg · 1,5 = 30 dkg.'
  },
  {
    id: 'dp-q30',
    level: 3,
    question: 'Egy személyautó sebességét 50 km/h-ról 100 km/h-ra (kétszeresére) növeljük száraz aszfalton. Egyenesen arányosan nő-e a féktávolság?',
    options: [
      'Nem, mert a féktávolság a sebesség négyzetével arányos, így kétszeres sebességnél kb. négyszeres a fékút',
      'Igen, mert kétszer akkora sebességnél pontosan kétszer akkora utat tesz meg a megállásig',
      'Igen, mert a sebesség és az út között mindig egyenes arányosság van',
      'Nem, mert a sebesség növekedésével a fékút mindig lerövidül'
    ],
    correctAnswer: 0,
    hint: 'A fizika törvényei szerint a mozgási energia a sebesség négyzetével arányos: E = 1/2 · m · v².',
    explanation: 'A fékút a sebesség négyzetével (v²) arányos a fizika törvényei szerint. Ha a sebesség megduplázódik, a fékút nem a 2-szeresére, hanem 2² = 4-szeresére nő!'
  }
];

export const DirectProportionQuiz: React.FC<DirectProportionQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId="g6-direct-prop"
      topicTitle="Egyenes arányosság"
      title="Egyenes arányosság kvíz"
      subtitle="Összetartozó mennyiségek, egységre való visszavezetés, állandó hányados 3 szinten"
      emoji="⚖️"
      themeColor="amber"
      topicBadge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      badgeText="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      cheatSheetTitle="Szabálytár és Képlettár"
      cheatSheet={directProportionCheatSheetContent}
      cheatSheetCards={[
        {
          title: 'Egyenes arányosság',
          formula: 'y = k · x',
          explanation: 'Ha az egyik mennyiség n-szeresére változik, a másik is n-szeresére változik.'
        },
        {
          title: 'Állandó hányados',
          formula: 'y / x = k',
          explanation: 'Az összetartozó mennyiségek hányadosa állandó szám, ez az arányossági tényező (egységár).'
        },
        {
          title: 'Következtetés egységre',
          formula: '1 egység = Összeg / Darab',
          explanation: 'Először osztással meghatározzuk 1 egység értékét, majd szorzással a keresett mennyiséget.'
        },
        {
          title: 'Gyakori csapdák',
          formula: 'T = a² (nem egyenes!)',
          explanation: 'A négyzet területe az oldal négyzetével arányos. A munkások száma és az idő fordított arányosság.'
        }
      ]}
      questions={directProportionQuestions}
      matcherComponent={DirectProportionMatcher}
      sorterComponent={DirectProportionSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DirectProportionQuiz;
