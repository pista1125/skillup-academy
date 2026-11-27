import type { ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

/** Különálló, nagy számjegy-dobozok. */
const SLOT_CLASS =
  'w-10 h-12 sm:w-12 sm:h-14 text-2xl sm:text-3xl font-black font-mono rounded-xl first:rounded-xl last:rounded-xl ' +
  'border-2 first:border-l-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 ' +
  'text-indigo-700 dark:text-indigo-300 shadow-sm';

interface PinCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Hatodik számjegy után automatikusan is meghívódik. */
  onSubmit: (value: string) => void;
  busy?: boolean;
  buttonLabel: string;
  busyLabel?: string;
  buttonIcon: ReactNode;
  /** A teljes kód beírása utáni segédszöveg. */
  doneHint?: string;
  onClear?: () => void;
}

/** 6-jegyű kód beírása (diáktárs-kód, bajnoksági kód) – egységes kinézet. */
export default function PinCodeInput({
  value,
  onChange,
  onSubmit,
  busy = false,
  buttonLabel,
  busyLabel,
  buttonIcon,
  doneHint = 'A 6. számjegy után automatikusan továbblépsz.',
  onClear,
}: PinCodeInputProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 px-3 py-5 sm:p-6">
      <InputOTP
        maxLength={6}
        inputMode="numeric"
        pattern="^[0-9]*$"
        value={value}
        onChange={(val) => {
          onChange(val);
          if (val.length === 6) onSubmit(val);
        }}
        disabled={busy}
        containerClassName="gap-1.5 sm:gap-3"
      >
        <InputOTPGroup className="gap-1.5 sm:gap-2">
          {[0, 1, 2].map((i) => (
            <InputOTPSlot key={i} index={i} className={SLOT_CLASS} />
          ))}
        </InputOTPGroup>
        <span className="text-2xl font-black text-indigo-300 dark:text-indigo-700 select-none" aria-hidden>
          –
        </span>
        <InputOTPGroup className="gap-1.5 sm:gap-2">
          {[3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} className={SLOT_CLASS} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={() => onSubmit(value)}
        disabled={busy || value.length !== 6}
        className="w-full max-w-sm h-12 rounded-xl font-black text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50"
      >
        {busy ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <span className="mr-2 inline-flex">{buttonIcon}</span>}
        {busy ? busyLabel ?? buttonLabel : buttonLabel}
      </Button>

      <div className="flex items-center gap-3 -mt-1 text-[11px] text-slate-500 dark:text-slate-400">
        <span>{value.length < 6 ? `Még ${6 - value.length} számjegy hiányzik` : doneHint}</span>
        {onClear && value.length > 0 && (
          <button onClick={onClear} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Törlés
          </button>
        )}
      </div>
    </div>
  );
}
