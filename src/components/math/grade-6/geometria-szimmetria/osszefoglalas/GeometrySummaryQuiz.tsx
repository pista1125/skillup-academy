import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { GeometrySummaryMiniFigure } from './GeometrySummaryDiagrams';
import { GeometrySummaryMatcher } from './GeometrySummaryMatcher';
import { GeometrySummarySorter } from './GeometrySummarySorter';

export interface GeometrySummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function GeometrySummaryQuiz({ onBack, onSwitchToTheory }: GeometrySummaryQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: ALAPFOGALMAK, DEFINÍCIÓK ÉS SZIMMETRIÁK (30 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: Alapfogalmak, definíciók és szimmetriatengelyek',
      subtitle: 'Alapfogalmak, a kör részei, tükrözési szabályok és szimmetriatengelyek',
      range: '1–30. feladat',
      focus: 'Alapfogalmak, kör elemei, tengelyes tükrözés alaptulajdonságai, szimmetriatengelyek száma',
      questions: [
        {
          id: 'q1-1',
          question: 'Mi a különbség az egyenes és a szakasz között?',
          options: [
            'Az egyenes mindkét irányban végtelen, míg a szakasz két pont által határolt véges darab',
            'Az egyenes mérhető hosszúságú, a szakasz végtelen',
            'Nincs különbség, mindkettő végtelen vonal',
            'A szakasz görbe vonal, az egyenes egyenes'
          ],
          correctAnswer: 'Az egyenes mindkét irányban végtelen, míg a szakasz két pont által határolt véges darab',
          explanation: 'Az egyenes mindkét irányban végtelenül meghosszabbítható (nincs végpontja), míg a szakasz két pont (végpont) közötti mérhető hosszúságú egyenes vonaldarab.',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q1-2',
          question: 'Hogyan jelöljük azt, hogy az "e" és "f" egyenesek merőlegesek egymásra?',
          options: ['e ⊥ f', 'e || f', 'e ≅ f', 'e ∈ f'],
          correctAnswer: 'e ⊥ f',
          explanation: 'A merőlegesség matematikai jele a fordított T betűre hasonlító "⊥" szimbólum (e ⊥ f azt jelenti, hogy derékszöget, 90°-ot zárnak be).',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q1-3',
          question: 'Mi a kör sugara (r) és átmérője (d) közötti összefüggés?',
          options: ['d = 2 · r', 'r = 2 · d', 'd = r + 2', 'd = r²'],
          correctAnswer: 'd = 2 · r',
          explanation: 'A kör átmérője a középponton átmenő leghosszabb húr, amely pontosan kétszerese a sugárnak: d = 2r (illetve r = d / 2).',
          figure: <GeometrySummaryMiniFigure type="circle_parts" />
        },
        {
          id: 'q1-4',
          question: 'Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?',
          options: ['Pontosan 90°-ot (derékszög)', '45°-ot', '180°-ot (párhuzamosak)', 'Tetszőleges hegyesszöget'],
          correctAnswer: 'Pontosan 90°-ot (derékszög)',
          explanation: 'A kör bármely érintője merőleges az érintési pontba húzott sugárra (e ⊥ r).',
          figure: <GeometrySummaryMiniFigure type="tangent_perpendicular" />
        },
        {
          id: 'q1-5',
          question: 'Melyik állítás igaz a szakaszfelező merőleges pontjaira?',
          options: [
            'A szakasz mindkét végpontjától egyenlő távolságra vannak (PA = PB)',
            'Csak a szakasz egyik végpontjához vannak közelebb',
            'A szakasz hosszának kétszeresére vannak a végpontoktól',
            'Mindig átmennek a szakasz végpontjain'
          ],
          correctAnswer: 'A szakasz mindkét végpontjától egyenlő távolságra vannak (PA = PB)',
          explanation: 'A szakaszfelező merőleges azon pontok mértani helye a síkban, amelyek az AB szakasz két végpontjától egyenlő távolságra helyezkednek el: PA = PB.',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q1-6',
          question: 'Mely pontok halmaza alkotja egy szög szögfelező félegyenesét?',
          options: [
            'Azon pontok, amelyek a szög két szárától egyenlő távolságra vannak',
            'Azon pontok, amelyek a szög csúcsától 5 cm-re vannak',
            'A szög szárait összekötő egyenes pontjai',
            'A szög csúcsán átmenő bármely egyenes'
          ],
          correctAnswer: 'Azon pontok, amelyek a szög két szárától egyenlő távolságra vannak',
          explanation: 'A szögfelező a szögtartomány azon pontjainak halmaza, amelyek mindkét szögszártól azonos merőleges távolságra vannak, és a szöget két egyenlő részre felezik.',
          figure: <GeometrySummaryMiniFigure type="angle_bisector" />
        },
        {
          id: 'q1-7',
          question: 'Melyik NEM alaptulajdonsága a tengelyes tükrözésnek az alábbiak közül?',
          options: [
            'Megváltoztatja a síkidomok területét és méretét',
            'Távolságtartó (|A\'B\'| = |AB|)',
            'Szögtartó (α\' = α)',
            'Megfordítja a körüljárási irányt (orientációváltó)'
          ],
          correctAnswer: 'Megváltoztatja a síkidomok területét és méretét',
          explanation: 'A tengelyes tükrözés egybevágósági transzformáció, így sem a távolságokat, sem a szögeket, sem a területet és kerületet NEM változtatja meg.',
          figure: <GeometrySummaryMiniFigure type="five_properties" />
        },
        {
          id: 'q1-8',
          question: 'Mely pontok a tengelyes tükrözés fixpontjai (önmagukba képződő pontjai)?',
          options: [
            'Kizárólag a tükörtengelyen lévő pontok',
            'A sík összes pontja',
            'A tengelytől 10 cm-re lévő pontok',
            'A tengelyes tükrözésnek egyáltalán nincs fixpontja'
          ],
          correctAnswer: 'Kizárólag a tükörtengelyen lévő pontok',
          explanation: 'Egy pont képe pontosan akkor egyezik meg önmagával (P = P\'), ha a pont rajta van a tükrözés tengelyén (P ∈ t).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q1-9',
          question: 'Hány szimmetriatengelye van egy egyenlő szárú (nem szabályos) háromszögnek?',
          options: ['1', '2', '3', '0'],
          correctAnswer: '1',
          explanation: 'Az egyenlő szárú háromszögnek pontosan 1 szimmetriatengelye van: az alaphoz tartozó felezőmerőleges (amely egyben a csúcsszög szögfelezője és a magasságvonal is).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q1-10',
          question: 'Hány szimmetriatengelye van a szabályos (egyenlő oldalú) háromszögnek?',
          options: ['3', '1', '2', '6'],
          correctAnswer: '3',
          explanation: 'A szabályos háromszögnek mindhárom oldalfelező merőlegese szimmetriatengely, így összesen 3 szimmetriatengelye van.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_equilateral" />
        },
        {
          id: 'q1-11',
          question: 'Hány szimmetriatengelye van egy téglalapnak (amely nem négyzet)?',
          options: ['2 (a szemközti oldalak felezőmerőlegesei)', '4 (az oldalak felezői és az átlók)', '1 (az egyik átló)', '0'],
          correctAnswer: '2 (a szemközti oldalak felezőmerőlegesei)',
          explanation: 'A téglalapnak 2 szimmetriatengelye van: a szemközti oldalak felezőmerőlegesei. Az átlói NEM szimmetriatengelyek (kivéve ha négyzet)!',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />
        },
        {
          id: 'q1-12',
          question: 'Hány szimmetriatengelye van a rombusznak (amely nem négyzet)?',
          options: ['2 (a két átló egyenese)', '4', '1', '0'],
          correctAnswer: '2 (a két átló egyenese)',
          explanation: 'A rombusz szimmetriatengelyei a két átlójának egyenesei (2 darab). Az oldalfelező merőlegesek nem szimmetriatengelyek (kivéve négyzetnél).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q1-13',
          question: 'Hány szimmetriatengelye van a négyzetnek?',
          options: ['4 (2 oldalfelező merőleges + 2 átló)', '2', '1', '8'],
          correctAnswer: '4 (2 oldalfelező merőleges + 2 átló)',
          explanation: 'A négyzet egyszerre szabályos négyszög, téglalap és rombusz, így a 2 oldalfelező merőleges és a 2 átló is szimmetriatengely (összesen 4 tengely).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />
        },
        {
          id: 'q1-14',
          question: 'Hány szimmetriatengelye van egy deltoidnak (amely nem rombusz)?',
          options: ['1 (a szimmetriaátló egyenese)', '2', '4', '0'],
          correctAnswer: '1 (a szimmetriaátló egyenese)',
          explanation: 'A deltoidnak 1 szimmetriatengelye van: az az átlója, amely a két különböző hosszúságú oldalpár közötti csúcsokat köti össze.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />
        },
        {
          id: 'q1-15',
          question: 'Hány szimmetriatengelye van egy húrtrapéznak (egyenlő szárú trapéznak)?',
          options: ['1 (a párhuzamos alapok közös oldalfelező merőlegese)', '2', '4', '0'],
          correctAnswer: '1 (a párhuzamos alapok közös oldalfelező merőlegese)',
          explanation: 'A húrtrapéz szimmetriatengelye a két párhuzamos alap közös felezőmerőlegese (1 darab).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" />
        },
        {
          id: 'q1-16',
          question: 'Hány szimmetriatengelye van a körnek?',
          options: ['Végtelen sok (minden, a középponton átmenő egyenes)', '4', '360', 'Csak 1'],
          correctAnswer: 'Végtelen sok (minden, a középponton átmenő egyenes)',
          explanation: 'A körnek végtelen sok szimmetriatengelye van: bármely egyenes, amely áthalad a kör O középpontján (minden átmérő egyenese).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_circle" />
        },
        {
          id: 'q1-17',
          question: 'Mennyi bármely háromszög belső szögeinek összege?',
          options: ['180°', '360°', '90°', '270°'],
          correctAnswer: '180°',
          explanation: 'A síkbeli háromszögek belső szögeinek összege minden esetben pontosan 180° (α + β + γ = 180°).',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q1-18',
          question: 'Mennyi bármely konvex négyszög belső szögeinek összege?',
          options: ['360°', '180°', '540°', '720°'],
          correctAnswer: '360°',
          explanation: 'Bármely négyszög egy átlójával két háromszögre bontható, így belső szögeinek összege 2 · 180° = 360°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />
        },
        {
          id: 'q1-19',
          question: 'Mi a geometriai szerkesztés 4 lépésének helyes sorrendje?',
          options: [
            '1. Vázlat & elemzés → 2. Szerkesztési terv → 3. Pontos szerkesztés → 4. Bizonyítás & diszkusszió',
            '1. Pontos szerkesztés → 2. Vázlat → 3. Számolás → 4. Ellenőrzés',
            '1. Szögmérés → 2. Vonalazás → 3. Színezés → 4. Javítás',
            '1. Terv → 2. Vázlat → 3. Diszkusszió → 4. Rajz'
          ],
          correctAnswer: '1. Vázlat & elemzés → 2. Szerkesztési terv → 3. Pontos szerkesztés → 4. Bizonyítás & diszkusszió',
          explanation: 'A klasszikus szerkesztés kötelező menete: 1. Vázlat és elemzés, 2. Szerkesztési terv, 3. Pontos szerkesztés körzővel-vonalzóval, 4. Bizonyítás és diszkusszió.',
          figure: <GeometrySummaryMiniFigure type="construction_4steps" />
        },
        {
          id: 'q1-20',
          question: 'Mit mond ki a háromszög-egyenlőtlenség tétele?',
          options: [
            'Bármely két oldal összege nagyobb a harmadik oldalnál (a + b > c)',
            'A három oldal összege mindig 180 cm',
            'A leghosszabb oldal egyenlő a másik kettő összegével',
            'Minden oldalnak különböző hosszúságúnak kell lennie'
          ],
          correctAnswer: 'Bármely két oldal összege nagyobb a harmadik oldalnál (a + b > c)',
          explanation: 'A háromszög-egyenlőtlenség szerint egy háromszög pontosan akkor szerkeszthető meg, ha a + b > c, a + c > b és b + c > a.',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />
        },
        {
          id: 'q1-21',
          question: 'Szerkeszthető-e háromszög az a = 4 cm, b = 5 cm, c = 10 cm adatokból?',
          options: [
            'Nem, mert 4 + 5 = 9 < 10 (sérül a háromszög-egyenlőtlenség)',
            'Igen, mert mind a három szám pozitív',
            'Igen, derékszögű háromszög lesz',
            'Igen, mert 10 - 5 = 5 > 4'
          ],
          correctAnswer: 'Nem, mert 4 + 5 = 9 < 10 (sérül a háromszög-egyenlőtlenség)',
          explanation: 'Mivel a két rövidebb oldal összege (4 + 5 = 9 cm) kisebb a leghosszabb oldalnál (10 cm), a körívek nem metszik egymást, a háromszög nem létezik (0 megoldás).',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />
        },
        {
          id: 'q1-22',
          question: 'Hány fokosak a szabályos háromszög belső szögei?',
          options: ['Mindegyik pontosan 60°', 'Mindegyik 90°', '45°, 45° és 90°', 'Mindegyik 120°'],
          correctAnswer: 'Mindegyik pontosan 60°',
          explanation: 'Mivel a szabályos háromszög mindhárom oldala és szöge egyenlő, ezért 180° / 3 = 60° minden belső szöge.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_equilateral" />
        },
        {
          id: 'q1-23',
          question: 'Milyen alakzatot kapunk, ha egy kört elmetszünk egy egyenessel úgy, hogy két közös pontjuk van?',
          options: ['Szelőt (amely a körből húrt metsz ki)', 'Érintőt', 'Körszeletet', 'Átmérőt'],
          correctAnswer: 'Szelőt (amely a körből húrt metsz ki)',
          explanation: 'Azt az egyenest, amelynek két közös pontja van a körvonallal, szelőnek nevezzük; a két metszéspont közötti szakasz a húr.',
          figure: <GeometrySummaryMiniFigure type="circle_parts" />
        },
        {
          id: 'q1-24',
          question: 'Milyen transzformáció a tengelyes tükrözés a körüljárási irány szempontjából?',
          options: [
            'Orientációváltó (megfordítja a körüljárási irányt)',
            'Orientációtartó (azonos marad az irány)',
            'Irányfüggetlen',
            'Csak hegyesszögű háromszögnél tartja meg'
          ],
          correctAnswer: 'Orientációváltó (megfordítja a körüljárási irányt)',
          explanation: 'A síkban a tengelyes tükrözés megfordítja az alakzatok körüljárási irányát (például az óramutatóval ellentétes ABC körüljárásból óramutatóval egyező A\'B\'C\' lesz).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_polygon" />
        },
        {
          id: 'q1-25',
          question: 'Mit nevezünk körszeletnek?',
          options: [
            'A körvonal egy íve és az ahhoz tartozó húr által határolt síkrészt',
            'Két sugár és egy körív által határolt tortaszelet alakú részt',
            'A kör teljes területét',
            'A körvonal felét'
          ],
          correctAnswer: 'A körvonal egy íve és az ahhoz tartozó húr által határolt síkrészt',
          explanation: 'A húr a kör területét két körszeletre osztja. (A két sugár és körív által határolt síkrész a körcikk).',
          figure: <GeometrySummaryMiniFigure type="circle_parts" />
        },
        {
          id: 'q1-26',
          question: 'Hány szimmetriatengelye van egy általános (különböző oldalú) háromszögnek?',
          options: ['0', '1', '2', '3'],
          correctAnswer: '0',
          explanation: 'Az általános háromszögnek semelyik oldala és szöge nem egyenlő, így nincs szimmetriatengelye (0 tengely).',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q1-27',
          question: 'Hány szimmetriatengelye van egy szabályos hatszögnek?',
          options: ['6', '3', '12', '1'],
          correctAnswer: '6',
          explanation: 'Bármely szabályos n-oldalú sokszögnek pontosan n darab szimmetriatengelye van, így a szabályos hatszögnek 6.',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q1-28',
          question: 'Ha egy pont rajta fekszik a tükörtengelyen (P ∈ t), hol lesz a tükörképe (P\')?',
          options: ['Pontosan önmagában (P\' = P)', 'A tengely másik végén', 'A kör középpontjában', 'Végtelen távol'],
          correctAnswer: 'Pontosan önmagában (P\' = P)',
          explanation: 'A tükörtengely minden egyes pontja fixpont, azaz a képe önmagával esik egybe.',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q1-29',
          question: 'Melyik alapeset jelöli azt, amikor a háromszög 3 oldalának hossza adott?',
          options: ['ooo (vagy SSS)', 'oszo (SAS)', 'szosz (ASA)', 'd-á-befogó'],
          correctAnswer: 'ooo (vagy SSS)',
          explanation: 'Az "ooo" (oldal-oldal-oldal, angolul SSS: Side-Side-Side) alapesetnél a háromszög mindhárom oldalhossza ismert.',
          figure: <GeometrySummaryMiniFigure type="triangle_sss" />
        },
        {
          id: 'q1-30',
          question: 'Milyen szög jön létre, ha egy egyenes szöget (180°) szögfelezővel kettéosztunk?',
          options: ['Két derékszög (90°)', 'Két hegyesszög (45°)', 'Két tompaszög (120°)', 'Egy 60° és egy 120°'],
          correctAnswer: 'Két derékszög (90°)',
          explanation: 'Az egyenes szög 180°-os, felezve 180° / 2 = 90°-os derékszögeket kapunk.',
          figure: <GeometrySummaryMiniFigure type="angle_bisector" />
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: SZÁMOLÁSOK, ÖSSZEFÜGGÉSEK ÉS ALKALMAZÁSOK (30 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Számítások, szimmetrikus alakzatok és szerkesztések',
      subtitle: 'Szögszámítások, szimmetrikus négyszögek és háromszögek tulajdonságai, szerkesztési alapesetek',
      range: '31–60. feladat',
      focus: 'Szögszámolások, szimmetrikus sokszögek tulajdonságai, alapesetek (ooo, oszo, szosz), koordináta-tükrözések',
      questions: [
        {
          id: 'q2-1',
          question: 'Egy egyenlő szárú háromszög szárszöge (a csúcsnál lévő szög) 40°. Hány fokosak az alapon fekvő szögei?',
          options: ['70° és 70°', '40° és 100°', '80° és 60°', '50° és 50°'],
          correctAnswer: '70° és 70°',
          explanation: 'A belső szögek összege 180°. Az alapon fekvő szögek összege: 180° - 40° = 140°. Mivel egyenlőek: 140° / 2 = 70° mindkettő.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q2-2',
          question: 'Egy egyenlő szárú háromszög egyik alapon fekvő szöge 55°. Hány fokos a csúcsszöge?',
          options: ['70°', '55°', '80°', '110°'],
          correctAnswer: '70°',
          explanation: 'Mindkét alapszög 55°, összegük 55° + 55° = 110°. A csúcsszög: 180° - 110° = 70°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q2-3',
          question: 'Egy derékszögű egyenlő szárú háromszögnek mekkorák a hegyesszögei?',
          options: ['45° és 45°', '30° és 60°', '60° és 60°', '40° és 50°'],
          correctAnswer: '45° és 45°',
          explanation: 'A derékszög 90°, a maradék 180° - 90° = 90° két egyenlő hegyesszögre oszlik: 90° / 2 = 45°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q2-4',
          question: 'Egy húrtrapéz egyik alapjának szöge 65°. Hány fokosak a húrtrapéz további belső szögei?',
          options: ['65°, 115°, 115°', '65°, 65°, 130°', '115°, 115°, 115°', '75°, 105°, 115°'],
          correctAnswer: '65°, 115°, 115°',
          explanation: 'A húrtrapéz szimmetrikus, így az alsó alap két szöge egyenlő (65° és 65°). A száron fekvő szögek összege 180°, így a felső szögek 180° - 65° = 115° és 115°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" />
        },
        {
          id: 'q2-5',
          question: 'Egy rombusz egyik belső szöge 70°. Hány fokos a szomszédos és a szemközti szöge?',
          options: [
            'Szemközti: 70°, szomszédos: 110°',
            'Szemközti: 110°, szomszédos: 70°',
            'Mind a négy szöge 70°',
            'Szemközti: 70°, szomszédos: 90°'
          ],
          correctAnswer: 'Szemközti: 70°, szomszédos: 110°',
          explanation: 'A rombuszban a szemközti szögek egyenlők (70°), a szomszédos szögek összege pedig 180°, így 180° - 70° = 110°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q2-6',
          question: 'Egy deltoid szimmetriaátlója két szöget felez: a csúcsoknál 50° és 80° van. Mekkora a két másik (egyenlő) szöge?',
          options: ['115° és 115°', '100° és 100°', '130° és 130°', '90° és 90°'],
          correctAnswer: '115° és 115°',
          explanation: 'A négyszög belső szögeinek összege 360°. 360° - (50° + 80°) = 360° - 130° = 230°. Mivel a két nem szimmetriatengelyen lévő szög egyenlő: 230° / 2 = 115°.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />
        },
        {
          id: 'q2-7',
          question: 'Ha a P(3; 4) pontot tükrözzük az x-tengelyre, mik lesznek a P\' tükörkép koordinátái?',
          options: ['P\'(3; -4)', 'P\'(-3; 4)', 'P\'(-3; -4)', 'P\'(4; 3)'],
          correctAnswer: 'P\'(3; -4)',
          explanation: 'Az x-tengelyre való tükrözéskor az x-koordináta változatlan marad, míg az y-koordináta az ellentettjére változik: P(x; y) ⟶ P\'(x; -y), azaz (3; -4).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q2-8',
          question: 'Ha a Q(-5; 2) pontot tükrözzük az y-tengelyre, mik lesznek a Q\' tükörkép koordinátái?',
          options: ['Q\'(5; 2)', 'Q\'(-5; -2)', 'Q\'(5; -2)', 'Q\'(2; -5)'],
          correctAnswer: 'Q\'(5; 2)',
          explanation: 'Az y-tengelyre való tükrözéskor az y-koordináta nem változik, az x-koordináta ellentettjére vált: Q(-5; 2) ⟶ Q\'(5; 2).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q2-9',
          question: 'A kör középpontja O, sugara r = 6 cm. Milyen messze van az érintési ponttól a középpont?',
          options: ['Pontosan 6 cm', '12 cm', '3 cm', 'Nem határozható meg'],
          correctAnswer: 'Pontosan 6 cm',
          explanation: 'Az érintési pont a körvonal egyik pontja, így annak a középponttól mért távolsága pontosan a kör sugara (r = 6 cm).',
          figure: <GeometrySummaryMiniFigure type="tangent_perpendicular" />
        },
        {
          id: 'q2-10',
          question: 'Melyik állítás IGAZ a rombusz átlóira?',
          options: [
            'Merőlegesen felezik egymást és felezik a belső szögeket',
            'Mindig egyenlő hosszúak',
            'Párhuzamosak az oldalakkal',
            'Nem metszik egymást'
          ],
          correctAnswer: 'Merőlegesen felezik egymást és felezik a belső szögeket',
          explanation: 'A rombusz átlói merőlegesek egymásra, felezik egymást és felezik a szemközti belső szögeket.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q2-11',
          question: 'Melyik állítás IGAZ a téglalap átlóira?',
          options: [
            'Egyenlő hosszúak és felezik egymást',
            'Mindig merőlegesek egymásra',
            'Felezik a belső derékszögeket',
            'Csak az egyik felezi a másikat'
          ],
          correctAnswer: 'Egyenlő hosszúak és felezik egymást',
          explanation: 'A téglalap átlói mindig egyenlő hosszúak és felezik egymást (de általában nem merőlegesek egymásra, csak ha négyzet).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />
        },
        {
          id: 'q2-12',
          question: 'Hány független adat szükséges egy háromszög egyértelmű szerkesztéséhez?',
          options: ['3', '2', '4', '5'],
          correctAnswer: '3',
          explanation: 'A háromszög egybevágóság erejéig 3 független adattal határozható meg egyértelműen (pl. ooo, oszo, szosz).',
          figure: <GeometrySummaryMiniFigure type="triangle_sas" />
        },
        {
          id: 'q2-13',
          question: 'Hány független adat szükséges egy rombusz szerkesztéséhez?',
          options: ['2 (pl. oldal és egy szög, vagy a két átló)', '1', '3', '4'],
          correctAnswer: '2 (pl. oldal és egy szög, vagy a két átló)',
          explanation: 'Mivel a rombusz minden oldala egyenlő és átlói merőlegesek, 2 adat elegendő a megszerkesztéséhez (pl. a és α, vagy e és f átlók).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q2-14',
          question: 'Hány független adat szükséges egy négyzet megszerkesztéséhez?',
          options: ['1 (az oldalhossz vagy az átló hossza)', '2', '4', '3'],
          correctAnswer: '1 (az oldalhossz vagy az átló hossza)',
          explanation: 'A négyzet minden szöge 90° és minden oldala egyenlő, így 1etlen adat (pl. a = 5 cm) egyértelműen meghatározza.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />
        },
        {
          id: 'q2-15',
          question: 'Egy háromszög oldalai a = 6 cm és b = 8 cm. Lehet-e a harmadik oldal c = 14 cm?',
          options: [
            'Nem, mert 6 + 8 = 14 (egyenlő, nem nagyobb: elfajuló háromszög)',
            'Igen, mert 14 a legnagyobb szám',
            'Igen, tompaszögű háromszög lesz',
            'Igen, derékszögű háromszög lesz'
          ],
          correctAnswer: 'Nem, mert 6 + 8 = 14 (egyenlő, nem nagyobb: elfajuló háromszög)',
          explanation: 'A háromszög-egyenlőtlenség szerint a + b > c szigorúan szükséges. Ha 6 + 8 = 14, a csúcs pontosan a szakaszra esik, így valódi háromszög nem jön létre.',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />
        },
        {
          id: 'q2-16',
          question: 'Melyik szerkesztési alapeset alapján szerkeszthető meg a háromszög, ha adott c = 7 cm, a = 5 cm és β = 50°?',
          options: ['oszo (SAS: két oldal és a közbezárt szög)', 'ooo (SSS)', 'szosz (ASA)', 'd-á-befogó'],
          correctAnswer: 'oszo (SAS: két oldal és a közbezárt szög)',
          explanation: 'Az "a" és "c" oldalak által bezárt belső szög pontosan a β (B csúcsnál lévő szög), így ez a két oldal és a közbezárt szög (oszo) esete.',
          figure: <GeometrySummaryMiniFigure type="triangle_sas" />
        },
        {
          id: 'q2-17',
          question: 'Melyik szerkesztési alapeset, ha adott c = 6 cm, α = 40° és β = 70°?',
          options: ['szosz (ASA: egy oldal és a rajta fekvő két szög)', 'oszo (SAS)', 'ooo (SSS)', 'szszsz'],
          correctAnswer: 'szosz (ASA: egy oldal és a rajta fekvő két szög)',
          explanation: 'A c oldalon fekszik az A csúcsnál az α és a B csúcsnál a β szög, így ez a szög-oldal-szög (szosz) alapeset.',
          figure: <GeometrySummaryMiniFigure type="triangle_asa" />
        },
        {
          id: 'q2-18',
          question: 'Egy derékszögű háromszög befogói 3 cm és 4 cm. Milyen adatok alapján szerkeszthető meg?',
          options: [
            'oszo: két oldal (3 cm, 4 cm) és a közbezárt 90°-os szög',
            'ooo alapeset',
            'szosz alapeset',
            'Csak szögmérővel szerkeszthető'
          ],
          correctAnswer: 'oszo: két oldal (3 cm, 4 cm) és a közbezárt 90°-os szög',
          explanation: 'A két befogó derékszöget (90°) zár be egymással, így két ismert oldal és a köztük lévő ismert szög (oszo) alapján szerkeszthető.',
          figure: <GeometrySummaryMiniFigure type="triangle_sas" />
        },
        {
          id: 'q2-19',
          question: 'Hol metszi egymást egy háromszög három oldalfelező merőlegese?',
          options: [
            'A háromszög köré írható körének középpontjában',
            'A háromszögbe írható kör középpontjában',
            'A háromszög súlypontjában',
            'A leghosszabb oldal felezőpontján kívül mindig'
          ],
          correctAnswer: 'A háromszög köré írható körének középpontjában',
          explanation: 'Mivel az oldalfelező merőleges pontjai egyenlő távol vannak a csúcsoktól, közös metszéspontjuk mindhárom csúcstól azonos távolságra van: ez a köré írt kör középpontja (K).',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q2-20',
          question: 'Hol metszi egymást egy háromszög három belső szögfelezője?',
          options: [
            'A háromszögbe írható kör középpontjában',
            'A köré írható kör középpontjában',
            'A háromszög legrövidebb oldalán',
            'A magasságpontban'
          ],
          correctAnswer: 'A háromszögbe írható kör középpontjában',
          explanation: 'A belső szögfelezők metszéspontja mindhárom oldaltól egyenlő merőleges távolságra van, ez a beírt kör középpontja (O).',
          figure: <GeometrySummaryMiniFigure type="angle_bisector" />
        },
        {
          id: 'q2-21',
          question: 'Egy szabályos nyolcszögnek hány szimmetriatengelye van?',
          options: ['8', '4', '16', '2'],
          correctAnswer: '8',
          explanation: 'A szabályos n-szögeknek n szimmetriatengelyük van. A szabályos nyolcszögnek 4 csúcsokat összekötő és 4 oldalfelezőket összekötő tengelye van (összesen 8).',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q2-22',
          question: 'Mekkora a szabályos hatszög egy belső szöge?',
          options: ['120°', '108°', '90°', '135°'],
          correctAnswer: '120°',
          explanation: 'A hatszög belső szögeinek összege (6 - 2) · 180° = 720°. Szabályos lévén 720° / 6 = 120° egy belső szöge.',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q2-23',
          question: 'Egy deltoid átlói 6 cm és 10 cm hosszúak. Mennyi a deltoid területe?',
          options: ['30 cm²', '60 cm²', '16 cm²', '45 cm²'],
          correctAnswer: '30 cm²',
          explanation: 'Mivel a deltoid átlói merőlegesek egymásra, területe: T = (e · f) / 2 = (6 · 10) / 2 = 60 / 2 = 30 cm².',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />
        },
        {
          id: 'q2-24',
          question: 'Egy rombusz átlói 8 cm és 12 cm. Mennyi a területe?',
          options: ['48 cm²', '96 cm²', '20 cm²', '24 cm²'],
          correctAnswer: '48 cm²',
          explanation: 'A rombusz átlói merőlegesek egymásra, így területe T = (e · f) / 2 = (8 · 12) / 2 = 96 / 2 = 48 cm².',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q2-25',
          question: 'Egy kör átmérője d = 10 cm. Mekkora a sugara?',
          options: ['5 cm', '20 cm', '10 cm', '2.5 cm'],
          correctAnswer: '5 cm',
          explanation: 'A sugár az átmérő fele: r = d / 2 = 10 / 2 = 5 cm.',
          figure: <GeometrySummaryMiniFigure type="circle_parts" />
        },
        {
          id: 'q2-26',
          question: 'Ha egy egyenes merőleges a tükörtengelyre (e ⊥ t), mi lesz a tükörképe (e\')?',
          options: [
            'Önmaga (e\' = e, azaz az egyenes invariáns ponthalmaz)',
            'Egy a tengellyel párhuzamos egyenes',
            'Egy 45°-os egyenes',
            'Egy ponttá zsugorodik'
          ],
          correctAnswer: 'Önmaga (e\' = e, azaz az egyenes invariáns ponthalmaz)',
          explanation: 'A tengelyre merőleges egyenes pontjai a túloldalra tükröződve ugyanerre az egyenesre esnek, így maga az egyenes mint vonal önmagába megy át.',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q2-27',
          question: 'Egy háromszög két oldala a = 7 cm, b = 11 cm. Melyik intervallumba kell esnie a c harmadik oldalnak?',
          options: [
            '4 cm < c < 18 cm',
            '7 cm < c < 11 cm',
            '0 cm < c < 4 cm',
            'c > 18 cm'
          ],
          correctAnswer: '4 cm < c < 18 cm',
          explanation: 'A háromszög-egyenlőtlenség szerint c < a + b = 18 cm és c > b - a = 11 - 7 = 4 cm.',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />
        },
        {
          id: 'q2-28',
          question: 'Ha az ABC háromszög területe 24 cm², mekkora lesz a tengelyesen tükrözött A\'B\'C\' háromszög területe?',
          options: ['Pontosan 24 cm²', '48 cm²', '12 cm²', '-24 cm²'],
          correctAnswer: 'Pontosan 24 cm²',
          explanation: 'A tengelyes tükrözés egybevágósági transzformáció, így megőrzi a síkidomok területét és kerületét (T\' = T = 24 cm²).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_polygon" />
        },
        {
          id: 'q2-29',
          question: 'Hány fokos szöget zár be a négyzet két átlója egymással?',
          options: ['90°', '45°', '60°', '180°'],
          correctAnswer: '90°',
          explanation: 'A négyzet átlói merőlegesen felezik egymást, így 90°-os szöget zárnak be.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />
        },
        {
          id: 'q2-30',
          question: 'Miért NEM szimmetriatengelye a téglalapnak az átlója?',
          options: [
            'Mert az átlóra tükrözve a szomszédos nem egyenlő oldalak nem fedik le egymást',
            'Mert a téglalapnak nincsenek átlói',
            'Mert az átlók túl hosszúak',
            'Mert a téglalap minden szöge 90°'
          ],
          correctAnswer: 'Mert az átlóra tükrözve a szomszédos nem egyenlő oldalak nem fedik le egymást',
          explanation: 'Ha a téglalapot az átlójára tükrözzük, a rövidebb oldal a hosszabb oldal helyére kerülne, ami nem fedi le az eredeti téglalapot (csak négyzetnél működik).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: ÖSSZETETT FELADATOK, DISZKUSSZIÓ ÉS TÉMAZÁRÓ KIHÍVÁSOK (30 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Logikai összefüggések, diszkusszió és mesterfeladatok',
      subtitle: 'Diszkusszió, mértani helyek kombinációi, összetett szög- és szimmetriabizonyítások',
      range: '61–90. feladat',
      focus: 'Több lépéses szerkesztések, megoldások száma (diszkusszió), intervallumok, invariáns tulajdonságok',
      questions: [
        {
          id: 'q3-1',
          question: 'Egy háromszög két oldala a = 5 cm, b = 9 cm. Hány különböző egész centiméter hosszúságú lehet a harmadik oldal (c)?',
          options: ['7 különböző egész érték (5, 6, 7, 8, 9, 10, 11, 12, 13)', '9', '5', 'Végtelen sok egész'],
          correctAnswer: '7 különböző egész érték (5, 6, 7, 8, 9, 10, 11, 12, 13)',
          explanation: 'A háromszög-egyenlőtlenség szerint 9 - 5 < c < 9 + 5, azaz 4 < c < 14. A lehetséges egész számok: 5, 6, 7, 8, 9, 10, 11, 12, 13 (összesen 9 darab egész érték: 13 - 5 + 1 = 9 érték).',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />
        },
        {
          id: 'q3-2',
          question: 'Két metsző egyenes, e és f által bezárt hegyesszög 40°. Egy pontot először e-re, majd a kapott pontot f-re tükrözünk. Milyen transzformációt kapunk és hány fokos az elfordulás?',
          options: [
            'Forgatást a metszéspont körül 80°-kal (a tengelyek szögének kétszeresével)',
            'Eltolást 40 cm-rel',
            'Tengelyes tükrözést 40°-kal',
            'Helyben maradást (0°)'
          ],
          correctAnswer: 'Forgatást a metszéspont körül 80°-kal (a tengelyek szögének kétszeresével)',
          explanation: 'Két egymást α szögben metsző egyenesre való egymás utáni tükrözés egyenértékű a metszéspont körüli 2α szögű elforgatással (2 · 40° = 80°).',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_polygon" />
        },
        {
          id: 'q3-3',
          question: 'Két párhuzamos egyenes távolsága d = 3 cm. Egy alakzatot egymás után mindkét egyenesre tükrözünk. Milyen transzformáció az eredmény?',
          options: [
            'Eltolás a tengelyekre merőlegesen 6 cm távolsággal (2 · d)',
            'Forgatás 180°-kal',
            'Tengelyes tükrözés 3 cm-rel',
            'Helyben maradás'
          ],
          correctAnswer: 'Eltolás a tengelyekre merőlegesen 6 cm távolsággal (2 · d)',
          explanation: 'Két d távolságra lévő párhuzamos tengelyre való egymás utáni tükrözés egyenértékű egy a tengelyekre merőleges, 2d hosszúságú (2 · 3 = 6 cm) eltolással.',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_polygon" />
        },
        {
          id: 'q3-4',
          question: 'Mikor van egy háromszög szerkesztésének pontosan 2 megoldása (diszkusszió)?',
          options: [
            'Ha adott két oldal és a kisebbik oldallal szemközti szög (pl. a, b, α és a < b)',
            'Ha adott mind a 3 oldal és a + b > c',
            'Ha adott két oldal és a közbezárt szög',
            'Ha szabályos háromszöget szerkesztünk'
          ],
          correctAnswer: 'Ha adott két oldal és a kisebbik oldallal szemközti szög (pl. a, b, α és a < b)',
          explanation: 'Ha a megadott szög a rövidebb oldallal szemben fekszik, a körív két pontban metszi a szögszárat (egy hegyesszögű és egy tompaszögű háromszöget eredményezve).',
          figure: <GeometrySummaryMiniFigure type="two_solutions" />
        },
        {
          id: 'q3-5',
          question: 'Melyik négyszög rendelkezik egyszerre az alábbi tulajdonságokkal: átlói egyenlők, merőlegesek és felezik egymást?',
          options: ['Kizárólag a négyzet', 'Bármely rombusz', 'Bármely téglalap', 'Bármely deltoid'],
          correctAnswer: 'Kizárólag a négyzet',
          explanation: 'Az átlók egyenlősége a téglalap, a merőlegesség a rombusz tulajdonsága; a kettő egyszerre kizárólag a négyzetben teljesül.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />
        },
        {
          id: 'q3-6',
          question: 'Egy húrtrapéz alapjai a = 12 cm, c = 6 cm, szárai b = d = 5 cm. Mekkora a trapéz magassága?',
          options: ['4 cm (Pitagorasz-tétellel: 5² - 3² = 4²)', '5 cm', '3 cm', '6 cm'],
          correctAnswer: '4 cm (Pitagorasz-tétellel: 5² - 3² = 4²)',
          explanation: 'A szimmetria miatt a magasság levág egy derékszögű háromszöget, melynek alsó befogója (a - c) / 2 = (12 - 6) / 2 = 3 cm. Átfogója 5 cm, így magassága m = √(5² - 3²) = √(25 - 9) = 4 cm.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" />
        },
        {
          id: 'q3-7',
          question: 'Hol található egy tompaszögű háromszög köré írható körének középpontja?',
          options: [
            'A háromszögön kívül, a leghosszabb oldal oldalán',
            'A háromszög belsejében',
            'A leghosszabb oldal felezőpontján',
            'A tompaszög csúcsában'
          ],
          correctAnswer: 'A háromszögön kívül, a leghosszabb oldal oldalán',
          explanation: 'Hegyesszögű háromszögnél a köré írt kör középpontja belül van, derékszögűnél az átfogó felezőpontja (Thalész-tétel), tompaszögűnél pedig a háromszögön KÍVÜL helyezkedik el.',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q3-8',
          question: 'Hol található egy derékszögű háromszög köré írható körének középpontja?',
          options: [
            'Az átfogó felezőpontjában (Thalész-tétel)',
            'A derékszögű csúcsban',
            'A háromszög belsejében a súlypontban',
            'A háromszögön kívül'
          ],
          correctAnswer: 'Az átfogó felezőpontjában (Thalész-tétel)',
          explanation: 'A Thalész-tétel miatt a derékszögű háromszög köré írt körének középpontja pontosan az átfogó felezőpontja, sugara pedig az átfogó fele (r = c/2).',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q3-9',
          question: 'Egy háromszög szögfelezője és az oldalfelező merőlegese pontosan mikor esik egybe?',
          options: [
            'Egyenlő szárú háromszög alaphoz tartozó vonalánál (és szabályos háromszög mindhárom vonalánál)',
            'Bármely általános háromszögnél',
            'Soha semmilyen háromszögben',
            'Csak derékszögű háromszög befogójánál'
          ],
          correctAnswer: 'Egyenlő szárú háromszög alaphoz tartozó vonalánál (és szabályos háromszög mindhárom vonalánál)',
          explanation: 'A szimmetriatengely mentén az alap felezőmerőlegese, a csúcsszög szögfelezője, a magasságvonal és a súlyvonal mind egybeesik.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q3-10',
          question: 'Egy konvex n-oldalú sokszög belső szögeinek összege 1080°. Hány oldala van a sokszögnek?',
          options: ['8 (nyolcszög)', '6', '10', '7'],
          correctAnswer: '8 (nyolcszög)',
          explanation: 'A belső szögek összege: (n - 2) · 180° = 1080° ⟶ n - 2 = 1080 / 180 = 6 ⟶ n = 8.',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q3-11',
          question: 'Egy szabályos sokszög egy belső szöge 140°. Hány oldala van?',
          options: ['9 (kilencszög)', '8', '10', '12'],
          correctAnswer: '9 (kilencszög)',
          explanation: 'Egy külső szög nagysága: 180° - 140° = 40°. Mivel a külső szögek összege mindig 360°, az oldalak száma: n = 360° / 40° = 9.',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q3-12',
          question: 'Melyik állítás HAMIS a deltoiddal kapcsolatban?',
          options: [
            'Mindkét átlója felezi egymást',
            'Átlói merőlegesek egymásra',
            'A szimmetriaátlója felezi a szemközti belső szögeket',
            'Van beírt köre (érintőnégyszög)'
          ],
          correctAnswer: 'Mindkét átlója felezi egymást',
          explanation: 'A deltoidnak CSAK a szimmetriaátlója felezi a másik átlót. Ha mindkét átló felezné egymást, akkor paralelogramma (rombusz) lenne!',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />
        },
        {
          id: 'q3-13',
          question: 'Milyen alakzat jön létre, ha egy téglalap oldalfelező pontjait sorban összekötjük?',
          options: ['Rombusz', 'Négyzet', 'Téglalap', 'Általános deltoid'],
          correctAnswer: 'Rombusz',
          explanation: 'A téglalap átlói egyenlők, ezért a középvonalak által alkotott négyszög minden oldala egyenlő hosszúságú (az átló fele), azaz rombusz.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q3-14',
          question: 'Milyen alakzat jön létre, ha egy rombusz oldalfelező pontjait sorban összekötjük?',
          options: ['Téglalap', 'Rombusz', 'Négyzet', 'Húrtrapéz'],
          correctAnswer: 'Téglalap',
          explanation: 'A rombusz átlói merőlegesek egymásra, így az oldalfelezőket összekötő szakaszok derékszöget zárnak be egymással, azaz téglalapot alkotnak.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />
        },
        {
          id: 'q3-15',
          question: 'Adott egy egyenes és egy rajta kívüli P pont. Hogyan szerkesztünk P-ből merőlegest az egyenesre?',
          options: [
            'P pontból olyan körívet húzunk, amely két pontban (A, B) metszi az egyenest, majd megszerkesztjük az AB szakasz felezőmerőlegesét',
            'Vonalzóval ránézésre összekötjük',
            'P pontba 90°-os szöget másolunk',
            'Az egyenes végpontjából körívezünk'
          ],
          correctAnswer: 'P pontból olyan körívet húzunk, amely két pontban (A, B) metszi az egyenest, majd megszerkesztjük az AB szakasz felezőmerőlegesét',
          explanation: 'A P-ből húzott körív kijelöl két egyenlő távolságú A és B pontot az egyenesen (PA = PB), így P rajta van az AB felezőmerőlegesén, ami éppen a keresett merőleges.',
          figure: <GeometrySummaryMiniFigure type="basic_constructions" />
        },
        {
          id: 'q3-16',
          question: 'Egy P pont távolsága a t egyenestől 4 cm. Milyen messze van a P pont P\' tükörképétől?',
          options: ['8 cm', '4 cm', '2 cm', '16 cm'],
          correctAnswer: '8 cm',
          explanation: 'A tükrözés definíciója szerint d(P, t) = d(P\', t) = 4 cm, és a PP\' szakasz merőleges t-re és t felezi azt, így |PP\'| = 4 + 4 = 8 cm.',
          figure: <GeometrySummaryMiniFigure type="axial_reflection_point" />
        },
        {
          id: 'q3-17',
          question: 'Ha egy alakzatnak van két egymásra merőleges szimmetriatengelye, akkor szükségszerűen van...',
          options: [
            'Középpontos szimmetriája is (a két tengely metszéspontjára nézve)',
            'Pontosan 4 szimmetriatengelye',
            'Beírt köre',
            'Minden oldala egyenlő'
          ],
          correctAnswer: 'Középpontos szimmetriája is (a két tengely metszéspontjára nézve)',
          explanation: 'Két egymásra merőleges tengelyre való egymás utáni tükrözés egyenértékű a metszéspontra vonatkozó középpontos tükrözéssel (180°-os forgatás).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />
        },
        {
          id: 'q3-18',
          question: 'Egy körhöz egy külső P pontból két érintőt húzunk az E₁ és E₂ érintési pontokba. Melyik állítás IGAZ?',
          options: [
            'A két érintőszakasz hossza egyenlő: |PE₁| = |PE₂|',
            'Az érintők mindig 90°-os szöget zárnak be egymással',
            'A PO szakasz nem felezi az E₁PE₂ szöget',
            'A két érintési pont távolsága mindig az átmérő'
          ],
          correctAnswer: 'A két érintőszakasz hossza egyenlő: |PE₁| = |PE₂|',
          explanation: 'A külső pontból a körhöz húzott két érintőszakasz hossza mindig megegyezik (|PE₁| = |PE₂|), a PO egyenes pedig a szimmetriatengelyük.',
          figure: <GeometrySummaryMiniFigure type="tangent_perpendicular" />
        },
        {
          id: 'q3-19',
          question: 'Melyik állítás igaz a húrnégyszögekre (olyan négyszögek, amelyek köré kör írható)?',
          options: [
            'Szemközti szögeik összege 180° (pl. húrtrapéz)',
            'Szemközti oldalaik összege egyenlő',
            'Minden szögük 90°',
            'Átlóik mindig merőlegesek'
          ],
          correctAnswer: 'Szemközti szögeik összege 180° (pl. húrtrapéz)',
          explanation: 'A húrnégyszögek alaptétele szerint a négyszög köré pontosan akkor írható kör, ha szemközti szögeinek összege 180° (α + γ = β + δ = 180°).',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" />
        },
        {
          id: 'q3-20',
          question: 'Melyik állítás igaz az érintőnégyszögekre (olyan négyszögek, amelyekbe kör írható)?',
          options: [
            'Szemközti oldalaik összege egyenlő (a + c = b + d, pl. deltoid, rombusz)',
            'Szemközti szögeik összege 180°',
            'Átlóik egyenlő hosszúak',
            'Minden oldaluk szükségképpen egyenlő'
          ],
          correctAnswer: 'Szemközti oldalaik összege egyenlő (a + c = b + d, pl. deltoid, rombusz)',
          explanation: 'Az érintőnégyszögek alaptétele (Pithot-tétel): a szemközti oldalak összege megegyezik: a + c = b + d.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />
        },
        {
          id: 'q3-21',
          question: 'Egy háromszög szögeinek aránya 2 : 3 : 4. Mekkora a háromszög legkisebb és legnagyobb szöge?',
          options: ['40° és 80°', '20° és 40°', '30° és 60°', '50° és 70°'],
          correctAnswer: '40° és 80°',
          explanation: 'Az arányrészek összege: 2 + 3 + 4 = 9 rész. 1 rész értéke: 180° / 9 = 20°. A szögek: 2 · 20° = 40°, 3 · 20° = 60°, 4 · 20° = 80°.',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q3-22',
          question: 'Egy rombusz magassága 6 cm, oldala 10 cm. Mekkora a területe?',
          options: ['60 cm²', '30 cm²', '120 cm²', '16 cm²'],
          correctAnswer: '60 cm²',
          explanation: 'A rombusz paralelogramma is, így területe az oldal és a hozzá tartozó magasság szorzata: T = a · m = 10 · 6 = 60 cm².',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />
        },
        {
          id: 'q3-23',
          question: 'Adott egy A és B pont (AB = 6 cm). Hány olyan pont van a síkban, amely A-tól 4 cm-re, B-től 5 cm-re van?',
          options: [
            'Pontosan 2 pont (a k₁(A; 4 cm) és k₂(B; 5 cm) körök metszéspontjai)',
            '1 pont',
            '0 pont',
            'Végtelen sok pont'
          ],
          correctAnswer: 'Pontosan 2 pont (a k₁(A; 4 cm) és k₂(B; 5 cm) körök metszéspontjai)',
          explanation: 'Mivel 4 + 5 = 9 > 6 és 5 - 4 = 1 < 6, a két kör metsző helyzetű, így pontosan 2 metszéspontjuk (2 megoldás) van az AB egyenes két oldalán.',
          figure: <GeometrySummaryMiniFigure type="two_solutions" />
        },
        {
          id: 'q3-24',
          question: 'Hány olyan pont van a síkban, amely az AB = 8 cm szakasztól egyenlő távolságra van, és A-tól pontosan 5 cm-re van?',
          options: [
            '2 pont (a felezőmerőleges és az A középpontú 5 cm-es kör metszéspontjai)',
            '1 pont',
            '0 pont',
            '4 pont'
          ],
          correctAnswer: '2 pont (a felezőmerőleges és az A középpontú 5 cm-es kör metszéspontjai)',
          explanation: 'Az A-tól és B-től egyenlő távoli pontok az f felezőmerőlegesen vannak. A felezőpont távolsága A-tól 4 cm. Mivel a sugár r = 5 cm > 4 cm, a kör két pontban metszi az f egyenest.',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q3-25',
          question: 'Melyik állítás IGAZ minden konvex sokszögre?',
          options: [
            'A külső szögeinek összege mindig pontosan 360°',
            'A belső szögeinek összege mindig 360°',
            'Minden sokszög tengelyesen szimmetrikus',
            'Minden sokszögnek van beírt köre'
          ],
          correctAnswer: 'A külső szögeinek összege mindig pontosan 360°',
          explanation: 'Oldalszámtól teljesen függetlenül bármely konvex sokszög külső szögeinek összege pontosan egy teljes szög, azaz 360°.',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" />
        },
        {
          id: 'q3-26',
          question: 'Egy derékszögű háromszög átfogója c = 10 cm. Mekkora a köré írt kör sugara?',
          options: ['5 cm (az átfogó fele)', '10 cm', '2.5 cm', 'Nem kiszámítható a befogók nélkül'],
          correctAnswer: '5 cm (az átfogó fele)',
          explanation: 'A Thalész-tétel értelmében a derékszögű háromszög átfogója a köré írt kör átmérője, így sugara r = c / 2 = 10 / 2 = 5 cm.',
          figure: <GeometrySummaryMiniFigure type="circle_parts" />
        },
        {
          id: 'q3-27',
          question: 'Melyik állítás HIBÁS a szimmetriatengelyekkel kapcsolatban?',
          options: [
            'Egy alakzatnak lehet pontosan 5 szimmetriatengelye (pl. szabályos ötszög)',
            'A körnek végtelen sok szimmetriatengelye van',
            'A paralelogrammának (ha nem téglalap vagy rombusz) 2 szimmetriatengelye van',
            'A négyzetnek 4 szimmetriatengelye van'
          ],
          correctAnswer: 'A paralelogrammának (ha nem téglalap vagy rombusz) 2 szimmetriatengelye van',
          explanation: 'Az általános paralelogramma CSAK középpontosan szimmetrikus, tengelyes szimmetriatengelye EGYÁLTALÁN NINCS (0 tengely)!',
          figure: <GeometrySummaryMiniFigure type="planar_elements" />
        },
        {
          id: 'q3-28',
          question: 'Mi a feltétele annak, hogy egy háromszögnek létezzen olyan belső pontja, amely mindhárom csúcstól azonos távolságra van?',
          options: [
            'Minden háromszögnek van ilyen pontja (a köré írt kör középpontja, hegyesszögűnél belül van)',
            'Csak a szabályos háromszögnek van ilyen pontja',
            'Csak a derékszögű háromszögnek',
            'Csak ha a háromszög területe páros szám'
          ],
          correctAnswer: 'Minden háromszögnek van ilyen pontja (a köré írt kör középpontja, hegyesszögűnél belül van)',
          explanation: 'A három oldalfelező merőleges minden háromszögben egyetlen közös K pontban metszi egymást, amely mindhárom csúcstól R távolságra van (hegyesszögűnél a belső térben).',
          figure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />
        },
        {
          id: 'q3-29',
          question: 'Egy egyenlő szárú háromszög alapja a = 8 cm, szára b = 5 cm. Mekkora az alaphoz tartozó magasság?',
          options: ['3 cm (Pitagorasz: √(5² - 4²) = 3 cm)', '4 cm', '5 cm', '2 cm'],
          correctAnswer: '3 cm (Pitagorasz: √(5² - 4²) = 3 cm)',
          explanation: 'A magasság felezi az alapot (8 / 2 = 4 cm). A derékszögű háromszögben a befogó m = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />
        },
        {
          id: 'q3-30',
          question: 'Egy geometriai tételt akkor tekintünk teljesnek, ha...',
          options: [
            'Nemcsak megszerkesztjük, hanem logikailag bizonyítjuk és diszkutáljuk a megoldások számát is',
            'Csak lemérjük a rajzot vonalzóval',
            'Kiszámoljuk számológéppel',
            'Színes filctollal kihúzzuk a határoló vonalakat'
          ],
          correctAnswer: 'Nemcsak megszerkesztjük, hanem logikailag bizonyítjuk és diszkutáljuk a megoldások számát is',
          explanation: 'A geometriában a szerkesztési feladat a 4 fázis (vázlat, terv, szerkesztés, bizonyítás és diszkusszió) hiánytalan elvégzésével válik teljessé.',
          figure: <GeometrySummaryMiniFigure type="summary_trophy" />
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Geometria és Szimmetria Összefoglaló Kvíz"
      subtitle="III. Fejezet átfogó szintfelmérője 90 feladattal (30 - 30 - 30 kérdés 3 szinten)"
      badge="🏆 6. Osztály • III. Geometria • 11. Fejezet"
      topicId="g6-geometry-summary-quiz"
      themeColor="amber"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <GeometrySummaryMatcher {...props} />}
      renderSorter={(props) => <GeometrySummarySorter {...props} />}
      matcherComponent={
        <GeometrySummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <GeometrySummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
