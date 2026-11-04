import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, DifficultyLevel, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AppliedMatcher } from './AppliedMatcher';
import { AppliedSorter } from './AppliedSorter';
import { Layers, Boxes, Sparkles } from 'lucide-react';
import {
  FriezePatternsSvg,
  TessellationSvg,
  EscherTessellationSvg
} from './AppliedFigures';

interface AppliedQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const cheatSheet: CheatSheetItem[] = [
  {
    title: 'A 7 Frizcsoport',
    content: 'Egy irányban periodikus minták. Bármilyen motívumból csak 7 különböző szimmetriacsoport készíthető síkbeli egybevágóságokkal (eltolás, hosszanti/keresztirányú tükrözés, 180° forgatás, csúsztatva tükrözés).'
  },
  {
    title: 'Szabályos Parkettázás Szabálya',
    content: 'Egy csúcsban találkozó szabályos sokszögek belső szögeinek összege pontosan 360° kell legyen: k · α = 360°. Csak 3 szabályos parketta létezik: háromszög (6 × 60°), négyzet (4 × 90°) és szabályos hatszög (3 × 120°).'
  },
  {
    title: 'Tetszőleges Háromszög és Négyszög',
    content: 'Bármilyen háromszög és bármilyen konvex vagy konkáv négyszög hézagmentesen parkettázza a síkot! Az oldalfelező pontok körüli 180°-os forgatásokkal kitöltik a 360°-os teljes szöget.'
  },
  {
    title: 'Escher-módszer & Csúsztatva Tükrözés',
    content: 'Parkettázó alapidom (pl. négyzet) egyik oldalából kivágott formát a szemközti oldalra párhuzamosan eltolva vagy elforgatva a terület állandó marad, a csempék pedig tökéletesen illeszkednek.'
  }
];

const questions: Question[] = [
  // --- 1. SZINT: Alapfogalmak és Frizek (10 kérdés) ---
  {
    id: 'aq1-1',
    level: 1,
    question: 'Mi a szalagornamens (friz) legfontosabb geometriai sajátossága?',
    figure: <FriezePatternsSvg size={200} />,
    options: [
      'Egyetlen egyenes mentén periodikusan, eltolással ismétlődő síkbeli minta',
      'Minden irányban végtelen kiterjedésű, két dimenzióban eltolható mozaik',
      'Kizárólag körkörös, forgásszimmetriával rendelkező mandala',
      'Olyan síkidom, amely csak tengelyes tükrözéssel állítható elő'
    ],
    correctAnswer: 0,
    explanation: 'A szalagornamens (friz) egy egydimenziós periodicitású sávdísz, amely egy adott egyenes menti eltolásra nézve invariáns.'
  },
  {
    id: 'aq1-2',
    level: 1,
    question: 'Hány matematikailag különböző szimmetriacsoport létezik a szalagornamensek (frizek) világában?',
    options: [
      'Pontosan 7',
      'Pontosan 4',
      'Végtelen sokféle',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'A matematika egyik klasszikus tétele szerint a síkbeli szalagornamenseknek pontosan 7 különböző szimmetriacsoportja van.'
  },
  {
    id: 'aq1-3',
    level: 1,
    question: 'Melyik transzformáció található meg kivétel nélkül MINDEN frizben?',
    options: [
      'A tengelyirányú eltolás (v vektorral)',
      'A hosszanti szimmetriatengelyre való tükrözés',
      'A 90°-os síkbeli forgatás',
      'A középpontos tükrözés'
    ],
    correctAnswer: 0,
    explanation: 'A szalagornamens definíciójából adódik, hogy az alapmotívum egy egyenes mentén periodikusan, párhuzamos eltolással ismétlődik.'
  },
  {
    id: 'aq1-4',
    level: 1,
    question: 'Mit jelent a síklefedés (parkettázás / tesszelláció)?',
    options: [
      'A sík hézagmentes és átfedésmentes kitöltését alakzatokkal',
      'Csak szabályos sokszögek kör alakú elrendezését a térben',
      'Olyan lefedést, amelyben az alakzatok kötelezően fedik egymás széleit',
      'Alakzatok felnagyítását a sík teljes felületére'
    ],
    correctAnswer: 0,
    explanation: 'A síklefedés vagy parkettázás azt jelenti, hogy a sík minden pontját pontosan egy csempe fedi le (leszámítva az érintkező határoló éleket és csúcsokat).'
  },
  {
    id: 'aq1-5',
    level: 1,
    question: 'Mennyi a szabályos háromszög egy belső szöge, és hány darab találkozik egy csúcsban szabályos parkettázáskor?',
    figure: <TessellationSvg size={200} />,
    options: [
      '60°-os belső szög, és 6 darab találkozik (6 × 60° = 360°)',
      '90°-os belső szög, és 4 darab találkozik',
      '60°-os belső szög, és 4 darab találkozik (4 × 60° = 240°)',
      '120°-os belső szög, és 3 darab találkozik'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög belső szöge 60°. Mivel 6 × 60° = 360°, pontosan 6 háromszög találkozik hézagmentesen minden csúcsban.'
  },
  {
    id: 'aq1-6',
    level: 1,
    question: 'Hány szabályos sokszög létezik, amellyel önmagában SZABÁLYOS parkettázás hozható létre?',
    options: [
      'Pontosan 3 (szabályos háromszög, négyzet, szabályos hatszög)',
      'Pontosan 5 (a Platóni testeknek megfelelően)',
      'Minden szabályos sokszöggel (végtelen sok)',
      'Csak a négyzet (1)'
    ],
    correctAnswer: 0,
    explanation: 'Csak a szabályos 3-szög (60°), négyzet (90°) és szabályos 6-szög (120°) belső szöge egész osztója a 360°-nak.'
  },
  {
    id: 'aq1-7',
    level: 1,
    question: 'Mi a csúsztatva tükrözés művelete?',
    options: [
      'Egy egyenes menti eltolás és az egyenesre való tengelyes tükrözés egymásutánja',
      'Egy pont körüli forgatás és egy tetszőleges merőleges nyújtás',
      'Két egymást metsző tengelyre történő tükrözés',
      'Két párhuzamos eltolás összege egy lépésben'
    ],
    correctAnswer: 0,
    explanation: 'A csúsztatva tükrözés egy t egyenesre való tengelyes tükrözésből és egy azzal párhuzamos v vektorú eltolásból áll (mint a lépések sora a hóban).'
  },
  {
    id: 'aq1-8',
    level: 1,
    question: 'Ki volt a leghíresebb művész, aki az egybevágósági transzformációkat és parkettázást emelte a művészet szintjére?',
    figure: <EscherTessellationSvg size={200} />,
    options: [
      'M. C. Escher',
      'Leonardo da Vinci',
      'Pablo Picasso',
      'Claude Monet'
    ],
    correctAnswer: 0,
    explanation: 'M. C. Escher holland grafikusművész világhírűvé vált az egybevágósági transzformációkon alapuló, madarakat, halakat és gyíkokat ábrázoló síklefedéseiről.'
  },
  {
    id: 'aq1-9',
    level: 1,
    question: 'Egy ember sétál a tengerparti nedves homokban. Milyen szimmetriát mutat a két láb által hagyott lábnyomok sora?',
    options: [
      'Csúsztatva tükrözést a haladási irány felezővonalára nézve',
      'Tiszta egyenes vonalú eltolást mindkét láb esetében egyszerre',
      '90°-os forgásszimmetriát',
      'Csak és kizárólag középpontos tükrözést'
    ],
    correctAnswer: 0,
    explanation: 'A bal és jobb lábnyom egymás tükörképe, amelyek fél lépésközzel (fél periódussal) el vannak tolva a haladási egyenes mentén.'
  },
  {
    id: 'aq1-10',
    level: 1,
    question: 'Hány négyzet találkozik egy csúcsban a négyzetrácsos síklefedésnél?',
    options: [
      '4 (mert 4 × 90° = 360°)',
      '3 (mert 3 × 90° = 270°)',
      '6 (mert 6 × 60° = 360°)',
      '5 (mert 5 × 72° = 360°)'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet minden belső szöge 90°. Egy csúcs körül 360° van, így pontosan 360° / 90° = 4 négyzet találkozik hézagmentesen.'
  },

  // --- 2. SZINT: Szögek és Parkettázás (10 kérdés) ---
  {
    id: 'aq2-1',
    level: 2,
    question: 'Mennyi a szabályos hatszög egy belső szöge, és hány szabályos hatszög illeszkedik egyetlen csúcs köré?',
    figure: <TessellationSvg size={200} />,
    options: [
      '120°, és pontosan 3 hatszög illeszkedik (3 × 120° = 360°)',
      '108°, és 3 hatszög illeszkedik',
      '135°, és 2 hatszög illeszkedik',
      '120°, és 4 hatszög illeszkedik (4 × 120° = 480°)'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos hatszög belső szöge ((6 − 2) · 180°) / 6 = 120°. Mivel 3 × 120° = 360°, pontosan 3 hatszög illeszkedik tökéletesen (méhsejt-szerkezet).'
  },
  {
    id: 'aq2-2',
    level: 2,
    question: 'Miért NEM alkalmas a szabályos ötszög önmagában a sík hézagmentes lefedésére?',
    options: [
      'Mert a belső szöge 108°, és 360 / 108 = 3,33... nem egész szám (3 db esetén 36° rés marad)',
      'Mert az ötszögnek páratlan számú csúcsa van, és a sík csak páros csúcsokkal fedhető',
      'Mert az ötszög belső szögeinek összege nem 540°',
      'Mert az ötszög oldalait nem lehet körzővel kimérni'
    ],
    correctAnswer: 0,
    explanation: '3 db szabályos ötszög szöge: 3 × 108° = 324° (36° hézag marad), 4 db pedig 432° > 360° (egymásra torlódnának). Így nem lehet zárt csúcsot alkotni.'
  },
  {
    id: 'aq2-3',
    level: 2,
    question: 'Lefedhető-e a sík hézagmentesen és átfedésmentesen egy TETSZŐLEGES (nem szabályos) háromszöggel?',
    options: [
      'Igen, bármilyen háromszöggel lefedhető a sík oldalfelező körüli 180°-os forgatásokkal',
      'Nem, kizárólag szabályos és egyenlő szárú derékszögű háromszöggel fedhető le',
      'Csak akkor, ha minden szöge kisebb 60°-nál',
      'Nem, mert a tompaszögű háromszögek átlója nem periodikus'
    ],
    correctAnswer: 0,
    explanation: 'Bármely háromszögből az oldalfelező pontok körüli 180°-os forgatással paralelogramma képezhető, amelyből a teljes sík hézagmentesen parkettázható!'
  },
  {
    id: 'aq2-4',
    level: 2,
    question: 'Lefedhető-e a sík tetszőleges általános (nem konvex vagy konvex) NÉGYSZÖGGEL?',
    options: [
      'Igen, bármely négyszöggel parkettázható a sík, mivel belső szögeinek összege mindig 360°',
      'Nem, kizárólag a téglalap, négyzet és rombusz alkalmas rá',
      'Csak akkor, ha a szemközti oldalak párhuzamosak (paralelogramma)',
      'Nem, konkáv négyszöggel sosem lehet parkettázni'
    ],
    correctAnswer: 0,
    explanation: 'Minden négyszög belső szögeinek összege 360°. Ha az oldalfelező pontok körül 180°-kal elforgatjuk a négyszöget, a négy különböző szög egy csúcsban találkozva pontosan 360°-ot ad ki!'
  },
  {
    id: 'aq2-5',
    level: 2,
    question: 'Egy szabályos nyolcszög belső szöge 135°. Két szabályos nyolcszög találkozik egy csúcsban (2 × 135° = 270°). Milyen szabályos sokszöggel tölthető ki a maradék 90°-os rés?',
    options: [
      'Egy négyzettel (90°)',
      'Egy szabályos háromszöggel (60°)',
      'Egy szabályos hatszöggel (120°)',
      'Két szabályos háromszöggel'
    ],
    correctAnswer: 0,
    explanation: 'A teljes szög 360°. 360° − 270° = 90°, ami pontosan a négyzet belső szöge. Ez a híres félszabályos nyolcszög-négyzet parkettázás (4.8.8)!'
  },
  {
    id: 'aq2-6',
    level: 2,
    question: 'Hány szimmetriatengelye van a szabályos hópehelynek, és hány fokos forgásszimmetriával rendelkezik?',
    options: [
      '6 szimmetriatengely és 60°-os forgásszimmetria',
      '4 szimmetriatengely és 90°-os forgásszimmetria',
      '8 szimmetriatengely és 45°-os forgásszimmetria',
      '3 szimmetriatengely és 120°-os forgásszimmetria'
    ],
    correctAnswer: 0,
    explanation: 'A jég kristályszerkezete miatt a hópelyhek hexagonális rendszert alkotnak: 6 szimmetriatengelyük és 360° / 6 = 60°-os forgásszimmetriájuk van.'
  },
  {
    id: 'aq2-7',
    level: 2,
    question: 'Melyik transzformáció-pár kompozíciójaként áll elő a csúsztatva tükrözés?',
    options: [
      'Egy tengelyes tükrözés és egy a tengellyel párhuzamos vektorú eltolás',
      'Egy tengelyes tükrözés és egy a tengelyre merőleges eltolás',
      'Egy pont körüli 180°-os forgatás és egy tetszőleges nagyítás',
      'Két különböző egyenesre vonatkozó tükrözés'
    ],
    correctAnswer: 0,
    explanation: 'A csúsztatva tükrözésnél a tükrözés tengelye és az eltolás iránya párhuzamos kell legyen (ha merőleges lenne, az egyszerű tengelyes tükrözés lenne egy másik tengelyre).'
  },
  {
    id: 'aq2-8',
    level: 2,
    question: 'Mit nevezünk félig szabályos (archimédeszi) parkettázásnak?',
    options: [
      'Többféle szabályos sokszögből álló parkettát, ahol minden csúcs környezete egybevágó',
      'Olyan parkettát, ahol a sokszögek csak a felület felét fedik le',
      'Olyan síklefedést, ahol csak szabálytalan háromszögek szerepelnek',
      'A négyzet és a téglalap véletlenszerű váltakozását'
    ],
    correctAnswer: 0,
    explanation: 'A félig szabályos parkettázásban többféle szabályos sokszög szerepel úgy, hogy minden csúcsban ugyanazok a sokszögek találkoznak ugyanolyan sorrendben (pl. nyolcszög-nyolcszög-négyzet).'
  },
  {
    id: 'aq2-9',
    level: 2,
    question: 'Összerakható-e hézagmentes csúcspont egy szabályos hatszögből (120°) és két szabályos négyzetből (90°)?',
    options: [
      'Nem, mert 120° + 90° + 90° = 300° ≠ 360° (60° rés marad, oda egy szabályos háromszög kellene)',
      'Igen, mert a 120° és 90° összegéből pontosan 360° jön ki',
      'Igen, ha a négyzeteket elforgatjuk 45°-kal',
      'Nem, mert a hatszög nem érintkezhet négyzettel'
    ],
    correctAnswer: 0,
    explanation: '120° + 90° + 90° = 300°. A 360°-hoz még pontosan 60° hiányzik, amit egy szabályos háromszög töltene ki tökéletesen (3.4.6.4 mintázat).'
  },
  {
    id: 'aq2-10',
    level: 2,
    question: 'Hogyan változik meg egy Escher-csempe területe, amikor a négyzet bal oldalából kivágott formát párhuzamosan eltoljuk a jobb oldalára?',
    figure: <EscherTessellationSvg size={200} />,
    options: [
      'A területe pontosan megegyezik az eredeti négyzet területével',
      'A területe a görbület mértékétől függően megnő',
      'A területe a felére csökken',
      'A területe nulla lesz, mert a kerület végtelenné válik'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az alakzatból pontosan annyi területet vágunk le az egyik oldalon, mint amennyit hozzáadunk a másikon, a teljes terület szigorúan állandó marad.'
  },

  // --- 3. SZINT: Összetett Alkalmazások és Bizonyítások (10 kérdés) ---
  {
    id: 'aq3-1',
    level: 3,
    question: 'Egy csúcsban m darab szabályos háromszög (60°) és n darab szabályos hatszög (120°) találkozik. Milyen (m; n) pozitív egész pár ad ki 360°-ot?',
    options: [
      'm = 2 és n = 2 (2 × 60° + 2 × 120° = 120° + 240° = 360°)',
      'm = 3 és n = 1 (3 × 60° + 120° = 300°)',
      'm = 1 és n = 2 (60° + 240° = 300°)',
      'm = 4 és n = 1 (240° + 120° = 360°, de csúcs-szimmetria miatt nem periodikus)'
    ],
    correctAnswer: 0,
    explanation: 'm · 60° + n · 120° = 360°, egyszerűsítve: m + 2n = 6. Ha n = 2, akkor m = 2 (két hatszög és két háromszög találkozik felváltva: 3.6.3.6 kagome-rács)!'
  },
  {
    id: 'aq3-2',
    level: 3,
    question: 'A frizeknél a "p11g" típus a csúsztatva tükrözést jelöli. Mi történik, ha egy pontra egymás után KÉTSZER alkalmazzuk ugyanazt a csúsztatva tükrözést?',
    figure: <FriezePatternsSvg size={200} />,
    options: [
      'Tiszta eltolást kapunk 2v vektorral (mert a kétszeri tükrözés identitás)',
      'Egy pont körüli 180°-os elforgatást kapunk',
      'Visszajutunk a kiinduló helyzetbe (helyben marad a pont)',
      'Tengelyes tükrözést kapunk egy merőleges tengelyre'
    ],
    correctAnswer: 0,
    explanation: 'A csúsztatva tükrözés: g = t_v ∘ S_t. Kétszer alkalmazva: g² = (t_v ∘ S_t) ∘ (t_v ∘ S_t) = t_{2v} ∘ (S_t ∘ S_t) = t_{2v} ∘ Id = t_{2v}. Két lépés tiszta eltolást eredményez!'
  },
  {
    id: 'aq3-3',
    level: 3,
    question: 'Hány darab síkbeli kristálytani csoport (úgynevezett 2D tapétacsoport / wallpaper group) létezik a matematikában?',
    options: [
      'Pontosan 17',
      'Pontosan 7',
      'Pontosan 12',
      'Pontosan 24'
    ],
    correctAnswer: 0,
    explanation: 'Míg az 1 dimenzióban periodikus frizeknek 7 csoportja van, a 2 dimenzióban periodikus síklefedéseknek (tapétacsoportoknak) pontosan 17 típusa létezik (Fjodorov tétele, 1891).'
  },
  {
    id: 'aq3-4',
    level: 3,
    question: 'Mi a feltétele annak, hogy egy szabályos sokszöggel egy csúcs körül hézagmentesen parkettázhassunk önmagában?',
    figure: <TessellationSvg size={200} />,
    options: [
      'A belső szögének ((n − 2) · 180° / n) maradék nélkül osztania kell a 360°-ot',
      'Az oldalszámának oszthatónak kell lennie 3-mal vagy 4-gyel',
      'Az oldalszáma legfeljebb 5 lehet',
      'A kerületének nagyobbnak kell lennie a területénél'
    ],
    correctAnswer: 0,
    explanation: 'k · α = 360°, azaz k · ((n − 2) · 180° / n) = 360°, ebből k(n − 2) = 2n, átrendezve: (k − 2)(n − 2) = 4. Ennek pozitív egész megoldásai csak (n, k) = (3, 6), (4, 4) és (6, 3)!'
  },
  {
    id: 'aq3-5',
    level: 3,
    question: 'Egy konkáv négyszögnek van egy 210°-os belső szöge. Igaz-e, hogy ezzel a négyszöggel is hézagmentesen lefedhető a sík?',
    options: [
      'Igaz, minden síkbeli négyszög (akár konvex, akár konkáv) parkettázza a síkot',
      'Hamis, konkáv négyszöggel sosem lehet lefedni a síkot, mert a benyúló rész akadályt képez',
      'Csak akkor igaz, ha deltoid alakú',
      'Csak akkor, ha a többi három szög egyenlő 50°-kal'
    ],
    correctAnswer: 0,
    explanation: 'A négyszögek parkettázási tétele kimondja, hogy BÁRMELY négyszög parkettázza a síkot: az oldalfelezők körüli 180°-os forgatással a 210°-os szög köré a maradék 150°-ot adó három szög pontosan illeszkedik!'
  },
  {
    id: 'aq3-6',
    level: 3,
    question: 'Egy frizben találsz egy olyan pontot, amely körül a mintát 180°-kal elforgatva a friz önmagába megy át. Mi a neve ennek a szimmetriának a frizcsoportokban?',
    options: [
      'Félfordulatos szimmetria (középpontos tükrözés)',
      'Csúsztatva tükrözés',
      'Hosszanti invariancia',
      'Skálázási szimmetria'
    ],
    correctAnswer: 0,
    explanation: 'A 180°-os elforgatás megegyezik a síkbeli középpontos tükrözéssel (félfordulat), amely az egyik leggyakoribb friz-szimmetria (pl. a p112 típusban).'
  },
  {
    id: 'aq3-7',
    level: 3,
    question: 'Hogyan használta Escher a 90°-os forgatást a négyzetrácsos parkettáiban?',
    figure: <EscherTessellationSvg size={200} />,
    options: [
      'A négyzet egyik oldalát elforgatta 90°-kal a szomszédos oldalra a közös sarokcsúcs körül',
      'Minden csempét eltolt az átló mentén, forgatás nélkül',
      'Csak a színeket változtatta meg 90 fokonként',
      'A négyzet területét 90%-kal csökkentette'
    ],
    correctAnswer: 0,
    explanation: 'A forgatásos Escher-módszernél az egyik él módosítását 90°-kal (vagy szabályos háromszögnél 60°/120°-kal) elforgatjuk egy közös csúcs körül a szomszédos élre.'
  },
  {
    id: 'aq3-8',
    level: 3,
    question: 'Melyik híres építészeti emlék tartalmazza a világ talán leggazdagabb középkori szimmetria- és parkettagyűjteményét, ahol szinte az összes 17 tapétacsoport megtalálható?',
    options: [
      'Az Alhambrában (Granada, Spanyolország) található mór palota',
      'A római Colosseum',
      'A párizsi Eiffel-torony',
      'Az athéni Parthenón'
    ],
    correctAnswer: 0,
    explanation: 'Az Alhambra granadai palotaegyüttes mór mozaikjai a világ legismertebb díszítőművészeti emlékei; maga Escher is ide utazott tanulmányozni a szimmetriacsoportokat.'
  },
  {
    id: 'aq3-9',
    level: 3,
    question: 'Egy kristályban az atomok egybevágósági transzformációk révén rácsot alkotnak. Miért nem létezhet 5-szörös forgásszimmetriájú hagyományos periodikus 3D kristályrács?',
    options: [
      'Mert a szabályos ötszög nem képes hézagmentesen parkettázni a rácssíkokat',
      'Mert az atomok csak négyesével vagy hatosával tudnak kapcsolódni',
      'Mert az ötös szám prím, és a rácsoknak összetett számnak kell lenniük',
      'Mert a kvantummechanika tiltja az ötszögeket'
    ],
    correctAnswer: 0,
    explanation: 'A kristálytani megszorítás tétele (crystallographic restriction theorem) szerint periodikus rácsban csak 1-, 2-, 3-, 4- és 6-szoros forgásszimmetria lehetséges; az 5-szörös szimmetria csak kvázikristályokban fordul elő.'
  },
  {
    id: 'aq3-10',
    level: 3,
    question: 'Két párhuzamos tengelyre (t₁ és t₂) történő egymás utáni tengelyes tükrözés milyen transzformációval EGYENÉRTÉKŰ?',
    options: [
      'Tiszta párhuzamos eltolással a tengelyekre merőleges irányban, a távolságuk kétszeresével (2d)',
      '180°-os elforgatással a két tengely felezőpontja körül',
      'Csúsztatva tükrözéssel a két tengely közötti távolság felével',
      'A két tengely szögfelezőjére történő egyetlen tükrözéssel'
    ],
    correctAnswer: 0,
    explanation: 'Két d távolságú párhuzamos tengelyre való tükrözés kompozíciója mindig a tengelyekre merőleges, 2d nagyságú eltolást eredményez (ezért generál a két függőleges tengelyes tükrözés friz-eltolást)!'
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapok (Könnyű)',
    subtitle: 'Alapfogalmak, szalagornamensek és egyszerűbb feladatok.',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak & Frizek',
    questions: questions.filter(q => q.level === 1)
  },
  2: {
    level: 2,
    title: '2. Szint: Közepes',
    subtitle: 'Összefüggések, a 7 frizcsoport és parkettázási feladványok.',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Alkalmazás',
    questions: questions.filter(q => q.level === 2)
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó',
    subtitle: 'Összetett feladatok, Escher-módszer és logikai kihívások.',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    questions: questions.filter(q => q.level === 3)
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A 7 Frizcsoport',
    badge: 'Szalagornamensek',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Bármilyen motívumból pontosan 7 különböző szimmetriacsoport készíthető a síkban.',
    formula: 'p1, p11g, p1m1, p11m, p2, p2mg, p2mm',
    note: 'Eltolás, 180° forgatás, hosszanti és merőleges tükrözés, csúsztatva tükrözés.',
    icon: <Layers className="w-5 h-5 text-cyan-600" />
  },
  {
    title: 'Szabályos Parkettázás',
    badge: 'k · α = 360°',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Egy csúcs körül a szabályos sokszögek belső szögeinek összege pontosan 360° kell legyen.',
    formula: '6 × 60° (3-szög) | 4 × 90° (4-szög) | 3 × 120° (6-szög)',
    note: 'Szabályos ötszög (108°): 3 × 108° = 324° (36° rés marad), nem fedi le a síkot!',
    icon: <Boxes className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Escher-féle Módszer',
    badge: 'Területtartó eltolás',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Parkettázó alapidomból kivágott darabot a szemközti élre eltolva a terület megmarad.',
    formula: 'T_módosított = T_eredeti = a²',
    note: 'Bármely háromszöggel és négyszöggel hézagmentesen parkettázható a sík.',
    icon: <Sparkles className="w-5 h-5 text-blue-600" />
  }
];

export const AppliedQuiz: React.FC<AppliedQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  topicId = 'g9-trans-gyakorlat',
  topicTitle = '5. Egybevágósági transzformációk a gyakorlatban'
}) => {
  return (
    <QuizTemplate
      title="5. Egybevágósági transzformációk a gyakorlatban"
      subtitle="30 válogatott feladat 3 szinten: szalagornamensek, a 7 frizcsoport, parkettázás és Escher-féle síklefedések"
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
        <AppliedMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AppliedSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

