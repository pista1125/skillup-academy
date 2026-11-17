import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { WrittenAddExamG3Matcher } from './WrittenAddExamG3Matcher';
import { WrittenAddExamG3Sorter } from './WrittenAddExamG3Sorter';
import { ChangeRowsFig, PartsFig, BarsFig, opts4 } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { ColumnFig, TagsFig, ListTableFig, MenuFig, sumNoCarry } from '../szoveges-feladatok/AddWordProblemsG3Parts';
import { CompareSumsFig, speakAdd } from './WrittenAddExamG3Parts';

// ---------------------------------------------------------------------------
// Segédek
// ---------------------------------------------------------------------------
const total = (n: number[]) => n.reduce((s, x) => s + x, 0);
const BLUE = '#93c5fd';
const GREEN = '#86efac';
const YEL = '#fde68a';

const Q = (id: number, level: DifficultyLevel, badge: string, question: string, options: (string | number)[], explanation: string, figure?: React.ReactNode): QuizQuestion => ({
  id: `waexg3-q${id}`,
  level,
  questionTypeBadge: badge,
  question,
  options: options.map(String),
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {})
});

/** Írásbeli összeadás oszlopban: a helyes, a „maradék nélküli” hibás és a megadott rossz válaszok. */
const colQ = (id: number, level: DifficultyLevel, nums: number[], wrong: number[], unit = '', question = 'Számold ki írásban!'): QuizQuestion => {
  const r = total(nums);
  const o = opts4(r, [sumNoCarry(nums), ...wrong], 1000);
  return Q(
    id,
    level,
    nums.length === 3 ? 'Három tag' : 'Írásbeli összeadás',
    question,
    o.map((v) => (unit ? `${v} ${unit}` : v)),
    speakAdd(nums),
    <ColumnFig addends={nums} />
  );
};

// ---------------------------------------------------------------------------
// Kérdések – 90 db (30 / szint)
// ---------------------------------------------------------------------------
export const WRITTEN_ADD_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // ======================= 1. szint =======================
  Q(1, 1, 'Fejben', 'Mennyi 418 + 300?', [718, 448, 421, 618], 'Csak a százasok változnak: 4 + 3 = 7 százas. 418 + 300 = 718.'),
  Q(2, 1, 'Fejben', 'Mennyi 350 + 40?', [390, 354, 750, 380], '5 tízes + 4 tízes = 9 tízes. 350 + 40 = 390.'),
  Q(3, 1, 'Fejben', 'Mennyi 270 + 50?', [320, 220, 310, 770], '27 tízes + 5 tízes = 32 tízes. 270 + 50 = 320. Átléptük a 300-at!'),
  Q(4, 1, 'Fejben', 'Mennyi 500 + 136?', [636, 536, 186, 646], '5 százas + 1 százas = 6 százas, a 36 marad. 636.'),
  Q(
    5,
    1,
    'Helyi érték',
    'A 264 + 35 összeadásnál hová kerül a 35-ben a 3?',
    ['a tízesek alá', 'a százasok alá', 'az egyesek alá', 'mindegy, hová'],
    'A 35 = 3 tízes és 5 egyes. A 3 a tízesek alá kerül, az 5 az egyesek alá.',
    <ColumnFig addends={[264, 35]} />
  ),
  Q(6, 1, 'Írásbeli összeadás', 'Melyik helyi értéken kezdjük az írásbeli összeadást?', ['az egyeseken', 'a százasokon', 'a tízeseken', 'mindegy'], 'Mindig az egyesekkel kezdjük, és jobbról balra haladunk: egyesek, tízesek, százasok.'),
  Q(7, 1, 'Kerekítés', 'Kerekítsd tízesre! 247 ≈ ?', [250, 240, 200, 300], 'A 247 egyese 7, ez 5 vagy több, ezért felfelé kerekítünk: 250.'),
  Q(8, 1, 'Becslés', 'Becsüld meg tízesre kerekítve! 326 + 158 ≈ ?', ['B: 490', 'B: 390', 'B: 590', 'B: 470'], '326 ≈ 330, 158 ≈ 160. 330 + 160 = 490. A pontos 484, közel van.'),
  Q(9, 1, 'Becslés', 'Becsüld meg százasra kerekítve! 289 + 412 ≈ ?', ['B: 700', 'B: 600', 'B: 800', 'B: 900'], '289 ≈ 300, 412 ≈ 400. 300 + 400 = 700. A pontos 701.'),
  Q(10, 1, 'Becslés', '198 + 305 = ? Melyik eredmény lehet jó a becslés szerint?', [503, 403, 603, 53], '198 ≈ 200, 305 ≈ 310. B: 510. Ehhez csak az 503 van közel.'),
  colQ(11, 1, [214, 143], [367, 71]),
  colQ(12, 1, [352, 136], [478, 216]),
  colQ(13, 1, [157, 236], [403, 79]),
  colQ(14, 1, [425, 318], [753, 107]),
  colQ(15, 1, [263, 154], [427, 109]),
  colQ(16, 1, [182, 375], [567, 193]),
  colQ(17, 1, [403, 285], [698, 118, 588]),
  colQ(18, 1, [121, 233, 314], [678, 354, 568]),
  Q(19, 1, 'Hiányzó számjegy', 'Melyik számjegy van a „?” helyén?', [5, 4, 6, 3], 'Tízesek: ? + 0 = 5, tehát a ? = 5. Ellenőrzés: 153 + 304 = 457.', <ColumnFig addends={['1?3', 304]} result={457} />),
  Q(20, 1, 'Hiányzó számjegy', 'Melyik számjegy van a „?” helyén?', [1, 2, 0, 3], 'Tízesek: ? + 5 = 6, tehát a ? = 1. Ellenőrzés: 216 + 152 = 368.', <ColumnFig addends={['2?6', 152]} result={368} />),
  Q(21, 1, 'Hiányzó szám', '□ + 200 = 563. Mennyi a □?', [363, 763, 563, 343], 'Ha 200-at hozzáadva 563 lett, akkor előtte 2 százassal kevesebb volt: 363. Ellenőrzés: 363 + 200 = 563.'),
  Q(22, 1, 'Hiányzó szám', '340 + □ = 400. Mennyi a □?', [60, 160, 70, 40], '340-től 400-ig 6 tízes hiányzik: 60. Ellenőrzés: 340 + 60 = 400.'),
  Q(
    23,
    1,
    'Az összeg változása',
    'Az 1. tag 100-zal nőtt. Mennyi az új összeg?',
    [557, 467, 457, 657],
    'Ha egy tag 100-zal nő, az összeg is 100-zal nő: 457 + 100 = 557.',
    <ChangeRowsFig rows={[[312, 145, 457], [412, 145, '?']]} changes={[['+100', null, '?']]} />
  ),
  Q(24, 1, 'Az összeg változása', 'Az egyik tag 10-zel nő, a másik nem változik. Mi lesz az összeggel?', ['10-zel nő', 'nem változik', '10-zel csökken', '20-szal nő'], 'Amennyivel nő a tag, annyival nő az összeg is: 10-zel.'),
  Q(
    25,
    1,
    'Az összeg változása',
    'Az 1. tag 10-zel csökkent. Mennyi az új összeg?',
    [382, 402, 392, 292],
    'Ha egy tag 10-zel csökken, az összeg is 10-zel csökken: 392 − 10 = 382.',
    <ChangeRowsFig rows={[[264, 128, 392], [254, 128, '?']]} changes={[['−10', null, '?']]} />
  ),
  Q(26, 1, 'Felcserélés', '253 + 418 = 671. Mennyi 418 + 253?', [671, 661, 681, 165], 'Ha felcseréled a tagokat, az összeg nem változik: 671.'),
  Q(
    27,
    1,
    'Szöveges feladat',
    'Az állatkertbe délelőtt 134, délután 252 látogató jött. Hányan jöttek összesen?',
    [386, 396, 118, 486],
    'Összesen kell: 134 + 252 = 386. 386 látogató jött.',
    <PartsFig parts={[{ v: 134, text: '134' }, { v: 252, text: '252' }]} labels={['délelőtt', 'délután']} />
  ),
  Q(
    28,
    1,
    'Vásárlás',
    'Mennyibe kerül a két dolog együtt?',
    ['577 Ft', '587 Ft', '107 Ft', '477 Ft'],
    '235 + 342: 5 meg 2 az 7, 3 meg 4 az 7, 2 meg 3 az 5. Együtt 577 Ft.',
    <TagsFig items={[{ name: 'labda', price: 235 }, { name: 'kirakó', price: 342 }]} />
  ),
  Q(29, 1, 'Terv', 'Egy dobozban 145 piros és 230 kék golyó van. Hány golyó van a dobozban? Melyik a terv?', ['145 + 230', '230 − 145', '145 + 145', '230 + 230'], 'A pirosakat és a kékeket össze kell adni: 145 + 230 = 375.'),
  Q(
    30,
    1,
    '…-val több',
    'A kék kötél 214 cm. A piros 135 cm-rel hosszabb. Milyen hosszú a piros kötél?',
    ['349 cm', '79 cm', '339 cm', '563 cm'],
    'A piros a hosszabb: 214 + 135 = 349. A piros kötél 349 cm.',
    <BarsFig
      rows={[
        { name: 'kék', segs: [{ v: 214, text: '214 cm', color: BLUE }] },
        { name: 'piros', segs: [{ v: 214, text: '214 cm', color: '#fca5a5' }, { v: 135, text: '135', color: '#fecaca' }], after: '?' }
      ]}
      nameW={44}
    />
  ),

  // ======================= 2. szint =======================
  Q(31, 2, 'Fejben', 'Mennyi 290 + 340?', [630, 530, 620, 640], '29 tízes + 34 tízes = 63 tízes = 630.'),
  Q(32, 2, 'Fejben', 'Mennyi 460 + 70?', [530, 430, 540, 467], '46 tízes + 7 tízes = 53 tízes = 530. Átléptük az 500-at!'),
  Q(33, 2, 'Fejben', 'Mennyi a 375 és a 200 összege?', [575, 395, 175, 577], 'Az összeg az összeadás eredménye: 375 + 200 = 575.'),
  Q(
    34,
    2,
    'Becslés',
    'Nóri kiszámolta: 457 + 286 = 643. A becslése: 460 + 290 = 750. Jó a számolása?',
    ['Nem, a helyes 743.', 'Igen, jó.', 'Nem, a helyes 843.', 'Nem, a helyes 633.'],
    'A 643 messze van a 750-től. Számoljuk újra: 457 + 286 = 743. Nóri a százasoknál elfelejtette a maradékot.'
  ),
  Q(35, 2, 'Becslés', 'Becsüld meg tízesre kerekítve! 384 + 247 + 105 ≈ ?', ['B: 740', 'B: 640', 'B: 840', 'B: 750'], '384 ≈ 380, 247 ≈ 250, 105 ≈ 110. 380 + 250 + 110 = 740. A pontos 736.'),
  Q(
    36,
    2,
    'Elég a pénz?',
    'Van 600 Ft-od. Elég a két dologra?',
    ['Nem, a kettő 607 Ft.', 'Igen, a kettő 597 Ft.', 'Igen, a kettő 507 Ft.', 'Nem, a kettő 617 Ft.'],
    'Becslés: 290 + 320 = 610, ez határeset. Pontosan: 289 + 318 = 607 Ft. Ez 7 Ft-tal több, mint 600, nem elég.',
    <TagsFig items={[{ name: 'kifestő', price: 289 }, { name: 'zsírkréta', price: 318 }]} />
  ),
  Q(37, 2, 'Kerekítés', 'Kerekítsd százasra! 650 ≈ ?', [700, 600, 650, 660], 'A 650 tízese 5, ezért felfelé kerekítünk: 700.'),
  colQ(38, 2, [278, 145], [413, 133]),
  colQ(39, 2, [369, 257], [616, 112]),
  colQ(40, 2, [486, 237], [713, 249]),
  colQ(41, 2, [195, 408], [613, 213]),
  colQ(42, 2, [547, 276], [813, 271]),
  colQ(43, 2, [146, 238, 115], [489, 384]),
  colQ(44, 2, [207, 164, 98], [479, 371]),
  colQ(45, 2, [358, 64], [998, 412]),
  colQ(46, 2, [629, 87], [726, 542]),
  Q(47, 2, 'Hiányzó számjegy', 'Melyik számjegy van a „?” helyén?', [8, 9, 7, 3], 'Egyesek: 7 + 8 = 15, leírom az 5-öt, maradt 1. Tízesek: ? + 4 + 1 = 13, tehát ? = 8. Ellenőrzés: 387 + 248 = 635.', <ColumnFig addends={['3?7', 248]} result={635} />),
  Q(48, 2, 'Hiányzó számjegy', 'Melyik számjegy van a „?” helyén?', [5, 6, 4, 9], 'Egyesek: 6 + 9 = 15, maradt 1. Tízesek: 5 + ? + 1 = 11, tehát ? = 5. Ellenőrzés: 256 + 159 = 415.', <ColumnFig addends={[256, '1?9']} result={415} />),
  Q(49, 2, 'Hiányzó számjegy', 'Melyik számjegy van a „?” helyén?', [3, 2, 4, 1], 'Tízesek: 7 + 6 = 13, leírom a 3-at, maradt 1. A ? = 3. 174 + 263 = 437.', <ColumnFig addends={[174, 263]} result="4?7" />),
  Q(
    50,
    2,
    'Hiányos összeadás',
    '168 + □ = 435. Mennyi a □?',
    [267, 277, 603, 257],
    'Egyesek: 8 meg mennyi az 15? 7, maradt 1. Tízesek: 6 meg 1 az 7, meg mennyi az 13? 6, maradt 1. Százasok: 1 meg 1 az 2, meg mennyi az 4? 2. □ = 267. Ellenőrzés: 168 + 267 = 435.',
    <ColumnFig addends={[168, '???']} result={435} />
  ),
  Q(
    51,
    2,
    'Az összeg változása',
    'Mindkét tag 10-zel nőtt. Mennyi az új összeg?',
    [564, 554, 544, 574],
    '+10 és +10, együtt 20. Az összeg 20-szal nő: 544 + 20 = 564.',
    <ChangeRowsFig rows={[[318, 226, 544], [328, 236, '?']]} changes={[['+10', '+10', '?']]} />
  ),
  Q(
    52,
    2,
    'Az összeg változása',
    'Mennyi az új összeg?',
    [433, 453, 443, 413],
    'Az 1. tag 10-zel nő, a 2. tag 10-zel csökken. Az összeg nem változik: 433.',
    <ChangeRowsFig rows={[[247, 186, 433], [257, 176, '?']]} changes={[['+10', '−10', '?']]} />
  ),
  Q(
    53,
    2,
    'Összehasonlítás',
    'Számolás nélkül: melyik igaz?',
    ['356 + 189 = 366 + 179', '356 + 189 < 366 + 179', '356 + 189 > 366 + 179', 'Csak számolással lehet eldönteni.'],
    'Jobbra az 1. tag 10-zel több, a 2. tag 10-zel kevesebb. Az összeg ugyanannyi: 545.',
    <CompareSumsFig l={[356, 189]} r={[366, 179]} />
  ),
  Q(54, 2, 'Okos számolás', 'Számolj okosan! 398 + 275 = ?', [673, 663, 675, 573], 'A 398-hoz 2-t adok, a 275-ből 2-t elveszek: 400 + 273 = 673.'),
  Q(
    55,
    2,
    '…-val több',
    'A busz első nap 185 km-t ment, a második nap 96 km-rel többet. Hány km-t ment a második napon?',
    ['281 km', '89 km', '271 km', '466 km'],
    'A második nap ugyanannyi, és még 96: 185 + 96 = 281 km.',
    <BarsFig
      rows={[
        { name: '1. nap', segs: [{ v: 185, text: '185 km', color: BLUE }] },
        { name: '2. nap', segs: [{ v: 185, text: '185 km', color: BLUE }, { v: 96, text: '96', color: GREEN }], after: '?' }
      ]}
      nameW={46}
    />
  ),
  Q(
    56,
    2,
    'Csapda',
    'A fiúk 236 gesztenyét gyűjtöttek. Ez 87-tel kevesebb, mint amennyit a lányok. Hány gesztenyét gyűjtöttek a lányok?',
    [323, 149, 313, 559],
    'A lányok gyűjtöttek többet, ezért összeadunk: 236 + 87 = 323.',
    <BarsFig
      rows={[
        { name: 'fiúk', segs: [{ v: 236, text: '236', color: YEL }] },
        { name: 'lányok', segs: [{ v: 236, text: '236', color: GREEN }, { v: 87, text: '87', color: '#bbf7d0', dashed: true }], after: '?' }
      ]}
      nameW={50}
    />
  ),
  Q(57, 2, 'Étlap', 'Mennyibe kerül a palacsinta lekvárral és tejszínhabbal?', ['375 Ft', '365 Ft', '255 Ft', '475 Ft'], '160 + 95 + 120 = 375 Ft.', <MenuFig />),
  Q(
    58,
    2,
    'Táblázat',
    'Hány jegy kelt el hétfőn és szerdán együtt?',
    [421, 563, 411, 69],
    'Csak a hétfő és a szerda kell: 245 + 176 = 421.',
    <ListTableFig title="Eladott jegyek" rows={[['hétfő', '245'], ['kedd', '318'], ['szerda', '176']]} />
  ),
  Q(59, 2, 'Kérdés', 'Egy kosárban 248 alma, egy másikban 167 körte van. Melyik kérdésre felel a 248 + 167?', ['Hány gyümölcs van a két kosárban?', 'Mennyivel több az alma?', 'Hány alma van?', 'Hány körte van?'], 'Az összeadás azt mondja meg, mennyi van összesen: 248 + 167 = 415 gyümölcs.'),
  Q(
    60,
    2,
    'Három adat',
    'A könyvtárba hétfőn 215, kedden 148, szerdán 96 gyerek ment. Hányan mentek összesen?',
    [459, 349, 363, 559],
    speakAdd([215, 148, 96]),
    <PartsFig parts={[{ v: 215, text: '215' }, { v: 148, text: '148' }, { v: 96, text: '96' }]} labels={['hétfő', 'kedd', 'szerda']} />
  ),

  // ======================= 3. szint =======================
  Q(61, 3, 'Gondoltam egy számra', 'Melyik számra gondoltam? A 274-nél 158-cal nagyobb.', [432, 116, 422, 532], '158-cal nagyobb, ezért összeadunk: 274 + 158 = 432.', <ColumnFig addends={[274, 158]} />),
  Q(62, 3, 'Gondoltam egy számra', 'Melyik számra gondoltam? A 247 és a 386 összege.', [633, 523, 623, 139], speakAdd([247, 386])),
  Q(
    63,
    3,
    'Hiányos összeadás',
    '□ + 268 = 531. Mennyi a □?',
    [263, 273, 799, 363],
    'Egyesek: mennyi meg 8 az 11? 3, maradt 1. Tízesek: mennyi meg 6 meg 1 az 13? 6, maradt 1. Százasok: mennyi meg 2 meg 1 az 5? 2. □ = 263.',
    <ColumnFig addends={['???', 268]} result={531} />
  ),
  Q(64, 3, 'Becslés', 'Melyik összeg van a legközelebb a 600-hoz?', ['289 + 307', '198 + 312', '406 + 285', '350 + 155'], 'Becsülj: 290 + 310 = 600, 200 + 310 = 510, 410 + 290 = 700, 350 + 160 = 510. A 289 + 307 = 596 van a legközelebb.'),
  Q(65, 3, 'Becslés', 'Becsüld meg tízesre kerekítve! 238 + 149 + 312 ≈ ?', ['B: 700', 'B: 600', 'B: 690', 'B: 800'], '238 ≈ 240, 149 ≈ 150, 312 ≈ 310. 240 + 150 + 310 = 700. A pontos 699.'),
  Q(
    66,
    3,
    'Elég a pénz?',
    'Van 1000 Ft-od. Megveszed mind a hármat. Elég a pénzed?',
    ['Igen, és marad 18 Ft.', 'Nem, 18 Ft hiányzik.', 'Igen, és marad 118 Ft.', 'Nem, 82 Ft hiányzik.'],
    '375 + 289 + 318 = 982 Ft. Ez kevesebb, mint 1000 Ft. 982-től 1000-ig 18 Ft marad.',
    <TagsFig items={[{ name: 'könyv', price: 375 }, { name: 'labda', price: 289 }, { name: 'kirakó', price: 318 }]} />
  ),
  colQ(67, 3, [459, 386], [835, 73]),
  colQ(68, 3, [278, 345, 167], [780, 690]),
  colQ(69, 3, [394, 198, 207], [789, 699]),
  colQ(70, 3, [586, 258, 79], [913, 823]),
  colQ(71, 3, [476, 389], [855, 87]),
  Q(
    72,
    3,
    'Hiányzó számjegyek',
    'Melyik két számjegy hiányzik? (A felső számban és az alsóban.)',
    ['2 és 7', '3 és 7', '2 és 8', '1 és 7'],
    'Egyesek: 8 + 5 = 13, maradt 1. Tízesek: 4 + ? + 1 = 12, tehát ? = 7, maradt 1. Százasok: ? + 1 + 1 = 4, tehát ? = 2. 248 + 175 = 423.',
    <ColumnFig addends={['?48', '1?5']} result={423} />
  ),
  Q(
    73,
    3,
    'Hiányzó számjegyek',
    'Melyik két számjegy hiányzik? (A felső számban és az alsóban.)',
    ['4 és 7', '5 és 7', '4 és 3', '3 és 7'],
    'Egyesek: 4 + ? = 11, tehát ? = 7, maradt 1. Tízesek: ? + 3 + 1 = 8, tehát ? = 4. 244 + 137 = 381.',
    <ColumnFig addends={['2?4', '13?']} result={381} />
  ),
  Q(
    74,
    3,
    'Hiányos összeadás',
    '□ + 186 = 512. Mennyi a □?',
    [326, 336, 698, 426],
    'Egyesek: mennyi meg 6 az 12? 6, maradt 1. Tízesek: mennyi meg 8 meg 1 az 11? 2, maradt 1. Százasok: mennyi meg 1 meg 1 az 5? 3. □ = 326.',
    <ColumnFig addends={['???', 186]} result={512} />
  ),
  Q(
    75,
    3,
    'Mi változott?',
    '238 + 145 = 383. Mennyi 258 + 165?',
    [423, 403, 393, 443],
    'Mindkét tag 20-szal nőtt. Az összeg 40-nel nő: 383 + 40 = 423.',
    <ChangeRowsFig rows={[[238, 145, 383], [258, 165, '?']]} changes={[['?', '?', '?']]} />
  ),
  Q(76, 3, 'Nyitott mondat', '276 + □ < 500. Melyik a legnagyobb szám, ami a □ helyére írható?', [223, 224, 276, 213], '276 + 224 = 500, ez már nem kisebb, mint 500. Ezért a legnagyobb a 223: 276 + 223 = 499.'),
  Q(
    77,
    3,
    'Az összeg változása',
    'Mennyi az új összeg?',
    [814, 854, 834, 714],
    'Az 1. tag +100, a 2. tag −20. Együtt +80. 734 + 80 = 814.',
    <ChangeRowsFig rows={[[456, 278, 734], [556, 258, '?']]} changes={[['+100', '−20', '?']]} />
  ),
  Q(
    78,
    3,
    'Igaz vagy hamis?',
    'Melyik állítás IGAZ?',
    [
      'Ha az egyik tag 50-nel nő, a másik 50-nel csökken, az összeg nem változik.',
      'Ha az egyik tag 50-nel nő, a másik 50-nel csökken, az összeg 100-zal nő.',
      'Ha mindkét tag 100-zal nő, az összeg 100-zal nő.',
      'Ha az egyik tag 10-zel csökken, az összeg 10-zel nő.'
    ],
    '+50 és −50 együtt 0, ezért az összeg nem változik. Ha mindkét tag 100-zal nő, az összeg 200-zal nő.'
  ),
  Q(
    79,
    3,
    'Két lépés',
    'Délelőtt 186 jegy kelt el, délután 147-tel több. Hány jegy kelt el egész nap?',
    [519, 333, 509, 419],
    '1. Délután: 186 + 147 = 333. 2. Egész nap: 186 + 333 = 519 jegy.',
    <BarsFig
      rows={[
        { name: 'délelőtt', segs: [{ v: 186, text: '186', color: BLUE }] },
        { name: 'délután', segs: [{ v: 186, text: '186', color: BLUE }, { v: 147, text: '147', color: GREEN }], after: '?' }
      ]}
      nameW={58}
      caption="egész nap: ?"
    />
  ),
  Q(
    80,
    3,
    'Csapda, két lépés',
    'A 3.a 268 kg papírt gyűjtött, ez 85 kg-mal kevesebb, mint a 3.b. Mennyit gyűjtött a két osztály együtt?',
    ['621 kg', '353 kg', '451 kg', '611 kg'],
    '1. A 3.b gyűjtött többet: 268 + 85 = 353 kg. 2. Együtt: 268 + 353 = 621 kg.',
    <BarsFig
      rows={[
        { name: '3.a', segs: [{ v: 268, text: '268 kg', color: YEL }] },
        { name: '3.b', segs: [{ v: 268, text: '268 kg', color: GREEN }, { v: 85, text: '85', color: '#bbf7d0', dashed: true }], after: '?' }
      ]}
      nameW={40}
      caption="együtt: ?"
    />
  ),
  Q(81, 3, 'Étlap', 'Két palacsintát kérsz: egy kakaósat és egy túrósat. Mennyit fizetsz?', ['550 Ft', '390 Ft', '540 Ft', '450 Ft'], 'Kakaós: 160 + 85 = 245 Ft. Túrós: 160 + 145 = 305 Ft. Együtt: 245 + 305 = 550 Ft.', <MenuFig />),
  Q(
    82,
    3,
    'Két lépés',
    'Egy sorozat 1. kötete 148 oldal. A 2. kötet 56 oldallal hosszabb. A 3. kötet 175 oldal. Hány oldal a három kötet?',
    [527, 379, 517, 427],
    '1. A 2. kötet: 148 + 56 = 204 oldal. 2. Együtt: 148 + 204 + 175 = 527 oldal.',
    <BarsFig
      rows={[
        { name: '1. kötet', segs: [{ v: 148, text: '148', color: BLUE }] },
        { name: '2. kötet', segs: [{ v: 148, text: '148', color: BLUE }, { v: 56, text: '56', color: GREEN }] },
        { name: '3. kötet', segs: [{ v: 175, text: '175', color: YEL }] }
      ]}
      nameW={58}
    />
  ),
  Q(
    83,
    3,
    'Táblázat',
    'Hány pontot gyűjtött a csapat a három fordulóban?',
    [831, 611, 633, 821],
    speakAdd([286, 347, 198]),
    <ListTableFig title="A csapat pontjai" rows={[['1. forduló', '286'], ['2. forduló', '347'], ['3. forduló', '198']]} />
  ),
  Q(
    84,
    3,
    'Melyik három?',
    'Válassz ki hármat úgy, hogy az összegük pontosan 500 legyen! Melyik a jó?',
    ['124, 233 és 143', '124, 209 és 168', '187, 168 és 143', '168, 233 és 95'],
    '124 + 233 + 143 = 500. A többi: 501, 498 és 496.'
  ),
  Q(
    85,
    3,
    'Két lépés',
    'A vonat két kocsijában 286 és 214 utas ült. Az állomáson még 97-en szálltak fel. Hányan utaznak most?',
    [597, 500, 587, 697],
    '1. A két kocsiban: 286 + 214 = 500. 2. Még 97: 500 + 97 = 597 utas.',
    <PartsFig parts={[{ v: 286, text: '286' }, { v: 214, text: '214' }, { v: 97, text: '97' }]} labels={['1. kocsi', '2. kocsi', 'felszállt']} />
  ),
  Q(
    86,
    3,
    'Kérdés',
    'Mesi 175 matricát gyűjtött, Ádám 48-cal többet (223-at). Melyik kérdés megoldása a 175 + 223?',
    ['Hány matricát gyűjtöttek ketten együtt?', 'Hány matricát gyűjtött Ádám?', 'Mennyivel gyűjtött többet Ádám?', 'Hány matricát gyűjtött Mesi?'],
    'A 175 Mesi, a 223 Ádám gyűjtése. A kettő összege azt mondja meg, mennyit gyűjtöttek együtt: 398.'
  ),
  Q(
    87,
    3,
    'Hiányzó számjegyek',
    'Melyik számjegyek bújtak el? (Fentről lefelé: a felső számban, az alsóban, az összegben.)',
    ['3, 8 és 4', '3, 7 és 4', '4, 8 és 4', '2, 8 és 4'],
    'Egyesek: 6 + 8 = 14, leírom a 4-et, maradt 1. Tízesek: 3 + ? + 1 = 12, tehát ? = 8, maradt 1. Százasok: ? + 2 + 1 = 6, tehát ? = 3. 336 + 288 = 624.',
    <ColumnFig addends={['?36', '2?8']} result="62?" />
  ),
  colQ(88, 3, [88, 345, 207], [630, 540]),
  Q(89, 3, 'Elég a pénz?', 'Van 500 Ft-od, és kapsz még 285 Ft-ot. Elég egy 790 Ft-os társasjátékra?', ['Nem, 5 Ft hiányzik.', 'Igen, és marad 5 Ft.', 'Igen, pont elég.', 'Nem, 15 Ft hiányzik.'], '500 + 285 = 785 Ft. 785 kevesebb, mint 790. 5 Ft hiányzik.'),
  Q(90, 3, 'Írásbeli összeadás', 'Melyik összeadás eredménye pontosan 1000?', ['625 + 375', '625 + 385', '615 + 375', '635 + 375'], '5 meg 5 az 10, leírom a 0-t, maradt 1. 2 meg 7 az 9, meg 1 az 10, leírom a 0-t, maradt 1. 6 meg 3 az 9, meg 1 az 10. 625 + 375 = 1000.')
];

export const WrittenAddExamG3Quiz: React.FC<{
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
      topicId="g3-wadd-tudasproba-quiz"
      subtopicId="megallo"
      title="6. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: fejben számolás, becslés, írásbeli összeadás két és három taggal, hiányzó számjegyek, az összeg változásai, szöveges feladatok."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
      questions={WRITTEN_ADD_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli összeadás',
          items: ['Egymás alá, helyi érték szerint', 'Egyesektől balra haladj', '13 → leírom a 3-at, maradt 1']
        },
        {
          title: 'Becslés, ellenőrzés',
          items: ['278 ≈ 280, 145 ≈ 150 → B: 430', 'Felcserélés: 145 + 278 = 423', 'Ha messze van a becsléstől, számold újra!']
        },
        {
          title: 'Változás, szöveg',
          items: ['+10 és −10 → az összeg nem változik', '„…-val kevesebb, mint” → csíkot rajzolj!', 'Két lépés: előbb a hiányzó adat']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenAddExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WrittenAddExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WrittenAddExamG3Quiz;
