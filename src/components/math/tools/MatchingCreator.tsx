import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Download,
    Eye,
    Sparkles,
    Loader2,
    AlertCircle,
    RotateCcw,
    Puzzle,
    CheckCircle2,
    Variable,
    ImageIcon,
    FileText,
    Sigma,
    Upload
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { toPng } from 'html-to-image';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { notoSansRegularBase64 } from '@/assets/fonts/NotoSans-Regular-base64';
import { notoSansBoldBase64 } from '@/assets/fonts/NotoSans-Bold-base64';
import { toast } from 'sonner';

export type MatchingItemType = 'text' | 'math' | 'image';

interface MatchingPair {
    id: string;
    a: string;
    aType: MatchingItemType;
    b: string;
    bType: MatchingItemType;
}

interface GridItem {
    id: string;
    content: string;
    type: MatchingItemType;
    pairId: string;
    side: 'a' | 'b';
    gridPos?: string; 
}

interface MatchingCreatorProps {
    onBack: () => void;
}

const MAX_PAIRS = 10;
const MIN_PAIRS = 2;

const sanitizeLatex = (tex: string) => {
    if (!tex) return '';
    // Fix common character encoding issues where \f, \n, \t are interpreted as control chars
    return tex
        .replace(/\u000c/g, '\\f')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ');
};

const MathRenderer = ({ tex, className }: { tex: string, className?: string }) => {
    try {
        const sanitized = sanitizeLatex(tex);
        const html = katex.renderToString(sanitized, {
            throwOnError: false,
            displayMode: false
        });
        return <span className={cn("inline-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
        return <span className={className}>{tex}</span>;
    }
};

export function MatchingCreator({ onBack }: MatchingCreatorProps) {
    const { user, loading: authLoading } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [pairs, setPairs] = useState<MatchingPair[]>([
        { id: '1', a: '', aType: 'math', b: '', bType: 'text' },
        { id: '2', a: '', aType: 'math', b: '', bType: 'text' },
        { id: '3', a: '', aType: 'math', b: '', bType: 'text' }
    ]);
    const [title, setTitle] = useState('Párosító Feladat');
    const [solution, setSolution] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [shuffledItems, setShuffledItems] = useState<GridItem[]>([]);

    const [aiTopic, setAiTopic] = useState('');
    const [aiPairCount, setAiPairCount] = useState(5);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState('');
    const [aiSuccess, setAiSuccess] = useState(false);

    const [isExporting, setIsExporting] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const hiddenRenderRef = useRef<HTMLDivElement>(null);

    // Grid configuration
    const cols = 4;
    const colLabels = ['A', 'B', 'C', 'D'];

    useEffect(() => {
        handleShuffle();
    }, [showPreview]);

    // Sync shuffledItems when pairs change
    useEffect(() => {
        if (shuffledItems.length === 0) return;

        setShuffledItems(prev => prev.map(item => {
            const pair = pairs.find(p => p.id === item.pairId);
            if (!pair) return item;
            
            const newContent = item.side === 'a' ? pair.a : pair.b;
            const newType = item.side === 'a' ? pair.aType : pair.bType;
            
            return { ...item, content: newContent, type: newType };
        }));
    }, [pairs]);

    const handleShuffle = () => {
        const validPairs = pairs.filter(p => p.a.trim() || p.b.trim());
        const items: GridItem[] = [];
        
        validPairs.forEach(p => {
            items.push({ id: `${p.id}-a`, content: p.a, type: p.aType, pairId: p.id, side: 'a' });
            items.push({ id: `${p.id}-b`, content: p.b, type: p.bType, pairId: p.id, side: 'b' });
        });

        // Shuffle
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        // Assign grid positions
        items.forEach((item, idx) => {
            const colIdx = idx % cols;
            const rowIdx = Math.floor(idx / cols) + 1;
            item.gridPos = `${colLabels[colIdx]}${rowIdx}`;
        });

        setShuffledItems(items);
    };

    const pairToSolutionMap = React.useMemo(() => {
        const map = new Map<string, string>();
        if (!solution.trim()) return map;
        // Map letters based on the order they appear in the recording sheet (Side A items)
        const sideAItems = shuffledItems.filter(it => it.side === 'a');
        sideAItems.forEach((it, i) => {
            map.set(it.pairId, solution[i % solution.length]?.toUpperCase() || '');
        });
        return map;
    }, [shuffledItems, solution]);

    const getSolutionChar = (pairId: string) => {
        return pairToSolutionMap.get(pairId) || '';
    };

    const addPair = () => {
        if (pairs.length >= MAX_PAIRS) return;
        setPairs([...pairs, { 
            id: Math.random().toString(36).substr(2, 9), 
            a: '', aType: 'math', 
            b: '', bType: 'text' 
        }]);
    };

    const removePair = (id: string) => {
        if (pairs.length <= MIN_PAIRS) return;
        setPairs(pairs.filter(p => p.id !== id));
    };

    const updatePair = (id: string, side: 'a' | 'b', value: string) => {
        setPairs(pairs.map(p => p.id === id ? { ...p, [side]: value } : p));
    };

    const insertFraction = (id: string, side: 'a' | 'b') => {
        const pair = pairs.find(p => p.id === id);
        if (!pair) return;
        const currentVal = side === 'a' ? pair.a : pair.b;
        updatePair(id, side, currentVal + '\\frac{}{}');
    };

    const updatePairType = (id: string, side: 'a' | 'b', type: MatchingItemType) => {
        const typeKey = side === 'a' ? 'aType' : 'bType';
        setPairs(pairs.map(p => p.id === id ? { ...p, [typeKey]: type } : p));
    };

    const processImageFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (id: string, side: 'a' | 'b', file: File) => {
        try {
            const base64 = await processImageFile(file);
            updatePair(id, side, base64);
            updatePairType(id, side, 'image');
        } catch (err) {
            toast.error('Hiba a kép feldolgozása során');
        }
    };

    const handlePaste = async (id: string, side: 'a' | 'b', e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                    e.preventDefault();
                    await handleImageUpload(id, side, file);
                }
            }
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
            const { data, error } = await supabase.functions.invoke('generate-matching-pairs', {
                body: { topic: aiTopic.trim(), pairCount: aiPairCount },
            });

            if (error) throw new Error(error.message || 'Hiba az AI hívás során');
            if (!data.pairs) throw new Error('Érvénytelen válasz az AI-tól');

            const newPairs: MatchingPair[] = data.pairs.map((p: any) => ({
                id: Math.random().toString(36).substr(2, 9),
                a: p.a,
                aType: p.aType || (p.a?.includes('\\') ? 'math' : 'text'),
                b: p.b,
                bType: p.bType || (p.b?.includes('\\') ? 'math' : 'text')
            }));

            setPairs(newPairs);
            if (data.title) setTitle(data.title);
            setAiSuccess(true);
            setTimeout(() => setAiSuccess(false), 3000);
        } catch (err: any) {
            setAiError(err.message || 'Ismeretlen hiba történt');
        } finally {
            setAiLoading(false);
        }
    };

    const downloadPDF = async () => {
        const validPairs = pairs.filter(p => p.a.trim() && p.b.trim());
        if (validPairs.length < MIN_PAIRS) {
            toast.error('Legalább 2 teljes pár szükséges!');
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
            
            const renderPage = async (isSolution: boolean) => {
                // ... same header as before ...
                doc.setFont('NotoSans', 'bold');
                doc.setTextColor(59, 130, 246);
                doc.setFontSize(22);
                doc.text(title, pageW / 2, 20, { align: 'center' });

                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.setFont('NotoSans', 'normal');
                doc.text('Párosítsd össze az összetartozó elemeket!', pageW / 2, 28, { align: 'center' });

                if (isSolution) {
                    doc.setTextColor(220, 38, 38);
                    doc.setFont('NotoSans', 'bold');
                    doc.text('MEGOLDÓKULCS', pageW / 2, 34, { align: 'center' });
                }

                const rowCount = Math.ceil(shuffledItems.length / cols);
                const gridX = marginX;
                const gridY = 45;
                const gridImageW = contentW;

                // Create a temporary container for the snapshot and append to BODY
                // Detached elements often cause missing styles/fonts in toPng
                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'fixed';
                tempContainer.style.left = '-9999px';
                tempContainer.style.top = '0';
                document.body.appendChild(tempContainer);

                try {
                    const style = document.createElement('style');
                    style.innerHTML = `
                        .pdf-grid { 
                            display: grid; 
                            grid-template-columns: 40px repeat(${cols}, 1fr); 
                            border-top: 2px solid black; 
                            border-left: 2px solid black; 
                            background: white;
                            width: 800px;
                        }
                        .pdf-cell { 
                            border-right: 2px solid black; 
                            border-bottom: 2px solid black; 
                            height: 100px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            padding: 10px;
                            font-family: 'Noto Sans', sans-serif;
                            overflow: hidden;
                        }
                        .pdf-header { background: #f8fafc; font-weight: bold; font-size: 24px; }
                        .pdf-side-label { background: #f8fafc; font-weight: bold; font-size: 24px; }
                        .pdf-content { font-weight: bold; font-size: 28px; text-align: center; }
                        .pdf-math { font-size: 42px; width: 100%; display: flex; justify-content: center; }
                    `;
                    tempContainer.appendChild(style);

                    const gridEl = document.createElement('div');
                    gridEl.className = 'pdf-grid';

                    // Header
                    const corner = document.createElement('div');
                    corner.className = 'pdf-cell pdf-header';
                    gridEl.appendChild(corner);

                    colLabels.forEach(l => {
                        const cell = document.createElement('div');
                        cell.className = 'pdf-cell pdf-header';
                        cell.innerText = l;
                        gridEl.appendChild(cell);
                    });

                    // Rows
                    for (let r = 0; r < rowCount; r++) {
                        const labelCell = document.createElement('div');
                        labelCell.className = 'pdf-cell pdf-side-label';
                        labelCell.innerText = `${r + 1}.`;
                        gridEl.appendChild(labelCell);

                        for (let c = 0; c < cols; c++) {
                            const idx = r * cols + c;
                            const item = shuffledItems[idx];
                            const cell = document.createElement('div');
                            cell.className = 'pdf-cell pdf-content';

                            if (item) {
                                if (item.type === 'math') {
                                    const sanitized = sanitizeLatex(item.content);
                                    const mathHtml = katex.renderToString(sanitized, { throwOnError: false });
                                    cell.innerHTML = `<div class="pdf-math">${mathHtml}</div>`;
                                } else if (item.type === 'image') {
                                    cell.innerHTML = `<img src="${item.content}" crossorigin="anonymous" style="max-width: 100%; max-height: 100%; object-fit: contain;" />`;
                                } else {
                                    cell.innerText = item.content;
                                }
                            }
                            gridEl.appendChild(cell);
                        }
                    }

                    tempContainer.appendChild(gridEl);

                    // Wait for images
                    const imgs = gridEl.querySelectorAll('img');
                    await Promise.all(Array.from(imgs).map(img => {
                        if (img.complete) return Promise.resolve();
                        return new Promise(res => { img.onload = res; img.onerror = res; });
                    }));

                    const dataUrl = await toPng(gridEl, { 
                        pixelRatio: 2, 
                        backgroundColor: 'white',
                        cacheBust: true 
                    });
                    const imgProps = doc.getImageProperties(dataUrl);
                    const pdfImgH = (imgProps.height * gridImageW) / imgProps.width;
                    
                    doc.addImage(dataUrl, 'PNG', gridX, gridY, gridImageW, pdfImgH);
                    
                    // --- Recording Sheet & Solution Key ---
                    let sheetY = gridY + pdfImgH + 20;
                    if (sheetY > 230) {
                        doc.addPage();
                        sheetY = 20;
                    }

                    // Title for the section
                    doc.setFont('NotoSans', 'bold');
                    doc.setFontSize(14);
                    doc.setTextColor(0);
                    doc.text('Keresd a párját!', marginX, sheetY);
                    
                    doc.setFontSize(9);
                    doc.setFont('NotoSans', 'normal');
                    doc.setTextColor(100);
                    doc.text('Párosítsd össze az elemeket, majd keresd ki a kódot!', marginX, sheetY + 6);
                    
                    sheetY += 15;

                    const sideAItems = shuffledItems.filter(it => it.side === 'a');
                    const sideBItems = shuffledItems.filter(it => it.side === 'b').sort((a, b) => (a.gridPos || '').localeCompare(b.gridPos || ''));
                    
                    // Column widths
                    const leftColW = contentW * 0.6;
                    const rightColW = contentW * 0.4;
                    const rightStartX = marginX + leftColW + 5;

                    // 1. Left Column: Matching Items (Single Column)
                    doc.setFontSize(12);
                    doc.setTextColor(0);
                    
                    for (let i = 0; i < sideAItems.length; i++) {
                        const item = sideAItems[i];
                        const y = sheetY + i * 11;

                        if (y > 280) { // Safety break
                            break;
                        }

                        doc.setFont('NotoSans', 'bold');
                        doc.text(`${item.gridPos} - `, marginX, y);
                        
                        doc.setDrawColor(200);
                        doc.setLineDash([1, 1], 0);
                        doc.line(marginX + 12, y + 1, marginX + 45, y + 1);
                        doc.setLineDash([], 0);

                        doc.setDrawColor(180);
                        doc.rect(marginX + 48, y - 5, 7, 7);

                        if (isSolution) {
                            doc.setTextColor(220, 38, 38);
                            doc.text(getSolutionChar(item.pairId), marginX + 49.5, y + 0.5);
                            doc.setTextColor(0);
                        }
                    }

                    // 2. Right Column: Solution Key (Table)
                    if (solution.trim()) {
                        let keyY = sheetY;
                        
                        doc.setFont('NotoSans', 'bold');
                        doc.setFontSize(10);
                        doc.setTextColor(150);
                        doc.text('MEGOLDÓKULCS', rightStartX + rightColW / 2, keyY - 5, { align: 'center' });

                        const keyCellW = 10;
                        const keyCellH = 10;
                        const itemsPerRow = Math.floor(rightColW / keyCellW);
                        
                        sideBItems.forEach((it, idx) => {
                            const row = Math.floor(idx / itemsPerRow);
                            const col = idx % itemsPerRow;
                            const x = rightStartX + col * keyCellW;
                            const currY = keyY + row * (keyCellH + 2);

                            doc.setDrawColor(200);
                            doc.rect(x, currY, keyCellW, keyCellH / 2);
                            doc.rect(x, currY + keyCellH / 2, keyCellW, keyCellH / 2);
                            
                            doc.setFontSize(7);
                            doc.setTextColor(100);
                            doc.text(it.gridPos || '', x + keyCellW / 2, currY + 3.5, { align: 'center' });
                            
                            doc.setFontSize(10);
                            doc.setFont('NotoSans', 'bold');
                            doc.setTextColor(59, 130, 246);
                            doc.text(getSolutionChar(it.pairId), x + keyCellW / 2, currY + 8.5, { align: 'center' });
                        });
                    }
                } finally {
                    document.body.removeChild(tempContainer);
                }

                doc.setFontSize(8);
                doc.setTextColor(180);
                doc.setFont('NotoSans', 'normal');
                doc.text('diakzona.hu', pageW / 2, 285, { align: 'center' });
            };

            await renderPage(false);
            doc.addPage();
            await renderPage(true);

            doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
        } catch (err) {
            console.error(err);
            toast.error('Hiba a PDF generálása során');
        } finally {
            setIsExporting(false);
        }
    };

    if (authLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            
            {/* Hidden container for PDF rendering */}
            <div 
                ref={hiddenRenderRef} 
                className="fixed -left-[9999px] top-0 pointer-events-none"
                aria-hidden="true"
            />
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 border border-white/20 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Vissza
                </Button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"><Puzzle className="w-8 h-8" /></div>
                    <div>
                        <h2 className="text-2xl font-black italic">Párosító Készítő</h2>
                        <p className="text-white/80 text-sm font-medium">Készíts nyomtatható párosító feladatokat koordináta-rendszerrel!</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Editor */}
                <div className="space-y-4">
                    {/* AI Panel */}
                    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
                        <div className="space-y-3">
                            <h3 className="font-bold text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-400" /> AI Generálás</h3>
                            <input 
                                type="text" placeholder="Témakör (pl. Törtek és tizedes törtek)" 
                                value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                            />
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Párok száma</label>
                                    <input type="number" value={aiPairCount} min={2} max={10} onChange={e => setAiPairCount(Number(e.target.value))} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-white" />
                                </div>
                                <Button 
                                    onClick={() => user ? generateWithAI() : setIsAuthModalOpen(true)} 
                                    disabled={aiLoading} 
                                    className="h-12 mt-4 flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 font-bold"
                                >
                                    {aiLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />} Generálás
                                </Button>
                            </div>
                            {!user && <p className="text-[10px] text-blue-400 font-bold text-center">🔒 Jelentkezz be az AI használatához!</p>}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Lecke címe</label>
                            <input 
                                type="text" placeholder="Lecke címe" value={title} onChange={e => setTitle(e.target.value)}
                                className="w-full text-lg font-bold border-none focus:ring-0 p-0"
                            />
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Megoldás (Pl. egy szó, amit a párosítás kiad)</label>
                            <input 
                                type="text" placeholder="Megoldási szó (opcionális)" value={solution} onChange={e => setSolution(e.target.value)}
                                className="w-full text-sm font-semibold border-none focus:ring-0 p-0 text-blue-600 placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Pairs Editor */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Párok ({pairs.length})</h3>
                            <Button size="sm" onClick={addPair} disabled={pairs.length >= MAX_PAIRS} className="bg-blue-500 hover:bg-blue-600 text-xs"><Plus className="w-3 h-3 mr-1" /> Új pár</Button>
                        </div>
                        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                            {pairs.map((p, idx) => (
                                <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-3 relative group">
                                    <div className="flex justify-between items-center">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">{idx + 1}.</div>
                                        <Button 
                                            variant="ghost" size="icon" onClick={() => removePair(p.id)}
                                            className="text-slate-300 hover:text-red-500 h-6 w-6"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>

                                    {/* A Side */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'a', 'math')} className={cn("h-7 w-7 rounded-md", p.aType === 'math' ? "bg-blue-100 text-blue-600" : "text-slate-400")} title="Matematika (LaTeX)"><Sigma className="w-3.5 h-3.5" /></Button>
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'a', 'text')} className={cn("h-7 w-7 rounded-md", p.aType === 'text' ? "bg-blue-100 text-blue-600" : "text-slate-400")} title="Szöveg"><FileText className="w-3.5 h-3.5" /></Button>
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'a', 'image')} className={cn("h-7 w-7 rounded-md", p.aType === 'image' ? "bg-blue-100 text-blue-600" : "text-slate-400")} title="Kép (URL / Feltöltés / Ctrl+V)"><ImageIcon className="w-3.5 h-3.5" /></Button>
                                                {p.aType === 'math' && (
                                                    <Button 
                                                        size="sm" variant="ghost" className="h-7 px-2 text-[10px] font-bold text-blue-500 border-l border-slate-200"
                                                        onClick={() => insertFraction(p.id, 'a')}
                                                    >
                                                        Tört
                                                    </Button>
                                                )}
                                                {p.aType === 'image' && (
                                                    <div className="flex border-l border-slate-200">
                                                        <Button 
                                                            size="sm" variant="ghost" className="h-7 px-2 text-[10px] font-bold text-blue-500"
                                                            onClick={() => {
                                                                const url = window.prompt('Illeszd be a kép URL címét:', p.a.startsWith('data:') ? '' : p.a);
                                                                if (url !== null) updatePair(p.id, 'a', url);
                                                            }}
                                                        >
                                                            Link
                                                        </Button>
                                                        <label className="h-7 px-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 rounded text-blue-500 transition-colors">
                                                            <Upload className="w-3.5 h-3.5" />
                                                            <input 
                                                                type="file" className="hidden" accept="image/*" 
                                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(p.id, 'a', e.target.files[0])} 
                                                            />
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                            <input 
                                                value={p.a.startsWith('data:') ? '[Feltöltött kép]' : p.a} 
                                                onChange={e => updatePair(p.id, 'a', e.target.value)}
                                                onPaste={(e) => handlePaste(p.id, 'a', e)}
                                                readOnly={p.a.startsWith('data:')}
                                                placeholder={p.aType === 'math' ? "LaTeX (pl. \\frac{2}{3})" : p.aType === 'image' ? "URL vagy Ctrl+V" : "Szöveg"} 
                                                className={cn(
                                                    "flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm",
                                                    p.a.startsWith('data:') && "bg-slate-50 text-slate-500 italic"
                                                )}
                                            />
                                            {p.a.startsWith('data:') && (
                                                <Button size="icon" variant="ghost" onClick={() => updatePair(p.id, 'a', '')} className="h-8 w-8 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                                            )}
                                        </div>
                                        {p.a.trim() && (
                                            <div className="ml-11 p-2 bg-white rounded-lg border border-slate-100 min-h-[40px] flex items-center justify-center">
                                                {p.aType === 'math' && <MathRenderer tex={p.a} className="text-sm font-bold" />}
                                                {p.aType === 'text' && <span className="text-sm font-bold">{p.a}</span>}
                                                {p.aType === 'image' && (
                                                    p.a.startsWith('http') || p.a.startsWith('data:') ? (
                                                        <img src={p.a} alt="preview" className="max-h-24 rounded object-contain shadow-sm" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Hibás+URL')} />
                                                    ) : (
                                                        <div className="text-[10px] text-slate-400 italic py-2">Érvénytelen kép URL</div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="h-px bg-slate-200 w-1/2 mx-auto" />

                                    {/* B Side */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'b', 'math')} className={cn("h-7 w-7 rounded-md", p.bType === 'math' ? "bg-indigo-100 text-indigo-600" : "text-slate-400")} title="Matematika (LaTeX)"><Sigma className="w-3.5 h-3.5" /></Button>
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'b', 'text')} className={cn("h-7 w-7 rounded-md", p.bType === 'text' ? "bg-indigo-100 text-indigo-600" : "text-slate-400")} title="Szöveg"><FileText className="w-3.5 h-3.5" /></Button>
                                                <Button size="icon" variant="ghost" onClick={() => updatePairType(p.id, 'b', 'image')} className={cn("h-7 w-7 rounded-md", p.bType === 'image' ? "bg-indigo-100 text-indigo-600" : "text-slate-400")} title="Kép (URL / Feltöltés / Ctrl+V)"><ImageIcon className="w-3.5 h-3.5" /></Button>
                                                {p.bType === 'math' && (
                                                    <Button 
                                                        size="sm" variant="ghost" className="h-7 px-2 text-[10px] font-bold text-indigo-500 border-l border-slate-200"
                                                        onClick={() => insertFraction(p.id, 'b')}
                                                    >
                                                        Tört
                                                    </Button>
                                                )}
                                                {p.bType === 'image' && (
                                                    <div className="flex border-l border-slate-200">
                                                        <Button 
                                                            size="sm" variant="ghost" className="h-7 px-2 text-[10px] font-bold text-indigo-500"
                                                            onClick={() => {
                                                                const url = window.prompt('Illeszd be a kép URL címét:', p.b.startsWith('data:') ? '' : p.b);
                                                                if (url !== null) updatePair(p.id, 'b', url);
                                                            }}
                                                        >
                                                            Link
                                                        </Button>
                                                        <label className="h-7 px-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 rounded text-indigo-500 transition-colors">
                                                            <Upload className="w-3.5 h-3.5" />
                                                            <input 
                                                                type="file" className="hidden" accept="image/*" 
                                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(p.id, 'b', e.target.files[0])} 
                                                            />
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                            <input 
                                                value={p.b.startsWith('data:') ? '[Feltöltött kép]' : p.b} 
                                                onChange={e => updatePair(p.id, 'b', e.target.value)}
                                                onPaste={(e) => handlePaste(p.id, 'b', e)}
                                                readOnly={p.b.startsWith('data:')}
                                                placeholder={p.bType === 'math' ? "LaTeX (pl. \\frac{2}{3})" : p.bType === 'image' ? "URL vagy Ctrl+V" : "Szöveg"} 
                                                className={cn(
                                                    "flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm",
                                                    p.b.startsWith('data:') && "bg-slate-50 text-slate-500 italic"
                                                )}
                                            />
                                            {p.b.startsWith('data:') && (
                                                <Button size="icon" variant="ghost" onClick={() => updatePair(p.id, 'b', '')} className="h-8 w-8 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                                            )}
                                        </div>
                                        {p.b.trim() && (
                                            <div className="ml-11 p-2 bg-white rounded-lg border border-slate-100 min-h-[40px] flex items-center justify-center">
                                                {p.bType === 'math' && <MathRenderer tex={p.b} className="text-sm font-bold" />}
                                                {p.bType === 'text' && <span className="text-sm font-bold">{p.b}</span>}
                                                {p.bType === 'image' && (
                                                    p.b.startsWith('http') || p.b.startsWith('data:') ? (
                                                        <img src={p.b} alt="preview" className="max-h-24 rounded object-contain shadow-sm" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Hibás+URL')} />
                                                    ) : (
                                                        <div className="text-[10px] text-slate-400 italic py-2">Érvénytelen kép URL</div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 font-bold border-2" onClick={() => setShowPreview(!showPreview)}>
                            <Eye className="w-4 h-4 mr-2" /> {showPreview ? 'Szerkesztés' : 'Előnézet'}
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold" onClick={downloadPDF} disabled={isExporting}>
                            {isExporting ? <Loader2 className="animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} PDF Letöltés
                        </Button>
                    </div>

                    {aiError && <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {aiError}</p>}
                </div>

                {/* Right: Grid Preview */}
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center min-h-[600px]">
                    <div className="w-full max-w-[400px] aspect-[210/297] bg-white shadow-2xl border border-slate-200 rounded-sm p-6 overflow-hidden flex flex-col relative text-slate-800">
                        <h4 className="text-center font-black text-blue-600 text-lg mb-6">{title}</h4>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                            <div className="grid grid-cols-[30px_repeat(4,1fr)] border-t border-l border-slate-800">
                                {/* Top labels */}
                                <div className="h-8 border-r border-b border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs" />
                                {colLabels.map(l => (
                                    <div key={l} className="h-8 border-r border-b border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs">{l}</div>
                                ))}

                                {/* Rows */}
                                {Array.from({ length: Math.ceil(shuffledItems.length / cols) }).map((_, r) => (
                                    <React.Fragment key={`row-${r}`}>
                                        <div className="h-20 border-r border-b border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs">{r + 1}.</div>
                                        {colLabels.map((c, cIdx) => {
                                            const item = shuffledItems[r * cols + cIdx];
                                            return (
                                                <div key={`${r}-${cIdx}`} className="h-20 border-r border-b border-slate-800 flex items-center justify-center p-2 text-center group relative overflow-hidden">
                                                    {item ? (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            {item.type === 'math' && <MathRenderer tex={item.content} className="text-sm font-bold scale-110" />}
                                                            {item.type === 'text' && <span className="text-xs font-bold leading-tight break-words">{item.content}</span>}
                                                            {item.type === 'image' && <img src={item.content} alt="" className="max-h-full max-w-full object-contain" />}
                                                            {showPreview && (
                                                                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 opacity-20" />
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="mt-8 space-y-6 px-2">
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-4">
                                        <h5 className="font-bold text-sm">Keresd a párját!</h5>
                                        <p className="text-[10px] font-medium italic text-slate-500">Párosítsd össze az elemeket!</p>
                                        <div className="space-y-3 pt-2">
                                            {shuffledItems.filter(it => it.side === 'a').map((it, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className="text-xs font-bold w-10">{it.gridPos} - </span>
                                                    <div className="flex-1 h-5 border-b border-slate-200 border-dashed" />
                                                    <div className="w-6 h-6 border-2 border-slate-300 rounded flex items-center justify-center text-[10px] font-black text-blue-600 bg-slate-50">
                                                        {solution && showPreview ? getSolutionChar(it.pairId) : ''}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {solution && (
                                        <div className="w-[120px] pt-1 border-l border-slate-100 pl-4">
                                            <h5 className="font-bold text-[10px] mb-3 text-center uppercase tracking-wider text-slate-400">Kulcs</h5>
                                            <div className="grid grid-cols-3 gap-1">
                                                {shuffledItems.filter(it => it.side === 'b').sort((a, b) => (a.gridPos || '').localeCompare(b.gridPos || '')).map((it, i) => (
                                                    <div key={i} className="flex flex-col border border-slate-200 rounded overflow-hidden shadow-sm">
                                                        <div className="bg-slate-50 text-[8px] font-bold py-0.5 border-b border-slate-200 text-center">{it.gridPos}</div>
                                                        <div className="bg-white text-[10px] font-black py-1 text-center text-blue-600">{getSolutionChar(it.pairId)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleShuffle} className="text-slate-400 hover:text-blue-500 text-[10px]">
                            <RotateCcw className="w-3 h-3 mr-1" /> Rács újrakeverése
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
