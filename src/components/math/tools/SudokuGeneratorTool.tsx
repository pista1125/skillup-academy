import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Download,
    Eye,
    Sparkles,
    Settings2,
    RefreshCw,
    Info,
    Grid3X3,
    FileText,
    DownloadCloud,
    Key,
    Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { generateSudoku, SudokuType, SudokuDifficulty } from '@/lib/sudokuUtils';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

interface SudokuGeneratorToolProps {
    onBack: () => void;
}

type Quantity = 1 | 2 | 4 | 6;

export function SudokuGeneratorTool({ onBack }: SudokuGeneratorToolProps) {
    const [type, setType] = useState<SudokuType>('classic');
    const [difficulty, setDifficulty] = useState<SudokuDifficulty>('medium');
    const [quantity, setQuantity] = useState<Quantity>(1);
    const [previewPuzzle, setPreviewPuzzle] = useState<{ board: number[][]; solution: number[][] } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user } = useAuth();

    // Initial preview
    useEffect(() => {
        refreshPreview();
    }, [type, difficulty]);

    const refreshPreview = () => {
        const p = generateSudoku(type, difficulty);
        setPreviewPuzzle(p);
    };

    const pdfSanitize = (text: string) => {
        if (!text) return '';
        return text
            .replace(/ő/g, 'ö').replace(/Ő/g, 'Ö')
            .replace(/ű/g, 'ü').replace(/Ű/g, 'Ü')
            .replace(/–/g, '-');
    };

    const downloadPDF = () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        setIsGenerating(true);

        // Use a timeout to allow the UI to update the loading state
        setTimeout(() => {
            try {
                const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                const pageW = 210;
                const marginX = 20;
                const contentW = pageW - marginX * 2;

                // Collect puzzles for the PDF
                const puzzles = Array.from({ length: quantity }, () => generateSudoku(type, difficulty));

                const renderSudokuPage = (isSolution: boolean) => {
                    // Header
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(22);
                    doc.setTextColor(37, 99, 235); // Blue-600
                    const title = `Sudoku ${type === 'classic' ? 'Klasszikus' : type === 'extreme' ? 'Extrém-X' : type === 'mini6' ? 'Junior 6x6' : 'Mini 4x4'}`;
                    doc.text(pdfSanitize(title), pageW / 2, 20, { align: 'center' });

                    if (isSolution) {
                        doc.setFontSize(10);
                        doc.setTextColor(219, 39, 119); // Pink-600
                        doc.text('MEGOLDÓKULCS - TANÁRI PÉLDÁNY', pageW / 2, 27, { align: 'center' });
                    }

                    doc.setTextColor(120, 120, 120);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    const diffText = `Nehézség: ${difficulty === 'easy' ? 'Könnyű' : difficulty === 'medium' ? 'Közepes' : difficulty === 'hard' ? 'Nehéz' : 'Profi'}`;
                    doc.text(pdfSanitize(diffText), pageW / 2, isSolution ? 32 : 27, { align: 'center' });

                    // Grid Layout Logic
                    let cols = 1;
                    let rows = 1;
                    if (quantity === 2) { rows = 2; }
                    else if (quantity === 4) { cols = 2; rows = 2; }
                    else if (quantity === 6) { cols = 2; rows = 3; }

                    const availableH = 240;
                    const gridStartY = 45;
                    const cellW = contentW / cols;
                    const cellH = availableH / rows;
                    const sudokuPadding = 10;
                    const sudokuSize = Math.min(cellW - sudokuPadding * 2, cellH - sudokuPadding * 2);

                    puzzles.forEach((p, idx) => {
                        const colIdx = idx % cols;
                        const rowIdx = Math.floor(idx / cols);
                        const centerX = marginX + colIdx * cellW + cellW / 2;
                        const centerY = gridStartY + rowIdx * cellH + cellH / 2;

                        const startX = centerX - sudokuSize / 2;
                        const startY = centerY - sudokuSize / 2;

                        const boardToRender = isSolution ? p.solution : p.board;
                        const size = boardToRender.length;
                        const subW = type === 'mini4' ? 2 : type === 'mini6' ? 3 : 3;
                        const subH = type === 'mini4' ? 2 : type === 'mini6' ? 2 : 3;
                        const cellSize = sudokuSize / size;

                        // Puzzle Title
                        doc.setFont('helvetica', 'bold');
                        doc.setFontSize(10);
                        doc.setTextColor(100, 100, 100);
                        doc.text(`${idx + 1}. feladvány`, startX, startY - 3);

                        // Draw Grid
                        doc.setDrawColor(200, 200, 200);
                        doc.setLineWidth(0.1);

                        for (let r = 0; r < size; r++) {
                            for (let c = 0; c < size; c++) {
                                const x = startX + c * cellSize;
                                const y = startY + r * cellSize;

                                // Color diagonal for extreme
                                if (type === 'extreme' && (r === c || r + c === size - 1)) {
                                    doc.setFillColor(255, 241, 242); // Rose-50
                                    doc.rect(x, y, cellSize, cellSize, 'F');
                                }

                                doc.rect(x, y, cellSize, cellSize);

                                const val = boardToRender[r][c];
                                if (val !== 0) {
                                    const isInitial = p.board[r][c] !== 0;
                                    doc.setFont('helvetica', isInitial ? 'bold' : 'normal');
                                    doc.setFontSize(cellSize * 2);
                                    doc.setTextColor(isInitial ? 0 : 79); // Black or Indigo-ish
                                    if (!isInitial && isSolution) doc.setTextColor(79, 70, 229);
                                    doc.text(val.toString(), x + cellSize / 2, y + cellSize / 2 + cellSize * 0.35, { align: 'center' });
                                }
                            }
                        }

                        // Thick borders
                        doc.setDrawColor(0, 0, 0);
                        doc.setLineWidth(0.5);
                        doc.rect(startX, startY, sudokuSize, sudokuSize);

                        // Subgrid lines
                        for (let i = 1; i < size / subW; i++) {
                            const x = startX + i * subW * cellSize;
                            doc.line(x, startY, x, startY + sudokuSize);
                        }
                        for (let i = 1; i < size / subH; i++) {
                            const y = startY + i * subH * cellSize;
                            doc.line(startX, y, startX + sudokuSize, y);
                        }
                    });

                    // Footer
                    doc.setFontSize(8);
                    doc.setTextColor(180, 180, 180);
                    doc.text(pdfSanitize('Készült a DiákZóna Sudoku Generátorral - diakzona.hu'), pageW / 2, 285, { align: 'center' });
                };

                // Page 1: Puzzles
                renderSudokuPage(false);

                // Page 2: Solutions
                doc.addPage();
                renderSudokuPage(true);

                doc.save(`Sudoku_${type}_${difficulty}_${quantity}db.pdf`);
                setIsGenerating(false);
            } catch (err) {
                console.error('PDF generation error:', err);
                setIsGenerating(false);
            }
        }, 100);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-2xl opacity-30" />

                <div className="relative z-10">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="text-white hover:bg-white/20 border border-white/20 mb-6 rounded-xl backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza az eszközökhöz
                    </Button>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md shadow-inner">
                            <Grid3X3 className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight mb-2">Sudoku Generátor</h2>
                            <p className="text-blue-100 text-lg font-medium opacity-90">
                                Készíts egyedi Sudoku feladványokat és nyomtasd ki PDF-ben!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Configuration Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Settings2 className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Beállítások</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Type Selection */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Sudoku Típus</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: 'classic', label: 'Klasszikus 9x9', icon: '🔢' },
                                        { id: 'extreme', label: 'Extrém-X 9x9', icon: '⚡' },
                                        { id: 'mini6', label: 'Junior 6x6', icon: '👦' },
                                        { id: 'mini4', label: 'Mini 4x4', icon: '👶' },
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setType(t.id as SudokuType)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all",
                                                type === t.id
                                                    ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-md shadow-blue-500/10"
                                                    : "border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200"
                                            )}
                                        >
                                            <span className="text-xl">{t.icon}</span>
                                            <span className="text-sm">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Nehézség</label>
                                <div className="flex flex-wrap gap-2">
                                    {(['easy', 'medium', 'hard', 'expert'] as SudokuDifficulty[]).map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setDifficulty(d)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all",
                                                difficulty === d
                                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                    : "border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200"
                                            )}
                                        >
                                            {d === 'easy' ? 'Könnyű' : d === 'medium' ? 'Közepes' : d === 'hard' ? 'Nehéz' : 'Profi'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mennyiség a PDF-ben</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {([1, 2, 4, 6] as Quantity[]).map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => setQuantity(q)}
                                            className={cn(
                                                "py-3 rounded-xl text-sm font-bold border-2 transition-all",
                                                quantity === q
                                                    ? "border-violet-500 bg-violet-50 text-violet-700"
                                                    : "border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200"
                                            )}
                                        >
                                            {q} db
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <Button
                                onClick={downloadPDF}
                                disabled={isGenerating}
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-lg shadow-lg shadow-blue-500/20 gap-3"
                            >
                                {isGenerating ? <RefreshCw className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        {!user ? <Key className="w-6 h-6" /> : <DownloadCloud className="w-6 h-6" />}
                                        PDF Generálása
                                    </>
                                )}
                            </Button>
                            {!user && (
                                <p className="text-[10px] text-amber-600 text-center mt-3 font-bold uppercase tracking-wider">
                                    🔒 Jelentkezz be a letöltéshez!
                                </p>
                            )}
                            <p className="text-[10px] text-slate-400 text-center mt-1 font-medium">
                                A PDF tartalmazni fogja a feladványokat és a megoldókulcsot is külön oldalon.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-800 text-sm mb-1">Tipp Tanároknak</h4>
                            <p className="text-xs text-blue-600/80 leading-relaxed font-menu font-medium">
                                A Generált feladatlapokat kinyomtathatod és kioszthatod a diákoknak. A 4 vagy 6 darabos elrendezés segít spórolni a papírral!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 min-h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Előnézet</h3>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={refreshPreview}
                                className="rounded-xl border-slate-200 gap-2 font-bold text-xs"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Frissítés
                            </Button>
                        </div>

                        {/* Paper Preview */}
                        <div className="flex-1 flex items-center justify-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <FileText className="w-20 h-20 text-slate-100" />
                            </div>

                            {previewPuzzle && (
                                <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-6 border border-slate-200 animate-in fade-in zoom-in duration-500">
                                    <div className="text-center mb-6">
                                        <h4 className="font-black text-slate-800 text-xl mb-1">Sudoku Feladvány</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{type} • {difficulty}</p>
                                    </div>

                                    <div
                                        className={cn(
                                            "grid gap-px bg-slate-800 border-2 border-slate-800 rounded-lg overflow-hidden mx-auto",
                                            type === 'mini4' ? "grid-cols-4 w-48 h-48" :
                                                type === 'mini6' ? "grid-cols-6 w-60 h-40" :
                                                    "grid-cols-9 w-64 h-64 sm:w-80 sm:h-80"
                                        )}
                                    >
                                        {previewPuzzle.board.map((row, r) =>
                                            row.map((val, c) => {
                                                const size = previewPuzzle.board.length;
                                                const subW = type === 'mini4' ? 2 : type === 'mini6' ? 3 : 3;
                                                const subH = type === 'mini4' ? 2 : type === 'mini6' ? 2 : 3;
                                                const isDiagonal = type === 'extreme' && (r === c || r + c === size - 1);

                                                return (
                                                    <div
                                                        key={`${r}-${c}`}
                                                        className={cn(
                                                            "flex items-center justify-center font-bold bg-white text-slate-800 relative",
                                                            type === 'mini4' ? "text-xl" : type === 'mini6' ? "text-lg" : "text-base",
                                                            (c + 1) % subW === 0 && c < size - 1 && "border-r-2 border-r-slate-800",
                                                            (r + 1) % subH === 0 && r < size - 1 && "border-b-2 border-b-slate-800",
                                                            isDiagonal && "bg-rose-50/50"
                                                        )}
                                                    >
                                                        {val !== 0 ? val : ""}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Ezekkel a beállításokkal nyomtatunk</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}
