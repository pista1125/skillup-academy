import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConstructionsMeasurementsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Derékszögű Háromszög Elemei és Tulajdonságai',
    subtitle: 'Sorold be a geometriai fogalmakat, adatokat és képleteket a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-legs',
        name: 'Befogók (a és b)',
        description: 'A derékszöget (90°) közrefogó két rövidebb oldal jellemzői',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-hypo',
        name: 'Átfogó (c)',
        description: 'A 90°-os szöggel szemközti, mindig leghosszabb oldal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-angles-props',
        name: 'Szögek és Különleges Vonalak',
        description: 'Belső szögek, magasság, súlyvonal és körülírt kör',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Közrefogják a 90°-os derékszöget',
        category: 'cat-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polyline points="20,8 20,36 65,36" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Magyar derékszög jelölés: negyedkörív és pont */}
            <path d="M 20 27 A 9 9 0 0 1 29 36" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="24" cy="32" r="1.2" fill="#f59e0b" />
            <text x="14" y="24" className="text-[7px] font-bold fill-amber-700">b</text>
            <text x="42" y="42" className="text-[7px] font-bold fill-amber-700">a</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'A derékszögű csúccsal (C) szemben fekszik',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="20,8 20,36 65,36" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
            <path d="M 20 28 A 8 8 0 0 1 28 36" fill="none" stroke="#10b981" strokeWidth="1.2" />
            <circle cx="23.5" cy="32.5" r="1" fill="#10b981" />
            <line x1="20" y1="8" x2="65" y2="36" stroke="#059669" strokeWidth="2.5" />
            <text x="44" y="20" className="text-[7.5px] font-extrabold fill-emerald-800">c (átfogó)</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'A háromszög mindkét hegyesszögének összege: α + β = 90°',
        category: 'cat-angles-props',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="20,10 20,36 60,36" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M 20 28 A 8 8 0 0 1 28 36" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="23.5" cy="32.5" r="1" fill="#6366f1" />
            <text x="25" y="20" className="text-[6.5px] font-bold fill-indigo-700">α</text>
            <text x="48" y="33" className="text-[6.5px] font-bold fill-indigo-700">β</text>
            <text x="40" y="16" className="text-[6px] font-bold fill-indigo-900">α+β=90°</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Szorzatuk fele adja meg a háromszög területét: T = (a · b) / 2',
        category: 'cat-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="20" y="12" width="40" height="24" fill="#fef3c7" stroke="#d97706" strokeDasharray="2 2" strokeWidth="1" />
            <polygon points="20,12 20,36 60,36" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <path d="M 20 28 A 8 8 0 0 1 28 36" fill="none" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="23.5" cy="32.5" r="1" fill="#d97706" />
            <text x="40" y="26" className="text-[7px] font-extrabold fill-amber-900">T=(a·b)/2</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Mindig a háromszög leghosszabb oldala (c > a és c > b)',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">c &gt; a  és  c &gt; b</text>
            <text x="40" y="34" className="text-[6px] fill-slate-500" textAnchor="middle">leghosszabb oldal</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'A körülírt körének középpontja az átfogó felezőpontja',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="42" cy="22" r="18" fill="none" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="24" y1="22" x2="60" y2="22" stroke="#059669" strokeWidth="2" />
            <circle cx="42" cy="22" r="2.5" fill="#047857" />
            <text x="42" y="18" className="text-[6px] font-bold fill-emerald-900" textAnchor="middle">Felezőpont = O</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Egymásra merőleges egyenesek mentén fekszenek',
        category: 'cat-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="15" y1="36" x2="65" y2="36" stroke="#b45309" strokeWidth="1.5" />
            <line x1="30" y1="8" x2="30" y2="40" stroke="#b45309" strokeWidth="1.5" />
            {/* Magyar derékszög jelölés: negyedkörív és pont */}
            <path d="M 30 27 A 9 9 0 0 1 39 36" fill="none" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="34" cy="32" r="1.2" fill="#b45309" />
            <text x="48" y="24" className="text-[6.5px] font-bold fill-amber-800">90°-os szög</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Köré írható kör sugara pontosan a fele: R = c / 2',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="20" className="text-[8.5px] font-black fill-emerald-800" textAnchor="middle">R = c / 2</text>
            <text x="40" y="32" className="text-[6px] fill-emerald-600" textAnchor="middle">átfogó fele = sugár</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'A derékszögű csúcsból induló súlyvonal hossza: sc = c / 2',
        category: 'cat-angles-props',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="18,12 18,36 62,36" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M 18 28 A 8 8 0 0 1 26 36" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="21.5" cy="32.5" r="1" fill="#6366f1" />
            <line x1="18" y1="36" x2="40" y2="24" stroke="#4f46e5" strokeWidth="2" strokeDasharray="2 1" />
            <circle cx="40" cy="24" r="2" fill="#4338ca" />
            <text x="24" y="28" className="text-[6.5px] font-bold fill-indigo-700">sc = c/2</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Ezekre emelt négyzetek területe: Ta = a² és Tb = b²',
        category: 'cat-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="10" y="18" width="16" height="16" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <rect x="28" y="24" width="22" height="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="18" y="28" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">a²</text>
            <text x="39" y="31" className="text-[6px] font-bold fill-amber-900" textAnchor="middle">b²</text>
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Rá emelt négyzet területe: Tc = c² (egyenlő Ta + Tb-vel)',
        category: 'cat-hypo',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="26" y="8" width="28" height="28" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <text x="40" y="24" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">Tc = c²</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Az átfogóhoz tartozó magasságvonal: mc = (a · b) / c',
        category: 'cat-angles-props',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="18,10 18,36 62,36" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <path d="M 18 28 A 8 8 0 0 1 26 36" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="21.5" cy="32.5" r="1" fill="#6366f1" />
            <line x1="18" y1="36" x2="35" y2="19" stroke="#4338ca" strokeWidth="2" />
            <text x="32" y="32" className="text-[6.5px] font-bold fill-indigo-800">mc=(a·b)/c</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szerkesztési Esetek és Eljárások',
    subtitle: 'Csoportosítsd a szerkesztési lépéseket és tulajdonságokat a megadott esetek szerint!',
    categories: [
      {
        id: 'cat-two-legs',
        name: 'Két Befogóból (a, b)',
        description: 'Derékszög felvétele, a két befogó kimérése a szárakra',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-hypo-leg',
        name: 'Átfogóból és Befogóból (c, a)',
        description: 'Befogó és derékszög után körívvel való metszés az átfogó hosszával',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-thales',
        name: 'Thálész-tételes Szerkesztés',
        description: 'Átfogó fölé rajzolt Thálész-félkör és magasságvonal vagy szög metszése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: 'A C csúcsban derékszöget állítunk, száraira felmérjük az a és b szakaszokat',
        category: 'cat-two-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polyline points="20,10 20,34 60,34" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 20 26 A 8 8 0 0 1 28 34" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="23.5" cy="30.5" r="1.1" fill="#f59e0b" />
            <text x="14" y="22" className="text-[6.5px] font-bold fill-amber-700">b</text>
            <text x="40" y="40" className="text-[6.5px] font-bold fill-amber-700">a</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: 'A felmért a befogó B végpontjából c sugarú körívet húzunk',
        category: 'cat-hypo-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <path d="M 55 10 A 30 30 0 0 0 25 36" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="55" cy="36" r="2" fill="#0369a1" />
            <text x="48" y="24" className="text-[6px] font-bold fill-sky-800">r = c körív</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Az AB szakasz mint átmérő fölé félkört (Thálész-kört) rajzolunk',
        category: 'cat-thales',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <path d="M 15 36 A 25 25 0 0 1 65 36" fill="none" stroke="#9333ea" strokeWidth="2" />
            <line x1="15" y1="36" x2="65" y2="36" stroke="#9333ea" strokeWidth="1.5" />
            <text x="40" y="26" className="text-[6px] font-bold fill-purple-900" textAnchor="middle">Thálész-kör</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Az átfogó (c) a két felmért végpont (A és B) összekötésével keletkezik',
        category: 'cat-two-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="20" y1="12" x2="60" y2="34" stroke="#d97706" strokeWidth="2.5" />
            <circle cx="20" cy="12" r="2" fill="#b45309" />
            <circle cx="60" cy="34" r="2" fill="#b45309" />
            <text x="42" y="20" className="text-[6.5px] font-bold fill-amber-900">A és B kötése</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'A C csúcsból emelt merőleges egyenes és a c sugarú körív metszéspontja adja A-t',
        category: 'cat-hypo-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="25" y1="8" x2="25" y2="36" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 55 12 A 32 32 0 0 0 25 20" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
            <circle cx="25" cy="20" r="2.5" fill="#0369a1" />
            <text x="30" y="22" className="text-[6.5px] font-black fill-sky-900">Metszés = A</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Átfogóval párhuzamos egyenest húzunk mc távolságra a Thálész-kör metszéséhez',
        category: 'cat-thales',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="10" y1="20" x2="70" y2="20" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M 15 36 A 25 25 0 0 1 65 36" fill="none" stroke="#6b21a8" strokeWidth="1.5" />
            <circle cx="27" cy="20" r="2" fill="#7e22ce" />
            <text x="50" y="16" className="text-[6px] font-bold fill-purple-900">p || c (mc távolság)</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: 'A szerkesztés lényegében egy téglalap két szomszédos oldalának és átlójának felvétele',
        category: 'cat-two-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="20" y="12" width="40" height="22" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="20" y1="12" x2="60" y2="34" stroke="#d97706" strokeWidth="1.8" />
            <text x="40" y="25" className="text-[6px] fill-amber-800" textAnchor="middle">téglalap átlója</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Csak akkor van megoldás, ha az átfogó szigorúan hosszabb a megadott befogónál: c > a',
        category: 'cat-hypo-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-sky-800" textAnchor="middle">Feltétel: c &gt; a</text>
            <text x="40" y="34" className="text-[5.5px] fill-slate-500" textAnchor="middle">különben nincs metszéspont</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Csak akkor van derékszögű háromszög, ha a magasság nem nagyobb az átfogó felénél: mc ≤ c / 2',
        category: 'cat-thales',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="22" className="text-[8px] font-black fill-purple-900" textAnchor="middle">mc ≤ c / 2</text>
            <text x="40" y="33" className="text-[6px] fill-purple-700" textAnchor="middle">sugarat nem haladhatja meg</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'A két befogó hosszától függetlenül mindig pontosan 1 egybevágó háromszög szerkeszthető',
        category: 'cat-two-legs',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-900" textAnchor="middle">Mindig létezik</text>
            <text x="40" y="34" className="text-[6px] fill-slate-500" textAnchor="middle">egyértelmű megoldás</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: 'A derékszögű szárat a B-ből indított körív egyetlen pozitív félkörbe eső pontban metszi',
        category: 'cat-hypo-leg',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="35" cy="20" r="2.5" fill="#0284c7" />
            <text x="40" y="32" className="text-[6px] font-bold fill-sky-900" textAnchor="middle">1 db metszéspont</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Ha mc = c / 2, akkor a kapott derékszögű háromszög egyenlő szárú is (α = β = 45°)',
        category: 'cat-thales',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="18,34 40,12 62,34" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="40" y="28" className="text-[6px] font-bold fill-purple-900" textAnchor="middle">45° - 45° - 90°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Területi és Geometriai Állítások Vizsgálata',
    subtitle: 'Döntsd el, hogy az állítások mindig igazak, csak speciális derékszögű háromszögre igazak, vagy hibásak!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Minden Derékszögű Háromszögre Igaz',
        description: 'Univerzális geometriai törvény a derékszögű háromszögek világában',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-special-case',
        name: 'Csak Egyenlő Szárú Derékszögűre Igaz',
        description: 'Kizárólag akkor teljesül, ha a két befogó egyenlő hosszú (a = b, α = β = 45°)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-false',
        name: 'Soha Nem Igaz / Geometriai Hiba',
        description: 'Matematikai tévedés, háromszög-egyenlőtlenséget sért vagy hamis állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'A két befogóra rajzolt négyzet területének összege egyenlő az átfogó négyzetével: Ta + Tb = Tc',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">Ta + Tb = Tc</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'A két hegyesszög pontosan egyenlő: α = β = 45°',
        category: 'cat-special-case',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-amber-800" textAnchor="middle">α = β = 45°</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'A két befogó hosszának összege pontosan megegyezik az átfogó hosszával: a + b = c',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">a + b = c  ❌</text>
            <text x="40" y="34" className="text-[5.5px] fill-rose-600" textAnchor="middle">Háromszög-egyenlőtlenség: a+b &gt; c</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'A körülírt kör középpontja a leghosszabb oldal (átfogó) felezőpontjában van',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">O = c felezőpontja</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'A két befogóra emelt négyzet területe teljesen egyenlő: Ta = Tb',
        category: 'cat-special-case',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">Ta = Tb  (a = b)</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Az egyik befogó hossza megegyezhet vagy nagyobb lehet az átfogónál (a ≥ c)',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">a ≥ c  ❌ Lehetetlen</text>
          </svg>
        )
      },
      {
        id: 's31',
        label: 'A háromszög területe kiszámítható úgy is, mint az átfogó és a hozzá tartozó magasság szorzatának fele: (c · mc) / 2',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-emerald-800" textAnchor="middle">T = (c · mc) / 2</text>
          </svg>
        )
      },
      {
        id: 's32',
        label: 'Az átfogóhoz tartozó magasság éppen felezi az átfogót',
        category: 'cat-special-case',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">mc felezi c-t (szimmetria)</text>
          </svg>
        )
      },
      {
        id: 's33',
        label: 'Bármilyen három pozitív szakaszból mindig szerkeszthető derékszögű háromszög',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-rose-700" textAnchor="middle">Tetszőleges oldalak ❌</text>
            <text x="40" y="34" className="text-[5.5px] fill-rose-600" textAnchor="middle">Csak ha a²+b²=c²</text>
          </svg>
        )
      },
      {
        id: 's34',
        label: 'A két hegyesszög összege mindig 90° (α + β = 90°)',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-emerald-800" textAnchor="middle">α + β = 90°</text>
          </svg>
        )
      },
      {
        id: 's35',
        label: 'A derékszögű háromszög területe pontosan c² / 4',
        category: 'cat-special-case',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[7.5px] font-bold fill-amber-800" textAnchor="middle">T = c² / 4</text>
          </svg>
        )
      },
      {
        id: 's36',
        label: 'Egy derékszögű háromszögnek lehet tompaszöge (&gt;90°) is a derékszög mellett',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <text x="40" y="24" className="text-[8px] font-bold fill-rose-700" textAnchor="middle">Tompaszög ❌</text>
            <text x="40" y="34" className="text-[5.5px] fill-rose-600" textAnchor="middle">Belső szögek összege max 180°</text>
          </svg>
        )
      }
    ]
  }
};

export const ConstructionsMeasurementsSorter: React.FC<ConstructionsMeasurementsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-constructions-sorter',
  topicTitle = 'Szerkesztések és Mérések Csoportosító'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 1. Lecke • Szerkesztések, Mérések"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="pitagorasz-tetel"
      grade={8}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ConstructionsMeasurementsSorter;
