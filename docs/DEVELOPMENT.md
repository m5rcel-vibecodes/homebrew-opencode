# Development

## Project layout

```
themes/                  Ready-to-use theme files. Built by scripts/build-theme.py,
                         except homebrew-channel-colors.json: the base palette the
                         build reads, edited by hand. It is not a theme to install.
src/
  hbc-bubbles-fast.css   The rising background bubbles, GPU-friendly. Used by default.
  hbc-bubbles.css        The original bubble animation, kept for switching back.
  hbc-theme.css          The Homebrew Channel styling for T3 Code's layout.
  opencode/
    hbc-opencode.css     The Homebrew Channel styling for OpenCode Desktop.
    gui.ts               The OpenCode plugin: registers the themes and injects
                         the active one's CSS.
    generated/themes.json  The OpenCode themes and their CSS. Built by
                         scripts/build-theme.py; never edit by hand.
dist/
  gui-experimental.cjs   The OpenCode plugin bundle, built by `vite build`.
                         Committed, so installing from Git needs no build step.
scripts/
  build-theme.py         Holds the palettes and the list of themes. Merges them with
                         the CSS, backgrounds and bubbles into themes/.
  make-backgrounds.py    Makes the recolored WebP backgrounds and tinted bubbles.
                         Needs Pillow.
assets/
  source/                The original Homebrew Channel background and bubble art.
  generated/             The WebP backgrounds and tinted bubbles the themes embed.
  previews/              Screenshots of each theme for the README.
```

The dark palette of the main theme comes from `themes/homebrew-channel-colors.json`.
Every color variation is tinted from it.

## Build

After editing a CSS file or a palette, rebuild the themes and apply one:

```sh
python scripts/build-theme.py
t3 theme set ./themes/homebrew-channel.json
```

`t3 theme set` publishes the file under its file name as the theme id and makes it
the active theme. `t3 theme show` prints the active theme. Published copies live in
`~/.t3/userdata/themes/` on macOS and `%USERPROFILE%\.t3\userdata\themes\` on Windows.
After the first publish, switch by id: `t3 theme set homebrew-channel-pink`.

The build script minifies the CSS inside each theme file. The files in `src/` keep their comments.

## Build the OpenCode plugin

The OpenCode plugin is an OpenCode Desktop GUI plugin (`./gui-experimental`).
It needs Node.js and Python 3.9 or newer:

```sh
npm install
npm run bundle   # build-theme.py, then vite build
npm run check   # type-check src/opencode against the plugin SDK
```

`build-theme.py` maps each palette onto an OpenCode theme (a `palette` plus
token `overrides` and `v2Overrides`, see `opencode_variant()`), and joins its
CSS from the background, the bubbles and `src/opencode/hbc-opencode.css`.
`vite build` bundles that into `dist/gui-experimental.cjs`.

To try it, add this folder to `plugins` in `~/.config/opencode/opencode.jsonc`
and run `npm run dev` (`vite build --watch`); OpenCode reloads the plugin on
every rebuild. Run `python scripts/build-theme.py` again after a CSS or palette
change.

How the OpenCode side differs from T3 Code:

- OpenCode themes are colors only. The plugin adds the CSS with a `Style`
  contribution, and only while a Homebrew Channel theme is active: it watches
  `<html data-theme>`, where OpenCode writes `<plugin id>:<theme id>`.
- Most of the look comes from OpenCode's theme tokens. `hbc-opencode.css`
  turns the canvas tokens (`--background-base`, `--v2-background-bg-base`,
  `--v2-background-bg-deep`, `--background-stronger`) into glass, so the water
  shows through. Popups keep the opaque surface tokens.
- The few rules that need an element use OpenCode's `data-component` and
  `data-slot` hooks. After an OpenCode update, paste
  `scripts/check-selectors-opencode.js` into OpenCode's DevTools console to
  check they still match.
- OpenCode themes need a light variant. These themes are dark only, so the
  light variant is a copy of the dark one; set OpenCode to dark.
- There is no size limit, but keep the images small anyway: they are embedded
  in the CSS.

## Install every theme

macOS:

```sh
for f in themes/*.json; do
  case "$f" in *-colors.json) continue ;; esac
  t3 theme set "$f"
done
t3 theme set homebrew-channel
```

Windows PowerShell:

```powershell
Get-ChildItem themes\*.json -Exclude *-colors.json | ForEach-Object { t3 theme set $_.FullName }
t3 theme set homebrew-channel
```

## Add a color variation

1. Add a background entry to `VARIATIONS` and a bubble entry to `BUBBLE_TINTS`
   in `scripts/make-backgrounds.py`.
2. Add a palette and a `variation(...)` entry to `THEMES` in `scripts/build-theme.py`,
   and a description and preview image to `DESCRIPTIONS` in the same file.
3. Run both scripts:

   ```sh
   pip install pillow
   python scripts/make-backgrounds.py
   python scripts/build-theme.py
   npx vite build
   ```

The OpenCode plugin picks up every entry in `THEMES` by itself.

## Performance

The bubbles move with GPU-composited `translate` animations, and the theme uses no
`backdrop-filter` blur. On a typical desktop, T3 Code's power use stays low to moderate
while idle. Scrolling and moving the mouse raise it for a moment, as in any app.

The original bubble animation is closer to the Homebrew Channel but repaints the whole
window every frame. To switch back to it, see the comment at the top of
`src/hbc-bubbles-fast.css` and `CSS_FILES` in `scripts/build-theme.py`.

## Release a new version

Rebuild the themes, commit them to `main`, then push a version tag:

```sh
git tag v1.2.3   # the next version number
git push origin v1.2.3
```

`.github/workflows/release.yml` then creates a release with every theme file attached.
The download links in the README always point to the latest release.

## Limits

- Color values must be hex (`#rgb` or `#rrggbb`).
- The `css` field holds at most 50,000 characters. The build script stops if a theme is longer.
- CSS `url()` accepts only `data:` URLs, so the backgrounds and bubbles are embedded.
- CSS cannot reach the terminal text, the file tree or diff internals. Those use the color roles.
