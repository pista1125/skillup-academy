# 18. Számolás 0-tól 10-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 124–127. o., OH-MAT01MA_I 64–65. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 124: korongképekről két összeadás, összegek összekötése a 0–10 számegyenessel, hóemberek gombjainak kiegészítése 10-re (3 + □ = 10). TK 125: áthúzott korongokról kivonás (10 − 4), vaddisznó és kukorica (kivonás képről), bakancspárok azonos eredménnyel, 10 − □ = 8 képekről. TK 126: korongokról műveletek, összeadás- és kivonásoszlopok 10-ig, nyitott mondatok (8 < ○, 8 < ○ < 10), a mókus két ugrása a számegyenesen. TK 127: hópelyhek felhőkben 10-re kiegészítve, □-es pótlások (9 + □ = 10, 10 − □ = 3), háromszög: három szám összege 10. MF 64: összeadások és kivonások 10-ig (cserepárok), sajt-dominókról összeadás, kiegészítés képről. MF 65: három tag összege 10, kártyák összekötése számmal, kivonások a számegyenesen, 10 − □ képről.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Szamolas0Tol10IgG1Mese`, „Pötyi és a havas tekepálya”, 11 oldal, 8 mini-feladat): 10 bábu áll; Zümi 3-at ledönt (10 − 3 = 7, tízes kereten áthúzással is); Pötyi visszaállít 4-et (6 + 4); a 10 bontásai táblázatban (10 + 0 … 5 + 5, egy sor hiányzik); tízesbarátok (3 és 7); Csigusz visszalép a számegyenesen (10 − 3); 7 + 3 > 9; 10 − □ = 8 (hány bábu dőlt el).
- **Játszótér** (`BowlingPlayground`): „Tekézz!” – a Gurítok gomb 1–9 bábut dönt le a 10-ből, a gyerek a 0–10 gombokkal megmondja, hány áll még; Pötyi kimondja a műveletet és a bontást.
- **Játék** (`Szamolas0Tol10IgG1Jatek`): Kérdések 3 × 8 (`SZAMOLAS_0_TOL_10_IG_G1_QUESTIONS`): összeadás/kivonás képről, keretről, számegyenesen; melyik művelet illik a képhez; bontás □-vel; tízesbarátok; csere (2 + 8); jel művelet és szám között; 10 − 0, 10 − 10; kakukktojás; két ugrás; három tag; 8 < □ < 10; szöveges feladat. Párosító 3 szint (`..._PAIRS`: művelet ↔ eredmény, kép ↔ művelet, azonos eredményű műveletek – „bakancspárok”), Válogató 3 szint (`..._SORT`: pont 10 / kevesebb; + vagy −; eredmény 5-nél kisebb / 5 / nagyobb).

Fájlok: `Szamolas0Tol10IgG1Scenes.tsx` (`pin`, `PinsScene` 0–10 álló/fekvő bábuval, `PinsCard`, `TenSplitsScene`), `Szamolas0Tol10IgG1Parts.tsx`, `Szamolas0Tol10IgG1Mese.tsx`, `Szamolas0Tol10IgG1Jatek.tsx`, `index.ts`. Közös képek: `a-tiz` (`snow`), `a-nyolc` (`CountBox`, `MiniBox`, `EqCard`, `HopLine`, `TwoHands`). Teszt: `src/test/grade1Topic3Szamolas0Tol10IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját keret: a könyv különálló képei (hóember, vaddisznó, bakancsok, mókus) helyett egy mese – 10 bábus tekepálya –, amelyen az álló és eldőlt bábuk egyszerre mutatják a kivonást és a 10 bontását.
- A „tízesbarát” szót mi vezetjük be (a könyv ezen oldalain nincs), a kiegészítés 10-re szemléletes neve.
- A bontástáblázat (TK 123/1, előző lecke) ide került, 10 + 0-tól 5 + 5-ig; a cserés párokat (4 + 6 és 6 + 4) a 2 + 8 „csere” kérdés képviseli.
- A „Mondd el, mikor mit számoltál ki” (TK 125/2) és a műveletírás képről: a gyerek a kép alá illő műveletet választja ki (nem írja).
- A mókus két ugrásából (TK 126/4) egy kétlépéses számegyenes-kérdés lett (10 − 3 − 2); a háromszög-feladatból (TK 127/3) és a háromtagú bontásból (MF 65/1) egy „4 + 3 + 3” kérdés.
- Kimaradt: színezés, rajzolás a felhőkbe, kártyák összekötése (helyette Párosító), hosszú számolóoszlopok.
