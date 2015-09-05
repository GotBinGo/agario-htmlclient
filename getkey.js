
var AgarioClient = require('./agario-client.js');
var region = 'EU-London';
var ser = "";
var arr = [];
AgarioClient.servers.getFFAServer({region: region}, function(srv) {
	    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');

	    console.log(srv.server+" "+srv.key)
	    ser = srv.server;
	    //ser = "151.80.98.54:1505";
	    getmore();
});
function getmore()
{
	AgarioClient.servers.getFFAServer({region: region}, function(srv) {
	    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
	    if(!arr[srv.server]) 
	    	arr[srv.server] = 0;
    	arr[srv.server] += 1;
    	if(ser == srv.server)
    		console.log(srv.server+" "+srv.key)
    	else
    		console.log(srv.server+"bad")
    	getmore();
    	console.log(arr);


	});
}