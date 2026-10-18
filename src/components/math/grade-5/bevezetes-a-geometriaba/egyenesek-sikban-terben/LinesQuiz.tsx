import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { LinesMatcher } from './LinesMatcher';
import { LinesSorter } from './LinesSorter';

export interface LinesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const LINES_QUESTIONS: Question[] = [
  // ==========================================
  // 1. SZINT: SÍKBELI EGYENESEK ALAPJAI (1-10)
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Hány darab közös pontja van két metsző egyenesnek a síkban?',
    options: [
      'Pontosan 1 darab közös pontja van (a metszéspont)',
      '0 közös pontja van',
      '2 közös pontja van',
      'Végtelen sok közös pontja van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-14 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="5" y1="30" x2="55" y2="10" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="5" x2="45" y2="35" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="20" r="3" fill="#1e1b4b" />
        <text x="35" y="22" className="text-[10px] font-black fill-slate-900">P</text>
      </svg>
    ),
    explanation: 'Két metsző egyenes egyetlen pontban találkozik a síkban. Ezt a pontot metszéspontnak nevezzük, jele: e ∩ f = {P}.',
    hint: 'Gondolj egy X betűre vagy az olló száraira: hány pontban érnek össze?',
    breakdown: [
      { label: 'Egyenesek viszonya', value: 'Metsző egyenesek' },
      { label: 'Közös pontok száma', value: 'Pontosan 1 pont (P)' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mekkora szöget zárnak be egymással a merőleges egyenesek?',
    options: [
      'Pontosan 90°-ot (derékszöget)',
      'Pontosan 180°-ot (egyenesszöget)',
      'Pontosan 45°-ot',
      'Bármilyen hegyesszöget'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-20 h-14 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="5" y1="20" x2="55" y2="20" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="5" x2="30" y2="35" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
        <path d="M 38 20 A 8 8 0 0 0 30 12" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="34" cy="16" r="1" fill="#047857" />
      </svg>
    ),
    explanation: 'A merőleges egyenesek egymással pontosan 90°-os szöget, azaz derékszöget zárnak be. Jelölésük: e ⊥ f.',
    hint: 'Gondolj egy téglalap sarkára vagy a fal és a padló találkozására.',
    breakdown: [
      { label: 'Merőlegesség jele', value: '⊥' },
      { label: 'Bezárt szög', value: '90° (derékszög)' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hány közös pontja van két különböző párhuzamos egyenesnek a síkban?',
    options: [
      '0 darab (nincs közös pontjuk, sosem metszik egymást)',
      '1 darab',
      '2 darab',
      'Végtelen sok'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos egyenesek definíció szerint egy síkban fekszenek és nincs közös pontjuk (e ∩ f = ∅). A végtelenben sem találkoznak.',
    hint: 'Gondolj az egyenes vasúti sínpárra.',
    breakdown: [
      { label: 'Párhuzamosság jele', value: '∥' },
      { label: 'Közös pontok', value: '0 db (üres halmaz)' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik matematikai szimbólum jelöli a merőlegességet?',
    options: [
      '⊥ (pl. e ⊥ f)',
      '∥ (pl. e ∥ f)',
      '= (pl. e = f)',
      '≈ (pl. e ≈ f)'
    ],
    correctAnswer: 0,
    explanation: 'A merőlegesség matematikai jele a fordított T betűre hasonlító ⊥ szimbólum: e ⊥ f azt jelenti, hogy az e egyenes merőleges az f egyenesre.',
    hint: 'Olyan jel, ami egy derékszögű talpat ábrázol.',
    breakdown: [
      { label: 'Merőleges', value: '⊥' },
      { label: 'Párhuzamos', value: '∥' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Melyik matematikai szimbólum jelöli a párhuzamosságot?',
    options: [
      '∥ (pl. e ∥ f)',
      '⊥ (pl. e ⊥ f)',
      '∩ (pl. e ∩ f)',
      '∪ (pl. e ∪ f)'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamosság jele a két egymás melletti függőleges vonal (∥): e ∥ f azt jelenti, hogy e párhuzamos f-fel.',
    hint: 'Két egymás mellett futó egyenes vonal.',
    breakdown: [
      { label: 'Párhuzamos', value: '∥' },
      { label: 'Jelentése', value: 'Nincs metszéspont a síkban' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Magyarországon hogyan jelöljük a derékszöget geometriai ábrákon?',
    options: [
      'Negyedkörívvel, amelynek belsejében egy pont van',
      'Egy kis négyzetecskével a sarokban',
      'Két párhuzamos vonalkával',
      'Egy felkiáltójellel'
    ],
    correctAnswer: 0,
    explanation: 'A magyar iskolai geometriai szabvány szerint a 90°-os derékszöget egy negyedkörívvel és a belsejében elhelyezett ponttal jelöljük (a kis négyzet az angolszász jelölés).',
    hint: 'Körív + pont a szögtartományban.',
    breakdown: [
      { label: 'Magyar jelölés', value: 'Negyedkörív + pont' },
      { label: 'Szögérték', value: '90°' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Hogyan mérjük meg egy külső P pont távolságát egy e egyenestől?',
    options: [
      'A P pontból az e egyenesre bocsátott merőleges szakasz hosszával',
      'Tetszőleges ferde vonalzóállással',
      'A pont és az egyenes tetszőleges pontjának távolságával',
      'Két párhuzamos egyenes behúzásával'
    ],
    correctAnswer: 0,
    explanation: 'Egy pont és egy egyenes távolsága a pontból az egyenesre bocsátott MERŐLEGES szakasz hossza. Ez a legrövidebb út a pont és az egyenes között.',
    hint: 'Mindig a legrövidebb összekötő utat keressük, ami merőleges.',
    breakdown: [
      { label: 'Távolságiránya', value: 'Merőleges az egyenesre (90°)' },
      { label: 'Tulajdonsága', value: 'A legrövidebb távolság' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Mi igaz két párhuzamos egyenes távolságára a teljes hosszuk mentén?',
    options: [
      'Mindenhol pontosan ugyanakkora (állandó)',
      'Távolodva fokozatosan csökken',
      'Távolodva fokozatosan nő',
      'Váltakozik pontról pontra'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos egyenesek távolsága mindenhol állandó: sem közelebb nem kerülnek egymáshoz, sem nem távolodnak.',
    hint: 'Ha a vasúti sínek távolsága változna, kisiklana a vonat.',
    breakdown: [
      { label: 'Párhuzamosok távolsága', value: 'd = állandó' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Egy síkban két egymásra merőleges egyenes hány derékszöget zár be egymással?',
    options: [
      '4 darab 90°-os derékszöget',
      'Csak 1 darabot',
      '2 darabot',
      '3 darabot'
    ],
    correctAnswer: 0,
    explanation: 'A két merőleges egyenes metszéspontja körül a teljes 360°-os szög 4 egyenlő részre oszlik: 360° : 4 = 90°. Mind a 4 szög derékszög.',
    hint: '360° osztva 4 egyenlő részre.',
    breakdown: [
      { label: 'Teljesszög', value: '360°' },
      { label: '4 egyenlő rész', value: '4 × 90° = 360°' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Két egyenes metszi egymást, és az egyik bezárt szög 50°. Mekkora a vele szemközti csúcsszög?',
    options: [
      'Pontosan 50° (a csúcsszögek mindig egyenlők)',
      '130°',
      '40°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'Két metsző egyenes által alkotott szemközti szögeket csúcsszögeknek nevezzük. A csúcsszögek szárai egymás meghosszabbításai, ezért nagyságuk mindig egyenlő (50° = 50°).',
    hint: 'A csúcsszögek egyenlő nagyságúak.',
    breakdown: [
      { label: 'Szög', value: '50°' },
      { label: 'Csúcsszöge', value: '50° (egyenlő)' }
    ]
  },

  // ==========================================
  // 2. SZINT: TÉRBELI ÉS KITÉRŐ EGYENESEK (11-20)
  // ==========================================
  {
    id: 'l2-q11',
    level: 2,
    prompt: 'Mit jelent pontosan a térbeli geometriában az, hogy két egyenes KITÉRŐ?',
    options: [
      'Nincsenek egy síkban: nem metszik egymást és nem is párhuzamosak',
      'Derékszöget zárnak be egymással',
      'Két pontban metszik egymást',
      'Ugyanabban a síkban futnak párhuzamosan'
    ],
    correctAnswer: 0,
    explanation: 'Két egyenes akkor kitérő, ha nem fektethető rájuk közös sík. Ebből adódóan soha nem metszik egymást, és párhuzamosak sem lehetnek.',
    hint: 'Gondolj az autópálya felüljáróra: elkerülik egymást, nincs közös sík.',
    breakdown: [
      { label: 'Közös sík', value: 'Nincs (nem egysíkúak)' },
      { label: 'Közös pont', value: 'Nincs (0 db)' },
      { label: 'Párhuzamosak-e?', value: 'Nem párhuzamosak' }
    ]
  },
  {
    id: 'l2-q12',
    level: 2,
    prompt: 'Létezhetnek-e kitérő egyenesek egyetlen sík felületén (pl. a füzetlapodon)?',
    options: [
      'Nem létezhetnek (egy síkban két egyenes vagy metszi egymást, vagy párhuzamos, vagy egybeesik)',
      'Igen, ha elég hosszú a füzetlap',
      'Igen, ha nem rajzoljuk meg a metszéspontot',
      'Csak akkor, ha ferdén tartjuk a füzetet'
    ],
    correctAnswer: 0,
    explanation: 'A kitérő egyenesek definíció szerint nincsenek egy síkban. Mivel a füzetlap egyetlen sík, rajta minden egyenes egysíkú, így kitérő egyenesek kizárólag a 3D térben létezhetnek.',
    hint: 'Kitérő = nincsenek egy síkban.',
    breakdown: [
      { label: 'Síkban lehetséges', value: 'Metsző, merőleges, párhuzamos, egybeeső' },
      { label: 'Kitérő egyenesek', value: 'Csak a 3D térben fordulhatnak elő' }
    ]
  },
  {
    id: 'l2-q13',
    level: 2,
    prompt: 'Egy kockán az alsó lap elülső éle (AB) és a felső lap hátsó éle (HG) párhuzamosak. Milyen viszonyban van az alsó elülső él (AB) a jobb oldali hátsó függőleges éllel (CG)?',
    options: [
      'Kitérő egyenesek (nem metszik egymást és nem párhuzamosak)',
      'Párhuzamos egyenesek',
      'Metsző merőleges egyenesek',
      'Egybeeső egyenesek'
    ],
    correctAnswer: 0,
    explanation: 'Az AB él vízszintes és elöl fut, a CG él függőleges és hátul fut. Nincs közös pontjuk, nem egyirányúak és nem fektethető rájuk közös sík a kockában: kitérő egyenesek.',
    hint: 'Az egyik vízszintes elöl, a másik függőleges hátul.',
    breakdown: [
      { label: 'AB él', value: 'Alsó elülső él' },
      { label: 'CG él', value: 'Hátsó függőleges él' },
      { label: 'Viszonyuk', value: 'Kitérő egyenesek' }
    ]
  },
  {
    id: 'l2-q14',
    level: 2,
    prompt: 'Egy kocka egyetlen A csúcsában 3 él találkozik (AB, AD, AE). Milyen szögben állnak ezek az élek egymáshoz képest?',
    options: [
      'Páronként mind merőlegesek egymásra (mindhárom szög 90°)',
      '60°-os szöget zárnak be',
      '45°-os szöget zárnak be',
      'Párhuzamosak egymással'
    ],
    correctAnswer: 0,
    explanation: 'A kocka minden lapja négyzet, ezért egy csúcsban a hosszúság, a szélesség és a magasság élei páronként mind derékszöget (90°) zárnak be egymással (AB ⊥ AD, AB ⊥ AE, AD ⊥ AE).',
    hint: 'Gondolj a szoba sarkára: a két fal és a padló élei mind derékszöget alkotnak.',
    breakdown: [
      { label: 'Csúcsban találkozó élek', value: 'Hosszúság, szélesség, magasság' },
      { label: 'Szögeik', value: 'Páronként 90° (merőlegesek)' }
    ]
  },
  {
    id: 'l2-q15',
    level: 2,
    prompt: 'Egy kocka egy adott élével összesen hány másik él párhuzamos a kocka 12 éle közül?',
    options: [
      'Pontosan 3 másik él párhuzamos vele',
      '1 másik él',
      '4 másik él',
      '2 másik él'
    ],
    correctAnswer: 0,
    explanation: 'A kocka 12 éle 3 csoportba sorolható: 4 darab hosszúsági, 4 darab szélességi és 4 darab magassági él. Egy adott éllel a saját csoportjának másik 3 éle párhuzamos (pl. AB-vel a DC, EF, HG).',
    hint: 'Egy téglatestnek vagy kockának 4 azonos irányú éle van.',
    breakdown: [
      { label: 'Azonos irányú élek', value: 'Összesen 4 db' },
      { label: 'Párhuzamos élek száma', value: '4 - 1 = 3 másik él' }
    ]
  },
  {
    id: 'l2-q16',
    level: 2,
    prompt: 'Két egyenesre ráfektethető egy közös sík, és nincs közös pontjuk. Milyen egyenesek ezek?',
    options: [
      'Párhuzamos egyenesek',
      'Kitérő egyenesek',
      'Metsző egyenesek',
      'Merőleges egyenesek'
    ],
    correctAnswer: 0,
    explanation: 'Ha két egyenes egy síkban van (egysíkú) és nincs közös pontjuk, akkor a párhuzamos egyenesek definícióját kapjuk. Ha nem lenne közös sík, kitérők lennének.',
    hint: 'Egy síkban vannak, de nem találkoznak = párhuzamos.',
    breakdown: [
      { label: 'Közös sík van', value: 'Egysíkúak' },
      { label: 'Közös pont nincs', value: 'Párhuzamosak (∥)' }
    ]
  },
  {
    id: 'l2-q17',
    level: 2,
    prompt: 'Igaz vagy hamis az alábbi állítás: „Ha a térben két egyenes nem metszi egymást, akkor azok biztosan párhuzamosak.”',
    options: [
      'Hamis, mert a térben lehetnek kitérő egyenesek is',
      'Igaz, ez a párhuzamosság definíciója',
      'Csak kockán igaz',
      'Csak gömbön hamis'
    ],
    correctAnswer: 0,
    explanation: 'Az állítás hamis! A térben két egyenes akkor is elkerülheti egymást (nem metszik egymást), ha nem párhuzamosak, hanem különböző síkokban futnak (kitérők).',
    hint: 'Gondolj a felüljáróra és az alatta áthaladó útra!',
    breakdown: [
      { label: 'Állítás', value: 'Nem metsző = biztosan párhuzamos?' },
      { label: 'Helyes válasz', value: 'Hamis (kitérők is lehetnek)' }
    ]
  },
  {
    id: 'l2-q18',
    level: 2,
    prompt: 'Hány darab kitérő élpárja van a kocka egyetlen kiválasztott élének (pl. az alsó elülső élnek)?',
    options: [
      'Pontosan 4 él kitérő vele',
      '2 él kitérő vele',
      '3 él kitérő vele',
      '6 él kitérő vele'
    ],
    correctAnswer: 0,
    explanation: 'A kocka 12 éléből a kiválasztott élt levonva 11 él marad: 4 él metszi (a 2 végpontban), 3 él párhuzamos vele, a maradék 11 - 4 - 3 = 4 él pedig kitérő vele.',
    hint: '11 egyéb élből: 4 metsző, 3 párhuzamos, 4 kitérő.',
    breakdown: [
      { label: 'Metsző élek', value: '4 db' },
      { label: 'Párhuzamos élek', value: '3 db' },
      { label: 'Kitérő élek', value: '4 db (11 - 7 = 4)' }
    ]
  },
  {
    id: 'l2-q19',
    level: 2,
    prompt: 'Két metsző egyenes a térben meghatároz-e egyértelműen egy síkot?',
    options: [
      'Igen, két metsző egyenesre pontosan egy sík fektethető',
      'Nem, két metsző egyenesre végtelen sok sík illeszkedik',
      'Csak akkor, ha merőlegesek',
      'Nem fektethető rájuk sík'
    ],
    correctAnswer: 0,
    explanation: 'A térgeometria alaptétele: két egymást metsző egyenes pontosan egy síkot határoz meg a térben (ugyanúgy, mint egy háromszög három csúcsa).',
    hint: 'Gondolj egy háromlábú székre vagy egy metsző ollóra: egy síkot alkotnak.',
    breakdown: [
      { label: 'Metsző egyenesek', value: 'Mindig egysíkúak' }
    ]
  },
  {
    id: 'l2-q20',
    level: 2,
    prompt: 'Két egymást metsző egyenes egyik szöge 115°. Mekkora a mellette fekvő mellékszög?',
    options: [
      '65° (mert 180° - 115° = 65°)',
      '115°',
      '75°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'Két metsző egyenes szomszédos szögei egyenesszöget (180°-ot) alkotnak, ezeket mellékszögeknek nevezzük. Ezért 180° - 115° = 65°.',
    hint: 'A mellékszögek összege 180°.',
    breakdown: [
      { label: 'Egyik szög', value: '115°' },
      { label: 'Mellékszög', value: '180° - 115° = 65°' }
    ]
  },

  // ==========================================
  // 3. SZINT: SZERKESZTÉSEK ÉS HALADÓ FELADATOK (21-30)
  // ==========================================
  {
    id: 'l3-q21',
    level: 3,
    prompt: 'Milyen körzőnyílást kell választani egy szakasz felezőmerőlegesének szerkesztésekor?',
    options: [
      'A szakasz felénél szemmel láthatóan nagyobbat',
      'Pontosan a szakasz negyedét',
      'A szakasz felénél kisebbet',
      'Pontosan 1 cm-t minden szakasznál'
    ],
    correctAnswer: 0,
    explanation: 'Ha a körző sugara kisebb lenne a szakasz felénél, a két végpontból húzott körívek nem érnék el egymást a középpont felé haladva, így nem jönne létre metszéspont. Ezért a sugárnak nagyobbnak kell lennie a szakasz felénél (r > AB : 2).',
    hint: 'A két körívnek találkoznia kell felül és alul is.',
    breakdown: [
      { label: 'Körzősugár (r)', value: 'r > |AB| : 2' },
      { label: 'Cél', value: 'Hogy a körívek metsszék egymást' }
    ]
  },
  {
    id: 'l3-q22',
    level: 3,
    prompt: 'Mi igaz a szakaszfelező merőleges egyenes tetszőleges P pontjára a szakasz A és B végpontjához viszonyítva?',
    options: [
      'Egyenlő távolságra van az A és B ponttól (|PA| = |PB|)',
      'Mindig közelebb van az A ponthoz',
      'A távolságok összege mindig 10 cm',
      'Nem mérhető a távolsága'
    ],
    correctAnswer: 0,
    explanation: 'A szakaszfelező merőleges a sík azon pontjainak halmaza, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak. Bármely P pontot választasz az egyenesen: |PA| = |PB|.',
    hint: 'Gondolj a tükörszimmetriára: a szakaszfelező merőleges tükörtengely az A és B pontok között.',
    breakdown: [
      { label: 'Szakaszfelező merőleges pontjai', value: '|PA| = |PB|' }
    ]
  },
  {
    id: 'l3-q23',
    level: 3,
    prompt: 'Egy a egyenesre merőleges a b egyenes (a ⊥ b), és a b egyenesre merőleges a c egyenes (b ⊥ c) ugyanabban a síkban. Milyen viszonyban van az a és a c egyenes?',
    options: [
      'Párhuzamosak egymással (a ∥ c)',
      'Merőlegesek egymásra',
      'Kitérők egymással',
      '60°-os szöget zárnak be'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="10" y1="30" x2="50" y2="30" stroke="#4f46e5" strokeWidth="2" />
        <line x1="30" y1="10" x2="30" y2="30" stroke="#9333ea" strokeWidth="2" />
        <line x1="10" y1="10" x2="50" y2="10" stroke="#4f46e5" strokeWidth="2" />
        <text x="52" y="32" className="text-[9px] font-black fill-indigo-700">a</text>
        <text x="32" y="22" className="text-[9px] font-black fill-purple-700">b</text>
        <text x="52" y="12" className="text-[9px] font-black fill-indigo-700">c</text>
      </svg>
    ),
    explanation: 'A síkban ugyanarra az egyenesre (b-re) állított két merőleges egyenes (a és c) szükségképpen párhuzamos egymással (a ∥ c).',
    hint: 'Képzeld el a létrát: a létra foka merőleges a szárakra, így a fokok párhuzamosak.',
    breakdown: [
      { label: 'a ⊥ b és c ⊥ b', value: 'Közös merőleges' },
      { label: 'Következmény', value: 'a ∥ c (párhuzamosak)' }
    ]
  },
  {
    id: 'l3-q24',
    level: 3,
    prompt: 'Ha a ∥ b és b ∥ c a síkban, milyen viszonyban van az a és a c egyenes?',
    options: [
      'a ∥ c (a párhuzamosság tranzitív tulajdonsága)',
      'a ⊥ c (merőlegesek)',
      'Metszik egymást 45°-ban',
      'Nem határozható meg'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamosság tranzitív: ha az a egyenes párhuzamos b-vel, és a b párhuzamos c-vel, akkor az a egyenes is párhuzamos c-vel (a ∥ c).',
    hint: 'Gondolj a vonalas füzet vonalaira: mindegyik párhuzamos az összes többivel.',
    breakdown: [
      { label: 'a ∥ b és b ∥ c', value: 'Láncolat' },
      { label: 'Következmény', value: 'a ∥ c' }
    ]
  },
  {
    id: 'l3-q25',
    level: 3,
    prompt: 'Egy síkban adott egy e egyenes és egy rá nem illeszkedő külső P pont. Hány darab olyan egyenes húzható a P ponton keresztül, amely merőleges az e egyenesre?',
    options: [
      'Pontosan 1 darab egyenes',
      '2 darab egyenes',
      'Végtelen sok egyenes',
      '0 darab'
    ],
    correctAnswer: 0,
    explanation: 'A síkgeometria alaptétele szerint egy adott külső pontból egy adott egyenesre pontosan egyetlen merőleges egyenes bocsátható.',
    hint: 'Próbáld ki a derékszögű vonalzóval: a pontra illesztve csak 1 vonalat tudsz húzni a vonalzó szára mentén.',
    breakdown: [
      { label: 'Adott pontból adott egyenesre', value: 'Pontosan 1 merőleges létezik' }
    ]
  },
  {
    id: 'l3-q26',
    level: 3,
    prompt: 'Egy síkban adott egy e egyenes és egy külső P pont. Hány darab olyan egyenes húzható a P ponton át, amely PÁRHUZAMOS az e egyenessel?',
    options: [
      'Pontosan 1 darab egyenes (Euklideszi párhuzamossági axióma)',
      '2 darab egyenes',
      'Végtelen sok egyenes',
      '0 darab'
    ],
    correctAnswer: 0,
    explanation: 'Ez az euklideszi geometria híres alaptétele (párhuzamossági axióma): egy adott ponton keresztül egy adott egyenessel pontosan egyetlen párhuzamos egyenes húzható a síkban.',
    hint: 'Csak 1 irány létezik, amivel párhuzamos maradsz anélkül, hogy metszenéd az egyenest.',
    breakdown: [
      { label: 'Párhuzamossági axióma', value: 'Pontosan 1 párhuzamos egyenes' }
    ]
  },
  {
    id: 'l3-q27',
    level: 3,
    prompt: 'Miért a merőleges szakasz a legrövidebb távolság egy külső pont és egy egyenes között?',
    options: [
      'Mert bármely más összekötő ferde szakasz egy derékszögű háromszög átfogója lenne, és az átfogó mindig hosszabb a befogónál',
      'Mert a merőleges vonal a legvastagabb',
      'Mert a körző mindig merőlegesen nyílik',
      'Mert a derékszög 90 fok'
    ],
    correctAnswer: 0,
    explanation: 'Ha a külső pontból az egyenes tetszőleges más pontjához húzunk szakaszt, egy derékszögű háromszöget kapunk, amelyben a ferde szakasz az átfogó, a merőleges szakasz pedig a befogó. A derékszögű háromszögben az átfogó mindig hosszabb bármelyik befogónál.',
    hint: 'A legrövidebb út mindig merőleges a célra.',
    breakdown: [
      { label: 'Merőleges szakasz', value: 'Derékszögű háromszög befogója' },
      { label: 'Ferde szakasz', value: 'Derékszögű háromszög átfogója (hosszabb)' }
    ]
  },
  {
    id: 'l3-q28',
    level: 3,
    prompt: 'Két párhuzamos egyenest elmetszünk egy harmadik, rájuk ferde egyenessel. Hány darab szög keletkezik összesen a két metszéspont körül?',
    options: [
      'Összesen 8 darab szög (4 az egyik, 4 a másik metszéspont körül)',
      '4 darab szög',
      '6 darab szög',
      '2 darab szög'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
        <line x1="5" y1="12" x2="55" y2="12" stroke="#4f46e5" strokeWidth="1.8" />
        <line x1="5" y1="28" x2="55" y2="28" stroke="#4f46e5" strokeWidth="1.8" />
        <line x1="15" y1="36" x2="45" y2="4" stroke="#ec4899" strokeWidth="1.8" />
      </svg>
    ),
    explanation: 'Mindkét metszéspont körül 4-4 szög keletkezik (2 tompaszög és 2 hegyesszög), így összesen 4 + 4 = 8 szög jön létre. A párhuzamosság miatt az azonos állású szögek egyenlők.',
    hint: 'Két metszéspont van, mindkettőnél 4 szög.',
    breakdown: [
      { label: 'Felső metszéspont', value: '4 szög' },
      { label: 'Alsó metszéspont', value: '4 szög' },
      { label: 'Összesen', value: '8 szög' }
    ]
  },
  {
    id: 'l3-q29',
    level: 3,
    prompt: 'Két egyenes merőleges egymásra (e ⊥ f). Ha az e egyenest elforgatjuk 10°-kal, mekkora lesz a két egyenes új bezárt hegyesszöge?',
    options: [
      '80° (mert 90° - 10° = 80°)',
      '100°',
      '90°',
      '70°'
    ],
    correctAnswer: 0,
    explanation: 'A merőleges egyenesek 90°-ot zárnak be. Ha az egyiket 10°-kal elforgatjuk a másik felé, a szög 90° - 10° = 80°-ra csökken (a tompaszög pedig 90° + 10° = 100° lesz).',
    hint: '90° - 10° = ?',
    breakdown: [
      { label: 'Eredeti szög', value: '90°' },
      { label: 'Elforgatás', value: '10°' },
      { label: 'Új hegyesszög', value: '80°' }
    ]
  },
  {
    id: 'l3-q30',
    level: 3,
    prompt: 'Egy kocka élei közül kiválasztunk kettőt. Milyen kölcsönös helyzetek fordulhatnak elő e két egyenes között a térben?',
    options: [
      'Metsző (derékszögű), párhuzamos, vagy kitérő',
      'Csak párhuzamosak lehetnek',
      'Csak kitérők lehetnek',
      'Bármilyen ferde szögben metszhetik egymást'
    ],
    correctAnswer: 0,
    explanation: 'A kocka bármely két élének egyenese a térben 3 kategória valamelyikébe esik: vagy párhuzamosak (azonos irányú élek), vagy merőlegesen metszik egymást (közös csúcs), vagy kitérőek (külön síkban vannak). Nem merőleges metszés kockaélek között nem fordul elő.',
    hint: 'A kocka élei derékszögekben állnak egymáshoz, így a metszők mindig merőlegesek.',
    breakdown: [
      { label: 'Kocka éleinek viszonyai', value: '1. Párhuzamos, 2. Merőlegesen metsző, 3. Kitérő' }
    ]
  }
];

export const LinesQuiz: React.FC<LinesQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="7. Egyenesek síkban, térben kvíz"
      subtitle="30 feladat 3 szinten: metsző, merőleges, párhuzamos és kitérő egyenesek, távolságmérés és szerkesztések"
      topicId="g5-geom-lines-quiz"
      questions={LINES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="indigo"
      cheatSheetCards={[
        {
          title: "Síkbeli egyenesek",
          content: "Metsző egyenesek: pontosan 1 közös pont (e ∩ f = {P}).\nMerőleges egyenesek: e ⊥ f (pontosan 90°-os derékszög, negyedkörív + pont).\nPárhuzamos egyenesek: e ∥ f (0 közös pont, távolságuk mindenhol állandó)."
        },
        {
          title: "Térbeli egyenesek (Kitérő egyenesek)",
          content: "Kitérő egyenesek: nincsenek egy síkban! Nem metszik egymást, és nem is párhuzamosak.\nPéldák: autópálya felüljáró; kocka alsó elülső éle és felső jobb oldali éle.\nA síkban NEM létezhetnek kitérő egyenesek, csak a 3D térben!"
        },
        {
          title: "Távolság és szerkesztés",
          content: "Távolság: MINDIG a merőleges szakasz hossza (legrövidebb út)!\nSzakaszfelező merőleges: körzőnyílás > AB : 2, mindkét végpontból körívek, metszéspontok összekötése.\nSzakaszfelező pontjai: egyenlő távolságra vannak a végpontoktól (|PA| = |PB|)."
        }
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg az összetartozó egyenespárokat és fogalmakat!',
          description: 'Párosítsd a síkbeli és térbeli egyeneseket jeleikkel, ábráikkal és tulajdonságaikkal 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <LinesMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét az egyenespárokat kategóriáik szerint!',
          description: 'Rendezd az egyeneseket síkbeli/térbeli, metsző/párhuzamos/kitérő kategóriákba!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <LinesSorter
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

export default LinesQuiz;
