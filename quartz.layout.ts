import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        const folderOrder: Record<string, number> = { science: 0, galaxies: 1 }
        const scienceOrder: Record<string, number> = { scientific_justification: 0, observing_programmes: 1 }
        const ka = a.slugSegment ?? ""
        const kb = b.slugSegment ?? ""
        if (a.isFolder && b.isFolder) {
          const pa = folderOrder[ka] ?? 99
          const pb = folderOrder[kb] ?? 99
          if (pa !== pb) return pa - pb
          return ka.localeCompare(kb)
        }
        if (!a.isFolder && !b.isFolder) {
          const pa = scienceOrder[ka] ?? 99
          const pb = scienceOrder[kb] ?? 99
          if (pa !== pb) return pa - pb
          return ka.localeCompare(kb)
        }
        return a.isFolder ? -1 : 1
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        const folderOrder: Record<string, number> = { science: 0, galaxies: 1 }
        const scienceOrder: Record<string, number> = { science: 0, observing_programmes: 1 }
        const ka = a.slugSegment ?? ""
        const kb = b.slugSegment ?? ""
        if (a.isFolder && b.isFolder) {
          const pa = folderOrder[ka] ?? 99
          const pb = folderOrder[kb] ?? 99
          if (pa !== pb) return pa - pb
          return ka.localeCompare(kb)
        }
        if (!a.isFolder && !b.isFolder) {
          const pa = scienceOrder[ka] ?? 99
          const pb = scienceOrder[kb] ?? 99
          if (pa !== pb) return pa - pb
          return ka.localeCompare(kb)
        }
        return a.isFolder ? -1 : 1
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [],
}
