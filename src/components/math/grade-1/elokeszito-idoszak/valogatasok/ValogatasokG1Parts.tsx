// „Válogatások” – Játszótér: Pötyi egyesével adja a tárgyakat, a gyerek a jó kosárba koppint.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { az, Basket, COL, NAME, OBJ, ThingSpec } from './ValogatasokG1Scenes';

interface SortSet {
  intro: string;
  bins: { name: string; sign: ThingSpec[] }[];
  items: (ThingSpec & { bin: number })[];
}

const SETS: SortSet[] = [
  {
    intro: 'Gyümölcs vagy zöldség? Tedd a jó kosárba!',
    bins: [
      { name: 'gyümölcsös kosár', sign: [{ n: 'alma' }, { n: 'banan' }] },
      { name: 'zöldséges kosár', sign: [{ n: 'repa' }, { n: 'uborka' }] },
    ],
    items: [
      { n: 'alma', bin: 0 }, { n: 'korte', bin: 0 }, { n: 'eper', bin: 0 }, { n: 'szolo', bin: 0 }, { n: 'banan', bin: 0 },
      { n: 'repa', bin: 1 }, { n: 'uborka', bin: 1 }, { n: 'paradicsom', bin: 1 },
    ],
  },
  {
    intro: 'Játék vagy iskolai holmi? Tedd a helyére!',
    bins: [
      { name: 'játékos kosár', sign: [{ n: 'maci' }, { n: 'labda' }] },
      { name: 'iskolatáska', sign: [{ n: 'ceruza' }, { n: 'fuzet' }] },
    ],
    items: [
      { n: 'maci', bin: 0 }, { n: 'labda', bin: 0 }, { n: 'kocka', bin: 0 }, { n: 'auto', bin: 0 },
      { n: 'ceruza', bin: 1 }, { n: 'konyv', bin: 1 }, { n: 'fuzet', bin: 1 },
    ],
  },
  {
    intro: 'Most szín szerint válogatunk: piros, kék, sárga!',
    bins: [
      { name: 'piros kosár', sign: [{ n: 'korong', color: COL.piros }] },
      { name: 'kék kosár', sign: [{ n: 'korong', color: COL.kek }] },
      { name: 'sárga kosár', sign: [{ n: 'korong', color: COL.sarga }] },
    ],
    items: [
      { n: 'labda', color: COL.piros, bin: 0 }, { n: 'auto', color: COL.piros, bin: 0 }, { n: 'virag', color: COL.piros, bin: 0 },
      { n: 'hal', color: COL.kek, bin: 1 }, { n: 'sapka', color: COL.kek, bin: 1 }, { n: 'kocka', color: COL.kek, bin: 1 },
      { n: 'csillag', color: COL.sarga, bin: 2 }, { n: 'banan', bin: 2 }, { n: 'labda', color: COL.sarga, bin: 2 },
    ],
  },
  {
    intro: 'Állat vagy jármű? Segíts Pötyinek!',
    bins: [
      { name: 'állatok', sign: [{ n: 'hal' }, { n: 'madar' }] },
      { name: 'járművek', sign: [{ n: 'auto' }, { n: 'hajo' }] },
    ],
    items: [
      { n: 'hal', bin: 0 }, { n: 'madar', bin: 0 }, { n: 'csiga', bin: 0 }, { n: 'katica', bin: 0 }, { n: 'pillango', bin: 0 },
      { n: 'auto', bin: 1 }, { n: 'hajo', bin: 1 }, { n: 'bicikli', bin: 1 },
    ],
  },
];

const ROUND = 6;

const newRound = (prev?: number) => {
  let k = Math.floor(Math.random() * SETS.length);
  if (k === prev) k = (k + 1) % SETS.length;
  return { set: k, items: shuffle(SETS[k].items).slice(0, ROUND) };
};

export const SortBasketsPlayground: React.FC = () => {
  const [round, setRound] = useState(() => newRound());
  const [pos, setPos] = useState(0);
  const [placed, setPlaced] = useState<(ThingSpec & { bin: number })[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const set = SETS[round.set];
  const cur = round.items[pos];
  const done = pos >= round.items.length;

  const tap = (b: number) => {
    if (done) return;
    if (b === cur.bin) {
      const last = pos + 1 >= round.items.length;
      const t = last ? 'Ügyes vagy! Minden a helyére került.' : randomPraise();
      setPlaced((p) => [...p, cur]);
      setPos((p) => p + 1);
      setMsg({ text: t, ok: true });
      speak(t);
      if (last) confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else {
      const t = `Nézd meg jól! ${az(NAME[cur.n], true)} nem ide való. Keresd a jó kosarat!`;
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setRound((r) => newRound(r.set));
    setPos(0);
    setPlaced([]);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={set.intro} mood="happy" />
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-dashed border-violet-400 bg-white flex items-center justify-center">
          {done ? (
            <span className="text-5xl">⭐</span>
          ) : (
            <svg viewBox="0 0 100 100" className="w-24 h-24" aria-label={NAME[cur.n]}>
              {OBJ[cur.n]({ x: 50, y: 52, s: 1.8, color: cur.color })}
            </svg>
          )}
        </div>
      </div>
      <div className={cn('grid gap-3', set.bins.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
        {set.bins.map((bin, b) => (
          <button
            key={b}
            type="button"
            onClick={() => tap(b)}
            className="rounded-3xl border-4 border-amber-300 bg-amber-50 hover:border-amber-500 active:scale-95 p-2 flex justify-center"
            aria-label={bin.name}
          >
            <Basket sign={bin.sign} inside={placed.filter((p) => p.bin === b).slice(-4)} className="w-full max-w-[160px] h-auto" />
          </button>
        ))}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};
