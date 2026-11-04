import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ConstructionMatcher } from './ConstructionMatcher';
import { ConstructionSorter } from './ConstructionSorter';
import {
  SegmentBisectorSvg,
  AngleBisectorSvg,
  ConstructibleAnglesSvg
} from './ConstructionFigures';
import { Compass, Ruler, Sparkles, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ConstructionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapszerkesztések Eszközei és Szakaszfelezés (Könnyű)',
    subtitle: 'Körző és vonalzó, szakaszfelező merőleges, szögfelező és 60°-os alapszög.',
    range: '1 - 10. feladat',
    focus: 'Euklideszi alapszerkesztések elmélete',
    questions: [
      {
        id: 'cq1-1',
        questionTypeBadge: 'Euklideszi Eszközök',
        question: 'Melyik két eszközt engedélyezi a klasszikus geometriai (euklideszi) szerkesztés?',
        options: [
          'Egyélű (beosztás nélküli) vonalzót és körzőt',
          'Szögmérőt és milliméteres vonalzót',
          'Csak körzőt és számológépet',
          'Derékszögű vonalzót és szögmérőt'
        ],
        correctAnswer: 0,
        hint: 'A klasszikus szerkesztésben tilos a centiméterek és fokok közvetlen leolvasása.',
        explanation: 'Az euklideszi szerkesztés szabályai szerint csak egyenesek húzására alkalmas egyélű vonalzót és távolságok másolására alkalmas körzőt szabad használni.'
      },
      {
        id: 'cq1-2',
        questionTypeBadge: 'Szakaszfelező Merőleges',
        question: 'Mi a szakaszfelező merőleges szabatos definíciója mértani helyként?',
        figure: <SegmentBisectorSvg size={220} />,
        options: [
          'A sík azon pontjainak halmaza, amelyek egyenlő távol vannak a szakasz két végpontjától',
          'A szakasz végpontjaira állított két párhuzamos egyenes',
          'A szakasz egyharmadában állított merőleges',
          'A szakasz hosszával egyenlő sugarú kör'
        ],
        correctAnswer: 0,
        hint: '|PA| = |PB| minden P pontra az egyenesen.',
        explanation: 'A szakaszfelező merőleges a sík azon pontjainak mértani helye, amelyek az A és B végpontoktól egyenlő távolságra vannak: |PA| = |PB|.'
      },
      {
        id: 'cq1-3',
        questionTypeBadge: 'Körzőnyílás Szakaszfelezésnél',
        question: 'Mekkora R körzőnyílást kell beállítani a szakasz végpontjaiból húzott körívekhez szakaszfelezéskor?',
        options: [
          'Nagyobbat, mint a szakasz fele (R > AB / 2)',
          'Pontosan a szakasz negyedét',
          'Kisebbet, mint a szakasz fele',
          'Bármilyen kicsi sugarat'
        ],
        correctAnswer: 0,
        hint: 'Ha a sugár túl kicsi, a két körív nem fogja metszeni egymást.',
        explanation: 'A két körív csak akkor metszi egymást két pontban a szakasz két oldalán, ha a sugár szigorúan nagyobb a szakasz felénél: R > AB / 2.'
      },
      {
        id: 'cq1-4',
        questionTypeBadge: 'Szögfelező Mértani Helye',
        question: 'Mely pontok alkotják egy szög szögfelezőjét a síkban?',
        figure: <AngleBisectorSvg size={220} />,
        options: [
          'A szögtartomány azon pontjai, amelyek egyenlő távol vannak a szög két szárától',
          'A csúcsból induló tetszőleges félegyenes pontjai',
          'A szög szárait összekötő legrövidebb szakasz',
          'A szög csúcsára merőleges egyenes pontjai'
        ],
        correctAnswer: 0,
        hint: 'd(P, e) = d(P, f) minden P pontra.',
        explanation: 'A szögfelező a szögtartomány azon pontjainak mértani helye, amelyek a szög két szárától egyenlő távolságra helyezkednek el: d(P, e) = d(P, f).'
      },
      {
        id: 'cq1-5',
        questionTypeBadge: '60°-os Szög Alapja',
        question: 'Milyen alakzat szerkesztésén alapul a 60°-os szög előállítása körzővel?',
        figure: <ConstructibleAnglesSvg size={220} />,
        options: [
          'Szabályos (egyenlő oldalú) háromszögön',
          'Négyzeten',
          'Derékszögű háromszögön',
          'Kör területének negyedelésén'
        ],
        correctAnswer: 0,
        hint: 'A szabályos háromszög minden szöge 60°-os, oldalai mind egyenlők a felvett sugárral.',
        explanation: 'Ha egy félegyenes kezdőpontjából R sugárral ívet húzunk, majd a metszéspontból változatlan R sugárral elmetsszük az ívet, szabályos háromszöget kapunk, melynek szöge 60°.'
      },
      {
        id: 'cq1-6',
        questionTypeBadge: '30°-os Szög Szerkesztése',
        question: 'Hogyan állítható elő a 30°-os szög tisztán szerkesztéssel?',
        options: [
          'A megszerkesztett 60°-os szög szögfelezésével',
          'Egy derékszög harmadolásával szögmérővel',
          'Két 15°-os szög felmérésével vonalzóval',
          'Nem szerkeszthető meg'
        ],
        correctAnswer: 0,
        hint: '60° / 2 = 30°.',
        explanation: 'A 60°-os szabályos alapszög megszerkesztése után annak szögfelezőjét megrajzolva pontosan 30°-os szöget kapunk.'
      },
      {
        id: 'cq1-7',
        questionTypeBadge: '90°-os Szög Szerkesztése',
        question: 'Melyik módszerrel szerkeszthető meg a 90°-os derékszög?',
        options: [
          'Egyenesszög (180°) felezésével vagy egyenes adott pontjában állított merőlegessel',
          'Szabályos háromszög oldalának másolásával',
          'Csak derékszögű vonalzó ráillesztésével',
          'Három 30°-os szakasz összeadásával'
        ],
        correctAnswer: 0,
        hint: 'A szakaszfelező merőleges pontosan 90°-os szöget zár be a szakasszal.',
        explanation: 'A 180°-os egyenesszög felezése, vagy az egyenes adott pontjára állított merőleges (szakaszfelező merőleges technikával) 90°-os derékszöget hoz létre.'
      },
      {
        id: 'cq1-8',
        questionTypeBadge: '45°-os Szög Előállítása',
        question: 'Hogyan kapunk 45°-os szöget euklideszi szerkesztéssel?',
        options: [
          'A megszerkesztett 90°-os derékszög szögfelezésével',
          'A 60°-os szög harmadolásával',
          'Körzővel nem szerkeszthető',
          'Egy szabályos ötszög szögéből'
        ],
        correctAnswer: 0,
        hint: '90° / 2 = 45°.',
        explanation: 'A 90°-os derékszög szögfelezőjének megrajzolásával pontosan 45°-os szöget kapunk.'
      },
      {
        id: 'cq1-9',
        questionTypeBadge: 'Szakaszmásolás',
        question: 'Hogyan másolunk át egy megadott AB szakaszt egy másik félegyenesre euklideszi módon?',
        options: [
          'A körző nyílásába vesszük az AB távolságot, és az új kezdőpontból körívet metszünk a félegyenesre',
          'Vonalzóval lemérjük a millimétereket és átjelöljük',
          'Papírlap szélével átrajzoljuk',
          'Két merőleges állításával'
        ],
        correctAnswer: 0,
        hint: 'A körző feladata a távolságok pontos, hibátlan átvitele.',
        explanation: 'A szakasz két végpontja közé nyitott körzővel felvesszük a távolságot, majd ezt a sugarat a célfélegyenes kezdőpontjából rámetszük a félegyenesre.'
      },
      {
        id: 'cq1-10',
        questionTypeBadge: 'Párhuzamos Egyenes Szerkesztése',
        question: 'Melyik geometriai tételen alapul a párhuzamos egyenes szerkesztése egy adott ponton keresztül?',
        options: [
          'A váltószögek (vagy egyállású szögek) egyenlőségén',
          'A Pitagorasz-tételen',
          'A magasságtételen',
          'A kerületi és középponti szögek tételén'
        ],
        correctAnswer: 0,
        hint: 'Ha egy metsző egyenessel bezárt szög megegyezik a két egyenesnél, akkor azok párhuzamosak.',
        explanation: 'Egy metsző egyenest húzva, a keletkezett szöget átmásoljuk a megadott pontba váltószögként; mivel a váltószögek egyenlők, az új egyenes párhuzamos lesz az eredetivel.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Nevezetes Szögek és Háromszögek Alapesetei (Közepes)',
    subtitle: '75°, 105°, 120° szerkesztése, háromszög-egyenlőtlenség és a szerkesztés 4 fázisa.',
    range: '11 - 20. feladat',
    focus: 'Összetett alapszerkesztések és háromszögek felépítése',
    questions: [
      {
        id: 'cq2-1',
        questionTypeBadge: '75°-os Szög',
        question: 'Mely két alapszög összegéből (vagy kivonásából) szerkeszthető meg a 75°-os szög?',
        figure: <ConstructibleAnglesSvg size={220} />,
        options: ['45° + 30° (vagy 60° + 15°)', '50° + 25°', '90° − 20°', '2 · 37,5°'],
        correctAnswer: 0,
        hint: 'Mind a 45°, mind a 30° alapszerkesztéssel előállítható, ezeket egymás mellé másolva kapjuk a 75°-ot.',
        explanation: 'A 75° megszerkeszthető 45° és 30° összegeként, vagy a 60° és 15° összegeként, mivel mindegyik komponens megszerkeszthető.'
      },
      {
        id: 'cq2-2',
        questionTypeBadge: '15°-os Szög',
        question: 'Hogyan szerkeszthető meg a 15°-os szög a legegyszerűbben?',
        options: [
          'A 30°-os szög szögfelezésével (vagy 60° − 45° különbségével)',
          'A 45°-os szög harmadolásával',
          'Körzővel nem szerkeszthető',
          'Egy derékszög hatodolásával'
        ],
        correctAnswer: 0,
        hint: '30° / 2 = 15°.',
        explanation: 'A 30°-os szög (ami a 60° felezése) újabb szögfelezésével pontosan 15°-os szöget kapunk.'
      },
      {
        id: 'cq2-3',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Megszerkeszthető-e olyan háromszög, amelynek oldalai a = 3 cm, b = 4 cm és c = 8 cm?',
        options: [
          'Nem, mert a + b < c (3 + 4 = 7 < 8, a körívek nem metszik egymást)',
          'Igen, bármely három számból lehet háromszöget szerkeszteni',
          'Igen, tompaszögű háromszög lesz',
          'Csak akkor, ha az egyik szög 90°'
        ],
        correctAnswer: 0,
        hint: 'A két rövidebb oldal összegének szigorúan nagyobbnak kell lennie a leghosszabbnál.',
        explanation: 'A háromszög-egyenlőtlenség szerint a + b > c kellene legyen, de 3 + 4 = 7 < 8. A két végpontból húzott 3 és 4 cm sugarú körívek el sem érik egymást, nincs metszéspont.'
      },
      {
        id: 'cq2-4',
        questionTypeBadge: '105°-os Szög',
        question: 'Melyik felbontás alkalmas a 105°-os szög megszerkesztésére?',
        options: ['60° + 45° (vagy 90° + 15°)', '70° + 35°', '180° − 65°', '3 · 35°'],
        correctAnswer: 0,
        hint: '60° és 45° is alapszerkesztés.',
        explanation: 'A 105° megszerkeszthető 60° és 45° egymás mellé másolásával, vagy 90° és 15° összegeként.'
      },
      {
        id: 'cq2-5',
        questionTypeBadge: '120°-os Szög',
        question: 'Hogyan állítható elő a 120°-os tompaszög körzővel és vonalzóval?',
        options: [
          'Két 60°-os szög egymás mellé másolásával (vagy 180° − 60° kiegészítő szögként)',
          'A 90°-os szög másfélszerezésével',
          'Csak szögmérővel',
          'Négy 30°-os szög összemérésével szögmérővel'
        ],
        correctAnswer: 0,
        hint: '60° + 60° = 120°.',
        explanation: 'Két 60°-os szög egymás mellé helyezésével, vagy az egyenesszögből (180°) 60°-ot levonva 120°-os szöget kapunk.'
      },
      {
        id: 'cq2-6',
        questionTypeBadge: 'Merőleges Külső Pontból',
        question: 'Hogyan bocsátunk merőlegest egy adott P külső pontból egy e egyenesre?',
        options: [
          'P-ből körívet húzunk, amely két pontban metszi e-t, majd ennek a szakasznak a felezőmerőlegesét szerkesztjük',
          'P-ből szemre húzunk egy egyenest a vonalzóval',
          'A vonalzó derékszögű sarkát P-hez illesztjük',
          'Külső pontból nem szerkeszthető merőleges'
        ],
        correctAnswer: 0,
        hint: 'A két metszésponttól P egyenlő távol van, így a szakaszfelező merőlegesen fekszik.',
        explanation: 'P-ből tetszőleges, elég nagy sugárral elmetsszük az egyenest (A és B pontok). P rajta van az AB szakasz felezőmerőlegesén, így annak megszerkesztése adja a merőlegest.'
      },
      {
        id: 'cq2-7',
        questionTypeBadge: 'A Szerkesztés 4 Lépése',
        question: 'Melyik a szerkesztési feladat megoldásának helyes, hivatalos lépéssorrendje?',
        options: [
          '1. Elemzés (vázlat) → 2. Szerkesztés menete → 3. Bizonyítás → 4. Diszkusszió',
          '1. Rajzolás → 2. Mérés → 3. Számolás → 4. Ellenőrzés',
          '1. Diszkusszió → 2. Elemzés → 3. Rajz → 4. Tétel',
          '1. Képlet → 2. Szögmérés → 3. Rajz → 4. Bizonyítás'
        ],
        correctAnswer: 0,
        hint: 'Először megértjük a feladatot vázlattal, leírjuk a lépéseket, igazoljuk a helyességét, végül megvitatjuk a megoldások számát.',
        explanation: 'A klasszikus szerkesztés 4 lépése: Elemzés (vázlatkészítés), Szerkesztés menete, Bizonyítás és Diszkusszió (hány megoldás létezik az adatoktól függően).'
      },
      {
        id: 'cq2-8',
        questionTypeBadge: 'Köré Írt Kör Középpontja',
        question: 'Egy háromszög mely nevezetes vonalainak metszéspontja adja a köré írható kör középpontját?',
        options: [
          'Az oldalfelező merőlegesek metszéspontja',
          'A belső szögfelezők metszéspontja',
          'A súlyvonalak metszéspontja',
          'A magasságvonalak metszéspontja'
        ],
        correctAnswer: 0,
        hint: 'A köré írt kör középpontja mindhárom csúcstól egyenlő távol van (OA = OB = OC).',
        explanation: 'Mivel a középpontnak mindhárom csúcstól egyenlő távol kell lennie, az oldalfelező merőlegesek metszéspontjában található.'
      },
      {
        id: 'cq2-9',
        questionTypeBadge: 'Beírt Kör Középpontja',
        question: 'Mely nevezetes vonalak metszéspontja határozza meg a háromszög beírt körének középpontját?',
        options: [
          'A belső szögfelezők metszéspontja',
          'Az oldalfelező merőlegesek metszéspontja',
          'A magasságvonalak metszéspontja',
          'A súlyvonalak metszéspontja'
        ],
        correctAnswer: 0,
        hint: 'A beírt kör középpontja mindhárom oldaltól egyenlő távol van.',
        explanation: 'A beírt kör középpontja mindhárom oldaltól egyenlő távolságra van (sugarak), ezért a belső szögfelezők metszéspontja adja meg.'
      },
      {
        id: 'cq2-10',
        questionTypeBadge: 'Két Oldal és Közbezárt Szög',
        question: 'Hány nem egybevágó háromszög szerkeszthető, ha adott két oldal hossza és a közbezárt szög (oszó eset)?',
        options: ['Pontosan 1 megoldás', '2 megoldás', 'Végtelen sok', '0 megoldás'],
        correctAnswer: 0,
        hint: 'Ez az egyik alapvető háromszög-egybevágósági alapeset.',
        explanation: 'Két oldal és a közbezárt szög (oszó) a háromszöget egyértelműen meghatározza az egybevágóság erejéig, így pontosan 1 megoldás van.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Szerkesztések és Megoldhatósági Diszkussziók (Nehéz)',
    subtitle: 'Körhöz húzott érintők (Thalész-tétel), arányos szakaszosztás és lehetetlen szerkesztések.',
    range: '21 - 30. feladat',
    focus: 'Haladó szerkesztési tételek és geometriai diszkussziók',
    questions: [
      {
        id: 'cq3-1',
        questionTypeBadge: 'Lehetetlen Szerkesztés',
        question: 'Melyik feladat BIZONYÍTOTTAN LEHETETLEN pusztán euklideszi körzővel és vonalzóval?',
        options: [
          'Egy tetszőleges szög harmadolása (pl. a 60°-os szög harmadolása 20°-ra)',
          'Egy szakasz felezése',
          'A 45°-os szög megszerkesztése',
          'Egy szögfelező megrajzolása'
        ],
        correctAnswer: 0,
        hint: 'Az ókori görögök három híres megoldhatatlan problémájának egyike.',
        explanation: 'A tetszőleges szög harmadolása (szögharmadolás), a kör négyszögesítése és a kockakettőzés algebrailag bizonyítottan lehetetlen euklideszi körzővel és vonalzóval.'
      },
      {
        id: 'cq3-2',
        questionTypeBadge: 'Két Oldal és Szög Diszkusszió',
        question: 'Adott két oldal (a és b, ahol a < b) és az a oldallal (a kisebbikkel) szemközti α szög. Hány megoldása lehet a szerkesztésnek az adatoktól függően?',
        options: [
          '0, 1 vagy 2 megoldás lehetséges',
          'Mindig pontosan 1 megoldás van',
          'Mindig 3 megoldás van',
          'Végtelen sok megoldás van'
        ],
        correctAnswer: 0,
        hint: 'A körív nem éri el az egyenest (0), érinti azt (1 derékszögű), vagy két pontban metszi (2 különböző háromszög).',
        explanation: 'Ha az adott szög a kisebbik oldallal szemben van, a körív metszéspontjainak száma szerint 0 (nem éri el), 1 (érinti) vagy 2 megoldás keletkezhet.'
      },
      {
        id: 'cq3-3',
        questionTypeBadge: 'Érintő Külső Pontból',
        question: 'Milyen geometriai tétel segítségével szerkeszthető meg egy körhöz külső P pontból húzott érintő?',
        options: [
          'A Thalész-tétellel (az OP szakasz mint átmérő fölé rajzolt körrel)',
          'A Pitagorasz-tétellel vonalzóval',
          'A súlypont tétellel',
          'Csak érintővonalzóval'
        ],
        correctAnswer: 0,
        hint: 'Az érintési pontban a sugár merőleges az érintőre, vagyis derékszög keletkezik az OP átfogón.',
        explanation: 'Mivel az érintési pontban a sugár merőleges az érintőre (derékszög), az OP szakasz felezőpontja körüli Thalész-kör metszi ki a körből a két érintési pontot.'
      },
      {
        id: 'cq3-4',
        questionTypeBadge: 'Arányos Szakaszosztás',
        question: 'Hogyan osztható fel egy AB szakasz 2 : 3 arányban körzővel és vonalzóval?',
        options: [
          'Egy A-ból induló segédfélegyenesen 2 + 3 = 5 egyenlő egységet mérünk fel, majd párhuzamos szelőkkel vetítjük',
          'A szakasz hosszát elosztjuk 5-tel számológépen és lemérjük',
          'Csak szemre becsülhető meg',
          'Kétszer elfelezzük a szakaszt'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamos szelők tétele garantálja az arányok pontos átvitelét.',
        explanation: 'Segédfélegyenest indítunk, arra 5 azonos körzőnyílást mérünk fel. Az 5. pontot összekötjük B-vel, majd a 2. ponton át ezzel párhuzamost húzunk (párhuzamos szelők tétele).'
      },
      {
        id: 'cq3-5',
        questionTypeBadge: 'Paralelogramma Független Adatai',
        question: 'Minimálisan hány független adatra van szükség egy paralelogramma egyértelmű megszerkesztéséhez?',
        options: ['3 független adatra (pl. 2 szomszédos oldal és a közbezárt szög)', '2 adatra', '4 adatra', '5 adatra'],
        correctAnswer: 0,
        hint: 'A szemközti oldalak egyenlők és párhuzamosak, így kevesebb adat kell, mint egy általános négyszöghöz (5 helyett).',
        explanation: 'Egy általános négyszöghöz 5 adat kell, de a paralelogramma szimmetriája (párhuzamos, egyenlő szemközti oldalak) miatt 3 független adat elegendő (pl. a, b és α).'
      },
      {
        id: 'cq3-6',
        questionTypeBadge: 'Rombusz Szerkesztése Átlókból',
        question: 'Egy rombusz két átlója e = 6 cm és f = 8 cm. Hogyan szerkeszthető meg a rombusz?',
        options: [
          'Az e szakasz felezőmerőlegesére mindkét irányba felmérünk f/2 = 4 cm-t',
          'Egy 6 cm-es és 8 cm-es oldalt 60°-ban összekötünk',
          'Csak akkor, ha adott a kerülete is',
          'Egy derékszögű háromszög köré írt körével'
        ],
        correctAnswer: 0,
        hint: 'A rombusz átlói merőlegesen felezik egymást.',
        explanation: 'Mivel a rombusz átlói merőlegesek és felezik egymást, felvesszük az e szakaszt, megrajzoljuk a felezőmerőlegesét, és a felezőpontból felmérjük f/2 = 4 cm-t mindkét irányba.'
      },
      {
        id: 'cq3-7',
        questionTypeBadge: 'Deltoid Átlói',
        question: 'Melyik tulajdonság teszi lehetővé a deltoid szerkesztését a két átlójából és az egyik oldalából?',
        options: [
          'A szimmetriaátló merőlegesen felezi a másik átlót',
          'Mindkét átló felezi egymást',
          'Az átlók mindig egyenlő hosszúak',
          'A deltoidnak nincsenek merőleges átlói'
        ],
        correctAnswer: 0,
        hint: 'A deltoid átlói merőlegesek, de csak az egyik felezi a másikat.',
        explanation: 'A deltoidban a szimmetriaátló merőlegesen felezi a másik átlót, így az átlók metszéspontja és az oldalhossz körívével a csúcsok pontosan kimetszhetők.'
      },
      {
        id: 'cq3-8',
        questionTypeBadge: 'Magasságpont Szerkesztése',
        question: 'Hol található egy tompaszögű háromszög magasságpontja (a magasságvonalak metszéspontja)?',
        options: [
          'A háromszögön kívül, a tompaszög csúcsa mögött',
          'Mindig a háromszög belsejében',
          'Pontosan az egyik oldal felezőpontján',
          'A tompaszög csúcsában'
        ],
        correctAnswer: 0,
        hint: 'Tompaszögű háromszögnél két magasságvonal az oldalak meghosszabbítására esik.',
        explanation: 'Tompaszögű háromszög esetén a magasságvonalak a háromszögön kívül metszik egymást, a tompaszöggel szemközti tartományban.'
      },
      {
        id: 'cq3-9',
        questionTypeBadge: 'Súlypont Tulajdonsága',
        question: 'Milyen arányban osztja a háromszög súlypontja a súlyvonalakat?',
        options: [
          '2 : 1 arányban a csúcstól távolodva',
          '1 : 1 arányban (felezi)',
          '3 : 1 arányban',
          '1 : 2 arányban a csúcstól'
        ],
        correctAnswer: 0,
        hint: 'A csúcs felőli rész a hosszabb: a súlyvonal 2/3 része esik a csúcs felé.',
        explanation: 'A háromszög súlypontja minden súlyvonalat 2 : 1 arányban oszt két részre úgy, hogy a hosszabb szakasz (2 rész) a csúcs felé esik.'
      },
      {
        id: 'cq3-10',
        questionTypeBadge: 'Húrnégyszög Köré Írt Köre',
        question: 'Mikor szerkeszthető egy négyszög köré kör (mikor húrnégyszög)?',
        options: [
          'Akkor és csak akkor, ha szemközti szögeinek összege 180°',
          'Minden négyszög köré írható kör',
          'Csak ha minden oldala egyenlő',
          'Ha az átlói merőlegesek'
        ],
        correctAnswer: 0,
        hint: 'α + γ = β + δ = 180° a húrnégyszögek alaptétele.',
        explanation: 'Egy négyszög akkor és csak akkor húrnégyszög (írható köré kör), ha a szemközti belső szögeinek összege 180°: α + γ = β + δ = 180°.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Euklideszi alapszerkesztések',
    badge: 'Mértani helyek',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Körző és egyélű vonalzó.',
    formula: 'Szakaszfelező: |PA| = |PB|\nSzögfelező: d(P, e) = d(P, f)',
    note: 'Szakaszfelezésnél a körzőnyílás R > AB/2 kell legyen mindkét végpontból.',
    icon: <Compass className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Nevezetes szerkeszthető szögek',
    badge: 'Szögek',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'A 15° minden többszöröse megszerkeszthető:',
    formula: '60° (szabályos 3-szög) ⟹ 30° ⟹ 15°\n90° (merőleges) ⟹ 45° ⟹ 22,5°\n75° = 60°+15° • 105° = 90°+15° • 120° = 2·60°',
    note: '20° nem szerkeszthető (szögharmadolás lehetetlensége)!',
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'A szerkesztés 4 fázisa',
    badge: 'Módszertan',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'A geometriai feladat hivatalos felépítése:',
    formula: '1. Elemzés (vázlat)\n2. Szerkesztés menete\n3. Bizonyítás\n4. Diszkusszió (megoldások száma)',
    note: 'A vázlat és a lépések leírása dolgozatban kötelező!',
    icon: <Layers className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Háromszög nevezetes pontjai',
    badge: 'Tételek',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Nevezetes vonalak metszéspontjai:',
    formula: 'Köré írt kör: oldalfelező merőlegesek\nBeírt kör: belső szögfelezők\nSúlypont: súlyvonalak (2 : 1 arány)\nMagasságpont: magasságvonalak',
    note: 'Körhöz külső pontból érintő: Thalész-tétellel!',
    icon: <Ruler className="w-5 h-5 text-amber-600" />
  }
];

export const ConstructionQuiz: React.FC<ConstructionQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="4. Szerkesztések kvíz"
      subtitle="Teszteld tudásodat az euklideszi szerkesztésekből: szakaszfelező merőleges, nevezetes szögek és sokszögek felépítése!"
      topicId="g9-trans-szerkesztes"
      topicTitle="4. Szerkesztések"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <ConstructionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ConstructionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

