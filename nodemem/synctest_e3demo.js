const memoryjs = require('memoryjs');

const e3ProcessId = 42120;
const retailProcessId = 43752;

class GameE3Demo {
    constructor(pid) {
        // Open the process and get the handle
        this.processObject = memoryjs.openProcess(pid);
        this.process = this.processObject.handle;
    }
    
    get playerPos() {
        return {
            x: memoryjs.readMemory(this.process, 0x201382A0, memoryjs.FLOAT),
            y: memoryjs.readMemory(this.process, 0x201382A4, memoryjs.FLOAT),
            z: memoryjs.readMemory(this.process, 0x201382A8, memoryjs.FLOAT),
            heading: memoryjs.readMemory(this.process, 0x201382B8, memoryjs.FLOAT)
        }
    }
    set playerPos(pos) {
        memoryjs.writeMemory(this.process, 0x201382A0, pos.x, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x201382A4, pos.y, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x201382A8, pos.z, memoryjs.FLOAT);
        memoryjs.writeMemory(this.process, 0x201382B8, pos.heading, memoryjs.FLOAT);
    }

    get cameraPos() {
        return {
            x: memoryjs.readMemory(this.process, 0x2015B570, memoryjs.FLOAT),
            y: memoryjs.readMemory(this.process, 0x2015B574, memoryjs.FLOAT),
            z: memoryjs.readMemory(this.process, 0x2015B578, memoryjs.FLOAT),
            distance: memoryjs.readMemory(this.process, 0x2015B690, memoryjs.FLOAT),
            heading: memoryjs.readMemory(this.process, 0x2015B694, memoryjs.FLOAT),
            pitch: memoryjs.readMemory(this.process, 0x2015B6F0, memoryjs.FLOAT),
            other1: memoryjs.readMemory(this.process, 0x2015B698, memoryjs.FLOAT)
        }
    }

    close() {
        memoryjs.closeProcess(this.process);
    }
}

const gameE3Demo = new GameE3Demo(e3ProcessId);
const gameRetail = new GameE3Demo(retailProcessId);

/* const e3Pos = gameE3Demo.playerPos;
gameRetail.playerPos = e3Pos; */

setInterval(() => {
    const e3Pos = gameE3Demo.playerPos;
    gameRetail.playerPos = e3Pos;
}, 5);

/* gameE3Demo.close();
gameRetail.close(); */