import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GraphsMatcher } from './GraphsMatcher';
import { GraphsSorter } from './GraphsSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface GraphsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    name: '1. Szint: Gráfok Alapfogalmai (Könnyű)',
    description: 'Csúcsok, élek, egyszerű gráf definíciója, csúcsok fokszáma és a kézfogási lemma alapjai.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'gq1-1',
        question: 'Milyen alapelemekből épül fel egy matematikai gráf?',
        options: ['Csúcsokból (pontokból) és élekből (vonalakból)', 'Csak síkidomokból és testekből', 'Csak koordinátákból és vektorokból', 'Halmazokból és függvényekből'],
        correctAnswer: 0,
        hint: 'Gondolj a pontok és az őket összekötő szakaszok modelljére.',
        explanation: 'A gráf olyan matematikai struktúra, amely csúcsokból (V) és az őket összekötő élekből (E) áll: G = (V, E).'
      },
      {
        id: 'gq1-2',
        question: 'Mikor nevezünk egy gráfot egyszerű gráfnak a középiskolai matematikában?',
        options: ['Ha nincs benne hurokél és nincsenek többszörös (párhuzamos) élek', 'Ha legfeljebb 5 csúcsa van', 'Ha minden csúcsának azonos a fokszáma', 'Ha nincs benne kör'],
        correctAnswer: 0,
        hint: 'Egy él nem köthet össze egy csúcsot önmagával, és két csúcs közt legfeljebb 1 él futhat.',
        explanation: 'Az egyszerű gráfban tilos a hurokél (csúcs önmagába menő éle) és tilosak a többszörös (párhuzamos) élek két azonos csúcs között.'
      },
      {
        id: 'gq1-3',
        question: 'Mit nevezünk egy gráfcsúcs fokszámának (d(v))?',
        options: ['A csúcsból kiinduló élek számát', 'A csúcs távolságát az origótól', 'A csúcs szögét fokban mérve', 'A szomszédos csúcsok szorzatát'],
        correctAnswer: 0,
        hint: 'Számold meg, hány él csatlakozik az adott ponthoz.',
        explanation: 'Egy csúcs fokszáma (jelölése d(v)) a csúcsra illeszkedő, belőle kiinduló élek száma.'
      },
      {
        id: 'gq1-4',
        questionTypeBadge: 'Csúcstípusok',
        question: 'Mennyi a fokszáma egy izolált csúcsnak?',
        options: ['0', '1', '2', 'Végtelen'],
        correctAnswer: 0,
        hint: 'Az izolált csúcs teljesen magányos, senkivel sincs összekötve.',
        explanation: 'Az izolált csúcsból egyetlen él sem indul ki, így fokszáma pontosan d = 0.',
        figure: (
          <svg viewBox="0 0 200 80" className="w-52 h-20">
            <circle cx="45" cy="40" r="7" fill="#ef4444" />
            <text x="45" y="24" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">d = 0</text>
            <text x="45" y="62" fill="#7f1d1d" fontSize="9" fontWeight="bold" textAnchor="middle">(Izolált)</text>
            <line x1="85" y1="15" x2="85" y2="65" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="125" y1="40" x2="170" y2="25" stroke="#059669" strokeWidth="2" />
            <line x1="125" y1="40" x2="170" y2="55" stroke="#059669" strokeWidth="2" />
            <circle cx="125" cy="40" r="6" fill="#047857" />
            <circle cx="170" cy="25" r="5" fill="#10b981" />
            <circle cx="170" cy="55" r="5" fill="#10b981" />
            <text x="150" y="74" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">Összefüggő rész</text>
          </svg>
        )
      },
      {
        id: 'gq1-5',
        questionTypeBadge: 'Csúcstípusok',
        question: 'Hogyan nevezzük az 1 fokszámú csúcsot?',
        options: ['Levélcsúcs (vagy függőcsúcs)', 'Izolált csúcs', 'Centrumcsúcs', 'Hurokcsúcs'],
        correctAnswer: 0,
        hint: 'Gondolj a fák ágainak legvégén lévő levelekre.',
        explanation: 'Az 1 fokszámú csúcsot levélcsúcsnak (vagy függőcsúcsnak) nevezzük, mert csak egyetlen él köti a gráf többi részéhez.'
      },
      {
        id: 'gq1-6',
        questionTypeBadge: 'Kézfogási Lemma',
        question: 'A kézfogási lemma (Euler-tétel) szerint mivel egyenlő a csúcsok fokszámainak összege?',
        options: ['Az élek számának kétszeresével (2 · e)', 'Az élek számával (e)', 'A csúcsok számának négyzetével (n²)', 'Mindig 0-val'],
        correctAnswer: 0,
        hint: 'Minden egyes élnek 2 végpontja van, mindkettőnél +1-gyel növeli a fokszámot.',
        explanation: 'Mivel minden él pontosan 2 csúcshoz kapcsolódik, a fokszámok összege mindig az élek számának kétszerese: ∑ d(v) = 2 · e.'
      },
      {
        id: 'gq1-7',
        questionTypeBadge: 'Élszám Számítás',
        question: 'Egy gráf csúcsainak fokszámai: 2, 2, 2, 2. Hány éle van a gráfnak?',
        options: ['4 él', '8 él', '2 él', '16 él'],
        correctAnswer: 0,
        hint: 'Add össze a fokszámokat, majd oszd el 2-vel!',
        explanation: 'A fokszámok összege 2 + 2 + 2 + 2 = 8. Mivel ∑ d(v) = 2 · e, ezért e = 8 / 2 = 4 él.'
      },
      {
        id: 'gq1-8',
        questionTypeBadge: 'Teljes Gráf (K_n)',
        question: 'Hány éle van egy 3 csúcsú teljes gráfnak (K₃)?',
        options: ['3 él (egy háromszög)', '2 él', '6 él', '1 él'],
        correctAnswer: 0,
        hint: 'Minden csúcs össze van kötve minden másik csúccsal.',
        explanation: 'A 3 csúcsú teljes gráf (K₃) egy szabályos háromszög, ahol minden csúcspár össze van kötve, így éleinek száma e = 3 · 2 / 2 = 3.',
        figure: (
          <svg viewBox="0 0 160 85" className="w-44 h-20">
            <polygon points="80,18 35,68 125,68" fill="none" stroke="#059669" strokeWidth="2.5" />
            <circle cx="80" cy="18" r="6" fill="#047857" />
            <text x="80" y="12" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
            <circle cx="35" cy="68" r="6" fill="#047857" />
            <text x="22" y="72" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">B</text>
            <circle cx="125" cy="68" r="6" fill="#047857" />
            <text x="138" y="72" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">C</text>
            <text x="80" y="54" fill="#047857" fontSize="11" fontWeight="black" textAnchor="middle">K₃ (3 él)</text>
          </svg>
        )
      },
      {
        id: 'gq1-9',
        questionTypeBadge: 'Körgráf (C_n)',
        question: 'Hány éle van egy 4 csúcsú körgráfnak (C₄)?',
        options: ['4 él', '3 él', '6 él', '8 él'],
        correctAnswer: 0,
        hint: 'A körgráfban a csúcsok egyetlen zárt hurkot alkotnak, mint egy négyszög.',
        explanation: 'Egy n csúcsú körgráfnak (C_n) pontosan n éle van, így a C₄ gráf élszáma 4 (minden csúcs foka 2).',
        figure: (
          <svg viewBox="0 0 160 85" className="w-44 h-20">
            <rect x="45" y="18" width="70" height="50" fill="none" stroke="#0284c7" strokeWidth="2" rx="2" />
            <circle cx="45" cy="18" r="6" fill="#0369a1" />
            <circle cx="115" cy="18" r="6" fill="#0369a1" />
            <circle cx="115" cy="68" r="6" fill="#0369a1" />
            <circle cx="45" cy="68" r="6" fill="#0369a1" />
            <text x="80" y="47" fill="#0369a1" fontSize="11" fontWeight="black" textAnchor="middle">C₄ (4 él)</text>
          </svg>
        )
      },
      {
        id: 'gq1-10',
        question: 'Hány éle van egy 3 csúcsból álló nyílt útnak (P₃ útgráfnak)?',
        options: ['2 él', '3 él', '1 él', '4 él'],
        correctAnswer: 0,
        hint: '3 egymás után kötött pont között hány összekötő szakasz van?',
        explanation: 'Egy 3 csúcsú út (A - B - C) 2 élből áll. Általában egy n csúcsú útgráf éleinek száma n - 1.'
      }
    ]
  },
  2: {
    name: '2. Szint: Fokszámok, Paritás és Nevezetes Gráfok (Közepes)',
    description: 'Páratlan csúcsok paritása, teljes gráfok élszáma, fák élszáma és kézfogási feladatok.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'gq2-1',
        question: 'Mi a kézfogási lemma legfontosabb közvetlen következménye a csúcsok fokszámára nézve?',
        options: [
          'A páratlan fokszámú csúcsok száma mindig PÁROS',
          'A páratlan fokszámú csúcsok száma mindig páratlan',
          'Minden csúcs fokszáma páros kell hogy legyen',
          'Nem létezhet páratlan fokszámú csúcs'
        ],
        correctAnswer: 0,
        hint: 'Páros összeg csak úgy jöhet ki, ha a páratlan tagokból páros darab van.',
        explanation: 'Mivel a fokszámok összege 2 · e (páros szám), ezért páratlan számú páratlan fokszámú csúcs nem létezhet egyetlen gráfban sem!'
      },
      {
        id: 'gq2-2',
        question: 'Létezhet-e olyan egyszerű gráf, amelynek csúcsfokszámai: 3, 3, 2, 2, 2?',
        options: ['Igen, létezhet (összeg: 12, páros)', 'Nem, mert van benne 3-as fokszám', 'Nem, mert 5 csúcs van', 'Nem, mert nem minden fokszám azonos'],
        correctAnswer: 0,
        hint: 'Add össze a fokszámokat: 3 + 3 + 2 + 2 + 2 = 12.',
        explanation: 'A fokszámok összege 12 (páros), a páratlan fokú csúcsok száma 2 db (páros). A maximális fokszám 3 <= 5 - 1. Ez a gráf megrajzolható (e = 6 él).'
      },
      {
        id: 'gq2-3',
        question: 'Létezhet-e egy 5 fős társaság, ahol mindenkinek pontosan 3 ismerőse van?',
        options: [
          'Nem létezhet, mert a fokszámok összege 5 · 3 = 15 (páratlan)',
          'Igen, ez egy 5 csúcsú teljes gráf',
          'Igen, bármely 5 embernél lehetséges',
          'Nem, mert 3 nagyobb, mint 2'
        ],
        correctAnswer: 0,
        hint: 'Számold ki az összes kézfogás / ismeretség összegét: 5 ember x 3.',
        explanation: 'Ha mind az 5 ember foka 3 lenne, a fokszámok összege 5 · 3 = 15 lenne, ami páratlan. A kézfogási lemma miatt ilyen gráf NEM létezik!'
      },
      {
        id: 'gq2-4',
        questionTypeBadge: 'Teljes Gráf (K₅)',
        question: 'Hány él van egy 5 csúcsú teljes gráfban (K₅)?',
        options: ['10 él', '20 él', '5 él', '15 él'],
        correctAnswer: 0,
        hint: 'Alkalmazd a teljes gráf képletét: n · (n - 1) / 2.',
        explanation: 'A teljes gráf élszáma: e = n(n - 1) / 2 = 5 · 4 / 2 = 10 él.',
        figure: (
          <svg viewBox="0 0 160 95" className="w-48 h-22">
            <line x1="80" y1="12" x2="32" y2="47" stroke="#34d399" strokeWidth="1.5" />
            <line x1="80" y1="12" x2="50" y2="85" stroke="#34d399" strokeWidth="1.5" />
            <line x1="80" y1="12" x2="110" y2="85" stroke="#34d399" strokeWidth="1.5" />
            <line x1="80" y1="12" x2="128" y2="47" stroke="#34d399" strokeWidth="1.5" />
            <line x1="32" y1="47" x2="110" y2="85" stroke="#34d399" strokeWidth="1.5" />
            <line x1="128" y1="47" x2="50" y2="85" stroke="#34d399" strokeWidth="1.5" />
            <line x1="32" y1="47" x2="50" y2="85" stroke="#059669" strokeWidth="2" />
            <line x1="50" y1="85" x2="110" y2="85" stroke="#059669" strokeWidth="2" />
            <line x1="110" y1="85" x2="128" y2="47" stroke="#059669" strokeWidth="2" />
            <line x1="128" y1="47" x2="80" y2="12" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="12" x2="32" y2="47" stroke="#059669" strokeWidth="2" />
            <circle cx="80" cy="12" r="5" fill="#047857" />
            <circle cx="32" cy="47" r="5" fill="#047857" />
            <circle cx="128" cy="47" r="5" fill="#047857" />
            <circle cx="50" cy="85" r="5" fill="#047857" />
            <circle cx="110" cy="85" r="5" fill="#047857" />
          </svg>
        )
      },
      {
        id: 'gq2-5',
        questionTypeBadge: 'Fák Tulajdonságai',
        question: 'Egy összefüggő, körmentes fa alakú számítógép-hálózatban 10 gép van. Hány kábel köti össze őket?',
        options: ['9 kábel', '10 kábel', '45 kábel', '8 kábel'],
        correctAnswer: 0,
        hint: 'Minden n csúcsú fának n - 1 éle van.',
        explanation: 'A fa tétel értelmében bármely n csúcsú fának pontosan n - 1 éle van. Így 10 géphez pontosan 10 - 1 = 9 kábel (él) szükséges.',
        figure: (
          <svg viewBox="0 0 180 85" className="w-48 h-20">
            <line x1="90" y1="15" x2="50" y2="45" stroke="#10b981" strokeWidth="2" />
            <line x1="90" y1="15" x2="130" y2="45" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="45" x2="30" y2="72" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="45" x2="70" y2="72" stroke="#10b981" strokeWidth="2" />
            <circle cx="90" cy="15" r="5" fill="#047857" />
            <circle cx="50" cy="45" r="5" fill="#047857" />
            <circle cx="130" cy="45" r="5" fill="#047857" />
            <circle cx="30" cy="72" r="4" fill="#059669" />
            <circle cx="70" cy="72" r="4" fill="#059669" />
            <text x="135" y="72" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">e = n − 1</text>
          </svg>
        )
      },
      {
        id: 'gq2-6',
        question: 'Egy 8 fős baráti társaságban mindenki mindenkivel kezet fog. Hány kézfogás történik összesen?',
        options: ['28 kézfogás', '56 kézfogás', '16 kézfogás', '64 kézfogás'],
        correctAnswer: 0,
        hint: 'Ez a K₈ teljes gráf élszáma: (8 · 7) / 2.',
        explanation: 'Minden ember 7 másikkal fog kezet, de minden kézfogást két fél végez: (8 · 7) / 2 = 28 kézfogás történik.'
      },
      {
        id: 'gq2-7',
        question: 'Egy 7 csúcsú egyszerű gráfban legfeljebb mekkora lehet egyetlen csúcs fokszáma?',
        options: ['6', '7', '5', '14'],
        correctAnswer: 0,
        hint: 'Egy csúcs legfeljebb az összes többi csúccsal lehet összekötve (önmagával nem).',
        explanation: 'Egyszerű gráfban nincs hurokél, így egy csúcs legfeljebb a maradék n - 1 csúcshoz csatlakozhat. 7 csúcsnál a maximális fokszám 7 - 1 = 6.'
      },
      {
        id: 'gq2-8',
        question: 'Egy gráfban 9 él található. Mennyi a gráf csúcsainak fokszámösszege?',
        options: ['18', '9', '27', '81'],
        correctAnswer: 0,
        hint: 'A kézfogási lemma szerint: fokszámösszeg = 2 · e.',
        explanation: 'Minden él 2-vel járul hozzá a fokszámok összegéhez, így az összeg: 2 · 9 = 18.'
      },
      {
        id: 'gq2-9',
        question: 'Egy összefüggő gráfnak 6 csúcsa és 5 éle van. Milyen nevezetes gráf ez?',
        options: ['Fa', 'Teljes gráf', 'Körgráf', 'Kétparti gráf'],
        correctAnswer: 0,
        hint: 'Összefüggő és n csúcshoz pontosan n - 1 él tartozik.',
        explanation: 'Ha egy összefüggő gráfnak n csúcsa és n - 1 éle van, akkor az szükségképpen körmentes, vagyis fa.'
      },
      {
        id: 'gq2-10',
        question: 'Hány éle van a K₂,₃ teljes kétparti (páros) gráfnak?',
        options: ['6 él', '5 él', '12 él', '8 él'],
        correctAnswer: 0,
        hint: 'Az egyik halmaz 2, a másik 3 elemű. Mindenki mindenkivel össze van kötve a két halmaz között.',
        explanation: 'A teljes kétparti gráf élszáma: e = n · m = 2 · 3 = 6 él.'
      }
    ]
  },
  3: {
    name: '3. Szint: Összetett Gráfelemzés és Versenyszint (Nehéz)',
    description: 'Reguláris gráfok, erdők élszáma, bajnokságok modellezése és haladó gráftételek.',
    passingScore: 7,
    timeLimit: 600,
    questions: [
      {
        id: 'gq3-1',
        question: 'Egy 8 csúcsú 3-reguláris gráfban (ahol minden csúcs fokszáma 3) hány él található?',
        options: ['12 él', '24 él', '8 él', '16 él'],
        correctAnswer: 0,
        hint: 'Fokszámok összege = 8 · 3 = 24. Ezt oszd el 2-vel!',
        explanation: 'A fokszámok összege ∑ d(v) = 8 · 3 = 24. A kézfogási lemma alapján e = 24 / 2 = 12 él.'
      },
      {
        id: 'gq3-2',
        question: 'Egy sakkbajnokságon 12 versenyző indul, és mindenki játszik mindenkivel pontosan egyszer. Hány partit játszanak le összesen?',
        options: ['66 partit', '132 partit', '72 partit', '24 partit'],
        correctAnswer: 0,
        hint: 'Ez a K₁₂ teljes gráf élszáma: 12 · 11 / 2.',
        explanation: 'A mérkőzések száma megegyezik a K₁₂ éleinek számával: e = (12 · 11) / 2 = 66 mérkőzés.'
      },
      {
        id: 'gq3-3',
        questionTypeBadge: 'Csillaggráf (S_n)',
        question: 'Egy 7 csúcsú csillaggráfban (S₇) mik a csúcsok fokszámai?',
        options: ['1 db 6-os és 6 db 1-es', 'Mind a 7 csúcs foka 2', '1 db 7-es és 6 db 0-s', 'Mind a 7 csúcs foka 1'],
        correctAnswer: 0,
        hint: 'A csillaggráfban egy központi csúcs kapcsolódik az összes többi levélcsúcshoz.',
        explanation: 'A csillaggráf központjából n - 1 = 6 él indul ki (foka 6), míg a maradék 6 levél mindegyike csak a központhoz kapcsolódik (fokuk 1).',
        figure: (
          <svg viewBox="0 0 160 85" className="w-44 h-20">
            <line x1="80" y1="42" x2="80" y2="12" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="42" x2="115" y2="25" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="42" x2="115" y2="60" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="42" x2="80" y2="72" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="42" x2="45" y2="60" stroke="#059669" strokeWidth="2" />
            <line x1="80" y1="42" x2="45" y2="25" stroke="#059669" strokeWidth="2" />
            <circle cx="80" cy="42" r="7" fill="#dc2626" />
            <text x="80" y="45" fill="#ffffff" fontSize="8" fontWeight="black" textAnchor="middle">6</text>
            <circle cx="80" cy="12" r="4" fill="#059669" />
            <circle cx="115" cy="25" r="4" fill="#059669" />
            <circle cx="115" cy="60" r="4" fill="#059669" />
            <circle cx="80" cy="72" r="4" fill="#059669" />
            <circle cx="45" cy="60" r="4" fill="#059669" />
            <circle cx="45" cy="25" r="4" fill="#059669" />
          </svg>
        )
      },
      {
        id: 'gq3-4',
        question: 'Létezhet-e 4 csúcsú egyszerű gráf 4, 3, 2, 1 csúcsfokszámokkal?',
        options: [
          'Nem, mert egyszerű 4 csúcsú gráfban a maximális fokszám legfeljebb 3 lehet',
          'Igen, mert az összeg 10 (páros)',
          'Igen, mert van benne 1-es és 4-es fokszám is',
          'Nem, mert a fokszámok összege páratlan'
        ],
        correctAnswer: 0,
        hint: 'Egyszerű gráfban d(v) <= n - 1.',
        explanation: 'Egy 4 csúcsú egyszerű gráfban a maximális fokszám n - 1 = 3 lehet. A 4-es fokszám azt jelentené, hogy a csúcs önmagával vagy valakivel többszörösen van összekötve, ami egyszerű gráfban tilos!'
      },
      {
        id: 'gq3-5',
        question: 'Egy 10 csúcsú erdő (körmentes gráf) pontosan 3 összefüggő komponensből (fából) áll. Hány éle van az erdőnek?',
        options: ['7 él', '9 él', '6 él', '8 él'],
        correctAnswer: 0,
        hint: 'Minden komponens fa: ha k fa van, az élek száma n - k.',
        explanation: 'Ha k darab komponens van, mindegyik komponens fája n_i - 1 élt tartalmaz. Így az élek összege: ∑ (n_i - 1) = n - k = 10 - 3 = 7 él.'
      },
      {
        id: 'gq3-6',
        question: 'Melyik állítás igaz az Euler-vonal (egyetlen vonallal bejárható gráf) létezésére egy összefüggő gráfban?',
        options: [
          'A gráf pontosan 0 vagy 2 páratlan fokszámú csúccsal rendelkezik',
          'Minden csúcs fokszámának páratlannak kell lennie',
          'A gráfnak pontosan 1 páratlan fokú csúcsa van',
          'A csúcsok számának párosnak kell lennie'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a königsbergi hidak problémájára és Euler híres tételére!',
        explanation: 'Euler tétele szerint egy összefüggő gráf akkor és csak akkor járható be egyetlen zárt vagy nyílt vonallal élek ismétlése nélkül, ha legfeljebb 2 páratlan fokszámú csúcsa van (0 esetén zárt Euler-vonal, 2 esetén nyílt).'
      },
      {
        id: 'gq3-7',
        question: 'Legalább hány élre van szükség ahhoz, hogy egy 8 csúcsú gráf összefüggő legyen?',
        options: ['7 él', '8 él', '14 él', '28 él'],
        correctAnswer: 0,
        hint: 'A legkevesebb élt tartalmazó összefüggő gráf a fa.',
        explanation: 'Bármely n csúcsú összefüggő gráf legalább n - 1 élt kell hogy tartalmazzon (amikor a gráf fa). 8 csúcs esetén a minimális élszám 8 - 1 = 7 él.'
      },
      {
        id: 'gq3-8',
        question: 'Legfeljebb hány éle lehet egy 9 csúcsú körmentes egyszerű gráfnak?',
        options: ['8 él', '9 él', '36 él', '7 él'],
        correctAnswer: 0,
        hint: 'A körmentes gráf akkor tartalmazza a legtöbb élt, ha összefüggő (fa).',
        explanation: 'Egy körmentes gráf maximális élszámát akkor éri el, ha összefüggő (vagyis egyetlen fa). Ekkor éleinek száma pontosan n - 1 = 9 - 1 = 8 él.'
      },
      {
        id: 'gq3-9',
        question: 'Egy vetélkedőn 4 fiú és 5 lány vesz részt. Minden fiú minden lánnyal játszik egy mérkőzést (egymás között nem játszanak). Hány mérkőzést játszanak összesen?',
        options: ['20 mérkőzést', '9 mérkőzést', '36 mérkőzést', '18 mérkőzést'],
        correctAnswer: 0,
        hint: 'Ez a K₄,₅ teljes kétparti gráf élszáma.',
        explanation: 'A K₄,₅ teljes kétparti gráf éleinek száma e = 4 · 5 = 20 mérkőzés.'
      },
      {
        id: 'gq3-10',
        question: 'Egy 5 csúcsú gráf fokszámai: 4, 4, 4, 4, 4. Hány éle van a gráfnak, és milyen nevezetes gráf ez?',
        options: [
          '10 él, és ez a K₅ teljes gráf',
          '20 él, és ez a C₅ körgráf',
          '5 él, és ez egy fa',
          '8 él, és ez egy csillaggráf'
        ],
        correctAnswer: 0,
        hint: '5 csúcs esetén ha mindenkinek 4 a foka, mindenki mindenkivel össze van kötve.',
        explanation: 'A fokszámok összege 5 · 4 = 20, így e = 20 / 2 = 10 él. Mivel 5 csúcsú és minden csúcs foka maximális (n - 1 = 4), ez a K₅ teljes gráf.'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Kézfogási Lemma (Euler-tétel)',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p><strong>Képlet:</strong> ∑ d(v) = 2 · e</p>
        <p>A csúcsok fokszámainak összege megegyezik az élek számának kétszeresével.</p>
        <p><strong>Következmény:</strong> A fokszámok összege mindig páros, és a páratlan fokszámú csúcsok száma mindig páros!</p>
      </div>
    )
  },
  {
    title: 'Nevezetes Gráfok Élszámai',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>• <strong>Teljes gráf (Kₙ):</strong> e = n(n - 1) / 2</p>
        <p>• <strong>Körgráf (Cₙ):</strong> e = n (minden d = 2)</p>
        <p>• <strong>Fa (Tₙ) / Út (Pₙ) / Csillag (Sₙ):</strong> e = n - 1</p>
        <p>• <strong>Kétparti gráf (Kₙ,ₘ):</strong> e = n · m</p>
      </div>
    )
  },
  {
    title: 'Egyszerű Gráfok Szabályai',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p>1. <strong>Nincs hurokél:</strong> egy él nem köthet össze egy pontot önmagával.</p>
        <p>2. <strong>Nincs párhuzamos él:</strong> két pont közt legfeljebb 1 él futhat.</p>
        <p>3. <strong>Maximális fokszám:</strong> d(v) ≤ n - 1.</p>
      </div>
    )
  }
];

export const GraphsQuiz: React.FC<GraphsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Gráfok Kvíz"
      subtitle="Csúcsok, élek, fokszámok, kézfogási lemma és nevezetes gráfok 30 válogatott feladatban"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 KVÍZ"
      themeColor="emerald"
      levelConfigs={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Gráfelméleti Segédlet & Képlettár"
      grade={9}
      chapterId="kombinatorika-halmazok"
      topicId="g9-komb-grafok-quiz"
      topicTitle="Gráfok"
      emoji="🕸️"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze a gráfokat, fogalmakat és tulajdonságokat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Nevezetes Gráfok',
              subtitle: 'Párosítsd a gráfelemeket és alapformákat!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Képletek és Élszámítás',
              subtitle: 'Fokszámok, kézfogási lemma és élszámok',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Élszámítás'
            },
            3: {
              title: '3. Szint: Összetett Gráftulajdonságok',
              subtitle: 'Reguláris gráfok, fák és bajnokságok',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Haladó'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <GraphsMatcher
              key={`graphs-matcher-${level}`}
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
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a gráfokat és fokszám-sorozatokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Gráfelemek és Típusok',
              subtitle: 'Csúcsok, élek és alapvető gráfcsaládok',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Alapok'
            },
            2: {
              title: '2. Szint: Fokszám-sorozatok Megvalósíthatósága',
              subtitle: 'Létező vs. Euler-tételt sértő vs. Csúcskorlátot sértő',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Megvalósíthatóság'
            },
            3: {
              title: '3. Szint: Nevezetes Gráfok Tulajdonságai',
              subtitle: 'Fák (e = n-1) vs. Körök (d = 2) vs. Teljes gráfok (sűrű)',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Családok'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <GraphsSorter
              key={`graphs-sorter-${level}`}
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
      onBack={onBack || (() => {})}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default GraphsQuiz;
