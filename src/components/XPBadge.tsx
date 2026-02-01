import { Zap, Flame } from 'lucide-react';

interface XPBadgeProps {
  xp: number;
  streak?: number;
}

export function XPBadge({ xp, streak }: XPBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="xp-badge">
        <Zap className="w-4 h-4" />
        <span>{xp} XP</span>
      </div>
      {streak !== undefined && streak > 0 && (
        <div className="streak-badge">
          <Flame className="w-4 h-4" />
          <span>{streak} nap</span>
        </div>
      )}
    </div>
  );
}
