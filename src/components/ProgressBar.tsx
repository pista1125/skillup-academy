export interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'math' | 'physics';
  color?: 'emerald' | 'amber' | 'purple' | 'blue' | 'indigo' | 'rose' | 'red' | 'green' | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-primary',
  success: 'bg-gradient-success',
  math: 'bg-gradient-math',
  physics: 'bg-gradient-physics',
};

const colorStyles: Record<string, string> = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  rose: 'bg-rose-500',
  red: 'bg-red-500',
  green: 'bg-emerald-500',
};

const sizeStyles = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({ 
  current, 
  total, 
  showLabel = false, 
  variant = 'default',
  color,
  size = 'md',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  const barColor = color 
    ? (colorStyles[color] || (color.startsWith('bg-') ? color : `bg-${color}-500`)) 
    : (variantStyles[variant] || variantStyles.default);
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {current} / {total}
          </span>
          <span className="text-sm font-bold text-foreground">
            {percentage}%
          </span>
        </div>
      )}
      <div className={`w-full bg-secondary rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div 
          className={`${sizeStyles[size]} rounded-full progress-bar-animated ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
