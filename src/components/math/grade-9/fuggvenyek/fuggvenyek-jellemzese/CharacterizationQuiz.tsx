import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CharacterizationMatcher } from './CharacterizationMatcher';
import { CharacterizationSorter } from './CharacterizationSorter';
import {
  PropertiesChecklistSvg,
  ParitySymmetrySvg,
  BoundednessSvg
} from './CharacterizationFigures';
import { BookOpen, TrendingUp, Scale, Sparkles, CheckCircle2, AlertTriangle, Target } from 'lucide-react';

interface CharacterizationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Függvényjellemzés Alapjai (Könnyű)',
    subtitle: 'Értelmezési tartomány, értékkészlet, zérushely, monotonitás és a szimmetriák alapjai.',
    range: '1 - 10. feladat',
    focus: 'A 6 Alapszempont Fogalmai',
    questions: [
      {
        id: 'cq1-1',
        questionTypeBadge: 'Fogalmi Alapok',
        question: 'Melyik koordinátatengely mentén határozzuk meg egy függvény értelmezési tartományát (D_f)?',
        figure: <PropertiesChecklistSvg size={240} />,
        options: [
          'A vízszintes x tengelyen (a bemeneti értékek halmaza)',
          'A függőleges y tengelyen (a kimeneti értékek halmaza)',
          'Az origóban',
          'Mindkét tengelyen egyszerre'
        ],
        correctAnswer: 0,
        hint: 'Az x a független változó, ebből áll az értelmezési tartomány.',
        explanation: 'Az értelmezési tartomány (D_f) a bemeneti változó (x) lehetséges értékeit tartalmazza, amit a vízszintes x tengelyre való merőleges vetítéssel olvasunk le.'
      },
      {
        id: 'cq1-2',
        questionTypeBadge: 'Értékkészlet Tengelye',
        question: 'Melyik tengelyről olvassuk le a függvény értékkészletét (R_f)?',
        options: [
          'A függőleges y tengelyről (a felvett függvényértékek vetülete)',
          'A vízszintes x tengelyről',
          'A koordinátarendszer átlójáról',
          'A zérushelyekből'
        ],
        correctAnswer: 0,
        hint: 'Az y = f(x) a kimenet.',
        explanation: 'Az értékkészlet (R_f) azon számok halmaza, amelyeket a függvény kimenetként felvesz; ezt a függőleges y tengelyre vetítve határozzuk meg.'
      },
      {
        id: 'cq1-3',
        questionTypeBadge: 'Zérushely Definíciója',
        question: 'Mit nevezünk egy függvény zérushelyének (x₀)?',
        options: [
          'Azon x értékeket, ahol a függvény értéke 0 lesz: f(x₀) = 0 (a grafikon és az x tengely metszéspontja)',
          'Azt a pontot, ahol a függvény eléri a legnagyobb értékét',
          'Az y tengellyel való metszéspontot: (0; b)',
          'A függvény értelmezési tartományának legkisebb elemét'
        ],
        correctAnswer: 0,
        hint: 'Zérushely = ahol a függvény értéke (magassága) nulla.',
        explanation: 'A zérushely az értelmezési tartomány azon eleme, amelyhez a függvény 0-t rendel (f(x) = 0). Geometriailag a grafikon itt metszi vagy érinti az x tengelyt.'
      },
      {
        id: 'cq1-4',
        questionTypeBadge: 'Páros Függvény Szimmetriája',
        question: 'Milyen szimmetriával rendelkezik egy páros függvény grafikonja?',
        figure: <ParitySymmetrySvg size={240} />,
        options: [
          'Tengelyesen szimmetrikus a függőleges y tengelyre: f(-x) = f(x)',
          'Középpontosan szimmetrikus az origóra: f(-x) = -f(x)',
          'Tengelyesen szimmetrikus a vízszintes x tengelyre',
          'Csak az origón átmenő egyenesek lehetnek párosak'
        ],
        correctAnswer: 0,
        hint: 'Ha x-et -x-re cserélve a magasság változatlan marad (pl. x², |x|).',
        explanation: 'Egy függvény akkor páros, ha f(-x) = f(x) minden x-re. Ez geometriailag az y tengelyre való tükörszimmetriát jelenti.'
      },
      {
        id: 'cq1-5',
        questionTypeBadge: 'Páratlan Függvény Szimmetriája',
        question: 'Milyen geometriai szimmetriát mutat egy páratlan függvény grafikonja?',
        options: [
          'Középpontosan szimmetrikus az origóra: f(-x) = -f(x) (180°-os forgatás)',
          'Tengelyesen szimmetrikus az y tengelyre',
          'Párhuzamos az x tengellyel',
          'Szimmetrikus az y = 1 egyenesre'
        ],
        correctAnswer: 0,
        hint: 'f(-x) = -f(x): a pontok az origón át tükröződnek az átellenes síknegyedbe.',
        explanation: 'Páratlan függvény esetén f(-x) = -f(x), ami az origóra való középpontos tükrözésnek (180°-os elforgatásnak) felel meg.'
      },
      {
        id: 'cq1-6',
        questionTypeBadge: 'Alulról Korlátosság',
        question: 'Mikor mondjuk egy függvényről, hogy alulról korlátos?',
        figure: <BoundednessSvg size={240} />,
        options: [
          'Ha létezik olyan k valós szám, amelynél a függvény egyetlen értéke sem kisebb: f(x) ≥ k',
          'Ha a grafikon nem megy át a negatív x tartományba',
          'Ha a függvénynek van zérushelye',
          'Ha az értelmezési tartománya véges intervallum'
        ],
        correctAnswer: 0,
        hint: 'Létezik egy olyan alsó vízszintes egyenes, amely alá sosem süllyed a grafikon.',
        explanation: 'Egy függvény alulról korlátos, ha van alsó korlátja (k), azaz értékkészletének van véges alsó határa (pl. R_f = [0; +∞[ esetén k = 0).'
      },
      {
        id: 'cq1-7',
        questionTypeBadge: 'Monotonitás Fogalma',
        question: 'Mit jelent pontosan, hogy egy függvény szigorúan monoton növekvő egy intervallumon?',
        options: [
          'Bármely két x₁ < x₂ érték esetén f(x₁) < f(x₂) (nagyobb bemenethez szigorúan nagyobb kimenet tartozik)',
          'A függvényértékek mind pozitív számok',
          'A grafikon egyenes vonal',
          'A függvény átmegy az origón'
        ],
        correctAnswer: 0,
        hint: 'Balról jobbra haladva (ahogy x nő) a grafikon folyamatosan felfelé emelkedik.',
        explanation: 'A szigorú növekedés azt jelenti, hogy ha x növekszik (x₁ < x₂), akkor a függvényérték is szigorúan növekszik: f(x₁) < f(x₂).'
      },
      {
        id: 'cq1-8',
        questionTypeBadge: 'Paritás Előfordulása',
        question: 'Igaz-e, hogy minden függvény vagy páros, vagy páratlan?',
        options: [
          'NEM igaz: a legtöbb függvény sem nem páros, sem nem páratlan',
          'IGAZ: minden függvény besorolható az egyik kategóriába',
          'Csak a lineáris függvényekre igaz',
          'Csak a másodfokú függvényekre igaz'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az f(x) = 2x - 3 függvényre: se nem y-tükrös, se nem origó-tükrös.',
        explanation: 'A számok valóban vagy párosak, vagy páratlanok, de a függvényeknél ez nem így van! A paritás egy különleges szimmetriatulajdonság, a függvények többsége sem páros, sem páratlan.'
      },
      {
        id: 'cq1-9',
        questionTypeBadge: 'Konstans Függvény Paritása',
        question: 'Páros vagy páratlan az f(x) = 4 konstans függvény?',
        options: [
          'Páros függvény, mert f(-x) = 4 = f(x) (tükrös az y tengelyre)',
          'Páratlan függvény, mert nincs benne x',
          'Egyik sem',
          'Egyszerre páros és páratlan'
        ],
        correctAnswer: 0,
        hint: 'Egy vízszintes egyenes y = 4 magasságban tükrös-e a függőleges y tengelyre?',
        explanation: 'Mivel f(-x) = 4 és f(x) = 4, f(-x) = f(x) teljesül, így az f(x) = 4 páros függvény.'
      },
      {
        id: 'cq1-10',
        questionTypeBadge: 'Értékkészlet Leolvasása Grafikonról',
        question: 'Egy parabola csúcspontja C(2; -5), szárai felfelé nyílnak. Mi az értékkészlete (R_f)?',
        options: [
          'R_f = [-5; +∞[',
          'R_f = [2; +∞[',
          'R_f = ]-∞; -5]',
          'R_f = ℝ'
        ],
        correctAnswer: 0,
        hint: 'A legalsó y érték a csúcs y koordinátája (-5), innen felfelé minden értéket felvesz.',
        explanation: 'Mivel a minimum értéke -5 és a szárak felfelé a végtelenbe tartanak, a felvett értékek összessége: R_f = [-5; +∞[.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Alapfüggvények Jellemzése (Közepes)',
    subtitle: 'Konkrét függvények paritása, monotonitási intervallumai, korlátai és zérushelyei.',
    range: '11 - 20. feladat',
    focus: 'Függvénytípusok Elemzése',
    questions: [
      {
        id: 'cq2-1',
        questionTypeBadge: 'Parabola Monotonitása',
        question: 'Mely intervallumokon szigorúan növekvő, illetve csökkenő az f(x) = x² függvény?',
        options: [
          ']-∞; 0] intervallumon szig. csökkenő, míg [0; +∞[ intervallumon szig. növekvő',
          'A teljes valós számok halmazán (ℝ) szigorúan növekvő',
          ']-∞; 0] intervallumon szig. növekvő, [0; +∞[ intervallumon szig. csökkenő',
          'Mindenütt szigorúan csökkenő'
        ],
        correctAnswer: 0,
        hint: 'A csúcspont az origóban van: az origóig lejt a parabola, onnan jobbra emelkedik.',
        explanation: 'Az f(x) = x² parabola az origóig (balról jobbra haladva) süllyed: ]-∞; 0] szigorúan csökkenő; az origótól jobbra emelkedik: [0; +∞[ szigorúan növekvő.'
      },
      {
        id: 'cq2-2',
        questionTypeBadge: 'Hiperbola Paritása és Értékkészlete',
        question: 'Milyen paritású az f(x) = 6 / x fordított arányosság függvény, és mi az értékkészlete?',
        options: [
          'Páratlan függvény, és R_f = ℝ \\ {0}',
          'Páros függvény, és R_f = ℝ',
          'Sem páros, sem páratlan, és R_f = [0; +∞[',
          'Páratlan függvény, és R_f = ℝ'
        ],
        correctAnswer: 0,
        hint: 'f(-x) = 6 / (-x) = -(6 / x) = -f(x). A kimenet sosem lehet 0.',
        explanation: 'f(-x) = -f(x), tehát páratlan (origóra szimmetrikus). A 6/x soha nem vehet fel 0 értéket, így R_f = ℝ \\ {0}.'
      },
      {
        id: 'cq2-3',
        questionTypeBadge: 'Eltolt Abszolútérték Paritása',
        question: 'Páros-e a g(x) = |x - 3| függvény?',
        options: [
          'NEM páros (és nem is páratlan), mert a csúcs eltolódott C(3; 0)-ba, nem tükrös az y tengelyre',
          'IGAZ, mert minden abszolútérték páros',
          'Páratlan függvény',
          'Csak negatív x-ekre páros'
        ],
        correctAnswer: 0,
        hint: 'g(-x) = |-x - 3| = |x + 3| ≠ |x - 3|.',
        explanation: 'Bár az alapfüggvény (|x|) páros, a vízszintes eltolás miatt a szimmetriatengely az x = 3 egyenesre került, így az y tengelyre már nem tükrös. Sem páros, sem páratlan!'
      },
      {
        id: 'cq2-4',
        questionTypeBadge: 'Monoton Függvény Zérushelyei',
        question: 'Legfeljebb hány zérushelye lehet egy olyan függvénynek, amely a teljes értelmezési tartományán szigorúan monoton növekvő?',
        options: [
          'Legfeljebb 1 zérushelye lehet',
          'Akár 2 zérushelye is lehet',
          'Végtelen sok',
          'Kötelezően pontosan 1 zérushelye van'
        ],
        correctAnswer: 0,
        hint: 'Ha egyszer átmetszette az x tengelyt felfelé, vissza tud-e kanyarodni, hogy újra átmetsze?',
        explanation: 'Mivel a függvény szigorúan növekszik, ha egyszer elérte a 0-t, utána már csak szigorúan pozitív értékeket vesz fel, sosem térhet vissza a 0-ba. Így legfeljebb 1 zérushelye lehet.'
      },
      {
        id: 'cq2-5',
        questionTypeBadge: 'Korlátosság Megállapítása',
        question: 'Melyik függvény korlátos FELÜLRŐL?',
        options: [
          'f(x) = -x² + 9',
          'f(x) = x² + 9',
          'f(x) = 2x - 3',
          'f(x) = |x|'
        ],
        correctAnswer: 0,
        hint: 'Olyan függvényt keress, amelynek van legmagasabb pontja (maximuma).',
        explanation: 'A -x² lefelé nyíló parabola, csúcspontja C(0; 9) a legfelső pont: minden értéke legfeljebb 9: f(x) ≤ 9. Ezért felülről korlátos (K = 9).'
      },
      {
        id: 'cq2-6',
        questionTypeBadge: 'Értékkészlet és Korlát Kapcsolata',
        question: 'Egy függvény értékkészlete R_f = [-3; 7]. Milyen korlátossággal rendelkezik a függvény?',
        options: [
          'Korlátos (alulról is és felülről is korlátos)',
          'Csak alulról korlátos',
          'Csak felülről korlátos',
          'Nem korlátos'
        ],
        correctAnswer: 0,
        hint: 'Van alsó határa (-3) és felső határa is (7).',
        explanation: 'Mivel az értékkészlet mindkét oldalról zárt és véges (-3 ≤ f(x) ≤ 7), a függvény alulról is és felülről is korlátos, azaz korlátos függvény.'
      },
      {
        id: 'cq2-7',
        questionTypeBadge: 'Lineáris Függvény Korlátossága',
        question: 'Korlátos-e az f(x) = 3x - 2 lineáris függvény a valós számok halmazán (D_f = ℝ)?',
        options: [
          'Nem korlátos sem alulról, sem felülről (R_f = ℝ)',
          'Alulról korlátos',
          'Felülről korlátos',
          'Mindkét oldalról korlátos'
        ],
        correctAnswer: 0,
        hint: 'Egy egyenes mindkét irányban a végtelenbe fut.',
        explanation: 'Nem nulla meredekségű lineáris függvénynél az egyenes -∞-től +∞-ig terjed, így sem alsó, sem felső korlátja nincs.'
      },
      {
        id: 'cq2-8',
        questionTypeBadge: 'Egyenes Arányosság Paritása',
        question: 'Milyen paritású az f(x) = -4x egyenes arányosság függvény?',
        options: [
          'Páratlan függvény, mert f(-x) = -4(-x) = 4x = -(-4x) = -f(x)',
          'Páros függvény, mert a meredekség páros szám (-4)',
          'Sem páros, sem páratlan',
          'Csak pozitív számokra páratlan'
        ],
        correctAnswer: 0,
        hint: 'Minden origón átmenő egyenes középpontosan szimmetrikus az origóra.',
        explanation: 'Minden f(x) = mx egyenes arányosság páratlan függvény, hiszen f(-x) = m(-x) = -(mx) = -f(x).'
      },
      {
        id: 'cq2-9',
        questionTypeBadge: 'Zérushelyek Száma Másodfokúnál',
        question: 'Hány zérushelye van az f(x) = x² + 4 függvénynek a valós számok halmazán?',
        options: [
          '0 zérushelye van (nem metszi az x tengelyt)',
          '2 zérushelye van: 2 és -2',
          '1 zérushelye van: x = 0',
          '4 zérushelye van'
        ],
        correctAnswer: 0,
        hint: 'x² + 4 = 0 ➔ x² = -4. Lehet-e egy valós szám négyzete negatív?',
        explanation: 'Valós számok körében x² ≥ 0, így x² + 4 ≥ 4. Sosem érheti el a 0-t, a parabola csúcspontja C(0; 4) a tengely felett van: 0 zérushely.'
      },
      {
        id: 'cq2-10',
        questionTypeBadge: 'Zérushelyek Száma Másodfokúnál',
        question: 'Hány zérushelye van az f(x) = x² - 9 függvénynek, és mik azok?',
        options: [
          '2 zérushelye van: x₁ = -3 és x₂ = 3',
          '1 zérushelye van: x₀ = 3',
          '0 zérushelye van',
          '2 zérushelye van: x₁ = -9 és x₂ = 9'
        ],
        correctAnswer: 0,
        hint: 'x² - 9 = 0 ➔ x² = 9.',
        explanation: 'x² = 9 két megoldása a valós számok között: x = 3 és x = -3. A grafikon két pontban metszi az x tengelyt.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Algebrai Igazolások és Korlátozott Tartományok (Nehéz)',
    subtitle: 'Paritás algebrai levezetése f(-x) vizsgálatával, korlátozott értelmezési tartományok értékkészlete.',
    range: '21 - 30. feladat',
    focus: 'Algebrai Paritás és Összetett Elemzés',
    questions: [
      {
        id: 'cq3-1',
        questionTypeBadge: 'Paritás Algebrai Igazolása',
        question: 'Milyen paritású az f(x) = x³ - 4x függvény?',
        options: [
          'Páratlan függvény, mert f(-x) = (-x)³ - 4(-x) = -x³ + 4x = -(x³ - 4x) = -f(x)',
          'Páros függvény, mert f(-x) = f(x)',
          'Sem páros, sem páratlan',
          'Csak akkor páratlan, ha x > 0'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be (-x)-et a kifejezésbe, és vizsgáld meg, hogy kiemelhető-e a negatív előjel!',
        explanation: 'f(-x) = (-x)³ - 4(-x) = -x³ + 4x = -(x³ - 4x) = -f(x). A definíció szerint a függvény páratlan.'
      },
      {
        id: 'cq3-2',
        questionTypeBadge: 'Paritás Algebrai Igazolása',
        question: 'Milyen paritású a g(x) = x⁴ + 3x² - 5 függvény?',
        options: [
          'Páros függvény, mert a negatív szám páros hatványai pozitívak maradnak: g(-x) = g(x)',
          'Páratlan függvény',
          'Sem páros, sem páratlan, mert van benne -5',
          'Csak az origóra szimmetrikus'
        ],
        correctAnswer: 0,
        hint: '(-x)⁴ = x⁴ és (-x)² = x².',
        explanation: 'g(-x) = (-x)⁴ + 3(-x)² - 5 = x⁴ + 3x² - 5 = g(x). Mivel g(-x) = g(x), a függvény páros.'
      },
      {
        id: 'cq3-3',
        questionTypeBadge: 'Vegyes Hatványok Paritása',
        question: 'Milyen paritású a h(x) = x² + 2x függvény?',
        options: [
          'Sem páros, sem páratlan, mert h(-x) = x² - 2x, ami nem egyenlő sem h(x)-szel, sem -h(x)-szel',
          'Páros függvény, mert a legmagasabb kitevő páros (2)',
          'Páratlan függvény, mert a 2x páratlan kitevőjű',
          'Egyszerre páros és páratlan'
        ],
        correctAnswer: 0,
        hint: 'h(-x) = (-x)² + 2(-x) = x² - 2x. Ez megegyezik x² + 2x-szel vagy -(x² + 2x)-szel?',
        explanation: 'h(-x) = x² - 2x. Mivel h(-x) ≠ h(x) és h(-x) ≠ -h(x), a függvény sem nem páros, sem nem páratlan.'
      },
      {
        id: 'cq3-4',
        questionTypeBadge: 'Korlátozott Értelmezési Tartomány',
        question: 'Legyen f: [-2; 3] ➔ ℝ, f(x) = x². Mi a függvény értékkészlete (R_f)?',
        options: [
          'R_f = [0; 9]',
          'R_f = [4; 9]',
          'R_f = [-4; 9]',
          'R_f = [0; 4]'
        ],
        correctAnswer: 0,
        hint: 'Vigyázat! A tartomány tartalmazza a 0-t, ahol a parabola eléri a minimális 0 értéket!',
        explanation: 'Gyakori hiba: f(-2) = 4, f(3) = 9 ➔ [4; 9]. DE a [-2; 3] intervallumban benne van az x = 0 is, ahol f(0) = 0! A felvett értékek 0-tól 9-ig terjednek: R_f = [0; 9].'
      },
      {
        id: 'cq3-5',
        questionTypeBadge: 'Korlátozott Tartományú Lineáris',
        question: 'Legyen g: ]-1; 4] ➔ ℝ, g(x) = -2x + 3. Mi a függvény értékkészlete (R_g)?',
        options: [
          'R_g = [-5; 5[',
          'R_g = ]-5; 5]',
          'R_g = [-5; 5]',
          'R_g = ]-1; 4]'
        ],
        correctAnswer: 0,
        hint: 'Mivel a függvény csökkenő: x = 4-nél minimális (zárt végpont), x = -1-nél maximális (nyílt végpont).',
        explanation: 'g(4) = -2·4 + 3 = -5 (zárt: [-5). g(-1) = -2·(-1) + 3 = 5 (nyílt: 5[). Így R_g = [-5; 5[.'
      },
      {
        id: 'cq3-6',
        questionTypeBadge: 'Korlátosság Igazolása Törtnél',
        question: 'Korlátos-e az f(x) = 1 / (x² + 1) függvény a teljes valós számhalmazon (ℝ)?',
        options: [
          'Igen, korlátos: alulról k = 0, felülről K = 1 korlátozza (0 < f(x) ≤ 1)',
          'Nem korlátos, mert törtfüggvény',
          'Csak alulról korlátos',
          'Csak felülről korlátos'
        ],
        correctAnswer: 0,
        hint: 'x² ≥ 0 ➔ x² + 1 ≥ 1 ➔ a tört legfeljebb 1/1 = 1, és mivel a számláló pozitív, mindig nagyobb 0-nál.',
        explanation: 'Mivel x² ≥ 0, a nevező legalább 1, így f(x) legfeljebb 1 (x = 0-nál). Továbbá x² + 1 mindig pozitív, így f(x) > 0. A függvény mindkét oldalról korlátos: R_f = ]0; 1].'
      },
      {
        id: 'cq3-7',
        questionTypeBadge: 'Nulla Függvény Paritása',
        question: 'Milyen paritású az f(x) = 0 függvény a valós számok halmazán?',
        options: [
          'Egyszerre páros ÉS páratlan függvény is',
          'Csak páros',
          'Csak páratlan',
          'Egyik sem'
        ],
        correctAnswer: 0,
        hint: 'Ellenőrizd: f(-x) = 0 = f(x) (páros) és f(-x) = 0 = -0 = -f(x) (páratlan).',
        explanation: 'Mivel f(-x) = 0 = f(x) és f(-x) = 0 = -f(x), az azonosan 0 függvény az egyetlen olyan függvény, amely egyszerre páros és páratlan is!'
      },
      {
        id: 'cq3-8',
        questionTypeBadge: 'Összetett Zérushely Meghatározás',
        question: 'Mik az f(x) = (x - 2)(x + 5) függvény zérushelyei, és mi a menete a csúcsponttól jobbra?',
        options: [
          'Zérushelyek: x₁ = -5 és x₂ = 2; az x = -1.5 csúcstól jobbra szigorúan növekvő',
          'Zérushelyek: x₁ = 2 és x₂ = 5; mindenütt csökkenő',
          'Zérushelyek: x₁ = -2 és x₂ = 5; növekvő',
          'Nincs zérushelye'
        ],
        correctAnswer: 0,
        hint: 'Szorzat akkor 0, ha valamelyik tényező 0: x - 2 = 0 vagy x + 5 = 0. A csúcs a két zérushely számtani közepe.',
        explanation: '(x - 2)(x + 5) = 0 ➔ x₁ = -5, x₂ = 2. A szimmetriatengely x = (-5 + 2)/2 = -1.5. A felfelé nyíló parabola a csúcstól jobbra ([-1.5; +∞[) szigorúan növekvő.'
      },
      {
        id: 'cq3-9',
        questionTypeBadge: 'Törtkifejezés Értelmezési Tartománya',
        question: 'Mi a g(x) = 5 / (x² - 9) függvény értelmezési tartománya (D_g)?',
        options: [
          'D_g = ℝ \\ {-3; 3}',
          'D_g = ℝ \\ {9}',
          'D_g = ]-3; 3[',
          'D_g = ℝ'
        ],
        correctAnswer: 0,
        hint: 'A nevező nem lehet 0: x² - 9 ≠ 0 ➔ x² ≠ 9.',
        explanation: 'x² - 9 = 0 megoldásai x = 3 és x = -3. Ezt a két értéket ki kell zárni a valós számokból: D_g = ℝ \\ {-3; 3}.'
      },
      {
        id: 'cq3-10',
        questionTypeBadge: 'Abszolútérték és Paritás',
        question: 'Páros-e a k(x) = |x|³ - 2|x| függvény?',
        options: [
          'Igen, páros függvény, mert k(-x) = |-x|³ - 2|-x| = |x|³ - 2|x| = k(x)',
          'Páratlan függvény, mert van benne köbös tag',
          'Sem páros, sem páratlan',
          'Csak pozitív számokra páros'
        ],
        correctAnswer: 0,
        hint: '|-x| = |x| miatt minden előjelcsere azonnal eltűnik az abszolútértékben.',
        explanation: 'Mivel |-x| = |x|, a k(-x) = |-x|³ - 2|-x| = |x|³ - 2|x| = k(x). A függvény valóban páros.'
      }
    ]
  }
};

const characterizationCheatSheets: CheatSheetCard[] = [
  {
    title: 'A 6 Szempontú Jellemzés',
    category: 'Módszertan',
    icon: <BookOpen className="w-5 h-5 text-teal-600" />,
    color: 'border-teal-200 bg-teal-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>1. <strong>D_f:</strong> x tengely vetülete (bemenet).</p>
        <p>2. <strong>R_f:</strong> y tengely vetülete (kimenet).</p>
        <p>3. <strong>Zérushely:</strong> ahol f(x) = 0 (x tengely metszése).</p>
        <p>4. <strong>Menet:</strong> szig. nő vagy csökken intervallumokon.</p>
        <p>5. <strong>Paritás:</strong> Páros (y-tükrös), Páratlan (origó), vagy Sem-sem.</p>
        <p>6. <strong>Korlátosság:</strong> alulról (f(x) ≥ k), felülről (f(x) ≤ K).</p>
      </div>
    )
  },
  {
    title: 'Paritási Szabályok',
    category: 'Szimmetria',
    icon: <Scale className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Páros: f(-x) = f(x)</strong></p>
        <p className="text-teal-800 font-medium">Tükrös az y tengelyre (pl. x², |x|, konstans).</p>
        <p><strong>Páratlan: f(-x) = -f(x)</strong></p>
        <p className="text-purple-800 font-medium">180°-os szimmetria az origóra (pl. x, x³, 1/x).</p>
        <p className="text-slate-500 italic">Figyelem: A legtöbb függvény SEM páros, SEM páratlan!</p>
      </div>
    )
  },
  {
    title: 'Korlátosság Definíciója',
    category: 'Analízis',
    icon: <Sparkles className="w-5 h-5 text-blue-600" />,
    color: 'border-blue-200 bg-blue-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>• <strong>Alulról korlátos:</strong> f(x) ≥ k (pl. x² alsó korlátja k = 0).</p>
        <p>• <strong>Felülről korlátos:</strong> f(x) ≤ K (pl. -x² + 5 felső korlátja K = 5).</p>
        <p>• <strong>Korlátos:</strong> egyszerre alulról és felülről is korlátos (k ≤ f(x) ≤ K).</p>
      </div>
    )
  },
  {
    title: 'Monotonitási Csapda',
    category: 'Gyakori Hiba',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>Parabola vagy V-alak esetén TILOS egyetlen intervallumot írni!</p>
        <p className="font-semibold text-slate-900">Mindig fel kell bontani:</p>
        <p>• Csökkenő: <code>]-∞; csúcspont_x]</code></p>
        <p>• Növekvő: <code>[csúcspont_x; +∞[</code></p>
      </div>
    )
  }
];

export const CharacterizationQuiz: React.FC<CharacterizationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="11. Függvények jellemzése"
      subtitle="Gyakorold az értelmezési tartomány, értékkészlet, zérushelyek, monotonitás, paritás és korlátosság meghatározását!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={characterizationCheatSheets}
      topicId="fuggvenyek-jellemzese"
      topicTitle="Függvények jellemzése"
      activityType="g9-func-jellemzes-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={CharacterizationMatcher}
      sorterComponent={CharacterizationSorter}
    />
  );
};

