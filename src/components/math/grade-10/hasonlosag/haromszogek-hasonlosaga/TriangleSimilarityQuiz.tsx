import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TriangleSimilarityMatcher } from './TriangleSimilarityMatcher';
import { TriangleSimilaritySorter } from './TriangleSimilaritySorter';

const TRIANGLE_SIMILARITY_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A 4 alapeset és alaptételek (1-10)
  {
    id: 'ts-q1',
    level: 1,
    question: 'Hány alapesetet különböztetünk meg a háromszögek hasonlóságára?',
    options: [
      '4 alapesetet (I. sz-sz, II. o-sz-o, III. o-o-o, IV. o-o-sz)',
      '2 alapesetet (szögek és oldalak)',
      '3 alapesetet (csak oldalak alapján)',
      '6 alapesetet'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögek hasonlóságának pontosan 4 szükséges és elégséges alapesete létezik, amelyek minimális feltételeket adnak a hasonlóság megállapításához.'
  },
  {
    id: 'ts-q2',
    level: 1,
    question: 'Mit mond ki a háromszögek hasonlóságának I. alapesete (sz-sz)?',
    options: [
      'Ha két háromszögben két-két szög egyenlő nagyságú, akkor a két háromszög hasonló',
      'Ha a háromszög minden oldala egyenlő, akkor hasonlóak',
      'Ha a szögek összege 180°, akkor minden háromszög hasonló egymáshoz',
      'Ha egy szög és egy oldal megegyezik, akkor a háromszögek hasonlók'
    ],
    correctAnswer: 0,
    explanation: 'I. alapeset (sz-sz): ha két háromszögben két-két szög nagysága páronként egyenlő, a háromszögek hasonlók.'
  },
  {
    id: 'ts-q3',
    level: 1,
    question: 'Miért elegendő csupán KÉT szög egyenlőségét ellenőrizni az I. alapesetben a harmadik helyett?',
    options: [
      'Mert a háromszög belső szögeinek összege mindig 180°, így a 3. szög automatikusan γ = 180° - (α + β)',
      'Mert a harmadik szög soha nem számít a hasonlóságban',
      'Mert a geometriában csak két dimenziót vizsgálunk',
      'Mert a harmadik szög mindig derékszög'
    ],
    correctAnswer: 0,
    explanation: 'Mivel α + β + γ = 180°, ha két szög megegyezik, a harmadik szög szükségszerűen azonos lesz mindkét háromszögben.'
  },
  {
    id: 'ts-q4',
    level: 1,
    question: 'Mit mond ki a II. alapeset (o-sz-o)?',
    options: [
      'Két-két oldal hosszának aránya és az általuk közbezárt szög nagysága megegyezik',
      'Két oldal összege és a közbezárt szög egyenlő',
      'Két szög aránya és a közrezárt oldal hossza egyezik meg',
      'Minden oldal kétszer akkora és a szögek feleződnek'
    ],
    correctAnswer: 0,
    explanation: 'II. alapeset (o-sz-o): ha a₁/a₂ = b₁/b₂ és a közbezárt szögek γ₁ = γ₂, akkor a két háromszög hasonló.'
  },
  {
    id: 'ts-q5',
    level: 1,
    question: 'Mit mond ki a III. alapeset (o-o-o)?',
    options: [
      'Mindhárom oldal hosszának aránya páronként egyenlő (a₁/a₂ = b₁/b₂ = c₁/c₂ = λ)',
      'Mindhárom oldal összege pontosan megegyezik',
      'Mindhárom oldal hossza egész szám',
      'A leghosszabb oldal a másik kettő szorzata'
    ],
    correctAnswer: 0,
    explanation: 'III. alapeset (o-o-o): ha mindhárom oldalpár aránya azonos állandó (λ), a háromszögek hasonlóak.'
  },
  {
    id: 'ts-q6',
    level: 1,
    question: 'Mit mond ki a IV. alapeset (o-o-sz)?',
    options: [
      'Két-két oldal hosszának aránya és a NAGYOBBIKKAL szemben fekvő szög nagysága egyenlő',
      'Két oldal aránya és a kisebbikkel szemközti szög egyenlő',
      'Bármely két oldal és bármely szög egyenlősége elegendő',
      'Két oldal különbsége és a legnagyobb szög egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'IV. alapeset (o-o-sz): a két oldal aránya mellett a szögnek a nagyobbik oldallal kell szemben feküdnie az egyértelműséghez.'
  },
  {
    id: 'ts-q7',
    level: 1,
    question: 'Miért NEM alapeset, ha a szög a KISEBBIK megadott oldallal szemben fekszik?',
    options: [
      'Mert ekkor két különböző alakú (egy hegyesszögű és egy tompaszögű) háromszög is megszerkeszthető az adatokkal',
      'Mert a kisebbik oldallal szemben nem lehet szög',
      'Mert Pitagorasz tétele ezt tiltja',
      'Mert a körzővel nem lehet kört rajzolni'
    ],
    correctAnswer: 0,
    explanation: 'Ha a szög a kisebbik oldallal szemben fekszik, a körív két pontban is metszi a szögszárat, így nem egyértelmű az alakzat, nem garantált a hasonlóság!'
  },
  {
    id: 'ts-q8',
    level: 1,
    question: 'Két derékszögű háromszögben az egyik hegyesszög mindkettőben 38°. Hasonlók-e a háromszögek?',
    options: [
      'Igen, az I. alapeset (sz-sz) miatt, hiszen a 90°-os derékszög és a 38°-os szög páronként egyenlő',
      'Nem, mert az oldalak hosszát nem ismerjük',
      'Csak akkor, ha az átfogójuk hossza is megegyezik',
      'Nem, mert derékszögű háromszögekre nem érvényes a hasonlóság'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a 90° és a 38° két egyenlő szögpárt alkot, az I. alapeset (sz-sz) azonnal teljesül.'
  },
  {
    id: 'ts-q9',
    level: 1,
    question: 'Igaz-e, hogy bármely két szabályos (egyenlő oldalú) háromszög hasonló egymáshoz?',
    options: [
      'Igen, mivel minden szabályos háromszög minden belső szöge pontosan 60° (I. alapeset)',
      'Nem, csak ha az oldaluk azonos hosszúságú',
      'Csak akkor, ha azonos a területük',
      'Csak a páros oldalhosszúságú szabályos háromszögekre igaz'
    ],
    correctAnswer: 0,
    explanation: 'Minden szabályos háromszög szögei 60°, 60°, 60°, így szögeik egyenlősége miatt bármely kettő hasonló (I. alapeset).'
  },
  {
    id: 'ts-q10',
    level: 1,
    question: 'Egyik háromszög oldalai 4, 6, 8 cm; a másiké 6, 9, 12 cm. Melyik alapeset alapján hasonlók?',
    options: [
      'A III. alapeset (o-o-o) alapján, mert 6/4 = 9/6 = 12/8 = 1,5 (állandó az arány)',
      'Az I. alapeset alapján, mert a szögek ismertek',
      'Nem hasonlók egymáshoz',
      'A IV. alapeset alapján, mert 12 a legnagyobb oldal'
    ],
    correctAnswer: 0,
    explanation: 'Mindhárom oldalpár aránya: 6/4 = 1,5; 9/6 = 1,5; 12/8 = 1,5. A III. alapeset (o-o-o) teljesül, λ = 1,5.'
  },

  // LEVEL 2: Számítások, matrózok mérése, épületmodell (11-20)
  {
    id: 'ts-q11',
    level: 2,
    question: 'A zátonyra futott hajó helyzetét meghatározó 3 matróz mért α szögei: 72°, 73° és 77°. Mennyi az átlaguk?',
    options: [
      '74° (mert (72 + 73 + 77) / 3 = 222 / 3 = 74°)',
      '73°',
      '75°',
      '72,5°'
    ],
    correctAnswer: 0,
    explanation: 'A három mért szög számtani közepe: (72 + 73 + 77) / 3 = 222 / 3 = 74°.'
  },
  {
    id: 'ts-q12',
    level: 2,
    question: 'A 3 matróz által mért β szögek: 53°, 51° és 52°. Mennyi az átlaguk?',
    options: [
      '52° (mert (53 + 51 + 52) / 3 = 156 / 3 = 52°)',
      '51,5°',
      '53°',
      '50°'
    ],
    correctAnswer: 0,
    explanation: 'A mért β szögek számtani közepe: (53 + 51 + 52) / 3 = 156 / 3 = 52°.'
  },
  {
    id: 'ts-q13',
    level: 2,
    question: 'A matrózok a parton kitűzött 100 m-es szakaszt a rajzon 10 cm-nek tekintették. Mekkora a kicsinyítés méretaránya?',
    options: [
      '1 : 1000 (mivel 100 m = 10 000 cm, és 10 cm / 10 000 cm = 1 / 1000)',
      '1 : 100',
      '1 : 10',
      '1 : 10 000'
    ],
    correctAnswer: 0,
    explanation: '100 méter = 10 000 cm. A rajzon 10 cm felel meg 10 000 cm-nek, tehát λ = 10 / 10 000 = 1 / 1000.'
  },
  {
    id: 'ts-q14',
    level: 2,
    question: 'Ha a kicsinyített rajzon a hajó távolsága a parttól (merőleges magasság) 9,2 cm, mekkora a távolság a valóságban?',
    options: [
      '92 méter (9,2 cm · 1000 = 9200 cm = 92 m, gyakorlati mérésben 90–95 m)',
      '920 méter',
      '9,2 méter',
      '192 méter'
    ],
    correctAnswer: 0,
    explanation: 'A kicsinyítés 1 : 1000, így 9,2 cm a valóságban 9,2 · 1000 = 9200 cm = 92 méter.'
  },
  {
    id: 'ts-q15',
    level: 2,
    question: 'A 3 matróz egyedi mérési eredményei mekkora bizonytalanságot/eltérést adtak a hajó parttól mért távolságában?',
    options: [
      'Körülbelül 9,1 méteres eltérést a minimális és maximális érték között',
      'Pontosan 0 métert, a szögek nem számítanak',
      'Több mint 100 méteres eltérést',
      'Körülbelül 1 métert'
    ],
    correctAnswer: 0,
    explanation: 'Az egyedi szögmérések alapján számított távolságok közötti eltérés 9,1 m.'
  },
  {
    id: 'ts-q16',
    level: 2,
    question: 'Egy 280 méter magas felhőkarcolónak 1,4 méteres modelljét tesztelték szélcsatornában. Mekkora a méretarány?',
    options: [
      'λ = 280 / 1,4 = 200 (a valódi épület minden hossza 200-szorosa a modellének)',
      'λ = 140',
      'λ = 20',
      'λ = 400'
    ],
    correctAnswer: 0,
    explanation: 'A nagyítási arány: 280 m / 1,4 m = 200.'
  },
  {
    id: 'ts-q17',
    level: 2,
    question: 'Ha a szélcsatorna-tesztben a modell csúcsa 1 cm-t lengett ki, mennyi lenne a valódi épület kilengése ugyanilyen szélben?',
    options: [
      '200 cm = 2 méter (1 cm · 200 = 200 cm)',
      '100 cm = 1 méter',
      '20 cm',
      '20 méter'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a geometriai méretek és elmozdulások λ = 200 arányban skálázódnak: 1 cm · 200 = 200 cm = 2 méter.'
  },
  {
    id: 'ts-q18',
    level: 2,
    question: 'Egy ABCD téglalapban AB = CD = 8 cm és BC = 10 cm. P a CD oldal C-hez közelebbi negyedelőpontja. Mekkora a CP távolság?',
    options: [
      '2 cm (mivel 8 cm / 4 = 2 cm)',
      '4 cm',
      '2,5 cm',
      '1 cm'
    ],
    correctAnswer: 0,
    explanation: 'CD hossza 8 cm, negyede 8 / 4 = 2 cm, tehát a C-hez közelebbi negyedelőpont távolsága CP = 2 cm.'
  },
  {
    id: 'ts-q19',
    level: 2,
    question: 'Mekkora a PD távolság az előző téglalapban, ha CD = 8 cm és CP = 2 cm?',
    options: [
      '6 cm (8 cm - 2 cm = 6 cm)',
      '4 cm',
      '5 cm',
      '3 cm'
    ],
    correctAnswer: 0,
    explanation: 'A teljes oldal 8 cm, ebből CP = 2 cm levonásával PD = 8 - 2 = 6 cm (a háromnegyed rész).'
  },
  {
    id: 'ts-q20',
    level: 2,
    question: 'Két hasonló háromszög hasonlósági aránya λ = 2,5. Ha a kisebbik kerülete 16 cm, mekkora a nagyobbik kerülete?',
    options: [
      '40 cm (16 cm · 2,5 = 40 cm)',
      '32 cm',
      '50 cm',
      '100 cm'
    ],
    correctAnswer: 0,
    explanation: 'A kerületek aránya pontosan megegyezik a hasonlósági aránnyal: K₂ = K₁ · λ = 16 · 2,5 = 40 cm.'
  },

  // LEVEL 3: Homokóra, érettségi derékszögű trapéz, terület- és kerületszámítás (21-30)
  {
    id: 'ts-q21',
    level: 3,
    question: 'A téglalapban (AB = 8 cm, CP = 2 cm) az AC átló és a BP egyenes metszéspontja Q. Miért hasonló a ΔABQ és a ΔCPQ?',
    options: [
      'Mert AB || CD miatt a váltószögek egyenlők, és a Q-nál lévő csúcsszögek is egyenlők (I. alapeset: sz-sz)',
      'Mert mindkettő egyenlő szárú háromszög',
      'Mert a téglalap átlói mindig merőlegesek egymásra',
      'Nem hasonlók egymáshoz'
    ],
    correctAnswer: 0,
    explanation: 'A párhuzamos oldalak miatt váltószögek egyenlők, a Q csúcsnál lévő szögek csúcsszögek, így az I. alapeset (sz-sz) teljesül.'
  },
  {
    id: 'ts-q22',
    level: 3,
    question: 'Mekkora a ΔABQ és ΔCPQ háromszögek hasonlósági aránya, ha AB = 8 cm és CP = 2 cm?',
    options: [
      'λ = 8 / 2 = 4 (a szakaszok aránya 4 : 1)',
      'λ = 2',
      'λ = 10',
      'λ = 16'
    ],
    correctAnswer: 0,
    explanation: 'A megfelelő oldalak aránya: AB / CP = 8 cm / 2 cm = 4.'
  },
  {
    id: 'ts-q23',
    level: 3,
    question: 'A 4 : 1 arány alapján hogyan osztja a Q pont az AC átlót?',
    options: [
      'AQ : QC = 4 : 1, vagyis a QC szakasz a teljes AC átló 1/5 része (kb. 3,33 cm a megadott rajzon)',
      'AQ = QC (felezi az átlót)',
      'QC az átló negyede',
      'QC kétszer akkora, mint AQ'
    ],
    correctAnswer: 0,
    explanation: 'Mivel ΔABQ ~ ΔCPQ négyszeres aránnyal, az AC átló 4 + 1 = 5 egységre oszlik, amiből QC pontosan 1 egység (1/5 rész).'
  },
  {
    id: 'ts-q24',
    level: 3,
    question: 'Egy két derékszögű háromszögből álló trapézban AB = 9 cm, AC = 15 cm. Mekkora a BC befogó?',
    options: [
      '12 cm (Pitagorasz-tétellel: √(15² - 9²) = √(225 - 81) = √144 = 12 cm)',
      '10 cm',
      '14 cm',
      '8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A derékszögű ΔABC-ben Pitagorasz-tétellel: BC = √(AC² - AB²) = √(225 - 81) = √144 = 12 cm.'
  },
  {
    id: 'ts-q25',
    level: 3,
    question: 'Mivel a feltétel szerint ΔABC ~ ΔCAD, mekkora a hasonlóság aránya (λ), ha az átfogó AC = 15 cm felel meg az AB = 9 cm-nek?',
    options: [
      'λ = 15 / 9 = 5/3 (kb. 1,667)',
      'λ = 2',
      'λ = 4/3',
      'λ = 3/5'
    ],
    correctAnswer: 0,
    explanation: 'A hasonlóság aránya a megfelelő oldalak hányadosa: λ = 15 / 9 = 5/3.'
  },
  {
    id: 'ts-q26',
    level: 3,
    question: 'Mekkora a trapéz AD szára, ha a megfelelő BC oldal 12 cm és λ = 5/3?',
    options: [
      '20 cm (12 · 5/3 = 60 / 3 = 20 cm)',
      '16 cm',
      '18 cm',
      '24 cm'
    ],
    correctAnswer: 0,
    explanation: 'AD a ΔCAD-ban a BC megfelelője: AD = BC · λ = 12 · (5/3) = 20 cm.'
  },
  {
    id: 'ts-q27',
    level: 3,
    question: 'Mekkora a trapéz CD hosszabb alapja, ha AC = 15 cm és λ = 5/3?',
    options: [
      '25 cm (15 · 5/3 = 75 / 3 = 25 cm)',
      '22 cm',
      '30 cm',
      '20 cm'
    ],
    correctAnswer: 0,
    explanation: 'CD a ΔCAD átfogója, ami az AC átfogó megfelelője szorozva λ-val: CD = 15 · (5/3) = 25 cm.'
  },
  {
    id: 'ts-q28',
    level: 3,
    question: 'Mekkora az ABCD trapéz kerülete, ha oldalai AB = 9 cm, BC = 12 cm, CD = 25 cm és AD = 20 cm?',
    options: [
      '66 cm (9 + 12 + 25 + 20 = 66 cm)',
      '60 cm',
      '72 cm',
      '56 cm'
    ],
    correctAnswer: 0,
    explanation: 'A kerület az oldalak összege: K = 9 + 12 + 25 + 20 = 66 cm.'
  },
  {
    id: 'ts-q29',
    level: 3,
    question: 'Mekkora az ABCD derékszögű trapéz területe az alapok (9 és 25 cm) és a magasság (BC = 12 cm) segítségével?',
    options: [
      '204 cm² (T = (9 + 25) / 2 · 12 = 17 · 12 = 204 cm²)',
      '180 cm²',
      '216 cm²',
      '408 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz területe: T = (a + c)/2 · m = (9 + 25)/2 · 12 = 17 · 12 = 204 cm².'
  },
  {
    id: 'ts-q30',
    level: 3,
    question: 'Két hasonló háromszög területe 25 cm² és 100 cm². Mekkora a hasonlóság aránya (λ) és a kerületek aránya?',
    options: [
      'λ = 2 és a kerületek aránya is 2 (mivel a területek aránya λ² = 100 / 25 = 4, amiből λ = √4 = 2)',
      'λ = 4 és a kerületek aránya 4',
      'λ = 16',
      'λ = 0,5'
    ],
    correctAnswer: 0,
    explanation: 'A területek aránya a hasonlósági arány négyzete: T₂/T₁ = λ² = 4  ⇒  λ = 2. A kerületek aránya megegyezik λ-val, tehát szintén 2.'
  }
];

export const TriangleSimilarityQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="haromszogek-hasonlosaga"
      title="8. Háromszögek hasonlósága – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: alapesetek, terepi mérések és érettségi geometriai számítások."
      questions={TRIANGLE_SIMILARITY_QUESTIONS}
      cheatSheets={[
        {
          title: 'A 4 Hasonlósági Alapeset',
          content:
            '• I. alapeset (sz-sz): Két-két szög egyenlő nagyságú (a harmadik szög 180° - (α+β) miatt egyezik).\n• II. alapeset (o-sz-o): Két-két oldal hosszának aránya és a közbezárt szög egyenlő.\n• III. alapeset (o-o-o): Mindhárom oldal aránya páronként egyenlő: a₁/a₂ = b₁/b₂ = c₁/c₂ = λ.\n• IV. alapeset (o-o-sz): Két oldal aránya és a NAGYOBBIKKAL szemben fekvő szög egyenlő (a > b).\n⚠️ Csapda: A kisebbikkel szemközti szög nem garantálja a hasonlóságot!'
        },
        {
          title: 'Terepi Mérések és Modellek',
          content:
            '• Zátonyra futott hajó: 3 matróz mérései átlagolva: α = (72+73+77)/3 = 74°, β = (53+51+52)/3 = 52°.\n• Méretarány: 100 m parton = 10 cm rajzon ⇒ λ = 1 : 1000.\n• Távolság: a rajzon 9,2 cm ⇒ valóságban kb. 92 m (90–95 m). Mérési szórás: 9,1 m.\n• Felhőkarcoló modell: 280 m valódi magasság / 1,4 m modell ⇒ λ = 200.\n• Modell kilengés: 1 cm ⇒ Valódi épület kilengése: 1 cm · 200 = 200 cm = 2 méter!'
        },
        {
          title: 'Téglalap és Derékszögű Trapéz',
          content:
            '• ABCD téglalap (8 × 10 cm): P negyedelőpont (CP = 2 cm, PD = 6 cm). ΔABQ ~ ΔCPQ (váltószögek miatt sz-sz). λ = 8 / 2 = 4 ⇒ QC = AC / 5 ≈ 3,33 cm.\n• Derékszögű trapéz (HF 1): AB = 9 cm, AC = 15 cm ⇒ Pitagorasszal BC = 12 cm.\n• Hasonlóság: ΔABC ~ ΔCAD ⇒ λ = 15 / 9 = 5/3.\n• További oldalak: AD = 12 · (5/3) = 20 cm, CD = 15 · (5/3) = 25 cm.\n• Kerület: K = 9 + 12 + 25 + 20 = 66 cm.\n• Terület: T = (9 + 25)/2 · 12 = 17 · 12 = 204 cm².'
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TriangleSimilarityMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TriangleSimilaritySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
export default TriangleSimilarityQuiz;

