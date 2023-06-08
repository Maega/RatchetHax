/*
    * Memory address reference object
    * Applies to Ratchet & Clank 2 (PS3) [NPUA80644]
*/

export default {
    bigEndian: true,
    nanotech: [0x3014816AC, 'uint32'],
    bolts: [0x301329A90, 'uint32'],
    multiplier: 0x301329ACA, // 1 byte, max 255 multiplier.
    raritanium: [0x301329A94, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: 0x30147F260,
    galacticMapBase: 0x301481BD3, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: [0x30147F1BB, 'uint8'],
        planet: [0x301329A3F, 'uint8']
    },
    weapons: {
        lancer: {
            id: 30,
            name: 'Lancer',
            unlocked: [0x301481A9E, 'uint8'],
            gold: null,
            //exp: [0x301481B68, 'uint32'], // Approx 9000 exp tp upgrade lancer
            ammo: [0x3014818A4, 'uint32']
        },
        gravitybomb: {
            id: 42,
            name: 'Gravity Bomb',
            unlocked: [0x301481AAA, 'uint8'],
            gold: null,
            ammo: [0x3014818D4, 'uint32']
        },
        chopper: {
            id: 22,
            name: 'Chopper',
            unlocked: [0x301481A96, 'uint8'],
            gold: null,
            ammo: [0x301481884, 'uint32']
        },
        seekergun: {
            id: 24,
            name: 'Seeker Gun',
            unlocked: [0x301481A98, 'uint8'],
            gold: null,
            ammo: [0x30148188C, 'uint32']
        },
        pulserifle: {
            id: 23,
            name: 'Pulse Rifle',
            unlocked: [0x301481A97, 'uint8'],
            gold: null,
            ammo: [0x301481888, 'uint32']
        },
        miniturretglove: {
            id: 41,
            name: 'Miniturret Glove',
            unlocked: [0x301481AA9, 'uint8'],
            gold: null,
            ammo: [0x3014818D0, 'uint32']
        },
        blitzgun: {
            id: 26,
            name: 'Blitz Gun',
            unlocked: [0x301481A9A, 'uint8'],
            gold: null,
            ammo: [0x301481894, 'uint32']
        },
        shieldcharger: {
            id: 45,
            name: 'Shield Charger',
            unlocked: [0x301481AAD, 'uint8'],
            gold: null,
            ammo: [0x3014818E0, 'uint32']
        },
        synthenoid: {
            id: 31,
            name: 'Synthenoid',
            unlocked: [0x301481A9F, 'uint8'],
            gold: null,
            ammo: [0x3014818A8, 'uint32']
        },
        lavagun: {
            id: 29,
            name: 'Lava Gun',
            unlocked: [0x301481A9D, 'uint8'],
            gold: null,
            ammo: [0x3014818A0, 'uint32']
        },
        bouncer: {
            id: 37,
            name: 'Bouncer',
            unlocked: [0x301481AA5, 'uint8'],
            gold: null,
            ammo: [0x3014818C0, 'uint32']
        },
        minirockettube: {
            id: 27,
            name: 'Minirocket Tube',
            unlocked: [0x301481A9B, 'uint8'],
            gold: null,
            ammo: [0x301481898, 'uint32']
        },
        plasmacoil: {
            id: 28,
            name: 'Plasma Coil',
            unlocked: [0x301481A9C, 'uint8'],
            gold: null,
            ammo: [0x30148189C, 'uint32']
        },
        hoverbombgun: {
            id: 25,
            name: 'Hoverbomb Gun',
            unlocked: [0x301481A99, 'uint8'],
            gold: null,
            ammo: [0x301481890, 'uint32']
        },
        spiderbotglove: {
            id: 32,
            name: 'Spiderbot Glove',
            unlocked: [0x301481AA0, 'uint8'],
            gold: null,
            ammo: [0x3014818AC, 'uint32']
        },
        sheepinator: {
            id: 16,
            name: 'Sheepinator',
            unlocked: [0x301481A90, 'uint8'],
            gold: null,
            ammo: false
        },
        teslaclaw: {
            id: 18,
            name: 'Tesla Claw',
            unlocked: [0x301481A92, 'uint8'],
            gold: null,
            ammo: [0x301481874, 'uint32']
        },
        bombglove: {
            id: 12,
            name: 'Bomb Glove',
            unlocked: [0x301481A8C, 'uint8'],
            gold: null,
            ammo: [0x30148185C, 'uint32']
        },
        walloper: {
            id: 53,
            name: 'Walloper',
            unlocked: [0x301481AB5, 'uint8'],
            gold: null,
            ammo: false
        },
        visibombgun: {
            id: 14,
            name: 'Visibomb Gun',
            unlocked: [0x301481A8E, 'uint8'],
            gold: null,
            ammo: [0x301481864, 'uint32']
        },
        decoyglove: {
            id: 17,
            name: 'Decoy Glove',
            unlocked: [0x301481A91, 'uint8'],
            gold: null,
            ammo: [0x301481870, 'uint32']
        },
        zodiac: {
            id: 43,
            name: 'Zodiac',
            unlocked: [0x301481AAB, 'uint8'],
            gold: null,
            ammo: [0x3014818D8, 'uint32']
        },
        ryno2: {
            id: 44,
            name: 'R.Y.N.O. II',
            unlocked: [0x301481AAC, 'uint8'],
            gold: null,
            ammo: [0x3014818DC, 'uint32']
        },
        clankzapper: {
            id: 9,
            name: 'Clank Zapper',
            unlocked: [0x301481A89, 'uint8'],
            gold: null,
            ammo: [0x301481850, 'uint32']
        }
    },
    gadgets: {
        swingshot: {
            id: 13,
            name: 'Swingshot',
            unlocked: [0x301481A8D, 'uint8']
        },
        dynamo: {
            id: 36,
            name: 'Dynamo',
            unlocked: [0x301481AA4, 'uint8']
        },
        thermanator: {
            id: 39,
            name: 'Thermanator',
            unlocked: [0x301481AA7, 'uint8']
        },
        tractorbeam: {
            id: 46,
            name: 'Tractor Beam',
            unlocked: [0x301481AAE, 'uint8']
        },
        hypnomatic: {
            id: 55,
            name: 'Hypnomatic',
            unlocked: [0x301481AB7, 'uint8']
        },
        helipack: {
            id: 2,
            name: 'Heli-Pack',
            unlocked: [0x301481A82, 'uint8']
        },
        thrusterpack: {
            id: 3,
            name: 'Thruster-Pack',
            unlocked: [0x301481A83, 'uint8']
        },
        gravityboots: {
            id: 19,
            name: 'Gravity Boots',
            unlocked: [0x301481A93, 'uint8']
        },
        grindboots: {
            id: 20,
            name: 'Grindboots',
            unlocked: [0x301481A94, 'uint8']
        },
        chargeboots: {
            id: 54,
            name: 'Charge Boots',
            unlocked: [0x301481AB6, 'uint8']
        }
    },
    items: {
        megacorphelmet: {
            name: 'Megacorp Helmet',
            unlocked: [0x301481AAF, 'uint8']
        },
        bikerhelmet: {
            name: 'Biker Helmet',
            unlocked: [0x301481AB0, 'uint8']
        },
        hydropack: {
            name: 'Hydro-Pack',
            unlocked: [0x301481A84, 'uint8']
        },
        mapper: {
            name: 'Mapper',
            unlocked: [0x301481A85, 'uint8']
        },
        commandosuit: {
            name: 'Commando Suit',
            unlocked: [0x301481A86, 'uint8']
        },
        armormagnetizer: {
            name: 'Armor Magnetizer',
            unlocked: [0x301481A87, 'uint8']
        },
        levitator: {
            name: 'Levitator',
            unlocked: [0x301481A88, 'uint8']
        },
        glider: {
            name: 'Glider',
            unlocked: [0x301481A95, 'uint8']
        },
        electrolyzer: {
            name: 'Electrolyzer',
            unlocked: [0x301481AA6, 'uint8']
        },
        qwarkstatuette: {
            name: 'Qwark Statuette',
            unlocked: [0x301481AB1, 'uint8']
        },
        boxbreaker: {
            name: 'Box Breaker',
            unlocked: [0x301481AB2, 'uint8']
        },
        infiltrator: {
            name: 'Infiltrator',
            unlocked: [0x301481AB3, 'uint8']
        }
    },
    planets: {
        intro: {
            id: 0,
            name: 'Aranos (Tutorial)'
        },
        oozla: {
            id: 1,
            name: 'Oozla'
        },
        maktar: {
            id: 2,
            name: 'Maktar Nebula'
        },
        endako: {
            id: 3,
            name: 'Endako'
        },
        barlow: {
            id: 4,
            name: 'Barlow'
        },
        feltzin: {
            id: 5,
            name: 'Feltzin System'
        },
        notak: {
            id: 6,
            name: 'Notak'
        },
        siberius: {
            id: 7,
            name: 'Siberius'
        },
        tabora: {
            id: 8,
            name: 'Tabora'
        },
        dobbo: {
            id: 9,
            name: 'Dobbo'
        },
        hrugis: {
            id: 10,
            name: 'Hrugis Cloud'
        },
        joba: {
            id: 11,
            name: 'Joba'
        },
        todano: {
            id: 12,
            name: 'Todano'
        },
        boldan: {
            id: 13,
            name: 'Boldan'
        },
        aranos: {
            id: 14,
            name: 'Aranos'
        },
        gorn: {
            id: 15,
            name: 'Gorn'
        },
        snivelak: {
            id: 16,
            name: 'Snivelak'
        },
        smolg: {
            id: 17,
            name: 'Smolg'
        },
        damosel: {
            id: 18,
            name: 'Damosel'
        },
        grelbin: {
            id: 19,
            name: 'Grelbin'
        },
        yeedil: {
            id: 20,
            name: 'Yeedil'
        },
        museum: {
            id: 21,
            name: 'Insomniac Museum'
        },
        dobboorbit: {
            id: 22,
            name: 'Dobbo Orbit (Moon)'
        },
        damoselorbit: {
            id: 23,
            name: 'Damosel Orbit (Moon)'
        },
        shipshack: {
            id: 24,
            name: 'Ship Shack'
        },
        wupashnebula: {
            id: 25,
            name: 'Wupash Nebula'
        },
        jammingarray: {
            id: 26,
            name: 'Jamming Array (Maktar Nebula)'
        }
    }
};