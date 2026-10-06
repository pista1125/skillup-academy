import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

export interface FractionProps {
  num: string | number | React.ReactNode;
  den: string | number | React.ReactNode;
  whole?: string | number | React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface SqrtProps {
  radicand?: string | number | React.ReactNode;
  children?: React.ReactNode;
  degree?: string | number | React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const UNICODE_SUB_MAP: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  'ₐ': 'a', 'ᵦ': 'b', 'ₖ': 'k', 'ₙ': 'n',
};

export const UNICODE_SUP_MAP: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  'ⁿ': 'n', '⁺': '+', '⁻': '-',
};

function cleanScriptContent(content: string): string {
  return cleanMathSymbols(content)
    .replace(/\\+text\{([^}]*)\}/g, '$1')
    .replace(/\\+(max|min)/g, '$1')
    .replace(/\\+mathrm\{([^}]*)\}/g, '$1')
    .replace(/\\+mathbf\{([^}]*)\}/g, '$1')
    .replace(/\\+cdot/g, '·')
    .replace(/\\+/g, '')
    .trim();
}

export const SCRIPT_REGEX = /(\^|_)(?:\{([^{}]+)\}|\(([^()]+)\)|([+-]?[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰα-ωΑ-Ω]+))|([₀₁₂₃₄₅₆₇₈₉ₐᵦₖₙ]+)|([⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺⁻]+)/g;

export function parseScriptsInText(
  text: string | React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (typeof text !== 'string') return text;
  if (!text) return text;

  // Quick check: if text contains no ^, _, or unicode sub/sup, return text directly
  const hasScripts = /[\^_₀₁₂₃₄₅₆₇₈₉ₐᵦₖₙ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺⁻]/.test(text);
  if (!hasScripts) {
    return text;
  }

  const regex = new RegExp(SCRIPT_REGEX.source, 'g');
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      const isSub = match[1] === '_';
      const rawContent = match[2] ?? match[3] ?? match[4] ?? '';
      const cleanContent = cleanScriptContent(rawContent);

      if (cleanContent) {
        if (isSub) {
          parts.push(
            <sub
              key={`sub-${match.index}`}
              className="text-[0.72em] font-medium leading-none align-baseline relative -bottom-[0.24em] ml-[0.5px] mr-[0.5px] text-current"
            >
              {cleanContent.includes('^') || cleanContent.includes('_')
                ? parseScriptsInText(cleanContent, size)
                : cleanContent}
            </sub>
          );
        } else {
          parts.push(
            <sup
              key={`sup-${match.index}`}
              className="text-[0.72em] font-medium leading-none align-baseline relative -top-[0.42em] ml-[0.5px] mr-[0.5px] text-current"
            >
              {cleanContent.includes('^') || cleanContent.includes('_')
                ? parseScriptsInText(cleanContent, size)
                : cleanContent}
            </sup>
          );
        }
      }
    } else if (match[5]) {
      // Unicode subscript sequence
      const mapped = match[5].split('').map(ch => UNICODE_SUB_MAP[ch] || ch).join('');
      parts.push(
        <sub
          key={`unisub-${match.index}`}
          className="text-[0.72em] font-medium leading-none align-baseline relative -bottom-[0.24em] ml-[0.5px] mr-[0.5px] text-current"
        >
          {mapped}
        </sub>
      );
    } else if (match[6]) {
      // Unicode superscript sequence
      const mapped = match[6].split('').map(ch => UNICODE_SUP_MAP[ch] || ch).join('');
      parts.push(
        <sup
          key={`unisup-${match.index}`}
          className="text-[0.72em] font-medium leading-none align-baseline relative -top-[0.42em] ml-[0.5px] mr-[0.5px] text-current"
        >
          {mapped}
        </sup>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length === 0 ? text : <>{parts}</>;
}

export function parseScriptsInNode(
  node: React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return node;
  }
  if (typeof node === 'string') {
    return parseScriptsInText(node, size);
  }
  if (typeof node === 'number') {
    return parseScriptsInText(String(node), size);
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{parseScriptsInNode(child, size)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const type = node.type;
    if (
      type === 'input' ||
      type === 'select' ||
      type === 'textarea' ||
      type === 'option' ||
      type === 'svg' ||
      type === 'path' ||
      type === 'canvas' ||
      type === 'sub' ||
      type === 'sup' ||
      type === Fraction ||
      type === Sqrt ||
      (typeof type === 'function' && (type.name === 'Fraction' || type.name === 'MathText' || type.name === 'Sqrt'))
    ) {
      return node;
    }

    const props = node.props as { children?: React.ReactNode };
    if (props && props.children !== undefined) {
      return React.cloneElement(node, {
        ...props,
        children: parseScriptsInNode(props.children, size),
      } as any);
    }
  }
  return node;
}

export function cleanMathSymbols(text: string): string {
  return text
    // LaTeX text macros & spacing
    .replace(/\\+text\{([^}]*)\}/g, '$1')
    .replace(/\\+textbf\{([^}]*)\}/g, '$1')
    .replace(/\\+mathrm\{([^}]*)\}/g, '$1')
    .replace(/\\+mathbf\{([^}]*)\}/g, '$1')
    .replace(/\\+qquad/g, '     ')
    .replace(/\\+quad/g, '   ')
    .replace(/\\+enspace/g, ' ')
    .replace(/\\+bullet/g, ' ')
    .replace(/\\+,/g, ' ')
    .replace(/\\+;/g, ' ')
    .replace(/\\+\s+/g, ' ')
    .replace(/\{,\}/g, ',')
    // Sets and number domains
    .replace(/\\+mathbb\{N\}|\\+mathbb\s*N/g, 'ℕ')
    .replace(/\\+mathbb\{Z\}|\\+mathbb\s*Z/g, 'ℤ')
    .replace(/\\+mathbb\{Q\}|\\+mathbb\s*Q/g, 'ℚ')
    .replace(/\\+mathbb\{R\}|\\+mathbb\s*R/g, 'ℝ')
    .replace(/\\+emptyset|\\+varnothing/g, '∅')
    .replace(/\\+notin/g, '∉')
    .replace(/\\+in(?![a-zA-Z])/g, '∈')
    .replace(/\\+subseteq/g, '⊆')
    .replace(/\\+subset(?![a-zA-Z])/g, '⊂')
    .replace(/\\+cup/g, '∪')
    .replace(/\\+cap/g, '∩')
    .replace(/\\+setminus/g, ' \\ ')
    // Operators and relations
    .replace(/\\+pm/g, '±')
    .replace(/\\+mp/g, '∓')
    .replace(/\\+neq|\\+ne(?![a-zA-Z])/g, '≠')
    .replace(/\\+leq|\\+le(?![a-zA-Z])/g, '≤')
    .replace(/\\+geq|\\+ge(?![a-zA-Z])/g, '≥')
    .replace(/\\+approx/g, '≈')
    .replace(/\\+cdot/g, '·')
    .replace(/\\+times/g, '×')
    .replace(/\\+div/g, ':')
    .replace(/\\+implies/g, ' ⟹ ')
    .replace(/\\+iff/g, ' ⟺ ')
    .replace(/\\+dots/g, '…')
    .replace(/\\+sim/g, '~')
    .replace(/\\+cong/g, '≅')
    .replace(/\\+perp/g, '⊥')
    .replace(/\\+parallel/g, '∥')
    .replace(/\\+angle/g, '∡')
    .replace(/\\+triangle/g, '△')
    .replace(/\\+overline\{([^}]+)\}/g, '$1')
    .replace(/\\+bar\{([^}]+)\}/g, '$1')
    // Greek letters
    .replace(/\\+Delta(?![a-zA-Z])/g, 'Δ')
    .replace(/\\+alpha'/g, "α'")
    .replace(/\\+alpha(?![a-zA-Z])/g, 'α')
    .replace(/\\+beta(?![a-zA-Z])/g, 'β')
    .replace(/\\+gamma(?![a-zA-Z])/g, 'γ')
    .replace(/\\+delta(?![a-zA-Z])/g, 'δ')
    .replace(/\\+omega(?![a-zA-Z])/g, 'ω')
    .replace(/\\+pi(?![a-zA-Z])/g, 'π')
    .replace(/\\+(?:rho|varrho)(?![a-zA-Z])/g, 'ρ')
    .replace(/\\+lambda(?![a-zA-Z])/g, 'λ')
    .replace(/\\+Lambda(?![a-zA-Z])/g, 'Λ')
    .replace(/\\+mu(?![a-zA-Z])/g, 'μ')
    .replace(/\\+(?:phi|varphi)(?![a-zA-Z])/g, 'φ')
    .replace(/\\+Phi(?![a-zA-Z])/g, 'Φ')
    .replace(/\\+(?:theta|vartheta)(?![a-zA-Z])/g, 'θ')
    .replace(/\\+Theta(?![a-zA-Z])/g, 'Θ')
    .replace(/\\+sigma(?![a-zA-Z])/g, 'σ')
    .replace(/\\+Sigma(?![a-zA-Z])/g, 'Σ')
    .replace(/\\+tau(?![a-zA-Z])/g, 'τ')
    .replace(/\\+(?:epsilon|varepsilon)(?![a-zA-Z])/g, 'ε')
    .replace(/\\+eta(?![a-zA-Z])/g, 'η')
    .replace(/\\+Omega(?![a-zA-Z])/g, 'Ω')
    .replace(/\\+Gamma(?![a-zA-Z])/g, 'Γ')
    // Brackets
    .replace(/\\+left\(/g, '(')
    .replace(/\\+right\)/g, ')')
    .replace(/\\+left\[/g, '[')
    .replace(/\\+right\]/g, ']')
    .replace(/\\+left\\\{/g, '{')
    .replace(/\\+right\\\}/g, '}')
    .replace(/\\+\{/g, '{')
    .replace(/\\+\}/g, '}')
    // Degrees and functions
    .replace(/\^\\+circ|\^\{\\+circ\}|\\+circ/g, '°')
    .replace(/\\+(max|min)/g, '$1')
    // Remove standalone math dollar signs if any
    .replace(/\$([^$]+)\$/g, '$1')
    // Clean up any stray backslashes before math symbols or operators
    .replace(/\\+(\s*[·=+\-×÷<>≤≥≠≈~⟹⟺])/g, '$1');
}

export function toLatex(s: string): string {
  let res = String(s)
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁰/g, '^0')
    .replace(/¹/g, '^1')
    .replace(/ⁿ/g, '^n')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/₀/g, '_0')
    .replace(/ₐ/g, '_a')
    .replace(/ᵦ/g, '_b')
    .replace(/ₖ/g, '_k')
    .replace(/ₙ/g, '_n')
    .replace(/·/g, ' \\cdot ')
    .replace(/×/g, ' \\times ')
    .replace(/≈/g, ' \\approx ')
    .replace(/≤/g, ' \\le ')
    .replace(/≥/g, ' \\ge ')
    .replace(/≠/g, ' \\ne ')
    .replace(/°/g, '^{\\circ}')
    .replace(/\b(m|s|T)([abc])\b/g, '$1_$2');

  res = res.replace(/_\(([^()]+)\)/g, '_{$1}');
  res = res.replace(/\^\(([^()]+)\)/g, '^{$1}');

  res = res.replace(/√\{([^}]+)\}/g, (_, m) => `\\sqrt{${m}}`);
  res = res.replace(/√\(([^)]+)\)/g, (_, m) => `\\sqrt{${m}}`);
  res = res.replace(/√([0-9a-zA-Z]+)/g, (_, m) => `\\sqrt{${m}}`);

  res = res.replace(/\(([^()]+)\s*\/\s*([^()]+)\)/g, (_, a, b) => `\\left(\\frac{${a}}{${b}}\\right)`);
  res = res.replace(/([a-zA-Z0-9_{}()+-]+)\s*\/\s*([a-zA-Z0-9_{}()+-]+)/g, (_, a, b) => `\\frac{${a}}{${b}}`);

  return res;
}

export const Sqrt: React.FC<SqrtProps> = ({
  radicand,
  children,
  degree,
  className,
  size = 'md',
}) => {
  const content = radicand ?? children;

  let latexRadicand: string | null = null;
  if (typeof content === 'string' || typeof content === 'number') {
    latexRadicand = toLatex(String(content).trim());
  }

  if (latexRadicand) {
    try {
      const latexExpr = degree ? `\\sqrt[${degree}]{${latexRadicand}}` : `\\sqrt{${latexRadicand}}`;
      const html = katex.renderToString(latexExpr, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });

      const sizeClasses = {
        sm: 'text-xs',
        md: 'text-sm sm:text-base',
        lg: 'text-base sm:text-lg',
        xl: 'text-lg sm:text-2xl',
      }[size];

      return (
        <span
          className={cn(
            'inline-flex items-baseline mx-0.5 text-current align-baseline leading-none font-normal [font-feature-settings:normal]',
            sizeClasses,
            className
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      // Fall through to fallback
    }
  }

  const sizeStyles = {
    sm: {
      svg: 'h-[1.12em] w-[0.62em]',
      strokeWidth: '2',
      border: 'border-t-[1.6px]',
      padding: 'pt-[0.5px] px-[1.5px]',
      text: 'text-xs',
    },
    md: {
      svg: 'h-[1.18em] w-[0.66em]',
      strokeWidth: '2.2',
      border: 'border-t-[1.8px]',
      padding: 'pt-[1px] px-[2px]',
      text: 'text-sm sm:text-base',
    },
    lg: {
      svg: 'h-[1.25em] w-[0.72em]',
      strokeWidth: '2.4',
      border: 'border-t-[2.0px]',
      padding: 'pt-[1px] px-[2.5px]',
      text: 'text-base sm:text-lg',
    },
    xl: {
      svg: 'h-[1.32em] w-[0.78em]',
      strokeWidth: '2.6',
      border: 'border-t-[2.2px]',
      padding: 'pt-[1.5px] px-[3px]',
      text: 'text-lg sm:text-2xl',
    },
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-start align-baseline select-none font-sans mx-0.5 leading-none',
        sizeStyles.text,
        className
      )}
    >
      {degree && (
        <sup className="text-[0.65em] font-bold -mr-1 -mt-1 select-none text-current opacity-85">
          {degree}
        </sup>
      )}
      <span className="inline-flex items-center text-current select-none shrink-0 -mr-[1px] transform translate-y-[0.05em]">
        <svg
          className={cn('overflow-visible text-current fill-none stroke-current', sizeStyles.svg)}
          viewBox="0 0 13 26"
          strokeWidth={sizeStyles.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 15 L3.5 15 L6.5 24 L12 2.5" />
        </svg>
      </span>
      <span
        className={cn(
          'border-current inline-flex items-center leading-none tracking-normal font-medium',
          sizeStyles.border,
          sizeStyles.padding
        )}
      >
        {parseScriptsInNode(content, size)}
      </span>
    </span>
  );
};

export const Fraction: React.FC<FractionProps> = ({
  num,
  den,
  whole,
  className,
  size = 'md',
}) => {
  const isNumSimple = typeof num === 'string' || typeof num === 'number';
  const isDenSimple = typeof den === 'string' || typeof den === 'number';
  const isWholeSimple =
    whole === undefined || whole === null || whole === '' || typeof whole === 'string' || typeof whole === 'number';

  if (isNumSimple && isDenSimple && isWholeSimple) {
    try {
      const latexNum = toLatex(String(num).trim());
      const latexDen = toLatex(String(den).trim());
      let latexExpr = `\\frac{${latexNum}}{${latexDen}}`;
      if (whole !== undefined && whole !== null && whole !== '') {
        const latexWhole = toLatex(String(whole).trim());
        latexExpr = `${latexWhole}\\;${latexExpr}`;
      }

      const html = katex.renderToString(latexExpr, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });

      const sizeClasses = {
        sm: 'text-xs',
        md: 'text-sm sm:text-base',
        lg: 'text-base sm:text-lg',
        xl: 'text-lg sm:text-2xl',
      }[size];

      return (
        <span
          className={cn(
            'inline-flex items-baseline mx-0.5 text-current align-baseline leading-none font-normal [font-feature-settings:normal]',
            sizeClasses,
            className
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      // Fall through to fallback
    }
  }

  const renderedNum = typeof num === 'string' ? parseScriptsInText(parseSquareRootsInText(cleanMathSymbols(num), size), size) : parseScriptsInNode(num, size);
  const renderedDen = typeof den === 'string' ? parseScriptsInText(parseSquareRootsInText(cleanMathSymbols(den), size), size) : parseScriptsInNode(den, size);
  const renderedWhole = typeof whole === 'string' ? parseScriptsInText(cleanMathSymbols(whole), size) : parseScriptsInNode(whole, size);

  const sizeStyles = {
    sm: {
      container: 'text-xs',
      whole: 'text-xs mr-0.5 font-bold',
      fraction: 'text-[11px]',
      border: 'border-b-[1.5px]',
      padding: 'px-1 pb-[1px]',
      pt: 'pt-[1px]',
    },
    md: {
      container: 'text-sm sm:text-base',
      whole: 'text-sm sm:text-base mr-1 font-bold',
      fraction: 'text-xs sm:text-[13px]',
      border: 'border-b-[1.5px]',
      padding: 'px-1.5 pb-[1.5px]',
      pt: 'pt-[1.5px]',
    },
    lg: {
      container: 'text-base sm:text-lg',
      whole: 'text-lg sm:text-xl mr-1.5 font-black',
      fraction: 'text-sm sm:text-base',
      border: 'border-b-2',
      padding: 'px-2 pb-[1.5px]',
      pt: 'pt-[1.5px]',
    },
    xl: {
      container: 'text-xl sm:text-2xl',
      whole: 'text-2xl sm:text-3xl mr-2 font-black',
      fraction: 'text-base sm:text-lg',
      border: 'border-b-2',
      padding: 'px-2.5 pb-[2px]',
      pt: 'pt-[2px]',
    },
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center align-middle mx-1 font-semibold leading-none select-none tracking-tight',
        sizeStyles.container,
        className
      )}
    >
      {renderedWhole !== undefined && renderedWhole !== null && renderedWhole !== '' && (
        <span className={sizeStyles.whole}>{renderedWhole}</span>
      )}
      <span className={cn('inline-flex flex-col items-center justify-center min-w-[13px]', sizeStyles.fraction)}>
        <span className={cn('border-current text-center w-full leading-tight', sizeStyles.border, sizeStyles.padding)}>
          {renderedNum}
        </span>
        <span className={cn('text-center w-full leading-tight', sizeStyles.pt)}>
          {renderedDen}
        </span>
      </span>
    </span>
  );
};

export function parseSquareRootsInText(
  text: string,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (typeof text !== 'string') return text;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let i = 0;
  let matchCount = 0;

  while (i < text.length) {
    let matchFound = false;
    const matchStart = i;
    let matchEnd = i;
    let radicand = '';

    // 1. \sqrt{...}
    if (text.startsWith('\\sqrt{', i)) {
      const start = i + 6;
      let depth = 1;
      let j = start;
      while (j < text.length && depth > 0) {
        if (text[j] === '{') depth++;
        else if (text[j] === '}') depth--;
        j++;
      }
      if (depth === 0) {
        matchEnd = j;
        radicand = text.substring(start, j - 1);
        matchFound = true;
      }
    }
    // 2. √{...}
    else if (text.startsWith('√{', i)) {
      const start = i + 2;
      let depth = 1;
      let j = start;
      while (j < text.length && depth > 0) {
        if (text[j] === '{') depth++;
        else if (text[j] === '}') depth--;
        j++;
      }
      if (depth === 0) {
        matchEnd = j;
        radicand = text.substring(start, j - 1);
        matchFound = true;
      }
    }
    // 3. √(...)
    else if (text.startsWith('√(', i)) {
      const start = i + 2;
      let depth = 1;
      let j = start;
      while (j < text.length && depth > 0) {
        if (text[j] === '(') depth++;
        else if (text[j] === ')') depth--;
        j++;
      }
      if (depth === 0) {
        matchEnd = j;
        radicand = text.substring(start, j - 1);
        matchFound = true;
      }
    }
    // 4. √[...]
    else if (text.startsWith('√[', i)) {
      const start = i + 2;
      let depth = 1;
      let j = start;
      while (j < text.length && depth > 0) {
        if (text[j] === '[') depth++;
        else if (text[j] === ']') depth--;
        j++;
      }
      if (depth === 0) {
        matchEnd = j;
        radicand = text.substring(start, j - 1);
        matchFound = true;
      }
    }
    // 5. \sqrt<number or variable> (e.g. \sqrt2, \sqrt3)
    else if (text.startsWith('\\sqrt', i)) {
      const afterSlash = text.substring(i + 5);
      const wsMatch = afterSlash.match(/^\s*/);
      const wsLen = wsMatch ? wsMatch[0].length : 0;
      const rest = afterSlash.substring(wsLen);
      const numMatch = rest.match(/^(\d+(?:[.,]\d+)?|[a-zA-Z](?:[²³⁰¹ⁿ]|_[0-9a-zA-Z])*)/);
      if (numMatch) {
        matchEnd = i + 5 + wsLen + numMatch[1].length;
        radicand = numMatch[1];
        matchFound = true;
      }
    }
    // 6. √<number or variable> (e.g. √2, √3, √64, √144, √a, √x, √a²)
    else if (text.startsWith('√', i)) {
      const rest = text.substring(i + 1);
      const numMatch = rest.match(/^(\d+(?:[.,]\d+)?|[a-zA-Z](?:[²³⁰¹ⁿ]|_[0-9a-zA-Z])*)/);
      if (numMatch) {
        matchEnd = i + 1 + numMatch[1].length;
        radicand = numMatch[1];
        matchFound = true;
      }
    }

    if (matchFound) {
      matchCount++;
      if (matchStart > lastIndex) {
        parts.push(
          <React.Fragment key={`sqrt-pre-${lastIndex}-${matchStart}`}>
            {parseScriptsInText(text.substring(lastIndex, matchStart), size)}
          </React.Fragment>
        );
      }
      parts.push(
        <Sqrt key={`sqrt-${matchStart}-${radicand}`} radicand={radicand} size={size}>
          {parseFractionsInText(radicand, size)}
        </Sqrt>
      );
      i = matchEnd;
      lastIndex = matchEnd;
    } else {
      i++;
    }
  }

  if (matchCount === 0) {
    return parseScriptsInText(text, size);
  }

  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`sqrt-tail-${lastIndex}`}>
        {parseScriptsInText(text.substring(lastIndex), size)}
      </React.Fragment>
    );
  }

  return parts.length === 0 ? parseScriptsInText(text, size) : <>{parts}</>;
}

const SCRIPT_EXPR = '(?:[²³⁰¹ⁿ]|_(?:\\{[^{}]+\\}|\\([^()]+\\)|[0-9a-zA-Zα-ωΑ-Ω]+)|\\^(?:\\{[^{}]+\\}|\\([^()]+\\)|[+-]?[0-9a-zA-Zα-ωΑ-Ω]+))';
const NUM_OR_VAR = '[a-zA-Zα-ωΑ-Ω](?:' + SCRIPT_EXPR + '|[a-zA-Z0-9α-ωΑ-Ω])*';
const SQRT_EXPR = '(?:√|\\\\sqrt)(?:\\{[^{}]+\\}|\\([^()]+\\)|\\[[^\\]]+\\]|\\d+(?:[.,]\\d+)?|' + NUM_OR_VAR + ')';
const DEN_EXPR = '(?:' + SQRT_EXPR + '|' + NUM_OR_VAR + '|\\d+(?:[.,]\\d+)?)';

const FRACTION_PATTERNS = [
  // 1. LaTeX \frac{num}{den}
  '\\\\frac\\{([^{}]*(?:\\{[^{}]*\\}[^{}]*)*)\\}\\{([^{}]*(?:\\{[^{}]*\\}[^{}]*)*)\\}',
  // 2. Both parenthesized: (expr1) / (expr2)
  '\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)\\s*\\/\\s*\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)',
  // 3. Numerator parenthesized: (expr1) / den
  '\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)\\s*\\/\\s*(' + DEN_EXPR + ')',
  // 4. Denominator parenthesized: num / (expr2)
  '(' + DEN_EXPR + '|\\b\\d+(?:[.,]\\d+)?°?)\\s*\\/\\s*\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)',
  // 5. Mixed number: whole num/den
  '(-?\\b\\d+)\\s+(?:és\\s+)?(\\d+)\\s*\\/\\s*(\\d+)',
  // 6. Parenthesized single fraction with optional sign: (+1/2), (-a/b)
  '([+-])?\\s*\\(([+-]?(?:' + SQRT_EXPR + '|' + NUM_OR_VAR + '|\\d{1,4}))\\s*\\/\\s*([+-]?(?:' + SQRT_EXPR + '|' + NUM_OR_VAR + '|\\d{1,4}))\\)',
  // 7. Sqrt in numerator: √3 / 2, √2 / 2, √a / 2
  '(' + SQRT_EXPR + ')\\s*\\/\\s*(' + DEN_EXPR + ')',
  // 8. Sqrt in denominator: d / √2, 1 / √2, c / √2
  '(' + NUM_OR_VAR + '|\\b\\d+(?:[.,]\\d+)?)\\s*\\/\\s*(' + SQRT_EXPR + ')',
  // 9. Degree numerator: 90° / 2
  '(\\b\\d+(?:[.,]\\d+)?°)\\s*\\/\\s*(' + DEN_EXPR + ')',
  // 10. Variable / Power / Subscript over number or variable: a² / 2, c² / 4, mc / 2, c / 2, a / b
  '(' + NUM_OR_VAR + ')\\s*\\/\\s*(' + DEN_EXPR + ')',
  // 11. Simple numeric fraction: 3/4, 24 / 5, -1/2
  '(-?\\b\\d{1,4})\\s*\\/\\s*(\\d{1,4}\\b)(-[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ]+)?'
];

export function parseFractionsInText(
  text: string | React.ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): React.ReactNode {
  if (typeof text !== 'string') return text;

  // Clean common LaTeX macros so they don't display raw backslashes
  const cleanText = cleanMathSymbols(text);

  // Fresh regex per call to avoid regex.lastIndex concurrency issues
  const regex = new RegExp(FRACTION_PATTERNS.join('|'), 'g');

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={`frac-pre-${lastIndex}-${match.index}`}>
          {parseSquareRootsInText(cleanText.substring(lastIndex, match.index), size)}
        </React.Fragment>
      );
    }

    if (match[1] && match[2]) {
      // 1. LaTeX \frac{num}{den}
      const rawNum = match[1].trim();
      const rawDen = match[2].trim();
      const hasNestedFracNum = rawNum.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawNum);
      const hasNestedFracDen = rawDen.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawDen);
      parts.push(
        <Fraction
          key={`frac-latex-${match.index}-${match[1]}-${match[2]}`}
          num={hasNestedFracNum ? parseFractionsInText(rawNum, size) : rawNum}
          den={hasNestedFracDen ? parseFractionsInText(rawDen, size) : rawDen}
          size={size}
        />
      );
    } else if (match[3] && match[4]) {
      // 2. Both parenthesized: (expr1) / (expr2)
      const rawNum = match[3].trim();
      const rawDen = match[4].trim();
      const hasNestedFracNum = rawNum.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawNum);
      const hasNestedFracDen = rawDen.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawDen);
      parts.push(
        <Fraction
          key={`frac-paren2-${match.index}-${match[3]}-${match[4]}`}
          num={hasNestedFracNum ? parseFractionsInText(rawNum, size) : rawNum}
          den={hasNestedFracDen ? parseFractionsInText(rawDen, size) : rawDen}
          size={size}
        />
      );
    } else if (match[5] && match[6]) {
      // 3. Numerator parenthesized: (expr1) / den
      const rawNum = match[5].trim();
      const hasNestedFracNum = rawNum.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawNum);
      parts.push(
        <Fraction
          key={`frac-num-paren-${match.index}-${match[5]}-${match[6]}`}
          num={hasNestedFracNum ? parseFractionsInText(rawNum, size) : rawNum}
          den={match[6].trim()}
          size={size}
        />
      );
    } else if (match[7] && match[8]) {
      // 4. Denominator parenthesized: num / (expr2)
      const rawDen = match[8].trim();
      const hasNestedFracDen = rawDen.includes('\\frac') || /\b\d+\s*\/\s*\d+\b/.test(rawDen);
      parts.push(
        <Fraction
          key={`frac-den-paren-${match.index}-${match[7]}-${match[8]}`}
          num={match[7].trim()}
          den={hasNestedFracDen ? parseFractionsInText(rawDen, size) : rawDen}
          size={size}
        />
      );
    } else if (match[9] && match[10] && match[11]) {
      // 5. Mixed number: whole num/den
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
      // 6. Parenthesized single fraction with optional sign
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
      // 7. Sqrt in numerator: √3 / 2, √2 / 2, √a / 2
      parts.push(
        <Fraction
          key={`frac-sqrt-num-${match.index}-${match[15]}-${match[16]}`}
          num={match[15].trim()}
          den={match[16].trim()}
          size={size}
        />
      );
    } else if (match[17] && match[18]) {
      // 8. Sqrt in denominator: d / √2, 1 / √2, c / √2
      parts.push(
        <Fraction
          key={`frac-sqrt-den-${match.index}-${match[17]}-${match[18]}`}
          num={match[17].trim()}
          den={match[18].trim()}
          size={size}
        />
      );
    } else if (match[19] && match[20]) {
      // 9. Degree numerator: 90° / 2
      parts.push(
        <Fraction
          key={`frac-degree-${match.index}-${match[19]}-${match[20]}`}
          num={match[19].trim()}
          den={match[20].trim()}
          size={size}
        />
      );
    } else if (match[21] && match[22]) {
      // 10. Variable / Power / Subscript over number or variable: a² / 2, c² / 4, mc / 2, c / 2, a / b
      parts.push(
        <Fraction
          key={`frac-var-${match.index}-${match[21]}-${match[22]}`}
          num={match[21].trim()}
          den={match[22].trim()}
          size={size}
        />
      );
    } else if (match[23] && match[24]) {
      // 11. Simple numeric fraction with optional suffix
      parts.push(
        <React.Fragment key={`frac-simple-${match.index}-${match[23]}-${match[24]}`}>
          <Fraction
            num={match[23]}
            den={match[24]}
            size={size}
          />
          {match[25] && <span>{match[25]}</span>}
        </React.Fragment>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleanText.length) {
    parts.push(
      <React.Fragment key={`frac-tail-${lastIndex}`}>
        {parseSquareRootsInText(cleanText.substring(lastIndex), size)}
      </React.Fragment>
    );
  }

  return parts.length === 0 ? parseSquareRootsInText(cleanText, size) : <>{parts}</>;
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
    // Skip inputs, selects, svgs, fractions, sqrts to avoid interference
    if (
      type === 'input' ||
      type === 'select' ||
      type === 'textarea' ||
      type === 'option' ||
      type === 'svg' ||
      type === 'path' ||
      type === 'canvas' ||
      type === Fraction ||
      type === Sqrt ||
      (typeof type === 'function' && (type.name === 'Fraction' || type.name === 'MathText' || type.name === 'Sqrt'))
    ) {
      return node;
    }

    const props = node.props as { children?: React.ReactNode };
    if (props && props.children !== undefined) {
      return React.cloneElement(node, {
        ...props,
        children: parseFractionsInNode(props.children, size),
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
