import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  HandsGroupsSvg,
  FiveJumpsNumberLineSvg,
  FiveTenLinesSvg,
  CoinsFiveTenSvg,
  FairPricesSvg
} from './Mult5G2Figures';
import { HandsLab, CoinsLab } from './Mult5G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult5G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-5-tel"
    grade={2}
    chapterId="szorzas"
    title="4. Szorzás 5-tel"
    subtitle="Ötösével számolunk: kezek, ujjak, 5 Ft-osok. Megtanuljuk az 5-ös szorzótáblát, és megnézzük, hogyan függ össze a 10-es táblával."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="amber"
    pdfFilename="2_osztaly_szorzas_5_tel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — AZ 5-ÖS TÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
            3 · 5 = 5 + 5 + 5 = 15
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li><strong>Ötösével:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.</li>
            <li><strong>A vége mindig 0 vagy 5.</strong></li>
            <li><strong>Két 5 = egy 10:</strong> 2 · 5 = 1 · 10.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="5-ös tábla" badgeColor="amber">
      <div className="space-y-2">
        <P>Már tudod a 2-es, a 3-as és a 4-es szorzótáblát. Most jön az <strong>5-ös</strong>!</P>
        <P>Egy kézen 5 ujj van. Egy 5 Ft-os érme 5 forint. Ötösével fogunk számolni.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Ötösével csoportosítunk" badge="Kezek" badgeColor="orange">
      <HandsGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="5 + 5 + 5" badgeColor="orange">
          <P>Három kéz: 5 ujj, meg 5 ujj, meg 5 ujj. <strong>5 + 5 + 5 = 15</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="3 · 5" badgeColor="amber">
          <P>Háromszor 5 ujj. Rövidebben: <strong>3 · 5 = 15</strong>. A 3 azt mutatja, hány kéz van.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Az 5-ös szorzótábla" badge="Tábla" badgeColor="blue">
      <FiveJumpsNumberLineSvg />
      <TheoryTable
        headers={['Szorzás', 'Szorzat', 'Szorzás', 'Szorzat']}
        rows={[
          ['0 · 5', '0', '6 · 5', '30'],
          ['1 · 5', '5', '7 · 5', '35'],
          ['2 · 5', '10', '8 · 5', '40'],
          ['3 · 5', '15', '9 · 5', '45'],
          ['4 · 5', '20', '10 · 5', '50'],
          ['5 · 5', '25', '', '']
        ]}
      />
      <TheoryCallout type="tip" title="Nézd a végét!">
        Az 5-ös tábla számai mindig <strong>0-ra vagy 5-re</strong> végződnek. Páros szám · 5 → a vége 0 (4 · 5 = 20). Páratlan szám · 5 → a vége 5 (7 · 5 = 35).
      </TheoryCallout>
      <TheoryCallout type="info" title="Szomszédok segítenek">
        Ha tudod, hogy 10 · 5 = 50, akkor 9 · 5 eggyel kevesebb ötös: 50 − 5 = <strong>45</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Az 5-ös és a 10-es tábla kapcsolata" badge="5 és 10" badgeColor="emerald">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <FiveTenLinesSvg />
        <CoinsFiveTenSvg />
      </div>
      <TheoryTable
        headers={['5-ös tábla', '10-es tábla', 'Szorzat']}
        rows={[
          ['2 · 5', '1 · 10', '10'],
          ['4 · 5', '2 · 10', '20'],
          ['6 · 5', '3 · 10', '30'],
          ['8 · 5', '4 · 10', '40'],
          ['10 · 5', '5 · 10', '50']
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Két ötös = egy tízes" badge="2 · 5 = 10" badgeColor="emerald">
          <P>Két 5 Ft-os ugyanannyi, mint egy 10 Ft-os. Ezért 5-ösből mindig <strong>kétszer annyi</strong> kell.</P>
        </TheoryCard>
        <TheoryCard title="Csak az 5-ös táblában" badge="5, 15, 25, 35, 45" badgeColor="teal">
          <P>Ezek az 5 többszörösei, de a 10-éi nem. Mind <strong>5-re</strong> végződik.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="5. Szöveges feladatok – Vásárban" badge="Vásár" badgeColor="purple">
      <FairPricesSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Mit tudunk? Mit keresünk?" badge="1 perec = 5" badgeColor="purple">
          <P>Egy perec 5 zseton. Hány zseton 4 perec? <strong>4 · 5 = 20</strong> zseton.</P>
        </TheoryCard>
        <TheoryCard title="Ötször annyi" badge="5-ször" badgeColor="rose">
          <P>Ádám 3 lufit vett. Márk ötször annyit. Márk lufijai: <strong>5 · 3 = 15</strong>.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Így oldd meg!">
        1. Olvasd el lassan. 2. Mit tudsz? 3. Mit kérdeznek? 4. Számolj. 5. Írd le a választ egy mondatban!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Padok" badge="7 · 5" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy padon 5 gyerek ül.</li>
            <li>7 pad van tele.</li>
            <li>7 · 5 = <strong>35</strong> gyerek.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hiányzó szám" badge="□ · 5 = 40" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Ötösével számolok a 40-ig.</li>
            <li>5, 10, 15, 20, 25, 30, 35, 40.</li>
            <li>8 ötös kellett: □ = <strong>8</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Két lépés" badge="2 · 10 + 3 · 5" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>2 db 10 Ft-os: 2 · 10 = 20 Ft.</li>
            <li>3 db 5 Ft-os: 3 · 5 = 15 Ft.</li>
            <li>20 + 15 = <strong>35 Ft</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="6 · 5 = 11"
        wrongExplanation="Ez 6 + 5 lett! A szorzásnál 6-szor veszed az 5-öt."
        correct="6 · 5 = 5 + 5 + 5 + 5 + 5 + 5 = 30"
        correctExplanation="Hat kéz: ötösével számolva 5, 10, 15, 20, 25, 30."
        tip="Ha a szorzat nem 0-ra vagy 5-re végződik, biztosan elszámoltad!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze a 10 Ft-ost az 5 Ft-ossal!">
        4 darab 10 Ft-os = 40 Ft. De 4 darab 5 Ft-os csak <strong>20 Ft</strong>!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Kezek és ujjak" badge="Interaktív labor" badgeColor="orange">
      <HandsLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Fizess 5 Ft-ossal és 10 Ft-ossal!" badge="Interaktív labor" badgeColor="blue">
      <CoinsLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult5G2Theory;
