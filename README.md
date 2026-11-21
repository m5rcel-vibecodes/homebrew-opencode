# Homebrew Channel theme for OpenCode and T3 Code

[![Latest release](https://img.shields.io/github/v/release/FrankieFms/homebrew-t3code?label=release)](https://github.com/FrankieFms/homebrew-t3code/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/FrankieFms/homebrew-t3code/total?label=downloads)](https://github.com/FrankieFms/homebrew-t3code/releases)
[![Stars](https://img.shields.io/github/stars/FrankieFms/homebrew-t3code?style=flat)](https://github.com/FrankieFms/homebrew-t3code/stargazers)

An animated OpenCode Desktop and T3 Code theme inspired by the channel menu of The Homebrew Channel on the Nintendo Wii.
Bubbles rise behind the chat, the sidebar and chat box sit on dark HBC-style bars, and the
selected thread uses the steel-blue focus bar from the original menu.

![Homebrew Channel theme preview](assets/previews/homebrew-default.png)

[Watch the bubbles move](https://github.com/user-attachments/assets/86e67ddb-d4e9-418d-bb89-1a16cfbeafbb).







## Install in OpenCode Desktop

In OpenCode, the themes come as one plugin that adds all 13 colors to
**Settings** > **Appearance** > **Theme**. It needs an OpenCode Desktop version
with GUI plugin support, which is experimental in OpenCode.

1. Add the plugin to your global OpenCode config, `~/.config/opencode/opencode.jsonc`.
   OpenCode Desktop only reads plugins from that file.

   ```sh
   opencode plugin add github:m5rcel-vibecodes/homebrew-opencode
   ```

   Or, from a clone of this repository, add its folder to `plugins`:

   ```jsonc
   {
     "plugins": ["/path/to/homebrew-opencode"]
   }
   ```

2. Restart OpenCode Desktop, open **Settings** > **Appearance**, set the color
   scheme to **Dark** and pick a **Homebrew Channel** theme.

The water, bubbles and HBC styling load only while a Homebrew Channel theme is
picked. With any other theme, the plugin adds no CSS. To turn it off, use the
switch in **Settings** > **Extensions** > **Plugins**, or run
`opencode plugin remove`.

## Install in T3 Code

1. Download a theme from the list below.
2. In T3 Code, open **Settings** and go to **Appearance**.
3. Import a theme and pick the file you downloaded.

All themes are dark only, so set T3 Code to dark mode.

## Themes

Each color has its own recolored water, tinted bubbles and matching accent.
The OpenCode plugin includes all of them. The download links are the T3 Code theme files.

| | | |
|:-:|:-:|:-:|
| <img src="assets/previews/homebrew-default.png" alt="Homebrew Channel theme preview"><br>**Homebrew Channel**<br><sub>The original</sub><br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel.json) | <img src="assets/previews/homebrew-no-bg.png" alt="No Background theme preview"><br>**No Background**<br><sub>Navy gradient, no image</sub><br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-no-background.json) | <img src="assets/previews/homebrew-pink.png" alt="Pink theme preview"><br>**Pink**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-pink.json) |
| <img src="assets/previews/homebrew-red.png" alt="Red theme preview"><br>**Red**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-red.json) | <img src="assets/previews/homebrew-orange.png" alt="Orange theme preview"><br>**Orange**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-orange.json) | <img src="assets/previews/homebrew-gold.png" alt="Gold theme preview"><br>**Gold**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-gold.json) |
| <img src="assets/previews/homebrew-yellow.png" alt="Yellow theme preview"><br>**Yellow**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-yellow.json) | <img src="assets/previews/homebrew-green.png" alt="Green theme preview"><br>**Green**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-green.json) | <img src="assets/previews/homebrew-teal.png" alt="Teal theme preview"><br>**Teal**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-teal.json) |
| <img src="assets/previews/homebrew-indigo.png" alt="Indigo theme preview"><br>**Indigo**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-indigo.json) | <img src="assets/previews/homebrew-purple.png" alt="Purple theme preview"><br>**Purple**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-purple.json) | <img src="assets/previews/homebrew-magenta.png" alt="Magenta theme preview"><br>**Magenta**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-magenta.json) |
| <img src="assets/previews/homebrew-grey.png" alt="Grey theme preview"><br>**Grey**<br>[Download](https://github.com/FrankieFms/homebrew-t3code/releases/latest/download/homebrew-channel-grey.json) |  |  |

<details>
<summary>Install from a terminal</summary>

Set `theme` to the name of the file you want, without `.json`, such as `homebrew-channel-pink`.

macOS:

```sh
theme=homebrew-channel
base=https://github.com/FrankieFms/homebrew-t3code/releases/latest/download
curl -fsSLO "$base/$theme.json"
t3 theme set "./$theme.json"
```

Windows (PowerShell):

```powershell
$theme = "homebrew-channel"
$base = "https://github.com/FrankieFms/homebrew-t3code/releases/latest/download"
Invoke-WebRequest "$base/$theme.json" -OutFile "$theme.json"
t3 theme set ".\$theme.json"
```

Can't find `t3`? Use `~/.t3/bin/t3` on macOS or `%USERPROFILE%\.t3\bin\t3.cmd` on Windows.

</details>

## Updating

T3 Code does not update themes by itself. To get a newer version, download the
theme again and import it. See the [releases](https://github.com/FrankieFms/homebrew-t3code/releases)
for what changed.

## Uninstall

Pick another theme in **Settings** > **Appearance**, or run `t3 theme clear`.

## Development

Building the themes, adding a color, performance notes and releases are in
[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

Bug reports, fixes and color ideas are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits and license

The Homebrew Channel is by Team Twiizers, now [fail0verflow](https://github.com/fail0verflow).
This theme is a fan tribute and is not affiliated with fail0verflow, Nintendo, OpenCode or T3 Code.

The bubble animation is a CSS translation of `bubbles.c`, and the background and bubble
images come from The Homebrew Channel's source code at
[fail0verflow/hbc](https://github.com/fail0verflow/hbc). Both are released under the GNU
General Public License, version 2 or later. They have been changed for this theme: the
images are recolored and converted to WebP, and the animation is adapted to run as CSS.

Because it builds on that code, this theme is also released under the
[GNU General Public License, version 2 or later](LICENSE).

### For fail0verflow

If you are part of fail0verflow, or otherwise hold rights in The Homebrew Channel, and have
any concerns about this theme, open an issue or email
[contact@frankiefms.com](mailto:contact@frankiefms.com). That includes a missing or wrong credit, a change you would like made, or a
request to take the theme down. Any request will be honored.
