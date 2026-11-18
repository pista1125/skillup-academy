// Közös építőkockák az 1. osztályos „mesés” leckékhez.
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { speak, useVoiceOn, isSpeechSupported } from './speech';
import { Potyi, PotyiMood } from './Potyi';

/** Egy válaszlehetőség: szám/rövid szöveg, vagy kép (opcionális rövid felirattal). */
export type MeseOption = string | number | { figure?: React.ReactNode; label?: string; say?: string };

export const optionKey = (o: MeseOption): string =>
  typeof o === 'object' && o !== null ? `fig:${o.label ?? ''}:${o.say ?? ''}` : String(o);

export const optionSay = (o: MeseOption): string =>
  typeof o === 'object' && o !== null ? o.say || o.label || '' : String(o);

/** Nagy, érinthető felolvasó gomb. */
export const SpeakButton: React.FC<{ text: string; className?: string; label?: string }> = ({ text, className, label = 'Hallgasd meg!' }) => {
  if (!isSpeechSupported()) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { force: true });
      }}
      className={cn(
        'shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 shadow-md border-2 border-amber-500 transition',
        className
      )}
      aria-label={label}
      title={label}
    >
      <Volume2 className="w-6 h-6" />
    </button>
  );
};

/** Hang be/ki kapcsoló a fejlécbe. */
export const VoiceToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [on, setOn] = useVoiceOn();
  if (!isSpeechSupported()) return null;
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 h-10 rounded-full text-sm font-bold border-2 transition',
        on ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500',
        className
      )}
      aria-label={on ? 'Felolvasás kikapcsolása' : 'Felolvasás bekapcsolása'}
    >
      {on ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      <span className="hidden sm:inline">{on ? 'Hang be' : 'Hang ki'}</span>
    </button>
  );
};

/** Pötyi + szövegbuborék (rövid, nagy betűs felirat) + felolvasó gomb. */
export const PotyiBubble: React.FC<{ text: string; say?: string; mood?: PotyiMood; dots?: number; className?: string }> = ({ text, say, mood = 'happy', dots, className }) => (
  <div className={cn('flex items-end gap-2 sm:gap-3', className)}>
    <Potyi mood={mood} dots={dots} className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 drop-shadow" />
    <div className="relative flex-1 flex items-center gap-2 bg-white dark:bg-slate-800 border-[3px] border-rose-300 dark:border-rose-700 rounded-3xl rounded-bl-md px-4 py-3 shadow-sm">
      <p className="flex-1 text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-snug">{text}</p>
      <SpeakButton text={say || text} />
    </div>
  </div>
);

/** Egy nagy válaszgomb (szám, rövid szó vagy kép). */
export const OptionButton: React.FC<{
  option: MeseOption;
  state?: 'idle' | 'correct' | 'wrong' | 'dim';
  onClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
}> = ({ option, state = 'idle', onClick, disabled, compact }) => {
  const isObj = typeof option === 'object' && option !== null;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-center justify-center gap-1 rounded-3xl border-4 shadow-sm transition active:scale-95 select-none',
        compact ? 'min-h-[72px] p-2' : 'min-h-[96px] sm:min-h-[112px] p-2 sm:p-3',
        state === 'idle' && 'bg-white dark:bg-slate-800 border-sky-300 hover:border-sky-500 hover:bg-sky-50 dark:border-sky-700',
        state === 'correct' && 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300',
        state === 'wrong' && 'bg-rose-100 border-rose-400 animate-[g1shake_0.4s_ease-in-out]',
        state === 'dim' && 'bg-white/60 border-slate-200 opacity-50',
        disabled && state === 'idle' && 'cursor-default'
      )}
    >
      {isObj ? (
        <>
          {option.figure && <div className="w-full flex items-center justify-center [&_svg]:max-h-[90px] sm:[&_svg]:max-h-[110px] [&_svg]:w-auto [&_svg]:max-w-full">{option.figure}</div>}
          {option.label && <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">{option.label}</span>}
        </>
      ) : (
        <span className={cn('font-black text-slate-800 dark:text-slate-100 leading-none', String(option).length <= 3 ? 'text-4xl sm:text-5xl' : String(option).length <= 9 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl')}>
          {String(option)}
        </span>
      )}
      {state === 'correct' && <span className="absolute -top-3 -right-3 text-3xl">⭐</span>}
    </button>
  );
};

/** Csillagsor (pl. eredményhez). */
export const Stars: React.FC<{ value: number; max: number; className?: string }> = ({ value, max, className }) => (
  <div className={cn('flex flex-wrap justify-center gap-1', className)} aria-label={`${value} csillag ${max}-ból`}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={cn('text-2xl sm:text-3xl transition', i < value ? 'opacity-100' : 'opacity-20 grayscale')}>
        ⭐
      </span>
    ))}
  </div>
);

/** Egyszerű SVG tárgysor számláláshoz: n darab azonos ikon, legfeljebb 5 egy sorban. */
export const CountRow: React.FC<{ n: number; icon: (x: number, y: number, i: number) => React.ReactNode; perRow?: number; cell?: number; className?: string }> = ({
  n,
  icon,
  perRow = 5,
  cell = 48,
  className = 'w-full max-w-[320px] h-auto mx-auto',
}) => {
  const rows = Math.max(1, Math.ceil(n / perRow));
  const cols = Math.min(perRow, Math.max(1, n));
  const w = cols * cell + 8;
  const h = rows * cell + 8;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      {Array.from({ length: n }, (_, i) => icon(4 + (i % perRow) * cell + cell / 2, 4 + Math.floor(i / perRow) * cell + cell / 2, i))}
    </svg>
  );
};

export const SHAKE_KEYFRAMES = '@keyframes g1shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
