import React from 'react';
import { cn } from '@/lib/utils';

export interface FractionProps {
  num: string | number;
  den: string | number;
  whole?: string | number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Fraction: React.FC<FractionProps> = ({
  num,
  den,
  whole,
  className,
  size = 'md'
}) => {
  const sizeStyles = {
    sm: {
      container: 'text-[11px]',
      whole: 'text-xs mr-0.5 font-bold',
      fraction: 'text-[9px]',
      border: 'border-b-[1px]',
      padding: 'px-0.5 pb-[0.5px]'
    },
    md: {
      container: 'text-xs sm:text-sm',
      whole: 'text-sm sm:text-base mr-1 font-bold',
      fraction: 'text-[10px] sm:text-xs',
      border: 'border-b-[1.5px]',
      padding: 'px-1 pb-[1px]'
    },
    lg: {
      container: 'text-base sm:text-lg',
      whole: 'text-lg sm:text-xl mr-1.5 font-black',
      fraction: 'text-xs sm:text-sm',
      border: 'border-b-2',
      padding: 'px-1.5 pb-0.5'
    },
    xl: {
      container: 'text-xl sm:text-2xl',
      whole: 'text-2xl sm:text-3xl mr-2 font-black',
      fraction: 'text-base sm:text-lg',
      border: 'border-b-2',
      padding: 'px-2 pb-0.5'
    }
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center align-middle mx-0.5 font-mono font-bold leading-none select-none",
        sizeStyles.container,
        className
      )}
    >
      {whole !== undefined && whole !== null && whole !== '' && (
        <span className={sizeStyles.whole}>{whole}</span>
      )}
      <span className={cn("inline-flex flex-col items-center justify-center", sizeStyles.fraction)}>
        <span className={cn("border-current text-center w-full leading-none", sizeStyles.border, sizeStyles.padding)}>
          {num}
        </span>
        <span className="pt-[1px] text-center w-full leading-none">
          {den}
        </span>
      </span>
    </span>
  );
};

export function parseFractionsInText(
  text: string | React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (typeof text !== 'string') return text;

  // Regex pattern matching:
  // 1. Both parenthesized: (expr1)/(expr2) -> e.g. "(a · k)/(b · k)", "(18 : 6)/(24 : 6)", "(Számláló)/(Nevező)"
  // 2. Numerator parenthesized: (expr1)/den -> e.g. "(a + b)/c", "(a - b)/c", "(2 + 3)/6", "(e · b + a)/b"
  // 3. Denominator parenthesized: num/(expr2) -> e.g. "a/(b + c)", "1/(2 + 3)"
  // 4. Mixed number: (whole) (num)/(den) -> e.g. "1 1/2", "2 3/4"
  // 5. Simple numeric fraction with optional suffix: (num)/(den)(-suffix)? -> e.g. "3/4", "3/4-e", "6 / 2", "18/24"
  // 6. Algebraic single variable fraction: (a)/(b) -> e.g. "a/b", "a/c", "b/c", "x/y"
  const regex = /\(([^()]+)\)\s*\/\s*\(([^()]+)\)|\(([^()]+)\)\s*\/\s*(\b[a-zA-Z0-9]+)\b|\b([a-zA-Z0-9]+)\s*\/\s*\(([^()]+)\)|(\b\d+)\s+(\d+)\s*\/\s*(\d+)|(\b\d+)\s*\/\s*(\d+\b)(-[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ]+)?|(\b[a-zA-Z]\b)\s*\/\s*(\b[a-zA-Z]\b)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Both parenthesized: (expr1) / (expr2)
      parts.push(
        <Fraction
          key={`frac-paren2-${match.index}-${match[1]}-${match[2]}`}
          num={match[1].trim()}
          den={match[2].trim()}
          size={size}
        />
      );
    } else if (match[3] && match[4]) {
      // Numerator parenthesized: (expr1) / den e.g. (a + b)/c
      parts.push(
        <Fraction
          key={`frac-num-paren-${match.index}-${match[3]}-${match[4]}`}
          num={match[3].trim()}
          den={match[4].trim()}
          size={size}
        />
      );
    } else if (match[5] && match[6]) {
      // Denominator parenthesized: num / (expr2) e.g. a/(b + c)
      parts.push(
        <Fraction
          key={`frac-den-paren-${match.index}-${match[5]}-${match[6]}`}
          num={match[5].trim()}
          den={match[6].trim()}
          size={size}
        />
      );
    } else if (match[7] && match[8] && match[9]) {
      // Mixed number: whole num/den e.g. 1 1/2
      parts.push(
        <Fraction
          key={`frac-mixed-${match.index}-${match[7]}-${match[8]}-${match[9]}`}
          whole={match[7]}
          num={match[8]}
          den={match[9]}
          size={size}
        />
      );
    } else if (match[10] && match[11]) {
      // Simple numeric fraction with optional suffix e.g. 3/4 or 3/4-e
      parts.push(
        <React.Fragment key={`frac-simple-${match.index}-${match[10]}-${match[11]}`}>
          <Fraction
            num={match[10]}
            den={match[11]}
            size={size}
          />
          {match[12] && <span>{match[12]}</span>}
        </React.Fragment>
      );
    } else if (match[13] && match[14]) {
      // Algebraic variable fraction e.g. a/b or a/c
      parts.push(
        <Fraction
          key={`frac-var-${match.index}-${match[13]}-${match[14]}`}
          num={match[13]}
          den={match[14]}
          size={size}
        />
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length === 0 ? text : <>{parts}</>;
}

export const MathText: React.FC<{
  text?: string | React.ReactNode;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ text, children, size = 'md', className }) => {
  let content = text ?? children;
  
  if (Array.isArray(content)) {
    if (content.every(item => typeof item === 'string' || typeof item === 'number')) {
      content = content.join('');
    }
  }

  if (typeof content !== 'string') {
    return <span className={className}>{content}</span>;
  }
  return <span className={className}>{parseFractionsInText(content, size)}</span>;
};

export default MathText;

