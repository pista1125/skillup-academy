import React from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  PositionSceneSvg,
  QueueSvg,
  GridWalkSvg,
  TableCodesSvg,
  LinesSvg,
  OpenClosedSvg,
  LogicSetSvg,
  LogicChainSvg
} from './GeoIntroG2Figures';
import { RobotWalkLab, LogicChainLab } from './GeoIntroG2Parts';

export const GeoIntroG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-geometry"
    subtopicId="bevezeto"
    grade={2}
    chapterId="geometria"
    title="1. Tájékozódás, vonalak, logikai lapok"
    subtitle="Merre van? Lépések a négyzetrácson, egyenes, görbe és törött vonal, nyitott és zárt vonal, játékok logikai lapokkal."
    badge="2. OSZTÁLY • VII. GEOMETRIA • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_tajekozodas_vonalak_logikai_lapok_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — MERRE MEGYEK?',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center text-2xl font-black text-blue-900 dark:text-blue-200 tracking-widest">
            ↑ föl &nbsp; ↓ le &nbsp; → jobbra &nbsp; ← balra
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>1 nyíl = 1 lépés</strong> a szomszéd mezőre.</li>
            <li>Vonal lehet <strong>egyenes</strong>, <strong>görbe</strong> vagy <strong>törött</strong>.</li>
            <li>A logikai lapnak 4 tulajdonsága van: <strong>forma, szín, méret, lyuk</strong>.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Geometria" badgeColor="blue">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Megtanulod megmondani, <strong>hol van</strong> valami.</p>
        <p>Robotot vezetsz a <strong>négyzetrácson</strong> nyilakkal.</p>
        <p>Megnézzük a <strong>vonalakat</strong>, és játszunk a <strong>logikai lapokkal</strong>.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Merre van?" badge="Tájékozódás" badgeColor="sky">
      <PositionSceneSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Fent és lent" badge="fölött, alatt" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A csillag <strong>fent</strong> van. Az autó <strong>lent</strong> van. A csillag az autó <strong>fölött</strong> van, az autó a csillag <strong>alatt</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="Jobbra és balra" badge="között" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A labdától <strong>jobbra</strong> van a csillag. A csillag a labda és az alma <strong>között</strong> van.
          </p>
        </TheoryCard>
      </div>
      <QueueSvg />
      <TheoryCallout type="info" title="Előtte és mögötte">
        A gyerekek az ajtó felé mennek. Lili <strong>előtt</strong> Máté áll. Lili <strong>mögött</strong> Ádám áll. Lili Ádám és Máté <strong>között</strong> van.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Lépések a négyzetrácson" badge="Nyilak" badgeColor="indigo">
      <GridWalkSvg />
      <TheoryTable
        headers={['Nyíl', 'Merre lépsz?']}
        rows={[
          ['→', 'egyet jobbra'],
          ['←', 'egyet balra'],
          ['↑', 'egyet föl'],
          ['↓', 'egyet le']
        ]}
      />
      <TableCodesSvg />
      <TheoryCallout type="tip" title="A mező kódja">
        Előbb a <strong>betű</strong> (fölül, az oszlop), aztán a <strong>szám</strong> (oldalt, a sor). Az alma a <strong>C2</strong> mezőben van.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Vonalak" badge="Egyenes, görbe, törött" badgeColor="emerald">
      <LinesSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="Egyenes vonal" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">Nem hajlik el. Vonalzóval húzzuk.</p>
        </TheoryCard>
        <TheoryCard title="Görbe vonal" badgeColor="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300">Hajlik, mint a kígyó vagy a szivárvány.</p>
        </TheoryCard>
        <TheoryCard title="Törött vonal" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">Egyenes darabokból áll, mint a villám.</p>
        </TheoryCard>
      </div>
      <OpenClosedSvg />
      <TheoryCallout type="info" title="Nyitott vagy zárt?">
        A <strong>nyitott</strong> vonalnak van két vége. A <strong>zárt</strong> vonal körbeér, nincs vége. A zárt vonal egy síkidomot fog közre.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Logikai lapok" badge="4 tulajdonság" badgeColor="purple">
      <LogicSetSvg />
      <TheoryTable
        headers={['Tulajdonság', 'Lehet']}
        rows={[
          ['forma', 'kör, háromszög, négyzet, téglalap'],
          ['szín', 'piros, sárga, kék, zöld'],
          ['méret', 'nagy, kicsi'],
          ['lyuk', 'sima (teli), lyukas']
        ]}
      />
      <LogicChainSvg />
      <TheoryCallout type="tip" title="Lánc játék">
        A szomszéd lapok csak <strong>egy</strong> dologban térnek el. Nézd meg: előbb a szín változik, aztán a lyuk, aztán a forma, végül a méret.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Robot útja" badge="→ → ↓ ←" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tedd az ujjad a robotra!</li>
            <li>Lépj 2-t jobbra, 1-et le.</li>
            <li>Végül 1-et balra.</li>
            <li>Összesen 1 lépéssel vagy jobbra és 1-gyel lejjebb.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Kitalálós" badge="Melyik lap?" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Kicsi. Sárga. Lyukas.</li>
            <li>Nem kör, nem négyzet.</li>
            <li>Nem háromszög.</li>
            <li>Ez a <strong>kicsi, sárga, lyukas téglalap</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Milyen a határa?" badge="félkör" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>A félkör alja egyenes vonal.</li>
            <li>A teteje görbe vonal.</li>
            <li>Együtt zárt vonalat adnak.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Szemben ülő társ jobb keze"
        wrong="Bence szemben ül velem. Az ő jobb keze az én jobbom felé van."
        wrongExplanation="Ha szemben ültök, minden fordítva van!"
        correct="Az ő jobb keze az én bal kezem felé van."
        correctExplanation="Fordulj meg, és nézz ugyanarra, amerre ő! Akkor egyezik a jobbotok."
        tip="Ha nem vagy biztos, állj a társad mellé, és nézz ugyanarra!"
      />
      <TheoryCallout type="warning" title="Számold a nyilakat!">
        A <strong>→ → →</strong> három lépés, nem egy! Minden nyílnál lépj egy mezőt.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Hova ér a robot?" badge="Interaktív labor" badgeColor="blue">
      <RobotWalkLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Logikai lánc" badge="Interaktív labor" badgeColor="violet">
      <LogicChainLab />
    </TheorySection>
  </TheoryTemplate>
);

export default GeoIntroG2Theory;
