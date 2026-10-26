import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PercentageMatcher } from './PercentageMatcher';
import { PercentageSorter } from './PercentageSorter';
import {
  PercentageTriangleSvg,
  PercentageMultiplierBarSvg,
  PieChartPercentageSvg,
  SuccessiveChangesSvg
} from './PercentageFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface PercentageQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Képletek (Könnyű)',
    subtitle: 'Alap (A), százalékláb (p%), százalékérték (E) és a képletháromszög.',
    range: '1 - 10. feladat',
    focus: 'Definíciók és Alapszámítások',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Százalék Definíció',
        question: 'Mit jelent matematikailag az 1% (egy százalék)?',
        options: [
          'Egy századrészt: 1/100 = 0,01',
          'Egy tizedrészt: 1/10 = 0,1',
          'Egy ezredrészt: 1/1000 = 0,001',
          'Száz egész egységet: 100'
        ],
        correctAnswer: 0,
        hint: 'A latin „per centum” kifejezésből ered, ami százankénti arányt jelent.',
        explanation: 'Az 1% pontosan 1 századrészt jelent: 1% = 1/100 = 0,01. Bármely p% értéke tizedestörtben p / 100.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Százalékérték Kiszámítása',
        question: 'Mennyi 500-nak a 20%-a?',
        figure: <PercentageTriangleSvg size={170} />,
        options: [
          '100',
          '50',
          '25',
          '120'
        ],
        correctAnswer: 0,
        hint: '500 · 0,20 = ? (vagy 500 ötödrésze).',
        explanation: 'Százalékérték képlete: E = A · (p / 100) = 500 · 0,20 = 100 (mivel 20% = 1/5 rész, 500 / 5 = 100).'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Alap Keresése',
        question: 'Melyik számnak a 10%-a a 40?',
        options: [
          '400',
          '40',
          '4',
          '440'
        ],
        correctAnswer: 0,
        hint: 'Ha a szám tizedrésze 40, akkor a teljes szám a 40 tízszerese!',
        explanation: 'Alap képlete: A = E / (p / 100) = 40 / 0,10 = 400. Ellenőrzés: 400-nak a 10%-a 40.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Százalékláb Keresése',
        question: '50-nek a 15 hány százaléka?',
        options: [
          '30%',
          '15%',
          '25%',
          '35%'
        ],
        correctAnswer: 0,
        hint: 'Oszd el a részt az egésszel: 15 / 50 = ?',
        explanation: 'Százalékláb képlete: p% = (E / A) · 100% = (15 / 50) · 100% = 0,30 · 100% = 30%.'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Tört Átírása',
        question: 'Hány százalék a 3/4 (háromnegyed)?',
        options: [
          '75%',
          '34%',
          '60%',
          '80%'
        ],
        correctAnswer: 0,
        hint: 'Bővítsd a törtet 100-as nevezőre: 3/4 = ? / 100.',
        explanation: '3/4 = (3 · 25) / (4 · 25) = 75/100 = 75% (vagy tizedestörtben 0,75 = 75%).'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Tizedestört Átírása',
        question: 'Hány százaléknak felel meg a 0,08 tizedestört?',
        options: [
          '8%',
          '80%',
          '0,8%',
          '88%'
        ],
        correctAnswer: 0,
        hint: 'Szorozd meg 100-zal! Két tizedesjeggyel toljuk el a vesszőt jobbra.',
        explanation: '0,08 · 100% = 8%. (Gyakori csapda: a 0,8 lenne 80%, a 0,08 az 8%).'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: '50% mint Felezés',
        question: 'Mennyi 240-nek az 50%-a?',
        options: [
          '120',
          '24',
          '100',
          '140'
        ],
        correctAnswer: 0,
        hint: '50% = 50/100 = 1/2, azaz a fele!',
        explanation: 'Az 50% pontosan a felezést jelenti: 240 / 2 = 120.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: '25% mint Negyedelés',
        question: 'Mennyi 80-nak a 25%-a?',
        options: [
          '20',
          '25',
          '40',
          '16'
        ],
        correctAnswer: 0,
        hint: '25% = 25/100 = 1/4, azaz a negyede!',
        explanation: 'A 25% pontosan a negyedrészt jelenti: 80 / 4 = 20.'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Alapfogalmak Képlete',
        question: 'Melyik képlet helyes a százalékérték (E) kiszámítására?',
        options: [
          'E = A · (p / 100)',
          'E = A / p',
          'E = A + p',
          'E = p / A'
        ],
        correctAnswer: 0,
        hint: 'Az alapot megszorozzuk a százalékláb századrészével.',
        explanation: 'A százalékérték képlete: E = A · (p / 100). Pl. 200 · 0,15 = 30.'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Teljes Egész (100%)',
        question: 'Ha egy mennyiség 100%-át vesszük, mekkora értéket kapunk?',
        options: [
          'Pontosan magát a teljes eredeti értéket (Alapot)',
          'A felét',
          'A dupláját',
          'Nullát'
        ],
        correctAnswer: 0,
        hint: '100% = 100/100 = 1, eggyel szorozva a szám nem változik.',
        explanation: 'A 100% a teljes alapmennyiség (100% = 1,00).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Százalékos Változások és Szorzótényezők (Közepes)',
    subtitle: 'Áremelés, leárazás, 27% ÁFA, kördiagramok és szöveges feladatok.',
    range: '11 - 20. feladat',
    focus: 'Szorzótényezős Módszer és Alkalmazások',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Áremelés Szorzója',
        question: 'Milyen szorzótényezővel számoljuk ki közvetlenül egy termék új árát 20%-os áremelés után?',
        figure: <PercentageMultiplierBarSvg size={170} />,
        options: [
          '· 1,20',
          '· 0,20',
          '· 2,00',
          '· 1,02'
        ],
        correctAnswer: 0,
        hint: '100% + 20% = 120% = 1,20!',
        explanation: 'A 20%-os emelésnél az új ár az eredeti 120%-a lesz, így a szorzótényező 1 + 20/100 = 1,20.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Leárazás Szorzója',
        question: 'Egy 20 000 Ft-os cipőt 15%-kal leáraznak. Mennyi az akciós ára?',
        options: [
          '17 000 Ft',
          '18 500 Ft',
          '16 000 Ft',
          '15 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'Megmarad az ár 85%-a: 20 000 · 0,85 = ?',
        explanation: 'Szorzótényező: 1 - 0,15 = 0,85. Új ár: 20 000 · 0,85 = 17 000 Ft (az engedmény 3000 Ft).'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: '27% ÁFA Számítás',
        question: 'Egy gép nettó ára 50 000 Ft. Mennyi a bruttó (27% ÁFA-s) ára?',
        options: [
          '63 500 Ft',
          '60 000 Ft',
          '65 000 Ft',
          '52 700 Ft'
        ],
        correctAnswer: 0,
        hint: 'Nettó · 1,27 = Bruttó!',
        explanation: 'Bruttó ár = Nettó · 1,27 = 50 000 · 1,27 = 63 500 Ft (az ÁFA 13 500 Ft).'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Bruttóból Nettó (Visszaszámolás)',
        question: 'Egy termék bruttó fogyasztói ára 25 400 Ft (27% ÁFA tartalommal). Mennyi a nettó ára?',
        options: [
          '20 000 Ft',
          '18 542 Ft',
          '22 000 Ft',
          '19 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'Csapda! Ne vond le a 27%-ot, hanem oszd el 1,27-tel: 25 400 / 1,27 = ?',
        explanation: 'Bruttó = Nettó · 1,27 ⟹ Nettó = Bruttó / 1,27 = 25 400 / 1,27 = 20 000 Ft.'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Kördiagram Középponti Szöge',
        question: 'Egy kördiagramban hány fokos középponti szög felel meg a 25%-nak?',
        figure: <PieChartPercentageSvg size={170} />,
        options: [
          '90° (derékszög)',
          '45°',
          '100°',
          '60°'
        ],
        correctAnswer: 0,
        hint: 'A teljes kör 360°. Mennyi 360° negyede (0,25-szöröse)?',
        explanation: '360° · 0,25 = 90°. A kördiagramon a 25%-os körcikk pontosan egy derékszögű negyedkör!'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Kördiagram Szögátszámítás',
        question: 'Egy iskolai választáson a nyertes a szavazatok 40%-át kapta. Hány fokos szektor tartozik hozzá a kördiagramon?',
        options: [
          '144°',
          '120°',
          '160°',
          '100°'
        ],
        correctAnswer: 0,
        hint: '360° · 0,40 = ?',
        explanation: 'Középponti szög: α = 360° · (40 / 100) = 360° · 0,4 = 144°.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Relatív Növekedés',
        question: 'Egy könyv ára 4000 Ft-ról 5000 Ft-ra drágult. Hány százalékkal nőtt az ára?',
        options: [
          '25%-kal',
          '20%-kal',
          '10%-kal',
          '30%-kal'
        ],
        correctAnswer: 0,
        hint: 'A drágulás 1000 Ft. Hány százaléka az 1000 Ft a 4000 Ft-os KEZDŐÁRNAK?',
        explanation: 'Növekmény: 5000 - 4000 = 1000 Ft. Százalékos növekedés az eredeti árhoz képest: 1000 / 4000 = 0,25 = 25%.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Relatív Csökkenés',
        question: 'Egy sportoló testsúlya 80 kg-ról 68 kg-ra csökkent. Hány százalékot fogyott?',
        options: [
          '15%-ot',
          '12%-ot',
          '10%-ot',
          '20%-ot'
        ],
        correctAnswer: 0,
        hint: 'A fogyás 12 kg. Mennyi 12 / 80?',
        explanation: 'Csökkenés: 80 - 68 = 12 kg. Százalékban: 12 / 80 = 0,15 = 15%.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Iskolai Statisztika',
        question: 'Egy 600 fős gimnázium diákjainak 12%-a kitűnő tanuló. Hány kitűnő tanuló jár az iskolába?',
        options: [
          '72 fő',
          '60 fő',
          '80 fő',
          '64 fő'
        ],
        correctAnswer: 0,
        hint: '600 · 0,12 = ?',
        explanation: 'E = 600 · 0,12 = 72 fő.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Oldat Koncentrációja',
        question: '20 g sót feloldunk 180 g vízben. Hány tömegszázalékos a kapott sóoldat?',
        options: [
          '10%-os',
          '11,1%-os',
          '20%-os',
          '9%-os'
        ],
        correctAnswer: 0,
        hint: 'Csapda! Az ALAP a teljes oldat tömege: só + víz = 20 g + 180 g = 200 g!',
        explanation: 'Teljes oldat tömege: A = 20 + 180 = 200 g. Százalékláb: p% = 20 / 200 = 0,10 = 10%.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Érettségi Típusfeladatok (Nehéz)',
    subtitle: 'Egymás utáni változások csapdája, százalékpont, reálbér és geometriai területek.',
    range: '21 - 30. feladat',
    focus: 'Érettségi Esettanulmányok és Csapdák',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Egymás Utáni Változások Csapdája',
        question: 'Egy termék árát felemelik 20%-kal, majd az új árat leárazzák 20%-kal. Hogyan viszonyul a végső ár az eredetihez?',
        figure: <SuccessiveChangesSvg size={170} />,
        options: [
          '4%-kal kevesebb lesz az eredeti árnál (96%)',
          'Pontosan megegyezik az eredeti árral (100%)',
          '4%-kal több lesz az eredeti árnál',
          '2%-kal csökken'
        ],
        correctAnswer: 0,
        hint: 'Szorozd össze a szorzótényezőket: 1,20 · 0,80 = ?',
        explanation: 'Összevont szorzó: 1,20 · 0,80 = 0,96, azaz az eredeti ár 96%-a marad meg, ami pontosan 4%-os veszteség!'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Kétszeri Leárazás',
        question: 'Egy tévét először leáraznak 10%-kal, majd az akciós árat még egyszer leárazzák 10%-kal. Hány százalékkal csökkent összesen az ára az eredetihez képest?',
        options: [
          '19%-kal',
          '20%-kal',
          '21%-kal',
          '18%-kal'
        ],
        correctAnswer: 0,
        hint: '0,90 · 0,90 = 0,81, azaz az ár 81%-a marad meg!',
        explanation: 'Összevont szorzó: 0,90 · 0,90 = 0,81. Az ár 81%-ra esett vissza, ami 100% - 81% = 19%-os összesített engedményt jelent (nem 20%-ot!).'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Százalékpont vs. Százalék',
        question: 'Egy banki hitelkamat 8%-ról 10%-ra emelkedett. Hány százalékkal nőtt a hitelkamat?',
        options: [
          '25%-kal nőtt (2 százalékpontos növekedés mellett)',
          '2%-kal nőtt',
          '12,5%-kal nőtt',
          '20%-kal nőtt'
        ],
        correctAnswer: 0,
        hint: 'A különbség 2 százalékpont. A 8-hoz képest a 2 növekmény: 2 / 8 = ?',
        explanation: 'Abszolút növekedés: 10 - 8 = 2 százalékpont. Relatív növekedés az eredeti kamathoz képest: 2 / 8 = 0,25 = 25%!'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Eredeti Ár Keresése Akció Után',
        question: 'Egy kabátot 30%-os akcióban 14 000 Ft-ért adnak el. Mennyi volt az eredeti ára a leárazás előtt?',
        options: [
          '20 000 Ft',
          '18 200 Ft',
          '19 600 Ft',
          '22 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'A 14 000 Ft az eredeti ár 70%-a (szorzó: 0,70)! 14 000 / 0,70 = ?',
        explanation: 'Eredeti · 0,70 = 14 000 ⟹ Eredeti = 14 000 / 0,70 = 20 000 Ft.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Visszaállítás Százaléka',
        question: 'Hány százalékos áremelés szükséges ahhoz, hogy egy 20%-os leárazás után pontosan visszakapjuk az eredeti árat?',
        options: [
          '25%-os emelés',
          '20%-os emelés',
          '30%-os emelés',
          '22,5%-os emelés'
        ],
        correctAnswer: 0,
        hint: 'A leárazott ár az eredeti 0,80-szorosa. Mennyivel kell megszorozni a 0,80-at, hogy 1,00 legyen? 1 / 0,80 = 1,25!',
        explanation: '0,80 · k = 1 ⟹ k = 1 / 0,80 = 1,25. Ez 125%-ot jelent, vagyis pontosan 25%-kal kell emelni a leárazott árat az eredeti visszaállításához!'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Többéves Változás',
        question: 'Egy vállalkozás bevétele 2022-ben 15%-kal nőtt, majd 2023-ban 10%-kal csökkent. Hány százalékkal változott a bevétel a 2021-es szinthez képest?',
        options: [
          '+3,5%-kal nőtt',
          '+5%-kal nőtt',
          '0%-kal, nem változott',
          '-2,5%-kal csökkent'
        ],
        correctAnswer: 0,
        hint: 'Szorozd össze: 1,15 · 0,90 = ?',
        explanation: 'Összevont szorzótényező: 1,15 · 0,90 = 1,035. Ez 103,5%-nak felel meg, tehát a bevétel összesen 3,5%-kal nőtt.'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Téglalap Területének Változása',
        question: 'Egy téglalap hosszát megnöveljük 20%-kal, a szélességét csökkentjük 10%-kal. Hány százalékkal változik a területe?',
        options: [
          '8%-kal nő',
          '10%-kal nő',
          '12%-kal nő',
          'Nem változik'
        ],
        correctAnswer: 0,
        hint: 'T = a · b. Az új terület: (1,20 · a) · (0,90 · b) = (1,20 · 0,90) · T = ?',
        explanation: 'Új terület szorzója: 1,20 · 0,90 = 1,08. A terület az eredeti 108%-a lesz, azaz pontosan 8%-kal növekszik.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Kocka Térfogatának Változása',
        question: 'Egy kocka minden élét megnöveljük 10%-kal. Hány százalékkal nő a kocka térfogata?',
        options: [
          '33,1%-kal',
          '30%-kal',
          '10%-kal',
          '40%-kal'
        ],
        correctAnswer: 0,
        hint: 'V = a³. Az új térfogat: (1,1 · a)³ = 1,1³ · a³ = 1,331 · V!',
        explanation: 'Új térfogat szorzója: 1,10³ = 1,331. A térfogat 133,1%-ra nő, ami 33,1%-os növekedést jelent (nem 30%-ot a 3D-s hatás miatt!).'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Reálbér Változás',
        question: 'Egy dolgozó fizetése 10%-kal nőtt, de az árak közben 20%-kal drágultak (infláció). Hogyan változott a fizetésének vásárlóértéke (reálbére)?',
        options: [
          'Kb. 8,33%-kal csökkent (1,10 / 1,20 ≈ 0,9167)',
          '10%-kal csökkent',
          'Nem változott',
          '5%-kal nőtt'
        ],
        correctAnswer: 0,
        hint: 'Reálbér index = Nominálbér index / Árindex = 1,10 / 1,20!',
        explanation: 'Reálbér szorzója: 1,10 / 1,20 = 0,9167 (91,67%). A fizetés vásárlóereje 100% - 91,67% = 8,33%-kal csökkent!'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: '1% Veszteség Feltétele',
        question: 'Mekkora az a p százalék, amellyel egy termék árát felemelve, majd ugyanennyivel leárazva pontosan 1% veszteséget kapunk?',
        options: [
          'p = 10%',
          'p = 1%',
          'p = 5%',
          'p = 20%'
        ],
        correctAnswer: 0,
        hint: '(1 + p/100)(1 - p/100) = 1 - (p/100)² = 0,99. Mennyi p?',
        explanation: '1 - (p/100)² = 0,99 ⟹ (p/100)² = 0,01 ⟹ p/100 = 0,10 ⟹ p = 10%. Ellenőrzés: 1,10 · 0,90 = 0,99 = 99% (1% veszteség).'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Százalékszámítás 3 Alapképlete',
    formula: 'E = A · (p / 100) | A = E / (p / 100) | p% = (E / A) · 100%',
    description: 'A: alap (100%), p%: százalékláb, E: százalékérték (rész).',
    badge: 'Alapképletek',
    badgeColor: 'amber'
  },
  {
    title: 'Szorzótényezős Gyors Módszer',
    formula: 'Növekedés (ÁFA, emelés): · (1 + p/100) | Csökkenés (akció): · (1 - p/100)',
    description: '+27% ÁFA ⟹ · 1,27. -15% leárazás ⟹ · 0,85. Visszafelé osztunk a tényezővel!',
    badge: 'Szorzótényezők',
    badgeColor: 'emerald'
  },
  {
    title: 'Kördiagram és Szögátszámítás',
    formula: 'α = 360° · (p / 100) | 1% = 3,6° | 25% = 90° (derékszög)',
    description: 'A 100% egy teljes 360°-os kör. A 25%-os szektor magyar szabványú negyedkörívvel és belső ponttal jelölt derékszög.',
    badge: 'Geometria',
    badgeColor: 'indigo'
  },
  {
    title: 'Egymás Utáni Változások Csapdája',
    formula: 'Összevont szorzó: k1 · k2 (pl. 1,20 · 0,80 = 0,96 ⟹ 4% veszteség!)',
    description: 'A második változás alapja már a megváltozott új összeg. Ezért +20% és -20% után 960 Ft marad 1000 Ft-ból!',
    badge: 'Típuscsapda',
    badgeColor: 'rose'
  }
];

export const PercentageQuiz: React.FC<PercentageQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Százalékszámítás Kvíz"
      subtitle="30 válogatott feladat 3 szinten: alapképletek, szorzótényezők, 27% ÁFA, kördiagramok és érettségi csapdák"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • ％ GYAKORLÁS"
      themeColor="amber"
      quizId="g9-szamok-szazalek-quiz"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a százalékos feladványokat a helyes végeredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PercentageMatcher
              key={`pct-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a változásokat, szorzótényezőket és képleteket!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PercentageSorter
              key={`pct-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default PercentageQuiz;
