// Hanggenerálás Google Cloud Text-to-Speech-csel + feltöltés a Firebase Storage-ba (új csomag nélkül, REST).
//
// Kulcs: GOOGLE_APPLICATION_CREDENTIALS=<service account JSON> vagy --key <útvonal>
//   (kell hozzá: Cloud Text-to-Speech API engedélyezve, Storage Object Admin szerepkör)
//
//   npx vite-node scripts/tts/tts-g1.ts -- voices                         magyar hangok listája
//   npx vite-node scripts/tts/tts-g1.ts -- samples [hang1 hang2 …]        mintamondatok → scratch/g1/tts/samples/index.html
//   npx vite-node scripts/tts/tts-g1.ts -- build --female <hang> --male <hang> [--rate 0.95] [--only <mappa-előtag>] [--dry]
//        a scratch/g1/tts/texts.json összes szövegéhez (harvest-g1.tsx) legyártja a hiányzó hangfájlokat,
//        feltölti: audio/g1/<female|male>/<kulcs>.mp3, és frissíti a src/…/shared/audioManifest.g1.json-t.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { AUDIO_BUCKET, AUDIO_PREFIX, AudioManifest, VoiceKind, speechKey, toSpeechText } from '@/components/math/grade-1/shared/speechKey';

const ROOT = path.resolve(__dirname, '../..');
const TTS_DIR = path.join(ROOT, 'scratch/g1/tts');

const args = process.argv.slice(2).filter((a) => a !== '--');
const cmd = args[0];
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name: string) => args.includes(`--${name}`);

/* ---------------- Hitelesítés (service account → OAuth token) ---------------- */
const keyPath = flag('key') || process.env.GOOGLE_APPLICATION_CREDENTIALS;
let tokenCache: { token: string; exp: number } | null = null;
const getToken = async (): Promise<string> => {
  if (tokenCache && tokenCache.exp > Date.now() + 60_000) return tokenCache.token;
  if (!keyPath) throw new Error('Nincs kulcs: GOOGLE_APPLICATION_CREDENTIALS vagy --key <service-account.json>');
  const sa = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  const j = (await r.json()) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!j.access_token) throw new Error(`Token hiba: ${j.error_description || JSON.stringify(j)}`);
  tokenCache = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return j.access_token;
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
const gfetch = async (url: string, init: RequestInit = {}) => {
  // 429 (kvóta / percenkénti korlát) és 5xx esetén visszalépéssel újrapróbálja
  for (let attempt = 0; ; attempt++) {
    const token = await getToken();
    let r: Response;
    try {
      r = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init.headers || {}) } });
    } catch (e) {
      // hálózati hiba (pl. „fetch failed”) → ugyanúgy visszalépéssel újra
      if (attempt >= 10) throw e;
      const ms = Math.min(60_000, 2000 * 2 ** attempt);
      console.warn(`  hálózati hiba → újra ${Math.round(ms / 1000)} s múlva`);
      await wait(ms);
      continue;
    }
    if (r.ok) return r;
    const body = (await r.text()).slice(0, 400);
    if ((r.status === 429 || r.status >= 500) && attempt < 10) {
      const ms = Math.min(60_000, 2000 * 2 ** attempt) + Math.random() * 1000;
      console.warn(`  ${r.status} → újra ${Math.round(ms / 1000)} s múlva`);
      await wait(ms);
      continue;
    }
    throw new Error(`${init.method || 'GET'} ${url.split('?')[0]} → ${r.status}: ${body}`);
  }
};

/* ---------------- Text-to-Speech ---------------- */
const listVoices = async () => {
  const r = await gfetch('https://texttospeech.googleapis.com/v1/voices?languageCode=hu-HU');
  const j = (await r.json()) as { voices: { name: string; ssmlGender: string }[] };
  return j.voices.sort((a, b) => a.name.localeCompare(b.name));
};

const synthesize = async (text: string, voice: string, rate?: number): Promise<Buffer> => {
  const body = (withRate: boolean) =>
    JSON.stringify({
      input: { text: toSpeechText(text) },
      voice: { languageCode: 'hu-HU', name: voice },
      audioConfig: { audioEncoding: 'MP3', ...(withRate && rate ? { speakingRate: rate } : {}) },
    });
  let r: Response;
  try {
    r = await gfetch('https://texttospeech.googleapis.com/v1/text:synthesize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body(true) });
  } catch (e) {
    if (!rate) throw e;
    // egyes hangok nem támogatják a sebességet → sebesség nélkül újra
    r = await gfetch('https://texttospeech.googleapis.com/v1/text:synthesize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body(false) });
  }
  const j = (await r.json()) as { audioContent: string };
  return Buffer.from(j.audioContent, 'base64');
};

/* ---------------- Storage ---------------- */
const upload = async (name: string, data: Buffer, contentType: string, cacheControl: string) => {
  const boundary = 'dz' + crypto.randomBytes(8).toString('hex');
  const meta = JSON.stringify({ name, contentType, cacheControl });
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${boundary}\r\nContent-Type: ${contentType}\r\n\r\n`),
    data,
    Buffer.from(`\r\n--${boundary}--`),
  ]);
  await gfetch(`https://storage.googleapis.com/upload/storage/v1/b/${AUDIO_BUCKET}/o?uploadType=multipart`, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });
};

// A manifest a kódba kerül (a böngésző CORS nélkül is betölti); a hangfájlok a Storage-ban vannak.
const MANIFEST_FILE = path.join(ROOT, 'src/components/math/grade-1/shared/audioManifest.g1.json');
const readManifest = async (): Promise<AudioManifest> =>
  fs.existsSync(MANIFEST_FILE) ? (JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8')) as AudioManifest) : { version: 1, updated: '', voices: {} };

/* ---------------- Segédek ---------------- */
const pool = async <T,>(items: T[], n: number, fn: (x: T, i: number) => Promise<void>) => {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const k = i++;
        await fn(items[k], k);
      }
    })
  );
};

const SAMPLE_SENTENCES = [
  'Szia! Pötyi vagyok, a kis piros katica. Látod a pöttyeimet a hátamon?',
  'Jaj! Éjjel nagy szél fújt a Számkertben. Segítesz rendet rakni?',
  'Hűha! 7 csillagot gyűjtöttél! Szuper vagy!',
  '3 meg 2 egyenlő 5.',
];

const main = async () => {
  if (cmd === 'voices') {
    for (const v of await listVoices()) console.log(`${v.name.padEnd(34)} ${v.ssmlGender}`);
    return;
  }

  if (cmd === 'samples') {
    const all = await listVoices();
    const wanted = args.slice(1).filter((a) => !a.startsWith('--') && a !== flag('key') && a !== flag('rate'));
    const voices = wanted.length ? all.filter((v) => wanted.includes(v.name)) : all;
    const rate = flag('rate') ? Number(flag('rate')) : undefined;
    const dir = path.join(TTS_DIR, 'samples');
    fs.mkdirSync(dir, { recursive: true });
    const rows: string[] = [];
    await pool(voices, 4, async (v) => {
      const cells: string[] = [];
      for (let i = 0; i < SAMPLE_SENTENCES.length; i++) {
        try {
          const buf = await synthesize(SAMPLE_SENTENCES[i], v.name, rate);
          const f = `${v.name}-${i}.mp3`;
          fs.writeFileSync(path.join(dir, f), buf);
          cells.push(`<td><audio controls preload="none" src="${f}"></audio></td>`);
        } catch (e) {
          cells.push(`<td>hiba</td>`);
          console.warn(v.name, String(e).slice(0, 160));
        }
      }
      rows.push(`<tr><th>${v.name}<br><small>${v.ssmlGender === 'FEMALE' ? 'női' : v.ssmlGender === 'MALE' ? 'férfi' : v.ssmlGender}</small></th>${cells.join('')}</tr>`);
      console.log('kész:', v.name);
    });
    rows.sort();
    const html = `<!doctype html><meta charset="utf-8"><title>Pötyi hangminták</title>
<style>body{font-family:system-ui;margin:16px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}th small{color:#666;font-weight:normal}</style>
<h1>Pötyi hangminták</h1><table><tr><th>Hang</th>${SAMPLE_SENTENCES.map((s) => `<th style="max-width:220px;font-weight:normal">${s}</th>`).join('')}</tr>${rows.join('\n')}</table>`;
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`→ ${path.join(dir, 'index.html')}`);
    return;
  }

  if (cmd === 'build') {
    const voiceIds: Partial<Record<VoiceKind, string>> = { female: flag('female'), male: flag('male') };
    const rate = flag('rate') ? Number(flag('rate')) : undefined;
    const dry = has('dry');
    const src = JSON.parse(fs.readFileSync(path.join(TTS_DIR, 'texts.json'), 'utf8')) as { lessons: Record<string, string[]>; kit: string[] };
    const only = flag('only'); // pl. --only elokeszito-idoszak → csak az ilyen előtagú leckék (a többi klip a manifestben marad)
    const lessonTexts = Object.entries(src.lessons).filter(([k]) => !only || k.startsWith(only)).flatMap(([, v]) => v);
    const texts = [...new Set([...(src.kit || []), ...lessonTexts].map(toSpeechText).filter(Boolean))];
    const manifest = await readManifest();
    let chars = 0;
    for (const kind of ['female', 'male'] as VoiceKind[]) {
      const id = voiceIds[kind];
      if (!id) continue;
      const prev = manifest.voices[kind];
      const have = new Set(prev && prev.id === id && (prev as { rate?: number }).rate === rate ? prev.clips : []);
      const todo = texts.filter((t) => !have.has(speechKey(t)));
      chars += todo.reduce((s, t) => s + t.length, 0);
      console.log(`${kind} (${id}): ${texts.length} szöveg, ebből új: ${todo.length}`);
      if (dry) continue;
      const localDir = path.join(TTS_DIR, 'audio', kind);
      fs.mkdirSync(localDir, { recursive: true });
      // a helyben már meglévő fájl (megszakadt korábbi futás) nem kerül újra a TTS-be, csak feltöltjük
      const localTag = path.join(localDir, '.voice');
      const localOk = fs.existsSync(localTag) && fs.readFileSync(localTag, 'utf8') === `${id}|${rate ?? ''}`;
      if (!localOk) {
        fs.rmSync(localDir, { recursive: true, force: true });
        fs.mkdirSync(localDir, { recursive: true });
        fs.writeFileSync(localTag, `${id}|${rate ?? ''}`);
      }
      const save = () => {
        manifest.voices[kind] = {
          id,
          label: kind === 'female' ? 'Női hang' : 'Férfi hang',
          clips: [...have].sort(),
          ...(rate ? { rate } : {}),
        } as AudioManifest['voices'][VoiceKind];
        manifest.updated = new Date().toISOString();
        fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest));
      };
      let done = 0;
      try {
        await pool(todo, 2, async (t) => {
          const key = speechKey(t);
          const file = path.join(localDir, `${key}.mp3`);
          const buf = fs.existsSync(file) ? fs.readFileSync(file) : await synthesize(t, id, rate);
          fs.writeFileSync(file, buf);
          await upload(`${AUDIO_PREFIX}/${kind}/${key}.mp3`, buf, 'audio/mpeg', 'public, max-age=31536000, immutable');
          have.add(key);
          if (++done % 50 === 0) console.log(`  ${done}/${todo.length}`);
        });
      } finally {
        save(); // megszakadáskor is: ami feltöltődött, bekerül a manifestbe
      }
    }
    console.log(`Generálandó karakter: ${chars}`);
    if (dry) return;
    manifest.updated = new Date().toISOString();
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest));
    console.log(`Manifest: ${path.relative(ROOT, MANIFEST_FILE)}`);
    return;
  }

  console.log('Parancsok: voices | samples [hangok…] | build --female <hang> --male <hang> [--rate 0.95] [--dry]');
};

main().catch((e) => {
  console.error(String(e));
  process.exit(1);
});
