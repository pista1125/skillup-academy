import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { LogicSetSvg, OnePropertySortSvg, TwoPropertiesSvg, OddOneOutSvg, SortingTreeSvg, NumberLabelsSvg } from './SortingByPropertyG3Figures';
import { Block, LogicBlock, ALL_BLOCKS, COLORS, SHAPES, COLOR_NAME, SHAPE_NAME, SHAPE_PLURAL, blockName, sameBlock } from './SortingByPropertyG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Válogass a címke szerint!
// ---------------------------------------------------------------------------
interface Rule {
  label: string;
  test: (b: Block) => boolean;
  /** Miért nem illik ide a lap? */
  why: (b: Block) => string;
}

const colorRule = (c: (typeof COLORS)[number], neg: boolean): Rule => ({
  label: neg ? `nem ${COLOR_NAME[c]} lapok` : `${COLOR_NAME[c]} lapok`,
  test: (b) => (b.color === c) !== neg,
  why: (b) => (neg ? `Ez a lap ${COLOR_NAME[c]}.` : `Ez a lap nem ${COLOR_NAME[c]}, hanem ${COLOR_NAME[b.color]}.`)
});
const shapeRule = (s: (typeof SHAPES)[number], neg: boolean): Rule => ({
  label: neg ? `nem ${SHAPE_PLURAL[s]}` : SHAPE_PLURAL[s],
  test: (b) => (b.shape === s) !== neg,
  why: (b) => (neg ? `Ez a lap ${SHAPE_NAME[s]}.` : `Ez a lap nem ${SHAPE_NAME[s]}, hanem ${SHAPE_NAME[b.shape]}.`)
});
const sizeRule = (big: boolean): Rule => ({
  label: big ? 'nagy lapok' : 'kicsi lapok',
  test: (b) => b.big === big,
  why: () => (big ? 'Ez a lap kicsi.' : 'Ez a lap nagy.')
});
const holeRule = (holed: boolean): Rule => ({
  label: holed ? 'lyukas lapok' : 'nem lyukas lapok',
  test: (b) => b.holed === holed,
  why: () => (holed ? 'Ez a lap nem lyukas.' : 'Ez a lap lyukas.')
});
const andRule = (a: Rule, c: Rule, label: string): Rule => ({
  label,
  test: (b) => a.test(b) && c.test(b),
  why: (b) => (!a.test(b) ? a.why(b) : c.why(b))
});

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomRule = (): Rule => {
  const kind = Math.floor(Math.random() * 6);
  const c = pick(COLORS);
  const s = pick(SHAPES);
  if (kind === 0) return colorRule(c, false);
  if (kind === 1) return shapeRule(s, Math.random() < 0.4);
  if (kind === 2) return Math.random() < 0.5 ? sizeRule(Math.random() < 0.5) : holeRule(Math.random() < 0.5);
  if (kind === 3) return colorRule(c, true);
  if (kind === 4) {
    const big = Math.random() < 0.5;
    return andRule(colorRule(c, false), sizeRule(big), `${big ? 'nagy' : 'kicsi'} és ${COLOR_NAME[c]} lapok`);
  }
  const holed = Math.random() < 0.5;
  return andRule(shapeRule(s, false), holeRule(holed), `${holed ? 'lyukas' : 'nem lyukas'} ${SHAPE_PLURAL[s]}`);
};

const newSortTask = (): { rule: Rule; blocks: Block[] } => {
  for (;;) {
    const rule = randomRule();
    const pool = [...ALL_BLOCKS].sort(() => Math.random() - 0.5);
    const blocks = pool.slice(0, 8);
    const n = blocks.filter(rule.test).length;
    if (n >= 2 && n <= 5) return { rule, blocks };
  }
};

const FIRST_TASK: { rule: Rule; blocks: Block[] } = {
  rule: colorRule('piros', false),
  blocks: [
    ALL_BLOCKS[0],
    ALL_BLOCKS[13],
    ALL_BLOCKS[7],
    ALL_BLOCKS[27],
    ALL_BLOCKS[10],
    ALL_BLOCKS[40],
    ALL_BLOCKS[3],
    ALL_BLOCKS[33]
  ]
};

// ---------------------------------------------------------------------------
// Labor II – Barkochba
// ---------------------------------------------------------------------------
interface BQ {
  q: string;
  test: (b: Block) => boolean;
}
const BARKO_QUESTIONS: BQ[] = [
  ...COLORS.map((c) => ({ q: `${COLOR_NAME[c][0].toUpperCase()}${COLOR_NAME[c].slice(1)}?`, test: (b: Block) => b.color === c })),
  ...SHAPES.map((s) => ({ q: `${SHAPE_NAME[s][0].toUpperCase()}${SHAPE_NAME[s].slice(1)}?`, test: (b: Block) => b.shape === s })),
  { q: 'Nagy?', test: (b: Block) => b.big },
  { q: 'Lyukas?', test: (b: Block) => b.holed }
];

const BlockSvg: React.FC<{ b: Block; faded?: boolean }> = ({ b, faded }) => (
  <svg viewBox="0 0 56 56" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <LogicBlock b={b} x={28} y={28} sw={2.5} faded={faded} />
  </svg>
);

const btn = 'px-3 py-3 rounded-xl font-bold text-sm min-h-[52px] border-2 transition-colors';

export const SortingByPropertyG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [task, setTask] = useState(FIRST_TASK);
  const [sel, setSel] = useState<boolean[]>(Array(8).fill(false));
  const [checked, setChecked] = useState(false);
  const fits = task.blocks.map(task.rule.test);
  const wrongSel = task.blocks.findIndex((b, i) => sel[i] && !fits[i]);
  const missing = fits.filter((f, i) => f && !sel[i]).length;
  const allOk = wrongSel < 0 && missing === 0;

  // Labor II
  const [secret, setSecret] = useState<Block>(ALL_BLOCKS[20]);
  const [asked, setAsked] = useState<{ q: string; yes: boolean }[]>([]);
  const [out, setOut] = useState<boolean[]>(Array(48).fill(false));
  const [guessMsg, setGuessMsg] = useState<string | null>(null);
  const [found, setFound] = useState(false);
  const left = out.filter((o) => !o).length;

  const ask = (bq: BQ) => {
    if (found || asked.some((a) => a.q === bq.q)) return;
    const yes = bq.test(secret);
    setAsked([...asked, { q: bq.q, yes }]);
    setOut(out.map((o, i) => o || bq.test(ALL_BLOCKS[i]) !== yes));
    setGuessMsg(null);
  };
  const guess = (i: number) => {
    if (found || out[i]) return;
    if (sameBlock(ALL_BLOCKS[i], secret)) {
      setFound(true);
      setGuessMsg(`Kitaláltad! Ez a ${blockName(secret)}. Ennyi kérdés kellett: ${asked.length}.`);
    } else {
      setOut(out.map((o, k) => o || k === i));
      setAsked([...asked, { q: 'Tipp', yes: false }]);
      setGuessMsg('Nem ez az. Kérdezz még!');
    }
  };
  const newBarko = () => {
    setSecret(pick(ALL_BLOCKS));
    setAsked([]);
    setOut(Array(48).fill(false));
    setGuessMsg(null);
    setFound(false);
  };

  return (
    <TheoryTemplate
      topicId="g3-grouping"
      subtopicId="valogatas-tulajdonsagok-szerint"
      grade={3}
      chapterId="valogatasok-csoportositasok"
      title="1. Válogatás tulajdonságok szerint"
      subtitle="Logikai lapok, címkék, kakukktojás és barkochba."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_valogatas_tulajdonsagok_szerint_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — HOGYAN VÁLOGATUNK?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm font-black text-emerald-900 dark:text-emerald-200">
              Nézd a címkét! Csak az kerül be, amire a címke igaz.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Logikai lap: szín, forma, méret, lyukas-e.</li>
              <li>„piros és lyukas”: mindkettő igaz legyen!</li>
              <li>„nem piros”: minden más szín ide tartozik.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 68–69. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A játékokat dobozokba rakod. Az autók ide, a kockák oda. Ez a <strong>válogatás</strong>.</p>
          <p>Először megnézed, <strong>milyen</strong> a dolog. Ez a <strong>tulajdonsága</strong>. Aztán eldöntöd, hová kerül.</p>
          <p>Ebben a leckében logikai lapokat, gombokat és számokat válogatunk.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A logikai lapok" badge="4 tulajdonság" badgeColor="sky">
        <LogicSetSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Négy kérdés" badge="Milyen a lap?" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Milyen színű? piros, sárga, kék, zöld</li>
              <li>Milyen formájú? kör, háromszög, négyzet</li>
              <li>Milyen nagy? nagy vagy kicsi</li>
              <li>Lyukas? lyukas vagy nem lyukas</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Nincs két egyforma" badge="48 lap" badgeColor="emerald">
            <p className="text-sm text-slate-700">A készletben 48 lap van. Mindegyik más. Ha a négy tulajdonságot megmondod, pontosan egy lapra illik.</p>
            <p className="text-sm text-slate-700 mt-2">Például: <strong>nagy, kék, lyukas háromszög</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Válogatás egy tulajdonság szerint" badge="címke" badgeColor="rose">
        <OnePropertySortSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A doboz tetején van a <strong>címke</strong>. Megmondja, mi kerülhet bele.</p>
          <p>A „nem piros lapok” közé kerül minden sárga, kék és zöld lap.</p>
        </div>
        <TheoryCallout type="tip" title="Minden lapnak van helye">
          Ha a két címke „piros” és „nem piros”, akkor minden lap pontosan az egyik dobozba kerül.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Két tulajdonság egyszerre" badge="… és …" badgeColor="amber">
        <TwoPropertiesSvg />
        <TheoryCallout type="info" title="Az „és” szó">
          „Piros és lyukas”: a lap legyen piros, és legyen lyukas is. Ha csak az egyik igaz, nem kerül be.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Számok válogatása" badge="címke" badgeColor="sky">
        <NumberLabelsSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Számokat is válogathatsz. Néhány jó címke:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>páros számok, páratlan számok</li>
            <li>kétjegyű számok, háromjegyű számok</li>
            <li>kerek tízesek (pl. 70, 240, 500)</li>
            <li>300-nál kisebb számok</li>
          </ul>
        </div>
      </TheorySection>

      <TheorySection title="6. Melyik nem illik a sorba?" badge="kakukktojás" badgeColor="orange">
        <OddOneOutSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Keresd meg, miben más az egyik! Mondd el az okát is!</p>
          <p>Néha <strong>több jó megoldás</strong> is van. A lényeg: tudd megmondani, miért.</p>
        </div>
      </TheorySection>

      <TheorySection title="7. Válogatási fa" badge="lépésenként" badgeColor="purple">
        <SortingTreeSvg />
        <p className="text-sm text-slate-700">Először egy kérdés szerint válogatsz: lyukas vagy nem lyukas? Aztán mindkét csoportot tovább: milyen formájú? A fa minden ágán más lap van.</p>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mi a címke?" badge="számok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A dobozban: 140, 30, 260, 410.</li>
              <li>Mindegyik végén 0 van.</li>
              <li>Címke: <strong>kerek tízesek</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kakukktojás" badge="ok is kell" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Sor: 18, 46, 73, 120.</li>
              <li>A 73 páratlan, a többi páros.</li>
              <li>Tehát a <strong>73</strong> nem illik a sorba.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Barkochba" badge="igen / nem" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>„Nagy?” – nem. Tehát kicsi.</li>
              <li>„Lyukas?” – igen.</li>
              <li>„Kék?” – igen. „Kör?” – nem. „Háromszög?” – igen.</li>
              <li>Ez a <strong>kicsi, kék, lyukas háromszög</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Ügyes barkochbázó">
          A jó kérdés sok lapot kizár. A „Nagy?” kérdés után a lapok fele mindig kiesik.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="„Kicsi és piros”: mindkettő kell!"
          wrong="A kicsi kék kört is beraktam, mert kicsi."
          wrongExplanation="A kék kör kicsi, de nem piros. Egy tulajdonság nem elég."
          correct="Csak a kicsi ÉS piros lapok kerülnek be."
          correctExplanation="Minden lapnál két kérdés: kicsi? piros? Csak a két „igen” jó."
          tip="Olvasd el a címke minden szavát!"
        />
        <TheoryCallout type="warning" title="A határ is számít">
          „250-nél kisebb számok”: a 250 nem kerül be, mert nem kisebb önmagánál. A 250 a „nem kisebb, mint 250” csoportba megy.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="10. Labor I: Válogass a címke szerint!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-lg">{task.rule.label}</span>
            <p className="text-sm text-slate-600 mt-2">Koppints azokra a lapokra, amelyekre igaz a címke!</p>
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {task.blocks.map((b, i) => {
              let cls = sel[i] ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-slate-200 bg-white';
              if (checked && sel[i] && !fits[i]) cls = 'border-rose-500 bg-rose-50 ring-2 ring-rose-300';
              if (checked && !sel[i] && fits[i]) cls = 'border-amber-400 border-dashed bg-amber-50';
              return (
                <button
                  key={i}
                  aria-label={blockName(b)}
                  onClick={() => {
                    if (checked && allOk) return;
                    setSel(sel.map((s, k) => (k === i ? !s : s)));
                    setChecked(false);
                  }}
                  className={`rounded-xl border-2 p-1 min-h-[64px] transition-colors ${cls}`}
                >
                  <BlockSvg b={b} />
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setChecked(true)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setTask(newSortTask());
                setSel(Array(8).fill(false));
                setChecked(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
          {checked && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${allOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {allOk
                ? `Szuper! Mind a ${fits.filter(Boolean).length} lapot megtaláltad.`
                : wrongSel >= 0
                  ? `A pirossal keretezett lap nem illik ide. ${task.rule.why(task.blocks[wrongSel])} Koppints rá újra!`
                  : `Még ${missing} lap hiányzik. A sárga szaggatott keret mutatja.`}
            </div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="11. Labor II: Barkochba" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">
            Gondoltam egy lapra. Kérdezz! Én csak <strong>igen</strong>t vagy <strong>nem</strong>et mondok. Ha tudod, koppints a lapra!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {BARKO_QUESTIONS.map((bq) => {
              const a = asked.find((x) => x.q === bq.q);
              const cls = a ? (a.yes ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-slate-400 text-white border-slate-500') : 'bg-white text-slate-800 border-slate-300 hover:bg-sky-50';
              return (
                <button key={bq.q} onClick={() => ask(bq)} className={`${btn} ${cls}`}>
                  {bq.q} {a ? (a.yes ? '– igen' : '– nem') : ''}
                </button>
              );
            })}
          </div>
          <div className="text-center text-sm font-bold text-sky-900">
            Kérdések: {asked.length} • Még szóba jöhet: {left} lap
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-12 gap-1">
            {ALL_BLOCKS.map((b, i) => (
              <button
                key={i}
                aria-label={blockName(b)}
                onClick={() => guess(i)}
                className={`rounded-lg border p-0.5 min-h-[36px] ${found && sameBlock(b, secret) ? 'border-emerald-500 bg-emerald-100 ring-2 ring-emerald-400' : 'border-slate-200 bg-white'}`}
              >
                <BlockSvg b={b} faded={out[i]} />
              </button>
            ))}
          </div>
          {guessMsg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${found ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{guessMsg}</div>
          )}
          {!found && left === 1 && !guessMsg && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-sky-100 text-sky-800">Már csak egy lap maradt. Koppints rá!</div>
          )}
          <button onClick={newBarko} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SortingByPropertyG3Theory;
