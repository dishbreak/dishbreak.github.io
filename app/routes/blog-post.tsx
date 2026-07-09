import { type Route } from "./+types/blog-post";
import type React from "react";
import { loadPost, type Post } from "../../lib/posts";
import { PageHeader } from "~/components/PageHeader";
import { PageWrapper } from "~/components/PageWrapper";

export async function loader({ params }: Route.LoaderArgs): Promise<Post> {
    return await loadPost(params.slug);
}


export default function Blog({ loaderData }: Route.ComponentProps): React.JSX.Element {
    const title = loaderData.attrs["title"] ?? "(untitled post)"
    return <PageWrapper>
        <title>{title}</title>
        <PageHeader>{title}</PageHeader>
        <div className="text-orange-300">
            posted {loaderData.posted.toLocaleDateString()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: loaderData.cleanHTML }}
            className="markdown" />
    </PageWrapper>
}
