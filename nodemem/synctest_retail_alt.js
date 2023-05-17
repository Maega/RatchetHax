const memoryjs = require('memoryjs');

const processId1 = 42120;
const processId2 = 43752;

class GameRetail {
    constructor(pid) {
        // Open the process and get the handle
        this.processObject = memoryjs.openProcess(pid);
        this.process = this.processObject.handle;
    }
    
    get state() {
        return {
            bolts: memoryjs.readMemory(this.process, 0x2015ED98, memoryjs.UINT32),
            mode: memoryjs.readMemory(this.process, 0x2015F5C4, memoryjs.UINT32),
            anim: memoryjs.readMemory(this.process, 0x201413D4, memoryjs.UINT32),
            playerX: memoryjs.readMemory(this.process, 0x2013F3D0, memoryjs.FLOAT),
            playerY: memoryjs.readMemory(this.process, 0x2013F3D4, memoryjs.FLOAT),
            playerZ: memoryjs.readMemory(this.process, 0x2013F3D8, memoryjs.FLOAT),
            playerTiltX: memoryjs.readMemory(this.process, 0x2013F3E0, memoryjs.FLOAT),
            playerTiltY: memoryjs.readMemory(this.process, 0x2013F3E4, memoryjs.FLOAT),
            playerHeading: memoryjs.readMemory(this.process, 0x2013F3E8, memoryjs.FLOAT),
            camX: memoryjs.readMemory(this.process, 0x2015E540, memoryjs.FLOAT),
            camY: memoryjs.readMemory(this.process, 0x2015E544, memoryjs.FLOAT),
            camZ: memoryjs.readMemory(this.process, 0x2015E548, memoryjs.FLOAT),
            camTiltX: memoryjs.readMemory(this.process, 0x2015E550, memoryjs.FLOAT),
            camTiltY: memoryjs.readMemory(this.process, 0x2015E554, memoryjs.FLOAT),
            camHeading: memoryjs.readMemory(this.process, 0x2015E558, memoryjs.FLOAT),
            jumpMomentumX: memoryjs.readMemory(this.process, 0x2013F430, memoryjs.FLOAT),
            jumpMomentumY: memoryjs.readMemory(this.process, 0x2013F434, memoryjs.FLOAT),
            jumpAccel: memoryjs.readMemory(this.process, 0x2013F438, memoryjs.FLOAT),
            distToGround: memoryjs.readMemory(this.process, 0x2013F62C, memoryjs.FLOAT),
            storedMomentumMax: memoryjs.readMemory(this.process, 0x2013F4E0, memoryjs.FLOAT),
            storedMomentum: memoryjs.readMemory(this.process, 0x2013F4E4, memoryjs.FLOAT),
            equippedWeapon: memoryjs.readMemory(this.process, 0x20141660, memoryjs.UINT32),
        }
    }
    set state(data) {
        memoryjs.writeMemory(this.process, 0x2015ED98, data.bolts, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x2015F5C4, data.mode, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x201413D4, data.anim, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x2013F3D0, data.playerX, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F3D4, data.playerY, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F3D8, data.playerZ, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F3E0, data.playerTiltX, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F3E4, data.playerTiltY, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F3E8, data.playerHeading, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E540, data.camX, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E544, data.camY, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E548, data.camZ, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E550, data.camTiltX, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E554, data.camTiltY, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2015E558, data.camHeading, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F430, data.jumpMomentumX, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F434, data.jumpMomentumY, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F438, data.jumpAccel, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F62C, data.distToGround, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F4E0, data.storedMomentumMax, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x2013F4E4, data.storedMomentum, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x20141660, data.equippedWeapon, memoryjs.UINT32);
    }

    close() {
        memoryjs.closeProcess(this.process);
    }
}

const game1 = new GameRetail(processId1);
const game2 = new GameRetail(processId2);

setInterval(() => {
    const game1State = game1.state;
    game2.state = game1State;
}, 5);