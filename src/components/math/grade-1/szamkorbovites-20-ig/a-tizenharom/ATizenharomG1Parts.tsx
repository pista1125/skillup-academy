// „A tizenhárom” – Játszótér: Békaugrás. A béka egy számon ül a számegyenesen (0–13); ugrik előre (+) vagy hátra (−).
// A gyerek arra a számra koppint, ahová a béka érkezik.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { frogG } from './ATizenharomG1Scenes';

const MAX = 13;

const newTask = (prev?: { from: number; d: number }) => {
  for (;;) {
    const plus = Math.random() < 0.55;
    const d = 1 + Math.floor(Math.random() * (plus ? 5 : 6));
    const from = plus ? Math.floor(Math.random() * (MAX - d + 1)) : d + Math.floor(Math.random() * (MAX - d + 1));
    const t = { from, d: plus ? d : -d };
    // gyakran érintse a 10 fölötti részt
    if (Math.max(t.from, t.from + t.d) < 9 && Math.random() < 0.7) continue;
    if (prev && prev.from === t.from && prev.d === t.d) continue;
    return t;
  }
};

export const FrogHopPlayground: React.FC = () => {
  const [task, setTask] = useState(() => newTask());
  const [pos, setPos] = useState(task.from);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const target = task.from + task.d;
  const opText = task.d > 0 ? `${task.from} + ${task.d}` : `${task.from} − ${-task.d}`;
  const sayFull = `A béka itt ül: ${task.from}. ${task.d > 0 ? `Előre ugrik ${task.d} lépést.` : `Hátra ugrik ${-task.d} lépést.`} Hová érkezik? Koppints arra a számra!`;

  const tap = (v: number) => {
    if (msg?.ok) return;
    let t: string;
    if (v === target) {
      t = `${randomPraise()} ${opText} = ${target}.`;
      setPos(v);
      setMsg({ text: t, ok: true });
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else {
      t = task.d > 0 ? `Nem oda. Ugorj előre ${task.d} lépést, és számold hangosan!` : `Nem oda. Ugorj hátra ${-task.d} lépést, és számold hangosan!`;
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const next = () => {
    const t = newTask(task);
    setTask(t);
    setPos(t.from);
    setMsg(null);
  };

  const step = 33;
  const X = (v: number) => 24 + v * step;
  return (
    <div className="space-y-3">
      <PotyiBubble text={`Hová ugrik a béka? ${opText}`} say={sayFull} mood="think" dots={10} />
      <svg viewBox="0 0 480 120" className="w-full max-w-[520px] h-auto mx-auto">
        <rect x="0" y="0" width="480" height="120" rx="16" fill="#dbeafe" />
        <path d={`M12 84 H470`} stroke="#1f2937" strokeWidth="4" />
        {Array.from({ length: MAX + 1 }, (_, v) => (
          <g key={v}>
            <path d={`M${X(v)} 76 V92`} stroke="#1f2937" strokeWidth="3" />
            <text x={X(v)} y="112" textAnchor="middle" fontSize="16" fontWeight="800" fill={v === 10 ? '#be123c' : '#1f2937'} fontFamily="system-ui, sans-serif">{v}</text>
          </g>
        ))}
        {msg?.ok && <path d={`M${X(task.from)} 70 Q${(X(task.from) + X(target)) / 2} ${70 - Math.max(24, Math.abs(task.d) * 9)} ${X(target)} 70`} fill="none" stroke="#7c3aed" strokeWidth="4" />}
        {frogG(X(pos), 52, 0.85, 'frog')}
      </svg>
      <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
        {Array.from({ length: MAX + 1 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => tap(v)}
            className={cn(
              'h-12 rounded-2xl border-4 text-xl font-black transition active:scale-95',
              msg?.ok && v === target ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white border-sky-300 text-slate-800 hover:bg-sky-50'
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
