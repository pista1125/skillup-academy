import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { OrderByHeightSvg, ArrowOrderSvg, ThreeOrdersSvg, OrderTreeSvg, DigitCardsSvg, OutfitsSvg, StatementsSvg } from './ArrangementsG3Figures';
import { Ball, DigitCard, LogicBlock, Block, PAL, PAL_NAME, PalName, permutations, COLOR_NAME, SHAPE_NAME, blockName } from './ArrangementsG3Parts';
import { ALL_BLOCKS, COLORS, SHAPES } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';

const pick = <X,>(arr: X[]): X => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <X,>(arr: X[]): X[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor I – Sorrendkereső (golyók vagy számkártyák)
// ---------------------------------------------------------------------------
type OrderTask = { kind: 'golyo'; items: PalName[] } | { kind: 'kartya'; items: string[] };

const BALL_COLORS: PalName[] = ['piros', 'kek', 'zold', 'sarga', 'lila', 'narancs'];

const newOrderTask = (prev?: OrderTask): OrderTask => {
  for (;;) {
    let t: OrderTask;
    if (Math.random() < 0.4) t = { kind: 'golyo', items: shuffle(BALL_COLORS).slice(0, 3) };
    else {
      // A számjegyek 0–4 közül: így minden kirakott szám 500 alatt marad.
      const ds = shuffle(['0', '1', '2', '3', '4']).slice(0, 3);
      t = { kind: 'kartya', items: ds };
    }
    if (!prev || prev.items.join() !== t.items.join()) return t;
  }
};

const FIRST_ORDER_TASK: OrderTask = { kind: 'golyo', items: ['piros', 'kek', 'zold'] };

const validOrders = (t: OrderTask): string[][] => {
  const all = permutations<string>(t.items as string[]);
  return t.kind === 'kartya' ? all.filter((p) => p[0] !== '0') : all;
};

const itemName = (t: OrderTask, x: string) => (t.kind === 'golyo' ? PAL_NAME[x] : x);

// ---------------------------------------------------------------------------
// Labor II – Igaz vagy hamis?
// ---------------------------------------------------------------------------
interface Prop {
  adj: string;
  test: (b: Block) => boolean;
}
const PROPS: Prop[] = [
  ...COLORS.map((c) => ({ adj: COLOR_NAME[c], test: (b: Block) => b.color === c })),
  ...SHAPES.map((s) => ({ adj: SHAPE_NAME[s], test: (b: Block) => b.shape === s })),
  { adj: 'nagy', test: (b: Block) => b.big },
  { adj: 'kicsi', test: (b: Block) => !b.big },
  { adj: 'lyukas', test: (b: Block) => b.holed },
  { adj: 'nem lyukas', test: (b: Block) => !b.holed }
];
type SKind = 'minden' | 'van' | 'sem';
interface StTask {
  blocks: Block[];
  kind: SKind;
  prop: Prop;
  truth: boolean;
}
const stText = (t: StTask) =>
  t.kind === 'minden' ? `Minden lap ${t.prop.adj}.` : t.kind === 'van' ? `Van olyan lap, amelyik ${t.prop.adj}.` : `Egyik lap sem ${t.prop.adj}.`;
const evalSt = (blocks: Block[], kind: SKind, prop: Prop) => {
  const n = blocks.filter(prop.test).length;
  return kind === 'minden' ? n === blocks.length : kind === 'van' ? n > 0 : n === 0;
};
const newStTask = (): StTask => {
  const want = Math.random() < 0.5;
  const kind = pick<SKind>(['minden', 'van', 'sem']);
  for (;;) {
    // „nem lyukas” csak a „van olyan” állításban („minden … nem”, „egyik sem nem” zavaró lenne).
    const prop = pick(kind === 'van' ? PROPS : PROPS.filter((p) => !p.adj.startsWith('nem')));
    // „Minden” igaz állításhoz a lapokat a tulajdonság szerint válogatjuk.
    const pool = kind === 'minden' && want ? ALL_BLOCKS.filter(prop.test) : (kind === 'sem' && want) || (kind === 'van' && !want) ? ALL_BLOCKS.filter((b) => !prop.test(b)) : ALL_BLOCKS;
    let blocks = shuffle(pool).slice(0, 6);
    if (kind === 'minden' && !want && Math.random() < 0.7) {
      // majdnem mind: csak egy lap kakukktojás
      blocks = [...shuffle(ALL_BLOCKS.filter(prop.test)).slice(0, 5), pick(ALL_BLOCKS.filter((b) => !prop.test(b)))];
      blocks = shuffle(blocks);
    }
    if (kind === 'van' && want && Math.random() < 0.6) {
      blocks = shuffle([...shuffle(ALL_BLOCKS.filter((b) => !prop.test(b))).slice(0, 5), pick(ALL_BLOCKS.filter(prop.test))]);
    }
    const truth = evalSt(blocks, kind, prop);
    if (truth === want) return { blocks, kind, prop, truth };
  }
};
const FIRST_ST: StTask = (() => {
  const blocks = [ALL_BLOCKS[0], ALL_BLOCKS[16], ALL_BLOCKS[9], ALL_BLOCKS[26], ALL_BLOCKS[42], ALL_BLOCKS[34]];
  const prop = PROPS.find((p) => p.adj === 'lyukas') as Prop;
  return { blocks, kind: 'minden', prop, truth: evalSt(blocks, 'minden', prop) };
})();

const BlockSvg: React.FC<{ b: Block }> = ({ b }) => (
  <svg viewBox="0 0 56 56" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <LogicBlock b={b} x={28} y={28} sw={2.5} />
  </svg>
);

const OrderItem: React.FC<{ t: OrderTask; x: string; size?: number }> = ({ t, x, size = 56 }) => (
  <svg viewBox="0 0 56 56" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    {t.kind === 'golyo' ? <Ball x={28} y={28} r={21} c={x as PalName} sw={3} /> : <DigitCard x={10} y={4} d={x} w={36} h={48} fs={30} fill={x === '0' ? '#fef3c7' : '#ffffff'} />}
  </svg>
);

export const ArrangementsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [ot, setOt] = useState<OrderTask>(FIRST_ORDER_TASK);
  const [cur, setCur] = useState<string[]>([]);
  const [found, setFound] = useState<string[][]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const valid = validOrders(ot);
  const done = found.length === valid.length;

  const tapItem = (x: string) => {
    if (done || cur.includes(x)) return;
    const next = [...cur, x];
    if (next.length < 3) {
      setCur(next);
      setMsg(null);
      return;
    }
    setCur([]);
    if (ot.kind === 'kartya' && next[0] === '0') {
      setMsg({ ok: false, text: `A ${next.join('')} nem háromjegyű szám. A 0 nem állhat elöl!` });
      return;
    }
    if (found.some((f) => f.join() === next.join())) {
      setMsg({ ok: false, text: 'Ezt már felírtad! Keress másikat!' });
      return;
    }
    const its = ot.items as string[];
    const all = [...found, next].sort((a, b) => its.indexOf(a[0]) - its.indexOf(b[0]) || its.indexOf(a[1]) - its.indexOf(b[1]));
    setFound(all);
    if (all.length === valid.length) {
      setMsg({
        ok: true,
        text:
          ot.kind === 'kartya' && ot.items.includes('0')
            ? `Megvan mind a ${valid.length}! A 0 nem állhat elöl, ezért nem 6, hanem csak 4 szám van.`
            : `Megvan mind a ${valid.length}! Mindegyik elöl 2-szer áll: 3 · 2 = 6.`
      });
    } else setMsg({ ok: true, text: `Jó! Még ${valid.length - all.length} hiányzik.` });
  };
  const hint = () => {
    const missing = valid.find((v) => !found.some((f) => f.join() === v.join()));
    if (!missing) return;
    const d = missing[0];
    const what = ot.kind === 'golyo' ? `a ${itemName(ot, d)} golyóval` : `${d === '1' ? 'az' : 'a'} ${d}-${d === '3' ? 'as' : 'es'} kártyával`;
    setMsg({ ok: true, text: `Tipp: keress olyat, ami ${what} kezdődik!` });
  };
  const newOrder = () => {
    setOt(newOrderTask(ot));
    setCur([]);
    setFound([]);
    setMsg(null);
  };

  // Labor II
  const [st, setSt] = useState<StTask>(FIRST_ST);
  const [ans, setAns] = useState<boolean | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const hits = st.blocks.map(st.prop.test);
  const answer = (v: boolean) => {
    if (ans !== null) return;
    setAns(v);
    setScore({ ok: score.ok + (v === st.truth ? 1 : 0), all: score.all + 1 });
  };
  const why = (): string => {
    const n = hits.filter(Boolean).length;
    const a = st.prop.adj;
    if (st.kind === 'minden') return st.truth ? `Mind a 6 lap ${a}. Igaz.` : `Van olyan lap, amelyik nem ${a}. Be is kereteztük${n === 5 ? '' : ' mindet'}. Egy is elég, és hamis.`;
    if (st.kind === 'van') return st.truth ? `Van ilyen lap, be is kereteztük. Egy is elég, és igaz.` : `Egyik lap sem ${a}. Ezért hamis.`;
    return st.truth ? `Tényleg egyik sem ${a}. Igaz.` : `Van köztük ${a} lap, be is kereteztük. Ezért hamis.`;
  };
  const marked = (i: number) => {
    if (ans === null) return false;
    if (st.kind === 'minden') return !st.truth && !hits[i];
    return hits[i];
  };

  return (
    <TheoryTemplate
      topicId="g3-grouping"
      subtopicId="sorba-rendezes-lehetosegek"
      grade={3}
      chapterId="valogatasok-csoportositasok"
      title="3. Sorba rendezés és lehetőségek"
      subtitle="Növekvő és csökkenő sorrend, hányféle sorrend, számkártyák, igaz vagy hamis."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_sorba_rendezes_lehetosegek_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HOGYAN SZÁMOLOM MEG?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm font-black text-emerald-900 dark:text-emerald-200">
              Rendszerezz! Először az első helyet rögzítsd.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>2 dolog: 2 sorrend. 3 dolog: 6 sorrend.</li>
              <li>Háromjegyű szám elején nem állhat 0.</li>
              <li>„Minden”: egy rossz is elég, és hamis. „Van olyan”: egy jó is elég, és igaz.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 68–73. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Sorba állsz a menzán. Ki az első? Ki a második? Ez a <strong>sorrend</strong>.</p>
          <p>Megtanulod sorba rakni a dolgokat: magasság, kor, szám szerint.</p>
          <p>Megszámolod, <strong>hányféleképpen</strong> lehet valamit sorba rakni. És eldöntöd, egy állítás <strong>igaz</strong> vagy <strong>hamis</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Sorba rendezés" badge="növekvő, csökkenő" badgeColor="sky">
        <OrderByHeightSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Növekvő sorrend" badge="kicsitől nagyig" badgeColor="emerald">
            <p className="text-sm text-slate-700">A legkisebb áll elöl. Mindig nagyobb jön.</p>
            <p className="text-sm text-slate-700 mt-1">
              Például: <strong>48, 184, 418</strong>
            </p>
          </TheoryCard>
          <TheoryCard title="Csökkenő sorrend" badge="nagytól kicsiig" badgeColor="sky">
            <p className="text-sm text-slate-700">A legnagyobb áll elöl. Mindig kisebb jön.</p>
            <p className="text-sm text-slate-700 mt-1">
              Például: <strong>500, 350, 35</strong>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Nyilas ábra" badge="kövesd a nyilat" badgeColor="amber">
        <ArrowOrderSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A nyíl mindig az <strong>alacsonyabbtól</strong> a <strong>magasabb</strong> felé mutat.</p>
          <p>Levi → Panna: Panna magasabb. Panna → Dóri: Dóri magasabb. Így a sorrend: Levi, Panna, Dóri.</p>
        </div>
        <TheoryCallout type="tip" title="Melyik a legmagasabb?">Akiből nem indul nyíl, csak érkezik, az a legmagasabb.</TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Hányféle sorrend?" badge="rendszerezés" badgeColor="rose">
        <ThreeOrdersSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <strong>2 dolog</strong> kétféleképpen állhat sorba: piros, kék vagy kék, piros.
          </p>
          <p>
            <strong>3 dolog</strong>: először a piros áll elöl. A másik kettő 2-féleképpen jöhet. Aztán a kék áll elöl, végül a zöld. Mindegyik elöl 2-szer áll: <strong>3 · 2 = 6</strong> sorrend.
          </p>
        </div>
        <TheoryCallout type="info" title="Így nem hagysz ki semmit">
          Ne találgass! Mindig az első helyet rögzítsd, és utána cseréld a többit.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. A lehetőségek fája" badge="fa-rajz" badgeColor="purple">
        <OrderTreeSvg />
        <p className="text-sm text-slate-700">
          Felülről lefelé olvasd! Az 1. helyre 3 golyó jöhet. Mindegyik után 2 ág indul a 2. helyre. A 3. helyre már csak 1 golyó marad. A fa alján 6 ág van: ez a 6 sorrend.
        </p>
      </TheorySection>

      <TheorySection title="6. Számok számkártyákból" badge="0 nem lehet elöl" badgeColor="orange">
        <DigitCardsSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A kártyákat sorba rakod, és egy háromjegyű számot kapsz. Minden kártyát egyszer használsz.</p>
          <p>
            Ha van köztük <strong>0</strong>, figyelj! A 023 nem háromjegyű szám, hanem 23. Ezért a 0-val kezdődő sorrendek kiesnek.
          </p>
        </div>
        <TheoryCallout type="tip" title="A legnagyobb és a legkisebb">
          Legnagyobb: a legnagyobb jegy kerül előre (1, 3, 4 → 431). Legkisebb: a legkisebb jegy kerül előre, de nem a 0 (3, 0, 2 → 203).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Párosítás: öltözetek, útvonalak" badge="· és nem +" badgeColor="sky">
        <OutfitsSvg />
        <p className="text-sm text-slate-700">
          2 pólód és 3 nadrágod van. Mindegyik pólóhoz 3 nadrágot vehetsz. Táblázatba írva jól látszik: <strong>2 · 3 = 6</strong> öltözet. Útvonalaknál is így számolunk: 2 út a parkig, onnan 3 út az iskoláig, ez 2 · 3 = 6 útvonal.
        </p>
      </TheorySection>

      <TheorySection title="8. Igaz vagy hamis?" badge="minden, van olyan, egyik sem" badgeColor="emerald">
        <StatementsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="„Minden”" badge="mindegyik" badgeColor="emerald">
            <p className="text-sm text-slate-700">Mindegyikre igaz kell legyen. Ha csak egy nem jó, az állítás hamis.</p>
          </TheoryCard>
          <TheoryCard title="„Van olyan”" badge="legalább egy" badgeColor="amber">
            <p className="text-sm text-slate-700">Elég egyet találni, és igaz. Ha egyet sem találsz, hamis.</p>
          </TheoryCard>
          <TheoryCard title="„Egyik sem”" badge="„nincs olyan”" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy sem lehet ilyen. Ha akár egy is ilyen, az állítás hamis.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="9. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Ki hányadik?" badge="feltételek" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Három autó versenyez: piros, kék, sárga.</li>
              <li>A sárga nem nyert. A kék a sárga mögött ért célba.</li>
              <li>A kék a sárga mögött van, tehát a kék sem nyert.</li>
              <li>Nyert: a <strong>piros</strong>. Aztán sárga, kék.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Számkártyák" badge="1, 0, 3" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 elöl: 103, 130.</li>
              <li>3 elöl: 301, 310.</li>
              <li>0 elöl: nem lehet.</li>
              <li>Összesen <strong>4</strong> háromjegyű szám.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Igaz vagy hamis?" badge="számok" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Számok: 120, 345, 208, 96.</li>
              <li>„Minden szám háromjegyű.” A 96 kétjegyű: <strong>hamis</strong>.</li>
              <li>„Van olyan szám, amelyik páratlan.” A 345: <strong>igaz</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Öltözetek: szorzunk, nem adunk össze!"
          wrong="2 póló és 3 nadrág: 2 + 3 = 5 öltözet."
          wrongExplanation="Egy öltözet = egy póló ÉS egy nadrág. Mindegyik pólóhoz mind a 3 nadrág jó."
          correct="2 · 3 = 6 öltözet."
          correctExplanation="Rajzold le táblázatban: 2 sor, 3 oszlop, 6 rubrika."
          tip="Kérdezd meg: mindegyikhez mindegyik jó? Akkor szorozz!"
        />
        <TheoryCallout type="warning" title="Ha a sorrend mindegy">
          2 gombócot kérsz: eper és csoki. A csoki-eper ugyanaz a fagyi! Ilyenkor a párokat csak egyszer számoljuk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="11. Labor I: Sorrendkereső" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">
            {ot.kind === 'golyo' ? 'Rakd sorba a 3 golyót! Keresd meg az összes sorrendet!' : 'Rakj ki háromjegyű számokat! Keresd meg az összeset!'} Koppints sorban a 3 elemre!
          </p>
          <div className="flex justify-center gap-3">
            {ot.items.map((x) => (
              <button
                key={x}
                aria-label={itemName(ot, x)}
                onClick={() => tapItem(x)}
                disabled={done || cur.includes(x)}
                className={`rounded-2xl border-2 p-2 min-w-[72px] min-h-[72px] flex items-center justify-center transition ${cur.includes(x) ? 'opacity-30 border-slate-200' : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'}`}
              >
                <OrderItem t={ot} x={x} />
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50">
                {cur[i] ? <OrderItem t={ot} x={cur[i]} size={48} /> : <span className="text-slate-400 font-bold">{i + 1}.</span>}
              </div>
            ))}
          </div>
          <div className="text-center text-sm font-bold text-emerald-900">
            Megtaláltad: {found.length} / {valid.length}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md mx-auto">
            {found.map((f) => (
              <div key={f.join()} className="flex justify-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 p-1">
                {ot.kind === 'golyo' ? (
                  f.map((x, i) => (
                    <svg key={i} viewBox="0 0 30 30" width={28} height={28}>
                      <Ball x={15} y={15} r={12} c={x as PalName} />
                    </svg>
                  ))
                ) : (
                  <span className="text-xl font-black text-slate-800 py-0.5">{f.join('')}</span>
                )}
              </div>
            ))}
          </div>
          {msg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                setCur([]);
                setMsg(null);
              }}
              className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Újrakezdem a sort
            </button>
            {!done && (
              <button onClick={hint} className="px-4 py-2 rounded-xl bg-amber-100 border-2 border-amber-300 text-amber-900 text-sm font-bold min-h-[48px]">
                Tipp
              </button>
            )}
            <button onClick={newOrder} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="12. Labor II: Igaz vagy hamis?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
            {st.blocks.map((b, i) => (
              <div
                key={i}
                aria-label={blockName(b)}
                className={`rounded-xl border-2 p-1 ${marked(i) ? (st.kind === 'van' && st.truth ? 'border-emerald-500 ring-2 ring-emerald-300 bg-emerald-50' : 'border-rose-500 ring-2 ring-rose-300 bg-rose-50') : 'border-slate-200 bg-white'}`}
              >
                <BlockSvg b={b} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-2xl bg-sky-100 border-2 border-sky-400 text-sky-900 font-black text-lg">{stText(st)}</span>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => answer(true)} disabled={ans !== null} className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-lg font-black min-h-[56px] min-w-[110px] disabled:opacity-60">
              Igaz
            </button>
            <button onClick={() => answer(false)} disabled={ans !== null} className="px-6 py-3 rounded-xl bg-rose-600 text-white text-lg font-black min-h-[56px] min-w-[110px] disabled:opacity-60">
              Hamis
            </button>
          </div>
          {ans !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${ans === st.truth ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {ans === st.truth ? 'Ügyes! ' : `Nem, az állítás ${st.truth ? 'igaz' : 'hamis'}. `}
              {why()}
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm font-bold text-sky-900">
              Jó válasz: {score.ok} / {score.all}
            </span>
            <button
              onClick={() => {
                setSt(newStTask());
                setAns(null);
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ArrangementsG3Theory;
