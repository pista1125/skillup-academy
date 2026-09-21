import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { ConstructionsMatcher } from './ConstructionsMatcher';
import { ConstructionsSorter } from './ConstructionsSorter';
import {
  AngleBisectorConstructionDiagram,
  PerpendicularFromPointDiagram,
  PerpendicularFromExternalPointDiagram,
  TriangleConstructionDiagram,
  ConstructionsSolverFigure
} from './ConstructionsDiagrams';
import { Compass, Pencil, Target, Calculator, Sparkles, MoveHorizontal } from 'lucide-react';

export interface ConstructionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function ConstructionsQuiz({ onBack, onSwitchToTheory }: ConstructionsQuizProps) {
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (1 - 10. feladat)
    // ==========================================
    {
      id: 'cq1',
      level: 1,
      prompt: 'Mely eszközök használata megengedett az euklideszi geometriai szerkesztésekben?',
      questionTypeBadge: 'Alapfogalom',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'Körző és beosztás nélküli (egyélű) vonalzó.',
        'Kizárólag szögmérő és számológép.',
        'Mérőszalag és derékszögű vonalzó.',
        'Csak körző, vonalzó nélkül.'
      ],
      correctAnswer: 'Körző és beosztás nélküli (egyélű) vonalzó.',
      explanation:
        'A klasszikus euklideszi szerkesztésekben kizárólag körzőt (körívekhez és távolságátvitelhez) és egyélű vonalzót (pontok összekötéséhez) használhatunk.',
      breakdown: [
        { label: 'Eszköz 1', value: 'Körző (távolság, körív)' },
        { label: 'Eszköz 2', value: 'Egyélű vonalzó (egyenes, szakasz)' }
      ],
      hint: 'Gondolj az ókori görögök két alapvető eszközére.'
    },
    {
      id: 'cq2',
      level: 1,
      prompt: 'Mire szolgál a körző az alapszerkesztések során?',
      questionTypeBadge: 'Eszközhasználat',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'Körívek rajzolására és távolságok (szakaszok) pontos átvitelére.',
        'Szögek fokban történő leolvasására.',
        'Egyenes vonalak meghúzására pontok között.',
        'Csak derékszögek ellenőrzésére.'
      ],
      correctAnswer: 'Körívek rajzolására és távolságok (szakaszok) pontos átvitelére.',
      explanation:
        'A körző segítségével köröket és köríveket húzunk, valamint a szakaszok hosszát pontosan át tudjuk mérni anélkül, hogy számszerűen le kellene mérnünk vonalzóval.',
      breakdown: [
        { label: 'Körív', value: 'Adott ponttól egyenlő távolság' },
        { label: 'Másolás', value: 'Szakaszhossz pontos átvitele' }
      ],
      hint: 'A körző csúcsa és hegye közötti távolság állandó marad mozgás közben.'
    },
    {
      id: 'cq3',
      level: 1,
      prompt: 'Mi a szögfelező (f_α) pontos geometriai definíciója?',
      questionTypeBadge: 'Definíció',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'A szög csúcsából kiinduló félegyenes, amely a szöget két egyenlő nagyságú szögre osztja.',
        'A szög két szárát összekötő tetszőleges szakasz.',
        'A szög egyik szárára állított merőleges egyenes.',
        'A szög csúcsán átmenő, mindkét szárral párhuzamos egyenes.'
      ],
      correctAnswer: 'A szög csúcsából kiinduló félegyenes, amely a szöget két egyenlő nagyságú szögre osztja.',
      explanation:
        'A szögfelező a szög csúcsából induló félegyenes, melyre igaz, hogy α₁ = α₂ = α / 2.',
      breakdown: [
        { label: 'Kezdőpont', value: 'Szög csúcsa (O)' },
        { label: 'Felosztás', value: 'Két egyenlő szög (α/2)' }
      ],
      hint: 'A neve mutatja: elfelezi a szöget.'
    },
    {
      id: 'cq4',
      level: 1,
      prompt: 'Ha egy 80°-os szöget szögfelezővel elfelezünk, mekkora szögeket kapunk?',
      questionTypeBadge: 'Számítás',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        '40° és 40°',
        '30° és 50°',
        '45° és 45°',
        '20° és 60°'
      ],
      correctAnswer: '40° és 40°',
      explanation:
        'A szögfelező pontosan két egyenlő részre osztja a szöget: 80° / 2 = 40°.',
      breakdown: [
        { label: 'Eredeti szög', value: '80°' },
        { label: 'Felezett szög', value: '80° / 2 = 40°' }
      ],
      hint: 'Oszd el a 80°-ot kettővel.'
    },
    {
      id: 'cq5',
      level: 1,
      prompt: 'Hány fokos szöget zár be egymással két egymásra merőleges egyenes?',
      questionTypeBadge: 'Alapfogalom',
      figure: <ConstructionsSolverFigure type="perpendicular_on_line" />,
      options: [
        '90° (derékszög)',
        '180° (egyenesszög)',
        '45° (félderékszög)',
        '60° (hegyesszög)'
      ],
      correctAnswer: '90° (derékszög)',
      explanation:
        'Két egymásra merőleges egyenes (e ⊥ m) pontosan 90°-os derékszöget zár be egymással.',
      breakdown: [
        { label: 'Jelölés', value: 'e ⊥ m' },
        { label: 'Szögérték', value: '90° (derékszög)' }
      ],
      hint: 'A derékszög fokértékére gondolj.'
    },
    {
      id: 'cq6',
      level: 1,
      prompt: 'Mi a háromszög-egyenlőtlenség szabálya háromszög szerkesztésekor?',
      questionTypeBadge: 'Tétel',
      figure: <ConstructionsSolverFigure type="triangle_sss" />,
      options: [
        'Bármely két oldal összege nagyobb kell legyen a harmadik oldalnál (a + b > c).',
        'A három oldal szorzata mindig 180 cm kell legyen.',
        'A leghosszabb oldalnak egyenlőnek kell lennie a másik kettő összegével.',
        'Minden háromszög tetszőleges 3 számból megszerkeszthető.'
      ],
      correctAnswer: 'Bármely két oldal összege nagyobb kell legyen a harmadik oldalnál (a + b > c).',
      explanation:
        'Háromszög csak akkor szerkeszthető meg, ha a két rövidebb oldal összege szigorúan nagyobb a harmadiknál: a + b > c.',
      breakdown: [
        { label: 'Feltétel', value: 'a + b > c' },
        { label: 'Geometriai ok', value: 'A körívek csak így metszik egymást' }
      ],
      hint: 'Ha két szakasz összege rövidebb a harmadiknál, a körívek nem érnek össze.'
    },
    {
      id: 'cq7',
      level: 1,
      prompt: 'Milyen egyeneseket nevezünk egymással párhuzamosnak egy síkban?',
      questionTypeBadge: 'Alapfogalom',
      figure: <ConstructionsSolverFigure type="parallel_lines" />,
      options: [
        'Amelyek egy síkban fekszenek és nincs közös pontjuk (távolságuk állandó).',
        'Amelyek 90°-os szöget zárnak be egymással.',
        'Amelyek pontosan 1 pontban metszik egymást.',
        'Amelyeknek minden pontjuk közös.'
      ],
      correctAnswer: 'Amelyek egy síkban fekszenek és nincs közös pontjuk (távolságuk állandó).',
      explanation:
        'A síkban fekvő párhuzamos egyenesek (e₁ ∥ e₂) nem metszik egymást, távolságuk mindenütt azonos.',
      breakdown: [
        { label: 'Jelölés', value: 'e₁ ∥ e₂' },
        { label: 'Metszéspont', value: 'Nincs (0 közös pont)' }
      ],
      hint: 'Gondolj a vasúti sínekre.'
    },
    {
      id: 'cq8',
      level: 1,
      prompt: 'Mi a legelső lépés a szögfelező szerkesztésekor?',
      questionTypeBadge: 'Szerkesztési lépés',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'A szög O csúcsából tetszőleges sugarú körívet húzunk, amely elmetszi a két szárat.',
        'Azonnal vonalzót teszünk a szög közepére és behúzzuk a vonalat.',
        'Szögmérővel megmérjük a szöget.',
        'Merőlegest állítunk a szög egyik szárára.'
      ],
      correctAnswer: 'A szög O csúcsából tetszőleges sugarú körívet húzunk, amely elmetszi a két szárat.',
      explanation:
        'A csúcsból rajzolt körívvel kijelölünk két segédpontot (P₁, P₂) a szárakon, amelyek egyenlő távolságra vannak az O csúcstól.',
      breakdown: [
        { label: '1. lépés', value: 'Körív O csúcsból' },
        { label: 'Eredmény', value: 'P₁ és P₂ pontok a szárakon' }
      ],
      hint: 'Először a két száron kell egyenlő távolságú pontokat kijelölni.'
    },
    {
      id: 'cq9',
      level: 1,
      prompt: 'Hogyan állítunk merőlegest egy egyenes adott P pontjában körzővel és vonalzóval?',
      questionTypeBadge: 'Szerkesztési lépés',
      figure: <ConstructionsSolverFigure type="perpendicular_on_line" />,
      options: [
        'P körül kijelölünk két egyenlő távolságú A és B pontot, majd megszerkesztjük az AB szakasz felezőmerőlegesét.',
        'Egyszerűen szemmértékkel meghúzzuk a merőlegest.',
        'A P pontból körívet húzunk a lap széléig.',
        'Csak szögmérővel lehetséges.'
      ],
      correctAnswer: 'P körül kijelölünk két egyenlő távolságú A és B pontot, majd megszerkesztjük az AB szakasz felezőmerőlegesét.',
      explanation:
        'P pontból azonos távolságot mérünk fel mindkét irányban, így P lesz az AB szakasz felezőpontja. Erre felezőmerőlegest szerkesztve pontos merőlegest kapunk.',
      breakdown: [
        { label: 'Segédpontok', value: 'PA = PB' },
        { label: 'Elv', value: 'Szakaszfelező merőleges' }
      ],
      hint: 'A már tanult szakaszfelező merőleges szerkesztési elvét alkalmazzuk.'
    },
    {
      id: 'cq10',
      level: 1,
      prompt: 'Milyen adatcsoportok alapján szerkeszthető meg egyértelműen egy háromszög?',
      questionTypeBadge: 'Alapesetek',
      figure: <ConstructionsSolverFigure type="triangle_sss" />,
      options: [
        '3 oldal (ooo), vagy 2 oldal és közbezárt szög (osz), vagy 1 oldal és 2 szög (szosz).',
        'Kizárólag csak a 3 szög ismeretében.',
        'Bármilyen 1 oldalhossz és semmi más adat nélkül.',
        'Csak akkor, ha a háromszög szabályos.'
      ],
      correctAnswer: '3 oldal (ooo), vagy 2 oldal és közbezárt szög (osz), vagy 1 oldal és 2 szög (szosz).',
      explanation:
        'A háromszögek egybevágósági alapesetei (ooo, osz, szosz, oszs) biztosítják az egyértelmű szerkeszthetőséget.',
      breakdown: [
        { label: 'ooo', value: 'Három oldal' },
        { label: 'osz', value: 'Oldal, szög, oldal' },
        { label: 'szosz', value: 'Szög, oldal, szög' }
      ],
      hint: 'Gondolj a háromszögek egybevágósági eseteire.'
    },

    // ==========================================
    // 2. SZINT: GYAKORLÓ ÉS SZÁMÍTÁSOS (11 - 20. feladat)
    // ==========================================
    {
      id: 'cq11',
      level: 2,
      prompt: 'Egy szögfelezőn felvettünk egy P pontot. Ha P távolsága a szög egyik szárától 6 cm, mekkora a távolsága a másik szártól?',
      questionTypeBadge: 'Ponthalmaz tétel',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        '6 cm',
        '12 cm',
        '3 cm',
        'Nem meghatározható'
      ],
      correctAnswer: '6 cm',
      explanation:
        'A szögfelező tétel szerint a szögfelező bármely P pontja egyenlő távolságra van a két szögszártól: d(P, a) = d(P, b) = 6 cm.',
      breakdown: [
        { label: 'Tétel', value: 'd(P, a) = d(P, b)' },
        { label: 'Eredmény', value: '6 cm' }
      ],
      hint: 'A szögfelező pontjai egyenlő távolságra vannak a száraktól.'
    },
    {
      id: 'cq12',
      level: 2,
      prompt: 'Szerkeszthető-e háromszög az alábbi oldalhosszakból: a = 4 cm, b = 6 cm, c = 11 cm?',
      questionTypeBadge: 'Szerkeszthetőség',
      figure: <ConstructionsSolverFigure type="triangle_impossible" />,
      options: [
        'Nem, mert 4 + 6 = 10 < 11 (nem teljesül a háromszög-egyenlőtlenség).',
        'Igen, mert mindhárom szám pozitív.',
        'Igen, mert van derékszöge.',
        'Csak akkor, ha szögmérőt is használunk.'
      ],
      correctAnswer: 'Nem, mert 4 + 6 = 10 < 11 (nem teljesül a háromszög-egyenlőtlenség).',
      explanation:
        'A két rövidebb oldal összege (4 + 6 = 10 cm) kisebb a leghosszabb oldalnál (11 cm), így a két körív nem metszi egymást a síkban.',
      breakdown: [
        { label: 'Rövid oldalak', value: '4 + 6 = 10 cm' },
        { label: 'Leghosszabb oldal', value: '11 cm' },
        { label: 'Összehasonlítás', value: '10 < 11 ➔ NEM szerkeszthető' }
      ],
      hint: 'Add össze a két kisebb számot és hasonlítsd a legnagyobbhoz.'
    },
    {
      id: 'cq13',
      level: 2,
      prompt: 'Szerkeszthető-e háromszög az alábbi oldalhosszakból: a = 5 cm, b = 8 cm, c = 10 cm?',
      questionTypeBadge: 'Szerkeszthetőség',
      figure: <ConstructionsSolverFigure type="triangle_sss" param1="10 cm" param2="8 cm" />,
      options: [
        'Igen, mert 5 + 8 = 13 > 10 (teljesül a háromszög-egyenlőtlenség).',
        'Nem, mert a számok nem egyenlők.',
        'Nem, mert az összegük páratlan szám.',
        'Csak tompaszögű háromszög lehet.'
      ],
      correctAnswer: 'Igen, mert 5 + 8 = 13 > 10 (teljesül a háromszög-egyenlőtlenség).',
      explanation:
        'A két rövidebb oldal összege 5 + 8 = 13 cm, ami nagyobb a 10 cm-nél. Mivel minden oldalra teljesül az egyenlőtlenség, a háromszög megszerkeszthető.',
      breakdown: [
        { label: 'Két kisebb oldal', value: '5 + 8 = 13 cm' },
        { label: 'Harmadik oldal', value: '10 cm' },
        { label: 'Eredmény', value: '13 > 10 ➔ Szerkeszthető' }
      ],
      hint: 'Ellenőrizd: a két kisebb oldal összege nagyobb-e a harmadiknál.'
    },
    {
      id: 'cq14',
      level: 2,
      prompt: 'Hány fokos szög szerkeszthető meg közvetlenül egy szabályos háromszög szerkesztésével?',
      questionTypeBadge: 'Nevezetes szög',
      figure: <ConstructionsSolverFigure type="angle_60" />,
      options: [
        '60°',
        '45°',
        '90°',
        '120°'
      ],
      correctAnswer: '60°',
      explanation:
        'A szabályos háromszög minden belső szöge 60°-os. Ha egy félegyenes kezdőpontjából R sugárral körívet húzunk, majd a metszéspontból ugyanezzel az R sugárral elmetsszük az ívet, pontosan 60°-os szöget kapunk.',
      breakdown: [
        { label: 'Szabályos △', value: 'Minden belső szöge 60°' },
        { label: 'Körív sugara', value: 'R = a (azonos sugár)' }
      ],
      hint: 'A szabályos háromszög szögeinek nagyságára gondolj.'
    },
    {
      id: 'cq15',
      level: 2,
      prompt: 'Hogyan szerkeszthető meg pontosan egy 30°-os szög körzővel és vonalzóval?',
      questionTypeBadge: 'Nevezetes szög',
      figure: <ConstructionsSolverFigure type="angle_30" />,
      options: [
        'Megszerkesztünk egy 60°-os szöget, majd megszerkesztjük annak a szögfelezőjét (60° / 2 = 30°).',
        'Megfelezzük a 90°-os szöget.',
        'Háromszor felmérjük a 10°-os szöget.',
        'Csak szögmérővel lehetséges.'
      ],
      correctAnswer: 'Megszerkesztünk egy 60°-os szöget, majd megszerkesztjük annak a szögfelezőjét (60° / 2 = 30°).',
      explanation:
        'A 60°-os alapszög szerkesztése után a szögfelezés lépéseivel pontosan 30°-os szöget kapunk (60° / 2 = 30°).',
      breakdown: [
        { label: '1. lépés', value: '60°-os szög szerkesztése' },
        { label: '2. lépés', value: 'Szögfelezés: 60° / 2 = 30°' }
      ],
      hint: '30 a 60 fele.'
    },
    {
      id: 'cq16',
      level: 2,
      prompt: 'Hogyan szerkeszthető meg pontosan egy 45°-os szög körzővel és vonalzóval?',
      questionTypeBadge: 'Nevezetes szög',
      figure: <ConstructionsSolverFigure type="angle_45" />,
      options: [
        'Merőlegest állítunk (90°), majd megszerkesztjük a derékszög szögfelezőjét (90° / 2 = 45°).',
        'Két 30°-os szöget összeadunk.',
        'Egy 60°-os szögből kivonunk 10°-ot.',
        'Szemmértékkel meghúzzuk a derékszög felét.'
      ],
      correctAnswer: 'Merőlegest állítunk (90°), majd megszerkesztjük a derékszög szögfelezőjét (90° / 2 = 45°).',
      explanation:
        'A 90°-os derékszög szerkesztése után szögfelezést végzünk: 90° / 2 = 45°.',
      breakdown: [
        { label: '1. lépés', value: 'Merőleges állítása (90°)' },
        { label: '2. lépés', value: 'Szögfelezés: 90° / 2 = 45°' }
      ],
      hint: '45 a 90 fele.'
    },
    {
      id: 'cq17',
      level: 2,
      prompt: 'Merőleges bocsátásakor külső P pontból egy egyenesre, miért kell a körívnek 2 pontban metszenie az egyenest?',
      questionTypeBadge: 'Szerkesztési lépés',
      figure: <ConstructionsSolverFigure type="perpendicular_external" />,
      options: [
        'Mert a két metszéspont (A és B) határozza meg azt a szakaszt, amelyre felezőmerőlegest tudunk szerkeszteni.',
        'Hogy a vonalzó ne csússzon el.',
        'Mert a körző csak 2 pontban tud rajzolni.',
        'Hogy ellenőrizzük az egyenes egyenességét.'
      ],
      correctAnswer: 'Mert a két metszéspont (A és B) határozza meg azt a szakaszt, amelyre felezőmerőlegest tudunk szerkeszteni.',
      explanation:
        'A P-ből húzott körív metszéspontjai (A, B) egy olyan szakaszt képeznek az egyenesen, amelynek P pontosan a felezőmerőlegesén helyezkedik el.',
      breakdown: [
        { label: 'Metszéspontok', value: 'A és B pont' },
        { label: 'Tulajdonság', value: 'PA = PB (P a felezőmerőlegesen van)' }
      ],
      hint: 'A két pont kijelöl egy szakaszt, amit le tudunk felezni.'
    },
    {
      id: 'cq18',
      level: 2,
      prompt: 'Ha két különböző egyenes (a és b) mindegyike merőleges egy harmadik c egyenesre (a ⊥ c és b ⊥ c), mi a kapcsolat a és b között?',
      questionTypeBadge: 'Tétel',
      figure: <ConstructionsSolverFigure type="parallel_lines" />,
      options: [
        'a és b párhuzamosak egymással (a ∥ b).',
        'a és b merőlegesek egymásra.',
        'a és b 45°-os szöget zárnak be.',
        'a és b metszik egymást egy pontban.'
      ],
      correctAnswer: 'a és b párhuzamosak egymással (a ∥ b).',
      explanation:
        'A síkban két egyenes, amely ugyanarra a harmadik egyenesre merőleges, egymással párhuzamos: a ∥ b.',
      breakdown: [
        { label: 'Feltétel', value: 'a ⊥ c és b ⊥ c' },
        { label: 'Következmény', value: 'a ∥ b (párhuzamosak)' }
      ],
      hint: 'Gondolj a létra fokaira: mindkettő merőleges az oldalára.'
    },
    {
      id: 'cq19',
      level: 2,
      prompt: 'Egy egyenlő szárú háromszög szárai által bezárt csúcsszöge 70°. Hány fokos szögekre osztja a csúcsszög szögfelezője ezt a szöget?',
      questionTypeBadge: 'Számítás',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        '35° és 35°',
        '70° és 70°',
        '40° és 30°',
        '55° és 55°'
      ],
      correctAnswer: '35° és 35°',
      explanation:
        'A csúcsszög szögfelezője két egyenlő részre osztja a 70°-os szöget: 70° / 2 = 35°.',
      breakdown: [
        { label: 'Csúcsszög', value: '70°' },
        { label: 'Szögfelezés', value: '70° / 2 = 35°' }
      ],
      hint: 'Oszd el a 70°-ot 2-vel.'
    },
    {
      id: 'cq20',
      level: 2,
      prompt: 'Hogyan másolunk át pontosan egy AB szakaszt egy adott e egyenesre úgy, hogy P legyen a kezdőpontja?',
      questionTypeBadge: 'Szerkesztési lépés',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'Körzőnyílásba vesszük az AB távolságot, majd P középponttal körívet rajzolunk az e egyenesre.',
        'Vonalzóval lemérjük a millimétereket, és odarajzoljuk.',
        'Felezőmerőlegest szerkesztünk.',
        'Szögfelezést hajtunk végre.'
      ],
      correctAnswer: 'Körzőnyílásba vesszük az AB távolságot, majd P középponttal körívet rajzolunk az e egyenesre.',
      explanation:
        'A szakasz másolásának euklideszi módja: a körzővel felvesszük a szakasz hosszát (R = AB), majd a célpontból körívet húzva kimetszük a kívánt végpontot.',
      breakdown: [
        { label: 'Körzőnyílás', value: 'R = AB távolság' },
        { label: 'Felmérés', value: 'P középpontú körív az egyenesre' }
      ],
      hint: 'A körzővel tudunk távolságot átvinni.'
    },

    // ==========================================
    // 3. SZINT: MESTER ÉS ALKALMAZÁSOK (21 - 30. feladat)
    // ==========================================
    {
      id: 'cq21',
      level: 3,
      prompt: 'Hogyan szerkeszthető meg egy 120°-os szög körzővel és vonalzóval?',
      questionTypeBadge: 'Összetett szög',
      figure: <ConstructionsSolverFigure type="angle_60" />,
      options: [
        'A szög csúcsa körül a körív sugarával egymás után kétszer mérünk fel 60°-ot (2 × 60° = 120°).',
        'Három 30°-os szöget adunk össze.',
        'A 180°-os szöget elharmadoljuk szemmértékkel.',
        'Csak szögmérővel lehetséges.'
      ],
      correctAnswer: 'A szög csúcsa körül a körív sugarával egymás után kétszer mérünk fel 60°-ot (2 × 60° = 120°).',
      explanation:
        'Mivel 120° = 2 × 60°, a 60°-os körívet a metszéspontból még egyszer felmérve pontos 120°-os tompaszöget kapunk.',
      breakdown: [
        { label: 'Összefüggés', value: '120° = 2 × 60°' },
        { label: 'Szerkesztés', value: 'Két 60°-os ív egymás után' }
      ],
      hint: 'A 60° kétszerese.'
    },
    {
      id: 'cq22',
      level: 3,
      prompt: 'Hogyan szerkeszthető meg egy 75°-os szög?',
      questionTypeBadge: 'Összetett szög',
      figure: <ConstructionsSolverFigure type="angle_30" />,
      options: [
        'Megszerkesztünk egy 60°-os és egy 90°-os szöget, majd elfelezzük a köztük lévő 30°-os részt (60° + 15° = 75°).',
        'Összeadunk egy 45°-os és egy 20°-os szöget.',
        'Elfelezzük a 120°-os szöget.',
        'Két 45°-os szöget adunk össze.'
      ],
      correctAnswer: 'Megszerkesztünk egy 60°-os és egy 90°-os szöget, majd elfelezzük a köztük lévő 30°-os részt (60° + 15° = 75°).',
      explanation:
        'A 60° és 90° közötti tartomány 30°-os. Ennek szögfelezője 15°-ot ad hozzá a 60°-hoz: 60° + 15° = 75° (vagy (60° + 90°) / 2 = 75°).',
      breakdown: [
        { label: 'Középérték', value: '(60° + 90°) / 2 = 75°' },
        { label: 'Módszer', value: '60° és 90° szögfelezője' }
      ],
      hint: '75 pontosan félúton van 60 és 90 között.'
    },
    {
      id: 'cq23',
      level: 3,
      prompt: 'Egy háromszög két oldala a = 4 cm és b = 9 cm. Milyen határok közé kell esnie a harmadik c oldalnak, hogy megszerkeszthető legyen a háromszög?',
      questionTypeBadge: 'Egyenlőtlenség',
      figure: <ConstructionsSolverFigure type="triangle_sss" param1="c = ?" param2="b = 9 cm" />,
      options: [
        '5 cm < c < 13 cm',
        '4 cm < c < 9 cm',
        '0 cm < c < 13 cm',
        'c pontosan 13 cm kell legyen'
      ],
      correctAnswer: '5 cm < c < 13 cm',
      explanation:
        'A háromszög-egyenlőtlenség szerint a harmadik oldalnak nagyobbnak kell lennie a két oldal különbségénél (9 - 4 = 5 cm) és kisebbnek az összegüknél (9 + 4 = 13 cm): 5 cm < c < 13 cm.',
      breakdown: [
        { label: 'Alsó határ', value: 'b - a = 9 - 4 = 5 cm' },
        { label: 'Felső határ', value: 'b + a = 9 + 4 = 13 cm' },
        { label: 'Tartomány', value: '5 cm < c < 13 cm' }
      ],
      hint: 'A harmadik oldal a két oldal különbsége és összege közé kell hogy essen.'
    },
    {
      id: 'cq24',
      level: 3,
      prompt: 'Szerkeszthető-e háromszög a = 3 cm, b = 4 cm, c = 7 cm oldalakból?',
      questionTypeBadge: 'Határeset',
      figure: <ConstructionsSolverFigure type="triangle_impossible" />,
      options: [
        'Nem, mert 3 + 4 = 7, a körívek csak egy egyenesre esve érintik egymást (elfajuló eset, nem háromszög).',
        'Igen, mert 3 + 4 = 7 egyenlő a harmadik oldallal.',
        'Igen, derékszögű háromszög lesz.',
        'Csak akkor, ha tompaszögű.'
      ],
      correctAnswer: 'Nem, mert 3 + 4 = 7, a körívek csak egy egyenesre esve érintik egymást (elfajuló eset, nem háromszög).',
      explanation:
        'Ha a + b = c, akkor a harmadik C csúcs pontosan az AB szakaszra esik, így a három pont egy egyenesen van, nem alkot valódi háromszöget.',
      breakdown: [
        { label: 'Összeg', value: '3 + 4 = 7 cm' },
        { label: 'Feltétel', value: 'Szigorúan > kellene (nem ≥)' },
        { label: 'Eredmény', value: 'Nem háromszög (egyenes szakasz)' }
      ],
      hint: 'A háromszög-egyenlőtlenség szigorú: > (nagyobb), nem pedig = (egyenlő).'
    },
    {
      id: 'cq25',
      level: 3,
      prompt: 'Mit határoz meg egy háromszög három belső szögfelezőjének metszéspontja (K)?',
      questionTypeBadge: 'Nevezetes pont',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'A háromszög beírt körének középpontját (egyenlő távolságra van mindhárom oldaltól).',
        'A körülírt kör középpontját.',
        'A háromszög súlypontját.',
        'A magasságpontot.'
      ],
      correctAnswer: 'A háromszög beírt körének középpontját (egyenlő távolságra van mindhárom oldaltól).',
      explanation:
        'Mivel a szögfelezők pontjai egyenlő távolságra vannak a szögszáraktól, a három szögfelező közös metszéspontja mindhárom oldaltól azonos r távolságra van, ez a beírt kör középpontja.',
      breakdown: [
        { label: 'Szögfelezők', value: 'Oldalaktól való egyenlő távolság' },
        { label: 'Metszéspont', value: 'Beírt kör középpontja (K)' }
      ],
      hint: 'A szögfelező a szögszáraktól (vagyis az oldalaktól) van egyenlő távolságra.'
    },
    {
      id: 'cq26',
      level: 3,
      prompt: 'Hogyan szerkeszthető meg egy 135°-os tompaszög?',
      questionTypeBadge: 'Összetett szög',
      figure: <ConstructionsSolverFigure type="angle_45" />,
      options: [
        'Egy 90°-os derékszöghöz hozzászerkesztünk egy 45°-os szöget (90° + 45° = 135°).',
        'Két 60°-os szöget adunk össze.',
        'A 180°-os egyenesszögből elfelezünk egy 30°-os részt.',
        'Három 40°-os szöget adunk össze.'
      ],
      correctAnswer: 'Egy 90°-os derékszöghöz hozzászerkesztünk egy 45°-os szöget (90° + 45° = 135°).',
      explanation:
        '135° = 90° + 45° (vagy 180° - 45°). A derékszög felállítása után a szomszédos derékszöget elfelezzük (45°), így 90° + 45° = 135°.',
      breakdown: [
        { label: 'Összetétel', value: '90° + 45° = 135°' },
        { label: 'Alternatíva', value: '180° - 45° = 135°' }
      ],
      hint: '90 + 45 = 135.'
    },
    {
      id: 'cq27',
      level: 3,
      prompt: 'Egy egyenesen kívül fekvő P ponton keresztül hány olyan egyenes húzható a síkban, amely párhuzamos az adott egyenessel?',
      questionTypeBadge: 'Euklideszi axióma',
      figure: <ConstructionsSolverFigure type="parallel_lines" />,
      options: [
        'Pontosan egyetlen egyenes (Eukleidész párhuzamossági axiómája).',
        'Végtelen sok egyenes.',
        'Kettő egyenes.',
        'Egy sem húzható.'
      ],
      correctAnswer: 'Pontosan egyetlen egyenes (Eukleidész párhuzamossági axiómája).',
      explanation:
        'Eukleidész híres V. posztulátuma (párhuzamossági axióma) kimondja: egy adott egyeneshez egy rajta kívül fekvő ponton át pontosan egyetlen párhuzamos egyenes húzható a síkban.',
      breakdown: [
        { label: 'Axióma', value: 'Eukleidész V. posztulátuma' },
        { label: 'Darabszám', value: 'Pontosan 1' }
      ],
      hint: 'A síkgeometria egyik leghíresebb alaptétele: pontosan egy.'
    },
    {
      id: 'cq28',
      level: 3,
      prompt: 'Ha a szögfelező egy P pontjából merőlegeseket bocsátunk a szög két szárára (T₁ és T₂ talppontok), mit állíthatunk az OT₁P és OT₂P háromszögekről?',
      questionTypeBadge: 'Bizonyítás',
      figure: <ConstructionsSolverFigure type="angle_bisector" />,
      options: [
        'Egybevágók (közös az átfogójuk és egyenlők a hegyesszögeik).',
        'Csak hasonlóak, de különböző méretűek.',
        'Semmilyen kapcsolatban nincsenek.',
        'Területük különbözik.'
      ],
      correctAnswer: 'Egybevágók (közös az átfogójuk és egyenlők a hegyesszögeik).',
      explanation:
        'Mindkét háromszög derékszögű, átfogójuk a közös OP szakasz, és a szögfelező miatt a hegyesszögük is azonos (α/2). Ezért a derékszögű háromszögek egybevágósági esete miatt egybevágóak, amiből PT₁ = PT₂ következik.',
      breakdown: [
        { label: 'Közös elem', value: 'OP átfogó' },
        { label: 'Szögek', value: '90° és α/2' },
        { label: 'Eredmény', value: 'Egybevágóak ➔ PT₁ = PT₂' }
      ],
      hint: 'Derékszögű háromszögek közös átfogóval és egyenlő szögekkel.'
    },
    {
      id: 'cq29',
      level: 3,
      prompt: 'Miért szerkeszthető meg a szabályos hatszög úgy, hogy a körzővel a kör sugarát egymás után 6-szor felmérjük a körvonalra?',
      questionTypeBadge: 'Alkalmazás',
      figure: <ConstructionsSolverFigure type="angle_60" />,
      options: [
        'Mert a szabályos hatszög 6 darab egybevágó szabályos háromszögre bomlik, melyek oldala egyenlő a kör sugarával (R = a).',
        'Mert a kör kerülete mindig 6-szorosa a sugárnak.',
        'Mert a 360° / 6 = 50°.',
        'Csak véletlen egybeesés.'
      ],
      correctAnswer: 'Mert a szabályos hatszög 6 darab egybevágó szabályos háromszögre bomlik, melyek oldala egyenlő a kör sugarával (R = a).',
      explanation:
        'A szabályos hatszög középponti szögei 360° / 6 = 60°-osak. A 60°-os szárszögű egyenlő szárú háromszög szabályos háromszög, így az oldala megegyezik a kör sugarával (a = R).',
      breakdown: [
        { label: 'Középponti szög', value: '360° / 6 = 60°' },
        { label: 'Háromszögek', value: 'Szabályos háromszögek (a = R)' }
      ],
      hint: 'A szabályos hatszöget a középpontjából 6 szabályos háromszögre tudjuk vágni.'
    },
    {
      id: 'cq30',
      level: 3,
      prompt: 'Egy háromszög szerkesztéséhez megadtuk a három szögét: 40°, 60°, 80°. Egyértelműen meghatározza-e ez a háromszöget?',
      questionTypeBadge: 'Szerkesztési elmélet',
      figure: <ConstructionsSolverFigure type="triangle_sas" />,
      options: [
        'Nem, mert végtelen sok hasonló, különböző méretű háromszög létezik ezekkel a szögekkel (csak az alakot határozza meg, a méretet nem).',
        'Igen, mert a szögek összege 180°.',
        'Igen, minden háromszög egyértelmű a 3 szögéből.',
        'Nem, mert nem lehet háromszöget szerkeszteni 3 szögből.'
      ],
      correctAnswer: 'Nem, mert végtelen sok hasonló, különböző méretű háromszög létezik ezekkel a szögekkel (csak az alakot határozza meg, a méretet nem).',
      explanation:
        'A 3 szög (szszsz) csak a háromszög alakját határozza meg (hasonlóság), de a méretét nem: kicsi és óriási háromszög is szerkeszthető ugyanezekkel a szögekkel. Az egyértelmű szerkesztéshez legalább egy oldalhossz megadása szükséges!',
      breakdown: [
        { label: '3 szög ismerete', value: 'Csak alakot rögzít (hasonlóság)' },
        { label: 'Hiányzó adat', value: 'Legalább 1 oldalhossz szükséges a mérethez' }
      ],
      hint: 'Kicsinyíteni és nagyítani lehet egy háromszöget úgy, hogy a szögei nem változnak.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs-tools',
      title: 'Euklideszi alapeszközök',
      badge: 'Alapok',
      icon: <Compass className="w-4 h-4 text-indigo-500" />,
      content: (
        <div className="space-y-2 text-xs">
          <div className="p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-medium">
            • <strong>Körző:</strong> Körívek rajzolása, távolságok pontos átvitele/másolása.<br />
            • <strong>Egyélű vonalzó:</strong> Két pont összekötése, egyenesek húzása (beosztás nélkül).
          </div>
        </div>
      )
    },
    {
      id: 'cs-bisector',
      title: 'Szögfelező (f_α) szerkesztése és tétele',
      badge: 'f_α',
      icon: <Target className="w-4 h-4 text-indigo-500" />,
      content: (
        <div className="space-y-2 text-xs">
          <div className="p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-medium">
            • <strong>Szögfelezés:</strong> α₁ = α₂ = α / 2<br />
            • <strong>Ponthalmaz tétel:</strong> A szögfelező bármely P pontja egyenlő távolságra van a száraktól: <strong>d(P, a) = d(P, b)</strong>
          </div>
        </div>
      )
    },
    {
      id: 'cs-angles',
      title: 'Nevezetes szögek szerkesztése',
      badge: 'Szögek',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      content: (
        <div className="space-y-1.5 text-xs">
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <strong>60°:</strong> Szabályos △ (R = a)
            </div>
            <div className="p-1.5 rounded-md bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <strong>30°:</strong> 60° szögfelezése
            </div>
            <div className="p-1.5 rounded-md bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
              <strong>90°:</strong> Merőleges egyenes
            </div>
            <div className="p-1.5 rounded-md bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <strong>45°:</strong> 90° szögfelezése
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cs-triangles',
      title: 'Háromszög-egyenlőtlenség',
      badge: 'a + b > c',
      icon: <Calculator className="w-4 h-4 text-rose-500" />,
      content: (
        <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200">
          <strong>Szerkeszthetőség feltétele:</strong><br />
          Bármely két oldal összege nagyobb kell legyen a harmadiknál: <strong>a + b &gt; c</strong>.<br />
          <span className="text-[11px] text-slate-600 dark:text-slate-300">
            Harmadik oldal tartománya: |a - b| &lt; c &lt; a + b
          </span>
        </div>
      )
    }
  ];

  return (
    <QuizTemplate
      title="Szerkesztések Kvíz"
      subtitle="Körző és vonalzó, szögfelezés, merőleges és párhuzamos, nevezetes szögek és háromszögek"
      badge="📐 6. Osztály • III. Geometria • 5. Fejezet"
      topicId="g6-constructions-quiz"
      themeColor="indigo"
      questions={questions}
      cheatSheetTitle="Szerkesztések Képtár & Szabálytár"
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <ConstructionsMatcher {...props} />}
      renderSorter={(props) => <ConstructionsSorter {...props} />}
      matcherComponent={
        <ConstructionsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ConstructionsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
