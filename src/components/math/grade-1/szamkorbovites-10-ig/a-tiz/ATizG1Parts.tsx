// „A tíz” – Játszótér: Töltsd meg a tízes keretet! Néhány piros korong már bent van, a gyerek kékkel kiegészíti 10-re.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { Potyi } from '../../shared/Potyi';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

const newStart = (prev?: number) => {
  let s = 1 + Math.floor(Math.random() * 9); // 1–9
  if (s === prev) s = (s % 9) + 1;
  return s;
};

const startSay = (start: number) => `A keretben ${start} piros korong van. Koppints az üres helyekre, és tegyél bele kék korongokat, hogy tele legyen! A teli keretben 10 korong van.`;

export const FillTenPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [start, setStart] = useState(() => newStart());
  const [blue, setBlue] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const total = start + blue.length;
  const say = startSay(start);

  const toggle = (i: number) => {
    setMsg(null);
    setBlue((b) => (b.includes(i) ? b.filter((x) => x !== i) : [...b, i]));
  };
  const check = () => {
    let t: string;
    const ok = total === 10;
    if (ok) {
      t = `${randomPraise()} Tele van a keret. ${start} meg ${10 - start} az 10.`;
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else {
      t = 'Még van üres hely. Tölts meg minden helyet!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setStart((p) => newStart(p));
    setBlue([]);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Töltsd meg a keretet!" say={say} mood="happy" dots={10} />
      <div className="flex items-center justify-center gap-3">
        <div className="grid grid-cols-5 gap-1 sm:gap-2 p-2 rounded-2xl border-4 border-slate-800 bg-white max-w-[420px] w-full">
          {Array.from({ length: 10 }, (_, i) => {
            const isRed = i < start;
            const isBlue = blue.includes(i);
            return (
              <button
                key={i}
                type="button"
                disabled={isRed}
                onClick={() => toggle(i)}
                className={cn('aspect-square rounded-xl border-2 border-slate-300 flex items-center justify-center active:scale-95', !isRed && 'hover:bg-sky-50')}
                aria-label={isRed ? 'piros korong' : isBlue ? 'kék korong, kiveszem' : 'üres hely'}
              >
                {(isRed || isBlue) && <span className={cn('block w-4/5 h-4/5 rounded-full border-4 border-slate-900', isRed ? 'bg-red-500' : 'bg-blue-500')} />}
              </button>
            );
          })}
        </div>
        <Potyi dots={total} mood={total === 10 ? 'cheer' : 'happy'} className="w-20 h-20 sm:w-28 sm:h-28 shrink-0" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center gap-3">
        <button type="button" onClick={check} className="h-14 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xl font-black shadow">
          Kész ✔
        </button>
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
FillTenPlayground.speechTexts = () => {
  const S = Array.from({ length: 9 }, (_, i) => i + 1);
  return [
    ...S.map(startSay),
    ...PRAISES.flatMap((p) => S.map((st) => `${p} Tele van a keret. ${st} meg ${10 - st} az 10.`)),
    "Még van üres hely. Tölts meg minden helyet!",
  ];
};
