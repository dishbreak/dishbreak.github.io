import React from "react";

export interface Props {
    children: React.ReactNode
    collapsible?: boolean
    headline: string
}

export function Aside({ collapsible = true, children, headline }: Props): React.JSX.Element {
    return <div>
        <div className="text-xl font-bold">{headline}</div>
        {children}
    </div>
}
