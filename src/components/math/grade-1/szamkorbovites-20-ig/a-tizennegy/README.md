# 4. A tizennégy (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 64–73. o. (A tizennégy 64–65., Számolás 0-tól 14-ig 66–71., Megálló 72–73.), OH-MAT01MA_II 40–45. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizennégy (TK 64–65, MF 40–41):** akváriumkép („Miből van tizennégy?”), a 14 számjegye, dominók (5|5 és 4|0), tízes háló + 4 labda, a 14 a 0–20-as számegyenesen és számszomszédai; halak színezése, „Melyikben több? Mennyivel?”, kakukktojás a halakon, növekvő sorrend + páros számok, kagylók színezése szomszédok szerint, 14 = aranyhal + csikóhal táblázat; MF: melyik akváriumban van 14 hal, páros számszomszédok, pontok összekötése, narancs + kék hal = 14, hármas bontás színezéssel.
- **Számolás 0-tól 14-ig (TK 66–71, MF 42–45):** műveletnégyesek (11 + 3, 3 + 11, 14 − 3, 14 − 11), halak a hálóba eredmény szerint, jelek, **tagok, összeg, kisebbítendő, kivonandó, különbség**, „11 hal + 3 aranyhal” szöveges feladat, számpiramis; **tízen átlépés**: 9 + 5 = 9 + 1 + 4, 8 + 6 = 8 + 2 + 4, 14 − 6 = 14 − 4 − 2, 14 − 7, 14 − 8 korongokkal, párosítás (14 − 6 ↔ 14 − 4 − 2), „7-tel több aranyhal” táblázat, kártyák a számegyenesre, nyilas műveletsor, páros/páratlan eredményű játék-halak, „kettesével veszi ki a 14 halat”; MF: 9 + □ = 14, 3 tagú összegek, csökkenő sorrend, sorozatok, szöveges feladatok (7 + 6 csiga, 5 + 3 + 4 hal).
- **Megálló (TK 72–73):** különbségek két képen, **jobbra és balra úszó halak**, szabálykövetés csigákkal, páros/páratlan számok tapssal, „mindegyik / van olyan” állítások, 13 hármas bontásai, igaz–hamis.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizennegyG1Mese`, „Pötyi és Csigusz akváriuma”, 12 oldal, 9 mini-feladat): Csigusz akváriumot kap; 14 hal számlálása; Pötyi teli szárnya (1 tízes) + levél 4 pöttyel; két keret, tízesrúd, dominópár; a 14 a számegyenesen (kisebb szomszéd 13); Csigusz kettesével meríti ki a halakat (7 háló, a 14 páros); jobbra–balra úszó halak; 11 + 3; 9 + 5 → „hány kell a tízhez?” → 9 + 1 + 4; 14 − 6 = 14 − 4 − 2.
- **Játszótér** (`NetSortPlayground`): „Melyik hálóba?” – a halon egy véletlen művelet (10 + 4, 11 + 3, 9 + 5, 14 − 2, 14 − 6 … eredmény 5–14), alatta korongok a két tízes keretben; a gyerek a 4 számozott háló közül a jóra koppint. Tízen átlépésnél Pötyi a „előbb a tízig” lépéseit mondja el segítségként.
- **Játék** (`ATizennegyG1Jatek`): Kérdések 3 × 8 (`A_TIZENNEGY_G1_QUESTIONS`; számlálás, tízes és egyes, balra úszó halak, 11 + 3 történet, tízre pótlás, 8 + 6, hálók kettesével, páros/páratlan párokkal, jelek, 14 − 6 két lépésben, 9 + □ = 14, „melyik hálóba?”, „mennyivel több?”), Párosító (halak ↔ szám; két keret ↔ 10 + egyes; 9 + 5 ↔ 9 + 1 + 4, 14 − 7 ↔ 14 − 4 − 3 stb.), Válogató (14 / nem 14; jobbra / balra úszik; eredmény 12, 13 vagy 14).

Fájlok: `ATizennegyG1Scenes.tsx` (`AquariumScene` – jobbra/balra úszó és kivett halak, `FishDirCard`, `NetCard`, `PairsScene` – halak párban hálókban, `OpFish` – hal művelettel, `fishG`), `ATizennegyG1Parts.tsx`, `ATizennegyG1Mese.tsx`, `ATizennegyG1Jatek.tsx`, `index.ts`; a közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6ATizennegyG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (Csigusz akváriuma a Számkertben); a könyv gyerekszereplői nem jelennek meg. A „Számolás 0-tól 14-ig” és a Megálló ötletei (jobbra/balra úszó halak, kettesével számolás) is ebben a leckében vannak.
- Számkör: csak 0–14. A könyv a 14 mindkét számszomszédját kéri, a számegyenesek 20-ig mennek, a kagylókon 15 és 16 is szerepel – nálunk csak a kisebb szomszéd (13), a számegyenes 14-ig tart. KÖNYVHIBA / pontatlanság: az MF 40/4 a 14 *páros* számszomszédjait kéri (12 és 16), a 16 még nem tanult szám; a 2 „páros szomszédai” (0 és 4) nem is szomszédok a szokásos értelemben.
- A tagok/összeg/kisebbítendő/kivonandó/különbség elnevezések kimaradtak (olvasás nélkül nem kérdezhetők); a mese szóban „összesen” és „marad” szavakat használ.
- A „7-tel több aranyhal” táblázat, a kg-os feladatok („6 kg-mal kevesebb” fordított szöveges feladat), a számpiramis, a 3 tagú összegek, a nyilas műveletsor, a betűrejtvény és a logikai állítások kimaradtak; a hálós összekötés a „Melyik hálóba?” játszótérben és egy kérdésben jelenik meg.
- A „Melyikben több? Mennyivel?” jelölés (szám a relációs jelben) helyett szóban kérdezünk („Mennyivel több hal van bal oldalon?”).
- A TK 65/4 táblázatában a 7 aranyhal kétszer szerepel (egyszer adott 7 csikóhalhoz kiszámolandóként, egyszer megadva) – nem hiba, csak ismétlés; nálunk nincs táblázatkitöltés.
