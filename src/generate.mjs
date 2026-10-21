// This port owns its application mappings. Inputs come only from the pinned local palette.
import { ANSI_ORDER } from '../scripts/palette.mjs';

const kitty = {
files: (f) => [{
    path: `${f.slug}.conf`,
    content: `## name: ${f.name}
## license: MIT
## upstream: https://github.com/living-code-theme/kitty
foreground              ${f.r("fg")}
background              ${f.r("bg")}
selection_foreground    none
selection_background    ${f.r("selection")}
cursor                  ${f.r("cursor")}
cursor_text_color       ${f.r("bg")}
url_color               ${f.r("link")}

active_border_color     ${f.r("borderActive")}
inactive_border_color   ${f.r("border")}
bell_border_color       ${f.r("warning")}
visual_bell_color       none

wayland_titlebar_color  ${f.r("bgDeep")}
macos_titlebar_color    ${f.r("bgDeep")}

tab_bar_background      ${f.r("bgDeep")}
active_tab_foreground   ${f.r("bg")}
active_tab_background   ${f.r("accent")}
inactive_tab_foreground ${f.r("fgMuted")}
inactive_tab_background ${f.c("surface0")}

mark1_foreground ${f.r("bg")}
mark1_background ${f.c("teal")}
mark2_foreground ${f.r("bg")}
mark2_background ${f.c("orchid")}
mark3_foreground ${f.r("bg")}
mark3_background ${f.c("copper")}

${ANSI_ORDER.map((n, i) => `color${String(i).padEnd(3)} ${f.ansi.normal[i]}`).join("\n")}

${ANSI_ORDER.map((n, i) => `color${String(i + 8).padEnd(3)} ${f.ansi.bright[i]}`).join("\n")}
`,
  }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => kitty.files(f)), ...(kitty.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
