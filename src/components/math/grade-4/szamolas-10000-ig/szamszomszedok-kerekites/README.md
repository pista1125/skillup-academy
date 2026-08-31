# 10. Számszomszédok, kerekítés 10 000-ig

## Tananyag Áttekintés
Számszomszédok meghatározása (egyes, tízes, százas, ezres szomszédok) és a kerekítés pontos szabályai a négyjegyű számok körében.

---

## Számszomszédok és Kerekítés

### 1. Számszomszédok Vizsgálata (Példa: $4763$)
- **Egyes szomszédok:** $4762 < \mathbf{4763} < 4764$
- **Tízes szomszédok:** $4760 < \mathbf{4763} < 4770$
- **Százas szomszédok:** $4700 < \mathbf{4763} < 4800$
- **Ezres szomszédok:** $4000 < \mathbf{4763} < 5000$

### 2. A Kerekítés Szabályai
Mindig a kerekítendő helyiértéktől **eggyel jobbra álló** számjegyet nézzük:
- Ha ez a számjegy **$0, 1, 2, 3, 4$**: **Lefelé kerekítünk** (a helyiérték nem változik, utána nullák).
- Ha ez a számjegy **$5, 6, 7, 8, 9$**: **Felfelé kerekítünk** (a helyiértéket 1-gyel növeljük, utána nullák).

### 3. Kerekítési Példák ($5847$)
- **Kerekítés tízesekre:** $584\mathbf{7} \approx 5850$ (mert az egyesek helyén 7 áll $\rightarrow$ fel)
- **Kerekítés százasokra:** $58\mathbf{4}7 \approx 5800$ (mert a tízesek helyén 4 áll $\rightarrow$ le)
- **Kerekítés ezresekre:** $5\mathbf{8}47 \approx 6000$ (mert a százasok helyén 8 áll $\rightarrow$ fel)
