import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Download,
    Eye,
    Sparkles,
    Loader2,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Trophy,
    Sigma,
    GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { invokeAiFunction } from '@/lib/aiService';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { toast } from 'sonner';

interface TotoQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    randomLetters: string[];
}

interface TotoToolProps {
    onBack: () => void;
}

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 15;

const HUNGARIAN_ALPHABET = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ'.split('');

export const sanitizeLatex = (tex: string) => {
    if (!tex) return '';
    return tex
        .replace(/\u000c/g, '\\f')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ');
};

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Parses and renders LaTeX formulas ($...$) and raw math expressions (powers, fractions, products) into KaTeX HTML.
 */
export function renderMathHtml(text: string): string {
    if (!text) return '';

    // 1. Explicit $...$ syntax
    if (text.includes('$')) {
        const parts = text.split(/(\$[^\$]+\$)/g);
        return parts.map(part => {
            if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
                const mathExp = part.slice(1, -1);
                try {
                    return katex.renderToString(sanitizeLatex(mathExp), {
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

    // 2. Contains explicit LaTeX commands like \frac, \sqrt, \cdot, \times, \pm, etc.
    if (/\\(frac|sqrt|cdot|times|pm|approx|le|ge|ne|alpha|beta|pi|circ|text)/.test(text)) {
        try {
            return katex.renderToString(sanitizeLatex(text), {
                throwOnError: false,
                displayMode: false
            });
        } catch {
            return escapeHtml(text);
        }
    }

    // 3. Raw math expressions with caret (^) or multiplication (*)
    if (/\^|\b[0-9a-zA-Z_]+\^[0-9a-zA-Z_]+|\([^)]+\)\^[0-9a-zA-Z_]+/.test(text)) {
        const isPureMath = !text.includes(' ') || /^[\d\w\s\+\-\*\/\^\(\)\=\.\,\:\<\>\\\{\}]+$/.test(text);
        if (isPureMath) {
            const converted = text
                .replace(/(\([^)]+\)|[a-zA-Z0-9]+)\^([a-zA-Z0-9]+|\([^)]+\))/g, '$1^{$2}')
                .replace(/\s*\*\s*/g, ' \\cdot ');
            try {
                return katex.renderToString(sanitizeLatex(converted), {
                    throwOnError: false,
                    displayMode: false
                });
            } catch {
                return escapeHtml(text);
            }
        } else {
            // Mixed text with math formulas (e.g. "Mennyi az 5^2 * 5^3 eredménye?")
            const mathTokenRegex = /(\(?\w+\)?\^\w+(?:\s*[\*·\+\-\/]\s*\(?\w+\)?\^\w+)*)/g;
            return text.replace(mathTokenRegex, (match) => {
                const converted = match
                    .replace(/(\([^)]+\)|[a-zA-Z0-9]+)\^([a-zA-Z0-9]+|\([^)]+\))/g, '$1^{$2}')
                    .replace(/\s*\*\s*/g, ' \\cdot ');
                try {
                    return katex.renderToString(sanitizeLatex(converted), {
                        throwOnError: false,
                        displayMode: false
                    });
                } catch {
                    return match;
                }
            });
        }
    }

    return escapeHtml(text);
}

export const TotoMathView = ({ text, className }: { text: string; className?: string }) => {
    const html = renderMathHtml(text);
    return <span className={cn("inline-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
};

const MATH_SHORTCUTS = [
    { label: 'x²', snippet: '^2', desc: 'Négyzetre emelés' },
    { label: 'xʸ', snippet: '^{}', desc: 'Tetszőleges hatvány' },
    { label: '·', snippet: ' \\cdot ', desc: 'Szorzásjel' },
    { label: 'a/b', snippet: '\\frac{}{}', desc: 'Tört alak' },
    { label: '√x', snippet: '\\sqrt{}', desc: 'Négyzetgyök' },
    { label: '( )²', snippet: '()^2', desc: 'Zárójeles hatvány' },
    { label: '±', snippet: '\\pm', desc: 'Plusz-mínusz' },
    { label: '°', snippet: '^\\circ', desc: 'Fokjel' },
    { label: '$x$', snippet: '$x$', desc: 'Matematikai változó' }
];

export function TotoTool({ onBack }: TotoToolProps) {
    const { user, loading: authLoading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [questions, setQuestions] = useState<TotoQuestion[]>([
        { 
            id: 1, 
            question: 'Mennyi a(z) $5^2 \\cdot 5^3$ művelet eredménye?', 
            options: ['$5^5$', '$5^6$', '$5^7$'], 
            correctAnswerIndex: 0, 
            randomLetters: ['A', 'B', 'C'] 
        },
        { 
            id: 2, 
            question: 'Mennyi a(z) $(3^4)^2$ kifejezés hatványalakban?', 
            options: ['$3^6$', '$3^8$', '$3^{16}$'], 
            correctAnswerIndex: 1, 
            randomLetters: ['D', 'E', 'F'] 
        }
    ]);
    const [title, setTitle] = useState('Hatványozás Totó Kvíz');
    const [solutionWord, setSolutionWord] = useState('');
    const [isTopToBottom, setIsTopToBottom] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [nextId, setNextId] = useState(3);

    const [aiTopic, setAiTopic] = useState('');
    const [aiQuestionCount, setAiQuestionCount] = useState(13);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [aiSuccess, setAiSuccess] = useState(false);

    const [groupCount, setGroupCount] = useState(2);
    const [isExporting, setIsExporting] = useState(false);

    // Track active target for quick math symbol insertion
    const [activeTarget, setActiveTarget] = useState<{ qId: number; field: 'question' | number } | null>(null);

    // Drag & Drop reordering state
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isDraggingVisually, setIsDraggingVisually] = useState(false);

    const moveQuestion = (fromIdx: number, toIdx: number) => {
        if (toIdx < 0 || toIdx >= questions.length || fromIdx === toIdx) return;
        const newQuestions = [...questions];
        const [item] = newQuestions.splice(fromIdx, 1);
        newQuestions.splice(toIdx, 0, item);
        setQuestions(newQuestions);
    };

    const generateRandomLetter = () => {
        return HUNGARIAN_ALPHABET[Math.floor(Math.random() * HUNGARIAN_ALPHABET.length)];
    };

    const shuffleOptions = (options: string[], incomingCorrectIndex: number) => {
        const indexedOptions = options.map((opt, i) => ({ opt, isCorrect: i === incomingCorrectIndex }));
        const shuffled = [...indexedOptions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newOptions = shuffled.map(o => o.opt);
        const newCorrectIndex = shuffled.findIndex(o => o.isCorrect);
        return { shuffled: newOptions, newCorrectIndex };
    };

    const updateNoiseLetters = (qs: TotoQuestion[]) => {
        return qs.map(q => ({
            ...q,
            randomLetters: q.randomLetters.map(() => generateRandomLetter())
        }));
    };

    const addQuestion = () => {
        if (questions.length >= MAX_QUESTIONS) return;
        setQuestions([...questions, { 
            id: nextId, 
            question: '', 
            options: ['', '', ''], 
            correctAnswerIndex: 0, 
            randomLetters: [generateRandomLetter(), generateRandomLetter(), generateRandomLetter()] 
        }]);
        setNextId(nextId + 1);
    };

    const removeQuestion = (id: number) => {
        if (questions.length <= MIN_QUESTIONS) return;
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestionField = (id: number, field: keyof TotoQuestion, value: any) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: number, oIdx: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...q.options];
                newOptions[oIdx] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const insertMathSnippet = (snippet: string) => {
        if (!activeTarget) {
            if (questions.length > 0) {
                const q = questions[0];
                updateQuestionField(q.id, 'question', (q.question || '') + snippet);
                toast.info(`Beszúrva az 1. kérdésbe: ${snippet}`);
            }
            return;
        }

        const q = questions.find(item => item.id === activeTarget.qId);
        if (!q) return;

        if (activeTarget.field === 'question') {
            updateQuestionField(q.id, 'question', (q.question || '') + snippet);
        } else {
            const currentVal = q.options[activeTarget.field] || '';
            updateOption(q.id, activeTarget.field, currentVal + snippet);
        }
    };

    const generateWithAI = async () => {
        if (!aiTopic.trim()) {
            setAiError('Kérlek add meg a témakört!');
            return;
        }

        setAiLoading(true);
        setAiError('');
        setAiSuccess(false);

        try {
            const { data, error } = await invokeAiFunction('generate-toto', {
                topic: aiTopic.trim(), 
                questionCount: aiQuestionCount
            });

            if (error) throw new Error(error.message || 'Hiba az AI hívás során');
            if (!data.questions) throw new Error('Érvénytelen válasz az AI-tól');

            const newQuestions: TotoQuestion[] = data.questions.map((q: any, idx: number) => {
                const { shuffled, newCorrectIndex } = shuffleOptions(q.options, q.correctAnswerIndex);
                return {
                    id: nextId + idx,
                    question: q.question,
                    options: shuffled,
                    correctAnswerIndex: newCorrectIndex,
                    randomLetters: [generateRandomLetter(), generateRandomLetter(), generateRandomLetter()]
                };
            });

            setQuestions(newQuestions);
            setNextId(nextId + newQuestions.length);
            if (data.title) setTitle(data.title);
            setAiSuccess(true);
            setTimeout(() => setAiSuccess(false), 3000);
        } catch (err: any) {
            setAiError(err.message || 'Ismeretlen hiba történt');
        } finally {
            setAiLoading(false);
        }
    };

    const getOptionSymbol = (idx: number) => {
        if (idx === 0) return '1';
        if (idx === 1) return '2';
        return 'X';
    };

    const getSolutionChar = (qIdx: number) => {
        if (!solutionWord) {
            const q = questions[qIdx];
            return q ? getOptionSymbol(q.correctAnswerIndex) : '';
        }
        const cleanWord = solutionWord.replace(/\s+/g, '').toUpperCase();
        if (isTopToBottom) {
            return cleanWord[qIdx] || '';
        } else {
            const reversedIdx = cleanWord.length - 1 - qIdx;
            return cleanWord[reversedIdx] || '';
        }
    };

    const isValid = questions.every(q => q.question.trim() && q.options.every(o => o.trim()));
    const solutionWordMatch = !solutionWord || solutionWord.replace(/\s+/g, '').length === questions.length;

    /**
     * Builds the high-resolution HTML template for a PDF page (without footer / alléc).
     */
    const buildPdfPageHtml = (isSolution: boolean) => {
        const questionsPerCell = Math.ceil(questions.length / groupCount);
        const colCount = groupCount <= 2 ? groupCount : 2;
        const rowCount = groupCount > 2 ? 2 : 1;

        let questionGridHtml = '';

        if (rowCount === 1) {
            questionGridHtml = `
                <div style="display: grid; grid-template-columns: repeat(${colCount}, 1fr); gap: 20px; position: relative;">
                    ${Array.from({ length: colCount }).map((_, c) => {
                        const qStart = c * questionsPerCell;
                        const qEnd = Math.min(qStart + questionsPerCell, questions.length);
                        const cellQs = questions.slice(qStart, qEnd);

                        return `
                            <div style="position: relative; padding-right: 6px;">
                                ${cellQs.map((q, idxInCell) => {
                                    const globalIdx = qStart + idxInCell;
                                    return `
                                        <div style="font-size: 10px; line-height: 1.35; margin-bottom: 5px; color: #1e293b; display: flex; align-items: baseline;">
                                            <span style="font-weight: 800; color: #d97706; margin-right: 5px; flex-shrink: 0;">${globalIdx + 1}.</span>
                                            <span style="font-weight: 500;">${renderMathHtml(q.question)}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `;
                    }).join('')}
                    ${colCount > 1 ? `
                        <div style="position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1.5px dashed #cbd5e1; transform: translateX(-50%);">
                            <span style="position: absolute; top: -8px; left: -5px; font-size: 11px; color: #94a3b8;">✂</span>
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            // 2x2 grid for 4 groups
            questionGridHtml = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; position: relative;">
                    ${Array.from({ length: 4 }).map((_, cellIdx) => {
                        const qStart = cellIdx * questionsPerCell;
                        const qEnd = Math.min(qStart + questionsPerCell, questions.length);
                        const cellQs = questions.slice(qStart, qEnd);
                        if (cellQs.length === 0) return '<div></div>';

                        return `
                            <div style="padding: 4px;">
                                ${cellQs.map((q, idxInCell) => {
                                    const globalIdx = qStart + idxInCell;
                                    return `
                                        <div style="font-size: 9.5px; line-height: 1.3; margin-bottom: 4px; color: #1e293b; display: flex; align-items: baseline;">
                                            <span style="font-weight: 800; color: #d97706; margin-right: 4px; flex-shrink: 0;">${globalIdx + 1}.</span>
                                            <span style="font-weight: 500;">${renderMathHtml(q.question)}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `;
                    }).join('')}
                    <div style="position: absolute; left: 50%; top: 0; bottom: 0; border-left: 1.5px dashed #cbd5e1; transform: translateX(-50%);">
                        <span style="position: absolute; top: -8px; left: -5px; font-size: 11px; color: #94a3b8;">✂</span>
                    </div>
                    <div style="position: absolute; top: 50%; left: 0; right: 0; border-top: 1.5px dashed #cbd5e1; transform: translateY(-50%);">
                        <span style="position: absolute; left: -8px; top: -7px; font-size: 11px; color: #94a3b8;">✂</span>
                    </div>
                </div>
            `;
        }

        const tableRowsHtml = questions.map((q, qIdx) => {
            const solChar = getSolutionChar(qIdx);

            const optionsCells = q.options.map((opt, oIdx) => {
                const isCorrect = q.correctAnswerIndex === oIdx;
                const letter = solutionWord ? (isCorrect ? solChar : q.randomLetters[oIdx]) : '';
                const isHighlighted = isSolution && isCorrect;

                return `
                    <div style="
                        position: relative; 
                        border: 1px solid #cbd5e1; 
                        padding: 3px 14px 3px 6px; 
                        font-size: 9px; 
                        min-height: 24px; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        text-align: center;
                        ${isHighlighted ? 'background: #f0fdf4; border: 2px solid #22c55e; font-weight: 700; color: #15803d;' : 'background: #ffffff; color: #334155;'}
                    ">
                        <div style="width: 100%;">${renderMathHtml(opt)}</div>
                        ${letter ? `
                            <span style="position: absolute; right: 2px; bottom: 1px; font-size: 7px; font-weight: 800; color: ${isHighlighted ? '#16a34a' : '#94a3b8'};">
                                ${letter}
                            </span>
                        ` : ''}
                    </div>
                `;
            }).join('');

            return `
                <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; margin-top: -1px;">
                    <div style="
                        font-size: 9.5px; 
                        font-weight: 800; 
                        color: #334155; 
                        text-align: center; 
                        background: #f8fafc; 
                        border: 1px solid #cbd5e1; 
                        padding: 3px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        ${qIdx + 1}.
                    </div>
                    ${optionsCells}
                </div>
            `;
        }).join('');

        const solBoxesHtml = questions.map((_, i) => {
            const char = isSolution ? getSolutionChar(i) : '';
            return `
                <div style="flex: 1; min-width: 14px;">
                    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-bottom: none; font-size: 7.5px; font-weight: 700; text-align: center; padding: 1px 0; color: #64748b;">
                        ${i + 1}
                    </div>
                    <div style="background: #ffffff; border: 1px solid #cbd5e1; height: 19px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: ${solutionWord ? '#d97706' : '#334155'};">
                        ${char}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div style="
                width: 800px; 
                min-height: 1130px; 
                background: #ffffff; 
                padding: 28px 36px 20px 36px; 
                box-sizing: border-box; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                color: #0f172a;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 12px;
            ">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 4px;">
                    <h1 style="color: #d97706; font-size: 20px; font-weight: 900; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${escapeHtml(title)}
                    </h1>
                    <p style="color: #64748b; font-size: 9.5px; margin: 0 0 4px 0; font-weight: 500;">
                        Válaszd ki a helyes megoldást a három lehetőség közül!
                    </p>
                    ${isSolution ? `
                        <div style="display: inline-block; color: #dc2626; font-weight: 800; font-size: 10.5px; letter-spacing: 1px; background: #fef2f2; border: 1px solid #fecaca; padding: 2px 14px; border-radius: 9999px; margin-top: 2px;">
                            MEGOLDÓKULCS
                        </div>
                    ` : ''}
                </div>

                <!-- Questions Section -->
                <div>
                    <div style="font-size: 10.5px; font-weight: 800; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px;">
                        Kérdések
                    </div>
                    ${questionGridHtml}
                </div>

                <!-- Totó Table -->
                <div>
                    <div style="font-size: 10.5px; font-weight: 800; color: #334155; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 2px;">
                        Válaszok (Totó táblázat)
                    </div>
                    
                    <!-- Table Header -->
                    <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; background: #f1f5f9; border: 1.5px solid #cbd5e1; font-weight: 800; font-size: 9px; text-align: center; color: #475569;">
                        <div style="padding: 4px; border-right: 1px solid #cbd5e1;">Sorszám</div>
                        <div style="padding: 4px; border-right: 1px solid #cbd5e1;">1</div>
                        <div style="padding: 4px; border-right: 1px solid #cbd5e1;">2</div>
                        <div style="padding: 4px;">X (3)</div>
                    </div>

                    <!-- Rows -->
                    ${tableRowsHtml}
                </div>

                <!-- Solution Strip -->
                <div style="margin-top: 4px;">
                    <div style="margin-bottom: 4px;">
                        <span style="font-size: 9.5px; font-weight: 800; color: #334155; text-transform: uppercase;">
                            Megoldás sáv (Betűk a sarkokból)
                        </span>
                    </div>
                    <div style="display: flex; gap: 2px; width: 100%;">
                        ${solBoxesHtml}
                    </div>
                </div>
            </div>
        `;
    };

    const downloadPDF = async () => {
        if (!isValid) return;
        if (!solutionWordMatch) {
            setAiError(`A megfejtés hossza (${solutionWord.replace(/\s+/g, '').length}) nem egyezik a kérdések számával (${questions.length})!`);
            return;
        }

        setIsExporting(true);
        const toastId = toast.loading('PDF dokumentum generálása nyomdai minőségben...');

        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        document.body.appendChild(tempContainer);

        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pageW = 210;
            const pageH = 297;

            // --- Page 1: Feladatlap ---
            tempContainer.innerHTML = buildPdfPageHtml(false);
            const page1El = tempContainer.firstElementChild as HTMLElement;

            const canvas1 = await toPng(page1El, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                cacheBust: true
            });

            doc.addImage(canvas1, 'PNG', 0, 0, pageW, pageH);

            // --- Page 2: Megoldókulcs ---
            tempContainer.innerHTML = buildPdfPageHtml(true);
            const page2El = tempContainer.firstElementChild as HTMLElement;

            const canvas2 = await toPng(page2El, {
                pixelRatio: 2,
                backgroundColor: '#ffffff',
                cacheBust: true
            });

            doc.addPage();
            doc.addImage(canvas2, 'PNG', 0, 0, pageW, pageH);

            const safeFilename = title.replace(/[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_').toLowerCase();
            doc.save(`${safeFilename}_toto.pdf`);
            toast.success('PDF sikeresen letöltve!', { id: toastId });
        } catch (err: any) {
            console.error('PDF generálási hiba:', err);
            toast.error('Hiba a PDF generálása során', { id: toastId });
            setAiError('Hiba a PDF generálása során: ' + (err.message || ''));
        } finally {
            if (document.body.contains(tempContainer)) {
                document.body.removeChild(tempContainer);
            }
            setIsExporting(false);
        }
    };

    if (authLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-3 w-full">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            
            {/* Sleek Compact Header Bar */}
            <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-xs">
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onBack} 
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8 px-2.5 text-xs font-semibold rounded-xl border border-slate-200"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1 text-amber-600" /> Vissza
                    </Button>
                    <div className="h-4 w-[1px] bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-base font-black text-slate-800 leading-tight">Totó Készítő</h2>
                            <p className="text-[11px] text-slate-500 hidden sm:block">13+1 kvíz szerkesztő és PDF export</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs font-bold border-slate-200" 
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" /> {showPreview ? 'Szerkesztés' : 'Megoldókulcs'}
                    </Button>
                    <Button 
                        size="sm" 
                        className="h-8 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs" 
                        onClick={downloadPDF} 
                        disabled={!isValid || isExporting}
                    >
                        {isExporting ? <Loader2 className="animate-spin w-3.5 h-3.5 mr-1" /> : <Download className="w-3.5 h-3.5 mr-1" />} PDF Letöltés
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 w-full">
                {/* Left: Editor (Narrowed by 40% -> 5 cols) */}
                <div className="lg:col-span-5 xl:col-span-5 space-y-3">
                    {/* Compact AI Panel */}
                    <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-1.5">
                            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Generálás
                            </h3>
                            {!user && <span className="text-[10px] text-amber-400 font-medium">🔒 Bejelentkezés szükséges</span>}
                        </div>
                        <div className="flex gap-2 items-center">
                            <input 
                                type="text" 
                                placeholder="Témakör (pl. 7. osztályos hatványozás azonosságai)" 
                                value={aiTopic} 
                                onChange={e => setAiTopic(e.target.value)}
                                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs placeholder:text-slate-500 outline-none focus:border-amber-500 transition-all"
                            />
                            <div className="w-14 shrink-0">
                                <input 
                                    type="number" 
                                    value={aiQuestionCount} 
                                    onChange={e => setAiQuestionCount(Number(e.target.value))} 
                                    title="Kérdések száma"
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs text-center font-bold outline-none focus:border-amber-500" 
                                />
                            </div>
                            <Button 
                                onClick={() => user ? generateWithAI() : setIsAuthModalOpen(true)} 
                                disabled={aiLoading} 
                                size="sm"
                                className="h-8 px-3 bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-xs shrink-0"
                            >
                                {aiLoading ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />} Generálás
                            </Button>
                        </div>
                    </div>

                    {/* Compact Basic Info & Settings */}
                    <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs space-y-2.5">
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                            <input 
                                type="text" 
                                placeholder="Totó címe" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)}
                                className="w-full sm:flex-1 text-sm font-bold bg-slate-50/70 border border-slate-200/80 rounded-lg px-3 py-1.5 focus:border-amber-500 outline-none"
                            />
                            {/* PDF Groups Selector */}
                            <div className="flex items-center gap-1 shrink-0 bg-slate-100/70 p-1 rounded-lg border border-slate-200/60">
                                <span className="text-[10px] font-bold text-slate-500 px-1.5">PDF oszlopok:</span>
                                {[1, 2, 3, 4].map(num => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setGroupCount(num)}
                                        className={cn(
                                            "w-6 h-6 text-xs font-bold rounded flex items-center justify-center transition-all",
                                            groupCount === num ? "bg-amber-500 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"
                                        )}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Secret Word & Direction */}
                        <div className="flex flex-col sm:flex-row gap-2 items-center pt-2 border-t border-slate-100">
                            <div className="flex-1 w-full flex items-center gap-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Megfejtés:</label>
                                <input 
                                    type="text" 
                                    placeholder="pl. VAKÁCIÓ" 
                                    value={solutionWord} 
                                    onChange={e => setSolutionWord(e.target.value.toUpperCase())}
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <Button 
                                    variant={isTopToBottom ? 'default' : 'outline'} 
                                    size="sm" 
                                    onClick={() => setIsTopToBottom(true)}
                                    className={cn("text-[10px] h-7 px-2.5", isTopToBottom ? "bg-amber-500 hover:bg-amber-600" : "border-slate-200")}
                                >
                                    <ChevronDown className="w-3 h-3 mr-1" /> Fentről le
                                </Button>
                                <Button 
                                    variant={!isTopToBottom ? 'default' : 'outline'} 
                                    size="sm" 
                                    onClick={() => setIsTopToBottom(false)}
                                    className={cn("text-[10px] h-7 px-2.5", !isTopToBottom ? "bg-amber-500 hover:bg-amber-600" : "border-slate-200")}
                                >
                                    <ChevronUp className="w-3 h-3 mr-1" /> Lentről fel
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Compact Math Quick Toolbar */}
                    <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/60 shadow-2xs flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1 shrink-0">
                            <Sigma className="w-3.5 h-3.5 text-amber-600" /> Képlet:
                        </span>
                        <div className="flex flex-wrap gap-1">
                            {MATH_SHORTCUTS.map(sc => (
                                <button
                                    key={sc.label}
                                    type="button"
                                    onClick={() => insertMathSnippet(sc.snippet)}
                                    title={sc.desc}
                                    className="px-2 py-0.5 bg-white hover:bg-amber-100 border border-amber-300/80 rounded text-[11px] font-semibold text-amber-950 transition-colors shadow-2xs active:scale-95"
                                >
                                    {sc.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                                Kérdések ({questions.length})
                            </h3>
                            <Button 
                                size="sm" 
                                onClick={addQuestion} 
                                className="bg-amber-500 hover:bg-amber-600 text-white text-[11px] h-7 font-bold px-2.5"
                            >
                                <Plus className="w-3 h-3 mr-1" /> Új kérdés
                            </Button>
                        </div>
                        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                            {questions.map((q, qIdx) => {
                                const hasQuestionMath = /[\$\^\\\*]/.test(q.question);

                                return (
                                    <div 
                                        key={q.id}
                                        draggable={true}
                                        onDragStart={(e) => {
                                            setDraggedIndex(qIdx);
                                            e.dataTransfer.effectAllowed = 'move';
                                            setTimeout(() => setIsDraggingVisually(true), 0);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            if (draggedIndex === null || draggedIndex === qIdx) return;

                                            const targetRect = e.currentTarget.getBoundingClientRect();
                                            const targetMiddle = targetRect.top + targetRect.height / 2;
                                            const isDraggingDown = draggedIndex < qIdx;

                                            if (isDraggingDown && e.clientY < targetMiddle) return;
                                            if (!isDraggingDown && e.clientY > targetMiddle) return;

                                            const newQuestions = [...questions];
                                            const [draggedItem] = newQuestions.splice(draggedIndex, 1);
                                            newQuestions.splice(qIdx, 0, draggedItem);

                                            setQuestions(newQuestions);
                                            setDraggedIndex(qIdx);
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setDraggedIndex(null);
                                            setIsDraggingVisually(false);
                                        }}
                                        onDragEnd={() => {
                                            setDraggedIndex(null);
                                            setIsDraggingVisually(false);
                                        }}
                                        className={cn(
                                            "p-2.5 rounded-xl border transition-all relative group",
                                            draggedIndex === qIdx && isDraggingVisually
                                                ? "opacity-30 border-dashed border-amber-400 bg-amber-100/50"
                                                : "opacity-100 bg-slate-50/80 border-slate-200/80 hover:border-amber-300"
                                        )}
                                    >
                                        {/* Action buttons on top-right: Move up, Move down, Delete */}
                                        <div className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all bg-white/95 backdrop-blur-xs rounded-lg p-0.5 border border-slate-200 shadow-xs z-10">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveQuestion(qIdx, qIdx - 1);
                                                }}
                                                disabled={qIdx === 0}
                                                className="p-1 text-slate-400 hover:text-amber-600 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                                                title="Mozgatás feljebb"
                                            >
                                                <ChevronUp className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveQuestion(qIdx, qIdx + 1);
                                                }}
                                                disabled={qIdx === questions.length - 1}
                                                className="p-1 text-slate-400 hover:text-amber-600 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                                                title="Mozgatás lejjebb"
                                            >
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            </button>
                                            <div className="w-px h-3 bg-slate-200 my-auto" />
                                            <button 
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeQuestion(q.id);
                                                }} 
                                                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                                title="Törlés"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex gap-1.5 items-center pr-16">
                                                {/* Drag handle */}
                                                <div 
                                                    className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-amber-600 transition-colors p-0.5 shrink-0"
                                                    title="Húzd a sorrend módosításához"
                                                >
                                                    <GripVertical className="w-3.5 h-3.5" />
                                                </div>

                                                <div className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0">
                                                    {qIdx + 1}
                                                </div>
                                                <input 
                                                    value={q.question} 
                                                    onFocus={() => setActiveTarget({ qId: q.id, field: 'question' })}
                                                    onChange={e => updateQuestionField(q.id, 'question', e.target.value)}
                                                    placeholder="Kérdés szövege vagy képlet (pl. Mennyi $5^2 \cdot 5^3$?)..." 
                                                    className="flex-1 bg-transparent border-b border-slate-200 focus:border-amber-500 transition-all text-xs outline-none py-0.5"
                                                />
                                            </div>
                                            {hasQuestionMath && (
                                                <div className="ml-11 text-[11px] text-slate-700 bg-amber-50/70 border border-amber-200/60 rounded px-2 py-0.5 flex items-center gap-1.5">
                                                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                                                    <span className="font-semibold text-amber-900 text-[9px] uppercase">Képlet:</span>
                                                    <TotoMathView text={q.question} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 pl-5">
                                            {q.options.map((opt, oIdx) => {
                                                const hasOptMath = /[\$\^\\\*]/.test(opt);
                                                return (
                                                    <div key={oIdx} className="space-y-0.5">
                                                        <div className="flex items-center gap-1">
                                                            <input 
                                                                type="radio" 
                                                                name={`correct-${q.id}`} 
                                                                checked={q.correctAnswerIndex === oIdx} 
                                                                onChange={() => updateQuestionField(q.id, 'correctAnswerIndex', oIdx)}
                                                                className="w-3 h-3 text-amber-500"
                                                            />
                                                            <span className="text-[10px] font-bold text-slate-400">
                                                                {oIdx === 2 ? 'X' : oIdx + 1}
                                                            </span>
                                                        </div>
                                                        <input 
                                                            value={opt} 
                                                            onFocus={() => setActiveTarget({ qId: q.id, field: oIdx })}
                                                            onChange={e => updateOption(q.id, oIdx, e.target.value)}
                                                            placeholder="Válasz..." 
                                                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-amber-500"
                                                        />
                                                        {hasOptMath && (
                                                            <div className="text-[10.5px] text-slate-800 bg-amber-50/70 border border-amber-200/50 rounded px-1 py-0.5 truncate flex items-center justify-center min-h-[18px]">
                                                                <TotoMathView text={opt} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {aiError && (
                        <p className="text-xs text-red-500 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-1.5">
                            {aiError}
                        </p>
                    )}
                </div>

                {/* Right: Live Preview (7 cols) */}
                <div className="lg:col-span-7 xl:col-span-7 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-3 sm:p-5 flex flex-col items-center justify-start space-y-4">
                    <div className="w-full bg-white shadow-md border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
                        {/* Title & Subtitle */}
                        <div className="text-center space-y-1">
                            <h3 className="text-lg sm:text-2xl font-black text-amber-600 uppercase tracking-wide">
                                {title || 'Totó Kvíz'}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium">
                                Válaszd ki a helyes megoldást a három lehetőség közül!
                            </p>
                            {showPreview && (
                                <div className="inline-block mx-auto mt-1 px-3 py-0.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-full">
                                    MEGOLDÓKULCS NÉZET
                                </div>
                            )}
                        </div>

                        {/* Questions Section (Dynamic Multi-column Layout matching PDF) */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                                <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider">
                                    Kérdések
                                </h4>
                                <span className="text-[11px] font-semibold text-slate-400">
                                    {groupCount} csoportos elosztás
                                </span>
                            </div>

                            <div className={cn(
                                "grid gap-3 relative",
                                groupCount === 1 ? "grid-cols-1" :
                                groupCount === 2 ? "grid-cols-1 sm:grid-cols-2" :
                                groupCount === 3 ? "grid-cols-1 sm:grid-cols-3" :
                                "grid-cols-1 sm:grid-cols-2"
                            )}>
                                {Array.from({ length: groupCount <= 2 ? groupCount : (groupCount === 3 ? 3 : 4) }).map((_, cellIdx) => {
                                    const questionsPerCell = Math.ceil(questions.length / groupCount);
                                    const qStart = cellIdx * questionsPerCell;
                                    const qEnd = Math.min(qStart + questionsPerCell, questions.length);
                                    const cellQs = questions.slice(qStart, qEnd);
                                    if (cellQs.length === 0) return null;

                                    return (
                                        <div key={cellIdx} className="space-y-2 relative pr-2">
                                            {cellQs.map((q, idxInCell) => {
                                                const globalIdx = qStart + idxInCell;
                                                return (
                                                    <div key={q.id} className="text-xs sm:text-sm text-slate-800 flex items-baseline leading-relaxed">
                                                        <span className="font-bold text-amber-600 mr-2 shrink-0">
                                                            {globalIdx + 1}.
                                                        </span>
                                                        <div className="font-medium">
                                                            <TotoMathView text={q.question || '...'} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Totó Answers Table */}
                        <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1.5">
                                Válaszok (Totó táblázat)
                            </h4>

                            <div className="border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
                                {/* Table Header */}
                                <div className="grid grid-cols-[55px_1fr_1fr_1fr] sm:grid-cols-[70px_1fr_1fr_1fr] bg-slate-100 border-b border-slate-300 font-bold text-xs sm:text-sm text-slate-700 text-center">
                                    <div className="py-2 border-r border-slate-300">Sorszám</div>
                                    <div className="py-2 border-r border-slate-300">1</div>
                                    <div className="py-2 border-r border-slate-300">2</div>
                                    <div className="py-2">X (3)</div>
                                </div>

                                {/* Table Rows */}
                                {questions.map((q, qIdx) => {
                                    const solChar = getSolutionChar(qIdx);

                                    return (
                                        <div 
                                            key={q.id} 
                                            className="grid grid-cols-[55px_1fr_1fr_1fr] sm:grid-cols-[70px_1fr_1fr_1fr] border-b border-slate-200 last:border-b-0"
                                        >
                                            <div className="bg-slate-50 font-bold text-xs sm:text-sm text-slate-700 py-2 text-center border-r border-slate-300 flex items-center justify-center">
                                                {qIdx + 1}.
                                            </div>

                                            {[0, 1, 2].map(oIdx => {
                                                const isCorrect = q.correctAnswerIndex === oIdx;
                                                const char = solutionWord ? (isCorrect ? solChar : q.randomLetters[oIdx]) : '';
                                                const isHighlighted = isCorrect && showPreview;

                                                return (
                                                    <div 
                                                        key={oIdx} 
                                                        className={cn(
                                                            "relative p-2 sm:p-2.5 min-h-[38px] flex items-center justify-center text-center text-xs sm:text-sm transition-all",
                                                            oIdx < 2 && "border-r border-slate-200",
                                                            isHighlighted 
                                                                ? "bg-emerald-50 text-emerald-950 font-bold border-2 border-emerald-500 z-10" 
                                                                : "bg-white text-slate-800"
                                                        )}
                                                    >
                                                        <div className="w-full">
                                                            <TotoMathView text={q.options[oIdx] || '...'} />
                                                        </div>

                                                        {char && (
                                                            <span className={cn(
                                                                "absolute bottom-1 right-1.5 text-[9px] sm:text-[10px] font-black",
                                                                isHighlighted ? "text-emerald-600 font-extrabold" : "text-slate-300"
                                                            )}>
                                                                {char}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Solution Strip (Megoldás sáv) */}
                        <div className="space-y-2 pt-1">
                            <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider">
                                Megoldás sáv (Betűk a sarkokból)
                            </h4>

                            <div className="flex gap-1 overflow-x-auto pb-1">
                                {questions.map((_, i) => (
                                    <div key={i} className="flex flex-col flex-1 min-w-[24px] sm:min-w-[28px]">
                                        <div className="bg-slate-100 border border-slate-300 border-b-0 text-[10px] sm:text-xs font-bold text-slate-600 py-1 text-center">
                                            {i + 1}
                                        </div>
                                        <div className="bg-white border border-slate-300 h-8 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-black text-amber-600">
                                            {showPreview ? getSolutionChar(i) : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Controls */}
                    <div className="flex flex-col items-center gap-1.5">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setQuestions(updateNoiseLetters(questions))} 
                            className="text-slate-500 hover:text-amber-600 text-xs h-8 px-3"
                        >
                            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Véletlen betűk újragenerálása
                        </Button>
                        {!solutionWordMatch && (
                            <p className="text-xs text-amber-600 font-bold animate-pulse text-center">
                                ⚠️ A megfejtés hossza ({solutionWord.replace(/\s+/g, '').length}) nem egyezik a kérdésekkel ({questions.length})!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
