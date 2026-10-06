# 4. A gömb (8. osztály)

Ez a modul a hivatalos 8. osztályos matematika tankönyv (**OH-MAT08TA**) **VII. Testek** fejezetének 4. témakörét valósítja meg interaktív tananyaggal, 3 szintű kvízzel, kártyapárosítóval és csoportosító játékkal.

---

## 📦 Modul Komponensei

| Fájl | Funkció | Leírás |
| :--- | :--- | :--- |
| [`SphereTheory.tsx`](./SphereTheory.tsx) | **Interaktív Tananyag** | 9 fejezet, részletes elmélet, Arkhimédész-tételek, Pitagorasz-levezetések, valós idejű gömblabor és kalkulátor, tipikus hibák és gyorsteszt |
| [`SphereQuiz.tsx`](./SphereQuiz.tsx) | **Gyakorló Kvíz** | 30 feladat 3 szinten, SVG ábrák, puska kártyák, lépésről lépésre kidolgozott megoldások, XP és érmék |
| [`SphereMatcher.tsx`](./SphereMatcher.tsx) | **Kártyapárosító Játék** | 3 szinten fogalmak, képletek, numerikus számítások, sűrűség és arányok párosítása |
| [`SphereSorter.tsx`](./SphereSorter.tsx) | **Csoportosító Játék** | Felszín vs. Térfogat vs. Mindkettő, Gömb vs. Félgömb vs. Henger, valamint 1D/2D/3D dimenziók szétválogatása |
| [`index.ts`](./index.ts) | **Központi Export** | A modul komponenseinek exportálása |

---

## 📐 Főbb Képletek és Összefüggések

> [!IMPORTANT]
> ### 1. Gömb Felszíne ($A$):
> $$A = 4\pi r^2 = d^2\pi$$
> *A gömb felszíne pontosan négyszerese a főkörének területének ($A = 4 \cdot T_f$).*

> [!IMPORTANT]
> ### 2. Gömb Térfogata ($V$):
> $$V = \frac{4}{3}\pi r^3 = \frac{\pi d^3}{6}$$
> *Arkhimédész tétele: a gömb térfogata $\frac{2}{3}$-a a köré írt henger térfogatának ($V_{\text{gömb}} = \frac{2}{3} V_{\text{henger}}$).*

> [!TIP]
> ### 3. Tömör Félgömb Tulajdonságai:
> - **Térfogat:** $V_{\text{fél}} = \frac{2}{3}\pi r^3$
> - **Teljes felszín:** $A_{\text{fél}} = 2\pi r^2 \text{ (palást)} + \pi r^2 \text{ (alapkörlap)} = 3\pi r^2$

> [!NOTE]
> ### 4. Síkmetszetek:
> - Ha a sík átmegy a középponton ($x = 0$): **Főkör** ($R = r, T_f = r^2\pi, K = 2\pi r$)
> - Ha $0 < x < r$: **Kiskör**, sugara Pitagorasz-tétellel: $\rho = \sqrt{r^2 - x^2}$
> - Ha $x = r$: **Érintősík** (1 érintési pont)
