# 1. Válogatások (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 4–7. o., OH-MAT01MA_I 4–7. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- TK 4–5: mi való az iskolatáskába / a játékpolcra / a technikadobozba / az uzsonnásdobozba / a tornazsákba; „melyik nem illik a sorba?”; mit nem használtál az óvodában.
- TK 6: gyümölcsök–zöldségek kétféle válogatása („Hogyan gondolkodott?”), gombok rendezése méret, szín, alak szerint, „keress ugyanolyat”.
- TK 7: csoportok (állatok, járművek, ételek) színes karikával, besorolás; kakukktojás (ruhák + zebra).
- MF 4–7: íróasztal/tál, „színezd ki, ami ugyanolyan, mint az első”, „húzd át, ami különbözik”, nem illik a csoportba, színezés megadott színek szerint, gyümölcsös/zöldséges kosár, állatok lábszám szerint, sorrend megjegyzése.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ValogatasokG1Mese`, 11 oldal, 7 koppintós feladat): Pötyi bemutatkozik, megmutatja a Számkertet és barátait (Zümi, a méh; Csigusz, a csiga). Éjjel nagy szél mindent összekevert: a gyerek gyümölcsöt keres, répát tesz a zöldséges kosárba, piros virágot keres, Csigusz iskolatáskáját pakolja, kakukktojást keres, ugyanolyan gombot keres, a madarat az állatokhoz sorolja.
- **Játszótér** (`SortBasketsPlayground`): Pötyi egyesével adja a tárgyakat, a gyerek a jó kosárra koppint (gyümölcs/zöldség, játék/iskolai holmi, piros/kék/sárga, állat/jármű). Új feladat gomb.
- **Játék** (`ValogatasokG1Jatek`): Kérdések 3 × 8 (`VALOGATASOK_G1_QUESTIONS`), Párosító 3 szint (ugyanolyan pár, ugyanolyan szín, tárgy és helye), Válogató 3 szint (gyümölcs/játék, szín, állat/jármű/étel). Minden válasz kép.

A `ValogatasokG1Scenes.tsx` tárgykészletét (`OBJ`, `Thing`, `ThingRow`, `Basket`, `Button` …) az előkészítő időszak 2–4. leckéje is használja.

Fájlok: `ValogatasokG1Scenes.tsx`, `ValogatasokG1Parts.tsx`, `ValogatasokG1Mese.tsx`, `ValogatasokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1ValogatasokG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját tárgyak és saját történet (szél keveri össze a Számkert holmijait); a könyv képei és szereplői (Mona, Manó) nem szerepelnek.
- Az összekötést, karikázást, színezést és áthúzást koppintás váltja ki („melyik?”, „hová való?”).
- A „Mondd el, hogyan gondolkodott” kérdést képes választással kérjük: szín szerint / fajta szerint / nagyság szerint (a jelentést a felolvasás elmagyarázza).
- A lábszám szerinti válogatás (MF 7) és a „koppants/tapsolj annyit” feladatok kimaradtak: ezek számolást kívánnak, ami később jön (Számlálások lecke).
- A tankönyv TK 6/1 válogatásában a paradicsom és a paprika is zöldség, a szőlő és az alma gyümölcs – ezt a gyümölcs/zöldség felosztást követjük (a paradicsom zöldségként szerepel, ahogy a magyar köznyelv és a könyv is használja).
