# 4. A három (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 46–49. o., OH-MAT01MA_I 26–27. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Mesekép (erdő, „Miből van három? Háromnál több / kevesebb?”), ujjkép, dominókép, a 3-as számjegy és helye a számegyenesen, 3 levél színezése, répák hármasával csoportosítása, a 3 írása, „egészítsd ki, hogy 3 legyen”, gombák száma és jelek, „a nyíl a több felé mutasson”, rajzolás jelek szerint, virágok színezése két színnel, dominók a számegyenesen, színező 0–3 kóddal. Munkafüzet: nyíl a több felé (dominók), a 3 írása, állatok számlálása és jelek, dominó két oldala jelekkel, hiányzó számok a számegyenesen, 0 < □ < □ < □ sorba rendezés, a nyuszi útja a 3-asok mentén.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AHaromG1Mese`, 12 oldal, 5 mini-feladat): Csigusz, a csiga is csatlakozik Pötyihez és Zümihez – hárman vannak. Három gomba, „Hol van három gomba?”, a 3-as írásiránya, három ujj és három pötty, „Hol van a legtöbb gomba?”, a 3 a számegyenesen, Csigusz három lépése a számegyenesen, a 0–1–2–3 számlépcső, 2 eper < 3 eper.
- **Játszótér** (`SameCountPlayground`): „Legyen ugyanannyi!” – a felső sorban 0–3 tárgy (leggyakrabban 3), az alsó sort a gyerek egészíti ki vagy csökkenti, Pötyi visszajelez (kevesebb / több / ugyanannyi).
- **Játék** (`AHaromG1Jatek`): Kérdések 3 × 8 (`A_HAROM_G1_QUESTIONS`), Párosító 3 szint (`A_HAROM_G1_PAIRS`), Válogató 3 szint (`A_HAROM_G1_SORT`; 3. szint: háromnál kevesebb / pont három / háromnál több).

Fájlok: `AHaromG1Scenes.tsx`, `AHaromG1Parts.tsx`, `AHaromG1Mese.tsx`, `AHaromG1Jatek.tsx`, `index.ts` (a dobozokat, a jeles képeket és a számegyenes-ugrást az `a-ketto/AKettoG1Scenes.tsx`-ből veszi). Teszt: `src/test/grade1Topic2AHaromG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese: a népmesei kép helyett a három barát (Pötyi, Zümi, Csigusz) és a három gomba mutatja a hármat.
- Számkör: válaszként csak 0–3; a könyv 48. oldali dominó–számegyenes feladatában (és a számegyenesen) 4 és 5 is szerepel – nálunk ezek csak feliratként látszanak a számegyenesen, kérdés nem lesz belőlük; a nagyobb mennyiségek csak képen, „sok / több” néven.
- Az „egészítsd ki, hogy 3 legyen” rajzos feladatot a Játszótér („Legyen ugyanannyi!”) és az áthúzásos kérdés helyettesíti; összeadás-, kivonásjel nincs.
- A „0 < □ < □ < □” sorba rendezést számlépcső képpel és „Melyik a legnagyobb szám?” kérdéssel adjuk.
- A színezős (kódolt színezés, két színnel színezés) feladatok kimaradtak: koppintós felületen nem megoldhatók értelmesen.
- A 3-as írását a gyerek a levegőbe „írja” (zöld kezdőpont, két „pocak”).
