import React, { useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { OneLoopSvg, TwoLoopsBlocksSvg, RegionNamesSvg, NumbersVennSvg, ApartLoopsSvg, NestedLoopsSvg } from './VennG3Figures';
import { Venn, VNum, place, Region, regionAt, LogicBlock, Block, ALL_BLOCKS, COLORS, SHAPES, COLOR_NAME, SHAPE_NAME, SHAPE_PLURAL, blockName } from './VennG3Parts';

// ---------------------------------------------------------------------------
// Tulajdonságok (címkék) számokra és logikai lapokra
// ---------------------------------------------------------------------------
interface Prop<T> {
  label: string;
  /** a karika neve mondatban: „a páros karikában” */
  test: (v: T) => boolean;
  /** rövid indoklás: miért igaz / miért nem igaz rá a címke */
  say: (v: T) => string;
}

const art = (n: number) => (n === 1 || n === 5 || (n >= 50 && n <= 59) || n >= 500 ? 'Az' : 'A');
const digitsWord = (n: number) => (n >= 100 ? 'háromjegyű' : n >= 10 ? 'kétjegyű' : 'egyjegyű');
const nal = (N: number) => (N === 250 ? `${N}-nél` : `${N}-nál`);

const NUM_PROPS: { fam: string; p: Prop<number> }[] = [
  { fam: 'par', p: { label: 'páros', test: (n) => n % 2 === 0, say: (n) => `${art(n)} ${n} ${n % 2 === 0 ? 'páros' : 'nem páros'}: az utolsó számjegye ${n % 10}.` } },
  { fam: 'par', p: { label: 'páratlan', test: (n) => n % 2 === 1, say: (n) => `${art(n)} ${n} ${n % 2 === 1 ? 'páratlan' : 'nem páratlan'}: az utolsó számjegye ${n % 10}.` } },
  { fam: 'jegy', p: { label: 'háromjegyű', test: (n) => n >= 100, say: (n) => `${art(n)} ${n} ${digitsWord(n)}.` } },
  { fam: 'jegy', p: { label: 'kétjegyű', test: (n) => n >= 10 && n < 100, say: (n) => `${art(n)} ${n} ${digitsWord(n)}.` } },
  { fam: 'kerek', p: { label: 'kerek tízes', test: (n) => n % 10 === 0, say: (n) => `${art(n)} ${n} ${n % 10 === 0 ? 'kerek tízes' : 'nem kerek tízes, mert nem 0 a vége'}.` } },
  ...[200, 250, 300].map((N) => ({
    fam: 'nagy',
    p: { label: `${nal(N)} nagyobb`, test: (n: number) => n > N, say: (n: number) => (n > N ? `${art(n)} ${n} nagyobb, mint ${N}.` : `${art(n)} ${n} nem nagyobb, mint ${N}.`) }
  })),
  ...[100, 300].map((N) => ({
    fam: 'nagy',
    p: { label: `${nal(N)} kisebb`, test: (n: number) => n < N, say: (n: number) => (n < N ? `${art(n)} ${n} kisebb, mint ${N}.` : `${art(n)} ${n} nem kisebb, mint ${N}.`) }
  }))
];

const BLOCK_PROPS: { fam: string; p: Prop<Block> }[] = [
  ...COLORS.map((c) => ({
    fam: 'szin',
    p: { label: COLOR_NAME[c], test: (b: Block) => b.color === c, say: (b: Block) => (b.color === c ? `Ez a lap ${COLOR_NAME[c]}.` : `Ez a lap nem ${COLOR_NAME[c]}, hanem ${COLOR_NAME[b.color]}.`) }
  })),
  ...SHAPES.map((s) => ({
    fam: 'forma',
    p: { label: SHAPE_PLURAL[s], test: (b: Block) => b.shape === s, say: (b: Block) => (b.shape === s ? `Ez a lap ${SHAPE_NAME[s]}.` : `Ez a lap nem ${SHAPE_NAME[s]}, hanem ${SHAPE_NAME[b.shape]}.`) }
  })),
  { fam: 'meret', p: { label: 'nagy', test: (b) => b.big, say: (b) => (b.big ? 'Ez a lap nagy.' : 'Ez a lap nem nagy, hanem kicsi.') } },
  { fam: 'meret', p: { label: 'kicsi', test: (b) => !b.big, say: (b) => (!b.big ? 'Ez a lap kicsi.' : 'Ez a lap nem kicsi, hanem nagy.') } },
  { fam: 'lyuk', p: { label: 'lyukas', test: (b) => b.holed, say: (b) => (b.holed ? 'Ez a lap lyukas.' : 'Ez a lap nem lyukas.') } }
];

const rnd = (n: number) => Math.floor(Math.random() * n);
const pick = <T,>(arr: T[]): T => arr[rnd(arr.length)];
const regionOf = <T,>(a: Prop<T>, b: Prop<T>, v: T): Region => (a.test(v) ? (b.test(v) ? 'ab' : 'a') : b.test(v) ? 'b' : 'out');
const pickPair = <T,>(list: { fam: string; p: Prop<T> }[]): [Prop<T>, Prop<T>] => {
  const x = pick(list);
  const y = pick(list.filter((q) => q.fam !== x.fam));
  return [x.p, y.p];
};
/** Véletlen szám 1–500 között, lehetőleg a kívánt részből. */
const numberFor = (a: Prop<number>, b: Prop<number>, r: Region, avoid: number[]): number | null => {
  for (let t = 0; t < 400; t++) {
    const n = 1 + rnd(500);
    if (!avoid.includes(n) && regionOf(a, b, n) === r) return n;
  }
  return null;
};

// ---------------------------------------------------------------------------
// Labor I – Tedd a helyére!
// ---------------------------------------------------------------------------
type PlaceTask = { kind: 'num'; a: Prop<number>; b: Prop<number>; v: number } | { kind: 'blk'; a: Prop<Block>; b: Prop<Block>; v: Block };

const newPlaceTask = (): PlaceTask => {
  const r = pick<Region>(['a', 'ab', 'b', 'out']);
  if (Math.random() < 0.5) {
    for (;;) {
      const [a, b] = pickPair(NUM_PROPS);
      const v = numberFor(a, b, r, []);
      if (v !== null) return { kind: 'num', a, b, v };
    }
  }
  for (;;) {
    const [a, b] = pickPair(BLOCK_PROPS);
    const ok = ALL_BLOCKS.filter((x) => regionOf(a, b, x) === r);
    if (ok.length) return { kind: 'blk', a, b, v: pick(ok) };
  }
};

const FIRST_PLACE: PlaceTask = { kind: 'num', a: NUM_PROPS[0].p, b: NUM_PROPS[2].p, v: 140 };

// ---------------------------------------------------------------------------
// Labor II – Olvasd le!
// ---------------------------------------------------------------------------
type QKind = 'ab' | 'A' | 'onlyB' | 'out' | 'union';
interface ReadTask {
  a: Prop<number>;
  b: Prop<number>;
  items: { r: Region; v: number }[];
  q: QKind;
}
const count = (t: ReadTask, rs: Region[]) => t.items.filter((i) => rs.includes(i.r)).length;
const answerOf = (t: ReadTask) =>
  t.q === 'ab' ? count(t, ['ab']) : t.q === 'A' ? count(t, ['a', 'ab']) : t.q === 'onlyB' ? count(t, ['b']) : t.q === 'out' ? count(t, ['out']) : count(t, ['a', 'ab', 'b']);
const questionOf = (t: ReadTask) =>
  t.q === 'ab'
    ? 'Hány szám van a közös részben?'
    : t.q === 'A'
      ? `Hány szám van a „${t.a.label}” karikában?`
      : t.q === 'onlyB'
        ? `Hány szám van csak a „${t.b.label}” karikában?`
        : t.q === 'out'
          ? 'Hány szám nincs egyik karikában sem?'
          : 'Hány szám van összesen a két karikában?';

const newReadTask = (): ReadTask => {
  for (;;) {
    const [a, b] = pickPair(NUM_PROPS);
    const want: Record<Region, number> = { a: 1 + rnd(3), ab: 1 + rnd(3), b: 1 + rnd(3), out: rnd(3) };
    const items: { r: Region; v: number }[] = [];
    let ok = true;
    (Object.keys(want) as Region[]).forEach((r) => {
      for (let i = 0; i < want[r]; i++) {
        const v = numberFor(a, b, r, items.map((x) => x.v));
        if (v === null) ok = false;
        else items.push({ r, v });
      }
    });
    if (ok) return { a, b, items, q: pick<QKind>(['ab', 'A', 'onlyB', 'out', 'union']) };
  }
};

const FIRST_READ: ReadTask = {
  a: NUM_PROPS[0].p,
  b: NUM_PROPS[5].p,
  items: [
    { r: 'a', v: 64 },
    { r: 'a', v: 128 },
    { r: 'ab', v: 216 },
    { r: 'ab', v: 450 },
    { r: 'ab', v: 302 },
    { r: 'b', v: 233 },
    { r: 'b', v: 415 },
    { r: 'out', v: 87 }
  ],
  q: 'A'
};

const REGION_TEXT = (a: string, b: string): Record<Region, string> => ({
  a: `csak a „${a}” karikába`,
  ab: 'a közös részbe',
  b: `csak a „${b}” karikába`,
  out: 'egyik karikába sem'
});

const btn = 'px-3 py-3 rounded-xl font-bold text-sm min-h-[52px] border-2 transition-colors';

export const VennG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [pt, setPt] = useState<PlaceTask>(FIRST_PLACE);
  const [pick1, setPick1] = useState<Region | null>(null);
  const [score, setScore] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const truth: Region = pt.kind === 'num' ? regionOf(pt.a, pt.b, pt.v) : regionOf(pt.a, pt.b, pt.v);
  const ok1 = pick1 === truth;
  const feedback1 = (): string => {
    if (!pick1) return '';
    const sayA = pt.kind === 'num' ? pt.a.say(pt.v) : pt.a.say(pt.v);
    const sayB = pt.kind === 'num' ? pt.b.say(pt.v) : pt.b.say(pt.v);
    if (ok1) return `Igen! ${sayA} ${sayB}`;
    const inA = truth === 'a' || truth === 'ab';
    const inB = truth === 'b' || truth === 'ab';
    const pA = pick1 === 'a' || pick1 === 'ab';
    const pB = pick1 === 'b' || pick1 === 'ab';
    if (pA !== inA) return `${sayA} Próbáld újra!`;
    if (pB !== inB) return `${sayB} Próbáld újra!`;
    return 'Próbáld újra!';
  };
  const choose = (r: Region) => {
    if (ok1) return;
    setPick1(r);
    if (r === truth) setScore((s) => s + 1);
  };
  const onSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const el = svgRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.width) return;
    const x = ((e.clientX - box.left) / box.width) * 240;
    const y = ((e.clientY - box.top) / box.height) * 180;
    choose(regionAt('overlap', x, y));
  };
  const rt1 = REGION_TEXT(pt.a.label, pt.b.label);

  // Labor II
  const [rt, setRt] = useState<ReadTask>(FIRST_READ);
  const [ans2, setAns2] = useState<number | null>(null);
  const right2 = answerOf(rt);
  const ok2 = ans2 === right2;
  const hint2 = (): string => {
    if (ans2 === null) return '';
    if (ok2) return `Szuper! ${right2} a jó válasz.`;
    if (rt.q === 'A' && ans2 === count(rt, ['a'])) return 'Ne felejtsd el a közös részt! Az is a karikán belül van.';
    if (rt.q === 'union' && ans2 === count(rt, ['a', 'b']) + 2 * count(rt, ['ab'])) return 'A közös részben lévő számokat csak egyszer számold!';
    if (rt.q === 'union' && ans2 === rt.items.length) return 'A karikákon kívüli számok nem számítanak bele!';
    if (rt.q === 'onlyB' && ans2 === count(rt, ['b', 'ab'])) return 'A „csak” azt jelenti: a közös rész nélkül.';
    return 'Számold meg újra! Ujjal mutass rá mindegyikre.';
  };

  return (
    <TheoryTemplate
      topicId="g3-grouping"
      subtopicId="venn-diagramok-es-halmazok"
      grade={3}
      chapterId="valogatasok-csoportositasok"
      title="2. Venn-diagramok és halmazok"
      subtitle="Halmazábra: keret, karikák, címkék és a közös rész."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
      themeColor="violet"
      pdfFilename="3_osztaly_venn_diagramok_es_halmazok_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A HALMAZÁBRA RÉSZEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center text-sm font-black text-violet-900 dark:text-violet-200">
              Közös rész: mindkét címke igaz rá.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Karikán belül: igaz rá a karika címkéje.</li>
              <li>Karikán kívül, a kereten belül: nem igaz rá.</li>
              <li>„Hány van a karikában?” – a közös részt is számold!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 70–71. o." badgeColor="violet">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Tegyél le a földre két karikát! Az egyikbe a piros lapok kerülnek, a másikba a lyukasak. Hová teszed a piros, lyukas lapot?</p>
          <p>A rajzot, amelyen karikákba válogatunk, <strong>halmazábrának</strong> hívjuk. Más néven <strong>Venn-diagram</strong>.</p>
          <p>A karikában lévő dolgok együtt egy <strong>halmazt</strong> alkotnak. A karika <strong>címkéje</strong> mondja meg, mi kerülhet bele.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Egy karika: belül vagy kívül?" badge="egy címke" badgeColor="rose">
        <OneLoopSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A nagy keret címkéje: <strong>Számok 500-ig</strong>. Minden szám a kereten belül van.</p>
          <p>A karikába a páros számok kerülnek. A páratlan számok a karikán <strong>kívül</strong> maradnak, de a kereten belül.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Két karika és a közös rész" badge="két címke" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <TwoLoopsBlocksSvg />
          <RegionNamesSvg />
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <p>Ha a két karika egymásba ér, <strong>négy hely</strong> van:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>csak a piros karikában: piros, de nem lyukas;</li>
            <li>a <strong>közös részben</strong>: piros is, lyukas is;</li>
            <li>csak a lyukas karikában: lyukas, de nem piros;</li>
            <li>egyik karikában sem: se nem piros, se nem lyukas.</li>
          </ul>
        </div>
        <TheoryCallout type="tip" title="Két kérdés, egy hely">
          Minden elemnél kérdezd meg: igaz rá az első címke? Igaz rá a második? A két válasz pontosan egy helyet ad.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Számok a halmazábrában" badge="olvasd le!" badgeColor="sky">
        <NumbersVennSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Hány páros szám van? A „páros” karikában: 3 csak ott, és 3 a közös részben. Összesen <strong>6</strong>.</p>
          <p>Hány háromjegyű szám van? 3 csak ott, 3 a közös részben: <strong>6</strong>.</p>
          <p>Hány szám nincs egyik karikában sem? Az 57 és a 3: <strong>2</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="5. Ha nincs közös rész" badge="külön karikák" badgeColor="amber">
        <ApartLoopsSvg />
        <p className="text-sm text-slate-700">Nincs olyan szám, amely páros, és 5-re végződik. Ezért ez a két karika nem ér össze. A közös rész üres lenne.</p>
      </TheorySection>

      <TheorySection title="6. Karika a karikában" badge="belső karika" badgeColor="emerald">
        <NestedLoopsSvg />
        <p className="text-sm text-slate-700">Minden kerek tízes páros szám. Ezért a „kerek tízesek” karikája a „páros” karikán belül van. A 46 páros, de nem kerek tízes: csak a nagy karikába kerül.</p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hová kerül a 140?" badge="páros • háromjegyű" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Páros? Igen, 0 a vége.</li>
              <li>Háromjegyű? Igen.</li>
              <li>Mindkettő igaz: a <strong>közös részbe</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hová kerül a 75?" badge="páros • háromjegyű" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Páros? Nem, 5 a vége.</li>
              <li>Háromjegyű? Nem, kétjegyű.</li>
              <li>Egyik sem igaz: a <strong>karikákon kívülre</strong>, de a kereten belül.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány piros lap van?" badge="olvasd le!" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Csak a piros karikában: 2 lap.</li>
              <li>A közös részben: 2 lap.</li>
              <li>Ezek is pirosak! 2 + 2 = <strong>4</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A közös rész mindkét karikához tartozik"
          wrong="A piros karikában 2 lap van. (Csak a bal szélét számoltam.)"
          wrongExplanation="A közös rész is a piros karikán belül van. Az ottani lapok is pirosak."
          correct="A piros karikában 2 + 2 = 4 lap van."
          correctExplanation="Számold meg a karikán belül mindet, a közös részt is!"
          tip="„Csak a piros karikában” = a közös rész nélkül. „A piros karikában” = a közös résszel együtt."
        />
        <TheoryCallout type="warning" title="Ami egyik karikába sem illik">
          Az is a halmazábrán van: a karikákon kívül, de a kereten belül. Ne hagyd ki!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Labor I: Tedd a helyére!" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-lg font-black text-violet-900">Hová kerül?</p>
            <div className="w-24">
              {pt.kind === 'num' ? (
                <svg viewBox="0 0 80 44" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <VNum x={40} y={22} n={pt.v} fs={22} hl />
                </svg>
              ) : (
                <svg viewBox="0 0 60 60" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  <LogicBlock b={pt.v} x={30} y={30} sw={2.5} />
                </svg>
              )}
            </div>
            {pt.kind === 'blk' && <p className="text-xs text-slate-500">({blockName(pt.v)})</p>}
          </div>
          <svg ref={svgRef} viewBox="0 0 240 180" className="w-full max-w-md mx-auto h-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={onSvgClick}>
            <Venn id="lab1" frame={pt.kind === 'num' ? 'Számok 500-ig' : 'Logikai lapok'} a={pt.a.label} b={pt.b.label} shade={pick1 ? [pick1] : []}>
              {pick1 &&
                (pt.kind === 'num' ? (
                  <VNum x={place('overlap', [{ r: pick1, v: 0 }])[0].x} y={place('overlap', [{ r: pick1, v: 0 }])[0].y} n={pt.v} hl={!ok1} />
                ) : (
                  <LogicBlock b={pt.v} x={place('overlap', [{ r: pick1, v: 0 }])[0].x} y={place('overlap', [{ r: pick1, v: 0 }])[0].y} k={0.7} sw={2} />
                ))}
            </Venn>
          </svg>
          <p className="text-xs text-slate-500 text-center">Koppints a halmazábra egyik részére, vagy válassz gombot!</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['a', 'ab', 'b', 'out'] as Region[]).map((r) => {
              const chosen = pick1 === r;
              const c = chosen ? (ok1 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-violet-50';
              return (
                <button key={r} onClick={() => choose(r)} className={`${btn} ${c}`}>
                  {rt1[r]}
                </button>
              );
            })}
          </div>
          {pick1 && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{feedback1()}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-violet-800">Jó válaszok: {score}</span>
            <button
              onClick={() => {
                setPt(newPlaceTask());
                setPick1(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="10. Labor II: Olvasd le!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <svg viewBox="0 0 240 180" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
            <Venn id="lab2" frame="Számok 500-ig" a={rt.a.label} b={rt.b.label}>
              {place('overlap', rt.items).map((p, i) => (
                <VNum key={i} x={p.x} y={p.y} n={p.v} />
              ))}
            </Venn>
          </svg>
          <p className="text-lg font-black text-sky-900 text-center">{questionOf(rt)}</p>
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {Array.from({ length: 10 }, (_, k) => k).map((k) => {
              const chosen = ans2 === k;
              const c = chosen ? (ok2 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50';
              return (
                <button key={k} onClick={() => !ok2 && setAns2(k)} className={`${btn} text-lg ${c}`}>
                  {k}
                </button>
              );
            })}
          </div>
          {ans2 !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{hint2()}</div>}
          <button
            onClick={() => {
              setRt(newReadTask());
              setAns2(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default VennG3Theory;
