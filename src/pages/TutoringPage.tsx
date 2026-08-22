import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/SiteFooter';
import { UserMenu } from '@/components/auth/UserMenu';
import { SidebarMenu } from '@/components/SidebarMenu';
import { useAuth } from '@/contexts/AuthContext';
import { BookingCalendar } from '@/components/tutoring/BookingCalendar';
import { BookingForm, BookingFormData } from '@/components/tutoring/BookingForm';
import { createTutoringBooking, createStripeBookingSession } from '@/services/bookingService';
import { sendBookingConfirmationEmail } from '@/services/emailService';
import { toast } from 'sonner';
import {
  Video,
  GraduationCap,
  Target,
  Calendar as CalendarIcon,
  CheckCircle,
  User,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BookOpen,
  HelpCircle,
  CreditCard,
  ShieldCheck,
  Lock,
  Sparkles
} from 'lucide-react';

export default function TutoringPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const bookingSectionRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    gradeLevel: '8. Osztály (Nyolcévfolyamos / Felvételi)',
    topic: 'Középiskolai felvételi felkészítő',
    notes: '',
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [confirmedMeetLink, setConfirmedMeetLink] = useState<string | null>(null);

  // Check URL search parameters for Stripe redirect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      setStep(3);
      setConfirmedMeetLink('https://meet.google.com/gqy-sazd-yuz');
      toast.success('Sikeres bankkártyás fizetés (5 000 Ft)! A foglalásodat és számládat rögzítettük.', { duration: 6000 });
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (payment === 'cancelled') {
      toast.error('A bankkártyás fizetés megszakadt. A foglaláshoz kérjük próbáld újra!');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Pre-fill profile info if user is logged in
  useEffect(() => {
    if (user || profile) {
      setFormData((prev) => ({
        ...prev,
        studentName: profile?.full_name || prev.studentName,
        studentEmail: user?.email || prev.studentEmail,
      }));
    }
  }, [user, profile]);

  const scrollToBooking = () => {
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      toast.loading('Stripe fizetési felület előkészítése...', { id: 'stripe-loading' });

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

      toast.dismiss('stripe-loading');

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Nem érkezett érvényes fizetési link.');
      }
    } catch (err: any) {
      toast.dismiss('stripe-loading');
      console.error('Failed to initiate Stripe checkout:', err);
      toast.error(err.message || 'Hiba történt a fizetési felület megnyitása során!');
      setSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedTimeSlot(null);
    setConfirmedBookingId(null);
    setConfirmedMeetLink(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* EXACT FULL MAIN HEADER (SAME AS MAIN PAGE & OTHER PAGES) */}
      <div className="sticky top-0 z-50 w-full">
        <div className="bg-gradient-math text-white py-2 md:py-3 px-3 md:px-4 shadow-xl relative transition-all duration-300">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          </div>

          <div className="w-full px-2 lg:px-12 relative z-10">
            <div className="flex justify-between items-center gap-1.5">
              <div className="flex items-center gap-1 sm:gap-2.5">
                <SidebarMenu />
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="bg-white/10 text-white hover:bg-white/20 font-black px-1.5 sm:px-3 border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 h-8 sm:h-10 rounded-xl"
                >
                  <img src="/logo_header.png" alt="DiákZóna" className="h-7 sm:h-12 object-contain" />
                  <span className="text-sm sm:text-lg md:text-xl font-black tracking-tighter">Diákzóna</span>
                </Button>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <UserMenu />
                <Button
                  variant="default"
                  onClick={() => navigate('/korrepetalas')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-purple-500/30 border border-white/20 transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                  title="Online Korrepetálás"
                >
                  <Video className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden md:inline text-xs sm:text-sm">Online Korrepetálás</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
                  className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                  title="Online Kvíz"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <circle cx="12" cy="3" r="1.8" />
                    <path d="M13 6.5L8 14H12.5L10.5 21.5L17 12H12.5L13.5 6.5H13Z" />
                  </svg>
                  <span className="hidden md:inline text-xs sm:text-sm">Online Kvíz</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-12 py-6 md:py-10 space-y-10">
        {/* Simple & Clean Header Banner */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Video className="w-4 h-4" />
            Online Korrepetálás & Magánóra
          </div>

          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Matematika felkészítés Orsós István szaktanárral
          </h1>

          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            Egyéni matematika felkészítés 8. osztályos felvételire, közép- és emelt szintű érettségire vagy általános korrepetálásra Google Meet online tanteremben.
          </p>

          <div className="pt-1 flex items-center gap-3">
            <Button
              onClick={scrollToBooking}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-sm"
            >
              <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
              Időpont foglalása
            </Button>

            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Élő Google Meet csatlakozással
            </span>
          </div>
        </section>

        {/* 3 Offer Cards (Compact) */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Miben tudunk segíteni?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-8 h-8 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold">8. Osztályos Felvételi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Felvételi feladatsorok átbeszélése, típusfeladatok, egyenletek és síkgeometria felkészítő.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-8 h-8 bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold">Érettségi Felkészítés</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Közép- és emelt szintű érettségi feladatsorok, felkészülés a pontszerző stratégiákkal.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-8 h-8 bg-indigo-500/10 text-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold">Általános Korrepetálás</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                5-12. osztályos tananyag elmagyarázása, hiányosságok pótlása és témazáró felkészítés.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Booking Section (Compact) */}
        <section ref={bookingSectionRef} className="scroll-mt-20 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Időpont foglalása</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Válaszd ki a megfelelő dátumot és szabad idősávot!
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
            {/* Stepper Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                <span>Időpont választás</span>
              </div>
              <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <span>Diák adatai</span>
              </div>
              <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
              <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                <span>Visszaigazolás</span>
              </div>
            </div>

            {/* Step 1: Calendar & Slot Picker */}
            {step === 1 && (
              <div className="space-y-4">
                <BookingCalendar
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onSelectTimeSlot={setSelectedTimeSlot}
                />

                <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!selectedDate || !selectedTimeSlot}
                    size="sm"
                    className="font-bold bg-primary text-white px-5 py-2 rounded-xl text-xs shadow-sm"
                  >
                    Tovább az adatokhoz
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Student Details Form */}
            {step === 2 && (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Kiválasztott időpont:</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {selectedDate ? format(selectedDate, 'yyyy. MMMM d. (EEEE)', { locale: hu }) : ''} — {selectedTimeSlot}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleBackStep}
                    className="text-[11px] font-bold text-primary h-7 px-2"
                  >
                    Módosítás
                  </Button>
                </div>

                <BookingForm
                  formData={formData}
                  onChange={(updated) => setFormData((prev) => ({ ...prev, ...updated }))}
                />

                {/* Payment summary alert */}
                <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">Online Óradíj: 5 000 Ft / alkalom</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Biztonságos Stripe bankkártyás fizetéssel & azonnali e-számlával</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>SSL 256-bit</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleBackStep}
                    className="font-bold border-slate-200 dark:border-slate-800 px-4 text-xs h-9"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    Vissza
                  </Button>

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="sm"
                    className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 text-xs h-9 shadow-md shadow-emerald-500/20"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        Átirányítás a Stripe-ra...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                        Fizetés és Véglegesítés (5 000 Ft)
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <div className="text-center py-4 space-y-4 max-w-md mx-auto">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Sikeres Fizetés & Időpont Foglalás! 🎉
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    A foglalási díj (<strong>5 000 Ft</strong>) kiegyenlítve. A visszaigazoló e-mailt és az e-számlát elküldtük a megadott e-mail címre.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-slate-500">Időpont:</span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedDate ? format(selectedDate, 'yyyy. MMMM d.', { locale: hu }) : ''} ({selectedTimeSlot || 'Kiválasztott sáv'})
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-slate-500">Fizetve:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">5 000 Ft (Stripe Teszt)</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-slate-500">Témakör:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.topic || 'Online Korrepetálás'}</strong>
                  </div>
                </div>

                {/* Google Meet Room Card */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-center space-y-2">
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    🎥 Online Google Meet szoba belépési link:
                  </p>
                  <a
                    href="https://meet.google.com/gqy-sazd-yuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm"
                  >
                    <Video className="w-4 h-4" />
                    Csatlakozás a Google Meet Órához
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    A linket a megadott e-mail címre is elküldtük.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={resetBooking}
                    size="sm"
                    className="font-bold bg-primary px-6 py-2 text-xs rounded-xl"
                  >
                    Újabb Időpont Foglalása
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Gyakori Kérdések (FAQ - Compact) */}
        <section className="space-y-3 max-w-2xl mx-auto pt-2">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-primary" />
            Gyakori Kérdések
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Hogyan zajlik az online korrepetálás?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                Az órák a Google Meet rendszerén keresztül zajlanak élő videóhívásban és online táblával.
              </p>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Mire van szükség a csatlakozáshoz?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-normal">
                Számítógépre, tabletre vagy telefonra és internetkapcsolatra. A Google Meet gombra kattintva azonnal beléphetsz.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
