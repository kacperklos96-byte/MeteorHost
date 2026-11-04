# TopsyFox Ore-inspired panel design

The TopsyFox admin-panel frontend now uses an original Ore UI-inspired CSS theme (`ore-ui.css`) with no Mojang texture or code assets copied.

Visual references reviewed (2026):
- Minecraft Bedrock Preview 26.60.29 new main menu: https://www.minecraft.net/fi-fi/article/minecraft-preview-26-60-29
- Mojang's 2026 settings refresh: https://feedback.minecraft.net/hc/en-us/community/posts/36960637452557-Let-s-talk-about-our-updated-audio-settings-Bedrock
- Bedrock Create New World design: https://www.minecraft.net/en-us/article/creating-create-new-world
- Ore UI developer metarepository: https://github.com/Mojang/ore-ui

## Design choices
- Light, full-width menu header with Bedrock-like flat dark text.
- Left sidebar of Minecraft-style light raised buttons; green selected state.
- Substantial separation between major sections with pale section headings.
- Square, beveled clickable elements; no rounded SaaS cards or gradients.
- Server-world preview uses original SVG pixel art rather than copied Minecraft screenshots.
- Overview retains existing live demo DOM IDs and JS; console, players, moderation, anti-cheat, map and settings remain intact.
- Mobile gets a drawer and a persistent quick-navigation strip with the same functional controls.

## Scope
Frontend demonstration only. Console, bans, anti-cheat checks, server state and terrain are simulated in JavaScript/localStorage. No server-side authentication or real Minecraft control service.

## Validation
Static smoke test at `tests/smoke.py` enforces required element IDs, original script integrity signals, required visual style selectors, and relative asset links. GitHub CI can also verify embedded JavaScript parses with Node.js.

This is a web recreation of the visual language, not Mojang's Ore UI runtime and not affiliated with Mojang.
