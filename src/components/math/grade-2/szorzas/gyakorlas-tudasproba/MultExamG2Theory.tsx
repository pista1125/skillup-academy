import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
} from '../TheoryTemplate';
import {
  MultMeaningSvg,
  CommuteArraySvg,
  ProductGridSvg,
  Links248Svg,
  Links369Svg,
  Link510Svg,
} from './MultExamG2Figures';
import { MultMixLab, DetectiveLab } from './MultExamG2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const MultExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="gyakorlas-tudasproba"
    grade={2}
    chapterId="szorzas"
    title="10. Gyakorlás, tudáspróba"
    subtitle="A IV. témakör összefoglalása: a szorzás jelentése, a teljes szorzótábla, a táblák kapcsolata és a szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="rose"
    pdfFilename="2_osztaly_szorzas_tudasproba_tananyag.pdf"
    practiceTitle="Készen állsz a nagy tudáspróbára?"
    practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'A LEGFONTOSABB SZABÁLYOK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base sm:text-lg font-black text-rose-900 dark:text-rose-200">
            3 · 4 = 4 + 4 + 4 = 12
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>
              Olvasd: <strong>háromszor négy</strong>. 3 csoport, csoportonként 4.
            </li>
            <li>
              A tényezők felcserélhetők: <strong>3 · 4 = 4 · 3</strong>.
            </li>
            <li>
              Dupla segít: a <strong>4 · 6</strong> a <strong>2 · 6</strong> kétszerese: 12 + 12 = 24.
            </li>
          </ul>
        </div>
      ),
    }}
  >
    <TheorySection title="1. Amit már tudsz" badge="Ismétlés" badgeColor="blue">
      <P>Megtanultad az egész szorzótáblát! Nézzük át röviden, mit tudsz már.</P>
      <TheoryTable
        headers={['Lecke', 'A tábla', 'Segítség']}
        rows={[
          ['1. Szorzás 2-vel', '2, 4, 6, 8, 10, 12, 14, 16, 18, 20', 'párok: zokni, cipő'],
          ['2. Szorzás 3-mal', '3, 6, 9, 12, 15, 18, 21, 24, 27, 30', 'tricikli, háromszög'],
          ['3. Szorzás 4-gyel', '4, 8, 12, 16, 20, 24, 28, 32, 36, 40', 'a 2-es dupla'],
          ['4. Szorzás 5-tel', '5, 10, 15, 20, 25, 30, 35, 40, 45, 50', 'ujjak egy kézen'],
          ['5. Szorzás 6-tal', '6, 12, 18, 24, 30, 36, 42, 48, 54, 60', 'a 3-as dupla'],
          ['6. Szorzás 7-tel', '7, 14, 21, 28, 35, 42, 49, 56, 63, 70', 'napok egy héten'],
          ['7. Szorzás 8-cal', '8, 16, 24, 32, 40, 48, 56, 64, 72, 80', 'a 4-es dupla'],
          ['8. Szorzás 9-cel', '9, 18, 27, 36, 45, 54, 63, 72, 81, 90', 'tízszer, mínusz egyszer'],
          ['9. Szorzás 10-zel', '10, 20, 30, 40, 50, 60, 70, 80, 90, 100', 'tízesek, az 5-ös dupla'],
        ]}
      />
    </TheorySection>

    <TheorySection title="2. Mit jelent a szorzás?" badge="3 · 4" badgeColor="rose">
      <MultMeaningSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Egyforma csoportok" badge="ismételt összeadás" badgeColor="amber">
          <P>Ha egyforma csoportok vannak, szorzással gyorsabb.</P>
          <P>
            <strong>5 + 5 + 5 + 5 = 4 · 5 = 20</strong>
          </P>
        </TheoryCard>
        <TheoryCard title="0 és 1" badge="különleges" badgeColor="sky">
          <P>
            <strong>0 · 8 = 0</strong>: nulla darab 8 az semmi.
          </P>
          <P>
            <strong>1 · 8 = 8</strong>: egyszer 8 az 8.
          </P>
        </TheoryCard>
      </div>
      <CommuteArraySvg />
    </TheorySection>

    <TheorySection title="3. A teljes szorzótábla" badge="10 × 10" badgeColor="purple">
      <P>Keresd meg a sor számát és az oszlop számát. Ahol találkoznak, ott a szorzat.</P>
      <ProductGridSvg />
      <TheoryCallout type="tip" title="Detektív-tipp">
        A 24 négyszer is szerepel: 3 · 8, 4 · 6, 6 · 4 és 8 · 3. A sárga átlón az egyforma tényezők vannak: 1, 4, 9, 16, 25, 36, 49,
        64, 81, 100.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A táblák segítik egymást" badge="Kapcsolatok" badgeColor="emerald">
      <Links248Svg />
      <Links369Svg />
      <Link510Svg />
      <TheoryCallout type="success" title="Ezt jegyezd meg!">
        Ha egy szorzatot nem tudsz, keress egy könnyebbet! A <strong>7 · 8</strong> helyett: 7 · 4 = 28, és 28 + 28 = <strong>56</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. -szorosa és „-szor annyi”" badge="Szavak" badgeColor="orange">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="-szorosa" badge="· 5" badgeColor="teal">
          <P>
            A 6 <strong>ötszöröse</strong>: 5 · 6 = <strong>30</strong>.
          </P>
          <P>
            A 9 <strong>háromszorosa</strong>: 3 · 9 = <strong>27</strong>.
          </P>
        </TheoryCard>
        <TheoryCard title="Szor annyi vagy több?" badge="figyelj!" badgeColor="rose">
          <P>
            „Háromszor annyi, mint 9”: 3 · 9 = <strong>27</strong>.
          </P>
          <P>
            „3-mal több, mint 9”: 9 + 3 = <strong>12</strong>.
          </P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Két lépés" badge="4 · 7 + 5" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>4 doboz, mindben 7 ceruza.</li>
            <li>Még 5 ceruza van az asztalon.</li>
            <li>Előbb: 4 · 7 = 28.</li>
            <li>Aztán: 28 + 5 = <strong>33</strong> ceruza.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hiányzó szám" badge="□ · 8 = 48" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Hányszor 8 lesz 48?</li>
            <li>5 · 8 = 40, még egy 8: 48.</li>
            <li>□ = <strong>6</strong>, mert 6 · 8 = 48.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Nyitott mondat" badge="□ · 5 < 22" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>0, 5, 10, 15, 20 kisebb, mint 22.</li>
            <li>5 · 5 = 25 már nem.</li>
            <li>□ lehet: <strong>0, 1, 2, 3, 4</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="6 · 4 = 10"
        wrongExplanation="Ez a 6 + 4 lenne! A szorzásnál a 4-et hatszor vesszük."
        correct="6 · 4 = 24"
        correctExplanation="4 + 4 + 4 + 4 + 4 + 4 = 24, vagy 2 · 4 = 8, és ezt háromszor: 8 + 8 + 8 = 24."
        tip="Mielőtt számolsz, nézd meg a jelet!"
      />
      <TheoryCallout type="warning" title="Előbb szorozz!">
        Az <strong>5 · 6 + 5</strong> feladatban előbb a szorzást számold ki: 30, aztán adj hozzá 5-öt: <strong>35</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Vegyes szorzótábla-gyakorló" badge="Interaktív labor" badgeColor="amber">
      <P>Válaszd ki a táblát és a feladat fajtáját. Minden jó válasz egy pont!</P>
      <MultMixLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Szorzótábla-detektív" badge="Interaktív labor" badgeColor="sky">
      <P>Egy szám több helyen is elbújhat a táblában. Keresd meg mindet!</P>
      <DetectiveLab />
    </TheorySection>
  </TheoryTemplate>
);

export default MultExamG2Theory;
