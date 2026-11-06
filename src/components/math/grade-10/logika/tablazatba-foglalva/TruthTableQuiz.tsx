import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TruthTableMatcher } from './TruthTableMatcher';
import { TruthTableSorter } from './TruthTableSorter';
import {
  TruthTableDnaSvg,
  SmullyanDoorsSvg,
  DeMorganVennSvg,
  EinsteinGridSvg
} from './TruthTableFigures';

interface TruthTableQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Igazságtáblázatok és 2ⁿ Szabály',
    description: 'n független állítás esetén 2ⁿ soros táblázat szükséges a teljes esetelemzéshez. Két változónál (A, B) 4 alapsor van: (I, I), (I, H), (H, I), (H, H).',
    note: 'Lépésenkénti kiértékelés: először az alapváltozók, majd a zárójelezett részformulák, végül a főművelet oszlopa készül el.',
    color: 'from-blue-600 to-indigo-700',
    figure: <TruthTableDnaSvg size={180} />
  },
  {
    title: 'Augustus De Morgan Azonosságai',
    description: '¬(A ∧ B) ⟺ ¬A ∨ ¬B (konjunkció tagadása)\n¬(A ∨ B) ⟺ ¬A ∧ ¬B (diszjunkció tagadása)',
    note: 'A tagadás bevitelekor a művelet jellege megfordul (ÉS-ből VAGY, VAGY-ból ÉS lesz), és mindkét tag külön-külön tagadódik.',
    color: 'from-purple-600 to-teal-700',
    figure: <DeMorganVennSvg size={180} />
  },
  {
    title: 'Kvarkus Szobái és Raymond Smullyan Logikája',
    description: 'Ajtófeliratok igazságértékének elemzése esettáblázattal. Ha egy felirat igazsága ellentmondást szül, a felirat szükségszerűen hamis.',
    note: 'A kizárt harmadik és ellentmondásmentesség elve garantálja a biztos döntést a logikai labirintusokban.',
    color: 'from-amber-600 to-orange-700',
    figure: <SmullyanDoorsSvg size={180} />
  },
  {
    title: 'Logikai Rács és Kizárásos Elemzés (Einstein)',
    description: 'Összetett logikai fejtörőknél több kategória páronkénti kizárását rácsos mátrixban követjük végig.',
    note: 'Ha egy sorban és oszlopban minden mező kizáródott, az utolsó fennmaradó mező szükségszerűen IGAZ (1).',
    color: 'from-emerald-600 to-cyan-700',
    figure: <EinsteinGridSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: 'Alapfogalmak és De Morgan-szabályok',
    subtitle: 'Igazságtáblázatok mérete, De Morgan-azonosságok és mindennapi nyelvi mondatok tagadása.',
    range: '1–10. feladat',
    focus: '2ⁿ sorszabály, ¬(A ∧ B), ¬(A ∨ B), szekrények és biciklik',
    questions: [
      {
        id: 'ttq1-1',
        questionTypeBadge: 'Táblázatok Mérete',
        question: 'Ha egy összetett logikai kifejezés n darab különböző egyszerű kijelentést (változót) tartalmaz, hány sort kell tartalmaznia az igazságtáblázatnak, hogy minden lehetséges esetet figyelembe vegyünk?',
        options: [
          '2ⁿ sort (mivel minden változó 2 értéket vehet fel, és a lehetőségek összeszorzódnak)',
          '2 · n sort (a változók számának kétszeresét)',
          'n² sort (a változók számának négyzetét)',
          'Mindig pontosan 4 sort, a változók számától függetlenül'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a kombinatorikára: minden egyes változó egymástól függetlenül vagy IGAZ (1), vagy HAMIS (0) lehet.',
        explanation: 'Mivel minden egyszerű állításnak 2 lehetséges logikai értéke van (I vagy H), n független állítás esetén az összes lehetséges kiértékelés száma 2 · 2 · ... · 2 = 2ⁿ. 2 változónál 2² = 4, 3 változónál 2³ = 8 sor szükséges.'
      },
      {
        id: 'ttq1-2',
        questionTypeBadge: 'De Morgan I. Azonosság',
        question: 'Hogyan alakítható át a De Morgan-azonosság szerint a ¬(A ∧ B) kifejezés (egy konjunkció tagadása)?',
        options: [
          '¬A ∨ ¬B (az ÉS tagadása VAGY, és mindkét tag tagadódik)',
          '¬A ∧ ¬B (mindkét tag tagadódik, de a művelet ÉS marad)',
          'A ∨ B (csak a tagadás jele esik le)',
          '¬(A ∨ B) (a művelet megfordul, de a tagadás kívül marad)'
        ],
        correctAnswer: 0,
        hint: 'Augustus De Morgan törvénye szerint a tagadás szétosztásakor a művelet jele megfordul: ÉS-ből VAGY lesz!',
        explanation: 'Az 1. De Morgan-azonosság: ¬(A ∧ B) ⟺ ¬A ∨ ¬B. A kijelentés akkor nem teljesül egészében, ha legalább az egyik összetevője hamis.'
      },
      {
        id: 'ttq1-3',
        questionTypeBadge: 'De Morgan II. Azonosság',
        question: 'Hogyan alakítható át a De Morgan-azonosság szerint a ¬(A ∨ B) kifejezés (egy diszjunkció tagadása)?',
        options: [
          '¬A ∧ ¬B (a VAGY tagadása ÉS, és mindkét tag tagadódik)',
          '¬A ∨ ¬B (a tagadás szétoszlik, de a művelet VAGY marad)',
          'A ∧ B (a tagadások kioltják egymást)',
          '¬A ∨ B (csak az első tag tagadódik)'
        ],
        correctAnswer: 0,
        hint: 'Ha nem igaz, hogy A vagy B teljesül, akkor egyik sem teljesülhet: nem teljesül A, ÉS nem teljesül B sem.',
        explanation: 'A 2. De Morgan-azonosság: ¬(A ∨ B) ⟺ ¬A ∧ ¬B. A diszjunkció csak akkor hamis, ha mindkét tagja egyszerre hamis.'
      },
      {
        id: 'ttq1-4',
        questionTypeBadge: 'Nyelvi Tagadás (Tankönyv)',
        question: 'Hogyan hangzik a „Délután tanulok és edzésre megyek” állítás logikailag helyes tagadása?',
        options: [
          '„Délután nem tanulok, VAGY nem megyek edzésre (vagy egyiket sem teszem)”',
          '„Délután nem tanulok és edzésre sem megyek”',
          '„Délután tanulok, de nem megyek edzésre”',
          '„Délután vagy tanulok, vagy edzésre megyek”'
        ],
        correctAnswer: 0,
        hint: 'A mondat egy ÉS kapcsolat. Az ÉS kapcsolat tagadása a De Morgan-szabály szerint VAGY kapcsolat lesz!',
        explanation: 'Ha valaki azt állítja, hogy mindkét tevékenységet megcsinálja, az állítása már akkor megdől, ha legalább az egyiket nem végzi el: vagy nem tanul, vagy nem megy edzésre.'
      },
      {
        id: 'ttq1-5',
        questionTypeBadge: 'Nyelvi Tagadás (Tankönyv)',
        question: 'Mi a pontos tagadása a „Péter almát vagy körtét vásárolt” kijelentésnek?',
        options: [
          '„Péter nem vásárolt almát ÉS nem vásárolt körtét sem”',
          '„Péter nem vásárolt almát, vagy nem vásárolt körtét”',
          '„Péter szilvát vásárolt”',
          '„Péter csak almát vásárolt, körtét nem”'
        ],
        correctAnswer: 0,
        hint: 'A VAGY tagadása az ÉS: egyik sem valósulhat meg.',
        explanation: 'A megengedő vagy állítás tagadása akkor igaz, ha sem az alma, sem a körte vásárlása nem valósult meg: ¬(A ∨ B) ⟺ ¬A ∧ ¬B.'
      },
      {
        id: 'ttq1-6',
        questionTypeBadge: 'Igazságtáblázat Sorméret',
        question: 'Hány soros igazságtáblázat szükséges az (A ∧ B) ∨ (C ∧ D) formula minden lehetséges esetének lefedéséhez?',
        options: [
          '16 sor (2⁴ = 16, mivel 4 független változó van: A, B, C, D)',
          '8 sor (2³ = 8)',
          '4 sor (2 × 2)',
          '10 sor (4 + 4 + 2)'
        ],
        correctAnswer: 0,
        hint: 'Számold meg a különböző betűket a formulában! Minden változóhoz 2-es szorzó tartozik.',
        explanation: 'A formulában 4 független logikai változó szerepel: A, B, C és D. A lehetséges igazságérték-kombinációk száma 2⁴ = 16.'
      },
      {
        id: 'ttq1-7',
        questionTypeBadge: 'Táblázat Oszlopainak Sorrendje',
        question: 'Ha a ¬(A ∨ B) kifejezést lépésről lépésre szeretnénk táblázattal kiszámítani, melyik oszlopsorrend a logikailag helyes és szokásos?',
        options: [
          '1. oszlop: A; 2. oszlop: B; 3. oszlop: A ∨ B; 4. oszlop: ¬(A ∨ B)',
          '1. oszlop: ¬A; 2. oszlop: ¬B; 3. oszlop: ¬(A ∨ B)',
          '1. oszlop: A ∨ B; 2. oszlop: A; 3. oszlop: B',
          '1. oszlop: A; 2. oszlop: ¬(A ∨ B)'
        ],
        correctAnswer: 0,
        hint: 'Először az alapváltozók értékeit vesszük fel, majd a zárójeles részeredményt, végül a külső műveletet!',
        explanation: 'A szisztematikus táblázatkészítésnél először a bemeneti változók (A, B) kapnak oszlopot, majd a zárójelben lévő részformula (A ∨ B), végül a zárójel tagadása (¬(A ∨ B)).'
      },
      {
        id: 'ttq1-8',
        questionTypeBadge: 'A ¬(A ∧ B) Értékei',
        question: 'Az alábbiak közül melyik a ¬(A ∧ B) kifejezés pontos értéksora az (I,I), (I,H), (H,I), (H,H) bemeneti sorokban?',
        options: [
          'H, I, I, I (csak az első sorban hamis, a többiben igaz)',
          'I, H, H, H (csak az első sorban igaz)',
          'H, H, H, I (csak az utolsó sorban igaz)',
          'I, I, I, I (mindenhol igaz)'
        ],
        correctAnswer: 0,
        hint: 'Az A ∧ B értékei sorban: I, H, H, H. Ennek kell a tagadását venni minden sorban!',
        explanation: 'Mivel A ∧ B kizárólag az (I,I) esetben ad I-t (a többi háromban H-t), ennek tagadása az első sorban H, a többi három sorban pedig I értéket vesz fel: [H, I, I, I].'
      },
      {
        id: 'ttq1-9',
        questionTypeBadge: 'A ¬(A ∨ B) Értékei',
        question: 'Melyik a ¬(A ∨ B) kifejezés pontos értéksora az (I,I), (I,H), (H,I), (H,H) bemeneti sorokban?',
        options: [
          'H, H, H, I (csak a mindkét változó hamis esetben igaz)',
          'I, H, H, H (csak az első sorban igaz)',
          'H, I, I, I (három sorban igaz)',
          'H, I, H, I (váltakozó értékek)'
        ],
        correctAnswer: 0,
        hint: 'Az A ∨ B értékei: I, I, I, H. Tagadd meg soronként!',
        explanation: 'Az A ∨ B diszjunkció az első három sorban igaz, és csak a (H,H) sorban hamis. Tagadása így az első három sorban H, az utolsóban I: [H, H, H, I].'
      },
      {
        id: 'ttq1-10',
        questionTypeBadge: 'Halmazműveleti Megfelelés',
        question: 'A halmazelmélet melyik azonossága felel meg a ¬(A ∧ B) ⟺ ¬A ∨ ¬B logikai De Morgan-szabálynak?',
        options: [
          'A metszet komplementere a komplementerek uniója: (A ∩ B) komplementere = A komplementer ∪ B komplementer',
          'Az unió komplementere a komplementerek uniója',
          'A ∩ A komplementer = üres halmaz',
          'A ∪ A komplementer = alaphalmaz'
        ],
        correctAnswer: 0,
        hint: 'A konjunkció (∧) a metszetnek (∩), a diszjunkció (∨) az uniónak (∪), a tagadás pedig a komplementerképzésnek felel meg.',
        explanation: 'A logikai konjunkció pontos halmazelméleti megfelelője a metszet. Így a metszet komplementere a halmazok komplementereinek uniójával egyenlő.'
      }
    ]
  },
  2: {
    level: 2,
    title: 'Elemzés, Tautológiák és Tankönyvi Rejtvények',
    subtitle: 'Tautológiák és kontradikciók felismerése, a tündék ládája és a 3 indián logikai feladványa.',
    range: '11–20. feladat',
    focus: 'Tautológia, kontradikció, Tündék 3 ládája, Indiánok ruhái, szekrények tagadása',
    questions: [
      {
        id: 'ttq2-1',
        questionTypeBadge: 'Tautológia Fogalma',
        question: 'Mit nevezünk a logikában TAUTOLÓGIÁNAK (azonosan igaz állításnak)?',
        options: [
          'Olyan összetett kifejezést, amely a változók bármely igazságértéke mellett mindig IGAZ (minden sorban I áll)',
          'Olyan állítást, amely pontosan akkor igaz, ha minden tagja hamis',
          'Olyan kifejezést, amely ellentmondást tartalmaz, és sosem lehet igaz',
          'Olyan logikai állítást, amely nem dönthető el matematikailag'
        ],
        correctAnswer: 0,
        hint: 'Például az „Esik az eső vagy nem esik az eső” (A ∨ ¬A) kifejezés minden időjárási helyzetben igaz.',
        explanation: 'A tautológia olyan logikai formula, amely a benne szereplő egyszerű kijelentések logikai értékeitől függetlenül mindig, minden sorban IGAZ (1) értéket ad.'
      },
      {
        id: 'ttq2-2',
        questionTypeBadge: 'Kontradikció Fogalma',
        question: 'Mit nevezünk a logikában KONTRADIKCIÓNAK (ellentmondásnak)?',
        options: [
          'Olyan kifejezést, amely a változók bármely igazságérték-kombinációjára mindig HAMIS (minden sorban H áll)',
          'Olyan formulát, amely legalább egy esetben igaz értéket ad',
          'Két egymást kizáró állítás együttes tagadását',
          'Olyan állítást, melynek tagadása szintén hamis'
        ],
        correctAnswer: 0,
        hint: 'Az A ∧ ¬A („Péter 16 éves és Péter nem 16 éves”) soha semmilyen esetben nem lehet igaz.',
        explanation: 'A kontradikció (azonosan hamis formula) az igazságtáblázatának minden sorában HAMIS értéket vesz fel, mert logikai képtelenséget, ellentmondást fogalmaz meg.'
      },
      {
        id: 'ttq2-3',
        questionTypeBadge: 'Tankönyv: Tündék 3 Ládája',
        question: 'A tündék tömlöcében 3 láda van feliratokkal:\n1. láda: „A kulcs ebben van.”\n2. láda: „A kulcs nincs ebben.”\n3. láda: „A kulcs nincs az 1. ládában.”\nA tündék elárulják, hogy A HÁROM FELIRAT KÖZÜL CSAK EGY IGAZ! Melyik ládában van a kulcs?',
        options: [
          'A 2. ládában (ekkor az 1. felirat H, a 2. felirat H, a 3. felirat I: pontosan egy igaz!)',
          'Az 1. ládában (ekkor az 1. és a 2. felirat is igaz lenne, ami ellentmondás)',
          'A 3. ládában (ekkor két felirat is igaz lenne)',
          'Egyik ládában sincs kulcs'
        ],
        correctAnswer: 0,
        hint: 'Végezz esetelemzést! Ha a kulcs az 1.-ben lenne: az 1. és 2. felirat is igaz lenne (kettő igaz). Ha a 2.-ban van: 1. felirat H, 2. felirat H, 3. felirat I.',
        explanation: 'Ha a kulcs a 2. ládában van: 1. felirat („ebben van”) = H; 2. felirat („nincs ebben”) = H; 3. felirat („nincs az 1.-ben”) = I. Így pontosan egy felirat igaz! Minden más esetben több igaz felirat keletkezne.'
      },
      {
        id: 'ttq2-4',
        questionTypeBadge: 'Tankönyv: 3 Indián és Ruháik',
        question: 'Fehér Tigris, Szürke Egér és Sárga Irigység a tűz körül ülnek. Fehér Tigris megszólal: „Egyikünk sárga, másikunk fehér, harmadikunk szürke ruhát visel, de senki sem olyan színűt, mint a neve!” Mire a sárga ruhás azt mondja: „Valóban!”. Milyen színű ruhát visel Szürke Egér?',
        options: [
          'Sárga ruhát',
          'Fehér ruhát',
          'Szürke ruhát',
          'Nem dönthető el a megadott adatokból'
        ],
        correctAnswer: 0,
        hint: 'Fehér Tigris beszélt a sárga ruháshoz, tehát Fehér Tigris nem viselhet sárga ruhát! Fehér ruhát sem viselhet a neve miatt. Akkor Fehér Tigris csak szürke lehet!',
        explanation: 'Fehér Tigris nem viselhet fehér ruhát (név miatt) és sárga ruhát sem (mert a sárga ruhás válaszolt neki). Tehát Fehér Tigris szürke ruhában van! Szürke Egér nem veheti fel a szürke ruhát, és a fehéret sem (mert akkor Sárga Irigység kapná a sárgát, ami tilos). Így Szürke Egér SÁRGA ruhát visel!'
      },
      {
        id: 'ttq2-5',
        questionTypeBadge: 'Tankönyv: Szekrények Tagadása',
        question: 'A tankönyv 20. oldalán szerepel a feladat: „A szobában minden szekrény barna vagy kétajtós.” Hogyan hangzik ennek a precíz tagadása?',
        options: [
          '„Van a szobában olyan szekrény, amely nem barna ÉS nem kétajtós”',
          '„Minden szekrény nem barna vagy nem kétajtós”',
          '„Nincs olyan szekrény, amely barna és kétajtós”',
          '„Van olyan szekrény, amely barna, de nem kétajtós”'
        ],
        correctAnswer: 0,
        hint: 'A „Minden...” tagadása: „Van olyan...”. A belső VAGY tagadása De Morgan szerint: ÉS (mindkét tulajdonság hiányzik).',
        explanation: 'Két lépés: 1) A „Minden szekrény P” állítás tagadása: „Van olyan szekrény, amelyre nem P”. 2) A „barna vagy kétajtós” tagadása De Morgan szerint: „nem barna ÉS nem kétajtós”. Így: „Van olyan szekrény, ami nem barna és nem kétajtós”.'
      },
      {
        id: 'ttq2-6',
        questionTypeBadge: 'Tankönyv: Biciklik Tagadása',
        question: 'Mi a tagadása a következő állításnak: „Van a garázsban olyan bicikli, amely kényelmes és jól felszerelt”?',
        options: [
          '„A garázsban minden bicikli kényelmetlen VAGY nincs jól felszerelve”',
          '„A garázsban minden bicikli kényelmetlen és nincs jól felszerelve”',
          '„Nincs a garázsban egyetlen bicikli sem”',
          '„Van olyan bicikli, amelyik se nem kényelmes, se nem felszerelt”'
        ],
        correctAnswer: 0,
        hint: 'A „Van olyan...” tagadása: „Minden...”. Az „ÉS” tagadása De Morgan szerint: „VAGY”.',
        explanation: 'A létezési kvantor tagadása univerzális: „minden biciklire igaz, hogy nem (kényelmes és jól felszerelt)”. A De Morgan-szabály miatt ez: „minden bicikli kényelmetlen VAGY nincs jól felszerelve”.'
      },
      {
        id: 'ttq2-7',
        questionTypeBadge: 'Ekvivalencia Táblázattal',
        question: 'Mikor tekintünk két logikai kifejezést (F₁ és F₂) logikailag egyenértékűnek (ekvivalensnek)?',
        options: [
          'Ha az igazságtáblázatuk eredményoszlopa a változók minden lehetséges értékkombinációjában (minden sorban) megegyezik',
          'Ha legalább egy sorban azonos értéket adnak',
          'Ha mindkét kifejezésben azonos számú műveleti jel szerepel',
          'Ha a kifejezések tagadása tautológia'
        ],
        correctAnswer: 0,
        hint: 'Két logikai állítás akkor ekvivalens (F₁ ⟺ F₂), ha minden elképzelhető helyzetben ugyanazt az igazságértéket adják.',
        explanation: 'Két logikai kifejezés logikailag ekvivalens, ha az igazságtáblázatuk záró oszlopa sorról sorra megegyezik. A De Morgan-azonosságokat éppen ezzel a módszerrel bizonyítjuk 4 soros táblázattal.'
      },
      {
        id: 'ttq2-8',
        questionTypeBadge: '3 Változós Táblázat Sorai',
        question: 'Egy A, B, C változókból álló 8 soros igazságtáblázatban hány olyan sor található, ahol pontosan két változó értéke IGAZ és egy változó értéke HAMIS?',
        options: [
          '3 sor (I-I-H, I-H-I, H-I-I)',
          '2 sor',
          '4 sor',
          '1 sor'
        ],
        correctAnswer: 0,
        hint: 'Hányféleképpen választható ki a 3 változó közül az az 1, amelyik hamis?',
        explanation: 'A 3 változó közül a hamis lehet a C (I-I-H), a B (I-H-I) vagy az A (H-I-I). Ez a kombinatorika szerint pontosan 3 különböző sort jelent a táblázatban.'
      },
      {
        id: 'ttq2-9',
        questionTypeBadge: 'Diszjunkció és Tagadás',
        question: 'Milyen logikai tulajdonságú az (A ∨ B) ∨ ¬A kifejezés?',
        options: [
          'Tautológia (mindig IGAZ, mert az A ∨ ¬A részformula miatt minden sorban igaz értéket kap)',
          'Kontradikció (mindig HAMIS)',
          'Kontingens (B értékétől függően lehet igaz vagy hamis)',
          'Nem határozható meg igazságtáblázat nélkül'
        ],
        correctAnswer: 0,
        hint: 'A diszjunkció asszociatív: (A ∨ ¬A) ∨ B. Mi az értéke az A ∨ ¬A kizárt harmadik törvényének?',
        explanation: 'A VAGY művelet tetszőlegesen csoportosítható: (A ∨ ¬A) ∨ B. Mivel A ∨ ¬A mindig IGAZ (kizárt harmadik), és IGAZ ∨ B bármilyen B esetén IGAZ, a kifejezés tautológia.'
      },
      {
        id: 'ttq2-10',
        questionTypeBadge: 'Tankönyv: Idézetek Tagadása',
        question: 'A tankönyv 20. oldalán Babits Mihály idézete: „Mindenik embernek a lelkében dal van.” Melyik állítás fejezi ki ennek a pontos tagadását?',
        options: [
          '„Van olyan ember, akinek a lelkében nincs dal”',
          '„Egyik ember lelkében sincs dal”',
          '„Minden ember lelkében nincs dal”',
          '„Van olyan dal, ami minden ember lelkében ott van”'
        ],
        correctAnswer: 0,
        hint: 'A „Minden A rendelkezik B tulajdonsággal” állítást már egyetlen ellenpélda is cáfolja!',
        explanation: 'Az univerzális kijelentés tagadása az, hogy létezik legalább egy olyan ember, akire ez nem igaz: „Van olyan ember, akinek a lelkében nincs dal”.'
      }
    ]
  },
  3: {
    level: 3,
    title: 'Mély Levezetések, Einstein-rács és Smullyan-rejtvények',
    subtitle: 'Kvarkus szobái, 4 iskolás úszóverseny logikai rácsa, XOR kapuk és összetett táblázatos levezetések.',
    range: '21–30. feladat',
    focus: 'Kvarkus feladvány, Einstein úszóverseny, XOR, 3 változós De Morgan, abszorpció',
    questions: [
      {
        id: 'ttq3-1',
        questionTypeBadge: 'Tankönyv: Kvarkus 1. Emelet',
        question: 'Kvarkus tornyának 1. emeletén két ajtó van. Az 1. ajtón: „Ebben a szobában lány van, a másikban szörny.” A 2. ajtón: „Az egyik szobában lány van, a másikban szörny.” Kvarkus elárulja: AZ EGYIK FELIRAT IGAZ, A MÁSIK HAMIS. Melyik ajtót érdemes kinyitnia Kovalens Kapitánynak?',
        options: [
          'A 2. szobát, mert ott biztosan lány van (az 1. felirat hamis, a 2. igaz, mindkét szobában lány van!)',
          'Az 1. szobát, mert a felirata igaz',
          'Mindegy, mindkét szobában szörny lapul',
          'Egyik ajtót sem szabad kinyitni, mert mindkettő mögött szörny van'
        ],
        correctAnswer: 0,
        hint: 'Ha az 1. ajtó felirata igaz lenne, akkor az 1.-ben lány lenne, a 2.-ban szörny. De ekkor a 2. ajtó felirata is automatikusan igaz lenne! De egyszerre nem lehet mindkettő igaz!',
        explanation: 'Ha az 1. felirat igaz, akkor a 2. felirat is automatikusan igaz (ami ellentmond annak, hogy az egyik hamis). Tehát az 1. felirat biztosan HAMIS. Mivel az egyiknek igaznak kell lennie, a 2. felirat IGAZ! A 2. felirat szerint egyikben lány, másikban szörny van. Mivel az 1. felirat hamis, az 1. szobában nem lehet lány, így a lány a 2. szobában van!'
      },
      {
        id: 'ttq3-2',
        questionTypeBadge: 'Tankönyv: Úszóverseny Döntő',
        question: 'A 4 iskola (Aranyhegyi, János-hegyi, Lakihegyi, Pál-völgyi) 4 pályás úszóversenyén: szélső pálya nyert; a fekete sapkás a sárga és kék közé került; csak egy úszó helyezése egyezett a pályaszámával (nem a győztes); a lakihegyis fekete sapkás volt; az aranyhegyis és lakihegyis pályája nem volt szomszédos; jános-hegyisnek belső pálya jutott. MELYIK ISKOLA NYERTE A VERSENYT?',
        options: [
          'A Pál-völgyi iskola versenyzője',
          'Az Aranyhegyi iskola versenyzője',
          'A János-hegyi iskola versenyzője',
          'A Lakihegyi iskola versenyzője'
        ],
        correctAnswer: 0,
        hint: 'A fekete sapkás (lakihegyis) két sapka között úszott, tehát csak a 2. vagy 3. belső pályán lehetett. János-hegyi is belső pályás volt. Az aranyhegyis nem lehetett szomszédos a lakihegyissel. Ki maradt a szélső nyertes pályára?',
        explanation: 'A logikai rács szisztematikus kizárásával: a lakihegyis (fekete sapkás) belső pályán úszott (2-es vagy 3-as, mert sárga és kék között volt). A jános-hegyis szintén belső pályás volt. Így a szélső pályákra (1-es és 4-es) az aranyhegyis és a pál-völgyi került. Az aranyhegyis helyezési korlátai kizárják a győzelmet, így a versenyt a Pál-völgyi iskola úszója nyerte a 4-es pályán!'
      },
      {
        id: 'ttq3-3',
        questionTypeBadge: 'Tankönyv: Úszóverseny Sapkaszín',
        question: 'Az előző úszóverseny logikai rácsának levezetéséből: milyen színű sapkában úszott a 3. helyezett versenyző?',
        options: [
          'Sárga sapkában (a sárga sapkás úszott a 3. és 4. helyezett között a pályákon)',
          'Fekete sapkában',
          'Piros sapkában',
          'Kék sapkában'
        ],
        correctAnswer: 0,
        hint: 'Vizsgáld meg a feladat azon feltételét: „A sárga sapkás a 3. és 4. helyezett között úszott.”',
        explanation: 'A feltétel szerint a sárga sapkás a 3. és 4. helyezett közötti pályán úszott, ami a rács szisztematikus kitöltése és a sapkák sorrendjének összevetése után a 3. helyezett számára sárga sapkát eredményez.'
      },
      {
        id: 'ttq3-4',
        questionTypeBadge: 'De Morgan 3 Változóra',
        question: 'Hogyan általánosítható a De Morgan-azonosság 3 állítás konjunkciójára: ¬(A ∧ B ∧ C)?',
        options: [
          '¬A ∨ ¬B ∨ ¬C (legalább az egyik tagnak hamisnak kell lennie)',
          '¬A ∧ ¬B ∧ ¬C (mindhárom tagnak hamisnak kell lennie)',
          '¬(A ∨ B ∨ C)',
          '(A ∧ B) ∨ ¬C'
        ],
        correctAnswer: 0,
        hint: 'A zárójelezés segítségével lépésenként: ¬((A ∧ B) ∧ C) = ¬(A ∧ B) ∨ ¬C. Bontsd ki a bal oldalt is!',
        explanation: 'Egymás utáni alkalmazással: ¬((A ∧ B) ∧ C) = ¬(A ∧ B) ∨ ¬C = ¬A ∨ ¬B ∨ ¬C. Az állítás akkor hamis, ha legalább az egyik összetevő hamis.'
      },
      {
        id: 'ttq3-5',
        questionTypeBadge: 'Kizáró VAGY vs Megengedő VAGY',
        question: 'Miben különbözik a KIZÁRÓ VAGY (XOR, ⊕) igazságtáblázata a klasszikus MEGENGEDŐ VAGY (∨) táblázatától?',
        options: [
          'Az (I, I) sorban: a kizáró vagy HAMIS-at ad (nem lehet mindkettő igaz), míg a megengedő vagy IGAZ-at ad',
          'A (H, H) sorban: a kizáró vagy igazat ad',
          'Minden sorban pontosan ellentétes az értékük',
          'Nincs különbség, a matematikában a két fogalom azonos'
        ],
        correctAnswer: 0,
        hint: '„Vagy Péter, vagy Pál jön el, de nem mindketten egyszerre!” – mi történik, ha mindketten eljönnek?',
        explanation: 'A megengedő vagy (diszjunkció) akkor is IGAZ, ha mindkét állítás egyszerre igaz (I ∨ I = I). A kizáró vagy (XOR) ezzel szemben megköveteli, hogy pontosan az egyik legyen igaz, így (I, I) esetén értéke HAMIS.'
      },
      {
        id: 'ttq3-6',
        questionTypeBadge: 'Boole-algebra Elnyelési Törvény',
        question: 'Milyen egyszerűbb formára redukálható az A ∧ (A ∨ B) kifejezés az igazságtáblázat kiértékelése alapján?',
        options: [
          'Egyszerűen A-ra (elnyelési törvény / abszorpció)',
          'B-re',
          'A ∧ B-re',
          'Tautológiára (mindig igaz)'
        ],
        correctAnswer: 0,
        hint: 'Készíts 4 soros táblázatot! Ha A = I, a kifejezés I ∧ (I ∨ B) = I ∧ I = I. Ha A = H, akkor H ∧ (H ∨ B) = H.',
        explanation: 'Az A ∧ (A ∨ B) értéke minden sorban megegyezik A logikai értékével. Ha A igaz, az egész igaz; ha A hamis, a konjunkció miatt az egész hamis. Ez az abszorpciós (elnyelési) törvény.'
      },
      {
        id: 'ttq3-7',
        questionTypeBadge: 'Negált Konjunkció és Implikáció',
        question: 'Az informatikában és logikában a ¬A ∨ B kifejezés oszlopa pontosan megegyezik egy alapvető művelet táblázatával. Melyikkel?',
        options: [
          'A feltételes következtetésével (implikáció: A ⇒ B, „ha A, akkor B”)',
          'Az egyenértékűségével (ekvivalencia: A ⟺ B)',
          'A kizáró vagyéval (A ⊕ B)',
          'A konjunkcióéval (A ∧ B)'
        ],
        correctAnswer: 0,
        hint: 'A táblázat értékei: (I,I) -> I; (I,H) -> H; (H,I) -> I; (H,H) -> I. Csak akkor hamis, ha az előtag igaz és az utótag hamis!',
        explanation: 'Az A ⇒ B (implikáció) definíció szerint ekvivalens a ¬A ∨ B kifejezéssel. Egy feltételes ígéret csak akkor sérül, ha a feltétel teljesült, de a következmény nem.'
      },
      {
        id: 'ttq3-8',
        questionTypeBadge: 'Tankönyv: Tündék Ládája (1 Hamis eset)',
        question: 'Tegyük fel, hogy a tündék feladványában a 3 felirat közül NEM CSAK EGY IGAZ, HANEM PONTOSAN CSAK EGY HAMIS (és kettő igaz)!\n1. láda: „A kulcs ebben van.”\n2. láda: „A kulcs nincs ebben.”\n3. láda: „A kulcs nincs az 1. ládában.”\nMelyik ládában van ekkor a kulcs?',
        options: [
          'Az 1. ládában (ekkor 1. felirat = I, 2. felirat = I, 3. felirat = H: pontosan egy hamis!)',
          'A 2. ládában',
          'A 3. ládában',
          'Ekkor sincs egyértelmű megoldás'
        ],
        correctAnswer: 0,
        hint: 'Ha a kulcs az 1. ládában van: 1. felirat igaz („ebben van”). 2. felirat igaz („nincs a 2.-ban”). 3. felirat hamis („nincs az 1.-ben”, holott ott van!).',
        explanation: 'Ha a kulcs az 1. ládában található: az 1. állítás IGAZ; a 2. állítás IGAZ (mivel a 2.-ban tényleg nincs kulcs); a 3. állítás HAMIS (mivel az állítja, hogy nincs az 1.-ben). Így pontosan 1 felirat hamis és 2 igaz!'
      },
      {
        id: 'ttq3-9',
        questionTypeBadge: 'Táblázat Elemzés: ¬(A ∧ ¬B)',
        question: 'Melyik bemeneti pár esetén vesz fel HAMIS értéket a ¬(A ∧ ¬B) összetett kifejezés?',
        options: [
          'Kizárólag akkor, ha A = IGAZ és B = HAMIS',
          'Ha mindkét változó IGAZ',
          'Ha mindkét változó HAMIS',
          'Ha A = HAMIS és B = IGAZ'
        ],
        correctAnswer: 0,
        hint: 'A kifejezés egy negáció (¬). Mikor lesz a tagadás hamis? Ha a belső rész (A ∧ ¬B) IGAZ!',
        explanation: 'A ¬X akkor és csak akkor hamis, ha X igaz. Itt X = A ∧ ¬B. Ez a konjunkció kizárólag akkor igaz, ha A = IGAZ és ¬B = IGAZ (azaz B = HAMIS). Minden más esetben a formula IGAZ értéket ad.'
      },
      {
        id: 'ttq3-10',
        questionTypeBadge: 'Geometriai és Logikai Szintézis',
        question: 'Tekintsük a következő két geometriai állítást:\nA: „A négyzet minden szöge derékszög.”\nB: „A rombusz átlói mindig merőlegesek egymásra.”\nMi a ¬(A ∧ B) kifejezés igazságértéke?',
        options: [
          'HAMIS, mert mindkét geometriai tétel IGAZ (I ∧ I = I), így a konjunkció tagadása HAMIS',
          'IGAZ, mert a De Morgan-szabály miatt az érték megfordul',
          'Nem határozható meg a derékszög definíciója nélkül',
          'Csak akkor igaz, ha a rombusz nem négyzet'
        ],
        correctAnswer: 0,
        hint: 'Először külön-külön állapítsd meg A és B igazságértékét a geometriai tételekből!',
        explanation: 'A négyzet definíció szerint derékszögű (A = IGAZ). A rombusz átlói merőlegesek egymásra (B = IGAZ). Mivel mindkettő igaz: A ∧ B = IGAZ. Ennek tagadása ¬(IGAZ) = HAMIS.'
      }
    ]
  }
};

export const TruthTableQuiz: React.FC<TruthTableQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="4. Igazságtáblázatok és De Morgan Kvíz"
      subtitle="Esetelemzés, igazságtáblázatok szerkesztése, De Morgan-azonosságok és híres logikai rejtvények"
      badge="10. Osztály • I. Logika"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      chapterId="logika"
      topicId="g10-logic-tablazat"
      topicTitle="4. Igaz vagy hamis? Foglaljuk táblázatba!"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • Igazságtáblázatok és De Morgan"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <TruthTableMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TruthTableSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TruthTableQuiz;

