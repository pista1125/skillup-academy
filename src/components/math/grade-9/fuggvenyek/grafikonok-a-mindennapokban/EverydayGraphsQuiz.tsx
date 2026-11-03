import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { EverydayGraphsMatcher } from './EverydayGraphsMatcher';
import { EverydayGraphsSorter } from './EverydayGraphsSorter';
import {
  DistanceTimeSvg,
  SpeedTimeAreaSvg,
  HeartRateOrWeatherSvg
} from './EverydayGraphsFigures';
import { Car, Clock, HeartPulse, TrendingUp } from 'lucide-react';

interface EverydayGraphsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Mindennapi Grafikonok (Könnyű)',
    subtitle: 'Út-idő grafikonok, pihenők és hőmérséklet-ingadozások egyszerű leolvasása.',
    range: '1 - 10. feladat',
    focus: 'Grafikonolvasás és Értelmezés',
    questions: [
      {
        id: 'eq1-1',
        questionTypeBadge: 'Út-idő Álló Helyzet',
        question: 'Egy kerékpáros távolság-idő grafikonján a vonal t = 1,5 és t = 2,5 óra között vízszintes egyenes. Mit csinált a kerékpáros ebben az 1 órában?',
        figure: <DistanceTimeSvg size={240} />,
        options: ['Pihent, egy helyben állt', 'Egyenletesen gyorsított', 'Visszafordult hazafelé', 'Hegyre tekert felfelé'],
        correctAnswer: 0,
        hint: 'A kiindulóponttól mért távolsága változatlanul 60 km maradt.',
        explanation: 'A távolság-idő grafikonon a vízszintes szakasz álló helyzetet jelent: a megtett távolság nem nő (sebesség = 0).'
      },
      {
        id: 'eq1-2',
        questionTypeBadge: 'Sebesség Meghatározása',
        question: 'Egy autó 2 óra alatt egyenletesen 140 km-t tett meg. Mekkora volt a sebessége?',
        options: ['70 km/h', '140 km/h', '60 km/h', '280 km/h'],
        correctAnswer: 0,
        hint: 'v = s / t = 140 / 2.',
        explanation: 'v = 140 km / 2 h = 70 km/h.'
      },
      {
        id: 'eq1-3',
        questionTypeBadge: 'Hőmérsékleti Szélsőérték',
        question: 'Egy napi hőmérséklet-grafikonon a hajnali mélypont 6 °C, a kora délutáni csúcsérték 24 °C. Mennyi a napi hőingadozás (terjedelem)?',
        options: ['18 °C', '30 °C', '15 °C', '12 °C'],
        correctAnswer: 0,
        hint: 'Napi ingadozás = Maximum - Minimum = 24 - 6.',
        explanation: 'Terjedelem = 24 °C - 6 °C = 18 °C.'
      },
      {
        id: 'eq1-4',
        questionTypeBadge: 'Két Jármű Találkozása',
        question: 'Mit jelent két jármű út-idő grafikonjának metszéspontja?',
        figure: <DistanceTimeSvg size={240} />,
        options: ['A találkozás pontos helyét és idejét', 'Hogy a járművek összeütköztek', 'Hogy mindkettő megállt', 'A két jármű végcélját'],
        correctAnswer: 0,
        hint: 'A metszéspontban mindkét járműnél megegyezik a távolság és az idő koordinátája.',
        explanation: 'A metszéspont azt mutatja meg, mikor és a pálya melyik kilométerénél haladnak el egymás mellett (találkoznak).'
      },
      {
        id: 'eq1-5',
        questionTypeBadge: 'Pulzusgörbe Elemzése',
        question: 'Egy futó pulzusa a bemelegítés után 110 bpm-ről sprinteléskor 165 bpm-re ugrik. Mit jelent ez a szív munkájára nézve?',
        figure: <HeartRateOrWeatherSvg size={240} />,
        options: ['Fokozott terhelés, intenzív oxigénfelvétel', 'Teljes nyugalmi állapot', 'Kihűlés', 'Alvási fázis'],
        correctAnswer: 0,
        hint: 'A megterhelő mozgás megemeli a szívverések percenkénti számát.',
        explanation: 'A magas pulzusérték (165 bpm) intenzív fizikai terhelést és megnövekedett oxigénigényt jelez.'
      },
      {
        id: 'eq1-6',
        questionTypeBadge: 'Meredekebb Szakasz',
        question: 'Egy gyalogos út-idő grafikonján az 1. szakasz meredeksége 4, a 2. szakasz meredeksége 6. Melyik szakaszon ment gyorsabban?',
        options: ['A 2. szakaszon', 'Az 1. szakaszon', 'Mindkettőn egyformán', 'Nem határozható meg'],
        correctAnswer: 0,
        hint: 'Az út-idő grafikon meredeksége maga a sebesség (m = v).',
        explanation: 'Mivel a meredekség a sebességet jelenti, a 6 km/h meredekségű 2. szakaszon haladt gyorsabban.'
      },
      {
        id: 'eq1-7',
        questionTypeBadge: 'Visszatérés a Startponthoz',
        question: 'Egy futó távolság-idő grafikonján a vonal balról jobbra lefelé haladva eléri az y = 0 szintet. Mit csinált a futó?',
        options: ['Visszafutott a kiindulási pontjához (hazaért)', 'Föld alá bújt', 'Megállt pihenni', 'Elvesztette az irányt'],
        correctAnswer: 0,
        hint: 'A kiindulási ponttól mért távolsága nullára csökkent.',
        explanation: 'A távolság csökkenése a startpont felé való közeledést jelenti, az y = 0 elérése a hazaérkezést mutatja.'
      },
      {
        id: 'eq1-8',
        questionTypeBadge: 'Vízfogyasztás Grafikonja',
        question: 'Egy vízóra állásának grafikonja folytonosan felfelé emelkedik az idő múlásával. Csökkenhet-e ez a grafikon valaha?',
        options: [
          'Nem, mert a vízóra által mért összesített fogyasztás csak nőhet vagy állhat',
          'Igen, ha elzárjuk a csapot',
          'Igen, ha hideg a víz',
          'Csak télen csökkenhet'
        ],
        correctAnswer: 0,
        hint: 'A számláló mindig csak előrefelé forog a fogyasztás mérésével.',
        explanation: 'Mivel a kumulált (összesített) vízfogyasztás nem tud visszafelé tekeredni, a grafikon monoton növekvő vagy vízszintes lehet.'
      },
      {
        id: 'eq1-9',
        questionTypeBadge: 'Mértékegység Leolvasása',
        question: 'Egy grafikon vízszintes tengelyének felirata: „Idő (perc)”, függőleges felirata: „Magasság (m)”. Milyen mértékegységben kapjuk a meredekséget?',
        options: ['m/perc (méter per perc)', 'km/h', 'm · perc', 'másodperc'],
        correctAnswer: 0,
        hint: 'Meredekség = Függőleges egység / Vízszintes egység.',
        explanation: 'm = Δy / Δx = méter / perc = m/perc.'
      },
      {
        id: 'eq1-10',
        questionTypeBadge: 'Időtartam Leolvasása',
        question: 'Egy túrázó délelőtt 9:15-kor indult és délután 14:45-kor érkezett meg. Mennyi volt a teljes túra ideje?',
        options: ['5 óra 30 perc', '5 óra', '6 óra 15 perc', '4 óra 45 perc'],
        correctAnswer: 0,
        hint: '9:15-től 14:15-ig 5 óra, plusz még 30 perc.',
        explanation: '14:45 - 9:15 = 5 óra 30 perc (5,5 óra).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Sebesség, Terület és Elemzés (Közepes)',
    subtitle: 'v-t grafikon alatti terület, szakaszos sebességek és fizikai grafikonok.',
    range: '11 - 20. feladat',
    focus: 'Görbe Alatti Terület és Összefüggések',
    questions: [
      {
        id: 'eq2-1',
        questionTypeBadge: 'v-t Grafikon Alatti Terület (Téglalap)',
        question: 'Egy jármű sebesség-idő grafikonján a sebesség 10 másodpercig állandó 15 m/s. Mekkora utat tett meg ebben a 10 másodpercben?',
        figure: <SpeedTimeAreaSvg size={240} />,
        options: ['150 méter', '75 méter', '15 méter', '300 méter'],
        correctAnswer: 0,
        hint: 'A megtett út a téglalap területe: s = v · t = 15 · 10.',
        explanation: 's = 15 m/s · 10 s = 150 méter.'
      },
      {
        id: 'eq2-2',
        questionTypeBadge: 'v-t Grafikon Alatti Terület (Háromszög)',
        question: 'Egy metrókocsi álló helyzetből (v = 0) egyenletesen felgyorsul 20 m/s sebességre 8 másodperc alatt. Mekkora utat tesz meg a gyorsulás során?',
        options: ['80 méter', '160 méter', '40 méter', '100 méter'],
        correctAnswer: 0,
        hint: 'A grafikon alatti terület derékszögű háromszög: s = (alap · magasság) / 2 = (8 · 20) / 2.',
        explanation: 's = (8 s · 20 m/s) / 2 = 160 / 2 = 80 méter.'
      },
      {
        id: 'eq2-3',
        questionTypeBadge: 'Szakaszos Mozgás Teljes Útja',
        question: 'Egy robot 2 másodpercig gyorsul 0-ról 20 m/s-ra (s₁ = 20 m), majd 4 másodpercig egyenletesen halad 20 m/s-mal (s₂ = 80 m). Mennyi a teljes útja a 6 másodperc alatt?',
        figure: <SpeedTimeAreaSvg size={240} />,
        options: ['100 méter', '80 méter', '120 méter', '90 méter'],
        correctAnswer: 0,
        hint: 'Add össze a két szakasz alatt megtett utat: 20 m + 80 m.',
        explanation: 's_összes = s₁ + s₂ = 20 m + 80 m = 100 méter.'
      },
      {
        id: 'eq2-4',
        questionTypeBadge: 'Átlagsebesség Kiszámítása',
        question: 'Egy kerékpáros az első 20 km-t 1 óra alatt teszi meg, majd pihen 30 percet, végül a következő 20 km-t megint 1 óra alatt tekeri le. Mennyi a TELJES utazási átlagsebessége a pihenővel együtt?',
        options: ['16 km/h', '20 km/h', '18 km/h', '15 km/h'],
        correctAnswer: 0,
        hint: 'Összes út = 40 km. Összes idő = 1 h + 0,5 h + 1 h = 2,5 h. v = 40 / 2,5.',
        explanation: 's_össz = 40 km, t_össz = 2,5 óra. v_átlag = 40 / 2,5 = 16 km/h.'
      },
      {
        id: 'eq2-5',
        questionTypeBadge: 'Középpont és Találkozás',
        question: 'Két barát 12 km-re lakik egymástól. Egyszerre indulnak egymással szemben: Péter 4 km/h-val gyalogol, Anna 8 km/h-val teker. Hány óra múlva találkoznak?',
        options: ['1 óra múlva', '1,5 óra múlva', '2 óra múlva', '45 perc múlva'],
        correctAnswer: 0,
        hint: 'Együtt 4 + 8 = 12 km-t tesznek meg óránként. t = 12 / 12.',
        explanation: 'Relatív közeledési sebesség = 4 + 8 = 12 km/h. Idő = 12 km / 12 km/h = 1 óra.'
      },
      {
        id: 'eq2-6',
        questionTypeBadge: 'Fékezés Útja',
        question: 'Egy autó 30 m/s sebességről 6 másodperc alatt fékez le nullára. Mekkora utat tesz meg a fékút során (háromszög terület)?',
        options: ['90 méter', '180 méter', '120 méter', '60 méter'],
        correctAnswer: 0,
        hint: 's = (v_kezdő · t_fék) / 2 = (30 · 6) / 2.',
        explanation: 's = (30 · 6) / 2 = 180 / 2 = 90 méter a fékút.'
      },
      {
        id: 'eq2-7',
        questionTypeBadge: 'Függőleges Tengely Értelmezése',
        question: 'Mit fejez ki a sebesség-idő grafikon meredeksége (m = Δv / Δt)?',
        options: ['A gyorsulást (a)', 'A megtett utat (s)', 'A tömeget (m)', 'A felhasznált üzemanyagot'],
        correctAnswer: 0,
        hint: 'Sebességváltozás osztva az idővel.',
        explanation: 'a = Δv / Δt a test gyorsulása: pozitív meredekség = gyorsulás, negatív = fékezés.'
      },
      {
        id: 'eq2-8',
        questionTypeBadge: 'Hőmérsékleti Grafikon Zérushelye',
        question: 'Egy téli éjszaka hőmérsékleti grafikonján a görbe 23:00-kor metszi a t-tengelyt lefelé haladva. Mit jelent ez?',
        options: [
          '23:00-kor érte el a fagyáspontot (0 °C), ezután fagypont alatti hideg volt',
          '23:00-kor kisütött a nap',
          '23:00-kor volt a legmelegebb',
          'A hőmérő tönkrement'
        ],
        correctAnswer: 0,
        hint: 'A vízszintes tengelyen T = 0 °C.',
        explanation: 'A t-tengely metszése azt jelzi, hogy a hőmérséklet 0 °C-ra esett, és a fagyás megkezdődött.'
      },
      {
        id: 'eq2-9',
        questionTypeBadge: 'Mobilnet Adatforgalom Grafikon',
        question: 'Egy mobilnet előfizetésnél a havi alapdíj 3 000 Ft (ebben 5 GB van). Minden további megkezdett GB 1 000 Ft. Milyen jellegű a költségfüggvény grafikonja 0 és 5 GB között?',
        options: [
          'Vízszintes egyenes szakasz 3 000 Ft magasságban',
          'Meredeken emelkedő egyenes',
          'Origóból induló ferde vonal',
          'Lefelé tartó görbe'
        ],
        correctAnswer: 0,
        hint: '0 és 5 GB között nem kell plusz pénzt fizetni, a költség fixen 3 000 Ft marad.',
        explanation: 'Mivel az 5 GB-ot tartalmazza az alapdíj, az 5 GB eléréséig a költség állandó (vízszintes vonal y = 3000-nél).'
      },
      {
        id: 'eq2-10',
        questionTypeBadge: 'Sebességváltás Grafikonon',
        question: 'Egy jármű v-t grafikonján egy vízszintes szakasz hirtelen megtörik és meredeken felfelé indul. Mi történt a valóságban?',
        options: [
          'A sofőr rálépett a gázra és gyorsítani kezdett',
          'A jármű megállt',
          'A sofőr satuféket nyomott',
          'A jármű hegynek felfelé gurul'
        ],
        correctAnswer: 0,
        hint: 'A sebesség értéke emelkedni kezd az idővel.',
        explanation: 'Ha a v-t grafikon felfelé ível, a jármű sebessége nő, vagyis gyorsulás történik.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Komplex Menetrendek és Életszerű Modellek (Nehéz)',
    subtitle: 'Kétirányú vasúti menetrendi diagramok, átlagsebességi paradoxonok és pénzügyi modellek.',
    range: '21 - 30. feladat',
    focus: 'Összetett Hétköznapi Rendszerek',
    questions: [
      {
        id: 'eq3-1',
        questionTypeBadge: 'Vasúti Menetrendi Diagram',
        question: 'Egy vasúti vonalállomás-idő diagramján egy lassabb személyvonat és egy gyorsvonat ugyanabból a városból indul azonos irányba, de a gyorsvonat 30 perccel később. Mit jelent, ha a grafikonjaik metszik egymást?',
        options: [
          'A gyorsvonat utoléri a személyvonatot (előzés történhet állomáson)',
          'Frontális ütközés történik',
          'Mindkét vonat visszafordul',
          'A személyvonat lehagyja a gyorsvonatot'
        ],
        correctAnswer: 0,
        hint: 'A gyorsvonat meredekebb egyenese metszi a személyvonat laposabb egyenesét.',
        explanation: 'A metszéspont az utolérés pillanatát és helyét jelzi: a gyorsabb vonat ott előzheti meg a lassabbat.'
      },
      {
        id: 'eq3-2',
        questionTypeBadge: 'Átlagsebességi Paradoxon',
        question: 'Egy autó odafelé 60 km/h-val tesz meg egy 120 km-es utat, visszafelé dugó miatt 40 km/h-val. Miért NEM 50 km/h a teljes útra számított átlagsebessége?',
        options: [
          'Mert a lassabb (40 km/h-s) sebességgel hosszabb ideig utazott (3 órát), mint a gyorsabb szakaszon (2 órát)',
          'Mert a távolság oda-vissza megváltozott',
          'Mert az átlagot mindig szorozni kell kettővel',
          'Mert 50 km/h a helyes érték'
        ],
        correctAnswer: 0,
        hint: 'Összes idő: 120/60 + 120/40 = 2 + 3 = 5 óra. v = 240 / 5 = 48 km/h.',
        explanation: 'Az átlagsebesség a teljes út osztva a teljes idővel: 240 km / 5 h = 48 km/h. Mivel több időt töltött lassabban, az átlag a kisebb érték felé húz.'
      },
      {
        id: 'eq3-3',
        questionTypeBadge: 'Elektromos Autó Töltési Görbéje',
        question: 'Egy villanyautó gyorstöltése 10%-ról 80%-ra 30 perc alatt zajlik le, míg 80%-ról 100%-ra további 30 perc kell. Milyen a töltöttség-idő grafikon alakja?',
        options: [
          'Eleinte meredeken emelkedik, majd 80% felett jóval laposabbá válik az akkumulátor kímélése miatt',
          'Végig tökéletesen egyenletes egyenes vonal',
          'Eleinte lapos, majd felül válik szupersprintté',
          'Visszafelé görbül'
        ],
        correctAnswer: 0,
        hint: 'A töltési teljesítmény a magas töltöttségnél lecsökken a cellák védelmében.',
        explanation: 'A modern lítium akkumulátorok töltési görbéje konkáv: kezdetben nagy a meredekség (gyors töltés), a vége felé ellaposodik.'
      },
      {
        id: 'eq3-4',
        questionTypeBadge: 'Két Jármű Távolságfüggvénye',
        question: 'Egy autó 90 km/h-val megy, egy motoros 30 km-rel előtte halad 70 km/h-val. Hány óra alatt éri utol az autó a motorost?',
        options: ['1,5 óra alatt', '1 óra alatt', '2 óra alatt', '45 perc alatt'],
        correctAnswer: 0,
        hint: 'A sebességkülönbség: 90 - 70 = 20 km/h. Ezzel a relatív sebességgel kell ledolgozni a 30 km hátrányt: t = 30 / 20.',
        explanation: 't = 30 km / 20 km/h = 1,5 óra (90 perc).'
      },
      {
        id: 'eq3-5',
        questionTypeBadge: 'Banki Kamatos Kamat Görbéje',
        question: 'Egy befektetett összeg évi fix 8% kamatos kamattal gyarapodik a bankban. Milyen a tőke-idő grafikon formája?',
        options: [
          'Exponenciálisan felfelé ívelő, egyre meredekebbé váló görbe',
          'Egyenes vonal',
          'Lefelé hajló lankás görbe',
          'Vízszintes szakaszokból álló lépcsős vonal'
        ],
        correctAnswer: 0,
        hint: 'Minden évben az egyre nagyobb összeg 8%-át adják hozzá (kamat kamata).',
        explanation: 'A kamatos kamat képlete f(t) = C · 1,08^t, amely egy exponenciális, folyamatosan gyorsuló növekedési görbe.'
      },
      {
        id: 'eq3-6',
        questionTypeBadge: 'Áruszállítás Költségfüggvénye',
        question: 'Egy futárcég díjszabása: 0-2 kg: 1 500 Ft; 2-5 kg: 2 200 Ft; 5-10 kg: 3 500 Ft. Milyen típusú függvény ez matematikailag?',
        options: ['Lépcsős függvény (szakaszosan állandó)', 'Folytonos lineáris függvény', 'Másodfokú parabola', 'Fordított arányosság'],
        correctAnswer: 0,
        hint: 'A súlytartományokon belül a díj ugrik egyet és vízszintes marad a következő határig.',
        explanation: 'Ez egy klasszikus lépcsős függvény: intervallumonként állandó értékeket vesz fel hirtelen ugrásokkal.'
      },
      {
        id: 'eq3-7',
        questionTypeBadge: 'Pulzus Megnyugvási Szakasz',
        question: 'Edzés után a pulzus 170-ről 100-ra csökken 5 perc alatt, majd 100-ról 75-re további 15 perc kell. Mi jellemezte a regenerációt?',
        options: [
          'A pulzus kezdetben gyorsan esett vissza (14 bpm/perc), majd lassabban konszolidálódott (1,67 bpm/perc)',
          'Végig azonos ütemben tért vissza a nyugalmi szintre',
          'A második szakaszban gyorsabb volt a visszaesés',
          'A szívverés nem állt helyre'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az ütemeket: (170-100)/5 = 14 bpm/perc; (100-75)/15 = 1,67 bpm/perc.',
        explanation: 'A szívfrekvencia azonnal a terhelés megszűnésekor esik a legmeredekebben, majd fokozatosan simul a nyugalmi alapvonalra.'
      },
      {
        id: 'eq3-8',
        questionTypeBadge: 'v-t Grafikon Teljes Mozgásképe',
        question: 'Egy test v-t grafikonja: 0-ról 4 másodpercig gyorsul 12 m/s-ra, majd 6 másodpercig tartja a 12 m/s-ot, végül 2 másodperc alatt megáll. Mennyi a teljes megtett útja?',
        options: ['108 méter', '120 méter', '96 méter', '144 méter'],
        correctAnswer: 0,
        hint: 'Háromszög 1: (4·12)/2 = 24 m. Téglalap: 6·12 = 72 m. Háromszög 2: (2·12)/2 = 12 m. Összeg: 24 + 72 + 12.',
        explanation: 's₁ = 24 m, s₂ = 72 m, s₃ = 12 m. s_összes = 24 + 72 + 12 = 108 méter (trapéz terület: (6 + 12)·12 / 2 = 108 m).'
      },
      {
        id: 'eq3-9',
        questionTypeBadge: 'Lift Mozgása Út-időben',
        question: 'Egy felhőkarcoló liftje a földszintről indul a 30. emeletre. Menet közben megáll a 12. és 20. emeleten utasokat felvenni. Hány vízszintes szakasza van a grafikonnak a 30. emelet eléréséig?',
        options: ['2 vízszintes szakasz', '3 vízszintes szakasz', '1 vízszintes szakasz', '0 vízszintes szakasz'],
        correctAnswer: 0,
        hint: 'Minden közbenső megállás (12. és 20. emelet) egy-egy vízszintes platót jelent az út-idő képen.',
        explanation: 'A két közbenső emeleten való megállás 2 különálló vízszintes szakaszt hoz létre a magasság-idő grafikonon.'
      },
      {
        id: 'eq3-10',
        questionTypeBadge: 'Kritikus Elemzés: Híradós Grafikon',
        question: 'Egy televíziós ábrán az üzemanyagár 600 Ft-ról 630 Ft-ra nőtt (+5%), de a grafikont úgy rajzolták meg, hogy a vonal az égbe szökik a képernyő tetejéig. Mi okozta a félrevezetést?',
        options: [
          'A függőleges tengely 590 Ft-nál kezdődik 0 Ft helyett, így a 30 Ft-os növekedés négyszeres ugrásnak tűnik',
          'Az üzemanyagár valójában csökkent',
          'A vonal színe túl sötét',
          'Nem szabad Ft-ot ábrázolni'
        ],
        correctAnswer: 0,
        hint: 'Ismét a csonkolt tengely esete a hétköznapi médiában!',
        explanation: 'A csonkolt tengely manipulációja miatt a valós 5%-os áremelkedés drámai, többszörös ugrásként hat a nézőre.'
      }
    ]
  }
};

const everydayGraphsCheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Út-idő grafikon (s-t)',
    description: 'Meredekség = Sebesség (v = Δs / Δt). Vízszintes vonal = Álló test (v = 0). Metszéspont = Találkozás.',
    formula: 's(t) ➔ v = Δs / Δt',
    badge: 'Út-idő',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    title: 'Sebesség-idő grafikon (v-t)',
    description: 'A görbe alatti terület adja meg a megtett utat (s). Meredekség = Gyorsulás (a = Δv / Δt).',
    formula: 'Megtett út = Görbe alatti terület',
    badge: 'v-t Terület',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    title: 'Átlagsebesség teljes útra',
    description: 'Mindig a teljes utat osztjuk a teljes idővel! A pihenőidő csökkenti a teljes utazási átlagsebességet.',
    formula: 'v_átl = s_össz / (t_mozgás + t_pihenő)',
    badge: 'Átlagsebesség',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    title: 'Grafikon vs. Fizikai pálya',
    description: 'A grafikon nem a domborzat vagy az útvonal térképe! A lefelé menő egyenes a startpont felé való közeledést jelenti.',
    formula: 'Lefelé tartó s(t) = Közeledés',
    badge: 'Fontos csapda',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  }
];

export const EverydayGraphsQuiz: React.FC<EverydayGraphsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="4. Grafikonok a mindennapokban Kvíz"
      subtitle="Elemezz út-idő és sebesség-idő diagramokat, számíts átlagsebességet és leplezz le félrevezető gazdasági görbéket 3 szinten!"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 4. GRAFIKONOK A MINDENNAPOKBAN"
      chapterId="fuggvenyek"
      topicId="g9-func-mindennapok-quiz"
      topicTitle="4. Grafikonok a mindennapokban"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetTitle="Mindennapi Grafikonok Segédlet"
      cheatSheetCards={everydayGraphsCheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={
        <EverydayGraphsMatcher
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <EverydayGraphsSorter
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

