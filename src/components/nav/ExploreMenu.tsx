import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ExploreSections } from './ExploreSections';

const triggerClass =
  'bg-white/10 text-white hover:bg-white/20 hover:text-white font-bold border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 rounded-xl h-8 sm:h-9 data-[state=open]:bg-white/25';

/**
 * Fejléc „Tananyagok” menü: osztályok, eszközök, kompetencia és játékok egy helyen.
 * lg felett négyoszlopos lenyíló panel, alatta alulról felcsúszó lap.
 */
export function ExploreMenu() {
  const navigate = useNavigate();
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (path: string) => {
    setDesktopOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Asztali */}
      <Popover open={desktopOpen} onOpenChange={setDesktopOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(triggerClass, 'hidden lg:flex items-center gap-1.5 px-3.5')}
            aria-label="Tananyagok"
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span className="text-sm">Tananyagok</span>
            <ChevronDown className={cn('w-3.5 h-3.5 shrink-0 transition-transform', desktopOpen && 'rotate-180')} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          collisionPadding={16}
          className="w-[min(1040px,calc(100vw-2rem))] p-0 rounded-3xl overflow-hidden border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl"
        >
          <div className="max-h-[calc(100vh-7rem)] overflow-y-auto">
            <ExploreSections variant="columns" onNavigate={go} />
          </div>
        </PopoverContent>
      </Popover>

      {/* Mobil / tablet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className={cn(triggerClass, 'lg:hidden flex items-center justify-center w-8 sm:w-9 p-0')}
            aria-label="Tananyagok"
            title="Tananyagok"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-3xl px-5 pt-5 pb-8 bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800"
        >
          <SheetHeader className="text-left mb-1">
            <SheetTitle className="flex items-center gap-2 font-black">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Tananyagok
            </SheetTitle>
            <SheetDescription>Osztályok, eszközök, kompetencia és játékok egy helyen.</SheetDescription>
          </SheetHeader>
          <ExploreSections variant="accordion" onNavigate={go} />
        </SheetContent>
      </Sheet>
    </>
  );
}
