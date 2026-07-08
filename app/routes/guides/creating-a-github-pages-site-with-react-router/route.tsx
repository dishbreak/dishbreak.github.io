import React from "react";

import Content, { tableOfContents } from './content.mdx'
import { markdownStyle } from "~/markdownStyle";
import { TableOfContents } from "~/components/TableOfContents";
import { title } from "./meta";

export default function Route(): React.JSX.Element {
    return <div>
        <title>{title}</title>
        <div>
            <h1 className="text-4xl font-bold mt-4 mb-2 text-orange-400">{title}</h1>
        </div>
        <TableOfContents items={tableOfContents} />
        <div className={markdownStyle}>
            <Content />
        </div>
    </div>
}
