import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { AxialMatcher } from './AxialMatcher';
import { AxialSorter } from './AxialSorter';
import {
  AxialReflectionBasicsSvg,
  CoordinateAxialSvg,
  SymmetryAxesShapesSvg
} from './AxialFigures';
import { FlipHorizontal, Compass, Sparkles, Maximize2, RotateCw, CheckCircle2 } from 'lucide-react';

interface AxialQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Tengelyes Tükrözés Alapjai és Fixpontok (Könnyű)',
    subtitle: 'Definíció, távolságtartás, tengely fixpontjai és koordinátás alapszabályok.',
    range: '1 - 10. feladat',
    focus: 'Tengelyes tükrözés geometriai definíciója',
    questions: [
      {
        id: 'aq1-1',
        questionTypeBadge: 'Tengelyes Tükrözés Definíciója',
        question: 'Mi a tengelyes tükrözés definíciója a síkban, ha a P pont nem illeszkedik a t tükörtengelyre?',
        figure: <AxialReflectionBasicsSvg size={220} />,
        options: [
          'A t egyenes a PP\' szakasz felezőmerőlegese',
          'A t egyenes párhuzamos a PP\' szakasszal',
          'A P és P\' pontok távolsága a t-től mindig nulla',
          'A PP\' szakasz 45°-os szöget zár be a t-vel'
        ],
        correctAnswer: 0,
        hint: 'A tükörtengely merőleges a vetítő szakaszra, és felezi azt.',
        explanation: 'A tengelyes tükrözés definíciója szerint a t tükörtengely merőlegesen felezi a P pontot és P\' képét összekötő PP\' szakaszt.'
      },
      {
        id: 'aq1-2',
        questionTypeBadge: 'Fixpontok Halmaza',
        question: 'Mely pontok alkotják a tengelyes tükrözés fixpontjait (amelyek képe önmaguk)?',
        options: [
          'A t tükörtengely összes pontja',
          'Csak a koordináta-rendszer origója',
          'A t tengelyre merőleges egyenesek metszéspontja',
          'Nincsenek fixpontjai'
        ],
        correctAnswer: 0,
        hint: 'Minden olyan pont a helyén marad, ami rajta fekszik a tükörtengelyen.',
        explanation: 'Ha P rajta van a t egyenesen (P ∈ t), akkor P\' = P. Tehát a tükörtengely minden egyes pontja fixpont (pontonként fix egyenes).'
      },
      {
        id: 'aq1-3',
        questionTypeBadge: 'Körüljárási Irány',
        question: 'Hogyan változik egy síkidom körüljárási iránya a tengelyes tükrözés során?',
        options: [
          'Megfordul (az óramutatóval ellentétes irány óramutatóval egyezővé válik)',
          'Változatlan marad, nem fordul meg',
          '90°-kal elfordul',
          'Csak négyszögeknél változik meg'
        ],
        correctAnswer: 0,
        hint: 'Nézz a valódi tükörbe: a jobb kezed a tükörkép bal keze lesz.',
        explanation: 'A síkbeli tengelyes tükrözés ellentétes körüljárású (másodfajú) egybevágóság: megfordítja a pontok körüljárási irányát.'
      },
      {
        id: 'aq1-4',
        questionTypeBadge: 'Távolságtartás',
        question: 'Egy AB szakasz hossza 6,4 cm. Mennyi a tengelyes tükörképének (A\'B\') hossza?',
        options: ['6,4 cm', '12,8 cm', '3,2 cm', 'Függ a tengely dőlésszögétől'],
        correctAnswer: 0,
        hint: 'A tengelyes tükrözés egybevágósági transzformáció.',
        explanation: 'A tengelyes tükrözés egybevágóság, vagyis távolságtartó: bármely két pont távolsága megegyezik a képpontok távolságával (|A\'B\'| = |AB| = 6,4 cm).'
      },
      {
        id: 'aq1-5',
        questionTypeBadge: 'Szögtartás',
        question: 'Egy háromszög egyik belső szöge 55°. Mekkora lesz ennek a szögnek a tengelyes tükörképe?',
        options: ['55°', '125°', '35°', '110°'],
        correctAnswer: 0,
        hint: 'Az egybevágósági transzformációk megtartják a szögek nagyságát.',
        explanation: 'A tengelyes tükrözés szögtartó transzformáció: minden szög képe egy vele azonos nagyságú szög (55°).'
      },
      {
        id: 'aq1-6',
        questionTypeBadge: 'x-tengelyre Tükrözés',
        question: 'A P(4; 5) pontot tükrözzük a derékszögű koordináta-rendszer x-tengelyére. Mik lesznek a P\' képpont koordinátái?',
        figure: <CoordinateAxialSvg size={200} />,
        options: ['(4; −5)', '(−4; 5)', '(−4; −5)', '(5; 4)'],
        correctAnswer: 0,
        hint: 'Az x-tengelyre tükrözésnél az x koordináta nem változik, az y az ellentettjére vált: (x; y) ↦ (x; −y).',
        explanation: 'P(x; y) ↦ P\'(x; −y), így P(4; 5) tükörképe az x-tengelyre P\'(4; −5).'
      },
      {
        id: 'aq1-7',
        questionTypeBadge: 'y-tengelyre Tükrözés',
        question: 'A Q(−3; 7) pontot tükrözzük az y-tengelyre. Mik lesznek a képpont koordinátái?',
        options: ['(3; 7)', '(−3; −7)', '(3; −7)', '(7; −3)'],
        correctAnswer: 0,
        hint: 'Az y-tengelyre tükrözésnél az x koordináta az ellentettjére vált: (x; y) ↦ (−x; y).',
        explanation: 'Q(−3; 7) tükörképe az y-tengelyre Q\'(−(−3); 7) = Q\'(3; 7).'
      },
      {
        id: 'aq1-8',
        questionTypeBadge: 'Párhuzamos Egyenes Képe',
        question: 'Milyen helyzetű az e egyenes e\' tengelyes tükörképe, ha az e egyenes párhuzamos a t tükörtengellyel (e || t)?',
        options: [
          'Párhuzamos a tükörtengellyel és az eredeti egyenessel is (e\' || t)',
          'Merőleges a tükörtengelyre',
          'Metszi a tükörtengelyt 45°-ban',
          'Egybeesik a tükörtengellyel'
        ],
        correctAnswer: 0,
        hint: 'A távolság a tengelytől a túloldalon is pontosan ugyanakkora marad.',
        explanation: 'Ha e || t, akkor a tükörkép e\' is párhuzamos lesz t-vel a túloldalon, és d(e, t) = d(e\', t).'
      },
      {
        id: 'aq1-9',
        questionTypeBadge: 'Fixegyenesek',
        question: 'A t tükörtengelyen kívül mely egyenesek a tengelyes tükrözés fixegyenesei (amelyek önmagukba képződnek le)?',
        options: [
          'Minden olyan egyenes, amely merőleges a t tükörtengelyre',
          'Minden olyan egyenes, amely párhuzamos a t tükörtengellyel',
          'Csak az x és y koordinátatengelyek',
          'Nincsenek más fixegyenesek'
        ],
        correctAnswer: 0,
        hint: 'Ha egy egyenes merőleges a tengelyre, pontjainak tükörképei is ugyanerre az egyenesre esnek.',
        explanation: 'Bármely t-re merőleges egyenes önmagába megy át (bár pontjai helyet cserélnek a talppontra nézve), ezért fixegyenes.'
      },
      {
        id: 'aq1-10',
        questionTypeBadge: 'Öninverz Tulajdonság',
        question: 'Ha egy alakzatot kétszer egymás után tükrözünk ugyanarra a t egyenesre, mi lesz az eredmény?',
        options: [
          'Visszakerül pontosan az eredeti helyzetébe (identitás)',
          '180°-kal elfordul a síkban',
          'Kétszer olyan messzire tolódik',
          'Megfordul másodszor is a körüljárási iránya'
        ],
        correctAnswer: 0,
        hint: 'A tükrözés önmaga inverze: t ∘ t = id.',
        explanation: 'A tengelyes tükrözés öninverz művelet: kétszer végrehajtva ugyanarra a tengelyre minden pont visszatér eredeti helyére.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Alakzatok Szimmetriatengelyei és Koordináta-szabályok (Közepes)',
    subtitle: 'Háromszögek, négyszögek szimmetriatengelyeinek száma és az y = x egyenes.',
    range: '11 - 20. feladat',
    focus: 'Tengelyes szimmetria alakzatokban és összetett koordináták',
    questions: [
      {
        id: 'aq2-1',
        questionTypeBadge: 'Egyenlő Szárú Háromszög',
        question: 'Hány szimmetriatengellyel rendelkezik egy nem szabályos egyenlő szárú háromszög?',
        figure: <SymmetryAxesShapesSvg size={220} />,
        options: ['1 szimmetriatengellyel (az alap felezőmerőlegese)', '2', '3', '0'],
        correctAnswer: 0,
        hint: 'A csúcsszögből az alapra bocsátott magasságvonal felezi a háromszöget.',
        explanation: 'Az egyenlő szárú háromszögnek pontosan 1 szimmetriatengelye van: az alap felezőmerőlegese (amely átmegy a szemközti csúcson).'
      },
      {
        id: 'aq2-2',
        questionTypeBadge: 'Szabályos Háromszög',
        question: 'Hány szimmetriatengellyel rendelkezik egy szabályos (egyenlő oldalú) háromszög?',
        options: ['3 szimmetriatengellyel', '1', '6', '0'],
        correctAnswer: 0,
        hint: 'Mindhárom oldalának felezőmerőlegese szimmetriatengely.',
        explanation: 'A szabályos háromszög mindhárom oldalfelező merőlegese (egyben magassága és szögfelezője) szimmetriatengely, tehát 3 tengelye van.'
      },
      {
        id: 'aq2-3',
        questionTypeBadge: 'Téglalap Szimmetriatengelyei',
        question: 'Hány szimmetriatengellyel bír egy általános (nem négyzet) téglalap, és melyek ezek?',
        options: [
          '2 szimmetriatengellyel: a szemközti oldalak felezőmerőlegesei',
          '4 szimmetriatengellyel: a 2 oldalfelező és a 2 átló',
          'Csak a 2 átlója',
          '0 szimmetriatengellyel'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra: az átlóra tükrözve a téglalap átfedné-e önmagát?',
        explanation: 'Egy téglalapnak pontosan 2 szimmetriatengelye van: az oldalfelező merőlegesek. Az átlói NEM szimmetriatengelyek (kivéve, ha négyzet)!'
      },
      {
        id: 'aq2-4',
        questionTypeBadge: 'Rombusz Szimmetriatengelyei',
        question: 'Melyek egy nem négyzet rombusz szimmetriatengelyei?',
        options: [
          'A 2 átlójának egyenesei',
          'Az oldalfelező merőlegesei',
          'Mind a 4 magasságvonala',
          'Nincs szimmetriatengelye'
        ],
        correctAnswer: 0,
        hint: 'A rombusz átlói merőlegesen felezik egymást és felezik a belső szögeket.',
        explanation: 'A rombusz szimmetriatengelyei a 2 átlójának egyenesei. Az oldalfelező merőlegesei nem tengelyek.'
      },
      {
        id: 'aq2-5',
        questionTypeBadge: 'Négyzet Szimmetriatengelyei',
        question: 'Hány szimmetriatengellyel rendelkezik a négyzet?',
        options: ['4 (2 oldalfelező merőleges + 2 átló)', '2', '8', 'Végtelen sok'],
        correctAnswer: 0,
        hint: 'A négyzet egyszerre téglalap és rombusz is.',
        explanation: 'A négyzet a téglalap és rombusz tulajdonságait is egyesíti: 2 oldalfelezője és 2 átlója is szimmetriatengely, összesen 4 tengelye van.'
      },
      {
        id: 'aq2-6',
        questionTypeBadge: 'y = x Egyenesre Tükrözés',
        question: 'A P(2; −5) pontot tükrözzük az y = x egyenesre (főtengelyre). Mik lesznek a képpont koordinátái?',
        figure: <CoordinateAxialSvg size={200} />,
        options: ['(−5; 2)', '(5; −2)', '(−2; 5)', '(2; 5)'],
        correctAnswer: 0,
        hint: 'Az y = x egyenesre tükrözésnél a koordináták felcserélődnek: (x; y) ↦ (y; x).',
        explanation: 'Az y = x egyenesre tükrözés szabálya: (x; y) ↦ (y; x). Tehát (2; −5) képe (−5; 2).'
      },
      {
        id: 'aq2-7',
        questionTypeBadge: 'Paralelogramma Tengelyei',
        question: 'Hány szimmetriatengellyel rendelkezik egy általános paralelogramma (amely nem téglalap és nem rombusz)?',
        options: ['0 (nincs szimmetriatengelye)', '1', '2', '4'],
        correctAnswer: 0,
        hint: 'Bár középpontosan szimmetrikus, ha félbehajtod, fedik-e egymást a felek?',
        explanation: 'Az általános paralelogramma középpontosan szimmetrikus, de NEM tengelyesen szimmetrikus (0 szimmetriatengelye van).'
      },
      {
        id: 'aq2-8',
        questionTypeBadge: 'Húrtrapéz Szimmetriája',
        question: 'Hány szimmetriatengellyel rendelkezik a húrtrapéz (egyenlő szárú trapéz)?',
        options: ['1 (a párhuzamos alapok közös felezőmerőlegese)', '2', '0', '4'],
        correctAnswer: 0,
        hint: 'A két párhuzamos alap felezőpontját összekötő szakasz egyenese.',
        explanation: 'A húrtrapéznak pontosan 1 szimmetriatengelye van: a két párhuzamos alap közös felezőmerőlegese.'
      },
      {
        id: 'aq2-9',
        questionTypeBadge: 'Deltoid Szimmetriája',
        question: 'Melyik egyenes egy konvex deltoid szimmetriatengelye?',
        options: [
          'A szimmetriaátlója (amely a csúcsszögeket köti össze és felezi a másik átlót)',
          'A rövidebb átlója',
          'A szárak felezőpontját összekötő egyenes',
          'Minden átlója'
        ],
        correctAnswer: 0,
        hint: 'A deltoidnak 1 szimmetriatengelye van, az az átló, amely mentén két egybevágó háromszögre válik.',
        explanation: 'A deltoid szimmetriatengelye a szimmetriaátlója, amely merőlegesen felezi a másik átlót.'
      },
      {
        id: 'aq2-10',
        questionTypeBadge: 'Szakasz Szimmetriatengelyei',
        question: 'Hány szimmetriatengellyel bír egy AB szakasz a síkban?',
        options: [
          '2 (a felezőmerőlegese és a hordozó egyenese)',
          'Csak 1 (a felezőmerőlegese)',
          'Végtelen sok',
          '0'
        ],
        correctAnswer: 0,
        hint: 'Maga az egyenes, amin a szakasz fekszik, szintén önmagába képezi a szakaszt.',
        explanation: 'Egy szakasznak 2 szimmetriatengelye van: a felezőmerőleges (felcseréli a végpontokat) és a szakasz hordozó egyenese (helyben hagyja a végpontokat).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Tükrözési Tételek és Kompozíciók (Nehéz)',
    subtitle: 'Párhuzamos és metsző tengelyek kompozíciója, eltolt tengelyek és általános szabályok.',
    range: '21 - 30. feladat',
    focus: 'Haladó transzformációs geometriai összefüggések',
    questions: [
      {
        id: 'aq3-1',
        questionTypeBadge: 'Párhuzamos Tengelyek Kompozíciója',
        question: 'Két párhuzamos tengelyre (t₁ || t₂) egymás után tükrözünk egy alakzatot. A tengelyek távolsága d = 4 cm. Milyen transzformációt kapunk?',
        options: [
          'Egy eltolást a tengelyekre merőlegesen, 8 cm (2d) nagysággal',
          'Egy eltolást 4 cm nagysággal',
          'Egy 180°-os forgatást',
          'Egy tengelyes tükrözést a középvonalra'
        ],
        correctAnswer: 0,
        hint: 'Két tengelyes tükrözés kétszer fordítja meg a körüljárási irányt (így azonos irányú lesz), az elmozdulás a távolság kétszerese.',
        explanation: 'Két párhuzamos tengelyre vett tükrözés egymásutánja mindig egy ELTOLÁS, melynek iránya merőleges a tengelyekre, nagysága pedig a távolság kétszerese: 2d = 8 cm.'
      },
      {
        id: 'aq3-2',
        questionTypeBadge: 'Metsző Tengelyek Kompozíciója',
        question: 'Két egymást M pontban 35°-os szögben metsző tengelyre (t₁ ∩ t₂ = M, α = 35°) egymás után tükrözünk egy pontot. Mi a kompozíció eredménye?',
        options: [
          'Egy M körüli 70°-os (2α) elforgatás',
          'Egy M körüli 35°-os elforgatás',
          'Egy eltolás az M pont felé',
          'Egy középpontos tükrözés az M pontra'
        ],
        correctAnswer: 0,
        hint: 'A forgásszög a két tengely hajlásszögének kétszerese.',
        explanation: 'Két egymást α szögben metsző tengelyre való tükrözés összetétele a metszéspont körüli 2α szögű (itt 2 · 35° = 70°-os) FORGATÁS.'
      },
      {
        id: 'aq3-3',
        questionTypeBadge: 'Merőleges Tengelyek Kompozíciója',
        question: 'Mi a két egymásra merőleges tengelyre vett egymást követő tükrözés (α = 90°)?',
        options: [
          'Középpontos tükrözés a metszéspontra (180°-os forgatás)',
          'Eltolás a tengelyek mentén',
          'Identitás',
          'Egy harmadik tengelyes tükrözés'
        ],
        correctAnswer: 0,
        hint: 'A metsző tengelyek tétele szerint 2 · 90° = 180° szögű forgatást kapunk.',
        explanation: 'Két merőleges egyenesre (pl. x és y koordinátatengelyekre) való egymásutáni tükrözés: (x; y) ↦ (x; −y) ↦ (−x; −y), ami a metszéspontra (origóra) vonatkozó KÖZÉPPONTOS TÜKRÖZÉS!'
      },
      {
        id: 'aq3-4',
        questionTypeBadge: 'Tükrözés az x = 3 Egyenesre',
        question: 'A P(1; 4) pontot tükrözzük az x = 3 függőleges egyenesre. Mik lesznek a képpont koordinátái?',
        options: ['(5; 4)', '(2; 4)', '(4; 4)', '(−1; 4)'],
        correctAnswer: 0,
        hint: 'A P pont távolsága a tengelytől 3 − 1 = 2 egység. A túloldalon a tengelyhez hozzáadunk 2-t: 3 + 2 = 5.',
        explanation: 'Az y koordináta nem változik (4). Az x koordináta: x\' = 2 · 3 − 1 = 6 − 1 = 5. Tehát P\'(5; 4).'
      },
      {
        id: 'aq3-5',
        questionTypeBadge: 'Tükrözés az y = −2 Egyenesre',
        question: 'A Q(4; 3) pontot tükrözzük az y = −2 vízszintes egyenesre. Mik lesznek a képpont koordinátái?',
        options: ['(4; −7)', '(4; −5)', '(−4; 3)', '(4; 1)'],
        correctAnswer: 0,
        hint: 'Az x koordináta marad 4. Az y képlete: y\' = 2 · (−2) − 3.',
        explanation: 'Az x változatlan: 4. y\' = 2 · (−2) − 3 = −4 − 3 = −7. Tehát Q\'(4; −7).'
      },
      {
        id: 'aq3-6',
        questionTypeBadge: 'Szabályos Sokszögek Tengelyei',
        question: 'Hány szimmetriatengellyel rendelkezik egy szabályos tizenkétszög (n = 12)?',
        options: ['12 szimmetriatengellyel', '6', '24', '4'],
        correctAnswer: 0,
        hint: 'Minden szabályos n-szög pontosan n darab szimmetriatengellyel rendelkezik.',
        explanation: 'A szabályos n-oldalú sokszögnek pontosan n szimmetriatengelye van (páros n esetén n/2 szemközti oldalfelező és n/2 szemközti csúcsokat összekötő tengely). Itt n = 12.'
      },
      {
        id: 'aq3-7',
        questionTypeBadge: 'Kör Szimmetriatengelyei',
        question: 'Melyek a kör szimmetriatengelyei a síkban?',
        options: [
          'Minden, a kör középpontján átmenő egyenes (minden átmérője)',
          'Csak a vízszintes és függőleges átmérője',
          'Nincsenek tengelyei, csak forgásszimmetriája',
          'Pontosan 360 tengelye van'
        ],
        correctAnswer: 0,
        hint: 'A kör bármely átmérőjére tükrözve önmagába megy át.',
        explanation: 'A kör bármely átmérőegyenesére nézve tengelyesen szimmetrikus, így végtelen sok szimmetriatengellyel rendelkezik.'
      },
      {
        id: 'aq3-8',
        questionTypeBadge: 'Három Tükrözés Egymásutánja',
        question: 'Egy sokszöget három egymást követő tengelyes tükrözéssel alakítunk át a síkban. Milyen lesz a végső kép körüljárási iránya az eredetihez képest?',
        options: [
          'Megfordul (ellentétes irányú lesz)',
          'Azonos marad',
          'Csak 180°-os forgatás után fordul meg',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Minden egyes tükrözés megfordítja az irányt. Páratlan számú tükrözés: (+1) · (−1) · (−1) · (−1) = −1.',
        explanation: 'Egy tükrözés megfordítja, kettő visszafordítja, a harmadik ismét megfordítja az irányt. Tehát a körüljárási irány ellentétesre változik.'
      },
      {
        id: 'aq3-9',
        questionTypeBadge: 'Tükrözés az y = −x Egyenesre',
        question: 'A P(4; −1) pontot tükrözzük a II. és IV. síknegyed felezőjére (y = −x egyenes). Mik lesznek a képpont koordinátái?',
        options: ['(1; −4)', '(−1; 4)', '(−4; 1)', '(4; 1)'],
        correctAnswer: 0,
        hint: 'Az y = −x egyenesre: (x; y) ↦ (−y; −x).',
        explanation: 'A szabály szerint (x; y) ↦ (−y; −x). Itt x = 4, y = −1, így P\'(−(−1); −4) = P\'(1; −4).'
      },
      {
        id: 'aq3-10',
        questionTypeBadge: 'Derékszögű Háromszög Szimmetriája',
        question: 'Milyen feltétel mellett lehet egy derékszögű háromszög tengelyesen szimmetrikus?',
        options: [
          'Ha egyben egyenlő szárú is (szögei: 45°, 45°, 90°)',
          'Minden derékszögű háromszög tengelyesen szimmetrikus',
          'Soha nem lehet tengelyesen szimmetrikus',
          'Ha a befogói 3 és 4 cm hosszúak'
        ],
        correctAnswer: 0,
        hint: 'Ahhoz, hogy legyen szimmetriatengelye, legalább két oldalának egyenlőnek kell lennie.',
        explanation: 'Egy derékszögű háromszög csak akkor tengelyesen szimmetrikus, ha a két befogója egyenlő hosszúságú (egyenlő szárú derékszögű háromszög). Ekkor az átfogóhoz tartozó magasság a szimmetriatengely.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Tengelyes tükrözés alaptétele',
    badge: 'Definíció',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 't tükörtengely felezi a PP\' szakaszt merőlegesen.',
    formula: 't ⊥ PP\' • |A\'B\'| = |AB|',
    note: 'Körüljárási irány megfordul! A tengely minden pontja fixpont (pontonként fix).',
    icon: <FlipHorizontal className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Koordináta-szabályok',
    badge: 'Képletek',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Alapvető tengelyekre tükrözés:',
    formula: 'x-tengely: (x; y) ↦ (x; −y)\ny-tengely: (x; y) ↦ (−x; y)\ny = x: (x; y) ↦ (y; x)\ny = −x: (x; y) ↦ (−y; −x)',
    note: 'x = x₀ egyenesre: x\' = 2x₀ − x, y\' = y.',
    icon: <Maximize2 className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Szimmetriatengelyek száma',
    badge: 'Alakzatok',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Hány tengellyel bírnak a síkidomok?',
    formula: 'Egyenlő szárú 3-szög, húrtrapéz, deltoid: 1\nTéglalap, rombusz, szakasz: 2\nSzabályos 3-szög: 3 • Négyzet: 4\nSzabályos n-szög: n • Kör: ∞',
    note: 'Paralelogramma: 0 tengely! Téglalap átlói NEM tengelyek!',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Tükrözések kompozíciója',
    badge: 'Összetétel',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Két egymást követő tengelyes tükrözés:',
    formula: 't₁ || t₂ ⟹ Eltolás (2d)\nt₁ ∩ t₂ = M (α) ⟹ Forgatás (2α)',
    note: 'Két merőleges tengely: középpontos tükrözés a metszéspontra (180°)!',
    icon: <RotateCw className="w-5 h-5 text-amber-600" />
  }
];

export const AxialQuiz: React.FC<AxialQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="3. Tengelyes tükrözés kvíz"
      subtitle="Teszteld tudásodat a tengelyes tükrözés geometriájából: fixpontok, szimmetriatengelyek száma és koordináta-szabályok!"
      topicId="g9-trans-tengelyes"
      topicTitle="3. Tengelyes tükrözés"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <AxialMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AxialSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

