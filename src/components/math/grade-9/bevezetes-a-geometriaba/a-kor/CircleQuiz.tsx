import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CircleMatcher } from './CircleMatcher';
import { CircleSorter } from './CircleSorter';
import {
  CirclePartsSvg,
  LineCirclePositionsSvg,
  TangentSegmentsSvg
} from './CircleFigures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, PieChart } from 'lucide-react';

interface CircleQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Kör Részei és Kölcsönös Helyzetek (Könnyű)',
    subtitle: 'Sugár, átmérő, húr, körcikk, körszelet és a kör-egyenes helyzetek alapismeretei.',
    range: '1 - 10. feladat',
    focus: 'A kör geometriai elemei és fogalmai',
    questions: [
      {
        id: 'cq1-1',
        questionTypeBadge: 'A Kör Leghosszabb Húrja',
        question: 'Mi a kör leghosszabb húrja?',
        figure: <CirclePartsSvg size={200} />,
        options: ['Az átmérő (d = 2r)', 'A sugár (r)', 'A körcikk határolója', 'Nincs leghosszabb húr'],
        correctAnswer: 0,
        hint: 'A középponton átmenő húrt keressük.',
        explanation: 'A kör középpontján átmenő húr az átmérő, amelynek hossza a sugár kétszerese ($d = 2r$), és ez a körvonal bármely két pontja közötti maximális távolság.'
      },
      {
        id: 'cq1-2',
        questionTypeBadge: 'Körcikk Fogalma',
        question: 'Milyen alakzatok határolják a körcikket (a körlaprészletet)?',
        figure: <CirclePartsSvg size={200} />,
        options: [
          'Két sugár és egy körív (mint egy tortaszelet)',
          'Egy húr és egy körív',
          'Két párhuzamos húr',
          'Két érintőegyenes'
        ],
        correctAnswer: 0,
        hint: 'A körcikk csúcsa a kör középpontjában van, ahonnan két sugár indul ki.',
        explanation: 'A körcikket a kör középpontjából kiinduló két sugár és a hozzájuk tartozó körív határolja (például egy tortaszelet).'
      },
      {
        id: 'cq1-3',
        questionTypeBadge: 'Körszelet Fogalma',
        question: 'Milyen alakzatok határolják a körszeletet?',
        figure: <CirclePartsSvg size={200} />,
        options: [
          'Egy húr és a hozzá tartozó körív',
          'Két sugár és egy körív',
          'Két egymást metsző átmérő',
          'Két koncentrikus körvonal'
        ],
        correctAnswer: 0,
        hint: 'A körszeletet egy egyenes szakasz (húr) vágja le a kör pereméről.',
        explanation: 'A körszeletet a kör egy húrja és az általa levágott körív határolja.'
      },
      {
        id: 'cq1-4',
        questionTypeBadge: 'Érintő Alaptétele',
        question: 'Milyen szöget zár be az érintőegyenes az érintési pontba húzott sugárral?',
        figure: <LineCirclePositionsSvg size={200} />,
        options: ['Pontosan 90°-ot (derékszög, merőlegesek)', '45°-ot', '60°-ot', 'A kör sugarától függ'],
        correctAnswer: 0,
        hint: 'A kör érintőjének alaptétele: az érintési sugár mindig...',
        explanation: 'A kör alapvető tétele, hogy az érintési pontba húzott sugár mindig merőleges az érintőegyenesre ($OE \perp e$).'
      },
      {
        id: 'cq1-5',
        questionTypeBadge: 'Kör és Egyenes Helyzete',
        question: 'Hány közös pontja van a körnek egy olyan egyenessel, amelynek távolsága a középponttól d = 7 cm, ha a kör sugara r = 10 cm?',
        options: ['2 pontban metszi (szelő egyenes)', '1 pontban érinti (érintő)', '0 pont (külső egyenes)', 'Végtelen sok'],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze a távolságot a sugárral: d < r.',
        explanation: 'Mivel a távolság kisebb a sugárnál ($d = 7\text{ cm} < r = 10\text{ cm}$), az egyenes szelőegyenes, és pontosan 2 pontban metszi a kört.'
      },
      {
        id: 'cq1-6',
        questionTypeBadge: 'Érintő Távolsága',
        question: 'Egy r = 8 cm sugarú körhöz húzott érintő milyen távol van a kör középpontjától?',
        options: ['8 cm (pontosan r távolságra)', '16 cm', '0 cm', '4 cm'],
        correctAnswer: 0,
        hint: 'Az érintő távolsága megegyezik a kör sugarával.',
        explanation: 'Az érintőegyenes távolsága a középponttól definíció szerint megegyezik a sugárral: $d(O, e) = r = 8\text{ cm}$.'
      },
      {
        id: 'cq1-7',
        questionTypeBadge: 'Húr és Átmérő',
        question: 'Lehet-e egy kör húrjának hossza 14 cm, ha a kör sugara r = 6 cm?',
        options: [
          'Nem, mert a leghosszabb húr az átmérő (2 · 6 = 12 cm)',
          'Igen, ha a húr a középponttól távolabb van',
          'Igen, ha tompaszögű körcikkhez tartozik',
          'Csak akkor, ha szelő'
        ],
        correctAnswer: 0,
        hint: 'Egyetlen húr sem lehet hosszabb a kör átmérőjénél ($2r$).',
        explanation: 'A kör bármely húrjának hossza legfeljebb $2r = 2 \cdot 6 = 12\text{ cm}$ lehet. 14 cm hosszú húr egy $r = 6\text{ cm}$-es körben nem létezhet.'
      },
      {
        id: 'cq1-8',
        questionTypeBadge: 'Érintőszakaszok Szimmetriája',
        question: 'Egy külső P pontból két érintőt húzunk a körhöz. Mi mondható el az érintőszakaszok (|PE₁| és |PE₂|) hosszáról?',
        figure: <TangentSegmentsSvg size={200} />,
        options: [
          'Mindig egyenlő hosszúak (|PE₁| = |PE₂|)',
          'A közelebbi érintőszakasz hosszabb',
          'Összegük a sugárral egyenlő',
          'Csak akkor egyenlők, ha a pont a vízszintes tengelyen van'
        ],
        correctAnswer: 0,
        hint: 'Az érintőszakaszok tétele szerint a két derékszögű háromszög egybevágó.',
        explanation: 'Az érintőszakaszok tétele alapján bármely külső pontból a körhöz húzott két érintőszakasz hossza megegyezik: $|PE_1| = |PE_2|$.'
      },
      {
        id: 'cq1-9',
        questionTypeBadge: 'Húrfelező Merőleges',
        question: 'Mi a tulajdonsága a kör bármely húrjának felezőmerőlegesének?',
        options: [
          'Mindig átmegy a kör középpontján (O)',
          'Párhuzamos a húrral',
          'Érinti a kört',
          'Merőleges az átmérőre'
        ],
        correctAnswer: 0,
        hint: 'A kör középpontja egyenlő távol van a húr két végpontjától (sugárnyi távolságra).',
        explanation: 'Mivel a középpont mindkét húrvégponttól azonos ($r$) távolságra van, a szakaszfelező merőleges definíciója szerint a húrfelező merőleges mindig átmegy az $O$ középponton.'
      },
      {
        id: 'cq1-10',
        questionTypeBadge: 'Külső Egyenes Feltétele',
        question: 'Mikor mondjuk, hogy egy egyenes a kör külső egyenese?',
        options: [
          'Ha távolsága a középponttól nagyobb a sugárnál (d > r)',
          'Ha d < r',
          'Ha d = r',
          'Ha átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'Külső egyenesnek nincs közös pontja a körrel.',
        explanation: 'Egy egyenes akkor külső egyenes, ha $d(O, e) > r$, ekkor az egyenes egyetlen pontja sincs a körlapon belül vagy a körvonalon.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Húrok, Érintőszakaszok és Pitagorasz-tétel (Közepes)',
    subtitle: 'Húrhossz számítása középponti távolságból, érintőszakasz hossza és körök relációi.',
    range: '11 - 20. feladat',
    focus: 'Derékszögű háromszögek a körben',
    questions: [
      {
        id: 'cq2-1',
        questionTypeBadge: 'Érintőszakasz Számítása',
        question: 'Egy r = 5 cm sugarú kör középpontjától egy P pont 13 cm távolságra van. Milyen hosszú a P-ből a körhöz húzott érintőszakasz?',
        figure: <TangentSegmentsSvg size={200} />,
        options: ['12 cm', '8 cm', '√194 cm', '10 cm'],
        correctAnswer: 0,
        hint: 'Az OPE derékszögű háromszögben az átfogó OP = 13 cm, a befogó r = 5 cm. e = √(13² - 5²).',
        explanation: 'Az érintési sugár derékszöget zár be az érintővel: e² = d² - r² = 13² - 5² = 169 - 25 = 144, amiből e = √144 = 12 cm.'
      },
      {
        id: 'cq2-2',
        questionTypeBadge: 'Húrhossz Kiszámítása',
        question: 'Egy r = 10 cm sugarú kör középpontjától egy húr 6 cm távolságra van. Milyen hosszú a húr (h)?',
        options: ['16 cm', '8 cm', '12 cm', '4 cm'],
        correctAnswer: 0,
        hint: 'A felezett húr h/2 egy derékszögű háromszög befogója: (h/2) = √(10² - 6²) = 8 cm. A teljes húr ennek a duplája!',
        explanation: 'A derékszögű háromszögben az átfogó r = 10 cm, a távolság d = 6 cm. A félhúr h/2 = √(100 - 36) = √64 = 8 cm. A teljes húrhossz: h = 2 · 8 = 16 cm.'
      },
      {
        id: 'cq2-3',
        questionTypeBadge: 'Húrtávolság Számítása',
        question: 'Egy r = 17 cm sugarú körben egy húr hossza 30 cm. Milyen távol van ez a húr a kör középpontjától?',
        options: ['8 cm', '15 cm', '10 cm', '√64 cm'],
        correctAnswer: 0,
        hint: 'A félhúr h/2 = 15 cm. A távolság d = √(17² - 15²).',
        explanation: 'h/2 = 15 cm. d = √(17² - 15²) = √(289 - 225) = √64 = 8 cm. (A 8-15-17 pitagoraszi számhármas).'
      },
      {
        id: 'cq2-4',
        questionTypeBadge: 'Két Kör Kölcsönös Helyzete',
        question: 'Két kör sugara r₁ = 7 cm és r₂ = 4 cm. Középpontjaik távolsága d = 11 cm. Hogyan helyezkedik el a két kör egymáshoz képest?',
        options: [
          'Kívülről érintik egymást (d = r₁ + r₂)',
          'Metszik egymást',
          'Belülről érintik egymást',
          'Nincs közös pontjuk'
        ],
        correctAnswer: 0,
        hint: 'Vizsgáld meg a sugarak összegét: 7 + 4 = 11 = d.',
        explanation: 'Mivel a középponti távolság pontosan megegyezik a sugarak összegével ($d = r_1 + r_2 = 7 + 4 = 11\text{ cm}$), a két kör kívülről érinti egymást (pontosan 1 közös pontjuk van).'
      },
      {
        id: 'cq2-5',
        questionTypeBadge: 'Két Kör Kölcsönös Helyzete',
        question: 'Két kör sugara r₁ = 9 cm és r₂ = 3 cm. Középpontjaik távolsága d = 6 cm. Milyen a két kör kölcsönös helyzete?',
        options: [
          'Belülről érintik egymást (d = |r₁ - r₂|)',
          'Kívülről érintik egymást',
          'Metszik egymást 2 pontban',
          'Koncentrikusak'
        ],
        correctAnswer: 0,
        hint: 'A sugarak különbsége: 9 - 3 = 6 = d.',
        explanation: 'Mivel a középponti távolság pontosan a sugarak különbsége ($d = r_1 - r_2 = 9 - 3 = 6\text{ cm}$), a kisebb kör belülről érinti a nagyobb kört.'
      },
      {
        id: 'cq2-6',
        questionTypeBadge: 'Két Kör Metszése',
        question: 'Milyen feltétel mellett metszik egymást pontosan két pontban az r₁ és r₂ sugarú körök?',
        options: [
          '|r₁ - r₂| < d < r₁ + r₂',
          'd = r₁ + r₂',
          'd > r₁ + r₂',
          'd < |r₁ - r₂|'
        ],
        correctAnswer: 0,
        hint: 'A két sugár és a d távolság háromszöget kell, hogy alkosson (háromszög-egyenlőtlenség).',
        explanation: 'Két kör pontosan akkor metszi egymást 2 pontban, ha a két középpont és a metszéspontok valódi háromszöget alkotnak, azaz $|r_1 - r_2| < d < r_1 + r_2$.'
      },
      {
        id: 'cq2-7',
        questionTypeBadge: 'Koncentrikus Körök Gyűrűje',
        question: 'Két koncentrikus kör sugara 13 cm és 12 cm. A nagyobbik kör egy húrja érinti a kisebbik kört. Milyen hosszú ez a húr?',
        options: ['10 cm', '5 cm', '25 cm', '144 cm'],
        correctAnswer: 0,
        hint: 'Az érintési pont felezi a húrt. A félhúr h/2 = √(13² - 12²) = 5 cm.',
        explanation: 'A belső kör érintője merőleges a belső sugárra (12 cm). A külső kör sugara (13 cm) az átfogó. A félhúr h/2 = √(13² - 12²) = 5 cm, így a teljes húr h = 2 · 5 = 10 cm.'
      },
      {
        id: 'cq2-8',
        questionTypeBadge: 'Érintők Által Bezárt Szög',
        question: 'Egy külső P pontból húzott két érintőszakasz 60°-os szöget zár be egymással. Mekkora szöget zár be egymással a két érintési ponthoz húzott két sugár (az E₁OE₂ szög)?',
        options: ['120°', '90°', '60°', '150°'],
        correctAnswer: 0,
        hint: 'Az OE₁PE₂ négyszögben két szög derékszög (90° + 90° = 180°). A belső szögek összege 360°.',
        explanation: 'Az érintési pontoknál lévő szögek derékszögek (2 · 90° = 180°). A négyszög belső szögeinek összege 360°, így a szemközti szögek kiegészítik egymást 180°-ra: 180° - 60° = 120°.'
      },
      {
        id: 'cq2-9',
        questionTypeBadge: 'Érintő Szakasz Szögekkel',
        question: 'Az előző feladatban (a két érintő 60°-os szöget zár be, r = 6 cm), milyen távol van a P pont a kör középpontjától (|OP|)?',
        options: ['12 cm', '6√3 cm', '6√2 cm', '18 cm'],
        correctAnswer: 0,
        hint: 'Az OP szakasz felezi a 60°-os szöget, így egy 30°-60°-90°-os háromszöget kapunk, ahol a 30°-kal szemközti oldal a sugár (r = 6 cm).',
        explanation: 'Az OP egyenes szögfelező, így az OPE₁ derékszögű háromszögben a P-nél lévő szög 30°. A 30°-kal szemközti befogó a sugár (r = 6 cm). Ekkor az átfogó c = |OP| = 2 · r = 12 cm!'
      },
      {
        id: 'cq2-10',
        questionTypeBadge: 'Körvonal Pontjának Érintője',
        question: 'Hány érintő húzható egy körhöz a körvonal egy tetszőleges E pontjában?',
        options: ['Pontosan 1 darab', '2 darab', 'Végtelen sok', '0'],
        correctAnswer: 0,
        hint: 'A körvonal egy adott pontjában pontosan egyetlen merőleges egyenes húzható az ottani sugárra.',
        explanation: 'A körvonal bármely pontjában pontosan egyetlen érintőegyenes létezik (az adott érintési pontba húzott sugárra merőleges egyenes).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érintőnégyszögek és Összetett Geometriai Feladatok (Nehéz)',
    subtitle: 'Érintőnégyszögek szemközti oldalai, húrtrapéz beírt köre, érintőnégyszög és körgyűrű alkalmazások.',
    range: '21 - 30. feladat',
    focus: 'Emelt szintű körelmélet és bizonyítások',
    questions: [
      {
        id: 'cq3-1',
        questionTypeBadge: 'Érintőnégyszög Alaptétele',
        question: 'Egy konvex négyszög három egymást követő oldala a = 5 cm, b = 9 cm és c = 11 cm. Mekkorának kell lennie a negyedik (d) oldalnak, hogy a négyszög érintőnégyszög legyen?',
        options: ['7 cm', '15 cm', '12 cm', '3 cm'],
        correctAnswer: 0,
        hint: 'Az érintőnégyszög alaptétele: a + c = b + d.',
        explanation: 'a + c = b + d => 5 + 11 = 9 + d => 16 = 9 + d => d = 7 cm.'
      },
      {
        id: 'cq3-2',
        questionTypeBadge: 'Érintőnégyszög Kerülete',
        question: 'Egy érintőnégyszög két szemközti oldalának összege 24 cm. Mekkora a négyszög kerülete (K)?',
        options: ['48 cm', '24 cm', '96 cm', '36 cm'],
        correctAnswer: 0,
        hint: 'K = (a + c) + (b + d). Mivel a + c = b + d = 24 cm...',
        explanation: 'K = (a + c) + (b + d) = 24 + 24 = 48 cm.'
      },
      {
        id: 'cq3-3',
        questionTypeBadge: 'Rombusz mint Érintőnégyszög',
        question: 'Miért érintőnégyszög minden rombusz?',
        options: [
          'Mert minden oldala egyenlő, így a szemközti oldalpárok összege automatikusan megegyezik (a + a = a + a)',
          'Mert az átlói merőlegesek',
          'Mert minden szöge derékszög',
          'Csak akkor, ha négyzet'
        ],
        correctAnswer: 0,
        hint: 'Ellenőrizd az a + c = b + d feltételt egy rombuszra!',
        explanation: 'A rombusz mind a négy oldala egyenlő ($a$), ezért a szemközti oldalak összege: $a + a = 2a$, ami megegyezik a másik két oldal összegével ($a + a = 2a$). Így minden rombuszba írható kör.'
      },
      {
        id: 'cq3-4',
        questionTypeBadge: 'Húrtrapéz mint Érintőnégyszög',
        question: 'Egy szimmetrikus trapéz (húrtrapéz) alapjai a = 16 cm és c = 4 cm. Ha a trapézba kör írható (érintőnégyszög), milyen hosszú a trapéz szára (b)?',
        options: ['10 cm', '8 cm', '12 cm', '20 cm'],
        correctAnswer: 0,
        hint: 'A két szár egyenlő: b = d. a + c = 2b.',
        explanation: 'Az érintőnégyszög tétele szerint: a + c = b + d. Mivel a trapéz szimmetrikus, b = d, így 16 + 4 = 2b => 20 = 2b => b = 10 cm.'
      },
      {
        id: 'cq3-5',
        questionTypeBadge: 'Beírt Kör Sugara a Húrtrapézban',
        question: 'Az előző feladatbeli trapézban (alapok 16 cm és 4 cm, szár 10 cm) mekkora a beírt kör sugara (r)?',
        options: ['4 cm (magasság = 8 cm)', '5 cm', '8 cm', '3 cm'],
        correctAnswer: 0,
        hint: 'A trapéz magassága m a beírt kör átmérője (2r). A magasság kiszámításához vágj le egy derékszögű háromszöget: alapi befogója (16 - 4)/2 = 6 cm, átfogója 10 cm.',
        explanation: 'A derékszögű részháromszögben az átfogó 10 cm, a levágott alaprész (16 - 4) / 2 = 6 cm. A magasság m = √(10² - 6²) = 8 cm. Mivel a magasság a beírt kör átmérője: 2r = 8 cm => r = 4 cm.'
      },
      {
        id: 'cq3-6',
        questionTypeBadge: 'Derékszögű Érintőnégyszög Deltoid',
        question: 'Egy külső P pontból a körhöz húzott érintők 90°-os szöget zárnak be egymással. Ha a kör sugara r = 7 cm, milyen távol van a P pont a kör középpontjától (|OP|)?',
        options: ['7√2 cm (kb. 9,90 cm)', '14 cm', '7√3 cm', '7 cm'],
        correctAnswer: 0,
        hint: 'Mivel a két érintési pontnál 90° van, és P-nél is 90°, az O-nál lévő szög is 90°. Az OE₁PE₂ egy négyzet!',
        explanation: 'Az OE₁PE₂ négyszög mind a 4 szöge 90°, és szomszédos oldalai egyenlők ($r = 7\text{ cm}$), tehát négyzet! Az OP szakasz a négyzet átlója: $|OP| = r\sqrt{2} = 7\sqrt{2}\text{ cm}$.'
      },
      {
        id: 'cq3-7',
        questionTypeBadge: 'Körgyűrű Területe és Húr',
        question: 'Két koncentrikus kör által határolt körgyűrűben a belső kört érintő külső húr hossza 20 cm. Mennyi a körgyűrű területe (T_gyűrű)?',
        options: ['100π cm² (kb. 314 cm²)', '200π cm²', '400π cm²', '50π cm²'],
        correctAnswer: 0,
        hint: 'Mamikon-tétel: T_gyűrű = π · (R² - r²). A derékszögű háromszögből R² - r² = (h/2)²!',
        explanation: 'A derékszögű háromszögben R² = r² + (h/2)², vagyis R² - r² = (20/2)² = 10² = 100. A körgyűrű területe: T = π · R² - π · r² = π · (R² - r²) = 100π cm² (függetlenül a belső kör konkrét sugarától!).'
      },
      {
        id: 'cq3-8',
        questionTypeBadge: 'Közös Külső Érintőszakasz',
        question: 'Két egymáson kívül lévő kör sugara R = 8 cm és r = 3 cm, középpontjaik távolsága d = 13 cm. Milyen hosszú a közös külső érintőszakaszuk?',
        options: ['12 cm', '10 cm', '13 cm', '√194 cm'],
        correctAnswer: 0,
        hint: 'Toljuk el a közös érintőszakaszt a kisebbik kör középpontjába! Ekkor egy olyan derékszögű háromszöget kapunk, ahol az átfogó d = 13 cm, a befogó pedig R - r = 8 - 3 = 5 cm.',
        explanation: 'A kisebbik kör középpontjából a nagyobbik sugarára bocsátott merőleges egy derékszögű háromszöget ad, melynek átfogója d = 13 cm, egyik befogója R - r = 8 - 3 = 5 cm. Az érintőszakasz hossza: e = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.'
      },
      {
        id: 'cq3-9',
        questionTypeBadge: 'Közös Belső Érintőszakasz',
        question: 'Az előző két körnél (R = 8 cm, r = 3 cm, d = 13 cm) mennyi a két kör KÖZÖS BELSŐ érintőszakaszának hossza?',
        options: ['4√3 cm (kb. 6,93 cm)', '12 cm', '5 cm', '8 cm'],
        correctAnswer: 0,
        hint: 'Belső érintőnél a sugárösszeggel kell számolni: befogó = R + r = 8 + 3 = 11 cm. e_belső = √(13² - 11²).',
        explanation: 'A belső érintő eltolásával a befogó R + r = 8 + 3 = 11 cm lesz. e = √(13² - 11²) = √(169 - 121) = √48 = 4√3 cm.'
      },
      {
        id: 'cq3-10',
        questionTypeBadge: 'Körvonalak Metszésének Közös Húrja',
        question: 'Két egyenlő, r = 10 cm sugarú kör átmegy egymás középpontján (d = 10 cm). Milyen hosszú a két kör közös metszéshúrja?',
        options: ['10√3 cm (kb. 17,32 cm)', '10 cm', '10√2 cm', '20 cm'],
        correctAnswer: 0,
        hint: 'A két középpont és a metszéspontok egy rombuszt alkotnak, melynek oldalai 10 cm-esek. Az egyik átló d = 10 cm, a másik átló a keresett húr!',
        explanation: 'A rombuszt két szabályos háromszög alkotja, melyek oldala 10 cm. A közös húr a két szabályos háromszög magasságának összege: 2 · ((10 · √3) / 2) = 10√3 cm.'
      }
    ]
  }
};

export const CircleQuiz: React.FC<CircleQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="A kör"
      subtitle="30 feladat 3 szinten, párosító és csoportosító módokkal a kör részeiről, érintőiről és tételeiről"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-kor"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó geometriai párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <CircleMatcher
              key={`circle-matcher-${level}`}
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
          title: 'Csoportosító játék',
          subtitle: 'Csoportosítsd a kör elemeit és a kölcsönös helyzeteket!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <CircleSorter
              key={`circle-sorter-${level}`}
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
            title="A Kör Részei és Kölcsönös Helyzetei"
            icon={<Circle className="w-5 h-5 text-rose-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Átmérő:</strong> d = 2r (a leghosszabb húr)</li>
              <li><strong>Körcikk:</strong> 2 sugár + 1 ív (torta-szelet)</li>
              <li><strong>Körszelet:</strong> 1 húr + 1 ív</li>
              <li><strong>Szelő (d &lt; r):</strong> 2 metszéspont, húrhossz h = 2√(r² - d²)</li>
              <li><strong>Érintő (d = r):</strong> 1 közös pont, OE ⊥ e</li>
              <li><strong>Külső egyenes (d &gt; r):</strong> 0 közös pont</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Érintőszakaszok és Érintőnégyszög"
            icon={<Compass className="w-5 h-5 text-purple-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Érintőszakaszok tétele:</strong> |PE₁| = |PE₂| = √(d² - r²)</li>
              <li><strong>Szimmetria:</strong> OP felezi a két érintő szögét és a középponti szöget</li>
              <li><strong>Érintőnégyszög alaptétele:</strong> a + c = b + d (szemközti oldalak összege egyenlő)</li>
              <li><strong>Gyakori érintőnégyszögek:</strong> rombusz, deltoid, négyzet</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Két Kör Kölcsönös Helyzete"
            icon={<Layers className="w-5 h-5 text-blue-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Kívülről érintkező:</strong> d = r₁ + r₂ (1 pont)</li>
              <li><strong>Belülről érintkező:</strong> d = |r₁ - r₂| (1 pont)</li>
              <li><strong>Metsző körök:</strong> |r₁ - r₂| &lt; d &lt; r₁ + r₂ (2 pont)</li>
              <li><strong>Kívül elhelyezkedő:</strong> d &gt; r₁ + r₂ (0 pont)</li>
              <li><strong>Koncentrikus:</strong> d = 0 (közös középpont)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

