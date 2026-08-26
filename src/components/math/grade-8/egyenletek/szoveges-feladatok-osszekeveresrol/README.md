# 3. Szöveges feladatok összekeverésről (8. osztály)

## Tananyag Áttekintés
Keverési és elegyítési feladatok matematikai modellje: oldatok töménysége (tömegszázalék), ötvözetek finomsága (karát, ezrelék), folyadékok hőmérséklet-keveredése és a keverési egyenlet felírása.

---

## 1. A Keverési Egyenlet Alapelve

A keverési feladatok alapja az **oldott anyag (vagy tiszta fém, hőmennyiség) megmaradásának törvénye**:

$$\text{1. komponensben lévő tiszta anyag} + \text{2. komponensben lévő tiszta anyag} = \text{Keverékben lévő tiszta anyag}$$

$$m_1 \cdot \frac{p_1}{100} + m_2 \cdot \frac{p_2}{100} = (m_1 + m_2) \cdot \frac{p_{\text{keverék}}}{100}$$

Egyszerűsítve $100$-zal való beszorzás után:
$$m_1 \cdot p_1 + m_2 \cdot p_2 = (m_1 + m_2) \cdot p_{\text{keverék}}$$

Ahol:
- $m_1, m_2$: az egyes oldatok/anyagok tömege (g vagy kg).
- $p_1, p_2$: az egyes oldatok tömegszázaléka (%).
- $m_{\text{keverék}} = m_1 + m_2$: az össztömeg.
- $p_{\text{keverék}}$: a keletkező elegy tömegszázaléka.

---

## 2. Speciális Esetek

| Hozzáadott anyag | Tömegszázalék ($p$) | Megjegyzés |
|---|---|---|
| **Tiszta víz / oldószer hozzáadása (hígítás)** | $p = 0\%$ | Nem tartalmaz oldott anyagot ($m_{\text{víz}} \cdot 0 = 0$) |
| **Tiszta só / cukor hozzáadása (töményítés)** | $p = 100\%$ | Csak tiszta oldott anyag ($m_{\text{só}} \cdot 100$) |
| **Víz elpárologtatása** | $m_{\text{új}} = m_1 - m_{\text{elpárolgott}}$, $p_{\text{víz}} = 0\%$ | A tömeg csökken, a töménység nő |

---

## 3. Mintapélda

> *Hány kg 15%-os és hány kg 40%-os sóoldatot kell összekevernünk, hogy 50 kg 30%-os oldatot kapjunk?*

- Legyen az 15%-os oldat tömege $x$ kg.
- Ekkor a 40%-os oldat tömege $50 - x$ kg.
- Felírjuk a tiszta só mennyiségét:
  $$x \cdot 15 + (50 - x) \cdot 40 = 50 \cdot 30$$
  $$15x + 2000 - 40x = 1500$$
  $$-25x + 2000 = 1500 \implies 25x = 500 \implies x = 20$$
- **Válasz:** 20 kg 15%-os és $50 - 20 = 30$ kg 40%-os oldat szükséges.
- **Ellenőrzés:** $20 \cdot 0{,}15 + 30 \cdot 0{,}40 = 3 + 12 = 15$ kg só. $50 \cdot 0{,}30 = 15$ kg só. Stimmel!
