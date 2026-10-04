# 7. Játék: Stratégia és Szerencse (8. osztály)

Ez a modul a hivatalos 8. osztályos matematika tanterv (**OH-MAT08TA**) **VI. Hozzárendelések, valószínűségek, sorozatok** fejezetének **7. Játék** altémáját dolgozza fel.

---

## 🧩 Modulok

| Modul | Fájl | Leírás |
| :--- | :--- | :--- |
| **Tananyag** | [`ProbabilityGameTheory.tsx`](./ProbabilityGameTheory.tsx) | Interaktív Nim-játék (ember vs. gép szimuláció), két dobókocka 36 kimenetelének mátrixa, játéktípusok, nyerő stratégiák, Fair Play és Monty Hall paradoxon |
| **Kvíz** | [`ProbabilityGameQuiz.tsx`](./ProbabilityGameQuiz.tsx) | 30 feladat 3 szinten, 4 beágyazott képletkártya, integrált Matcher és Sorter |
| **Párosító** | [`ProbabilityGameMatcher.tsx`](./ProbabilityGameMatcher.tsx) | 24 fogalompár 3 szinten (Alapfogalmak, Kockák és Nim, Játékelméleti paradoxonok) |
| **Csoportosító** | [`ProbabilityGameSorter.tsx`](./ProbabilityGameSorter.tsx) | 36 kártya 3 szinten (Játéktípusok, 36 kimenetel gyakorisága, Állítások megítélése) |

---

## 📚 Főbb Fogalmak és Törvényszerűségek

1. **Játékok típusai:**
   - **Tiszta stratégiai játék:** Nincs véletlen, teljes információ (sakk, amőba, Nim). Létezik garantált nyerő vagy döntetlen stratégia.
   - **Tiszta szerencsejáték:** Kizárólag a véletlen dönt (rulett, lottó, tombola).
   - **Vegyes játék:** Véletlen kezdés/lapjárás + játékosi döntések és taktika (póker, Monopoly).

2. **Nim-játék (21 gyufa, utolsó veszít):**
   - Lépéspár összege: $1 + 3 = 4$.
   - Az ellenfél lépését mindig kiegészítjük 4-re.
   - Vesztő állások: $4k + 1$ ($1, 5, 9, 13, 17, 21$ gyufa).

3. **Két dobókocka összege (36 eset):**
   - Összes kimenetel: $6 \cdot 6 = 36$ rendezett pár.
   - Leggyakoribb összeg: a **7** (6 eset a 36-ból: $6/36 = 1/6 \approx 16,7\%$).
   - Legritkább összegek: a **2** és a **12** (1-1 eset a 36-ból: $1/36$).
   - Páros összeg: pontosan 18 eset ($18/36 = 50\%$).

4. **Független kísérletek és tévhitek:**
   - A szerencsejátékosok tévedése (*Gambler's fallacy*): a kockának és az érmének nincs memóriája.
   - Monty Hall paradoxon: 3 zárt ajtó esetén ajtóváltással a nyerési esély $1/3$-ról $2/3$-ra nő.
