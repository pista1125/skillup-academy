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
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  Calculator,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  PieChart,
  TrendingDown,
  TrendingUp,
  Receipt,
  ShoppingCart,
  Sparkles,
  Check,
  Scale,
  Smile,
  Zap,
  Box,
  Home,
  IceCream,
  Users,
  Clock,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface WordProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const WordProblemsTheory: React.FC<WordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Lakásvásárlás & Hitelkalkulátor (Tk. 6. feladat) ---
  const [apartmentPrice, setApartmentPrice] = useState<number>(16000000); // 16 millió Ft
  const downPaymentPercent = 15; // 15% előleg
  const loanPercent = 30; // 30% hitel
  const dutyPercent = 4; // 4% illeték

  const downPaymentAmount = Math.round(apartmentPrice * (downPaymentPercent / 100));
  const loanAmount = Math.round(apartmentPrice * (loanPercent / 100));
  const dutyAmount = Math.round(apartmentPrice * (dutyPercent / 100));
  const ownFundsNeeded = downPaymentAmount + dutyAmount;

  // --- 2. Interaktív Jégkrém-visszatöltési Szemléltető (Tk. 7. feladat) ---
  const [soldPercent, setSoldPercent] = useState<number>(55); // 55% eladva
  const remainingPercent = 100 - soldPercent;
  const refillNeededPercent = remainingPercent > 0 ? ((soldPercent / remainingPercent) * 100).toFixed(1) : '0';

  // --- 3. Interaktív Közös Munkavégzés & Hatékonyság (Mf. 10. feladat) ---
  const [aloneHours, setAloneHours] = useState<number>(6); // Eszter 6 óra
  const [efficiencyBoost, setEfficiencyBoost] = useState<number>(50); // +50% hatékonyság
  const speedFactor = 1 + efficiencyBoost / 100;
  const togetherHours = Number((aloneHours / speedFactor).toFixed(1));

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-word-theory-doc"
      pdfFilename="7_osztaly_szoveges_szazalekos_feladatok.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 7. FEJEZET"
      title="Szöveges százalékszámítási feladatok"
      subtitle="Valós életszituációk modellezése: lakásvásárlás, hitelek és kamatok, receptarányok, populáció-gyarapodás és fordított arányosságú munkavégzés"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'Előleg = Ár · 0,15  •  Visszatöltés = (Eladott / Maradt) · 100%  •  Együtt dolgozás = T / (1 + hatékonyság)'
      }}
      themeColor="teal"
      practiceTitle="Készen állsz az életszerű szöveges kihívásokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: A szöveges feladatok megoldásának 5 lépéses modellje */}
      <TheorySection number={1} title="A szöveges feladatok megoldásának 5 lépéses modellje">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Hogyan fogjunk hozzá a feladatokhoz?"
            icon={<BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            variant="teal"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A szöveges feladatok megoldásakor a legfontosabb lépés a <strong>viszonyítási alap (a 100%)</strong> helyes azonosítása és az adatok közötti kapcsolat feltárása.
            </p>
            <ol className="text-xs space-y-2 mt-3 text-slate-700 dark:text-slate-300 list-decimal list-inside">
              <li><strong>Szövegértés és adatgyűjtés:</strong> Mi az ismert adat, és mi a keresett kérdés?</li>
              <li><strong>Az Alap (100%) rögzítése:</strong> Mihez viszonyítunk a szövegben?</li>
              <li><strong>Terv és matematikai modell:</strong> Képlet felírása ($É = A \cdot p/100$, $A = É / q$ vagy aránypár).</li>
              <li><strong>Számítás:</strong> A műveletsor pontos elvégzése.</li>
              <li><strong>Szöveges ellenőrzés és válasz:</strong> Reális-e az eredmény a szöveg környezetében?</li>
            </ol>
          </TheoryCard>

          <TheoryCard
            title="Tk. 1. feladat: Matematika- és földrajz átlag összehasonlítása"
            icon={<Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A matekdolgozatok átlaga <strong>4,56 lett</strong>, ami <strong>14%-kal jobb (nagyobb)</strong>, mint a földrajzdolgozatok átlaga. Mennyi lett a földrajz átlag?
            </p>

            <div className="p-3 my-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs space-y-1 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800">
              <p>1. Mi az Alap? A <strong>földrajz átlaga (100%)</strong>, mert ehhez hasonlítunk!</p>
              <p>2. A matek átlag ennek 114%-a (1,14-szerese):</p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">
                4,56 = Földrajz · 1,14 ➔ Földrajz = 4,56 / 1,14 = 4,00!
              </p>
              <p className="text-[11px] text-slate-500">
                Ellenőrzés: 4,00 · 1,14 = 4,56. Valóban egyezik!
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: Pénzügyek, Lakásvásárlás és Részletfizetés */}
      <TheorySection number={2} title="Pénzügyi döntések: Lakásvásárlás, előleg, hitel és részletfizetés">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Tk. 6. feladat: Lakásvásárlás előleggel és hitellel"
            icon={<Home className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            variant="teal"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Szerződéskötéskor a lakás árának <strong>15%-át kell kifizetni előlegbe</strong>. Lucáék szülei <strong>2,4 millió Ft-ot</strong> fizettek előlegként.
            </p>
            <ul className="text-xs space-y-2 mt-3 text-slate-700 dark:text-slate-300">
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>a) Lakás ára (az Alap):</strong><br />
                <span className="font-mono text-teal-700 dark:text-teal-300 font-bold">2 400 000 / 0,15 = 16 000 000 Ft</span> (16 millió Ft).
              </li>
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>b) Bankhitel (a lakás árának 30%-a):</strong><br />
                <span className="font-mono text-blue-600 font-bold">16 000 000 · 0,30 = 4 800 000 Ft</span> (4,8 millió Ft).
              </li>
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>c) Vagyonszerzési illeték:</strong> 640 000 Ft fizetendő.<br />
                Hány százalék? <span className="font-mono text-purple-600 font-bold">640 000 / 16 000 000 = 0,04 = 4%</span>!
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Tk. 3. feladat: Laptop részletfizetésre 15% kamattal"
            icon={<Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A laptop <strong>200 000 Ft</strong>. Megtakarítás: 140 000 Ft. A hiányzó 60 000 Ft-ra féléves kölcsönt veszünk fel <strong>15% kamattal</strong>.
            </p>
            <div className="space-y-2 mt-3 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                Hiányzó tőke: 200 000 - 140 000 = 60 000 Ft
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                Kamat összege (drágulás): 60 000 · 0,15 = <strong>9000 Ft</strong>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-800 font-bold text-amber-900 dark:text-amber-200">
                Visszafizetendő: 60 000 + 9000 = 69 000 Ft<br />
                Havi törlesztő (6 hónapra): 69 000 / 6 = <strong>11 500 Ft/hó</strong>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív Lakásvásárlási Szimulátor */}
        <div className="mt-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <Home className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Interaktív Lakásvásárlási és Hitel Felosztó (Tk. 6. feladat modellje)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Lakás vételára (Alap, 100%):</span>
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-300">{(apartmentPrice / 1000000).toFixed(1)} millió Ft</span>
                </div>
                <Slider
                  value={[apartmentPrice]}
                  min={10000000}
                  max={40000000}
                  step={1000000}
                  onValueChange={(val) => setApartmentPrice(val[0])}
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="flex justify-between">
                  <span>15% előleg (szerződéskötéskor):</span>
                  <span className="font-mono font-bold text-teal-600">{downPaymentAmount.toLocaleString()} Ft</span>
                </div>
                <div className="flex justify-between">
                  <span>30% bankhitel (30 évre):</span>
                  <span className="font-mono font-bold text-blue-600">{loanAmount.toLocaleString()} Ft</span>
                </div>
                <div className="flex justify-between">
                  <span>4% vagyonszerzési illeték:</span>
                  <span className="font-mono font-bold text-purple-600">{dutyAmount.toLocaleString()} Ft</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800/80 space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 pb-1 border-b border-teal-200 dark:border-teal-800">
                Pénzügyi források megoszlása:
              </div>
              <div className="flex justify-between">
                <span>Szükséges induló készpénz (előleg + illeték):</span>
                <span className="font-mono font-bold text-teal-800 dark:text-teal-200">{ownFundsNeeded.toLocaleString()} Ft</span>
              </div>
              <div className="flex justify-between">
                <span>Fennmaradó vételár (hitel után):</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{(apartmentPrice - downPaymentAmount - loanAmount).toLocaleString()} Ft</span>
              </div>
              {/* Vizuális sáv */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex mt-2">
                <div className="bg-teal-500 h-full" style={{ width: '15%' }} title="Előleg: 15%" />
                <div className="bg-blue-500 h-full" style={{ width: '30%' }} title="Hitel: 30%" />
                <div className="bg-slate-400 h-full" style={{ width: '55%' }} title="Egyéb saját erő: 55%" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Előleg: 15%</span>
                <span>Bankhitel: 30%</span>
                <span>Maradék: 55%</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Jégkrém kiárusítás és Visszatöltés (Alapváltási Szemléltető) */}
      <TheorySection number={3} title="A jégkrém-kiárusítás és visszatöltés: Hány %-kal kell növelni?">
        <TheoryCallout
          title="Tk. 7. feladat: A nagy nyári hőségben eladott jégkrémek (152. oldal)"
          icon={<IceCream className="w-5 h-5 text-teal-600" />}
          variant="teal"
        >
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            A nyári hőségben <strong>eladtuk a jégkrémek 55%-át</strong>. Hány százalékkal kell növelnünk a <strong>megmaradt mennyiséget</strong> ahhoz, hogy újra ugyanannyi jégkrémünk legyen, mint eredetileg?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-rose-600 uppercase tracking-wide">1. Mi maradt meg?</span>
              <p className="text-slate-600 dark:text-slate-300">
                Ha eladtunk 55%-ot, a fagyasztóban a készlet <strong>100% - 55% = 45%-a maradt meg</strong>.
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-emerald-600 uppercase tracking-wide">2. Alapváltás a visszatöltéskor!</span>
              <p className="text-slate-600 dark:text-slate-300">
                Most a megmaradt <strong>45% a viszonyítási alap (az új 100%)</strong>!<br />
                Vissza kell hoznunk az 55%-ot:<br />
                <span className="font-mono font-bold text-emerald-600">55 / 45 = 11/9 ≈ 1,222 ➔ +122,2% növelés szükséges!</span>
              </p>
            </div>
          </div>
        </TheoryCallout>

        {/* Interaktív Jégkrém Visszatöltési Szimulátor */}
        <div className="mt-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <IceCream className="w-5 h-5 text-teal-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Interaktív Készletvisszatöltési Kalkulátor
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Eladott készlet aránya:</span>
                  <span className="font-mono font-bold text-rose-600">-{soldPercent}%</span>
                </div>
                <Slider
                  value={[soldPercent]}
                  min={10}
                  max={90}
                  step={5}
                  onValueChange={(val) => setSoldPercent(val[0])}
                />
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400">
                Megmaradt készlet a raktárban: <strong className="font-mono text-slate-900 dark:text-slate-100">{remainingPercent}%</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Visszapótlandó hiány:</span>
                <span className="font-mono font-bold text-rose-600">+{soldPercent}% (az eredetiből)</span>
              </div>
              <div className="flex justify-between">
                <span>Új viszonyítási alap (az osztó):</span>
                <span className="font-mono font-bold text-teal-600">{remainingPercent}%</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-bold text-sm">
                <span className="text-slate-800 dark:text-slate-200">Szükséges növelés mértéke:</span>
                <span className="font-mono text-emerald-600">+{refillNeededPercent}%</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Képlet: (Eladott % / Maradt %) · 100%
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Receptarányok és Fordított Arányosságú Munkavégzés */}
      <TheorySection number={4} title="Receptarányok, populációk és hatékonysági feladatok">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mf. 7. feladat: Gyümölcssaláta recept arányai"
            icon={<PieChart className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Összetevők: <strong>40 dkg alma</strong>, <strong>20 dkg narancs</strong>, <strong>30 dkg banán</strong>, <strong>25 dkg meggy</strong>.
            </p>
            <div className="p-3 my-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs space-y-1 text-slate-700 dark:text-slate-300 border border-amber-200 dark:border-amber-800 font-mono">
              <div>Össztömeg: 40 + 20 + 30 + 25 = <strong>115 dkg</strong></div>
              <div>Alma aránya: 40 / 115 ≈ <strong>34,78%</strong> (többszörözéskor sem változik!)</div>
              <div>Tömegarány: 40 : 20 : 30 : 25 = <strong>8 : 4 : 6 : 5</strong></div>
              <div>5,75 kg (575 dkg) salátához banán: 575 · (6/23) = <strong>1,5 kg</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Mf. 10. feladat: Eszter és Kristóf takarítása (Fordított arányosság)"
            icon={<Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Eszter egyedül <strong>6 óra alatt</strong> takarítja ki a lakást. Ha öccse is segít, ketten együtt <strong>50%-kal hatékonyabbak</strong> (1,5-szeres a sebesség). Mennyi idő kell ketten?
            </p>
            <div className="p-3 my-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs space-y-1 text-slate-700 dark:text-slate-300 border border-indigo-200 dark:border-indigo-800 font-mono">
              <div>Sebesség szorzója: 1 + 0,5 = <strong>1,5-szörös tempó</strong></div>
              <div>Szükséges idő: 6 / 1,5 = <strong>4 óra</strong></div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mivel a sebesség és az idő <strong>fordítottan arányos</strong>, a nagyobb hatékonysággal nem szorzunk, hanem osztunk!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblemsTheory;
