const memoryjs = require('memoryjs');

const processId1 = 42120; // PID of the host game (the game that you'll be controlling)
const processId2 = 43752; // PID of the client game (the game that will be controlled by the host)

class GameRetail {
    constructor(pid) {
        // Open the process and get the handle
        this.processObject = memoryjs.openProcess(pid);
        this.process = this.processObject.handle;
    }
    
    get state() {
        return {
            playerPos: memoryjs.readBuffer(this.process, 0x2013F3D0, 28),

            nanotech: memoryjs.readMemory(this.process, 0x201415F8, memoryjs.UINT8),
            bolts: memoryjs.readMemory(this.process, 0x2015ED98, memoryjs.UINT32),
            mode: memoryjs.readMemory(this.process, 0x2015F5C4, memoryjs.UINT32),
            anim: memoryjs.readMemory(this.process, 0x201413D4, memoryjs.UINT32),
            equippedWeapon: memoryjs.readMemory(this.process, 0x20141660, memoryjs.UINT32),
        }
        /* return {
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
        } */
    }
    set state(data) {
        memoryjs.writeBuffer(this.process, 0x2013F3D0, data.playerPos);

        memoryjs.writeMemory(this.process, 0x201415F8, data.nanotech, memoryjs.UINT8);
        memoryjs.writeMemory(this.process, 0x2015ED98, data.bolts, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x2015F5C4, data.mode, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x201413D4, data.anim, memoryjs.UINT32);
        memoryjs.writeMemory(this.process, 0x20141660, data.equippedWeapon, memoryjs.UINT32);
    }
    /* set state(data) {
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
    } */

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