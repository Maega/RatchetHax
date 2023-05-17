const memoryjs = require('memoryjs');
const processName = "pcsx2.exe";

// Open the process and get the handle
const processObject = memoryjs.openProcess(processName);
const process = processObject.handle;

/* const addresses = {
    debugMode: 0x2019A924,
    debugMenu: 0x20152790,
    bolts: 0x20152790
};
const dataType = memoryjs.UINT32;
const value = 1; */

function toggleCheatsEnabled() {
    const readResult = memoryjs.readMemory(process, 0x2019A924, memoryjs.UINT32);
    const value = readResult === 1 ? 0 : 1;
    memoryjs.writeMemory(process, 0x2019A924, value, memoryjs.UINT32);
}

//toggleCheatsEnabled();

function toggleFreecam() {
    
    const addrUpdate = 0x2015E3C8;
    const addrModeControl = 0x2015E3D4;

    const currUpdateVal = memoryjs.readMemory(process, addrUpdate, memoryjs.UINT32);
    const currModeControlVal = memoryjs.readMemory(process, addrModeControl, memoryjs.UINT32);
    console.log(currUpdateVal);
    console.log(currModeControlVal);

    const newUpdateVal = currUpdateVal === 15 ? 0 : 15;
    const newModeControlVal = currModeControlVal === 2 ? 0 : 2;

    memoryjs.writeMemory(process, addrUpdate, newUpdateVal, memoryjs.UINT32);
    memoryjs.writeMemory(process, addrModeControl, newModeControlVal, memoryjs.UINT32);
}

//toggleFreecam();

function toggleDebugMenu() {
    const currModeVal = memoryjs.readMemory(process, 0x2015274C, memoryjs.UINT32);
    const newModeVal = currModeVal === 4294967295 ? 0 : 4294967295;
    memoryjs.writeMemory(process, 0x2015274C, newModeVal, memoryjs.UINT32);
}

//toggleDebugMenu();

function getPlayerPos() {
    const x = memoryjs.readMemory(process, 0x201382A0, memoryjs.FLOAT);
    console.log(x);
    const y = memoryjs.readMemory(process, 0x201382A4, memoryjs.FLOAT);
    console.log(y);
    const z = memoryjs.readMemory(process, 0x201382A8, memoryjs.FLOAT);
    console.log(z);
    const heading = memoryjs.readMemory(process, 0x201382B8, memoryjs.FLOAT);
    console.log(heading);
    return { x, y, z, heading };
}

getPlayerPos();

/* setInterval(() => {
    const playerPos = getPlayerPos();
    console.log(playerPos);
}, 500); */

memoryjs.closeProcess(process);