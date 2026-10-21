# 4. Igaz vagy hamis? Foglaljuk táblázatba!

## Tananyag Áttekintés
Összetett logikai állítások vizsgálatakor felmerül az igény az összes lehetséges igazságérték szisztematikus rendszerezésére. Erre szolgálnak az igazságtáblázatok, amelyek segítségével logikai azonosságokat is bebizonyíthatunk.

---

## Fő Témakörök és Fogalmak

- **Igazságtáblázat szerkezete:**
  - $n$ darab független logikai változó esetén a táblázat $2^n$ sort tartalmaz (2 változónál 4 sor, 3 változónál 8 sor).
  - A bemeneti oszlopok szisztematikus feltöltése (pl. II, IH, HI, HH vagy 11, 10, 01, 00).

- **Alapműveletek táblázata:**
  | $A$ | $B$ | $\neg A$ | $A \wedge B$ | $A \vee B$ |
  |:---:|:---:|:--------:|:------------:|:----------:|
  |  I  |  I  |    H     |      I       |     I      |
  |  I  |  H  |    H     |      H       |     I      |
  |  H  |  I  |    I     |      H       |     I      |
  |  H  |  H  |    I     |      H       |     H      |

- **Összetett kifejezések táblázatos elemzése:**
  - Zárójelezés és műveleti sorrend betartása (1. negáció, 2. konjunkció, 3. diszjunkció).
  - Részeredmények oszlopról oszlopra történő kiszámítása.

- **Logikai ekvivalencia és a De Morgan-azonosságok:**
  - Két logikai kifejezés ekvivalens, ha igazságtáblázatuk utolsó oszlopának értékei sorról sorra megegyeznek.
  - $\neg(A \wedge B) = \neg A \vee \neg B$ (Nem igaz, hogy mindkettő $\Leftrightarrow$ Legalább az egyik nem igaz)
  - $\neg(A \vee B) = \neg A \wedge \neg B$ (Nem igaz, hogy legalább az egyik $\Leftrightarrow$ Egyik sem igaz)
