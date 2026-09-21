import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { CongruenceMatcher } from './CongruenceMatcher';
import { CongruenceSorter } from './CongruenceSorter';
import {
  CongruentTrianglesDiagram,
  CongruenceCasesDiagram,
  IsometryTransformationsDiagram,
  CongruentTrianglesFigure,
  TriangleCongruenceCaseFigure,
  MotionTransformationFigure,
  CongruenceSolverFigure
} from './CongruenceDiagrams';
import { Compass, Shapes, Target, Calculator, Sparkles, MoveHorizontal } from 'lucide-react';

export interface CongruenceQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function CongruenceQuiz({ onBack, onSwitchToTheory }: CongruenceQuizProps) {
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (1 - 10. feladat)
    // ==========================================
    {
      id: 'cq1',
      level: 1,
      prompt: 'Mikor mondjuk két síkbeli alakzatról, hogy egybevágóak?',
      questionTypeBadge: 'Alapfogalom',
      figure: <CongruentTrianglesFigure type="congruent" label1="F₁" label2="F₂" showMeasurements={false} />,
      options: [
        'Ha alakjuk és méretük is pontosan megegyezik (fedésbe hozhatók).',
        'Ha csak az alakjuk egyezik meg, de a méretük nem.',
        'Ha csak a területük egyenlő.',
        'Ha csak a csúcsaik száma azonos.'
      ],
      correctAnswer: 'Ha alakjuk és méretük is pontosan megegyezik (fedésbe hozhatók).',
      explanation:
        'Két síkidom akkor egybevágó (F₁ ≅ F₂), ha mozgatással (eltolással, elforgatással, illetve tükrözéssel) egymással pontosan fedésbe hozhatók, vagyis alakjuk és méretük is azonos.',
      breakdown: [
        { label: 'Feltétel 1', value: 'Alak azonossága' },
        { label: 'Feltétel 2', value: 'Méret azonossága' },
        { label: 'Következmény', value: 'Pontos fedésbe hozhatóság' }
      ],
      hint: 'Gondolj arra, ha két azonos papírformát egymásra fektetsz: pontosan takarják egymást!'
    },
    {
      id: 'cq2',
      level: 1,
      prompt: 'Melyik matematikai szimbólum jelöli a geometriában az egybevágóságot?',
      questionTypeBadge: 'Jelölések',
      options: ['≅ (egyenlőségjel hullámvonallal)', '~ (hullámvonal)', '= (egyenlőségjel)', '≡ (hármas vonal)'],
      correctAnswer: '≅ (egyenlőségjel hullámvonallal)',
      explanation:
        'Az egybevágóság jele a ≅ szimbólum (pl. △ABC ≅ △A\'B\'C\'). A sima ~ jel a hasonlóságot jelöli.',
      hint: 'Egyenlőségjel, aminek a tetején egy kis hullámvonal van: ≅'
    },
    {
      id: 'cq3',
      level: 1,
      prompt: 'Mit állíthatunk két egybevágó háromszög megfelelő oldalairól és szögeiről?',
      questionTypeBadge: 'Tulajdonságok',
      figure: <CongruentTrianglesFigure type="congruent" />,
      options: [
        'Minden megfelelő oldaluk hossza és minden megfelelő szögük nagysága egyenlő.',
        'Csak az oldalaik hossza egyenlő, a szögek eltérhetnek.',
        'Csak a szögeik nagysága egyenlő, az oldalak eltérhetnek.',
        'Csak a legnagyobb oldaluk hossza egyenlő.'
      ],
      correctAnswer: 'Minden megfelelő oldaluk hossza és minden megfelelő szögük nagysága egyenlő.',
      explanation:
        'Egybevágó alakzatoknál minden megfelelő geometriai méret azonos: a = a\', b = b\', c = c\', és α = α\', β = β\', γ = γ\'.',
      hint: 'Mivel fedésbe hozhatók, minden oldaluk és szögük pontosan megegyezik.'
    },
    {
      id: 'cq4',
      level: 1,
      prompt: 'Ha az ABC háromszög kerülete K = 24 cm, mekkora a vele egybevágó A\'B\'C\' háromszög kerülete (K\')?',
      questionTypeBadge: 'Kerület számítás',
      figure: <CongruenceSolverFigure knownSide="K = 24 cm" findTarget="perimeter" />,
      options: ['24 cm', '12 cm', '48 cm', '36 cm'],
      correctAnswer: '24 cm',
      explanation:
        'Mivel a két háromszög egybevágó, a megfelelő oldalaik hossza páronként egyenlő, így az oldalak összege (a kerület) is pontosan megegyezik: K\' = K = 24 cm.',
      breakdown: [
        { label: 'Összefüggés', value: 'K\' = K' },
        { label: 'Eredmény', value: 'K\' = 24 cm' }
      ],
      hint: 'Egybevágó alakzatok kerülete mindig azonos.'
    },
    {
      id: 'cq5',
      level: 1,
      prompt: 'Ha egy síkidom területe T = 35 cm², mennyi a vele egybevágó síkidom területe (T\')?',
      questionTypeBadge: 'Terület azonosság',
      figure: <CongruenceSolverFigure knownSide="T = 35 cm²" findTarget="area" />,
      options: ['35 cm²', '70 cm²', '17.5 cm²', '140 cm²'],
      correctAnswer: '35 cm²',
      explanation:
        'Egybevágó alakzatok területe mindig pontosan egyenlő: T\' = T = 35 cm².',
      hint: 'Mivel méretük és alakjuk azonos, ugyanakkora helyet foglalnak el a síkban.'
    },
    {
      id: 'cq6',
      level: 1,
      prompt: 'Mikor mondhatjuk két négyzetről biztosan, hogy egybevágóak?',
      questionTypeBadge: 'Négyzetek egybevágósága',
      options: [
        'Ha az oldaluk hossza megegyezik (a = a\').',
        'Minden négyzet mindig egybevágó.',
        'Ha a szögeik derékszögek.',
        'Ha az átlóik merőlegesek.'
      ],
      correctAnswer: 'Ha az oldaluk hossza megegyezik (a = a\').',
      explanation:
        'Mivel minden négyzetnek derékszögei vannak és 4 egyenlő oldala, ha egyetlen oldaluk hossza megegyezik (a = a\'), akkor a két négyzet teljesen egybevágó.',
      hint: 'A négyzet alakja kötött (mindig négyzet), így csak az oldalának hossza határozza meg a méretét.'
    },
    {
      id: 'cq7',
      level: 1,
      prompt: 'Mikor egybevágó két tetszőleges kör a síkban?',
      questionTypeBadge: 'Körök egybevágósága',
      options: [
        'Ha a sugaruk (vagy átmérőjük) egyenlő hosszúságú (r = r\').',
        'Minden kör egybevágó egymással.',
        'Ha a középpontjuk azonos helyen van.',
        'Ha érintik egymást.'
      ],
      correctAnswer: 'Ha a sugaruk (vagy átmérőjük) egyenlő hosszúságú (r = r\').',
      explanation:
        'A kör méretét egyértelműen a sugara (r) határozza meg. Két kör pontosan akkor egybevágó, ha sugaruk egyenlő (r = r\').',
      hint: 'Körzővel rajzolva: ha ugyanakkorára nyitod a körzőt, azonos méretű kört kapsz.'
    },
    {
      id: 'cq8',
      level: 1,
      prompt: 'Ha tudjuk, hogy △ABC ≅ △DEF, akkor az AB oldalnak melyik oldal felel meg a másik háromszögben?',
      questionTypeBadge: 'Jelölési konvenció',
      options: ['DE oldal', 'EF oldal', 'DF oldal', 'Bármelyik oldal'],
      correctAnswer: 'DE oldal',
      explanation:
        'A betűk sorrendje jelzi a megfelelő csúcsokat: az A-nak D, a B-nek E, a C-nek F felel meg. Így az AB szakasznak a DE szakasz felel meg (AB = DE).',
      breakdown: [
        { label: 'Sorrend', value: 'A -> D, B -> E, C -> F' },
        { label: 'Oldalpár', value: 'AB = DE' }
      ],
      hint: 'Nézd meg a betűk helyét: az első két betű (AB) a másik háromszög első két betűjének (DE) felel meg.'
    },
    {
      id: 'cq9',
      level: 1,
      prompt: 'Milyen alakzatok láthatók az ábrán?',
      questionTypeBadge: 'Vizuális felismerés',
      figure: <CongruentTrianglesFigure type="congruent" label1="T₁" label2="T₂" />,
      options: [
        'Egybevágó háromszögek (az egyik el van forgatva)',
        'Nem egybevágó háromszögek (eltérő méretűek)',
        'Hasonló, de különböző méretű háromszögek',
        'Különböző szögű háromszögek'
      ],
      correctAnswer: 'Egybevágó háromszögek (az egyik el van forgatva)',
      explanation:
        'Az elforgatás vagy eltolás nem változtatja meg az alakzat méretét és alakját, így a két háromszög egybevágó (T₁ ≅ T₂).',
      hint: 'Ha elforgatjuk a jobb oldali háromszöget, pontosan fedi a bal oldalit.'
    },
    {
      id: 'cq10',
      level: 1,
      prompt: 'Melyik állítás IGAZ az egybevágósági transzformációkra (eltolás, elforgatás, tükrözés)?',
      questionTypeBadge: 'Transzformációk',
      figure: <MotionTransformationFigure type="translation" />,
      options: [
        'Távolságtartók és szögtartók (nem változtatják meg a szakaszok hosszát és a szögeket).',
        'Megváltoztatják a szakaszok hosszát, de a szögeket nem.',
        'Kétszeresére növelik a területet.',
        'Csak derékszögeket tartanak meg.'
      ],
      correctAnswer: 'Távolságtartók és szögtartók (nem változtatják meg a szakaszok hosszát és a szögeket).',
      explanation:
        'Az egybevágósági transzformációk (izometriák) alaptulajdonsága, hogy távolságtartóak (bármely két pont távolsága változatlan marad) és szögtartóak.',
      hint: 'Mozgatás közben a merev testek mérete és alakja nem változik meg.'
    },

    // ==========================================
    // 2. SZINT: KÖZEPES / GYAKORLÓ (11 - 20. feladat)
    // ==========================================
    {
      id: 'cq11',
      level: 2,
      prompt: 'Melyik alapeset mondja ki, hogy ha két háromszög mindhárom oldala egyenlő (a = a\', b = b\', c = c\'), akkor egybevágóak?',
      questionTypeBadge: 'Egybevágósági alapeset',
      figure: <TriangleCongruenceCaseFigure givenCase="SSS" />,
      options: ['(o-o-o) Három oldal alapeset', '(o-sz-o) alapeset', '(sz-o-sz) alapeset', '(sz-sz-sz) alapeset'],
      correctAnswer: '(o-o-o) Három oldal alapeset',
      explanation:
        'A három oldal tétele (angolul SSS: Side-Side-Side) szerint ha két háromszög három-három oldala megegyezik, akkor a két háromszög egybevágó.',
      hint: 'Három oldal hossza szerepel a feltételben: o-o-o.'
    },
    {
      id: 'cq12',
      level: 2,
      prompt: 'Melyik alapeset látható az ábrán, ahol két oldal és a köztük lévő szög egyezik meg?',
      questionTypeBadge: 'Egybevágósági alapeset',
      figure: <TriangleCongruenceCaseFigure givenCase="SAS" />,
      options: [
        '(o-sz-o) Két oldal és a közbezárt szög',
        '(o-o-o) Három oldal',
        '(sz-o-sz) Egy oldal és két szög',
        '(o-o-sz) Két oldal és a szemközti szög'
      ],
      correctAnswer: '(o-sz-o) Két oldal és a közbezárt szög',
      explanation:
        'Az (o-sz-o) alapeset (SAS: Side-Angle-Side) kimondja: ha két háromszögben két-két oldal és a közbezárt szög megegyezik, akkor a háromszögek egybevágók.',
      hint: 'A szög a két megadott oldal között helyezkedik el: oldal - szög - oldal (o-sz-o).'
    },
    {
      id: 'cq13',
      level: 2,
      prompt: 'Melyik alapeset szerint egybevágó két háromszög, ha egy oldaluk és a rajta fekvő két szög megegyezik?',
      questionTypeBadge: 'Egybevágósági alapeset',
      figure: <TriangleCongruenceCaseFigure givenCase="ASA" />,
      options: [
        '(sz-o-sz) Egy oldal és a rajta fekvő két szög',
        '(o-o-o) Három oldal',
        '(o-sz-o) Két oldal és közbezárt szög',
        '(sz-sz-sz) Három szög'
      ],
      correctAnswer: '(sz-o-sz) Egy oldal és a rajta fekvő két szög',
      explanation:
        'A (sz-o-sz) alapeset (ASA: Angle-Side-Angle) szerint egy oldal és a rajta fekvő két szög egyértelműen meghatározza a háromszöget.',
      hint: 'Egy oldal és a két végpontjában lévő szögek: szög - oldal - szög (sz-o-sz).'
    },
    {
      id: 'cq14',
      level: 2,
      prompt: 'Miért NEM biztosítja az egybevágóságot, ha két háromszög mindhárom szöge egyenlő (sz-sz-sz)?',
      questionTypeBadge: 'Geometriai csapda',
      figure: <TriangleCongruenceCaseFigure givenCase="AAA" />,
      options: [
        'Mert a szögek csak a háromszög alakját határozzák meg, a méretét nem (hasonlóak, de nem biztos, hogy egybevágók).',
        'Mert a háromszög belső szögeinek összege nem 180°.',
        'Mert a háromszögeknek nincs átlójuk.',
        'Mert csak tompaszögű háromszögeknél működik.'
      ],
      correctAnswer:
        'Mert a szögek csak a háromszög alakját határozzák meg, a méretét nem (hasonlóak, de nem biztos, hogy egybevágók).',
      explanation:
        'Három egyenlő szög (pl. 60°, 60°, 60°) esetén lehet egy 2 cm-es és egy 20 méteres szabályos háromszög is. Ezek hasonlóak, de nem egybevágók, mert a méretük különbözik.',
      hint: 'Gondolj egy nagyítóra: a szögek ugyanazok maradnak, de az oldalméret megnő!'
    },
    {
      id: 'cq15',
      level: 2,
      prompt: 'Tudjuk, hogy △ABC ≅ △DEF. Az ABC háromszög oldalai a = 5 cm, b = 7 cm, c = 9 cm. Mekkora a DEF háromszög kerülete?',
      questionTypeBadge: 'Számítási feladat',
      figure: <CongruenceSolverFigure knownSide="a=5, b=7, c=9 cm" findTarget="perimeter" />,
      options: ['21 cm', '42 cm', '12 cm', '16 cm'],
      correctAnswer: '21 cm',
      explanation:
        'Az ABC háromszög kerülete: K = 5 + 7 + 9 = 21 cm. Mivel △ABC ≅ △DEF, a kerületük azonos: K_DEF = 21 cm.',
      breakdown: [
        { label: 'ABC kerülete', value: '5 + 7 + 9 = 21 cm' },
        { label: 'DEF kerülete', value: 'K_DEF = K_ABC = 21 cm' }
      ],
      hint: 'Add össze az oldalakat: 5 + 7 + 9 = ?'
    },
    {
      id: 'cq16',
      level: 2,
      prompt: 'Két derékszögű háromszög befogói 6 cm és 8 cm hosszúak mindkét háromszögben. Egybevágóak?',
      questionTypeBadge: 'Derékszögű háromszög',
      options: [
        'Igen, az (o-sz-o) alapeset alapján (két befogó és a 90°-os közbezárt derékszög egyenlő).',
        'Nem, mert az átfogójuk nem ismert.',
        'Csak akkor, ha a területük 24 cm².',
        'Nem dönthető el.'
      ],
      correctAnswer: 'Igen, az (o-sz-o) alapeset alapján (két befogó és a 90°-os közbezárt derékszög egyenlő).',
      explanation:
        'A derékszögű háromszögekben a két befogó által bezárt szög mindig 90°. Így a két befogó és a derékszög egyezése pontosan az (o-sz-o) alapesetnek felel meg.',
      breakdown: [
        { label: 'Oldalak', value: 'a = 6 cm, b = 8 cm' },
        { label: 'Közbezárt szög', value: 'γ = 90° (derékszög)' },
        { label: 'Alapeset', value: '(o-sz-o) miatt egybevágó' }
      ],
      hint: 'A két befogó mindig derékszöget (90°) zár be egymással!'
    },
    {
      id: 'cq17',
      level: 2,
      prompt: 'Egy △ABC háromszögben a = 8 cm, b = 5 cm, és a hosszabb oldallal szemközti szög α = 75°. Melyik alapeset biztosítja az egyértelmű egybevágóságot?',
      questionTypeBadge: 'Egybevágósági alapeset',
      figure: <TriangleCongruenceCaseFigure givenCase="SsA" />,
      options: [
        '(o-o-sz) Két oldal és a nagyobbikkal szemközti szög',
        '(o-o-o) Három oldal',
        '(sz-o-sz) Egy oldal és két szög',
        '(sz-sz-sz) Három szög'
      ],
      correctAnswer: '(o-o-sz) Két oldal és a nagyobbikkal szemközti szög',
      explanation:
        'Mivel a > b (8 > 5), a szög a hosszabbik oldallal (a) van szemben. Ez pontosan az (o-o-sz) alapeset feltétele, ami egyértelmű egybevágóságot garantál.',
      hint: 'Két oldal és a hosszabb oldallal szemközti szög: o-o-sz.'
    },
    {
      id: 'cq18',
      level: 2,
      prompt: 'Ha △ABC ≅ △A\'B\'C\', és az A csúcsnál lévő szög α = 48°, mekkora az A\' csúcsnál lévő α\' szög?',
      questionTypeBadge: 'Szögmeghatározás',
      figure: <CongruenceSolverFigure knownAngle="α = 48°" findTarget="angle" />,
      options: ['48°', '96°', '42°', '132°'],
      correctAnswer: '48°',
      explanation:
        'Egybevágó háromszögekben a megfelelő belső szögek pontosan egyenlő nagyságúak: α\' = α = 48°.',
      hint: 'A megfelelő csúcsoknál lévő szögek egyenlők.'
    },
    {
      id: 'cq19',
      level: 2,
      prompt: 'Egy háromszög oldalai 4 cm, 6 cm és 8 cm. Egy másik háromszög oldalai 6 cm, 8 cm és 4 cm. Egybevágó a két háromszög?',
      questionTypeBadge: 'Alapeset alkalmazás',
      options: [
        'Igen, az (o-o-o) alapeset miatt (oldalaik páronként egyenlő hosszúak).',
        'Nem, mert más a sorrendjük.',
        'Csak akkor, ha egyenlő szárúak.',
        'Nem dönthető el.'
      ],
      correctAnswer: 'Igen, az (o-o-o) alapeset miatt (oldalaik páronként egyenlő hosszúak).',
      explanation:
        'A háromszög oldalainak halmaza {4, 6, 8} mindkét alakzatnál megegyezik. Az (o-o-o) alapeset alapján a két háromszög egybevágó.',
      hint: 'Mindkét háromszögnek pontosan 4, 6 és 8 cm-es oldalai vannak.'
    },
    {
      id: 'cq20',
      level: 2,
      prompt: 'Ha egy téglalap oldalai 5 cm és 12 cm, melyik téglalap egybevágó vele?',
      questionTypeBadge: 'Négyszögek egybevágósága',
      options: [
        'Egy olyan téglalap, amelynek oldalai 12 cm és 5 cm.',
        'Egy olyan téglalap, amelynek oldalai 6 cm és 10 cm (azonos kerület).',
        'Egy 60 cm² területű négyzet.',
        'Bármelyik 5 cm oldalú paralelogramma.'
      ],
      correctAnswer: 'Egy olyan téglalap, amelynek oldalai 12 cm és 5 cm.',
      explanation:
        'Két téglalap pontosan akkor egybevágó, ha két szomszédos oldaluk hossza megegyezik (a = a\' és b = b\'), függetlenül attól, hogy el vannak-e forgatva 90°-kal.',
      hint: 'A téglalap elforgatva is önmagával egybevágó marad: 5x12 = 12x5.'
    },

    // ==========================================
    // 3. SZINT: HALADÓ / MESTERFOK (21 - 30. feladat)
    // ==========================================
    {
      id: 'cq21',
      level: 3,
      prompt: 'Melyik egybevágósági transzformáció FORDÍTJA MEG a síkbeli alakzat csúcsainak körüljárási irányát?',
      questionTypeBadge: 'Transzformációk',
      figure: <MotionTransformationFigure type="axial_reflection" label="Tengelyes tükrözés (t tengely)" />,
      options: [
        'A tengelyes tükrözés',
        'Az eltolás',
        'Az elforgatás',
        'A középpontos tükrözés'
      ],
      correctAnswer: 'A tengelyes tükrözés',
      explanation:
        'A tengelyes tükrözés közvetett (inverz) egybevágóság: megfordítja az alakzat körüljárási irányát (az óramutató járásával ellentétes sorrend az óramutató járásával megegyezővé válik). Az eltolás, elforgatás és középpontos tükrözés megtartja a körüljárási irányt.',
      hint: 'Gondolj a tükörképedre: a jobb kezed a tükörben a bal oldalra kerül!'
    },
    {
      id: 'cq22',
      level: 3,
      prompt: 'Hogyan tekinthetünk a középpontos tükrözésre az elforgatás szempontjából?',
      questionTypeBadge: 'Transzformációk kapcsolata',
      figure: <MotionTransformationFigure type="central_reflection" label="Középpontos tükrözés (O pont)" />,
      options: [
        'Egy 180°-os elforgatás a tükörközéppont körül.',
        'Egy 90°-os elforgatás és eltolás.',
        'Két párhuzamos tengelyre való tükrözés.',
        'Egy 360°-os teljes körülfordulás.'
      ],
      correctAnswer: 'Egy 180°-os elforgatás a tükörközéppont körül.',
      explanation:
        'Az O pontra vonatkozó középpontos tükrözés geometriailag pontosan megegyezik egy 180°-os (félfordulatos) elforgatással az O pont körül.',
      hint: 'A ponton átmenő egyenes túloldalára, azonos távolságra átvitel egy félkörnyi (180°) forgatásnak felel meg.'
    },
    {
      id: 'cq23',
      level: 3,
      prompt: 'Egy rombusz két átlója a rombuszt 4 darab háromszögre bontja. Mit állíthatunk erről a 4 háromszögről?',
      questionTypeBadge: 'Geometriai bizonyítás',
      options: [
        'Mind a 4 háromszög egymással egybevágó derékszögű háromszög.',
        'Csak a szemköztiek egybevágók.',
        'Egyik sem egybevágó a másikkal.',
        'Mind a 4 szabályos háromszög.'
      ],
      correctAnswer: 'Mind a 4 háromszög egymással egybevágó derékszögű háromszög.',
      explanation:
        'A rombusz átlói merőlegesen felezik egymást, és a rombusz minden oldala egyenlő. Így a keletkező 4 derékszögű háromszög mindhárom oldala megegyezik (átfogójuk a rombusz oldala, befogóik a fél-átlók), tehát az (o-o-o) tétel alapján mind a 4 egybevágó.',
      breakdown: [
        { label: 'Átlók tulajdonsága', value: 'Merőlegesen felezik egymást' },
        { label: 'Oldalak', value: 'a rombusz 4 oldala egyenlő' },
        { label: 'Következmény', value: '4 db egybevágó derékszögű háromszög' }
      ],
      hint: 'A rombusz átlói merőlegesek és felezik egymást, a külső oldalak pedig egyformák.'
    },
    {
      id: 'cq24',
      level: 3,
      prompt: 'Milyen kapcsolatban állnak a szögfelező egyenes tetszőleges pontjának a szögszáraktól mért merőleges távolságai?',
      questionTypeBadge: 'Szögfelező tulajdonsága',
      options: [
        'A szögfelező bármely pontja egyenlő távolságra van a két szögszártól (egybevágó derékszögű háromszögek miatt).',
        'A szögfelező pontjai kétszer olyan messze vannak az egyik szártól.',
        'A távolságok aránya 1:2.',
        'A távolságok összege mindig 90 cm.'
      ],
      correctAnswer:
        'A szögfelező bármely pontja egyenlő távolságra van a két szögszártól (egybevágó derékszögű háromszögek miatt).',
      explanation:
        'A szögfelező pontjából a szárakra bocsátott merőlegesek két olyan derékszögű háromszöget hoznak létre, amelyeknek közös az átfogójuk és egy hegyesszögük megegyezik (α/2). A (sz-o-sz) tétel miatt egybevágók, így a merőleges távolságok egyenlők.',
      hint: 'A szögfelező definíciója szerint a szárak közötti távolság szimmetrikusan egyenlő.'
    },
    {
      id: 'cq25',
      level: 3,
      prompt: 'Mit állíthatunk a szakaszfelező merőleges egyenes tetszőleges P pontjának a szakasz A és B végpontjaitól mért távolságáról (PA és PB)?',
      questionTypeBadge: 'Szakaszfelező tulajdonsága',
      options: [
        'PA = PB, vagyis a szakaszfelező merőleges bármely pontja egyenlő távolságra van a szakasz két végpontjától.',
        'PA mindig nagyobb, mint PB.',
        'PA + PB mindig 180 cm.',
        'PA és PB merőleges egymásra.'
      ],
      correctAnswer:
        'PA = PB, vagyis a szakaszfelező merőleges bármely pontja egyenlő távolságra van a szakasz két végpontjától.',
      explanation:
        'A szakaszfelező merőleges P pontját a felezőponttal (F) és a végpontokkal (A, B) összekötve két derékszögű háromszöget kapunk (PFA és PFB). Ezekben AF = FB, PF közös oldal, és a bezárt szög 90°. Az (o-sz-o) tétel miatt egybevágók, így PA = PB.',
      breakdown: [
        { label: 'Felezőpont', value: 'AF = FB' },
        { label: 'Közös oldal', value: 'PF oldal azonos' },
        { label: 'Közbezárt szög', value: '90° derékszög' },
        { label: 'Eredmény', value: 'PA = PB (egybevágóak)' }
      ],
      hint: 'A szakaszfelező merőleges szimmetriatengelyként viselkedik az A és B pont között.'
    },
    {
      id: 'cq26',
      level: 3,
      prompt: 'Két egybevágó sokszöget egymás után kétszer tengelyesen tükrözünk két egymással párhuzamos tengelyre. Milyen egyetlen transzformációval helyettesíthető ez?',
      questionTypeBadge: 'Transzformációk összetétele',
      options: [
        'Egy eltolással (a tengelyek távolságának kétszeresével).',
        'Egy elforgatással 90°-kal.',
        'Egyetlen tengelyes tükrözéssel.',
        'Egy középpontos tükrözéssel.'
      ],
      correctAnswer: 'Egy eltolással (a tengelyek távolságának kétszeresével).',
      explanation:
        'Két párhuzamos tengelyre történő egymás utáni tengelyes tükrözés egyetlen eltolással (transzlációval) egyenértékű, amelynek nagysága a két tengely közötti távolság kétszerese (2d), iránya pedig merőleges a tengelyekre.',
      hint: 'Két tükrözésnél a körüljárási irány kétszer fordul meg, tehát visszatér az eredetibe, így eltolást kapunk.'
    },
    {
      id: 'cq27',
      level: 3,
      prompt: 'Két egymást metsző tengelyre történő egymás utáni tengelyes tükrözés milyen egyetlen transzformációval egyenértékű?',
      questionTypeBadge: 'Transzformációk összetétele',
      options: [
        'Egy elforgatással a metszéspont körül (a tengelyek szögének kétszeresével: 2α).',
        'Egy eltolással.',
        'Egy harmadik tengelyes tükrözéssel.',
        'Nem hoz létre egybevágóságot.'
      ],
      correctAnswer: 'Egy elforgatással a metszéspont körül (a tengelyek szögének kétszeresével: 2α).',
      explanation:
        'Ha két tengely α szöget zár be és az O pontban metszi egymást, akkor az egymás utáni tükrözésük az O pont körüli 2α szögű elforgatással egyenértékű.',
      hint: 'A két metsző tengely metszéspontja fix pont marad, így körülötte elforgatás történik.'
    },
    {
      id: 'cq28',
      level: 3,
      prompt: 'Egy téglalap átlója a téglalapot két háromszögre bontja. Mit állíthatunk erről a két háromszögről?',
      questionTypeBadge: 'Téglalap tulajdonsága',
      options: [
        'A két derékszögű háromszög egybevágó egymással.',
        'A két háromszög területe eltérő.',
        'Csak akkor egybevágók, ha négyzetről van szó.',
        'A két háromszög tompaszögű.'
      ],
      correctAnswer: 'A két derékszögű háromszög egybevágó egymással.',
      explanation:
        'A téglalap szemközti oldalai egyenlők (a = a, b = b), a behúzott átló közös oldal (d = d), és mindkettőben van egy derékszög (90°). Az (o-o-o) vagy (o-sz-o) tétel alapján a két derékszögű háromszög egybevágó.',
      hint: 'A téglalap átlója két egybevágó derékszögű háromszögre felezi a síkidomot.'
    },
    {
      id: 'cq29',
      level: 3,
      prompt: 'Melyik állítás HIBÁS az egybevágósággal kapcsolatban?',
      questionTypeBadge: 'Kritikus gondolkodás',
      options: [
        'Ha két háromszög területe egyenlő, akkor biztosan egybevágóak is.',
        'Ha két háromszög egybevágó, akkor a területük mindig egyenlő.',
        'Minden geometriai alakzat egybevágó önmagával.',
        'Ha A ≅ B és B ≅ C, akkor A ≅ C.'
      ],
      correctAnswer: 'Ha két háromszög területe egyenlő, akkor biztosan egybevágóak is.',
      explanation:
        'Az egyenlő terület (pl. T = 12 cm²) NEM jelenti az egybevágóságot! Lehet egy 3 × 8-as és egy 4 × 6-os derékszögű háromszög is azonos területű, mégsem egybevágóak, mert oldalaik és alakjuk eltérő.',
      hint: 'Különböző alakú háromszögeknek is lehet véletlenül ugyanakkora a területe!'
    },
    {
      id: 'cq30',
      level: 3,
      prompt: 'Egy egyenlő szárú háromszög alaphoz tartozó magasságvonala két háromszögre bontja az alakzatot. Mit mondhatunk róluk?',
      questionTypeBadge: 'Szimmetria & Egybevágóság',
      options: [
        'A magasságvonal két egymással egybevágó derékszögű háromszögre bontja az alakzatot.',
        'A két háromszög területe eltérő.',
        'A két háromszög nem derékszögű.',
        'Csak szabályos háromszögnél egybevágók.'
      ],
      correctAnswer:
        'A magasságvonal két egymással egybevágó derékszögű háromszögre bontja az alakzatot.',
      explanation:
        'Az egyenlő szárú háromszög alaphoz tartozó magassága felezi az alapot, szimmetriatengelyként viselkedik, és merőleges az alapra. Így a két derékszögű háromszög átfogói a szárak (b = b), egyik befogójuk a közös magasság (m = m), a másik befogójuk pedig a fél alap (a/2 = a/2). Az (o-o-o) tétel miatt egybevágók.',
      breakdown: [
        { label: 'Átfogók', value: 'Szárak egyenlők (b = b)' },
        { label: 'Közös oldal', value: 'Magasság (m = m)' },
        { label: 'Fél alap', value: 'a/2 = a/2' },
        { label: 'Következmény', value: '2 db egybevágó derékszögű háromszög' }
      ],
      hint: 'A tengelyes szimmetria két teljesen egyforma fél-háromszögre vágja az alakzatot.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs-congruence-def',
      title: 'Egybevágóság fogalma',
      icon: <Sparkles className="w-4 h-4 text-orange-500" />,
      formula: 'F₁ ≅ F₂ ⟺ mozgatással fedésbe hozhatók',
      note: 'Megfelelő oldalak hossza, szögek nagysága, kerület (K = K\') és terület (T = T\') azonos.'
    },
    {
      id: 'cs-cases',
      title: 'Háromszögek 4 alapesete',
      icon: <Shapes className="w-4 h-4 text-cyan-500" />,
      formula: '(o-o-o), (o-sz-o), (sz-o-sz), (o-o-sz)',
      note: 'Vigyázat: a (sz-sz-sz) csak hasonlóságot jelent! Az (o-o-sz) csak a nagyobbik oldallal szemközti szögre érvényes.'
    },
    {
      id: 'cs-isometries',
      title: 'Egybevágósági transzformációk',
      icon: <MoveHorizontal className="w-4 h-4 text-indigo-500" />,
      formula: 'Eltolás, Forgatás, Tengelyes tükrözés, Középpontos tükrözés',
      note: 'Távolságtartók és szögtartók. A tengelyes tükrözés megfordítja a körüljárási irányt!'
    }
  ];

  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={6}
      chapterId="g6-geometry"
      topicId="g6-congruence-quiz"
      title="Egybevágóság Kvíz"
      subtitle="30 feladatos átfogó szintfelmérő az egybevágóság fogalmából, alapeseteiből és transzformációiból"
      badgeText="📐 6. Osztály • III. Geometria • 2. Fejezet"
      badgeColor="orange"
      questions={questions}
      cheatSheetTitle="Egybevágóság Képtár & Képlettár"
      cheatSheetCards={cheatSheetCards}
      renderMatcher={(props) => <CongruenceMatcher {...props} />}
      renderSorter={(props) => <CongruenceSorter {...props} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapfogalmak és felismerés',
          subtitle: '10 feladat • Alapok',
          focus: 'Egybevágóság fogalma, ≅ jelölés, oldalak, szögek, kerület és terület',
          range: '1-10. feladat'
        },
        level2: {
          title: '2. Szint: Háromszögek egybevágósági esetei',
          subtitle: '10 feladat • Gyakorló',
          focus: 'A 4 alapeset (o-o-o, o-sz-o, sz-o-sz, o-o-sz) és hiányzó adatok számítása',
          range: '11-20. feladat'
        },
        level3: {
          title: '3. Szint: Transzformációk és mesterfeladványok',
          subtitle: '10 feladat • Haladó',
          focus: 'Izometriák, körüljárási irány, geometriai bizonyítások és szimmetriák',
          range: '21-30. feladat'
        }
      }}
    />
  );
}
