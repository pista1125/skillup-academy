import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  OpenIntervalSvg,
  ClosedIntervalSvg,
  HalfOpenIntervalSvg,
  InfiniteIntervalSvg,
  IntervalIntersectionSvg,
  IntervalUnionSvg,
  IntervalDifferenceSvg,
  DiscreteVsContinuousSvg
} from './IntervalsFigures';
import { MoveHorizontal, Compass, Layers, CheckCircle2, ArrowRightLeft, LayoutGrid } from 'lucide-react';
import { IntervalsMatcher } from './IntervalsMatcher';
import { IntervalsSorter } from './IntervalsSorter';

interface IntervalsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Intervallumok Azonosítása és Alapfogalmai (Könnyű)',
    subtitle: 'Zárt, nyílt, félig nyílt intervallumok, végpontok tartozása és számegyenes leolvasás.',
    range: '1 - 10. feladat',
    focus: 'Jelölések és Alapismeretek',
    questions: [
      {
        id: 'inq1-1',
        questionTypeBadge: 'Zárt Intervallum',
        question: 'Melyik egyenlőtlenség határozza meg a [-2, 3] zárt intervallumot?',
        figure: <ClosedIntervalSvg a={-2} b={3} size={150} label="[-2, 3]" />,
        options: [
          '-2 ≤ x ≤ 3',
          '-2 < x < 3',
          '-2 ≤ x < 3',
          '-2 < x ≤ 3'
        ],
        correctAnswer: 0,
        hint: 'A szögletes zárójel azt jelenti, hogy mindkét végpont beletartozik az intervallumba!',
        explanation: 'A szögletes zárójeles [a, b] alak zárt intervallumot jelöl, ahol a ≤ x ≤ b, azaz mindkét határérték megengedett (teli karika).'
      },
      {
        id: 'inq1-2',
        questionTypeBadge: 'Nyílt Intervallum',
        question: 'Hogyan jelöljük a -1 < x < 4 szigorú egyenlőtlenséget kielégítő valós számok halmazát?',
        figure: <OpenIntervalSvg a={-1} b={4} size={150} label="(-1, 4)" />,
        options: [
          '(-1, 4) vagy ]-1, 4[',
          '[-1, 4]',
          '[-1, 4)',
          '(-1, 4]'
        ],
        correctAnswer: 0,
        hint: 'A szigorú egyenlőtlenség miatt a végpontok nem tartoznak bele!',
        explanation: 'A -1 < x < 4 halmazt kerek zárójellel (-1, 4) vagy fordított szögletes zárójellel ]-1, 4[ jelöljük. Számegyenesen üres karikák jelzik a végpontokat.'
      },
      {
        id: 'inq1-3',
        questionTypeBadge: 'Végpont Tartozás',
        question: 'Eleme-e a 2 szám a [-3, 2) intervallumnak?',
        figure: <HalfOpenIntervalSvg a={-3} b={2} leftClosed={true} size={150} label="[-3, 2)" />,
        options: [
          'Nem, mert a jobb oldali kerek zárójel azt jelenti, hogy a 2 nem tartozik bele',
          'Igen, mert a 2 a jobb végpontja',
          'Igen, mert a bal oldal zárt',
          'Csak akkor, ha x egész szám'
        ],
        correctAnswer: 0,
        hint: 'A kerek zárójel (vagy nyitott szögletes kapu) kizárja az adott értéket!',
        explanation: 'A [-3, 2) intervallum feltétele -3 ≤ x < 2. Mivel x szigorúan kisebb 2-nél, a 2 nem eleme a halmaznak (2 ∉ [-3, 2)).'
      },
      {
        id: 'inq1-4',
        questionTypeBadge: 'Végpont Tartozás',
        question: 'Eleme-e a -3 szám a [-3, 2) intervallumnak?',
        figure: <HalfOpenIntervalSvg a={-3} b={2} leftClosed={true} size={150} label="[-3, 2)" />,
        options: [
          'Igen, mert a bal oldali szögletes zárójel megengedi az egyenlőséget (-3 ≤ x)',
          'Nem, mert a negatív számok nem lehetnek zártak',
          'Nem, mert a jobb oldala nyílt',
          'Csak ha -3 > 0'
        ],
        correctAnswer: 0,
        hint: 'A szögletes zárójel a határ beletartozását jelöli!',
        explanation: 'Mivel a bal oldalon szögletes zárójel van (teli karika a számegyenesen), az x = -3 érték beletartozik a halmazba (-3 ∈ [-3, 2)).'
      },
      {
        id: 'inq1-5',
        questionTypeBadge: 'Számegyenes Karikák',
        question: 'Mit jelent a számegyenesen az ÜRES KARIKA (○) egy intervallum végpontjában?',
        figure: <OpenIntervalSvg a={0} b={4} size={150} label="(0, 4) nyílt" />,
        options: [
          'Az adott pont nem tartozik bele az intervallumba (nyílt végpont)',
          'Az adott pont kötelezően beletartozik az intervallumba',
          'A pont értéke nulla',
          'A ponttól jobbra nincs több szám'
        ],
        correctAnswer: 0,
        hint: 'A teli karika tartalmazza, az üres karika nem tartalmazza!',
        explanation: 'Az üres karika (○) nyílt határt jelez, azaz az adott végpont maga nem eleme az intervallumnak, csak a nála kisebb/nagyobb értékek.'
      },
      {
        id: 'inq1-6',
        questionTypeBadge: 'Félig Nyílt Intervallum',
        question: 'Melyik intervallum felel meg a következő feltételnek: 1 < x ≤ 5?',
        figure: <HalfOpenIntervalSvg a={1} b={5} leftClosed={false} size={150} label="(1, 5]" />,
        options: [
          '(1, 5] vagy ]1, 5]',
          '[1, 5)',
          '[1, 5]',
          '(1, 5)'
        ],
        correctAnswer: 0,
        hint: 'Balról szigorú egyenlőtlenség (nyílt), jobbról megengedő (zárt)!',
        explanation: 'Az 1 < x feltétel miatt balról kerek/nyílt zárójel (, az x ≤ 5 feltétel miatt jobbról szögletes zárt zárójel ] szükséges: (1, 5].'
      },
      {
        id: 'inq1-7',
        questionTypeBadge: 'Diszkrét vs Folytonos',
        question: 'Hány elemű a [2, 5] valós intervallum?',
        figure: <DiscreteVsContinuousSvg size={180} />,
        options: [
          'Végtelen sok eleme van',
          'Pontosan 4 eleme van (2, 3, 4, 5)',
          'Pontosan 3 eleme van',
          'Csak 2 eleme van (a 2 és az 5)'
        ],
        correctAnswer: 0,
        hint: 'A valós számok folytonosak! Nem csak az egészek számítanak.',
        explanation: 'A [2, 5] a 2 és 5 közötti ÖSSZES valós számot tartalmazza (pl. 2,1; √7; 3,1415...; 4,999 stb.), így végtelen sok pontból áll.'
      },
      {
        id: 'inq1-8',
        questionTypeBadge: 'Hány Egész Szám?',
        question: 'Hány darab EGÉSZ szám található a (-2, 3] intervallumban?',
        figure: <HalfOpenIntervalSvg a={-2} b={3} leftClosed={false} size={150} label="(-2, 3]" />,
        options: [
          '5 db (-1, 0, 1, 2, 3)',
          '6 db (-2, -1, 0, 1, 2, 3)',
          '4 db (0, 1, 2, 3)',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        hint: 'Vigyázz: a -2 nyílt (kiesik), de a 3 zárt (benne van)!',
        explanation: 'A szóba jövő egész számok: -1, 0, 1, 2, 3 (a -2 nem, mert nyílt; a 3 igen, mert zárt). Ez összesen 5 darab egész szám.'
      },
      {
        id: 'inq1-9',
        questionTypeBadge: 'Valós Szám Tartozás',
        question: 'Eleme-e a π ≈ 3,1416 szám a [3, 4] intervallumnak?',
        figure: <ClosedIntervalSvg a={3} b={4} size={150} label="[3, 4]" />,
        options: [
          'Igen, mert 3 ≤ 3,1416 ≤ 4',
          'Nem, mert a π irracionális szám',
          'Nem, mert csak egész számok lehetnek az intervallumban',
          'Csak kör kerületének számításakor'
        ],
        correctAnswer: 0,
        hint: 'A valós intervallum az irracionális számokat is magában foglalja!',
        explanation: 'Az intervallumok a valós számok (R) részhalmazai, így az összes irracionális számot is tartalmazzák, ami a két végpont közé esik. Mivel 3 ≤ π ≤ 4, ezért π ∈ [3, 4].'
      },
      {
        id: 'inq1-10',
        questionTypeBadge: 'Üres Intervallum',
        question: 'Mit ad a (3, 3) nyílt intervallum?',
        figure: <OpenIntervalSvg a={3} b={3} size={140} label="(3, 3) = ∅" />,
        options: [
          'Az üres halmazt (∅), mert nincs olyan valós szám, amelyre 3 < x < 3',
          'A {3} egyelemű halmazt',
          'A [0, 3] intervallumot',
          'A nullát'
        ],
        correctAnswer: 0,
        hint: 'Lehet egy szám szigorúan nagyobb és szigorúan kisebb is 3-nál egyszerre?',
        explanation: 'A 3 < x < 3 feltételnek egyetlen valós szám sem felel meg, ezért (3, 3) = ∅ (üres halmaz). Ezzel szemben [3, 3] = {3} lenne.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Végtelen Félegyenesek és Alapműveletek (Közepes)',
    subtitle: '(-∞, b] és [a, +∞) félegyenesek, egyenlőtlenségek megoldása és alapvető metszet, unió.',
    range: '11 - 20. feladat',
    focus: 'Végtelen Intervallumok és Műveletek',
    questions: [
      {
        id: 'inq2-1',
        questionTypeBadge: 'Végtelen Zárójel Szabály',
        question: 'Milyen zárójel állhat a -∞ vagy a +∞ szimbólum mellett egy intervallumban?',
        figure: <InfiniteIntervalSvg bound={2} direction="right" isClosed={true} size={160} label="[2, +∞)" />,
        options: [
          'Kizárólag kerek (nyílt) zárójel: ( vagy )',
          'Kizárólag szögletes (zárt) zárójel: [ vagy ]',
          'Bármilyen, attól függően, hogy a feladat mit kér',
          'Pozitív végtelennél zárt, negatívnál nyílt'
        ],
        correctAnswer: 0,
        hint: 'A végtelen nem egy konkrét szám, amit elérhetnénk és bezárhatnánk!',
        explanation: 'Mivel a végtelen (±∞) nem konkrét valós szám, hanem egy határérték, soha nem tartalmazhatja egy halmaz elemként. Ezért mellette MINDIG kerek/nyílt zárójel áll: (-∞, b] vagy [a, +∞).'
      },
      {
        id: 'inq2-2',
        questionTypeBadge: 'Félegyenes Alak',
        question: 'Melyik intervallum írja le az x ≥ -1 feltételt?',
        figure: <InfiniteIntervalSvg bound={-1} direction="right" isClosed={true} size={160} label="[-1, +∞)" />,
        options: [
          '[-1, +∞)',
          '(-1, +∞)',
          '(-∞, -1]',
          '[-1, 1]'
        ],
        correctAnswer: 0,
        hint: 'Az x nagyobb vagy egyenlő -1-nél, tehát -1-től jobbra tart a végtelenbe!',
        explanation: 'Az x ≥ -1 egy alulról korlátos, jobbra a végtelenbe nyúló félegyenes. Mivel megengedett az egyenlőség, -1-nél zárt: [-1, +∞).'
      },
      {
        id: 'inq2-3',
        questionTypeBadge: 'Félegyenes Alak',
        question: 'Melyik intervallum írja le az x < 5 feltételt?',
        figure: <InfiniteIntervalSvg bound={5} direction="left" isClosed={false} size={160} label="(-∞, 5)" />,
        options: [
          '(-∞, 5)',
          '(-∞, 5]',
          '(5, +∞)',
          '[5, +∞)'
        ],
        correctAnswer: 0,
        hint: 'Balról nyitott a negatív végtelen felé, 5-nél szigorú egyenlőtlenség (nyílt)!',
        explanation: 'Az x < 5 felülről korlátos, balra a -∞ felé tartó félegyenes. Mivel szigorú kisebb, az 5-nél nyílt kerek zárójel szerepel: (-∞, 5).'
      },
      {
        id: 'inq2-4',
        questionTypeBadge: 'Intervallum Metszet',
        question: 'Mennyi a [-3, 2] és a [0, 5] intervallumok metszete: [-3, 2] ∩ [0, 5]?',
        figure: <IntervalIntersectionSvg a1={-3} b1={2} a2={0} b2={5} size={180} />,
        options: [
          '[0, 2]',
          '[-3, 5]',
          '[0, 5]',
          '[-3, 0]'
        ],
        correctAnswer: 0,
        hint: 'Közös rész: a bal végpontok közül a nagyobbik, a jobb végpontok közül a kisebbik!',
        explanation: 'A metszet a közös pontok halmaza. A bal határ max(-3, 0) = 0, a jobb határ min(2, 5) = 2. Mivel mindkét végpont mindkét intervallumnak eleme, a metszet [0, 2].'
      },
      {
        id: 'inq2-5',
        questionTypeBadge: 'Intervallum Unió',
        question: 'Mennyi a [-1, 3] és az [1, 6] intervallumok uniója: [-1, 3] ∪ [1, 6]?',
        figure: <IntervalUnionSvg a1={-1} b1={3} a2={1} b2={6} size={180} />,
        options: [
          '[-1, 6]',
          '[1, 3]',
          '[-1, 1]',
          '[3, 6]'
        ],
        correctAnswer: 0,
        hint: 'Az unió egyesíti a két átfedő szakaszt a legkisebbtől a legnagyobbig!',
        explanation: 'Mivel a két intervallum átfedi egymást (metszetük nem üres), egyesítésük egyetlen összefüggő szakaszt alkot a legkisebb értéktől (-1) a legnagyobbig (6): [-1, 6].'
      },
      {
        id: 'inq2-6',
        questionTypeBadge: 'Diszjunkt Metszet',
        question: 'Mennyi a [-4, -1] és a [2, 5] intervallumok metszete?',
        figure: <OpenIntervalSvg a={-4} b={-1} size={140} label="[-4, -1] ∩ [2, 5] = ∅" />,
        options: [
          '∅ (üres halmaz)',
          '[-1, 2]',
          '[-4, 5]',
          '{0}'
        ],
        correctAnswer: 0,
        hint: 'Van olyan valós szám, amely egyszerre esik a negatív és a pozitív szakaszba?',
        explanation: 'A [-4, -1] és a [2, 5] intervallumok között nincs közös pont (diszjunktak), a számegyenesen el vannak választva egymástól. Ezért metszetük ∅ (üres halmaz).'
      },
      {
        id: 'inq2-7',
        questionTypeBadge: 'Végtelen Félegyenesek Metszete',
        question: 'Mennyi a (-∞, 3] ∩ [-1, +∞) művelet eredménye?',
        figure: <ClosedIntervalSvg a={-1} b={3} size={150} label="[-1, 3]" />,
        options: [
          '[-1, 3]',
          '(-∞, +∞)',
          '∅',
          '(-1, 3)'
        ],
        correctAnswer: 0,
        hint: 'Olyan x értékek, amelyekre x ≤ 3 ÉS x ≥ -1 egyszerre teljesül!',
        explanation: 'Az x ≤ 3 és x ≥ -1 együttes feltétele: -1 ≤ x ≤ 3. Ez a [-1, 3] zárt korlátos intervallum.'
      },
      {
        id: 'inq2-8',
        questionTypeBadge: 'Végtelen Félegyenesek Uniója',
        question: 'Mennyi a (-∞, 2] ∪ [0, +∞) művelet eredménye?',
        figure: <InfiniteIntervalSvg bound={0} direction="right" size={150} label="(-∞, +∞) = R" />,
        options: [
          '(-∞, +∞) azaz a teljes valós számegyenes (R)',
          '[0, 2]',
          '[2, +∞)',
          '(-∞, 0]'
        ],
        correctAnswer: 0,
        hint: 'A két félegyenes átfedi egymást a [0, 2] szakaszon, így lefedik a teljes számegyenest!',
        explanation: 'A balról érkező (-∞, 2] és a jobbra tartó [0, 2] a 0 és 2 között átfed, így együttesen a teljes valós számegyenes minden pontját tartalmazzák: (-∞, +∞) = R.'
      },
      {
        id: 'inq2-9',
        questionTypeBadge: 'Egypontos Metszet',
        question: 'Mennyi a [-3, 1] ∩ [1, 4] metszet eredménye?',
        figure: <ClosedIntervalSvg a={1} b={1} size={140} label="{1}" />,
        options: [
          '{1} (egyetlen pontból álló halmaz)',
          '∅ (üres halmaz)',
          '[1, 1] nyílt intervallum',
          '[-3, 4]'
        ],
        correctAnswer: 0,
        hint: 'Mindkét intervallumnak zárt végpontja az 1!',
        explanation: 'Mivel az 1 mind a [-3, 1]-nek, mind az [1, 4]-nek eleme (mindkettőnél zárt), egyetlen közös pontjuk van: {1}.'
      },
      {
        id: 'inq2-10',
        questionTypeBadge: 'Nyílt Érintkezési Pont',
        question: 'Mennyi a [-3, 1) ∩ [1, 4] metszet eredménye?',
        figure: <OpenIntervalSvg a={1} b={1} size={140} label="∅" />,
        options: [
          '∅ (üres halmaz), mert az 1 nem eleme a bal oldali intervallumnak',
          '{1}',
          '[-3, 4]',
          '[1, 1]'
        ],
        correctAnswer: 0,
        hint: 'A bal oldali intervallumnál az 1 nyílt: 1 ∉ [-3, 1)!',
        explanation: 'Bár az 1 eleme a jobb oldali [1, 4] halmaznak, a bal oldali [-3, 1) nyílt intervallumnak NEM eleme. Mivel nincs olyan pont, ami mindkettőben benne lenne, a metszet ∅.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Különbségképzés, Végpont-vizsgálat és Komplementer (Nehéz)',
    subtitle: 'Mesterfokú intervallumműveletek, a végpontok megváltozása különbségképzéskor és összetett feladatok.',
    range: '21 - 30. feladat',
    focus: 'Különbségképzés és Érettségi Típusfeladatok',
    questions: [
      {
        id: 'inq3-1',
        questionTypeBadge: 'Különbség Zárt Végponttal',
        question: 'Mennyi a [1, 5] \\ [3, 7] művelet eredménye?',
        figure: <IntervalDifferenceSvg size={180} />,
        options: [
          '[1, 3)',
          '[1, 3]',
          '(1, 3)',
          '[1, 5]'
        ],
        correctAnswer: 0,
        hint: 'Mivel a kivont halmazban a 3 zárt volt (tehát elvontuk), a megmaradó részben már nem szerepelhet!',
        explanation: 'Az [1, 5] halmazból levonjuk a [3, 7] elemeit. Mivel a 3 eleme volt a kivont halmaznak, a 3-as pont kiesik, így az eredmény [1, 3) (3-nál nyílt).'
      },
      {
        id: 'inq3-2',
        questionTypeBadge: 'Különbség Nyílt Végponttal',
        question: 'Mennyi a [1, 5] \\ (3, 7] művelet eredménye?',
        figure: <ClosedIntervalSvg a={1} b={3} size={150} label="[1, 3]" />,
        options: [
          '[1, 3]',
          '[1, 3)',
          '(1, 3]',
          '(3, 5]'
        ],
        correctAnswer: 0,
        hint: 'A kivont (3, 7] halmaz NEM tartalmazta a 3-at! Tehát a 3 nem lett elvonva!',
        explanation: 'Mivel a kivont (3, 7] halmaz 3-nál nyílt volt (nem vonta el a 3-at), a 3 bent marad az eredeti halmazból. Ezért az eredmény [1, 3] (3-nál zárt).'
      },
      {
        id: 'inq3-3',
        questionTypeBadge: 'Belső Rész Kivonása',
        question: 'Mennyi a [-2, 6] \\ (0, 3) művelet eredménye?',
        figure: <HalfOpenIntervalSvg a={-2} b={0} leftClosed={true} size={150} label="[-2, 0] ∪ [3, 6]" />,
        options: [
          '[-2, 0] ∪ [3, 6]',
          '[-2, 0) ∪ (3, 6]',
          '[-2, 0] ∪ (3, 6]',
          '(0, 3)'
        ],
        correctAnswer: 0,
        hint: 'Egy középső nyílt darabot vágunk ki, így mindkét határon zárt marad a megmaradt két rész!',
        explanation: 'A kivont (0, 3) nyílt volt mindkét végén, így a 0 és a 3 NEM került elvonásra, mindkettő bent marad. Az eredmény két diszjunkt zárt szakasz uniója: [-2, 0] ∪ [3, 6].'
      },
      {
        id: 'inq3-4',
        questionTypeBadge: 'Valós Komplementer',
        question: 'Mennyi a [2, 5) intervallum komplementere a valós számok (R) halmazára nézve: R \\ [2, 5)?',
        figure: <InfiniteIntervalSvg bound={2} direction="left" size={150} label="(-∞, 2) ∪ [5, +∞)" />,
        options: [
          '(-∞, 2) ∪ [5, +∞)',
          '(-∞, 2] ∪ (5, +∞)',
          '(-∞, 2) ∪ (5, +∞)',
          '[2, 5]'
        ],
        correctAnswer: 0,
        hint: 'A 2 zárt volt (kiesik ⟹ nyílt lesz), az 5 nyílt volt (nem vontuk el ⟹ zárt lesz)!',
        explanation: 'A komplementer az összes olyan valós szám, ami nincs benne a [2, 5)-ben. A 2 benne volt, így elvontuk (2-nél nyílt: (-∞, 2)); az 5 nem volt benne, így a komplementerben bent van (5-nél zárt: [5, +∞)).'
      },
      {
        id: 'inq3-5',
        questionTypeBadge: 'Félegyenes Különbsége',
        question: 'Mennyi a [0, +∞) \\ [4, +∞) művelet eredménye?',
        figure: <HalfOpenIntervalSvg a={0} b={4} leftClosed={true} size={150} label="[0, 4)" />,
        options: [
          '[0, 4)',
          '[0, 4]',
          '(0, 4)',
          '[4, +∞)'
        ],
        correctAnswer: 0,
        hint: 'A [0, +∞) félegyenesből levonjuk a 4-től jobbra eső zárt részt!',
        explanation: 'A 0 és 4 közötti rész megmarad. Mivel a 4 benne volt a kivont halmazban, elvonásra került, így 4-nél nyílt lesz: [0, 4).'
      },
      {
        id: 'inq3-6',
        questionTypeBadge: 'Diszjunkt Unió Írásmódja',
        question: 'Egyszerűsíthető-e egyetlen intervallummá a [-3, 1] ∪ [3, 7] unió?',
        figure: <ClosedIntervalSvg a={-3} b={1} size={150} label="[-3, 1] ∪ [3, 7]" />,
        options: [
          'Nem, mert a két intervallum között lyuk van (diszjunktak), így csak unió jellel írható fel',
          'Igen, egyenlő [-3, 7]-tel',
          'Igen, egyenlő [1, 3]-mal',
          'Igen, egyenlő az üres halmazzal'
        ],
        correctAnswer: 0,
        hint: 'Az 1 és 3 közötti számok (pl. 2) egyik intervallumnak sem elemei!',
        explanation: 'Mivel a két intervallum nem fedi át egymást és nem is érintkezik (az (1, 3) szakasz hiányzik), az unió nem ad egyetlen összefüggő szakaszt. Nem egyszerűsíthető, csak unióként írható fel.'
      },
      {
        id: 'inq3-7',
        questionTypeBadge: 'Három Halmazos Művelet',
        question: 'Ha A = [-2, 4], B = (1, 5) és C = [3, 8], mennyi (A ∩ B) ∩ C?',
        figure: <IntervalIntersectionSvg a1={1} b1={4} a2={3} b2={8} size={180} />,
        options: [
          '[3, 4]',
          '(1, 4]',
          '(3, 4)',
          '[1, 8]'
        ],
        correctAnswer: 0,
        hint: 'Először A ∩ B = (1, 4]. Ezt metszed C = [3, 8]-cal!',
        explanation: '1. lépés: A ∩ B = (1, 4]. 2. lépés: (1, 4] ∩ [3, 8]. A közös rész bal határa max(1, 3) = 3 (zárt), jobb határa min(4, 8) = 4 (zárt). Eredmény: [3, 4].'
      },
      {
        id: 'inq3-8',
        questionTypeBadge: 'Egyenlőtlenség Rendszer',
        question: 'Melyik intervallum a { 2x - 1 ≥ 3  ÉS  x + 2 < 7 } egyenlőtlenség-rendszer megoldáshalmaza?',
        figure: <HalfOpenIntervalSvg a={2} b={5} leftClosed={true} size={150} label="[2, 5)" />,
        options: [
          '[2, 5)',
          '(2, 5]',
          '[2, 5]',
          '(2, +∞)'
        ],
        correctAnswer: 0,
        hint: 'Oldd meg a két egyenlőtlenséget külön: 2x ≥ 4 és x < 5!',
        explanation: '1. egyenlőtlenség: 2x - 1 ≥ 3 ⟹ 2x ≥ 4 ⟹ x ≥ 2 (azaz [2, +∞)). 2. egyenlőtlenség: x + 2 < 7 ⟹ x < 5 (azaz (-∞, 5)). A kettő metszete: [2, +∞) ∩ (-∞, 5) = [2, 5).'
      },
      {
        id: 'inq3-9',
        questionTypeBadge: 'Teljes Részhalmaz Kivonása',
        question: 'Mennyi a [2, 4] \\ [-1, 6] művelet eredménye?',
        figure: <ClosedIntervalSvg a={2} b={4} size={140} label="[2, 4] ⊆ [-1, 6] ⟹ ∅" />,
        options: [
          '∅ (üres halmaz), mert [2, 4] része a kivont [-1, 6] halmaznak',
          '[-1, 2)',
          '(4, 6]',
          '[-1, 6]'
        ],
        correctAnswer: 0,
        hint: 'Ha egy halmazból kivonunk egy nála bővebb, őt tartalmazó halmazt, mi marad?',
        explanation: 'Mivel [2, 4] ⊆ [-1, 6], a kivont halmaz a [2, 4] MINDEN pontját tartalmazza, így az összes pontja elvonásra kerül. Eredmény: ∅.'
      },
      {
        id: 'inq3-10',
        questionTypeBadge: 'Érettségi Becsapós Kérdés',
        question: 'Igaz-e, hogy ha A és B intervallumok, akkor A ∩ B mindig egyetlen intervallum (vagy üres halmaz)?',
        figure: <IntervalIntersectionSvg a1={-1} b1={2} a2={0} b2={4} size={160} />,
        options: [
          'IGAZ, két intervallum metszete mindig egyetlen intervallum, egyetlen pont vagy az üres halmaz',
          'HAMIS, metszetként két különálló szakasz is keletkezhet',
          'Csak akkor igaz, ha mindkét intervallum zárt',
          'Csak pozitív számok esetén igaz'
        ],
        correctAnswer: 0,
        hint: 'Tud két intervallum úgy átfedni, hogy a közös részükben lyuk keletkezzen?',
        explanation: 'IGAZ! A folytonos szakaszok konvexitása miatt két intervallum közös része soha nem szakadhat szét több darabra: vagy nincs közös rész (∅), vagy egyetlen pont, vagy egyetlen folytonos intervallum.'
      }
    ]
  }
};

const intervalsCheatSheet: CheatSheetCard[] = [
  {
    title: 'Zárójelek és Végpontok Szabálya',
    category: 'Jelölések',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div><strong>[a, b] (Zárt):</strong> a ≤ x ≤ b. Végpontok <strong>beletartoznak</strong> (teli karika ●).</div>
        <div><strong>(a, b) / ]a, b[ (Nyílt):</strong> a &lt; x &lt; b. Végpontok <strong>NEM tartoznak bele</strong> (üres karika ○).</div>
        <div><strong>[a, b) / (a, b]:</strong> Félig nyílt / zárt intervallumok.</div>
        <div className="text-amber-700 dark:text-amber-300 font-bold">⚠️ ±∞ mellé MINDIG kerek zárójel jár: (-∞, b] vagy [a, +∞)!</div>
      </div>
    )
  },
  {
    title: 'Műveleti Szabályok Számegyenesen',
    category: 'Műveletek',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
        <div>• <strong>Metszet (∩):</strong> Közös szakasz (ahol mindkettő jelen van).</div>
        <div>• <strong>Unió (∪):</strong> Egyesített szakasz (ha érintkeznek / átfednek).</div>
        <div>• <strong>Különbség (\):</strong> Elsőből levonjuk a másodikat.</div>
        <div className="text-rose-600 dark:text-rose-400 font-bold font-sans">
          🔥 Ha a kivont halmazban zárt volt a határpont ⟹ a megmaradóban NYÍLT lesz ([1, 5] \ [3, 7] = [1, 3)).
        </div>
      </div>
    )
  }
];

export const IntervalsQuiz: React.FC<IntervalsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      topicId="g9-komb-intervallumok-quiz"
      topicTitle="9. Osztály - Intervallumok Gyakorló Kvíz"
      themeColor="cyan"
      levels={quizLevels}
      cheatSheet={intervalsCheatSheet}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd az intervallumokat a grafikus ábrájukkal és algebrai alakjukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <IntervalsMatcher
              key={`intervals-matcher-${level}`}
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
          subtitle: 'Kategorizáld a számokat és intervallumokat korlátosság és zártság szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <IntervalsSorter
              key={`intervals-sorter-${level}`}
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

export default IntervalsQuiz;
