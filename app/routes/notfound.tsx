import { PageHeader } from "~/components/PageHeader";
import type { Route } from "./+types/notfound";

export default function NotFound({ }: Route.ComponentProps): React.JSX.Element {
    return <div className="p-5 w-full flex flex-col justify-center items-center">
        <title>Whoops!</title>
        <PageHeader>Whoops!</PageHeader>
        <div>That page doesn't seem to exist.</div>
    </div>
}
