import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function useThemeSync() {
    const [theme, setThemeState] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);

        const handleThemeChange = (e: CustomEvent<"light" | "dark">) => {
            if (e.detail && (e.detail === "light" || e.detail === "dark")) {
                setThemeState(e.detail);
            }
        };

        window.addEventListener("theme-changed" as any, handleThemeChange);
        return () => window.removeEventListener("theme-changed" as any, handleThemeChange);
    }, [theme]);

    const setTheme = (newTheme: "light" | "dark") => {
        setThemeState(newTheme);
        const root = window.document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
        window.dispatchEvent(new CustomEvent("theme-changed", { detail: newTheme }));
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return { theme, setTheme, toggleTheme };
}

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useThemeSync();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
                "rounded-xl w-9 h-9 sm:w-10 sm:h-10 bg-white/10 text-white hover:bg-white/20 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center p-0",
                className
            )}
            aria-label="Téma váltása"
            title={theme === "light" ? "Váltás sötét módra" : "Váltás világos módra"}
        >
            {theme === "light" ? (
                <Sun className="h-5 w-5 text-amber-300" />
            ) : (
                <Moon className="h-5 w-5 text-yellow-300 fill-yellow-300/20" />
            )}
        </Button>
    );
}

export function SidebarThemeSelector() {
    const { theme, setTheme } = useThemeSync();

    return (
        <div className="p-3 bg-slate-100/80 dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 transition-all">
            <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Megjelenés
                </span>
                <span className="text-[11px] font-extrabold text-primary dark:text-indigo-400">
                    {theme === 'light' ? 'Fehér háttér' : 'Fekete háttér'}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-black rounded-xl border border-slate-200/60 dark:border-zinc-800 shadow-inner">
                <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={cn(
                        "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all",
                        theme === 'light'
                            ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-300/60"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:hover:bg-zinc-900"
                    )}
                >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Világos</span>
                </button>
                <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={cn(
                        "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all",
                        theme === 'dark'
                            ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                            : "text-slate-500 dark:text-slate-400 hover:text-white hover:bg-zinc-900"
                    )}
                >
                    <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                    <span>Sötét</span>
                </button>
            </div>
        </div>
    );
}
