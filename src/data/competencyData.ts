export type CompetencyTaskType = 'multiple-choice' | 'number-input' | 'true-false' | 'matching' | 'multi-true-false' | 'multi-choice' | 'gap-fill';

export interface CompetencyTask {
  id: string;
  type: CompetencyTaskType;
  context?: string;
  tableData?: string[][];
  question: string;
  options?: string[];
  correctAnswer: any;
  pairs?: { left: string; right: any; id: string }[];
 pieces?: { id: string; image: string; rotation: number }[];
  hint?: string;
  points: number;
  image?: string;
  gap_template?: string;
}

export interface MonthlyCompetency {
  id: string;
  name: string;
  topic: string;
  tasks: CompetencyTask[];
}

const GRADE_4_DATA: MonthlyCompetency[] = [
  {
    id: 'september',
    name: 'Szeptember',
    topic: 'Év eleji ismétlés - Az iskola kezdete',
    tasks: [
      { id: 'sep-1', type: 'number-input', context: 'Az iskolakezdés előtt az osztály kirándulni ment az állatkertbe. A jegypénztárnál az alábbi tábla állt:', tableData: [['Jegy típus', 'Ár (Ft)'], ['Gyerek', '1200'], ['Felnőtt', '2500'], ['Csoportos', '1000']], question: 'Ha 10 gyerek és 2 felnőtt kísérő megy, összesen hány forintba kerülnek csak a gyerekjegyek?', correctAnswer: 12000, points: 1 },
      { id: 'sep-2', type: 'multiple-choice', context: 'Az állatkertben az egyik elefánt súlya 4587 kg. A gondozó kerekítve vezeti be a naplójába.', question: 'Melyik a súly százasokra kerekített értéke?', options: ['4500 kg', '4580 kg', '4600 kg', '5000 kg'], correctAnswer: 2, points: 1 },
      { id: 'sep-3', type: 'number-input', context: 'A majomházban 345 banánt kaptak reggel, és 218-at délután a majmok.', question: 'Hány banánt ettek meg összesen ezen a napon?', correctAnswer: 563, points: 1 },
      { id: 'sep-4', type: 'number-input', context: 'Az iskolai büfében a gyerekek tízórait vettek. Peti 800 forinttal indult el otthonról, és egy szendvics 364 forintba került.', question: 'Hány forintja maradt Petinek a vásárlás után?', correctAnswer: 436, points: 1 },
      { id: 'sep-5', type: 'multiple-choice', context: 'A tornaterem hossza 4 méter és még 5 centiméter az egyik ugrásnál.', question: 'Hány centiméter ez összesen?', options: ['45 cm', '405 cm', '450 cm', '4005 cm'], correctAnswer: 1, points: 1 },
      { id: 'sep-6', type: 'number-input', context: 'A suliból hazafelé Emi és a barátai vettek egy-egy gombóc fagyit. Egy gombóc ára 150 Ft. Emi három gombócot kért.', question: 'Mennyit fizetett Emi összesen?', correctAnswer: 450, points: 1 },
      { id: 'sep-7', type: 'matching', context: 'Párosítsd a szorzásokat az eredményükkel!', question: 'Párosíts!', pairs: [{ id: 'p1', left: '7 * 8', right: '56' }, { id: 'p2', left: '6 * 9', right: '54' }, { id: 'p3', left: '4 * 12', right: '48' }], correctAnswer: null, points: 1 },
      { id: 'sep-8', type: 'true-false', question: 'Igaz vagy Hamis? A 678 páros szám.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'sep-9', type: 'number-input', context: 'A kertben a virágok sorba vannak ültetve: 120, 150, 180, ... látható a távolság centiméterben.', question: 'Mi a következő szám a sorozatban?', correctAnswer: 210, points: 1 },
      { id: 'sep-10', type: 'multiple-choice', context: 'Történelem órán a római számokat ismételjük.', question: 'Melyik római szám jelöli a 90-et?', options: ['LXXXX', 'XC', 'CX', 'IC'], correctAnswer: 1, points: 1 }
    ]
  },
  {
    id: 'october',
    name: 'Október',
    topic: 'Számfogalom 10 000-ig',
    tasks: [
      { id: 'oct-1', type: 'number-input', context: 'Az almáskertben 4523 kg almát szüreteltek le.', question: 'Hány teljes 100 kg-os láda tölthető meg ebből?', correctAnswer: 45, points: 1 },
      { id: 'oct-2', type: 'multiple-choice', context: 'Négy teherautó súlya: 4509 kg, 4591 kg, 4099 kg, 4901 kg.', question: 'Melyik a legnehezebb?', options: ['4509 kg', '4591 kg', '4099 kg', '4901 kg'], correctAnswer: 3, points: 1 },
      { id: 'oct-3', type: 'number-input', context: 'Egy falu lakossága 6789 fő.', question: 'Kerekítsd tizesekre!', correctAnswer: 6790, points: 1 },
      { id: 'oct-4', type: 'number-input', question: 'Négyezer-hatvankettő számjegyekkel?', correctAnswer: 4062, points: 1 },
      { id: 'oct-5', type: 'multiple-choice', context: 'A 7450 tízes szomszédai.', question: 'Melyik a kisebb tízes szomszéd?', options: ['7440', '7449', '7445', '7400'], correctAnswer: 0, points: 1 },
      { id: 'oct-6', type: 'number-input', context: '7000 forintot vettünk fel ezresekben.', question: 'Hány bankjegyet kaptunk?', correctAnswer: 7, points: 1 },
      { id: 'oct-7', type: 'matching', context: 'Kerekítés százasokra.', question: 'Párosíts!', pairs: [{ id: 'p1', left: '1245', right: '1200' }, { id: 'p2', left: '1251', right: '1300' }, { id: 'p3', left: '1299', right: '1300' }], correctAnswer: null, points: 1 },
      { id: 'oct-8', type: 'true-false', question: 'A 10 000 a legkisebb ötjegyű szám.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'oct-9', type: 'number-input', context: 'Kártyák: 3, 0, 8, 1.', question: 'Legkisebb négyjegyű szám?', correctAnswer: 1038, points: 1 },
      { id: 'oct-10', type: 'multiple-choice', context: 'Sorozat: 3400, 3450, ..., 3550.', question: 'Hiányzó szám?', options: ['3460', '3500', '3510', '3490'], correctAnswer: 1, points: 1 }
    ]
  },
  {
    id: 'november',
    name: 'November',
    topic: 'Írásbeli összeadás és kivonás',
    tasks: [
      { id: 'nov-1', type: 'number-input', context: 'Adomány: 4567 Ft és 1232 Ft.', question: 'Összesen hány forint?', correctAnswer: 5799, points: 1 },
      { id: 'nov-2', type: 'number-input', context: 'Raktár: 8765 kg, elvittek 4321 kg-ot.', question: 'Mennyi maradt?', correctAnswer: 4444, points: 1 },
      { id: 'nov-3', type: 'number-input', question: '3456 + 2789 = ?', correctAnswer: 6245, points: 1 },
      { id: 'nov-4', type: 'number-input', context: 'Futás: 6000 m-ből megvan 2456 m.', question: 'Hány méter van hátra?', correctAnswer: 3544, points: 1 },
      { id: 'nov-5', type: 'multiple-choice', context: 'Konzerv: 1450 és 1280.', question: 'Összesen?', options: ['2630', '2730', '2830', '2530'], correctAnswer: 1, points: 1 },
      { id: 'nov-6', type: 'number-input', context: 'Cél 5000 Ft, van 2345 Ft.', question: 'Mennyi hiányzik?', correctAnswer: 2655, points: 1 },
      { id: 'nov-7', type: 'matching', context: 'Becslés százasokra.', question: 'Párosíts!', pairs: [{ id: 'p1', left: '1234 + 456', right: '1700' }, { id: 'p2', left: '2345 - 1120', right: '1200' }, { id: 'p3', left: '999 + 999', right: '2000' }], correctAnswer: null, points: 1 },
      { id: 'nov-8', type: 'true-false', question: 'Ha az egyik tagot növelem 100-zal, az összeg is nő 100-zal.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'nov-9', type: 'number-input', context: '456 felnőtt + 389 gyerek.', question: 'Összesen?', correctAnswer: 845, points: 1 },
      { id: 'nov-10', type: 'multiple-choice', options: ['4500-1200', '1200+1200', '6000-4000', '800+1800'], question: 'Legkisebb eredmény?', correctAnswer: 2, points: 1 }
    ]
  },
  { id: 'december', name: 'December', topic: 'Szorzás és osztás', tasks: [
    { id: 'dec-1', type: 'number-input', context: '40 csomag, benne 7-7 szaloncukor.', question: 'Összesen?', correctAnswer: 280, points: 1 },
    { id: 'dec-2', type: 'number-input', context: '450 süti, 9 asztal.', question: 'Asztalonként?', correctAnswer: 50, points: 1 },
    { id: 'dec-3', type: 'number-input', context: '4 doboz, 120 izzó fejenként.', question: 'Összesen?', correctAnswer: 480, points: 1 },
    { id: 'dec-4', type: 'number-input', context: '720 hógolyó, 80 csapat.', question: 'Csapatonként?', correctAnswer: 9, points: 1 },
    { id: 'dec-5', type: 'multiple-choice', context: '12 dísz/doboz, 6 doboz.', question: 'Összesen?', options: ['60', '72', '84', '96'], correctAnswer: 1, points: 1 },
    { id: 'dec-6', type: 'number-input', context: '450 Ft-ért hány 5 Ft-os angyalka vehető?', question: 'Darabszám?', correctAnswer: 90, points: 1 },
    { id: 'dec-7', type: 'matching', question: 'Párosíts!', pairs: [{ id: '1', left: '150*2', right: '300' }, { id: '2', left: '900:3', right: '300' }, { id: '3', left: '60*5', right: '300' }], correctAnswer: null, points: 1 },
    { id: 'dec-8', type: 'true-false', question: 'Bármit 0-val szorozva 0 az eredmény.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'dec-9', type: 'number-input', question: 'Melyik szám * 6 = 480?', correctAnswer: 80, points: 1 },
    { id: 'dec-10', type: 'multiple-choice', context: '4 alma 200 Ft.', question: '10 alma?', options: ['400 Ft', '500 Ft', '600 Ft', '450 Ft'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'january', name: 'Január', topic: 'Írásbeli műveletek', tasks: [
    { id: 'jan-1', type: 'number-input', context: '4 csapat * 342 fő.', question: 'Összesen?', correctAnswer: 1368, points: 1 },
    { id: 'jan-2', type: 'number-input', context: '6 futam * 125 fő.', question: 'Összesen?', correctAnswer: 750, points: 1 },
    { id: 'jan-3', type: 'number-input', context: '844 korong / 4 suli.', question: 'Sulinként?', correctAnswer: 211, points: 1 },
    { id: 'jan-4', type: 'number-input', context: '455 takaró / 5 sátor.', question: 'Sátoronként?', correctAnswer: 91, points: 1 },
    { id: 'jan-5', type: 'multiple-choice', context: '5 * 125 kg jég.', question: 'Összesen?', options: ['625 kg', '525 kg', '725 kg', '600 kg'], correctAnswer: 0, points: 1 },
    { id: 'jan-6', type: 'number-input', question: '300 : 6 = ?', correctAnswer: 50, points: 1 },
    { id: 'jan-7', type: 'matching', question: 'Párosíts!', pairs: [{ id: '1', left: '13:4', right: '1' }, { id: '2', left: '26:5', right: '1' }, { id: '3', left: '19:3', right: '1' }], correctAnswer: null, points: 1 },
    { id: 'jan-8', type: 'true-false', question: 'X : 1 = X minden számra.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'jan-9', type: 'number-input', question: 'X : 7 = 40, maradék 2. Mi az X?', correctAnswer: 282, points: 1 },
    { id: 'jan-10', type: 'multiple-choice', question: '234 * 10 = ?', options: ['234', '2340', '23400', '23.4'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'february', name: 'Február', topic: 'Törtek', tasks: [
    { id: 'feb-1', type: 'multiple-choice', question: 'Melyik a fél?', options: ['1/1', '1/4', '1/2', '3/4'], correctAnswer: 2, points: 1 },
    { id: 'feb-2', type: 'multiple-choice', question: 'Melyik a háromnegyed?', options: ['1/3', '3/4', '4/3', '1/4'], correctAnswer: 1, points: 1 },
    { id: 'feb-3', type: 'number-input', question: 'Hány negyed egy egész?', correctAnswer: 4, points: 1 },
    { id: 'feb-4', type: 'multiple-choice', question: 'Hány tized egy egész?', options: ['1', '10', '100', '5'], correctAnswer: 1, points: 1 },
    { id: 'feb-5', type: 'multiple-choice', question: '20 fele?', options: ['5', '10', '15', '2'], correctAnswer: 1, points: 1 },
    { id: 'feb-6', type: 'number-input', question: '24 negyede?', correctAnswer: 6, points: 1 },
    { id: 'feb-7', type: 'matching', question: 'Párosíts!', pairs: [{ id: '1', left: '1/2', right: '0,5' }, { id: '2', left: '1/10', right: '0,1' }, { id: '3', left: '5/10', right: '0,5' }], correctAnswer: null, points: 1 },
    { id: 'feb-8', type: 'true-false', question: '1/4 > 1/2', options: ['Igaz', 'Hamis'], correctAnswer: 1, points: 1 },
    { id: 'feb-9', type: 'multiple-choice', question: '8 szeletből 2 szelet?', options: ['1/2', '1/4', '1/8', '2/4'], correctAnswer: 1, points: 1 },
    { id: 'feb-10', type: 'number-input', question: '4 negyedből 3 megeszünk. Marad?', correctAnswer: 1, points: 1 }
  ]},
  { id: 'march', name: 'Március', topic: 'Geometria', tasks: [
    { id: 'mar-1', type: 'multiple-choice', question: '4 egyenlő oldal, 4 derékszög?', options: ['Téglalap', 'Négyzet', 'Háromszög', 'Kör'], correctAnswer: 1, points: 1 },
    { id: 'mar-2', type: 'number-input', question: 'Hány oldala van az ötszögnek?', correctAnswer: 5, points: 1 },
    { id: 'mar-3', type: 'number-input', context: 'Négyzet oldala 5 m.', question: 'Kerület?', correctAnswer: 20, points: 1 },
    { id: 'mar-4', type: 'multiple-choice', question: '6 négyzet alapú lap?', options: ['Téglatest', 'Kocka', 'Gömb', 'Henger'], correctAnswer: 1, points: 1 },
    { id: 'mar-5', type: 'number-input', question: 'Kocka csúcsainak száma?', correctAnswer: 8, points: 1 },
    { id: 'mar-6', type: 'number-input', context: 'Téglalap: 4 cm és 6 cm.', question: 'Kerület?', correctAnswer: 20, points: 1 },
    { id: 'mar-7', type: 'matching', question: 'Párosíts!', pairs: [{ id: '1', left: 'Párhuzamos', right: '||' }, { id: '2', left: 'Merőleges', right: '⊥' }, { id: '3', left: 'Mili', right: 'mm' }], correctAnswer: null, points: 1 },
    { id: 'mar-8', type: 'true-false', question: 'A körnek nincsenek csúcsai.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'mar-9', type: 'number-input', question: 'Téglatest éleinek száma?', correctAnswer: 12, points: 1 },
    { id: 'mar-10', type: 'multiple-choice', question: 'Melyik NEM síkidom oldal?', options: ['Szakasz', 'Görbe', 'Törött', 'Pont'], correctAnswer: 3, points: 1 }
  ]},
  { id: 'april', name: 'Április', topic: 'Mérések', tasks: [
    { id: 'apr-1', type: 'number-input', question: '3 m = ? cm', correctAnswer: 300, points: 1 },
    { id: 'apr-2', type: 'multiple-choice', question: '1 kg vas vs 1 kg toll?', options: ['Vas', 'Toll', 'Egyforma', '?'], correctAnswer: 2, points: 1 },
    { id: 'apr-3', type: 'number-input', question: '2 kg = ? dkg', correctAnswer: 200, points: 1 },
    { id: 'apr-4', type: 'number-input', question: '5 l = ? dl', correctAnswer: 50, points: 1 },
    { id: 'apr-5', type: 'multiple-choice', question: 'Medence űrtartalma?', options: ['ml', 'dl', 'l', 'kg'], correctAnswer: 2, points: 1 },
    { id: 'apr-6', type: 'number-input', question: '5 * 10 dkg = ? dkg', correctAnswer: 50, points: 1 },
    { id: 'apr-7', type: 'matching', question: 'Átváltás', pairs: [{ id: '1', left: '1 km', right: '1000 m' }, { id: '2', left: '1 m', right: '100 cm' }, { id: '3', left: '1 dm', right: '10 cm' }], correctAnswer: null, points: 1 },
    { id: 'apr-8', type: 'true-false', question: '750 ml > 1 l', options: ['Igaz', 'Hamis'], correctAnswer: 1, points: 1 },
    { id: 'apr-9', type: 'number-input', question: '0,5 kg = ? g', correctAnswer: 500, points: 1 },
    { id: 'apr-10', type: 'multiple-choice', question: 'Mivel mérjük a kerítést?', options: ['Mérleg', 'Mérőszalag', 'Mérőpohár', 'Óra'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'may', name: 'Május', topic: 'Logika', tasks: [
    { id: 'may-1', type: 'multiple-choice', question: 'Sorrend: Piros, Kék.', options: ['1', '2', '3', '4'], correctAnswer: 1, points: 1 },
    { id: 'may-2', type: 'number-input', question: 'Peti v Kati. Hányféle?', correctAnswer: 2, points: 1 },
    { id: 'may-3', type: 'multiple-choice', context: '3 piros, 2 kék lufi.', question: 'Esélyesebb?', options: ['Piros', 'Kék', 'Egyforma', '?'], correctAnswer: 0, points: 1 },
    { id: 'may-4', type: 'number-input', context: 'Eső: 5, 3, 4 nap.', question: 'Összesen?', correctAnswer: 12, points: 1 },
    { id: 'may-5', type: 'multiple-choice', context: 'Minden kutya állat. Bodri kutya.', question: 'Bodri...?', options: ['Macska', 'Állat', 'Ember', '?'], correctAnswer: 1, points: 1 },
    { id: 'may-6', type: 'number-input', question: 'Kétjegyűek 1, 2-ből?', correctAnswer: 4, points: 1 },
    { id: 'may-7', type: 'matching', question: 'Esély', pairs: [{ id: '1', left: 'Nap felkel', right: 'Biztos' }, { id: '2', left: 'Jövő héten esik', right: 'Lehetséges' }, { id: '3', left: '2+2=5', right: 'Lehetetlen' }], correctAnswer: null, points: 1 },
    { id: 'may-8', type: 'true-false', question: 'Statisztika segít látni az adatokat.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'may-9', type: 'number-input', context: '130, 140, 135, 145 cm.', question: 'Legmagasabb?', correctAnswer: 145, points: 1 },
    { id: 'may-10', type: 'multiple-choice', question: '2 kockás összeg esély?', options: ['6', '11', '12', '36'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'june', name: 'Június', topic: 'Ismétlés', tasks: [
    { id: 'jun-1', type: 'number-input', question: '5000 + 4000 = ?', correctAnswer: 9000, points: 1 },
    { id: 'jun-2', type: 'multiple-choice', options: ['999', '1001', '1010', '9099'], question: 'Legnagyobb?', correctAnswer: 3, points: 1 },
    { id: 'jun-3', type: 'number-input', question: '0,5 m = ? cm', correctAnswer: 50, points: 1 },
    { id: 'jun-4', type: 'number-input', question: '150 * 2 = ?', correctAnswer: 300, points: 1 },
    { id: 'jun-5', type: 'multiple-choice', question: '3 oldala van?', options: ['Négyzet', 'Háromszög', 'Kör', 'Pont'], correctAnswer: 1, points: 1 },
    { id: 'jun-6', type: 'number-input', question: '120 perc = ? óra', correctAnswer: 2, points: 1 },
    { id: 'jun-7', type: 'matching', question: 'Párosíts!', pairs: [{ id: '1', left: '20*5', right: '100' }, { id: '2', left: '400:4', right: '100' }, { id: '3', left: '1000:10', right: '100' }], correctAnswer: null, points: 1 },
    { id: 'jun-8', type: 'true-false', question: 'Vége a 4. osztálynak!', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'jun-9', type: 'number-input', question: '10 kutya * 4 láb?', correctAnswer: 40, points: 1 },
    { id: 'jun-10', type: 'multiple-choice', question: 'Szuper vagy!', options: ['OK', 'Boldog', 'Okos', 'Igen'], correctAnswer: 3, points: 1 }
  ]}
];

const GRADE_5_DATA: MonthlyCompetency[] = [
  {
    id: 'september',
    name: 'Szeptember',
    topic: 'Ismétlés és Számfogalom 1 000 000-ig',
    tasks: [
      { id: 'g5-sep-1', type: 'number-input', image: '🎒', context: 'Az új tanév kezdetén az iskolai raktárba hatalmas szállítmány érkezett. A jegyzőkönyv szerint a füzetek száma pontosan négyszázezer-hetvenkettő volt.', question: 'Írd le ezt a számot számjegyekkel!', correctAnswer: 400072, points: 1 },
      { id: 'g5-sep-2', type: 'multiple-choice', image: '🏙️', context: 'Egy nagyváros statisztikai adatai szerint a lakosság száma 845 236 főre nőtt a nyár végére.', question: 'Melyik számjegy áll a tízezresek helyiértékén?', options: ['4', '5', '8', '2'], correctAnswer: 0, points: 1 },
      { id: 'g5-sep-3', type: 'number-input', image: '🪙', context: 'A múzeumban egy régi kincsesládát találtak, amiben 345 600 darab aranypénz volt. A restaurátorok a számot tízezresekre kerekítve jelentették be.', question: 'Mennyi a kincsek számának tízezresekre kerekített értéke?', correctAnswer: 350000, points: 1 },
      { id: 'g5-sep-4', type: 'multiple-choice', image: '🚀', context: 'Egy űrszonda 708 045 km-t tett meg az első héten a Mars felé vezető úton.', question: 'Melyik a 8-as számjegy alaki értéke ebben a számban?', options: ['8000', '8', '800', '80'], correctAnswer: 1, points: 1 },
      { id: 'g5-sep-5', type: 'true-false', image: '🔢', context: 'Matek órán a páros és páratlan számok tulajdonságait vizsgáljuk.', question: 'Igaz vagy Hamis? A 456 000 egy páros szám.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'g5-sep-6', type: 'number-input', image: '🧱', context: 'A számokat helyiértékek szerint is felépíthetjük: 3 * 100 000 + 4 * 10 000 + 5 * 1000 + 2 * 10.', question: 'Melyik számot kapjuk meg, ha összeadjuk ezeket az értékeket?', correctAnswer: 345020, points: 1 },
      { id: 'g5-sep-7', type: 'matching', image: '🏛️', context: 'A történelem könyvben római számokkal jelölik a fejezeteket. Párosítsd a betűket az értékükkel!', question: 'Párosítsd össze!', pairs: [{ id: 'p1', left: 'D', right: '500' }, { id: 'p2', left: 'M', right: '1000' }, { id: 'p3', left: 'C', right: '100' }], correctAnswer: null, points: 1 },
      { id: 'g5-sep-8', type: 'multiple-choice', image: '↔️', context: 'A számegyenesen a 45 600-as számnál állunk és a szomszédos tízeseket keressük.', question: 'Melyik a 45 600 nagyobbik tízes szomszédja?', options: ['45 610', '45 590', '45 700', '46 000'], correctAnswer: 0, points: 1 },
      { id: 'g5-sep-9', type: 'number-input', image: '📦', context: 'Egy raktárban 456 789 darab tollat csomagoltak tízezresével nagyobb dobozokba.', question: 'Hány teljes tízezres csoport (tízezres egység) van ebben a számban?', correctAnswer: 45, points: 1 },
      { id: 'g5-sep-10', type: 'true-false', image: '🌌', context: 'A tanárnő feltett egy izgalmas kérdést a világegyetemről és a számokról.', question: 'Igaz vagy Hamis? A természetes számok halmaza végtelen.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 }
    ]
  },
  {
    id: 'october',
    name: 'Október',
    topic: 'Műveletek természetes számokkal',
    tasks: [
      { id: 'g5-oct-1', type: 'number-input', image: '🌾', context: 'Aratáskor a gazdaságba 45 600 kg búza és 12 450 kg árpa érkezett a teherautókon.', question: 'Összesen hány kilogramm gabonát kell a magtárba behordani?', correctAnswer: 58050, points: 1 },
      { id: 'g5-oct-2', type: 'number-input', image: '🚗', context: 'Egy új családi autó ára 8 765 000 Ft volt, de az őszi akció keretében 450 000 Ft kedvezményt kaptak rá.', question: 'Mennyit fizetett a család az autóért?', correctAnswer: 8315000, points: 1 },
      { id: 'g5-oct-3', type: 'multiple-choice', image: '🍎', context: 'A zöldségesnél 4500 rekesz alma van, minden rekeszben 20 darab szép piros alma lapul.', question: 'Hány darab alma van összesen a rekeszekben?', options: ['9000', '90 000', '900 000', '45 020'], correctAnswer: 1, points: 1 },
      { id: 'g5-oct-4', type: 'number-input', image: '🍬', context: 'Egy cukorkagyárban 8400 darab savanyúcukrot gyártottak, amit 40 darabos zacskókba kell csomagolni.', question: 'Hány zacskót tudnak teljesen megtölteni?', correctAnswer: 210, points: 1 },
      { id: 'g5-oct-5', type: 'true-false', image: '➕', context: 'Peti és Sári azon vitatkoznak, hogy számít-e, milyen sorrendben adják össze a számaikat.', question: 'Igaz vagy Hamis? Az összeadás tagjai felcserélhetőek (kommutatívak).', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'g5-oct-6', type: 'number-input', image: '🤔', context: 'Gondoltam egy számra, elosztottam 10-zel, és az eredmény pontosan 450 lett.', question: 'Melyik számra gondoltam?', correctAnswer: 4500, points: 1 },
      { id: 'g5-oct-7', type: 'matching', image: '🔢', context: 'A matematikában nagyon fontos a műveletek helyes sorrendje. Párosítsd a kifejezéseket a végeredményükkel!', question: 'Párosítsd össze!', pairs: [{ id: 'p1', left: '10 + 5 * 2', right: '20' }, { id: 'p2', left: '(10 + 5) * 2', right: '30' }, { id: 'p3', left: '25 - 10 : 2', right: '20' }], correctAnswer: null, points: 1 },
      { id: 'g5-oct-8', type: 'multiple-choice', image: '🍰', context: 'Egy születésnapi zsúron 45 szelet tortát osztanak szét 7 gyerek között úgy, hogy mindenki ugyanannyit kapjon.', question: 'Hány szelet torta marad meg a végén (mennyi az osztás maradéka)?', options: ['1', '2', '3', '4'], correctAnswer: 2, points: 1 },
      { id: 'g5-oct-9', type: 'number-input', image: '📉', context: 'Egy gyűjtőnek 10 000 darabos bélyeggyűjteménye van, de ebből sajnos 4 567 darab megsérült a költözéskor.', question: 'Hány ép, sértetlen bélyege maradt a gyűjtőnek?', correctAnswer: 5433, points: 1 },
      { id: 'g5-oct-10', type: 'true-false', image: '🚫', context: 'A matekversenyen egy trükkös kérdést tettek fel a nullával való osztásról.', question: 'Igaz vagy Hamis? Bármilyen természetes számot el szabad osztani 0-val.', options: ['Igaz', 'Hamis'], correctAnswer: 1, points: 1 }
    ]
  },
  {
    id: 'november',
    name: 'November',
    topic: 'Oszthatóság és Geometria bevezetés',
    tasks: [
      { id: 'g5-nov-1', type: 'multiple-choice', image: '🖐️', context: 'A tízóraihoz keresünk olyan csomagokat, amiket 5 fős csoportok között pontosan szét lehet osztani.', question: 'Melyik szám osztható biztosan 5-tel?', options: ['456', '780', '124', '333'], correctAnswer: 1, points: 1 },
      { id: 'g5-nov-2', type: 'true-false', image: '3️⃣', context: 'A 3-mal való oszthatóság szabályát teszteljük a számjegyek összeadásával.', question: 'Igaz vagy Hamis? A 345 osztható 3-mal.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'g5-nov-3', type: 'number-input', image: '💎', context: 'A prímszámok olyan különleges számok, amiknek csak két osztójuk van (1 és önmaguk).', question: 'Melyik a legkisebb kétjegyű prímszám?', correctAnswer: 11, points: 1 },
      { id: 'g5-nov-4', type: 'multiple-choice', image: '📍', context: 'A füzetedben kijelöltél két távoli pontot és szeretnél rajtuk keresztül egyetlen egyenest húzni.', question: 'Hány különböző egyenes fektethető pontosan két adott pontra?', options: ['0', '1', '2', 'Végtelen'], correctAnswer: 1, points: 1 },
      { id: 'g5-nov-5', type: 'number-input', image: '📏', context: 'A technika órán egy 45 centiméter hosszú falécet kell milliméterben lemérni.', question: 'Hány milliméter hosszú ez a léc?', correctAnswer: 450, points: 1 },
      { id: 'g5-nov-6', type: 'true-false', image: '🛤️', context: 'A vasúti sínek úgy futnak egymás mellett, hogy sosem találkoznak.', question: 'Igaz vagy Hamis? Két párhuzamos egyenes síkbeli távolsága mindenhol ugyanakkora, így sosem metszik egymást.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
      { id: 'g5-nov-7', type: 'matching', image: '✏️', context: 'A mértani rajzokon különböző jeleket használunk. Párosítsd a jeleket a jelentésükkel!', question: 'Párosítsd össze!', pairs: [{ id: 'p1', left: '||', right: 'Párhuzamos' }, { id: 'p2', left: '⊥', right: 'Merőleges' }, { id: 'p3', left: 'AB', right: 'Szakasz' }], correctAnswer: null, points: 1 },
      { id: 'g5-nov-8', type: 'number-input', image: '📐', context: 'A falióra mutatói pontosan 3 órakor egy 90 fokos szöget zárnak be egymással.', question: 'Hogy hívjuk a 90 fokos szöget? (Írd le a nevét!)', correctAnswer: 'derékszög', points: 1 },
      { id: 'g5-nov-9', type: 'multiple-choice', image: '🔟', context: 'A páros számok mindig oszthatóak 2-vel maradék nélkül.', question: 'Melyik szám osztható 2-vel az alábbiak közül?', options: ['123', '457', '888', '11'], correctAnswer: 2, points: 1 },
      { id: 'g5-nov-10', type: 'number-input', image: '🤝', context: 'Két barát, a 12 és a 18 keresik a legnagyobb közös osztójukat, ami mindkettőjüket maradék nélkül osztja.', question: 'Mennyi a 12 és 18 legnagyobb közös osztója (LNKO)?', correctAnswer: 6, points: 1 }
    ]
  },
  { id: 'december', name: 'December', topic: 'Törtek bevezetése', tasks: [
    { id: 'g5-dec-1', type: 'multiple-choice', image: '🍕', context: 'Egy egész pizzát felszeleteltünk. Szeretnénk tudni, melyik tört jelenti pontosan az egész pizzát.', question: 'Melyik tört értéke pontosan 1 egész?', options: ['1/2', '4/4', '3/4', '0/1'], correctAnswer: 1, points: 1 },
    { id: 'g5-dec-2', type: 'number-input', image: '🍫', context: 'A Mikulás csomagjában 24 darab csoki volt, de a gyerekek már megették a csokik háromnegyed (3/4) részét.', question: 'Hány darab csokit ettek meg összesen?', correctAnswer: 18, points: 1 },
    { id: 'g5-dec-3', type: 'multiple-choice', image: '🥧', context: 'Egy receptben egy bizonyos törtet kell használni, aminek a nevezője 5, a számlálója pedig 2.', question: 'Melyik törtet keressük?', options: ['5/2', '2/5', '7/5', '1/5'], correctAnswer: 1, points: 1 },
    { id: 'g5-dec-4', type: 'true-false', image: '📏', context: 'Két azonos méretű tortát hasonlítunk össze: az egyiknek a 2/5 részét, a másiknak a 4/5 részét esszük meg.', question: 'Igaz vagy Hamis? A 2/5 kisebb, mint a 4/5.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-dec-5', type: 'number-input', image: '🍰', context: 'Egy tortát hat egyenlő részre vágtunk fel a vendégeknek.', question: 'Hány darab hatod rész kell ahhoz, hogy újra megkapjuk az egész tortát?', correctAnswer: 6, points: 1 },
    { id: 'g5-dec-6', type: 'number-input', image: '🥣', context: 'A reggelihez öntöttünk 1/3 liter tejet, majd később még 1/3 litert töltöttünk hozzá.', question: 'Összesen hány liter tejet öntöttünk? (A választ tört formájában írd be, pl: 2/3)', correctAnswer: '2/3', points: 1 },
    { id: 'g5-dec-7', type: 'matching', image: '⚖️', context: 'A tizedes törtek és a közönséges törtek sokszor ugyanazt az értéket jelentik. Párosítsd őket!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: '0,5', right: '1/2' }, { id: '2', left: '0,1', right: '1/10' }, { id: '3', left: '0,25', right: '1/4' }], correctAnswer: null, points: 1 },
    { id: 'g5-dec-8', type: 'multiple-choice', image: '🥛', context: 'A pohárban kétharmad résznyi narancslé van.', question: 'Melyik matematikai jelölés felel meg a kétharmadnak?', options: ['3/2', '1/3', '2/3', '4/3'], correctAnswer: 2, points: 1 },
    { id: 'g5-dec-9', type: 'number-input', image: '🥧', context: 'Egy pite 8 egyenlő szeletéből már megettek 5 darabot.', question: 'Hányad része maradt meg a pitének? (A választ tört formájában add meg!)', correctAnswer: '3/8', points: 1 },
    { id: 'g5-dec-10', type: 'true-false', image: '📍', context: 'A számegyenesen nem csak egész számokat, hanem törteket is be tudunk jelölni.', question: 'Igaz vagy Hamis? A 1/2 pontosan a 0 és az 1 között féltávon helyezkedik el.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 }
  ]},
  { id: 'january', name: 'Január', topic: 'Tizedes törtek', tasks: [
    { id: 'g5-jan-1', type: 'number-input', image: '☕', context: 'Anna 0,5 liter teát ivott reggel, Juli pedig 0,3 litert a tízóraihoz.', question: 'Hány liter teát ittak meg ketten összesen?', correctAnswer: 0.8, points: 1 },
    { id: 'g5-jan-2', type: 'number-input', image: '🥖', context: 'Egy 1,2 méter hosszú bagettből levágtunk egy 0,4 méteres darabot a szendvicshez.', question: 'Hány méter maradt meg a bagettből?', correctAnswer: 0.8, points: 1 },
    { id: 'g5-jan-3', type: 'multiple-choice', image: '📏', context: 'A mérés során 4,56 cm-t kaptunk, de a jegyzőkönyvbe tizedekre kerekítve kell beírni az adatot.', question: 'Mennyi a 4,56 kerekített értéke tizedekre?', options: ['4,5', '4,6', '5', '4'], correctAnswer: 1, points: 1 },
    { id: 'g5-jan-4', type: 'number-input', image: '📈', context: 'Ha tízszeresére növeljük a 12,5 méteres távolságot az edzésen...', question: 'Mennyi lesz az új távolság? (12,5 * 10)', correctAnswer: 125, points: 1 },
    { id: 'g5-jan-5', type: 'number-input', image: '📉', context: 'Egy 45,6 méter hosszú kötelet 100 egyenlő darabra vágtak szét a kísérlethez.', question: 'Hány méter hosszú egyetlen kis darab? (45,6 : 100)', correctAnswer: 0.456, points: 1 },
    { id: 'g5-jan-6', type: 'true-false', image: '🔍', context: 'Két nagyon kicsi távolságot hasonlítunk össze: az egyik 0,1 mm, a másik 0,09 mm.', question: 'Igaz vagy Hamis? A 0,1 nagyobb, mint a 0,09.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-jan-7', type: 'matching', image: '🔄', context: 'Néhány törtet nagyon gyakran használunk tizedes formában is. Párosítsd őket!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: '1/2', right: '0,5' }, { id: '2', left: '1/4', right: '0,25' }, { id: '3', left: '3/4', right: '0,75' }], correctAnswer: null, points: 1 },
    { id: 'g5-jan-8', type: 'true-false', image: '⚖️', context: 'A tizedes törtek összehasonlításakor figyeljünk a helyiértékekre.', question: 'Igaz vagy Hamis? A 0,5 ugyanaz, mint a 0,50.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-jan-9', type: 'number-input', image: '📐', context: 'Egy rajzlapon 12,3 cm-es vonalat húztunk, majd a tízszeresére nagyítottuk a terven.', question: 'Hány centiméteres az új vonal?', correctAnswer: 123, points: 1 },
    { id: 'g5-jan-10', type: 'multiple-choice', image: '📉', context: 'A tizedes törtek osztásakor a tizedesvessző balra vándorol.', question: 'Mennyi 45,6 osztva 10-zel?', options: ['456', '4,56', '0,456', '45,06'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'february', name: 'Február', topic: 'Kerület és Terület', tasks: [
    { id: 'g5-feb-1', type: 'number-input', image: '🖼️', context: 'Egy festmény 4 méter széles és 5 méter magas. Szeretnénk egy díszes keretet tenni köré.', question: 'Hány méter keretre lesz szükségünk összesen (K=?)?', correctAnswer: 18, points: 1 },
    { id: 'g5-feb-2', type: 'number-input', image: '🧶', context: 'A szoba padlóját teljesen le szeretnénk fedni szőnyeggel. A szoba 4 méter széles és 5 méter hosszú.', question: 'Hány négyzetméter szőnyeget kell vásárolnunk (T=?)?', correctAnswer: 20, points: 1 },
    { id: 'g5-feb-3', type: 'multiple-choice', image: '📏', context: 'A kertben a fűnyíráshoz meg kell mérni a területet a pontos tervezéshez.', question: 'Melyik a terület mértékegysége az alábbiak közül?', options: ['cm', 'kg', 'négyzetcentiméter (cm²)', 'liter'], correctAnswer: 2, points: 1 },
    { id: 'g5-feb-4', type: 'number-input', image: '🔲', context: 'Egy négyzet alakú kert kerítése pontosan 12 méter hosszú.', question: 'Hány méter hosszú a négyzet egyetlen oldala?', correctAnswer: 3, points: 1 },
    { id: 'g5-feb-5', type: 'number-input', image: '🟦', context: 'A padlóburkoláshoz 1 négyzetméternyi területet kell átszámolnunk kisebb egységekre.', question: 'Hány négyzetdeciméter (dm²) van 1 négyzetméterben (m²)?', correctAnswer: 100, points: 1 },
    { id: 'g5-feb-6', type: 'true-false', image: '📑', context: 'A téglalap oldalai közötti kapcsolatokat tanulmányozzuk geometria órán.', question: 'Igaz vagy Hamis? Egy téglalap szemközti oldalai mindig egyenlő hosszúak.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-feb-7', type: 'matching', image: '📐', context: 'A képletek segítenek a gyors számolásban. Párosítsd az alakzatokat a hozzájuk tartozó kerület/terület képlettel!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Téglalap K', right: '2*(a+b)' }, { id: '2', left: 'Téglalap T', right: 'a*b' }, { id: '3', left: 'Négyzet K', right: '4*a' }], correctAnswer: null, points: 1 },
    { id: 'g5-feb-8', type: 'multiple-choice', image: '⚖️', context: 'Két különböző méretű területet akarunk összehasonlítani.', question: 'Melyik terület a nagyobb: 1 m² vagy 100 cm²?', options: ['1 m²', '100 cm²', 'Egyformák', 'Nem összehasonlíthatóak'], correctAnswer: 0, points: 1 },
    { id: 'g5-feb-9', type: 'number-input', image: '🏠', context: 'Egy konyha alaprajza 3 méter széles és 4 méter hosszú.', question: 'Hány négyzetméter járólap kell a konyha padlójára?', correctAnswer: 12, points: 1 },
    { id: 'g5-feb-10', type: 'true-false', image: '🚧', context: 'A kerítés és a telek területe közötti különbséget beszéljük meg.', question: 'Igaz vagy Hamis? A kerület az alakzatot határoló vonal hossza.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 }
  ]},
  { id: 'march', name: 'Március', topic: 'Mértékegységek és Testek', tasks: [
    { id: 'g5-mar-1', type: 'number-input', image: '🏃', context: 'A maratoni futó 1,5 kilométert tett meg a bemelegítés során.', question: 'Hány méternek felel meg ez a távolság?', correctAnswer: 1500, points: 1 },
    { id: 'g5-mar-2', type: 'number-input', image: '⚖️', context: 'A konyhai mérlegen 2,5 kg lisztet mértünk le a süteményekhez.', question: 'Hány gramm lisztet mértünk le összesen?', correctAnswer: 2500, points: 1 },
    { id: 'g5-mar-3', type: 'multiple-choice', image: '🥛', context: 'A tejeskannában pontosan 1 liter tej van.', question: 'Hány deciliter (dl) tej van 1 literben?', options: ['10', '100', '1000', '1'], correctAnswer: 0, points: 1 },
    { id: 'g5-mar-4', type: 'number-input', image: '🧊', context: 'Egy nagy kockát építettünk össze kisebb, 1 cm élű kockákból. Ha a nagy kocka éle 2 cm...', question: 'Hány darab kis kockára volt szükségünk az építéshez?', correctAnswer: 8, points: 1 },
    { id: 'g5-mar-5', type: 'multiple-choice', image: '📦', context: 'Egy papírdobozt vizsgálunk, ami téglatest alakú.', question: 'Hány lapja (oldala) van összesen egy téglatestnek?', options: ['4', '6', '8', '12'], correctAnswer: 1, points: 1 },
    { id: 'g5-mar-6', type: 'number-input', image: '⏲️', context: 'Egy kalandfilm pontosan 3 órán keresztül tartott a moziban.', question: 'Hány percig ültünk a moziteremben?', correctAnswer: 180, points: 1 },
    { id: 'g5-mar-7', type: 'matching', image: '📐', context: 'Minden tulajdonságnak megvan a maga alapmértékegysége. Párosítsd őket!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Hosszúság', right: 'méter (m)' }, { id: '2', left: 'Tömeg', right: 'kilogramm (kg)' }, { id: '3', left: 'Idő', right: 'másodperc (s)' }], correctAnswer: null, points: 1 },
    { id: 'g5-mar-8', type: 'true-false', image: '🎲', context: 'A szabályos testek tulajdonságait nézzük meg, például a kockáét.', question: 'Igaz vagy Hamis? Egy kocka minden éle egyenlő hosszú.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-mar-9', type: 'number-input', image: '☀️', context: 'A Föld egyszer megfordul a tengelye körül, ami pontosan 1 napot vesz igénybe.', question: 'Hány órából áll egy teljes nap?', correctAnswer: 24, points: 1 },
    { id: 'g5-mar-10', type: 'multiple-choice', image: '🌡️', context: 'Betegség esetén fontos tudni, hány fokos a testünk.', question: 'Melyik eszközzel mérjük meg a lázunkat?', options: ['Mérleg', 'Mérőszalag', 'Hőmérő', 'Iránytű'], correctAnswer: 2, points: 1 }
  ]},
  { id: 'april', name: 'Április', topic: 'Arányosság és Statisztika', tasks: [
    { id: 'g5-apr-1', type: 'number-input', image: '🍦', context: 'Anna és Juli elmennek fagyizni. Mindketten szeretik a csokifagyit. Ha 3 gombóc fagylalt pontosan 600 Ft-ba kerül...', question: 'Hány forintba kerül egyetlen gombóc fagyi?', correctAnswer: 200, points: 1 },
    { id: 'g5-apr-2', type: 'number-input', image: '🍦', context: 'Ugyanannál a fagyisnál (ahol 3 gombóc 600 Ft) egy egész család érkezik, és összesen 5 gombócot kérnek.', question: 'Mennyit kell fizetniük az 5 gombócért összesen?', correctAnswer: 1000, points: 1 },
    { id: 'g5-apr-3', type: 'multiple-choice', image: '📊', context: 'Az iskolai felmérés során sok adatot gyűjtöttünk a kedvenc tantárgyakról.', question: 'Mi a legfőbb célja a statisztikai adatok gyűjtésének?', options: ['Zavarás', 'Rendszerezés és elemzés', 'Eltüntetés', 'Szebbé tétel'], correctAnswer: 1, points: 1 },
    { id: 'g5-apr-4', type: 'number-input', image: '📝', context: 'Öt diák matek dolgozatának jegyei: 5, 4, 3, 5, 4.', question: 'Mennyi a jegyek átlaga?', correctAnswer: 4.2, points: 1 },
    { id: 'g5-apr-5', type: 'multiple-choice', image: '📉', context: 'Az eredményeket egy látványos ábrán szeretnénk bemutatni a táblánál.', question: 'Melyik ábrázolási mód elterjedt a statisztikában?', options: ['Oszlopdiagram', 'Virágoskert', 'Házrajz', 'Családfa'], correctAnswer: 0, points: 1 },
    { id: 'g5-apr-6', type: 'true-false', image: '➗', context: 'Az átlagszámítás szabályát próbáljuk felidézni a dolgozat előtt.', question: 'Igaz vagy Hamis? Az átlagot úgy kapjuk meg, hogy az értékek összegét elosztjuk az értékek darabszámával.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-apr-7', type: 'matching', image: '📈', context: 'A statisztikában használt fogalmakat párosítsd a jelentésükkel!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Minimum', right: 'Legkisebb érték' }, { id: '2', left: 'Maximum', right: 'Legnagyobb érték' }, { id: '3', left: 'Átlag', right: 'Számtani közép' }], correctAnswer: null, points: 1 },
    { id: 'g5-apr-8', type: 'number-input', image: '🎲', context: 'Egy szabályos dobókockával dobunk a társasjátékban.', question: 'Hány különböző kimenetele (eredménye) lehet egyetlen dobásnak?', correctAnswer: 6, points: 1 },
    { id: 'g5-apr-9', type: 'multiple-choice', image: '💰', context: 'Ha két kétszer annyi almát veszünk a piacon, akkor az ára is pontosan kétszer annyi lesz.', question: 'Hogy hívjuk ezt az összefüggést?', options: ['Egyenes arányosság', 'Fordított arányosság', 'Változatlanság', 'Ismeretlen'], correctAnswer: 0, points: 1 },
    { id: 'g5-apr-10', type: 'true-false', image: '🖼️', context: 'A grafikonok és diagramok segítséget nyújtanak a számok értelmezésében.', question: 'Igaz vagy Hamis? A diagramok segítenek abban, hogy gyorsan átlássuk az adatok közötti különbségeket.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 }
  ]},
  { id: 'may', name: 'Május', topic: 'Összegzés', tasks: [
    { id: 'g5-may-1', type: 'number-input', image: '🎒', context: 'Két barát összespórolt pénzét adjuk össze a kirándulásra: 678 Ft és 322 Ft.', question: 'Hány forintjuk van összesen?', correctAnswer: 1000, points: 1 },
    { id: 'g5-may-2', type: 'number-input', image: '💸', context: 'Az 1000 forintos bankjegyből kifizettünk egy 456 forintos csokoládét.', question: 'Mennyi visszajárót kaptunk?', correctAnswer: 544, points: 1 },
    { id: 'g5-may-3', type: 'multiple-choice', image: '🎯', context: 'A 4567-es számot ezresekre kell kerekítenünk a gyorsabb becslés érdekében.', question: 'Mennyi a 4567 kerekített értéke ezresekre?', options: ['4000', '5000', '4500', '4600'], correctAnswer: 1, points: 1 },
    { id: 'g5-may-4', type: 'multiple-choice', image: '🔢', context: 'A számok oszthatóságát gyakoroljuk: a számjegyek összegének oszthatónak kell lennie 9-cel.', question: 'Melyik szám osztható 9-cel az alábbiak közül?', options: ['123', '459', '111', '10'], correctAnswer: 1, points: 1 },
    { id: 'g5-may-5', type: 'number-input', image: '⭕', context: 'Egy teljes körívet rajzolunk a körzővel a füzetünkbe.', question: 'Hány fokos egy teljes kör?', correctAnswer: 360, points: 1 },
    { id: 'g5-may-6', type: 'number-input', image: '🔢', context: 'Számítsd ki a következő műveletsor eredményét: 12 : 3 * 2!', question: 'Mennyi az eredmény?', correctAnswer: 8, points: 1 },
    { id: 'g5-may-7', type: 'matching', image: '🧩', context: 'Párosítsd össze a matematikai kifejezéseket az értékükkel!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: '1/2', right: '0,5' }, { id: '2', left: '2 * 5', right: '10' }, { id: '3', left: '100 - 1', right: '99' }], correctAnswer: null, points: 1 },
    { id: 'g5-may-8', type: 'true-false', image: '📐', context: 'A háromszögek belső szögeinek összegét mérjük meg szögmérővel.', question: 'Igaz vagy Hamis? Bármely háromszög belső szögeinek összege pontosan 180 fok.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-may-9', type: 'number-input', image: '🟦', context: 'Egy négyzet oldala pontosan 1 deciméter hosszú.', question: 'Hány centiméter a négyzet kerülete? (Vigyázz a mértékegységre!)', correctAnswer: 40, points: 1 },
    { id: 'g5-may-10', type: 'multiple-choice', image: '🎓', context: 'Hamarosan vége a tanévnek és mindjárt jön a nagy összefoglaló mérő.', question: 'Hogy érzed magad a teszt végén?', options: ['Kicsit elfáradtam', 'Szuperül, sokat tanultam!', 'Még van mit gyakorolni', 'Kész vagyok a szünetre'], correctAnswer: 1, points: 1 }
  ]},
  { id: 'june', name: 'Június', topic: 'Év végi összefoglalás', tasks: [
    { id: 'g5-jun-1', type: 'number-input', image: '🎂', context: 'A suliban 12 lány és 13 fiú jár az osztályba.', question: 'Hányan vannak összesen az osztályban?', correctAnswer: 25, points: 1 },
    { id: 'g5-jun-2', type: 'multiple-choice', image: '🏅', options: ['Semennyit', 'Egy keveset', 'Sokat', 'Mindent megtanultam!'], question: 'Szerinted mennyit fejlődtél idén matematikából?', correctAnswer: 3, points: 1 },
    { id: 'g5-jun-3', type: 'number-input', image: '📅', context: 'A nyári szünet első két hetét a nagymamánál töltjük.', question: 'Hány napig leszünk a nagyinál összesen?', correctAnswer: 14, points: 1 },
    { id: 'g5-jun-4', type: 'number-input', image: '🥛', context: 'Egy kávézóban 10 ember kért 2-2 gombóc fagyit, ami gombóconként 250 Ft-ba került.', question: 'Mennyit fizettek összesen?', correctAnswer: 5000, points: 1 },
    { id: 'g5-jun-5', type: 'multiple-choice', image: '🧱', context: 'A tanult alakzatok közül keresünk egy térbeli testet.', question: 'Melyik az alábbiak közül egy térbeli test?', options: ['Négyzet', 'Kör', 'Kocka', 'Háromszög'], correctAnswer: 2, points: 1 },
    { id: 'g5-jun-6', type: 'number-input', image: '🗓️', context: 'Eltelt egy teljes tanév szeptembertől júniusig.', question: 'Hány hónapból áll összesen egy naptári év?', correctAnswer: 12, points: 1 },
    { id: 'g5-jun-7', type: 'matching', image: '☀️', context: 'Párosítsd a hónapokat a hozzájuk tartozó évszakokkal!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Június', right: 'Nyár' }, { id: '2', left: 'Szeptember', right: 'Ősz' }, { id: '3', left: 'Március', right: 'Tavasz' }], correctAnswer: null, points: 1 },
    { id: 'g5-jun-8', type: 'true-false', image: '🎉', context: 'Végre eljött az utolsó tanítási nap!', question: 'Igaz vagy Hamis? Most már kezdődhet a megérdemelt nyári szünet.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-jun-9', type: 'number-input', image: '🔢', context: 'Egy utolsó gyors számolás: 4 + 5 * 2.', question: 'Mennyi a kifejezés pontos értéke?', correctAnswer: 14, points: 1 },
    { id: 'g5-jun-10', type: 'multiple-choice', image: '🏖️', context: 'Már mindenki a strandolásra és a pihenésre gondol.', question: 'Mit üzensz magadnak jövőre?', options: ['Sokat fogok játszani', 'Folytatom a matekozást', 'Pihenek egy nagyot', 'Mindenre felkészültem!'], correctAnswer: 3, points: 1 }
  ]}
];

const GRADE_6_DATA: MonthlyCompetency[] = [
  {
    "id": "september",
    "name": "Szeptember",
    "topic": "Ismétlés és Számfogalom",
    "tasks": [
      {
        "id": "g6-september-1",
        "type": "number-input",
        "question": "Római számok: Mit ér az MCD?",
        "correctAnswer": 1400,
        "points": 1,
        "image": "🔢",
        "context": "A bankszéf kódjának kinyitásához precíz számolásra van szükség."
      },
      {
        "id": "g6-september-2",
        "type": "number-input",
        "question": "Melyik számjegy áll a százezresek helyén: 1 245 678?",
        "correctAnswer": 2,
        "points": 1,
        "image": "🔢",
        "context": "Az iskolai könyvtárban a régi könyvek leltárba vételekor különleges számokra bukkantunk."
      },
      {
        "id": "g6-september-3",
        "type": "number-input",
        "question": "Kerekíts tízezresekre: 456 789!",
        "correctAnswer": 460000,
        "points": 1,
        "image": "🔢",
        "context": "A városi múzeumban a régészek ókori kódokat próbálnak megfejteni."
      },
      {
        "id": "g6-september-4",
        "type": "number-input",
        "question": "Írd le számjegyekkel: kétmillió-háromezer-öt!",
        "correctAnswer": 2003005,
        "points": 1,
        "image": "🔢",
        "context": "Egy intergalaktikus utazás során a navigációs rendszer hatalmas számokkal dolgozik."
      },
      {
        "id": "g6-september-5",
        "type": "true-false",
        "question": "Igaz vagy hamis: A 0 természetes szám.",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "🔢",
        "context": "A városi múzeumban a régészek ókori kódokat próbálnak megfejteni."
      },
      {
        "id": "g6-september-6",
        "type": "multiple-choice",
        "question": "Melyik a nagyobb?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "12 004",
          "12 040"
        ],
        "image": "🔢",
        "context": "Az iskolai könyvtárban a régi könyvek leltárba vételekor különleges számokra bukkantunk."
      },
      {
        "id": "g6-september-7",
        "type": "matching",
        "question": "Párosítsd össze az értékeket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "10^2",
            "right": "100"
          },
          {
            "id": "2",
            "left": "10^3",
            "right": "1000"
          },
          {
            "id": "3",
            "left": "10^4",
            "right": "10000"
          }
        ],
        "image": "🔢",
        "context": "A bankszéf kódjának kinyitásához precíz számolásra van szükség."
      },
      {
        "id": "g6-september-8",
        "type": "number-input",
        "question": "Legkisebb hétjegyű szám?",
        "correctAnswer": 1000000,
        "points": 1,
        "image": "🔢",
        "context": "A bankszéf kódjának kinyitásához precíz számolásra van szükség."
      },
      {
        "id": "g6-september-9",
        "type": "number-input",
        "question": "999 999 rákövetkező szomszédja?",
        "correctAnswer": 1000000,
        "points": 1,
        "image": "🔢",
        "context": "A bankszéf kódjának kinyitásához precíz számolásra van szükség."
      },
      {
        "id": "g6-september-10",
        "type": "number-input",
        "question": "Mennyi: 4500 + 5500?",
        "correctAnswer": 10000,
        "points": 1,
        "image": "🔢",
        "context": "Egy intergalaktikus utazás során a navigációs rendszer hatalmas számokkal dolgozik."
      }
    ]
  },
  {
    "id": "october",
    "name": "Október",
    "topic": "Műveletek tizedes törtekkel",
    "tasks": [
      {
        "id": "g6-october-1",
        "type": "number-input",
        "question": "Mennyi: 12,4 + 5,32?",
        "correctAnswer": 17.72,
        "points": 1,
        "image": "💸",
        "context": "A laboratóriumban a kutatók hajszálpontos méréseket végeznek."
      },
      {
        "id": "g6-october-2",
        "type": "number-input",
        "question": "Mennyi: 20 - 4,56?",
        "correctAnswer": 15.44,
        "points": 1,
        "image": "💸",
        "context": "A boltban a visszajáró kiszámításakor fontos a tizedesek ismerete."
      },
      {
        "id": "g6-october-3",
        "type": "number-input",
        "question": "Hány tizedet ér 0,5?",
        "correctAnswer": 5,
        "points": 1,
        "image": "💸",
        "context": "A cukrászdában a pontos alapanyagok kimérése tizedesvesszőkön múlik."
      },
      {
        "id": "g6-october-4",
        "type": "number-input",
        "question": "Kerekítsd tizedekre: 4,567!",
        "correctAnswer": 4.6,
        "points": 1,
        "image": "💸",
        "context": "A laboratóriumban a kutatók hajszálpontos méréseket végeznek."
      },
      {
        "id": "g6-october-5",
        "type": "multiple-choice",
        "question": "Melyik nagyobb?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "0,12",
          "0,2"
        ],
        "image": "💸",
        "context": "A boltban a visszajáró kiszámításakor fontos a tizedesek ismerete."
      },
      {
        "id": "g6-october-6",
        "type": "number-input",
        "question": "Mennyi 4,5 tízszerese?",
        "correctAnswer": 45,
        "points": 1,
        "image": "💸",
        "context": "A sporthírekben az ezredmásodpercek döntik el a győztes kilétét."
      },
      {
        "id": "g6-october-7",
        "type": "number-input",
        "question": "3,4 + 0,6 = ?",
        "correctAnswer": 4,
        "points": 1,
        "image": "💸",
        "context": "A laboratóriumban a kutatók hajszálpontos méréseket végeznek."
      },
      {
        "id": "g6-october-8",
        "type": "true-false",
        "question": "Igaz-Hamis: 0,5 = 0,50",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "💸",
        "context": "A cukrászdában a pontos alapanyagok kimérése tizedesvesszőkön múlik."
      },
      {
        "id": "g6-october-9",
        "type": "matching",
        "question": "Párosítsd a törteket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "1/2",
            "right": "0,5"
          },
          {
            "id": "2",
            "left": "1/4",
            "right": "0,25"
          },
          {
            "id": "3",
            "left": "1/10",
            "right": "0,1"
          }
        ],
        "image": "💸",
        "context": "A boltban a visszajáró kiszámításakor fontos a tizedesek ismerete."
      },
      {
        "id": "g6-october-10",
        "type": "number-input",
        "question": "7,89 - 1,8 = ?",
        "correctAnswer": 6.09,
        "points": 1,
        "image": "💸",
        "context": "A sporthírekben az ezredmásodpercek döntik el a győztes kilétét."
      }
    ]
  },
  {
    "id": "november",
    "name": "November",
    "topic": "Oszthatóság",
    "tasks": [
      {
        "id": "g6-november-1",
        "type": "multiple-choice",
        "question": "Melyik osztható 3-mal?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "124",
          "123",
          "125"
        ],
        "image": "➗",
        "context": "A táborban a gyerekeket egyenlő csapatokba kell osztani a játékhoz."
      },
      {
        "id": "g6-november-2",
        "type": "multiple-choice",
        "question": "Egy szám osztható 5-tel, ha utolsó számjegye...",
        "correctAnswer": 2,
        "points": 1,
        "options": [
          "páros",
          "3 vagy 5",
          "0 vagy 5"
        ],
        "image": "➗",
        "context": "A gyümölcsöskertben a ládákba pontosan ugyanannyi alma kell hogy kerüljön."
      },
      {
        "id": "g6-november-3",
        "type": "number-input",
        "question": "LNKO(12, 18) = ?",
        "correctAnswer": 6,
        "points": 1,
        "image": "➗",
        "context": "A gyümölcsöskertben a ládákba pontosan ugyanannyi alma kell hogy kerüljön."
      },
      {
        "id": "g6-november-4",
        "type": "number-input",
        "question": "LKKT(4, 6) = ?",
        "correctAnswer": 12,
        "points": 1,
        "image": "➗",
        "context": "A táborban a gyerekeket egyenlő csapatokba kell osztani a játékhoz."
      },
      {
        "id": "g6-november-5",
        "type": "multiple-choice",
        "question": "Melyik prímszám?",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "17",
          "21",
          "25"
        ],
        "image": "➗",
        "context": "A sakktáblán a bábuk elrendezése matematikai rendet követ."
      },
      {
        "id": "g6-november-6",
        "type": "true-false",
        "question": "Osztható-e a 456 4-gyel?",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "➗",
        "context": "A programozók egy titkos algoritmus oszthatósági szabályait tesztelik."
      },
      {
        "id": "g6-november-7",
        "type": "number-input",
        "question": "Hány osztója van a 10-nek?",
        "correctAnswer": 4,
        "points": 1,
        "image": "➗",
        "context": "A programozók egy titkos algoritmus oszthatósági szabályait tesztelik."
      },
      {
        "id": "g6-november-8",
        "type": "number-input",
        "question": "Legkisebb páros prímszám?",
        "correctAnswer": 2,
        "points": 1,
        "image": "➗",
        "context": "A sakktáblán a bábuk elrendezése matematikai rendet követ."
      },
      {
        "id": "g6-november-9",
        "type": "matching",
        "question": "Párosítsd a szabályokat!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "2-vel",
            "right": "páros"
          },
          {
            "id": "2",
            "left": "3-mal",
            "right": "számjegyösszeg"
          },
          {
            "id": "3",
            "left": "10-zel",
            "right": "0-ra végződik"
          }
        ],
        "image": "➗",
        "context": "A táborban a gyerekeket egyenlő csapatokba kell osztani a játékhoz."
      },
      {
        "id": "g6-november-10",
        "type": "true-false",
        "question": "A 123 456 osztható 9-cel?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "➗",
        "context": "A programozók egy titkos algoritmus oszthatósági szabályait tesztelik."
      }
    ]
  },
  {
    "id": "december",
    "name": "December",
    "topic": "Közönséges törtek",
    "tasks": [
      {
        "id": "g6-december-1",
        "type": "number-input",
        "question": "1/4 + 1/2 = ?",
        "correctAnswer": "3/4",
        "points": 1,
        "image": "🍕",
        "context": "A zenekarban a kotta ütemei pontos törtrésznyi szüneteket tartalmaznak."
      },
      {
        "id": "g6-december-2",
        "type": "number-input",
        "question": "5/6 - 1/3 = ?",
        "correctAnswer": "1/2",
        "points": 1,
        "image": "🍕",
        "context": "A zenekarban a kotta ütemei pontos törtrésznyi szüneteket tartalmaznak."
      },
      {
        "id": "g6-december-3",
        "type": "true-false",
        "question": "Igaz-Hamis: 2/3 > 1/2",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "🍕",
        "context": "Az asztalos a faanyagot pontosan harmadolta a bútor készítéséhez."
      },
      {
        "id": "g6-december-4",
        "type": "number-input",
        "question": "Mennyi 40-nek a 3/4 része?",
        "correctAnswer": 30,
        "points": 1,
        "image": "🍕",
        "context": "A zenekarban a kotta ütemei pontos törtrésznyi szüneteket tartalmaznak."
      },
      {
        "id": "g6-december-5",
        "type": "number-input",
        "question": "Bővítsd a 2/3-ot 3-mal! Mi lesz az új számláló?",
        "correctAnswer": 6,
        "points": 1,
        "image": "🍕",
        "context": "Az asztalos a faanyagot pontosan harmadolta a bútor készítéséhez."
      },
      {
        "id": "g6-december-6",
        "type": "number-input",
        "question": "Egyszerűsítsd a 4/8-ot! Mennyi a legegyszerűbb alak?",
        "correctAnswer": "1/2",
        "points": 1,
        "image": "🍕",
        "context": "A zenekarban a kotta ütemei pontos törtrésznyi szüneteket tartalmaznak."
      },
      {
        "id": "g6-december-7",
        "type": "matching",
        "question": "Párosítsd az egyenlőket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "0,5",
            "right": "1/2"
          },
          {
            "id": "2",
            "left": "0,2",
            "right": "1/5"
          },
          {
            "id": "3",
            "left": "0,75",
            "right": "3/4"
          }
        ],
        "image": "🍕",
        "context": "Az asztalos a faanyagot pontosan harmadolta a bútor készítéséhez."
      },
      {
        "id": "g6-december-8",
        "type": "number-input",
        "question": "Hány negyed van 2 egészben?",
        "correctAnswer": 8,
        "points": 1,
        "image": "🍕",
        "context": "A baráti társaság pizzát rendelt, és igazságosan szeretnék elosztani."
      },
      {
        "id": "g6-december-9",
        "type": "multiple-choice",
        "question": "Melyik a reciproka a 3/4-nek?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "1/4",
          "4/3",
          "3/1"
        ],
        "image": "🍕",
        "context": "A zenekarban a kotta ütemei pontos törtrésznyi szüneteket tartalmaznak."
      },
      {
        "id": "g6-december-10",
        "type": "number-input",
        "question": "3/5 + 2/5 = ?",
        "correctAnswer": 1,
        "points": 1,
        "image": "🍕",
        "context": "Az asztalos a faanyagot pontosan harmadolta a bútor készítéséhez."
      }
    ]
  },
  {
    "id": "january",
    "name": "Január",
    "topic": "Tizedes törtek szorzása, osztása",
    "tasks": [
      {
        "id": "g6-january-1",
        "type": "number-input",
        "question": "1,2 * 3 = ?",
        "correctAnswer": 3.6,
        "points": 1,
        "image": "📈",
        "context": "A térképen a kicsinyítés mértéke tizedes törtekkel van megadva."
      },
      {
        "id": "g6-january-2",
        "type": "number-input",
        "question": "4,5 * 100 = ?",
        "correctAnswer": 450,
        "points": 1,
        "image": "📈",
        "context": "A térképen a kicsinyítés mértéke tizedes törtekkel van megadva."
      },
      {
        "id": "g6-january-3",
        "type": "number-input",
        "question": "12,6 : 3 = ?",
        "correctAnswer": 4.2,
        "points": 1,
        "image": "📈",
        "context": "A benzinkúton a literenkénti ár kiszámítása osztással történik."
      },
      {
        "id": "g6-january-4",
        "type": "number-input",
        "question": "45,6 : 10 = ?",
        "correctAnswer": 4.56,
        "points": 1,
        "image": "📈",
        "context": "A tőzsdei árfolyamok változása miatt a befektetők számításokat végeznek."
      },
      {
        "id": "g6-january-5",
        "type": "number-input",
        "question": "0,2 * 0,3 = ?",
        "correctAnswer": 0.06,
        "points": 1,
        "image": "📈",
        "context": "A benzinkúton a literenkénti ár kiszámítása osztással történik."
      },
      {
        "id": "g6-january-6",
        "type": "true-false",
        "question": "Igaz-Hamis: 1,5 * 0,5 < 1,5",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "📈",
        "context": "A térképen a kicsinyítés mértéke tizedes törtekkel van megadva."
      },
      {
        "id": "g6-january-7",
        "type": "number-input",
        "question": "Mennyi 0,1 négyzete?",
        "correctAnswer": 0.01,
        "points": 1,
        "image": "📈",
        "context": "A benzinkúton a literenkénti ár kiszámítása osztással történik."
      },
      {
        "id": "g6-january-8",
        "type": "matching",
        "question": "Párosítsd a műveleteket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "5*0,2",
            "right": "1"
          },
          {
            "id": "2",
            "left": "10:0,5",
            "right": "20"
          },
          {
            "id": "3",
            "left": "0,1*10",
            "right": "1"
          }
        ],
        "image": "📈",
        "context": "A benzinkúton a literenkénti ár kiszámítása osztással történik."
      },
      {
        "id": "g6-january-9",
        "type": "number-input",
        "question": "Hány darab 0,5 literes üveg kell 3 liter vízhez?",
        "correctAnswer": 6,
        "points": 1,
        "image": "📈",
        "context": "A térképen a kicsinyítés mértéke tizedes törtekkel van megadva."
      },
      {
        "id": "g6-january-10",
        "type": "number-input",
        "question": "2,5 : 0,5 = ?",
        "correctAnswer": 5,
        "points": 1,
        "image": "📈",
        "context": "A benzinkúton a literenkénti ár kiszámítása osztással történik."
      }
    ]
  },
  {
    "id": "february",
    "name": "Február",
    "topic": "Geometria - Szögek és Háromszög",
    "tasks": [
      {
        "id": "g6-february-1",
        "type": "number-input",
        "question": "Mennyi a derékszög értéke?",
        "correctAnswer": 90,
        "points": 1,
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-february-2",
        "type": "multiple-choice",
        "question": "Hogy hívjuk a 180 fokos szöget?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "Tele szög",
          "Egyenesszög",
          "Mellékszög"
        ],
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-february-3",
        "type": "number-input",
        "question": "Háromszög belső szögeinek összege?",
        "correctAnswer": 180,
        "points": 1,
        "image": "📐",
        "context": "A 3D nyomtatás során a testek rétegről rétegre épülnek fel."
      },
      {
        "id": "g6-february-4",
        "type": "true-false",
        "question": "Igaz-Hamis: Minden szabályos háromszög hegyesszögű.",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "📐",
        "context": "A 3D nyomtatás során a testek rétegről rétegre épülnek fel."
      },
      {
        "id": "g6-february-5",
        "type": "number-input",
        "question": "Hány fokosak a szabályos háromszög szögei?",
        "correctAnswer": 60,
        "points": 1,
        "image": "📐",
        "context": "Az építész egy modern ház alaprajzát tervezi meg a rajzasztalon."
      },
      {
        "id": "g6-february-6",
        "type": "multiple-choice",
        "question": "Melyik háromszög oldalai lehetnek: 3, 4, 5?",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Derékszögű",
          "Tompaszögű",
          "Egyenlő szárú"
        ],
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-february-7",
        "type": "matching",
        "question": "Párosíts!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "90",
            "right": "derékszög"
          },
          {
            "id": "2",
            "left": "180",
            "right": "egyenesszög"
          },
          {
            "id": "3",
            "left": "360",
            "right": "teljesszög"
          }
        ],
        "image": "📐",
        "context": "A 3D nyomtatás során a testek rétegről rétegre épülnek fel."
      },
      {
        "id": "g6-february-8",
        "type": "number-input",
        "question": "Hány magassága van egy háromszögnek?",
        "correctAnswer": 3,
        "points": 1,
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-february-9",
        "type": "multiple-choice",
        "question": "Melyik háromszög egyenlőtlenség?",
        "correctAnswer": 2,
        "points": 1,
        "options": [
          "3,4,5",
          "5,5,8",
          "2,2,5"
        ],
        "image": "📐",
        "context": "A kertész különleges alakzatú ágyásokat alakít ki a parkban."
      },
      {
        "id": "g6-february-10",
        "type": "number-input",
        "question": "Mennyi a 60 fokos szög pótszöge?",
        "correctAnswer": 30,
        "points": 1,
        "image": "📐",
        "context": "Az építész egy modern ház alaprajzát tervezi meg a rajzasztalon."
      }
    ]
  },
  {
    "id": "march",
    "name": "Március",
    "topic": "Geometria - Négyszögek és Terület",
    "tasks": [
      {
        "id": "g6-march-1",
        "type": "number-input",
        "question": "Téglalap kerülete: a=4, b=6. K=?",
        "correctAnswer": 20,
        "points": 1,
        "image": "📐",
        "context": "A 3D nyomtatás során a testek rétegről rétegre épülnek fel."
      },
      {
        "id": "g6-march-2",
        "type": "number-input",
        "question": "Négyzet területe: a=5. T=?",
        "correctAnswer": 25,
        "points": 1,
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-march-3",
        "type": "number-input",
        "question": "Hány oldala van a trapéznak?",
        "correctAnswer": 4,
        "points": 1,
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-march-4",
        "type": "true-false",
        "question": "Igaz-Hamis: A rombusz minden oldala egyenlő.",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-march-5",
        "type": "number-input",
        "question": "Mennyi: 1 m2 = ? dm2",
        "correctAnswer": 100,
        "points": 1,
        "image": "📐",
        "context": "A kertész különleges alakzatú ágyásokat alakít ki a parkban."
      },
      {
        "id": "g6-march-6",
        "type": "multiple-choice",
        "question": "Paralelogramma szemközti szögei...",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Egyenlőek",
          "Pótszögek",
          "180 fokra egészítik ki egymást"
        ],
        "image": "📐",
        "context": "Az építész egy modern ház alaprajzát tervezi meg a rajzasztalon."
      },
      {
        "id": "g6-march-7",
        "type": "matching",
        "question": "Párosíts képleteket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "Téglalap T",
            "right": "a*b"
          },
          {
            "id": "2",
            "left": "Négyzet T",
            "right": "a*a"
          },
          {
            "id": "3",
            "left": "Rombusz K",
            "right": "4*a"
          }
        ],
        "image": "📐",
        "context": "A kertész különleges alakzatú ágyásokat alakít ki a parkban."
      },
      {
        "id": "g6-march-8",
        "type": "number-input",
        "question": "Hány mm2 1 cm2?",
        "correctAnswer": 100,
        "points": 1,
        "image": "📐",
        "context": "A művész geometriai formákból építi fel absztrakt festményét."
      },
      {
        "id": "g6-march-9",
        "type": "multiple-choice",
        "question": "Deltoid átlói hogyan metszik egymást?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "Párhuzamosan",
          "Merőlegesen",
          "45 fokban"
        ],
        "image": "📐",
        "context": "A kertész különleges alakzatú ágyásokat alakít ki a parkban."
      },
      {
        "id": "g6-march-10",
        "type": "number-input",
        "question": "Négyszög belső szögeinek összege?",
        "correctAnswer": 360,
        "points": 1,
        "image": "📐",
        "context": "Az építész egy modern ház alaprajzát tervezi meg a rajzasztalon."
      }
    ]
  },
  {
    "id": "april",
    "name": "Április",
    "topic": "Arányosság és Százalékszámítás",
    "tasks": [
      {
        "id": "g6-april-1",
        "type": "number-input",
        "question": "Mennyi 200-nak a 10%-a?",
        "correctAnswer": 20,
        "points": 1,
        "image": "📊",
        "context": "A webáruházban nagy leárazások várják a vásárlókat."
      },
      {
        "id": "g6-april-2",
        "type": "number-input",
        "question": "Ha 2 kg alma 800 Ft, mennyi 5 kg?",
        "correctAnswer": 2000,
        "points": 1,
        "image": "📊",
        "context": "A választási eredmények feldolgozásakor kördiagramokat készítenek."
      },
      {
        "id": "g6-april-3",
        "type": "multiple-choice",
        "question": "Melyik tört felel meg a 25%-nak?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "1/2",
          "1/4",
          "1/5"
        ],
        "image": "📊",
        "context": "A webáruházban nagy leárazások várják a vásárlókat."
      },
      {
        "id": "g6-april-4",
        "type": "true-false",
        "question": "Igaz-Hamis: Ha az egyik mennyiség duplázódik, a vele egyenesen arányos is duplázódik.",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "📊",
        "context": "Egy épület makettje 1:50 arányban készült el."
      },
      {
        "id": "g6-april-5",
        "type": "number-input",
        "question": "Hány százalék a 3/4?",
        "correctAnswer": 75,
        "points": 1,
        "image": "📊",
        "context": "A vegyész egy oldat százalékos összetételét állítja be a lombikban."
      },
      {
        "id": "g6-april-6",
        "type": "number-input",
        "question": "Egy sapka ára 4000 Ft, 20% kedvezménnyel mennyi?",
        "correctAnswer": 3200,
        "points": 1,
        "image": "📊",
        "context": "A választási eredmények feldolgozásakor kördiagramokat készítenek."
      },
      {
        "id": "g6-april-7",
        "type": "matching",
        "question": "Párosíts!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "0,5",
            "right": "50%"
          },
          {
            "id": "2",
            "left": "0,1",
            "right": "10%"
          },
          {
            "id": "3",
            "left": "1",
            "right": "100%"
          }
        ],
        "image": "📊",
        "context": "A választási eredmények feldolgozásakor kördiagramokat készítenek."
      },
      {
        "id": "g6-april-8",
        "type": "number-input",
        "question": "Arány: 2:3 arányban oszd el a 50-et. Mennyi a nagyobb rész?",
        "correctAnswer": 30,
        "points": 1,
        "image": "📊",
        "context": "A webáruházban nagy leárazások várják a vásárlókat."
      },
      {
        "id": "g6-april-9",
        "type": "number-input",
        "question": "Mennyi a 120-nak a 150%-a?",
        "correctAnswer": 180,
        "points": 1,
        "image": "📊",
        "context": "Egy épület makettje 1:50 arányban készült el."
      },
      {
        "id": "g6-april-10",
        "type": "number-input",
        "question": "Ha x arányos y-nal, és x=2-nél y=10, mennyi y, ha x=5?",
        "correctAnswer": 25,
        "points": 1,
        "image": "📊",
        "context": "A választási eredmények feldolgozásakor kördiagramokat készítenek."
      }
    ]
  },
  {
    "id": "may",
    "name": "Május",
    "topic": "Statisztika és Valószínűség",
    "tasks": [
      {
        "id": "g6-may-1",
        "type": "number-input",
        "question": "Mennyi a 3, 5, 10 átlaga?",
        "correctAnswer": 6,
        "points": 1,
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-may-2",
        "type": "multiple-choice",
        "question": "Dobókockával mi az esélye a 6-osnak?",
        "correctAnswer": 1,
        "points": 1,
        "options": [
          "1/2",
          "1/6",
          "1/3"
        ],
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-may-3",
        "type": "number-input",
        "question": "Medián a 2, 5, 8 sorozatban?",
        "correctAnswer": 5,
        "points": 1,
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-may-4",
        "type": "true-false",
        "question": "Igaz-Hamis: Az esemény valószínűsége 0 és 1 között van.",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "Igaz",
          "Hamis"
        ],
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-may-5",
        "type": "number-input",
        "question": "Hányféleképpen rakható sorba 3 különböző könyv?",
        "correctAnswer": 6,
        "points": 1,
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-may-6",
        "type": "number-input",
        "question": "Melyik a leggyakoribb érték (módusz): 2, 3, 3, 4, 5?",
        "correctAnswer": 3,
        "points": 1,
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-may-7",
        "type": "matching",
        "question": "Párosíts fogalmakat!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          {
            "id": "1",
            "left": "Átlag",
            "right": "összeg/darab"
          },
          {
            "id": "2",
            "left": "Módusz",
            "right": "leggyakoribb"
          },
          {
            "id": "3",
            "left": "Terjedelem",
            "right": "max-min"
          }
        ],
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-may-8",
        "type": "number-input",
        "question": "Hány páros szám van a dobókockán?",
        "correctAnswer": 3,
        "points": 1,
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-may-9",
        "type": "multiple-choice",
        "question": "Pénzfeldobásnál mi az esélye a fejnek?",
        "correctAnswer": 0,
        "points": 1,
        "options": [
          "1/2",
          "1/4",
          "1"
        ],
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-may-10",
        "type": "number-input",
        "question": "Ha egy zsákban 3 piros és 2 kék golyó van, mi az esélye a pirosnak?",
        "correctAnswer": "3/5",
        "points": 1,
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      }
    ]
  },
  {
    "id": "june",
    "name": "Június",
    "topic": "Év végi összefoglalás",
    "tasks": [
      {
        "id": "g6-june-1",
        "type": "number-input",
        "question": "Mennyi: 0,4 * 0,5?",
        "correctAnswer": 0.2,
        "points": 1,
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-june-2",
        "type": "number-input",
        "question": "Mennyi: 3/4 + 0,25 ?",
        "correctAnswer": 1,
        "points": 1,
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-june-3",
        "type": "number-input",
        "question": "Kerekítsd tizedekre: 12,345!",
        "correctAnswer": 12.3,
        "points": 1,
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-june-4",
        "type": "true-false",
        "question": "Osztható-e 234 9-cel?",
        "correctAnswer": 0,
        "points": 1,
        "options": ["Igaz", "Hamis"],
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-june-5",
        "type": "number-input",
        "question": "120-nak a 20%-a?",
        "correctAnswer": 24,
        "points": 1,
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-june-6",
        "type": "number-input",
        "question": "Derékszögű háromszög egyik szöge 30°, mennyi a másik hegyesszöge?",
        "correctAnswer": 60,
        "points": 1,
        "image": "🎯",
        "context": "Gondolkodj okosan és találd meg a megoldást!"
      },
      {
        "id": "g6-june-7",
        "type": "matching",
        "question": "Párosíts testeket!",
        "correctAnswer": null,
        "points": 1,
        "pairs": [
          { "id": "1", "left": "Kocka", "right": "6 lap" },
          { "id": "2", "left": "Gúla", "right": "csúcs" },
          { "id": "3", "left": "Henger", "right": "kör alapú" }
        ],
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-june-8",
        "type": "number-input",
        "question": "Mennyi 2^5?",
        "correctAnswer": 32,
        "points": 1,
        "image": "🎯",
        "context": "A matematika segít megérteni az összefüggéseket."
      },
      {
        "id": "g6-june-9",
        "type": "number-input",
        "question": "Négyzet oldala 10, mennyi a kerülete?",
        "correctAnswer": 40,
        "points": 1,
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      },
      {
        "id": "g6-june-10",
        "type": "multiple-choice",
        "question": "Szuper éved volt?",
        "correctAnswer": 3,
        "points": 1,
        "options": ["Igen", "Persze", "Naná", "Mindhárom"],
        "image": "🎯",
        "context": "Egy újabb izgalmas matematikai kihívás vár rád!"
      }
    ]
  }
];

const GRADE_7_DATA: MonthlyCompetency[] = [
  {
    id: 'september',
    name: 'Szeptember',
    topic: 'Gondolkodjunk! (Kombinatorika, gráfok, logika)',
    tasks: [
      {
        id: 'g7-sep-11',
        type: 'multiple-choice',
        context: '### Fagylalt választék\n\nEgy fagyizó választékát az alábbi táblázat tartalmazza:',
        tableData: [
          ['Tölcsér típusa', 'Gombóc íze'],
          ['Ostyás', 'Vanília'],
          ['Csokis', 'Csoki'],
          ['Színes', 'Eper'],
          ['', 'Puncs'],
          ['', 'Pisztácia']
        ],
        question: 'A fenti táblázatban látható fagyizó választékából hányféleképpen kérhetünk egy gombóc fagyit egy tölcsérbe?',
        options: ['8', '15', '12', '18'],
        correctAnswer: 1,
        points: 1,
        image: '🍦'
      },
      {
        id: 'g7-sep-12',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Ha egy gráf minden csúcsának fokszáma 2, akkor a gráf egyetlen körből áll."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '🕸️'
      },
      {
        id: 'g7-sep-13',
        type: 'matching',
        question: 'Párosítsd a logikai kifejezéseket a jelentésükkel! (Írd be a sorszámot)',
        hint: '1: Nem igaz, hogy...; 2: Következtetés; 3: Konjunkció',
        pairs: [
          { id: '1', left: 'Állítás tagadása', right: '1' },
          { id: '2', left: 'Ha A, akkor B', right: '2' },
          { id: '3', left: 'A és B', right: '3' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🧠'
      },
      {
        id: 'g7-sep-14',
        type: 'number-input',
        question: 'Hány különböző háromjegyű szám alkotható a 2, 5, 8 számjegyekből, ha egy számjegyet csak egyszer használhatunk fel?',
        correctAnswer: 6,
        points: 1,
        image: '🔢'
      },
      {
        id: 'g7-sep-15',
        type: 'multiple-choice',
        question: 'Egy 5 fős baráti társaságban mindenki mindenkivel kezet fog egyszer. Hány kézfogás történik összesen?',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        points: 1,
        image: '🤝'
      },
      {
        id: 'g7-sep-16',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Egy gráfban a fokszámok összege mindig páros szám."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '📊'
      },
      {
        id: 'g7-sep-17',
        type: 'multiple-choice',
        question: 'Hányféleképpen állhat sorba 4 gyerek (Anna, Béla, Cecil, Dóra)?',
        options: ['4', '12', '16', '24'],
        correctAnswer: 3,
        points: 1,
        image: '🚶'
      },
      {
        id: 'g7-sep-18',
        type: 'number-input',
        question: 'Egy dobozban 4 piros és 2 kék golyó van. Legalább hány golyót kell kihúznunk csukott szemmel, hogy biztosan legyen köztük piros?',
        correctAnswer: 3,
        points: 1,
        image: '🔴'
      },
      {
        id: 'g7-sep-19',
        type: 'matching',
        question: 'Párosítsd a gráf fogalmakat a leírásukkal! (Írd be a sorszámot)',
        hint: '1: A gráf pontja; 2: Két pontot összekötő vonal; 3: Egy pontból induló élek száma',
        pairs: [
          { id: '1', left: 'Csúcs', right: '1' },
          { id: '2', left: 'Él', right: '2' },
          { id: '3', left: 'Fokszám', right: '3' }
        ],
        correctAnswer: null,
        points: 1,
        image: '📍'
      },
      {
        id: 'g7-sep-20',
        type: 'number-input',
        question: 'A fenti gráfban hány él van?',
        correctAnswer: 5,
        points: 1,
        image: 'file:///C:/Users/Istvan/.gemini/antigravity/brain/fea06463-b919-4891-885f-4becd15561f7/graph_abcd_diagonal_1774267955425.png'
      }
    ]
  },
  {
    id: 'october',
    name: 'Október',
    topic: 'Racionális számok (Törtek, tizedes törtek)',
    tasks: [
      {
        id: 'g7-oct-21',
        type: 'multiple-choice',
        question: 'Mennyi a 2/5 és az 1/4 szorzata?',
        options: ['1/4', '1/10', '3/9', '1/2'],
        correctAnswer: 1,
        points: 1,
        image: '✖️'
      },
      {
        id: 'g7-oct-22',
        type: 'number-input',
        question: 'Mennyi a 7/2 tizedestört alakja?',
        correctAnswer: 3.5,
        points: 1,
        image: '📝'
      },
      {
        id: 'g7-oct-23',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Minden egész szám felírható tört alakban."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '✅'
      },
      {
        id: 'g7-oct-24',
        type: 'multiple-choice',
        question: 'Melyik szám a legkisebb?',
        options: ['-2,5', '-3,1', '-1,8', '-4'],
        correctAnswer: 3,
        points: 1,
        image: '📉'
      },
      {
        id: 'g7-oct-25',
        type: 'matching',
        question: 'Párosítsd a törteket a tizedestört párjukkal! (Írd be a tizedestörtet)',
        pairs: [
          { id: '1', left: '1/2', right: '0,5' },
          { id: '2', left: '1/4', right: '0,25' },
          { id: '3', left: '3/5', right: '0,6' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-oct-26',
        type: 'number-input',
        question: 'Mennyi 1/2 + 1/3?',
        correctAnswer: '5/6',
        points: 1,
        image: '➕'
      },
      {
        id: 'g7-oct-27',
        type: 'multiple-choice',
        question: 'Kerekítsd a 3,14159 számot századokra!',
        options: ['3,14', '3,15', '3,1', '3,2'],
        correctAnswer: 0,
        points: 1,
        image: '🎯'
      },
      {
        id: 'g7-oct-28',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Két negatív szám szorzata mindig pozitív."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '➖'
      },
      {
        id: 'g7-oct-29',
        type: 'number-input',
        question: 'Mennyi |-8| - |3|?',
        correctAnswer: 5,
        points: 1,
        image: '📏'
      },
      {
        id: 'g7-oct-30',
        type: 'multiple-choice',
        context: 'Anna 👧: "Ma 1/3 részt olvastam el a könyvből."\nBence 👦: "Én tegnap 1/6 részt olvastam el belőle."',
        question: 'Hányad részét olvasták el összesen a könyvnek?',
        options: ['1/3', '1/2', '5/6', '2/3'],
        correctAnswer: 1,
        points: 1,
        image: '📖'
      }
    ]
  },
  {
    id: 'november',
    name: 'November',
    topic: 'Betűs kifejezések és helyettesítési érték',
    tasks: [
      {
        id: 'g7-nov-31',
        type: 'number-input',
        question: 'Helyettesítsd be a=3-at: 2a + 5 = ?',
        correctAnswer: 11,
        points: 1,
        image: '🔠'
      },
      {
        id: 'g7-nov-32',
        type: 'multiple-choice',
        question: 'Hogyan írjuk fel betűkkel: "egy szám kétszeresénél 3-mal több"?',
        options: ['x+3', '2x+3', '3x+2', '2+3x'],
        correctAnswer: 1,
        points: 1,
        image: '📝'
      },
      {
        id: 'g7-nov-33',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A 3x és a 3y egynemű kifejezések."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '⚖️'
      },
      {
        id: 'g7-nov-34',
        type: 'number-input',
        question: 'Vond össze: 4x + 2x - x = ?',
        correctAnswer: '5x',
        points: 1,
        image: '➕'
      },
      {
        id: 'g7-nov-35',
        type: 'multiple-choice',
        question: 'Mennyi a helyettesítési értéke x=2, y=5 esetén: 3x - y?',
        options: ['1', '11', '6', '-1'],
        correctAnswer: 0,
        points: 1,
        image: '🔢'
      },
      {
        id: 'g7-nov-36',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Az a * b = b * a felcserélhetőségi azonosság."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '🔄'
      },
      {
        id: 'g7-nov-37',
        type: 'number-input',
        question: 'Bontsd fel a zárójelet: 3(x + 4) = ?',
        correctAnswer: '3x + 12',
        points: 1,
        image: '📦'
      },
      {
        id: 'g7-nov-38',
        type: 'multiple-choice',
        question: 'Melyik kifejezés jelenti "egy szám négyzete"?',
        options: ['2x', 'x+x', 'x^2', 'x+2'],
        correctAnswer: 2,
        points: 1,
        image: '⬛'
      },
      {
        id: 'g7-nov-39',
        type: 'matching',
        question: 'Párosítsd a kifejezéseket a nevükkel! (Írd be a számot)',
        hint: '1: Együttható; 2: Változó; 3: Konstans',
        pairs: [
          { id: '1', left: 'A "3" a 3x-ben', right: '1' },
          { id: '2', left: 'Az "x" a 3x-ben', right: '2' },
          { id: '3', left: 'A "+5" a 3x+5-ben', right: '3' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🏷️'
      },
      {
        id: 'g7-nov-40',
        type: 'number-input',
        context: 'Egy téglalap oldalai "a" és "b".',
        question: 'Írd fel a kerület képletét!',
        correctAnswer: '2a + 2b',
        points: 1,
        image: '📐'
      }
    ]
  },
  {
    id: 'december',
    name: 'December',
    topic: 'Geometriai transzformációk (Tükrözés, szimmetria)',
    tasks: [
      {
        id: 'g7-dec-41',
        type: 'multiple-choice',
        question: 'Hány szimmetriatengelye van a négyzetnek?',
        options: ['4', '2', '0', '8'],
        correctAnswer: 0,
        points: 1,
        image: '⬛'
      },
      {
        id: 'g7-dec-42',
        type: 'number-input',
        question: 'Hány fokos elforgatás a derékszög?',
        correctAnswer: 90,
        points: 1,
        image: '📐'
      },
      {
        id: 'g7-dec-43',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A tengelyes tükrözés távolságtartó transzformáció."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '🪞'
      },
      {
        id: 'g7-dec-44',
        type: 'multiple-choice',
        question: 'Melyik betű rendelkezik középpontos szimmetriával?',
        options: ['A', 'M', 'S', 'E'],
        correctAnswer: 2,
        points: 1,
        image: '🔡'
      },
      {
        id: 'g7-dec-45',
        type: 'matching',
        question: 'Párosítsd a transzformációkat a tulajdonságukkal! (Írd be a sorszámot)',
        hint: '1: Tükrözés; 2: Eltolás; 3: Forgatás',
        pairs: [
          { id: '1', left: 'Megfordítja az irányítást', right: '1' },
          { id: '2', left: 'Párhuzamos eltolás', right: '2' },
          { id: '3', left: 'Középpont körüli mozgás', right: '3' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔄'
      },
      {
        id: 'g7-dec-46',
        type: 'number-input',
        question: 'Hány fokos a középpontos tükrözésnek megfelelő elforgatás?',
        correctAnswer: 180,
        points: 1,
        image: '🌀'
      },
      {
        id: 'g7-dec-47',
        type: 'multiple-choice',
        question: 'Mi a tengelyes tükrözés fixpontjainak halmaza?',
        options: ['A tükörtengely', 'A tükörkép', 'Egyetlen pont', 'Üres halmaz'],
        correctAnswer: 0,
        points: 1,
        image: '📍'
      },
      {
        id: 'g7-dec-48',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A körnek végtelen sok szimmetriatengelye van."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '⭕'
      },
      {
        id: 'g7-dec-49',
        type: 'matching',
        question: 'Hány szimmetriatengelye van? (Párosítsd a számot)',
        pairs: [
          { id: '1', left: 'Téglalap', right: '2' },
          { id: '2', left: 'Szabályos háromszög', right: '3' },
          { id: '3', left: 'Egyenlő szárú háromszög', right: '1' }
        ],
        correctAnswer: null,
        points: 1,
        image: '📐'
      },
      {
        id: 'g7-dec-50',
        type: 'number-input',
        context: 'Egy pont koordinátái P(2; 3).',
        question: 'Hányadik síknegyedben van a pont?',
        correctAnswer: 1,
        points: 1,
        image: '🗺️'
      }
    ]
  },
  {
    id: 'january',
    name: 'Január',
    topic: 'Hatványozás és oszthatóság',
    tasks: [
      {
        id: 'g7-jan-51',
        type: 'multiple-choice',
        question: 'Mennyi 10^5 értéke?',
        options: ['1 000', '10 000', '100 000', '1 000 000'],
        correctAnswer: 2,
        points: 1,
        image: '⚡'
      },
      {
        id: 'g7-jan-52',
        type: 'number-input',
        question: 'Mennyi 4^3?',
        correctAnswer: 64,
        points: 1,
        image: '🔢'
      },
      {
        id: 'g7-jan-53',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A 10^0 értéke 0."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '⭕'
      },
      {
        id: 'g7-jan-54',
        type: 'multiple-choice',
        question: 'Melyik a 300 000 normálalakja?',
        options: ['3 * 10^4', '3 * 10^5', '30 * 10^4', '0,3 * 10^6'],
        correctAnswer: 1,
        points: 1,
        image: '📏'
      },
      {
        id: 'g7-jan-55',
        type: 'matching',
        question: 'Párosítsd a hatványokat az értékükkel!',
        pairs: [
          { id: '1', left: '2^4', right: '16' },
          { id: '2', left: '3^3', right: '27' },
          { id: '3', left: '5^2', right: '25' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-jan-56',
        type: 'number-input',
        question: 'Mennyi a kitevő: 2^x = 16?',
        correctAnswer: 4,
        points: 1,
        image: '❓'
      },
      {
        id: 'g7-jan-57',
        type: 'multiple-choice',
        question: 'Mely számjegyekre végződhet egy 5-tel osztható szám?',
        options: ['Páros számokra', 'Csak 5-re', '0-ra vagy 5-re', 'Bármelyikre'],
        correctAnswer: 2,
        points: 1,
        image: '🔢'
      },
      {
        id: 'g7-jan-58',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A 123 osztható 3-mal."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '✅'
      },
      {
        id: 'g7-jan-59',
        type: 'matching',
        question: 'Párosítsd az oszthatósági szabályokat!',
        pairs: [
          { id: '1', left: 'Osztható 2-vel', right: 'Páros végű' },
          { id: '2', left: 'Osztható 3-mal', right: 'Számjegyösszeg' },
          { id: '3', left: 'Osztható 10-zel', right: '0-ra végződik' }
        ],
        correctAnswer: null,
        points: 1,
        image: '⚙️'
      },
      {
        id: 'g7-jan-60',
        type: 'number-input',
        question: 'Melyik a legkisebb természetes szám, amivel minden szám osztható?',
        correctAnswer: 1,
        points: 1,
        image: '🥇'
      }
    ]
  },
  {
    id: 'february',
    name: 'Február',
    topic: 'Arányosság és százalékszámítás',
    tasks: [
      {
        id: 'g7-feb-61',
        type: 'multiple-choice',
        context: 'Egy recepthez 2 főre 300g liszt kell.',
        question: 'Mennyi liszt kell 3 főre?',
        options: ['150g', '450g', '600g', '900g'],
        correctAnswer: 1,
        points: 1,
        image: '🥣'
      },
      {
        id: 'g7-feb-62',
        type: 'number-input',
        question: 'Mennyi 200-nak a 30%-a?',
        correctAnswer: 60,
        points: 1,
        image: '📊'
      },
      {
        id: 'g7-feb-63',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Az egyenes arányosság grafikonja egy origón átmenő egyenes."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '📈'
      },
      {
        id: 'g7-feb-64',
        type: 'multiple-choice',
        question: 'Melyik méretarány jelent nagyobb kicsinyítést?',
        options: ['1:100', '1:10', '1:1000', '1:1'],
        correctAnswer: 2,
        points: 1,
        image: '🗺️'
      },
      {
        id: 'g7-feb-65',
        type: 'matching',
        question: 'Párosítsd a törteket a százalékértékükkel!',
        pairs: [
          { id: '1', left: '1/2', right: '50%' },
          { id: '2', left: '1/4', right: '25%' },
          { id: '3', left: '1/10', right: '10%' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-feb-66',
        type: 'number-input',
        question: 'Ha 4 munkás 6 óra alatt végez, hány óra alatt végez 2 munkás? (Fordított arányosság)',
        correctAnswer: 12,
        points: 1,
        image: '👷'
      },
      {
        id: 'g7-feb-67',
        type: 'multiple-choice',
        context: 'Egy termék ára 5000 Ft, de 10% kedvezményt kapunk.',
        question: 'Mennyibe kerül a termék?',
        options: ['4500 Ft', '4000 Ft', '5500 Ft', '4900 Ft'],
        correctAnswer: 0,
        points: 1,
        image: '🏷️'
      },
      {
        id: 'g7-feb-68',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A 120% kisebb az egésznél."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '❌'
      },
      {
        id: 'g7-feb-69',
        type: 'matching',
        question: 'Párosítsd az arányokat az osztási részekkel! (Összesen 100 egység)',
        pairs: [
          { id: '1', left: '1:1', right: '50-50' },
          { id: '2', left: '1:4', right: '20-80' },
          { id: '3', left: '2:3', right: '40-60' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🍰'
      },
      {
        id: 'g7-feb-70',
        type: 'number-input',
        question: 'Hány százaléka a 5 a 25-nek?',
        correctAnswer: 20,
        points: 1,
        image: '🔢'
      }
    ]
  },
  {
    id: 'march',
    name: 'Március',
    topic: 'Egyenletek és egyenlőtlenségek',
    tasks: [
      {
        id: 'g7-mar-71',
        type: 'number-input',
        context: 'Egy boltban 3 egyforma csoki és egy 200 Ft-os üdítő összesen 800 Ft-ba került.',
        question: 'Hány forintba került egy csoki? (Egyenlet: 3x + 200 = 800)',
        correctAnswer: 200,
        points: 1,
        image: '🍫'
      },
      {
        id: 'g7-mar-72',
        type: 'multiple-choice',
        question: 'Mi a megoldása az x + 5 = 12 egyenletnek?',
        options: ['5', '7', '17', '12'],
        correctAnswer: 1,
        points: 1,
        image: '⚖️'
      },
      {
        id: 'g7-mar-73',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Az egyenlet mindkét oldalához hozzáadhatjuk ugyanazt a számot."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '✅'
      },
      {
        id: 'g7-mar-74',
        type: 'number-input',
        question: 'Mennyi x értéke: 2x - 4 = 10?',
        correctAnswer: 7,
        points: 1,
        image: '🔢'
      },
      {
        id: 'g7-mar-75',
        type: 'multiple-choice',
        question: 'Melyik x értékre igaz: 3x > 15?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 3,
        points: 1,
        image: '📈'
      },
      {
        id: 'g7-mar-76',
        type: 'true-false',
        question: 'Igaz vagy hamis? "Ha egy egyenletet 0-val szorzunk, a megoldás nem változik."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '❌'
      },
      {
        id: 'g7-mar-77',
        type: 'matching',
        question: 'Párosítsd a szöveges feladatokat az egyenletekkel!',
        pairs: [
          { id: '1', left: 'Valaminek a fele 10', right: 'x/2 = 10' },
          { id: '2', left: 'Valaminél 5-tel több 20', right: 'x+5 = 20' },
          { id: '3', left: 'Valami kétszerese 30', right: '2x = 30' }
        ],
        correctAnswer: null,
        points: 1,
        image: '📝'
      },
      {
        id: 'g7-mar-78',
        type: 'number-input',
        question: 'Oldd meg: 5x + 3 = 2x + 12!',
        correctAnswer: 3,
        points: 1,
        image: '🖋️'
      },
      {
        id: 'g7-mar-79',
        type: 'multiple-choice',
        context: 'Gondoltam egy számra. Megszoroztam 4-gyel, kivontam belőle 2-t, és 18-at kaptam.',
        question: 'Melyik számra gondoltam?',
        options: ['4', '5', '6', '7'],
        correctAnswer: 1,
        points: 1,
        image: '🧠'
      },
      {
        id: 'g7-mar-80',
        type: 'number-input',
        question: 'Hány megoldása van a 0 * x = 5 egyenletnek?',
        correctAnswer: 0,
        points: 1,
        image: '🚫'
      }
    ]
  },
  {
    id: 'april',
    name: 'Április',
    topic: 'Geometria I. (Síkidomok tulajdonságai)',
    tasks: [
      {
        id: 'g7-apr-81',
        type: 'multiple-choice',
        question: 'Hány fokos a szabályos háromszög egy belső szöge?',
        options: ['45°', '60°', '90°', '120°'],
        correctAnswer: 1,
        points: 1,
        image: '🔺'
      },
      {
        id: 'g7-apr-82',
        type: 'number-input',
        question: 'Mennyi a háromszög belső szögeinek összege?',
        correctAnswer: 180,
        points: 1,
        image: '📐'
      },
      {
        id: 'g7-apr-83',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A rombusz minden oldala egyenlő hosszú."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '🔷'
      },
      {
        id: 'g7-apr-84',
        type: 'multiple-choice',
        question: 'Melyik négyszögnek nem feltétlenül párhuzamosak a szemközti oldalai?',
        options: ['Négyzet', 'Téglalap', 'Trapéz', 'Rombusz'],
        correctAnswer: 2,
        points: 1,
        image: '⏹️'
      },
      {
        id: 'g7-apr-85',
        type: 'matching',
        question: 'Párosítsd a háromszögeket a tulajdonságukkal!',
        pairs: [
          { id: '1', left: 'Derékszögű', right: '90°-os szög' },
          { id: '2', left: 'Egyenlő szárú', right: '2 egyenlő oldal' },
          { id: '3', left: 'Tompaszögű', right: '180° > szög > 90°' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-apr-86',
        type: 'number-input',
        question: 'Hány átlója van egy ötszögnek?',
        correctAnswer: 5,
        points: 1,
        image: '⬝'
      },
      {
        id: 'g7-apr-87',
        type: 'multiple-choice',
        question: 'Melyik testnek van kör alapja?',
        options: ['Kocka', 'Henger', 'Gúla', 'Hasáb'],
        correctAnswer: 1,
        points: 1,
        image: '🥫'
      },
      {
        id: 'g7-apr-88',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A kör kerülete a sugár és a pi szorzata."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1,
        image: '⭕'
      },
      {
        id: 'g7-apr-89',
        type: 'matching',
        question: 'Párosítsd a kör részeit a leírásukkal!',
        pairs: [
          { id: '1', left: 'Sugár', right: 'Középpont és kerület távolsága' },
          { id: '2', left: 'Átmérő', right: 'A sugár kétszerese' },
          { id: '3', left: 'Húr', right: 'Két pontot összekötő szakasz' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🎯'
      },
      {
        id: 'g7-apr-90',
        type: 'number-input',
        question: 'Mekkora az r=5 sugarú kör átmérője?',
        correctAnswer: 10,
        points: 1,
        image: '📏'
      }
    ]
  },
  {
    id: 'may',
    name: 'Május',
    topic: 'Geometria II. (Terület, felszín, térfogat)',
    tasks: [
      {
        id: 'g7-may-91',
        type: 'number-input',
        context: 'Egy téglalap oldalai 4 cm és 6 cm.',
        question: 'Mekkora a területe cm2-ben?',
        correctAnswer: 24,
        points: 1,
        image: '📏'
      },
      {
        id: 'g7-may-92',
        type: 'multiple-choice',
        question: 'Melyik képlet a háromszög területe?',
        options: ['a * b', 'a * m / 2', 'a + b + c', 'a * a'],
        correctAnswer: 1,
        points: 1,
        image: '📐'
      },
      {
        id: 'g7-may-93',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A hasáb térfogata alapterület szorozva magasság."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '📦'
      },
      {
        id: 'g7-may-94',
        type: 'multiple-choice',
        question: 'Mennyi az a=2 kocka felszíne?',
        options: ['8', '16', '24', '32'],
        correctAnswer: 2,
        points: 1,
        image: '🧊'
      },
      {
        id: 'g7-may-95',
        type: 'matching',
        question: 'Párosítsd a mértékegységeket!',
        pairs: [
          { id: '1', left: 'Hosszúság', right: 'm' },
          { id: '2', left: 'Terület', right: 'm2' },
          { id: '3', left: 'Térfogat', right: 'm3' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-may-96',
        type: 'number-input',
        question: 'Hány liter 1 dm3 víz?',
        correctAnswer: 1,
        points: 1,
        image: '💧'
      },
      {
        id: 'g7-may-97',
        type: 'multiple-choice',
        context: 'Egy akvárium 50x30x40 cm-es.',
        question: 'Mekkora a térfogata literben?',
        options: ['60 l', '600 l', '6 l', '60 000 l'],
        correctAnswer: 0,
        points: 1,
        image: '🐠'
      },
      {
        id: 'g7-may-98',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A deltoid területe az átlók szorzatának fele."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '🪁'
      },
      {
        id: 'g7-may-99',
        type: 'matching',
        question: 'Párosítsd a síkidomokat a területképletükkel!',
        pairs: [
          { id: '1', left: 'Négyzet', right: 'a^2' },
          { id: '2', left: 'Téglalap', right: 'a * b' },
          { id: '3', left: 'Paralelogramma', right: 'a * m' }
        ],
        correctAnswer: null,
        points: 1,
        image: '📐'
      },
      {
        id: 'g7-may-100',
        type: 'number-input',
        question: 'Mekkora az r=10 kör területe? (pi=3,14)',
        correctAnswer: 314,
        points: 1,
        image: '🎯'
      }
    ]
  },
  {
    id: 'june',
    name: 'Június',
    topic: 'Hozzárendelések, statisztika és valószínűség',
    tasks: [
      {
        id: 'g7-jun-101',
        type: 'multiple-choice',
        context: 'Egy dobókockával dobunk egyszer.',
        question: 'Mennyi a valószínűsége, hogy 6-ost dobunk?',
        options: ['1', '1/2', '1/6', '0'],
        correctAnswer: 2,
        points: 1,
        image: '🎲'
      },
      {
        id: 'g7-jun-102',
        type: 'number-input',
        context: 'Adatok: 2, 5, 5, 8, 10.',
        question: 'Mennyi az átlag?',
        correctAnswer: 6,
        points: 1,
        image: '📊'
      },
      {
        id: 'g7-jun-103',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A medián a középső elem sorbarendezett adatok esetén."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '📈'
      },
      {
        id: 'g7-jun-104',
        type: 'multiple-choice',
        question: 'Mi a módusza a következő adatoknak: 3, 4, 4, 5, 6, 4?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        points: 1,
        image: '🎯'
      },
      {
        id: 'g7-jun-105',
        type: 'matching',
        question: 'Párosítsd a statisztikai fogalmakat!',
        pairs: [
          { id: '1', left: 'Átlag', right: 'Összeg / darabszám' },
          { id: '2', left: 'Módusz', right: 'Leggyakoribb elem' },
          { id: '3', left: 'Terjedelem', right: 'Max - Min' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔗'
      },
      {
        id: 'g7-jun-106',
        type: 'number-input',
        question: 'Egy érmét kétszer feldobunk. Hányféle kimenetel lehetséges?',
        correctAnswer: 4,
        points: 1,
        image: '🪙'
      },
      {
        id: 'g7-jun-107',
        type: 'multiple-choice',
        question: 'Melyik grafikon alkalmas a részek és egész arányának szemléltetésére?',
        options: ['Oszlopgrafikon', 'Vonalgrafikon', 'Kördiagram', 'Piktogram'],
        correctAnswer: 2,
        points: 1,
        image: '🥧'
      },
      {
        id: 'g7-jun-108',
        type: 'true-false',
        question: 'Igaz vagy hamis? "A biztos esemény valószínűsége 1."',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1,
        image: '✅'
      },
      {
        id: 'g7-jun-109',
        type: 'matching',
        question: 'Párosítsd a hozzárendeléseket!',
        pairs: [
          { id: '1', left: 'Egy-egy értelmű', right: 'Minden X-hez pontosan egy Y' },
          { id: '2', left: 'Több-egy értelmű', right: 'Több X-hez ugyanaz az Y' },
          { id: '3', left: 'Inverz', right: 'Fordított irányú' }
        ],
        correctAnswer: null,
        points: 1,
        image: '🔄'
      },
      {
        id: 'g7-jun-110',
        type: 'number-input',
        context: 'Egy zsákban 3 piros és 7 kék golyó van.',
        question: 'Mennyi a piros húzásának valószínűsége %-ban?',
        correctAnswer: 30,
        points: 1,
        image: '🔴'
      }
    ]
  },
  {
    id: 'probameres-1',
    name: 'Probamérés 1',
    topic: 'Adatértelmezés és diagramok',
    tasks: [
      { 
        id: 'p1-1', 
        type: 'multiple-choice', 
        context: '### Kerti parti\n\nAnita kerti partit szeretne adni. A feltételek:\n- Az esti hőmérséklet legalább 18°C legyen.\n- A csapadék esélye ne haladja meg a 20%-ot.',
        question: 'A diagram alapján melyik nap a legalkalmasabb a partira?', 
        options: ['Hétfő', 'Szerda', 'Csütörtök', 'Péntek'], 
        correctAnswer: 3, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_weather_diagram.svg' 
      },
      { 
        id: 'p1-2', 
        type: 'number-input', 
        context: '### Elektromos autó töltése\n\nAz autó tölöttségi szintje 8 és 10 óra között állandó volt (nem mozdult az autó).',
        question: 'Hány órán keresztül tartott, amíg az autó 20%-ról 90%-ra feltöltődött (10 órától 18 óráig)?', 
        correctAnswer: 8, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_electric_car.svg' 
      },
      { 
        id: 'p1-3', 
        type: 'multiple-choice', 
        context: '### Iskolai ebéd\n\nA grafikon a négy választható menü népszerűségét mutatja.',
        question: 'Melyik menüt választották a legtöbben?', 
        options: ['A (Hús)', 'B (Tészta)', 'C (Zöldség)', 'D (Vegán)'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_school_lunch.svg' 
      },
      { 
        id: 'p1-4', 
        type: 'number-input', 
        context: '### Maraton\n\nA futó sebessége a távolság függvényében változik.',
        question: 'Hány kilométernél érte el a futó a legnagyobb sebességét (a grafikon legmagasabb pontja)?', 
        correctAnswer: 4, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_marathon.svg' 
      },
      { 
        id: 'p1-5', 
        type: 'number-input', 
        context: '### Növény növekedése\n\nKét növény fejlődését vizsgáltuk 5 héten keresztül. A sárga szaggatott vonal az árnyékos helyen lévő növényt jelöli.',
        question: 'Hány centiméter különbség van a két növény között az 5. hét végén? (Használd a grafikont!)', 
        correctAnswer: 190, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_plant_growth.svg' 
      },
      { 
        id: 'p1-6', 
        type: 'multiple-choice', 
        context: '### Mobil adatforgalom\n\nA kék oszlop a videónézést, a lila a közösségi médiát jelöli.',
        question: 'Hogyan változott az összesített adatforgalom januárhoz képest júniusra?', 
        options: ['Csökkent', 'Nőtt', 'Nem változott', 'Nem meghatározható'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_data_usage.svg' 
      },
      { 
        id: 'p1-7', 
        type: 'matching', 
        context: '### Víztározó\n\nA kék vonal a vízszintet, a szürke oszlopok a csapadékot jelölik.',
        question: 'Párosítsd a csapadékmennyiséget a hónapokkal!', 
        pairs: [
          { id: 'a', left: 'Legtöbb csapadék', right: 'Október' },
          { id: 'b', left: 'Legkevesebb csapadék', right: 'Augusztus' },
          { id: 'c', left: 'Közepes csapadék', right: 'Május' }
        ], 
        correctAnswer: null, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_reservoir.svg' 
      },
      { 
        id: 'p1-8', 
        type: 'number-input', 
        context: '### Könyvtár\n\nAz elmúlt hónapban összesen 400 könyvet kölcsönöztek ki a diákok.',
        question: 'Hány kalandregényt (kék szelet) vettek ki, ha ez a teljes forgalom 25%-a?', 
        correctAnswer: 100, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_library_books.svg' 
      },
      { 
        id: 'p1-9', 
        type: 'true-false', 
        context: '### Buszjárat késése\n\nA fekete pontok a tervezett, a kék pontok a tényleges érkezést jelzik.',
        question: 'Igaz-Hamis: Volt olyan megálló, ahol a busz pontosan érkezett (a két pont fedi egymást).', 
        options: ['Igaz', 'Hamis'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_bus_arrival.svg' 
      },
      { 
        id: 'p1-10', 
        type: 'number-input', 
        context: '### Kerékpártúra\n\nA szintvonal a túra tengerszint feletti magasságát mutatja.',
        question: 'Milyen magasra jutottak fel a túra legmagasabb pontján (méterben)?', 
        correctAnswer: 900, 
        points: 1, 
        image: '/assets/competency/probameres-1/probameres_1_elevation_profile.svg' 
      }
    ]
  },
  {
    id: 'probameres-2',
    name: 'Probamérés 2',
    topic: 'Alakzatok és vizuális logika',
    tasks: [
      { 
        id: 'p2-1', 
        type: 'multiple-choice', 
        context: '### Pótkulcs\n\nFeri kulcsot másoltat. A képen látható az eredeti kulcs és 4 választható mintázat.',
        question: 'Melyik mintázat (1-4) felel meg az eredeti kulcsnak?', 
        options: ['1. minta', '2. minta', '3. minta', '4. minta'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_key.svg' 
      },
      { 
        id: 'p2-2', 
        type: 'multiple-choice', 
        context: '### Hiányzó darab\n\nA négyzethálóban egy logikai szabály szerint követik egymást az alakzatok.',
        question: 'Melyik alakzat illik a kérdőjel helyére?', 
        options: ['A (Zöld kör)', 'B (Lila négyzet)', 'C (Sötét háromszög)', 'D (Narancs gyűrű)'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_missing.svg' 
      },
      { 
        id: 'p2-3', 
        type: 'multiple-choice', 
        context: '### Forgatott alakzat\n\nA felső kék háromszöget elforgattuk.',
        question: 'Melyik betűjelű (A, B, C) alakzatot kapjuk 180 fokos elforgatás után?', 
        options: ['A alakzat', 'B alakzat', 'C alakzat'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_rotated.svg' 
      },
      { 
        id: 'p2-4', 
        type: 'multiple-choice', 
        context: '### Árnyékkép\n\nEgy narancssárga alakzat árnyékát keressük.',
        question: 'Melyik fekete alakzat (A, B, C) a pontos árnyéka a fentinek?', 
        options: ['A alakzat', 'B alakzat', 'C alakzat'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_shadow.svg' 
      },
      { 
        id: 'p2-5', 
        type: 'multiple-choice', 
        context: '### Kockaháló\n\nA képen egy félig összeállított kocka és két lehetséges háló látható.',
        question: 'Melyik háló (A vagy B) hajtogatható össze úgy, hogy a kék-X-es lap a piros lap mellett legyen?', 
        options: ['A háló', 'B háló', 'Egyik sem'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_cube.svg' 
      },
      { 
        id: 'p2-6', 
        type: 'multiple-choice', 
        context: '### Szimmetria\n\nA piros szaggatott vonal a tükörtengely.',
        question: 'Melyik kiegészítés (A vagy B) teszi tengelyesen szimmetrikussá az alakzatot?', 
        options: ['A kiegészítés', 'B kiegészítés'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_symmetry.svg' 
      },
      { 
        id: 'p2-7', 
        type: 'multiple-choice', 
        context: '### Csempézés\n\nEgy hatszögletű csempékből álló mintát kell kiegészíteni.',
        question: 'Melyik forma (1, 2, 3) illik pontosan a kérdőjel helyére?', 
        options: ['1. (Kék hatszög)', '2. (Piros négyzet)', '3. (Zöld kör)'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_tiling.svg' 
      },
      { 
        id: 'p2-8', 
        type: 'multiple-choice', 
        context: '### Formasorozat\n\nA sorozat: Kör -> Négyzet -> Háromszög -> ?',
        question: 'Melyik alakzat legyen a következő a sorban a szabály alapján?', 
        options: ['A (Szürke kör)', 'B (Üres négyzet)', 'C (Kék rombusz)'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_series.svg' 
      },
      { 
        id: 'p2-9', 
        type: 'multiple-choice', 
        context: '### Átfedés\n\nKét áttetsző színes alakzatot fektettünk egymásra.',
        question: 'Melyik két alapformából állt össze a képen látható kompozíció?', 
        options: ['Kör + Négyzet', 'Háromszög + Kör', 'Négyzet + Háromszög'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_overlap.svg' 
      },
      { 
        id: 'p2-10', 
        type: 'multiple-choice', 
        context: '### Fogaskerekek\n\nHárom egymáshoz kapcsolódó fogaskerék (A, B, C).',
        question: 'Ha az "A" kerék az óramutató járásával MEGEGYEZŐEN forog, merre forog a "C" jelű?', 
        options: ['Megegyezően', 'Ellentétesen'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-2/probameres_2_puzzle_gears.svg' 
      }
    ]
  },
  {
    id: 'probameres-3',
    name: 'Probamérés 3',
    topic: 'Hálózatok és gráfok',
    tasks: [
      { 
        id: 'p3-1', 
        type: 'number-input', 
        context: '### Kórházi térkép\n\nMolli egy állatkórházban dolgozik. A térkép segít neki eligazodni a helyiségek között.',
        question: 'Hány helyiségen kell minimum áthaladni a BEJÁRAT-tól a RAKTÁR-ig (a bejáratot és a raktárt is beleértve)?', 
        correctAnswer: 4, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_hospital.svg' 
      },
      { 
        id: 'p3-2', 
        type: 'multiple-choice', 
        context: '### Buszhálózat\n\nA városi buszközlekedés csomópontjait vizsgáljuk.',
        question: 'Melyik megálló (stop) tekinthető központi átszállóhelynek (HUB), ahol több vonal is találkozik?', 
        options: ['Stop A', 'HUB X', 'Stop B', 'Stop C'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_bus.svg' 
      },
      { 
        id: 'p3-3', 
        type: 'multiple-choice', 
        context: '### Baráti kör\n\nA vonalak az ismeretségeket jelölik a gyerekek között.',
        question: 'A gráf alapján kinek van a legtöbb ismerőse (közvetlen kapcsolata)?', 
        options: ['Anna', 'Béla', 'Cecil', 'Dóra'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_social.svg' 
      },
      { 
        id: 'p3-4', 
        type: 'number-input', 
        context: '### Túraútvonalak\n\nA Start pontról a Cél felé tartunk.',
        question: 'Hány kilométer a legrövidebb út a Starttól a Célig?', 
        correctAnswer: 13, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_hiking.svg' 
      },
      { 
        id: 'p3-5', 
        type: 'multiple-choice', 
        context: '### Tápláléklánc\n\nA nyilak az energiaáramlást mutatják (ki kit eszik meg).',
        question: 'Melyik élőlény áll a tápláléklánc csúcsán (őt nem eszi meg senki a gráfban)?', 
        options: ['Fű', 'Szöcske', 'Egér', 'Sas'], 
        correctAnswer: 3, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_foodweb.svg' 
      },
      { 
        id: 'p3-6', 
        type: 'multiple-choice', 
        context: '### Munkafolyamat\n\nA szoftverfejlesztés lépéseit nyilak kötik össze.',
        question: 'Melyik fázist kell mindenképpen befejezni ahhoz, hogy az "A modul" és a "B modul" fejlesztése elkezdődhessen?', 
        options: ['START', 'TERV', 'TESZT'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_workflow.svg' 
      },
      { 
        id: 'p3-7', 
        type: 'multiple-choice', 
        context: '### Számítógépes hálózat\n\nAz ábrán egy irodai hálózat felépítése látható.',
        question: 'Melyik eszközön halad át az összes forgalom, ha a PC 1 adatot szeretne küldeni a Szervernek?', 
        options: ['PC 2', 'Router', 'Közvetlen a kapcsolat'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_network.svg' 
      },
      { 
        id: 'p3-8', 
        type: 'true-false', 
        context: '### Hidak\n\nHárom szigetet hidak kötnek össze.',
        question: 'Igaz-Hamis: Be lehet járni az összes szigetet úgy, hogy mindegyiket pontosan egyszer érintjük?', 
        options: ['Igaz', 'Hamis'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_bridges.svg' 
      },
      { 
        id: 'p3-9', 
        type: 'multiple-choice', 
        context: '### Céges hierarchia\n\nEgy vállalat szervezeti felépítését látjuk.',
        question: 'Kinek a közvetlen beosztottja DOLGOZÓ B?', 
        options: ['IGAZGATÓ', 'MENEDZSER 1', 'MENEDZSER 2'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_hierarchy.svg' 
      },
      { 
        id: 'p3-10', 
        type: 'multiple-choice', 
        context: '### Áramkör\n\nL1 és L2 két lámpát jelöl egy áramkörben.',
        question: 'Ha az elemről elindul az áram, melyik lámpa fog világítani (ha mindkét ág zárva van)?', 
        options: ['Csak L1', 'Csak L2', 'Mindkettő', 'Egyik sem'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-3/probameres_3_graph_circuit.svg' 
      }
    ]
  },
  {
    id: 'probameres-4',
    name: 'Probamérés 4',
    topic: 'Adatpárosítás és arányok',
    tasks: [
      { 
        id: 'p4-1', 
        type: 'multiple-choice', 
        context: '### Virágföld összetétele\n\nEgy kertészeti áruház háromféle anyagból keveri a virágföldet. A táblázat az összetevők mennyiségét mutatja literben.',
        question: 'Melyik ábra mutatja a táblázatban szereplő 5 : 2 : 3 arányt (Komposzt : Kerti föld : Homok)?', 
        options: ['A fenti ábra helyes', 'Az ábra hibás arányokat mutat', 'Hiányzik egy összetevő'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_soil.svg' 
      },
      { 
        id: 'p4-2', 
        type: 'multiple-choice', 
        context: '### Smoothie recept\n\nAz ábrán látható smoothie banánból (300ml), eperből (100ml) és joghurtból (100ml) áll.',
        question: 'A pohárban látható rétegek közül melyik alkotja a smoothie legnagyobb részét (60%)?', 
        options: ['Banán (sárga)', 'Eper (piros)', 'Joghurt (fehér)'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_smoothie.svg' 
      },
      { 
        id: 'p4-3', 
        type: 'multiple-choice', 
        context: '### Iskolai könyvtár\n\nA könyvtár állományának arányait kördiagram szemlélteti.',
        question: 'Ha a Regények aránya 50%, melyik szín jelöli ezt a kategóriát a diagramon?', 
        options: ['Kék', 'Narancs', 'Zöld'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_library.svg' 
      },
      { 
        id: 'p4-4', 
        type: 'multiple-choice', 
        context: '### Hulladék összetétel\n\nA grafikon a szelektív hulladékgyűjtő tartalmát mutatja.',
        question: 'Melyik anyagból van a legkevesebb (10%) a gyűjtőben a területi arányok alapján?', 
        options: ['Papír (kék)', 'Műanyag (zöld)', 'Fém (piros)'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_waste.svg' 
      },
      { 
        id: 'p4-5', 
        type: 'multiple-choice', 
        context: '### Választási eredmény\n\nA diagram a szavazatok megoszlását mutatja 40% - 40% - 20% arányban.',
        question: 'Melyik szín jelöli a legkisebb támogatottságú (20%) C pártot?', 
        options: ['Kék', 'Piros', 'Sárga'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_election.svg' 
      },
      { 
        id: 'p4-6', 
        type: 'multiple-choice', 
        context: '### Hátizsák súlya\n\nA táska összsúlya 8 kg, ebből a tankönyv 4 kg (50%).',
        question: 'Melyik szürke árnyalatú sáv jelöli a tankönyvek súlyát a hátizsák ábráján?', 
        options: ['Legfelső (legsötétebb)', 'Középső', 'Legalsó'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_backpack.svg' 
      },
      { 
        id: 'p4-7', 
        type: 'multiple-choice', 
        context: '### Légkör összetétele\n\nA Föld légkörének gázösszetételét egy négyzethálós ábrán szemléltetjük.',
        question: 'Melyik gáz foglalja el a legnagyobb területet (78%) az ábrán?', 
        options: ['Nitrogén (kék)', 'Oxigén (piros)', 'Egyéb gázok (fekete)'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_atmosphere.svg' 
      },
      { 
        id: 'p4-8', 
        type: 'multiple-choice', 
        context: '### Havi kiadás\n\nA család havi költségvetését gyűrűdiagramon ábrázoltuk.',
        question: 'Ha a Rezsí és az Étel költsége megegyezik (40-40%), melyik két szín tartozik ezekhez?', 
        options: ['Zöld és Narancs', 'Zöld és Kék', 'Narancs és Kék'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_budget.svg' 
      },
      { 
        id: 'p4-9', 
        type: 'multiple-choice', 
        context: '### Arany ötvözet\n\nEgy 20 grammos ékszer 15g aranyat, 3g ezüstöt és 2g rezet tartalmaz.',
        question: 'Milyen színű sáv jelöli az ezüstöt (15%) a vízszintes grafikonon?', 
        options: ['Sárga', 'Szürke', 'Narancs'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_jewel.svg' 
      },
      { 
        id: 'p4-10', 
        type: 'multiple-choice', 
        context: '### Kedvenc sportok\n\n20 diákot kérdeztünk meg a kedvenc sportjáról. 12 diák a focit választotta.',
        question: 'Az ábrán minden kör/négyzet egy diákot jelöl. Melyik jelcsoport mutatja a focistákat?', 
        options: ['Fekete körök', 'Kék négyzetek', 'Zöld négyzetek'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-4/probameres_4_data_icons.svg' 
      }
    ]
  },
  {
    id: 'probameres-5',
    name: 'Probamérés 5',
    topic: 'Valós életbeli számítások',
    tasks: [
      { 
        id: 'p5-1', 
        type: 'number-input', 
        context: '### Születésnap a játszóházban\n\nZalán születésnapját egy játszóházban tartják, ahol az árak a napszaktól és a naptól függenek.',
        question: 'Mennyibe fog kerülni a játszóház bérleti díja, ha kedden 14:00-tól 17:00-ig tartják a szülinapot (18 gyerek és 3 felnőtt kísérő)?', 
        correctAnswer: 9180, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_birthday.svg' 
      },
      { 
        id: 'p5-2', 
        type: 'multiple-choice', 
        context: '### Nyári munkabér\n\nEgy diák a héten különböző órákat dolgozott, és az órabére is növekedett a megnövekedett teher miatt.',
        question: 'Melyik megállapítás igaz a diák heti átlagos órabérére vonatkozóan a táblázat alapján?', 
        options: [
          'Az átlagos órabér pontosan 1500 Ft.',
          'Az órabér minden nap azonos volt.',
          'A hét második felében magasabb volt az órabér.',
          'Kevesebbet kapott, mint 1000 Ft óránként.'
        ], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_work.svg' 
      },
      { 
        id: 'p5-3', 
        type: 'multi-true-false', 
        context: '### Piaci bevásárlás\n\nAz árak kilogrammonként értendőek. Vizsgáld meg a bevásárlólistát!',
        question: 'Döntsd el az állításokról, hogy igazak vagy hamisak!', 
        pairs: [
          { id: 'tf1', left: 'Az alma drágább, mint a narancs.', right: false },
          { id: 'tf2', left: '3 kg banán többe kerül, mint 1000 Ft.', right: true },
          { id: 'tf3', left: 'Az összesített végösszeg 3100 Ft.', right: true }
        ], 
        correctAnswer: null, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_groceries.svg' 
      },
      { 
        id: 'p5-4', 
        type: 'true-false', 
        context: '### Osztálykirándulás\n\nA költségek a buszbérlésből és a színházjegyekből állnak össze.',
        question: 'Igaz-e, hogy ha 30 diák megy el a kirándulásra, akkor az összköltség meghaladja a 120 000 Ft-ot?', 
        options: ['Igaz', 'Hamis'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_trip.svg' 
      },
      { 
        id: 'p5-5', 
        type: 'multiple-choice', 
        context: '### Mobilnet számla\n\nA havi alapdíj 5GB-ot tartalmaz, ezen felül minden megkezdett GB extra díjjal jár.',
        question: 'Mi a legkedvezőbb döntés, ha valaki rendszeresen 10GB-ot forgalmaz havonta?', 
        options: [
          'Marad az alapcsomagnál és fizeti az extra díjat.',
          'Nagyobb adatcsomagra vált fix 5000 Ft-ért.',
          'Kevesebb internetet használ.',
          'Csak éjszaka internetezik.'
        ], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_mobile_data.svg' 
      },
      { 
        id: 'p5-6', 
        type: 'multi-true-false', 
        context: '### Fit-Mix Edzőterem\n\nA havi bérlet mellé személyi edzéseket is lehet kérni. Vizsgáld az árakat!',
        question: 'Mely állítások igazak a fitneszterem kínálatára?', 
        pairs: [
          { id: 'gym1', left: 'A havi bérlet 15 000 Ft-ba kerül.', right: true },
          { id: 'gym2', left: '4 személyi edzés összesen 16 000 Ft.', right: true },
          { id: 'gym3', left: 'Napi jegy nem váltható.', right: false }
        ], 
        correctAnswer: null, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_gym.svg' 
      },
      { 
        id: 'p5-7', 
        type: 'number-input', 
        context: '### Villanyszámla részletező\n\nA számla egy fix alapdíjból és a tényleges fogyasztás díjából áll.',
        question: 'Hány Ft a tényleges fogyasztás díja (alapdíj nélkül), ha a végösszeg 7200 Ft és az alapdíj 1200 Ft?', 
        correctAnswer: 6000, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_electricity.svg' 
      },
      { 
        id: 'p5-8', 
        type: 'multiple-choice', 
        context: '### Mozi délután\n\nDiákjegyeket és popcornt vásároltok a barátaiddal.',
        question: 'Melyik csomaggal járnak a legjobban a gyerekek?', 
        options: [
          'Külön jegy + külön popcorn (2600 Ft)',
          'Diák menü: jegy és közepes popcorn (2200 Ft)',
          'Családi jegy 4 főre (9000 Ft)',
          'Szerda délutáni kedvezmény (1800 Ft)'
        ], 
        correctAnswer: 3, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_cinema.svg' 
      },
      { 
        id: 'p5-9', 
        type: 'multi-true-false', 
        context: '### Pizza rendelés\n\nA Margarita alap ára 2500 Ft, minden extra feltét 500 Ft.',
        question: 'Döntsd el az állításokról, igazak vagy hamisak!', 
        pairs: [
          { id: 'piz1', left: 'Egy 3 feltétes pizza 4000 Ft.', right: true },
          { id: 'piz2', left: 'Két Margarita pizza ára 5000 Ft.', right: true },
          { id: 'piz3', left: 'A feltétek drágábbak, mint maga az alap.', right: false }
        ], 
        correctAnswer: null, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_pizza.svg' 
      },
      { 
        id: 'p5-10', 
        type: 'number-input', 
        context: '### Autókölcsönzés feltételei\n\nA bérlés díja a napok számától és a megtett kilométerektől függ.',
        question: 'Hány kilométert tehetünk meg összesen 2 nap alatt, hogy a bérleti díj ne lépje át a 40 000 Ft-ot (napidíj: 12000 Ft, km díj: 50 Ft)?', 
        correctAnswer: 320, 
        points: 1, 
        image: '/assets/competency/probameres-5/probameres_5_calc_car_rental.svg' 
      }
    ]
  },
  {
    id: 'probameres-6',
    name: 'Probamérés 6',
    topic: 'Utazás és időtervezés',
    tasks: [
      { 
        id: 'p6-1', 
        type: 'multiple-choice', 
        context: '### Könyvtár\n\nFeri a könyvtárba igyekszik, ahová három módon is el tud jutni. Most 16:55 van.',
        question: 'Melyik közlekedési mód a leggyorsabb számára, ha figyelembe veszi a sétát és a járatok indulását?', 
        options: ['A (Busszal)', 'B (Villamossal)', 'C (Biciklivel)'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_library.svg' 
      },
      { 
        id: 'p6-2', 
        type: 'number-input', 
        context: '### Könyvtár érkezés\n\nFeri számára a leggyorsabb a villamos volt. A sétája 12 percig tartott, és a villamos 17:10-kor indult.',
        question: 'Hány óra hány perckor ér a könyvtárba, ha a menetidő 15 perc? Írd be a percet (pl. 25)!', 
        correctAnswer: 25, 
        points: 1, 
        image: '/assets/competency/travel_library.svg' 
      },
      { 
        id: 'p6-3', 
        type: 'multiple-choice', 
        context: '### Edzésre menet\n\nSára 14:15-kor döntötte el, hogy elindul az edzésre. Figyeld a táblázat adatait!',
        question: 'Melyik választással érkezik meg a legkorábban?', 
        options: ['7-es busz', 'Gyalog', 'Rollerrel'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_sport.svg' 
      },
      { 
        id: 'p6-4', 
        type: 'number-input', 
        context: '### Mozi előtti találkozó\n\nZita 17:40-kor indul. A film 18:30-kor kezdődik.',
        question: 'Hány perccel a film kezdete előtt érkezik meg a leggyorsabb (Villamos) járattal?', 
        correctAnswer: 13, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_cinema.svg' 
      },
      { 
        id: 'p6-5', 
        type: 'multiple-choice', 
        context: '### Bolti bevásárlás\n\nAz üzlet 19:30-kor zár, te pedig 18:50-kor indulsz el otthonról.',
        question: 'Melyik módszerrel érsz oda a leggyorsabban, ha a buszra 12 percet gyalogolsz a megállóhoz?', 
        options: ['Gyalog', '12-es busz'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_shop.svg' 
      },
      { 
        id: 'p6-6', 
        type: 'number-input', 
        context: '### Iskola\n\nDávid 7:15-kor indul. A metróhoz 15 percet gyalogol, és a szerelvények 3 percenként járnak.',
        question: 'Ha a metróút 12 perc, hány óra hány perckor ér be az iskolába? Írd be a percet (7:XX)!', 
        correctAnswer: 45, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_school.svg' 
      },
      { 
        id: 'p6-7', 
        type: 'multiple-choice', 
        context: '### Koncertre utazás\n\nA koncert helyszínére vonat- vagy buszjárat közlekedik. Mindketten 19:10-kor indultok.',
        question: 'Melyik közlekedési eszközzel érkeztek meg korábban a koncertre?', 
        options: ['Vonat', 'Távolsági busz'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_concert.svg' 
      },
      { 
        id: 'p6-8', 
        type: 'number-input', 
        context: '### Uszoda\n\nAdél 9:30-kor indul. A trolihoz 8 percet sétál, és a troli minden óra 00, 10, 20... percében indul.',
        question: 'Hány percet tölt Adél összesen úton (séta + várakozás + 18 perc utazás)?', 
        correctAnswer: 28, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_swimming.svg' 
      },
      { 
        id: 'p6-9', 
        type: 'multiple-choice', 
        context: '### Zeneiskola\n\nBálintnak 15:25-kor kell elindulnia. A táblázat a lehetőségeit mutatja.',
        question: 'Melyik módon jut el hamarabb a zeneiskolába?', 
        options: ['Villamos', 'Gyalog'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_music.svg' 
      },
      { 
        id: 'p6-10', 
        type: 'number-input', 
        context: '### Látogatás a nagyihoz\n\nEszter 10:15-kor indul. Két járat közül választhat.',
        question: 'Hány perc a különbség a két járat érkezési ideje között (percben)?', 
        correctAnswer: 10, 
        points: 1, 
        image: '/assets/competency/probameres-6/probameres_6_travel_grandma.svg' 
      }
    ]
  },
  {
    id: 'probameres-7',
    name: 'Probamérés 7',
    topic: 'Összetett adatelemzés',
    tasks: [
      { 
        id: 'p7-1', 
        type: 'multi-choice', 
        context: 'Tomi délutáni időbeosztása és a sportorvos rendelési ideje látható az ábrán. Tomi 15:00-ig iskolában van, és nem akar lemaradni az edzéseiről sem.',
        question: 'Melyik nap(ok)on tud elmenni a sportorvoshoz? Jelöld meg az összes helyes választ!', 
        options: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
        correctAnswer: [0, 2, 4], 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_1.svg' 
      },
      { 
        id: 'p7-2', 
        type: 'multi-choice', 
        context: 'Négy barát moziba készül. Az ábrán látható a szabadidejük és a moziműsor (a filmek 90 percesek).',
        question: 'Melyik film(ek)re tudnak beülni mind a négyen egyszerre? Jelöld meg az összes helyes választ!', 
        options: ['A galaxis őrzői (14:15)', 'Űrkaland (15:30)', 'Csillagok között (16:00)', 'Mars mentőakció (17:15)'],
        correctAnswer: [1], 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_2.svg' 
      },
      { 
        id: 'p7-3', 
        type: 'multiple-choice', 
        context: 'A család nagyvásárlást tart. Két üzlet árait és a bevásárlólistát láthatod az ábrán.',
        question: 'Összességében melyik helyen fizetnek kevesebbet a teljes listáért?', 
        options: ['ABC Áruház', 'Piaci árusok', 'Mindkettő ugyanannyi', 'A budget-be egyik sem fér bele'],
        correctAnswer: 1,
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_3.svg' 
      },
      { 
        id: 'p7-4', 
        type: 'multi-choice', 
        context: 'Lili vonattal érkezik a pályaudvarra, majd busszal megy az iskolába. Az átszállás legalább 8 perc gyaloglást igényel.',
        question: 'Melyik vonat-busz párosítással ér be az iskola kezdésére (08:50)? Jelöld meg az összes jót!', 
        options: ['S70 (07:45) + 10-es busz', 'S71 (07:55) + 12-es busz', 'S70 (08:15) + 10-es busz', 'S71 (08:25) + 12-es busz'],
        correctAnswer: [0, 1, 2], 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_4.svg' 
      },
      { 
        id: 'p7-5', 
        type: 'multi-choice', 
        context: 'Az ábrán három termék tápanyagtartalma látható. A cél: legalább 10g fehérje és legfeljebb 10g cukor 100 grammban.',
        question: 'Melyik termék(ek) felelnek meg mindkét feltételnek egyszerre?', 
        options: ['Zabkása', 'Gyümölcsös joghurt', 'Natúr joghurt', 'Egyik sem'],
        correctAnswer: [0], 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_5.svg' 
      },
      { 
        id: 'p7-6', 
        type: 'multiple-choice', 
        context: 'Peti egy ritka könyvet keres. Két könyvtár nyitvatartása és a könyv állapota látható az ábrán.',
        question: 'Melyik nap és melyik könyvtárban tudja legkorábban megszerezni, ha 15:00-ig ér rá?', 
        options: ['Hétfő - Központi', 'Kedd - Ménfőcsanaki', 'Szerda - Központi', 'Csütörtök - Ménfőcsanaki'],
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_6.svg' 
      },
      { 
        id: 'p7-7', 
        type: 'multiple-choice', 
        context: 'Gábor mobilcsomagot választ. Havi 50 db SMS-t küld és 10 GB mobiladatot használ.',
        question: 'Melyik csomaggal jár anyagilag kedvezőbben a megadott használat mellett?', 
        options: ['"DIÁK" csomag', '"SZUPER" csomag', 'Egyenlő a költségük', 'Egyikben sem elég az adat'],
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_7.svg' 
      },
      { 
        id: 'p7-8', 
        type: 'multi-choice', 
        context: 'Az ábrán a hétvégi előrejelzés és három tervezett rendezvény feltételei láthatók.',
        question: 'Melyik rendezvény(eke)t lehet megrendezni az időjárás alapján? Jelöld meg az összes helyeset!', 
        options: ['Horgászverseny (Szo)', 'Koncert (Szo este)', 'Koncert (Vas este)', 'Kerékpár (Hé)'],
        correctAnswer: [0, 1], 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_8.svg' 
      },
      { 
        id: 'p7-9', 
        type: 'multiple-choice', 
        context: 'Süteményt sütünk 12 főre. Az ábrán a recept és az otthoni készlet látható.',
        question: 'Melyik összetevőből NINCS elegendő mennyiség a recepthez?', 
        options: ['Liszt', 'Cukor', 'Tojás', 'Vaj'],
        correctAnswer: 3, 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_9.svg' 
      },
      { 
        id: 'p7-10', 
        type: 'number-input', 
        context: 'Az elektromos művek nappali és éjszakai áramtarifát alkalmaz. A mosógép fogyasztása ciklusonként 2 kWh.',
        question: 'Hány forintba kerül a mosógép egyetlen ciklusa, ha este 23:00-kor indítjuk el?', 
        correctAnswer: 50, 
        points: 1, 
        image: '/assets/competency/probameres-7/probameres_7_10.svg' 
      }
    ]
  },
  {
    id: 'probameres-8',
    name: 'Probamérés 8',
    topic: 'Életszerű számítások',
    tasks: [
      {
        id: 'g7-p8-1',
        type: 'gap-fill',
        image: '💰',
        context: 'Barnus 9 hete minden héten 800 zedet félretett a zsebpénzéből, hogy focis kártyákat vegyen. Egy csomag kártya 350 zedbe kerül, és annyit szeretne venni belőle, amennyit csak tud.',
        question: 'Hány kártyacsomagot tud venni a félretett pénzéből, és mennyi pénze marad? Gépeld be a válaszodat!',
        gap_template: '[gap] csomagot tud venni, és marad még [gap] zedje.',
        correctAnswer: ['20', '200'],
        points: 1
      },
      {
        id: 'g7-p8-2',
        type: 'multiple-choice',
        image: '🚲',
        context: 'Egy kerékpárboltban minden modellre 20% kedvezmény jár ezen a héten. Marci kiszemelt egy 65 000 Ft-os túrakerékpárt.',
        question: 'Mennyit kell fizetnie Marcinak a kerékpárért a pénztárnál?',
        options: ['13 000 Ft', '52 000 Ft', '58 500 Ft', '55 000 Ft'],
        correctAnswer: 1,
        points: 1
      },
      {
        id: 'g7-p8-3',
        type: 'true-false',
        image: '🥾',
        context: 'Egy túracsoport egyenletesen halad a hegyen: 2 óra alatt 8 kilométert tesznek meg.',
        question: 'Igaz vagy Hamis? Ha ugyanezzel a tempóval haladnak tovább, akkor 5 óra alatt összesen 20 kilométert érnek el.',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1
      },
      {
        id: 'g7-p8-4',
        type: 'matching',
        image: '🍰',
        context: 'Egy cukrászda különleges máktortát készít. A recept szerint 300g mákhoz 150g cukor és 3 tojás szükséges.',
        question: 'Párosítsd össze a megváltoztatott alapanyag-mennyiségeket az eredeti arány megtartásával!',
        pairs: [
          { id: '1', left: '600g mák', right: '300g cukor' },
          { id: '2', left: '100g mák', right: '50g cukor' },
          { id: '3', left: '450g mák', right: '225g cukor' }
        ],
        correctAnswer: null,
        points: 1
      },
      {
        id: 'g7-p8-5',
        type: 'number-input',
        image: '📱',
        context: 'Lili mobilcsomagja 10 GB mobiladatot tartalmaz havonta. Ha túllépi a keretet, minden megkezdett 500 MB-ért 450 Ft-ot kell fizetnie. Lili ebben a hónapban 11,2 GB-ot forgalmazott.',
        question: 'Hány forint plusz költséggel terhelik meg a számláját? (Csak a számot írd be!)',
        correctAnswer: 1350,
        points: 1
      },
      {
        id: 'g7-p8-6',
        type: 'gap-fill',
        image: '🎨',
        context: 'Kati ki szeretné festeni a szobáját. Egy vödör festék (5 liter) 40 m² falfelületre elég. A szoba falainak és a plafonnak az összfelülete 112 m².',
        question: 'Hány vödör festéket kell vennie a teljes felületre, és mennyi festéke marad, ha minden vödröt teljesen felhasznál?',
        gap_template: 'Összesen [gap] vödröt kell vennie, és marad [gap] liter festéke.',
        correctAnswer: ['3', '1'],
        points: 1
      },
      {
        id: 'g7-p8-7',
        type: 'multiple-choice',
        image: '🚌',
        context: 'A teljes árú buszjegy 450 Ft. A diákjegy ára 90%-os kedvezménnyel vásárolható meg a bérlettel rendelkező tanulóknak.',
        question: 'Mennyibe kerül egy diákjegy?',
        options: ['45 Ft', '90 Ft', '405 Ft', '50 Ft'],
        correctAnswer: 0,
        points: 1
      },
      {
        id: 'g7-p8-8',
        type: 'true-false',
        image: '🏃',
        context: 'Egy futóedzésen 30 perc alatt 450 kalóriát égetünk el. A sportoló úgy dönt, hogy még 10 percet fut.',
        question: 'Igaz vagy Hamis? Ha a tempó nem változik, a további 10 perc alatt még pontosan 150 kalóriát éget el.',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 0,
        points: 1
      },
      {
        id: 'g7-p8-9',
        type: 'multi-choice',
        image: '🍕',
        context: 'Egy pizzázó hétvégi akciót hirdet: minden óriáspizza mellé 1 literes üdítő jár ingyen (értéke 600 Ft), VAGY 15% kedvezmény mindenre. Egy óriáspizza ára 5000 Ft.',
        question: 'Melyik állítás(ok) igazak két pizza rendelése esetén? Jelöld be a helyeseket!',
        options: [
          'Az üdítőket választva többet spórolunk, mint a 15%-kal.',
          'A 15% kedvezmény többet ér, mint a két ingyen üdítő.',
          'A két üdítő összértéke 1200 Ft.',
          'A 15% kedvezmény pontosan 1500 Ft-ot ér.'
        ],
        correctAnswer: [1, 2, 3],
        points: 1
      },
      {
        id: 'g7-p8-10',
        type: 'gap-fill',
        image: '🏦',
        context: 'Peti betett 120 000 Ft-ot a bankba éves 5%-os kamatra. év végén megkapja a kamatot, de az állam 15% kamatadót von le belőle.',
        question: 'Mennyi lesz a kamat összege az adó levonása után, és mennyi pénze lesz Petinek összesen a bankban az év végén?',
        gap_template: 'A nettó kamat [gap] Ft lesz, az év végi egyenleg pedig [gap] Ft.',
        correctAnswer: ['5100', '125100'],
        points: 1
      }
    ]
  },
  {
    id: 'probameres-9',
    name: 'Probamérés 9',
    topic: 'Logikai kiválasztás és Szabálykövetés',
    tasks: [
      {
        id: 'g7-p9-1',
        type: 'multi-choice',
        image: '/assets/competency/probameres-9/probameres_9_1.svg',
        context: 'Egy gyógyszergyárban a tabletták minőségét egy gép ellenőrzi. A gép a következő feltételek szerint választ ki tablettákat a levélből:\n- Legalább egy oszlopból 2 tablettát választ,\n- Minden sorból legalább 1 tablettát választ,\n- Az egész levélből legalább 3 tablettát választ.',
        question: 'Mely ábrák mutatják a gép szabályainak megfelelő választást? Válaszd ki az összes jót!',
        options: [
          '"A" ábra',
          '"B" ábra',
          '"C" ábra',
          '"D" ábra'
        ],
        correctAnswer: [0, 2],
        points: 1
      },
      {
        id: 'g7-p9-2',
        type: 'multi-choice',
        image: '/assets/competency/probameres-9/probameres_9_2.svg',
        context: 'Lili virágokat ültet a kertbe a következő szabályok szerint:\n- Legalább 3 virág legyen egy csoportban,\n- Két azonos színű virág nem kerülhet közvetlenül egymás mellé,\n- Minden csoportban kell lennie legalább egy sárga virágnak.',
        question: 'Melyik virág-összeállítások felelnek meg Lili szabályainak? Válassz ki minden helyeset!',
        options: [
          '"A" ábra',
          '"B" ábra',
          '"C" ábra',
          '"D" ábra'
        ],
        correctAnswer: [0, 2],
        points: 1
      },
      {
        id: 'g7-p9-3',
        type: 'multi-choice',
        image: '/assets/competency/probameres-9/probameres_9_3.svg',
        context: 'A technikai kiállításra való belépés feltételei a következők:\n- A kártyán szerepelnie kell a "DIÁK" vagy "TANÁR" feliratnak,\n- A kártya 2024 végéig érvényes feleljen meg (lejár: 2024.12 vagy később),\n- A kártyán lennie kell egy QR-kódnak az azonosításhoz.',
        question: 'Mely kártyákkal lehet belépni a kiállításra? Válassz ki minden helyeset!',
        options: [
          '"A" kártya',
          '"B" kártya',
          '"C" kártya',
          '"D" kártya'
        ],
        correctAnswer: [0, 3],
        points: 1
      },
      {
        id: 'g7-p9-4',
        type: 'multiple-choice',
        image: '📦',
        context: 'Egy futárszolgálat az alábbi csomagokat szállítja el alapáron:\n- A súly nem haladja meg a 10 kg-ot,\n- A hosszúság, szélesség és magasság összege max 150 cm,\n- Nem tartalmaz folyadékot.',
        question: 'Melyik csomagot szállítják el alapáron?',
        options: [
          '12 kg, 120 cm összméret, száraz áru',
          '8 kg, 160 cm összméret, száraz áru',
          '9 kg, 110 cm összméret, 1 liter olaj',
          '7 kg, 130 cm összméret, száraz áru'
        ],
        correctAnswer: 3,
        points: 1
      },
      {
        id: 'g7-p9-5',
        type: 'multi-choice',
        image: '🔑',
        context: 'A biztonságos jelszó feltételei a Skill-Up Akadémián:\n- Legalább 8 karakter hosszú,\n- Tartalmaz legalább egy számot,\n- Tartalmaz legalább egy nagybetűt.',
        question: 'Melyik jelszavak tekinthetők biztonságosnak a szabályok szerint?',
        options: [
          'Almafa123',
          'titokzatos',
          'Jelszo_2024',
          'ErősJelszó'
        ],
        correctAnswer: [0, 2],
        points: 1
      },
      {
        id: 'g7-p9-6',
        type: 'multi-choice',
        image: '🅿️',
        context: 'A parkolás szabályai a belvárosban:\n- Munkanapokon 8:00 és 18:00 között díjköteles,\n- Hétvégén és ünnepnapokon ingyenes,\n- Mozgáskorlátozott helyen csak engedéllyel lehet parkolni.',
        question: 'Melyik esetben parkol hatályos szabályok szerint a sofőr díjfizetés nélkül?',
        options: [
          'Péntek 19:00, normál helyen, nincs engedélye',
          'Kedd 10:00, normál helyen, nincs engedélye',
          'Szombat 14:00, mozgáskorlátozott helyen, nincs engedélye',
          'Vasárnap 09:00, normál helyen, nincs engedélye'
        ],
        correctAnswer: [0, 3],
        points: 1
      },
      {
        id: 'g7-p9-7',
        type: 'multiple-choice',
        image: '🛒',
        context: 'Bevásárlási szabályok Otitól:\n- Csak akkor vegyél tejet, ha az lejárata távolabbi mint 3 nap,\n- Ha veszel kenyeret, ne vegyél zsemlét,\n- Az összérték ne haladja meg az 5000 Ft-ot.',
        question: 'Melyik kosár felel meg Oti összes kérésének?',
        options: [
          'Tej (lejár holnap), Kenyér, Sajt (4200 Ft)',
          'Kenyér, Zsemle, Tej (lejár 5 nap múlva) (3500 Ft)',
          'Tej (lejár 6 nap múlva), Kenyér, Vaj (4800 Ft)',
          'Tej (lejár 5 nap múlva), Zsemle, Felvágott (5200 Ft)'
        ],
        correctAnswer: 2,
        points: 1
      },
      {
        id: 'g7-p9-8',
        type: 'true-false',
        image: '🎲',
        context: 'A "Gyorsasági" társasjáték szabálya: \n- Ha párosat dobsz, kétszer annyit léphetsz előre,\n- Ha 1-est dobsz, vissza kell menned a Start mezőre,\n- A játékot az nyeri, aki pontosan a 20-as mezőre érkezik.',
        question: 'Igaz vagy Hamis? Ha a 18-as mezőn állsz és 2-est dobsz, akkor megnyerted a játékot.',
        options: ['Igaz', 'Hamis'],
        correctAnswer: 1,
        points: 1
      },
      {
        id: 'g7-p9-9',
        type: 'multi-choice',
        image: '🎬',
        context: 'Mozizási feltételek a barátokkal:\n- A film legkorábban 16:00-kor kezdődhet,\n- Csak szinkronizált film jöhet szóba,\n- A film hossza ne legyen több 130 percnél.',
        question: 'Melyik filmek felelnek meg a baráti társaságnak?',
        options: [
          'Űrkalandok (16:15, szinkronizált, 110 perc)',
          'Sárkányok (15:30, feliratos, 120 perc)',
          'Vígjáték (18:00, szinkronizált, 140 perc)',
          'Hősök útja (17:45, szinkronizált, 105 perc)'
        ],
        correctAnswer: [0, 3],
        points: 1
      },
      {
        id: 'g7-p9-10',
        type: 'multiple-choice',
        image: '🚌',
        context: 'Buszjárat választási szabályok:\n- Az iskola 8:00-kor kezdődik, legalább 5 perccel előbb be kell érni,\n- Legfeljebb egy átszállást szeretnél,\n- Alacsonypadlós buszra van szükséged a kutyád miatt.',
        question: 'Melyik járatot választod?',
        options: [
          '7:15-kor indul, nincs átszállás, 7:45-re ér be, alacsonypadlós',
          '7:30-kor indul, 2 átszállás, 7:55-re ér be, alacsonypadlós',
          '7:20-kor indul, nincs átszállás, 7:58-ra ér be, alacsonypadlós',
          '7:10-kor indul, 1 átszállás, 7:40-re ér be, magaspadlós'
        ],
        correctAnswer: 0,
        points: 1
      }
    ]
  },
  {
    id: 'probameres-10',
    name: 'Probamérés 10',
    topic: 'Tájékozódás a térképen (v4)',
    tasks: [
      { 
        id: 'p10-1', 
        type: 'multiple-choice', 
        context: 'Csanád az édesapjával autózik. Az egyik útkereszteződés előtt az alábbi táblát látják.',
        question: 'Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják? (Szelespuszta egyenesen, Kispatak jobbra)', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_1.svg' 
      },
      { 
        id: 'p10-2', 
        type: 'multiple-choice', 
        context: 'Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?',
        question: 'Jelöld meg a helyes válasz betűjelét! (Cserkút egyenesen, Kispatak balra)', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_2.svg' 
      },
      { 
        id: 'p10-3', 
        type: 'multiple-choice', 
        context: 'Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?',
        question: 'Jelöld meg a helyes válasz betűjelét! (Cserkút egyenesen, Szelespuszta jobbra)', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_3.svg' 
      },
      { 
        id: 'p10-4', 
        type: 'multiple-choice', 
        context: 'Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?',
        question: 'Jelöld meg a helyes válasz betűjelét! (Révfülöp balra, Tóváros jobbra)', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_4.svg' 
      },
      { 
        id: 'p10-5', 
        type: 'multiple-choice', 
        context: 'Melyik betűvel jelzett nyíl mutatja a térképen, hogy hol vannak épp Csanádék, ha a nyilak az autók haladási irányát mutatják?',
        question: 'Jelöld meg a helyes válasz betűjelét! (Tóváros egyenesen, Partos balra)', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_5.svg' 
      },
      { 
        id: 'p10-6', 
        type: 'multiple-choice', 
        context: 'Ha a megjelölt pontban lévő autóban ülsz és a nyíl irányába nézel...',
        question: 'Melyik útjelző táblát (A, B, C vagy D) kell látnod magad előtt?', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_6.svg' 
      },
      { 
        id: 'p10-7', 
        type: 'multiple-choice', 
        context: 'Ha a megjelölt pontban lévő autóban ülsz és a nyíl irányába nézel...',
        question: 'Melyik útjelző táblát (A, B, C vagy D) kell látnod magad előtt?', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 1, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_7.svg' 
      },
      { 
        id: 'p10-8', 
        type: 'multiple-choice', 
        context: 'Ha a megjelölt pontban lévő autóban ülsz és a nyíl irányába nézel...',
        question: 'Melyik útjelző táblát (A, B, C vagy D) kell látnod magad előtt?', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 2, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_8.svg' 
      },
      { 
        id: 'p10-9', 
        type: 'multiple-choice', 
        context: 'Ha a megjelölt pontban lévő autóban ülsz és a nyíl irányába nézel...',
        question: 'Melyik útjelző táblát (A, B, C vagy D) kell látnod magad előtt?', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 0, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_9.svg' 
      },
      { 
        id: 'p10-10', 
        type: 'multiple-choice', 
        context: 'Ha a megjelölt pontban lévő autóban ülsz és a nyíl irányába nézel...',
        question: 'Melyik útjelző táblát (A, B, C vagy D) kell látnod magad előtt?', 
        options: ['A', 'B', 'C', 'D'], 
        correctAnswer: 3, 
        points: 1, 
        image: '/assets/competency/probameres-10/probameres_10_orient_10.svg' 
      }
    ]
  }
];


const GRADE_6_TOPICS_DATA: MonthlyCompetency[] = [
  { id: 'g6-topic-1-1', name: 'Számok világa', topic: 'Számfogalom, helyiértékek, számhalmazok', tasks: [{ id: 'g6-topic-1-1-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-1-2', name: 'Műveletmester', topic: 'Alapműveletek, sorrend, kerekítés', tasks: [{ id: 'g6-topic-1-2-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-1-3', name: 'Mérőműhely', topic: 'Mértékegységek, átváltások, időszámítás', tasks: [{ id: 'g6-topic-1-3-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-1-4', name: 'Oszthatósági kaland', topic: 'Osztók, többszörösök, szabályok', tasks: [{ id: 'g6-topic-1-4-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-2-1', name: 'Összefüggések', topic: 'Hozzárendelések, táblázatok, grafikonok', tasks: [{ id: 'g6-topic-2-1-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-2-2', name: 'Aránypárok', topic: 'Egyenes és fordított arányosság', tasks: [{ id: 'g6-topic-2-2-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-2-3', name: 'Betűs kifejezések', topic: 'Paraméterek, egyenletek, egyenlőtlenségek', tasks: [{ id: 'g6-topic-2-3-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-2-4', name: 'Mintázatok & Sorok', topic: 'Sorozatok, szabálykövetés', tasks: [{ id: 'g6-topic-2-4-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-3-1', name: 'Síkgeometria', topic: 'Síkbeli alakzatok, transzformációk, terület-kerület', tasks: [{ id: 'g6-topic-3-1-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-3-2', name: 'Térgeometria', topic: 'Testek ábrázolása, paraméterei, felszín-térfogat', tasks: [{ id: 'g6-topic-3-2-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-3-3', name: 'Iránytű', topic: 'Tájékozódás, irányok, koordináta-rendszer', tasks: [{ id: 'g6-topic-3-3-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-1', name: 'Adatgyűjtés', topic: 'Statisztikai adatok gyűjtése, elemzése', tasks: [{ id: 'g6-topic-4-1-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-2', name: 'Grafikonmágus', topic: 'Adatábrázolás különböző formákban', tasks: [{ id: 'g6-topic-4-2-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-3', name: 'Átlagszámítás', topic: 'Statisztikai számítások: átlag, medián, módusz', tasks: [{ id: 'g6-topic-4-3-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-4', name: 'Elemző műhely', topic: 'Statisztikai módszerek és értelmezés', tasks: [{ id: 'g6-topic-4-4-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-5', name: 'Szerencsefaktor', topic: 'Valószínűség-számítás alapjai', tasks: [{ id: 'g6-topic-4-5-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-6', name: 'Lehetőségek száma', topic: 'Kombinatorika, összeszámlálás', tasks: [{ id: 'g6-topic-4-6-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-7', name: 'Útvonaltervező', topic: 'Eseménygrafok, élek és utak', tasks: [{ id: 'g6-topic-4-7-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-8', name: 'Halmazok világa', topic: 'Halmazműveletek és tulajdonságok', tasks: [{ id: 'g6-topic-4-8-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] },
  { id: 'g6-topic-4-9', name: 'Logikai fejtörők', topic: 'Logikai műveletek és igazságértékek', tasks: [{ id: 'g6-topic-4-9-p', type: 'number-input', question: 'Ez a témakör hamarosan bővül feladatokkal! Írd be a 0-t a folytatáshoz.', correctAnswer: 0, points: 1, context: 'Témakörönkénti felkészülés' }] }
];

export const COMPETENCY_DATA: Record<number, MonthlyCompetency[]> = {
  4: GRADE_4_DATA,
  5: GRADE_5_DATA,
  6: [...GRADE_6_DATA, ...GRADE_6_TOPICS_DATA],
  7: GRADE_7_DATA
};

