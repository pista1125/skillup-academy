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
  RoundTensPlusOnesSvg,
  NoCrossSvg,
  BridgeLineSvg,
  TensThenOnesSvg,
  TwoDigitCrossSvg,
  RodsExchangeSvg
} from './Add100G2Figures';
import { RodAddLab, HopLab } from './Add100G2Parts';

export const Add100G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="osszeadas-100-as-szamkor"
    grade={2}
    chapterId="szamolas-100-ig"
    title="2. Összeadás 100-as számkör"
    subtitle="Kerek tízes + egyes, összeadás tízesátlépés nélkül és tízesátlépéssel, kétjegyű + kétjegyű szám."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_osszeadas_100_as_szamkor_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — ELŐBB A TÍZESEK, AZTÁN AZ EGYESEK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-200">
            47 + 28 = 47 + 20 + 8 = 67 + 8 = 75
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Tízesátlépés nélkül:</strong> 63 + 5 = 68 (3 + 5 = 8).</li>
            <li><strong>Tízesátlépéssel:</strong> 67 + 5 = 67 + 3 + 2 = 72.</li>
            <li><strong>10 egyes = 1 tízes</strong> – cseréld be!</li>
          </ul>
        </div>
      )
    }}
  >
    {/* 1. Mit tanulunk? */}
    <TheorySection title="1. Mit tanulunk?" badge="0–100 számkör" badgeColor="emerald">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Most már 100-ig adunk össze!</p>
        <p>Ugyanazok a trükkök segítenek, mint 20-ig: a <strong>kistesó</strong> és a <strong>pótlás a kerek tízesig</strong>.</p>
        <p>Újdonság: két kétjegyű számot is összeadunk. <strong>Előbb a tízeseket, aztán az egyeseket!</strong></p>
      </div>
    </TheorySection>

    {/* 2. Kerek tízes + egyes */}
    <TheorySection title="2. Kerek tízes + egyes" badge="60 + 7" badgeColor="sky">
      <RoundTensPlusOnesSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Az egyes a 0 helyére megy" badge="80 + 4 = 84" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>90 + 3 = 93</strong>, <strong>50 + 8 = 58</strong>. A tízesek nem változnak.
          </p>
        </TheoryCard>
        <TheoryCard title="A tagok felcserélhetők" badge="7 + 60 = 67" badgeColor="teal">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Mindegy a sorrend! <strong>7 + 60</strong> ugyanannyi, mint <strong>60 + 7</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 3. Tízesátlépés nélkül */}
    <TheorySection title="3. Tízesátlépés nélkül — a kistesó segít!" badge="63 + 5" badgeColor="blue">
      <NoCrossSvg />
      <TheoryTable
        headers={['Kistesó', 'Nagy szám', 'Fordítva']}
        rows={[
          ['3 + 5 = 8', '63 + 5 = 68', '5 + 63 = 68'],
          ['4 + 4 = 8', '84 + 4 = 88', '4 + 84 = 88'],
          ['2 + 7 = 9', '52 + 7 = 59', '7 + 52 = 59'],
          ['1 + 6 = 7', '91 + 6 = 97', '6 + 91 = 97']
        ]}
      />
    </TheorySection>

    {/* 4. Tízesátlépéssel */}
    <TheorySection title="4. Tízesátlépéssel — pótolj a kerek tízesig!" badge="67 + 5" badgeColor="orange">
      <BridgeLineSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="1. lépés" badge="67 + 3 = 70" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">Mennyi kell a 67-hez a 70-ig? <strong>3</strong>.</p>
        </TheoryCard>
        <TheoryCard title="2. lépés" badge="5 = 3 + 2" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">Az 5-ből 3-at már hozzáadtál. Marad <strong>2</strong>.</p>
        </TheoryCard>
        <TheoryCard title="3. lépés" badge="70 + 2 = 72" badgeColor="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300">Most könnyű: <strong>70 + 2 = 72</strong>.</p>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Feladat', 'Pótlás', 'Így számolj', 'Összeg']}
        rows={[
          ['58 + 7', '58 + 2 = 60', '58 + 2 + 5', '65'],
          ['86 + 6', '86 + 4 = 90', '86 + 4 + 2', '92'],
          ['79 + 4', '79 + 1 = 80', '79 + 1 + 3', '83'],
          ['94 + 6', '94 + 6 = 100', '—', '100']
        ]}
      />
    </TheorySection>

    {/* 5. Kétjegyű + kétjegyű */}
    <TheorySection title="5. Kétjegyű + kétjegyű: előbb a tízesek!" badge="45 + 23" badgeColor="teal">
      <TensThenOnesSvg />
      <TheoryTable
        headers={['Feladat', 'Tízesek', 'Egyesek', 'Összeg']}
        rows={[
          ['45 + 23', '45 + 20 = 65', '65 + 3', '68'],
          ['52 + 34', '52 + 30 = 82', '82 + 4', '86'],
          ['36 + 41', '36 + 40 = 76', '76 + 1', '77']
        ]}
      />
    </TheorySection>

    {/* 6. Kétjegyű + kétjegyű tízesátlépéssel */}
    <TheorySection title="6. Kétjegyű + kétjegyű tízesátlépéssel" badge="47 + 28" badgeColor="purple">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <TwoDigitCrossSvg />
        <RodsExchangeSvg />
      </div>
      <TheoryCallout type="info" title="Két út, ugyanaz az eredmény">
        Számegyenesen: <strong>47 + 20 = 67</strong>, aztán <strong>67 + 3 + 5 = 75</strong>. Rudakkal: a 10 kockát 1 rúdra cseréled.
      </TheoryCallout>
    </TheorySection>

    {/* 7. Hiányzó tag */}
    <TheorySection title="7. Hiányzó szám" badge="55 + □ = 63" badgeColor="amber">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Pótolj lépésenként!" badge="55 + □ = 63" badgeColor="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            55-től a 60-ig <strong>5</strong> kell. 60-tól a 63-ig még <strong>3</strong>. Együtt 5 + 3 = <strong>8</strong>. Tehát □ = 8.
          </p>
        </TheoryCard>
        <TheoryCard title="A nagyobbhoz adj!" badge="18 + 46" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Cseréld meg a tagokat: <strong>46 + 18</strong> = 46 + 10 + 8 = 56 + 8 = <strong>64</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 8. Nézzük meg együtt! */}
    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Tízesátlépés" badge="76 + 8" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>76-tól 80-ig: <strong>4</strong>.</li>
            <li>A 8-ból marad: 8 − 4 = <strong>4</strong>.</li>
            <li>80 + 4 = <strong>84</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Két kétjegyű" badge="34 + 52" badgeColor="teal">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tízesek: 34 + 50 = <strong>84</strong>.</li>
            <li>Egyesek: 84 + 2 = <strong>86</strong>.</li>
            <li>Tehát 34 + 52 = 86.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Szöveges feladat" badge="… 19-cel több" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Panninak 27 matricája van. Bencének 19-cel több.</li>
            <li>„Több” → összeadás: 27 + 19.</li>
            <li>27 + 10 = 37, 37 + 9 = <strong>46</strong> matrica.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 9. Vigyázz! */}
    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="47 + 28 — ne felejtsd el a cserét!"
        wrong="47 + 28 = 65"
        wrongExplanation="7 + 8 = 15. Ebben van egy újabb tízes! Ha kihagyod, 10-zel kevesebb lesz az eredmény."
        correct="47 + 28 = 75"
        correctExplanation="4 tízes + 2 tízes = 6 tízes, és a 15 egyesből még 1 tízes. Összesen 7 tízes és 5 egyes."
        tip="Ha az egyesek összege 10 vagy több, a tízesek száma eggyel nő."
      />
      <TheoryCallout type="warning" title="Tízeshez tízest, egyeshez egyest!">
        <strong>45 + 30</strong> nem 48! A 30 három tízes: 45 + 30 = <strong>75</strong>.
      </TheoryCallout>
    </TheorySection>

    {/* 10. Labor I */}
    <TheorySection title="10. Labor I: Összeadás rudakkal" badge="Interaktív labor" badgeColor="emerald">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Nézd meg a rudakat és a kockákat! Ha 10 kocka összejön, cseréld be egy rúdra. Aztán válaszd ki az összeget!
      </p>
      <RodAddLab />
    </TheorySection>

    {/* 11. Labor II */}
    <TheorySection title="11. Labor II: Ugrálj a számegyenesen!" badge="Interaktív labor" badgeColor="sky">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Ugorj először tízeseket (+ 10), aztán egyeseket (+ 1)! Ha célba értél, nyomd meg az Ellenőrzés gombot.
      </p>
      <HopLab mode="add" />
    </TheorySection>
  </TheoryTemplate>
);

export default Add100G2Theory;
