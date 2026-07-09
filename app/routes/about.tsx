import type React from 'react';
import { type Route } from './+types/about'
import mypic from "../assets/my_pic.jpg"
import { promises } from 'fs';
import sanitize from 'sanitize-html';
import { marked } from 'marked';

export async function loader({ }: Route.LoaderArgs): Promise<string> {
    const contents = await promises.readFile("./data/about.md", 'utf-8')
    const cleanHTML = sanitize(await marked.parse(contents))
    return cleanHTML
}

export default function About({ loaderData }: Route.ComponentProps): React.JSX.Element {
    return <div className='my-10'>
        <title>About Me</title>
        <div className='flex w-full justify-center items-center max-md:flex-col-reverse'>
            <div className='lg:text-8xl text-6xl max-md:pt-4 text-orange-400 font-bold sm:mr-10'>Hi, I'm Vishal.</div>
            <img src={mypic} className='rounded-full w-80'></img>
        </div>
        <div
            dangerouslySetInnerHTML={{ __html: loaderData }}
            className="markdown" />
    </div>
}
