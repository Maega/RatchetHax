/*
    * Memory address reference object
    * Applies to Ratchet & Clank (PS3) [NPUA80643]
*/

export default {
    bigEndian: true,
    nanotech: [0x3009BBFCB, 'uint8'], // 0x3009BBFC8
    bolts: [0x3009B9CE0, 'int32'],
    mode: [0x300A60748, 'int32'],
    state: [null, 'int32'],
    posBase: 0x3009B9DA0,
    galacticMapBase: null, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: [0x3009B9CBF, 'uint8'],
        planet: [0x3009B9CB3, 'uint8']
    },
    weapons: {
        bombglove: {
            id: 10,
            name: 'Bomb Glove',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009BC114, 'uint32']
        },
        pyrocitor: {
            id: 16,
            name: 'Pyrocitor',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc12c, 'uint32']
        },
        blaster: {
            id: 15,
            name: 'Blaster',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc128, 'uint32']
        },
        gloveofdoom: {
            id: 20,
            name: 'Glove of Doom',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc13c, 'uint32']
        },
        mineglove: {
            id: 17,
            name: 'Mine Glove',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc130, 'uint32']
        },
        taunter: {
            id: 14,
            name: 'Taunter',
            unlocked: [null, 'uint8'],
            gold: false,
            ammo: false
        },
        suckcannon: {
            id: 9,
            name: 'Suck Cannon',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: false
        },
        devastator: {
            id: 11,
            name: 'Devastator',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009BC118, 'uint32']
        },
        walloper: {
            id: 18,
            name: 'Walloper',
            unlocked: [null, 'uint8'],
            gold: false,
            ammo: false
        },
        visibombgun: {
            id: 13,
            name: 'Visibomb Gun',
            unlocked: [null, 'uint8'],
            gold: false,
            ammo: [0x3009bc120, 'uint32']
        },
        decoyglove: {
            id: 25,
            name: 'Decoy Glove',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc150, 'uint32']
        },
        dronedevice: {
            id: 24,
            name: 'Drone Device',
            unlocked: [null, 'uint8'],
            gold: false,
            ammo: [0x3009bc14c, 'uint32']
        },
        teslaclaw: {
            id: 19,
            name: 'Tesla Claw',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: [0x3009bc138, 'uint32']
        },
        morphoray: {
            id: 21,
            name: 'Morph-o-Ray',
            unlocked: [null, 'uint8'],
            gold: null,
            ammo: false
        },
        ryno: {
            id: 23,
            name: 'R.Y.N.O.',
            unlocked: [null, 'uint8'],
            gold: false,
            ammo: [0x3009bc148, 'uint32']
        }
    },
    gadgets: {
        trespasser: {
            id: 26,
            name: 'Trespasser',
            unlocked: [null, 'uint8']
        },
        hydrodisplacer: {
            id: 22,
            name: 'Hydrodisplacer',
            unlocked: [null, 'uint8']
        },
        swingshot: {
            id: 12,
            name: 'Swingshot',
            unlocked: [null, 'uint8']
        },
        gadgetronpda: {
            id: 32,
            name: 'Gadgetron PDA',
            unlocked: [null, 'uint8']
        },
        metaldetector: {
            id: 27,
            name: 'Metal Detector',
            unlocked: [null, 'uint8']
        },
        hologuise: {
            id: 31,
            name: 'Hologuise',
            unlocked: [null, 'uint8']
        },
        helipack: {
            id: 2,
            name: 'Heli-Pack',
            unlocked: [null, 'uint8']
        },
        thrusterpack: {
            id: 3,
            name: 'Thruster-Pack',
            unlocked: [null, 'uint8']
        },
        hydropack: {
            id: 4,
            name: 'Hydro-Pack',
            unlocked: [null, 'uint8']
        },
        o2mask: {
            id: 6,
            name: 'O2 Mask',
            unlocked: [null, 'uint8']
        },
        sonicsummoner: {
            id: 5,
            name: 'Sonic Summoner',
            unlocked: [null, 'uint8']
        },
        pilotshelmet: {
            id: 7,
            name: 'Pilot\'s Helmet',
            unlocked: [null, 'uint8']
        },
        grindboots: {
            id: 29,
            name: 'Grindboots',
            unlocked: [null, 'uint8']
        },
        magneboots: {
            id: 28,
            name: 'Magneboots',
            unlocked: [null, 'uint8']
        }
    },
    items: {
        hoverboard: {
            name: 'Hoverboard',
            unlocked: [null, 'uint8']
        },
        persuader: {
            name: 'Persuader',
            unlocked: [null, 'uint8']
        },
        boltgrabber: {
            name: 'Bolt Grabber',
            unlocked: [null, 'uint8']
        },
        premiumnanotech: {
            name: 'Premium Nanotech',
            unlocked: [null, 'uint8']
        },
        ultrananotech: {
            name: 'Ultra Nanotech',
            unlocked: [null, 'uint8']
        },
        mapomatic: {
            name: 'Map-O-Matic',
            unlocked: [null, 'uint8']
        },
        zoomerator: {
            name: 'Zoomerator',
            unlocked: [null, 'uint8']
        },
        raritanium: {
            name: 'Raritanium',
            unlocked: [null, 'uint8']
        },
        codebot: {
            name: 'Codebot',
            unlocked: [null, 'uint8']
        }
    },
    planets: {
        intro: {
            id: 0,
            name: 'Veldin (Tutorial)',
        },
        novalis: {
            id: 1,
            name: 'Novalis',
        },
        aridia: {
            id: 2,
            name: 'Aridia',
        },
        kerwan: {
            id: 3,
            name: 'Kerwan',
        },
        eudora: {
            id: 4,
            name: 'Eudora',
        },
        rilgar: {
            id: 5,
            name: 'Rilgar',
        },
        nebulag34: {
            id: 6,
            name: 'Nebula G34',
        },
        umbris: {
            id: 7,
            name: 'Umbris',
        },
        batalia: {
            id: 8,
            name: 'Batalia',
        },
        gaspar: {
            id: 9,
            name: 'Gaspar',
        },
        orxon: {
            id: 10,
            name: 'Orxon',
        },
        pokitaru: {
            id: 11,
            name: 'Pokitaru',
        },
        hoven: {
            id: 12,
            name: 'Hoven',
        },
        oltanisorbit: {
            id: 13,
            name: 'Oltanis Orbit',
        },
        oltanis: {
            id: 14,
            name: 'Oltanis',
        },
        quartu: {
            id: 15,
            name: 'Quartu',
        },
        kaleboiii: {
            id: 16,
            name: 'Kalebo III',
        },
        veldinorbit: {
            id: 17,
            name: 'Veldin Orbit',
        },
        veldin: {
            id: 18,
            name: 'Veldin II',
        }
    }
};