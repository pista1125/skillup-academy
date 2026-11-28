#!/usr/bin/env node
/**
 * Oktatóvideó előkészítése a weboldalhoz.
 *
 * Használat:
 *   node scripts/video/prepare-video.mjs <altéma-mappa> --lesson <documentId> [--kind magyarazo|gyakorlo] [--title "..."] [--poster-at 2]
 *
 * Példa:
 *   node scripts/video/prepare-video.mjs "../video_vago/oktato_videok/8_osztaly/01_logikai_feladatok/01_altema" \
 *        --lesson grade-8-szamok-betuk-logika-feladatok
 *
 * Mit csinál:
 *   1. megkeresi a kész videót (az `elonezet.mp4`-en kívüli .mp4),
 *   2. ha kell, újracsomagolja gyors indításra (faststart, újrakódolás nélkül),
 *   3. borítóképet vág ki belőle,
 *   4. a `.build/idozites.txt` + `forgatokonyv.md` alapján elkészíti a fejezetlistát,
 *   5. a fájlokat a `<altéma>/feltoltes/` mappába teszi,
 *   6. beírja / frissíti a `src/data/lessonVideos.json` nyilvántartást.
 * A feltöltést a Firebase Console-on kell elvégezni (a szkript kiírja a pontos célmappát).
 *
 * A `--lesson` értéke a lecke TheoryTemplate-jének `documentId`-ja (a LogicTheory.tsx-ben pl.
 * documentId="grade-8-szamok-betuk-logika-feladatok").
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REGISTRY = path.join(ROOT, 'src', 'data', 'lessonVideos.json');

function die(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

// ---- argumentumok ---------------------------------------------------------
const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--'));
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
if (!dir) die('Add meg az altéma mappáját. Lásd a fájl elején a használatot.');
const lesson = opt('lesson');
if (!lesson) die('Hiányzik a --lesson <documentId>.');
const kind = opt('kind') ?? 'magyarazo';
if (!['magyarazo', 'gyakorlo'].includes(kind)) die('A --kind értéke magyarazo vagy gyakorlo lehet.');
const posterAt = Number(opt('poster-at') ?? 2);

const srcDir = path.resolve(dir);
if (!fs.existsSync(srcDir)) die(`Nincs ilyen mappa: ${srcDir}`);

// ---- videó ----------------------------------------------------------------
const mp4s = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith('.mp4') && f !== 'elonezet.mp4');
if (mp4s.length !== 1) die(`Pontosan egy kész .mp4-et várok (elonezet.mp4-en kívül), ezt találtam: ${mp4s.join(', ') || 'semmit'}`);
const srcVideo = path.join(srcDir, mp4s[0]);
const id = path.basename(mp4s[0], '.mp4');

// évfolyam-mappa az útvonalból (pl. 8_osztaly)
const gradeFolder = srcDir.split(path.sep).find((p) => /^\d+_osztaly$/.test(p));
if (!gradeFolder) die('Az útvonalban nem találok „<N>_osztaly” mappát.');

const ffprobe = (...a) => execFileSync('ffprobe', ['-v', 'error', ...a], { encoding: 'utf8' }).trim();
const duration = Math.round(Number(ffprobe('-show_entries', 'format=duration', '-of', 'csv=p=0', srcVideo)) * 10) / 10;

function isFaststart(file) {
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(8);
  let pos = 0;
  try {
    const size = fs.fstatSync(fd).size;
    while (pos < size) {
      fs.readSync(fd, buf, 0, 8, pos);
      let len = buf.readUInt32BE(0);
      const type = buf.toString('ascii', 4, 8);
      if (type === 'moov') return true;
      if (type === 'mdat') return false;
      if (len === 1) {
        const big = Buffer.alloc(8);
        fs.readSync(fd, big, 0, 8, pos + 8);
        len = Number(big.readBigUInt64BE(0));
      }
      if (len < 8) return false;
      pos += len;
    }
  } finally {
    fs.closeSync(fd);
  }
  return false;
}

const outDir = path.join(srcDir, 'feltoltes');
fs.mkdirSync(outDir, { recursive: true });
const outVideo = path.join(outDir, `${id}.mp4`);
const outPoster = path.join(outDir, `${id}.jpg`);

if (isFaststart(srcVideo)) {
  fs.copyFileSync(srcVideo, outVideo);
  console.log('✓ a videó már gyors indításra kész (faststart) — másolva');
} else {
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', srcVideo, '-c', 'copy', '-movflags', '+faststart', outVideo], { stdio: 'inherit' });
  console.log('✓ a videó újracsomagolva gyors indításra (faststart)');
}

execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(posterAt), '-i', srcVideo, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '4', outPoster], { stdio: 'inherit' });
console.log('✓ borítókép elkészült');

// ---- fejezetek ------------------------------------------------------------
const titles = new Map();
const scriptFile = path.join(srcDir, 'forgatokonyv.md');
if (fs.existsSync(scriptFile)) {
  for (const line of fs.readFileSync(scriptFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^##\s+(\d+)\.\s*dia\s*[–-]\s*(.+?)\s*$/);
    if (m) titles.set(Number(m[1]), m[2]);
  }
}

const chapters = [];
const timingFile = path.join(srcDir, '.build', 'idozites.txt');
if (fs.existsSync(timingFile)) {
  for (const line of fs.readFileSync(timingFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^(\d+)\s+([\d.]+)s/);
    if (m) {
      const n = Number(m[1]);
      chapters.push({ start: Number(m[2]), title: titles.get(n) ?? `${n}. dia` });
    }
  }
  console.log(`✓ ${chapters.length} fejezet az időzítésből`);
} else {
  console.warn('! nincs .build/idozites.txt — fejezetek nélkül megy');
}

// az első dia a címdia: a fejezetlistában „Bevezetés”-ként jobban mutat
if (chapters[0] && chapters[0].start === 0) chapters[0].title = 'Bevezetés';

// ---- nyilvántartás --------------------------------------------------------
const storageDir = `videok/${gradeFolder}`;
const registry = fs.existsSync(REGISTRY) ? JSON.parse(fs.readFileSync(REGISTRY, 'utf8')) : {};
const list = (registry[lesson] ??= []);
const existing = list.find((v) => v.id === id);
const title = opt('title') ?? existing?.title ?? titles.get(1) ?? id;
const entry = {
  id,
  kind,
  title,
  video: `${storageDir}/${id}.mp4`,
  poster: `${storageDir}/${id}.jpg`,
  duration,
  chapters,
};
if (existing) Object.assign(existing, entry);
else list.push(entry);
// magyarázó elöl, gyakorló utána
list.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'magyarazo' ? -1 : 1));

const sorted = Object.fromEntries(Object.keys(registry).sort().map((k) => [k, registry[k]]));
fs.mkdirSync(path.dirname(REGISTRY), { recursive: true });
fs.writeFileSync(REGISTRY, JSON.stringify(sorted, null, 2) + '\n');
console.log(`✓ nyilvántartás frissítve: ${path.relative(ROOT, REGISTRY)} → ${lesson}`);

const mb = (f) => (fs.statSync(f).size / 1024 / 1024).toFixed(1);
console.log(`
Feltöltés (Firebase Console → Storage → diakzona.firebasestorage.app):
  célmappa:  ${storageDir}/
  fájlok:    ${outVideo}  (${mb(outVideo)} MB)
             ${outPoster}  (${mb(outPoster)} MB)
Utána: commit + deploy, és a videó megjelenik a leckénél.
`);
