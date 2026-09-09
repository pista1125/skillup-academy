import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Info,
  CheckCircle2,
  XCircle,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

// --- Theme Color Mappings ---
export type ThemeColor = 'blue' | 'indigo' | 'violet' | 'purple' | 'amber' | 'emerald' | 'teal' | 'rose' | 'cyan' | 'slate';

const colorStyles: Record<ThemeColor, {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  ruleBg: string;
  ruleBorder: string;
  ruleText: string;
  sectionBadge: string;
  buttonQuizBorder: string;
  buttonQuizBg: string;
  buttonQuizText: string;
  buttonQuizHover: string;
  buttonPdf: string;
  calloutGradient: string;
  calloutShadow: string;
}> = {
  blue: {
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    ruleBg: 'bg-blue-50 dark:bg-slate-800/80',
    ruleBorder: 'border-blue-200/60 dark:border-slate-700',
    ruleText: 'text-blue-700 dark:text-blue-300',
    sectionBadge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
    buttonQuizBorder: 'border-blue-300 dark:border-blue-800',
    buttonQuizBg: 'bg-blue-50/60 dark:bg-blue-950/40',
    buttonQuizText: 'text-blue-800 dark:text-blue-300',
    buttonQuizHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
    buttonPdf: 'bg-blue-600 hover:bg-blue-700 text-white',
    calloutGradient: 'from-blue-600 via-indigo-600 to-blue-700',
    calloutShadow: 'shadow-blue-500/20'
  },
  indigo: {
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    ruleBg: 'bg-indigo-50 dark:bg-slate-800/80',
    ruleBorder: 'border-indigo-200/60 dark:border-slate-700',
    ruleText: 'text-indigo-700 dark:text-indigo-300',
    sectionBadge: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300',
    buttonQuizBorder: 'border-indigo-300 dark:border-indigo-800',
    buttonQuizBg: 'bg-indigo-50/60 dark:bg-indigo-950/40',
    buttonQuizText: 'text-indigo-800 dark:text-indigo-300',
    buttonQuizHover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/50',
    buttonPdf: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    calloutGradient: 'from-indigo-600 via-purple-600 to-indigo-700',
    calloutShadow: 'shadow-indigo-500/20'
  },
  violet: {
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    ruleBg: 'bg-violet-50 dark:bg-slate-800/80',
    ruleBorder: 'border-violet-200/60 dark:border-slate-700',
    ruleText: 'text-violet-700 dark:text-violet-300',
    sectionBadge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300',
    buttonQuizBorder: 'border-violet-300 dark:border-violet-800',
    buttonQuizBg: 'bg-violet-50/60 dark:bg-violet-950/40',
    buttonQuizText: 'text-violet-800 dark:text-violet-300',
    buttonQuizHover: 'hover:bg-violet-100 dark:hover:bg-violet-900/50',
    buttonPdf: 'bg-violet-600 hover:bg-violet-700 text-white',
    calloutGradient: 'from-violet-600 via-purple-600 to-violet-700',
    calloutShadow: 'shadow-violet-500/20'
  },
  purple: {
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    ruleBg: 'bg-purple-50 dark:bg-slate-800/80',
    ruleBorder: 'border-purple-200/60 dark:border-slate-700',
    ruleText: 'text-purple-700 dark:text-purple-300',
    sectionBadge: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300',
    buttonQuizBorder: 'border-purple-300 dark:border-purple-800',
    buttonQuizBg: 'bg-purple-50/60 dark:bg-purple-950/40',
    buttonQuizText: 'text-purple-800 dark:text-purple-300',
    buttonQuizHover: 'hover:bg-purple-100 dark:hover:bg-purple-900/50',
    buttonPdf: 'bg-purple-600 hover:bg-purple-700 text-white',
    calloutGradient: 'from-purple-600 via-pink-600 to-purple-700',
    calloutShadow: 'shadow-purple-500/20'
  },
  amber: {
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    ruleBg: 'bg-amber-50 dark:bg-slate-800/80',
    ruleBorder: 'border-amber-200/60 dark:border-slate-700',
    ruleText: 'text-amber-700 dark:text-amber-300',
    sectionBadge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
    buttonQuizBorder: 'border-amber-300 dark:border-amber-800',
    buttonQuizBg: 'bg-amber-50/60 dark:bg-amber-950/40',
    buttonQuizText: 'text-amber-800 dark:text-amber-300',
    buttonQuizHover: 'hover:bg-amber-100 dark:hover:bg-amber-900/50',
    buttonPdf: 'bg-amber-600 hover:bg-amber-700 text-white',
    calloutGradient: 'from-amber-500 via-orange-600 to-amber-600',
    calloutShadow: 'shadow-amber-500/20'
  },
  emerald: {
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    ruleBg: 'bg-emerald-50 dark:bg-slate-800/80',
    ruleBorder: 'border-emerald-200/60 dark:border-slate-700',
    ruleText: 'text-emerald-700 dark:text-emerald-300',
    sectionBadge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    buttonQuizBorder: 'border-emerald-300 dark:border-emerald-800',
    buttonQuizBg: 'bg-emerald-50/60 dark:bg-emerald-950/40',
    buttonQuizText: 'text-emerald-800 dark:text-emerald-300',
    buttonQuizHover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
    buttonPdf: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    calloutGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    calloutShadow: 'shadow-emerald-500/20'
  },
  teal: {
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    ruleBg: 'bg-teal-50 dark:bg-slate-800/80',
    ruleBorder: 'border-teal-200/60 dark:border-slate-700',
    ruleText: 'text-teal-700 dark:text-teal-300',
    sectionBadge: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300',
    buttonQuizBorder: 'border-teal-300 dark:border-teal-800',
    buttonQuizBg: 'bg-teal-50/60 dark:bg-teal-950/40',
    buttonQuizText: 'text-teal-800 dark:text-teal-300',
    buttonQuizHover: 'hover:bg-teal-100 dark:hover:bg-teal-900/50',
    buttonPdf: 'bg-teal-600 hover:bg-teal-700 text-white',
    calloutGradient: 'from-teal-600 via-cyan-600 to-teal-700',
    calloutShadow: 'shadow-teal-500/20'
  },
  rose: {
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    ruleBg: 'bg-rose-50 dark:bg-slate-800/80',
    ruleBorder: 'border-rose-200/60 dark:border-slate-700',
    ruleText: 'text-rose-700 dark:text-rose-300',
    sectionBadge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300',
    buttonQuizBorder: 'border-rose-300 dark:border-rose-800',
    buttonQuizBg: 'bg-rose-50/60 dark:bg-rose-950/40',
    buttonQuizText: 'text-rose-800 dark:text-rose-300',
    buttonQuizHover: 'hover:bg-rose-100 dark:hover:bg-rose-900/50',
    buttonPdf: 'bg-rose-600 hover:bg-rose-700 text-white',
    calloutGradient: 'from-rose-600 via-pink-600 to-rose-700',
    calloutShadow: 'shadow-rose-500/20'
  },
  cyan: {
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    ruleBg: 'bg-cyan-50 dark:bg-slate-800/80',
    ruleBorder: 'border-cyan-200/60 dark:border-slate-700',
    ruleText: 'text-cyan-700 dark:text-cyan-300',
    sectionBadge: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300',
    buttonQuizBorder: 'border-cyan-300 dark:border-cyan-800',
    buttonQuizBg: 'bg-cyan-50/60 dark:bg-cyan-950/40',
    buttonQuizText: 'text-cyan-800 dark:text-cyan-300',
    buttonQuizHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-900/50',
    buttonPdf: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    calloutGradient: 'from-cyan-600 via-blue-600 to-cyan-700',
    calloutShadow: 'shadow-cyan-500/20'
  },
  slate: {
    badgeBg: 'bg-slate-200 dark:bg-slate-800',
    badgeBorder: 'border-slate-300 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    ruleBg: 'bg-slate-100 dark:bg-slate-800/80',
    ruleBorder: 'border-slate-200 dark:border-slate-700',
    ruleText: 'text-slate-800 dark:text-slate-200',
    sectionBadge: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    buttonQuizBorder: 'border-slate-300 dark:border-slate-700',
    buttonQuizBg: 'bg-slate-100 dark:bg-slate-800',
    buttonQuizText: 'text-slate-800 dark:text-slate-200',
    buttonQuizHover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
    buttonPdf: 'bg-slate-900 hover:bg-slate-800 text-white',
    calloutGradient: 'from-slate-800 via-slate-900 to-slate-800',
    calloutShadow: 'shadow-slate-500/20'
  }
};

// --- TheorySection Component ---
export interface TheorySectionProps {
  number: number | string;
  title: string;
  icon?: React.ReactNode;
  badgeColor?: ThemeColor;
  children: React.ReactNode;
  className?: string;
}

export const TheorySection: React.FC<TheorySectionProps> = ({
  number,
  title,
  icon,
  badgeColor = 'blue',
  children,
  className
}) => {
  const styles = colorStyles[badgeColor] || colorStyles.blue;
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2.5">
        <span className={cn(
          "flex items-center justify-center w-7 h-7 rounded-lg font-bold text-sm shrink-0",
          styles.sectionBadge
        )}>
          {number}.
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </h2>
      </div>
      {children}
    </section>
  );
};

// --- TheoryCard Component ---
export interface TheoryCardProps {
  title?: string;
  icon?: React.ReactNode;
  badge?: string;
  variant?: 'default' | 'emerald' | 'amber' | 'blue' | 'indigo' | 'rose' | 'purple' | 'cyan';
  children: React.ReactNode;
  className?: string;
}

export const TheoryCard: React.FC<TheoryCardProps> = ({
  title,
  icon,
  badge,
  variant = 'default',
  children,
  className
}) => {
  const variantStyles: Record<string, string> = {
    default: 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50',
    emerald: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20',
    amber: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20',
    blue: 'border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20',
    indigo: 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20',
    rose: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20',
    purple: 'border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20',
    cyan: 'border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/40 dark:bg-cyan-950/20',
  };

  return (
    <Card className={cn("rounded-2xl shadow-none", variantStyles[variant], className)}>
      <CardContent className="p-4 space-y-2.5">
        {(title || icon || badge) && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              {icon}
              {title && <span>{title}</span>}
            </div>
            {badge && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                {badge}
              </span>
            )}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

// --- TheoryCallout Component ---
export interface TheoryCalloutProps {
  icon?: React.ReactNode;
  title?: string;
  variant?: 'info' | 'tip' | 'warning' | 'success';
  children: React.ReactNode;
  className?: string;
}

export const TheoryCallout: React.FC<TheoryCalloutProps> = ({
  icon,
  title,
  variant = 'tip',
  children,
  className
}) => {
  const calloutConfig = {
    info: {
      bg: 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60',
      iconBox: 'bg-blue-600 text-white',
      titleColor: 'text-blue-900 dark:text-blue-200',
      defaultIcon: <Info className="w-4 h-4" />
    },
    tip: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60',
      iconBox: 'bg-amber-600 text-white',
      titleColor: 'text-amber-900 dark:text-amber-200',
      defaultIcon: <Lightbulb className="w-4 h-4" />
    },
    warning: {
      bg: 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60',
      iconBox: 'bg-rose-600 text-white',
      titleColor: 'text-rose-900 dark:text-rose-200',
      defaultIcon: <AlertTriangle className="w-4 h-4" />
    },
    success: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60',
      iconBox: 'bg-emerald-600 text-white',
      titleColor: 'text-emerald-900 dark:text-emerald-200',
      defaultIcon: <CheckCircle2 className="w-4 h-4" />
    }
  };

  const current = calloutConfig[variant];

  return (
    <div className={cn("p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3", current.bg, className)}>
      <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold", current.iconBox)}>
        {icon || current.defaultIcon}
      </div>
      <div className="space-y-1">
        {title && <div className={cn("font-bold", current.titleColor)}>{title}</div>}
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// --- TheoryTrapBox Component ---
export interface TheoryTrapBoxProps {
  title: string;
  wrong: string | React.ReactNode;
  correct: string | React.ReactNode;
  explanation?: string | React.ReactNode;
}

export const TheoryTrapBox: React.FC<TheoryTrapBoxProps> = ({
  title,
  wrong,
  correct,
  explanation
}) => {
  return (
    <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>{title}</span>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
        <div className="flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span><strong className="text-rose-600">Hibás:</strong> {wrong}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span><strong className="text-emerald-600">Helyes:</strong> {correct}</span>
        </div>
        {explanation && (
          <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 pl-5">
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

// --- TheoryTable Component ---
export interface TheoryTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export const TheoryTable: React.FC<TheoryTableProps> = ({
  headers,
  rows,
  className
}) => {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-xs text-left border-collapse rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main TheoryTemplate Component ---
export interface TheoryTemplateProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  documentId: string;
  pdfFilename: string;
  badgeText: string;
  title: string;
  subtitle: string;
  quickRule?: {
    label: string;
    formula: string;
  };
  themeColor?: ThemeColor;
  practiceTitle?: string;
  practiceSubtitle?: string;
  children: React.ReactNode;
}

export const TheoryTemplate: React.FC<TheoryTemplateProps> = ({
  onBack,
  onStartQuiz,
  documentId,
  pdfFilename,
  badgeText,
  title,
  subtitle,
  quickRule,
  themeColor = 'blue',
  practiceTitle = 'Készen állsz a gyakorlásra?',
  practiceSubtitle = 'Tedd próbára tudásod a 3 szintű kvízben 30 változatos feladattal és azonnali magyarázatokkal!',
  children
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const styles = colorStyles[themeColor] || colorStyles.blue;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF(documentId, pdfFilename);
    setIsDownloading(false);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
      {/* Top Header Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-pdf">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {onStartQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartQuiz}
              className={cn(
                "rounded-xl h-9 px-3 text-xs sm:text-sm font-bold transition-all",
                styles.buttonQuizBorder,
                styles.buttonQuizBg,
                styles.buttonQuizText,
                styles.buttonQuizHover
              )}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={cn(
              "rounded-xl h-9 px-3.5 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-all",
              styles.buttonPdf
            )}
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Document Container */}
      <div
        id={documentId}
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border",
              styles.badgeBg,
              styles.badgeBorder,
              styles.badgeText
            )}>
              <span>{badgeText}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          </div>

          {quickRule && (
            <div className={cn(
              "p-3 rounded-2xl border text-center shrink-0",
              styles.ruleBg,
              styles.ruleBorder
            )}>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {quickRule.label}
              </div>
              <div className={cn(
                "text-base sm:text-lg font-mono font-black",
                styles.ruleText
              )}>
                {quickRule.formula}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Sections Content */}
        {children}

        {/* Practice Callout Banner */}
        <div className={cn(
          "p-6 rounded-2xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg bg-gradient-to-r",
          styles.calloutGradient,
          styles.calloutShadow
        )}>
          <div>
            <h3 className="text-lg font-black">{practiceTitle}</h3>
            <p className="text-xs sm:text-sm opacity-90 mt-0.5">
              {practiceSubtitle}
            </p>
          </div>
          {onStartQuiz && (
            <Button
              onClick={onStartQuiz}
              className="bg-white text-slate-900 hover:bg-slate-100 font-black rounded-xl h-10 px-5 shadow-sm text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
              Kvíz indítása
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
