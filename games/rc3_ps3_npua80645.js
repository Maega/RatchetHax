/*
    * Memory address reference object
    * Applies to Ratchet & Clank 3 (PS3) [NPUA80645]
*/

export default {
    bigEndian: true,
    nanotech: [0x300DA5040, 'uint32'],
    bolts: [0x300C1E4DC, 'uint32'],
    mode: [null, 'uint32'],
    state: [null, 'uint32'],
    posBase: 0x300DA2870,
    galacticMapBase: null, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: [null, 'uint8'],
        planet: [null, 'uint8']
    },
    weapons: {},
    gadgets: {},
    items: {},
    planets: {}
};