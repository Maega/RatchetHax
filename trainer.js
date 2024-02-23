import inquirer from 'inquirer';
import Game from './Game.js';
import memoryjs from 'memoryjs';
import chalk from 'chalk';

const filteredProcesses = memoryjs.getProcesses().filter(p => p.szExeFile === 'pcsx2.exe' || p.szExeFile.startsWith('pcsx2-') || p.szExeFile === 'rpcs3.exe');
const processChoices = filteredProcesses.map(p => {
    let appName;
    if (p.szExeFile.startsWith('pcsx2')) appName = 'PCSX2 Emulator';
    else if (p.szExeFile.startsWith('rpcs3')) appName = 'RPCS3 Emulator';
    return {
        name: appName + ' - ' + p.szExeFile + ' (' + p.th32ProcessID + ')',
        value: p.th32ProcessID
    }
});
processChoices.push({ name: 'Choose a different process...', value: null });

console.clear();
console.log(chalk.bold.green('─── Trainer Setup ───\n'));

const targetProcess = processChoices.length > 1 ? await inquirer.prompt({
    type: 'list',
    name: 'id',
    message: 'Found the following running processes. Which one do you want to connect to?',
    choices: processChoices
}) : undefined;

const setupQuestions = [{
    type: 'input',
    name: 'process',
    default: 'pcsx2.exe',
    message: 'Enter the process name or PID to target:'
},{
    type: 'list',
    name: 'version',
    message: 'Which game version is running in this process?',
    loop: false,
    pageSize: 30,
    choices: [
        new inquirer.Separator('--- PS2 ---'),
        { name: 'Ratchet & Clank 1 - NTSC v1.00', value: 'rc1_ps2_scus97199' },
        new inquirer.Separator('--- PS3 ---'),
        { name: 'Ratchet & Clank 1 [NPUA80643]', value: 'rc1_ps3_npua80643' },
        { name: 'Ratchet & Clank 2 [NPUA80644]', value: 'rc2_ps3_npua80644' },
        { name: 'Ratchet & Clank 3 [NPUA80645]', value: 'rc3_ps3_npua80645' },
        { name: 'Ratchet & Clank: Deadlocked [NPUA80646]', value: 'rc4_ps3_npua80646' },
        { name: 'Ratchet & Clank: Tools of Destruction [NPUA80965]', value: 'rctod_ps3_npua80965' },
        { name: 'Ratchet & Clank: A Crack in Time [BCES00748]', value: 'rcacit_ps3_bces00748' }
    ]
}];

if (targetProcess?.id) setupQuestions.splice(0, 1);

const setup = await inquirer.prompt(setupQuestions);

const game = new Game(targetProcess.id || setup.process, setup.version);
console.log('Connected to game with process handle ' + game.process);

const select = {
    weapon: async (msg) => {
        const answer = await inquirer.prompt([{
            type: 'list',
            name: 'weaponId',
            message: msg || 'Select a weapon:',
            loop: true,
            pageSize: 30,
            choices: [
                ...game.weapons().map(weapon => {
                    return {
                        name: chalk[weapon.unlocked ? 'white' : 'dim'][weapon.gold ? 'yellow' : 'white'](weapon.name),
                        value: weapon.key
                    }
                }),
                new inquirer.Separator(),
                { name: 'Go Back', value: null }
            ]
        }]);
        return answer.weaponId;
    },
    gadget: async (msg) => {
        const answer = await inquirer.prompt([{
            type: 'list',
            name: 'gadgetId',
            message: msg || 'Select a gadget:',
            loop: true,
            pageSize: 30,
            choices: [
                ...game.gadgets().map(gadget => {
                    return {
                        name: chalk[gadget.unlocked ? 'white' : 'dim'](gadget.name),
                        value: gadget.key
                    }
                }),
                new inquirer.Separator(),
                { name: 'Go Back', value: null }
            ]
        }]);
        return answer.gadgetId;
    },
    item: async (msg) => {
        const answer = await inquirer.prompt([{
            type: 'list',
            name: 'itemId',
            message: msg || 'Select an item:',
            loop: true,
            pageSize: 30,
            choices: [
                ...game.items().map(item => {
                    return {
                        name: chalk[item.unlocked ? 'white' : 'dim'](item.name),
                        value: item.key
                    }
                }),
                new inquirer.Separator(),
                { name: 'Go Back', value: null }
            ]
        }]);
        return answer.itemId;
    }
}

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

async function toggleWeaponUnlock() {
    console.log(chalk.bold.green('─── Lock / Unlock Weapons ───\n'));
    const weaponId = await select.weapon('Select a weapon to lock/unlock:');
    if (!weaponId) return console.clear();
    const weapon = game.weapons(weaponId);
    if (!weapon) return console.error('Invalid weapon ID.');
    weapon.unlocked = !weapon.unlocked;
    console.clear();
    await toggleWeaponUnlock();
}

async function toggleWeaponGold() {
    console.log(chalk.bold.green('─── Toggle Gold Weapons ───\n'));
    const weaponId = await select.weapon('Select a weapon to toggle its Gold upgrade:');
    if (!weaponId) return console.clear();
    const weapon = game.weapons(weaponId);
    if (!weapon) return console.error('Invalid weapon ID.');
    weapon.gold = !weapon.gold;
    console.clear();
    if (weapon.gold === undefined) console.error(chalk.redBright(`The ${weapon.name} does not have a Gold variant.\n`));
    await toggleWeaponGold();
}

async function toggleGadgetUnlock() {
    console.log(chalk.bold.green('─── Lock / Unlock Gadgets ───\n'));
    const gadgetId = await select.gadget('Select a gadget to lock/unlock:');
    if (!gadgetId) return console.clear();
    const gadget = game.gadgets(gadgetId);
    if (!gadget) return console.error('Invalid gadget ID.');
    gadget.unlocked = !gadget.unlocked;
    console.clear();
    await toggleGadgetUnlock();
}

async function toggleItemUnlock() {
    console.log(chalk.bold.green('─── Lock / Unlock Items ───\n'));
    const itemId = await select.item('Select an item to lock/unlock:');
    if (!itemId) return console.clear();
    const item = game.items(itemId);
    if (!item) return console.error('Invalid item ID.');
    item.unlocked = !item.unlocked;
    console.clear();
    await toggleItemUnlock();
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

async function setRaritanium() {
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'raritanium',
        default: game.raritanium,
        message: 'Enter new raritanium count:'
    }]);
    game.raritanium = answer.raritanium;
}

async function setMultiplier() {
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'multiplier',
        default: game.multiplier,
        message: 'Enter new multiplier value:'
    }]);
    game.multiplier = answer.multiplier;
}

let freezeMultiplierTimer;
async function toggleFreezeMultiplier() {
    // If the timer is already set, clear it.
    if (freezeMultiplierTimer) {
        clearInterval(freezeMultiplierTimer);
        freezeMultiplierTimer = undefined;
        return;
    }

    // Get the current multiplier value
    const multiplier = game.multiplier;

    // Freeze the multiplier value
    freezeMultiplierTimer = setInterval(() => {
        game.multiplier = multiplier;
    }, 10);
}

let infiniteNanotechTimer;
let startingNanotech;
async function toggleInfiniteNanotech() {
    // If the timer is already set, clear it.
    if (infiniteNanotechTimer) {
        // Clear the timer
        clearInterval(infiniteNanotechTimer);
        // Restore the nanotech value
        game.nanotech = startingNanotech;
        // Reset globals
        startingNanotech = undefined;
        infiniteNanotechTimer = undefined;
        return;
    }

    // Store the current nanotech value
    startingNanotech = game.nanotech;

    // Freeze the nanotech value
    infiniteNanotechTimer = setInterval(() => {
        game.nanotech = 100;
    }, 10);
}

let infiniteAmmoTimer;
let startingAmmo;
async function toggleInfiniteAmmo() {
    // If the timer is already set, clear it.
    if (infiniteAmmoTimer) {
        // Clear the timer
        clearInterval(infiniteAmmoTimer);
        // Restore the ammo values
        Object.keys(startingAmmo).forEach(weaponKey => game.weapons(weaponKey).ammo = startingAmmo[weaponKey]);
        // Reset globals
        startingAmmo = undefined;
        infiniteAmmoTimer = undefined;
        return;
    }

    // Get all weapons that use ammo.
    const weapons = game.weapons().filter(weapon => weapon.ammo !== undefined);

    // Set startingAmmo to an object with current ammo values.
    startingAmmo = {};
    weapons.forEach(weapon => {
        console.log(weapon);
        startingAmmo[weapon.key] = weapons.find(thisWeapon => thisWeapon.key === weapon.key).ammo;
    });

    // Freeze the ammo value
    infiniteAmmoTimer = setInterval(() => {
        // Set the ammo value to 100 for all weapons.
        weapons.forEach(weapon => weapon.ammo = 100);
    }, 10);
}

async function setCurrentWeaponAmmo() {
    if (game.equipped.ammo === undefined) return console.error('You currently have the ' + game.equipped.name + ' equipped which does not use ammo.');
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'ammo',
        default: game.equipped.ammo,
        message: `Enter new ${game.equipped.name} ammo count:`
    }]);
    game.equipped.ammo = answer.ammo;
}

async function setCurrentWeaponLevel() {
    if (game.equipped.level === false) return console.error('You currently have the ' + game.equipped.name + ' equipped which cannot be leveled.');
    const answer = await inquirer.prompt([{
        type: 'number',
        name: 'level',
        default: game.equipped.level,
        message: `Enter new ${game.equipped.name} level:`
    }]);
    game.equipped.level = answer.level;
}

async function showDebugMenu() {
    // Since the mode value is unsigned, this will just overflow to the max uint to trigger the debug menu.
    game.mode = -1;
}

let freezePositionTimer;
let startingPos;
async function toggleFreezePosition() {
    // If the timer is already set, clear it.
    if (freezePositionTimer) {
        // Clear the timer
        clearInterval(freezePositionTimer);
        // Reset globals
        startingPos = undefined;
        freezePositionTimer = undefined;
        return;
    }

    // Set startingPos to the current coordinates of the player.
    startingPos = {...game.playerPos};

    // Freeze the position
    freezePositionTimer = setInterval(() => {
        game.playerPos = startingPos;
    }, 10);
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
	if (freezePositionTimer) startingPos = newPos; // Update the startingPos if freezePosition is active
    game.playerPos = newPos;
    console.clear();
}

/* [{
	"planetId": 1,
	"name": "Tabora - Near the ship",
	"x": 0,
	"y": 0,
	"z": 0,
	"pitch": 0,
	"roll": 0,
	"yaw": 0
}] */
const savedPositions = [];

async function addSavedPos() {
	console.log(chalk.bold.green(`─── Save Current Location (${game.currentPlanet.name}) ───\n`));
	const answer = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        default: 'Saved Location ' + (savedPositions.length + 1),
        message: 'Choose a name for this saved location:'
    }]);

	savedPositions.push({
		planetId: game.currentPlanet.id,
		name: answer.name,
		...game.playerPos
	});
	console.clear();
}

async function loadSavedPos() {
	if (!savedPositions.length) return;
	console.log(chalk.bold.green(`─── Teleport to Saved Location (${game.currentPlanet.name}) ───\n`));
	const answer = await inquirer.prompt([{
		type: 'list',
		name: 'pos',
		message: 'Choose a saved location to load:',
		loop: true,
		pageSize: 20,
		choices: [
			...savedPositions.filter(pos => pos.planetId === game.currentPlanet.id).map(pos => {
				return {
					name: pos.name,
					value: pos
				}
			}),
			new inquirer.Separator(),
			{ name: 'Go Back', value: null }
		]
	}]);

	if (!answer.pos) return;
	const position = {
		x: answer.pos.x,
		y: answer.pos.y,
		z: answer.pos.z,
		pitch: answer.pos.pitch,
		roll: answer.pos.roll,
		yaw: answer.pos.yaw
	};
	if (freezePositionTimer) startingPos = position; // Update the startingPos if freezePosition is active
	game.playerPos = position;
}

async function deleteSavedPos() {
	if (!savedPositions.length) return;
	console.log(chalk.bold.green(`─── Delete Saved Location ───\n`));

	const answer = await inquirer.prompt([{
		type: 'list',
		name: 'location',
		message: 'Choose a saved location to delete:',
		loop: true,
		pageSize: 20,
		choices: [
			...savedPositions.filter(pos => pos.planetId === game.currentPlanet.id).map((pos, index) => {
				return {
					name: `${pos.name} (${game.planets().find(planet => planet.id === pos.planetId).name})`,
					value: index
				}
			}),
			new inquirer.Separator(),
			{ name: 'Go Back', value: null }
		]
	}]);

	if (answer.location === null) return;
	savedPositions.splice(answer.location, 1);
}


async function showMetrics() {
    console.log(chalk.bold.green('─── Game Metrics ───\n'));
    console.log(chalk.bold('Nanotech: ') + game.nanotech);
    console.log(chalk.bold('Bolts: ') + game.bolts);
    console.log(chalk.bold('Current Planet: ') + (game.currentPlanet?.name || 'Unknown'));
    console.log(chalk.bold('Equipped Item: ') + (game.equipped?.name || 'Unknown'));
    if (game.equipped?.ammo !== undefined) console.log(chalk.bold('Equipped Weapon Ammo: ') + game.equipped.ammo);

    const unlockedWeapons = game.weapons().filter(weapon => weapon.unlocked).length;
    const totalWeapons = game.weapons().length;
    const pctUnlockedWeapons = Math.round((unlockedWeapons / totalWeapons) * 100);

    const unlockedGadgets = game.gadgets().filter(gadget => gadget.unlocked).length;
    const totalGadgets = game.gadgets().length;
    const pctUnlockedGadgets = Math.round((unlockedGadgets / totalGadgets) * 100);

    const unlockedItems = game.items().filter(item => item.unlocked).length;
    const totalItems = game.items().length;
    const pctUnlockedItems = Math.round((unlockedItems / totalItems) * 100);

    const totalUnlocked = unlockedWeapons + unlockedGadgets + unlockedItems;
    const totalToUnlock = totalWeapons + totalGadgets + totalItems;
    const pctTotalUnlocked = Math.round((totalUnlocked / totalToUnlock) * 100);
    console.log(chalk.bold('Unlock Progress: ') + totalUnlocked + '/' + totalToUnlock + ` (${pctTotalUnlocked}% Complete)`);

    console.log(chalk.bold(`\nWeapons (${unlockedWeapons}/${totalWeapons}, ${pctUnlockedWeapons}% unlocked): `) + game.weapons().map(weapon => chalk[weapon.equipped ? 'underline' : 'white'][weapon.unlocked ? 'white' : 'dim'][weapon.gold ? 'yellow' : 'white'](weapon.name)).join(', '));
    console.log(chalk.bold(`\nGadgets (${unlockedGadgets}/${totalGadgets}, ${pctUnlockedGadgets}% unlocked): `) + game.gadgets().map(gadget => chalk[gadget.equipped ? 'underline' : 'white'][gadget.unlocked ? 'white' : 'dim'](gadget.name)).join(', '));
    console.log(chalk.bold(`\nItems (${unlockedItems}/${totalItems}, ${pctUnlockedItems}% unlocked): `) + game.items().map(item => chalk[item.unlocked ? 'white' : 'dim'](item.name)).join(', '));
    console.log(' ');

    const action = await inquirer.prompt([{
        type: 'list',
        name: 'doRefresh',
        message: 'What do you want to do?',
        loop: true,
        pageSize: 2,
        choices: [
            { name: 'Refresh Metrics', value: 1 },
            { name: 'Go Back', value: 0 }
        ]
    }]);

    console.clear();
    if (action.doRefresh) await showMetrics();

}

async function teleport() {
    console.log(chalk.bold.green('─── Location Teleporter ───\n'));
    if (!game.currentPlanet) return console.clear() & console.error(chalk.redBright('Couldn\'t identify the current planet. The feature is probably not implemented for this game version yet.\n'));
    console.log(`You are currently on ${game.currentPlanet.name}` + chalk.dim(` (ID ${game.currentPlanet.id})\n`));

    const gameVersion = setup.version.split('_')[0];
    let locations = await import(`./coords/${gameVersion}.json`, {assert: { type: "json" }});
    locations = locations.default.find(x => x.planetId === game.currentPlanet.id)?.locations;

    if (!locations) return console.clear() & console.error(chalk.redBright(`No teleportable locations found for ${game.currentPlanet.name}\n`));
    
    const choice = await inquirer.prompt([{
        type: 'list',
        name: 'playerPos',
        message: 'Where do you want to teleport?',
        loop: true,
        pageSize: 20,
        choices: [...locations, new inquirer.Separator('───────────────────'), { name: 'Go Back', value: undefined }]
    }]);

    if (choice.playerPos) {
		if (freezePositionTimer) startingPos = choice.playerPos; // Update the startingPos if freezePosition is active
		game.playerPos = choice.playerPos;
	}
    
    console.clear();

}

async function quit() {
    // Restore original values for infinite nanotech and ammo
    if (infiniteNanotechTimer) toggleInfiniteNanotech();
    if (infiniteAmmoTimer) toggleInfiniteAmmo();

    game.close();
    console.clear();
    console.log(chalk.bold.green('Bye!'));
    process.exit(0);
}

/* if (process.platform === "win32") {
    const readline = await import("readline");
    var rl = readline.createInterface({input: process.stdin, output: process.stdout});
    rl.on("SIGINT", () => process.emit("SIGINT"));
} */
process.on("SIGINT", () => quit());

const menus = {
    weapons: () => {
        return {
            name: 'Weapons Menu',
            choices: [
                { name: 'Unlock/Lock a Weapon', value: toggleWeaponUnlock },
                { name: 'Unlock All Weapons', value: unlockAllWeapons },
                ...setup.version.split('_')[0] === 'rc1' ? [
                    { name: 'Toggle Gold Upgrade', value: toggleWeaponGold },
                    { name: 'Make All Weapons Gold', value: makeAllWeaponsGold },
                ] : [],
                { name: `Infinite Ammo: ${infiniteAmmoTimer ? chalk.greenBright('On') : chalk.redBright('Off')}`, value: toggleInfiniteAmmo },
                ...game.equipped?.type === 'weapon' ? [
                    new inquirer.Separator(`── Equipped Weapon ──`),
                    ...infiniteAmmoTimer ? [new inquirer.Separator('Set Ammo')] : [{ name: 'Set Ammo', value: setCurrentWeaponAmmo }],
                    ...game.equipped.gold !== undefined ? [{ name: `Gold Upgrade: ${game.equipped.gold ? chalk.greenBright('Yes') : chalk.redBright('No')}`, value: () => {game.equipped.gold = !game.equipped.gold} }] : [],
                    ...setup.version.split('_')[0] === 'rcacit' ? [{ name: 'Set Weapon Level', value: setCurrentWeaponLevel }] : [],
                ] : []
            ]
        }
    },
    gadgetsItems: () => {
        return {
            name: 'Gadgets & Items Menu',
            choices: [
                new inquirer.Separator('───── Gadgets ─────'),
                { name: 'Unlock/Lock a Gadget', value: toggleGadgetUnlock },
                { name: 'Unlock All Gadgets', value: unlockAllGadgets },
                new inquirer.Separator('────── Items ─────'),
                { name: 'Unlock/Lock an Item', value: toggleItemUnlock },
                { name: 'Unlock All Items', value: unlockAllItems }
            ]
        }
    },
    world: () => {
        return {
            name: 'World Options',
            choices: [
                { name: `Freecam: ${game.freecam ? chalk.greenBright('On') : chalk.redBright('Off')}`, value: () => {game.freecam = !game.freecam} },
                { name: `Freeze Player: ${game.worldUpdate?.player ? chalk.redBright('Off') : chalk.greenBright('On')}`, value: () => {game.worldUpdate.player = !game.worldUpdate.player} },
                { name: `Freeze Mobys: ${game.worldUpdate?.mobys ? chalk.redBright('Off') : chalk.greenBright('On')}`, value: () => {game.worldUpdate.mobys = !game.worldUpdate.mobys} },
                { name: `Freeze Particle FX: ${game.worldUpdate?.parts ? chalk.redBright('Off') : chalk.greenBright('On')}`, value: () => {game.worldUpdate.parts = !game.worldUpdate.parts} },
                { name: `Freeze Camera: ${game.worldUpdate?.camera ? chalk.redBright('Off') : chalk.greenBright('On')}`, value: () => {game.worldUpdate.camera = !game.worldUpdate.camera} },
            ]
        }
    },
	savedLocations: () => {
		return {
			name: 'Saved Locations',
			choices: [
				{ name: 'Save Current Location', value: addSavedPos },
				// Only show loadSavedPos if there are saved positions for the current planet
				...savedPositions.filter(pos => pos.planetId === game.currentPlanet?.id).length > 0 ? [{ name: 'Teleport to Saved Location', value: loadSavedPos}] : [],
				...savedPositions.length > 0 ? [{ name: 'Delete Saved Location', value: deleteSavedPos}] : []
			]
		}
	}
}

async function menu(menuKey) {
    const targetMenu = menus[menuKey]();
    if (!targetMenu) return console.clear() & console.error(chalk.redBright('Menu not found.\n'));

    console.clear();
    console.log(chalk.bold.green(`─── ${targetMenu.name} ───\n`));
    
    const action = await inquirer.prompt([{
        type: 'list',
        name: 'func',
        message: 'What do you want to do?',
        loop: true,
        pageSize: 20,
        choices: [
            ...targetMenu.choices, new inquirer.Separator('───────────────────'),
            { name: 'Refresh Menu', value: async () => {await menu(menuKey)}},
            { name: 'Go Back', value: undefined }]
    }]);

    console.clear();

    if (action.func) await action.func();
    else await main();

    await menu(menuKey);
}

async function main() {

    console.log(chalk.bold.green('─── Main Menu ───'));

    if (infiniteNanotechTimer) console.log(chalk.bold.yellowBright('Infinite Health is currently active.'));
    if (infiniteAmmoTimer) console.log(chalk.bold.yellowBright('Infinite Ammo is currently active.'));
    if (freezeMultiplierTimer) console.log(chalk.bold.yellowBright('Bolt multiplier is currently locked.'));
    if (game.freecam) console.log(chalk.bold.yellowBright('Freecam is currently active.'));
    if (!game.freecam && game.worldUpdate && !game.worldUpdate.player) console.log(chalk.bold.yellowBright('Player is currently frozen.'));
    if (!game.freecam && game.worldUpdate && !game.worldUpdate.mobys) console.log(chalk.bold.yellowBright('Mobys are currently frozen.'));
    if (!game.freecam && game.worldUpdate && !game.worldUpdate.parts) console.log(chalk.bold.yellowBright('Particle FX are currently frozen.'));
    if (!game.freecam && game.worldUpdate && !game.worldUpdate.camera) console.log(chalk.bold.yellowBright('Camera is currently frozen.'));
    console.log(' ');

    const choices = [
        new inquirer.Separator('───── General ─────'),
        { name: 'Show Metrics', value: showMetrics },

        // Health
        ...game.nanotech !== undefined ? [
            ...infiniteNanotechTimer ? [new inquirer.Separator('Set Health')] : [{ name: 'Set Health', value: setNanotech }],
            { name: `Infinite Health: ${infiniteNanotechTimer ? chalk.greenBright('On') : chalk.redBright('Off')}`, value: toggleInfiniteNanotech }
        ] : [],

        // Bolts
        { name: 'Set Bolts', value: setBolts },

        // Raritanium
        ...game.raritanium !== undefined ? [{ name: 'Set Raritanium', value: setRaritanium }] : [],

        // Multiplier
        ...game.multiplier !== undefined ? [
            { name: 'Set Multiplier', value: setMultiplier },
            { name: `Lock Multiplier: ${freezeMultiplierTimer ? chalk.greenBright('On') : chalk.redBright('Off')}`, value: toggleFreezeMultiplier }
        ] : [],

        // Items Submenus
        new inquirer.Separator('───── Items ─────'),
        { name: 'Weapons Menu >>', value: async () => await menu('weapons') },
        { name: 'Gadgets & Items Menu >>', value: async () => await menu('gadgetsItems') },

        new inquirer.Separator('──── Location ─────'),
        { name: 'Teleport to Location', value: teleport },
        { name: 'Set Player Coordinates', value: setPos },
		{ name: 'Freeze Position: ' + (freezePositionTimer ? chalk.greenBright('On') : chalk.redBright('Off')), value: toggleFreezePosition },
		{ name: 'Saved Locations >>', value: async () => await menu('savedLocations')},

        // * Debugging Options (RC1 only)
        ...setup.version.split('_')[0] === 'rc1' ? [
            new inquirer.Separator('──── Advanced ────'),
            { name: 'World Options >>', value: async () => await menu('world') },
            { name: 'Open Debug Menu', value: showDebugMenu }
        ] : [],

        new inquirer.Separator('───────────────────'),
        { name: 'Refresh Menu', value: main },
        { name: 'Quit', value: quit }
    ];

    const action = await inquirer.prompt([{
        type: 'list',
        name: 'func',
        message: 'What do you want to do?',
        loop: false,
        pageSize: 20,
        choices: choices
    }]);

    console.clear();

    await action.func();
    await main();

}

console.clear();
await main();
game.close();