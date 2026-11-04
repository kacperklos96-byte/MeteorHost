# TopsyFox Ore UI reference fidelity

The design is based primarily on the **user-supplied Ore UI design-system screenshots** and the [Minecraft Wiki Ore UI article](https://minecraft.wiki/w/Ore_UI). Other background references: [Mojang's Ore UI repository](https://github.com/Mojang/ore-ui) and Minecraft Bedrock's 2026 main menu/settings refresh.

## Specific choices from the reference screenshots

- Charcoal/black background, with independent gray rectangular content panels.
- Dark gray **horizontal tabs** at the top, selected with a short white underline.
- Primary buttons have a flat Minecraft green surface and dark green bottom edge.
- Secondary buttons are pale gray/white with a 3D pixel border and dark label.
- Destructive controls are red rather than green, with matched pixel edges.
- All list rows are charcoal with labeled descriptions and controls on the right.
- Switches have square green/gray tracks; checkboxes have rectangular green checked states.
- The console text-size slider has a green progress track and a large square thumb.
- A dropdown has a dark charcoal field. A blue information strip communicates saved settings.
- Typography uses the open-source **Pixelify Sans** web font as a pixel-inspired approximation, not the official proprietary Minecraft font files.
- No rounded SaaS cards, glossy gradients, blurred glass, or unrelated neon colors.
- The small world preview is custom SVG pixel art, not Mojang-protected UI art.

## Functionality and constraints

The demo still has the original seven pages (overview, console, players, moderation, anti-cheat, map, settings). Old browser demo data is preserved; new visual controls use their own local-storage key. The interface is responsive: desktop uses Ore-like horizontal tabs; phone uses a compact top bar, slide-out menu and quick-navigation strip. Real player/server integration is not implemented and must be secured before being used for administration.

## Verification

- Static parser and JavaScript syntax smoke: `tests/smoke.py`
- Interactive Chromium test: `tests/browser-smoke.cjs`
- Desktop/mobile screenshots: uploaded as build artifacts by `admin-panel-qa.yml`
- Screens tested at 1440 × 900 desktop and 390 × 844 phone, including navigation, console, interactive UI options and persisted preferences.
- Manual browser testing with real users and devices is still useful.

Ore UI is Mojang's work; this interface is an independent **Ore-inspired** recreation, not official Mojang components.
