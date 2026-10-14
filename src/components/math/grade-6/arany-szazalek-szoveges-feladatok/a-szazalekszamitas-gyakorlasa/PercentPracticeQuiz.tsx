import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PercentPracticeMatcher } from './PercentPracticeMatcher';
import { PercentPracticeSorter } from './PercentPracticeSorter';

interface PercentPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const PercentPracticeQuiz: React.FC<PercentPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Bolti akciók, áremelések és szorzók)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Egy 10 000 Ft-os pulóvert 20%-kal leértékeltek. Mennyi az akciós ára?',
      options: [
        '8 000 Ft',
        '2 000 Ft',
        '7 500 Ft',
        '8 500 Ft'
      ],
      correctAnswer: 0,
      hint: '20% kedvezmény = 2000 Ft. 10 000 - 2000 = ?',
      explanation: 'A 20% kedvezmény 10 000 · 0,20 = 2000 Ft. Az új ár: 10 000 - 2000 = 8000 Ft.'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Milyen szorzótényezővel kell megszorozni az eredeti árat egy 15%-os áremelés esetén?',
      options: [
        '1,15-dal',
        '0,15-dal',
        '0,85-dal',
        '1,50-dal'
      ],
      correctAnswer: 0,
      hint: '100% + 15% = 115% tizedestörtben.',
      explanation: 'Az új ár a régi ár 115%-a, tizedestört alakban 1,15.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Milyen szorzótényezővel kapjuk meg közvetlenül a fizetendő összeget egy 25%-os leárazásnál?',
      options: [
        '0,75-dal',
        '0,25-dal',
        '1,25-dal',
        '0,80-dal'
      ],
      correctAnswer: 0,
      hint: '100% - 25% = 75% tizedestörtben.',
      explanation: 'A 25% kedvezmény levonása után az ár 75%-a marad meg: 75% = 0,75.'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Egy 50 000 Ft-os okostelefon ára 10%-kal emelkedett. Mennyibe kerül most a készülék?',
      options: [
        '55 000 Ft',
        '50 500 Ft',
        '60 000 Ft',
        '45 000 Ft'
      ],
      correctAnswer: 0,
      hint: '10% áremelés = 5000 Ft drágulás.',
      explanation: '50 000 · 0,10 = 5000 Ft. Az új ár: 50 000 + 5000 = 55 000 Ft (vagy 50 000 · 1,10 = 55 000 Ft).'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Egy 15 000 Ft-os kabátra 30% engedményt adnak. Hány forint a kedvezmény összege?',
      options: [
        '4 500 Ft',
        '10 500 Ft',
        '3 000 Ft',
        '5 000 Ft'
      ],
      correctAnswer: 0,
      hint: '10% = 1500 Ft, ennek a háromszorosa: 1500 · 3 = ?',
      explanation: 'A kedvezmény összege a százalékérték: 15 000 · 0,30 = 4500 Ft.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Péter elhelyez a bankban 100 000 Ft-ot évi 6%-os kamatra. Mennyi kamatot kap egy év elteltével?',
      options: [
        '6 000 Ft-ot',
        '600 Ft-ot',
        '106 000 Ft-ot',
        '12 000 Ft-ot'
      ],
      correctAnswer: 0,
      hint: '100 000 Ft 1%-a 1000 Ft.',
      explanation: '100 000 · 0,06 = 6000 Ft kamat jár a megtakarításra.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Egy 20 000 Ft-os roller árát 5%-kal leszállították. Mennyibe kerül most?',
      options: [
        '19 000 Ft',
        '18 000 Ft',
        '19 500 Ft',
        '15 000 Ft'
      ],
      correctAnswer: 0,
      hint: '10% = 2000 Ft, az 5% ennek a fele: 1000 Ft.',
      explanation: '5% kedvezmény = 1000 Ft. 20 000 - 1000 = 19 000 Ft (vagy 20 000 · 0,95 = 19 000 Ft).'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Egy könyv ára 4000 Ft, de diákkedvezménnyel 10%-kal olcsóbban vásárolható meg. Mennyit fizet a diák?',
      options: [
        '3 600 Ft-ot',
        '3 200 Ft-ot',
        '3 800 Ft-ot',
        '400 Ft-ot'
      ],
      correctAnswer: 0,
      hint: '4000 Ft 10%-a 400 Ft.',
      explanation: '4000 - 400 = 3600 Ft (vagy 4000 · 0,90 = 3600 Ft).'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mit jelent, ha egy termék ára 100%-kal megnő?',
      options: [
        'Pontosan megduplázódik az ára (a kétszeresére nő)',
        'Ugyanannyi marad',
        'A százszorosára nő',
        'Ingyenessé válik'
      ],
      correctAnswer: 0,
      hint: '100% növekedés = az egész összeg hozzáadódik.',
      explanation: 'Ha az eredeti árhoz (100%) még egyszer hozzáadjuk az eredeti árat (+100%), az új ár 200%-os lesz, vagyis duplájára nő.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mekkora az új fizetés, ha a 200 000 Ft-os alapbért 8%-kal megemelik?',
      options: [
        '216 000 Ft',
        '208 000 Ft',
        '218 000 Ft',
        '224 000 Ft'
      ],
      correctAnswer: 0,
      hint: '1% = 2000 Ft, 8% = 16 000 Ft emelés.',
      explanation: '200 000 · 0,08 = 16 000 Ft emelés. Új fizetés: 200 000 + 16 000 = 216 000 Ft.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Eredeti ár visszaszámolása és oldatok)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Egy téli dzseki 20%-os kiárusítás után 16 000 Ft-ba kerül. Mennyi volt az eredeti ára?',
      options: [
        '20 000 Ft',
        '19 200 Ft',
        '24 000 Ft',
        '18 000 Ft'
      ],
      correctAnswer: 0,
      hint: '20% engedmény után a 80%-át fizetjük. 16 000 : 80 · 100 = ?',
      explanation: 'A 16 000 Ft a 80%-nak felel meg. 1% = 16 000 : 80 = 200 Ft. Az eredeti 100%: 200 · 100 = 20 000 Ft.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Egy bicikli ára 10%-os drágulás után 66 000 Ft lett. Mennyi volt az ára a drágulás előtt?',
      options: [
        '60 000 Ft',
        '59 400 Ft',
        '62 000 Ft',
        '56 000 Ft'
      ],
      correctAnswer: 0,
      hint: 'A drágulás után az ár a 110%-nak felel meg. 66 000 : 1,10 = ?',
      explanation: 'Az új ár az eredeti ár 110%-a. 66 000 : 1,10 = 60 000 Ft volt az eredeti ár.'
    },
    {
      id: 'q13',
      level: 2,
      question: '400 gramm vízben feloldunk 100 gramm cukrot. Hány százalékos lesz a kapott cukros oldat?',
      options: [
        '20%-os',
        '25%-os',
        '15%-os',
        '10%-os'
      ],
      correctAnswer: 0,
      hint: 'A teljes oldat tömege: 400 + 100 = 500 g. Cukorarány: 100 / 500.',
      explanation: 'A teljes oldat tömege: 400 g + 100 g = 500 g. A cukor aránya a teljes oldathoz képest: 100 / 500 = 1/5 = 20%.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Egy 80 000 Ft-os televízió ára előbb 10%-kal csökkent, majd a leárazott árat még 10%-kal csökkentették. Mennyi az új ár?',
      options: [
        '64 800 Ft',
        '64 000 Ft',
        '65 000 Ft',
        '68 000 Ft'
      ],
      correctAnswer: 0,
      hint: 'Első leárazás: 80 000 - 8000 = 72 000 Ft. Második: 72 000 Ft-ból vonj le 10%-ot (7200 Ft)!',
      explanation: '1. leárazás után: 80 000 · 0,9 = 72 000 Ft. 2. leárazás: 72 000 · 0,9 = 64 800 Ft (nem 20%-os csökkenés!).'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Egy 500 grammos 12%-os sóoldatból elpárologtatunk 100 gramm vizet. Hány gramm só maradt az oldatban?',
      options: [
        'Pontosan 60 gramm só',
        '40 gramm só',
        '50 gramm só',
        '70 gramm só'
      ],
      correctAnswer: 0,
      hint: 'A párolgás során csak víz távozik, a só nem párolog el!',
      explanation: 'Eredetileg a só mennyisége: 500 · 0,12 = 60 g só. Mivel csak a víz párolog el, a só tömege változatlanul 60 gramm marad.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Az előző feladat folytatása: az elpárologtatás után (60 g só, 400 g új oldattömeg) hány százalékos lett az oldat?',
      options: [
        '15%-os',
        '12%-os',
        '18%-os',
        '20%-os'
      ],
      correctAnswer: 0,
      hint: 'Új tömeg: 500 - 100 = 400 g. Számold ki: 60 / 400 = ?',
      explanation: 'Az új oldat tömege 400 g. A sótartalom: 60 / 400 = 6 / 40 = 3 / 20 = 15/100 = 15%.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Két áruházban ugyanaz a 40 000 Ft-os porszívó kapható. Az A boltban 25% azonnali engedmény van, a B boltban 8000 Ft fix kedvezményt adnak. Melyik ajánlat kedvezőbb a vevőnek?',
      options: [
        'Az A bolt, mert 10 000 Ft a kedvezmény (2000 Ft-tal jobb)',
        'A B bolt, mert 8000 Ft készpénzben többet ér',
        'A kettő teljesen egyforma',
        'Nem lehet eldönteni'
      ],
      correctAnswer: 0,
      hint: '40 000 Ft 25%-a = 10 000 Ft kedvezmény.',
      explanation: 'A bolt: 40 000 · 0,25 = 10 000 Ft kedvezmény. B bolt: 8000 Ft kedvezmény. Az A bolt 2000 Ft-tal olcsóbb (30 000 Ft vs 32 000 Ft).'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Egy gyár az idei évben 1400 gépet készített, ami 12%-kal több a tavalyi termelésnél. Kereken hány gépet készítettek tavaly?',
      options: [
        '1250 gépet',
        '1232 gépet',
        '1300 gépet',
        '1180 gépet'
      ],
      correctAnswer: 0,
      hint: '1400 : 1,12 = ?',
      explanation: '1400 : 1,12 = 1250 gépet készítettek tavaly.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Egy kereskedő 8000 Ft-ért vesz egy árut, és 25% haszonnal adja el. Mennyi az eladási ár?',
      options: [
        '10 000 Ft',
        '9 500 Ft',
        '10 500 Ft',
        '9 000 Ft'
      ],
      correctAnswer: 0,
      hint: '8000 Ft 25%-a (negyede) a haszon: 2000 Ft.',
      explanation: 'Haszon: 8000 · 0,25 = 2000 Ft. Eladási ár: 8000 + 2000 = 10 000 Ft (vagy 8000 · 1,25 = 10 000 Ft).'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Egy színházi előadásra 450 jegyet adtak el, a jegyek 10%-a még gazdára vár. Hány férőhelyes a színházterem összesen?',
      options: [
        '500 férőhelyes',
        '495 férőhelyes',
        '520 férőhelyes',
        '480 férőhelyes'
      ],
      correctAnswer: 0,
      hint: 'A 450 eladott jegy a jegyek 90%-át jelenti (100% - 10%).',
      explanation: 'Az eladott jegyek a 90%-nak felelnek meg. 1% = 450 : 90 = 5 jegy. A 100% (teljes nézőtér): 5 · 100 = 500 férőhely.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett árváltozások, többlépcsős akciók)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Egy termék árát 20%-kal megemelték, majd az új árat 20%-kal leszállították. Hány százaléka lett a végső ár az eredeti árnak?',
      options: [
        '96%-a (4%-kal csökkent)',
        '100%-a (nem változott)',
        '104%-a (4%-kal nőtt)',
        '98%-a (2%-kal csökkent)'
      ],
      correctAnswer: 0,
      hint: 'Szorozd össze a szorzótényezőket: 1,20 · 0,80 = ?',
      explanation: '1,20 · 0,80 = 0,96 = 96%. A végső ár az eredetinek 96%-a, vagyis 4%-kal olcsóbb lett!'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Egy áruházban 20% általános akció van, és a törzsvásárlók az AKCIÓS ÁRBÓL további 10% engedményt kapnak. Hány százalék a teljes kedvezmény az eredeti árhoz képest?',
      options: [
        '28% kedvezmény',
        '30% kedvezmény',
        '25% kedvezmény',
        '32% kedvezmény'
      ],
      correctAnswer: 0,
      hint: 'Fizetendő: 0,80 · 0,90 = 0,72 (72%). Mennyi a kedvezmény 100%-ból?',
      explanation: 'Az 1. kedvezmény után marad 80%. Ennek 90%-át fizeti a törzsvásárló: 0,80 · 0,90 = 0,72 = 72% fizetendő. A teljes kedvezmény: 100% - 72% = 28% (nem 30%!).'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Egy termék ára 25%-kal nőtt. Hány százalékkal kellene most csökkenteni az új árat, hogy visszakapjuk az eredeti árat?',
      options: [
        '20%-kal',
        '25%-kal',
        '15%-kal',
        '22,5%-kal'
      ],
      correctAnswer: 0,
      hint: '100 Ft-ból 125 Ft lett. A 25 Ft a 125 Ft-nak mekkora része? 25 / 125 = ?',
      explanation: '100 Ft ⟹ 125 Ft. Hogy visszatérjünk 100 Ft-ra, 25 Ft-ot kell levonni 125 Ft-ból: 25 / 125 = 1/5 = 20%-os csökkentés kell.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Összekeverünk 300 gramm 10%-os és 200 gramm 20%-os sóoldatot. Hány százalékos lesz a kapott keverék?',
      options: [
        '14%-os',
        '15%-os',
        '16%-os',
        '12%-os'
      ],
      correctAnswer: 0,
      hint: '1. oldat sótartalma: 300 · 0,10 = 30 g. 2. oldat: 200 · 0,20 = 40 g. Összes só = 70 g, összes oldat = 500 g.',
      explanation: 'Összes só: 30 g + 40 g = 70 g. Összes tömeg: 300 g + 200 g = 500 g. Koncentráció: 70 / 500 = 14 / 100 = 14%.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy téglalap hosszát 20%-kal megnöveljük, szélességét 20%-kal csökkentjük. Hogyan változik a téglalap területe?',
      options: [
        '4%-kal csökken',
        'Változatlan marad',
        '4%-kal nő',
        '2%-kal csökken'
      ],
      correctAnswer: 0,
      hint: 'Új terület = 1,20 · 0,80 · eredeti terület.',
      explanation: 'Új terület = 1,20 · 0,80 = 0,96 = 96%-a az eredetinek, tehát 4%-kal csökken.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Egy autószalonban az autó ára 20% áfát tartalmaz (vagyis a nettó ár 120%-a a bruttó ár). Ha a bruttó ár 6 000 000 Ft, mennyi a nettó ár?',
      options: [
        '5 000 000 Ft',
        '4 800 000 Ft',
        '5 200 000 Ft',
        '5 500 000 Ft'
      ],
      correctAnswer: 0,
      hint: 'Nettó ár · 1,20 = 6 000 000 Ft. Számold ki: 6 000 000 : 1,20 = ?',
      explanation: '6 000 000 : 1,20 = 5 000 000 Ft a nettó ár (az áfa 1 000 000 Ft, ami az 5 millió 20%-a).'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy bankbetét kamata évi 10%. Kamatos kamattal számolva (a kamat tőkésedik): hány forint lesz 100 000 Ft-ból 2 év elteltével?',
      options: [
        '121 000 Ft',
        '120 000 Ft',
        '122 000 Ft',
        '115 000 Ft'
      ],
      correctAnswer: 0,
      hint: '1. év után: 100 000 · 1,10 = 110 000 Ft. 2. év után: 110 000 · 1,10 = ?',
      explanation: '1. év: 110 000 Ft. 2. év: 110 000 Ft 10%-a 11 000 Ft, így 110 000 + 11 000 = 121 000 Ft (100 000 · 1,10² = 121 000 Ft).'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy cipő ára 10%-kal csökkent, majd a leértékelt árat 10%-kal felemelték. Melyik állítás igaz az eredeti árhoz képest?',
      options: [
        '1%-kal olcsóbb lett az eredeti árnál',
        'Ugyanannyiba kerül, mint az elején',
        '1%-kal drágább lett az eredeti árnál',
        '2%-kal olcsóbb lett'
      ],
      correctAnswer: 0,
      hint: '0,90 · 1,10 = 0,99 (99%).',
      explanation: '0,90 · 1,10 = 0,99 = 99%. A sorrend sem számít: ha előbb csökkentünk, majd emelünk azonos százalékkal, mindig veszítünk az eredetihez képest!'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egy boltban kiírták: „Vegyél 3-at, fizess 2-t!”. Hány százalékos kedvezménynek felel meg ez valójában?',
      options: [
        'Kb. 33,3%-os kedvezménynek',
        '50%-os kedvezménynek',
        '25%-os kedvezménynek',
        '30%-os kedvezménynek'
      ],
      correctAnswer: 0,
      hint: '3 darabból 1 ingyen van: 1 / 3 = ?',
      explanation: '3 termékért fizetünk 2 árát, vagyis 1 termék az ingyenes kedvezmény: 1 / 3 = 0,333... = 33,3% kedvezmény.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy részvény ára az első nap 50%-kal emelkedett, majd a második nap 50%-kal zuhant. Hány százaléka maradt meg a kezdeti értékének?',
      options: [
        '75%-a (25%-os veszteség)',
        '100%-a (nem változott)',
        '50%-a (feleződött)',
        '80%-a'
      ],
      correctAnswer: 0,
      hint: '1,50 · 0,50 = 0,75.',
      explanation: '100 Ft ⟹ +50% ⟹ 150 Ft. 150 Ft 50%-a 75 Ft, 150 - 75 = 75 Ft marad! Tehát 25%-os veszteség keletkezett!'
    }
  ];

  return (
    <QuizTemplate
      title="Százalékszámítás a gyakorlatban kvíz"
      subtitle="Gyakorold az akciókat, drágulást, fordított számításokat és keverékeket 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="pink"
      category="Gyakorlat"
      topicTitle="A százalékszámítás gyakorlása"
      questions={questions}
      matcherComponent={PercentPracticeMatcher}
      sorterComponent={PercentPracticeSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentPracticeQuiz;
