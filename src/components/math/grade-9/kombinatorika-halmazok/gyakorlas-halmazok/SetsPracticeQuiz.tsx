import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SetsPracticeMatcher } from './SetsPracticeMatcher';
import { SetsPracticeSorter } from './SetsPracticeSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';
import {
  ThreeSetsVennRegionsSvg,
  SymmetricDifferenceSvg,
  NumberSetsHierarchySvg,
  SubsetInclusionVennSvg,
  DisjointSetsVennSvg,
  ComplexIntervalZIntersectionSvg,
  PowerSetTreeSvg
} from './SetsPracticeFigures';

interface SetsPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Halmazfogalmak és Számhalmazok (Könnyű)',
    subtitle: 'Számhalmazok besorolása, részhalmazok száma, alapvető unió, metszet és különbség.',
    range: '1 - 10. feladat',
    focus: 'Alapismeretek és Alapműveletek',
    questions: [
      {
        id: 'spq1-1',
        questionTypeBadge: 'Számhalmazok',
        question: 'Melyik számhalmazba tartozik a √2 értéke a legszűkebb értelemben?',
        figure: <NumberSetsHierarchySvg size={185} />,
        options: ['ℚ* (Irracionális számok)', 'ℚ (Racionális számok)', 'ℤ (Egész számok)', 'ℕ (Természetes számok)'],
        correctAnswer: 0,
        hint: 'A √2 végtelen, nem szakaszos tizedestört, nem írható fel két egész szám hányadosaként.',
        explanation: 'A √2 nem racionális szám (nem írható fel p/q alakban), így a valós számokon belül az irracionális számok (ℚ*) halmazába tartozik.'
      },
      {
        id: 'spq1-2',
        questionTypeBadge: 'Részhalmazok Száma',
        question: 'Hány részhalmaza van egy 4 elemű halmaznak összesen?',
        figure: <PowerSetTreeSvg size={185} />,
        options: ['16 részhalmaz', '8 részhalmaz', '12 részhalmaz', '32 részhalmaz'],
        correctAnswer: 0,
        hint: 'Egy n elemű halmaz összes részhalmazának száma 2ⁿ.',
        explanation: 'Minden elemről függetlenül eldönthetjük, hogy benne van-e az adott részhalmazban vagy sem (2 lehetőség betételenként). Tehát 2⁴ = 16 részhalmaz létezik (beleértve az üres halmazt és saját magát is).'
      },
      {
        id: 'spq1-3',
        questionTypeBadge: 'Intervallum és Egészek',
        question: 'Hány eleme van a [-2; 3] ∩ ℤ halmaznak?',
        figure: <ComplexIntervalZIntersectionSvg size={185} />,
        options: ['6 elem', '5 elem', ' végtelen sok elem', '4 elem'],
        correctAnswer: 0,
        hint: 'Sorold fel a [-2; 3] zárt intervallumba eső egész számokat!',
        explanation: 'A [-2; 3] zárt intervallumba eső egész számok: {-2, -1, 0, 1, 2, 3}. Ez pontosan 6 darab szám.'
      },
      {
        id: 'spq1-4',
        questionTypeBadge: 'Diszjunkt Halmazok',
        question: 'Ha két halmaz diszjunkt (A ∩ B = ∅), és |A| = 7, |B| = 5, akkor mennyi |A ∪ B|?',
        figure: <DisjointSetsVennSvg size={180} />,
        options: ['12', '2', '35', '0'],
        correctAnswer: 0,
        hint: 'Mivel nincs közös elemük (|A ∩ B| = 0), a szitaformula egyszerű összeadássá válik.',
        explanation: '|A ∪ B| = |A| + |B| - |A ∩ B| = 7 + 5 - 0 = 12.'
      },
      {
        id: 'spq1-5',
        questionTypeBadge: 'Halmazkülönbség',
        question: 'Legyen A = {1, 2, 3, 4, 5} és B = {3, 5, 7, 9}. Mi lesz az A \\ B különbséghalmaz?',
        options: ['{1, 2, 4}', '{7, 9}', '{3, 5}', '{1, 2, 3, 4, 5, 7, 9}'],
        correctAnswer: 0,
        hint: 'Az A \\ B azokat az elemeket tartalmazza, amelyek benne vannak A-ban, de nincsenek benne B-ben.',
        explanation: 'Az A-ból elvesszük a B-vel közös elemeket (3 és 5), így az A \\ B = {1, 2, 4} halmaz marad.'
      },
      {
        id: 'spq1-6',
        questionTypeBadge: 'Valódi Részhalmazok',
        question: 'Hány valódi részhalmaza van egy 5 elemű halmaznak?',
        options: ['31', '32', '30', '16'],
        correctAnswer: 0,
        hint: 'Valódi részhalmaz minden részhalmaz, kivéve a halmaz önmaga.',
        explanation: 'Összes részhalmaz: 2⁵ = 32. A valódi részhalmazok száma 2ⁿ - 1 = 32 - 1 = 31 (az üres halmaz valódi részhalmaz, csak maga a teljes halmaz nem).'
      },
      {
        id: 'spq1-7',
        questionTypeBadge: 'Racionális Számok',
        question: 'Melyik szám tartozik a racionális számok (ℚ) halmazába?',
        figure: <NumberSetsHierarchySvg size={185} />,
        options: ['-0,75', '√5', 'π', '√7'],
        correctAnswer: 0,
        hint: 'A racionális számok felírhatók két egész szám hányadosaként (p/q).',
        explanation: '-0,75 = -75/100 = -3/4, ami két egész szám hányadosa, tehát racionális szám. A √5, π, √7 irracionálisak.'
      },
      {
        id: 'spq1-8',
        questionTypeBadge: 'Tartalmazási Lánc',
        question: 'Melyik reláció írja le helyesen a nevezetes számhalmazok egymásba ágyazottságát?',
        figure: <SubsetInclusionVennSvg size={180} />,
        options: ['ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ', 'ℤ ⊆ ℕ ⊆ ℚ ⊆ ℝ', 'ℚ ⊆ ℤ ⊆ ℕ ⊆ ℝ', 'ℕ ⊆ ℚ ⊆ ℤ ⊆ ℝ'],
        correctAnswer: 0,
        hint: 'Minden természetes szám egész, minden egész felírható törtként (racionális), és mindez valós szám.',
        explanation: 'A helyes hierarchia: a természetes számok részei az egészeknek, az egészek a racionálisaknak, a racionálisak pedig a valós számoknak (ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ).'
      },
      {
        id: 'spq1-9',
        questionTypeBadge: 'Két Halmaz Szitaformulája',
        question: 'Ha |A| = 10, |B| = 8, és |A ∩ B| = 3, hány eleme van az A ∪ B uniónak?',
        options: ['15', '18', '21', '11'],
        correctAnswer: 0,
        hint: 'Használd a képletet: |A ∪ B| = |A| + |B| - |A ∩ B|.',
        explanation: '|A ∪ B| = 10 + 8 - 3 = 15. A közös részt csak egyszer számoljuk bele!'
      },
      {
        id: 'spq1-10',
        questionTypeBadge: 'Szimmetrikus Differencia',
        question: 'Mit jelent két halmaz szimmetrikus differenciája (A Δ B)?',
        figure: <SymmetricDifferenceSvg size={185} />,
        options: [
          '(A \\ B) ∪ (B \\ A), azaz a csak az egyik halmazba tartozó elemek',
          'A ∩ B, azaz a mindkét halmazba tartozó elemek',
          'A ∪ B, azaz a legalább az egyik halmazba tartozó elemek',
          'A \\ B, azaz a csak az A-ba tartozó elemek'
        ],
        correctAnswer: 0,
        hint: 'A szimmetrikus különbség a két halmaz uniója a közös metszet nélkül.',
        explanation: 'A Δ B = (A \\ B) ∪ (B \\ A) = (A ∪ B) \\ (A ∩ B). Pontosan azok az elemek, amelyek vagy csak A-ban, vagy csak B-ben vannak meg.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Műveleti Azonosságok, Intervallumok és Szitaformula (Közepes)',
    subtitle: 'Venn-diagramos szöveges feladatok, De Morgan azonosságok és intervallum-műveletek.',
    range: '11 - 20. feladat',
    focus: 'Összetett Halmazműveletek és Logikai Következtetések',
    questions: [
      {
        id: 'spq2-1',
        questionTypeBadge: 'Venn Szöveges Feladat',
        question: 'Egy 30 fős osztályban 18-an tanulnak angolt, 15-en németet, és 6-an mindkét nyelvet. Hányan nem tanulnak egyik nyelvet sem?',
        figure: <ThreeSetsVennRegionsSvg size={185} />,
        options: ['3 diák', '5 diák', '2 diák', '6 diák'],
        correctAnswer: 0,
        hint: 'Először számold ki a legalább egy nyelvet tanulók unióját: |A ∪ N| = 18 + 15 - 6.',
        explanation: '|A ∪ N| = 18 + 15 - 6 = 27 diák tanul legalább egy nyelvet. Mivel 30 fős az osztály, 30 - 27 = 3 diák nem tanul egyik nyelvet sem.'
      },
      {
        id: 'spq2-2',
        questionTypeBadge: 'De Morgan Szabály',
        question: 'Melyik kifejezéssel egyenlő a két halmaz uniójának komplementere: (A ∪ B)?',
        options: ['A ∩ B', 'A ∪ B', 'A \\ B', 'A Δ B'],
        correctAnswer: 0,
        hint: 'De Morgan szabálya: az unió komplementere a komplementerek metszete.',
        explanation: 'De Morgan I. törvénye szerint (A ∪ B) = A ∩ B. Aki nincs benne A vagy B uniójában, az sem A-ban nincs benne, ÉS B-ben sincs benne.'
      },
      {
        id: 'spq2-3',
        questionTypeBadge: 'Intervallum Kivonás',
        question: 'Mi az eredménye a [-3; 5[ \\ [1; 6] halmazkivonásnak?',
        options: ['[-3; 1[', '[-3; 1]', ']-3; 1[', '[-3; 6]'],
        correctAnswer: 0,
        hint: 'A [-3; 5[ intervallumból el kell távolítani minden számot, ami az [1; 6] intervallumban van. Az 1 benne van a levonandóban!',
        explanation: 'Mivel az 1 benne van a kivonandó [1; 6] halmazban, a megmaradó részben már nem szerepelhet, így az 1-nél nyílt lesz a határ: [-3; 1[.'
      },
      {
        id: 'spq2-4',
        questionTypeBadge: 'Intervallum és Egészek Metszete',
        question: 'Hány egész szám tartozik a ]-4; 2] intervallumba?',
        figure: <ComplexIntervalZIntersectionSvg size={185} />,
        options: ['6 darab (-3, -2, -1, 0, 1, 2)', '7 darab', '5 darab', 'végtelen sok'],
        correctAnswer: 0,
        hint: 'A -4 nyílt (nincs benne!), a 2 zárt (benne van!).',
        explanation: 'A ]-4; 2] ∩ ℤ halmaz elemei: {-3, -2, -1, 0, 1, 2}. Ez pontosan 6 darab egész szám.'
      },
      {
        id: 'spq2-5',
        questionTypeBadge: 'Szimmetrikus Differencia Kiszámítása',
        question: 'Ha A = {a, b, c, d} és B = {c, d, e, f}, akkor mi az A Δ B halmaz?',
        figure: <SymmetricDifferenceSvg size={185} />,
        options: ['{a, b, e, f}', '{c, d}', '{a, b}', '{a, b, c, d, e, f}'],
        correctAnswer: 0,
        hint: 'Vedd a két halmaz unióját, és vond ki a közös metszetet ({c, d})!',
        explanation: 'A \\ B = {a, b}, B \\ A = {e, f}. Ezek uniója A Δ B = {a, b, e, f}.'
      },
      {
        id: 'spq2-6',
        questionTypeBadge: 'Tartalmazás és Műveletek',
        question: 'Ha tudjuk, hogy A ⊆ B, akkor mennyi az A ∩ B és az A ∪ B értéke?',
        figure: <SubsetInclusionVennSvg size={180} />,
        options: ['A ∩ B = A és A ∪ B = B', 'A ∩ B = B és A ∪ B = A', 'A ∩ B = ∅ és A ∪ B = B', 'A ∩ B = A és A ∪ B = ∅'],
        correctAnswer: 0,
        hint: 'Ha A teljesen benne van B-ben, akkor a közös részük maga az A, az egyesítésük pedig a tágabb B.',
        explanation: 'Mivel A minden eleme benne van B-ben: a közös rész maga A (A ∩ B = A), az unió pedig nem ad hozzá semmi újat B-hez (A ∪ B = B).'
      },
      {
        id: 'spq2-7',
        questionTypeBadge: 'Komplementer Számítása',
        question: 'Legyen az alaphalmaz U = {1, 2, ..., 20}. Legyen A a 3-mal osztható számok halmaza. Hány eleme van az A komplementerének?',
        options: ['14 elem', '6 elem', '15 elem', '7 elem'],
        correctAnswer: 0,
        hint: 'Számold meg, hány 3-mal osztható szám van 1-től 20-ig, majd vond ki 20-ból!',
        explanation: 'A 3-mal osztható számok 20-ig: {3, 6, 9, 12, 15, 18} (6 darab). Így a komplementer elemszáma: |U| - |A| = 20 - 6 = 14.'
      },
      {
        id: 'spq2-8',
        questionTypeBadge: 'Adott Elemű Részhalmazok',
        question: 'Egy 5 elemű halmaznak hány pontosan 2 elemű részhalmaza van?',
        figure: <PowerSetTreeSvg size={185} />,
        options: ['10 részhalmaz', '20 részhalmaz', '5 részhalmaz', '15 részhalmaz'],
        correctAnswer: 0,
        hint: '5 elemből kiválasztunk 2 elemet a sorrend figyelmen kívül hagyásával: 5 alatt a 2.',
        explanation: 'Az 5 elemű halmazból a 2 elemű részhalmazok száma kombinatorikusan: (5 · 4) / (2 · 1) = 20 / 2 = 10.'
      },
      {
        id: 'spq2-9',
        questionTypeBadge: 'Metszet Kiszámítása Szitával',
        question: 'Ha |A ∪ B| = 25, |A| = 18 és |B| = 14, akkor hány eleme van a metszetüknek (|A ∩ B|)?',
        options: ['7 elem', '4 elem', '11 elem', '9 elem'],
        correctAnswer: 0,
        hint: 'A szitaformula átrendezve: |A ∩ B| = |A| + |B| - |A ∪ B|.',
        explanation: '|A ∩ B| = 18 + 14 - 25 = 32 - 25 = 7 elem.'
      },
      {
        id: 'spq2-10',
        questionTypeBadge: 'Nem Üres Valódi Részhalmazok',
        question: 'Egy halmaznak pontosan 62 darab nem üres, valódi részhalmaza van. Hány eleme van a halmaznak?',
        options: ['6 elem', '5 elem', '7 elem', '8 elem'],
        correctAnswer: 0,
        hint: 'A nem üres, valódi részhalmazok száma: 2ⁿ - 2 = 62.',
        explanation: '2ⁿ - 2 = 62 ⟹ 2ⁿ = 64 = 2⁶, így a halmaz elemszáma n = 6.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Három Halmazos Szita, Logika és Mesterfeladatok (Nehéz)',
    subtitle: '3-halmazos szöveges feladatok, hatványhalmaz-hierarchia és halmazelméleti paradoxonok.',
    range: '21 - 30. feladat',
    focus: '3-as Szitaformula, Halmazelmélet és Elemzések',
    questions: [
      {
        id: 'spq3-1',
        questionTypeBadge: '3 Halmazos Szitaformula',
        question:
          'Egy 40 fős táborban 22-en úsznak, 18-an fociznak, 16-an túráznak. 8-an úsznak és fociznak, 7-en úsznak és túráznak, 6-an fociznak és túráznak, és 3-an mindhármat csinálják. Hányan nem vesznek részt egyik programban sem?',
        figure: <ThreeSetsVennRegionsSvg size={190} />,
        options: ['2 fő', '4 fő', '1 fő', '5 fő'],
        correctAnswer: 0,
        hint: '|A ∪ B ∪ C| = 22 + 18 + 16 - (8 + 7 + 6) + 3.',
        explanation:
          '|A ∪ B ∪ C| = 56 - 21 + 3 = 38 fő vesz részt legalább egy programban. Mivel 40 fős a tábor, 40 - 38 = 2 táborozó nem vesz részt semmiben.'
      },
      {
        id: 'spq3-2',
        questionTypeBadge: 'Pontosan Két Sportot Űzők',
        question:
          'A 21. feladat táborozói közül hányan vesznek részt PONTOSAN KÉT programban?',
        figure: <ThreeSetsVennRegionsSvg size={190} />,
        options: ['12 fő', '15 fő', '9 fő', '21 fő'],
        correctAnswer: 0,
        hint: 'A páros metszetekből le kell vonni a hármas metszetet mindhárom páros mezőnél!',
        explanation:
          'Csak úszás+foci: 8 - 3 = 5; csak úszás+túra: 7 - 3 = 4; csak foci+túra: 6 - 3 = 3. Összesen pontosan kettőben: 5 + 4 + 3 = 12 fő.'
      },
      {
        id: 'spq3-3',
        questionTypeBadge: 'Szimmetrikus Diff Tulajdonság',
        question: 'Melyik összefüggés érvényes BÁRMELY A és B halmazra?',
        figure: <SymmetricDifferenceSvg size={185} />,
        options: [
          'A Δ B = (A ∪ B) \\ (A ∩ B)',
          'A Δ B = A ∪ B',
          'A Δ B = A ∩ B',
          'A Δ B = (A \\ B) ∩ (B \\ A)'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a Venn-diagramra: az egyesített területből kivágjuk a középső közös lencsét.',
        explanation:
          'A Δ B definíció szerint (A \\ B) ∪ (B \\ A), ami pontosan egyenlő az unióból kivont metszettel: (A ∪ B) \\ (A ∩ B).'
      },
      {
        id: 'spq3-4',
        questionTypeBadge: 'Oszthatósági Halmazok',
        question:
          'U = {1, 2, ..., 100}. Legyen A a 4-gyel, B a 6-tal osztható számok halmaza. Hány eleme van az A \\ B halmaznak?',
        options: ['17 elem', '25 elem', '8 elem', '19 elem'],
        correctAnswer: 0,
        hint: '|A| = 100 // 4 = 25. A közös metszet a legkisebb közös többszörössel (12) osztható számok!',
        explanation:
          '4-gyel oszthatóak száma: 25. 4 és 6 legkisebb közös többszöröse 12. A 12-vel oszthatóak száma: 100 // 12 = 8. Tehát |A \\ B| = 25 - 8 = 17 elem.'
      },
      {
        id: 'spq3-5',
        questionTypeBadge: 'Intervallum Komplementere',
        question: 'Ha az alaphalmaz a valós számok (ℝ), mi a [-2; 5[ félig nyílt intervallum komplementere?',
        options: [']-∞; -2[ ∪ [5; ∞[', ']-∞; -2] ∪ ]5; ∞[', ']-∞; -2[ ∩ [5; ∞[', '[-5; 2]'],
        correctAnswer: 0,
        hint: 'Ahol az eredeti zárt volt (-2), ott a komplementer nyílt lesz; ahol nyílt volt (5), ott zárt lesz.',
        explanation:
          'A [-2; 5[ intervallum pontjai x ≥ -2 és x < 5. Ennek tagadása: x < -2 vagy x ≥ 5, azaz ]-∞; -2[ ∪ [5; ∞[.'
      },
      {
        id: 'spq3-6',
        questionTypeBadge: 'Hatványhalmaz Hatványhalmaza',
        question: 'Legyen A = {1, 2}. Hány eleme van a 𝒫(𝒫(A)) másodlagos hatványhalmaznak?',
        figure: <PowerSetTreeSvg size={185} />,
        options: ['16 elem', '8 elem', '4 elem', '32 elem'],
        correctAnswer: 0,
        hint: 'Először számold ki |𝒫(A)|-t (2² = 4), majd vedd ennek a hatványhalmazát!',
        explanation:
          '|A| = 2 ⟹ |𝒫(A)| = 2² = 4 elem. Ennek hatványhalmaza: |𝒫(𝒫(A))| = 2⁴ = 16 elem.'
      },
      {
        id: 'spq3-7',
        questionTypeBadge: 'Logika és Tartalmazás',
        question: 'Egy állítás szerint „Minden x ∈ A elemre igaz, hogy x ∈ B”. Mivel cáfolható ez az állítás halmazelméletileg?',
        figure: <SubsetInclusionVennSvg size={180} />,
        options: [
          'Ha A \\ B ≠ ∅ (létezik olyan A-beli elem, ami nincs benne B-ben)',
          'Ha A ∩ B = ∅',
          'Ha A = B',
          'Ha B \\ A ≠ ∅'
        ],
        correctAnswer: 0,
        hint: 'Az állítás jelentése A ⊆ B. Egy egyetemes állítás cáfolata egyetlen ellenpélda felmutatása.',
        explanation:
          'Az eredeti állítás azt jelenti, hogy A ⊆ B. Ennek tagadása, hogy létezik legalább egy olyan x ∈ A, amelyre x ∉ B, ami pontosan azt jelenti, hogy az A \\ B különbséghalmaz nem üres (A \\ B ≠ ∅).'
      },
      {
        id: 'spq3-8',
        questionTypeBadge: 'Russell-paradoxon',
        question: 'Milyen alapvető problémára mutatott rá Bertrand Russell 1901-es halmazelméleti paradoxona?',
        options: [
          'A „minden olyan halmaz halmaza, amely nem tartalmazza önmagát” definíció logikai ellentmondáshoz vezet',
          'A valós számok nem rendezhetők sorba',
          'A végtelen halmazoknak nem létezhet elemszáma',
          'Két diszjunkt halmaz metszete sosem lehet üres'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a borbélyra, aki pontosan azokat borotválja a faluban, akik magukat nem borotválják.',
        explanation:
          'Ha R = {X | X ∉ X}, akkor R ∈ R pontosan akkor teljesülne, ha R ∉ R, ami feloldhatatlan antinómia (ellentmondás). Ez vezette a matematikusokat a formális axiomatikus halmazelmélet (ZFC) kidolgozásához.'
      },
      {
        id: 'spq3-9',
        questionTypeBadge: 'Végtelen Számosságok',
        question: 'Melyik állítás IGAZ a természetes számok (ℕ) és a racionális számok (ℚ) számosságáról?',
        figure: <NumberSetsHierarchySvg size={185} />,
        options: [
          'Mindkettő megszámlálhatóan végtelen (azonos a számosságuk)',
          'A racionális számok halmaza szigorúan nagyobb számosságú, mint ℕ',
          'A természetes számok halmaza nagyobb, mint a racionálisaké',
          'Egyik sem tekinthető végtelen halmaznak'
        ],
        correctAnswer: 0,
        hint: 'Georg Cantor megmutatta az átlós eljárással, hogy a törtek sorozatba rendezhetők.',
        explanation:
          'Cantor híres első átlós módszerével kölcsönösen egyértelmű megfeleltetés (bijekció) hozható létre ℕ és ℚ elemei között, így mindkét halmaz megszámlálhatóan végtelen (|ℕ| = |ℚ| = ℵ₀).'
      },
      {
        id: 'spq3-10',
        questionTypeBadge: 'Szitaformula Határok',
        question:
          'Egy 30 fős osztályban |A| = 18 és |B| = 16. Mi a LEGKISSEBB lehetséges értéke az |A ∩ B| metszetnek?',
        options: ['4 fő', '0 fő', '2 fő', '16 fő'],
        correctAnswer: 0,
        hint: '|A ∪ B| legfeljebb 30 lehet! |A ∩ B| = |A| + |B| - |A ∪ B|.',
        explanation:
          'Mivel |A ∪ B| legfeljebb a teljes osztály létszáma (30) lehet: |A ∩ B| = 18 + 16 - |A ∪ B| ≥ 34 - 30 = 4. Tehát legalább 4 diáknak mindkét csoportba tartoznia kell.'
      }
    ]
  }
};

const practiceCheatSheets: CheatSheetCard[] = [
  {
    title: 'Nevezetes Számhalmazok',
    formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\quad \\text{és} \\quad \\mathbb{Q}^*',
    description: 'Természetes (0, 1, ..), egész (negatívak is), racionális (törtek), irracionális (pl. √2, π) és valós számok.',
    note: 'ℚ és ℚ* diszjunktak, uniójuk a teljes ℝ.',
    figure: <NumberSetsHierarchySvg size={150} />,
    color: 'sky'
  },
  {
    title: 'Részhalmazok Száma & Hatványhalmaz',
    formula: '|\\mathcal{P}(A)| = 2^n \\quad | \\quad \\text{Valódi:} \\ 2^n - 1',
    description: 'Egy n elemű halmaznak 2ⁿ darab részhalmaza van. Nem üres valódi részhalmazok: 2ⁿ - 2.',
    note: '∅ és maga a halmaz is mindig részhalmaz.',
    figure: <PowerSetTreeSvg size={150} />,
    color: 'purple'
  },
  {
    title: 'Két Halmaz Szitaformulája',
    formula: '|A \\cup B| = |A| + |B| - |A \\cap B|',
    description: 'A metszetet egyszer le kell vonni, mert mindkét halmaz összeadásakor kétszer számolnánk.',
    note: 'Diszjunkt halmazoknál |A ∩ B| = 0, így egyszerű összeg.',
    figure: <DisjointSetsVennSvg size={150} />,
    color: 'emerald'
  },
  {
    title: 'Három Halmaz Szitaformulája',
    formula: '|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|',
    description: 'Hozzáadjuk az egyeseket, levonjuk a páros metszeteket, majd visszahozzuk a hármas metszetet.',
    note: 'Venn-diagramos szöveges feladatok kulcsa.',
    figure: <ThreeSetsVennRegionsSvg size={150} />,
    color: 'violet'
  },
  {
    title: 'Szimmetrikus Differencia',
    formula: 'A \\Delta B = (A \\setminus B) \\cup (B \\setminus A) = (A \\cup B) \\setminus (A \\cap B)',
    description: 'Pontosan azok az elemek, amelyek a két halmaz közül csak az egyikbe tartoznak bele.',
    note: 'A középső lencse (metszet) üresen marad.',
    figure: <SymmetricDifferenceSvg size={150} />,
    color: 'rose'
  }
];

export const SetsPracticeQuiz: React.FC<SetsPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Halmazok Gyakorló Kvíz"
      subtitle="Számhalmazok, szitaformula, De Morgan törvények és intervallumok 30 feladatban"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 GYAKORLÓ KVÍZ"
      themeColor="violet"
      levels={quizLevels}
      topicId="g9-komb-gyakorlas-halmaz-quiz"
      topicTitle="Gyakorlás (Halmazok)"
      grade={9}
      chapterId="kombinatorika-halmazok"
      cheatSheetCards={practiceCheatSheets}
      cheatSheetTitle="Halmazelméleti Összefoglaló Segédlet"
      emoji="🟣"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a feladatokat és a helyes halmazműveleti képleteket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <SetsPracticeMatcher
              key={`sets-practice-matcher-${level}`}
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
          subtitle: 'Kategorizáld a kifejezéseket és állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <SetsPracticeSorter
              key={`sets-practice-sorter-${level}`}
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

export default SetsPracticeQuiz;
