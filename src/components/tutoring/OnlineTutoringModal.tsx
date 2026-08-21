import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  CreditCard,
  Video,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BookingCalendar } from './BookingCalendar';
import { BookingForm, BookingFormData } from './BookingForm';
import { createTutoringBooking, createStripeBookingSession } from '@/services/bookingService';
import { sendBookingConfirmationEmail } from '@/services/emailService';
import { toast } from 'sonner';

interface OnlineTutoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineTutoringModal: React.FC<OnlineTutoringModalProps> = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    gradeLevel: '8. Osztály (Nyolcévfolyamos / Felvételi)',
    topic: 'Általános korrepetálás / Felvételi felkészítő',
    notes: '',
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [confirmedMeetLink, setConfirmedMeetLink] = useState<string | null>(null);

  // Auto-fill student profile if logged in
  useEffect(() => {
    if (user || profile) {
      setFormData((prev) => ({
        ...prev,
        studentName: profile?.full_name || prev.studentName,
        studentEmail: user?.email || prev.studentEmail,
      }));
    }
  }, [user, profile]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedDate) {
        toast.error('Kérjük, válassz egy dátumot!');
        return;
      }
      if (!selectedTimeSlot) {
        toast.error('Kérjük, válassz egy szabad idősávot!');
        return;
      }
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      toast.error('Kérjük, add meg a diák nevét!');
      return;
    }
    if (!formData.studentEmail.trim()) {
      toast.error('Kérjük, add meg az e-mail címedet!');
      return;
    }
    if (!formData.studentPhone.trim()) {
      toast.error('Kérjük, add meg a telefonszámodat!');
      return;
    }
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Hiányzó dátum vagy időpont!');
      return;
    }

    setSubmitting(true);
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    try {
      toast.loading('Stripe fizetési felület előkészítése...', { id: 'modal-stripe-loading' });

      const { url } = await createStripeBookingSession({
        studentId: user?.uid || null,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        studentPhone: formData.studentPhone,
        gradeLevel: formData.gradeLevel,
        topic: formData.topic,
        notes: formData.notes,
        date: dateStr,
        timeSlot: selectedTimeSlot,
      }, 5000);

      toast.dismiss('modal-stripe-loading');

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Nem érkezett érvényes fizetési link.');
      }
    } catch (err: any) {
      toast.dismiss('modal-stripe-loading');
      console.error('Failed to submit booking:', err);
      toast.error(err.message || 'Hiba történt a fizetési felület indítása során!');
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedTimeSlot(null);
    setConfirmedBookingId(null);
    setConfirmedMeetLink(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 bg-gradient-math text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md border border-white/20">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                Online Korrepetálás Foglalás
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-xs text-white/80 font-medium mt-0.5">
                Egyéni online órák & felkészítés Orsós István szaktanárral
              </DialogDescription>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/15 relative z-10 text-xs font-bold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white/40'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-black">
                1
              </span>
              <span>Időpont választás</span>
            </div>
            <div className="w-8 h-[2px] bg-white/20"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white/40'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-black">
                2
              </span>
              <span>Diák adatok</span>
            </div>
            <div className="w-8 h-[2px] bg-white/20"></div>
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-white' : 'text-white/40'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-black">
                3
              </span>
              <span>Visszaigazolás</span>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Calendar & Time slot */}
          {step === 1 && (
            <div className="space-y-6">
              <BookingCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onSelectTimeSlot={setSelectedTimeSlot}
              />

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="rounded-xl font-bold bg-gradient-math px-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  Tovább az adatokhoz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Student Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Selected Slot Summary Banner */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kiválasztott időpont:</p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5">
                    {selectedDate ? format(selectedDate, 'yyyy. MMMM d. (EEEE)', { locale: hu }) : ''} — {selectedTimeSlot}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleBackStep}
                  className="text-xs font-bold text-primary hover:bg-primary/10 rounded-xl"
                >
                  Módosítás
                </Button>
              </div>

              <BookingForm
                formData={formData}
                onChange={(updated) => setFormData((prev) => ({ ...prev, ...updated }))}
              />

              {/* Pricing banner */}
              <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Óradíj: 5 000 Ft / alkalom</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Biztonságos Stripe bankkártyás fizetés</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  Azonnali e-számla
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackStep}
                  className="rounded-xl font-bold border-slate-200 dark:border-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Vissza
                </Button>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Átirányítás a Stripe-ra...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Fizetés és Véglegesítés (5 000 Ft)
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation Screen */}
          {step === 3 && (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/10">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Foglalásodat sikeresen rögzítettük!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Visszaigazoló e-mailt küldtünk a megadott e-mail címre: <strong className="text-slate-700 dark:text-slate-200">{formData.studentEmail}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">Időpont:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-black">
                    {selectedDate ? format(selectedDate, 'yyyy. MMMM d.', { locale: hu }) : ''} ({selectedTimeSlot})
                  </strong>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">Diák:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">{formData.studentName}</strong>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-slate-600 dark:text-slate-400">Témakör / Szint:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">{formData.topic}</strong>
                </div>
              </div>

              {/* Google Meet Link Banner */}
              {confirmedMeetLink && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-center space-y-2">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    🎥 Az online órád Google Meet szobája elkészült:
                  </p>
                  <a
                    href={confirmedMeetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm shadow-md transition-all hover:scale-105"
                  >
                    <Video className="w-4 h-4" />
                    Csatlakozás a Google Meet Órához
                  </a>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    (A csatlakozási linket e-mailben is átküldtük!)
                  </p>
                </div>
              )}

              {/* Payment Notice (Stripe postponed) */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl text-left flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                  <strong className="font-bold block mb-0.5">Fizetési tájékoztató:</strong>
                  A fizetés a helyszínen / közvetlenül az óra előtt átutalással történik. Az ehhez szükséges információkat és a csatlakozási linket e-mailben is átküldjük. <em>(Stripe fizetés hamarosan!)</em>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={resetAndClose}
                  className="rounded-xl font-black bg-gradient-math px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  Rendben, köszönöm!
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
