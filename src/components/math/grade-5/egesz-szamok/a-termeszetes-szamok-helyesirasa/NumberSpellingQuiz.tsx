import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { NumberSpellingMatcher } from './NumberSpellingMatcher';
import { NumberSpellingSorter } from './NumberSpellingSorter';

export interface NumberSpellingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (Számok 2 000-ig) ---
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen betűvel a megadott számot?',
    highlightValue: '15',
    questionTypeBadge: 'Tőszámnév ≤ 2 000',
    options: ['tizenöt', 'tizen-öt', 'tíz öt', 'tizen öt'],
    correctAnswer: 'tizenöt',
    explanation: 'A 2000-nél nem nagyobb összetett tőszámneveket egyetlen szóba írjuk, kötőjel nélkül.',
    hint: '2 000-ig minden összetett számot egybeírunk!',
    breakdown: [
      { label: 'Szám', value: '15' },
      { label: 'Szabály', value: '≤ 2 000: egybeírás' },
      { label: 'Helyes alak', value: 'tizenöt' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen betűvel a következő számot?',
    highlightValue: '482',
    questionTypeBadge: 'Tőszámnév ≤ 2 000',
    options: [
      'négyszáznyolcvankettő',
      'négyszáz-nyolcvankettő',
      'négyszáz nyolcvankettő',
      'négyszáz-nyolcvan-kettő'
    ],
    correctAnswer: 'négyszáznyolcvankettő',
    explanation: '2000-ig minden összetett számot teljesen egybeírunk: négyszáznyolcvankettő.',
    hint: 'Nem kell kötőjel, mert 482 jóval 2000 alatt van.',
    breakdown: [
      { label: 'Szám', value: '482' },
      { label: 'Szabály', value: '≤ 2 000: egybeírás' },
      { label: 'Helyes alak', value: 'négyszáznyolcvankettő' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen betűvel az 1 500-at?',
    highlightValue: '1 500',
    questionTypeBadge: 'Kétezres szabály',
    options: ['ezerötszáz', 'ezer-ötszáz', 'ezer ötszáz', 'egy-ezerötszáz'],
    correctAnswer: 'ezerötszáz',
    explanation: 'Mivel 1500 ≤ 2000, ezért egybeírjuk kötőjel nélkül: ezerötszáz.',
    hint: '1500 nem haladja meg a 2000-et!',
    breakdown: [
      { label: 'Szám', value: '1 500' },
      { label: 'Határ', value: '1500 ≤ 2000' },
      { label: 'Helyes alak', value: 'ezerötszáz' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen az 1 999-et betűvel?',
    highlightValue: '1 999',
    questionTypeBadge: 'Kétezres szabály',
    options: [
      'ezerkilencszázkilencvenkilenc',
      'ezer-kilencszázkilencvenkilenc',
      'ezerkilencszáz-kilencvenkilenc',
      'ezer kilencszáz kilencvenkilenc'
    ],
    correctAnswer: 'ezerkilencszázkilencvenkilenc',
    explanation: '1999 még a 2000-es határ alatt van, így egyetlen hosszú szóként írjuk le.',
    hint: 'Bármilyen hosszúnak is tűnik, 2000-ig egybeírjuk.',
    breakdown: [
      { label: 'Szám', value: '1 999' },
      { label: 'Szabály', value: '≤ 2 000: egybeírás' },
      { label: 'Helyes alak', value: 'ezerkilencszázkilencvenkilenc' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen a 2 000-et betűvel?',
    highlightValue: '2 000',
    questionTypeBadge: 'Kerek határszám',
    options: ['kétezer', 'két-ezer', 'kettő ezer', 'két ezer'],
    correctAnswer: 'kétezer',
    explanation: 'A 2000 pontosan a határ, és egybeírjuk: kétezer.',
    hint: 'A kerek ezreseket mindig egybeírjuk.',
    breakdown: [
      { label: 'Szám', value: '2 000' },
      { label: 'Szabály', value: 'Kerek ezres: egybeírás' },
      { label: 'Helyes alak', value: 'kétezer' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Melyik a szabályos leírása az 5. sorszámnévnek?',
    highlightValue: '5.',
    questionTypeBadge: 'Sorszámnév',
    options: ['ötödik', '5.-ik', 'öt-ödik', '5-ik'],
    correctAnswer: 'ötödik',
    explanation: 'A sorszámnév utáni pont már kifejezi az „-ik” képzőt, betűvel leírva: ötödik.',
    hint: 'A pont után már ne írd ki még egyszer, hogy „-ik”!',
    breakdown: [
      { label: 'Jelölés', value: '5.' },
      { label: 'Típus', value: 'Sorszámnév' },
      { label: 'Kiejtés', value: 'ötödik' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Miért HIBÁS az „1 500 = ezer-ötszáz” felírás?',
    highlightValue: 'ezer-ötszáz',
    questionTypeBadge: 'Hibaelemzés',
    options: [
      'Mert 2 000-ig minden összetett számot egybeírunk',
      'Mert az ezer után mindig szóközt kell tenni',
      'Mert az ötszáz elé két kötőjel kell',
      'Mert az 1500-at csak római számmal szabad leírni'
    ],
    correctAnswer: 'Mert 2 000-ig minden összetett számot egybeírunk',
    explanation: 'A kétezres szabály szerint 2000-ig nem használunk kötőjelet a számnevekben.',
    hint: 'Gondolj a 2000-es szabályra!',
    breakdown: [
      { label: 'Hibás alak', value: 'ezer-ötszáz' },
      { label: 'Hiba oka', value: 'Felesleges kötőjel 2000 alatt' },
      { label: 'Helyes alak', value: 'ezerötszáz' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Hogyan írjuk le helyesen a 780-at betűvel?',
    highlightValue: '780',
    questionTypeBadge: 'Tőszámnév ≤ 2 000',
    options: ['hétszáznyolcvan', 'hétszáz-nyolcvan', 'hét-száz-nyolcvan', 'hétszáz nyolcvan'],
    correctAnswer: 'hétszáznyolcvan',
    explanation: '780 ≤ 2000, így teljesen egybeírjuk: hétszáznyolcvan.',
    hint: '780 ≤ 2000: egybeírás.',
    breakdown: [
      { label: 'Szám', value: '780' },
      { label: 'Szabály', value: '≤ 2 000: egybeírás' },
      { label: 'Helyes alak', value: 'hétszáznyolcvan' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Milyen kérdésre válaszolnak a tőszámnevek (pl. egy, tíz, száz)?',
    highlightValue: 'Tőszámnevek',
    questionTypeBadge: 'Nyelvtani fogalom',
    options: ['Hány? Mennyi?', 'Hányadik?', 'Hányad rész?', 'Milyen?'],
    correctAnswer: 'Hány? Mennyi?',
    explanation: 'A tőszámnevek mennyiséget fejeznek ki, kérdésük: Hány? Mennyi?',
    hint: 'A mennyiséget kérdezzük velük.',
    breakdown: [
      { label: 'Szófaj', value: 'Tőszámnév' },
      { label: 'Kérdése', value: 'Hány? Mennyi?' },
      { label: 'Példa', value: 'öt, húsz, száz' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Hogyan írjuk le betűvel a 12. sorszámnevet?',
    highlightValue: '12.',
    questionTypeBadge: 'Sorszámnév',
    options: ['tizenkettedik', '12-edik', 'tizenkettő-ik', 'tizenkettődik'],
    correctAnswer: 'tizenkettedik',
    explanation: '12. betűvel leírva: tizenkettedik (vagy tizenkettedik helyezett).',
    hint: 'Kettő ➔ kettedik.',
    breakdown: [
      { label: 'Szám', value: '12.' },
      { label: 'Szófaj', value: 'Sorszámnév' },
      { label: 'Helyes alak', value: 'tizenkettedik' }
    ]
  },

  // =========================================================
  // --- 2. SZINT: KÖZEPES (Számok 2 001 – 99 999: Kötőjel) ---
  // =========================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 2 001-et betűvel?',
    highlightValue: '2 001',
    questionTypeBadge: 'Kétezres szabály > 2000',
    options: ['kétezer-egy', 'kétezeregy', 'két ezer egy', 'kétezer egy'],
    correctAnswer: 'kétezer-egy',
    explanation: 'Mivel 2001 > 2000, az ezresek és az egyesek osztálya közé kötőjelet teszünk: kétezer-egy.',
    hint: '2001 már nagyobb mint 2000, ezért kötőjel kell az ezresek és egyesek közé!',
    breakdown: [
      { label: 'Szám', value: '2 001' },
      { label: 'Feltétel', value: '2001 > 2000' },
      { label: 'Kötőjel helye', value: 'kétezer-egy' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 3 000-et betűvel?',
    highlightValue: '3 000',
    questionTypeBadge: 'Kerek ezres',
    options: ['háromezer', 'három-ezer', 'három ezer', 'harmadezer'],
    correctAnswer: 'háromezer',
    explanation: 'A 2000-nél nagyobb kerek ezreseket (ha nincs utánuk egyéb számjegy) egybeírjuk: háromezer.',
    hint: 'Kerek ezres, nincs utána semmi más.',
    breakdown: [
      { label: 'Szám', value: '3 000' },
      { label: 'Típus', value: 'Kerek ezres' },
      { label: 'Helyes alak', value: 'háromezer' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 4 520-at betűvel?',
    highlightValue: '4 520',
    questionTypeBadge: 'Kötőjelezés > 2000',
    options: [
      'négyezer-ötszázhúsz',
      'négyezerötszázhúsz',
      'négyezer ötszázhúsz',
      'négy-ezer-ötszáz-húsz'
    ],
    correctAnswer: 'négyezer-ötszázhúsz',
    explanation: '4520 > 2000: az ezresek osztálya (négyezer) és az egyesek osztálya (ötszázhúsz) közé kötőjel kerül.',
    hint: 'Kötőjel az ezresek és százasok között!',
    breakdown: [
      { label: 'Szám', value: '4 520' },
      { label: 'Osztályok', value: '4 ezer | 520' },
      { label: 'Helyes alak', value: 'négyezer-ötszázhúsz' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 12 300-at betűvel?',
    highlightValue: '12 300',
    questionTypeBadge: 'Kötőjelezés > 2000',
    options: [
      'tizenkétezer-háromszáz',
      'tizenkét-ezer-háromszáz',
      'tizenkétezerháromszáz',
      'tizenkét ezer háromszáz'
    ],
    correctAnswer: 'tizenkétezer-háromszáz',
    explanation: 'Az ezresek osztályát (tizenkétezer) és a százasokat (háromszáz) kötőjellel választjuk el.',
    hint: 'Az ezresek osztálya (tizenkétezer) egybeírandó, utána jön a kötőjel.',
    breakdown: [
      { label: 'Szám', value: '12 300' },
      { label: 'Osztályok', value: '12 ezer | 300' },
      { label: 'Helyes alak', value: 'tizenkétezer-háromszáz' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 45 800-at betűvel?',
    highlightValue: '45 800',
    questionTypeBadge: 'Kötőjelezés > 2000',
    options: [
      'negyvenötezer-nyolcszáz',
      'negyvenöt-ezer-nyolcszáz',
      'negyvenötezer nyolcszáz',
      'negyven-ötezer-nyolcszáz'
    ],
    correctAnswer: 'negyvenötezer-nyolcszáz',
    explanation: 'Az ezresek osztálya (negyvenötezer) egybeírandó, utána kötőjellel kapcsolódik a nyolcszáz.',
    hint: 'A csoportokon belül egybeírás van, a csoportok között kötőjel.',
    breakdown: [
      { label: 'Szám', value: '45 800' },
      { label: 'Ezresek', value: 'negyvenötezer' },
      { label: 'Helyes alak', value: 'negyvenötezer-nyolcszáz' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Mi a helyes leírása a 70 005 számnak betűvel?',
    highlightValue: '70 005',
    questionTypeBadge: 'Kötőjelezés > 2000',
    options: ['hetvenezer-öt', 'hetvenezer öt', 'hetven-ezer-öt', 'hetvenezeröt'],
    correctAnswer: 'hetvenezer-öt',
    explanation: '70 005 = 70 ezer + 5. Mivel > 2000, az ezresek és az egyesek közé kötőjel kerül: hetvenezer-öt.',
    hint: '70 ezer + 5: az ezresek és egyesek közé kötőjel kerül.',
    breakdown: [
      { label: 'Szám', value: '70 005' },
      { label: 'Osztályok', value: '70 ezer | 5' },
      { label: 'Helyes alak', value: 'hetvenezer-öt' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 20 000-et betűvel?',
    highlightValue: '20 000',
    questionTypeBadge: 'Kerek tízezres',
    options: ['húszezer', 'húsz-ezer', 'húsz ezer', 'húszezres'],
    correctAnswer: 'húszezer',
    explanation: 'A kerek tízezreseket egyetlen szóba írjuk: húszezer.',
    hint: 'Kerek tízezres, nincs utána más jegy.',
    breakdown: [
      { label: 'Szám', value: '20 000' },
      { label: 'Típus', value: 'Kerek tízezres' },
      { label: 'Helyes alak', value: 'húszezer' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Hová kerül a kötőjel a 99 999 leírásakor?',
    highlightValue: '99 999',
    questionTypeBadge: 'Kötőjel pozíciója',
    options: [
      'Az ezresek és az egyesek osztálya közé (kilencvenkilencezer-kilencszázkilencvenkilenc)',
      'Minden számjegy neve közé (kilencven-kilenc-ezer...)',
      'Sehová, mert 100 000 alatt mindent egybeírunk',
      'Az ezer szó elé és után is'
    ],
    correctAnswer: 'Az ezresek és az egyesek osztálya közé (kilencvenkilencezer-kilencszázkilencvenkilenc)',
    explanation: 'A kötőjel kizárólag a hármas számcsoportok (számosztályok) határára kerül.',
    hint: 'Kizárólag az osztályhatáron van kötőjel.',
    breakdown: [
      { label: 'Szám', value: '99 999' },
      { label: 'Kötőjel helye', value: '...ezer-...' },
      { label: 'Helyes alak', value: 'kilencvenkilencezer-kilencszázkilencvenkilenc' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Melyik a helyes sorszámnév alak: 8. ?',
    highlightValue: '8.',
    questionTypeBadge: 'Sorszámnév',
    options: ['nyolcadik', 'nyolcad-ik', '8-adik', 'nyolc-adik'],
    correctAnswer: 'nyolcadik',
    explanation: '8. betűvel leírva: nyolcadik.',
    hint: 'Nyolc ➔ nyolcadik.',
    breakdown: [
      { label: 'Jelölés', value: '8.' },
      { label: 'Helyes alak', value: 'nyolcadik' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mi a HIBA a „háromezer ötszáz” alakban?',
    highlightValue: 'háromezer ötszáz',
    questionTypeBadge: 'Hibaelemzés',
    options: [
      'Szóköz van a kötőjel helyén',
      'Az ötszázat külön kell választani egybeírással',
      'A háromezer helyett három ezer kell',
      'Nem szabad betűvel leírni'
    ],
    correctAnswer: 'Szóköz van a kötőjel helyén',
    explanation: '2000 felett az osztályok határán kötőjelet kell tenni, nem szóközt: háromezer-ötszáz.',
    hint: 'A szóköz nem helyettesíti a kötőjelet!',
    breakdown: [
      { label: 'Hibás alak', value: 'háromezer ötszáz' },
      { label: 'Hiba oka', value: 'Szóköz kötőjel helyett' },
      { label: 'Helyes alak', value: 'háromezer-ötszáz' }
    ]
  },

  // ==============================================================
  // --- 3. SZINT: NEHÉZ (Milliók, több kötőjel, dátumok, vegyes) ---
  // ==============================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen az 1 250 000-et betűvel?',
    highlightValue: '1 250 000',
    questionTypeBadge: 'Milliók helyesírása',
    options: [
      'egymillió-kétszázötvenezer',
      'egymilliókétszázötvenezer',
      'egy-millió-kétszázötvenezer',
      'egymillió kétszázötvenezer'
    ],
    correctAnswer: 'egymillió-kétszázötvenezer',
    explanation: 'A milliók osztálya (egymillió) és az ezresek osztálya (kétszázötvenezer) közé kötőjel kerül.',
    hint: 'A milliók és ezresek határára kötőjel kerül.',
    breakdown: [
      { label: 'Szám', value: '1 250 000' },
      { label: 'Osztályok', value: '1 millió | 250 ezer' },
      { label: 'Helyes alak', value: 'egymillió-kétszázötvenezer' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen a 4 520 030-at betűvel?',
    highlightValue: '4 520 030',
    questionTypeBadge: 'Több kötőjeles szám',
    options: [
      'négymillió-ötszázhúszezer-harminc',
      'négymillióötszázhúszezerharminc',
      'négy-millió-ötszáz-húszezer-harminc',
      'négymillió ötszázhúszezer harminc'
    ],
    correctAnswer: 'négymillió-ötszázhúszezer-harminc',
    explanation: 'Három osztály van: milliók, ezresek és egyesek, ezért 2 darab kötőjel kerül az osztályhatárokra.',
    hint: '3 osztály = 2 kötőjel az osztályhatárokon.',
    breakdown: [
      { label: 'Szám', value: '4 520 030' },
      { label: 'Tagolás', value: '4 M | 520 e | 030 E' },
      { label: 'Helyes alak', value: 'négymillió-ötszázhúszezer-harminc' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen az 5 000 000-t betűvel?',
    highlightValue: '5 000 000',
    questionTypeBadge: 'Kerek milliós',
    options: ['ötmillió', 'öt-millió', 'öt millió', 'ötmilliós'],
    correctAnswer: 'ötmillió',
    explanation: 'A kerek milliókat egybeírjuk kötőjel nélkül: ötmillió.',
    hint: 'Kerek milliós szám, egybeírjuk.',
    breakdown: [
      { label: 'Szám', value: '5 000 000' },
      { label: 'Típus', value: 'Kerek milliós' },
      { label: 'Helyes alak', value: 'ötmillió' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen az 5 000 020-at betűvel?',
    highlightValue: '5 000 020',
    questionTypeBadge: 'Kihagyott osztály',
    options: ['ötmillió-húsz', 'ötmillióhúsz', 'öt-millió-húsz', 'ötmillió húsz'],
    correctAnswer: 'ötmillió-húsz',
    explanation: 'Az ezresek osztálya 0, így kimarad, a milliók és az egyesek közé pedig kötőjel kerül: ötmillió-húsz.',
    hint: 'A nullás ezres osztály kimarad, a milliók és egyesek közé kötőjel kell.',
    breakdown: [
      { label: 'Szám', value: '5 000 020' },
      { label: 'Osztályok', value: '5 M | 0 e | 20 E' },
      { label: 'Helyes alak', value: 'ötmillió-húsz' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Melyik a szabályos magyar dátumírás?',
    highlightValue: 'Dátumírás',
    questionTypeBadge: 'Dátumok',
    options: [
      '2026. szeptember 7.',
      '2 026. szeptember 7',
      '2026 szeptember 7',
      '2026. szeptember. 7.'
    ],
    correctAnswer: '2026. szeptember 7.',
    explanation: 'Az évszámot nem tagoljuk szóközzel, és az év, valamint a nap után pontot teszünk: 2026. szeptember 7.',
    hint: 'Az évszám nincs szóközzel tagolva, és pont van utána, valamint a nap után is.',
    breakdown: [
      { label: 'Évszám', value: '2026. (tagolatlan)' },
      { label: 'Hónap', value: 'szeptember (kisbetű)' },
      { label: 'Nap', value: '7. (ponttal)' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Miért HIBÁS a „5.-ik helyen végzett” írásmód?',
    highlightValue: '5.-ik',
    questionTypeBadge: 'Hibaelemzés',
    options: [
      'Mert a pont már magában jelöli az „-ik” képzőt',
      'Mert a sorszámnevek elé mindig betűt kell tenni',
      'Mert a helyén szóközt kellene hagyni',
      'Mert az 5-öt csak római számmal szabad leírni'
    ],
    correctAnswer: 'Mert a pont már magában jelöli az „-ik” képzőt',
    explanation: 'A számjegy utáni pont már tartalmazza az „-ik” sorszámnévképzőt, így kétszer jelölnénk: helyesen 5. vagy 5-ödik.',
    hint: 'Pont és „-ik” együtt felesleges duplázás.',
    breakdown: [
      { label: 'Hibás alak', value: '5.-ik' },
      { label: 'Hiba oka', value: 'Kettős képzőjelölés' },
      { label: 'Helyes alak', value: '5. vagy 5-ödik' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen a 100 005-öt betűvel?',
    highlightValue: '100 005',
    questionTypeBadge: 'Kötőjelezés > 2000',
    options: ['egyszázezer-öt', 'egyszázezer öt', 'egyszáz-ezer-öt', 'egyszázezeröt'],
    correctAnswer: 'egyszázezer-öt',
    explanation: '100 005 = egyszázezer (100 ezer) + öt, az osztályhatáron kötőjellel: egyszázezer-öt.',
    hint: '100 ezer = egyszázezer, utána kötőjellel jön az öt.',
    breakdown: [
      { label: 'Szám', value: '100 005' },
      { label: 'Osztályok', value: '100 ezer | 5' },
      { label: 'Helyes alak', value: 'egyszázezer-öt' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Hány darab kötőjel van a 25 300 450 szám betűs leírásában?',
    highlightValue: '25 300 450',
    questionTypeBadge: 'Kötőjelek száma',
    options: [
      '2 darab (huszonötmillió-háromszázezer-négyszázötven)',
      '1 darab (huszonötmillió-háromszázezernégyszázötven)',
      '3 darab (huszon-öt-millió-...)',
      '0 darab (mindent egybeírunk)'
    ],
    correctAnswer: '2 darab (huszonötmillió-háromszázezer-négyszázötven)',
    explanation: 'Három osztály kapcsolódik össze (milliók, ezresek, egyesek), ami 2 kötőjelet jelent az osztályhatárokon.',
    hint: '3 tagolt osztály között pontosan 2 választóvonal van.',
    breakdown: [
      { label: 'Szám', value: '25 300 450' },
      { label: 'Határok száma', value: '2 osztályhatár' },
      { label: 'Helyes alak', value: 'huszonötmillió-háromszázezer-négyszázötven' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen toldalékkal az „5. helyen végzettnek” kifejezést számjeggyel?',
    highlightValue: '5. + toldalék',
    questionTypeBadge: 'Toldalékolás',
    options: ['5.-nek vagy 5-nek', '5-ödiknek', '5.-iknek', '5diknek'],
    correctAnswer: '5.-nek vagy 5-nek',
    explanation: 'A sorszámnévhez kötőjellel kapcsoljuk a toldalékot (5.-nek vagy 5-nek).',
    hint: 'Pont és kötőjel után közvetlenül jön a toldalék.',
    breakdown: [
      { label: 'Alap', value: '5. (ötödik)' },
      { label: 'Toldalék', value: '-nek' },
      { label: 'Helyes alak', value: '5.-nek vagy 5-nek' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen a 3 000 000 000 (3 milliárd) számnevet betűvel?',
    highlightValue: '3 000 000 000',
    questionTypeBadge: 'Milliárdok',
    options: ['hárommilliárd', 'három-milliárd', 'három milliárd', 'hárommilliárdos'],
    correctAnswer: 'hárommilliárd',
    explanation: 'A kerek milliárdokat egybeírjuk: hárommilliárd.',
    hint: 'Kerek milliárdos szám, egybeírjuk.',
    breakdown: [
      { label: 'Szám', value: '3 000 000 000' },
      { label: 'Típus', value: 'Kerek milliárdos' },
      { label: 'Helyes alak', value: 'hárommilliárd' }
    ]
  }
];

export const NumberSpellingQuiz: React.FC<NumberSpellingQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-number-spelling"
      topicTitle="A természetes számok helyesírása"
      grade={5}
      chapterId="egesz-szamok"
      title="A természetes számok helyesírása Kvíz"
      subtitle="Gyakorold a kétezres szabályt, a kötőjelezést, sorszámneveket és dátumokat!"
      topicBadge="5. Osztály • I. Az egész számok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<NumberSpellingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<NumberSpellingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapok',
          subtitle: 'Számok 2 000-ig',
          focus: 'Egybeírás 2000-ig, tőszámnevek és alapvető sorszámnevek'
        },
        level2: {
          title: '2. Szint: Közepes',
          subtitle: 'Számok 2 001 – 99 999',
          focus: 'Kötőjel az osztályhatárokon, kerek ezresek kivétele'
        },
        level3: {
          title: '3. Szint: Haladó',
          subtitle: 'Milliók, több kötőjel, dátumok',
          focus: 'Több kötőjeles számok, dátumok és összetett sorszámnevek'
        }
      }}
      cheatSheetContent={
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-200 dark:border-violet-800">
            <h4 className="font-bold text-violet-800 dark:text-violet-300 mb-1">A Kétezres Szabály:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>≤ 2 000:</strong> Minden összetett számot egybeírunk (pl. <em>ezerötszáz</em>, <em>kétezer</em>).<br />
              • <strong>&gt; 2 000:</strong> Az összetett számokat a hármas csoportok határán kötőjellel tagoljuk (pl. <em>kétezer-egy</em>, <em>negyvenötezer-nyolcszáz</em>).<br />
              • <strong>Kerek számok:</strong> Mindig egybeírjuk őket (pl. <em>háromezer</em>, <em>húszezer</em>, <em>ötmillió</em>).
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Sorszámnevek és Dátumok:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>5.</strong> = <em>ötödik</em> (a pont már magában jelöli az „-ik” képzőt!).<br />
              • <strong>Dátum:</strong> <em>2026. szeptember 7.</em> (évszámban nincs szóköz, pont az év és nap után).
            </p>
          </div>
        </div>
      }
    />
  );
};

export default NumberSpellingQuiz;
