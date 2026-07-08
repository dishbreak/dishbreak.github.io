declare module "*.mdx" {
    import type { ComponentType } from "react";

    export interface TocItem {
        value: string;
        depth: number;
        id: string;
        children?: TocItem[];
    }

    const Component: ComponentType<any>;
    export default Component;
    export const tableOfContents: TocItem[];
}
