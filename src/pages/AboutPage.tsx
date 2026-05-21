import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/SiteFooter';
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  Target, 
  Award, 
  Wrench, 
  ArrowRight,
  Code,
  GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Navbar / Top Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 py-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl flex items-center gap-1"
        >
          <ChevronLeft className="w-5 h-5" />
          Vissza a főoldalra
        </Button>
        <div className="flex items-center gap-2">
          <img src="/logo_header.png" alt="DiákZóna Logo" className="h-8 object-contain" />
          <span className="text-lg font-black tracking-tighter text-emerald-500">DIÁKZÓNA</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Ismerj meg minket
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Magyarország legdinamikusabb <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">oktatási platformja</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            A DiákZóna küldetése, hogy a matematika és fizika tanulását élvezetes, interaktív és mindenki számára érthető élménnyé tegye. Hiszünk abban, hogy a jövő oktatása a tapasztalati és játékos tanulásban rejlik.
          </p>
        </section>

        {/* Our Values (3 Columns) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4 hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Élményalapú Tanulás</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Száraz képletek helyett interaktív szimulációkkal és vizuális magyarázatokkal segítünk megérteni a tantárgyak mögötti logikát.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Gamifikáció & Motiváció</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Az XP pontok, jelvények és szintlépések folyamatos visszajelzést adnak a fejlődésről, így fenntartva a tanulási kedvet és motivációt.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-4 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Személyre Szabott Eszközök</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Témakörökre bontott, egyedi fejlesztésű online kalkulátoraink és mérőeszközeink segítik a mindennapi önálló gyakorlást és ellenőrzést.
            </p>
          </div>
        </section>

        {/* Developer Profile Section (Coherent with main-select developer section) */}
        <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col lg:flex-row">
            {/* Photo Area */}
            <div className="lg:w-2/5 xl:w-1/3 relative bg-slate-950 min-h-[350px] lg:min-h-full flex-shrink-0">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl -ml-24 -mb-24"></div>
              </div>
              <img
                src="/orsos_istvan.jpg"
                alt="Orsós István"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/50"></div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/5 xl:w-2/3 p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest w-fit">
                <GraduationCap className="w-3.5 h-3.5" /> A Fejlesztőről
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-800 dark:text-white">Orsós István</h2>
              <p className="text-lg font-bold text-slate-400 uppercase tracking-wider">Tanár • Mentor • Önkéntes</p>
              
              <div className="border-t border-slate-100 dark:border-slate-800/80 my-4"></div>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  Elhivatott matematikus és fizikus vagyok, aki szenvedéllyel oktat és mentorál. Több éves tapasztalatom van középiskolai tanításban és egyetemi mentorprogramokban.
                </p>
                <p>
                  A DiákZóna megalkotásával az volt a célom, hogy egy olyan eszközt adjak a diákok és tanárok kezébe, amely a klasszikus tananyagot digitális, kézzelfogható élménnyé alakítja.
                </p>
                <p>
                  A tanítás mellett aktívan foglalkozom Python programozással, 3D nyomtatással és a technológia oktatásba való integrálásával.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-black text-slate-800 dark:text-white text-lg">PTE</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mat-Fiz Mester</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-black text-slate-800 dark:text-white text-lg">2020 óta</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Aktív Tanítás</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-black text-slate-800 dark:text-white text-lg">Python</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Programozás</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                  <div className="font-black text-slate-800 dark:text-white text-lg">3D</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nyomtatás</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Call to Action */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center space-y-6 relative overflow-hidden text-white border border-slate-800">
          <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Készen állsz a tanulásra?</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-sm md:text-base">
            Csatlakozz te is a DiákZóna közösségéhez, mérd fel tudásod játékos kvízeinkkel, vagy használd segédeszközeinket!
          </p>
          <div className="pt-4">
            <Button 
              onClick={() => navigate('/')}
              className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg transition-transform hover:scale-105"
            >
              Tanulás megkezdése <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
