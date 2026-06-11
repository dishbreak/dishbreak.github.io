---
title: How I Rebuilt My Website
layout: post
section-type: post
---

In a [previous post](/blog/2026-06-10-i-rebuilt-my-website), I talked about *why* I was rebuilding my personal site. In this post, I'll talk more about *how* I did it.

My goal here isn't to give a blow-by-blow accounting of how the site was built. The source code is available [on GitHub](https://github.com/dishbreak/dishbreak.github.io), and the documentation sources already out there are quite prolific. Here, I'm going to call out the decisions I made and lay out some reasoning. My goal here isn't to *convince* you that I chose correctly, it's more to lay out my own decisions in the hopes that it'll help you make yours.

I'll lay out each of the decisions one-by-one in order of progression, starting with the actual hosting of the website.

## Static Site Generation

Trust me, as a DevOps person, I know there's plenty of ways to host a site. Largely, these solutions are either *statically* or *dynamically* generated. In dynamically generated sites, software responds to incoming requests. Every page of the site gets generated on-demand. In contrast, in a statically generated site, all the site's pages are generated *a priori*. As such, hosting a static site doesn't require a continually running software application.

I opted to continue keeping this site statically generated for a few reasons.

First, *it's a heckuva lot cheaper*. [GitHub Pages](https://docs.github.com/en/pages) is a completely free resource, and it's followed close behind by plenty of object storage solutions that are quite inexpensive. While it's true that offerings like Vercel have made it way easier to host dynamic websites, they have practical limits and costs can vary based on site traffic. I'm not going to delude myself into thinking that this site will ever have massive traffic, but it's nice to know that my solution will continue to stay inexpensive over time.

Second, my operations background tells me that the trickiest thing about an ongoing software program is *keeping it running*. Even if I used a solution that involved serverless software, I'm not going to get away from maintenance and monitoring, and that's a lot of effort for a personal site. Once a build of my static site succeeds and deploys, I can be fairly certain that it will continue to be available as long as the hosting provider stays online.

Lastly, the blog workflow is totally adequate for posts from a single author. I don't have access to neat features like draft posts or scheduled posts, but I'm also not doing this blogging thing as a pro -- those features just don't bring a ton of value. I'm pretty comfortable pushing my posts as markdown files and committing them to the default branch.

## TypeScript

I decided that whatever solution I used next was going to rely on Typescript. This language has, in my view, become a bit of a *lingua franca* for frontend developers. The backend developer in me isn't ever going to be happy with anything less than strong typing, but TypeScript has done a lot to make development on the web easier and more predictable.

Also, Jekyll, while totally capable, is written in Ruby, and despite multiple efforts to get into the language, I just haven't had luck with it. (Yes, my life during the days of Chef was pretty miserable.)

Lastly, while there are solutions out there like Hugo (which happens to be written in Go, one of my favorite languages), I didn't really see the point in learning how to build a template for one of these generators as opposed to just building the components myself. Web technologies mean that it's easier than ever to build pages in a maintainable way.

## Vite

If I'm going to be using TypeScript to build my site, I'm going to need to rely on a *build system* to package the site into a form that I can deploy and a *local dev server* that will help me preview the site before I push a new commit.

While there's plenty of solutions I can pursue for both functions here, Vite has the advantage of providing basically everything I need (templating new apps, building apps for deployment, local development). I'm pretty green with frontend development, but so far, I'm pretty impressed with what I've experienced. I have the distinct feeling that frontend devs who predate Vite won't find much of a reason to switch from what they're doing today, but for a greenhorn like me, Vite is a nice base to work off of.

## Yarn

Web development has an astonishing number of package manager solutions out there. Yarn is a tool that I've been familiar with for years. It does a better job than npm of resolving dependencies and ensuring security, but it's also not the most performant tool out there.

That said, looking at the time required to adapt to a new release tool, I'd rather invest that time back into the site. This is one of those situations where the status quo is perfectly acceptable. There's an undetermined upside to switching and a definitive downside to staying with a tool I know.

Yes, I recognize that this reads *exactly the opposite* of my thoughts on Vite -- sometimes we're not internally consistent! But also, it's difficult to consider learning a novel solution if you've got a decent mastery of a solution that will get the job done. Sometimes it's worth it to set aside those objections in the name of learning, but I'm not here to learn a new package manager.

## React

This one is a little confusing given the choice of Vite. Why React, when the authors of Vue.js wrote Vite? Thanks to solutions like React Native and Electron, I have access to a lot of development opportunities by way of skills with React components. I see a stronger return on my investment if I invest in React development skills, and I see many more options to put those skills to use.

## React Router v7

From what I've heard about React Router, it's quite...polarizing. While some folks *love* it, others are quite wary of it because of its development history. The maintainers of the project have been prone to introduce major semantic changes with each major revision of the application. Indeed, when I initially researched Router, I sort of bounced off the documentation. However, React Router does l have support for static site generation, and it ultimately ended up being pretty straightforward to use it to hydrate templates.

There is a risk that, in the near future, React Router will release a v8 revision that is totally incompatible with v7. While that wouldn't be great, the good news is that I should be able to port my site to any solution that supports React components if that happens -- that's definitely not as true for me as a Jekyll or Hugo user.

## Wrapup

I ended up building a statically generated website using Vite and React Router. This website isn't the most exciting and dynamic piece of content out there, but it's something I wrote from scratch and made my own. Hopefully, reading some of my thoughts on the decisions I made building this site will help inform the decisions you make in your own projects.
