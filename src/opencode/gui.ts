// The OpenCode Desktop plugin: the ./gui-experimental entry of this package.
//
// It adds every Homebrew Channel theme to Settings > Appearance > Theme, and
// injects that theme's CSS (the water, the bubbles and the HBC art) only
// while one of them is the active theme. With any other theme picked, the
// plugin adds no CSS at all, so the bubbles cost nothing.
//
// themes.json is written by scripts/build-theme.py. Build with `npm run build`.

import { Plugin, Style, Theme } from "@opencode/plugin/gui"
import { createSignal, onCleanup } from "solid-js"
import themes from "./generated/themes.json"

interface Entry {
  readonly theme: Theme
  readonly css: string
}

const entries = themes as readonly Entry[]

export default Plugin.define({
  setup(ctx) {
    for (const entry of entries) ctx.add(Theme, entry.theme)

    // OpenCode writes the active theme's key to <html data-theme>. A plugin
    // theme is keyed `<plugin id>:<theme id>`.
    const root = document.documentElement
    const [active, setActive] = createSignal(root.dataset.theme)
    const observer = new MutationObserver(() => setActive(root.dataset.theme))
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    onCleanup(() => observer.disconnect())

    const current = () => {
      const key = active()
      if (!key) return undefined
      return entries.find(
        (entry) => key === `${ctx.id}:${entry.theme.id}` || key.endsWith(`:${entry.theme.id}`),
      )
    }

    // Returning undefined withdraws the style until a Homebrew Channel theme
    // is picked again.
    ctx.add(Style, () => current()?.css)
  },
})
