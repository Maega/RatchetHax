/*
    * Memory address reference object
    * Applies to Ratchet & Clank: Tools of Destruction (PS3) [NPUA80965]
*/

export default {
    bigEndian: true,
    nanotech: [0x34A041E70, 'float'],
    bolts: [0x300E24F68, 'uint32'],
    multiplier: [null, 'float'],
    raritanium: [null, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: 0x34A042080,
    posLength: 0x1C,
    posOffsets: {
        x: 0x00,
        z: 0x04,
        y: 0x08,
        roll: 0x10,
        yaw: 0x14,
        pitch: 0x18
    },
    galacticMapBase: null,
    current: {
        item: [0x300E24F78, 'uint32'],
        planet: [null, 'uint8']
    },
    weapons: {
        omniwrench: {
            id: 0,
            name: 'Omniwrench',
            unlocked: [0x300E24A05, 'uint8'],
            level: false,
            ammo: false
        },
        mrzurkon: {
            id: 2,
            name: 'Mr. Zurkon',
            unlocked: [0x300E24A35, 'uint8'],
            level: [0x300E24A36, 'uint8'], // 0-9(??)
            ammo: [0x300E24A28, 'float']
        },
        buzzblades: {
            id: 3,
            name: 'Buzz Blades',
            unlocked: [0x300E24A4D, 'uint8'],
            level: [0x300E24A4E, 'uint8'],
            ammo: [0x300E24A40, 'float']
        },
        negotiator: {
            id: 4,
            name: 'Negotiator',
            unlocked: [0x300E24A65, 'uint8'],
            level: [0x300E24A66, 'uint8'],
            ammo: [0x300E24A58, 'float']
        },
        soniceruptor: {
            id: 5,
            name: 'Sonic Eruptor',
            unlocked: [0x300E24A7D, 'uint8'],
            level: [0x300E24A7E, 'uint8'],
            ammo: [0x300E24A70, 'float']
        },
        magnetlauncher: {
            id: 6,
            name: 'Mag-Net Launcher',
            unlocked: [0x300E24A95, 'uint8'],
            level: [0x300E24A96, 'uint8'],
            ammo: [0x300E24A88, 'float']
        },
        cryomineglove: {
            id: 7,
            name: 'Cryomine Glove',
            unlocked: [0x300E24AAD, 'uint8'],
            level: [0x300E24AAE, 'uint8'],
            ammo: [0x300E24AA0, 'float']
        },
        plasmastriker: {
            id: 8,
            name: 'Plasma Striker',
            unlocked: [0x300E24AC5, 'uint8'],
            level: [0x300E24AC6, 'uint8'],
            ammo: [0x300E24AB8, 'float']
        },
        dynamoofdoom: {
            id: 9,
            name: 'Dynamo of Doom',
            unlocked: [0x300E24ADD, 'uint8'],
            level: [0x300E24ADE, 'uint8'],
            ammo: [0x300E24AD0, 'float']
        },
        riftinducer5000: {
            id: 10,
            name: 'Rift Inducer 5000',
            unlocked: [0x300E24AF5, 'uint8'],
            level: [0x300E24AF6, 'uint8'],
            ammo: [0x300E24AE8, 'float']
        },
        teslaspikes: {
            id: 11,
            name: 'Tesla Spikes',
            unlocked: [0x300E24B0D, 'uint8'],
            level: [0x300E24B0E, 'uint8'],
            ammo: [0x300E24B00, 'float']
        },
        groovitronglove: {
            id: 12,
            name: 'Groovitron Glove',
            unlocked: [0x300E24B25, 'uint8'],
            level: [0x300E24B26, 'uint8'],
            ammo: [0x300E24B18, 'float']
        },
        chimpomatic: {
            id: 13,
            name: 'Chimp-o-matic',
            unlocked: [0x300E24B3D, 'uint8'],
            level: [0x300E24B3E, 'uint8'],
            ammo: false
        },
        rynov: {
            id: 14,
            name: 'RYNO V',
            unlocked: [0x300E24B55, 'uint8'],
            level: [0x300E24B56, 'uint8'],
            ammo: [0x300E24B48, 'float']
        },
        spiralofdeath: {
            id: 15,
            name: 'Spiral of Death',
            unlocked: [0x300E24B6D, 'uint8'],
            level: [0x300E24B6E, 'uint8'],
            ammo: [0x300E24B60, 'float']
        },
        constructopistol: {
            id: 16,
            name: 'Constructo Pistol',
            unlocked: [0x300E24B85, 'uint8'],
            level: [0x300E24B86, 'uint8'],
            ammo: [0x300E24B78, 'float']
        },
        constructobomb: {
            id: 17,
            name: 'Constructo Bomb',
            unlocked: [0x300E24B9D, 'uint8'],
            level: [0x300E24B9E, 'uint8'],
            ammo: [0x300E24B90, 'float']
        },
        constructoshotgun: {
            id: 18,
            name: 'Constructo Shotgun',
            unlocked: [0x300E24BB5, 'uint8'],
            level: [0x300E24BB6, 'uint8'],
            ammo: [0x300E24BA8, 'float']
        },

    },
    gadgets: {
        swingshot: {
            id: 19,
            name: 'Swingshot',
            unlocked: [0x300E24BCD, 'uint8']
        },
        omnisoaker: {
            id: 20,
            name: 'OmniSoaker',
            unlocked: [0x300E24BE5, 'uint8']
        },
        hoverboots: {
            id: 21,
            name: 'Hoverboots',
            unlocked: [0x300E24BFD, 'uint8']
        },
        timebomb: {
            id: 1,
            name: 'Time Bomb',
            unlocked: [0x300E24A1D, 'uint8']
        }
    },
    items: {},
    planets: {}
};