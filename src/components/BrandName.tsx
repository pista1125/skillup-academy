import React from 'react';
import { cn } from '@/lib/utils';

interface BrandNameProps {
    /** "onDark": kék/sötét háttérre (fejléc, menü, lábléc); "onLight": világos háttérre */
    variant?: 'onDark' | 'onLight';
    /** Méret és egyéb kiegészítő osztályok, pl. "text-xl" */
    className?: string;
    /** Másik HTML elem (pl. h3) vagy komponens (pl. SheetTitle) */
    as?: React.ElementType;
}

/**
 * A DiákZóna márkanév egységes megjelenítése: "Diák" a háttérhez illő színnel, "Zóna" zölddel.
 * Mindenhol ezt használjuk, ahol a név logóként jelenik meg.
 */
export function BrandName({ variant = 'onDark', className, as: Component = 'span' }: BrandNameProps) {
    return (
        <Component
            className={cn(
                // Pacifico: csak 400-as súlya van, ezért font-normal (különben a böngésző mesterségesen vastagítaná)
                'font-brand font-normal tracking-normal leading-normal',
                variant === 'onDark' ? 'text-white' : 'text-slate-800 dark:text-white',
                className,
            )}
        >
            Diák
            <span className={variant === 'onDark' ? 'text-emerald-400' : 'text-emerald-500'}>Zóna</span>
        </Component>
    );
}

export default BrandName;
