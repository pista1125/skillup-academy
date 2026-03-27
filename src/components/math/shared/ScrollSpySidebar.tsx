import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Menu, X } from 'lucide-react';

export interface NavItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface ScrollSpySidebarProps {
    items: NavItem[];
    onCollapseChange?: (collapsed: boolean) => void;
    onItemClick?: (id: string) => void;
}

export function ScrollSpySidebar({ items, onCollapseChange, onItemClick }: ScrollSpySidebarProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Sync with parent when state changes
    useEffect(() => {
        onCollapseChange?.(isCollapsed);
    }, [isCollapsed, onCollapseChange]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find((entry) => entry.isIntersecting);
                if (visibleEntry) {
                    setActiveId(visibleEntry.target.id);
                }
            },
            {
                rootMargin: '-80px 0px -70% 0px',
                threshold: 0,
            }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            items.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [items]);

    const scrollToSection = (id: string) => {
        // Trigger potential auto-expand in parent
        onItemClick?.(id);

        // Slight delay to allow for DOM updates (like expanding sections)
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 120, // Increased offset for better spacing
                    behavior: 'smooth',
                });
            }
        }, 150);
    };

    return (
        <div className={cn(
            "hidden lg:block fixed left-0 top-32 transition-all duration-500 ease-in-out z-[60]",
            isCollapsed ? "w-12" : "w-36"
        )}>
            <div className="flex flex-col h-full bg-white/40 backdrop-blur-md border-r border-y border-slate-200/60 rounded-r-3xl shadow-xl shadow-slate-200/20 overflow-hidden">
                {/* Toggle Button Container */}
                <div className="p-2 border-b border-slate-100/50 flex justify-center">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all duration-300"
                        title={isCollapsed ? "Navigáció megnyitása" : "Navigáció bezárása"}
                    >
                        {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </button>
                </div>

                <nav className="flex-1 py-4 px-1.5 overflow-y-auto no-scrollbar">
                    <div className="space-y-1.5">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "group w-full flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all duration-300 relative",
                                    activeId === item.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "hover:bg-primary/5 text-slate-600 hover:text-primary"
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                {/* Active Indicator Bar */}
                                {activeId === item.id && (
                                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-full" />
                                )}

                                {item.icon && (
                                    <div className={cn(
                                        "transition-all duration-300",
                                        activeId === item.id ? "text-primary-foreground scale-110" : "text-slate-400 group-hover:text-primary"
                                    )}>
                                        {item.icon}
                                    </div>
                                )}

                                <span className={cn(
                                    "text-[9px] font-bold mt-1 transition-all duration-500 whitespace-nowrap overflow-hidden leading-tight",
                                    isCollapsed ? "w-0 opacity-0 h-0" : "w-full opacity-100"
                                )}>
                                    {item.label}
                                </span>

                                {!isCollapsed && (
                                    <div className={cn(
                                        "w-1 h-1 rounded-full bg-primary mt-1 transition-all duration-300",
                                        activeId === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                    )} />
                                )}
                            </button>
                        ))}
                    </div>
                </nav>

                {!isCollapsed && (
                    <div className="p-3 border-t border-slate-100/50">
                        <div className="flex justify-center">
                            <ChevronRight className="w-4 h-4 text-slate-300 rotate-90 animate-bounce" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
