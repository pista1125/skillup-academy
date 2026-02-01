interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'math' | 'physics';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-primary',
  success: 'bg-gradient-success',
  math: 'bg-gradient-math',
  physics: 'bg-gradient-physics',
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
  size = 'md' 
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
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
          className={`${sizeStyles[size]} rounded-full progress-bar-animated ${variantStyles[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
