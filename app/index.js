const server = require('./main/server'),
    osc = require('./main/osc'),
    callbacks = require('./main/callbacks');

server.bindCallbacks(callbacks);

process.on('exit',()=>{
    if (osc.midi) osc.midi.stop();
});