import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

// Proxy
const host_name  = "small-chicken-97.deno.dev";
const target_name =  "1337x.to"

const host_url = "https://" + host_name;
const target_url = "https://" + target_name;


async function handler(_req: Request): Response {
    // replace url
    var url = new URL(_req.url.replace(host_name, target_name));
    console.log("Fetching url: " + url);
    const r = await fetch(url, {
        // headers:
        headers: _req.headers,
        method: _req.method,
        redirect: _req.redirect,
    });

    // Log
    console.log("Response: [" + r.status + "]");
    
    // Return
    var res = await r.text();

    // Check null and replace
    res = res === null? '': res.replace(target_name, host_name);
    res = await removeAds(res);
    // Response
    return new Response(res, {
        status: r.status === null? 200: r.status,
        headers: r.headers
    });
}

console.log("Listening on http://localhost:8000");
serve(handler);
