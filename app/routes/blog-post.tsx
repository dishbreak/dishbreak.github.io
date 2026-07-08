import { type Route } from "./+types/blog-post";
import type React from "react";
import { loadPost, type Post } from "../../lib/posts";
import { markdownStyle } from "../markdownStyle";

export async function loader({ params }: Route.LoaderArgs): Promise<Post> {
    return await loadPost(params.slug);
}


export default function Blog({ loaderData }: Route.ComponentProps): React.JSX.Element {
    const title = loaderData.attrs["title"] ?? "(untitled post)"
    return <div className="ml-20 mr-10 max-sm:mx-2">
        <title>{title}</title>
        <div>
            <h1 className="text-4xl font-bold mt-4 mb-2 text-orange-400">{title}</h1>
        </div>
        <div className="text-orange-300">
            posted {loaderData.posted.toLocaleDateString()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: loaderData.cleanHTML }}
            className={markdownStyle} />
    </div>
}
