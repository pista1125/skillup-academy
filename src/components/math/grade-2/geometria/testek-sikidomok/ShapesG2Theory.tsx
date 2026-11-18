import React from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SolidVsFlatSvg, SolidsGallerySvg, FacesPrintSvg, FlatShapesSvg, SideCornerSvg, CubeBuildSvg } from './ShapesG2Figures';
import { CubeBuilderLab, ImprintLab } from './ShapesG2Parts';

export const ShapesG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-geometry"
    subtopicId="testek-sikidomok"
    grade={2}
    chapterId="geometria"
    title="2. Testek, síkidomok"
    subtitle="Kocka, téglatest, gömb, henger, kúp, gúla; háromszög, négyzet, téglalap, kör; lapok, oldalak, csúcsok és építés kockákból."
    badge="2. OSZTÁLY • VII. GEOMETRIA • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_testek_sikidomok_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — TEST VAGY SÍKIDOM?',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-200">
            labda = gömb (test) &nbsp;•&nbsp; rajzolt karika = kör (síkidom)
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>A <strong>testet</strong> megfoghatod, körbejárhatod.</li>
            <li>A <strong>síkidom</strong> lapos, mint egy rajz.</li>
            <li>A test lapját körberajzolva <strong>síkidomot</strong> kapsz.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Geometria" badgeColor="emerald">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Megismered a <strong>testeket</strong> és a <strong>síkidomokat</strong>.</p>
        <p>Megszámolod a lapokat, az oldalakat és a csúcsokat.</p>
        <p>Végül kockákból építesz!</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Test vagy síkidom?" badge="Két csoport" badgeColor="orange">
      <SolidVsFlatSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Test" badge="megfogható" badgeColor="orange">
          <p className="text-sm text-slate-700 dark:text-slate-300">Kézbe veheted: doboz, labda, konzervdoboz. Van eleje, hátulja, teteje.</p>
        </TheoryCard>
        <TheoryCard title="Síkidom" badge="lapos" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">Lapos, mint a füzetbe rajzolt alakzat vagy a kivágott papír.</p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. A testek neve" badge="6 test" badgeColor="amber">
      <SolidsGallerySvg />
      <TheoryTable
        headers={['Test', 'Mire hasonlít?', 'Gurul?', 'Lapjai']}
        rows={[
          ['kocka', 'dobókocka', 'nem', '6 négyzet'],
          ['téglatest', 'gyufásdoboz, tégla', 'nem', '6 lap, téglalapok'],
          ['gömb', 'labda, narancs', 'igen, bárhogy', 'nincs lapja'],
          ['henger', 'konzervdoboz', 'igen, az oldalán', '2 kör'],
          ['kúp', 'tölcsér, csákó', 'igen, körben', '1 kör, van csúcsa'],
          ['gúla', 'piramis', 'nem', 'alul négyzet, oldalt háromszögek']
        ]}
      />
      <TheoryCallout type="info" title="Szaggatott vonal">
        A rajzon a <strong>szaggatott</strong> vonal a test hátsó, nem látható élét mutatja.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Rajzold körbe a lapját!" badge="Lenyomat" badgeColor="sky">
      <FacesPrintSvg />
      <TheoryCallout type="tip" title="Mit kapsz?">
        Tedd a testet a papírra, és rajzold körbe! A kockából <strong>négyzet</strong>, a hengerből és a kúpból <strong>kör</strong>, a gúlából <strong>négyzet</strong> vagy <strong>háromszög</strong> lesz. A gömböt nem tudod körberajzolni, mert nincs lapja.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Síkidomok" badge="Oldal és csúcs" badgeColor="blue">
      <FlatShapesSvg />
      <SideCornerSvg />
      <TheoryTable
        headers={['Síkidom', 'Oldal', 'Csúcs']}
        rows={[
          ['háromszög', '3', '3'],
          ['négyzet', '4 egyforma', '4'],
          ['téglalap', '4 (2 hosszú, 2 rövid)', '4'],
          ['ötszög', '5', '5'],
          ['hatszög', '6', '6'],
          ['kör', 'nincs, görbe vonal határolja', 'nincs']
        ]}
      />
      <TheoryCallout type="info" title="Pálcikákból">
        Minden pálcika egy <strong>oldal</strong>. Ahol két pálcika összeér, ott egy <strong>csúcs</strong> van.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Építés kockákból" badge="Számolj!" badgeColor="purple">
      <CubeBuildSvg />
      <TheoryCallout type="tip" title="Oszloponként számolj!">
        Számold meg az oszlopokat egyenként, alulról fölfelé. Ha a kockák <strong>egymás mögött</strong> is vannak, a hátsókat is számold!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Melyik test?" badge="találós" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Gurul.</li>
            <li>2 kör alakú lapja van.</li>
            <li>Ez a <strong>henger</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hány oldal?" badge="pálcikák" badgeColor="blue">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Zsófi 5 pálcikából zárt alakzatot rakott.</li>
            <li>5 pálcika = 5 oldal.</li>
            <li>Ez egy <strong>ötszög</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hány kocka?" badge="2, 3, 1" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>1. oszlop: 2 kocka.</li>
            <li>2. oszlop: 3 kocka, 3. oszlop: 1 kocka.</li>
            <li>2 + 3 + 1 = <strong>6</strong> kocka.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Hány lapja van a kockának?"
        wrong="A kockának 3 lapja van, mert ennyit látok."
        wrongExplanation="A rajzon csak 3 lapot látsz. A többi hátul és alul van."
        correct="A kockának 6 lapja van."
        correctExplanation="Elöl, hátul, fent, lent, jobbra és balra is van egy-egy lap."
        tip="Fogj meg egy dobókockát, és számold meg a lapjait! 1-től 6-ig minden lapon más szám van."
      />
      <TheoryCallout type="warning" title="Kör vagy gömb?">
        A <strong>kör</strong> lapos síkidom. A <strong>gömb</strong> test, például a labda. A négyzet is különleges téglalap: minden oldala egyforma.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Kockaépítő" badge="Interaktív labor" badgeColor="emerald">
      <CubeBuilderLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Lenyomat-nyomozó" badge="Interaktív labor" badgeColor="amber">
      <ImprintLab />
    </TheorySection>
  </TheoryTemplate>
);

export default ShapesG2Theory;
