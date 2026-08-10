import { promises } from "fs";
import { type Resume, ResumeSchema } from "../../lib/resume";
import { type Route } from "./+types/experience"
import { parse } from "yaml"
import { PageHeader } from "~/components/PageHeader";

export async function loader({ }: Route.LoaderArgs): Promise<Resume> {
    const rawText = await promises.readFile("data/resume.yaml", "utf-8")
    return ResumeSchema.parse(parse(rawText))
}

export default function Experience({ loaderData }: Route.ComponentProps): React.JSX.Element {
    return <div className="mx-10 pb-10">
        <title>My Experience</title>
        <PageHeader>{loaderData.name}</PageHeader>
        <Heading>Objective</Heading>
        <P>{loaderData.objective}</P>

        <div className="flex max-sm:flex-col">
            <div className="sm:flex-2/3 sm:mr-5">
                <Heading>Professional Summary</Heading>
                <BulletList>
                    {loaderData.summary.map((d, i) => <li key={`summary-${i}`}>{d}</li>)}
                </BulletList>
                <Heading>Key Achievements</Heading>
                <BulletList>
                    {loaderData.key_achievements.map((a, i) => <li key={`ka-${i}`}>{a}</li>)}
                </BulletList>
            </div>
            <div className="sm:flex-1/3">
                <Heading padding="pt-8 pb-2">Skills</Heading>
                <div className="max-sm:flex">
                    <Card>
                        <Heading size="text-xl" padding="pt-2 pb-1">Languages</Heading>
                        <BulletList>
                            {loaderData.skills.languages.map((l, i) => <li key={`lang-${i}`}>{l}</li>)}
                        </BulletList>
                    </Card>
                    <Card>
                        <Heading size="text-xl" padding="pt-2 pt-1">Tools</Heading>
                        <BulletList>
                            {loaderData.skills.tools.map((t, i) => <li key={`tool-${i}`}>{t}</li>)}
                        </BulletList>
                    </Card>
                </div>
            </div>
        </div>
        <Heading>Experience</Heading>
        {
            loaderData.experience.map((o, i) => <div key={`org=${i}`} className="p-4 mb-10 shadow-lg shadow-orange-300/15 bg-stone-900">
                <div
                    className="text-2xl font-bold text-orange-300"
                >{o.org} {toMonthYearRange(o)}</div>
                {o.truncated && <div className="text-xl font-bold text-orange-300 pt-2 pb-2">Selected Highlights</div>}
                {
                    o.positions.map((p, j) => <div key={`pos-${i}-${j}`}>
                        <Heading size="text-xl">
                            {p.position} {toMonthYearRange(p)}
                        </Heading>
                        <BulletList>
                            {p.key_points.map((d, k) =>
                                <li key={`summary-${i}-${j}-${k}`}>{d}</li>)}
                        </BulletList>
                        <p className="pt-2">
                            <span className="font-bold text-orange-300">Key Technologies: </span>
                            {p.key_technologies.join(", ")}
                        </p>
                    </div>)
                }
            </div>)
        }
        <Heading>Keywords</Heading>
        {loaderData.keywords.join(", ")}
    </div>
}



function toMonthYearRange({ startDate, endDate }: { startDate: string, endDate?: string }): string {
    return `(${toMonthYear(startDate)} - ${toMonthYear(endDate)})`
}

function toMonthYear(d: string | undefined): string {
    if (d === undefined) return "Present"
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(d))
}

function Heading({ children, size = "text-3xl", padding = "pt-8 pb-4" }: { children: React.ReactNode, size?: string, padding?: string }): React.JSX.Element {
    return <div className={`font-bold text-orange-300 ${size} ${padding}`}>{children}</div>
}

function P({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <p className="pb-3">{children}</p>
}

function BulletList({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <ul className="list-disc list-outside ml-6">
        {children}
    </ul>
}

function Card({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <div className={["max-sm:p-4",
        "max-sm:flex-1",
        "max-sm:bg-stone-900",
        "max-sm:shadow-orange-300/15",
        "max-sm:shadow-md",].join(" ")}>
        {children}
    </div>
}
