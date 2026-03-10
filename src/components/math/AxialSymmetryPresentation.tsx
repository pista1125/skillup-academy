import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Sparkles,
    Maximize2,
    Minimize2,
    History,
    Leaf,
    User,
    Building2,
    Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideData {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    icon: React.ReactNode;
    accent: string;
}

const slides: SlideData[] = [
    {
        title: "A szimmetria körbevesz minket",
        subtitle: "Bevezetés a tengelyes szimmetriába",
        content: "A tengelyes szimmetria az egyik leggyakoribb és legszebb forma a világon. Ha egy alakzatot félbe tudunk hajtani úgy, hogy a két fele pontosan fedje egymást, akkor az tengelyesen szimmetrikus. Ez a harmónia és az egyensúly alapja.",
        image: "/assets/symmetry/butterfly.png",
        icon: <Sparkles className="w-6 h-6" />,
        accent: "from-blue-500 to-emerald-500"
    },
    {
        title: "Szimmetria az élővilágban",
        subtitle: "A természet tökéletes egyensúlya",
        content: "Nézz meg egy pillangót vagy egy virágot! A természet a tökéletes egyensúlyra törekszik. A szimmetria segít a rovaroknak a repülésben, a virágoknak pedig abban, hogy a beporzók könnyebben felismerjék őket. Ez nemcsak szép, de fontos túlélési eszköz is.",
        image: "/assets/symmetry/butterfly.png",
        icon: <Leaf className="w-6 h-6" />,
        accent: "from-emerald-500 to-green-600"
    },
    {
        title: "Az emberi arc és test",
        subtitle: "Tükörképünk a világban",
        content: "Ha tükörbe nézel, láthatod: az emberi test is szimmetrikus. Bár apró eltérések mindenkinél vannak, az agyunk a szimmetrikus arcokat találja a legnyugodtabbnak. A két szemünk, fülünk és végtagunk elrendezése mind a tengelyes szimmetriát példázza.",
        image: "/assets/symmetry/human_face.png",
        icon: <User className="w-6 h-6" />,
        accent: "from-orange-400 to-rose-500"
    },
    {
        title: "Mérnöki precizitás",
        subtitle: "Stabilitás és funkcionalitás",
        content: "Az építészetben és a mérnöki munkában a szimmetria stabilitást és tekintélyt sugároz. Gondolj egy repülőgépre: a szárnyaknak tökéletesen szimmetrikusnak kell lenniük az egyensúlyhoz. Hidaink és felhőkarcolóink is ezen az elven alapulnak.",
        image: "/assets/symmetry/airplane.png",
        icon: <Building2 className="w-6 h-6" />,
        accent: "from-blue-600 to-indigo-700"
    },
    {
        title: "Történelem és Művészet",
        subtitle: "Az emberi kultúra egyik tartóoszlopa",
        content: "Már az ókori civilizációk is rajongtak a szimmetriáért. A Taj Mahal vagy a gótikus katedrálisok rózsaablakai a szimmetria és a geometria csodái. A művészek évszázadok óta használják ezt az eszközt, hogy rendet és fenséget vigyenek az alkotásaikba.",
        image: "/assets/symmetry/taj_mahal.png",
        icon: <History className="w-6 h-6" />,
        accent: "from-amber-400 to-orange-600"
    },
    {
        title: "Érdekességek és Tanulság",
        subtitle: "Figyeld meg a világot!",
        content: "A szimmetria nemcsak matematika, hanem művészet és élet is egyben. Figyeld meg ma hazafelé menet, hány szimmetrikus alakzatot látsz az utcán, a parkban vagy az otthonodban! A szimmetria segít rendet teremteni a minket körülvevő káoszban.",
        image: "/assets/symmetry/lake_sunset.png",
        icon: <Lightbulb className="w-6 h-6" />,
        accent: "from-purple-500 to-indigo-600"
    }
];

interface AxialSymmetryPresentationProps {
    onBack: () => void;
}

export function AxialSymmetryPresentation({ onBack }: AxialSymmetryPresentationProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onBack();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    const slide = slides[currentSlide];

    return (
        <div className={cn(
            "flex flex-col h-[650px] bg-slate-50 rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-500 border border-white",
            isFullScreen && "fixed inset-0 z-50 h-screen w-screen rounded-none"
        )}>
            {/* Top Bar */}
            <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between bg-white/40 backdrop-blur-md z-20 border-b border-white/20">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="rounded-full hover:bg-slate-200/50 text-slate-700 font-bold"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
                </Button>

                <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                i === currentSlide ? "w-8 bg-primary shadow-lg shadow-primary/30" : "bg-slate-300"
                            )}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullScreen}
                        className="rounded-full hover:bg-slate-200/50 text-slate-700"
                    >
                        {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row relative mt-16 group">
                {/* Left Side: Text Content */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white relative z-10">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 mb-6 font-bold text-xs uppercase tracking-widest",
                    )}>
                        <span className={cn("p-1.5 rounded-full bg-gradient-to-br text-white shadow-sm", slide.accent)}>
                            {slide.icon}
                        </span>
                        {slide.subtitle}
                    </div>

                    <h2 className={cn(
                        "text-4xl lg:text-5xl font-black text-slate-800 mb-8 leading-tight tracking-tight",
                    )}>
                        {slide.title}
                    </h2>

                    <div className="prose prose-slate prose-lg max-w-none">
                        <p className="text-slate-600 leading-relaxed font-medium">
                            {slide.content}
                        </p>
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900">{currentSlide + 1} / {slides.length}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aktuális Dia</span>
                        </div>
                        <div className="h-10 w-px bg-slate-100" />
                        <div className="text-slate-500 text-sm font-medium italic">
                            {currentSlide === slides.length - 1 ? "Köszönjük a figyelmet!" : "Kattints a nyilakra a folytatáshoz"}
                        </div>
                    </div>
                </div>

                {/* Right Side: Image / Visual */}
                <div className="w-full md:w-1/2 relative overflow-hidden bg-slate-900 group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent scale-150" />
                    </div>

                    <img
                        key={slide.image}
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
                    <div className="absolute inset-0 bg-slate-900/10 z-0" />

                    {/* Visual Indicator of Symmetry */}
                    <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/30 backdrop-blur-sm z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 shadow-xl border-4 border-white/20 flex items-center justify-center">
                            <History className="w-3 h-3 text-primary animate-spin-slow" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-30">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border-white hover:bg-white hover:scale-105 transition-all text-slate-700 disabled:opacity-30"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                    variant="default"
                    size="icon"
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="w-14 h-14 rounded-2xl bg-primary shadow-xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all text-white disabled:opacity-30"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
        </div>
    );
}
