import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Options } from "./quartz/components/Explorer"

const folderOrder: Record<string, number> = {
  science: 0,
  galaxies: 1,
}

const scienceFileOrder: Record<string, number> = {
  science: 0,
  observing_programmes: 1,
}

const explorerSort: Options["sortFn"] = (a, b) => {
  const nameA = a.displayName.toLowerCase()
  const nameB = b.displayName.toLowerCase()

  // Top-level folders: use explicit order
  if (a.isFolder && b.isFolder) {
    const pa = folderOrder[nameA] ?? 99
    const pb = folderOrder[nameB] ?? 99
    if (pa !== pb) return pa - pb
    return nameA.localeCompare(nameB)
  }

  // Files inside the science folder: use explicit order
  const pa = scienceFileOrder[nameA] ?? 99
  const pb = scienceFileOrder[nameB] ?? 99
  if (pa !== pb) return pa - pb

  // Folders before files as a fallback
  if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1

  return nameA.localeCompare(nameB)
}

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
    Component.Explorer({ sortFn: explorerSort }),
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
    Component.Explorer({ sortFn: explorerSort }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [],
}
