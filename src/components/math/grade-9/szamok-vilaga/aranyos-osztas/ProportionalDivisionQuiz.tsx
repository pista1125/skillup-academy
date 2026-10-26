import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ProportionalDivisionMatcher } from './ProportionalDivisionMatcher';
import { ProportionalDivisionSorter } from './ProportionalDivisionSorter';
import {
  ProportionalBarSvg,
  TriangleAnglesProportionSvg,
  MixtureRatioSvg,
  ProfitDistributionSvg
} from './ProportionalDivisionFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface ProportionalDivisionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Szabályok (Könnyű)',
    subtitle: 'Arányos osztás 4 lépéses algoritmusa, arányrészek összege és alapfeladatok.',
    range: '1 - 10. feladat',
    focus: 'Algoritmus és Alapfogalmak',
    questions: [
      {
        id: 'pdq1-1',
        questionTypeBadge: 'Arányos Osztás Algoritmusa',
        question: 'Mi az arányos osztás első lépése, ha egy M mennyiséget a : b arányban kell felosztani?',
        figure: <ProportionalBarSvg size={180} />,
        options: [
          'Az arányrészek összeadása: S = a + b',
          'A mennyiség elosztása az első taggal: M / a',
          'Az aránytagok összeszorzása: a · b',
          'A mennyiség négyzetgyökének kiszámítása: √M'
        ],
        correctAnswer: 0,
        hint: 'Először meg kell tudnunk, összesen hány egyenlő egységre vagy „csomagra” kell felosztanunk a teljes mennyiséget!',
        explanation: 'Az arányos osztás 1. lépése mindig az összes arányrész meghatározása: S = a + b (vagy három tagnál a + b + c).'
      },
      {
        id: 'pdq1-2',
        questionTypeBadge: '1 Arányrész Értéke',
        question: 'Hogyan számítjuk ki 1 arányrész értékét (e), ha az összeg M, és az összes arányrész S?',
        options: [
          'e = M / S (a teljes mennyiséget elosztjuk a részek számával)',
          'e = M · S (összeszorozzuk őket)',
          'e = S / M',
          'e = M - S'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a tortaszeletelésre: a teljes tortát elosztod a szeletek számával!',
        explanation: '1 arányrész értéke e = M / S. Ezzel az egységértékkel szorozzuk meg később az egyes aránytagokat.'
      },
      {
        id: 'pdq1-3',
        questionTypeBadge: 'Kéttagú Szakaszfelosztás',
        question: 'Egy 60 cm hosszú rudat 2 : 3 arányban két részre vágunk. Mennyi 1 arányrész értéke?',
        figure: <ProportionalBarSvg size={180} />,
        options: [
          '12 cm',
          '10 cm',
          '20 cm',
          '15 cm'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 2 + 3 = 5 rész. Mennyi 60 / 5?',
        explanation: 'Összes rész: 2 + 3 = 5 rész. 1 arányrész értéke: 60 cm / 5 = 12 cm.'
      },
      {
        id: 'pdq1-4',
        questionTypeBadge: 'Részek Kiszámítása',
        question: 'A 60 cm-es rúd 2 : 3 arányú felosztásakor mekkorák az egyes levágott darabok?',
        options: [
          '24 cm és 36 cm',
          '20 cm és 40 cm',
          '25 cm és 35 cm',
          '18 cm és 42 cm'
        ],
        correctAnswer: 0,
        hint: '1 rész = 12 cm. Az 1. rész 2·12 cm, a 2. rész 3·12 cm!',
        explanation: '1. rész: 2 · 12 = 24 cm. 2. rész: 3 · 12 = 36 cm. Ellenőrzés: 24 + 36 = 60 cm, és 24 : 36 = 2 : 3.'
      },
      {
        id: 'pdq1-5',
        questionTypeBadge: 'Pénzfelosztás',
        question: '100 000 Ft-ot elosztunk 3 : 7 arányban. Mekkora a kisebbik összeg?',
        options: [
          '30 000 Ft',
          '35 000 Ft',
          '25 000 Ft',
          '40 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 3 + 7 = 10 rész. 1 rész = 10 000 Ft!',
        explanation: 'Összes rész: 3 + 7 = 10. 1 rész = 100 000 / 10 = 10 000 Ft. A kisebbik rész: 3 · 10 000 = 30 000 Ft (a nagyobbik 70 000 Ft).'
      },
      {
        id: 'pdq1-6',
        questionTypeBadge: 'Fogalmi Értelmezés',
        question: 'Mit jelent, ha két fél 1 : 1 arányban osztozik egy összegen?',
        options: [
          'Pontosan fele-fele arányban, egyenlően kapnak',
          'Az első fél kétszer annyit kap',
          'Nem kap semmit egyik fél sem',
          'A nagyobb összeg a második félnek jár'
        ],
        correctAnswer: 0,
        hint: '1 + 1 = 2 rész, mindkét fél a felét (50%-át) kapja.',
        explanation: 'Az 1 : 1 arány az egyenlő elosztást jelenti: S = 2, mindkét rész 1/2 = 50%.'
      },
      {
        id: 'pdq1-7',
        questionTypeBadge: 'Háromtagú Arány Összege',
        question: 'Hány arányrészre kell osztani a mennyiséget, ha az arány 1 : 2 : 5?',
        figure: <MixtureRatioSvg size={170} />,
        options: [
          '8 részre',
          '7 részre',
          '10 részre',
          '6 részre'
        ],
        correctAnswer: 0,
        hint: 'Add össze az aránytagokat: 1 + 2 + 5 = ?',
        explanation: 'Háromtagú aránynál az összes arányrész: 1 + 2 + 5 = 8 rész.'
      },
      {
        id: 'pdq1-8',
        questionTypeBadge: 'Háromszög Alaptétel',
        question: 'Mennyi a háromszög belső szögeinek összege, amivel a szögek arányos felosztásakor számolunk?',
        figure: <TriangleAnglesProportionSvg size={170} />,
        options: [
          'Mindig 180°',
          'Mindig 360°',
          'Mindig 90°',
          'Függ az oldalak hosszától'
        ],
        correctAnswer: 0,
        hint: 'Minden euklideszi háromszög belső szögeinek összege állandó!',
        explanation: 'A háromszög belső szögeinek összege mindig α + β + γ = 180°. Ez a teljes felosztandó mennyiség.'
      },
      {
        id: 'pdq1-9',
        questionTypeBadge: 'Szakaszfelosztás',
        question: 'Egy 40 cm-es szakaszt 1 : 3 arányban bontunk két részre. Mekkora a hosszabb rész?',
        options: [
          '30 cm',
          '10 cm',
          '25 cm',
          '35 cm'
        ],
        correctAnswer: 0,
        hint: '1 + 3 = 4 rész. 1 rész = 10 cm. A hosszabbik 3 rész!',
        explanation: 'Összes rész: 1 + 3 = 4. 1 rész = 40 / 4 = 10 cm. A hosszabb rész: 3 · 10 = 30 cm.'
      },
      {
        id: 'pdq1-10',
        questionTypeBadge: 'Ellenőrzés Szabálya',
        question: 'Hogyan ellenőrizzük az arányos osztás végeredményét a legbiztosabban?',
        options: [
          'A kapott részek összege kiadja-e a teljes M-et, és egyszerűsítve megegyezik-e az aránnyal',
          'Összeszorozzuk a kapott részeket',
          'Megnézzük, hogy páros számok lettek-e',
          'Kivonjuk a részeket egymásból'
        ],
        correctAnswer: 0,
        hint: 'A részeknek vissza kell adniuk a teljes egészet, és az arányuk sem változhat meg!',
        explanation: 'Kétlépcsős ellenőrzés: 1. R1 + R2 = M (összeg egyezik); 2. R1 / R2 = a / b (arány helyes).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szöveges és Geometriai Feladatok (Közepes)',
    subtitle: 'Háromszög szögei, kerület, keverékek, receptek és nyereségelosztás.',
    range: '11 - 20. feladat',
    focus: 'Gyakorlati és Geometriai Számítások',
    questions: [
      {
        id: 'pdq2-1',
        questionTypeBadge: 'Háromszög Szögei',
        question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Mekkora a háromszög legkisebb szöge?',
        figure: <TriangleAnglesProportionSvg size={170} />,
        options: [
          '40°',
          '20°',
          '30°',
          '45°'
        ],
        correctAnswer: 0,
        hint: 'A szögek összege 180°. Összes rész: 2 + 3 + 4 = 9 rész. Mennyi 1 rész?',
        explanation: 'Összes rész: 2 + 3 + 4 = 9. 1 rész = 180° / 9 = 20°. A legkisebb szög a 2 arányrészhez tartozik: 2 · 20° = 40°.'
      },
      {
        id: 'pdq2-2',
        questionTypeBadge: 'Nevezetes Háromszög',
        question: 'Egy háromszög szögei 1 : 2 : 3 arányúak. Milyen típusú ez a háromszög?',
        options: [
          'Derékszögű háromszög (szögei: 30°, 60°, 90°)',
          'Egyenlő szárú tompaszögű',
          'Szabályos (egyenlő oldalú)',
          'Tompaszögű (100°-nál nagyobb szöggel)'
        ],
        correctAnswer: 0,
        hint: '1 + 2 + 3 = 6 rész. 1 rész = 180° / 6 = 30°. Mennyi a legnagyobb szög?',
        explanation: 'Összes rész: 1 + 2 + 3 = 6. 1 rész = 180° / 6 = 30°. A szögek: 30°, 60°, 90°. Mivel van 90°-os szöge, ez derékszögű háromszög!'
      },
      {
        id: 'pdq2-3',
        questionTypeBadge: 'Téglalap Kerülete',
        question: 'Egy téglalap szomszédos oldalainak aránya 2 : 3, a kerülete K = 50 cm. Mekkorák az oldalak?',
        options: [
          '10 cm és 15 cm',
          '20 cm és 30 cm',
          '8 cm és 12 cm',
          '12 cm és 18 cm'
        ],
        correctAnswer: 0,
        hint: 'Csapda! A kerület K = 2(a + b). Először számold ki a félkerületet: a + b = 25 cm!',
        explanation: 'Félkerület: a + b = 50 / 2 = 25 cm. Összes rész: 2 + 3 = 5 rész. 1 rész = 25 / 5 = 5 cm. Oldalak: a = 2 · 5 = 10 cm, b = 3 · 5 = 15 cm. K = 2(10 + 15) = 50 cm.'
      },
      {
        id: 'pdq2-4',
        questionTypeBadge: 'Recept / Keverék',
        question: 'Szörp készítéséhez szirupot és vizet 1 : 4 arányban keverünk. Hány ml szirup kell 1500 ml kész italhoz?',
        figure: <MixtureRatioSvg size={170} />,
        options: [
          '300 ml',
          '375 ml',
          '250 ml',
          '200 ml'
        ],
        correctAnswer: 0,
        hint: 'A kész szörpben szirup + víz = 1 + 4 = 5 rész van. Mennyi 1500 / 5?',
        explanation: 'Összes rész: 1 + 4 = 5 rész. 1 rész (szirup) = 1500 ml / 5 = 300 ml (a maradék 1200 ml víz).'
      },
      {
        id: 'pdq2-5',
        questionTypeBadge: 'Üzleti Nyereség',
        question: 'Anna és Béla 4 : 5 arányban fektetett be egy projektbe. A 900 000 Ft-os nyereségből mennyi illeti meg Annát?',
        figure: <ProfitDistributionSvg size={170} />,
        options: [
          '400 000 Ft',
          '500 000 Ft',
          '450 000 Ft',
          '360 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 4 + 5 = 9 rész. 1 rész = 100 000 Ft.',
        explanation: 'Összes rész: 4 + 5 = 9. 1 rész = 900 000 / 9 = 100 000 Ft. Anna része (4 rész): 4 · 100 000 = 400 000 Ft (Béla: 500 000 Ft).'
      },
      {
        id: 'pdq2-6',
        questionTypeBadge: 'Életkor Arányos Osztás',
        question: 'Három testvér 4, 6 és 10 éves. 40 szem bonbont az életkoruk arányában osztanak el. Hány szem jut a legidősebbnek?',
        options: [
          '20 szem',
          '15 szem',
          '24 szem',
          '18 szem'
        ],
        correctAnswer: 0,
        hint: 'Az arány 4 : 6 : 10, ami egyszerűsítve 2 : 3 : 5. Összes rész: 2 + 3 + 5 = 10 rész!',
        explanation: 'Összes rész: 4 + 6 + 10 = 20 rész (vagy 2+3+5=10). 1 rész = 40 / 20 = 2 szem. A legidősebb (10 rész): 10 · 2 = 20 szem.'
      },
      {
        id: 'pdq2-7',
        questionTypeBadge: 'Fémötvözet',
        question: 'A sárgaréz réz és cink ötvözete 7 : 3 arányban. Hány kg réz van 20 kg sárgarézben?',
        options: [
          '14 kg',
          '6 kg',
          '12 kg',
          '15 kg'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 7 + 3 = 10 rész. 1 rész = 2 kg!',
        explanation: 'Összes rész: 7 + 3 = 10 rész. 1 rész = 20 kg / 10 = 2 kg. Réz (7 rész): 7 · 2 = 14 kg (cink: 6 kg).'
      },
      {
        id: 'pdq2-8',
        questionTypeBadge: 'Háromszög Kerülete',
        question: 'Egy háromszög kerülete 36 cm, oldalainak aránya 3 : 4 : 5. Mekkora a háromszög leghosszabb oldala?',
        options: [
          '15 cm',
          '12 cm',
          '18 cm',
          '20 cm'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 3 + 4 + 5 = 12 rész. Mennyi 36 / 12?',
        explanation: 'Összes rész: 3 + 4 + 5 = 12 rész. 1 rész = 36 / 12 = 3 cm. A leghosszabb oldal (5 rész): 5 · 3 = 15 cm. (Oldalak: 9, 12, 15 cm; derékszögű pitagoraszi hármas).'
      },
      {
        id: 'pdq2-9',
        questionTypeBadge: 'Különbség Alapú Arány',
        question: 'Két szám aránya 5 : 8, a különbségük 15. Mekkora a kisebbik szám?',
        options: [
          '25',
          '40',
          '30',
          '20'
        ],
        correctAnswer: 0,
        hint: 'A két szám arányrészeinek különbsége: 8 - 5 = 3 rész. Ez a 3 rész felel meg 15-nek!',
        explanation: 'Az arányrészek különbsége: 8 - 5 = 3 rész. 3 rész = 15 ⟹ 1 rész = 5. A kisebbik szám: 5 · 5 = 25 (a nagyobbik 8 · 5 = 40; különbség: 40 - 25 = 15).'
      },
      {
        id: 'pdq2-10',
        questionTypeBadge: 'Könyvolvasás',
        question: 'Egy 160 oldalas könyvet két nap alatt olvasunk el 3 : 5 arányban. Hány oldalt olvasunk a második napon?',
        options: [
          '100 oldalt',
          '60 oldalt',
          '90 oldalt',
          '110 oldalt'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 3 + 5 = 8 rész. 1 rész = 20 oldal!',
        explanation: 'Összes rész: 3 + 5 = 8 rész. 1 rész = 160 / 8 = 20 oldal. Második nap (5 rész): 5 · 20 = 100 oldal.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Érettségi Típusfeladatok (Nehéz)',
    subtitle: 'Területi összefüggések (x²), háromszög-egyenlőtlenség, tört arányok és fordított arányos osztás.',
    range: '21 - 30. feladat',
    focus: 'Érettségi és Elmélyült Feladatok',
    questions: [
      {
        id: 'pdq3-1',
        questionTypeBadge: 'Téglalap Területe (x²)',
        question: 'Egy téglalap oldalainak aránya 3 : 4, területe T = 48 cm². Mekkora a téglalap kerülete?',
        options: [
          '28 cm',
          '14 cm',
          '32 cm',
          '56 cm'
        ],
        correctAnswer: 0,
        hint: 'Vigyázat! T = a · b = (3x) · (4x) = 12x² = 48 cm². Mennyi x?',
        explanation: 'Terület képlete: T = 3x · 4x = 12x² = 48 ⟹ x² = 4 ⟹ x = 2 cm. Az oldalak: a = 3 · 2 = 6 cm, b = 4 · 2 = 8 cm. A kerület: K = 2(6 + 8) = 2 · 14 = 28 cm.'
      },
      {
        id: 'pdq3-2',
        questionTypeBadge: 'Háromszög-egyenlőtlenség',
        question: 'Szerkeszthető-e olyan háromszög, amelynek oldalainak aránya 2 : 3 : 6?',
        options: [
          'Nem, mert a két rövidebb arányrész összege kisebb a harmadiknál (2 + 3 = 5 < 6)',
          'Igen, bármilyen pozitív aránnyal szerkeszthető háromszög',
          'Csak akkor, ha a kerülete páros szám',
          'Igen, tompaszögű háromszög lesz'
        ],
        correctAnswer: 0,
        hint: 'A háromszög-egyenlőtlenség szerint a + b > c! Két oldal összege nagyobb kell legyen a harmadiknál!',
        explanation: 'A háromszög-egyenlőtlenség nem teljesül: 2x + 3x = 5x < 6x. A két rövidebb oldal még kiterítve sem éri el a harmadik oldalt, így nem alkothatnak zárt háromszöget!'
      },
      {
        id: 'pdq3-3',
        questionTypeBadge: 'Háromkomponensű Ötvözet',
        question: 'Egy aranyötvözetben az arany, ezüst és réz tömegaránya 14 : 3 : 3. Hány gramm tiszta aranyat tartalmaz 200 g ilyen ékszer?',
        options: [
          '140 g',
          '120 g',
          '150 g',
          '160 g'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 14 + 3 + 3 = 20 rész. 1 rész = 200 g / 20 = 10 g!',
        explanation: 'Összes rész: 14 + 3 + 3 = 20 rész. 1 rész = 200 g / 20 = 10 g. Tiszta arany (14 rész): 14 · 10 = 140 g (ez egyébként 14/20 = 70%-os finomságú arany).'
      },
      {
        id: 'pdq3-4',
        questionTypeBadge: 'Fordított Arányos Osztás',
        question: 'Hogyan osztunk szét egy jutalmat fordítottan arányosan a hibák száma (2 és 3 hiba) szerint?',
        options: [
          'Az arányok reciprokaival arányosan: 1/2 : 1/3 = 3 : 2 arányban',
          'Ugyanúgy 2 : 3 arányban',
          'A különbségükkel arányosan: 1 : 1',
          'Nem lehet matematikailag kiszámítani'
        ],
        correctAnswer: 0,
        hint: 'Aki kevesebb hibát ejt, annak TÖBB jutalom jár! Reciprokok: 1/2 és 1/3 közös nevezővel: 3/6 és 2/6, azaz 3 : 2!',
        explanation: 'Fordított arányos osztásnál az aránytagok reciprokaival kell egyenesen arányosan osztani: 1/2 : 1/3 = 3/6 : 2/6 = 3 : 2 arányban. A 2 hibás 3 részt, a 3 hibás 2 részt kap!'
      },
      {
        id: 'pdq3-5',
        questionTypeBadge: 'Tört Arányok Egészre Hozása',
        question: 'Egy örökséget 1/2 : 1/3 : 1/4 arányban kell elosztani. Milyen legegyszerűbb egész számok arányának felel meg ez?',
        options: [
          '6 : 4 : 3',
          '2 : 3 : 4',
          '4 : 3 : 2',
          '12 : 8 : 6'
        ],
        correctAnswer: 0,
        hint: 'Hozd a törteket közös nevezőre (12)! Mennyi 1/2, 1/3 és 1/4 tizenkettedekben?',
        explanation: 'Közös nevező a 12: 1/2 = 6/12, 1/3 = 4/12, 1/4 = 3/12. A nevezőket elhagyva az arány: 6 : 4 : 3. Összes rész: 6 + 4 + 3 = 13 rész.'
      },
      {
        id: 'pdq3-6',
        questionTypeBadge: 'Munkanapok Szerinti Jutalom',
        question: '420 000 Ft prémiumot három dolgozó között a ledolgozott napok arányában (12, 15 és 18 nap) osztanak el. Mennyit kap a legtöbbet dolgozó?',
        options: [
          '168 000 Ft',
          '140 000 Ft',
          '150 000 Ft',
          '180 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'Egyszerűsítsd a napok arányát 3-mal: 4 : 5 : 6! Összes rész: 4 + 5 + 6 = 15 rész.',
        explanation: 'A napok aránya: 12 : 15 : 18 = 4 : 5 : 6. Összes rész: 4 + 5 + 6 = 15 rész. 1 rész = 420 000 / 15 = 28 000 Ft. A legtöbbet dolgozó (6 rész): 6 · 28 000 = 168 000 Ft.'
      },
      {
        id: 'pdq3-7',
        questionTypeBadge: 'Valószínűségi Kapcsolat',
        question: 'Egy dobozban piros, kék és zöld golyók vannak 2 : 3 : 4 arányban. Mekkora a valószínűsége, hogy véletlenszerűen zöld golyót húzunk?',
        options: [
          '4 / 9 (kb. 44,4%)',
          '4 / 5',
          '1 / 3',
          '2 / 9'
        ],
        correctAnswer: 0,
        hint: 'Összes rész: 2 + 3 + 4 = 9 rész. A zöld golyók aránya 4 rész a 9-ből!',
        explanation: 'Összes golyó arányrésze: 2 + 3 + 4 = 9 rész. A kedvező esetek száma (zöld): 4 rész. A klasszikus valószínűség: P = kedvező / összes = 4 / 9 ≈ 44,4%.'
      },
      {
        id: 'pdq3-8',
        questionTypeBadge: 'Téglalap Terület és Kerület',
        question: 'Egy téglalap kerülete 40 cm, területe 96 cm². Milyen arányban állnak a szomszédos oldalai?',
        options: [
          '2 : 3',
          '3 : 5',
          '1 : 4',
          '3 : 4'
        ],
        correctAnswer: 0,
        hint: 'Félkerület: a + b = 20. Keresünk két számot, amiknek összege 20 és szorzata 96: 8 és 12!',
        explanation: 'Félkerület: a + b = 20. Szorzatuk: a · b = 96. A két szám a 8 és 12 (8 + 12 = 20, 8 · 12 = 96). Az oldalak aránya: 8 : 12 = 2 : 3.'
      },
      {
        id: 'pdq3-9',
        questionTypeBadge: 'Oldalhossz és Szögkapcsolat',
        question: 'Egy derékszögű háromszög hegyesszögei 1 : 2 arányúak. Mekkorák a szögei?',
        options: [
          '30° és 60° (a harmadik szög 90°)',
          '45° és 45°',
          '20° és 70°',
          '35° és 55°'
        ],
        correctAnswer: 0,
        hint: 'Derékszögű háromszögben a két hegyesszög összege mindig 90°! Oszd fel a 90°-ot 1 : 2 arányban!',
        explanation: 'Mivel a háromszög derékszögű, a két hegyesszög összege α + β = 90°. Összes rész: 1 + 2 = 3 rész. 1 rész = 90° / 3 = 30°. Így a hegyesszögek 1 · 30° = 30° és 2 · 30° = 60°.'
      },
      {
        id: 'pdq3-10',
        questionTypeBadge: 'Keverési Hígítás',
        question: '500 ml 20%-os cukoroldatot készítünk úgy, hogy cukrot és vizet keverünk össze. Milyen arányban kell kimérni a cukor és a víz tömegét?',
        options: [
          '1 : 4 arányban (1 rész cukor, 4 rész víz)',
          '1 : 5 arányban',
          '2 : 10 arányban nem egyszerűsítve',
          '1 : 2 arányban'
        ],
        correctAnswer: 0,
        hint: 'A 20%-os oldatban 20 g cukor jut 100 g teljes oldatra. Mennyi benne a víz? 100 - 20 = 80 g!',
        explanation: '20% cukor mellett a víz 80%. A cukor és víz aránya: 20 : 80 = 1 : 4 (1 rész cukorhoz 4 rész víz kell, így lesz az összeg 5 rész, aminek az 1 része pontosan 1/5 = 20%).'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Arányos Osztás 4 Lépése',
    formula: '1. S = a + b (+ c) | 2. e = M / S | 3. Ri = arány_i · e | 4. Ellenőrzés: ∑ Ri = M',
    description: 'Bármilyen mennyiség szétosztása megadott arányban. S: összes arányrész, e: egy rész értéke.',
    badge: 'Alapszabály',
    badgeColor: 'teal'
  },
  {
    title: 'Háromszög Szögei és Kerülete',
    formula: 'Belső szögek: α + β + γ = 180° | Kerület: K = a + b + c',
    description: 'Szögeknél az osztandó összeg mindig fix 180°. Kerületnél az oldalak arányának összege a kerület.',
    badge: 'Geometria',
    badgeColor: 'indigo'
  },
  {
    title: 'Téglalap Kerület és Terület Csapda',
    formula: 'Kerületnél: a + b = K / 2 (félkerület!) | Területnél: a · b = x · y · e² = T (e² van!)',
    description: 'Kerületnél csak a félkerületet oszd el! Területnél az arányrészek szorzata miatt gyököt kell vonni!',
    badge: 'Típuscsapda',
    badgeColor: 'rose'
  },
  {
    title: 'Fordított Arányos Osztás',
    formula: '1/a : 1/b : 1/c (reciprokok aránya)',
    description: 'Ha a kisebb bemenethez nagyobb jutalom jár (pl. kevesebb hiba), a tagok reciprokaival kell arányosan osztani.',
    badge: 'Haladó',
    badgeColor: 'amber'
  }
];

export const ProportionalDivisionQuiz: React.FC<ProportionalDivisionQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Arányos Osztás Kvíz"
      subtitle="30 válogatott feladat 3 szinten: algoritmikus lépések, háromszögek, keverékek és érettségi típuspéldák"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 🍰 GYAKORLÁS"
      themeColor="teal"
      quizId="g9-szamok-aranyos-osztas-quiz"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd az arányos osztási feladatokat a helyes végeredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <ProportionalDivisionMatcher
              key={`pdiv-matcher-${level}`}
              level={level}
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
          subtitle: 'Kategorizáld a feladatokat az arányrészek száma és alkalmazási területe szerint!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <ProportionalDivisionSorter
              key={`pdiv-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default ProportionalDivisionQuiz;
