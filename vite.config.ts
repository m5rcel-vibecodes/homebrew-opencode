import { defineConfig } from "vite"
import { gui } from "@opencode/plugin/gui/vite"

// Builds the OpenCode plugin into dist/gui-experimental.cjs.
// Run scripts/build-theme.py first; `npm run build` does both.
export default defineConfig({ plugins: [gui({ entry: "src/opencode/gui.ts" })] })
