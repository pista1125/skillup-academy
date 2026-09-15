import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Calculator,
  Layers,
  Brain,
  Zap,
  Square,
  Boxes,
  Compass,
  Bookmark
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type TopicPillar = 'sets_logic' | 'powers_roots' | 'algebra_identities';

export const ChapterSummaryTheory: React.FC<ChapterSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedPillar, setSelectedPillar] = useState<TopicPillar>('powers_roots');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  return (
    <TheoryTemplate
      title="12. Összefoglalás – I. Számok és betűk"
      subtitle="A teljes I. fejezet átfogó elméleti és gyakorlati összefoglalása: Logika, Halmazok, Hatványozás, Négyzetgyökvonás és Nevezetes Azonosságok"
      badgeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: Logika, Halmazok és Számhalmazok */}
      <TheorySection
        title="1. Logika, Halmazok és Számhalmazok Rendszere"
        subtitle="A matematikai gondolkodás alapjai: kijelentések, műveletek, számhalmazok egymásba ágyazottsága"
        badge="1–5. Témakörök"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Logika & Tagadás"
            badge="Logika"
            badgeColor="blue"
            icon={<Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <li><strong>Állítás (Kijelentés):</strong> Olyan mondat, amelyről egyértelműen eldönthető, hogy igaz (I) vagy hamis (H).</li>
              <li><strong>„Minden” tagadása:</strong> „Van olyan... amely NEM...” (Egyetlen ellenpélda elég a cáfolathoz!).</li>
              <li><strong>„Van olyan” tagadása:</strong> „Egyik sem...” / „Minden... NEM...”.</li>
              <li><strong>Skatulya-elv:</strong> Ha $n+1$ galambot $n$ skatulyába teszünk, legalább egyben legalább 2 lesz.</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Halmazműveletek & Képletek"
            badge="Halmazok"
            badgeColor="indigo"
            icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
              <li><strong>Metszet (A ∩ B):</strong> mindkettőben benne van.</li>
              <li><strong>Unió (A ∪ B):</strong> legalább az egyikben benne van.</li>
              <li><strong>Különbség (A \ B):</strong> A-ban benne van, de B-ben nincs.</li>
              <li className="text-indigo-700 dark:text-indigo-300 font-bold">Szita-formula: |A ∪ B| = |A| + |B| - |A ∩ B|</li>
              <li><strong>Részhalmazok száma:</strong> 2ⁿ</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Számhalmazok Hierarchiája"
            badge="Számkörök"
            badgeColor="emerald"
            icon={<Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          >
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-xs text-emerald-800 dark:text-emerald-200 mb-2">
              ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <li><strong>ℕ:</strong> Természetes számok {'{0, 1, 2, 3, ...}'}</li>
              <li><strong>ℤ:</strong> Egész számok {'{..., -2, -1, 0, 1, 2, ...}'}</li>
              <li><strong>ℚ:</strong> Racionális számok (a/b alakú törtek, véges és szakaszos tizedestörtek)</li>
              <li><strong>ℚ*:</strong> Irracionális számok (végtelen nem szakaszos számok, pl. √2, π)</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: Hatványozás, Normálalak és Négyzetgyökvonás */}
      <TheorySection
        title="2. Hatványozás, Normálalak és Négyzetgyökvonás"
        subtitle="A műveleti tulajdonságok, hatványazonosságok és a gyökvonás 2 alapvető szabálya"
        badge="6–8. Témakörök"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Hatványozás & Normálalak"
            badge="Hatványok"
            badgeColor="amber"
            icon={<Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          >
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <strong>Szorzás azonos alap esetén:</strong> aⁿ · aᵐ = aⁿ⁺ᵐ
              </div>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <strong>Osztás azonos alap esetén:</strong> aⁿ : aᵐ = aⁿ⁻ᵐ (a ≠ 0)
              </div>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <strong>Hatvány hatványa:</strong> (aⁿ)ᵐ = aⁿ·ᵐ
              </div>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800">
                <strong>0 és negatív kitevő:</strong> a⁰ = 1, a⁻ⁿ = 1 / aⁿ (a ≠ 0)
              </div>
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded font-sans">
                <strong>Normálalak:</strong> a · 10ᵏ, ahol 1 ≤ a &lt; 10 és k ∈ ℤ. Pl. 340 000 = 3.4 · 10⁵.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Négyzetgyökvonás Szabályai"
            badge="Négyzetgyök"
            badgeColor="rose"
            icon={<Square className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          >
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-1.5 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 dark:border-rose-800">
                <strong>Definíció:</strong> √a = b ⟺ b ≥ 0 és b² = a (a ≥ 0)
              </div>
              <div className="p-1.5 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 dark:border-rose-800">
                <strong>Négyzet gyöke:</strong> √(a²) = |a| (Pl. √((-5)²) = |-5| = 5)
              </div>
              <div className="p-1.5 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 dark:border-rose-800">
                <strong>Szorzat gyöke:</strong> √(a · b) = √a · √b (Pl. √50 = √(25·2) = 5√2)
              </div>
              <div className="p-1.5 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-200 dark:border-rose-800">
                <strong>Hányados gyöke:</strong> √(a / b) = √a / √b (b &gt; 0)
              </div>
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded font-sans text-rose-600 dark:text-rose-400 font-bold">
                ⚠️ CSAPDA: √(a + b) ≠ √a + √b! (Pl. √(9+16) = √25 = 5 ≠ 3+4=7)
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: Betűs kifejezések, műveletek és a 3 nevezetes azonosság */}
      <TheorySection
        title="3. Algebra: Szorzás, Kiemelés és a 3 Nevezetes Azonosság"
        subtitle="Egynemű tagok, zárójelfelbontás, közös tényező kiemelése és az azonosságok alkalmazása"
        badge="9–11. Témakörök"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Algebrai Alapműveletek"
            badge="Alapismeretek"
            badgeColor="blue"
            icon={<Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          >
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li>
                <strong>Egynemű kifejezések összevonása:</strong> Csak az azonos változójú és azonos kitevőjű tagok adhatók össze: $3x^2 + 5x^2 = 8x^2$ (de $3x^2 + 5x$ NEM vonható össze!).
              </li>
              <li>
                <strong>Egytagú szorzása:</strong> Számok szorzódnak, kitevők összeadódnak: $(3x^2) \cdot (4x^3) = 12x^5$.
              </li>
              <li>
                <strong>Közös tényező kiemelése:</strong> $6x^2 - 15x = 3x \cdot (2x - 5)$.
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A 3 Nevezetes Azonosság Képlete"
            badge="Azonosságok"
            badgeColor="purple"
            icon={<Boxes className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          >
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-900 dark:text-purple-200">1. Összeg négyzete:</span><br />
                (a + b)² = a² + 2ab + b²
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-900 dark:text-purple-200">2. Különbség négyzete:</span><br />
                (a - b)² = a² - 2ab + b²
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-900 dark:text-purple-200">3. Négyzetek különbsége:</span><br />
                (a + b)(a - b) = a² - b²
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: Interaktív Fejezeti Tudáspróba */}
      <TheorySection
        title="4. Interaktív Fejezeti Tudástár & Kvízre Hangoló"
        subtitle="Válaszd ki a pillért, tekintsd át a kulcsképleteket, és oldd meg a mintateszt-kérdést!"
        badge="Összefoglaló Modul"
        badgeColor="amber"
      >
        <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-sm mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: 'powers_roots', label: '⚡ Hatványozás & Gyökvonás' },
              { id: 'algebra_identities', label: '📐 Algebra & Azonosságok' },
              { id: 'sets_logic', label: '🧠 Halmazok & Logika' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPillar(tab.id as TopicPillar)}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all',
                  selectedPillar === tab.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
            {selectedPillar === 'powers_roots' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-1">Kulcsfontosságú összefüggések:</div>
                <div>• (2 · 10³) · (3 · 10⁴) = 6 · 10⁷</div>
                <div>• √72 = √(36 · 2) = 6√2</div>
                <div>• (√3 + √12)² = (√3 + 2√3)² = (3√3)² = 9 · 3 = 27</div>
                <div>• √((-9)²) = |-9| = 9</div>
              </div>
            )}

            {selectedPillar === 'algebra_identities' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-purple-800 dark:text-purple-200 text-sm mb-1">Kulcsfontosságú azonosságok:</div>
                <div>• (2x - 3)² = 4x² - 12x + 9</div>
                <div>• (3x + 4)(3x - 4) = 9x² - 16</div>
                <div>• (x² - 25) / (x - 5) = x + 5 (x ≠ 5)</div>
                <div>• 48 · 52 = (50 - 2)(50 + 2) = 2500 - 4 = 2496</div>
              </div>
            )}

            {selectedPillar === 'sets_logic' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-1">Kulcsfontosságú halmazképletek:</div>
                <div>• |A| = 15, |B| = 20, |A ∩ B| = 5 ⟹ |A ∪ B| = 15 + 20 - 5 = 30</div>
                <div>• 4 elemű halmaz részhalmazainak száma: 2⁴ = 16</div>
                <div>• „Minden szám pozitív” tagadása: „Van olyan szám, amely nem pozitív (≤ 0)”</div>
              </div>
            )}
          </div>
        </div>

        {/* Fejezeti mintateszt-kérdés */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Fejezeti Záró Mintakérdés
            </h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
            Mennyi a <strong>√50 - √18 + (2x - 3)² - (2x + 3)(2x - 3)</strong> kifejezés egyszerűsített értéke, ha x = 1?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[
              { id: 0, text: '2√2 - 12x + 18 ⟹ 2√2 + 6', correct: true },
              { id: 1, text: '√32 - 12x ⟹ 4√2 - 12', correct: false },
              { id: 2, text: '2√2 - 6x ⟹ 2√2 - 6', correct: false },
              { id: 3, text: '8√2 + 18', correct: false }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setQuizAnswer(option.id);
                  setQuizSubmitted(true);
                }}
                className={cn(
                  'p-3 text-left rounded-lg text-xs sm:text-sm font-mono transition-all border flex items-center justify-between',
                  quizAnswer === option.id
                    ? option.correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                      : 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <span>{option.text}</span>
                {quizSubmitted && quizAnswer === option.id && (
                  option.correct
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                    : <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>

          {quizSubmitted && quizAnswer !== null && (
            <div className={cn(
              'p-3 rounded-lg text-xs sm:text-sm border',
              quizAnswer === 0
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800 dark:text-rose-300'
            )}>
              {quizAnswer === 0 ? '🎉 Kiváló levezetés! ' : '❌ Nézzük a részletes levezetést: '}
              1. Gyökök: √50 - √18 = 5√2 - 3√2 = 2√2.<br />
              2. Azonosságok: (2x - 3)² = 4x² - 12x + 9, és (2x + 3)(2x - 3) = 4x² - 9.<br />
              3. Kivonás: (4x² - 12x + 9) - (4x² - 9) = -12x + 18.<br />
              4. Összesítve x = 1 esetén: 2√2 - 12(1) + 18 = <strong>2√2 + 6</strong>.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ChapterSummaryTheory;
