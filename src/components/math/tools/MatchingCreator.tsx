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

export interface MatchingElement {
    content: string;
    type: MatchingItemType;
}

interface MatchingGroup {
    id: string;
    elements: MatchingElement[];
}

interface GridItem {
    id: string;
    content: string;
    type: MatchingItemType;
    groupId: string;
    elementIndex: number;
    gridPos?: string; 
}

interface MatchingCreatorProps {
    onBack: () => void;
}

const MAX_PAIRS = 12;
const MIN_PAIRS = 2;

const COLORS = [
    { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', btn: 'text-blue-500' },
    { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', btn: 'text-indigo-500' },
    { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', btn: 'text-purple-500' },
    { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200', btn: 'text-teal-500' }
];
const LABELS = ['A', 'B', 'C', 'D'];

const sanitizeLatex = (tex: string) => {
    if (!tex) return '';
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

    const [groupSize, setGroupSize] = useState<number>(2);
    const [groups, setGroups] = useState<MatchingGroup[]>([
        { id: '1', elements: [{ content: '', type: 'math' }, { content: '', type: 'text' }, { content: '', type: 'text' }, { content: '', type: 'text' }] },
        { id: '2', elements: [{ content: '', type: 'math' }, { content: '', type: 'text' }, { content: '', type: 'text' }, { content: '', type: 'text' }] },
        { id: '3', elements: [{ content: '', type: 'math' }, { content: '', type: 'text' }, { content: '', type: 'text' }, { content: '', type: 'text' }] }
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

    const cols = 4;
    const colLabels = ['A', 'B', 'C', 'D'];

    useEffect(() => {
        handleShuffle();
    }, [showPreview, groupSize]);

    useEffect(() => {
        if (shuffledItems.length === 0) return;

        setShuffledItems(prev => prev.map(item => {
            const group = groups.find(g => g.id === item.groupId);
            if (!group || !group.elements[item.elementIndex]) return item;
            
            const newContent = group.elements[item.elementIndex].content;
            const newType = group.elements[item.elementIndex].type;
            
            return { ...item, content: newContent, type: newType };
        }));
    }, [groups]);

    const handleShuffle = () => {
        const validGroups = groups.filter(g => g.elements.slice(0, groupSize).every(e => e.content.trim()));
        const items: GridItem[] = [];
        
        validGroups.forEach(g => {
            for (let i = 0; i < groupSize; i++) {
                items.push({ 
                    id: `${g.id}-${i}`, 
                    content: g.elements[i].content, 
                    type: g.elements[i].type, 
                    groupId: g.id, 
                    elementIndex: i 
                });
            }
        });

        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        items.forEach((item, idx) => {
            const colIdx = idx % cols;
            const rowIdx = Math.floor(idx / cols) + 1;
            item.gridPos = `${colLabels[colIdx]}${rowIdx}`;
        });

        setShuffledItems(items);
    };

    const groupToSolutionMap = React.useMemo(() => {
        const map = new Map<string, string>();
        if (!solution.trim()) return map;
        const mainItems = shuffledItems.filter(it => it.elementIndex === 0);
        mainItems.forEach((it, i) => {
            map.set(it.groupId, solution[i % solution.length]?.toUpperCase() || '');
        });
        return map;
    }, [shuffledItems, solution]);

    const getSolutionChar = (groupId: string) => groupToSolutionMap.get(groupId) || '';

    const getPartnerGridPos = (groupId: string, currentIndex: number) => {
        return shuffledItems
            .filter(it => it.groupId === groupId && it.elementIndex !== currentIndex)
            .sort((a, b) => a.elementIndex - b.elementIndex)
            .map(it => it.gridPos || '');
    };

    const addGroup = () => {
        if (groups.length >= MAX_PAIRS) return;
        setGroups([...groups, { 
            id: Math.random().toString(36).substr(2, 9), 
            elements: Array(4).fill(null).map((_, i) => ({ content: '', type: i === 0 ? 'math' : 'text' }))
        }]);
    };

    const removeGroup = (id: string) => {
        if (groups.length <= MIN_PAIRS) return;
        setGroups(groups.filter(g => g.id !== id));
    };

    const updateElement = (id: string, index: number, value: string) => {
        setGroups(groups.map(g => {
            if (g.id !== id) return g;
            const newElements = [...g.elements];
            newElements[index] = { ...newElements[index], content: value };
            return { ...g, elements: newElements };
        }));
    };

    const updateElementType = (id: string, index: number, type: MatchingItemType) => {
        setGroups(groups.map(g => {
            if (g.id !== id) return g;
            const newElements = [...g.elements];
            newElements[index] = { ...newElements[index], type };
            return { ...g, elements: newElements };
        }));
    };

    const insertFraction = (id: string, index: number) => {
        const group = groups.find(g => g.id === id);
        if (!group) return;
        updateElement(id, index, group.elements[index].content + '\\frac{}{}');
    };

    const processImageFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (id: string, index: number, file: File) => {
        try {
            const base64 = await processImageFile(file);
            updateElement(id, index, base64);
            updateElementType(id, index, 'image');
        } catch (err) {
            toast.error('Hiba a kép feldolgozása során');
        }
    };

    const handlePaste = async (id: string, index: number, e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                    e.preventDefault();
                    await handleImageUpload(id, index, file);
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
                body: { topic: aiTopic.trim(), pairCount: aiPairCount, groupSize },
            });

            if (error) throw new Error(error.message || 'Hiba az AI hívás során');
            if (!data.groups) throw new Error('Érvénytelen válasz az AI-tól');

            const newGroups: MatchingGroup[] = data.groups.map((g: any) => {
                const elements = Array(4).fill(null).map((_, i) => ({ content: '', type: 'text' as MatchingItemType }));
                g.elements.forEach((el: any, i: number) => {
                    if (i < 4) {
                        elements[i] = {
                            content: el.content,
                            type: el.type || (el.content?.includes('\\') ? 'math' : 'text')
                        };
                    }
                });
                return {
                    id: Math.random().toString(36).substr(2, 9),
                    elements
                };
            });

            setGroups(newGroups);
            if (data.title) setTitle(data.title);
            setAiSuccess(true);
            setTimeout(() => setAiSuccess(false), 3000);
        } catch (err: any) {
            setAiError(err.message || 'Ismeretlen hiba történt');
        } finally {
            setAiLoading(false);
        }
    };

    const validGroupsCount = groups.filter(g => g.elements.slice(0, groupSize).every(e => e.content.trim())).length;

    const downloadPDF = async () => {
        if (validGroupsCount < MIN_PAIRS) {
            toast.error('Legalább 2 teljes csoport szükséges!');
            return;
        }

        if (solution.trim() && solution.length !== validGroupsCount) {
            toast.error(`A megoldási szó hossza (${solution.length}) nem egyezik a csoportok számával (${validGroupsCount})!`);
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

                    const corner = document.createElement('div');
                    corner.className = 'pdf-cell pdf-header';
                    gridEl.appendChild(corner);

                    colLabels.forEach(l => {
                        const cell = document.createElement('div');
                        cell.className = 'pdf-cell pdf-header';
                        cell.innerText = l;
                        gridEl.appendChild(cell);
                    });

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

                    const imgs = gridEl.querySelectorAll('img');
                    await Promise.all(Array.from(imgs).map(img => {
                        if (img.complete) return Promise.resolve();
                        return new Promise(res => { 
                            img.onload = res; 
                            img.onerror = () => {
                                const parent = img.parentElement;
                                if (parent) {
                                    parent.innerHTML = '<div style="font-size: 8px; color: #94a3b8; border: 1px dashed #cbd5e1; padding: 4px; border-radius: 4px;">Kép hiba</div>';
                                }
                                res(null); 
                            };
                            setTimeout(res, 5000);
                        });
                    }));

                    const dataUrl = await toPng(gridEl, { 
                        pixelRatio: 2, 
                        backgroundColor: 'white',
                        cacheBust: true 
                    });
                    const imgProps = doc.getImageProperties(dataUrl);
                    const pdfImgH = (imgProps.height * gridImageW) / imgProps.width;
                    
                    doc.addImage(dataUrl, 'PNG', gridX, gridY, gridImageW, pdfImgH);
                    
                    let sheetY = gridY + pdfImgH + 15;
                    if (sheetY > 220) {
                        doc.addPage();
                        sheetY = 20;
                    }

                    doc.setFont('NotoSans', 'bold');
                    doc.setFontSize(14);
                    doc.setTextColor(0);
                    doc.text('Keresd a párját!', marginX, sheetY);
                    
                    doc.setFontSize(9);
                    doc.setFont('NotoSans', 'normal');
                    doc.setTextColor(100);
                    doc.text('Párosítsd össze az elemeket, majd keresd ki a kódot!', marginX, sheetY + 6);
                    
                    sheetY += 15;

                    const mainItems = shuffledItems.filter(it => it.elementIndex === 0);
                    const otherItems = shuffledItems.filter(it => it.elementIndex !== 0).sort((a, b) => (a.gridPos || '').localeCompare(b.gridPos || ''));
                    const isTwoColumn = mainItems.length >= 7;

                    doc.setFontSize(11);
                    doc.setTextColor(0);
                    
                    const itemsPerCol = isTwoColumn ? Math.ceil(mainItems.length / 2) : mainItems.length;
                    const colW = isTwoColumn ? (contentW - 10) / 2 : contentW * 0.6;
                    const rowH = 10;

                    const lineSpacing = groupSize === 2 ? 23 : (groupSize === 3 ? 16 : 12);
                    const lineLength = groupSize === 2 ? 23 : (groupSize === 3 ? 12 : 9);

                    for (let i = 0; i < mainItems.length; i++) {
                        const item = mainItems[i];
                        const colIdx = isTwoColumn ? Math.floor(i / itemsPerCol) : 0;
                        const rowIdx = isTwoColumn ? i % itemsPerCol : i;
                        
                        const x = marginX + colIdx * (colW + 10);
                        const y = sheetY + rowIdx * rowH;

                        doc.setFont('NotoSans', 'bold');
                        doc.text(`${item.gridPos} - `, x, y);
                        
                        doc.setDrawColor(200);
                        doc.setLineDash([1, 1], 0);
                        for (let d = 0; d < groupSize - 1; d++) {
                            const lineX = x + 12 + (d * lineSpacing);
                            doc.line(lineX, y + 1, lineX + lineLength, y + 1);
                        }
                        doc.setLineDash([], 0);

                        const boxX = x + 12 + ((groupSize - 1) * lineSpacing) + 3;
                        doc.setDrawColor(180);
                        doc.rect(boxX, y - 5, 7, 7);

                        if (isSolution) {
                            doc.setTextColor(220, 38, 38);
                            const partners = getPartnerGridPos(item.groupId, 0);
                            doc.setFontSize(9);
                            partners.forEach((p, pIdx) => {
                                doc.text(p, x + 12 + (pIdx * lineSpacing) + (lineLength/2), y, { align: 'center' });
                            });
                            
                            doc.setFontSize(11);
                            doc.text(getSolutionChar(item.groupId), boxX + 3.5, y + 0.5, { align: 'center' });
                            doc.setTextColor(0);
                        }
                    }

                    let keyX = marginX;
                    let keyY = sheetY + itemsPerCol * rowH + 10;
                    let customTableW = contentW;

                    if (!isTwoColumn) {
                        keyX = marginX + colW + 5;
                        keyY = sheetY;
                        customTableW = contentW - colW - 5;
                    }

                    if (keyY > 260 && isTwoColumn) {
                        doc.addPage();
                        keyY = 20;
                    }

                    if (solution.trim()) {
                        doc.setFont('NotoSans', 'bold');
                        doc.setFontSize(10);
                        doc.setTextColor(150);
                        doc.text('MEGOLDÓKULCS', keyX + customTableW / 2, keyY - 5, { align: 'center' });

                        const keyCellW = Math.min(12, customTableW / 6);
                        const keyCellH = 12;
                        const itemsPerRow = Math.floor(customTableW / keyCellW);
                        
                        otherItems.forEach((it, idx) => {
                            const row = Math.floor(idx / itemsPerRow);
                            const col = idx % itemsPerRow;
                            const x = keyX + col * keyCellW;
                            const currY = keyY + row * (keyCellH + 5);

                            doc.setDrawColor(200);
                            doc.rect(x, currY, keyCellW, keyCellH / 2);
                            doc.rect(x, currY + keyCellH / 2, keyCellW, keyCellH / 2);
                            
                            doc.setFontSize(7);
                            doc.setTextColor(100);
                            doc.text(it.gridPos || '', x + keyCellW / 2, currY + 4, { align: 'center' });
                            
                            doc.setFontSize(10);
                            doc.setFont('NotoSans', 'bold');
                            doc.setTextColor(59, 130, 246);
                            doc.text(getSolutionChar(it.groupId), x + keyCellW / 2, currY + 10, { align: 'center' });
                        });

                        if (isSolution) {
                            let mapY = keyY + Math.ceil(otherItems.length / itemsPerRow) * (keyCellH + 5) + 8;
                            let mapX = isTwoColumn ? marginX : keyX;
                            let mapW = isTwoColumn ? contentW : customTableW;

                            if (mapY > 260) {
                                doc.addPage();
                                mapY = 20;
                            }
                            
                            doc.setFontSize(9);
                            doc.setTextColor(120);
                            doc.text('Párkereső kulcs:', mapX, mapY);
                            
                            doc.setFontSize(8);
                            doc.setFont('NotoSans', 'normal');
                            const mappings = mainItems.map(it => `${it.gridPos} \u2192 ${getPartnerGridPos(it.groupId, 0).join(' \u2192 ')}`);
                            const colsToUse = isTwoColumn ? 3 : 2;
                            const mapColW = mapW / colsToUse;
                            
                            mappings.forEach((m, i) => {
                                const r = Math.floor(i / colsToUse);
                                const c = i % colsToUse;
                                doc.text(m, mapX + c * mapColW, mapY + 6 + r * 5);
                            });
                        }
                    }
                } finally {
                    document.body.removeChild(tempContainer);
                }

                doc.setFontSize(8);
                doc.setTextColor(180);
                doc.setFont('NotoSans', 'normal');
                doc.text('Készült a diákzóna.hu párosító készítővel', pageW / 2, 285, { align: 'center' });
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
            
            <div 
                ref={hiddenRenderRef} 
                className="fixed -left-[9999px] top-0 pointer-events-none"
                aria-hidden="true"
            />
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 border border-white/20 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Vissza
                </Button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm"><Puzzle className="w-8 h-8" /></div>
                    <div>
                        <h2 className="text-2xl font-black italic">Párosító Készítő</h2>
                        <p className="text-white/80 text-sm font-medium">Készíts nyomtatható csoportosító feladatokat koordináta-rendszerrel!</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-400" /> AI Generálás</h3>
                                <div className="flex bg-black/50 p-1 rounded-xl">
                                    {[2, 3, 4].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setGroupSize(size)}
                                            className={cn(
                                                "px-3 py-1 rounded-lg text-xs font-bold transition-colors",
                                                groupSize === size ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white hover:bg-white/10"
                                            )}
                                        >
                                            {size} elemű
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input 
                                type="text" placeholder="Témakör (pl. Törtek és tizedes törtek)" 
                                value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                            />
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Csoportok száma</label>
                                    <input type="number" value={aiPairCount} min={2} max={12} onChange={e => setAiPairCount(Number(e.target.value))} className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-white" />
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
                                className={cn(
                                    "w-full text-sm font-semibold border-none focus:ring-0 p-0 text-blue-600 placeholder:text-slate-300",
                                    solution.trim() && solution.length !== validGroupsCount && "text-red-500"
                                )}
                            />
                            {solution.trim() && solution.length !== validGroupsCount && (
                                <p className="text-[10px] text-red-500 font-bold mt-1 animate-pulse">
                                    ⚠️ A szó hossza ({solution.length}) nem egyezik a csoportok számával ({validGroupsCount})!
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Csoportok ({groups.length})</h3>
                            <Button size="sm" onClick={addGroup} disabled={groups.length >= MAX_PAIRS} className="bg-blue-500 hover:bg-blue-600 text-xs"><Plus className="w-3 h-3 mr-1" /> Új csoport</Button>
                        </div>
                        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                            {groups.map((g, idx) => (
                                <div key={g.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-3 relative group">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black">{idx + 1}.</div>
                                        <Button 
                                            variant="ghost" size="icon" onClick={() => removeGroup(g.id)}
                                            className="text-slate-300 hover:text-red-500 h-6 w-6"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>

                                    {g.elements.slice(0, groupSize).map((el, elIdx) => {
                                        const color = COLORS[elIdx];
                                        return (
                                            <div key={elIdx} className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 text-center font-bold text-slate-400 text-xs">{LABELS[elIdx]}</div>
                                                    <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                                                        <Button size="icon" variant="ghost" onClick={() => updateElementType(g.id, elIdx, 'math')} className={cn("h-7 w-7 rounded-md", el.type === 'math' ? `${color.bg} ${color.text}` : "text-slate-400")} title="Matematika (LaTeX)"><Sigma className="w-3.5 h-3.5" /></Button>
                                                        <Button size="icon" variant="ghost" onClick={() => updateElementType(g.id, elIdx, 'text')} className={cn("h-7 w-7 rounded-md", el.type === 'text' ? `${color.bg} ${color.text}` : "text-slate-400")} title="Szöveg"><FileText className="w-3.5 h-3.5" /></Button>
                                                        <Button size="icon" variant="ghost" onClick={() => updateElementType(g.id, elIdx, 'image')} className={cn("h-7 w-7 rounded-md", el.type === 'image' ? `${color.bg} ${color.text}` : "text-slate-400")} title="Kép (URL / Feltöltés / Ctrl+V)"><ImageIcon className="w-3.5 h-3.5" /></Button>
                                                        {el.type === 'math' && (
                                                            <Button size="sm" variant="ghost" className={cn("h-7 px-2 text-[10px] font-bold border-l border-slate-200", color.btn)} onClick={() => insertFraction(g.id, elIdx)}>Tört</Button>
                                                        )}
                                                        {el.type === 'image' && (
                                                            <div className="flex border-l border-slate-200">
                                                                <Button size="sm" variant="ghost" className={cn("h-7 px-2 text-[10px] font-bold", color.btn)} onClick={() => { const url = window.prompt('URL:'); if (url) updateElement(g.id, elIdx, url); }}>Link</Button>
                                                                <label className={cn("h-7 px-2 flex items-center justify-center cursor-pointer hover:bg-slate-100 rounded transition-colors", color.btn)}><Upload className="w-3.5 h-3.5" /><input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(g.id, elIdx, e.target.files[0])} /></label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <input 
                                                        value={el.content.startsWith('data:') ? '[Feltöltött kép]' : el.content} 
                                                        onChange={e => updateElement(g.id, elIdx, e.target.value)}
                                                        onPaste={(e) => handlePaste(g.id, elIdx, e)}
                                                        readOnly={el.content.startsWith('data:')}
                                                        placeholder={el.type === 'math' ? "LaTeX" : el.type === 'image' ? "URL vagy Ctrl+V" : "Szöveg"} 
                                                        className={cn("flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm", el.content.startsWith('data:') && "bg-slate-50 text-slate-500 italic")}
                                                    />
                                                    {el.content.startsWith('data:') && <Button size="icon" variant="ghost" onClick={() => updateElement(g.id, elIdx, '')} className="h-8 w-8 text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>}
                                                </div>
                                                {el.content.trim() && (
                                                    <div className="ml-8 p-2 bg-white rounded-lg border border-slate-100 min-h-[40px] flex items-center justify-center">
                                                        {el.type === 'math' && <MathRenderer tex={el.content} className="text-sm font-bold" />}
                                                        {el.type === 'text' && <span className="text-sm font-bold">{el.content}</span>}
                                                        {el.type === 'image' && (
                                                            el.content.startsWith('http') || el.content.startsWith('data:') ? (
                                                                <img src={el.content} alt="preview" className="max-h-24 rounded object-contain shadow-sm" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100?text=Hibás+URL')} />
                                                            ) : <div className="text-[10px] text-slate-400 italic py-2">Érvénytelen kép URL</div>
                                                        )}
                                                    </div>
                                                )}
                                                {elIdx < groupSize - 1 && <div className="h-px bg-slate-200 w-1/3 mx-auto my-2" />}
                                            </div>
                                        );
                                    })}
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

                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center min-h-[600px]">
                    <div className="w-full max-w-[400px] aspect-[210/297] bg-white shadow-2xl border border-slate-200 rounded-sm p-6 overflow-hidden flex flex-col relative text-slate-800">
                        <h4 className="text-center font-black text-blue-600 text-lg mb-6">{title}</h4>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                            <div className="grid grid-cols-[30px_repeat(4,1fr)] border-t border-l border-slate-800">
                                <div className="h-8 border-r border-b border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs" />
                                {colLabels.map(l => (
                                    <div key={l} className="h-8 border-r border-b border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs">{l}</div>
                                ))}

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
                                                            {showPreview && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 opacity-20" />}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="mt-8 space-y-6 px-2">
                                {(() => {
                                    const mainItems = shuffledItems.filter(it => it.elementIndex === 0);
                                    const otherItems = shuffledItems.filter(it => it.elementIndex !== 0).sort((a, b) => (a.gridPos || '').localeCompare(b.gridPos || ''));
                                    const isTwoColumn = mainItems.length >= 7;

                                    return (
                                        <div className={cn("flex gap-4", isTwoColumn ? "flex-col" : "flex-row")}>
                                            <div className={cn("space-y-4", isTwoColumn ? "w-full" : "w-[60%]")}>
                                                <div>
                                                    <h5 className="font-bold text-sm">Keresd a párját!</h5>
                                                    <p className="text-[10px] font-medium italic text-slate-500">Párosítsd össze az elemeket!</p>
                                                </div>
                                                
                                                <div className={cn("grid gap-x-4 gap-y-2 pt-2", isTwoColumn ? "grid-cols-2" : "grid-cols-1")}>
                                                    {mainItems.map((it, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold w-12">{it.gridPos} - </span>
                                                            <div className="flex-1 flex gap-1 items-center justify-start">
                                                                {Array.from({ length: groupSize - 1 }).map((_, d) => (
                                                                    <div key={d} className="flex-1 h-4 border-b border-slate-200 border-dashed relative">
                                                                        {solution && showPreview && (
                                                                            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-red-500 -top-0.5">
                                                                                {getPartnerGridPos(it.groupId, 0)[d] || ''}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center text-[10px] font-black text-blue-600 bg-slate-50">
                                                                {solution && showPreview ? getSolutionChar(it.groupId) : ''}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {solution && (
                                                <div className={cn("pt-4", isTwoColumn ? "border-t border-slate-100" : "flex-1 border-l border-slate-100 pl-4")}>
                                                    <h5 className="font-bold text-[10px] mb-3 text-center uppercase tracking-wider text-slate-400">Kulcs</h5>
                                                    <div className={cn("grid gap-1", isTwoColumn ? "grid-cols-6" : "grid-cols-3")}>
                                                        {otherItems.map((it, i) => (
                                                            <div key={i} className="flex flex-col border border-slate-200 rounded overflow-hidden shadow-sm">
                                                                <div className="bg-slate-50 text-[7px] font-bold py-0.5 border-b border-slate-200 text-center">{it.gridPos}</div>
                                                                <div className="bg-white text-[9px] font-black py-0.5 text-center text-blue-600">{getSolutionChar(it.groupId)}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    {showPreview && (
                                                        <div className="mt-4 pt-3 border-t border-slate-50">
                                                            <h6 className="text-[8px] font-bold text-slate-400 uppercase mb-2">Párkereső:</h6>
                                                            <div className={cn("grid gap-1", isTwoColumn ? "grid-cols-3" : "grid-cols-2")}>
                                                                {mainItems.map((it, i) => (
                                                                    <div key={i} className="text-[7px] text-slate-500 font-medium">
                                                                        {it.gridPos} → {getPartnerGridPos(it.groupId, 0).join(' → ')}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                            
                            <div className="absolute bottom-2 left-0 right-0 text-center">
                                <span className="text-[6px] text-slate-300 uppercase tracking-widest font-medium">Készült a diákzóna.hu párosító készítővel</span>
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
