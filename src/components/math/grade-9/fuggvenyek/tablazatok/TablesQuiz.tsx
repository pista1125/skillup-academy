import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TablesMatcher } from './TablesMatcher';
import { TablesSorter } from './TablesSorter';
import {
  TableStructureSvg,
  ContingencyTableSvg,
  FunctionTableSvg
} from './TablesFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, FileSpreadsheet, Calculator, Hash } from 'lucide-react';

interface TablesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Táblázatolvasás (Könnyű)',
    subtitle: 'Sorok, oszlopok, fejlécek, cellák beazonosítása és egyszerű értékek kikeresése.',
    range: '1 - 10. feladat',
    focus: 'Táblázatos Alapismeretek',
    questions: [
      {
        id: 'tq1-1',
        questionTypeBadge: 'Táblázat Alapfogalom',
        question: 'Mi a neve a táblázat vízszintes adatcsoportosításának, amely általában egy adott egyedhez tartozó értékeket tartalmaz?',
        figure: <TableStructureSvg size={220} />,
        options: ['Sor (rekord)', 'Oszlop (mező)', 'Fejléc', 'Cella'],
        correctAnswer: 0,
        hint: 'A vízszintes irányt keressük, mint a füzet vonalazásánál.',
        explanation: 'A táblázat vízszintes adatsorát sornak (vagy adatbázisokban rekordnak) nevezzük. Az oszlopok a függőleges elrendezést jelentik.'
      },
      {
        id: 'tq1-2',
        questionTypeBadge: 'Cella Fogalma',
        question: 'Hogyan nevezzük a táblázatban egy sor és egy oszlop pontos metszéspontját, ahol egyetlen konkrét adat áll?',
        options: ['Cella', 'Fejléc', 'Perem', 'Változó'],
        correctAnswer: 0,
        hint: 'A táblázatkezelő programokban (pl. Excel) is így hívják a beviteli mezőket (pl. B3).',
        explanation: 'A cella egy sor és egy oszlop metszéspontja, ez tartalmazza az adott tulajdonság konkrét mért vagy számított értékét.'
      },
      {
        id: 'tq1-3',
        questionTypeBadge: 'Mértékegység Leolvasása',
        question: 'Egy költségvetési táblázat fejléce: „Kiadások (ezer Ft)”. A „Bérleti díj” sorában a számérték: 350. Mennyi a tényleges kiadás forintban?',
        options: ['350 000 Ft', '350 Ft', '35 000 Ft', '3 500 000 Ft'],
        correctAnswer: 0,
        hint: 'A fejléc szerint a számot meg kell szorozni 1 000-rel.',
        explanation: 'Mivel a mértékegység ezer Ft, a 350 érték 350 · 1 000 = 350 000 Ft-ot jelent.'
      },
      {
        id: 'tq1-4',
        questionTypeBadge: 'Táblázat Elemzése',
        question: 'Egy bolt heti eladásai: H: 12 db, K: 18 db, Sze: 25 db, Cs: 15 db, P: 30 db. Melyik napon adták el a legtöbb terméket (maximum)?',
        options: ['Péntek', 'Szerda', 'Kedd', 'Hétfő'],
        correctAnswer: 0,
        hint: 'Keresd meg a legnagyobb számértéket a sorban!',
        explanation: 'A legnagyobb érték a 30 db, amely a pénteki naphoz tartozik.'
      },
      {
        id: 'tq1-5',
        questionTypeBadge: 'Összegzés Táblázatból',
        question: 'Egy diák havi költései: Utazás 4 000 Ft, Könyv 6 500 Ft, Büfé 5 500 Ft. Mennyi az összes költése?',
        options: ['16 000 Ft', '15 000 Ft', '17 000 Ft', '14 500 Ft'],
        correctAnswer: 0,
        hint: 'Add össze a három tételt: 4000 + 6500 + 5500.',
        explanation: '4 000 + 6 500 + 5 500 = 16 000 Ft az összes havi költés.'
      },
      {
        id: 'tq1-6',
        questionTypeBadge: 'Átlagszámítás Táblázatból',
        question: 'Négy egymást követő nap mért hőmérséklete délben: 18 °C, 20 °C, 24 °C, 26 °C. Mennyi a négy nap átlaghőmérséklete?',
        options: ['22 °C', '21 °C', '23 °C', '20 °C'],
        correctAnswer: 0,
        hint: 'Add össze az értékeket, majd oszd el a napok számával (4-gyel).',
        explanation: 'Az összeg: 18 + 20 + 24 + 26 = 88. Az átlag: 88 / 4 = 22 °C.'
      },
      {
        id: 'tq1-7',
        questionTypeBadge: 'Terjedelem Számítása',
        question: 'Egy osztályban a dolgozat pontszámai: 12, 18, 25, 29, 34, 40. Mennyi a pontszámok terjedelme (maximum - minimum)?',
        options: ['28', '40', '12', '24'],
        correctAnswer: 0,
        hint: 'A terjedelem a legnagyobb és a legkisebb érték különbsége.',
        explanation: 'Terjedelem = Maximum - Minimum = 40 - 12 = 28 pont.'
      },
      {
        id: 'tq1-8',
        questionTypeBadge: 'Függőleges Oszlopok',
        question: 'Egy statisztikai táblázatban az oszlopok általában mit jelölnek?',
        options: ['Egy-egy tulajdonságot, ismérvet vagy változót', 'Egy-egy konkrét személyt', 'A vizsgálat időtartamát kizárólag', 'A teljes mintát összesen'],
        correctAnswer: 0,
        hint: 'Az oszlopok felett áll a fejléc, amely megnevezi a mérést vagy tulajdonságot.',
        explanation: 'Az oszlopok az azonos fajtájú adatokat, változókat (pl. életkor, nem, magasság) tartalmazzák az összes vizsgált egyedre vonatkozóan.'
      },
      {
        id: 'tq1-9',
        questionTypeBadge: 'Hiányzó Cella Kitöltése',
        question: 'Egy táblázatban 3 tétel szerepel: A = 15, B = 25, C = ?. Az összesen sorban 70 áll. Mennyi a C értéke?',
        options: ['30', '25', '35', '40'],
        correctAnswer: 0,
        hint: 'Összesen = A + B + C, tehát C = 70 - (15 + 25).',
        explanation: 'C = 70 - (15 + 25) = 70 - 40 = 30.'
      },
      {
        id: 'tq1-10',
        questionTypeBadge: 'Kétdimenziós Tábla Jelentése',
        question: 'Miben különbözik egy kétdimenziós táblázat egy egyszerű számsortól?',
        options: [
          'Két különböző szempont (sor és oszlop) szerint osztályozza az adatokat',
          'Csak negatív számokat tartalmazhat',
          'Nem lehet benne szöveges fejléc',
          'Mindig pontosan 2 cellából áll'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a sakktáblára vagy egy órarendre (napok x órák)!',
        explanation: 'A kétdimenziós táblázat két tulajdonság vagy ismérv együttes értékeit rendszerezi (pl. napok és tantárgyak, vagy nem és sportág).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kereszttáblázatok és Százalékos Arányok (Közepes)',
    subtitle: 'Kontingencia-táblázatok, peremösszegek, feltételes relatív gyakoriságok és valószínűségi kérdések.',
    range: '11 - 20. feladat',
    focus: 'Kereszttáblák és Statisztika',
    questions: [
      {
        id: 'tq2-1',
        questionTypeBadge: 'Kereszttábla Peremösszeg',
        question: 'A mintában 30 fiú és 20 lány szerepel. Közülük 24-en fociznak, a többiek úsznak. Mennyi a teljes mintaelemszám (N)?',
        figure: <ContingencyTableSvg size={240} />,
        options: ['50', '44', '74', '25'],
        correctAnswer: 0,
        hint: 'A mintában lévő összes fiú és lány száma adja a teljes létszámot: 30 + 20.',
        explanation: 'N = Fiúk + Lányok = 30 + 20 = 50 fő. Ez megegyezik a sportágak szerinti összeggel is: 24 focista + 26 úszó = 50.'
      },
      {
        id: 'tq2-2',
        questionTypeBadge: 'Kereszttábla Cella Számítása',
        question: 'Egy 50 fős csoportban 30 fiú van, akik közül 18 focizik. Összesen 24 diák focizik a csoportban. Hány lány focizik?',
        options: ['6 lány', '12 lány', '8 lány', '14 lány'],
        correctAnswer: 0,
        hint: 'Összes focista (24) - fiú focisták (18).',
        explanation: 'Mivel összesen 24 diák focizik és ebből 18 fiú, a focizó lányok száma: 24 - 18 = 6 lány.'
      },
      {
        id: 'tq2-3',
        questionTypeBadge: 'Feltételes Százalék Számítás',
        question: 'A 30 fiú közül 18-an fociznak. A fiúk hány százaléka választotta a focit?',
        options: ['60%', '50%', '36%', '45%'],
        correctAnswer: 0,
        hint: 'A vizsgált alap a 30 fiú. Számold ki a (18 / 30) · 100%-ot!',
        explanation: '(18 / 30) = 0,6 = 60%. Tehát a fiúk 60%-a focizik.'
      },
      {
        id: 'tq2-4',
        questionTypeBadge: 'Kereszttábla Elemzés',
        question: 'A 20 lány közül 6-an fociznak és 14-en úsznak. A lányok hány százaléka úszik?',
        options: ['70%', '60%', '80%', '28%'],
        correctAnswer: 0,
        hint: '(14 úszó lány / 20 lány összesen) · 100%.',
        explanation: '(14 / 20) = 7/10 = 70%. A lányok 70%-a úszik.'
      },
      {
        id: 'tq2-5',
        questionTypeBadge: 'Alap Helyes Azonosítása',
        question: 'A csoportban 24-en fociznak (18 fiú és 6 lány). A focistáknak hány százaléka fiú?',
        options: ['75%', '60%', '80%', '50%'],
        correctAnswer: 0,
        hint: 'Most a focisták (24 fő) jelentik a 100%-ot! (18 / 24) · 100%.',
        explanation: '(18 / 24) = 3/4 = 75%. A focisták 75%-a fiú.'
      },
      {
        id: 'tq2-6',
        questionTypeBadge: 'Relatív Gyakoriság a Teljes Mintában',
        question: 'Az 50 fős csoportból véletlenszerűen kiválasztunk egy diákot. Mennyi annak a valószínűsége, hogy egy úszó lányt választunk (14 úszó lány van)?',
        options: ['28% (0,28)', '14% (0,14)', '70% (0,70)', '50% (0,50)'],
        correctAnswer: 0,
        hint: 'Kedvező esetek / összes eset = 14 / 50.',
        explanation: 'P = 14 / 50 = 28 / 100 = 0,28, azaz 28%.'
      },
      {
        id: 'tq2-7',
        questionTypeBadge: 'Gyakorisági Táblázat Átlaga',
        question: 'Egy matek kvíz jegyei: 5-ös: 6 diák, 4-es: 8 diák, 3-as: 6 diák. Mennyi a dolgozatok átlaga?',
        options: ['4,0', '4,2', '3,8', '4,5'],
        correctAnswer: 0,
        hint: 'Súlyozott átlag: (5·6 + 4·8 + 3·6) / (6 + 8 + 6).',
        explanation: 'Összpontszám = 30 + 32 + 18 = 80 pont. Diákok száma = 20 fő. Átlag = 80 / 20 = 4,0.'
      },
      {
        id: 'tq2-8',
        questionTypeBadge: 'Módusz Leolvasása',
        question: 'Egy cipőbolt napi eladásai méret szerint: 38-as: 4 db, 39-es: 9 db, 40-es: 15 db, 41-es: 8 db. Mi az eladott cipők méretének módusza?',
        options: ['40-es méret', '15 db', '39,5-es méret', '41-es méret'],
        correctAnswer: 0,
        hint: 'A módusz a leggyakrabban előforduló érték (nem a darabszám maga, hanem a méret!).',
        explanation: 'A legtöbbször (15-ször) a 40-es méretet vásárolták meg, így a módusz a 40-es méret.'
      },
      {
        id: 'tq2-9',
        questionTypeBadge: 'Kereszttábla Hiányzó Cella',
        question: 'Egy 2x2-es táblázatban a sorösszegek: 40 és 60. Az első oszlop összege 45. Mennyi a második oszlop összege?',
        options: ['55', '50', '65', '45'],
        correctAnswer: 0,
        hint: 'A sorösszegek összege (40+60=100) egyenlő az oszlopösszegek összegével (45 + ? = 100).',
        explanation: 'N = 40 + 60 = 100. A második oszlop összege: 100 - 45 = 55.'
      },
      {
        id: 'tq2-10',
        questionTypeBadge: 'Függetlenség Ellenőrzése',
        question: 'Egy csoportban a fiúk 40%-a, a lányoknak szintén pontosan 40%-a tanul németül. Mi mondható el a nem és a némett tanulás kapcsolatáról?',
        options: [
          'A német tanulás aránya független a nemtől a csoportban',
          'A fiúk kétszer annyian tanulnak németül',
          'Mindenki tanul németül',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Ha a feltételes arányok megegyeznek mindkét csoportban, nincs összefüggés a két tulajdonság között.',
        explanation: 'Mivel mindkét nemnél pontosan ugyanakkora (40%) a németet tanulók aránya, a német tanulás választása nem függ a nemtől.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Függvénytáblázatok és Haladó Elemzések (Nehéz)',
    subtitle: 'Hozzárendelési szabályok felírása táblázatból, hiányzó pontok, koordináták és függvénykapcsolatok.',
    range: '21 - 30. feladat',
    focus: 'Függvény-értéktábla és Analízis',
    questions: [
      {
        id: 'tq3-1',
        questionTypeBadge: 'Hozzárendelési Szabály Keresése',
        question: 'Egy értéktáblázat értékei: x = -1 esetén y = -1; x = 0 esetén y = 1; x = 2 esetén y = 5; x = 4 esetén y = 9. Melyik képlet írja le a függvényt?',
        figure: <FunctionTableSvg size={240} />,
        options: ['f(x) = 2x + 1', 'f(x) = 3x - 1', 'f(x) = x + 2', 'f(x) = x² + 1'],
        correctAnswer: 0,
        hint: 'Nézd meg a változást: ha x nő 1-gyel, y nő 2-vel (meredekség m = 2), és x = 0-nál y = 1.',
        explanation: 'Az y = 2x + 1 összefüggés minden párra teljesül: 2(-1)+1 = -1, 2(0)+1 = 1, 2(2)+1 = 5, 2(4)+1 = 9.'
      },
      {
        id: 'tq3-2',
        questionTypeBadge: 'Függvényérték Számítása Táblázathoz',
        question: 'Adott az f(x) = 3x - 4 függvény. Mennyi a hiányzó érték az x = 5 helyhez tartozó cellában?',
        options: ['11', '15', '9', '19'],
        correctAnswer: 0,
        hint: 'Helyettesíts be x helyére 5-öt: f(5) = 3·5 - 4.',
        explanation: 'f(5) = 3 · 5 - 4 = 15 - 4 = 11.'
      },
      {
        id: 'tq3-3',
        questionTypeBadge: 'Inverz Feladat Táblázatból',
        question: 'Az f(x) = -2x + 7 függvény értéktáblázatában y = -3 szerepel. Melyik x érték tartozik ehhez a kimenethez?',
        options: ['x = 5', 'x = -5', 'x = 2', 'x = -2'],
        correctAnswer: 0,
        hint: 'Oldd meg a -2x + 7 = -3 egyenletet x-re!',
        explanation: '-2x + 7 = -3  =>  -2x = -10  =>  x = 5.'
      },
      {
        id: 'tq3-4',
        questionTypeBadge: 'Egyenes Arányosság Táblázata',
        question: 'Egy egyenes arányosság táblázatában: x = 3 esetén y = 12. Mennyi lesz az y értéke, ha x = 7?',
        options: ['28', '21', '24', '35'],
        correctAnswer: 0,
        hint: 'Az arányossági tényező k = y / x = 12 / 3 = 4. Szorozd meg a 7-et 4-gyel!',
        explanation: 'k = 12 / 3 = 4, így y = 4 · 7 = 28.'
      },
      {
        id: 'tq3-5',
        questionTypeBadge: 'Fordított Arányosság Táblázata',
        question: 'Egy fordított arányosság táblázatában x és y szorzata állandó (k = x · y). Ha x = 4 esetén y = 15, mennyi lesz y, ha x = 6?',
        options: ['10', '12', '8', '20'],
        correctAnswer: 0,
        hint: 'Szorzat állandó: k = 4 · 15 = 60. Ekkor 6 · y = 60.',
        explanation: 'k = 4 · 15 = 60. Ha x = 6, akkor y = 60 / 6 = 10.'
      },
      {
        id: 'tq3-6',
        questionTypeBadge: 'Függvény Grafikonjának Pontja',
        question: 'Egy táblázatban az alábbi (x; y) pontok szerepelnek: (-2; 4), (0; 0), (2; 4), (3; 9). Melyik függvény értéktáblázata ez?',
        options: ['f(x) = x²', 'f(x) = 2x', 'f(x) = |x| + 2', 'f(x) = x³'],
        correctAnswer: 0,
        hint: 'Minden y érték az x szám négyzetével egyenlő: (-2)² = 4, 0² = 0, 2² = 4, 3² = 9.',
        explanation: 'Ez a jól ismert alapparabola, az f(x) = x² másodfokú függvény értéktáblázata.'
      },
      {
        id: 'tq3-7',
        questionTypeBadge: 'Egyértelmű Hozzárendelés Teszt',
        question: 'Egy táblázatban az alábbi párok állnak: (2; 5), (3; 7), (2; 9), (4; 11). Függvény-e ez a hozzárendelés?',
        options: [
          'Nem, mert az x = 2 bemenethez két különböző kimenet (5 és 9) is tartozik',
          'Igen, mert minden szám pozitív egész',
          'Igen, mert 4 számpár van feljegyezve',
          'Nem, mert a számok növekvő sorrendben vannak'
        ],
        correctAnswer: 0,
        hint: 'A függvény definíciója szerint egy x értékhez pontosan egy y érték tartozhat!',
        explanation: 'Függvény esetén minden értelmezési tartománybeli x-hez EGYETLEN y tartozhat. Mivel x = 2-höz 5 és 9 is hozzá van rendelve, ez NEM függvény.'
      },
      {
        id: 'tq3-8',
        questionTypeBadge: 'Zérushely Leolvasása Táblázatból',
        question: 'Egy függvény táblázata: (-2; -5), (-1; -2), (0; 1), (1; 4). Melyik két egész érték közé esik a függvény zérushelye (ahol f(x) = 0)?',
        options: ['-1 és 0 közé', '0 és 1 közé', '-2 és -1 közé', '1 és 2 közé'],
        correctAnswer: 0,
        hint: 'A zérushelynél y előjelet vált (negatívból pozitívba megy át).',
        explanation: 'x = -1 esetén y = -2 (negatív), míg x = 0 esetén y = 1 (pozitív). Folytonos lineáris függvénynél a zérushely e két érték közé, pontosan -1 és 0 közé esik (x = -1/3).'
      },
      {
        id: 'tq3-9',
        questionTypeBadge: 'Összetett Statisztikai Elemzés',
        question: 'Egy kereszttáblában 100 fő válaszait összegezzük. A „Sikeres vizsga” sorban 80 fő áll (48 nő, 32 férfi). A „Sikertelen” sorban 20 fő áll (8 nő, 12 férfi). A nők hány százaléka tette le sikeresen a vizsgát?',
        options: ['kb. 85,7% (48 / 56)', '60% (48 / 80)', '80% (80 / 100)', '48% (48 / 100)'],
        correctAnswer: 0,
        hint: 'A vizsgált alap a nők ÖSSZES száma: 48 sikeres + 8 sikertelen = 56 nő.',
        explanation: 'Az összes nő száma = 48 + 8 = 56 fő. Ebből sikeres = 48. Arány: 48 / 56 = 6 / 7 ≈ 85,7%.'
      },
      {
        id: 'tq3-10',
        questionTypeBadge: 'Intervallum Értelmezése Táblázatból',
        question: 'Egy autó sebességének értéktáblázata az idő (t, másodperc) függvényében: (0; 0), (2; 10), (4; 20), (6; 20), (8; 15). Melyik intervallumban volt állandó a jármű sebessége?',
        options: ['t = 2 és t = 4 között', 't = 4 és t = 6 között', 't = 0 és t = 2 között', 't = 6 és t = 8 között'],
        correctAnswer: 1,
        hint: 'Akkor állandó a sebesség, ha az egymást követő időpontokban a sebességérték nem változik (mindkét helyen 20 m/s).',
        explanation: 't = 4 és t = 6 másodperc között a sebesség végig 20 m/s maradt, tehát a sebesség ebben az időintervallumban állandó volt.'
      }
    ]
  }
};

const tablesCheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Táblázat alapelemei',
    description: 'Sorok (rekordok, vízszintes), Oszlopok (változók, függőleges), Cellák (metszéspontok).',
    formula: 'Cella = (sor; oszlop)',
    badge: 'Alapok',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    title: 'Kontingencia-tábla szabály',
    description: 'A sorösszegek és oszlopösszegek összege pontosan megegyezik a teljes sokaság elemszámával.',
    formula: 'Σ sorösszeg = Σ oszlopösszeg = N',
    badge: 'Kereszttábla',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    title: 'Függvény-értéktáblázat',
    description: 'Minden x értékhez pontosan egy f(x) tartozik. A számpárok a koordinátasík pontjai.',
    formula: 'x ➔ f(x) = y ➔ Pont: (x; y)',
    badge: 'Függvények',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    title: 'Súlyozott átlag számítása',
    description: 'Gyakorisági táblázatnál minden értéket a gyakoriságával szorzunk, majd osztunk a darabszámmal.',
    formula: 'Átlag = (Σ x_i · f_i) / Σ f_i',
    badge: 'Statisztika',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  }
];

export const TablesQuiz: React.FC<TablesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="1. Táblázatok Kvíz"
      subtitle="Gyakorold a táblázatok leolvasását, kereszttáblázatok elemzését és függvényértékek számítását 3 nehézségi szinten!"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 1. TÁBLÁZATOK"
      chapterId="fuggvenyek"
      topicId="g9-func-tablazatok-quiz"
      topicTitle="1. Táblázatok"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetTitle="Táblázatok & Kereszttáblák Segédlet"
      cheatSheetCards={tablesCheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={
        <TablesMatcher
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TablesSorter
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

