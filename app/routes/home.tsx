import type { Route } from "./+types/home";
import herobg from "../assets/herobg.jpg"
import { Link } from "react-router";
import { links } from "../../lib/links";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Vishal Kotcherlakota" },
        { name: "description", content: "Personal Website and Blog" },
    ];
}

export default function Home() {
    return <div
        className="flex flex-col justify-center items-center w-full h-screen"
        style={{
            backgroundImage: `url("${herobg}")`
        }}>
        <div className="w-full">
            <div className="py-4 px-15 w-full bg-stone-700/80">
                <div className="text-stone-300 text-5xl">Vishal Kotcherlakota</div>
            </div>
            <div className="px-10 w-full bg-stone-500 text-orange-400 text-2xl flex max-sm:flex-col justify-end">
                {links.map((n, i) => <Link to={`/${n}`} key={`link-${i}`} className="p-2 hover:bg-orange-400 hover:text-stone-700 hover:cursor-pointer" style={{ opacity: 1 }}>{n.toUpperCase()}</Link>)}
            </div>
        </div>
    </div>
}
