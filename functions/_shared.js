// Helpers shared by the proxy functions.
//
// The whole point of these functions is that the browser never learns which
// origin actually serves the data. Both hosts come from Pages environment
// variables (CRM_ORIGIN and CDN_ORIGIN), so neither appears in this repository
// nor in anything shipped to the client. If a variable is missing we fail with a
// generic message rather than echoing the configuration back.

export function jsonResponse(body, status = 200, cacheSeconds = 0) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': cacheSeconds > 0
                ? `public, max-age=${cacheSeconds}`
                : 'no-store',
            // Nothing here should ever be framed or sniffed.
            'x-content-type-options': 'nosniff',
        },
    });
}

export function requireOrigin(value, name) {
    if (typeof value !== 'string' || !value.trim()) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    // Throws on a malformed value, which is what we want at request time.
    return new URL(value.trim()).origin;
}

// Origins are secrets here, so log the failure without reproducing them.
export function upstreamFailure() {
    return jsonResponse({ error: 'Serviço temporariamente indisponível.' }, 502);
}
