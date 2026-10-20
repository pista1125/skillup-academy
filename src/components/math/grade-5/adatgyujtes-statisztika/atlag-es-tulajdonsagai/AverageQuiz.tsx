import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { AverageMatcher } from './AverageMatcher';
import { AverageSorter } from './AverageSorter';

export interface AverageQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const AVERAGE_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: A SZÁMTANI KÖZÉP KISZÁMÍTÁSA ÉS ALAPJAI (1-10)
  // =========================================================================
  {
    id: 'avg1-1',
    level: 1,
    prompt: 'Hogyan számoljuk ki több szám számtani közepét (átlagát)?',
    options: [
      'Összeadjuk a számokat, majd az összeget elosztjuk a számok darabszámával.',
      'Kiválasztjuk a leggyakoribb számot.',
      'A legnagyobb számból kivonjuk a legkisebb számot.',
      'Összeszorozzuk a számokat, majd elosztjuk kettővel.'
    ],
    correctAnswer: 0,
    explanation: 'A számtani közép (átlag) képlete: Átlag = Adatok összege : Adatok darabszáma.',
    hint: 'Először a közös „kalapba” tesszük mindet (összeadás), majd egyenlően elosztjuk.'
  },
  {
    id: 'avg1-2',
    level: 1,
    prompt: 'Mennyi a 6 és a 10 számtani közepe (átlaga)?',
    options: [
      '8',
      '16',
      '7',
      '9'
    ],
    correctAnswer: 0,
    explanation: 'A két szám összege: 6 + 10 = 16. Két szám van, így osztunk kettővel: 16 : 2 = 8.',
    hint: 'Add össze a kettőt, majd felezd meg az eredményt!'
  },
  {
    id: 'avg1-3',
    level: 1,
    prompt: 'Peti matematikából a következő három jegyet kapta: 3, 4, 5. Mennyi az átlaga?',
    options: [
      '4,0',
      '3,5',
      '4,5',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'A jegyek összege: 3 + 4 + 5 = 12. Darabszám: 3. Átlag: 12 : 3 = 4,0.',
    hint: '3 + 4 + 5 = 12. Ezt oszd el 3-mal!'
  },
  {
    id: 'avg1-4',
    level: 1,
    prompt: 'Egy héten a napi középhőmérsékletek hétfőn 14 °C, kedden 18 °C, szerdán 16 °C voltak. Mennyi e 3 nap átlaghőmérséklete?',
    options: [
      '16 °C',
      '15 °C',
      '17 °C',
      '48 °C'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 14 + 18 + 16 = 48 °C. Napok száma: 3. Átlag: 48 : 3 = 16 °C.',
    hint: '14 + 18 + 16 = 48. Mennyi 48 osztva 3-mal?'
  },
  {
    id: 'avg1-5',
    level: 1,
    prompt: 'Lehet-e az átlag tizedestört, ha az összes kiinduló adat egész szám volt?',
    options: [
      'Igen, nagyon gyakran (például 4 és 5 átlaga 4,5).',
      'Nem, egész számok átlaga kizárólag egész szám lehet.',
      'Csak akkor, ha 10-nél több számot adunk össze.',
      'Csak negatív számok esetén.'
    ],
    correctAnswer: 0,
    explanation: 'Igen, az osztás eredménye nagyon sokszor nem egész szám. Például (4 + 5) : 2 = 9 : 2 = 4,5.',
    hint: 'Gondolj az iskolai félévi bizonyítvány átlagokra: van 4,33 vagy 4,5 is!'
  },
  {
    id: 'avg1-6',
    level: 1,
    prompt: 'Ha egy öttagú csoportban mindenkinek pontosan 7 ceruzája van, mennyi az egy főre jutó ceruzák átlaga?',
    options: [
      '7 ceruza',
      '35 ceruza',
      '5 ceruza',
      '1 ceruza'
    ],
    correctAnswer: 0,
    explanation: 'Ha az összes adat azonos (mindegyik 7), akkor az átlaguk pontosan megegyezik ezzel az értékkel: (7 + 7 + 7 + 7 + 7) : 5 = 35 : 5 = 7.',
    hint: 'Ha mindenki egyforma magasságú tornyot épít, hol van a kiegyenlített szint?'
  },
  {
    id: 'avg1-7',
    level: 1,
    prompt: 'Egy dolgozaton négy tanuló pontszáma: 10, 20, 30 és 40 pont. Mennyi a négy diák átlagpontszáma?',
    options: [
      '25 pont',
      '20 pont',
      '30 pont',
      '100 pont'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 10 + 20 + 30 + 40 = 100 pont. Diákok száma: 4. Átlag: 100 : 4 = 25 pont.',
    hint: '100 : 4 = ?'
  },
  {
    id: 'avg1-8',
    level: 1,
    prompt: 'Mit mond ki a közrefogási tulajdonság a számtani középre?',
    options: [
      'Az átlag mindig a legkisebb és a legnagyobb adat közé esik.',
      'Az átlag mindig pontosan a középső sorszámú adat.',
      'Az átlag mindig nagyobb a legnagyobb adatnál.',
      'Az átlag mindig kisebb a legkisebb adat felénél.'
    ],
    correctAnswer: 0,
    explanation: 'A számtani közép sosem lehet kisebb a legkisebb értéknél, és sosem lehet nagyobb a legnagyobbnál (Minimum ≤ Átlag ≤ Maximum).',
    hint: 'Lehet-e a jegyeid átlaga 5-nél nagyobb, ha a legjobb jegy az 5-ös?'
  },
  {
    id: 'avg1-9',
    level: 1,
    prompt: 'Négy szám: 2, 4, 6 és 8. Mennyi az átlaguk?',
    options: [
      '5',
      '4',
      '6',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 2 + 4 + 6 + 8 = 20. Darabszám: 4. Átlag: 20 : 4 = 5.',
    hint: '2 + 8 = 10, 4 + 6 = 10, összesen 20. 20 osztva 4-gyel.'
  },
  {
    id: 'avg1-10',
    level: 1,
    prompt: 'A kiegyenlítés elve szerint, ha kiszámoljuk minden adat eltérését az átlagtól, mennyi lesz ezen eltérések összege?',
    options: [
      'Mindig pontosan 0',
      'Mindig 100',
      'Megegyezik a darabszámmal',
      'Mindig az adatok összege'
    ],
    correctAnswer: 0,
    explanation: 'A pozitív eltérések (többletek) és a negatív eltérések (hiányok) összege tökéletesen kioltja egymást, összegük mindig zérus (0).',
    hint: 'Gondolj a mérlegre: a két kar tökéletesen kiegyensúlyozza egymást.'
  },

  // =========================================================================
  // 2. SZINT: TULAJDONSÁGOK, ÚJ ADATOK ÉS VISSZAFELÉ SZÁMOLÁS (11-20)
  // =========================================================================
  {
    id: 'avg2-1',
    level: 2,
    prompt: 'Kati jelenlegi matematika átlaga 4,2. A következő dolgozatára 5-öst kap. Hogyan változik Kati átlaga?',
    options: [
      'Növekszik (feljebb megy).',
      'Csökken (lejjebb megy).',
      'Pontosan 4,2 marad, nem változik.',
      'Azonnal 5,0 lesz.'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az új érdemjegy (5) nagyobb a meglévő átlagnál (4,2), az új adat felfelé húzza az átlagot.',
    hint: 'Ha valami jobb az eddigi átlagnál, az javítja vagy rontja az eredményt?'
  },
  {
    id: 'avg2-2',
    level: 2,
    prompt: 'Dániel átlaga történelemből pontosan 4,0. Kap egy újabb 4-es érdemjegyet. Hogyan alakul az új átlaga?',
    options: [
      'Változatlan marad (továbbra is pontosan 4,0).',
      'Növekszik 4,1-re.',
      'Csökken 3,9-re.',
      'Nem lehet kiszámítani a korábbi jegyek száma nélkül.'
    ],
    correctAnswer: 0,
    explanation: 'Ha az új adat értéke pontosan megegyezik az eddigi átlaggal, a számtani közép értéke nem változik.',
    hint: 'Ha az átlaggal megegyező elemet adunk hozzá, a kiegyensúlyozott szint nem mozdul el.'
  },
  {
    id: 'avg2-3',
    level: 2,
    prompt: 'Bori átlaga 4,5. A mai témazárójára 2-est kapott. Mi történik az átlagával?',
    options: [
      'Csökken (leromlik).',
      'Növekszik.',
      'Változatlan marad.',
      'Nem számít bele az átlagba.'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a 2-es kisebb az eddigi 4,5-ös átlagnál, az átlag értéke lecsökken.',
    hint: '2 < 4,5, így lefelé húzza a mérleget.'
  },
  {
    id: 'avg2-4',
    level: 2,
    prompt: 'Öt szám átlaga 6. Mennyi az öt szám összege?',
    options: [
      '30 (mivel 5 × 6 = 30)',
      '11',
      '1,2',
      '60'
    ],
    correctAnswer: 0,
    explanation: 'A visszafelé számolás képlete: Összeg = Átlag × Darabszám. Tehát 6 × 5 = 30.',
    hint: 'Ha 5 ember mindegyikének átlagosan 6 almája van, összesen hány almájuk van?'
  },
  {
    id: 'avg2-5',
    level: 2,
    prompt: 'Péter 3 dolgozatot írt, jegyei: 5, 4, 3 (összegük 12). Hányast kell kapnia a 4. dolgozatra, hogy a 4 jegy átlaga pontosan 4,0 legyen?',
    options: [
      '4-est (mert 4 × 4 = 16 kell legyen az összeg, 16 − 12 = 4)',
      '5-öst',
      '3-ast',
      '2-est'
    ],
    correctAnswer: 0,
    explanation: 'A 4 dolgozat kívánt összege: 4 × 4 = 16. A meglévő három jegy összege: 5 + 4 + 3 = 12. A hiányzó 4. jegy: 16 − 12 = 4.',
    hint: 'Számold ki az új kívánt összeget (4 × 4 = 16), majd vond ki a meglévő összeget (12)!'
  },
  {
    id: 'avg2-6',
    level: 2,
    prompt: 'Egy 20 fős osztályban a zsebpénzek átlaga 3000 Ft. A szülők úgy döntenek, hogy minden diák zsebpénzét felemelik pontosan 500 Ft-tal. Mennyi lesz az új átlagos zsebpénz?',
    options: [
      '3500 Ft (az átlag is pontosan 500 Ft-tal nő)',
      '3025 Ft',
      '4000 Ft',
      'Nem változik az átlag'
    ],
    correctAnswer: 0,
    explanation: 'Eltolási szabály: Ha minden adathoz hozzáadunk egy állandó értéket (+500 Ft), az átlag is pontosan ezzel az értékkel nő: 3000 + 500 = 3500 Ft.',
    hint: 'Ha mindenkinek 500 Ft-tal több van a zsebében, akkor az egy főre jutó átlag is pontosan 500 Ft-tal több.'
  },
  {
    id: 'avg2-7',
    level: 2,
    prompt: 'Melyik a helyes számítási művelet számológépen az 5, 7 és 12 számok átlagának kiszámítására?',
    options: [
      '(5 + 7 + 12) : 3',
      '5 + 7 + 12 : 3',
      '5 + (7 + 12 : 3)',
      '5 × 7 × 12 : 3'
    ],
    correctAnswer: 0,
    explanation: 'Zárójel nélkül a számológép műveleti sorrend szerint először a 12 : 3 = 4 osztást végezné el! Ezért kötelező a zárójel: (5 + 7 + 12) : 3 = 24 : 3 = 8.',
    hint: 'Először a teljes összeget kell képezni, csak utána szabad osztani!'
  },
  {
    id: 'avg2-8',
    level: 2,
    prompt: 'Télen a hajnali hőmérséklet −2 °C, a kora délutáni hőmérséklet +6 °C volt. Mennyi e két mérés számtani közepe?',
    options: [
      '+2 °C',
      '+4 °C',
      '0 °C',
      '+3 °C'
    ],
    correctAnswer: 0,
    explanation: 'A két szám összege: (−2) + (+6) = +4. Két mérés volt, így: 4 : 2 = +2 °C.',
    hint: '−2 + 6 = 4. Ennek a fele mennyi?'
  },
  {
    id: 'avg2-9',
    level: 2,
    prompt: 'Három nap átlagos napi lépésszáma 8000 lépés volt. Hétfőn 7000, kedden 9000 lépést tettünk meg. Hány lépést tettünk szerdán?',
    options: [
      '8000 lépést (összesen 24 000 kell legyen, 7000 + 9000 = 16 000, 24 000 − 16 000 = 8000)',
      '10 000 lépést',
      '6000 lépést',
      '7500 lépést'
    ],
    correctAnswer: 0,
    explanation: 'A 3 nap összes lépésszáma: 3 × 8000 = 24 000. Hétfő és kedd összege: 7000 + 9000 = 16 000. Szerda: 24 000 − 16 000 = 8000 lépés.',
    hint: '3 × 8000 = 24 000. Ebből vond ki a 16 000-et!'
  },
  {
    id: 'avg2-10',
    level: 2,
    prompt: 'Egy autó 2 óra alatt 120 km-t, majd a következő 1 órában 60 km-t tett meg. Mekkora volt az átlagsebessége a teljes 3 órás út során?',
    options: [
      '60 km/h (Összes út: 180 km, összes idő: 3 óra, 180 : 3 = 60)',
      '90 km/h',
      '70 km/h',
      '50 km/h'
    ],
    correctAnswer: 0,
    explanation: 'Átlagsebesség = Összes megtett út : Összes eltelt idő = (120 + 60) km : (2 + 1) h = 180 km : 3 h = 60 km/h.',
    hint: 'Összes kilométer osztva az összes órával!'
  },

  // =========================================================================
  // 3. SZINT: CSOPORTOK ÖSSZEVONÁSA, KIUGRÓ ÉRTÉKEK ÉS PROBLÉMAMEGOLDÁS (21-30)
  // =========================================================================
  {
    id: 'avg3-1',
    level: 3,
    prompt: 'Egy 10 fős csoport átlaga 4,0. Egy másik, szintén 10 fős csoport átlaga 5,0. Mennyi a két csoport összevont, közös átlaga?',
    options: [
      '4,5 (mivel a létszámuk azonos, az átlaguk a két átlag fele)',
      '4,0',
      '5,0',
      '9,0'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a két csoport létszáma azonos (10-10 fő), a közös átlag valóban a két átlag számtani közepe: (4,0 + 5,0) : 2 = 4,5. (Összesen: 40 + 50 = 90 pont, 90 : 20 = 4,5).',
    hint: 'Mindkét csoport azonos súllyal szerepel a közös átlagban.'
  },
  {
    id: 'avg3-2',
    level: 3,
    prompt: 'Az 5.A osztályban 10 tanuló átlaga 3,0 (összeg: 30). Az 5.B osztályban 20 tanuló átlaga 6,0 (összeg: 120). Mennyi a 30 tanuló együttes átlaga?',
    options: [
      '5,0 (összesen 150 pont : 30 fő = 5,0)',
      '4,5',
      '4,0',
      '6,0'
    ],
    correctAnswer: 0,
    explanation: 'Összes pont: 10 × 3 + 20 × 6 = 30 + 120 = 150. Összes tanuló: 10 + 20 = 30 fő. Közös átlag: 150 : 30 = 5,0. Figyelem: NEM (3 + 6) : 2 = 4,5, mert a B osztályban kétszer annyian vannak!',
    hint: 'Számold ki a két osztály összes pontját külön-külön, add össze őket, és oszd 30-cal!'
  },
  {
    id: 'avg3-3',
    level: 3,
    prompt: 'Egy kisvállalkozásnál 4 dolgozó fizetése fejenként 250 000 Ft. Az igazgató fizetése 1 250 000 Ft. Mennyi az 5 munkatárs átlagfizetése?',
    options: [
      '450 000 Ft (Összesen 2 250 000 Ft : 5 fő)',
      '250 000 Ft',
      '350 000 Ft',
      '750 000 Ft'
    ],
    correctAnswer: 0,
    explanation: 'Összes bér: 4 × 250 000 + 1 250 000 = 1 000 000 + 1 250 000 = 2 250 000 Ft. Átlag: 2 250 000 : 5 = 450 000 Ft. Ez jól mutatja a kiugró érték (outlier) torzító hatását!',
    hint: 'Add össze az 5 ember fizetését: 4 dolgozó + 1 igazgató, majd oszd el 5-tel!'
  },
  {
    id: 'avg3-4',
    level: 3,
    prompt: 'Gergő 4 dolgozatának átlaga 4,25. Tudjuk, hogy az első három dolgozata 4-es, 5-ös és 5-ös lett. Mennyi lett a 4. dolgozatának érdemjegye?',
    options: [
      '3-as (mivel a kívánt összeg 4 × 4,25 = 17, és 17 − (4 + 5 + 5) = 17 − 14 = 3)',
      '4-es',
      '5-ös',
      '2-es'
    ],
    correctAnswer: 0,
    explanation: '4 dolgozat összege: 4 × 4,25 = 17. Az első három jegy összege: 4 + 5 + 5 = 14. A 4. jegy: 17 − 14 = 3.',
    hint: 'Mennyi 4 × 4,25? Ebből vond ki a meglévő jegyek összegét (14)!'
  },
  {
    id: 'avg3-5',
    level: 3,
    prompt: 'Mi történik egy számsor átlagával, ha a számsor minden egyes tagját megszorozzuk 3-mal?',
    options: [
      'Az átlag értéke is pontosan a 3-szorosára nő.',
      'Az átlag változatlan marad.',
      'Az átlaghoz hozzáadódik 3.',
      'Az átlag a harmadára csökken.'
    ],
    correctAnswer: 0,
    explanation: 'Nyújtási szabály: Ha minden adatot megszorzunk k-val, a számtani közép is pontosan a k-szorosára változik.',
    hint: 'Ha mindenki háromszor annyi pontot kap, az átlagpontszám is háromszoros lesz.'
  },
  {
    id: 'avg3-6',
    level: 3,
    prompt: 'Egy számsor átlaga 10. Két adat kisebb 10-nél, eltérésük az átlagtól: −3 és −4. Mennyi a harmadik adat eltérése az átlagtól, ha összesen 3 adat van?',
    options: [
      '+7 (mert a zéró összeg elve szerint (−3) + (−4) + (+7) = 0)',
      '+1',
      '+10',
      '−7'
    ],
    correctAnswer: 0,
    explanation: 'Az eltérések összege mindig 0. Mivel a negatív eltérések összege (−3) + (−4) = −7, a harmadik adat eltérésének pontosan +7-nek kell lennie, így az értéke 10 + 7 = 17.',
    hint: 'A hiányokat és többleteket összeadva nullát kell kapnunk!'
  },
  {
    id: 'avg3-7',
    level: 3,
    prompt: 'Négy tanuló 100 méteres futásának ideje: 12 mp, 14 mp, 15 mp és 11 mp. Mennyi az átlagos futásidő?',
    options: [
      '13 másodperc (52 : 4 = 13)',
      '12,5 másodperc',
      '14 másodperc',
      '52 másodperc'
    ],
    correctAnswer: 0,
    explanation: 'Összes idő: 12 + 14 + 15 + 11 = 52 mp. Futók száma: 4. Átlag: 52 : 4 = 13 másodperc.',
    hint: '12 + 14 + 15 + 11 = 52. 52 osztva 4-gyel = ?'
  },
  {
    id: 'avg3-8',
    level: 3,
    prompt: 'Egy felmérésen a jegyek gyakorisága: két darab 5-ös, három darab 4-es és egy darab 2-es. Mennyi a jegyek átlaga?',
    options: [
      '4,0 ((2 × 5 + 3 × 4 + 1 × 2) : 6 = (10 + 12 + 2) : 6 = 24 : 6 = 4)',
      '3,67',
      '4,5',
      '3,0'
    ],
    correctAnswer: 0,
    explanation: 'Jegyek összege: 2 × 5 + 3 × 4 + 1 × 2 = 10 + 12 + 2 = 24. Jegyek darabszáma: 2 + 3 + 1 = 6 darab. Átlag: 24 : 6 = 4,0.',
    hint: 'Számold ki az összes jegy összegét: 10 + 12 + 2 = 24, és oszd a dolgozatok számával (6)!'
  },
  {
    id: 'avg3-9',
    level: 3,
    prompt: 'Három pozitív szám átlaga 10. Lehetséges-e, hogy mind a három szám nagyobb legyen 10-nél?',
    options: [
      'Nem, mert a közrefogási elv szerint az átlagnak a legkisebb és legnagyobb szám közé kell esnie.',
      'Igen, bármikor előfordulhat.',
      'Csak akkor, ha az összegük páros szám.',
      'Igen, ha tizedestörtekről van szó.'
    ],
    correctAnswer: 0,
    explanation: 'Lehetetlen. Ha mindhárom szám > 10 lenne, akkor az összegük > 30 lenne, így az átlaguk is > 10 lenne. Legalább egy számnak kisebbnek vagy egyenlőnek kell lennie 10-nél.',
    hint: 'Ha mindhárom szám nagyobb 10-nél, lehet-e az átlaguk 10?'
  },
  {
    id: 'avg3-10',
    level: 3,
    prompt: 'Egy számsorban az adatok: 1, 1, 1 és 9. Mennyi a számsor átlaga és módusza?',
    options: [
      'Átlag = 3, Módusz = 1 (összeg: 12 : 4 = 3, leggyakoribb érték: 1)',
      'Átlag = 1, Módusz = 3',
      'Átlag = 3, Módusz = 9',
      'Átlag = 4, Módusz = 1'
    ],
    correctAnswer: 0,
    explanation: 'Összeg: 1 + 1 + 1 + 9 = 12. Darabszám: 4. Átlag = 12 : 4 = 3. A leggyakoribb érték az 1 (3-szor fordul elő), tehát a Módusz = 1.',
    hint: 'Átlag: (1 + 1 + 1 + 9) : 4. Módusz: melyikből van a legtöbb?'
  }
];

export const AverageQuiz: React.FC<AverageQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Átlag és tulajdonságai Kvíz"
      subtitle="30 feladat 3 szinten: a számtani közép számítása, kiegyenlítés, aranytulajdonságok és visszafelé számolás"
      color="amber"
      questions={AVERAGE_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      MatcherComponent={({ onBack: mBack, level, onNextLevel }) => (
        <AverageMatcher
          onBack={mBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      SorterComponent={({ onBack: sBack, level, onNextLevel }) => (
        <AverageSorter
          onBack={sBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400">1. Szint Puskája: Átlagszámítás Alapjai</div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <div>• <strong>Átlag képlete:</strong> Összeg : Darabszám.</div>
              <div>• <strong>Közrefogási szabály:</strong> Minimum ≤ Átlag ≤ Maximum.</div>
              <div>• <strong>Tizedestört eredmény:</strong> Egész számok átlaga is lehet tört (pl. 4 és 5 átlaga 4,5).</div>
              <div>• <strong>Azonos számok:</strong> Ha minden adat ugyanannyi, az átlag is pontosan az a szám.</div>
              <div>• <strong>Eltérések kiegyenlítődése:</strong> A hiányok és többletek összege mindig 0!</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400">2. Szint Puskája: Változások és Visszafelé Számolás</div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <div>• <strong>Új adat hatása:</strong> Ha &gt; Átlag → nő; ha &lt; Átlag → csökken; ha = Átlag → változatlan.</div>
              <div>• <strong>Összeg visszafelé:</strong> Összeg = Átlag × Darabszám.</div>
              <div>• <strong>Hiányzó jegy:</strong> Kívánt összeg − Meglévő jegyek összege.</div>
              <div>• <strong>Minden tag növelése:</strong> Ha mindegyikhez +k jár, az átlag is +k-val nő.</div>
              <div>• <strong>Zárójel használata:</strong> Számológépben: (a + b + c) : 3 kötelező!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-amber-700 dark:text-amber-400">3. Szint Puskája: Csoportok, Outlierek és Módusz</div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
              <div>• <strong>Csoportok összevonása:</strong> Összes pont összege : Összes tanuló létszáma.</div>
              <div>• <strong>Kiugró érték (Outlier):</strong> Egyetlen extrém magas érték erősen felhúzza az átlagot.</div>
              <div>• <strong>Szorzási szabály:</strong> Ha minden adatot megszorzunk k-val, az átlag is k-szoros lesz.</div>
              <div>• <strong>Gyakorisági átlag:</strong> (Gyakoriság × Érték összege) : Összes darabszám.</div>
              <div>• <strong>Átlag vs. Módusz:</strong> Az átlag a kiegyenlített szint, a módusz a leggyakoribb érték.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
