import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { NegationMatcher } from './NegationMatcher';
import { NegationSorter } from './NegationSorter';
import {
  NegationTruthCriterionSvg,
  QuantifierDualitySvg,
  InequalityNegationSvg,
  VennFriendGroupSvg
} from './NegationFigures';
import { Brain, Sparkles, CheckCircle2, ShieldCheck, Scale, HelpCircle, Layers } from 'lucide-react';

interface NegationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Tagadás Kettős Aranyszabálya',
    description: '¬A akkor igaz, ha A hamis, és akkor hamis, ha A igaz. Két állítás NEM tagadása egymásnak, ha létezik olyan szituáció, ahol mindkettő egyszerre igaz, VAGY mindkettő egyszerre hamis!',
    note: 'Példa: „Minden autó piros” és „Egyik sem piros” mindkettő hamis, ha van 1 kék és 2 piros autó!',
    color: 'from-rose-500 to-red-600',
    figure: <NegationTruthCriterionSvg size={180} />
  },
  {
    title: 'A Kvantorok Dualitása (∀ és ∃)',
    description: '¬(∀x P(x)) ≡ ∃x ¬P(x) („minden” tagadása „van olyan, ami nem”). ¬(∃x P(x)) ≡ ∀x ¬P(x) („van olyan” tagadása „nincs olyan” vagy „minden ... nem”).',
    note: 'Egy „minden” állítás cáfolatához 1etlen ellenpélda elég! Létezési állítás igazolásához 1etlen működő példa elég.',
    color: 'from-indigo-500 to-purple-600',
    figure: <QuantifierDualitySvg size={180} />
  },
  {
    title: 'Határértékek és Egyenlőtlenségek Tagadása',
    description: 'A komplementer elv: a határpont mindig a tagadásba kerül át. x ≥ a tagadása x < a; x > a tagadása x ≤ a.',
    note: '„Legalább 5” tagadása „kevesebb mint 5”. „Legfeljebb 10” tagadása „több mint 10”.',
    color: 'from-teal-500 to-emerald-600',
    figure: <InequalityNegationSvg size={180} />
  },
  {
    title: 'Rejtett Kvantorok és Halmazok',
    description: 'A matematikai tételek rejtett „minden” szót tartalmaznak: „A rombusz átlói merőlegesek” ≡ „Minden rombusz...”. Tagadásakor a „van olyan” lép elő.',
    note: 'Üres halmaz elve: Ha a feltételnek megfelelő elem nem létezik (0 db), az univerzális állítás triviálisan igaz.',
    color: 'from-amber-500 to-orange-600',
    figure: <VennFriendGroupSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Kvantoros Tagadások (Könnyű)',
    subtitle: 'Tankönyvi alapmondatok tagadása és a negáció kettős aranyszabálya.',
    range: '1–10. feladat',
    focus: 'Általános (∀) és létezési (∃) kvantorok tagadása',
    questions: [
      {
        id: 'nq1-1',
        questionTypeBadge: 'A Tagadás Szabálya',
        question: 'Mikor tekinthető egy B kijelentés egy A állítás pontos logikai tagadásának?',
        options: [
          'Ha A és B sosem lehetnek egyszerre igazak, és sosem lehetnek egyszerre hamisak sem (pontosan az egyik igaz)',
          'Ha B pontosan az ellentétes végletet fejezi ki, mint A',
          'Ha A és B nem lehetnek egyszerre igazak, de egyszerre mindkettő lehet hamis',
          'Ha B mondatban szerepel a „nem” tagadószó'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az utcán parkoló autókra: mindkettő hamis lehetett, ezért nem voltak tagadásai egymásnak!',
        explanation: 'A logikai negáció definíciója szerint egy állítás és tagadása közül pontosan az egyiknek kell igaznak lennie, a másiknak pedig hamisnak minden lehetséges esetben.'
      },
      {
        id: 'nq1-2',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.5',
        question: 'Melyik mondat a tagadása a következő állításnak: „Minden diák szereti a matematikát”?',
        options: [
          'Van olyan diák, aki nem szereti a matematikát.',
          'Egyik diák sem szereti a matematikát.',
          'Van olyan tantárgy, amelyet nem szeretnek a diákok.',
          'Minden diák utálja a matematikát.'
        ],
        correctAnswer: 0,
        hint: 'A „minden” állítás megtöréséhez hány nem szerető diákra van szükség?',
        explanation: 'A „minden” állítás cáfolatához elég egyetlen diák, aki nem szereti. Az „egyik sem” túl erős állítás, szélső érték csapda.'
      },
      {
        id: 'nq1-3',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.6',
        question: 'Egy ládában fakockák vannak. Mi a pontos tagadása az állításnak: „A ládában minden kocka barna”?',
        options: [
          'A ládában van olyan kocka, amely nem barna. (Nem minden kocka barna)',
          'A ládában minden kocka fekete.',
          'A ládában nincs barna kocka.',
          'A ládában van olyan kocka, amely barna.'
        ],
        correctAnswer: 0,
        hint: 'Ha van 9 barna és 1 fehér kocka a ládában, melyik mondat lesz igaz?',
        explanation: 'Ha van a ládában 9 barna és 1 sárga kocka, akkor a „minden barna” hamis, a „nincs barna” szintén hamis! A helyes tagadás: „van olyan kocka, amely nem barna”.'
      },
      {
        id: 'nq1-4',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.7',
        question: 'Melyik kijelentés a tagadása a következő mondatnak: „Minden zenész szereti a tiszta hangzást”?',
        options: [
          'Van olyan zenész, aki nem szereti a tiszta hangzást.',
          'Egyik zenész sem szereti a tiszta hangzást.',
          'Van olyan zenész, aki szereti a tiszta hangzást.',
          'Létezik zenész, aki szereti a hamis hangzást.'
        ],
        correctAnswer: 0,
        hint: 'A „minden” (∀) tagadása „van olyan, aki nem” (∃ ¬P).',
        explanation: 'A hivatalos érettségi típusfeladat szerint a helyes megoldás: „Van olyan zenész, aki nem szereti a tiszta hangzást.”'
      },
      {
        id: 'nq1-5',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.8',
        question: 'Mi a tagadása a kijelentésnek: „Minden bankbetét fix kamatozású”?',
        options: [
          'Van olyan bankbetét, mely nem fix kamatozású.',
          'Nincs fix kamatozású bankbetét.',
          'Minden bankbetét változó kamatozású.',
          'Van olyan bankbetét, mely fix kamatozású.'
        ],
        correctAnswer: 0,
        hint: 'Hogyan negáljuk a „minden”-t?',
        explanation: 'A „minden X rendelkezik P tulajdonsággal” tagadása: „Létezik olyan X, amely nem rendelkezik P-vel”.'
      },
      {
        id: 'nq1-6',
        questionTypeBadge: 'Tankönyvi Példa',
        question: 'Miért NEM tagadása egymásnak a következő két állítás: A: „Az utcában minden autó Opel.” és B: „Egyik autó sem Opel az utcában.”?',
        options: [
          'Mert ha az utcában áll 2 Opel és 1 Ford, akkor mindkét állítás egyszerre hamis',
          'Mert mindkét állítás egyszerre igaz is lehet',
          'Mert az Opel egy autómárka, és a matematikában nincsenek márkák',
          'Mert B mondatban nincs „nem” szócska'
        ],
        correctAnswer: 0,
        hint: 'Képzeld el a parkoló autókat: 2 Opel és 1 Ford. Igaz-e A? Igaz-e B?',
        explanation: 'Ha van 2 Opel és 1 Ford, akkor A hamis (mert ott a Ford), és B is hamis (mert ott a két Opel). Mivel mindkettő egyszerre hamis lehet, NEM egymás tagadásai!'
      },
      {
        id: 'nq1-7',
        questionTypeBadge: 'Tankönyv 10. oldal',
        question: 'Miért NEM tagadása egymásnak: C: „Van olyan macska, amelyik fekete.” és D: „Van olyan macska, amelyik nem fekete.”?',
        options: [
          'Mert a valóságban létezik fekete macska és fehér macska is, így mindkét állítás egyszerre IGAZ',
          'Mert mindkét állítás egyszerre hamis a valóságban',
          'Mert a macskák színe nem határozható meg objektíven',
          'Mert mindkét mondatban van „nem” szó'
        ],
        correctAnswer: 0,
        hint: 'Egymás tagadásai lehetnek-e egyszerre igazak?',
        explanation: 'Ha a világon él fekete macska és sziámi macska is, akkor mindkét mondat egyszerre IGAZ. Két állítás, amelyek egyszerre igazak lehetnek, nem lehetnek egymás tagadásai.'
      },
      {
        id: 'nq1-8',
        questionTypeBadge: 'Tankönyvi Mondás',
        question: 'Mi a tagadása a következő állításnak: „Minden folyó a tengerbe ömlik”?',
        options: [
          'Van olyan folyó, amely nem a tengerbe ömlik.',
          'Egyetlen folyó sem ömlik a tengerbe.',
          'Minden folyó tóba ömlik.',
          'Van olyan tenger, amibe nem ömlik folyó.'
        ],
        correctAnswer: 0,
        hint: 'Cáfolathoz elég egy lefolyástalan tóba torkolló vagy sivatagban elszivárgó folyó!',
        explanation: 'A „minden folyó...” tagadása: „Van olyan folyó, amely nem a tengerbe ömlik” (pl. a Volga a Kaszpi-tengerbe ömlik, ami valójában egy lefolyástalan tó).'
      },
      {
        id: 'nq1-9',
        questionTypeBadge: 'Közmondás Logikája',
        question: 'Mi a tagadása a közmondásnak: „Minden út Rómába vezet”?',
        options: [
          'Van olyan út, amely nem vezet Rómába.',
          'Egyik út sem vezet Rómába.',
          'Minden út elkerüli Rómát.',
          'Van olyan út, amely Rómából indul.'
        ],
        correctAnswer: 0,
        hint: '∀ tagadása ∃ ¬P.',
        explanation: 'A tagadás pontos jelentése: létezik legalább egy út, amelynek célpontja nem Róma.'
      },
      {
        id: 'nq1-10',
        questionTypeBadge: 'Kettős Tagadás',
        question: 'Hogyan viszonyul a ¬(¬A) (kettős tagadás) logikai értéke az eredeti A állítás logikai értékéhez?',
        options: [
          'Mindig pontosan megegyezik vele: ¬(¬A) ≡ A',
          'Mindig az ellentéte lesz',
          'Csak akkor egyezik meg vele, ha A eredetileg igaz volt',
          'Kettős tagadás esetén a kifejezés elveszíti az igazságértékét'
        ],
        correctAnswer: 0,
        hint: '„Nem igaz, hogy nem esik az eső” ≡ ?',
        explanation: 'A klasszikus logikában a kettős tagadás törvénye értelmében egy állítás tagadásának a tagadása visszavezet az eredeti állítás logikai értékéhez.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számelméleti, Geometriai és Relációs Tagadások (Közepes)',
    subtitle: 'Rejtett kvantorok feloldása, határértékek megfordítása és matematikai tételek.',
    range: '11–20. feladat',
    focus: 'Egyenlőtlenségek tagadása és matematikai tételek',
    questions: [
      {
        id: 'nq2-1',
        questionTypeBadge: 'Tankönyv 11. oldal',
        question: 'Tekintsük az állítást: „Minden prímszám páratlan.” Mi a helyes tagadása és annak logikai értéke?',
        options: [
          'Tagadása: „Van olyan prímszám, amely nem páratlan (páros).” Logikai értéke: IGAZ (a 2-es miatt)',
          'Tagadása: „Minden prímszám páros.” Logikai értéke: HAMIS',
          'Tagadása: „Egyik prímszám sem páratlan.” Logikai értéke: IGAZ',
          'Tagadása: „Nincs olyan prímszám, amely páratlan.” Logikai értéke: HAMIS'
        ],
        correctAnswer: 0,
        hint: 'A 2 prím és páros. Emiatt az eredeti állítás hamis, így a helyes tagadásnak kötelezően igaznak kell lennie!',
        explanation: 'Mivel a 2 prímszám és páros, az eredeti kijelentés hamis. A tagadása („Van olyan prímszám, amely nem páratlan”) emiatt IGAZ.'
      },
      {
        id: 'nq2-2',
        questionTypeBadge: 'Geometria Tagadása',
        question: 'Mi a tagadása az állításnak: „Van olyan háromszög, amely középpontosan szimmetrikus”?',
        options: [
          'Nincs olyan háromszög, amely középpontosan szimmetrikus. (Egyetlen háromszög sem az)',
          'Van olyan háromszög, amely nem középpontosan szimmetrikus.',
          'Minden háromszög tengelyesen szimmetrikus.',
          'Minden háromszögnek van szimmetriaközéppontja.'
        ],
        correctAnswer: 0,
        hint: 'A „van olyan” (∃) tagadása „nincs olyan” vagy „egyik sem” (∀ ¬P).',
        explanation: 'A létezési állítás tagadása azt jelenti, hogy a vizsgált halmazban egyetlen olyan tulajdonságú elem sincs: „Nincs olyan háromszög, amely középpontosan szimmetrikus”.'
      },
      {
        id: 'nq2-3',
        questionTypeBadge: 'Geometria Tagadása',
        question: 'Mi a tagadása a tételnek: „Minden háromszögnek van beírható köre”?',
        options: [
          'Van olyan háromszög, amelynek nincs beírható köre.',
          'Egyik háromszögnek sincs beírható köre.',
          'Minden háromszögnek van körülírt köre.',
          'Nincs olyan háromszög, amelynek van beírható köre.'
        ],
        correctAnswer: 0,
        hint: 'A „minden”-t váltjuk „van olyan, aminek nincs”-re.',
        explanation: 'Mivel az eredeti geometriai tétel igaz (minden háromszögbe írható kör), a helyes tagadása („Van olyan háromszög, aminek nincs beírható köre”) HAMIS.'
      },
      {
        id: 'nq2-4',
        questionTypeBadge: 'Határérték / Reláció',
        question: 'Peti azt mondta: „A dolgozatomra legalább 40 pontot kaptam.” Mi ennek a mondatnak a pontos tagadása?',
        options: [
          'A dolgozatomra kevesebb mint 40 pontot kaptam. (x < 40)',
          'A dolgozatomra legfeljebb 40 pontot kaptam. (x ≤ 40)',
          'A dolgozatomra pontosan 39 pontot kaptam.',
          'A dolgozatomra több mint 40 pontot kaptam. (x > 40)'
        ],
        correctAnswer: 0,
        hint: 'A „legalább 40” azt jelenti: x ≥ 40. Mi az x ≥ 40 komplementere?',
        explanation: 'Ha Peti éppen 40 pontot kapott, a „legalább 40” igaz. Emiatt a tagadásban a 40 már nem szerepelhet: a tagadás a szigorúan kisebb, azaz x < 40 („kevesebb mint 40 pont”).'
      },
      {
        id: 'nq2-5',
        questionTypeBadge: 'Határérték / Reláció',
        question: 'Mi a tagadása a kijelentésnek: „A buszon legfeljebb 50 utas utazhat”?',
        options: [
          'A buszon több mint 50 utas utazhat. (x > 50)',
          'A buszon legalább 50 utas utazhat. (x ≥ 50)',
          'A buszon kevesebb mint 50 utas utazhat. (x < 50)',
          'A buszon pontosan 51 utas utazhat.'
        ],
        correctAnswer: 0,
        hint: '„Legfeljebb 50” jelentése: x ≤ 50. Tagadása: x > 50.',
        explanation: 'Az x ≤ 50 komplementere az x > 50, azaz „több mint 50 utas utazhat”.'
      },
      {
        id: 'nq2-6',
        questionTypeBadge: 'Egyenlőtlenség Tagadása',
        question: 'Mi az „x > 15” egyenlőtlenség logikai tagadása a valós számok halmazán?',
        options: [
          'x ≤ 15',
          'x < 15',
          'x ≥ 15',
          'x ≠ 15'
        ],
        correctAnswer: 0,
        hint: 'Ne feledd: a 15-ös határpontnak szerepelnie kell az egyik tartományban!',
        explanation: 'A szigorú egyenlőtlenség (> ) tagadása a megengedő kisebb vagy egyenlő (≤). Így a 15-ös szám a tagadásba kerül be.'
      },
      {
        id: 'nq2-7',
        questionTypeBadge: 'Sokszögek Tulajdonsága',
        question: 'Mi a tagadása az állításnak: „A sokszög minden belső szöge tompaszög”?',
        options: [
          'A sokszögnek van legalább egy olyan belső szöge, amely nem tompaszög (hegyesszög, derékszög vagy egyenesszög).',
          'A sokszög minden belső szöge hegyesszög.',
          'A sokszög egyik belső szöge sem tompaszög.',
          'A sokszögnek pontosan egy hegyesszöge van.'
        ],
        correctAnswer: 0,
        hint: 'Nem a szögek típusának ellentétét keressük, hanem a kivétel létezését!',
        explanation: 'A „minden szög tompaszög” cáfolatához elég egyetlen szög, ami nem tompaszög (lehet derékszög vagy hegyesszög is).'
      },
      {
        id: 'nq2-8',
        questionTypeBadge: 'Tankönyv 12. oldal feladat 4',
        question: 'Adott az állítás: „Minden természetes szám nagyobb vagy egyenlő, mint a számjegyeinek összege.” Mi ennek a tagadása?',
        options: [
          'Van olyan természetes szám, amely kisebb, mint a számjegyeinek összege.',
          'Minden természetes szám kisebb, mint a számjegyeinek összege.',
          'Van olyan természetes szám, amely egyenlő a számjegyeinek összegével.',
          'Egyetlen természetes szám sem nagyobb a számjegyei összegénél.'
        ],
        correctAnswer: 0,
        hint: 'Az eredeti állítás: ∀n : n ≥ S(n). Ennek tagadása: ∃n : n < S(n).',
        explanation: 'Az n ≥ S(n) tagadása az n < S(n). A „minden” kvantor pedig átvált „van olyan”-ra: „Van olyan természetes szám, amely kisebb, mint a számjegyeinek összege.”'
      },
      {
        id: 'nq2-9',
        questionTypeBadge: 'Tankönyv 12. oldal feladat 4',
        question: 'Adott az állítás: „Van olyan természetes szám, amely egyenlő a számjegyeinek összegével.” Mi ennek a pontos tagadása?',
        options: [
          'Minden természetes szám különbözik a számjegyeinek összegétől. (Egyetlen természetes szám sem egyenlő számjegyei összegével)',
          'Van olyan természetes szám, amely nem egyenlő a számjegyeinek összegével.',
          'Minden természetes szám egyenlő a számjegyei összegével.',
          'Nincs olyan természetes szám, amely nagyobb a számjegyei összegénél.'
        ],
        correctAnswer: 0,
        hint: 'A „van olyan =” tagadása „minden ≠” (vagy „egyetlenegy sem =”).',
        explanation: 'A létezési egyenlőség tagadása azt jelenti, hogy kivétel nélkül az összes szám eltér a számjegyei összegétől.'
      },
      {
        id: 'nq2-10',
        questionTypeBadge: 'Rejtett Kvantor Tételben',
        question: 'Mi a tagadása a tételnek: „A háromszög magasságpontja a háromszög belsejébe esik”?',
        options: [
          'Van olyan háromszög, amelynek magasságpontja nem a háromszög belsejébe esik (határán vagy azon kívül van).',
          'Egyik háromszög magasságpontja sem a háromszög belsejébe esik.',
          'Minden háromszög magasságpontja a háromszögön kívül van.',
          'Csak a derékszögű háromszög magasságpontja esik kívülre.'
        ],
        correctAnswer: 0,
        hint: 'A tompaszögű háromszög magasságpontja a háromszögön kívül van!',
        explanation: 'A rejtett „minden” feloldásával a tétel tagadása: „Van olyan háromszög, amelynek magasságpontja nem esik a belsejébe.” (A tompaszögű háromszög ilyen ellenpélda).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kompetenciamérés és Érettségi Típusú Feladatok (Haladó)',
    subtitle: 'Diagramok, Venn-modellek, összetett logikai szerkezetek és emelt szintű csemegék.',
    range: '21–30. feladat',
    focus: 'Összetett érvelések, kompetencia feladatok és paradoxonok',
    questions: [
      {
        id: 'nq3-1',
        questionTypeBadge: 'Tankönyv 13. oldal feladat 2',
        question: 'A Harry Potter világára utalva: Melyik állítás a pontos tagadása a következő mondatnak: „Nincs Roxfort Hagrid nélkül”?',
        options: [
          'Van Roxfort Hagrid nélkül.',
          'Nincs Roxfort Hagriddal.',
          'Van Roxfort Hagriddal.',
          'Minden Roxfortban ott van Hagrid.'
        ],
        correctAnswer: 0,
        hint: 'A mondat egy hiánytagadás: „Nem létezik olyan Roxfort, ahol nincs Hagrid”. Ennek cáfolata a létezés.',
        explanation: 'A „Nincs X Y nélkül” állítás tagadása: „Van X Y nélkül” (létezik olyan állapot, ahol Roxfort megvan, de Hagrid nincs jelen).'
      },
      {
        id: 'nq3-2',
        questionTypeBadge: 'Tankönyv 13. oldal Venn-diagram',
        question: 'Egy 5 tagú baráti társaságban Tomi csak focizni szeret, Jocó és Dani focizni és kosarazni is szeret, Gábor és Elek pedig csak kosarazni szeret. Igaz vagy hamis az állítás: „A társaságban mindenki szeret kosarazni”?',
        options: [
          'HAMIS, mert Tomi csak focizni szeret, tehát ő nem szeret kosarazni',
          'IGAZ, mert 4-en szeretnek kosarazni, ami abszolút többség',
          'IGAZ, mert Jocó és Dani mindkettőt szereti',
          'Nem dönthető el a megadott adatokból'
        ],
        correctAnswer: 0,
        hint: 'Hány ellenpélda elég egy „mindenki” állítás cáfolatához?',
        explanation: 'A „mindenki” állítás hamis, mert Tomi egyértelmű ellenpélda (ő kizárólag focizik, kosarazni nem szeret).'
      },
      {
        id: 'nq3-3',
        questionTypeBadge: 'Tankönyv 13. oldal Venn-diagram',
        question: 'Az előző feladat 5 tagú társaságában mi a tagadása az állításnak: „Nincs olyan tagja a társaságnak, aki nem szeret kosarazni”?',
        options: [
          'Van olyan tagja a társaságnak, aki nem szeret kosarazni.',
          'Minden tagja szeret kosarazni.',
          'Egyik tag sem szeret kosarazni.',
          'Van olyan tag, aki szeret kosarazni.'
        ],
        correctAnswer: 0,
        hint: '„Nincs olyan, aki nem...” tagadása: „Van olyan, aki nem...”.',
        explanation: 'A „nincs olyan X, aki nem P” egy kettős tagadásos szerkezet (valójában azt jelenti, hogy mindenki P). Tagadása: „Van olyan tag, aki nem szeret kosarazni”.'
      },
      {
        id: 'nq3-4',
        questionTypeBadge: 'Kompetenciamérés 2010 (Tankönyv 11. o.)',
        question: 'Kati készített egy 13 kockás térbeli alakzatról elölnézeti, oldalnézeti és felülnézeti rajzot. Kiderült, hogy 2 rajza hibátlan, de 1 rajza hibás lett. Melyik állítás IGAZ az alábbiak közül?',
        options: [
          'Van olyan rajza Katinak, ami hibás.',
          'Kati minden rajza hibás.',
          'Kati minden rajza jó.',
          'Egyik rajza sem lett hibás.'
        ],
        correctAnswer: 0,
        hint: 'Ha van 1 hibás és 2 jó rajz, melyik állítás teljesül?',
        explanation: 'Mivel pontosan 1 rajz hibás, a „Kati minden rajza jó” hamis, a „minden rajza hibás” hamis, a „Van olyan rajza, ami hibás” pedig IGAZ.'
      },
      {
        id: 'nq3-5',
        questionTypeBadge: 'Kompetenciamérés 2015 (Margitsziget futás)',
        question: 'Levente és Gergő a hét minden napján futottak egy Margitsziget kört. Mi a pontos tagadása a kijelentésnek: „Nem volt olyan nap, hogy mindketten ugyanannyi idő alatt futották volna le a szigetkört”?',
        options: [
          'Volt legalább egy olyan nap, amikor mindketten ugyanannyi idő alatt futották le a szigetkört.',
          'Minden nap ugyanannyi idő alatt futották le a szigetkört.',
          'Egyik nap sem futották le azonos idő alatt.',
          'Gergő minden nap gyorsabb volt Leventénél.'
        ],
        correctAnswer: 0,
        hint: '„Nem volt olyan nap...” tagadása „Volt olyan nap...”.',
        explanation: 'A létezés tagadásának tagadása a létezés megerősítése: „Volt legalább egy olyan nap, amikor mindketten azonos időt futottak”.'
      },
      {
        id: 'nq3-6',
        questionTypeBadge: 'Margitsziget Futás Elemzés',
        question: 'Mi a tagadása a mondatnak: „Pénteket kivéve a hét minden napján Levente volt a gyorsabb”?',
        options: [
          'A pénteken kívüli napok között is volt legalább egy olyan nap, amikor nem Levente volt a gyorsabb.',
          'Pénteken Levente volt a leggyorsabb.',
          'Egyik nap sem Levente volt a gyorsabb.',
          'A hét minden napján Gergő volt a gyorsabb.'
        ],
        correctAnswer: 0,
        hint: 'A hatókör: hétfőtől vasárnapig, péntek nélkül. Itt kell keresni ellenpéldát!',
        explanation: 'A kivétellel megadott általános állítás tagadása azt jelenti, hogy a megengedett tartományban (hétfő, kedd, szerda, csütörtök, szombat, vasárnap) is akadt legalább egy nap, amikor nem ő volt a gyorsabb.'
      },
      {
        id: 'nq3-7',
        questionTypeBadge: 'Tankönyv 13. oldal feladat 4',
        question: 'Tekintsük a következő állítást: A: „Minden páros szám 2-re végződik.” Melyik kijelentés az A állítás pontos tagadása?',
        options: [
          'Nem minden páros szám végződik 2-re. (Van olyan páros szám, amely nem 2-re végződik)',
          'Minden páros szám 0-ra végződik.',
          'A páros számok 2-re vagy 0-ra végződnek.',
          'Egyik páros szám sem végződik 2-re.'
        ],
        correctAnswer: 0,
        hint: 'Keresd azt az opciót, amely a „minden” univerzális érvényét közvetlenül megtöri!',
        explanation: 'A tankönyvi feladatban a C opció („Nem minden páros szám végződik 2-re”) az A pontos logikai tagadása, hiszen a 14 vagy a 20 azonnal igazolja a tagadást.'
      },
      {
        id: 'nq3-8',
        questionTypeBadge: 'Emelt Szint (Vacuous Truth)',
        question: 'Bence azt mondja: „Minden csokimat odaadom neked.” Kiderül, hogy Bencének egyetlen szem csokija sincs a zsebében. Mi az állítás logikai értéke és miért?',
        options: [
          'IGAZ, mert a tagadása („Van olyan csokim, amit nem adtam oda”) hamis, hiszen nincs felmutatható visszatartott csoki',
          'HAMIS, mert hazudott, hiszen nem tudott csokit adni',
          'Értelmetlen mondat, mert nem állítás',
          'Egyaránt lehet igaz és hamis is'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a harmadik kizárásának elvére: lehet-e a tagadás igaz?',
        explanation: 'A formális logikában ha a feltétel üres halmazra vonatkozik, nem található ellenpélda, így a tagadás HAMIS. Emiatt az eredeti állítás kötelezően IGAZ (vacuous truth).'
      },
      {
        id: 'nq3-9',
        questionTypeBadge: 'Szimbolikus Kvantor Negáció',
        question: 'Mi a pontos jelentése a ¬(∀x ∈ H : P(x) ⟹ Q(x)) formulának?',
        options: [
          'Létezik legalább egy olyan x ∈ H, amelyre P(x) teljesül, de Q(x) nem teljesül (létezik ellenpélda)',
          'Minden x-re P(x) sem teljesül és Q(x) sem teljesül',
          'Létezik olyan x, amelyre se P, se Q nem teljesül',
          'Egyetlen x eleme H-ra sem teljesül P(x)'
        ],
        correctAnswer: 0,
        hint: 'Mikor dől meg egy feltételes ígéret: „Ha esik a hó, szánkózunk”?',
        explanation: 'A feltételes következtetés (P ⟹ Q) egyetlen esetben hamis: ha a feltétel (P) fennáll, de a következmény (Q) nem teljesül. Ennek tagadása ezért egy ilyen ellenpélda létezése.'
      },
      {
        id: 'nq3-10',
        questionTypeBadge: 'Algebrai Ellenpélda',
        question: 'Állítás: „Minden nemnegatív valós x számra igaz, hogy √x ≤ x.” Igaz-e az állítás, és mi a tagadása?',
        options: [
          'HAMIS. Tagadása: „Van olyan nemnegatív valós x szám, amelyre √x > x.” (Ellenpélda: x = 0,25, mert √0,25 = 0,5 > 0,25)',
          'IGAZ, mert a négyzetgyök mindig kisebb vagy egyenlő az eredeti számnál',
          'HAMIS. Tagadása: „Minden nemnegatív valós számra √x > x.”',
          'IGAZ, ha x egész szám, és csak törtekre hamis'
        ],
        correctAnswer: 0,
        hint: 'Próbáld ki a 0 és 1 közötti törtszámokat! Pl. 1/4.',
        explanation: 'A 0 és 1 közötti számok négyzetgyöke nagyobb magánál a számnál (pl. √0,25 = 0,5 > 0,25). Ez az egyetlen ellenpélda elegendő ahhoz, hogy a „minden” állítás hamis legyen, a tagadása pedig IGAZ.'
      }
    ]
  }
};

export const NegationQuiz: React.FC<NegationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="2. Állítás és tagadása kvíz"
      subtitle="A tagadás logikai feltétele, a 'minden' és 'van olyan' kvantorok negálása és határértékek"
      badge="10. Osztály • I. Logika"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      chapterId="logika"
      topicId="g10-logic-allitas-tagadas"
      topicTitle="2. Állítás és tagadása"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • Állítás és tagadása"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <NegationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NegationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

