// Közös építőkockák az 1. osztályos „mesés” leckékhez.
import React from 'react';
import { Pause, Play, Square, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  speak,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  seekSpeaking,
  usePlayState,
  useClipDuration,
  toSpeechText,
  useVoiceOn,
  useVoiceKind,
  isSpeechSupported,
} from './speech';
import { Potyi, PotyiMood } from './Potyi';

/** Egy válaszlehetőség: szám/rövid szöveg, vagy kép (opcionális rövid felirattal). */
export type MeseOption = string | number | { figure?: React.ReactNode; label?: string; say?: string };

export const optionKey = (o: MeseOption): string => (typeof o === 'object' && o !== null ? `fig:${o.label ?? ''}:${o.say ?? ''}` : String(o));

export const optionSay = (o: MeseOption): string => (typeof o === 'object' && o !== null ? o.say || o.label || '' : String(o));

/** Nagy, érinthető felolvasó gomb. */
export const SpeakButton: React.FC<{
  text: string;
  className?: string;
  label?: string;
}> = ({ text, className, label = 'Hallgasd meg!' }) => {
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
        className,
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
  const [kind, setKind, voices] = useVoiceKind();
  if (!isSpeechSupported()) return null;
  const canChoose = voices.length > 1;
  return (
    <span className="inline-flex items-center gap-1.5">
      {canChoose && on && (
        <button
          type="button"
          onClick={() => {
            const k = kind === 'female' ? 'male' : 'female';
            setKind(k);
            speak(VOICE_SWITCH_SAY, { force: true });
          }}
          className="inline-flex items-center gap-1.5 px-3 h-10 rounded-full text-sm font-bold border-2 bg-sky-100 border-sky-400 text-sky-800 transition"
          aria-label={kind === 'female' ? 'Váltás férfi hangra' : 'Váltás női hangra'}
          title={kind === 'female' ? 'Váltás férfi hangra' : 'Váltás női hangra'}
        >
          <span aria-hidden>{kind === 'female' ? '👩' : '👨'}</span>
          <span className="hidden sm:inline">{kind === 'female' ? 'Női hang' : 'Férfi hang'}</span>
        </button>
      )}
      <VoiceOnOff on={on} setOn={setOn} className={className} />
    </span>
  );
};

export const VOICE_SWITCH_SAY = 'Szia! Most én mesélek.';

const VoiceOnOff: React.FC<{
  on: boolean;
  setOn: (on: boolean) => void;
  className?: string;
}> = ({ on, setOn, className }) => {
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 h-10 rounded-full text-sm font-bold border-2 transition',
        on ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-500',
        className,
      )}
      aria-label={on ? 'Felolvasás kikapcsolása' : 'Felolvasás bekapcsolása'}
    >
      {on ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      <span className="hidden sm:inline">{on ? 'Hang be' : 'Hang ki'}</span>
    </button>
  );
};

/**
 * Osztott elrendezés (bal: Pötyi és a hanganyag, jobb: a feladat). A MeseLesson `layout="split"` kapcsolja be;
 * ilyenkor a buborékok és a feladatkérdések lejátszósávot kapnak (indítás/szünet, leállítás, idő, hossz).
 */
export const SplitLayoutContext = React.createContext(false);
export const useSplitLayout = () => React.useContext(SplitLayoutContext);

const fmtTime = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

/** Lejátszósáv egy szöveghez: indítás/szünet, leállítás, haladás (koppintva tekerhető), eltelt idő / teljes hossz. */
export const AudioPlayer: React.FC<{
  text: string;
  className?: string;
  compact?: boolean;
}> = ({ text, className, compact }) => {
  const play = usePlayState();
  const len = useClipDuration(text);
  if (!isSpeechSupported()) return null;
  const mine = play.text !== null && play.text === toSpeechText(text);
  const status = mine ? play.status : 'idle';
  const duration = mine && play.duration > 0 ? play.duration : len.seconds;
  const current = mine ? Math.min(play.current, duration) : 0;
  const frac = duration > 0 ? current / duration : 0;
  const approx = !(mine ? play.clip : len.exact);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'playing') pauseSpeaking();
    else if (status === 'paused') resumeSpeaking();
    else speak(text, { force: true });
  };
  const stop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeaking();
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    const f = (e.clientX - r.left) / r.width;
    if (mine && play.clip) seekSpeaking(f);
    else if (!mine) speak(text, { force: true });
  };

  return (
    <div
      className={cn('flex items-center gap-2 rounded-full bg-amber-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 p-1 pr-3', className)}
    >
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'shrink-0 inline-flex items-center justify-center rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 shadow border-2 border-amber-500 transition',
          compact ? 'w-10 h-10' : 'w-12 h-12',
        )}
        aria-label={status === 'playing' ? 'Szünet' : status === 'paused' ? 'Folytatás' : 'Lejátszás'}
        title={status === 'playing' ? 'Szünet' : status === 'paused' ? 'Folytatás' : 'Lejátszás'}
      >
        {status === 'playing' ? (
          <Pause className={cn(compact ? 'w-5 h-5' : 'w-6 h-6', 'fill-current')} />
        ) : (
          <Play className={cn(compact ? 'w-5 h-5' : 'w-6 h-6', 'fill-current ml-0.5')} />
        )}
      </button>
      <button
        type="button"
        onClick={stop}
        disabled={status === 'idle'}
        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-slate-800 border-2 border-amber-300 text-amber-800 hover:bg-amber-100 disabled:opacity-35 transition"
        aria-label="Leállítás"
        title="Leállítás"
      >
        <Square className="w-4 h-4 fill-current" />
      </button>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(current)}
        aria-label="Hanganyag haladása"
        onClick={seek}
        className="relative flex-1 min-w-[48px] h-3 rounded-full bg-amber-200/70 dark:bg-slate-700 cursor-pointer"
      >
        <div className="absolute inset-y-0 left-0 rounded-full bg-amber-500 transition-[width] duration-200 ease-linear" style={{ width: `${frac * 100}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-amber-500 shadow"
          style={{ left: `${frac * 100}%` }}
        />
      </div>
      <span className="shrink-0 tabular-nums text-sm font-bold text-amber-900 dark:text-amber-200" title={approx ? 'becsült hossz' : undefined}>
        {fmtTime(current)} / {approx ? '~' : ''}
        {fmtTime(duration)}
      </span>
    </div>
  );
};

/** Pötyi + szövegbuborék (rövid, nagy betűs felirat) + felolvasó gomb (osztott elrendezésben lejátszósáv). */
export const PotyiBubble: React.FC<{
  text: string;
  say?: string;
  mood?: PotyiMood;
  dots?: number;
  className?: string;
}> = ({ text, say, mood = 'happy', dots, className }) => {
  const split = useSplitLayout();
  if (split)
    return (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        <Potyi mood={mood} dots={dots} className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow" />
        <div className="relative w-full bg-white dark:bg-slate-800 border-[3px] border-rose-300 dark:border-rose-700 rounded-3xl px-4 py-3 shadow-sm">
          <span
            aria-hidden
            className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 bg-white dark:bg-slate-800 border-l-[3px] border-t-[3px] border-rose-300 dark:border-rose-700"
          />
          <p className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 leading-snug text-center">{text}</p>
          <AudioPlayer text={say || text} className="mt-3" />
        </div>
      </div>
    );
  return (
    <div className={cn('flex items-end gap-2 sm:gap-3', className)}>
      <Potyi mood={mood} dots={dots} className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 drop-shadow" />
      <div className="relative flex-1 flex items-center gap-2 bg-white dark:bg-slate-800 border-[3px] border-rose-300 dark:border-rose-700 rounded-3xl rounded-bl-md px-4 py-3 shadow-sm">
        <p className="flex-1 text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-snug">{text}</p>
        <SpeakButton text={say || text} />
      </div>
    </div>
  );
};

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
        disabled && state === 'idle' && 'cursor-default',
      )}
    >
      {isObj ? (
        <>
          {option.figure && (
            <div className="w-full flex items-center justify-center [&_svg]:max-h-[90px] sm:[&_svg]:max-h-[110px] [&_svg]:w-auto [&_svg]:max-w-full">
              {option.figure}
            </div>
          )}
          {option.label && <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 leading-tight">{option.label}</span>}
        </>
      ) : (
        <span
          className={cn(
            'font-black text-slate-800 dark:text-slate-100 leading-none',
            String(option).length <= 3 ? 'text-4xl sm:text-5xl' : String(option).length <= 9 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl',
          )}
        >
          {String(option)}
        </span>
      )}
      {state === 'correct' && <span className="absolute -top-3 -right-3 text-3xl">⭐</span>}
    </button>
  );
};

/** Csillagsor (pl. eredményhez). */
export const Stars: React.FC<{
  value: number;
  max: number;
  className?: string;
}> = ({ value, max, className }) => (
  <div className={cn('flex flex-wrap justify-center gap-1', className)} aria-label={`${value} csillag ${max}-ból`}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={cn('text-2xl sm:text-3xl transition', i < value ? 'opacity-100' : 'opacity-20 grayscale')}>
        ⭐
      </span>
    ))}
  </div>
);

/** Egyszerű SVG tárgysor számláláshoz: n darab azonos ikon, legfeljebb 5 egy sorban. */
export const CountRow: React.FC<{
  n: number;
  icon: (x: number, y: number, i: number) => React.ReactNode;
  perRow?: number;
  cell?: number;
  className?: string;
}> = ({ n, icon, perRow = 5, cell = 48, className = 'w-full max-w-[320px] h-auto mx-auto' }) => {
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
