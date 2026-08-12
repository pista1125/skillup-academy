import React, { useState, useEffect } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_TIME_SLOTS, getBookedSlotsForDate } from '@/services/bookingService';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (slot: string) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onSelectDate,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Generate next 14 available days
  const today = startOfDay(new Date());
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  // Load booked slots whenever selected date changes
  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setLoadingSlots(true);
      getBookedSlotsForDate(dateStr)
        .then((slots) => setBookedSlots(slots))
        .finally(() => setLoadingSlots(false));
    }
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      {/* Date Picker Header */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span>Válassz dátumot az online órához:</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
            const dayOfWeek = format(date, 'EEEE', { locale: hu });
            const dayNum = format(date, 'MMM d.', { locale: hu });

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => {
                  onSelectDate(date);
                  onSelectTimeSlot(''); // reset slot on date change
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80 capitalize">
                  {dayOfWeek.slice(0, 3)}
                </span>
                <span className="text-base font-black tracking-tight my-0.5">
                  {format(date, 'd')}
                </span>
                <span className="text-[10px] font-medium opacity-70">
                  {format(date, 'MMM', { locale: hu })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      {selectedDate && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              <Clock className="w-4 h-4 text-primary" />
              <span>Szabad időpontok ({format(selectedDate, 'yyyy. MMMM d.', { locale: hu })}):</span>
            </label>
            {loadingSlots && (
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Foglaltság ellenőrzése...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DEFAULT_TIME_SLOTS.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = selectedTimeSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`p-3.5 rounded-xl border font-bold text-sm flex items-center justify-between transition-all ${
                    isBooked
                      ? 'bg-slate-100 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 opacity-70" />
                    {slot}
                  </span>
                  {isBooked ? (
                    <span className="text-[10px] uppercase font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                      Foglalt
                    </span>
                  ) : isSelected ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                      Szabad
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
