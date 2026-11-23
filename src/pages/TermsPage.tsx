import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/SiteFooter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ChevronLeft, 
  FileText, 
  UserCheck, 
  ShieldAlert, 
  HelpCircle, 
  Terminal,
  Scale,
  CreditCard,
  RotateCcw,
  GraduationCap,
  Building2
} from 'lucide-react';
import { BrandName } from '@/components/BrandName';

export default function TermsPage() {
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
          <BrandName variant="onLight" className="text-lg" />
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 md:py-16 space-y-12">
        
        {/* Page Title & Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <FileText className="w-4 h-4" /> Felhasználási feltételek
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Felhasználási Feltételek</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base">
            Kérjük, a DiákZóna platform használata előtt figyelmesen olvasd el az alábbi Felhasználási Feltételeket (ÁSZF).
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Utolsó frissítés: 2026. november 23.
          </p>
        </div>

        {/* Quick Grid - Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Felelősségteljes használat</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              A platformot tanulási céllal üzemeltetjük. Kérjük, tartsd tiszteletben a közösséget és a rendszert.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
              <Terminal className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Saját tulajdonú kód</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Minden forráskód, feladat és grafika a DiákZóna Akadémia szellemi tulajdona.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-1">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm">Biztonságos fiókok</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ügyelj a jelszavad biztonságára és ne add át fiókodat harmadik félnek.
            </p>
          </div>
        </div>

        {/* Detailed Accordion Sections */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-6 md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            
            <AccordionItem value="item-1" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-emerald-500" />
                  <span>1. Általános rendelkezések</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <p>A jelen Felhasználási Feltételek (a továbbiakban: ÁSZF) szabályozzák a DiákZóna (diakzona.hu) platform használatát.</p>
                <p>A platform elérésével, böngészésével vagy a regisztrációval kifejezed, hogy megértetted és magadra nézve kötelezőnek fogadod el a jelen feltételeket. Amennyiben nem értesz egyet a feltételekkel, kérjük, ne használd a platform szolgáltatásait.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-indigo-500" />
                  <span>2. Regisztráció és fiókbiztonság</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p>A platform bizonyos funkciói (pl. előrehaladás mentése, profil testreszabása, speciális feladatok) regisztrációhoz kötöttek.</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>A regisztráció során valós adatokat köteles megadni a felhasználó.</li>
                  <li>Minden felhasználó felelős a saját jelszava titokban tartásáért és a fiókjában végzett tevékenységekért.</li>
                  <li>Amennyiben jogosulatlan használatot észlelsz, azonnal értesíts minket a kapcsolat@diakzona.hu címen.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-emerald-500" />
                  <span>3. A szolgáltatás elvárt használata</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p>A DiákZóna platformot kizárólag törvényes, oktatási és önfejlesztő célokra szabad használni.</p>
                <p>Szigorúan tilos:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>A rendszer biztonsági réseinek tesztelése, túlterhelése (DDoS jellegű támadások) vagy jogosulatlan adatszerzés.</li>
                  <li>Spam küldése, más felhasználók zaklatása vagy megtévesztő viselkedés.</li>
                  <li>Automatizált programok (botok, scriptek) futtatása a kvízek kitöltésére és az XP pontok jogosulatlan gyűjtésére.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-amber-500" />
                  <span>4. Szellemi tulajdonjogok</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <p>A DiákZóna oldalon található minden tartalom (beleértve, de nem kizárólagosan: a forráskódot, szövegeket, egyedi feladatokat, logókat, grafikákat és egyéb vizuális elemeket) a platform tulajdonosának és fejlesztőjének (Orsós István e.v.) kizárólagos szellemi tulajdonát képezi.</p>
                <p>Ezen anyagok másolása, engedély nélküli kereskedelmi terjesztése vagy saját oktatási termékként való feltüntetése jogi lépéseket von maga után.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  <span>5. Felelősségkorlátozás</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 font-medium">
                <p>Az oldalon található oktatóanyagok a legjobb tudásunk és tapasztalataink szerint készülnek, de nem vállalunk felelősséget az esetleges elírásokért, számolási hibákért vagy a feladatok értelmezéséből eredő közvetett károkért.</p>
                <p>Nem garantálunk közvetlen sikeres iskolai osztályzatot vagy vizsgaeredményt; a platform egy tanulást segítő segédeszköz. A szolgáltatást "adott állapotban" nyújtjuk, a technikai kimaradásokból eredő adatvesztésért felelősséget nem vállalunk.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <span>6. Feltételek módosítása és megszüntetés</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Fenntartjuk a jogot a jelen ÁSZF bármikori módosítására. A módosítások az oldalon történő közzététellel lépnek életbe. Amennyiben a felhasználó megszegi a szabályzatban leírt feltételeket, fenntartjuk a jogot a fiókjának előzetes figyelmeztetés nélküli felfüggesztésére vagy végleges törlésére.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span>7. Előfizetés és díjak</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <p>Minden évfolyam (1–12. osztály) I. témaköre regisztráció és bejelentkezés után díjmentesen elérhető. Az évfolyam további témakörei (tananyagok, kvízek, gyakorlás, tudáspróbák) évfolyamonkénti előfizetéssel érhetők el. A „Tananyagok és Könyvek” fül, valamint az eszközök és játékok továbbra is díjmentesek.</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>Az előfizetés díja évfolyamonként <b>990 Ft / hó</b>. A szolgáltató alanyi adómentes, így a feltüntetett ár a fizetendő teljes összeg.</li>
                  <li>Minden évfolyam külön előfizetés; több évfolyam esetén mindegyikre külön díjat számolunk fel.</li>
                  <li>Az előfizetés havonta automatikusan megújul, a díjat a megadott bankkártyáról terheljük. A fizetést a Stripe, Inc. biztonságos fizetési rendszere kezeli; a bankkártya adatai nem kerülnek hozzánk.</li>
                  <li>Minden sikeres terhelésről elektronikus számlát küldünk a megadott e-mail-címre.</li>
                  <li>Kiskorú felhasználó esetén az előfizetést szülő vagy gondviselő köti meg, illetve hagyja jóvá.</li>
                  <li>Az előfizetés díjának változásáról legalább 30 nappal korábban e-mailben értesítjük az előfizetőket.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-indigo-500" />
                  <span>8. Próbaidő, lemondás és elállás</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><b>Próbaidő:</b> fiókonként egyszer, az első előfizetéshez 7 napos díjmentes próbaidő jár. Ha a próbaidő vége előtt lemondod, nem terhelünk semmit; ellenkező esetben a 8. naptól havonta 990 Ft-ot terhelünk.</li>
                  <li><b>Lemondás:</b> az előfizetés bármikor lemondható a Profil → Előfizetéseim → „Előfizetés kezelése” menüpontban. Lemondás után a hozzáférés a már kifizetett időszak végéig megmarad, további terhelés nem történik.</li>
                  <li><b>Sikertelen fizetés:</b> ha a havi terhelés nem sikerül, a hozzáférés még legfeljebb 3 napig megmarad, ezalatt a kártyaadatok frissíthetők.</li>
                  <li><b>Elállási jog:</b> az előfizetés digitális tartalom szolgáltatására irányul. A megrendeléskor a fogyasztó kifejezetten kéri a teljesítés azonnali megkezdését, és tudomásul veszi, hogy ezzel a 45/2014. (II. 26.) Korm. rendelet 29. § (1) bek. m) pontja szerint elveszíti a 14 napos elállási jogát.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-rose-500" />
                  <span>9. Tanári hozzáférés és tanári licenc</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li>A platform üzemeltetője által jóváhagyott tanári fiókok minden évfolyam teljes anyagát díjmentesen elérik.</li>
                  <li>A tanári jóváhagyás minden tanévben augusztus 31-én lejár, az új tanévre újra kell kérni.</li>
                  <li>A jóváhagyott tanár legfeljebb 100, az osztályaiba felvett diákja számára nyithat meg díjmentesen egy-egy évfolyamot. A diák egyszerre csak egy tanártól kaphat ilyen hozzáférést.</li>
                  <li>A tanári licenc megszűnik, ha a diák kikerül a tanár osztályaiból, ha a tanár visszavonja, vagy ha a tanári jóváhagyás lejár, illetve visszavonásra kerül.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10" className="border-none bg-slate-50 dark:bg-slate-950/40 rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline py-5 text-left font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-500" />
                  <span>10. A szolgáltató adatai</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
                <ul className="list-none space-y-1 text-sm">
                  <li><b>Szolgáltató:</b> Orsós István egyéni vállalkozó (alanyi adómentes)</li>
                  <li><b>Székhely:</b> [kitöltendő]</li>
                  <li><b>Nyilvántartási szám / adószám:</b> [kitöltendő]</li>
                  <li><b>E-mail:</b> kapcsolat@diakzona.hu</li>
                </ul>
                <p className="text-sm">Panasz esetén a kapcsolat@diakzona.hu címen fordulhatsz hozzánk; a lakóhely szerint illetékes békéltető testülethez is fordulhatsz.</p>
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
