import { writeFileSync } from "fs"

const title = process.argv[2]

const today = new Date()
const cleanTitle = title.replace(/\W+/g, '-').toLowerCase().substring(0, 40).replace(/-+$/, "")
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const date = String(today.getDate()).padStart(2, '0')
const slug = [year, month, date, cleanTitle].join("-")

const contents = `---
title: ${title}
layout: post
section-type: post
---

Let's start writing!

`

writeFileSync(`posts/${slug}.md`, contents)
