// Kigyűjti az 1. osztályos leckék minden felolvasott szövegét a hanggeneráláshoz.
// Futtatás:  npx vite-node scripts/tts/harvest-g1.tsx -- elokeszito-idoszak/valogatasok [további mappák…]
//            npx vite-node scripts/tts/harvest-g1.tsx -- --all
// Kimenet:   scratch/g1/tts/texts.json  { lessons: { <mappa>: [szöveg…] }, kit: [szöveg…] }
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { lessonSpeechTexts, type MesePage } from '@/components/math/grade-1/shared/MeseLesson';
import { quizSpeechTexts } from '@/components/math/grade-1/shared/MeseQuiz';
import { PRAISES, RETRY } from '@/components/math/grade-1/shared/speech';
import { VOICE_SWITCH_SAY } from '@/components/math/grade-1/shared/MeseKit';
import { toSpeechText } from '@/components/math/grade-1/shared/speechKey';

const ROOT = path.resolve(__dirname, '../..');
const G1 = path.join(ROOT, 'src/components/math/grade-1');
const OUT = path.join(ROOT, 'scratch/g1/tts/texts.json');

type AnyFC = (props: Record<string, unknown>) => React.ReactElement | null;
type WithSpeech = { speechTexts?: () => string[] };

const uniq = (arr: string[]) => [...new Set(arr.map(toSpeechText).filter(Boolean))];

/** A React-elemfából (props.children, props.playground…) összeszedi a speechTexts-szel rendelkező komponenseket. */
const playgroundTexts = (node: unknown, out: string[], seen = new Set<unknown>()) => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach((n) => playgroundTexts(n, out, seen));
  const el = node as React.ReactElement & { type?: WithSpeech };
  if (el.type && typeof el.type === 'function' && (el.type as WithSpeech).speechTexts && !seen.has(el.type)) {
    seen.add(el.type);
    out.push(...(el.type as WithSpeech).speechTexts!());
  }
  const props = (el as { props?: Record<string, unknown> }).props;
  if (props) Object.values(props).forEach((v) => playgroundTexts(v, out, seen));
};

const harvestLesson = async (folder: string): Promise<{ texts: string[]; playground: boolean }> => {
  const mod = (await import(/* @vite-ignore */ path.join(G1, folder, 'index.ts'))) as Record<string, unknown>;
  const texts: string[] = [];
  let playground = false;
  for (const [name, exp] of Object.entries(mod)) {
    if (typeof exp !== 'function') continue;
    if (/Mese$/.test(name)) {
      const el = (exp as AnyFC)({});
      const props = (el?.props || {}) as { pages?: MesePage[]; playground?: React.ReactNode };
      if (props.pages) texts.push(...lessonSpeechTexts(props.pages));
      const before = texts.length;
      playgroundTexts(props.playground, texts);
      playground ||= texts.length > before;
    } else if (/Jatek$/.test(name)) {
      const el = (exp as AnyFC)({});
      type QA = Parameters<typeof quizSpeechTexts>;
      const p = (el?.props || {}) as { questions?: QA[0]; pairs?: QA[1]; sort?: QA[2] };
      if (p.questions) texts.push(...quizSpeechTexts(p.questions, p.pairs, p.sort));
    }
  }
  return { texts: uniq(texts), playground };
};

const allFolders = (): string[] => {
  const lessons = JSON.parse(fs.readFileSync(path.join(ROOT, 'scratch/g1/lessons.json'), 'utf8'));
  const arr = Array.isArray(lessons) ? lessons : lessons.lessons;
  return arr.map((l: { chapter: string; folder: string }) => `${l.chapter}/${l.folder}`);
};

const main = async () => {
  const args = process.argv.slice(2).filter((a) => a !== '--');
  const folders = args.includes('--all') ? allFolders() : args;
  if (!folders.length) throw new Error('Adj meg leckemappát (pl. elokeszito-idoszak/valogatasok) vagy --all');

  const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { lessons: {} };
  const kit = uniq([...PRAISES, ...RETRY, VOICE_SWITCH_SAY]);
  for (const f of folders) {
    const { texts, playground } = await harvestLesson(f);
    prev.lessons[f] = texts;
    console.log(`${f}: ${texts.length} szöveg, ${texts.join(' ').length} karakter${playground ? '' : ' (játszótér-szöveg nélkül!)'}`);
  }
  prev.kit = kit;
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
  console.log(`→ ${path.relative(ROOT, OUT)}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
