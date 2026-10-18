import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { SummaryMatcher } from './SummaryMatcher';
import { SummarySorter } from './SummarySorter';

export interface SummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SUMMARY_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: GEOMETRIAI ALAPFOGALMAK ÉS SZÉTVÁLOGATÁSOK (1-30)
  // =========================================================================
  {
    id: 'sq1-1',
    level: 1,
    prompt: 'Hány kiterjedése (dimenziója) van a geometriai pontnak?',
    options: ['0 dimenziós (nincs hossza, szélessége, magassága)', '1 dimenziós', '2 dimenziós', '3 dimenziós'],
    correctAnswer: 0,
    explanation: 'A pont 0 dimenziós alapelem: helyet jelöl a térben, de nincs semmilyen mérhető kiterjedése.',
    hint: 'Gondolj a ceruzahegy érintésére: van vastagsága a geometriai pontnak?',
    breakdown: [{ label: 'Alapelem', value: 'Pont (P)' }, { label: 'Dimenzió', value: '0D' }]
  },
  {
    id: 'sq1-2',
    level: 1,
    prompt: 'Mi a szakasz pontos meghatározása?',
    options: ['Egyenes vonal két pont között, amelynek mérhető hossza van', 'Egy kezdőpontból kiinduló végtelen vonal', 'Mindkét irányban a végtelenbe tartó vonal', 'Egy zárt körvonal'],
    correctAnswer: 0,
    explanation: 'A szakasz az egyenesnek két pontja közé eső, véges hosszúságú része. Végpontjaival jelöljük: AB szakasz.',
    hint: 'A szakasznak van eleje és van vége, vonalzóval lemérhető.',
    breakdown: [{ label: 'Fogalom', value: 'Szakasz' }, { label: 'Határolói', value: 'Két végpont' }]
  },
  {
    id: 'sq1-3',
    level: 1,
    prompt: 'Milyen hosszú a geometriai egyenes?',
    options: ['Mindkét irányban a végtelenbe tart, nincs vége', 'Pontosan 100 méter hosszú', 'Egy kezdőpontból indul és a végtelenbe tart', 'Csak addig tart, amíg a füzetlapunk engedi'],
    correctAnswer: 0,
    explanation: 'Az egyenes mindkét irányban végtelen hosszúságú vonal, kisbetűvel jelöljük (pl. e egyenes).',
    hint: 'A vonalzót gondolatban a végtelenségig meghosszabbíthatnánk.',
    breakdown: [{ label: 'Egyenes (e)', value: 'Mindkét irányban végtelen (1D)' }]
  },
  {
    id: 'sq1-4',
    level: 1,
    prompt: 'Mi a félegyenes?',
    options: ['Egy kezdőpontból kiinduló, egyetlen irányban a végtelenbe tartó vonal', 'Egy szakasz fele', 'Két pont közötti görbe vonal', 'Két metsző egyenes által bezárt síkrész'],
    correctAnswer: 0,
    explanation: 'A félegyenest egy kezdőpont határolja az egyik oldalon, a másik irányban pedig a végtelenbe tart.',
    hint: 'Mint a napsugár: van forrása (a Nap), de a világűrbe a végtelenig tart.',
    breakdown: [{ label: 'Félegyenes', value: '1 kezdőpont + végtelen irány' }]
  },
  {
    id: 'sq1-5',
    level: 1,
    prompt: 'Hány dimenziós a síkidom (felület)?',
    options: ['2 dimenziós (hosszúsága és szélessége van)', '0 dimenziós', '1 dimenziós', '3 dimenziós'],
    correctAnswer: 0,
    explanation: 'A síkidom a sík egy zárt vonallal határolt része. Két kiterjedése van (hossz és szélesség), mérhető a területe (T).',
    hint: 'A papírlap felülete sík, két kiterjedéssel bír.',
    breakdown: [{ label: 'Síkidom', value: '2D (hosszúság és szélesség)' }]
  },
  {
    id: 'sq1-6',
    level: 1,
    prompt: 'Miből áll a szög a geometriában?',
    options: ['Egy közös kezdőpontból kiinduló két félegyenesből és az általuk közrefogott szögtartományból', 'Két párhuzamos egyenesből', 'Egy pontból és egy körből', 'Három metsző szakaszból'],
    correctAnswer: 0,
    explanation: 'A szög alkotóelemei: a szög csúcsa (közös pont), a szög szárai (két félegyenes) és a szögtartomány.',
    hint: 'Gondolj egy olló kinyitott száraira és a köztük lévő nyílásra.',
    breakdown: [{ label: 'Szög részei', value: 'Csúcs, 2 szár és szögtartomány' }]
  },
  {
    id: 'sq1-7',
    level: 1,
    prompt: 'Hogyan nevezzük a szög két szárának közös kezdőpontját?',
    options: ['A szög csúcsa', 'A szög középpontja', 'A szög fókuszpontja', 'A szög felezője'],
    correctAnswer: 0,
    explanation: 'A két félegyenes közös kiindulópontját a szög csúcsának nevezzük.',
    hint: 'Általában O-val vagy az alakzat csúcsának betűjével (A, B) jelöljük.',
    breakdown: [{ label: 'Közös pont', value: 'Szög csúcsa' }]
  },
  {
    id: 'sq1-8',
    level: 1,
    prompt: 'Mekkora a derékszög pontos értéke?',
    options: ['Pontosan 90°', '45°', '180°', '360°'],
    correctAnswer: 0,
    explanation: 'A derékszög nagysága pontosan 90°. Magyar jelölése negyedkörív belső ponttal.',
    hint: 'A füzet sarka vagy a falak találkozása pontosan derékszög.',
    breakdown: [{ label: 'Derékszög', value: '90° (⊥)' }]
  },
  {
    id: 'sq1-9',
    level: 1,
    prompt: 'Melyik szög hegyesszög az alábbiak közül?',
    options: ['50°-os szög', '90°-os szög', '130°-os szög', '180°-os szög'],
    correctAnswer: 0,
    explanation: 'A hegyesszög 0°-nál nagyobb, de 90°-nál kisebb szög (0° < α < 90°). Az 50° hegyesszög.',
    hint: 'Kisebbnek kell lennie a 90°-os derékszögnél.',
    breakdown: [{ label: 'Feltétel', value: '0° < α < 90°' }, { label: 'Helyes válasz', value: '50°' }]
  },
  {
    id: 'sq1-10',
    level: 1,
    prompt: 'Melyik szög tompaszög az alábbiak közül?',
    options: ['135°-os szög', '45°-os szög', '90°-os szög', '210°-os szög'],
    correctAnswer: 0,
    explanation: 'A tompaszög 90°-nál nagyobb, de 180°-nál kisebb szög (90° < α < 180°). A 135° tompaszög.',
    hint: 'Nagyobb a derékszögnél, de kisebb az egyenesszögnél.',
    breakdown: [{ label: 'Feltétel', value: '90° < α < 180°' }, { label: 'Helyes válasz', value: '135°' }]
  },
  {
    id: 'sq1-11',
    level: 1,
    prompt: 'Mekkora az egyenesszög nagysága?',
    options: ['Pontosan 180° (félkör)', '90°', '270°', '360°'],
    correctAnswer: 0,
    explanation: 'Az egyenesszög szárai egyenest alkotnak, nagysága pontosan 180°.',
    hint: '6:00-kor a mutatók pontosan egyenesszöget zárnak be.',
    breakdown: [{ label: 'Egyenesszög', value: '180°' }]
  },
  {
    id: 'sq1-12',
    level: 1,
    prompt: 'Mekkora a teljesszög nagysága?',
    options: ['Pontosan 360° (egy teljes fordulat)', '180°', '100°', '720°'],
    correctAnswer: 0,
    explanation: 'A teljesszög egy teljes körbefordulás, értéke pontosan 360°.',
    hint: 'A körlap teljes szögtartománya.',
    breakdown: [{ label: 'Teljesszög', value: '360°' }]
  },
  {
    id: 'sq1-13',
    level: 1,
    prompt: 'Mekkora a nullszög nagysága?',
    options: ['0° (a két szár egybeesik)', '1°', '90°', '360°'],
    correctAnswer: 0,
    explanation: 'A nullszög szárai pontosan fedik egymást, a szögtartomány nagysága 0°.',
    hint: 'Nincs semmilyen nyílás a szárak között.',
    breakdown: [{ label: 'Nullszög', value: '0°' }]
  },
  {
    id: 'sq1-14',
    level: 1,
    prompt: 'Mennyi bármely háromszög belső szögeinek összege?',
    options: ['Minden háromszögben pontosan 180°', '360°', '90°', 'Attól függ, mekkorák az oldalai'],
    correctAnswer: 0,
    explanation: 'Minden háromszög belső szögeinek összege pontosan 180° (α + β + γ = 180°).',
    hint: 'Tépd le a háromszög 3 sarkát és illeszd egymás mellé: egyenest alkotnak!',
    breakdown: [{ label: 'Összeg', value: 'α + β + γ = 180°' }]
  },
  {
    id: 'sq1-15',
    level: 1,
    prompt: 'Mennyi bármely négyszög belső szögeinek összege?',
    options: ['Minden négyszögben pontosan 360°', '180°', '270°', '400°'],
    correctAnswer: 0,
    explanation: 'Bármely négyszög egy átlójával 2 darab háromszögre vágható, ezért 2 · 180° = 360° a belső szögek összege.',
    hint: 'Gondolj a téglalap 4 derékszögére: 4 · 90° = ?',
    breakdown: [{ label: 'Négyszög szögei', value: '360°' }]
  },
  {
    id: 'sq1-16',
    level: 1,
    prompt: 'Hány oldala és hány csúcsa van egy háromszögnek?',
    options: ['3 oldala és 3 csúcsa van', '3 oldala és 4 csúcsa van', '4 oldala és 3 csúcsa van', 'Változó'],
    correctAnswer: 0,
    explanation: 'A sokszögeknél mindig teljesül: Oldalszám = Csúcsszám = Belső szögek száma. Háromszögnél ez 3.',
    hint: 'A nevében is benne van: három-szög.',
    breakdown: [{ label: 'Oldalak', value: '3' }, { label: 'Csúcsok', value: '3' }]
  },
  {
    id: 'sq1-17',
    level: 1,
    prompt: 'Hány átlója van egy háromszögnek?',
    options: ['0 darab átlója van (nincs nem szomszédos csúcsa)', '1 átlója van', '2 átlója van', '3 átlója van'],
    correctAnswer: 0,
    explanation: 'Az átló két NEM szomszédos csúcsot köt össze. Mivel a háromszögben minden csúcs szomszédos egymással, nincs átlója!',
    hint: 'Próbálj meg a háromszög belsejében két nem szomszédos csúcsot összekötni: nem tudsz, mert mindegyik szomszédos.',
    breakdown: [{ label: 'Háromszög átlói', value: '0 db' }]
  },
  {
    id: 'sq1-18',
    level: 1,
    prompt: 'Hány átlója van egy négyszögnek (pl. téglalapnak vagy négyzetnek)?',
    options: ['Pontosan 2 darab átlója van', '1 átlója van', '3 átlója van', '4 átlója van'],
    correctAnswer: 0,
    explanation: 'A négyszögben 4 csúcs van, a szemközti csúcsok összekötésével pontosan 2 átlót kapunk (AC és BD).',
    hint: 'Hányféleképpen tudsz szemközti sarkokat összekötni?',
    breakdown: [{ label: 'Négyszög átlói', value: '2 db (AC és BD)' }]
  },
  {
    id: 'sq1-19',
    level: 1,
    prompt: 'Ha egy kör sugara r = 4 cm, mekkora a kör átmérője (d)?',
    options: ['d = 8 cm (mivel d = 2 · r)', 'd = 4 cm', 'd = 16 cm', 'd = 2 cm'],
    correctAnswer: 0,
    explanation: 'Az átmérő a körvonal két pontját összekötő, a középponton átmenő leghosszabb szakasz: d = 2 · r = 2 · 4 = 8 cm.',
    hint: 'Az átmérő pontosan kétszer olyan hosszú, mint a sugár.',
    breakdown: [{ label: 'Képlet', value: 'd = 2 · r' }, { label: 'Számolás', value: '2 · 4 = 8 cm' }]
  },
  {
    id: 'sq1-20',
    level: 1,
    prompt: 'Mi a körvonal pontos geometriai meghatározása?',
    options: ['A sík azon pontjainak halmaza, amelyek a középponttól azonos távolságra vannak', 'Egy sokszög, aminek 100 oldala van', 'Bármilyen zárt görbe vonal', 'Egy ovális vonal'],
    correctAnswer: 0,
    explanation: 'A kör a síkban azon pontok összessége, amelyek a rögzített O középponttól pontosan r távolságra helyezkednek el.',
    hint: 'Gondolj a körzőre: a hegyét rögzíted, a ceruzahegy végig azonos távolságban mozog.',
    breakdown: [{ label: 'Középpont', value: 'O' }, { label: 'Állandó távolság', value: 'r (sugár)' }]
  },
  {
    id: 'sq1-21',
    level: 1,
    prompt: 'Milyen alakú lapok határolják a kockát, és hány darab lapja van?',
    options: ['6 darab egybevágó négyzetlap határolja', '8 darab téglalaplap határolja', '12 darab négyzetlap határolja', '4 darab háromszöglap határolja'],
    correctAnswer: 0,
    explanation: 'A kocka szabályos test, amelyet 6 egyforma négyzet határol a térben.',
    hint: 'Gondolj a dobókockára: 1-től 6-ig vannak rajta a pöttyök.',
    breakdown: [{ label: 'Lapok száma', value: '6 db' }, { label: 'Lapok alakja', value: 'Egybevágó négyzetek' }]
  },
  {
    id: 'sq1-22',
    level: 1,
    prompt: 'Hány darab csúcsa van a kockának?',
    options: ['8 darab csúcsa van (4 alul, 4 felül)', '6 csúcsa van', '12 csúcsa van', '16 csúcsa van'],
    correctAnswer: 0,
    explanation: 'A kocka alsó négyzetlapjának 4 csúcsa van, a felső lapjának is 4 csúcsa van, összesen 8 csúcs.',
    hint: 'Számold meg a doboz sarkait: 4 a tetején, 4 az alján.',
    breakdown: [{ label: 'Csúcsok (C)', value: '8 db' }]
  },
  {
    id: 'sq1-23',
    level: 1,
    prompt: 'Hány darab éle van a kockának?',
    options: ['12 darab éle van (mind egyenlő hosszú)', '6 éle van', '8 éle van', '24 éle van'],
    correctAnswer: 0,
    explanation: 'A kockának 4 alsó, 4 felső és 4 oldalsó függőleges éle van: 4 + 4 + 4 = 12 él.',
    hint: 'Egy hurkapálcából épített kockához hány pálcika kell?',
    breakdown: [{ label: 'Élek (É)', value: '12 db' }]
  },
  {
    id: 'sq1-24',
    level: 1,
    prompt: 'Milyen lapok határolják az általános téglatestet?',
    options: ['6 darab téglalaplap (amelyek közül a szemköztiek egybevágók)', '6 darab egyenlő négyzetlap', '4 háromszög és 1 négyzet', '8 körlap'],
    correctAnswer: 0,
    explanation: 'A téglatestet 6 téglalap határolja, a szemközti lapok párhuzamosak és egybevágók.',
    hint: 'Gondolj egy cipősdobozra vagy téglára.',
    breakdown: [{ label: 'Téglatest', value: '6 téglalaplap' }]
  },
  {
    id: 'sq1-25',
    level: 1,
    prompt: 'Hány közös pontja van két metsző egyenesnek a síkban?',
    options: ['Pontosan 1 közös pontja van (a metszéspont)', '0 közös pontja van', '2 közös pontja van', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Két metsző egyenes egyetlen pontban találkozik a síkban: e ∩ f = {P}.',
    hint: 'Mint az X betű szárai: egyetlen helyen keresztezik egymást.',
    breakdown: [{ label: 'Metsző egyenesek', value: 'Pontosan 1 metszéspont' }]
  },
  {
    id: 'sq1-26',
    level: 1,
    prompt: 'Hány közös pontja van két párhuzamos egyenesnek a síkban?',
    options: ['0 közös pontja van (soha nem találkoznak)', '1 közös pontja van', '2 közös pontja van', 'Minden pontjuk közös'],
    correctAnswer: 0,
    explanation: 'A párhuzamos egyenesek egy síkban fekszenek, de távolságuk állandó, így egyetlen közös pontjuk sincs (e ∩ f = ∅).',
    hint: 'Mint a vasúti sínek: sehol sem érnek össze.',
    breakdown: [{ label: 'Párhuzamosak', value: '0 közös pont (e ∥ f)' }]
  },
  {
    id: 'sq1-27',
    level: 1,
    prompt: 'Mi a merőlegesség matematikai jele?',
    options: ['⊥ (fordított T betű)', '∥ (két ferde vagy függőleges vonal)', '∩ (metszetjel)', '∪ (uniójel)'],
    correctAnswer: 0,
    explanation: 'A merőleges egyenesek jele: e ⊥ f (olvasd: e merőleges f-re).',
    hint: 'Egy vízszintes és egy rá állított függőleges vonal alkotja a jelet.',
    breakdown: [{ label: 'Merőlegesség jele', value: '⊥' }]
  },
  {
    id: 'sq1-28',
    level: 1,
    prompt: 'Mi a párhuzamosság matematikai jele?',
    options: ['∥ (két egyenes egymás mellett)', '⊥', '=', '≈'],
    correctAnswer: 0,
    explanation: 'A párhuzamos egyenesek jele: e ∥ f (olvasd: e párhuzamos f-fel).',
    hint: 'Két egymás mellett futó egyenes vonal alkotja a szimbólumot.',
    breakdown: [{ label: 'Párhuzamosság jele', value: '∥' }]
  },
  {
    id: 'sq1-29',
    level: 1,
    prompt: 'Hány darab derékszöge van a téglalapnak?',
    options: ['Mind a 4 belső szöge derékszög (90°)', 'Csak 2 derékszöge van', 'Csak 1 derékszöge van', '3 derékszöge van'],
    correctAnswer: 0,
    explanation: 'A téglalap definíciója: olyan négyszög, amelynek minden szöge derékszög.',
    hint: 'Mindegyik sarka pontosan 90°-os.',
    breakdown: [{ label: 'Téglalap szögei', value: '4 db derékszög' }]
  },
  {
    id: 'sq1-30',
    level: 1,
    prompt: 'Melyik négyszögre igaz egyszerre, hogy minden oldala egyenlő és minden szöge derékszög?',
    options: ['A négyzetre', 'Az általános téglalapra', 'A rombuszra', 'A trapézra'],
    correctAnswer: 0,
    explanation: 'A négyzet az egyetlen négyszög, amely egyszerre egyenlő oldalú és derékszögű (szabályos négyszög).',
    hint: 'A legtökéletesebb négyszög.',
    breakdown: [{ label: 'Alakzat', value: 'Négyzet (szabályos négyszög)' }]
  },

  // =========================================================================
  // 2. SZINT: ALAKZATOK, SZIMMETRIA ÉS ÖSSZEFÜGGÉSEK (31-60)
  // =========================================================================
  {
    id: 'sq2-31',
    level: 2,
    prompt: 'Mekkora szöget zár be az óra kismutatója és nagymutatója pontosan 1:00-kor?',
    options: ['30° (mivel 1 óraköz = 360° : 12 = 30°)', '15°', '45°', '60°'],
    correctAnswer: 0,
    explanation: 'A teljes számlap 360°, amely 12 egyenlő óraközre van osztva. 1 óraköz = 360° : 12 = 30°. 1:00-kor 1 óraköz van a mutatók között.',
    hint: '360° osztva 12-vel = ?',
    breakdown: [{ label: 'Teljes kör', value: '360°' }, { label: '1 óraköz', value: '360° : 12 = 30°' }]
  },
  {
    id: 'sq2-32',
    level: 2,
    prompt: 'Mekkora szöget zárnak be az óramutatók pontosan 3:00-kor?',
    options: ['Pontosan 90°-ot (3 óraköz = 3 · 30° = 90°, derékszög)', '60°-ot', '120°-ot', '45°-ot'],
    correctAnswer: 0,
    explanation: '12-től 3-ig pontosan 3 óraköz van: 3 · 30° = 90°, vagyis a mutatók merőlegesek egymásra.',
    hint: 'A számlap negyedrésze: 360° negyede mennyi?',
    breakdown: [{ label: 'Óraközök száma', value: '3' }, { label: 'Szög', value: '3 · 30° = 90°' }]
  },
  {
    id: 'sq2-33',
    level: 2,
    prompt: 'Mekkora szöget zárnak be az óramutatók 6:00-kor?',
    options: ['Pontosan 180°-ot (egyenesszög, félkör)', '90°-ot', '120°-ot', '360°-ot'],
    correctAnswer: 0,
    explanation: '6:00-kor a nagymutató 12-re, a kismutató 6-ra mutat, egy egyenesbe esnek: 6 · 30° = 180°.',
    hint: 'Egymással pontosan szembe mutat a két mutató.',
    breakdown: [{ label: 'Óraközök', value: '6' }, { label: 'Szög', value: '6 · 30° = 180°' }]
  },
  {
    id: 'sq2-34',
    level: 2,
    prompt: 'Mekkora a mutatók által bezárt KISEBBIK szög 4:00-kor?',
    options: ['120° (4 · 30° = 120°, tompaszög)', '90°', '150°', '80°'],
    correctAnswer: 0,
    explanation: '12 és 4 között 4 óraköz van: 4 · 30° = 120°.',
    hint: 'Szorozd meg a 4-et 30°-kal!',
    breakdown: [{ label: 'Számolás', value: '4 · 30° = 120°' }]
  },
  {
    id: 'sq2-35',
    level: 2,
    prompt: 'Szerkeszthető-e háromszög a = 3 cm, b = 4 cm és c = 5 cm oldalhosszúságokból?',
    options: ['IGEN, mert a két rövidebb oldal összege (3 + 4 = 7 cm) nagyobb a harmadiknál (7 > 5 cm)', 'NEM, mert nem egyenlők az oldalak', 'NEM, mert 5 túl nagy', 'Csak tompaszögű szerkeszthető'],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szerint a két rövidebb oldal összege nagyobb kell legyen a leghosszabbnál: 3 + 4 = 7 > 5, így a háromszög létezik (ez a híres derékszögű pitagoraszi háromszög).',
    hint: '3 + 4 = 7, ez nagyobb-e, mint 5?',
    breakdown: [{ label: 'Két kisebb összege', value: '3 + 4 = 7 cm' }, { label: 'Feltétel', value: '7 > 5 ✓ Létezik!' }]
  },
  {
    id: 'sq2-36',
    level: 2,
    prompt: 'Szerkeszthető-e háromszög a = 2 cm, b = 3 cm és c = 6 cm oldalakból?',
    options: ['NEM, mert 2 + 3 = 5 cm, ami KISEBB, mint 6 cm (nem érnek össze az oldalak)', 'IGEN, bármilyen 3 szakaszból szerkeszthető háromszög', 'IGEN, mert páros és páratlan számok váltakoznak', 'Csak számítógépen lehetséges'],
    correctAnswer: 0,
    explanation: 'Nem teljesül a háromszög-egyenlőtlenség: a két rövidebb oldal összege (2 + 3 = 5 cm) nem éri el a 6 cm-es oldalt, a körívek nem metszik egymást.',
    hint: '2 + 3 = 5. Kisebb vagy nagyobb, mint 6?',
    breakdown: [{ label: 'Két kisebb összege', value: '2 + 3 = 5 cm' }, { label: 'Feltétel', value: '5 < 6 ✗ Nem létezik!' }]
  },
  {
    id: 'sq2-37',
    level: 2,
    prompt: 'Mekkorák a szabályos (egyenlő oldalú) háromszög belső szögei?',
    options: ['Mind a 3 belső szöge pontosan 60°-os (180° : 3 = 60°)', 'Mind 90°-os', 'Kettő 45°-os és egy 90°-os', 'Mind 45°-os'],
    correctAnswer: 0,
    explanation: 'Mivel mind a 3 oldala egyenlő, a belső szögei is egyenlők: 180° : 3 = 60° mindhárom csúcsnál.',
    hint: 'Oszd el a 180°-ot 3 egyenlő részre!',
    breakdown: [{ label: 'Belső szögek', value: '180° : 3 = 60°' }]
  },
  {
    id: 'sq2-38',
    level: 2,
    prompt: 'Melyik tulajdonság jellemző minden EGYENLŐ SZÁRÚ háromszögre?',
    options: ['Pontosan 2 oldala egyenlő hosszú (szárak), és az alapon fekvő két szöge is egyenlő', 'Minden szöge derékszög', 'Nincs szimmetriatengelye', 'Minden oldala különböző hosszúságú'],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú háromszög két szára egyenlő, és az alapon fekvő szögei is hajszálpontosan egyenlők. 1 szimmetriatengelye van.',
    hint: 'Gondolj egy hegycsúcsra vagy egy háztetőre: szimmetrikus jobb és bal oldala van.',
    breakdown: [{ label: 'Szárak', value: '2 egyenlő oldal' }, { label: 'Szögek', value: 'Alapon fekvők egyenlők' }]
  },
  {
    id: 'sq2-39',
    level: 2,
    prompt: 'Lehet-e egy háromszögnek KÉT darab derékszöge (90°-os szöge)?',
    options: ['NEM, mert 90° + 90° = 180°, így a harmadik szög 0° lenne, ami lehetetlen', 'IGEN, minden derékszögű háromszögben kettő van', 'IGEN, ha nagyon nagy a háromszög', 'Csak egyenlő szárúban lehetséges'],
    correctAnswer: 0,
    explanation: 'A háromszög belső szögeinek összege pontosan 180°. Két derékszög már önmagában kitöltené a 180°-ot, így egy háromszögben legfeljebb 1 derékszög lehet.',
    hint: '90° + 90° = 180°. Mennyi maradna a harmadik csúcsnak?',
    breakdown: [{ label: 'Két derékszög összege', value: '180°' }, { label: 'Következtetés', value: 'Nem lehet 2 derékszög!' }]
  },
  {
    id: 'sq2-40',
    level: 2,
    prompt: 'Hány tompaszöge lehet legfeljebb egy háromszögnek?',
    options: ['Legfeljebb 1 tompaszöge lehet', '2 tompaszöge is lehet', '3 tompaszöge is lehet', 'Egyetlen tompaszöge sem lehet'],
    correctAnswer: 0,
    explanation: 'Mivel a tompaszög nagyobb 90°-nál, kettő tompaszög összege már meghaladná a 180°-ot. Így legfeljebb 1 tompaszög fordulhat elő.',
    hint: 'Két 91°-os szög összege már 182° lenne!',
    breakdown: [{ label: 'Tompaszögek maximális száma', value: 'Legfeljebb 1 db' }]
  },
  {
    id: 'sq2-41',
    level: 2,
    prompt: 'Egy konvex testnek 6 lapja (L = 6) és 8 csúcsa (C = 8) van. Az Euler-formula (C + L - É = 2) alapján hány éle van?',
    options: ['É = 12 (mivel 8 + 6 - 12 = 2)', 'É = 14', 'É = 10', 'É = 16'],
    correctAnswer: 0,
    explanation: 'Az Euler-formula: C + L - É = 2. Behelyettesítve: 8 + 6 - É = 2 → 14 - É = 2 → É = 12 él (ez pontosan a kocka vagy téglatest).',
    hint: '8 + 6 = 14. Mennyit kell levonni 14-ből, hogy 2-t kapj?',
    breakdown: [{ label: 'Képlet', value: 'C + L - É = 2' }, { label: 'Behelyettesítés', value: '14 - É = 2 → É = 12' }]
  },
  {
    id: 'sq2-42',
    level: 2,
    prompt: 'Hány négyzetlapból áll a kocka kiterített hálója?',
    options: ['6 darab négyzetből (mivel a kockának 6 lapja van)', '4 darab négyzetből', '8 darab négyzetből', '12 darab négyzetből'],
    correctAnswer: 0,
    explanation: 'A kockának 6 lapja van, így a kiterített síkbeli hálójának is pontosan 6 darab egybevágó négyzetből kell állnia.',
    hint: 'Ahány lapja van a testnek, annyi lapból áll a hálója.',
    breakdown: [{ label: 'Kocka lapjai', value: '6 lap' }, { label: 'Háló négyzetei', value: '6 db' }]
  },
  {
    id: 'sq2-43',
    level: 2,
    prompt: 'A híres T-alakú kockahálón (1-4-1) a középső 4 négyzetből álló sávban melyik két lap kerül egymással szembe az összehajtás után?',
    options: ['Az egymástól egy négyzettel elválasztott (második) lapok', 'A szomszédos lapok', 'Az első és az utolsó lap sosem kerül szembe', 'Minden lap érintkezik'],
    correctAnswer: 0,
    explanation: 'A kockahálóban egy egyenes sávban a szemközti lapok mindig egy közbeeső lappal vannak elválasztva (ugrás eggyel).',
    hint: 'Hajtsd fel a kocka oldalait: az egymás melletti lapok merőlegesek lesznek, a szemköztiek között egy lap van.',
    breakdown: [{ label: 'Szemközti lapok szabálya', value: 'Közöttük pontosan 1 lap van' }]
  },
  {
    id: 'sq2-44',
    level: 2,
    prompt: 'Egy kockaépítmény számozott alaprajza: az első sorban 2 és 1 kocka van, a második sorban 3 és 2 kocka van. Összesen hány kockából épült fel a test?',
    options: ['8 darab kockából (2 + 1 + 3 + 2 = 8)', '6 kockából', '10 kockából', '4 kockából'],
    correctAnswer: 0,
    explanation: 'Az építmény teljes kockaszámát úgy kapjuk meg, hogy összeadjuk az alaprajzon szereplő összes számot: 2 + 1 + 3 + 2 = 8 kocka.',
    hint: 'Add össze a négy számot!',
    breakdown: [{ label: 'Számok összege', value: '2 + 1 + 3 + 2 = 8' }]
  },
  {
    id: 'sq2-45',
    level: 2,
    prompt: 'Hogyan határozzuk meg egy kockaépítmény elölnézetének oszlopmagasságait az alaprajzból?',
    options: ['Minden oszlopban szemből nézve a sorok közül a LEGNAGYOBB számot vesszük (a maximumot)', 'Összeadjuk a sorok számait', 'A legkisebb számot vesszük', 'Csak az első sor számít'],
    correctAnswer: 0,
    explanation: 'Szemből nézve a magasabb kockaoszlop eltakarja az alacsonyabbat, így a nézeten mindig az adott oszlop maximális magassága látszik.',
    hint: 'Ha elöl 1 kocka van, de mögötte egy 3-as torony, mit látsz szemből?',
    breakdown: [{ label: 'Nézet szabálya', value: 'Oszloponkénti maximum magasság' }]
  },
  {
    id: 'sq2-46',
    level: 2,
    prompt: 'Mikor nevezünk két egyenest KITÉRŐNEK a térben?',
    options: ['Ha nincsenek egy síkban (nem metszik egymást és nem is párhuzamosak)', 'Ha 90°-ot zárnak be a síkban', 'Ha párhuzamosak egy lapon', 'Ha egy pontban metszik egymást'],
    correctAnswer: 0,
    explanation: 'A kitérő egyenesek térbeli fogalom: nincs olyan közös sík, amely mindkettőt tartalmazná. Nem találkoznak és az irányuk sem azonos.',
    hint: 'Gondolj a hídra és az alatta áthaladó folyóra: nem érnek össze, mégsem párhuzamosak.',
    breakdown: [{ label: 'Kitérő egyenesek', value: 'Nincs közös sík, nem metszők és nem párhuzamosak' }]
  },
  {
    id: 'sq2-47',
    level: 2,
    prompt: 'Egy kocka alsó elülső AB éle és a hátsó függőleges CG éle milyen helyzetben van a térben?',
    options: ['Kitérő egyenesek (nem metszik egymást és nem párhuzamosak)', 'Metsző egyenesek', 'Párhuzamos egyenesek', 'Egybeeső egyenesek'],
    correctAnswer: 0,
    explanation: 'Az AB él elöl vízszintesen fut, a CG él hátul függőlegesen fut. Külön síkban vannak, így kitérő egyenesek.',
    hint: 'Nézd meg a kockát: van közös csúcsuk? Nem. Egyirányúak? Nem.',
    breakdown: [{ label: 'AB és CG él', value: 'Kitérő élek a kockában' }]
  },
  {
    id: 'sq2-48',
    level: 2,
    prompt: 'Hogyan mérjük geometriailag helyesen egy külső P pont távolságát egy e egyenestől?',
    options: ['A pontból az egyenesre bocsátott MERŐLEGES szakasz hosszával (legrövidebb út)', 'Bármilyen ferde szakasszal', 'A pont koordinátáinak összegével', 'A vonalzó szélének elforgatásával'],
    correctAnswer: 0,
    explanation: 'A geometriai távolság mindig a legrövidebb út, ami a pontból az egyenesre merőlegesen bocsátott szakasz hossza: d(P, e) = |PT|, ahol PT ⊥ e.',
    hint: 'A legrövidebb távolság mindig merőleges.',
    breakdown: [{ label: 'Távolság mérése', value: 'Merőlegesen mérve!' }]
  },
  {
    id: 'sq2-49',
    level: 2,
    prompt: 'Mit mondhatunk két párhuzamos egyenes távolságáról a síkban?',
    options: ['Mindenütt állandó, sehol sem közelednek és sehol sem távolodnak', 'A végtelenben elfogy a távolságuk', 'Egyre nagyobb lesz', 'Attól függ, melyik pontban nézzük'],
    correctAnswer: 0,
    explanation: 'A párhuzamos egyenesek definíciójából következik, hogy a rájuk merőleges távolság minden pontban hajszálpontosan ugyanakkora (d = állandó).',
    hint: 'A vasúti sínpárok távolsága sem változik sehol.',
    breakdown: [{ label: 'Párhuzamosok távolsága', value: 'Állandó mindenhol' }]
  },
  {
    id: 'sq2-50',
    level: 2,
    prompt: 'Milyen távolságra vannak az AB szakaszfelező merőlegesének pontjai az A és B végpontoktól?',
    options: ['Mindegyik pont egyenlő távol van az A és B ponttól (|PA| = |PB|)', 'Közelebb vannak az A ponthoz', 'Közelebb vannak a B ponthoz', 'Változó'],
    correctAnswer: 0,
    explanation: 'A szakaszfelező merőleges azon pontok halmaza a síkban, amelyek a szakasz két végpontjától pontosan egyenlő távolságra vannak.',
    hint: 'Gondolj a felezőpontra: pontosan középen van, és a merőlegesen felfelé haladva a szimmetria miatt a két távolság mindig egyenlő marad.',
    breakdown: [{ label: 'Szakaszfelező merőleges', value: '|PA| = |PB| minden pontjára' }]
  },
  {
    id: 'sq2-51',
    level: 2,
    prompt: 'Melyik állítás IGAZ a téglalap átlóira?',
    options: ['Egyenlő hosszúak és kölcsönösen felezik egymást, de NEM merőlegesek', 'Különböző hosszúságúak', 'Merőlegesek egymásra és felezik a szögeket', 'Csak egy átlója van'],
    correctAnswer: 0,
    explanation: 'A téglalap átlói azonos hosszúságúak (|AC| = |BD|) és felezik egymást, de nem 90°-ot zárnak be egymással.',
    hint: 'Átlói egyenlők és felezik egymást, de nem szabnak szabályos keresztet.',
    breakdown: [{ label: 'Téglalap átlói', value: 'Egyenlők, felezik egymást, nem merőlegesek' }]
  },
  {
    id: 'sq2-52',
    level: 2,
    prompt: 'Miben különböznek a NÉGYZET átlói a téglalap átlóitól?',
    options: ['A négyzet átlói MERŐLEGESEK egymásra (90°) és FELEZIK a belső derékszögeket (45°-ra)', 'A négyzet átlói nem egyenlő hosszúak', 'A négyzet átlói nem találkoznak', 'Nincs különbség'],
    correctAnswer: 0,
    explanation: 'A négyzet speciális szimmetriája miatt az átlói pontosan 90°-os derékszöget zárnak be, és a csúcsok 90°-os szögeit két 45°-os szögre felezik.',
    hint: 'A négyzet átlói tökéletes merőleges keresztet formálnak a középpontban.',
    breakdown: [{ label: 'Négyzet átlói', value: 'Merőlegesek (90°) + Szögfelezők (45°)' }]
  },
  {
    id: 'sq2-53',
    level: 2,
    prompt: 'Hány szimmetriatengelye van a téglalapnak?',
    options: ['Pontosan 2 darab (a két szemközti oldalfelező merőleges)', 'Pontosan 4 darab', '1 darab', '0 darab'],
    correctAnswer: 0,
    explanation: 'A téglalapnak pontosan 2 szimmetriatengelye van. Az átlói NEM tükörtengelyek!',
    hint: 'Vízszintesen és függőlegesen hajtható félbe pontos fedéssel.',
    breakdown: [{ label: 'Téglalap szimmetriatengelyei', value: '2 db' }]
  },
  {
    id: 'sq2-54',
    level: 2,
    prompt: 'Hány szimmetriatengelye van a négyzetnek?',
    options: ['Pontosan 4 darab (2 oldalfelező merőleges + 2 átló)', 'Pontosan 2 darab', 'Pontosan 8 darab', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 tükörtengelye van: a 2 oldalfelező merőleges és a 2 átlója mentén is szimmetrikus.',
    hint: 'A téglalap 2 tengelyéhez hozzáadódik a 2 átló is.',
    breakdown: [{ label: 'Négyzet szimmetriatengelyei', value: '4 db' }]
  },
  {
    id: 'sq2-55',
    level: 2,
    prompt: 'Szimmetriatengelye-e a téglalapnak az átlója?',
    options: ['NEM, mert ha az átló mentén hajtjuk félbe a lapot, a csúcsok elcsúsznak egymástól', 'IGEN, minden téglalap átlója tükörtengely', 'Csak akkor, ha páros a területe', 'Csak az A4-es lapnál'],
    correctAnswer: 0,
    explanation: 'Gyakori dolgozathiba! Az átló mentén félbehajtva a téglalap két fele nem fedi egymást, a csúcsok kilógnak. Az átló csak a négyzetnél tükörtengely.',
    hint: 'Próbáld ki egy füzetlappal: a sarkok nem esnek egymásra.',
    breakdown: [{ label: 'Téglalap átlója', value: 'NEM szimmetriatengely' }]
  },
  {
    id: 'sq2-56',
    level: 2,
    prompt: 'Miért igaz az, hogy „Minden négyzet téglalap”?',
    options: ['Mert a négyzet rendelkezik a téglalap minden tulajdonságával (minden belső szöge 90°)', 'Mert a négyzetnek is 4 oldala van', 'Nem igaz, ez egy tévhit', 'Mert a kerületük mindig egyenlő'],
    correctAnswer: 0,
    explanation: 'A téglalap meghatározása a 4 derékszög. Mivel a négyzet minden szöge derékszög, így a négyzet a téglalapok egy speciális csoportja.',
    hint: 'Nézd meg a téglalap szabályát: a négyzet hibátlanul teljesíti!',
    breakdown: [{ label: 'Minden négyzet', value: 'Téglalap is egyben' }]
  },
  {
    id: 'sq2-57',
    level: 2,
    prompt: 'Miért HAMIS az, hogy „Minden téglalap négyzet”?',
    options: ['Mert egy általános téglalap szomszédos oldalai nem egyenlő hosszúak (a ≠ b)', 'Mert a téglalapnak nincsenek derékszögei', 'Mert a téglalap nem síkidom', 'Igazából igaz az állítás'],
    correctAnswer: 0,
    explanation: 'A négyzet feltétele, hogy minden oldala egyenlő legyen. Egy 5 cm × 3 cm-es téglalap oldalai nem egyenlők, így nem négyzet.',
    hint: 'Nem minden ember kosárlabdázó, pedig minden kosárlabdázó ember.',
    breakdown: [{ label: 'Általános téglalap', value: 'Nem minden oldala egyenlő → Nem négyzet' }]
  },
  {
    id: 'sq2-58',
    level: 2,
    prompt: 'Mit jelent a halmazok metszete (A ∩ B) a geometriában?',
    options: ['Azon alakzatok halmazát, amelyek mind az A, mind a B halmaz tulajdonságával rendelkeznek', 'Az összes alakzat egyesítését', 'Az A halmazból elvett elemeket', 'Az üres halmazt'],
    correctAnswer: 0,
    explanation: 'A metszet a közös elemek halmaza: például a téglalapok és rombuszok metszete a négyzetek halmaza (egyszerre derékszögű és egyenlő oldalú).',
    hint: 'Gondolj a Venn-diagram közös, egymást átfedő területére.',
    breakdown: [{ label: 'Metszet (∩)', value: 'Közös elemek halmaza' }]
  },
  {
    id: 'sq2-59',
    level: 2,
    prompt: 'Mi a körvonal leghosszabb húrja?',
    options: ['Az átmérő (d = 2r), amely átmegy a középponton', 'A sugár (r)', 'Bármely két pontot összekötő ív', 'A kör érintője'],
    correctAnswer: 0,
    explanation: 'A húr a körvonal két pontját összekötő szakasz. A leghosszabb húr a kör középpontján átmenő átmérő.',
    hint: 'A középponton átvágva kapjuk a leghosszabb belső szakaszt.',
    breakdown: [{ label: 'Leghosszabb húr', value: 'Átmérő (d = 2r)' }]
  },
  {
    id: 'sq2-60',
    level: 2,
    prompt: 'Szakaszfelező merőleges szerkesztésekor mekkorára kell kinyitni a körzőt a végpontokból történő ívhúzáshoz?',
    options: ['Szemmel láthatóan a szakasz felénél nagyobbra (r > AB : 2)', 'Pontosan a szakasz felére', 'A szakasz felénél kisebbre', 'Bármilyen 1 cm-es nyílásra'],
    correctAnswer: 0,
    explanation: 'Ha a körzőnyílás kisebb vagy egyenlő a szakasz felével, a két ív nem metszi egymást felül és alul. A nyílásnak nagyobbnak kell lennie a felénél!',
    hint: 'Ha túl kicsi a körzőnyílás, a két körív el sem éri egymást a szakasz közepén.',
    breakdown: [{ label: 'Körzőnyílás szabálya', value: 'Nagyobb a szakasz felénél!' }]
  },

  // =========================================================================
  // 3. SZINT: SZÁMÍTÁSOK, MÉRTÉKEK ÉS TÉMAZÁRÓ MESTERFOK (61-90)
  // =========================================================================
  {
    id: 'sq3-61',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 8 cm és b = 6 cm. Mennyi a kerülete (K)?',
    options: ['K = 28 cm (mivel 2 · (8 + 6) = 2 · 14 = 28 cm)', 'K = 48 cm', 'K = 14 cm', 'K = 28 cm²'],
    correctAnswer: 0,
    explanation: 'K = 2 · (a + b) = 2 · (8 + 6) = 2 · 14 = 28 cm. A kerület mértékegysége hosszúság (cm).',
    hint: 'Add össze a két oldalt és szorozd meg 2-vel!',
    breakdown: [{ label: 'Képlet', value: 'K = 2 · (a + b)' }, { label: 'Számolás', value: '2 · 14 = 28 cm' }]
  },
  {
    id: 'sq3-62',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 8 cm és b = 6 cm. Mennyi a területe (T)?',
    options: ['T = 48 cm² (mivel 8 · 6 = 48 cm²)', 'T = 28 cm²', 'T = 48 cm', 'T = 96 cm²'],
    correctAnswer: 0,
    explanation: 'T = a · b = 8 · 6 = 48 cm². A terület mértékegysége négyzetcentiméter (cm²).',
    hint: 'Szorozd össze a két oldalt!',
    breakdown: [{ label: 'Képlet', value: 'T = a · b' }, { label: 'Számolás', value: '8 · 6 = 48 cm²' }]
  },
  {
    id: 'sq3-63',
    level: 3,
    prompt: 'Egy négyzet oldala a = 9 cm. Mennyi a kerülete (K)?',
    options: ['K = 36 cm (mivel 4 · 9 = 36 cm)', 'K = 81 cm', 'K = 18 cm', 'K = 36 cm²'],
    correctAnswer: 0,
    explanation: 'K = 4 · a = 4 · 9 = 36 cm.',
    hint: 'Szorozd meg az oldalt 4-gyel!',
    breakdown: [{ label: 'Képlet', value: 'K = 4 · a' }, { label: 'Számolás', value: '4 · 9 = 36 cm' }]
  },
  {
    id: 'sq3-64',
    level: 3,
    prompt: 'Egy négyzet oldala a = 9 cm. Mennyi a területe (T)?',
    options: ['T = 81 cm² (mivel 9 · 9 = 81 cm²)', 'T = 36 cm²', 'T = 81 cm', 'T = 18 cm²'],
    correctAnswer: 0,
    explanation: 'T = a · a = a² = 9 · 9 = 81 cm².',
    hint: 'Szorozd meg az oldalt önmagával!',
    breakdown: [{ label: 'Képlet', value: 'T = a²' }, { label: 'Számolás', value: '9 · 9 = 81 cm²' }]
  },
  {
    id: 'sq3-65',
    level: 3,
    prompt: 'Egy négyzet kerülete K = 48 cm. Mekkora az oldala (a) és a területe (T)?',
    options: ['a = 12 cm és T = 144 cm²', 'a = 24 cm és T = 576 cm²', 'a = 12 cm és T = 48 cm²', 'a = 6 cm és T = 36 cm²'],
    correctAnswer: 0,
    explanation: 'Oldalhossz: a = K : 4 = 48 : 4 = 12 cm. Terület: T = 12 · 12 = 144 cm².',
    hint: 'Oszd el a kerületet 4-gyel, majd az eredményt emeld négyzetre!',
    breakdown: [{ label: 'Oldal', value: '48 : 4 = 12 cm' }, { label: 'Terület', value: '12 · 12 = 144 cm²' }]
  },
  {
    id: 'sq3-66',
    level: 3,
    prompt: 'Egy négyzet területe T = 49 cm². Mekkora a kerülete (K)?',
    options: ['K = 28 cm (mivel a = 7 cm, így 4 · 7 = 28 cm)', 'K = 14 cm', 'K = 49 cm', 'K = 196 cm'],
    correctAnswer: 0,
    explanation: 'Mivel T = a · a = 49 cm², így az oldal a = 7 cm (mert 7 · 7 = 49). A kerület: K = 4 · 7 = 28 cm.',
    hint: 'Melyik számnak a négyzete 49? Utána szorozd meg 4-gyel!',
    breakdown: [{ label: 'Oldal', value: '√49 = 7 cm' }, { label: 'Kerület', value: '4 · 7 = 28 cm' }]
  },
  {
    id: 'sq3-67',
    level: 3,
    prompt: 'Egy téglalap kerülete K = 40 cm, és egyik oldala a = 12 cm. Mekkora a másik oldala (b)?',
    options: ['b = 8 cm (fél-kerület: 20 cm, 20 - 12 = 8 cm)', 'b = 16 cm', 'b = 28 cm', 'b = 4 cm'],
    correctAnswer: 0,
    explanation: 'A két szomszédos oldal összege a kerület fele: a + b = 40 : 2 = 20 cm. Ha a = 12 cm, akkor b = 20 - 12 = 8 cm.',
    hint: 'Felezd meg a kerületet, majd vond ki belőle a 12-t!',
    breakdown: [{ label: 'Fél-kerület (a + b)', value: '20 cm' }, { label: 'b oldal', value: '20 - 12 = 8 cm' }]
  },
  {
    id: 'sq3-68',
    level: 3,
    prompt: 'Egy téglalap területe T = 35 cm², egyik oldala a = 7 cm. Mekkora a kerülete (K)?',
    options: ['K = 24 cm (b = 35 : 7 = 5 cm, K = 2 · (7 + 5) = 24 cm)', 'K = 12 cm', 'K = 42 cm', 'K = 35 cm'],
    correctAnswer: 0,
    explanation: 'A b oldal: b = T : a = 35 : 7 = 5 cm. A kerület: K = 2 · (7 + 5) = 2 · 12 = 24 cm.',
    hint: 'Oszd el a területet 7-tel, hogy megkapd a b oldalt, majd számold ki a kerületet!',
    breakdown: [{ label: 'Másik oldal', value: '35 : 7 = 5 cm' }, { label: 'Kerület', value: '2 · (7 + 5) = 24 cm' }]
  },
  {
    id: 'sq3-69',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 3 dm és b = 25 cm. Mennyi a téglalap kerülete centiméterben?',
    options: ['K = 110 cm (3 dm = 30 cm, 2 · (30 + 25) = 110 cm)', 'K = 56 cm', 'K = 55 cm', 'K = 750 cm'],
    correctAnswer: 0,
    explanation: 'Átváltás: 1 dm = 10 cm, így 3 dm = 30 cm. K = 2 · (30 + 25) = 2 · 55 = 110 cm.',
    hint: 'Először váltsd át a decimétert centiméterre: 3 dm = ? cm',
    breakdown: [{ label: 'Átváltás', value: '3 dm = 30 cm' }, { label: 'Kerület', value: '2 · (30 + 25) = 110 cm' }]
  },
  {
    id: 'sq3-70',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 4 dm és b = 15 cm. Mennyi a területe cm²-ben?',
    options: ['T = 600 cm² (4 dm = 40 cm, 40 · 15 = 600 cm²)', 'T = 60 cm²', 'T = 60 dm²', 'T = 110 cm²'],
    correctAnswer: 0,
    explanation: '4 dm = 40 cm. T = 40 cm · 15 cm = 600 cm².',
    hint: '4 dm = 40 cm. 40 · 15 = ?',
    breakdown: [{ label: 'Átváltás', value: '4 dm = 40 cm' }, { label: 'Terület', value: '40 · 15 = 600 cm²' }]
  },
  {
    id: 'sq3-71',
    level: 3,
    prompt: 'Egy háromszög két belső szöge α = 45° és β = 65°. Mekkora a harmadik szöge (γ)?',
    options: ['γ = 70° (mivel 180° - (45° + 65°) = 180° - 110° = 70°)', 'γ = 80°', 'γ = 90°', 'γ = 60°'],
    correctAnswer: 0,
    explanation: 'A belső szögek összege 180°: γ = 180° - 45° - 65° = 70°.',
    hint: 'Add össze a két ismert szöget, majd vond ki 180°-ból!',
    breakdown: [{ label: 'Két szög összege', value: '45° + 65° = 110°' }, { label: 'Harmadik szög', value: '180° - 110° = 70°' }]
  },
  {
    id: 'sq3-72',
    level: 3,
    prompt: 'Egy egyenlő szárú háromszög szárszöge 80°. Mekkorák az alapon fekvő szögei?',
    options: ['Mindkettő 50°-os ((180° - 80°) : 2 = 100° : 2 = 50°)', 'Mindkettő 40°-os', 'Mindkettő 80°-os', 'Egyik 60°, másik 40°'],
    correctAnswer: 0,
    explanation: 'A két alapon fekvő szög egyenlő: összegük 180° - 80° = 100°, így egyenként 100° : 2 = 50°.',
    hint: '180° - 80° = 100°, ezt oszd el 2 egyenlő részre!',
    breakdown: [{ label: 'Alapi szögek összege', value: '100°' }, { label: 'Egy szög', value: '100° : 2 = 50°' }]
  },
  {
    id: 'sq3-73',
    level: 3,
    prompt: 'Egy egyenlő szárú háromszög egyik alapon fekvő szöge 55°. Mekkora a szárszöge?',
    options: ['70° (mivel 180° - 2 · 55° = 180° - 110° = 70°)', '55°', '80°', '60°'],
    correctAnswer: 0,
    explanation: 'Mivel a másik alapi szög is 55°, így a kettő összege 110°. A szárszög: 180° - 110° = 70°.',
    hint: 'Az alapon lévő két szög egyenlő: 55° + 55° = 110°.',
    breakdown: [{ label: 'Két alapi szög', value: '2 · 55° = 110°' }, { label: 'Szárszög', value: '180° - 110° = 70°' }]
  },
  {
    id: 'sq3-74',
    level: 3,
    prompt: 'Egy derékszögű háromszög egyik hegyesszöge 38°. Mekkora a másik hegyesszöge?',
    options: ['52° (mivel 90° - 38° = 52°)', '62°', '42°', '142°'],
    correctAnswer: 0,
    explanation: 'Mivel a derékszög 90°, a két hegyesszög összege 90° kell legyen: 90° - 38° = 52°.',
    hint: 'A két hegyesszög összege mindig 90° derékszögű háromszögben.',
    breakdown: [{ label: 'Számolás', value: '90° - 38° = 52°' }]
  },
  {
    id: 'sq3-75',
    level: 3,
    prompt: 'Mekkora szöget zár be a kismutató és a nagymutató 2:30-kor?',
    options: ['105° (mivel a kismutató félúton van 2 és 3 között: 3 · 30° + 15° = 105°)', '90°', '120°', '100°'],
    correctAnswer: 0,
    explanation: 'Fél órakor a nagymutató 6-on áll. A kismutató nem a 2-esen áll, hanem félúton a 2 és 3 között (15°-kal elmozdulva). A 3 és 6 között 3 · 30° = 90°, ehhez jön a 15°: 90° + 15° = 105°.',
    hint: 'Fél óra alatt a kismutató egy fél óraközt (15°) halad előre a 3-as felé!',
    breakdown: [{ label: 'Távolság 3-tól 6-ig', value: '90°' }, { label: 'Kismutató elmozdulása', value: '15°' }, { label: 'Összes szög', value: '105°' }]
  },
  {
    id: 'sq3-76',
    level: 3,
    prompt: 'Egy kocka egyetlen élének hossza a = 5 cm. Mennyi az 1 db lapjának területe és a 6 lapjának összterülete (felszíne)?',
    options: ['1 lap: 25 cm², 6 lap: 150 cm²', '1 lap: 20 cm², 6 lap: 120 cm²', '1 lap: 25 cm², 6 lap: 100 cm²', '1 lap: 10 cm², 6 lap: 60 cm²'],
    correctAnswer: 0,
    explanation: 'Egy lap négyzet alakú: T = 5 · 5 = 25 cm². A kockának 6 ilyen lapja van: 6 · 25 = 150 cm².',
    hint: 'Számold ki egy négyzetlap területét, majd szorozd meg 6-tal!',
    breakdown: [{ label: '1 lap területe', value: '5 · 5 = 25 cm²' }, { label: '6 lap területe', value: '6 · 25 = 150 cm²' }]
  },
  {
    id: 'sq3-77',
    level: 3,
    prompt: 'Egy kockaváz építéséhez hurkapálcákat használunk. Ha a kocka minden éle 4 cm hosszú, mekkora az összes él együttes hossza?',
    options: ['48 cm (mivel 12 él van: 12 · 4 = 48 cm)', '24 cm', '36 cm', '64 cm'],
    correctAnswer: 0,
    explanation: 'A kockának 12 egyenlő éle van: 12 · 4 cm = 48 cm pálcika szükséges az élvázhoz.',
    hint: 'Hány éle van a kockának? Szorozd meg 4-gyel!',
    breakdown: [{ label: 'Élek száma', value: '12 db' }, { label: 'Összhossz', value: '12 · 4 = 48 cm' }]
  },
  {
    id: 'sq3-78',
    level: 3,
    prompt: 'Egy téglatest élei a = 3 cm, b = 4 cm és c = 5 cm. Mennyi a téglatest mind a 12 élének összhossza?',
    options: ['48 cm (mivel 4 darab van mindegyik élfajtából: 4 · (3 + 4 + 5) = 48 cm)', '24 cm', '60 cm', '36 cm'],
    correctAnswer: 0,
    explanation: 'A téglatestnek 4 darab a, 4 darab b és 4 darab c hosszúságú éle van: 4 · (3 + 4 + 5) = 4 · 12 = 48 cm.',
    hint: 'Minden dimenzióból pontosan 4 él van a téglatestben.',
    breakdown: [{ label: 'Élfajták összege', value: '3 + 4 + 5 = 12 cm' }, { label: '12 él hossza', value: '4 · 12 = 48 cm' }]
  },
  {
    id: 'sq3-79',
    level: 3,
    prompt: 'Egy 4 m × 3 m-es szobapadlóra hány darab 50 cm × 50 cm-es járólap szükséges a teljes lefedéshez?',
    options: ['48 darab (padló területe: 12 m² = 120 000 cm², 1 lap: 2500 cm² → 120 000 : 2500 = 48)', '24 darab', '96 darab', '12 darab'],
    correctAnswer: 0,
    explanation: 'A 4 m-es oldalon 400 : 50 = 8 lap fér el. A 3 m-es oldalon 300 : 50 = 6 lap fér el. Összesen: 8 · 6 = 48 darab lap kell.',
    hint: 'Számold ki, hány lap fér el egy sorban (szélességben) és hány sor lesz (hosszúságban)!',
    breakdown: [{ label: 'Oszlopok', value: '400 : 50 = 8 lap' }, { label: 'Sorok', value: '300 : 50 = 6 sor' }, { label: 'Összesen', value: '8 · 6 = 48 db' }]
  },
  {
    id: 'sq3-80',
    level: 3,
    prompt: 'Egy háromoldalú hasábnak (prizmának) 5 lapja (L = 5) és 6 csúcsa (C = 6) van. Az Euler-formula alapján hány éle van?',
    options: ['9 éle van (C + L - É = 2 → 6 + 5 - 9 = 2)', '6 éle van', '8 éle van', '12 éle van'],
    correctAnswer: 0,
    explanation: '6 + 5 - É = 2 → 11 - É = 2 → É = 9 él (3 alsó, 3 felső és 3 függőleges összekötő él).',
    hint: '6 + 5 = 11. Mennyit vonj ki 11-ből, hogy 2 legyen?',
    breakdown: [{ label: 'Euler-formula', value: '11 - É = 2' }, { label: 'Élek', value: 'É = 9' }]
  },
  {
    id: 'sq3-81',
    level: 3,
    prompt: 'Egy négyzet alapú gúlának (piramisnak) 5 csúcsa és 5 lapja van. Hány éle van?',
    options: ['8 éle van (4 alapél + 4 oldalél)', '6 éle van', '10 éle van', '12 éle van'],
    correctAnswer: 0,
    explanation: 'C + L - É = 2 alapján: 5 + 5 - É = 2 → 10 - É = 2 → É = 8 él. (4 az alapnégyzeten, 4 fut fel a csúcsba).',
    hint: '5 + 5 = 10. 10 - 8 = 2.',
    breakdown: [{ label: 'Gúla élei', value: '8 db él' }]
  },
  {
    id: 'sq3-82',
    level: 3,
    prompt: 'Ha egy négyzet oldalhosszát a KÉTSZERESÉRE növeljük (pl. 3 cm-ről 6 cm-re), hányszorosára nő a területe?',
    options: ['4-szeresére nő (mivel a terület a²-tel arányos: 2² = 4)', '2-szeresére nő', '8-szorosára nő', 'Nem változik'],
    correctAnswer: 0,
    explanation: 'Például: 3 cm-nél T = 9 cm². Ha megduplázzuk: 6 cm-nél T = 36 cm². 36 : 9 = 4-szerese! Az oldal kétszerezésekor a terület négyszereződik.',
    hint: 'Számold ki egy 3 cm-es és egy 6 cm-es négyzet területét, majd hasonlítsd össze!',
    breakdown: [{ label: 'Eredeti terület', value: '3 · 3 = 9 cm²' }, { label: 'Új terület', value: '6 · 6 = 36 cm²' }, { label: 'Növekedés', value: '36 : 9 = 4-szeres' }]
  },
  {
    id: 'sq3-83',
    level: 3,
    prompt: 'Egy egyenesen kijelölünk 4 pontot: A, B, C és D. Hány különböző szakasz jön létre ezekből a pontokból?',
    options: ['6 különböző szakasz (AB, AC, AD, BC, BD, CD)', '4 szakasz', '3 szakasz', '8 szakasz'],
    correctAnswer: 0,
    explanation: 'A-ból 3 szakasz indul (AB, AC, AD), B-ből még 2 új (BC, BD), C-ből még 1 (CD): 3 + 2 + 1 = 6 különböző szakasz.',
    hint: 'Számold össze a párokat: hányféleképpen választhatsz ki 2 pontot a 4-ből?',
    breakdown: [{ label: 'Párok', value: 'AB, AC, AD, BC, BD, CD' }, { label: 'Összesen', value: '6 db szakasz' }]
  },
  {
    id: 'sq3-84',
    level: 3,
    prompt: 'Egy r = 5 cm sugarú kör középpontjától egy e egyenes távolsága d = 3 cm. Hány közös pontja van a körnek és az egyenesnek?',
    options: ['2 közös pontja van (metsző egyenes, mivel a távolság kisebb a sugárnál: 3 < 5)', '1 közös pontja van (érintő)', '0 közös pontja van', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Mivel az egyenes közelebb van a középponthoz, mint a kör sugara (d < r, 3 cm < 5 cm), ezért az egyenes belevág a körbe, két pontban metszi azt.',
    hint: 'Ha közelebb halad el az egyenes a középponthoz, mint a kör széle, átmegy a körön.',
    breakdown: [{ label: 'Távolság és sugár', value: 'd = 3 cm < r = 5 cm' }, { label: 'Közös pontok', value: '2 db (metsző)' }]
  },
  {
    id: 'sq3-85',
    level: 3,
    prompt: 'Milyen távolságra van az érintő egyenes a kör középpontjától, ha a kör sugara r = 7 cm?',
    options: ['Pontosan d = 7 cm-re (a távolság egyenlő a sugárral: d = r)', '3,5 cm-re', '14 cm-re', '0 cm-re'],
    correctAnswer: 0,
    explanation: 'Az érintő egyetlen pontban érinti a körvonalat, így a középponttól mért merőleges távolsága pontosan megegyezik a kör sugarával: d = r = 7 cm.',
    hint: 'Az érintési pontba húzott sugár merőleges az érintőre.',
    breakdown: [{ label: 'Érintő feltétele', value: 'd = r' }, { label: 'Távolság', value: '7 cm' }]
  },
  {
    id: 'sq3-86',
    level: 3,
    prompt: 'Szerkeszthető-e háromszög a = 4 cm, b = 6 cm és c = 10 cm oldalakból?',
    options: ['NEM, mert a két rövidebb összege pontosan egyenlő a legnagyobbal (4 + 6 = 10), egy egyenessé laposodna', 'IGEN, mert 10 a legnagyobb', 'IGEN, derékszögű háromszög', 'Csak tompaszögű'],
    correctAnswer: 0,
    explanation: 'Szigorú egyenlőtlenségnek kell teljesülnie: a + b > c! Ha a + b = c (4 + 6 = 10), a két szakasz pontosan ráfekszik a harmadikra, elfajuló egyenessé válik, nem alkot háromszöget.',
    hint: '4 + 6 = 10. Nem nagyobb, hanem egyenlő!',
    breakdown: [{ label: 'Két kisebb összege', value: '4 + 6 = 10 cm' }, { label: 'Harmadik oldal', value: '10 cm' }, { label: 'Eredmény', value: 'Nem szerkeszthető!' }]
  },
  {
    id: 'sq3-87',
    level: 3,
    prompt: 'Egy 3×3×3 méretű, összesen 27 darab kiskockából összeragasztott nagy kockában hány olyan kiskocka van, amelynek EGYETLEN lapja sem látszik kívülről?',
    options: ['Pontosan 1 darab kiskocka (a legbelső kocka)', '0 kocka', '3 kocka', '6 kocka'],
    correctAnswer: 0,
    explanation: 'A külső réteg levonása után: (3 - 2) × (3 - 2) × (3 - 2) = 1 × 1 × 1 = 1 kocka marad a nagy kocka mértani közepén teljesen rejtve.',
    hint: 'Képzeld el a bűvös kockát (Rubik-kocka): hány kocka van teljesen elrejtve a belsejében?',
    breakdown: [{ label: 'Belső méret', value: '(3-2) × (3-2) × (3-2)' }, { label: 'Rejtett kockák', value: '1 db' }]
  },
  {
    id: 'sq3-88',
    level: 3,
    prompt: 'Két egyenes metszésekor keletkező négy szög közül az egyik 65°-os. Mekkora a mellette lévő kiegészítő szög és a vele szemközti csúcsszög?',
    options: ['Mellette lévő: 115° (180° - 65° = 115°), szemközti: 65°', 'Mellette lévő: 65°, szemközti: 115°', 'Mind a négy 65°-os', 'Mellette lévő: 90°, szemközti: 65°'],
    correctAnswer: 0,
    explanation: 'A mellékszögek összege 180° (egyenesszög): 180° - 65° = 115°. A csúcsszögek pedig mindig egyenlők: a szemközti szög is 65°.',
    hint: 'Egyenesszög = 180°. Mennyi hiányzik a 65°-hoz 180°-ig?',
    breakdown: [{ label: 'Mellékszög', value: '180° - 65° = 115°' }, { label: 'Csúcsszög', value: '65°' }]
  },
  {
    id: 'sq3-89',
    level: 3,
    prompt: 'Egy téglalap átlójának hossza 16 cm. Mekkora sugarú (r) kör írható a téglalap köré az átlók metszéspontjából (M)?',
    options: ['r = 8 cm (mivel az átlók felezik egymást, a csúcsok távolsága M-től 16 : 2 = 8 cm)', 'r = 16 cm', 'r = 4 cm', 'r = 32 cm'],
    correctAnswer: 0,
    explanation: 'A téglalap mind a 4 csúcsa egyenlő távolságra van az átlók metszéspontjától. Ez a távolság az átló fele: r = 16 : 2 = 8 cm.',
    hint: 'Az átló feleződik a középpontban: 16 : 2 = ?',
    breakdown: [{ label: 'Átló fele', value: '16 : 2 = 8 cm' }, { label: 'Köré írt kör sugara', value: 'r = 8 cm' }]
  },
  {
    id: 'sq3-90',
    level: 3,
    prompt: 'Melyik összefoglaló állítássor 100%-osan hibátlan az 5. osztályos geometriából?',
    options: [
      'Háromszög belső szögei 180°, négyszögé 360°, a négyzetnek 4 szimmetriatengelye van, Euler-formula: C + L - É = 2',
      'Minden téglalap négyzet, a háromszög belső szögei 360°-osak, a kockának 8 éle van',
      'A téglalap átlója tükörtengely, a derékszög 180°, a pont 1 dimenziós',
      'A négyzetnek csak 2 szimmetriatengelye van, a kör átmérője a sugár fele'
    ],
    correctAnswer: 0,
    explanation: 'Az első opció minden eleme sziklaszilárd geometriai alaptétel: háromszög 180°, négyszög 360°, négyzet 4 tengely, Euler C + L - É = 2.',
    hint: 'Keresd a hibátlan tételekből álló választ a témazáróhoz!',
    breakdown: [{ label: 'Tételek', value: '180°, 360°, 4 tengely, C + L - É = 2' }, { label: 'Értékelés', value: '100% tökéletes témazáró tudás! 🏆' }]
  }
];

export const SummaryQuiz: React.FC<SummaryQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="9. Geometria nagy összefoglaló kvíz"
      subtitle="90 feladat 3 szinten (szintenként 30 feladat): átfogó témazáró felkészítő a teljes III. fejezetből"
      topicId="g5-geom-summary-quiz"
      questions={SUMMARY_QUESTIONS}
      levels={[
        {
          level: 1,
          title: '1. Szint: Geometriai alapfogalmak és szétválogatások',
          subtitle: 'Dimenziók (0D-3D), szögtípusok, síkidomok és testek alapjai',
          range: '1 - 30. feladat',
          focus: 'Alapfogalmak'
        },
        {
          level: 2,
          title: '2. Szint: Alakzatok, szimmetria és összefüggések',
          subtitle: 'Óralap-szög, háromszög-egyenlőtlenség, nézetek, kitérő egyenesek és átlók',
          range: '31 - 60. feladat',
          focus: 'Összefüggések és felismerés'
        },
        {
          level: 3,
          title: '3. Szint: Számítások, mértékek és témazáró mesterfok',
          subtitle: 'K és T számolás, hiányzó szögek, Euler-formula, logikai összetett feladatok',
          range: '61 - 90. feladat',
          focus: 'Mesterfok & Logika'
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="amber"
      cheatSheetCards={[
        {
          title: "Dimenziók és alapelemek",
          content: "0D pont (P): nincs kiterjedése.\n1D vonal: egyenes (végtelen), szakasz (véges AB), félegyenes (1 kezdőpont).\n2D síkidom: zárt vonal határolja, van területe (T).\n3D test: zárt felület határolja térben. Euler-formula: C + L - É = 2."
        },
        {
          title: "Szögek és óralap",
          content: "0° nullszög • 0°-90° hegyesszög • 90° derékszög (⊥) • 90°-180° tompaszög • 180° egyenesszög • 180°-360° homorúszög • 360° teljesszög.\nÓralap: 1 óraköz = 360° : 12 = 30°."
        },
        {
          title: "Háromszögek és sokszögek",
          content: "Háromszög belső szögei: mindig 180°!\nHáromszög-egyenlőtlenség: két rövidebb összege > leghosszabb oldal (a + b > c).\nNégyszög belső szögei: mindig 360°!\nKör: d = 2 · r (átmérő a leghosszabb húr)."
        },
        {
          title: "Téglalap, négyzet és egyenesek",
          content: "Síkban: metsző (1 pont), párhuzamos (0 pont, d = állandó), merőleges (90°).\nTérben: KITÉRŐ egyenesek (nincs közös sík, nem találkoznak).\nTéglalap: 2 szimmetriatengely (oldalfelezők). K = 2(a + b), T = a · b.\nNégyzet: 4 szimmetriatengely (2 oldalfelező + 2 átló!). K = 4a, T = a²."
        }
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Összefoglaló párosító',
          subtitle: 'Találd meg az összetartozó geometriai párokat!',
          description: 'Párosítsd a fogalmakat, dimenziókat, képleteket és szimbólumokat 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <SummaryMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Összefoglaló csoportosító',
          subtitle: 'Rendszerezd az alakzatokat és állításokat!',
          description: 'Csoportosítsd a dimenziókat, szögtípusokat és tételeket kategóriáik szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <SummarySorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default SummaryQuiz;
