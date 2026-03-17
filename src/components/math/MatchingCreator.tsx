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

const MathRenderer = ({ tex, className }: { tex: string, className?: string }) => {
    try {
        const html = katex.renderToString(tex, {
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
        const items: GridItem[] = [];
        pairs.forEach(p => {
            if (p.a.trim() || p.b.trim()) {
                items.push({ id: `${p.id}-a`, content: p.a, type: p.aType, pairId: p.id, side: 'a' });
                items.push({ id: `${p.id}-b`, content: p.b, type: p.bType, pairId: p.id, side: 'b' });
            }
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
                // Header
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

                // Grid Config
                const gridX = marginX + 10;
                const gridY = 45;
                const cellW = (contentW - 10) / cols;
                const cellH = 30;
                const rowCount = Math.ceil(shuffledItems.length / cols);

                // Grid Border
                doc.setDrawColor(0);
                doc.setLineWidth(0.5);
                doc.rect(gridX - 10, gridY - 10, contentW, (rowCount * cellH) + 10);
                
                // Headers (A-D)
                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(14);
                doc.setTextColor(0);
                colLabels.forEach((label, i) => {
                    const x = gridX + i * cellW;
                    doc.rect(x, gridY - 10, cellW, 10);
                    doc.text(label, x + cellW / 2, gridY - 3, { align: 'center' });
                });

                // Sidebar and Cells
                for (let r = 0; r < rowCount; r++) {
                    const y = gridY + r * cellH;
                    doc.rect(gridX - 10, y, 10, cellH);
                    doc.text(`${r + 1}.`, gridX - 5, y + cellH / 2 + 2, { align: 'center' });

                    for (let c = 0; c < cols; c++) {
                        const x = gridX + c * cellW;
                        const idx = r * cols + c;
                        const item = shuffledItems[idx];
                        
                        doc.rect(x, y, cellW, cellH);
                        if (item && hiddenRenderRef.current) {
                            // Render content to image
                            const container = hiddenRenderRef.current;
                            container.innerHTML = '';
                            const contentEl = document.createElement('div');
                            contentEl.style.width = '200px';
                            contentEl.style.height = '120px';
                            contentEl.style.display = 'flex';
                            contentEl.style.alignItems = 'center';
                            contentEl.style.justifyContent = 'center';
                            contentEl.style.padding = '10px';
                            contentEl.style.background = 'white';

                            if (item.type === 'math') {
                                const mathHtml = katex.renderToString(item.content, { 
                                    throwOnError: false
                                });
                                contentEl.innerHTML = `<div style="font-size: 32px; font-weight: bold; width: 100%; display: flex; justify-content: center;">${mathHtml}</div>`;
                            } else if (item.type === 'image') {
                                contentEl.innerHTML = `<img src="${item.content}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />`;
                            } else {
                                contentEl.innerHTML = `<span style="font-size: 18px; font-weight: bold; text-align: center; font-family: 'Noto Sans', sans-serif;">${item.content}</span>`;
                            }
                            
                            container.appendChild(contentEl);
                            
                            // Let images load
                            if (item.type === 'image') {
                                await new Promise(res => {
                                    const img = contentEl.querySelector('img');
                                    if (img?.complete) res(null);
                                    else if (img) img.onload = () => res(null);
                                    else res(null);
                                });
                            }

                            const dataUrl = await toPng(contentEl, { pixelRatio: 2 });
                            doc.addImage(dataUrl, 'PNG', x + 2, y + 2, cellW - 4, cellH - 4);
                        }
                    }
                }

                // Recording Sheet
                let sheetY = gridY + rowCount * cellH + 20;
                if (sheetY > 250) {
                    doc.addPage();
                    sheetY = 20;
                }

                doc.setFont('NotoSans', 'bold');
                doc.setFontSize(14);
                doc.setTextColor(0);
                doc.text('Keresd a párját!', marginX, sheetY);
                sheetY += 8;

                doc.setFontSize(10);
                doc.setFont('NotoSans', 'normal');
                doc.text('Például: A1 - C2', marginX, sheetY);
                sheetY += 10;

                const colW = contentW / 2;
                const sideAItems = shuffledItems.filter(it => it.side === 'a');
                const halfCount = Math.ceil(sideAItems.length / 2);

                for (let i = 0; i < sideAItems.length; i++) {
                    const item = sideAItems[i];
                    const isSecondCol = i >= halfCount;
                    const r = isSecondCol ? i - halfCount : i;
                    const x = marginX + (isSecondCol ? colW : 0);
                    const y = sheetY + r * 10;

                    doc.setFont('NotoSans', 'bold');
                    doc.setFontSize(12);
                    doc.text(`${item.gridPos} - `, x, y);
                    doc.setDrawColor(200);
                    doc.line(x + 12, y + 1, x + 45, y + 1);

                    if (isSolution) {
                        const otherSide = shuffledItems.find(it => it.pairId === item.pairId && it.side === 'b');
                        doc.setTextColor(220, 38, 38);
                        doc.text(otherSide?.gridPos || '', x + 18, y);
                        doc.setTextColor(0);
                    }
                }

                doc.setFontSize(8);
                doc.setTextColor(180);
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
                        <input 
                            type="text" placeholder="Lecke címe" value={title} onChange={e => setTitle(e.target.value)}
                            className="w-full text-lg font-bold border-none focus:ring-0 p-0"
                        />
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

                            <div className="mt-8 space-y-4 px-2">
                                <h5 className="font-bold text-sm">Keresd a párját!</h5>
                                <p className="text-[10px] font-medium">Például: <span className="text-blue-500 font-bold">A1 - C2</span></p>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-2">
                                    {shuffledItems.filter(it => it.side === 'a').map((it, i) => (
                                        <div key={i} className="flex items-center gap-2 border-b border-slate-100 pb-1">
                                            <span className="text-xs font-bold">{it.gridPos} - </span>
                                            <div className="flex-1 h-3 border-b border-slate-200 border-dashed" />
                                        </div>
                                    ))}
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
