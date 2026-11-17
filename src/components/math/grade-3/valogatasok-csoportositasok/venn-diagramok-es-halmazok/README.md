# 2. Venn-diagramok és halmazok (3. osztály, VI. Válogatások, csoportosítások)

**Források:** tankönyv OH-MAT03TA 70–71. oldal (8. és 13. feladat), valamint a halmazábrás részek: 68/1 (karikák a tornateremben), 69/6b, 73/19c; munkafüzet OH-MAT03MA I/77–80. oldal (1., 4–8., 10–12. feladat).

## Mit tartalmaznak a könyv oldalai?

- **TK 68/1.:** gyerekek egymásba érő karikákban; „Miért állt egy gyerek a piros és a kék karika közös részébe?”
- **TK 69/6b.:** logikai lapok két, egymásba érő sávban („lyukas logikai lapok”, „piros logikai lapok”).
- **TK 70/8.:** „Logikai lapok” keret, benne „Nagyok” és „Pirosak és kicsik” rész; mi kerül a kereten belül, de a részeken kívülre?
- **TK 71/13.:** „Háziállatok” és „Négylábú állatok” halmaza; mondatok kiegészítése az ábráról.
- **TK 73/19c.:** az a) és b) feladat számait egymásba érő halmazábrába kell rendezni.
- **MF I/77/1.:** „Táplálék” keret, „Zöldségek” és „Gyümölcsök” karika (nem érnek össze). **I/78/4.:** a föld alatti / föld feletti részét fogyasztjuk (egymásba érnek). **I/78/5.:** „Háromjegyű számok” keret, „Van bennük 5-ös számjegy” és „Páratlan számok”. **I/78/6.:** „Síkidomok” keret, „Téglalap” karikában egy belső karika üres címkével. **I/79/7–8.:** „150 < □ < 175” keret, „Páros számok” és „5-ös szám áll az egyes helyi értéken” karika; saját címkék kitalálása. **I/80/10–12.:** „Erdőben él” keret, benne „Emlősök”; műveletek eredmény szerinti halmazai; kakukktojás a halmazokban.

## Mit csinál a DiákZóna lecke?

A könyv szavaival dolgozunk: **halmazábra**, **halmaz**, **karika**, **címke**, **keret**, **közös rész** (a „Venn-diagram” nevet csak egyszer, a bevezetőben említjük). Sorrend: egy karika (belül – kívül, de a kereten belül) → két, egymásba érő karika négy részével → számok elhelyezése és leolvasása → két karika, amelynek nincs közös része → karika a karikában. Nincs halmazjelölés (∈, ∩, { }). Saját példák: logikai lapok, számok 500-ig, focizó és úszó gyerekek.

## Komponensek

1. **`VennG3Parts.tsx`** – a halmazábra rajza (`Venn`: keret saját címkével, két karika címkével, színezhető részek; `overlap` / `apart` / `nested` mód), elhelyezési pontok (`SLOTS`, `place`), kattintás → rész (`regionAt`), `VNum`, `Pill`. A logikai lapokat az 1. lecke `SortingByPropertyG3Parts.tsx` fájljából veszi át, így a két lecke lapjai egyformák.
2. **`VennG3Figures.tsx`** – `OneLoopSvg`, `TwoLoopsBlocksSvg`, `RegionNamesSvg`, `NumbersVennSvg`, `ApartLoopsSvg`, `NestedLoopsSvg`.
3. **`VennG3CardFigures.tsx`** – `MiniVenn` (színezett rész, csillag vagy darabszámok a részekben), `VBlockCard`, `NumHintCard` (szám színes utolsó számjeggyel).
4. **`VennG3Theory.tsx`** – Mit tanulunk?, egy karika, két karika és a közös rész, számok a halmazábrában, ha nincs közös rész, karika a karikában, 3 mintapélda, „Vigyázz!” (a közös rész mindkét karikához tartozik; a kívül maradók is a kereten belül vannak).
   - **Labor I – Tedd a helyére!** Véletlen szám (≤ 500) vagy logikai lap, véletlen címkepár (páros, páratlan, háromjegyű, kétjegyű, kerek tízes, „200-nál nagyobb”, „100-nál kisebb”…, illetve szín, forma, méret, lyukas). A gyerek a halmazábra egyik részére koppint (vagy gombot választ). Hibánál megmondja, melyik címke nem stimmel („A 245 nem páros: az utolsó számjegye 5.”). Pontszámláló, „Új feladat”.
   - **Labor II – Olvasd le!** Véletlenül kitöltött halmazábra, véletlen kérdés (közös rész / az egyik karikában / csak a másikban / egyikben sem / összesen a két karikában), 0–9 gombok. Célzott tipp a tipikus hibákra: kimaradt a közös rész; a közös részt kétszer számolta; a kívül lévőket is beszámolta.
5. **`VennG3Quiz.tsx`** – `VENN_G3_QUESTIONS`: 30 kérdés (10/10/10), 29 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-grp-venn-quiz`.
6. **`VennG3Matcher.tsx`** – `VENN_G3_MATCHER_LEVELS`: színezett rész ↔ oda illő lap / szám; szám vagy lap ↔ csillaggal jelölt rész; darabszámos halmazábra + kérdés ↔ válasz. Minden kártyapárban van kép. `g3-grp-venn-matcher`.
7. **`VennG3Sorter.tsx`** – `VENN_G3_SORTER_LEVELS`: „kicsi” – „lyukas” (csak az egyikben / közös rész / csak a másikban); „nagy” – „lyukas” (közös rész / csak az egyikben / egyikben sem); „páros” – „300-nál nagyobb” számok (a 300 is köztük). Kategóriánként 4–5 képes elem. `g3-grp-venn-sorter`.

**Teszt:** `src/test/grade3Topic6VennG3.test.tsx` (a 30 kérdés ellenőrzése mellett azt is nézi, hogy minden elhelyezési pont a saját részébe esik).

## Eltérések a tankönyvtől

- **Elnevezés:** a könyv sehol sem írja, hogy „Venn-diagram”; mindenhol „halmazábra”, „halmaz”, „karika”, „címke”, „közös rész”. A lecke címe (a DiákZóna leckelistája szerint) megmarad, de a szövegben a könyv szavait használjuk.
- **Közös rész nélküli tulajdonságok egymásba érő rajzon (TK 73/19c):** a „150-nél kisebb” (a 19a üres címkéje) és a „150 < □ < 200” halmazt a könyv egymásba érő ábrába kéri, pedig nincs közös elemük; a közös rész szükségképpen üres, ezt a könyv nem mondja ki. A 150 pedig egyik részbe sem kerül, és ezen az ábrán nincs keret, ahová tehetné. Nálunk: ha két tulajdonságnak nincs közös eleme, a karikák nem érnek össze (5. rész, „páros” – „5-re végződik”, a MF I/79/7 helyes mintájára), és mindig van keret saját címkével, így a „egyik sem” elemeknek is van helye.
- **Kétértelmű elemek (MF I/77/1, I/78/4):** a „Táplálék” feladatban a dió, a bab és a gyermekláncfű sem zöldségnek, sem gyümölcsnek nem egyértelmű; a föld alatti / föld feletti résznél a zöldhagyma és a petrezselyem két helyre is tehető (gyökér és levél is ehető). Ilyen vitatható elemet nem használunk: a mi címkéink (páros, háromjegyű, nagy, lyukas…) mindig egyértelműen eldönthetők.
- **Kerethez nem illő elem (MF I/78/5):** a „Háromjegyű számok” keretbe kell írni a 89-et is, amely kétjegyű – a könyv nem jelzi, hogy ez a csapda. Nálunk erről külön kérdés szól, megindokolva.
- **Kétértelmű címke (TK 70/8):** „Pirosak és kicsik” – ugyanaz a probléma, mint az 1. leckében; nálunk a két tulajdonság mindig két külön karikán van, és a közös rész jelenti az „és”-t.
- **Karika a karikában:** a MF I/78/6 a téglalap – négyzet viszonyt mutatja be, de a síkidomokat a X. témakör tanítja. Mi számokkal mutatjuk meg (minden kerek tízes páros), a síkidomos változat a X. témakörbe való.
- **Tudatos didaktikai változtatások:**
  - Egy karikával kezdünk (belül – kívül), csak utána jön a két karika és a négy rész; a négy részt színezve, névvel is megmutatjuk.
  - Minden elemnél ugyanaz a két kérdés: igaz rá az első címke? Igaz rá a második? A laborban a hibás választásra az a címke kap magyarázatot, amelyik nem stimmel.
  - A leolvasásnál külön gyakoroljuk a „karikában” (a közös résszel együtt) és a „csak a karikában” (nélküle) különbségét, és az „összesen” kérdésnél a közös rész egyszeri számolását – ezek a tipikus hibák; a könyv ezt nem emeli ki.
  - A határszámot itt is gyakoroljuk: a 300 nem kisebb 300-nál, és nem is nagyobb nála.
  - Igaz/hamis állítások és a sorba rendezés a 3. lecke témája, ezért itt nincsenek.
