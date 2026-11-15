import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CentralDilationMatcher } from './CentralDilationMatcher';
import { CentralDilationSorter } from './CentralDilationSorter';
import {
  DilationCenterSvg,
  NegativeRatioSvg,
  AreaPerimeterRatioSvg,
  SquareInTriangleSvg,
  PyramidSliceSvg
} from './CentralDilationFigures';

interface CentralDilationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A középpontos nagyítás és kicsinyítés definíciója',
    description: 'Adott egy O pont (centrum) és egy λ ≠ 0 valós arány. Egy P pont képe P\' az OP egyenesen van úgy, hogy OP\' = λ · OP vektorosan, azaz távolságban |OP\'| = |λ| · |OP|. Ha |λ| > 1, nagyítás; ha |λ| < 1, kicsinyítés; ha λ = 1, identitás.',
    note: 'Az O pont az egyetlen fixpont (O\' = O). Az O-ra illeszkedő egyenesek fixegyenesek, a nem illeszkedők képe párhuzamos az eredetivel (e\' ∥ e).',
    color: 'from-amber-500 to-orange-600',
    figure: <DilationCenterSvg size={260} />
  },
  {
    title: 'Kerület-, terület- és térfogatarányok',
    description: 'A geometriai méretek a dimenziójuk hatványának megfelelően változnak: az oldalhosszak és a kerület |λ|-szorosára, a területek λ²-szeresére, a térfogatok |λ|³-szorosára nőnek/csökkennek.',
    note: 'Vigyázat: 2-szeres oldalhossz esetén a terület 4-szeresére (2²), 3-szoros oldalhossz esetén 9-szeresére (3²) nő!',
    color: 'from-emerald-500 to-teal-600',
    figure: <AreaPerimeterRatioSvg size={260} />
  },
  {
    title: 'Negatív arány (λ < 0) és speciális szerkesztések',
    description: 'Ha λ < 0, akkor P és P\' a centrum ellentétes oldalain helyezkednek el: a transzformáció egy |λ| arányú nagyítás és egy O körüli 180°-os forgatás (középpontos tükrözés) egymásutánja.',
    note: 'A képalakzat fejjel lefelé áll (irányváltó). A távolságok és kerületek azonban sohasem negatívak: mindig az abszolútértékkel, |λ|-val szorzunk!',
    color: 'from-rose-500 to-red-600',
    figure: <NegativeRatioSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és szerkesztési alapszabályok',
    subtitle: '10 alapozó feladat a centrumról, a hasonlósági arányról és az alapvető tulajdonságokról',
    range: '1–10. kérdés',
    focus: 'Centrum, arány (λ), nagyítás vs. kicsinyítés, szögtartás és egyenestartás',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'cdq1-1',
        level: 1,
        question: 'Mi a középpontos nagyítás és kicsinyítés összefoglaló matematikai neve?',
        options: [
          'Középpontos hasonlóság (centrális kollineáció / dilatáció)',
          'Tengelyes affinitás',
          'Párhuzamos eltolás',
          'Inverzió'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos nagyítás és kicsinyítés közös geometriai neve a középpontos hasonlóság (vagy dilatáció).',
        hint: 'O pontból induló, arányos távolságváltoztatást leíró transzformáció.'
      },
      {
        id: 'cdq1-2',
        level: 1,
        question: 'Melyik állítás határozza meg pontosan a középpontos nagyítást, ha a hasonlósági tényező λ (vagy k)?',
        options: [
          '|λ| > 1',
          '0 < |λ| < 1',
          'λ = 1',
          'λ = 0'
        ],
        correctAnswer: 0,
        explanation: 'Középpontos nagyításról akkor beszélünk, ha a hasonlósági arány abszolútértéke 1-nél nagyobb (|λ| > 1). Ha |λ| < 1, akkor kicsinyítés történik.',
        hint: 'Gondolj arra, mikor lesz a kapott távolság hosszabb az eredetinél.'
      },
      {
        id: 'cdq1-3',
        level: 1,
        question: 'Hány fixpontja (helyben maradó pontja) van egy középpontos hasonlóságnak, ha a hasonlósági arány λ ≠ 1?',
        options: [
          'Pontosan 1 fixpontja van: a hasonlóság centruma (O)',
          'Végtelen sok fixpontja van az O-n átmenő egyeneseken',
          'Egyetlen fixpontja sincs',
          'Pontosan 2 fixpontja van'
        ],
        correctAnswer: 0,
        explanation: 'Ha λ ≠ 1, akkor egyedül az O középpont felel meg az OP\' = OP feltételnek, így csak az O pont fixpont (O = O\'). Minden más pont elmozdul.',
        hint: 'Melyik pont képe marad önmaga a definíció szerint?'
      },
      {
        id: 'cdq1-4',
        level: 1,
        question: 'Egy e egyenes nem illeszkedik az O pontra. Mi lesz az e egyenes képe az O középpontú, λ arányú hasonlóságban?',
        options: [
          'Az eredeti e egyenessel párhuzamos egyenes (e\' ∥ e)',
          'Az eredeti e egyenesre merőleges egyenes',
          'Maga az eredeti e egyenes',
          'Egy kör'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos hasonlóság párhuzamosságtartó: ha az egyenes nem megy át a centrumon, képe vele párhuzamos egyenes lesz.',
        hint: 'A nagyított háromszögek megfelelő oldalai párhuzamosak egymással (AB ∥ A\'B\').'
      },
      {
        id: 'cdq1-5',
        level: 1,
        question: 'Hogyan viszonyul egy 40°-os szög képe az eredeti szöghöz középpontos nagyítás során?',
        options: [
          'Pontosan 40°-os marad, mert a transzformáció szögtartó',
          'Kétszer akkora, azaz 80°-os lesz',
          'Fele akkora, azaz 20°-os lesz',
          'Kiegészítő szög lesz (140°)'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos hasonlóság szigorúan szögtartó transzformáció: sem nagyításkor, sem kicsinyítéskor a szögek nagysága nem változik meg.',
        hint: 'Az alakzat formája nem torzul, csak a mérete változik.'
      },
      {
        id: 'cdq1-6',
        level: 1,
        question: 'Az O ponttól mért távolság |OP| = 5 cm. Mekkora lesz az |OP\'| távolság, ha a hasonlóság aránya λ = 3?',
        options: [
          '15 cm',
          '8 cm',
          '45 cm',
          '1,67 cm'
        ],
        correctAnswer: 0,
        explanation: '|OP\'| = |λ| · |OP| = 3 · 5 cm = 15 cm.',
        hint: 'A pont távolsága a centrumtól pontosan a hasonlósági aránnyal szorzódik.'
      },
      {
        id: 'cdq1-7',
        level: 1,
        question: 'Milyen geometriai transzformáció valósul meg, ha a hasonlósági arány λ = -1?',
        options: [
          'O középpontú középpontos tükrözés (180°-os forgatás)',
          'Identitás (helybenhagyás)',
          'Tengelyes tükrözés',
          'Eltolás 1 cm-rel'
        ],
        correctAnswer: 0,
        explanation: 'Ha λ = -1, akkor az OP\' szakasz hossza megegyezik OP-vel, de ellentétes irányú: ez pontosan az O pontra vonatkozó középpontos tükrözés definíciója.',
        hint: 'A pont átkerül a centrum túloldalára, ugyanolyan távolságra.'
      },
      {
        id: 'cdq1-8',
        level: 1,
        question: 'Mi történik a pontok helyzetével, ha a hasonlósági tényező negatív (λ < 0)?',
        options: [
          'A P és P\' pontok a centrum (O) ellentétes oldalán helyezkednek el az OP egyenesen',
          'A képpont merőleges irányban tolódik el',
          'A P és P\' pontok az O ponttal egybeesnek',
          'Nem lehet negatív aránnyal geometriai transzformációt végezni'
        ],
        correctAnswer: 0,
        explanation: 'Vektoriálisan OP\' = λ · OP. Mivel λ < 0, a két vektor iránya ellentétes, így az O pont a P és P\' pontok között fekszik.',
        hint: 'Gondolj a negatív számok előjelére az origóhoz képest.'
      },
      {
        id: 'cdq1-9',
        level: 1,
        question: 'Hogyan szerkeszthető meg két középpontosan hasonló alakzat nagyítási centruma (O), ha ismerjük az alakzatokat?',
        options: [
          'A megfelelő csúcspárokat összekötő egyenesek (pl. AA\', BB\') metszéspontjaként',
          'Az eredeti alakzat súlypontjaként',
          'A képalakzat köré írható körének középpontjaként',
          'A megfelelő oldalak felezőmerőlegeseinek metszéspontjaként'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a P, O és P\' pontok mindig egy egyenesen vannak, a megfelelő csúcspárokat összekötő egyenesek (AA\', BB\', CC\') mind átmennek az O ponton, tehát metszéspontjuk maga a centrum.',
        hint: 'Melyik egyenesen fekszik az O pont a definíció szerint?'
      },
      {
        id: 'cdq1-10',
        level: 1,
        question: 'Melyik tulajdonság NEM marad változatlan (nem invariáns) középpontos nagyítás során?',
        options: [
          'A szakaszok hossza',
          'A szakaszok párhuzamossága',
          'A belső szögek nagysága',
          'A pontok illeszkedése az egyenesre'
        ],
        correctAnswer: 0,
        explanation: 'A szakaszok hossza megváltozik: |λ|-szorosára nő vagy csökken. A szögek, a párhuzamosság és az illeszkedés viszont invariáns marad.',
        hint: 'Melyik mennyiség változik meg, amikor egy fényképet kinagyítunk?'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kerület-, terület- és távolságszámítások',
    subtitle: '10 számításos feladat a kerületek és területek megváltozásáról, valamint a negatív arányokról',
    range: '11–20. kérdés',
    focus: 'K\' = |λ|K, T\' = λ²T összefüggések, aránypárok, összetett síkidomok és gúlaszeletek',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    questions: [
      {
        id: 'cdq2-1',
        level: 2,
        question: 'Egy háromszög területe 12 cm². Mekkora lesz a képháromszög területe, ha λ = 3 arányú középpontos nagyítást alkalmazunk?',
        options: [
          '108 cm²',
          '36 cm²',
          '24 cm²',
          '72 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A területarány a hasonlósági arány négyzete: T\' = λ² · T = 3² · 12 = 9 · 12 = 108 cm².',
        hint: 'A területek λ²-szeresükre nőnek, nem 3-szorosukra!'
      },
      {
        id: 'cdq2-2',
        level: 2,
        question: 'Egy sokszög kerülete 24 cm, területe 32 cm². Mekkora lesz a kerülete és a területe λ = 0,5 arányú kicsinyítés után?',
        options: [
          'Kerület: 12 cm, Terület: 8 cm²',
          'Kerület: 12 cm, Terület: 16 cm²',
          'Kerület: 6 cm, Terület: 8 cm²',
          'Kerület: 48 cm, Terület: 64 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A kerület a felére csökken: K\' = 0,5 · 24 = 12 cm. A terület a negyedére csökken: T\' = 0,5² · 32 = 0,25 · 32 = 8 cm².',
        hint: 'K\' = λ · K és T\' = λ² · T.'
      },
      {
        id: 'cdq2-3',
        level: 2,
        question: 'Két hasonló síkidom területe 18 cm² és 72 cm². Mekkora a hasonlóság aránya (λ > 0)?',
        options: [
          'λ = 2',
          'λ = 4',
          'λ = 0,5',
          'λ = 8'
        ],
        correctAnswer: 0,
        explanation: 'A területek aránya: T₂ / T₁ = 72 / 18 = 4. Mivel T₂ / T₁ = λ², így λ = √4 = 2.',
        hint: 'A területarány a hasonlósági arány négyzete. Vond gyököt a területarányból!'
      },
      {
        id: 'cdq2-4',
        level: 2,
        question: 'Egy AB szakasz hossza 8 cm. Mekkora lesz a képszakasz hossza, ha λ = -1,5?',
        options: [
          '12 cm',
          '-12 cm',
          '9,5 cm',
          '5,33 cm'
        ],
        correctAnswer: 0,
        explanation: 'A szakasz hossza mindig nemnegatív: |A\'B\'| = |λ| · |AB| = |-1,5| · 8 cm = 1,5 · 8 = 12 cm.',
        hint: 'Geometriai távolság nem lehet negatív, a negatív előjel az irányváltást jelenti.'
      },
      {
        id: 'cdq2-5',
        level: 2,
        question: 'Az OP szakasz hossza 10 cm. A hasonlósági arány λ = -0,4. Milyen távol van az eredeti P pont és a képpont P\' egymástól?',
        options: [
          '14 cm',
          '6 cm',
          '4 cm',
          '10 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel λ < 0, a P és P\' pontok a centrum ellentétes oldalain vannak: OP = 10 cm, OP\' = 0,4 · 10 = 4 cm. Mivel O a kettő között fekszik, a távolságuk: PP\' = OP + OP\' = 10 + 4 = 14 cm.',
        hint: 'Készíts vázlatot: P ... O ... P\'. A két távolság összeadódik!'
      },
      {
        id: 'cdq2-6',
        level: 2,
        question: 'Egy szabályos négyoldalú gúla magassága 12 cm, alapéle 8 cm. A csúcstól 6 cm-re a magasság felezőpontjában alaplappal párhuzamos síkkal elmetsszük. Mekkora a metszet területe?',
        options: [
          '16 cm²',
          '32 cm²',
          '4 cm²',
          '8 cm²'
        ],
        correctAnswer: 0,
        explanation: 'A metszet a csúcsból (E) vett centrális kicsinyítés képe. Mivel a magasság felezőpontjában vágjuk, a hasonlósági arány λ = 6/12 = 1/2. Az alapterület T = 8² = 64 cm². A metszet területe: T\' = (1/2)² · 64 = 1/4 · 64 = 16 cm².',
        hint: 'A gúla csúcsa a hasonlóság centruma, az arány pedig k = 1/2.'
      },
      {
        id: 'cdq2-7',
        level: 2,
        question: 'Egy kör sugara r = 6 cm. Mekkora lesz a kör területe, ha O középpontból λ = 2/3 aránnyal kicsinyítjük?',
        options: [
          '16π cm² (kb. 50,27 cm²)',
          '24π cm²',
          '36π cm²',
          '9π cm²'
        ],
        correctAnswer: 0,
        explanation: 'Az új sugár r\' = (2/3) · 6 = 4 cm. A terület T\' = (r\')² · π = 16π cm². Vagy a területarányból: T\' = (2/3)² · (6²π) = 4/9 · 36π = 16π cm².',
        hint: 'A sugár a 2/3-ára, a terület a (2/3)² = 4/9-ére csökken.'
      },
      {
        id: 'cdq2-8',
        level: 2,
        question: 'Egy fénykép eredeti mérete 9 cm × 12 cm. Mekkora lesz a területe, ha 2,5-szeresére nagyítjuk?',
        options: [
          '675 cm²',
          '270 cm²',
          '108 cm²',
          '540 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Az eredeti terület T = 9 · 12 = 108 cm². A nagyítás aránya λ = 2,5, így a terület a 2,5² = 6,25-szörösére nő: T\' = 108 · 6,25 = 675 cm².',
        hint: 'T\' = 2,5² · T = 6,25 · (9 · 12).'
      },
      {
        id: 'cdq2-9',
        level: 2,
        question: 'Ha egy térbeli testet 4-szeresére nagyítunk középpontosan, hányszorosára nő a felszíne (A) és a térfogata (V)?',
        options: [
          'Felszíne 16-szorosára, térfogata 64-szeresére',
          'Felszíne 4-szeresére, térfogata 16-szorosára',
          'Felszíne 8-szorosára, térfogata 12-szeresére',
          'Mindkettő 4-szeresére nő'
        ],
        correctAnswer: 0,
        explanation: 'A felszín területi jellegű méret: A\' = 4² · A = 16A. A térfogat háromdimenziós méret: V\' = 4³ · V = 64V.',
        hint: 'Területarány: λ², Térfogatarány: λ³.'
      },
      {
        id: 'cdq2-10',
        level: 2,
        question: 'Egy ABC háromszög területe 20 cm². A csúcsait összekötő szakaszokat O-ból nagyítjuk úgy, hogy a kerülete 3-szorosára nő. Mennyi az új és a régi terület különbsége (T\' - T)?',
        options: [
          '160 cm²',
          '180 cm²',
          '40 cm²',
          '60 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Ha a kerület 3-szorosára nő, a hasonlósági arány λ = 3. A terület 3² = 9-szeresére nő: T\' = 9 · 20 = 180 cm². A növekmény (különbség): 180 - 20 = 160 cm².',
        hint: 'Figyelj a kérdésre: a két terület különbsége T\' - T!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi buktatók és speciális alkalmazások',
    subtitle: '10 emelt szintű feladat a szerkesztésekről, többpontos nagyításokról és kombinált geometriai problémákról',
    range: '21–30. kérdés',
    focus: 'Háromszögbe írt négyzet, különböző centrumú nagyítások eltolása, invariáns egyenesek és összetett arányok',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-red-600',
    questions: [
      {
        id: 'cdq3-1',
        level: 3,
        question: 'Egy alakzatot az O pontból 2-szeresére nagyítunk (kapjuk az F₁ ábrát), majd ugyanezt az alakzatot egy másik, P pontból is 2-szeresére nagyítunk (kapjuk az F₂ ábrát). Milyen transzformációval vihető át F₁ az F₂-be?',
        options: [
          'Egyértelműen meghatározott párhuzamos eltolással',
          'Középpontos tükrözéssel',
          'Csak 90°-os forgatással',
          'Semmilyen egybevágósággal nem vihetők át egymásba'
        ],
        correctAnswer: 0,
        explanation: 'Két azonos arányú (itt λ = 2), de különböző centrumú középpontos nagyítás eredménye egymással egybevágó és párhuzamos állású síkidom, amelyek egyetlen eltolásvektorral fedésbe hozhatók.',
        hint: 'A két nagyított ábra azonos méretű és oldalaik párhuzamosak egymással.'
      },
      {
        id: 'cdq3-2',
        level: 3,
        question: 'Hogyan szerkeszthető egy tetszőleges hegyesszögű ABC háromszögbe olyan négyzet, amelynek két csúcsa az AB oldalon, egy-egy csúcsa pedig az AC és BC oldalon van?',
        options: [
          'Egy AB alapú segédnégyzetet rajzolunk, melynek egyik csúcsa AC-n van, majd az A csúcsból addig nagyítjuk, míg a negyedik csúcs a BC oldalra nem esik',
          'A háromszög beírható körének középpontjából rajzolunk négyzetet',
          'A magasságpontból indított kicsinyítéssel',
          'A súlyvonalak felezőpontjainak összekötésével'
        ],
        correctAnswer: 0,
        explanation: 'Veszünk egy tetszőleges méretű KLMN segédnégyzetet az AB oldalon úgy, hogy N az AC-n legyen. Az A pontból végzett centrális nagyítással az M csúcs átmegy az AM félegyenes és a BC oldal metszéspontjába (M\'), megadva a keresett négyzetet.',
        hint: 'A hasonlóság aránytartása miatt a nagyított téglalap is négyzet marad és a csúcsai a háromszög oldalaira illeszkednek.'
      },
      {
        id: 'cdq3-3',
        level: 3,
        question: 'Melyek egy középpontos hasonlóság fixegyenesei (önmagukba átmenő egyenesei), ha λ ≠ 1 és λ ≠ -1?',
        options: [
          'Kizárólag az O centrumra illeszkedő egyenesek',
          'Minden egyenes a síkon',
          'Az O-ra merőleges egyenesek',
          'Nincsenek fixegyenesek'
        ],
        correctAnswer: 0,
        explanation: 'Egy egyenes akkor megy át önmagába, ha minden pontjának képe is az egyenesen van. Mivel P\' az OP egyenesen fekszik, ez csak akkor teljesül minden pontra, ha az egyenes átmegy az O ponton.',
        hint: 'Az OP egyenes minden pontja az OP egyenesre képeződik le.'
      },
      {
        id: 'cdq3-4',
        level: 3,
        question: 'Egy O-n átmenő egyenes pontjaira melyik állítás IGAZ, ha a hasonlóság aránya λ = 2?',
        options: [
          'Az egyenes fixegyenes, de egyedül az O pont fixpont rajta; a többi pont elmozdul',
          'Az egyenes minden egyes pontja helyben marad (pontonként fix)',
          'Az egyenes pontjai 90°-kal elfordulnak',
          'Az egyenes elhagyja az O pontot'
        ],
        correctAnswer: 0,
        explanation: 'Fontos fogalmi különbség: egyenesként önmagába képződik le (fixegyenes), de a pontjai kétszeres távolságra kerülnek O-tól, tehát nem fixpontok! Egyetlen fixpont van: maga az O.',
        hint: 'Vigyázz a tipikus tévhitre: fixegyenes ≠ pontonként fix egyenes!'
      },
      {
        id: 'cdq3-5',
        level: 3,
        question: 'Egy négyzet területe T. Az O pontból vett nagyítás után a kerülete k-szorosára nőtt. Hányszorosa lett az új négyzet átlója az eredetinek?',
        options: [
          'k-szorosa',
          'k²-szerese',
          '√k-szorosa',
          '2k-szorosa'
        ],
        correctAnswer: 0,
        explanation: 'Az átló egy 1 dimenziós hosszúság, éppúgy, mint az oldal vagy a kerület. Ha a kerület k-szorosára nőtt, akkor a hasonlósági arány k, így minden szakasz (beleértve az átlót is) pontosan k-szorosára nő.',
        hint: 'Az átló egyenes szakasz, hossza d = a√2, tehát az oldallal arányosan változik.'
      },
      {
        id: 'cdq3-6',
        level: 3,
        question: 'Egy háromszöget felosztunk a középvonalai behúzásával 4 kis háromszögre. Mekkora az O = A csúcsú középpontos hasonlóság aránya, amely a nagy ABC háromszöget az A csúcs melletti kis háromszögbe viszi át?',
        options: [
          'λ = 0,5',
          'λ = 0,25',
          'λ = 2',
          'λ = -0,5'
        ],
        correctAnswer: 0,
        explanation: 'A középvonal felezi az AB és AC oldalakat, így az A-ból mért távolságok a felükre csökkennek: |AA\'| = 0,5 |AB| és |AC\'| = 0,5 |AC|. A hasonlóság aránya tehát λ = 0,5.',
        hint: 'A középvonalak az oldalakat a felüknél kötik össze.'
      },
      {
        id: 'cdq3-7',
        level: 3,
        question: 'Egy szabályos gúla magasságát 4 egyenlő részre osztjuk párhuzamos síkokkal. Mekkora a legkisebb (felső) síkmetszet és az alaplap területének aránya?',
        options: [
          '1 : 16',
          '1 : 4',
          '1 : 8',
          '1 : 64'
        ],
        correctAnswer: 0,
        explanation: 'A felső metszet a csúcstól a teljes magasság 1/4 részénél van, így a kicsinyítés aránya λ = 1/4. A területek aránya λ² = (1/4)² = 1/16.',
        hint: 'A magasság aránya 1/4, a területarány ennek a négyzete.'
      },
      {
        id: 'cdq3-8',
        level: 3,
        question: 'Az ABC háromszög oldalai 5 cm, 6 cm és 7 cm. Egy O pontból kicsinyítve a háromszög területe az eredeti 1/9-e lett. Mekkora a képháromszög leghosszabb oldala?',
        options: [
          '2,33 cm (7/3 cm)',
          '0,78 cm (7/9 cm)',
          '3,5 cm',
          '2 cm'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a területarány T\'/T = 1/9, a hasonlósági arány λ = √(1/9) = 1/3. Az eredeti leghosszabb oldal 7 cm, így az új leghosszabb oldal: 7 · (1/3) = 7/3 ≈ 2,33 cm.',
        hint: 'A területarányból gyökvonással kapjuk a hosszúságarányt: √(1/9) = 1/3.'
      },
      {
        id: 'cdq3-9',
        level: 3,
        question: 'Adott két egymást nem metsző kör, K₁(O₁, r₁) és K₂(O₂, r₂), ahol r₁ ≠ r₂. Hány olyan középpont létezik a síkban, amelyből az egyik kör a másikba középpontos hasonlósággal átvihető?',
        options: [
          'Pontosan 2 középpont: egy külső (pozitív arányú) és egy belső (negatív arányú) hasonlósági pont',
          'Csak 1 középpont',
          'Végtelen sok középpont',
          'Nem vihetők át egymásba középpontos hasonlósággal'
        ],
        correctAnswer: 0,
        explanation: 'A két körnek két hasonlósági pontja van az O₁O₂ centrálison: a külső hasonlósági pont (a külső közös érintők metszéspontja, λ > 0) és a belső hasonlósági pont (a belső érintők metszéspontja, λ < 0).',
        hint: 'Gondolj a körök külső és belső közös érintőire.'
      },
      {
        id: 'cdq3-10',
        level: 3,
        question: 'Mi a feltétele annak, hogy két alakzat ne csak egyszerűen hasonló, hanem KÖZÉPPONTOSAN hasonló legyen egymáshoz?',
        options: [
          'Hasonlóak legyenek, és a megfelelő oldalaik páronként párhuzamosak legyenek egymással',
          'A kerületük megegyezzen',
          'A területeik egyenlőek legyenek',
          'Legalább egy közös oldaluk legyen'
        ],
        correctAnswer: 0,
        explanation: 'A középpontos hasonlóság alapvető tulajdonsága a párhuzamosságtartás. Két alakzat akkor középpontosan hasonló, ha megfelelő oldalaik párhuzamosak (és egy egyenesbe esnek a csúcsokat összekötő sugarak).',
        hint: 'A sima hasonlóságnál az alakzatok el is lehetnek forgatva; a középpontosnál nem!'
      }
    ]
  }
};

export const CentralDilationQuiz: React.FC<CentralDilationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      topicTitle="1. Középpontos nagyítás, kicsinyítés"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CentralDilationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CentralDilationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CentralDilationQuiz;

