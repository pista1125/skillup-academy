import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  LotteryTicketSvg,
  LotteryHitsSvg,
  CountingCasesSvg,
  WordGridPathsSvg,
  CarsSeatingSvg
} from './CombinatoricsPractice1Figures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

type Model = 'perm' | 'var' | 'varrep' | 'comb' | 'combrep';

export const CombinatoricsPractice1Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: modellválasztó
  const [all, setAll] = useState<boolean>(false);
  const [order, setOrder] = useState<boolean>(true);
  const [rep, setRep] = useState<boolean>(false);
  const [n, setN] = useState<number>(10);
  const [k, setK] = useState<number>(2);

  // Labor II: rácsutak
  const [rows, setRows] = useState<number>(4);
  const [cols, setCols] = useState<number>(5);
  const [blocked, setBlocked] = useState<string[]>([]);

  const model: Model = all ? 'perm' : order ? (rep ? 'varrep' : 'var') : rep ? 'combrep' : 'comb';
  const kEff = rep ? k : Math.min(k, n);
  let formula = '';
  let value = 0;
  switch (model) {
    case 'perm':
      formula = `${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' · ')}`;
      value = fact(n);
      break;
    case 'var':
      formula = `${Array.from({ length: kEff }, (_, i) => n - i).join(' · ') || '1'}`;
      value = Array.from({ length: kEff }, (_, i) => n - i).reduce((a, b) => a * b, 1);
      break;
    case 'varrep':
      formula = `${n}^${kEff} = ${Array.from({ length: kEff }, () => n).join(' · ') || '1'}`;
      value = n ** kEff;
      break;
    case 'comb':
      formula = `(${n} alatt ${kEff}) = ${Array.from({ length: kEff }, (_, i) => n - i).join(' · ') || '1'} / ${kEff}!`;
      value = binom(n, kEff);
      break;
    case 'combrep':
      formula = kEff === 2 ? `${n} (két egyforma) + (${n} alatt 2) (két különböző)` : '';
      value = kEff === 2 ? n + binom(n, 2) : NaN;
      break;
  }
  const modelName: Record<Model, string> = {
    perm: 'Permutáció – mindet sorba rendezzük',
    var: 'Variáció ismétlés nélkül – számít a sorrend',
    varrep: 'Ismétléses variáció – számít a sorrend, lehet ismétlés',
    comb: 'Kombináció – nem számít a sorrend',
    combrep: 'Sorrend nem számít, de lehet ismétlés – esetszétválasztással számolunk'
  };

  const grid = useMemo(() => {
    const g: number[][] = [];
    for (let r = 0; r < rows; r++) {
      g.push([]);
      for (let c = 0; c < cols; c++) {
        if (blocked.includes(`${r}-${c}`)) g[r].push(0);
        else if (r === 0 && c === 0) g[r].push(1);
        else g[r].push((r > 0 ? g[r - 1][c] : 0) + (c > 0 ? g[r][c - 1] : 0));
      }
    }
    return g;
  }, [rows, cols, blocked]);
  const total = grid[rows - 1][cols - 1];
  const noBlock = binom(rows + cols - 2, rows - 1);
  const toggleCell = (r: number, c: number) => {
    if ((r === 0 && c === 0) || (r === rows - 1 && c === cols - 1)) return;
    const key = `${r}-${c}`;
    setBlocked((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));
  };
  const setGrid = (r: number, c: number) => {
    setRows(r);
    setCols(c);
    setBlocked([]);
  };

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="gyakorlas-kombinatorika-1"
      title="5. Gyakorlás – kombinatorika"
      subtitle="Lottó, zsűri, autók, jutalmak és szókiolvasás: összefoglaljuk az 1–4. lecke összeszámlálási alapeseteit, és tankönyvi feladatokon gyakorolunk."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="amber"
      pdfFilename="11_osztaly_kombinatorika_gyakorlas_1_tananyag.pdf"
      practiceTitle="Készen állsz a kombinatorikai gyakorló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott, vegyes interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HÁROM KÉRDÉS, NÉGY ALAPESET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-sm font-black">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">mindet sorba: n!</div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">sorrend + ismétlés: nᵏ</div>
              <div className="p-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">sorrend, nincs ismétlés: n · (n − 1) · … · (n − k + 1)</div>
              <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">nem számít a sorrend: (n alatt k)</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kérdezd meg: <strong>mindet</strong> felhasználom? <strong>Számít</strong> a sorrend (a szerep)? <strong>Ismétlődhetnek</strong> az elemek?</li>
              <li>Ha a feladat több független döntésből áll (pl. 3 kihúzott és 2 nem kihúzott szám), a lehetőségeket <strong>összeszorozzuk</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: Bence és az ötös lottó" badge="Tankönyv 60. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az ötös lottón 90 számból kell 5-öt megjelölni. Nem számít, melyiket jelöljük meg először – csak az, hogy melyik az 5 szám. A lehetséges tippek száma tehát
            </p>
            <p className="font-bold text-amber-800">(90 alatt 5) = 43 949 268.</p>
            <p>
              Egy szelvénnyel a telitalálat valószínűsége ≈ 1 : 44 000 000 ≈ 0,000 000 023. Hét tizedesjegyre kerekítve ez ugyanannyi, mintha egyáltalán nem töltene ki szelvényt!
            </p>
            <p className="text-xs text-slate-500">
              1. feladat – hatos lottó (45 számból 6): (45 alatt 6) = 8 145 060, a telitalálat esélye ≈ 0,000 000 123.
            </p>
          </div>
          <LotteryTicketSvg />
        </div>
      </TheorySection>

      {/* 2. Összefoglalás */}
      <TheorySection title="2. Összefoglalás: alapesetek az összeszámlálás során" badge="Ráadás – 62. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CountingCasesSvg />
          <TheoryTable
            headers={['Lecke', 'Alapeset', 'Tankönyvi példa']}
            rows={[
              ['16. Jelszavak', 'sorrend számít: n · (n − 1) · … vagy nᵏ', '{B; e; n; 1; 7}, 3 karakter: 5 · 4 · 3 = 60, ismétléssel 5³ = 125'],
              ['17. Sorba rendezés', 'n! (0! = 1)', '5 vadállat: 5! = 120; tigris és oroszlán egymás mellett: 2 · 4! = 48'],
              ['18. Nem számít a sorrend', 'n · (n − 1) · … · (n − k + 1) / k!', '9 elemű halmaz 4 elemű részhalmazai: 9 · 8 · 7 · 6 / 4! = 126'],
              ['19. Binomiális együtthatók', '(n alatt k) = n! / (k! (n − k)!)', 'sálminta (7 alatt 3) = 35; (n alatt k) = (n alatt n − k)']
            ]}
          />
        </div>
        <TheoryCallout type="info" title="Mit jelent, hogy számít a sorrend?">
          A kiválasztott elemek különböző „szerepbe” kerülnek: sorrendjük van (jelszó, sorban állás, többjegyű szám), más feladatot kapnak (titkár és jegyző), vagy különböző dolgokkal párosítjuk őket (különböző jutalmak). Ha mindegyik ugyanolyan szerepbe kerül (zsűritag, lottószám, kézfogás), a sorrend nem számít.
        </TheoryCallout>
        <TheoryCallout type="tip" title="Az nᵏ esetben k > n is lehet">
          Ha egy elemet többször is választhatunk, a sorozat hosszabb is lehet az elemek számánál – pl. egy 6 kérdéses teszt, ahol minden kérdésnél az A, B, C, D közül karikázunk: 4⁶ = 4096.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hány 3 találatos szelvény van?" badge="Kidolgozott feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3 találat: az 5 kihúzott számból 3-at jelöltünk meg: (5 alatt 3) = 10 lehetőség,</li>
              <li>és a 85 nem kihúzott számból 2-t: (85 alatt 2) = 3570 lehetőség.</li>
              <li>Bármely 3 eltalált szám bármely 2 nem eltalálttal párosítható: <strong>10 · 3570 = 35 700</strong>.</li>
            </ul>
            <LotteryHitsSvg className="w-full h-auto mt-3" />
            <p className="text-xs text-slate-500 mt-1">5. feladat: ugyanígy számolva kapjuk a teljes táblázatot.</p>
          </TheoryCard>
          <TheoryCard title="B) Lámpák és zsűri (2–3. feladat)" badge="Feladatok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>2.</strong> 7 lámpából legalább 5 világít: 5, 6 vagy 7 lámpa ⇒ (7 alatt 5) + (7 alatt 6) + (7 alatt 7) = 21 + 7 + 1 = <strong>29</strong>.
              </li>
              <li>
                <strong>3. a)</strong> 5 tanár és 8 diák, összesen 13 főből 6 fős zsűri: (13 alatt 6) = <strong>1716</strong>.
              </li>
              <li>
                <strong>3. b)</strong> 3 tanár és 3 diák: (5 alatt 3) · (8 alatt 3) = 10 · 56 = <strong>560</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) 15 barát három autóban (4. feladat)" badge="Feladat" badgeColor="emerald">
            <CarsSeatingSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Ki melyik autóba ül: (15 alatt 4) · (11 alatt 5) · (6 alatt 6) = 1365 · 462 · 1 = <strong>630 630</strong>.</li>
              <li><strong>b)</strong> Pontosan melyik ülésre: a 15 ülésre 15 embert rendezünk: 15! = <strong>1 307 674 368 000</strong>.</li>
              <li>
                <strong>c)</strong> Három egyforma 5 személyes autó: (15 alatt 5) · (10 alatt 5) = 756 756, de az autók sorrendje nem számít, ezért 3!-sal osztunk: <strong>126 126</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Két jutalom 10 ember között (6. feladat)" badge="Feladat" badgeColor="purple">
            <TheoryTable
              headers={['Eset', 'Számolás', 'Eredmény']}
              rows={[
                ['a) különböző jutalmak, mindenki legfeljebb egyet', '10 · 9', '90'],
                ['b) különböző jutalmak, valaki többet is kaphat', '10 · 10', '100'],
                ['c) egyforma jutalmak, mindenki legfeljebb egyet', '10 · 9 / 2', '45'],
                ['d) egyforma jutalmak, valaki többet is kaphat', '10 + 10 · 9 / 2', '55']
              ]}
            />
            <p className="text-xs text-slate-500 mt-2">A „10 + 9” válaszhoz nem tartozik feladat. A d) esetben szétválasztjuk: egy ember kapja mindkettőt (10) vagy két különböző ember (45).</p>
          </TheoryCard>
          <TheoryCard title="E) Páros vagy páratlan elemszámú részhalmazból van több? (7. feladat)" badge="Feladat" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> 9 elem: a komplementer páros ↔ páratlan párosítást ad (9 páratlan), ezért egyenlő: 256 – 256.
              </li>
              <li>
                <strong>b)</strong> 10 elem: 1 + 45 + 210 + 210 + 45 + 1 = 512 páros, 10 + 120 + 252 + 120 + 10 = 512 páratlan – egyenlő.
              </li>
              <li>
                <strong>c)</strong> Mindig egyenlő, mindkettőből 2ⁿ⁻¹ van: rögzítsünk egy elemet; ennek ki-be kapcsolása minden részhalmaz paritását megváltoztatja, így párba állítja a páros és a páratlan részhalmazokat.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) A TÉGLALAP szó kiolvasása" badge="Kidolgozott feladat" badgeColor="orange">
            <WordGridPathsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>I. megoldás:</strong> mezőről mezőre összeadjuk a bal oldali és a fölötte lévő mező útszámát ⇒ 35.</li>
              <li><strong>II. megoldás:</strong> 7 lépés, ebből 4 jobbra: (7 alatt 4) = (7 alatt 3) = 35.</li>
              <li>A MATEMATIKA szó a 5 × 6-os téglalapból (4 le, 5 jobbra): (9 alatt 4) = 126.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="G) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> 35 számból 7: a) P = 1 / (35 alatt 7) = 1 / 6 724 520 ≈ 0,000 000 149; b) 6 találat: (7 alatt 6) · (28 alatt 1) = 196.</li>
              <li><strong>HF 2.</strong> a) Dönci 5 lapja: (32 alatt 5) = 201 376; b) Bence a maradék 27 lapból kap 5-öt: (27 alatt 5) = 80 730.</li>
              <li><strong>HF 3.</strong> 14 napból a 4 zselés nap: (14 alatt 4) = 1001.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: összeadás vagy szorzás?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="3 tanár ÉS 3 diák – a két választás szorzódik"
          wrong="(5 alatt 3) + (8 alatt 3) = 10 + 56 = 66 zsűri"
          wrongExplanation="A tanárok és a diákok kiválasztása egyszerre történik: bármely tanárhármas bármely diákhármassal párosítható. Ilyenkor szorozni kell. Összeadni akkor kell, ha egymást kizáró esetek közül választunk (pl. 5 VAGY 6 VAGY 7 lámpa ég)."
          correct="(5 alatt 3) · (8 alatt 3) = 10 · 56 = 560 zsűri"
          correctExplanation="„és” (egymás utáni / egyidejű döntések) ⇒ szorzás; „vagy” (különálló esetek) ⇒ összeadás."
          tip="A 4. c) feladatnál ne feledd: ha az autók egyformák, az autók sorrendjét is ki kell szűrni (3!-sal osztunk)."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Modellválasztó döntési fa" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { q: '1. Mindegyik elemet sorba rendezzük?', v: all, set: setAll, disabled: false },
              { q: '2. Számít a kiválasztás sorrendje?', v: order, set: setOrder, disabled: all },
              { q: '3. Ismétlődhetnek az elemek?', v: rep, set: setRep, disabled: all }
            ].map((item) => (
              <div key={item.q} className={`rounded-xl border p-3 ${item.disabled ? 'opacity-40' : ''}`}>
                <div className="text-xs font-semibold text-slate-700 mb-2">{item.q}</div>
                <div className="flex gap-2">
                  {[true, false].map((b) => (
                    <button
                      key={String(b)}
                      disabled={item.disabled}
                      onClick={() => item.set(b)}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold ${
                        item.v === b ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {b ? 'Igen' : 'Nem'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">n (elemek száma): {n}</label>
              <input type="range" min="1" max="15" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-amber-600" aria-label="n" />
            </div>
            <div className={all ? 'opacity-40' : ''}>
              <label className="block text-xs font-semibold text-slate-600 mb-1">k (kiválasztott elemek): {kEff}</label>
              <input
                type="range"
                min="0"
                max={rep ? 10 : n}
                value={kEff}
                disabled={all}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full accent-orange-600"
                aria-label="k"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-bold text-amber-800">{modelName[model]}</div>
            {model === 'combrep' && kEff !== 2 ? (
              <div className="text-xs">
                Ez nem szerepel az alapesetek között. k = 2 esetén esetszétválasztással számolható (lásd a 6. d) feladatot): állítsd k-t 2-re!
              </div>
            ) : (
              <>
                <div className="font-mono">{formula}</div>
                <div className="text-lg">
                  Lehetőségek száma: <strong>{fmtInt(value)}</strong>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '6. a) különböző jutalmak', s: [false, true, false, 10, 2] },
              { name: '6. b) többet is kaphat', s: [false, true, true, 10, 2] },
              { name: '6. c) egyforma jutalmak', s: [false, false, false, 10, 2] },
              { name: '6. d) egyforma, többet is', s: [false, false, true, 10, 2] },
              { name: 'Cirkusz: 5 vadállat', s: [true, true, false, 5, 5] },
              { name: 'Teszt: 4 válasz, 6 kérdés', s: [false, true, true, 4, 6] },
              { name: 'Zsűri: 13-ból 6', s: [false, false, false, 13, 6] }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setAll(p.s[0] as boolean);
                  setOrder(p.s[1] as boolean);
                  setRep(p.s[2] as boolean);
                  setN(p.s[3] as number);
                  setK(p.s[4] as number);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-100 text-orange-800 hover:bg-orange-200"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Hányféleképpen olvasható ki?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">sorok száma: {rows}</label>
              <input type="range" min="2" max="7" value={rows} onChange={(e) => setGrid(Number(e.target.value), cols)} className="w-full accent-emerald-600" aria-label="sorok száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">oszlopok száma: {cols}</label>
              <input type="range" min="2" max="8" value={cols} onChange={(e) => setGrid(rows, Number(e.target.value))} className="w-full accent-teal-600" aria-label="oszlopok száma" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setGrid(4, 5)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">TÉGLALAP (4 × 5)</button>
            <button onClick={() => setGrid(5, 6)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200">MATEMATIKA (5 × 6)</button>
            <button onClick={() => setBlocked([])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">Tiltások törlése</button>
          </div>
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 2.75rem)` }}>
            {grid.map((row, r) =>
              row.map((v, c) => {
                const isBlocked = blocked.includes(`${r}-${c}`);
                const isEnd = r === rows - 1 && c === cols - 1;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => toggleCell(r, c)}
                    className={`h-11 rounded-lg text-sm font-bold border-2 ${
                      isBlocked
                        ? 'bg-slate-700 border-slate-800 text-white'
                        : isEnd
                          ? 'bg-emerald-600 border-emerald-800 text-white'
                          : 'bg-white border-emerald-200 text-emerald-900'
                    }`}
                    aria-label={`${r + 1}. sor ${c + 1}. oszlop`}
                  >
                    {isBlocked ? '✕' : v}
                  </button>
                );
              })
            )}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              Utak száma a bal felső sarokból a jobb alsóba (jobbra vagy lefelé lépve): <strong>{fmtInt(total)}</strong>
            </div>
            <div>
              Tiltás nélkül: {rows + cols - 2} lépésből {rows - 1} lefelé ⇒ ({rows + cols - 2} alatt {rows - 1}) = <strong>{fmtInt(noBlock)}</strong>
            </div>
            {blocked.length > 0 && <div className="text-xs text-slate-500">A tiltott mezőn át vezető utak: {fmtInt(noBlock - total)}.</div>}
          </div>
          <TheoryCallout type="tip" title="Próbáld ki: „a 13. terembe ne tedd a lábad!”">
            Kattints egy mezőre, hogy letiltsd – mint a mesebeli kastélyban a 13. termet. A táblázatos (összeadós) módszer ilyenkor is működik, a képlet viszont már csak a tiltás nélküli esetre igaz.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsPractice1Theory;
