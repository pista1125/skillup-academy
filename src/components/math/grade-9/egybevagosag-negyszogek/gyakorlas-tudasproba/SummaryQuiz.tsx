import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, DifficultyLevel, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SummaryMatcher } from './SummaryMatcher';
import { SummarySorter } from './SummarySorter';
import { Award, Compass, Sparkles } from 'lucide-react';
import {
  TransformationsOverviewSvg,
  PolygonDiagonalsAnglesSvg
} from './SummaryFigures';
import {
  QuadrilateralHierarchySvg,
  QuadrilateralDiagonalsSvg
} from '../szimmetrikus-negyszogek/QuadrilateralFigures';

interface SummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const cheatSheet: CheatSheetItem[] = [
  {
    title: 'Transzformációk Rendszere',
    content: 'Tengelyes tükrözés: fix a tengely minden pontja, körüljárást megfordítja (irányváltó). Középpontos tükrözés: egyetlen fixpont (O), iránytartó (= 180°-os forgatás). Forgatás: fix az O centrum, iránytartó. Eltolás: nincs fixpont (ha v ≠ 0), fixegyenesek || v, iránytartó. Csúsztatva tükrözés: tengelyes tükrözés + párhuzamos eltolás, irányváltó.'
  },
  {
    title: 'Sokszögek Képletei',
    content: 'Belső szögek összege: S_n = (n − 2) · 180°. Szabályos sokszög egy belső szöge: ((n − 2) · 180°) / n. Egy csúcsból húzható átlók: n − 3. Összes átló száma: d_n = n(n − 3) / 2. Külső szögek összege: mindig 360° bármely konvex sokszögre.'
  },
  {
    title: 'Négyszögek Hierarchiája és Átlói',
    content: 'Átlók felezik egymást: Paralelogramma, Rombusz, Téglalap, Négyzet. Átlók egyenlők: Húrtrapéz, Téglalap, Négyzet. Átlók merőlegesek: Deltoid, Rombusz, Négyzet. Húrnégyszög: szemközti szögek összege 180° (α + γ = β + δ = 180°). Érintőnégyszög: szemközti oldalak összege egyenlő (a + c = b + d, Pitot-tétel).'
  },
  {
    title: 'Területképletek Mestertára',
    content: 'Téglalap: a · b. Négyzet: a² = d² / 2. Paralelogramma: a · m_a = b · m_b = a · b · sin(α). Trapéz: ((a + c) / 2) · m = k · m. Rombusz és Deltoid: (e · f) / 2. Általános négyszög: (e · f · sin(φ)) / 2. Varignon-paralelogramma területe fele az eredeti négyszögének: T_V = T / 2.'
  }
];

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: Alapismeretek, definíciók és alaptulajdonságok (30 kérdés: sq1-1 - sq1-30) ---
  // ==========================================
  {
    id: 'sq1-1',
    level: 1,
    question: 'Melyik egybevágósági transzformáció FORDÍTJA MEG az alakzatok körüljárási irányát (irányváltó transzformáció)?',
    figure: <TransformationsOverviewSvg size={200} />,
    options: [
      'A tengelyes tükrözés (és a csúsztatva tükrözés)',
      'A középpontos tükrözés',
      'A 90°-os síkbeli forgatás',
      'A párhuzamos eltolás'
    ],
    correctAnswer: 0,
    explanation: 'A síkban egybevágóságok közül kizárólag a tengelyes tükrözés és a vele kompozícióban lévő csúsztatva tükrözés irányváltó; a középpontos tükrözés, eltolás és forgatás mind iránytartó.'
  },
  {
    id: 'sq1-2',
    level: 1,
    question: 'Hány fixpontja van egy nemnulla vektorral végzett síkbeli párhuzamos eltolásnak?',
    options: [
      'Nincs egyetlen fixpontja sem',
      'Pontosan 1 fixpontja van',
      'Végtelen sok fixpontja van, egy egyenes mentén',
      '2 fixpontja van'
    ],
    correctAnswer: 0,
    explanation: 'Ha az eltolásvektor nem a nullvektor, a sík egyetlen pontja sem marad helyben, tehát a transzformációnak nincs fixpontja.'
  },
  {
    id: 'sq1-3',
    level: 1,
    question: 'Mennyi egy tetszőleges n-oldalú konvex sokszög belső szögeinek összege?',
    figure: <PolygonDiagonalsAnglesSvg size={200} />,
    options: [
      '(n − 2) · 180°',
      'n · 180°',
      '(n − 3) · 180°',
      '360°'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból meghúzva az átlókat a sokszög (n − 2) darab háromszögre bomlik, melyek szögeinek összege egyenként 180°, így S_n = (n − 2) · 180°.'
  },
  {
    id: 'sq1-4',
    level: 1,
    question: 'Mennyi a konvex sokszögek külső szögeinek összege, az oldalszámtól függetlenül?',
    options: [
      'Mindig pontosan 360°',
      '(n − 2) · 180°',
      'n · 90°',
      'Mindig 180°'
    ],
    correctAnswer: 0,
    explanation: 'Minden csúcsnál a belső és külső szög összege 180°. Az n darab összegéből (n · 180°) levonva a belső szögek összegét ((n − 2) · 180°), a külső szögek összege mindig pontosan 360°.'
  },
  {
    id: 'sq1-5',
    level: 1,
    question: 'Hány átló húzható egy n-oldalú konvex sokszög EGYETLEN adott csúcsából?',
    figure: <PolygonDiagonalsAnglesSvg size={200} />,
    options: [
      'n − 3',
      'n − 2',
      'n(n − 3) / 2',
      'n − 1'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból önmagába és a két közvetlen szomszédos csúcsba nem húzható átló (azok oldalak), így pontosan n − 3 csúcsba vezet átló.'
  },
  {
    id: 'sq1-6',
    level: 1,
    question: 'Melyik képlettel számítható ki egy n-oldalú konvex sokszög ÖSSZES átlójának száma?',
    figure: <PolygonDiagonalsAnglesSvg size={200} />,
    options: [
      'd_n = [n · (n − 3)] / 2',
      'd_n = n · (n − 3)',
      'd_n = [n · (n − 2)] / 2',
      'd_n = (n − 2) · 180°'
    ],
    correctAnswer: 0,
    explanation: 'Minden csúcsból n − 3 átló indul, ez n csúcs esetén n(n − 3), de minden átlót mindkét végpontjánál megszámoltunk, így kettővel kell osztani: d_n = n(n − 3) / 2.'
  },
  {
    id: 'sq1-7',
    level: 1,
    question: 'Mi a trapéz szabatos matematikai definíciója?',
    options: [
      'Olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja',
      'Olyan négyszög, amelynek pontosan két egyenlő oldala van',
      'Olyan négyszög, amelynek szemközti oldalai merőlegesek',
      'Olyan négyszög, amelynek minden szöge derékszög'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja (ezeket alapoknak nevezzük). Ezért a paralelogramma is speciális trapéz.'
  },
  {
    id: 'sq1-8',
    level: 1,
    question: 'Melyik állítás IGAZ MINDEN paralelogrammára az alábbiak közül?',
    figure: <QuadrilateralHierarchySvg size={200} />,
    options: [
      'Átlói felezik egymást',
      'Átlói merőlegesek egymásra',
      'Átlói egyenlő hosszúak',
      'Átlói felezik a belső szögeket'
    ],
    correctAnswer: 0,
    explanation: 'Minden paralelogramma középpontosan szimmetrikus az átlók metszéspontjára, ezért átlói felezik egymást. A merőlegesség csak a rombuszra, az egyenlőség pedig a téglalapra igaz.'
  },
  {
    id: 'sq1-9',
    level: 1,
    question: 'Mi a deltoid geometriai definíciója?',
    options: [
      'Olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszú',
      'Olyan négyszög, amelynek szemközti oldalai párhuzamosak',
      'Olyan négyszög, amelynek minden szöge egyenlő',
      'Olyan négyszög, amelynek átlói egyenlő hosszúak'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid olyan négyszög, amelynek két-két szomszédos oldala egyenlő hosszú. Ennek következménye, hogy az egyik átlója szimmetriatengely.'
  },
  {
    id: 'sq1-10',
    level: 1,
    question: 'Melyik négyszög középpontosan szimmetrikus és rendelkezik két egymásra merőleges szimmetriatengellyel (az oldalfelezők merőlegeseivel), de oldalai nem feltétlenül egyenlők?',
    options: [
      'A téglalap',
      'A rombusz',
      'A húrtrapéz',
      'Az általános deltoid'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap szimmetriatengelyei az oldalfelező merőlegesek (2 db), és középpontosan is szimmetrikus. A rombusz tengelyei ezzel szemben maguk az átlók.'
  },
  {
    id: 'sq1-11',
    level: 1,
    question: 'Hogyan számítható ki a rombusz területe az e és f átlói ismeretében?',
    options: [
      'T = (e · f) / 2',
      'T = e · f',
      'T = (e + f) / 2',
      'T = e² + f²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a rombusz átlói merőlegesek egymásra és felezik egymást, négy egybevágó derékszögű háromszögre bontják a rombuszt: T = 4 · [(e/2) · (f/2) / 2] = (e · f) / 2.'
  },
  {
    id: 'sq1-12',
    level: 1,
    question: 'Melyik négyszögbe írható MINDIG beírt kör (melyik érintőnégyszög mindig)?',
    options: [
      'A rombusz és a deltoid',
      'A téglalap és a paralelogramma',
      'A húrtrapéz és az általános paralelogramma',
      'Bármely trapéz'
    ],
    correctAnswer: 0,
    explanation: 'A rombuszban és deltoidban a szögfelezők egyetlen közös pontban metszik egymást (szimmetria vagy egyenlő oldalpárok miatt), így mindig létezik beírt körük.'
  },
  {
    id: 'sq1-13',
    level: 1,
    question: 'Milyen feltétel szükséges és elégséges ahhoz, hogy egy négyszög húrnégyszög (köré írható kör) legyen?',
    options: [
      'Szemközti belső szögeinek összege 180° (α + γ = β + δ = 180°)',
      'Szemközti oldalainak összege egyenlő (a + c = b + d)',
      'Átlói merőlegesek egymásra',
      'Átlói felezik egymást'
    ],
    correctAnswer: 0,
    explanation: 'A kerületi szögek tétele miatt egy négyszög akkor és csak akkor húrnégyszög, ha szemközti belső szögeinek összege 180°.'
  },
  {
    id: 'sq1-14',
    level: 1,
    question: 'Mekkora a trapéz középvonalának (k) hossza a párhuzamos a és c alapok függvényében?',
    options: [
      'k = (a + c) / 2',
      'k = (a − c) / 2',
      'k = √(a · c)',
      'k = a + c'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz szárainak felezőpontját összekötő középvonal hossza az alapok számtani közepe: k = (a + c) / 2, és párhuzamos az alapokkal.'
  },
  {
    id: 'sq1-15',
    level: 1,
    question: 'Egy rögzített O pont körüli 180°-os síkbeli forgatás melyik alapvető transzformációval azonos?',
    options: [
      'Az O pontra vonatkozó középpontos tükrözéssel',
      'Az O ponton átmenő tengelyes tükrözéssel',
      'Egy nullvektortól különböző eltolással',
      'Egy csúsztatva tükrözéssel'
    ],
    correctAnswer: 0,
    explanation: 'A középpontos tükrözés definíció szerint egybeesik az O pont körüli 180°-os (félfordulatnyi) síkbeli forgatással.'
  },
  {
    id: 'sq1-16',
    level: 1,
    question: 'Mekkora a v = (3; −4) vektor hossza (abszolút értéke)?',
    options: [
      '5',
      '7',
      '1',
      '25'
    ],
    correctAnswer: 0,
    explanation: 'A Pitagorasz-tétel alapján |v| = √(v_x² + v_y²) = √(3² + (−4)²) = √(9 + 16) = √25 = 5.'
  },
  {
    id: 'sq1-17',
    level: 1,
    question: 'Egy alakzatot egymás után tükrözünk két párhuzamos, egymástól d távolságra lévő tengelyre. Mi lesz az eredő transzformáció?',
    options: [
      'Egy 2d nagyságú párhuzamos eltolás a tengelyekre merőleges irányban',
      'Egy d nagyságú eltolás a tengelyekkel párhuzamosan',
      'Egy 180°-os forgatás',
      'Egy identikus leképezés (helybenhagyás)'
    ],
    correctAnswer: 0,
    explanation: 'Két párhuzamos tengelyre végzett tükrözés egymásutánja mindig eltolás, melynek távolsága a tengelyek távolságának kétszerese (2d), iránya pedig az első tengelytől a második felé mutató merőleges.'
  },
  {
    id: 'sq1-18',
    level: 1,
    question: 'Egy alakzatot egymás után tükrözünk két metsző, egymással α szöget bezáró tengelyre. Mi lesz az eredő transzformáció?',
    options: [
      'A metszéspont körüli 2α szögű forgatás',
      'Egy eltolás 2α távolsággal',
      'A metszéspontra vonatkozó középpontos tükrözés',
      'Egy α szögű forgatás'
    ],
    correctAnswer: 0,
    explanation: 'Két egymást metsző tengelyre történő tükrözés kompozíciója mindig forgatás a metszéspont körül, forgásszöge pedig a tengelyek által bezárt szög kétszerese (2α).'
  },
  {
    id: 'sq1-19',
    level: 1,
    question: 'Milyen háromszögben esik egybe a magasságpont, a súlypont, a beírt kör és a körülírt kör középpontja?',
    options: [
      'Csak a szabályos (egyenlő oldalú) háromszögben',
      'Minden egyenlő szárú háromszögben',
      'Minden derékszögű háromszögben',
      'Bármely hegyesszögű háromszögben'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög teljes 3-szoros forgásszimmetriája és 3 szimmetriatengelye miatt minden nevezetes pontja és vonala pontosan a geometriai középpontjában esik egybe.'
  },
  {
    id: 'sq1-20',
    level: 1,
    question: 'Hány fokos egy szabályos ötszög egy belső szöge?',
    options: [
      '108°',
      '120°',
      '72°',
      '135°'
    ],
    correctAnswer: 0,
    explanation: 'A belső szögek összege (5 − 2) · 180° = 540°. Mivel 5 egyenlő szöge van: 540° / 5 = 108°.'
  },
  {
    id: 'sq1-21',
    level: 1,
    question: 'Mely szabályos sokszögekkel LEHET önmagukban hézagmentesen és átfedésmentesen lefedni a síkot (szabályos parkettázás)?',
    options: [
      'Kizárólag a szabályos háromszöggel, négyzettel és szabályos hatszöggel',
      'Minden szabályos sokszöggel',
      'Szabályos háromszöggel, ötszöggel és hatszöggel',
      'Csak a négyzettel'
    ],
    correctAnswer: 0,
    explanation: 'A csúcsok körül a belső szögek összegének 360°-ot kell adniuk. Mivel 360° / 60° = 6, 360° / 90° = 4, 360° / 120° = 3 egész számok, csak a szabályos 3-, 4- és 6-szögek alkalmasak szabályos parkettázásra.'
  },
  {
    id: 'sq1-22',
    level: 1,
    question: 'Mi a Varignon-tétel állítása bármely konvex négyszög oldalfelező pontjairól?',
    options: [
      'Az oldalfelező pontok sorban összekötve mindig egy paralelogrammát alkotnak',
      'Az oldalfelező pontok mindig egy téglalapot alkotnak',
      'Az oldalfelező pontok mindig egy négyzetet határoznak meg',
      'Az oldalfelező pontok területe megegyezik az eredeti négyszögével'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög középvonalának tulajdonsága miatt a szemközti összekötő szakaszok párhuzamosak a négyszög átlóival és egyenlők azok felével, így mindig paralelogrammát alkotnak.'
  },
  {
    id: 'sq1-23',
    level: 1,
    question: 'Milyen speciális négyszöget alkotnak egy rombusz oldalfelező pontjai?',
    options: [
      'Téglalapot (mert a rombusz átlói merőlegesek)',
      'Rombuszt',
      'Négyzetet',
      'Deltoidot'
    ],
    correctAnswer: 0,
    explanation: 'A Varignon-paralelogramma oldalai párhuzamosak az eredeti négyszög átlóival. Mivel a rombusz átlói merőlegesek, a keletkező paralelogramma oldalai is merőlegesek egymásra, tehát téglalap.'
  },
  {
    id: 'sq1-24',
    level: 1,
    question: 'Mit nevezünk a geometriában csúsztatva tükrözésnek?',
    figure: <TransformationsOverviewSvg size={200} />,
    options: [
      'Egy tengelyes tükrözés és egy a tengellyel párhuzamos eltolás kompozícióját',
      'Két egymást metsző tengelyre való egymás utáni tükrözést',
      'Egy pontra tükrözést és egy rá merőleges eltolást',
      'Egy forgatást és egy tetszőleges irányú eltolást'
    ],
    correctAnswer: 0,
    explanation: 'A csúsztatva tükrözés egy adott egyenesre történő tengelyes tükrözés és egy a tengellyel párhuzamos irányú vektorral való eltolás egymásutánja (irányváltó, nincs fixpontja).'
  },
  {
    id: 'sq1-25',
    level: 1,
    question: 'Hogyan képezzük két síkbeli vektor különbségét koordinátákkal: a = (a₁, a₂) és b = (b₁, b₂)?',
    options: [
      'a − b = (a₁ − b₁; a₂ − b₂)',
      'a − b = (a₁ + b₁; a₂ + b₂)',
      'a − b = (a₁ · b₁; a₂ · b₂)',
      'a − b = (b₁ − a₁; b₂ − a₂)'
    ],
    correctAnswer: 0,
    explanation: 'A vektorok kivonásakor a megfelelő koordinátákat egymásból vonjuk ki: az elsőből a másodikat, azaz (a₁ − b₁; a₂ − b₂).'
  },
  {
    id: 'sq1-26',
    level: 1,
    question: 'Hány szimmetriatengelye van egy nem négyzet alakú téglalapnak?',
    options: [
      'Pontosan 2 (a szemközti oldalak felezőmerőlegesei)',
      '4 (a két átló és a két oldalfelező)',
      '1',
      'Végtelen sok'
    ],
    correctAnswer: 0,
    explanation: 'Egy téglalapnak 2 szimmetriatengelye van: a szemközti oldalfelező pontokat összekötő szakaszok egyenesei. Átlói nem szimmetriatengelyek, hacsak nem négyzet.'
  },
  {
    id: 'sq1-27',
    level: 1,
    question: 'Melyik négyszög átlói merőlegesek egymásra ÉS egyben szimmetriatengelyei is az alakzatnak?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'A rombusz (és négyzet)',
      'A húrtrapéz',
      'A téglalap',
      'A paralelogramma'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz mindkét átlója szimmetriatengely, és az átlók merőlegesen felezik egymást.'
  },
  {
    id: 'sq1-28',
    level: 1,
    question: 'Mikor szerkeszthető meg egy háromszög három adott a, b, c szakaszhosszból a háromszög-egyenlőtlenség szerint?',
    options: [
      'Ha bármely két oldal összege szigorúan nagyobb a harmadik oldalnál (a+b>c, a+c>b, b+c>a)',
      'Ha a leghosszabb oldal egyenlő a másik kettő összegével',
      'Ha a² + b² = c²',
      'Ha a három oldal összege páros szám'
    ],
    correctAnswer: 0,
    explanation: 'Háromszög akkor és csak akkor létezik (szerkeszthető), ha a háromszög-egyenlőtlenség teljesül: bármely két oldal hossza szigorúan meghaladja a harmadik oldal hosszát.'
  },
  {
    id: 'sq1-29',
    level: 1,
    question: 'Mi a szakaszfelező merőleges egyenes pontjainak geometriai helye a síkban?',
    options: [
      'Azon pontok halmaza, amelyek a szakasz két végpontjától egyenlő távolságra vannak',
      'Azon pontok halmaza, amelyek távolsága a szakasz felezőpontjától állandó',
      'A szakaszhoz húzható érintők halmaza',
      'A szakasz végpontjaival derékszöget bezáró pontok halmaza'
    ],
    correctAnswer: 0,
    explanation: 'A szakaszfelező merőleges minden egyes pontja pontosan azonos távolságra van az AB szakasz mindkét végpontjától (d(P, A) = d(P, B)).'
  },
  {
    id: 'sq1-30',
    level: 1,
    question: 'Mi a szögfelező félegyenes belső pontjainak geometriai helye a síkban?',
    options: [
      'A szögszáraktól egyenlő távolságra lévő síkbeli pontok halmaza',
      'A szög csúcsától azonos távolságra lévő pontok',
      'A szöget merőlegesen metsző egyenesek felezőpontjai',
      'A csúcs körüli körívek középpontjai'
    ],
    correctAnswer: 0,
    explanation: 'A szögfelező félegyenes azon belső pontok halmaza, amelyek merőleges távolsága a szög két szárától egyenlő.'
  },

  // ==========================================
  // --- 2. SZINT: Alkalmazások és számításos összefüggések (30 kérdés: sq2-1 - sq2-30) ---
  // ==========================================
  {
    id: 'sq2-1',
    level: 2,
    question: 'Hány átlója van egy konvex nyolcszögnek (oktogon)?',
    figure: <PolygonDiagonalsAnglesSvg size={200} />,
    options: [
      '20',
      '24',
      '16',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'd_8 = [8 · (8 − 3)] / 2 = (8 · 5) / 2 = 40 / 2 = 20 átló.'
  },
  {
    id: 'sq2-2',
    level: 2,
    question: 'Egy konvex sokszög belső szögeinek összege 1260°. Hány oldala van a sokszögnek?',
    options: [
      '9 (kilencszög)',
      '8 (nyolcszög)',
      '10 (tízszög)',
      '7 (hétszög)'
    ],
    correctAnswer: 0,
    explanation: '(n − 2) · 180° = 1260° ⇒ n − 2 = 1260 / 180 = 7 ⇒ n = 9.'
  },
  {
    id: 'sq2-3',
    level: 2,
    question: 'Egy deltoid átlói e = 14 cm és f = 9 cm hosszúak. Mekkora a deltoid területe?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      '63 cm²',
      '126 cm²',
      '46 cm²',
      '31,5 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid átlói merőlegesek egymásra, ezért területe: T = (e · f) / 2 = (14 · 9) / 2 = 126 / 2 = 63 cm².'
  },
  {
    id: 'sq2-4',
    level: 2,
    question: 'Egy trapéz párhuzamos alapjai a = 16 cm és c = 10 cm, magassága m = 6 cm. Mekkora a trapéz középvonala és területe?',
    options: [
      'Középvonal k = 13 cm; Terület T = 78 cm²',
      'Középvonal k = 12 cm; Terület T = 72 cm²',
      'Középvonal k = 13 cm; Terület T = 156 cm²',
      'Középvonal k = 26 cm; Terület T = 78 cm²'
    ],
    correctAnswer: 0,
    explanation: 'k = (16 + 10) / 2 = 13 cm. T = k · m = 13 · 6 = 78 cm².'
  },
  {
    id: 'sq2-5',
    level: 2,
    question: 'Egy paralelogramma két szomszédos oldala a = 8 cm és b = 6 cm, az általuk bezárt szög 30°. Mekkora a területe?',
    options: [
      '24 cm²',
      '48 cm²',
      '24√3 cm²',
      '12 cm²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b · sin(30°) = 8 · 6 · 0,5 = 24 cm².'
  },
  {
    id: 'sq2-6',
    level: 2,
    question: 'Egy rombusz oldala a = 10 cm, egyik átlója e = 12 cm. Mekkora a másik átlója (f) és a rombusz területe?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'f = 16 cm és T = 96 cm²',
      'f = 14 cm és T = 84 cm²',
      'f = 16 cm és T = 192 cm²',
      'f = 8 cm és T = 48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz átlói felezik egymást és merőlegesek. (e/2)² + (f/2)² = a² ⇒ 6² + (f/2)² = 10² ⇒ 36 + (f/2)² = 100 ⇒ (f/2)² = 64 ⇒ f/2 = 8 ⇒ f = 16 cm. T = (12 · 16) / 2 = 96 cm².'
  },
  {
    id: 'sq2-7',
    level: 2,
    question: 'Egy húrnégyszög három egymást követő belső szöge sorban α = 70°, β = 110°, γ = 110°. Mekkora a negyedik, δ szöge?',
    options: [
      '70°',
      '80°',
      '110°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti szögek összege 180°: β + δ = 180° ⇒ 110° + δ = 180° ⇒ δ = 70° (és α + γ = 70° + 110° = 180° is teljesül).'
  },
  {
    id: 'sq2-8',
    level: 2,
    question: 'Egy érintőnégyszög egymást követő oldalai rendre a = 7 cm, b = 11 cm, c = 9 cm. Mekkora a negyedik oldala (d)?',
    options: [
      '5 cm',
      '9 cm',
      '13 cm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: 'Pitot-tétel: a + c = b + d ⇒ 7 + 9 = 11 + d ⇒ 16 = 11 + d ⇒ d = 5 cm.'
  },
  {
    id: 'sq2-9',
    level: 2,
    question: "Az A(2; −3) pontot eltoljuk a v = (−5; 7) vektorral. Mik lesznek a kapott A' képpont koordinátái?",
    options: [
      "A'(−3; 4)",
      "A'(7; −10)",
      "A'(−3; −10)",
      "A'(−10; −21)"
    ],
    correctAnswer: 0,
    explanation: "A' = (x_A + v_x; y_A + v_y) = (2 + (−5); −3 + 7) = (−3; 4)."
  },
  {
    id: 'sq2-10',
    level: 2,
    question: 'Az origóra (0; 0) vonatkozó középpontos tükrözés a P(4; −9) pontot melyik pontba képezi le?',
    options: [
      "P'(−4; 9)",
      "P'(4; 9)",
      "P'(−4; −9)",
      "P'(−9; 4)"
    ],
    correctAnswer: 0,
    explanation: 'Az origóra vonatkozó tükrözés mindkét koordináta előjelét megfordítja: (x; y) ↦ (−x; −y), így (4; −9) ↦ (−4; 9).'
  },
  {
    id: 'sq2-11',
    level: 2,
    question: 'Egy húrtrapéz (szimmetrikus trapéz) alapjai 20 cm és 8 cm, szárai pedig 10 cm hosszúak. Mekkora a magassága és területe?',
    options: [
      'Magasság m = 8 cm; Terület T = 112 cm²',
      'Magasság m = 6 cm; Terület T = 84 cm²',
      'Magasság m = 8 cm; Terület T = 224 cm²',
      'Magasság m = 10 cm; Terület T = 140 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A levágott derékszögű háromszög alapja: x = (20 − 8) / 2 = 6 cm. Magasság: m = √(10² − 6²) = √(100 − 36) = √64 = 8 cm. Terület: T = [(20 + 8) / 2] · 8 = 14 · 8 = 112 cm².'
  },
  {
    id: 'sq2-12',
    level: 2,
    question: 'Egy konvex négyszög területe 48 cm². Mekkora területet zár be az oldalfelező pontjai által alkotott Varignon-paralelogramma?',
    options: [
      '24 cm²',
      '12 cm²',
      '36 cm²',
      '48 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A Varignon-tétel értelmében a tetszőleges konvex négyszög oldalfelező pontjai által bezárt terület mindig pontosan a fele az eredeti négyszög területének: 48 / 2 = 24 cm².'
  },
  {
    id: 'sq2-13',
    level: 2,
    question: 'Mekkora a szabályos tizenkétszög (dodekagon) egyetlen belső szöge?',
    options: [
      '150°',
      '144°',
      '160°',
      '135°'
    ],
    correctAnswer: 0,
    explanation: 'Külső szög: 360° / 12 = 30°. Mivel belső + külső = 180°, ezért a belső szög = 180° − 30° = 150° (vagy [(12 − 2) · 180°] / 12 = 1800° / 12 = 150°).'
  },
  {
    id: 'sq2-14',
    level: 2,
    question: 'Körzővel és vonalzóval megszerkesztünk egy 60°-os és egy 90°-os szöget közös száron, majd a különbségüket megfelezzük. Hány fokos szöget kapunk?',
    options: [
      '15°',
      '30°',
      '45°',
      '7,5°'
    ],
    correctAnswer: 0,
    explanation: 'A 90° és 60° különbsége 30°, ennek a szögfelezője pontosan 15°-os szöget eredményez.'
  },
  {
    id: 'sq2-15',
    level: 2,
    question: 'Egy derékszögű háromszög átfogója c = 10 cm. Mekkora a háromszög köré írható kör sugara (R)?',
    options: [
      '5 cm',
      '10 cm',
      '2,5 cm',
      '5√2 cm'
    ],
    correctAnswer: 0,
    explanation: 'A Thalész-tétel miatt a derékszögű háromszög köré írt körének középpontja pontosan az átfogó felezőpontja, így sugara az átfogó fele: R = c / 2 = 5 cm.'
  },
  {
    id: 'sq2-16',
    level: 2,
    question: 'Adott az a = (−2; 5) és b = (4; 1) vektor. Határozd meg a 3a − 2b vektor koordinátáit!',
    options: [
      '(−14; 13)',
      '(2; 17)',
      '(−14; 17)',
      '(−2; 8)'
    ],
    correctAnswer: 0,
    explanation: '3a = 3 · (−2; 5) = (−6; 15). 2b = 2 · (4; 1) = (8; 2). 3a − 2b = (−6 − 8; 15 − 2) = (−14; 13).'
  },
  {
    id: 'sq2-17',
    level: 2,
    question: 'Egy négyzet átlója d = 10 cm. Mekkora a négyzet területe?',
    options: [
      '50 cm²',
      '100 cm²',
      '25 cm²',
      '50√2 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet átlói merőlegesek és egyenlők, így T = d² / 2 = 10² / 2 = 100 / 2 = 50 cm².'
  },
  {
    id: 'sq2-18',
    level: 2,
    question: 'Egy téglalap átlói 12 cm hosszúak és 60°-os szöget zárnak be egymással. Mekkora a területe?',
    options: [
      '36√3 cm² (kb. 62,35 cm²)',
      '72 cm²',
      '72√3 cm²',
      '36 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Bármely négyszög területe T = (1/2) · e · f · sin(φ). Mivel téglalapban e = f = 12 cm és φ = 60°: T = 0,5 · 12 · 12 · sin(60°) = 72 · (√3 / 2) = 36√3 cm².'
  },
  {
    id: 'sq2-19',
    level: 2,
    question: 'Ha egy konvex sokszögnek összesen 35 átlója van, hány csúcsa van a sokszögnek?',
    options: [
      '10 (tízszög)',
      '9',
      '12',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'n(n − 3) / 2 = 35 ⇒ n(n − 3) = 70. Két 3-mal eltérő szorzótényező: 10 · 7 = 70, így n = 10.'
  },
  {
    id: 'sq2-20',
    level: 2,
    question: 'Egy egyenlő szárú trapéz kerülete 44 cm, párhuzamos alapjai 18 cm és 8 cm. Mekkora egy-egy szár hossza?',
    options: [
      '9 cm',
      '18 cm',
      '10 cm',
      '8 cm'
    ],
    correctAnswer: 0,
    explanation: 'K = a + c + 2b ⇒ 44 = 18 + 8 + 2b = 26 + 2b ⇒ 2b = 18 ⇒ b = 9 cm.'
  },
  {
    id: 'sq2-21',
    level: 2,
    question: 'Egy rombusz kerülete K = 40 cm, területe T = 80 cm². Mekkora a rombusz magassága (m)?',
    options: [
      '8 cm',
      '10 cm',
      '4 cm',
      '16 cm'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz oldala a = K / 4 = 40 / 4 = 10 cm. Mivel T = a · m, így 80 = 10 · m ⇒ m = 8 cm.'
  },
  {
    id: 'sq2-22',
    level: 2,
    question: 'Egy szabályos sokszög egyetlen külső szöge 24°. Hány oldala van a sokszögnek?',
    options: [
      '15 oldalú',
      '12 oldalú',
      '16 oldalú',
      '18 oldalú'
    ],
    correctAnswer: 0,
    explanation: 'A külső szögek összege mindig 360°. Egy szög 24°, így n = 360° / 24° = 15 oldal.'
  },
  {
    id: 'sq2-23',
    level: 2,
    question: "Az A(1; 2) pontot tükrözzük a C(4; 5) pontra. Mik lesznek az A' tükörkép koordinátái?",
    options: [
      "A'(7; 8)",
      "A'(8; 7)",
      "A'(5; 7)",
      "A'(3; 3)"
    ],
    correctAnswer: 0,
    explanation: "C a felezőpont: x_C = (x_A + x_A') / 2 ⇒ 4 = (1 + x) / 2 ⇒ x = 7; y_C = (y_A + y_A') / 2 ⇒ 5 = (2 + y) / 2 ⇒ y = 8. Tehát A'(7; 8)."
  },
  {
    id: 'sq2-24',
    level: 2,
    question: 'Egy derékszögű trapéz párhuzamos alapjai 14 cm és 9 cm, ferde szára pedig 13 cm. Mekkora a magassága és területe?',
    options: [
      'Magasság m = 12 cm; Terület T = 138 cm²',
      'Magasság m = 12 cm; Terület T = 276 cm²',
      'Magasság m = 10 cm; Terület T = 115 cm²',
      'Magasság m = 8 cm; Terület T = 92 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög alapja: x = 14 − 9 = 5 cm. A magasság: m = √(13² − 5²) = √(169 − 25) = √144 = 12 cm. T = [(14 + 9) / 2] · 12 = 23 · 6 = 138 cm².'
  },
  {
    id: 'sq2-25',
    level: 2,
    question: 'Két egymást metsző egyenes által bezárt szög 35°. Egymás után tükrözünk mindkét egyenesre. Mekkora szögű forgatást kapunk eredményül?',
    options: [
      '70°-os forgatást',
      '35°-os forgatást',
      '140°-os forgatást',
      '180°-os forgatást'
    ],
    correctAnswer: 0,
    explanation: 'Két metsző tengelyre történő tükrözés kompozíciója forgatás a tengelyek hajlásszögének kétszeresével: 2 · 35° = 70°.'
  },
  {
    id: 'sq2-26',
    level: 2,
    question: 'Egy deltoid szimmetriaátlója 16 cm hosszú. A másik átlója 10 cm-es, és a szimmetriaátló 12 cm és 4 cm-es részekre osztja. Mekkorák az oldalai?',
    options: [
      '13 cm és √41 cm (kb. 6,4 cm)',
      '13 cm és 10 cm',
      '12 cm és 5 cm',
      '15 cm és 6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetriaátló felezi a másikat (5 cm és 5 cm darabokra). A Pitagorasz-tételből a kétféle oldalhossz: a = √(5² + 12²) = √(25 + 144) = √169 = 13 cm; b = √(5² + 4²) = √(25 + 16) = √41 cm.'
  },
  {
    id: 'sq2-27',
    level: 2,
    question: 'Megszerkeszthető-e háromszög az a = 7 cm, b = 4 cm és c = 3 cm szakaszokból?',
    options: [
      'Nem, mert 4 + 3 = 7, a háromszög elfajuló szakaszt adna (nem teljesül a szigorú egyenlőtlenség)',
      'Igen, mert a két rövidebb oldal összege eléri a leghosszabbat',
      'Igen, derékszögű háromszögként',
      'Csak tompaszögűként szerkeszthető'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szigorú: b + c > a kellene, hogy legyen, de 4 + 3 = 7 nem nagyobb 7-nél, a három pont egy egyenesre esne.'
  },
  {
    id: 'sq2-28',
    level: 2,
    question: 'Egy vektor kezdőpontja P(−1; 4), végpontja Q(5; −4). Mekkora a PQ vektor hossza?',
    options: [
      '10',
      '14',
      '8',
      '6'
    ],
    correctAnswer: 0,
    explanation: 'PQ = (5 − (−1); −4 − 4) = (6; −8). Hossza: √(6² + (−8)²) = √(36 + 64) = √100 = 10.'
  },
  {
    id: 'sq2-29',
    level: 2,
    question: 'Egy háromszög súlypontja milyen arányban osztja a súlyvonalakat a csúcstól számítva?',
    options: [
      '2 : 1 arányban',
      '1 : 1 arányban (felezi)',
      '3 : 1 arányban',
      '1 : 2 arányban'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög súlypontja a súlyvonalak metszéspontja, és minden súlyvonalat a csúcstól távolodva 2 : 1 arányban oszt két részre.'
  },
  {
    id: 'sq2-30',
    level: 2,
    question: 'Egy konvex sokszög belső szögeinek összege négyszerese a külső szögeinek összegének. Hány oldalú a sokszög?',
    options: [
      '10 oldalú (tízszög)',
      '8 oldalú',
      '12 oldalú',
      '6 oldalú'
    ],
    correctAnswer: 0,
    explanation: 'A külső szögek összege 360°. Így a belső szögek összege 4 · 360° = 1440°. (n − 2) · 180° = 1440° ⇒ n − 2 = 8 ⇒ n = 10.'
  },

  // ==========================================
  // --- 3. SZINT: Összetett és emelt szintű érettségi/verseny problémák (30 kérdés: sq3-1 - sq3-30) ---
  // ==========================================
  {
    id: 'sq3-1',
    level: 3,
    question: 'Egy húrnégyszög átlói merőlegesek egymásra, és az M metszéspont az átlókat 2 cm, 6 cm illetve 3 cm, 4 cm hosszúságú szakaszokra osztja. Mekkora a húrnégyszög területe?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      '28 cm²',
      '56 cm²',
      '24 cm²',
      '36 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Az átlók hossza: e = 2 + 6 = 8 cm, f = 3 + 4 = 7 cm. Mivel átlói merőlegesek, területe T = (e · f) / 2 = (8 · 7) / 2 = 28 cm².'
  },
  {
    id: 'sq3-2',
    level: 3,
    question: 'Egy derékszögű trapéz érintőnégyszög (beírt körrel rendelkezik). Párhuzamos oldalai a = 8 cm és c = 2 cm. Mekkora a beírt kör sugara (r) és a trapéz területe?',
    options: [
      'Sugár r = 1,6 cm; Terület T = 16 cm²',
      'Sugár r = 2 cm; Terület T = 20 cm²',
      'Sugár r = 2,5 cm; Terület T = 25 cm²',
      'Sugár r = 1,8 cm; Terület T = 18 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű szár b = 2r. A Pitot-tétel szerint a + c = b + d ⇒ 8 + 2 = 2r + d ⇒ d = 10 − 2r. A ferde szárra Pitagorasz-tétel: (a − c)² + b² = d² ⇒ 6² + (2r)² = (10 − 2r)² ⇒ 36 + 4r² = 100 − 40r + 4r² ⇒ 40r = 64 ⇒ r = 1,6 cm. Magasság m = 3,2 cm. T = [(8 + 2) / 2] · 3,2 = 5 · 3,2 = 16 cm².'
  },
  {
    id: 'sq3-3',
    level: 3,
    question: 'Egy konvex négyszög átlói e = 10 cm és f = 16 cm, és az átlók által bezárt szög 45°. Mekkora a négyszög területe?',
    options: [
      '40√2 cm² (kb. 56,57 cm²)',
      '80 cm²',
      '80√2 cm²',
      '40 cm²'
    ],
    correctAnswer: 0,
    explanation: 'T = (1/2) · e · f · sin(φ) = 0,5 · 10 · 16 · sin(45°) = 80 · (√2 / 2) = 40√2 cm².'
  },
  {
    id: 'sq3-4',
    level: 3,
    question: 'Egy paralelogramma szomszédos oldalainak hossza 7 cm és 9 cm, egyik átlója 8 cm. Mekkora a másik átlója?',
    options: [
      '14 cm',
      '12 cm',
      '√196 cm = 14 cm',
      '13 cm'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogramma-azonosság szerint e² + f² = 2(a² + b²). 8² + f² = 2(7² + 9²) = 2(49 + 81) = 2 · 130 = 260. f² = 260 − 64 = 196 ⇒ f = √196 = 14 cm.'
  },
  {
    id: 'sq3-5',
    level: 3,
    question: 'Egy szimmetrikus trapéz köré írt körének sugara R = 5 cm. Hosszabbik alapja a kör átmérője (a = 10 cm), szára b = 6 cm. Mekkora a trapéz magassága és területe?',
    options: [
      'Magasság m = 4,8 cm; Terület T = 30,72 cm²',
      'Magasság m = 5 cm; Terület T = 32 cm²',
      'Magasság m = 4,5 cm; Terület T = 28,8 cm²',
      'Magasság m = 4,8 cm; Terület T = 36 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Thalész tétele miatt az átló és a szár derékszöget zár be: átló d = √(10² − 6²) = 8 cm. A derékszögű háromszög területe: (6 · 8) / 2 = (10 · m) / 2 ⇒ m = 4,8 cm. A szár vetülete x = √(6² − 4,8²) = 3,6 cm. Rövidebb alap c = 10 − 2 · 3,6 = 2,8 cm. Terület: T = [(10 + 2,8) / 2] · 4,8 = 6,4 · 4,8 = 30,72 cm².'
  },
  {
    id: 'sq3-6',
    level: 3,
    question: 'Egy húrnégyszög egymást követő oldalai a = 1, b = 4, c = 7, d = 8. Mekkora a húrnégyszög területe a Brahmagupta-képlet szerint?',
    options: [
      '18',
      '24',
      '√324 = 18',
      '16'
    ],
    correctAnswer: 0,
    explanation: 'Félkerület s = (1 + 4 + 7 + 8) / 2 = 10. T = √[(s−a)(s−b)(s−c)(s−d)] = √[(10−1)(10−4)(10−7)(10−8)] = √(9 · 6 · 3 · 2) = √324 = 18.'
  },
  {
    id: 'sq3-7',
    level: 3,
    question: 'A síkban a P(2; 1) pontot egymás után eltoljuk v₁ = (4; −3), majd v₂ = (−1; 7) vektorral, végül az origó körül elforgatjuk 180°-kal. Mik lesznek a végső pont koordinátái?',
    figure: <TransformationsOverviewSvg size={200} />,
    options: [
      '(−5; −5)',
      '(5; 5)',
      '(−3; 4)',
      '(5; −5)'
    ],
    correctAnswer: 0,
    explanation: "Az eltolások eredője v = v₁ + v₂ = (3; 4). P' = (2+3; 1+4) = (5; 5). A 180°-os forgatás az origó körüli középpontos tükrözés: (−x; −y), így (−5; −5)."
  },
  {
    id: 'sq3-8',
    level: 3,
    question: 'Egy rombusz magassága m = 9,6 cm, egyik átlója e = 12 cm. Mekkora a rombusz oldala és területe?',
    options: [
      'Oldal a = 10 cm; Terület T = 96 cm²',
      'Oldal a = 12 cm; Terület T = 115,2 cm²',
      'Oldal a = 8 cm; Terület T = 76,8 cm²',
      'Oldal a = 10 cm; Terület T = 120 cm²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · m = (e · f) / 2 ⇒ 9,6 a = 6 f ⇒ f = 1,6 a. A derékszögű háromszögből: (e/2)² + (f/2)² = a² ⇒ 6² + (0,8 a)² = a² ⇒ 36 + 0,64 a² = a² ⇒ 0,36 a² = 36 ⇒ a² = 100 ⇒ a = 10 cm. T = 10 · 9,6 = 96 cm² (és f = 16 cm).'
  },
  {
    id: 'sq3-9',
    level: 3,
    question: 'Egy tetszőleges nem szabályos háromszögben a körülírt kör középpontja (O), súlypontja (S) és magasságpontja (M) egy egyenesre esik (Euler-egyenes). Milyen arányban osztja a súlypont az OM szakaszt?',
    options: [
      'MS : SO = 2 : 1 arányban',
      'MS : SO = 1 : 1 arányban',
      'MS : SO = 3 : 1 arányban',
      'MS : SO = 1 : 2 arányban'
    ],
    correctAnswer: 0,
    explanation: 'Euler nevezetes tétele szerint a súlypont (S) a magasságpont (M) és körülírt kör középpontja (O) közötti OM szakaszon fekszik, és azt MS : SO = 2 : 1 arányban osztja.'
  },
  {
    id: 'sq3-10',
    level: 3,
    question: 'Egy szabályos kilencszögnek (enneagon) hány olyan átlója van, amely NEM halad át a sokszög középpontján?',
    figure: <PolygonDiagonalsAnglesSvg size={200} />,
    options: [
      'Mind a 27 átlója (páratlan oldalszám esetén egyetlen átló sem halad át a középponton)',
      '18',
      '9',
      '24'
    ],
    correctAnswer: 0,
    explanation: 'Összes átló: d_9 = 9 · (9 − 3) / 2 = 27. Mivel 9 páratlan szám, a szemközti csúcs helyett a csúccsal szemben oldalél van, így egyetlen átló sem haladhat át a középponton: mind a 27 átló elkerüli azt.'
  },
  {
    id: 'sq3-11',
    level: 3,
    question: 'Egy téglalap belsejében elhelyezkedő P pont távolsága a csúcsoktól rendre PA = 3 cm, PB = 7 cm, PC = 9 cm. Mekkora a PD távolság a brit zászló tétel (British Flag Theorem) alapján?',
    options: [
      '√41 cm (kb. 6,4 cm)',
      '5 cm',
      '√65 cm',
      '7 cm'
    ],
    correctAnswer: 0,
    explanation: 'A brit zászló tétele szerint téglalap belsejében fekvő bármely pontra PA² + PC² = PB² + PD². 3² + 9² = 7² + PD² ⇒ 9 + 81 = 49 + PD² ⇒ 90 = 49 + PD² ⇒ PD² = 41 ⇒ PD = √41 cm.'
  },
  {
    id: 'sq3-12',
    level: 3,
    question: 'Egy egyenlő szárú trapézba kör írható (érintőnégyszög). Párhuzamos alapjai a = 16 cm és c = 4 cm. Mekkora a trapéz területe?',
    options: [
      '80 cm²',
      '160 cm²',
      '64 cm²',
      '96 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Érintőnégyszög lévén: 2b = a + c = 16 + 4 = 20 ⇒ szár b = 10 cm. A magasság kiszámítása derékszögű háromszögből: x = (16 − 4) / 2 = 6 cm. m = √(10² − 6²) = 8 cm. Terület T = [(16 + 4) / 2] · 8 = 10 · 8 = 80 cm².'
  },
  {
    id: 'sq3-13',
    level: 3,
    question: 'Mekkora egy szabályos hatszög beírt és körülírt köre területének aránya (T_beírt / T_köré)?',
    options: [
      '3 / 4 (azaz 75%)',
      '1 / 2',
      '√3 / 2',
      '2 / 3'
    ],
    correctAnswer: 0,
    explanation: 'A köré írt kör sugara R = a, a beírt köré r = (a√3) / 2. Területek aránya a sugarak négyzetének aránya: (r / R)² = [(a√3 / 2) / a]² = (√3 / 2)² = 3 / 4.'
  },
  {
    id: 'sq3-14',
    level: 3,
    question: 'Egy síkbeli alakzatot először tükrözünk az x tengelyre, majd az y = x egyenesre. Mi az eredő transzformáció?',
    options: [
      'Az origó körüli +90°-os (óramutatóval ellentétes) elforgatás',
      'Az origó körüli −90°-os elforgatás',
      'Origóra vonatkozó középpontos tükrözés',
      'Eltolás az (1; 1) vektorral'
    ],
    correctAnswer: 0,
    explanation: 'Az x tengely irányszöge 0°, az y = x egyenesé 45°. A két tengely hajlásszöge 45°. A két egymást követő tükrözés kompozíciója a metszéspont (origó) körüli 2 · 45° = 90°-os forgatás.'
  },
  {
    id: 'sq3-15',
    level: 3,
    question: 'Egy egyenlő szárú háromszög alapja 12 cm, szárai 10 cm-esek. Mekkora a háromszögbe írható kör sugara (r)?',
    options: [
      '3 cm',
      '2,5 cm',
      '4 cm',
      '3,5 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az alaphoz tartozó magasság: m = √(10² − 6²) = 8 cm. A terület T = (12 · 8) / 2 = 48 cm². A félkerület s = (12 + 10 + 10) / 2 = 16 cm. Beírt kör sugara: r = T / s = 48 / 16 = 3 cm.'
  },
  {
    id: 'sq3-16',
    level: 3,
    question: 'Egy négyszög csúcsai A(0; 0), B(6; 0), C(8; 4), D(2; 4). Milyen négyszög ez és mekkora a területe?',
    options: [
      'Paralelogramma, területe 24 területegység',
      'Trapéz, területe 32 területegység',
      'Rombusz, területe 24 területegység',
      'Téglalap, területe 28 területegység'
    ],
    correctAnswer: 0,
    explanation: 'AB és CD vízszintes szakaszok, hosszuk 6, egymással párhuzamosak és egyenlők ⇒ paralelogramma. Az alap 6, a magasság (az y koordináták különbsége) 4, így T = 6 · 4 = 24.'
  },
  {
    id: 'sq3-17',
    level: 3,
    question: 'Egy deltoid területe 120 cm², átlóinak aránya pedig e : f = 3 : 5. Mekkorák az átlói?',
    options: [
      '12 cm és 20 cm',
      '6 cm és 10 cm',
      '9 cm és 15 cm',
      '15 cm és 25 cm'
    ],
    correctAnswer: 0,
    explanation: 'T = (e · f) / 2 ⇒ 120 = (3x · 5x) / 2 ⇒ 120 = 7,5 x² ⇒ x² = 16 ⇒ x = 4. Így e = 3 · 4 = 12 cm, f = 5 · 4 = 20 cm.'
  },
  {
    id: 'sq3-18',
    level: 3,
    question: 'Egy húrnégyszög szemközti oldalai a = 3 és c = 6, a másik két szemközti oldala b = 4 és d = 5. Mekkora az e és f átlók szorzata a Ptolemaiosz-tétel alapján?',
    options: [
      '38',
      '42',
      '30',
      '48'
    ],
    correctAnswer: 0,
    explanation: 'Ptolemaiosz tétele: e · f = a · c + b · d = 3 · 6 + 4 · 5 = 18 + 20 = 38.'
  },
  {
    id: 'sq3-19',
    level: 3,
    question: 'Adott három vektor: u = (2; −1), v = (−3; 4), w = (1; 2). Mekkora a z = 2u − 3v + w eredő vektor abszolút értéke?',
    options: [
      '2√85 (kb. 18,44)',
      '18',
      '√250 = 5√10',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'z = 2(2; −1) − 3(−3; 4) + (1; 2) = (4; −2) − (−9; 12) + (1; 2) = (4 + 9 + 1; −2 − 12 + 2) = (14; −12). |z| = √(14² + (−12)²) = √(196 + 144) = √340 = 2√85.'
  },
  {
    id: 'sq3-20',
    level: 3,
    question: 'Egy négyzet egyik oldalát 20%-kal növeljük, a másik szomszédos oldalát 20%-kal csökkentjük (téglalapot képezve). Hogyan változik a területe az eredetihez képest?',
    options: [
      '4%-kal csökken',
      'Nem változik (0%)',
      '4%-kal nő',
      '2%-kal csökken'
    ],
    correctAnswer: 0,
    explanation: 'T_új = (1,2 a) · (0,8 a) = 0,96 a² = 96% of T_eredeti, tehát pontosan 4%-kal csökken.'
  },
  {
    id: 'sq3-21',
    level: 3,
    question: 'Melyik állítás IGAZ az Escher-típusú síklefedések (tesszellációk) geometriai hátterére?',
    options: [
      'Bármely konvex vagy akár konkáv négyszöggel hézagmentesen lefedhető a sík laplapolással',
      'Csak a szabályos sokszögekkel fedhető le a sík',
      'Kizárólag paralelogrammákkal és téglalapokkal képezhető parkettázás',
      'Konkáv négyszögekkel elvileg lehetetlen a sík hézagmentes kitöltése'
    ],
    correctAnswer: 0,
    explanation: 'Mivel bármely négyszög belső szögeinek összege pontosan 360°, a csúcsok 180°-os elforgatásával és laplapolásával minden négyszög (még a konkáv deltoid/bumeráng is) hézagmentesen parkettázza a síkot.'
  },
  {
    id: 'sq3-22',
    level: 3,
    question: 'Egy rombusz rövidebb átlója egyenlő az oldalával (e = a = 6 cm). Mekkora a rombusz területe és belső szögei?',
    options: [
      'Szögei 60° és 120°; Területe 18√3 cm² (kb. 31,18 cm²)',
      'Szögei 45° és 135°; Területe 36 cm²',
      'Szögei 60° és 120°; Területe 36√3 cm²',
      'Szögei 30° és 150°; Területe 18 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A rombuszt a rövidebb átló két egybevágó szabályos háromszögre bontja, szögei 60° és 120°. Területe két szabályos háromszög területe: 2 · [a²√3 / 4] = (6²√3) / 2 = 18√3 cm².'
  },
  {
    id: 'sq3-23',
    level: 3,
    question: 'Egy húrtrapéz köré írható körének középpontja a trapéz hosszabb alapjára esik. Szárainak hossza 5 cm, magassága 4 cm. Mekkora a kör sugara (R)?',
    options: [
      '25 / 6 cm (kb. 4,17 cm)',
      '5 cm',
      '4,5 cm',
      '25 / 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hosszabb alap a kör átmérője: 2R. A szár vetülete a magasságból: x = √(5² − 4²) = 3 cm. A befogótétel szerint a derékszögű háromszögben b² = x · 2R ⇒ 5² = 3 · 2R ⇒ 25 = 6R ⇒ R = 25 / 6 cm.'
  },
  {
    id: 'sq3-24',
    level: 3,
    question: 'Két egymást követő középpontos tükrözés (először O₁ pontra, majd O₂ pontra) milyen egyenértékű transzformációt eredményez?',
    options: [
      'Párhuzamos eltolást 2 · O₁O₂ vektorral',
      'Egy harmadik pontra vonatkozó középpontos tükrözést',
      'Forgatást az O₁O₂ felezőpontja körül 90°-kal',
      'Identitást (visszaáll az eredeti helyzet)'
    ],
    correctAnswer: 0,
    explanation: 'Két középpontos tükrözés kompozíciója mindig párhuzamos eltolás, melynek vektora a középpontokat összekötő O₁O₂ vektor pontosan kétszerese: v = 2 · O₁O₂.'
  },
  {
    id: 'sq3-25',
    level: 3,
    question: 'Egy szabályos sokszög összes átlójának száma pontosan ötszöröse az oldalainak számának. Hány oldalú a sokszög?',
    options: [
      '13 oldalú',
      '10 oldalú',
      '15 oldalú',
      '12 oldalú'
    ],
    correctAnswer: 0,
    explanation: 'd_n = 5n ⇒ [n(n − 3)] / 2 = 5n. Mivel n ≠ 0, leoszthatunk n-nel: (n − 3) / 2 = 5 ⇒ n − 3 = 10 ⇒ n = 13.'
  },
  {
    id: 'sq3-26',
    level: 3,
    question: 'Egy szimmetrikus trapéz (húrtrapéz) átlói merőlegesek egymásra, magassága m = 10 cm. Mekkora a trapéz területe?',
    options: [
      '100 cm²',
      '50 cm²',
      '200 cm²',
      '100√2 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Ha egy szimmetrikus trapéz átlói merőlegesek egymásra, akkor a magassága egyenlő a középvonalával: m = k = (a + c) / 2. Így területe T = k · m = m² = 10² = 100 cm².'
  },
  {
    id: 'sq3-27',
    level: 3,
    question: 'Egy háromszög oldalai a = 13 cm, b = 14 cm, c = 15 cm. Mekkora a leghosszabb magassága (a legrövidebb oldalhoz tartozó magasság)?',
    options: [
      '168 / 13 cm (kb. 12,92 cm)',
      '12 cm',
      '11,2 cm',
      '14 cm'
    ],
    correctAnswer: 0,
    explanation: 's = (13+14+15)/2 = 21. Hérón-képlettel T = √[21 · 8 · 7 · 6] = √7056 = 84 cm². A leghosszabb magasság a legrövidebb oldalhoz (a = 13) tartozik: m_a = 2T / a = (2 · 84) / 13 = 168 / 13 cm.'
  },
  {
    id: 'sq3-28',
    level: 3,
    question: 'Egy rombusz átlóinak összege e + f = 28 cm, területe pedig T = 96 cm². Mekkora a rombusz oldala (a)?',
    options: [
      '10 cm',
      '12 cm',
      '8 cm',
      '14 cm'
    ],
    correctAnswer: 0,
    explanation: 'T = (e · f) / 2 = 96 ⇒ e · f = 192. Mivel (e + f)² = e² + f² + 2ef, ezért 28² = e² + f² + 2 · 192 ⇒ 784 = e² + f² + 384 ⇒ e² + f² = 400. Mivel 4a² = e² + f², így 4a² = 400 ⇒ a² = 100 ⇒ a = 10 cm.'
  },
  {
    id: 'sq3-29',
    level: 3,
    question: 'Ha egy egybevágósági síktranszformáció megőrzi az alakzatok körüljárási irányát (iránytartó) és pontosan EGYETLEN fixpontja van a síkban, akkor mi ez a transzformáció?',
    options: [
      'Egy 0°-tól és 360°-tól különböző szögű forgatás a fixpont körül',
      'Tengelyes tükrözés',
      'Csúsztatva tükrözés',
      'Párhuzamos eltolás'
    ],
    correctAnswer: 0,
    explanation: 'Az eltolásnak 0 fixpontja van, a tengelyes tükrözésnek végtelen sok (egy egyenes) és irányváltó, a csúsztatva tükrözésnek 0 és irányváltó. Egyedül az α ≠ k · 360° forgatás rendelkezik pontosan 1 fixponttal (a forgáscentrummal) és iránytartó.'
  },
  {
    id: 'sq3-30',
    level: 3,
    question: 'Egy körbe írt húrnégyszög átlói az M pontban metszik egymást. A húrtétel értelmében mi mondható el az átlók szakaszairól (AM, MC illetve BM, MD)?',
    options: [
      'AM · MC = BM · MD',
      'AM + MC = BM + MD',
      'AM · BM = CM · DM',
      'AM² + MC² = BM² + MD²'
    ],
    correctAnswer: 0,
    explanation: 'A körben két metsző húr szeleteinek szorzata a húrtétel (és a hasonló háromszögek) miatt mindig állandó és egyenlő: AM · MC = BM · MD.'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapismeretek és Definíciók (Könnyű)',
    subtitle: 'Transzformációk alaptulajdonságai, fixpontok, sokszögek szögei és alapképletek.',
    range: '1 - 30. feladat',
    focus: 'Alapfogalmak & Fogalmak',
    badgeText: '30 Kérdés',
    questions: questions.slice(0, 30)
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és Koordinátageometria (Közepes)',
    subtitle: 'Tükrözések és eltolások koordinátákkal, négyszögek területe, Pitot-tétel és átlók.',
    range: '31 - 60. feladat',
    focus: 'Gyakorlat & Koordináták',
    badgeText: '30 Kérdés',
    questions: questions.slice(30, 60)
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt Szint és Bizonyítások (Haladó)',
    subtitle: 'Összetett geometriai bizonyítások, Varignon-tétel, transzformációk kompozíciói és versenyfeladatok.',
    range: '61 - 90. feladat',
    focus: 'Mesterfok & Logika',
    badgeText: '30 Kérdés',
    questions: questions.slice(60, 90)
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Transzformációk Rendszere',
    badge: 'Invariánsok',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Tengelyes tükrözés: irányváltó. Középpontos tükrözés, eltolás, forgatás: iránytartó.',
    formula: 'Csúsztatva tükrözés: tengelyes tükrözés + párhuzamos eltolás (irányváltó)',
    note: 'Két párhuzamos tengelyre tükrözés eredője 2d nagyságú merőleges eltolás.',
    icon: <Compass className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Sokszögek és Átlók',
    badge: 'Képletek',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Belső szögek összege: (n − 2) · 180°. Egy csúcsból: n − 3 átló. Összesen: n(n − 3)/2.',
    formula: 'Szabályos n-szög egy belső szöge: ((n − 2) · 180°) / n',
    note: 'Bármely konvex sokszög külső szögeinek összege mindig 360°.',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Négyszögek és Területek',
    badge: 'Mestertár',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Trapéz: k · m. Rombusz és Deltoid: (e · f)/2. Pitot-tétel: a + c = b + d.',
    formula: 'Varignon-tétel: T_belső = T_eredeti / 2 (oldalfelezők paralelogrammája)',
    note: 'Húrnégyszög: szemközti szögek összege 180° (α + γ = 180°).',
    icon: <Award className="w-5 h-5 text-emerald-600" />
  }
];

export const SummaryQuiz: React.FC<SummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  topicId = 'g9-egybevagosag-negyszogek',
  topicTitle = 'VI. Egybevágóság, négyszögek: Gyakorlás és Tudáspróba'
}) => {
  return (
    <QuizTemplate
      title="Témazáró Tudáspróba & Geometria Kvíz"
      subtitle="90 átfogó vizsgafeladat 3 nehézségi szinten (szintenként 30 kérdés) részletes magyarázatokkal a teljes VI. témakörből"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG, NÉGYSZÖGEK"
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      questions={questions}
      levels={quizLevels}
      cheatSheet={cheatSheet}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Geometria Segédlet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <SummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
