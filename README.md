# RatchetHax - nodemem

## Objects

### Weapon Object

``javascript
{
    id: 10,
    name: 'Bomb Glove',
    unlocked: true,
    gold: true,
    ammo: 40,
    equipped: true
}
``

'''Static Props'''

* `id` - The weapon's internal ID
* `name` - The name of the weapon

'''Getter/Setter Props'''

* `unlocked` - Whether or not the weapon is unlocked
* `gold` - Whether or not the weapon is gold
* `ammo` - The amount of ammo the weapon has
* `equipped` - Whether or not the weapon is equipped

### Gadget Object

``javascript
{
    id: 12,
    name: 'Swingshot',
    unlocked: true,
    equipped: true
}
``

'''Static Props'''

* `id` - The gadget's internal ID
* `name` - The name of the gadget

'''Getter/Setter Props'''

* `unlocked` - Whether or not the gadget is unlocked
* `equipped` - Whether or not the gadget is equipped

### Item Object

``javascript
{
    id: 1,
    name: 'Hoverboard',
    unlocked: true
}
``

'''Static Props'''

* `id` - The item's internal ID
* `name` - The name of the item

'''Getter/Setter Props'''

* `unlocked` - Whether or not the item is unlocked

### Planet Object

``javascript
{
    id: 3,
    name: 'Kerwan'
}
``

'''Static Props'''

* `id` - The planet's internal ID
* `name` - The name of the planet

## API Examples

``javascript
// Get a weapon object
game.weapons('bombglove');

// Get a gadget object
game.gadgets('swingshot');

// Get an item object
game.items('hoverboard');

// Get or set weapon/gadget/item properties
game.weapons('bombglove').unlocked = true;
game.weapons('bombglove').gold = true;
game.weapons('bombglove').ammo = 40;

// Get or set nanotech
game.nanotech = 4;

// Get or set bolts
game.bolts = 10000;

// Get equipped weapon/gadget object
game.equipped;

// Check if a weapon/gadget is equipped
game.weapons('bombglove').equipped;

// Equip a weapon/gadget
game.equipped = 'bombglove';
// or...
game.weapons('bombglove').equipped = true;

// Edit a property of the equipped weapon/gadget
game.equipped.ammo = 40;
``
