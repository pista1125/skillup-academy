# 2. A számegyenes és a nulla (3. osztály, IX. Ismerkedés a negatív számokkal)

**Források:** tankönyv OH-MAT03TA 98–99. oldal (a hőmérő skálája mint „álló” számsor: 98/1–2, 99/5); munkafüzet OH-MAT03MA II/20. oldal (3–4. feladat: hőmérők és grafikon –4…11 tengellyel), II/22. oldal (12. feladat: „Mely számokat jelöltük a számegyenesen?”).

## Mit tartalmaznak a könyv oldalai?

- **TK 98–99:** számegyenes nincs; a negatív számok csak a hőmérők skáláján jelennek meg (–25…35, felirat 5- vagy 10-esével).
- **MF II/20/4.:** grafikon, amelynek függőleges tengelye –4-től 11-ig 1-esével számozott: ez a könyv egyetlen „álló számegyenese”.
- **MF II/22/12.:** fekvő számegyenes, csak a –1, 0, 1 van kiírva; hat nyíllal jelölt pont (3 a 0-tól balra, 3 jobbra), a számokat be kell írni.

## Mit csinál a DiákZóna lecke?

A számegyenest a 0-tól kétfelé bővítjük, lépésről lépésre: a két oldal (balra a negatív számok, jobbra az eddig ismertek, a 0 a határ, nem negatív) → lépések a 0-tól („a szám mutatja, hány lépés, a mínusz mutatja, merre”) → ugyanolyan messze, a 0 két oldalán (a 4 és a –4; az „ellentett” szót nem használjuk) → **a hőmérő álló számegyenes** (fent = jobbra, lent = balra) → leolvasás, ha nincs minden szám kiírva (1-, 2-, 5-, 10-es feliratok) → visszafelé számolás a 0-n át. Számkör: –20…+20. Összehasonlítás (kisebb–nagyobb, relációjel) és változás a 3. lecke témája, itt csak a helyet tanuljuk.

## Komponensek

1. **`NegNumberLineG3Parts.tsx`** – `NumberLine` (fekvő számegyenes: feliratok mindenhol / lépésenként / felsorolva, „?” a hiányzó helyen, nyíl dobozzal, pontok betűvel, ugrás-ívek, kék–piros oldalsáv), `NLSvg`, `VNumberLine` (álló számegyenes nyíllal), `nlX`. A hőmérőt és az `fmt` függvényt az 1. lecke `NegEverydayG3Parts.tsx` fájljából veszi át.
2. **`NegNumberLineG3Figures.tsx`** – `TwoSidesSvg`, `StepsFromZeroSvg`, `ThermoIsLineSvg`, `SameDistanceSvg`, `ReadBetweenSvg`.
3. **`NegNumberLineG3CardFigures.tsx`** – `NLCard` (számegyenes-darab piros ponttal, vastag vonalakkal), `ThermoCard` (az 1. leckéből).
4. **`NegNumberLineG3Theory.tsx`** – 7 rész + 2 labor:
   - **Labor I – Tedd a helyére!** Véletlen szám (–9…9, többnyire negatív); a gyerek a –10…10 számegyenes vonalkájára koppint (csak a –10, –5, 0, 5, 10 van kiírva). Hibára szabott tipp: rossz oldal („A mínuszos számok a 0-tól balra vannak!”), eggyel mellé („a 0 nem lépés!”), a 0-ra koppintás. Jó válasznál ugrás-ívek mutatják a lépéseket. Pontszámláló, „Új feladat”.
   - **Labor II – Mit mutat a nyíl?** Véletlenül fekvő (–1, 0, 1 vagy 5-ös feliratokkal) vagy álló (hőmérőszerű) számegyenes, nyíl egy vonalkán, 4 válasz (helyes, ellentétes előjelű, ±1/±2).
5. **`NegNumberLineG3Quiz.tsx`** – `NEG_NUMBERLINE_G3_QUESTIONS`: 30 kérdés (10/10/10), 28 kérdésnél ábra, mindegyiknél badge, 3 puska. Azonosító: `g3-neg-szamegyenes-quiz`.
6. **`NegNumberLineG3Matcher.tsx`** – `NEG_NUMBERLINE_G3_MATCHER_LEVELS`: pont a számegyenesen (csak a 0 kiírva) ↔ szám; pont 5-ös feliratú számegyenesen ↔ szám; álló hőmérő ↔ ugyanazt mutató számegyenes, leírás („7 lépés balra a 0-tól”) ↔ szám. `g3-neg-szamegyenes-matcher`.
7. **`NegNumberLineG3Sorter.tsx`** – `NEG_NUMBERLINE_G3_SORTER_LEVELS`: hány lépésre van a 0-tól (1 / 2 / 3; mindkét oldal, számegyenes, hőmérő, szó); melyik szakaszon van (–10…–5 / –5…0 / 0…5); ugyanaz a szám többféleképpen (–4 / –7 / –10). `g3-neg-szamegyenes-sorter`.

**Teszt:** `src/test/grade3Topic9NegNumberLineG3.test.tsx`.

## Eltérések a tankönyvtől

- **A számegyenes bevezetés nélkül jelenik meg:** a TK 98–99 egyáltalán nem mutat negatív számokat a számegyenesen; a MF II/22/12 a fejezet utolsó feladataként, magyarázat nélkül kér leolvasást egy olyan számegyenesről, amelyen csak a –1, 0, 1 van kiírva. Nálunk a számegyenes két oldalát, a 0 szerepét és a „lépés a 0-tól” gondolatát előbb megtanítjuk, és csak utána jön a ritkán feliratozott számegyenes.
- **Ferde nyíl (MF II/22/12):** a jobb szélső nyíl ferdén fut a pontjához, így nem egyértelmű, melyik vonalkát jelöli. Nálunk minden nyíl függőleges, és pontosan a vonalkára mutat.
- **A hőmérő és a számegyenes kapcsolata nincs kimondva:** a könyv a hőmérőt és (a MF II/20/4 grafikonján) az álló számsort használja, de nem mondja ki, hogy a hőmérő skálája egy felállított számegyenes. Nálunk külön ábra és kvíz-/párosító feladatok kötik össze a kettőt (fent = jobbra, lent = balra).
- **A 0 helye:** a könyv nem mondja ki, hogy a 0 se nem negatív, se nem „mínusz nélküli” szám; mi kimondjuk („a 0 a határ”), és egy igaz–hamis kérdés is ellenőrzi.
- **Tudatos didaktikai változtatások:**
  - A leggyakoribb leolvasási hibára (a vonalkák számolása a 0-val együtt, így eggyel több jön ki) külön „Vigyázz!” doboz épül („a 0 nem lépés”), és a laborok is erre adnak célzott tippet.
  - A visszafelé számolást a 0-n át (3, 2, 1, 0, –1 …) a számegyenesen ugrásokkal mutatjuk meg.
  - Az „ellentett szám” kifejezést a 3. osztályban nem vezetjük be (a 4. osztály tanítja); helyette: „ugyanolyan messze a 0-tól, csak a másik oldalon”.
  - Kisebb–nagyobb összehasonlítás, sorba rendezés és változás a 3. leckében következik.
