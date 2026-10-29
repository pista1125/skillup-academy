import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PlaneGeometryMatcher } from './PlaneGeometryMatcher';
import { PlaneGeometrySorter } from './PlaneGeometrySorter';
import {
  GeometricPrimitivesSvg,
  AngleTypesSvg,
  AdjacentAndVerticalAnglesSvg,
  ParallelTransversalAnglesSvg,
  ComplementaryAnglesSvg
} from './PlaneGeometryFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale } from 'lucide-react';

interface PlaneGeometryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szögfajták (Könnyű)',
    subtitle: 'Pont, egyenes, félegyenes, szakasz, szögek osztályozása és egyszerű szögpárok.',
    range: '1 - 10. feladat',
    focus: 'Síkgeometriai Alapismeretek',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Geometriai Alapfogalom',
        question: 'Az alábbiak közül melyik geometriai alakzatnak VAN kezdőpontja, de másik irányban a végtelenbe tart?',
        figure: <GeometricPrimitivesSvg size={200} />,
        options: ['Félegyenes', 'Egyenes', 'Szakasz', 'Sík'],
        correctAnswer: 0,
        hint: 'A pontból kiinduló, egy irányban korlátlan egyenesrészt keressük.',
        explanation: 'A félegyenesnek van egy rögzített kezdőpontja, és az egyik irányban végtelen. Ezzel szemben a szakasz mindkét irányban korlátos, az egyenes mindkét irányban végtelen.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Szögfajta Meghatározása',
        question: 'Milyen szög a 75°-os szög?',
        figure: <AngleTypesSvg size={200} />,
        options: ['Hegyesszög', 'Derékszög', 'Tompaszög', 'Homorúszög'],
        correctAnswer: 0,
        hint: 'A 0° és 90° közötti szögek kategóriája.',
        explanation: 'Mivel 0° < 75° < 90°, a 75°-os szög hegyesszög.'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Derékszög Fogalma',
        question: 'Hány fokos a derékszög?',
        options: ['90°', '45°', '180°', '360°'],
        correctAnswer: 0,
        hint: 'A két merőleges egyenes által bezárt szög nagysága (magyar jelölése negyedkörív ponttal).',
        explanation: 'A derékszög pontosan 90°-os szög, szárai egymásra merőlegesek.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Tompaszög Tartománya',
        question: 'Milyen szög a 140°-os szög?',
        options: ['Tompaszög', 'Hegyesszög', 'Homorúszög', 'Egyenesszög'],
        correctAnswer: 0,
        hint: '90° és 180° közé esik.',
        explanation: 'Mivel 90° < 140° < 180°, a 140°-os szög tompaszög.'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Homorúszög Tartománya',
        question: 'Milyen szög a 230°-os szög?',
        options: ['Homorúszög', 'Tompaszög', 'Egyenesszög', 'Teljesszög'],
        correctAnswer: 0,
        hint: 'Nagyobb 180°-nál, de kisebb 360°-nál.',
        explanation: 'A 180° és 360° közé eső szögeket homorúszögnek nevezzük.'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Pótszög Számítás',
        question: 'Mennyi a 32°-os szög pótszöge?',
        figure: <ComplementaryAnglesSvg size={180} />,
        options: ['58°', '148°', '68°', '48°'],
        correctAnswer: 0,
        hint: 'A pótszögek összege 90°. Vond ki 90-ből a 32-t!',
        explanation: 'A pótszög 90°-ra egészíti ki a szöget: 90° - 32° = 58°.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Mellékszög Számítás',
        question: 'Mennyi a 70°-os szög mellékszöge?',
        figure: <AdjacentAndVerticalAnglesSvg size={180} />,
        options: ['110°', '20°', '120°', '290°'],
        correctAnswer: 0,
        hint: 'A mellékszögek összege 180°. Számold ki: 180° - 70°!',
        explanation: 'A mellékszögek egy egyenest alkotnak, összegük 180°, így: 180° - 70° = 110°.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Csúcsszögek Tulajdonsága',
        question: 'Két metsző egyenes által alkotott egyik szög 55°. Mennyi a vele szemközti csúcsszög nagysága?',
        figure: <AdjacentAndVerticalAnglesSvg size={180} />,
        options: ['55°', '125°', '35°', '180°'],
        correctAnswer: 0,
        hint: 'A szemközti csúcsszögek szárai egymás meghosszabbításai.',
        explanation: 'A csúcsszögek tétel szerint mindig egyenlő nagyságúak, ezért a szemközti csúcsszög is pontosan 55°.'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Illeszkedési Axióma',
        question: 'Hány egyenes illeszthető a síkban két különböző adott pontra?',
        options: ['Pontosan 1', 'Végtelen sok', '2', '0'],
        correctAnswer: 0,
        hint: 'Gondolj a vonalzó használatára két pont között.',
        explanation: 'A síkgeometria alapaxiómája szerint bármely két különböző pontra pontosan egyetlen egyenes illeszkedik.'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Egyenesszög Fogalma',
        question: 'Hány fokos az egyenesszög?',
        options: ['180°', '90°', '360°', '0°'],
        correctAnswer: 0,
        hint: 'A szög szárai egyetlen egyenest alkotnak.',
        explanation: 'Az egyenesszög nagysága pontosan 180°, szárai egymás ellentétes meghosszabbításai.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szögpárok és Számítások (Közepes)',
    subtitle: 'Mellékszögek, csúcsszögek, pótszögek és párhuzamos szárú szögek számításos feladatai.',
    range: '11 - 20. feladat',
    focus: 'Szögkapcsolatok és Egyenletek',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Mellékszögek és Arányok',
        question: 'Két szomszédos mellékszög aránya 1 : 3. Mekkora a kisebbik szög?',
        options: ['45°', '30°', '60°', '36°'],
        correctAnswer: 0,
        hint: 'Legyen a két szög x és 3x. Összegük x + 3x = 180°.',
        explanation: 'Mivel mellékszögek: x + 3x = 180° ⟹ 4x = 180° ⟹ x = 45°. A kisebb szög 45°, a nagyobb 135°.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Egyenlő Pótszögek',
        question: 'Egy szög pontosan megegyezik a saját pótszögével. Hány fokos a szög?',
        options: ['45°', '90°', '60°', '30°'],
        correctAnswer: 0,
        hint: 'α + α = 90°',
        explanation: 'Ha egy szög egyenlő a pótszögével: α + α = 90° ⟹ 2α = 90° ⟹ α = 45°.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Különbséges Mellékszög',
        question: 'Egy szög 40°-kal nagyobb a mellékszögénél. Mekkora a kisebbik szög?',
        options: ['70°', '110°', '60°', '80°'],
        correctAnswer: 0,
        hint: 'Legyen a kisebb x, a nagyobb x + 40°. Összegük 180°.',
        explanation: 'x + (x + 40°) = 180° ⟹ 2x + 40° = 180° ⟹ 2x = 140° ⟹ x = 70°. A nagyobbik szög 110°.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Váltószög Számítás (Z-szög)',
        question: 'Két párhuzamos egyenest metsz egy harmadik egyenes. Az egyik belső szög 54°. Mennyi a hozzá tartozó belső váltószög?',
        figure: <ParallelTransversalAnglesSvg size={200} />,
        options: ['54°', '126°', '36°', '90°'],
        correctAnswer: 0,
        hint: 'Párhuzamos egyenesek esetén a Z-alakú váltószögek egyenlőek.',
        explanation: 'Mivel az egyenesek párhuzamosak, a belső váltószögek nagysága megegyezik, így a keresett szög is 54°.'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Társszögek Tulajdonsága (C-szög)',
        question: 'Két párhuzamos egyenes metszésekor az egyik belső társszög 115°. Mennyi a másik társszög?',
        figure: <ParallelTransversalAnglesSvg size={200} />,
        options: ['65°', '115°', '25°', '75°'],
        correctAnswer: 0,
        hint: 'A párhuzamosok közötti azonos oldali belső társszögek összege 180°.',
        explanation: 'Párhuzamosok esetén a társszögek összege 180°: 180° - 115° = 65°.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Mellékszög Szorzata',
        question: 'Egy szög mellékszöge 5-ször akkora, mint maga a szög. Hány fokos a nagyobbik szög?',
        options: ['150°', '30°', '120°', '144°'],
        correctAnswer: 0,
        hint: 'x + 5x = 180° ⟹ 6x = 180° ⟹ x = 30°.',
        explanation: 'x + 5x = 180° ⟹ 6x = 180° ⟹ x = 30°. A nagyobbik szög a mellékszöge: 5 · 30° = 150°.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Derékszög Harmadolása',
        question: 'Egy derékszöget egy félegyenes két szögre bont úgy, hogy az egyik szög kétszerese a másiknak. Mekkora a kisebbik szög?',
        figure: <ComplementaryAnglesSvg size={180} />,
        options: ['30°', '60°', '45°', '20°'],
        correctAnswer: 0,
        hint: 'Pótszögek, x + 2x = 90°.',
        explanation: 'x + 2x = 90° ⟹ 3x = 90° ⟹ x = 30°. A nagyobb szög 60°.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Metsző Egyenesek Összege',
        question: 'Két egyenes metszésekor keletkező négy szög közül három szög összege 295°. Mekkora a negyedik szög?',
        figure: <AdjacentAndVerticalAnglesSvg size={180} />,
        options: ['65°', '115°', '55°', '85°'],
        correctAnswer: 0,
        hint: 'A csúcs körüli 4 szög együtt egy teljesszöget (360°) ad ki.',
        explanation: 'A teljes szög 360°, ezért a negyedik szög: 360° - 295° = 65°.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Csúcsszögek Összege',
        question: 'Két metsző egyenes által bezárt két szemközti csúcsszög összege 130°. Mekkora a másik két csúcsszög egyenként?',
        options: ['115°', '65°', '130°', '50°'],
        correctAnswer: 0,
        hint: 'A két csúcsszög egyenlő, így egyenként 130° / 2 = 65°. Mennyi a 65° mellékszöge?',
        explanation: 'Mivel a két csúcsszög egyenlő: 2α = 130° ⟹ α = 65°. A szomszédos szög ennek mellékszöge: 180° - 65° = 115°.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Egyállású Szögek (F-szög)',
        question: 'Párhuzamos e és f egyeneseket metsz egy m egyenes. Az egyik szög 68°. Mennyi a vele egyállású szög nagysága?',
        figure: <ParallelTransversalAnglesSvg size={200} />,
        options: ['68°', '112°', '22°', '90°'],
        correctAnswer: 0,
        hint: 'Az egyállású szögek párhuzamos eltolással fedésbe hozhatók.',
        explanation: 'Párhuzamos szárak esetén az egyállású szögek egyenlőek, így az egyállású szög is 68°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Geometriai Szögfeladatok (Nehéz)',
    subtitle: 'Szögfüggvények nélküli összetett egyenletek, párhuzamossági tételek és érettségi típusfeladatok.',
    range: '21 - 30. feladat',
    focus: 'Magasabb Szintű Geometriai Logika',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Pótszög és Mellékszög kapcsolata',
        question: 'Egy szög mellékszöge négyszer akkora, mint a pótszöge. Mekkora maga a szög?',
        options: ['60°', '45°', '30°', '75°'],
        correctAnswer: 0,
        hint: 'Írd fel egyenlettel: 180° - α = 4 · (90° - α).',
        explanation: '180° - α = 4(90° - α) ⟹ 180° - α = 360° - 4α ⟹ 3α = 180° ⟹ α = 60°. Ellenőrzés: pótszöge 30°, mellékszöge 120° (120 = 4 · 30).'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Társszögek Aránya',
        question: 'Két párhuzamos egyenest metsző egyenes belső társszögeinek aránya 2 : 7. Mekkora a nagyobbik társszög?',
        options: ['140°', '40°', '120°', '160°'],
        correctAnswer: 0,
        hint: '2x + 7x = 180° ⟹ 9x = 180°.',
        explanation: '2x + 7x = 180° ⟹ 9x = 180° ⟹ x = 20°. A nagyobbik szög 7 · 20° = 140°.'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Pótszög és Mellékszög Különbsége',
        question: 'Mennyi a különbség bármely hegyesszög mellékszöge és pótszöge között?',
        options: ['Mindig pontosan 90°', 'Függ a szög nagyságától', 'Mindig 45°', 'Mindig 180°'],
        correctAnswer: 0,
        hint: 'Számold ki: (180° - α) - (90° - α).',
        explanation: '(180° - α) - (90° - α) = 180° - α - 90° + α = 90°. A két érték különbsége univerzálisan mindig 90° (derékszög).'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Óramutatók Szöge',
        question: 'Hány fokos szöget zár be az óra kismutatója és nagymutatója pontosan 3 óra 30 perckor?',
        options: ['75°', '90°', '85°', '70°'],
        correctAnswer: 0,
        hint: 'A nagymutató a 6-oson (180°) áll. A kismutató félúton van a 3-as (90°) és a 4-es (120°) között.',
        explanation: 'Egy óra a számlapon 30°. Fél óra alatt a kismutató 15°-ot halad: 90° + 15° = 105°. A nagymutató 180°-nál van. A bezárt szög: 180° - 105° = 75°.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Párhuzamos Törtvonal (Zick-Zack)',
        question: 'Két párhuzamos egyenes (e ∥ f) között egy "V" alakú törtvonal szárai a párhuzamosokkal 35°-os és 45°-os szöget zárnak be. Mekkora a törtvonal csúcsánál lévő belső szög?',
        options: ['80°', '100°', '10°', '90°'],
        correctAnswer: 0,
        hint: 'Húzz a törésponton keresztül egy segédpárhuzamost e-vel és f-fel! Ekkor a szög két váltószög összege lesz.',
        explanation: 'A törésponton átmenő segédpárhuzamos a szöget két váltószögre bontja: 35° és 45°. A teljes belső szög: 35° + 45° = 80°.'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Párhuzamos Szárú Szögek Általános Tétele',
        question: 'Melyik állítás IGAZ két olyan szögre, amelyek szárai páronként párhuzamosak egymással?',
        options: [
          'Vagy egyenlő nagyságúak, vagy összegük 180°',
          'Minden esetben egyenlő nagyságúak',
          'Minden esetben derékszöget alkotnak',
          'Semmilyen összefüggés nincs közöttük'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az egyállású szögekre és a társszögekre.',
        explanation: 'Ha két szög szárai páronként párhuzamosak, akkor vagy azonos irányúak (ekkor egyenlők), vagy az egyik ellentétes (ekkor kiegészítő szögek, azaz összegük 180°).'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Mellékszögből Pótszög',
        question: 'Egy szög mellékszöge 138°. Mekkora ennek az eredeti szögnek a pótszöge?',
        options: ['48°', '42°', '52°', '138°'],
        correctAnswer: 0,
        hint: 'Először számold ki az eredeti szöget: α = 180° - 138°. Utána a pótszögét: 90° - α.',
        explanation: 'Az eredeti szög: 180° - 138° = 42°. Ennek a pótszöge: 90° - 42° = 48°.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Csúcsszögek és Metsző Egyenesek',
        question: 'Három egyenes metszi egymást egy közös O pontban. Összesen hány szög keletkezik a pont körül a szomszédos félegyenesek között?',
        options: ['6', '8', '3', '12'],
        correctAnswer: 0,
        hint: '3 egyenes mindegyike 2-2 félegyenest határoz meg az O pontból.',
        explanation: '3 egyenes a síkot az O metszéspontból 6 darab félegyenesre osztja fel, amelyek a körbe 6 egymáshoz csatlakozó szöget alkotnak.'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Háromszög Külső Szöge',
        question: 'Egy háromszög egyik belső szöge 50°. Mekkora a hozzá tartozó külső szög?',
        options: ['130°', '40°', '140°', '310°'],
        correctAnswer: 0,
        hint: 'A háromszög belső szöge és a hozzá tartozó külső szög mindig mellékszögek.',
        explanation: 'A külső szög és a belső szög egy egyenesen fekszik, tehát mellékszögek: 180° - 50° = 130°.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Szögfelezők Szöge',
        question: 'Mekkora szöget zár be két szomszédos mellékszög szögfelezője egymással?',
        options: ['Mindig pontosan 90°', 'Mindig 45°', 'Függ a szögek nagyságától', 'Mindig 180°'],
        correctAnswer: 0,
        hint: 'Ha a két szög α és β (α + β = 180°), a szögfelezők közötti szög α/2 + β/2.',
        explanation: 'Mivel α + β = 180°, a felezők közötti szög: α/2 + β/2 = (α + β)/2 = 180°/2 = 90°. Tehát két mellékszög szögfelezője MINDIG derékszöget zár be egymással!'
      }
    ]
  }
};

export const PlaneGeometryQuiz: React.FC<PlaneGeometryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="A sík geometriája Kvíz"
      subtitle="30 válogatott feladat 3 szinten: alapfogalmak, szögfajták, nevezetes szögpárok és egyenletek"
      levels={quizLevels}
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-sik-quiz"
      topicTitle="A sík geometriája"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      cheatSheetTitle="Geometriai Segédlet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a szögeket, szögfajtákat és mellékszögeket!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <PlaneGeometryMatcher
              key={`plane-geometry-matcher-${level}`}
              level={level}
              currentLevel={level}
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
          subtitle: 'Kategorizáld a szögeket és geometriai alakzatokat!',
          badgeText: '10-12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <PlaneGeometrySorter
              key={`plane-geometry-sorter-${level}`}
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="space-y-4">
          <CheatSheetCard
            title="Szögfajták összefoglalója"
            icon={<Layers className="w-5 h-5 text-blue-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Hegyesszög:</strong> 0° &lt; α &lt; 90°</li>
              <li><strong>Derékszög:</strong> α = 90° (merőleges szárak, negyedkörív ponttal)</li>
              <li><strong>Tompaszög:</strong> 90° &lt; α &lt; 180°</li>
              <li><strong>Egyenesszög:</strong> α = 180° (szárai egy egyenest alkotnak)</li>
              <li><strong>Homorúszög:</strong> 180° &lt; α &lt; 360°</li>
              <li><strong>Teljesszög:</strong> α = 360°</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Szögpárok szabályai"
            icon={<Scale className="w-5 h-5 text-amber-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Csúcsszögek:</strong> α = α' (mindig egyenlők)</li>
              <li><strong>Mellékszögek:</strong> α + β = 180° (összegük egyenesszög)</li>
              <li><strong>Pótszögek:</strong> α + β = 90° (összegük derékszög)</li>
              <li><strong>Váltószögek (Z):</strong> egyenlők, ha e ∥ f</li>
              <li><strong>Egyállású szögek (F):</strong> egyenlők, ha e ∥ f</li>
              <li><strong>Társszögek (C):</strong> összegük 180°, ha e ∥ f</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};
