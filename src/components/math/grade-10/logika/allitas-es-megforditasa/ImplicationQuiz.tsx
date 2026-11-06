import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ImplicationMatcher } from './ImplicationMatcher';
import { ImplicationSorter } from './ImplicationSorter';
import {
  ImplicationVennSvg,
  SufficientNecessarySvg,
  TruthTableImplicationSvg,
  EquivalenceParallelogramSvg
} from './ImplicationFigures';

interface ImplicationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Az Implikáció és Ellenpélda (A ⇒ B)',
    description: 'Az A ⇒ B („Ha A, akkor B”) pontosan akkor HAMIS, ha a feltétel (A) igaz, de a következmény (B) hamis. Minden más esetben IGAZ!',
    note: 'Cáfolathoz egyetlen ellenpélda elegendő! Pl. „3-mal osztható → 6-tal is” hamis, ellenpélda a 9.',
    color: 'from-blue-600 to-indigo-700',
    figure: <ImplicationVennSvg size={180} />
  },
  {
    title: 'Szükséges és Elégséges Feltételek',
    description: 'Ha A ⇒ B igaz:\n• A elégséges feltétele B-nek (önmagában elég hozzá)\n• B szükséges feltétele A-nak (nélkülözhetetlen velejárója)',
    note: 'Pl. négyzetnek lenni elég a téglalaphoz, de téglalapnak lenni még nem elég a négyzethez, csak szükséges!',
    color: 'from-indigo-600 to-purple-700',
    figure: <SufficientNecessarySvg size={180} />
  },
  {
    title: 'Eredeti és Megfordítás Táblázata',
    description: 'Az A ⇒ B és B ⇒ A nem ekvivalensek! Az (I, H) és (H, I) sorokban ellentétes értéket adnak.',
    note: 'Egy igaz tétel megfordítása lehet igaz, de lehet hamis is!',
    color: 'from-amber-600 to-orange-700',
    figure: <TruthTableImplicationSvg size={180} />
  },
  {
    title: 'Ekvivalencia (A ⟺ B)',
    description: 'Kétirányú következtetés: A ⇒ B ÉS B ⇒ A egyszerre teljesül („akkor és csak akkor”).',
    note: 'A jó matematikai definíciók mindig ekvivalenciák (pl. paralelogramma ekvivalens tulajdonságai).',
    color: 'from-emerald-600 to-teal-700',
    figure: <EquivalenceParallelogramSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: 'Alapfogalmak és az Implikáció Működése',
    subtitle: 'Feltételes állítások definíciója, az egyetlen hamis eset, ellenpéldák és a megfordítás fogalma.',
    range: '1–10. feladat',
    focus: 'A ⇒ B szabálya, előtag/utótag, ellenpélda keresése, tankönyvi alapfeladatok',
    questions: [
      {
        id: 'iq1-1',
        questionTypeBadge: 'Implikáció Szabálya',
        question: 'Mikor HAMIS az A ⇒ B („Ha A, akkor B”) feltételes logikai kijelentés?',
        options: [
          'Kizárólag akkor, ha az A feltétel IGAZ, de a B következmény mégis HAMIS (I ⇒ H = H)',
          'Minden olyan esetben, amikor az A feltétel hamis',
          'Ha mindkét összetevő állítás hamis',
          'Ha az A és B állítások közül legalább az egyik hamis'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy ígéretre: „Ha ötöst kapsz, kapsz csokit.” Mikor szeged meg az ígéretedet?',
        explanation: 'Az implikáció (A ⇒ B) kizárólag egyetlen esetben sérül: ha a feltétel teljesült (A igaz), de a megígért következmény elmaradt (B hamis). Ha a feltétel nem teljesül (A hamis), az ígéret nem sérülhet, így az implikáció igaz marad!'
      },
      {
        id: 'iq1-2',
        questionTypeBadge: 'Tankönyv 24. oldal (Bevezető)',
        question: 'Tekintsük az állítást: „Ha egy szám osztható 6-tal, akkor osztható 3-mal is.” Mi ennek az állításnak a pontos megfordítása?',
        options: [
          '„Ha egy szám osztható 3-mal, akkor osztható 6-tal is.”',
          '„Ha egy szám nem osztható 6-tal, akkor nem osztható 3-mal sem.”',
          '„Egy szám akkor és csak akkor osztható 6-tal, ha osztható 3-mal.”',
          '„Minden szám osztható 6-tal és 3-mal is.”'
        ],
        correctAnswer: 0,
        hint: 'Az állítás megfordításakor egyszerűen felcseréljük a feltételt és a következményt (A és B sorrendjét)!',
        explanation: 'Az A ⇒ B állítás megfordítása definíció szerint a B ⇒ A állítás. Itt A = „a szám osztható 6-tal”, B = „a szám osztható 3-mal”, így megfordítása: „Ha egy szám osztható 3-mal, akkor osztható 6-tal is.”'
      },
      {
        id: 'iq1-3',
        questionTypeBadge: 'Ellenpélda Fogalma',
        question: 'Mi bizonyítja a matematikában egyértelműen, hogy a „Ha egy szám osztható 3-mal, akkor osztható 6-tal is” állítás HAMIS?',
        options: [
          'Egyetlen ellenpélda felmutatása (pl. a 9 vagy a 15 osztható 3-mal, de nem osztható 6-tal)',
          'Az, hogy a 6 nagyobb szám, mint a 3',
          'Az, hogy a 12 osztható mindkét számmal',
          'Az ellenpéldák arányának statisztikai vizsgálata'
        ],
        correctAnswer: 0,
        hint: 'Egy általános érvényű feltételes kijelentés megdöntéséhez hány kivétel szükséges?',
        explanation: 'A matematikában egy általános „Ha A, akkor B” kijelentés cáfolatához egyetlen olyan eset (ellenpélda) elegendő, amelyre a feltétel (A) teljesül, de a következmény (B) nem. A 9 osztható 3-mal, de 6-tal nem, így a megfordítás hamis!'
      },
      {
        id: 'iq1-4',
        questionTypeBadge: 'Hamis Feltételből Következtetés',
        question: 'Mi az igazságértéke a következő tankönyvi mondatnak: „Ha ma még élnek élő dinoszauruszok a Földön, akkor a 3 egy páros szám”?',
        options: [
          'IGAZ, mert hamis feltételből (H ⇒ H) képzett implikáció a klasszikus logikában mindig IGAZ',
          'HAMIS, mert a 3 nem páros szám',
          'HAMIS, mert nem élnek dinoszauruszok',
          'Nem határozható meg, mert a feltételnek nincs köze a számelmélethez'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg az implikáció igazságtáblázatát! Ha az előtag (A) értéke HAMIS, milyen értéket kap az A ⇒ B?',
        explanation: 'A klasszikus logikában az A ⇒ B csak akkor hamis, ha I ⇒ H. Ha az előtag (A: „élnek dinoszauruszok”) hamis, akkor a H ⇒ H és a H ⇒ I implikáció is IGAZ! (Ex falso sequitur quodlibet: hamis alapból bármi érvényesen következhet anélkül, hogy a szabály megsérülne).'
      },
      {
        id: 'iq1-5',
        questionTypeBadge: 'Tankönyv 24. oldal (Rovarok és Bogarak)',
        question: 'Melyik sorrendben IGAZ a „Ha..., akkor...” következtetés az A: „Ez az állat rovar” és B: „Ez az állat bogár” állítások között?',
        options: [
          'Ha B, akkor A (Ha egy állat bogár, akkor rovar is)',
          'Ha A, akkor B (Ha egy állat rovar, akkor bogár is)',
          'Mindkét irányban igaz (a bogár és a rovar szinonimák)',
          'Egyik irányban sem igaz'
        ],
        correctAnswer: 0,
        hint: 'Melyik a tágabb biológiai kategória (a halmaz), és melyik a szűkebb részhalmaz?',
        explanation: 'A bogarak a rovarok osztályának egyik rendjét alkotják. Minden bogár rovar, de nem minden rovar bogár (pl. a légy, szúnyog, hangya, méh mind rovar, de nem bogár). Ezért csak a B ⇒ A következtetés igaz!'
      },
      {
        id: 'iq1-6',
        questionTypeBadge: 'Tankönyv 24. oldal (Szabálysértés)',
        question: 'Pisti biciklivel közlekedik. A: „Pisti szabálysértést követett el.” B: „Pisti áthajtott a piroson.” Melyik következtetés IGAZ?',
        options: [
          'B ⇒ A (Ha Pisti áthajtott a piroson, akkor szabálysértést követett el)',
          'A ⇒ B (Ha Pisti szabálysértést követett el, akkor biztosan áthajtott a piroson)',
          'Mindkét irány igaz (ekvivalensek)',
          'Egyik sem igaz'
        ],
        correctAnswer: 0,
        hint: 'A piroson való áthajtás szabálysértés, de szabálysértést el lehet követni másképp is (pl. gyorshajtás, kötelező lámpa hiánya).',
        explanation: 'A piroson áthajtás biztosan szabálysértés (B ⇒ A igaz). Viszont ha valaki szabálysértést követett el, abból nem következik, hogy feltétlenül a piroson hajtott át, hiszen más szabályt is megszeghetett (A ⇒ B hamis).'
      },
      {
        id: 'iq1-7',
        questionTypeBadge: 'Prímszámok és Páratlanság',
        question: 'Miért HAMIS a következő állítás: „Ha egy természetes szám prímszám, akkor páratlan”?',
        options: [
          'Mert létezik ellenpélda: a 2 prímszám, mégsem páratlan',
          'Mert a 9 páratlan, de nem prím',
          'Mert a negatív számok nem prímek',
          'Mert az 1 nem prímszám'
        ],
        correctAnswer: 0,
        hint: 'Keresd azt a számot, amelyik kielégíti a feltételt (prím), de nem elégíti ki a következményt (nem páratlan)!',
        explanation: 'Az implikációt az az eset cáfolja, ahol a feltétel igaz, de a cél hamis. A 2 prímszám (feltétel igaz), de páros (nem páratlan, utótag hamis). Ez az egyetlen ellenpélda megdönti az állítást.'
      },
      {
        id: 'iq1-8',
        questionTypeBadge: 'Tankönyv 24. oldal (Paralelogramma és Trapéz)',
        question: 'C: „Egy négyszög trapéz.” D: „Egy négyszög paralelogramma.” Melyik állítás IGAZ az alábbiak közül?',
        options: [
          'D ⇒ C igaz (Ha paralelogramma, akkor trapéz is), de a megfordítása (C ⇒ D) hamis',
          'C ⇒ D igaz (Ha trapéz, akkor paralelogramma is), de a megfordítása hamis',
          'Mindkét irány igaz, a két fogalom egyenértékű',
          'Egyik irány sem igaz'
        ],
        correctAnswer: 0,
        hint: 'A trapéz definíciója: legalább egy párhuzamos oldalpárral rendelkező négyszög. A paralelogrammának 2 párhuzamos párja van.',
        explanation: 'Minden paralelogramma trapéz is (hiszen van legalább egy párhuzamos oldalpárja, sőt kettő is van), így D ⇒ C igaz. Visszafelé viszont nem igaz: egy húrtrapéznak csak egyetlen párhuzamos oldalpárja van, így nem paralelogramma.'
      },
      {
        id: 'iq1-9',
        questionTypeBadge: 'Közvetlen Megfordítás Igazságértéke',
        question: 'Ha tudjuk, hogy egy P állítás IGAZ, mit mondhatunk biztosan a megfordításának logikai értékéről?',
        options: [
          'Semmit: a megfordítás lehet igaz is, de lehet hamis is (külön meg kell vizsgálni)',
          'Biztosan igaz, mert az igazság megmarad a megfordításkor',
          'Biztosan hamis, mert a megfordítás mindig az ellentétét jelenti',
          'Csak akkor igaz, ha a tétel geometriai jellegű'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a szabályos háromszög példájára (mindkettő igaz) és a 6-tal való oszthatóságra (megfordítása hamis)!',
        explanation: 'Ez a logika egyik legfontosabb alapszabálya: egy állítás igazságából semmi nem következik a megfordítására nézve! Mind a 4 logikai értékpár (I-I, I-H, H-I, H-H) előfordul a matematikában.'
      },
      {
        id: 'iq1-10',
        questionTypeBadge: 'Következtetés Naptári Napokra',
        question: 'Mi a logikai értéke az állításnak és megfordításának: „Ha holnap kedd van, akkor tegnap vasárnap volt”?',
        options: [
          'Mind az eredeti állítás, mind a megfordítása IGAZ (a naptári napok sorrendje egyértelmű)',
          'Csak az eredeti igaz, a megfordítás hamis',
          'Csak a megfordítás igaz, az eredeti hamis',
          'Mindkettő hamis'
        ],
        correctAnswer: 0,
        hint: 'Ha holnap kedd, akkor ma hétfő, tehát tegnap vasárnap volt. Ha tegnap vasárnap volt, akkor ma hétfő, holnap kedd!',
        explanation: 'Ha holnap kedd van, a mai nap hétfő, tegnap pedig vasárnap volt (eredeti igaz). Fordítva: ha tegnap vasárnap volt, ma hétfő van, holnap kedd lesz (megfordítás is igaz). A két állítás ekvivalens.'
      }
    ]
  },
  2: {
    level: 2,
    title: 'Szükséges és Elégséges Feltételek, Geometriai Tételek',
    subtitle: 'A feltételek hierarchiája, ekvivalencia és egyenletek logikai vizsgálata.',
    range: '11–20. feladat',
    focus: 'Elégséges vs szükséges, A ⟺ B, paralelogramma tulajdonságai, szorzat és négyzetösszeg',
    questions: [
      {
        id: 'iq2-1',
        questionTypeBadge: 'Elégséges Feltétel Fogalma',
        question: 'Mit jelent a matematikában az, hogy az A tulajdonság ELÉGSÉGES feltétele a B tulajdonságnak?',
        options: [
          'Azt, hogy ha A teljesül, az már önmagában garantálja, hogy B is igaz (A ⇒ B igaz)',
          'Azt, hogy B nélkül A nem teljesülhet',
          'Azt, hogy A és B csak egyszerre lehet hamis',
          'Azt, hogy A az egyetlen lehetséges módja B bekövetkezésének'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a szóra: „elégséges” = elég annyit tudni róla, hogy A teljesül!',
        explanation: 'Az A elégséges feltétele B-nek azt jelenti, hogy A megléte már bőségesen elég ahhoz, hogy B is fennálljon. Azaz az A ⇒ B következtetés igaz.'
      },
      {
        id: 'iq2-2',
        questionTypeBadge: 'Szükséges Feltétel Fogalma',
        question: 'Mit jelent az, hogy a B tulajdonság SZÜKSÉGES feltétele az A tulajdonságnak?',
        options: [
          'Azt, hogy B megléte elengedhetetlen: ha B nem teljesül, A sem teljesülhet (¬B ⇒ ¬A, vagyis A ⇒ B)',
          'Azt, hogy ha B teljesül, akkor A is automatikusan igaz',
          'Azt, hogy B kizárja A létezését',
          'Azt, hogy B könnyebben bizonyítható, mint A'
        ],
        correctAnswer: 0,
        hint: 'Ha valami szükséges, anélkül nem jöhet létre az eredmény!',
        explanation: 'B szükséges feltétele A-nak azt jelenti, hogy B nélkülözhetetlen velejárója A-nak. Ha B nem teljesül, A biztosan nem állhat fenn. Ez logikailag pontosan megegyezik az A ⇒ B állítással.'
      },
      {
        id: 'iq2-3',
        questionTypeBadge: 'Négyzet és Téglalap Viszonya',
        question: 'Milyen viszonyban áll egymással a „négyszög négyzet” (A) és a „négyszög téglalap” (B) állítás?',
        options: [
          'A elégséges feltétele B-nek, de B csak szükséges (nem elégséges) feltétele A-nak',
          'B elégséges feltétele A-nak, de A csak szükséges feltétele B-nek',
          'A és B egymásnak szükséges és elégséges feltételei (ekvivalensek)',
          'Egyik sem szükséges és nem is elégséges feltétele a másiknak'
        ],
        correctAnswer: 0,
        hint: 'Négyzetnek lenni elég ahhoz, hogy téglalap legyen? Igen! Téglalapnak lenni elég ahhoz, hogy négyzet legyen? Nem feltétlenül!',
        explanation: 'Minden négyzet téglalap (tehát négyzetnek lenni elégséges). De nem minden téglalap négyzet, viszont a téglalapság elengedhetetlen ahhoz, hogy valami négyzet lehessen (tehát szükséges feltétel).'
      },
      {
        id: 'iq2-4',
        questionTypeBadge: 'Ekvivalencia Definíciója',
        question: 'Mikor mondjuk két logikai állításra (A és B), hogy EKVIVALENSEK (egyenértékűek, A ⟺ B)?',
        options: [
          'Ha a következtetés mindkét irányban igaz (A ⇒ B és B ⇒ A is teljesül, vagyis pontosan ugyanakkor igazak)',
          'Ha az A ⇒ B állítás igaz',
          'Ha legalább egy közös változót tartalmaznak',
          'Ha a tagadásuk megegyezik egymással'
        ],
        correctAnswer: 0,
        hint: 'Kétirányú nyíl: oda és vissza is igaz a következtetés!',
        explanation: 'Két állítás akkor és csak akkor ekvivalens (A ⟺ B), ha kölcsönösen következnek egymásból: A ⇒ B ÉS B ⇒ A is igaz. Ekkor az igazságértékük minden esetben azonos.'
      },
      {
        id: 'iq2-5',
        questionTypeBadge: 'Tankönyv 25. oldal (Egyenlet Szorzat)',
        question: 'Az (x + 3)(5 - x) = 0 szorzat AKKOR ÉS CSAK AKKOR egyenlő nullával valós számok esetén, ha:',
        options: [
          '(x + 3 = 0) VAGY (5 - x = 0)',
          '(x + 3 = 0) ÉS (5 - x = 0)',
          'x + 3 > 0 és 5 - x < 0',
          'x kizárólag pozitív egész szám lehet'
        ],
        correctAnswer: 0,
        hint: 'Egy szorzat mikor lesz 0? Ha legalább az egyik szorzótényezője 0!',
        explanation: 'Egy valós szorzat akkor és csak akkor nulla, ha legalább az egyik tényezője nulla. A matematikai logikában a „legalább az egyik” kapcsolatot a megengedő VAGY (diszjunkció) fejezi ki: (x + 3 = 0) ∨ (5 - x = 0).'
      },
      {
        id: 'iq2-6',
        questionTypeBadge: 'Tankönyv 25. oldal (Négyzetösszeg)',
        question: 'Az (x + 3)² + (5 - y)² = 0 összeg AKKOR ÉS CSAK AKKOR egyenlő nullával valós számokra, ha:',
        options: [
          '(x + 3 = 0) ÉS (5 - y = 0)',
          '(x + 3 = 0) VAGY (5 - y = 0)',
          'x + 3 = -(5 - y)',
          'x és y szorzata nulla'
        ],
        correctAnswer: 0,
        hint: 'Valós szám négyzete sosem negatív ($a^2 \\ge 0$). Két nemnegatív szám összege mikor lehet pontosan 0?',
        explanation: 'Mivel valós számok esetén a négyzetek nemnegatívak ($A^2 \\ge 0$ és $B^2 \\ge 0$), az összegük kizárólag akkor lehet 0, ha mindkét tag egyszerre 0! Ezért itt az ÉS (konjunkció) művelet kötelező: (x + 3 = 0) ∧ (5 - y = 0).'
      },
      {
        id: 'iq2-7',
        questionTypeBadge: 'Tankönyv 25. oldal (Paralelogramma)',
        question: 'Az alábbiak közül melyik NEM ekvivalens meghatározása a paralelogrammának?',
        options: [
          'Egy négyszög átlói egyenlő hosszúak',
          'Egy négyszög két szemközti oldala párhuzamos és egyenlő hosszúságú',
          'Egy négyszög szemközti szögei páronként egyenlők',
          'Egy négyszög középpontosan szimmetrikus'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a téglalapra és a szimmetrikus trapézra: az átlók egyenlősége melyikre jellemző?',
        explanation: 'Az átlók egyenlősége a téglalapokra (és húrtrapézokra) jellemző, nem minden paralelogrammára (pl. egy általános rombusz vagy ferde paralelogramma átlói különböző hosszúak!). A többi 3 állítás mind a paralelogramma pontos, ekvivalens tulajdonsága.'
      },
      {
        id: 'iq2-8',
        questionTypeBadge: 'Tankönyv 26. oldal (Tört Pozitivitása)',
        question: '„Ha egy tört értéke pozitív, akkor számlálója és nevezője is pozitív.” Mi az állítás és a megfordításának igazságértéke?',
        options: [
          'Az állítás HAMIS (pl. negatív/negatív is pozitív), de a megfordítása IGAZ',
          'Az állítás IGAZ, a megfordítása HAMIS',
          'Mindkét kijelentés IGAZ',
          'Mindkét kijelentés HAMIS'
        ],
        correctAnswer: 0,
        hint: 'Mi történik, ha mind a számláló, mind a nevező negatív szám? Pl. (-3) / (-5) = +0,6!',
        explanation: 'Az állítás hamis, mert a tört akkor is pozitív, ha mindkét tagja negatív: (-2)/(-3) = 2/3 > 0. A megfordítása viszont: „Ha a számláló és nevező is pozitív, a tört értéke pozitív” – ez nyilvánvalóan IGAZ!'
      },
      {
        id: 'iq2-9',
        questionTypeBadge: 'Oszthatóság 24-gyel és 8-cal',
        question: 'A: „Egy szám osztható 24-gyel.” B: „Egy szám osztható 8-cal.” Melyik állítás helyes?',
        options: [
          'A elégséges feltétele B-nek, de nem szükséges feltétele',
          'A szükséges feltétele B-nek, de nem elégséges',
          'A és B ekvivalens tulajdonságok',
          'A és B között nincs logikai kapcsolat'
        ],
        correctAnswer: 0,
        hint: 'A 24 = 3 · 8, tehát ha egy szám 24-gyel osztható, akkor 8-cal is. De fordítva: a 16 vagy 40 osztható 8-cal, de 24-gyel nem!',
        explanation: 'A 24 többszöröse a 8-nak, így ha egy szám osztható 24-gyel, az bőségesen elég ahhoz, hogy 8-cal is osztható legyen (elégséges feltétel). De nem szükséges, mert pl. a 16 vagy 40 is osztható 8-cal, mégsem osztható 24-gyel.'
      },
      {
        id: 'iq2-10',
        questionTypeBadge: 'Szabályos Háromszög és Szögek',
        question: 'A: „Egy háromszög szabályos.” B: „Egy háromszög minden szöge 60°-os.” Milyen feltételi viszonyban állnak?',
        options: [
          'Szükséges és elégséges feltételei egymásnak (A ⟺ B)',
          'A csak elégséges, de nem szükséges feltétele B-nek',
          'A csak szükséges, de nem elégséges feltétele B-nek',
          'Egyik sem következik a másikból'
        ],
        correctAnswer: 0,
        hint: 'Létezik-e olyan háromszög, amelyik szabályos, de nem minden szöge 60°? Vagy fordítva?',
        explanation: 'Egy háromszög akkor és csak akkor szabályos (egyenlő oldalú), ha minden belső szöge egyenlő (azaz 180° / 3 = 60°). A következtetés oda-vissza érvényes, a két fogalom ekvivalens.'
      }
    ]
  },
  3: {
    level: 3,
    title: 'Mély Logikai Összefüggések, Kontrapozíció és Rejtvények',
    subtitle: 'Az implikáció tagadása, indirekt bizonyítás (kontrapozíció), és tankönyvi rejtvények.',
    range: '21–30. feladat',
    focus: '¬(A ⇒ B), kontrapozíció (¬B ⇒ ¬A), kalandor feladvány, úszóverseny és bűnös nyomozása',
    questions: [
      {
        id: 'iq3-1',
        questionTypeBadge: 'Tankönyv 27. oldal (Implikáció Tagadása)',
        question: 'Mi a pontos logikai tagadása az A állításnak: „Ha vasárnap süt a nap, akkor elmegyünk kirándulni”?',
        options: [
          '„Vasárnap süt a nap, de nem megyünk kirándulni” (A ∧ ¬B)',
          '„Ha vasárnap nem süt a nap, akkor nem megyünk kirándulni”',
          '„Vasárnap nem süt a nap és nem kirándulunk”',
          '„Ha kirándulunk, akkor süt a nap”'
        ],
        correctAnswer: 0,
        hint: 'Egy feltételes ígéretet csak úgy cáfolhatsz meg, ha a feltétel teljesült, de a megígért cselekvés mégsem történik meg!',
        explanation: 'Az implikáció tagadásának szabálya: ¬(A ⇒ B) ⟺ A ∧ ¬B. Az ígéret akkor és csak akkor bukik el, ha süt a nap (A igaz), DE mégsem megyünk el kirándulni (B hamis). A „de” kötőszó logikailag konjunkció (ÉS).'
      },
      {
        id: 'iq3-2',
        questionTypeBadge: 'Kontrapozíció Elve',
        question: 'Melyik kijelentés logikailag TELJESEN EGYENÉRTÉKŰ az A ⇒ B implikációval (a kontrapozíció törvénye)?',
        options: [
          '¬B ⇒ ¬A („Ha nem B, akkor nem A”)',
          'B ⇒ A (a megfordítás)',
          '¬A ⇒ ¬B (a tagadások változatlan sorrendben)',
          '¬(A ∧ B)'
        ],
        correctAnswer: 0,
        hint: 'Ha valaki Budapesten van, Magyarországon van. Ha nincs Magyarországon, lehet-e Budapesten?',
        explanation: 'A kontrapozíció elve szerint az (A ⇒ B) és a (¬B ⇒ ¬A) kifejezések igazságtáblázata minden sorban megegyezik. Ha nem teljesül a következmény, akkor nem teljesülhetett a feltétel sem! Ezen alapulnak az indirekt bizonyítások.'
      },
      {
        id: 'iq3-3',
        questionTypeBadge: 'Tankönyv 27. oldal (Szám Négyzete)',
        question: 'Melyik valós számokra IGAZ, hogy a szám négyzete KISEBB, mint maga a szám (x² < x)?',
        options: [
          'Akkor és csak akkor, ha 0 < x < 1 (a 0 és 1 közötti pozitív törtekre)',
          'Minden negatív valós számra',
          'Minden 1-nél nagyobb számra',
          'Egyetlen valós számra sem, mert a négyzet mindig növeli a számot'
        ],
        correctAnswer: 0,
        hint: 'Számold ki: (0,5)² = 0,25. Kisebb-e a 0,25, mint a 0,5?',
        explanation: 'Az x² < x egyenlőtlenség átrendezve: x² - x < 0 ⟺ x(x - 1) < 0. Ez pontosan akkor teljesül, ha x és (x - 1) ellentétes előjelű, azaz 0 < x < 1. Pl. 0,5² = 0,25 < 0,5.'
      },
      {
        id: 'iq3-4',
        questionTypeBadge: 'Tankönyv 26. oldal (A Kalandor)',
        question: 'Egy kalandor hétfőn, szerdán, pénteken és vasárnap igazat mond, a többi napon hazudik. Melyik napon mondhatta: „Holnap hazudni fogok”?',
        options: [
          'Szombaton vagy vasárnap',
          'Csak hétfőn',
          'Csak pénteken',
          'Semelyik napon nem mondhatta ezt'
        ],
        correctAnswer: 0,
        hint: '1. eset: Ha ma igazmondó nap van, akkor holnap hazudnia kell! 2. eset: Ha ma hazudós nap van, akkor a holnapi hazugság állítása hazugság, tehát holnap igazat kell mondania!',
        explanation: 'Ha ma igazat mond, holnap hazudnia kell: igazmondó nap a vasárnap, amit hazudós hétfő követ (vasárnap mondhatta!). Ha ma hazudik, az állítása („holnap hazudok”) hamis, tehát holnap igazat mond: hazudós szombat után igazmondó vasárnap jön (szombaton is mondhatta!).'
      },
      {
        id: 'iq3-5',
        questionTypeBadge: 'Tankönyv 26. oldal (Úszók Versenye)',
        question: 'Aladár, Béla, Cecil és Dezső úszóversenyén nem volt holtverseny. Kijelentéseik: Aladár: „Sem első, sem utolsó nem lettem.”; Béla: „Nem én lettem az első.”; Cecil: „Én győztem.”; Dezső: „Utolsó lettem.” Tudjuk, hogy PONTOSAN EGY KIJELENTÉS HAMIS. Ki lett az első helyezett?',
        options: [
          'Cecil (ekkor Béla, Cecil, Aladár és Dezső kijelentései közül mind összhangban lehet, és csak egy hamis)',
          'Aladár',
          'Béla',
          'Dezső'
        ],
        correctAnswer: 0,
        hint: 'Két állítás ellentmond egymásnak: Béla nem első, Cecil győzött. Mi van, ha Cecil igazat mond? Ekkor Béla is igazat mond!',
        explanation: 'Ha Cecil győzött (Cecil I): ekkor Béla nem lett első (Béla I). Aladár nem lett sem első, sem utolsó (Aladár lehet 2. vagy 3. -> I). Dezső azt mondja, ő lett az utolsó. Ekkor vagy Dezső mond igazat (ha 4.), vagy Dezső állítása hamis (ha pl. 3., és más lett az utolsó). Mivel pontosan egy hamis kijelentés van, Cecil a győztes!'
      },
      {
        id: 'iq3-6',
        questionTypeBadge: 'Tankönyv 26. oldal (Ki a Bűnös?)',
        question: 'Aladár: „Béla a bűnös.” • Béla: „Aladár hazudik.” • Cecil: „Nem vagyok bűnös.” • Dezső: „Béla füllent.” Ha PONTOSAN EGY ÁLLÍTÁS IGAZ, ki követte el a bűntényt?',
        options: [
          'Cecil a bűnös',
          'Béla a bűnös',
          'Aladár a bűnös',
          'Dezső a bűnös'
        ],
        correctAnswer: 0,
        hint: 'Aladár és Béla egymásnak feszül: egyikük biztosan igazat mond, a másikuk hazudik! De ekkor az egyetlen igaz állítás már köztük van!',
        explanation: 'Mivel Aladár és Béla egymásnak közvetlenül ellentmond, közülük pontosan az egyik IGAZ, a másik HAMIS. Mivel az egész feladatban összesen EGYETLEN igaz állítás van, az egyetlen igazság vagy Aladáré, vagy Béláé! Ez azt jelenti, hogy Cecil kijelentése („Nem vagyok bűnös”) szükségszerűen HAMIS! Ha Cecil nem bűnös állítása hamis, akkor maga CECIL A BŰNÖS!'
      },
      {
        id: 'iq3-7',
        questionTypeBadge: 'Abszolút Érték és Implikáció',
        question: 'Igaz vagy hamis a következő állítás: „Ha egy x valós számra |x| > 1, akkor x > 1”?',
        options: [
          'HAMIS, ellenpélda az x = -5 (mivel |-5| = 5 > 1, de -5 < 1)',
          'IGAZ, mert az abszolút érték mindig pozitív',
          'Csak akkor igaz, ha x egész szám',
          'Ekvivalens az x > 1 állítással'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a negatív számokra! Az abszolút értékük lehet nagy, miközben maga a szám negatív marad.',
        explanation: 'Az |x| > 1 azt jelenti, hogy x > 1 VAGY x < -1. Bármely -1-nél kisebb negatív szám (pl. x = -3 vagy x = -5) ellenpélda, mert kielégíti a feltételt (|-5| = 5 > 1), de nem elégíti ki a következményt (-5 nem nagyobb 1-nél).'
      },
      {
        id: 'iq3-8',
        questionTypeBadge: 'Valós Számok és Reciprokaik',
        question: 'A: „Egy x valós szám négyzete egyenlő önmagával (x² = x).” B: „Egy x valós szám reciproka egyenlő önmagával (1/x = x).” Melyik következtetés helyes?',
        options: [
          'Egyik sem következik a másikból általánosan (x = 0 esetén x² = x igaz, de 1/x nem létezik; x = -1 esetén 1/x = x igaz, de (-1)² ≠ -1)',
          'A ⇒ B mindig igaz',
          'B ⇒ A mindig igaz',
          'A és B ekvivalensek a valós számok halmazán'
        ],
        correctAnswer: 0,
        hint: 'Oldd meg a két egyenletet: x² = x gyökei a 0 és az 1. Az 1/x = x gyökei az 1 és a -1.',
        explanation: 'Az x² = x megoldásai: {0; 1}. Az 1/x = x megoldásai: {-1; 1}. A 0-ra az első igaz, de a reciprok nem létezik. A -1-re a reciprok egyenlő vele, de a négyzete (+1) nem egyenlő önmagával. Így egyik irányú következtetés sem igaz általánosan!'
      },
      {
        id: 'iq3-9',
        questionTypeBadge: 'Indirekt Bizonyítás Alapja',
        question: 'Hogyan bizonyítjuk indirekt módon azt a tételt, hogy „Ha n² páros, akkor n is páros”?',
        options: [
          'Feltesszük a következmény tagadását (hogy n páratlan), és megmutatjuk, hogy ekkor n² is szükségképpen páratlan (kontrapozíció)',
          'Kipróbáljuk a tételt az első 10 páros négyzetszámra',
          'Kiszámítjuk n négyzetgyökét',
          'Megfordítjuk az állítást, és azt bizonyítjuk helyette'
        ],
        correctAnswer: 0,
        hint: 'Az indirekt bizonyítás a kontrapozíció elvén alapul: A ⇒ B helyett a vele ekvivalens ¬B ⇒ ¬A állítást igazoljuk!',
        explanation: 'A kontrapozíció szerint (n² páros ⇒ n páros) ekvivalens azzal, hogy (n páratlan ⇒ n² páratlan). Ha n páratlan, akkor n = 2k + 1, négyzete n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, ami nyilván páratlan! Ezzel az eredeti tételt is közvetlenül igazoltuk.'
      },
      {
        id: 'iq3-10',
        questionTypeBadge: 'Geometriai Ekvivalencia Szintézis',
        question: 'Tekintsük az alábbi állítást: „Egy négyszög akkor és csak akkor deltoid, ha átlói merőlegesek egymásra.” Igaz vagy hamis ez a kijelentés?',
        options: [
          'HAMIS, mert az átlók merőlegessége csak szükséges feltétele a deltoidnak, de nem elégséges (létezik nem deltoid merőleges átlójú négyszög)',
          'IGAZ, mert a deltoid definíciója a merőleges átlók megléte',
          'IGAZ, mert a deltoid átlói mindig merőlegesek',
          'Csak konvex deltoidokra igaz'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy olyan négyszögre, amelynek átlói merőlegesek, de nem felezik egymást, és semelyik két szomszédos oldala nem egyenlő!',
        explanation: 'Bár minden deltoid átlói merőlegesek (szükséges feltétel), a megfordítás nem igaz: rajzolhatunk olyan négyszöget, amelynek merőlegesek az átlói, mégsem deltoid (nincs két-két szomszédos egyenlő oldala). Így az „akkor és csak akkor” (ekvivalencia) kijelentés HAMIS!'
      }
    ]
  }
};

export const ImplicationQuiz: React.FC<ImplicationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="5. Állítás és megfordítása Kvíz"
      subtitle="Feltételes következtetések, szükséges és elégséges feltételek, ekvivalencia és logikai rejtvények"
      badge="10. Osztály • I. Logika"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      chapterId="logika"
      topicId="g10-logic-allitas-megforditas"
      topicTitle="5. Állítás és megfordítása"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • Implikáció és Megfordítása"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <ImplicationMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ImplicationSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ImplicationQuiz;

