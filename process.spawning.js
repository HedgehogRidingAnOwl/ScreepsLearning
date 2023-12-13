var targetBuilders = 1
var targetUpgraders = 1
var targetHarvesters = 4

const CreepType = {
    BASIC: [WORK,CARRY,MOVE],
    HAULER: [CARRY, CARRY, MOVE, MOVE],
    WORKER: [WORK, WORK, WORK, MOVE]
}

var processSpawning = {

    run: function() {

        // Get current creep counts
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        for( var name in Game.spawns ) {
            if ( !Game.spawns[name].spawning &&  Game.spawns[name].store.getUsedCapacity(RESOURCE_ENERGY) >=200 ) {
                if(harvesters.length < targetHarvesters) {
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    Game.spawns[name].spawnCreep(CreepType.BASIC, newName, 
                        {memory: {role: 'harvester'}});
                }

                else if(builders.length < targetBuilders) {
                    var newName = 'builder' + Game.time;
                    console.log('Spawning new builder: ' + newName);
                    Game.spawns[name].spawnCreep(CreepType.BASIC, newName, 
                        {memory: {role: 'builder'}});
                }

                else if(upgraders.length < targetUpgraders) {
                    var newName = 'upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns[name].spawnCreep(CreepType.BASIC, newName, 
                        {memory: {role: 'upgrader'}});
                }

                if(Game.spawns[name].spawning) { 
                    var spawningCreep = Game.creeps[Game.spawns[name].spawning.name];
                    Game.spawns[name].room.visual.text(
                        '🛠️' + spawningCreep.memory.role,
                        Game.spawns[name].pos.x + 1, 
                        Game.spawns[name].pos.y, 
                        {align: 'left', opacity: 0.8});
                }
            }
        }
	}
};

module.exports = processSpawning;