import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  LogicSetPropertiesSvg,
  OneChangeSequencesSvg,
  TwoChangeSequencesSvg,
  CommonPropertiesSvg,
  SpoilerGameSvg,
  BlockShapeG,
  ALL_BLOCKS,
  BLOCK_COLORS,
  BLOCK_SHAPES,
  BLOCK_FILL,
  LogicBlock,
  BlockColor,
  BlockShape,
  BlockSize,
  blockName
} from './LogicBlocks4Figures';

// ---------------------------------------------------------------------------
// A 48 lap rácsban (4 sor = szín, 12 oszlop = forma × méret × lyuk)
// ---------------------------------------------------------------------------
const BlocksGrid: React.FC<{ isOn: (b: LogicBlock) => boolean; onPick?: (b: LogicBlock) => void }> = ({ isOn, onPick }) => (
  <svg viewBox="0 0 480 200" className="w-full h-auto bg-white rounded-xl border border-emerald-100">
    {ALL_BLOCKS.map((b) => {
      const col = BLOCK_SHAPES.indexOf(b.shape) * 4 + (b.size === 'nagy' ? 0 : 2) + (b.holed ? 1 : 0);
      const row = BLOCK_COLORS.indexOf(b.color);
      const cx = 22 + col * 39;
      const cy = 26 + row * 49;
      return (
        <g key={blockName(b)} onClick={onPick ? () => onPick(b) : undefined} style={onPick ? { cursor: 'pointer' } : undefined}>
          <rect x={cx - 19} y={cy - 24} width="38" height="48" fill="transparent" />
          <BlockShapeG b={b} cx={cx} cy={cy} scale={0.75} dim={!isOn(b)} />
        </g>
      );
    })}
  </svg>
);

// ---------------------------------------------------------------------------
// Labor I: Tulajdonság-szűrő
// ---------------------------------------------------------------------------
type Tri = 'mindegy' | 'igen' | 'nem';

const FilterLab: React.FC = () => {
  const [colors, setColors] = useState<BlockColor[]>([]);
  const [shapes, setShapes] = useState<BlockShape[]>([]);
  const [size, setSize] = useState<BlockSize | 'mindegy'>('mindegy');
  const [holed, setHoled] = useState<Tri>('mindegy');
  const [negColor, setNegColor] = useState(false);

  const test = (b: LogicBlock) =>
    (colors.length === 0 || (negColor ? !colors.includes(b.color) : colors.includes(b.color))) &&
    (shapes.length === 0 || shapes.includes(b.shape)) &&
    (size === 'mindegy' || b.size === size) &&
    (holed === 'mindegy' || (holed === 'igen') === b.holed);
  const count = ALL_BLOCKS.filter(test).length;

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const sentence = [
    colors.length ? `${negColor ? 'nem ' : ''}${colors.join(negColor ? ' és nem ' : ' vagy ')}` : '',
    shapes.length ? shapes.join(' vagy ') : '',
    size !== 'mindegy' ? size : '',
    holed === 'igen' ? 'lyukas' : holed === 'nem' ? 'nem lyukas' : ''
  ]
    .filter(Boolean)
    .join(', ');

  const chip = (on: boolean) => `px-3 py-2 rounded-xl text-sm font-bold border-2 min-h-[2.75rem] ${on ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200'}`;

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-black text-slate-500 mb-1">SZÍN</div>
          <div className="flex flex-wrap gap-2">
            {BLOCK_COLORS.map((c) => (
              <button key={c} onClick={() => toggle(colors, c, setColors)} className={chip(colors.includes(c))}>
                <span className="inline-block w-3 h-3 rounded-full mr-1 align-middle" style={{ background: BLOCK_FILL[c] }} />
                {c}
              </button>
            ))}
            <button onClick={() => setNegColor(!negColor)} className={chip(negColor)}>
              „nem”
            </button>
          </div>
        </div>
        <div>
          <div className="text-xs font-black text-slate-500 mb-1">FORMA</div>
          <div className="flex flex-wrap gap-2">
            {BLOCK_SHAPES.map((s) => (
              <button key={s} onClick={() => toggle(shapes, s, setShapes)} className={chip(shapes.includes(s))}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-black text-slate-500 mb-1">MÉRET</div>
          <div className="flex flex-wrap gap-2">
            {(['mindegy', 'nagy', 'kicsi'] as const).map((s) => (
              <button key={s} onClick={() => setSize(s)} className={chip(size === s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-black text-slate-500 mb-1">LYUKAS?</div>
          <div className="flex flex-wrap gap-2">
            {(['mindegy', 'igen', 'nem'] as const).map((s) => (
              <button key={s} onClick={() => setHoled(s)} className={chip(holed === s)}>
                {s === 'igen' ? 'lyukas' : s === 'nem' ? 'nem lyukas' : 'mindegy'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BlocksGrid isOn={test} />
      <div className="text-center font-bold text-emerald-800 bg-emerald-50 rounded-xl p-3">
        {sentence ? `„${sentence}” – ` : 'Nincs szűrés – '}
        <span className="text-2xl">{count}</span> lap felel meg a 48-ból.
      </div>
      <p className="text-xs text-slate-500 text-center">Próbáld ki: piros (12), kör (16), piros + kör (4), négyzet vagy kör (32), nem kék és nem zöld (24)!</p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Barkochba
// ---------------------------------------------------------------------------
interface Ask {
  label: string;
  test: (b: LogicBlock) => boolean;
}
const ASKS: Ask[] = [
  ...BLOCK_COLORS.map((c) => ({ label: `${c[0].toUpperCase()}${c.slice(1)}?`, test: (b: LogicBlock) => b.color === c })),
  ...BLOCK_SHAPES.map((s) => ({ label: `${s[0].toUpperCase()}${s.slice(1)}?`, test: (b: LogicBlock) => b.shape === s })),
  { label: 'Nagy?', test: (b) => b.size === 'nagy' },
  { label: 'Lyukas?', test: (b) => b.holed },
  { label: 'Piros vagy sárga?', test: (b) => b.color === 'piros' || b.color === 'sárga' }
];

const pickRandom = () => Math.floor(Math.random() * ALL_BLOCKS.length);

const BarkochbaLab: React.FC = () => {
  const [secret, setSecret] = useState<number>(() => pickRandom());
  const [log, setLog] = useState<{ q: string; a: boolean }[]>([]);
  const [alive, setAlive] = useState<boolean[]>(() => ALL_BLOCKS.map(() => true));
  const [guess, setGuess] = useState<string | null>(null);
  const s = ALL_BLOCKS[secret];
  const remaining = useMemo(() => alive.filter(Boolean).length, [alive]);

  const ask = (q: Ask) => {
    const a = q.test(s);
    setLog([...log, { q: q.label, a }]);
    setAlive(ALL_BLOCKS.map((b, i) => alive[i] && q.test(b) === a));
  };
  const onPick = (b: LogicBlock) => {
    const ok = blockName(b) === blockName(s);
    setGuess(ok ? `Eltaláltad! A gondolt lap: ${blockName(s)}. ${log.length} kérdés kellett. 🎉` : `Nem ez az (${blockName(b)}). Kérdezz tovább!`);
  };
  const restart = () => {
    setSecret(pickRandom());
    setLog([]);
    setAlive(ALL_BLOCKS.map(() => true));
    setGuess(null);
  };

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <p className="text-sm text-slate-600">Gondoltam egy lapra a 48 közül. Kérdezz! Én csak igennel vagy nemmel válaszolok. Ha tudod, koppints a lapra!</p>
      <div className="flex flex-wrap gap-2">
        {ASKS.map((q) => (
          <button key={q.label} onClick={() => ask(q)} className="px-3 py-2 min-h-[2.75rem] rounded-xl bg-violet-50 border-2 border-violet-200 text-violet-800 font-bold text-sm hover:bg-violet-100">
            {q.label}
          </button>
        ))}
      </div>
      <BlocksGrid isOn={(b) => alive[ALL_BLOCKS.indexOf(b)]} onPick={onPick} />
      <div className="flex flex-wrap gap-2">
        {log.map((l, i) => (
          <span key={i} className={`px-2 py-1 rounded-lg text-xs font-bold ${l.a ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
            {i + 1}. {l.q} {l.a ? 'igen' : 'nem'}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-bold text-violet-800">
          Még lehetséges lapok: <span className="text-2xl">{remaining}</span> · Kérdések: {log.length}
        </div>
        <button onClick={restart} className="px-4 py-2 rounded-xl bg-violet-600 text-white font-black">
          Új játék
        </button>
      </div>
      {guess && <div className={`rounded-xl p-3 font-bold ${guess.startsWith('Eltaláltad') ? 'bg-green-100 text-green-800' : 'bg-amber-50 text-amber-800'}`}>{guess}</div>}
      <p className="text-xs text-slate-500">Tipp: a „Nagy?” és a „Lyukas?” kérdés mindig a felére csökkenti a lehetőségeket. Hány kérdésből tudod kitalálni?</p>
    </div>
  );
};

export const LogicBlocks4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="jatekok-a-logikai-lapokkal"
      title="8. Játékok a logikai lapokkal"
      subtitle="Szín, forma, méret, lyuk – válogass, folytass sorozatot, barkochbázz és gondolkodj logikusan!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_logikai_lapok_tananyag.pdf"
      practiceTitle="Készen állsz a logikai játékokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A LOGIKAI KÉSZLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-sm font-black text-emerald-900 dark:text-emerald-200">4 szín · 3 forma · 2 méret · 2 (lyukas / nem lyukas) = 48 lap</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Szín:</strong> piros, sárga, kék, zöld. <strong>Forma:</strong> kör, négyzet, háromszög.</li>
              <li><strong>Méret:</strong> nagy, kicsi. <strong>Lyuk:</strong> lyukas, nem lyukas. Nincs két egyforma lap!</li>
              <li><strong>„és”</strong>: mindkettő igaz. <strong>„vagy”</strong>: legalább az egyik igaz. <strong>„nem”</strong>: az ellenkezője.</li>
              <li><strong>„Ha sárga, akkor kicsi”</strong>: csak a nagy sárga lapokra hamis.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk? A logikai készlet" badge="Tankönyv 31. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <LogicSetPropertiesSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A logikai készletben <strong>48 lap</strong> van. Minden lapnak <strong>4 tulajdonsága</strong> van: színe, formája, mérete, és hogy lyukas-e.</p>
            <p>Hány lap van? 4 szín, mindegyikből 3 forma: 4 · 3 = 12. Mindegyik nagy és kicsi is: 12 · 2 = 24. Mindegyik lyukas és nem lyukas is: 24 · 2 = <strong>48</strong>.</p>
            <p>Mivel nincs két egyforma lap, <strong>4 tulajdonság megadásával</strong> pontosan egy lapot nevezünk meg, pl. „kicsi, kék, nem lyukas négyzet”.</p>
          </div>
        </div>
        <TheoryTable
          headers={['Tulajdonság', 'Hány ilyen lap van?', 'Miért?']}
          rows={[
            ['piros', '12', '3 forma · 2 méret · 2 lyuk'],
            ['kör', '16', '4 szín · 2 méret · 2 lyuk'],
            ['nagy', '24', 'a lapok fele'],
            ['piros kör', '4', '2 méret · 2 lyuk'],
            ['nagy, piros, lyukas kör', '1', 'mind a 4 tulajdonság megvan']
          ]}
        />
      </TheorySection>

      <TheorySection title="2. Sorozatok: melyik tulajdonság változott?" badge="TK 31/1." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Egy tulajdonság változik" badge="1 változás" badgeColor="emerald">
            <OneChangeSequencesSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">A következő lapnál is <strong>ugyanazt az egy</strong> tulajdonságot változtatjuk, a többi marad. Pl. sárga → kék → piros → zöld négyzet.</p>
          </TheoryCard>
          <TheoryCard title="Két tulajdonság változik" badge="2 változás" badgeColor="sky">
            <TwoChangeSequencesSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">Most <strong>két</strong> tulajdonság változik egyszerre. Pl. nagy zöld kör → kicsi kék kör: a mérete és a színe változott.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Nézzük meg együtt! – Állításokkal szűrünk" badge="TK 31/2." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryTable
            headers={['Állítás', 'Ennyi lap marad', 'Miért?']}
            rows={[
              ['(kezdetben)', '48', 'az egész készlet'],
              ['Négyzet vagy kör.', '32', 'a háromszögek kimennek'],
              ['Csak görbe vonal határolja.', '16', 'csak a körök maradnak'],
              ['Nem lyukas.', '8', 'a lyukasak kimennek'],
              ['Nem kék, és nem zöld.', '4', 'piros és sárga marad'],
              ['Ha sárga, akkor kicsi.', '3', 'a nagy sárga kör kimegy'],
              ['Nem kicsi.', '1', 'nagy, piros, nem lyukas kör']
            ]}
          />
          <div className="space-y-3">
            <TheoryCallout type="info" title="A logika kis szavai">
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>„Négyzet vagy kör”</strong>: jó a négyzet is, a kör is.</li>
                <li><strong>„Nem kék, és nem zöld”</strong>: egyszerre igaz kell legyen mindkettő → csak piros vagy sárga.</li>
                <li><strong>„Ha sárga, akkor kicsi”</strong>: a piros, kék, zöld lapokra mindig igaz. A sárgákra csak akkor, ha kicsik.</li>
              </ul>
            </TheoryCallout>
            <TheoryCard title="Hazudós barkochba" badge="TK 31/4." badgeColor="rose">
              <p className="text-sm text-slate-700">Itt minden válasz <strong>hamis</strong>! „Nagy?” – „igen” → a lap kicsi. „Kör?” – „igen” → nem kör. „Négyzet?” – „nem” → négyzet! „Lyukas?” – „igen” → nem lyukas. „Sárga vagy zöld?” – „igen” → nem sárga és nem zöld. „Kék?” – „nem” → kék. A lap: <strong>kicsi, kék, nem lyukas négyzet</strong>.</p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="4. Még több játék" badge="TK 32. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Hány közös tulajdonság?" badge="TK 32/5." badgeColor="amber">
            <CommonPropertiesSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">A nagy piros (nem lyukas) körrel 0 közös → a gondolt lap nem kör, nem piros, <strong>kicsi és lyukas</strong>. A kicsi lyukas sárga háromszöggel 2 közös (kicsi, lyukas) → <strong>négyzet</strong>, nem sárga. A kicsi lyukas kék négyzettel 3 közös → nem kék, tehát <strong>zöld</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Rontó játék" badge="TK 32/6." badgeColor="purple">
            <SpoilerGameSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">Mindenki tesz egy új lapot, ami <strong>elrontja</strong> az előző állítást, aztán mond egy új, igaz állítást az egész sorról.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Én vagyok a szarka (TK 32/7.)">
          Valaki elvesz egy lapot. Rendezd a maradékot! Ha például csak <strong>11 piros</strong> lap van az asztalon (12 helyett), akkor a hiányzó lap piros. Utána nézd a formát, a méretet és a lyukat is!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Vigyázz! Gyakori hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A „vagy” és az „és” összekeverése"
          wrong="„Piros vagy kör” → 12 piros + 16 kör = 28 lap"
          wrongExplanation="A 4 piros kört kétszer számoltad: egyszer a pirosaknál, egyszer a köröknél!"
          correct="„Piros vagy kör” → 12 + 16 − 4 = 24 lap"
          correctExplanation="A piros körök csak egyszer számítanak. A „piros és kör” csak 4 lap."
          tip="A „Ha sárga, akkor kicsi” állítás NEM azt jelenti, hogy minden lap sárga. A piros lapokra is igaz!"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Labor I: Tulajdonság-szűrő" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600 mb-3">Válaszd ki a tulajdonságokat! A megfelelő lapok kiemelve látszanak, a többi elhalványul. Egy csoporton belül több gomb = „vagy”.</p>
        <FilterLab />
      </TheorySection>

      <TheorySection title="7. Interaktív Labor II: Barkochba" badge="Labor" badgeColor="violet">
        <BarkochbaLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LogicBlocks4Theory;
