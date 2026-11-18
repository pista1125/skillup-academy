import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { OldUnitsSvg, UnitRodsSvg, CmDmMSvg, LengthToolsSvg, RulerZeroSvg } from './LengthG2Figures';
import { RulerLab, DmCmLab } from './LengthG2Parts';

export const LengthG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g2-measurements"
      subtopicId="hosszusag-meres"
      grade={2}
      chapterId="meresek"
      title="1. A hosszúság mérése"
      subtitle="Régi mértékegységek, mérés egységekkel, cm, dm, m, mérés vonalzóval, becslés és átváltás."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG"
      themeColor="blue"
      pdfFilename="2_osztaly_hosszusag_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A HOSSZÚSÁG MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-sm sm:text-base font-black text-blue-900 dark:text-blue-200">
              1 m = 10 dm = 100 cm &nbsp;•&nbsp; 1 dm = 10 cm
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Vonalzóval:</strong> a 0-t tedd a dolog elejéhez!</li>
              <li><strong>Előbb becsülj,</strong> aztán mérj!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Hosszúság" badgeColor="blue">
        <div className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Milyen hosszú a ceruzád? Milyen magas az ajtó?</p>
          <p>Ezt <strong>méréssel</strong> tudjuk meg.</p>
          <p>Megismered a <strong>centimétert</strong>, a <strong>decimétert</strong> és a <strong>métert</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Régen így mértek" badge="Testrészekkel" badgeColor="amber">
        <OldUnitsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Testrészekkel" badge="arasz, láb, öl" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Régen nem volt vonalzó. Az emberek a <strong>kezükkel</strong>, a <strong>lábukkal</strong>, a <strong>lépésükkel</strong> mértek.
            </p>
          </TheoryCard>
          <TheoryCard title="Mindenkinél más!" badge="kis kéz, nagy kéz" badgeColor="rose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A gyerek arasza kicsi, a felnőtté nagy. Ugyanaz a pad a gyereknek <strong>6 arasz</strong>, a felnőttnek csak <strong>3</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Mérés egységekkel" badge="Hányszor fér rá?" badgeColor="rose">
        <UnitRodsSvg />
        <TheoryCallout type="info" title="Nagyobb egység – kisebb szám">
          Ugyanaz a ceruza <strong>8 kis kocka</strong>, de csak <strong>4 rózsaszín rúd</strong>. Minél nagyobb az egység, annál kevesebb kell belőle.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Centiméter, deciméter, méter" badge="cm, dm, m" badgeColor="orange">
        <CmDmMSvg />
        <TheoryTable
          headers={['Mértékegység', 'Jele', 'Mit mérünk vele?']}
          rows={[
            ['centiméter', 'cm', 'ceruza, radír, füzet'],
            ['deciméter', 'dm', 'tolltartó, szék magassága'],
            ['méter', 'm', 'ajtó, terem, kerítés']
          ]}
        />
        <TheoryCallout type="tip" title="Mutasd meg a kezeddel!">
          <strong>1 cm</strong> ≈ az ujjad szélessége. <strong>1 dm</strong> ≈ a mutatóujjad és a hüvelykujjad közti távolság. <strong>1 m</strong> ≈ egy nagy lépés.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Mérőeszközök" badge="Eszközök" badgeColor="emerald">
        <LengthToolsSvg />
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
          A füzetet <strong>vonalzóval</strong> mérjük. A terem hosszát <strong>mérőszalaggal</strong> vagy <strong>colstokkal</strong>.
        </p>
      </TheorySection>

      <TheorySection title="6. Mérés vonalzóval" badge="0-tól!" badgeColor="sky">
        <RulerZeroSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. lépés" badge="0 az elején" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">Tedd a vonalzó <strong>0</strong> vonását a dolog elejéhez!</p>
          </TheoryCard>
          <TheoryCard title="2. lépés" badge="Nézd a végét" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">Nézd meg, melyik számnál van a <strong>vége</strong>!</p>
          </TheoryCard>
          <TheoryCard title="3. lépés" badge="Írd le" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">Írd mellé a mértékegységet is: <strong>6 cm</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Becslés és mérés" badge="Eltérés" badgeColor="purple">
        <TheoryTable
          headers={['Mit?', 'Becslés', 'Mérés', 'Eltérés']}
          rows={[
            ['füzet', '25 cm', '30 cm', '5 cm'],
            ['radír', '6 cm', '4 cm', '2 cm'],
            ['pad', '1 m', '1 m 2 dm', '2 dm']
          ]}
        />
        <TheoryCallout type="info" title="Mi az eltérés?">
          Az eltérés a <strong>becslés</strong> és a <strong>mérés</strong> különbsége. Minél kisebb, annál jobban becsültél!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) dm és cm" badge="1 dm 4 cm" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>1 dm = <strong>10 cm</strong>.</li>
              <li>10 cm + 4 cm = <strong>14 cm</strong>.</li>
              <li>Tehát 1 dm 4 cm = 14 cm.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Nem a 0-tól" badge="3-tól 10-ig" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>A csík a 3-nál kezdődik.</li>
              <li>A 10-nél végződik.</li>
              <li>10 − 3 = <strong>7 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Mennyi maradt?" badge="1 m − 30 cm" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Írd át: 1 m = <strong>100 cm</strong>.</li>
              <li>100 − 30 = <strong>70</strong>.</li>
              <li>70 cm maradt.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Nem a 0-nál kezdődik!"
          wrong="A csík 2-től 8-ig tart, tehát 8 cm."
          wrongExplanation="A 8 csak a csík vége. Az elejét nem a 0-nál tetted le."
          correct="8 − 2 = 6, a csík 6 cm."
          correctExplanation="Vond ki a végéből az elejét, vagy told a vonalzót a 0-ig!"
          tip="Mérés előtt mindig nézd meg: a 0 a dolog elejénél van?"
        />
        <TheoryCallout type="warning" title="Mindig írd ki a mértékegységet!">
          A „<strong>5</strong>” nem hosszúság. Lehet 5 cm, 5 dm vagy 5 m – ezek nagyon különböznek!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="10. Labor I: Mérj vonalzóval!" badge="Interaktív labor" badgeColor="blue">
        <RulerLab />
      </TheorySection>

      <TheorySection title="11. Labor II: Rakd ki dm-rel és cm-rel!" badge="Interaktív labor" badgeColor="orange">
        <DmCmLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LengthG2Theory;
