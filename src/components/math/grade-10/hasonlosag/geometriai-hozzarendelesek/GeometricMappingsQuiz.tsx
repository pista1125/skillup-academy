import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GeometricMappingsMatcher } from './GeometricMappingsMatcher';
import { GeometricMappingsSorter } from './GeometricMappingsSorter';
import {
  TransformationHierarchySvg,
  OrthogonalProjectionSvg,
  SundialProjectionSvg,
  TechnicalDrawingViewsSvg,
  VectorWorkProjectionSvg
} from './GeometricMappingsFigures';

interface GeometricMappingsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Geometriai leképezések és transzformációk',
    description: 'A geometriai leképezés olyan függvény, amelynek értelmezési tartománya és értékkészlete is ponthalmaz. Ha kölcsönösen egyértelmű (bijektív) és a teljes síkot önmagára képezi le, geometriai transzformációnak nevezzük.',
    note: 'Az egybevágóságok halmaza valódi részhalmaza a hasonlósági transzformációknak (amikor λ = 1).',
    color: 'from-indigo-500 to-purple-600',
    figure: <TransformationHierarchySvg size={260} />
  },
  {
    title: 'Merőleges vetítés egyenesre',
    description: 'A sík pontjait merőlegesen vetítjük egy e egyenesre. A szakasz vetülete legfeljebb olyan hosszú, mint az eredeti: |a\'| = |a| · cos(α) ≤ |a|. Az egyenesre merőleges szakasz vetülete egyetlen pont; a körvonal vetülete 2r hosszúságú szakasz.',
    note: 'A merőleges vetítés nem transzformáció, mert dimenziócsökkenéssel jár és nem kölcsönösen egyértelmű (nem bijektív)!',
    color: 'from-sky-500 to-blue-600',
    figure: <OrthogonalProjectionSvg size={260} />
  },
  {
    title: 'Műszaki és fizikai vetületek',
    description: 'Műszaki rajzban a 3D testeket egymásra merőleges képsíkokra vetítjük (elöl-, felül-, oldalnézet). A fizikában az állandó erő által végzett munka az erő elmozdulás irányú merőleges vetületének és az elmozdulásnak a szorzata: W = F · s · cos(α).',
    note: 'Kompetenciamérés típusfeladat: gömb sosem adhat téglalap alakú árnyékot!',
    color: 'from-emerald-500 to-teal-600',
    figure: <VectorWorkProjectionSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és transzformáció-osztályozás',
    subtitle: '10 feladat a geometriai hozzárendelésekről, bijektivitásról és az egybevágóságok/hasonlóságok rendszeréről',
    range: '1–10. kérdés',
    focus: 'Leképezés definíciója, transzformáció fogalma, egybevágóság vs. hasonlóság, invarianciák',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    questions: [
      {
        id: 'gmq1-1',
        level: 1,
        question: 'Mi a geometriai hozzárendelés (leképezés) szabatos matematikai definíciója?',
        options: [
          'Olyan függvény, amelynek értelmezési tartománya és értékkészlete is ponthalmaz',
          'Bármilyen egyenlet, amely köröket ír le',
          'Olyan művelet, amely kizárólag szakaszokat hosszabbít meg',
          'Két pont távolságának algebrai összege'
        ],
        correctAnswer: 0,
        explanation: 'A geometriai hozzárendelések olyan függvények, amelyeknek értelmezési tartománya és értékkészlete is ponthalmaz.',
        hint: 'Gondolj a függvény fogalmára: elemekhez elemeket rendelünk.'
      },
      {
        id: 'gmq1-2',
        level: 1,
        question: 'Mikor nevezünk egy geometriai hozzárendelést geometriai transzformációnak?',
        options: [
          'Ha kölcsönösen egyértelmű (bijektív), és az értelmezési tartomány és az értékkészlet ugyanaz a ponthalmaz (pl. a teljes sík)',
          'Ha legalább egy pont helyben marad',
          'Ha a képalakzat területe pontosan a duplájára nő',
          'Minden geometriai hozzárendelés automatikusan transzformáció'
        ],
        correctAnswer: 0,
        explanation: 'A geometriai transzformáció bijektív leképezés egy ponthalmazról (pl. a síkról) önmagára.',
        hint: 'Fontos a kölcsönös egyértelműség és az azonos alaphalmaz.'
      },
      {
        id: 'gmq1-3',
        level: 1,
        question: 'Milyen kapcsolat van az egybevágósági transzformációk és a hasonlósági transzformációk halmaza között?',
        options: [
          'Az egybevágóságok halmaza valódi részhalmaza a hasonlósági transzformációk halmazának (λ = 1)',
          'A két halmaznak nincs közös eleme',
          'A hasonlóságok halmaza valódi részhalmaza az egybevágóságoknak',
          'A két halmaz pontosan megegyezik'
        ],
        correctAnswer: 0,
        explanation: 'Minden egybevágóság egyúttal 1 arányú hasonlóság is, így az egybevágóságok valódi részhalmazát alkotják a hasonlósági transzformációknak.',
        hint: 'Ha a hasonlósági arány λ = 1, az egybevágóságot jelent.'
      },
      {
        id: 'gmq1-4',
        level: 1,
        question: 'Melyik az alábbiak közül IRÁNYVÁLTÓ egybevágósági transzformáció a síkon?',
        options: [
          'Tengelyes tükrözés',
          'Párhuzamos eltolás',
          'Pont körüli elforgatás',
          'Középpontos tükrözés'
        ],
        correctAnswer: 0,
        explanation: 'A tengelyes tükrözés (és a csúsztatva tükrözés) megfordítja a körüljárási irányt (óramutató járásával megegyezőből ellenkezővé), így irányváltó.',
        hint: 'Nézd meg a betűk tükörképét: a jobbkézből balkéz lesz!'
      },
      {
        id: 'gmq1-5',
        level: 1,
        question: 'Melyik állítás IGAZ az egybevágósági transzformációkra?',
        options: [
          'Távolságtartók: bármely két pont képe ugyanolyan távol van, mint az eredeti pontok (|A\'B\'| = |AB|)',
          'A szakaszok hosszát a felére csökkentik',
          'A területeket mindig megduplázzák',
          'Csak derékszögeket őriznek meg'
        ],
        correctAnswer: 0,
        explanation: 'Az egybevágóság alapvető tulajdonsága a távolságtartás (izometria): |A\'B\'| = |AB| minden pontpárra.',
        hint: 'Egybevágó alakzatok mérete és alakja tökéletesen azonos.'
      },
      {
        id: 'gmq1-6',
        level: 1,
        question: 'Hogyan áll elő bármely általános síkbeli hasonlósági transzformáció?',
        options: [
          'Egy középpontos hasonlóság és egy egybevágósági transzformáció egymásutánjaként (kompozíciójaként)',
          'Két merőleges vetítés szorzataként',
          'Kizárólag két párhuzamos eltolás összegeként',
          'Csak tengelyes tükrözésekkel'
        ],
        correctAnswer: 0,
        explanation: 'Két alakzat hasonló, ha az egyik egy középpontos hasonlóság és egy egybevágóság egymás utáni elvégzésével a másikba vihető.',
        hint: 'Először a megfelelő méretre hozzuk (középpontos hasonlóság), majd a megfelelő helyre és állásba mozgatjuk (egybevágóság).'
      },
      {
        id: 'gmq1-7',
        level: 1,
        question: 'Miért NEM geometriai transzformáció a sík pontjainak merőleges vetítése egy egyenesre?',
        options: [
          'Mert nem kölcsönösen egyértelmű (egy képponthoz végtelen sok őskép tartozik) és az értékkészlet nem a teljes sík',
          'Mert egyenes képe egyenes marad',
          'Mert nem lehet vonalzóval megszerkeszteni',
          'Mert nincsenek benne szögek'
        ],
        correctAnswer: 0,
        explanation: 'A vetítés során dimenziócsökkenés történik (2D síkból 1D egyenes), így a leképezés nem bijektív (a vetítővonal minden pontja ugyanabba a vetületi pontba képeződik).',
        hint: 'A transzformációhoz bijektivitás szükséges a síkról önmagára.'
      },
      {
        id: 'gmq1-8',
        level: 1,
        question: 'Hány fixpontja van egy eltolásnak a síkban, ha az eltolás vektora nem a nullvektor?',
        options: [
          'Egyetlenegy sincs (0 fixpont)',
          'Pontosan 1 fixpontja van',
          'Végtelen sok fixpontja van az eltolás egyenesén',
          'Pontosan 2 fixpontja van'
        ],
        correctAnswer: 0,
        explanation: 'Nemnulla vektorral való eltoláskor minden pont elmozdul a vektorral, így egyetlen pont sem maradhat helyben.',
        hint: 'Minden pont új helyre kerül a vektor hosszával eltolva.'
      },
      {
        id: 'gmq1-9',
        level: 1,
        question: 'Melyik transzformációnak van egy egész egyenesre kiterjedő pontonkénti fixpont-halmaza?',
        options: [
          'A tengelyes tükrözésnek (a tükörtengely minden pontja fixpont)',
          'A középpontos tükrözésnek',
          'A pont körüli elforgatásnak',
          'A párhuzamos eltolásnak'
        ],
        correctAnswer: 0,
        explanation: 'A tengelyes tükrözésnél a tükörtengely minden pontja önmagába megy át: a tengely pontonként fix egyenes.',
        hint: 'A tükör felületén lévő pontok nem mozdulnak el.'
      },
      {
        id: 'gmq1-10',
        level: 1,
        question: 'Milyen alakzat lesz egy kör képe bármilyen hasonlósági transzformáció során?',
        options: [
          'Mindig kör',
          'Csak akkor kör, ha az arány egész szám',
          'Ellipszis',
          'Szakasz'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a hasonlósági transzformáció szögtartó és aránytartó, a kör képe mindig kör marad (sugara r\' = λ · r).',
        hint: 'A hasonlóság nem torzítja el az alakzatok geometriai formáját.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Merőleges vetítés és műszaki alkalmazások',
    subtitle: '10 feladat a síkbeli merőleges vetítés tulajdonságairól, vetületi hosszakról és a fizikáról',
    range: '11–20. kérdés',
    focus: '|a\'| = |a| cos(α), merőleges szakasz, kör képe, erővektor munkavégzése, derékszögű háromszög vetületei',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-300',
    accentGradient: 'from-sky-500 to-blue-600',
    questions: [
      {
        id: 'gmq2-1',
        level: 2,
        question: 'Egy AB szakasz hossza 10 cm, és 60°-os szöget zár be az e vetületi egyenessel. Mekkora az AB szakasz merőleges vetületének (A\'B\') hossza az e egyenesen?',
        options: [
          '5 cm',
          '8,66 cm',
          '10 cm',
          '0 cm'
        ],
        correctAnswer: 0,
        explanation: 'A vetület hossza a derékszögű vetítőháromszögből: |A\'B\'| = |AB| · cos(60°) = 10 · 0,5 = 5 cm.',
        hint: 'Használd a cos(60°) = 0,5 összefüggést!'
      },
      {
        id: 'gmq2-2',
        level: 2,
        question: 'Mikor lesz egy szakasz merőleges vetülete az e egyenesen a lehető leghosszabb (egyenlő az eredetivel)?',
        options: [
          'Ha a szakasz párhuzamos az e vetületi egyenessel (α = 0°)',
          'Ha a szakasz merőleges az e egyenesre (α = 90°)',
          'Ha 45°-os szöget zár be az e egyenessel',
          'Soha nem lehet egyenlő az eredeti szakasszal'
        ],
        correctAnswer: 0,
        explanation: 'Mivel |a\'| = |a| · cos(α), a maximális érték cos(0°) = 1 esetén alakul ki, vagyis ha a szakasz párhuzamos a vetítési egyenessel.',
        hint: 'A cos függvény mikor veszi fel a maximumát?'
      },
      {
        id: 'gmq2-3',
        level: 2,
        question: 'Milyen alakzat lesz egy síkbeli körvonal merőleges vetülete az e egyenesen?',
        options: [
          'Egy 2r (átmérő) hosszúságú zárt szakasz',
          'Egy kisebb kör',
          'Egy pont',
          'Két különálló pont'
        ],
        correctAnswer: 0,
        explanation: 'A körvonal minden pontja az e egyenes egy-egy pontjába vetül. A két szélső pont a kör átmérőjének felel meg, így a vetület egy 2r hosszú szakasz.',
        hint: 'Gondolj egy felülről megvilágított karikára a talajon.'
      },
      {
        id: 'gmq2-4',
        level: 2,
        question: 'Egy szakasz merőleges az e egyenesre. Mi lesz a merőleges vetülete az e egyenesen?',
        options: [
          'Egyetlen pont',
          'Egy azonos hosszúságú szakasz',
          'Egy merőleges egyenes',
          'Nem vetíthető le'
        ],
        correctAnswer: 0,
        explanation: 'Ha a szakasz merőleges az egyenesre (α = 90°), cos(90°) = 0, így a vetület hossza 0, vagyis a teljes szakasz egyetlen pontba vetül.',
        hint: 'A vetítővonalak pontosan a szakasz egyenesébe esnek.'
      },
      {
        id: 'gmq2-5',
        level: 2,
        question: 'A fizikában egy állandó F = 50 N erő egy testet s = 4 méterrel mozgat el, az erő iránya 60°-os szöget zár be az elmozdulás egyenesével. Mekkora munkát végez az erő?',
        options: [
          '100 Joule',
          '200 Joule',
          '173,2 Joule',
          '0 Joule'
        ],
        correctAnswer: 0,
        explanation: 'W = F_∥ · s = F · s · cos(60°) = 50 N · 4 m · 0,5 = 100 J. Csak az elmozdulás irányú merőleges vetület végez mechanikai munkát!',
        hint: 'W = F · s · cos(α).'
      },
      {
        id: 'gmq2-6',
        level: 2,
        question: 'Egy derékszögű háromszög átfogójának hossza c = 10 cm. Mekkora a két befogó átfogóra vett merőleges vetületeinek (p és q) összege?',
        options: [
          'Pontosan 10 cm (p + q = c)',
          '5 cm',
          '14 cm',
          '20 cm'
        ],
        correctAnswer: 0,
        explanation: 'A derékszögű csúcsból induló magasságvonal talppontja az átfogót két szakaszra (p és q) osztja, melyek éppen a befogók átfogóra vett vetületei: p + q = c = 10 cm.',
        hint: 'A két befogó vetülete hézagmentesen lefedi a teljes átfogót.'
      },
      {
        id: 'gmq2-7',
        level: 2,
        question: 'Miért nem lehet a napóra árnyéka alapján közvetlenül távolságot vagy szöget mérni anélkül, hogy ismernénk a Nap magassági szögét?',
        options: [
          'Mert a tér síkra történő párhuzamos vetítése nem távolságtartó és nem szögtartó',
          'Mert a napóra mindig digitális',
          'Mert az árnyék nem vetül a lapra',
          'Mert a fény sebessége változik'
        ],
        correctAnswer: 0,
        explanation: 'A párhuzamos vetítés torzítja a távolságokat és szögeket: a nap mozgásával az árnyékháromszög oldalai és szögei folyamatosan változnak.',
        hint: 'Gondolj a napóra működésére és a párhuzamos vetítés tulajdonságaira.'
      },
      {
        id: 'gmq2-8',
        level: 2,
        question: 'Adott egy derékszögű háromszög, befogói a = 3 cm, b = 4 cm. Mekkora az „a” befogó merőleges vetülete az átfogóra (c = 5 cm)?',
        options: [
          '1,8 cm',
          '3,2 cm',
          '2,4 cm',
          '1,5 cm'
        ],
        correctAnswer: 0,
        explanation: 'A befogótétel szerint a² = c · p ⟹ 3² = 5 · p ⟹ 9 = 5p ⟹ p = 1,8 cm.',
        hint: 'Használd a befogótételt: a² = c · p!'
      },
      {
        id: 'gmq2-9',
        level: 2,
        question: 'Egy tetszőleges sokszög merőleges vetülete az e egyenesre:',
        options: [
          'Mindig egy zárt szakasz az e egyenesen',
          'Sokszög marad',
          'Körvonal',
          'Végtelen egyenes'
        ],
        correctAnswer: 0,
        explanation: 'A sík bármely korlátos összefüggő alakzatának (háromszög, négyszög, sokszög) merőleges vetülete az egyenesen egyetlen zárt szakaszt képez a legszélső csúcsok vetületei között.',
        hint: 'A vetítés során a dimenzió 2D-ről 1D-re csökken.'
      },
      {
        id: 'gmq2-10',
        level: 2,
        question: 'Mit nevezünk a műszaki ábrázolásban merőleges vetületnek?',
        options: [
          'A test pontjaiból a képsíkra bocsátott merőleges egyenesek talppontjai által alkotott síkbeli képet',
          'A test fényképezőgéppel készült perspektivikus fotóját',
          'A test felületének hálóját kiterítve',
          'A test tömegközéppontjának elmozdulását'
        ],
        correctAnswer: 0,
        explanation: 'A tárgyról merőleges vetítéssel kialakított, képsíkban fekvő alakzatot vetületnek (Monge-vetületnek) nevezzük.',
        hint: 'A vetítősugarak mind merőlegesek a képsíkra.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kompetenciamérés, árnyjáték és összetett hozzárendelések',
    subtitle: '10 emelt szintű feladat kompetenciaméréses tesztekből, árnyékokról és képsíkokról',
    range: '21–30. kérdés',
    focus: 'Kompetenciamérés 2008, 2009, 2013, 2017 feladatai, kockaépítmények felülnézete, árnyéktéglalap',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'gmq3-1',
        level: 3,
        question: 'Tomi különböző testeket világított meg, és megfigyelte a falon kirajzolódó árnyékukat. Melyik test NEM adhat semmilyen megvilágítás mellett téglalap alakú árnyékot (Kompetenciamérés)?',
        options: [
          'Gömb',
          'Henger',
          'Téglatest',
          'Háromoldalú egyenes hasáb'
        ],
        correctAnswer: 0,
        explanation: 'A gömb párhuzamos vetülete a képsíkra mindig kör vagy ellipszis, egyenes szakaszt és sarkokat (derékszögeket) sosem tartalmazhat! A henger, hasáb és téglatest mind adhat téglalap árnyékot.',
        hint: 'Melyik testnek nincsenek egyenes élei vagy síklapjai?'
      },
      {
        id: 'gmq3-2',
        level: 3,
        question: 'Egy tömör henger palástjának tengelyével párhuzamos fénysugarakkal világítva milyen árnyékot kapunk a tengelyre merőleges képsíkon?',
        options: [
          'Kör alakú árnyékot',
          'Téglalap alakú árnyékot',
          'Háromszög alakú árnyékot',
          'Pontot'
        ],
        correctAnswer: 0,
        explanation: 'Ha a fénysugarak a henger tengelyével párhuzamosak, a vetület a henger alapkörével egybevágó kör lesz.',
        hint: 'A henger tengelyirányú vetülete az alapkör.'
      },
      {
        id: 'gmq3-3',
        level: 3,
        question: 'A zedországi 1500 méteres síkfutás felülnézeti ábráján 4 kameraállás (A, B, C, D) látható. Melyik kamera látja a futókat balról jobbra a 4, 3, 2, 1 sorrendben?',
        options: [
          'A kamera a pálya belső ívéről, mely szemből néz a mezőnyre',
          'D kamera, amely felülről pásztáz',
          'B kamera a pálya külső ívén',
          'C kamera a futók háta mögül'
        ],
        correctAnswer: 0,
        explanation: 'A látószöget a futók pozíciójára vetítve a kamera nézőpontjából kell megvizsgálni a sorrendet (Kompetenciamérés 2017).',
        hint: 'Képzeld magad a kamerák helyére, és nézd meg, melyik futó esik balra és jobbra.'
      },
      {
        id: 'gmq3-4',
        level: 3,
        question: 'Egy kockákból álló építmény felülnézeti képén minden négyzetben egy szám jelzi, hány kocka van egymásra pakolva (Kompetenciamérés). Hogyan határozható meg az elölnézeti kép oszlopmagassága?',
        options: [
          'Az adott oszlophoz tartozó sorokban szereplő számok maximumaként (a legmagasabb kockatorony határozza meg)',
          'A számok összegeként',
          'A számok átlagaként',
          'Kizárólag a legelső sorban lévő szám alapján'
        ],
        correctAnswer: 0,
        explanation: 'Elölről nézve a mögötte lévő alacsonyabb tornyokat eltakarja a legmagasabb, tehát az elölnézetben minden függőleges oszlop magassága az adott vonalban lévő számok maximuma.',
        hint: 'Az elölnézetben csak a legmagasabb pont látható egy vonalban.'
      },
      {
        id: 'gmq3-5',
        level: 3,
        question: 'Két geometriai transzformáció, T₁ (aránya λ₁) és T₂ (aránya λ₂) kompozíciója (egymásutánja) T = T₂ ∘ T₁. Mekkora a keletkező transzformáció hasonlósági aránya?',
        options: [
          'λ = λ₁ · λ₂',
          'λ = λ₁ + λ₂',
          'λ = (λ₁ + λ₂) / 2',
          'λ = λ₁² + λ₂²'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az első transzformáció minden távolságot λ₁-szeresére, a második pedig az így kapott távolságokat λ₂-szeresére változtatja, az összetett leképezés távolságaránya: |A\'\'B\'\'| = λ₂ · |A\'B\'| = λ₂ · (λ₁ · |AB|) = (λ₁ · λ₂) · |AB|.',
        hint: 'A szorzótényezők összeszorzódnak.'
      },
      {
        id: 'gmq3-6',
        level: 3,
        question: 'Mi a feltétele annak, hogy két geometriai alakzat hasonló legyen egymáshoz a síkban?',
        options: [
          'Létezzen egy olyan középpontos hasonlóság és egy egybevágóság, amelyek egymásutánja az egyiket a másikba viszi át',
          'Oldalaik páronként párhuzamosak legyenek',
          'Területük pontosan egyenlő legyen',
          'Közös súlypontjuk legyen'
        ],
        correctAnswer: 0,
        explanation: 'Két alakzatot hasonlónak mondunk, ha az egyik egy középpontos hasonlóság és egy egybevágósági transzformáció egymás után való elvégzésével a másikba vihető.',
        hint: 'A hasonlóság a középpontos hasonlóság és az egybevágóság kompozíciója.'
      },
      {
        id: 'gmq3-7',
        level: 3,
        question: 'Miért nem kölcsönösen egyértelmű az árnyjáték a színházban?',
        options: [
          'Mert lényegesen különböző térbeli kéztartások azonos síkbeli árnyékot vetíthetnek a vászonra (dimenzióvesztés)',
          'Mert a fény színes',
          'Mert az árnyék nem létezik a valóságban',
          'Mert a vászon mindig mozog'
        ],
        correctAnswer: 0,
        explanation: 'A vetítés során a mélységi dimenzió elvész: különböző térbeli konfigurációk (pl. összekulcsolt ujjak) képe egybeeshet a vetületi síkon, így a leképezés nem invertálható.',
        hint: 'Dinoszaurusz alakú árnyékot emberi kézzel is lehet képezni.'
      },
      {
        id: 'gmq3-8',
        level: 3,
        question: 'Egy derékszögű háromszög befogói 4 cm és 5 cm. Mekkora az átfogó merőleges vetületének hossza a 4 cm-es befogó egyenesére?',
        options: [
          'Pontosan 4 cm',
          '5 cm',
          '3 cm',
          '6,4 cm'
        ],
        correctAnswer: 0,
        explanation: 'Az átfogó egyik végpontja a derékszögű csúcs felé esik, a másik végpontjából bocsátott merőleges éppen a derékszögű csúcsba fut be: a vetület hossza pontosan maga a 4 cm-es befogó!',
        hint: 'Rajzolj egy derékszögű háromszöget és vetítsd az átfogót az egyik befogó egyenesére.'
      },
      {
        id: 'gmq3-9',
        level: 3,
        question: 'Hogyan változik meg egy alakzat területe, ha egymás után alkalmazunk egy λ₁ = 2 arányú és egy λ₂ = 3 arányú hasonlósági transzformációt?',
        options: [
          '36-szorosára nő ( (2 · 3)² = 6² = 36 )',
          '6-szorosára nő',
          '12-szeresére nő',
          '24-szeresére nő'
        ],
        correctAnswer: 0,
        explanation: 'Az eredő hasonlósági arány λ = 2 · 3 = 6. A terület a hasonlósági arány négyzetével skálázódik: T\' = 6² · T = 36 · T.',
        hint: 'A területek a hasonlósági arány négyzetével szorzódnak: 2² · 3² = 4 · 9 = 36.'
      },
      {
        id: 'gmq3-10',
        level: 3,
        question: 'Melyik állítás foglalja össze legpontosabban a geometriai hozzárendelések alapvető tanulságát?',
        options: [
          'A geometriai hozzárendelések tágabb kategóriát alkotnak, mint a transzformációk; a mérnöki vetületek hasznosak, de nem távolságtartók',
          'Minden geometriai hozzárendelés távolságtartó',
          'A vetítés megőrzi a belső szögeket',
          'Csak a síkban lehet geometriai leképezést végezni'
        ],
        correctAnswer: 0,
        explanation: 'A vetületek (napóra, műszaki rajz) dimenziócsökkenéssel járó leképezések, míg a valódi transzformációk (egybevágóság, hasonlóság) bijektív sík-sík leképezések.',
        hint: 'A hierarchia: Leképezések ⊃ Transzformációk ⊃ Hasonlóságok ⊃ Egybevágóságok.'
      }
    ]
  }
};

export const GeometricMappingsQuiz: React.FC<GeometricMappingsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      topicTitle="3. Geometriai hozzárendelések"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GeometricMappingsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <GeometricMappingsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default GeometricMappingsQuiz;

