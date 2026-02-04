import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GradeLevel } from '@/types/education';
import {
    ArrowLeft,
    Map as MapIcon,
    Sparkles,
    Globe,
    Compass,
    Landmark,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GradeSelector } from '@/components/GradeSelector';
import { BlindMapHungary } from '@/components/geography/BlindMapHungary';

type ViewState = 'main-select' | 'activity';
type GeographyActivity = 'blind-map-hungary' | 'general-quiz';

export default function GeographyPage() {
    const navigate = useNavigate();
    const [view, setView] = useState<ViewState>('main-select');
    const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
    const [activityType, setActivityType] = useState<GeographyActivity>('general-quiz');

    const handleGradeSelect = (grade: GradeLevel) => {
        setSelectedGrade(grade);
        if (grade === 7) {
            setActivityType('blind-map-hungary');
            setView('activity');
        } else {
            // Placeholder for other grades
            setActivityType('general-quiz');
            setView('activity');
        }
    };

    const handleBack = () => {
        if (view === 'activity') {
            setView('main-select');
            setSelectedGrade(null);
        } else {
            navigate('/');
        }
    };

    // Custom GradeSelector for Geography (7, 8, High School)
    const renderGeographyGrades = () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[7, 8, 'graduation'].map((grade) => (
                <button
                    key={grade.toString()}
                    onClick={() => handleGradeSelect(grade as GradeLevel)}
                    className={cn(
                        "p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group",
                        "bg-white border-slate-100 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
                    )}
                >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {grade === 7 && <MapIcon className="w-8 h-8" />}
                        {grade === 8 && <Globe className="w-8 h-8" />}
                        {grade === 'graduation' && <Landmark className="w-8 h-8" />}
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-slate-800">
                            {grade === 'graduation' ? 'Középiskola' : `${grade}. osztály`}
                        </span>
                        <span className="text-sm text-slate-500 font-medium tracking-wide uppercase">
                            {grade === 7 ? 'Magyarország' : grade === 8 ? 'Világföldrajz' : 'Érettségi felkészítő'}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 px-4">
                <div className="container max-w-4xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="text-white hover:bg-white/20 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/20 rounded-2xl">
                            <Compass className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="font-display text-3xl font-bold">Földrajz</h1>
                            <p className="text-white/80">
                                {view === 'main-select' ? 'Válassz évfolyamot a gyakorláshoz!' :
                                    selectedGrade === 7 ? 'Magyarország nagytájai' : 'Gyakorló feladatok'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-4xl mx-auto px-4 py-12">
                {view === 'main-select' && (
                    <div className="animate-slide-up space-y-12">
                        <section>
                            <h2 className="font-display text-2xl font-bold mb-8 text-center">
                                Melyik szinten szeretnél tanulni?
                            </h2>
                            {renderGeographyGrades()}
                        </section>

                        <section className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-emerald-900 mb-2">Interaktív Vaktérképek</h3>
                                <p className="text-emerald-700">
                                    Gyakorold a helymeghatározást interaktív vaktérképeinken! Válaszd a 7. osztályt a magyarországi tájakhoz.
                                </p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl shadow-lg rotate-3">
                                <MapIcon className="w-12 h-12 text-emerald-600" />
                            </div>
                        </section>
                    </div>
                )}

                {view === 'activity' && (
                    <div className="animate-slide-up">
                        {activityType === 'blind-map-hungary' && (
                            <BlindMapHungary onBack={handleBack} />
                        )}

                        {activityType === 'general-quiz' && (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <div className="text-6xl mb-6">🌏</div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Hamarosan érkezik!</h3>
                                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                                    Ez a modul még fejlesztés alatt áll. Hamarosan új kontinentális és világföldrajzi feladatokkal bővülünk!
                                </p>
                                <Button onClick={handleBack} variant="outline">Vissza a választáshoz</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
