import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ChangesMatcher } from './ChangesMatcher';
import { ChangesSorter } from './ChangesSorter';
import {
  CoordinateSystemSvg,
  ProcessGraphSvg,
  RateOfChangeSvg
} from './ChangesFigures';
import { Activity, Compass, TrendingUp, Clock } from 'lucide-react';

interface ChangesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Pontok és Síknegyedek Alapjai (Könnyű)',
    subtitle: 'Koordináták leolvasása, síknegyedek előjelei és a folyamatok alapvető iránya.',
    range: '1 - 10. feladat',
    focus: 'Koordináta-rendszer és Irányok',
    questions: [
      {
        id: 'cq1-1',
        questionTypeBadge: 'Síknegyed Előjele',
        question: 'Melyik síknegyedben helyezkedik el a P(-4; 7) pont?',
        figure: <CoordinateSystemSvg size={220} />,
        options: ['II. síknegyed', 'I. síknegyed', 'III. síknegyed', 'IV. síknegyed'],
        correctAnswer: 0,
        hint: 'Nézd meg az előjeleket: x negatív (-4) és y pozitív (+7).',
        explanation: 'A bal felső negyed a II. síknegyed, ahol x < 0 és y > 0.'
      },
      {
        id: 'cq1-2',
        questionTypeBadge: 'Tengelyen Fekvő Pont',
        question: 'Melyik tengelyen fekszik a Q(0; -5) pont?',
        options: ['y-tengelyen (ordináta)', 'x-tengelyen (abszcissza)', 'Egyik tengelyen sem', 'Az I. síknegyedben'],
        correctAnswer: 0,
        hint: 'Ha az x koordináta 0, a pont a függőleges tengelyen van.',
        explanation: 'Mivel az első (x) koordináta 0, a pont nem tér el vízszintesen: pontosan az y-tengelyen fekszik a -5 értéknél.'
      },
      {
        id: 'cq1-3',
        questionTypeBadge: 'Origó Koordinátái',
        question: 'Mik a két koordinátatengely metszéspontjának, az origónak a koordinátái?',
        options: ['(0; 0)', '(1; 1)', '(0; 1)', '(1; 0)'],
        correctAnswer: 0,
        hint: 'A kiindulási pont, ahol mindkét tengely értéke nulla.',
        explanation: 'Az origó a derékszögű koordináta-rendszer kezdőpontja: O(0; 0).'
      },
      {
        id: 'cq1-4',
        questionTypeBadge: 'Folyamat Iránya',
        question: 'Egy grafikonon balról jobbra haladva a görbe vízszintes egyenes szakasz. Mit jelent ez a vizsgált mennyiségre nézve?',
        figure: <ProcessGraphSvg size={220} />,
        options: ['A mennyiség nem változik, állandó marad', 'A mennyiség egyenletesen növekszik', 'A mennyiség gyorsan csökken', 'A folyamat leállt a nullánál'],
        correctAnswer: 0,
        hint: 'A függőleges érték (y) ugyanaz marad az idő múlásával.',
        explanation: 'Vízszintes szakasz esetén a változás Δy = 0, vagyis a vizsgált érték változatlan, stagnál.'
      },
      {
        id: 'cq1-5',
        questionTypeBadge: 'III. Síknegyed Jellemzője',
        question: 'Milyen előjelű egy pont mindkét koordinátája a III. (bal alsó) síknegyedben?',
        options: ['Mindkettő negatív (-; -)', 'Mindkettő pozitív (+; +)', 'x pozitív, y negatív', 'x negatív, y pozitív'],
        correctAnswer: 0,
        hint: 'Balra a nullától (negatív x) és lefelé a nullától (negatív y).',
        explanation: 'A III. síknegyedben mind az x, mind az y koordináta szigorúan negatív.'
      },
      {
        id: 'cq1-6',
        questionTypeBadge: 'Pont Elhelyezkedése',
        question: 'Hol található az R(6; -3) pont?',
        options: ['IV. síknegyed', 'I. síknegyed', 'II. síknegyed', 'III. síknegyed'],
        correctAnswer: 0,
        hint: 'x pozitív (+6), y negatív (-3) ➔ jobb alsó rész.',
        explanation: 'A (+; -) előjelpár a IV. síknegyedhez tartozik.'
      },
      {
        id: 'cq1-7',
        questionTypeBadge: 'X-tengelyen Fekvő Pont',
        question: 'Melyik állítás igaz az x-tengelyen fekvő pontokra?',
        options: ['Az y-koordinátájuk mindig 0', 'Az x-koordinátájuk mindig 0', 'Mindkét koordinátájuk pozitív', 'Az összegük mindig 10'],
        correctAnswer: 0,
        hint: 'Ha egy pont rajta van a vízszintes tengelyen, a magassága nulla.',
        explanation: 'Az x-tengely egyenlete y = 0, így minden rajta fekvő pont alakja: (x; 0).'
      },
      {
        id: 'cq1-8',
        questionTypeBadge: 'Növekvő Szakasz',
        question: 'Egy kiránduló tengerszint feletti magasságának grafikonján a vonal felfelé tart. Mit csinál a kiránduló?',
        options: ['Hegyre felfelé kapaszkodik (emelkedik)', 'Völgybe ereszkedik lefelé', 'Pihen a menedékházban', 'Visszafordult'],
        correctAnswer: 0,
        hint: 'A magasság értéke az idő múlásával nő.',
        explanation: 'Emelkedő görbe esetén a magasság nő, tehát a kiránduló hegyre mászik felfelé.'
      },
      {
        id: 'cq1-9',
        questionTypeBadge: 'Koordináták Olvasása',
        question: 'A síkban a P(3; 4) pontból indulunk. Ha 2 egységet lépünk jobbra és 3 egységet lefelé, melyik pontba érkezünk?',
        options: ['(5; 1)', '(1; 7)', '(5; 7)', '(1; 1)'],
        correctAnswer: 0,
        hint: 'Jobbra lépés növeli az x-et: 3 + 2 = 5. Lefelé lépés csökkenti az y-t: 4 - 3 = 1.',
        explanation: 'Új koordináták: x = 3 + 2 = 5, y = 4 - 3 = 1 ➔ (5; 1).'
      },
      {
        id: 'cq1-10',
        questionTypeBadge: 'Csökkenő Folyamat',
        question: 'Egy okostelefon akkumulátorának töltöttsége a nap során 90%-ról 30%-ra esik vissza. Milyen jellegű ez a változás grafikusan?',
        options: ['Szigorúan csökkenő folyamat', 'Szigorúan növekvő folyamat', 'Állandó folyamat', 'Periodikus rezgés'],
        correctAnswer: 0,
        hint: 'Az érték az idő előrehaladtával egyre kisebb lesz.',
        explanation: 'Mivel a töltöttség értéke folyamatosan fogyatkozik, a folyamat csökkenő (lejtő görbe).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Változási Sebesség és Szakaszok (Közepes)',
    subtitle: 'Átlagos változási sebesség számítása (Δy / Δt), meredekségek és intervallumok.',
    range: '11 - 20. feladat',
    focus: 'Átlagsebesség és Grafikon-analízis',
    questions: [
      {
        id: 'cq2-1',
        questionTypeBadge: 'Átlagsebesség Számítása',
        question: 'Egy autó t₁ = 2 órakor s₁ = 100 km-nél, t₂ = 5 órakor s₂ = 340 km-nél jár. Mennyi az átlagsebessége a 3 órás szakaszon?',
        figure: <RateOfChangeSvg size={240} />,
        options: ['80 km/h', '70 km/h', '90 km/h', '60 km/h'],
        correctAnswer: 0,
        hint: 'v = (s₂ - s₁) / (t₂ - t₁) = (340 - 100) / (5 - 2).',
        explanation: 'Δs = 340 - 100 = 240 km. Δt = 5 - 2 = 3 óra. v = 240 / 3 = 80 km/h.'
      },
      {
        id: 'cq2-2',
        questionTypeBadge: 'Hőmérséklet Változási Sebessége',
        question: 'A víz hőmérséklete reggel 8:00-kor 15 °C, délben 12:00-kor 27 °C. Óránként átlagosan hány fokkal emelkedett a hőmérséklet?',
        options: ['3 °C/óra', '4 °C/óra', '2,5 °C/óra', '12 °C/óra'],
        correctAnswer: 0,
        hint: 'ΔT = 27 - 15 = 12 °C. Eltelt idő: 12 - 8 = 4 óra. 12 / 4.',
        explanation: 'Változási sebesség = 12 °C / 4 óra = 3 °C/óra.'
      },
      {
        id: 'cq2-3',
        questionTypeBadge: 'Meredekség Értelmezése',
        question: 'Két kerékpáros út-idő grafikonja közül az egyik jóval meredekebben emelkedik, mint a másik. Mit jelent ez a gyakorlatban?',
        options: [
          'A meredekebb vonalú kerékpáros gyorsabban halad (nagyobb a sebessége)',
          'A meredekebb vonalú kerékpáros meredekebb hegyoldalon teker',
          'A meredekebb vonalú kerékpáros lassabban halad',
          'Mindkét kerékpáros sebessége azonos'
        ],
        correctAnswer: 0,
        hint: 'Az út-idő grafikon meredeksége v = Δs / Δt, azaz a mozgás sebessége.',
        explanation: 'A meredekebb grafikon nagyobb sebességet jelent: ugyanannyi idő alatt nagyobb utat tesz meg.'
      },
      {
        id: 'cq2-4',
        questionTypeBadge: 'Negatív Változási Sebesség',
        question: 'Egy tartályból szivárog a víz: t₁ = 0 perckor 500 liter van benne, t₂ = 20 perckor már csak 300 liter. Mennyi a vízmennyiség átlagos változási sebessége?',
        options: ['-10 liter/perc', '+10 liter/perc', '-20 liter/perc', '-200 liter/perc'],
        correctAnswer: 0,
        hint: 'ΔV = 300 - 500 = -200 liter. Δt = 20 perc. -200 / 20.',
        explanation: 'ΔV / Δt = (300 - 500) / 20 = -200 / 20 = -10 liter/perc (csökkenés).'
      },
      {
        id: 'cq2-5',
        questionTypeBadge: 'Szakaszok Sorrendje',
        question: 'Egy gyalogos 1 órán át 5 km/h sebességgel megy, majd fél órán át egy padon ül, végül 1 órán át 4 km/h sebességgel tér haza. Milyen alakú az út-idő grafikonja?',
        options: [
          'Emelkedő szakasz, majd vízszintes szakasz, majd lejtő vagy tovább emelkedő szakasz',
          'Végig egyetlen egyenes vonal',
          'Egy U-alakú parabola',
          'Függőleges ugrások sorozata'
        ],
        correctAnswer: 0,
        hint: 'Mozgás = emelkedés, ülés = vízszintes pihenő.',
        explanation: 'A mozgás szakaszai emelkednek, a pihenés (egy helyben állás) pedig vízszintes vonalként jelenik meg.'
      },
      {
        id: 'cq2-6',
        questionTypeBadge: 'Gyorsulás Grafikonja',
        question: 'Ha egy autó sebessége egyenletesen növekszik az idő múlásával, milyen alakú a sebesség-idő (v-t) grafikonja?',
        options: [
          'Egy origóból vagy kezdősebességből induló ferde egyenes',
          'Vízszintes egyenes szakasz',
          'Egy lefelé görbülő ív',
          'Kör alakú vonal'
        ],
        correctAnswer: 0,
        hint: 'Egyenletes növekedés azt jelenti, hogy egységnyi idő alatt mindig ugyanannyival nő a sebesség.',
        explanation: 'Az egyenletesen változó mozgás sebesség-idő grafikonja egyenes (lineáris függvény: v(t) = a·t + v₀).'
      },
      {
        id: 'cq2-7',
        questionTypeBadge: 'Álló Jármű Út-idő Grafikonon',
        question: 'Egy jármű az autópályán a pihenőhelyen parkol 12:00 és 12:45 között. Milyen a távolság-idő grafikon meredeksége ebben az idősávban?',
        options: ['m = 0 (vízszintes)', 'm > 0 (emelkedő)', 'm < 0 (csökkenő)', 'Végtelen meredek'],
        correctAnswer: 0,
        hint: 'Ha a test nem mozog, a távolság nem változik (Δs = 0).',
        explanation: 'Álló helyzetben a sebesség v = 0, így a grafikon meredeksége pontosan 0 (vízszintes szakasz).'
      },
      {
        id: 'cq2-8',
        questionTypeBadge: 'Tengerszint Feletti Magasság Változása',
        question: 'Egy túrázó 600 méteres magasságból 1 400 méterre jut fel 2 óra alatt. Mekkora az átlagos szintemelkedési sebessége?',
        options: ['400 m/h', '800 m/h', '700 m/h', '200 m/h'],
        correctAnswer: 0,
        hint: 'Szintkülönbség: 1400 - 600 = 800 m. Eltelt idő: 2 óra.',
        explanation: 'Δh / Δt = 800 m / 2 h = 400 m/h.'
      },
      {
        id: 'cq2-9',
        questionTypeBadge: 'Grafikon Nullpontja',
        question: 'Mit jelent egy hőmérséklet-idő grafikonon az a pont, ahol a görbe metszi az időtengelyt (t-tengelyt)?',
        options: [
          'Ebben az időpontban a hőmérséklet pontosan 0 °C volt (zérushely)',
          'Ebben az időpontban volt a legmelegebb',
          'Ebben az időpontban állt le a mérés',
          'Nem lehetséges metszeni az időtengelyt'
        ],
        correctAnswer: 0,
        hint: 'A tengelymetszetnél a függőleges érték y = 0.',
        explanation: 'Ahol a függvény metszi a vízszintes tengelyt, ott az értéke nulla (zérushely: T(t) = 0 °C).'
      },
      {
        id: 'cq2-10',
        questionTypeBadge: 'Pillanatnyi vs. Átlagos Sebesség',
        question: 'Mi a különbség az átlagos változási sebesség és a pillanatnyi sebesség között?',
        options: [
          'Az átlagsebesség egy hosszabb időintervallumra vonatkozik, a pillanatnyi sebesség egyetlen adott időpontra',
          'Nincs különbség, a kettő mindig pontosan egyenlő',
          'A pillanatnyi sebesség mindig nagyobb az átlagosnál',
          'Az átlagsebesség csak negatív szám lehet'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az autó kilométerórájára menet közben, és a teljes út átlagára!',
        explanation: 'A kilométeróra a pillanatnyi sebességet mutatja egy tizedmásodperc alatt, míg az átlagsebesség a teljes megtett táv és a teljes idő hányadosa.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Folyamatok és Modellfeladatok (Nehéz)',
    subtitle: 'Tartályok töltési sebessége, több test találkozása és nemlineáris folyamatok vizsgálata.',
    range: '21 - 30. feladat',
    focus: 'Gyakorlati Modellalkotás',
    questions: [
      {
        id: 'cq3-1',
        questionTypeBadge: 'Tartály Töltése Lépcsős Edénynél',
        question: 'Egy alul széles, felül szűk hengeres vázát egyenletes vízhozammal töltünk. Hogyan alakul a vízszint emelkedési sebessége az idő függvényében?',
        options: [
          'Eleinte lassan emelkedik a vízszint, majd a szűk részhez érve hirtelen felgyorsul az emelkedés',
          'Végig teljesen egyenletes sebességgel emelkedik',
          'Eleinte gyorsan emelkedik, majd felül lelassul',
          'A vízszint felül csökkenni kezd'
        ],
        correctAnswer: 0,
        hint: 'Ahol szűkebb a keresztmetszet, ott egységnyi vízmennyiség nagyobb magasságnövekedést okoz.',
        explanation: 'A széles aljban lassan kúszik felfelé a szint, a szűkebb felső részben viszont jóval gyorsabban nő a magasság (a grafikon meredekebbé válik).'
      },
      {
        id: 'cq3-2',
        questionTypeBadge: 'Két Jármű Találkozása',
        question: 'Két autó indul egymással szemben A és B városból. Távolság-idő grafikonjukon mit jelent a két egyenes metszéspontja?',
        options: [
          'A találkozás pontos időpontját (x) és helyét a pályán (y)',
          'Azt, hogy mindkét autó lerobbant',
          'A két autó sebességének különbségét',
          'Az autók célba érkezését'
        ],
        correctAnswer: 0,
        hint: 'Ahol a két grafikon metszi egymást, ott mind az idő, mind a hely koordinátája azonos.',
        explanation: 'A grafikonok metszéspontja adja meg a találkozás helyét és idejét (mindkét autó ugyanabban a pontban van egyszerre).'
      },
      {
        id: 'cq3-3',
        questionTypeBadge: 'Nemlineáris Folyamat: Szabadesés',
        question: 'Egy toronyból leejtett kő megtett útja az idő négyzetével arányos: s(t) = 5·t². Milyen a grafikon meredeksége az idő múlásával?',
        options: [
          'Folytonosan egyre meredekebb lesz (növekszik a sebesség)',
          'Állandó meredekségű egyenes marad',
          'Egyre laposabb lesz',
          'Vízszintesbe fordul át'
        ],
        correctAnswer: 0,
        hint: 'A gravitáció miatt a kő egyre gyorsul, másodpercről másodpercre nagyobb utat tesz meg.',
        explanation: 'Mivel a sebesség folyamatosan nő, az út-idő parabola meredeksége balról jobbra haladva folyamatosan növekszik.'
      },
      {
        id: 'cq3-4',
        questionTypeBadge: 'Átlagsebesség Két Szakaszból',
        question: 'Egy vonat az út első felét (100 km) 50 km/h sebességgel, a második felét (100 km) 100 km/h sebességgel teszi meg. Mennyi az átlagsebessége a teljes 200 km-en?',
        options: ['kb. 66,7 km/h', '75 km/h', '80 km/h', '60 km/h'],
        correctAnswer: 0,
        hint: 'Számold ki az időket! t₁ = 100 / 50 = 2 h. t₂ = 100 / 100 = 1 h. Teljes idő = 3 h. v = 200 / 3.',
        explanation: 'Összes út = 200 km. Összes idő = 2 + 1 = 3 óra. v = 200 / 3 ≈ 66,7 km/h (nem 75 km/h, mert a lassabb szakaszon kétszer annyi ideig utazott!).'
      },
      {
        id: 'cq3-5',
        questionTypeBadge: 'Fordított Folyamat: Lehűlés',
        question: 'Egy forró tea szobahőmérsékleten hűl: kezdetben gyorsan esik a hőmérséklete, majd a szobahőmérséklethez közelítve egyre lassabban hűl. Milyen a görbe meredeksége?',
        options: [
          'Kezdetben meredeken süllyed, majd fokozatosan ellaposodik a szobahőmérséklet szintjén',
          'Egyenletes meredekségű egyenesként eléri a 0 °C-ot',
          'Egyre meredekebben zuhan lefelé',
          'Vízszintes egyenes a forrásponttól'
        ],
        correctAnswer: 0,
        hint: 'Newton lehűlési törvénye szerint a hőmérséklet-különbség csökkenésével a hűlés sebessége is csökken.',
        explanation: 'A hűlés sebessége idővel lelassul, a grafikon meredeksége csökken és aszimptotikusan közelíti a szobahőmérsékletet.'
      },
      {
        id: 'cq3-6',
        questionTypeBadge: 'Függvénykapcsolat Értelmezése',
        question: 'Egy grafikonon egy pont koordinátái: (x₁; y₁) = (3; 12) és (x₂; y₂) = (5; 20). Mennyi a folyamatot leíró egyenes meredeksége?',
        options: ['m = 4', 'm = 2', 'm = 8', 'm = 0,25'],
        correctAnswer: 0,
        hint: 'm = (y₂ - y₁) / (x₂ - x₁) = (20 - 12) / (5 - 3).',
        explanation: 'm = (20 - 12) / (5 - 3) = 8 / 2 = 4.'
      },
      {
        id: 'cq3-7',
        questionTypeBadge: 'Maximumhely Meghatározása',
        question: 'Egy függőlegesen fellőtt rakéta magasságának függvénye: h(t) = 40t - 5t². Mikor éri el a pálya csúcspontját (ahol a sebesség nulla)?',
        options: ['t = 4 másodperc', 't = 8 másodperc', 't = 2 másodperc', 't = 5 másodperc'],
        correctAnswer: 0,
        hint: 'A parabola csúcspontjának x koordinátája: t = -b / (2a) = -40 / (2 · (-5)) = 4.',
        explanation: 't = -40 / (2 · (-5)) = 4 másodperc múlva éri el a maximális magasságot (h = 80 méter).'
      },
      {
        id: 'cq3-8',
        questionTypeBadge: 'Konkáv vs. Konvex Folyamat',
        question: 'Egy baktériumtenyészet egyedszáma exponenciálisan növekszik: a görbe egyre meredekebben ível felfelé. Mi mondható el a növekedés üteméről?',
        options: [
          'Gyorsuló növekedés: egységnyi idő alatt egyre több új egyed születik',
          'Lassuló növekedés: egyre kevesebb egyed jön létre',
          'Egyenletes lineáris növekedés',
          'Változatlan állomány'
        ],
        correctAnswer: 0,
        hint: 'Ha a meredekség nő, a változási sebesség is folyamatosan növekszik.',
        explanation: 'Az egyre meredekebb görbe gyorsuló folyamatot jelent, a növekedés üteme időben emelkedik.'
      },
      {
        id: 'cq3-9',
        questionTypeBadge: 'Sebesség-idő Görbe Alatti Terület',
        question: 'Fizikából és matematikából ismert összefüggés: a sebesség-idő (v-t) grafikon görbéje alatti terület mit fejez ki?',
        options: [
          'A test által megtett összes utat (s)',
          'A test gyorsulását',
          'A test tömegét',
          'A mozgási energiát'
        ],
        correctAnswer: 0,
        hint: 'Ha v = állandó, akkor a terület = v · t = megtett út.',
        explanation: 'A sebesség-idő grafikon alatti terület integrálja a megtett út nagyságát adja: s = v · t.'
      },
      {
        id: 'cq3-10',
        questionTypeBadge: 'Irányváltoztatás Grafikus Jele',
        question: 'Egy egyenes vonalú pályán mozgó autó sebesség-idő grafikonján a görbe a pozitív tartományból átmetszi a nullát a negatív tartományba. Mit csinál az autó?',
        options: [
          'Megáll egy pillanatra, majd megfordul és ellentétes irányban tolat vagy halad',
          'Leesik az útról',
          'Ugyanabban az irányban gyorsítani kezd',
          'Megsemmisül'
        ],
        correctAnswer: 0,
        hint: 'A negatív sebesség az ellenkező haladási irányt jelenti a választott koordinátatengelyhez képest.',
        explanation: 'Amikor a sebesség előjelet vált (+ -ról - -ra), a test sebessége a nullán halad át (megállás), majd ellenkező irányba indul el.'
      }
    ]
  }
};

const changesCheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Descartes koordináta-rendszer',
    description: 'Vízszintes x (abszcissza), függőleges y (ordináta). Négy síknegyed: I(+,+), II(-,+), III(-,-), IV(+,-).',
    formula: 'P(x; y) ➔ Origó O(0; 0)',
    badge: 'Koordináták',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    title: 'Átlagos változási sebesség',
    description: 'A mennyiség megváltozásának (Δy) és az eltelt időnek (Δt) a hányadosa. Geometriailag a meredekség.',
    formula: 'v_átl = m = (y₂ - y₁) / (t₂ - t₁)',
    badge: 'Sebesség & Meredekség',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    title: 'Folyamatok alaptípusai',
    description: 'Meredeken nő: gyors növekedés. Lapos vízszintes: állandóság (v=0). Lejtő: csökkenés.',
    formula: 'Δy > 0: nő | Δy = 0: állandó | Δy < 0: csökken',
    badge: 'Szakasztípusok',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    title: 'Átlagsebesség szabály',
    description: 'Két különböző szakasz esetén mindig a teljes utat osztjuk a teljes idővel! Nem a sebességek átlaga.',
    formula: 'v_átl = s_összes / t_összes',
    badge: 'Tipikus hiba',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  }
];

export const ChangesQuiz: React.FC<ChangesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="3. Változások ábrázolása Kvíz"
      subtitle="Gyakorold a folyamatok grafikus értelmezését, koordináták leolvasását és az átlagos változási sebesség számítását 3 szinten!"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 3. VÁLTOZÁSOK ÁBRÁZOLÁSA"
      chapterId="fuggvenyek"
      topicId="g9-func-valtozasok-quiz"
      topicTitle="3. Változások ábrázolása"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetTitle="Változások és Koordináták Segédlet"
      cheatSheetCards={changesCheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={
        <ChangesMatcher
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ChangesSorter
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

