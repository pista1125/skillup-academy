import React, { useState, useId } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import {
  Ruler,
  Sparkles,
  Compass,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Footprints,
  Navigation,
  MapPin,
  Maximize2
} from 'lucide-react';

export interface LengthTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const LengthTheory: React.FC<LengthTheoryProps> = ({ onBack, onStartQuiz, onSwitchToQuiz }) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;
  // --- Interaktív Átváltó Állapotok ---
  const [inputValue, setInputValue] = useState<number>(3.5);
  const [inputUnit, setInputUnit] = useState<'mm' | 'cm' | 'dm' | 'm' | 'km'>('m');

  // --- Interaktív Vonalzó Állapotok ---
  const [rulerObjectLength, setRulerObjectLength] = useState<number>(75); // mm-ben
  const [rulerOffset, setRulerOffset] = useState<number>(0); // eltolás mm-ben

  // Alapegységre (méter) váltás
  const toMeters = (val: number, unit: 'mm' | 'cm' | 'dm' | 'm' | 'km'): number => {
    switch (unit) {
      case 'mm': return val / 1000;
      case 'cm': return val / 100;
      case 'dm': return val / 10;
      case 'm': return val;
      case 'km': return val * 1000;
    }
  };

  const meters = toMeters(inputValue, inputUnit);

  const converted = {
    mm: meters * 1000,
    cm: meters * 100,
    dm: meters * 10,
    m: meters,
    km: meters / 1000
  };

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000000 || (Math.abs(num) < 0.0001 && num !== 0)) {
      return num.toExponential(4).replace('.', ',');
    }
    // Legfeljebb 4 tizedesjegy, szépen kerekítve
    const rounded = Math.round(num * 10000) / 10000;
    return rounded.toString().replace('.', ',');
  };

  return (
    <TheoryTemplate
      documentId="grade-5-length-theory"
      pdfFilename="5_osztaly_IV_1_a_hosszusag_merese.pdf"
      title="A hosszúság mérése"
      subtitle="A hosszúság mint fizikai mennyiség, a metrikus mértékegységek (mm, cm, dm, m, km), a tízes váltószámok rendszere, mérőeszközök és mindennapi becslés"
      themeColor="teal"
      emoji="📏"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 1. TANANYAG"
      quickRule={{
        label: 'A mértékegység-váltás alapszabálya',
        formula: 'Nagyobból kisebbe \\to \\text{SZORZUNK} \\quad | \\quad Kisebből nagyobba \\to \\text{OSZTUNK}'
      }}
      practiceTitle="Készen állsz a hosszúság mérésének tesztelésére?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses, 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A MÉRÉS ÉS A HOSSZÚSÁG FOGALMA */}
      <TheorySection
        id="fogalom"
        title="1. Mi a mérés és mit jelent a hosszúság?"
        subtitle="Az összehasonlítás elve az ókori testhossz-mértékektől a nemzetközi etalon méterig"
        badge="ALAPOK"
      >
        <TheoryCard title="Hogyan és miért mérünk hosszúságot?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A <strong>hosszúság</strong> a testek méretét, kiterjedését vagy két pont közötti távolságát kifejező mennyiség.
            A <strong>mérés</strong> nem más, mint az ismeretlen méret <em>összehasonlítása egy előre megállapodott, rögzített egységgel (az etalonnal)</em>.
            A mérés eredménye mindig két részből áll:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 block mb-1">
                1. Mérőszám (egy szám)
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                15
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Megmutatja, hogy az egység hányszor fér bele a mérendő szakaszba.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">
                2. Mértékegység (egy szó vagy rövidítés)
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                cm
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                A választott egység neve vagy hivatalos rövidítése (pl. cm, méter).
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
            Önmagában a „15” nem mond semmit: 15 mm egy radír vastagsága, 15 m egy ház hossza, 15 km két falu távolsága! Mindig ki kell írni a mértékegységet!
          </p>
        </TheoryCard>

        {/* Régi mértékek vs Modern méter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Régi testhossz-mértékek (miért nem voltak jók?)">
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              Az emberek régen saját testrészeikkel mértek:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span><strong>Hüvelyk (más néven coll vagy inch):</strong> a felnőtt hüvelykujj felső percének hossza (kb. 2,5 cm). Ma is találkozhatsz vele például a tévék és telefonok képernyőméreténél.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span><strong>Arasz:</strong> a széttárt hüvelykujj és kisujj csúcsa közötti távolság (kb. 20 cm).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span><strong>Könyök és rőf:</strong> a könyökhajlattól a kinyújtott középső ujj hegyéig terjedő távolság (kb. 50–60 cm). Régi vásárokban így mérték a szőtt kelméket.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <span><strong>Lépés és öl:</strong> a lépés egy felnőtt kényelmes lépéshossza (kb. 75 cm), az öl pedig a két oldalra széttárt kar fesztávolsága (kb. 1,9 méter).</span>
              </li>
            </ul>
            <div className="mt-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
              <strong>A probléma:</strong> A király lába nagyobb volt a szolga lábánál, a posztókereskedő araszával pedig viták keletkeztek. Egységes, változhatatlan mértékre volt szükség!
            </div>
          </TheoryCard>

          <TheoryCard title="A metrikus rendszer és az 1 méter">
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
              A 18. század végén a tudósok megalkották az <strong>egységes nemzetközi méterrendszert (SI)</strong>:
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl mb-3 text-sm text-emerald-900 dark:text-emerald-200">
              <strong>Az 1 méter alapegység (m):</strong> Eredetileg a Föld Északi-sarkától az Egyenlítőig mért távolságának tízmilliomod része volt. Készítettek belőle egy platina-irídium ötvözetű etalon rudat Párizsban!
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm">
              A metrikus rendszer hatalmas előnye, hogy <strong>tízes alapú</strong> (decimális):
              minden mértékegység a szomszédjának 10-szerese, 100-szorosa vagy 1000-szerese.
              Így az átváltáshoz elegendő nullákkal szorozni vagy osztani!
            </p>
          </TheoryCard>
        </div>

        {/* Vizuális összehasonlító ábra: Régi mértékek és az 1 méteres etalon */}
        <TheoryCard title="Szemléltetés: Régi testhossz-mértékek és az 1 méteres etalon rúd">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto text-center">
            <svg className="w-full min-w-[560px] h-36 mx-auto" viewBox="0 0 580 140" fill="none">
              {/* Háttér segédvonalak */}
              <rect x="10" y="10" width="560" height="120" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-950/40 dark:stroke-slate-800" />
              
              {/* Régi mértékek sávja */}
              <text x="30" y="32" className="text-[11px] font-black fill-amber-700 dark:fill-amber-400">RÉGI TEST-MÉRTÉKEK (egyénenként változó):</text>
              
              {/* Hüvelyk ~2.5 cm */}
              <g transform="translate(30, 42)">
                <rect width="45" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
                <text x="22.5" y="13" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">Hüvelyk (~2,5 cm)</text>
              </g>

              {/* Arasz ~20 cm */}
              <g transform="translate(85, 42)">
                <rect width="90" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
                <text x="45" y="13" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">Arasz (~20 cm)</text>
              </g>

              {/* Könyök ~50 cm */}
              <g transform="translate(185, 42)">
                <rect width="180" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
                <text x="90" y="13" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">Könyök (~50 cm)</text>
              </g>

              {/* Lépés ~75 cm */}
              <g transform="translate(375, 42)">
                <rect width="180" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
                <text x="90" y="13" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">Lépés (~75 cm)</text>
              </g>

              {/* Modern SI 1 Méter Etalon Rúd (osztva 10 deciméterre) */}
              <text x="30" y="82" className="text-[11px] font-black fill-teal-700 dark:fill-teal-400">MODERN SI ETALON MÉTER (pontosan 1 m = 10 dm = 100 cm):</text>
              <rect x="30" y="90" width="525" height="24" rx="4" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
              
              {/* 10 dm jelölések */}
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={`dm-${i}`}>
                  <rect x={30 + i * 52.5} y="90" width="52.5" height="24" fill={i % 2 === 0 ? '#14b8a6' : '#2dd4bf'} opacity="0.3" />
                  <line x1={30 + i * 52.5} y1="90" x2={30 + i * 52.5} y2="114" stroke="#0f766e" strokeWidth="1.5" />
                  <text x={30 + i * 52.5 + 26.25} y="106" textAnchor="middle" className="text-[9px] font-black fill-teal-950">
                    {i + 1} dm
                  </text>
                </g>
              ))}
              <line x1="555" y1="90" x2="555" y2="114" stroke="#0f766e" strokeWidth="1.5" />
              <text x="292" y="130" textAnchor="middle" className="text-[10px] font-black fill-teal-800 dark:fill-teal-300">
                1 méter = 10 deciméter = 100 centiméter = 1000 milliméter (állandó, nemzetközi etalon)
              </text>
            </svg>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK LÉPCSŐJE */}
      <TheorySection
        id="valtoszamok"
        title="2. A mértékegységek sora és a váltószámok lépcsője"
        subtitle="Millimétertől a kilométerig: szorzunk vagy osztunk a tízes váltószámokkal?"
        badge="SZABÁLYOK"
      >
        <TheoryCallout
          variant="highlight"
          title="A hosszúság 5 legfontosabb mértékegysége"
          icon={<Ruler className="w-5 h-5" />}
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center">
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-teal-200 dark:border-teal-700">
              <span className="text-lg font-black text-teal-700 dark:text-teal-300 block">mm</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">milliméter</span>
              <span className="text-[10px] text-slate-400">1 m ezredrésze</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-teal-200 dark:border-teal-700">
              <span className="text-lg font-black text-teal-700 dark:text-teal-300 block">cm</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">centiméter</span>
              <span className="text-[10px] text-slate-400">1 m századrésze</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-teal-200 dark:border-teal-700">
              <span className="text-lg font-black text-teal-700 dark:text-teal-300 block">dm</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">deciméter</span>
              <span className="text-[10px] text-slate-400">1 m tizedrésze</span>
            </div>
            <div className="p-2.5 rounded-lg bg-teal-100/90 dark:bg-teal-900/60 border-2 border-teal-500">
              <span className="text-lg font-black text-teal-900 dark:text-teal-100 block">m</span>
              <span className="text-[11px] font-bold text-teal-800 dark:text-teal-200 block">méter (alap)</span>
              <span className="text-[10px] text-teal-700 dark:text-teal-300">1 méter</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-teal-200 dark:border-teal-700 col-span-2 sm:col-span-1">
              <span className="text-lg font-black text-teal-700 dark:text-teal-300 block">km</span>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">kilométer</span>
              <span className="text-[10px] text-slate-400">1000 méter</span>
            </div>
          </div>
        </TheoryCallout>

        {/* Váltószám-diagram SVG */}
        <TheoryCard title="A váltószám-lépcső logikája">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 overflow-x-auto">
            <svg className="w-full min-w-[500px] h-36 mx-auto" viewBox="0 0 600 130" fill="none">
              {/* Címkék: Fentről balról jobbra kisebbre váltás: szorzás */}
              <text x="300" y="16" textAnchor="middle" className="text-[11px] font-black fill-emerald-600 dark:fill-emerald-400">
                NAGYOBB EGYSÉGBŐL KISEBBE → SZORZUNK (több darab kisebb egység kell)
              </text>

              {/* Felső ívek (szorzás jobbra: km -> m -> dm -> cm -> mm) */}
              {/* km -> m (· 1000) */}
              <path d="M 80 48 C 110 22, 170 22, 200 48" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow-green)" />
              <text x="140" y="30" textAnchor="middle" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">· 1000</text>

              {/* m -> dm (· 10) */}
              <path d="M 220 48 C 245 28, 275 28, 300 48" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="260" y="32" textAnchor="middle" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">· 10</text>

              {/* dm -> cm (· 10) */}
              <path d="M 320 48 C 345 28, 375 28, 400 48" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="360" y="32" textAnchor="middle" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">· 10</text>

              {/* cm -> mm (· 10) */}
              <path d="M 420 48 C 445 28, 475 28, 500 48" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="460" y="32" textAnchor="middle" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300">· 10</text>

              {/* Mértékegység Dobozok */}
              <g transform="translate(50, 48)">
                <rect width="60" height="34" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                <text x="30" y="22" textAnchor="middle" className="text-sm font-black fill-emerald-800">km</text>
              </g>

              <g transform="translate(190, 48)">
                <rect width="60" height="34" rx="8" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" />
                <text x="30" y="22" textAnchor="middle" className="text-sm font-black fill-teal-800">m</text>
              </g>

              <g transform="translate(290, 48)">
                <rect width="60" height="34" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                <text x="30" y="22" textAnchor="middle" className="text-sm font-black fill-slate-800">dm</text>
              </g>

              <g transform="translate(390, 48)">
                <rect width="60" height="34" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                <text x="30" y="22" textAnchor="middle" className="text-sm font-black fill-slate-800">cm</text>
              </g>

              <g transform="translate(490, 48)">
                <rect width="60" height="34" rx="8" fill="#fef2f2" stroke="#e11d48" strokeWidth="2" />
                <text x="30" y="22" textAnchor="middle" className="text-sm font-black fill-rose-800">mm</text>
              </g>

              {/* Alsó ívek (osztás balra: mm -> cm -> dm -> m -> km) */}
              {/* mm -> cm (: 10) */}
              <path d="M 500 86 C 475 106, 445 106, 420 86" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="460" y="108" textAnchor="middle" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">: 10</text>

              {/* cm -> dm (: 10) */}
              <path d="M 400 86 C 375 106, 345 106, 320 86" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="360" y="108" textAnchor="middle" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">: 10</text>

              {/* dm -> m (: 10) */}
              <path d="M 300 86 C 275 106, 245 106, 220 86" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="260" y="108" textAnchor="middle" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">: 10</text>

              {/* m -> km (: 1000) */}
              <path d="M 200 86 C 170 112, 110 112, 80 86" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <text x="140" y="112" textAnchor="middle" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">: 1000</text>

              <text x="300" y="126" textAnchor="middle" className="text-[11px] font-black fill-rose-600 dark:fill-rose-400">
                KISEBB EGYSÉGBŐL NAGYOBBA → OSZTUNK (kevesebb darab nagyobb egység lesz)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                Példa szorzásra (nagyobból kisebbe):
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li><MathText>{'4\\text{ m} = 4 \\cdot 100 = 400\\text{ cm}'}</MathText> (2 lépcsőfok lefelé = szorzás 100-zal)</li>
                <li><MathText>{'2,5\\text{ km} = 2,5 \\cdot 1000 = 2500\\text{ m}'}</MathText> (1 nagy ugrás = szorzás 1000-rel)</li>
                <li><MathText>{'7\\text{ dm} = 7 \\cdot 10 = 70\\text{ cm} = 700\\text{ mm}'}</MathText></li>
              </ul>
            </div>

            <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-800">
              <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
                Példa osztásra (kisebből nagyobba):
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li><MathText>{'850\\text{ mm} = 850 : 10 = 85\\text{ cm} = 8,5\\text{ dm}'}</MathText></li>
                <li><MathText>{'3400\\text{ m} = 3400 : 1000 = 3,4\\text{ km} \\quad (3\\text{ km } 400\\text{ m})'}</MathText></li>
                <li><MathText>{'200\\text{ cm} = 200 : 100 = 2\\text{ m}'}</MathText></li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        {/* Ugró váltószámok táblázata */}
        <TheoryTable
          title="Ugró váltószámok gyorskeresője"
          headers={['Kezdő egység', 'Cél egység', 'Művelet', 'Váltószám', 'Példa']}
          rows={[
            ['1 m', 'cm', 'Szorzás (·)', '100', '3 m = 300 cm'],
            ['1 m', 'mm', 'Szorzás (·)', '1000', '1,5 m = 1500 mm'],
            ['1 dm', 'mm', 'Szorzás (·)', '100', '4 dm = 400 mm'],
            ['1 km', 'cm', 'Szorzás (·)', '100 000', '0,5 km = 50 000 cm'],
            ['1 cm', 'm', 'Osztás (:)', '100', '250 cm = 2,5 m'],
            ['1 mm', 'm', 'Osztás (:)', '1000', '800 mm = 0,8 m']
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: INTERAKTÍV HOSSZÚSÁG LABORATÓRIUM */}
      <TheorySection
        id="laboratorium"
        title="3. Interaktív Hosszúság Laboratórium és Átváltó Gép"
        subtitle="Próbáld ki valós időben: gépelj be egy számot, vagy mérj a virtuális vonalzóval!"
        badge="INTERAKTÍV"
      >
        <TheoryCard title="Élő Hosszúság-Konvertáló">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Írj be egy értéket és válaszd ki a mértékegységet! A gép azonnal kiszámolja és megmutatja az összes többi mértékegységben:
          </p>

          <div className="flex flex-wrap items-center gap-3 p-4 bg-teal-50/60 dark:bg-slate-800/60 rounded-2xl border border-teal-200 dark:border-teal-800 mb-6">
            <div className="flex-1 min-w-[160px]">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-1">
                Mért érték:
              </label>
              <input
                type="number"
                step="0.1"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-lg font-black text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-1">
                Forrás mértékegység:
              </label>
              <div className="flex gap-1">
                {(['mm', 'cm', 'dm', 'm', 'km'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setInputUnit(u)}
                    className={`px-3 py-2 rounded-xl text-sm font-black transition-all ${
                      inputUnit === u
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Konvertált eredmények kártyái */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className={`p-3 rounded-xl border text-center transition-all ${inputUnit === 'mm' ? 'bg-teal-100/90 dark:bg-teal-900/60 border-teal-500 ring-2 ring-teal-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Milliméter (mm)</span>
              <span className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 block my-1">
                {formatNumber(converted.mm)}
              </span>
              <span className="text-[10px] text-slate-400">10⁻³ m</span>
            </div>

            <div className={`p-3 rounded-xl border text-center transition-all ${inputUnit === 'cm' ? 'bg-teal-100/90 dark:bg-teal-900/60 border-teal-500 ring-2 ring-teal-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Centiméter (cm)</span>
              <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 block my-1">
                {formatNumber(converted.cm)}
              </span>
              <span className="text-[10px] text-slate-400">10⁻² m</span>
            </div>

            <div className={`p-3 rounded-xl border text-center transition-all ${inputUnit === 'dm' ? 'bg-teal-100/90 dark:bg-teal-900/60 border-teal-500 ring-2 ring-teal-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Deciméter (dm)</span>
              <span className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 block my-1">
                {formatNumber(converted.dm)}
              </span>
              <span className="text-[10px] text-slate-400">10⁻¹ m</span>
            </div>

            <div className={`p-3 rounded-xl border text-center transition-all ${inputUnit === 'm' ? 'bg-teal-100/90 dark:bg-teal-900/60 border-teal-500 ring-2 ring-teal-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Méter (m) [alap]</span>
              <span className="text-lg sm:text-xl font-black text-teal-700 dark:text-teal-300 block my-1">
                {formatNumber(converted.m)}
              </span>
              <span className="text-[10px] text-slate-400">1 m</span>
            </div>

            <div className={`p-3 rounded-xl border text-center transition-all col-span-2 sm:col-span-1 ${inputUnit === 'km' ? 'bg-teal-100/90 dark:bg-teal-900/60 border-teal-500 ring-2 ring-teal-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Kilométer (km)</span>
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 block my-1">
                {formatNumber(converted.km)}
              </span>
              <span className="text-[10px] text-slate-400">10³ m</span>
            </div>
          </div>
        </TheoryCard>

        {/* Interaktív Vonalzó Szimulátor */}
        <TheoryCard title="Virtuális Vonalzó: Hogyan mérünk pontosan?">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Állítsd be a ceruza hosszát a csúszkával, és figyeld meg a centiméter és milliméter beosztást a vonalzón!
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-between mb-1">
                  <span>Ceruza hossza:</span>
                  <span className="text-teal-600 dark:text-teal-400 font-black">
                    {rulerObjectLength} mm = {(rulerObjectLength / 10).toFixed(1).replace('.', ',')} cm
                  </span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="140"
                  value={rulerObjectLength}
                  onChange={(e) => setRulerObjectLength(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRulerObjectLength(75)}
                  className="text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet (7,5 cm)
                </Button>
              </div>
            </div>

            {/* Vonalzó SVG grafika (0-15 cm, azaz 150 mm-es skála) */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <svg className="w-full min-w-[580px] h-32" viewBox="0 0 600 130" fill="none">
                {/* Háttér segédrács */}
                <rect x="0" y="0" width="600" height="130" fill="transparent" />

                {/* Mérendő Ceruza */}
                {/* 1 cm = 35 px skála, 0 pont x = 40 */}
                {(() => {
                  const scale = 3.5; // 1 mm = 3.5 px
                  const startX = 40;
                  const pencilWidth = rulerObjectLength * scale;
                  const pencilY = 22;

                  return (
                    <g>
                      {/* Ceruzatest (sárga/narancs fa) */}
                      <rect
                        x={startX}
                        y={pencilY}
                        width={Math.max(10, pencilWidth - 25)}
                        height="18"
                        rx="2"
                        fill="#fbbf24"
                        stroke="#d97706"
                        strokeWidth="1.5"
                      />
                      {/* Ceruzacsíkok */}
                      <line x1={startX} y1={pencilY + 6} x2={startX + Math.max(10, pencilWidth - 25)} y2={pencilY + 6} stroke="#f59e0b" strokeWidth="1" />
                      <line x1={startX} y1={pencilY + 12} x2={startX + Math.max(10, pencilWidth - 25)} y2={pencilY + 12} stroke="#f59e0b" strokeWidth="1" />

                      {/* Ceruzafaragás (világos fa kúp) */}
                      <polygon
                        points={`${startX + Math.max(10, pencilWidth - 25)},${pencilY} ${startX + pencilWidth},${pencilY + 9} ${startX + Math.max(10, pencilWidth - 25)},${pencilY + 18}`}
                        fill="#fde68a"
                        stroke="#d97706"
                        strokeWidth="1"
                      />
                      {/* Grafithegy */}
                      <polygon
                        points={`${startX + pencilWidth - 8},${pencilY + 6} ${startX + pencilWidth},${pencilY + 9} ${startX + pencilWidth - 8},${pencilY + 12}`}
                        fill="#1e293b"
                      />

                      {/* Radír a végén (rózsaszín + fém rögzítő) */}
                      <rect x={startX - 12} y={pencilY} width="12" height="18" rx="2" fill="#fda4af" stroke="#f43f5e" strokeWidth="1" />
                      <rect x={startX - 4} y={pencilY} width="4" height="18" fill="#94a3b8" />

                      {/* Méretjelző szaggatott vonal a végpontnál le a skálára */}
                      <line
                        x1={startX + pencilWidth}
                        y1={pencilY + 18}
                        x2={startX + pencilWidth}
                        y2={65}
                        stroke="#e11d48"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      {/* Piros pont a skálánál */}
                      <circle cx={startX + pencilWidth} cy={65} r="3" fill="#e11d48" />

                      {/* Leolvasott felirat */}
                      <rect
                        x={startX + pencilWidth - 30}
                        y={pencilY - 18}
                        width="60"
                        height="16"
                        rx="4"
                        fill="#e11d48"
                      />
                      <text
                        x={startX + pencilWidth}
                        y={pencilY - 6}
                        textAnchor="middle"
                        className="text-[10px] font-black fill-white"
                      >
                        {rulerObjectLength} mm
                      </text>
                    </g>
                  );
                })()}

                {/* Vonalzó Test (fa/műanyag textúra, 0-15 cm) */}
                <rect x="20" y="65" width="560" height="55" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />

                {/* Vonalzó beosztások: 0-tól 15 cm-ig */}
                {Array.from({ length: 16 }).map((_, cmIndex) => {
                  const scale = 3.5;
                  const cmX = 40 + cmIndex * 10 * scale;

                  return (
                    <g key={cmIndex}>
                      {/* Egész cm vonal */}
                      <line x1={cmX} y1={65} x2={cmX} y2={85} stroke="#0f172a" strokeWidth="1.8" />
                      {/* Cm szám */}
                      <text x={cmX} y={102} textAnchor="middle" className="text-xs font-black fill-slate-900">
                        {cmIndex}
                      </text>

                      {/* Fél centi (5 mm) és milliméter vonalak a következő cm előtt */}
                      {cmIndex < 15 &&
                        Array.from({ length: 9 }).map((_, mmIndex) => {
                          const mm = mmIndex + 1;
                          const mmX = cmX + mm * scale;
                          const isHalf = mm === 5;
                          return (
                            <line
                              key={mmIndex}
                              x1={mmX}
                              y1={65}
                              x2={mmX}
                              y2={isHalf ? 79 : 72}
                              stroke={isHalf ? '#334155' : '#94a3b8'}
                              strokeWidth={isHalf ? '1.2' : '0.8'}
                            />
                          );
                        })}
                    </g>
                  );
                })}

                {/* Skála felirat (cm és mm jelölés a vonalzó szélén) */}
                <text x="32" y="112" className="text-[10px] font-black fill-slate-400">cm</text>
                <text x="560" y="112" textAnchor="end" className="text-[10px] font-bold fill-slate-400">15 cm (150 mm)</text>
              </svg>
            </div>

            <div className="p-3 bg-teal-50/70 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>A helyes mérés aranyszabálya:</strong> A tárgy bal szélét pontosan a <strong>0 jelöléshez</strong> illesztjük (nem a vonalzó műanyag széléhez!), a jobb szélénél pedig leolvassuk az egész centimétereket és a köztes milliméter vonalkákat!
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: MÉRŐESZKÖZÖK ÉS MINDENNAPI BECSLÉS */}
      <TheorySection
        id="eszkozok-becsles"
        title="4. Mérőeszközök és becslés a mindennapokban"
        subtitle="Mivel mérünk a valóságban, és hogyan saccolhatunk távolságokat eszköz nélkül?"
        badge="GYAKORLAT"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold mb-2">
              📏
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Vonalzó (15-30 cm)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Füzetben rajzoláshoz, ceruza, radír, könyv méréséhez. Pontosság: 1 mm.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold mb-2">
              📐
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Mérőszalag és colstok (2–5 m)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Szoba bútorozásához, asztal, ajtó, ablak méreteinek leméréséhez.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold mb-2">
              🎡
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Mérőkerék és hosszú mérőszalag (akár 50 m)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Futópálya, focipálya, építkezési telek határainak kimérésére.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-700 dark:text-rose-300 font-bold mb-2">
              🚗
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Kilométeróra, GPS és térkép</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Települések, autópályák, túraútvonalak távolságainak mérésére (km-ben).
            </p>
          </div>
        </div>

        {/* Gyakorlati Becslési Táblázat */}
        <TheoryTable
          title="Mi mekkora a valóságban? – Becslési kapaszkodók"
          headers={['Tárgy vagy jelenség', 'Reális hosszúság', 'Legalkalmasabb mértékegység']}
          rows={[
            ['Bankkártya vagy füzetlap vastagsága', 'kb. 1 mm (illetve 0,1 mm)', 'mm'],
            ['Köröm szélessége vagy kockás füzet 2 négyzete', 'kb. 1 cm (10 mm)', 'cm'],
            ['Felnőtt kéz arasza vagy okostelefon hossza', 'kb. 1,5 – 2 dm (15–20 cm)', 'dm vagy cm'],
            ['Tanterem ajtajának magassága vagy felnőtt nagy lépése', 'kb. 2 m (illetve 1 m)', 'm'],
            ['Hagyományos tanterem hossza', 'kb. 8 – 10 m', 'm'],
            ['Szabványos futópálya kör', '400 m', 'm'],
            ['15 perces kényelmes séta távolsága', 'kb. 1 km (1000 m)', 'km'],
            ['Budapest – Balaton (Siófok) távolság', 'kb. 105 km', 'km']
          ]}
        />
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="5. Gyakorló tippek és gyakori hibák"
        subtitle="Mire figyelj oda a dolgozatban és a feladatmegoldás során?"
        badge="TÉVHITEK"
      >
        <TheoryTrapBox
          traps={[
            {
              title: 'Csapda: A kilométer váltószáma nem 10 vagy 100!',
              mistake: '1 km = 100 m vagy 1 km = 10 m felírása.',
              correction: 'A „kilo-” előtag mindig EZRET jelent (mint a kilogrammnál is!). 1 km = 1000 m. Ezért 3,5 km = 3500 m, nem pedig 350 m!',
              tip: 'Jegyezd meg: kilo = ezer! 1 km = 1000 m.'
            },
            {
              title: 'Csapda: Váltáskor a művelet irányának eltévesztése',
              mistake: '400 mm = 4000 cm vagy 5 m = 0,05 cm felírása.',
              correction: 'Gondold végig a józan ésszel: ha egy kisebb mérőpálcát használsz (pl. méter helyett centimétert), abból TÖBB darab fog beleférni, tehát SZORZOL! Ha centiméterből váltasz méterre, KEVESEBB lesz a szám, tehát OSZTASZ!',
              tip: 'Nagyobb egységbe váltasz? Kisebb lesz a számérték (osztás). Kisebb egységbe váltasz? Nagyobb lesz a számérték (szorzás).'
            },
            {
              title: 'Csapda: A vonalzó helytelen leolvasása (nem a 0-nál indítva)',
              mistake: 'A vonalzó széléhez illesztve a tárgyat, így 2-3 mm-rel kevesebbet vagy többet mérni.',
              correction: 'A műanyag vonalzókon a 0 jelölés előtt mindig van pár milliméter üres műanyag perem. Mindig a „0” vonalhoz illeszd a szakasz kezdőpontját!',
              tip: 'Ha a vonalzó széle letört, mérhetsz 1 cm-től is (pl. 1-től 8-ig tart a szakasz: 8 - 1 = 7 cm a hossza).'
            },
            {
              title: 'Csapda: Vegyes mértékegységek tizedestörtre váltása',
              mistake: '3 m 5 cm = 3,5 m felírása (mert 5-ös van ott).',
              correction: 'Mivel 1 m = 100 cm, 5 cm az 5 század méter, azaz 0,05 m! Tehát 3 m 5 cm = 3,05 m (305 cm). A 3,5 m az 3 m 50 cm lenne!',
              tip: 'Mindig ellenőrizd az átváltást úgy, hogy mindkettőt átváltod a legkisebb közös egységbe (pl. cm-be).'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
