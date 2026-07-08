import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";
import { flatRoutes } from '@react-router/fs-routes'

const guideRoutes = await flatRoutes({ rootDirectory: "routes/guides" })

export default [
    index("routes/home.tsx"),
    layout("routes/navbar.tsx", [
        route("/about", "routes/about.tsx"),
        route("/experience", "routes/experience.tsx"),
        route("/contact", "routes/contact.tsx"),
        ...prefix("/blog", [
            route("/", "routes/blog-archive.tsx"),
            route("/:slug", "routes/blog-post.tsx"),
        ]),
        ...prefix('/guides', [
            ...guideRoutes,
        ]),
        route("/notfound", "routes/notfound.tsx")
    ])
] satisfies RouteConfig;
