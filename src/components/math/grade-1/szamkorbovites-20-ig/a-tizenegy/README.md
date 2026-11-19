# 1. A tizenegy (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 26–41. o. (benne a „Számok 0-tól 20-ig” bevezető 26–33. o., „A tizenegy” 34–35. o., „Számolás 0-tól 11-ig” 36–41. o.), OH-MAT01MA_II 16–25. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **Munkafüzet (MF 16–25):** tekebábuk 11–20, számnév ↔ 10 + □, számlálás 20-ig, egy- és kétjegyű számok; 11 virág, dominók, rajzolj 11-re, páratlan ugróiskola, szomszédok, 9 + 2 = 9 + 1 + 1 korongokkal, 11-ből elvétel, építmények, gombák a kosárba, lepkék (méter), virágszedés (3-mal kevesebb).
- **Számok 0-tól 20-ig (26–33.):** játékbolt-kép (miből van tíznél több), labdák hálóban: 10 a hálóban + a többi kint, két tízes pöttykép (10–20), macik a 0–20-as számegyenesen, egyjegyű/kétjegyű számok, számnevek és számjegyek párosítása, számtáblázat, hiányzó számok kukacon, rajzolás jelek szerint, `<`/`>`, számszomszédok, páros/páratlan 20-ig, növekvő sorrend, „melyik nem illik közé”, sorszámnevek, pénz (Ft).
- **A tizenegy (34–35.):** virágos kert, a 11 számjegy, dominópár (5|5 és 1|0), 10 labda hálóban + 1, számegyenes 0–20 a 11 jelölésével; virágok számlálása keretekben, jelek; méhecskék számlálása, váza-rajz „mennyivel kevesebb” jelekkel, 11 bontástáblázata (nárcisz + tulipán).
- **Számolás 0-tól 11-ig (36–41.):** 10 + 1, 1 + 10, 11 − 1, 11 − 10 képről; **tízesátlépés**: 9 + 2 = 9 + 1 + 1, 6 + 5, 7 + 4 (előbb 10-re pótolunk); 11 bontása számházban; 11 − 2 = 11 − 1 − 1 (előbb 10-ig veszünk el); szöveges feladatok (6 + 5 vödör virágpor, 7 + 4 − 3 virág); ugrások a számegyenesen.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenegyG1Mese`, 12 oldal, 8 mini-feladat): „Pötyi és a tizenegy tulipán”. Pötyi a pöttyeivel számolja a tulipánokat, de 10-nél megtelik mindkét szárnya – Zümi tartja a 11. pöttyöt: **egy tízes és egy egyes**. Ugyanez két tízes kerettel és Csigusz tízesrúdjával, a 11 írása, helye a számegyenesen, 11 > 9, 10 + 1 = 11 és 11 − 1 = 10, majd a könyv módszerével 9 + 2 (előbb 10-re töltjük a keretet) és 11 − 2 (előbb a 10-ig veszünk el).
- **Játszótér** (`ElevenFramesPlayground` = `FramesBuildLab max={11}`): „Rakd ki korongokkal!” – egy szám (5–11, leggyakrabban 10–11) mellett két tízes keret; a gyerek korongot tesz ki / vesz le, Pötyi visszajelez („11: 1 tízes és 1 egyes”).
- **Játék** (`ATizenegyG1Jatek`): Kérdések 3 × 8 (`A_TIZENEGY_G1_QUESTIONS`), Párosító 3 szint (`A_TIZENEGY_G1_PAIRS`: kép ↔ szám, keret ↔ tízesrúd/dominópár, művelet ↔ eredmény), Válogató 3 szint (`A_TIZENEGY_G1_SORT`: 11 / nem 11, kevesebb mint 11 / pont 11, eredmény 10 vagy 11).

Fájlok: `ATizenegyG1Scenes.tsx` – a 12–14-es leckék közös képei is (`TwoFrames` két tízes kerettel és áthúzással, `TensRod`, `BagScene`, `GroupBox`/`MiniGroup` 0–15, `CompareScene`, `OpScene`, `ExprScene`, `SeqStrip`, `PotyiScene` számmal, `PotyiPlusScene`, `DominoPair`, `ScatterScene`), `ATizenegyG1Parts.tsx` (`FramesBuildLab`), `ATizenegyG1Mese.tsx`, `ATizenegyG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic6ATizenegyG1.test.tsx`.

## Eltérések a tankönyvtől
- A könyv a „Számok 0-tól 20-ig” résszel egyszerre mutatja meg a számokat 20-ig (számegyenes, páros/páratlan, szomszédok, sorrend 20-ig). Nálunk – a fokozatosság kedvéért – csak a lényeg kerül ide: a 10 fölötti szám **1 tízes + egyesek** (tízes zsák, két tízes keret, tízesrúd); minden szám és számegyenes legfeljebb 11-ig megy. A 12–20 a saját leckéjükben jön.
- Emiatt a 11 nagyobb szomszédját (12) nem kérdezzük (a könyv a 34. oldalon kéri, a számegyenes 20-ig megy).
- A tízesátlépést a könyv szerint tanítjuk (9 + 2 = 9 + 1 + 1, 11 − 2 = 11 − 1 − 1), de felbontott műveletsor helyett a két tízes keret képével és szóban.
- A „mennyivel kevesebb” jelölés (szám a relációs jelben), a háromtagú műveletek (7 + 4 − 3), a pénz és a sorszámnevek 20-ig kimaradtak; a rajzolós, színezős, összekötős feladatok koppintós formában (képválasztás, párosító, válogató) jelennek meg.
- Saját mese és saját számok (tulipánok, Zümi pöttye, Csigusz tízesrúdja); a könyv szereplői nem jelennek meg.
- Munkafüzet (MF II/16–25): a 11-es oldalak (MF 20–25) ötletei (dominók összehasonlítása, „rajzolj, hogy 11 legyen”, 9 + 2 = 9 + 1 + 1 korongokkal, gombák eredmény szerint) koppintós formában szerepelnek; a méteres lepkeverseny és a „mennyivel kevesebb” szöveges feladatok kimaradtak. Könyvhibát nem találtunk.
