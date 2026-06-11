---
title: I Rebuilt My Website!
layout: post
section-type: post
---

Hi there. Yesterday, I replaced the previous version of my website with a brand new one. Given that this site is ostensibly a blog, I figured it was a great time to author my first new post in quite literally _years_.

## Why Even Have a Personal Website?

I've had a blog in some form or fashion for more than 2 decades. At some point, though, I decided that I was done using other people's platforms to create my own content. 

Over time, I've found less and less value out of hosting my blog on another platform. Having a personal space means that I can host all kinds of content. Not only can I host blog posts like this one for point-in-time content, I can also have space for other sorts of content, like recipes, a professional summary, etc. Also, it's a fun flex to have my own site. :)

## Why Rebuild the Site?

The previous version of my site relied on Jekyll to render the site. Jekyll is nice because Github natively supports it. But...the template I used is nearly a decade old and parts of it have been kind-of broken for a long, long time.

While I likely could have updated the template or moved to a newer Jekyll template, that would either require me to dive into the guts of a template that I never wrote, or migrate all my data to a new template.

## How'd You Rebuild It?

I'll use a follow-up post to describe more of the technical details, but I ended up creating a pre-rendered site using React Router on top of Vite. I opted to do this because I wanted more control over the actual site layout itself, and I didn't want to align with any specific template.

It hopefully will have a better shot at staying up-to-date (famous last words...) without the intermediate layer of someone else's template.
