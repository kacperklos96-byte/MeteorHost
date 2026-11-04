# TopsyFox Admin Panel — Website Prototype

A standalone, dark stone-gray Minecraft-inspired HTML/CSS/JavaScript admin dashboard. The whole interface lives in **index.html**: no framework, package installation, build process or Minecraft plugin required. The mobile layout and all demo controls are included.

## Open

Double-click `index.html` in a web browser. It runs locally and works offline.

## Sections

- **Overview:** server mock statistics, recent anti-cheat flags, player table, quick test actions.
- **Console:** simulated Paper console commands such as `help`, `list`, `say`, `time set day`, `weather clear`, `save-all`, `tps`, `status`, `warn <player>`, `kick <player>`, `ban <player>`, `pardon <player>`, `tp <player> <x> <y> <z>`, and more. Up/down keys navigate history.
- **Players:** sample player list, search, online status, simulated coordinates, ping, role, and management dialogs.
- **Moderation:** ban/kick/warn simulation, history and ban reversal.
- **Anti-Cheat:** example flags, details, check toggles, and new simulated detection events.
- **World Map:** synthetic pixel-art terrain with clickable simulated player markers and zoom controls.
- **Settings:** add demo players, create flags, stop/start the simulation and reset all sample data.

## Important

**Demo only.** Everything runs within the browser, and sample actions are stored in localStorage on your device. Console commands do **not** execute on an actual Minecraft server. The map is generated art, not real server terrain. No login/password backend, server API or RCON is included.

If you eventually want to administer a real server, that requires a separate backend with proper authentication, authorization, audit logging, HTTPS and safe command restrictions; do not expose RCON directly to the internet.

Created for TopsyFox Network. Hosted path: `admin-panel/` in the `MeteorHost` repository. Live URL: https://kacperklos96-byte.github.io/MeteorHost/admin-panel/.
## Styles and hosting

The current interface has **one maintained stylesheet** embedded in `index.html` (`topsyfox-admin-theme`). Previous experimental CSS themes, override stacks and gradient effects have been removed from the current file. Older snapshots remain in normal Git commit history only; history was not rewritten.

This private repository is the canonical home for the demo. The temporary GitHub Pages copy in the separate MeteorHost repository has been deleted; this project currently has **no public website**. Keep future private control APIs and credentials out of static hosting.
