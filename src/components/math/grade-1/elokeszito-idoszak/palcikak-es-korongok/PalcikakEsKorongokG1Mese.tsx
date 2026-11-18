import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { BuildBoxScene, FIG, FigRow, PieceRow, Piece, PiecesScene, RuleScene, StandLieScene, StickGardenScene, figOpt, mirror, recolor, without } from './PalcikakEsKorongokG1Scenes';
import { CopyFigurePlayground } from './PalcikakEsKorongokG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <BuildBoxScene />,
    text: 'Ma építünk!',
    say: 'Szia, Pötyi vagyok! Ma építeni fogunk a Számkertben. Nézd, mit hoztam: egy dobozt, tele színes pálcikákkal és korongokkal!',
    mood: 'cheer',
  },
  {
    scene: <PiecesScene />,
    text: 'Pálcika és korong.',
    say: 'A pálcika hosszú és vékony, mint egy kis bot. A korong kerek és lapos, mint egy gomb. Melyik a korong?',
    task: {
      ask: 'Melyik a korong?',
      options: [{ figure: <Piece kind="korong" c="kek" />, say: 'kék korong' }, { figure: <Piece kind="ferde" c="kek" />, say: 'kék pálcika' }],
      hint: 'A pálcika hosszú. A korong kerek, mint egy gomb.',
    },
  },
  {
    scene: <StandLieScene />,
    text: 'Áll vagy fekszik?',
    say: 'A pálcika állhat, mint egy katona, és fekhet, mint aki alszik. A kék pálcika áll, a piros fekszik. Pötyi a fekvő pálcikán pihen. Melyik pálcika áll?',
    task: {
      ask: 'Melyik pálcika áll?',
      options: [{ figure: <Piece kind="allo" c="zold" />, say: 'álló pálcika' }, { figure: <Piece kind="fekvo" c="zold" />, say: 'fekvő pálcika' }],
      hint: 'Az álló pálcika fentről lefelé megy, mint egy fa törzse.',
    },
  },
  {
    scene: <FigRow figs={[FIG.nap]} />,
    text: 'Pötyi napot rakott ki.',
    say: 'Pötyi napot rakott ki: középen egy piros korong, körülötte sárga pálcikák. Zümi is kirakta. Melyik ugyanolyan, mint Pötyi napja?',
    task: {
      ask: 'Melyik ugyanolyan?',
      options: [figOpt(FIG.nap, 'ugyanolyan nap'), figOpt(recolor(FIG.nap, { piros: 'kek' }), 'kék közepű nap'), figOpt(recolor(FIG.nap, { sarga: 'zold' }), 'zöld sugarú nap')],
      hint: 'Nézd meg a korong színét és a pálcikák színét is!',
    },
  },
  {
    scene: <FigRow figs={[FIG.baba, without(FIG.baba, 0)]} />,
    text: 'Mi hiányzik?',
    say: 'Csigusz pálcikababát épít. Az első a minta. A másodikról lemaradt valami. Mi hiányzik?',
    task: {
      ask: 'Mi hiányzik a babáról?',
      options: [{ figure: <Piece kind="korong" c="kek" />, say: 'kék korong' }, { figure: <Piece kind="korong" c="piros" />, say: 'piros korong' }, { figure: <Piece kind="ferde" c="zold" />, say: 'zöld pálcika' }],
      hint: 'Nézd meg a baba fejét a mintán! Milyen színű?',
    },
  },
  {
    scene: <PieceRow items={[{ kind: 'korong', c: 'piros' }, { kind: 'korong', c: 'kek' }, { kind: 'allo', c: 'sarga' }, { kind: 'korong', c: 'piros' }, { kind: 'korong', c: 'kek' }, null]} />,
    text: 'Mi jön ezután?',
    say: 'Pötyi sort rak: piros korong, kék korong, sárga pálcika. Aztán újra: piros korong, kék korong. Mi jön ezután?',
    task: {
      ask: 'Mi jön ezután?',
      options: [{ figure: <Piece kind="allo" c="sarga" />, say: 'sárga pálcika' }, { figure: <Piece kind="korong" c="piros" />, say: 'piros korong' }, { figure: <Piece kind="korong" c="kek" />, say: 'kék korong' }],
      hint: 'Mondd ki hangosan: piros, kék, pálcika… piros, kék, és most?',
    },
  },
  {
    scene: <RuleScene rules={[['sarga', 'piros']]} model={FIG.kerites} />,
    text: 'Színvarázslat!',
    say: 'Zümi varázsol! A szabály: ami sárga, az piros lesz. A többi színe nem változik. Hogy néz ki a kerítés a varázslat után?',
    task: {
      ask: 'Melyik lett a varázslat után?',
      options: [figOpt(recolor(FIG.kerites, { sarga: 'piros' }), 'piros lécekkel'), figOpt(FIG.kerites, 'ugyanaz maradt'), figOpt(recolor(FIG.kerites, { sarga: 'kek' }), 'kék lécekkel')],
      hint: 'A sárga pálcikák pirosak lesznek. A többi marad.',
    },
  },
  {
    scene: <FigRow figs={[FIG.roller]} />,
    text: 'Figyelj az irányra!',
    say: 'Csigusz rollert rakott ki. A roller jobbra néz. Melyik ugyanolyan? Figyelj a színekre és arra is, merre néz!',
    task: {
      ask: 'Melyik ugyanolyan?',
      options: [figOpt(FIG.roller, 'jobbra néző roller'), figOpt(mirror(FIG.roller), 'balra néző roller'), figOpt(recolor(FIG.roller, { kek: 'piros' }), 'piros kerekű roller')],
      hint: 'Ez a roller másfelé néz, vagy más a színe. Nézd meg jól!',
    },
  },
  {
    text: 'Csináld, amit mondok!',
    say: 'Hallgasd meg! Tegyél le egy kék pálcikát fekve. A két végére állíts egy-egy kék pálcikát. Felül kösd össze őket egy fekvő kék pálcikával. A tetejére tegyél két piros pálcikát, mint egy tetőt. Mi lett belőle?',
    task: {
      ask: 'Mi lett belőle?',
      say: 'Mi lett a pálcikákból?',
      options: [figOpt(FIG.haz, 'ház'), figOpt(FIG.kapu, 'kapu'), figOpt(FIG.asztal, 'asztal')],
      hint: 'A végén két piros pálcika került a tetejére. Melyiknek van piros teteje?',
    },
  },
  {
    scene: <StickGardenScene />,
    text: 'Kész a pálcikakert!',
    say: 'Hurrá! Pálcikákból és korongokból házat, napot és virágot raktunk ki. Figyeltünk a színekre és az irányokra is. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const PalcikakEsKorongokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="4. Pálcikák és korongok"
    storyTitle="Pötyi és a pálcikakert"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    playground={<CopyFigurePlayground />}
    playgroundTitle="Játszótér: rakd ki úgy, mint a minta!"
    parentNote="A gyerek megismeri a számolópálcikát és a korongot, megkülönbözteti az álló és a fekvő pálcikát. Minta szerint kirak és összehasonlít figurákat (szín, irány), megtalálja a hiányzó elemet, folytat egy sort, és szabály szerint színt cserél. Otthon valódi pálcikákkal és korongokkal (vagy gyufaszállal, gombbal) is érdemes kirakni a figurákat."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default PalcikakEsKorongokG1Mese;

