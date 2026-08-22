import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, CheckCircle2, XCircle, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MathChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Operation = 'add' | 'multiply';

function generateChallenge(operation: Operation) {
  if (operation === 'add') {
    const a = Math.floor(Math.random() * 50) + 10; // 10-59
    const b = Math.floor(Math.random() * 50) + 10; // 10-59
    return { a, b, answer: a + b, symbol: '+', label: 'összeadás' };
  } else {
    const a = Math.floor(Math.random() * 9) + 2; // 2-10
    const b = Math.floor(Math.random() * 9) + 2; // 2-10
    return { a, b, answer: a * b, symbol: '×', label: 'szorzás' };
  }
}

export default function MathChallengeModal({ isOpen, onClose, onSuccess }: MathChallengeModalProps) {
  const [challenge, setChallenge] = useState(() =>
    generateChallenge(Math.random() < 0.5 ? 'add' : 'multiply')
  );
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-generate challenge whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setChallenge(generateChallenge(Math.random() < 0.5 ? 'add' : 'multiply'));
      setInput('');
      setStatus('idle');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userAnswer = parseInt(input, 10);

    if (isNaN(userAnswer)) {
      triggerError();
      return;
    }

    if (userAnswer === challenge.answer) {
      setStatus('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 900);
    } else {
      triggerError();
    }
  };

  const triggerError = () => {
    setStatus('error');
    setShake(true);
    setTimeout(() => {
      setShake(false);
      setStatus('idle');
      setInput('');
      // Generate a new challenge on wrong answer
      setChallenge(generateChallenge(Math.random() < 0.5 ? 'add' : 'multiply'));
      inputRef.current?.focus();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 fade-in duration-300",
          shake && "animate-shake"
        )}
        style={shake ? { animation: 'shake 0.4s ease-in-out' } : undefined}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 px-6 pt-6 pb-10 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/30">
            <Calculator size={28} className="text-white" />
          </div>
          <h2 className="text-lg font-black uppercase tracking-wider">Segítség zárolva</h2>
          <p className="text-xs text-white/80 mt-1">Oldd meg a feladványt a legjobb lépésért!</p>
        </div>

        {/* Challenge area */}
        <div className="-mt-5 mx-5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 mb-5">
          <div className="text-center mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              {challenge.label} feladat
            </p>
            <div className="flex items-center justify-center gap-3 text-4xl font-black text-slate-800 dark:text-white">
              <span>{challenge.a}</span>
              <span className="text-indigo-500">{challenge.symbol}</span>
              <span>{challenge.b}</span>
              <span className="text-slate-400">=</span>
              <span className="text-indigo-600 dark:text-indigo-400">?</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Írd be a választ..."
                className={cn(
                  "w-full text-center text-2xl font-black h-14 rounded-2xl border-2 bg-slate-50 dark:bg-slate-900 outline-none transition-all",
                  status === 'idle' && "border-slate-200 dark:border-slate-700 focus:border-indigo-500",
                  status === 'success' && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600",
                  status === 'error' && "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-600"
                )}
                disabled={status === 'success'}
              />
              {status === 'success' && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={22} />
              )}
              {status === 'error' && (
                <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500" size={22} />
              )}
            </div>

            {status === 'error' && (
              <p className="text-center text-xs font-bold text-rose-500 animate-in fade-in">
                Helytelen válasz! Próbáld újra.
              </p>
            )}
            {status === 'success' && (
              <p className="text-center text-xs font-bold text-emerald-500 animate-in fade-in">
                ✓ Helyes! Megmutatom a legjobb lépést...
              </p>
            )}

            {status === 'idle' && (
              <Button
                type="submit"
                className="h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Lightbulb size={18} className="mr-2" />
                Ellenőrzés
              </Button>
            )}
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-400 pb-5 px-4">
          Helyes válasz esetén a gép megmutatja a legjobb lépést a táblán.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
