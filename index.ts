import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

// Proxy
const host_url = "https://small-chicken-97.deno.dev"
const target_url = "https://www.1337x.com"

async function handler(_req: Request): Response {
    // replace url
    var url = new URL(_req.url.replace(host_url, target_url));
    console.log("Fetching url: " + url);
    const r = await fetch(url, {
        // headers:
        headers: _req.headers,
        method: _req.method,
        redirect: _req.redirect,
    });
    // Return
    var res = await r.text();
    res = res.replace(target_url, host_url);
    return new Response(res, {
        status: r.status,
        headers: r.headers
    });
}

console.log("Listening on http://localhost:8000");
serve(handler);
