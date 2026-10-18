import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { QuadsMatcher } from './QuadsMatcher';
import { QuadsSorter } from './QuadsSorter';

export interface QuadsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const QUADS_QUESTIONS: Question[] = [
  // ==========================================
  // 1. SZINT: ALAPFOGALMAK ÉS OLDALAK (1-10)
  // ==========================================
  {
    id: 'q1-1',
    level: 1,
    prompt: 'Hány darab belső szöge van a téglalapnak, és mekkorák ezek a szögek?',
    options: [
      '4 darab belső szöge van, és mindegyik pontosan 90°-os derékszög',
      '4 darab belső szöge van, kettő hegyesszög és kettő tompaszög',
      '4 darab belső szöge van, mindegyik 60°-os',
      '3 darab derékszöge és 1 tompaszöge van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-14 mx-auto" viewBox="0 0 60 36" fill="none">
        <rect x="8" y="6" width="44" height="24" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
        <path d="M 14 30 A 6 6 0 0 0 8 24" fill="none" stroke="#be123c" strokeWidth="1" />
        <circle cx="11" cy="27" r="0.7" fill="#be123c" />
      </svg>
    ),
    explanation: 'A téglalap definíciója szerint olyan négyszög, amelynek minden belső szöge derékszög (90°).',
    hint: 'A téglalap neve a téglára és a derékszögekre utal.',
    breakdown: [
      { label: 'Belső szögek száma', value: '4 db' },
      { label: 'Belső szögek nagysága', value: 'Mind 90° (derékszög)' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    prompt: 'Melyik állítás igaz a négyzet oldalaira?',
    options: [
      'Mind a 4 oldala pontosan egyenlő hosszú (a = b = c = d)',
      'Csak a szemközti oldalai egyenlők',
      'Minden oldala különböző hosszúságú',
      'Két oldala mindig kétszer olyan hosszú, mint a másik kettő'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 36" fill="none">
        <rect x="8" y="6" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <text x="18" y="34" className="text-[8px] font-bold fill-pink-800">a</text>
        <text x="34" y="20" className="text-[8px] font-bold fill-pink-800">a</text>
      </svg>
    ),
    explanation: 'A négyzet olyan téglalap, amelynek mind a 4 oldala egyenlő hosszúságú.',
    hint: 'Gondolj egy sakktábla egyetlen mezőjére vagy a dobókocka lapjára.',
    breakdown: [
      { label: 'Alakzat', value: 'Négyzet' },
      { label: 'Oldalak', value: '4 egyenlő oldal (a)' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    prompt: 'Mekkora a téglalap és a négyzet belső szögeinek összege?',
    options: [
      '360° (mivel 4 · 90° = 360°)',
      '180°',
      '270°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'Minden négyszög belső szögeinek összege 360°. Mivel a téglalapnak és négyzetnek mind a 4 szöge 90°, így 4 · 90° = 360°.',
    hint: 'Add össze a négy darab 90°-os szöget!',
    breakdown: [
      { label: 'Belső szögek', value: '90° + 90° + 90° + 90°' },
      { label: 'Összeg', value: '360°' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    prompt: 'Milyen viszonyban vannak egymással a téglalap szemközti oldalai?',
    options: [
      'Párhuzamosak és egyenlő hosszúak (a ∥ a és b ∥ b)',
      'Merőlegesek egymásra és egyenlő hosszúak',
      'Metszik egymást a téglalapon belül',
      'Párhuzamosak, de mindig különböző hosszúságúak'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap szemközti oldalai párhuzamosak egymással és egyenlő hosszúak (AB ∥ CD és AD ∥ BC).',
    hint: 'Gondolj a füzetlap tetejére és aljára: egyenesek és sosem futnak össze.',
    breakdown: [
      { label: 'Irányuk', value: 'Párhuzamos (∥)' },
      { label: 'Hosszuk', value: 'Egyenlő' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    prompt: 'Milyen szöget zárnak be egymással a téglalap szomszédos oldalai (pl. az a és b oldal)?',
    options: [
      'Pontosan 90°-ot, azaz merőlegesek egymásra (a ⊥ b)',
      '60°-os hegyesszöget',
      '120°-os tompaszöget',
      '180°-os egyenesszöget'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap bármely két szomszédos oldala derékszöget (90°) zár be, vagyis merőlegesek egymásra.',
    hint: 'Nézd meg a szoba sarkát: a két találkozó fal pontosan merőleges.',
    breakdown: [
      { label: 'Szomszédos oldalak', value: 'a és b' },
      { label: 'Kapcsolatuk', value: 'Merőlegesek: a ⊥ b (90°)' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    prompt: 'Igaz-e az az állítás, hogy „Minden négyzet téglalap”?',
    options: [
      'IGAZ, mert a négyzet minden belső szöge derékszög (90°)',
      'HAMIS, mert a négyzetnek minden oldala egyenlő',
      'HAMIS, mert a négyzet egy teljesen külön síkidom',
      'Csak akkor igaz, ha a négyzet oldala 10 cm-nél nagyobb'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap feltétele csak annyi, hogy minden belső szöge derékszög legyen. A négyzet ezt maradéktalanul teljesíti, így a négyzet a téglalapok egy speciális csoportja.',
    hint: 'Nézd meg a definíciót: mi kell ahhoz, hogy valami téglalap legyen? Csak 4 derékszög!',
    breakdown: [
      { label: 'Téglalap feltétele', value: '4 derékszög' },
      { label: 'Négyzet szögei', value: '4 derékszög ✓' },
      { label: 'Következtetés', value: 'Minden négyzet téglalap!' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    prompt: 'Igaz-e az a megfordított állítás, hogy „Minden téglalap négyzet”?',
    options: [
      'HAMIS, mert egy általános téglalap szomszédos oldalai különböző hosszúságúak lehetnek',
      'IGAZ, minden téglalap négyzet is egyben',
      'IGAZ, ha a téglalap területe páros szám',
      'Csak a papírlapokra igaz'
    ],
    correctAnswer: 0,
    explanation: 'Nem minden téglalap négyzet! Egy 6 cm × 4 cm-es téglalapnak derékszögei vannak, de az oldalai nem egyenlők, így nem négyzet.',
    hint: 'Gondolj egy hosszú, vékony téglalapra: egyenlők az oldalai?',
    breakdown: [
      { label: 'Négyzet feltétele', value: 'Minden oldal egyenlő' },
      { label: 'Általános téglalap', value: 'a ≠ b (nem egyenlő oldalak)' },
      { label: 'Következtetés', value: 'Nem minden téglalap négyzet!' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    prompt: 'Hogyan nevezzük a geometriában azt a négyszöget, amelynek minden oldala és minden belső szöge egyenlő?',
    options: [
      'Szabályos négyszög (vagyis négyzet)',
      'Rombusz',
      'Általános téglalap',
      'Paralelogramma'
    ],
    correctAnswer: 0,
    explanation: 'A szabályos sokszögeknek minden oldala és minden szöge egyenlő. A négyszögek közül ez a négyzet.',
    hint: 'A szabályos 3-szög az egyenlő oldalú háromszög, a szabályos 4-szög pedig a...',
    breakdown: [
      { label: 'Oldalak', value: 'Egyenlők' },
      { label: 'Szögek', value: 'Egyenlők (90°)' },
      { label: 'Elnevezés', value: 'Szabályos négyszög = Négyzet' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    prompt: 'Egy ABCD téglalapban az AB oldallal melyik oldal van szemben?',
    options: [
      'A CD oldal',
      'A BC oldal',
      'Az AD oldal',
      'Az AC átló'
    ],
    correctAnswer: 0,
    explanation: 'Az óramutató járásával ellentétesen betűzve a csúcsokat: A, B, C, D. Az AB oldal a vízszintes alsó oldal, a vele szemközti felső oldal a CD.',
    hint: 'Rajzold le a pontokat körbe haladva: A-ból B-be, B-ből C-be, C-ből D-be.',
    breakdown: [
      { label: 'Alsó oldal', value: 'AB' },
      { label: 'Felső (szemközti) oldal', value: 'CD' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    prompt: 'Melyik síkidom NEM lehet négyzet a felsoroltak közül?',
    options: [
      'Olyan négyszög, amelynek oldalai 5 cm, 5 cm, 8 cm és 8 cm',
      'Egy négyzet alakú fürdőszobai csempe',
      'Egy kocka alakú doboz oldallapja',
      'Egy négyzetrácsos füzet 4x4-es mezője'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldalának egyenlőnek kell lennie. Ha az oldalak 5 cm és 8 cm hosszúak, az csak téglalap lehet, de négyzet semmiképpen.',
    hint: 'A négyzet mind a 4 oldalának hajszálpontosan egyenlőnek kell lennie.',
    breakdown: [
      { label: 'Megadott oldalak', value: '5 cm, 5 cm, 8 cm, 8 cm' },
      { label: 'Hiba a négyzetnél', value: '5 cm ≠ 8 cm' }
    ]
  },

  // ==========================================
  // 2. SZINT: ÁTLÓK ÉS SZIMMETRIA (11-20)
  // ==========================================
  {
    id: 'q2-11',
    level: 2,
    prompt: 'Mely tulajdonságok igazak a téglalap átlóira?',
    options: [
      'Pontosan 2 átlója van, amelyek egyenlő hosszúak és felezik egymást',
      'Átlói merőlegesek egymásra és felezik a belső derékszögeket',
      'Különböző hosszúságúak',
      'Csak 1 átlója van'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-14 mx-auto" viewBox="0 0 60 36" fill="none">
        <rect x="8" y="6" width="44" height="24" stroke="#64748b" strokeWidth="1.2" fill="none" />
        <line x1="8" y1="30" x2="52" y2="6" stroke="#4f46e5" strokeWidth="1.5" />
        <line x1="8" y1="6" x2="52" y2="30" stroke="#4f46e5" strokeWidth="1.5" />
        <circle cx="30" cy="18" r="2" fill="#be123c" />
      </svg>
    ),
    explanation: 'A téglalap mindkét átlója azonos hosszúságú (|AC| = |BD|), és a metszéspontjukban kölcsönösen felezik egymást. Viszont nem merőlegesek!',
    hint: 'A téglalap átlói egyenlők és felezik egymást.',
    breakdown: [
      { label: 'Átlók száma', value: '2 db' },
      { label: 'Hosszuk', value: 'Egyenlő (|AC| = |BD|)' },
      { label: 'Felezés', value: 'Igen, M felezőpont' }
    ]
  },
  {
    id: 'q2-12',
    level: 2,
    prompt: 'Merőlegesek-e egymásra egy ÁLTALÁNOS (nem négyzet) téglalap átlói?',
    options: [
      'NEM, az átlók két hegyesszöget és két tompaszöget zárnak be egymással',
      'IGEN, minden téglalap átlói pontosan 90°-ot zárnak be',
      'IGEN, ha a téglalap kerülete 20 cm-nél nagyobb',
      'Csak akkor, ha az oldalai páros számok'
    ],
    correctAnswer: 0,
    explanation: 'Általános téglalapban az átlók NEM merőlegesek egymásra! Csak és kizárólag akkor zárnak be 90°-ot, ha a téglalap minden oldala egyenlő, vagyis ha NÉGYZET.',
    hint: 'Gondolj egy hosszú füzetlapra: az átlók lapos X-et formálnak, nem szabályos keresztet.',
    breakdown: [
      { label: 'Általános téglalap átlói', value: 'NEM merőlegesek' },
      { label: 'Négyzet átlói', value: 'Merőlegesek (90°)' }
    ]
  },
  {
    id: 'q2-13',
    level: 2,
    prompt: 'Mekkora szöget zárnak be egymással a NÉGYZET átlói a metszéspontjukban?',
    options: [
      'Pontosan 90°-ot (merőlegesek egymásra: e ⊥ f)',
      '60°-ot',
      '45°-ot',
      '180°-ot'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 36" fill="none">
        <rect x="8" y="6" width="24" height="24" stroke="#64748b" strokeWidth="1.2" fill="none" />
        <line x1="8" y1="30" x2="32" y2="6" stroke="#db2777" strokeWidth="1.5" />
        <line x1="8" y1="6" x2="32" y2="30" stroke="#db2777" strokeWidth="1.5" />
        <path d="M 22.5 15.5 A 3.5 3.5 0 0 0 17.5 15.5" fill="none" stroke="#be123c" strokeWidth="1" />
        <circle cx="20" cy="16" r="0.5" fill="#be123c" />
      </svg>
    ),
    explanation: 'A négyzet átlói speciálisak: amellett, hogy egyenlő hosszúak és felezik egymást, pontosan 90°-os derékszöget zárnak be egymással!',
    hint: 'A négyzet tökéletesen szimmetrikus alakzat, átlói szabályos keresztet alkotnak.',
    breakdown: [
      { label: 'Négyzet átlói', value: 'AC és BD' },
      { label: 'Bezárt szög', value: '90° (derékszög)' }
    ]
  },
  {
    id: 'q2-14',
    level: 2,
    prompt: 'Hány fokos szögekre osztják a négyzet átlói a belső 90°-os derékszögeket a csúcsoknál?',
    options: [
      'Két darab 45°-os szögre (vagyis felezik a derékszöget)',
      'Egy 30°-os és egy 60°-os szögre',
      'Nem osztják részekre',
      'Két darab 90°-os szögre'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet átlói a belső szögek szögfelezői is egyben: a 90°-os derékszöget pontosan két 45°-os szögre felezik (90° : 2 = 45°).',
    hint: '90° felét keresd!',
    breakdown: [
      { label: 'Eredeti belső szög', value: '90°' },
      { label: 'Felezve', value: '90° : 2 = 45°' }
    ]
  },
  {
    id: 'q2-15',
    level: 2,
    prompt: 'Hány darab szimmetriatengelye van a téglalapnak, és mik ezek?',
    options: [
      'Pontosan 2 darab (a két szemközti oldalfelező merőleges)',
      'Pontosan 4 darab (2 oldalfelező és 2 átló)',
      'Csak 1 darab szimmetriatengelye van',
      'Nincs egyetlen szimmetriatengelye sem'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-24 h-14 mx-auto" viewBox="0 0 60 36" fill="none">
        <rect x="10" y="8" width="40" height="20" stroke="#334155" strokeWidth="1.2" fill="none" />
        <line x1="30" y1="4" x2="30" y2="32" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 1" />
        <line x1="6" y1="18" x2="54" y2="18" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 1" />
      </svg>
    ),
    explanation: 'A téglalapnak PONTOSAN 2 szimmetriatengelye van: a vízszintes és a függőleges oldalfelező merőleges. Az átlói NEM tükörtengelyek!',
    hint: 'Hányféleképpen tudsz egy téglalap alakú papírt úgy félbehajtani, hogy a szélei pontosan fedjék egymást?',
    breakdown: [
      { label: 'Téglalap tengelyei', value: '2 db' },
      { label: 'Helyzetük', value: 'Oldalfelező merőlegesek' }
    ]
  },
  {
    id: 'q2-16',
    level: 2,
    prompt: 'Hány darab szimmetriatengelye van a NÉGYZETNEK?',
    options: [
      'Pontosan 4 darab (2 oldalfelező merőleges + 2 átló)',
      'Pontosan 2 darab',
      'Pontosan 8 darab',
      'Végtelen sok'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 36" fill="none">
        <rect x="8" y="6" width="24" height="24" stroke="#334155" strokeWidth="1.2" fill="none" />
        <line x1="20" y1="2" x2="20" y2="34" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 1" />
        <line x1="4" y1="18" x2="36" y2="18" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 1" />
        <line x1="6" y1="32" x2="34" y2="4" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
        <line x1="6" y1="4" x2="34" y2="32" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
      </svg>
    ),
    explanation: 'A négyzetnek 4 szimmetriatengelye van: a két oldalfelező merőleges és a két átlója.',
    hint: 'A négyzetet vízszintesen, függőlegesen és mindkét átlója mentén is félbehajthatod.',
    breakdown: [
      { label: 'Oldalfelező tengelyek', value: '2 db' },
      { label: 'Átlós tengelyek', value: '2 db' },
      { label: 'Összesen', value: '4 szimmetriatengely' }
    ]
  },
  {
    id: 'q2-17',
    level: 2,
    prompt: 'Mi történik, ha egy téglalap alakú füzetlapot az ÁTLÓJA mentén hajtunk félbe?',
    options: [
      'A sarkok elcsúsznak egymástól, nem fedik le egymást (az átló nem tükörtengely)',
      'Tökéletesen egybevágóan lefedik egymást',
      'Két szabályos négyzetet kapunk',
      'Egy kört kapunk'
    ],
    correctAnswer: 0,
    explanation: 'Gyakori csapda! Ha egy téglalapot az átlója mentén hajtasz félbe, a csúcsok kilógnak, nem esnek egybe. Ez bizonyítja, hogy az átló NEM szimmetriatengely a téglalapnál.',
    hint: 'Próbáld ki egy papírlappal: hajtsd saroktól sarokig!',
    breakdown: [
      { label: 'Hajtás az átló mentén', value: 'Sarkok elcsúsznak' },
      { label: 'Következtetés', value: 'Téglalap átlója NEM szimmetriatengely!' }
    ]
  },
  {
    id: 'q2-18',
    level: 2,
    prompt: 'Ha egy négyzet alakú papírlapot az egyik átlója mentén félbehajtunk, milyen alakzatot kapunk?',
    options: [
      'Egyenlő szárú derékszögű háromszöget',
      'Szabályos (egyenlő oldalú) háromszöget',
      'Egy kisebb négyzetet',
      'Egy trapézt'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet átlója két egyenlő szárú derékszögű háromszögre osztja a négyzetet, ahol a szárak a négyzet oldalai (a), a szárak szöge pedig 90°.',
    hint: 'A sarokban lévő 90°-os szög megmarad, a két befogó pedig az eredeti oldalakkal egyezik meg.',
    breakdown: [
      { label: 'Keletkező alakzat', value: 'Háromszög' },
      { label: 'Típusa', value: 'Egyenlő szárú derékszögű háromszög' }
    ]
  },
  {
    id: 'q2-19',
    level: 2,
    prompt: 'Egy téglalap egyik átlójának hossza 14 cm. Milyen messze van az átlók metszéspontja (M) a csúcsoktól?',
    options: [
      '7 cm-re mind a 4 csúcstól (mivel az átlók felezik egymást: 14 : 2 = 7 cm)',
      '14 cm-re',
      '3,5 cm-re',
      'Két csúcstól 6 cm-re, kettőtől 8 cm-re'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a téglalap mindkét átlója 14 cm hosszú és kölcsönösen felezik egymást, ezért a középpontból mind a 4 csúcs pontosan 14 : 2 = 7 cm távolságra van.',
    hint: 'Az átló feleződik a metszéspontban: 14 : 2 = ?',
    breakdown: [
      { label: 'Átló hossza', value: '14 cm' },
      { label: 'Fél-átló hossza', value: '14 : 2 = 7 cm' },
      { label: 'Távolság a csúcsoktól', value: '7 cm mind a 4 csúcstól' }
    ]
  },
  {
    id: 'q2-20',
    level: 2,
    prompt: 'A négyzet 2 darab átlója hány darab háromszögre bontja a négyzet belsejét?',
    options: [
      '4 darab egybevágó, egyenlő szárú derékszögű háromszögre',
      '2 darab tompaszögű háromszögre',
      '6 darab hegyesszögű háromszögre',
      '8 darab négyzetre'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-16 h-14 mx-auto" viewBox="0 0 40 36" fill="none">
        <rect x="8" y="6" width="24" height="24" stroke="#64748b" strokeWidth="1.2" fill="none" />
        <line x1="8" y1="30" x2="32" y2="6" stroke="#db2777" strokeWidth="1.5" />
        <line x1="8" y1="6" x2="32" y2="30" stroke="#db2777" strokeWidth="1.5" />
      </svg>
    ),
    explanation: 'A két merőleges átló 4 egyenlő darabra vágja a négyzetet, mindegyik egy 45°-45°-90°-os egyenlő szárú derékszögű háromszög.',
    hint: 'Számold meg a négyzet 4 oldalánál keletkező háromszögeket!',
    breakdown: [
      { label: 'Háromszögek száma', value: '4 db' },
      { label: 'Tulajdonságuk', value: 'Egybevágó, egyenlő szárú derékszögűek' }
    ]
  },

  // ==========================================
  // 3. SZINT: KERÜLET, TERÜLET ÉS SZÁMOLÁS (21-30)
  // ==========================================
  {
    id: 'q3-21',
    level: 3,
    prompt: 'Mi a téglalap kerületének (K) pontos képlete, ha az oldalai a és b?',
    options: [
      'K = 2 · (a + b) vagy K = 2a + 2b',
      'K = a · b',
      'K = a + b',
      'K = 4 · a · b'
    ],
    correctAnswer: 0,
    explanation: 'A kerület az oldalak összege: a + b + a + b = 2a + 2b = 2 · (a + b).',
    hint: 'Gondolj a kerítésre: kétszer kell megvenni az a oldalt és kétszer a b oldalt.',
    breakdown: [
      { label: 'Kerület összege', value: 'a + b + a + b' },
      { label: 'Kiemelve', value: 'K = 2 · (a + b)' }
    ]
  },
  {
    id: 'q3-22',
    level: 3,
    prompt: 'Mi a téglalap területének (T) képlete, ha oldalai a és b?',
    options: [
      'T = a · b',
      'T = 2 · (a + b)',
      'T = a + b',
      'T = a² + b²'
    ],
    correctAnswer: 0,
    explanation: 'A téglalap területe a két szomszédos oldal szorzata: T = a · b. Ez adja meg a lefedő egységnégyzetek számát.',
    hint: 'Hány sorban hány négyzet van: szorozd össze a szélességet a magassággal!',
    breakdown: [
      { label: 'Terület képlete', value: 'T = a · b' },
      { label: 'Mértékegysége', value: 'Négyzetes (pl. cm²)' }
    ]
  },
  {
    id: 'q3-23',
    level: 3,
    prompt: 'Egy négyzet oldala a = 6 cm. Mennyi a kerülete (K) és a területe (T)?',
    options: [
      'K = 24 cm és T = 36 cm²',
      'K = 36 cm és T = 24 cm²',
      'K = 12 cm és T = 36 cm²',
      'K = 24 cm² és T = 36 cm'
    ],
    correctAnswer: 0,
    explanation: 'Kerület: K = 4 · a = 4 · 6 = 24 cm. Terület: T = a · a = 6 · 6 = 36 cm².',
    hint: 'K = 4 · 6 = ? és T = 6 · 6 = ? Figyelj a mértékegységekre!',
    breakdown: [
      { label: 'Oldalhossz', value: 'a = 6 cm' },
      { label: 'Kerület', value: 'K = 4 · 6 = 24 cm' },
      { label: 'Terület', value: 'T = 6 · 6 = 36 cm²' }
    ]
  },
  {
    id: 'q3-24',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 8 cm és b = 5 cm. Mennyi a kerülete (K)?',
    options: [
      'K = 26 cm',
      'K = 40 cm',
      'K = 13 cm',
      'K = 26 cm²'
    ],
    correctAnswer: 0,
    explanation: 'K = 2 · (a + b) = 2 · (8 + 5) = 2 · 13 = 26 cm.',
    hint: 'Add össze a két oldalt (8 + 5 = 13), majd szorozd meg 2-vel!',
    breakdown: [
      { label: 'Fél-kerület', value: '8 + 5 = 13 cm' },
      { label: 'Teljes kerület', value: '2 · 13 = 26 cm' }
    ]
  },
  {
    id: 'q3-25',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 7 cm és b = 4 cm. Mennyi a területe (T)?',
    options: [
      'T = 28 cm²',
      'T = 22 cm',
      'T = 28 cm',
      'T = 56 cm²'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b = 7 · 4 = 28 cm².',
    hint: 'Szorozd össze a két oldalt: 7 · 4 = ?',
    breakdown: [
      { label: 'Képlet', value: 'T = a · b' },
      { label: 'Számolás', value: '7 · 4 = 28 cm²' }
    ]
  },
  {
    id: 'q3-26',
    level: 3,
    prompt: 'Egy négyzet kerülete K = 32 cm. Mekkora az oldala (a) és mennyi a területe (T)?',
    options: [
      'a = 8 cm és T = 64 cm²',
      'a = 16 cm és T = 256 cm²',
      'a = 8 cm és T = 32 cm²',
      'a = 4 cm és T = 16 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Mivel K = 4 · a = 32 cm, ezért az oldal: a = 32 : 4 = 8 cm. A terület: T = a · a = 8 · 8 = 64 cm².',
    hint: 'Oszd el a kerületet 4-gyel, hogy megkapd az oldalt, majd emeld négyzetre!',
    breakdown: [
      { label: 'Oldal számítása', value: 'a = 32 : 4 = 8 cm' },
      { label: 'Terület számítása', value: 'T = 8 · 8 = 64 cm²' }
    ]
  },
  {
    id: 'q3-27',
    level: 3,
    prompt: 'Egy téglalap kerülete K = 30 cm, és az egyik oldala a = 9 cm. Mekkora a másik oldala (b)?',
    options: [
      'b = 6 cm',
      'b = 12 cm',
      'b = 21 cm',
      'b = 3 cm'
    ],
    correctAnswer: 0,
    explanation: 'A két szomszédos oldal összege a fél-kerület: a + b = K : 2 = 30 : 2 = 15 cm. Mivel a = 9 cm, így b = 15 - 9 = 6 cm.',
    hint: 'A fél-kerület 15 cm. Mennyit kell a 9-hez adni, hogy 15 legyen?',
    breakdown: [
      { label: 'Fél-kerület (a + b)', value: '30 : 2 = 15 cm' },
      { label: 'Ismert oldal', value: 'a = 9 cm' },
      { label: 'Másik oldal (b)', value: '15 - 9 = 6 cm' }
    ]
  },
  {
    id: 'q3-28',
    level: 3,
    prompt: 'Egy téglalap oldalai a = 2 dm és b = 15 cm. Mennyi a téglalap területe (T)?',
    options: [
      'T = 300 cm² (mert 2 dm = 20 cm, így 20 · 15 = 300 cm²)',
      'T = 30 cm²',
      'T = 30 dm²',
      'T = 35 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Vigyázat, a mértékegységek eltérőek! 1 dm = 10 cm, így 2 dm = 20 cm. Ekkor a terület: T = 20 cm · 15 cm = 300 cm².',
    hint: 'Először váltsd át a decimétert centiméterre: 2 dm = ? cm',
    breakdown: [
      { label: 'Átváltás', value: 'a = 2 dm = 20 cm' },
      { label: 'Másik oldal', value: 'b = 15 cm' },
      { label: 'Terület', value: 'T = 20 · 15 = 300 cm²' }
    ]
  },
  {
    id: 'q3-29',
    level: 3,
    prompt: 'Egy szobafal téglalap alakú, szélessége 6 m, magassága 3 m. Hány darab 1 m² területű tapétacsík fedi le pontosan?',
    options: [
      '18 darab (mert T = 6 · 3 = 18 m²)',
      '9 darab',
      '12 darab',
      '24 darab'
    ],
    correctAnswer: 0,
    explanation: 'A fal területe T = 6 m · 3 m = 18 m². Mivel 1 csík pontosan 1 m², ezért 18 : 1 = 18 darab csík fedi le.',
    hint: 'Számold ki a fal teljes területét m²-ben!',
    breakdown: [
      { label: 'Fal területe', value: '6 · 3 = 18 m²' },
      { label: 'Szükséges darabszám', value: '18 db 1 m²-es tapéta' }
    ]
  },
  {
    id: 'q3-30',
    level: 3,
    prompt: 'Melyik állításcsoport IGAZ teljes egészében a négyzetre?',
    options: [
      'Minden szöge 90°, minden oldala egyenlő, 4 szimmetriatengelye van, átlói merőlegesek és K = 4a, T = a²',
      'Minden szöge 90°, de átlói sosem merőlegesek egymásra és csak 2 tengelye van',
      'Kerülete K = 2 · (a + b), területe T = 4 · a, és nincs szimmetriatengelye',
      'Átlói felezik egymást, de nem egyenlő hosszúak'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet a legtökéletesebb négyszög: 4 derékszög, 4 egyenlő oldal, 4 szimmetriatengely, merőleges átlók, K = 4a és T = a².',
    hint: 'Keresd azt az opciót, amely a négyzet minden aranyszabályát hibátlanul tartalmazza!',
    breakdown: [
      { label: 'Oldalak és szögek', value: '4 egyenlő oldal, 4 derékszög' },
      { label: 'Szimmetria és átlók', value: '4 tengely, merőleges átlók' },
      { label: 'Képletek', value: 'K = 4a, T = a²' }
    ]
  }
];

export const QuadsQuiz: React.FC<QuadsQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="8. Téglalap, négyzet kvíz"
      subtitle="30 feladat 3 szinten: oldalak, szögek, átlók, szimmetriatengelyek, kerület és terület számolása"
      topicId="g5-geom-quads-quiz"
      questions={QUADS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="rose"
      cheatSheetCards={[
        {
          title: "Téglalap és négyzet alapjai",
          content: "Téglalap: minden szöge 90° (derékszög). Szemközti oldalai párhuzamosak és egyenlők (a és b).\nNégyzet: speciális téglalap, amelynek MINDEN oldala egyenlő (a = b = c = d).\nAranyszabály: Minden négyzet téglalap, de nem minden téglalap négyzet!"
        },
        {
          title: "Átlók és szimmetria",
          content: "Téglalap átlói: egyenlő hosszúak, felezik egymást, de NEM merőlegesek!\nTéglalap szimmetriája: PONTOSAN 2 tengely (oldalfelezők). Az átló NEM tengely!\nNégyzet átlói: egyenlők, felezik egymást, MERŐLEGESEK (90°), és felezik a derékszögeket (45°).\nNégyzet szimmetriája: PONTOSAN 4 tengely (2 oldalfelező + 2 átló)!"
        },
        {
          title: "Kerület és terület számolása",
          content: "Téglalap: K = 2 · (a + b) [mértékegység: cm, m],\nT = a · b [mértékegység: cm², m²].\nNégyzet: K = 4 · a,\nT = a · a = a².\nFigyelem: számolás előtt mindig váltsd azonos mértékegységre az oldalakat (pl. dm → cm)!"
        }
      ]}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg a téglalap és négyzet tulajdonságainak párjait!',
          description: 'Párosítsd a fogalmakat, átlókat, szimmetriát és kerület/terület képleteket 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <QuadsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a téglalap és a négyzet tulajdonságait!',
          description: 'Rendezd a geometriai állításokat közös, négyzet-specifikus és kerület/terület kategóriákba!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <QuadsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default QuadsQuiz;
