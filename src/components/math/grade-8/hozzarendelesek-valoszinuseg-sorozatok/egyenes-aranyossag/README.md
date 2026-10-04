# 1. Egyenes arányosság (8. osztály)

Ebben a mappában található a 8. osztályos matematika **V. Hozzárendelések, valószínűségek, sorozatok** témakörének 1. altémája: **Egyenes arányosság**.

---

## Modulok és Fájlok

| Modul | Fájl | Leírás |
|---|---|---|
| **Tananyag** | [`DirectProportionTheory.tsx`](./DirectProportionTheory.tsx) | Interaktív elméleti modul: az egyenes arányosság definíciója, állandó hányados ($k = y/x$), valós idejű koordináta-rendszeres labor ($y = kx$), lépésháromszög, hétköznapi példák, csapdák és kidolgozott mintapéldák. |
| **Gyakorló Kvíz** | [`DirectProportionQuiz.tsx`](./DirectProportionQuiz.tsx) | 30 feladat 3 differenciált nehézségi szinten, 4 részletes puskakártyával (SVG illusztrációkkal), pontszám- és csíkmentéssel, beépített játékmód-váltással. |
| **Párosító Játék** | [`DirectProportionMatcher.tsx`](./DirectProportionMatcher.tsx) | 24 kártyapár 3 szinten: alapfogalmak, értékpárokból arányossági tényező, valamint valós életbeli képletek és összefüggések párosítása. |
| **Csoportosító Játék** | [`DirectProportionSorter.tsx`](./DirectProportionSorter.tsx) | 36 elem 3 szinten: függvények besorolása (k > 0 / k < 0 / nem az), síknegyedek és pontok, valamint hétköznapi arányosságok kategorizálása. |
| **Exportok** | [`index.ts`](./index.ts) | A komponensek központi exportja. |

---

## Tananyag Összefoglaló

### 1. Definíció és Képlet
Két mennyiség, $x$ és $y$ **egyenesen arányos**, ha:
- Ahányszorosára változik az egyik mennyiség, **ugyanannyiszorosára** változik a másik is.
- Az összetartozó értékek **hányadosa állandó**:
  $$\frac{y}{x} = k \quad (k \neq 0, \text{arányossági tényező})$$
- Algebrai alak (hozzárendelési szabály):
  $$y = k \cdot x$$

### 2. A Grafikon Tulajdonságai
- A koordináta-rendszerben a grafikon mindig egy **egyenes**, amely **átmegy az origón $(0; 0)$**.
- **$k > 0$ esetén:** az egyenes az I. és III. síknegyeden halad át, balról jobbra emelkedik (szigorúan monoton növekvő).
- **$k < 0$ esetén:** az egyenes a II. és IV. síknegyeden halad át, balról jobbra lejt (szigorúan monoton csökkenő).
- A $k$ érték a grafikon **meredekségét** adja meg: ha az $x$ tengelyen $+1$ egységet lépünk jobbra, függőlegesen $k$ egységet kell lépnünk.
- $k = 1$: az I. és III. síknegyed belső szögfelezője ($y = x$).
- $k = -1$: a II. és IV. síknegyed belső szögfelezője ($y = -x$).

### 3. Gyakori Buktatók
1. **Mindkettő nő $\neq$ Egyenes arányosság:** Pl. életkor és testmagasság: mindkettő nő, de a hányados nem állandó.
2. **Négyzet oldala és területe:** $T = a^2$ négyzetes arányosság (kétszeres oldal $\to$ négyszeres terület), nem egyenes arányosság!
3. **Alapdíjas szolgáltatások:** Pl. taxi ($y = 1000 + 400x$): lineáris függvény, de NEM megy át az origón, ezért nem egyenes arányosság!
