/**
 * math-mastery 公众号草稿一键上传
 * 流程：access_token → 上传二维码(uploadimg) → 上传封面(永久素材) → draft/add
 */
'use strict';
const fs = require('fs');
const path = require('path');

const APPID = 'wx8ee3cd357c6cdd2e';
const APPSECRET = '9c18a4acfff6f2af2f80f96f59d8c361';
const BASE = 'https://api.weixin.qq.com/cgi-bin';
const DIR = __dirname;
const CACHE = path.join(DIR, 'token_cache.json');
const QR_FILE = path.join(DIR, 'assets', 'wechat-group-qrcode.jpg');
const COVER_FILE = path.join(DIR, 'shots', '2-learn-chicken.png');
const CONTENT_FILE = path.join(DIR, 'content-wechat.html');

const TITLE = 'math-mastery 又更新了：AI 诊断 + 手机直开 + 交流群开放';
const AUTHOR = 'keno王';
const DIGEST = '免费开源的中小学数学方法学习工具：本地 AI 知识漏洞诊断、个性化出题、手机点开即用。喜欢请点 Star ⭐';

async function getToken() {
  try {
    const c = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
    if (c.access_token && Date.now() < c.expires_at - 60000) return c.access_token;
  } catch (_) {}
  const url = `${BASE}/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const d = await (await fetch(url)).json();
  if (!d.access_token) throw new Error(`token 失败: ${JSON.stringify(d)}`);
  fs.writeFileSync(CACHE, JSON.stringify({ access_token: d.access_token, expires_at: Date.now() + (d.expires_in || 7200) * 1000 }));
  return d.access_token;
}

async function uploadForm(token, api, filePath, extraQuery) {
  const buf = fs.readFileSync(filePath);
  const form = new FormData();
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'application/octet-stream';
  form.append('media', new Blob([buf], { type: mime }), path.basename(filePath));
  const u = new URL(`${BASE}/${api}`);
  u.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(extraQuery || {})) u.searchParams.set(k, v);
  const resp = await fetch(u, { method: 'POST', body: form });
  return resp.json();
}

(async () => {
  const token = await getToken();
  console.log('1) access_token OK');

  const qrRes = await uploadForm(token, 'media/uploadimg', QR_FILE);
  if (!qrRes.url) throw new Error(`uploadimg 失败: ${JSON.stringify(qrRes)}`);
  console.log('2) 二维码已上传 mmbiz:', qrRes.url.slice(0, 60) + '...');

  const covRes = await uploadForm(token, 'material/add_material', COVER_FILE, { type: 'image' });
  if (!covRes.media_id) throw new Error(`add_material 失败: ${JSON.stringify(covRes)}`);
  console.log('3) 封面素材 OK:', covRes.media_id);

  let content = fs.readFileSync(CONTENT_FILE, 'utf8');
  const m = content.match(/<body>([\s\S]*)<\/body>/i);
  if (m) content = m[1].trim();
  const qrImg = `<img src="${qrRes.url}" style="width:62%; display:block; margin:6px auto 16px; border-radius:8px;" alt="Math 数学软件交流群二维码">`;
  content = content.replace('__QR_IMG__', qrImg);
  if (content.includes('__QR_IMG__')) throw new Error('二维码占位符未替换');

  const draftUrl = `${BASE}/draft/add?access_token=${encodeURIComponent(token)}`;
  const body = {
    articles: [{
      title: TITLE, author: AUTHOR, digest: DIGEST, content,
      thumb_media_id: covRes.media_id, need_open_comment: 1, only_fans_can_comment: 0
    }]
  };
  const d = await (await fetch(draftUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })).json();
  if (d.errcode && d.errcode !== 0) throw new Error(`draft/add 失败: ${JSON.stringify(d)}`);
  console.log('5) 草稿创建成功! media_id =', d.media_id);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
