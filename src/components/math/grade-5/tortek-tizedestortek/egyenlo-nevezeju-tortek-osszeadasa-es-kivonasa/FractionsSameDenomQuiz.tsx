import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { FractionsSameDenomMatcher } from './FractionsSameDenomMatcher';
import { FractionsSameDenomSorter } from './FractionsSameDenomSorter';
import { Plus, Minus, Sparkles, Scale, BookOpen, Layers, CheckCircle2, Calculator } from 'lucide-react';

export interface FractionsSameDenomQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export const questions: Question[] = [
  // ==========================================
  // 1. SZINT: KÖNNYŰ (ALAPMŰVELETEK AZONOS NEVEZŐVEL)
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mennyi a 2/7 + 3/7 művelet eredménye?',
    options: ['5/7', '5/14', '6/7', '1/7'],
    correctAnswer: 0,
    explanation: 'Azonos nevezőjű törtek összeadásakor a számlálókat összeadjuk (2 + 3 = 5), a nevező változatlan marad (7).',
    hint: 'A számlálókat add össze, a nevező (7) maradjon változatlan!',
    breakdown: [
      { label: 'Számlálók összege', value: '2 + 3 = 5' },
      { label: 'Közös nevező', value: '7 (nem változik)' },
      { label: 'Eredmény', value: '5/7' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mennyi a 8/9 - 5/9 művelet eredménye legegyszerűbb alakban?',
    options: ['1/3 (vagy 3/9)', '3/0', '13/9', '3/18'],
    correctAnswer: 0,
    explanation: 'A számlálók különbsége: 8 - 5 = 3. A nevező 9. Az eredmény 3/9, ami 3-mal egyszerűsítve 1/3.',
    hint: 'Vonj ki 5-öt a 8-ból, majd egyszerűsítsd 3-mal az eredményt!',
    breakdown: [
      { label: 'Kivonás', value: '8/9 - 5/9 = 3/9' },
      { label: 'Egyszerűsítés 3-mal', value: '3/9 = 1/3' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Mennyi az 1/6 + 4/6 összeadás eredménye?',
    options: ['5/6', '5/12', '4/6', '3/6'],
    correctAnswer: 0,
    explanation: '1 hatod + 4 hatod = (1 + 4)/6 = 5/6.',
    hint: 'Add össze a számlálókat: 1 + 4!',
    breakdown: [
      { label: 'Művelet', value: '(1 + 4)/6' },
      { label: 'Végeredmény', value: '5/6' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Mit teszünk a nevezővel, amikor azonos nevezőjű törteket adunk össze?',
    options: [
      'Változatlanul leírjuk (nem változik)',
      'Összeadjuk a nevezőket is',
      'Összeszorozzuk a nevezőket',
      'Kivonjuk egymásból a nevezőket'
    ],
    correctAnswer: 0,
    explanation: 'A nevező a szeletek méretét/fajtáját jelenti. Mivel a szeletek mérete nem változik, a nevezőt változatlanul hagyjuk.',
    hint: 'Gondolj a pizzára: 2 szelet + 3 szelet az 5 szelet marad, a szelet mérete nem feleződik!',
    breakdown: [
      { label: 'Szabály', value: 'A számlálókat összeadjuk, a nevező változatlan marad.' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Mennyi az 5/8 - 2/8 kivonás eredménye?',
    options: ['3/8', '3/0', '7/8', '3/16'],
    correctAnswer: 0,
    explanation: '5 nyolcadból elveszünk 2 nyolcadot: 5 - 2 = 3 nyolcad (3/8).',
    hint: 'Számlálók kivonása: 5 - 2.',
    breakdown: [
      { label: 'Számolás', value: '(5 - 2)/8 = 3/8' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Mennyi a 3/10 + 4/10 összeadás eredménye?',
    options: ['7/10', '7/20', '12/10', '1/10'],
    correctAnswer: 0,
    explanation: '(3 + 4)/10 = 7/10.',
    hint: '3 tized + 4 tized = 7 tized.',
    breakdown: [
      { label: 'Eredmény', value: '7/10' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mennyi a 4/4 - 1/4 kivonás eredménye?',
    options: ['3/4', '3/0', '1', '5/4'],
    correctAnswer: 0,
    explanation: '4/4 - 1/4 = (4 - 1)/4 = 3/4.',
    hint: '4 negyedből 1 negyedet elvéve 3 negyed marad.',
    breakdown: [
      { label: 'Kivonás', value: '4/4 - 1/4 = 3/4' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Mennyi az 1 - 2/5 művelet eredménye?',
    options: ['3/5', '1/5', '2/5', '1 2/5'],
    correctAnswer: 0,
    explanation: 'Az 1 egészet átírjuk 5/5 alakba: 5/5 - 2/5 = 3/5.',
    hint: 'Írd fel az 1 egészet 5/5-ként, és vonj ki belőle 2/5-öt!',
    breakdown: [
      { label: '1 egész átírása', value: '1 = 5/5' },
      { label: 'Kivonás', value: '5/5 - 2/5 = 3/5' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Egy torta 2/8 részét megettük délelőtt, 3/8 részét délután. Mekkora részét ettük meg a tortának összesen?',
    options: ['5/8 részét', '5/16 részét', '1/8 részét', '6/8 részét'],
    correctAnswer: 0,
    explanation: '2/8 + 3/8 = (2 + 3)/8 = 5/8 részét ettük meg összesen.',
    hint: 'Add össze a délelőtti és délutáni törtrészeket: 2/8 + 3/8!',
    breakdown: [
      { label: 'Délelőtt', value: '2/8' },
      { label: 'Délután', value: '3/8' },
      { label: 'Összesen', value: '2/8 + 3/8 = 5/8' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Mennyi a 7/11 - 7/11 művelet eredménye?',
    options: ['0', '0/11', '1', '14/11'],
    correctAnswer: 0,
    explanation: '7/11 - 7/11 = (7 - 7)/11 = 0/11 = 0. Bármely számot önmagából kivonva 0-t kapunk.',
    hint: 'Bármit önmagából kivonva az eredmény mindig 0.',
    breakdown: [
      { label: 'Eredmény', value: '0/11 = 0' }
    ]
  },

  // ==========================================
  // 2. SZINT: KÖZEPES (EGÉSZBŐL KIVONÁS, EGYSZERŰSÍTÉS, HIÁNYZÓ TAGOK)
  // ==========================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Mennyi a 3/8 + 1/8 művelet eredménye legegyszerűbb alakban megadva?',
    options: ['1/2', '4/8', '4/16', '1/4'],
    correctAnswer: 0,
    explanation: '3/8 + 1/8 = 4/8. A számlálót és a nevezőt is elosztva 4-gyel (közös osztó) a legegyszerűbb alak: 1/2.',
    hint: '3/8 + 1/8 = 4/8. Egyszerűsítsd 4-gyel!',
    breakdown: [
      { label: 'Összeg', value: '3/8 + 1/8 = 4/8' },
      { label: 'Egyszerűsítés', value: '4/8 = 1/2 (mindkettőt osztjuk 4-gyel)' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Mennyi az 1 - 3/10 művelet eredménye?',
    options: ['7/10', '3/10', '4/10', '1 3/10'],
    correctAnswer: 0,
    explanation: '1 egész = 10/10. Így 10/10 - 3/10 = 7/10.',
    hint: '1 egész = 10/10.',
    breakdown: [
      { label: '1 felbontása', value: '1 = 10/10' },
      { label: 'Kivonás', value: '10/10 - 3/10 = 7/10' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Mennyi a 2 - 3/4 kivonás eredménye vegyes tört alakban?',
    options: ['1 1/4', '1 3/4', '2 1/4', '5/4'],
    correctAnswer: 0,
    explanation: 'A 2 egészet felbontjuk: 2 = 1 + 1 = 1 + 4/4 = 1 4/4. Ebből kivonva a 3/4-et: 1 4/4 - 3/4 = 1 1/4.',
    hint: 'Válts fel 1 egészet 4/4-re: 2 = 1 4/4. Ebből vonj ki 3/4-et!',
    breakdown: [
      { label: 'Felbontás', value: '2 = 1 4/4' },
      { label: 'Kivonás', value: '1 4/4 - 3/4 = 1 1/4' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Mennyi az 5/12 + 1/12 összeadás eredménye a legegyszerűbb alakjában?',
    options: ['1/2', '6/12', '6/24', '1/3'],
    correctAnswer: 0,
    explanation: '5/12 + 1/12 = 6/12. Mindkét tagot elosztva 6-tal kapjuk az 1/2-et.',
    hint: '5/12 + 1/12 = 6/12. Egyszerűsítsd 6-tal!',
    breakdown: [
      { label: 'Összeg', value: '6/12' },
      { label: 'Egyszerűsítés 6-tal', value: '6/12 = 1/2' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Mennyi a 11/15 - 6/15 kivonás eredménye legegyszerűbb alakban?',
    options: ['1/3', '5/15', '1/5', '17/15'],
    correctAnswer: 0,
    explanation: '11/15 - 6/15 = 5/15. Mindkét tagot elosztjuk 5-tel: 5/15 = 1/3.',
    hint: '11 - 6 = 5. A kapott 5/15-öt egyszerűsítsd 5-tel!',
    breakdown: [
      { label: 'Kivonás', value: '11/15 - 6/15 = 5/15' },
      { label: 'Egyszerűsítés 5-tel', value: '5/15 = 1/3' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Egy tejeskannában 7/10 liter tej volt. Kiöntöttek belőle 3/10 litert. Mennyi tej maradt a kannában a legegyszerűbb alakban?',
    options: ['2/5 liter', '4/10 liter', '1/2 liter', '4/20 liter'],
    correctAnswer: 0,
    explanation: '7/10 - 3/10 = 4/10 liter. 2-vel egyszerűsítve: 4/10 = 2/5 liter maradt.',
    hint: '7/10 - 3/10 = 4/10. Egyszerűsítsd 2-vel!',
    breakdown: [
      { label: 'Maradék', value: '7/10 - 3/10 = 4/10 liter' },
      { label: 'Legegyszerűbb alak', value: '4/10 = 2/5 liter' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Melyik szám teszi igazzá az egyenlőséget: x/7 + 3/7 = 6/7 ?',
    options: ['x = 3', 'x = 2', 'x = 9', 'x = 4'],
    correctAnswer: 0,
    explanation: 'Mivel a nevezők azonosak, a számlálókra: x + 3 = 6 ⟹ x = 6 - 3 = 3.',
    hint: 'Hányhoz kell 3-at adni, hogy 6 legyen?',
    breakdown: [
      { label: 'Számlálók egyenlete', value: 'x + 3 = 6' },
      { label: 'Megoldás', value: 'x = 3' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Mennyi a 3 - 1/5 kivonás eredménye vegyes tört alakban?',
    options: ['2 4/5', '2 1/5', '3 4/5', '14/5'],
    correctAnswer: 0,
    explanation: 'A 3 egészből 1-et felváltunk 5/5-re: 3 = 2 5/5. Ebből: 2 5/5 - 1/5 = 2 4/5.',
    hint: '3 = 2 5/5. Vonj le belőle 1/5-öt!',
    breakdown: [
      { label: '3 átírása', value: '3 = 2 5/5' },
      { label: 'Kivonás', value: '2 5/5 - 1/5 = 2 4/5' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Mennyi a 4/9 + 5/9 művelet eredménye?',
    options: ['1 (pontosan 1 egész)', '9/18', '1/9', '8/9'],
    correctAnswer: 0,
    explanation: '4/9 + 5/9 = 9/9 = 1 egész.',
    hint: '4 + 5 = 9. A 9/9 értéke pontosan 1 egész.',
    breakdown: [
      { label: 'Összeg', value: '4/9 + 5/9 = 9/9' },
      { label: 'Egész alak', value: '9/9 = 1' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mennyi a 13/20 - 3/20 művelet eredménye a legegyszerűbb alakjában?',
    options: ['1/2', '10/20', '1/4', '16/20'],
    correctAnswer: 0,
    explanation: '13/20 - 3/20 = 10/20. 10-zel egyszerűsítve: 10/20 = 1/2.',
    hint: '13 - 3 = 10. A 10/20-at egyszerűsítsd 10-zel!',
    breakdown: [
      { label: 'Kivonás', value: '13/20 - 3/20 = 10/20' },
      { label: 'Egyszerűsítés 10-zel', value: '10/20 = 1/2' }
    ]
  },

  // ==========================================
  // 3. SZINT: NEHÉZ / MESTERFOK (VEGYES TÖRTEK, ÁTLÉPÉS, SZÖVEGES FELADATOK)
  // ==========================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mennyi az 1 2/5 + 2 1/5 összeadás eredménye?',
    options: ['3 3/5', '3 3/10', '4 3/5', '17/5'],
    correctAnswer: 0,
    explanation: 'Egészek összege: 1 + 2 = 3. Törtrészek összege: 2/5 + 1/5 = 3/5. Összesen: 3 3/5.',
    hint: 'Egészhez az egészet (1+2), törthöz a törtet (2/5+1/5) add hozzá!',
    breakdown: [
      { label: 'Egész részek', value: '1 + 2 = 3' },
      { label: 'Tört részek', value: '2/5 + 1/5 = 3/5' },
      { label: 'Végeredmény', value: '3 3/5' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mennyi a 4 5/8 - 2 3/8 kivonás eredménye a legegyszerűbb vegyes tört alakban?',
    options: ['2 1/4', '2 2/8', '2 2/0', '6 8/8'],
    correctAnswer: 0,
    explanation: 'Egészek különbsége: 4 - 2 = 2. Törtrészek különbsége: 5/8 - 3/8 = 2/8 = 1/4. Végeredmény: 2 1/4.',
    hint: '4 - 2 = 2 egész, és 5/8 - 3/8 = 2/8 = 1/4.',
    breakdown: [
      { label: 'Egészek', value: '4 - 2 = 2' },
      { label: 'Törtrészek', value: '5/8 - 3/8 = 2/8 = 1/4' },
      { label: 'Legegyszerűbb vegyes tört', value: '2 1/4' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Mennyi a 2 4/5 + 1 3/5 összeadás eredménye vegyes tört alakban?',
    options: ['4 2/5', '3 7/5', '3 7/10', '4 1/5'],
    correctAnswer: 0,
    explanation: 'Egészek: 2 + 1 = 3. Törtrész: 4/5 + 3/5 = 7/5 = 1 2/5. Hozzáadva a 3 egészhez: 3 + 1 2/5 = 4 2/5.',
    hint: 'A 4/5 + 3/5 = 7/5 = 1 2/5. Ez az 1 egész hozzáadódik az eddigi 3 egészhez!',
    breakdown: [
      { label: 'Egészek + Törtek', value: '(2+1) + (4/5+3/5) = 3 + 7/5' },
      { label: 'Áltört átváltása', value: '7/5 = 1 2/5' },
      { label: 'Végeredmény', value: '3 + 1 2/5 = 4 2/5' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Mennyi a 3 1/4 - 1 3/4 kivonás eredménye a legegyszerűbb alakban?',
    options: ['1 1/2 (vagy 1 2/4)', '1 3/4', '2 2/4', '2 1/4'],
    correctAnswer: 0,
    explanation: 'Mivel 1/4-ből nem tudunk 3/4-et levonni, a 3 1/4-ből 1 egészet felváltunk: 3 1/4 = 2 5/4. Így 2 5/4 - 1 3/4 = 1 2/4 = 1 1/2.',
    hint: 'Válts fel 1 egészet a 3-ból: 3 1/4 = 2 5/4. Ebből már könnyű kivonni az 1 3/4-et!',
    breakdown: [
      { label: 'Kölcsönkérés / Átírás', value: '3 1/4 = 2 5/4' },
      { label: 'Kivonás', value: '2 5/4 - 1 3/4 = 1 2/4' },
      { label: 'Egyszerűsítés', value: '1 2/4 = 1 1/2' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Mennyi a 3/5 + 4/5 + 1/5 háromtagú összeg értéke vegyes tört alakban?',
    options: ['1 3/5', '8/5', '8/15', '1 4/5'],
    correctAnswer: 0,
    explanation: '(3 + 4 + 1)/5 = 8/5. Mivel 8 : 5 = 1, maradék 3, vegyes törtként: 1 3/5.',
    hint: 'Add össze a 3 számlálót: 3 + 4 + 1 = 8 ötöd. Alakítsd vegyes törtbe!',
    breakdown: [
      { label: 'Számlálók összege', value: '3 + 4 + 1 = 8' },
      { label: 'Áltört alak', value: '8/5' },
      { label: 'Vegyes tört alak', value: '8/5 = 1 3/5' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Egy konyhakert 3/10 részén sárgarépa, 4/10 részén borsó terem. A maradék részen paradicsom van. A kert hányadrészén terem paradicsom?',
    options: ['3/10 részén', '7/10 részén', '1/10 részén', '4/10 részén'],
    correctAnswer: 0,
    explanation: 'A sárgarépa és borsó együtt: 3/10 + 4/10 = 7/10. A teljes kert 1 egész = 10/10. Paradicsom: 10/10 - 7/10 = 3/10 rész.',
    hint: 'Add össze az eddigi növények részét (3/10 + 4/10 = 7/10), és vond ki az 1 egészből (10/10)!',
    breakdown: [
      { label: 'Répa + Borsó', value: '3/10 + 4/10 = 7/10' },
      { label: 'Paradicsom', value: '1 - 7/10 = 10/10 - 7/10 = 3/10' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Melyik szám hiányzik az egyenlőségből: 5 - x = 2 3/7 ?',
    options: ['2 4/7', '3 4/7', '2 3/7', '3 3/7'],
    correctAnswer: 0,
    explanation: 'x = 5 - 2 3/7 = 4 7/7 - 2 3/7 = 2 4/7.',
    hint: 'Vonj ki az 5 egészből 2 3/7-et! (5 = 4 7/7)',
    breakdown: [
      { label: 'Egyenlet rendezése', value: 'x = 5 - 2 3/7' },
      { label: '5 átírása', value: '5 = 4 7/7' },
      { label: 'Kivonás', value: '4 7/7 - 2 3/7 = 2 4/7' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Mennyi az 1 3/8 + 2 5/8 művelet pontos értéke?',
    options: ['4 (pontosan 4 egész)', '3 8/8', '3 8/16', '4 1/8'],
    correctAnswer: 0,
    explanation: '1 + 2 = 3 egész. 3/8 + 5/8 = 8/8 = 1 egész. Összesen: 3 + 1 = 4 egész.',
    hint: '1 3/8 + 2 5/8 = 3 8/8. Mennyi 3 egész és még 8/8 (ami 1 egész)?',
    breakdown: [
      { label: 'Összeg', value: '(1+2) + (3/8+5/8) = 3 + 8/8' },
      { label: 'Egész számként', value: '3 + 1 = 4' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Egy kerékpártúrán Péter a táv 2/7 részét tette meg, Anna a táv 3/7 részét. A teljes túratáv mekkora része van még hátra?',
    options: ['2/7 része', '5/7 része', '1/7 része', '3/7 része'],
    correctAnswer: 0,
    explanation: 'Együtt megtettek: 2/7 + 3/7 = 5/7 részt. Hátravan: 1 - 5/7 = 7/7 - 5/7 = 2/7 része a távnak.',
    hint: 'Összesen megtett út: 2/7 + 3/7 = 5/7. A teljes út 7/7.',
    breakdown: [
      { label: 'Megtett rész', value: '2/7 + 3/7 = 5/7' },
      { label: 'Hátralévő rész', value: '1 - 5/7 = 2/7' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Mennyi az 5 1/6 - 2 5/6 kivonás eredménye a legegyszerűbb vegyes tört alakban?',
    options: ['2 1/3', '2 2/6', '3 4/6', '2 4/6'],
    correctAnswer: 0,
    explanation: 'Felbontás: 5 1/6 = 4 7/6. Kivonás: 4 7/6 - 2 5/6 = 2 2/6. 2-vel egyszerűsítve: 2 1/3.',
    hint: '5 1/6 = 4 7/6. 4 7/6 - 2 5/6 = 2 2/6. Egyszerűsítsd 2-vel a törtrészt!',
    breakdown: [
      { label: 'Kölcsönkérés', value: '5 1/6 = 4 7/6' },
      { label: 'Kivonás', value: '4 7/6 - 2 5/6 = 2 2/6' },
      { label: 'Egyszerűsítés', value: '2 2/6 = 2 1/3' }
    ]
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'add-rule',
    title: 'Összeadás szabálya',
    icon: <Plus className="w-5 h-5 text-emerald-500" />,
    formula: 'a/c + b/c = (a + b)/c',
    note: 'A számlálókat összeadjuk, a nevező változatlan marad! Pl. 2/5 + 1/5 = 3/5.'
  },
  {
    id: 'sub-rule',
    title: 'Kivonás szabálya',
    icon: <Minus className="w-5 h-5 text-blue-500" />,
    formula: 'a/c - b/c = (a - b)/c',
    note: 'A számlálókat kivonjuk, a nevező változatlan marad! Pl. 7/9 - 4/9 = 3/9 = 1/3.'
  },
  {
    id: 'whole-rule',
    title: 'Kivonás egészből',
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    formula: '1 - a/b = b/b - a/b',
    note: 'Pl. 1 - 3/5 = 5/5 - 3/5 = 2/5 és 3 - 2/7 = 2 7/7 - 2/7 = 2 5/7.'
  },
  {
    id: 'mixed-rule',
    title: 'Vegyes törtek műveletei',
    icon: <Layers className="w-5 h-5 text-purple-500" />,
    formula: 'Egész az egészhez, tört a törthöz',
    note: 'Pl. 1 2/5 + 2 1/5 = 3 3/5. Átlépésnél: 2 4/5 + 1 3/5 = 3 7/5 = 4 2/5.'
  }
];

export const FractionsSameDenomQuiz: React.FC<FractionsSameDenomQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Egyenlő nevezőjű törtek összeadása és kivonása kvíz"
      subtitle="Teszteld a tudásodat az azonos nevezőjű törtek műveleteiről, az egyszerűsítésről és a vegyes törtekről 30 feladaton keresztül!"
      badge="➕ 5. Osztály • II. Törtek, tizedes törtek"
      topicId="g5-fractions-same-denom-quiz"
      documentId="fractions-same-denom-quiz-doc"
      pdfFilename="5_osztaly_egyenlo_nevezeju_tortek_osszeadasa_kivonasa_kviz.pdf"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="amber"
      renderMatcher={({ onBack: mbBack, onSwitchToQuiz: mbQuiz, onSwitchToSorter: mbSorter, onSwitchToTheory: mbTheory, level: mbLevel, onNextLevel: mbNext, onOpenRules: mbRules }) => (
        <FractionsSameDenomMatcher
          level={mbLevel}
          onNextLevel={mbNext}
          onOpenRules={mbRules}
          onBack={mbBack}
          onSwitchToQuiz={mbQuiz}
          onSwitchToSorter={mbSorter}
          onSwitchToTheory={mbTheory}
        />
      )}
      renderSorter={({ onBack: sbBack, onSwitchToQuiz: sbQuiz, onSwitchToMatcher: sbMatcher, onSwitchToTheory: sbTheory, level: sbLevel, onNextLevel: sbNext, onOpenRules: sbRules }) => (
        <FractionsSameDenomSorter
          level={sbLevel}
          onNextLevel={sbNext}
          onOpenRules={sbRules}
          onBack={sbBack}
          onSwitchToQuiz={sbQuiz}
          onSwitchToMatcher={sbMatcher}
          onSwitchToTheory={sbTheory}
        />
      )}
    />
  );
};

export default FractionsSameDenomQuiz;
