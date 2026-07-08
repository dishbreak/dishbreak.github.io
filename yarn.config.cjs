module.exports = {
    async constraints({ Yarn }) {
        let reactRouterVersion;
        for (const dep of Yarn.dependencies({ ident: "react-router" })) {
            reactRouterVersion = dep.range;
        }

        if (reactRouterVersion) {
            for (const dep of Yarn.dependencies()) {
                if (dep.ident.startsWith("@react-router/") && dep.range != reactRouterVersion) {
                    dep.update(reactRouterVersion);
                }
            }
        }
    },
}
