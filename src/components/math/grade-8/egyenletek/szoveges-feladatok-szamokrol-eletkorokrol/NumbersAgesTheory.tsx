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
  Users,
  Hash,
  Calculator,
  Equal,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Layers,
  Calendar,
  Split,
  Binary
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface NumbersAgesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const NumbersAgesTheory: React.FC<NumbersAgesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeTab, setActiveTab] = useState<'number' | 'age'>('age');

  // 1. Kétjegyű Szám Labor
  const [tensDigit, setTensDigit] = useState<number>(7);
  const [unitsDigit, setUnitsDigit] = useState<number>(3);

  const originalNumber = tensDigit * 10 + unitsDigit;
  const reversedNumber = unitsDigit * 10 + tensDigit;
  const diff = originalNumber - reversedNumber;
  const sum = originalNumber + reversedNumber;

  // 2. Életkori Időgép Labor (Anya: 36, Gyerek: 8)
  const [person1Name, setPerson1Name] = useState<string>('Anya');
  const [person1AgeNow, setPerson1AgeNow] = useState<number>(36);
  const [person2Name, setPerson2Name] = useState<string>('Lánya');
  const [person2AgeNow, setPerson2AgeNow] = useState<number>(8);
  const [yearsOffset, setYearsOffset] = useState<number>(0);

  const age1AtOffset = person1AgeNow + yearsOffset;
  const age2AtOffset = person2AgeNow + yearsOffset;
  const ageDifference = age1AtOffset - age2AtOffset;
  const ratioAtOffset = (age1AtOffset / (age2AtOffset || 1)).toFixed(2);
  const isTriple = age1AtOffset === 3 * age2AtOffset;
  const isDouble = age1AtOffset === 2 * age2AtOffset;

  return (
    <TheoryTemplate
      title="Szöveges Feladatok: Számok és Életkorok"
      subtitle="A szöveg lefordítása az egyenletek nyelvére: helyiértékes felírás, számok aránya, egymást követő számok és az időtlen életkori táblázatok a 8. osztályban"
      badgeText="8. OSZTÁLY • III. EGYENLETEK • 💡 TANANYAG"
      pdfFilename="8_osztaly_szoveges_feladatok_szamok_eletkorok.pdf"
      themeColor="rose"
      quickRule={{
        label: "Két Fő Szabály Számokhoz és Életkorokhoz",
        formula: "Kétjegyű szám (ab) = 10a + b   és   Korkülönbség = állandó"
      }}
      practiceTitle="Készen állsz a szöveges feladatok megoldására?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses, 3 nehézségi szintű interaktív kvízben levezetésekkel, párosítóval és csoportosítóval!"
      practiceButtonText="Számok és Életkorok Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: A Szöveges Modellezés Mester-Algoritmusa */}
      <TheorySection
        number={1}
        title="A Szöveges Feladatok 5 Lépéses Mester-Algoritmusa"
        icon={<Calculator className="w-5 h-5 text-rose-600" />}
        badge="Módszertan"
        badgeColor="rose"
      >
        <TheoryCard
          title="Hogyan fordítsuk le a köznapi szöveget a matematika nyelvére?"
          badge="Útmutató"
          badgeColor="rose"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-300">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Értő olvasás
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Olvasd el legalább kétszer a feladatot! Írd ki a megadott adatokat, és azonosítsd a keresett mennyiséget.
                </p>
              </div>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-2">Mit kérdez a feladat?</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-purple-700 dark:text-purple-300">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Ismeretlen választás
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Jelöld el <MathText>x</MathText>-szel az egyik mennyiséget (célszerűen a legkisebbet vagy a kérdezett értéket)!
                </p>
              </div>
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 mt-2">Legyen x = ...</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-blue-700 dark:text-blue-300">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                  Algebrai átírás
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Fejezd ki a többi mennyiséget is <MathText>x</MathText> segítségével, majd a szöveg összefüggése alapján állíts fel egyenletet!
                </p>
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-2">Bal oldal = Jobb oldal</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                  Egyenletmegoldás
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Oldd meg a felírt egyenletet a mérlegelv precíz alkalmazásával (zárójelbontás, összevonás, osztás).
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2">x értékének kiszámítása</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 dark:text-amber-300">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">5</span>
                  Szöveges ellenőrzés
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Helyettesíts vissza <strong>az eredeti szövegbe</strong>, vizsgáld meg a realitást, és fogalmazz szöveges választ mértékegységgel!
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-2">Szöveges válaszadás</span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Számelméleti Kifejezések Szótára */}
      <TheorySection
        number={2}
        title="Számelméleti Kifejezések és Algebrai Megfelelőik"
        icon={<Hash className="w-5 h-5 text-indigo-600" />}
        badge="Fogalomtár"
        badgeColor="indigo"
      >
        <TheoryTable
          headers={['Szöveges megfogalmazás', 'Algebrai kifejezés', 'Példa & Magyarázat']}
          rows={[
            [
              'Egy gondolt szám',
              'x',
              'A keresett ismeretlen alapértelmezett jelölése'
            ],
            [
              'Egy szám k-szorosa',
              'k · x',
              'Pl. 4-szerese: 4x; fele: x/2 vagy 0,5x; harmada: x/3'
            ],
            [
              'Egy számnál d-vel nagyobb / kisebb',
              'x + d  /  x - d',
              'Pl. 7-tel több: x + 7; 12-vel kevesebb: x - 12'
            ],
            [
              'Egymást követő egész számok',
              'n, n + 1, n + 2',
              'Különbségük 1 (pl. 14, 15, 16). Összegük: 3n + 3'
            ],
            [
              'Egymást követő páros számok',
              '2k, 2k + 2, 2k + 4',
              'Különbségük 2 (pl. 20, 22, 24). Összegük: 6k + 6'
            ],
            [
              'Egymást követő páratlan számok',
              '2k + 1, 2k + 3, 2k + 5',
              'Különbségük 2 (pl. 13, 15, 17). Összegük: 6k + 9'
            ],
            [
              'Két szám aránya p : q',
              'px  és  qx',
              'Pl. arányuk 3 : 5 => az egyik szám 3x, a másik szám 5x'
            ],
            [
              'Maradékos osztás',
              'A = B · q + r',
              'Osztandó = Osztó · Hányados + Maradék (0 ≤ r < B)'
            ]
          ]}
        />
      </TheorySection>

      {/* 3. Szekció: Kétjegyű Számok Helyiértékes Felírása */}
      <TheorySection
        number={3}
        title="Kétjegyű és Többjegyű Számok Helyiértékes Modellje"
        icon={<Binary className="w-5 h-5 text-purple-600" />}
        badge="Helyiérték"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <TheoryCard
            title="A Helyiérték Alapelve"
            badge="Alapfogalom"
            badgeColor="rose"
            variant="highlight"
            icon={<Hash className="w-4 h-4 text-rose-600" />}
          >
            <p>
              A tízes számrendszerben egy kétjegyű szám értéke nem a számjegyek szorzata (<MathText>a \cdot b</MathText>), hanem a helyiértékek összege:
            </p>
            <div className="p-2.5 rounded-xl bg-rose-100/60 dark:bg-rose-950/40 text-center font-mono font-black text-sm text-rose-900 dark:text-rose-200">
              <span className="overline decoration-2 font-serif font-black text-base mr-1">ab</span> = 10a + b
            </div>
            <p className="text-[11px] text-slate-500">
              ahol <MathText>{"a \\in \\{1, 2, \\dots, 9\\}"}</MathText> (nem lehet 0!) és <MathText>{"b \\in \\{0, 1, \\dots, 9\\}"}</MathText>.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Számjegyek Felcserélése (A 9-es Törvény)"
            badge="Tétel"
            badgeColor="emerald"
            variant="formula"
            icon={<Sparkles className="w-4 h-4 text-emerald-600" />}
          >
            <p>
              Ha megcseréljük a két számjegyet, az új szám értéke: <span className="overline decoration-2 font-serif font-bold text-sm">ba</span> = 10b + a.
            </p>
            <div className="p-2 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 text-center font-mono font-bold text-xs text-emerald-900 dark:text-emerald-200">
              <MathText>{"(10a + b) - (10b + a) = 9(a - b)"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500">
              <strong>Aranyszabály:</strong> Egy kétjegyű szám és a felcserélt jegyű szám különbsége <strong>mindig osztható 9-cel</strong>!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Összeg és Háromjegyű Általánosítás"
            badge="Kiterjesztés"
            badgeColor="blue"
            variant="example"
            icon={<Layers className="w-4 h-4 text-blue-600" />}
          >
            <p>
              A két szám összege mindig osztható 11-gyel:
            </p>
            <div className="p-1.5 rounded-xl bg-blue-100/60 dark:bg-blue-950/40 text-center font-mono font-bold text-xs text-blue-900 dark:text-blue-200 mb-2">
              <MathText>{"(10a + b) + (10b + a) = 11(a + b)"}</MathText>
            </div>
            <p className="text-xs">
              <strong>Háromjegyű szám esetén:</strong>
            </p>
            <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-mono font-bold text-xs">
              <span className="overline decoration-2 font-serif font-bold text-sm mr-1">abc</span> = 100a + 10b + c
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Életkori Feladatok és a Táblázatos Módszer */}
      <TheorySection
        number={4}
        title="Életkori Feladatok és a Táblázatos Módszer"
        icon={<Users className="w-5 h-5 text-rose-600" />}
        badge="Életkorok"
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryCallout type="info" title="Az Életkori Feladatok Legfőbb Szabálya">
            <p>
              Bármennyi év telik el (a jövőbe lépünk) vagy bármennyi évet megyünk vissza a múltba, az idő <strong>minden szereplő számára pontosan ugyanúgy telik</strong>! Ennek következménye:
            </p>
            <div className="mt-2 p-2 rounded-xl bg-white dark:bg-slate-900 font-mono font-black text-rose-600 text-center text-sm border border-rose-200">
              Két személy életkorának különbsége az évek múlásával SOHA NEM VÁLTOZIK!
            </div>
          </TheoryCallout>

          <TheoryCard
            title="A standard 3 oszlopos életkori táblázat modellje"
            badge="Sablon"
            badgeColor="rose"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200">
                    <th className="p-2.5 rounded-l-xl font-black">Szereplő</th>
                    <th className="p-2.5 font-bold">Múlt (k évvel ezelőtt)</th>
                    <th className="p-2.5 font-bold">Jelen (Most)</th>
                    <th className="p-2.5 rounded-r-xl font-bold">Jövő (m év múlva)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[12px]">
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-slate-800 dark:text-slate-200">Szülő / Idősebb</td>
                    <td className="p-2.5 text-rose-600">A - k</td>
                    <td className="p-2.5 font-bold">A</td>
                    <td className="p-2.5 text-emerald-600">A + m</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-slate-800 dark:text-slate-200">Gyermek / Fiatalabb</td>
                    <td className="p-2.5 text-rose-600">G - k</td>
                    <td className="p-2.5 font-bold">G (vagy x)</td>
                    <td className="p-2.5 text-emerald-600">G + m</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              <strong>Tipp:</strong> Mindig ellenőrizd: ha pl. a szülő kora a gyerek korának 3-szorosa lesz, akkor a szorzótényezőt a GYEREK kifejezése elé kell tenni: <MathText>{"A + m = 3(G + m)"}</MathText>!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Szekció: Interaktív Modellező Labor (áthelyezve az 5. életkori témakör után) */}
      <TheorySection
        number={5}
        title="Interaktív Modellező Labor: Kétjegyű Számok & Életkori Időgép"
        icon={<Sparkles className="w-5 h-5 text-rose-600" />}
        badge="Interaktív Labor"
        badgeColor="rose"
      >
        <div className="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/70 dark:from-slate-900 dark:to-slate-850 p-5 sm:p-6 rounded-3xl border-2 border-rose-200/90 dark:border-rose-900/60 shadow-sm space-y-5">
          {/* Fülválasztó */}
          <div className="flex items-center justify-between border-b border-rose-200/70 dark:border-slate-800 pb-3 flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-black uppercase text-rose-700 dark:text-rose-300 tracking-wider">
                Vizuális Kísérleti Műhely
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Fedezd fel a matematikai mintázatokat közvetlen tapasztalással!
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'age' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('age')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'age'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                    : 'border-rose-200 text-rose-700 dark:text-rose-300'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Életkori Időgép
              </Button>
              <Button
                variant={activeTab === 'number' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('number')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeTab === 'number'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                    : 'border-rose-200 text-rose-700 dark:text-rose-300'
                }`}
              >
                <Binary className="w-3.5 h-3.5" />
                Kétjegyű Számjegy-Csere
              </Button>
            </div>
          </div>

          {/* TAB 1: Életkori Időgép */}
          {activeTab === 'age' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {person1Name} jelenlegi kora:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={person1AgeNow}
                        onChange={(e) => setPerson1AgeNow(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-center bg-slate-50 dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-500 font-medium">év</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {person2Name} jelenlegi kora:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={person2AgeNow}
                        onChange={(e) => setPerson2AgeNow(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-center bg-slate-50 dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-500 font-medium">év</span>
                    </div>
                  </div>

                  <div className="flex sm:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPerson1AgeNow(36);
                        setPerson2AgeNow(8);
                        setYearsOffset(6);
                      }}
                      className="rounded-xl text-xs font-bold border-rose-300 text-rose-700 hover:bg-rose-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Mintapélda betöltése (36 és 8 év)
                    </Button>
                  </div>
                </div>

                {/* Időgép Csúszka */}
                <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-rose-600" />
                      Időeltolódás:
                    </span>
                    <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-rose-600 text-white font-black">
                      {yearsOffset > 0
                        ? `+${yearsOffset} év múlva (Jövő)`
                        : yearsOffset < 0
                        ? `${yearsOffset} évvel ezelőtt (Múlt)`
                        : 'Jelen (most)'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={-Math.min(person1AgeNow - 1, person2AgeNow - 1)}
                    max="30"
                    step="1"
                    value={yearsOffset}
                    onChange={(e) => setYearsOffset(parseInt(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Múlt: {-Math.min(person1AgeNow - 1, person2AgeNow - 1)} év</span>
                    <span>Most (0)</span>
                    <span>Jövő: +30 év</span>
                  </div>
                </div>

                {/* Dinamikus Táblázat */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <th className="p-2.5 rounded-l-xl font-black">Személy</th>
                        <th className="p-2.5 font-bold">Jelenlegi életkor</th>
                        <th className="p-2.5 font-bold">Kifejezés az időgéppel</th>
                        <th className="p-2.5 font-bold text-center">Életkor ekkor</th>
                        <th className="p-2.5 rounded-r-xl font-bold text-right">Korkülönbség</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      <tr>
                        <td className="p-2.5 font-bold text-rose-700 dark:text-rose-400">{person1Name}</td>
                        <td className="p-2.5">{person1AgeNow} év</td>
                        <td className="p-2.5 font-mono text-slate-500">{person1AgeNow} + ({yearsOffset})</td>
                        <td className="p-2.5 text-center font-black text-sm text-slate-900 dark:text-white">
                          {age1AtOffset} év
                        </td>
                        <td rowSpan={2} className="p-2.5 text-right font-black text-rose-600 dark:text-rose-400 text-sm align-middle bg-rose-50/40 dark:bg-rose-950/20 rounded-xl">
                          {Math.abs(ageDifference)} év (FIX!)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-indigo-700 dark:text-indigo-400">{person2Name}</td>
                        <td className="p-2.5">{person2AgeNow} év</td>
                        <td className="p-2.5 font-mono text-slate-500">{person2AgeNow} + ({yearsOffset})</td>
                        <td className="p-2.5 text-center font-black text-sm text-slate-900 dark:text-white">
                          {age2AtOffset} év
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Siker / Észrevétel Kártya */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Életkorok aránya ebben az évben: </span>
                    <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">
                      {age1AtOffset} : {age2AtOffset} = {ratioAtOffset}-szorosa
                    </span>
                  </div>

                  {isTriple && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs animate-in zoom-in-95">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Pontosan 3-szorosa! ({yearsOffset} év múlva: {age1AtOffset} = 3 · {age2AtOffset})</span>
                    </div>
                  )}

                  {isDouble && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs animate-in zoom-in-95">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Pontosan 2-szerese! ({yearsOffset} év múlva: {age1AtOffset} = 2 · {age2AtOffset})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Kétjegyű Számjegy-Csere */}
          {activeTab === 'number' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tízes jegy */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Tízes helyiérték (a):</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-mono font-black text-sm">
                        {tensDigit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="9"
                      value={tensDigit}
                      onChange={(e) => setTensDigit(parseInt(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono text-center">
                      Értéke: <MathText>{`${tensDigit} \\cdot 10 = ${tensDigit * 10}`}</MathText>
                    </div>
                  </div>

                  {/* Egyes jegy */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Egyes helyiérték (b):</span>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono font-black text-sm">
                        {unitsDigit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="9"
                      value={unitsDigit}
                      onChange={(e) => setUnitsDigit(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono text-center">
                      Értéke: <MathText>{`${unitsDigit} \\cdot 1 = ${unitsDigit}`}</MathText>
                    </div>
                  </div>
                </div>

                {/* Számok és Oszthatóság Kimutatása */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-center">
                    <div className="text-[11px] font-bold text-rose-600 uppercase">Eredeti szám</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white my-1 font-mono">
                      {originalNumber}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      10 · {tensDigit} + {unitsDigit}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-center">
                    <div className="text-[11px] font-bold text-indigo-600 uppercase">Felcserélt szám</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white my-1 font-mono">
                      {reversedNumber}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      10 · {unitsDigit} + {tensDigit}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-center">
                    <div className="text-[11px] font-bold text-emerald-600 uppercase">Különbség</div>
                    <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 my-1 font-mono">
                      {Math.abs(diff)}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600">
                      = 9 · |{tensDigit} - {unitsDigit}| (Mindig 9-cel osztható!)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 text-center">
                    <div className="text-[11px] font-bold text-purple-600 uppercase">Összeg</div>
                    <div className="text-2xl font-black text-purple-700 dark:text-purple-300 my-1 font-mono">
                      {sum}
                    </div>
                    <div className="text-[10px] font-bold text-purple-600">
                      = 11 · ({tensDigit} + {unitsDigit}) (Mindig 11-gyel osztható!)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. Szekció: Részletesen Kidolgozott Mintapéldák */}
      <TheorySection
        number={6}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Layers className="w-5 h-5 text-emerald-600" />}
        badge="Mintapéldák"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Mintapélda: Kétjegyű Számok */}
          <TheoryCard
            title="1. Mintapélda: Kétjegyű Szám Felcserélt Számjegyekkel"
            badge="Kétjegyű szám"
            badgeColor="rose"
            variant="highlight"
          >
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-medium text-slate-800 dark:text-slate-200">
                <strong>Feladat:</strong> Egy kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, az eredetinél 45-tel kisebb számot kapunk. Mi az eredeti szám?
              </div>

              <div className="space-y-1.5 font-mono text-[12px] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                <div><strong>1. Ismeretlenek kijelölése:</strong></div>
                <div className="pl-3">Tízes számjegy: <MathText>a</MathText>, Egyes számjegy: <MathText>9 - a</MathText></div>
                <div><strong>2. Számok helyiértékes felírása:</strong></div>
                <div className="pl-3 text-rose-600 dark:text-rose-400">Eredeti szám: 10a + (9 - a) = 9a + 9</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">Felcserélt szám: 10(9 - a) + a = 90 - 9a</div>
                <div><strong>3. Egyenlet felírása (Eredeti - Felcserélt = 45):</strong></div>
                <div className="pl-3">(9a + 9) - (90 - 9a) = 45</div>
                <div className="pl-3">9a + 9 - 90 + 9a = 45</div>
                <div className="pl-3">18a - 81 = 45   /+ 81</div>
                <div className="pl-3">18a = 126   /: 18</div>
                <div className="pl-3 font-bold text-emerald-600">a = 7 (tízes jegy) → 9 - 7 = 2 (egyes jegy)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs">
                <strong>Szöveges ellenőrzés:</strong>
                <div>Az eredeti szám a 72. Számjegyek összege: 7 + 2 = 9 ✓</div>
                <div>Felcserélt szám: 27. Különbségük: 72 - 27 = 45 ✓</div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold mt-0.5">Válasz: Az eredeti keresett szám a 72.</div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Mintapélda: Életkori Feladat */}
          <TheoryCard
            title="2. Mintapélda: Apa és Fia Életkora Jövőbeli Aránnyal"
            badge="Életkoros modell"
            badgeColor="indigo"
            variant="example"
          >
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 font-medium text-slate-800 dark:text-slate-200">
                <strong>Feladat:</strong> Apa most 38 éves, a fia pedig 10 éves. Hány év múlva lesz az apa életkora pontosan a fia korának háromszorosa?
              </div>

              <div className="space-y-1.5 font-mono text-[12px] bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                <div><strong>1. Ismeretlen:</strong> Legyen <MathText>x</MathText> az eltelt évek száma!</div>
                <div><strong>2. Életkorok x év múlva:</strong></div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">Apa kora: 38 + x</div>
                <div className="pl-3 text-indigo-600 dark:text-indigo-400">Fiú kora: 10 + x</div>
                <div><strong>3. Egyenlet (Apa = 3 · Fiú):</strong></div>
                <div className="pl-3">38 + x = 3(10 + x)</div>
                <div className="pl-3">38 + x = 30 + 3x   /- x</div>
                <div className="pl-3">38 = 30 + 2x   /- 30</div>
                <div className="pl-3">8 = 2x   /: 2</div>
                <div className="pl-3 font-bold text-emerald-600">x = 4</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs">
                <strong>Szöveges ellenőrzés:</strong>
                <div>4 év múlva apa kora: 38 + 4 = 42 év.</div>
                <div>4 év múlva fiú kora: 10 + 4 = 14 év.</div>
                <div>Háromszorosa-e? 14 · 3 = 42 = Apa kora ✓</div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold mt-0.5">Válasz: Pontosan 4 év múlva.</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Szekció: Tipikus Csapdák és Tévhitek */}
      <TheorySection
        number={7}
        title="Gyakori Csapdahelyzetek és Típustévesztések"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badge="Csapdák"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            trap="A helyiérték elfelejtése algebrai felíráskor"
            wrong="A kétjegyű szám = a · b vagy a + b"
            wrongExplanation="Ha egy szám tízes jegye a és egyes jegye b, a szám NEM az a·b szorzat! Például a 73 nem 7·3 = 21!"
            correct="Kétjegyű szám értéke: ab = 10a + b  (pl. 73 = 7 · 10 + 3)"
            correctExplanation="A számjegyek helyiértékét mindig be kell szorozni a helyiérték súlyával (tízes helyiértéket 10-zel)!"
            tip="Írd fel a füzeted tetejére nagy betűkkel: Kétjegyű szám = 10a + b!"
          />

          <TheoryTrapBox
            trap="Egyoldalú öregedés az életkori feladatban"
            wrong="Anya most A, lánya L → 5 év múlva: A + 5 = 2 · L"
            wrongExplanation="Gyakori hiba, hogy csak az egyik fél korához adják hozzá az éveket, mintha a másik szereplő kora megállt volna az időben!"
            correct="A + 5 = 2(L + 5)"
            correctExplanation="Az 5 év mindkét fél életében eltelt! A lány kora is (L + 5) lett, és ezt az egész kifejezést kell megszorozni 2-vel!"
            tip="Rajzolj mindig 3 oszlopos táblázatot (Múlt / Jelen / Jövő), így nem felejted el senki korát növelni!"
          />

          <TheoryTrapBox
            trap="A szorzótényező rossz oldalra helyezése"
            wrong="Apa 3-szor annyi idős, mint a fia → 3 · Apa = Fiú"
            wrongExplanation="Ha az apa 3-szorosa a fiúnak, és a már eleve nagyobb apát szorozzuk 3-mal, még 9-szer nagyobb lesz, sosem lesz egyenlő!"
            correct="Apa = 3 · Fiú  (A nagyobbik = 3 · kisebbik)"
            correctExplanation="Az egyenlőségjel mérleg: a kisebbik mennyiséget kell felnagyítani (megszorozni), hogy elérje a nagyobbikat!"
            tip="Kérdezd meg magadtól: melyikük a kisebb? A szorzót MINDIG a kisebbikhez kell írni!"
          />

          <TheoryTrapBox
            trap="Negatív, tört vagy nem életszerű gyökök figyelmen kívül hagyása"
            wrong="x = -4 jött ki az egyenletből → Válasz: a fiú -4 éves"
            wrongExplanation="Az egyenlet formálisan adhat negatív vagy tört eredményt, de a valóságban életkor nem lehet negatív vagy életszerűtlen!"
            correct="Ha x negatív, vagy nem egész számjegy adódik (pl. a = 4,7), akkor hibás volt az egyenlet felállítása, vagy nincs valós megoldás."
            correctExplanation="A szöveges feladatoknál a gyököknek meg kell felelniük a valósághű szöveges feltételeknek (számjegy: 0-9 egész, életkor: pozitív)!"
            tip="A feladat befejezésekor mindig gondold végig: létezhet-e ilyen ember vagy szám a valóságban?"
          />
        </div>
      </TheorySection>

      {/* 8. Szekció: Az Ellenőrzés Művészete */}
      <TheorySection
        number={8}
        title="Az Ellenőrzés Művészete Szöveges Környezetben"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        badge="Ellenőrzés"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCallout type="warning" title="Miért Tilos a Felírt Egyenletbe Behelyettesíteni?">
            <p>
              Ha magát az egyenletet írtad fel hibásan (például fordított szorzóval vagy rossz előjellel), a hibás egyenletbe való visszahelyettesítéskor a matematika stimmelni fog, és úgy hiszed, tökéletes a munkád!
            </p>
          </TheoryCallout>

          <TheoryCallout type="success" title="Az Eredeti Szöveges Visszaolvasás Szabálya">
            <p>
              Fogd a kiszámolt értékeket (pl. Apa: 42, Fia: 14), és olvasd végig velük a feladat eredeti szövegét mondatról mondatra! Ha minden állítás igaznak bizonyul a magyar szövegben, akkor a megoldásod garantáltan hibátlan.
            </p>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumbersAgesTheory;
