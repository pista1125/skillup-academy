import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { SolidsInSpaceAndPlaneMatcher } from './SolidsInSpaceAndPlaneMatcher';
import { SolidsInSpaceAndPlaneSorter } from './SolidsInSpaceAndPlaneSorter';

interface SolidsInSpaceAndPlaneQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const quizLevels: QuizLevelConfig[] = [
  // 1. SZINT: Testhálók és Alaptulajdonságok
  {
    level: 1,
    title: '1. szint: Testhálók és határoló lapok',
    subtitle: 'Kocka, téglatest, gúla és hasáb kiterített síkbeli hálói',
    description: '10 alapozó feladat a testhálók tulajdonságairól és a lapok elrendezéséről.',
    questions: [
      {
        id: 'q1-1',
        title: 'Kocka lapjai',
        question: 'Hány és milyen határoló lapja van a kockának?',
        options: [
          '6 darab egybevágó négyzetlapja',
          '8 darab téglalapja',
          '12 darab egyenlő szárú háromszöge',
          '4 darab négyzete és 2 téglalapja'
        ],
        correctAnswer: '6 darab egybevágó négyzetlapja',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            {/* Rear hidden edges */}
            <line x1="20" y1="65" x2="40" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <line x1="40" y1="50" x2="75" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <line x1="40" y1="50" x2="40" y2="15" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            {/* Top face */}
            <polygon points="20,30 40,15 75,15 55,30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            {/* Right face */}
            <polygon points="55,30 75,15 75,50 55,65" fill="#93c5fd" fillOpacity="0.7" stroke="#2563eb" strokeWidth="1.5" />
            {/* Front face */}
            <polygon points="20,30 55,30 55,65 20,65" fill="#bfdbfe" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="50" y="76" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">6 egybevágó négyzetlap</text>
          </svg>
        ),
        explanation: 'A kockát 6 egybevágó négyzet határolja.',
        hint: 'Minden lapja egyenlő élű négyzet!'
      },
      {
        id: 'q1-2',
        title: 'Kocka hálóinak száma',
        question: 'Hány különböző, síkba kiterített testhálója létezik a kockának?',
        options: ['11 darab', '6 darab', '8 darab', '16 darab'],
        correctAnswer: '11 darab',
        figure: (
          <svg viewBox="0 0 110 80" className="w-28 h-20">
            <rect x="42" y="6" width="16" height="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="26" y="22" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="42" y="22" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <rect x="58" y="22" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="74" y="22" width="16" height="16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <rect x="42" y="38" width="16" height="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="55" y="66" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">Összesen 11 különböző háló</text>
          </svg>
        ),
        explanation: 'A 6 egybevágó négyzetből pontosan 11 olyan különböző összefüggő alakzat rakható ki, amelyből kocka hajtogatható össze átfedés nélkül.',
        hint: 'A matematika bizonyította, hogy pontosan 11 ilyen háló van.'
      },
      {
        id: 'q1-3',
        title: 'Négyzetes gúla lapjai',
        question: 'Milyen lapokból áll a négyzet alapú gúla testhálója?',
        options: [
          '1 négyzet alaplapból és 4 háromszög oldallapból',
          '2 négyzetből és 4 téglalapból',
          '5 darab egyenlő oldalú háromszögből',
          '1 négyzetből és 3 téglalapból'
        ],
        correctAnswer: '1 négyzet alaplapból és 4 háromszög oldallapból',
        figure: (
          <svg viewBox="0 0 100 85" className="w-28 h-20">
            <rect x="38" y="28" width="24" height="24" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="38,28 62,28 50,8" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="38,52 62,52 50,72" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="38,28 38,52 18,40" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="62,28 62,52 82,40" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
            <text x="50" y="81" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">1 négyzet + 4 háromszög</text>
          </svg>
        ),
        explanation: 'A négyzetes gúla egy négyzet alapból és 4 azonos csúcsba futó háromszögből áll (összesen 5 lap).',
        hint: 'Gondolj a klasszikus egyiptomi piramisra!'
      },
      {
        id: 'q1-4',
        title: 'Háromoldalú hasáb lapjai',
        question: 'Hány és milyen lap határolja a háromoldalú egyenes hasábot?',
        options: [
          '2 háromszög alaplap és 3 téglalap oldallap (összesen 5 lap)',
          '3 háromszög és 2 téglalap (összesen 5 lap)',
          '4 háromszög (összesen 4 lap)',
          '2 téglalap és 3 négyzet'
        ],
        correctAnswer: '2 háromszög alaplap és 3 téglalap oldallap (összesen 5 lap)',
        figure: (
          <svg viewBox="0 0 110 85" className="w-32 h-20">
            <rect x="22" y="24" width="22" height="32" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <rect x="44" y="24" width="22" height="32" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.2" />
            <rect x="66" y="24" width="22" height="32" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <polygon points="44,24 66,24 55,7" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
            <polygon points="44,56 66,56 55,73" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
            <text x="55" y="82" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">2 háromszög + 3 téglalap</text>
          </svg>
        ),
        explanation: 'A háromoldalú hasábnak 2 párhuzamos háromszög alaplapja és 3 téglalap palástlapja van.',
        hint: 'A hasáb alsó és felső lapja mindig az alapsokszög (itt háromszög).'
      },
      {
        id: 'q1-5',
        title: 'Kockaháló szabály: 4 négyzet egy pontban',
        question: 'Lehet-e valódi kockaháló egy olyan alakzat, amelyben 4 négyzet találkozik egyetlen közös csúcspontban (2×2-es négyzettömb)?',
        options: [
          'Nem, mert összehajtogatva a lapok átfednék egymást',
          'Igen, ez a leggyakoribb kockaháló',
          'Igen, de csak akkor, ha a másik két lap szemben van',
          'Attól függ, mekkora a négyzetek oldala'
        ],
        correctAnswer: 'Nem, mert összehajtogatva a lapok átfednék egymást',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <rect x="30" y="14" width="20" height="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <rect x="50" y="14" width="20" height="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <rect x="30" y="34" width="20" height="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <rect x="50" y="34" width="20" height="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="50" cy="34" r="5" fill="#ef4444" />
            <line x1="47.5" y1="31.5" x2="52.5" y2="36.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="52.5" y1="31.5" x2="47.5" y2="36.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <text x="50" y="66" textAnchor="middle" className="text-[7.5px] font-bold fill-red-600">2×2 tömb: Átfedés! (NEM háló)</text>
          </svg>
        ),
        explanation: 'Ha 4 négyzet egyetlen pontban találkozik (2×2-es tömb), akkor az összehajtáskor a lapok átfedik egymást, és nem tudnak zárt 3D testet alkotni.',
        hint: 'Próbáld meg gondolatban felhajtani a 2x2-es tömböt!'
      },
      {
        id: 'q1-6',
        title: 'Szemközti lapok a hálóban',
        question: 'Lehetnek-e közvetlenül szomszédosak (közös éllel határosak) a kocka szemközti párhuzamos lapjai a testhálóban?',
        options: [
          'Nem, a szemközti lapok között mindig lennie kell legalább egy köztes lapnak',
          'Igen, mindig közvetlen szomszédosak',
          'Csak a T-alakú hálóban lehetnek szomszédosak',
          'Csak a kereszt hálóban'
        ],
        correctAnswer: 'Nem, a szemközti lapok között mindig lennie kell legalább egy köztes lapnak',
        explanation: 'A közvetlenül érintkező lapok a testen egymásra merőleges szomszédos falak lesznek. A szemközti lapok között legalább egy lapnyi távolság van a hálóban.',
        hint: 'A közös él mentén behajtott lapok egymásra merőlegesek lesznek!'
      },
      {
        id: 'q1-7',
        title: 'Tetraéder felépítése',
        question: 'Hány egybevágó lap határolja a szabályos tetraédert?',
        options: [
          '4 egybevágó szabályos háromszög',
          '6 egyenlő szárú háromszög',
          '4 négyzet',
          '8 háromszög'
        ],
        correctAnswer: '4 egybevágó szabályos háromszög',
        explanation: 'A tetraéder a legegyszerűbb platóni test: 4 szabályos háromszöglap határolja.',
        hint: 'A "tetra" görög előtag négyet jelent.'
      },
      {
        id: 'q1-8',
        title: 'Téglatest lapjai',
        question: 'Hány lapja van egy téglatestnek, és hány különböző méretű lap-pár alkotja?',
        options: [
          '6 lapja van, és legfeljebb 3-féle egybevágó lap-pár alkotja',
          '8 lapja van, 4-féle lap-párral',
          '6 lapja van, és mind a 6 különböző méretű',
          '12 lapja van'
        ],
        correctAnswer: '6 lapja van, és legfeljebb 3-féle egybevágó lap-pár alkotja',
        explanation: 'A téglatestnek 6 téglalap lapja van: alap-fedőlap (a·b), elöl-hátul (a·c), bal-jobb (b·c).',
        hint: 'Gondolj egy cipősdobozra!'
      },
      {
        id: 'q1-9',
        title: 'Kocka éleinek száma',
        question: 'Hány éle van egy kockának?',
        options: ['12 él', '8 él', '6 él', '16 él'],
        correctAnswer: '12 él',
        explanation: 'A kockának 4 alsó alapéle, 4 felső alapéle és 4 oldaléle van, összesen 12 él.',
        hint: '4 alul + 4 felül + 4 függőlegesen = 12 él.'
      },
      {
        id: 'q1-10',
        title: 'Kocka csúcsainak száma',
        question: 'Hány csúcsa van egy kockának?',
        options: ['8 csúcs', '6 csúcs', '12 csúcs', '4 csúcs'],
        correctAnswer: '8 csúcs',
        explanation: 'A kockának 4 alsó és 4 felső csúcsa van, összesen 8 csúcs.',
        hint: 'Alul 4 csúcs a négyzet sarkaiban, felül szintén 4.'
      }
    ]
  },

  // 2. SZINT: Vetületi Ábrázolás (Háromkép-rendszer)
  {
    level: 2,
    title: '2. szint: Vetületi ábrázolás és nézetek',
    subtitle: 'Elölnézet (főnézet), felülnézet (alaprajz) és oldalnézet (balnézet)',
    description: '10 feladat 3D testek és építmények merőleges síkbeli vetületeiről.',
    questions: [
      {
        id: 'q2-1',
        title: 'Felülnézet elnevezése',
        question: 'Mi a felülnézet hivatalos építészeti és műszaki megnevezése?',
        options: ['Alaprajz', 'Főnézet', 'Profilnézet', 'Térrajz'],
        correctAnswer: 'Alaprajz',
        explanation: 'A felülnézetet a vízszintes képsíkra vetítjük, ezt a műszaki életben alaprajznak nevezik.',
        hint: 'Amikor egy házat fentről nézünk, a helyiségek alaprajzát látjuk.'
      },
      {
        id: 'q2-2',
        title: 'Henger vetületi képei',
        question: 'Milyen alakzatokat kapunk egy függőleges tengelyű egyenes henger elöl- és felülnézeteként?',
        options: [
          'Elölnézet: téglalap, Felülnézet: kör',
          'Elölnézet: kör, Felülnézet: négyzet',
          'Mindkettő kör',
          'Elölnézet: háromszög, Felülnézet: téglalap'
        ],
        correctAnswer: 'Elölnézet: téglalap, Felülnézet: kör',
        figure: (
          <svg viewBox="0 0 120 75" className="w-32 h-20">
            <rect x="18" y="14" width="26" height="36" rx="1" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="31" y="60" textAnchor="middle" className="text-[7.5px] font-semibold fill-slate-700">Elölnézet</text>
            <text x="31" y="68" textAnchor="middle" className="text-[6.5px] fill-slate-500">(téglalap)</text>
            <circle cx="85" cy="32" r="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="85" cy="32" r="1.5" fill="#4f46e5" />
            <text x="85" y="60" textAnchor="middle" className="text-[7.5px] font-semibold fill-slate-700">Felülnézet</text>
            <text x="85" y="68" textAnchor="middle" className="text-[6.5px] fill-slate-500">(kör)</text>
          </svg>
        ),
        explanation: 'A hengert szemből nézve téglalapnak, fentről ránézve pedig körnek látjuk.',
        hint: 'Képzelj el egy konzervdobozt szemből és fentről nézve!'
      },
      {
        id: 'q2-3',
        title: 'Négyzetes gúla felülnézete',
        question: 'Mit látunk egy négyzet alapú gúla felülnézetében?',
        options: [
          'Egy négyzetet a két átlójával berajzolva',
          'Csak egy üres négyzetet',
          'Egy szabályos háromszöget',
          'Négy egymástól különálló háromszöget'
        ],
        correctAnswer: 'Egy négyzetet a két átlójával berajzolva',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <rect x="25" y="10" width="50" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="25" y1="10" x2="75" y2="60" stroke="#b45309" strokeWidth="1.5" />
            <line x1="25" y1="60" x2="75" y2="10" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="50" cy="35" r="2.5" fill="#dc2626" />
            <text x="50" y="72" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">Felülnézet: négyzet + átlók</text>
          </svg>
        ),
        explanation: 'Fentről nézve a négyzet alap keretét látjuk, a négy oldalél pedig az átlók mentén a középpontban lévő csúcsba fut.',
        hint: 'A csúcs a négyzet közepe felett lebeg, oda fut a 4 oldalél.'
      },
      {
        id: 'q2-4',
        title: 'Kocka 3 vetülete',
        question: 'Milyen síkidomok a kocka elöl-, felül- és oldalnézetei?',
        options: [
          'Mind a három nézet egybevágó négyzet',
          'Elöl téglalap, felül négyzet',
          'Két négyzet és egy téglalap',
          'Háromszögek'
        ],
        correctAnswer: 'Mind a három nézet egybevágó négyzet',
        explanation: 'Mivel a kocka minden lapja egybevágó négyzet, minden merőleges irányból nézve pontosan ugyanazt a négyzetet látjuk.',
        hint: 'A kocka szimmetrikus minden oldalról.'
      },
      {
        id: 'q2-5',
        title: 'Kúp nézetei',
        question: 'Milyen alakzat az egyenes körkúp elölnézete és felülnézete?',
        options: [
          'Elölnézet: egyenlő szárú háromszög, Felülnézet: kör a középpontjával',
          'Elölnézet: kör, Felülnézet: téglalap',
          'Mindkettő háromszög',
          'Elölnézet: téglalap, Felülnézet: pont'
        ],
        correctAnswer: 'Elölnézet: egyenlő szárú háromszög, Felülnézet: kör a középpontjával',
        figure: (
          <svg viewBox="0 0 120 75" className="w-32 h-20">
            <polygon points="16,48 46,48 31,14" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <text x="31" y="60" textAnchor="middle" className="text-[7.5px] font-semibold fill-slate-700">Elölnézet</text>
            <text x="31" y="68" textAnchor="middle" className="text-[6.5px] fill-slate-500">(háromszög)</text>
            <circle cx="85" cy="31" r="17" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.5" />
            <circle cx="85" cy="31" r="2" fill="#be185d" />
            <text x="85" y="60" textAnchor="middle" className="text-[7.5px] font-semibold fill-slate-700">Felülnézet</text>
            <text x="85" y="68" textAnchor="middle" className="text-[6.5px] fill-slate-500">(kör + csúcs)</text>
          </svg>
        ),
        explanation: 'A kúpot szemből nézve egyenlő szárú háromszög, fentről nézve kör, melynek közepében a csúcs egy pontként látható.',
        hint: 'Képzelj el egy közlekedési bóját!'
      },
      {
        id: 'q2-6',
        title: 'Oldalnézet vetítési iránya',
        question: 'A háromkép-rendszerben a szabványos oldalnézetet melyik irányból nézzük?',
        options: [
          'Balról nézve a testet, a jobb oldali képsíkra vetítve',
          'Jobbról nézve balra vetítve',
          'Hátulról nézve előre vetítve',
          'Fentről 45 fokos szögben'
        ],
        correctAnswer: 'Balról nézve a testet, a jobb oldali képsíkra vetítve',
        explanation: 'A magyar és európai vetületi ábrázolásban az oldalnézet (profil) a balról nézett képet ábrázolja.',
        hint: 'Balról nézünk, és a jobb oldali függőleges képsíkra rajzolunk.'
      },
      {
        id: 'q2-7',
        title: 'Gömb vetülete',
        question: 'Milyen alakzat egy gömb merőleges vetülete bármely irányból?',
        options: [
          'Mindig a gömb főkörével egybevágó kör',
          'Ellipszis',
          'Négyzet lekerekített sarkokkal',
          'Csak egy pont'
        ],
        correctAnswer: 'Mindig a gömb főkörével egybevágó kör',
        explanation: 'A gömb tökéletes forgásszimmetriája miatt bármely irányból merőlegesen vetítve kör képét adja.',
        hint: 'Forgasd el a gömböt: változik a körvonala?'
      },
      {
        id: 'q2-8',
        title: 'Kockaépítmény nézete',
        question: '3 kockát egymásra teszünk toronyként. Milyen az elölnézete?',
        options: [
          'Egy 1 széles, 3 magas álló téglalap (3 egymásra rajzolt négyzet)',
          'Egy nagy négyzet',
          'Három különálló négyzet egymás mellett',
          'Egy háromszög'
        ],
        correctAnswer: 'Egy 1 széles, 3 magas álló téglalap (3 egymásra rajzolt négyzet)',
        figure: (
          <svg viewBox="0 0 110 80" className="w-28 h-20">
            <rect x="47" y="10" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <rect x="47" y="26" width="16" height="16" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.2" />
            <rect x="47" y="42" width="16" height="16" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.2" />
            <text x="55" y="69" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">Elölnézet: 1×3 álló oszlop</text>
          </svg>
        ),
        explanation: 'A tornyot szemből nézve egy 1×3-as álló oszlopot látunk.',
        hint: '1 oszlopban 3 kocka egymás felett.'
      },
      {
        id: 'q2-9',
        title: 'Háromoldalú hasáb nézetei',
        question: 'Egy háromoldalú egyenes hasáb alaplapja a földön fekszik. Mit látunk felülnézetben?',
        options: [
          'Az alaplap háromszögét',
          'Egy kört',
          'Két téglalapot',
          'Egy négyzetet'
        ],
        correctAnswer: 'Az alaplap háromszögét',
        explanation: 'Ha az alaplap a vízszintes síkon fekszik, fentről pontosan a háromszög alakú fedőlapot/alapot látjuk.',
        hint: 'A test fentről nézve pontosan a fedőlap kontúrját mutatja.'
      },
      {
        id: 'q2-10',
        title: 'Nézetek egyértelműsége',
        question: 'Egy ismeretlen test elölnézete négyzet. Biztos, hogy ez a test egy kocka?',
        options: [
          'Nem biztos, lehet például négyzetes hasáb vagy henger is',
          'Igen, csak a kockának lehet négyzet az elölnézete',
          'Igen, a négyzetes elölnézet garantálja a kockát',
          'Nem, csak gúla lehet'
        ],
        correctAnswer: 'Nem biztos, lehet például négyzetes hasáb vagy henger is',
        explanation: 'Egyetlen nézet nem határozza meg a testet. Például egy négyzetes hasábnak, vagy egy olyan hengernek is lehet négyzet az elölnézete, amelynek átmérője egyenlő a magasságával.',
        hint: 'Kellenek a többi nézetek is a térbeli azonosításhoz!'
      }
    ]
  },

  // 3. SZINT: Euler-tétel és Térszemléleti Feladatok
  {
    level: 3,
    title: '3. szint: Az Euler-tétel és térszemléleti összefüggések',
    subtitle: 'Csúcsok, lapok, élek kiszámítása és a poliéder-képlet alkalmazása',
    description: '10 magasabb szintű feladat az Euler-összefüggésről (C + L = E + 2) és térbeli tulajdonságokról.',
    questions: [
      {
        id: 'q3-1',
        title: 'Az Euler-féle poliédertétel képlete',
        question: 'Melyik az Euler-tétel helyes összefüggése konvex poliéderekre?',
        options: [
          'C + L = E + 2',
          'C + E = L + 2',
          'C · L = E + 2',
          'C + L + E = 2'
        ],
        correctAnswer: 'C + L = E + 2',
        figure: (
          <svg viewBox="0 0 110 55" className="w-32 h-16">
            <rect x="5" y="5" width="100" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="55" y="25" textAnchor="middle" className="text-[12px] font-black fill-indigo-600">C + L = E + 2</text>
            <text x="55" y="40" textAnchor="middle" className="text-[7px] font-medium fill-slate-500">Csúcsok + Lapok = Élek + 2</text>
          </svg>
        ),
        explanation: 'Az Euler-féle poliédertétel kimondja, hogy a csúcsok (C) és a lapok (L) számának összege mindig 2-vel több az élek számánál (E + 2).',
        hint: 'Kockára: 8 csúcs + 6 lap = 12 él + 2 (14 = 14).'
      },
      {
        id: 'q3-2',
        title: 'Élek számítása Euler-tétellel',
        question: 'Egy konvex poliédernek 6 csúcsa és 8 lapja van (pl. oktaéder). Hány éle van ennek a testnek?',
        options: ['12 él', '10 él', '14 él', '16 él'],
        correctAnswer: '12 él',
        figure: (
          <svg viewBox="0 0 100 85" className="w-28 h-20">
            <line x1="50" y1="12" x2="50" y2="34" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="50" y1="72" x2="50" y2="34" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="22" y1="42" x2="50" y2="34" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="78" y1="42" x2="50" y2="34" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <polygon points="50,12 22,42 50,52" fill="#c7d2fe" fillOpacity="0.6" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="50,12 78,42 50,52" fill="#a5b4fc" fillOpacity="0.7" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="50,72 22,42 50,52" fill="#818cf8" fillOpacity="0.6" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="50,72 78,42 50,52" fill="#6366f1" fillOpacity="0.7" stroke="#4f46e5" strokeWidth="1.2" />
            <circle cx="50" cy="12" r="2" fill="#312e81" />
            <circle cx="50" cy="72" r="2" fill="#312e81" />
            <circle cx="22" cy="42" r="2" fill="#312e81" />
            <circle cx="78" cy="42" r="2" fill="#312e81" />
            <circle cx="50" cy="52" r="2" fill="#312e81" />
            <text x="50" y="81" textAnchor="middle" className="text-[7.5px] font-bold fill-indigo-900">Oktaéder: C=6, L=8 ⟹ E=12</text>
          </svg>
        ),
        explanation: 'Euler-tételből: C + L = E + 2 → 6 + 8 = E + 2 → 14 = E + 2 → E = 12 él.',
        hint: '6 + 8 = 14, ebből vonj ki 2-t!'
      },
      {
        id: 'q3-3',
        title: 'Hasáb éleinek száma n-ből',
        question: 'Ha egy hasáb alaplapja egy n-oldalú sokszög, hány éle van összesen a hasábnak?',
        options: ['3 · n él', '2 · n él', 'n + 2 él', '4 · n él'],
        correctAnswer: '3 · n él',
        explanation: 'A hasábnak n darab alsó alapéle, n darab felső alapéle és n darab függőleges oldaléle van: n + n + n = 3n.',
        hint: 'Alsó alap + felső alap + összekötő oldalélek.'
      },
      {
        id: 'q3-4',
        title: 'Gúla éleinek száma n-ből',
        question: 'Ha egy gúla alaplapja egy n-oldalú sokszög, hány éle van összesen a gúlának?',
        options: ['2 · n él', '3 · n él', 'n + 1 él', '2 · n + 2 él'],
        correctAnswer: '2 · n él',
        explanation: 'A gúlának van n darab alapéle, és a csúcsba fut n darab oldalél: n + n = 2n.',
        hint: 'Az alapon n él, és a csúcsba fut n él.'
      },
      {
        id: 'q3-5',
        title: 'Hatszög alapú hasáb csúcsai',
        question: 'Hány csúcsa van egy hatszög alapú egyenes hasábnak?',
        options: ['12 csúcs', '6 csúcs', '18 csúcs', '8 csúcs'],
        correctAnswer: '12 csúcs',
        explanation: 'A hasábnak 2 hatszög alaplapja van, mindkettőnek 6 csúcsa: 2 · 6 = 12 csúcs.',
        hint: 'Alul 6 csúcs + felül 6 csúcs.'
      },
      {
        id: 'q3-6',
        title: 'Lapok száma ismert adatokból',
        question: 'Egy poliédernek 10 csúcsa és 15 éle van. Hány lap határolja?',
        options: ['7 lap', '5 lap', '8 lap', '6 lap'],
        correctAnswer: '7 lap',
        explanation: 'C + L = E + 2 → 10 + L = 15 + 2 → 10 + L = 17 → L = 7 lap (ez például egy ötoldalú hasáb).',
        hint: '17 - 10 = 7.'
      },
      {
        id: 'q3-7',
        title: 'Ötoldalú gúla adatai',
        question: 'Hány lapja és hány csúcsa van egy ötszög alapú gúlának?',
        options: [
          '6 lapja és 6 csúcsa van',
          '5 lapja és 6 csúcsa van',
          '6 lapja és 10 csúcsa van',
          '5 lapja és 5 csúcsa van'
        ],
        correctAnswer: '6 lapja és 6 csúcsa van',
        figure: (
          <svg viewBox="0 0 100 85" className="w-28 h-20">
            <line x1="50" y1="12" x2="32" y2="50" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="50" y1="12" x2="68" y2="48" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="32" y1="50" x2="68" y2="48" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <polygon points="50,12 18,62 45,68" fill="#fde68a" fillOpacity="0.5" stroke="#d97706" strokeWidth="1.2" />
            <polygon points="50,12 45,68 75,64" fill="#fcd34d" fillOpacity="0.6" stroke="#d97706" strokeWidth="1.2" />
            <line x1="18" y1="62" x2="32" y2="50" stroke="#d97706" strokeWidth="1.2" />
            <line x1="75" y1="64" x2="68" y2="48" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="50" cy="12" r="2" fill="#b45309" />
            <text x="50" y="80" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">Ötoldalú gúla: C = 6, L = 6</text>
          </svg>
        ),
        explanation: 'Lapok: 1 ötszög alap + 5 háromszög = 6 lap. Csúcsok: 5 alapi csúcs + 1 fenti közös csúcs = 6 csúcs.',
        hint: 'n-oldalú gúla esetén mindig L = n + 1 és C = n + 1.'
      },
      {
        id: 'q3-8',
        title: '12-oldalú hasáb élei',
        question: 'Hány éle van egy 12-oldalú sokszög alapú hasábnak?',
        options: ['36 él', '24 él', '12 él', '48 él'],
        correctAnswer: '36 él',
        explanation: 'Hasábnál az élek száma 3n: 3 · 12 = 36 él.',
        hint: '12 alsó él + 12 felső él + 12 oldalél.'
      },
      {
        id: 'q3-9',
        title: 'Kocka éleinek felezése',
        question: 'Ha egy kocka élhosszát a felére csökkentjük (a ⟶ a/2), hányszorosára változik a térfogata?',
        options: ['1/8-ára (nyolcadára)', '1/2-ére (felére)', '1/4-ére (negyedére)', '1/16-ára'],
        correctAnswer: '1/8-ára (nyolcadára)',
        explanation: 'A térfogat az él köbével arányos: V = (a/2)³ = a³/8 = V/8.',
        hint: 'Térfogatnál a méretarány a harmadik hatványon szerepel: (1/2)³ = 1/8.'
      },
      {
        id: 'q3-10',
        title: 'Euler-tétel a tetraéderre',
        question: 'Ellenőrizd az Euler-tételt a tetraéderre (C = 4, L = 4, E = 6)! Mennyi a C + L és az E + 2 értéke?',
        options: [
          'Mindkettő 8 (4 + 4 = 8 és 6 + 2 = 8)',
          'Mindkettő 6',
          'Mindkettő 10',
          'A tetraéderre nem érvényes az Euler-tétel'
        ],
        correctAnswer: 'Mindkettő 8 (4 + 4 = 8 és 6 + 2 = 8)',
        figure: (
          <svg viewBox="0 0 100 85" className="w-28 h-20">
            <polygon points="50,14 20,64 55,72" fill="#fed7aa" fillOpacity="0.6" stroke="#ea580c" strokeWidth="1.2" />
            <polygon points="50,14 55,72 80,58" fill="#f97316" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="20" y1="64" x2="80" y2="58" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="50" cy="14" r="2" fill="#c2410c" />
            <circle cx="20" cy="64" r="2" fill="#c2410c" />
            <circle cx="55" cy="72" r="2" fill="#c2410c" />
            <circle cx="80" cy="58" r="2" fill="#c2410c" />
            <text x="50" y="81" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">Tetraéder: C=4, L=4, E=6</text>
          </svg>
        ),
        explanation: 'C + L = 4 + 4 = 8, és E + 2 = 6 + 2 = 8. Az Euler-tétel tökéletesen teljesül.',
        hint: '4 + 4 = 8, és 6 + 2 = 8.'
      }
    ]
  }
];

const cheatSheetCards = [
  {
    title: 'Testháló szabályok',
    formula: 'Kocka: 11 háló',
    explanation: 'A kockának 11 különböző síkbeli hálója van. A szemközti lapok sosem szomszédosak a hálóban!'
  },
  {
    title: 'Háromkép-rendszer',
    formula: 'Elöl • Felül • Oldalt',
    explanation: 'Elölnézet (főnézet), Felülnézet (alaprajz), Oldalnézet (balnézet).'
  },
  {
    title: 'Euler-poliédertétel',
    formula: 'C + L = E + 2',
    explanation: 'Csúcsok + Lapok = Élek + 2. Hasáb élei: 3n, Gúla élei: 2n.'
  }
];

export const SolidsInSpaceAndPlaneQuiz: React.FC<SolidsInSpaceAndPlaneQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="10. Testek térben és síkban Kvíz"
      subtitle="Teszteld tudásodat testhálókról, vetületekről és az Euler-tételről 3 nehézségi szinten!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA"
      topicId="g7-geom-solids-space-plane"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <SolidsInSpaceAndPlaneMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SolidsInSpaceAndPlaneSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <SolidsInSpaceAndPlaneMatcher
          {...props}
          key={`solids-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <SolidsInSpaceAndPlaneSorter
          {...props}
          key={`solids-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
