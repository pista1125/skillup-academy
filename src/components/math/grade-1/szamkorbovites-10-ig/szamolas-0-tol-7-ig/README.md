# 6. Számolás 0-tól 7-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 88–91. o., OH-MAT01MA_I 46–48. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Korongképekről két összeadás (6 + 1, 1 + 6), péksüteményes képek, tekebábuk és összeadások színezése (5, 6, 7); áthúzásos kivonások (7 − 2 …), képekről két kivonás (festék, bábuk, békák), egyenlő eredményű kivonások (zoknik); korongképről négy művelet (6 + 1, 1 + 6, 7 − 1, 7 − 6), oda-vissza ugrás a számegyenesen, műveletsorok (□ = 3 + 4 …); kártyák a számegyenes pontjaihoz, háromtagú műveletek páros/páratlan színezéssel (kémények), rajzolás jelek szerint. Munkafüzet: korongok, bögrepárok (művelet ↔ pöttyök), műveletek; műveletek összehasonlítása jellel, szabály szerinti sorozat (+2, −3 …), háromtagú műveletek, képről összeadások; „minden kártya hetet ér”, három kártyalap összege 7, kártyák sorrendje.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Szamolas0Tol7IgG1Mese`, 11 oldal, 7 mini-feladat): eperpiknik a Számkertben. 5 + 2 eper, a tagok felcserélése korongképen (5 + 2 = 2 + 5), Csigusz megeszik 3-at (7 − 3), melyik összeadás illik a korongképhez, egy kép – több művelet (7 − 1, 7 − 6), Csigusz előre ugrik a számegyenesen (4 + 3), Zümi visszafelé repül (7 − 2), tekézés (7 bábuból 2 eldől), kiegészítés 7-re korongokkal.
- **Játszótér** (`PicnicPlayground`): véletlen összeadás vagy elvétel 7-ig eperképpel (áthúzással), a gyerek a 0–7 számgombok közül választ; Pötyi a tipikus hibát nevezi meg (kevés / sok, áthúzottak).
- **Játék** (`Szamolas0Tol7IgG1Jatek`): Kérdések 3 × 8, Párosító 3 szint (korongkép ↔ szám, művelet ↔ eredmény, egyenlő eredményű kivonások), Válogató 3 szint (pont 7 / kevesebb; eredmény 5, 6, 7; háromtagú művelet eredménye páros / páratlan).

Fájlok: `Szamolas0Tol7IgG1Parts.tsx`, `Szamolas0Tol7IgG1Mese.tsx`, `Szamolas0Tol7IgG1Jatek.tsx`, `index.ts`; a képeket az `a-het/AHetG1Scenes.tsx`-ből veszi. Teszt: `src/test/grade1Topic3Szamolas0Tol7IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (eperpiknik, tekézés a barátokkal), saját számok; a könyv kéményes és zoknis feladatainak műveleteit lecseréltük.
- Az ismeretlent „?” jelöli; üres négyzet (□) és „□ = 3 + 4” alakú műveletsor nincs, mert a nyitott mondat külön lecke később. A kiegészítést korongképpel kérdezzük („Hány kék kell, hogy 7 legyen?”).
- A páros/páratlan színezést Válogató helyettesíti; a 0 eredményt kihagytuk, hogy a 0 párossága ne okozzon zavart.
- A kártyás feladatok (kártyák összege, kártyák sorrendje) és a szabály szerinti sorozat kimaradtak: túl sok olvasást, írást kívánnak; a „mennyivel több” jelölést nem használjuk.
