import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NavItem } from "@/components/math/shared/ScrollSpySidebar";

interface HorizontalTopicNavProps {
    items: NavItem[];
    onItemClick?: (id: string) => void;
}

export function HorizontalTopicNav({ items, onItemClick }: HorizontalTopicNavProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find((entry) => entry.isIntersecting);
                if (visibleEntry) {
                    setActiveId(visibleEntry.target.id);
                }
            },
            {
                rootMargin: '-100px 0px -70% 0px',
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
        onItemClick?.(id);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 120,
                    behavior: 'smooth',
                });
            }
        }, 100);
    };

    return (
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[50vw] md:max-w-[60vw]">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all whitespace-nowrap",
                        activeId === item.id
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    )}
                >
                    {item.icon && (
                        <div className={cn(
                            "w-4 h-4 flex items-center justify-center transition-transform",
                            activeId === item.id ? "scale-110" : "opacity-70"
                        )}>
                            {item.icon}
                        </div>
                    )}
                    <span className={cn(
                        "text-[10px] md:text-xs font-bold tracking-tight uppercase",
                        activeId === item.id ? "opacity-100" : "opacity-80"
                    )}>
                        {item.label}
                    </span>
                    {activeId === item.id && (
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse ml-0.5" />
                    )}
                </button>
            ))}
        </nav>
    );
}
