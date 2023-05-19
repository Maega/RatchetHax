import memoryjs from 'memoryjs';
import fs from 'fs';

// Dynamically import game address files from the games directory
const games = {};
const gameFiles = fs.readdirSync('./games').filter(file => file.endsWith('.js'));
for (const file of gameFiles) {
    const game = await import('./games/' + file);
    games[file.split('.')[0]] = game.default;
}

export default class Game {
    constructor(pid, gameVer = 'rc1_ntsc_v1') {
        // Open the process and get the handle & game addresses
        this.processObject = memoryjs.openProcess(pid);
        this.process = this.processObject.handle;
        this.address = games[gameVer];

        // Replace data types with big endian versions if specified
        if (this.address.bigEndian) {
            memoryjs.INT16 = memoryjs.INT16_BE;
            memoryjs.UINT16 = memoryjs.UINT16_BE;
            memoryjs.INT32 = memoryjs.INT32_BE;
            memoryjs.UINT32 = memoryjs.UINT32_BE;
            memoryjs.INT64 = memoryjs.INT64_BE;
            memoryjs.UINT64 = memoryjs.UINT64_BE;
            memoryjs.FLOAT = memoryjs.FLOAT_BE;
            memoryjs.DOUBLE = memoryjs.DOUBLE_BE;
        };
    }

    get nanotech() {
        return memoryjs.readMemory(this.process, this.address.nanotech, memoryjs.UINT32);
    }
    set nanotech(value) {
        memoryjs.writeMemory(this.process, this.address.nanotech, value, memoryjs.UINT32);
    }

    get bolts() {
        return memoryjs.readMemory(this.process, this.address.bolts, memoryjs.UINT32);
    }
    set bolts(value) {
        memoryjs.writeMemory(this.process, this.address.bolts, value, memoryjs.UINT32);
    }

    get equipped() {
        const itemId = memoryjs.readMemory(this.process, this.address.current.item, memoryjs.UINT8);

        if (itemId === 0) return { id: 0, name: 'No Item' };

        const weaponId = Object.keys(this.address.weapons).find(key => this.address.weapons[key].id === itemId);
        if (weaponId) return this.weapons(weaponId);

        const gadgetId = Object.keys(this.address.gadgets).find(key => this.address.gadgets[key].id === itemId);
        if (gadgetId) return this.gadgets(gadgetId);

        return console.error('Unable to identify equipped item.');
    }
    set equipped(itemId) {
        const equippedItem = this.address.weapons[itemId] || this.address.gadgets[itemId];
        if (!equippedItem) return console.error(`Weapon "${itemId}" does not exist.`);
        memoryjs.writeMemory(this.process, this.address.current.item, equippedItem.id, memoryjs.UINT8);
    }

    get currentPlanet() {
        const planetId = memoryjs.readMemory(this.process, this.address.current.planet, memoryjs.UINT8);
        const planet = Object.values(this.address.planets).find(planet => planet.id === planetId);
        return planet;
    }
    get planetUnlocks() {
        const unlockedPlanetsBuf = memoryjs.readBuffer(this.process, this.address.galacticMapBase, 72);
        const planetIds = [];
        const view = new DataView(unlockedPlanetsBuf.buffer);
        for (let i = 0; i < 18; i++) planetIds.push(view.getUint32(i * 4, true)); // For some reason, even on PS3 this is little endian.
        return planetIds;
    }

    get playerState() {
        return memoryjs.readMemory(this.process, this.address.state, memoryjs.UINT32);
    }
    set playerState(value) {
        memoryjs.writeMemory(this.process, this.address.state, value, memoryjs.UINT32);
    }

    get mode() {
        return memoryjs.readMemory(this.process, this.address.mode, memoryjs.UINT32);
    }
    set mode(value) {
        memoryjs.writeMemory(this.process, this.address.mode, value, memoryjs.UINT32);
    }

    get playerPos() {
        const self = this;
        const posBuf = memoryjs.readBuffer(this.process, this.address.posBase, 28);
        const view = new DataView(posBuf.buffer);
        return {
            get x() {
                return view.getFloat32(0, !self.address.bigEndian);
            },
            set x(value) {
                view.setFloat32(0, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get y() {
                return view.getFloat32(4, !self.address.bigEndian);
            },
            set y(value) {
                view.setFloat32(4, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get z() {
                return view.getFloat32(8, !self.address.bigEndian);
            },
            set z(value) {
                view.setFloat32(8, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get pitch() {
                return view.getFloat32(16, !self.address.bigEndian);
            },
            set pitch(value) {
                view.setFloat32(16, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get roll() {
                return view.getFloat32(20, !self.address.bigEndian);
            },
            set roll(value) {
                view.setFloat32(20, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get yaw() {
                return view.getFloat32(24, !self.address.bigEndian);
            },
            set yaw(value) {
                view.setFloat32(24, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            }
        }
    }
    set playerPos(value) {
        const posBuf = memoryjs.readBuffer(this.process, this.address.posBase, 28);
        const view = new DataView(posBuf.buffer);
        if (value.x) view.setFloat32(0, value.x, !this.address.bigEndian);
        if (value.y) view.setFloat32(4, value.y, !this.address.bigEndian);
        if (value.z) view.setFloat32(8, value.z, !this.address.bigEndian);
        if (value.pitch) view.setFloat32(16, value.pitch, !this.address.bigEndian);
        if (value.roll) view.setFloat32(20, value.roll, !this.address.bigEndian);
        if (value.yaw) view.setFloat32(24, value.yaw, !this.address.bigEndian);
        memoryjs.writeBuffer(this.process, this.address.posBase, posBuf);
    }

    weapons(weaponId) {
        const self = this;
        const weapon = this.address.weapons[weaponId];
        if (!weapon) return console.error(`Weapon "${weaponId}" does not exist.`);
        return {
            id: weapon.id,
            name: weapon.name,
            get unlocked() {
                return !!memoryjs.readMemory(self.process, weapon.unlocked, memoryjs.UINT8);
            },
            set unlocked(value) {
                memoryjs.writeMemory(self.process, weapon.unlocked, !!value ? 1 : 0, memoryjs.UINT8);
            },
            get gold() {
                if (!weapon.gold) return console.error(`Weapon "${weapon.name}" does not have a gold variant.`);
                return !!memoryjs.readMemory(self.process, weapon.gold, memoryjs.UINT8);
            },
            set gold(value) {
                if (!weapon.gold) return console.error(`Weapon "${weapon.name}" does not have a gold variant.`);
                memoryjs.writeMemory(self.process, weapon.gold, !!value ? 1 : 0, memoryjs.UINT8);
            },
            get ammo() {
                if (!weapon.ammo) return console.error(`Weapon "${weapon.name}" does not use ammo.`);
                return memoryjs.readMemory(self.process, weapon.ammo, memoryjs.UINT32);
            },
            set ammo(value) {
                if (!weapon.ammo) return console.error(`Weapon "${weapon.name}" does not use ammo.`);
                memoryjs.writeMemory(self.process, weapon.ammo, value, memoryjs.UINT32);
            },
            get equipped() {
                return weapon.id === memoryjs.readMemory(self.process, self.address.current.item, memoryjs.UINT8);
            },
            set equipped(value) {
                if (value) memoryjs.writeMemory(self.process, self.address.current.item, weapon.id, memoryjs.UINT8);
                else if (this.equipped) memoryjs.writeMemory(self.process, self.address.current.item, 0, memoryjs.UINT8);
            }
        }
    }

    gadgets(gadgetId) {
        const self = this;
        const gadget = this.address.gadgets[gadgetId];
        if (!gadget) return console.error(`Gadget "${gadgetId}" does not exist.`);
        return {
            id: gadget.id,
            name: gadget.name,
            get unlocked() {
                return !!memoryjs.readMemory(self.process, gadget.unlocked, memoryjs.UINT8);
            },
            set unlocked(value) {
                memoryjs.writeMemory(self.process, gadget.unlocked, !!value ? 1 : 0, memoryjs.UINT8);
            },
            get equipped() {
                return gadget.id === memoryjs.readMemory(self.process, self.address.current.item, memoryjs.UINT8);
            },
            set equipped(value) {
                if (value) memoryjs.writeMemory(self.process, self.address.current.item, gadget.id, memoryjs.UINT8);
                else if (this.equipped) memoryjs.writeMemory(self.process, self.address.current.item, 0, memoryjs.UINT8);
            }
        }
    }

    items(itemId) {
        const self = this;
        const item = this.address.items[itemId];
        if (!item) return console.error(`Item "${itemId}" does not exist.`);
        return {
            name: item.name,
            get unlocked() {
                return !!memoryjs.readMemory(self.process, item.unlocked, memoryjs.UINT8);
            },
            set unlocked(value) {
                memoryjs.writeMemory(self.process, item.unlocked, !!value ? 1 : 0, memoryjs.UINT8);
            }
        }
    }

    planets(planetId) {
        const self = this;
        const planet = this.address.planets[planetId];
        const planetUnlocks = this.planetUnlocks;
        if (!planet) return console.error(`Planet "${planetId}" does not exist.`);
        return {
            id: planet.id,
            name: planet.name,
            get unlocked() {
                return planetUnlocks.includes(planet.id);
            },
            set unlocked(value) {
                if (value) {
                    // Determine if the planet is already unlocked and return if it is
                    const alreadyUnlocked = planetUnlocks.includes(planet.id);
                    if (alreadyUnlocked) return;
                    // Find the index of the first element in planetUnlocks with a value of 0
                    let index = planetUnlocks.findIndex(id => id === 0);
                    // If all slots are filled we'll just replace the last element
                    if (index === -1) index = planetUnlocks.length - 1;
                    // Multiply the index by 4 to get the byte offset from the base address
                    const offset = index * 4;
                    // Determine the target address by adding the offset to the base address
                    const targetAddress = self.address.galacticMapBase + offset;
                    // Write the planet id to the offset
                    memoryjs.writeMemory(self.process, targetAddress, planet.id, memoryjs.UINT32);
                } else {
                    // Find the index of the planet id in planetUnlocks, return if it's not found since it's already locked
                    const index = planetUnlocks.findIndex(id => id === planet.id);
                    if (index === -1) return;
                    // Remove the planet id from planetUnlocks
                    planetUnlocks.splice(index, 1);
                    // Pad the array with a 0 since we just removed an element
                    planetUnlocks.push(0);
                    // Turn each element in planetUnlocks into a 4 byte hex string
                    const hex = planetUnlocks.map(id => id.toString(16).padStart(8, '0').match(/.{2}/g).reverse().join(''));
                    // Convert back into a 72 byte buffer
                    const buffer = Buffer.from(hex.join(''), 'hex');
                    memoryjs.writeBuffer(self.process, self.address.galacticMapBase, buffer);
                }
            }
        }
    }

    close() {
        memoryjs.closeProcess(this.process);
    }
}

//const game = new GameRetail('pcsx2.exe');

/* console.log({...game.playerPos});
console.log(game.playerPos.z = 100);
game.playerPos = {z: 100};
game.playerPos = {...game.playerPos}; */

/* console.log(game.playerPos);

game.playerPos = {
    z: 100
} */

/* function giveAll() {
    // Unlock all weapons and make them gold
    for (const weaponId in address.weapons) {
        game.weapons(weaponId).unlocked = true;
        game.weapons(weaponId).gold = true;
    }

    // Unlock all gadgets
    for (const gadgetId in address.gadgets) {
        game.gadgets(gadgetId).unlocked = true;
    }

    // Unlock all items
    for (const itemId in address.items) {
        game.items(itemId).unlocked = true;
    }

    // Unlock all planets
    for (const planetId in address.planets) {
        game.planets(planetId).unlocked = true;
    }
} */

//game.close();

/* setInterval(() => {
    const game1State = game1.state;
    game2.state = game1State;
}, 5); */