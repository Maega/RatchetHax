/*
    * Memory address reference object
    * Applies to Ratchet & Clank 2 (PS3) [NPUA80644]
*/

export default {
    bigEndian: true,
    nanotech: 0x3014816AC,
    bolts: 0x301329A90,
    multiplier: 0x301329ACA, // 1 byte, max 255 multiplier.
    raritanium: 0x301329A94,
    mode: null,
    state: null,
    posBase: 0x30147F260,
    galacticMapBase: 0x301481BD3, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: 0x30147F1BB,
        planet: null
    },
    weapons: {
        lancer: {
            id: 30,
            name: 'Lancer',
            unlocked: 0x301481A9E,
            gold: null,
            ammo: 0x3014818A4
        },
        gravitybomb: {
            id: 42,
            name: 'Gravity Bomb',
            unlocked: 0x301481AAA,
            gold: null,
            ammo: 0x3014818D4
        },
        chopper: {
            id: 22,
            name: 'Chopper',
            unlocked: 0x301481A96,
            gold: null,
            ammo: 0x301481884
        },
        seekergun: {
            id: 24,
            name: 'Seeker Gun',
            unlocked: 0x301481A98,
            gold: null,
            ammo: 0x30148188C
        },
        pulserifle: {
            id: 23,
            name: 'Pulse Rifle',
            unlocked: 0x301481A97,
            gold: null,
            ammo: 0x301481888
        },
        miniturretglove: {
            id: 41,
            name: 'Miniturret Glove',
            unlocked: 0x301481AA9,
            gold: null,
            ammo: 0x3014818D0
        },
        blitzgun: {
            id: 26,
            name: 'Blitz Gun',
            unlocked: 0x301481A9A,
            gold: null,
            ammo: 0x301481894
        },
        shieldcharger: {
            id: 45,
            name: 'Shield Charger',
            unlocked: 0x301481AAD,
            gold: null,
            ammo: 0x3014818E0
        },
        synthenoid: {
            id: 31,
            name: 'Synthenoid',
            unlocked: 0x301481A9F,
            gold: null,
            ammo: 0x3014818A8
        },
        lavagun: {
            id: 29,
            name: 'Lava Gun',
            unlocked: 0x301481A9D,
            gold: null,
            ammo: 0x3014818A0
        },
        bouncer: {
            id: 37,
            name: 'Bouncer',
            unlocked: 0x301481AA5,
            gold: null,
            ammo: 0x3014818C0
        },
        minirockettube: {
            id: 27,
            name: 'Minirocket Tube',
            unlocked: 0x301481A9B,
            gold: null,
            ammo: 0x301481898
        },
        plasmacoil: {
            id: 28,
            name: 'Plasma Coil',
            unlocked: 0x301481A9C,
            gold: null,
            ammo: 0x30148189C
        },
        hoverbombgun: {
            id: 25,
            name: 'Hoverbomb Gun',
            unlocked: 0x301481A99,
            gold: null,
            ammo: 0x301481890
        },
        spiderbotglove: {
            id: 32,
            name: 'Spiderbot Glove',
            unlocked: 0x301481AA0,
            gold: null,
            ammo: 0x3014818AC
        },
        sheepinator: {
            id: 16,
            name: 'Sheepinator',
            unlocked: 0x301481A90,
            gold: null,
            ammo: false
        },
        teslaclaw: {
            id: 18,
            name: 'Tesla Claw',
            unlocked: 0x301481A92,
            gold: null,
            ammo: 0x301481874
        },
        bombglove: {
            id: 12,
            name: 'Bomb Glove',
            unlocked: 0x301481A8C,
            gold: null,
            ammo: 0x30148185C
        },
        walloper: {
            id: 53,
            name: 'Walloper',
            unlocked: 0x301481AB5,
            gold: null,
            ammo: false
        },
        visibombgun: {
            id: 14,
            name: 'Visibomb Gun',
            unlocked: 0x301481A8E,
            gold: null,
            ammo: 0x301481864
        },
        decoyglove: {
            id: 17,
            name: 'Decoy Glove',
            unlocked: 0x301481A91,
            gold: null,
            ammo: 0x301481870
        },
        zodiac: {
            id: 43,
            name: 'Zodiac',
            unlocked: 0x301481AAB,
            gold: null,
            ammo: 0x3014818D8
        },
        ryno2: {
            id: 44,
            name: 'R.Y.N.O. II',
            unlocked: 0x301481AAC,
            gold: null,
            ammo: 0x3014818DC
        },
        clankzapper: {
            id: 9,
            name: 'Clank Zapper',
            unlocked: 0x301481A89,
            gold: null,
            ammo: 0x301481850
        }
    },
    gadgets: {
        swingshot: {
            id: null,
            name: 'Swingshot',
            unlocked: 0x301481A8D
        },
        dynamo: {
            id: null,
            name: 'Dynamo',
            unlocked: 0x301481AA4
        },
        thermanator: {
            id: null,
            name: 'Thermanator',
            unlocked: 0x301481AA7
        },
        tractorbeam: {
            id: null,
            name: 'Tractor Beam',
            unlocked: 0x301481AAE
        },
        helipack: {
            id: null,
            name: 'Heli-Pack',
            unlocked: 0x301481A82
        },
        thrusterpack: {
            id: null,
            name: 'Thruster-Pack',
            unlocked: 0x301481A83
        },
        gravityboots: {
            id: null,
            name: 'Gravity Boots',
            unlocked: 0x301481A93
        },
        grindboots: {
            id: null,
            name: 'Grindboots',
            unlocked: 0x301481A94
        },
        chargeboots: {
            id: null,
            name: 'Charge Boots',
            unlocked: 0x301481AB6
        },
        hypnomatic: {
            id: null,
            name: 'Hypnomatic',
            unlocked: 0x301481AB7
        },

    },
    items: {
        megacorphelmet: {
            id: null,
            name: 'Megacorp Helmet',
            unlocked: 0x301481AAF
        },
        bikerhelmet: {
            id: null,
            name: 'Biker Helmet',
            unlocked: 0x301481AB0
        },
        hydropack: {
            id: null,
            name: 'Hydro-Pack',
            unlocked: 0x301481A84
        },
        mapper: {
            id: null,
            name: 'Mapper',
            unlocked: 0x301481A85
        },
        commandosuit: {
            id: null,
            name: 'Commando Suit',
            unlocked: 0x301481A86
        },
        armormagnetizer: {
            id: null,
            name: 'Armor Magnetizer',
            unlocked: 0x301481A87
        },
        levitator: {
            id: null,
            name: 'Levitator',
            unlocked: 0x301481A88
        },
        glider: {
            id: null,
            name: 'Glider',
            unlocked: 0x301481A95
        },
        electrolyzer: {
            id: null,
            name: 'Electrolyzer',
            unlocked: 0x301481AA6
        },
        qwarkstatuette: {
            id: null,
            name: 'Qwark Statuette',
            unlocked: 0x301481AB1
        },
        boxbreaker: {
            id: null,
            name: 'Box Breaker',
            unlocked: 0x301481AB2
        },
        infiltrator: {
            id: null,
            name: 'Infiltrator',
            unlocked: 0x301481AB3
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