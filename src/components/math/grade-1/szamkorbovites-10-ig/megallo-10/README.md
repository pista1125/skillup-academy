# 20. Megálló (1. osztály – III. Számkörbővítés, számolás 10-ig) – témakörzáró

**Források:** OH-MAT01TA_I 130–135. o., OH-MAT01MA_I 68–69. o. (PDF-oldal = nyomtatott + 1). A kérdések a teljes III. témakört lefedik (A hat … Szöveges feladatok, 0–10).

## A könyv oldalai
TK 130: mókusok és eleség – melyik összeadás illik a képhez, összeadás képekről, makkos zsákok (10 − □ = 7, nyitott mondatok). TK 131: útvesztő igaz állításokkal (5 + 4 − 3 = 5, 10 − 5 − 3 = 2 …), páros/páratlan számok jelek szerint (4 < □ < ○ < □), „mindig 3-mal több a toboz” táblázat. TK 132: „8-nál kevesebb makk”, 9 makk két testvérnek (eggyel több), almák színezése sorszám szerint, vaddisznó és szarvas „eggyel több” táblázat. TK 133: 3 szarvas és 4 vaddisznó, ugyanannyi elmegy; 4 makk összege 10; szabályos sorozat (+1, −3); színezés jelek szerint. TK 134: képsor (mi változott?), szabály felismerése, sorrendek (kombinatorika), korongháromszög megfordítása. TK 135: mozgásos társasjáték. MF 68: pontok összekötése 1–10, állatok számlálása, útvesztő. MF 69: kártyapárok 8-ra és 10-re, Rubik-kocka színezése (három tag összege 9), kép-szudoku.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo10G1Mese`, „Pötyi és a téli kincskeresés”, 12 oldal, 10 mini-feladat): állomásról állomásra a kincsesládáig – 7 hópehely, a 9-es (6-tal összetéveszthető), a szám az 5 és a 7 között, a 7 páratlan, hányadik Pötyi a sorban, 5 + 3 madár, 9 − 4 hógolyó, a 9 számháza (4 + ?), □ + 2 = 7, „3-mal kevesebb” levél; a végén 10 drágakő.
- **Játszótér** (`TreasurePlayground`): „Töltsd meg a kincsesládát!” – vegyes feladatok (összeadás, kivonás, □-es kiegészítés, kisebb/nagyobb szomszéd) 10-ig, tízes keretes segítséggel; minden jó válasz egy drágakő, 10 drágakőnél tele a láda.
- **Nagy játék** (`Megallo10G1Jatek`, vizsga): Kérdések 3 × 12 (`MEGALLO10_G1_QUESTIONS`): számlálás, számjegyek, ujjkép, dominó, számegyenes, összeadás, kivonás, <, >, =, páros/páratlan, sorszámnevek, számszomszédok, számház, nyitott mondatok, mennyivel több, kiegészítés 10-re, szöveges feladatok; 3. szint: sorozat szabállyal (+1, −3), igaz/hamis két műveletes állítások, kétlépéses mese, próbálgatás, két feltétel (páros és 6-nál nagyobb), kakukktojás, ki áll a 3. helyen, három tag, hány volt. Párosító (kép ↔ szám 6–10, művelet ↔ eredmény, nyitott mondat ↔ szám), Válogató (páros/páratlan, 6-nál kisebb/nagyobb, pont 10 / nem 10).

Fájlok: `Megallo10G1Scenes.tsx` (`QueueScene` – sor zászlóval, `TreasureScene`), `Megallo10G1Parts.tsx`, `Megallo10G1Mese.tsx`, `Megallo10G1Jatek.tsx`, `index.ts`. Közös képek: `a-tiz`, `a-nyolc`, `szoveges-feladatok`. Teszt: `src/test/grade1Topic3Megallo10G1.test.tsx`.

## Eltérések a tankönyvtől
- Saját keret: a könyv különálló feladatai helyett egy kincskereső mese fogja össze az ismétlést; saját szereplők, tárgyak, számok.
- Az útvesztő igaz állításaiból (TK 131/1) két igaz/hamis kérdés lett; a szabályos sorozatból (TK 133/3) egy „mi jön ezután?” kérdés.
- A „9 makk, Misi eggyel többet evett” feladat (TK 132/2) saját szereplőkkel, próbálgatós kérdésként; a „3 szarvas, 4 vaddisznó” (TK 133/1) cinkékkel és verebekkel.
- A „Mindig 3-mal több” és „eggyel több” táblázatokat (TK 131/3, 132/4) „ennyivel kevesebb” szöveges kérdések képviselik; a páros/páratlan jeles láncot (TK 131/2) a „páros ÉS 6-nál nagyobb” kérdés és a Válogató.
- A kártyapárok 8-ra és 10-re (MF 69/1) a Párosító 3. szintjén nyitott mondatként (□ + 4 = 10) jelennek meg.
- Kimaradt: színezések, rajzolás, kombinatorika (sorrendek), korongháromszög, kép-szudoku, pontösszekötés, mozgásos társasjáték (koppintós felületen nem értelmesek, vagy nem a 0–10 számkör ismétlései).
