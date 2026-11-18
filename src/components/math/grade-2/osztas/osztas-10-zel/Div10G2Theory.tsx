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
  EggPackingSvg,
  SharingTenSvg,
  TenthArrowsSvg,
  CoinsSplitSvg,
  RemainderRodsSvg,
  BoatsRoundUpSvg
} from './Div10G2Figures';
import { EggPackLab, BundleLab } from './Div10G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div10G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-10-zel"
    grade={2}
    chapterId="osztas"
    title="9. Osztás 10-zel"
    subtitle="Tízesével csoportosítunk, 10 részre osztunk, megkeressük a tizedét, és megtanuljuk a maradékos osztást 10-zel."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="teal"
    pdfFilename="2_osztaly_osztas_10_zel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 10-ZEL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base sm:text-lg font-black text-teal-900 dark:text-teal-200">
            70 : 10 = 7, mert 7 · 10 = 70
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li><strong>Hány tízes van benne?</strong> Annyi az eredmény.</li>
            <li><strong>Tizede:</strong> 10 egyenlő részre osztjuk.</li>
            <li><strong>Maradék:</strong> az egyesek száma, mindig kevesebb, mint 10.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 10-zel" badgeColor="teal">
      <div className="space-y-2">
        <P>A 10-es szorzótáblát már tudod.</P>
        <P>Most visszafelé számolunk: <strong>osztunk 10-zel</strong>.</P>
        <P>A végén azt is megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány tízes van benne?" badge="Csoportosítás" badgeColor="amber">
      <EggPackingSvg />
      <P>60 tojás van. Egy tartóba 10 fér. Hány tartó kell?</P>
      <P>Pakold tízesével: 6 tartó lett. <strong>60 : 10 = 6</strong>.</P>
    </TheorySection>

    <TheorySection title="3. Osszuk szét 10 részre!" badge="Szétosztás" badgeColor="emerald">
      <SharingTenSvg />
      <P>30 diót 10 tányérra teszünk, mindegyikre ugyanannyit.</P>
      <P>Minden tányér kap egyet, aztán még egyet … Egy tányérra 3 jut. <strong>30 : 10 = 3</strong>.</P>
      <TheoryCallout type="info" title="Mindkettő osztás">
        Tízesével csoportosítunk, vagy 10 részre osztunk szét: mindkettőt így írjuk: <strong>30 : 10</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 10-es bennfoglaló tábla" badge="Szorzás segít" badgeColor="blue">
      <TheoryTable
        headers={['Osztás', 'Mert…']}
        rows={[
          ['0 : 10 = 0', '0 · 10 = 0'],
          ['10 : 10 = 1', '1 · 10 = 10'],
          ['20 : 10 = 2', '2 · 10 = 20'],
          ['30 : 10 = 3', '3 · 10 = 30'],
          ['40 : 10 = 4', '4 · 10 = 40'],
          ['50 : 10 = 5', '5 · 10 = 50'],
          ['60 : 10 = 6', '6 · 10 = 60'],
          ['70 : 10 = 7', '7 · 10 = 70'],
          ['80 : 10 = 8', '8 · 10 = 80'],
          ['90 : 10 = 9', '9 · 10 = 90'],
          ['100 : 10 = 10', '10 · 10 = 100']
        ]}
      />
      <TheoryCallout type="tip" title="Hány tízes?">
        A 70-ben 7 tízes van. Ezért <strong>70 : 10 = 7</strong>. A 100-ban 10 tízes van: 100 : 10 = <strong>10</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Tízszerese és tizede" badge="Oda-vissza" badgeColor="orange">
      <TenthArrowsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Tízszerese" badge="· 10" badgeColor="emerald">
          <P>A 6 tízszerese: 6 · 10 = <strong>60</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Tizede" badge=": 10" badgeColor="rose">
          <P>A 60 tizede: 60 : 10 = <strong>6</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Pénz: hány 10 Ft-os?" badge="Forint" badgeColor="sky">
      <CoinsSplitSvg />
      <P>80 Ft-ot 10 Ft-osokban kapsz. Hány érme lesz? <strong>80 : 10 = 8</strong> darab.</P>
    </TheorySection>

    <TheorySection title="7. Maradékos osztás 10-zel" badge="Marad valami" badgeColor="rose">
      <RemainderRodsSvg />
      <P>47 kockát kötünk össze tízesével. 4 rúd lesz, és 7 kocka kimarad.</P>
      <P>A kimaradt kockák száma a <strong>maradék</strong>.</P>
      <TheoryTable
        headers={['Ennyi volt', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['23', '2', '3', '2 · 10 + 3 = 23'],
          ['47', '4', '7', '4 · 10 + 7 = 47'],
          ['68', '6', '8', '6 · 10 + 8 = 68'],
          ['90', '9', '0', '9 · 10 = 90']
        ]}
      />
      <TheoryCallout type="tip" title="Nézd a számjegyeket!">
        A 68-ban 6 tízes és 8 egyes van. Tízesével: <strong>6 csoport</strong>, és <strong>8 maradt</strong>.
      </TheoryCallout>
      <BoatsRoundUpSvg />
      <TheoryCallout type="info" title="Hány csónak kell?">
        34 gyerek van, egy csónakba 10 fér. 3 csónak tele lesz, 4 gyerek marad. Nekik is kell egy csónak: <strong>4 csónak kell</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="violet">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szorzás segít" badge="90 : 10" badgeColor="violet">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám · 10 = 90?</li>
            <li>9 · 10 = <strong>90</strong>.</li>
            <li>Tehát 90 : 10 = <strong>9</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szétosztás" badge="10 gyerek" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>10 gyerek 50 szem cseresznyén osztozik.</li>
            <li>50 : 10 = <strong>5</strong>.</li>
            <li>Mindenki 5 szemet kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradékkal" badge="56 tojás" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>56 tojást pakolunk tartókba, egybe 10 fér.</li>
            <li>5 · 10 = 50, a 6 · 10 = 60 már túl sok.</li>
            <li><strong>5 tartó</strong> tele, és <strong>6 tojás</strong> maradt.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék kevesebb, mint 10!"
        wrong="53 kocka: 4 csoport, maradt 13"
        wrongExplanation="13 kockából még egy tízes rúd kijön!"
        correct="53 kocka: 5 csoport, maradt 3"
        correctExplanation="5 · 10 = 50, és 50 + 3 = 53."
        tip="Ha a maradék 10 vagy több, köss össze még egy rudat!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze!">
        Az osztásnál nem vonunk ki 10-et: <strong>60 : 10 = 6</strong>, és nem 50!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Pakold tartókba!" badge="Interaktív labor" badgeColor="amber">
      <EggPackLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Maradékos osztás 10-zel" badge="Interaktív labor" badgeColor="teal">
      <BundleLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div10G2Theory;
