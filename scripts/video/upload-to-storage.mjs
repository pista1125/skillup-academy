#!/usr/bin/env node
// Feltöltés Firebase Storage-ba a gépen tárolt firebase-tools bejelentkezéssel (titok nincs a repóban).
// Használat: node scripts/video/upload-to-storage.mjs <helyi fájl> <storage útvonal> [<helyi> <útvonal> ...]
// Példa: node scripts/video/upload-to-storage.mjs ".../feltoltes/8_01_x.mp4" videok/8_osztaly/8_01_x.mp4
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const BUCKET = 'diakzona.firebasestorage.app';
// a firebase-tools nyilvános OAuth kliense (a CLI forráskódjában szerepel)
const CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';

const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config/configstore/firebase-tools.json'), 'utf8'));
const refresh = cfg?.tokens?.refresh_token;
if (!refresh) throw new Error('Nincs tárolt firebase-tools bejelentkezés');

const tr = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }),
});
if (!tr.ok) throw new Error(`Token frissítés sikertelen: ${tr.status} ${(await tr.text()).slice(0, 200)}`);
const { access_token } = await tr.json();

const TYPES = { '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const [local, dest] = [args[i], args[i + 1]];
  const body = fs.readFileSync(local);
  const type = TYPES[path.extname(local).toLowerCase()] ?? 'application/octet-stream';
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET}/o?uploadType=media&name=${encodeURIComponent(dest)}`;
  const r = await fetch(url, { method: 'POST', headers: { authorization: `Bearer ${access_token}`, 'content-type': type }, body });
  if (!r.ok) throw new Error(`${dest}: ${r.status} ${(await r.text()).slice(0, 300)}`);
  const meta = await r.json();
  // nyilvános gyorsítótárazás (a videó nem változik; új verzió új néven menjen)
  await fetch(`https://storage.googleapis.com/storage/v1/b/${BUCKET}/o/${encodeURIComponent(dest)}`, {
    method: 'PATCH',
    headers: { authorization: `Bearer ${access_token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ cacheControl: 'public, max-age=86400' }),
  });
  console.log(`✓ ${dest}  (${(Number(meta.size) / 1048576).toFixed(1)} MB, ${meta.contentType})`);
}
