import React from 'react'

export function PageHeader({ children, size = "text-5xl" }: { children: React.ReactNode, size?: string }): React.JSX.Element {
    return <div className={`font-bold ${size} text-orange-400`}>
        {children}
    </div>
}
