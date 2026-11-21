// „Megálló” – Játszótér: Mi van a kendő alatt? (a szám bontása 2–5-ig, összeadással ellenőrizve)
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { BigSign } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { WheelbarrowScene } from './Megallo5G1Scenes';

type Task = { total: number; visible: number };

const newTask = (prev?: Task): Task => {
  const total = 2 + Math.floor(Math.random() * 4); // 2–5
  const visible = Math.floor(Math.random() * (Math.min(4, total) + 1)); // 0–4, legfeljebb total
  const t = { total, visible };
  if (prev && prev.total === t.total && prev.visible === t.visible) return newTask(prev);
  return t;
};

export const UnderClothPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const { total, visible } = task;
  const hidden = total - visible;
  const say = `Csigusz talicskájában ${total} répa van. ${visible === 0 ? 'Egy sem látszik ki.' : `${visible} kilátszik.`} Hány répa van a kendő alatt?`;

  const answer = (n: number) => {
    if (solved) return;
    let t: string;
    const ok = n === hidden;
    if (ok) {
      t = `${randomPraise()} ${visible} + ${hidden} = ${total}. ${hidden === 0 ? 'A kendő alatt nem volt semmi!' : `A kendő alatt ${hidden} répa volt.`}`;
      setSolved(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else if (n + visible > total) {
      t = `Ez túl sok! Akkor több lenne, mint ${total}. Számolj tovább a kilátszó répáktól!`;
    } else {
      t = `Ez kevés! Úgy kevesebb lenne, mint ${total}. Számolj tovább a kilátszó répáktól!`;
    }
    setMsg({ text: t, ok });
    speak(t);
  };

  const next = () => {
    setTask((t) => newTask(t));
    setMsg(null);
    setSolved(false);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Mi van a kendő alatt?" say={say} mood="think" dots={total} />
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-slate-600">Összesen</span>
          <BigSign text={total} className="w-20 h-20" />
        </div>
        <div className="w-full max-w-[380px]">
          <WheelbarrowScene visible={visible} hidden={hidden} reveal={solved} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => answer(n)}
            className="w-16 h-16 rounded-2xl bg-white border-4 border-sky-300 hover:border-sky-500 text-3xl font-black text-slate-800 active:scale-95"
          >
            {n}
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
UnderClothPlayground.speechTexts = () => {
  const out: string[] = [];
  for (let total = 2; total <= 5; total++) {
    out.push(
      `Ez túl sok! Akkor több lenne, mint ${total}. Számolj tovább a kilátszó répáktól!`,
      `Ez kevés! Úgy kevesebb lenne, mint ${total}. Számolj tovább a kilátszó répáktól!`
    );
    for (let visible = 0; visible <= Math.min(4, total); visible++) {
      const hidden = total - visible;
      out.push(`Csigusz talicskájában ${total} répa van. ${visible === 0 ? 'Egy sem látszik ki.' : `${visible} kilátszik.`} Hány répa van a kendő alatt?`);
      out.push(...PRAISES.map((p) => `${p} ${visible} + ${hidden} = ${total}. ${hidden === 0 ? 'A kendő alatt nem volt semmi!' : `A kendő alatt ${hidden} répa volt.`}`));
    }
  }
  return out;
};
