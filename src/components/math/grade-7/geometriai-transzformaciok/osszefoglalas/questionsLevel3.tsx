import React from 'react';
import { Question } from '../QuizTemplate';

export const summaryQuestionsLevel3: Question[] = [
  {
    id: 'sum-61',
    level: 3,
    question: 'Két párhuzamos egyenes (e || f) között egy töréspont található (M-alak). A két belső hegyesszög 35° és 45°. Mekkora a csúcsnál lévő beugró szög (x)?',
    options: [
      '80° (mivel a törésponton át húzott párhuzamos segítségével x = 35° + 45°)',
      '100°',
      '70°',
      '90°'
    ],
    correctAnswer: 0,
    explanation: 'Ha a törésponton keresztül meghúzzuk a két egyenessel párhuzamos segédegyenest, a váltószögek tétele miatt x két részre oszlik: x = 35° + 45° = 80°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="20" x2="140" y2="20" stroke="#0284c7" strokeWidth="2" />
        <line x1="20" y1="75" x2="140" y2="75" stroke="#0284c7" strokeWidth="2" />
        <polyline points="35,20 85,50 125,75" fill="none" stroke="#e11d48" strokeWidth="2" />
        <line x1="40" y1="50" x2="130" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
        <text x="48" y="32" className="text-[8px] font-bold fill-sky-800">35°</text>
        <text x="100" y="70" className="text-[8px] font-bold fill-sky-800">45°</text>
        <text x="92" y="52" className="text-[9px] font-black fill-rose-600">x = ?</text>
      </svg>
    )
  },
  {
    id: 'sum-62',
    level: 3,
    question: 'Egy háromszög két külső szöge 110° és 130°. Mekkora a harmadik csúcshoz tartozó külső szög, és mekkora az ottani belső szög?',
    options: [
      '120° a külső szög, és 60° a belső szög (360° - 240° = 120°, 180° - 120° = 60°)',
      '100° a külső szög, és 80° a belső szög',
      '130° a külső szög, és 50° a belső szög',
      '110° a külső szög, és 70° a belső szög'
    ],
    correctAnswer: 0,
    explanation: 'Bármely háromszög (és konvex sokszög) külső szögeinek összege 360°. A harmadik külső szög: 360° - (110° + 130°) = 120°. A vele szomszédos belső szög: 180° - 120° = 60°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,65 110,65 85,25" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
        <line x1="110" y1="65" x2="145" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
        <line x1="40" y1="65" x2="15" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
        <text x="18" y="58" className="text-[8px] font-bold fill-amber-600">110°</text>
        <text x="115" y="58" className="text-[8px] font-bold fill-amber-600">130°</text>
        <text x="75" y="20" className="text-[8px] font-black fill-rose-600">? (külső)</text>
      </svg>
    )
  },
  {
    id: 'sum-63',
    level: 3,
    question: 'Egy háromszög egyik súlyvonalának teljes hossza 18 cm. Milyen hosszú a csúcstól a súlypontig, és a súlyponttól az oldalfelező pontig tartó szakasz?',
    options: [
      '12 cm a csúcstól és 6 cm az oldalig (mivel a súlypont 2 : 1 arányban osztja a súlyvonalat)',
      '9 cm és 9 cm',
      '10 cm és 8 cm',
      '14 cm és 4 cm'
    ],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonalat a csúcstól távolodva 2 : 1 arányban osztja. Az egész súlyvonal 3 egyenlő egység: 18 / 3 = 6 cm. A hosszabb szakasz 2 · 6 = 12 cm, a rövidebb 6 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,70 130,70 70,20" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <line x1="70" y1="20" x2="80" y2="70" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="76.6" cy="53.3" r="3" fill="#dc2626" />
        <text x="82" y="53" className="text-[8px] font-black fill-rose-600">S</text>
        <text x="60" y="38" className="text-[8px] font-bold fill-purple-700">2 rész (12)</text>
        <text x="68" y="65" className="text-[8px] font-bold fill-purple-700">1 rész (6)</text>
      </svg>
    )
  },
  {
    id: 'sum-64',
    level: 3,
    question: 'Az Euler-egyenesen a magasságpont (M), a súlypont (S) és a körülírt kör középpontja (O) fekszik. Ha az SO távolság 4 cm, mekkora az MS szakasz hossza?',
    options: [
      '8 cm (mivel |MS| = 2 · |SO|)',
      '4 cm',
      '2 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'Minden nem egyenlő oldalú háromszögben az Euler-egyenesen lévő pontok aránya: |MS| = 2 · |SO|. Ezért ha |SO| = 4 cm, akkor |MS| = 2 · 4 = 8 cm (és a teljes |MO| = 12 cm).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="45" x2="140" y2="45" stroke="#0284c7" strokeWidth="2" />
        <circle cx="35" cy="45" r="3.5" fill="#dc2626" />
        <circle cx="85" cy="45" r="3.5" fill="#7c3aed" />
        <circle cx="110" cy="45" r="3.5" fill="#059669" />
        <text x="32" y="36" className="text-[9px] font-black fill-rose-600">M</text>
        <text x="82" y="36" className="text-[9px] font-black fill-purple-700">S</text>
        <text x="108" y="36" className="text-[9px] font-black fill-emerald-600">O</text>
        <text x="50" y="60" className="text-[8px] font-bold fill-slate-700">2d = 8 cm</text>
        <text x="92" y="60" className="text-[8px] font-bold fill-slate-700">d = 4 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-65',
    level: 3,
    question: 'Az AB átmérőjű félkörbe rajzolt ABC háromszög C csúcsánál derékszög van (Thálész-tétel). Ha az A csúcsnál lévő szög 32°, mekkora a B csúcsnál lévő szög?',
    options: [
      '58° (90° - 32° = 58°)',
      '68°',
      '48°',
      '148°'
    ],
    correctAnswer: 0,
    explanation: 'A Thálész-tétel alapján a kör átmérőjére illeszkedő kerületi szög derékszög (γ = 90°). A derékszögű háromszög hegyesszögeinek összege 90°, így β = 90° - 32° = 58°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <path d="M 20,70 A 60,60 0 0 1 140,70 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="20,70 140,70 65,19" fill="none" stroke="#0f172a" strokeWidth="2" />
        {/* Hungarian right angle: arc + dot */}
        <path d="M 68,26 A 8,8 0 0 1 60,24" fill="none" stroke="#dc2626" strokeWidth="1.2" />
        <circle cx="65" cy="26" r="1.2" fill="#dc2626" />
        <text x="32" y="66" className="text-[8px] font-bold fill-sky-800">32°</text>
        <text x="115" y="66" className="text-[8px] font-black fill-rose-600">β = ?</text>
      </svg>
    )
  },
  {
    id: 'sum-66',
    level: 3,
    question: 'Egy körhöz külső P pontból húzott két érintőszakasz (PE₁ és PE₂) 50°-os szöget zár be egymással. Mekkora az E₁OE₂ középponti szög (ahol O a kör középpontja)?',
    options: [
      '130° (mivel a deltoidban 360° - 90° - 90° - 50° = 130°)',
      '140°',
      '100°',
      '50°'
    ],
    correctAnswer: 0,
    explanation: 'Az érintési pontokba húzott sugarak merőlegesek az érintőkre (mindkét érintési pontnál 90°-os szög van). A PE₁OE₂ négyszög belső szögeinek összege 360°, így az O-nál lévő szög: 360° - 90° - 90° - 50° = 180° - 50° = 130°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="60" cy="45" r="30" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <circle cx="60" cy="45" r="2" fill="#0f172a" />
        <line x1="140" y1="45" x2="75" y2="19" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="140" y1="45" x2="75" y2="71" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="75" y2="19" stroke="#0284c7" strokeWidth="1.2" />
        <line x1="60" y1="45" x2="75" y2="71" stroke="#0284c7" strokeWidth="1.2" />
        {/* Hungarian right angle at E1 */}
        <path d="M 72,24 A 6,6 0 0 1 78,24" fill="none" stroke="#dc2626" strokeWidth="1" />
        <circle cx="75" cy="25" r="1" fill="#dc2626" />
        <text x="120" y="47" className="text-[8px] font-bold fill-slate-800">50°</text>
        <text x="48" y="48" className="text-[8px] font-black fill-sky-700">130°</text>
      </svg>
    )
  },
  {
    id: 'sum-67',
    level: 3,
    question: 'Hány átlója van összesen egy konvex tízszögnek (n = 10)?',
    options: [
      '35 (a képlet: 10 · (10 - 3) / 2 = 10 · 7 / 2 = 35)',
      '70',
      '45',
      '30'
    ],
    correctAnswer: 0,
    explanation: 'Egy n oldalú konvex sokszög összes átlóinak száma d = n · (n - 3) / 2. Tízszög esetén: 10 · 7 / 2 = 35.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="32" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <polygon points="80,15 99,21 110,38 110,55 99,71 80,77 61,71 50,55 50,38 61,21" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="80" y1="15" x2="110" y2="55" stroke="#c084fc" strokeWidth="1" />
        <line x1="80" y1="15" x2="99" y2="71" stroke="#c084fc" strokeWidth="1" />
        <line x1="80" y1="15" x2="80" y2="77" stroke="#c084fc" strokeWidth="1" />
        <text x="70" y="87" className="text-[8px] font-bold fill-purple-900">d = 35 átló</text>
      </svg>
    )
  },
  {
    id: 'sum-68',
    level: 3,
    question: 'Egy szabályos sokszög minden egyes belső szöge 144°. Hány oldala van a sokszögnek?',
    options: [
      '10 oldala (mivel egy külső szög 180° - 144° = 36°, és 360° / 36° = 10)',
      '8 oldala',
      '12 oldala',
      '9 oldala'
    ],
    correctAnswer: 0,
    explanation: 'A külső szög és a belső szög összege 180°, így egy külső szög 180° - 144° = 36°. A külső szögek összege mindig 360°, ezért az oldalak száma n = 360° / 36° = 10 (szabályos tízszög).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="80,18 103,25 116,45 116,63 103,81 80,88 57,81 44,63 44,45 57,25" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="70" y="55" className="text-[9px] font-black fill-emerald-800">144°</text>
      </svg>
    )
  },
  {
    id: 'sum-69',
    level: 3,
    question: 'Egy rombusz egyik belső szöge 60°, és a rövidebb átlója 8 cm. Mekkora a rombusz oldala és a kerülete?',
    options: [
      'Oldala 8 cm, kerülete 32 cm (a rövidebb átló két szabályos háromszögre bontja)',
      'Oldala 4 cm, kerülete 16 cm',
      'Oldala 16 cm, kerülete 64 cm',
      'Oldala 8 cm, kerülete 24 cm'
    ],
    correctAnswer: 0,
    explanation: 'A 60°-os szögből induló két oldal egyenlő hosszúságú (a = b). Az egyenlő szárú háromszög szárszöge 60°, így alapon fekvő szögei is (180° - 60°) / 2 = 60°-osak, tehát a háromszög szabályos! Ezért oldala = rövidebb átló = 8 cm, kerülete K = 4 · 8 = 32 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,45 80,18 120,45 80,72" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        <line x1="80" y1="18" x2="80" y2="72" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="48" y="47" className="text-[8px] font-bold fill-blue-700">60°</text>
        <text x="83" y="47" className="text-[8px] font-black fill-rose-600">8 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-70',
    level: 3,
    question: 'Egy konvex deltoid szimmetriatengelyén lévő csúcsainál a belső szögek 100° és 40°. Mekkorák a másik két, szimmetrikus csúcsnál lévő szögek?',
    options: [
      '110° és 110° ((360° - 140°) / 2 = 110°)',
      '90° és 90°',
      '120° és 120°',
      '105° és 105°'
    ],
    correctAnswer: 0,
    explanation: 'A négyszög belső szögeinek összege 360°. A szimmetria miatt a szimmetriatengelyre nem illeszkedő két szemközti szög pontosan egyenlő: β = δ = (360° - 100° - 40°) / 2 = 220° / 2 = 110°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,45 85,20 135,45 85,70" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
        <line x1="30" y1="45" x2="135" y2="45" stroke="#9a3412" strokeWidth="1" strokeDasharray="3 2" />
        <text x="36" y="47" className="text-[8px] font-bold fill-orange-900">100°</text>
        <text x="118" y="47" className="text-[8px] font-bold fill-orange-900">40°</text>
        <text x="80" y="32" className="text-[8px] font-black fill-rose-600">110°</text>
        <text x="80" y="66" className="text-[8px] font-black fill-rose-600">110°</text>
      </svg>
    )
  },
  {
    id: 'sum-71',
    level: 3,
    question: 'Egy húrtrapéz (egyenlő szárú trapéz) párhuzamos oldalai 14 cm és 6 cm, szárai pedig 5 cm hosszúak. Mekkora a trapéz magassága?',
    options: [
      '3 cm (a derékszögű háromszög befogója: x = (14-6)/2 = 4, m = √(5² - 4²) = 3 cm)',
      '4 cm',
      '5 cm',
      '2.5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hosszabb alapból a rövidebb alap vetülete után két szimmetrikus kis szakasz marad: x = (14 - 6) / 2 = 4 cm. A szár, a magasság és ez az x szakasz derékszögű háromszöget alkot: m² + 4² = 5² => m² + 16 = 25 => m² = 9 => m = 3 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="25,68 135,68 105,25 55,25" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <line x1="55" y1="25" x2="55" y2="68" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 1" />
        {/* Hungarian right angle: arc + dot */}
        <path d="M 55,60 A 8,8 0 0 1 63,68" fill="none" stroke="#dc2626" strokeWidth="1" />
        <circle cx="59" cy="64" r="1" fill="#dc2626" />
        <text x="50" y="48" className="text-[8px] font-black fill-rose-600">m=?</text>
        <text x="32" y="45" className="text-[8px] font-bold fill-slate-700">b=5</text>
        <text x="75" y="21" className="text-[8px] font-bold fill-slate-700">c=6</text>
        <text x="75" y="78" className="text-[8px] font-bold fill-slate-700">a=14</text>
      </svg>
    )
  },
  {
    id: 'sum-72',
    level: 3,
    question: 'Egy háromszög két oldala 7 cm és 11 cm. Melyik intervallumba eshet a harmadik oldal (c) hossza cm-ben?',
    options: [
      '4 cm < c < 18 cm (mivel 11 - 7 < c < 11 + 7)',
      '7 cm < c < 11 cm',
      '0 cm < c < 18 cm',
      '4 cm ≤ c ≤ 18 cm'
    ],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség szerint bármely oldal nagyobb a másik kettő különbségénél, és kisebb az összegüknél: 11 - 7 < c < 11 + 7, vagyis 4 cm < c < 18 cm (szigorú egyenlőtlenség, különben a három pont egy egyenesre esne).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,65 130,65 75,25" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="44" y="40" className="text-[9px] font-bold fill-rose-700">7 cm</text>
        <text x="105" y="40" className="text-[9px] font-bold fill-rose-700">11 cm</text>
        <text x="72" y="77" className="text-[9px] font-black fill-slate-800">4 &lt; c &lt; 18</text>
      </svg>
    )
  },
  {
    id: 'sum-73',
    level: 3,
    question: 'Hol helyezkedik el egy tompaszögű háromszög magasságpontja (M) és a köré írt kör középpontja (O)?',
    options: [
      'Mindkét nevezetes pont a háromszög területén kívül található',
      'Mindkettő a háromszög belsejében található',
      'M a belsejében van, O pedig kívül',
      'M az egyik oldal felezőpontjára esik'
    ],
    correctAnswer: 0,
    explanation: 'Tompaszögű háromszög esetén a magasságvonalak csak a meghosszabbításukban metszik egymást (a tompaszög csúcsa mögött, a háromszögön kívül), és az oldalfelező merőlegesek metszéspontja (a körülírt kör középpontja, O) is a háromszögön kívülre esik.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="50,65 130,65 70,45" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
        <circle cx="35" cy="20" r="3" fill="#dc2626" />
        <circle cx="85" cy="85" r="3" fill="#0284c7" />
        <text x="25" y="18" className="text-[9px] font-black fill-rose-600">M (kívül)</text>
        <text x="92" y="87" className="text-[9px] font-black fill-sky-700">O (kívül)</text>
      </svg>
    )
  },
  {
    id: 'sum-74',
    level: 3,
    question: 'Egy alakzatot egymás után tükrözünk két olyan tengelyre (t₁ és t₂), amelyek 40°-os szöget zárnak be és az O pontban metszik egymást. Milyen egyetlen transzformációval egyenértékű ez az összetett mozgás?',
    options: [
      'Az O pont körüli 80°-os forgatással (2 · 40° = 80°)',
      'Az O pont körüli 40°-os forgatással',
      'Tengelyes tükrözéssel a szögfelezőre',
      '8 cm-es párhuzamos eltolással'
    ],
    correctAnswer: 0,
    explanation: 'Két metsző tengelyre történő egymás utáni tükrözés eredője mindig egy pont körüli forgatás a metszéspont (O) körül, a forgásszög pedig pontosan a tengelyek által bezárt szög kétszerese: 2 · 40° = 80°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="80" x2="130" y2="20" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="30" y1="20" x2="130" y2="80" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="2.5" fill="#0f172a" />
        <path d="M 95,41 A 20,20 0 0 1 95,59" fill="none" stroke="#ea580c" strokeWidth="1.5" />
        <text x="100" y="52" className="text-[8px] font-bold fill-orange-700">40°</text>
        <text x="65" y="85" className="text-[8px] font-black fill-slate-800">Forgatás = 2 · 40° = 80°</text>
      </svg>
    )
  },
  {
    id: 'sum-75',
    level: 3,
    question: 'Egy alakzatot egymás után tükrözünk két egymással párhuzamos, d = 3 cm távolságra lévő egyenesre (t₁ || t₂). Milyen egyetlen transzformáció helyettesíti a két tükrözést?',
    options: [
      'A tengelyekre merőleges irányú, 6 cm hosszúságú párhuzamos eltolás (2 · 3 cm = 6 cm)',
      '3 cm-es párhuzamos eltolás',
      'Középpontos tükrözés',
      '90°-os forgatás'
    ],
    correctAnswer: 0,
    explanation: 'Két párhuzamos tengelyre való egymás utáni tükrözés mindig egyenes vonalú párhuzamos eltolást eredményez, amelynek nagysága a tengelyek távolságának kétszerese (2 · d = 2 · 3 = 6 cm), iránya pedig a tengelyekre merőleges.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="55" y1="15" x2="55" y2="75" stroke="#059669" strokeWidth="2" />
        <line x1="105" y1="15" x2="105" y2="75" stroke="#059669" strokeWidth="2" />
        <line x1="55" y1="45" x2="105" y2="45" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
        <text x="73" y="40" className="text-[8px] font-bold fill-emerald-800">d = 3 cm</text>
        <path d="M 35,50 L 125,50" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="50" y="85" className="text-[8px] font-black fill-rose-600">Eltolás: v = 2 · 3 = 6 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-76',
    level: 3,
    question: 'Egy alakzatot egy rögzített O pont körül 90°-kal elforgatunk. Mekkora szöget zár be bármely eredeti egyenes a képével (ha azok metszik egymást)?',
    options: [
      'Pontosan 90°-ot (a forgatás szöge megegyezik az irányok elfordulásával)',
      '45°-ot',
      '180°-ot',
      'Nem állandó, függ az egyenes helyzetétől'
    ],
    correctAnswer: 0,
    explanation: 'Az elforgatás iránytartó és szögtartó transzformáció: minden egyenes pontosan a forgásszöggel (itt 90°-kal) fordul el az eredeti irányához képest. Ezért bármely egyenes és annak elforgatott képe egymásra merőleges (90°-os szöget zárnak be).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="65" x2="110" y2="65" stroke="#2563eb" strokeWidth="2" />
        <line x1="70" y1="20" x2="70" y2="85" stroke="#dc2626" strokeWidth="2" />
        {/* Hungarian right angle: arc + dot */}
        <path d="M 70,55 A 10,10 0 0 1 80,65" fill="none" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="75" cy="60" r="1.5" fill="#0f172a" />
        <text x="85" y="45" className="text-[9px] font-black fill-slate-800">90°</text>
      </svg>
    )
  },
  {
    id: 'sum-77',
    level: 3,
    question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm (átfogója 10 cm). Mekkora a köré írt kör sugara (R), és mekkora az átfogóhoz tartozó súlyvonal (s_c)?',
    options: [
      'R = 5 cm és s_c = 5 cm (mivel az átfogó felezőpontja a körülírt kör középpontja)',
      'R = 10 cm és s_c = 5 cm',
      'R = 5 cm és s_c = 4.8 cm',
      'R = 7 cm és s_c = 3.5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A Thálész-tétel értelmében derékszögű háromszögben a körülírt kör átmérője maga az átfogó (c = 10 cm), így a sugár R = c / 2 = 5 cm. Mivel a C derékszögű csúcs is a körön van, a felezőponttól (a kör középpontjától) való távolsága éppen a kör sugara: s_c = R = 5 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,68 130,68 30,20" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        {/* Hungarian right angle at (30,68): arc + dot */}
        <path d="M 30,58 A 10,10 0 0 1 40,68" fill="none" stroke="#dc2626" strokeWidth="1.2" />
        <circle cx="34" cy="64" r="1.2" fill="#dc2626" />
        <line x1="30" y1="68" x2="80" y2="44" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="80" cy="44" r="2.5" fill="#7c3aed" />
        <text x="85" y="42" className="text-[8px] font-bold fill-purple-700">F felezőpont</text>
        <text x="48" y="52" className="text-[8px] font-black fill-purple-700">s_c = 5 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-78',
    level: 3,
    question: 'Egy háromszög oldalai a = 8 cm, b = 10 cm, c = 12 cm. Milyen távol van az A csúcstól a beírt kör érintési pontja az AB és AC oldalakon?',
    options: [
      '7 cm (a képlet: x = s - a = 15 - 8 = 7 cm, ahol s = (8+10+12)/2 = 15 cm)',
      '5 cm',
      '6 cm',
      '8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A félkerület s = (a + b + c) / 2 = 30 / 2 = 15 cm. Egy csúcsból a beírt körhöz húzott érintőszakaszok hossza megegyezik a félkerület és a szemközti oldal különbségével: x_A = s - a = 15 - 8 = 7 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,70 130,70 75,20" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="78" cy="50" r="20" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="78" cy="50" r="2" fill="#059669" />
        <text x="35" y="45" className="text-[8px] font-bold fill-amber-900">x = 7</text>
        <text x="50" y="77" className="text-[8px] font-bold fill-amber-900">x = 7</text>
      </svg>
    )
  },
  {
    id: 'sum-79',
    level: 3,
    question: 'Megszerkeszthető-e a háromszög, ha adott a = 4 cm, b = 10 cm és a-val szemközti szög α = 30°?',
    options: [
      'Nem, mert a magasság m = b · sin(30°) = 5 cm lenne, és az a = 4 cm oldal túl rövid, el sem éri a harmadik oldalt',
      'Igen, pontosan 1 megoldás van',
      'Igen, pontosan 2 megoldás van',
      'Csak akkor, ha tompaszögű'
    ],
    correctAnswer: 0,
    explanation: 'A C csúcs távolsága a c oldal egyenesétől m = b · sin(30°) = 10 · 0,5 = 5 cm. Mivel a = 4 cm < 5 cm, a C középpontú 4 cm sugarú körív nem metszi az alap egyenesét, így nincs megoldás!',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="70" x2="140" y2="70" stroke="#64748b" strokeWidth="1.5" />
        <line x1="35" y1="70" x2="105" y2="30" stroke="#0284c7" strokeWidth="2" />
        <line x1="105" y1="30" x2="105" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <path d="M 85,50 A 24,24 0 0 0 125,50" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="45" y="65" className="text-[8px] font-bold fill-sky-800">30°</text>
        <text x="110" y="52" className="text-[8px] font-bold fill-slate-500">m = 5</text>
        <text x="80" y="38" className="text-[8px] font-black fill-rose-600">a = 4 (el sem éri!)</text>
      </svg>
    )
  },
  {
    id: 'sum-80',
    level: 3,
    question: 'Mikor ad egy háromszög szerkesztése (adott a, b és az a-val szemközti hegyesszög, α) pontosan KÉT, egymással nem egybevágó megoldást?',
    options: [
      'Ha a magasságnál hosszabb, de b-nél rövidebb az a oldal (m_b < a < b)',
      'Ha a > b',
      'Ha a = b',
      'Ha α derékszög'
    ],
    correctAnswer: 0,
    explanation: 'Ha α hegyesszög és m < a < b, akkor a C középpontú, a sugarú körív az A pontból induló szár egyenesét két különböző pontban (B₁ és B₂) metszi az A-tól azonos oldalon, így két különböző háromszög jön létre.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="20" y1="70" x2="145" y2="70" stroke="#64748b" strokeWidth="1.5" />
        <line x1="30" y1="70" x2="90" y2="25" stroke="#0284c7" strokeWidth="2" />
        <line x1="90" y1="25" x2="70" y2="70" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="90" y1="25" x2="115" y2="70" stroke="#dc2626" strokeWidth="1.5" />
        <text x="63" y="78" className="text-[8px] font-black fill-rose-600">B₁</text>
        <text x="115" y="78" className="text-[8px] font-black fill-rose-600">B₂</text>
        <text x="40" y="45" className="text-[8px] font-bold fill-sky-800">b</text>
        <text x="80" y="55" className="text-[8px] font-bold fill-rose-600">a</text>
      </svg>
    )
  },
  {
    id: 'sum-81',
    level: 3,
    question: 'Egy ABCD paralelogramma A csúcsából induló belső szögfelezője a BC oldalt egy E pontban metszi. Ha AB = 7 cm és AD = 11 cm, mekkora a BE és EC szakaszok hossza?',
    options: [
      'BE = 7 cm és EC = 4 cm (az ABE háromszög egyenlő szárú a váltószögek miatt)',
      'BE = 5.5 cm és EC = 5.5 cm',
      'BE = 4 cm és EC = 7 cm',
      'BE = 8 cm és EC = 3 cm'
    ],
    correctAnswer: 0,
    explanation: 'A szögfelező miatt BAE∠ = EAD∠. Mivel AD || BC, váltószögként EAD∠ = BEA∠. Így az ABE háromszögben BAE∠ = BEA∠, tehát az ABE háromszög egyenlő szárú, és BE = AB = 7 cm. Mivel BC = AD = 11 cm, EC = 11 - 7 = 4 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="25,68 115,68 135,25 45,25" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <line x1="25" y1="68" x2="80" y2="25" stroke="#7c3aed" strokeWidth="2" />
        <text x="48" y="76" className="text-[8px] font-bold fill-slate-700">AB = 7</text>
        <text x="50" y="40" className="text-[8px] font-black fill-purple-700">BE = 7</text>
        <text x="105" y="22" className="text-[8px] font-bold fill-slate-700">EC = 4</text>
      </svg>
    )
  },
  {
    id: 'sum-82',
    level: 3,
    question: 'Egy trapéz párhuzamos oldalai a = 18 cm és c = 10 cm. Milyen hosszú a középvonal (k), és milyen hosszú az a szakasz (x), amelyet az átlók vágnak ki a középvonalból?',
    options: [
      'k = 14 cm és x = 4 cm (k = (a + c) / 2 = 14, x = (a - c) / 2 = 4 cm)',
      'k = 14 cm és x = 5 cm',
      'k = 15 cm és x = 4 cm',
      'k = 12 cm és x = 2 cm'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz középvonala az alapok számtani közepe: k = (18 + 10) / 2 = 14 cm. Az átlók által kivágott szakasz az alapok különbségének fele: x = (a - c) / 2 = (18 - 10) / 2 = 4 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="20,68 140,68 110,25 50,25" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" />
        <line x1="35" y1="46.5" x2="125" y2="46.5" stroke="#059669" strokeWidth="2" />
        <line x1="20" y1="68" x2="110" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <line x1="140" y1="68" x2="50" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        <text x="70" y="43" className="text-[8px] font-black fill-emerald-700">x = 4 cm</text>
        <text x="70" y="21" className="text-[8px] font-bold fill-slate-700">c = 10</text>
        <text x="70" y="78" className="text-[8px] font-bold fill-slate-700">a = 18</text>
      </svg>
    )
  },
  {
    id: 'sum-83',
    level: 3,
    question: 'Egy r = 10 cm sugarú körben egy húr hossza h = 16 cm. Milyen távol van a húr a kör középpontjától?',
    options: [
      '6 cm (a felezőpont távolsága d = √(10² - 8²) = √(100 - 64) = 6 cm)',
      '8 cm',
      '4 cm',
      '7 cm'
    ],
    correctAnswer: 0,
    explanation: 'A középpontból a húrra bocsátott merőleges felezi a húrt (fele: 16 / 2 = 8 cm). A kör sugara (10 cm), a húr fele (8 cm) és a távolság (d) derékszögű háromszöget alkotnak: d² + 8² = 10² => d² = 100 - 64 = 36 => d = 6 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="35" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <line x1="50" y1="67" x2="110" y2="67" stroke="#2563eb" strokeWidth="2" />
        <line x1="80" y1="45" x2="80" y2="67" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="80" y1="45" x2="110" y2="67" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        {/* Hungarian right angle: arc + dot */}
        <path d="M 80,61 A 6,6 0 0 1 86,67" fill="none" stroke="#dc2626" strokeWidth="1" />
        <circle cx="83" cy="64" r="1" fill="#dc2626" />
        <circle cx="80" cy="45" r="2" fill="#0f172a" />
        <text x="83" y="58" className="text-[8px] font-black fill-rose-600">d = 6</text>
        <text x="96" y="54" className="text-[7px] font-bold fill-slate-500">r = 10</text>
        <text x="75" y="77" className="text-[8px] font-bold fill-blue-700">16 cm</text>
      </svg>
    )
  },
  {
    id: 'sum-84',
    level: 3,
    question: 'Egy négyszögbe kör írható (érintőnégyszög). Három egymást követő oldala sorban a = 7 cm, b = 11 cm és c = 13 cm. Mekkora a negyedik oldal (d)?',
    options: [
      '9 cm (a + c = b + d alapján: 7 + 13 = 11 + d => 20 = 11 + d => d = 9 cm)',
      '10 cm',
      '8 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'Érintőnégyszög esetén a szemközti oldalak összege egyenlő: a + c = b + d. Behelyettesítve: 7 + 13 = 11 + d => 20 = 11 + d => d = 9 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="35,68 125,68 115,22 45,25" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.5" />
        <circle cx="78" cy="46" r="21" fill="none" stroke="#be185d" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="75" y="78" className="text-[8px] font-bold fill-pink-900">a = 7</text>
        <text x="123" y="47" className="text-[8px] font-bold fill-pink-900">b = 11</text>
        <text x="75" y="20" className="text-[8px] font-bold fill-pink-900">c = 13</text>
        <text x="25" y="47" className="text-[8px] font-black fill-rose-600">d = ?</text>
      </svg>
    )
  },
  {
    id: 'sum-85',
    level: 3,
    question: 'Egy körbe írt négyszög (húrnégyszög) két egymást követő szöge α = 75° és β = 115°. Mekkora a másik két szög (γ és δ)?',
    options: [
      'γ = 105° és δ = 65° (mivel a szemközti szögek összege 180°)',
      'γ = 115° és δ = 75°',
      'γ = 95° és δ = 75°',
      'γ = 105° és δ = 85°'
    ],
    correctAnswer: 0,
    explanation: 'Húrnégyszögben a szemközti szögek összege mindig 180°: α + γ = 180° => γ = 180° - 75° = 105°, és β + δ = 180° => δ = 180° - 115° = 65°.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <circle cx="80" cy="45" r="33" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
        <polygon points="52,30 108,30 110,60 55,68" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="56" y="38" className="text-[7px] font-bold fill-blue-900">75°</text>
        <text x="96" y="38" className="text-[7px] font-bold fill-blue-900">115°</text>
        <text x="96" y="58" className="text-[7px] font-black fill-rose-600">105°</text>
        <text x="58" y="64" className="text-[7px] font-black fill-rose-600">65°</text>
      </svg>
    )
  },
  {
    id: 'sum-86',
    level: 3,
    question: 'Mekkora egy szabályos nyolcszög (n = 8) egy belső szöge, és egyetlen csúcsból hány átló húzható?',
    options: [
      'Belső szöge 135°, és egy csúcsból 5 átló húzható ((8-2)·180°/8 = 135°, 8 - 3 = 5)',
      'Belső szöge 120°, és egy csúcsból 5 átló húzható',
      'Belső szöge 135°, és egy csúcsból 8 átló húzható',
      'Belső szöge 140°, és egy csúcsból 4 átló húzható'
    ],
    correctAnswer: 0,
    explanation: 'Egy csúcsból n - 3 átló húzható (önmagába és a két szomszédos csúcsba nem húzható átló), azaz 8 - 3 = 5 átló. A belső szögek összege (8 - 2) · 180° = 1080°, egy belső szög pedig 1080° / 8 = 135° (vagy külső szög 360°/8 = 45°, 180° - 45° = 135°).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="65,18 95,18 116,39 116,69 95,85 65,85 44,69 44,39" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="44" y1="39" x2="95" y2="18" stroke="#a78bfa" strokeWidth="1" />
        <line x1="44" y1="39" x2="116" y2="39" stroke="#a78bfa" strokeWidth="1" />
        <line x1="44" y1="39" x2="116" y2="69" stroke="#a78bfa" strokeWidth="1" />
        <line x1="44" y1="39" x2="95" y2="85" stroke="#a78bfa" strokeWidth="1" />
        <line x1="44" y1="39" x2="65" y2="85" stroke="#a78bfa" strokeWidth="1" />
        <text x="68" y="55" className="text-[9px] font-black fill-purple-900">135° (5 átló)</text>
      </svg>
    )
  },
  {
    id: 'sum-87',
    level: 3,
    question: 'A háromszög három súlyvonala a háromszöget 6 kisebb részre osztja. Mi mondható el ezen 6 kis háromszög területéről?',
    options: [
      'Mind a 6 kis háromszög területe pontosan egyenlő (mindegyik T / 6)',
      'Csak a páronként szomszédosak egyenlők',
      'A területek a súlyvonalak hosszától függően különbözőek',
      'A három csúcs felőli háromszög kétszer akkora, mint a másik három'
    ],
    correctAnswer: 0,
    explanation: 'Mivel minden súlyvonal felezi az eredeti háromszög területét, és a súlypont 2 : 1 arányban osztja a súlyvonalakat, az elemi geometriai számítás igazolja, hogy a 6 kis háromszög területe mind pontosan az eredeti terület 1/6-od része.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="30,72 130,72 75,18" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        <line x1="75" y1="18" x2="80" y2="72" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="30" y1="72" x2="102.5" y2="45" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="130" y1="72" x2="52.5" y2="45" stroke="#dc2626" strokeWidth="1.2" />
        <circle cx="78.3" cy="54" r="2.5" fill="#0f172a" />
        <text x="72" y="50" className="text-[7px] font-bold fill-slate-700">T/6</text>
        <text x="86" y="50" className="text-[7px] font-bold fill-slate-700">T/6</text>
        <text x="80" y="66" className="text-[7px] font-bold fill-slate-700">T/6</text>
      </svg>
    )
  },
  {
    id: 'sum-88',
    level: 3,
    question: 'Mi azon pontok mértani helye a síkban, amelyek egy adott A és B ponttól egyenlő távolságra vannak (|PA| = |PB|)?',
    options: [
      'Az AB szakasz felezőmerőlegese',
      'Az AB átmérőjű Thálész-kör',
      'Az AB szakasz felezőpontja egyedül',
      'Két párhuzamos egyenes'
    ],
    correctAnswer: 0,
    explanation: 'A szakaszfelező merőleges definíció szerint azon pontok halmaza a síkban, amelyek a szakasz két végpontjától (A-tól és B-től) egyenlő távolságra vannak.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <line x1="30" y1="45" x2="130" y2="45" stroke="#0284c7" strokeWidth="2" />
        <line x1="80" y1="15" x2="80" y2="75" stroke="#dc2626" strokeWidth="2" />
        <circle cx="30" cy="45" r="2.5" fill="#0284c7" />
        <circle cx="130" cy="45" r="2.5" fill="#0284c7" />
        {/* Hungarian right angle: arc + dot */}
        <path d="M 80,38 A 7,7 0 0 1 87,45" fill="none" stroke="#dc2626" strokeWidth="1.2" />
        <circle cx="83.5" cy="41.5" r="1" fill="#dc2626" />
        <text x="24" y="47" className="text-[8px] font-bold fill-sky-800">A</text>
        <text x="134" y="47" className="text-[8px] font-bold fill-sky-800">B</text>
        <text x="84" y="25" className="text-[8px] font-black fill-rose-600">f_AB</text>
      </svg>
    )
  },
  {
    id: 'sum-89',
    level: 3,
    question: 'Egy derékszögű háromszög átfogója c = 25 cm, befogói a = 15 cm és b = 20 cm. Mekkora az átfogóhoz tartozó magasság (m_c)?',
    options: [
      '12 cm (a terület kétféle felírásából: a · b = c · m_c => 15 · 20 = 25 · m_c => m_c = 12 cm)',
      '10 cm',
      '14 cm',
      '9.6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög területe kiszámítható a két befogó szorzatának felével: T = (15 · 20) / 2 = 150 cm², illetve az átfogó és a magasság szorzatának felével: T = (25 · m_c) / 2. Így 25 · m_c = 300 => m_c = 300 / 25 = 12 cm.',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="25,68 135,68 64.6,15.2" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        {/* Hungarian right angle at top vertex */}
        <path d="M 68,23 A 8,8 0 0 1 60,22" fill="none" stroke="#0f172a" strokeWidth="1" />
        <circle cx="64" cy="23" r="1" fill="#0f172a" />
        <line x1="64.6" y1="15.2" x2="64.6" y2="68" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 1" />
        {/* Hungarian right angle at altitude foot: arc + dot */}
        <path d="M 64.6,60 A 8,8 0 0 1 72.6,68" fill="none" stroke="#dc2626" strokeWidth="1" />
        <circle cx="68.6" cy="64" r="1" fill="#dc2626" />
        <text x="68" y="45" className="text-[8px] font-black fill-rose-600">m_c = 12</text>
        <text x="75" y="78" className="text-[8px] font-bold fill-slate-700">c = 25</text>
      </svg>
    )
  },
  {
    id: 'sum-90',
    level: 3,
    question: 'Egy szabályos háromszög magassága m = 12 cm. Mekkora a beírt körének sugara (r) és a köré írt körének sugara (R)?',
    options: [
      'r = 4 cm és R = 8 cm (mivel szabályos háromszögben m = 3 · r, és R = 2 · r)',
      'r = 6 cm és R = 6 cm',
      'r = 3 cm és R = 9 cm',
      'r = 4 cm és R = 12 cm'
    ],
    correctAnswer: 0,
    explanation: 'Szabályos háromszögben minden nevezetes pont egybeesik a súlyponttal. A súlypont a magasságvonalat 2 : 1 arányban osztja: a csúcs felőli rész a köré írt kör sugara (R = 2/3 · 12 = 8 cm), az oldal felőli rész pedig a beírt kör sugara (r = 1/3 · 12 = 4 cm).',
    figure: (
      <svg viewBox="0 0 160 90" className="w-36 h-20 mx-auto">
        <polygon points="40,75 120,75 80,15" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <circle cx="80" cy="55" r="20" fill="none" stroke="#15803d" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="80" cy="55" r="40" fill="none" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="80" cy="55" r="2.5" fill="#dc2626" />
        <line x1="80" y1="15" x2="80" y2="75" stroke="#dc2626" strokeWidth="1.5" />
        <text x="85" y="40" className="text-[8px] font-bold fill-sky-700">R = 8</text>
        <text x="85" y="68" className="text-[8px] font-bold fill-emerald-700">r = 4</text>
      </svg>
    )
  }
];
