// „A nulla” – Játszótér: Hány van benne? 0, 1 vagy 2 – koppints a jó számra!
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Domino, Hand } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { BasketBox, BugCard } from './ANullaG1Scenes';

type Kind = 'kosar' | 'katica' | 'domino' | 'kez';
const KINDS: { kind: Kind; ask: string; say: string; unit: string }[] = [
  { kind: 'kosar', ask: 'Hány alma van a kosárban?', say: 'Hány alma van a kosárban? Ha üres, az nulla.', unit: 'alma' },
  { kind: 'katica', ask: 'Hány pöttye van a katicának?', say: 'Hány pöttye van ennek a katicának? Ha nincs egy sem, az nulla.', unit: 'pötty' },
  { kind: 'domino', ask: 'Hány pötty van a dominón?', say: 'Hány pötty van a dominón? Ha üres, az nulla.', unit: 'pötty' },
  { kind: 'kez', ask: 'Hány ujj van fent?', say: 'Hány ujjat mutat a kéz? Ha egy sincs fent, az nulla.', unit: 'ujj' },
];

const newTask = (prev?: { k: number; n: number }) => {
  let k = Math.floor(Math.random() * KINDS.length);
  if (prev && k === prev.k) k = (k + 1) % KINDS.length;
  // a nulla gyakrabban jön
  const r = Math.random();
  let n = r < 0.45 ? 0 : r < 0.75 ? 1 : 2;
  if (prev && n === prev.n && Math.random() < 0.5) n = (n + 1) % 3;
  return { k, n };
};

const Picture: React.FC<{ kind: Kind; n: number }> = ({ kind, n }) => {
  if (kind === 'kosar') return <BasketBox n={n} className="w-44 h-36" />;
  if (kind === 'katica') return <div className="[&_svg]:w-36 [&_svg]:h-36"><BugCard dots={n} /></div>;
  if (kind === 'domino') return <Domino left={n} single className="w-32 h-32" />;
  return <Hand fingers={n} className="w-36 h-36" />;
};

export const ZeroCountPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const def = KINDS[task.k];

  const pick = (v: number) => {
    if (msg?.ok) return;
    if (v === task.n) {
      const t = task.n === 0 ? `${randomPraise()} Nincs egy sem, ez nulla.` : `${randomPraise()} Ez ${task.n}.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = task.n === 0 ? 'Nézd meg jól! Van itt egy is? Ha nincs semmi, az nulla.' : 'Számold meg még egyszer, mutass rá mindegyikre!';
      setWrong((w) => [...w, v]);
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setMsg(null);
    setWrong([]);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={def.ask} say={def.say} mood="think" dots={0} />
      <div className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-3 flex items-center justify-center min-h-[160px]">
        <Picture kind={def.kind} n={task.n} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            disabled={wrong.includes(v)}
            className={cn(
              'h-20 rounded-3xl border-4 bg-white text-5xl font-black active:scale-95',
              msg?.ok && v === task.n ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : wrong.includes(v) ? 'opacity-30 border-slate-200' : 'border-violet-300 hover:border-violet-500 text-slate-800'
            )}
          >
            {v}
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
ZeroCountPlayground.speechTexts = () => [
  ...KINDS.map((k) => k.say),
  'Nézd meg jól! Van itt egy is? Ha nincs semmi, az nulla.',
  'Számold meg még egyszer, mutass rá mindegyikre!',
  ...PRAISES.map((p) => `${p} Nincs egy sem, ez nulla.`),
  ...[1, 2].flatMap((n) => PRAISES.map((p) => `${p} Ez ${n}.`)),
];
