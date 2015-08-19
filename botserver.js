var AgarioClient = require('./agario-client.js');
var util = require('util');
var client = new AgarioClient('worker');
var ws = null;
var wss = new (require('ws').Server)({port:"8080"});
var keys = [false, false,false,false];
var pos = {x:0,y:0};
var target = {x:0,y:0};
var to = true;
client.debug = 0;
client.on('connected', function() 
{
    client.log('spawning');
    client.spawn('Tomi');
    //util.log(client.balls)

    
});
client.on('lostMyBalls', function() { //when i lost all my balls
    client.log('lost all my balls, respawning');
    client.spawn('Tomi'); //spawning new ball with nickname "agario-client"
});
client.on('mapSizeLoad', function(x,y,u,v) {
 	console.log(x+" "+y+" "+u+" "+v)
});

//client.connect('ws://' + "localhost:443", "");

var region = 'EU-London';
AgarioClient.servers.getFFAServer({region: region}, function(srv) { //requesting FFA server
    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
    console.log('Connecting to ' + srv.server + ' with key ' + srv.key);
    client.connect('ws://' + srv.server, srv.key); //do not forget to add ws://
});

wss.on('connection', function(ww)
{
	console.log("connection on ws")
	//ws.send("hi");
	ws = ww;	
	ws.on('message',function(msg)
	{
		//console.log(msg);		
		if(msg.length == 1)
		{
			if(msg == "e")
			{
				client.eject();
				console.log("eject")
			}	

			if(msg == "s")
			{
				client.split();
				console.log("split")
			}
		}
		else
		{
			target.x = msg.split(' ')[0];
			target.y = msg.split(' ')[1];
		}
	});
	setInterval(dd, 30);

});

function dd()
{
	/*
	try
	{
		if(client.balls[client.my_balls[0]].x == 0 && client.balls[client.my_balls[0]].y == 0)
			to = false		
		if(client.balls[client.my_balls[0]].x >= 1000 && client.balls[client.my_balls[0]].y >= 1000)
			to = true;
		console.log(to)
		if (!to)
			client.moveTo(1000, 1000);
		else
			client.moveTo(0, 0);
	}
	catch(e)
	{}*/



	ws.send("c")


	for (var a in client.balls)
    {
		//ws.send(a.x);
		//util.log(util.inspect(client.balls[a].x));
		//console.log(client.balls[a])
		
		var t = {x:0,y:0}
		var n = 1;
		if(client.balls[a].mine)
		{
			n++;
			t.x =  client.balls[a].x
			t.y =  client.balls[a].y
			//console.log(client.balls[a])
		}
		/*
		t.x /=n;
		t.y /=n;*/
		//pos = t;





		var str = client.balls[a].x +" "+client.balls[a].y+" "+client.balls[a].size+" "+client.balls[a].color+" "+(client.balls[a].name || "");
		//console.log(str);

		if(client.balls[a].visible)
			ws.send(str)

    }
    


		/*
		var x = client.my_balls.map(function(i,j){return client.balls[i].x}).reduce(function(a,b){return a+b})/client.my_balls.length;
		var y = client.my_balls.map(function(i,j){return client.balls[i].y}).reduce(function(a,b){return a+b})/client.my_balls.length;
		*/
		var x = 0;
		var y = 0;
		for (var pp in client.my_balls)
		{
			x = parseInt(client.balls[client.my_balls[pp]].x)+parseInt(x)
			y = parseInt(client.balls[client.my_balls[pp]].y)+parseInt(y)
			n++;
		}
		x=x/client.my_balls.length
		y=y/client.my_balls.length


		client.moveTo(x+parseInt(target.x), y+parseInt(target.y));
		var str = (x+parseInt(target.x))+" "+(y+parseInt(target.y))+" "+20+" "+"#ff0000"+" "+("" || "");
		ws.send(str)
		//client.my_balls.map(function(i,j){return client.balls[i].x}).reduce(function(a,b){return a+b})/client.my_balls.length
		ws.send("p "+x+" "+y)
		//console.log("p "+client.balls[client.my_balls[0]].x+" "+client.balls[client.my_balls[0]].y)

}