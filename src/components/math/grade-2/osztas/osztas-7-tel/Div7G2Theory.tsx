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
  GroupingSevensSvg,
  SharingPlatesSvg,
  WeeksDaysSvg,
  SeventhArrowsSvg,
  RemainderGroupsSvg,
  RoundUpBoatsSvg
} from './Div7G2Figures';
import { ShareLab, RemainderLab } from './Div7G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div7G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-7-tel"
    grade={2}
    chapterId="osztas"
    title="6. Osztás 7-tel"
    subtitle="Hetesével csoportosítunk, 7 részre osztunk, napokból heteket számolunk, és megtanuljuk a maradékos osztást 7-tel."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="cyan"
    pdfFilename="2_osztaly_osztas_7_tel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 7-TEL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80 text-center font-mono text-base sm:text-lg font-black text-cyan-900 dark:text-cyan-200">
            42 : 7 = 6, mert 6 · 7 = 42
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>A szorzás segít: keresd meg a 7-es táblában!</li>
            <li><strong>Hetede:</strong> 7 egyenlő részre osztjuk.</li>
            <li><strong>Maradék:</strong> mindig kevesebb, mint 7.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 7-tel" badgeColor="cyan">
      <div className="space-y-2">
        <P>A 7-es szorzótáblát már tudod.</P>
        <P>Most visszafelé számolunk: <strong>osztunk 7-tel</strong>.</P>
        <P>A végén azt is megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány hetes van benne?" badge="Csoportosítás" badgeColor="emerald">
      <GroupingSevensSvg />
      <P>21 tulipán van. Egy csokorba 7 kell. Hány csokor lesz?</P>
      <P>Rakd őket hetesével: 3 csokor lett. <strong>21 : 7 = 3</strong>.</P>
    </TheorySection>

    <TheorySection title="3. Osszuk szét 7 részre!" badge="Szétosztás" badgeColor="rose">
      <SharingPlatesSvg />
      <P>14 epret 7 tányérra teszünk, mindegyikre ugyanannyit.</P>
      <P>Minden tányér kap egyet, aztán még egyet. Egy tányérra 2 jut. <strong>14 : 7 = 2</strong>.</P>
      <TheoryCallout type="info" title="Mindkettő osztás">
        Hetesével csoportosítunk, vagy 7 részre osztunk szét. Mindkettőt így írjuk: <strong>14 : 7</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Hány hét?" badge="Napok és hetek" badgeColor="sky">
      <WeeksDaysSvg />
      <P>Egy hét 7 nap. A naptár egy sora egy hét.</P>
      <P>28 nap 4 sor. <strong>28 : 7 = 4</strong>, tehát 28 nap 4 hét.</P>
    </TheorySection>

    <TheorySection title="5. A 7-es bennfoglaló tábla" badge="Szorzás segít" badgeColor="cyan">
      <TheoryTable
        headers={['Osztás', 'Mert…']}
        rows={[
          ['0 : 7 = 0', '0 · 7 = 0'],
          ['7 : 7 = 1', '1 · 7 = 7'],
          ['14 : 7 = 2', '2 · 7 = 14'],
          ['21 : 7 = 3', '3 · 7 = 21'],
          ['28 : 7 = 4', '4 · 7 = 28'],
          ['35 : 7 = 5', '5 · 7 = 35'],
          ['42 : 7 = 6', '6 · 7 = 42'],
          ['49 : 7 = 7', '7 · 7 = 49'],
          ['56 : 7 = 8', '8 · 7 = 56'],
          ['63 : 7 = 9', '9 · 7 = 63'],
          ['70 : 7 = 10', '10 · 7 = 70']
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Hétszerese és hetede" badge="Oda-vissza" badgeColor="orange">
      <SeventhArrowsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hétszerese" badge="· 7" badgeColor="emerald">
          <P>A 6 hétszerese: 6 · 7 = <strong>42</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Hetede" badge=": 7" badgeColor="rose">
          <P>A 42 hetede: 42 : 7 = <strong>6</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Maradékos osztás 7-tel" badge="Marad valami" badgeColor="orange">
      <RemainderGroupsSvg />
      <P>25 korongot karikázunk be hetesével. 3 csoport lesz, és 4 korong kimarad.</P>
      <P>A kimaradt korongok száma a <strong>maradék</strong>. A maradék mindig <strong>kevesebb, mint 7</strong>.</P>
      <TheoryTable
        headers={['Ennyi volt', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['10', '1', '3', '1 · 7 + 3 = 10'],
          ['19', '2', '5', '2 · 7 + 5 = 19'],
          ['30', '4', '2', '4 · 7 + 2 = 30'],
          ['48', '6', '6', '6 · 7 + 6 = 48'],
          ['56', '8', '0', '8 · 7 = 56']
        ]}
      />
      <RoundUpBoatsSvg />
      <TheoryCallout type="tip" title="Hány csónak kell?">
        30 gyerek csónakázik, egy csónakba 7 fér. 4 csónak tele lesz, 2 gyerek marad. Nekik is kell egy csónak: <strong>5 csónak kell</strong>.
      </TheoryCallout>
      <TheoryCallout type="info" title="A hét napjai körbe járnak">
        Ma szerda van. 7 nap múlva megint szerda lesz. 9 nap múlva? 9 nap = 1 hét és 2 nap, tehát <strong>péntek</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Bogarak, rovarok" badge="Szöveges feladatok" badgeColor="rose">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hány katica?" badge="42 : 7" badgeColor="rose">
          <P>A levélen összesen 42 petty látszik. Minden katicának 7 pettye van.</P>
          <P>42 : 7 = <strong>6</strong> katica ül a levélen.</P>
        </TheoryCard>
        <TheoryCard title="Hetedannyi" badge="63 : 7" badgeColor="amber">
          <P>A bokron 63 hangya van. Ez 7-szer annyi, mint a csigák száma.</P>
          <P>63 : 7 = <strong>9</strong> csiga van.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szorzás segít" badge="56 : 7" badgeColor="cyan">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám · 7 = 56?</li>
            <li>8 · 7 = <strong>56</strong>.</li>
            <li>Tehát 56 : 7 = <strong>8</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szétosztás" badge="7 gyerek" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>7 gyerek 35 matricán osztozik.</li>
            <li>35 : 7 = <strong>5</strong>.</li>
            <li>Mindenki 5 matricát kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradékkal" badge="40 ceruza" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>40 ceruzát kötünk össze hetesével.</li>
            <li>5 · 7 = 35, a 6 · 7 = 42 már túl sok.</li>
            <li><strong>5 köteg</strong> lesz, és <strong>5 ceruza</strong> marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék kevesebb, mint 7!"
        wrong="31 korong: 3 csoport, maradt 10"
        wrongExplanation="10 korongból még egy hetes csoport kijön!"
        correct="31 korong: 4 csoport, maradt 3"
        correctExplanation="4 · 7 = 28, és 28 + 3 = 31."
        tip="Ha a maradék 7 vagy több, rakj ki még egy csoportot!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze!">
        Az osztásnál nem vonunk ki 7-et: <strong>21 : 7 = 3</strong>, és nem 14!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="11. Labor I: Szétosztás 7 tányérra" badge="Interaktív labor" badgeColor="cyan">
      <ShareLab />
    </TheorySection>

    <TheorySection title="12. Labor II: Maradékos osztás 7-tel" badge="Interaktív labor" badgeColor="orange">
      <RemainderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div7G2Theory;
