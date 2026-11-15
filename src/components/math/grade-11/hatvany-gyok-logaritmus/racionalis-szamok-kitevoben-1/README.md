# 3. Racionális számok a kitevőben I. (tankönyv 28. lecke, 88–89. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 88–89. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 3. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** 2011. június végén a Föld népessége kb. 6,98 milliárd fő volt, és évente kb. 1,1%-kal nőtt: N(t) = 6,98 · 1,011ᵗ (milliárd fő). Június végétől október végéig csak 4 hónap, azaz 1/3 év telik el – mit jelent az 1,011^(1/3)?

**Kidolgozott feladat:** a modell szerint egyenlő időtartamok alatt ugyanannyiszorosára változik a népesség. Ha 1/3 év alatt x-szeres a növekedés, akkor egy év (3 · 1/3 év) alatt x³-szeres, tehát

$$x^3 = 1{,}011 \quad\Rightarrow\quad x = \sqrt[3]{1{,}011} \approx 1{,}0037.$$

2011. október végén tehát kb. 6,98 · 1,0037 ≈ **7,006 milliárd** ember élt a Földön. Így értelmet adhatunk az 1,011^(1/3) kifejezésnek: 1,011^(1/3) = ∛1,011, és (1,011^(1/3))³ = 1,011.

---

## 📐 Definíció

> Ha **a nemnegatív valós szám** és **n 1-nél nagyobb természetes szám**, akkor
> $$a^{\frac{1}{n}} = \sqrt[n]{a}.$$

Például: 32^(1/5) = ⁵√32 = 2; 6,25^(1/2) = √6,25 = 2,5; 0,0016^(1/4) = ⁴√0,0016 = 0,2; 0^(1/10) = ¹⁰√0 = 0.

- A definíció a (aᵐ)ᵏ = aᵐᵏ azonosság megőrzését követi: (a^(1/n))ⁿ = a.
- Negatív alapra a törtkitevőjű hatványt **nem** értelmezzük (bár pl. ∛(−8) = −2 létezik).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 16^(1/2) = 4; 8^(1/3) = 2; 1000^(1/3) = 10; 81^(1/2) = 9; 81^(1/4) = 3.
- **2.** 4^(1/2) = 2; 0,04^(1/2) = 0,2; 1024^(1/10) = 2; 0,125^(1/3) = 0,5; gyökös alakban √0,01 = 0,1; ∛0,008 = 0,2; √0,81 = 0,9; ⁴√0,0001 = 0,1; √1,21 = 1,1.
- **3.** Tavirózsák: kezdetben 8 m², hetente 1,3-szoros ⇒ F(h) = 8 · 1,3ʰ (B). Naponta k-szoros: 8k⁷ = 8 · 1,3 ⇒ k = ⁷√1,3 ≈ 1,0382; napi területek: 8; 8,31; 8,62; 8,95; 9,29; 9,65; 10,02; 10,4 m².
- **4.** Félhangok: q¹² = 2 ⇒ q = ¹²√2 ≈ 1,0595; kvint (7 félhang): q⁷ ≈ 1,498.
- **5.** (7⁴)^(1/2) = 49; (11⁶)^(1/3) = 121; (17²)^(1/2) = 17; (2³³)^(1/3) = 2048; (2¹²)^(1/4) = 8.
- **HF 1.** 64^(1/3) = 4; 0,027^(1/3) = 0,3; (1/4)^(1/2) = 1/2; (√10)⁴ = 100; 1024^(1/5) = 4.
- **HF 2.** Évi 0,2%-os csökkenés ⇒ 9982 · 0,998ˣ ezer fő; 2013. január 1-jén (1,25 év után) ≈ **9957 ezer** fő.
- **HF 3.** 784 / 261,6 ≈ 3, és 2^(19/12) ≈ 2,997 ⇒ a 3. felharmonikus **19 félhangnyira** van az alaphangtól.

> **⚠️ CSAPDA:** Az 1/n kitevő nem osztás: 16^(1/2) = √16 = 4, és nem 16 : 2 = 8. Ellenőrzés: az eredmény n-edik hatványa vissza kell adja az alapot.

---

## 💻 Elkészített Komponensek

1. **`RationalExponents1Figures.tsx`**:
   - `PopulationThirdsSvg`: a népesség 1/3 évenként x-szeres, x³ = 1,011.
   - `RootPowerBridgeSvg`: a^(1/n) = ⁿ√a a tankönyvi példákkal.
   - `WaterLilyGrowthSvg`: a tavirózsák napi területe (k = ⁷√1,3).
   - `SemitoneOctaveSvg`: zongora-oktáv, félhang ¹²√2, kvint ≈ 1,498.
   - `RootCycleSvg`: köbgyökvonás és köbre emelés egymás fordítottjai.
2. **`RationalExponents1Theory.tsx`**: kidolgozott feladat, definíció és indoklás, tankönyvi feladatok, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** a^(1/n) = ⁿ√a számoló (alap beírása, n csúszka, ellenőrzés visszahatványozással, pontos/közelítő érték).
   - **II. Laboratórium:** növekedés felosztása egyenlő lépésekre (tavirózsa / népesség / félhang előbeállítások, lépésszorzó, oszlopdiagram, összevetés a hibás „egyenletes felosztással”).
3. **`RationalExponents1Matcher.tsx`**: 3 szint × 8 pár (hatvány ↔ gyök; értékek; modellek).
4. **`RationalExponents1Sorter.tsx`**: 3 szint × 3 kategória (egész / tizedes tört / irracionális; = 2, = 3, = 10; értelmezett-e).
5. **`RationalExponents1Quiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, idővonal-, zongora- és oszlopdiagram-ábrákkal, 3 puskakártyával (progress id: `g11-exp-tortkitevo-elso-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3RationalExponents1.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
