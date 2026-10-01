import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Escapes common HTML special characters for safe string interpolation.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitizes LaTeX strings: fixes line endings, normalizes whitespace,
 * and fixes double-escaped backslashes (e.g. \\tfrac -> \tfrac).
 */
export function sanitizeLatex(tex: string): string {
  if (!tex) return '';
  return tex
    .replace(/\u000c/g, '\\f')
    .replace(/\r\n/g, ' ')
    .replace(/[\r\n]/g, ' ')
    // Fix double-escaped backslashes before LaTeX commands or symbols
    .replace(/\\\\([a-zA-Z,;:!{}()])/g, (_, p1) => '\\' + p1);
}

const LATEX_COMMAND_REGEX = /\\(frac|tfrac|dfrac|sqrt|cdot|times|pm|approx|le|ge|ne|alpha|beta|gamma|delta|pi|omega|circ|text|in|left|right|choose|binom)\b/;

/**
 * Checks whether a given string contains math expressions ($...$, $$...$$, or raw LaTeX).
 */
export function hasMath(text: any): boolean {
  if (text === null || text === undefined) return false;
  const str = String(text);
  return str.includes('$') || LATEX_COMMAND_REGEX.test(str);
}

/**
 * Parses and converts LaTeX formulas ($...$, $$...$$, or raw LaTeX commands)
 * into formatted KaTeX HTML strings.
 */
export function renderMathHtml(text: any): string {
  if (text === null || text === undefined) return '';
  const str = String(text);
  if (!str.trim()) return '';

  // 1. Explicit $...$ or $$...$$ syntax
  if (str.includes('$')) {
    const regex = /(\$\$[^\$]+\$\$|\$[^\$]+\$)/g;
    const parts = str.split(regex);
    return parts.map(part => {
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
        const math = sanitizeLatex(part.slice(2, -2).trim());
        try {
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: true
          });
        } catch {
          return escapeHtml(part);
        }
      }
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const math = sanitizeLatex(part.slice(1, -1).trim());
        try {
          return katex.renderToString(math, {
            throwOnError: false,
            displayMode: false
          });
        } catch {
          return escapeHtml(part);
        }
      }
      return escapeHtml(part);
    }).join('');
  }

  // 2. Contains explicit LaTeX commands without $ delimiters
  if (LATEX_COMMAND_REGEX.test(str)) {
    try {
      return katex.renderToString(sanitizeLatex(str.trim()), {
        throwOnError: false,
        displayMode: false
      });
    } catch {
      return escapeHtml(str);
    }
  }

  // 3. Normal plain text
  return escapeHtml(str);
}

interface MathViewProps {
  text: any;
  className?: string;
  inline?: boolean;
}

/**
 * React component for rendering text that may contain LaTeX math formulas ($...$ or raw TeX).
 */
export const MathView: React.FC<MathViewProps> = ({ text, className = '', inline = false }) => {
  if (text === null || text === undefined) return null;

  const str = String(text);
  if (!hasMath(str)) {
    return <span className={className}>{str}</span>;
  }

  const html = renderMathHtml(str);
  return (
    <span
      className={`math-rendered-view ${inline ? 'inline-flex items-center' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathView;
