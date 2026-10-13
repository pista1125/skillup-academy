import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { PrismSurfaceVolumeMatcher } from './PrismSurfaceVolumeMatcher';
import { PrismSurfaceVolumeSorter } from './PrismSurfaceVolumeSorter';

interface PrismSurfaceVolumeQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak, Kocka és Téglatest',
    subtitle: 'Kocka és téglatest felszíne, térfogata és alaptulajdonságai',
    description: '10 alapozó feladat ábrákkal és közvetlen képletalkalmazással.',
    questions: [
      {
        id: 'q1-1',
        title: 'Kocka térfogata',
        question: 'Egy kocka éle 5 cm. Mennyi a térfogata?',
        options: ['125 cm³', '25 cm³', '150 cm³', '75 cm³'],
        correctAnswer: '125 cm³',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <polygon points="20,55 60,55 75,40 35,40" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="20,25 60,25 75,10 35,10" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="20,25 60,25 60,55 20,55" fill="#fef9c3" fillOpacity="0.4" stroke="#b45309" strokeWidth="1.5" />
            <polygon points="60,25 75,10 75,40 60,55" fill="#fed7aa" fillOpacity="0.5" stroke="#c2410c" strokeWidth="1.5" />
            <text x="40" y="65" textAnchor="middle" className="text-[8.5px] font-bold fill-slate-800">a = 5 cm</text>
          </svg>
        ),
        explanation: 'A kocka térfogata V = a³ = 5³ = 5 · 5 · 5 = 125 cm³.',
        hint: 'Használd a V = a³ képletet!'
      },
      {
        id: 'q1-2',
        title: 'Kocka felszíne',
        question: 'Egy kocka éle 4 cm. Mennyi a felszíne?',
        options: ['96 cm²', '64 cm²', '16 cm²', '24 cm²'],
        correctAnswer: '96 cm²',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <rect x="40" y="8" width="16" height="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="24" y="24" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="40" y="24" width="16" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
            <rect x="56" y="24" width="16" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="40" y="40" width="16" height="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <rect x="40" y="56" width="16" height="16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <text x="78" y="42" textAnchor="start" className="text-[7.5px] font-bold fill-slate-700">6 lap: 6·a²</text>
          </svg>
        ),
        explanation: 'Egy lap területe 4² = 16 cm². Mivel a kockának 6 egybevágó lapja van: A = 6 · a² = 6 · 16 = 96 cm².',
        hint: 'A kockát 6 egyforma négyzet határolja: A = 6a².'
      },
      {
        id: 'q1-3',
        title: 'Téglatest térfogata',
        question: 'Egy téglatest élei 3 cm, 4 cm és 6 cm. Mekkora a térfogata?',
        options: ['72 cm³', '24 cm³', '108 cm³', '54 cm³'],
        correctAnswer: '72 cm³',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <polygon points="15,60 65,60 80,45 30,45" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <polygon points="15,25 65,25 80,10 30,10" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <polygon points="15,25 65,25 65,60 15,60" fill="#a7f3d0" fillOpacity="0.3" stroke="#047857" strokeWidth="1.5" />
            <polygon points="65,25 80,10 80,45 65,60" fill="#6ee7b7" fillOpacity="0.4" stroke="#047857" strokeWidth="1.5" />
            <text x="40" y="69" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 3 cm</text>
            <text x="78" y="56" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">b = 4</text>
            <text x="11" y="42" textAnchor="end" className="text-[8px] font-bold fill-emerald-700">c = 6</text>
          </svg>
        ),
        explanation: 'A téglatest térfogata az élek szorzata: V = a · b · c = 3 · 4 · 6 = 72 cm³.'
      },
      {
        id: 'q1-4',
        title: 'Hasáb alapterülete és magassága',
        question: 'Egy hasáb alapterülete Ta = 18 cm², testmagassága M = 5 cm. Mennyi a térfogata?',
        options: ['90 cm³', '45 cm³', '23 cm³', '180 cm³'],
        correctAnswer: '90 cm³',
        explanation: 'Bármely egyenes hasáb térfogata V = Ta · M = 18 · 5 = 90 cm³.'
      },
      {
        id: 'q1-5',
        title: 'A hasáb palástja',
        question: 'Milyen síkidomot kapunk, ha egy egyenes hasáb palástját kiterítjük a síkba?',
        options: ['Egyetlen nagy téglalapot', 'Egy nagy háromszöget', 'Négyzetet minden esetben', 'Kört'],
        correctAnswer: 'Egyetlen nagy téglalapot',
        explanation: 'A hasáb oldallapjai mind téglalapok, amelyek kiterítve egyetlen nagy téglalappá állnak össze, melynek oldalai Ka és M.'
      },
      {
        id: 'q1-6',
        title: 'Kocka lapjainak és éleinek száma',
        question: 'Hány lapja és hány éle van egy kockának?',
        options: ['6 lapja és 12 éle', '8 lapja és 12 éle', '6 lapja és 8 éle', '4 lapja és 6 éle'],
        correctAnswer: '6 lapja és 12 éle',
        explanation: 'A kockának (és téglatestnek) 6 lapja, 12 éle és 8 csúcsa van.'
      },
      {
        id: 'q1-7',
        title: 'Téglatest felszíne',
        question: 'Egy téglatest élei a = 2 cm, b = 3 cm, c = 4 cm. Mennyi a felszíne?',
        options: ['52 cm²', '24 cm²', '26 cm²', '48 cm²'],
        correctAnswer: '52 cm²',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <polygon points="20,55 55,55 70,42 35,42" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="20,25 55,25 70,12 35,12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <polygon points="20,25 55,25 55,55 20,55" fill="#bfdbfe" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <polygon points="55,25 70,12 70,42 55,55" fill="#93c5fd" fillOpacity="0.5" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="37" y="65" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 2 cm</text>
            <text x="68" y="52" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">b = 3 cm</text>
            <text x="14" y="40" textAnchor="end" className="text-[8px] font-bold fill-blue-700">c = 4 cm</text>
          </svg>
        ),
        explanation: 'A lapok páronként egybevágók: A = 2 · (ab + bc + ac) = 2 · (6 + 12 + 8) = 2 · 26 = 52 cm².'
      },
      {
        id: 'q1-8',
        title: 'Hasáb általános felszínképlete',
        question: 'Melyik képlettel számítjuk ki bármely egyenes hasáb felszínét?',
        options: ['A = 2 · Ta + Tp', 'A = Ta + Tp', 'A = Ta · M', 'A = 2 · Ta · M'],
        correctAnswer: 'A = 2 · Ta + Tp',
        explanation: 'A hasáb felszíne a két alaplap (2Ta) és a palást (Tp) területének összege: A = 2Ta + Tp.'
      },
      {
        id: 'q1-9',
        title: 'Kocka éleinek összhossza',
        question: 'Egy kocka éle 7 cm. Mekkora a 12 élének összhossza?',
        options: ['84 cm', '42 cm', '49 cm', '98 cm'],
        correctAnswer: '84 cm',
        explanation: 'A kockának 12 egyenlő éle van: 12 · 7 = 84 cm.'
      },
      {
        id: 'q1-10',
        title: 'Mértékegység: liter és dm³',
        question: 'Hány liter víz fér egy pontosan 1 dm³ térfogatú edénybe?',
        options: ['1 liter', '10 liter', '0,1 liter', '100 liter'],
        correctAnswer: '1 liter',
        explanation: 'Alapvető űrmérték-összefüggés: 1 dm³ = 1 liter.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Háromoldalú Hasábok és Hiányzó Méretek',
    subtitle: 'Háromszög alapú hasábok, palástszámítás, hiányzó adatok és mértékegységek',
    description: '10 középfokú feladat számításokkal és átváltásokkal.',
    questions: [
      {
        id: 'q2-1',
        title: 'Háromoldalú hasáb térfogata',
        question: 'Egy hasáb alapja egy derékszögű háromszög, befogói 6 cm és 8 cm. A hasáb magassága 10 cm. Mekkora a térfogata?',
        options: ['240 cm³', '480 cm³', '120 cm³', '360 cm³'],
        correctAnswer: '240 cm³',
        figure: (
          <svg viewBox="0 0 100 85" className="w-28 h-24">
            <polygon points="20,70 75,70 45,55" fill="#ede9fe" stroke="#6366f1" strokeWidth="1.5" />
            <polygon points="20,30 75,30 45,15" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.5" />
            <polygon points="20,30 75,30 75,70 20,70" fill="#c4b5fd" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="1.5" />
            {/* Hungarian right angle on top triangle */}
            <path d="M 28 30 A 8 8 0 0 1 23 24" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="26" cy="27" r="0.8" fill="#e11d48" />
            <text x="47" y="79" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 6 cm</text>
            <text x="82" y="52" textAnchor="start" className="text-[8px] font-bold fill-indigo-700">M = 10 cm</text>
            <text x="32" y="21" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">b = 8 cm</text>
          </svg>
        ),
        explanation: 'Az alaplap területe Ta = (6 · 8) / 2 = 24 cm². A térfogat V = Ta · M = 24 · 10 = 240 cm³.'
      },
      {
        id: 'q2-2',
        title: 'Háromoldalú hasáb palástja',
        question: 'A 6 cm, 8 cm, 10 cm oldalú derékszögű háromszög alapú hasáb magassága M = 12 cm. Mekkora a palástja (Tp)?',
        options: ['288 cm²', '144 cm²', '576 cm²', '240 cm²'],
        correctAnswer: '288 cm²',
        explanation: 'Az alapkerület Ka = 6 + 8 + 10 = 24 cm. A palást Tp = Ka · M = 24 · 12 = 288 cm².'
      },
      {
        id: 'q2-3',
        title: 'Hiányzó él számítása téglatestnél',
        question: 'Egy téglatest térfogata V = 180 cm³. Két éle a = 5 cm és b = 4 cm. Milyen hosszú a harmadik él (c)?',
        options: ['9 cm', '8 cm', '10 cm', '6 cm'],
        correctAnswer: '9 cm',
        explanation: 'V = a · b · c ⟹ 180 = 5 · 4 · c = 20 · c ⟹ c = 180 / 20 = 9 cm.'
      },
      {
        id: 'q2-4',
        title: 'Kocka éle a térfogatból',
        question: 'Egy kocka térfogata 216 cm³. Mennyi a felszíne?',
        options: ['216 cm²', '144 cm²', '256 cm²', '180 cm²'],
        correctAnswer: '216 cm²',
        explanation: 'a³ = 216 ⟹ a = 6 cm. Felszíne A = 6 · a² = 6 · 36 = 216 cm². (Ennél a méretnél a mérőszámok megegyeznek!).'
      },
      {
        id: 'q2-5',
        title: 'Négyzetes oszlop térfogata',
        question: 'Egy egyenes hasáb alapja egy 4 cm oldalhosszúságú négyzet, testmagassága 15 cm. Mekkora a térfogata?',
        options: ['240 cm³', '120 cm³', '60 cm³', '480 cm³'],
        correctAnswer: '240 cm³',
        figure: (
          <svg viewBox="0 0 80 90" className="w-20 h-24">
            <polygon points="25,75 55,75 65,65 35,65" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="25,25 55,25 65,15 35,15" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="25,25 55,25 55,75 25,75" fill="#fef9c3" fillOpacity="0.4" stroke="#b45309" strokeWidth="1.5" />
            <polygon points="55,25 65,15 65,65 55,75" fill="#fed7aa" fillOpacity="0.5" stroke="#c2410c" strokeWidth="1.5" />
            <text x="40" y="85" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">a = 4 cm</text>
            <text x="18" y="50" textAnchor="end" className="text-[8px] font-bold fill-amber-700">M = 15 cm</text>
          </svg>
        ),
        explanation: 'Ta = 4² = 16 cm². V = Ta · M = 16 · 15 = 240 cm³.'
      },
      {
        id: 'q2-6',
        title: 'Mértékegység átváltás köbcentiméterből literbe',
        question: 'Egy akvárium belső térfogata 45 000 cm³. Hány liter víz fér bele?',
        options: ['45 liter', '4,5 liter', '450 liter', '0,45 liter'],
        correctAnswer: '45 liter',
        explanation: '1 liter = 1 dm³ = 1000 cm³. Ezért 45 000 cm³ = 45 dm³ = 45 liter.'
      },
      {
        id: 'q2-7',
        title: 'Alapterület visszaszámolása',
        question: 'Egy 14 cm testmagasságú hasáb térfogata 420 cm³. Mekkora az alapterülete (Ta)?',
        options: ['30 cm²', '25 cm²', '35 cm²', '40 cm²'],
        correctAnswer: '30 cm²',
        explanation: 'Ta = V / M = 420 / 14 = 30 cm².'
      },
      {
        id: 'q2-8',
        title: 'Élhosszúság duplázásának hatása a térfogatra',
        question: 'Hogyan változik egy kocka térfogata, ha minden élét a kétszeresére növeljük?',
        options: ['8-szorosára nő', '4-szeresére nő', '2-szeresére nő', '16-szorosára nő'],
        correctAnswer: '8-szorosára nő',
        explanation: 'V\' = (2a)³ = 8a³ = 8 · V. A térfogat a köbös arány miatt 2³ = 8-szorosára nő!'
      },
      {
        id: 'q2-9',
        title: 'Trapéz alapú hasáb térfogata',
        question: 'Egy hasáb alapja egy olyan trapéz, amelynek alapjai 7 cm és 5 cm, magassága 4 cm. A hasáb testmagassága 10 cm. Mennyi a térfogata?',
        options: ['240 cm³', '480 cm³', '120 cm³', '180 cm³'],
        correctAnswer: '240 cm³',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <polygon points="15,60 70,60 60,45 25,45" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
            <polygon points="15,30 70,30 60,15 25,15" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
            <polygon points="15,30 70,30 70,60 15,60" fill="#6ee7b7" fillOpacity="0.4" stroke="#047857" strokeWidth="1.5" />
            <polygon points="70,30 85,20 85,50 70,60" fill="#34d399" fillOpacity="0.4" stroke="#047857" strokeWidth="1.5" />
            <text x="42" y="68" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">a = 7 cm</text>
            <text x="42" y="24" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-700">c = 5 cm</text>
            <text x="88" y="40" textAnchor="start" className="text-[7.5px] font-bold fill-emerald-700">M = 10 cm</text>
          </svg>
        ),
        explanation: 'A trapéz területe Ta = ((7 + 5)/2) · 4 = 6 · 4 = 24 cm². V = Ta · M = 24 · 10 = 240 cm³.'
      },
      {
        id: 'q2-10',
        title: 'Nyitott doboz (fedél nélküli téglatest)',
        question: 'Egy felül nyitott téglatest alakú doboz élei a = 6 cm, b = 4 cm és c = 5 cm. Hány cm² karton kell hozzá?',
        options: ['124 cm²', '148 cm²', '100 cm²', '120 cm²'],
        correctAnswer: '124 cm²',
        explanation: 'Mivel nincs fedele, csak 1 alaplap van: A = ab + 2(ac + bc) = 24 + 2(30 + 20) = 24 + 100 = 124 cm².'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Gyakorlati, Szöveges és Összetett Feladatok',
    subtitle: 'Vízszint, tömeg, festett kockák, arányok és érettségi típusfeladatok',
    description: '10 komplex feladat logikai és valós életbeli alkalmazásokkal.',
    questions: [
      {
        id: 'q3-1',
        title: 'Akvárium vízszint emelkedése',
        question: 'Egy 50 cm hosszú és 40 cm széles akváriumba 20 liter vizet öntünk. Hány centiméterrel emelkedik meg a vízszint?',
        options: ['10 cm-rel', '5 cm-rel', '20 cm-rel', '8 cm-rel'],
        correctAnswer: '10 cm-rel',
        figure: (
          <svg viewBox="0 0 100 80" className="w-28 h-20">
            <polygon points="15,60 70,60 85,45 30,45" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="15,45 70,45 85,30 30,30" fill="#bae6fd" fillOpacity="0.8" stroke="#0284c7" strokeWidth="1" />
            <line x1="15" y1="20" x2="15" y2="60" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="60" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="85" y1="10" x2="85" y2="45" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="30" y1="10" x2="30" y2="45" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="2 2" />
            <polygon points="15,45 70,45 70,60 15,60" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1" />
            <text x="42" y="70" textAnchor="middle" className="text-[8px] font-bold fill-slate-700">50 cm</text>
            <text x="85" y="55" textAnchor="start" className="text-[8px] font-bold fill-slate-700">40 cm</text>
            <text x="10" y="52" textAnchor="end" className="text-[8px] font-bold fill-sky-700">Δm = ?</text>
          </svg>
        ),
        explanation: '20 liter = 20 dm³ = 20 000 cm³. Az alapterület Ta = 50 · 40 = 2000 cm². A magasságemelkedés: M = V / Ta = 20 000 / 2000 = 10 cm.'
      },
      {
        id: 'q3-2',
        title: 'Tömeg számítása sűrűségből',
        question: 'Egy vasból készült kocka éle 10 cm. A vas sűrűsége 7,8 g/cm³. Mekkora a kocka tömege?',
        options: ['7,8 kg (7800 g)', '780 g', '78 kg', '0,78 kg'],
        correctAnswer: '7,8 kg (7800 g)',
        explanation: 'V = 10³ = 1000 cm³. Tömeg m = ρ · V = 7,8 · 1000 = 7800 g = 7,8 kg.'
      },
      {
        id: 'q3-3',
        title: 'Festett kockák száma (Klasszikus versenyfeladat)',
        question: 'Egy pirosra festett 3×3×3-as nagy kockát 27 darab 1 cm-es kiskockára vágunk. Hány kiskockának lesz PONTOSAN 3 lapja piros?',
        options: ['8 db (a csúcsoknál lévők)', '12 db', '6 db', '1 db'],
        correctAnswer: '8 db (a csúcsoknál lévők)',
        figure: (
          <svg viewBox="0 0 90 80" className="w-24 h-20">
            <rect x="20" y="30" width="45" height="45" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="35" y1="30" x2="35" y2="75" stroke="#dc2626" strokeWidth="1" />
            <line x1="50" y1="30" x2="50" y2="75" stroke="#dc2626" strokeWidth="1" />
            <line x1="20" y1="45" x2="65" y2="45" stroke="#dc2626" strokeWidth="1" />
            <line x1="20" y1="60" x2="65" y2="60" stroke="#dc2626" strokeWidth="1" />
            <polygon points="20,30 65,30 80,15 35,15" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <polygon points="65,30 80,15 80,60 65,75" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="20" cy="30" r="3" fill="#b91c1c" />
            <circle cx="65" cy="30" r="3" fill="#b91c1c" />
            <circle cx="80" cy="15" r="3" fill="#b91c1c" />
            <circle cx="20" cy="75" r="3" fill="#b91c1c" />
            <circle cx="65" cy="75" r="3" fill="#b91c1c" />
            <text x="45" y="55" textAnchor="middle" className="text-[8px] font-black fill-red-950">3×3×3</text>
          </svg>
        ),
        explanation: 'Csak a 8 csúcsban lévő kiskockának van 3 festett külső lapja. (Az élközépi 12-nek 2, az oldalközépi 6-nak 1, a belsőnek 0).'
      },
      {
        id: 'q3-4',
        title: 'Festetlen kiskockák száma',
        question: 'A 3×3×3-as piros kocka 27 kiskockája közül hány darabnak nem lesz egyetlen lapja sem befestve?',
        options: ['1 db (a legbelső)', '3 db', '0 db', '6 db'],
        correctAnswer: '1 db (a legbelső)',
        explanation: 'A teljesen belső réteg egyetlen darab 1×1×1-es kockából áll: (3 - 2)³ = 1³ = 1 db.'
      },
      {
        id: 'q3-5',
        title: 'Téglatest élarányai',
        question: 'Egy téglatest éleinek aránya a : b : c = 1 : 2 : 3, térfogata 48 cm³. Mekkora a leghosszabb éle?',
        options: ['6 cm', '4 cm', '8 cm', '12 cm'],
        correctAnswer: '6 cm',
        explanation: 'Élek: x, 2x, 3x. V = x · 2x · 3x = 6x³ = 48 ⟹ x³ = 8 ⟹ x = 2 cm. A leghosszabb él 3x = 3 · 2 = 6 cm.'
      },
      {
        id: 'q3-6',
        title: 'Medence csempézése',
        question: 'Egy 10 m hosszú, 5 m széles és 2 m mély medence alját és 4 oldalfalát kicsempézik. Hány m² a csempézendő felület?',
        options: ['110 m²', '160 m²', '100 m²', '120 m²'],
        correctAnswer: '110 m²',
        explanation: 'Alja: 10 · 5 = 50 m². Oldalai: 2 · (10·2 + 5·2) = 2 · (20 + 10) = 60 m². Összesen: 50 + 60 = 110 m².'
      },
      {
        id: 'q3-7',
        title: 'Pitagorasz-tétel hasábban',
        question: 'Egy derékszögű háromszög alapú hasáb befogói 5 cm és 12 cm. A testmagasság M = 10 cm. Mennyi a teljes felszíne?',
        options: ['360 cm²', '300 cm²', '420 cm²', '240 cm²'],
        correctAnswer: '360 cm²',
        explanation: 'Az átfogó c = √(5² + 12²) = 13 cm. Ta = (5 · 12) / 2 = 30 cm². Ka = 5 + 12 + 13 = 30 cm. A = 2Ta + Ka · M = 2·30 + 30·10 = 60 + 300 = 360 cm².'
      },
      {
        id: 'q3-8',
        title: 'Kocka felolvasztása téglatestté',
        question: 'Egy 6 cm élű tömör fémkockát átolvasztanak egy olyan téglatestté, melynek alapja 4 cm × 9 cm. Milyen magas lesz a téglatest?',
        options: ['6 cm', '8 cm', '5 cm', '7 cm'],
        correctAnswer: '6 cm',
        explanation: 'A térfogat változatlan: V = 6³ = 216 cm³. A téglatest alapterülete Ta = 4 · 9 = 36 cm². Magasság M = 216 / 36 = 6 cm.'
      },
      {
        id: 'q3-9',
        title: 'Felszín és térfogat egyenlő mérőszáma kockánál',
        question: 'Mekkora az éle annak a kockának, amelynél a felszín cm²-ben és a térfogat cm³-ben kifejezett mérőszáma megegyezik?',
        options: ['6 cm', '1 cm', '4 cm', '8 cm'],
        correctAnswer: '6 cm',
        explanation: '6 · a² = a³ ⟹ ha a ≠ 0, mindkét oldalt osztva a²-tel: a = 6 cm.'
      },
      {
        id: 'q3-10',
        title: 'Üreges hasáb térfogata',
        question: 'Egy 10 cm magas fa hasáb alapterülete 50 cm². Középen egy 10 cm magas, 10 cm² alapterületű üreg van. Mennyi a faanyag térfogata?',
        options: ['400 cm³', '500 cm³', '600 cm³', '300 cm³'],
        correctAnswer: '400 cm³',
        explanation: 'V_fa = V_külső - V_belső = 50 · 10 - 10 · 10 = 500 - 100 = 400 cm³.'
      }
    ]
  }
};

const cheatSheetCards = [
  {
    title: 'Felszín (A)',
    formula: 'A = 2 · Ta + Tp',
    explanation: '2 db alaplap területe + kiterített téglalap palást (Ka · M).'
  },
  {
    title: 'Térfogat (V)',
    formula: 'V = Ta · M',
    explanation: 'Alapterület szorozva a hasáb testmagasságával.'
  },
  {
    title: 'Kocka képletek',
    formula: 'A = 6a²  és  V = a³',
    explanation: '6 egybevágó négyzetlap határolja, 12 egyenlő éle van.'
  },
  {
    title: 'Téglatest képletek',
    formula: 'A = 2(ab + bc + ac), V = a · b · c',
    explanation: 'Páronként egybevágó szemközti téglalaplapok.'
  },
  {
    title: 'Mértékegységek',
    formula: '1 dm³ = 1 liter = 1000 cm³',
    explanation: '1 m³ = 1000 dm³ = 1000 liter.'
  }
];

export const PrismSurfaceVolumeQuiz: React.FC<PrismSurfaceVolumeQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="9. A hasáb felszíne és térfogata Kvíz"
      subtitle="Gyakorold a hasábok és a kocka felszínének és térfogatának kiszámítását 3 nehézségi szinten!"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA"
      topicId="g7-geom-prism-surface-volume"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={
        <PrismSurfaceVolumeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PrismSurfaceVolumeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any) => (
        <PrismSurfaceVolumeMatcher
          {...props}
          key={`prism-matcher-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(props: any) => (
        <PrismSurfaceVolumeSorter
          {...props}
          key={`prism-sorter-lvl-${props?.level || 1}`}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
