import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { VectorMatcher } from './VectorMatcher';
import { VectorSorter } from './VectorSorter';
import {
  VectorBasicsSvg,
  VectorAdditionSvg,
  TranslationSvg,
  ScalarMultiplicationSvg
} from './VectorFigures';
import { MoveRight, Split, Maximize2, Sparkles, Plus, Minus, Scale, CheckCircle2 } from 'lucide-react';

interface VectorQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Vektor Alapfogalmak és Jellemzők (Könnyű)',
    subtitle: 'Vektor mint irányított szakasz, 3 meghatározó adat, koordináták és hosszúság.',
    range: '1 - 10. feladat',
    focus: 'Vektorok alapvető tulajdonságai',
    questions: [
      {
        id: 'vq1-1',
        questionTypeBadge: 'Vektor Definíciója',
        question: 'Mi a vektor matematikai definíciója a geometriában?',
        options: ['Irányított szakasz', 'Egy végtelen hosszú egyenes', 'Egyetlen pont a koordinátarácson', 'Egy pozitív valós szám'],
        correctAnswer: 0,
        hint: 'A vektornak van kezdőpontja és végpontja, amerre mutat.',
        explanation: 'A vektor egy irányított szakasz, amelyet a kezdő- és végpontja, vagy nagysága, állása és iránya határoz meg.'
      },
      {
        id: 'vq1-2',
        questionTypeBadge: 'Három Jellemző',
        question: 'Melyik három adat határozza meg egyértelműen a sík bármely vektorát?',
        figure: <VectorBasicsSvg size={220} />,
        options: [
          'Hossz (nagyság), állás és irány',
          'Kezdőpont, végpont és szín',
          'Meredekség, görbület és forgásszög',
          'Csak a koordinátáinak összege'
        ],
        correctAnswer: 0,
        hint: 'Hordozó egyenes párhuzamossága, nyíl iránya és a szakasz hossza.',
        explanation: 'Egy vektort a hossza (|v| ≥ 0), az állása (párhuzamosság) és az iránya (nyíl mutatása) egyértelműen meghatároz.'
      },
      {
        id: 'vq1-3',
        questionTypeBadge: 'Nullvektor',
        question: 'Melyik állítás IGAZ a nullvektorra (0)?',
        options: [
          'Hossza 0, kezdő- és végpontja egybeesik, iránya tetszőleges',
          'Hossza 1, iránya mindig felfelé mutat',
          'Nem létezik nullvektor a geometriában',
          'Hossza negatív szám'
        ],
        correctAnswer: 0,
        hint: 'Egyetlen pontként ábrázolható a síkban.',
        explanation: 'A nullvektor hossza pontosan 0, kezdő- és végpontja azonos, iránya pedig határozatlan (tetszőleges).'
      },
      {
        id: 'vq1-4',
        questionTypeBadge: 'Ellentett Vektor',
        question: 'Hogyan viszonyul a v vektor ellentettje (−v) az eredeti v vektorhoz?',
        options: [
          'Hossza és állása azonos, de iránya pontosan ellentétes',
          'Merőleges rá és kétszer olyan hosszú',
          'Hossza reciprokára változik',
          'Minden tulajdonsága megegyezik vele'
        ],
        correctAnswer: 0,
        hint: 'Összegük a nullvektor: v + (−v) = 0.',
        explanation: 'Az ellentett vektor hossza és állása megegyezik az eredetivel, de a nyíl az ellenkező irányba mutat.'
      },
      {
        id: 'vq1-5',
        questionTypeBadge: 'Eltolás Fixpontja',
        question: 'Hány fixpontja van egy eltolásnak a síkban, ha az eltolásvektor nem a nullvektor (v ≠ 0)?',
        figure: <TranslationSvg size={220} />,
        options: ['Egyetlen fixpontja sincs (0)', 'Pontosan 1 fixpontja van', '2 fixpontja van', 'Végtelen sok'],
        correctAnswer: 0,
        hint: 'Minden pont elmozdul a v vektorral, így egyetlen pont sem maradhat helyben.',
        explanation: 'Ha v ≠ 0, az eltolás minden pontot pontosan |v| távolságra visz el, így a síknak nincs egyetlen fixpontja sem.'
      },
      {
        id: 'vq1-6',
        questionTypeBadge: 'Egyenes Képe Eltolásnál',
        question: 'Milyen helyzetű egy e egyenes képe (e\') a v vektorral történő eltolás után?',
        options: [
          'Párhuzamos az eredeti egyenessel (e\' || e)',
          'Merőleges az eredeti egyenesre',
          'Mindig metszi az eredeti egyenest',
          'Kör alakúvá válik'
        ],
        correctAnswer: 0,
        hint: 'Az eltolás az egyenes minden pontját azonos irányba és távolságra viszi.',
        explanation: 'Az eltolás párhuzamosságtartó: bármely egyenes képe egy vele párhuzamos egyenes (vagy önmaga, ha párhuzamos v-vel).'
      },
      {
        id: 'vq1-7',
        questionTypeBadge: 'Vektor Hossza',
        question: 'Mennyi a v(3; 4) vektor hossza (|v|)?',
        options: ['5', '7', '12', '√7'],
        correctAnswer: 0,
        hint: 'Használd a Pitagorasz-tételt: |v| = √(vx² + vy²).',
        explanation: '|v| = √(3² + 4²) = √(9 + 16) = √25 = 5.'
      },
      {
        id: 'vq1-8',
        questionTypeBadge: 'Vektor Kezdő- és Végpontból',
        question: 'Egy vektor kezdőpontja A(2; 1), végpontja B(5; 5). Mik az AB vektor koordinátái?',
        options: ['(3; 4)', '(7; 6)', '(−3; −4)', '(2,5; 3)'],
        correctAnswer: 0,
        hint: 'A végpontból kell kivonni a kezdőpontot: B − A.',
        explanation: 'AB = (xB − xA; yB − yA) = (5 − 2; 5 − 1) = (3; 4).'
      },
      {
        id: 'vq1-9',
        questionTypeBadge: 'Körüljárási Irány',
        question: 'Hogyan változik egy sokszög körüljárási iránya az eltolás során?',
        options: [
          'Megmarad (nem változik)',
          'Megfordul (ellenkezőjére vált)',
          '90°-kal elfordul',
          'Függ az eltolásvektor hosszától'
        ],
        correctAnswer: 0,
        hint: 'Az eltolás egy egyenes vonalú elcsúsztatás forgatás vagy tükrözés nélkül.',
        explanation: 'Az eltolás egybevágósági transzformáció, amely megőrzi az alakzatok körüljárási irányát.'
      },
      {
        id: 'vq1-10',
        questionTypeBadge: 'Egyenlő Vektorok',
        question: 'Mikor mondjuk két síkbeli vektorról (a és b), hogy egyenlők egymással?',
        options: [
          'Ha hosszuk, állásuk és irányuk is megegyezik',
          'Ha csak a hosszuk egyenlő',
          'Ha azonos pontból indulnak ki',
          'Ha merőlegesek egymásra'
        ],
        correctAnswer: 0,
        hint: 'A szabad vektorok párhuzamos eltolással fedésbe hozhatók.',
        explanation: 'Két vektor egyenlő, ha önmagukkal párhuzamosan eltolva teljesen egybeesnek: hosszuk, állásuk és irányuk is azonos.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Vektorműveletek és Koordináták (Közepes)',
    subtitle: 'Háromszög- és paralelogramma-szabály, összeadás, kivonás és skalárral szorzás koordinátákkal.',
    range: '11 - 20. feladat',
    focus: 'Műveletek végrehajtása és képpontok számítása',
    questions: [
      {
        id: 'vq2-1',
        questionTypeBadge: 'Háromszög-szabály',
        question: 'Mi az AB és BC vektorok összege (AB + BC) a háromszög-szabály szerint?',
        figure: <VectorAdditionSvg size={220} />,
        options: ['AC', 'CA', 'BA', '0'],
        correctAnswer: 0,
        hint: 'A láncszabály szerint az első kezdőpontjából a második végpontjába jutunk.',
        explanation: 'A háromszög-szabály: AB + BC = AC. Ha A-ból B-be, majd B-ből C-be megyünk, az elmozdulás A-ból C-be mutat.'
      },
      {
        id: 'vq2-2',
        questionTypeBadge: 'Koordinátás Összeadás',
        question: 'Ha a(3; −2) és b(1; 5), mik az a + b összegvektor koordinátái?',
        options: ['(4; 3)', '(2; −7)', '(3; −10)', '(4; 7)'],
        correctAnswer: 0,
        hint: 'Add össze a megfelelő koordinátákat külön-külön: (a₁ + b₁; a₂ + b₂).',
        explanation: 'a + b = (3 + 1; −2 + 5) = (4; 3).'
      },
      {
        id: 'vq2-3',
        questionTypeBadge: 'Koordinátás Kivonás',
        question: 'Ha a(5; 4) és b(2; 7), mik az a − b különbségvektor koordinátái?',
        options: ['(3; −3)', '(7; 11)', '(−3; 3)', '(3; 3)'],
        correctAnswer: 0,
        hint: 'Vond ki a megfelelő koordinátákat: (a₁ − b₁; a₂ − b₂).',
        explanation: 'a − b = (5 − 2; 4 − 7) = (3; −3).'
      },
      {
        id: 'vq2-4',
        questionTypeBadge: 'Skalárral Szorzás',
        question: 'Mennyi a −3 · v vektor, ha v = (2; −4)?',
        figure: <ScalarMultiplicationSvg size={220} />,
        options: ['(−6; 12)', '(6; −12)', '(−6; −12)', '(−1; 1)'],
        correctAnswer: 0,
        hint: 'Szorozd meg mindkét koordinátát (−3)-mal!',
        explanation: '−3 · (2; −4) = (−3 · 2; −3 · (−4)) = (−6; 12).'
      },
      {
        id: 'vq2-5',
        questionTypeBadge: 'Pont Eltolása',
        question: 'A P(2; 5) pontot eltoljuk a v(3; −4) vektorral. Mik lesznek a P\' képpont koordinátái?',
        options: ['(5; 1)', '(−1; 9)', '(6; −20)', '(5; 9)'],
        correctAnswer: 0,
        hint: 'Add hozzá az eltolásvektort a pont koordinátáihoz: P\' = P + v.',
        explanation: 'P\' = (2 + 3; 5 + (−4)) = (5; 1).'
      },
      {
        id: 'vq2-6',
        questionTypeBadge: 'Eltolásvektor Meghatározása',
        question: 'A P(3; 2) pont képe egy eltolásnál a P\'(8; −1) pont. Mi volt a v eltolásvektor?',
        options: ['(5; −3)', '(11; 1)', '(−5; 3)', '(5; 1)'],
        correctAnswer: 0,
        hint: 'v = PP\' = P\' − P.',
        explanation: 'v = (8 − 3; −1 − 2) = (5; −3).'
      },
      {
        id: 'vq2-7',
        questionTypeBadge: 'Paralelogramma Átlója',
        question: 'Ha az a és b vektorok egy közös O pontból indulnak ki, melyik vektor felel meg a kifeszített paralelogramma O-ból induló átlójának?',
        options: ['a + b', 'a − b', 'b − a', '2a'],
        correctAnswer: 0,
        hint: 'Ez a paralelogramma-szabály lényege.',
        explanation: 'A közös kezdőpontból induló főátló az a + b összegvektor.'
      },
      {
        id: 'vq2-8',
        questionTypeBadge: 'Szakasz Felezőpontja',
        question: 'Ha A(2; 4) és B(6; 8) pontok, mik a felezőpont (F) koordinátái helyvektorokkal?',
        options: ['(4; 6)', '(8; 12)', '(2; 2)', '(3; 5)'],
        correctAnswer: 0,
        hint: 'F = (A + B) / 2.',
        explanation: 'xF = (2 + 6) / 2 = 4, yF = (4 + 8) / 2 = 6, tehát F(4; 6).'
      },
      {
        id: 'vq2-9',
        questionTypeBadge: 'Negatív Számmal Szorzás',
        question: 'Mit csinál egy vektorral a (−1)-gyel való szorzás?',
        options: [
          'Ellentett vektorrá alakítja (iránya megfordul, hossza változatlan)',
          'Nullvektorrá teszi',
          'Merőlegesre fordítja',
          'Megduplázza a hosszát'
        ],
        correctAnswer: 0,
        hint: '−1 · v = −v.',
        explanation: 'A (−1)-gyel való szorzás az ellentett vektort állítja elő: hossza és állása ugyanaz, iránya megfordul.'
      },
      {
        id: 'vq2-10',
        questionTypeBadge: 'Összeg Hossza Adott Irányban',
        question: 'Két azonos állású és azonos irányú vektor hossza |a| = 4 és |b| = 3. Mennyi az a + b összegvektor hossza?',
        options: ['7', '5', '1', '12'],
        correctAnswer: 0,
        hint: 'Mivel azonos irányba mutatnak, a hosszaik egyszerűen összeadódnak.',
        explanation: 'Azonos irányú vektorok esetén |a + b| = |a| + |b| = 4 + 3 = 7.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Vektoros Feladatok és Geometriai Bizonyítások (Nehéz)',
    subtitle: 'Súlypontvektorok, zárt sokszögek, egységvektorok és kompozíciós tételek.',
    range: '21 - 30. feladat',
    focus: 'Haladó vektorgeometria és alkalmazások',
    questions: [
      {
        id: 'vq3-1',
        questionTypeBadge: 'Háromszög Súlypontja',
        question: 'Ha egy háromszög csúcsainak helyvektorai a, b és c, mi a háromszög S súlypontjának s helyvektora?',
        options: ['(a + b + c) / 3', '(a + b + c) / 2', 'a + b + c', '√(a² + b² + c²)'],
        correctAnswer: 0,
        hint: 'A súlypont a csúcsok számtani közepe.',
        explanation: 'A háromszög súlypontjának helyvektora a három csúcs helyvektorának átlaga: s = (a + b + c) / 3.'
      },
      {
        id: 'vq3-2',
        questionTypeBadge: 'Zárt Sokszög Vektorai',
        question: 'Mennyi egy ABCD négyszög oldalvektorainak összege körbejárva: AB + BC + CD + DA = ?',
        options: ['0 (nullvektor)', 'AC + BD', '2AB', 'Nem határozható meg'],
        correctAnswer: 0,
        hint: 'A-ból indulunk és A-ba érkezünk vissza a láncszabály szerint.',
        explanation: 'AB + BC + CD + DA = AA = 0. Bármely zárt sokszög körbejáró élvektorainak összege a nullvektor.'
      },
      {
        id: 'vq3-3',
        questionTypeBadge: 'Eltolások Egymásutánja',
        question: 'Egy alakzatot eltolunk a v₁(3; −2) vektorral, majd az eredményt a v₂(−1; 5) vektorral. Milyen egyetlen eltolással helyettesíthető ez a két transzformáció?',
        options: [
          'Egy eltolással a v = (2; 3) vektorral',
          'Egy eltolással a v = (4; −7) vektorral',
          'Egy 90°-os forgatással',
          'Egy középpontos tükrözéssel'
        ],
        correctAnswer: 0,
        hint: 'Az eltolások összetétele az eltolásvektorok összege: v = v₁ + v₂.',
        explanation: 'v = v₁ + v₂ = (3 + (−1); −2 + 5) = (2; 3).'
      },
      {
        id: 'vq3-4',
        questionTypeBadge: 'Paralelogramma Negyedik Csúcsa',
        question: 'Egy ABCD paralelogramma három csúcsa: A(1; 2), B(6; 2), D(3; 6). Mik a C csúcs koordinátái?',
        options: ['(8; 6)', '(7; 6)', '(9; 8)', '(5; 6)'],
        correctAnswer: 0,
        hint: 'Mivel AB = DC, ezért C = D + AB, ahol AB = (5; 0).',
        explanation: 'AB = (6 − 1; 2 − 2) = (5; 0). Mivel DC = AB, ezért C = D + (5; 0) = (3 + 5; 6 + 0) = (8; 6).'
      },
      {
        id: 'vq3-5',
        questionTypeBadge: 'Ellentétes Vektorok Összege',
        question: 'Két párhuzamos, de ellentétes irányú vektor hossza |a| = 8 és |b| = 5. Mennyi az a + b összegvektor hossza?',
        options: ['3', '13', '√89', '40'],
        correctAnswer: 0,
        hint: 'Ellentétes irányok esetén a hosszak kivonódnak egymásból.',
        explanation: 'Ellentétes irányú vektorok összeadásakor |a + b| = ||a| − |b|| = |8 − 5| = 3.'
      },
      {
        id: 'vq3-6',
        questionTypeBadge: 'Egységvektor Kiszámítása',
        question: 'Mi a v(6; 8) vektorral megegyező irányú egységvektor (1 hosszúságú vektor)?',
        options: ['(0,6; 0,8)', '(1; 1)', '(3; 4)', '(0,5; 0,5)'],
        correctAnswer: 0,
        hint: 'Oszd el a vektort a saját hosszával: e = v / |v|, ahol |v| = 10.',
        explanation: '|v| = √(6² + 8²) = 10. Az egységvektor: v / 10 = (6/10; 8/10) = (0,6; 0,8).'
      },
      {
        id: 'vq3-7',
        questionTypeBadge: 'Párhuzamos Vektorok Feltétele',
        question: 'Az a(4; −6) és b(6; y) vektorok párhuzamosak (azonos állásúak). Mennyi az y értéke?',
        options: ['−9', '9', '−4', '−6'],
        correctAnswer: 0,
        hint: 'Párhuzamos vektorok koordinátái arányosak: 6 / 4 = y / (−6).',
        explanation: 'Az arány: 6 / 4 = 1,5. Tehát y = −6 · 1,5 = −9.'
      },
      {
        id: 'vq3-8',
        questionTypeBadge: 'Háromszög Középvonala',
        question: 'Egy ABC háromszögben F₁ az AB oldal, F₂ az AC oldal felezőpontja. Hogyan fejezhető ki az F₁F₂ középvonalvektor a BC vektorral?',
        options: ['F₁F₂ = 1/2 · BC', 'F₁F₂ = 2 · BC', 'F₁F₂ = −BC', 'F₁F₂ = BC'],
        correctAnswer: 0,
        hint: 'A középvonal párhuzamos a harmadik oldallal és fele olyan hosszú.',
        explanation: 'A geometriai tétel szerint a háromszög középvonala párhuzamos az alappal, azonos irányú és fele olyan hosszú: F₁F₂ = 0,5 · BC.'
      },
      {
        id: 'vq3-9',
        questionTypeBadge: 'Kivonás Végpontjai',
        question: 'Ha a és b közös O kezdőpontú vektorok, melyik pontból melyik pontba mutat az a − b vektor?',
        options: [
          'A b végpontjából az a végpontjába',
          'Az a végpontjából a b végpontjába',
          'Az O-ból az a végpontjába',
          'Az O-ból a b végpontjába'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a háromszög-szabályra: b + (a − b) = a.',
        explanation: 'Mivel b + (a − b) = a, a különbségvektor a kivonandó (b) végpontjából a kisebbítendő (a) végpontjába mutat.'
      },
      {
        id: 'vq3-10',
        questionTypeBadge: 'Fixegyenesek Eltolásnál',
        question: 'Mely egyenesek az eltolás fixegyenesei (amelyek képe önmagukba megy át)?',
        options: [
          'A v eltolásvektorral párhuzamos egyenesek',
          'A v eltolásvektorra merőleges egyenesek',
          'Az x és y koordinátatengelyek',
          'Egyetlen ilyen egyenes sincs'
        ],
        correctAnswer: 0,
        hint: 'Ha az egyenes párhuzamos az eltolás irányával, minden pontja az egyenes mentén csúszik el.',
        explanation: 'Az eltolásvektorral párhuzamos egyenesek pontjai önmaguk mentén mozdulnak el, így az egyenes mint halmaz önmagába képződik le.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A vektor 3 jellemzője',
    badge: 'Alapfogalmak',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Vektor = irányított szakasz AB.',
    formula: '|v| ≥ 0 (hossz) • Állás • Irány',
    note: 'Nullvektor: hossza 0, iránya tetszőleges. Ellentett vektor (−v): azonos hossz, ellentétes irány.',
    icon: <MoveRight className="w-5 h-5 text-emerald-600" />
  },
  {
    title: 'Összeadás és Kivonás',
    badge: 'Műveletek',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Háromszög- és paralelogramma-szabály.',
    formula: 'AB + BC = AC\na − b = a + (−b)',
    note: 'Koordinátákkal: (a₁; a₂) ± (b₁; b₂) = (a₁±b₁; a₂±b₂).',
    icon: <Split className="w-5 h-5 text-indigo-600" />
  },
  {
    title: 'Hossz és Skalárral Szorzás',
    badge: 'Képletek',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Hosszúság és számmal szorzás koordinátákkal:',
    formula: '|v| = √(v₁² + v₂²)\nλ · (v₁; v₂) = (λv₁; λv₂)',
    note: 'Ha λ < 0, a vektor iránya megfordul! |λv| = |λ| · |v|.',
    icon: <Maximize2 className="w-5 h-5 text-purple-600" />
  },
  {
    title: 'Eltolás mint Egybevágóság',
    badge: 'Transzláció',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'PP\' = v minden P pontra.',
    formula: 'P\' = P + v • e\' || e',
    note: 'Távolságtartó, szögtartó, körüljárási irány megmarad. Ha v ≠ 0, NINCS fixpontja!',
    icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />
  }
];

export const VectorQuiz: React.FC<VectorQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="2. Vektorok és az eltolás kvíz"
      subtitle="Gyakorold a vektorok fogalmát, a háromszög- és paralelogramma-szabályt, a koordinátás számításokat és az eltolást!"
      topicId="g9-trans-vektorok"
      topicTitle="2. Vektorok és az eltolás"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <VectorMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <VectorSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

