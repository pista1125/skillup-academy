# 39. Esemény valószínűsége (39. lecke)

## Tananyag Áttekintés
A valószínűség klasszikus definíciója, a valószínűség axiómái és alaptételei (összeadási tétel, szorzási tétel, ellentett esemény valószínűsége, függetlenség és feltételes valószínűség).

---

## 1. A Klasszikus Valószínűségi Modell

Ha egy véletlen kísérletnek $n$ darab véges, egymást páronként kizáró és **egyenlően valószínű** kimenetele van (elemi események), és ezek közül $k$ darab kimenetel kedvező az $A$ eseményre nézve:
$$P(A) = \frac{\text{kedvező kimenetelek száma}}{\text{összes lehetséges kimenetel száma}} = \frac{k}{n} = \frac{|A|}{|\Omega|}$$

---

## 2. A Valószínűség Alaptulajdonságai

1. Bármely $A$ esemény valószínűsége $0$ és $1$ közötti szám:
   $$0 \le P(A) \le 1$$
2. Biztos esemény: $P(\Omega) = 1$.
3. Lehetetlen esemény: $P(\emptyset) = 0$.
4. **Ellentett esemény valószínűsége:**
   $$P(\bar{A}) = 1 - P(A)$$
   *(Kulcsstratégia érettségin a "legalább egy" típusú feladatoknál!)*

---

## 3. Összeadási és Szorzási Szabályok

### Összeadási Szabály:
- **Egymást kizáró eseményekre ($A \cap B = \emptyset$):**
  $$P(A \cup B) = P(A) + P(B)$$
- **Tetszőleges eseményekre:**
  $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

### Szorzási Szabály és Függetlenség:
- Két esemény **független**, ha az egyik bekövetkezése nem befolyásolja a másik bekövetkezésének valószínűségét:
  $$P(A \cap B) = P(A) \cdot P(B)$$

### Feltételes Valószínűség ($P(A | B)$):
Annak a valószínűsége, hogy $A$ bekövetkezik, feltéve, hogy $B$ már bekövetkezett ($P(B) > 0$):
$$P(A | B) = \frac{P(A \cap B)}{P(B)} \implies P(A \cap B) = P(B) \cdot P(A | B)$$
