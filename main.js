var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// var hauler = require('role.hauler'); //TODO: Implement hauler
// var tower = require('role.tower'); //TODO: Implement towers
var spawning = require('process.spawning');

const MapState = {
    BUILDUP: 'BUILDUP', // Early game, building extensions and defenses
    REPAIR: 'REPAIR',   // Repair damage after defense
    DEFENSE: 'DEFENSE', // Enemies within map
    SUSTAIN: 'SUSTAIN'  // Built up, now maintain creeps and minimize processing
}


module.exports.loop = function () {
    /*
        todo list
        TODO: Detect current state of map 
        TODO: Detect current state of each spawner + each controller
        TODO: Building
        TODO: Basic decision logic based on current state
        TODO: Handle multiple rooms
    */

    /*
    World state detection 
    */

    // All available rooms
    var rooms = []    
    for( var room in Game.rooms ) rooms.push(Game.rooms[room])

    /* 
    Set basic instructions
    */

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    /* 
    Spawner work
    */

    spawning.run();


}