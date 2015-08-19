 
var AgarioClient = require('./agario-client.js');
var util = require('util');
var client = new AgarioClient('worker');
client.debug = 0;
client.on('connected', function() 
{
    client.log('spawning');
    client.spawn('agario-client');
    util.log(client.balls)
    //interval_id = setInterval(recalculateTarget, 100);
});
client.connect('ws://' + "localhost:443", "");