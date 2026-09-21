import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { CircleMatcher } from './CircleMatcher';
import { CircleSorter } from './CircleSorter';
import {
  CircleElementsOverviewDiagram,
  CircleLineRelationshipsDiagram,
  CircleSectorsDiagram,
  CirclePartHighlightFigure
} from './CircleDiagrams';
import { Circle, Compass, Target, Calculator, Sparkles, PieChart } from 'lucide-react';

export interface CircleQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function CircleQuiz({ onBack, onSwitchToTheory }: CircleQuizProps) {
  const questions: QuizQuestion[] = [
    // ==========================================
    // 1. SZINT: ALAPFOGALMAK ÉS VONALAK (1 - 10.)
    // ==========================================
    {
      id: 'cq1',
      level: 1,
      prompt: 'Mi a körvonal (kör) pontos geometriai meghatározása a síkban?',
      questionTypeBadge: 'Alapfogalom',
      figure: <CirclePartHighlightFigure highlight="center" label="O középpont és r távolság" />,
      options: [
        'A sík azon pontjainak halmaza, amelyek egy adott O ponttól (középponttól) pontosan egyenlő r távolságra vannak.',
        'A sík bármely négy egyenes által határolt zárt alakzata.',
        'A sík azon pontjai, amelyek két tetszőleges ponttól egyenlő távolságra helyezkednek el.',
        'Minden olyan zárt görbe, amelynek nincsenek csúcsai.'
      ],
      correctAnswer: 'A sík azon pontjainak halmaza, amelyek egy adott O ponttól (középponttól) pontosan egyenlő r távolságra vannak.',
      explanation:
        'A kör (körvonal) a sík azon pontjainak összessége, amelyek a sík egy rögzített pontjától (a középponttól, O) egyenlő r távolságra (sugár) helyezkednek el.',
      breakdown: [
        { label: 'Középpont (O)', value: 'Fix viszonyítási pont' },
        { label: 'Sugár (r)', value: 'Állandó távolság' },
        { label: 'Körlap', value: 'A körvonal és a belső pontok együtt' }
      ],
      hint: 'Minden pontja pontosan ugyanakkora r távolságra van a középponttól!'
    },
    {
      id: 'cq2',
      level: 1,
      prompt: 'Mi a kör sugara (r)?',
      questionTypeBadge: 'Fogalom',
      figure: <CirclePartHighlightFigure highlight="radius" />,
      options: [
        'A középpontot a körvonal bármely pontjával összekötő szakasz (vagy annak hossza).',
        'A körvonal két tetszőleges pontját összekötő tetszőleges szakasz.',
        'A teljes körvonal kerületi hossza.',
        'A körön kívül haladó egyenes szakasz.'
      ],
      correctAnswer: 'A középpontot a körvonal bármely pontjával összekötő szakasz (vagy annak hossza).',
      explanation:
        'A sugár (r - rádiusz) a középpontot a körvonal bármely pontjával összekötő szakasz, illetve ennek a szakasznak a hossza.',
      hint: 'A középpontból (O) a körvonal széléig húzott szakasz.'
    },
    {
      id: 'cq3',
      level: 1,
      prompt: 'Milyen kapcsolat van a kör átmérője (d) és sugara (r) között?',
      questionTypeBadge: 'Összefüggés',
      figure: <CirclePartHighlightFigure highlight="diameter" />,
      options: [
        'Az átmérő pontosan a sugár kétszerese: d = 2 · r',
        'Az átmérő a sugár fele: d = r / 2',
        'Az átmérő a sugár négyzete: d = r²',
        'Az átmérő mindig 10 cm-rel hosszabb a sugárnál.'
      ],
      correctAnswer: 'Az átmérő pontosan a sugár kétszerese: d = 2 · r',
      explanation:
        'Az átmérő a középponton áthaladó húr, amely két egymással szemközti sugárból áll, így hossza mindig pontosan a sugár kétszerese: d = 2 · r.',
      breakdown: [
        { label: 'Képlet', value: 'd = 2 · r' },
        { label: 'Megfordítva', value: 'r = d / 2' }
      ],
      hint: 'Két sugár alkot egy teljes átmérőt a középponton át.'
    },
    {
      id: 'cq4',
      level: 1,
      prompt: 'Ha egy kör sugara r = 7 cm, mekkora az átmérője (d)?',
      questionTypeBadge: 'Számolás',
      options: ['14 cm', '3.5 cm', '49 cm', '21 cm'],
      correctAnswer: '14 cm',
      explanation:
        'Az átmérő a sugár kétszerese: d = 2 · r = 2 · 7 cm = 14 cm.',
      breakdown: [
        { label: 'Adat', value: 'r = 7 cm' },
        { label: 'Számítás', value: 'd = 2 · 7 cm = 14 cm' }
      ],
      hint: 'Szorozd meg a sugarat kettővel!'
    },
    {
      id: 'cq5',
      level: 1,
      prompt: 'Hogyan nevezzük a körvonal két tetszőleges pontját összekötő egyenes szakaszt?',
      questionTypeBadge: 'Fogalom',
      figure: <CirclePartHighlightFigure highlight="chord" />,
      options: ['Húr', 'Érintő', 'Körív', 'Sugár'],
      correctAnswer: 'Húr',
      explanation:
        'A körvonal két tetszőleges pontját összekötő egyenes szakaszt húrnak nevezzük. (A középponton áthaladó leghosszabb húr az átmérő).',
      hint: 'Két pontot köt össze a körvonalon, mint a kifeszített íjhúr.'
    },
    {
      id: 'cq6',
      level: 1,
      prompt: 'Melyik a kör leghosszabb húrja?',
      questionTypeBadge: 'Tulajdonság',
      figure: <CirclePartHighlightFigure highlight="diameter" />,
      options: [
        'Az átmérő (amely átmegy a középponton)',
        'A sugár',
        'Az érintő szakasz',
        'Minden húr hossza pontosan egyenlő'
      ],
      correctAnswer: 'Az átmérő (amely átmegy a középponton)',
      explanation:
        'A kör leghosszabb húrja a középponton áthaladó húr, amit átmérőnek (d) nevezünk. Minden más húr hossza ennél kisebb.',
      hint: 'A középponton átmenő húr a lehető leghosszabb a körben.'
    },
    {
      id: 'cq7',
      level: 1,
      prompt: 'Hány közös pontja van a körnek és egy érintő egyenesnek (e)?',
      questionTypeBadge: 'Egyenes és kör',
      figure: <CirclePartHighlightFigure highlight="tangent" />,
      options: ['Pontosan 1 közös pontja', '2 közös pontja', 'Nincs közös pontja', 'Végtelen sok közös pontja'],
      correctAnswer: 'Pontosan 1 közös pontja',
      explanation:
        'Az érintő egyenes (e) a kör síkjában fekvő olyan egyenes, amelynek pontosan 1 közös pontja van a körvonallal (az érintési pont).',
      breakdown: [
        { label: 'Közös pontok', value: '1 pont (Érintési pont)' },
        { label: 'Távolság O-tól', value: 'd(O, e) = r' }
      ],
      hint: 'Csak "súrolja" a kört egyetlen pontban.'
    },
    {
      id: 'cq8',
      level: 1,
      prompt: 'Hány közös pontja van egy szelő egyenesnek (s) a körvonallal?',
      questionTypeBadge: 'Egyenes és kör',
      figure: <CirclePartHighlightFigure highlight="secant" />,
      options: ['2 közös pontja', '1 közös pontja', '0 közös pontja', '3 közös pontja'],
      correctAnswer: '2 közös pontja',
      explanation:
        'A szelő egyenes (s) átmetszi a kört, így pontosan 2 közös pontja van a körvonallal. A két metszéspont közötti szakasz a húr.',
      hint: 'Keresztülvágja a kört, két pontban lép be és ki.'
    },
    {
      id: 'cq9',
      level: 1,
      prompt: 'Mit mondhatunk egy külső egyenesről a körhöz viszonyítva?',
      questionTypeBadge: 'Egyenes és kör',
      figure: <CirclePartHighlightFigure highlight="external_line" />,
      options: [
        'Nincs közös pontja a körrel, a középponttól mért távolsága nagyobb a sugárnál (d > r).',
        'Pontosan egy pontban érinti a kört.',
        'Két pontban metszi a kört.',
        'Áthalad a kör középpontján.'
      ],
      correctAnswer: 'Nincs közös pontja a körrel, a középponttól mért távolsága nagyobb a sugárnál (d > r).',
      explanation:
        'A külső egyenes a körön kívül halad el, 0 közös pontja van a körrel, és a középponttól mért merőleges távolsága nagyobb a sugárnál (d(O, e) > r).',
      hint: 'A körön kívül fut, sosem éri el a körvonalat.'
    },
    {
      id: 'cq10',
      level: 1,
      prompt: 'Mi a körív (í)?',
      questionTypeBadge: 'Fogalom',
      figure: <CirclePartHighlightFigure highlight="arc" />,
      options: [
        'A körvonal két pontja közé eső zárt, görbe vonaldarabja.',
        'Egy egyenes szakasz a körön belül.',
        'A kör teljes területe.',
        'A kör középpontjából kiinduló félegyenes.'
      ],
      correctAnswer: 'A körvonal két pontja közé eső zárt, görbe vonaldarabja.',
      explanation:
        'A körvonal két tetszőleges pontja a körvonalat két körívre osztja. A körív a körvonal egy folytonos darabja.',
      hint: 'A kör kerületének egy görbe darabkája.'
    },

    // ==========================================
    // 2. SZINT: SÍKRÉSZEK, SZÖGEK ÉS HELYZETEK (11 - 20.)
    // ==========================================
    {
      id: 'cq11',
      level: 2,
      prompt: 'Milyen vonalak határolják a körcikket (cikkelyt)?',
      questionTypeBadge: 'Síkrészek',
      figure: <CirclePartHighlightFigure highlight="sector" />,
      options: [
        'Két sugár és a közéjük eső körív (mint egy pizzaszelet).',
        'Egy húr és a hozzátartozó körív.',
        'Két párhuzamos egyenes és a körvonal.',
        'Négy sugár a körben.'
      ],
      correctAnswer: 'Két sugár és a közéjük eső körív (mint egy pizzaszelet).',
      explanation:
        'A körcikket (szektort) a középpontból kiinduló két sugár és az általuk közrezárt körív határolja (legszemléletesebb példája a torta- vagy pizzaszelet).',
      breakdown: [
        { label: 'Határoló elemek', value: '2 sugár + 1 körív' },
        { label: 'Csúcs', value: 'O (középpont)' }
      ],
      hint: 'Gondolj egy háromszög alakú pizzaszeletre, aminek a külső széle ívelt!'
    },
    {
      id: 'cq12',
      level: 2,
      prompt: 'Milyen elemek határolják a körszeletet?',
      questionTypeBadge: 'Síkrészek',
      figure: <CirclePartHighlightFigure highlight="segment" />,
      options: [
        'Egy húr és a hozzátartozó körív.',
        'Két sugár és egy körív.',
        'Két átmérő.',
        'Az érintő egyenes és a sugár.'
      ],
      correctAnswer: 'Egy húr és a hozzátartozó körív.',
      explanation:
        'A körszeletet egy húr és a hozzá tartozó körív határolja. Nem tartalmazza a középpontot (hacsak nem félkörről van szó).',
      hint: 'A húr levág a körlapból egy szeletet, mint amikor levágod a dinnye szélét.'
    },
    {
      id: 'cq13',
      level: 2,
      prompt: 'Hány fokos a teljes körhöz tartozó teljes középponti szög?',
      questionTypeBadge: 'Szögek',
      options: ['360°', '180°', '90°', '720°'],
      correctAnswer: '360°',
      explanation:
        'A teljes körvonalhoz egy teljes szög, azaz 360°-os középponti szög tartozik.',
      hint: 'Egy teljes körbefordulás 360 fok.'
    },
    {
      id: 'cq14',
      level: 2,
      prompt: 'Mekkora középponti szög tartozik egy félkörhöz?',
      questionTypeBadge: 'Szögek & Síkrészek',
      figure: <CirclePartHighlightFigure highlight="semicircle" />,
      options: ['180° (egyenesszög)', '90° (derékszög)', '360° (teljes szög)', '45° (félderékszög)'],
      correctAnswer: '180° (egyenesszög)',
      explanation:
        'A félkör a teljes kör (360°) fele, így a hozzá tartozó középponti szög egy egyenesszög: 360° / 2 = 180°.',
      breakdown: [
        { label: 'Teljes szög', value: '360°' },
        { label: 'Félkör szöge', value: '360° / 2 = 180°' }
      ],
      hint: 'A kör feléhez tartozó szög az egyenesszög.'
    },
    {
      id: 'cq15',
      level: 2,
      prompt: 'Ha egy kör átmérője d = 26 cm, mekkora a sugara (r)?',
      questionTypeBadge: 'Számolás',
      options: ['13 cm', '52 cm', '676 cm', '26 cm'],
      correctAnswer: '13 cm',
      explanation:
        'A sugár az átmérő fele: r = d / 2 = 26 cm / 2 = 13 cm.',
      breakdown: [
        { label: 'Képlet', value: 'r = d / 2' },
        { label: 'Számítás', value: '26 cm / 2 = 13 cm' }
      ],
      hint: 'Oszd el az átmérőt 2-vel!'
    },
    {
      id: 'cq16',
      level: 2,
      prompt: 'Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?',
      questionTypeBadge: 'Érintési tétel',
      figure: <CirclePartHighlightFigure highlight="tangent" />,
      options: [
        'Pontosan 90°-ot (merőleges egymásra: e ⊥ r)',
        '45°-os hegyesszöget',
        '180°-os egyenesszöget',
        'Bármilyen szöget bezárhat, a sugártól függően'
      ],
      correctAnswer: 'Pontosan 90°-ot (merőleges egymásra: e ⊥ r)',
      explanation:
        'Alapvető geometriai tétel: a kör érintője mindig merőleges az érintési pontba húzott sugárra (e ⊥ r), azaz pontosan 90°-os szöget zárnak be.',
      breakdown: [
        { label: 'Tétel', value: 'Érintő és sugár merőlegessége' },
        { label: 'Szög', value: 'α = 90° (derékszög)' }
      ],
      hint: 'A kör érintője mindig derékszöget zár be a sugárral az érintési pontban!'
    },
    {
      id: 'cq17',
      level: 2,
      prompt: 'Egy r = 6 cm sugarú kör középpontjától egy e egyenes távolsága d = 9 cm. Milyen egyenesről van szó?',
      questionTypeBadge: 'Egyenes helyzete',
      figure: <CirclePartHighlightFigure highlight="external_line" />,
      options: [
        'Külső egyenes (nincs közös pontja a körrel, mivel d > r)',
        'Érintő egyenes (1 közös pont)',
        'Szelő egyenes (2 közös pont)',
        'Átmérő egyenes'
      ],
      correctAnswer: 'Külső egyenes (nincs közös pontja a körrel, mivel d > r)',
      explanation:
        'Mivel az egyenes távolsága a középponttól (9 cm) nagyobb, mint a kör sugara (6 cm), az egyenes elhalad a kör mellett (d > r), így külső egyenes, 0 közös ponttal.',
      breakdown: [
        { label: 'Feltétel', value: 'd = 9 cm > r = 6 cm' },
        { label: 'Típus', value: 'Külső egyenes' },
        { label: 'Közös pont', value: '0 darab' }
      ],
      hint: 'Hasonlítsd össze a távolságot a sugárral: 9 > 6.'
    },
    {
      id: 'cq18',
      level: 2,
      prompt: 'Egy r = 5 cm sugarú kör középpontjától egy s egyenes távolsága d = 3 cm. Hány pontban metszi az egyenes a kört?',
      questionTypeBadge: 'Egyenes helyzete',
      figure: <CirclePartHighlightFigure highlight="secant" />,
      options: ['2 pontban (szelő egyenes, mivel d < r)', '1 pontban (érintő)', '0 pontban (külső egyenes)', '5 pontban'],
      correctAnswer: '2 pontban (szelő egyenes, mivel d < r)',
      explanation:
        'Mivel a távolság (3 cm) kisebb a sugárnál (5 cm), az egyenes behatol a kör belsejébe és átmetszi azt (d < r), vagyis egy szelő, aminek pontosan 2 metszéspontja van.',
      hint: 'Mivel a távolság kisebb a sugárnál (3 < 5), az egyenes átvágja a kört.'
    },
    {
      id: 'cq19',
      level: 2,
      prompt: 'Mik a koncentrikus körök a síkban?',
      questionTypeBadge: 'Fogalom',
      figure: <CirclePartHighlightFigure highlight="concentric" />,
      options: [
        'Olyan körök, amelyeknek a középpontja (O) azonos, de a sugaruk hossza eltérő.',
        'Olyan körök, amelyek egyetlen pontban érintik egymást.',
        'Olyan körök, amelyek sugara és középpontja is teljesen azonos.',
        'Olyan körök, amelyek metszi egymást két pontban.'
      ],
      correctAnswer: 'Olyan körök, amelyeknek a középpontja (O) azonos, de a sugaruk hossza eltérő.',
      explanation:
        'A koncentrikus körök olyan közös középpontú körök, amelyeknek sugaruk különböző (mint például a céltábla karikái vagy a vízbe dobott kő hullámai).',
      hint: 'Ugyanabból a pontból rajzolt, különböző méretű körök (pl. céltábla).'
    },
    {
      id: 'cq20',
      level: 2,
      prompt: 'Mi a körgyűrű a síkban?',
      questionTypeBadge: 'Síkrészek',
      options: [
        'Két koncentrikus (közös középpontú) körvonal közé eső zárt síktartomány.',
        'A körvonal egyetlen pontja körüli sáv.',
        'Egy húr és egy átmérő által határolt terület.',
        'Négy érintő egyenes által bezárt terület.'
      ],
      correctAnswer: 'Két koncentrikus (közös középpontú) körvonal közé eső zárt síktartomány.',
      explanation:
        'A körgyűrű két azonos középpontú, de eltérő sugarú körvonal által határolt síkrész (mint egy alátét karika vagy egy fánk felülnézetből).',
      hint: 'Két azonos középpontú kör közötti sáv, mint a karika vagy az alátét.'
    },

    // ==========================================
    // 3. SZINT: TÉTELEK, SZIMMETRIÁK ÉS KÉPLETEK (21 - 30.)
    // ==========================================
    {
      id: 'cq21',
      level: 3,
      prompt: 'Hány szimmetriatengelye van egy körnek a síkban?',
      questionTypeBadge: 'Szimmetria',
      options: [
        'Végtelen sok (a kör középpontján áthaladó bármely egyenes szimmetriatengely)',
        'Pontosan 4 szimmetriatengelye',
        'Pontosan 2 szimmetriatengelye',
        'Egyetlen szimmetriatengelye sincs'
      ],
      correctAnswer: 'Végtelen sok (a kör középpontján áthaladó bármely egyenes szimmetriatengely)',
      explanation:
        'A kör az egyik legtökéletesebb szimmetrikus síkidom: bármely, a középpontján (O) áthaladó egyenesre tükrözve önmagába megy át, így végtelen sok szimmetriatengelye van.',
      breakdown: [
        { label: 'Tengelyek száma', value: 'Végtelen sok' },
        { label: 'Feltétel', value: 'Át kell mennie az O középponton' },
        { label: 'Forgásszimmetria', value: 'Bármilyen szöggel forgatható' }
      ],
      hint: 'Bármilyen irányban felezed el a középponton át, a két fél pontosan fedi egymást.'
    },
    {
      id: 'cq22',
      level: 3,
      prompt: 'Hol metszik egymást egy kör szimmetriatengelyei?',
      questionTypeBadge: 'Szimmetria',
      options: [
        'Mindannyian a kör középpontjában (O) metszik egymást.',
        'A körvonal egy tetszőleges pontjában.',
        'Nem metszik egymást, mert mind párhuzamos.',
        'A körön kívül egy távoli fókuszpontban.'
      ],
      correctAnswer: 'Mindannyian a kör középpontjában (O) metszik egymást.',
      explanation:
        'Mivel a kör minden szimmetriatengelye egy átmérőegyenes, mindegyik áthalad a kör középpontján (O), így ott metszik egymást.',
      hint: 'Minden szimmetriatengely átmegy a középponton.'
    },
    {
      id: 'cq23',
      level: 3,
      prompt: 'Mit állíthatunk egy kör tetszőleges húrjának felezőmerőlegeséről?',
      questionTypeBadge: 'Tételek',
      options: [
        'A kör bármely húrjának felezőmerőleges egyenese mindig áthalad a kör középpontján (O).',
        'Mindig érinti a kört egy pontban.',
        'Párhuzamos az átmérővel.',
        'Soha nem haladhat át a középponton.'
      ],
      correctAnswer: 'A kör bármely húrjának felezőmerőleges egyenese mindig áthalad a kör középpontján (O).',
      explanation:
        'Fontos geometriai tétel: a kör bármely húrjának felezőmerőlegese átmegy a kör középpontján (O), és a húrhoz tartozó körívet is felezi. Ezen alapul a kör középpontjának megszerkesztése is!',
      breakdown: [
        { label: 'Tétel', value: 'Húr felezőmerőlegese ⟹ O pont' },
        { label: 'Alkalmazás', value: 'Kör középpontjának megszerkesztése 2 húrral' }
      ],
      hint: 'Két húr felezőmerőlegesének metszéspontja adja meg a kör középpontját.'
    },
    {
      id: 'cq24',
      level: 3,
      prompt: 'Mit fejez ki a Ludolph-féle szám, a π (pi)?',
      questionTypeBadge: 'A π szám',
      options: [
        'Bármely kör kerületének és átmérőjének állandó arányát: π = K / d ≈ 3.14',
        'A kör sugarának és átmérőjének szorzatát.',
        'A kör középponti szögének nagyságát radiánban.',
        'A négyzet átlójának és oldalának arányát.'
      ],
      correctAnswer: 'Bármely kör kerületének és átmérőjének állandó arányát: π = K / d ≈ 3.14',
      explanation:
        'A π (pi) egy állandó szám: bármekkora kör kerületét osztjuk el az átmérőjével, mindig ugyanazt a számot kapjuk: π = K / d ≈ 3.14159... ≈ 3.14.',
      breakdown: [
        { label: 'Definíció', value: 'π = K / d' },
        { label: 'Kerekített érték', value: 'π ≈ 3.14 (vagy 22/7)' }
      ],
      hint: 'A kerület osztva az átmérővel mindig kb. 3.14.'
    },
    {
      id: 'cq25',
      level: 3,
      prompt: 'Melyik a kör kerületének (K) helyes számítási képlete?',
      questionTypeBadge: 'Képletek',
      options: [
        'K = 2 · r · π   (vagy   K = d · π)',
        'K = r² · π',
        'K = 4 · r · π',
        'K = (r · π) / 2'
      ],
      correctAnswer: 'K = 2 · r · π   (vagy   K = d · π)',
      explanation:
        'A kör kerülete a körvonal hossza: K = 2 · r · π, vagy mivel d = 2r, így K = d · π.',
      breakdown: [
        { label: 'Sugárral', value: 'K = 2 · r · π' },
        { label: 'Átmérővel', value: 'K = d · π' }
      ],
      hint: 'A kerület képletében a 2-es szorzó elöl áll: 2 · r · π.'
    },
    {
      id: 'cq26',
      level: 3,
      prompt: 'Számítsd ki egy r = 10 cm sugarú kör kerületét (K), ha π ≈ 3.14!',
      questionTypeBadge: 'Számolás',
      options: ['62.8 cm', '31.4 cm', '314 cm', '125.6 cm'],
      correctAnswer: '62.8 cm',
      explanation:
        'K = 2 · r · π = 2 · 10 cm · 3.14 = 20 · 3.14 = 62.8 cm.',
      breakdown: [
        { label: 'Képlet', value: 'K = 2 · r · π' },
        { label: 'Behelyettesítés', value: '2 · 10 · 3.14' },
        { label: 'Eredmény', value: '62.8 cm' }
      ],
      hint: 'Számold ki: 2 · 10 · 3.14 = 20 · 3.14.'
    },
    {
      id: 'cq27',
      level: 3,
      prompt: 'Melyik a kör területének (T) helyes számítási képlete?',
      questionTypeBadge: 'Képletek',
      options: [
        'T = r² · π',
        'T = 2 · r · π',
        'T = (d · π) / 2',
        'T = 2 · r²'
      ],
      correctAnswer: 'T = r² · π',
      explanation:
        'A körlap területének képlete: T = r² · π, ahol r a sugár és π ≈ 3.14.',
      breakdown: [
        { label: 'Képlet', value: 'T = r² · π' },
        { label: 'Mértékegység', value: 'cm², dm², m²' }
      ],
      hint: 'A területnél a sugár a négyzeten van (r²).'
    },
    {
      id: 'cq28',
      level: 3,
      prompt: 'Mennyi egy r = 5 cm sugarú kör területe (T), ha π ≈ 3.14?',
      questionTypeBadge: 'Számolás',
      options: ['78.5 cm²', '31.4 cm²', '15.7 cm²', '100 cm²'],
      correctAnswer: '78.5 cm²',
      explanation:
        'T = r² · π = 5² · 3.14 = 25 · 3.14 = 78.5 cm².',
      breakdown: [
        { label: 'Képlet', value: 'T = r² · π' },
        { label: 'Négyzetre emelés', value: '5² = 25' },
        { label: 'Szorzás', value: '25 · 3.14 = 78.5 cm²' }
      ],
      hint: 'Először emeld négyzetre az 5-öt (5 · 5 = 25), majd szorozd meg 3.14-gyel!'
    },
    {
      id: 'cq29',
      level: 3,
      prompt: 'Egy körben a körcikk középponti szöge α = 90° (negyedkör). Hányadrésze ez a körcikk a teljes kör területének?',
      questionTypeBadge: 'Arányok',
      figure: <CirclePartHighlightFigure highlight="quadrant" />,
      options: [
        'Egynegyede (1/4 része, mivel 90° / 360° = 1/4)',
        'Fele (1/2 része)',
        'Egyharmada (1/3 része)',
        'Egyhatoda (1/6 része)'
      ],
      correctAnswer: 'Egynegyede (1/4 része, mivel 90° / 360° = 1/4)',
      explanation:
        'A teljes kör 360°-os. Mivel 90° / 360° = 1/4, a 90°-os körcikk területe és ívhossza is pontosan egynegyede a teljes körének.',
      breakdown: [
        { label: 'Szögarány', value: '90° / 360° = 1/4' },
        { label: 'Körcikk területe', value: 'T_cikk = T / 4' }
      ],
      hint: '90 fok a 360 foknak pontosan az 1/4-e.'
    },
    {
      id: 'cq30',
      level: 3,
      prompt: 'Ha egy kör átmérője d = 12 cm, a kerülete K = 12 · π cm. Mekkora egy félkör határoló ívének a hossza?',
      questionTypeBadge: 'Ívhossz számolás',
      figure: <CirclePartHighlightFigure highlight="semicircle" />,
      options: ['6 · π cm (kb. 18.84 cm)', '12 · π cm', '3 · π cm', '24 · π cm'],
      correctAnswer: '6 · π cm (kb. 18.84 cm)',
      explanation:
        'A félkör íve a teljes kör kerületének pontosan a fele: í = K / 2 = (12 · π) / 2 = 6 · π cm (ami kb. 6 · 3.14 = 18.84 cm).',
      breakdown: [
        { label: 'Kör kerülete', value: 'K = 12π cm' },
        { label: 'Félkör íve', value: 'í = K / 2 = 6π cm ≈ 18.84 cm' }
      ],
      hint: 'A félkör íve a teljes kerület fele (K / 2).'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      title: 'A kör legfontosabb vonalai',
      description: 'Sugár (r), Átmérő (d = 2r), Húr és Körív',
      formula: 'd = 2 · r    és    r = d / 2',
      color: 'purple',
      content: <CircleElementsOverviewDiagram />
    },
    {
      title: 'Egyenes és kör kölcsönös helyzete',
      description: 'Érintő (1 pont, e ⊥ r), Szelő (2 pont), Külső egyenes (0 pont)',
      formula: 'Érintő: d(O,e) = r  |  Szelő: d(O,e) < r  |  Külső: d(O,e) > r',
      color: 'blue',
      content: <CircleLineRelationshipsDiagram />
    },
    {
      title: 'Kör síkrészei & Alakzatai',
      description: 'Körcikk (pizzaszelet), Körszelet (húr levágja), Körgyűrű, Félkör (180°)',
      formula: 'Félkör = 180°  |  Negyedkör = 90°  |  Teljes kör = 360°',
      color: 'amber',
      content: <CircleSectorsDiagram />
    },
    {
      title: 'Kerület, terület és a π szám',
      description: 'A kör kerületének és területének számítási képletei',
      formula: 'K = 2 · r · π = d · π    és    T = r² · π    (π ≈ 3.14)',
      color: 'emerald',
      content: (
        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
          <div className="font-bold text-emerald-800 dark:text-emerald-300">Összefoglaló képletgyűjtemény:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <div>• <strong className="text-emerald-600">Kerület (K):</strong> 2 · r · π (hosszmérték)</div>
            <div>• <strong className="text-emerald-600">Terület (T):</strong> r² · π (területmérték)</div>
            <div>• <strong className="text-emerald-600">Ludolph-féle π:</strong> π = K / d ≈ 3.14</div>
            <div>• <strong className="text-emerald-600">Szimmetriatengelyek:</strong> Végtelen sok (mind O-n át)</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <QuizTemplate
      title="A kör Kvíz"
      subtitle="Kör elemei, sugarak, húrok, érintők, síkrészek és képletek"
      badge="📐 6. Osztály • III. Geometria • 3. Fejezet"
      topicId="g6-circle-quiz"
      themeColor="purple"
      questions={questions}
      cheatSheetTitle="A kör Képtár & Képlettár"
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <CircleMatcher {...props} />}
      renderSorter={(props) => <CircleSorter {...props} />}
      matcherComponent={
        <CircleMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <CircleSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
