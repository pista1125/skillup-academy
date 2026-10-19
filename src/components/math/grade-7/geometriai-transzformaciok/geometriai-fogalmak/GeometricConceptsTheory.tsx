import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Sparkles,
  Compass,
  Shapes,
  Maximize2,
  Box,
  MoveHorizontal,
  Target,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Ruler,
  Clock,
  Globe,
  Navigation,
  ZoomIn,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface GeometricConceptsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GeometricConceptsTheory: React.FC<GeometricConceptsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Angle Explorer state
  const [interactiveAngle, setInteractiveAngle] = useState<number>(65);

  // Section 6: Arcminute & Arcsecond state
  const [decimalAngleInput, setDecimalAngleInput] = useState<number>(35.75);
  const [activeCalcTab, setActiveCalcTab] = useState<'add' | 'sub90' | 'sub180'>('sub90');

  const getDMS = (deg: number) => {
    const safeDeg = Math.max(0, deg);
    const d = Math.floor(safeDeg);
    const totalMinutes = (safeDeg - d) * 60;
    const m = Math.floor(totalMinutes);
    const s = Math.round((totalMinutes - m) * 60);
    const totalSeconds = Math.round(safeDeg * 3600);
    return { d, m, s, totalSeconds };
  };

  const dms = getDMS(decimalAngleInput);

  const getAngleCategory = (deg: number) => {
    if (deg === 0) return { name: 'Nullszög', color: 'text-slate-600 dark:text-slate-400', desc: 'A két szögszár egybeesik, a szögtartomány mérete 0°.' };
    if (deg > 0 && deg < 90) return { name: 'Hegyesszög', color: 'text-teal-600 dark:text-teal-400', desc: 'Nagyobb 0°-nál, de kisebb a derékszögnél (90°-nál).' };
    if (deg === 90) return { name: 'Derékszög', color: 'text-blue-600 dark:text-blue-400', desc: 'Pontosan 90°, a két szögszár merőleges egymásra.' };
    if (deg > 90 && deg < 180) return { name: 'Tompaszög', color: 'text-amber-600 dark:text-amber-400', desc: 'Nagyobb 90°-nál, de kisebb 180°-nál (egyenesszögnél).' };
    if (deg === 180) return { name: 'Egyenesszög', color: 'text-purple-600 dark:text-purple-400', desc: 'Pontosan 180°, a szárak egy egyenest alkotnak.' };
    if (deg > 180 && deg < 360) return { name: 'Homorúszög (Konkáv szög)', color: 'text-rose-600 dark:text-rose-400', desc: 'Nagyobb 180°-nál, de kisebb a teljesszögnél (360°-nál).' };
    if (deg === 360) return { name: 'Teljesszög', color: 'text-emerald-600 dark:text-emerald-400', desc: 'Pontosan 360°, egy teljes fordulat a szögcsúcs körül.' };
    return { name: 'Szög', color: 'text-slate-700', desc: '' };
  };

  const currentAngleInfo = getAngleCategory(interactiveAngle);

  // Helper calculation for interactive SVG angle ray
  const centerX = 120;
  const centerY = 110;
  const radius = 80;
  const rad = (interactiveAngle * Math.PI) / 180;
  const rayX = centerX + radius * Math.cos(-rad);
  const rayY = centerY + radius * Math.sin(-rad);
  const arcRadius = 35;
  const arcX = centerX + arcRadius * Math.cos(-rad);
  const arcY = centerY + arcRadius * Math.sin(-rad);
  const largeArcFlag = interactiveAngle > 180 ? 1 : 0;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-geom-concepts-theory-doc"
      pdfFilename="7_osztaly_geometriai_fogalmak.pdf"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="1. Geometriai fogalmak"
      subtitle="Alapfogalmak (pont, egyenes, sík, tér), félegyenes, szakasz, távolságok, egyenesek kölcsönös helyzete, a szögek rendszere és finomabb mértékegységei (szögperc, szögmásodperc)"
      quickRule={{
        label: 'Axiómák & Szögmértékek',
        formula: "2 pont → 1 egyenes,  1° = 60' = 3600'',  1' = 60''"
      }}
      themeColor="teal"
      practiceTitle="Készen állsz a geometriai alapfogalmak mesterszintű tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 szinten, gazdag ábrákkal, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: Alapfogalmak */}
      <TheorySection
        number={1}
        title="Alapfogalmak (Alapvető, nem definiált fogalmak)"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A geometriát néhány alapvető, szemléletes fogalomra (alapfogalmak) és alapvető összefüggésekre (axiómákra) építjük fel. Ezeket más fogalmakkal nem definiáljuk, hanem tulajdonságaik alapján fogadjuk el.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {/* Pont */}
          <GeometryFigureCard
            title="Pont"
            subtitle="0 dimenziós helymeghatározó"
            badge="0D"
            variant="teal"
            figure={
              <svg viewBox="0 0 160 80" className="w-full h-20">
                <circle cx="80" cy="40" r="4.5" className="fill-teal-600 dark:fill-teal-400" />
                <text x="92" y="44" className="text-[14px] font-mono font-black fill-slate-800 dark:fill-slate-100">A</text>
              </svg>
            }
            properties={[
              { label: 'Kiterjedés', value: 'Nincs mérete, nincs kiterjedése' },
              { label: 'Jelölés', value: 'Nyomtatott nagybetűk: A, B, P, ...' }
            ]}
          />

          {/* Egyenes */}
          <GeometryFigureCard
            title="Egyenes"
            subtitle="1 dimenziós végtelen vonal"
            badge="1D"
            variant="blue"
            figure={
              <svg viewBox="0 0 160 80" className="w-full h-20">
                <line x1="15" y1="60" x2="145" y2="20" className="stroke-blue-600 dark:stroke-blue-400 stroke-[2.5]" strokeDasharray="none" />
                <circle cx="45" cy="50" r="3.5" className="fill-slate-800 dark:fill-slate-100" />
                <text x="45" y="68" className="text-[11px] font-mono font-bold fill-slate-700 dark:fill-slate-300">A</text>
                <circle cx="115" cy="30" r="3.5" className="fill-slate-800 dark:fill-slate-100" />
                <text x="115" y="22" className="text-[11px] font-mono font-bold fill-slate-700 dark:fill-slate-300">B</text>
                <text x="135" y="16" className="text-[13px] font-mono font-black italic fill-blue-700 dark:fill-blue-300">e</text>
              </svg>
            }
            properties={[
              { label: 'Kiterjedés', value: 'Mindkét irányban végtelen, vastagság nélküli' },
              { label: 'Jelölés', value: 'Kisbetűk (e, g) vagy 2 pont (AB)' }
            ]}
          />

          {/* Sík */}
          <GeometryFigureCard
            title="Sík"
            subtitle="2 dimenziós felület"
            badge="2D"
            variant="indigo"
            figure={
              <svg viewBox="0 0 160 80" className="w-full h-20">
                <polygon points="30,15 145,15 130,65 15,65" className="fill-indigo-50 dark:fill-indigo-950/40 stroke-indigo-400 dark:stroke-indigo-600 stroke-[1.5]" />
                <circle cx="50" cy="35" r="3" className="fill-indigo-700 dark:fill-indigo-300" />
                <text x="56" y="38" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-200">A</text>
                <circle cx="95" cy="30" r="3" className="fill-indigo-700 dark:fill-indigo-300" />
                <text x="101" y="33" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-200">B</text>
                <circle cx="70" cy="52" r="3" className="fill-indigo-700 dark:fill-indigo-300" />
                <text x="76" y="55" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-200">C</text>
                <text x="125" y="32" className="text-[14px] font-mono font-black fill-indigo-700 dark:fill-indigo-300">α</text>
              </svg>
            }
            properties={[
              { label: 'Kiterjedés', value: 'Minden irányban végtelen sík lap' },
              { label: 'Jelölés', value: 'Görög kisbetűk: α, β, γ vagy S' }
            ]}
          />

          {/* Tér */}
          <GeometryFigureCard
            title="Tér"
            subtitle="3 dimenziós összessége minden alakzatnak"
            badge="3D"
            variant="purple"
            figure={
              <svg viewBox="0 0 160 80" className="w-full h-20">
                {/* 3D Wireframe Cube */}
                <rect x="35" y="30" width="45" height="35" className="fill-purple-100/40 dark:fill-purple-950/30 stroke-purple-600 stroke-[1.5]" />
                <polygon points="35,30 55,15 100,15 80,30" className="fill-purple-100/20 stroke-purple-600 stroke-[1.5]" />
                <polygon points="80,30 100,15 100,50 80,65" className="fill-purple-200/30 stroke-purple-600 stroke-[1.5]" />
                <text x="115" y="45" className="text-[12px] font-mono font-bold fill-purple-700 dark:fill-purple-300">Tér</text>
              </svg>
            }
            properties={[
              { label: 'Kiterjedés', value: '3 dimenzió (hosszúság, szélesség, magasság)' },
              { label: 'Jelölés', value: 'Minden pont, egyenes és sík halmaza' }
            ]}
          />
        </div>

        <TheoryCallout variant="tip" title="Geometriai alaptételek (Axiómák)">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Egyenes axiómája:</strong> Bármely két különböző pontra pontosan egy egyenes illeszkedik.</li>
            <li><strong>Sík axiómája:</strong> Bármely három, nem egy egyenesbe eső pontra pontosan egy sík illeszkedik.</li>
            <li>Ha egy egyenes két pontja egy síkban van, akkor az egyenes összes pontja benne van a síkban.</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* SECTION 2: Származtatott fogalmak */}
      <TheorySection
        number={2}
        title="Származtatott alakzatok és távolságok"
        icon={<Ruler className="w-5 h-5 text-blue-600" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Félegyenes */}
          <TheoryCard
            title="Félegyenes"
            badge="1 kezdőpont"
            variant="cyan"
            figure={
              <svg viewBox="0 0 200 60" className="w-full h-16">
                <line x1="40" y1="30" x2="185" y2="30" className="stroke-cyan-600 stroke-[2.5]" />
                <circle cx="40" cy="30" r="4.5" className="fill-cyan-700" />
                <text x="35" y="50" className="text-[11px] font-mono font-bold fill-slate-800 dark:fill-slate-200">K</text>
                <polygon points="185,26 195,30 185,34" className="fill-cyan-600" />
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'Az egyenes egy pontja által kettéosztott két félegyenes egyike a kezdőponttal.' },
              { label: 'Jellemző', value: 'Egyik irányban a kezdőpont lezárja, a másik irányban végtelen.' }
            ]}
          />

          {/* Szakasz és hossza */}
          <TheoryCard
            title="Szakasz és Szakaszhossz"
            badge="2 végpont"
            variant="blue"
            figure={
              <svg viewBox="0 0 200 60" className="w-full h-16">
                <line x1="30" y1="30" x2="170" y2="30" className="stroke-blue-600 stroke-[3]" />
                <circle cx="30" cy="30" r="4.5" className="fill-blue-700" />
                <text x="25" y="50" className="text-[11px] font-mono font-bold fill-slate-800 dark:fill-slate-200">A</text>
                <circle cx="170" cy="30" r="4.5" className="fill-blue-700" />
                <text x="165" y="50" className="text-[11px] font-mono font-bold fill-slate-800 dark:fill-slate-200">B</text>
                <text x="95" y="22" className="text-[11px] font-mono font-bold fill-blue-700 dark:fill-blue-300">|AB|</text>
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'Az egyenes két pontja (végpontok) közé eső pontok összessége a végpontokkal.' },
              { label: 'Hossz / Távolság', value: '|AB| = d(A, B) a két pont legrövidebb távolsága.' }
            ]}
          />

          {/* Felezőpont */}
          <TheoryCard
            title="Szakasz felezőpontja"
            badge="|AF| = |FB|"
            variant="indigo"
            figure={
              <svg viewBox="0 0 200 60" className="w-full h-16">
                <line x1="30" y1="30" x2="170" y2="30" className="stroke-indigo-600 stroke-[2.5]" />
                <circle cx="30" cy="30" r="4" className="fill-slate-700 dark:fill-slate-300" />
                <circle cx="170" cy="30" r="4" className="fill-slate-700 dark:fill-slate-300" />
                <circle cx="100" cy="30" r="4.5" className="fill-indigo-600" />
                <text x="96" y="50" className="text-[11px] font-mono font-black fill-indigo-700 dark:fill-indigo-300">F</text>
                {/* Equality tick marks */}
                <line x1="63" y1="24" x2="67" y2="36" className="stroke-indigo-500 stroke-[2]" />
                <line x1="133" y1="24" x2="137" y2="36" className="stroke-indigo-500 stroke-[2]" />
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'A szakasz azon belső pontja, amely a két végponttól egyenlő távolságra van.' },
              {
                label: 'Képlet',
                value: (
                  <span className="inline-flex items-center gap-1 font-mono">
                    <span>|AF| = |FB| = </span>
                    <Fraction num="|AB|" den="2" size="sm" />
                  </span>
                )
              }
            ]}
          />
        </div>

        {/* Távolságok a geometriában */}
        <div className="pt-2">
          <TheoryCard title="Távolságok típusai a síkban" variant="default">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-xs text-teal-600 dark:text-teal-400">1. Két pont távolsága</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Az őket összekötő szakasz hossza: <span className="font-mono font-bold">d(A, B) = |AB|</span>.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-xs text-blue-600 dark:text-blue-400">2. Pont és egyenes távolsága</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A pontból az egyenesre bocsátott <strong>merőleges szakasz</strong> hossza (ez a legrövidebb távolság).
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400">3. Párhuzamosok távolsága</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Az egyik egyenes tetszőleges pontjából a másikra bocsátott merőleges szakasz hossza (állandó).
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 3: Egyenesek kölcsönös helyzete */}
      <TheorySection
        number={3}
        title="Egyenesek kölcsönös helyzete a síkban és a térben"
        icon={<MoveHorizontal className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Síkbeli helyzetek */}
          <TheoryCard
            title="A síkban (Egysíkú egyenesek)"
            badge="3 alapeset"
            variant="indigo"
          >
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 80 50" className="w-20 h-12 shrink-0">
                  <line x1="10" y1="40" x2="70" y2="10" className="stroke-indigo-600 stroke-[2]" />
                  <line x1="10" y1="10" x2="70" y2="40" className="stroke-teal-600 stroke-[2]" />
                  <circle cx="40" cy="25" r="3" className="fill-rose-500" />
                </svg>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{"Metsző egyenesek (e ∩ f = {M})"}</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">Pontosan <strong>1 közös pontjuk</strong> van. Speciális eset: <strong>merőleges egyenesek</strong> ({"e ⊥ f, 90°-os szög"}).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 80 50" className="w-20 h-12 shrink-0">
                  <line x1="10" y1="18" x2="70" y2="18" className="stroke-blue-600 stroke-[2]" />
                  <line x1="10" y1="34" x2="70" y2="34" className="stroke-blue-600 stroke-[2]" />
                </svg>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{"Párhuzamos egyenesek (e ∥ f)"}</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5"><strong>Nincs közös pontjuk</strong> a síkban, távolságuk minden pontban állandó.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 80 50" className="w-20 h-12 shrink-0">
                  <line x1="10" y1="25" x2="70" y2="25" className="stroke-purple-600 stroke-[3]" />
                </svg>
                <div className="text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{"Egybeeső egyenesek (e = f)"}</div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5"><strong>Végtelen sok közös pontjuk</strong> van, ugyanazt az egyenest jelentik.</p>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Térbeli helyzetek: Kitérő egyenesek */}
          <TheoryCard
            title="A térben: Kitérő egyenesek"
            badge="Nem egysíkúak"
            variant="purple"
            figure={
              <svg viewBox="0 0 200 120" className="w-full h-28">
                {/* 3D Cube with highlighted Skew lines */}
                {/* Back edges */}
                <line x1="60" y1="30" x2="140" y2="30" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" strokeDasharray="3 3" />
                <line x1="60" y1="30" x2="60" y2="90" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" strokeDasharray="3 3" />
                <line x1="60" y1="30" x2="30" y2="60" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" strokeDasharray="3 3" />

                {/* Front & main faces */}
                <line x1="30" y1="60" x2="110" y2="60" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="30" y1="120" x2="110" y2="120" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="110" y1="60" x2="110" y2="120" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="140" y1="30" x2="140" y2="90" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="140" y1="90" x2="110" y2="120" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="140" y1="30" x2="110" y2="60" className="stroke-slate-400 dark:stroke-slate-600 stroke-[1.5]" />
                <line x1="60" y1="90" x2="140" y2="90" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" strokeDasharray="3 3" />
                <line x1="60" y1="90" x2="30" y2="120" className="stroke-slate-300 dark:stroke-slate-700 stroke-[1.5]" strokeDasharray="3 3" />

                {/* SKEW LINE 1: Front vertical edge (Red) */}
                <line x1="30" y1="50" x2="30" y2="130" className="stroke-rose-600 stroke-[3.5]" />
                <text x="14" y="90" className="text-[12px] font-black fill-rose-600">e</text>

                {/* SKEW LINE 2: Top-back horizontal edge (Teal) */}
                <line x1="50" y1="30" x2="155" y2="30" className="stroke-teal-600 stroke-[3.5]" />
                <text x="160" y="34" className="text-[12px] font-black fill-teal-600">f</text>
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'Két térbeli egyenes kitérő, ha nincs közös pontjuk és nem fekszenek egy síkban (nem párhuzamosak).' },
              { label: 'Példa', value: 'A kocka egy függőleges elülső éle és egy tőle távoli, vízszintes hátsó éle kitérő egymással.' }
            ]}
          />
        </div>

        <TheoryTrapBox
          title="Gyakori tévedés: Párhuzamos vs. Kitérő egyenesek"
          wrong="Ha két egyenesnek nincs közös pontja, akkor azok biztosan párhuzamosak."
          correct="A síkban ez igaz, de a térben azok az egyenesek is metszés nélküliek, amelyek kitérőek (külön síkokban futnak)!"
          explanation="Párhuzamosak csak akkor lehetnek, ha létezik olyan közös sík, amely mindkettőt tartalmazza."
        />
      </TheorySection>

      {/* SECTION 4: Szögek és Szögtípusok */}
      <TheorySection
        number={4}
        title="A szög fogalma és szögfajták"
        icon={<Shapes className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Egy pontból (<strong>szögcsúcs</strong>) kiinduló két félegyenes (<strong>szögszárak</strong>) a síkot két részre, egy <strong>konvex (domború)</strong> és egy <strong>konkáv (homorú)</strong> szögtartományra osztja.
        </p>

        {/* 7 Szögtípus vizuális rács */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {/* 1. Nullszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-slate-800 dark:text-white">Nullszög</div>
            <div className="text-[11px] font-mono font-bold text-slate-500">{"α = 0°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="20" y1="25" x2="85" y2="25" className="stroke-slate-600 stroke-[2.5]" />
                <circle cx="20" cy="25" r="3.5" className="fill-slate-800 dark:fill-white" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Szárak egybeesnek</div>
          </div>

          {/* 2. Hegyesszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-teal-700 dark:text-teal-300">Hegyesszög</div>
            <div className="text-[11px] font-mono font-bold text-teal-600">{"0° < α < 90°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="20" y1="40" x2="85" y2="40" className="stroke-teal-600 stroke-[2]" />
                <line x1="20" y1="40" x2="65" y2="10" className="stroke-teal-600 stroke-[2]" />
                <path d="M 40 40 A 20 20 0 0 0 35 27" fill="none" className="stroke-teal-500 stroke-[1.5]" />
                <circle cx="20" cy="40" r="3" className="fill-teal-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Kisebb a derékszögnél</div>
          </div>

          {/* 3. Derékszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-blue-700 dark:text-blue-300">Derékszög</div>
            <div className="text-[11px] font-mono font-bold text-blue-600">{"α = 90°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="25" y1="42" x2="85" y2="42" className="stroke-blue-600 stroke-[2]" />
                <line x1="25" y1="42" x2="25" y2="8" className="stroke-blue-600 stroke-[2]" />
                <rect x="25" y="30" width="12" height="12" fill="none" className="stroke-blue-500 stroke-[1.5]" />
                <circle cx="31" cy="36" r="1.5" className="fill-blue-600" />
                <circle cx="25" cy="42" r="3" className="fill-blue-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Egymásra merőleges szárak</div>
          </div>

          {/* 4. Tompaszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-amber-700 dark:text-amber-300">Tompaszög</div>
            <div className="text-[11px] font-mono font-bold text-amber-600">{"90° < α < 180°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="50" y1="40" x2="95" y2="40" className="stroke-amber-600 stroke-[2]" />
                <line x1="50" y1="40" x2="10" y2="15" className="stroke-amber-600 stroke-[2]" />
                <path d="M 70 40 A 20 20 0 0 0 35 28" fill="none" className="stroke-amber-500 stroke-[1.5]" />
                <circle cx="50" cy="40" r="3" className="fill-amber-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">90° és 180° között</div>
          </div>

          {/* 5. Egyenesszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-purple-700 dark:text-purple-300">Egyenesszög</div>
            <div className="text-[11px] font-mono font-bold text-purple-600">{"α = 180°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="10" y1="35" x2="90" y2="35" className="stroke-purple-600 stroke-[2]" />
                <path d="M 68 35 A 18 18 0 0 0 32 35" fill="none" className="stroke-purple-500 stroke-[1.5]" />
                <circle cx="50" cy="35" r="3" className="fill-purple-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Szárai egy egyenest alkotnak</div>
          </div>

          {/* 6. Homorú szög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 text-center space-y-1.5 shadow-2xs">
            <div className="font-bold text-xs text-rose-700 dark:text-rose-300">Homorú szög (Konkáv)</div>
            <div className="text-[11px] font-mono font-bold text-rose-600">{"180° < α < 360°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="50" y1="20" x2="90" y2="20" className="stroke-rose-600 stroke-[2]" />
                <line x1="50" y1="20" x2="25" y2="40" className="stroke-rose-600 stroke-[2]" />
                <path d="M 68 20 A 18 18 0 1 1 37 32" fill="none" className="stroke-rose-500 stroke-[1.5]" />
                <circle cx="50" cy="20" r="3" className="fill-rose-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Nagyobb az egyenesszögnél</div>
          </div>

          {/* 7. Teljesszög */}
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 text-center space-y-1.5 shadow-2xs col-span-2 sm:col-span-1">
            <div className="font-bold text-xs text-emerald-700 dark:text-emerald-300">Teljesszög</div>
            <div className="text-[11px] font-mono font-bold text-emerald-600">{"α = 360°"}</div>
            <div className="h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-24 h-12">
                <line x1="50" y1="25" x2="90" y2="25" className="stroke-emerald-600 stroke-[2]" />
                <circle cx="50" cy="25" r="14" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
                <circle cx="50" cy="25" r="3" className="fill-emerald-700" />
              </svg>
            </div>
            <div className="text-[10px] text-slate-500">Egy teljes fordulat</div>
          </div>
        </div>

        {/* Összefoglaló táblázat */}
        <TheoryTable
          title="Szögtípusok határértékei és tartományai"
          headers={['Szögtípus', 'Foktartomány (α)', 'Szögtartomány fajtája', 'Főbb jellemző']}
          rows={[
            ['Nullszög', 'α = 0°', 'Elfajuló', 'A két szár egybeesik'],
            ['Hegyesszög', '0° < α < 90°', 'Konvex (domború)', 'Kisebb, mint a derékszög'],
            ['Derékszög', 'α = 90°', 'Konvex (domború)', 'Szárai merőlegesek egymásra'],
            ['Tompaszög', '90° < α < 180°', 'Konvex (domború)', 'Derékszögnél nagyobb, egyenesszögnél kisebb'],
            ['Egyenesszög', 'α = 180°', 'Konvex (domború)', 'Szárai egy egyenest alkotnak'],
            ['Homorú szög', '180° < α < 360°', 'Konkáv (nem konvex)', 'Nagyobb a félfordulatnál (180°-nál)'],
            ['Teljesszög', 'α = 360°', 'Teljes sík', 'Egy teljes 360 fokos fordulat']
          ]}
        />
      </TheorySection>

      {/* SECTION 5: Interaktív Szöglabor */}
      <TheorySection
        number={5}
        title="Interaktív Szög- és Fokszabályozó Labor"
        icon={<Target className="w-5 h-5 text-teal-600" />}
        badgeColor="teal"
      >
        <Card className="border-2 border-teal-200 dark:border-teal-900/60 bg-teal-50/20 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs">
          <CardContent className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Dynamic Visual SVG */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm">
                <svg viewBox="0 0 240 200" className="w-full h-44">
                  {/* Base Horizontal Ray (0 deg) */}
                  <line x1={centerX} y1={centerY} x2={centerX + radius + 15} y2={centerY} className="stroke-slate-700 dark:stroke-slate-300 stroke-[2.5]" />
                  <circle cx={centerX} cy={centerY} r="5" className="fill-teal-600" />
                  <text x={centerX - 15} y={centerY + 5} className="text-[12px] font-mono font-black fill-teal-700 dark:fill-teal-300">O</text>

                  {/* Rotated Ray */}
                  <line x1={centerX} y1={centerY} x2={rayX} y2={rayY} className="stroke-teal-600 stroke-[2.5]" />

                  {/* Angle Arc */}
                  {interactiveAngle > 0 && interactiveAngle < 360 && (
                    <path
                      d={`M ${centerX + arcRadius} ${centerY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcX} ${arcY}`}
                      fill={interactiveAngle > 180 ? "rgba(244, 63, 94, 0.15)" : "rgba(20, 184, 166, 0.15)"}
                      className={interactiveAngle > 180 ? "stroke-rose-500 stroke-[2]" : "stroke-teal-500 stroke-[2]"}
                    />
                  )}

                  {interactiveAngle === 360 && (
                    <circle cx={centerX} cy={centerY} r={arcRadius} fill="rgba(16, 185, 129, 0.15)" className="stroke-emerald-500 stroke-[2]" />
                  )}

                  {/* Degree Label */}
                  <text x="120" y="185" textAnchor="middle" className="text-[16px] font-mono font-black fill-slate-900 dark:fill-white">
                    α = {interactiveAngle}°
                  </text>
                </svg>
              </div>

              {/* Right: Controls & Details */}
              <div className="flex-1 w-full space-y-4 text-left">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Szögmérték kiválasztása</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-mono font-black text-teal-600 dark:text-teal-400">
                      {interactiveAngle}°
                    </span>
                    <span className={cn("text-base font-black", currentAngleInfo.color)}>
                      ({currentAngleInfo.name})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {currentAngleInfo.desc}
                  </p>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500 font-bold font-mono">
                    <span>0°</span>
                    <span>90°</span>
                    <span>180°</span>
                    <span>270°</span>
                    <span>360°</span>
                  </div>
                  <Slider
                    value={[interactiveAngle]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(val) => setInteractiveAngle(val[0])}
                    className="cursor-pointer"
                  />
                </div>

                {/* Preset Quick Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: '0°', val: 0 },
                    { label: '45°', val: 45 },
                    { label: '90° (Derék)', val: 90 },
                    { label: '135°', val: 135 },
                    { label: '180° (Egyenes)', val: 180 },
                    { label: '240° (Homorú)', val: 240 },
                    { label: '360° (Teljes)', val: 360 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setInteractiveAngle(preset.val)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border',
                        interactiveAngle === preset.val
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* SECTION 6: A szög finomabb mértékegységei: Szögperc és Szögmásodperc */}
      <TheorySection
        number={6}
        title="A szög finomabb mértékegységei: Szögperc (') és Szögmásodperc ('')"
        icon={<Clock className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A mindennapi életben és az egyszerű rajzokon a <strong>fok (°)</strong> elegendő pontosságot ad. Azonban ha a Föld felszínén navigálunk (GPS, hajózás, repülés), csillagászati égitesteket észlelünk, vagy geodéziai földmérést végzünk, az 1° hatalmas távolságot jelent: a Föld egyenlítőjén <strong>1° elmozdulás több mint 111 kilométer</strong>! Ezért az 1 fokot – az órához hasonlóan – 60 kisebb egységre, <strong>szögpercre (')</strong>, a szögpercet pedig további 60 <strong>szögmásodpercre ('')</strong> osztjuk.
        </p>

        {/* Főtétel Kiemelés */}
        <TheoryCallout variant="indigo" title="A 60-as (szexagezimális) számrendszer alapszabálya">
          <div className="space-y-1.5 font-medium">
            <div className="text-sm font-mono font-black text-indigo-900 dark:text-indigo-200">
              1° = 60' (egy fok = hatvan szögperc)
            </div>
            <div className="text-sm font-mono font-black text-teal-800 dark:text-teal-300">
              1' = 60'' (egy szögperc = hatvan szögmásodperc)
            </div>
            <div className="text-sm font-mono font-black text-purple-900 dark:text-purple-300">
              1° = 60 · 60'' = 3600'' (egy fok = háromezer-hatszáz szögmásodperc)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
              💡 <strong>Óra-analógia:</strong> Pontosan úgy számolunk, mint az időmérésnél: <strong>1 óra = 60 perc = 3600 másodperc</strong>. Az ókori babiloniak vezették be a 60-as számrendszert, mert a 60 rengeteg számmal (2, 3, 4, 5, 6, 10, 12, 15, 20, 30) maradék nélkül osztható!
            </p>
          </div>
        </TheoryCallout>

        {/* 🌟 GYÖNYÖRŰ VIZUÁLIS INFOGRAFIKA: 3 LÉPCSŐS SZÖG-NAGYÍTÓ 🌟 */}
        <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-slate-800 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <ZoomIn className="w-3.5 h-3.5" />
                Vizuális Szemléltetés • 3 Lépcsős Mikroszkóp
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                A fok hierarchikus kibontása: 1° ➔ 60' ➔ 3600''
              </h4>
            </div>
            <div className="text-xs text-slate-500 font-mono font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              Váltószám: <span className="text-indigo-600 dark:text-indigo-400 font-black">×60</span> és <span className="text-indigo-600 dark:text-indigo-400 font-black">×3600</span>
            </div>
          </div>

          {/* Master Responsive Panoramic SVG Diagram */}
          <div className="overflow-x-auto pb-2">
            <svg viewBox="0 0 960 360" className="w-full min-w-[760px] h-auto select-none">
              <defs>
                <linearGradient id="amberZoomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="tealZoomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
                </linearGradient>
                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* PANEL 1: Teljes Kör és 1° */}
              <rect x="20" y="20" width="280" height="275" rx="20" className="fill-white/80 dark:fill-slate-850/90 stroke-amber-200 dark:stroke-amber-900/60" strokeWidth="2" />
              <rect x="35" y="32" width="165" height="22" rx="7" className="fill-amber-100 dark:fill-amber-950/60" />
              <text x="44" y="47" className="text-[11px] font-mono font-black fill-amber-800 dark:fill-amber-300">1. SZINT • 1 FOK (1°)</text>

              {/* Dial in Panel 1 */}
              <g transform="translate(145, 155)">
                {/* Dial circle */}
                <circle cx="0" cy="0" r="62" className="fill-amber-50/30 dark:fill-amber-950/20 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                {/* Major ticks */}
                <line x1="0" y1="-62" x2="0" y2="-52" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                <line x1="0" y1="62" x2="0" y2="52" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                <line x1="-62" y1="0" x2="-52" y2="0" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                <line x1="62" y1="0" x2="52" y2="0" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />

                {/* Sub-ticks */}
                {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => {
                  const rRad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={deg}
                      x1={56 * Math.cos(rRad)}
                      y1={56 * Math.sin(rRad)}
                      x2={62 * Math.cos(rRad)}
                      y2={62 * Math.sin(rRad)}
                      className="stroke-slate-300 dark:stroke-slate-700"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dial labels */}
                <text x="0" y="-40" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">90°</text>
                <text x="-38" y="3" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">180°</text>
                <text x="0" y="47" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">270°</text>
                <text x="38" y="3" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">0°/360°</text>

                {/* Center point */}
                <circle cx="0" cy="0" r="3" className="fill-amber-600" />

                {/* 1° Highlighted slice (drawn with slight visual expansion ~3° for clear visibility) */}
                <path d="M 0 0 L 62 0 A 62 62 0 0 0 61.9 -3.5 Z" className="fill-amber-500 stroke-amber-600" strokeWidth="1.5" filter="url(#glowGold)" />

                {/* Magnifier lens over 1° slice */}
                <circle cx="62" cy="-2" r="16" fill="none" className="stroke-amber-500 stroke-[2]" strokeDasharray="3 2" />
                <line x1="74" y1="10" x2="88" y2="24" className="stroke-amber-600 stroke-[2.5]" strokeLinecap="round" />
              </g>

              {/* Panel 1 Footer Note */}
              <text x="145" y="245" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100">1 Teljes Fordulat = 360°</text>
              <text x="145" y="262" textAnchor="middle" className="text-[10px] fill-slate-500 dark:text-slate-400">1° = a teljes kör 1/360-ad része</text>
              <text x="145" y="278" textAnchor="middle" className="text-[9px] font-mono fill-amber-700 dark:fill-amber-400 font-bold">Földön: ~111,3 km az Egyenlítőn</text>

              {/* EXPANDING ZOOM CONE 1: Panel 1 -> Panel 2 */}
              <polygon points="225,140 338,80 338,230 225,170" fill="url(#amberZoomGrad)" />
              <line x1="225" y1="140" x2="338" y2="80" className="stroke-amber-500 stroke-[1.5]" strokeDasharray="4 3" />
              <line x1="225" y1="170" x2="338" y2="230" className="stroke-amber-500 stroke-[1.5]" strokeDasharray="4 3" />
              <rect x="252" y="142" width="60" height="22" rx="6" className="fill-white dark:fill-slate-800 stroke-amber-300 dark:stroke-amber-700" strokeWidth="1" />
              <text x="282" y="157" textAnchor="middle" className="text-[10px] font-mono font-black fill-amber-700 dark:fill-amber-300">60× nagyítás</text>

              {/* PANEL 2: Szögperc (1') */}
              <rect x="340" y="20" width="280" height="275" rx="20" className="fill-white/80 dark:fill-slate-850/90 stroke-teal-200 dark:stroke-teal-900/60" strokeWidth="2" />
              <rect x="355" y="32" width="185" height="22" rx="7" className="fill-teal-100 dark:fill-teal-950/60" />
              <text x="364" y="47" className="text-[11px] font-mono font-black fill-teal-800 dark:fill-teal-300">2. SZINT • 1 SZÖGPERC (1')</text>

              {/* Large Sector in Panel 2 representing 1° opened into 60 minutes */}
              <g transform="translate(370, 155)">
                {/* Sector Background spanning -30° to +30° */}
                <path
                  d="M 0 0 L 125 -65 A 140 140 0 0 1 125 65 Z"
                  className="fill-teal-50/50 dark:fill-teal-950/30 stroke-teal-300 dark:stroke-teal-800"
                  strokeWidth="1.5"
                />

                {/* Sector center point */}
                <circle cx="0" cy="0" r="4" className="fill-teal-600" />
                <text x="-8" y="4" textAnchor="end" className="text-[9px] font-mono font-bold fill-slate-400">Csúcs</text>

                {/* Minute Ticks along the arc */}
                {/* 0' Tick (bottom) */}
                <line x1="125" y1="65" x2="114" y2="59" className="stroke-teal-600 stroke-[2]" />
                <text x="133" y="70" className="text-[9px] font-mono font-bold fill-teal-700 dark:fill-teal-300">0'</text>

                {/* 15' Tick */}
                <line x1="135" y1="35" x2="124" y2="32" className="stroke-slate-400 stroke-[1.5]" />
                <text x="142" y="38" className="text-[9px] font-mono font-bold fill-slate-500">15' (¼°)</text>

                {/* 30' Tick (Middle - Half Degree) */}
                <line x1="140" y1="0" x2="126" y2="0" className="stroke-teal-600 stroke-[2.5]" />
                <text x="146" y="4" className="text-[10px] font-mono font-black fill-teal-700 dark:fill-teal-300">30' = 0,5°</text>

                {/* 45' Tick */}
                <line x1="135" y1="-35" x2="124" y2="-32" className="stroke-slate-400 stroke-[1.5]" />
                <text x="142" y="-32" className="text-[9px] font-mono font-bold fill-slate-500">45' (¾°)</text>

                {/* 60' Tick (top) */}
                <line x1="125" y1="-65" x2="114" y2="-59" className="stroke-teal-600 stroke-[2]" />
                <text x="133" y="-62" className="text-[9px] font-mono font-bold fill-teal-700 dark:fill-teal-300">60' = 1°</text>

                {/* Highlighting 1 single arcminute at the 0' edge */}
                <path d="M 0 0 L 125 65 A 140 140 0 0 0 127 58 Z" className="fill-teal-500 stroke-teal-600" strokeWidth="1.5" />

                {/* Lens over 1' slice */}
                <circle cx="126" cy="61" r="14" fill="none" className="stroke-teal-500 stroke-[2]" strokeDasharray="3 2" />
                <line x1="136" y1="71" x2="148" y2="83" className="stroke-teal-600 stroke-[2.5]" strokeLinecap="round" />
              </g>

              {/* Panel 2 Footer Note */}
              <text x="480" y="245" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100">1° = 60' (Szögperc)</text>
              <text x="480" y="262" textAnchor="middle" className="text-[10px] fill-slate-500 dark:text-slate-400">1' = (1/60)° ≈ 0,0167° • Fél fok = 30'</text>
              <text x="480" y="278" textAnchor="middle" className="text-[9px] font-mono fill-teal-700 dark:fill-teal-400 font-bold">1 tengeri mérföld (1852 m) a Földön</text>

              {/* EXPANDING ZOOM CONE 2: Panel 2 -> Panel 3 */}
              <polygon points="545,140 658,80 658,230 545,170" fill="url(#tealZoomGrad)" />
              <line x1="545" y1="140" x2="658" y2="80" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="4 3" />
              <line x1="545" y1="170" x2="658" y2="230" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="4 3" />
              <rect x="568" y="142" width="68" height="22" rx="6" className="fill-white dark:fill-slate-800 stroke-teal-300 dark:stroke-teal-700" strokeWidth="1" />
              <text x="602" y="157" textAnchor="middle" className="text-[10px] font-mono font-black fill-teal-700 dark:fill-teal-300">60× (össz: 3600×)</text>

              {/* PANEL 3: Szögmásodperc (1'') */}
              <rect x="660" y="20" width="280" height="275" rx="20" className="fill-white/80 dark:fill-slate-850/90 stroke-indigo-200 dark:stroke-indigo-900/60" strokeWidth="2" />
              <rect x="675" y="32" width="220" height="22" rx="7" className="fill-indigo-100 dark:fill-indigo-950/60" />
              <text x="684" y="47" className="text-[11px] font-mono font-black fill-indigo-800 dark:fill-indigo-300">3. SZINT • 1 SZÖGMÁSODPERC (1'')</text>

              {/* Large Sector in Panel 3 representing 1' opened into 60 seconds */}
              <g transform="translate(690, 155)">
                {/* Sector Background */}
                <path
                  d="M 0 0 L 125 -65 A 140 140 0 0 1 125 65 Z"
                  className="fill-indigo-50/50 dark:fill-indigo-950/30 stroke-indigo-300 dark:stroke-indigo-800"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="4" className="fill-indigo-600" />
                <text x="-8" y="4" textAnchor="end" className="text-[9px] font-mono font-bold fill-slate-400">Csúcs</text>

                {/* Second Ticks along the arc */}
                <line x1="125" y1="65" x2="114" y2="59" className="stroke-indigo-600 stroke-[2]" />
                <text x="133" y="70" className="text-[9px] font-mono font-bold fill-indigo-700 dark:fill-indigo-300">0''</text>

                <line x1="135" y1="35" x2="124" y2="32" className="stroke-slate-400 stroke-[1.5]" />
                <text x="142" y="38" className="text-[9px] font-mono font-bold fill-slate-500">15'' (¼')</text>

                <line x1="140" y1="0" x2="126" y2="0" className="stroke-indigo-600 stroke-[2.5]" />
                <text x="146" y="4" className="text-[10px] font-mono font-black fill-indigo-700 dark:fill-indigo-300">30'' = 0,5'</text>

                <line x1="135" y1="-35" x2="124" y2="-32" className="stroke-slate-400 stroke-[1.5]" />
                <text x="142" y="-32" className="text-[9px] font-mono font-bold fill-slate-500">45'' (¾')</text>

                <line x1="125" y1="-65" x2="114" y2="-59" className="stroke-indigo-600 stroke-[2]" />
                <text x="133" y="-62" className="text-[9px] font-mono font-bold fill-indigo-700 dark:fill-indigo-300">60'' = 1'</text>

                {/* Highlight 1 single arcsecond */}
                <path d="M 0 0 L 125 65 A 140 140 0 0 0 127 58 Z" className="fill-indigo-500 stroke-indigo-600" strokeWidth="1.5" />
              </g>

              {/* Panel 3 Footer Note */}
              <text x="800" y="245" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100">1' = 60'' (Szögmásodperc)</text>
              <text x="800" y="262" textAnchor="middle" className="text-[10px] fill-slate-500 dark:text-slate-400">1° = 3600'' • 1'' = (1/3600)° ≈ 0,000278°</text>
              <text x="800" y="278" textAnchor="middle" className="text-[9px] font-mono fill-indigo-700 dark:fill-indigo-400 font-bold">Földön: ~30,9 méter pontosság</text>

              {/* BOTTOM MASTER SUMMARY FORMULA BAR */}
              <rect x="20" y="305" width="920" height="42" rx="14" className="fill-slate-100/90 dark:fill-slate-800/90 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />

              {/* Formula Badge 1 (Degree) */}
              <g transform="translate(60, 314)">
                <rect x="0" y="0" width="240" height="24" rx="8" className="fill-amber-50 dark:fill-amber-950/50 stroke-amber-300 dark:stroke-amber-800" />
                <text x="120" y="16" textAnchor="middle" className="text-[11px] font-mono font-black fill-amber-800 dark:fill-amber-300">
                  1° = 60' = 3600'' (1 fok)
                </text>
              </g>

              {/* Formula Badge 2 (Arcminute) */}
              <g transform="translate(360, 314)">
                <rect x="0" y="0" width="240" height="24" rx="8" className="fill-teal-50 dark:fill-teal-950/50 stroke-teal-300 dark:stroke-teal-800" />
                <text x="120" y="16" textAnchor="middle" className="text-[11px] font-mono font-black fill-teal-800 dark:fill-teal-300">
                  1' = 60'' = (1/60)° (1 szögperc)
                </text>
              </g>

              {/* Formula Badge 3 (Arcsecond) */}
              <g transform="translate(660, 314)">
                <rect x="0" y="0" width="240" height="24" rx="8" className="fill-indigo-50 dark:fill-indigo-950/50 stroke-indigo-300 dark:stroke-indigo-800" />
                <text x="120" y="16" textAnchor="middle" className="text-[11px] font-mono font-black fill-indigo-800 dark:fill-indigo-300">
                  1'' = (1/60)' = (1/3600)° (1 másodperc)
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 3 KÁRTYÁS RÉSZLETES ÖSSZEFOGLALÓ (Minden eszközre optimalizálva) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {/* 1. Fok */}
          <TheoryCard
            title="1. A Fok (°)"
            badge="1 teljes kör = 360°"
            variant="amber"
            figure={
              <svg viewBox="0 0 160 70" className="w-full h-18">
                <circle cx="80" cy="35" r="28" className="fill-amber-50/40 dark:fill-amber-950/20 stroke-amber-500 stroke-[1.5]" />
                <path d="M 80 35 L 108 35 A 28 28 0 0 0 106 20 Z" className="fill-amber-500 stroke-amber-600" />
                <circle cx="80" cy="35" r="2" className="fill-amber-700" />
                <text x="114" y="28" className="text-[11px] font-mono font-black fill-amber-700 dark:fill-amber-300">1°</text>
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'A teljes kör (360°) 1/360-ad része.' },
              { label: 'Váltószám', value: "1° = 60' = 3600''" },
              { label: 'Földi ívhossz', value: 'Egyenlítőn kb. 111,3 km' },
              { label: 'Nevezetes szögek', value: 'Derékszög = 90°, Egyenesszög = 180°' }
            ]}
          />

          {/* 2. Szögperc */}
          <TheoryCard
            title="2. A Szögperc (')"
            badge="1° = 60'"
            variant="teal"
            figure={
              <svg viewBox="0 0 160 70" className="w-full h-18">
                {/* Visual clock-like arc showing 60 parts */}
                <path d="M 40 50 L 120 50 A 60 60 0 0 0 85 8 Z" className="fill-teal-50/40 dark:fill-teal-950/20 stroke-teal-500 stroke-[1.5]" />
                <line x1="40" y1="50" x2="120" y2="50" className="stroke-teal-600 stroke-[2]" />
                <line x1="40" y1="50" x2="85" y2="8" className="stroke-teal-600 stroke-[2]" />
                {/* Middle 30' line */}
                <line x1="40" y1="50" x2="108" y2="23" className="stroke-teal-400 stroke-[1.5]" strokeDasharray="2 2" />
                <text x="112" y="24" className="text-[9px] font-mono font-bold fill-teal-600">30' (fél fok)</text>
                <text x="75" y="44" className="text-[11px] font-mono font-black fill-teal-700 dark:fill-teal-300">1' = (1/60)°</text>
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'Az 1°-os szög 1/60-ad része.' },
              { label: 'Váltószám', value: "1' = 60'' = (1/60)° ≈ 0,0167°" },
              { label: 'Földi ívhossz', value: 'Pontosan 1 tengeri mérföld (1852 m)!' },
              { label: 'Fontos törtek', value: "0,5° = 30',  0,25° = 15',  0,75° = 45'" }
            ]}
          />

          {/* 3. Szögmásodperc */}
          <TheoryCard
            title="3. A Szögmásodperc ('')"
            badge="1' = 60'' • 1° = 3600''"
            variant="indigo"
            figure={
              <svg viewBox="0 0 160 70" className="w-full h-18">
                <path d="M 30 55 L 130 55 A 75 75 0 0 0 95 12 Z" className="fill-indigo-50/40 dark:fill-indigo-950/20 stroke-indigo-500 stroke-[1.5]" />
                <line x1="30" y1="55" x2="130" y2="55" className="stroke-indigo-600 stroke-[2]" />
                <line x1="30" y1="55" x2="95" y2="12" className="stroke-indigo-600 stroke-[2]" />
                <text x="80" y="48" className="text-[10px] font-mono font-black fill-indigo-700 dark:fill-indigo-300">1'' = (1/60)'</text>
                <text x="80" y="32" className="text-[9px] font-mono fill-slate-500">1° = 3600''</text>
              </svg>
            }
            properties={[
              { label: 'Definíció', value: 'Az 1 szögperc 1/60-ad része.' },
              { label: 'Váltószám', value: "1'' = (1/60)' = (1/3600)° ≈ 0,000278°" },
              { label: 'Földi ívhossz', value: 'Az Egyenlítőn kb. 30,9 méter' },
              { label: 'Felhasználás', value: 'GPS navigáció, csillagászat, optika' }
            ]}
          />
        </div>

        {/* INTERAKTÍV SZÖG-ÁTVÁLTÓ ÉS TIZEDESTÖRT KALKULÁTOR */}
        <Card className="border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs mt-3">
          <CardContent className="p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-indigo-100 dark:border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  Interaktív Szögmérték Átváltó (Tizedesfok ⟷ Fok, Szögperc, Szögmásodperc)
                </h4>
                <p className="text-xs text-slate-500">
                  Mozgasd a csúszkát vagy válassz egy tipikus szöget, és figyeld meg az azonnali felbontást!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Bal oldal: Csúszka és vezérlők */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Tizedes tört alakban megadott szög:
                  </div>
                  <div className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {decimalAngleInput.toFixed(2)}°
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500 font-bold font-mono">
                    <span>0°</span>
                    <span>22,5°</span>
                    <span>45°</span>
                    <span>67,5°</span>
                    <span>90°</span>
                  </div>
                  <Slider
                    value={[decimalAngleInput]}
                    min={0}
                    max={90}
                    step={0.05}
                    onValueChange={(val) => setDecimalAngleInput(Number(val[0].toFixed(2)))}
                    className="cursor-pointer"
                  />
                </div>

                {/* Preset gombok */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-1.5">Gyakori iskolai és gyakorlati értékek:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "0,5° (30' fél fok)", val: 0.5 },
                      { label: "0,25° (15' negyed)", val: 0.25 },
                      { label: "0,75° (45' háromnegyed)", val: 0.75 },
                      { label: "12,5° (12° 30')", val: 12.5 },
                      { label: "35,75° (35° 45')", val: 35.75 },
                      { label: "45,2° (45° 12')", val: 45.2 },
                      { label: "78,1° (78° 06')", val: 78.1 }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        onClick={() => setDecimalAngleInput(preset.val)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border',
                          Math.abs(decimalAngleInput - preset.val) < 0.01
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jobb oldal: Eredmény és Lépésről-lépésre levezetés kártya */}
              <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pontos felbontás (Fok, Perc, Másodperc):
                </div>

                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                    {dms.d}° {dms.m}' {dms.s}''
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                    Összesen: <span className="font-bold text-indigo-600 dark:text-indigo-400">{dms.totalSeconds.toLocaleString('hu-HU')}''</span> (szögmásodperc)
                  </div>
                </div>

                {/* Számítási lépések */}
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="font-bold text-slate-500">1. Egész fok:</span>
                    <span className="font-mono font-black text-amber-600">{dms.d}°</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="font-bold text-slate-500">2. Tizedes rész × 60:</span>
                    <span className="font-mono font-bold text-teal-600">
                      {(decimalAngleInput - dms.d).toFixed(3)} × 60 = {((decimalAngleInput - dms.d) * 60).toFixed(2)}' → <strong className="text-teal-700">{dms.m}'</strong>
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80">
                    <span className="font-bold text-slate-500">3. Maradék szögmásodperc:</span>
                    <span className="font-mono font-bold text-indigo-600">
                      {dms.s}''
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MŰVELETEK SZÖGEKKEL (Összeadás és Kivonás Lépésről Lépésre) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Műveletek Szögekkel: Összeadás és Kivonás Átváltással
            </h4>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
            {/* Navigációs fülek a három mintapéldához */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <button
                onClick={() => setActiveCalcTab('add')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                  activeCalcTab === 'add'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                )}
              >
                1. Összeadás átváltással: 38° 45' + 24° 35'
              </button>
              <button
                onClick={() => setActiveCalcTab('sub90')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                  activeCalcTab === 'sub90'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                )}
              >
                2. Kivonás 90°-ból (Pótszög): 90° - 32° 24'
              </button>
              <button
                onClick={() => setActiveCalcTab('sub180')}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                  activeCalcTab === 'sub180'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-purple-400'
                )}
              >
                3. Kivonás 180°-ból (Másodpercekkel): 180° - 114° 35' 42''
              </button>
            </div>

            {/* TAB 1: Összeadás */}
            {activeCalcTab === 'add' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Feladat:</strong> Számítsuk ki a <span className="font-mono font-bold text-teal-700 dark:text-teal-300">38° 45' + 24° 35'</span> összeget!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-400">1. Lépés: Fokok összege</div>
                    <div className="text-sm font-mono font-black text-slate-900 dark:text-white mt-1">38° + 24° = 62°</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-400">2. Lépés: Percek összege</div>
                    <div className="text-sm font-mono font-black text-teal-600 mt-1">45' + 35' = 80'</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                    <div className="font-bold text-amber-700 dark:text-amber-300">3. Lépés: Átváltás (80' ≥ 60')</div>
                    <div className="text-sm font-mono font-black text-amber-800 dark:text-amber-200 mt-1">80' = 60' + 20' = 1° 20'</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">4. Végeredmény</div>
                    <div className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-200 mt-1">62° + 1° 20' = 63° 20'</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Kivonás 90-ből */}
            {activeCalcTab === 'sub90' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Feladat:</strong> Számítsuk ki egy 32° 24'-es hegyesszög derékszögre való kiegészítő szögét (pótszögét): <span className="font-mono font-bold text-blue-700 dark:text-blue-300">90° - 32° 24'</span>!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                    <div className="font-bold text-amber-700 dark:text-amber-300">1. Lépés: Kölcsönkérés / Átváltás</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">0 percből nem vonhatunk ki 24-et, ezért 1 fokot átváltunk percekre:</p>
                    <div className="text-sm font-mono font-black text-amber-800 dark:text-amber-200 mt-1">90° = 89° 60'</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-400">2. Lépés: Oszlopos kivonás</div>
                    <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-1 space-y-0.5">
                      <div>Fokok: 89° - 32° = 57°</div>
                      <div>Percek: 60' - 24' = 36'</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">3. Végeredmény</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">A keresett pótszög nagysága:</p>
                    <div className="text-base font-mono font-black text-emerald-800 dark:text-emerald-200 mt-1">57° 36'</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Kivonás 180-ból másodpercekkel */}
            {activeCalcTab === 'sub180' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Feladat:</strong> Számítsuk ki egy 114° 35' 42''-es szög egyenesszögre (180°-ra) való kiegészítő szögét!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                    <div className="font-bold text-purple-700 dark:text-purple-300">1. Kettős átváltás</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">180°-ból 1 fokot perccé, majd 1 percet másodperccé alakítunk:</p>
                    <div className="text-sm font-mono font-black text-purple-800 dark:text-purple-200 mt-1">180° = 179° 59' 60''</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-400">2. Lépésenkénti kivonás</div>
                    <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-1 space-y-0.5">
                      <div>179° - 114° = 65°</div>
                      <div>59' - 35' = 24'</div>
                      <div>60'' - 42'' = 18''</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">3. Végeredmény</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Összeállítva a komponenseket:</p>
                    <div className="text-base font-mono font-black text-emerald-800 dark:text-emerald-200 mt-1">65° 24' 18''</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GYAKORLATI ALKALMAZÁSOK (Valós életi példák) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Hol Találkozunk Szögpercekkel és Szögmásodpercekkel a Valóságban?
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* GPS Koordináták */}
            <div className="p-3.5 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <div className="font-bold text-xs text-slate-900 dark:text-white">Földrajzi GPS pontok</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A Föld szélességi és hosszúsági körei fokban, percben és másodpercben mérnek. Pl. a budapesti Lánchíd koordinátái:
              </p>
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950/50 rounded-lg font-mono text-[11px] font-black text-blue-700 dark:text-blue-300 text-center">
                É 47° 29' 56'' • K 19° 02' 37''
              </div>
            </div>

            {/* Tengeri Mérföld */}
            <div className="p-3.5 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <div className="font-bold text-xs text-slate-900 dark:text-white">A Tengeri Mérföld (1 NM)</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Miért pont 1852 méter a tengeri mérföld? Mert a Föld egyenlítőjén pontosan <strong>1 szögpercnyi (1')</strong> ívhossz felel meg 1852 méter távolságnak!
              </p>
              <div className="p-1.5 bg-teal-50 dark:bg-teal-950/50 rounded-lg font-mono text-[11px] font-black text-teal-700 dark:text-teal-300 text-center">
                1 szögperc ív = 1 NM ≈ 1852 m
              </div>
            </div>

            {/* Csillagászat: Telihold */}
            <div className="p-3.5 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                <div className="font-bold text-xs text-slate-900 dark:text-white">A Telihold Mérete</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bár hatalmasnak tűnik, az égbolton a Nap és a Telihold látszólagos átmérője mindössze kb. <strong>31' – 32'</strong> (alig több mint fél fok!).
              </p>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/50 rounded-lg font-mono text-[11px] font-black text-amber-700 dark:text-amber-300 text-center">
                Hold látszó átmérője ≈ 31'
              </div>
            </div>

            {/* Távcsövek és MOA */}
            <div className="p-3.5 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-purple-600" />
                <div className="font-bold text-xs text-slate-900 dark:text-white">Optika & MOA Skála</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A csillagászati és céltávcsöveknél a látómező felbontását <strong>MOA (Minute of Angle = 1 szögperc)</strong> egységben mérik.
              </p>
              <div className="p-1.5 bg-purple-50 dark:bg-purple-950/50 rounded-lg font-mono text-[11px] font-black text-purple-700 dark:text-purple-300 text-center">
                1 MOA = 1' szögpontosság
              </div>
            </div>
          </div>
        </div>

        {/* GYAKORI CSAPDÁK ÉS TÉVHITEK */}
        <TheoryTrapBox
          title="Tipikus Vizsgacsapdák: A 100-as és a 60-as számrendszer összekeverése"
          wrong="0,5° = 5' vagy 0,5° = 50' (mert a tizedeseknél 5-ös van)."
          correct="0,5° = fél fok = 30', mert 1° = 60'!"
          explanation="Soha ne használj 100-as váltószámot szögperceknél! 0,5° fele a 60-nak, azaz pontosan 30'. Hasonlóan 0,25° = 15', 0,75° = 45', és 0,1° = 6'."
        />

        {/* ÖSSZEFOGLALÓ ÁTVÁLTÁSI TÁBLÁZAT */}
        <TheoryTable
          title="Gyakori szögértékek gyors átváltása és megfeleltetése"
          headers={['Tizedesfok (°)', 'Fok és Szögperc', 'Szögmásodpercben', 'Tört alak', 'Gyakorlati szemlélet']}
          rows={[
            ['1,00°', "1° 00'", "3600''", '1°', 'Egész fok'],
            ['0,75°', "45'", "2700''", '¾°', 'Háromnegyed fok'],
            ['0,50°', "30'", "1800''", '½°', 'Fél fok (a Telihold mérete kb. 31\')'],
            ['0,25°', "15'", "900''", '¼°', 'Negyed fok'],
            ['0,10°', "6'", "360''", '1/10°', 'Egytized fok'],
            ['0,0167°', "1'", "60''", '1/60°', '1 szögperc (1 tengeri mérföld a Földön)'],
            ['0,000278°', "1''", "1''", '1/3600°', '1 szögmásodperc (~31 méter a Földön)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

