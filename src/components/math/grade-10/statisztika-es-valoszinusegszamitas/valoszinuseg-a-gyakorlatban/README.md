# 9. Valószínűség a gyakorlatban (58. lecke)

## Tananyag Áttekintés
Gyakorlati valószínűségszámítási problémák modellezése: visszatevéses és visszatevés nélküli mintavétel, kártyajátékok, lottó, selejtarányok és kockázatelemzés.

---

## Fő Gyakorlati Esetek és Mintavételek

- **Visszatevés nélküli mintavétel (Urnamodell):**
  - Amikor a kiválasztott elemet nem tesszük vissza (pl. lottóhúzás, kártyaosztás, minőségellenőrzés).
  - A valószínűség számítása a binomiális együtthatókkal ($\binom{n}{k}$).
  - Pl. 5-ös lottó telitalálat valószínűsége: $\frac{1}{\binom{90}{5}}$.

- **Visszatevéses mintavétel:**
  - Amikor a húzott elemet visszatesszük a dobozba (az egyes kísérletek kimenetelei függetlenek).
  - Független események együttes bekövetkezése: $P(A \cap B) = P(A) \cdot P(B)$.

- **Gyakorlati kockázatértékelés:**
  - Diagnosztikai tesztek megbízhatósága, biztosítási események és mindennapi döntések valószínűségi háttere.
