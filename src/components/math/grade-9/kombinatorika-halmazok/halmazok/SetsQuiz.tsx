import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SetsMatcher } from './SetsMatcher';
import { SetsSorter } from './SetsSorter';
import {
  NumberSetsVennSvg,
  SubsetVennSvg,
  ElementBelongingSvg,
  EmptySetSvg,
  PowerSetTreeSvg
} from './SetsFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface SetsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Halmazfogalmak és Jelölések (Könnyű)',
    subtitle: 'Eleme / nem eleme reláció, nevezetes számhalmazok és egyszerű részhalmazok.',
    range: '1 - 10. feladat',
    focus: 'Jelölésrendszer és Alapismeretek',
    questions: [
      {
        id: 'sq1-1',
        questionTypeBadge: 'Eleme Reláció',
        question: 'Melyik matematikai szimbólum jelöli azt, hogy egy elem beletartozik egy adott halmazba?',
        figure: <ElementBelongingSvg size={150} />,
        options: ['∈ (eleme)', '⊆ (részhalmaza)', '∉ (nem eleme)', '⊂ (valódi részhalmaza)'],
        correctAnswer: 0,
        hint: 'Az elem és halmaz közötti kapcsolat jele az „eleme” szimbólum (görög epszilonra emlékeztető jel).',
        explanation: 'Az x ∈ A jelölés azt jelenti, hogy az x elem beletartozik az A halmazba. A ⊆ jel két halmaz közötti kapcsolatot fejez ki.'
      },
      {
        id: 'sq1-2',
        questionTypeBadge: 'Üres Halmaz Elemszáma',
        question: 'Hány eleme van az üres halmaznak (∅ vagy { })?',
        figure: <EmptySetSvg size={145} />,
        options: ['0 eleme van', '1 eleme van', 'Végtelen sok eleme van', 'Nem értelmezhető'],
        correctAnswer: 0,
        hint: 'Az üres halmazban egyetlen elem sincs: |∅| = 0.',
        explanation: 'Az üres halmaz definíció szerint az a halmaz, amelynek egyetlen eleme sincs, tehát elemszáma |∅| = 0.'
      },
      {
        id: 'sq1-3',
        questionTypeBadge: 'Természetes Számok (ℕ)',
        question: 'Az alábbi számok közül melyik NEM eleme a természetes számok (ℕ) halmazának?',
        options: ['-5', '0', '7', '100'],
        correctAnswer: 0,
        hint: 'A természetes számok a nemnegatív egész számok: ℕ = {0, 1, 2, 3, ...}.',
        explanation: 'A -5 negatív szám, így az egész számokhoz (ℤ) tartozik, de a természetes számoknak (ℕ) nem eleme (-5 ∉ ℕ).'
      },
      {
        id: 'sq1-4',
        questionTypeBadge: 'Halmaz Elemszáma',
        question: 'Hány eleme van az A = {3, 5, 5, 7, 7, 7, 9} halmaznak?',
        options: ['4 eleme van', '7 eleme van', '3 eleme van', '5 eleme van'],
        correctAnswer: 0,
        hint: 'Egy halmazban az azonos elemek többszöri felírása nem növeli az elemszámot!',
        explanation: 'A halmazban minden elem csak egyszer számít: A = {3, 5, 7, 9}. Ennek 4 különböző eleme van, így |A| = 4.'
      },
      {
        id: 'sq1-5',
        questionTypeBadge: 'Részhalmazok Száma',
        question: 'Hány részhalmaza van egy 3 elemű halmaznak (pl. {a, b, c})?',
        figure: <PowerSetTreeSvg size={170} />,
        options: ['8 részhalmaza (2³)', '6 részhalmaza', '9 részhalmaza', '3 részhalmaza'],
        correctAnswer: 0,
        hint: 'Az n elemű halmaz összes részhalmazának száma: 2ⁿ.',
        explanation: 'A hatványhalmaz elemszáma 2³ = 8. Részhalmazai: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}.'
      },
      {
        id: 'sq1-6',
        questionTypeBadge: 'Számhalmazok: Egész Számok',
        question: 'Melyik betűvel jelöljük a matematikában az egész számok halmazát?',
        figure: <NumberSetsVennSvg size={180} />,
        options: ['ℤ', 'ℕ', 'ℚ', 'ℝ'],
        correctAnswer: 0,
        hint: 'A német „Zahlen” (számok) szóból ered a ℤ jelölés.',
        explanation: 'Az egész számok halmazának jele ℤ (mely a negatív egészeket, a 0-t és a pozitív egészeket tartalmazza).'
      },
      {
        id: 'sq1-7',
        questionTypeBadge: 'Részhalmaz Reláció',
        question: 'Igaz-e, hogy az üres halmaz (∅) minden halmaznak részhalmaza?',
        figure: <EmptySetSvg size={145} />,
        options: [
          'Igen, bármely A halmaz esetén ∅ ⊆ A',
          'Nem, csak a számhalmazoknak',
          'Csak akkor, ha a halmaz nem üres',
          'Nem, az üres halmaznak nincs kapcsolata más halmazokkal'
        ],
        correctAnswer: 0,
        hint: 'Az üres halmaz definíció szerint minden halmaz részhalmaza.',
        explanation: 'Az ∅ ⊆ A állítás minden A halmazra igaz, mert az ∅-nak nincs olyan eleme, ami ne tartozna bele A-ba.'
      },
      {
        id: 'sq1-8',
        questionTypeBadge: 'Halmaz Elemek Sorrendje',
        question: 'Egyenlő-e az A = {1, 4, 9} és a B = {9, 1, 4} halmaz?',
        options: [
          'Igen, mert a halmazban az elemek sorrendje nem számít (A = B)',
          'Nem, mert a sorrendjük különböző',
          'Csak akkor, ha nagyság szerint rendezzük őket',
          'Nem, mert a koordinátáik eltérnek'
        ],
        correctAnswer: 0,
        hint: 'A halmazoknál csak az számít, hogy mely elemek tartoznak bele, az elrendezésük közömbös.',
        explanation: 'A halmazban az elemek felsorolási sorrendje nem számít. Mivel pontosan ugyanazokból az elemekből állnak, A = B.'
      },
      {
        id: 'sq1-9',
        questionTypeBadge: 'Racionális Számok (ℚ)',
        question: 'Melyik szám tartozik a racionális számok (ℚ) halmazába?',
        options: ['-3/4', '√2', 'π', '√5'],
        correctAnswer: 0,
        hint: 'A racionális számok felírhatók két egész szám hányadosaként (törtként).',
        explanation: 'A -3/4 két egész szám (-3 és 4) hányadosa, így racionális szám (-3/4 ∈ ℚ). A √2, π és √5 irracionális számok.'
      },
      {
        id: 'sq1-10',
        questionTypeBadge: 'Kételemű Halmaz Részhalmazai',
        question: 'Hány részhalmaza van a {1, 2} kételemű halmaznak?',
        options: ['4 részhalmaza (2²)', '2 részhalmaza', '3 részhalmaza', '1 részhalmaza'],
        correctAnswer: 0,
        hint: '2² = 4: az üres halmaz, az egyeleműek és maga a halmaz.',
        explanation: 'A {1, 2} halmaz részhalmazai: ∅, {1}, {2}, {1, 2}. Összesen 2² = 4 darab részhalmaza van.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számhalmazok és Részhalmaz Tulajdonságok (Közepes)',
    subtitle: 'Hierarchia (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ), valódi részhalmazok és halmazképzési szabályok.',
    range: '11 - 20. feladat',
    focus: 'Halmazhierarchia és Logikai Szabályok',
    questions: [
      {
        id: 'sq2-1',
        questionTypeBadge: 'Számhalmazok Tartalmazása',
        question: 'Melyik tartalmazási lánc helyes a nevezetes számhalmazokra?',
        figure: <NumberSetsVennSvg size={190} />,
        options: ['ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ', 'ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ', 'ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ', 'ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ'],
        correctAnswer: 0,
        hint: 'Természetes számok ⊂ Egészek ⊂ Racionálisak ⊂ Valósak.',
        explanation: 'Minden természetes szám egész szám, minden egész szám racionális (törtként felírható), és minden racionális szám valós: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.'
      },
      {
        id: 'sq2-2',
        questionTypeBadge: 'Valódi Részhalmaz Definíció',
        question: 'Mikor mondjuk, hogy az A halmaz VALÓDI részhalmaza a B halmaznak (A ⊂ B)?',
        figure: <SubsetVennSvg size={160} highlightProper={true} />,
        options: [
          'Ha A ⊆ B, de A ≠ B (B-nek van olyan eleme, ami A-ban nincs)',
          'Ha A és B pontosan ugyanazokból az elemekből áll',
          'Ha A-nak több eleme van, mint B-nek',
          'Ha A és B metszete üres halmaz'
        ],
        correctAnswer: 0,
        hint: 'A valódi részhalmaz szigorúan szűkebb halmaz, nem lehet egyenlő az eredetivel.',
        explanation: 'Az A ⊂ B akkor teljesül, ha minden x ∈ A esetén x ∈ B, és létezik legalább egy olyan y ∈ B elem, amelyre y ∉ A.'
      },
      {
        id: 'sq2-3',
        questionTypeBadge: 'Valódi Részhalmazok Száma',
        question: 'Hány VALÓDI részhalmaza van egy 4 elemű halmaznak?',
        figure: <PowerSetTreeSvg size={170} />,
        options: ['15 darab (2⁴ - 1)', '16 darab', '14 darab', '8 darab'],
        correctAnswer: 0,
        hint: 'Az összes részhalmaz száma 2⁴ = 16, de maga a halmaz nem valódi részhalmaza önmagának!',
        explanation: 'Az n elemű halmaz összes részhalmazának száma 2ⁿ = 16. Mivel maga a kiinduló halmaz nem valódi részhalmaz, azt le kell vonni: 16 - 1 = 15.'
      },
      {
        id: 'sq2-4',
        questionTypeBadge: 'Irracionális Számok (ℚ*)',
        question: 'Melyik állítás IGAZ az irracionális számok (ℚ*) halmazára?',
        figure: <NumberSetsVennSvg size={190} />,
        options: [
          'Végtelen, nem szakaszos tizedestörtek, amelyek nem írhatók fel két egész hányadosaként',
          'Minden negatív szám irracionális szám',
          'Minden gyökjeles kifejezés automatikusan irracionális',
          'A racionális számok és az irracionális számok halmazának metszete nem üres'
        ],
        correctAnswer: 0,
        hint: 'Az irracionális számokat nem lehet felírni a/b törtként (pl. √2, π).',
        explanation: 'Az irracionális számok pontosan azok a valós számok, amelyek nem racionálisak: végtelen nem szakaszos tizedestörtként írhatók le.'
      },
      {
        id: 'sq2-5',
        questionTypeBadge: 'Becsapós Gyökvonás',
        question: 'Melyik számhalmazba tartozik a √36 és a √81/9 ?',
        options: [
          'Mindkettő a természetes számok (ℕ) és egészek (ℤ) halmazába tartozik',
          'Mindkettő irracionális szám (ℚ*) a gyökjel miatt',
          'Csak a racionális számokhoz tartoznak, egészhez nem',
          'Nem értelmezhető valós számokként'
        ],
        correctAnswer: 0,
        hint: 'Végezd el a gyökvonást: √36 = 6, és 81 / 9 = 9, aminek gyöke √9 = 3!',
        explanation: '√36 = 6 ∈ ℕ. A másik: √(81/9) = √9 = 3 ∈ ℕ. Mindkét szám természetes szám és egész szám!'
      },
      {
        id: 'sq2-6',
        questionTypeBadge: 'Jelölésbeli Pontosság: ∈ vs ⊆',
        question: 'Ha A = {1, 2, 3}, akkor az alábbi állítások közül melyik HIBÁS?',
        options: ['2 ⊆ A', '{2} ⊆ A', '2 ∈ A', '∅ ⊆ A'],
        correctAnswer: 0,
        hint: 'A ⊆ jelölés csak halmazok között állhat, a 2 pedig egy szám (elem), nem halmaz.',
        explanation: 'A 2 ∈ A helyes, de a 2 ⊆ A hibás, mert a 2 nem halmaz! Helyesen: {2} ⊆ A.'
      },
      {
        id: 'sq2-7',
        questionTypeBadge: 'Tulajdonsággal Megadott Halmaz',
        question: 'Mely elemekből áll a B = {x ∈ ℤ | -2 ≤ x < 3} halmaz?',
        options: ['{-2, -1, 0, 1, 2}', '{-1, 0, 1, 2}', '{-2, -1, 0, 1, 2, 3}', '{-2, 3}'],
        correctAnswer: 0,
        hint: 'A -2 megengedett (≤), de a 3 szigorúan nem tartozik bele (< 3).',
        explanation: 'A -2 és a 3 közötti egészek, ahol a -2 zárt, a 3 nyílt határ: {-2, -1, 0, 1, 2}.'
      },
      {
        id: 'sq2-8',
        questionTypeBadge: 'Nem-üres Részhalmazok Száma',
        question: 'Hány NEM-ÜRES részhalmaza van egy 5 elemű halmaznak?',
        figure: <PowerSetTreeSvg size={170} />,
        options: ['31 darab (2⁵ - 1)', '32 darab', '30 darab', '25 darab'],
        correctAnswer: 0,
        hint: 'Az összes részhalmaz száma 2⁵ = 32. Vonjuk le az üres halmazt (1 db)!',
        explanation: 'Az összes részhalmaz 2⁵ = 32. Ha az üres halmazt nem vesszük bele, 32 - 1 = 31 nem-üres részhalmaz marad.'
      },
      {
        id: 'sq2-9',
        questionTypeBadge: 'Alaphalmaz és Univerzum',
        question: 'Mit nevezünk a halmazelméletben alaphalmaznak (univerzumnak, U)?',
        figure: <ElementBelongingSvg size={150} />,
        options: [
          'Azt a tágabb halmazt, amelyből az adott vizsgálat során az elemeket válogatjuk',
          'Az üres halmaz ellentétét',
          'Csak a természetes számok végtelen halmazát',
          'Bármely két halmaz metszetét'
        ],
        correctAnswer: 0,
        hint: 'Az alaphalmaz tartalmazza az adott feladat kontextusában szóba jövő összes lehetséges elemet.',
        explanation: 'Az alaphalmaz (U) az a rögzített halmaz, amelynek részhalmazait a vizsgálat során képezzük (pl. U = ℕ vagy U = a pakli 52 lapja).'
      },
      {
        id: 'sq2-10',
        questionTypeBadge: 'Halmazok Ekvivalenciája',
        question: 'Ha A ⊆ B és B ⊆ A egyszerre teljesül, mi a következtetés?',
        options: ['A = B (a két halmaz egyenlő)', 'A ⊂ B', 'A és B metszete üres', 'B = ∅'],
        correctAnswer: 0,
        hint: 'Ha A minden eleme benne van B-ben, és B minden eleme benne van A-ban, akkor ugyanazokból állnak.',
        explanation: 'A halmazok egyenlőségének alaptétele: A = B akkor és csak akkor, ha A ⊆ B és B ⊆ A.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó Halmazelmélet és Vizsgafeladványok (Nehéz)',
    subtitle: 'Hatványhalmaz struktúrája, {∅} kezelése, speciális részhalmazok és szigorú bizonyítások.',
    range: '21 - 30. feladat',
    focus: 'Mesterfokú Logika és Absztrakt Gondolkodás',
    questions: [
      {
        id: 'sq3-1',
        questionTypeBadge: 'Az Üres Halmazt Tartalmazó Halmaz',
        question: 'Hány eleme van az A = { ∅ } halmaznak?',
        figure: <EmptySetSvg size={150} />,
        options: [
          '1 eleme van (maga az ∅ szimbólum az egyetlen eleme)',
          '0 eleme van, mert üres',
          'Végtelen sok eleme van',
          'Nem értelmezhető kifejezés'
        ],
        correctAnswer: 0,
        hint: 'Gondolj rá úgy, mint egy dobozra, amibe beletettünk egy üres dobozt! A külső doboz nem üres, van benne 1 dolog.',
        explanation: 'Az A = { ∅ } egy egyelemű halmaz: egyetlen eleme az üres halmaz, tehát |{ ∅ }| = 1, míg |∅| = 0!'
      },
      {
        id: 'sq3-2',
        questionTypeBadge: 'Hatványhalmaz Elemkapcsolat',
        question: 'Legyen A = {1, 2}. Melyik állítás IGAZ az A hatványhalmazára P(A)-ra?',
        figure: <PowerSetTreeSvg size={170} />,
        options: [
          '{1} ∈ P(A) és ∅ ∈ P(A)',
          '1 ∈ P(A)',
          'P(A) elemszáma 2',
          '{1, 2} ∉ P(A)'
        ],
        correctAnswer: 0,
        hint: 'A hatványhalmaz elemei maguk az A részhalmazai! Ezért {1} eleme P(A)-nak.',
        explanation: 'P(A) = { ∅, {1}, {2}, {1,2} }. Mivel {1} egy részhalmaz, ezért eleme P(A)-nak ({1} ∈ P(A)). Viszont 1 nem halmaz, így 1 ∉ P(A).'
      },
      {
        id: 'sq3-3',
        questionTypeBadge: 'Kételemű Részhalmazok Száma',
        question: 'Hány 2-elemű részhalmaza van egy 6 elemű halmaznak?',
        options: ['15 részhalmaza', '30 részhalmaza', '64 részhalmaza', '12 részhalmaza'],
        correctAnswer: 0,
        hint: '6 elemből kiválasztunk 2-t, a sorrend nem számít: (6 · 5) / 2.',
        explanation: 'A 2 elemű részhalmazok kiválasztása megegyezik a kézfogások számával: (6 · 5) / 2 = 15 darab 2-elemű részhalmaz van.'
      },
      {
        id: 'sq3-4',
        questionTypeBadge: 'Eleme és Részhalmaza Egyszerre?',
        question: 'Legyen A = {1, {1}}. Melyik állítás IGAZ erre a különleges halmazra?',
        options: [
          'Az 1 ∈ A és a {1} ∈ A és a {1} ⊆ A egyszerre mind igaz!',
          'Csak az 1 ∈ A igaz',
          'A halmaznak csak 1 eleme van',
          '{1} nem lehet egyszerre elem és részhalmaz'
        ],
        correctAnswer: 0,
        hint: 'A-ban két elem van: az 1-es szám és az {1} egyelemű halmaz. Mivel 1 ∈ A, az ebből képzett {1} részhalmaz is!',
        explanation: 'Az 1 eleme A-nak (1 ∈ A). Az {1} is eleme A-nak ({1} ∈ A). És mivel az 1 ∈ A, a belőle álló {1} halmaz részhalmaza is A-nak ({1} ⊆ A)!'
      },
      {
        id: 'sq3-5',
        questionTypeBadge: 'Prímszám Halmaz Elemzés',
        question: 'Hány eleme van az alábbi halmaznak: P = {x ∈ ℕ | x prím és 20 < x < 30}?',
        options: ['2 eleme van ({23, 29})', '3 eleme van', '1 eleme van', '0 eleme van'],
        correctAnswer: 0,
        hint: 'A 20 és 30 közötti prímszámok: 23 és 29. A többi páros vagy összetett (21, 25, 27).',
        explanation: 'A 20 és 30 közötti számok közül csak a 23 és a 29 prímszám, így |P| = 2.'
      },
      {
        id: 'sq3-6',
        questionTypeBadge: 'Hatványhalmaz Részhalmazai',
        question: 'Ha egy A halmaznak 64 részhalmaza van, hány eleme van magának az A halmaznak?',
        figure: <PowerSetTreeSvg size={170} />,
        options: ['6 eleme van (2⁶ = 64)', '8 eleme van', '32 eleme van', '16 eleme van'],
        correctAnswer: 0,
        hint: '2ⁿ = 64, keressük a 2 hányadik hatványa 64.',
        explanation: 'Mivel 2ⁿ = 64 és 2⁶ = 64, ezért a halmaznak n = 6 eleme van.'
      },
      {
        id: 'sq3-7',
        questionTypeBadge: 'Valós Számok és Végtelen Tizedestörtek',
        question: 'A 0,333... (végtelen szakaszos) és a 0,123456789101112... (nem szakaszos) számok mely halmazokba tartoznak?',
        figure: <NumberSetsVennSvg size={190} />,
        options: [
          'A 0,333... racionális (ℚ), míg a 0,123456789... irracionális (ℚ*)',
          'Mindkettő irracionális, mert végtelen tizedestört',
          'Mindkettő racionális, mert 0 és 1 közé esnek',
          'Egyik sem valós szám'
        ],
        correctAnswer: 0,
        hint: 'A szakaszos végtelen tizedestört felírható törtként (1/3 ∈ ℚ), a nem szakaszos nem (ezért ℚ*).',
        explanation: 'Minden végtelen szakaszos tizedestört felírható két egész hányadosaként (0,333... = 1/3 ∈ ℚ). A nem szakaszos tizedestört nem írható fel így, ezért irracionális (ℚ*).'
      },
      {
        id: 'sq3-8',
        questionTypeBadge: 'Részhalmaz Tranzitív Tulajdonsága',
        question: 'Ha tudjuk, hogy A ⊆ B és B ⊆ C, mit állíthatunk biztosan A és C kapcsolatáról?',
        figure: <SubsetVennSvg size={160} />,
        options: [
          'A ⊆ C (a részhalmaz reláció tranzitív)',
          'A = C',
          'A és C metszete üres',
          'Semmi biztosat nem állíthatunk'
        ],
        correctAnswer: 0,
        hint: 'Ha egy doboz benne van a középsőben, a középső pedig a nagyban, akkor a legkisebb benne van a legnagyobban is.',
        explanation: 'A részhalmaz reláció tranzitív: ha A minden eleme benne van B-ben, és B minden eleme benne van C-ben, akkor A minden eleme benne van C-ben is (A ⊆ C).'
      },
      {
        id: 'sq3-9',
        questionTypeBadge: 'Adott Elemeket Tartalmazó Részhalmazok',
        question: 'Legyen A = {1, 2, 3, 4, 5}. Hány olyan részhalmaza van A-nak, amely TARTALMAZZA az 1-es és 2-es elemet?',
        options: ['8 részhalmaz (2³)', '16 részhalmaz', '4 részhalmaz', '32 részhalmaz'],
        correctAnswer: 0,
        hint: 'Az 1-es és 2-es bent léte fix (1 lehetőség). A maradék 3 elemről {3, 4, 5} dönthetünk szabadon (2³).',
        explanation: 'Az 1-es és 2-es kötelezően bent van a részhalmazban. A maradék 3 elemről tetszőlegesen dönthetünk (benne van vagy sem): 2³ = 8 ilyen részhalmaz létezik.'
      },
      {
        id: 'sq3-10',
        questionTypeBadge: 'Üres Halmaz Hatványhalmaza',
        question: 'Hány eleme van az üres halmaz hatványhalmazának, P(∅)-nak?',
        figure: <EmptySetSvg size={150} />,
        options: ['1 eleme van (P(∅) = { ∅ }, 2⁰ = 1)', '0 eleme van', 'Nem létezik', '2 eleme van'],
        correctAnswer: 0,
        hint: 'Az üres halmaznak n = 0 eleme van: 2⁰ = 1.',
        explanation: 'Mivel |∅| = 0, a hatványhalmaz elemszáma 2⁰ = 1. Az egyetlen részhalmaza maga az üres halmaz: P(∅) = { ∅ }.'
      }
    ]
  }
};

const setsCheatSheets: CheatSheetCard[] = [
  {
    id: 'scs-1',
    title: 'A Halmaz Alapfogalmai & Jelölései',
    formula: 'x \\in A \\quad | \\quad y \\notin A \\quad | \\quad |A| = \\text{elemszám}',
    description: 'Egyértelműen eldönthető dolgok összessége. A sorrend közömbös, minden elem csak egyszer számít.',
    note: 'Megadás: elemek felsorolásával {a, b} vagy közös tulajdonsággal {x ∈ ℕ | x < 5}.',
    figure: <ElementBelongingSvg size={140} />,
    color: 'teal'
  },
  {
    id: 'scs-2',
    title: 'A Nevezetes Számhalmazok Lánca',
    formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\quad \\text{és} \\quad \\mathbb{Q}^* \\subset \\mathbb{R}',
    description: 'ℕ: természetes számok (0, 1, 2..), ℤ: egészek, ℚ: törtek (a/b), ℚ*: irracionálisok (√2, π), ℝ: valós számok.',
    note: 'Fontos: a négyzetszámok gyöke nem irracionális! Pl. √16 = 4 ∈ ℕ.',
    figure: <NumberSetsVennSvg size={150} />,
    color: 'cyan'
  },
  {
    id: 'scs-3',
    title: 'Részhalmaz & Valódi Részhalmaz',
    formula: 'A \\subseteq B \\iff (x \\in A \\implies x \\in B) \\quad | \\quad A \\subset B \\text{ (ha } A \\neq B\\text{)}',
    description: 'A ⊆ B: A minden eleme benne van B-ben. Valódi részhalmaznál B-nek van legalább egy plusz eleme.',
    note: 'Minden halmaz részhalmaza önmagának (A ⊆ A), de nem valódi részhalmaza!',
    figure: <SubsetVennSvg size={140} />,
    color: 'indigo'
  },
  {
    id: 'scs-4',
    title: 'Az Üres Halmaz & Részhalmazok Száma',
    formula: '|\\emptyset| = 0 \\quad | \\quad \\emptyset \\subseteq A \\quad | \\quad 2^n \\text{ részhalmaz}',
    description: 'Az üres halmaznak 0 eleme van, és minden halmaznak részhalmaza. Egy n elemű halmaznak pontosan 2ⁿ részhalmaza van.',
    note: 'Valódi részhalmazok száma: 2ⁿ - 1 (maga A nélkül). Nem-üres részhalmazok száma: 2ⁿ - 1 (∅ nélkül).',
    figure: <PowerSetTreeSvg size={150} />,
    color: 'purple'
  }
];

export const SetsQuiz: React.FC<SetsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      levelConfigs={quizLevels}
      cheatSheetCards={setsCheatSheets}
      defaultLevel={1}
      topicId="g9-komb-halmazok-quiz"
      topicTitle="9. Osztály - Halmazok Alapjai, Számhalmazok és Részhalmazok"
      themeColor="teal"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a halmazelméleti fogalmakat és a számhalmazokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SetsMatcher
              key={`sets-matcher-${level}`}
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
          subtitle: 'Kategorizáld a számokat és a részhalmazokat típus szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SetsSorter
              key={`sets-sorter-${level}`}
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

export default SetsQuiz;
