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
  Ruler
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
      subtitle="Alapfogalmak (pont, egyenes, sík, tér), félegyenes, szakasz, távolságok, egyenesek kölcsönös helyzete és a szögek rendszere"
      quickRule={{
        label: 'Axióma & Szögtípusok',
        formula: '2 pont → 1 egyenes,  3 nem kollineáris pont → 1 sík'
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
    </TheoryTemplate>
  );
};
