import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { BoxPlotMatcher } from './BoxPlotMatcher';
import { BoxPlotSorter } from './BoxPlotSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

type Five = [number, number, number, number, number];

interface BoxRow {
  label?: string;
  five: Five;
  outliers?: number[];
  boxOnly?: boolean;
  color?: string;
}

/** Kis vízszintes dobozdiagram (egy vagy több sor) számegyenessel. */
const MiniBox: React.FC<{
  rows: BoxRow[];
  from: number;
  to: number;
  step: number;
  labelEvery?: number;
  caption?: string;
  extra?: (sx: (v: number) => number, rowY: (i: number) => number) => React.ReactNode;
}> = ({ rows, from, to, step, labelEvery = 1, caption, extra }) => {
  const x0 = 28;
  const x1 = 222;
  const sx = (v: number) => x0 + ((v - from) / (to - from)) * (x1 - x0);
  const top = caption ? 30 : 18;
  const rowY = (i: number) => top + 18 + i * 44;
  const axisY = rowY(rows.length - 1) + 32;
  const H = axisY + 26;
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(Math.round(v * 1000) / 1000);
  return (
    <svg viewBox={`0 0 240 ${H}`} className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height={H - 4} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {caption && (
        <text x="120" y="20" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
      {rows.map((r, i) => {
        const y = rowY(i);
        const c = r.color ?? '#0369a1';
        const [mn, q1, me, q3, mx] = r.five;
        return (
          <g key={i}>
            {r.label && (
              <text x="14" y={y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill={c}>
                {r.label}
              </text>
            )}
            {!r.boxOnly && (
              <>
                <line x1={sx(mn)} y1={y} x2={sx(q1)} y2={y} stroke={c} strokeWidth="1.6" />
                <line x1={sx(q3)} y1={y} x2={sx(mx)} y2={y} stroke={c} strokeWidth="1.6" />
                <line x1={sx(mn)} y1={y - 7} x2={sx(mn)} y2={y + 7} stroke={c} strokeWidth="1.6" />
                <line x1={sx(mx)} y1={y - 7} x2={sx(mx)} y2={y + 7} stroke={c} strokeWidth="1.6" />
              </>
            )}
            <rect x={sx(q1)} y={y - 13} width={sx(q3) - sx(q1)} height="26" fill="#e0f2fe" stroke={c} strokeWidth="1.6" rx="2" />
            <line x1={sx(me)} y1={y - 13} x2={sx(me)} y2={y + 13} stroke="#be123c" strokeWidth="2.2" />
            {(r.outliers ?? []).map((o, k) => (
              <circle key={k} cx={sx(o)} cy={y} r="3.5" fill="#fda4af" stroke="#be123c" />
            ))}
            {ticks.map((v) => (
              <line key={v} x1={sx(v)} y1={y + 18} x2={sx(v)} y2={axisY} stroke="#e2e8f0" strokeWidth="0.8" />
            ))}
          </g>
        );
      })}
      <line x1={x0 - 4} y1={axisY} x2={x1 + 6} y2={axisY} stroke="#475569" strokeWidth="1.2" />
      {ticks.map((v, i) => (
        <g key={v}>
          <line x1={sx(v)} y1={axisY - 3} x2={sx(v)} y2={axisY + 3} stroke="#475569" />
          {i % labelEvery === 0 && (
            <text x={sx(v)} y={axisY + 14} fontSize="8.5" textAnchor="middle" fill="#334155">
              {String(v).replace('.', ',')}
            </text>
          )}
        </g>
      ))}
      {extra && extra(sx, rowY)}
    </svg>
  );
};

const BOX_PLOT_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'bp-q1',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    question: 'Olvasd le a dobozdiagramról: mennyi az adatsokaság mediánja?',
    figure: <MiniBox rows={[{ five: [10, 14, 20, 26, 34] }]} from={10} to={34} step={2} />,
    options: ['20', '14', '26', '22'],
    correctAnswer: 0,
    explanation: 'A medián a dobozon belüli (piros) vonal helye: 20. A 14 és a 26 a doboz két széle (Q₁ és Q₃), a 22 pedig a terjedelem középpontja lenne.'
  },
  {
    id: 'bp-q2',
    level: 1,
    questionTypeBadge: 'Félterjedelem',
    question: 'Mennyi a dobozdiagrammal ábrázolt adatsokaság félterjedelme?',
    figure: <MiniBox rows={[{ five: [12, 16, 22, 28, 32] }]} from={10} to={34} step={2} />,
    options: ['12', '20', '10', '6'],
    correctAnswer: 0,
    explanation: 'Félterjedelem = Q₃ − Q₁ = 28 − 16 = 12 (a doboz szélessége). A 20 a terjedelem (32 − 12), a 10 a terjedelem fele.'
  },
  {
    id: 'bp-q3',
    level: 1,
    questionTypeBadge: 'Terjedelem',
    question: 'Mennyi a dobozdiagrammal ábrázolt adatsokaság terjedelme?',
    figure: <MiniBox rows={[{ five: [5, 18, 38, 46, 80] }]} from={0} to={80} step={10} />,
    options: ['75', '28', '80', '62'],
    correctAnswer: 0,
    explanation: 'Terjedelem = maximum − minimum = 80 − 5 = 75. A 28 a félterjedelem (46 − 18), a 80 maga a maximum.'
  },
  {
    id: 'bp-q4',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mi az alsó kvartilis (Q₁)?',
    options: [
      'az a szám, amelynél az adatoknak (közelítőleg) a negyede kisebb vagy egyenlő',
      'az a szám, amelynél az adatoknak (közelítőleg) a fele kisebb vagy egyenlő',
      'az adatok legkisebb eleme',
      'a legkisebb és a legnagyobb adat átlaga'
    ],
    correctAnswer: 0,
    explanation: 'Az alsó kvartilis az adatok alsó negyedének határa; a medián a felezőpont, a legkisebb elem a minimum (Q₀).'
  },
  {
    id: 'bp-q5',
    level: 1,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Melyik mutatót jelöli a doboz bal széle (a „?”-lel jelölt hely)?',
    figure: (
      <MiniBox
        rows={[{ five: [2, 6, 9, 13, 18] }]}
        from={0}
        to={20}
        step={2}
        extra={(sx, rowY) => (
          <g>
            <polygon points={`${sx(6) - 4},${rowY(0) - 20} ${sx(6) + 4},${rowY(0) - 20} ${sx(6)},${rowY(0) - 14}`} fill="#7c3aed" />
            <text x={sx(6)} y={rowY(0) - 22} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#7c3aed">
              ?
            </text>
          </g>
        )}
      />
    ),
    options: ['az alsó kvartilis (Q₁)', 'a minimum (Q₀)', 'a medián (Q₂)', 'a felső kvartilis (Q₃)'],
    correctAnswer: 0,
    explanation: 'A doboz két széle az alsó és a felső kvartilisnél van, a bal szél tehát Q₁. A minimum a bal oldali vonal vége, a medián a dobozon belüli vonal.'
  },
  {
    id: 'bp-q6',
    level: 1,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Az adatoknak körülbelül hány százaléka esik a dobozba (Q₁ és Q₃ közé)?',
    figure: (
      <MiniBox
        rows={[{ five: [2, 6, 9, 13, 18] }]}
        from={0}
        to={20}
        step={2}
        extra={(sx, rowY) => (
          <text x={(sx(6) + sx(13)) / 2} y={rowY(0) - 17} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#7c3aed">
            ? %
          </text>
        )}
      />
    ),
    options: ['kb. 50%', 'kb. 25%', 'kb. 75%', 'kb. 100%'],
    correctAnswer: 0,
    explanation: 'Q₁ alatt kb. 25%, Q₃ felett kb. 25% van, így a dobozba (a félterjedelem sávjába) az adatok kb. 50%-a esik.'
  },
  {
    id: 'bp-q7',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi az 1, 2, 3, 3, 4, 5, 6, 6 adatsokaság mediánja?',
    options: ['3,5', '3', '4', '4,5'],
    correctAnswer: 0,
    explanation: '8 adat (páros): a medián a 4. és 5. elem átlaga, (3 + 4) / 2 = 3,5.'
  },
  {
    id: 'bp-q8',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12 adatsokaság mediánja?',
    options: ['8', '7', '7,5', '10'],
    correctAnswer: 0,
    explanation: '11 adat (páratlan): a medián a középső, 6. elem, ami a második nyolcas: 8.'
  },
  {
    id: 'bp-q9',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'A negyedelés határait Q₀, Q₁, Q₂, Q₃, Q₄ jelöli. Mit jelöl Q₂?',
    options: ['a mediánt', 'a maximumot', 'az alsó kvartilist', 'a félterjedelmet'],
    correctAnswer: 0,
    explanation: 'Q₀ a minimum, Q₁ az alsó kvartilis, Q₂ a medián, Q₃ a felső kvartilis, Q₄ a maximum.'
  },
  {
    id: 'bp-q10',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Melyik a dobozdiagram másik neve?',
    options: ['sodrófadiagram (box-plot diagram)', 'kördiagram', 'hisztogram', 'pontdiagram'],
    correctAnswer: 0,
    explanation: 'A dobozdiagramot box-plot diagramnak vagy sodrófadiagramnak is nevezik.'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'bp-q11',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi az 1, 2, 3, 3, 4, 5, 5, 6, 6 adatsokaság alsó kvartilise?',
    options: ['2,5', '2', '3', '2,75'],
    correctAnswer: 0,
    explanation: '9 adat (páratlan): a medián (4) a középső elem, ezt elhagyjuk. Az alsó fél 1, 2, 3, 3, ennek mediánja (2 + 3) / 2 = 2,5.'
  },
  {
    id: 'bp-q12',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi az 1, 2, 3, 3, 4, 5, 5, 6, 6, 7 adatsokaság felső kvartilise?',
    options: ['6', '5,5', '5', '6,5'],
    correctAnswer: 0,
    explanation: '10 adat (páros): a mediánnal két 5 elemű félre bontjuk. A felső fél 5, 5, 6, 6, 7, ennek mediánja 6.'
  },
  {
    id: 'bp-q13',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question:
      'A válogatott sebességei (km/h) a felső kvartilis (30,8) felett: 31,3; 31,5; 31,5; 33,8. A „Villám” kategóriába a felső kvartilisnél gyorsabbak kerülnek. Hány játékos kap biztosan „Villám” minősítést a 18 közül?',
    options: ['4', '5', '3', '9'],
    correctAnswer: 0,
    explanation: 'A 30,8 km/h-nál gyorsabbak: Szalai Attila (31,3), Botka (31,5), Fiola (31,5) és Nego (33,8) – 4 játékos. A határon lévő Kleinheisler (30,8) besorolása a programtól függ.'
  },
  {
    id: 'bp-q14',
    level: 2,
    questionTypeBadge: 'Medián',
    question: 'A 18 játékos rendezett sebességei közül a 9. elem 28,8 km/h, a 10. elem 29,0 km/h. Mennyi a medián?',
    options: ['28,9 km/h', '28,8 km/h', '29,0 km/h', '28,1 km/h'],
    correctAnswer: 0,
    explanation: 'Páros elemszámnál a medián a két középső elem átlaga: (28,8 + 29,0) / 2 = 28,9 km/h.'
  },
  {
    id: 'bp-q15',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'A 18 rendezett sebesség alsó fele: 19,0; 23,8; 25,0; 25,6; 26,1; 26,3; 27,4; 28,1; 28,8. Mennyi az alsó kvartilis?',
    options: ['26,1 km/h', '25,6 km/h', '25,85 km/h', '26,3 km/h'],
    correctAnswer: 0,
    explanation: 'Az alsó fél 9 elemű, ennek mediánja az 5. elem: 26,1 km/h. Ez a „Közepes” kategória alsó határa.'
  },
  {
    id: 'bp-q16',
    level: 2,
    questionTypeBadge: 'Gyakoriság',
    question: 'Adatok gyakorisággal: 4 (1-szer), 5 (2-szer), 7 (1-szer), 8 (4-szer), 10 (2-szer), 12 (1-szer). Mennyi a felső kvartilis?',
    options: ['10', '8', '9', '11'],
    correctAnswer: 0,
    explanation: 'Felsorolva: 4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12 (11 adat). A medián a 6. elem (8); a mögötte álló 8, 8, 10, 10, 12 mediánja Q₃ = 10.'
  },
  {
    id: 'bp-q17',
    level: 2,
    questionTypeBadge: 'Félterjedelem',
    question: 'Mennyi a 3, 7, 8, 12, 15, 18, 20 adatsokaság félterjedelme?',
    options: ['11', '17', '8,5', '9'],
    correctAnswer: 0,
    explanation: 'Medián: 12 (4. elem). Alsó fél: 3, 7, 8 → Q₁ = 7; felső fél: 15, 18, 20 → Q₃ = 18. Félterjedelem: 18 − 7 = 11. (A 17 a terjedelem, a 8,5 annak fele.)'
  },
  {
    id: 'bp-q18',
    level: 2,
    questionTypeBadge: 'Kiugró adat',
    question: 'Az ábrán látható doboz szerint Q₁ = 20 és Q₃ = 30. Legalább mekkora adat számít felfelé kiugró adatnak?',
    figure: <MiniBox rows={[{ five: [20, 20, 24, 30, 30], boxOnly: true }]} from={0} to={60} step={10} />,
    options: ['45', '40', '35', '60'],
    correctAnswer: 0,
    explanation: 'Félterjedelem: 30 − 20 = 10, másfélszerese 15. Felfelé kiugró az, ami legalább 30 + 15 = 45.'
  },
  {
    id: 'bp-q19',
    level: 2,
    questionTypeBadge: 'Kiugró adat',
    question: 'Egy adatsokaság alsó kvartilise 12, felső kvartilise 18 (lásd a dobozt). Az alábbi számok közül melyik számítana kiugró adatnak?',
    figure: <MiniBox rows={[{ five: [12, 12, 15, 18, 18], boxOnly: true }]} from={0} to={30} step={2} labelEvery={2} />,
    options: ['2', '4', '25', '26'],
    correctAnswer: 0,
    explanation: 'Félterjedelem: 6, másfélszerese 9. Kiugró: legfeljebb 12 − 9 = 3, vagy legalább 18 + 9 = 27. Csak a 2 ilyen.'
  },
  {
    id: 'bp-q20',
    level: 2,
    questionTypeBadge: 'Csapda',
    question: 'Igaz-e, hogy a félterjedelem mindig a terjedelem fele?',
    options: [
      'Nem; a félterjedelem Q₃ − Q₁, ami rendszerint nem egyenlő a terjedelem felével',
      'Igen, a nevéből következik',
      'Igen, de csak páros elemszám esetén',
      'Nem, a félterjedelem mindig nagyobb a terjedelem felénél'
    ],
    correctAnswer: 0,
    explanation: 'A félterjedelem a középső kb. 50% terjedelme (Q₃ − Q₁). Pl. 5, 18, 38, 46, 80 esetén a terjedelem 75, a félterjedelem 28 (nem 37,5). Lehet a terjedelem felénél kisebb és nagyobb is.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'bp-q21',
    level: 3,
    questionTypeBadge: 'Medián',
    question: 'A Rubik-kocka-döntőben 44 eredmény született. Hányadik elemekből számoljuk a nagyság szerint rendezett adatok mediánját?',
    options: ['a 22. és a 23. elem átlaga', 'a 22. elem', 'a 23. elem', 'a 21. és a 22. elem átlaga'],
    correctAnswer: 0,
    explanation: '44 páros, ezért a medián a két középső, a 22. és 23. elem átlaga (előttük 21, utánuk 21 elem áll).'
  },
  {
    id: 'bp-q22',
    level: 3,
    questionTypeBadge: 'Kvartilis',
    question: 'A 44 rendezett adat alsó kvartilise hányadik elemekből adódik?',
    options: ['a 11. és a 12. elem átlaga', 'a 11. elem', 'a 12. és a 13. elem átlaga', 'a 22. elem fele'],
    correctAnswer: 0,
    explanation: 'Az alsó „fél” az első 22 elem; ennek mediánja a 11. és 12. elem átlaga. (A felső kvartilis a 33. és 34. elem átlaga.)'
  },
  {
    id: 'bp-q23',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Az ábrán az A és B adatsokaság dobozdiagramja látható. Melyik adatsokaság terjedelme a nagyobb?',
    figure: (
      <MiniBox
        rows={[
          { label: 'A', five: [5, 10, 18, 25, 32] },
          { label: 'B', five: [8, 15, 22, 30, 40], color: '#b45309' }
        ]}
        from={0}
        to={40}
        step={5}
      />
    ),
    options: ['a B-é', 'az A-é', 'egyenlők', 'a diagramból nem dönthető el'],
    correctAnswer: 0,
    explanation: 'A: 32 − 5 = 27; B: 40 − 8 = 32. A B terjedelme a nagyobb.'
  },
  {
    id: 'bp-q24',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Ugyanezen a két dobozdiagramon melyik adatsokaság félterjedelme a nagyobb?',
    figure: (
      <MiniBox
        rows={[
          { label: 'A', five: [5, 10, 18, 25, 32] },
          { label: 'B', five: [8, 15, 22, 30, 40], color: '#b45309' }
        ]}
        from={0}
        to={40}
        step={5}
      />
    ),
    options: ['egyenlők', 'a B-é', 'az A-é', 'a diagramból nem dönthető el'],
    correctAnswer: 0,
    explanation: 'A: 25 − 10 = 15; B: 30 − 15 = 15. A két doboz ugyanolyan széles, a félterjedelmek egyenlők – csak a B dobozdiagram van eltolva.'
  },
  {
    id: 'bp-q25',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik adatsokaságban szerepelhet a 6?',
    figure: (
      <MiniBox
        rows={[
          { label: 'A', five: [5, 10, 18, 25, 32] },
          { label: 'B', five: [8, 15, 22, 30, 40], color: '#b45309' }
        ]}
        from={0}
        to={40}
        step={5}
      />
    ),
    options: ['csak az A-ban', 'csak a B-ben', 'mindkettőben', 'egyikben sem'],
    correctAnswer: 0,
    explanation: 'Az A minimuma 5, maximuma 32, így a 6 lehet benne. A B legkisebb eleme 8, abban nem szerepelhet a 6.'
  },
  {
    id: 'bp-q26',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'A dobozdiagram azt mutatja, hogy egy kiránduláson ki mennyi költőpénzt vitt (ezer Ft). Melyik állítás igaz biztosan?',
    figure: <MiniBox rows={[{ five: [1, 3, 6, 9, 15], color: '#047857' }]} from={0} to={16} step={1} labelEvery={2} caption="költőpénz (ezer Ft)" />,
    options: [
      'A gyerekek kb. felénél legfeljebb 6000 Ft volt.',
      'A gyerekek átlagosan 6000 Ft-ot vittek.',
      'A gyerekek 75%-ánál legalább 9000 Ft volt.',
      'Volt olyan gyerek, akinél pontosan 12 000 Ft volt.'
    ],
    correctAnswer: 0,
    explanation: 'A medián 6, tehát kb. a gyerekek fele legfeljebb 6000 Ft-ot vitt. Az átlag a diagramból nem olvasható le; 9000 Ft legalább csak kb. 25%-nál volt; azt, hogy volt-e pontosan 12 000 Ft, nem lehet eldönteni.'
  },
  {
    id: 'bp-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó adat',
    question: 'A dobozdiagram 7 adatból készült, de az egyik törlődött. A megmaradt adatok: 2, 4, 4, 9, 9, 12. Mi lehetett a hiányzó adat?',
    figure: <MiniBox rows={[{ five: [2, 4, 7, 9, 12] }]} from={0} to={14} step={1} labelEvery={2} />,
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: 'A diagram szerint a medián 7. 7 adat esetén a medián a 4. elem, és a meglévő adatok közül egyik sem 7, így a hiányzó adat a 7: 2, 4, 4, 7, 9, 9, 12 (Q₁ = 4, Q₃ = 9 is stimmel).'
  },
  {
    id: 'bp-q28',
    level: 3,
    questionTypeBadge: 'Adatsor keresése',
    question: 'Melyik adatsokaságból készülhetett ez a dobozdiagram?',
    figure: <MiniBox rows={[{ five: [1, 3, 5, 8, 10] }]} from={0} to={11} step={1} />,
    options: ['1, 3, 4, 5, 6, 8, 10', '1, 3, 5, 5, 8, 9, 10', '1, 2, 4, 5, 7, 9, 10', '1, 3, 3, 6, 7, 8, 10'],
    correctAnswer: 0,
    explanation: 'Az 1, 3, 4, 5, 6, 8, 10 esetén: medián 5; alsó fél 1, 3, 4 → Q₁ = 3; felső fél 6, 8, 10 → Q₃ = 8. A többinél: Q₃ = 9; Q₁ = 2 és Q₃ = 9; illetve medián 6.'
  },
  {
    id: 'bp-q29',
    level: 3,
    questionTypeBadge: 'Kiugró adat',
    question:
      'Adatok: 2, 10, 11, 12, 13, 14, 15, 16, 30 (Q₁ = 10,5; Q₃ = 15,5). A kiugró adatokat külön ponttal jelölve meddig tart a dobozból balra induló vonal?',
    options: ['10-ig', '2-ig', '3-ig', '10,5-ig'],
    correctAnswer: 0,
    explanation: 'Félterjedelem 5, másfélszerese 7,5; az alsó határ 10,5 − 7,5 = 3. A 2 kiugró adat, ezért a vonal a legkisebb nem kiugró adatig, a 10-ig tart.'
  },
  {
    id: 'bp-q30',
    level: 3,
    questionTypeBadge: 'Kiugró adat',
    question: 'A Rubik-döntő 44 eredményének dobozdiagramja: min = 21, Q₁ = 31, Me = 34, Q₃ = 40, max = 53. Van-e kiugró adat?',
    figure: <MiniBox rows={[{ five: [21, 31, 34, 40, 53], color: '#b45309' }]} from={20} to={55} step={5} />,
    options: ['Nincs, mert 31 − 13,5 < 21 és 53 < 40 + 13,5 = 53,5', 'Van, az 53', 'Van, a 21', 'Van, a 21 és az 53 is'],
    correctAnswer: 0,
    explanation: 'Félterjedelem: 40 − 31 = 9, másfélszerese 13,5. Határok: 17,5 és 53,5. A 21 és az 53 is a határokon belül van, így nincs kiugró adat.'
  }
];

export const BoxPlotQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-dobozdiagram-quiz"
      subtopicId="a-dobozdiagram"
      title="3. A dobozdiagram – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kvartilisek, terjedelem, félterjedelem, kiugró adatok, dobozdiagramok leolvasása és összehasonlítása."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={BOX_PLOT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kvartilisek',
          items: [
            'Rendezd növekvő sorrendbe az adatokat!',
            'páros n: a mediánnal kettéosztjuk',
            'páratlan n: a középső elemet elhagyjuk',
            'Q₁ az alsó, Q₃ a felső „fél” mediánja'
          ]
        },
        {
          title: 'Dobozdiagram',
          items: [
            'Q₀ = min, Q₂ = medián, Q₄ = max',
            'doboz: Q₁-től Q₃-ig, benne a medián',
            'vonalak: a minimumig és a maximumig',
            'a dobozba az adatok kb. 50%-a esik'
          ]
        },
        {
          title: 'Szóródás és kiugró adat',
          items: [
            'terjedelem = max − min',
            'félterjedelem = Q₃ − Q₁ (nem a terjedelem fele!)',
            'kiugró: ≤ Q₁ − 1,5 · (Q₃ − Q₁) vagy ≥ Q₃ + 1,5 · (Q₃ − Q₁)',
            'kiugró adatnál a vonal a legszélső nem kiugró adatig tart'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <BoxPlotMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <BoxPlotSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default BoxPlotQuiz;
