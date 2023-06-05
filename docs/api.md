# RatchetHax API

## Setup

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

## API Methods
*⚠️ Any references to data types are based on PS3 versions of games in the series and may differ on PS2 builds.*

All methods in the RatchetHax API return getters/setters where editable values exist.
This means that changing any editable value in the RatchetHax API can be done by simply reassigning the value.

All examples in this section assume the `Game` class has been instantiated as `game` like shown in the *[Usage](#usage)* section above.

### Nanotech - `Game.nanotech`
* This is an integer value.
* Setting a zero value will kill Ratchet.
* Setting values higher than the HUD can accommodate may cause the HUD to show the wrong value, but the set value will still apply.
* In RC1, this is an unsigned 8 bit integer and can therefore be set up to 255.
   * Despite this, only up to 8 orbs will actually appear onscreen depending on whether Ratchet has the nanotech upgrades.
* In RC2 and up, this is a signed 32 bit integer and be therefore be set up to 2,147,483,647. Setting a negative value will kill Ratchet.
   * In RC2, the number of nanotech quadrants in the HUD won't visibly increase past Ratchet's current maximum.
   * In RC3, only the last three digits are displayed in the HUD.

#### Example
```javascript
// Get the current nanotech value
const health = game.nanotech;

// Set the nanotech value
game.nanotech = 8;
```

### Bolts - `Game.bolts`
* This is a signed 32 bit integer value.
* Due to being a signed value the bolt count can be set to a negative value, however this will make Ratchet unable to afford anything.
* The bolt count can to a range between -2,147,483,647 and 2,147,483,647.

#### Example
```javascript
// Get the current bolt value
const bolts = game.bolts;

// Set the bolt value
game.bolts = 1000000;
```

### Equipped Item - `Game.equipped`
* Returns the object of the current weapon or gadget Ratchet has equipped.
* Accepts a weapon or gadget dictionary key when setting an equipped item.
* The wrench does not count as an equipped item.
   * Even if the wrench is currently in Ratchet's hand, the *equipped* value still refers to whatever will be used when the player presses circle.
* When changing the equipped item while Ratchet already has another item in hand, the change will only take effect after pressing circle to use the item.
* If the equipped item couldn't be found, an error will be logged to the console and an empty object returned.
* Properties of the returned object can be edited as defined in the *[API Objects](#api-objects)* section.

#### Example
```javascript
// Get the currently equipped item
const equipped = game.equipped;

// Set the currently equipped item
game.equipped = 'pyrocitor';

// Set a property of the currently equipped item (eg: ammo)
game.equipped.ammo = 20;
```

### Current Planet - `Game.currentPlanet`
* Returns the object of the currently loaded planet.
* This value cannot be set.
   * Forcibly changing the current planet value would crash the game, so there's no setter associated with this method.

#### Example
```javascript
// Get the currently loaded planet
const planet = game.currentPlanet;
```

### Player State - `Game.playerState`
*To be documented*

### Game Mode - `Game.mode`
*To be documented*

### Player Position - `Game.playerPos`
* Returns the player's position and rotation as an object.
* Returns **x, y, z, pitch, roll & yaw** props.
* Each object property is a float value.
* Each object property is also comprised of a getter and setter method and can therefore be reassigned individually.
   * Because of this, to read the entire playerPos object at once as a plain object you'll need to use the spread operator as shown in the example below.

#### Example
```javascript
// Get a single positional axis
const posX = game.playerPos.x;

// Get the player's full position data
const position = {...game.playerPos};

// Set a single axis
game.playerPos.x = 265.5;

// Set multiple axis' at once
game.playerPos = {
   x: 265.5,
   z: 50,
   pitch: 1.25
};
```

### Freecam - `Game.freecam`
*⚠️ This method only works in Ratchet & Clank 1 and certain RC2 and RC3 prototypes that have debugging features enabled.*
* This is a boolean which represents the current state of *freecam* mode.
* Freecam is functionally the same as the *Cam+Chr control* option in the RC1 debug menu.

#### Example
```javascript
// Get the current state of freecam mode
const isFreecam = game.freecam;

// Set freecam mode
game.freecam = true;

// Toggle freecam mode
game.freecam = !game.freecam;
```

### World Update - `Game.worldUpdate`
*⚠️ This method only works in Ratchet & Clank 1 and certain RC2 and RC3 prototypes that have debugging features enabled.*
* This is an object made up of getter/setter properties.
* The root object that's returned cannot be reassigned directly, but properties can be since they have getter/setter methods.
* These properties *(except step)* represent a type of entity in the game world.
   * Setting a prop to true allows that entity type to update (default), setting it to false freezes that entity type in the game world.
   * The *step* property freezes everything when true and allows the player to advance the game one frame at a time by pressing L3.

#### Properties
All properties return a boolean that represents the state of the property.
* **player:** The player character. Set to false to freeze the player's state.
* **mobys:** Movable objects. Set to false to freeze all movable objects (enemies, crates, breakables etc).
* **parts:** Particle FX. Set to false to freeze all particle effects.
* **camera:** Game camera. Set to false to freeze the game camera.
* **step:** Frame stepping mode. Set to true to freeze everything and enable the use of L3 to advance the game one frame at a time.

#### Example
```javascript
// Get the update state of a world type
const mobysState = game.worldUpdate.mobys;

// Set the update state of a world type
game.worldUpdate.mobys = false;
```

### Weapons - `Game.weapons()`
* This method is invoked as a standard function with a *key* parameter and returns a weapon object.
   * If the method is called without any parameters, an array of all weapon objects is returned instead.
* You can learn more about the weapon object in the *[API Objects](#weapon-object)* section below.

#### Example
```javascript
// Get a weapon object
const bombglove = game.weapons('bombglove');

// Get all weapon objects
const weapons = game.weapons();

// Set an editable weapon property
game.weapons('bombglove').ammo = 40;
```

### Gadgets - `Game.gadgets()`
* This method is invoked as a standard function with a *key* parameter and returns a gadget object.
   * If the method is called without any parameters, an array of all gadget objects is returned instead.
* You can learn more about the gadget object in the *[API Objects](#gadget-object)* section below.

#### Example
```javascript
// Get a gadget object
const swingshot = game.gadgets('swingshot');

// Get all gadget objects
const gadgets = game.gadgets();

// Set an editable gadget property
game.gadgets('swingshot').unlocked = true;
```

### Items - `Game.items()`
* This method is invoked as a standard function with a *key* parameter and returns an item object.
   * If the method is called without any parameters, an array of all item objects is returned instead.
* You can learn more about the item object in the *[API Objects](#item-object)* section below.

#### Example
```javascript
// Get an item object
const metaldetector = game.items('metaldetector');

// Get all item objects
const items = game.items();

// Set an editable item property
game.items('metaldetector').unlocked = true;
```

### Planets - `Game.planets()`
* This method is invoked as a standard function with a *key* parameter and returns a planet object.
   * If the method is called without any parameters, an array of all planet objects is returned instead.
* You can learn more about the planet object in the *[API Objects](#planet-object)* section below.

#### Example
```javascript
// Get a planet object
const kerwan = game.planets('kerwan');

// Get all planet objects
const planets = game.planets();

// Set an editable planet property
game.planets('kerwan').unlocked = true;
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

## API Objects

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

#### Static Props

* `id` - The weapon's internal ID
* `name` - The name of the weapon

#### Getter/Setter Props

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

#### Static Props

* `id` - The gadget's internal ID
* `name` - The name of the gadget

#### Getter/Setter Props

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

#### Static Props

* `id` - The item's internal ID
* `name` - The name of the item

#### Getter/Setter Props

* `unlocked` - Whether or not the item is unlocked

### Planet Object

```javascript
{
    id: 3,
    name: 'Kerwan',
    unlocked: true
}
```

#### Static Props

* `id` - The planet's internal ID
* `name` - The name of the planet

#### Getter/Setter Props

* `unlocked` - Whether or not the planet is unlocked
