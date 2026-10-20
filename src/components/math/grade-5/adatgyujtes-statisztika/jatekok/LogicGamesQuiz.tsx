import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { LogicGamesMatcher } from './LogicGamesMatcher';
import { LogicGamesSorter } from './LogicGamesSorter';

export interface LogicGamesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const LOGIC_GAMES_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, LOGIKAI KÉSZLET ÉS JELÖLÉSEK (1-10)
  // =========================================================================
  {
    id: 'gq1-1',
    level: 1,
    prompt: 'Hány alaptulajdonság alapján különböztetjük meg a Dienes-féle logikai készlet lapjait?',
    options: [
      '4 tulajdonság (forma, szín, méret, lyukasság)',
      '3 tulajdonság (forma, szín, méret)',
      '2 tulajdonság (forma és szín)',
      '5 tulajdonság (forma, szín, méret, lyukasság, súly)'
    ],
    correctAnswer: 0,
    explanation: 'A Dienes-féle készlet lapjainak 4 alaptulajdonsága van: forma (kör, négyzet, háromszög, téglalap), szín (piros, sárga, kék, zöld), méret (nagy, kicsi) és lyukasság (lyukas, teli).',
    hint: 'Gondolj arra: mit látsz a lap alakján, színén, nagyságán és a közepén?',
    breakdown: [
      { label: 'Forma', value: '4 féle' },
      { label: 'Szín', value: '4 féle' },
      { label: 'Méret', value: '2 féle' },
      { label: 'Lyukasság', value: '2 féle' }
    ]
  },
  {
    id: 'gq1-2',
    level: 1,
    prompt: 'Hány különböző lapból áll a teljes Dienes-féle logikai készlet?',
    options: [
      '64 lap',
      '32 lap',
      '48 lap',
      '16 lap'
    ],
    correctAnswer: 0,
    explanation: 'A lehetséges változatok száma: 4 (forma) × 4 (szín) × 2 (méret) × 2 (lyukasság) = 64 lap.',
    hint: 'Szorozd össze a tulajdonságok lehetséges értékeinek számát: 4 × 4 × 2 × 2!',
    breakdown: [
      { label: 'Számítás', value: '4 × 4 × 2 × 2 = 64' },
      { label: 'Azonos lapok', value: 'Nincs két egyforma lap a készletben!' }
    ]
  },
  {
    id: 'gq1-3',
    level: 1,
    prompt: 'Hány különböző szín található a logikai készletben?',
    options: [
      '4 szín (piros, sárga, kék, zöld)',
      '3 szín (piros, sárga, kék)',
      '5 szín (piros, sárga, kék, zöld, fehér)',
      '2 szín (piros és kék)'
    ],
    correctAnswer: 0,
    explanation: 'A készlet 4 ragyogó alapszínben készül: piros, sárga, kék és zöld.',
    hint: 'A klasszikus színes ceruzák 4 alapszínére gondolj.'
  },
  {
    id: 'gq1-4',
    level: 1,
    prompt: 'Hány darab kör alakú lap található összesen a 64 lapos készletben?',
    options: [
      '16 darab',
      '4 darab',
      '8 darab',
      '32 darab'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 4 forma van, a 64 lap egyenlően oszlik el köztük: 64 : 4 = 16 db, vagy 4 (szín) × 2 (méret) × 2 (lyuk) = 16 db kör.',
    hint: 'Minden formából pontosan ugyanannyi darab van a készletben: a 64 lap negyede kör.'
  },
  {
    id: 'gq1-5',
    level: 1,
    prompt: 'Mit jelent a halmazok metszete (A ∩ B)?',
    options: [
      'Azon elemek összessége, amelyek A-nak ÉS B-nek is egyszerre elemei',
      'Azon elemek, amelyek legalább az egyik halmazban benne vannak',
      'Csak az A halmaz azon elemei, amelyek B-ben nincsenek',
      'Az alaphalmaz összes eleme'
    ],
    correctAnswer: 0,
    explanation: 'A metszet a két halmaz közös része: az „ÉS” logikai kapcsolatnak felel meg. Azok az elemek alkotják, amelyek mindkét feltételt egyszerre teljesítik.',
    hint: 'Gondolj az útkereszteződésre: ott mindkét útnak a része az aszfalt!',
    breakdown: [
      { label: 'Jelölése', value: 'A ∩ B' },
      { label: 'Logikai művelet', value: 'ÉS kapcsolat' }
    ]
  },
  {
    id: 'gq1-6',
    level: 1,
    prompt: 'Milyen szimbólummal jelöljük azt, ha egy halmaznak egyetlen eleme sincs?',
    options: [
      '∅ (üres halmaz)',
      '0 (nulla számjegy)',
      '∈ (eleme jel)',
      '∩ (metszet jel)'
    ],
    correctAnswer: 0,
    explanation: 'Az üres halmaz jele az áthúrt kör: ∅ (vagy az üres kapcsos zárójel: {}). Fontos, hogy a 0 az egy szám, míg az üres halmaz egy olyan halmaz, amiben nincs semmi.',
    hint: 'Egy áthúzott kör szimbólum jelöli a semmit a halmazelméletben.'
  },
  {
    id: 'gq1-7',
    level: 1,
    prompt: 'Hogyan jelöljük szimbólummal azt, hogy a 6-os szám eleme a páros számok halmazának (P)?',
    options: [
      '6 ∈ P',
      '6 ∉ P',
      '6 ∩ P',
      '6 ∪ P'
    ],
    correctAnswer: 0,
    explanation: 'Az „eleme” reláció matematikai jele az ∈ szimbólum: 6 ∈ P azt jelenti, hogy a 6 beletartozik a P halmazba.',
    hint: 'Egy görög epszilonra (vagy lekerekített E betűre) hasonlító jel jelenti az eleme kapcsolatot.'
  },
  {
    id: 'gq1-8',
    level: 1,
    prompt: 'Egy „Nagy, piros, lyukas kör” laphoz keresünk olyan lapot, amely pontosan 1 tulajdonságban különbözik tőle. Melyik lehet az?',
    options: [
      'Kicsi, piros, lyukas kör',
      'Kicsi, kék, lyukas kör',
      'Nagy, kék, teli kör',
      'Kicsi, zöld, teli négyzet'
    ],
    correctAnswer: 0,
    explanation: 'A „Kicsi, piros, lyukas kör” lap csak a méretében tér el (kicsi vs. nagy), míg a színe (piros), lyukassága (lyukas) és formája (kör) teljesen megegyezik!',
    hint: 'Nézd meg egyesével a 4 tulajdonságot: formát, színt, méretet és lyukasságot!'
  },
  {
    id: 'gq1-9',
    level: 1,
    prompt: 'Mit jelent a halmazok uniója (A ∪ B)?',
    options: [
      'Azon elemek összessége, amelyek az A-ban VAGY a B-ben (vagy mindkettőben) benne vannak',
      'Csak a mindkét halmazban közös elemek',
      'Azon elemek, amelyek sem A-ban, sem B-ben nincsenek',
      'Az A és B halmaz elemeinek különbsége'
    ],
    correctAnswer: 0,
    explanation: 'Az unió (egyesítés) a „VAGY” kapcsolatnak felel meg: minden olyan elem beletartozik, amelyik legalább az egyik halmaz tagja.',
    hint: 'Az unió olyan, mint amikor két csapat összeáll egy nagy csapattá.'
  },
  {
    id: 'gq1-10',
    level: 1,
    prompt: 'Ha egy kártya „Kicsi, kék, teli négyzet”, és egy másik „Nagy, kék, teli négyzet”, hány tulajdonságban különböznek egymástól?',
    options: [
      'Pontosan 1 tulajdonságban (méretben)',
      '2 tulajdonságban',
      '3 tulajdonságban',
      'Egyáltalán nem különböznek'
    ],
    correctAnswer: 0,
    explanation: 'A forma (négyzet), a szín (kék) és a lyukasság (teli) megegyezik. Csak a méret (kicsi vs. nagy) különbözik, tehát pontosan 1 tulajdonságban térnek el.',
    hint: 'Hasonlítsd össze párban: Forma? Kék? Teli? Méret?'
  },

  // =========================================================================
  // 2. SZINT: DIAGRAMOK, RÉSZHALMAZOK ÉS SZÁMHALMAZOK (11-20)
  // =========================================================================
  {
    id: 'gq2-1',
    level: 2,
    prompt: 'Hány darab „piros ÉS kör” alakú lap van a logikai készletben?',
    options: [
      '4 darab (nagy teli, nagy lyukas, kicsi teli, kicsi lyukas)',
      '2 darab',
      '8 darab',
      '16 darab'
    ],
    correctAnswer: 0,
    explanation: 'A szín rögzített (piros = 1 lehetőség), a forma rögzített (kör = 1 lehetőség). A méret 2 féle (nagy, kicsi), a lyukasság 2 féle (teli, lyukas): 1 × 1 × 2 × 2 = 4 darab lap.',
    hint: 'Kombináld a két méretet (nagy, kicsi) a két lyukassággal (teli, lyukas)!'
  },
  {
    id: 'gq2-2',
    level: 2,
    prompt: 'Egy Venn-diagramban A = Páros számok {2, 4, 6, 8, 10}, B = Prímszámok {2, 3, 5, 7}. Mi kerül a metszetbe (A ∩ B)?',
    options: [
      '{2}',
      '{2, 4, 6}',
      '{2, 3, 5, 7}',
      'Üres halmaz (∅)'
    ],
    correctAnswer: 0,
    explanation: 'A metszetbe az a szám kerül, amelyik mindkét halmazban szerepel: a 2 az egyetlen szám, ami egyszerre páros és prímszám is.',
    hint: 'Melyik szám található meg mind az A, mind a B halmaz elemei között?'
  },
  {
    id: 'gq2-3',
    level: 2,
    prompt: 'Egy osztályban 18 tanuló szeret rajzolni, 15 szeret énekelni, és 7-en mindkettőt szeretik. Hány tanuló szeret legalább az egyik tevékenységet csinálni?',
    options: [
      '26 tanuló',
      '33 tanuló',
      '25 tanuló',
      '11 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'Az unió elemszáma: 18 + 15 − 7 = 26 tanuló. (Csak rajzolni szeret: 18 − 7 = 11 fő. Csak énekelni: 15 − 7 = 8 fő. Mindkettőt: 7 fő. Összesen: 11 + 7 + 8 = 26 fő).',
    hint: 'Ne add össze egyszerűen a 18-at és a 15-öt, mert a közös 7 főt kétszer számolnád!',
    breakdown: [
      { label: 'Csak rajz', value: '18 − 7 = 11 fő' },
      { label: 'Csak ének', value: '15 − 7 = 8 fő' },
      { label: 'Mindkettő', value: '7 fő' },
      { label: 'Összesen', value: '11 + 8 + 7 = 26 fő' }
    ]
  },
  {
    id: 'gq2-4',
    level: 2,
    prompt: 'Hány tartományra osztja a síkot egy kétkarikás Venn-diagram az alaphalmazzal együtt?',
    options: [
      '4 tartományra (csak A, metszet, csak B, és a külső tartomány)',
      '3 tartományra',
      '2 tartományra',
      '5 tartományra'
    ],
    correctAnswer: 0,
    explanation: 'Négy különálló tartomány keletkezik: 1. Csak az A karika (A \\ B), 2. A metszet (A ∩ B), 3. Csak a B karika (B \\ A), és 4. A karikákon kívüli terület az alaphalmazban.',
    hint: 'Számold meg: a bal holdacska, a középső lencse, a jobb holdacska és a doboz többi része!'
  },
  {
    id: 'gq2-5',
    level: 2,
    prompt: 'A = Kék lapok, B = Háromszögek. Milyen lapok kerülnek a kétkarikás Venn-diagram külső tartományába (a karikákon kívülre)?',
    options: [
      'Olyan lapok, amelyek NEM kékek ÉS NEM háromszögek (pl. piros kör)',
      'Minden kék lap',
      'Minden háromszög',
      'Csak a sárga lyukas lapok'
    ],
    correctAnswer: 0,
    explanation: 'A külső tartományba azok a lapok kerülnek, amelyek egyik halmaz feltételének sem felelnek meg: tehát nem kék színűek és nem háromszög alakúak.',
    hint: 'Ha valami sem az A, sem a B körbe nem mehet be, annak mindkét tulajdonság hiányoznia kell.'
  },
  {
    id: 'gq2-6',
    level: 2,
    prompt: 'Hány tartományra osztja a síkot egy háromkarikás Venn-diagram az alaphalmazon belül?',
    options: [
      '8 tartományra (2³ = 8)',
      '6 tartományra',
      '7 tartományra',
      '9 tartományra'
    ],
    correctAnswer: 0,
    explanation: '3 halmaz esetén a lehetséges tartományok száma 2³ = 8: 1 darab hármas metszet, 3 darab kettes metszet, 3 darab csak egy halmazhoz tartozó rész, és 1 darab külső tartomány.',
    hint: 'Gondolj a 2 hatványaira: 1 karika = 2 tartomány, 2 karika = 4 tartomány, 3 karika = ?'
  },
  {
    id: 'gq2-7',
    level: 2,
    prompt: 'A számok 1-től 20-ig terjednek. Legyen A = Páros számok, B = 5-tel osztható számok. Mely számok kerülnek a metszetbe (A ∩ B)?',
    options: [
      '{10, 20}',
      '{5, 10, 15, 20}',
      '{2, 4, 6, 8, 10}',
      '{5, 15}'
    ],
    correctAnswer: 0,
    explanation: 'A metszetbe azok a számok tartoznak, amelyek egyszerre párosak és 5-tel oszthatók (tehát 10-re végződnek). 1 és 20 között ez pontosan a 10 és a 20.',
    hint: 'Egy szám akkor páros és 5-tel osztható egyszerre, ha az utolsó számjegye 0.'
  },
  {
    id: 'gq2-8',
    level: 2,
    prompt: 'Egy 64 lapos készletben hány olyan lap van, amelyik NEM sárga ÉS NEM lyukas?',
    options: [
      '24 lap',
      '32 lap',
      '16 lap',
      '48 lap'
    ],
    correctAnswer: 0,
    explanation: 'Nem sárga színek: 3 (piros, kék, zöld). Nem lyukas: 1 (teli). Formák száma: 4. Méretek száma: 2. Összesen: 4 × 3 × 2 × 1 = 24 lap.',
    hint: 'Számold ki: 4 forma × 3 nem sárga szín × 2 méret × 1 teli állapot.'
  },
  {
    id: 'gq2-9',
    level: 2,
    prompt: 'Egy Carroll-diagramban az egyik tulajdonság a „páros / páratlan”, a másik az „egyjegyű / kétjegyű”. Hány mezőből (cellából) áll a táblázat belső adata?',
    options: [
      '4 mezőből (2 × 2 = 4)',
      '2 mezőből',
      '6 mezőből',
      '8 mezőből'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét tulajdonságnak 2 állapota van, a Carroll-diagram egy 2×2-es mátrix (4 belső cella: egyjegyű páros, egyjegyű páratlan, kétjegyű páros, kétjegyű páratlan).',
    hint: 'Két sor és két oszlop kereszteződésében hány rubrika keletkezik?'
  },
  {
    id: 'gq2-10',
    level: 2,
    prompt: 'Ha az A és B halmazoknak nincs közös elemük (metszetük az üres halmaz: A ∩ B = ∅), hogyan nevezzük őket?',
    options: [
      'Diszjunkt halmazok',
      'Egyenlő halmazok',
      'Részhalmazok',
      'Komplementer halmazok'
    ],
    correctAnswer: 0,
    explanation: 'A közös elem nélküli halmazokat diszjunkt halmazoknak nevezzük. A Venn-diagramon a két körük nem metszi egymást.',
    hint: 'Idegen eredetű kifejezés a különálló, átfedésmentes halmazokra.'
  },

  // =========================================================================
  // 3. SZINT: LOGIKAI REJTVÉNYEK, SKATULYA-ELV ÉS KÖVETKEZTETÉSEK (21-30)
  // =========================================================================
  {
    id: 'gq3-1',
    level: 3,
    prompt: 'Egy fiókban 8 piros és 8 kék zokni van. A sötétben húzunk zoknikat. Legalább hány zoknit kell kivennünk, hogy BIZTOSAN legyen köztük egy azonos színű pár?',
    options: [
      '3 zoknit',
      '2 zoknit',
      '9 zoknit',
      '5 zoknit'
    ],
    correctAnswer: 0,
    explanation: 'A Dirichlet-féle skatulya-elv alapján: mivel csak 2 szín van, ha 3 zoknit húzunk, a harmadik szükségszerűen megegyezik a korábbiak valamelyikével!',
    hint: 'Gondolj a legrosszabb esetre: az 1. piros, a 2. kék. Milyen színű lehet a 3. zokni?',
    breakdown: [
      { label: 'Színek száma', value: '2 szín (piros, kék)' },
      { label: 'Legrosszabb húzás', value: '1 piros + 1 kék (2 db)' },
      { label: 'Biztos pár', value: '2 + 1 = 3 db zokni' }
    ]
  },
  {
    id: 'gq3-2',
    level: 3,
    prompt: 'Ugyanabban a zoknis fiókban (8 piros és 8 kék zokni) hány zoknit kell kihúznunk a sötétben, hogy BIZTOSAN legyen köztük legalább egy PIROS zokni?',
    options: [
      '9 zoknit',
      '8 zoknit',
      '2 zoknit',
      '3 zoknit'
    ],
    correctAnswer: 0,
    explanation: 'A legrosszabb esetben az első 8 kihúzott zokni mind kék. Ekkor a 9. kihúzott darab már garantáltan piros lesz: 8 + 1 = 9 zokni.',
    hint: 'Mi van, ha a lehető legbalszerencsésebb vagy, és az összes kéket kihúzod először?'
  },
  {
    id: 'gq3-3',
    level: 3,
    prompt: 'A 64 lapos logikai készletből valaki gondolt egy lapra. Hány eldöntendő (igen/nem) kérdésből lehet BIZTOSAN kitalálni a lapot a legjobb felező stratégiával?',
    options: [
      '6 kérdésből (mivel 2⁶ = 64)',
      '8 kérdésből',
      '4 kérdésből',
      '16 kérdésből'
    ],
    correctAnswer: 0,
    explanation: 'Minden felező kérdés felére csökkenti a lehetőségeket: 64 → 32 → 16 → 8 → 4 → 2 → 1. Mivel 2⁶ = 64, pontosan 6 eldöntendő kérdés elegendő és szükséges.',
    hint: 'Hányszor kell elfelezni a 64-et, hogy 1 maradjon? 64 : 2 : 2 : 2...'
  },
  {
    id: 'gq3-4',
    level: 3,
    prompt: 'Egy 30 fős osztályban mindenki tanul nyelvet. 20-an tanulnak angolul és 15-en németül. Hányan tanulják mindkét nyelvet?',
    options: [
      '5 tanuló',
      '10 tanuló',
      '15 tanuló',
      '25 tanuló'
    ],
    correctAnswer: 0,
    explanation: 'A két csoport összege 20 + 15 = 35. Mivel csak 30 tanuló van és nincs olyan, aki ne tanulna nyelvet, 35 − 30 = 5 tanulót kétszer számoltunk, ők tanulják mindkét nyelvet.',
    hint: 'Add össze a két csoportot, és vond ki az osztálylétszámot!',
    breakdown: [
      { label: 'Angol + Német', value: '20 + 15 = 35' },
      { label: 'Osztálylétszám', value: '30 fő' },
      { label: 'Mindkét nyelv', value: '35 − 30 = 5 fő' }
    ]
  },
  {
    id: 'gq3-5',
    level: 3,
    prompt: 'Három barát – Aladár, Béla és Csaba – közül az egyik mindig hazudik, kettő mindig igazat mond. Aladár azt mondja: „Béla hazudik.” Béla azt mondja: „Csaba hazudik.” Ki a hazug?',
    options: [
      'Béla a hazug',
      'Aladár a hazug',
      'Csaba a hazug',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Ha Béla mondana igazat, akkor Aladár hazudna (mert azt mondta, Béla hazudik) ÉS Csaba is hazudna (mert Béla szerint Csaba hazudik). Ez 2 hazugot jelentene, ami ellentmondás! Így Béla a hazug, Aladár és Csaba pedig igazat mondanak.',
    hint: 'Tedd fel, hogy Béla igazat mond! Hány hazug lenne ebben az esetben?'
  },
  {
    id: 'gq3-6',
    level: 3,
    prompt: 'Lap1 = „Nagy, piros, teli kör”, Lap2 = „Kicsi, kék, lyukas négyzet”. Hány tulajdonságban különböznek egymástól?',
    options: [
      'Mind a 4 tulajdonságban (teljes ellentétpár)',
      '3 tulajdonságban',
      '2 tulajdonságban',
      '1 tulajdonságban'
    ],
    correctAnswer: 0,
    explanation: 'Forma: kör ≠ négyzet; Szín: piros ≠ kék; Méret: nagy ≠ kicsi; Lyukasság: teli ≠ lyukas. Mind a 4 tulajdonságuk eltér, tehát 4 különbség van köztük.',
    hint: 'Nézd meg egyesével: van köztük akár egyetlen közös tulajdonság is?'
  },
  {
    id: 'gq3-7',
    level: 3,
    prompt: 'Egy tálban 5 alma és 7 narancs van. Legalább hány gyümölcsöt kell csukott szemmel kivennünk, hogy BIZTOSAN legyen köztük legalább 2 darab narancs?',
    options: [
      '7 gyümölcsöt',
      '6 gyümölcsöt',
      '2 gyümölcsöt',
      '8 gyümölcsöt'
    ],
    correctAnswer: 0,
    explanation: 'A legrosszabb esetben először kihúzzuk mind az 5 almát. Ezután még 2 gyümölcsöt kell húznunk, amelyek már biztosan narancsok lesznek: 5 + 2 = 7 gyümölcs.',
    hint: 'Mi van, ha először az összes almát kihúzod?'
  },
  {
    id: 'gq3-8',
    level: 3,
    prompt: 'Ha egy halmaznak 4 eleme van, hány különböző részhalmaza van összesen (beleértve az üres halmazt és önmagát is)?',
    options: [
      '16 részhalmaz (2⁴ = 16)',
      '8 részhalmaz',
      '4 részhalmaz',
      '12 részhalmaz'
    ],
    correctAnswer: 0,
    explanation: 'Minden egyes elemről két döntés hozható: benne van a részhalmazban vagy nincs (2 lehetőség). 4 elem esetén: 2 × 2 × 2 × 2 = 2⁴ = 16 részhalmaz képezhető.',
    hint: 'Egy n elemű halmaz részhalmazainak száma 2ⁿ.'
  },
  {
    id: 'gq3-9',
    level: 3,
    prompt: 'Egy kerek asztal körül ül 4 gyerek: Anna, Bea, Cili és Dénes. Anna Dénes jobb oldalán ül, Bea Dénessel szemben ül. Ki ül Anna jobb oldalán?',
    options: [
      'Bea',
      'Cili',
      'Dénes',
      'Nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Dénest alapul véve: vele szemben Bea ül, tőle jobbra Anna ül, tőle balra Cili ül. Ha Annára nézünk az asztal felől, az ő jobb oldalán Bea ül.',
    hint: 'Rajzold le egy kör alakú asztalhoz az elhelyezkedésüket!'
  },
  {
    id: 'gq3-10',
    level: 3,
    prompt: 'Lehet-e egy természetes szám egyszerre prímszám és 4-gyel osztható szám?',
    options: [
      'Nem, a metszetük üres halmaz (∅)',
      'Igen, a 4 ilyen szám',
      'Igen, a 2 ilyen szám',
      'Végtelen sok ilyen szám van'
    ],
    correctAnswer: 0,
    explanation: 'A 4-gyel osztható számok oszthatók 1-gyel, 2-vel, 4-gyel és önmagukkal, tehát legalább 3 osztójuk van (összetett számok). Egyetlen prímszám sem osztható 4-gyel, így a metszet üres halmaz.',
    hint: 'Hány osztója van egy prímszámnak, és hány osztója van egy 4-gyel osztható számnak?'
  }
];

export const LogicGamesQuiz: React.FC<LogicGamesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="1. Játékok és Logikai Feladványok Kvíz"
      subtitle="30 feladat 3 szinten: logikai készlet, Venn- és Carroll-diagramok, halmazműveletek és gondolkodási feladványok"
      questions={LOGIC_GAMES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-logic-games-quiz"
      storageKey="g5-logic-games-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <LogicGamesMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <LogicGamesSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">1. Szint Puskája: Alapfogalmak és Készlet</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Logikai készlet:</strong> 4 forma × 4 szín × 2 méret × 2 lyukasság = <strong>64 lap</strong>.</div>
              <div>• <strong>Formák (4):</strong> Kör, négyzet, háromszög, téglalap.</div>
              <div>• <strong>Színek (4):</strong> Piros, sárga, kék, zöld.</div>
              <div>• <strong>Metszet (A ∩ B):</strong> Mindkét halmazban benne van (ÉS kapcsolat).</div>
              <div>• <strong>Unió (A ∪ B):</strong> Legalább az egyik halmazban benne van (VAGY kapcsolat).</div>
              <div>• <strong>Üres halmaz (∅):</strong> Egyetlen eleme sincs.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">2. Szint Puskája: Venn- és Carroll-diagramok</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>2 karikás Venn-diagram:</strong> 4 tartomány (Csak A, Metszet, Csak B, Külső rész).</div>
              <div>• <strong>Unió elemszáma:</strong> |A ∪ B| = |A| + |B| − |A ∩ B| (a metszetet nem számoljuk kétszer!).</div>
              <div>• <strong>Diszjunkt halmazok:</strong> Metszetük üres (nincs közös elemük).</div>
              <div>• <strong>Carroll-diagram:</strong> 2 tulajdonság szerinti 2×2-es elrendező táblázat.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-purple-700 dark:text-purple-400">3. Szint Puskája: Logika és Skatulya-elv</div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
              <div>• <strong>Dirichlet-féle skatulya-elv:</strong> Két szín esetén 3 húzás már biztosan ad egy párt.</div>
              <div>• <strong>Garantált adott szín:</strong> Vond ki az összes többi színt, majd adj hozzá annyit, amennyi kell!</div>
              <div>• <strong>Felező stratégia:</strong> 64 lehetőség felezésével pontosan 6 kérdés elég (2⁶ = 64).</div>
              <div>• <strong>Részhalmazok száma:</strong> Egy n elemű halmaznak pontosan 2ⁿ darab részhalmaza van.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
