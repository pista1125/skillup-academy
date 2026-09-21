import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { AxialSymmetryMiniFigure } from './AxialSymmetryDiagrams';
import { AxialSymmetryMatcher } from './AxialSymmetryMatcher';
import { AxialSymmetrySorter } from './AxialSymmetrySorter';

export interface AxialSymmetryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function AxialSymmetryQuiz({ onBack, onSwitchToTheory }: AxialSymmetryQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: ALAPFOGALMAK ÉS TENGELYEK SZÁMA (10 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: Alapfogalmak és szimmetriatengelyek száma',
      subtitle: 'Definíció, háromszögek, négyszögek, kör és betűk szimmetriája',
      range: '1–10. feladat',
      focus: 'Szimmetriatengely fogalma, alap síkidomok és betűk',
      questions: [
        {
          id: 'q1-1',
          question: 'Mikor mondjuk egy síkbeli alakzatról, hogy tengelyesen szimmetrikus?',
          options: [
            'Ha létezik olyan egyenes, amelyre tükrözve az alakzat önmagába megy át',
            'Ha az alakzatnak minden oldala egyenlő hosszú',
            'Ha az alakzatot elforgatva kétszer akkora területet kapunk',
            'Ha az alakzatnak legalább 4 csúcsa van'
          ],
          correctAnswer: 'Ha létezik olyan egyenes, amelyre tükrözve az alakzat önmagába megy át',
          explanation: 'Egy alakzat akkor tengelyesen szimmetrikus, ha van a síkban olyan t egyenes, amelyre vett tükörképe pontosan megegyezik az eredeti alakzattal: R_t(F) = F.',
          figure: <AxialSymmetryMiniFigure type="one_axis" />
        },
        {
          id: 'q1-2',
          question: 'Hány szimmetriatengelye van egy egyenlő szárú (nem szabályos) háromszögnek?',
          options: [
            '1 szimmetriatengelye (az alaphoz tartozó oldalfelező merőleges / magasság)',
            '2 szimmetriatengelye',
            '3 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (az alaphoz tartozó oldalfelező merőleges / magasság)',
          explanation: 'Az egyenlő szárú háromszögnek pontosan 1 szimmetriatengelye van: az alaphoz tartozó magasságvonal (oldalfelező merőleges), amely a szárszöget is felezi.',
          figure: <AxialSymmetryMiniFigure type="one_axis" />
        },
        {
          id: 'q1-3',
          question: 'Hány szimmetriatengelye van egy általános téglalapnak (amely nem négyzet)?',
          options: [
            '2 szimmetriatengelye (a szemközti oldalak felezőmerőlegesei)',
            '4 szimmetriatengelye (az átlók is azok)',
            '1 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '2 szimmetriatengelye (a szemközti oldalak felezőmerőlegesei)',
          explanation: 'A téglalapnak 2 szimmetriatengelye van: a szemközti oldalak felezőmerőlegesei. Az átlói NEM szimmetriatengelyek!',
          figure: <AxialSymmetryMiniFigure type="two_axes" />
        },
        {
          id: 'q1-4',
          question: 'Hány szimmetriatengelye van a szabályos (egyenlő oldalú) háromszögnek?',
          options: [
            '3 szimmetriatengelye (a 3 oldalfelező merőleges)',
            '1 szimmetriatengelye',
            '6 szimmetriatengelye',
            'Végtelen sok'
          ],
          correctAnswer: '3 szimmetriatengelye (a 3 oldalfelező merőleges)',
          explanation: 'A szabályos háromszög 3 oldala és 3 szöge egyenlő, így 3 szimmetriatengellyel rendelkezik (a 3 oldalfelező merőleges, amelyek egyben szögfelezők és magasságvonalak is).',
          figure: <AxialSymmetryMiniFigure type="three_axes" />
        },
        {
          id: 'q1-5',
          question: 'Hány szimmetriatengelye van a négyzetnek?',
          options: [
            '4 szimmetriatengelye (2 oldalfelező merőleges + 2 átló)',
            '2 szimmetriatengelye',
            '8 szimmetriatengelye',
            '1 szimmetriatengelye'
          ],
          correctAnswer: '4 szimmetriatengelye (2 oldalfelező merőleges + 2 átló)',
          explanation: 'A négyzetnek 4 szimmetriatengelye van: a 2 szemközti oldalakat felező merőleges egyenes és a 2 átló egyenese.',
          figure: <AxialSymmetryMiniFigure type="four_axes" />
        },
        {
          id: 'q1-6',
          question: 'Hány szimmetriatengelye van egy körnek (körvonalnak vagy körlapnak)?',
          options: [
            'Végtelen sok (bármely átmérőjének egyenese szimmetriatengely)',
            '360 szimmetriatengelye',
            '4 szimmetriatengelye',
            '1 szimmetriatengelye'
          ],
          correctAnswer: 'Végtelen sok (bármely átmérőjének egyenese szimmetriatengely)',
          explanation: 'A kör középpontján átmenő bármely egyenes (azaz bármely átmérő egyenese) szimmetriatengely, így a körnek végtelen sok szimmetriatengelye van.',
          figure: <AxialSymmetryMiniFigure type="infinite_axes" />
        },
        {
          id: 'q1-7',
          question: 'Melyek a rombusz szimmetriatengelyei?',
          options: [
            'A két átlójának az egyenese (2 db tengely)',
            'Az oldalfelező merőlegesei',
            'Csak a hosszabbik átlója',
            'A rombusznak nincs szimmetriatengelye'
          ],
          correctAnswer: 'A két átlójának az egyenese (2 db tengely)',
          explanation: 'A rombusz 4 oldala egyenlő, átlói merőlegesen felezik egymást és felezik a belső szögeket, ezért a két átló egyenese a rombusz 2 szimmetriatengelye.',
          figure: <AxialSymmetryMiniFigure type="rhombus_axes" />
        },
        {
          id: 'q1-8',
          question: 'Hány szimmetriatengelye van egy általános (három különböző oldalú) háromszögnek?',
          options: [
            '0 szimmetriatengelye (aszimmetrikus)',
            '1 szimmetriatengelye',
            '3 szimmetriatengelye',
            '2 szimmetriatengelye'
          ],
          correctAnswer: '0 szimmetriatengelye (aszimmetrikus)',
          explanation: 'Ha egy háromszög minden oldala és minden szöge különböző nagyságú, akkor nincs olyan egyenes, amelyre tükrözve önmagába menne át, tehát 0 szimmetriatengelye van.',
          figure: <AxialSymmetryMiniFigure type="zero_axes" />
        },
        {
          id: 'q1-9',
          question: 'Melyik nyomtatott nagybetű rendelkezik függőleges szimmetriatengellyel?',
          options: [
            '„A” betű',
            '„E” betű',
            '„F” betű',
            '„P” betű'
          ],
          correctAnswer: '„A” betű',
          explanation: 'Az „A” betű bal és jobb oldala tökéletes tükörképe egymásnak egy függőleges középvonalra nézve.',
          figure: <AxialSymmetryMiniFigure type="letter_a" />
        },
        {
          id: 'q1-10',
          question: 'Melyik nyomtatott nagybetű rendelkezik vízszintes szimmetriatengellyel?',
          options: [
            '„B” és „E” betűk',
            '„A” és „M” betűk',
            '„F” és „G” betűk',
            '„J” és „L” betűk'
          ],
          correctAnswer: '„B” és „E” betűk',
          explanation: 'A „B” és „E” betűk felső és alsó része a vízszintes középvonalra tükrös.',
          figure: <AxialSymmetryMiniFigure type="letter_b" />
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: SOKSZÖGEK, BETŰK ÉS TULAJDONSÁGOK (10 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Sokszögek, betűk és összetett szimmetriák',
      subtitle: 'Deltoid, húrtrapéz, szabályos sokszögek, kettős tengelyű betűk és buktatók',
      range: '11–20. feladat',
      focus: 'Szabályos sokszögek n tengelye, deltoid, húrtrapéz, S és Z betűk',
      questions: [
        {
          id: 'q2-1',
          question: 'Hány szimmetriatengelye van a deltoidnak (ha nem rombusz)?',
          options: [
            '1 szimmetriatengelye (a szimmetriaátlója)',
            '2 szimmetriatengelye',
            '0 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (a szimmetriaátlója)',
          explanation: 'A deltoidnak 1 szimmetriatengelye van: a szimmetriaátlója, amely a különböző hosszúságú oldalak találkozási csúcsait köti össze.',
          figure: <AxialSymmetryMiniFigure type="deltoid" />
        },
        {
          id: 'q2-2',
          question: 'Hány szimmetriatengelye van az egyenlő szárú trapéznak (húrtrapéznak)?',
          options: [
            '1 szimmetriatengelye (a két párhuzamos alap közös felezőmerőlegese)',
            '2 szimmetriatengelye',
            '0 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (a két párhuzamos alap közös felezőmerőlegese)',
          explanation: 'Az egyenlő szárú trapéz szimmetriatengelye a párhuzamos alapok közös felezőmerőlegese. Az átlói nem szimmetriatengelyek!',
          figure: <AxialSymmetryMiniFigure type="isosceles_trapezoid" />
        },
        {
          id: 'q2-3',
          question: 'Hány szimmetriatengelye van egy szabályos hatszögnek?',
          options: [
            '6 szimmetriatengelye (3 szemközti csúcsokat összekötő főátló + 3 oldalfelező merőleges)',
            '3 szimmetriatengelye',
            '12 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '6 szimmetriatengelye (3 szemközti csúcsokat összekötő főátló + 3 oldalfelező merőleges)',
          explanation: 'Minden szabályos n-szögnek pontosan n darab szimmetriatengelye van. Szabályos hatszögnél n = 6: 3 főátló és 3 szemközti oldalfelező.',
          figure: <AxialSymmetryMiniFigure type="six_axes" />
        },
        {
          id: 'q2-4',
          question: 'Hány szimmetriatengelye van egy általános paralelogrammának (amely nem téglalap és nem rombusz)?',
          options: [
            '0 szimmetriatengelye (nem tengelyesen szimmetrikus!)',
            '2 szimmetriatengelye',
            '1 szimmetriatengelye',
            '4 szimmetriatengelye'
          ],
          correctAnswer: '0 szimmetriatengelye (nem tengelyesen szimmetrikus!)',
          explanation: 'Az általános paralelogrammának 0 szimmetriatengelye van! Bár középpontosan szimmetrikus, nincs olyan egyenes, amelyre tükrözve önmagába menne át.',
          figure: <AxialSymmetryMiniFigure type="parallelogram" />
        },
        {
          id: 'q2-5',
          question: 'Melyik nagybetű rendelkezik mind függőleges, mind vízszintes szimmetriatengellyel (összesen 2 tengellyel)?',
          options: [
            '„H” és „X” betűk',
            '„A” és „B” betűk',
            '„C” és „D” betűk',
            '„M” és „W” betűk'
          ],
          correctAnswer: '„H” és „X” betűk',
          explanation: 'A „H”, „I”, „O”, „X” betűk függőlegesen és vízszintesen is félbehajthatók úgy, hogy a két fél fedje egymást, így 2 szimmetriatengelyük van.',
          figure: <AxialSymmetryMiniFigure type="letter_h" />
        },
        {
          id: 'q2-6',
          question: 'Igaz-e az az állítás, hogy a téglalap átlói szimmetriatengelyek?',
          options: [
            'Hamis, csak a négyzetnél szimmetriatengelyek az átlók',
            'Igaz, minden négyszög átlója szimmetriatengely',
            'Igaz, mert az átló két egybevágó háromszögre osztja a téglalapot',
            'Csak derékszögű trapéznál igaz'
          ],
          correctAnswer: 'Hamis, csak a négyzetnél szimmetriatengelyek az átlók',
          explanation: 'Bár a téglalap átlója két egybevágó derékszögű háromszögre osztja a síkidomot, ha az átló mentén félbehajtjuk a papírt, a csúcsok NEM esnek egybe. Ezért a téglalap átlói nem szimmetriatengelyek.',
          figure: <AxialSymmetryMiniFigure type="two_axes" />
        },
        {
          id: 'q2-7',
          question: 'Hány szimmetriatengelye van egy szabályos 10-szögnek (tízszög)?',
          options: [
            '10 szimmetriatengelye',
            '5 szimmetriatengelye',
            '20 szimmetriatengelye',
            'Végtelen sok'
          ],
          correctAnswer: '10 szimmetriatengelye',
          explanation: 'Az általános szabály: a szabályos n-szögeknek mindig pontosan n darab szimmetriatengelyük van. Szabályos 10-szög esetén ez pontosan 10 tengely.',
          figure: <AxialSymmetryMiniFigure type="six_axes" />
        },
        {
          id: 'q2-8',
          question: 'Hány szimmetriatengelye van egy félkörlapnak?',
          options: [
            '1 szimmetriatengelye (az egyenes határoló átmérő szakasz felezőmerőlegese)',
            '2 szimmetriatengelye',
            'Végtelen sok szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (az egyenes határoló átmérő szakasz felezőmerőlegese)',
          explanation: 'A teljes körnek végtelen sok tengelye van, de a félkörnek csak egyetlen: az átmérő szakasz felezőmerőlegese.',
          figure: <AxialSymmetryMiniFigure type="semicircle" />
        },
        {
          id: 'q2-9',
          question: 'Hány szimmetriatengelye van a nyomtatott „S” és „Z” betűknek?',
          options: [
            '0 szimmetriatengelyük van (nincs tengelyes szimmetriájuk)',
            '1-1 vízszintes tengelyük van',
            '1-1 átlós tengelyük van',
            '2-2 tengelyük van'
          ],
          correctAnswer: '0 szimmetriatengelyük van (nincs tengelyes szimmetriájuk)',
          explanation: 'Az „S” és „Z” betűk középpontosan (180°-os elforgatással) szimmetrikusak, de nincs szimmetriatengelyük: ha félbehajtod őket, a szárak ellentétes irányba mutatnak.',
          figure: <AxialSymmetryMiniFigure type="letter_s" />
        },
        {
          id: 'q2-10',
          question: 'Milyen szimmetriát mutat a kiterjesztett szárnyú pillangó az élővilágban?',
          options: [
            '1 függőleges szimmetriatengelyű kétoldali (bilaterális) szimmetriát',
            '4 tengelyes szimmetriát',
            'Középpontos forgásszimmetriát',
            'Végtelen sok szimmetriatengelyt'
          ],
          correctAnswer: '1 függőleges szimmetriatengelyű kétoldali (bilaterális) szimmetriát',
          explanation: 'A pillangó teste mentén húzódó függőleges egyenesre nézve a bal és a jobb szárny mintázata és formája tökéletes tükörképi párt alkot (1 szimmetriatengely).',
          figure: <AxialSymmetryMiniFigure type="natural_butterfly" />
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: ÖSSZETETT SOKSZÖGEK ÉS LOGIKAI FELADATOK (10 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Szabályos sokszögek, transzformációk és logikai feladványok',
      subtitle: 'Páros/páratlan n-szögek, kettős tükrözés, derékszögű háromszögek és távolságok',
      range: '21–30. feladat',
      focus: 'Szabályos n-szögek szerkezete, fix pontok, távolságszámítás',
      questions: [
        {
          id: 'q3-1',
          question: 'Hogyan helyezkednek el a szimmetriatengelyek egy páratlan csúcsszámú szabályos sokszögnél (pl. szabályos 5-szög, 7-szög)?',
          options: [
            'Minden tengely egy csúcsot köt össze a szemközti oldal felezőpontjával',
            'Minden tengely két szemközti csúcsot köt össze',
            'Minden tengely két oldalfelező pontot köt össze',
            'Nincsenek szimmetriatengelyei'
          ],
          correctAnswer: 'Minden tengely egy csúcsot köt össze a szemközti oldal felezőpontjával',
          explanation: 'Páratlan csúcsszámú szabályos n-szögeknél n darab tengely van, és mindegyik egy csúcson és a szemközti oldal felezőpontján halad át.',
          figure: <AxialSymmetryMiniFigure type="five_axes" />
        },
        {
          id: 'q3-2',
          question: 'Egy síkidomot egymás után két egymásra merőleges tengelyre tükrözünk. Milyen egyetlen transzformációval egyenértékű ez az összetett művelet?',
          options: [
            'Középpontos tükrözéssel (180°-os forgatással) a két tengely metszéspontja körül',
            'Egyetlen tengelyes tükrözéssel',
            'Párhuzamos eltolással',
            'Semmivel, az alakzat eltűnik'
          ],
          correctAnswer: 'Középpontos tükrözéssel (180°-os forgatással) a két tengely metszéspontja körül',
          explanation: 'Két egymásra merőleges egyenesre való egymást követő tengelyes tükrözés mindig egyenértékű a metszéspont körüli középpontos tükrözéssel (180°-os elforgatással).',
          figure: <AxialSymmetryMiniFigure type="letter_h" />
        },
        {
          id: 'q3-3',
          question: 'Egy konvex sokszögnek pontosan 5 szimmetriatengelye van. Milyen sokszög lehet ez?',
          options: [
            'Szabályos ötszög',
            'Egyenlő szárú ötszög',
            'Szabályos tízszög',
            'Deltoid'
          ],
          correctAnswer: 'Szabályos ötszög',
          explanation: 'Egy ötszögnek akkor és csak akkor van 5 szimmetriatengelye, ha minden oldala és minden szöge egyenlő, vagyis ha szabályos ötszög.',
          figure: <AxialSymmetryMiniFigure type="five_axes" />
        },
        {
          id: 'q3-4',
          question: 'Egy rombusz átlóinak hossza e = 6 cm és f = 8 cm. Mely egyenesek a rombusz szimmetriatengelyei és hány darab van?',
          options: [
            '2 darab szimmetriatengelye van: a 6 cm-es és a 8 cm-es átlók egyenesei',
            '4 darab szimmetriatengelye van: a 2 átló és a 2 oldalfelező',
            '1 darab szimmetriatengelye van: a hosszabbik átló',
            '0 szimmetriatengelye van'
          ],
          correctAnswer: '2 darab szimmetriatengelye van: a 6 cm-es és a 8 cm-es átlók egyenesei',
          explanation: 'A rombusz szimmetriatengelyei kizárólag a két átlójának az egyenesei, amelyek merőlegesek egymásra és felezik a szögeket.',
          figure: <AxialSymmetryMiniFigure type="rhombus_axes" />
        },
        {
          id: 'q3-5',
          question: 'Ha egy szakasz pontosan a szimmetriatengelyre esik, hány fixpontja van a tengelyes tükrözés során?',
          options: [
            'A szakasz minden egyes pontja fixpont (végtelen sok fixpont)',
            'Csak a két végpontja',
            'Csak a felezőpontja',
            'Egyetlen fixpontja sincs'
          ],
          correctAnswer: 'A szakasz minden egyes pontja fixpont (végtelen sok fixpont)',
          explanation: 'A szimmetriatengely minden egyes pontja helyben maradó pont (fixpont), ezért ha a szakasz a tengelyen fekszik, annak összes pontja önmagába képződik le.',
          figure: <AxialSymmetryMiniFigure type="one_axis" />
        },
        {
          id: 'q3-6',
          question: 'Hány szimmetriatengelye van egy derékszögű, egyenlő szárú háromszögnek?',
          options: [
            '1 szimmetriatengelye (az átfogóhoz tartozó magasság / szögfelező)',
            '3 szimmetriatengelye',
            '2 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: '1 szimmetriatengelye (az átfogóhoz tartozó magasság / szögfelező)',
          explanation: 'Mivel a háromszög egyenlő szárú, rendelkezik 1 szimmetriatengellyel, amely a 90°-os csúcsból indul és merőlegesen felezi az átfogót.',
          figure: <AxialSymmetryMiniFigure type="right_triangle" />
        },
        {
          id: 'q3-7',
          question: 'Hány szimmetriatengelye van egy koncentrikus körgyűrűnek (két közös középpontú kör közötti sáv)?',
          options: [
            'Végtelen sok (a közös középponton átmenő bármely egyenes szimmetriatengely)',
            '2 szimmetriatengelye',
            '4 szimmetriatengelye',
            '0 szimmetriatengelye'
          ],
          correctAnswer: 'Végtelen sok (a közös középponton átmenő bármely egyenes szimmetriatengely)',
          explanation: 'Mivel mindkét kör középpontja megegyezik, a közös középponton átmenő bármely egyenes mindkét kört és így a köztük lévő gyűrűt is önmagába tükrözi.',
          figure: <AxialSymmetryMiniFigure type="concentric_rings" />
        },
        {
          id: 'q3-8',
          question: 'Melyik állítás HAMIS a négyzet szimmetriájáról?',
          options: [
            'A négyzetnek csak a 2 átlója a szimmetriatengelye',
            'A négyzetnek 4 szimmetriatengelye van',
            'A négyzet oldalfelező merőlegesei szimmetriatengelyek',
            'A négyzet szimmetriatengelyei egyetlen közös pontban metszik egymást'
          ],
          correctAnswer: 'A négyzetnek csak a 2 átlója a szimmetriatengelye',
          explanation: 'Ez az állítás hamis, mert a négyzetnek nemcsak a 2 átlója, hanem a szemközti oldalak 2 oldalfelező merőlegese is szimmetriatengelye (összesen 4 db).',
          figure: <AxialSymmetryMiniFigure type="four_axes" />
        },
        {
          id: 'q3-9',
          question: 'A hópehely kristályok a természetben leggyakrabban hány szimmetriatengellyel rendelkeznek?',
          options: [
            '6 szimmetriatengellyel (hexagonális kristályszerkezet)',
            '4 szimmetriatengellyel',
            '8 szimmetriatengellyel',
            '1 szimmetriatengellyel'
          ],
          correctAnswer: '6 szimmetriatengellyel (hexagonális kristályszerkezet)',
          explanation: 'A vízmolekulák fagyásakor kialakuló kristályrács hatszöges (hexagonális) geometriát követ, így a hópelyheknek 6 szimmetriatengelyük van.',
          figure: <AxialSymmetryMiniFigure type="snowflake" />
        },
        {
          id: 'q3-10',
          question: 'Egy alakzat tengelyesen szimmetrikus a t tengelyre nézve. Az A pont és a tükörképe A\' közötti távolság |AA\'| = 14 cm. Milyen távol van az A pont a t szimmetriatengelytől?',
          options: [
            '7 cm (a távolság fele, mert a tengely felezi az AA\' szakaszt)',
            '14 cm',
            '28 cm',
            '3,5 cm'
          ],
          correctAnswer: '7 cm (a távolság fele, mert a tengely felezi az AA\' szakaszt)',
          explanation: 'A szimmetriatengely a tükörképi pontpárokat összekötő szakasz felezőmerőlegese, így az A pont távolsága a tengelytől pontosan 14 cm / 2 = 7 cm.',
          figure: <AxialSymmetryMiniFigure type="one_axis" />
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes szimmetria Kvíz"
      subtitle="Definíció, szimmetriatengelyek száma, betűk, sokszögek és természetes szimmetriák 3 szinten"
      badge="📐 6. Osztály • III. Geometria • 8. Fejezet"
      topicId="g6-axial-symmetry-quiz"
      themeColor="violet"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <AxialSymmetryMatcher {...props} />}
      renderSorter={(props) => <AxialSymmetrySorter {...props} />}
      matcherComponent={
        <AxialSymmetryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <AxialSymmetrySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
