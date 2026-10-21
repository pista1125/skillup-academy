# 11. Témazáró feladatgyűjtemény

## Tananyag Áttekintés
Összetett, emelt és középszintű érettségi típusú feladatok gyűjteménye a Kombinatorika és gráfelmélet témakörből: logikai sziták, skatulya-elv, binomiális kifejtések, extremális gráftulajdonságok és vegyes alkalmazások.

---

## Fő Feladattípusok és Módszertan

- **Összetett kombinatorikai feladatok:**
  - Komplementer számolás: "legalább egy", "legfeljebb kettő" feltételek hatékony kezelése (összes esetből kivonva a tiltott eseteket).
  - Skatulya-elv (Dirichlet-elv): ha $n+1$ elemet osztunk szét $n$ dobozba, legalább egy dobozban legalább 2 elem lesz.
  - Logikai szita formula (két és három halmaz uniójának elemszáma).

- **Binomiális tétel alkalmazásai:**
  - $(a + b)^n$ tetszőleges tagjának meghatározása: $T_{k+1} = \binom{n}{k} a^{n-k} b^k$.
  - Konstans (független) tag keresése racionális kitevőjű kifejezésekben.
  - Együtthatók összege: változók helyére $1$-et helyettesítve.

- **Gráfelméleti bizonyítások és modellezés:**
  - Annak bizonyítása, hogy mindig létezik két azonos fokszámú csúcs bármely legalább 2 csúcsú egyszerű gráfban (skatulya-elv a lehetséges fokszámokra).
  - Euler-út és Euler-kör keresési algoritmusok (Fleury-algoritmus alapgondolata).
  - Fák és minimális feszítőfák koncepciója hálózattervezésben.
