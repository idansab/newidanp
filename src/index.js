/**
 * travidan Worker — static assets + protected admin API
 *
 * Endpoints:
 *   GET  /api/places           → { ok, count, places }   (public read)
 *   POST /api/places           → replace all places      (requires X-Admin-Token)
 *   POST /api/upload           → upload image to KV      (requires X-Admin-Token)
 *
 * Auth: the admin token is stored in a Worker Secret named ADMIN_TOKEN.
 * Every POST must include header `X-Admin-Token: <secret>`.
 * Reads are public (the site needs them); writes are protected.
 */

const PLACES_KEY = 'places';
const UPLOAD_PREFIX = 'upload:';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // ── API routes ─────────────────────────────────────────────
    if (pathname === '/api/health') {
      return json({ ok: true, time: new Date().toISOString() });
    }

    if (pathname === '/api/places') {
      if (request.method === 'GET') {
        return handleGetPlaces(env);
      }
      if (request.method === 'POST') {
        if (!isAuthorized(request, env)) return unauthorized();
        return handlePostPlaces(request, env);
      }
      return methodNotAllowed();
    }

    if (pathname === '/api/upload' && request.method === 'POST') {
      if (!isAuthorized(request, env)) return unauthorized();
      return handleUpload(request, env, url);
    }

    // ── Uploaded images from KV ────────────────────────────────
    if (pathname.startsWith('/assets/uploads/') && request.method === 'GET') {
      const key = 'upload:' + pathname.slice('/assets/uploads/'.length);
      const val = await env.PLACES.get(key, 'arrayBuffer');
      if (val === null) return new Response('Not found', { status: 404 });
      return new Response(val, {
        headers: {
          'Content-Type': contentTypeFor(pathname),
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    }

    // ── Static assets ──────────────────────────────────────────
    // Serve from the assets binding (public/ directory).
    // If an asset exists, it's returned; otherwise the configured
    // not_found_handling (404-page) applies.
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response('Not found', { status: 404 });
  }
};

function isAuthorized(request, env) {
  const supplied = request.headers.get('X-Admin-Token') || '';
  const expected = env.ADMIN_TOKEN || '';
  if (!expected) return false; // no secret configured → deny all writes
  // constant-time compare
  if (supplied.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < supplied.length; i++) {
    diff |= supplied.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

async function handleGetPlaces(env) {
  const raw = await env.PLACES.get(PLACES_KEY);
  let places = [];
  if (raw) {
    try { places = JSON.parse(raw); } catch (e) { places = []; }
  }
  if (!Array.isArray(places)) places = [];
  return json({ ok: true, count: places.length, places });
}

async function handlePostPlaces(request, env) {
  try {
    const body = await request.text();
    const places = JSON.parse(body);
    if (!Array.isArray(places)) {
      return json({ ok: false, error: 'Body must be an array of places' }, 400);
    }
    // Sanitize: keep only objects, drop nulls
    const clean = places.filter(p => p && typeof p === 'object');
    await env.PLACES.put(PLACES_KEY, JSON.stringify(clean));
    return json({ ok: true, count: clean.length, places: clean });
  } catch (e) {
    return json({ ok: false, error: 'Invalid JSON body: ' + e.message }, 400);
  }
}

async function handleUpload(request, env, url) {
  try {
    const contentType = request.headers.get('Content-Type') || '';
    const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
    if (!contentType.startsWith('multipart/form-data') || !boundaryMatch) {
      return json({ ok: false, error: 'Expected multipart/form-data' }, 400);
    }
    const boundary = boundaryMatch[1];
    const body = await request.arrayBuffer();
    const parts = parseMultipart(new Uint8Array(body), boundary);

    const filePart = parts.find(p => p.name === 'image' || p.name === 'imageFile' || p.name === 'f_image');
    if (!filePart) {
      return json({ ok: false, error: 'No image file found (expected field "image")' }, 400);
    }

    // Sanitize filename, keep extension
    const safeName = (filePart.filename || 'upload').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const key = UPLOAD_PREFIX + Date.now() + '-' + safeName;

    await env.PLACES.put(key, filePart.content, {
      metadata: { contentType: filePart.contentType || 'application/octet-stream' }
    });

    return json({ ok: true, url: `/assets/uploads/${key.slice(UPLOAD_PREFIX.length)}` });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

// ── tiny multipart parser (single file, name="image") ─────────
function parseMultipart(body, boundary) {
  const parts = [];
  const boundaryBuf = new TextEncoder().encode('--' + boundary);
  const sep = new TextEncoder().encode('\r\n');
  let pos = 0;

  while (pos < body.length) {
    const start = indexOf(body, boundaryBuf, pos);
    if (start === -1) break;
    let next = indexOf(body, boundaryBuf, start + boundaryBuf.length);
    if (next === -1) next = body.length;
    // section = between the CRLF after boundary and CRLF before next boundary
    let sectionStart = start + boundaryBuf.length;
    if (body[sectionStart] === sep[0] && body[sectionStart + 1] === sep[1]) sectionStart += 2;
    let sectionEnd = next - 1;
    if (sectionEnd > sectionStart && body[sectionEnd - 1] === sep[1] && body[sectionEnd - 2] === sep[0]) sectionEnd -= 2;
    if (sectionEnd < sectionStart) { pos = next; continue; }

    const section = body.slice(sectionStart, sectionEnd);
    const headerEnd = indexOf(section, new TextEncoder().encode('\r\n\r\n'));
    if (headerEnd === -1) { pos = next; continue; }

    const headerText = new TextDecoder().decode(section.slice(0, headerEnd));
    const content = section.slice(headerEnd + 4);

    const nameMatch = headerText.match(/name="([^"]+)"/);
    const filenameMatch = headerText.match(/filename="([^"]+)"/);
    const ctMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);
    if (nameMatch && filenameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: filenameMatch[1],
        contentType: ctMatch ? ctMatch[1].trim() : 'application/octet-stream',
        content
      });
    }
    pos = next;
  }
  return parts;
}

function indexOf(haystack, needle, from = 0) {
  outer:
  for (let i = from; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

function contentTypeFor(pathname) {
  const ext = pathname.split('.').pop().toLowerCase();
  const map = {
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    ico: 'image/x-icon'
  };
  return map[ext] || 'application/octet-stream';
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function unauthorized() {
  return json({ ok: false, error: 'Unauthorized — missing or invalid X-Admin-Token' }, 401);
}

function methodNotAllowed() {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}