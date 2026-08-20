import { jsonResponse, requireOrigin, upstreamFailure } from '../_shared.js';

// POST /api/lead
//
// Forwards a "cadastro para análise" submission to the CRM's MCMV webhook. The
// browser posts here, to its own origin, and never learns where the lead
// actually lands.

// Only these keys are forwarded. An allow-list rather than a pass-through, so a
// crafted request cannot smuggle extra fields into the CRM's lead record.
const ALLOWED_FIELDS = [
    'nome',
    'email',
    'telefone',
    'cpf',
    'renda',
    'estado_civil',
    'fgts',
    'dependentes',
    'emprego',
    'midia',
];

const MAX_FIELD_LENGTH = 500;

export async function onRequestPost(context) {
    const { request, env } = context;

    let crmOrigin;
    try {
        crmOrigin = requireOrigin(env.CRM_ORIGIN, 'CRM_ORIGIN');
    }
    catch {
        return upstreamFailure();
    }

    let submitted;
    try {
        submitted = await readSubmission(request);
    }
    catch {
        return jsonResponse({ error: 'Não foi possível ler o formulário.' }, 400);
    }

    const body = {};
    for (const field of ALLOWED_FIELDS) {
        const value = submitted[field];
        if (typeof value === 'string' && value.trim()) {
            body[field] = value.trim().slice(0, MAX_FIELD_LENGTH);
        }
    }

    if (!body.nome || !body.telefone) {
        return jsonResponse({ error: 'Nome e telefone são obrigatórios.' }, 400);
    }

    try {
        const response = await fetch(new URL('/api/webhooks/site/mcmv', crmOrigin).toString(), {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return upstreamFailure();
        }

        // Deliberately not returning the upstream body: it carries the CRM's lead
        // id, which the page has no use for.
        return jsonResponse({ success: true }, 200);
    }
    catch {
        return upstreamFailure();
    }
}

/** Accepts both a JSON body and a classic form POST. */
async function readSubmission(request) {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return await request.json();
    }
    const form = await request.formData();
    return Object.fromEntries(form.entries());
}
