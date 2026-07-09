import React from 'react'

export function PageWrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <div className="ml-20 mr-10 max-sm:mx-2">
        {children}
    </div>
}
