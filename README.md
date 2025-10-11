# @fvoort's Karabiner Elements configuration

This is my personal fork of [Max Stoiber’s Karabiner Elements configuration](https://github.com/mxstbr/karabiner), with custom key mappings and rules for my own setup.

## Installation

1. Install & start [Karabiner Elements](https://karabiner-elements.pqrs.org/)
2. Delete the default `~/.config/karabiner` folder
3. Clone this repository
4. Create a symlink with `ln -s ~/github/fvoort/karabiner ~/.config` (where `~/github/fvoort/karabiner` is your local path to where you cloned the repository)
5. [Restart karabiner_console_user_server](https://karabiner-elements.pqrs.org/docs/manual/misc/configuration-file-path/) with `` launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server ``

## Development

```
yarn install
```

To install the dependencies. (one-time only)

```
yarn run build
```

Builds the `karabiner.json` from the `rules.ts`.

```
yarn run watch
```

Watches the TypeScript files and rebuilds whenever they change.

## License

Copyright (c) 2022 Maximilian Stoiber, licensed under the [MIT license](./LICENSE.md).
