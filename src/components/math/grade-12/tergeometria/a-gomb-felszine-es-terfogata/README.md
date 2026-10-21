# 7. A gömb felszíne és térfogata (7. lecke)

## Tananyag Áttekintés
Az $R$ sugarú gömb felszín- és térfogatképleteinek bemutatása, Arkhimédész híres tétele és levezetése a Cavalieri-elvvel, valamint a gömbszelet és gömbsüveg képletei.

---

## Fő Képletek

### 1. A gömb felszíne ($A$)
Az $R$ sugarú gömb felszíne megegyezik a főkör területének négyszeresével:
$$A = 4R^2\pi$$

### 2. A gömb térfogata ($V$)
Az $R$ sugarú gömb térfogata:
$$V = \frac{4}{3}R^3\pi$$

---

## Arkhimédész Tétele és a Cavalieri-elv
Tekintsünk egy $R$ sugarú félgömböt, valamint egy olyan $R$ sugarú és $R$ magasságú hengert, amelyből kivágtunk egy csúcsával lefelé álló, $R$ alapsugarú és $R$ magasságú kúpot.
- Bármilyen $m$ magasságban készítünk a síkkal párhuzamos metszetet:
  - Félgömb metszetének területe: $T_1 = \pi(R^2 - m^2)$
  - A kilyukasztott henger körgyűrűjének területe: $T_2 = \pi R^2 - \pi m^2 = \pi(R^2 - m^2)$
- Mivel $T_1 = T_2$ minden magasságban, a Cavalieri-elv szerint a térfogatuk egyenlő:
  $$V_{\text{félgömb}} = V_{\text{henger}} - V_{\text{kúp}} = R^2\pi \cdot R - \frac{1}{3}R^2\pi \cdot R = \frac{2}{3}R^3\pi$$
- A teljes gömb térfogata ennek kétszerese:
  $$V = 2 \cdot \frac{2}{3}R^3\pi = \frac{4}{3}R^3\pi$$

---

## Gömbsüveg és Gömbszelet (Kiegészítő)
$m$ magasságú gömbi rész esetén:
- **Gömbsüveg felszíne (palástja):** $A_{\text{süveg}} = 2R\pi m$
- **Gömbszelet térfogata:** $V_{\text{szelet}} = \pi m^2 \left(R - \frac{m}{3}\right)$
