import { jsonResponse, requireOrigin, upstreamFailure } from '../_shared.js';

// GET /api/imoveis[?destaque=1][&limit=3]
//
// Returns the MCMV-flagged properties. Two things happen on the way through:
// the site parameter is pinned to "mcmv" so this endpoint can never be coaxed
// into returning the other site's listings, and every image URL is rewritten
// from the upstream CDN host to a same-origin /img/... path. Without that
// rewrite the CDN domain would still show up in every <img src> on the page,
// which defeats the reason this proxy exists.

const CACHE_SECONDS = 300;

export async function onRequestGet(context) {
    const { request, env } = context;

    let crmOrigin;
    let cdnOrigin;
    try {
        crmOrigin = requireOrigin(env.CRM_ORIGIN, 'CRM_ORIGIN');
        cdnOrigin = requireOrigin(env.CDN_ORIGIN, 'CDN_ORIGIN');
    }
    catch {
        return upstreamFailure();
    }

    const incoming = new URL(request.url);
    const upstream = new URL('/api/public/imoveis', crmOrigin);
    upstream.searchParams.set('site', 'mcmv');

    const destaque = incoming.searchParams.get('destaque');
    if (destaque === '1' || destaque === 'true') {
        upstream.searchParams.set('destaque', '1');
    }

    let payload;
    try {
        const response = await fetch(upstream.toString(), {
            headers: { accept: 'application/json' },
            // Let Cloudflare hold the upstream response so a traffic spike on the
            // form page does not turn into a spike of CRM queries.
            cf: { cacheEverything: true, cacheTtl: CACHE_SECONDS },
        });
        if (!response.ok) {
            return upstreamFailure();
        }
        payload = await response.json();
    }
    catch {
        return upstreamFailure();
    }

    const items = Array.isArray(payload?.data) ? payload.data : [];
    let data = items.map(item => rewriteImovel(item, cdnOrigin));

    // Optional cap, used by the home page to show at most three destaques.
    const limit = Number.parseInt(incoming.searchParams.get('limit') || '', 10);
    if (Number.isFinite(limit) && limit > 0) {
        data = data.slice(0, limit);
    }

    return jsonResponse({ data }, 200, CACHE_SECONDS);
}

/** Swap the CDN host for our own /img path, or drop the value if it is foreign. */
function rewriteImageUrl(value, cdnOrigin) {
    if (typeof value !== 'string' || !value) {
        return null;
    }
    // Relative values are already storage keys; serve them through /img as-is.
    if (!value.includes('://')) {
        return `/img/${value.replace(/^\/+/, '')}`;
    }
    if (value.startsWith(`${cdnOrigin}/`)) {
        return `/img/${value.slice(cdnOrigin.length + 1)}`;
    }
    // Anything pointing somewhere we do not control is dropped rather than
    // forwarded — an unexpected host is exactly the leak we are preventing.
    return null;
}

/** Keep only the fields the public site renders, with images pointed at /img. */
function rewriteImovel(item, cdnOrigin) {
    const out = { ...item };

    out.imagem_principal = rewriteImageUrl(item.imagem_principal, cdnOrigin);
    out.imagens = Array.isArray(item.imagens)
        ? item.imagens.map(url => rewriteImageUrl(url, cdnOrigin)).filter(Boolean)
        : [];

    // If the main image was dropped or never set, promote the first gallery image
    // so cards always have something to show.
    if (!out.imagem_principal && out.imagens.length > 0) {
        out.imagem_principal = out.imagens[0];
    }

    return out;
}
