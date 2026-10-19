import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { GridLocationMatcher } from './GridLocationMatcher';
import { GridLocationSorter } from './GridLocationSorter';

export interface GridLocationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const GRID_LOCATION_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: RÁCSHÁLÓK, SAKKTÁBLA ÉS TORPEDÓ ALAPOK (1-10)
  // =========================================================================
  {
    id: 'glq1-1',
    level: 1,
    prompt: 'Hány darab négyzet alakú mezőből áll a nemzetközi szabványos sakktábla?',
    options: [
      '64 mezőből (8 sor × 8 oszlop)',
      '100 mezőből (10 × 10)',
      '32 mezőből',
      '48 mezőből'
    ],
    correctAnswer: 0,
    explanation: 'A sakktábla egy 8×8-as négyzetháló, amely 8 · 8 = 64 mezőből áll: pontosan 32 világos és 32 sötét mező váltogatja egymást.',
    hint: 'Szorozd össze a sorok számát (8) az oszlopok számával (8)!',
    breakdown: [
      { label: 'Oszlopok száma', value: '8 (a-h)' },
      { label: 'Sorok száma', value: '8 (1-8)' },
      { label: 'Összes mező', value: '8 · 8 = 64 mező' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 120 120">
        <rect x="10" y="10" width="100" height="100" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(r =>
          [0, 1, 2, 3, 4, 5, 6, 7].map(c => (
            (r + c) % 2 === 1 && (
              <rect key={`${r}-${c}`} x={10 + c * 12.5} y={10 + r * 12.5} width="12.5" height="12.5" fill="#b45309" />
            )
          ))
        )}
      </svg>
    )
  },
  {
    id: 'glq1-2',
    level: 1,
    prompt: 'A sakktábla mezőinek megadásakor (pl. „e4”) mit fejez ki az „e” betű és a „4”-es szám?',
    options: [
      'Az „e” a függőleges oszlopot, a „4” pedig a vízszintes sort jelöli',
      'Az „e” a figurát jelöli, a „4” a játékos életkorát',
      'Az „e” a sort jelöli, a „4” az oszlopot',
      'A pontszámot jelölik a sakkjátszmában'
    ],
    correctAnswer: 0,
    explanation: 'A nemzetközi szabály szerint mindig az oszlop betűje áll elöl (a-h balról jobbra), és a sor száma hátul (1-8 alulról felfelé). Az e4 az „e” oszlop és a 4. sor metszéspontja.',
    hint: 'Gondolj a szabályra: oszlop (betű) elöl, sor (szám) hátul!'
  },
  {
    id: 'glq1-3',
    level: 1,
    prompt: 'A sakktábla szabályos felállításakor milyen színű mezőnek kell lennie a játékos jobb alsó sarkában?',
    options: [
      'Világos (fehér) mezőnek',
      'Sötét (fekete) mezőnek',
      'Mindegy, nincs rá szabály',
      'Kék színű mezőnek'
    ],
    correctAnswer: 0,
    explanation: 'A sakk aranyszabálya: „fehér a jobb sarokban” (white on right). A világos játékos szemszögéből a h1 mező világos, a sötét játékos jobb alsó sarkában az a8 mező szintén világos.',
    hint: 'Angol szállóige: „White on the right” (Fehér a jobb szélen).'
  },
  {
    id: 'glq1-4',
    level: 1,
    prompt: 'A torpedó (csatahajó) játékban a játékos ezt mondja: „Lövés a D7-re!”. Melyik mezőt célozta meg?',
    options: [
      'A D oszlop és a 7. sor kereszteződésében lévő négyzetet',
      'A D sort és a 7. oszlopot',
      'A 7. oszlop D betűs hajóját',
      'Véletlenszerűen kiválasztott 7 darab mezőt'
    ],
    correctAnswer: 0,
    explanation: 'A torpedó táblán az oszlopokat nagybetűkkel (A-J), a sorokat számokkal (1-10) jelöljük. A D7 a D oszlop és a 7. sor metszéspontja.',
    hint: 'A betű az oszlop, a szám a sor!'
  },
  {
    id: 'glq1-5',
    level: 1,
    prompt: 'Melyik 4 mező alkotja a sakktábla legfontosabb központi területét, az úgynevezett centrumot?',
    options: [
      'd4, e4, d5, e5',
      'a1, h1, a8, h8',
      'c3, c6, f3, f6',
      'b2, b7, g2, g7'
    ],
    correctAnswer: 0,
    explanation: 'A tábla mértani közepén fekvő 4 mező (d4, e4, d5, e5) a centrum. A sakkban a centrum uralása a legfontosabb stratégiai előny.',
    hint: 'A 4. és 5. sor, valamint a d és e oszlopok találkozását keresd!',
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 120 120">
        <rect x="10" y="10" width="100" height="100" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        {/* Rácsháló */}
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <line key={`v-${i}`} x1={10 + i * 12.5} y1="10" x2={10 + i * 12.5} y2="110" stroke="#cbd5e1" strokeWidth="1" />
        ))}
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <line key={`h-${i}`} x1="10" y1={10 + i * 12.5} x2="110" y2={10 + i * 12.5} stroke="#cbd5e1" strokeWidth="1" />
        ))}
        {/* Centrum 4 mezője pirossal */}
        <rect x={10 + 3 * 12.5} y={10 + 3 * 12.5} width="25" height="25" fill="#f43f5e" fillOpacity="0.4" stroke="#e11d48" strokeWidth="2" />
        <text x="60" y="64" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#9f1239">CENTRUM</text>
      </svg>
    )
  },
  {
    id: 'glq1-6',
    level: 1,
    prompt: 'Az Excel táblázatkezelőben az A oszlop és a 3. sor kereszteződésében lévő cellát hogyan jelöljük?',
    options: [
      'A3',
      '3A',
      'A-3-as mező',
      'Cella 13'
    ],
    correctAnswer: 0,
    explanation: 'A táblázatkezelőkben a cellahivatkozás mindig az oszlop betűjeléből és a sor sorszámából áll: A3.',
    hint: 'Oszlopbetű elöl, sorszám utána: A + 3 = ?'
  },
  {
    id: 'glq1-7',
    level: 1,
    prompt: 'A rácshálós helymeghatározásban miért fontos, hogy a B3 és a C2 koordináták ne cserélődjenek fel?',
    options: [
      'Mert két teljesen eltérő helyzetű mezőt jelölnek a négyzethálón',
      'Mert azonos mezőt jelölnek, nincs jelentősége',
      'Mert a C2 csak páros napokon használható',
      'Mert a B betű nagyobb a C-nél'
    ],
    correctAnswer: 0,
    explanation: 'A B3 a 2. oszlop 3. sora, míg a C2 a 3. oszlop 2. sora. A koordináták sorrendje rögzített, a felcserélésük téves helymeghatározást eredményez.',
    hint: 'Gondolj arra: az (oszlop; sor) párosban a sorrend szigorúan kötött!'
  },
  {
    id: 'glq1-8',
    level: 1,
    prompt: 'Egy 5×5-ös négyzethálós táblán hány mező található összesen?',
    options: [
      '25 mező',
      '10 mező',
      '20 mező',
      '50 mező'
    ],
    correctAnswer: 0,
    explanation: 'Egy 5 sorból és 5 oszlopból álló rácshálón 5 · 5 = 25 darab mező található.',
    hint: 'Szorozd össze: 5 oszlop × 5 sor = ?'
  },
  {
    id: 'glq1-9',
    level: 1,
    prompt: 'Ha a sakktáblán a világos bástya az a1 mezőről egyenes vonalban átlép az a8 mezőre, milyen irányban mozdult el?',
    options: [
      'Kizárólag függőlegesen (az „a” oszlop mentén)',
      'Kizárólag vízszintesen',
      'Átlósan',
      'Körben'
    ],
    correctAnswer: 0,
    explanation: 'Az oszlop betűje (a) nem változott, csak a sor száma nőtt 1-ről 8-ra. Ez egy tiszta függőleges irányú elmozdulás az oszlop mentén.',
    hint: 'Ha a betű ugyanaz maradt, a függőleges oszlopban haladtunk felfelé!'
  },
  {
    id: 'glq1-10',
    level: 1,
    prompt: 'A torpedó játékban egy 4-es hadihajó az E3, E4, E5 és E6 mezőket foglalja el. Hány mező hosszú a hajó és milyen tájolású?',
    options: [
      '4 mező hosszú és függőleges tájolású',
      '4 mező hosszú és vízszintes tájolású',
      '3 mező hosszú',
      'Átlósan elhelyezkedő 4-es hajó'
    ],
    correctAnswer: 0,
    explanation: 'A hajó 4 egymást követő mezőt fed le az „E” oszlopban (E3-tól E6-ig), ezért 4 mező hosszú és függőlegesen áll egy oszlopban.',
    hint: 'Számold meg a megadott cellákat: E3, E4, E5, E6 = 4 db mező egy oszlopban!'
  },

  // =========================================================================
  // 2. SZINT: LÉPÉSEK, ELMOZDULÁSOK ÉS ÚTVONALAK (11-20)
  // =========================================================================
  {
    id: 'glq2-1',
    level: 2,
    prompt: 'Egy robot az A1 mezőn áll. Megkapja a következő lépésutasítást: „→ 2 mező, ↑ 3 mező”. Melyik mezőre érkezik a robot?',
    options: [
      'C4 mezőre',
      'B3 mezőre',
      'D4 mezőre',
      'C3 mezőre'
    ],
    correctAnswer: 0,
    explanation: 'Az A1-ről indulva: 2 lépés jobbra az oszlopokban: A → B → C (C oszlop). 3 lépés fel a sorokban: 1 → 2 → 3 → 4 (4. sor). A célállomás a C4!',
    hint: 'A betűhöz adj 2-t (A+2=C), a számhoz adj 3-at (1+3=4)!',
    figure: (
      <svg className="w-48 h-40 mx-auto" viewBox="0 0 160 140">
        <rect x="20" y="10" width="125" height="100" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        {/* 5x4 rácsvonalak */}
        {[1, 2, 3, 4].map(c => (
          <line key={`v-${c}`} x1={20 + c * 25} y1="10" x2={20 + c * 25} y2="110" stroke="#cbd5e1" />
        ))}
        {[1, 2, 3].map(r => (
          <line key={`h-${r}`} x1="20" y1={10 + r * 25} x2="145" y2={10 + r * 25} stroke="#cbd5e1" />
        ))}
        {/* A1 kezdőpont */}
        <circle cx="32.5" cy="97.5" r="8" fill="#10b981" />
        <text x="32.5" y="101" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">A1</text>
        {/* Útvonal: 2 jobbra, 3 fel */}
        <path d="M 32.5 97.5 L 82.5 97.5 L 82.5 22.5" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="3 3" />
        {/* C4 célpont */}
        <circle cx="82.5" cy="22.5" r="8" fill="#4f46e5" />
        <text x="82.5" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">C4</text>
        {/* Fejlécek */}
        <text x="32.5" y="125" textAnchor="middle" fontSize="9" fontWeight="bold">A</text>
        <text x="57.5" y="125" textAnchor="middle" fontSize="9" fontWeight="bold">B</text>
        <text x="82.5" y="125" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4f46e5">C</text>
        <text x="10" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4f46e5">4</text>
        <text x="10" y="101" textAnchor="middle" fontSize="9" fontWeight="bold">1</text>
      </svg>
    )
  },
  {
    id: 'glq2-2',
    level: 2,
    prompt: 'Mennyi a legrövidebb rácstávolság (rácslépések száma) az A1 és a C4 mezők között, ha csak vízszintesen és függőlegesen léphetünk?',
    options: [
      '5 lépés (2 lépés vízszintesen + 3 lépés függőlegesen)',
      '4 lépés',
      '7 lépés',
      '3 lépés'
    ],
    correctAnswer: 0,
    explanation: 'A rácshálón (Manhattan-távolság): az oszloptávolság A-tól C-ig 2 lépés, a sortávolság 1-től 4-ig 3 lépés. A legrövidebb út: 2 + 3 = 5 lépés.',
    hint: 'Számold össze: hányat kell lépni jobbra és hányat fel?'
  },
  {
    id: 'glq2-3',
    level: 2,
    prompt: 'A sakktáblán a világos futó (amely csak átlósan mozoghat) a c1 mezőn áll. Melyik mezőre léphet innen egyenes vonalban?',
    options: [
      'Az f4 mezőre',
      'A c5 mezőre (egyenesen előre)',
      'Az e1 mezőre (vízszintesen oldalra)',
      'A d2 mezőre'
    ],
    correctAnswer: 0,
    explanation: 'A futó csak átlósan lép: c1-ről d2 → e3 → f4 → g5 → h6 mezőkre léphet. Az f4 átlósan elérhető (3 lépés jobbra és 3 lépés fel). A c5 mezőre a bástya léphetne.',
    hint: 'A futó csak átlósan, ferdén lépked a saját színű mezőin!'
  },
  {
    id: 'glq2-4',
    level: 2,
    prompt: 'A torpedó játékban egy romboló a B2, C2 és D2 mezőkön helyezkedik el. Milyen irányban áll a hajó a játéktáblán?',
    options: [
      'Vízszintesen (a 2. sor mentén)',
      'Függőlegesen (a B oszlop mentén)',
      'Átlósan',
      'Kereszt alakban'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a sor száma (2) minden mezőnél megegyezik, az oszlopok pedig szomszédosak (B, C, D), a hajó vízszintesen fekszik a 2. sorban.',
    hint: 'Ha a szám azonos, egy vízszintes sorban fekszenek a mezők!'
  },
  {
    id: 'glq2-5',
    level: 2,
    prompt: 'A robot a D5 mezőn áll, majd ezt a két utasítást hajtja végre: „↓ 3 mező, majd ← 2 mező”. Melyik mezőn áll meg?',
    options: [
      'B2 mezőn',
      'B8 mezőn',
      'F2 mezőn',
      'C3 mezőn'
    ],
    correctAnswer: 0,
    explanation: 'A D5-ből indulunk: 3 lépés le a sorokban: 5 - 3 = 2 (2. sor). 2 lépés balra az oszlopokban: D - 2 = B (B oszlop). A végeredmény: B2!',
    hint: 'D-ből menj 2-t balra (D → C → B), 5-ből menj 3-at le (5 → 4 → 3 → 2)!'
  },
  {
    id: 'glq2-6',
    level: 2,
    prompt: 'Mit jelent a táblázatkezelő programokban a „B2:B6” jelölés?',
    options: [
      'A B oszlop 2., 3., 4., 5. és 6. sorának celláiból álló összefüggő tartományt',
      'Csak a B2 és a B6 cellát, a köztük lévőket nem',
      'B2 osztva B6-tal',
      'A 2. és a 6. munkalapot'
    ],
    correctAnswer: 0,
    explanation: 'A kettőspont (:) a táblázatkezelőkben a tartomány (range) jele: a kezdőcellától a zárócelláig tartó összes köztes mezőt kijelöli.',
    hint: 'A kettőspont azt jelenti: „-tól -ig”.'
  },
  {
    id: 'glq2-7',
    level: 2,
    prompt: 'A sakktáblán a d4 és az f4 mezők milyen helyzetben vannak egymáshoz képest?',
    options: [
      'Azonos vízszintes sorban vannak (a 4. sorban), egymástól 2 mező távolságra',
      'Azonos függőleges oszlopban vannak',
      'Átlósan szemben vannak egymással',
      'Teljesen azonos mezők'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét mező a 4. sorban található, köztük az „e4” mező helyezkedik el. Tehát azonos vízszintes sorban vannak.',
    hint: 'Nézd meg a számukat: mindkettő 4-es, tehát ugyanabban a sorban vannak!'
  },
  {
    id: 'glq2-8',
    level: 2,
    prompt: 'Hány rácslépés távolságra van egymástól a (2; 1) és az (5; 4) pont, ha csak a rácsvonalak mentén mozoghatunk?',
    options: [
      '6 lépés (3 lépés vízszintesen + 3 lépés függőlegesen)',
      '5 lépés',
      '8 lépés',
      '3 lépés'
    ],
    correctAnswer: 0,
    explanation: 'Vízszintes távolság: 5 - 2 = 3 lépés. Függőleges távolság: 4 - 1 = 3 lépés. Összes rácstávolság: 3 + 3 = 6 lépés.',
    hint: 'Vízszintes különbség (5-2) + Függőleges különbség (4-1) = ?'
  },
  {
    id: 'glq2-9',
    level: 2,
    prompt: 'Melyik az egyetlen sakkfigura, amely át tud ugrani a saját és az ellenfél bábui felett, és lépése mindig „L-alakú”?',
    options: [
      'A huszár (ló)',
      'A bástya',
      'A futó',
      'A vezér (királynő)'
    ],
    correctAnswer: 0,
    explanation: 'A huszár az egyetlen figura, amely átugorhat más figurákon. Lépése: 2 mező egyenesen és 1 oldalra (vagy 1 egyenesen és 2 oldalra).',
    hint: 'Melyik bábu formál lovat a sakktáblán?'
  },
  {
    id: 'glq2-10',
    level: 2,
    prompt: 'Egy játékos a következő lépéseket teszi a rácson: → 4 lépés, ↑ 3 lépés, ← 4 lépés, ↓ 3 lépés. Hova érkezik a mozgás végén?',
    options: [
      'Pontosan a kiindulási pontjára (zárt téglalap útvonal)',
      '4 lépéssel távolabb',
      '3 lépéssel magasabbra',
      'A tábla legszélére'
    ],
    correctAnswer: 0,
    explanation: '4 lépés jobbra és 4 lépés balra semlegesíti egymást (4 - 4 = 0). 3 lépés fel és 3 lépés le szintén semlegesíti egymást (3 - 3 = 0). Így pontosan a kiindulópontra jut vissza!',
    hint: 'Ha ugyanannyit mész jobbra, mint balra, és ugyanannyit fel, mint le, hol kötsz ki?'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT RÁCSGEOMETRIA, SZIMMETRIÁK ÉS STRATÉGIÁK (21-30)
  // =========================================================================
  {
    id: 'glq3-1',
    level: 3,
    prompt: 'A sakktábla mértani középpontjára tükrözve melyik mező a világos e4 mezőjének a középpontos tükörképe?',
    options: [
      'd5 mező',
      'e5 mező',
      'd4 mező',
      'e8 mező'
    ],
    correctAnswer: 0,
    explanation: 'A sakktábla középpontja a d-e oszlop és a 4-5 sor közötti pont. Az e4 (5. oszlop, 4. sor) tükörképe a 4. oszlop 5. sora, vagyis a d5 mező.',
    hint: 'Gondolj a centrum 4 mezőjére: az e4 átlósan szemközti párja a d5!',
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 120 120">
        <rect x="10" y="10" width="100" height="100" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        {/* Centrum négyzetei */}
        <rect x="47.5" y="47.5" width="12.5" height="12.5" fill="#3b82f6" />
        <text x="53.7" y="56" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white">d5</text>
        <rect x="60" y="60" width="12.5" height="12.5" fill="#ef4444" />
        <text x="66.2" y="68.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white">e4</text>
        {/* Középpont */}
        <circle cx="60" cy="60" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        {/* Tükröző vonal */}
        <line x1="53.7" y1="53.7" x2="66.2" y2="66.2" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'glq3-2',
    level: 3,
    prompt: 'A négyzethálón kijelöljük az A1 (1; 1) és a D4 (4; 4) pontokat mint egy téglalap átellenes csúcsait. Hány darab 1×1-es kis rácsnégyzetből áll ez a terület?',
    options: [
      '9 rácsnégyzetből (3 × 3-as négyzet)',
      '16 rácsnégyzetből',
      '12 rácsnégyzetből',
      '6 rácsnégyzetből'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes oldal hossza: 4 - 1 = 3 egység. A függőleges oldal hossza: 4 - 1 = 3 egység. A terület: 3 · 3 = 9 darab rácsnégyzet.',
    hint: 'Vond ki a koordinátákat: (4-1) × (4-1) = ?'
  },
  {
    id: 'glq3-3',
    level: 3,
    prompt: 'A torpedó játék hivatalos szabályai szerint érinthetik-e egymást a csatahajók akár oldalt, akár átlósan a sarkaiknál?',
    options: [
      'Nem, minden hajó körül legalább egy üres vízmezőnek kell lennie',
      'Igen, szabadon összekapcsolódhatnak',
      'Csak az 1-es hajók érintkezhetnek',
      'Csak a tábla szélén érintkezhetnek'
    ],
    correctAnswer: 0,
    explanation: 'A torpedó alapszabálya: a hajók nem érintkezhetnek egymással, sem oldalról, sem a sarkaiknál. Minden elsüllyesztett hajó körül a szomszédos mezők automatikusan üres víznek minősülnek!',
    hint: 'Gondolj a játék taktikájára: egy elsüllyesztett hajó körül biztonsággal tudod, hogy ott nincs másik hajó!'
  },
  {
    id: 'glq3-4',
    level: 3,
    prompt: 'A sakktábla kezdőállásában a világos huszár a b1 mezőn áll. Melyik két mezőre ugorhat a legelső lépésben (átugorva a gyalogokat)?',
    options: [
      'Az a3 és a c3 mezőkre',
      'A b3 és a b4 mezőkre',
      'A c2 és a d2 mezőkre',
      'Az a2 és a c1 mezőkre'
    ],
    correctAnswer: 0,
    explanation: 'A huszár L-alakú ugrása: 2 lépés előre és 1 lépés oldalra. A b1-ről 2 lépés fel (3. sor), majd 1 lépés balra (a oszlop) vagy 1 lépés jobbra (c oszlop): célpontok az a3 és c3!',
    hint: '2-t lép előre (az 1. sorból a 3.-ba), és 1-et oldalra (b-ből a-ba vagy c-be).'
  },
  {
    id: 'glq3-5',
    level: 3,
    prompt: 'A robotnak az (1; 1) mezőről a (3; 3) mezőre kell eljutnia legrövidebb úton (4 lépésben), de a (2; 2) mező le van zárva falakkal. Hány különböző legrövidebb úton juthat el a célba?',
    options: [
      '2 különböző úton (jobbra-jobbra-fel-fel, vagy fel-fel-jobbra-jobbra)',
      'Csak 1 úton',
      '6 különböző úton',
      'Egyáltalán nem juthat el'
    ],
    correctAnswer: 0,
    explanation: 'A normál esetben lehetséges 6 útból 4 út áthaladna a lezárt (2; 2) ponton. Csak a két szélső kerülőút marad: 1. út: → → ↑ ↑ (alsó kerülő), 2. út: ↑ ↑ → → (felső kerülő). Összesen 2 legrövidebb út van.',
    hint: 'Képzeld el, hogy vagy a fal alatt mész el teljesen jobbra, vagy a fal felett heltjesen felfelé!'
  },
  {
    id: 'glq3-6',
    level: 3,
    prompt: 'Milyen színű mezőkből áll a sakktábla leghosszabb főátlója, amely az a1 mezőt köti össze a h8 mezővel?',
    options: [
      'Kizárólag sötét (fekete) mezőkből',
      'Kizárólag világos (fehér) mezőkből',
      'Felváltva sötét és világos mezőkből',
      'Színes mezőkből'
    ],
    correctAnswer: 0,
    explanation: 'Az a1 sötét mező. Átlósan lépve a mezők színe sosem változik meg, ezért az a1-h8 főátló mind a 8 mezője (a1, b2, c3, d4, e5, f6, g7, h8) sötét színű.',
    hint: 'Gondolj a fekete mezőkön futó futóra: ő sosem tud átlépni világos mezőre!'
  },
  {
    id: 'glq3-7',
    level: 3,
    prompt: 'Egy robot tetszőleges számú lépést tett a rácson, és a végén pontosan a kiindulópontjára érkezett vissza. Mi mondható el a lépéseiről?',
    options: [
      'A jobbra tett lépések száma megegyezik a balra tettekkel, és a fel lépések száma a le lépésekkel',
      'Csak páros számú lépést tehetett összesen',
      'Minden irányba pontosan ugyanannyi lépést tett',
      'Csak 4 lépést tehetett'
    ],
    correctAnswer: 0,
    explanation: 'A vízszintes elmozdulás összege 0 kell legyen (jobbra = balra), és a függőleges elmozdulás összege is 0 kell legyen (fel = le). Csak így juthatunk vissza a kiindulási koordinátákra.',
    hint: 'Hogy ne térj el sem jobbra, sem feljebb, minek kell egyensúlyban lennie?'
  },
  {
    id: 'glq3-8',
    level: 3,
    prompt: 'Egy játékos egy 6×6-os rácstáblán játszik. Hány darab mező található a tábla legszélső peremén (a szélső sorokban és oszlopokban együtt)?',
    options: [
      '20 mező',
      '24 mező',
      '36 mező',
      '16 mező'
    ],
    correctAnswer: 0,
    explanation: 'A 6×6-os tábla összesen 36 mező. A belső mag egy 4×4-es négyzet, ami 16 mező. A szélső perem: 36 - 16 = 20 mező (vagy 6+6+4+4 = 20 a 4 sarkot nem duplán számolva).',
    hint: 'Számold ki az összes mező (36) és a belső 4×4-es mezők (16) különbségét!',
    breakdown: [
      { label: 'Összes mező', value: '6 · 6 = 36' },
      { label: 'Belső mezők', value: '4 · 4 = 16' },
      { label: 'Szélső keret mezői', value: '36 - 16 = 20 mező' }
    ]
  },
  {
    id: 'glq3-9',
    level: 3,
    prompt: 'A táblázatkezelőben az A1 cella értéke 15, az A2 értéke 25, az A3 értéke 10. Mi lesz az eredménye a `=SUM(A1:A3)` képletnek?',
    options: [
      '50',
      '25',
      '40',
      '15'
    ],
    correctAnswer: 0,
    explanation: 'A `=SUM(A1:A3)` függvény összeadja az A1, A2 és A3 cellák értékeit: 15 + 25 + 10 = 50.',
    hint: 'A SUM (szum) függvény az összeadás műveletét végzi el: 15 + 25 + 10 = ?'
  },
  {
    id: 'glq3-10',
    level: 3,
    prompt: 'A sakktáblán a bástya a d4 mezőn áll. Egy teljesen üres táblán hány különböző mezőre léphet egyetlen lépéssel?',
    options: [
      '14 mezőre (7 mező a saját oszlopában + 7 mező a saját sorában)',
      '8 mezőre',
      '16 mezőre',
      '28 mezőre'
    ],
    correctAnswer: 0,
    explanation: 'A bástya az oszlopában 7 másik mezőre léphet (d1, d2, d3, d5, d6, d7, d8), és a sorában is 7 másik mezőre (a4, b4, c4, e4, f4, g4, h4). Összesen: 7 + 7 = 14 elérhető mező.',
    hint: 'A tábla 8 mezős sorából 7 másik mezőre léphet, és a 8 mezős oszlopból is 7 másikra: 7 + 7 = ?'
  }
];

export const GridLocationQuiz: React.FC<GridLocationQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-grid-quiz"
      title="Helymeghatározás négyzethálón kvíz"
      subtitle="30 feladat 3 szinten: sakktábla, torpedó, táblázatkezelők és robot útvonaltervezés"
      questions={GRID_LOCATION_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-grid-location-quiz"
      storageKey="g5-loc-grid-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <GridLocationMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <GridLocationSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">1. Szint Puskája: Sakktábla és Rácsháló</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Sakktábla:</strong> 8 oszlop (a-h) és 8 sor (1-8), összesen 64 mező (32 világos, 32 sötét).</div>
              <div>• <strong>Szabály:</strong> Oszlop elöl (betű), sor hátul (szám) $\to$ pl. <code>e4</code>, <code>B3</code>.</div>
              <div>• <strong>Centrum:</strong> d4, e4, d5, e5 mezők.</div>
              <div>• <strong>Jobb sarok:</strong> Mindig világos színű mező!</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">2. Szint Puskája: Lépések és Távolságok</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Lépések iránya:</strong> → jobbra, ← balra, ↑ fel, ↓ le.</div>
              <div>• <strong>Rácstávolság (Manhattan):</strong> Vízszintes lépések + Függőleges lépések száma.</div>
              <div>• <strong>Torpedó:</strong> A-J oszlopok, 1-10 sorok. Hajók csak vízszintesen vagy függőlegesen állhatnak.</div>
              <div>• <strong>Excel tartomány:</strong> <code>B2:B6</code> = a B oszlop 2-től 6-ig tartó cellái.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">3. Szint Puskája: Szimmetriák és Huszárlépés</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Centrum tükörkép:</strong> e4 párja a d5 mező a sakktábla középpontjára.</div>
              <div>• <strong>Huszár:</strong> L-alakban lép (2 egyenesen + 1 oldalra), átugorhat más figurákon!</div>
              <div>• <strong>Zárt útvonal:</strong> jobbra lépések = balra lépések, fel lépések = le lépések.</div>
              <div>• <strong>Bástya:</strong> Üres táblán mindig 7 vízszintes + 7 függőleges = 14 mezőt támad!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
