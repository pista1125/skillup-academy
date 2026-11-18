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
  TraysGroupingSvg,
  SharingNineSvg,
  TensPlusOneSvg,
  NumberFamilySvg,
  RemainderRowsSvg,
  RoundUpBoatsSvg
} from './Div9G2Figures';
import { JumpLab, RemainderLab } from './Div9G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div9G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-9-cel"
    grade={2}
    chapterId="osztas"
    title="8. Osztás 9-cel"
    subtitle="Kilencesével csoportosítunk, 9 részre osztunk, megtanuljuk a 9-es bennfoglaló táblát és a maradékos osztást 9-cel."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="orange"
    pdfFilename="2_osztaly_osztas_9_cel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 9-CEL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base sm:text-lg font-black text-orange-900 dark:text-orange-200">
            63 : 9 = 7, mert 7 · 9 = 63
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>A szorzás segít: keresd meg a 9-es táblában!</li>
            <li><strong>Trükk:</strong> a tízesek száma + 1. 54 : 9 → 5 + 1 = 6.</li>
            <li><strong>Maradék:</strong> mindig kevesebb, mint 9.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 9-cel" badgeColor="orange">
      <div className="space-y-2">
        <P>A 9-es szorzótáblát már tudod.</P>
        <P>Most visszafelé számolunk: <strong>osztunk 9-cel</strong>.</P>
        <P>A végén azt is megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány kilences van benne?" badge="Csoportosítás" badgeColor="emerald">
      <TraysGroupingSvg />
      <P>36 muffin van. Egy tálcára 9 fér. Hány tálca kell?</P>
      <P>Rakd őket kilencesével: 4 tálca lett. <strong>36 : 9 = 4</strong>.</P>
    </TheorySection>

    <TheorySection title="3. Osszuk szét 9 részre!" badge="Szétosztás" badgeColor="rose">
      <SharingNineSvg />
      <P>18 epret 9 tányérra teszünk, mindegyikre ugyanannyit.</P>
      <P>Minden tányér kap egyet, aztán még egyet. Egy tányérra 2 jut. <strong>18 : 9 = 2</strong>.</P>
      <TheoryCallout type="info" title="Mindkettő osztás">
        Kilencesével csoportosítunk, vagy 9 részre osztunk szét: mindkettőt így írjuk: <strong>18 : 9</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 9-es bennfoglaló tábla" badge="Szorzás segít" badgeColor="orange">
      <TheoryTable
        headers={['Osztás', 'Mert…']}
        rows={[
          ['0 : 9 = 0', '0 · 9 = 0'],
          ['9 : 9 = 1', '1 · 9 = 9'],
          ['18 : 9 = 2', '2 · 9 = 18'],
          ['27 : 9 = 3', '3 · 9 = 27'],
          ['36 : 9 = 4', '4 · 9 = 36'],
          ['45 : 9 = 5', '5 · 9 = 45'],
          ['54 : 9 = 6', '6 · 9 = 54'],
          ['63 : 9 = 7', '7 · 9 = 63'],
          ['72 : 9 = 8', '8 · 9 = 72'],
          ['81 : 9 = 9', '9 · 9 = 81'],
          ['90 : 9 = 10', '10 · 9 = 90']
        ]}
      />
    </TheorySection>

    <TheorySection title="5. Trükk: tízesek + 1" badge="Gyors fejszámolás" badgeColor="sky">
      <TensPlusOneSvg />
      <P>Nézd meg, hány tízes van a számban! Adj hozzá 1-et. Ennyi a hányados.</P>
      <P>81 : 9 → 8 tízes → 8 + 1 = <strong>9</strong>. Próba: 9 · 9 = 81.</P>
      <TheoryCallout type="warning" title="Csak a 9-es tábla számainál!">
        A trükk csak akkor jó, ha a szám benne van a 9-es táblában: 9, 18, 27 … 90.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Egy kép, két osztás" badge="Rokon táblák" badgeColor="purple">
      <NumberFamilySvg />
      <P>A 36 korong 4 sorban áll, soronként 9. Ezért <strong>36 : 9 = 4</strong> és <strong>36 : 4 = 9</strong>.</P>
      <TheoryTable
        headers={['Szám', 'Szorzás', 'Osztások']}
        rows={[
          ['18', '2 · 9 = 18', '18 : 9 = 2, 18 : 2 = 9'],
          ['27', '3 · 9 = 27', '27 : 9 = 3, 27 : 3 = 9'],
          ['54', '6 · 9 = 54', '54 : 9 = 6, 54 : 6 = 9']
        ]}
      />
      <TheoryCallout type="info" title="Kilencszer annyi — visszafelé">
        Bori kártyái kilencszer annyian vannak, mint Lilláé. Borinak 27 van. Lillának 27 : 9 = <strong>3</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Maradékos osztás 9-cel" badge="Marad valami" badgeColor="orange">
      <RemainderRowsSvg />
      <P>48 korongot karikázunk be kilencesével. 5 csoport lesz, és 3 korong kimarad.</P>
      <P>A kimaradt korongok száma a <strong>maradék</strong>.</P>
      <TheoryTable
        headers={['Ennyi volt', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['20', '2', '2', '2 · 9 + 2 = 20'],
          ['37', '4', '1', '4 · 9 + 1 = 37'],
          ['48', '5', '3', '5 · 9 + 3 = 48'],
          ['71', '7', '8', '7 · 9 + 8 = 71'],
          ['63', '7', '0', '7 · 9 = 63']
        ]}
      />
      <RoundUpBoatsSvg />
      <TheoryCallout type="tip" title="Hány csónak kell?">
        30 gyerek csónakázik, egy csónakba 9 ül. 3 csónak tele lesz, 3 gyerek marad. Nekik is kell egy csónak: <strong>4 csónak kell</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szorzás segít" badge="72 : 9" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám · 9 = 72?</li>
            <li>8 · 9 = <strong>72</strong>.</li>
            <li>Tehát 72 : 9 = <strong>8</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szétosztás" badge="9 gyerek" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>9 gyerek 45 szem cseresznyén osztozik.</li>
            <li>45 : 9 = <strong>5</strong>.</li>
            <li>Mindenki 5 cseresznyét kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradékkal" badge="58 kártya" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>58 kártyát rakunk 9-es csomagokba.</li>
            <li>6 · 9 = 54, a 7 · 9 = 63 már túl sok.</li>
            <li><strong>6 csomag</strong> lesz, és <strong>4 kártya</strong> marad. 6 · 9 + 4 = 58.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék kevesebb, mint 9!"
        wrong="50 korong: 4 csoport, maradt 14"
        wrongExplanation="14 korongból még egy kilences csoport kijön!"
        correct="50 korong: 5 csoport, maradt 5"
        correctExplanation="5 · 9 = 45, és 45 + 5 = 50."
        tip="Ha a maradék 9 vagy több, rakj ki még egy csoportot!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze!">
        Az osztásnál nem vonunk ki 9-et: <strong>54 : 9 = 6</strong>, és nem 45!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Ugorj kilencesével!" badge="Interaktív labor" badgeColor="orange">
      <JumpLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Maradékos osztás 9-cel" badge="Interaktív labor" badgeColor="sky">
      <RemainderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div9G2Theory;
