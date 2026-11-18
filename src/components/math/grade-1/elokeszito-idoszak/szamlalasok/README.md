# 7. Számlálások (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 30–33. o. (PDF 31–34). Munkafüzeti oldal nincs. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- 30. o.: koppantás öklök, tapsolás tenyerek és vegyes mozdulatsor szerint; gyümölcsök kiszínezése egy vegyes sorból (taps annyi, ahány gyümölcs; dobbantás annyi, ahány nem gyümölcs); a polcon lévő gyümölcsökből ugyanannyi kiszínezése.
- 31. o.: melyik állat hányszor szerepel a táblázatban (pöttyrajzolás), egymásra rajzolt zoknik és gyümölcsök megszámlálása, postásjáték.
- 32. o.: dominó pöttyei szerint színezés (4, 5, 7, 6 pötty), rajzok átmásolása rácsba, taps annyi, ahány rajz, dobbantás „a két ábrában összesen”.
- 33. o.: két egyforma rajz keresése (gombák), labdák színezése és pöttyözése a sor eleji pöttyszám szerint.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`SzamlalasokG1Mese`): Pötyi mindent megszámol a Számkertben: tapsol, almát szed és pöttykártyát választ, csak a gyümölcsöket számolja, a táblázatban megkeresi a legtöbbször szereplő állatot, postásjátékot ajánl, megszámolja a labdakupacot, pöttyös labdát és pöttyös gombapárt keres. 10 oldal, 6 koppintós feladat.
- **Játszótér** (`CountPlayground`): a gyerek egyenként rákoppint a tárgyakra (a gép hangosan számol: egy, kettő, …), majd kiválasztja a pöttykártyát, amelyen ugyanannyi pötty van. Új feladat gomb.
- **Játék** (`SzamlalasokG1Jatek`): 3 × 8 kérdés (tárgyak, tapsok, koppantások párosítása pöttykártyával 1–5-ig; mit számolunk, táblázat, kupac, dominó; vegyes mozdulatsor, összesen két rácsban, zoknikupac, Pötyi pöttyei, ujjak, kétoldalas dominó 7-ig), Párosító (tárgyak–pöttykártya, ujjak–tárgyak, dominó–tárgyak), Válogató (gyümölcs / nem gyümölcs; kettő / három; három / négy / öt).
- Számjegy sehol nincs: a válaszok pöttykártyák, dominók, képek; a számokat csak a gép mondja ki.

Fájlok: `SzamlalasokG1Scenes.tsx`, `SzamlalasokG1Parts.tsx`, `SzamlalasokG1Mese.tsx`, `SzamlalasokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1SzamlalasokG1.test.tsx`.

## Eltérések a tankönyvtől
- A színezős és rajzolós feladatok („színezz annyit, ahány pötty”, „rajzolj annyi pöttyöt”) koppintós változatban vannak: a gyerek a megfelelő pöttykártyát, dominót vagy képet választja.
- A tapsolást, koppantást, dobbantást a mese és a kérdések kérik („Tapsolj ennyiszer!”), de a válasz mindig egy koppintás a pöttykártyára.
- A könyv egymásra rajzolt, vonalas zokni- és gyümölcskupaca helyett színes, egymást takaró labdák és zoknik vannak, hogy képernyőn is jól megkülönböztethetők legyenek.
- A számlálás felső határa a könyvhöz igazodik (a dominós feladatban 7); a legtöbb kérdés 1–6 közötti mennyiséggel dolgozik.
- Saját történet, tárgyak és mennyiségek.
