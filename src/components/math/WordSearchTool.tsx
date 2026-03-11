import React, { useState, useRef, useEffect } from 'react';
import { 
    Grid2X2, 
    Plus, 
    Trash2, 
    Download, 
    Settings,
    Eye,
    EyeOff
} from 'lucide-react';
import { notoSansRegularBase64 } from '@/assets/fonts/NotoSans-Regular-base64';
import { notoSansBoldBase64 } from '@/assets/fonts/NotoSans-Bold-base64';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import jsPDF from 'jspdf';
// ----------------------------------------------------------------------
// Types & Algorithms
// ----------------------------------------------------------------------

type Direction = 'RIGHT' | 'LEFT' | 'DOWN' | 'UP';
const ALL_DIRECTIONS: Direction[] = ['RIGHT', 'LEFT', 'DOWN', 'UP'];

interface PlacedWord {
    word: string;
    row: number;
    col: number;
    dir: Direction;
}

interface GridCell {
    letter: string;
    isPartOfWord: boolean;
}

const HUNGARIAN_ALPHABET = "AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZ";

const generateRandomLetter = () => {
    return HUNGARIAN_ALPHABET[Math.floor(Math.random() * HUNGARIAN_ALPHABET.length)];
};

const getDirOffsets = (dir: Direction) => {
    switch (dir) {
        case 'RIGHT': return { dr: 0, dc: 1 };
        case 'LEFT':  return { dr: 0, dc: -1 };
        case 'DOWN':  return { dr: 1, dc: 0 };
        case 'UP':    return { dr: -1, dc: 0 };
    }
};

const canPlaceWord = (grid: GridCell[][], word: string, row: number, col: number, dir: Direction): boolean => {
    const height = grid.length;
    const width = grid[0].length;
    const { dr, dc } = getDirOffsets(dir);

    for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;

        if (r < 0 || r >= height || c < 0 || c >= width) return false;
        if (grid[r][c].letter !== '' && grid[r][c].letter !== word[i]) return false;
    }
    return true;
};

const placeWord = (grid: GridCell[][], word: string, row: number, col: number, dir: Direction) => {
    const { dr, dc } = getDirOffsets(dir);
    for (let i = 0; i < word.length; i++) {
        const r = row + i * dr;
        const c = col + i * dc;
        grid[r][c] = { letter: word[i], isPartOfWord: true };
    }
};

export function WordSearchTool() {
    // ----------------------------------------------------------------------
    // State
    // ----------------------------------------------------------------------
    const [words, setWords] = useState<string[]>(['MATEK', 'ISKOLA', 'TANÁR', 'DIÁK']);
    const [newWord, setNewWord] = useState('');
    const [gridWidth, setGridWidth] = useState<number>(10);
    const [gridHeight, setGridHeight] = useState<number>(10);
    const [showSolution, setShowSolution] = useState<boolean>(true);
    
    const [grid, setGrid] = useState<GridCell[][]>([]);
    const [placedWordsList, setPlacedWordsList] = useState<string[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState<boolean>(false);

    // ----------------------------------------------------------------------
    // Handlers
    // ----------------------------------------------------------------------
    const handleAddWord = () => {
        const upper = newWord.trim().toUpperCase().replace(/[^A-ZÁÉÍÓÖŐÚÜŰ]/g, '');
        if (upper && !words.includes(upper)) {
            setWords([...words, upper]);
            setNewWord('');
        }
    };

    const handleRemoveWord = (wordToRemove: string) => {
        setWords(words.filter(w => w !== wordToRemove));
    };

    // ----------------------------------------------------------------------
    // Generation Logic
    // ----------------------------------------------------------------------
    const generateGrid = () => {
        setErrorMsg(null);
        
        // Validation: Is any word longer than the maximum possible dimension?
        const maxDim = Math.max(gridWidth, gridHeight);
        for (const w of words) {
            if (w.length > maxDim) {
                setErrorMsg(`A "${w}" szó túl hosszú a jelenlegi rácshoz (${maxDim} mező). Növeld a méretet!`);
                setGrid([]);
                setPlacedWordsList([]);
                return;
            }
        }

        // Initialize empty grid
        const newGrid: GridCell[][] = Array.from({ length: gridHeight }, () => 
            Array.from({ length: gridWidth }, () => ({ letter: '', isPartOfWord: false }))
        );

        // Sort words strictly by length descending (hardest first)
        const sortedWords = [...words].sort((a, b) => b.length - a.length);
        const placed: string[] = [];
        
        // To satisfy the 4 directions rule
        let usedDirections = new Set<Direction>();
        
        for (let i = 0; i < sortedWords.length; i++) {
            const word = sortedWords[i];
            let placedSuccessfully = false;
            let attempts = 0;
            const MAX_ATTEMPTS = 200;

            // Determine preferred direction for the first few words to ensure variety
            let preferredDir: Direction | null = null;
            if (sortedWords.length >= 4 && i < 4) {
                // Try to assign a unique direction to the first 4 words
                const unused = ALL_DIRECTIONS.filter(d => !usedDirections.has(d));
                if (unused.length > 0) {
                    preferredDir = unused[Math.floor(Math.random() * unused.length)];
                }
            }

            while (!placedSuccessfully && attempts < MAX_ATTEMPTS) {
                const row = Math.floor(Math.random() * gridHeight);
                const col = Math.floor(Math.random() * gridWidth);
                
                // If we have a preferred direction, try that first for some attempts
                let dir = preferredDir && attempts < 50 
                    ? preferredDir 
                    : ALL_DIRECTIONS[Math.floor(Math.random() * ALL_DIRECTIONS.length)];

                // Check bounds for this specific word length + direction
                // (optimization to avoid calling canPlaceWord uselessly)
                const { dr, dc } = getDirOffsets(dir);
                const endR = row + (word.length - 1) * dr;
                const endC = col + (word.length - 1) * dc;
                
                if (endR >= 0 && endR < gridHeight && endC >= 0 && endC < gridWidth) {
                     if (canPlaceWord(newGrid, word, row, col, dir)) {
                        placeWord(newGrid, word, row, col, dir);
                        placedSuccessfully = true;
                        placed.push(word);
                        usedDirections.add(dir);
                     }
                }
                attempts++;
            }

            if (!placedSuccessfully) {
                setErrorMsg(`Nem sikerült minden szót elhelyezni (pl. "${word}"). Túl sok a szó a megadott mérethez, növeld a rács méretét!`);
                setGrid([]);
                setPlacedWordsList([]);
                return;
            }
        }

        // Fill empty spaces with random letters
        for (let r = 0; r < gridHeight; r++) {
            for (let c = 0; c < gridWidth; c++) {
                if (newGrid[r][c].letter === '') {
                    newGrid[r][c] = { letter: generateRandomLetter(), isPartOfWord: false };
                }
            }
        }

        setGrid(newGrid);
        setPlacedWordsList(placed.sort());
        setShowSolution(true); // Default to showing solution so teacher sees they were placed
    };

    // Auto-generate on mount or size changes if reasonable initially
    useEffect(() => {
        if (words.length > 0) {
            generateGrid();
        }
    }, []);

    // ----------------------------------------------------------------------
    // PDF Export
    // ----------------------------------------------------------------------
    const exportToPDF = async () => {
        if (grid.length === 0) return;
        setIsExporting(true);

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            pdf.addFileToVFS('NotoSans-Regular.ttf', notoSansRegularBase64);
            pdf.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
            
            pdf.addFileToVFS('NotoSans-Bold.ttf', notoSansBoldBase64);
            pdf.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');

            const MARGIN = 20;
            const PAGE_WIDTH = pdf.internal.pageSize.getWidth();
            const PAGE_HEIGHT = pdf.internal.pageSize.getHeight();

            const fixText = (text: string) => {
                return pdf.splitTextToSize(text, 1000)[0] || '';
            };

            const drawPage = (isSolution: boolean, titleStr: string) => {
                pdf.setTextColor(51, 65, 85);
                pdf.setFont("NotoSans", "bold");
                pdf.setFontSize(22);
                pdf.text(fixText(titleStr), PAGE_WIDTH / 2, MARGIN + 10, { align: 'center' });

            const MAX_GRID_WIDTH = PAGE_WIDTH - (MARGIN * 2);
            const cellSizeRaw = Math.min(MAX_GRID_WIDTH / gridWidth, 14);
            const cellSize = Math.max(cellSizeRaw, 5);

            const totalGridWidth = cellSize * gridWidth;
            const startX = (PAGE_WIDTH - totalGridWidth) / 2;
            const startY = MARGIN + 25;

            const gridFontSize = cellSize * 1.8;

            for (let r = 0; r < gridHeight; r++) {
                for (let c = 0; c < gridWidth; c++) {
                    const x = startX + (c * cellSize);
                    const y = startY + (r * cellSize);
                    const cell = grid[r][c];

                    pdf.setDrawColor(100, 100, 100);
                    
                    if (isSolution && cell.isPartOfWord) {
                        pdf.setFillColor(34, 197, 94);
                    } else {
                        pdf.setFillColor(255, 255, 255);
                    }
                    
                    pdf.setLineWidth(0.2);
                    pdf.rect(x, y, cellSize, cellSize, 'FD');

                    if (isSolution && cell.isPartOfWord) {
                        pdf.setTextColor(255, 255, 255);
                        pdf.setFont("NotoSans", "bold");
                    } else {
                        pdf.setTextColor(51, 65, 85);
                        pdf.setFont("NotoSans", "normal");
                    }
                    
                    pdf.setFontSize(gridFontSize);
                    const textY = y + (cellSize * 0.70); 
                    pdf.text(fixText(cell.letter), x + (cellSize / 2), textY, { align: 'center' });
                }
            }

            const wordBankY = startY + (gridHeight * cellSize) + 15;
            pdf.setTextColor(51, 65, 85);
            pdf.setFont("NotoSans", "bold");
            pdf.setFontSize(14);
            pdf.text(fixText("Keresd meg az alábbi szavakat:"), MARGIN, wordBankY);

            pdf.setFont("NotoSans", "normal");
            pdf.setFontSize(12);
            let currentY = wordBankY + 10;
            const colWidth = (PAGE_WIDTH - (MARGIN * 2)) / 3;

            placedWordsList.forEach((w, index) => {
                const colNum = index % 3;
                if (index > 0 && colNum === 0) {
                    currentY += 8;
                }
                pdf.text(fixText(w), MARGIN + (colNum * colWidth), currentY);
            });

            const footerY = PAGE_HEIGHT - 10;
            pdf.setTextColor(180, 180, 180);
            pdf.setFont("NotoSans", "normal");
            pdf.setFontSize(8);
            pdf.text(fixText('Készült a DiákZóna Szókereső Készítő alkalmazásával - diakzona.hu'), PAGE_WIDTH / 2, footerY, { align: 'center' });
        };

        drawPage(false, 'Szókereső');
        pdf.addPage();
        drawPage(true, 'Szókereső - Megoldókulcs');

        pdf.save('szokereso_feladat.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            setErrorMsg('Hiba tortént a letoltés soran.');
        } finally {
            setIsExporting(false);
        }
    };

    // ----------------------------------------------------------------------
    // UI Render
    // ----------------------------------------------------------------------
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            <Grid2X2 className="w-8 h-8" />
                            Szókereső Készítő
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Készíts egyedi méretű és szókészletű szókeresőket differenciált oktatáshoz.
                        </p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* LEFT COLUMN - CONTROLS */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Settings */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
                            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-indigo-500" />
                                Rács Mérete
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Oszlopok (Szélesség)</label>
                                    <Input 
                                        type="number" 
                                        min={3} max={30} 
                                        value={gridWidth} 
                                        onChange={(e) => setGridWidth(parseInt(e.target.value) || 10)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Sorok (Magasság)</label>
                                    <Input 
                                        type="number" 
                                        min={3} max={30} 
                                        value={gridHeight} 
                                        onChange={(e) => setGridHeight(parseInt(e.target.value) || 10)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Word List */}
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
                            <h3 className="text-lg font-bold text-slate-700 flex items-center justify-between">
                                Keresendő Szavak
                                <span className="bg-indigo-100 text-indigo-700 text-xs py-1 px-2 rounded-full">
                                    {words.length} db
                                </span>
                            </h3>
                            
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="IDE ÍRD A SZÓT..."
                                    value={newWord}
                                    onChange={(e) => setNewWord(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
                                    className="uppercase font-semibold"
                                />
                                <Button onClick={handleAddWord} className="bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                                {words.map((w, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white border p-2 rounded-lg shadow-sm">
                                        <span className="font-bold text-slate-700 tracking-wider pl-2">{w}</span>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveWord(w)} className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                {words.length === 0 && (
                                    <p className="text-sm text-slate-400 italic text-center py-4">Nincsenek szavak hozzáadva.</p>
                                )}
                            </div>
                        </div>

                        <Button 
                            onClick={generateGrid}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-md"
                            disabled={words.length === 0}
                        >
                            <Grid2X2 className="w-5 h-5 mr-2" />
                            Szókereső Generálása
                        </Button>
                        
                        {errorMsg && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-red-700 text-sm">
                                {errorMsg}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN - PREVIEW */}
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Előnézet</h3>
                            
                            {grid.length > 0 && (
                                <div className="flex gap-3">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setShowSolution(!showSolution)}
                                        className="border-slate-300 text-slate-600 focus:ring-0"
                                    >
                                        {showSolution ? <><EyeOff className="w-4 h-4 mr-2" /> Megoldás Elrejtése</> : <><Eye className="w-4 h-4 mr-2" /> Megoldás Mutatása</>}
                                    </Button>
                                    <Button 
                                        onClick={exportToPDF}
                                        className="bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                                        disabled={isExporting}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        {isExporting ? 'Készítés...' : 'Letöltés (PDF + Kulcs)'}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex-1 flex flex-col items-center justify-center overflow-auto min-h-[500px]">
                            {grid.length === 0 ? (
                                <div className="text-center text-slate-400">
                                    <Grid2X2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Állítsd be a paramétereket és kattints a "Generálás" gombra!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-8">
                                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))` }}>
                                        {grid.map((row, rIdx) => 
                                            row.map((cell, cIdx) => (
                                                <div 
                                                    key={`${rIdx}-${cIdx}`}
                                                    className={`
                                                        w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-black rounded-md transition-all
                                                        ${showSolution && cell.isPartOfWord 
                                                            ? 'bg-green-100 text-green-700 shadow-sm ring-1 ring-green-300' 
                                                            : 'bg-white text-slate-600 border border-slate-200'}
                                                    `}
                                                >
                                                    {cell.letter}
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Word Bank Preview */}
                                    <div className="w-full max-w-2xl bg-white p-6 rounded-xl border shadow-sm">
                                        <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">Keresd meg ezeket:</h4>
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {placedWordsList.map((w, idx) => (
                                                <span key={idx} className="font-bold tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                                                    {w}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
