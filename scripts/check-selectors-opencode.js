// Checks that OpenCode Desktop still has the elements the Homebrew Channel
// theme styles. The OpenCode counterpart of check-selectors.js.
//
// Run it after an OpenCode update:
//   1. In OpenCode, pick a Homebrew Channel theme in Settings > Appearance.
//   2. Open DevTools (View > Toggle Developer Tools, or Cmd+Option+I on macOS,
//      Ctrl+Shift+I elsewhere).
//   3. Open the Console tab, paste this whole file and press Enter.
//
// Some elements only exist in certain states. A "not found" row whose "Needs"
// state was not on screen is not a problem; run the script again with that
// state showing.
//
// Most of the theme works through OpenCode's theme tokens and needs no
// selector. The rows below are the rules in src/opencode/hbc-opencode.css that
// do. If one is not found while its state is showing, that rule needs a new
// selector.

(() => {
  const checks = [
    ["Your message", '[data-component="user-message"] [data-slot="user-message-text"]', "A session with a message you sent"],
    ["Chat box", '[data-component="prompt-input"]', "A session open"],
    ["Button", '[data-component="button"], [data-component="button-v2"]', "Always"],
    ["Menu", '[data-component="menu-v2-content"], [data-component="dropdown-menu-content"]', "A menu open"],
    ["Popover", '[data-component="popover-content"]', "A popover open"],
    ["Settings dialog", '[data-component="dialog-v2"][data-variant="settings"] [data-slot="dialog-container"]', "Settings open"],
  ];

  const rows = checks.map(([name, selector, needs]) => {
    let count;
    try {
      count = document.querySelectorAll(selector).length;
    } catch {
      count = -1;
    }
    return {
      Result: count > 0 ? "✅ found" : count === 0 ? "❌ not found" : "⚠️ bad selector",
      Element: name,
      Count: Math.max(count, 0),
      Needs: needs,
      Selector: selector,
    };
  });

  // The plugin injects its CSS only while one of its themes is active.
  const themeId = document.documentElement.dataset.theme || "(none)";
  const injected = [...document.querySelectorAll("style")].some((s) => s.textContent.includes("--hbc-accent"));
  const header = `Homebrew Channel selector check. Active theme: ${themeId}. Theme CSS injected: ${injected ? "yes" : "no"}`;
  console.log(header);
  console.table(rows);

  const missing = rows.filter((row) => !row.Result.startsWith("✅"));
  console.log(
    missing.length
      ? `${missing.length} not found. Check that each one's "Needs" state was on screen, then run again.`
      : "All found.",
  );

  // Put a plain-text copy on the clipboard, ready to paste into a chat.
  // copy() is a DevTools console helper, so it only exists in the Console.
  const text = [header, ...rows.map((row) => `${row.Result} | ${row.Element} (${row.Count}) | needs: ${row.Needs}`)].join("\n");
  if (typeof copy === "function") {
    copy(text);
    console.log("Results copied to the clipboard.");
  } else {
    console.log(text);
  }
})();
