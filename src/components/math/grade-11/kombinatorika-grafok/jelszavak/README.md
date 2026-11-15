# 16. Jelszavak (16. lecke, 50–51. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 50–51. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy elfelejtett jelszóból indul: Bendi háromkarakteres jelszava a {B; e; n; 1; 7} karakterekből épül fel. Hány különböző jelszó létezik, ha
- **a)** három különböző karaktert használt: a jelszó elemeinek egy-egy „rekeszt” feleltetünk meg (rögzített sorrendben), az első rekeszbe 5-féle, a másodikba 4-féle, a harmadikba 3-féle karakter kerülhet ⇒ **5 · 4 · 3 = 60**;
- **b)** a karakterek ismétlődhetnek: minden rekeszbe 5-féle karakter kerülhet ⇒ **5 · 5 · 5 = 125**.

---

## 📐 Elmélet

n darab különböző elemből választunk valahányat úgy, hogy **fontos a kiválasztás sorrendje**. A lehetőségek száma
- ha minden elemet legfeljebb egyszer választhatunk: **n · (n − 1) · (n − 2) · …**
- ha az elemek ismétlődhetnek: **n · n · n · …**

**Mit jelent, hogy számít a sorrend?** A kiválasztott elemek különböző „szerepbe” kerülnek: sorrendjük van (jelszó, sorban állás, többjegyű szám, teszt kitöltése); más feladatra kerülnek; különböző dolgokkal párosítjuk őket (nyeremények, táncpartnerek); vagy érdemes alkalmas sorrendben meghozni a döntéseket.

**Megkötések:** ha számot készítünk, az első jegy nem lehet 0; kiköthetik, hogy egy helyre konkrét elem kerüljön; és megtehetjük, hogy nem az első rekeszt töltjük ki először.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Hajni, {H; a; j; n; i; 1; 9}, 4 karakter: a) különböző: 7 · 6 · 5 · 4 = 840; b) ismétlődhet: 7⁴ = 2401.
- **2.** Csilla, {C; a}, 10 karakter: 2¹⁰ = 1024.
- **3.** 6 kérdéses teszt (A–D): a) 4⁶ = 4096; b) üresen is hagyható: 5⁶ = 15 625.
- **4.** 4-féle főétel, 3-féle desszert, 50 < ebédek száma < 80 ⇒ 12x, x = **5 vagy 6** leves.
- **5.** Logó, 3 tartomány, 6 szín: a) mind különböző: 6 · 5 · 4 = 120; b) a két nyíl lehet egyforma: 6 · 5 · 5 = 150 (feltételezve, hogy a nyilak a harmadik tartománytól eltérő színűek).
- **6.** Négyjegyű számok: a) 9000 (E); b) különböző jegyek: 4536 (A); c) 3. jegy a 8-as: 900 (C); d) különböző, 3. jegy a 4-es: 448 (B); e) mind páros, ismétlődhet: **4 · 5 · 5 · 5 = 500 – ennek nincs ábrája**; f) különböző és páros: 96 (D).
- **HF 1.** Hétjegyű, 0-val nem kezdődő telefonszámok: 9 000 000.
- **HF 2.** 26 betű, 6 karakter: a) 165 765 600; b) 26⁶ = 308 915 776.
- **HF 3.** Különböző jegyű négyjegyű számok 7-es nélkül: 8 · 8 · 7 · 6 = 2688.
- **HF 4.** 5 sportszer, 20 tanuló: a) 1 860 480; b) 20⁵ = 3 200 000; c) Konrád pontosan egyet: 5 · 19 · 18 · 17 · 16 = 465 120.

> **⚠️ CSAPDA:** a különböző jegyű négyjegyű számok száma nem 10 · 9 · 8 · 7 = 5040 (ebben benne vannak a 0-val kezdődők), hanem 9 · 9 · 8 · 7 = 4536. A megkötött rekeszt (első jegy, rögzített jegy) mindig érdemes először kitölteni.

---

## 💻 Elkészített Komponensek

1. **`PasswordsFigures.tsx`**:
   - `PasswordSlotsSvg`: Bendi jelszava rekeszekkel, 5 · 4 · 3 = 60.
   - `PasswordSlotsRepeatSvg`: ismétléssel, 5 · 5 · 5 = 125.
   - `PasswordTreeSvg`: fadiagram a {B; e; n} kétkarakteres, ismétlés nélküli jelszavaihoz (3 · 2 = 6).
   - `FourDigitSchemesSvg`: a 6. feladat rekeszes ábrái (A–E) és a hiányzó e) ábra.
   - `LogoColoringSvg`: a 3 tartományos logó és a 6 szín (120 és 150).
2. **`PasswordsTheory.tsx`**: bevezető, fadiagram, „mikor számít a sorrend” táblázat, kidolgozott feladatok (1–6.), házi feladatok eredményei, csapda.
   - **I. Laboratórium:** jelszóerősség-kalkulátor (karakterkészletek, hossz, ismétlés be/ki, lehetőségek száma BigInt-tel, feltörési idő 10⁹ próbálkozás/s mellett).
   - **II. Laboratórium:** négyjegyű számok megkötésekkel (különböző jegyek, páros jegyek, rögzített 3. jegy, kizárt jegy) – rekeszes képlet és gépi leszámlálás összevetése, tankönyvi előbeállítások.
3. **`PasswordsMatcher.tsx`**: 3 szint × 8 pár (melyik szorzat; eredmények; megkötésekkel).
4. **`PasswordsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (ismétlés / nincs ismétlés / nem számít a sorrend; nagyságrend; igaz / hamis / feladatfüggő).
5. **`PasswordsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 10 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-comb-jelszavak-quiz`; matcher: `g11-comb-jelszavak-matcher`, sorter: `g11-comb-jelszavak-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2Passwords.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
