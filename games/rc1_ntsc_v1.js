/*
    * Memory address reference object
    * Applies to Ratchet & Clank (NTSC) [v1.00]
*/

export default {
    bigEndian: false,
    nanotech: [0x201415F8, 'uint8'],
    bolts: [0x2015ED98, 'uint32'],
    mode: [0x2015F5C4, 'uint32'],
    state: [0x201413D4, 'uint32'],
    posBase: 0x2013F3D0,
    galacticMapBase: 0x2013D510, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: [0x20141660, 'uint8'],
        planet: [0x2015ED84, 'uint8']
    },
    weapons: {
        bombglove: {
            id: 10,
            name: 'Bomb Glove',
            unlocked: [0x2013D4CA, 'uint8'],
            gold: 0x2013E52A,
            ammo: [0x2013D450, 'uint32']
        },
        pyrocitor: {
            id: 16,
            name: 'Pyrocitor',
            unlocked: [0x2013D4D0, 'uint8'],
            gold: 0x2013E530,
            ammo: [0x2013D468, 'uint32']
        },
        blaster: {
            id: 15,
            name: 'Blaster',
            unlocked: [0x2013D4CF, 'uint8'],
            gold: 0x2013E52F,
            ammo: [0x2013D464, 'uint32']
        },
        gloveofdoom: {
            id: 20,
            name: 'Glove of Doom',
            unlocked: [0x2013D4D4, 'uint8'],
            gold: 0x2013E534,
            ammo: [0x2013D478, 'uint32']
        },
        mineglove: {
            id: 17,
            name: 'Mine Glove',
            unlocked: [0x2013D4D1, 'uint8'],
            gold: 0x2013E531,
            ammo: [0x2013D46C, 'uint32']
        },
        taunter: {
            id: 14,
            name: 'Taunter',
            unlocked: [0x2013D4CE, 'uint8'],
            gold: false,
            ammo: false
        },
        suckcannon: {
            id: 9,
            name: 'Suck Cannon',
            unlocked: [0x2013D4C9, 'uint8'],
            gold: 0x2013E529,
            ammo: false
        },
        devastator: {
            id: 11,
            name: 'Devastator',
            unlocked: [0x2013D4CB, 'uint8'],
            gold: 0x2013E52B,
            ammo: [0x2013D454, 'uint32']
        },
        walloper: {
            id: 18,
            name: 'Walloper',
            unlocked: [0x2013D4D2, 'uint8'],
            gold: false,
            ammo: false
        },
        visibombgun: {
            id: 13,
            name: 'Visibomb Gun',
            unlocked: [0x2013D4CD, 'uint8'],
            gold: false,
            ammo: [0x2013D45C, 'uint32']
        },
        decoyglove: {
            id: 25,
            name: 'Decoy Glove',
            unlocked: [0x2013D4D9, 'uint8'],
            gold: 0x2013E539,
            ammo: [0x2013D48C, 'uint32']
        },
        dronedevice: {
            id: 24,
            name: 'Drone Device',
            unlocked: [0x2013D4D8, 'uint8'],
            gold: false,
            ammo: [0x2013D488, 'uint32']
        },
        teslaclaw: {
            id: 19,
            name: 'Tesla Claw',
            unlocked: [0x2013D4D3, 'uint8'],
            gold: 0x2013E533,
            ammo: [0x2013D474, 'uint32']
        },
        morphoray: {
            id: 21,
            name: 'Morph-o-Ray',
            unlocked: [0x2013D4D5, 'uint8'],
            gold: 0x2013E535,
            ammo: false
        },
        ryno: {
            id: 23,
            name: 'R.Y.N.O.',
            unlocked: [0x2013D4D7, 'uint8'],
            gold: false,
            ammo: [0x2013D484, 'uint32']
        }
    },
    gadgets: {
        trespasser: {
            id: 26,
            name: 'Trespasser',
            unlocked: [0x2013D4DA, 'uint8']
        },
        hydrodisplacer: {
            id: 22,
            name: 'Hydrodisplacer',
            unlocked: [0x2013D4D6, 'uint8']
        },
        swingshot: {
            id: 12,
            name: 'Swingshot',
            unlocked: [0x2013D4CC, 'uint8']
        },
        gadgetronpda: {
            id: 32,
            name: 'Gadgetron PDA',
            unlocked: [0x2013D4E0, 'uint8']
        },
        metaldetector: {
            id: 27,
            name: 'Metal Detector',
            unlocked: [0x2013D4DB, 'uint8']
        },
        hologuise: {
            id: 31,
            name: 'Hologuise',
            unlocked: [0x2013D4DF, 'uint8']
        },
        helipack: {
            id: 2,
            name: 'Heli-Pack',
            unlocked: [0x2013D4C2, 'uint8']
        },
        thrusterpack: {
            id: 3,
            name: 'Thruster-Pack',
            unlocked: [0x2013D4C3, 'uint8']
        },
        hydropack: {
            id: 4,
            name: 'Hydro-Pack',
            unlocked: [0x2013D4C4, 'uint8']
        },
        o2mask: {
            id: 6,
            name: 'O2 Mask',
            unlocked: [0x2013D4C6, 'uint8']
        },
        sonicsummoner: {
            id: 5,
            name: 'Sonic Summoner',
            unlocked: [0x2013D4C5, 'uint8']
        },
        pilotshelmet: {
            id: 7,
            name: 'Pilot\'s Helmet',
            unlocked: [0x2013D4C7, 'uint8']
        },
        grindboots: {
            id: 29,
            name: 'Grindboots',
            unlocked: [0x2013D4DD, 'uint8']
        },
        magneboots: {
            id: 28,
            name: 'Magneboots',
            unlocked: [0x2013D4DC, 'uint8']
        }
    },
    items: {
        hoverboard: {
            name: 'Hoverboard',
            unlocked: [0x2013D4DE, 'uint8']
        },
        persuader: {
            name: 'Persuader',
            unlocked: [0x2013D4E3, 'uint8']
        },
        boltgrabber: {
            name: 'Bolt Grabber',
            unlocked: [0x2013D4E2, 'uint8']
        },
        premiumnanotech: {
            name: 'Premium Nanotech',
            unlocked: [0x2013D38C, 'uint8']
        },
        ultrananotech: {
            name: 'Ultra Nanotech',
            unlocked: [0x2013D38D, 'uint8']
        },
        mapomatic: {
            name: 'Map-O-Matic',
            unlocked: [0x2013D4E1, 'uint8']
        },
        zoomerator: {
            name: 'Zoomerator',
            unlocked: [0x2013D388, 'uint8']
        },
        raritanium: {
            name: 'Raritanium',
            unlocked: [0x2013D389, 'uint8']
        },
        codebot: {
            name: 'Codebot',
            unlocked: [0x2013D38A, 'uint8']
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