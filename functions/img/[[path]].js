import { requireOrigin, upstreamFailure } from '../_shared.js';

// GET /img/<storage key>
//
// Streams a property image from the upstream CDN under our own domain. This is
// the other half of hiding the origin: /api/imoveis rewrites the URLs to point
// here, and this function is what actually serves the bytes, so the CDN host
// never appears in the page or in the network panel.

const CACHE_SECONDS = 86400;

// Images only. Anything else is a sign the path was tampered with.
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg', 'mp4', 'webm']);

export async function onRequestGet(context) {
    const { params, env } = context;

    let cdnOrigin;
    try {
        cdnOrigin = requireOrigin(env.CDN_ORIGIN, 'CDN_ORIGIN');
    }
    catch {
        return upstreamFailure();
    }

    const segments = Array.isArray(params.path) ? params.path : [params.path];
    // Reject traversal attempts and empty segments before rebuilding the key.
    if (segments.some(segment => !segment || segment === '.' || segment === '..')) {
        return new Response('Not found', { status: 404 });
    }

    const key = segments.map(segment => encodeURIComponent(decodeURIComponent(segment))).join('/');
    const extension = key.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
        return new Response('Not found', { status: 404 });
    }

    let upstream;
    try {
        upstream = await fetch(`${cdnOrigin}/${key}`, {
            cf: { cacheEverything: true, cacheTtl: CACHE_SECONDS },
        });
    }
    catch {
        return upstreamFailure();
    }

    if (!upstream.ok) {
        return new Response('Not found', { status: 404 });
    }

    // Rebuild the response rather than forwarding it, so no upstream header
    // (server, x-amz-*, and friends) can hint at where the file came from.
    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) {
        headers.set('content-type', contentType);
    }
    const contentLength = upstream.headers.get('content-length');
    if (contentLength) {
        headers.set('content-length', contentLength);
    }
    headers.set('cache-control', `public, max-age=${CACHE_SECONDS}, immutable`);
    headers.set('x-content-type-options', 'nosniff');

    return new Response(upstream.body, { status: 200, headers });
}
