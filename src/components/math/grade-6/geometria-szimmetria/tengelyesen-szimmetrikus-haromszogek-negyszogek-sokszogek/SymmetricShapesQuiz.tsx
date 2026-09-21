import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { SymmetricShapesMiniFigure } from './SymmetricShapesDiagrams';
import { SymmetricShapesMatcher } from './SymmetricShapesMatcher';
import { SymmetricShapesSorter } from './SymmetricShapesSorter';

export interface SymmetricShapesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function SymmetricShapesQuiz({ onBack, onSwitchToTheory }: SymmetricShapesQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: HÁROMSZÖGEK ÉS NÉGYSZÖGEK ALAPVETŐ SZIMMETRIÁI (10 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: Alapvető háromszögek, négyszögek és sokszögek szimmetriája',
      subtitle: 'Egyenlő szárú és szabályos háromszög, deltoid, húrtrapéz, téglalap, rombusz, négyzet',
      range: '1–10. feladat',
      focus: 'Szimmetriatengelyek száma és alapvető oldal- és szögtulajdonságok',
      questions: [
        {
          id: 'q1-1',
          question: 'Hány szimmetriatengelye van egy egyenlő szárú (nem szabályos) háromszögnek?',
          options: [
            '1 szimmetriatengelye (az alaphoz tartozó magasságvonal)',
            '2 szimmetriatengelye',
            '3 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (az alaphoz tartozó magasságvonal)',
          explanation: 'Az egyenlő szárú háromszögnek pontosan 1 szimmetriatengelye van: az alaphoz tartozó oldalfelező merőleges, amely egyben a szárszög felezője és a magasságvonal is.',
          figure: <SymmetricShapesMiniFigure type="isosceles_triangle" />
        },
        {
          id: 'q1-2',
          question: 'Hány szimmetriatengelye van a szabályos (egyenlő oldalú) háromszögnek?',
          options: [
            '3 szimmetriatengelye (a 3 oldalfelező merőleges)',
            '1 szimmetriatengelye',
            '6 szimmetriatengelye',
            'Végtelen sok'
          ],
          correctAnswer: '3 szimmetriatengelye (a 3 oldalfelező merőleges)',
          explanation: 'A szabályos háromszög 3 oldala és 3 szöge (60°-60°-60°) egyenlő, ezért mindhárom csúcsán átmegy egy-egy szimmetriatengely (összesen 3 db).',
          figure: <SymmetricShapesMiniFigure type="equilateral_triangle" />
        },
        {
          id: 'q1-3',
          question: 'Hány szimmetriatengelye van a deltoidnak (ha nem rombusz)?',
          options: [
            '1 szimmetriatengelye (a szimmetriaátlója)',
            '2 szimmetriatengelye',
            '0 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (a szimmetriaátlója)',
          explanation: 'A deltoidnak pontosan 1 szimmetriatengelye van: az a szimmetriaátlója, amely a különböző oldalpárok találkozási csúcsait köti össze.',
          figure: <SymmetricShapesMiniFigure type="deltoid" />
        },
        {
          id: 'q1-4',
          question: 'Hány szimmetriatengelye van az egyenlő szárú trapéznak (szimmetrikus húrtrapéznak)?',
          options: [
            '1 szimmetriatengelye (a párhuzamos alapok közös felezőmerőlegese)',
            '2 szimmetriatengelye',
            '0 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (a párhuzamos alapok közös felezőmerőlegese)',
          explanation: 'A szimmetrikus trapéz szimmetriatengelye a párhuzamos alapok közös felezőmerőlegese. Az átlói NEM szimmetriatengelyek!',
          figure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />
        },
        {
          id: 'q1-5',
          question: 'Hány szimmetriatengelye van az általános téglalapnak (amely nem négyzet)?',
          options: [
            '2 szimmetriatengelye (a szemközti oldalak felezőmerőlegesei)',
            '4 szimmetriatengelye (az átlók is)',
            '1 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '2 szimmetriatengelye (a szemközti oldalak felezőmerőlegesei)',
          explanation: 'A téglalapnak 2 szimmetriatengelye van: a 2 szemközti oldalfelező merőleges. Az átlói NEM szimmetriatengelyek.',
          figure: <SymmetricShapesMiniFigure type="rectangle" />
        },
        {
          id: 'q1-6',
          question: 'Melyek a rombusz szimmetriatengelyei és hány darab van?',
          options: [
            '2 darab szimmetriatengelye van: a két átlójának az egyenese',
            '4 darab szimmetriatengelye van',
            '2 darab szimmetriatengelye van: az oldalfelező merőlegesei',
            '0 szimmetriatengelye van'
          ],
          correctAnswer: '2 darab szimmetriatengelye van: a két átlójának az egyenese',
          explanation: 'A rombusz 4 oldala egyenlő, átlói merőlegesen felezik egymást és felezik a belső szögeket, így a 2 átló egyenese a rombusz 2 szimmetriatengelye.',
          figure: <SymmetricShapesMiniFigure type="rhombus" />
        },
        {
          id: 'q1-7',
          question: 'Hány szimmetriatengelye van a négyzetnek?',
          options: [
            '4 szimmetriatengelye (2 oldalfelező merőleges + 2 átló)',
            '2 szimmetriatengelye',
            '8 szimmetriatengelye',
            '1 szimmetriatengelye'
          ],
          correctAnswer: '4 szimmetriatengelye (2 oldalfelező merőleges + 2 átló)',
          explanation: 'A négyzet egyesíti a téglalap és a rombusz tulajdonságait: a 2 szemközti oldalfelezője és a 2 átlója is szimmetriatengely (összesen 4 db).',
          figure: <SymmetricShapesMiniFigure type="square" />
        },
        {
          id: 'q1-8',
          question: 'Hány szimmetriatengelye van egy általános háromszögnek (amelynek minden oldala különböző hosszúságú)?',
          options: [
            '0 szimmetriatengelye (aszimmetrikus síkidom)',
            '1 szimmetriatengelye',
            '3 szimmetriatengelye',
            '2 szimmetriatengelye'
          ],
          correctAnswer: '0 szimmetriatengelye (aszimmetrikus síkidom)',
          explanation: 'Ha egy háromszög három oldala és három szöge mind különböző, akkor nincs olyan egyenes, amelyre tükrözve önmagába menne át, tehát 0 szimmetriatengelye van.',
          figure: <SymmetricShapesMiniFigure type="general_triangle" />
        },
        {
          id: 'q1-9',
          question: 'Hány szimmetriatengelye van egy szabályos ötszögnek?',
          options: [
            '5 szimmetriatengelye (minden csúcsból a szemközti oldalfelezőbe)',
            '10 szimmetriatengelye',
            '1 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '5 szimmetriatengelye (minden csúcsból a szemközti oldalfelezőbe)',
          explanation: 'Minden szabályos n-szögnek pontosan n darab szimmetriatengelye van. Szabályos ötszög esetén n = 5.',
          figure: <SymmetricShapesMiniFigure type="regular_pentagon" />
        },
        {
          id: 'q1-10',
          question: 'Hány szimmetriatengelye van egy körnek (körvonalnak vagy körlapnak)?',
          options: [
            'Végtelen sok (bármely átmérő egyenese szimmetriatengely)',
            '360 szimmetriatengelye',
            '4 szimmetriatengelye',
            '8 szimmetriatengelye'
          ],
          correctAnswer: 'Végtelen sok (bármely átmérő egyenese szimmetriatengely)',
          explanation: 'A kör középpontján átmenő bármely egyenes szimmetriatengely, így a körnek végtelen sok szimmetriatengelye van.',
          figure: <SymmetricShapesMiniFigure type="infinite_axes" />
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: ÁTLÓK, SZÖGEK ÉS TENGELYEK RÉSZLETES TULAJDONSÁGAI (10 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Átlók, oldalak és szögek szimmetriái',
      subtitle: 'Átlók merőlegessége, egyenlősége, szögfelezők és derékszögű háromszögek',
      range: '11–20. feladat',
      focus: 'Átlók és szimmetriatengelyek kapcsolata, szögszámítás egyenlő szárú háromszögben',
      questions: [
        {
          id: 'q2-1',
          question: 'Milyen kapcsolat van a deltoid két átlója között?',
          options: [
            'Merőlegesek egymásra és a szimmetriaátló felezi a másik átlót',
            'Egyenlő hosszúak és felezik egymást',
            'Párhuzamosak egymással',
            'Mindkét átló felezi a másikat és egyenlő hosszúak'
          ],
          correctAnswer: 'Merőlegesek egymásra és a szimmetriaátló felezi a másik átlót',
          explanation: 'A deltoid átlói merőlegesek egymásra (e ⊥ f), és a szimmetriaátló tengelyesen felezi a másik átlót.',
          figure: <SymmetricShapesMiniFigure type="deltoid" />
        },
        {
          id: 'q2-2',
          question: 'Milyen tulajdonsággal rendelkeznek a szimmetrikus trapéz (húrtrapéz) átlói?',
          options: [
            'Egyenlő hosszúak (e = f), de általában nem merőlegesek egymásra',
            'Merőlegesek egymásra és felezik egymást',
            'Szimmetriatengelyek',
            'Mindig különböző hosszúságúak'
          ],
          correctAnswer: 'Egyenlő hosszúak (e = f), de általában nem merőlegesek egymásra',
          explanation: 'A szimmetrikus trapéz szimmetriájából következik, hogy a két átlója pontosan egyenlő hosszú (e = f).',
          figure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />
        },
        {
          id: 'q2-3',
          question: 'Igaz-e, hogy a téglalap átlói szimmetriatengelyek?',
          options: [
            'Hamis, a téglalap átlói nem szimmetriatengelyek (csak a négyzetnél)',
            'Igaz, minden négyszög átlója szimmetriatengely',
            'Igaz, mert az átló két egybevágó derékszögű háromszögre osztja a téglalapot',
            'Csak akkor igaz, ha az oldalak aránya 2:1'
          ],
          correctAnswer: 'Hamis, a téglalap átlói nem szimmetriatengelyek (csak a négyzetnél)',
          explanation: 'Bár a téglalap átlója két egybevágó háromszögre osztja az idomot, az átlóra tükrözve a csúcsok nem esnek egybe. Ezért a téglalap átlói nem szimmetriatengelyek!',
          figure: <SymmetricShapesMiniFigure type="rectangle" />
        },
        {
          id: 'q2-4',
          question: 'Egy rombusz átlói felezik a belső szögeket. Miért igaz ez?',
          options: [
            'Mert az átlók egyenesei a rombusz szimmetriatengelyei',
            'Mert a rombusz minden szöge 90°',
            'Mert a rombusz átlói egyenlő hosszúak',
            'Csak szabályos ötszögben igaz'
          ],
          correctAnswer: 'Mert az átlók egyenesei a rombusz szimmetriatengelyei',
          explanation: 'Mivel a rombusz átlói szimmetriatengelyek, a tükrözés miatt az átló mindkét végén felezi a belső csúcsszöget.',
          figure: <SymmetricShapesMiniFigure type="rhombus" />
        },
        {
          id: 'q2-5',
          question: 'Hány szimmetriatengelye van egy általános paralelogrammának (amely nem téglalap és nem rombusz)?',
          options: [
            '0 szimmetriatengelye (tengelyesen nem szimmetrikus)',
            '2 szimmetriatengelye',
            '1 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '0 szimmetriatengelye (tengelyesen nem szimmetrikus)',
          explanation: 'Az általános paralelogramma középpontosan szimmetrikus, de tengelyesen aszimmetrikus (0 szimmetriatengely).',
          figure: <SymmetricShapesMiniFigure type="parallelogram" />
        },
        {
          id: 'q2-6',
          question: 'Hány szimmetriatengelye van egy derékszögű, egyenlő szárú háromszögnek és mekkorák a hegyesszögei?',
          options: [
            '1 szimmetriatengelye van, és a hegyesszögei 45°-osak',
            '3 szimmetriatengelye van, és a szögei 60°-osak',
            '2 szimmetriatengelye van, és a szögei 30° és 60°',
            '0 szimmetriatengelye van'
          ],
          correctAnswer: '1 szimmetriatengelye van, és a hegyesszögei 45°-osak',
          explanation: 'Mivel egyenlő szárú és az egyik szöge 90°, a maradék 90°-on a két alapszög egyenlően osztozik: 45° és 45°. Szimmetriatengelye az átfogóhoz tartozó magasságvonal (1 db).',
          figure: <SymmetricShapesMiniFigure type="right_triangle" />
        },
        {
          id: 'q2-7',
          question: 'Hogyan oszlanak meg a szimmetriatengelyek egy szabályos hatszögnél?',
          options: [
            '3 szemközti csúcsokat összekötő főátló + 3 szemközti oldalfelező merőleges',
            '6 szemközti csúcsokat összekötő átló',
            '6 oldalfelező merőleges',
            'Csak 2 tengelye van'
          ],
          correctAnswer: '3 szemközti csúcsokat összekötő főátló + 3 szemközti oldalfelező merőleges',
          explanation: 'A szabályos hatszög páros csúcsszámú (n=6), így 3 tengelye szemközti csúcsokat köt össze (főátlók), 3 tengelye pedig szemközti oldalfelezőket (összesen 6 db).',
          figure: <SymmetricShapesMiniFigure type="regular_hexagon" />
        },
        {
          id: 'q2-8',
          question: 'Egy egyenlő szárú háromszög szárai által bezárt csúcsszöge γ = 50°. Mekkorák az alapon fekvő α és β szögek?',
          options: [
            'α = β = 65°',
            'α = β = 50°',
            'α = β = 75°',
            'α = 60°, β = 70°'
          ],
          correctAnswer: 'α = β = 65°',
          explanation: 'A belső szögek összege 180°. A szárszöget levonva: 180° - 50° = 130°. Mivel az alapszögek egyenlők: α = β = 130° / 2 = 65°.',
          figure: <SymmetricShapesMiniFigure type="isosceles_triangle" />
        },
        {
          id: 'q2-9',
          question: 'Melyik négyszögre igaz, hogy az átlói egyenlő hosszúak, merőlegesek egymásra, felezik egymást és szimmetriatengelyek?',
          options: [
            'Négyzet',
            'Téglalap',
            'Rombusz',
            'Deltoid'
          ],
          correctAnswer: 'Négyzet',
          explanation: 'Egyedül a négyzet rendelkezik mindezen tulajdonságokkal egyszerre (a téglalap átlói nem merőlegesek és nem tengelyek, a rombusz átlói nem egyenlők).',
          figure: <SymmetricShapesMiniFigure type="square" />
        },
        {
          id: 'q2-10',
          question: 'Hány szimmetriatengelye van egy félkörnek?',
          options: [
            '1 szimmetriatengelye (az egyenes határoló átmérő szakasz felezőmerőlegese)',
            '2 szimmetriatengelye',
            'Végtelen sok',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (az egyenes határoló átmérő szakasz felezőmerőlegese)',
          explanation: 'A félkörnek pontosan 1 szimmetriatengelye van: az átmérőjének a felezőmerőlegese, amely az ív felezőpontján is áthalad.',
          figure: <SymmetricShapesMiniFigure type="semicircle" />
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: SOKSZÖGEK, ÁTLÓK ÉS ÖSSZETETT GEOMETRIAI FELADATOK (10 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Szabályos sokszögek, transzformációk és logikai feladványok',
      subtitle: 'Páros/páratlan n-szögek, fix pontok, szögszámítások húrtrapézban és deltoidban',
      range: '21–30. feladat',
      focus: 'Sokszögek belső szerkezete, fix alakzatok, komplex szimmetriák',
      questions: [
        {
          id: 'q3-1',
          question: 'Hogyan helyezkednek el a szimmetriatengelyek egy páratlan csúcsszámú szabályos sokszögnél (pl. szabályos 5-szög, 7-szög, 9-szög)?',
          options: [
            'Mind az n darab tengely egy csúcson és a szemközti oldal felezőpontján halad át',
            'Minden tengely két csúcsot köt össze',
            'Minden tengely két oldalfelező ponton megy át',
            'Nincsenek szimmetriatengelyei'
          ],
          correctAnswer: 'Mind az n darab tengely egy csúcson és a szemközti oldal felezőpontján halad át',
          explanation: 'Páratlan csúcsszám esetén egyetlen tengely sem tud két szemközti csúcsot összekötni, mindegyik egy csúcsból indul a szemközti oldal felezőjébe.',
          figure: <SymmetricShapesMiniFigure type="regular_pentagon" />
        },
        {
          id: 'q3-2',
          question: 'Hány szimmetriatengelye van egy szabályos tizenkétszögnek (12-szög)?',
          options: [
            '12 szimmetriatengelye (6 csúcsátló + 6 oldalfelező)',
            '6 szimmetriatengelye',
            '24 szimmetriatengelye',
            'Végtelen sok'
          ],
          correctAnswer: '12 szimmetriatengelye (6 csúcsátló + 6 oldalfelező)',
          explanation: 'Minden szabályos n-szögnek n darab szimmetriatengelye van. Szabályos 12-szög esetén pontosan 12 tengely van (6 csúcsátló és 6 oldalfelező).',
          figure: <SymmetricShapesMiniFigure type="four_axes" />
        },
        {
          id: 'q3-3',
          question: 'Egy szimmetrikus húrtrapéz egyik alapon fekvő szöge α = 70°. Mekkora a trapéz többi belső szöge?',
          options: [
            'β = 70°, γ = 110°, δ = 110°',
            'β = 110°, γ = 70°, δ = 110°',
            'Mind a négy szöge 70°',
            'β = 70°, γ = 90°, δ = 130°'
          ],
          correctAnswer: 'β = 70°, γ = 110°, δ = 110°',
          explanation: 'A húrtrapézban az alapon fekvő szögek egyenlők: β = α = 70°. Az egy száron fekvő szögek összege 180°, így γ = δ = 180° - 70° = 110°.',
          figure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />
        },
        {
          id: 'q3-4',
          question: 'Egy deltoid nem szimmetrikus csúcsainál lévő két szemközti szöge β és δ. Milyen kapcsolat van köztük?',
          options: [
            'β = δ (a két szemközti szög mindig pontosan egyenlő)',
            'β + δ = 180°',
            'Mindkettő mindig 90°',
            'Nincs semmilyen összefüggés köztük'
          ],
          correctAnswer: 'β = δ (a két szemközti szög mindig pontosan egyenlő)',
          explanation: 'A szimmetriaátlóra tükrözve a két oldalcsúcs egymásba megy át, ezért a nem szimmetriaátlón fekvő két szemközti belső szög pontosan egyenlő.',
          figure: <SymmetricShapesMiniFigure type="deltoid" />
        },
        {
          id: 'q3-5',
          question: 'Egy egyenlő szárú háromszög alapja c = 10 cm. Milyen távol van az alap felezőpontja a szimmetriatengelytől?',
          options: [
            '0 cm (a pont pontosan a szimmetriatengelyen fekszik, tehát fixpont)',
            '5 cm',
            '10 cm',
            '2,5 cm'
          ],
          correctAnswer: '0 cm (a pont pontosan a szimmetriatengelyen fekszik, tehát fixpont)',
          explanation: 'A szimmetriatengely pontosan az alap felezőmerőlegese, így az alap felezőpontja magán a tengelyen fekszik, távolsága 0 cm.',
          figure: <SymmetricShapesMiniFigure type="isosceles_triangle" />
        },
        {
          id: 'q3-6',
          question: 'Melyik állítás IGAZ minden tengelyesen szimmetrikus négyszögre?',
          options: [
            'Létezik legalább 1 olyan egyenes, amelyre tükrözve a négyszög önmagába megy át',
            'Minden belső szöge 90°',
            'Minden oldala egyenlő hosszú',
            'Az átlói mindig merőlegesek egymásra'
          ],
          correctAnswer: 'Létezik legalább 1 olyan egyenes, amelyre tükrözve a négyszög önmagába megy át',
          explanation: 'Ez a tengelyes szimmetria matematikai definíciója. A többi állítás csak speciális alakzatokra (pl. négyzet, rombusz) igaz.',
          figure: <SymmetricShapesMiniFigure type="two_axes" />
        },
        {
          id: 'q3-7',
          question: 'Hány szimmetriatengelye van egy szabályos nyolcszögnek (8-szög)?',
          options: [
            '8 szimmetriatengelye (4 szemközti csúcsátló + 4 oldalfelező)',
            '4 szimmetriatengelye',
            '16 szimmetriatengelye',
            '2 szimmetriatengelye'
          ],
          correctAnswer: '8 szimmetriatengelye (4 szemközti csúcsátló + 4 oldalfelező)',
          explanation: 'Szabályos n-szögnél a tengelyek száma n. Szabályos nyolcszögnél n = 8: 4 db szemközti csúcspárokat összekötő főátló és 4 db szemközti oldalfelező.',
          figure: <SymmetricShapesMiniFigure type="regular_octagon" />
        },
        {
          id: 'q3-8',
          question: 'Milyen alakzat keletkezik, ha egy egyenlő szárú háromszöget tükrözünk az alapjának az egyenesére?',
          options: [
            'Rombusz (vagy négyzet, ha a csúcsszög 90°)',
            'Deltoid',
            'Téglalap',
            'Általános paralelogramma'
          ],
          correctAnswer: 'Rombusz (vagy négyzet, ha a csúcsszög 90°)',
          explanation: 'Mivel az eredeti háromszög két szára egyenlő (a = b), a tükrözéssel kapott új háromszög szárai is egyenlők lesznek, így a négy oldal egyenlő: rombusz keletkezik.',
          figure: <SymmetricShapesMiniFigure type="rhombus" />
        },
        {
          id: 'q3-9',
          question: 'Milyen alakzat keletkezik, ha egy általános derékszögű háromszöget tükrözünk az átfogójának az egyenesére?',
          options: [
            'Deltoid',
            'Téglalap',
            'Rombusz',
            'Szimmetrikus trapéz'
          ],
          correctAnswer: 'Deltoid',
          explanation: 'A derékszögű háromszög befogói különbözőek (a ≠ b). Az átfogóra vett tükörkép oldalai megegyeznek az eredetivel, így 2-2 szomszédos oldal lesz egyenlő: deltoid keletkezik.',
          figure: <SymmetricShapesMiniFigure type="deltoid" />
        },
        {
          id: 'q3-10',
          question: 'Mennyi a szimmetriatengelyek száma összesen egy szabályos háromszög, egy téglalap, egy deltoid és egy négyzet esetén?',
          options: [
            '10 szimmetriatengely (3 + 2 + 1 + 4 = 10)',
            '8 szimmetriatengely',
            '12 szimmetriatengely',
            '14 szimmetriatengely'
          ],
          correctAnswer: '10 szimmetriatengely (3 + 2 + 1 + 4 = 10)',
          explanation: 'Szabályos 3-szög (3) + Téglalap (2) + Deltoid (1) + Négyzet (4) = 3 + 2 + 1 + 4 = 10 darab szimmetriatengely.',
          figure: <SymmetricShapesMiniFigure type="four_axes" />
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szimmetrikus alakzatok Kvíz"
      subtitle="Háromszögek, négyszögek és szabályos sokszögek szimmetriatulajdonságai 3 nehézségi szinten"
      badge="📐 6. Osztály • III. Geometria • 9. Fejezet"
      topicId="g6-symmetric-shapes-quiz"
      themeColor="rose"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <SymmetricShapesMatcher {...props} />}
      renderSorter={(props) => <SymmetricShapesSorter {...props} />}
      matcherComponent={
        <SymmetricShapesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SymmetricShapesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
