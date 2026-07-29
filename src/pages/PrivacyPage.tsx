import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/SiteFooter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ChevronLeft, 
  ShieldCheck, 
  UserCheck, 
  Database, 
  FileLock, 
  Cookie, 
  Eye, 
  Scale
} from 'lucide-react';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Navbar / Top Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 py-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
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

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 md:py-16 space-y-12">
        
        {/* Page Title & Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Adatvédelem
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Adatkezelési Tájékoztató</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base">
            Számunkra kiemelten fontos a személyes adataid védelme. Ebből a tájékoztatóból megtudhatod, hogyan gyűjtjük, kezeljük és védjük az adataidat a DiákZóna platformon.
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Utolsó frissítés: 2026. május 21.
          </p>
        </div>

        {/* Quick Grid - Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Biztonságos tárolás</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Minden adatodat modern titkosítással és a Firebase (Google Cloud) infrastruktúrájával tároljuk.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Csak a legszükségesebbek</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kizárólag az e-mail címedet, nevedet, szerepkörödet és pontjaidat mentjük el.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-1">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Teljes átláthatóság</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bármikor kérheted adataid helyesbítését, exportálását vagy végleges törlését.
            </p>
          </div>
        </div>

        {/* Detailed Accordion Sections */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-6 md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            <AccordionItem value="item-1" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                  <span>1. Ki az Adatkezelő?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <p>A DiákZóna platformon végzett adatkezelési tevékenységekért az alábbi személy felelős:</p>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1 text-sm font-semibold">
                  <p><span className="text-slate-400">Név:</span> Orsós István e.v.</p>
                  <p><span className="text-slate-400">E-mail:</span> kapcsolat@diakzona.hu</p>
                  <p><span className="text-slate-400">Weboldal:</span> diakzona.hu</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-indigo-500" />
                  <span>2. Milyen adatokat gyűjtünk és kezelünk?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p>A platform használata során a következő személyes adatokat kezeljük:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><span className="font-bold">Regisztrációs adatok:</span> Teljes név, e-mail cím, jelszó (hash-elve).</li>
                  <li><span className="font-bold">Profil adatok:</span> Felhasználói szerepkör (diák vagy tanár), profilképként beállított emoji vagy URL.</li>
                  <li><span className="font-bold">Aktivitási adatok:</span> Szerzett XP pontok, elnyert jelvények, elvégzett matematika és fizika feladatok előrehaladása.</li>
                  <li><span className="font-bold">Technikai adatok:</span> IP cím, belépések időpontja, böngésző és eszköz típusa.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <FileLock className="w-5 h-5 text-emerald-500" />
                  <span>3. Mi az adatkezelés célja és jogalapja?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p><span className="font-bold">Az adatkezelés célja:</span> A DiákZóna oktatási szolgáltatásainak és gamifikációs moduljainak nyújtása, a tanulmányi fejlődés nyomon követése, a fiók biztonságának garantálása, valamint a felhasználókkal való kapcsolattartás.</p>
                <p><span className="font-bold">Az adatkezelés jogalapja:</span> A GDPR 6. cikk (1) bekezdés a) pontja alapján a felhasználó önkéntes hozzájárulása, amelyet a regisztráció során, a jelölőnégyzet bejelölésével ad meg.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Cookie className="w-5 h-5 text-amber-500" />
                  <span>4. Sütik (Cookies) használata</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <p>A weboldal működéséhez elengedhetetlen sütiket (session/auth tokenek) használunk, melyek biztosítják a bejelentkezett állapot fenntartását és a biztonságos munkamenetet.</p>
                <p>A böngésződben bármikor letilthatod a sütik használatát, azonban ez esetben a bejelentkezéshez kötött funkciók (haladás mentése, profil szerkesztése) nem fognak működni.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span>5. Mennyi ideig tároljuk az adatokat?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                A regisztrációs és profiladatokat addig tároljuk, amíg a felhasználó nem kéri a fiókja törlését. A törlési kérelmet az e-mail címünkre küldve vagy közvetlenül a profil beállításaiban (ha elérhető) lehet kezdeményezni. A törlés a kérelem beérkezését követő 30 napon belül megtörténik.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-indigo-500" />
                  <span>6. Mik a jogaid és jogorvoslati lehetőségeid?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p>A GDPR értelmében a következő jogokkal rendelkezel:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><span className="font-bold">Hozzáférés joga:</span> Bármikor tájékoztatást kérhetsz az általunk kezelt adataidról.</li>
                  <li><span className="font-bold">Helyesbítés joga:</span> Kérheted pontatlan adataid módosítását.</li>
                  <li><span className="font-bold">Törléshez való jog:</span> Kérheted személyes adataid törlését a rendszerünkből.</li>
                  <li><span className="font-bold">Adathordozhatóság joga:</span> Kérheted az általad megadott adatok kiadását géppel olvasható formátumban.</li>
                </ul>
                <p className="pt-2">Panasz esetén javasoljuk, hogy először velünk vedd fel a kapcsolatot a <a href="mailto:kapcsolat@diakzona.hu" className="text-emerald-500 underline font-bold">kapcsolat@diakzona.hu</a> címen. Hivatalos jogorvoslati kérelemmel a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) is fordulhatsz (1055 Budapest, Falk Miksa utca 9-11., www.naih.hu).</p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
