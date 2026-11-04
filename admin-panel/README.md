# TopsyFox Admin Panel — Website Prototype

A standalone, dark stone-gray Minecraft-inspired HTML/CSS/JavaScript admin dashboard. The functionality lives in **index.html** and its Ore UI-inspired styling in **ore-ui.css**: no framework, package installation, build process or Minecraft plugin required. The mobile layout and all demo controls are included.

## Open

Open https://kacperklos96-byte.github.io/MeteorHost/admin-panel/ or serve the `admin-panel/` folder locally via a static server. The demo functionality works offline; the optional Google-hosted Pixelify Sans font requires an internet connection to download unless already cached.

## Sections

- **Overview:** server mock statistics, recent anti-cheat flags, player table, quick test actions.
- **Console:** simulated Paper console commands such as `help`, `list`, `say`, `time set day`, `weather clear`, `save-all`, `tps`, `status`, `warn <player>`, `kick <player>`, `ban <player>`, `pardon <player>`, `tp <player> <x> <y> <z>`, and more. Up/down keys navigate history.
- **Players:** sample player list, search, online status, simulated coordinates, ping, role, and management dialogs.
- **Moderation:** ban/kick/warn simulation, history and ban reversal.
- **Anti-Cheat:** example flags, details, check toggles, and new simulated detection events.
- **World Map:** synthetic pixel-art terrain with clickable simulated player markers and zoom controls.
- **Settings:** add demo players, create flags, stop/start the simulation and reset demo data. Ore-style controls provide compact layout, adjustable console font size, timestamp visibility and demo-tip visibility, persisted in the browser.

## Important

**Demo only.** Everything runs within the browser, and sample actions are stored in localStorage on your device. Console commands do **not** execute on an actual Minecraft server. The map is generated art, not real server terrain. No login/password backend, server API or RCON is included.

If you eventually want to administer a real server, that requires a separate backend with proper authentication, authorization, audit logging, HTTPS and safe command restrictions; do not expose RCON directly to the internet.

Created for TopsyFox Network. Hosted path: `admin-panel/` in the `MeteorHost` repository. Live URL: https://kacperklos96-byte.github.io/MeteorHost/admin-panel/.
## Styles and hosting

The current interface has **one maintained Ore UI-inspired stylesheet** in `ore-ui.css`, with responsive desktop and mobile layouts. The older embedded theme is no longer loaded.

See `ORE-UI-DESIGN.md` for verified 2026 references, design decisions, and disclaimers.

## Visual testing

GitHub Actions workflow `TopsyFox Ore UI Website QA` verifies the HTML/CSS and runs a Chromium browser smoke test at desktop and mobile widths, checks page navigation and functional settings, and uploads four screenshots as workflow artifacts. The full website remains demo-only and is not a live server console.
