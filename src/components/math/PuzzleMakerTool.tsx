import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Download,
    Eye,
    Pencil,
    Puzzle,
    Sparkles,
    Key,
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
    Beaker,
    LogIn,
    GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { notoSansRegularBase64 } from '@/assets/fonts/NotoSans-Regular-base64';
import { notoSansBoldBase64 } from '@/assets/fonts/NotoSans-Bold-base64';

interface PuzzleQuestion {
    id: number;
    question: string;
    answer: string;
    offset?: number;
    highlightIndex?: number;
}

interface PuzzleMakerToolProps {
    onBack: () => void;
}

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 15;

const STORAGE_KEY = 'puzzle-maker-openai-key';

const SAMPLE_PROMPTS = [
    '5 kérdés összeadásból 2. osztályosoknak',
    '8 szorzásos feladat 3. osztályosoknak',
    '10 vegyes műveletes példa 4. osztályosoknak',
    '6 egyszerű törtekkel kapcsolatos kérdés 5. osztályosoknak',
    '7 százalékszámítás feladat 6. osztályosoknak',
];

const DEMO_QUESTIONS: PuzzleQuestion[] = [
    { id: 901, question: 'Mennyi 7 × 8?', answer: '56' },
    { id: 902, question: 'Mennyi 144 ÷ 12?', answer: '12' },
    { id: 903, question: 'Mennyi 25 + 37?', answer: '62' },
    { id: 904, question: 'Mennyi 100 - 43?', answer: '57' },
    { id: 905, question: 'Mennyi 9 × 6?', answer: '54' },
    { id: 906, question: 'Mennyi 3² + 4²?', answer: '25' },
    { id: 907, question: 'Mennyi a 60 fele?', answer: '30' },
];

export function PuzzleMakerTool({ onBack }: PuzzleMakerToolProps) {
    const { user, loading: authLoading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [questions, setQuestions] = useState<PuzzleQuestion[]>([
        { id: 1, question: '', answer: '' },
        { id: 2, question: '', answer: '' },
        { id: 3, question: '', answer: '' },
        { id: 4, question: '', answer: '' },
        { id: 5, question: '', answer: '' },
    ]);
    const [puzzleTitle, setPuzzleTitle] = useState('Matematikai rejtvény');
    const [showPreview, setShowPreview] = useState(false);
    const [nextId, setNextId] = useState(6);

    const [aiTopic, setAiTopic] = useState('');
    const [aiQuestionCount, setAiQuestionCount] = useState(10);
    const [aiHiddenWord, setAiHiddenWord] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [aiSuccess, setAiSuccess] = useState(false);

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isDraggingVisually, setIsDraggingVisually] = useState<boolean>(false);

    const [isExporting, setIsExporting] = useState<boolean>(false);

    const applyDynamicOffsets = (qs: PuzzleQuestion[]): PuzzleQuestion[] => {
        const hasHighlight = qs.some(q => q.highlightIndex !== undefined && q.highlightIndex >= 0);
        if (!hasHighlight) {
            return qs.map(q => ({ ...q, offset: 0 }));
        }

        let maxHighlightIndex = 0;
        qs.forEach(q => {
            if (q.highlightIndex !== undefined && q.highlightIndex > maxHighlightIndex) {
                maxHighlightIndex = q.highlightIndex;
            }
        });

        return qs.map(q => {
            const offset = q.highlightIndex !== undefined && q.highlightIndex >= 0 
                ? maxHighlightIndex - q.highlightIndex 
                : 0; 
            return { ...q, offset };
        });
    };

    const addQuestion = () => {
        if (questions.length >= MAX_QUESTIONS) return;
        const newQuestions = [...questions, { id: nextId, question: '', answer: '' }];
        setQuestions(applyDynamicOffsets(newQuestions));
        setNextId(nextId + 1);
    };

    const removeQuestion = (id: number) => {
        if (questions.length <= MIN_QUESTIONS) return;
        const newQuestions = questions.filter((q) => q.id !== id);
        setQuestions(applyDynamicOffsets(newQuestions));
    };

    const updateQuestion = (id: number, field: 'question' | 'answer' | 'highlightIndex', value: any) => {
        setQuestions(prev => {
            const updated = prev.map((q) => (q.id === id ? { ...q, [field]: value } : q));
            return applyDynamicOffsets(updated);
        });
    };

    const isValid = questions.every((q) => q.question.trim() && q.answer.trim());

    // Demo fill
    const fillWithDemo = () => {
        setQuestions(DEMO_QUESTIONS);
        setNextId(908);
        setPuzzleTitle('Matematikai rejtvény – Teszt');
        setAiSuccess(true);
        setTimeout(() => setAiSuccess(false), 3000);
    };

    // AI generation
    const generateWithAI = async () => {
        if (!aiTopic.trim()) {
            setAiError('Kérlek add meg a témakört!');
            return;
        }

        const cleanHiddenWord = aiHiddenWord.trim().replace(/\s+/g, '');
        if (cleanHiddenWord && cleanHiddenWord.length !== aiQuestionCount) {
             setAiError(`A kért kérdések száma (${aiQuestionCount}) nem egyezik meg a fő megfejtés hosszával (${cleanHiddenWord.length})!`);
             return;
        }

        setAiLoading(true);
        setAiError('');
        setAiSuccess(false);

        try {
            const { data, error } = await supabase.functions.invoke('generate-puzzle', {
                body: { 
                    topic: aiTopic.trim(), 
                    questionCount: aiQuestionCount,
                    hiddenWord: aiHiddenWord.trim()
                },
            });

            if (error) {
                throw new Error(error.message || 'Hiba történt az AI hívás során.');
            }

            if (!data.questions || !Array.isArray(data.questions)) {
                throw new Error('Az AI válasza nem a várt formátumban érkezett.');
            }

            // Validate and limit questions
            const validQuestions = data.questions
                .filter((q: any) => q.question && q.answer)
                .slice(0, MAX_QUESTIONS);

            if (validQuestions.length < MIN_QUESTIONS) {
                throw new Error(`Legalább ${MIN_QUESTIONS} kérdésre van szükség. Az AI csak ${validQuestions.length}-t generált.`);
            }

            // Update state
            const newQuestions: PuzzleQuestion[] = validQuestions.map((q: any, idx: number) => ({
                id: nextId + idx,
                question: String(q.question),
                answer: String(q.answer).toUpperCase(), // Convert to uppercase here to make things easier
                offset: q.offset || 0,
                highlightIndex: q.highlightIndex !== undefined ? q.highlightIndex : -1,
            }));

            setQuestions(applyDynamicOffsets(newQuestions));
            setNextId(nextId + newQuestions.length);

            if (data.title) {
                setPuzzleTitle(data.title);
            }

            setAiSuccess(true);
            setTimeout(() => setAiSuccess(false), 3000);
        } catch (err: any) {
            setAiError(err.message || 'Ismeretlen hiba történt.');
        } finally {
            setAiLoading(false);
        }
    };

    const downloadPDF = async () => {
        if (!isValid) return;
        setIsExporting(true);

        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            
            doc.addFileToVFS('NotoSans-Regular.ttf', notoSansRegularBase64);
            doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
            
            doc.addFileToVFS('NotoSans-Bold.ttf', notoSansBoldBase64);
            doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');

            const pageW = 210;
            const marginX = 15;
            const contentW = pageW - marginX * 2;

            const fixText = (text: string) => {
                return doc.splitTextToSize(text, 1000)[0] || '';
            };

            const renderPage = (isSolution: boolean) => {
            // Header
            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(121, 87, 213); // Violet-500
            doc.setFontSize(22);
            doc.text(fixText(puzzleTitle), pageW / 2, 20, { align: 'center' });

            if (isSolution) {
                doc.setTextColor(219, 39, 119); // Pink-600
                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(10);
                doc.text(fixText('MEGOLDÓKULCS - TANÁRI PÉLDÁNY'), pageW / 2, 27, { align: 'center' });
            }

            doc.setTextColor(120, 120, 120);
            doc.setFont('NotoSans', 'normal');
            doc.setFontSize(10);
            const instructionText = isSolution
                ? 'Ellenőrizd a megoldásokat az alábbi táblázat alapján!'
                : 'Töltsd ki az üres kockákat a kérdésekre kapott válaszokkal!';
            doc.text(fixText(instructionText), pageW / 2, 32, { align: 'center' });
            doc.setTextColor(0, 0, 0);

            // === PUZZLE GRID ===
            const cellSize = 8;
            const gridStartY = 45;
            const rowHeight = cellSize + 4;

            questions.forEach((q, idx) => {
                const answerChars = q.answer.toUpperCase().split('');
                const rowY = gridStartY + idx * rowHeight;

                // Question number label
                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(9);
                doc.text(fixText(`${idx + 1}.`), marginX, rowY + cellSize / 2 + 1);

                // Draw cells
                const cellsStartX = marginX + 10 + (q.offset || 0) * (cellSize + 1);
                answerChars.forEach((char, charIdx) => {
                    const cx = cellsStartX + charIdx * (cellSize + 1);
                    const isSpace = char === ' ';
                    const isHighlighted = q.highlightIndex === charIdx;

                    if (isSpace) {
                        // Draw solid filled block for spaces
                        doc.setFillColor(100, 100, 100);
                        doc.setDrawColor(100, 100, 100);
                        doc.rect(cx, rowY, cellSize, cellSize, 'FD'); // Fill and border
                    } else {
                        // Regular cell
                        if (isHighlighted) {
                            // Highlighted column cell
                            doc.setFillColor(240, 245, 255); // Very light blue
                            doc.setDrawColor(79, 70, 229); // Indigo-600 outline
                            doc.setLineWidth(0.6);
                            doc.rect(cx, rowY, cellSize, cellSize, 'FD');
                        } else {
                            // Normal cell
                            doc.setFillColor(255, 255, 255);
                            doc.setDrawColor(100, 100, 100);
                            doc.setLineWidth(0.3);
                            doc.rect(cx, rowY, cellSize, cellSize, 'FD');
                        }

                        if (isSolution) {
                            doc.setFont('NotoSans', 'bold');
                            doc.setFontSize(10);
                            doc.setTextColor(isHighlighted ? 79 : 0, isHighlighted ? 70 : 0, isHighlighted ? 229 : 0);
                            doc.text(fixText(char), cx + cellSize / 2, rowY + cellSize / 2 + 1.2, { align: 'center' });
                            doc.setTextColor(0, 0, 0);
                        }
                    }
                });
            });

            // === QUESTIONS ===
            const questionsStartY = gridStartY + questions.length * rowHeight + 15;

            doc.setDrawColor(240, 240, 240);
            doc.setLineWidth(0.5);
            doc.line(marginX, questionsStartY - 8, marginX + contentW, questionsStartY - 8);

            doc.setFont('NotoSans', 'bold');
            doc.setTextColor(79, 70, 229); // Indigo-600
            doc.setFontSize(14);
            doc.text(fixText('Kérdések'), marginX, questionsStartY);
            doc.setTextColor(0, 0, 0);

            doc.setFont('NotoSans', 'normal');
            doc.setFontSize(11);

            questions.forEach((q, idx) => {
                const qY = questionsStartY + 10 + idx * 8;

                // New page if overflow
                if (qY > 280) {
                    doc.addPage();
                }

                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(11);
                doc.text(fixText(`${idx + 1}.`), marginX, qY);
                doc.setFont('NotoSans', 'normal');
                doc.text(fixText(q.question), marginX + 8, qY);
            });

            // Footer
            const footerY = 285;
            doc.setTextColor(180, 180, 180);
            doc.setFont('NotoSans', 'normal');
            doc.setFontSize(8);
            doc.text(fixText('Készült a DiákZóna Online Rejtvénykészítővel - diakzona.hu'), pageW / 2, footerY, { align: 'center' });
        };

        // Page 1: Student Version
        renderPage(false);

        // Page 2: Teacher Version
        doc.addPage();
        renderPage(true);

        doc.save(`${puzzleTitle.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error('PDF Generation failed:', error);
            setAiError('Hiba történt a letöltés során.');
        } finally {
            setIsExporting(false);
        }
    };

    if (authLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                <p className="text-slate-500 font-medium">Betöltés...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            {/* Header Card */}
            <div className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-xl" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="text-white hover:bg-white/20 border border-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Vissza
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Puzzle className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Online Rejtvénykészítő</h2>
                            <p className="text-white/80 text-sm">
                                Hozz létre matematikai rejtvényeket kézzel vagy AI segítségével!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Editor */}
                <div className="space-y-4">
                    {/* AI Generation Panel */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 shadow-xl border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full -ml-10 -mb-10 blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-emerald-400" />
                                    AI Rejtvénygenerátor
                                </h3>
                            </div>

                            {/* AI Inputs */}
                            <div className="space-y-3">
                                {/* Topic Input */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Évfolyam és Témakör
                                    </label>
                                    <input
                                        type="text"
                                        value={aiTopic}
                                        onChange={(e) => { setAiTopic(e.target.value); setAiError(''); }}
                                        className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-500"
                                        placeholder="pl. Történelem 5. osztály, Árpád-ház"
                                    />
                                </div>

                                {/* Count and Hidden Word Row */}
                                <div className="flex gap-3">
                                    <div className="flex-[0.4]">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                            Kérdések (3-15)
                                        </label>
                                        <input
                                            type="number"
                                            min={3}
                                            max={15}
                                            value={aiQuestionCount}
                                            onChange={(e) => { setAiQuestionCount(parseInt(e.target.value)); setAiError(''); }}
                                            className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                    <div className="flex-[0.6]">
                                        <label className="block text-[10px] font-bold text-emerald-400/80 uppercase tracking-wider mb-1 flex items-center gap-1">
                                            <Key className="w-3 h-3" /> Fő megfejtés (opcionális)
                                        </label>
                                        <input
                                            type="text"
                                            value={aiHiddenWord}
                                            onChange={(e) => { setAiHiddenWord(e.target.value); setAiError(''); }}
                                            className="w-full px-3 py-2 bg-black/30 border border-emerald-500/30 rounded-xl text-sm text-emerald-50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                                            placeholder="pl. KIRÁLY"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        onClick={() => {
                                            if (!user) {
                                                setIsAuthModalOpen(true);
                                                return;
                                            }
                                            generateWithAI();
                                        }}
                                        disabled={aiLoading}
                                        className={cn(
                                            'w-full rounded-xl gap-2 font-bold text-sm transition-all',
                                            aiLoading
                                                ? 'bg-slate-700 text-slate-400'
                                                : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                                        )}
                                    >
                                        {aiLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Generálás...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                {!user && <Key className="w-3.5 h-3.5 mr-1 text-emerald-100" />}
                                                Rejtvény Készítése
                                            </>
                                        )}
                                    </Button>
                                    {!user && (
                                        <p className="mt-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider text-center bg-white/5 py-1.5 rounded-lg border border-white/5">
                                            🔒 Jelentkezz be az AI használatához!
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* AI feedback messages */}
                            {aiError && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    {aiError}
                                </div>
                            )}
                            {aiSuccess && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 animate-in fade-in duration-300">
                                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    Rejtvény sikeresen generálva! Most letöltheted PDF-ben.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title Input */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                            Rejtvény címe
                        </label>
                        <input
                            type="text"
                            value={puzzleTitle}
                            onChange={(e) => setPuzzleTitle(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all"
                            placeholder="Add meg a rejtvény címét..."
                        />
                    </div>

                    {/* Questions Editor */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Pencil className="w-4 h-4 text-violet-500" />
                                Kérdések ({questions.length}/{MAX_QUESTIONS})
                            </h3>
                            <Button
                                size="sm"
                                onClick={addQuestion}
                                disabled={questions.length >= MAX_QUESTIONS}
                                className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-xs gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                Új kérdés
                            </Button>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                            {questions.map((q, idx) => (
                                <div
                                    key={q.id}
                                    draggable={true}
                                    onDragStart={(e) => {
                                        setDraggedIndex(idx);
                                        e.dataTransfer.effectAllowed = 'move';
                                        // Delay visual change to next frame so browser captures opaque element as drag ghost
                                        setTimeout(() => setIsDraggingVisually(true), 0);
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault(); // Necessary to allow dropping and continuous firing
                                        if (draggedIndex === null || draggedIndex === idx) return;

                                        const targetRect = e.currentTarget.getBoundingClientRect();
                                        const targetMiddle = targetRect.top + targetRect.height / 2;
                                        const isDraggingDown = draggedIndex < idx;

                                        // Only swap if mouse passed the 50% threshold of the target element
                                        if (isDraggingDown && e.clientY < targetMiddle) return;
                                        if (!isDraggingDown && e.clientY > targetMiddle) return;

                                        // Reorder questions array dynamically
                                        const newQuestions = [...questions];
                                        const [draggedItem] = newQuestions.splice(draggedIndex, 1);
                                        newQuestions.splice(idx, 0, draggedItem);
                                        
                                        setQuestions(applyDynamicOffsets(newQuestions));
                                        setDraggedIndex(idx); // Update the dragged index to the new position
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDraggedIndex(null);
                                        setIsDraggingVisually(false);
                                    }}
                                    onDragEnd={(e) => {
                                        setDraggedIndex(null);
                                        setIsDraggingVisually(false);
                                    }}
                                    className={cn(
                                        "group bg-blue-50 hover:bg-blue-100 rounded-xl p-3.5 border transition-all shadow-sm cursor-grab active:cursor-grabbing",
                                        (draggedIndex === idx && isDraggingVisually) ? "opacity-30 border-dashed border-blue-400 bg-blue-100/50" : "opacity-100 border-solid border-blue-200 hover:border-blue-400"
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center pt-2 text-blue-400 group-hover:text-blue-600 transition-colors">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-200 text-blue-800 flex items-center justify-center font-black text-xs mt-1">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                value={q.question}
                                                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-all"
                                                placeholder="Írd be a kérdést (pl. Mennyi 3 + 2?)"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={q.answer}
                                                    onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                                                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:border-fuchsia-400 transition-all"
                                                    placeholder="Megoldás (pl. 5)"
                                                />
                                                {q.answer && (
                                                    <div className="flex gap-0.5" style={{ marginLeft: `${(q.offset || 0) * 1.625}rem` }}>
                                                        {q.answer.split('').map((char, ci) => {
                                                            const isSpace = char === ' ';
                                                            const isHighlighted = q.highlightIndex === ci;

                                                            if (isSpace) {
                                                                return (
                                                                    <div
                                                                        key={ci}
                                                                        className="w-6 h-6 bg-slate-800 rounded flex-shrink-0"
                                                                    />
                                                                );
                                                            }

                                                            return (
                                                                <button
                                                                    key={ci}
                                                                    onClick={() => updateQuestion(q.id, 'highlightIndex', isHighlighted ? -1 : ci)}
                                                                    className={cn(
                                                                        "w-6 h-6 border-2 rounded flex items-center justify-center text-[10px] font-black flex-shrink-0 cursor-pointer hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400",
                                                                        isHighlighted
                                                                            ? "border-emerald-400 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                                            : "border-violet-300 bg-violet-50 text-violet-600 hover:bg-violet-100"
                                                                    )}
                                                                    title={isHighlighted ? "Kiemelés törlése" : "Kijelölés fő megfejtés részeként"}
                                                                >
                                                                    {char.toUpperCase()}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeQuestion(q.id)}
                                            disabled={questions.length <= MIN_QUESTIONS}
                                            className={cn(
                                                'flex-shrink-0 p-1.5 rounded-lg transition-all mt-1',
                                                questions.length <= MIN_QUESTIONS
                                                    ? 'text-slate-300 cursor-not-allowed'
                                                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                                            )}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setShowPreview(!showPreview)}
                            variant="outline"
                            className="flex-1 rounded-xl gap-2 border-2 hover:border-violet-300 hover:bg-violet-50 transition-all"
                        >
                            <Eye className="w-4 h-4" />
                            {showPreview ? 'Szerkesztés' : 'Előnézet'}
                        </Button>
                        <Button
                            onClick={downloadPDF}
                            disabled={!isValid || isExporting}
                            className={cn(
                                'flex-1 rounded-xl gap-2 font-bold shadow-lg transition-all',
                                isValid
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-violet-500/30 text-white'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            )}
                        >
                            <Download className="w-4 h-4" />
                            {isExporting ? 'Készítés...' : 'Letöltés PDF-ben'}
                        </Button>
                    </div>

                    {!isValid && (
                        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
                            ⚠️ Minden kérdésnél add meg a kérdés szövegét és a megoldást!
                        </p>
                    )}
                </div>

                {/* Right: Live Preview */}
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-6 shadow-sm min-h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                            <Eye className="w-4 h-4 text-violet-500" />
                            Rejtvény előnézet
                        </h3>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full font-medium">
                            A4 PDF
                        </span>
                    </div>

                    {/* PDF-like preview */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-inner" style={{ aspectRatio: '210/297', maxHeight: '600px', overflow: 'auto' }}>
                        {/* Title */}
                        <h4 className="text-center font-black text-lg mb-1 text-slate-800">
                            {puzzleTitle || 'Rejtvény címe'}
                        </h4>
                        <p className="text-center text-[10px] text-slate-400 mb-5">
                            Töltsd ki a megoldásokat a kockákba!
                        </p>

                        {/* Grid Section */}
                        <div className="space-y-2 mb-6">
                            {questions.map((q, idx) => (
                                <div key={q.id} className="flex items-center gap-2">
                                    <span className="w-5 text-right text-[10px] font-bold text-slate-500 flex-shrink-0">
                                        {idx + 1}.
                                    </span>
                                    <div className="flex gap-0.5" style={{ marginLeft: `${(q.offset || 0) * 1.75}rem` }}>
                                        {q.answer ? (
                                            q.answer.split('').map((char, ci) => {
                                                const isSpace = char === ' ';
                                                const isHighlighted = q.highlightIndex === ci;

                                                if (isSpace) {
                                                    return (
                                                        <div
                                                            key={ci}
                                                            className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 rounded-sm flex-shrink-0"
                                                        />
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={ci}
                                                        className={cn(
                                                            "w-6 h-6 sm:w-7 sm:h-7 border border-slate-300 rounded-sm flex-shrink-0",
                                                            isHighlighted ? "bg-emerald-100/50 border-emerald-300 border-2" : "bg-slate-50"
                                                        )}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <div className="text-[10px] text-slate-300 italic">
                                                (megoldás)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="border-t border-slate-200 my-4" />

                        {/* Questions Section */}
                        <div>
                            <h5 className="font-bold text-xs text-slate-700 mb-2">Kérdések</h5>
                            <div className="space-y-1.5">
                                {questions.map((q, idx) => (
                                    <div key={q.id} className="flex gap-2 text-[11px]">
                                        <span className="font-bold text-slate-500 flex-shrink-0">
                                            {idx + 1}.
                                        </span>
                                        <span className="text-slate-700">
                                            {q.question || (
                                                <span className="text-slate-300 italic">
                                                    (kérdés szövege)
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-3 border-t border-slate-100 text-center">
                            <p className="text-[8px] text-slate-300">
                                Készült a DiákZóna Online Rejtvénykészítővel
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
