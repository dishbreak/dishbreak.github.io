import React from "react";
import type { Route } from './+types/_index'
import { Link } from "react-router";
import { PageHeader } from "~/components/PageHeader";



type Guide = {
    slug: string;
    title: string;
};

type Guides = Array<Guide>

// Guide modules are runtime-selected by slug, but knowable at author time:
// Vite resolves this glob at build so the dependency graph stays visible while
// each guide's `title` export is still loaded lazily.
const guideModules = import.meta.glob<{ title?: string }>("./*/meta.ts", {
    eager: true
})

export async function loader({ }: Route.LoaderArgs): Promise<Guides> {
    const guides: Guides = []

    for (const [path, loadModule] of Object.entries(guideModules)) {
        const match = path.match(/^\.\/(.+)\/meta\.ts$/)
        if (!match) {
            continue
        }
        const slug = match[1]
        const title = loadModule.title ?? "untitled"
        guides.push({ slug, title })
    }

    return guides
}

export default function Route({ loaderData }: Route.ComponentProps): React.JSX.Element {
    return <div className="mx-20 my-10 max-sm:m-5">
        <title>Guides</title>
        <PageHeader>Guides</PageHeader>
        <p className="pt-3">Guides are a little different from blog posts. Where blog posts are point-in-time writings, guides are where I go in-depth on topics and try to unpack what I know.</p>

        <ul className="px-2 py-3">
            {loaderData.map((it: Guide, idx: number) => <li key={`guide-${idx}`} className="py-1.5 text-orange-300"><Link to={`/guides/${it.slug}`}>{it.title}</Link></li>)}
        </ul>
    </div>
}
