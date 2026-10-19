import React, { useState, useEffect } from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FindSolutionsMatcher } from './FindSolutionsMatcher';
import { FindSolutionsSorter } from './FindSolutionsSorter';

export interface FindSolutionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FindSolutionsQuiz: React.FC<FindSolutionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levelCheatSheets: Record<DifficultyLevel, React.ReactNode> = {
    1: (
      <div className="space-y-3">
        <h4 className="font-bold text-pink-700 dark:text-pink-300 text-sm">
          🔍 1. Szint: A fordított műveletek aranyszabálya
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-900/40">
            <strong>Összeadás ↔ Kivonás:</strong>
            <p className="mt-0.5 font-mono text-slate-700 dark:text-slate-300">x + 8 = 20 → x = 20 − 8 = 12</p>
            <p className="mt-0.5 font-mono text-slate-700 dark:text-slate-300">x − 5 = 15 → x = 15 + 5 = 20</p>
          </div>
          <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-900/40">
            <strong>Szorzás ↔ Osztás:</strong>
            <p className="mt-0.5 font-mono text-slate-700 dark:text-slate-300">4 · x = 36 → x = 36 : 4 = 9</p>
            <p className="mt-0.5 font-mono text-slate-700 dark:text-slate-300">x : 6 = 7 → x = 7 · 6 = 42</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          💡 <strong>Kétlépéses lebontás:</strong> Mindig az utoljára elvégzett műveletet bontjuk le legelőször!
        </p>
      </div>
    ),
    2: (
      <div className="space-y-3">
        <h4 className="font-bold text-pink-700 dark:text-pink-300 text-sm">
          ⚠️ 2. Szint: Zárójelek és a két veszélyes művelet
        </h4>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Kivonandó keresése:</strong> Kisebbítendő − x = Különbség → x = Kisebbítendő − Különbség
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              Példa: 40 − x = 12 → x = 40 − 12 = 28. (Nem összeadunk!)
            </p>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <strong>Osztó keresése:</strong> Osztandó : x = Hányados → x = Osztandó : Hányados
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              Példa: 48 : x = 6 → x = 48 : 6 = 8. (Nem szorzunk!)
            </p>
          </div>
          <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-900/40">
            <strong>Zárójelek kívülről befelé:</strong> (x + 5) · 3 = 27 → x + 5 = 27 : 3 = 9 → x = 9 − 5 = 4.
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <h4 className="font-bold text-pink-700 dark:text-pink-300 text-sm">
          🎯 3. Szint: Próbálgatás, egyenlőtlenségek és szöveges feladatok
        </h4>
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Alaphalmaz:</strong> Figyelj az alaphalmazra! Ha az alaphalmaz a természetes számok (0, 1, 2, ...), a negatív szám vagy tört nem megoldás!</div>
          <div>• <strong>Egyenlőtlenség:</strong> 2 · x + 3 &lt; 13 → 2 · x &lt; 10 → x &lt; 5. Alaphalmaz N esetén a megoldások: {'{0, 1, 2, 3, 4}'}.</div>
          <div>• <strong>Szöveges gondoltam egy számot:</strong> Írd fel egyenletként, majd bontsd le fordított műveletekkel!</div>
        </div>
      </div>
    )
  };

  const questions: Record<DifficultyLevel, Question[]> = {
    // ========================================================
    // 1. SZINT: KÖZVETLEN ÉS KÉTLÉPÉSES LEBONTOGATÁS (10 kérdés)
    // ========================================================
    1: [
      {
        id: 'sol-l1-1',
        question: 'Mi a megoldása a 3 · x = 42 egyenletnek?',
        options: ['x = 14', 'x = 39', 'x = 45', 'x = 126'],
        correctAnswer: 'x = 14',
        explanation: 'A szorzást osztással fordítjuk meg: x = 42 : 3 = 14. Ellenőrzés: 3 · 14 = 42.',
        hint: 'Mivel 3-mal szoroztunk, mindkét oldalt osszuk el 3-mal!'
      },
      {
        id: 'sol-l1-2',
        question: 'Melyik számra igaz: a : 7 = 8?',
        options: ['a = 56', 'a = 1', 'a = 15', 'a = 48'],
        correctAnswer: 'a = 56',
        explanation: 'Az osztás ellentétes művelete a szorzás: a = 8 · 7 = 56. Ellenőrzés: 56 : 7 = 8.',
        hint: 'Ha 7-tel osztottunk, a jobb oldalt szorozzuk meg 7-tel!'
      },
      {
        id: 'sol-l1-3',
        question: 'Hogyan kezdjük el a 2 · x + 9 = 27 egyenlet lebontását?',
        options: [
          'Kivonunk 9-et mindkét oldalból: 2 · x = 18',
          'Elosztjuk 2-vel a 9-et',
          'Hozzáadunk 9-et a 27-hez',
          'Megszorozzuk 2-vel a 27-et'
        ],
        correctAnswer: 'Kivonunk 9-et mindkét oldalból: 2 · x = 18',
        explanation: 'Az utolsó művelet az összeadás (+ 9) volt, így visszafelé haladva először 9-et vonunk le: 27 − 9 = 18.',
        hint: 'Visszafelé haladunk: az összeadást bontjuk le először kivonással!'
      },
      {
        id: 'sol-l1-4',
        question: 'Mennyi x értéke a 2 · x + 9 = 27 egyenletben?',
        options: ['x = 9', 'x = 8', 'x = 18', 'x = 6'],
        correctAnswer: 'x = 9',
        explanation: '1. lépés: 2 · x = 27 − 9 = 18. 2. lépés: x = 18 : 2 = 9. Ellenőrzés: 2 · 9 + 9 = 18 + 9 = 27.',
        hint: '2 · x = 18, ebből x = 18 : 2.'
      },
      {
        id: 'sol-l1-5',
        question: 'Oldd meg a 4 · y − 7 = 25 egyenletet!',
        options: ['y = 8', 'y = 7', 'y = 9', 'y = 32'],
        correctAnswer: 'y = 8',
        explanation: '1. lépés: 4 · y = 25 + 7 = 32. 2. lépés: y = 32 : 4 = 8. Ellenőrzés: 4 · 8 − 7 = 32 − 7 = 25.',
        hint: 'Először adj hozzá 7-et a 25-höz, majd oszd el 4-gyel!'
      },
      {
        id: 'sol-l1-6',
        question: 'Mi a helyes lebontás a b : 3 + 4 = 11 egyenletnél?',
        options: [
          'b : 3 = 7, majd b = 7 · 3 = 21',
          'b : 3 = 15, majd b = 45',
          'b = 11 − 4 · 3',
          'b = (11 + 4) : 3 = 5'
        ],
        correctAnswer: 'b : 3 = 7, majd b = 7 · 3 = 21',
        explanation: '1. Kivonunk 4-et: b : 3 = 11 − 4 = 7. 2. Szorzunk 3-mal: b = 7 · 3 = 21. Ellenőrzés: 21 : 3 + 4 = 7 + 4 = 11.',
        hint: '11 − 4 = 7, majd 7 · 3.'
      },
      {
        id: 'sol-l1-7',
        question: 'Gondoltam egy számot, hozzáadtam 16-ot, majd elosztottam 5-tel, és 7-et kaptam. Mi a gondolt szám?',
        options: ['19', '25', '35', '15'],
        correctAnswer: '19',
        explanation: 'Egyenlet: (x + 16) : 5 = 7. Visszafejtés: x + 16 = 7 · 5 = 35 → x = 35 − 16 = 19. Ellenőrzés: (19 + 16) : 5 = 35 : 5 = 7.',
        hint: 'Fordított műveletek: 7 · 5 = 35, majd 35 − 16.'
      },
      {
        id: 'sol-l1-8',
        question: 'Mi az ellenőrzés célja egyenletmegoldás után?',
        options: [
          'Megbizonyosodni arról, hogy a kapott számmal a bal és jobb oldal értéke egyenlő',
          'Újra megoldani az egyenletet egy másik ismeretlennel',
          'Hogy még több számolást végezzünk a füzetben',
          'Hogy nullát kapjunk eredményül'
        ],
        correctAnswer: 'Megbizonyosodni arról, hogy a kapott számmal a bal és jobb oldal értéke egyenlő',
        explanation: 'Az ellenőrzés során az ismeretlen helyére behelyettesítjük a kapott számot az eredeti egyenletbe, és megnézzük, hogy Bal oldal = Jobb oldal teljesül-e.',
        hint: 'Az ellenőrzés igazolja a számolás helyességét.'
      },
      {
        id: 'sol-l1-9',
        question: 'Melyik szám teszi igazzá: 5 · x + 12 = 52?',
        options: ['x = 8', 'x = 7', 'x = 10', 'x = 6'],
        correctAnswer: 'x = 8',
        explanation: '5 · x = 52 − 12 = 40. x = 40 : 5 = 8. Ellenőrzés: 5 · 8 + 12 = 40 + 12 = 52.',
        hint: '52 − 12 = 40, és 40 : 5 = ?'
      },
      {
        id: 'sol-l1-10',
        question: 'Mi a megoldása a 6 · a − 14 = 28 egyenletnek?',
        options: ['a = 7', 'a = 6', 'a = 8', 'a = 9'],
        correctAnswer: 'a = 7',
        explanation: '6 · a = 28 + 14 = 42. a = 42 : 6 = 7. Ellenőrzés: 6 · 7 − 14 = 42 − 14 = 28.',
        hint: '28 + 14 = 42, 42 : 6 = ?'
      }
    ],

    // ========================================================
    // 2. SZINT: ZÁRÓJELEK, KIVONANDÓ ÉS OSZTÓ KERESÉSE (10 kérdés)
    // ========================================================
    2: [
      {
        id: 'sol-l2-1',
        question: 'Hogyan számoljuk ki x-et a 35 − x = 14 egyenletből?',
        options: [
          'x = 35 − 14 = 21',
          'x = 35 + 14 = 49',
          'x = 14 − 35',
          'x = 35 · 14'
        ],
        correctAnswer: 'x = 35 − 14 = 21',
        explanation: 'Mivel x a kivonandó (második tag), a kisebbítendőből vonjuk ki a különbséget: x = 35 − 14 = 21. Ellenőrzés: 35 − 21 = 14.',
        hint: '35-ből mennyit vegyünk el, hogy 14 maradjon? 35 − 14 = ?'
      },
      {
        id: 'sol-l2-2',
        question: 'Mennyi y értéke a 72 : y = 8 nyitott egyenlőségben?',
        options: ['y = 9', 'y = 576', 'y = 8', 'y = 64'],
        correctAnswer: 'y = 9',
        explanation: 'Itt y az osztó! Osztót osztással kapunk: y = 72 : 8 = 9. Nem szabad összeszorozni őket! Ellenőrzés: 72 : 9 = 8.',
        hint: '72-t mennyivel kell elosztani, hogy 8 legyen? 72 : 8 = ?'
      },
      {
        id: 'sol-l2-3',
        question: 'Oldd meg a (k + 7) · 6 = 54 egyenletet!',
        options: ['k = 2', 'k = 9', 'k = 3', 'k = 5'],
        correctAnswer: 'k = 2',
        explanation: '1. A zárójelet kívülről bontjuk le: k + 7 = 54 : 6 = 9. 2. k = 9 − 7 = 2. Ellenőrzés: (2 + 7) · 6 = 9 · 6 = 54.',
        hint: 'Először oszd el az 54-et 6-tal, utána vond ki a 7-et!'
      },
      {
        id: 'sol-l2-4',
        question: 'Mi a megoldása a 60 − 4 · x = 24 egyenletnek?',
        options: ['x = 9', 'x = 21', 'x = 6', 'x = 8'],
        correctAnswer: 'x = 9',
        explanation: 'A kivonandó a (4 · x). 1. lépés: 4 · x = 60 − 24 = 36. 2. lépés: x = 36 : 4 = 9. Ellenőrzés: 60 − 4 · 9 = 60 − 36 = 24.',
        hint: 'Mennyit vontunk ki 60-ból, hogy 24 maradjon? 60 − 24 = 36. Ekkor 4 · x = 36.'
      },
      {
        id: 'sol-l2-5',
        question: 'Oldd meg a (2 · m − 6) : 4 = 5 egyenletet!',
        options: ['m = 13', 'm = 10', 'm = 7', 'm = 8'],
        correctAnswer: 'm = 13',
        explanation: '1. lépés: 2 · m − 6 = 5 · 4 = 20. 2. lépés: 2 · m = 20 + 6 = 26. 3. lépés: m = 26 : 2 = 13. Ellenőrzés: (2 · 13 − 6) : 4 = (26 − 6) : 4 = 20 : 4 = 5.',
        hint: 'Először 5 · 4 = 20, majd 20 + 6 = 26, végül 26 : 2.'
      },
      {
        id: 'sol-l2-6',
        question: 'Melyik szám teszi igazzá: 90 : (x + 3) = 9?',
        options: ['x = 7', 'x = 10', 'x = 8', 'x = 6'],
        correctAnswer: 'x = 7',
        explanation: 'A zárójel a teljes osztó! 1. lépés: x + 3 = 90 : 9 = 10. 2. lépés: x = 10 − 3 = 7. Ellenőrzés: 90 : (7 + 3) = 90 : 10 = 9.',
        hint: '90-et mennyivel kell osztani, hogy 9 legyen? 10-zel! Tehát x + 3 = 10.'
      },
      {
        id: 'sol-l2-7',
        question: 'Gondoltam egy számot, kivontam belőle 15-öt, a különbséget megszoroztam 4-gyel, és 48-at kaptam. Mi a gondolt szám?',
        options: ['27', '23', '12', '32'],
        correctAnswer: '27',
        explanation: '(x − 15) · 4 = 48. Visszafelé: x − 15 = 48 : 4 = 12 → x = 12 + 15 = 27. Ellenőrzés: (27 − 15) · 4 = 12 · 4 = 48.',
        hint: '48 : 4 = 12, majd 12 + 15 = ?'
      },
      {
        id: 'sol-l2-8',
        question: 'Peti azt mondta: „A 40 − x = 25 egyenlet megoldása x = 40 + 25 = 65”. Igaza van-e?',
        options: [
          'Nincs igaza, mert x a kivonandó: x = 40 − 25 = 15',
          'Igaza van, mert kivonás ellentétes művelete az összeadás',
          'Nincs igaza, a megoldás x = 65 − 40 = 25',
          'Igaza van, 40 − 65 = 25'
        ],
        correctAnswer: 'Nincs igaza, mert x a kivonandó: x = 40 − 25 = 15',
        explanation: 'Kivonásnál ha a kivonandó ismeretlen, a kisebbítendőből vonjuk ki a különbséget: 40 − 15 = 25. Peti hibázott, 40-ből nem lehet 65-öt elvenni úgy, hogy 25 maradjon!',
        hint: 'Ellenőrizd Peti eredményét: 40 − 65 = 25? Nem!'
      },
      {
        id: 'sol-l2-9',
        question: 'Mennyi a megoldása a 100 − 5 · (y + 2) = 60 egyenletnek?',
        options: ['y = 6', 'y = 8', 'y = 10', 'y = 4'],
        correctAnswer: 'y = 6',
        explanation: '1. Kivonandó: 5 · (y + 2) = 100 − 60 = 40. 2. Zárójel: y + 2 = 40 : 5 = 8. 3. y = 8 − 2 = 6. Ellenőrzés: 100 − 5 · (6 + 2) = 100 − 40 = 60.',
        hint: '5 · (y + 2) = 40, így y + 2 = 8.'
      },
      {
        id: 'sol-l2-10',
        question: 'Oldd meg: (30 + x) : 7 = 6!',
        options: ['x = 12', 'x = 42', 'x = 8', 'x = 14'],
        correctAnswer: 'x = 12',
        explanation: '1. lépés: 30 + x = 6 · 7 = 42. 2. lépés: x = 42 − 30 = 12. Ellenőrzés: (30 + 12) : 7 = 42 : 7 = 6.',
        hint: '6 · 7 = 42, majd 42 − 30 = ?'
      }
    ],

    // ========================================================
    // 3. SZINT: PRÓBÁLGATÁS, EGYENLŐTLENSÉGEK ÉS SZÖVEGESEK (10 kérdés)
    // ========================================================
    3: [
      {
        id: 'sol-l3-1',
        question: 'Keresd meg a 4 · x + 3 = 31 egyenlet megoldását az alaphalmazból próbálgatással! Alaphalmaz: A = {5, 6, 7, 8}.',
        options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
        correctAnswer: 'x = 7',
        explanation: 'Tesztelés: x=5: 4·5+3=23 (nem). x=6: 4·6+3=27 (nem). x=7: 4·7+3=31 (IGAZ!). x=8: 4·8+3=35 (nem). Tehát x = 7.',
        hint: '4 · 7 = 28, és 28 + 3 = 31!'
      },
      {
        id: 'sol-l3-2',
        question: 'Mi az igazsághalmaza a 3 · x + 2 ≤ 11 nyitott mondatnak, ha az alaphalmaz a természetes számok (x ∈ ℕ)?',
        options: [
          '{0, 1, 2, 3}',
          '{1, 2, 3}',
          '{0, 1, 2, 3, 4}',
          '{3}'
        ],
        correctAnswer: '{0, 1, 2, 3}',
        explanation: 'Lebontás: 3 · x ≤ 11 − 2 = 9 → x ≤ 9 : 3 = 3. Mivel x ∈ ℕ (a természetes számok halmaza a 0-t is tartalmazza): {0, 1, 2, 3}.',
        hint: '3 · x ≤ 9, tehát x ≤ 3. A 0 természetes szám!'
      },
      {
        id: 'sol-l3-3',
        question: 'Oldd meg a 2 · x + 5 > 13 egyenlőtlenséget az egyjegyű prímszámok halmazán! Alaphalmaz: P = {2, 3, 5, 7}.',
        options: ['{5, 7}', '{7}', '{3, 5, 7}', '{2, 3}'],
        correctAnswer: '{5, 7}',
        explanation: 'Lebontás: 2 · x > 13 − 5 = 8 → x > 4. A {2, 3, 5, 7} halmazból a 4-nél nagyobb számok: 5 és 7.',
        hint: '2 · x > 8, vagyis x > 4. Melyik prím nagyobb 4-nél?'
      },
      {
        id: 'sol-l3-4',
        question: 'Egy apa 36 éves, a fia 10 éves. Hány év múlva (x) lesz az apa életkora kétszerese a fiáénak?',
        options: ['16 év múlva', '14 év múlva', '12 év múlva', '18 év múlva'],
        correctAnswer: '16 év múlva',
        explanation: 'x év múlva: apa = 36 + x, fia = 10 + x. Egyenlet: 36 + x = 2 · (10 + x) = 20 + 2 · x. Kivonunk x-et és 20-at: x = 16. Ellenőrzés: 16 év múlva az apa 52, a fia 26 éves, és 52 = 2 · 26.',
        hint: 'Próbáld ki: 16 év múlva az apa 36 + 16 = 52, a fia 10 + 16 = 26.'
      },
      {
        id: 'sol-l3-5',
        question: 'Van-e megoldása a 2 · x + 10 = 2 · x + 15 egyenletnek?',
        options: [
          'Nincs megoldása, az igazsághalmaz az üres halmaz (∅)',
          'Minden szám megoldás',
          'x = 5 a megoldás',
          'x = 0 a megoldás'
        ],
        correctAnswer: 'Nincs megoldása, az igazsághalmaz az üres halmaz (∅)',
        explanation: 'Ha mindkét oldalból kivonjuk a (2 · x)-et, azt kapjuk, hogy 10 = 15, ami lehetetlen (mindig hamis állítás). Tehát nincs megoldása, I = ∅.',
        hint: 'Lehet-e ugyanahhoz a számhoz 10-et és 15-öt adva ugyanazt az eredményt kapni?'
      },
      {
        id: 'sol-l3-6',
        question: 'Melyik x teszi igazzá: 4 · (x − 2) + 6 = 30?',
        options: ['x = 8', 'x = 7', 'x = 9', 'x = 6'],
        correctAnswer: 'x = 8',
        explanation: '1. Kivonunk 6-ot: 4 · (x − 2) = 24. 2. Osztunk 4-gyel: x − 2 = 6. 3. Hozzáadunk 2-t: x = 8. Ellenőrzés: 4 · (8 − 2) + 6 = 4 · 6 + 6 = 30.',
        hint: '4 · (x − 2) = 24, ebből x − 2 = 6.'
      },
      {
        id: 'sol-l3-7',
        question: 'Egy téglalap kerülete 48 cm. Az egyik oldala 14 cm. Milyen egyenlettel számíthatjuk ki a másik oldalt (b), és mennyi b értéke?',
        options: [
          '2 · (14 + b) = 48 → b = 10 cm',
          '14 · b = 48 → b = 3,4 cm',
          '14 + b = 48 → b = 34 cm',
          '2 · 14 + b = 48 → b = 20 cm'
        ],
        correctAnswer: '2 · (14 + b) = 48 → b = 10 cm',
        explanation: 'A kerület képlete K = 2 · (a + b). 2 · (14 + b) = 48 → 14 + b = 24 → b = 10 cm. Ellenőrzés: 2 · (14 + 10) = 2 · 24 = 48 cm.',
        hint: 'A félkerület 48 : 2 = 24 cm. Ha az egyik oldal 14 cm, a másik 24 − 14.'
      },
      {
        id: 'sol-l3-8',
        question: 'Ha a 5 · x − 8 < 22 nyitott mondat alaphalmaza a pozitív páros számok halmaza, mi az igazsághalmaz?',
        options: ['{2, 4}', '{0, 2, 4}', '{2, 4, 6}', '{1, 2, 3, 4, 5}'],
        correctAnswer: '{2, 4}',
        explanation: 'Lebontás: 5 · x < 30 → x < 6. A 6-nál kisebb pozitív páros számok: 2 és 4 (a 0 nem pozitív!).',
        hint: 'x < 6 és pozitív páros szám.'
      },
      {
        id: 'sol-l3-9',
        question: 'Három egymást követő természetes szám összege 42. Melyik a középső szám?',
        options: ['14', '13', '15', '12'],
        correctAnswer: '14',
        explanation: 'Jelöljük a középső számot x-szel! Ekkor a három szám: (x − 1), x, (x + 1). Összegük: 3 · x = 42 → x = 14. A három szám: 13, 14, 15. Összegük 13 + 14 + 15 = 42.',
        hint: 'A három szám átlaga pont a középső szám: 42 : 3 = ?'
      },
      {
        id: 'sol-l3-10',
        question: 'Mi a megoldása a (50 − 2 · x) : 6 + 4 = 9 egyenletnek?',
        options: ['x = 10', 'x = 12', 'x = 8', 'x = 15'],
        correctAnswer: 'x = 10',
        explanation: '1. Kivonunk 4-et: (50 − 2 · x) : 6 = 5. 2. Szorzunk 6-tal: 50 − 2 · x = 30. 3. Kivonandó keresése: 2 · x = 50 − 30 = 20. 4. Osztunk 2-vel: x = 10. Ellenőrzés: (50 − 20) : 6 + 4 = 30 : 6 + 4 = 5 + 4 = 9.',
        hint: 'Lépésről lépésre hámozd le a műveleteket: −4, ·6, kivonandó, :2.'
      }
    ]
  };

  return (
    <QuizTemplate
      title="Keressük a megoldásokat! Kvíz"
      subtitle="Gyakorold az egyenletek lebontogatását, próbálgatását és a kötelező ellenőrzést!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-find-solutions-quiz"
      documentId="5_osztaly_keressuk_a_megoldasokat_kviz"
      storageKey="g5-find-solutions-quiz"
      levelCheatSheets={levelCheatSheets}
      cheatSheetCards={levelCheatSheets}
      questions={questions}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      matcherComponent={
        <FindSolutionsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <FindSolutionsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <FindSolutionsMatcher
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
      renderSorter={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <FindSolutionsSorter
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
    />
  );
};
export default FindSolutionsQuiz;
