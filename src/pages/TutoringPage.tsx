import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/SiteFooter';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { BookingCalendar } from '@/components/tutoring/BookingCalendar';
import { BookingForm, BookingFormData } from '@/components/tutoring/BookingForm';
import { createTutoringBooking } from '@/services/bookingService';
import { sendBookingConfirmationEmail } from '@/services/emailService';
import { toast } from 'sonner';
import {
  ChevronLeft,
  Sparkles,
  Video,
  GraduationCap,
  Target,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle,
  User,
  ArrowRight,
  ArrowLeft,
  Loader2,
  BookOpen,
  HelpCircle,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Star
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
      // 1. Save booking to Firestore and generate Meet URL
      const { id: bookingId, meetLink } = await createTutoringBooking({
        studentId: user?.uid || null,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        studentPhone: formData.studentPhone,
        gradeLevel: formData.gradeLevel,
        topic: formData.topic,
        notes: formData.notes,
        date: dateStr,
        timeSlot: selectedTimeSlot,
      });

      setConfirmedBookingId(bookingId);
      setConfirmedMeetLink(meetLink);

      // 2. Dispatch confirmation email
      await sendBookingConfirmationEmail({
        studentId: user?.uid || null,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        studentPhone: formData.studentPhone,
        gradeLevel: formData.gradeLevel,
        topic: formData.topic,
        notes: formData.notes,
        date: dateStr,
        timeSlot: selectedTimeSlot,
        meetLink,
        status: 'confirmed',
      });

      toast.success('Foglalásod sikeresen rögzítésre került!');
      setStep(3);
    } catch (err) {
      console.error('Failed to submit booking:', err);
      toast.error('Hiba történt a foglalás rögzítése során!');
    } finally {
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
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 py-3 px-4">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl flex items-center gap-1.5 font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Vissza a főoldalra
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src="/logo_header.png" alt="DiákZóna Logo" className="h-9 object-contain" />
              <span className="text-xl font-black tracking-tighter text-emerald-500 hidden sm:inline uppercase">
                DIÁKZÓNA
              </span>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-16 space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
              <Video className="w-4 h-4 text-emerald-400" />
              Online Korrepetálás & Magánóra
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Személyre szabott matematika felkészítés <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Orsós István</span> szaktanárral
            </h1>

            <p className="text-base md:text-xl text-slate-200 font-medium leading-relaxed">
              Szerezz magabiztos tudást a középiskolai felvételin, érettségin vagy a dolgozatok során. Egyéni odafigyelés, gyakorlatias magyarázatok és élő Google Meet tanterem.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={scrollToBooking}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-6 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
              >
                <CalendarIcon className="w-5 h-5 mr-2.5" />
                Időpont Foglalása Most
              </Button>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 px-4 py-2 bg-white/10 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Egyéni figyelem & Élő Meet szoba
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer - 3 Cards Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">Miben tudunk segíteni?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Válaszd ki a céljaidnak megfelelő felkészítést, és foglalj időpontot a naptárunkban!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4 hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center font-black">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">8. Osztályos Felvételi Felkészítő</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Középiskolai írásbeli felvételi típusfeladatok, felvételi feladatsorok átbeszélése, egyenletek és síkgeometria részletes begyakorlása.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Érettségi Felkészítés (Közép / Emelt)</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Kidolgozott tételsorok, típusfeladatok megoldása, időbeosztási és pontszerző stratégiák a magabiztos érettségi jegyért.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4 hover:border-indigo-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center font-black">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Általános Korrepetálás (5-12. Osztály)</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Törtek, tizedestörtek, algebra, geometria és függvények érthető elmagyarázása. Dolgozatra és témazáróra készülés stresszmentesen.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Booking Section */}
        <section ref={bookingSectionRef} className="scroll-mt-24 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              <CalendarIcon className="w-4 h-4" /> Időpontválasztó Naptár
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">Foglalj Időpontot az Online Órára</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Válaszd ki a neked megfelelő napot és szabad idősávot!
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
            {/* Stepper Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                  1
                </span>
                <span>Időpont & Dátum</span>
              </div>
              <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-800"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                  2
                </span>
                <span>Diák Adatai</span>
              </div>
              <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-800"></div>
              <div className={`flex items-center gap-2 ${step === 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
                  3
                </span>
                <span>Visszaigazolás</span>
              </div>
            </div>

            {/* Step 1: Calendar & Slot Picker */}
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
                    className="rounded-xl font-bold bg-gradient-math px-8 py-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-base"
                  >
                    Tovább az adatokhoz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Student Details Form */}
            {step === 2 && (
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kiválasztott időpont:</p>
                    <p className="text-base font-black text-slate-800 dark:text-slate-100 mt-0.5">
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

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackStep}
                    className="rounded-xl font-bold border-slate-200 dark:border-slate-800 px-6 py-5"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                  </Button>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-base shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Foglalás rögzítése...
                      </>
                    ) : (
                      <>
                        Foglalás Véglegesítése
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
              <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300 max-w-xl mx-auto">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-500/10">
                  <CheckCircle className="w-12 h-12" />
                </div>

                <div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    Foglalásodat sikeresen rögzítettük!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Visszaigazoló e-mailt küldtünk a megadott e-mail címre: <strong className="text-slate-800 dark:text-slate-200">{formData.studentEmail}</strong>
                  </p>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-3">
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

                {/* Google Meet Room Card */}
                {confirmedMeetLink && (
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-center space-y-3">
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                      🎥 Az online órád hivatalos Google Meet szobája elkészült:
                    </p>
                    <a
                      href={confirmedMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                    >
                      <Video className="w-5 h-5" />
                      Csatlakozás a Google Meet Órához
                    </a>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      (A csatlakozási gombot elküldtük a megadott e-mail címedre is!)
                    </p>
                  </div>
                )}

                {/* Payment Notice */}
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl text-left flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                    <strong className="font-bold block mb-0.5">Fizetési tájékoztató:</strong>
                    A fizetés közvetlenül az óra előtt / átutalással történik. Az ehhez szükséges információkat és a részleteket e-mailben is átküldjük.
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={resetBooking}
                    className="rounded-2xl font-black bg-gradient-math px-8 py-6 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    Újabb Időpont Foglalása
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Gyakori Kérdések (FAQ) */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Gyakori Kérdések
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                Hogyan zajlik egy online korrepetálási óra?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Az órák a Google Meet rendszerén keresztül zajlanak élő videóhívásban, interaktív virtuális tábla használatával. A diák valós időben látja a feladatok megoldásának minden lépését.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                Milyen technikai feltételek szükségesek a csatlakozáshoz?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Csupán egy számítógépre, tabletre vagy okostelefonra és stabil internetkapcsolatra van szükség. Nem kell külön alkalmazást letölteni, a megadott Google Meet gombra kattintva azonnal beléphetsz az órára.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                Hogyan kapom meg az e-mail visszaigazolást?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                A foglalás véglegesítése után a rendszer azonnal elküldi a visszaigazolást a kapcsolat@diakzona.hu e-mail címünkről a megadott e-mail címedre a pontos időponttal és a Google Meet belépési gombbal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
