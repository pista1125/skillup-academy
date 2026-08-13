import React, { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay
} from 'date-fns';
import { hu } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, Loader2 } from 'lucide-react';
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
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Month navigation handlers
  const handlePrevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    // Don't go to past months before current month
    if (!isBefore(endOfMonth(prev), today)) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Generate calendar grid days for current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Month Calendar Grid */}
      <div className="lg:col-span-7 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        {/* Month Header & Controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold capitalize tracking-tight">
            {format(currentMonth, 'MMMM yyyy', { locale: hu })}
          </h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), today)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Előző hónap"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Következő hónap"
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
          <div>h</div>
          <div>k</div>
          <div>sze</div>
          <div>cs</div>
          <div>p</div>
          <div>szo</div>
          <div>v</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-medium">
          {calendarDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isPast = isBefore(day, today);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isTodayDay = isSameDay(day, today);

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={!isCurrentMonth || isPast}
                onClick={() => {
                  onSelectDate(day);
                  onSelectTimeSlot(''); // reset time slot selection
                }}
                className={`h-10 w-full rounded-xl flex flex-col items-center justify-center transition-all relative ${
                  isSelected
                    ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30 scale-105 z-10'
                    : isTodayDay
                    ? 'bg-slate-800 text-primary font-bold border border-primary/50'
                    : !isCurrentMonth || isPast
                    ? 'text-slate-600 cursor-not-allowed opacity-40'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{format(day, 'd')}</span>
                {isTodayDay && !isSelected && (
                  <span className="w-1 h-1 bg-primary rounded-full absolute bottom-1"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Time Slots for Selected Date */}
      <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight capitalize">
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d.', { locale: hu }) : 'Válassz egy napot!'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {selectedDate
              ? 'Válaszd ki a neked megfelelő szabad idősávot:'
              : 'Kattints a bal oldali naptárban egy napra a szabad időpontok megjelenítéséhez.'}
          </p>
        </div>

        {selectedDate && (
          <div className="space-y-4">
            {loadingSlots ? (
              <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Időpontok betöltése...</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {DEFAULT_TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = selectedTimeSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => onSelectTimeSlot(slot)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        isBooked
                          ? 'bg-slate-800/50 text-slate-600 border-slate-800 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                          : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-emerald-500 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      <span>{slot}</span>
                      {isBooked ? (
                        <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                          Foglalt
                        </span>
                      ) : isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
