import { Link, NavLink, Outlet, type NavLinkRenderProps } from "react-router";
import { links } from "../../lib/links";
import { useState } from "react";

export default function NavBar(): React.JSX.Element {
    const [isHidden, setIsHidden] = useState(true)
    return <div>
        <nav className="w-full">
            <div className="w-full flex top-0 sticky z-100 bg-stone-700 border-t-4 border-orange-500 text-orange-400">
                <Link to="/" className="flex grow ml-1.5 xl:ml-10 p-2 hover:text-stone-700 hover:bg-orange-400">
                    VISHAL KOTCHERLAKOTA
                </Link>
                <div className="max-sm:hidden">
                    <NavLinks />
                </div>
                <button
                    onClick={() => setIsHidden(!isHidden)}
                    className="mr-2 my-0.5 p-1 rounded-sm bg-stone-800 text-orange-400 sm:hidden hover:bg-stone-500 hover:text-orange-300">
                    <span className="sr-only">Open navigation menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>
            </div>
            <div className="sm:hidden">
                <div className={`bg-stone-700 ${isHidden ? "hidden": ""} flex flex-col text-orange-400`}>
                    <NavLinks />
                </div>
            </div>

        </nav>
        <Outlet />
    </div>
}

function NavLinks(): React.JSX.Element {
    return <>
        <NavLink to="/" end className={getClassName}>HOME</NavLink>
        {
            links.map((n, i) => <NavLink key={`nav-bar-${i}`} to={`/${n}`} className={getClassName}>{n.toUpperCase()}</NavLink>)
        }
    </>
}

function getClassName({ isActive }: NavLinkRenderProps): string {
    const prefix = "p-2 hover:text-stone-700 hover:bg-orange-400"
    return `${prefix} ${isActive ? "text-stone-700 bg-orange-500" : ""}`
}
