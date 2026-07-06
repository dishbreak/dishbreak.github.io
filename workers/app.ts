interface Env {
    ASSETS: Fetcher
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        const shell = await env.ASSETS.fetch(
            new Request(new URL("/__spa-fallback", url.origin), request)
        )

        return new Response(shell.body, {
            status: 200,
            headers: shell.headers
        })
    },
} satisfies ExportedHandler<Env>;
