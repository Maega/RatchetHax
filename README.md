# RatchetHax

![Trainer Preview](https://i.imgur.com/SXK2TVf.png)

A Node.js-based memory editor and trainer for the Ratchet & Clank series on PS2 and PS3.

RatchetHax includes a standalone trainer via `trainer.js` that has various features like the ability to give yourself bolts, weapons etc, set the player's location and show the debug menu (in RC1).

It can also be used in your own project to write scripts and game mods with JavaScript by importing `Game.js` into your project and using the included [API](docs/api.md).

## Requirements

* Node.js
    * Only *v19.x* has been tested but most recent versions should work fine.
* A PS2 Emulator
    * Memory addresses are currently tested on *PCSX2 1.6.0*, offsets *may* need to be adjusted for other emulators.
* *or* a PS3 Emulator
    * Memory addresses are offset by *0x300000000* bytes which should be compatible with most versions of *RPCS3*.

## Trainer Features

* View Game Metrics
   * *View current bolt count, health, current planet, equipped item and all unlocks*
* Set Health
* Infinite Health
* Set Bolts
* Set Raritanium
* Set Bolt Multiplier
* Freeze Bolt Multiplier
* Unlock/Lock Weapons
* Enable/Disable Gold Weapons
* Set Weapon Level
* Set Weapon Ammo
* Infinite Ammo
* Unlock/Lock Gadgets
* Unlock/Lock Items
* Teleport to Locations
   * *Detects the currently loaded planet and allows the player to choose from common locations on that planet to teleport to*
* Manually set player coordinates
   * *x, y, z position and pitch, roll, yaw rotation*
* Freecam
   * *Uses the built-in debugging freecam (Cam+Chr) in RC1*
* Freeze Player
* Freeze Mobys *(Movable Objects)*
* Freeze Particle FX
* Freeze Camera
* Open In-Game Debug Menu
   * *Only available in RC1 and some RC2 & RC3 prototypes*

## Trainer Installation

*This section is intended as a quick guide to get started with the included trainer for beginners on Windows who aren't familiar with Node.js or the command line.*

1. Install [Node.js](https://nodejs.org/en) if it's not already installed
   - **NOTE:** When installing Node.js, make sure to tick the checkbox to *"Automatically install the necessary tools"* in the *"Tools for Native Modules"* step. This is required to compile one of the dependencies of RatchetHax.
3. [Download](https://github.com/ParadoxEpoch/RatchetHax/archive/refs/heads/main.zip) the RatchetHax project code
4. Extract the downloaded zip file to a folder on your computer
5. Open *Windows Terminal* or *Command Prompt* and navigate to the folder you extracted the zip to
    * This is easiest to do by right clicking an empty space in the folder and then choosing *Open in Terminal*
6. Run `npm install` to automatically install dependencies
7. Finally, run `npm run trainer` to run the included sample trainer

## Trainer Usage

When you launch the trainer, it'll look for any running emulators on your system. If it finds any, you'll be able to choose one of them from a list.
If no emulator processes were found, you'll be prompted to specify a process name or PID to attach the trainer to.

![Trainer Setup - Select Process](https://i.imgur.com/8xvEIjp.png)

After selecting a process to attach to, the trainer will give you a list of supported games to choose from.

![Trainer Setup - Select Game](https://i.imgur.com/KDdBxa6.png)

After selecting a game from the list, the trainer will attach to the emulator and you'll be taken to the main menu.

![Trainer - Main Menu](https://i.imgur.com/Ssq7ykL.png)

## API Documentation

The RatchetHax API allows to create your own Ratchet & Clank scripts and mods with JavaScript.

Documentation is available [here](docs/api.md).

## Supported Games

Currently, only the original v1.00 (Black Label) NTSC version of Ratchet & Clank 1 is fully supported by RatchetHax.

Early support has now been added for several other games in the series. Not all functionality is working or fully tested yet, but progress is being made on implementing full support for these games on both PS2 and PS3.

Adding support for other Ratchet & Clank games is as simple as cloning [an existing address file](games/rc1_ps2_scus97199.js) and making the neccessary address edits. [Game.js](Game.js) will automatically detect and import all address files in [./games](games) on launch.

I'm working on adding support for new builds as time permits. If you'd like to contribute your own, feel free to open an issue or submit a PR. See the *[Contributing](#contributing)* section for more info.

When instantiating the Game class, you'll need to pass a game version string parameter. Below is a table of supported games and their version strings:

| Game Build | Version String | Support Status |
| -------------------------------- | ---------- | ---------- |
| Ratchet & Clank 1 (PS2, NTSC v1.00) | rc1_ps2_scus97199 | FULL |
| Ratchet & Clank 1 (PS3, NPUA80643) | rc1_ps3_npua80643 | PARTIAL |
| Ratchet & Clank 2 (PS3, NPUA80644) | rc2_ps3_npua80644 | PARTIAL |
| Ratchet & Clank 3 (PS3, NPUA80645) | rc3_ps3_npua80645 | PARTIAL |
| Ratchet & Clank: Deadlocked (PS3, NPUA80646) | rc4_ps3_npua80646 | PARTIAL |
| Ratchet & Clank: Tools of Destruction (PS3, NPUA80965) | rctod_ps3_npua80965 | PARTIAL |
| Ratchet & Clank: A Crack in Time (PS3, BCES00748) | rcacit_ps3_bces00748 | PARTIAL |

### Supported Features

#### PS2 Games

| Feature | RC1 | RC2 | RC3 | RC4 |
| ------------ | :----: | :----: | :----: | :----: |
| Health | :heavy_check_mark: | :x: | :x: | :x: |
| Bolts | :heavy_check_mark: | :x: | :x: | :x: |
| Raritanium | :heavy_minus_sign: | :x: | :heavy_minus_sign: | :heavy_minus_sign: |
| Bolt Multiplier | :heavy_minus_sign: | :x: | :x: | :x: |
| Unlock/Lock Weapons | :heavy_check_mark: | :x: | :x: | :x: |
| Weapon Level | :heavy_check_mark: | :x: | :x: | :x: |
| Weapon Ammo | :heavy_check_mark: | :x: | :x: | :x: |
| Unlock/Lock Gadgets | :heavy_check_mark: | :x: | :x: | :x: |
| Unlock/Lock Items | :heavy_check_mark: | :x: | :x: | :x: |
| Unlock/Lock Planets | :heavy_check_mark: | :x: | :x: | :x: |
| Teleport to Locations | :heavy_check_mark: | :x: | :x: | :x: |
| Set Coordinates | :heavy_check_mark: | :x: | :x: | :x: |
| Freecam Mode | :heavy_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: |
| World State | :heavy_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: |

#### PS3 Games

| Feature | RC1 | RC2 | RC3 | RC4 | ToD | ACiT |
| ------------ | :----: | :----: | :----: | :----: | :----: | :----: |
| Health | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x: | :heavy_check_mark: |
| Bolts | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Raritanium | :heavy_minus_sign: | :heavy_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_check_mark: | :heavy_check_mark: |
| Bolt Multiplier | :heavy_minus_sign: | :heavy_check_mark: | :x: | :x: | :heavy_check_mark: | :x: |
| Unlock/Lock Weapons | :x: | :heavy_check_mark: | :x: | :x: | :x: | :heavy_check_mark: |
| Weapon Level | :x: | :x: | :x: | :x: | :x: | :heavy_check_mark: |
| Weapon Ammo | :heavy_check_mark: | :heavy_check_mark: | :x: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Unlock/Lock Gadgets | :x: | :heavy_check_mark: | :x: | :x: | :x: | :heavy_check_mark: |
| Unlock/Lock Items | :x: | :heavy_check_mark: | :x: | :x: | :x: | :heavy_check_mark: |
| Unlock/Lock Planets | :x: | :x: | :x: | :x: | :x: | :x: | :x: |
| Teleport to Locations | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: | :x: | :x: | :x: |
| Set Coordinates | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x: | :heavy_check_mark: |
| Freecam Mode | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: |
| World State | :x: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: |

## Game Modes

*To be documented*

## Player States

*To be documented*

## Contributing

If you have any improvements, fixes or suggestions feel free to submit a pull request or open a new issue.

Alternatively, if you'd like to support ongoing development of this and other open source projects a donation would be very much appreciated. I accept direct crypto donations via any of the addresses below or through Coinbase Commerce.

**BTC:** bc1q6kqv5u2368j4l00rls5frg78wt7m6vf7a50sa7

**ETH:** 0x704fb3fD106D00e6D78880C25139141C4B24DFd7

**DOGE:** D6MZp3HMZQA6gFBhmcmYs6AjytXwQJ4bYj

**LTC:** ltc1qhqgsnzwumxm7q3u3m4rj0zcvwcvcvhqqrke07p

**XMR:** 8429Hzck9gdX43MF9NzNGjaeGdKBwjVTjgGDQfXKV6WxfSGubxuBi6mEh2nDWwXtAZUjMejV4Pamr5SfYp96QJZNEQecMqS
