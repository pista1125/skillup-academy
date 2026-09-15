import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { RomanNumeralsMatcher } from './RomanNumeralsMatcher';
import { RomanNumeralsSorter } from './RomanNumeralsSorter';

export interface RomanNumeralsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: ALAPOK (1–20 KÖZÖTT) ---
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Melyik római számjegy jelöli az 5-öt?',
    options: ['V', 'I', 'X', 'L'],
    correctAnswer: 0,
    explanation: 'Az 5-ös szám római segédjele a V.',
    hint: 'A latin „quinque” (öt) szóból ered, a kéz 5 ujjának V-alakjára emlékeztet.',
    breakdown: [
      { label: '5', value: 'V' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Melyik arab számnak felel meg a VIII római szám?',
    options: ['8', '7', '9', '13'],
    correctAnswer: 0,
    explanation: 'VIII = 5 (V) + 1 + 1 + 1 (III) = 8. (Összeadás elve: a kisebb jel a nagyobb után áll).',
    hint: 'Bontsd fel: V (5) és utána három darab I (1+1+1).',
    breakdown: [
      { label: 'V', value: '5' },
      { label: 'III', value: '+ 3' },
      { label: 'Összesen', value: '8' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Hogyan írjuk le római számmal a 4-et?',
    options: ['IV', 'IIII', 'VI', 'V'],
    correctAnswer: 0,
    explanation: 'A 4-et kivonással képezzük: 5 - 1 = IV. Az I jel nem ismétlődhet négyszer egymás mellett!',
    hint: 'Az 5-ből (V) vonunk ki 1-et (I), ezért az I a V elé kerül.',
    breakdown: [
      { label: '5 - 1', value: 'IV' },
      { label: 'Szabály', value: 'IIII nem szabályos!' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik arab számot jelöli a IX római szám?',
    options: ['9', '11', '8', '19'],
    correctAnswer: 0,
    explanation: 'IX = 10 - 1 = 9. A kisebb jel (I) a nagyobb (X) előtt áll, tehát kivonást jelent.',
    hint: 'A 10 (X) előtt áll az 1 (I): 10-ből 1.',
    breakdown: [
      { label: '10 - 1', value: '9' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Hogyan írjuk le római számmal a 14-et?',
    options: ['XIV', 'XIIII', 'VIV', 'XVI'],
    correctAnswer: 0,
    explanation: '14 = 10 + 4. A 10 = X, a 4 = IV, tehát összetéve: XIV.',
    hint: 'Bontsd tízesekre és egyesekre: 10 + 4.',
    breakdown: [
      { label: '10', value: 'X' },
      { label: '4', value: 'IV' },
      { label: '14', value: 'XIV' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Melyik arab számnak felel meg a XIX római szám?',
    options: ['19', '18', '21', '99'],
    correctAnswer: 0,
    explanation: 'XIX = 10 (X) + 9 (IX) = 19.',
    hint: '10 (X) és a 9 (IX) összege.',
    breakdown: [
      { label: 'X', value: '10' },
      { label: 'IX', value: '+ 9' },
      { label: 'Összesen', value: '19' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyik alapjel ismétlődhet egymás mellett legfeljebb 3-szor?',
    options: ['I, X és C', 'Csak az I', 'V és L', 'Bármelyik római számjegy'],
    correctAnswer: 0,
    explanation: 'Az alapjelek (I, X, C, M) ismétlődhetnek legfeljebb 3-szor. A segédjelek (V, L, D) soha nem ismétlődhetnek!',
    hint: 'A 10 hatványait jelentő jelek (1, 10, 100) az alapjelek.',
    breakdown: [
      { label: 'Alapjelek (max 3×)', value: 'I, X, C' },
      { label: 'Segédjelek (sosem)', value: 'V, L' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Hogyan írjuk le a 16-ot római számmal?',
    options: ['XVI', 'XIV', 'XIIIIII', 'XIX'],
    correctAnswer: 0,
    explanation: '16 = 10 + 5 + 1 → X + V + I = XVI.',
    hint: '10 (X) + 6 (VI).',
    breakdown: [
      { label: '10', value: 'X' },
      { label: '6', value: 'VI' },
      { label: '16', value: 'XVI' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Melyik arab számnak felel meg a XII római szám?',
    options: ['12', '11', '13', '7'],
    correctAnswer: 0,
    explanation: 'XII = 10 (X) + 1 + 1 (II) = 12.',
    hint: '10 + 2.',
    breakdown: [
      { label: 'X', value: '10' },
      { label: 'II', value: '+ 2' },
      { label: '12', value: 'XII' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Hogyan írjuk le a 20-at római számmal?',
    options: ['XX', 'VV', 'LL', 'XIIII'],
    correctAnswer: 0,
    explanation: '20 = 10 + 10 → XX. (A VV hibás, mert a V segédjel sosem ismétlődhet!)',
    hint: 'Két darab 10-es alapjel (X + X).',
    breakdown: [
      { label: '10 + 10', value: 'XX' },
      { label: 'Csapda', value: 'VV nem megengedett!' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (21–50 KÖZÖTT) ---
  // ==========================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Hogyan írjuk fel római számmal a 24-et?',
    options: ['XXIV', 'XXIIII', 'XXVI', 'XIV'],
    correctAnswer: 0,
    explanation: '24 = 20 + 4 → XX + IV = XXIV.',
    hint: '20 = XX, a 4 = IV (5 - 1).',
    breakdown: [
      { label: '20', value: 'XX' },
      { label: '4', value: 'IV' },
      { label: '24', value: 'XXIV' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Melyik arab számnak felel meg a XXIX római szám?',
    options: ['29', '31', '19', '39'],
    correctAnswer: 0,
    explanation: 'XXIX = 20 (XX) + 9 (IX) = 29.',
    hint: 'XX (20) és IX (9) összege.',
    breakdown: [
      { label: 'XX', value: '20' },
      { label: 'IX', value: '+ 9' },
      { label: 'Összesen', value: '29' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Hogyan írjuk fel a 40-et római számmal?',
    options: ['XL', 'XXXX', 'L', 'VL'],
    correctAnswer: 0,
    explanation: '40 = 50 - 10 → XL. Az X alapjel nem állhat 4-szer egymás mellett!',
    hint: '50-ből (L) vonunk ki 10-et (X): XL.',
    breakdown: [
      { label: '50 - 10', value: 'XL' },
      { label: 'Szabály', value: 'XXXX hibás!' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Melyik arab számot jelöli a XLIV római szám?',
    options: ['44', '46', '64', '34'],
    correctAnswer: 0,
    explanation: 'XLIV = 40 (XL) + 4 (IV) = 44.',
    hint: 'XL jelentése 40, IV jelentése 4.',
    breakdown: [
      { label: 'XL', value: '40' },
      { label: 'IV', value: '+ 4' },
      { label: 'Összesen', value: '44' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hogyan írjuk le helyesen a 49-et római számmal?',
    options: ['XLIX', 'IL', 'XXXXIX', 'LIX'],
    correctAnswer: 0,
    explanation: '49 = 40 + 9 → XL (40) + IX (9) = XLIX. Az IL hibás, mert 50-ből nem vonunk ki 1-et közvetlenül!',
    hint: 'Helyiértékes bontás: 40 + 9. A 40 = XL, a 9 = IX.',
    breakdown: [
      { label: '40', value: 'XL' },
      { label: '9', value: 'IX' },
      { label: 'Helyes', value: 'XLIX' },
      { label: 'Hibás tévhit', value: 'IL' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik római számjegy értéke pontosan 50?',
    options: ['L', 'C', 'X', 'D'],
    correctAnswer: 0,
    explanation: 'Az 50-es szám római segédjele az L (latin „quinquaginta”).',
    hint: 'V = 5, X = 10, L = 50, C = 100.',
    breakdown: [
      { label: '50', value: 'L' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Melyik arab számnak felel meg a XXXVII római szám?',
    options: ['37', '38', '27', '47'],
    correctAnswer: 0,
    explanation: 'XXXVII = 30 (XXX) + 5 (V) + 2 (II) = 37.',
    hint: '30 + 7.',
    breakdown: [
      { label: 'XXX', value: '30' },
      { label: 'VII', value: '+ 7' },
      { label: 'Összesen', value: '37' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Hogyan írjuk fel római számmal a 45-öt?',
    options: ['XLV', 'VL', 'XXXXV', 'LV'],
    correctAnswer: 0,
    explanation: '45 = 40 + 5 → XL + V = XLV. A VL hibás, mert V-ből nem vonunk ki!',
    hint: '40 = XL, hozzáadunk 5-öt: XLV.',
    breakdown: [
      { label: '40', value: 'XL' },
      { label: '5', value: 'V' },
      { label: '45', value: 'XLV' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Melyik arab számnak felel meg a XLVIII római szám?',
    options: ['48', '58', '38', '43'],
    correctAnswer: 0,
    explanation: 'XLVIII = 40 (XL) + 8 (VIII) = 48.',
    hint: 'XL (40) és VIII (8) összege.',
    breakdown: [
      { label: 'XL', value: '40' },
      { label: 'VIII', value: '+ 8' },
      { label: '48', value: 'XLVIII' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Miért hibás a VV felírás a 10 helyett?',
    options: [
      'Mert a V segédjel nem ismétlődhet, a 10-nek van saját alapjele (X)',
      'Mert a római számírásban nincs összeadás',
      'Mert a V értéke nem 5, hanem 50',
      'Mert VV a 15-öt jelenti'
    ],
    correctAnswer: 0,
    explanation: 'A segédjelek (V = 5, L = 50) soha nem ismétlődhetnek, mert 2×5-re létezik az X (10) alapjel.',
    hint: 'A segédjelek szabálya: soha nem duplázzuk őket.',
    breakdown: [
      { label: 'Szabály', value: 'V és L sosem ismétlődik' },
      { label: 'Helyes 10', value: 'X' }
    ]
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (51–100 KÖZÖTT & TRÜKKÖS) ---
  // ==========================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Hogyan írjuk fel római számmal a 90-et?',
    options: ['XC', 'LXXXX', 'IC', 'C'],
    correctAnswer: 0,
    explanation: '90 = 100 - 10 → XC. Az X alapjel a nála nagyobb C (100) előtt áll, tehát kivonást jelent.',
    hint: '100-ból (C) vonunk ki 10-et (X).',
    breakdown: [
      { label: '100 - 10', value: 'XC' },
      { label: 'LXXXX', value: 'Nem szabályos (4 db X)!' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Hogyan írjuk le helyesen a 99-et római számmal?',
    options: ['XCIX', 'IC', 'LXXXXIX', 'CIX'],
    correctAnswer: 0,
    explanation: '99 = 90 + 9 → XC (90) + IX (9) = XCIX. Az IC hibás csapda, mert 100-ból közvetlenül nem vonunk ki 1-et!',
    hint: 'Helyiértékes bontás: 90 = XC, 9 = IX. Összetéve: XCIX.',
    breakdown: [
      { label: '90', value: 'XC' },
      { label: '9', value: 'IX' },
      { label: '99', value: 'XCIX' },
      { label: 'Gyakori hiba', value: 'IC (szabálytalan)' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik arab számot jelöli a LXXIV római szám?',
    options: ['74', '64', '84', '76'],
    correctAnswer: 0,
    explanation: 'LXXIV = 50 + 20 (LXX = 70) + 4 (IV) = 74.',
    hint: 'L (50) + XX (20) = 70, utána jön a IV (4).',
    breakdown: [
      { label: 'LXX', value: '70' },
      { label: 'IV', value: '+ 4' },
      { label: 'Összesen', value: '74' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Melyik arab számnak felel meg a LXXXIX római szám?',
    options: ['89', '79', '99', '84'],
    correctAnswer: 0,
    explanation: 'LXXXIX = 50 + 30 (LXXX = 80) + 9 (IX) = 89.',
    hint: '80 (LXXX) + 9 (IX).',
    breakdown: [
      { label: 'LXXX', value: '80' },
      { label: 'IX', value: '+ 9' },
      { label: '89', value: 'LXXXIX' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Hogyan írjuk fel római számmal a 94-et?',
    options: ['XCIV', 'LXXXXIV', 'CXIV', 'XCVI'],
    correctAnswer: 0,
    explanation: '94 = 90 + 4 → XC (90) + IV (4) = XCIV.',
    hint: '90 = XC, 4 = IV.',
    breakdown: [
      { label: '90', value: 'XC' },
      { label: '4', value: 'IV' },
      { label: '94', value: 'XCIV' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Melyik az egyetlen 100-as értékű alapjel a latin ábécében?',
    options: ['C', 'L', 'M', 'X'],
    correctAnswer: 0,
    explanation: 'A 100 római száma a C (latin „centum” = száz).',
    hint: 'Gondolj a „centiméter” vagy „centenárium” szavakra!',
    breakdown: [
      { label: '100', value: 'C (centum)' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Melyik állítás IGAZ a római számírásra?',
    options: [
      'Nem volt benne 0 (nulla) számjegy és nem helyiértékes rendszer volt',
      'Tartalmazott tizedesvesszőt és törteket',
      'Minden számjegy pontosan 4-szer ismétlődhetett',
      'Helyiértékes rendszer volt, mint a mai tízes számrendszer'
    ],
    correctAnswer: 0,
    explanation: 'A római számírás additív (összeadó-kivonó) elvű volt, és nem ismerték a 0 fogalmát.',
    hint: 'Gondold végig: volt-e jelük a semmire/nullára?',
    breakdown: [
      { label: 'Jellemző 1', value: 'Nincs 0 (nulla)' },
      { label: 'Jellemző 2', value: 'Nem helyiértékes (additív/szubtraktív)' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Melyik arab számnak felel meg a LXIX római szám?',
    options: ['69', '59', '79', '64'],
    correctAnswer: 0,
    explanation: 'LXIX = 50 + 10 (LX = 60) + 9 (IX) = 69.',
    hint: '60 (LX) + 9 (IX).',
    breakdown: [
      { label: 'LX', value: '60' },
      { label: 'IX', value: '+ 9' },
      { label: 'Összesen', value: '69' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hogyan írjuk fel a 84-et római számmal?',
    options: ['LXXXIV', 'LXXXIIII', 'XCIV', 'LXXIV'],
    correctAnswer: 0,
    explanation: '84 = 80 + 4 → LXXX (50+30) + IV (4) = LXXXIV.',
    hint: '80 (LXXX) + 4 (IV).',
    breakdown: [
      { label: '80', value: 'LXXX' },
      { label: '4', value: 'IV' },
      { label: '84', value: 'LXXXIV' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Melyik felírás HIBÁS az alábbiak közül?',
    options: ['LC (50)', 'XL (40)', 'XC (90)', 'IV (4)'],
    correctAnswer: 0,
    explanation: 'Az LC hibás, mert az L segédjelből nem vonunk ki (és a C-ből 50-et nem L kivonásával képezünk, az 50-re az L alapból létezik).',
    hint: 'Kivonni csak alapjelet szabad (I, X) a közvetlenül utána következő jelekből.',
    breakdown: [
      { label: 'Hibás', value: 'LC (segédjel nem állhat C előtt kivonásként)' },
      { label: 'Szabályos 50', value: 'L' }
    ]
  }
];

export const RomanNumeralsQuiz: React.FC<RomanNumeralsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A számok kialakulása, a római számok – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alapjelek, segédjelek, összeadás-kivonás elve és 1–100 közötti felírások"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-roman-numerals-quiz"
      pdfFilename="5_osztaly_romai_szamok_kviz.pdf"
      badgeText="🏛️ 5. Osztály • I. Az egész számok"
      badgeColor="amber"
      matcherComponent={<RomanNumeralsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<RomanNumeralsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheets={[
        {
          title: "Alapjelek és Segédjelek",
          items: [
            "Alapjelek (max 3× ismételhető): I = 1, X = 10, C = 100",
            "Segédjelek (sosem ismételhető): V = 5, L = 50",
            "Nincs 0 (nulla) számjegy!"
          ]
        },
        {
          title: "Számolási Szabályok",
          items: [
            "Összeadás: Kisebb jel a nagyobb után (VI = 5 + 1 = 6, XV = 15)",
            "Kivonás: Kisebb jel a nagyobb előtt (IV = 4, IX = 9, XL = 40, XC = 90)",
            "Helyiértékes bontás: 49 = 40 + 9 → XLIX (nem IL!), 99 = 90 + 9 → XCIX (nem IC!)"
          ]
        },
        {
          title: "Gyakori Számok (1–100)",
          items: [
            "1-10: I, II, III, IV, V, VI, VII, VIII, IX, X",
            "Kerek tízesek: X (10), XX (20), XXX (30), XL (40), L (50), LX (60), LXX (70), LXXX (80), XC (90), C (100)",
            "Trükkös számok: 44 = XLIV, 49 = XLIX, 94 = XCIV, 99 = XCIX"
          ]
        }
      ]}
    />
  );
};

export default RomanNumeralsQuiz;
