import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface WordProblemsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const WordProblemsMatcher: React.FC<WordProblemsMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Egyszerű szöveges feladatok)
    // ==========================================
    {
      id: 'g6-wp-m-1',
      level: 1,
      prompt: 'Két szám összege 36, az egyik 6-tal több',
      value: '15 és 21 a két szám',
      hint: '2x + 6 = 36.'
    },
    {
      id: 'g6-wp-m-2',
      level: 1,
      prompt: 'Egy szám négyszereséhez 8-at adva 40-et kapunk',
      value: 'x = 8 a keresett szám',
      hint: '4x + 8 = 40.'
    },
    {
      id: 'g6-wp-m-3',
      level: 1,
      prompt: 'Anna és Béla együtt 25 könyv, Anna 5-tel többet olvasott',
      value: '10 könyvet olvasott Béla',
      hint: '2x + 5 = 25.'
    },
    {
      id: 'g6-wp-m-4',
      level: 1,
      prompt: 'Téglalap: szélessége 6 cm, hossza háromszoros',
      value: 'K = 48 cm a kerülete',
      hint: '2 · (6 + 18).'
    },
    {
      id: 'g6-wp-m-5',
      level: 1,
      prompt: 'Füzet és toll együtt 1200 Ft, füzet 400 Ft-tal drágább',
      value: '400 Ft-ba került a toll',
      hint: '2x + 400 = 1200.'
    },
    {
      id: 'g6-wp-m-6',
      level: 1,
      prompt: 'Egy szám egyötöde 14, mennyi a fele?',
      value: '35 a szám fele',
      hint: 'Szám = 70.'
    },
    {
      id: 'g6-wp-m-7',
      level: 1,
      prompt: '28 fős osztályban a lányok 2-vel többen vannak',
      value: '13 fiú és 15 lány',
      hint: '2x + 2 = 28.'
    },
    {
      id: 'g6-wp-m-8',
      level: 1,
      prompt: 'Gondolt szám: (x - 15) / 3 = 7',
      value: '36 a gondolt szám',
      hint: 'Visszafelé: 21 + 15.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Összetettebb szöveges feladatok)
    // ==========================================
    {
      id: 'g6-wp-m-9',
      level: 2,
      prompt: 'Apa 38, fia 10: hány év múlva lesz 3-szorosa?',
      value: '4 év múlva',
      hint: '38 + x = 3(10 + x).'
    },
    {
      id: 'g6-wp-m-10',
      level: 2,
      prompt: 'Téglalap K = 54 cm, hossza 7 cm-rel több szélességnél',
      value: '10 cm a szélessége',
      hint: '4x + 14 = 54.'
    },
    {
      id: 'g6-wp-m-11',
      level: 2,
      prompt: 'Két egymást követő páros szám összege 70',
      value: '34 és 36 a két szám',
      hint: '2x + 2 = 70.'
    },
    {
      id: 'g6-wp-m-12',
      level: 2,
      prompt: 'Zsebpénz fele mozi, majd 600 Ft popcorn, marad 900 Ft',
      value: '3000 Ft volt eredetileg',
      hint: 'Fele = 1500 Ft.'
    },
    {
      id: 'g6-wp-m-13',
      level: 2,
      prompt: 'Egyenlő szárú háromszög K = 32 cm, alap 4-gyel rövidebb',
      value: '12 cm a szár hossza',
      hint: '3a - 4 = 32.'
    },
    {
      id: 'g6-wp-m-14',
      level: 2,
      prompt: 'Három testvér korösszege 39 év, különbségek 3-3 év',
      value: '13 éves a középső testvér',
      hint: '3x = 39.'
    },
    {
      id: 'g6-wp-m-15',
      level: 2,
      prompt: 'Tyúkok és nyulak: 20 fej és 56 láb az udvaron',
      value: '8 nyúl és 12 tyúk',
      hint: '4x + 2(20 - x) = 56.'
    },
    {
      id: 'g6-wp-m-16',
      level: 2,
      prompt: 'Dóri 2-szerese Lilinek, Zsófi 10-zel több, összeg 85',
      value: '15 matricája van Lilinek',
      hint: '5x + 10 = 85.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Törtrészek maradékból, mozgás, munka)
    // ==========================================
    {
      id: 'g6-wp-m-17',
      level: 3,
      prompt: 'Túrázó: 2/5 rész, maradék fele, végül még 15 km maradt',
      value: '50 km a teljes túraútvonal',
      hint: '3/10 rész = 15 km.'
    },
    {
      id: 'g6-wp-m-18',
      level: 3,
      prompt: 'Anya most 4-szerese fiának, 6 éve 7-szerese volt',
      value: '12 éves most a fiú',
      hint: '4x - 6 = 7(x - 6).'
    },
    {
      id: 'g6-wp-m-19',
      level: 3,
      prompt: 'Regények kétszerese meséknek, 6 és 4 átrakása után egyenlő',
      value: '10 mesekönyv volt eredetileg',
      hint: '2x - 6 = x + 4.'
    },
    {
      id: 'g6-wp-m-20',
      level: 3,
      prompt: '80 belépő, 1500 Ft és 900 Ft jegyek, összeg 96 000 Ft',
      value: '40 felnőtt jegy eladva',
      hint: '600x = 24 000.'
    },
    {
      id: 'g6-wp-m-21',
      level: 3,
      prompt: 'Autó 60 km/h, 30 perccel utána motoros 90 km/h indul',
      value: '1 óra múlva éri utol',
      hint: 'Előny = 30 km.'
    },
    {
      id: 'g6-wp-m-22',
      level: 3,
      prompt: 'Együtt 6 óra a munka, egyik munkás egyedül 10 óra',
      value: '15 óra a másik munkásnak egyedül',
      hint: '1/6 - 1/10 = 1/15.'
    },
    {
      id: 'g6-wp-m-23',
      level: 3,
      prompt: 'Kert hossza 5 m-rel több, mindkét oldal +2 m után K = 60 m',
      value: '10,5 méter az eredeti szélesség',
      hint: '4x + 18 = 60.'
    },
    {
      id: 'g6-wp-m-24',
      level: 3,
      prompt: 'Tombolák 60%-a, majd maradék 75%-a után 30 db maradt',
      value: '300 tombola nyomtatva összesen',
      hint: '10% = 30 db.'
    }
  ];

  return (
    <MatcherTemplate
      title="Szöveges feladatok párosító"
      subtitle="Párosítsd a feladatok szöveges állításait a helyes eredménnyel és egyenlettel 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="teal"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default WordProblemsMatcher;
