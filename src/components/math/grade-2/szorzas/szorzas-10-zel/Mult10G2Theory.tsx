import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { TenRodsSvg, TenJumpsSvg, FiveTenLinkSvg, CoinsTenSvg, EggBoxesSvg } from './Mult10G2Figures';
import { RodsLab, PiggyLab } from './Mult10G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult10G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-10-zel"
    grade={2}
    chapterId="szorzas"
    title="9. Szorzás 10-zel"
    subtitle="Tízesével számolunk: tízesrudak, tojástartók, 10 Ft-osok. Megtanuljuk a 10-es szorzótáblát, és megnézzük, hogyan függ össze az 5-ös táblával."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="teal"
    pdfFilename="2_osztaly_szorzas_10_zel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 10-ES TÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-sm sm:text-base font-black text-teal-900 dark:text-teal-200">
            6 · 10 = 60 → 6 tízes
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li><strong>Tízesével:</strong> 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.</li>
            <li><strong>A vége mindig 0.</strong></li>
            <li><strong>Egy 10 = két 5:</strong> 1 · 10 = 2 · 5.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="10-es tábla" badgeColor="teal">
      <div className="space-y-2">
        <P>Már sok szorzótáblát tudsz. Most jön a <strong>10-es</strong>!</P>
        <P>Ez a legkönnyebb. A tízeseket már régóta ismered.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Tízesével csoportosítunk" badge="Tízesrudak" badgeColor="emerald">
      <TenRodsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="10 + 10 + 10 + 10" badgeColor="emerald">
          <P>Négy rúd, mindegyikben 10 kocka. <strong>10 + 10 + 10 + 10 = 40</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="4 · 10" badgeColor="teal">
          <P>Négyszer 10. Rövidebben: <strong>4 · 10 = 40</strong>. A 40 éppen 4 tízes.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. A 10-es szorzótábla" badge="Tábla" badgeColor="blue">
      <TenJumpsSvg />
      <TheoryTable
        headers={['Szorzás', 'Szorzat', 'Szorzás', 'Szorzat']}
        rows={[
          ['0 · 10', '0', '6 · 10', '60'],
          ['1 · 10', '10', '7 · 10', '70'],
          ['2 · 10', '20', '8 · 10', '80'],
          ['3 · 10', '30', '9 · 10', '90'],
          ['4 · 10', '40', '10 · 10', '100'],
          ['5 · 10', '50', '', '']
        ]}
      />
      <TheoryCallout type="tip" title="Hány tízes?">
        7 · 10 = 7 tízes = <strong>70</strong>. A szám mögé egy 0 kerül. 10 · 10 = 10 tízes = <strong>100</strong>.
      </TheoryCallout>
      <TheoryCallout type="info" title="Megfordítva is jó">
        3 · 10 = 30, és 10 · 3 is 30. Tíz darab 3-as ugyanannyi, mint három darab 10-es.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Tojástartók" badge="Tízesével" badgeColor="amber">
      <EggBoxesSvg />
      <P>Egy tartóban 10 tojás van. 6 tartóban: <strong>6 · 10 = 60</strong> tojás.</P>
    </TheorySection>

    <TheorySection title="5. Fizess 10 Ft-osokkal!" badge="Pénz" badgeColor="sky">
      <CoinsTenSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Számold meg!" badge="7 · 10 Ft" badgeColor="sky">
          <P>7 darab 10 Ft-os: 10, 20, 30, … 70. Ez <strong>70 Ft</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Váltsd fel!" badge="50 Ft = 5 · 10 Ft" badgeColor="indigo">
          <P>Egy 50 Ft-os = 5 darab 10 Ft-os. 100 Ft = <strong>10 darab</strong> 10 Ft-os.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Az 5-ös és a 10-es tábla kapcsolata" badge="5 és 10" badgeColor="orange">
      <FiveTenLinkSvg />
      <TheoryTable
        headers={['10-es tábla', '5-ös tábla', 'Szorzat']}
        rows={[
          ['1 · 10', '2 · 5', '10'],
          ['2 · 10', '4 · 5', '20'],
          ['3 · 10', '6 · 5', '30'],
          ['4 · 10', '8 · 5', '40'],
          ['5 · 10', '10 · 5', '50']
        ]}
      />
      <TheoryCallout type="info" title="Két ötös = egy tízes">
        Egy 10 Ft-os helyett két 5 Ft-os kell. Ezért 5-ösből mindig <strong>kétszer annyi</strong> kell.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="violet">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Ceruzák" badge="8 · 10" badgeColor="violet">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozban 10 ceruza van.</li>
            <li>8 doboz van.</li>
            <li>8 · 10 = <strong>80</strong> ceruza.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hiányzó szám" badge="□ · 10 = 90" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Hány tízes van a 90-ben?</li>
            <li>90 = 9 tízes.</li>
            <li>□ = <strong>9</strong>, mert 9 · 10 = 90.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Két lépés" badge="3 · 10 + 4 · 5" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>3 db 10 Ft-os: 3 · 10 = 30 Ft.</li>
            <li>4 db 5 Ft-os: 4 · 5 = 20 Ft.</li>
            <li>30 + 20 = <strong>50 Ft</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="7 · 10 = 17"
        wrongExplanation="Ez 7 + 10 lett! A szorzásnál 7-szer veszed a 10-et."
        correct="7 · 10 = 70"
        correctExplanation="Hét tízes: 10, 20, 30, 40, 50, 60, 70."
        tip="Ha a szorzat nem 0-ra végződik, biztosan elszámoltad!"
      />
      <TheoryCallout type="warning" title="A 0 csapdája">
        0 · 10 = <strong>0</strong>, nem 10! Ha nincs egy tojástartó sem, tojás sincs.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Tízesrudak" badge="Interaktív labor" badgeColor="teal">
      <RodsLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Gyűjts a perselybe!" badge="Interaktív labor" badgeColor="rose">
      <PiggyLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult10G2Theory;
