import inquirer from 'inquirer';
import Game from './Game.js';

console.clear();

const setup = await inquirer.prompt([{
    type: 'input',
    name: 'process',
    default: 'pcsx2.exe',
    message: 'Enter the process name or PID to target:'
},{
    type: 'list',
    name: 'version',
    message: 'Which game version is running in this process?',
    choices: [
        { name: 'Ratchet & Clank 1 - NTSC v1.00', value: 'rc1_ntsc_v1' }
    ]
}]);

const game = new Game(setup.process || 'pcsx2.exe', setup.version);
console.log('Connected to game with process handle ' + game.process);

async function unlockAllWeapons() {
    for (const weaponId in game.address.weapons) {
        game.weapons(weaponId).unlocked = true;
    }
}

async function makeAllWeaponsGold() {
    for (const weaponId in game.address.weapons) {
        game.weapons(weaponId).gold = true;
    }
}

async function unlockAllGadgets() {
    for (const gadgetId in game.address.gadgets) {
        game.gadgets(gadgetId).unlocked = true;
    }
}

async function unlockAllItems() {
    for (const itemId in game.address.items) {
        game.items(itemId).unlocked = true;
    }
}

async function setNanotech() {
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'nanotech',
        default: game.nanotech,
        message: 'Enter new nanotech count:'
    }]);
    game.nanotech = answer.nanotech;
}

async function setBolts() {
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'bolts',
        default: game.bolts,
        message: 'Enter new bolt count:'
    }]);
    game.bolts = answer.bolts;
}

async function setCurrentWeaponAmmo() {
    if (game.equipped.ammo === undefined) return console.error('You current have the ' + game.equipped.name + ' equipped which does not use ammo.');
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'ammo',
        default: game.equipped.ammo,
        message: `Enter new ${game.equipped.name} ammo count:`
    }]);
    game.equipped.ammo = answer.ammo;
}

async function showDebugMenu() {
    // Since the mode value is unsigned, this will just overflow to the max uint to trigger the debug menu.
    game.mode = -1;
}

async function setPos() {
    const currentPos = {...game.playerPos};
    const newPos = await inquirer.prompt([{
        type: 'number',
        name: 'x',
        default: currentPos.x,
        message: 'Enter new x coordinate:'
    },
    {
        type: 'number',
        name: 'y',
        default: currentPos.y,
        message: 'Enter new y coordinate:'
    },
    {
        type: 'number',
        name: 'z',
        default: currentPos.z,
        message: 'Enter new z coordinate:'
    },
    {
        type: 'number',
        name: 'pitch',
        default: currentPos.pitch,
        message: 'Enter new pitch value (-Pi to +Pi):'
    },
    {
        type: 'number',
        name: 'roll',
        default: currentPos.roll,
        message: 'Enter new roll value (-Pi to +Pi):'
    },
    {
        type: 'number',
        name: 'yaw',
        default: currentPos.yaw,
        message: 'Enter new yaw value (-Pi to +Pi):'
    }]);
    game.playerPos = newPos;
}

async function quit() {
    game.close();
    process.exit(0);
}

async function main() {

    console.log(' ');

    const action = await inquirer.prompt([{
        type: 'list',
        name: 'func',
        message: 'What do you want to do?',
        loop: false,
        pageSize: 30,
        choices: [
            new inquirer.Separator('───── General ─────'),
            { name: 'Set Nanotech', value: setNanotech },
            { name: 'Set Bolts', value: setBolts },
            new inquirer.Separator('───── Weapons ─────'),
            { name: 'Unlock All Weapons', value: unlockAllWeapons },
            { name: 'Make All Weapons Gold', value: makeAllWeaponsGold },
            { name: 'Set Current Weapon Ammo', value: setCurrentWeaponAmmo },
            new inquirer.Separator('───── Gadgets ─────'),
            { name: 'Unlock All Gadgets', value: unlockAllGadgets },
            new inquirer.Separator('────── Items ─────'),
            { name: 'Unlock All Items', value: unlockAllItems },
            new inquirer.Separator('──── Position ─────'),
            { name: 'Set Player Position', value: setPos },
            new inquirer.Separator('──── Debugging ────'),
            { name: 'Show Debug Menu', value: showDebugMenu },
            new inquirer.Separator('───────────────────'),
            { name: 'Quit', value: quit }
        ]
    }]);

    console.clear();
    console.log(' ');

    await action.func();
    await main();

}

await main();
game.close();