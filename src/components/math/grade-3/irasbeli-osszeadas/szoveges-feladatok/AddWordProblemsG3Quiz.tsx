import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddWordProblemsG3Matcher } from './AddWordProblemsG3Matcher';
import { AddWordProblemsG3Sorter } from './AddWordProblemsG3Sorter';
import { PartsFig, BarsFig } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { ColumnFig, ListTableFig, TagsFig, MenuFig } from './AddWordProblemsG3Parts';

const BLUE = '#93c5fd';
const GREEN = '#86efac';
const YEL = '#fde68a';

export const ADD_WORD_PROBLEMS_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'awpg3-q1',
    level: 1,
    questionTypeBadge: 'Összesen',
    figure: <PartsFig parts={[{ v: 124, text: '124' }, { v: 253, text: '253' }]} labels={['reggel', 'délben']} total="összesen: ?" />,
    question: 'A pékségben reggel 124, délben 253 kiflit sütöttek. Hány kiflit sütöttek összesen?',
    options: ['377', '129', '367', '477'],
    correctAnswer: 0,
    explanation: 'Összesen kell, ezért összeadunk: 124 + 253 = 377. 377 kiflit sütöttek.'
  },
  {
    id: 'awpg3-q2',
    level: 1,
    questionTypeBadge: 'Terv',
    question: 'A fagyizóban 136 vaníliás és 218 csokis tölcsér fagyi fogyott. Hány fogyott összesen? Melyik a terv?',
    options: ['136 + 218', '218 − 136', '136 + 136', '218 + 218'],
    correctAnswer: 0,
    explanation: 'A két számot kell összeadni: 136 + 218. A kivonás azt mondaná meg, mennyivel több a csokis.'
  },
  {
    id: 'awpg3-q3',
    level: 1,
    questionTypeBadge: 'Vásárlás',
    figure: <TagsFig items={[{ name: 'kifestő', price: 345 }, { name: 'ceruza', price: 128 }]} />,
    question: 'Mennyit fizetsz a kifestőért és a ceruzáért együtt?',
    options: ['473 Ft', '463 Ft', '217 Ft', '573 Ft'],
    correctAnswer: 0,
    explanation: '345 + 128: 5 meg 8 az 13, leírom a 3-at, maradt 1. 4 meg 2 az 6, meg 1 az 7. 3 meg 1 az 4. Együtt 473 Ft.'
  },
  {
    id: 'awpg3-q4',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'A strandon szombaton 297, vasárnap 412 jegyet adtak el. Kerekíts százasra! Körülbelül hány jegy kelt el?',
    options: ['B: 700', 'B: 600', 'B: 800', 'B: 100'],
    correctAnswer: 0,
    explanation: '297 ≈ 300 és 412 ≈ 400. 300 + 400 = 700. A pontos érték 709, ez tényleg közel van.'
  },
  {
    id: 'awpg3-q5',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <ColumnFig addends={[163, 225]} />,
    question: 'Az állatkertben 163 felnőtt- és 225 gyerekjegy kelt el. Hány jegy kelt el összesen?',
    options: ['388', '62', '378', '488'],
    correctAnswer: 0,
    explanation: 'Egyesek: 3 + 5 = 8. Tízesek: 6 + 2 = 8. Százasok: 1 + 2 = 3. Összesen 388 jegy.'
  },
  {
    id: 'awpg3-q6',
    level: 1,
    questionTypeBadge: 'Válasz',
    question: 'A kertben 148 piros és 136 sárga tulipán nyílik. Hány tulipán nyílik összesen? Melyik a jó válasz?',
    options: ['Összesen 284 tulipán nyílik.', '284 piros tulipán nyílik.', 'Összesen 12 tulipán nyílik.', 'Összesen 274 tulipán nyílik.'],
    correctAnswer: 0,
    explanation: '148 + 136 = 284. A válasz mondat: összesen 284 tulipán nyílik. Nem csak piros!'
  },
  {
    id: 'awpg3-q7',
    level: 1,
    questionTypeBadge: '…-val több',
    figure: (
      <BarsFig
        rows={[
          { name: 'kék', segs: [{ v: 156, text: '156 cm', color: BLUE }] },
          { name: 'piros', segs: [{ v: 156, text: '156 cm', color: '#fca5a5' }, { v: 120, text: '120', color: '#fecaca' }], after: '?' }
        ]}
        nameW={44}
      />
    ),
    question: 'A kék szalag 156 cm. A piros szalag 120 cm-rel hosszabb. Milyen hosszú a piros szalag?',
    options: ['276 cm', '36 cm', '266 cm', '432 cm'],
    correctAnswer: 0,
    explanation: 'A piros a hosszabb: 156 + 120 = 276. A piros szalag 276 cm.'
  },
  {
    id: 'awpg3-q8',
    level: 1,
    questionTypeBadge: 'Vásárlás',
    figure: <TagsFig items={[{ name: 'társasjáték', price: 680 }, { name: 'kártya', price: 245 }]} />,
    question: 'Mennyibe kerül a társasjáték és a kártya együtt?',
    options: ['925 Ft', '825 Ft', '435 Ft', '915 Ft'],
    correctAnswer: 0,
    explanation: '0 meg 5 az 5. 8 meg 4 az 12, leírom a 2-t, maradt 1. 6 meg 2 az 8, meg 1 az 9. Együtt 925 Ft.'
  },
  {
    id: 'awpg3-q9',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Ádám kiszámolta: 254 + 317 = 571. Hogyan ellenőrizheti a tagok felcserélésével?',
    options: ['317 + 254 = 571', '571 + 254 = 825', '317 − 254 = 63', '254 + 254 = 508'],
    correctAnswer: 0,
    explanation: 'Felcseréljük a tagokat: 317 + 254. Ha ugyanaz jön ki (571), jól számolt.'
  },
  {
    id: 'awpg3-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <ColumnFig addends={[238, 146]} />,
    question: 'A gyümölcsárus 238 kg almát és 146 kg körtét adott el. Hány kg gyümölcsöt adott el?',
    options: ['384 kg', '374 kg', '92 kg', '484 kg'],
    correctAnswer: 0,
    explanation: '8 meg 6 az 14, leírom a 4-et, maradt 1. 3 meg 4 az 7, meg 1 az 8. 2 meg 1 az 3. Összesen 384 kg.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'awpg3-q11',
    level: 2,
    questionTypeBadge: 'Három adat',
    figure: <PartsFig parts={[{ v: 145, text: '145' }, { v: 208, text: '208' }, { v: 96, text: '96' }]} labels={['péntek', 'szombat', 'vasárnap']} />,
    question: 'A cirkuszban pénteken 145, szombaton 208, vasárnap 96 néző volt. Hány néző volt összesen?',
    options: ['449', '339', '353', '549'],
    correctAnswer: 0,
    explanation: '5 meg 8 meg 6 az 19, leírom a 9-et, maradt 1. 4 meg 0 meg 9 az 13, meg 1 az 14, leírom a 4-et, maradt 1. 1 meg 2 az 3, meg 1 az 4. Összesen 449 néző.'
  },
  {
    id: 'awpg3-q12',
    level: 2,
    questionTypeBadge: 'Étlap',
    figure: <MenuFig />,
    question: 'Mennyibe kerül a palacsinta tejszínhabbal és kakaóval?',
    options: ['365 Ft', '265 Ft', '280 Ft', '465 Ft'],
    correctAnswer: 0,
    explanation: 'Palacsinta 160 Ft, tejszínhab 120 Ft, kakaó 85 Ft. 160 + 120 + 85 = 365 Ft.'
  },
  {
    id: 'awpg3-q13',
    level: 2,
    questionTypeBadge: 'Csapda',
    figure: (
      <BarsFig
        rows={[
          { name: 'fiúk', segs: [{ v: 175, text: '175', color: YEL }] },
          { name: 'lányok', segs: [{ v: 175, text: '175', color: GREEN }, { v: 148, text: '148', color: '#bbf7d0', dashed: true }], after: '?' }
        ]}
        nameW={50}
      />
    ),
    question: 'A fiúk 175 papírhajót hajtogattak. Ez 148-cal kevesebb, mint amennyit a lányok. Hány hajót hajtogattak a lányok?',
    options: ['323', '27', '213', '498'],
    correctAnswer: 0,
    explanation: 'A lányok hajtogattak többet! Ezért összeadunk: 175 + 148 = 323.'
  },
  {
    id: 'awpg3-q14',
    level: 2,
    questionTypeBadge: 'Kérdés',
    question: 'Egy dobozban 168 piros és 247 kék gyöngy van. Melyik kérdésre felel a 168 + 247?',
    options: ['Hány gyöngy van a dobozban?', 'Mennyivel több a kék gyöngy?', 'Hány piros gyöngy van?', 'Hány kék gyöngy van?'],
    correctAnswer: 0,
    explanation: 'Az összeadás azt mondja meg, mennyi van összesen: 168 + 247 = 415 gyöngy.'
  },
  {
    id: 'awpg3-q15',
    level: 2,
    questionTypeBadge: '…-val drágább',
    figure: (
      <BarsFig
        rows={[
          { name: 'szőlő', segs: [{ v: 389, text: '389 Ft', color: '#c4b5fd' }] },
          { name: 'dinnye', segs: [{ v: 389, text: '389 Ft', color: GREEN }, { v: 427, text: '427 Ft', color: '#bbf7d0' }], after: '?' }
        ]}
        nameW={50}
      />
    ),
    question: 'A szőlő 389 Ft. A dinnye 427 Ft-tal drágább. Mennyibe kerül a dinnye?',
    options: ['816 Ft', '38 Ft', '706 Ft', '806 Ft'],
    correctAnswer: 0,
    explanation: 'A dinnye a drágább: 389 + 427 = 816 Ft. Ügyelj a két maradékra!'
  },
  {
    id: 'awpg3-q16',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <ListTableFig title="Gyűjtött papír" rows={[['3.a', '274 kg'], ['3.b', '198 kg'], ['3.c', '156 kg']]} />,
    question: 'Mennyi papírt gyűjtött a 3.a és a 3.b együtt?',
    options: ['472 kg', '362 kg', '76 kg', '572 kg'],
    correctAnswer: 0,
    explanation: 'Csak a 3.a és a 3.b kell: 274 + 198 = 472 kg. A 3.c most nem kell!'
  },
  {
    id: 'awpg3-q17',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Dóri kiszámolta: 386 + 247 = 533. Becsléssel nézd meg! Jó ez?',
    options: ['Nem jó: a becslés kb. 640.', 'Jó, mert 533 közel van az 500-hoz.', 'Jó, mert kisebb, mint 1000.', 'Nem jó: a becslés kb. 140.'],
    correctAnswer: 0,
    explanation: '386 ≈ 390, 247 ≈ 250. B: 640. Az 533 messze van, Dóri elszámolta. Helyesen: 633.'
  },
  {
    id: 'awpg3-q18',
    level: 2,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <ColumnFig addends={[267, 358]} />,
    question: 'A busz délelőtt 267, délután 358 utast vitt. Hány utast vitt összesen?',
    options: ['625', '515', '615', '91'],
    correctAnswer: 0,
    explanation: '7 meg 8 az 15, leírom az 5-öt, maradt 1. 6 meg 5 az 11, meg 1 az 12, leírom a 2-t, maradt 1. 2 meg 3 az 5, meg 1 az 6. Összesen 625.'
  },
  {
    id: 'awpg3-q19',
    level: 2,
    questionTypeBadge: 'Összesen',
    figure: <PartsFig parts={[{ v: 285, text: '285 km' }, { v: 309, text: '309 km' }]} labels={['hétfő', 'kedd']} />,
    question: 'Egy kamion hétfőn 285 km-t, kedden 309 km-t tett meg. Hány km-t tett meg a két napon?',
    options: ['594 km', '584 km', '24 km', '694 km'],
    correctAnswer: 0,
    explanation: '5 meg 9 az 14, leírom a 4-et, maradt 1. 8 meg 0 az 8, meg 1 az 9. 2 meg 3 az 5. Összesen 594 km.'
  },
  {
    id: 'awpg3-q20',
    level: 2,
    questionTypeBadge: 'Felesleges adat',
    question: 'A 3.b-be 26 gyerek jár. Kirándultak: a busz 465 Ft, a belépő 380 Ft. Mennyit fizet egy gyerek? Melyik a terv?',
    options: ['465 + 380', '465 + 380 + 26', '465 − 380', '26 + 465'],
    correctAnswer: 0,
    explanation: 'Egy gyerek a buszt és a belépőt fizeti: 465 + 380 = 845 Ft. A 26 gyerek most nem kell a számoláshoz.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'awpg3-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <BarsFig
        rows={[
          { name: 'délelőtt', segs: [{ v: 128, text: '128', color: BLUE }] },
          { name: 'délután', segs: [{ v: 128, text: '128', color: BLUE }, { v: 165, text: '165', color: GREEN }], after: '?' }
        ]}
        nameW={58}
        caption="összesen: ?"
      />
    ),
    question: 'A virágárus délelőtt 128 szál rózsát adott el, délután 165-tel többet. Hány szálat adott el egész nap?',
    options: ['421', '293', '411', '311'],
    correctAnswer: 0,
    explanation: '1. Délután: 128 + 165 = 293. 2. Egész nap: 128 + 293 = 421 szál.'
  },
  {
    id: 'awpg3-q22',
    level: 3,
    questionTypeBadge: 'Csapda, két lépés',
    figure: (
      <BarsFig
        rows={[
          { name: 'fiúk', segs: [{ v: 214, text: '214', color: YEL }] },
          { name: 'lányok', segs: [{ v: 214, text: '214', color: GREEN }, { v: 57, text: '57', color: '#bbf7d0', dashed: true }], after: '?' }
        ]}
        nameW={50}
        caption="összesen: ?"
      />
    ),
    question: 'A versenyen 214 fiú indult. Ez 57-tel kevesebb, mint a lányok száma. Hányan indultak összesen?',
    options: ['485', '271', '157', '475'],
    correctAnswer: 0,
    explanation: '1. Lányok: 214 + 57 = 271 (ők vannak többen). 2. Összesen: 214 + 271 = 485.'
  },
  {
    id: 'awpg3-q23',
    level: 3,
    questionTypeBadge: 'Étlap',
    figure: <MenuFig />,
    question: 'Túrós-lekváros palacsintát kérsz. 400 Ft-od van. Elég?',
    options: ['Igen, pont 400 Ft.', 'Nem, 10 Ft hiányzik.', 'Igen, és marad 100 Ft.', 'Nem, 100 Ft hiányzik.'],
    correctAnswer: 0,
    explanation: 'Palacsinta 160 Ft + túró 145 Ft + lekvár 95 Ft = 400 Ft. Pont elég!'
  },
  {
    id: 'awpg3-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <BarsFig
        rows={[
          { name: '1. rész', segs: [{ v: 126, text: '126', color: BLUE }] },
          { name: '2. rész', segs: [{ v: 126, text: '126', color: BLUE }, { v: 38, text: '38', color: GREEN }] },
          { name: '3. rész', segs: [{ v: 210, text: '210', color: YEL }] }
        ]}
        nameW={50}
      />
    ),
    question: 'Egy könyv 1. része 126 oldal. A 2. rész 38 oldallal hosszabb. A 3. rész 210 oldal. Hány oldalas a könyv?',
    options: ['500', '374', '490', '338'],
    correctAnswer: 0,
    explanation: '1. A 2. rész: 126 + 38 = 164 oldal. 2. Az egész: 126 + 164 + 210 = 500 oldal.'
  },
  {
    id: 'awpg3-q25',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagsFig items={[{ name: 'labda', price: 465 }, { name: 'ugrókötél', price: 385 }]} />,
    question: 'Elég 1000 Ft a labdára és az ugrókötélre?',
    options: ['Igen, a kettő 850 Ft.', 'Nem, a kettő több, mint 1000 Ft.', 'Igen, a kettő 740 Ft.', 'Igen, a kettő 750 Ft.'],
    correctAnswer: 0,
    explanation: '465 + 385: 5 meg 5 az 10, leírom a 0-t, maradt 1. 6 meg 8 az 14, meg 1 az 15, leírom az 5-öt, maradt 1. 4 meg 3 az 7, meg 1 az 8. 850 Ft, ez kevesebb, mint 1000 Ft.'
  },
  {
    id: 'awpg3-q26',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A gyerekek tavasszal 236 fát ültettek, ősszel 47-tel többet. Hány fát ültettek egész évben?',
    options: ['519', '283', '329', '509'],
    correctAnswer: 0,
    explanation: '1. Ősszel: 236 + 47 = 283. 2. Egész évben: 236 + 283 = 519 fa.'
  },
  {
    id: 'awpg3-q27',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <ListTableFig title="Gyűjtött papír" rows={[['3.a', '274 kg'], ['3.b', '198 kg'], ['3.c', '156 kg']]} />,
    question: 'Mennyi papírt gyűjtött a három osztály együtt?',
    options: ['628 kg', '472 kg', '618 kg', '418 kg'],
    correctAnswer: 0,
    explanation: '274 + 198 + 156: 4 meg 8 meg 6 az 18, maradt 1. 7 meg 9 meg 5 az 21, meg 1 az 22, maradt 2. 2 meg 1 meg 1 az 4, meg 2 az 6. Összesen 628 kg.'
  },
  {
    id: 'awpg3-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <BarsFig
        rows={[
          { name: 'hétfő', segs: [{ v: 348, text: '348 kg', color: YEL }] },
          { name: 'kedd', segs: [{ v: 348, text: '348 kg', color: YEL }, { v: 75, text: '75', color: GREEN }], after: '?' }
        ]}
        nameW={46}
        caption="a két napon összesen: ?"
      />
    ),
    question: 'A pék hétfőn 348 kg kenyeret sütött, kedden 75 kg-mal többet. Hány kg kenyeret sütött a két napon?',
    options: ['771 kg', '423 kg', '761 kg', '671 kg'],
    correctAnswer: 0,
    explanation: '1. Kedden: 348 + 75 = 423 kg. 2. A két napon: 348 + 423 = 771 kg.'
  },
  {
    id: 'awpg3-q29',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <BarsFig
        rows={[
          { name: '1. nap', segs: [{ v: 48, text: '48', color: BLUE }] },
          { name: '2. nap', segs: [{ v: 48, text: '48', color: BLUE }, { v: 27, text: '27', color: GREEN }] },
          { name: '3. nap', segs: [{ v: 75, text: 'mint a 2. nap', color: '#e9d5ff' }] }
        ]}
        nameW={48}
      />
    ),
    question: 'Panni az 1. napon 48 oldalt olvasott. A 2. napon 27-tel többet, a 3. napon annyit, mint a 2. napon. Hány oldalt olvasott?',
    options: ['198', '150', '123', '188'],
    correctAnswer: 0,
    explanation: 'A 2. nap: 48 + 27 = 75. A 3. nap is 75. Összesen: 48 + 75 + 75 = 198 oldal.'
  },
  {
    id: 'awpg3-q30',
    level: 3,
    questionTypeBadge: 'Becslés és számítás',
    figure: <TagsFig items={[{ name: 'füzet', price: 189 }, { name: 'tolltartó', price: 627 }]} />,
    question: 'Körülbelül mennyit fizetsz, és pontosan mennyit?',
    options: ['kb. 820 Ft, pontosan 816 Ft', 'kb. 820 Ft, pontosan 706 Ft', 'kb. 700 Ft, pontosan 816 Ft', 'kb. 920 Ft, pontosan 916 Ft'],
    correctAnswer: 0,
    explanation: 'Becslés: 190 + 630 = 820. Pontosan: 189 + 627 = 816 Ft. A kettő közel van, jó!'
  }
];

export const AddWordProblemsG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId="g3-wadd-szoveges-quiz"
      subtopicId="szoveges-feladatok"
      title="5. Szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: összesen, „…-val több”, „…-val kevesebb, mint”, három adat, étlap és táblázat, becslés, kétlépéses feladatok."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
      questions={ADD_WORD_PROBLEMS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A lépések',
          items: ['Adatok → Terv → Becslés', 'Számítás írásban → Ellenőrzés', 'Válasz: egész mondat, mértékegységgel']
        },
        {
          title: 'Több vagy kevesebb?',
          items: ['„B 120-szal több, mint A” → B = A + 120', '„A 148-cal kevesebb, mint B” → B = A + 148', 'Rajzolj csíkot: a hosszabb a több!']
        },
        {
          title: 'Két lépés',
          items: ['Délelőtt 128, délután 165-tel több', '1. délután: 128 + 165 = 293', '2. összesen: 128 + 293 = 421']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddWordProblemsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <AddWordProblemsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default AddWordProblemsG3Quiz;
