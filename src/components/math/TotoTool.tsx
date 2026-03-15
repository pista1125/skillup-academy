import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Download,
    Eye,
    Sparkles,
    Loader2,
    CheckCircle,
    AlertCircle,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { notoSansRegularBase64 } from '@/assets/fonts/NotoSans-Regular-base64';
import { notoSansBoldBase64 } from '@/assets/fonts/NotoSans-Bold-base64';

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

export function TotoTool({ onBack }: TotoToolProps) {
    const { user, loading: authLoading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [questions, setQuestions] = useState<TotoQuestion[]>([
        { id: 1, question: '', options: ['', '', ''], correctAnswerIndex: 0, randomLetters: ['', '', ''] }
    ]);
    const [title, setTitle] = useState('Totó Kvíz');
    const [solutionWord, setSolutionWord] = useState('');
    const [isTopToBottom, setIsTopToBottom] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [nextId, setNextId] = useState(2);

    const [aiTopic, setAiTopic] = useState('');
    const [aiQuestionCount, setAiQuestionCount] = useState(13);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [aiSuccess, setAiSuccess] = useState(false);

    const [groupCount, setGroupCount] = useState(1);
    const [isExporting, setIsExporting] = useState(false);

    const generateRandomLetter = () => {
        return HUNGARIAN_ALPHABET[Math.floor(Math.random() * HUNGARIAN_ALPHABET.length)];
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

    const generateWithAI = async () => {
        if (!aiTopic.trim()) {
            setAiError('Kérlek add meg a témakört!');
            return;
        }

        setAiLoading(true);
        setAiError('');
        setAiSuccess(false);

        try {
            const { data, error } = await supabase.functions.invoke('generate-toto', {
                body: { topic: aiTopic.trim(), questionCount: aiQuestionCount },
            });

            if (error) throw new Error(error.message || 'Hiba az AI hívás során');
            if (!data.questions) throw new Error('Érvénytelen válasz az AI-tól');

            const newQuestions: TotoQuestion[] = data.questions.map((q: any, idx: number) => ({
                id: nextId + idx,
                question: q.question,
                options: q.options,
                correctAnswerIndex: q.correctAnswerIndex,
                randomLetters: [generateRandomLetter(), generateRandomLetter(), generateRandomLetter()]
            }));

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

    const downloadPDF = async () => {
        if (!isValid) return;
        if (!solutionWordMatch) {
            setAiError(`A megfejtés hossza (${solutionWord.replace(/\s+/g, '').length}) nem egyezik a kérdések számával (${questions.length})!`);
            return;
        }

        setIsExporting(true);
        try {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            doc.addFileToVFS('NotoSans-Regular.ttf', notoSansRegularBase64);
            doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
            doc.addFileToVFS('NotoSans-Bold.ttf', notoSansBoldBase64);
            doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');

            const pageW = 210;
            const marginX = 20;
            const contentW = pageW - marginX * 2;
            const fixText = (text: string) => doc.splitTextToSize(text, contentW)[0] || '';

            const renderPage = (isSolution: boolean) => {
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(217, 119, 6); // Amber-600
                doc.setFontSize(22);
                doc.text(fixText(title), pageW / 2, 18, { align: 'center' });

                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                doc.setFont('NotoSans', 'normal');
                doc.text(fixText('Válaszd ki a helyes megoldást a három lehetőség közül!'), pageW / 2, 24, { align: 'center' });

                if (isSolution) {
                    doc.setTextColor(220, 38, 38);
                    doc.setFont('NotoSans', 'bold');
                    doc.text('MEGOLDÓKULCS', pageW / 2, 29, { align: 'center' });
                }

                let currentY = 38;
                
                // --- Question List (Dynamic Layout) ---
                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(10);
                doc.setTextColor(50, 50, 50);
                doc.text('Kérdések', marginX, currentY);
                currentY += 6;

                const colCount = groupCount <= 2 ? groupCount : 2;
                const rowCount = groupCount > 2 ? 2 : 1;
                const colWidth = contentW / colCount;
                
                // Balance questions across grid cells
                const questionsPerCell = Math.ceil(questions.length / groupCount);
                
                doc.setFont('NotoSans', 'normal');
                doc.setFontSize(8.5);
                doc.setTextColor(0, 0, 0);

                const gridStartY = currentY;
                let gridMaxY = currentY;
                const cellHeight = 13; // Estimated base height per question block

                for (let r = 0; r < rowCount; r++) {
                    let maxRowY = gridStartY + (r * 0); // Placeholder
                    const rowStartY = currentY;

                    for (let c = 0; c < colCount; c++) {
                        const cellIdx = r * colCount + c;
                        if (cellIdx >= groupCount) continue;

                        const colX = marginX + c * colWidth;
                        let colY = rowStartY;

                        const qStart = cellIdx * questionsPerCell;
                        const qEnd = Math.min(qStart + questionsPerCell, questions.length);
                        const cellQuestions = questions.slice(qStart, qEnd);

                        cellQuestions.forEach((q, idxInCell) => {
                            const globalIdx = qStart + idxInCell;
                            const qText = `${globalIdx + 1}. ${q.question}`;
                            const lines = doc.splitTextToSize(qText, colWidth - 10);
                            doc.text(lines, colX + 5, colY);
                            colY += lines.length * 4.2 + 1.8;
                        });

                        if (colY > gridMaxY) gridMaxY = colY;
                        if (colY > maxRowY) maxRowY = colY;
                    }

                    // Draw vertical separator if needed
                    if (colCount > 1 && r === 0) {
                        doc.setDrawColor(200);
                        doc.setLineDashPattern([2, 1], 0);
                        doc.line(marginX + colWidth, gridStartY - 3, marginX + colWidth, Math.max(gridMaxY, gridStartY + 20));
                        // Scissor icon at top of vertical line
                        doc.setFont('ZapfDingbats', 'normal');
                        doc.setFontSize(10);
                        doc.text('!', marginX + colWidth - 2.5, gridStartY - 5);
                        doc.setFont('NotoSans', 'normal');
                        doc.setLineDashPattern([], 0);
                    }

                    // Draw horizontal separator if needed (only for 2-row grid)
                    if (rowCount > 1 && r === 0) {
                        const hrY = maxRowY + 4;
                        doc.setDrawColor(200);
                        doc.setLineDashPattern([2, 1], 0);
                        doc.line(marginX - 5, hrY, marginX + contentW + 5, hrY);
                        // Scissor icon at left of horizontal line
                        doc.setFont('ZapfDingbats', 'normal');
                        doc.setFontSize(10);
                        doc.text('!', marginX - 8, hrY + 1.5);
                        doc.setFont('NotoSans', 'normal');
                        doc.setLineDashPattern([], 0);
                        currentY = hrY + 6;
                    } else {
                        currentY = maxRowY + 8;
                    }
                }

                if (gridMaxY > currentY) currentY = gridMaxY + 8;
                
                // --- Toto Table & Solution (Smart Breaking) ---
                const tableRowH = 9.5;
                const headerH = 15;
                const solSávH = 25;
                const totalTableH = headerH + (questions.length * tableRowH) + solSávH;

                // Move to new page IF the whole table doesn't fit AND it's not already at the top of a page
                if (currentY + totalTableH > 280 && currentY > 50) {
                    doc.addPage();
                    currentY = 18;
                }

                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(10.5);
                doc.text('Válaszok (Totó táblázat)', marginX, currentY);
                currentY += 6;

                const tableX = marginX;
                const cellW = (contentW) / 4;
                const cellH = tableRowH;

                const drawTableHeader = (y: number) => {
                    doc.setFillColor(243, 244, 246);
                    doc.rect(tableX, y, contentW, cellH, 'F');
                    doc.setDrawColor(200);
                    doc.rect(tableX, y, contentW, cellH);
                    doc.setFontSize(8);
                    doc.setFont('NotoSans', 'bold');
                    doc.text('Sorszám', tableX + cellW/2, y + 6, { align: 'center' });
                    doc.text('1', tableX + cellW + cellW/2, y + 6, { align: 'center' });
                    doc.text('2', tableX + cellW * 2 + cellW/2, y + 6, { align: 'center' });
                    doc.text('X (3)', tableX + cellW * 3 + cellW/2, y + 6, { align: 'center' });
                    return y + cellH;
                };

                currentY = drawTableHeader(currentY);

                questions.forEach((q, qIdx) => {
                    // Row break check: Allow split ONLY if the whole table couldn't fit on one page
                    if (currentY + cellH + (qIdx === questions.length - 1 ? solSávH : 0) > 285) {
                        doc.addPage();
                        currentY = 18;
                        currentY = drawTableHeader(currentY);
                    }

                    doc.rect(tableX, currentY, contentW, cellH);
                    doc.line(tableX + cellW, currentY, tableX + cellW, currentY + cellH);
                    doc.line(tableX + cellW*2, currentY, tableX + cellW*2, currentY + cellH);
                    doc.line(tableX + cellW*3, currentY, tableX + cellW*3, currentY + cellH);

                    doc.setFont('NotoSans', 'bold');
                    doc.setFontSize(9);
                    doc.text(`${qIdx + 1}.`, tableX + cellW/2, currentY + 6, { align: 'center' });

                    const solChar = getSolutionChar(qIdx);

                    q.options.forEach((opt, oIdx) => {
                        const startX = tableX + cellW * (oIdx + 1);
                        doc.setFont('NotoSans', 'normal');
                        doc.setFontSize(7.5);
                        
                        const optLines = doc.splitTextToSize(opt, cellW - 5);
                        doc.text(optLines, startX + 2, currentY + 4.5);

                        const isCorrect = q.correctAnswerIndex === oIdx;
                        // ONLY SHOW LETTER IF solutionWord exists
                        const letter = solutionWord ? (isCorrect ? solChar : q.randomLetters[oIdx]) : '';
                        
                        if (letter) {
                            doc.setFont('NotoSans', 'bold');
                            doc.setFontSize(6);
                            doc.setTextColor(180);
                            doc.text(letter, startX + cellW - 1.5, currentY + cellH - 0.8, { align: 'right' });
                            doc.setTextColor(0);
                        }

                        if (isSolution && isCorrect) {
                            doc.setDrawColor(34, 197, 94);
                            doc.setLineWidth(0.4);
                            doc.rect(startX + 0.5, currentY + 0.5, cellW - 1, cellH - 1);
                            doc.setLineWidth(0.2);
                            doc.setDrawColor(200);
                        }
                    });

                    currentY += cellH;
                });

                // Solution Row (Letters)
                currentY += 6;
                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(10);
                doc.text('Megoldás sáv (Betűk a sarkokból)', marginX, currentY);
                currentY += 5;

                const solBoxW = Math.min(contentW / Math.max(questions.length, 10), 13);
                const solBoxH = 9;
                
                questions.forEach((_, qIdx) => {
                    const bx = marginX + qIdx * solBoxW;
                    doc.setFillColor(243, 244, 246);
                    doc.rect(bx, currentY, solBoxW, 5, 'F');
                    doc.setDrawColor(200);
                    doc.rect(bx, currentY, solBoxW, 5);
                    doc.setFontSize(6);
                    doc.text(`${qIdx + 1}`, bx + solBoxW/2, currentY + 3.5, { align: 'center' });

                    doc.rect(bx, currentY + 5, solBoxW, solBoxH);
                    if (isSolution) {
                        const solChar = getSolutionChar(qIdx);
                        doc.setFontSize(solutionWord ? 9 : 7);
                        doc.text(solChar, bx + solBoxW/2, currentY + 5 + (solutionWord ? 6.5 : 6), { align: 'center' });
                    }
                });

                // Footer
                doc.setFontSize(8);
                doc.setTextColor(180);
                doc.text('Készült a DiákZóna Totó Készítővel - diakzona.hu', pageW / 2, 288, { align: 'center' });
            };

            renderPage(false);
            doc.addPage();
            renderPage(true);

            doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
        } catch (err) {
            console.error(err);
            setAiError('Hiba a PDF generálása során');
        } finally {
            setIsExporting(false);
        }
    };

    if (authLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 border border-white/20 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Vissza
                </Button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"><Trophy className="w-8 h-8" /></div>
                    <div>
                        <h2 className="text-2xl font-black italic">Totó Készítő</h2>
                        <p className="text-white/80 text-sm font-medium">Alkoss egyedi 13+1-es kvízeket rejtett megfejtéssel!</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Editor */}
                <div className="space-y-4">
                    {/* AI Panel */}
                    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl relative overflow-hidden">
                        <div className="relative z-10 space-y-3">
                            <h3 className="font-bold text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> AI Generálás</h3>
                            <input 
                                type="text" placeholder="Témakör (pl. 4. osztályos környezetismeret)" 
                                value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                            />
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Kérdések száma</label>
                                    <input type="number" value={aiQuestionCount} onChange={e => setAiQuestionCount(Number(e.target.value))} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-white" />
                                </div>
                                <Button 
                                    onClick={() => user ? generateWithAI() : setIsAuthModalOpen(true)} 
                                    disabled={aiLoading} 
                                    className="h-12 mt-4 flex-1 bg-gradient-to-r from-amber-500 to-orange-500 font-bold"
                                >
                                    {aiLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />} Generálás
                                </Button>
                            </div>
                            {!user && <p className="text-[10px] text-amber-400 font-bold text-center">🔒 Jelentkezz be az AI használatához!</p>}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                        <input 
                            type="text" placeholder="Totó címe" value={title} onChange={e => setTitle(e.target.value)}
                            className="w-full text-lg font-bold border-none focus:ring-0 p-0"
                        />
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Rejtett Megfejtés</label>
                            <input 
                                type="text" placeholder="pl. VAKÁCIÓ" value={solutionWord} onChange={e => setSolutionWord(e.target.value.toUpperCase())}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-mono font-bold"
                            />
                            <div className="flex gap-2">
                                <Button 
                                    variant={isTopToBottom ? 'default' : 'outline'} size="sm" onClick={() => setIsTopToBottom(true)}
                                    className="flex-1 text-[10px] h-8"
                                >
                                    <ChevronDown className="w-3 h-3 mr-1" /> Fentről lefelé
                                </Button>
                                <Button 
                                    variant={!isTopToBottom ? 'default' : 'outline'} size="sm" onClick={() => setIsTopToBottom(false)}
                                    className="flex-1 text-[10px] h-8"
                                >
                                    <ChevronUp className="w-3 h-3 mr-1" /> Lentről fölfelé
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Trophy className="w-3 h-3" /> PDF Elosztás (Csoportok száma)
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(num => (
                                    <Button
                                        key={num}
                                        variant={groupCount === num ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setGroupCount(num)}
                                        className="flex-1 text-xs h-9 font-bold"
                                    >
                                        {num}
                                    </Button>
                                ))}
                            </div>
                            <p className="text-[9px] text-slate-400">A kérdéseket ennyi oszlopba rendezi a PDF-ben, hogy könnyebb legyen szétosztani.</p>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Kérdések ({questions.length})</h3>
                            <Button size="sm" onClick={addQuestion} className="bg-amber-500 hover:bg-amber-600 text-[10px] h-7"><Plus className="w-3 h-3 mr-1" /> Új kérdés</Button>
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {questions.map((q, qIdx) => (
                                <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 relative group">
                                    <button onClick={() => removeQuestion(q.id)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-[10px] font-black">{qIdx + 1}</div>
                                        <input 
                                            value={q.question} onChange={e => updateQuestionField(q.id, 'question', e.target.value)}
                                            placeholder="Kérdés szövege..." className="flex-1 bg-transparent border-b border-slate-200 focus:border-amber-500 transition-all text-sm outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {q.options.map((opt, oIdx) => (
                                            <div key={oIdx} className="space-y-1">
                                                <div className="flex items-center gap-1">
                                                    <input 
                                                        type="radio" name={`correct-${q.id}`} checked={q.correctAnswerIndex === oIdx} 
                                                        onChange={() => updateQuestionField(q.id, 'correctAnswerIndex', oIdx)}
                                                        className="w-3 h-3 text-amber-500"
                                                    />
                                                    <span className="text-[10px] font-bold text-slate-400">{oIdx === 2 ? 'X' : oIdx + 1}</span>
                                                </div>
                                                <input 
                                                    value={opt} onChange={e => updateOption(q.id, oIdx, e.target.value)}
                                                    placeholder="Válasz..." className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setShowPreview(!showPreview)}>
                            <Eye className="w-4 h-4 mr-2" /> {showPreview ? 'Szerkesztés' : 'Előnézet'}
                        </Button>
                        <Button className="flex-1 bg-amber-500 hover:bg-amber-600" onClick={downloadPDF} disabled={!isValid || isExporting}>
                            {isExporting ? <Loader2 className="animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} PDF Letöltés
                        </Button>
                    </div>

                    {aiError && <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {aiError}</p>}
                </div>

                {/* Right: Preview */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center">
                    <div className="w-full max-w-[400px] aspect-[210/297] bg-white shadow-2xl border border-slate-200 rounded-sm p-8 overflow-hidden flex flex-col">
                        <h4 className="text-center font-black text-amber-600 text-xl italic mb-1">{title}</h4>
                        <p className="text-[8px] text-center text-slate-400 mb-6 font-medium">TOTÓ - 13+1 KÉRDÉSES KVÍZ</p>
                        
                        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                            {questions.map((q, qIdx) => (
                                <div key={q.id} className="flex gap-2">
                                    <span className="text-[8px] font-bold text-slate-400 w-3">{qIdx + 1}.</span>
                                    <div className="flex-1 grid grid-cols-3 gap-1">
                                        {[0,1,2].map(oIdx => {
                                            const isCorrect = q.correctAnswerIndex === oIdx;
                                            // ONLY SHOW LETTER IF solutionWord exists
                                            const char = solutionWord ? (isCorrect ? getSolutionChar(qIdx) : q.randomLetters[oIdx]) : '';
                                            return (
                                                <div key={oIdx} className="h-6 border border-slate-200 rounded-sm relative flex items-center px-1 bg-slate-50/50">
                                                    <span className="text-[6px] text-slate-600 truncate max-w-[80%]">
                                                        {q.options[oIdx] || '...'}
                                                    </span>
                                                    {char && (
                                                        <span className="absolute bottom-0.5 right-0.5 text-[5px] font-black text-slate-300">
                                                            {char}
                                                        </span>
                                                    )}
                                                    {isCorrect && showPreview && (
                                                        <div className="absolute inset-0 border border-green-400 bg-green-400/5 rounded-sm" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[6px] text-slate-300 font-bold uppercase tracking-widest">DIÁKZÓNA.HU</span>
                                <span className="text-[6px] text-slate-400 font-bold">MEGOLDÁS SÁV</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-0.5">
                                {questions.map((_, i) => (
                                    <div key={i} className="flex flex-col flex-1 min-w-[12px]">
                                        <div className="h-2 bg-slate-50 border border-slate-200 border-b-0 flex items-center justify-center">
                                            <span className="text-[4px] font-bold text-slate-400">{i + 1}</span>
                                        </div>
                                        <div className="h-4 border border-slate-200 flex items-center justify-center bg-white">
                                            {showPreview && (
                                                <span className={`font-black ${solutionWord ? 'text-[6px] text-amber-600' : 'text-[5px] text-slate-400'}`}>
                                                    {getSolutionChar(i)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setQuestions(updateNoiseLetters(questions))} className="text-slate-400 hover:text-amber-500 text-[10px]">
                            <RotateCcw className="w-3 h-3 mr-1" /> Véletlen betűk újragenerálása
                        </Button>
                        {!solutionWordMatch && (
                            <p className="text-[10px] text-amber-600 font-bold animate-pulse">
                                ⚠️ A megfejtés hossza ({solutionWord.replace(/\s+/g, '').length}) nem egyezik a kérdésekkel ({questions.length})!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
