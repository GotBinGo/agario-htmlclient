var ballies = [];
var clients=[];
var AgarioClient = require('./agario-client.js');
	var region = 'EU-London';
/*var ser;
var key;*/
var ppx = -7071;
var ppy = -7071;

AgarioClient.servers.getFFAServer({region: region}, function(srv) {
	    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
	    //console.log('Connecting to ' + srv.server + ' with key ' + srv.key);
//	    client.connect('ws://' + srv.server, srv.key); //do not forget to add ws://
		var ser = srv.server;
		//ser = "localhost:443"
		console.log(ser);
		var key = srv.key;
		dd(ser, key);
		for(i = 0; i < 50; i ++)
			var a = new cc( ser, key,i);
		

});
function cc(a,b,n)
{
	var AgarioClient = require('./agario-client.js');
	var client = new AgarioClient('worker');
	client.on('connected', function() 
	{
		clients.push(client);
	    client.log('spawning');
	    client.spawn('omi');
	    //util.log(client.balls)    
	});
	client.once('leaderBoardUpdate', function(old, leaders) { //when we receive leaders list. Fire only once
    var name_array = leaders.map(function(ball_id) { //converting leader's IDs to leader's names
        return client.balls[ball_id].name || 'unnamed'
    });

    //client.log(name_array[0]);
    client.top =  name_array.join(', ')
});

	client.on('connectionError',function(err){
		console.log(a);
		/*
		AgarioClient.servers.getFFAServer({region: region}, function(srv) {
	    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
	    	/*if(a != srv.server)
	    		client.emit('connectionError');
	    	else
	    		client.connect(srv.server,srv.key)

		});*/

	});

	client.on('lostMyBalls', function() { //when i lost all my balls
	    client.log('lost all my balls, '+n);
	    client.spawn('omi'); //spawning new ball with nickname "agario-client"
	});
	setInterval(move, 100);
	function move()
	{


		try
		{
			var ball = client.balls[client.my_balls[0]];
			var risk = []
			for(i in client.balls)
			{
				if(client.balls[i].size > ball.size && client.balls[i].visible && client.balls[i].name != "Tomi" && client.balls[i].name != "omi")
					risk.push(client.balls[i]);
			}			

			for(i in risk)
			{
				var xx = (risk[i].x-ball.x)*(risk[i].x-ball.x);
				var yy = (risk[i].y-ball.y)*(risk[i].y-ball.y);
				var zz = xx+yy;
				var hh = Math.sqrt(zz)
				hh-=risk[i].size

				risk[i].dist = hh;
				//console.log(xx+" "+yy+" "+zz+" "+hh);
			}
			risk =risk.sort(function(a,b)
				{
					if (a.dist < b.dist)
    					return -1;
  					if (a.dist > b.dist)
    					return 1;
  					return 0;
				});

			/*for(i in risk)
				console.log(risk[i].dist)
			console.log();*/
			//console.log(ppx,ppy)
			var dt = 1;
			if(risk.length > 0)
				dt = risk[0].dist


			if(dt > 0)
			{
				client.moveTo(ppx,ppy);
				//console.log("moving")
			}
			else
			{	
				//console.log("backing")	
				/*
				if(risk.length == 0)
					client.moveTo(ppx,ppy);
				else
					client.moveTo(ppx*-(600*Math.random()),-ppy*(1+Math.random()));
				*/
				var xx = ppx-ball.x
				var yy = ppy-ball.y
				client.moveTo(ball.x-xx,ball.y-zz)
			}
			/*
			for(a in client.balls)
			{
				if(client.balls[a].visible)
					ballies.push(client.balls[a])
			}
			*/
		}
		catch(e)
		{}

	}
	/*
	var region = 'EU-London';
	AgarioClient.servers.getFFAServer({region: region}, function(srv) {
	    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
	    console.log('Connecting to ' + srv.server + ' with key ' + srv.key);
	    client.connect('ws://' + srv.server, srv.key); //do not forget to add ws://

	});*/
	//client.facebook_key = 'g2gDYQFtAAAAENbhYSgkYRyQBjzXe1I60vJtAAAAUplghKQfJotLdUv2sl9TJySH2lfVxTc8E3cwCxVlNZpdKABr7wpfgDrqlT00lGuKC3uuPdsZpavtTKRkHX/D4s7BRVUS936b0IvmFShDvA9e2xg=';
	//client.facebook_key = '1440945676000'
	client.connect('ws://' + a, b); //do not forget to add ws://
}

function dd(ser, key)
{
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
	clients.push(client)
    client.log('spawning');
    client.spawn('Tomi');
    //util.log(client.balls)

    
});
client.once('leaderBoardUpdate', function(old, leaders) { //when we receive leaders list. Fire only once
    var name_array = leaders.map(function(ball_id) { //converting leader's IDs to leader's names
        return client.balls[ball_id].name || 'unnamed'
    });

    client.log('leaders on server: ' + name_array.join(', '));
    client.top =  name_array.join(', ');
});

client.on('lostMyBalls', function() { //when i lost all my balls
    client.log('lost all my balls, respawning');
    client.spawn('Tomi'); //spawning new ball with nickname "agario-client"
});
client.on('mapSizeLoad', function(x,y,u,v) {
 	console.log(x+" "+y+" "+u+" "+v)
});

//client.connect('ws://' + "localhost:443", "");
/*
var region = 'EU-London';
AgarioClient.servers.getFFAServer({region: region}, function(srv) { //requesting FFA server
    if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
    console.log('Connecting to ' + srv.server + ' with key ' + srv.key);
    

});*/
client.connect('ws://' + ser, key); //do not forget to add ws://
console.log(ser, key);
process.title = ser+" "+key;
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
	setInterval(dd, 100);

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
/*
		var str = client.balls[a].x +" "+client.balls[a].y+" "+client.balls[a].size+" "+client.balls[a].color+" "+(client.balls[a].name || "");
		//console.log(str);

		if(client.balls[a].visible)
			ws.send(str)

*/

		//var str = client.balls[a].x +" "+client.balls[a].y+" "+client.balls[a].size+" "+client.balls[a].color+" "+(client.balls[a].name || "");
		//console.log(str);


		
		/*
		for(b in client.balls)
		{
			try
			{
			var str = client.balls[b].x +" "+client.balls[b].y+" "+client.balls[b].size+" "+client.balls[b].color+" "+(client.balls[b].name || "");
			ws.send(str)
			}
			catch(e)
			{}
			

		}

		ballies = []*/
		

    }
    	var n = 0;
    	var volt = [];
		for(var i = 0; i < clients.length; i++)
		{	
			//console.log(clients[i].top)

			if(client.top == clients[i].top)
			{
				n++;
				var a = clients[i].balls;
				//console.log(a.length);
				for(bb in a)
				{
					

					if(a[bb].visible && a[bb].size > 30 && !volt[bb])
					{
						volt[bb] = true;
						//console.log(volt)
					//console.log(i)
					//var str = clients[c].balls[b].x +" "+clients[c].balls[b].y+" "+clients[c].balls[b].size+" "+clients[c].balls[b].color+" "+(clients[c].balls[b].name || "");

						var str = a[bb].x +" "+a[bb].y+" "+a[bb].size+" "+a[bb].color+" "+(a[bb].name || "");
						
						ws.send(str)
					}
				}
			}
		}
		console.log(n);
    


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
		ppx = x;
		ppy = y;

		client.moveTo(x+parseInt(target.x), y+parseInt(target.y));
		var str = (x+parseInt(target.x))+" "+(y+parseInt(target.y))+" "+20+" "+"#ff0000"+" "+("" || "");
		ws.send(str)
		//client.my_balls.map(function(i,j){return client.balls[i].x}).reduce(function(a,b){return a+b})/client.my_balls.length

		ws.send("p "+x+" "+y)
		//console.log("p "+client.balls[client.my_balls[0]].x+" "+client.balls[client.my_balls[0]].y)

}

}