import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { EggBoxesSvg, SixJumpsSvg, TablesLinkSvg, DoubleThreeSvg, ChainSvg, Array6Svg } from './Mult6G2Figures';
import { EggBoxLab, DoubleLab } from './Mult6G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult6G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-6-tal"
    grade={2}
    chapterId="szorzas"
    title="5. Szorzás 6-tal"
    subtitle="Hatos csoportok, hatos ugrások és a 6-os szorzótábla. Meglátjuk, hogyan segít a 2-es és a 3-as tábla."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="rose"
    pdfFilename="2_osztaly_szorzas_6_tal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 6-OS SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base sm:text-lg font-black text-rose-900 dark:text-rose-200">
            4 · 6 = 6 + 6 + 6 + 6 = 24
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Olvasd így: <strong>négyszer hat</strong>.</li>
            <li>A 6-os tábla: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.</li>
            <li>Segítség: <strong>4 · 6</strong> a <strong>4 · 3</strong> kétszerese: 12 + 12 = 24.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="6-os tábla" badgeColor="rose">
      <div className="space-y-2">
        <P>Ma a <strong>6-os szorzótáblát</strong> tanuljuk.</P>
        <P>Hatos csoportokat számolunk: tojásdobozt, dobókockát.</P>
        <P>Megnézzük, hogyan segít a <strong>2-es</strong> és a <strong>3-as</strong> tábla.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hatos csoportok" badge="6 + 6 + 6 + 6" badgeColor="amber">
      <EggBoxesSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="6 + 6 + 6 + 6" badgeColor="amber">
          <P>Egy dobozban <strong>6</strong> tojás van. 4 doboz van.</P>
          <P>Összeadjuk: <strong>6 + 6 + 6 + 6 = 24</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="4 · 6" badgeColor="rose">
          <P>Négyszer adtuk össze a 6-ot.</P>
          <P>Rövidebben: <strong>4 · 6 = 24</strong>. Olvasd: négyszer hat.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Hatos ugrások" badge="A 6 többszörösei" badgeColor="purple">
      <SixJumpsSvg />
      <P>Indulj a 0-ról, és ugorj mindig <strong>6-ot</strong>!</P>
      <P>
        Ezekre a számokra érkezel: <strong>6, 12, 18, 24, 30, 36, 42, 48, 54, 60</strong>. Ezek a{' '}
        <strong>6 többszörösei</strong>.
      </P>
    </TheorySection>

    <TheorySection title="4. A 6-os szorzótábla" badge="Tábla" badgeColor="rose">
      <TheoryTable
        headers={['Szorzás', 'Eredmény', 'Szorzás', 'Eredmény']}
        rows={[
          ['0 · 6', '0', '6 · 6', '36'],
          ['1 · 6', '6', '7 · 6', '42'],
          ['2 · 6', '12', '8 · 6', '48'],
          ['3 · 6', '18', '9 · 6', '54'],
          ['4 · 6', '24', '10 · 6', '60'],
          ['5 · 6', '30', '', '']
        ]}
      />
      <TheoryCallout type="tip" title="Mindig 6-tal több">
        A következő szorzat mindig 6-tal több. Ha tudod, hogy <strong>5 · 6 = 30</strong>, akkor{' '}
        <strong>6 · 6 = 30 + 6 = 36</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. A 2-es, 3-as és 6-os tábla kapcsolata" badge="Kapcsolat" badgeColor="emerald">
      <TablesLinkSvg />
      <P>
        A 6 többszörösei a 2-es és a 3-as táblában is benne vannak: <strong>6, 12, 18, 24, 30</strong>.
      </P>
      <DoubleThreeSvg />
      <TheoryTable
        headers={['3-as tábla', 'Duplázva', '6-os tábla']}
        rows={[
          ['2 · 3 = 6', '6 + 6', '2 · 6 = 12'],
          ['4 · 3 = 12', '12 + 12', '4 · 6 = 24'],
          ['5 · 3 = 15', '15 + 15', '5 · 6 = 30'],
          ['7 · 3 = 21', '21 + 21', '7 · 6 = 42'],
          ['9 · 3 = 27', '27 + 27', '9 · 6 = 54']
        ]}
      />
      <ChainSvg />
      <TheoryCallout type="success" title="Ezt jegyezd meg!">
        A 6-os tábla eredménye a 3-as tábla eredményének a <strong>kétszerese</strong>. Szorozhatsz előbb 3-mal, aztán 2-vel: ez
        ugyanaz, mint 6-tal szorozni.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Felcserélés és hatszorosa" badge="Rácspontok" badgeColor="sky">
      <Array6Svg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Felcserélhetők" badge="3 · 6 = 6 · 3" badgeColor="sky">
          <P>A tényezők helyet cserélhetnek. A szorzat ugyanannyi: <strong>18</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Hatszorosa" badge="6-szor annyi" badgeColor="teal">
          <P>
            A 3 <strong>hatszorosa</strong>: hatszor annyi, vagyis 6 · 3 = <strong>18</strong>.
          </P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="orange">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Méhecskék" badge="5 · 6" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>5 méhecske ül a virágon.</li>
            <li>Mindegyiknek 6 lába van.</li>
            <li>5 · 6 = <strong>30</strong> láb.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Duplázás" badge="8 · 6" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Először: 8 · 3 = 24.</li>
            <li>Duplázd meg: 24 + 24 = 48.</li>
            <li>Tehát 8 · 6 = <strong>48</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó tényező" badge="□ · 6 = 42" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Ugorj hatosával a 42-ig.</li>
            <li>6, 12, 18, 24, 30, 36, 42 — ez 7 ugrás.</li>
            <li>□ = <strong>7</strong>, mert 7 · 6 = 42.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="7 · 6 = 13"
        wrongExplanation="Ez a 7 + 6 lenne! A szorzásnál a 6-ot hétszer adjuk össze."
        correct="7 · 6 = 42"
        correctExplanation="Hétszer hat: 7 · 3 = 21, és 21 + 21 = 42."
        tip="Nézd meg a jelet, mielőtt számolsz!"
      />
      <TheoryCallout type="warning" title="Duplázd, ne adj hozzá 3-at!">
        A 4 · 6 nem 4 · 3 + 3. A 4 · 3-at kell még egyszer hozzáadni: <strong>12 + 12 = 24</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Tojásdoboz-töltő" badge="Interaktív labor" badgeColor="amber">
      <EggBoxLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Duplázó" badge="Interaktív labor" badgeColor="rose">
      <DoubleLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult6G2Theory;
