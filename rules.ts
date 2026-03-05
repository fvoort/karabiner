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
    h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),

    // Window management
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

    // o = "Open" applications
    o: {
      f: app("Finder"), // 'F'inder
      b: app("Microsoft Edge"), // 'B'rowser
      m: app("Mail"), // 'M'ail
      w: app("WhatsApp"), // 'W'hatsApp
      c: app("Calendar"), // 'C'alendar
      r: app("Reminders"), // 'R'eminders
      n: app("Notes"), // 'N'otes
      s: app("Spotify"), // 'S'potify
      v: app("Visual Studio Code"), // 'V'isual Studio Code
      t: app("Ghostty"), // 'T'erminal
      a: app("Claude"), // 'A'I
    },

    // s "System"
    s: {
      l: open("raycast://extensions/raycast/system/lock-screen"), // 'L'ock
      d: open("-g raycast://extensions/raycast/system/show-desktop"), // 'D'esktop
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"), // 'C'olor
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ), // 'E'moji
      p: open("raycast://extensions/raycast/raycast/confetti"), // 'P'arty
      t: open("raycast://extensions/mooxl/deepcast/index"), // 'T'ranslate
      m: open("raycast://extensions/raycast/system/open-camera"), // 'M'irror
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
