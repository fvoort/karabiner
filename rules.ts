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
      f: app("Finder"), // 'F'inder
      b: app("Firefox"), // 'B'rowser
      m: app("Mail"), // 'M'ail
      c: app("Calendar"), // 'C'alendar
      i: app("Notion"), // Not'i'on
      n: app("Notes"), // 'N'otes
      s: app("Spotify"), // 'S'potify
      v: app("Visual Studio Code"), // 'V'isual Studio Code
      w: app("WhatsApp"), // 'W'hatsApp
      d: app("Discord"), // 'D'iscord
      t: app("Ghostty"), // 'T'erminal
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
      up_arrow: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      down_arrow: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      return_or_enter: {
        to: [
          {
            key_code: "mute",
          },
        ],
      },
      right_arrow: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      left_arrow: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
    },

    // e "Media"
    e: {
      return_or_enter: {
        to: [
          {
            consumer_key_code: "play_or_pause",
          },
        ],
      },
      right_arrow: {
        to: [
          {
            consumer_key_code: "scan_next_track",
          },
        ],
      },
      left_arrow: {
        to: [
          {
            consumer_key_code: "scan_previous_track",
          },
        ],
      },
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
