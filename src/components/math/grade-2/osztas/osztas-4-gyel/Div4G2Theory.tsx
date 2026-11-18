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
  GroupingPensSvg,
  SharingPlatesSvg,
  FourthArrowsSvg,
  HalveTwiceSvg,
  RemainderGroupsSvg,
  RoundUpCagesSvg
} from './Div4G2Figures';
import { ShareLab, RemainderLab } from './Div4G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div4G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-4-gyel"
    grade={2}
    chapterId="osztas"
    title="3. Osztás 4-gyel"
    subtitle="Négyesével csoportosítunk, 4 részre osztunk, megkeressük a negyedét, és megtanuljuk a maradékos osztást 4-gyel."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_osztas_4_gyel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 4-GYEL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base sm:text-lg font-black text-violet-900 dark:text-violet-200">
            28 : 4 = 7, mert 7 · 4 = 28
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>A szorzás segít: keresd meg a 4-es táblában!</li>
            <li><strong>Negyede:</strong> 4 egyenlő részre osztjuk.</li>
            <li><strong>Maradék:</strong> mindig kevesebb, mint 4.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 4-gyel" badgeColor="violet">
      <div className="space-y-2">
        <P>A 4-es szorzótáblát már tudod.</P>
        <P>Most visszafelé számolunk: <strong>osztunk 4-gyel</strong>.</P>
        <P>A végén azt is megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány négyes van benne?" badge="Csoportosítás" badgeColor="emerald">
      <GroupingPensSvg />
      <P>16 bárány van. Egy karámba 4 fér. Hány karám kell?</P>
      <P>Rakd őket négyesével: 4 karám lett. <strong>16 : 4 = 4</strong>.</P>
    </TheorySection>

    <TheorySection title="3. Osszuk szét 4 részre!" badge="Szétosztás" badgeColor="amber">
      <SharingPlatesSvg />
      <P>20 sütit 4 tányérra teszünk, mindegyikre ugyanannyit.</P>
      <P>Mindegyik tányér kap egyet, aztán még egyet … Egy tányérra 5 jut. <strong>20 : 4 = 5</strong>.</P>
      <TheoryCallout type="info" title="Mindkettő osztás">
        Négyesével csoportosítunk, vagy 4 részre osztunk szét: mindkettőt így írjuk: <strong>20 : 4</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 4-es bennfoglaló tábla" badge="Szorzás segít" badgeColor="violet">
      <TheoryTable
        headers={['Osztás', 'Mert…']}
        rows={[
          ['0 : 4 = 0', '0 · 4 = 0'],
          ['4 : 4 = 1', '1 · 4 = 4'],
          ['8 : 4 = 2', '2 · 4 = 8'],
          ['12 : 4 = 3', '3 · 4 = 12'],
          ['16 : 4 = 4', '4 · 4 = 16'],
          ['20 : 4 = 5', '5 · 4 = 20'],
          ['24 : 4 = 6', '6 · 4 = 24'],
          ['28 : 4 = 7', '7 · 4 = 28'],
          ['32 : 4 = 8', '8 · 4 = 32'],
          ['36 : 4 = 9', '9 · 4 = 36'],
          ['40 : 4 = 10', '10 · 4 = 40']
        ]}
      />
    </TheorySection>

    <TheorySection title="5. Négyszerese és negyede" badge="Oda-vissza" badgeColor="orange">
      <FourthArrowsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Négyszerese" badge="· 4" badgeColor="emerald">
          <P>A 6 négyszerese: 6 · 4 = <strong>24</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Negyede" badge=": 4" badgeColor="rose">
          <P>A 24 negyede: 24 : 4 = <strong>6</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Trükk: felezd kétszer!" badge="2-es tábla segít" badgeColor="sky">
      <HalveTwiceSvg />
      <P>A 4 az 2 + 2. Ezért a negyed a fele fele. Felezd meg, aztán a felét még egyszer!</P>
      <P>36 : 4 → 36 fele 18 → 18 fele <strong>9</strong>.</P>
    </TheorySection>

    <TheorySection title="7. Maradékos osztás 4-gyel" badge="Marad valami" badgeColor="orange">
      <RemainderGroupsSvg />
      <P>23 korongot karikázunk be négyesével. 5 csoport lesz, és 3 korong kimarad.</P>
      <P>A kimaradt korongok száma a <strong>maradék</strong>.</P>
      <TheoryTable
        headers={['Ennyi volt', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['13', '3', '1', '3 · 4 + 1 = 13'],
          ['18', '4', '2', '4 · 4 + 2 = 18'],
          ['27', '6', '3', '6 · 4 + 3 = 27'],
          ['32', '8', '0', '8 · 4 = 32']
        ]}
      />
      <RoundUpCagesSvg />
      <TheoryCallout type="tip" title="Hány kalitka kell?">
        11 papagáj van, egy kalitkába 4 fér. 2 kalitka tele lesz, 3 papagáj marad. Nekik is kell egy kalitka: <strong>3 kalitka kell</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szorzás segít" badge="32 : 4" badgeColor="violet">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám · 4 = 32?</li>
            <li>8 · 4 = <strong>32</strong>.</li>
            <li>Tehát 32 : 4 = <strong>8</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szétosztás" badge="4 gyerek" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>4 gyerek 24 cseresznyén osztozik.</li>
            <li>24 : 4 = <strong>6</strong>.</li>
            <li>Mindenki 6 cseresznyét kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradékkal" badge="30 ceruza" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>30 ceruzát gumizunk össze négyesével.</li>
            <li>7 · 4 = 28, a 8 · 4 = 32 már túl sok.</li>
            <li><strong>7 csomag</strong> lesz, és <strong>2 ceruza</strong> marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék kevesebb, mint 4!"
        wrong="22 korong: 4 csoport, maradt 6"
        wrongExplanation="6 korongból még egy négyes csoport kijön!"
        correct="22 korong: 5 csoport, maradt 2"
        correctExplanation="5 · 4 = 20, és 20 + 2 = 22."
        tip="Ha a maradék 4 vagy több, rakj ki még egy csoportot!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze!">
        Az osztásnál nem vonunk ki 4-et: <strong>20 : 4 = 5</strong>, és nem 16!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Szétosztás 4 tányérra" badge="Interaktív labor" badgeColor="violet">
      <ShareLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Maradékos osztás 4-gyel" badge="Interaktív labor" badgeColor="orange">
      <RemainderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div4G2Theory;
