# 4. A műveletek sorrendje

## Tananyag Áttekintés
Több műveletet tartalmazó kifejezések kiszámítási szabályai, a műveleti erősorrend (hierarchia) és a zárójelek szerepe.

---

## Műveleti Sorrend Szabályai

### 1. Az Alapszabályok
1. **Zárójelben lévő műveletek:** Mindig a zárójelben lévő kifejezést számoljuk ki legelőször: $( \dots )$.
2. **Szorzás és Osztás:** Megelőzik az összeadást és a kivonást! (Balról jobbra haladva végezzük el őket.)
3. **Összeadás és Kivonás:** Végül az összeadást és a kivonást végezzük el (balról jobbra haladva).

### 2. Mintapéldák

**Példa 1 (Nincs zárójel):**
$$50 + 6 \cdot 8 - 20 = 50 + 48 - 20 = 98 - 20 = 78$$

**Példa 2 (Zárójellel):**
$$(50 + 6) \cdot 8 - 20 = 56 \cdot 8 - 20 = 448 - 20 = 428$$

**Példa 3 (Több művelet zárójelben):**
$$300 - (40 + 60 : 2) = 300 - (40 + 30) = 300 - 70 = 230$$
