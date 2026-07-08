import type { Toc } from "@stefanprobst/rehype-extract-toc";
import React from "react";

export interface Props {
    items: Toc
}

function TocHelper({ items }: Props): React.JSX.Element {
    return <ul>
        {
            items.map((it, idx) => (
                <li key={`toc-${it.id ?? `${it.depth}-${idx}`}`} className="pl-5 m-0.5">
                    <a href={`#${it.id ?? ""}`}>{it.value}</a>
                    {it.children && <TocHelper items={it.children} />}
                </li>
            ))
        }
    </ul>
}

export function TableOfContents({ items }: Props): React.JSX.Element {
    return <div>
        <TocHelper items={items} />
    </div>
}
