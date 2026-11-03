import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticalMatcher } from './PracticalMatcher';
import { PracticalSorter } from './PracticalSorter';
import {
  BreakEvenSvg,
  ProjectileMotionSvg,
  GeometricOptSvg
} from './PracticalFigures';
import { BookOpen, Target, Sparkles, AlertTriangle, CheckCircle, HelpCircle, DollarSign, Rocket, Maximize2 } from 'lucide-react';

export interface PracticalQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Gyakorlati Modellek (Könnyű)',
    subtitle: 'Költség- és bevételfüggvények felírása, egyenletes mozgások és a változók értelmezése.',
    range: '1 - 10. feladat',
    focus: 'Költség, Bevétel & Mozgás',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Költségmodell',
        question: 'Egy pizzasütő cég fix havi bérleti díja 80 000 Ft, egy pizza elkészítésének alapanyag- és rezsiköltsége pedig 1200 Ft. Mi az x darab pizza előállítási összköltségének függvénye?',
        figure: <BreakEvenSvg size={240} />,
        options: [
          'K(x) = 80 000 + 1200x',
          'K(x) = 80 000 · 1200x',
          'K(x) = 1200x - 80 000',
          'K(x) = 80 000 / (1200x)'
        ],
        correctAnswer: 0,
        hint: 'Az összköltség = fix költség + változó költség (darabszám · darabár).',
        explanation: 'A fix költség (80 000 Ft) a tengelymetszet, a darabonkénti önköltség (1200 Ft) a meredekség: K(x) = 80 000 + 1200x.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Árbevétel',
        question: 'Ha a pizzákat darabonként 2800 Ft-ért értékesítik, melyik függvény adja meg az x darab eladásából származó teljes árbevételt?',
        options: [
          'B(x) = 2800x',
          'B(x) = 2800 + x',
          'B(x) = 2800x - 80 000',
          'B(x) = x / 2800'
        ],
        correctAnswer: 0,
        hint: 'A bevétel = eladott darabszám szorozva a fogyasztói egységárral.',
        explanation: 'Az árbevétel az eladott x darab és a 2800 Ft-os egységár szorzata: B(x) = 2800x.'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Fedezeti Pont Fogalma',
        question: 'Mit jelent a gazdasági modellekben a fedezeti pont (Break-even point)?',
        options: [
          'Azt az eladási darabszámot, ahol az árbevétel éppen egyenlő az összköltséggel (a nyereség pontosan 0)',
          'A maximális elérhető nyereség pontját',
          'Ahol a cég a legnagyobb veszteséget szenvedi el',
          'A beszállítói árengedmény kezdetét'
        ],
        correctAnswer: 0,
        hint: 'Itt fedi le a bevétel pontosan az összes kiadást, se nem nyerünk, se nem veszítünk.',
        explanation: 'A fedezeti pontban B(x) = K(x), azaz a profit P(x) = B(x) - K(x) = 0. E pont felett a cég már nyereséges.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Egyenletes Mozgás',
        question: 'Egy személyvonat állandó 80 km/h sebességgel halad. Mi a megtett út s(t) függvénye az eltelt idő (t, órában) függvényében?',
        options: [
          's(t) = 80t',
          's(t) = 80 + t',
          's(t) = 80 / t',
          's(t) = 40t²'
        ],
        correctAnswer: 0,
        hint: 'Egyenletes mozgásnál: út = sebesség · idő (s = v · t).',
        explanation: 'Az egyenletes mozgás út-idő függvénye s(t) = v · t = 80t, ami egy origóból induló egyenes.'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Kezdőmagasság',
        question: 'Egy kő magasságát a talaj felett a h(t) = -5t² + 20t képlet modellezi. Milyen magasan van a kő az indítás pillanatában (t = 0 s)?',
        figure: <ProjectileMotionSvg size={240} />,
        options: [
          'h(0) = 0 méter (a talaj szintjéről lőtték ki)',
          'h(0) = 20 méter',
          'h(0) = -5 méter',
          'h(0) = 15 méter'
        ],
        correctAnswer: 0,
        hint: 'Helyettesíts be t = 0-t a képletbe: h(0) = -5(0)² + 20(0).',
        explanation: 'h(0) = -5(0)² + 20(0) = 0 méter. A mozgás közvetlenül a talajról indul.'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Autóbérlés Költsége',
        question: 'Egy autókölcsönző alapdíja 15 000 Ft, plusz kilométerenként 80 Ft üzemeltetési díj. Mennyibe kerül egy 200 km-es bérlés?',
        options: [
          '31 000 Ft',
          '16 000 Ft',
          '25 000 Ft',
          '40 000 Ft'
        ],
        correctAnswer: 0,
        hint: 'f(x) = 15 000 + 80x. Számold ki f(200)-at!',
        explanation: 'Költség: 15 000 + 80 · 200 = 15 000 + 16 000 = 31 000 Ft.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Tartály Ürülése',
        question: 'Egy kerti medencében 1200 liter víz van. A leeresztő csapon percenként 40 liter víz folyik ki. Mennyi víz marad benne 10 perc után?',
        options: [
          '800 liter',
          '400 liter',
          '1160 liter',
          '1000 liter'
        ],
        correctAnswer: 0,
        hint: 'V(t) = 1200 - 40t. Helyettesíts be t = 10-et!',
        explanation: 'V(10) = 1200 - 40 · 10 = 1200 - 400 = 800 liter.'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Geometriai Félkerület',
        question: 'Egy téglalap kerülete 40 méter. Ha az egyik oldal hossza x, melyik kifejezés adja meg a másik oldal hosszát?',
        figure: <GeometricOptSvg size={240} />,
        options: [
          '20 - x',
          '40 - x',
          '40 - 2x',
          'x / 2'
        ],
        correctAnswer: 0,
        hint: 'A téglalap kerülete K = 2(a + b) = 40, így a félkerület a + b = 20.',
        explanation: 'Mivel 2(x + y) = 40 ⟹ x + y = 20 ⟹ y = 20 - x.'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Reális Tartomány',
        question: 'Miért nem lehet egy gyár termelési költségfüggvényének értelmezési tartománya negatív szám?',
        options: [
          'Mert a valóságban nem lehet negatív darabszámú terméket legyártani (x ≥ 0)',
          'Mert a negatív számoknak nincs négyzete',
          'Mert a pénzösszeg sosem lehet negatív',
          'Mert az értelmezési tartomány mindig a természetes számok végtelenje'
        ],
        correctAnswer: 0,
        hint: 'A termékek fizikailag létező darabszámok: 0, 1, 2, ...',
        explanation: 'A darabszám fizikai mennyiség, darabszámra csak nemnegatív egész számok értelmezhetők a valóságban (x ∈ ℕ₀).'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Modell Típusa',
        question: 'Egy taxi viteldíja 1100 Ft alapdíjból és 440 Ft kilométerdíjból áll. Milyen függvénycsaládba tartozik ez a modell?',
        options: [
          'Lineáris függvény (f(x) = 440x + 1100)',
          'Másodfokú függvény',
          'Négyzetgyök-függvény',
          'Fordított arányosság'
        ],
        correctAnswer: 0,
        hint: 'A költség kilométerenként egyenletesen, állandó összeggel nő: mx + b.',
        explanation: 'A függvény képlete f(x) = 440x + 1100, ami egy elsőfokú, lineáris függvény.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és Szélsőérték-feladatok (Közepes)',
    subtitle: 'Fedezeti pont számítása, parabola tetőpontja és geometriai területmaximalizálás.',
    range: '11 - 20. feladat',
    focus: 'Fedezet & Parabola Csúcspont',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'Fedezeti Számítás',
        question: 'K(x) = 50 000 + 1000x és az eladási darabár p = 3000 Ft. Hány darab terméket kell eladni a fedezeti ponthoz?',
        figure: <BreakEvenSvg size={240} />,
        options: [
          'x = 25 darabot',
          'x = 50 darabot',
          'x = 20 darabot',
          'x = 100 darabot'
        ],
        correctAnswer: 0,
        hint: 'B(x) = K(x) ⟹ 3000x = 50 000 + 1000x ⟹ 2000x = 50 000.',
        explanation: 'Egy termék haszna: 3000 - 1000 = 2000 Ft. A fedezeti darabszám: 50 000 / 2000 = 25 darab.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'Hajítás Tetőpontja',
        question: 'Egy felhajított kő magasságát a h(t) = -5t² + 30t képlet írja le méterben. Hány másodperc múlva és milyen magasan van a kő a legmagasabb pontján?',
        figure: <ProjectileMotionSvg size={240} />,
        options: [
          't = 3 másodperc múlva éri el a maximális 45 méter magasságot',
          't = 6 másodperc múlva éri el a 30 métert',
          't = 3 másodperc múlva éri el a 30 métert',
          't = 5 másodperc múlva éri el a 45 métert'
        ],
        correctAnswer: 0,
        hint: '-5(t² - 6t) = -5((t - 3)² - 9) = -5(t - 3)² + 45.',
        explanation: 'h(t) = -5(t - 3)² + 45. A parabola csúcspontja C(3; 45), azaz 3 másodperc múlva 45 méter magasan van.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Hordó Kiürülése',
        question: 'Egy 600 literes hordó a V(t) = 600 - 25t képlet szerint ürül (t perc). Hány perc alatt ürül ki teljesen a hordó?',
        options: [
          '24 perc alatt',
          '25 perc alatt',
          '20 perc alatt',
          '30 perc alatt'
        ],
        correctAnswer: 0,
        hint: 'Oldd meg a V(t) = 0 egyenletet: 600 - 25t = 0.',
        explanation: '600 - 25t = 0 ⟹ 25t = 600 ⟹ t = 24 perc.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Téglalap Optimalizálás',
        question: 'Egy téglalap kerülete 28 cm. Területe T(x) = x(14 - x) = -x² + 14x. Milyen oldalhossz mellett lesz maximális a terület, és mennyi ez a maximum?',
        options: [
          'x = 7 cm esetén a maximális terület 49 cm²',
          'x = 14 cm esetén a maximális terület 196 cm²',
          'x = 6 cm esetén a maximális terület 48 cm²',
          'x = 7 cm esetén a maximális terület 28 cm²'
        ],
        correctAnswer: 0,
        hint: '-x² + 14x = -(x - 7)² + 49. A csúcspont x = 7-ben van.',
        explanation: 'T(x) = -(x - 7)² + 49. A csúcs x = 7 cm-nél van (amikor a téglalap négyzet), és a maximális terület 49 cm².'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Tetőről Dobott Labda',
        question: 'Egy labdát 25 m magas tetőről dobnak fel: h(t) = -5t² + 20t + 25. Hány másodperc múlva csapódik a talajba a labda (h = 0)?',
        options: [
          't = 5 másodperc múlva',
          't = 4 másodperc múlva',
          't = 2.5 másodperc múlva',
          't = 6 másodperc múlva'
        ],
        correctAnswer: 0,
        hint: 'Ossz le -5-tel: t² - 4t - 5 = 0 ⟹ (t - 5)(t + 1) = 0.',
        explanation: '-5t² + 20t + 25 = 0 ⟹ t² - 4t - 5 = 0 ⟹ (t - 5)(t + 1) = 0. Mivel t > 0, t = 5 másodperc múlva ér földet.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Kívánt Profit Számítása',
        question: 'Egy pólónyomó cég fix költsége 90 000 Ft, egy póló önköltsége 1500 Ft, eladási ára 4500 Ft. Hány darab eladásakor lesz a tiszta profit 60 000 Ft?',
        options: [
          '50 darab eladásakor',
          '30 darab eladásakor',
          '40 darab eladásakor',
          '60 darab eladásakor'
        ],
        correctAnswer: 0,
        hint: 'Profit: P(x) = (4500 - 1500)x - 90 000 = 3000x - 90 000 = 60 000.',
        explanation: '3000x - 90 000 = 60 000 ⟹ 3000x = 150 000 ⟹ x = 50 darab.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Fékút Számítás',
        question: 'Egy autó fékútja 50 km/h-nál száraz úton 15 méter. Mivel a fékút a sebesség négyzetével arányos (s = k · v²), mekkora a fékút 100 km/h-nál?',
        options: [
          '60 méter (a duplázódó sebesség 4-szeres fékutat eredményez)',
          '30 méter',
          '45 méter',
          '100 méter'
        ],
        correctAnswer: 0,
        hint: 'A sebesség a kétszeresére nő: 100 / 50 = 2. A fékút 2² = 4-szeresére nő.',
        explanation: 'Mivel a fékút négyzetesen függ a sebességtől: s(100) = s(50) · (100/50)² = 15 · 4 = 60 méter.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Gyertya Leégése',
        question: 'Egy 24 cm magas díszgyertya óránként 1.5 cm-t ég le. Mi a gyertya magasságának függvénye és hány óra alatt ég el teljesen?',
        options: [
          'L(t) = 24 - 1.5t, és 16 óra alatt ég el',
          'L(t) = 24 + 1.5t, és 16 óra alatt ég el',
          'L(t) = 24 - 1.5t, és 24 óra alatt ég el',
          'L(t) = 1.5t, és 12 óra alatt ég el'
        ],
        correctAnswer: 0,
        hint: '24 - 1.5t = 0 ⟹ 1.5t = 24 ⟹ t = 24 / 1.5.',
        explanation: 'A magasság L(t) = 24 - 1.5t. Elégéskor L(t) = 0 ⟹ 1.5t = 24 ⟹ t = 16 óra.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Színházi Fedezet',
        question: 'Egy előadás terem- és színészi tiszteletdíja összesen 120 000 Ft. A belépőjegy ára 2000 Ft. Minimum hány nézőnek kell jegyet váltania a nullszaldóhoz?',
        options: [
          'Legalább 60 nézőnek',
          'Legalább 50 nézőnek',
          'Legalább 120 nézőnek',
          'Legalább 80 nézőnek'
        ],
        correctAnswer: 0,
        hint: '120 000 / 2000 = 60.',
        explanation: 'A költségek megtérüléséhez 120 000 / 2000 = 60 eladott jegy szükséges.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Sávos Tarifacsomag',
        question: 'Egy mobilcsomag havidíja 2500 Ft (100 lebeszélhető perccel). A limit felett minden perc 35 Ft. Mennyit fizet az, aki 160 percet beszélt a hónapban?',
        options: [
          '4600 Ft',
          '5600 Ft',
          '3500 Ft',
          '4100 Ft'
        ],
        correctAnswer: 0,
        hint: '100 perc benne van a havidíjban, a túlbeszélés 160 - 100 = 60 perc.',
        explanation: 'Költség: 2500 + (160 - 100) · 35 = 2500 + 60 · 35 = 2500 + 2100 = 4600 Ft.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Elemzések és Optimalizáció (Nehéz)',
    subtitle: 'Ajánlatok összehasonlítása, optimális kerítésméretek és piaci ármeghatározás.',
    range: '21 - 30. feladat',
    focus: 'Összehasonlítás & Extrém Optimalizálás',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Két Ajánlat Metszéspontja',
        question: 'Két fénymásoló szerviz ajánlata: "A" havi 10 000 Ft alapdíj + 8 Ft/oldal; "B" nincs alapdíj, de 12 Ft/oldal. Hány oldal esetén egyenlő a költség, és mikor éri meg a "B" szerviz?',
        figure: <BreakEvenSvg size={240} />,
        options: [
          '2500 oldal esetén egyenlő a költség, és 2500 oldal alatt éri meg a "B" szerviz',
          '1000 oldal esetén egyenlő, és 1000 oldal felett éri meg a "B"',
          '2500 oldal esetén egyenlő, és 2500 oldal felett éri meg a "B"',
          'Soha nem éri meg a "B" szerviz'
        ],
        correctAnswer: 0,
        hint: '10 000 + 8x = 12x ⟹ 4x = 10 000 ⟹ x = 2500. Kis darabszámnál a fix költség nélküli az olcsóbb!',
        explanation: '10 000 + 8x = 12x ⟹ 4x = 10 000 ⟹ x = 2500. 2500 oldal alatt a "B" cég olcsóbb, felette az "A" a kedvezőbb alacsonyabb oldalankénti díj miatt.'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Folyóparti Legelő',
        question: 'Egy folyóparton 80 m kerítéssel kerítünk el téglalap alakú telket (a folyó felőli oldalon nincs kerítés: 2x + y = 80). Milyen x mélység és y szélesség mellett lesz a terület maximális, és mennyi ez a terület?',
        figure: <GeometricOptSvg size={240} />,
        options: [
          'x = 20 m mélység, y = 40 m szélesség mellett a maximális terület 800 m²',
          'x = 26.6 m, y = 26.6 m mellett a maximális terület 711 m²',
          'x = 10 m, y = 60 m mellett a maximális terület 600 m²',
          'x = 20 m, y = 20 m mellett a maximális terület 400 m²'
        ],
        correctAnswer: 0,
        hint: 'T(x) = x(80 - 2x) = -2x² + 80x = -2(x - 20)² + 800.',
        explanation: 'T(x) = -2x² + 80x = -2(x - 20)² + 800. A csúcsponton x = 20 m, ekkor y = 80 - 2(20) = 40 m, és T_max = 800 m².'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Piaci Ár-Optimalizálás',
        question: 'Egy színházban 4000 Ft-os jegyárnál 300 néző van. Minden 200 Ft-os áremelésnél 10-zel kevesebb néző érkezik. Milyen jegyár maximalizálja a színház bevételét?',
        options: [
          '5000 Ft-os jegyár (ekkor 250 néző lesz, a maximális bevétel 1 250 000 Ft)',
          '4000 Ft-os jegyár (1 200 000 Ft)',
          '6000 Ft-os jegyár (1 200 000 Ft)',
          '4500 Ft-os jegyár (1 237 500 Ft)'
        ],
        correctAnswer: 0,
        hint: 'Legyen k a 200 Ft-os emelések száma: Ár = 4000 + 200k, Nézők = 300 - 10k. B(k) = (4000 + 200k)(300 - 10k).',
        explanation: 'B(k) = -2000k² + 20 000k + 1 200 000. Csúcspont: k = 20 000 / (2 · 2000) = 5 emelés. Az optimális jegyár 4000 + 5 · 200 = 5000 Ft.'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Teljes Megállási Út',
        question: 'Egy autó megállási távolsága a reakcióidő alatti útból (s_r = v/3.6) és a fékútból (s_f = 0.006v²) áll. Körülbelül mennyi a megállási távolság 50 km/h és 100 km/h sebességnél?',
        options: [
          '50 km/h-nál kb. 29 m, míg 100 km/h-nál kb. 88 m (a fékút háromszorosa lesz!)',
          '50 km/h-nál kb. 20 m, 100 km/h-nál kb. 40 m',
          '50 km/h-nál kb. 15 m, 100 km/h-nál kb. 60 m',
          'Mindkét esetben 50 méter'
        ],
        correctAnswer: 0,
        hint: '50-nél: 50/3.6 ≈ 13.9 m + 0.006 · 2500 = 15 m ⟹ 28.9 m. 100-nál: 100/3.6 ≈ 27.8 m + 0.006 · 10000 = 60 m ⟹ 87.8 m.',
        explanation: 'A reakcióút lineárisan (duplázódva), a fékút viszont négyszereződve nő! Ezért 100 km/h-nál a teljes megállási távolság majdnem a háromszorosa (88 m).'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Doboz Alapterülete',
        question: 'Egy 20 cm × 20 cm-es kartonlap négy sarkából x cm oldalú négyzeteket vágunk ki dobozkészítéshez. Mi a doboz alapterületének A(x) függvénye (0 < x < 10)?',
        options: [
          'A(x) = (20 - 2x)² = 4x² - 80x + 400',
          'A(x) = 20 - 2x',
          'A(x) = 400 - 4x²',
          'A(x) = (20 - x)²'
        ],
        correctAnswer: 0,
        hint: 'Mindkét irányban 2 darab x méretű sarkot vágunk le, így a fenék oldala 20 - 2x.',
        explanation: 'A doboz alja egy négyzet, melynek oldala 20 - 2x. Területe: A(x) = (20 - 2x)² = 4x² - 80x + 400.'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Hegyi Túra Átlagsebesség',
        question: 'Egy túrázó felfelé 3 km/h, visszafelé ugyanazon az úton 5 km/h sebességgel haladt. A teljes túra 4 órát vett igénybe. Milyen messze volt a hegycsúcs?',
        options: [
          '7.5 km távolságra',
          '8 km távolságra',
          '15 km távolságra',
          '6 km távolságra'
        ],
        correctAnswer: 0,
        hint: 'Idők összege: s/3 + s/5 = 4 ⟹ 8s/15 = 4 ⟹ 8s = 60.',
        explanation: 's/3 + s/5 = 4 ⟹ (5s + 3s)/15 = 4 ⟹ 8s = 60 ⟹ s = 7.5 km.'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Keresleti Bevétel',
        question: 'Egy termék napi keresletét a D(p) = 500 - 2p függvény adja meg (p forintos ár). Milyen ár mellett maximális a napi árbevétel: B(p) = p · (500 - 2p)?',
        options: [
          'p = 125 Ft eladási ár mellett a maximális bevétel 31 250 Ft',
          'p = 250 Ft ár mellett a bevétel 50 000 Ft',
          'p = 100 Ft ár mellett a bevétel 30 000 Ft',
          'p = 500 Ft ár mellett'
        ],
        correctAnswer: 0,
        hint: 'B(p) = -2p² + 500p = -2(p² - 250p) = -2(p - 125)² + 31 250.',
        explanation: 'B(p) = -2(p - 125)² + 31 250. A parabola csúcspontja p = 125 Ft-nál van, ahol a maximális árbevétel 31 250 Ft.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Üldözési Mozgás',
        question: 'Egy autó 60 km/h-val indul, fél órával később egy motoros indul utána ugyanazon az úton 90 km/h-val. Hány órával a motoros indulása után éri utol az autót?',
        options: [
          '1 óra múlva',
          '1.5 óra múlva',
          '2 óra múlva',
          '0.5 óra múlva'
        ],
        correctAnswer: 0,
        hint: 'Az autó előnye fél óra alatt 30 km. A relatív sebességük 90 - 60 = 30 km/h.',
        explanation: 'Az autó előnye: 60 · 0.5 = 30 km. A motoros óránként 90 - 60 = 30 km-t hoz rajta, így 30 / 30 = 1 óra múlva éri utol.'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Két Csap Töltése',
        question: 'Egy 120 m³-es medencét két csapon keresztül töltenek: az első 150 l/perc, a második 250 l/perc vizet szolgáltat. Hány óra alatt telik meg a medence?',
        options: [
          '5 óra alatt',
          '6 óra alatt',
          '4 óra alatt',
          '8 óra alatt'
        ],
        correctAnswer: 0,
        hint: 'Együttes hozam: 150 + 250 = 400 liter/perc = 24 000 l/óra = 24 m³/óra. 120 / 24 = 5.',
        explanation: 'A két csap együtt 400 l/perc = 24 m³/h vizet ad. A 120 m³-es medence feltöltéséhez 120 / 24 = 5 óra szükséges.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Heti Profit Csúcs',
        question: 'Egy cég heti profitját a termelt x darab függvényében a P(x) = -0.5x² + 80x - 1200 függvény írja le (ezer Ft-ban). Hány darab termelésénél maximális a profit?',
        options: [
          'x = 80 darab esetén a maximális heti profit 2000 (ezer Ft)',
          'x = 40 darab esetén',
          'x = 100 darab esetén',
          'x = 160 darab esetén'
        ],
        correctAnswer: 0,
        hint: '-0.5(x² - 160x) - 1200 = -0.5((x - 80)² - 6400) - 1200 = -0.5(x - 80)² + 3200 - 1200 = -0.5(x - 80)² + 2000.',
        explanation: 'P(x) = -0.5(x - 80)² + 2000. A csúcspont x = 80 darabnál van, ekkor a maximális profit 2000 ezer Ft (2 millió Ft).'
      }
    ]
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Költség, Bevétel, Fedezet',
    icon: <DollarSign className="w-5 h-5 text-amber-400" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>Összköltség:</strong> K(x) = K_fix + v · x</p>
        <p><strong>Árbevétel:</strong> B(x) = p · x</p>
        <p><strong>Nyereség:</strong> P(x) = B(x) - K(x)</p>
        <p><strong className="text-amber-300">Fedezeti pont:</strong> x_fed = K_fix / (p - v).</p>
      </div>
    )
  },
  {
    title: 'Hajítási Mozgásegyenlet',
    icon: <Rocket className="w-5 h-5 text-sky-400" />,
    color: 'sky',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>h(t) = -5t² + v₀t + h₀</strong> (g ≈ 10 m/s²)</p>
        <p><strong className="text-sky-300">Csúcsidő:</strong> t_csúcs = v₀ / 10</p>
        <p><strong className="text-emerald-300">Max magasság:</strong> h(t_csúcs)</p>
        <p><strong className="text-rose-300">Földet érés:</strong> h(t) = 0 pozitív gyöke.</p>
      </div>
    )
  },
  {
    title: 'Geometriai Szélsőérték',
    icon: <Maximize2 className="w-5 h-5 text-emerald-400" />,
    color: 'emerald',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>4 oldalú téglalap:</strong> K rögzített ⟹ négyzetnél maximális a terület (a = b = K/4).</p>
        <p><strong>3 oldalú (pl. folyópart):</strong> 2x + y = L ⟹ T(x) = x(L - 2x), maximum ha y = 2x!</p>
      </div>
    )
  },
  {
    title: 'Fékút Négyzetes Szabálya',
    icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
    color: 'rose',
    content: (
      <div className="space-y-1.5 text-xs text-slate-300">
        <p><strong>s_fék = k · v²</strong></p>
        <p>Ha a sebesség 2-szeres ⟹ fékút <strong>4-szeres</strong>!</p>
        <p>Ha a sebesség 3-szoros ⟹ fékút <strong>9-szeres</strong>!</p>
      </div>
    )
  }
];

export const PracticalQuiz: React.FC<PracticalQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      chapterId="fuggvenyek"
      topicId="gyakorlati-feladatok"
      badgeLabel="9. OSZTÁLY • V. FÜGGVÉNYEK"
      title="Gyakorlati Feladatok & Modellezés Kvíz"
      subtitle="30 életszerű feladat 3 szinten: a fix és változó költségektől kezdve a fedezeti pontokon és fizikai hajításokon át a piaci ár- és területoptimalizálásig."
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        onSwitchToMatcher ? (
          <PracticalMatcher
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToSorter={onSwitchToSorter}
          />
        ) : undefined
      }
      sorterComponent={
        onSwitchToSorter ? (
          <PracticalSorter
            onBack={onBack}
            onSwitchToTheory={onSwitchToTheory}
            onSwitchToQuiz={() => {}}
            onSwitchToMatcher={onSwitchToMatcher}
          />
        ) : undefined
      }
    />
  );
};

