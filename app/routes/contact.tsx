import type React from "react";
import type { Route } from "./+types/contact";
import { PageHeader } from "~/components/PageHeader";

export default function Contact({ }: Route.ComponentProps): React.JSX.Element {
    return <div className="mx-20 my-10">
        <title>Contact Me</title>
        <PageHeader>Contact Me</PageHeader>
        <p className="pb-1.5">You can contact me in the following ways:</p>
        <div>
            <ContactMethod headline="Email">dishbreak (at) gmail (dawt) com</ContactMethod>
            <ContactMethod headline="LinkedIn"><a className="text-orange-400" href="https://linkedin.com/in/vishalkotcherlakota">Vishal Kotcherlakota</a></ContactMethod>
            <ContactMethod headline="Github"><a className="text-orange-400" href="https://github.com/dishbreak">@dishbreak</a></ContactMethod>
        </div>
    </div>
}

function ContactMethod({ children, headline }: { children: React.ReactNode, headline: string }): React.JSX.Element {
    return <p className="py-0.5"><span className="font-bold">{headline}</span> {children}</p>
}
