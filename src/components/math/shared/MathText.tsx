import React from 'react';
import { cn } from '@/lib/utils';

export interface FractionProps {
  num: string | number | React.ReactNode;
  den: string | number | React.ReactNode;
  whole?: string | number | React.ReactNode;
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
  // 1. LaTeX \frac{num}{den} -> e.g. "\frac{n · (n - 3)}{2}", "\frac{a + b}{c}"
  // 2. Both parenthesized: (expr1)/(expr2) -> e.g. "(a · k)/(b · k)", "(18 : 6)/(24 : 6)", "(Számláló)/(Nevező)"
  // 3. Numerator parenthesized (with possible nested parens): (expr1)/den -> e.g. "(n · (n - 3))/2", "(a + b)/c", "(a · mₐ) / 2"
  // 4. Denominator parenthesized (with possible nested parens): num/(expr2) -> e.g. "a/(b + c)", "1/(2 + 3)", "3/(-4)"
  // 5. Mixed number with optional 'és': (whole) [és] (num)/(den) -> e.g. "1 1/2", "2 3/4", "1 és 4/15", "-1 7/8"
  // 6. Parenthesized single fraction with optional sign: [+-]?(num/den) -> e.g. "(a/b)", "-(a/b)", "+(a/b)", "-(3/4)", "(2/3)"
  // 7. Simple numeric fraction with optional suffix: (num)/(den)(-suffix)? -> e.g. "3/4", "-3/4", "3/4-e", "18/24", "45/120"
  // 8. Algebraic single variable fraction: a/b, -a/b, x/y, y/2, x/3
  // 9. Number / single variable fraction: 1/x, 1/a
  const regex = /\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}|\(([^()]*(?:\([^()]*\)[^()]*)*)\)\s*\/\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)|\(([^()]*(?:\([^()]*\)[^()]*)*)\)\s*\/\s*(\b\d+\b|\b[a-zA-Z0-9_]+\b)|(\b[a-zA-Z0-9_]+\b)\s*\/\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)|(-?\b\d+)\s+(?:és\s+)?(\d+)\s*\/\s*(\d+)|([+-])?\s*\(([+-]?\b(?:[a-zA-Z]|\d{1,3}))\s*\/\s*([+-]?\b(?:[a-zA-Z]|\d{1,3}))\)|(-?\b\d{1,3})\s*\/\s*(\d{1,3}\b)(-[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ]+)?|(-?\b[a-zA-Z]\b)\s*\/\s*(\b[a-zA-Z0-9]\b)|\b([a-zA-Z0-9])\s*\/\s*(\b[a-zA-Z]\b)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // LaTeX \frac{num}{den}
      parts.push(
        <Fraction
          key={`frac-latex-${match.index}-${match[1]}-${match[2]}`}
          num={parseFractionsInText(match[1].trim(), size)}
          den={parseFractionsInText(match[2].trim(), size)}
          size={size}
        />
      );
    } else if (match[3] && match[4]) {
      // Both parenthesized: (expr1) / (expr2)
      parts.push(
        <Fraction
          key={`frac-paren2-${match.index}-${match[3]}-${match[4]}`}
          num={parseFractionsInText(match[3].trim(), size)}
          den={parseFractionsInText(match[4].trim(), size)}
          size={size}
        />
      );
    } else if (match[5] && match[6]) {
      // Numerator parenthesized: (expr1) / den e.g. (n · (n - 3)) / 2 or (a + b)/c
      parts.push(
        <Fraction
          key={`frac-num-paren-${match.index}-${match[5]}-${match[6]}`}
          num={parseFractionsInText(match[5].trim(), size)}
          den={match[6].trim()}
          size={size}
        />
      );
    } else if (match[7] && match[8]) {
      // Denominator parenthesized: num / (expr2) e.g. a/(b + c) or 3/(-4)
      parts.push(
        <Fraction
          key={`frac-den-paren-${match.index}-${match[7]}-${match[8]}`}
          num={match[7].trim()}
          den={parseFractionsInText(match[8].trim(), size)}
          size={size}
        />
      );
    } else if (match[9] && match[10] && match[11]) {
      // Mixed number: whole num/den e.g. 1 1/2 or 1 és 4/15
      parts.push(
        <Fraction
          key={`frac-mixed-${match.index}-${match[9]}-${match[10]}-${match[11]}`}
          whole={match[9]}
          num={match[10]}
          den={match[11]}
          size={size}
        />
      );
    } else if (match[13] && match[14]) {
      // Parenthesized single fraction with optional sign: e.g. -(a/b), +(a/b), (3/4), -(3/4)
      const sign = match[12];
      parts.push(
        <React.Fragment key={`frac-paren-single-${match.index}-${match[13]}-${match[14]}`}>
          {sign && <span className="mr-0.5">{sign}</span>}
          <Fraction
            num={match[13]}
            den={match[14]}
            size={size}
          />
        </React.Fragment>
      );
    } else if (match[15] && match[16]) {
      // Simple numeric fraction with optional suffix e.g. 3/4, -3/4, or 3/4-e
      parts.push(
        <React.Fragment key={`frac-simple-${match.index}-${match[15]}-${match[16]}`}>
          <Fraction
            num={match[15]}
            den={match[16]}
            size={size}
          />
          {match[17] && <span>{match[17]}</span>}
        </React.Fragment>
      );
    } else if (match[18] && match[19]) {
      // Algebraic variable fraction e.g. a/b, -a/b, y/2
      parts.push(
        <Fraction
          key={`frac-var1-${match.index}-${match[18]}-${match[19]}`}
          num={match[18]}
          den={match[19]}
          size={size}
        />
      );
    } else if (match[20] && match[21]) {
      // Algebraic variable fraction e.g. 1/x, 1/a
      parts.push(
        <Fraction
          key={`frac-var2-${match.index}-${match[20]}-${match[21]}`}
          num={match[20]}
          den={match[21]}
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

function processChildrenArray(
  children: React.ReactNode[],
  size: 'sm' | 'md' | 'lg' | 'xl'
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let primitiveBuffer = '';

  const flushBuffer = (keyIdx: number) => {
    if (primitiveBuffer.length > 0) {
      result.push(
        <React.Fragment key={`text-chunk-${keyIdx}`}>
          {parseFractionsInText(primitiveBuffer, size)}
        </React.Fragment>
      );
      primitiveBuffer = '';
    }
  };

  children.forEach((child, idx) => {
    if (typeof child === 'string' || typeof child === 'number') {
      primitiveBuffer += String(child);
    } else {
      flushBuffer(idx);
      if (child !== null && child !== undefined && typeof child !== 'boolean') {
        result.push(
          <React.Fragment key={`node-chunk-${idx}`}>
            {parseFractionsInNode(child, size)}
          </React.Fragment>
        );
      }
    }
  });

  flushBuffer(children.length);
  return result;
}

export function parseFractionsInNode(
  node: React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return node;
  }
  if (typeof node === 'string') {
    return parseFractionsInText(node, size);
  }
  if (typeof node === 'number') {
    return parseFractionsInText(String(node), size);
  }
  if (Array.isArray(node)) {
    return processChildrenArray(node, size);
  }
  if (React.isValidElement(node)) {
    const type = node.type;
    // Skip inputs, selects, svgs, fractions to avoid interference
    if (
      type === 'input' ||
      type === 'select' ||
      type === 'textarea' ||
      type === 'option' ||
      type === 'svg' ||
      type === 'path' ||
      type === 'canvas' ||
      (typeof type === 'function' && (type.name === 'Fraction' || type.name === 'MathText'))
    ) {
      return node;
    }

    const props = node.props as { children?: React.ReactNode };
    if (props && props.children !== undefined) {
      return React.cloneElement(node, {
        ...props,
        children: parseFractionsInNode(props.children, size)
      } as any);
    }
    return node;
  }
  return node;
}

export const MathText: React.FC<{
  text?: string | React.ReactNode;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ text, children, size = 'md', className }) => {
  const content = text ?? children;
  
  return <span className={className}>{parseFractionsInNode(content, size)}</span>;
};

export default MathText;


