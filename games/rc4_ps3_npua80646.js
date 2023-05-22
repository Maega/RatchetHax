/*
    * Memory address reference object
    * Applies to Ratchet & Clank Deadlocked (PS3) [NPUA80646]
*/

export default {
    bigEndian: true,
    nanotech: [0x3010D7250, 'float'],
    bolts: [0x3009C32E8, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: 0x3010D7334,
    galacticMapBase: null, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: [null, 'uint8'],
        planet: [null, 'uint8']
    },
    weapons: {
        dualvipers: {
            id: null,
            name: 'Dual Vipers',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B7EB, 'uint8']
        },
        magmacannon: {
            id: null,
            name: 'Magma Cannon',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B82F, 'uint8']
        },
        thearbiter: {
            id: null,
            name: 'The Arbiter',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B873, 'uint8']
        },
        b6obliterator: {
            id: null,
            name: 'B6 Obliterator',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B93F, 'uint8']
        },
        holoshieldlauncher: {
            id: null,
            name: 'Holoshield Launcher',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B983, 'uint8']
        },
        theharbinger: {
            id: null,
            name: 'The Harbinger',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2BA0B, 'uint8']
        },
        miniturretlauncher: {
            id: null,
            name: 'Mini Turret Launcher',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x300B2B9C7, 'uint8']
        }
    },
    gadgets: {},
    items: {},
    planets: {}
};