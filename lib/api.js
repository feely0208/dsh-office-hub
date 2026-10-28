/** 深鲸办公台 · 宿主出口：版本 + 清单（静态，不含用户数据） */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROUTE = '/dsh-office-hub';
const VERSION = (() => { try { return JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8')).version || ''; } catch { return ''; } })();

function 回(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(body) });
  res.end(body);
}

export function registerInfoApi(ctx) {
  const handler = (req, res) => {
    const u = new URL(req.url || '/', 'http://127.0.0.1');
    if (u.pathname === `${ROUTE}/api/info`) return 回(res, 200, { ok: true, version: VERSION });
    return 回(res, 404, { ok: false, error: 'not found' });
  };
  ctx.webServer.register({ kind: 'prefix', path: ROUTE, handler });
}
