import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Clock,
  Utensils,
  Car,
  Coins,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Scale,
  Minus,
  Plus
} from 'lucide-react';

export interface EverydayWordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  unit: string;
  quantity: number;
}

export const EverydayWordProblemsTheory: React.FC<EverydayWordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // Shopping simulator state
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'item-1', name: 'Alma (Idared)', unitPrice: 420, unit: 'kg', quantity: 2 },
    { id: 'item-2', name: 'Tej (2,8%)', unitPrice: 380, unit: 'liter', quantity: 2 },
    { id: 'item-3', name: 'Kenyér (félbarna)', unitPrice: 750, unit: 'db', quantity: 1 }
  ]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [paidWith, setPaidWith] = useState(5000);

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const rawTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = hasDiscount ? Math.round(rawTotal * 0.1) : 0;
  const discountedTotal = rawTotal - discountAmount;

  // Hungarian Forint rounding rule:
  const roundForint = (amount: number) => {
    const lastDigit = amount % 10;
    if (lastDigit === 1 || lastDigit === 2) return amount - lastDigit;
    if (lastDigit === 3 || lastDigit === 4) return amount + (5 - lastDigit);
    if (lastDigit === 6 || lastDigit === 7) return amount - (lastDigit - 5);
    if (lastDigit === 8 || lastDigit === 9) return amount + (10 - lastDigit);
    return amount;
  };

  const roundedPayable = roundForint(discountedTotal);
  const change = Math.max(0, paidWith - roundedPayable);

  // Recipe scaling state
  const [servings, setServings] = useState(4);
  const basePancake = {
    servings: 4,
    flour: 200, // g
    eggs: 2, // db
    milk: 300, // ml
    sodaWater: 200, // ml
    oil: 2 // evőkanál
  };

  const scaleFactor = servings / basePancake.servings;

  // Travel speed calculator state
  const [travelDistance, setTravelDistance] = useState(30); // km

  return (
    <TheoryTemplate
      title="Szöveges feladatok a hétköznapjainkban"
      subtitle="Vásárlás, egységárak, készpénzes forint kerekítés, receptek arányosítása és utazási menetidők"
      themeColor="orange"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR"
      topicNumber="VI.10"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
      practiceTitle="Készen állsz a hétköznapi számítások próbájára?"
      practiceSubtitle="Gyakorold a bolti vásárlást, a recepteket és az utazási feladványokat 30 izgalmas kérdéssel!"
      practiceButtonText="Hétköznapi feladatok kvíz indítása"
      quickRule={{
        label: 'A Vásárlás Alapképlete',
        formula: 'Fizetendő összeg = Egységár · Mennyiség (Készpénznél 0-ra vagy 5-re kerekítve)'
      }}
    >
      {/* 1. SZEKCIÓ: VÁSÁRLÁS ÉS PÉNZÜGYI SZÁMÍTÁSOK */}
      <TheorySection
        id="vasarlas"
        number={1}
        title="Vásárlás, egységárak és forint kerekítés"
        icon={<ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badge="PÉNZÜGYEK"
        badgeColor="orange"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          A boltban a vásárlás a mindennapi élet leggyakoribb matematikai feladata: meg kell becsülnünk a fizetendő összeget, kerekíteni a kasszánál és ellenőrizni a visszajárót.
        </p>

        {/* INTERAKTÍV PÉNZTÁR SZIMULÁTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center justify-between">
              <span>🛒 Bevásárlókosár tételei</span>
              <span className="text-xs text-slate-500 font-normal">Fizetendő = Egységár · Mennyiség</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500">
                      {item.unitPrice} Ft / {item.unit}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs sm:text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-24 text-right font-mono font-bold text-sm text-slate-900 dark:text-white">
                      {item.unitPrice * item.quantity} Ft
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={hasDiscount}
                  onChange={(e) => setHasDiscount(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span>🎟️ 10% Diák / Családi kupon beváltása</span>
              </label>
              {hasDiscount && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  −{discountAmount} Ft kedvezmény!
                </span>
              )}
            </div>
          </div>

          {/* Blokkmegjelenítő */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-dashed border-slate-700 pb-2 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold">
                  SKILLUP ABC • BLOKK
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Részösszeg:</span>
                  <span>{rawTotal} Ft</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span>10% Kedvezmény:</span>
                    <span>−{discountAmount} Ft</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Kedvezményes ár:</span>
                  <span>{discountedTotal} Ft</span>
                </div>
                <div className="flex justify-between text-orange-300 text-sm font-bold pt-1 border-t border-slate-700">
                  <span>Készpénzes kerekítés:</span>
                  <span>{roundedPayable} Ft</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                <label className="text-slate-400 block font-sans">Átadott bankjegy:</label>
                <div className="grid grid-cols-3 gap-1">
                  {[2000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setPaidWith(amount)}
                      className={`py-1 rounded text-center font-mono font-bold transition-all ${
                        paidWith === amount
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {amount} Ft
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-orange-950/60 border border-orange-500/50 space-y-1 text-center">
              <span className="text-xs uppercase font-sans font-bold text-orange-300">
                Visszajáró készpénz:
              </span>
              <div className="text-2xl font-black font-mono text-white">
                {change} Ft
              </div>
              <span className="text-[11px] text-slate-300 block font-sans">
                {paidWith} Ft − {roundedPayable} Ft = {change} Ft
              </span>
            </div>
          </div>
        </div>

        {/* Kerekítési szabályok */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>A hivatalos forint kerekítés szabálya készpénzfizetéskor:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 dark:border-amber-900/30">
              1 vagy 2 Ft végződés → <strong>0 Ft-ra</strong> (lefelé)
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 dark:border-amber-900/30">
              3 vagy 4 Ft végződés → <strong>5 Ft-ra</strong> (felfelé)
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 dark:border-amber-900/30">
              6 vagy 7 Ft végződés → <strong>5 Ft-ra</strong> (lefelé)
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded border border-amber-200 dark:border-amber-900/30">
              8 vagy 9 Ft végződés → <strong>10 Ft-ra</strong> (felfelé)
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: FŐZÉS ÉS RECEPTEK */}
      <TheorySection
        id="fozes-receptek"
        number={2}
        title="Főzés és receptarányosítás a konyhában"
        icon={<Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badge="EGYENES ARÁNYOSSÁG"
        badgeColor="orange"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Ha a recept 4 főre szól, de vendégeink érkeznek és 8 vagy 12 főre főzünk, <strong>minden hozzávaló mennyiségét egyenes arányosan kell növelnünk</strong>!
        </p>

        {/* INTERAKTÍV PALACSINTA ARÁNYOSÍTÓ */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Nagyi palacsintája ({servings} adag)
              </h3>
              <p className="text-xs text-slate-500">
                Alaprecept: 4 főre szól. Szorzótényező = {servings} : 4 = <strong>{scaleFactor.toFixed(2).replace('.00', '')}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Adagok száma:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                {[2, 4, 6, 8, 12].map((s) => (
                  <button
                    key={s}
                    onClick={() => setServings(s)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      servings === s
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {s} fő
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-1">
              <span className="text-xs text-slate-500">Liszt:</span>
              <div className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">
                {Math.round(basePancake.flour * scaleFactor)} g
              </div>
              <span className="text-[10px] text-slate-400">({Math.round((basePancake.flour * scaleFactor) / 10)} dkg)</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-1">
              <span className="text-xs text-slate-500">Tojás:</span>
              <div className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">
                {Math.round(basePancake.eggs * scaleFactor * 10) / 10} db
              </div>
              <span className="text-[10px] text-slate-400">(egész tojás)</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-1">
              <span className="text-xs text-slate-500">Tej:</span>
              <div className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">
                {Math.round(basePancake.milk * scaleFactor)} ml
              </div>
              <span className="text-[10px] text-slate-400">({(Math.round(basePancake.milk * scaleFactor) / 100).toFixed(1)} dl)</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-1">
              <span className="text-xs text-slate-500">Szódavíz:</span>
              <div className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">
                {Math.round(basePancake.sodaWater * scaleFactor)} ml
              </div>
              <span className="text-[10px] text-slate-400">({(Math.round(basePancake.sodaWater * scaleFactor) / 100).toFixed(1)} dl)</span>
            </div>

            <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-center space-y-1">
              <span className="text-xs text-slate-500">Étolaj:</span>
              <div className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">
                {Math.round(basePancake.oil * scaleFactor * 10) / 10} ek.
              </div>
              <span className="text-[10px] text-slate-400">(evőkanál)</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: UTAZÁS ÉS MOZGÁS */}
      <TheorySection
        id="utazas-sebesseg"
        number={3}
        title="Utazás: Út, idő és sebesség összefüggése"
        icon={<Car className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badge="MOZGÁS"
        badgeColor="orange"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormulaBox
            title="A mozgás alapképlete"
            formula="s = v \cdot t \quad \Longleftrightarrow \quad t = \frac{s}{v} \quad \Longleftrightarrow \quad v = \frac{s}{t}"
            description="Út (s) = Sebesség (v) · Idő (t). Menetidő kiszámításához a távolságot elosztjuk a sebességgel."
            color="orange"
          />

          <TheoryCard
            title="Gyakori időegységek a közlekedésben"
            badge="IDŐSZÁMÍTÁS"
            color="orange"
            icon={<Clock className="w-5 h-5 text-orange-600" />}
          >
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <div>• <strong>Negyedóra:</strong> 15 perc = 0,25 óra</div>
              <div>• <strong>Fél óra:</strong> 30 perc = 0,5 óra</div>
              <div>• <strong>Háromnegyed óra:</strong> 45 perc = 0,75 óra</div>
              <div>• <strong>Másfél óra:</strong> 1 óra 30 perc = 1,5 óra = 90 perc</div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV JÁRMŰ MENETIDŐ ÖSSZEHASONLÍTÓ */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Menetidő számítása különböző járművekkel
              </h3>
              <p className="text-xs text-slate-500">
                Távolság: <strong>{travelDistance} km</strong> • Idő = Út : Sebesség (t = s : v)
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {[15, 30, 60, 90].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setTravelDistance(dist)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    travelDistance === dist
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {dist} km
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">🚶 Gyalog</span>
                <span className="text-xs font-mono text-slate-500">v = 5 km/h</span>
              </div>
              <div className="text-2xl font-black font-mono text-orange-600 dark:text-orange-400">
                {(travelDistance / 5).toFixed(1).replace('.0', '')} óra
              </div>
              <p className="text-xs text-slate-500">
                {travelDistance} : 5 = {travelDistance / 5} óra ({(travelDistance / 5) * 60} perc)
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">🚲 Kerékpár</span>
                <span className="text-xs font-mono text-slate-500">v = 15 km/h</span>
              </div>
              <div className="text-2xl font-black font-mono text-orange-600 dark:text-orange-400">
                {(travelDistance / 15).toFixed(1).replace('.0', '')} óra
              </div>
              <p className="text-xs text-slate-500">
                {travelDistance} : 15 = {travelDistance / 15} óra ({(travelDistance / 15) * 60} perc)
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">🚗 Autó / Vonat</span>
                <span className="text-xs font-mono text-slate-500">v = 60 km/h</span>
              </div>
              <div className="text-2xl font-black font-mono text-orange-600 dark:text-orange-400">
                {travelDistance >= 60
                  ? `${(travelDistance / 60).toFixed(1).replace('.0', '')} óra`
                  : `${(travelDistance / 60) * 60} perc`}
              </div>
              <p className="text-xs text-slate-500">
                {travelDistance} : 60 = {(travelDistance / 60) * 60} perc menetidő
              </p>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
export default EverydayWordProblemsTheory;
