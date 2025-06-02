import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "caps_lock",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: app("Raycast"),
    // o = "Open" applications
    o: {
      b: app("Firefox"),
      c: app("BusyCal"),
      n: app("Obsidian"),
      s: app("Spotify"),
      w: app("WhatsApp"),
      f: app("Figma"),
      p: app("Affinity Photo 2"),
      d: app("Affinity Designer 2"),
      v: app("Visual Studio Code"),
      t: app("Ghostty"),
    },

    // w = "Window"
    w: {
      left_arrow: open(
        "-g raycast://extensions/raycast/window-management/left-half"
      ),
      up_arrow: open(
        "-g raycast://extensions/raycast/window-management/top-half"
      ),
      right_arrow: open(
        "-g raycast://extensions/raycast/window-management/right-half"
      ),
      down_arrow: open(
        "-g raycast://extensions/raycast/window-management/bottom-half"
      ),
      return_or_enter: open(
        "-g raycast://extensions/raycast/window-management/maximize"
      ),
      c: open("-g raycast://extensions/raycast/window-management/center"),
      z: open("-g raycast://extensions/raycast/window-management/restore"),
      1: open(
        "-g raycast://extensions/raycast/window-management/top-left-quarter"
      ),
      2: open(
        "-g raycast://extensions/raycast/window-management/top-right-quarter"
      ),
      3: open(
        "-g raycast://extensions/raycast/window-management/bottom-left-quarter"
      ),
      4: open(
        "-g raycast://extensions/raycast/window-management/bottom-right-quarter"
      ),
    },

    // s "System"
    s: {
      l: open("raycast://extensions/raycast/system/lock-screen"),
      d: open("-g raycast://extensions/raycast/system/show-desktop"),
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      t: open("raycast://extensions/mooxl/deepcast/index"),
      m: open("raycast://extensions/raycast/system/open-camera"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
