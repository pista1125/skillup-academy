import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { SubHundredsSvg, ExchangeTensSvg, JumpBackSvg, FillUpSvg, ToyShopSvg, NoExchangeTensSvg } from './ThreeDigitSubG3Figures';
import { FONT, DiscCell, PLACE_BODY, ItemIcon, ItemKind, PriceTag, rnd, shuffle, opts4, digitsOf, hoz } from './ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Felváltó: korongok a helyiérték-táblázatban, ha kell, felváltunk.
// ---------------------------------------------------------------------------
type LabKind = 'szazas' | 'tizes' | 'felvaltas';
interface DiscTask { a: number; b: number; kind: LabKind }

const makeDiscTask = (kind: LabKind): DiscTask => {
  for (;;) {
    if (kind === 'szazas') {
      const b = rnd(1, 3) * 100;
      const a = rnd(b / 100 + 1, 4) * 100 + rnd(0, 9) * 10 + rnd(0, 6);
      if (a > 499 || a % 100 === 0) continue;
      return { a, b, kind };
    }
    const a = rnd(21, 49) * 10;
    const b = rnd(11, 39) * 10;
    if (a % 100 === 0 || b % 100 === 0 || b >= a) continue;
    const A = digitsOf(a);
    const B = digitsOf(b);
    if (kind === 'tizes' && A.t < B.t) continue;
    if (kind === 'felvaltas' && A.t >= B.t) continue;
    return { a, b, kind };
  }
};

const wrongForDisc = (t: DiscTask): number[] => {
  const r = t.a - t.b;
  const A = digitsOf(t.a);
  const B = digitsOf(t.b);
  if (t.kind === 'szazas') return [t.a - t.b / 100, r + 100, r - 100];
  if (t.kind === 'tizes') return [r + 10, r - 10, r + 100];
  // tipikus hiba: helyi értékenként a nagyobbikból a kisebbet
  const naive = Math.abs(A.sz - B.sz) * 100 + Math.abs(A.t - B.t) * 10;
  return [naive, r + 100, r - 10];
};

// ---------------------------------------------------------------------------
// Labor II – Játékbolt: mennyi pénz marad?
// ---------------------------------------------------------------------------
const TOYS: { kind: ItemKind; name: string }[] = [
  { kind: 'robot', name: 'robot' },
  { kind: 'kite', name: 'sárkány' },
  { kind: 'ball', name: 'labda' },
  { kind: 'yoyo', name: 'jojó' },
  { kind: 'bear', name: 'maci' },
  { kind: 'puzzle', name: 'kirakó' },
  { kind: 'car', name: 'kisautó' },
  { kind: 'frisbee', name: 'frizbi' },
  { kind: 'dice', name: 'társasjáték' },
  { kind: 'book', name: 'mesekönyv' }
];
interface ShopTask { wallet: number; toy: { kind: ItemKind; name: string }; price: number; mode: 0 | 1 | 2; opts: number[] }

const makeShop = (): ShopTask => {
  const toy = TOYS[rnd(0, TOYS.length - 1)];
  for (;;) {
    const mode = rnd(0, 2) as 0 | 1 | 2;
    let wallet: number;
    let price: number;
    if (mode === 0) {
      wallet = rnd(30, 99) * 5;
      price = rnd(1, 3) * 100;
      if (wallet % 100 === 0) continue;
    } else if (mode === 1) {
      wallet = rnd(31, 50) * 10;
      price = rnd(11, 39) * 10;
      if (digitsOf(wallet).t >= digitsOf(price).t || price % 100 === 0) continue;
    } else {
      wallet = 500;
      price = rnd(21, 93) * 5;
      if (price % 100 === 0) continue;
    }
    if (price >= wallet) continue;
    const r = wallet - price;
    const wrong =
      mode === 0
        ? [wallet - price / 100, r + 100, r - 10]
        : mode === 1
          ? [Math.abs(digitsOf(wallet).sz - digitsOf(price).sz) * 100 + Math.abs(digitsOf(wallet).t - digitsOf(price).t) * 10, r + 100, r - 10]
          : [r + 10, r + 100, r - 10];
    return { wallet, toy, price, mode, opts: opts4(r, wrong) };
  }
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const ThreeDigitSubG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [kind, setKind] = useState<LabKind>('felvaltas');
  const [dt, setDt] = useState<DiscTask>({ a: 430, b: 260, kind: 'felvaltas' });
  const [have, setHave] = useState(digitsOf(430)); // a táblázatban lévő korongok (felváltás után)
  const [fresh, setFresh] = useState(0);
  const [taken, setTaken] = useState(false);
  const [dOpts, setDOpts] = useState<number[]>(shuffle([170, 230, 270, 160]));
  const [dDone, setDDone] = useState(false);
  const [dBad, setDBad] = useState<number | null>(null);
  const [dMsg, setDMsg] = useState('');
  const newDisc = (k: LabKind = kind) => {
    const t = makeDiscTask(k);
    setKind(k);
    setDt(t);
    setHave(digitsOf(t.a));
    setFresh(0);
    setTaken(false);
    setDOpts(opts4(t.a - t.b, wrongForDisc(t)));
    setDDone(false);
    setDBad(null);
    setDMsg('');
  };
  const B = digitsOf(dt.b);
  const exchange = () => {
    if (taken || have.sz === 0) return;
    setHave({ ...have, sz: have.sz - 1, t: have.t + 10 });
    setFresh(10);
    setDMsg(have.t >= B.t ? 'Felváltottál 1 százast 10 tízesre. Most nem lett volna rá szükség, de így is jó!' : '');
  };
  const take = () => {
    if (taken) return;
    if (have.t < B.t) {
      setDMsg(`Nincs elég tízes! ${have.t} tízesből nem tudsz ${B.t} tízest elvenni. Válts fel 1 százast!`);
      return;
    }
    if (have.e < B.e || have.sz < B.sz) {
      setDMsg('Ez nem megy így. Kérj új feladatot!');
      return;
    }
    setTaken(true);
    setFresh(0);
    setDMsg('');
  };
  const pickDisc = (v: number) => {
    if (dDone || !taken) return;
    const r = dt.a - dt.b;
    if (v === r) {
      setDDone(true);
      setDBad(null);
      setDMsg('');
      return;
    }
    setDBad(v);
    const left = { sz: have.sz - B.sz, t: have.t - B.t, e: have.e - B.e };
    if (Math.abs(v - r) === 100) setDMsg(`Számold meg újra a piros korongokat! ${left.sz} százas maradt.`);
    else if (Math.abs(v - r) === 10) setDMsg(`Számold meg újra a kék korongokat! ${left.t} tízes maradt.`);
    else setDMsg(`Csak a nem áthúzott korongokat számold: ${left.sz} százas, ${left.t} tízes, ${left.e} egyes.`);
  };
  const cw = [96, 160, 84];
  const cxs = [70, 166, 326];

  // ---- Labor II ----
  const [shop, setShop] = useState<ShopTask>({ wallet: 500, toy: TOYS[1], price: 245, mode: 2, opts: shuffle([255, 265, 355, 245]) });
  const [sDone, setSDone] = useState(false);
  const [sBad, setSBad] = useState<number | null>(null);
  const [sMsg, setSMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const newShop = () => {
    setShop(makeShop());
    setSDone(false);
    setSBad(null);
    setSMsg('');
  };
  const rest = shop.wallet - shop.price;
  const pickShop = (v: number) => {
    if (sDone) return;
    if (v === rest) {
      setSDone(true);
      setSBad(null);
      setSMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setSBad(v);
    setStreak(0);
    const W = digitsOf(shop.wallet);
    const P = digitsOf(shop.price);
    if (shop.mode === 0) setSMsg(`A ${shop.price} kerek százas: csak a százasok változnak! ${W.sz} − ${P.sz} = ${W.sz - P.sz} százas.`);
    else if (shop.mode === 1) setSMsg(`${W.t} tízesből nem lehet ${P.t} tízest elvenni. Válts fel 1 százast! Vagy így: ${shop.wallet} − ${P.sz * 100} = ${shop.wallet - P.sz * 100}, aztán − ${P.t * 10}.`);
    else {
      const up = Math.ceil(shop.price / 100) * 100;
      setSMsg(`Pótolj! ${shop.price}-${hoz(shop.price)} mennyi kell, hogy ${up} legyen? Utána ${up}-tól 500-ig mennyi?`);
    }
  };

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="haromjegyu-szamok-kivonasa"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="1. Háromjegyű számok kivonása"
      subtitle="Kerek százas és kerek tízesek elvétele, felváltás, pótlás 500-ig – fejben, korongokkal, pénzzel."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="rose"
      pdfFilename="3_osztaly_haromjegyu_szamok_kivonasa_tananyag.pdf"
      practiceTitle="Készen állsz? Vonjunk ki!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HELYI ÉRTÉK SZERINT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base font-black text-rose-900 dark:text-rose-200">
              465 − 200 = 265 &nbsp; 420 − 180 = 240
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Százast a százasokból, tízest a tízesekből veszel el.</li>
              <li><strong>Nincs elég tízes?</strong> Válts fel 1 százast 10 tízesre!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 86–87. o." badgeColor="rose">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Háromjegyű számokból vonunk ki. Most még <strong>fejben</strong>: korongokkal, pénzzel, számegyenesen.</p>
          <p>Ez a lépcső az <strong>írásbeli kivonáshoz</strong> (3. lecke).</p>
          <p>A kivonás részei: <strong>kisebbítendő − kivonandó = különbség</strong>. Például 465 − 200 = 265.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Kerek százast veszünk el" badge="Csak a százas változik" badgeColor="rose">
        <SubHundredsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="465 − 200" badge="−2 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">4 százas − 2 százas = 2 százas. A tízes és az egyes marad: <strong>265</strong>.</p>
          </TheoryCard>
          <TheoryCard title="378 − 300" badge="−3 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">3 − 3 = 0 százas. Marad 7 tízes és 8 egyes: <strong>78</strong>.</p>
          </TheoryCard>
          <TheoryCard title="290 − 100" badge="−1 százas" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy százassal kevesebb: <strong>190</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Kerek tízeseket veszünk el" badge="1 százas = 10 tízes" badgeColor="blue">
        <NoExchangeTensSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>470 − 230</strong>: van elég tízes. Százast a százasokból, tízest a tízesekből: <strong>240</strong>.
        </p>
        <ExchangeTensSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>420 − 180</strong>: 2 tízesből nem tudunk 8 tízest elvenni.</p>
          <p>Ezért <strong>1 százast felváltunk 10 tízesre</strong>. Így 3 százas és 12 tízes lesz.</p>
          <p>Most elveszünk 1 százast és 8 tízest. Marad 2 százas és 4 tízes: <strong>240</strong>.</p>
        </div>
        <JumpBackSvg />
        <TheoryCallout type="tip" title="Másképp is lehet">
          420 − 180 = 420 − 100 − 80. Előbb a százast veszed el (320), aztán a tízeseket: 320 − 80 = <strong>240</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Pótlással" badge="500-ból" badgeColor="emerald">
        <FillUpSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Ha 500 Ft-od van, és 285 Ft-ot költesz, gondolj arra: <strong>mennyi kell még a 285-höz, hogy 500 legyen?</strong> 285 + 15 = 300, 300 + 200 = 500. Tehát 215 Ft marad.
        </p>
        <TheoryCallout type="info" title="Ellenőrzés">
          Kivonás után adj össze! 215 + 285 = 500. Ha a kisebbítendőt kapod, jó a különbség.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Játékbolt" badgeColor="purple">
        <ToyShopSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Robot" badge="500 Ft − 320 Ft" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>500 − 300 = 200.</li>
              <li>200 − 20 = 180.</li>
              <li>Marad <strong>180 Ft</strong>. Próba: 180 + 320 = 500.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Sárkány" badge="500 Ft − 245 Ft" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Pótolok: 245 + 5 = 250, 250 + 50 = 300.</li>
              <li>300 + 200 = 500. Ez 5 + 50 + 200 = 255.</li>
              <li>Marad <strong>255 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Labda és jojó" badge="két játék" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Együtt: 180 + 90 = 270 Ft.</li>
              <li>500 − 270 = <strong>230 Ft</strong> marad.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Maci és jojó?" badge="elég a pénz?" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>415 + 90 = 505 Ft.</li>
              <li>505 több, mint 500. <strong>Nem elég</strong> a pénz!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="420 − 180"
          wrong="420 − 180 = 360"
          wrongExplanation="A tízeseknél a 8-ból vontad ki a 2-t. De a 420-ból kell elvenni, nem fordítva!"
          correct="420 − 180 = 240"
          correctExplanation="2 tízesből nem lehet 8-at elvenni. Válts fel 1 százast: 3 százas és 12 tízes. 12 − 8 = 4 tízes, 3 − 1 = 2 százas."
          tip="Mindig a felső számból (a kisebbítendőből) veszel el!"
        />
        <TheoryCallout type="warning" title="Jó helyről vedd el!">
          465 − 200 nem 463! A 200 két <strong>százas</strong>, nem két egyes. A százasok száma csökken: <strong>265</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Felváltó" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newDisc(kind)} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            {([
              ['szazas', 'Kerek százas'],
              ['tizes', 'Kerek tízesek'],
              ['felvaltas', 'Felváltással']
            ] as [LabKind, string][]).map(([k, l]) => (
              <button key={k} onClick={() => newDisc(k)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${kind === k ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white border-slate-300 text-slate-700'}`}>{l}</button>
            ))}
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {dt.a} − {dt.b} = {dDone ? <span className="text-emerald-600">{dt.a - dt.b}</span> : '?'}
          </div>
          <svg viewBox="0 0 420 150" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="418" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={cxs[i]} y={8} width={cw[i]} height={20} fill={['#f87171', '#60a5fa', '#facc15'][i]} stroke="#fff" />
                <text x={cxs[i] + cw[i] / 2} y={23} textAnchor="middle" fontSize="13" fontWeight="bold" fill={['#7f1d1d', '#0c2d6b', '#713f12'][i]}>{['sz', 't', 'e'][i]}</text>
                <rect x={cxs[i]} y={28} width={cw[i]} height={114} fill={PLACE_BODY[i]} opacity="0.6" stroke="#fff" />
              </g>
            ))}
            <text x="62" y="54" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">{dt.a}</text>
            <text x="62" y="76" textAnchor="end" fontSize="13" fontWeight="bold" fill="#dc2626">− {dt.b}</text>
            <DiscCell x={cxs[0]} y={38} w={cw[0]} n={have.sz} place={0} r={8} crossed={taken ? B.sz : 0} perRow={5} />
            <DiscCell x={cxs[1]} y={38} w={cw[1]} n={have.t} place={1} r={8} crossed={taken ? B.t : 0} fresh={fresh} perRow={8} />
            <DiscCell x={cxs[2]} y={38} w={cw[2]} n={have.e} place={2} r={8} crossed={taken ? B.e : 0} perRow={4} />
          </svg>
          {!taken && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={exchange} disabled={have.sz === 0} className="px-4 py-3 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[52px] disabled:opacity-40">Felváltok 1 százast 10 tízesre</button>
              <button onClick={take} className="px-4 py-3 rounded-xl bg-rose-600 text-white text-base font-bold min-h-[52px]">Elveszem: {dt.b}</button>
            </div>
          )}
          {taken && !dDone && (
            <>
              <div className="bg-rose-50 rounded-xl p-3 text-center text-rose-900 font-bold">Az áthúzott korongokat elvettük. Mennyi maradt?</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {dOpts.map((v) => (
                  <OptButton key={v} v={v} onClick={() => pickDisc(v)} state={dBad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {dMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{dMsg}</div>}
          {dDone && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Ügyes vagy! {dt.a} − {dt.b} = {dt.a - dt.b}. Próba: {dt.a - dt.b} + {dt.b} = {dt.a}. Kérj új feladatot!</div>}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Mennyi marad?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newShop} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <svg viewBox="0 0 320 120" className="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="318" height="118" rx="12" fill="#fff7ed" stroke="#fdba74" />
            <rect x="24" y="38" width="100" height="62" rx="10" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
            <rect x="24" y="28" width="100" height="16" rx="6" fill="#f59e0b" stroke="#a16207" strokeWidth="2" />
            <text x="74" y="78" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">{shop.wallet} Ft</text>
            <text x="74" y="18" textAnchor="middle" fontSize="11" fill="#475569">ennyi pénzed van</text>
            <text x="160" y="74" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#dc2626">−</text>
            <ItemIcon kind={shop.toy.kind} cx={246} cy={44} s={1.2} />
            <PriceTag x={206} y={72} text={`${shop.price} Ft`} w={86} fs={14} />
          </svg>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Megveszed: {shop.toy.name}. Mennyi pénzed marad?</div>
          <div className="text-center text-2xl font-black text-slate-800">
            {shop.wallet} Ft − {shop.price} Ft = {sDone ? <span className="text-emerald-600">{rest} Ft</span> : '?'}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {shop.opts.map((v) => (
              <OptButton key={v} v={`${v} Ft`} onClick={() => pickShop(v)} state={sDone && v === rest ? 'ok' : sBad === v ? 'bad' : null} />
            ))}
          </div>
          {sMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{sMsg}</div>}
          {sDone && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Szuper! {rest} Ft marad. Próba: {rest} + {shop.price} = {shop.wallet}. Kérj új feladatot!</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ThreeDigitSubG3Theory;
