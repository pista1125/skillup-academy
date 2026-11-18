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
  CloverGroupsSvg,
  ThreeJumpsLineSvg,
  MultiplesBoardSvg,
  ArrayCommute3Svg,
  TrianglesTableSvg,
  TripleArrowSvg
} from './Mult3G2Figures';
import { TriangleLab, JumpLab3 } from './Mult3G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>
);

export const Mult3G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-3-mal"
    grade={2}
    chapterId="szorzas"
    title="2. Szorzás 3-mal"
    subtitle="Hármasával számolunk, a 3 többszörösei, a 3-as szorzótábla, felcserélés és a háromszoros."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_szorzas_3_mal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 3-AS SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200">
            4 · 3 = 3 + 3 + 3 + 3 = 12
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Olvasd így: <strong>négyszer három</strong>.</li>
            <li>A 3-as tábla: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.</li>
            <li>A következő mindig <strong>3-mal több</strong>.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Hármas csoportok" badgeColor="emerald">
      <div className="space-y-2">
        <P>A 2-es táblát már tudod. Most jön a <strong>3-as tábla</strong>!</P>
        <P>Sok mindenből van <strong>3</strong>: a lóherének 3 levele, a triciklinek 3 kereke, a háromszögnek 3 oldala.</P>
        <P>Ha több hármas csoportunk van, <strong>szorzással</strong> gyorsan megszámoljuk őket.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hármas csoportok – szorzás" badge="Ugyanannyi" badgeColor="blue">
      <CloverGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="3 + 3 + 3 + 3" badgeColor="sky">
          <P>4 lóhere, mindegyiken 3 levél. Adjuk össze: 3 + 3 + 3 + 3 = <strong>12</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="4 · 3" badgeColor="blue">
          <P>4-szer van 3 levél: <strong>4 · 3 = 12</strong>. Az első szám: hányszor. A második: mennyi.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Számolj hármasával! – A 3 többszörösei" badge="Számegyenes" badgeColor="purple">
      <ThreeJumpsLineSvg />
      <P>
        Ha 0-tól mindig 3-at ugrasz, ezekre a számokra érkezel: <strong>0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30</strong>. Ezek a{' '}
        <strong>3 többszörösei</strong>.
      </P>
      <MultiplesBoardSvg />
      <TheoryCallout type="info" title="Mások is ugrálnak!">
        Kettesével: 0, 2, 4, 6 … – ezek a <strong>2 többszörösei</strong>. Ötösével: 0, 5, 10 … – az <strong>5 többszörösei</strong>. Tízesével: 0, 10, 20, 30 – a{' '}
        <strong>10 többszörösei</strong>. A 6, 12, 18, 24, 30 a 2-nek és a 3-nak is többszöröse!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 3-as szorzótábla" badge="Tábla" badgeColor="emerald">
      <TrianglesTableSvg />
      <TheoryTable
        headers={['Szorzás', 'Összeadással', 'Eredmény']}
        rows={[
          ['0 · 3', 'nincs egy hármas sem', '0'],
          ['1 · 3', '3', '3'],
          ['2 · 3', '3 + 3', '6'],
          ['3 · 3', '3 + 3 + 3', '9'],
          ['4 · 3', '9 + 3', '12'],
          ['5 · 3', '12 + 3', '15'],
          ['6 · 3', '15 + 3', '18'],
          ['7 · 3', '18 + 3', '21'],
          ['8 · 3', '21 + 3', '24'],
          ['9 · 3', '24 + 3', '27'],
          ['10 · 3', '27 + 3', '30']
        ]}
      />
      <TheoryCallout type="tip" title="Trükk: mindig +3">
        Ha tudod az <strong>5 · 3 = 15</strong>-öt, akkor a <strong>6 · 3</strong> csak 3-mal több: 15 + 3 = <strong>18</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Felcserélés és háromszoros" badge="Kapcsolatok" badgeColor="sky">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <ArrayCommute3Svg />
        <TripleArrowSvg />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Megfordíthatod" badge="5 · 3 = 3 · 5" badgeColor="emerald">
          <P>A pöttyök száma nem változik, ha oszloponként vagy soronként számolod. <strong>5 · 3 = 15</strong> és <strong>3 · 5 = 15</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Háromszorosa" badge="3 · 4" badgeColor="rose">
          <P>A 4 <strong>háromszorosa</strong>: háromszor annyi, vagyis 4 + 4 + 4 = <strong>12</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Triciklik" badge="7 · 3" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>7 tricikli áll az udvaron.</li>
            <li>Mindegyiknek 3 kereke van.</li>
            <li>7 · 3 = <strong>21</strong> kerék.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hiányzó szám" badge="□ · 3 = 18" badgeColor="blue">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Ugorj hármasával a 18-ig: 3, 6, 9, 12, 15, 18.</li>
            <li>Számold meg az ugrásokat: <strong>6</strong>.</li>
            <li>Tehát □ = <strong>6</strong>, mert 6 · 3 = 18.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Melyik szám lehet?" badge="8 · 3 < □ < 9 · 3" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>8 · 3 = 24 és 9 · 3 = 27.</li>
            <li>24 és 27 <strong>között</strong> van: 25, 26.</li>
            <li>□ lehet <strong>25</strong> vagy <strong>26</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="4 · 3 = 7"
        wrongExplanation="Ez az összeadás: 4 + 3 = 7. A szorzásnál 4-szer veszed a 3-at!"
        correct="4 · 3 = 3 + 3 + 3 + 3 = 12"
        correctExplanation="Négy hármas: 3, 6, 9, 12."
        tip="Nézd meg a jelet, mielőtt számolsz!"
      />
      <TheoryCallout type="warning" title="0 · 3 = 0">
        Ha <strong>egyszer sem</strong> veszed a 3-at, akkor nincs semmi: <strong>0 · 3 = 0</strong>. Nem 3!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Pálcika-háromszögek" badge="Interaktív labor" badgeColor="orange">
      <TriangleLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Hármas ugrások" badge="Interaktív labor" badgeColor="purple">
      <JumpLab3 />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult3G2Theory;
