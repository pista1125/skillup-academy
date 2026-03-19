const fs = require('fs');
const path = 'c:/Users/Istvan/PycharmProjects/skillup-academy/src/data/competencyData.ts';

// We'll read the file and replace the part from "const GRADE_5_DATA" to the end of the array.
let content = fs.readFileSync(path, 'utf8');

const g5StartMarker = 'const GRADE_5_DATA: MonthlyCompetency[] = [';
const g5StartIndex = content.indexOf(g5StartMarker);

if (g5StartIndex === -1) {
    console.error('Marker not found');
    process.exit(1);
}

const head = content.substring(0, g5StartIndex + g5StartMarker.length);

const g5DataContent = `
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
      { id: 'g5-sep-6', type: 'number-input', image: '🧱', context: 'A számokat helyiértékek szerint भी felépíthetjük: 3 * 100 000 + 4 * 10 000 + 5 * 1000 + 2 * 10.', question: 'Melyik számot kapjuk meg, ha összeadjuk ezeket az értékeket?', correctAnswer: 345020, points: 1 },
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
    { id: 'g5-feb-5', type: 'number-input', image: '🟦', context: 'A padlóburkoláshoz 1 meggyzetméternyi területet kell átszámolnunk kisebb egységekre.', question: 'Hány négyzetdeciméter (dm²) van 1 négyzetméterben (m²)?', correctAnswer: 100, points: 1 },
    { id: 'g5-feb-6', type: 'true-false', image: '📑', context: 'A téglalap oldalai közötti kapcsolatokat tanulmányozzuk geometria órán.', question: 'Igaz vagy Hamis? Egy téglalap szemközti oldalai mindig egyenlő hosszúak.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 },
    { id: 'g5-feb-7', type: 'matching', image: '📐', context: 'A képletek segítenek a gyors számolásban. Párosítsd az alakzatokat a hozzájuk tartozó kerület/terület képlettel!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Téglalap K', right: '2*(a+b)' }, { id: '2', left: 'Téglalap T', right: 'a*b' }, { id: '3', left: 'Négyzet K', right: '4*a' }], correctAnswer: null, points: 1 },
    { id: 'g5-feb-8', type: 'multiple-choice', image: '⚖️', context: 'Két különböző méretű területet akarunk összehasonlítani.', question: 'Melyik terület a nagyobb: 1 m² vagy 100 cm²?', options: ['1 m²', '100 cm²', 'Egyformák', 'Nem összehasonlíthatóak'], correctAnswer: 0, points: 1 },
    { id: 'g5-feb-9', type: '🏠', context: 'Egy konyha alaprajza 3 méter széles és 4 méter hosszú.', question: 'Hány négyzetméter járólap kell a konyha padlójára?', correctAnswer: 12, points: 1 },
    { id: 'g5-feb-10', type: 'true-false', image: '🚧', context: 'A kerítés és a telek területe közötti különbséget beszéljük meg.', question: 'Igaz vagy Hamis? A kerület az alakzatot határoló vonal hossza.', options: ['Igaz', 'Hamis'], correctAnswer: 0, points: 1 }
  ]},
  { id: 'march', name: 'Március', topic: 'Mértékegységek és Testek', tasks: [
    { id: 'g5-mar-1', type: 'number-input', image: '🏃', context: 'A maratoni futó 1,5 kilométert tett meg a bemelegítés során.', question: 'Hány méternek felel meg ez a távolság?', correctAnswer: 1500, points: 1 },
    { id: 'g5-mar-2', type: 'number-input', image: '⚖️', context: 'A konyhai mérlegen 2,5 kg lisztet mértünk le a süteményekhez.', question: 'Hány gramm lisztet mértünk le összesen?', correctAnswer: 2500, points: 1 },
    { id: 'g5-mar-3', type: 'multiple-choice', image: '🥛', context: 'A tejeskannában pontosan 1 liter tej van.', question: 'Hány deciliter (dl) tej van 1 literben?', options: ['10', '100', '1000', '1'], correctAnswer: 0, points: 1 },
    { id: 'g5-mar-4', type: 'number-input', image: '🧊', context: 'Egy nagy kockát építettünk össze kisebb, 1 cm élű kockákból. Ha a nagy kocka éle 2 cm...', question: 'Hány darab kis kockára volt szükségünk az építéshez?', correctAnswer: 8, points: 1 },
    { id: 'g5-mar-5', type: 'multiple-choice', image: '📦', context: 'Egy papírdobozt vizsgálunk, ami téglatest alakú.', question: 'Hány lapja (oldala) van összesen egy téglatestnek?', options: ['4', '6', '8', '12'], correctAnswer: 1, points: 1 },
    { id: 'g5-mar-6', type: 'number-input', image: '⏲️', context: 'Egy kalandfilm pontosan 3 órán keresztül tartott a moziban.', question: 'Hány percig ültünk a moziteremben?', correctAnswer: 180, points: 1 },
    { id: 'g5-mar-7', type: 'matching', image: '📏', context: 'Minden tulajdonságnak megvan a maga alapmértékegysége. Párosítsd őket!', question: 'Párosítsd össze!', pairs: [{ id: '1', left: 'Hosszúság', right: 'méter (m)' }, { id: '2', left: 'Tömeg', right: 'kilogramm (kg)' }, { id: '3', left: 'Idő', right: 'másodperc (s)' }], correctAnswer: null, points: 1 },
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

const tail = \`
export const COMPETENCY_DATA: Record<number, MonthlyCompetency[]> = {
  4: GRADE_4_DATA,
  5: GRADE_5_DATA
};
\`;

const finalContent = head + g5DataContent + tail;

// Write with explicit UTF-8 and NO BOM
fs.writeFileSync(path, finalContent, { encoding: 'utf8' });
console.log('Fixed encoding and restored data.');

// Delete temp file if exists
if (fs.existsSync('c:/Users/Istvan/PycharmProjects/skillup-academy/src/data/fix_encoding.js')) {
    // We can't delete ourselves while running easily on some systems, but it's fine.
}
