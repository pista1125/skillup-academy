import React from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  Count100MapSvg,
  Count100HundredSquareSvg,
  Count100BridgeAddSvg,
  Count100BridgeSubSvg,
  Count100PyramidSvg,
  Count100StripSvg,
  Count100RodsSvg
} from './Count100ExamG2Figures';
import { MixedTaskLab, PyramidLab } from './Count100ExamG2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>
);

export const Count100ExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="megallo"
    grade={2}
    chapterId="szamolas-100-ig"
    title="6. Megálló – tudáspróba"
    subtitle="Ismétlés: számok 100-ig, összeadás és kivonás, kerek tízesek, szöveges feladatok."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="cyan"
    pdfFilename="2_osztaly_szamolas_100_ig_megallo_tananyag.pdf"
    practiceTitle="Készen állsz a tudáspróbára?"
    practiceSubtitle="90 feladat 3 szinten – mutasd meg, mit tudsz!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A LEGFONTOSABB SZABÁLYOK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80 text-center font-mono text-base font-black text-cyan-900 dark:text-cyan-200">
            38 + 7 = 38 + 2 + 5 = 45
          </div>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li><strong>Helyiérték:</strong> 47 = 4 tízes + 7 egyes.</li>
            <li><strong>Tízesátlépés:</strong> előbb a kerek tízesig lépj!</li>
            <li><strong>Ellenőrzés:</strong> a kivonást összeadással ellenőrizd.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Amit már tudsz a III. témakörből" badge="Ismétlés" badgeColor="cyan">
      <Count100MapSvg />
      <P>Ez a megálló mindent összefoglal. Nézd át a példákat, próbáld ki a laborokat, aztán jöhet a tudáspróba!</P>
    </TheorySection>

    <TheorySection title="2. Számok 100-ig" badge="Helyiérték, szomszédok" badgeColor="blue">
      <Count100RodsSvg />
      <Count100HundredSquareSvg />
      <TheoryTable
        headers={['Kérdés', 'Példa', 'Válasz']}
        rows={[
          ['Hány tízes, hány egyes?', '68', '6 tízes, 8 egyes'],
          ['Egyes szomszédok', '□, 47, □', '46 és 48'],
          ['Kerek tízes szomszédok', '40 < 47 < 50', '40 és 50'],
          ['Melyik nagyobb?', '63 vagy 36', '63 > 36 (több tízes)']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. Összeadás és kivonás tízesátlépéssel" badge="Két ugrás" badgeColor="emerald">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <Count100BridgeAddSvg />
        <Count100BridgeSubSvg />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="Összeadás" badge="56 + 28" badgeColor="emerald">
          <P>56 + 20 = 76, aztán 76 + 4 = 80, és 80 + 4 = <strong>84</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Kivonás" badge="82 − 47" badgeColor="purple">
          <P>82 − 40 = 42, aztán 42 − 2 = 40, és 40 − 5 = <strong>35</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Kerek tízes" badge="63 + 30" badgeColor="amber">
          <P>Csak a tízesek változnak: 6 + 3 = 9 tízes. <strong>93</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="4. Számpiramis, bűvös négyzet, szabály" badge="Fejtörők" badgeColor="purple">
      <Count100PyramidSvg />
      <P>Bűvös négyzetben minden sor, oszlop és átló összege ugyanannyi. Ha egy sor kész, abból tudod, mennyi a többi!</P>
    </TheorySection>

    <TheorySection title="5. Szöveges feladatok" badge="Szalagos ábra" badgeColor="rose">
      <Count100StripSvg />
      <P>Az 5 lépés: Adatok → Terv → Számolás → Ellenőrzés → Válasz.</P>
    </TheorySection>

    <TheorySection title="6. Vigyázz!" badge="Csapdák" badgeColor="orange">
      <TheoryTrapBox
        title="82 − 47 — ne cseréld meg az egyeseket!"
        wrong="82 − 47 = 45"
        wrongExplanation="Itt a 7 − 2-t számolták az egyeseknél. De a 2-ből nem vehetsz el 7-et!"
        correct="82 − 47 = 35"
        correctExplanation="82 − 40 = 42, 42 − 7 = 35. Ellenőrzés: 35 + 47 = 82."
        tip="Tízesátlépésnél mindig két lépésben számolj!"
      />
      <TheoryCallout type="warning" title="Tízesek és egyesek sorrendje">
        „7 egyes és 4 tízes” = <strong>47</strong>, nem 74! A tízes áll elöl.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Labor I: Vegyes feladatgép" badge="Interaktív labor" badgeColor="cyan">
      <P>Válassz feladattípust, vagy kérj vegyeset! Koppints a jó válaszra.</P>
      <MixedTaskLab />
    </TheorySection>

    <TheorySection title="8. Labor II: Számpiramis-építő" badge="Interaktív labor" badgeColor="sky">
      <P>A két alsó szám összege kerül föléjük. Töltsd ki a piramist!</P>
      <PyramidLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Count100ExamG2Theory;
