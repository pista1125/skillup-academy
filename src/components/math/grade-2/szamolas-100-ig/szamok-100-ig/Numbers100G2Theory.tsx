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
  TensToHundredSvg,
  PlaceValueSvg,
  NeighboursSvg,
  HundredChartSvg,
  CompareSvg,
  CoinsSvg
} from './Numbers100G2Figures';
import { RodBuilderLab, ChartWalkLab } from './Numbers100G2Parts';

export const Numbers100G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="szamok-100-ig"
    grade={2}
    chapterId="szamolas-100-ig"
    title="1. Számok 100-ig"
    subtitle="Tízesek és egyesek, számszomszédok, százas tábla, számegyenes és összehasonlítás 100-ig."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_szamok_100_ig_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — TÍZESEK ÉS EGYESEK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-sm sm:text-base font-black text-blue-900 dark:text-blue-200">
            63 = 6 tízes + 3 egyes = 60 + 3
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Az első számjegy</strong> a tízesek száma.</li>
            <li><strong>Az utolsó számjegy</strong> az egyesek száma.</li>
            <li><strong>10 tízes = 100.</strong></li>
          </ul>
        </div>
      )
    }}
  >
    {/* 1. Mit tanulunk? */}
    <TheorySection title="1. Mit tanulunk?" badge="0–100 számkör" badgeColor="blue">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Már ismered a számokat 50-ig. Most elmegyünk egészen <strong>100-ig</strong>!</p>
        <p>Tízesével csoportosítunk. Így a sok tárgyat is gyorsan megszámolod.</p>
      </div>
    </TheorySection>

    {/* 2. Tízesével */}
    <TheorySection title="2. Tízesével 100-ig" badge="Kerek tízesek" badgeColor="sky">
      <TensToHundredSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Számolj tízesével!" badge="10, 20, 30 …" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            10, 20, 30, 40, 50, <strong>60, 70, 80, 90, 100</strong>. Ezek a <strong>kerek tízesek</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="A száz" badge="10 tízes" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            10 rúd = 10 tízes = <strong>100</strong>. A 100 az első <strong>háromjegyű</strong> szám.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 3. Tízesek és egyesek */}
    <TheorySection title="3. Tízesek és egyesek" badge="Helyi érték" badgeColor="amber">
      <PlaceValueSvg />
      <TheoryTable
        headers={['Szám', 'Tízes', 'Egyes', 'Bontás']}
        rows={[
          ['58', '5', '8', '50 + 8'],
          ['63', '6', '3', '60 + 3'],
          ['90', '9', '0', '90 + 0'],
          ['74', '7', '4', '70 + 4']
        ]}
      />
      <TheoryCallout type="info" title="10 egyes = 1 tízes">
        Ha 10-nél több egyes van, 10 egyest cserélj be 1 tízesre! <strong>5 tízes + 13 egyes</strong> = 6 tízes + 3 egyes = <strong>63</strong>.
      </TheoryCallout>
    </TheorySection>

    {/* 4. Számszomszédok */}
    <TheorySection title="4. Számszomszédok" badge="Egyes és tízes" badgeColor="emerald">
      <NeighboursSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="Egyes szomszédok" badge="1-gyel kisebb, 1-gyel nagyobb" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>82 &lt; 83 &lt; 84</strong>. Előtte és utána áll.
          </p>
        </TheoryCard>
        <TheoryCard title="Tízes szomszédok" badge="kerek tízesek" badgeColor="orange">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A legközelebbi kerek tízesek: <strong>80 &lt; 83 &lt; 90</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="Kerek tízes szomszédai" badge="70" badgeColor="purple">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A 70 tízes szomszédai: <strong>60 &lt; 70 &lt; 80</strong>.
          </p>
        </TheoryCard>
      </div>
      <TheoryCallout type="tip" title="Páros vagy páratlan?">
        Csak az <strong>utolsó számjegyet</strong> nézd! Páros: 0, 2, 4, 6, 8 a vége (pl. <strong>76</strong>). Páratlan: 1, 3, 5, 7, 9 a vége (pl. <strong>83</strong>).
      </TheoryCallout>
    </TheorySection>

    {/* 5. Százas tábla */}
    <TheorySection title="5. A százas tábla" badge="1–100" badgeColor="teal">
      <HundredChartSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Egy sorban" badge="± 1" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Jobbra 1-gyel nő: 45 → <strong>46</strong>. Balra 1-gyel csökken: 45 → <strong>44</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="Egy oszlopban" badge="± 10" badgeColor="orange">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Lefelé 10-zel nő: 45 → <strong>55</strong>. Felfelé 10-zel csökken: 45 → <strong>35</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 6. Összehasonlítás */}
    <TheorySection title="6. Melyik a nagyobb?" badge="< > =" badgeColor="purple">
      <CompareSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="1. Nézd a tízeseket!" badge="68 < 86" badgeColor="purple">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Amelyikben több a tízes, az a nagyobb. 6 tízes kevesebb, mint 8 tízes.
          </p>
        </TheoryCard>
        <TheoryCard title="2. Ha egyforma, nézd az egyeseket!" badge="74 > 71" badgeColor="violet">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Mindkettőben 7 tízes van. 4 egyes több, mint 1 egyes, ezért <strong>74 &gt; 71</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 7. Pénz */}
    <TheorySection title="7. Fizessünk forinttal!" badge="Ft" badgeColor="amber">
      <CoinsSvg />
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Egy 10 forintos = 1 tízes. 7 darab 10 forintos = <strong>70 Ft</strong>. Ugyanennyi egy 50-es és egy 20-as is.
      </p>
    </TheorySection>

    {/* 8. Nézzük meg együtt! */}
    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Csere" badge="5 tízes + 14 egyes" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>14 egyes = 1 tízes + 4 egyes.</li>
            <li>5 tízes + 1 tízes = <strong>6 tízes</strong>.</li>
            <li>6 tízes + 4 egyes = <strong>64</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Tízes szomszédok" badge="86" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>A 86-ban 8 tízes van.</li>
            <li>Az előző kerek tízes: <strong>80</strong>.</li>
            <li>A következő: <strong>90</strong>. Tehát 80 &lt; 86 &lt; 90.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Nyitott mondat" badge="67 < □ < 71" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Nagyobb, mint 67: 68, 69, 70, 71 …</li>
            <li>Kisebb, mint 71: a 71 már nem jó.</li>
            <li>Megoldás: <strong>68, 69, 70</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 9. Vigyázz! */}
    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Hatvannyolc vagy nyolcvanhat?"
        wrong="hatvannyolc = 86"
        wrongExplanation="Felcserélted a számjegyeket! A hatvan a tízeseket mondja, ezért a 6 áll elöl."
        correct="hatvannyolc = 68"
        correctExplanation="6 tízes + 8 egyes = 60 + 8 = 68."
        tip="Mondd ki lassan: elöl a tízesek, utána az egyesek."
      />
      <TheoryCallout type="warning" title="A 0 is számít!">
        A <strong>90</strong>-ben 9 tízes és <strong>0</strong> egyes van. A 0 nélkül csak 9 lenne!
      </TheoryCallout>
    </TheorySection>

    {/* 10. Labor I */}
    <TheorySection title="10. Labor I: Rakd ki rudakkal!" badge="Interaktív labor" badgeColor="blue">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Egy rúd = 10, egy kocka = 1. Rakd ki a számot, aztán nyomd meg az Ellenőrzés gombot!
      </p>
      <RodBuilderLab />
    </TheorySection>

    {/* 11. Labor II */}
    <TheorySection title="11. Labor II: Lépegess a százas táblán!" badge="Interaktív labor" badgeColor="emerald">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Indulj a sárga számról! Lépj a megadott irányba, és koppints oda, ahová érkezel!
      </p>
      <ChartWalkLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Numbers100G2Theory;
