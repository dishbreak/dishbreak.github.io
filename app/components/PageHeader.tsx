import React from "react";

export interface Props {
    children: React.ReactNode
    className?: string
}

export function PageHeader({ children, className = "" }: Props): React.JSX.Element {
    return <div className={`font-bold text-5xl text-orange-400 ${className}`}>{children}</div>
}
