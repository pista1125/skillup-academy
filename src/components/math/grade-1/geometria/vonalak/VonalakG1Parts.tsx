// „Vonalak” – Játszótér: Pötyi vonalvadászata. Egy vonalat mutat; a gyerek eldönti: egyenes vagy görbe, illetve nyitott vagy zárt.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { CLOSED, LineFig, LineKind, StickFig as Stick, ThreadFig as Thread } from './VonalakG1Scenes';

const STRAIGHT_OR_CURVED: { k: LineKind; straight: boolean }[] = [
  { k: 'egyenes', straight: true },
  { k: 'ferde', straight: true },
  { k: 'allo', straight: true },
  { k: 'hullam', straight: false },
  { k: 'iv', straight: false },
  { k: 'kanyar', straight: false },
  { k: 'csigavonal', straight: false },
];
const OPEN_OR_CLOSED: LineKind[] = ['kor', 'tojas', 'paca', 'haromszog', 'negyzet', 'haz', 'nyitottkor', 'nyitottpaca', 'nyitottharomszog', 'nyitottnegyzet', 'hullam', 'iv'];
const COLORS = ['#2563eb', '#e11d48', '#16a34a', '#9333ea', '#ea580c'];

type Task = { mode: 'eg' | 'nyz'; k: LineKind; color: string };

const newTask = (prev?: Task): Task => {
  const mode: Task['mode'] = Math.random() < 0.5 ? 'eg' : 'nyz';
  let k: LineKind;
  do {
    k = mode === 'eg' ? STRAIGHT_OR_CURVED[Math.floor(Math.random() * STRAIGHT_OR_CURVED.length)].k : OPEN_OR_CLOSED[Math.floor(Math.random() * OPEN_OR_CLOSED.length)];
  } while (prev && k === prev.k);
  return { mode, k, color: COLORS[Math.floor(Math.random() * COLORS.length)] };
};

export const LineHuntPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [done, setDone] = useState(false);
  const ask = task.mode === 'eg' ? 'Egyenes vagy görbe ez a vonal?' : 'Nyitott vagy zárt ez a vonal?';
  const correct = task.mode === 'eg' ? (STRAIGHT_OR_CURVED.find((x) => x.k === task.k)?.straight ? 'a' : 'b') : CLOSED[task.k] ? 'b' : 'a';

  const answer = (which: 'a' | 'b') => {
    if (done) return;
    if (which === correct) {
      const t =
        randomPraise() +
        (task.mode === 'eg' ? (which === 'a' ? ' Egyenes, mint a pálcika.' : ' Görbe, mint a fonal.') : which === 'a' ? ' Nyitott, Csigusz be tud mászni.' : ' Zárt, körbeér.');
      setMsg({ text: t, ok: true });
      setDone(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t =
        task.mode === 'eg'
          ? which === 'a'
            ? 'Nézd meg jól! Hajlik valahol a vonal? A pálcika nem hajlik.'
            : 'Nézd meg jól! Ez a vonal sehol sem hajlik, olyan, mint a pálcika.'
          : which === 'a'
            ? 'Fuss végig rajta az ujjaddal! Visszaérsz oda, ahonnan elindultál?'
            : 'Fuss végig rajta az ujjaddal! Van rés, ahol kimászhatna Csigusz?';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setMsg(null);
    setDone(false);
  };

  const btn = 'flex-1 min-h-[96px] rounded-3xl border-4 bg-white flex flex-col items-center justify-center gap-1 active:scale-95 text-xl font-black text-slate-800';
  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} mood="think" />
      <div className="rounded-3xl border-4 border-sky-200 bg-white p-3 flex justify-center">
        <LineFig k={task.k} color={task.color} className="w-full max-w-[320px] h-auto" frame={false} />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => answer('a')} className={cn(btn, 'border-amber-300 hover:border-amber-500')}>
          {task.mode === 'eg' ? <Stick /> : <LineFig k="nyitottkor" className="w-20 h-12" frame={false} color="#475569" />}
          {task.mode === 'eg' ? 'egyenes' : 'nyitott'}
        </button>
        <button type="button" onClick={() => answer('b')} className={cn(btn, 'border-rose-300 hover:border-rose-500')}>
          {task.mode === 'eg' ? <Thread /> : <LineFig k="kor" className="w-20 h-12" frame={false} color="#475569" />}
          {task.mode === 'eg' ? 'görbe' : 'zárt'}
        </button>
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
LineHuntPlayground.speechTexts = () => [
  'Egyenes vagy görbe ez a vonal?',
  'Nyitott vagy zárt ez a vonal?',
  ...[' Egyenes, mint a pálcika.', ' Görbe, mint a fonal.', ' Nyitott, Csigusz be tud mászni.', ' Zárt, körbeér.'].flatMap((s) => PRAISES.map((p) => p + s)),
  'Nézd meg jól! Hajlik valahol a vonal? A pálcika nem hajlik.',
  'Nézd meg jól! Ez a vonal sehol sem hajlik, olyan, mint a pálcika.',
  'Fuss végig rajta az ujjaddal! Visszaérsz oda, ahonnan elindultál?',
  'Fuss végig rajta az ujjaddal! Van rés, ahol kimászhatna Csigusz?',
];
