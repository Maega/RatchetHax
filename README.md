# RatchetHax

A Node.js-based memory editor and trainer for the Ratchet & Clank PS2 series.

RatchetHax can be used standalone via the `sample.js` interactive sample code to do various trainer-ish tasks like give yourself bolts, weapons etc. and show the debug menu (in RC1).

It can also be used in your own project to write scripts and game mods with JavaScript by importing `Game.js` into your project and using the [API](#api-examples) documented below.

## Requirements

* Node.js
    * Only *v19.x* has been tested but most recent versions should work fine.
* A PS2 Emulator
    * Memory addresses are currently tested on *PCSX2 1.6.0*, offsets *may* need to be adjusted for other emulators.

## Quick Start

*This section is intended as a quick guide to get started for beginners on Windows who aren't familiar with Node.js or the command line.*

1. Install [Node.js](https://nodejs.org/en) if it's not already installed
2. [Download](https://github.com/ParadoxEpoch/RatchetHax/archive/refs/heads/main.zip) the RatchetHax project code
3. Extract the downloaded zip file to a folder on your computer
4. Open *Windows Terminal* or *Command Prompt* and navigate to the folder you extracted the zip to
    * This is easiest to do by right clicking an empty space in the folder and then choosing *Open in Terminal*
5. Run `npm install` to automatically install dependencies
6. Finally, run `node sample.js` to run the interactive sample code

## Install

1. Install [Node.js](https://nodejs.org/en) if it's not already installed.

2. Clone this repository
```bash
git clone https://github.com/ParadoxEpoch/RatchetHax
```

3. Install the `memoryjs` dependency
```bash
# via the project's package.json file
npm install

# or into your own project
npm install memoryjs
```

## Usage

1. Import the Game.js ES module into your project
```javascript
import Game from './Game.js';
```

2. Instantiate the Game class by passing a process name or PID and game version
```javascript

// This can be a process name or PID
const processId = 'pcsx2.exe';
// or...
const processId = 42120;

// Refer to the "Supported Games" section below for more info on game versions that can be passed to the constructor
const gameVersion = 'rc1_ntsc_v1';

// Instantiate the class
const game = Game(processId, gameVersion);
```

### or...

1. Run the `sample.js` example for a simple, interactive implementation of RatchetHax.
    * The sample.js example requires `inquirer`. If you installed dependencies via the project's `package.json` file, you're good to go.
```bash
node sample.js
```

## API Examples

### Get a weapon object
```javascript
// Get a weapon object
const weapon = game.weapons('bombglove');

// Returns
{
    id: 10,
    name: 'Bomb Glove',
    unlocked: true,
    gold: true,
    ammo: 40,
    equipped: true
}
```

### Get a gadget object
```javascript
// Get a gadget object
const gadget = game.gadgets('swingshot');

// Returns
{
    id: 12,
    name: 'Swingshot',
    unlocked: true,
    equipped: false
}
```

### Get an item object
```javascript
// Get an item object
const item = game.items('hoverboard');

// Returns
{
    name: 'Hoverboard',
    unlocked: true
}
```

### Get a planet object
```javascript
// Get a planet object
const planet = game.planets('kerwan');

// Returns
{
    id: 3,
    name: 'Kerwan',
    unlocked: true
}
```

### Get or set object properties
```javascript
// Check if a weapon, gadget, or item is unlocked
const isUnlocked = game.weapons('bombglove').unlocked;

// Unlock a weapon, gadget, or item
game.weapons('bombglove').unlocked = true;

// Unlock the gold variant of a weapon
game.weapons('bombglove').gold = true;

// Set the ammo for a weapon
// ! If the weapon does not use ammo, logs an error to the console
game.weapons('bombglove').ammo = 40;

// Set ammo for the currently equipped weapon
// ! If the equipped item does not use ammo, logs an error to the console
game.equipped.ammo = 40;

// Equip a weapon or gadget
game.gadgets('swingshot').equipped = true;
// or...
game.equipped = 'swingshot';

// Unlock a planet
game.planets('oltanis').unlocked = true;
```

### Get or set game variables
```javascript
// Set nanotech to 4
game.nanotech = 4;

// Set bolts to 50000
game.bolts = 50000;

// Set player state (standing, crouching etc.)
// Refer to "Player States" section below for more info on states
game.playerState = 1;

// Set the game's mode value
// Refer to "Game Modes" section below for more info on modes
game.mode = -1;

// Get player's z coordinate
game.playerPos.z;

// Get player position object
// Use the spread operator as shown below to resolve getter accessor properties
const position = {...game.playerPos}

// Set player's x and y coordinates
game.playerPos.x = 220;
game.playerPos.y = 140;
// or...
game.playerPos = {
    x: 220,
    y: 140
}

// Get object of the currently loaded planet
// ! Note: This value can be read but not modified
const currentPlanet = game.currentPlanet;

// Get an array of unlocked planets in the Galactic Map
// ! Each array element is a planet ID with the index representing its position in the map list
const unlockedPlanets = game.planetUnlocks;
```

## Objects

### Weapon Object

```javascript
{
    id: 10,
    name: 'Bomb Glove',
    unlocked: true,
    gold: true,
    ammo: 40,
    equipped: true
}
```

**Static Props**

* `id` - The weapon's internal ID
* `name` - The name of the weapon

**Getter/Setter Props**

* `unlocked` - Whether or not the weapon is unlocked
* `gold` - Whether or not the weapon is gold
* `ammo` - The amount of ammo the weapon has
* `equipped` - Whether or not the weapon is equipped

### Gadget Object

```javascript
{
    id: 12,
    name: 'Swingshot',
    unlocked: true,
    equipped: true
}
```

**Static Props**

* `id` - The gadget's internal ID
* `name` - The name of the gadget

**Getter/Setter Props**

* `unlocked` - Whether or not the gadget is unlocked
* `equipped` - Whether or not the gadget is equipped

### Item Object

```javascript
{
    id: 1,
    name: 'Hoverboard',
    unlocked: true
}
```

**Static Props**

* `id` - The item's internal ID
* `name` - The name of the item

**Getter/Setter Props**

* `unlocked` - Whether or not the item is unlocked

### Planet Object

```javascript
{
    id: 3,
    name: 'Kerwan',
    unlocked: true
}
```

**Static Props**

* `id` - The planet's internal ID
* `name` - The name of the planet

**Getter/Setter Props**

* `unlocked` - Whether or not the planet is unlocked

## Supported Games

Currently, only the original v1.00 (Black Label) NTSC version of Ratchet & Clank 1 is fully supported by RatchetHax.

Early support has now been added for the PS3 remasters of Ratchet & Clank 2 and 3. Not all functionality is working or fully tested yet, but progress is being made on implementing full support for these games on both PS2 and PS3.

Adding support for other Ratchet & Clank games is as simple as cloning [an existing address file](games/rc1_ntsc_v1.js) and making the neccessary address edits. [Game.js](Game.js) will automatically detect and import all address files in [./games](games) on launch.

I'm working on adding support for new builds as time permits. If you'd like to contribute your own, feel free to open an issue or submit a PR. See the *[Contributing](#contributing)* section for more info.

When instantiating the Game class, you'll need to pass a game version string parameter. Below is a table of supported games and their version strings:

| Game Build | Version String |
| -------------------------------- | ---------- |
| Ratchet & Clank 1 (PS2, NTSC v1.00) | rc1_ntsc_v1 |
| Ratchet & Clank 2 (PS3, NPUA80644) | rc2_pal_ps3 |
| Ratchet & Clank 3 (PS3, NPUA80645) | rc3_pal_ps3 |

## Game Modes

*To be documented*

## Player States

*To be documented*

## Contributing

If you have any improvements, fixes or suggestions feel free to submit a pull request or open a new issue.

Alternatively, if you'd like to support ongoing development of this and other repositories a donation would be very much appreciated. I accept direct crypto donations via any of the addresses below or through Coinbase Commerce.

**BTC:** bc1q6kqv5u2368j4l00rls5frg78wt7m6vf7a50sa7

**ETH:** 0x704fb3fD106D00e6D78880C25139141C4B24DFd7

**DOGE:** D6MZp3HMZQA6gFBhmcmYs6AjytXwQJ4bYj

**LTC:** ltc1qhqgsnzwumxm7q3u3m4rj0zcvwcvcvhqqrke07p

**XMR:** 8429Hzck9gdX43MF9NzNGjaeGdKBwjVTjgGDQfXKV6WxfSGubxuBi6mEh2nDWwXtAZUjMejV4Pamr5SfYp96QJZNEQecMqS
