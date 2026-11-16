# 9. Csoportosítások, számok 10 000-ig (tankönyv 33–42. oldal, munkafüzet I. 28–33. oldal)

A magyar Oktatási Hivatal tankönyve (`OH-MAT04TA`, Matematika 4., 33–42. oldal) és munkafüzete (`OH-MAT04MA_I`, 28–33. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A fejezet a 10 000-es számkör felépítését mutatja be. Előbb a koboldok drágaköveit csomagoljuk nem tízes csoportokban (zafír hármasával, rubin négyesével, smaragd kettesével) és leltárt készítünk; majd a fabatkák tízes beváltásával (10 egyes = 1 tízes … 10 ezres = 1 tízezres) eljutunk a négyjegyű számokig. Szerepel a számok írása betűvel, a százasával haladó számtábla, a „tökéletes pénztárgép”, a golyós számoló, a helyiérték-táblázat (helyi, alaki, valódi érték) és a számegyenes.

---

## 📐 Fő tartalom

- **Csoportosítás (TK 34., MF 28–29.):** zafír hármasával: zacskó = 3, doboz = 9, zsák = 27; az 1 | 0 | 1 | 2 leltár = 32, a 2 | 1 | 2 | 0 leltár = 69; 25 zafír = 0 | 2 | 2 | 1. Rubin négyesével: doboz = 16, a 2 | 1 | 3 leltár = 39; 27 rubin = 1 | 2 | 3. 15 smaragd kettesével = 1 | 1 | 1 | 1.
- **Becslés, 10 000 nagysága (TK 35.):** babszemek kupacokban, lépések, „miből lehet 10 000?”.
- **Beváltás (TK 36.):** 1 → 10 → 100 → 1000 → 10 000, mindig · 10; ezer, kétezer … tízezer.
- **Helyesírás (TK 36.):** kétezerig egybeírjuk (ezernyolcszázöt); a kerek ezreseket egybeírjuk (ötezer); kétezer fölött, ha folytatódik, kötőjel (kétezer-egy, ötezer-tíz, nyolcezer-hétszáztizennégy); kivétel az évszám.
- **Számtábla (TK 37., MF 30.):** 100-tól 10 000-ig százasával; sorok és oszlopok, nyilas lépkedés.
- **Pénztárgép (TK 39.):** 11 százas + 25 tízes + 36 egyes = 1386 (beváltás után 1 | 3 | 8 | 6).
- **Helyiérték-táblázat (TK 40.):** tízezres (T), ezres (E), százas (sz), tízes (t), egyes (e); 4213 = 4000 + 200 + 10 + 3; 52 sz + 25 t + 18 e = 5468; 4 E + 19 sz + 8 t = 5980; 37 sz + 7 e = 3707.
- **Gondolkodtató feladatok (TK 41–42., MF 30–33.):** „Gondoltam egy számra” (8329), Firtos tündér (8926), számkártyákból alkotott négyjegyű számok (4 kártyából 24), sorba rendezés, számegyenes 1000–3000, 5000–7000, 4000–5000.

> **⚠️ CSAPDA:** Az üres helyi értékre 0 kerül: 7 ezres, 4 tízes, 5 egyes = 7045 (nem 745). A nem tízes csoportosítás leltára (1 | 0 | 1 | 2) nem az 1012-es szám!

**Javítás a korábbi vázlathoz képest:** a régi README az ezrest és az egyest is „E”-vel jelölte, és „10 000-ig” helyett „tízezres (T-E)” jelölést használt. A tankönyv jelölése: T, E, sz, t, e. A négyjegyű számokat a tankönyv szóköz nélkül írja (pl. 4213), csak a 10 000-et tagolja.

---

## 💻 Elkészített Komponensek

1. **`Numbers10000Figures.tsx`**:
   - `GemGroupingSvg`: zafírok hármasával (zsák, doboz, zacskó, zafír) és az 1 | 0 | 1 | 2 leltár.
   - `FabatkaExchangeSvg`: fabatkák beváltása 1 → 10 000-ig, · 10 nyilakkal.
   - `PlaceValueTableSvg`: helyiérték-táblázat 4213-mal (alaki és valódi érték).
   - `AbacusSvg`: golyós számoló (zöld 1000, piros 100, kék 10, sárga 1) a 3130-cal; `AbacusDrawing` segédelem.
   - `NumberLine10000Svg`: számegyenes 0–10 000.
   - `HundredsGridSvg`: a százasával haladó számtábla részlete hiányzó mezőkkel.
2. **`Numbers10000Theory.tsx`**: csoportosítás, beváltás, helyi/alaki/valódi érték, betűvel írás, számegyenes, kidolgozott példák, csapda; `numberToWords` segédfüggvény.
   - **I. Labor:** a tökéletes pénztárgép – érmék hozzáadása, „Válts be!” gomb, leltár.
   - **II. Labor:** számépítő – betűvel megadott szám kirakása helyiérték-oszlopokkal, ellenőrzéssel, bontással és számegyenessel.
3. **`Numbers10000Matcher.tsx`**: 3 szint × 8 pár (szám ↔ betűvel; helyi értékek ↔ szám; bontás/leltár ↔ szám).
4. **`Numbers10000Sorter.tsx`**: 3 szint × 3 kategória (hol áll a 7-es; számegyenes-szakaszok; helyesírási szabály).
5. **`Numbers10000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosító: `g4-count-szamok-10000-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1Numbers10000.test.tsx` (4 komponens, 6 ábra, kérdésszám, betűvel írás).
