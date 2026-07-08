# Why the guide titles all showed up as "untitled"

This is a walkthrough of a real bug we hit in `app/routes/guides/route.tsx`. If
you're newish to TypeScript, this one is a great teaching example because the
code *looked* correct, never crashed, and still did the wrong thing.

## What the page is supposed to do

The `/guides` page lists every guide with a clickable title. Each guide lives in
its own folder:

```
app/routes/guides/
├── route.tsx                                   <- the list page (the buggy file)
└── creating-a-github-pages-site-with-react-router/
    ├── route.tsx                               <- one guide
    └── content.mdx
```

Every guide's `route.tsx` exports its own title:

```ts
// app/routes/guides/creating-a-github-pages-site-with-react-router/route.tsx
export const title = "Building a Github Pages Site with React Router"
```

So the list page needs to:

1. Find every guide folder.
2. Open each guide's `route.tsx` and read its `title` export.
3. Show the titles as links.

## The buggy code

```ts
export async function loader() {
    const guides = []

    // Step 1: list the folders inside app/routes/guides
    const guidesDir = await promises.opendir("app/routes/guides")
    for await (const g of guidesDir) {
        if (g.isFile()) continue        // skip files, keep folders
        const slug = g.name
        let title = ""
        try {
            // Step 2: load the guide and read its title
            const routeModule = await import(`./app/routes/guides/${g.name}/route.js`)
            title = routeModule.title as string
        } catch {
            title = "untitled"          // <- everything ended up here
        }
        guides.push({ slug, title })
    }
    return guides
}
```

Every single guide came back as `"untitled"`. Why?

## The core bug: two different kinds of "path"

Here is the key idea. There are **two different ways to point at a file**, and
they are *not* the same:

| Where the path is measured from | Example | Who uses it |
| --- | --- | --- |
| The folder you ran the program from (the "current working directory", or CWD) | `"app/routes/guides"` | `fs` functions like `opendir` |
| The file the code is written in (the module) | `"./route.tsx"` | `import(...)` |

Look at the two lines again:

```ts
await promises.opendir("app/routes/guides")            // measured from the project root — CORRECT
await import(`./app/routes/guides/${g.name}/route.js`) // measured from THIS file — WRONG
```

`opendir` reads the folder relative to where the build is running (the project
root), so `"app/routes/guides"` is right.

But `import(...)` is relative to **the file it's written in**, which already *is*
`app/routes/guides/route.tsx`. The leading `./` means "start from my own
folder." So the path the computer actually tried to open was:

```
app/routes/guides/  +  app/routes/guides/<slug>/route.js
= app/routes/guides/app/routes/guides/<slug>/route.js
```

That folder doesn't exist. The author copy-pasted the `opendir` path into the
`import`, not realizing the two are measured from different starting points.

The correct import only needed the part *after* the current folder:

```ts
await import(`./${g.name}/route.js`)
```

## Why it failed silently (the sneaky part)

Notice the `try/catch`:

```ts
try {
    const routeModule = await import(`./app/routes/guides/${g.name}/route.js`)
    title = routeModule.title as string
} catch {
    title = "untitled"
}
```

When the import failed, the error was **caught and thrown away**, and the code
quietly used `"untitled"` instead. So there was no red error in the console, no
crash — just wrong text on the page.

**Lesson:** a `catch` block that hides the error makes bugs invisible. When
you're debugging something like this, temporarily log the error so you can see
what actually went wrong:

```ts
} catch (err) {
    console.error(`Could not load guide "${g.name}":`, err)
    title = "untitled"
}
```

That one `console.error` would have printed a "module not found" error pointing
straight at the bad path.

## A second, hidden problem: `.js` vs `.tsx`

Even if the path had been fixed to `./${g.name}/route.js`, there was still a
trap. The real file on disk is `route.**tsx**`, not `route.**js**`.

This project is built with **Vite**. When Vite sees a dynamic import with a
variable in it (like `${g.name}`), it looks at the *literal filenames* on disk
to figure out what could be loaded. A pattern ending in `route.js` does not
match a file named `route.tsx`, so it would fail to find anything — sending us
right back into the `catch` block and back to `"untitled"`.

## The fix we used

Instead of hand-building an import path, we used Vite's built-in tool for
"load a bunch of files that match a pattern": `import.meta.glob`.

```ts
// Finds every app/routes/guides/<something>/route.tsx and gives us a function
// to load each one. Vite figures this out at build time.
const guideModules = import.meta.glob<{ title?: string }>("./*/route.tsx")

export async function loader() {
    const guides = []

    for (const [path, loadModule] of Object.entries(guideModules)) {
        // path looks like "./creating-a-github-pages-site-with-react-router/route.tsx"
        const match = path.match(/^\.\/(.+)\/route\.tsx$/)
        if (!match) continue
        const slug = match[1]                 // the folder name

        let title = "untitled"
        try {
            const routeModule = await loadModule()
            if (typeof routeModule.title === "string") {
                title = routeModule.title
            }
        } catch {
            title = "untitled"
        }
        guides.push({ slug, title })
    }
    return guides
}
```

Why this is better:

- **No hand-written path to get wrong.** `import.meta.glob` builds the correct
  paths for us, so the "two kinds of path" mistake can't happen.
- **The extension matches reality** (`route.tsx`), so Vite actually finds the
  files.
- **The build tool can "see" the imports.** Because the pattern is a plain
  string, Vite knows at build time exactly which files are involved. A path
  built from a variable like `` `./${g.name}/route.js` `` is harder for the
  tools to check, so mistakes only show up when the code runs.

## How we knew it was actually fixed

After the change, the build writes out the data for the `/guides` page. It now
contains the real title instead of `"untitled"`:

```json
[..., "title", "Building a Github Pages Site with React Router"]
```

## Takeaways for next time

1. **A relative path's meaning depends on the tool.** `fs`/`opendir` paths start
   from where the program runs; `import(...)` paths start from the file they're
   written in. Don't copy one into the other.
2. **Don't let `catch` swallow errors while debugging.** Log the error first;
   the message usually names the exact problem.
3. **Match the real filename**, extension included. `route.js` is not
   `route.tsx`.
4. **Prefer the tool built for the job.** For "load many files matching a
   pattern" in a Vite project, `import.meta.glob` is safer than assembling
   import strings by hand.
