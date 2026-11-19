# 8. A tizennyolc (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 100–105. o. (A tizennyolc, Számolás 0-tól 18-ig), OH-MAT01MA_II 60–63. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizennyolc (TK 100, MF 60):** cirkuszkép („Miből van tizennyolc? Miből kevesebb, több?”), a 18 számjegye, dominók (5|5 és 5|3), háló 10 labdával + 8 labda, a 18 a 0–20-as számegyenesen és számszomszédai, számlálás a képről, kockaoszlopok 14, 17, 18 és jelek; MF: miből van 18, állatcsoportok „Melyik több? Mennyivel?”, pontösszekötő 1–20, növekvő sorrend.
- **Számolás 0-tól 18-ig (TK 101–105, MF 61–63):** összeadás és kivonás képekről (léggömbök, kipukkadt léggömbök), pótlás (□ + 12 = 18, 3 + □ = 18), műveletek összekötése eredményekkel (18 − 4, 18 − 2 − 3, 18 − 8 + 1), sorozatok számegyenesen (kettesével, visszafelé, hármasával), „minden / van olyan” állítások, 18 petákból 5-ösével állatsimogatás, párkereső léggömbök (9 + 9 ↔ 10 + 4 + 4…), **tízen átlépés**: 9 + 9 = 9 + 1 + 8 és 18 − 9 = 18 − 8 − 1 (nyilak a számegyenesen), különbségek (15 − 9 … 18 − 9), sárga + piros + kék = 18 táblázat, dl-es mérőszámok, számkártyás csoportjáték; MF: kivonások, páros/páratlan színezés, színes rudas összeadások, jelek (6 + 7 □ 8 + 5), dl-es kancsók, színezés összegek szerint, „7 oroszlán, 4-gyel több tigris”, műveletláncok.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizennyolcG1Mese`, „Pötyi és Zümi születésnapja”, 12 oldal, 9 mini-feladat): 10 piros + 8 sárga lufi; Pötyi teli szárnya (1 tízes) + 8 egyes; két keret, tízesrúd, dominópár; a 18 a számegyenesen (kisebb szomszéd); 9 + 9 → „hány kell a tízhez?” → 9 + 1 + 8; 9 lufi kipukkad (a 8 sárga és 1 piros): 18 − 9 = 18 − 8 − 1; párba kötött lufik – kettesével 18-ig, a 18 páros; hármas csokrok; 18 körhinta-korong ötösével (3 kör, 3 marad).
- **Játszótér** (`BackToTenPlayground`): „Előbb vissza a tízig!” – véletlen tízen átlépő kivonás (11–18 elvéve legfeljebb 9). 1. lépés: hányat vegyünk el, hogy 10 maradjon (a második keret áthúzódik); 2. lépés: mennyi marad (megjelenik a 18 − 8 − 1 alak).
- **Játék** (`ATizennyolcG1Jatek`): Kérdések 3 × 8 (`A_TIZENNYOLC_G1_QUESTIONS`; számlálás, tízes és egyes, □ + 12 = 18, kipukkadt lufik, 9 + 9, sorozatok előre és vissza, jelek, 18 − 9, 9 + 6 + □ = 18, ötösével csoportosítás, „4-gyel több”, kétlépéses történet), Párosító (lufik ↔ szám; két keret ↔ 10 + egyes; a könyv léggömbpárjai: 9 + 9 ↔ 10 + 4 + 4, 8 + 2 + 5 ↔ 9 + 6, 8 + 5 ↔ 10 + 3, 18 − 9 ↔ 18 − 8 − 1, 18 − 4 ↔ 17 − 3), Válogató (18 / nem 18; páros / páratlan; összegek 16, 17, 18 kosárba).

Fájlok: `ATizennyolcG1Scenes.tsx` (`balloonG`, `BalloonScene` – kipukkadt lufikkal is, `BalloonBox`/`MiniBalloons`, `BalloonGroups` – csoportonként váltakozó szín, `TokensScene` – körhinta-korongok ötös karikával, `balloonGarland`), `ATizennyolcG1Parts.tsx`, `ATizennyolcG1Mese.tsx`, `ATizennyolcG1Jatek.tsx`, `index.ts`; a közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6ATizennyolcG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (Zümi születésnapja, lufik és körhinta a Számkertben) a könyv cirkusza helyett; a „Számolás 0-tól 18-ig” rész is ebben a leckében van. A petákos állatsimogatásból körhinta-korong lett (ugyanaz: 18 ötösével = 3 csoport, 3 marad).
- Számkör: csak 0–18. A könyv a 18 mindkét számszomszédját kéri, a számegyenesek és a kettes sorozat 20-ig mennek, a pontösszekötő (MF 60/3) 20-ig, a hármas sorozat (TK 102/1, 4. sor) pedig a 21-ig – ezek a számok még nem tanultak. Nálunk csak a kisebb szomszéd (17), a számegyenes és a sorozatok 18-ig tartanak.
- Kimaradt: a „minden / van olyan / nem minden” állítások, a dl-es mérőszámok, a háromtagú összeg táblázata (helyette egy 9 + 6 + □ = 18 kérdés), a pontösszekötő, a színezések és a csoportjáték.
- A „7 oroszlán, 4-gyel több tigris” feladat saját történetként szerepel (Csigusz 7 lufija, Zümi 4-gyel több → 11; együtt 18).
- Könyvhiba nem volt; csak a fenti, a tanult számkörön túlmutató számok (19, 20, 21).
