import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { ReflectionMiniFigure } from './AxialReflectionDiagrams';
import { AxialReflectionMatcher } from './AxialReflectionMatcher';
import { AxialReflectionSorter } from './AxialReflectionSorter';

export interface AxialReflectionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function AxialReflectionQuiz({ onBack, onSwitchToTheory }: AxialReflectionQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: ALAPFOGALMAK ÉS DEFINÍCIÓK (10 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: Alapfogalmak és elemi tükrözések',
      subtitle: 'Tengelyes tükrözés definíciója, távolságtartás, fixpontok és alapvető koordináták',
      range: '1–10. feladat',
      focus: 'Tengely, merőlegesség, felezés, fixpontok',
      questions: [
        {
          id: 'q1-1',
          question: 'Mi a tengelyes tükrözés pontos geometriai definíciója egy P pontra nézve, ha P nincs a t tengelyen?',
          options: [
            'A t tengely a PP\' szakasz felezőmerőlegese (PP\' ⊥ t és d(P, t) = d(P\', t))',
            'A t tengely párhuzamos a PP\' szakasszal',
            'A P\' pont kétszer olyan messze van a tengelytől, mint a P pont',
            'A PP\' szakasz 45°-os szöget zár be a tengellyel'
          ],
          correctAnswer: 'A t tengely a PP\' szakasz felezőmerőlegese (PP\' ⊥ t és d(P, t) = d(P\', t))',
          explanation: 'A tengelyes tükrözés során a pontot és képét összekötő szakasz merőleges a tükrözési tengelyre, és a tengely pontosan felezi ezt a szakaszt.',
          figure: <ReflectionMiniFigure type="point_reflection" />
        },
        {
          id: 'q1-2',
          question: 'Mi a tengelyes tükrözés során a t tengelyen fekvő Q pont tükörképe (Q \u2208 t)?',
          options: [
            'Önmaga: Q\' = Q (a tengely pontjai fixpontok)',
            'A sík egy tetszőleges másik pontja',
            'Az origó (0; 0)',
            'A tengelyen lévő pontnak nincs tükörképe'
          ],
          correctAnswer: 'Önmaga: Q\' = Q (a tengely pontjai fixpontok)',
          explanation: 'A tükrözési tengely minden pontja fixpont (helyben maradó pont), így képük pontosan önmagukkal egyezik meg: Q\' = Q.',
          figure: <ReflectionMiniFigure type="fix_point" />
        },
        {
          id: 'q1-3',
          question: 'Egy P pont távolsága a t tengelytől 6 cm. Milyen hosszú a pontot és a tükörképét összekötő PP\' szakasz?',
          options: [
            '12 cm (mivel 6 cm + 6 cm = 12 cm)',
            '6 cm',
            '3 cm',
            '24 cm'
          ],
          correctAnswer: '12 cm (mivel 6 cm + 6 cm = 12 cm)',
          explanation: 'Mivel a tengely felezi a PP\' szakaszt, a P pont távolsága a tengelytől (6 cm) egyenlő a P\' pont távolságával (6 cm). A teljes szakasz hossza: 6 cm + 6 cm = 12 cm.'
        },
        {
          id: 'q1-4',
          question: 'Egy AB szakasz hossza 8,5 cm. Mekkora lesz az A\'B\' tükörkép szakasz hossza?',
          options: [
            '8,5 cm (mert a tengelyes tükrözés távolságtartó)',
            '17 cm',
            '4,25 cm',
            'Attól függ, mekkora szöget zár be a tengellyel'
          ],
          correctAnswer: '8,5 cm (mert a tengelyes tükrözés távolságtartó)',
          explanation: 'A tengelyes tükrözés egybevágósági transzformáció, azaz távolságtartó (hossztartó): |A\'B\'| = |AB| = 8,5 cm.'
        },
        {
          id: 'q1-5',
          question: 'Egy szög nagysága 54°. Mekkora lesz a szög tengelyes tükörképe?',
          options: [
            '54° (mert a tengelyes tükrözés szögtartó)',
            '126° (a kiegészítő szöge)',
            '27°',
            '108°'
          ],
          correctAnswer: '54° (mert a tengelyes tükrözés szögtartó)',
          explanation: 'A tengelyes tükrözés szögtartó transzformáció, így a szög nagysága a tükrözés után pontosan változatlan marad (54°).'
        },
        {
          id: 'q1-6',
          question: 'Hogyan változnak egy P(3; 7) pont koordinátái, ha tükrözzük az x-tengelyre?',
          options: [
            'P\'(3; -7) (az x változatlan, az y ellentettjére vált)',
            'P\'(-3; 7)',
            'P\'(-3; -7)',
            'P\'(7; 3)'
          ],
          correctAnswer: 'P\'(3; -7) (az x változatlan, az y ellentettjére vált)',
          explanation: 'Az x-tengelyre történő tükrözéskor a vízszintes helyzet (x) nem változik, a függőleges helyzet (y) pedig az ellentettjére vált: (x; y) \u2192 (x; -y). Így (3; 7) \u2192 (3; -7).',
          figure: <ReflectionMiniFigure type="coord_x" />
        },
        {
          id: 'q1-7',
          question: 'Hogyan változnak egy P(-5; 4) pont koordinátái, ha tükrözzük az y-tengelyre?',
          options: [
            'P\'(5; 4) (az y változatlan, az x ellentettjére vált)',
            'P\'(-5; -4)',
            'P\'(5; -4)',
            'P\'(4; -5)'
          ],
          correctAnswer: 'P\'(5; 4) (az y változatlan, az y ellentettjére vált)',
          explanation: 'Az y-tengelyre történő tükrözéskor az y koordináta marad változatlan, az x koordináta az ellentettjére vált: (x; y) \u2192 (-x; y). Így (-5; 4) \u2192 (5; 4).',
          figure: <ReflectionMiniFigure type="coord_y" />
        },
        {
          id: 'q1-8',
          question: 'Mi történik egy tetszőleges alakzattal, ha kétszer egymás után tükrözzük ugyanarra a t tengelyre?',
          options: [
            'Visszakapjuk az eredeti alakzatot ((P\')\' = P, involúció)',
            'Az alakzat kétszer olyan messzire tolódik',
            'Az alakzat 180°-kal elfordul',
            'Az alakzat területe megduplázódik'
          ],
          correctAnswer: 'Visszakapjuk az eredeti alakzatot ((P\')\' = P, involúció)',
          explanation: 'A tengelyes tükrözés involúció (önmaga inverze): ha a tükörképet újra tükrözzük ugyanarra a tengelyre, pontosan visszajutunk az eredeti pontokba.',
          figure: <ReflectionMiniFigure type="involutive" />
        },
        {
          id: 'q1-9',
          question: 'Mi a képe egy olyan m egyenesnek, amely merőleges a t tükrözési tengelyre (m ⊥ t)?',
          options: [
            'Önmagába képződik (m\' = m, fix egyenes)',
            'Egy a tengellyel párhuzamos egyenes lesz',
            'Egyetlen ponttá zsugorodik',
            '45°-os egyenes lesz belőle'
          ],
          correctAnswer: 'Önmagába képződik (m\' = m, fix egyenes)',
          explanation: 'A tengelyre merőleges egyenes pontjai a tükrözés során a merőleges egyenesen belül cserélnek helyet, így az egyenes egésze mint vonal önmagába képződik (fix egyenes, de nem pontonként fix!).'
        },
        {
          id: 'q1-10',
          question: 'Két egyenes párhuzamos egymással (a ∥ b). Milyen viszonyban lesz a két egyenes t tengelyre vett tükörképe (a\' és b\')?',
          options: [
            'Szintén párhuzamosak lesznek egymással (a\' ∥ b\')',
            'Merőlegesek lesznek egymásra',
            'Pontosan 60°-os szögben metszik majd egymást',
            'Egybe fognak esni'
          ],
          correctAnswer: 'Szintén párhuzamosak lesznek egymással (a\' ∥ b\')',
          explanation: 'A tengelyes tükrözés párhuzamosságtartó transzformáció: ha két egyenes párhuzamos volt, a tükörképeik is párhuzamosak maradnak.'
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: TULAJDONSÁGOK, ALAKZATOK ÉS KOORDINÁTÁK (10 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Körüljárás, sokszögek és összetett koordináták',
      subtitle: 'Körüljárási irány megfordulása, háromszögek, négyszögek és összetett pontok',
      range: '11–20. feladat',
      focus: 'Körüljárási irány, sokszög tükrözés, koordináták',
      questions: [
        {
          id: 'q2-1',
          question: 'Az ABC háromszög csúcsainak körüljárási iránya az óramutató járásával ellentétes (pozitív). Milyen lesz az A\'B\'C\' tükörkép körüljárási iránya?',
          options: [
            'Az óramutató járásával megegyező (negatív, megfordul az irány)',
            'Szintén az óramutató járásával ellentétes marad',
            'Nem értelmezhető a körüljárási irány tükrözéskor',
            'Váltakozó irányú'
          ],
          correctAnswer: 'Az óramutató járásával megegyező (negatív, megfordul az irány)',
          explanation: 'A tengelyes tükrözés megfordítja a sík orientációját (körüljárási irányát). Ezért az óramutató járásával ellentétes irányból óramutató járásával megegyező lesz.',
          figure: <ReflectionMiniFigure type="triangle_inverted" />
        },
        {
          id: 'q2-2',
          question: 'Egy O(2; 5) középpontú, r = 4 cm sugarú kört tükrözünk az x-tengelyre. Mik lesznek az O\' középpont koordinátái és a kör sugara?',
          options: [
            'O\'(2; -5) és a sugár r\' = 4 cm marad',
            'O\'(-2; 5) és a sugár r\' = 8 cm',
            'O\'(-2; -5) és a sugár r\' = 2 cm',
            'O\'(5; 2) és a sugár r\' = 4 cm'
          ],
          correctAnswer: 'O\'(2; -5) és a sugár r\' = 4 cm marad',
          explanation: 'A kör tükrözésekor a középpontot tükrözzük: (2; 5) \u2192 (2; -5), míg a kör sugara a távolságtartás miatt változatlan marad (r = 4 cm).',
          figure: <ReflectionMiniFigure type="circle_reflection" />
        },
        {
          id: 'q2-3',
          question: 'Egy AB szakasz metszi a t tengelyt egy M pontban. Hol metszi a tükörkép A\'B\' szakasz a t tengelyt?',
          options: [
            'Pontosan ugyanabban az M pontban (mivel M \u2208 t fixpont, M\' = M)',
            'A tengely egy másik pontjában',
            'Nem metszi a tengelyt, hanem párhuzamos vele',
            'A tengely felezőpontjában'
          ],
          correctAnswer: 'Pontosan ugyanabban az M pontban (mivel M \u2208 t fixpont, M\' = M)',
          explanation: 'Mivel az M metszéspont a tükrözési tengelyen fekszik, képe önmaga (M\' = M). Ezért a tükörkép szakasz is pontosan az M pontban metszi a tengelyt.',
          figure: <ReflectionMiniFigure type="segment_intersecting" />
        },
        {
          id: 'q2-4',
          question: 'A P(-4; -7) pontot tükrözzük az y-tengelyre. Mik lesznek a P\' tükörkép koordinátái?',
          options: [
            'P\'(4; -7)',
            'P\'(-4; 7)',
            'P\'(4; 7)',
            'P\'(-7; -4)'
          ],
          correctAnswer: 'P\'(4; -7)',
          explanation: 'Az y-tengelyre való tükrözésnél az x koordináta előjele ellentettjére vált: -(-4) = 4, míg az y koordináta változatlan marad (-7). Így P\'(4; -7).'
        },
        {
          id: 'q2-5',
          question: 'Egy háromszög területe 28 cm², kerülete 24 cm. Mennyi a tengelyes tükörkép háromszög területe és kerülete?',
          options: [
            'Területe 28 cm², kerülete 24 cm (a tükrözés egybevágóság)',
            'Területe 56 cm², kerülete 48 cm',
            'Területe 28 cm², de a kerülete megváltozik',
            'Területe 14 cm², kerülete 12 cm'
          ],
          correctAnswer: 'Területe 28 cm², kerülete 24 cm (a tükrözés egybevágóság)',
          explanation: 'Mivel a tengelyes tükrözés egybevágósági transzformáció, minden távolság, szög és a terület is pontosan megegyezik az eredeti alakzatéval.'
        },
        {
          id: 'q2-6',
          question: 'Egy A(2; 3) pont tükörképe az A\'(2; -3) pont. Melyik egyenes volt a tükrözés tengelye?',
          options: [
            'Az x-tengely (az y = 0 egyenes)',
            'Az y-tengely (az x = 0 egyenes)',
            'Az origó',
            'Az y = x egyenes'
          ],
          correctAnswer: 'Az x-tengely (az y = 0 egyenes)',
          explanation: 'Mivel az x koordináta változatlan maradt (2), és az y koordináta váltott előjelet (3 \u2192 -3), a tükrözés tengelye az x-tengely.'
        },
        {
          id: 'q2-7',
          question: 'Egy B(-6; 1) pont tükörképe a B\'(6; 1) pont. Melyik egyenes volt a tükrözés tengelye?',
          options: [
            'Az y-tengely (az x = 0 egyenes)',
            'Az x-tengely (az y = 0 egyenes)',
            'Az y = 1 egyenes',
            'Az x = -6 egyenes'
          ],
          correctAnswer: 'Az y-tengely (az x = 0 egyenes)',
          explanation: 'Mivel az y koordináta változatlan maradt (1), és az x koordináta váltott előjelet (-6 \u2192 6), a tükrözés tengelye az y-tengely.'
        },
        {
          id: 'q2-8',
          question: 'Egy P pont távolsága a t tengelytől 5 cm, egy Q pont távolsága 3 cm. Mennyi a PP\' szakasz és a QQ\' szakasz hosszának különbsége?',
          options: [
            '4 cm (mivel 10 cm - 6 cm = 4 cm)',
            '2 cm',
            '8 cm',
            '0 cm'
          ],
          correctAnswer: '4 cm (mivel 10 cm - 6 cm = 4 cm)',
          explanation: 'PP\' hossza: 2 · 5 = 10 cm. QQ\' hossza: 2 · 3 = 6 cm. A különbségük: 10 cm - 6 cm = 4 cm.'
        },
        {
          id: 'q2-9',
          question: 'Egy P(5; -3) pontot először tükrözünk az x-tengelyre, majd a kapott pontot az y-tengelyre. Mik lesznek a végső pont koordinátái?',
          options: [
            '(-5; 3) (ez megfelel az origóra vett középpontos tükrözésnek)',
            '(5; 3)',
            '(-5; -3)',
            '(3; -5)'
          ],
          correctAnswer: '(-5; 3) (ez megfelel az origóra vett középpontos tükrözésnek)',
          explanation: '1. lépés: x-tengelyre: (5; -3) \u2192 (5; 3). 2. lépés: y-tengelyre: (5; 3) \u2192 (-5; 3). Két egymásra merőleges tengelyre vett egymás utáni tükrözés egyenértékű a metszéspontra (origóra) vett tükrözéssel!',
          figure: <ReflectionMiniFigure type="coord_orig" />
        },
        {
          id: 'q2-10',
          question: 'Egy derékszögű háromszög befogói a = 3 cm és b = 4 cm. Mennyi a tükörkép háromszög átfogójának hossza?',
          options: [
            '5 cm (mert az átfogó hossza nem változik a tükrözéskor)',
            '7 cm',
            '10 cm',
            '2,5 cm'
          ],
          correctAnswer: '5 cm (mert az átfogó hossza nem változik a tükrözéskor)',
          explanation: 'Az eredeti háromszög átfogója c = 5 cm (3-4-5 derékszögű háromszög). A tengelyes tükrözés távolságtartó, így a tükörkép átfogója is pontosan 5 cm.'
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: SZERKESZTÉSEK, SZÖVEGES ÉS ÖSSZETETT FELADATOK (10 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Szerkesztési módszerek és geometriai összefüggések',
      subtitle: 'Tengely megszerkesztése, algebrai koordináták, transzformáció-összetételek',
      range: '21–30. feladat',
      focus: 'Tengely szerkesztése, algebrai feladatok, reflexió-tulajdonságok',
      questions: [
        {
          id: 'q3-1',
          question: 'Adott egy síkbeli A pont és annak tükörképe, az A\' pont. Hogyan szerkeszthető meg a tükrözés tengelye?',
          options: [
            'Az AA\' szakasz felezőmerőlegesének megszerkesztésével körzővel és vonalzóval',
            'Az A pontból párhuzamost húzunk az A\' ponttal',
            'Az A és A\' pontok összekötésével',
            'Egyenlő oldalú háromszöget szerkesztünk az AA\' szakaszra'
          ],
          correctAnswer: 'Az AA\' szakasz felezőmerőlegesének megszerkesztésével körzővel és vonalzóval',
          explanation: 'Mivel a definíció szerint a tengely az összetartozó pontpár (AA\') szakaszfelező merőlegese, ezért elegendő megszerkeszteni az AA\' szakasz felezőmerőlegesét.',
          figure: <ReflectionMiniFigure type="axis_construction" />
        },
        {
          id: 'q3-2',
          question: 'A P(a - 3; 2b + 1) pont x-tengelyre vonatkozó tükörképe a P\'(4; -9) pont. Mennyi az a és b értéke?',
          options: [
            'a = 7 és b = 4',
            'a = 1 és b = -5',
            'a = 7 és b = -4',
            'a = -1 és b = 4'
          ],
          correctAnswer: 'a = 7 és b = 4',
          explanation: 'x-tengelyes tükrözésnél az x koordináta megegyezik: a - 3 = 4 \u2192 a = 7. Az y koordináta az ellentettjére vált: -(2b + 1) = -9 \u2192 2b + 1 = 9 \u2192 2b = 8 \u2192 b = 4.'
        },
        {
          id: 'q3-3',
          question: 'A Q(3k - 2; 5m - 4) pont y-tengelyre vonatkozó tükörképe a Q\'(-10; 11) pont. Mennyi a k és m értéke?',
          options: [
            'k = 4 és m = 3',
            'k = -4 és m = 3',
            'k = 4 és m = -3',
            'k = 2 és m = 5'
          ],
          correctAnswer: 'k = 4 és m = 3',
          explanation: 'y-tengelyes tükrözésnél az x koordináta ellentettjére vált: -(3k - 2) = -10 \u2192 3k - 2 = 10 \u2192 3k = 12 \u2192 k = 4. Az y koordináta változatlan: 5m - 4 = 11 \u2192 5m = 15 \u2192 m = 3.'
        },
        {
          id: 'q3-4',
          question: 'Milyen összetett transzformációt kapunk, ha egy alakzatot egymás után kétszer tükrözünk két egymással párhuzamos, d távolságra lévő tengelyre (t₁ ∥ t₂)?',
          options: [
            'Párhuzamos eltolást a tengelyekre merőleges irányban, 2·d nagyságú elmozdulással',
            'Középpontos tükrözést',
            'Egy helyben maradást',
            '90°-os elforgatást'
          ],
          correctAnswer: 'Párhuzamos eltolást a tengelyekre merőleges irányban, 2·d nagyságú elmozdulással',
          explanation: 'Két párhuzamos tengelyre történő egymás utáni tükrözés egyenértékű egy párhuzamos eltolással, ahol az eltolás vektora merőleges a tengelyekre, nagysága pedig a tengelyek távolságának kétszerese (2d).'
        },
        {
          id: 'q3-5',
          question: 'Milyen összetett transzformációt kapunk, ha egy alakzatot egymás után kétszer tükrözünk két olyan tengelyre, amelyek α szögben metszik egymást az M pontban?',
          options: [
            'M pont körüli 2·α szögű elforgatást',
            'Párhuzamos eltolást',
            'Körüljárási irány megfordulását',
            'Nagyítást'
          ],
          correctAnswer: 'M pont körüli 2·α szögű elforgatást',
          explanation: 'Két metsző tengelyre történő egymás utáni tükrözés egyenértékű a tengelyek metszéspontja körüli elforgatással, ahol a forgatás szöge a két tengely által bezárt szög kétszerese (2α).'
        },
        {
          id: 'q3-6',
          question: 'Egy A(1; 2) és B(5; 5) végpontú szakasz hosszát tükrözzük az y-tengelyre. Mennyi lesz az A\'B\' szakasz hossza?',
          options: [
            '5 egység (mivel a vízszintes különbség 4, függőleges 3, és 3² + 4² = 5²)',
            '6 egység',
            '7 egység',
            '4 egység'
          ],
          correctAnswer: '5 egység (mivel a vízszintes különbség 4, függőleges 3, és 3² + 4² = 5²)',
          explanation: 'Az eredeti AB szakasz hossza a koordináták alapján: √( (5-1)² + (5-2)² ) = √(16 + 9) = √25 = 5. A távolságtartás miatt |A\'B\'| = 5 egység.'
        },
        {
          id: 'q3-7',
          question: 'Mi a különbség egy fix pont és egy fix egyenes között a tengelyes tükrözésben?',
          options: [
            'Fix pontnál a pont helyben marad (P\' = P), fix egyenesnél az egyenes egésze önmagába képződik, de pontjai helyet cserélhetnek',
            'Nincs különbség, mindkettő ugyanazt jelenti',
            'A fix egyenes minden pontja fix pont',
            'Fix pont csak az origó lehet'
          ],
          correctAnswer: 'Fix pontnál a pont helyben marad (P\' = P), fix egyenesnél az egyenes egésze önmagába képződik, de pontjai helyet cserélhetnek',
          explanation: 'A tükrözési tengely pontonként fix (minden pontja fix pont). A tengelyre merőleges egyenesek önmagukba képződnek (fix egyenesek), de a pontjaik átkerülnek a túloldalra, tehát nem pontonként fixek.'
        },
        {
          id: 'q3-8',
          question: 'Egy folyó partján (t tengely) lévő P ivóhelyhez szeretnénk eljutni az A pontból a B pontba a legrövidebb úton (Heron-probléma). Hogyan találjuk meg a P pontot?',
          options: [
            'Megtükrözzük a B pontot a folyópart t tengelyére (B\'), majd összekötjük A-t B\'-vel; a metszéspont lesz P',
            'Felezzük az AB szakaszt, és merőlegest állítunk a folyóra',
            'A-ból és B-ből merőlegest állítunk a folyóra',
            'Tetszőleges pont jó a parton'
          ],
          correctAnswer: 'Megtükrözzük a B pontot a folyópart t tengelyére (B\'), majd összekötjük A-t B\'-vel; a metszéspont lesz P',
          explanation: 'A tükrözés segítségével az AP + PB távolság egyenlő az AP + PB\' távolsággal. Két pont között a legrövidebb út az egyenes szakasz, így az AB\' egyenes és a t tengely metszéspontja adja a minimális utat.'
        },
        {
          id: 'q3-9',
          question: 'Mikor mondjuk egy síkbeli alakzatról, hogy tengelyesen szimmetrikus?',
          options: [
            'Ha létezik olyan t egyenes a síkban, amelyre tükrözve az alakzat önmagába megy át',
            'Ha minden szöge derékszög',
            'Ha páros számú oldala van',
            'Ha az alakzat középpontosan is szimmetrikus'
          ],
          correctAnswer: 'Ha létezik olyan t egyenes a síkban, amelyre tükrözve az alakzat önmagába megy át',
          explanation: 'Egy alakzat akkor tengelyesen szimmetrikus, ha van legalább egy olyan szimmetriatengelye, amelyre vonatkozó tengelyes tükrözés az alakzat minden pontját az alakzat valamely pontjába viszi át.'
        },
        {
          id: 'q3-10',
          question: 'Egy P(x; y) pontot tükrözünk az y = x egyenesre (a koordináta-rendszer I. és III. síknegyedének szögfelezőjére). Mik lesznek a P\' pont koordinátái?',
          options: [
            'P\'(y; x) (a két koordináta helyet cserél)',
            'P\'(-x; -y)',
            'P\'(-y; -x)',
            'P\'(x; -y)'
          ],
          correctAnswer: 'P\'(y; x) (a két koordináta helyet cserél)',
          explanation: 'Az y = x egyenesre történő tükrözéskor az x és y koordináták pontosan felcserélődnek: P(x; y) \u2192 P\'(y; x). Például (2; 5) tükörképe (5; 2).'
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes tükrözés Kvíz"
      subtitle="Definíció, koordinátatükrözés, távolságtartás, körüljárási irány és szerkesztések"
      badge="📐 6. Osztály • III. Geometria • 6. Fejezet"
      topicId="g6-axial-reflection-quiz"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <AxialReflectionMatcher {...props} />}
      renderSorter={(props) => <AxialReflectionSorter {...props} />}
    />
  );
}
