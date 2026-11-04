#!/usr/bin/env python3
"""Static smoke checks for the demo admin panel. Does not require a browser."""
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "ore-ui.css").read_text(encoding="utf-8")

class Scanner(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.pages = []
        self.actions = []
    def handle_starttag(self, tag, attrs):
        args = dict(attrs)
        if "id" in args: self.ids.append(args["id"])
        if tag == "link": self.links.append(args.get("href", ""))
        if tag in ("button","a") and ("data-go" in args or "data-command" in args or "data-run" in args):
            self.actions.append(args)
        if tag == "section" and "page" in args.get("class", "").split():
            self.pages.append(args.get("id", ""))

scanner = Scanner()
scanner.feed(html)
assert len(scanner.ids) == len(set(scanner.ids)), "duplicate IDs"
required = [
    "overviewStats", "overviewFlags", "overviewPlayers", "shortLogs", "overviewCommand",
    "fullLogs", "consoleCommand", "allPlayers", "moderationRows", "flagRows",
    "checkRows", "terrainMap", "mapContainer", "mapRoster", "playerStats",
    "serverToggle", "alertsToggle", "mobileMenuOpen", "mobileNavShade",
    "dialogBack", "dialogTitle", "dialogBody", "toastBox", "localTime",
    "resetDemo", "commandChips", "flagSub", "crumb",
]
assert not (set(required) - set(scanner.ids)), "required DOM IDs removed"
assert len(scanner.pages) == 7, f"Expected 7 pages, found {len(scanner.pages)}"
assert all(x.startswith("page-") for x in scanner.pages)
assert any(x.startswith("./ore-ui.css") for x in scanner.links)
assert "topsyfox-admin-theme" not in html, "old embedded theme still loaded"
assert "data-go=\"console\"" in html and "data-go=\"map\"" in html
assert "data-command=\"save-all\"" in html
assert "data-action=\"simulate-flag\"" in html
assert "LOCAL INTERACTIVE DEMO" in html, "the demo label must remain"
assert "INTERACTIVE PROTOTYPE" in html
assert len(scanner.actions) >= 15

for selector in [".navitem.active", ".panelhead", ".ore-world-card", ".mobile-bottom",
                 ".dialogback.show", ".page.active", ".stat", ".table", ".mapbox",
                 ".quickgrid", ".btn.danger", ".toggle.on", ".mobile-head"]:
    assert selector in css, f"missing styling for {selector}"
assert css.count("{") == css.count("}"), "unbalanced CSS braces"
assert "linear-gradient(" not in css, "avoid generic gradient dashboards"
assert css.count("@media") >= 3, "responsive design missing"
assert "Mojang" in css, "originality/license note removed"

scripts = re.findall(r"<script(?:\s[^>]*)?>([\s\S]*?)</script>", html)
assert len(scripts) == 1, "expected a single retained app script"
script = scripts[0]
for required_js in ["function render(", "function go(", "function drawMap(", "function runCommand(",
                    "function renderPlayers(", "function simulateFlag(", "function tickClock("]:
    assert required_js in script, f"existing interactive behavior missing: {required_js}"
with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "admin-panel-demo.js"
    path.write_text(script, encoding="utf-8")
    subprocess.run(["node", "--check", str(path)], check=True)
print(f"Ore-inspired panel static smoke passed: {len(scanner.ids)} IDs, "
      f"{len(scanner.pages)} interactive sections, {len(scanner.actions)} controls, Node syntax OK.")
