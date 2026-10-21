import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Trash2,
    RotateCcw,
    Plus,
    ArrowLeft,
    Hand,
    Divide,
    Combine,
    Magnet,
    X,
    Info,
    Sparkles,
    CornerDownRight,
    ArrowUpFromLine,
    Maximize2,
    Minimize2,
    Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type BlockType = 'thousand' | 'hundred' | 'ten' | 'one';

export interface Block {
    id: string;
    type: BlockType;
    x: number;
    y: number;
    inBasketId?: string | null;
}

export interface Basket {
    id: string;
    index: number;
}

interface ManipulativeDivisionProps {
    onBack: () => void;
}

const BLOCK_CONFIG: Record<BlockType, {
    width: number;
    height: number;
    value: number;
    label: string;
    singularName: string;
    pluralName: string;
    bgColor: string;
    borderColor: string;
    badgeColor: string;
    defaultX: number;
    gap: number;
}> = {
    thousand: {
        width: 110,
        height: 110,
        value: 1000,
        label: '1000',
        singularName: 'ezres',
        pluralName: 'ezres',
        bgColor: 'bg-red-500',
        borderColor: 'border-red-600',
        badgeColor: 'bg-red-500 text-white',
        defaultX: 30,
        gap: 16
    },
    hundred: {
        width: 96,
        height: 96,
        value: 100,
        label: '100',
        singularName: 'százas',
        pluralName: 'százas',
        bgColor: 'bg-emerald-500',
        borderColor: 'border-emerald-600',
        badgeColor: 'bg-emerald-500 text-white',
        defaultX: 160,
        gap: 14
    },
    ten: {
        width: 30,
        height: 90,
        value: 10,
        label: '10',
        singularName: 'tízes',
        pluralName: 'tízes',
        bgColor: 'bg-blue-500',
        borderColor: 'border-blue-600',
        badgeColor: 'bg-blue-500 text-white',
        defaultX: 280,
        gap: 10
    },
    one: {
        width: 26,
        height: 26,
        value: 1,
        label: '1',
        singularName: 'egyes',
        pluralName: 'egyes',
        bgColor: 'bg-amber-400',
        borderColor: 'border-amber-500',
        badgeColor: 'bg-amber-400 text-amber-950',
        defaultX: 390,
        gap: 8
    }
};

const NEXT_TYPE_MAP: Record<BlockType, BlockType | null> = {
    one: 'ten',
    ten: 'hundred',
    hundred: 'thousand',
    thousand: null
};

const PREV_TYPE_MAP: Record<BlockType, BlockType | null> = {
    thousand: 'hundred',
    hundred: 'ten',
    ten: 'one',
    one: null
};

export function ManipulativeDivision({ onBack }: ManipulativeDivisionProps) {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [baskets, setBaskets] = useState<Basket[]>([]);
    const [selectedBlockIds, setSelectedBlockIds] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [magnetEnabled, setMagnetEnabled] = useState(false);
    const [hoveredBasketId, setHoveredBasketId] = useState<string | null>(null);
    const [isAutoDistributing, setIsAutoDistributing] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Number input modal state
    const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
    const [numberInputValue, setNumberInputValue] = useState('');

    // Rubber-band selection box in free workspace
    const [selectionBox, setSelectionBox] = useState<{
        startX: number;
        startY: number;
        currentX: number;
        currentY: number;
    } | null>(null);

    // Drag tracking
    const dragDataRef = useRef<{
        pointerStartX: number;
        pointerStartY: number;
        hasMoved: boolean;
        activeBlockId: string | null;
        initialPositions: Record<string, { x: number; y: number }>;
    } | null>(null);

    const mainContainerRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<HTMLDivElement>(null);
    const basketsContainerRef = useRef<HTMLDivElement>(null);
    const basketRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const SNAP_SIZE = 20;

    const snap = useCallback((val: number) => {
        return magnetEnabled ? Math.round(val / SNAP_SIZE) * SNAP_SIZE : Math.round(val);
    }, [magnetEnabled]);

    // Fullscreen toggle handler
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (mainContainerRef.current?.requestFullscreen) {
                    await mainContainerRef.current.requestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch {
            setIsFullscreen(prev => !prev);
        }
    };

    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Smart spawning position: places subsequent blocks cleanly beside each other
    const getNextSpawnPosition = (type: BlockType): { x: number; y: number } => {
        const config = BLOCK_CONFIG[type];
        const sameTypeFreeBlocks = blocks.filter(b => b.type === type && !b.inBasketId);

        const workspaceWidth = workspaceRef.current?.clientWidth || 700;
        const workspaceHeight = workspaceRef.current?.clientHeight || 450;
        const maxUsableHeight = Math.max(120, workspaceHeight - 260);

        if (sameTypeFreeBlocks.length === 0) {
            return { x: snap(config.defaultX), y: snap(25) };
        }

        const lastBlock = sameTypeFreeBlocks[sameTypeFreeBlocks.length - 1];
        let nextX = lastBlock.x + config.width + config.gap;
        let nextY = lastBlock.y;

        if (nextX + config.width > workspaceWidth - 30) {
            nextX = config.defaultX;
            nextY = lastBlock.y + config.height + config.gap;

            if (nextY + config.height > maxUsableHeight) {
                nextY = 25;
                nextX = config.defaultX + 20;
            }
        }

        return { x: snap(nextX), y: snap(nextY) };
    };

    const addBlock = (type: BlockType, customX?: number, customY?: number) => {
        let x: number;
        let y: number;

        if (customX !== undefined && customY !== undefined) {
            x = snap(customX);
            y = snap(customY);
        } else {
            const pos = getNextSpawnPosition(type);
            x = pos.x;
            y = pos.y;
        }

        const newBlock: Block = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            x,
            y,
            inBasketId: null
        };

        setBlocks(prev => [...prev, newBlock]);
        setSelectedBlockIds([newBlock.id]);
    };

    // Apply entered number to workspace as place-value blocks (e.g. 345 -> 3x100, 4x10, 5x1)
    const applyInitialNumber = (targetNum?: number) => {
        const numToSet = targetNum !== undefined ? targetNum : parseInt(numberInputValue, 10);
        if (isNaN(numToSet) || numToSet <= 0) return;

        const clampedNum = Math.min(9999, Math.floor(numToSet));

        const thousands = Math.floor(clampedNum / 1000);
        const hundreds = Math.floor((clampedNum % 1000) / 100);
        const tens = Math.floor((clampedNum % 100) / 10);
        const ones = clampedNum % 10;

        const newBlocks: Block[] = [];

        // 1. Thousands column (x ~ 25)
        for (let i = 0; i < thousands; i++) {
            newBlocks.push({
                id: Math.random().toString(36).substring(2, 9),
                type: 'thousand',
                x: snap(25 + (i % 2) * 125),
                y: snap(25 + Math.floor(i / 2) * 125),
                inBasketId: null
            });
        }

        // 2. Hundreds column (x ~ 160 or offset)
        const hStartX = thousands > 0 ? (thousands > 1 ? 280 : 160) : 30;
        for (let i = 0; i < hundreds; i++) {
            newBlocks.push({
                id: Math.random().toString(36).substring(2, 9),
                type: 'hundred',
                x: snap(hStartX + (i % 3) * 105),
                y: snap(25 + Math.floor(i / 3) * 105),
                inBasketId: null
            });
        }

        // 3. Tens column
        const tStartX = hStartX + (hundreds > 0 ? Math.min(3, hundreds) * 105 + 20 : 0);
        for (let i = 0; i < tens; i++) {
            newBlocks.push({
                id: Math.random().toString(36).substring(2, 9),
                type: 'ten',
                x: snap(tStartX + (i % 5) * 38),
                y: snap(25 + Math.floor(i / 5) * 98),
                inBasketId: null
            });
        }

        // 4. Ones column
        const oStartX = tStartX + (tens > 0 ? Math.min(5, tens) * 38 + 20 : 0);
        for (let i = 0; i < ones; i++) {
            newBlocks.push({
                id: Math.random().toString(36).substring(2, 9),
                type: 'one',
                x: snap(oStartX + (i % 5) * 32),
                y: snap(25 + Math.floor(i / 5) * 32),
                inBasketId: null
            });
        }

        setBlocks(newBlocks);
        setSelectedBlockIds([]);
        setIsNumberModalOpen(false);
        setNumberInputValue('');
        setStatusMessage(`Kezdőérték elhelyezve: ${clampedNum.toLocaleString('hu-HU')}`);
        setTimeout(() => setStatusMessage(null), 3500);
    };

    // Move blocks to a specific basket (or back to free workspace if null)
    const moveBlocksToBasket = useCallback((blockIds: string[], targetBasketId: string | null) => {
        if (blockIds.length === 0) return;

        setBlocks(prev => prev.map(b => {
            if (blockIds.includes(b.id)) {
                return {
                    ...b,
                    inBasketId: targetBasketId
                };
            }
            return b;
        }));

        if (targetBasketId) {
            const basketIndex = baskets.findIndex(bk => bk.id === targetBasketId);
            setStatusMessage(`${blockIds.length} elem elhelyezve a(z) ${basketIndex + 1}. csoportban`);
        } else {
            setStatusMessage(`${blockIds.length} elem visszatéve a munkaterületre`);
        }

        setTimeout(() => setStatusMessage(null), 2500);
    }, [baskets]);

    // Break down a single block into 10 smaller units
    const breakDownBlock = (blockId: string | null) => {
        if (!blockId) return;
        const block = blocks.find(b => b.id === blockId);
        if (!block || block.type === 'one') return;

        const newType = PREV_TYPE_MAP[block.type];
        if (!newType) return;

        const newConfig = BLOCK_CONFIG[newType];
        const newSubBlocks: Block[] = Array.from({ length: 10 }).map((_, i) => {
            let offsetX = 0;
            let offsetY = 0;

            if (block.type === 'thousand') {
                offsetX = (i % 5) * (newConfig.width + 6);
                offsetY = Math.floor(i / 5) * (newConfig.height + 6);
            } else if (block.type === 'hundred') {
                offsetX = i * (newConfig.width + 5);
                offsetY = 0;
            } else if (block.type === 'ten') {
                offsetX = (i % 5) * (newConfig.width + 6);
                offsetY = Math.floor(i / 5) * (newConfig.height + 6);
            }

            return {
                id: Math.random().toString(36).substring(2, 9),
                type: newType,
                x: snap(block.x + offsetX),
                y: snap(block.y + offsetY),
                inBasketId: block.inBasketId
            };
        });

        const newIds = newSubBlocks.map(b => b.id);
        setBlocks(prev => prev.filter(b => b.id !== block.id).concat(newSubBlocks));
        setSelectedBlockIds(newIds);
    };

    // Find mergeable candidates
    const getMergeableOption = (): {
        type: BlockType;
        targetType: BlockType;
        blocksToMerge: Block[];
        isFromSelection: boolean;
    } | null => {
        const selectedBlocks = blocks.filter(b => selectedBlockIds.includes(b.id));

        for (const type of ['one', 'ten', 'hundred'] as BlockType[]) {
            const matching = selectedBlocks.filter(b => b.type === type);
            if (matching.length >= 10) {
                const targetType = NEXT_TYPE_MAP[type];
                if (targetType) {
                    return {
                        type,
                        targetType,
                        blocksToMerge: matching.slice(0, 10),
                        isFromSelection: true
                    };
                }
            }
        }

        for (const type of ['one', 'ten', 'hundred'] as BlockType[]) {
            const matching = blocks.filter(b => b.type === type && !b.inBasketId);
            if (matching.length >= 10) {
                const targetType = NEXT_TYPE_MAP[type];
                if (targetType) {
                    return {
                        type,
                        targetType,
                        blocksToMerge: matching.slice(0, 10),
                        isFromSelection: false
                    };
                }
            }
        }

        return null;
    };

    const mergeOption = getMergeableOption();

    const groupBlocks = () => {
        if (!mergeOption) return;

        const { targetType, blocksToMerge } = mergeOption;
        const idsToRemove = new Set(blocksToMerge.map(b => b.id));

        const avgX = blocksToMerge.reduce((sum, b) => sum + b.x, 0) / blocksToMerge.length;
        const avgY = blocksToMerge.reduce((sum, b) => sum + b.y, 0) / blocksToMerge.length;

        const newBlock: Block = {
            id: Math.random().toString(36).substring(2, 9),
            type: targetType,
            x: snap(avgX),
            y: snap(avgY),
            inBasketId: blocksToMerge[0].inBasketId || null
        };

        setBlocks(prev => prev.filter(b => !idsToRemove.has(b.id)).concat(newBlock));
        setSelectedBlockIds([newBlock.id]);
    };

    // Keyboard support: Delete, Numbers 1-6, 0
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedBlockIds.length > 0) {
                    setBlocks(prev => prev.filter(b => !selectedBlockIds.includes(b.id)));
                    setSelectedBlockIds([]);
                }
                return;
            }

            const num = parseInt(e.key, 10);
            if (!isNaN(num) && num >= 1 && num <= 6) {
                const basketIndex = num - 1;
                if (basketIndex < baskets.length && selectedBlockIds.length > 0) {
                    const targetBasket = baskets[basketIndex];
                    moveBlocksToBasket(selectedBlockIds, targetBasket.id);
                }
                return;
            }

            if (e.key === '0' && selectedBlockIds.length > 0) {
                moveBlocksToBasket(selectedBlockIds, null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedBlockIds, baskets, moveBlocksToBasket]);

    // Handle block pointer down
    const handleBlockMouseDown = (e: React.MouseEvent, blockId: string) => {
        e.stopPropagation();

        const isShiftOrCtrl = e.shiftKey || e.ctrlKey || e.metaKey;
        let newSelectedIds: string[];

        if (selectedBlockIds.includes(blockId)) {
            newSelectedIds = selectedBlockIds;
        } else {
            if (isShiftOrCtrl) {
                newSelectedIds = [...selectedBlockIds, blockId];
            } else {
                newSelectedIds = [blockId];
            }
            setSelectedBlockIds(newSelectedIds);
        }

        const initialPositions: Record<string, { x: number; y: number }> = {};
        blocks.forEach(b => {
            if (newSelectedIds.includes(b.id)) {
                initialPositions[b.id] = { x: b.x, y: b.y };
            }
        });

        dragDataRef.current = {
            pointerStartX: e.clientX,
            pointerStartY: e.clientY,
            hasMoved: false,
            activeBlockId: blockId,
            initialPositions
        };
        setIsDragging(true);
    };

    // Workspace pointer down (for rubber-band selection)
    const handleWorkspaceMouseDown = (e: React.MouseEvent) => {
        if (!workspaceRef.current) return;
        const rect = workspaceRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        const basketsEl = basketsContainerRef.current;
        if (basketsEl) {
            const bRect = basketsEl.getBoundingClientRect();
            if (e.clientY >= bRect.top) {
                return;
            }
        }

        setSelectionBox({
            startX,
            startY,
            currentX: startX,
            currentY: startY
        });

        if (!e.shiftKey && !e.ctrlKey) {
            setSelectedBlockIds([]);
        }
    };

    // Workspace mouse move
    const handleWorkspaceMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            let foundBasketId: string | null = null;
            for (const basket of baskets) {
                const el = basketRefs.current[basket.id];
                if (el) {
                    const bRect = el.getBoundingClientRect();
                    if (
                        e.clientX >= bRect.left &&
                        e.clientX <= bRect.right &&
                        e.clientY >= bRect.top &&
                        e.clientY <= bRect.bottom
                    ) {
                        foundBasketId = basket.id;
                        break;
                    }
                }
            }
            setHoveredBasketId(foundBasketId);
        }

        if (!workspaceRef.current) return;
        const rect = workspaceRef.current.getBoundingClientRect();

        if (dragDataRef.current && isDragging) {
            const deltaX = e.clientX - dragDataRef.current.pointerStartX;
            const deltaY = e.clientY - dragDataRef.current.pointerStartY;

            if (Math.hypot(deltaX, deltaY) > 3) {
                dragDataRef.current.hasMoved = true;
            }

            const initialPositions = dragDataRef.current.initialPositions;
            setBlocks(prev => prev.map(b => {
                if (initialPositions[b.id]) {
                    const rawX = initialPositions[b.id].x + deltaX;
                    const rawY = initialPositions[b.id].y + deltaY;
                    return {
                        ...b,
                        x: snap(Math.max(0, Math.min(rect.width - 40, rawX))),
                        y: snap(Math.max(0, Math.min(rect.height - 40, rawY)))
                    };
                }
                return b;
            }));
            return;
        }

        if (selectionBox) {
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            setSelectionBox(prev => prev ? { ...prev, currentX, currentY } : null);

            const boxLeft = Math.min(selectionBox.startX, currentX);
            const boxTop = Math.min(selectionBox.startY, currentY);
            const boxRight = Math.max(selectionBox.startX, currentX);
            const boxBottom = Math.max(selectionBox.startY, currentY);

            const intersectingIds = blocks
                .filter(b => !b.inBasketId)
                .filter(b => {
                    const conf = BLOCK_CONFIG[b.type];
                    const blockRight = b.x + conf.width;
                    const blockBottom = b.y + conf.height;
                    return b.x < boxRight && blockRight > boxLeft && b.y < boxBottom && blockBottom > boxTop;
                })
                .map(b => b.id);

            setSelectedBlockIds(intersectingIds);
        }
    };

    // Mouse up: drop detection
    const handleMouseUp = () => {
        if (dragDataRef.current) {
            const { hasMoved } = dragDataRef.current;

            if (hasMoved) {
                if (hoveredBasketId) {
                    const movingIds = selectedBlockIds;
                    setBlocks(prev => prev.map(b => {
                        if (movingIds.includes(b.id)) {
                            return { ...b, inBasketId: hoveredBasketId };
                        }
                        return b;
                    }));
                    const basketIndex = baskets.findIndex(bk => bk.id === hoveredBasketId);
                    setStatusMessage(`${movingIds.length} elem elhelyezve a(z) ${basketIndex + 1}. csoportban!`);
                    setTimeout(() => setStatusMessage(null), 2000);
                }
            }

            dragDataRef.current = null;
            setIsDragging(false);
            setHoveredBasketId(null);
        }

        if (selectionBox) {
            setSelectionBox(null);
        }
    };

    const addBasket = () => {
        if (baskets.length >= 6) return;
        setBaskets(prev => [...prev, { id: Math.random().toString(36).substring(2, 9), index: prev.length }]);
    };

    const removeBasket = (basketId?: string) => {
        setBaskets(prev => {
            const targetId = basketId || prev[prev.length - 1]?.id;
            if (!targetId) return prev;

            setBlocks(b => b.map(block => block.inBasketId === targetId ? { ...block, inBasketId: null } : block));
            return prev.filter(b => b.id !== targetId).map((b, idx) => ({ ...b, index: idx }));
        });
    };

    const clearBasket = (basketId: string) => {
        setBlocks(prev => prev.map(b => b.inBasketId === basketId ? { ...b, inBasketId: null } : b));
    };

    const deleteSelected = () => {
        if (selectedBlockIds.length > 0) {
            setBlocks(prev => prev.filter(b => !selectedBlockIds.includes(b.id)));
            setSelectedBlockIds([]);
        }
    };

    const reset = () => {
        setBlocks([]);
        setBaskets([]);
        setSelectedBlockIds([]);
        setIsAutoDistributing(false);
    };

    // ==========================================
    // AUTOMATIC DISTRIBUTION WITH ANIMATION
    // ==========================================
    const runAutoDistribute = async () => {
        if (baskets.length < 2 || isAutoDistributing) return;

        const freeBlocks = blocks.filter(b => !b.inBasketId);
        if (freeBlocks.length === 0) {
            setStatusMessage('Nincs szétosztható szabad blokk a munkaterületen!');
            setTimeout(() => setStatusMessage(null), 2500);
            return;
        }

        setIsAutoDistributing(true);
        setStatusMessage('Automatikus szétosztás folyamatban...');

        let currentBlocks = [...blocks];
        const numBaskets = baskets.length;

        const types: BlockType[] = ['thousand', 'hundred', 'ten', 'one'];

        for (const type of types) {
            let sameTypeFree = currentBlocks.filter(b => b.type === type && !b.inBasketId);
            const totalCount = sameTypeFree.length;
            const fairShare = Math.floor(totalCount / numBaskets);
            const remainder = totalCount % numBaskets;

            if (fairShare > 0) {
                for (let round = 0; round < fairShare; round++) {
                    for (let bIndex = 0; bIndex < numBaskets; bIndex++) {
                        const blockToMove = sameTypeFree.shift();
                        if (blockToMove) {
                            const targetBasketId = baskets[bIndex].id;
                            currentBlocks = currentBlocks.map(b => b.id === blockToMove.id ? { ...b, inBasketId: targetBasketId } : b);
                            setBlocks([...currentBlocks]);
                            await new Promise(r => setTimeout(r, 180));
                        }
                    }
                }
            }

            if (remainder > 0 && type !== 'one') {
                const newType = PREV_TYPE_MAP[type]!;
                const newConfig = BLOCK_CONFIG[newType];

                for (const remBlock of sameTypeFree) {
                    const newSubBlocks: Block[] = Array.from({ length: 10 }).map((_, i) => ({
                        id: Math.random().toString(36).substring(2, 9),
                        type: newType,
                        x: snap(remBlock.x + (i % 5) * (newConfig.width + 6)),
                        y: snap(remBlock.y + Math.floor(i / 5) * (newConfig.height + 6)),
                        inBasketId: null
                    }));

                    currentBlocks = currentBlocks.filter(b => b.id !== remBlock.id).concat(newSubBlocks);
                    setBlocks([...currentBlocks]);
                    await new Promise(r => setTimeout(r, 220));
                }
            }
        }

        setIsAutoDistributing(false);

        const basketValues = baskets.map(bk =>
            currentBlocks.filter(b => b.inBasketId === bk.id).reduce((sum, b) => sum + BLOCK_CONFIG[b.type].value, 0)
        );
        const remTotal = currentBlocks.filter(b => !b.inBasketId).reduce((sum, b) => sum + BLOCK_CONFIG[b.type].value, 0);

        if (remTotal > 0) {
            setStatusMessage(`Szétosztás kész! Csoportonként: ${basketValues[0].toLocaleString('hu-HU')} • Maradék: ${remTotal.toLocaleString('hu-HU')}`);
        } else {
            setStatusMessage(`Sikeres egyenlő szétosztás! Csoportonként: ${basketValues[0].toLocaleString('hu-HU')}`);
        }
        setTimeout(() => setStatusMessage(null), 4000);
    };

    // Calculate totals for header display
    const thousandCount = blocks.filter(b => b.type === 'thousand').length;
    const hundredCount = blocks.filter(b => b.type === 'hundred').length;
    const tenCount = blocks.filter(b => b.type === 'ten').length;
    const oneCount = blocks.filter(b => b.type === 'one').length;
    const totalValue = blocks.reduce((acc, b) => acc + BLOCK_CONFIG[b.type].value, 0);

    const canBreakDown = selectedBlockIds.length === 1 && blocks.find(b => b.id === selectedBlockIds[0])?.type !== 'one';
    const singleSelectedBlock = selectedBlockIds.length === 1 ? blocks.find(b => b.id === selectedBlockIds[0]) : null;

    // Free blocks on the canvas
    const freeBlocks = blocks.filter(b => !b.inBasketId);

    // Number preview calculation for modal
    const parsedInput = parseInt(numberInputValue, 10);
    const validNumber = !isNaN(parsedInput) && parsedInput > 0 ? Math.min(9999, parsedInput) : null;
    const previewThousands = validNumber ? Math.floor(validNumber / 1000) : 0;
    const previewHundreds = validNumber ? Math.floor((validNumber % 1000) / 100) : 0;
    const previewTens = validNumber ? Math.floor((validNumber % 100) / 10) : 0;
    const previewOnes = validNumber ? validNumber % 10 : 0;

    return (
        <div
            ref={mainContainerRef}
            className={cn(
                "flex flex-col bg-slate-50 transition-all duration-200 select-none relative",
                isFullscreen
                    ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none border-0 shadow-none m-0 p-0"
                    : "h-[calc(100vh-5.5rem)] min-h-[620px] max-h-[920px] rounded-3xl border border-slate-200 shadow-xl overflow-hidden m-0"
            )}
        >
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm z-30 shrink-0">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-100 rounded-full h-9 w-9">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-base font-bold text-slate-800">Osztás vizuálisan</h2>
                            {/* Live Total Value Pill */}
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 rounded-full border border-slate-200">
                                <span className="text-[11px] font-medium text-slate-500">Összérték:</span>
                                <span className="text-xs font-black text-indigo-600">{totalValue.toLocaleString('hu-HU')}</span>
                            </div>

                            {/* Status notification toast */}
                            {statusMessage && (
                                <div className="hidden md:flex items-center gap-1.5 px-3 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full animate-in fade-in zoom-in">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                                    <span>{statusMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Counter Badges */}
                <div className="hidden xl:flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-2xl border border-slate-200">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-red-100 text-red-700 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                        {thousandCount} ezres
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                        {hundredCount} százas
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                        {tenCount} tízes
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs">
                        <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                        {oneCount} egyes
                    </span>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {/* SET NUMBER BUTTON */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsNumberModalOpen(true)}
                        className="rounded-xl h-9 px-3 bg-amber-50/80 border-amber-300 text-amber-800 hover:bg-amber-100 font-bold shadow-sm transition-all"
                        title="Kezdőérték gyors beállítása szám megadásával (pl. 345)"
                    >
                        <Hash className="w-4 h-4 mr-1.5 text-amber-600" />
                        <span className="text-xs">Szám beírása</span>
                    </Button>

                    {/* FULLSCREEN BUTTON */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFullscreen}
                        className={cn(
                            "rounded-xl h-9 px-3 font-semibold transition-all border-slate-200",
                            isFullscreen
                                ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                                : "text-slate-600 hover:bg-slate-100"
                        )}
                        title={isFullscreen ? "Kilépés a teljes képernyőből (Esc)" : "Teljes képernyős mód bekapcsolása"}
                    >
                        {isFullscreen ? (
                            <>
                                <Minimize2 className="w-4 h-4 mr-1.5 text-indigo-600" />
                                <span className="text-xs font-bold">Kilépés</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-4 h-4 mr-1.5 text-slate-500" />
                                <span className="text-xs">Teljes képernyő</span>
                            </>
                        )}
                    </Button>

                    {/* AUTO DISTRIBUTE BUTTON */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={runAutoDistribute}
                        disabled={baskets.length < 2 || freeBlocks.length === 0 || isAutoDistributing}
                        className={cn(
                            "rounded-xl h-9 px-3 font-bold transition-all shadow-md",
                            baskets.length >= 2 && freeBlocks.length > 0 && !isAutoDistributing
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white animate-pulse"
                                : "bg-slate-200 text-slate-400 opacity-60 shadow-none"
                        )}
                        title={
                            baskets.length < 2
                                ? "Adj hozzá legalább 2 csoportot az automatikus szétosztáshoz!"
                                : freeBlocks.length === 0
                                ? "Nincs szabad blokk a munkaterületen!"
                                : "Szabad blokkok egyenlő szétosztása a csoportok között látványos animációval!"
                        }
                    >
                        <Sparkles className={cn("w-4 h-4 mr-1.5", isAutoDistributing && "animate-spin")} />
                        <span className="text-xs">
                            {isAutoDistributing ? "Szétosztás..." : "Automatikus szétosztás"}
                        </span>
                    </Button>

                    <Button
                        variant={magnetEnabled ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMagnetEnabled(!magnetEnabled)}
                        className={cn(
                            "rounded-xl h-9 px-2.5 font-medium transition-all",
                            magnetEnabled
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600 border-slate-200 hover:bg-slate-100"
                        )}
                        title="Rácshoz igazítás (Mágnes)"
                    >
                        <Magnet className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Mágnes</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => breakDownBlock(singleSelectedBlock?.id || null)}
                        disabled={!canBreakDown}
                        className={cn(
                            "rounded-xl h-9 px-3 transition-all",
                            canBreakDown
                                ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100 shadow-sm font-semibold"
                                : "opacity-40 border-slate-200 text-slate-400"
                        )}
                        title={canBreakDown ? "10 kisebb egységre bontás" : "Jelölj ki egy ezrest, százast vagy tízest a felbontáshoz!"}
                    >
                        <Divide className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Szétbontás</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={groupBlocks}
                        disabled={!mergeOption}
                        className={cn(
                            "rounded-xl h-9 px-3 transition-all",
                            mergeOption
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent shadow-md font-bold animate-pulse"
                                : "opacity-40 border-slate-200 text-slate-400"
                        )}
                        title={
                            mergeOption
                                ? `10 ${BLOCK_CONFIG[mergeOption.type].singularName} összevonása 1 ${BLOCK_CONFIG[mergeOption.targetType].singularName}sé`
                                : "Jelölj ki legalább 10 azonos típusú blokkot az összevonáshoz!"
                        }
                    >
                        <Combine className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">
                            {mergeOption
                                ? `Összevonás (10 ${BLOCK_CONFIG[mergeOption.type].singularName} → 1 ${BLOCK_CONFIG[mergeOption.targetType].singularName})`
                                : "Összevonás"}
                        </span>
                    </Button>

                    <div className="w-px h-5 bg-slate-200 mx-0.5" />

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addBasket}
                        disabled={baskets.length >= 6}
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-xl h-9 text-xs font-semibold px-2.5"
                    >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Új csoport
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={deleteSelected}
                        disabled={selectedBlockIds.length === 0}
                        className={cn(
                            "h-9 w-9 rounded-full transition-all",
                            selectedBlockIds.length > 0
                                ? "text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 shadow-sm"
                                : "text-slate-300"
                        )}
                        title={selectedBlockIds.length > 0 ? `Kijelölt elemek törlése (${selectedBlockIds.length} db) [Del gomb]` : "Nincs kijelölt elem"}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={reset}
                        className="h-9 w-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                        title="Teljes munkaterület ürítése"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Area: Sidebar + Single Unified Workspace Canvas */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <Card className="w-44 m-2 mr-0 rounded-2xl border-slate-200 shadow-sm flex flex-col gap-4 p-3 bg-white z-20 overflow-y-auto shrink-0 select-none">
                    <div className="text-center">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Eszköztár</h3>
                        <p className="text-[10px] text-slate-400">Kattints a hozzáadáshoz!</p>
                    </div>

                    {/* 1000 Block */}
                    <div className="flex flex-col items-center gap-1.5 group">
                        <button
                            type="button"
                            onClick={() => addBlock('thousand')}
                            className={cn(
                                "w-16 h-16 rounded-xl shadow-md cursor-pointer border-b-4 border-red-700 bg-red-500",
                                "transition-all transform hover:scale-105 hover:shadow-lg active:scale-95",
                                "flex flex-col items-center justify-center text-white font-black text-xs relative overflow-hidden"
                            )}
                            title="1000-es ezres blokk lehelyezése"
                        >
                            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                backgroundSize: '14px 14px'
                            }} />
                            <span className="relative z-10 drop-shadow-sm font-black">1000</span>
                        </button>
                        <span className="text-[11px] font-bold text-slate-700">1000 (ezres)</span>
                    </div>

                    {/* 100 Block */}
                    <div className="flex flex-col items-center gap-1.5 group">
                        <button
                            type="button"
                            onClick={() => addBlock('hundred')}
                            className={cn(
                                "w-14 h-14 rounded-lg shadow-md cursor-pointer border-b-4 border-emerald-700 bg-emerald-500",
                                "transition-all transform hover:scale-105 hover:shadow-lg active:scale-95",
                                "flex flex-col items-center justify-center text-white font-black text-xs relative overflow-hidden"
                            )}
                            title="100-as százas lap lehelyezése"
                        >
                            <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)',
                                backgroundSize: '10% 10%'
                            }} />
                            <span className="relative z-10 drop-shadow-sm font-black">100</span>
                        </button>
                        <span className="text-[11px] font-bold text-slate-700">100 (százas)</span>
                    </div>

                    {/* 10 Block */}
                    <div className="flex flex-col items-center gap-1.5 group">
                        <button
                            type="button"
                            onClick={() => addBlock('ten')}
                            className={cn(
                                "w-6 h-16 rounded-md shadow-md cursor-pointer border-b-4 border-blue-700 bg-blue-500",
                                "transition-all transform hover:scale-105 hover:shadow-lg active:scale-95",
                                "flex flex-col items-center justify-center text-white font-black text-[10px] relative overflow-hidden"
                            )}
                            title="10-es tízes rúd lehelyezése"
                        >
                            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)',
                                backgroundSize: '100% 10%'
                            }} />
                            <span className="relative z-10 drop-shadow-sm font-black">10</span>
                        </button>
                        <span className="text-[11px] font-bold text-slate-700">10 (tízes)</span>
                    </div>

                    {/* 1 Block */}
                    <div className="flex flex-col items-center gap-1.5 group">
                        <button
                            type="button"
                            onClick={() => addBlock('one')}
                            className={cn(
                                "w-6 h-6 rounded-md shadow-md cursor-pointer border-b-4 border-amber-600 bg-amber-400",
                                "transition-all transform hover:scale-110 hover:shadow-lg active:scale-95",
                                "flex items-center justify-center text-amber-950 font-black text-[11px] relative"
                            )}
                            title="1-es egyes kocka lehelyezése"
                        >
                            <span className="drop-shadow-sm font-black">1</span>
                        </button>
                        <span className="text-[11px] font-bold text-slate-700">1 (egyes)</span>
                    </div>

                    <div className="mt-auto p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-100 text-[10px] text-indigo-900 flex flex-col gap-1 leading-snug">
                        <div className="flex items-center gap-1 font-bold text-indigo-700">
                            <Info className="w-3 h-3" /> Tippek:
                        </div>
                        <p>• <b>Szám beírása</b>: kezdőérték automatikus kirakása</p>
                        <p>• <b>1, 2, 3..</b>: kijelölt blokk csoportba tétele</p>
                        <p>• <b>0</b>: visszavétel a táblára</p>
                    </div>
                </Card>

                {/* UNIFIED Workspace Canvas (No clipping between workspace and baskets!) */}
                <div
                    ref={workspaceRef}
                    className="flex-1 flex flex-col m-2 overflow-hidden relative rounded-2xl border border-slate-200 bg-white shadow-inner select-none"
                    onMouseDown={handleWorkspaceMouseDown}
                    onMouseMove={handleWorkspaceMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{
                        backgroundImage: magnetEnabled
                            ? 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)'
                            : 'none',
                        backgroundSize: '20px 20px'
                    }}
                >
                    {/* Guide when canvas is completely empty */}
                    {freeBlocks.length === 0 && blocks.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none select-none z-0 pb-64">
                            <Hand className="w-12 h-12 mb-2 text-slate-300 opacity-60 animate-bounce" />
                            <p className="text-base font-bold text-slate-400">Kattints a fenti „Szám beírása” gombra vagy a bal oldali blokkokra!</p>
                            <p className="text-xs text-slate-400 mt-1">Pl. írd be, hogy 345, és azonnal elhelyezi a megfelelő blokkokat a szétosztáshoz.</p>
                        </div>
                    )}

                    {/* Rubber-band Selection Box (z-30) */}
                    {selectionBox && (
                        <div
                            className="absolute border-2 border-blue-500 bg-blue-500/15 rounded-md pointer-events-none z-30 transition-none"
                            style={{
                                left: Math.min(selectionBox.startX, selectionBox.currentX),
                                top: Math.min(selectionBox.startY, selectionBox.currentY),
                                width: Math.abs(selectionBox.currentX - selectionBox.startX),
                                height: Math.abs(selectionBox.currentY - selectionBox.startY)
                            }}
                        />
                    )}

                    {/* BOTTOM BASKETS AREA (z-10 layer: so dragged blocks at z-50 stay ABOVE it!) */}
                    <div
                        ref={basketsContainerRef}
                        className="absolute bottom-0 left-0 right-0 h-60 bg-slate-100/95 border-t-2 border-slate-200/90 p-3 flex gap-3 overflow-x-auto z-10 shadow-inner"
                    >
                        {baskets.map((basket, i) => {
                            const basketBlocks = blocks.filter(b => b.inBasketId === basket.id);
                            const basketTotal = basketBlocks.reduce((sum, b) => sum + BLOCK_CONFIG[b.type].value, 0);
                            const isHovered = hoveredBasketId === basket.id;

                            const bThousands = basketBlocks.filter(b => b.type === 'thousand');
                            const bHundreds = basketBlocks.filter(b => b.type === 'hundred');
                            const bTens = basketBlocks.filter(b => b.type === 'ten');
                            const bOnes = basketBlocks.filter(b => b.type === 'one');

                            return (
                                <div
                                    key={basket.id}
                                    ref={el => { basketRefs.current[basket.id] = el; }}
                                    className={cn(
                                        "flex-1 min-w-[220px] max-w-[420px] rounded-2xl border-2 flex flex-col transition-all duration-200 shadow-sm p-3 relative bg-white",
                                        isHovered
                                            ? "border-blue-500 ring-4 ring-blue-400 bg-blue-50/70 scale-[1.02] shadow-xl"
                                            : "border-slate-200 hover:border-blue-300"
                                    )}
                                >
                                    {/* Basket Header */}
                                    <div className="flex items-center justify-between w-full border-b border-slate-100 pb-2 mb-2 shrink-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-[11px] font-black tracking-wider uppercase">
                                                {i + 1}. CSOPORT
                                            </span>
                                            <span className={cn(
                                                "text-xs font-black px-2 py-0.5 rounded-md transition-all",
                                                basketTotal > 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-400 font-normal"
                                            )}>
                                                {basketTotal > 0 ? `${basketTotal.toLocaleString('hu-HU')}` : 'Üres'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {/* Quick-deposit button if blocks are selected */}
                                            {selectedBlockIds.length > 0 && selectedBlockIds.some(id => !blocks.find(b => b.id === id)?.inBasketId) && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveBlocksToBasket(selectedBlockIds, basket.id);
                                                    }}
                                                    className="h-6 px-2 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 rounded-md font-bold"
                                                    title={`Kijelölt ${selectedBlockIds.length} elem berakása ide`}
                                                >
                                                    <CornerDownRight className="w-3 h-3 mr-0.5" /> Betesz
                                                </Button>
                                            )}

                                            {/* Clear basket */}
                                            {basketBlocks.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => clearBasket(basket.id)}
                                                    className="w-6 h-6 rounded-full hover:bg-amber-50 hover:text-amber-600 text-slate-400 flex items-center justify-center transition-colors"
                                                    title="Minden elem visszavétele a munkaterületre"
                                                >
                                                    <ArrowUpFromLine className="w-3.5 h-3.5" />
                                                </button>
                                            )}

                                            {/* Remove basket */}
                                            <button
                                                type="button"
                                                onClick={() => removeBasket(basket.id)}
                                                className="w-6 h-6 rounded-full hover:bg-red-50 hover:text-red-600 text-slate-400 flex items-center justify-center transition-colors"
                                                title="Csoport törlése"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Basket Content / Blocks Grid */}
                                    <div className="flex-1 overflow-y-auto flex flex-wrap content-start items-center gap-1.5 p-1 rounded-xl bg-slate-50/70 border border-dashed border-slate-200">
                                        {basketBlocks.length === 0 ? (
                                            <div className="flex-1 h-full flex flex-col items-center justify-center text-slate-400 text-xs italic p-2 text-center select-none">
                                                <p className="font-semibold text-slate-500">Húzz ide blokkokat!</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">Vagy jelöld ki és nyomd meg a(z) <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono font-bold text-slate-700">{i + 1}</kbd> billentyűt.</p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Thousands in basket */}
                                                {bThousands.map(b => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => setSelectedBlockIds([b.id])}
                                                        onDoubleClick={() => moveBlocksToBasket([b.id], null)}
                                                        className={cn(
                                                            "w-12 h-12 rounded-lg bg-red-500 text-white font-black text-[11px] shadow-sm flex items-center justify-center border-b-2 border-red-700 transition-all",
                                                            selectedBlockIds.includes(b.id) ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                                                        )}
                                                        title="Kattints a kijelöléshez, duplán a visszavételhez!"
                                                    >
                                                        1000
                                                    </button>
                                                ))}

                                                {/* Hundreds in basket */}
                                                {bHundreds.map(b => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => setSelectedBlockIds([b.id])}
                                                        onDoubleClick={() => moveBlocksToBasket([b.id], null)}
                                                        className={cn(
                                                            "w-11 h-11 rounded-lg bg-emerald-500 text-white font-black text-[11px] shadow-sm flex items-center justify-center border-b-2 border-emerald-700 transition-all",
                                                            selectedBlockIds.includes(b.id) ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                                                        )}
                                                        title="Kattints a kijelöléshez, duplán a visszavételhez!"
                                                    >
                                                        100
                                                    </button>
                                                ))}

                                                {/* Tens in basket */}
                                                {bTens.map(b => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => setSelectedBlockIds([b.id])}
                                                        onDoubleClick={() => moveBlocksToBasket([b.id], null)}
                                                        className={cn(
                                                            "w-5 h-11 rounded-md bg-blue-500 text-white font-black text-[9px] shadow-sm flex items-center justify-center border-b-2 border-blue-700 transition-all",
                                                            selectedBlockIds.includes(b.id) ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                                                        )}
                                                        title="Kattints a kijelöléshez, duplán a visszavételhez!"
                                                    >
                                                        10
                                                    </button>
                                                ))}

                                                {/* Ones in basket */}
                                                {bOnes.map(b => (
                                                    <button
                                                        key={b.id}
                                                        type="button"
                                                        onClick={() => setSelectedBlockIds([b.id])}
                                                        onDoubleClick={() => moveBlocksToBasket([b.id], null)}
                                                        className={cn(
                                                            "w-5 h-5 rounded-md bg-amber-400 text-amber-950 font-black text-[10px] shadow-sm flex items-center justify-center border-b-2 border-amber-600 transition-all",
                                                            selectedBlockIds.includes(b.id) ? "ring-2 ring-blue-500 scale-105" : "hover:scale-105"
                                                        )}
                                                        title="Kattints a kijelöléshez, duplán a visszavételhez!"
                                                    >
                                                        1
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    {/* Bottom Shortcut Hint Badge */}
                                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1 font-medium">
                                        <span>{basketBlocks.length} db elem</span>
                                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">Gomb: {i + 1}</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Empty Baskets State */}
                        {baskets.length === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400/90 pointer-events-none select-none">
                                <p className="text-sm font-semibold text-slate-500">
                                    Kattints a fenti <span className="font-bold text-blue-600">+ Új csoport</span> gombra a blokkok szétosztásához!
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    A csoportokba behúzással vagy a billentyűzet <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono font-bold text-slate-700">1, 2, 3..</kbd> gombjaival villámgyorsan szétoszthatod a számokat.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* FREE BLOCKS LAYER: Rendered on common canvas above baskets! */}
                    {freeBlocks.map(block => {
                        const config = BLOCK_CONFIG[block.type];
                        const isSelected = selectedBlockIds.includes(block.id);
                        const isCurrentlyDragged = isDragging && selectedBlockIds.includes(block.id);

                        return (
                            <div
                                key={block.id}
                                className={cn(
                                    "absolute cursor-grab active:cursor-grabbing select-none transition-transform",
                                    "rounded-xl border-b-4 flex flex-col items-center justify-center font-black",
                                    config.bgColor,
                                    config.borderColor,
                                    block.type === 'one' ? 'text-amber-950 text-xs' : 'text-white',
                                    isCurrentlyDragged
                                        ? "z-50 shadow-2xl scale-110 brightness-110 ring-4 ring-blue-500 pointer-events-none"
                                        : isSelected
                                        ? "z-30 ring-4 ring-blue-500 ring-offset-2 ring-offset-white shadow-xl scale-105"
                                        : "z-20 shadow-md hover:shadow-lg hover:scale-[1.02]"
                                )}
                                style={{
                                    left: block.x,
                                    top: block.y,
                                    width: config.width,
                                    height: config.height
                                }}
                                onMouseDown={(e) => handleBlockMouseDown(e, block.id)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (e.shiftKey || e.ctrlKey || e.metaKey) {
                                        setSelectedBlockIds(prev =>
                                            prev.includes(block.id)
                                                ? prev.filter(id => id !== block.id)
                                                : [...prev, block.id]
                                        );
                                    } else {
                                        setSelectedBlockIds([block.id]);
                                    }
                                }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    breakDownBlock(block.id);
                                }}
                                title="Kattints a kijelöléshez (vagy duplán a felbontáshoz)! Húzd a lenti csoportokba, vagy nyomj egy számot (1-6)!"
                            >
                                {/* Montessori Grid Textures */}
                                {block.type === 'thousand' && (
                                    <div className="absolute inset-0 opacity-20 pointer-events-none rounded-lg" style={{
                                        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                        backgroundSize: '14px 14px'
                                    }} />
                                )}
                                {block.type === 'hundred' && (
                                    <div className="absolute inset-0 opacity-25 pointer-events-none rounded-lg" style={{
                                        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)',
                                        backgroundSize: '10% 10%'
                                    }} />
                                )}
                                {block.type === 'ten' && (
                                    <div className="absolute inset-0 opacity-30 pointer-events-none rounded-md" style={{
                                        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)',
                                        backgroundSize: '100% 10%'
                                    }} />
                                )}

                                <span className="relative z-10 drop-shadow-sm select-none">
                                    {block.type === 'one' ? '1' : config.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SET INITIAL NUMBER MODAL */}
            {isNumberModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setIsNumberModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Kezdőérték beállítása</h3>
                                    <p className="text-xs text-slate-500">Add meg a számot, és elhelyezzük a blokkokat a táblán!</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsNumberModalOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Input Box */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Beírandó szám (1 – 9999):
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="9999"
                                autoFocus
                                value={numberInputValue}
                                onChange={(e) => setNumberInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        applyInitialNumber();
                                    } else if (e.key === 'Escape') {
                                        setIsNumberModalOpen(false);
                                    }
                                }}
                                placeholder="pl. 345"
                                className="w-full text-3xl font-black text-center h-16 tracking-widest text-slate-800 bg-slate-50 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all shadow-inner"
                            />
                        </div>

                        {/* Live Place-Value Preview */}
                        {validNumber && (
                            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-2 animate-in fade-in">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    Létrejövő helyiérték-blokkok:
                                </span>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {previewThousands > 0 && (
                                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-100 text-red-800 font-bold text-xs shadow-sm">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                                            {previewThousands} ezres
                                        </span>
                                    )}
                                    {previewHundreds > 0 && (
                                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs shadow-sm">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                                            {previewHundreds} százas
                                        </span>
                                    )}
                                    {previewTens > 0 && (
                                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 font-bold text-xs shadow-sm">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                                            {previewTens} tízes
                                        </span>
                                    )}
                                    {previewOnes > 0 && (
                                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs shadow-sm">
                                            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                                            {previewOnes} egyes
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quick Presets */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Gyors példák az osztáshoz:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {[24, 72, 135, 345, 642, 1200].map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => {
                                            setNumberInputValue(val.toString());
                                            applyInitialNumber(val);
                                        }}
                                        className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 transition-all"
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                            <Button
                                variant="ghost"
                                onClick={() => setIsNumberModalOpen(false)}
                                className="rounded-xl h-10 px-4 text-slate-500 hover:bg-slate-100"
                            >
                                Mégse
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => applyInitialNumber()}
                                disabled={!validNumber}
                                className={cn(
                                    "rounded-xl h-10 px-5 font-bold shadow-md transition-all",
                                    validNumber
                                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                                        : "opacity-40"
                                )}
                            >
                                Elhelyezés a munkaterületen
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
