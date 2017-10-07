const server = require('./server'),
    osc = require('./osc'),
    callbacks = require('./callbacks');

server.bindCallbacks(callbacks);

process.on('exit', () => {
    if (osc.midi) osc.midi.stop()
});
