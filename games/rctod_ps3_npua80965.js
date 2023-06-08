/*
    * Memory address reference object
    * Applies to Ratchet & Clank: Tools of Destruction (PS3) [NPUA80965]
*/

export default {
    bigEndian: true,
    nanotech: [null, 'float'],
    bolts: [0x31020C28C, 'uint32'],
    multiplier: [0x31020C298, 'float'],
    raritanium: [0x31020C290, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: null,
    galacticMapBase: null,
    current: {
        item: [0x341BF19E4, 'uint32'], // Other possible values: 341BE63E4, 31020C29C (<-- last one is 0 when wrench is equipped)
        planet: [null, 'uint8']
    },
    weapons: {
        combuster: {
            id: 1,
            name: 'Combuster',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BE8C, 'float']
        },
        fusiongrenade: {
            id: 2,
            name: 'Fusion Grenade',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BEA0, 'float']
        },
        shockravager: {
            id: 3,
            name: 'Shock Ravager',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BEB4, 'float']
        },
        tornadolauncher: {
            id: 4,
            name: 'Tornado Launcher',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BEC8, 'float']
        },
        buzzblades: {
            id: 5,
            name: 'Buzz Blades',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BEDC, 'float']
        },
        predatorlauncher: {
            id: 6,
            name: 'Predator Launcher',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BEF0, 'float']
        },
        alphadisruptor: {
            id: 7,
            name: 'Alpha Disruptor',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF04, 'float']
        },
        pyroblaster: {
            id: 8,
            name: 'Pyro Blaster',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF18, 'float']
        },
        plasmabeasts: {
            id: 9,
            name: 'Plasma Beasts',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF2C, 'float']
        },
        shardreaper: {
            id: 10,
            name: 'Shard Reaper',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF40, 'float']
        },
        negotiator: {
            id: 11,
            name: 'Negotiator',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF54, 'float']
        },
        nanoswarmers: {
            id: 12,
            name: 'Nano-Swarmers',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF68, 'float']
        },
        magnetlauncher: {
            id: 13,
            name: 'Mag-Net Launcher',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF7C, 'float']
        },
        razorclaws: {
            id: 14,
            name: 'Razor Claws',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BF90, 'float']
        },
        rynoiv: {
            id: 15,
            name: 'RYNO IV',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x31020BFA4, 'float']
        }
    },
    gadgets: {},
    items: {}, // In ToD, this is stuff in the inventory menu.
    planets: {}
};