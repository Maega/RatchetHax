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
    constructor(pid, gameVer) {

        // Check for valid game version
        if (!games[gameVer]) throw new Error(`${gameVer} is not a supported game version`);

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

    _readMem(addressObj) {
        if (!addressObj || addressObj[0] === null) return undefined;
        return memoryjs.readMemory(this.process, addressObj[0], memoryjs[addressObj[1].toUpperCase()]);
    }

    _writeMem(addressObj, value) {
        if (!addressObj || addressObj[0] === null) return console.error('Function is not supported by this game or is not yet implemented.');
        return memoryjs.writeMemory(this.process, addressObj[0], value, memoryjs[addressObj[1].toUpperCase()]);
    }

    get nanotech() {
        return this._readMem(this.address.nanotech);
    }
    set nanotech(value) {
        this._writeMem(this.address.nanotech, value);
    }

    get bolts() {
        return this._readMem(this.address.bolts);
    }
    set bolts(value) {
        this._writeMem(this.address.bolts, value);
    }

    get raritanium() {
        return this._readMem(this.address.raritanium);
    }
    set raritanium(value) {
        this._writeMem(this.address.raritanium, value);
    }

    get multiplier() {
        return this._readMem(this.address.multiplier);
    }
    set multiplier(value) {
        this._writeMem(this.address.multiplier, value);
    }

    get equipped() {
        const itemId = this._readMem(this.address.current.item);

        if (itemId === 0) return { id: 0, name: 'No Item' };

        const weaponId = Object.keys(this.address.weapons).find(key => this.address.weapons[key].id === itemId);
        if (weaponId) return this.weapons(weaponId);

        const gadgetId = Object.keys(this.address.gadgets).find(key => this.address.gadgets[key].id === itemId);
        if (gadgetId) return this.gadgets(gadgetId);

        console.error('Unable to identify equipped item.');
        return {};
    }
    set equipped(itemId) {
        const equippedItem = this.address.weapons[itemId] || this.address.gadgets[itemId];
        if (!equippedItem) return console.error(`Weapon or gadget "${itemId}" does not exist.`);
        this._writeMem(this.address.current.item, equippedItem.id);
    }

    get currentPlanet() {
        const planetId = this._readMem(this.address.current.planet);
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
        return this._readMem(this.address.state);
    }
    set playerState(value) {
        this._writeMem(this.address.state, value);
    }

    get mode() {
        return this._readMem(this.address.mode);
    }
    set mode(value) {
        this._writeMem(this.address.mode, value);
    }

    get playerPos() {
        const self = this;
        const posBuf = memoryjs.readBuffer(this.process, this.address.posBase, this.address.posLength || 28);
        const view = new DataView(posBuf.buffer);
        return {
            get x() {
                return view.getFloat32(self.address.posOffsets?.x || 0, !self.address.bigEndian);
            },
            set x(value) {
                view.setFloat32(self.address.posOffsets?.x || 0, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get y() {
                return view.getFloat32(self.address.posOffsets?.y || 4, !self.address.bigEndian);
            },
            set y(value) {
                view.setFloat32(self.address.posOffsets?.y || 4, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get z() {
                return view.getFloat32(self.address.posOffsets?.z || 8, !self.address.bigEndian);
            },
            set z(value) {
                view.setFloat32(self.address.posOffsets?.z || 8, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get pitch() {
                return view.getFloat32(self.address.posOffsets?.pitch || 16, !self.address.bigEndian);
            },
            set pitch(value) {
                view.setFloat32(self.address.posOffsets?.pitch || 16, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get roll() {
                return view.getFloat32(self.address.posOffsets?.roll || 20, !self.address.bigEndian);
            },
            set roll(value) {
                view.setFloat32(self.address.posOffsets?.roll || 20, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            },
            get yaw() {
                return view.getFloat32(self.address.posOffsets?.yaw || 24, !self.address.bigEndian);
            },
            set yaw(value) {
                view.setFloat32(self.address.posOffsets?.yaw || 24, value, !self.address.bigEndian);
                memoryjs.writeBuffer(self.process, self.address.posBase, posBuf);
            }
        }
    }
    set playerPos(value) {
        const posBuf = memoryjs.readBuffer(this.process, this.address.posBase, this.address.posLength || 28);
        const view = new DataView(posBuf.buffer);
        if (value.x) view.setFloat32(this.address.posOffsets?.x || 0, value.x, !this.address.bigEndian);
        if (value.y) view.setFloat32(this.address.posOffsets?.y || 4, value.y, !this.address.bigEndian);
        if (value.z) view.setFloat32(this.address.posOffsets?.z || 8, value.z, !this.address.bigEndian);
        if (value.pitch) view.setFloat32(this.address.posOffsets?.pitch || 16, value.pitch, !this.address.bigEndian);
        if (value.roll) view.setFloat32(this.address.posOffsets?.roll || 20, value.roll, !this.address.bigEndian);
        if (value.yaw) view.setFloat32(this.address.posOffsets?.yaw || 24, value.yaw, !this.address.bigEndian);
        memoryjs.writeBuffer(this.process, this.address.posBase, posBuf);
    }

    get freecam() {
        const debug = this.address.debug;
        const offset = debug?.levelOffsets[this.currentPlanet?.id];

        if (!offset) return undefined; //console.error('Freecam is not supported by this game or is not yet implemented.');

        let isEnabled = false;
        const controlVal = this._readMem([offset + debug.control[0], debug.control[1]]);
        //const updateVal = this._readMem([offset + debug.update[0], debug.update[1]]);

        if (controlVal !== 0) isEnabled = true; //&& updateVal !== 15

        return isEnabled;
    }
    set freecam(value) {
        const debug = this.address.debug;
        const offset = debug.levelOffsets[this.currentPlanet.id];

        if (value) {
            this._writeMem([offset + debug.control[0], debug.control[1]], 2);
            this._writeMem([offset + debug.update[0], debug.update[1]], 0);
        } else {
            this._writeMem([offset + debug.control[0], debug.control[1]], 0);
            this._writeMem([offset + debug.update[0], debug.update[1]], 15);
        }
    }

    get worldUpdate() {
        const self = this;
        const debug = this.address.debug;
        const offset = debug?.levelOffsets[this.currentPlanet?.id];
        if (!offset) return undefined; //console.error('Debugging functions are not supported by this game or are not yet implemented.');
        const addr = [offset + debug.update[0], debug.update[1]];

        const types = {
            player: 1,
            mobys: 2,
            parts: 4,
            camera: 8,
            step: 16
        }

        const updateVal = this._readMem(addr);

        return {
            get player() {
                return !!(updateVal & types.player);
            },
            set player(value) {
                self._writeMem(addr, value ? (updateVal | types.player) : (updateVal & ~types.player));
            },
            get mobys() {
                return !!(updateVal & types.mobys);
            },
            set mobys(value) {
                self._writeMem(addr, value ? (updateVal | types.mobys) : (updateVal & ~types.mobys));
            },
            get parts() {
                return !!(updateVal & types.parts);
            },
            set parts(value) {
                self._writeMem(addr, value ? (updateVal | types.parts) : (updateVal & ~types.parts));
            },
            get camera() {
                return !!(updateVal & types.camera);
            },
            set camera(value) {
                self._writeMem(addr, value ? (updateVal | types.camera) : (updateVal & ~types.camera));
            },
            get step() {
                return !!(updateVal & types.step);
            },
            set step(value) {
                self._writeMem(addr, value ? (updateVal | types.step) : (updateVal & ~types.step));
            }
        }

    }

    weapons(weaponId) {
        
        // If no weaponId is provided, return an array of all weapons.
        if (!weaponId) return Object.keys(this.address.weapons).map(key => this.weapons(key));
        
        const self = this;
        const weapon = this.address.weapons[weaponId];
        if (!weapon) return console.error(`Weapon "${weaponId}" does not exist.`);
        return {
            id: weapon.id,
            key: weaponId,
            name: weapon.name,
            type: 'weapon',
            get unlocked() {
                return !!self._readMem(weapon.unlocked);
            },
            set unlocked(value) {
                self._writeMem(weapon.unlocked, !!value ? 1 : 0);
            },
            get gold() {
                if (!weapon.gold) return undefined; //console.error(`Weapon "${weapon.name}" does not have a gold variant.`);
                return !!memoryjs.readMemory(self.process, weapon.gold, memoryjs.UINT8);
                //return !!self._readMem(weapon.gold);
            },
            set gold(value) {
                if (!weapon.gold) return console.error(`Weapon "${weapon.name}" does not have a gold variant.`);
                memoryjs.writeMemory(self.process, weapon.gold, !!value ? 1 : 0, memoryjs.UINT8);
            },
            get level() {
                if (!weapon.level) return undefined;
                return self._readMem(weapon.level) + 1;
            },
            set level(value) {
                if (!weapon.level) return console.error(`Weapon "${weapon.name}" cannot be leveled or does not have a gold variant.`);
                if (value < 1) return console.error(`Weapon "${weapon.name}" level must be higher than 0.`);
                //memoryjs.writeMemory(self.process, weapon.gold, !!value ? 1 : 0, memoryjs.UINT8);
                self._writeMem(weapon.level, value - 1);
            },
            get ammo() {
                if (!weapon.ammo) return undefined; //console.error(`Weapon "${weapon.name}" does not use ammo.`);
                return self._readMem(weapon.ammo);
            },
            set ammo(value) {
                if (!weapon.ammo) return console.error(`Weapon "${weapon.name}" does not use ammo.`);
                self._writeMem(weapon.ammo, value);
            },
            get equipped() {
                return weapon.id === self._readMem(self.address.current.item);
            },
            set equipped(value) {
                if (value) self._writeMem(self.address.current.item, weapon.id);
                else if (this.equipped) self._writeMem(self.address.current.item, 0);
            }
        }
    }

    gadgets(gadgetId) {

        // If no gadgetId is provided, return an array of all gadgets.
        if (!gadgetId) return Object.keys(this.address.gadgets).map(key => this.gadgets(key));

        const self = this;
        const gadget = this.address.gadgets[gadgetId];
        if (!gadget) return console.error(`Gadget "${gadgetId}" does not exist.`);
        return {
            id: gadget.id,
            key: gadgetId,
            name: gadget.name,
            type: 'gadget',
            get unlocked() {
                return !!self._readMem(gadget.unlocked);
            },
            set unlocked(value) {
                self._writeMem(gadget.unlocked, !!value ? 1 : 0);
            },
            get equipped() {
                return gadget.id === self._readMem(self.address.current.item);
            },
            set equipped(value) {
                if (value) self._writeMem(self.address.current.item, gadget.id);
                else if (this.equipped) self._writeMem(self.address.current.item, 0);
            }
        }
    }

    items(itemId) {

        // If no itemId is provided, return an array of all items.
        if (!itemId) return Object.keys(this.address.items).map(key => this.items(key));

        const self = this;
        const item = this.address.items[itemId];
        if (!item) return console.error(`Item "${itemId}" does not exist.`);
        return {
            name: item.name,
            key: itemId,
            type: 'item',
            get unlocked() {
                return !!self._readMem(item.unlocked);
            },
            set unlocked(value) {
                self._writeMem(item.unlocked, !!value ? 1 : 0);
            }
        }
    }

    planets(planetId) {

        // If no planetId is provided, return an array of all planets.
        if (!planetId) return Object.keys(this.address.planets).map(key => this.planets(key));

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