# 33. Statisztikai adatgyűjtés (33. lecke)

## Tananyag Áttekintés
A leíró statisztika alapjai: a statisztikai sokaság és a minta fogalma, az ismérvek típusai, az adatgyűjtés módszerei, valamint a gyakorisági eloszlások (abszolút, relatív és kumulált gyakoriság).

---

## Alapfogalmak

- **Statisztikai sokaság (populáció):** A megfigyelni, vizsgálni kívánt egyedek (emberek, termékek, mérési eredmények) összessége.
  - Véges sokaság (pl. egy iskola tanulói).
  - Végtelen sokaság (pl. egy gyártósorról lekerülő izzók lehetséges száma).
- **Statisztikai minta:** A sokaság azon része, amelyet ténylegesen megvizsgálunk.
  - **Reprezentatív minta:** A sokaság szerkezetét és tulajdonságait hűen tükröző minta (pl. rétegzett véletlen mintavétel).
- **Statisztikai ismérv:** A sokaság egyedeit jellemző tulajdonság.
  - *Minőségi (kvalitatív):* nem mérhető számokkal (pl. hajszín, nem, kedvenc tantárgy).
  - *Mennyiségi (kvantitatív):* mérhető, számszerű érték (pl. testsúly, magasság, jegyek, havi jövedelem).
  - *Időbeli:* időpont vagy időtartam (pl. születési év).
  - *Területi:* földrajzi elhelyezkedés (pl. lakóhely szerinti megye).

---

## Gyakorisági Táblázat és Mutatók

Legyen a minta elemszáma $N$. Ha a megfigyelt értékek $x_1, x_2, \dots, x_k$:

1. **Abszolút gyakoriság ($f_i$):**
   Azt fejezi ki, hogy az adott $x_i$ érték hányszor fordul elő a mintában.
   $$\sum_{i=1}^k f_i = f_1 + f_2 + \dots + f_k = N$$

2. **Relatív gyakoriság ($g_i$):**
   Az abszolút gyakoriság és a teljes mintanagyság hányadosa (gyakran százalékban fejezzük ki):
   $$g_i = \frac{f_i}{N}, \quad \sum_{i=1}^k g_i = 1 \quad (100\%)$$

3. **Kumulált gyakoriság ($F_i$):**
   Az adott értékig (azt is beleértve) előforduló gyakoriságok göngyölített összege:
   $$F_i = f_1 + f_2 + \dots + f_i$$
   *(Segít meghatározni a mediánt és a terjedelmeket.)*
