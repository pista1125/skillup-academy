import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  ClipboardList,
  BarChart2,
  PieChart,
  CheckCircle2,
  ListPlus,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Search,
  Eye,
  Sliders,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface DataCollectionTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const DataCollectionTheory: React.FC<DataCollectionTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // =========================================================================
  // Interaktív Strigulázó Szimulátor
  // =========================================================================
  interface TransportCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
    color: string;
  }

  const [categories, setCategories] = useState<TransportCategory[]>([
    { id: 'walk', name: 'Gyalog', icon: '🚶', count: 7, color: '#06b6d4' },
    { id: 'bike', name: 'Biciklivel', icon: '🚲', count: 5, color: '#10b981' },
    { id: 'bus', name: 'Busszal / BKV', icon: '🚌', count: 9, color: '#3b82f6' },
    { id: 'car', name: 'Autóval', icon: '🚗', count: 4, color: '#8b5cf6' }
  ]);

  const totalVotes = categories.reduce((sum, c) => sum + c.count, 0);

  const addVote = (id: string) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, count: c.count + 1 } : c))
    );
  };

  const resetVotes = () => {
    setCategories([
      { id: 'walk', name: 'Gyalog', icon: '🚶', count: 0, color: '#06b6d4' },
      { id: 'bike', name: 'Biciklivel', icon: '🚲', count: 0, color: '#10b981' },
      { id: 'bus', name: 'Busszal / BKV', icon: '🚌', count: 0, color: '#3b82f6' },
      { id: 'car', name: 'Autóval', icon: '🚗', count: 0, color: '#8b5cf6' }
    ]);
  };

  // Strigula (ötös köteg) kirajzoló segédfüggvény SVG-ben
  const renderTallySvg = (count: number) => {
    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;

    return (
      <div className="flex flex-wrap items-center gap-2">
        {/* Teljes 5-ös kötegek */}
        {Array.from({ length: fullGroups }).map((_, gIdx) => (
          <svg key={gIdx} width="28" height="24" viewBox="0 0 28 24" className="shrink-0">
            <line x1="4" y1="2" x2="4" y2="22" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="2" x2="10" y2="22" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="2" x2="16" y2="22" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="2" x2="22" y2="22" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="1" y1="20" x2="25" y2="4" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ))}

        {/* Maradék (1-4 vonal) */}
        {remainder > 0 && (
          <svg width={remainder * 6 + 6} height="24" viewBox={`0 0 ${remainder * 6 + 6} 24`} className="shrink-0">
            {Array.from({ length: remainder }).map((_, rIdx) => (
              <line
                key={rIdx}
                x1={4 + rIdx * 6}
                y1="2"
                x2={4 + rIdx * 6}
                y2="22"
                stroke="#0e7490"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        )}

        {count === 0 && <span className="text-xs text-slate-400 italic">0 szavazat</span>}
      </div>
    );
  };

  return (
    <TheoryTemplate
      title="3. Adatgyűjtés és az Adatok Ábrázolása"
      subtitle="A statisztikai kutatás lépései, adatgyűjtési módszerek, strigulázás (ötös kötegek), relatív gyakoriság és saját diagram szerkesztése"
      themeColor="cyan"
      badgeText="5. OSZTÁLY • VII. TÉMAKÖR: ADATGYŰJTÉS, STATISZTIKA • 📖 TANANYAG"
      documentId="grade-5-adatgyujtes-theory"
      pdfFilename="5_osztaly_VII_3_adatgyujtes_tananyag.pdf"
      practiceTitle="Készen állsz az adatgyűjtés és diagramkészítés gyakorlására?"
      practiceSubtitle="Teszteld tudásodat a strigulázásról, relatív gyakoriságról és a diagramok felépítéséről!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* 1. RÉSZ: A STATISZTIKAI KUTATÁS 5 LÉPÉSE */}
      <TheorySection
        title="1. A Statisztikai Kutatás és Adatfeldolgozás 5 Lépése"
        icon={<ClipboardList className="w-5 h-5" />}
        badge="Módszertan"
      >
        <TheoryCallout
          variant="info"
          title="Mi a statisztika?"
        >
          A <strong>statisztika</strong> a valóság számszerű adatainak gyűjtésével, rendszerezésével, ábrázolásával és
          értékelésével foglalkozik. Segít megérteni a világot és megalapozott döntéseket hozni.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 my-6">
          <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-cyan-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">1</span>
            <div className="font-bold text-xs text-cyan-950 dark:text-cyan-200">Célkitűzés</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Mit szeretnénk kideríteni? (Pl. mivel járnak iskolába a diákok?)
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">2</span>
            <div className="font-bold text-xs text-blue-950 dark:text-blue-200">Adatgyűjtés</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Mérés, számlálás, kérdőív vagy szavazás útján.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">3</span>
            <div className="font-bold text-xs text-indigo-950 dark:text-indigo-200">Rendszerezés</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Strigulázás 5-ösével, gyakorisági táblázat készítése.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">4</span>
            <div className="font-bold text-xs text-purple-950 dark:text-purple-200">Ábrázolás</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Megfelelő diagram (oszlop, vonal, kör) kiválasztása és megrajzolása.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">5</span>
            <div className="font-bold text-xs text-emerald-950 dark:text-emerald-200">Következtetés</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Eredmények értelmezése, döntések meghozatala.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: STRIGULÁZÁS ÉS GYAKORISÁG */}
      <TheorySection
        title="2. A Strigulázás (Vonalkázás) Titka és a Gyakoriság"
        icon={<ListPlus className="w-5 h-5" />}
        badge="Gyakorlati módszer"
      >
        <TheoryCallout
          variant="tip"
          title="Miért pont ötösével kötegelünk?"
        >
          Amikor gyorsan kell számolni (pl. elhaladó autókat vagy szavazatokat), az emberi szem 4 vonalig képes azonnal átlátni a mennyiséget.
          Ezért 4 függőleges vonalat húzunk, és a <strong>5. vonallal ferdén áthúzzuk őket</strong>.
          Így ötös kötegek keletkeznek, amelyeket sokkal gyorsabb összeadni (pl. három köteg + 2 vonal = 5 + 5 + 5 + 2 = 17)!
        </TheoryCallout>

        {/* INTERAKTÍV STRIGULÁZÓ ÉS ÉLŐ DIAGRAM ÉPÍTŐ */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-600 text-white">
                <ClipboardList className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-cyan-950 dark:text-cyan-200">
                  Interaktív Szavazás és Élő Diagram Készítő
                </h3>
                <p className="text-xs text-cyan-700 dark:text-cyan-300">
                  Kérdés: „Milyen járművel vagy módon érkezel reggel az iskolába?”
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="text-xs border-cyan-400 bg-white dark:bg-slate-900"
              onClick={resetVotes}
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Nullázás
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Bal oldal: Szavazó gombok és strigulák táblázata */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800 shadow-sm">
              <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                Gyakorisági táblázat élő strigulákkal
              </div>
              <div className="space-y-3">
                {categories.map(c => {
                  const percent = totalVotes > 0 ? Math.round((c.count / totalVotes) * 100) : 0;
                  return (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 w-32 shrink-0">
                        <span className="text-xl">{c.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{c.name}</div>
                          <div className="text-[10px] text-cyan-600 font-semibold">{percent}%</div>
                        </div>
                      </div>

                      {/* Strigulák */}
                      <div className="flex-1 min-w-[120px] px-2 overflow-x-auto">
                        {renderTallySvg(c.count)}
                      </div>

                      {/* Darabszám és Hozzáadás gomb */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 w-8 text-right">
                          {c.count} fő
                        </span>
                        <Button
                          size="sm"
                          className="h-7 px-2.5 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                          onClick={() => {
                            addVote(c.id);
                            if (c.count + 1 === 10) {
                              confetti({ particleCount: 30, spread: 50 });
                            }
                          }}
                        >
                          +1 szavazat
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Összes megkérdezett tanuló (Minta mérete):</span>
                <span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-extrabold text-sm">
                  {totalVotes} fő
                </span>
              </div>
            </div>

            {/* Jobb oldal: Automatikus oszlopdiagram */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-cyan-200 dark:border-cyan-800 shadow-sm flex flex-col items-center">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">
                A szavazatokból felépülő oszlopdiagram
              </div>

              <div className="w-full flex items-end justify-around h-48 pt-6 pb-2 border-b-2 border-l-2 border-slate-400 gap-3">
                {categories.map(c => {
                  const maxCount = Math.max(...categories.map(x => x.count), 10);
                  const heightPercent = (c.count / maxCount) * 100;
                  return (
                    <div key={c.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {c.count}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%`, backgroundColor: c.color }}
                        className="w-full max-w-[40px] rounded-t-md transition-all duration-300 shadow"
                      />
                      <span className="text-base mt-1.5">{c.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 truncate w-full text-center">
                        {c.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-400 mt-2 text-center">
                Függőleges tengely: szavazatok száma (fő) | Vízszintes tengely: közlekedési módok
              </div>
            </div>
          </div>
        </div>

        <FormulaBox
          title="A Gyakoriság és a Relatív Gyakoriság képlete"
          formula="\text{Relatív gyakoriság} = \frac{\text{Gyakoriság}}{\text{Összes adat száma}}"
          description="Példa: Ha 25 diákból 5 jár biciklivel, a gyakoriság 5 fő, a relatív gyakoriság pedig 5/25 = 1/5 = 20%!"
          color="cyan"
        />
      </TheorySection>

      {/* 3. RÉSZ: HOGYAN KÉSZÍTSÜNK SAJÁT DIAGRAMOT? */}
      <TheorySection
        title="3. Saját Diagram Tervezése és a Helyes Skálaválasztás"
        icon={<BarChart2 className="w-5 h-5" />}
        badge="Szerkesztési lépések"
      >
        <TheoryCallout
          variant="warning"
          title="Hogyan válasszunk skálabeosztást a füzetben?"
        >
          Gyakori hiba, hogy a diákok túl kicsi vagy túl nagy beosztást választanak.
          Nézd meg a <strong>legnagyobb értéket</strong> a táblázatban, és a füzet vonalzóval mért helyét:
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Kis adatok (max. 10–12)"
            icon={<Sliders className="w-5 h-5 text-cyan-600" />}
            badge="1-es beosztás"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Minden rácsnégyzet (vagy minden 1 cm) jelentsen <strong>1 egységet</strong>: 0, 1, 2, 3, 4, 5...
              Könnyen leolvasható, pontosan elfér a füzetben.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Közepes adatok (max. 20–30)"
            icon={<Sliders className="w-5 h-5 text-blue-600" />}
            badge="2-es vagy 5-ös beosztás"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Minden rácsvonal jelentsen <strong>2 vagy 5 egységet</strong>: 0, 2, 4, 6... vagy 0, 5, 10, 15, 20...
              A felezővonalak a köztes értékeket jelentik.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Nagy adatok (max. 100 felett)"
            icon={<Sliders className="w-5 h-5 text-purple-600" />}
            badge="10-es vagy 20-as beosztás"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Minden rácsnégyzet jelentsen <strong>10, 20 vagy 50 egységet</strong>: 0, 20, 40, 60, 80, 100...
              Így a legnagyobb érték sem lóg ki a lapról.
            </p>
          </TheoryCard>
        </div>

        <ExampleBox
          title="Példa: Gyakorisági táblázatból oszlopdiagram készítése"
          problem="Az osztályban felmérték a házi kedvenceket: Kutya: 10, Macska: 8, Hörcsög: 4, Halak: 2, Nincs kedvenc: 6. Hogyan készítsünk hozzá oszlopdiagramot?"
          steps={[
            {
              label: '1. Tengelyek felrajzolása',
              value: 'Rajzolj egy függőleges és egy vízszintes tengelyt derékszögben, a találkozási pont a 0.'
            },
            {
              label: '2. Skálabeosztás megadása',
              value: 'A legnagyobb érték 10 (Kutya). Legyen 1 cm = 2 állat. Jelöld be: 2, 4, 6, 8, 10.'
            },
            {
              label: '3. Oszlopok felrajzolása',
              value: 'Rajzolj azonos szélességű (pl. 1 cm-es) oszlopokat: Kutya (10-ig), Macska (8-ig), Hörcsög (4-ig)...'
            },
            {
              label: '4. Cím és feliratok',
              value: 'Írd a diagram tetejére: „Házi kedvencek eloszlása az osztályban”, és nevezd meg a tengelyeket!'
            }
          ]}
        />

        <TheoryTrapBox
          title="A 3 Leggyakoribb Hiba Diagramkészítéskor"
          trap="1. Nincs cím vagy hiányzik a tengelyek felirata. 2. Különböző szélességűek az oszlopok. 3. A skálán a számok nem egyenlő távolságra vannak (pl. 1, 2 után hirtelen 5 jön)."
          correction="Mindig ellenőrizd: 1. A skála egyenletes-e? 2. Az oszlopok egyforma szélesek-e? 3. Ki tudja-e olvasni egy idegen is, hogy mit ábrázol a rajz?"
        />
      </TheorySection>

      {/* 4. RÉSZ: ÖSSZEFOGLALÓ ARANYSZABÁLYOK A DOLGOZATHOZ */}
      <TheorySection
        title="4. Összefoglaló Aranyszabályok a Dolgozathoz"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="Memoriter"
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {/* 1. Kártya: A kutatás 5 lépése */}
          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shadow-2xs">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-cyan-950 dark:text-cyan-100">
              A Kutatás 5 Lépése
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-200 font-bold text-xs border border-cyan-200 dark:border-cyan-700">
              Cél → Gyűjtés → Rendezés
            </div>
            <div className="text-xs text-cyan-700 dark:text-cyan-300 leading-relaxed">
              ...majd Ábrázolás diagramon és Értékelés / következtetések levonása!
            </div>
          </div>

          {/* 2. Kártya: Strigulázás */}
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-300 shadow-2xs">
              <ListPlus className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-teal-950 dark:text-teal-100">
              Strigulázás (Ötös köteg)
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200 font-mono font-bold text-xs border border-teal-200 dark:border-teal-700">
              |||| + / = 5 db
            </div>
            <div className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed">
              Négy álló vonal után az 5. átlósan áthúzza őket. Villámgyorsan összeszámolható!
            </div>
          </div>

          {/* 3. Kártya: Relatív Gyakoriság */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-2xs">
              <Percent className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-blue-950 dark:text-blue-100">
              Relatív Gyakoriság
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 font-bold text-xs border border-blue-200 dark:border-blue-700">
              Gyakoriság / Összes adat
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Megmutatja az arányt a teljes mintához képest (törtként vagy %-ban).
            </div>
          </div>

          {/* 4. Kártya: Diagram rajzolás */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 mb-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-2xs">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-indigo-950 dark:text-indigo-100">
              Diagram Rajzolási Szabályok
            </div>
            <div className="inline-block px-2.5 py-1 my-2 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs border border-indigo-200 dark:border-indigo-700">
              Egyenletes skála + Cím
            </div>
            <div className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              A tengely 0-ról indul, a beosztás egyenletes, és minden oszlop azonos szélességű!
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
