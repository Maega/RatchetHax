/*
    * Memory address reference object
    * Applies to Ratchet & Clank: Tools of Destruction (PS3) [NPUA80965]
*/

export default {
    bigEndian: true,
    nanotech: [null, 'uint32'],
    bolts: [0x31020C28C, 'uint32'],
    multiplier: [0x31020C298, 'float'],
    raritanium: [0x31020C290, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: null,
    galacticMapBase: null,
    current: {
        item: [null, 'uint8'],
        planet: [null, 'uint8']
    },
    weapons: {},
    gadgets: {},
    planets: {}
};