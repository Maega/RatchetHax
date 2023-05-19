/*
    * Memory address reference object
    * Applies to Ratchet & Clank 3 (PS3) [NPUA80645]
*/

export default {
    bigEndian: true,
    nanotech: 0x300DA5040,
    bolts: 0x300C1E4DC,
    mode: null,
    state: null,
    posBase: 0x300DA2870,
    galacticMapBase: null, // 4 bytes * 18 slots. Read or write a 72 byte buffer from base.
    current: {
        item: null,
        planet: null
    },
    weapons: {},
    gadgets: {},
    items: {},
    planets: {}
};