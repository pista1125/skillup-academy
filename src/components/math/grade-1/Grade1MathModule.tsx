import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grade1Addition } from "@/components/math/grade-1/Grade1Addition";
import { MathSnakeGame } from "@/components/math/games/snake/MathSnakeGame";
import { LessonViewer } from "@/components/math/shared/LessonViewer";
import { GRADE_1_MATERIALS } from "@/components/math/shared/MaterialGallery";
import {
    Gamepad2,
    ArrowLeft,
    Sparkles,
    Star,
    Zap,
    Target,
    BookOpen,
    Download,
    FileText,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Grade1MathModuleProps {
    onBack: () => void;
    initialView?: string;
    onStartActivity?: (type: string) => void;
}

type ViewType = 'menu' | 'addition10' | 'snake' | 'materials';

export function Grade1MathModule({ onBack, initialView, onStartActivity }: Grade1MathModuleProps) {
    const [view, setView] = useState<ViewType | string>(() => {
        if (!initialView || initialView === 'grade1-basic') {
            return 'menu';
        }
        return initialView.replace('grade1-', '');
    });
    const [activeMaterial, setActiveMaterial] = useState<{ title: string; path: string } | null>(null);

    const handleBackToMenu = () => {
        setActiveMaterial(null);
        if (onStartActivity) {
            onStartActivity('grade1-basic');
        } else {
            setView('menu');
        }
    };

    useEffect(() => {
        if (initialView && initialView !== view) {
            if (initialView === 'grade1-basic') {
                setView('menu');
            } else {
                setView(initialView.replace('grade1-', ''));
            }
        }
    }, [initialView]);


    if (view === 'menu') {
        return (
            <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border-4 border-pink-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-pink-100 rounded-2xl text-pink-600">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800">Elsős Matek Tanoda</h2>
                            <p className="text-slate-500 font-bold">Válassz egy izgalmas játékot vagy tankönyvet!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={onBack} className="rounded-2xl border-2 font-bold px-6">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KidsCard
                        title="Számoljunk 10-ig!"
                        description="Segíts az állatkáknak összeszámolni a jutalomfalatokat!"
                        icon={<Star className="w-12 h-12" />}
                        color="bg-amber-50 text-amber-500 border-amber-100"
                        onClick={() => onStartActivity?.('grade1-addition10')}
                        badge="ÜGYESSÉGI"
                    />
                    <KidsCard
                        title="Matek Kígyó 🐍"
                        description="Irányítsd a kígyót és edd meg a helyes válaszokat!"
                        icon={<Target className="w-12 h-12" />}
                        color="bg-emerald-50 text-emerald-500 border-emerald-100"
                        onClick={() => onStartActivity?.('grade1-snake')}
                        badge="JÁTÉK"
                        highlight
                    />
                    <KidsCard
                        title="Tankönyvek & Munkafüzetek 📚"
                        description="Matematika 1. I. és II. kötet tankönyvek és munkafüzetek letöltése és olvasása!"
                        icon={<BookOpen className="w-12 h-12" />}
                        color="bg-purple-50 text-purple-600 border-purple-100"
                        onClick={() => setView('materials')}
                        badge="TANKÖNYVEK"
                        highlight
                    />
                </div>

                <div className="bg-blue-50/50 p-8 rounded-[40px] border-4 border-blue-100 flex items-center gap-6">
                    <div className="p-4 bg-blue-500 rounded-3xl text-white shadow-lg shadow-blue-500/30">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-blue-900 mb-1">Tudtad?</h4>
                        <p className="text-blue-800/80 font-bold">Az összes 1. osztályos tankönyv és munkafüzet ingyenesen letölthető és interaktívan megnyitható nálunk!</p>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'materials') {
        return (
            <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border-4 border-purple-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-2xl text-purple-600">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl font-black text-slate-800">1. Osztályos Tankönyvek és Munkafüzetek</h2>
                            <p className="text-slate-500 font-bold">Hivatalos Oktatási Hivatal (OH) tankönyvek letöltése és interaktív megtekintése</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleBackToMenu} className="rounded-2xl border-2 font-bold px-6">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza a menübe
                    </Button>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GRADE_1_MATERIALS.map((material) => (
                        <Card key={material.id} className="overflow-hidden rounded-3xl border-2 border-slate-100 hover:border-purple-300 transition-all hover:shadow-xl group bg-white">
                            <CardHeader className="bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border-b p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-purple-100 group-hover:scale-110 transition-transform">
                                        <FileText className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <CardTitle className="text-xl font-black text-slate-800 mb-1">{material.title}</CardTitle>
                                        <p className="text-xs font-mono text-purple-700 font-semibold truncate">{material.fileName}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    {material.description}
                                </p>
                                <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 gap-2 rounded-2xl font-bold h-12 border-2 border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = material.path;
                                            link.download = material.fileName;
                                            link.target = "_blank";
                                            link.click();
                                        }}
                                    >
                                        <Download className="w-4 h-4" />
                                        Letöltés (PDF)
                                    </Button>
                                    <Button
                                        className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold h-12 rounded-2xl shadow-md transition-transform active:scale-95"
                                        onClick={() => setActiveMaterial(material)}
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Interaktív Olvasó
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Lesson Viewer Modal / Overlay */}
                {activeMaterial && (
                    <LessonViewer material={activeMaterial} onClose={() => setActiveMaterial(null)} />
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {view === 'addition10' && (
                <Grade1Addition onBack={handleBackToMenu} />
            )}

            {view === 'snake' && (
                <MathSnakeGame onBack={handleBackToMenu} grade={1} />
            )}
        </div>
    );
}

interface KidsCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    highlight?: boolean;
    badge?: string;
}

function KidsCard({ title, description, icon, color, onClick, highlight, badge }: KidsCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-6 p-10 bg-white rounded-[40px] border-4 transition-all group relative overflow-hidden",
                highlight ? "hover:border-pink-300 hover:shadow-2xl shadow-pink-100" : "hover:border-primary hover:shadow-xl shadow-slate-200",
                color.split(' ')[2] // Use the border color from props as default
            )}
        >
            {badge && (
                <div className={cn(
                    "absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-sm",
                    highlight ? "bg-pink-500" : "bg-amber-500"
                )}>
                    {badge}
                </div>
            )}
            <div className={cn("p-8 rounded-[32px] transition-all group-hover:scale-110 group-hover:rotate-6 shadow-inner", color.split(' ').slice(0, 2).join(' '))}>
                {icon}
            </div>
            <div className="text-center">
                <h3 className="font-black text-3xl mb-3 text-slate-800 tracking-tight">{title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-bold px-4">{description}</p>
            </div>
        </button>
    );
}
